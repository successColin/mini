<template>
    <view class="page">
        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230518/file_1684371646456.png"
            mode="widthFix" class="imgblock"></image>
        <view class="list">
            <view class="item">
                <view class="quan">
                    <view style="margin-left: 120rpx;display: flex;margin-top: 20rpx;">
                        <view class="quanNum">200</view>
                        <view class="canPay">满300元可使用</view>
                    </view>
                </view>
                <view class="sbtn"><text style="font-size:24rpx">￥</text><text
                        style="font-size:40rpx;font-weight:bold">0.01</text><text style="font-size:24rpx;">抢</text>
                </view>
            </view>
            <view class="item">
                <view class="quan">
                    <view style="margin-left: 120rpx;display: flex;margin-top: 20rpx;">
                        <view class="quanNum">200</view>
                        <view class="canPay">满300元可使用</view>
                    </view>
                </view>
                <view class="sbtn"><text style="font-size:24rpx">￥</text><text
                        style="font-size:40rpx;font-weight:bold">0.01</text><text style="font-size:24rpx;">抢</text>
                </view>
            </view>
            <view class="item">
                <view class="quan">
                    <view style="margin-left: 120rpx;display: flex;margin-top: 20rpx;">
                        <view class="quanNum">200</view>
                        <view class="canPay">满300元可使用</view>
                    </view>
                </view>
                <view class="sbtn"><text style="font-size:24rpx">￥</text><text
                        style="font-size:40rpx;font-weight:bold">0.01</text><text style="font-size:24rpx;">抢</text>
                </view>
            </view>

        </view>
        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230518/file_1684372493670.jpg"
            mode="widthFix" class="imgblock"></image>
    </view>
</template>
  
<script>
import {
    tologin
} from '@/utils/index.js'
export default {
    data() {
        return {
            list: []
        }
    },
    onLoad(option) {
        this.getList()
    },

    methods: {
        getList() { }
    }
}
</script>
  
<style lang="scss" scoped>
.page {
    background-color: #caf3db;
}

.imgblock {
    display: block;
    width: 100%;
}

.list {
    border: 4rpx solid #9BDEB1;
    padding: 30rpx;
    width: 725rpx;
    margin: 0 auto;
    box-sizing: border-box;
    border-radius: 14rpx;
    border-top: 0;

    .item {
        margin-bottom: 30rpx;
        background: url('https://oss.dcqcjlb.com/51che_java_dev/20230518/file_1684372808306.png') no-repeat;
        background-size: 100% 100%;
        width: 658rpx;
        height: 156rpx;
        display: flex;
        position: relative;
        &:last-child {
            margin-bottom: 0;
        }
    }
}

.quan {
    display: flex;

    .quanNum {
        font-size: 80rpx;
        background: linear-gradient(-48deg, #FF491E 0%, #FFAB46 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        font-weight: bold;
        color: #FF7A32;
    }

    .canPay {
        font-size: 24rpx;
        color: #4A4A4A;
        margin-left: 16rpx;
        width: 140rpx;
        margin-top: 20rpx;
    }
}

.sbtn {
    width: 160rpx;
    height: 72rpx;
    border-radius: 34rpx;
    color: #FF491E;
    font-size: 32rpx;
    background: url(https://oss.dcqcjlb.com/51che_java_dev/20230519/file_1684497644808.png) no-repeat;
    background-size: 100% 100%;
    position: absolute;
    top: 44rpx;
    right: 20rpx;
    display: flex;
    align-items: baseline;
    line-height: 72rpx;
    justify-content: center;
}
</style>
  