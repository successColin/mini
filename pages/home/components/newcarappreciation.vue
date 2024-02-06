<template>
    <view class="page">
        <view class="newcarappreciation">
            <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695017050229.png"
                class="newcarappreciation-image"
            />
            <view>
                <view class="newcarappreciation-top">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695005018280.png"
                        class="newcarappreciation-top-image"
                    />
                    <view class="newcarappreciation-top-title" @click="toClick">去逛逛</view>
                </view>
                <swiper
                    v-if="list && list.length > 0"
                    class="newcarappreciation-list"
                    :vertical="false"
                    :autoplay="true"
                    :current="current"
                    :circular="true"
                    :interval="5000"
                    :duration="1000"
                    @change="setSwiper"
                >
                    <swiper-item
                        v-for="(v, i) in list"
                        :key="i"
                        :lazy-load="true"
                        class="newcarappreciation-item"
                        @click="Onpushdetail(v)"
                    >
                        <!-- <video v-if="current === i" :src="v.videoUrl" class="newcarappreciation-item-image"
                            :autoplay="false" :loop="true" :muted="true" :controls="false" objectFit='cover'></video> -->
                        <image :src="v.coverImage" class="newcarappreciation-item-image" />
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230830/file_1693395602623.png"
                            class="newcarappreciation-item-video"
                        />
                        <view class="u-flex">
                            <view class="newcarappreciation-item-name">{{ v.title }}</view>
                            <!-- <view class="newcarappreciation-item-label">#新车特点广告语</view> -->
                        </view>
                        <view class="newcarappreciation-item-car">{{ v.shopName }}</view>
                    </swiper-item>
                </swiper>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            current: 0,
            codeTime: undefined,
        };
    },
    created() {
        this.getList();
    },
    destroyed() {
        clearInterval(this.codeTime);
    },
    methods: {
        setSwiper({ detail: { current } }) {
            if (this.codeTime) {
                clearInterval(this.codeTime);
            }
            this.codeTime = setInterval(() => {
                this.current = current;
            }, 1000);
        },
        Onpushdetail(v) {
            uni.navigateTo({
                url: "/pages/activity/foursvideo/index?id=" + v.id + "&type=4&title=新车鉴赏",
            });
        },
        async getList() {
            const {
                data: { records },
            } = await this.$request.post("/coc-active/api/v1/video/list", {
                current: 1,
                size: 100,
                type: 4,
            });
            this.list = records;
        },
        toClick() {
            uni.navigateTo({
                url: "/pages/carShops/motorcycletype/index",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 495rpx;
    margin-top: 14rpx;
}

.newcarappreciation {
    position: relative;
    width: 700rpx;
    height: 495rpx;

    &-image {
        position: absolute;
        top: 0;
        width: 700rpx;
        height: 495rpx;
    }

    &-top {
        position: relative;

        &-image {
            position: absolute;
            top: 17rpx;
            right: 21rpx;
            width: 112rpx;
            height: 49rpx;
        }

        &-title {
            position: absolute;
            top: 17rpx;
            right: 21rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 112rpx;
            height: 49rpx;
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            font-style: italic;
            color: #ffffff;
            line-height: 35rpx;
        }
    }

    &-list {
        position: absolute;
        top: 90rpx;
        left: 25rpx;
        width: 650rpx;
        height: 385rpx;
    }

    &-item {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 160rpx;
        background: #ffffff;
        border-radius: 10rpx;
        margin-right: 10rpx;

        &-image {
            width: 650rpx;
            height: 300rpx;
            border-radius: 10rpx;
        }

        &-video {
            position: absolute;
            width: 82rpx;
            height: 82rpx;
            margin-top: 109rpx;
            margin-left: 284rpx;
        }

        &-name {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-top: 20rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

        &-label {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            margin-top: 20rpx;
            margin-left: 19rpx;
        }

        &-car {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-top: 19rpx;
        }
    }
}
</style>
