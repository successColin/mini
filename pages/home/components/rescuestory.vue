<template>
    <about left="故障救援" right="去咨询" @click="toList">
        <template>
            <scroll-view class="rescuestory" scroll-x="true">
                <view class="df">
                    <view v-for="(v, i) in list" :key="i" class="rescuestory-item" @click="toDetails(v)">
                        <img :src="v.coverPicture" class="rescuestory-item-image" />
                        <img
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231114/file_1699949044520.png"
                            class="rescuestory-item-play"
                        />
                        <view class="rescuestory-item-title">{{ v.title }}</view>
                        <view class="rescuestory-item-bottom">
                            <view class="df aic">
                                <img :src="v.baseHead" class="rescuestory-item-head" />
                                <view class="rescuestory-item-name">{{ v.baseName }}</view>
                            </view>
                            <view class="rescuestory-item-number">588人看过</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </template>
    </about>
</template>

<script>
import about from "@/pages/home/components/about.vue";
export default {
    components: { about },
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.getList();
        uni.$on("updatedata", () => {
            this.getList();
        });
    },
    destroyed() {
        uni.$off("updatedata");
    },
    methods: {
        async getList() {
            const { code, data } = await this.$request.post("/coc-active/api/v1/adv/space/getAdvHelpVideo", {});
            console.log(code, data);
            if (code === 200) {
                this.list = data;
            }
        },
        toList() {
            uni.navigateTo({
                url: "/pages/roadhelp/faultAbout/faultSearch",
            });
        },
        toDetails(value) {
            const title = value.videoType === 1 ? "救援故事" : "故障救援";
            uni.navigateTo({
                url:
                    "/pages/activity/foursvideo/index?id=" +
                    value.videoId +
                    "&type=" +
                    value.videoType +
                    "&title=" +
                    title,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.rescuestory {
    white-space: nowrap;
    width: 730rpx;

    &-item {
        display: inline-block;
        margin-right: 10rpx;
        position: relative;

        &-image {
            width: 360rpx;
            height: 360rpx;
            background: #ff0000;
            border-radius: 10rpx 10rpx 0rpx 0rpx;
        }

        &-title {
            white-space: normal;
            width: 335rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 32rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin: 12rpx 12rpx 11rpx 13rpx;
        }

        &-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 30rpx;
        }

        &-head {
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
            line-height: 32rpx;
            margin-left: 6rpx;
        }

        &-number {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            line-height: 32rpx;
            margin-right: 7rpx;
        }

        &-play {
            position: absolute;
            top: 12rpx;
            left: 12rpx;
            width: 38rpx;
            height: 38rpx;
        }
    }
}

.df {
    display: flex;
}

.aic {
    align-items: center;
}
</style>
