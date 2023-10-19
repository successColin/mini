<template>
    <view class="page">
        <view class="card">
            <view class="flex">
                <view>本次开票 </view>
                <u-icon name="info-circle" size="12"></u-icon>
                <view class="ml10 txtLighGray"> 开票说明：满100元可发起开票申请</view>
            </view>
            <view class="mt20">
                <view class="flex jsb money">
                    <view class="flex" style="width:90%;align-items: baseline;">
                        <u-icon size="22" name="rmb" bold color="#222222"> </u-icon>
                        <view style="font-size: 60rpx;font-weight:bold;">{{ invoicingAmount }}</view>
                    </view>
                    <view class="size24 recordBtn" @click="lookRecords">开票记录</view>
                </view>
                <view class="size24 txtLighGray mt30 ">{{ notes }}</view>
            </view>
        </view>
        <view class="flex jsb alc" style="padding: 30rpx 50rpx">
            <view class="size32 fwb">开票设置</view>
        </view>
        <view class="card">
            <view class="u-flex jsb">
                <view class="fwb size28">发票类型</view>
                <view class="txtLighGray size28">普通电子发票</view>
            </view>
        </view>
        <view class="bgfff br10 mt20 " style="padding: 0 30rpx;">
            <u--form :model="formData" :rules="rules" ref="uForm" labelWidth='100' :labelStyle="{ fontSize: '28rpx' }"
                fontSize="28">
                <u-form-item label="发票选项" borderBottom>
                    <view class="u-flex jsb">
                        <view></view>
                        <view style="padding-right: 18rpx;">个人</view>
                        <!-- <view style="padding-right: 18rpx;">
                            <u-radio-group v-model="invoiceOptions" placement="row" @change="OnChangeradio"
                                :labelStyle="{ fontSize: '28rpx' }">
                                <u-radio activeColor="#D91B1B" label="个人" name="1"></u-radio>
                                <u-radio :customStyle="{ marginLeft: '10px' }" activeColor="#D91B1B" label="企业" name="2">
                                </u-radio>
                            </u-radio-group>
                        </view> -->
                    </view>
                </u-form-item>
                <u-form-item label="发票抬头"  borderBottom :required='true'>
                    <view class="u-flex jsb">
                        <view></view>
                        <view style="padding-right: 18rpx;">
                         {{ formData.invoiceHeader }}
                        </view>
                    </view>
                </u-form-item>
                <!-- <u-form-item v-if="invoiceOptions == 2" label="纳税人识别号" prop="dutyParagraph" borderBottom
                    :required='true'>
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.dutyParagraph" :border="none" fontSize="14" placeholder="请输入纳税人识别号"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item v-if="invoiceOptions == 2" label="注册地址" borderBottom >
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.address" :border="none" fontSize="14" placeholder="请输入注册地址"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item v-if="invoiceOptions == 2" label="注册电话" borderBottom>
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.mobile" :border="none" fontSize="14" placeholder="请输入注册电话"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item v-if="invoiceOptions == 2" label="开户银行" borderBottom>
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.bankName" :border="none" fontSize="14" placeholder="请输入开户银行"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item v-if="invoiceOptions == 2" label="银行账号" borderBottom >
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.bankAccount" :border="none" fontSize="14" placeholder="请输入银行账号"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item> -->
                <u-form-item label="发票金额" borderBottom>
                    <view class="u-flex jsb">
                        <view></view>
                        <view class="mainRed size28" style="padding-right: 18rpx;">
                            ￥{{ invoicingAmount }}
                        </view>
                    </view>
                </u-form-item> 
                <u-form-item label="接收邮箱" prop="invoiceEmail"  :required='true'>
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u--input v-model="formData.invoiceEmail" :border="none" fontSize="14" placeholder="请输入接收邮箱账号"
                                inputAlign='right'>
                            </u--input>
                        </view>
                    </view>
                </u-form-item>
            </u--form>
        </view>
        <view class="u-flex" style="margin-top: 42rpx;">
            <view>
                <u-checkbox-group @change="OnChangecheckboxValue1" v-model="checkboxValue1" placement="column"
                    activeColor="#d91b1b">
                    <u-checkbox :customStyle="{ marginBottom: '8px' }" :name="1" />
                </u-checkbox-group>
            </view>
            <text style="font-size: 24rpx">设为默认开票信息</text>
        </view>
        <view class="btn" @click="Onsubmit">
            申请开票
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                invoiceOptions: '1',
                invoiceHeader: uni.getStorageSync('realName'),
                invoiceEmail: '',
            },
            invoicingAmount: 0,
            notes: '',
            invoiceOptions: '1',
            checkboxValue1: [],
            orderCommissions: [],
            orderId: '',
            rules: {
                'invoiceEmail': [{
                    type: 'string',
                    required: true,
                    message: '请填写接收邮箱',
                    trigger: ['blur', 'change']
                }, {
                    // 自定义验证函数，见上说明
                    validator: (rule, value, callback) => {
                        // 上面有说，返回true表示校验通过，返回false表示不通过
                        // uni.$u.test.mobile()就是返回true或者false的
                        return uni.$u.test.email(value);
                    },
                    message: '请填写正确邮箱',
                    // 触发器可以同时用blur和change
                    trigger: ['change', 'blur'],
                }],
            },
        }
    },
    onReady() {
        //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
        this.$refs.uForm.setRules(this.rules)
    },
    onLoad(option) {
       
    },
    onShow() {
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$request.post("/coc-active/api/v1/newExpert/expertInvoicing/show").then(res => {
                this.invoicingAmount = res.data.invoiceAmount
                this.notes = res.data.notes
                this.orderCommissions = res.data.orderCommissions
            })
            this.$request.post("/coc-active/api/v1/newExpert/expertInvoicingInfo/show").then(res => {
                if (res.data == null) {
                    this.formData = {
                        invoiceOptions: '1',
                        dutyParagraph: '',
                        invoiceHeader: uni.getStorageSync('realName'),
                        invoiceEmail: '',
                    }
                } else {
                    this.formData = res.data
                }
            })
        },
        OnChangecheckboxValue1(e) {
            // if(e.length){
            //     let obj = {} 
            // }
        },
        setInfo() {
            console.log(this.formData)
            this.$request.post("/coc-active/api/v1/newExpert/expertInvoicingInfo/add", this.formData).then(res => {
                // this.invoiceAmount = res.data.invoiceAmount
                // this.notes = res.data.notes
            })
        },
        Onsubmit() {
            if (this.invoicingAmount > 50) {
                this.$refs.uForm.validate().then(res => {
                    let dataObj = Object.assign({}, this.formData)
                    dataObj.type = 1
                    dataObj.notes = this.notes ? this.notes : 'suib'
                    dataObj.invoicingAmount = this.invoicingAmount
                    dataObj.orderCommissions = this.orderCommissions
                    this.$request.post("/coc-active/api/v1/newExpert/expertInvoicing/add", dataObj).then(s => {
                        if (s.code == 200) {
                            uni.$u.toast('已提交，等待审核')
                            if (this.checkboxValue1.length) {
                                this.setInfo(); //设置默认开票信息
                            }
                            setTimeout(() => {
                                uni.redirectTo({
                                    url: "/pages/myEarnings/invoicingRecords"
                                })
                            }, 1500)
                        } else {
                            uni.$u.toast(s.message)
                        }
                    })
                }).catch(errors => {
                    uni.$u.toast('请完善必填资料')
                })
            } else {
                uni.$u.toast('开票金额不足')
            }

        },
        OnChangeradio(e) {
            this.formData.invoiceOptions = e
        },
        lookRecords() {
            uni.navigateTo({
                url: "/pages/myEarnings/invoicingRecords"
            })
        }
    }
}
</script>

<style lang="scss">
.page {
    padding: 25rpx;
}

.card {
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 25rpx;
}

.btn {
    margin: 100rpx auto;
    width: 330rpx;
    height: 80rpx;
    background: #D91B1B;
    border-radius: 40rpx;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
    font-size: 32rpx;
}

.recordBtn {
    width: 140rpx;
    height: 47rpx;
    line-height: 47rpx;
    border: 1px solid #222222;
    border-radius: 10rpx;
    text-align: center;
}

.money {
    align-items: baseline;
    border-bottom: 1rpx solid #E8E8E8;
    padding: 20rpx 0;
}
</style>