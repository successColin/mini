<template>
    <view class="page">
        <scroll-view
            :scroll-y="true"
            :refresher-enabled="true"
            @refresherrefresh="refresherrefresh"
            :refresher-triggered="refresherStatus"
            :style="{ maxHeight: contentHeight, overflow: 'auto' }"
        >
            <search :fromType="'4s逛逛'" :isIcon="0" :isBgf="false"></search>
            <view class="mt10">
                <carousel
                    :topClass="['activity-img']"
                    height="130px"
                    urlkey="url"
                    :dataType="2"
                    systemCode="applets_four_s_home_page"
                    :indicatorType="3"
                ></carousel>
            </view>
            <!-- 4个广告模块 -->
            <view class="flex u-flex-wrap gdModules mt10 jsb">
                <view class="gdItem mb10" v-for="(item, index) in gdData" :key="item.id">
                    <image :src="item.titleBg" class="gdTitle" @click="handleGdtitle(item, index)" />
                    <view class="imgBox" @click="handleGdvideo(item, index)">
                        <image :src="item.coverImage" class="gdCover" mode="aspectFill" />
                        <view class="itemModul">
                            <view class="fwb size24 gdTilte oneLine">{{ item.title }} </view>
                        </view>
                        <img
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
                            class="videoIcon"
                        />
                    </view>
                </view>
            </view>
            <!-- 4s店列表 -->
            <shopList fromPage="shop"></shopList>
        </scroll-view>
        <u-modal
            confirmColor="red"
            :show="showmodal"
            content="4s店车型推荐需要获取您的位置信息,请打开小程序设置,更改位置信息为'使用小程序时允许'后再次点击"
            @confirm="Ontruemodal"
        ></u-modal>
    </view>
</template>

<script>
import search from "@/components/search/index.vue";
import carousel from "@/components/carousel/index.vue";
import shopList from "@/components/shopList/index.vue";
import { shareMixin } from "@/mixin/share.js";
import { getstorage, tologin } from "@/utils/index.js";
export default {
    mixins: [shareMixin],
    components: {
        carousel,
        search,
        shopList,
    },
    computed: {
        //除去自定义tabbar的高度
        contentHeight() {
            return `calc(100vh - ${this.tabbarHeight}px)`;
        },
        loadhelpBottom() {
            return `calc(${this.tabbarHeight}px + 100rpx)`;
        },
    },
    data() {
        return {
            fourSShopVO: {},
            brandindex: 0,
            shopindex: 0,
            istoken: false,
            current: 1,
            shopList: [],
            brandId: "13",
            shopId: "",
            visitinto: null,
            tabbarHeight: 0, //tabbar高度
            refresherStatus: false, //下拉刷新状态
            token: null,
            isExpert: null,
            brandName: "奔驰",
            fourbrand: [],
            lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC",
            gdData: [],
        };
    },
    onShow() {
        this.getGd();
    },
    methods: {
        getGd() {
            this.$request.post("/coc-active/api/v1/four_s/getVideoAdv", {}).then((res) => {
                this.gdData = res.data.videoAdvListVOS;
                if (res.data.videoAdvArticleListVOs != null) {
                    this.gdData.unshift(res.data.videoAdvArticleListVOs[0]);
                } else {
                    this.gdData.unshift({
                        activityTitle: "",
                        coverImage: "",
                    });
                }

                this.gdData[0].titleBg = "https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698223170795.png";
                this.gdData[1].titleBg = "https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698223194566.png";
                this.gdData[2].titleBg = "https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698223212675.png";
                this.gdData[3].titleBg = "https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698223224175.png";
            });
        },
        handleGdtitle(item, index) {
            if (index == 0) {
                uni.navigateTo({
                    url: "/pages/carShops/4sShop/play",
                });
            } else if (index == 1) {
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultSearch",
                });
            } else if (index == 2) {
                uni.navigateTo({
                    url: "/pages/upkeep/consult",
                });
            } else if (index == 3) {
                uni.navigateTo({
                    url: "/pages/carShops/motorcycletype/index",
                });
            }
        },
        handleGdvideo(item, index) {
            if (index == 0) {
                uni.navigateTo({
                    url: "/pages/activity/articlevideo/index?id=" + item.id + "&title=娱乐精选&isQuote=1",
                });
            } else if (index == 1) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + item.id + "&type=2&title=故障咨询",
                });
            } else if (index == 2) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + item.id + "&type=3&title=汽车保养",
                });
            } else if (index == 3) {
                uni.navigateTo({
                    url: "/pages/activity/foursvideo/index?id=" + item.id + "&type=4&title=新车鉴赏",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    padding: 0 10rpx 50rpx;
    box-sizing: border-box;
}

.activity-img {
    margin: 10rpx auto 0;
}

.gdItem {
    width: 360rpx;

    .gdTitle {
        height: 56rpx;
        width: 100%;
    }
    .imgBox {
        width: 360rpx;
        height: 200rpx;
        overflow: hidden;
        box-sizing: border-box;
        position: relative;
        margin-top: -20rpx;

        .gdCover {
            width: 360rpx;
            height: 200rpx;
            display: block;
            border-radius: 10rpx;
            object-fit: cover;
        }
    }

    .itemModul {
        position: absolute;
        top: 0;
        left: 0;
        width: 360rpx;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.2);

        .gdTilte {
            color: #fff;
            margin-top: 154rpx;
            padding: 0 10rpx;
        }
    }

    .videoIcon {
        position: absolute;
        top: 74rpx;
        left: 170rpx;
        z-index: 100;
        width: 38rpx;
        height: 38rpx;
    }
}
</style>
