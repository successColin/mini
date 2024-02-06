<template>
    <view class="page">
        <view :style="{ height: contentHeight }">
            <swiper class="swiper-box-list" :current="currentTab" @change="swiperChange">
                <swiper-item class="swiper-topic-list">
                    <view class="scroll-content">
                        <first-screen />
                    </view>
                </swiper-item>
                <swiper-item class="swiper-topic-list">
                    <scroll-view scroll-y class="scroll-content">
                        <car-service
                            ref="carService"
                            v-if="isLoadSecondPage"
                            :currentTabIndex="secondTab"
                            :tabbarHeight="tabbarHeight"
                        ></car-service>
                    </scroll-view>
                </swiper-item>
            </swiper>
        </view>
        <view
            v-show="currentTab == 0"
            class="slideBox"
            :style="{
                top: `${useHeight}px`,
                right: 0,
                'border-radius': '10rpx 0rpx 0rpx 10rpx',
            }"
			@click="currentTab=1"
        >
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20240110/file_1704850493481.gif" class="leftGif"></image>
        </view>
        <view
            v-show="currentTab == 1"
            class="slideBox"
            :style="{
                top: `calc(23rpx + ${navbarHeight}px + 66rpx)`,
                left: 0,
                'border-radius': '0rpx 10rpx 10rpx 0rpx',
            }"
			@click="currentTab=0"
        >
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704785417622.gif" class="leftGif"></image>
        </view>
        <view :style="{ height: tabbarHeight + 'px' }"></view>
        <tabbar v-model="tabbarHeight" routePath="pages/home/index"></tabbar>

        <u-popup
            :safeAreaInsetBottom="false"
            :show="showhomepop"
            @close="showhomepop = false"
            bgColor="transparent"
            mode="center"
        >
            <view @click="Onclickpop">
                <image style="width: 550rpx; height: 550rpx" :src="poplist.url"></image>
            </view>
            <view style="justify-content: center" class="u-flex" @click="showhomepop = false">
                <u-icon color="#ffffff" name="close-circle" size="20px"></u-icon>
            </view>
        </u-popup>

        <!-- 达人提示 -->
        <u-popup
            :safeAreaInsetBottom="false"
            :show="showTips"
            @close="showTips = false"
            bgColor="transparent"
            mode="center"
        >
            <view @click="handleJump">
                <image :style="tipsStyle" :src="gradeTipImg"></image>
            </view>
            <view style="justify-content: center; padding: 30rpx 0" class="u-flex" @click="showTips = false">
                <u-icon color="#ffffff" name="close-circle" size="20px"></u-icon>
            </view>
        </u-popup>
        <privacy-agreement></privacy-agreement>
    </view>
</template>

<script>
import firstScreen from "@/pages/home/firstScreen/index.vue";
import CarService from "@/pages/home/home/carService.vue";
import PrivacyAgreement from "./components/privacyAgreement.vue";

import tabbar from "@/components/tabbar/index.vue";
import { shareMixin } from "@/mixin/share.js";
import { getstorage, setstorage } from "@/utils/index.js";

export default {
    mixins: [shareMixin],
    components: {
        firstScreen,
        CarService,
        tabbar,
        PrivacyAgreement,
    },
    data() {
        return {
            currentTab: 0,
            secondTab: 0,
            isLoadSecondPage: false,

            showTips: false,
            gradeTipImg: "",
            poplist: {},
            showhomepop: false,
            visitinto: null,
            tabbarHeight: 0, //tabbar高度
            sharedetail: {},
            isneedAuthorization: false,
            tipsStyle: "",
            useHeight: 0,
        };
    },
    computed: {
        // z状态栏高度适配
        navbarHeight() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
        },
        contentHeight() {
            return `calc(100vh - ${this.tabbarHeight}px)`;
        },
    },
    onHide() {
        if (uni.getStorageSync("token")) {
            this.$request
                .post("/coc-active/api/v1/user/behavior/visit_exit", {
                    userVisitId: this.visitinto,
                })
                .then((res) => {});
        }
    },
    onLoad(option) {
        //用于跳转第二屏
        uni.$on("home_index_jump", (value) => {
            let tabIndex = 3; //第二屏玩乐活动
            if (this.isLoadSecondPage) {
                this.$refs.carService.clickTab(tabIndex, tabIndex - 1);
            } else {
                this.secondTab = tabIndex;
            }
            this.currentTab = 1;
        });

        uni.$on("use_height", (value) => {
            this.useHeight = value;
        });
        // console.log(11111111111, option);
        // enter:
        // 俱乐部公众号：115
        // 大昌公众号：116
        // 分享链接：117
        // uni.removeStorageSync('enter');
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        let _this = this;
        if (getstorage("token")) {
            this.getloginTime();
        }
        this.getPopup();
        this.masterRating();
        this.getshareimg();
        setTimeout(() => {
            _this.isneedAuthorization = uni.getStorageSync("needAuthorization");
        }, 500);
    },
    onShow() {
        uni.$emit("car_service_show");
        if (uni.getStorageSync("token")) {
            this.$request
                .post("/coc-active/api/v1/user/behavior/visit_into", {
                    type: 1,
                })
                .then((res) => {
                    this.visitinto = res;
                });
        }
        this.getPopup();
    },
    onUnload() {
        uni.$off("home_index_jump");
    },
    onShareAppMessage(res) {
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/home/index?enter=117",
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
            path: "/pages/home/index?enter=117",
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
        handleJump() {
            uni.navigateTo({
                url: "/pages/my/growthCenter/index",
            });
        },
        handleAgreePrivacyAuthorization() {
            this.isneedAuthorization = false;
            setstorage("needAuthorization", false);
        },
        pushwebview() {
            wx.openPrivacyContract({
                success: () => {}, // 打开成功
                fail: () => {}, // 打开失败
                complete: () => {},
            });
        },
        getshareimg() {
            this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/1").then((res) => {
                this.sharedetail = res.data;
            });
        },
        // 达人等级
        async masterRating() {
            let token = getstorage("token");
            if (!token) return;
            const res = await this.$newrequest.post("/coc-active/api/v1/newExpert/expertIndex");
            const { gradeIsTiped, gradeTipImg, grade, tagsList } = res.data;

            if (gradeIsTiped === 0 && gradeTipImg) {
                this.updateState(1, grade);
                this.showTips = true;
                this.gradeTipImg = gradeTipImg;
                this.tipsStyle = "width: 461rpx; height: 488rpx";
                return;
            }

            for (let i = 0; i < tagsList.length; i++) {
                const item = tagsList[i];
                const { isTiped, tipImg, tagsId } = item;
                if (isTiped === 0 && tipImg) {
                    this.updateState(2, tagsId);
                    this.showTips = true;
                    this.gradeTipImg = tipImg;
                    this.tipsStyle = "width: 527rpx; height: 595rpx";
                    break;
                }
            }
            // this.getBannerList('applets_new_customers_popup');
        },
        updateState(type, relId) {
            const userId = uni.getStorageSync("userId");
            this.$newrequest.post("/coc-active/api/v1/newExpert/tipsCompleted", {
                relId,
                type, // 1等级 2标签
                userId,
            });
        },
        async getPopup() {
            let status = new Date().toLocaleDateString() !== new Date(getstorage("ishomepop")).toLocaleDateString();
            let token = getstorage("token");
            let register = getstorage("register");
            if (token && status) {
                const {
                    data: { type },
                } = await this.$newrequest.post("/coc-active/api/v1/group/isNewPerson", {
                    type: 1,
                });
                if (type == 1) {
                    setstorage("ishomepop", new Date().getTime());
                    if (register) {
                        this.getBannerList("applets_registration_popup");
                    } else {
                        this.getBannerList("applets_new_customers_popup");
                    }
                } else if (type == 2) {
                    setstorage("ishomepop", new Date().getTime());
                    this.getBannerList("applets_popup");
                }
            } else if (status) {
                setstorage("ishomepop", new Date().getTime());
                this.getBannerList("applets_new_customers_popup");
            }
        },
        getloginTime() {
            this.$request.post("/coc-active/api/v2/homePage/loginTime");
        },
        Onclickpop() {
            let pageList = [
                "pages/home/index",
                "pages/home/integral",
                "pages/home/activityMall/index",
                "pages/home/my",
                "pages/home/4sShop",
            ];
            if (this.poplist.jumpType == 1 && this.poplist.pageRoute) {
                //内部小程序之间跳转
                if (this.poplist.jumpUrl) {
                    if (pageList.findIndex((m) => m == this.poplist.pageRoute) >= 0) {
                        uni.switchTab({
                            url: "/" + this.poplist.pageRoute + "?id=" + this.poplist.jumpUrl,
                        });
                    } else if (
                        this.poplist.pageRoute == "pages/carShops/carList/index?type=1" ||
                        this.poplist.pageRoute == "pages/carShops/carList/index?type=2"
                    ) {
                        uni.navigateTo({
                            url: "/" + this.poplist.pageRoute + "&id=" + this.poplist.jumpUrl,
                        });
                    } else {
                        uni.navigateTo({
                            url: "/" + this.poplist.pageRoute + "?id=" + this.poplist.jumpUrl,
                        });
                    }
                } else {
                    if (pageList.findIndex((m) => m == this.poplist.pageRoute) >= 0) {
                        uni.switchTab({
                            url: "/" + this.poplist.pageRoute,
                        });
                    } else {
                        if (this.poplist.pageRoute == "pages/my/integral/index") {
                            if (!getstorage("token")) {
                                uni.navigateTo({
                                    url: "/pages/activity/share/index",
                                });
                                return false;
                            }
                        }
                        uni.navigateTo({
                            url: "/" + this.poplist.pageRoute,
                        });
                    }
                }
            } else if (this.poplist.jumpType == 2 && this.poplist.jumpUrl) {
                //外部H5链接
                uni.navigateTo({
                    url: "/pages/home/webview?url=" + this.poplist.jumpUrl,
                });
            }
            this.showhomepop = false;
        },
        getBannerList(val) {
            this.$newrequest
                .post("/coc-system/api/v1/system/dictionaries/banner/list", {
                    adPosition: val,
                })
                .then((res) => {
                    if (res.data.length > 0) {
                        this.showhomepop = true;
                        this.poplist = res.data[0];
                        if (val === "applets_registration_popup") {
                            setstorage("register", 0);
                        }
                    }
                });
        },
        swiperChange(e) {
            this.currentTab = e.detail.current;
            if (e.detail.current == 1) {
                this.isLoadSecondPage = true;
            } else {
				uni.$emit("showNavigation");
			}
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
}

.swiper-box-list {
    width: 100%;
    height: 100%;
    flex: 1;

    .swiper-topic-list {
        width: 100%;

        .scroll-content {
            height: 100%;
        }
    }
}

.slideBox {
    position: fixed;
    z-index: 99999;
    background: #222222;
    opacity: 0.4;
    width: 60rpx;
    height: 200rpx;

    .leftGif {
        width: 60rpx;
        height: 200rpx;
    }
}

image {
    display: block;
}

.botton-none {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    margin: 20rpx auto;
    width: 200rpx;
}

.botton-none::after {
    border: none;
}

.agree_btn {
    background-color: #d91b1b;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 144rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #ffffff;
}

::v-deep {
    .navigation__carousel {
        .u-swiper-indicator__wrapper__dot--active {
            width: 5px !important;
        }

        .u-swiper__indicator {
            bottom: 38rpx !important;
        }
    }

    .u-navbar__content__left {
        padding: 0 6rpx !important;
    }
}
</style>
