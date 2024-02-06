<template>
    <view>
        <view class="page">
            <image v-if="type == 1" :src="info.backImage" class="bgc" />
            <image
                v-else-if="type == 2"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230830/file_1693375385517.jpg"
                class="bgc"
            />
            <view class="card">
                <view class="navigation" @click="toBack()">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169759970.png"
                        class="w96h96"
                    />
                </view>
                <view class="df option">
                    <view v-if="type == 1" class="btn ml15 mr23 bgcD91B1B colorff" @click="Oninshop"> 达人小店 </view>
                    <view v-if="info.followType === 0" class="btn ml15 mr23 bgcD91B1B" @click="setAttention">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692415861444.png"
                            class="w36h36"
                        />
                        <view class="btn-title">关注</view>
                    </view>
                    <view v-else-if="info.followType === 1" class="btn ml15 mr23 bgcEFEFEF" @click="setAttention">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692415889023.png"
                            class="w36h36"
                        />
                        <view class="btn-title c999999">已关注</view>
                    </view>
                </view>
            </view>
            <view class="card2">
                <view class="df">
                    <image class="tx" :src="info.headImg" />
                    <view class="ml13">
                        <view class="name">{{ info.shopName }}</view>
                        <view v-if="type == 1 && info.intro" class="content">{{ info.intro }}</view>
                    </view>
                </view>
                <view v-if="type == 1 && info.tagsList[0]" class="df">
                    <view v-for="(v, i) in info.tagsList" :key="i" class="label mr15">
                        <view class="label-title">{{ v }}</view>
                    </view>
                </view>
            </view>

            <u-toast ref="uToast"></u-toast>
        </view>
        <view class="playitem">
            <view style="padding: 20rpx 20rpx">
                <custom-waterfalls-flow
                    imageKey="coverPicture"
                    ref="waterfallsFlowRef"
                    :value="dataList"
                    :isshowicon="true"
                    @imageClick="OnPushPostDetail"
                >
                    <view
                        v-for="(item, index) in dataList"
                        :key="item.articleId"
                        slot="slot{{index}}"
                        style="padding-bottom: 10rpx; border-radius: 0px 0px 10rpx 10rpx"
                    >
                        <view v-if="item.citeType == 10 || item.citeType == 11">
                            <!-- 车型 -->
                            <view v-if="item.type == 6" class="prominent">
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    车型丨{{ item.relatedName }}
                                </view>
                            </view>
                            <view v-if="item.type == 4" class="prominent">
                                <!-- 团购 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    团购丨{{ item.relatedName }}
                                </view>
                            </view>
                            <view v-if="item.type == 1" class="prominent">
                                <!-- 活动 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    活动丨{{ item.relatedName }}
                                </view>
                            </view>
                            <view v-if="item.type == 3" class="prominent">
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    救援丨{{ item.relatedName }}
                                </view>
                            </view>
                            <view v-if="item.type == 2" class="prominent">
                                <!-- 保养套餐 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    4S店丨{{ item.relatedName }}
                                </view>
                            </view>
                            <view v-if="item.type == 5" class="prominent">
                                <!-- 套餐 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    套餐丨{{ item.relatedName }}
                                </view>
                            </view>
                        </view>
                        <view v-else-if="item.citeType == 1 || item.citeType == 2 || item.citeType == 3">
                            <view v-if="item.citeType == 1" class="prominent">
                                <!-- 团购 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    团购丨{{ item.productTitle }}
                                </view>
                            </view>
                            <view v-if="item.citeType == 2" class="prominent">
                                <!-- 活动 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    活动丨{{ item.activityTitle }}
                                </view>
                            </view>
                            <view v-if="item.citeType == 3" class="prominent">
                                <!-- 活动 -->
                                <view class="u-flex alc" style="margin-left: 10rpx">
                                    <image
                                        style="width: 32rpx; height: 32rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png"
                                    >
                                    </image>
                                </view>
                                <view
                                    class="txtColorWhite size24 oneLine"
                                    style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                                >
                                    商家丨{{ item.shopName }}
                                </view>
                            </view>
                        </view>
                        <view class="waterfall-title oneLine" :class="{ 'mt-40': item.type || item.citeType }">
                            <text>{{ item.activityTitle }}</text>
                        </view>
                        <view class="u-flex jsb ml10 mr10 size20">
                            <view class="u-flex alc">
                                <view>
                                    <u-avatar size="20" :src="item.headImg"></u-avatar>
                                </view>
                                <view class="size20 ml10">
                                    {{ item.nickname }}
                                </view>
                            </view>
                            <view class="u-flex alc">
                                <view class="u-flex alc">
                                    <image
                                        style="width: 24rpx; height: 20rpx"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692146773166.png"
                                    >
                                    </image>
                                </view>
                                <view style="margin-left: 5rpx">{{ item.likeBaseNum }}</view>
                            </view>
                        </view>
                    </view>
                </custom-waterfalls-flow>
            </view>
        </view>
        <view style="height: 100rpx"> </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            userId: "",
            type: "",
            info: {},
            current: 1,
            isLoadMore: false,
            dataList: [],
        };
    },

    onLoad(option) {
        this.type = option.type;
        this.userId = option.userId;
        this.getDetails();
        this.getList();
    },
    onReachBottom() {
        if (!this.isLoadMore) {
            this.current++;
            this.getList();
        }
    },
    onShow() {},
    methods: {
        Oninshop() {
            uni.navigateTo({
                url: "/pages/wiseman/darenxiaodian/index?scene=" + this.userId,
            });
        },
        OnPushPostDetail(e) {
            if (!e.video) {
                uni.navigateTo({
                    url: "/pages/activity/waterfull/imglist?id=" + e.articleId + "&userId=" + this.userId,
                });
            } else {
                uni.navigateTo({
                    url: "/pages/activity/articlevideo/index?id=" + e.articleId + "&userId=" + this.userId,
                });
            }
        },
        getList() {
            this.$request
                .post("/coc-social/api/v2/article/myArticleList", {
                    current: this.current,
                    size: 10,
                    title: "",
                    userId: this.userId,
                })
                .then((res) => {
                    res.data.records.filter((s, index) => {
                        if (s.imgs) {
                            s.coverPicture = s.imgs.split(",")[0];
                        } else if (s.articleCoverImage) {
                            s.coverPicture = s.articleCoverImage;
                        } else if (s.video) {
                            s.coverPicture = s.video + "?x-oss-process=video/snapshot,t_1000,m_fast";
                        }
                    });
                    if (res.data.records.length < 10) {
                        this.isLoadMore = true;
                    }

                    if (this.current == 1) {
                        this.dataList = res.data.records;
                    } else {
                        res.data.records.filter((s) => {
                            this.dataList.push(s);
                        });
                    }
                    console.log(this.dataList);
                });
        },
        setAttention() {
            this.$request
                .post("/coc-social/api/v2/article/followExpert", {
                    userId: this.userId,
                })
                .then((res) => {
                    if (res.code == 200) {
                        this.$refs.uToast.show({
                            message: this.info.followType === 0 ? "关注成功" : "取关成功",
                            type: "success",
                        });
                        this.getDetails();
                    } else {
                        this.$refs.uToast.show({
                            message: res.message,
                        });
                    }
                });
        },
        toBack() {
            uni.navigateBack({
                delta: 1,
            });
        },
        getDetails() {
            let obj = this.userId
                ? {
                      userId: this.userId,
                  }
                : {};
            this.$request.post("/coc-active/api/v1/newExpert/shop", obj).then((res) => {
                if (!res.data.backImage) {
                    res.data.backImage = "https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169916276.png";
                }

                this.info = res.data;
            });
        },
    },
};
</script>

<style lang="scss">
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #ffffff;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 750rpx;
    height: 385rpx;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, rgba(34, 34, 34, 0.7) 100%);
    margin-top: -385rpx;
}
.waterfall-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 10rpx;
    width: 320rpx;
    font-size: 28rpx;
    line-height: 60rpx;
    font-weight: bold;
}
.navigation {
    width: 750rpx;
    height: 92rpx;
    margin-bottom: 88rpx;
}

.option {
    justify-content: flex-end;
    align-items: center;
    height: 85rpx;
    margin-bottom: 29rpx;
}

.bgc {
    width: 750rpx;
    height: 385rpx;
}

.df {
    display: flex;
}

.ml13 {
    margin-left: 13rpx;
}

.ml15 {
    margin-left: 15rpx;
}

.mr15 {
    margin-right: 15rpx;
}

.mr23 {
    margin-right: 23rpx;
}

.w36h36 {
    width: 36rpx;
    height: 36rpx;
}

.w96h96 {
    width: 96rpx;
    height: 96rpx;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 62rpx;
    background: rgba(34, 34, 34, 0.1);
    border-radius: 31rpx;
    border: 2rpx solid #ffffff;
    padding-left: 31rpx;
    padding-right: 31rpx;

    &-title {
        font-size: 27rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 32rpx;
        margin-left: 8rpx;
    }
}

.card2 {
    width: 704rpx;
    height: 279rpx;
    margin-top: -29rpx;
    // box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(153,153,153,0.25);
}

.tx {
    width: 176rpx;
    height: 176rpx;
    border-radius: 88rpx;
    border: 8rpx solid #ffffff;
}

.name {
    font-size: 38rpx;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 54rpx;
    margin-top: 95rpx;
}

.content {
    font-size: 23rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 33rpx;
    margin-top: 4rpx;
}

.label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48rpx;
    background: #fff2f2;
    border-radius: 24rpx;
    margin-top: 15rpx;

    &-title {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #d91b1b;
        line-height: 27rpx;
        margin: 0 15rpx;
    }
}

.bgcD91B1B {
    background: #d91b1b;
    border: 1rpx solid #d91b1b;
}

.bgcEFEFEF {
    background: #efefef;
    border: 1rpx solid #efefef;
}

.c999999 {
    color: #999999;
}

.playitem {
    margin: 16rpx 20rpx;
    // background-color: #ffffff;
    border-radius: 10rpx;
    padding-bottom: 20rpx;
}

.prominent {
    position: relative;
    top: -60rpx;
    height: 48rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685780222536.png");
    background-size: 100% 100%;
    border-radius: 10rpx;
    margin: 0 10rpx;
    display: flex;
}
.mt-40 {
    margin-top: -40rpx;
}
</style>
