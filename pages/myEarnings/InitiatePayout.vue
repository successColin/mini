<template>
    <view class="page">
        <view class="card flex jsb alc" @click="checkBank" style="height:86rpx;line-height: 86rpx;">
            <view>转出到银行卡</view>
            <view class="flex alc">
                <text class="size28 mr10 ml10" v-if="bank.bankName">{{ bank.bankName }}{{ bank.endNumber }}</text>
                <text class="size28 mr10 ml10" v-else>请选择银行</text>
                <u-icon size="12" name="arrow-right"> </u-icon>
            </view>
        </view>
        <view class="card  mt20" style="padding: 25rpx;">
            <view class="flex jsb money">
                <input
                    style="width: 90%;height: 70rpx;font-weight: bold;font-size: 60rpx;padding-left: 50rpx;box-sizing: border-box;"
                    type="number" v-model="withdrawPrice" />
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693016853270.png"
                    class="iconRmb" mode="widthFix"></image>
                <text>税前</text>
            </view>
            <view class="size24 txtLighGray mt30">
                提现说明: 满50元可发起提现，单笔提现最高500元获得佣金为税前金额，需提供非自然人增值税专用发票进行结算.如不能开具发票的，按应打款佣金金额扣减 7%后结算。
            </view>
        </view>
        <view class="card  mt20 flex jsb alc" style="padding: 25rpx;">
            <view class="size28 fwb">是否开票</view>
            <view style="width: 30%;">
                <u-radio-group v-model="isInvoicing" placement="row">
                    <u-radio activeColor='#D91B1B' labelSize='28rpx' name="1" label="是"></u-radio>
                    <u-radio activeColor='#D91B1B' labelSize='28rpx' name="0" label="否"
                        :customStyle="{ marginLeft: '25px' }"></u-radio>
                </u-radio-group>
            </view>
        </view>
        <view v-if="isInvoicing == 1">
            <view class="size32 fwb" style="padding: 25rpx 0;">开票信息</view>
            <view class="card size28" style="line-height: 100rpx;padding: 0 25rpx 25rpx;">
                <view class="flex jsb alc borderB">
                    <view>发票抬头</view>
                    <view class="txtLighGray">{{ info.shopName }}</view>
                </view>
                <view class="flex jsb alc borderB">
                    <view>税号</view>
                    <view class="txtLighGray">{{ info.uniformSocialCreditCode }}</view>
                </view>
                <view class="flex jsb alc borderB">
                    <view>开票项目</view>
                    <view class="txtLighGray">{{ info.invoiceName }}</view>
                </view>
                <view class="flex jsb alc borderB">
                    <view>投送邮箱</view>
                    <view class="txtLighGray">{{ info.email }}</view>
                </view>
                <view class="">
                    <view>*上传已开发票印件</view>
                    <u-upload width='79' height='79' sizeType='compressed ' :fileList="fileList1" @afterRead="afterRead"
                        @delete="deletePic" name="1" multiple :maxCount="1" :capture="['album']">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692867629768.png"
                            mode="widthFix" style="width: 160rpx;height: 160rpx;"></image>
                    </u-upload>
                </view>
            </view>
        </view>
        <view class="payoutBtn" @click="widthdrawBtn">立即提现</view>
        <u-toast ref="uToast"></u-toast>
        <u-loading-icon :show="showload"></u-loading-icon>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            showpop: false,
            show: false,
            isInvoicing: '0',
            withdrawPrice: 0,
            balance: 0,
            bank: {},
            info: {
                email: "",
                brancdutyParagraph: "",
                invoiceHeader: "",
                invoiceName: '服务费',
                invoiceImg: ''
            },
            fileList1: [],
            picUrl: '',
            showload: false,
			isclick: false,
        }
    },

    onLoad(option) {
        console.log(option)
        if (option.balance) {
            this.balance = Number(option.balance)
            this.withdrawPrice = Number(option.balance)
        }
        this.getInfo()
    },
    onShow() {
        let that = this
        uni.$on('bankdata', function (data) {
            that.bank = data
        })
    },
    methods: {
        checkBank() {
            uni.navigateTo({
                url: "/pages/myEarnings/bankList"
            })
        },
        // 获取默认开票信息
        getInfo() {
            this.$request.post("/coc-merchant-app/app/v2/invoicing/getDetails", {
                id: 1
            }).then(res => {
                this.info = res.data
                this.info.invoiceName = '服务费'
            })
        },
        // 删除图片
        deletePic(event) {
            this[`fileList${event.name}`].splice(event.index, 1)
        },
        async afterRead(event) {
            let lists = [].concat(event.file)
            lists.map((item, i) => {
                this.fileList1.push({
                    url: item.url,
                    status: 'success',
                    message: ''
                })
            })

        },
        widthdrawBtn() {
            if (this.bank.bankName && this.withdrawPrice) {
                if (this.isInvoicing == 1) {
                    if (this.fileList1.length) {
                        this.picUrl = this.fileList1[0].url
                        this.uploadFilePromise()
                    } else {
                        uni.showToast({
                            title: '请上传发票印件',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                } else {
                    this.picUrl = ''
                    this.save()
					
                }
            } else {
                uni.showToast({
                    title: '请确认银行信息和输入金额不为空',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        uploadFilePromise() {
            let _this = this
            this.showload = true
            _this.info.invoiceImg = ''
            this.fileList1.filter((s, i) => {
                s.index = i
            })
            let arr = []
            const promistList = this.fileList1.map(res => {
                console.log(res)
                return new Promise((resolve, reject) => {
                    uni.uploadFile({
                        url: getApp().globalData.uploadUrl,
                        filePath: res.url,
                        name: 'file',
                        formData: {
                            'file': res.url
                        },
                        success: (uploadFileRes) => {
                            arr.push({
                                index: res.index,
                                data: JSON.parse(uploadFileRes.data).data
                            })
                            resolve(uploadFileRes);
                            // _this.dataList.imgs.push(JSON.parse(uploadFileRes.data).data)
                        }
                    });
                })
            })
            Promise.all(promistList).then((res) => {
                let a = arr.sort((a, b) => {
                    return a.index - b.index
                })
                a.filter(s => {
                    // 只有一张图片 
                    _this.info.invoiceImg = s.data
                })
                this.save()
            })
        },
        save(){
			if(!this.isclick){
				this.isclick = true
				this.$request.post("/coc-active/api/v2/withdraw/add", {
				        bankCardId: this.bank.bankCardId,
				        dutyParagraph: this.info.uniformSocialCreditCode,
				        email: this.info.email,
				        invoiceHeader: this.info.shopName,
				        invoiceName: this.info.invoiceName,
				        isInvoicing: Number(this.isInvoicing),
				        withdrawPrice: Number(this.withdrawPrice),
				        invoiceImg:  this.info.invoiceImg,
				    }).then(res => {
				        if (res.code == 200) {
				            uni.showToast({
				                title: '提现成功',
				                icon: 'none',
				                duration: 2000
				            })
				            setTimeout(() => {
				                uni.redirectTo({
				                    url: "/pages/myEarnings/withdrawlist"
				                })
				            }, 1000)
				        } else {
				            uni.showToast({
				                title: res.message,
				                icon: 'none',
				                duration: 2000
				            })
				        }
				    })
				}
			
            },
        onRequest() {
            
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
}

.card {
    background-color: #fff;
    width: 700rpx;
    border-radius: 10rpx;
    padding: 25rpx;
    box-sizing: border-box;
}

.money {
    align-items: baseline;
    border-bottom: 1rpx solid #E8E8E8;
    padding: 0rpx 0 20rpx;
    position: relative;
}
.iconRmb {
    position: absolute;
    top: 14px;
    left: 10rpx;
    width: 32rpx;
}

.bankIcon {
    width: 40rpx;
}

.borderB {
    border-bottom: 1rpx solid #E8E8E8;
}
.Kf {
    width: 79rpx;
    height: 38rpx;
}

.payoutBtn {
    width: 300rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    background: #D91B1B;
    border-radius: 40rpx;
    margin: 100rpx auto;
}
</style>