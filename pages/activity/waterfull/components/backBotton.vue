<template>
    <!-- 返回按钮 -->
    <view class="backBotton" @click="handleBack">
        <u-icon name="arrow-left" color="white" size="35rpx"></u-icon>
        返回
    </view>
</template>

<script>
export default {
    methods: {
        handleBack() {
            uni.navigateBack({
                delta: 1
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.backBotton {
    position: fixed;
    font-size: 30rpx;
    top: 120rpx;
    left: 20rpx;
    z-index: 999999;
    display: flex;
    color: white;
    display: flex;
    align-items: center;
}
</style>