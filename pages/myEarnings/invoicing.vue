<template>
    <view class="page">
        <view class="card">
            <view class="u-flex jsb">
                <view>发票类型</view>
                <view>普通电子发票</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>发票选项</view>
                <view>{{ data.invoiceOptionsMsg }}</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>发票抬头</view>
                <view>{{ data.invoiceHeader }}</view>
            </view>
            <view v-if="data.invoiceOptions == 2" class="u-flex jsb mt30">
                <view>纳税人识别号</view>
                <view>{{ data.dutyParagraph }}</view>
            </view>
            <view v-if="data.invoiceOptions == 2" class="u-flex jsb mt30">
                <view>注册地址</view>
                <view>{{ data.address }}</view>
            </view>
            <view v-if="data.invoiceOptions == 2" class="u-flex jsb mt30">
                <view>注册电话</view>
                <view>{{ data.mobile }}</view>
            </view>
            <view v-if="data.invoiceOptions == 2" class="u-flex jsb mt30">
                <view>开户银行</view>
                <view>{{ data.bankName }}</view>
            </view>
            <view v-if="data.invoiceOptions == 2" class="u-flex jsb mt30">
                <view>银行账号</view>
                <view>{{ data.bankAccount }}</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>邮箱</view>
                <view>{{ data.invoiceEmail }}</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>发票金额</view>
                <view>￥{{ data.invoicingAmount }}</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>申请时间</view>
                <view>{{ data.createdAt }}</view>
            </view>
            <view class="u-flex jsb mt30">
                <view>开票状态</view>
                <view>{{ data.invoicingStatusMsg }}</view>
            </view>
        </view>
        <view class="txtLighGray size24" style="margin-left: 50rpx;margin-top: 30rpx;" v-if="data.invoicingStatus==2">
            温馨提示：请登录邮箱，查收发票凭证。
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            data: {},
			id:''
        }
    },

    onLoad(option) {
		console.log(option)
        this.id = option.id
        this.getDetail()
    },
    methods: {
        getDetail() {
            this.$request.post("/coc-active/api/v1/newExpert/expertInvoicing/details", {
                id: this.id,
            }).then(res => {
                this.data = res.data
            })
        }
    }
}
</script>

<style lang="scss">
.page {}

.card {
    margin: 25rpx;
    padding: 25rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    font-size: 24rpx;
}
</style>
