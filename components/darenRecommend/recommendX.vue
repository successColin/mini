<template>
    <view class="page">
        <!-- 达人推荐  横向滚动 -->
        <!-- card类型 isTitle 1 小标题和2大标题-->
        <view class="title1 flex jsb alc" v-if="fromType == 2 && list.length && isTitle == 1">
            <view class="size24 fwb">达人推荐</view>
            <view class="size24" @click="lookMore">更多</view>
        </view>
        <view class="mb10 flex jsb alc" v-if="fromType == 2 && list.length && isTitle == 2">
            <view class="size32 fwb">达人推荐</view>
            <view class="size24" @click="lookMore">更多</view>
        </view>
        <!-- 带竖线的标题 -->
        <view class="title2 flex jsb alc" v-if="fromType == 1 && list.length && isTitle == 3">
            <view class="title2-info">达人推荐</view>
            <view class="size24  mr15" @click="lookMore">更多</view>
        </view>

        <view class="list" :class="{ cardList: fromType == 2, twoList: fromType == 1 }">
            <scroll-view v-if="list && list.length > 0" class="rescuestory-list" scroll-x="true">
                <view class="flex">
                    <view v-for="(v, i) in list" :key="i" :class="{ itembox1: fromType == 1, itembox2: fromType == 2 }"
                        @click="Onpushdetail(v)">
                        <view class="picBox">
                            <image :src="v.coverPicture" class="rescuestory-item-image"
                                :class="{ cover1: fromType == 1, cover2: fromType == 2 }" mode="aspectFill" />
                            <image src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
                                class="video_icon" v-if="v.video"></image>
                        </view>
                        <view :class="{ title1: fromType == 1, title2: fromType == 2 }" class="moreLine">{{ v.articleTitle
                        }}
                        </view>
                        <view class="flex alc jsb">
                            <view class="flex alc" style="padding-left: 10rpx">
                                <u-avatar size="20" :src="v.headImg"></u-avatar>
                                <view class="txtLighGray size20 ml10">{{ v.nickname }}</view>
                            </view>
                            <view class="txtLighGray size20 mr10">{{ v.viewBaseNum }}人看过</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    // fromType: 1 4s店详情 普通样式， 2：白底 card样式
    props: {
        fromType: {
            type: Number,
            default: null,
        },
        shopId: {
            type: Number,
            default: null,
        },
        relatedType: {
            type: Number,
            default: null,
        },
        relatedId: {
            type: Number,
            default: null,
        },
        isTitle: {
            type: Number,
            default: null,
        },
        isShopPunch: {
            type: Number,
            default: null,
        },
    },
    data() {
        return {
            list: [],
        };
    },
    mounted() {
        this.getList();
    },

    methods: {
        Onpushdetail(v) {
            if (v.video) {
                uni.navigateTo({
                    url:
                        "/pages/activity/articlevideo/index?title=达人推荐&newType=1&isQuote=1&relatedId=" +
                        this.relatedId +
                        "&relatedType=" +
                        this.relatedType +
                        "&id=" +
                        v.articleId +
                        "&shopId=" +
                        this.shopId +
                        "&isShopPunch=" +
                        this.isShopPunch,
                });
            } else {
                uni.navigateTo({
                    url:
                        "/pages/activity/waterfull/imglist?relatedId=" +
                        this.relatedId +
                        "&type=1" +
                        "&newType=1" +
                        "&isQuote=1" +
                        "&relatedType=" +
                        this.relatedType +
                        "&id=" +
                        v.articleId +
                        "&shopId=" +
                        this.shopId +
                        "&isShopPunch=" +
                        this.isShopPunch,
                });
            }
        },
        async getList() {
            console.log(this.relatedType,this.relatedId,);
            const {
                data: { records },
            } = await this.$request.post("/coc-social/api/v2/article/expertRecommend", {
                current: 1,
                size: 100,
                relatedType: this.relatedType,
                shopId: this.shopId,
                relatedId: this.relatedId,
                isShopPunch: this.isShopPunch,
            });
            records.forEach((v) => {
                if (v.imgs) {
                    v.coverPicture = v.imgs.split(",")[0];
                } else if (v.articleCoverImage) {
                    v.coverPicture = v.articleCoverImage;
                } else if (v.video) {
                    v.coverPicture = v.video + "?x-oss-process=video/snapshot,t_1000,m_fast";
                }
            });
            this.list = records;
        },
        lookMore() {
            uni.navigateTo({
                url:
                    "/pages/activity/waterfull/allRecommend?shopId=" +
                    this.shopId +
                    "&relatedType=" +
                    this.relatedType +
                    "&relatedId=" +
                    this.relatedId +
                    "&isShopPunch=" +
                    this.isShopPunch,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.title2-info {
    font-size: 28rpx;
    color: #222222;
    font-weight: bold;
    border-left: 10rpx solid #d91b1b;
    padding-left: 20rpx;
}

.itembox1 {
    margin-right: 10rpx;
    background-color: #fff;
    border-radius: 10rpx 10rpx 0 0;
    padding-bottom: 10rpx;
}

.itembox2 {
    margin-right: 20rpx;
    padding-bottom: 20rpx;
    border-radius: 15rpx 15rpx 0 0;
}

.mr15 {
    margin-right: 16rpx;
}

.picBox {
    position: relative;

    .cover1 {
        width: 360rpx;
        height: 360rpx;
        border-radius: 10rpx 10rpx 0 0;
        display: block;
    }

    .cover2 {
        display: block;
        width: 385rpx;
        height: 385rpx;
        border-radius: 15rpx 15rpx 0 0;
    }

    .video_icon {
        position: absolute;
        top: 20rpx;
        left: 20rpx;
        z-index: 100;
        width: 38rpx;
        height: 38rpx;
    }
}

.title1 {
    padding: 12rpx 0rpx;
}

.title2 {
    font-size: 27rpx;
    padding: 15rpx 0;
    // padding: 0 48rpx 25rpx 25rpx;
}

.size20 {
    font-size: 20rpx;
}
</style>
