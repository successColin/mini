<template>
    <view class="tabs">
        <scroll-view class="tabs-list" scroll-x="true">
            <view v-for="(v, i) in list" :key="i" class="tabs-item" @click="setList(v)">
                <view class="tabs-item-view">
                    <view :class="v.status ? 'tabs-item-title2' : 'tabs-item-title'">{{ v.name }}</view>
                    <view v-if="v.status" class="tabs-line">
                        <view class="tabs-item-line" />
                    </view>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            },
        }
    },
    data() {
        return {}
    },
    onLoad() {
    },
    onShow() { },
    methods: {
        setList(value) {
            this.$emit('click', value)
        }
    }
}
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    align-items: center;
    width: 704rpx;
    height: 58rpx;

    &-list {
        white-space: nowrap;
        height: 100%;
    }

    &-item {
        position: relative;
        display: inline-block;
        padding-left: 20rpx;
        padding-right: 20rpx;
        margin-right: 18rpx;

        &-view {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 58rpx;
        }

        &-title {
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
        }

        &-title2 {
            font-size: 31rpx;
            font-family: PingFang SC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
        }

        &-line {
            width: 35rpx;
            height: 12rpx;
            background: linear-gradient(180deg, #D91B1B 0%, rgba(255, 255, 255, 0) 100%);
        }
    }

    &-line {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        margin-top: -12rpx;
    }
}
</style>