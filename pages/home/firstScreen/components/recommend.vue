<template>
    <view>
        <Currency :head="head">
            <view slot="list" class="list">
                <view class="advertisinglist" :class="isChangeShow ? 'showLive' : ''">
                    <custom-waterfalls-flow
                        imageKey="coverPicture"
                        ref="waterfallsFlowRef"
                        :value="rows.list"
                        :isshowicon="true"
                        class="waterfall"
                        @imageClick="toDetails"
                    >
                        <view v-for="(v, i) in rows.list" :key="i" slot="slot{{i}}" class="item">
                            <view v-if="v.tag !== 16 && !v.adimage">
                                <view class="item-title">{{ v.title }}</view>
                                <view class="flex alc jsb item-avatar">
                                    <view class="flex alc">
                                        <u-avatar size="20" :src="v.headImg" />
                                        <view class="item-name">{{ v.nickname || "" }}</view>
                                    </view>
                                    <view v-if="v.advSpaceType === 1 || v.advSpaceType === 2" class="item-check"
                                        >{{ v.viewNum }}人看过
                                    </view>
                                    <view v-else class="item-like" @click="setLikeBase(v)">
                                        <image
                                            v-if="v.likeType === 1"
                                            class="item-like-image"
                                            src="@/static/image/like.svg"
                                        />
                                        <image v-else class="item-like-image" src="@/static/image/unlike.svg" />
                                        <view class="item-like-title">{{ v.likeNum }}</view>
                                    </view>
                                </view>
                                <view v-if="v.relatedName" class="item-activity">
                                    <image
                                        v-if="v.advSpaceType === 7"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                                        class="item-activity-image"
                                    />
                                    <image
                                        v-else
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698305656636.png"
                                        class="item-activity-image"
                                    />
                                    <!-- <image src="https://oss.dcqcjlb.com/51che_java_dev/20231114/file_1699942473091.png"
                            class="item-activity-image" /> -->
                                    <view class="item-activity-title">{{ v.relatedName }}</view>
                                </view>
                            </view>
                            <view v-if="v.tag === 16" class="item-broadcast" @click="handleLiveBroadcast">
                                <template v-if="liveType === 1">
                                    <channel-live :finder-user-name="finderUserName" :feedId="feedId"></channel-live>
                                </template>
                                <template v-else>
                                    <view class="flex">
                                        <view class="item-broadcast-show">
                                            <image
                                                src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698308168731.png"
                                                class="item-broadcast-show-image"
                                            />
                                            <view class="item-broadcast-show-title">
                                                {{
                                                    liveType === 1
                                                        ? "俱乐部直播"
                                                        : liveType === 2
                                                        ? "俱乐部直播预约"
                                                        : "俱乐部视频号"
                                                }}
                                            </view>
                                        </view>
                                    </view>
                                    <view>
                                        <view class="item-broadcast-title" style="font-size: 23rpx"
                                            >51车·人车生活俱乐部</view
                                        >
                                        <!-- <view class="item-broadcast-name">俱乐部官方</view> -->
                                    </view>
                                    <view class="overlayImg">
                                        <u-image
                                            src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698660533834.png"
                                            width="100%"
                                            height="100rpx"
                                        ></u-image>
                                    </view>
                                </template>
                            </view>
                        </view>
                    </custom-waterfalls-flow>
                </view>
                <view v-if="noData" class="recommend-bottom" @click="handleJump">
                    去娱乐生活逛逛
                    <div style="margin-left: 10rpx">
                        <u-icon name="arrow-right" fontSize="12px"></u-icon>
                    </div>
                </view>
            </view>
        </Currency>
        <view class="h250" />
    </view>
</template>
<script>
import Currency from "./currency.vue";
import { finderUserName } from "@/config/index";
import { tologin } from "@/utils/index.js";
export default {
    options: {
        styleIsolation: "shared",
    },
    components: { Currency },
    data() {
        return {
            head: {
                image: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705458927826.png",
                title: "去逛逛",
                url: "/pages/activity/activityRegistration/playfulperson",
            },
            liveType: 1,
            rows: {
                list: [],
                total: 0,
            },
            params: {
                current: 1,
                size: 10,
            },
            finderUserName: "", // 视频号 id
            feedId: "", // 视频 feedId

            isChangeShow: false,
            timeVal: "",
            noData: false,
        };
    },
    created() {
        this.finderUserName = finderUserName;
        this.getList();

        this.timeVal = new Date().valueOf() + Math.random();
        uni.$on("updatedata", () => {
            this.params.current = 1;
            this.timeVal = new Date().valueOf() + Math.random();
            this.rows.list = [];
            this.rows.total = 0;
            this.$refs.waterfallsFlowRef.refresh();
            this.getList();
        });
        uni.$on("recommend", () => {
            console.log("进来了");
            if (!this.noData) {
                this.params.current += 1;
                this.getList();
            }
        });
    },
    onShow() {
        this.params.current = 1;
        this.rows.list = [];
        this.rows.total = 0;
        this.$refs.waterfallsFlowRef.refresh();
        this.getList();
    },
    methods: {
        handleJump() {
            uni.navigateTo({
                url: "/pages/advertisement/choice",
            });
        },
        // 直播 跳直播
        handleLiveBroadcast() {
            if (this.finderUserName && this.feedId) {
                // wx.openChannelsLive({
                //     finderUserName: this.finderUserName,
                //     feedId: this.feedId,
                // });
            } else {
                // 直播预约
                wx.getChannelsLiveNoticeInfo({
                    finderUserName: this.finderUserName,
                    success: (res) => {
                        console.log("预约信息", res); // 现在还不清楚没有预约的错误码
                        wx.reserveChannelsLive({
                            noticeId: res.noticeId,
                        });
                    },
                    complete: (res) => {
                        // 没有预约情况，打开视频号主页
                        console.log("错误信息", res); // 现在还不清楚没有预约的错误码
                        if (res.err_code == 1) {
                            wx.openChannelsUserProfile({
                                finderUserName: this.finderUserName,
                            });
                        }
                    },
                });
            }
        },
        // 获取直播地址
        getLiveUrl() {
            // 查看直播内容
            return new Promise((resolve, reject) => {
                wx.getChannelsLiveInfo({
                    finderUserName: this.finderUserName,
                    success: (res) => {
                        console.log(res);
                        if (res.status !== 3) {
                            this.isChangeShow = true;

                            this.liveType = 1;
                            this.feedId = res.feedId;
                            this.rows.list.unshift({
                                tag: 16,
                                pa: true,
                                coverPicture: "https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698305656636.png",
                            });
                            // this.$refs.waterfallsFlowRef.refresh();
                            resolve();
                        } else {
                            // 直播
                            this.feedId = "";
                            resolve();
                            // this.previewsAndNoLive(resolve);
                        }
                    },
                    complete: (res) => {
                        if (res.err_code == 1416104) {
                            resolve();
                            // this.previewsAndNoLive(resolve);
                        }
                    },
                });
            });
        },
        // 没有直播和预告
        // previewsAndNoLive(fun) {
        //     wx.getChannelsLiveNoticeInfo({
        //         finderUserName: this.finderUserName,
        //         success: (res) => {
        //             if (res.noticeId) {
        //                 this.liveType = 2;
        //                 // 预约
        //                 this.rows.list.unshift({ tag: 16, pa: true, coverPicture: 'https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698732617943.png' })
        //                 // this.$refs.waterfallsFlowRef.refresh();
        //                 fun();
        //             }
        //         },
        //         complete: (res) => {
        //             if (res.err_code == 1) {
        //                 // this.liveType = 3;
        //                 // // 没有预约和直播
        //                 // this.rows.list.unshift({ tag: 16, pa: true, coverPicture: 'https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698732577185.png' })
        //                 // // this.$refs.waterfallsFlowRef.refresh();
        //                 fun();
        //             }
        //         },
        //     });
        // },
        // --------
        async getList(more) {
            if (this.rows.list.length === 0) {
                await this.getLiveUrl();
            }
            let url = "/coc-active/api/v2/homePage/advertisingSpace/v6_1";
            // if (more) {
            //   url = '/coc-active/api/v2/homePage/advertisingSpace/v5_1';
            // }
            const { data } = await this.$request.post(url, {
                temporaryId: this.timeVal,
                ...this.params,
            });
            const { records, total } = data;
            const list = JSON.parse(JSON.stringify(this.rows.list));
            console.log(records, "records");
            if (records.length === 0) {
                this.noData = true;
            }
            records.forEach((v) => {
                if (v.imgsMsg) {
                    v.coverPicture = v.imgsMsg[0];
                } else if (v.coverImage) {
                    v.coverPicture = v.coverImage;
                } else if (v.videoUrl) {
                    v.coverPicture = v.videoUrl + "?x-oss-process=video/snapshot,t_1000,m_fast";
                }
                list.push(v);
            });
            if (this.params.current === 1) {
                list.splice(6, 0, {
                    adimage: true,
                    tag: 17,
                    coverPicture: "https://oss.dcqcjlb.com/51che_java_dev/20240122/file_1705907686071.png",
                });
            } else if (this.params.current === 2) {
                list.splice(12, 0, {
                    adimage: true,
                    tag: 18,
                    coverPicture: "https://oss.dcqcjlb.com/51che_java_dev/20240122/file_1705908522284.png",
                });
            }
            console.log(list);
            this.rows.list = list;
            this.rows.total = total;
        },
        toDetails(value) {
            console.log(value, "????");
            if (value.tag === 17) {
                uni.navigateTo({
                    url: "/pages/roadhelp/index",
                });
                return;
            } else if (value.tag === 18) {
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultSearch",
                });
                return;
            }
            // 目前去除学驾
            /**
             * 页面跳转判断
             *
             * 1.娱乐 2.团购 3.户外 4.户内 15.团购 5.4S店 6.保养 7.用车 8.养车 9.救援 10.新车 11.校园 12.学驾 13.租车
             *
             * 1-娱乐；2-团购；3-户外；4-户内；5-4s店；6-保养；7-用车；8-养车；9-救援；10-新车；11-校园；12-学驾；13-租车；14-达人；15-团购（单品套餐）
             *
             * 2.优惠团购 6.保养套餐 15.海量游乐
             *
             * 3.户外畅游 4.户内嗨乐 5.玩乐活动
             *
             * 1.娱乐精选 7.故障咨询 8.保养预约 9.救援故事 10.新车鉴赏 11.校园文化 12.学车趣事 13.租车趣事 14.达人推荐
             *
             * 16.直播
             *
             * 首页页面显示判断
             *
             * 1.娱乐 7.用车 8.养车 9.救援 10.新车 11.校园 12.学驾 13.租车 （标签 - 文字 - 姓名 - 观看）
             *
             * 2.团购 3.户外 4.户内 （标签 - 距离 - 文字 - 价格）
             *
             * 5.4S店 （标签 - 文字 - 价格 - 报名）
             *
             * 6.保养 （标签 - 预约 - 文字 - 价格）
             *
             * 14.达人 （活动 - 文字 - 姓名 - 观看）
             *
             * 15.团购 （标签 - 距离 - 文字 - 商品 - 价格）
             *
             */

            /**
             * id 标识
             * video 视频URL
             * image 图文URL
             * url 统一URL
             */
            // const list = [
            //     {
            //         id: 1,
            //         video: '/pages/activity/waterfull/videolist?selectionType=1&title=娱乐精选',
            //         image: '/pages/activity/waterfull/imglist?selectionType=1&title=娱乐精选'
            //     },
            //     {
            //         id: 2,
            //         url: '/pages/advertisement/groupbuy?title=优惠团购'
            //     },
            //     {
            //         id: 3,
            //         url: '/pages/advertisement/play?title=户外畅游'
            //     },
            //     {
            //         id: 4,
            //         url: '/pages/advertisement/play?title=户内嗨乐'
            //     },
            //     {
            //         id: 5,
            //         url: '/pages/advertisement/play?title=玩乐活动'
            //     },
            //     {
            //         id: 6,
            //         url: '/pages/advertisement/groupbuy?title=保养套餐'
            //     },
            //     {
            //         id: 7,
            //         url: '/pages/activity/foursvideo/index?&type=2'
            //     },
            //     {
            //         id: 8,
            //         url: '/pages/activity/foursvideo/index?type=3'
            //     },
            //     {
            //         id: 9,
            //         url: '/pages/activity/foursvideo/index?type=1'
            //     },
            //     {
            //         id: 10,
            //         url: '/pages/activity/foursvideo/index?type=4'
            //     },
            //     {
            //         id: 11,
            //         video: '/pages/activity/waterfull/videolist?selectionType=1&title=校园文化',
            //         image: '/pages/activity/waterfull/imglist?selectionType=1&title=校园文化'
            //     },
            //     {
            //         id: 12,
            //         video: '/pages/activity/waterfull/videolist?selectionType=1&title=学车趣事',
            //         image: '/pages/activity/waterfull/imglist?selectionType=1&title=学车趣事'
            //     },
            //     {
            //         id: 13,
            //         url: '/pages/activity/foursvideo/index?&type=5'
            //     },
            //     {
            //         id: 14,
            //         video: '/pages/activity/waterfull/videolist?selectionType=1&title=达人推荐',
            //         image: '/pages/activity/waterfull/imglist?selectionType=1&title=达人推荐'
            //     },
            //     {
            //         id: 15,
            //         url: '/pages/advertisement/groupbuy?title=海量游乐'
            //     },
            //     {
            //         id: 16
            //     },
            // ]
            // let url = ''
            // list.forEach((v) => {
            //     if (v.id === value.tag) {
            //         if (v.video && v.image) {
            //             url = (value.video ? v.video : v.image) + '&id=' + value.relId + '&tag=' + value.tag
            //         } else if (v.url) {
            //             if (v.url.indexOf('type') >= 0) {
            //                 url = v.url + '&id=' + value.relId + '&tag=' + value.tag
            //             } else {
            //                 url = v.url + '&id=' + value.relId + '&tag=' + value.tag + '&type=' + value.type
            //             }
            //         } else {
            //             /** 直播跳转方法请添加在这里 */
            //         }
            //     }
            // })

            /**
             * 1-救援故事
             * 2-故障咨询
             * 3-带有户外畅游活动链接的达人推荐内容
             * 4-带有户内嗨乐活动链接的达人推荐内容
             * 5-娱乐生活的视频
             * 6-带有寻味住店商品链接的达人推荐内容
             */
            // /pages/activity/foursvideo/index
            // /pages/activity/articlevideo/index
            const list = [
                // 4s店
                {
                    id: 1,
                    video: `?type=1`,
                    tag: 9,
                    videoType: 2,
                },
                // 4s店
                {
                    id: 2,
                    video: `?type=2`,
                    tag: 7,
                    videoType: 2,
                },
                {
                    id: 3,
                    video: `?`,
                    tag: 3,
                    videoType: 1,
                },
                {
                    id: 4,
                    video: `?`,
                    tag: 4,
                    videoType: 1,
                },
                {
                    id: 5,
                    video: `?newType=2`,
                    tag: 1,
                    videoType: 1,
                },
                {
                    id: 6,
                    video: `?`,
                    tag: 17,
                    videoType: 1,
                },
                {
                    id: 7,
                    video: `?`,
                    tag: 2,
                    videoType: 1,
                },
                // 4s店
                {
                    id: 8,
                    video: `?type=6`,
                    videoType: 2,
                },
            ];
            let url = "/pages/activity/allVideo/index";
            let id = value.relatedId || value.id;
            console.log(id, "????");
            let urlParams = `&highArticleId=${value.highArticleId}&&temporaryId=${this.timeVal}`;
            list.forEach((v) => {
                if (v.id === value.advSpaceType) {
                    url +=
                        v.video +
                        "&id=" +
                        value.id +
                        "&tag=" +
                        v.tag +
                        "&shopCategory=" +
                        value.shopCategory +
                        "&videoType=" +
                        v.videoType +
                        urlParams;
                }
            });
            console.log(url, "????");
            if (url.length > 0) {
                uni.navigateTo({ url });
            }
        },
        getMoney(value, index) {
            let number = "";
            if (typeof value === "number") {
                let list = value.toString().split(".");
                if (list.length > 1 && index === 0) {
                    number = list[index] + ".";
                } else {
                    number = list[index] || "";
                }
            }
            return number;
        },
        setLikeBase(value) {
            if (tologin() !== true) {
                return;
            }
            this.$request
                .post("/coc-social/api/v2/article/like", {
                    id: value.id,
                })
                .then((res) => {
                    if (res.code == 200) {
                        if (value.likeType === 1) {
                            value.likeType = 2;
                            value.likeNum -= 1;
                        } else {
                            value.likeType = 1;
                            value.likeNum += 1;
                        }
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                        });
                    }
                });
        },
        toList() {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/playfulperson",
            });
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .currency-top-image {
    width: 128rpx;
}

.list {
    padding: 0 0 10rpx 0;
}

.advertisinglist {
    width: calc(100vw - 20rpx);
}

.item {
    position: relative;
    height: 100%;
    width: 100%;

    &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 13rpx;
        padding-top: 12rpx;
        margin-right: 13rpx;
        margin-bottom: 11rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    &-avatar {
        margin-left: 13rpx;
        margin-bottom: 12rpx;
    }

    &-name {
        width: 180rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 6rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    &-check {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-right: 7rpx;
    }

    &-groupbuy {
        display: flex;
        align-items: flex-end;
        margin-top: 15rpx;
        margin-bottom: 11rpx;
    }

    &-symbol {
        font-size: 24rpx;
        font-family: HONOR Sans CN;
        font-weight: 500;
        color: #d91b1b;
        margin-left: 12rpx;
        margin-bottom: 3rpx;
    }

    &-integer {
        font-size: 32rpx;
        font-family: HONOR Sans CN;
        font-weight: 500;
        color: #d91b1b;
        margin-left: 5rpx;
    }

    &-decimal {
        font-size: 24rpx;
        font-family: HONOR Sans CN;
        font-weight: 500;
        color: #d91b1b;
        margin-bottom: 2rpx;
    }

    &-price {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        text-decoration: line-through;
        color: #999999;
        margin-left: 10rpx;
        margin-bottom: 3rpx;
    }

    &-number {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 10rpx;
        margin-bottom: 4rpx;
    }

    &-goods {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 14rpx;
        margin-bottom: 11rpx;
    }

    &-tag {
        position: absolute;
        top: -38rpx;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64rpx;
        height: 38rpx;
        background: linear-gradient(49deg, #d91b1b, #f14040);
        border-radius: 0rpx 10rpx 0rpx 0rpx;

        &-title {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
        }
    }

    &-distance {
        position: absolute;
        top: -38rpx;
        z-index: 9;
        display: flex;
        align-items: center;
        height: 38rpx;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 10rpx 10rpx 0rpx 10rpx;

        &-title {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            margin-left: 70rpx;
            margin-right: 6rpx;
        }
    }

    &-activity {
        position: absolute;
        left: 10rpx;
        top: -58rpx;
        display: flex;
        align-items: center;
        width: 320rpx;
        height: 48rpx;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 10rpx;

        &-image {
            width: 32rpx;
            height: 32rpx;
            margin-left: 10rpx;
            margin-right: 14rpx;
        }

        &-title {
            width: 248rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }
    }

    &-broadcast {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &-show {
            display: flex;
            align-items: center;
            height: 38rpx;
            background: rgba(0, 0, 0, 0.4);
            border-radius: 10rpx;
            margin-top: 10rpx;
            margin-left: 10rpx;
            padding-right: 10rpx;

            &-image {
                width: 38rpx;
                height: 38rpx;
                border-radius: 10rpx;
            }

            &-title {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                margin-left: 10rpx;
            }
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            margin-left: 12rpx;
            margin-bottom: 10rpx;
        }

        &-name {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            margin-left: 12rpx;
            margin-bottom: 12rpx;
        }
    }

    &-like {
        display: flex;
        align-items: center;

        &-image {
            width: 28rpx;
            height: 28rpx;
        }

        &-title {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-left: 5rpx;
            margin-right: 10rpx;
        }
    }
}

.overlayImg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100rpx;
}

::v-deep .waterfalls-flow-column {
    width: calc((100vw - 30rpx) / 2) !important;
    margin-left: 0 !important;
}

::v-deep .waterfalls-flow-column-1 {
    margin-right: 10rpx;
}

::v-deep .column-value-position .inner {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
}

::v-deep .currency-list {
    margin: 0 !important;
}
.recommend-bottom {
    text-align: center;
    background: #f8f8f8;
    width: 710rpx;
    height: 70rpx;
    line-height: 70rpx;
    color: #999999;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px !important;
    margin: 10rpx;
    ::v-deep {
        .u-icon__icon {
            color: #999999 !important;
            font-size: 13px !important;
            line-height: 13px !important;
        }
    }
}
.showLive {
    ::v-deep {
        .waterfalls-flow > view:first-child .column-value:first-child {
            height: 458rpx;
        }
    }
}

.h250 {
    height: 250rpx;
}
</style>
