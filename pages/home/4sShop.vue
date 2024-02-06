<template>
    <view class="page">
        <u-navbar
            title="4S店逛逛"
            :autoBack="false"
            leftIconSize="0"
            bgColor="transparent"
            :titleStyle="{ color: '#FFFFFF' }"
        >
    </u-navbar>
        <view class="bac_first" :style="{ height: `calc(${navbarHeight}px)` }"></view>
        <view :style="{ maxHeight: contentHeight, overflow: 'auto' }">
            <view class="bac_second" @click="toPlay">
                <search :fromType="'4s逛逛'" :isIcon="0" :isBgf="false" :marginTop="0"></search>
            </view>
            <swiper
                v-if="swiper.list.length > 0"
                class="swiper"
                :style="{ height: `calc(${height}rpx)` }"
                :previous-margin="swiper.margin"
                :next-margin="swiper.margin"
                :circular="true"
                :autoplay="true"
                @change="swiperChange"
            >
                <swiper-item v-for="(item, index) in swiper.list" :key="index">
                    <view class="le-item" :class="{ 'le-item-active': swiper.index == index }" @click="jump(4, item)">
                        <image class="le-img" :src="item.coverPicture"></image>
                        <view class="le-content">
                            <view class="le-title">{{ item.title }}</view>
                            <view class="le-label" v-if="item.activityPaymentPreferenceId">
                                <text class="le-label-item">{{
                                    getPaymentPreferenceIdTitle(item.activityPaymentPreferenceId)
                                }}</text>
                            </view>
                            <view class="le-bottom">
                                <view>
                                    <span v-if="item.payType == 1" class="le-bottom-price1">免费</span>
                                    <template v-else>
                                        <span class="le-bottom-prefix">￥</span>
                                        <span class="le-bottom-price1">
                                            {{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
                                        </span>
                                    </template>
                                    <span class="le-bottom-price2">￥{{ item.marketPrice }}</span>
                                </view>
                                <view class="le-bottom-btn">去报名</view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
            <view class="video_div">
                <view class="video_item video_item1" @click="jumpVideo(3)">
                    <view class="video_title_div">
                        <image
                            style="width: 294rpx; height: 31rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699836410709.png"
                        >
                        </image>
                    </view>
                    <view class="video_img_div">
                        <image class="video_img" mode="aspectFill" :src="xcjsVideoInfo.coverImage"></image>
                        <image
                            class="video_icon"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
                        >
                        </image>
                    </view>
                    <view class="video_car_title_div flex alc">
                        <view class="title1">{{ xcjsVideoInfo.brandName }}</view>
                        <view class="title2">{{ xcjsVideoInfo.title }}</view>
                    </view>
                    <view class="video_car_shop_div flex jsb">
                        <view class="shop_name">{{ xcjsVideoInfo.baseName }}</view>
                        <view class="btn" @click.stop="jump(0)">去看车</view>
                    </view>
                </view>
                <view class="video_item video_item2" @click="jumpVideo(2)">
                    <view class="video_title_div">
                        <image
                            style="width: 314rpx; height: 31rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699836643935.png"
                        >
                        </image>
                    </view>
                    <view class="flex alc" style="margin-top: 10rpx">
                        <view class="video_img_div">
                            <image class="video_img" mode="aspectFill" :src="byyyVideoInfo.coverImage"> </image>
                            <image
                                class="video_icon"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
                            ></image>
                            <view class="video_desc oneLine">{{ byyyVideoInfo.title }}</view>
                        </view>
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699836822760.png"
                            style="width: 134rpx; height: 143rpx; margin-left: 10rpx"
                            @click.stop="jump(1)"
                        ></image>
                    </view>
                </view>
                <view class="video_item video_item3" @click="jumpVideo(1)">
                    <view class="video_title_div">
                        <image
                            style="width: 316rpx; height: 30rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699836692262.png"
                        >
                        </image>
                    </view>
                    <view class="flex alc" style="margin-top: 10rpx">
                        <view class="video_img_div">
                            <image class="video_img" mode="aspectFill" :src="gzjyVideoInfo.coverImage"> </image>
                            <image
                                class="video_icon"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
                            >
                            </image>
                            <view class="video_desc oneLine">{{ gzjyVideoInfo.title }}</view>
                        </view>
                        <view>
                            <view style="width: 135rpx; height: 140rpx">
                                <image
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699837761819.png"
                                    style="width: 135rpx; height: 140rpx; margin-left: 10rpx"
                                    @click.stop="jump(2)"
                                >
                                </image>
                            </view>
                            <view style="width: 140rpx; height: 140rpx; margin-top: 7rpx">
                                <image
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699837779656.png"
                                    style="width: 140rpx; height: 140rpx; margin-left: 5rpx"
                                    @click.stop="jump(3)"
                                >
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <!-- 4s店列表 -->
            <view style="padding: 0 22rpx 0 28rpx">
                <shopList v-if="isRefesh" fromPage="shop"></shopList>
            </view>
        </view>
        <u-modal
            confirmColor="red"
            :show="showmodal"
            content="4s店车型推荐需要获取您的位置信息,请打开小程序设置,更改位置信息为'使用小程序时允许'后再次点击"
            @confirm="Ontruemodal"
        ></u-modal>
        <tabbar v-model="tabbarHeight" routePath="pages/home/4sShop"></tabbar>
    </view>
</template>

<script>
import search from "@/components/search/index.vue";
import shopList from "@/components/shopList/index.vue";
import tabbar from "@/components/tabbar/index.vue";
export default {
    components: {
        search,
        shopList,
        tabbar,
    },
    computed: {
        //除去自定义tabbar的高度
        contentHeight() {
            return `calc(100vh - ${this.tabbarHeight}px - ${this.navbarHeight}px)`;
        },
        navbarHeight() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
        },
    },
    data() {
        return {
            swiper: {
                margin: "115rpx",
                index: 0,
                list: [],
            },
            height: 444,
            tabbarHeight: 0, //tabbar高度
            gzjyVideoInfo: null,
            xcjsVideoInfo: null,
            byyyVideoInfo: null,
            isRefesh: true,
            sharedetail: {}
        };
    },
    onLoad(option) {
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        this.getshareimg();

        this.getFourSAdvActivity();
        this.getFourSAdvHelpVideo();
        this.getVideoList(3);
        this.getVideoList(4);
    },
    // 下拉刷新
    onPullDownRefresh() {
        this.isRefesh = false;
        setTimeout(() => {
            this.isRefesh = true;
            this.getFourSAdvHelpVideo();
            this.getVideoList(3);
            this.getVideoList(4);
            uni.stopPullDownRefresh(); //停止刷新
        }, 1000);
    },
    onShareAppMessage(res) {
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/home/4sShop?enter=117",
            success(res) {
                uni.showToast({
                    title: "分享成功",
                });
            },
            fail(res) {
                uni.showToast({
                    title: "分享失败",
                    icon: "none",
                });
            },
        };
    },
    onShareTimeline(res) {
        //分享到朋友圈
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/home/4sShop?enter=117",
            success(res) {
                uni.showToast({
                    title: "分享成功",
                });
            },
            fail(res) {
                uni.showToast({
                    title: "分享失败",
                    icon: "none",
                });
            },
        };
    },
    methods: {
        getshareimg() {
            this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/43").then((res) => {
                this.sharedetail = res.data;
            });
        },
        //swiper滑动事件
        swiperChange: function (e) {
            this.swiper.index = e.detail.current;
            if (this.swiper.list[this.swiper.index].activityPaymentPreferenceId) {
                this.height = 444;
            } else {
                this.height = 410;
            }
        },
        toPlay() {
            uni.navigateTo({
                url: "/pages/carShops/4sShop/play",
            });
        },
        //获取置顶活动
        getFourSAdvActivity() {
            this.$request.post("/coc-active/api/v1/adv/space/getFourSAdvActivity").then((res) => {
                if (res.code == 200) {
                    this.swiper.list = res.data;
                    if (this.swiper.list.length > 0 && this.swiper.list[0].activityPaymentPreferenceId) {
                        this.height = 444;
                    } else {
                        this.height = 410;
                    }
                } else {
                    uni.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2000,
                    });
                }
            });
        },
        //获取故障救援广告位
        getFourSAdvHelpVideo() {
            this.$request.post("/coc-active/api/v1/adv/space/getFourSAdvHelpVideo").then((res) => {
                if (res.code == 200) {
                    this.gzjyVideoInfo = res.data;
                } else {
                    uni.showToast({
                        title: res.message,
                        icon: "none",
                        duration: 2000,
                    });
                }
            });
        },
        //获取新车鉴赏/保养预约广告位
        getVideoList(type) {
            this.$request
                .post("/coc-active/api/v1/four_s/getVideoAdvV2", {
                    type,
                })
                .then((res) => {
                    if (res.code == 200) {
                        if (type == 3) {
                            //保养
                            this.byyyVideoInfo = res.data;
                        } else if (type == 4) {
                            //新车鉴赏
                            this.xcjsVideoInfo = res.data;
                        }
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                });
        },
        jump(index, item) {
            if (index == 0) {
                uni.navigateTo({
                    url: "/pages/carShops/motorcycletype/index",
                });
            } else if (index == 1) {
                uni.navigateTo({
                    url: "/pages/upkeep/consult",
                });
            } else if (index == 2) {
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultSearch",
                });
            } else if (index == 3) {
                uni.navigateTo({
                    url: "/pages/roadhelp/index",
                });
            } else if (index == 4) {
                if (item.shopTypeId === 2) {
                    uni.navigateTo({
                        url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + item.id,
                    });
                } else {
                    uni.navigateTo({
                        url: "/pages/home/activityDetail/index?id=" + item.id,
                    });
                }
            }
        },
        jumpVideo(index, item) {
            if (index == 1) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + this.gzjyVideoInfo.id + "&type=2&title=故障咨询",
                });
            } else if (index == 2) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + this.byyyVideoInfo.id + "&type=3&title=汽车保养",
                });
            } else if (index == 3) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + this.xcjsVideoInfo.id + "&type=4&title=新车鉴赏",
                });
            }
        },
        getPaymentPreferenceIdTitle(id) {
            if (id == 4) {
                return "人保用户专享";
            } else if (id == 5) {
                return "农行信用卡用户专享";
            } else if (id == 6) {
                return "工行信用卡用户专享";
            } else if (id == 7) {
                return "邮储信用卡用户专享";
            } else if (id == 8) {
                return "民生信用卡用户专享";
            } else if (id == 10) {
                return "官方优惠专享";
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
}

.bac_first {
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699839044066.png");
    background-repeat: no-repeat;
    width: 750rpx;
    background-size: 100% 100%;
}

.bac_second {
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20231122/file_1700637578623.gif");
    background-repeat: no-repeat;
    height: 203rpx;
    background-size: 100% 100%;
    padding: 5rpx 10rpx 0 10rpx;
}

.swiper {
    height: 444rpx;
    position: relative;
    top: -30rpx;

    .le-item {
        width: 520rpx;
        transform: scale(0.85);
        transition: transform 0.3s ease-in-out 0s;
        background: #ffffff;
        border-radius: 20rpx;
        padding-bottom: 20rpx;

        &-active {
            transform: scale(1);
        }

        .le-img {
            width: 520rpx;
            height: 292rpx;
            background: #6a6a6a;
            border-radius: 20rpx;
        }

        .le-content {
            padding: 0 9rpx 0 21rpx;
        }

        .le-title {
            font-size: 24rpx;
            font-weight: 500;
            color: #222222;
            margin-top: 15rpx;
            width: 490rpx;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-bottom: 5rpx;
        }

        .le-label {
            &-item {
                padding: 7rpx 17rpx 7rpx 17rpx;
                background: rgba(217, 27, 27, 0.08);
                border-radius: 10rpx;
                font-size: 20rpx;
                font-weight: 500;
                color: #d91b1b;
            }
        }

        .le-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 2rpx;

            &-prefix {
                font-size: 24rpx;
                font-weight: 500;
                color: #d91b1b;
            }

            &-price1 {
                font-size: 32rpx;
                font-weight: 500;
                color: #d91b1b;
            }

            &-price2 {
                font-size: 24rpx;
                font-weight: 400;
                text-decoration: line-through;
                color: #999999;
                margin-left: 10rpx;
            }

            &-btn {
                width: 100rpx;
                height: 43rpx;
                line-height: 43rpx;
                text-align: center;
                background: #d91b1b;
                border-radius: 22rpx;
                font-size: 24rpx;
                font-weight: 400;
                color: #ffffff;
                margin-right: 11rpx;
            }
        }
    }
}

.video_div {
    margin-top: 5rpx;
    margin-bottom: 15rpx;
    padding: 0 9rpx 0 10rpx;
}

.video_item {
    background: #ffffff;
    border-radius: 10rpx;
    margin-bottom: 10rpx;
    padding: 19rpx 10rpx 0 10rpx;

    .video_title_div {
        margin-left: 10rpx;
    }
}

.video_item1 {
    padding-bottom: 20rpx;

    .video_img_div {
        position: relative;
        width: 710rpx;
        height: 320rpx;
        margin-top: 10rpx;

        .video_img {
            width: 710rpx;
            height: 320rpx;
            border-radius: 10rpx;
        }
    }

    .video_icon {
        position: absolute;
        top: 128rpx;
        left: 323rpx;
        width: 64rpx;
        height: 64rpx;
    }

    .video_car_title_div {
        margin-top: 15rpx;

        .title1 {
            font-size: 24rpx;
            font-weight: bold;
            color: #222222;
        }

        .title2 {
            font-size: 24rpx;
            font-weight: 500;
            color: #999999;
            margin-left: 19rpx;
        }
    }

    .video_car_shop_div {
        margin-top: 5rpx;
        align-items: flex-end;

        .shop_name {
            font-size: 24rpx;
            font-weight: 500;
            color: #222222;
        }

        .btn {
            width: 101rpx;
            height: 37rpx;
            line-height: 37rpx;
            text-align: center;
            background: #d91b1b;
            border-radius: 19rpx;
            font-size: 20rpx;
            font-weight: 500;
            color: #ffffff;
        }
    }
}

.video_item2,
.video_item3 {
    padding-bottom: 11rpx;

    .video_img_div {
        position: relative;
        width: 574rpx;
        height: 280rpx;

        .video_img {
            width: 574rpx;
            height: 280rpx;
            border-radius: 10rpx;
        }
    }

    .video_icon {
        position: absolute;
        top: 116rpx;
        left: 263rpx;
        width: 48rpx;
        height: 48rpx;
    }

    .video_desc {
        position: absolute;
        left: 11rpx;
        bottom: 6rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #ffffff;
        max-width: 550rpx;
    }
}
</style>
