<template>
    <about left="畅游嗨乐" right="去玩吧" @click="toList">
        <template>
            <swiper
                :autoplay="false"
                :circular="true"
                @change="changeSwiper"
                :current="current"
                :style="{ height: swiperHeight + 'px' }"
            >
                <swiper-item v-for="(v, i) in list" :key="i">
                    <view :id="'swiper-wrap' + i" class="play-item" @click="toDetails(v)">
                        <view class="play-item-top">
                            <image :src="v.coverPicture" class="play-item-top-image"></image>
                            <view
                                v-if="v.activitySignUpStatus == 1 || v.activitySignUpStatus == 2"
                                class="play-item-top-time"
                            >
                                <text v-if="v.activitySignUpStatus == 2" class="mr14">报名截止时间</text>
                                <text v-if="v.activitySignUpStatus == 1" class="mr14">报名开启时间</text>
                                {{ v.activitySignUpStatus == 2 ? v.activityEndTime : v.activityBeginTime }}
                            </view>
                            <view v-if="v.activitySignUpStatus == 2" class="play-item-top-btn">
                                <view
                                    :class="v.districtName && v.districtName.length > 0 ? '' : 'o0'"
                                    class="play-item-top-btn-left"
                                    >{{ v.districtName }}</view
                                >
                                <view v-if="v.activitySignUpStatus == 2" class="play-item-top-btn-right">报名中</view>
                            </view>
                            <view v-if="v.activitySignUpStatus == 1" class="pa260110">
                                <image src="@/static/image/huodongyugao.png" class="w180h180" />
                            </view>
                            <view
                                v-if="
                                    v.activitySignUpStatus == 3 ||
                                    v.activitySignUpStatus == 5 ||
                                    v.activitySignUpStatus == 4
                                "
                                class="pa260110"
                            >
                                <image src="@/static/image/jieshu.png" class="w180h180" />
                            </view>
                        </view>
                        <view class="play-item-title">{{ v.title }}</view>
                        <view class="play-item-bottom">
                            <view class="play-item-bottom-left">
                                <view v-if="v.payType !== 1" class="play-item-bottom-left-symbol">￥</view>
                                <view v-if="v.payType !== 1" class="play-item-bottom-left-money">
                                    {{ v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice }}
                                </view>
                                <view v-if="v.payType === 1" class="play-item-bottom-left-money">免费</view>
                                <view class="play-item-bottom-left-cross"
                                    >{{ v.shopTypeId === 2 ? "" : "M团价" }}￥{{ v.marketPrice }}
                                </view>
                            </view>
                            <view class="df aic h40">
                                <view class="play-item-bottom-enroll">已报名 {{ v.saleNum }}/{{ v.stock }}</view>
                                <view v-if="v.saleNum > 0" class="df">
                                    <image
                                        v-for="(value, index) in v.headPortraits"
                                        :key="index"
                                        :src="value"
                                        class="play-item-bottom-head"
                                    />
                                    <view v-if="v.saleNum > 2" class="play-item-bottom-more">
                                        <view class="w6h6" />
                                        <view class="w6h6 ml4 mr4" />
                                        <view class="w6h6" />
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
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
            obj: {
                current: 1,
                size: 100,
                zone: 3,
            },
            current: 0,
            swiperHeight: 0,
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
            const { code, data } = await this.$request.post("/coc-active/api/v1/adv/space/getAdvActivity", {});
            console.log(code, data);
            if (code === 200) {
                this.list = data;
                this.$nextTick(() => {
                    this.setSwiperHeight();
                });
            }
        },
        toList() {
            const { shopTypeId, parentId } = this.list[this.current];
            console.log(shopTypeId, parentId);
            if (shopTypeId === 2) {
                // 4s店
                uni.navigateTo({
                    url: "/pages/carShops/4sShop/play",
                });
            } else if (shopTypeId === 3 && parentId === 17) {
                // 户内
                uni.navigateTo({
                    url: "/pages/activity/activityRegistration/indooractivity?property=2",
                });
            } else if (shopTypeId === 3 && parentId === 18) {
                // 户外
                uni.navigateTo({
                    url: "/pages/activity/activityRegistration/outdoorsactivity?property=1",
                });
            }
        },
        toDetails(value) {
            if (value.shopTypeId === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + value.activityId,
                });
            } else {
                uni.navigateTo({
                    url: "/pages/home/activityDetail/index?id=" + value.activityId,
                });
            }
        },
        changeSwiper(e) {
            this.current = e.detail.current;
            //动态设置swiper的高度，使用nextTick延时设置
            this.$nextTick(() => {
                this.setSwiperHeight();
            });
        },
        setSwiperHeight() {
            let element = "#swiper-wrap" + this.current;
            let query = uni.createSelectorQuery().in(this);
            query.select(element).boundingClientRect();
            query.exec((res) => {
                if (res && res[0]) {
                    this.swiperHeight = res[0].height;
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.play {
    &-item {
        position: relative;
        width: 710rpx;
        margin: 0 10rpx;

        &-top {
            width: 710rpx;
            height: 400rpx;
            background: #6a6a6a;
            border-radius: 10rpx;

            &-image {
                width: 710rpx;
                height: 400rpx;
                border-radius: 10rpx;
            }

            &-time {
                position: absolute;
                display: flex;
                align-items: center;
                top: 20rpx;
                left: 0rpx;
                padding-left: 14rpx;
                padding-right: 31rpx;
                height: 52rpx;
                background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
                border-radius: 0rpx 26rpx 26rpx 0rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 40rpx;
            }

            &-btn {
                position: absolute;
                top: 328rpx;
                left: 20rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 670rpx;

                &-left {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120rpx;
                    height: 52rpx;
                    background: rgba(34, 34, 34, 0.5);
                    border-radius: 25rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 40rpx;
                }

                &-right {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120rpx;
                    height: 52rpx;
                    background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
                    border-radius: 25rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #ffffff;
                    line-height: 40rpx;
                }
            }
        }

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 40rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin: 19rpx 0rpx 14rpx 0rpx;
        }

        &-bottom {
            display: flex;
            justify-content: space-between;
            padding: 0rpx 0rpx 27rpx 0rpx;

            &-left {
                display: flex;

                &-symbol {
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #d91b1b;
                    line-height: 40rpx;
                    margin-top: 6rpx;
                }

                &-money {
                    font-size: 40rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #d91b1b;
                    line-height: 40rpx;
                }

                &-cross {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    text-decoration: line-through;
                    color: #999999;
                    line-height: 40rpx;
                    margin-left: 20rpx;
                    margin-top: 6rpx;
                }
            }

            &-enroll {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                margin-right: 12rpx;
            }

            &-head {
                width: 40rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background: #f8f8f8;
                margin-left: 4rpx;
            }

            &-more {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background: #f8f8f8;
            }
        }
    }
}

.o0 {
    opacity: 0;
}

.df {
    display: flex;
}

.aic {
    align-items: center;
}

.w6h6 {
    width: 6rpx;
    height: 6rpx;
    background: #999999;
    border-radius: 6rpx;
}

.w180h180 {
    width: 180rpx;
    height: 180rpx;
}

.h40 {
    height: 40rpx;
}

.ml4 {
    margin-left: 4rpx;
}

.mr4 {
    margin-right: 4rpx;
}

.pa260110 {
    position: absolute;
    left: 260rpx;
    top: 110rpx;
}

.mr14 {
    margin-right: 14rpx;
}
</style>
