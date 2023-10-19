<template>
    <view class="page">
        <view class="top">
            <view class="top-search">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
                    class="top-search-image" />
                <input v-model="search" placeholder="搜索商品名称" placeholder-style="color:#999999;font-size:27rpx;"
                    class="top-search-input" @blur="setSearch" />
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            search: '',
        }
    },
    onLoad(option) {
        this.search = option.name
    },
    onShow() { },
    methods: {
        setSearch() {
            uni.$emit('drxdsearch', this.search)
            uni.navigateBack()
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
    background: #EFEFEF;
}

.top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
    height: 77rpx;
    background: #FFFFFF;
    padding-bottom: 16rpx;

    &-search {
        display: flex;
        align-items: center;
        width: 704rpx;
        height: 62rpx;
        border-radius: 31rpx;
        border: 2rpx solid #D91B1B;

        &-image {
            width: 48rpx;
            height: 48rpx;
            margin-left: 15rpx;
        }

        &-input {
            width: 621rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 32rpx;
            margin-left: 8rpx;
            margin-right: 15rpx;
        }
    }
}
</style>