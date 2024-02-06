<!--
 * @Descripttion: 救援故事
 * @Author: ytx
 * @Date: 2023-10-25 17:06:20
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-25 17:06:20
-->
<template>
    <view>
        <view v-if="isarticle" class="waterfall">
            <view class="waterfall__box">
                <custom-waterfalls-flow
                    imageKey="coverPicture"
                    ref="waterfallsFlowRef"
                    :value="rescueDataList"
                    :isshowicon="true"
                    @imageClick="OnPushPostDetail"
                >
                    <!-- #ifdef MP-WEIXIN -->
                    <view
                        class="waterfall__box--content"
                        v-for="(item, index) in rescueDataList"
                        :key="index"
                        slot="slot{{index}}"
                    >
                        <view class="waterfall__box--dec">
                            <view class="waterfall__title">{{ item.title }}</view>
                            <view class="waterfall__desc">
                                <view class="waterfall__desc--img">
                                    <u-image
                                        width="16"
                                        height="16"
                                        :src="item.shopAvatar"
                                        :lazy-load="true"
                                        shape="circle"
                                    ></u-image>
                                    <span>{{ item.shopName }}</span>
                                </view>
                                <view>{{ item.viewNum }}人看过</view>
                            </view>
                        </view>
                    </view>
                    <!-- #endif -->
                </custom-waterfalls-flow>
            </view>
        </view>
        <view
            v-if="!isLoadMore && isarticle"
            style="font-size: 24rpx; color: #999999; text-align: center; margin-top: 80rpx"
        >
            我到底啦~
        </view>
        <view v-if="!isarticle" style="font-size: 24rpx; color: #999999; text-align: center; margin-top: 80rpx">
            <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720245068.png"
                style="width: 153rpx; height: 152rpx"
            ></image>
        </view>
        <view style="height: 100rpx"> </view>
    </view>
</template>

<script>
export default {
    props: {
        rescueDataList: {
            type: Array,
            default: () => [],
        },
        // ture 我到底啦 false 暂无图片
        isarticle: {
            type: Boolean,
            default: false,
        },
        // 是否展示更多
        isLoadMore: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {};
    },
    components: {},
    computed: {},
    watch: {},
    mounted() {},
    methods: {
        OnPushPostDetail(v) {
            uni.navigateTo({
                url: "/pages/activity/foursvideo/index?id=" + v.id + "&type=1&title=救援故事",
            });
        },
        refresh() {
            this.$refs.waterfallsFlowRef.refresh();
        },
    },
};
</script>
<style lang="scss" scoped>
.waterfall {
    border-radius: 10rpx;
    padding-bottom: 20rpx;
    padding: 26rpx 0 20rpx;
    &__box {
        &--content {
            padding-bottom: 10rpx;
            border-radius: 0px 0px 10rpx 10rpx;
        }
        &--dec {
            margin: 12rpx;
        }
    }
    // 标题
    &__title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
    }
    // 图片
    &__desc {
        display: flex;
        justify-content: space-between;
        margin-top: 11rpx;

        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        &--img {
            display: flex;
            span {
                padding-left: 6rpx;
            }
        }
    }
}
</style>
