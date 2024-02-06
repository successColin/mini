<template>
    <view class="page">
        <view v-if="dataList.length > 0" class="msglist">
            <view class="msg_item flex" v-for="item in dataList">
                <view class="flex">
                    <image class="item_img" :src="item.operateUserHeadImg"></image>
                    <view class="item_right flex jsb">
                        <view class="item_info">
                            <view class="flex alc">
                                <text class="item_nickname oneLine">{{ item.operateUserNickname }}</text>
                                <text v-if="item.type == 3" class="item_tip">评论了我的作品</text>
                                <text v-if="item.type == 5" class="item_tip">回复了我的评论</text>
                            </view>
                            <view class="item_content">
                                <view>{{ item.content }}</view>
                                <view
                                    v-if="item.commentImgsList.length > 0"
                                    class="flex alc"
                                    style="margin-top: 15rpx"
                                    @click.stop="OnOpenImg(item.commentImgsList[0])"
                                >
                                    <view>
                                        <u-icon color="#D91B1B" name="photo"></u-icon>
                                    </view>
                                    <view class="look_img">查看图片</view>
                                </view>
                            </view>
                            <view v-if="item.type == 5" class="item_my_div">
                                <text class="item_my">我：</text>
                                <text class="item_my_content">
                                    {{ item.myCommentContent }}
                                </text>
                                <view
                                    v-if="item.myCommentImgsList.length > 0"
                                    class="flex alc"
                                    style="margin-top: 15rpx"
                                    @click.stop="OnOpenImg(item.myCommentImgsList[0])"
                                >
                                    <view>
                                        <u-icon color="#D91B1B" name="photo"></u-icon>
                                    </view>
                                    <view class="look_img">查看图片</view>
                                </view>
                            </view>
                            <view class="item_bottom flex alc">
                                <text class="item_time">{{ item.time }}</text>
                                <view class="flex alc" @click="opencomment(item)">
                                    <image
                                        class="reply_icon"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692343828918.png"
                                    >
                                    </image>
                                    <text class="item_reply">回复</text>
                                </view>
                            </view>
                        </view>
                        <view style="position: relative; width: 85rpx; height: 85rpx">
                            <image
                                v-if="!item.videoList || item.videoList.length == 0"
                                class="item_works_img"
                                :src="item.imgsList[0]"
                                @click="jumpDetail(item)"
                            ></image>
                            <view style="height: 85rpx" @click="jumpDetail(item)">
                                <image
                                    v-if="item.videoList && item.videoList.length > 0"
                                    class="item_works_img"
                                    :src="item.videoList[0] + '?x-oss-process=video/snapshot,t_1000,m_fast'"
                                ></image>
                                <image
                                    v-if="item.videoList && item.videoList.length > 0"
                                    class="player"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png"
                                >
                                </image>
                            </view>
                        </view>
                    </view>
                </view>
                <view>
                    <view class="item_line"></view>
                </view>
            </view>
        </view>
        <view v-else class="tac mt50">
            <image
                style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
            >
            </image>
            <view class="txtDarkGray">暂无评论</view>
        </view>
        <u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
        <view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
        <view style="height: 50rpx"></view>
        <u-popup :safeAreaInsetBottom="false" :show="popimgs" @close="closeimg" mode="center">
            <view>
                <image mode="widthFix" style="width: 650rpx" :src="imgsbig"></image>
            </view>
        </u-popup>
        <u-popup :safeAreaInsetBottom="false" round="12rpx" :show="showcomment" @close="closecomment" mode="bottom">
            <view class="pop">
                <view class="card">
                    <view style="margin-top: 20rpx">
                        <u--textarea
                            maxlength="500"
                            v-model="chosecomment.content"
                            placeholder="请输入评论内容"
                        ></u--textarea>
                    </view>
                </view>
                <view style="margin: 40rpx">
                    <u-upload :fileList="fileList" @delete="deletePic" @afterRead="afterRead" :maxCount="1"> </u-upload>
                </view>
                <view class="Totrue">
                    <text @click="submitcomments">提交评论</text>
                </view>
            </view>
        </u-popup>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
import { tologin } from "@/utils/index.js";
export default {
    data() {
        return {
            dataList: [],
            searchField: {
                current: 1,
                size: 10,
                type: 3,
            },
            loadMore: false, //加载更多
            isReachBottom: false, //没有更多
            imgsbig: "",
            popimgs: false,
            chosecomment: {},
            showcomment: false,
            isend: true,
            fileList: [],
        };
    },
    onLoad() {
        this.getList();
        this.readMessage();
    },
    onReachBottom() {
        if (!this.isReachBottom && !this.loadMore) {
            this.searchField.current += 1;
            this.getList();
        }
    },
    methods: {
        readMessage() {
            this.$newrequest
                .post("/coc-active/api/v1/newExpert/viewExpertMessage", {
                    type: this.searchField.type,
                })
                .then((res) => {
                    if (res.code === 200) {
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                });
        },
        getList() {
            this.loadMore = true;
            this.$newrequest
                .post("/coc-active/api/v1/newExpert/expertMessageList", this.searchField)
                .then((res) => {
                    if (res.code === 200) {
                        if (this.searchField.current === 1) {
                            this.dataList = res.data.records;
                        } else {
                            res.data.records.forEach((m) => {
                                this.dataList.push(m);
                            });
                        }
                        if (res.data.records.length < this.searchField.size) {
                            this.isReachBottom = true;
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
                    this.loadMore = false;
                });
        },
        OnOpenImg(url) {
            this.imgsbig = url;
            this.popimgs = true;
        },
        closeimg() {
            this.popimgs = false;
        },
        opencomment(item) {
            if (tologin() !== true) {
                return;
            }
            this.chosecomment = {};
            this.chosecomment.commentType = 4;
            this.chosecomment.id = item.commentId;
            this.showcomment = true;
        },
        closecomment() {
            this.chosecomment = {};
            this.showcomment = false;
        },
        async afterRead(event) {
            let lists = [].concat(event.file);
            lists.map((item, i) => {
                this.fileList.push({
                    ...item,
                    status: "uploading",
                    message: "上传中",
                    uploadstatus: false,
                });
            });
            for (let i = 0; i < this.fileList.length; i++) {
                let data = this.fileList[i];
                if (data.status === "uploading" && !this.fileList[i].uploadstatus) {
                    this.fileList[i].uploadstatus = true;
                    const result = await this.uploadFilePromise(data.url);
                    this.fileList[i].url = result;
                    this.fileList[i].status = "success";
                    this.fileList[i].message = "";
                }
            }
        },
        uploadFilePromise(url) {
            return new Promise((resolve, reject) => {
                let a = uni.uploadFile({
                    url: getApp().globalData.uploadUrl, // 仅为示例，非真实的接口地址
                    filePath: url,
                    name: "file",
                    formData: {
                        user: "test",
                    },
                    success: (res) => {
                        setTimeout(() => {
                            resolve(JSON.parse(res.data).data);
                        }, 0);
                    },
                });
            });
        },
        deletePic(event) {
            this.fileList.splice(event.index, 1);
        },
        submitcomments() {
            if (this.isend) {
                this.isend = false;
                let imgs = null;
                if (this.fileList.length > 0) {
                    imgs = this.fileList[0].url;
                }
                if (!imgs) {
                    imgs = null;
                } else {
                    imgs = [imgs];
                }
                this.$request
                    .post(
                        "/coc-social/api/v2/article/comment",
                        Object.assign(
                            {
                                imgs,
                            },
                            this.chosecomment
                        )
                    )
                    .then((res) => {
                        if (res.code == 200) {
                            this.$refs.uToast.show({
                                message: "评论成功",
                            });
                            this.isend = true;
                            this.fileList = [];
                            this.closecomment();
                        } else {
                            this.isend = true;
                            this.$refs.uToast.show({
                                message: res.message,
                            });
                        }
                    });
            } else {
                return false;
            }
        },
        jumpDetail(item) {
            let url = "";
            if (item.videoList && item.videoList.length > 0) {
                // url = `/pages/wiseman/component/videoarticle?id=${item.articleId}`
                url = "/pages/activity/articlevideo/index?id=" + item.articleId;
            } else {
                // url = `/pages/wiseman/component/imgarticle?id=${item.articleId}`
                url = "/pages/activity/waterfull/imglist?id=" + item.articleId;
            }
            uni.navigateTo({
                url,
            });
        },
    },
};
</script>

<style scoped lang="scss">
.page {
    background-color: #fff;
    min-height: 100vh;
}

.msglist {
    padding: 0 23rpx;

    .msg_item {
        margin-bottom: 10rpx;
        flex-direction: column;
        padding: 23rpx 0;
    }

    .item_img {
        width: 85rpx;
        height: 85rpx;
        border-radius: 117rpx;
    }

    .item_info {
        width: 480rpx;
    }

    .item_right {
        margin-left: 16rpx;
        width: calc(100% - 101rpx);
    }

    .item_nickname {
        font-size: 27rpx;
        font-weight: 500;
        color: #222222;
        max-width: 290rpx;
        display: inline-block;
    }

    .item_tip {
        font-size: 27rpx;
        font-weight: 400;
        color: #666666;
        margin-left: 8rpx;
    }

    .item_content {
        font-size: 27rpx;
        font-weight: 400;
        color: #000000;
        margin-top: 8rpx;
    }

    .item_my_div {
        background: #f9f8f6;
        border-radius: 8rpx;
        padding: 16rpx;
        margin-top: 8rpx;
    }

    .item_my {
        font-size: 27rpx;
        font-weight: 400;
        color: #d91b1b;
    }

    .item_my_content {
        font-size: 27rpx;
        font-weight: 400;
        color: #000000;
    }

    .item_bottom {
        margin-top: 8rpx;
    }

    .item_time {
        font-size: 23rpx;
        font-weight: 400;
        color: #999999;
    }

    .reply_icon {
        width: 27rpx;
        height: 27rpx;
        margin-left: 39rpx;
    }

    .item_reply {
        font-size: 23rpx;
        font-weight: 400;
        color: #999999;
        margin-left: 4rpx;
    }

    .item_works_img {
        width: 85rpx;
        height: 85rpx;
        border-radius: 8rpx;
    }

    .item_line {
        height: 0;
        border-radius: 1rpx;
        border-top: 1rpx solid #999999;
        margin-top: 16rpx;
        width: calc(100% - 101rpx);
        float: right;
    }

    .look_img {
        font-size: 24rpx;
        color: #d91b1b;
        margin-left: 10rpx;
    }
}

.pop {
    padding: 20rpx;
    // width: 640rpx;
    background-color: #ffffff;

    .title {
        font-size: 36rpx;
        font-weight: bold;
        margin-top: 15rpx;
        margin-left: 20rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .card {
        background-color: #ffffff;
        border-radius: 12rpx;

        .rate {
            display: flex;
            font-size: 28rpx;
            margin-left: 20rpx;
            padding-bottom: 20rpx;
        }
    }

    .Totrue {
        text-align: center;
        margin-top: 60rpx;
        margin-bottom: 40rpx;

        text {
            font-size: 32rpx;
            padding: 10rpx 80rpx;
            background-color: #d91b1b;
            border-radius: 10rpx;
            color: #ffffff;
        }
    }
}

.player {
    width: 46rpx;
    height: 46rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.reachBottom {
    text-align: center;
    font-size: 24rox;
    color: #999999;
    padding: 20rpx;
    font-size: 24rpx;
    color: #999999;
}
</style>
