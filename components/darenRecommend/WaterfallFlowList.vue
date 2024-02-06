<template>
    <view class="page">
        <!-- 达人推荐瀑布流 -->
        <view v-if="rows.list && rows.list.length > 0" class="recommend">
            <custom-waterfalls-flow
                imageKey="coverPicture"
                ref="waterfallsFlowRef"
                :value="rows.list"
                :isshowicon="true"
                @imageClick="toList"
                class="waterfall"
            >
                <view v-for="(v, i) in rows.list" :key="i" slot="slot{{i}}" class="recommend-item">
                    <!-- <image v-if="v.video && v.video.length > 0"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230830/file_1693395602623.png"
                            class="recommend-item-video" /> -->
                    <!-- <image :src="v.coverPicture" class="recommend-item-image" /> -->
                    <view class="recommend-item-bottom">
                        <view class="recommend-item-bottom-title">{{ v.articleTitle }} </view>
                        <view class="flex alc jsb">
                            <view class="flex aic" style="padding-left: 10rpx">
                                <!-- <image :src="v.headImg" mode="aspectFill" class="recommend-item-bottom-image" /> -->
                                <u-avatar size="20" :src="v.headImg"></u-avatar>
                                <view class="recommend-item-bottom-name">{{ v.nickname }}</view>
                            </view>
                            <view class="recommend-item-bottom-check">{{ v.viewBaseNum }}人看过</view>
                        </view>
                    </view>
                </view>
            </custom-waterfalls-flow>
            <view v-if="bottomStatus" class="recommend-bottom"> 我到底啦~ </view>
        </view>
        <view class="tac mt50" v-else>
            <image
                style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
            >
            </image>
            <view class="txtDarkGray">暂无推荐内容</view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        shopId: {
            type: Number,
            default: null,
        },
        relatedId: {
            type: Number,
            default: null,
        },
        relatedType: {
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
            rows: {
                list: [],
                total: 0,
            },
            obj: {},
            bottomStatus: false,
        };
    },
    created() {
        this.obj = {
            current: 1,
            size: 10,
            relatedId: this.relatedId ? this.relatedId : null,
            shopId: this.shopId ? this.shopId : null,
            relatedType: this.relatedType ? this.relatedType : null,
            isShopPunch: this.isShopPunch ? this.isShopPunch : null,
        };
        this.getList();
        uni.$on("updatedata", () => {
            this.obj.current = 1;
            this.rows.list = [];
            this.rows.total = 0;
            this.getList();
        });
        uni.$on("recommend", () => {
            if (this.rows.total > this.obj.current * this.obj.size) {
                this.obj.current += 1;
                this.getList();
            } else {
                this.bottomStatus = true;
            }
        });
    },
    destroyed() {
        uni.$off("updatedata");
        uni.$off("recommend");
    },
    methods: {
        async getList() {
            // 贴文第二版  新达人推荐接口
            const {
                data: { records, total },
            } = await this.$request.post("/coc-social/api/v2/article/expertRecommend", this.obj);
            const list = JSON.parse(JSON.stringify(this.rows.list));
            records.forEach((v) => {
                if (v.imgs) {
                    v.coverPicture = v.imgs.split(",")[0];
                } else if (v.articleCoverImage) {
                    v.coverPicture = v.articleCoverImage;
                } else if (v.video) {
                    v.coverPicture = v.video + "?x-oss-process=video/snapshot,t_1000,m_fast";
                }
                list.push(v);
            });
            this.rows.list = list;
            this.rows.total = total;
        },
        // toClick() {
        //     uni.navigateTo({
        //         url: '/pages/activity/activityRegistration/playfulperson'
        //     })
        // },
        toList(value) {
            if (value.video) {
                uni.navigateTo({
                    url:
                        "/pages/activity/articlevideo/index?title=娱乐精选&newType=1&isQuote=1&relatedId=" +
                        this.relatedId +
                        "&relatedType=" +
                        this.relatedType +
                        "&id=" +
                        value.articleId +
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
                        value.articleId +
                        "&isShopPunch=" +
                        this.isShopPunch +
                        "&shopId=" +
                        this.shopId,
                });
            }
        },
        onReachBottom() {
            if (!this.isLoadMore) {
                // if (this.type == 0) {
                this.current++;
                this.getList();
                // }
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
}

.waterfall #waterfalls_flow_column_2,
.waterfall #waterfalls_flow_column_1 {
    margin-left: 10rpx !important;
}

.recommend {
    width: 100%;

    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750rpx;
        height: 103rpx;

        &-logo {
            width: 33rpx;
            height: 26rpx;
            margin-left: 25rpx;
        }

        &-title {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 40rpx;
            margin-left: 10rpx;
        }

        &-go {
            width: 10rpx;
            height: 16rpx;
            margin-right: 24rpx;
        }
    }

    &-item {
        background: #ffffff;
        margin-bottom: 10rpx;

        &-video {
            position: absolute;
            width: 82rpx;
            height: 82rpx;
            margin-top: 187rpx;
            margin-left: 130rpx;
        }

        &-image {
            width: 342rpx;
            height: 456rpx;
            background: #000000;
            border-radius: 10rpx;
        }

        &-bottom {
            width: 342rpx;
            border-radius: 0rpx 0rpx 10rpx 10rpx;
            padding-top: 20rpx;
            padding-bottom: 10rpx;

            &-title {
                width: 306rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 18rpx;
                margin-left: 14rpx;
                margin-right: 20rpx;
            }

            &-image {
                width: 40rpx;
                height: 40rpx;
                margin-left: 15rpx;
                border-radius: 20rpx;
            }

            &-name {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 38rpx;
                margin-left: 10rpx;
            }

            &-check {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 38rpx;
                margin-right: 20rpx;
            }
        }
    }

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}

// .w700 {
//     width: 700rpx;
//     margin-left: 25rpx;
// }
</style>
