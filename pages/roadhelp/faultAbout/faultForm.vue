<template>
    <view class="page">
        <view class="card">
            <view class="size32 fwb ">提问</view>
            <u--textarea v-model="info.question" placeholder="请用一句话完整的描述您的问题" border="bottom" autoHeight count
                maxlength="40"></u--textarea>
            <view class="size32 fwb mt20">附加图片</view>
            <view class="size24 txtLighGray mt10 ">添加清晰的图片更方便售后经理为您解答</view>
            <view class="mt30">
                <u-upload width='100' height='100' sizeType='compressed ' :fileList="fileList1" @afterRead="afterRead"
                    @delete="deletePic" name="1" multiple :maxCount="1" :capture="['album']">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230503/file_1683092299818.png"
                        mode="widthFix" style="width: 160rpx;height: 160rpx;"></image>
                </u-upload>
            </view>
        </view>
        <view class="payoutBtn" @click="wenBtn">提问</view>
        <u-loading-icon :show="showload"></u-loading-icon>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            fileList1: [],
            info: {
                question: '',
                uid: String(uni.getStorageSync("userId")),
                club_shop_name: '',
                club_shop_mobile: '',
                username: uni.getStorageSync("nickname")
            },
            // picUrl: '',
            showload: false,
            shopInfo: {}

        }
    },

    onLoad(option) {
        let shopInfo = JSON.parse(option.shop)
        this.info.club_shop_mobile = shopInfo.baseMobile
        this.info.club_shop_name = shopInfo.baseName
    },
    onShow() { },
    methods: {
        wenBtn() {
            if (this.info.question) {
                if (this.fileList1.length) {
                    // this.picUrl = this.fileList1[0].url
                    this.uploadFilePromise()
                } else {
                    this.save()
                }
            } else {
                uni.showToast({
                    title: '问题不能为空',
                    icon: 'none',
                    duration: 2000
                })
            }
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
        uploadFilePromise() {
            let _this = this
            this.showload = true
            _this.info.image = ''
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
                    _this.info.image = s.data
                })
                this.save()
            })
        },
        save() {
            this.$request51help.post("/api/club/fault_ask", this.info).then(res => {
                if (res.code == 1) {
                    uni.showToast({
                        title: '提问成功',
                        icon: 'none',
                        duration: 2000
                    })
                    setTimeout(() => {
                        uni.redirectTo({
                            url: "/pages/roadhelp/faultAbout/faultMy"
                        })
                        let shopName = uni.getStorageSync('qShopName')
                        if(shopName){
                            uni.setStorageSync('qShopBobile', '')
			                uni.setStorageSync('qShopName', '')
                        }
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
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
    background-color: #f8f8f8;
}

.card {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 25rpx;
    box-sizing: border-box;
}

.payoutBtn {
    width: 350rpx;
    height: 80rpx;
    line-height: 80rpx;
    color: #fff;
    font-size: 32rpx;
    text-align: center;
    background: #D91B1B;
    border-radius: 40rpx;
    margin: 200rpx auto 0;
}
</style>



