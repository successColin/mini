<template>
    <view class="page">
        <view class="top">
            <swiper>
                <swiper-item v-for="(v, i) in banners" :key="v.index">
                    <image :src="v" class="top-image" />
                </swiper-item>
            </swiper>
            <u-navbar bgColor="transparent" title="地方韵味" :titleStyle="{ color: '#FFFFFF' }" :autoBack="true">
                <view class="navbar-left" slot="left">
                    <view class="navbar-left-icon">
                        <u-icon name="arrow-left" size="20" color="#FFFFFF" />
                    </view>
                    <view class="navbar-left-icon" @click.stop="toCity">
                        <u-icon name="map" size="16" color="#FFFFFF" />
                    </view>
                    <view class="navbar-left-title" :style="{ color: '#FFFFFF' }" @click.stop="toCity">
                        {{ cityname }}
                    </view>
                </view>
            </u-navbar>
            <view class="top-location" @click="toLocalCharmMap">
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20240111/file_1704951899830.png"
                    class="top-location-image"
                />
                <view class="top-location-title">路线地图</view>
            </view>
        </view>
        <view id="content" class="content">
            <view class="content-image" :style="{ height: imageHeight + 'px' }" />
            <view class="content-top" />
            <view v-for="v in list" :key="v.id" v-if="v.status" class="content-item">
                <view class="content-item-name">{{ v.title }}</view>
                <view class="content-item-title">{{ v.content }}</view>
                <view v-if="v.page === 0" class="content-list">
                    <view
                        v-for="value in v.list[v.page]"
                        :key="value.id"
                        class="content-item-piece"
                        @click="toDetails(value)"
                    >
                        <image :src="value.url" class="content-item-piece-image" />
                        <view class="content-item-piece-title">{{ value.title }}</view>
                    </view>
                </view>
                <view v-else class="content-swiper">
                    <swiper @change="(e) => swiperChange(e, v)">
                        <swiper-item v-for="val in v.page + 1" :key="val">
                            <view v-if="v.status" class="content-list">
                                <view
                                    v-for="value in v.list[val]"
                                    :key="value.id"
                                    class="content-item-piece"
                                    @click="toDetails(value)"
                                >
                                    <image :src="value.url" class="content-item-piece-image" />
                                    <view class="content-item-piece-title">{{ value.title }}</view>
                                </view>
                            </view>
                        </swiper-item>
                    </swiper>
                    <view class="content-indicator">
                        <view
                            v-for="val in v.page + 1"
                            :key="val"
                            :class="val === v.index ? 'content-indicator-line' : 'content-indicator-unline'"
                        />
                    </view>
                </view>
            </view>
            <view class="content-bottom" />
        </view>
    </view>
</template>
<script>
import { getstorage, setstorage } from "@/utils/index.js";
export default {
    data() {
        return {
            banners: [],
            list: [],
            content: 0,
            cityname: getstorage("cityname") || "无法获取",
            sharedetail: {}
        };
    },
    computed: {
        imageHeight() {
            return this.content > 1024 ? 1024 : this.content;
        },
    },
    created() {
        uni.$on("homeChangeCity", (res) => {
            setstorage("lat", res.location.lat);
            setstorage("lng", res.location.lng);
            setstorage("city", encodeURI(res.name));
            setstorage("cityname", res.name);
            setstorage("citycode", res.code);
            this.cityname = res.name;
            this.init();
        });
        this.init();
    },
    onLoad(option) {
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        this.getshareimg();
    },
    onShareAppMessage(res) {
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/activity/activityRegistration/localCharm?enter=117",
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
            path: "/pages/activity/activityRegistration/localCharm?enter=117",
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
    mounted() {},
    destroyed() {
        // uni.$off("homeChangeCity");
    },
    methods: {
        getshareimg() {
            this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/40").then((res) => {
                this.sharedetail = res.data;
            });
        },
        getElementHeight(id, name) {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(id)
                .boundingClientRect((res) => {
                    if (res) {
                        this[name] = res.height;
                    }
                })
                .exec();
        },
        init() {
            this.getLocalCharmList();
            this.getBannerList();
        },
        async getBannerList() {
            const {
                data: { records },
            } = await this.$request.post("/coc-system/api/v1/localCharmBanner/page", {
                cityCode: getstorage("citycode"),
                current: 1,
                size: 100,
            });
            const list = [];
            records.forEach((v) => {
                list.push(v.url);
            });
            this.banners = list;
        },
        async getLocalCharmList() {
            const { data } = await this.$request.post("/coc-active/api/v1/localCharm/categoryAndLocalCharmList", {
                cityCode: getstorage("citycode"),
            });
            const list = [];
            (data || []).forEach((v) => {
                const {
                    localCharmCategoryId,
                    localCharmListByCategory: { records, total },
                    title,
                    intro,
                } = v;
                const value = {
                    id: localCharmCategoryId,
                    index: 0,
                    title,
                    content: intro,
                    children: [],
                    page: Math.floor((total - 1) / 6),
                };
                records.forEach((val) => {
                    const { id, coverImage, title } = val;
                    value.children.push({ id: id, url: coverImage, title });
                });
                value.list = [value.children];
                value.status = value.children.length > 0;
                delete value.children;
                list.push(value);
            });
            this.list = list;
            this.$nextTick(() => {
                this.getElementHeight("#content", "content");
            });
        },
        async swiperChange({ detail: { current } }, { id, list }) {
            if (list[current]) {
                const copy_list = JSON.parse(JSON.stringify(this.list));
                copy_list.forEach((v) => {
                    if (v.id === id) {
                        v.index = current;
                    }
                });
                this.list = copy_list;
                return;
            }
            const {
                data: { records },
            } = await this.$request.post("/coc-active/api/v1/localCharm/list", {
                cityCode: getstorage("citycode"),
                current: current + 1,
                localCharmCategoryId: id,
                size: 6,
            });
            list[current] = [];
            records.forEach((v) => {
                const { id, coverImage, title } = v;
                list[current].push({ id, url: coverImage, title });
            });
            const copy_list = JSON.parse(JSON.stringify(this.list));
            copy_list.forEach((v) => {
                if (v.id === id) {
                    v.list = list;
                    v.index = current;
                }
            });
            this.list = copy_list;
        },
        toCity() {
            uni.navigateTo({
                url: "/pages/activity/chooseCity/chooseCity",
            });
        },
        toLocalCharmMap() {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/localCharmMap",
            });
        },
        toDetails(value) {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/localCharmDetails?id=" + value.id,
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@font-face {
    font-family: "Alimama ShuHeiTi";
    src: url("https://oss.dcqcjlb.com/51che_java_dev/20240110/file_1704870949498.TTF");
}

.page {
    min-height: 100vh;
    background: #f9f4ed;
}

.top {
    position: relative;
    width: 750rpx;
    height: 520rpx;
    &-image {
        width: 750rpx;
        height: 520rpx;
    }
    &-location {
        position: absolute;
        top: 200rpx;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 130rpx;
        height: 38rpx;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 19rpx 0 0 19rpx;
        &-image {
            width: 20rpx;
            height: 18rpx;
        }
        &-title {
            font-size: 20rpx;
            font-family: OPPOSans;
            font-weight: 500;
            color: #ffffff;
            margin-left: 5rpx;
        }
    }
}

.navbar-left {
    display: flex;
    align-items: center;
    &-icon {
        margin: 0 5rpx 0 10rpx;
    }
    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
    }
}

.content {
    position: relative;
    width: 750rpx;
    height: 100%;
    margin-top: -30rpx;
    &-image {
        position: absolute;
        width: 750rpx;
        background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20240110/file_1704872395508.png");
        background-size: cover;
    }
    &-top {
        width: 750rpx;
        height: 48rpx;
        z-index: 100;
    }
    &-list {
        display: flex;
        flex-wrap: wrap;
        width: 750rpx;
        z-index: 100;
    }
    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        &-name {
            font-size: 40rpx;
            font-family: Alimama ShuHeiTi;
            font-weight: bold;
            color: #ac763a;

            background: linear-gradient(163deg, #dda96e 0%, #c07c35 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-top: 12rpx;
            z-index: 100;
        }
        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin: 10rpx 0 15rpx;
            z-index: 100;
        }
        &-piece {
            width: 236rpx;
            height: 220rpx;
            background: #ffffff;
            border-radius: 10rpx;
            margin: 10rpx 0 10rpx 10rpx;
            &-image {
                display: block;
                width: 236rpx;
                height: 178rpx;
                border-radius: 10rpx;
            }
            &-title {
                display: flex;
                align-items: center;
                height: 42rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                margin: 0 10rpx;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }
    }
    &-bottom {
        width: 750rpx;
        height: 100rpx;
        z-index: 100;
    }
    &-swiper {
        position: relative;
        width: 750rpx;
        height: 486rpx;
    }
    &-indicator {
        position: absolute;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 750rpx;
        &-line {
            width: 19rpx;
            height: 6rpx;
            background: #c27f39;
            border-radius: 3rpx;
            margin: 0 4rpx;
        }
        &-unline {
            width: 8rpx;
            height: 6rpx;
            background: #dba669;
            border-radius: 3rpx;
            margin: 0 4rpx;
        }
    }
}

::v-deep .u-navbar__content__left {
    padding: 0 !important;
}

.top swiper {
    width: 750rpx;
    height: 520rpx;
}

swiper {
    width: 750rpx;
    height: 486rpx;
}
</style>
