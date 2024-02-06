<template>
    <view class="page">
        <view class="flex alc bgfff" style="padding: 25rpx">
            <view
                v-for="(item, index) in tabs"
                :key="index"
                :class="{ currentTab: currenId == item.id }"
                class="tab"
                @click="handleTab(item)"
                ><view>{{ item.name }}</view>
            </view>
        </view>
        <view class="list">
            <view class="EvaluateItem" v-for="(item, index) in commentList" :key="index">
                <view class="flex jsb alc">
                    <view class="flex">
                        <u-image :src="item.headImg" width="32" height="32" :lazy-load="true" shape="circle"></u-image>
                        <view style="margin-left: 15rpx">
                            <view class="size28">{{ item.userName }}</view>
                            <view class="flex">
                                <u-rate
                                    active-color="#D91B1B"
                                    inactive-color="#D9D9D9"
                                    gutter="0"
                                    :readonly="true"
                                    :size="14"
                                    v-model="item.grade"
                                ></u-rate>
                                <view class="ml10 size20">{{ item.grade }}.0</view>
                            </view>
                        </view>
                    </view>
                    <view class="size24 txtLighGray">{{ item.createdAt }}</view>
                </view>
                <view class="flex jsb mt20">
                    <view class="w620">
                        <u-read-more
                            ref="uReadMore"
                            :shadowStyle="shadowStyle"
                            :showHeight="36"
                            closeText="全文"
                            openText="收起"
                            color="#1270DE"
                            :textIndent="0"
                            :toggle="true"
                        >
                            <rich-text :nodes="item.content"></rich-text>
                        </u-read-more>
                    </view>
                    <view v-if="userId === item.userId" class="del-text" @click="delComment(item)">删除</view>
                </view>
                <view class="photos mt10" v-if="item.imgs != null || item.video">
                    <scroll-view scroll-x="true">
                        <view class="flex">
                            <view class="hadvideo" v-if="item.video && item.coverImage" @click="previewvideo(item)">
                                <image
                                    :src="item.coverImage"
                                    mode="aspectFill"
                                    style="width: 230rpx; height: 215rpx"
                                ></image>
                                <image
                                    style="width: 96rpx; height: 96rpx"
                                    class="playPic"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702987370146.png"
                                >
                                </image>
                            </view>
                            <view class="flex">
                                <view v-for="(p, k) in item.imgs" :key="k">
                                    <image :src="p" class="photo" mode="aspectFill" @click="previewImg(item.imgs, k)">
                                    </image>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                    <view class="flex photoNum alc" v-if="item.imgs != null && item.imgs.length > 3">
                        <u-icon name="photo" color="#ffffff" size="22"></u-icon>
                        <text class="size28 colorff">{{ item.imgs.length }}</text>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="isLoadMore" class="size24 tac txtLighGray" style="margin: 20rpx auto"> 我到底啦~ </view>
        <u-popup :safeAreaInsetBottom="false" :show="showvideopop" @close="showvideopop = false" mode="center">
            <video :loop="true" :src="videoUrl" :autoplay="true" :controls="true"></video>
        </u-popup>
    </view>
</template>
<script>
export default {
    data() {
        return {
            commentList: [],
            content: "",
            listNum: 0,
            shadowStyl: {
                backgroundImage: "none",
                paddingTop: "0",
                marginTop: "20rpx",
                // #ifndef APP-NVUE
                backgroundImage: "linear-gradient(-180deg, rgba(255, 255, 255, 0) 0%, #fff 80%)",
                // #endif
                // #ifdef APP-NVUE
                // nvue上不支持设置复杂的backgroundImage属性
                backgroundImage: "linear-gradient(to top, #fff, rgba(255, 255, 255, 0.5))",
                // #endif
                paddingTop: "100px",
                marginTop: "-100px",
                color: "#222222",
                fontSize: "28rpx",
                textAlign: "left",
            },
            tabs: [],
            commentInfo: {},
            currenId: 0,
            current: 1,
            isReachBottm: false,
            isLoadMore: false,
            showvideopop: false,
            videoUrl: "",
            search: {
                current: 1,
                size: 20,
                id: "",
                commentType: "",
                goodOrBad: "",
                haveImg: "",
                haveVideo: "",
            },
            userId: 0,
        };
    },
    onLoad(option) {
        if (option.commentInfo) {
            this.commentInfo = JSON.parse(option.commentInfo);
            this.search.id = this.commentInfo.id;
            this.search.commentType = this.commentInfo.commentType;
            uni.setNavigationBarTitle({
                title: "全部评价 (" + this.commentInfo.listNum + ")",
            });
            this.getTab();
        }
    },
    created() {
        this.getUser();
        console.log("created");
    },
    watch: {},
    onReachBottom() {
        if (!this.isLoadMore) {
            this.current++;
            this.getComments();
        }
    },
    methods: {
        getTab() {
            let obj = {
                commentType: this.search.commentType,
                id: this.search.id,
            };
            this.$newrequest.post("/coc-system/api/v1/user_interaction/getCommentType", obj).then((res) => {
                console.log("tabs全部评价", res.data);
                this.tabs = res.data;
                this.getComments();
            });
        },
        //预览图片
        previewImg(urllist, index) {
            uni.previewImage({
                urls: urllist,
                current: index,
            });
        },
        // 预览视频
        previewvideo(item) {
            this.videoUrl = item.video;
            this.showvideopop = true;
        },
        handleTab(item) {
            this.currenId = item.id;
            if (item.name == "好评") {
                this.search.goodOrBad = 1;
                this.search.haveImg = "";
                this.search.haveVideo = "";
                this.getComments();
            } else if (item.name == "差评") {
                this.search.goodOrBad = 2;
                this.search.haveImg = "";
                this.search.haveVideo = "";
                this.getComments();
            } else if (item.name == "有图") {
                this.search.haveImg = 1;
                this.search.goodOrBad = "";
                this.search.haveVideo = "";
                this.getComments();
            } else if (item.name == "有视频") {
                this.search.haveVideo = 1;
                this.search.haveImg = "";
                this.search.goodOrBad = "";
                this.getComments();
            } else {
                this.search.goodOrBad = "";
                this.search.haveImg = "";
                this.search.haveVideo = "";
                this.getComments();
            }
        },
        getComments() {
            this.search.current = this.current;
            this.$newrequest.post("/coc-system/api/v1/user_interaction/getComment", this.search).then((res) => {
                res.data.records.forEach((item) => {
                    if (item.imgs != null && item.imgs != "") {
                        item.imgs = item.imgs.split(",");
                    }
                });
                if (res.data.records.length < 20) {
                    this.isLoadMore = true;
                }
                if (res.data.current == 1) {
                    this.commentList = res.data.records;
                } else {
                    res.data.records.filter((s) => {
                        this.commentList.push(s);
                    });
                }
            });
        },
        getUser() {
            const userId = uni.getStorageSync("userId");
            console.log(userId, "?? - 111");
            if (userId) {
                this.userId = userId * 1;
            }
            console.log(this.userId, "??");
        },
        async delComment(value) {
            const { code, message } = await this.$request.post("/coc-system/api/v1/user_interaction/delComments", {
                id: value.id,
            });
            if (code == 200) {
                uni.$u.toast("删除成功");
                this.current = 1;
                this.getComments();
            } else {
                uni.$u.toast(message);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.photos {
    position: relative;

    .photoNum {
        position: absolute;
        bottom: 12rpx;
        right: 20rpx;
    }

    .u-read-more__content.data-v-459946da {
        color: #222 !important;
        font-size: 28rpx !important;
    }
}

.lookAll {
    height: 80rpx;
    line-height: 80rpx;
}

.photo {
    width: 230rpx;
    height: 215rpx;
    display: block;
    border-radius: 4rpx;
    margin-right: 6rpx;
}

.hadvideo {
    position: relative;
    width: 230rpx;
    height: 215rpx;
    margin-right: 6rpx;

    .playPic {
        position: absolute;
        top: 59rpx;
        left: 67rpx;
        z-index: 5;
    }
}

.tab {
    background: #f6f6f6;
    font-size: 24rpx;
    text-align: center;
    height: 48rpx;
    line-height: 48rpx;
    padding: 0 23rpx;
    border-radius: 30rpx;
    margin-right: 15rpx;
}

.currentTab {
    background: #fff2f2;
    color: #d91b1b;
}

.EvaluateItem {
    padding: 25rpx;
    background-color: #fff;
    margin-bottom: 15rpx;
}

.w620 {
    width: 620rpx;
}

.del-text {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #d91b1b;
    line-height: 38rpx;
}

::v-deep .u-read-more__toggle {
    justify-content: flex-start !important;
}
::v-deep .u-read-more__toggle__icon {
    display: none !important;
}
</style>
