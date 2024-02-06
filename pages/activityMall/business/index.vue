<template>
    <!-- 商家主页 -->
    <view class="page">
        <view v-if="isShowpage">
            <!-- 顶部搜索栏 -->
            <view class="search-top" :style="{ height: navbarHeight + 'px' }">
                <!--  #ifdef APP-PLUS  -->
                <u-navbar :autoBack="true">
                    <view class="u-nav-slot u-flex" slot="center">
                        <view @click="OnPushSearch" style="margin-left: 100rpx; margin-right: 20rpx">
                            <u-search :disabled="true" :placeholder="title" v-model="keyword" :showAction="false">
                            </u-search>
                        </view>
                    </view>
                </u-navbar>
                <!--  #endif -->
                <!--  #ifdef MP-WEIXIN  -->
                <u-navbar :autoBack="true">
                    <view class="u-nav-slot" slot="center" style="margin-left: 46px">
                        <view @click="OnPushSearch" :style="{ width: searchWidth }"></view>
                    </view>
                </u-navbar>
                <!--  #endif -->
            </view>
            <view v-if="!imgList" style="height: 100rpx"></view>
            <view v-else-if="imgList">
                <carousel
                    :list="imgList"
                    :topStyle="{ width: '750rpx', borderRadius: '0rpx' }"
                    height="430rpx"
                    urlkey="url"
                    :dataType="1"
                    :indicatorType="4"
                    :clickType="2"
                    :isfullscreen="false"
                    :radius="0"
                >
                </carousel>
            </view>

            <view class="info-item">
                <view class="u-flex jsb">
                    <view>
                        <view class="u-flex alc">
                            <view class="size32 fwb oneLine" style="width: 534rpx">{{ dataList.baseName }}</view>
                        </view>
                        <view class="u-flex alc mt10">
                            <view class="u-flex alc">
                                <view>
                                    <u-rate
                                        activeColor="#D91B1B"
                                        count="5"
                                        v-model="dataList.star"
                                        :readonly="true"
                                    ></u-rate>
                                </view>
                                <view class="size24" style="margin-left: 15rpx">{{ dataList.star }}</view>
                            </view>
                        </view>
                    </view>
                    <view @click="previewImg" class="tac">
                        <image
                            style="width: 46rpx; height: 46rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231009/file_1696839871028.png"
                        ></image>
                        <view class="mainRed size24">添加微信</view>
                    </view>
                </view>
                <u-divider :text="null"></u-divider>
                <view class="size26">
                    {{ dataList.baseAddress }}
                </view>
                <view class="u-flex txtDarkGray size24 mt10">
                    <view @click="openmap" class="u-flex">
                        <view style="margin-top: 4rpx">
                            <image
                                style="width: 27rpx; height: 27rpx"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183164211.png"
                            >
                            </image>
                        </view>
                        <view class="ml10">距您{{ dataList.distanceMsg }}</view>
                    </view>
                    <view @click="telphone" class="u-flex" style="margin-left: 60rpx">
                        <view style="margin-top: 4rpx">
                            <image
                                style="width: 27rpx; height: 27rpx"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183493823.png"
                            >
                            </image>
                        </view>
                        <view class="ml10">电话联系 {{ dataList.baseMobile }}</view>
                    </view>
                </view>
                <u-divider :text="null"></u-divider>
                <view class="size26">
                    营业时间：<text class="txtDarkGray">{{ dataList.openingHours }}</text>
                </view>
            </view>

            <view class="bgfff" style="margin: 0 23rpx 30rpx; border-radius: 15rpx">
                <view class="bgfff" style="position: sticky; top: 124rpx; z-index: 9999999; height: 88rpx">
                    <scroll-view style="width: 700rpx; white-space: nowrap; margin: 25rpx 0" scroll-x="true">
                        <view class="flex">
                            <view
                                v-for="(item, index) in newtags"
                                :key="index"
                                style="margin-right: 40rpx"
                                class="shop-btn"
                                :class="{ 'shop-btn-s': tabsindex == index }"
                                @click="Onclicktab(item, index)"
                                >{{ item.name }}</view
                            >
                        </view>
                    </scroll-view>
                </view>
                <!-- 内容 -->
                <view class="u_contetns mt10" style="padding: 0 23rpx 23rpx">
                    <!-- 套餐 -->
                    <view class="main0">
                        <view v-if="dataList.merchantDisplayVOS.length > 0" class="mt10">
                            <view class="size28 fwb" style="padding: 10rpx 0">精选套餐</view>
                            <view
                                v-for="item in dataList.merchantDisplayVOS"
                                :key="item.id"
                                class="u-flex"
                                style="margin-bottom: 15rpx"
                                @click="Onpushchant(item)"
                            >
                                <view>
                                    <image
                                        style="width: 107rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    ></image>
                                </view>
                                <view style="margin-left: 15rpx">
                                    <view class="size26 oneLine fwb" style="width: 400rpx">{{ item.title }} </view>
                                    <view class="u-flex alc mt10">
                                        <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                        <view class="size24 txtLighGray ml10 txtls"
                                            >¥{{ item.mgroupPrice ? item.mgroupPrice : item.marketPrice }}
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!-- 团购 -->
                    <view class="main1">
                        <view v-if="dataList.groupDisplayVOS.length > 0" class="mt10">
                            <view class="size28 fwb" style="padding: 10rpx 0">优惠团购</view>
                            <view
                                v-for="item in dataList.groupDisplayVOS"
                                :key="item.id"
                                class="flex"
                                style="margin-bottom: 15rpx"
                                @click="OnPushGroup(item)"
                            >
                                <view>
                                    <image
                                        style="width: 107rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    ></image>
                                </view>
                                <view style="margin-left: 15rpx">
                                    <view class="size28 oneLine fwb" style="width: 400rpx">{{ item.title }} </view>
                                    <view v-if="item.activityPaymentPreferenceId" class="mainRed redBorder">
                                        <text v-if="item.activityPaymentPreferenceId == 4">人保信用卡用户专享</text>
                                        <text v-else-if="item.activityPaymentPreferenceId == 5"
                                            >农行信用卡用户专享</text
                                        >
                                        <text v-else-if="item.activityPaymentPreferenceId == 6"
                                            >工行信用卡用户专享</text
                                        >
                                        <text v-else-if="item.activityPaymentPreferenceId == 7"
                                            >邮储信用卡用户专享</text
                                        >
                                        <text v-else-if="item.activityPaymentPreferenceId == 8"
                                            >民生信用卡用户专享</text
                                        >
                                        <text v-else-if="item.activityPaymentPreferenceId == 10">官方优惠专享</text>
                                    </view>
                                    <view v-else> </view>
                                    <view class="u-flex alc mt10">
                                        <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                        <view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }} </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!-- 活动 -->
                    <view class="main2">
                        <view v-if="dataList.activityDisplayVOS.length > 0" class="mt10">
                            <view class="size28 fwb" style="padding: 10rpx 0">活动报名</view>
                            <view
                                v-for="item in dataList.activityDisplayVOS"
                                :key="item.id"
                                class="u-flex"
                                style="margin-bottom: 15rpx"
                                @click="Onpushactivity(item)"
                            >
                                <view>
                                    <image
                                        style="width: 188rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    ></image>
                                </view>
                                <view style="margin-left: 15rpx; width: 464rpx">
                                    <view class="size28 oneLine fwb">{{ item.title }}</view>
                                    <view class="mainRed redBorder-num">
                                        <text>剩余名额：{{ item.num }}</text>
                                    </view>
                                    <view class="u-flex alc mt10">
                                        <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                        <view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }}</view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                    <!-- 精彩回放 -->
                    <view class="size26 fwb" v-if="dataList.marvellousVOS.length > 0">
                        <view>精彩回放</view>
                        <view class="mt10">
                            <scroll-view scroll-x="true" scroll-left="0">
                                <view class="u-flex">
                                    <view
                                        v-for="item in dataList.marvellousVOS"
                                        :key="item.id"
                                        style="margin-right: 23rpx"
                                        @click="Onpushwonder(item)"
                                    >
                                        <view>
                                            <image
                                                style="border-radius: 8rpx; width: 250rpx; height: 188rpx"
                                                :src="item.img"
                                            ></image>
                                        </view>
                                        <view class="moreLine size26">
                                            {{ item.title }}
                                        </view>
                                    </view>
                                </view>
                            </scroll-view>
                        </view>
                    </view>
                    <!-- 达人推荐 -->
                    <view class="main3 mt10">
                        <recommendX :fromType="2" :shopId="shopId" :isTitle="1" :isShopPunch="1"></recommendX>
                    </view>
                    <!-- 主页 -->
                    <!-- <view class="main4 mt10">
                        <view class="size28 fwb" style="padding:10rpx 0;">主页</view>
                        <view class="size26 fwb">{{ dataList.shopFeature ? dataList.shopFeature : '' }}</view>
                        <view v-for="(item, index) in dataList.homePageDateVOS" :key="index">
                            <view v-if="item.type == 1" class="select-shop-text">
                                {{ item.associatedContent }}
                            </view>
                            <view v-if="item.type == 2 && item.pictureType == 1" class="select-shop-one">
                                <image class="select-shop-one-img" mode="widthFix" :src="item.associatedContent">
                                </image>
                            </view>
                            <view v-if="item.type == 2 && item.pictureType == 2" class="select-shop-two u-flex-al">
                                <image class="select-shop-two-img" mode="widthFix"
                                    :src="item.associatedContent.split(',')[0]">
                                </image>
                                <image class="select-shop-two-img" mode="widthFix"
                                    :src="item.associatedContent.split(',')[1]">
                                </image>
                            </view>
                            <video v-if="item.type == 3" class="select-shop-video" :enable-progress-gesture="false"
                                :src="item.associatedContent"></video>
                        </view>
                    </view> -->
                    <view
                        v-if="
                            dataList.expireMerchantDisplayVOS.length ||
                            dataList.expireGroupDisplayVOS.length ||
                            dataList.expireActivityDisplayVOS.length
                        "
                        class="main4"
                    >
                        <view class="mt10">
                            <view class="size28 fwb" style="padding: 10rpx 0">历史优惠</view>
                            <view v-for="item in dataList.expireMerchantDisplayVOS" :key="item.id">
                                <view class="u-flex" style="margin-bottom: 15rpx" @click="Onpushchant(item)">
                                    <image
                                        style="width: 107rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    />
                                    <view style="margin-left: 15rpx">
                                        <view class="size26 oneLine fwb" style="width: 400rpx">{{ item.title }} </view>
                                        <view class="u-flex alc mt10">
                                            <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                            <view class="size24 txtLighGray ml10 txtls"
                                                >¥{{ item.mgroupPrice ? item.mgroupPrice : item.marketPrice }}
                                            </view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view v-for="item in dataList.expireGroupDisplayVOS" :key="item.id">
                                <view class="u-flex" style="margin-bottom: 15rpx" @click="OnPushGroup(item)">
                                    <image
                                        style="width: 107rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    />
                                    <view style="margin-left: 15rpx">
                                        <view class="size28 oneLine fwb" style="width: 400rpx">{{ item.title }} </view>
                                        <view v-if="item.activityPaymentPreferenceId" class="mainRed redBorder">
                                            <text v-if="item.activityPaymentPreferenceId == 4">人保信用卡用户专享</text>
                                            <text v-else-if="item.activityPaymentPreferenceId == 5"
                                                >农行信用卡用户专享</text
                                            >
                                            <text v-else-if="item.activityPaymentPreferenceId == 6"
                                                >工行信用卡用户专享</text
                                            >
                                            <text v-else-if="item.activityPaymentPreferenceId == 7"
                                                >邮储信用卡用户专享</text
                                            >
                                            <text v-else-if="item.activityPaymentPreferenceId == 8"
                                                >民生信用卡用户专享</text
                                            >
                                            <text v-else-if="item.activityPaymentPreferenceId == 10">官方优惠专享</text>
                                        </view>
                                        <view v-else />
                                        <view class="u-flex alc mt10">
                                            <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                            <view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }}</view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                            <view v-for="item in dataList.expireActivityDisplayVOS" :key="item.id">
                                <view class="u-flex" style="margin-bottom: 15rpx" @click="Onpushactivity(item)">
                                    <image
                                        style="width: 188rpx; height: 107rpx; border-radius: 8rpx"
                                        :src="item.coverPicture"
                                    />
                                    <view style="margin-left: 15rpx; width: 464rpx">
                                        <view class="size28 oneLine fwb">{{ item.title }}</view>
                                        <view class="mainRed redBorder-num">
                                            <text>剩余名额：{{ item.num }}</text>
                                        </view>
                                        <view class="u-flex alc mt10">
                                            <view class="size24 mainRed fwb">¥{{ item.flashSalePrice }}</view>
                                            <view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }}</view>
                                        </view>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view style="height: 50rpx"></view>
        </view>
        <request-loading></request-loading>
    </view>
</template>

<script>
import carousel from "@/components/carousel/index.vue";
import recommendX from "@/components/darenRecommend/recommendX.vue";
export default {
    components: {
        carousel,
        recommendX,
    },

    data() {
        return {
            tabsindex: 0,
            tags: [],
            newtags: [],
            ispreview: 0,
            shopId: "",
            dataList: {},
            imgList: [],
            isShowpage: false,
            isClick: false,
            preActive: 0,
            isshowreturn: true,
            relatedType: null,
        };
    },
    onPageScroll(obj) {
        const { scrollTop } = obj;
        this.scrollTochang(scrollTop);
    },
    onLoad(option) {
        let _this = this;
        // uni.setStorageSync("lat", option.lat);
        // uni.setStorageSync("lng", option.lng);
        this.shopId = option.id;
        this.relatedType = option.relatedType;
        this.getlist();
    },
    onReady() {
        let _this = this;
        setTimeout(() => {
            _this.getheight();
        }, 500);
    },
    computed: {
        // 状态栏高度适配
        navbarHeight() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
        },
        height() {
            return `calc(100vh - ${this.navbarHeight}px - 10px)`;
        },
    },
    onShow() {},

    methods: {
        //预览图片
        previewImg() {
            uni.previewImage({
                urls: [this.dataList.baseCode],
            });
        },
        Onpushwonder(item) {
            uni.navigateTo({
                url: "/pages/home/wonderfulReview/detail?id=" + item.id,
            });
        },

        Onpushactivity(item) {
            if (this.ispreview == 1) {
                return false;
            }
            uni.navigateTo({
                url: "/pages/home/activityDetail/index?id=" + item.id,
            });
        },
        OnPushGroup(item) {
            if (this.ispreview == 1) {
                return false;
            }
            uni.navigateTo({
                url: "/pages/grouppurchase/detail?id=" + item.id,
            });
        },
        Onpushchant(item) {
            if (this.ispreview == 1) {
                return false;
            }
            console.log(item);
            uni.navigateTo({
                url: "/pages/grouppurchase/packagedetail?id=" + item.id+"&relatedType="+this.relatedType,
            });
        },
        getheight() {
            this.$nextTick(() => {
                //   此时把每个dom的距离拿出来
                let arr = [
                    {
                        name: "精选套餐",
                        index: 1,
                    },
                    {
                        name: "精选套餐",
                        index: 2,
                    },
                    {
                        name: "精选套餐",
                        index: 3,
                    },
                    {
                        name: "精选套餐",
                        index: 4,
                    },
                    {
                        name: "精选套餐",
                        index: 5,
                    },
                ];
                arr.forEach((item, index) => {
                    let query = uni.createSelectorQuery().in(this);
                    query
                        .select(".main" + index)
                        .boundingClientRect((v) => {
                            if (item.index == 1) {
                                if (v.height != 0) {
                                    this.newtags.push({
                                        name: "精选套餐",
                                        scrollTop: v.top - 100,
                                        index: 0,
                                    });
                                }
                            }
                            if (item.index == 2) {
                                if (v.height != 0) {
                                    this.newtags.push({
                                        name: "优惠团购",
                                        scrollTop: v.top - 100,
                                        index: 1,
                                    });
                                }
                            }
                            if (item.index == 3) {
                                if (v.height != 0) {
                                    this.newtags.push({
                                        name: "活动报名",
                                        scrollTop: v.top - 100,
                                        index: 2,
                                    });
                                }
                            }
                            if (item.index == 4) {
                                if (v.height != 0) {
                                    this.newtags.push({
                                        name: "达人推荐",
                                        scrollTop: v.top - 100,
                                        index: 3,
                                    });
                                }
                            }
                            if (item.index == 5) {
                                if (v.height != 0) {
                                    this.newtags.push({
                                        name: "历史优惠",
                                        scrollTop: v.top - 100,
                                        index: 4,
                                    });
                                }
                            }
                        })
                        .exec();
                });
            });
        },

        scrollTochang(scrollTop) {
            if (scrollTop > 0) {
                this.isshowreturn = false;
            } else {
                this.isshowreturn = true;
            }
            if (this.isClick) return;
            let idx = this.newtags.findIndex((item) => scrollTop <= item.scrollTop);
            if (idx == -1) {
                idx = this.newtags.length - 1;
            } else if (idx == 0) {
            } else {
                idx = idx;
            }
            this.tabsindex = idx;
            // this.preActive = this.tabsindex;
        },
        // 跳转锚点
        goto(name) {
            uni.createSelectorQuery()
                .select(name)
                .boundingClientRect((data) => {
                    //目标位置的节点：类class或者id
                    uni.createSelectorQuery()
                        .select(".u_contetns")
                        .boundingClientRect((res) => {
                            //最外层盒子的节点：类class或者id
                            uni.pageScrollTo({
                                duration: 100, //过渡时间
                                scrollTop: data.top + 420 - res.top, //到达距离顶部的top值
                                // scrollTop:data.top - res.top,//如果置顶
                            });
                        })
                        .exec();
                })
                .exec();
        },
        Onclicktab(item, index) {
            console.log(index);
            this.isClick = true;
            switch (index) {
                case 0:
                    this.goto(".main0");
                    break;
                case 1:
                    this.goto(".main1");
                    break;
                case 2:
                    this.goto(".main2");
                    break;
                case 3:
                    this.goto(".main3");
                    break;
                case 4:
                    this.goto(".main4");
                    break;
            }
            this.isClick = false;
            this.tabsindex = index;
            console.log(this.tabsindex);
            // this.preActive = this.currentActive;
        },
        openmap() {
            let _this = this;
            uni.openLocation({
                latitude: _this.dataList.lat,
                longitude: _this.dataList.lng,
                success: function () {
                    //console.log('success');
                },
            });
        },
        telphone() {
            uni.makePhoneCall({
                phoneNumber: this.dataList.baseMobile,
            });
        },

        getlist() {
            this.$showLoading();
            this.$newrequest
                .post("coc-active/api/v1/activityShop/merchantHomepage", {
                    shopId: this.shopId,
                })
                .then((res) => {
                    if (res.code == 200) {
                        if (res.data.merchantDisplayVOS.length > 0) {
                            this.tags.push({
                                name: "精选套餐",
                                index: 1,
                            });
                        }
                        if (res.data.groupDisplayVOS.length > 0) {
                            this.tags.push({
                                name: "优惠团购",
                                index: 2,
                            });
                        }
                        if (res.data.activityDisplayVOS.length > 0) {
                            this.tags.push({
                                name: "活动报名",
                                index: 3,
                            });
                        }
                        this.tags.push(
                            {
                                name: "达人推荐",
                                index: 5,
                            },
                            {
                                name: "主页",
                                index: 4,
                            }
                        );
                        this.dataList = res.data;
                        if (res.data.carouselUrl) {
                            let list = [];
                            res.data.carouselUrl.forEach(function (s) {
                                if (s.shopCarouselType == 1) {
                                    list.push({
                                        url: s.carouselUrl,
                                        type: "image",
                                    });
                                } else {
                                    list.unshift({
                                        url: s.carouselUrl,
                                        type: "video",
                                    });
                                }
                            });
                            this.imgList = list;
                        }
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                })
                .finally(() => {
                    this.isShowpage = true;
                    this.$hideLoading();
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.info-item {
    border-radius: 38rpx 38rpx 0rpx 0rpx;
    background: #ffffff;
    padding: 23rpx;
    position: relative;
    top: -30rpx;
}

.main-item {
    margin: 0 23rpx 30rpx;
    padding: 0 23rpx 23rpx 23rpx;
    background: #ffffff;
    border-radius: 15rpx;
}

.tab_item {
    color: #666;
    // margin-right: 60rpx;
    font-size: 28rpx;
}

.currentitem {
    font-size: 32rpx;
    font-weight: bold;
    color: #222222;
}

.yuan {
    width: 72rpx;
    height: 36rpx;
    background: #fbe8e8;
    border-radius: 158rpx 158rpx 158rpx 158rpx;
    line-height: 36rpx;
    font-size: 20rpx;
    text-align: center;
    color: #dd3232;
}

.select-shop-text {
    font-size: 28rpx;
    font-family: PingFang-SC-Medium;
    // font-weight: 500;
    margin-bottom: 50rpx;
    white-space: pre-wrap;
}

.select-shop-one {
    margin-bottom: 8rpx;
}

.select-shop-one-img {
    width: 650rpx;
    border-radius: 10rpx;
}

.select-shop-two {
    justify-content: space-between;
    margin-bottom: 15rpx;
}

.select-shop-two-img {
    width: 320rpx;
    border-radius: 10rpx;
}

.select-shop-video {
    width: 100%;
    height: 400rpx;
    margin-bottom: 15rpx;
    border-radius: 10rpx;
}

.redBorder {
    display: initial;
    border-radius: 4rpx;
    border: 1rpx solid #d91b1b;
    padding: 4rpx;
    text-align: center;
    margin-top: 10rpx;
    font-size: 18rpx;
}

.redBorder-num {
    display: initial;
    border-radius: 4rpx;
    border: 1rpx solid #d91b1b;
    padding: 4rpx;
    text-align: center;
    margin-top: 5rpx;
    font-size: 18rpx;
}

.size26 {
    font-size: 26rpx;
}

.business-btn {
    width: 100rpx;
    height: 35rpx;
    background: #d91b1b;
    border-radius: 10rpx;
    color: #ffffff;
    margin-right: 16rpx;
    line-height: 35rpx;
}

.business-text {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
}

.shop-btn {
    font-size: 28rpx;
    color: #999;
    height: 80rpx;
    line-height: 74rpx;
    width: 140rpx;
    text-align: center;
}

.shop-btn-s {
    color: #333;
    font-size: 32rpx;
    font-weight: bold;
}

.shop-btn-s::after {
    content: "";
    display: block;
    width: 45rpx;
    height: 6rpx;
    background-color: #d91b1b;
    margin: 0 auto;
}

::v-deep .u-swiper__indicator {
    bottom: 40rpx !important;
}

// .allbtn {
//     width: 80rpx;
// }
</style>
