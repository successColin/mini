<template>
    <view class="sd">
        <view class="sd-top">
            <view class="sd-top-name">安全教育</view>
            <view class="sd-top-title">道路千万条 安全第一条</view>
        </view>
        <view v-if="list && list.length">
            <view v-for="(v, i) in list" :key="i" @click="toDetails(v)">
                <view class="sd-middle">
                    <image :src="v.coverPicture" class="sd-middle-image" />
                    <img
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231114/file_1699949044520.png"
                        class="sd-middle-play"
                    />
                </view>
                <view class="sd-content">{{ v.title }}</view>
                <view class="sd-bottom">
                    <view class="sd-bottom-left">
                        <image :src="v.baseHead" class="sd-bottom-left-image" />
                        <view class="sd-bottom-left-name">{{ v.baseName }}</view>
                    </view>
                    <view class="sd-bottom-right">{{ v.viewNum }}人看过</view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.getList(4);
        uni.$on("updatedata", () => {
            this.getList(4);
        });
    },
    destroyed() {
        uni.$off("updatedata");
    },
    methods: {
        async getList(type) {
            const { code, data } = await this.$request.post("/coc-active/api/v1/adv/space/getAdvHome", {});
            const { advActivityVO, advGroupAndMealVO, advHelpVideoVO, advSafetyEducationVO } = data;
            if (code === 200) {
                if (type === 1) {
                    // 畅游嗨乐广告位
                    this.list = advActivityVO;
                } else if (type === 2) {
                    // 出游食宿广告位
                    this.list = advGroupAndMealVO;
                } else if (type === 3) {
                    // 故障救援广告位
                    this.list = advHelpVideoVO;
                } else if (type === 4) {
                    // 安全教育广告位
                    this.list = advSafetyEducationVO;
                }
            }
        },
        toDetails(value) {
            uni.navigateTo({
                url:
                    "/pages/activity/foursvideo/index?id=" +
                    value.videoId +
                    "&type=" +
                    value.videoType +
                    "&title=安全教育",
            });
        },
    },
};
</script>
<style lang="scss" scoped>
.sd {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin-left: 10rpx;
    margin-bottom: 10rpx;

    &-top {
        display: flex;
        justify-content: space-between;

        &-name {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-top: 20rpx;
            margin-left: 11rpx;
            margin-bottom: 17rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            margin-top: 24rpx;
            margin-right: 8rpx;
        }
    }

    &-middle {
        position: relative;

        &-image {
            width: 730rpx;
            height: 300rpx;
            background: #ff0000;
            border-radius: 10rpx 10rpx 0rpx 0rpx;
        }

        &-play {
            position: absolute;
            top: 131rpx;
            left: 346rpx;
            width: 38rpx;
            height: 38rpx;
        }
    }

    &-content {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-left: 12rpx;
        margin-right: 36rpx;
        margin-top: 12rpx;
    }

    &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 18rpx;
        padding-bottom: 14rpx;

        &-left {
            display: flex;
            align-items: center;
            margin-left: 13rpx;

            &-image {
                width: 32rpx;
                height: 32rpx;
                border-radius: 16rpx;
                background: red;
            }

            &-name {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 6rpx;
            }
        }

        &-right {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            margin-right: 11rpx;
        }
    }
}
</style>
