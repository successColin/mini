<template>
    <view class="currency">
        <view class="currency-top">
            <image :src="head.image" class="currency-top-image" />
            <view class="currency-flex" @click="toClick">
                <view class="currency-top-title">{{ head.title }}</view>
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277279704.png"
                    class="currency-top-icon"
                />
            </view>
        </view>
        <view class="currency-tabs">
            <slot name="tabs"></slot>
        </view>
        <view class="currency-list">
            <slot name="list"></slot>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        head: {
            type: Object,
            default: {},
        },
    },
    data() {
        return {};
    },
    methods: {
        toClick() {
            if (this.head.url) {
                uni.navigateTo({
                    url: this.head.url,
                });
            } else {
                this.$emit("toClick");
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.currency {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 20rpx 10rpx 0 10rpx;
    &-flex {
        display: flex;
        align-items: center;
    }
    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 70rpx;
        padding: 0 10rpx;
        &-image {
            display: block;
            height: 30rpx;
        }
        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height: 56rpx;
            margin-right: 10rpx;
        }
        &-icon {
            display: block;
            width: 10rpx;
            height: 16rpx;
        }
    }
    &-tabs {
        width: 710rpx;
        margin: 0 10rpx;
    }
    &-list {
        width: 710rpx;
        margin: 0 10rpx;
    }
}
</style>
