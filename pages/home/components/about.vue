<template>
    <view class="about">
        <view class="about-top">
            <view class="about-top-left">{{ left }}</view>
            <view class="about-top-right" @click="$emit('click')">
                <view class="about-top-right-title">{{ right }}</view>
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277279704.png"
                    class="about-top-right-image" />
            </view>
        </view>
        <slot></slot>
    </view>
</template>

<script>
export default {
    props: {
        left: {
            type: String,
            default: ''
        },
        right: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.about {
    width: 730rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    margin: 0 10rpx 10rpx 10rpx;

    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70rpx;

        &-left {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 56rpx;
            margin-left: 12rpx;
        }

        &-right {
            display: flex;
            align-items: center;
            margin-right: 10rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #666666;
                line-height: 56rpx;
                margin-right: 10rpx;
            }

            &-image {
                width: 10rpx;
                height: 16rpx;
            }
        }
    }
}
</style>