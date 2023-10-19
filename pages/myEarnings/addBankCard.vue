<template>
    <view class="page">
        <view class="card  mb20">
            <u--form :model="form1" ref="uForm1" :rules="rules1" labelWidth='80' :labelStyle="{ fontSize: '28rpx' }">
                <view style="padding: 0 25rpx 25rpx;">
                    <u-form-item label="持卡人" prop="name" borderBottom style="width:100%">
                        <u-input placeholder="填写开户人本人姓名" border="none" v-model="form1.name" :fontSize="14" clearable />
                    </u-form-item>
                    <u-form-item label="卡号" prop="cardNumber" borderBottom r>
                        <u-input placeholder="填写16到19位储蓄卡卡号" border="none" v-model="form1.cardNumber" :fontSize="14"
                            clearable />
                    </u-form-item>
                    <u-form-item label="身份证号" prop="idCard" borderBottom>
                        <u-input placeholder="请输入身份证号" border="none" v-model="form1.idCard" :fontSize="14" clearable />
                    </u-form-item>
                    <u-form-item label="手机号" prop="mobile">
                        <u-input placeholder="填写银行预留手机号" border="none" v-model="form1.mobile" :fontSize="14" clearable />
                    </u-form-item>
                </view>
                <view class="line"></view>
                <view style="padding: 0 25rpx 25rpx;">
                    <u-form-item label="开户行" prop="bankName" borderBottom @click="checkBank">
                        <view>{{ form1.bankName ? form1.bankName : '选择银行' }}</view>
                        <u-icon slot="right" name="arrow-right" size="12"></u-icon>
                    </u-form-item>
                    <u-form-item label="开户分行" prop="branchBankName">
                        <u-input placeholder="请填写支行名称" border="none" v-model="form1.branchBankName" :fontSize="14"
                            clearable />
                    </u-form-item>
                </view>
            </u--form>
        </view>
        <view class="btn" @click="onSubmit">保存</view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            form1: {
                name: '',
                cardNumber: '',
                mobile: '',
                idCard: '',
                bankName:'',
                branchBankName:'',

            },
            form2: {
                bank: '',
                ziBank: '',
            },
            rules1: {
                name: [{
                    type: 'string',
                    required: true,
                    message: '请输入姓名',
                    trigger: ['blur', 'change']
                }],
                cardNumber: [{
                    type: 'string',
                    required: true,
                    message: '请输入卡号',
                    trigger: ['blur', 'change']
                }],
                mobile: [{
                    type: 'string',
                    required: true,
                    message: '请输入手机号',
                    trigger: ['blur', 'change']
                },
                {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.mobile(value);
                    },
                    message: '手机号码不正确',
                    trigger: ['change', 'blur'],
                }
                ],
                idCard: [
                    {
                        type: 'string',
                        required: true,
                        message: '请输入身份证号',
                        trigger: ['blur', 'change']
                    },
                    {
                        validator: (rule, value, callback) => {
                            return uni.$u.test.idCard(value);
                        },
                        message: '身份证号号码不正确',
                        trigger: ['change', 'blur'],
                    }
                ],
                bankName: [{
                    type: 'string',
                    required: true,
                    message: '请选择银行',
                    trigger: ['blur', 'change']
                }],
                branchBankName: [{
                    type: 'string',
                    required: true,
                    message: '请输入开户分行',
                    trigger: ['blur', 'change']
                }],
            },

        }
    },
    onLoad(option) { },
    onShow() {
        let that = this
        uni.$on('bankdata', function (data) {
            that.form1.bankName = data
        })
    },
    onReady() {
        this.$refs.uForm1.setRules(this.rules1)
    },
    methods: {
        checkBank() {
            uni.navigateTo({
                url: "/pages/myEarnings/searchBank"
            })
        },
        onSubmit() {
            this.$refs.uForm1.validate().then(res => {
                this.$request.post("/coc-active/api/v2/withdraw/bankCard/add", this.form1).then(res => {
                    if (res.code == 200) {
                        uni.showToast({
                            icon: 'success',
                            title: '绑定成功',
                            duration: '1500',
                        })
                        // uni.$emit('refresh', {refresh: true});
                        // 跳转回上一页
                        uni.navigateBack({
                            delta: 1
                        });
                    } else {
                        uni.$u.toast(res.message)
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
}

.card {
    background-color: #ffffff;
    border-radius: 10rpx;
}

.bankIcon {
    width: 88rpx;
    height: 88rpx;
}

.btn {
    width: 600rpx;
    height: 80rpx;
    background: #D91B1B;
    border-radius: 40rpx;
    text-align: center;
    margin: 100rpx auto;
    font-size: 32rpx;
    color: #FFFFFF;
    line-height: 80rpx;
}
.line {
    background: #f8f8f8;
    height: 20rpx;
    border-radius: 4rpx;
}
</style>