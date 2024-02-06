<template>
    <view class="page">
        <view>
            <view class="item-top"> </view>
            <view>
                <swiper class="swiper" :vertical="true" style="height: 100vh" @change="change" duration="800">
                    <swiper-item v-for="(item, index) in imgList" :key="index">
                        <scroll-view scroll-y="true" style="height: 100%">
                            <imgcomponent
                                @changefollowType="changefollowType"
                                :dataList="item"
                                @deleteimg="deleteimg"
                                @sendid="sendid(item)"
                                :userId="userId"
                                :index="index"
                            >
                            </imgcomponent>
                        </scroll-view>
                    </swiper-item>
                </swiper>
            </view>
            <view
                v-if="!showpopadd && type == 0"
                @click="OnAddpost"
                style="position: fixed; bottom: 30rpx; left: 600rpx; z-index: 9999"
            >
                <image style="width: 88rpx; height: 88rpx" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060308658.png"></image>
            </view>
        </view>
        <request-loading></request-loading>
        <float v-if="tag" :tag="tag" />
    </view>
</template>

<script>
import carousel from "@/components/carousel/index.vue";
import float from "@/components/float/index.vue";
import { tologin } from "@/utils/index.js";
import imgcomponent from "./components/imgcomponent.vue";
export default {
    components: {
        carousel,
        imgcomponent,
        float,
    },
    data() {
        return {
            relatedType: "", // 选品类型
            newType: "", // 菜单类型
            keyword: "", // 搜索内容
            entertainmentSiftCategoryId: "", // 新大分类下的二级分类：配置在通用数据字典表下type-10和11
            isQuote: null,
            userId: "",
            tags: [
                {
                    name: "全部",
                    id: 0,
                },
                {
                    name: "视频",
                    id: 1,
                },
                {
                    name: "图文",
                    id: 2,
                },
            ],
            type: 1,
            showpopadd: false,
            isarticle: true,
            dataList: [],
            videoList: [],
            imgList: [],
            current: 1,
            isLoadMore: false,
            visitinto: null,
            tagcurrent: 1,
            videocurrent: 1,
            imgcurrent: 1,
            articleId: null,
            newuserid: null,
            selectionType: null,
            relatedId: null,
            shopId: null,
            isShopPunch: null,
            userType: null,
            lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC",
            tag: 0,
            shopCategory: null,
        };
    },
    computed: {
        // z状态栏高度适配
        navbarHeight() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
        },
        // 胶囊高度
        menuHeight() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").menuHeight : 0;
        },
        // 胶囊top
        menuTop() {
            return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").menuTop - this.statusBarHeight : 0;
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
    onUnload() {
        if (uni.getStorageSync("token")) {
            this.$request
                .post("/coc-active/api/v1/user/behavior/visit_exit", {
                    userVisitId: this.visitinto,
                })
                .then((res) => {});
        }
    },
    onLoad(option) {
        let _this = this;
        // uni.removeStorageSync('enter');
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        if (option.selectionType) {
            this.selectionType = option.selectionType;
        }
        if (option.userType) {
            this.userType = option.userType;
        }
        if (option.relatedId) {
            this.relatedId = option.relatedId;
        }
        // isShopPunch为0 时  传10
        if (option.isShopPunch == 10) {
            this.isShopPunch = 0;
        } else {
            this.isShopPunch = option.isShopPunch;
        }
        if (option.fromPage == "分享") {
            this.showBack = false;
        } else {
            this.showBack = true;
        }
        if (option.shopId) {
            this.shopId = option.shopId;
        }
        if (option.entertainmentSiftCategoryId) {
            this.entertainmentSiftCategoryId = option.entertainmentSiftCategoryId;
        }
        if (option.relatedType) {
            this.relatedType = option.relatedType;
        }
        if (option.newType) {
            this.newType = option.newType;
        }
        if (option.keyword) {
            this.keyword = option.keyword;
        }
        if (option.tag) {
            this.tag = option.tag * 1;
        }
        if (option.shopCategory) {
            this.shopCategory = option.shopCategory;
        }

        if (option.title) {
            uni.setNavigationBarTitle({
                title: option.title,
            });
        }
        // isQuote 时  传10
        if (option.isQuote == 10) {
            this.isQuote = 0;
        } else {
            this.isQuote = option.isQuote;
        }
        this.userId = uni.getStorageSync("userId");
        this.getbyId(option.id, 2);
        this.articleId = option.id;
        if (option.userId) {
            this.newuserid = option.userId;
        }
        if (option.isQuote == 1) {
            this.isQuote = 1;
        }
        uni.$on("changelike", function (data) {
            if (data.likeType == 1) {
                _this.imgList[data.index].article.likeType = 1;
                _this.imgList[data.index].article.likeBaseNum = _this.imgList[data.index].article.likeBaseNum + 1;
            } else if (data.likeType == 2) {
                _this.imgList[data.index].article.likeType = 2;
                _this.imgList[data.index].article.likeBaseNum = _this.imgList[data.index].article.likeBaseNum + -1;
            }
        });
        uni.$on("changid", function (data) {
            _this.articleId = data;
        });
    },
    onReachBottom() {
        if (!this.isLoadMore) {
            if (this.type == 0) {
                this.current++;
                this.getList();
            }
        }
    },
    onShow() {
        if (uni.getStorageSync("token")) {
            this.$request
                .post("/coc-active/api/v1/user/behavior/visit_into", {
                    type: 5,
                })
                .then((res) => {
                    this.visitinto = res;
                });
        }
    },
    onShareAppMessage(res) {
        this.share();
        let path = "/pages/activity/waterfull/imglist?articleId=" + this.articleId + "&fromPage=分享&enter=117";
        return {
            path: path,
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
        this.share();
        let path = "/pages/activity/waterfull/imglist?articleId=" + this.articleId + "&fromPage=分享&enter=117";
        return {
            path: path,
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
        share() {
            if (this.type == 1 || this.type == 2) {
                this.$newrequest
                    .post("/coc-social/api/v2/article/share", {
                        id: this.articleId,
                    })
                    .then((res) => {
                        if (res.code == 200) {
                            if (this.type == 1) {
                                this.videoList.filter((s, i) => {
                                    if (this.articleId == s.article.id) {
                                        s.article.shareBaseNum++;
                                    }
                                });
                            } else {
                                this.imgList.filter((s, i) => {
                                    if (this.articleId == s.article.id) {
                                        s.article.shareBaseNum++;
                                    }
                                });
                            }
                        }
                    });
            }
        },
        getbyId(id, type) {
            this.$request
                .post("coc-social/api/v1/article/findById", {
                    current: 1,
                    id: id,
                    size: 99,
                })
                .then((res) => {
                    if (type == 2) {
                        res.data.article.imgarr = res.data.article.imgs.split(",");
                        this.imgList.push(res.data);
                        this.getotherimgList(id);
                    } else {
                        this.videoList.push(res.data);
                        this.getothervideoList(id);
                    }
                });
        },
        OnPushPostDetail(e) {
            if (!e.video) {
                this.imgList = [];
                this.tagcurrent = 2;
                this.type = 2;
                this.getbyId(e.articleId, 2);
            } else {
                // this.videoList = []
                // this.tagcurrent = 1
                // this.type = 1
                // this.getbyId(e.articleId, 1)
                uni.navigateTo({
                    url: "/pages/activity/articlevideo/index?id=" + e.articleId,
                });
            }
        },
        changefollowType(index) {
            if (this.imgList[index].article.followType == 1) {
                this.imgList[index].article.followType = 2;
            } else {
                this.imgList[index].article.followType = 1;
            }
        },
        change(e) {
            let _this = this;
            this.articleId = this.imgList[e.detail.current].article.id;
            if ((e.detail.current / 9) % 1 === 0) {
                this.imgcurrent++;
                this.getimgList();
            }
        },
        sendid(item) {
            this.$newrequest
                .post("coc-social/api/v1/article/findById", {
                    current: 1,
                    id: item.article.id,
                    size: 3,
                })
                .then((res) => {
                    res.data.article.imgarr = res.data.article.imgs.split(",");
                    this.imgList.filter((s, i) => {
                        if (s.article.id == item.article.id) {
                            this.$set(this.imgList, i, res.data);
                        }
                    });
                });
        },
        deleteimg(id) {
            this.imgList.filter((s, i) => {
                if (s.article.id == id) {
                    this.imgList.splice(i, 1);
                }
            });
        },
        detailvideo(id) {
            this.videoList.filter((s, i) => {
                if (s.article.id == id) {
                    this.videoList.splice(i, 1);
                }
            });
        },
        setnewvideo(index, data) {
            this.$set(this.videoList, index, data);
        },
        likenumchange(type, index) {
            if (type == 2) {
                this.videoList[index].article.likeType = 1;
                this.videoList[index].article.likeBaseNum = this.videoList[index].article.likeBaseNum + 1;
            } else {
                this.videoList[index].article.likeType = 2;
                this.videoList[index].article.likeBaseNum = this.videoList[index].article.likeBaseNum - 1;
            }
        },
        getmorevideo() {
            this.videocurrent++;
            this.getvideoList();
        },
        getotherimgList(id) {
            let _this = this;
            this.$newrequest
                .post("/coc-social/api/v2/article/articleList", {
                    current: this.imgcurrent,
                    size: 10,
                    type: 2,
                    articleId: id,
                    userId: this.newuserid,
                    relatedId: this.relatedId,
                    isQuote: this.isQuote,
                    selectionType: this.selectionType,
                    relatedType: this.relatedType,
                    newType: this.newType,
                    keyword: this.keyword,
                    shopId: this.shopId,
                    isShopPunch: this.isShopPunch,
                    userType: this.userType,
                    entertainmentSiftCategoryId: this.entertainmentSiftCategoryId,
                    shopCategory: this.shopCategory,
                })
                .then((res) => {
                    res.data.records.filter((s) => {
                        s.article.imgarr = s.article.imgs.split(",");
                    });

                    res.data.records.filter((s) => {
                        this.imgList.push(s);
                    });
                });
        },
        getimgList() {
            let _this = this;
            if (this.imgcurrent == 1) {
                this.$showLoading();
                setTimeout(() => {
                    _this.$hideLoading();
                }, 3000);
            }

            this.$newrequest
                .post("/coc-social/api/v2/article/articleList", {
                    current: this.imgcurrent,
                    size: 10,
                    type: 2,
                    userId: this.newuserid,
                    isQuote: this.isQuote,
                    selectionType: this.selectionType,
                    relatedType: this.relatedType,
                    newType: this.newType,
                    relatedId: this.relatedId,
                    shopId: this.shopId,
                    isShopPunch: this.isShopPunch,
                    keyword: this.keyword,
                    userType: this.userType,
                    entertainmentSiftCategoryId: this.entertainmentSiftCategoryId,
                    shopCategory: this.shopCategory,
                })
                .then((res) => {
                    if (this.imgcurrent == 1) {
                        this.articleId = res.data.records[0].article.id;
                    }
                    res.data.records.filter((s) => {
                        s.article.imgarr = s.article.imgs.split(",");
                    });
                    res.data.records.filter((s) => {
                        this.imgList.push(s);
                    });
                });
        },
        getothervideoList(id) {
            let _this = this;
            this.$newrequest
                .post("/coc-social/api/v2/article/articleList", {
                    current: this.videocurrent,
                    size: 10,
                    type: 1,
                    articleId: id,
                    userId: this.newuserid,
                    isQuote: this.isQuote,
                    selectionType: this.selectionType,
                    relatedId: this.relatedId,
                    relatedType: this.relatedType,
                    newType: this.newType,
                    shopId: this.shopId,
                    isShopPunch: this.isShopPunch,
                    keyword: this.keyword,
                    userType: this.userType,
                    entertainmentSiftCategoryId: this.entertainmentSiftCategoryId,
                    shopCategory: this.shopCategory,
                })
                .then((res) => {
                    if (this.videocurrent == 1) {
                        _this.$refs.videolist.getonload();
                        _this.$refs.videolist.getchangdi(res.data.records[0].article.id);
                        res.data.records.filter((s) => {
                            this.videoList.push(s);
                        });
                    }
                });
        },
        getvideoList() {
            let _this = this;
            if (this.videocurrent == 1) {
                this.$showLoading();
                setTimeout(() => {
                    _this.$hideLoading();
                }, 3000);
            }

            this.$newrequest
                .post("/coc-social/api/v2/article/articleList", {
                    current: this.videocurrent,
                    size: 10,
                    type: 1,
                    userId: this.newuserid,
                    isQuote: this.isQuote,
                    selectionType: this.selectionType,
                    relatedType: this.relatedType,
                    newType: this.newType,
                    relatedId: this.relatedId,
                    keyword: this.keyword,
                    shopId: this.shopId,
                    isShopPunch: this.isShopPunch,
                    userType: this.userType,
                    entertainmentSiftCategoryId: this.entertainmentSiftCategoryId,
                    shopCategory: this.shopCategory,
                })
                .then((res) => {
                    if (this.videocurrent == 1) {
                        this.articleId = res.data.records[0].article.id;
                        _this.$refs.videolist.getonload();
                        _this.$refs.videolist.getchangdi(res.data.records[0].article.id);
                        res.data.records.filter((s) => {
                            this.videoList.push(s);
                        });
                    } else {
                        res.data.records.filter((s) => {
                            this.videoList.push(s);
                        });
                    }
                });
        },
        OnAddpost() {
            tologin();
            uni.redirectTo({
                url: "/pages/wiseman/component/addimgarticle?isold=1",
                success: function (s) {},
            });
        },
        clear() {
            this.current = 1;
            this.isLoadMore = false;
            this.dataList = [];
            // this.$refs.waterfallsFlowRef.refresh();
            this.getList();
        },
        tosearch(value) {
            this.current = 1;
            this.isLoadMore = false;
            this.dataList = [];
            this.$refs.waterfallsFlowRef.refresh();
            this.getList();
        },
        getList() {
            this.$newrequest
                .post("/coc-social/api/v2/article/myArticleList", {
                    size: 10,
                    current: this.current,
                    title: this.keyword,
                    userId: 0,
                })
                .then((res) => {
                    if (res.data.total == 0) {
                        this.isarticle = false;
                    } else {
                        this.isarticle = true;
                    }
                    res.data.records.filter((s, index) => {
                        if (s.imgs) {
                            s.coverPicture = s.imgs.split(",")[0];
                        } else {
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
                });
        },
    },
};
</script>

<style lang="scss">
.coverPicture {
    width: 700rpx;
    height: 400rpx;
    border-radius: 10rpx;
    position: relative;
}

.kefu-contact {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
}

button::after {
    border: initial;
}

.activity-img {
    margin-top: 20rpx;
    margin-left: 20rpx;
    margin-right: 20rpx;
    width: 710rpx;
}

.currenttab {
    color: #d91b1b;
}

.btn {
    width: 120rpx;
    height: 52rpx;
    text-align: center;
    background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    line-height: 52rpx;
    color: #ffffff;
}

.title {
    margin-top: 35rpx;
    font-size: 28rpx;
    width: 603rpx;
    margin-left: 25rpx;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.item-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 22rpx;
    align-items: center;
    margin-left: 25rpx;
    margin-right: 26rpx;
}

.remind {
    width: 160rpx;
    height: 52rpx;
    border-radius: 26rpx;
    color: #ffffff;
    font-size: 28rpx;
    text-align: center;
    background: #d91b1b;
    line-height: 52rpx;
}

.headPortraits {
    display: flex;
    align-items: center;
    font-size: 24rpx;
}

.Asreminder {
    background-color: #999999;
}

.backimg {
    position: absolute;
    bottom: 18rpx;
    left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgb(34 34 34 / 0.5);
    background-color: rgba(34, 34, 34, 0.5);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    width: 120rpx;
    height: 52rpx;
}

.btn-project {
    font-size: 32rpx;
}

.playitem {
    margin: 16rpx 20rpx;
    // background-color: #ffffff;
    border-radius: 10rpx;
    padding-bottom: 20rpx;
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
    margin-top: -40rpx;
}

.item-top {
    background-color: #ffffff;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    // padding-top: 24rpx;
}

.btn-project {
    font-size: 28rpx;
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
    margin-top: 0rpx;
}
</style>
