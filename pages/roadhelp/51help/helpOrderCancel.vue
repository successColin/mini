<template>
    <view class="page">
        <view class="helpBox bgfff br10">
            <view class="contRow flex">
                <text class="contL txtDarkGray size24 ">订单编号:</text>
                <text class="contR oneLine size24">{{ orderD.order_no }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">退款费用:</text>
                <text class="mainRed size24">￥{{ orderD.money }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">退款方式:</text>
                <text class="size24">2个工作日内原路返回</text>
            </view>
        </view>
        <view class="reasons helpBox bgfff br10">
            <view class="mb20 size28 fwb">请选择取消原因：</view>
            <u-radio-group v-model="radiovalue1" placement="column">
                <u-radio activeColor='#D91B1B' shape="square" labelSize='24rpx' name="已自行解决"
                    :customStyle="{ marginBottom: '8px' }" label="已自行解决"></u-radio>
                <u-radio activeColor='#D91B1B' shape="square" labelSize='24rpx' name="等待时间过长，不想再等"
                    :customStyle="{ marginBottom: '8px' }" label="等待时间过长，不想再等"></u-radio>
                <u-radio activeColor='#D91B1B' shape="square" labelSize='24rpx' name="已选择其他救援"
                    :customStyle="{ marginBottom: '8px' }" label="已选择其他救援"></u-radio>
                <u-radio activeColor='#D91B1B' shape="square" labelSize='24rpx' name="信息填写错误"
                    :customStyle="{ marginBottom: '8px' }" label="信息填写错误"></u-radio>
            </u-radio-group>
        </view>
        <view class="cancelBtn size28 fwb colorff tac bgRed" @click="cancel">确认取消</view>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>
<script>
import {
    getstorage,
    setstorage,
    tologin
} from '@/utils/index.js'
export default {

    data() {
        return {
            radiovalue1: '已自行解决',
            orderD: {},
            id: ''
        };
    },
    onLoad(options) {
        this.getDetail(options.id)
        this.id = options.id
    },
    methods: {
        getDetail(id) {
            this.$request.post("/coc-active/api/v1/road/rescue/orderDetail", { id: id }).then(res => {
                if (res.code == 200) {
                    this.orderD = res.data
                }
            })
        },
        cancel() {
            let obj = {
                cancel_reason: this.radiovalue1,
                order_id: this.id
            }
            this.$request.post("/coc-active/api/v1/road/rescue/cancelOrder", obj).then(res => {
                if(res.code == 200){
                    uni.navigateTo({
                        url: '/pages/roadhelp/51help/helpCancelState'
                    })
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.helpBox {
    width: 700rpx;
    margin: 20rpx auto 0;
    padding: 20rpx 25rpx;
    line-height: 40rpx;
    font-size: 24rpx;
    box-sizing: border-box;

    .contL {
        margin-right: 30rpx;
        width: 106rpx;
    }
}

.cancelBtn {
    width: 330rpx;
    height: 70rpx;
    line-height: 70rpx;
    border-radius: 35rpx;
    margin: 300rpx auto 100rpx;
}</style>
  