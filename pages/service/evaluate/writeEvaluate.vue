<template>
    <view class="page">
        <view class="comment">
            <view class="shopName fwb">{{ info.shopName }}</view>
            <view class="mt10 flex mb20 alc">
                <view class="size28" style="margin-right: 30rpx">总体评价</view>
                <u-rate
                    active-color="#D91B1B"
                    inactive-color="#D9D9D9"
                    :size="36"
                    count="5"
                    v-model="commentInfo.grade"
                    :gutter="10"
                ></u-rate>
            </view>
            <!-- <u--textarea v-model="commentInfo.content" placeholder="写下您的评价" count :autoHeight="true" 
            disable-default-padding='true' :maxlength="500" :border='none' height="150"></u--textarea>-->
            <textarea
                class="text size28"
                v-model="commentInfo.content"
                placeholder="写下您的评价"
                @focus="focusText"
                @blur="blurText"
                :maxlength="500"
                :adjust-position="false"
                style="width: 100%"
                disable-default-padding="true"
            ></textarea>
            <view class="mt20 flex">
                <!-- 上传图片 -->
                <u-upload
                    :fileList="imgs"
                    @afterRead="afterRead"
                    @delete="deletePic"
                    :multiple="true"
                    style="width: 160rpx; height: 160rpx"
                    :maxCount="9"
                    name="1"
                    :previewFullImage="true"
                >
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231218/file_1702888529806.png"
                        mode="widthFix"
                        style="width: 160rpx; height: 160rpx"
                    ></image>
                </u-upload>
            </view>
            <view class="mt20" v-if="videos.length == 0" style="width: 160rpx; height: 160rpx">
                <u-upload
                    :fileList="videos"
                    @afterRead="afterReadvideo"
                    @delete="deleteVideo"
                    :maxCount="1"
                    accept="video"
                    width="160"
                    height="160"
                    name="2"
                    :previewFullImage="true"
                >
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231218/file_1702888545932.png"
                        mode="widthFix"
                        style="width: 160rpx; height: 160rpx"
                    ></image>
                </u-upload>
            </view>
            <view class="hadvideo mt20" v-else @click="previewvideo">
                <image :src="videos[0].coverImage" mode="aspectFill" style="width: 160rpx; height: 160rpx"></image>
                <image
                    style="width: 60rpx; height: 60rpx"
                    class="playPic"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702987370146.png"
                >
                </image>
                <image
                    style="width: 28rpx; height: 28rpx"
                    class="delPic"
                    @click="deletevideo"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702951659100.png"
                >
                </image>
            </view>
        </view>
        <view class="btn-div">
            <view class="subBtn" @click="submitComment">发布</view>
        </view>
        <!-- 上传进度百分比 -->
        <u-modal :show="showLoading" title="上传进度" :show-confirm-button="false">
            <view class="u-update-content">
                <u-loading mode="flower"></u-loading>
                <view>预计上传时间: {{ totalPercentage }}s</view>
                <view class="mt20"
                    >上传进度:
                    <text class="mainRed ml10 size32">{{ percentage }}%</text>
                </view>
            </view>
        </u-modal>
        <u-toast ref="uToast"></u-toast>
        <u-popup :safeAreaInsetBottom="false" :show="showvideopop" @close="showvideopop = false" mode="center">
            <video :loop="true" :src="videos[0].url" :autoplay="true" :controls="true"></video>
        </u-popup>
        <u-loading-page
            loading-mode="spinner"
            :loading="showloading2"
            bgColor="rgba(0,0,0,0.4)"
            color="white"
            loadingColor="white"
            loadingText="发布中"
        ></u-loading-page>
    </view>
</template>

<script>
import { getstorage, tologin } from "@/utils/index.js";
export default {
    data() {
        return {
            commentInfo: {
                content: "",
                imgs: [],
                videos: [],
                id: "",
                commentType: "",
                grade: 0,
            },
            imgs: [],
            videos: [],
            percentage: 0,
            totalPercentage: 0,
            showLoading: false,
            showloading2: false,
            id: "",
            info: {},
            isSubmit: false,
            showvideopop: false,
        };
    },
    onLoad(option) {
        this.info = JSON.parse(option.info);
        this.commentInfo.id = this.info.id;
        this.commentInfo.commentType = this.info.commentType;
        // this.userId = getstorage("userId")
    },
    methods: {
        //评论
        submitComment() {
            if (tologin() !== true) {
                return;
            }
            if (!this.commentInfo.content || this.commentInfo.content.trim().length === 0) {
                uni.showToast({
                    title: "请输入内容",
                    icon: "none",
                    duration: 2000,
                });
                return;
            }
            let imgs = [],
                uploadsuccess = true;
            if (this.imgs.length) {
                this.imgs.forEach((m) => {
                    imgs.push(m.url);
                    if (m.status === "uploading") {
                        uploadsuccess = false;
                    }
                });
                if (!uploadsuccess) {
                    uni.showToast({
                        title: "图片正在上传中",
                        icon: "none",
                        duration: 2000,
                    });
                    return;
                }
                this.commentInfo.imgs = imgs;
            }
            if (this.videos.length) {
                this.commentInfo.videos[0] = this.videos[0].url;
                this.commentInfo.coverImage = this.videos[0].coverImage;
            }
            this.isSubmit = true;
            this.showloading2 = true;
            this.$newrequest
                .post("/coc-system/api/v1/user_interaction/comment", this.commentInfo)
                .then((res) => {
                    if (res.code == 200) {
                        this.showloading2 = false;
                        uni.showToast({
                            title: "评论成功",
                            icon: "success",
                            duration: 2000,
                        });
                        uni.navigateBack({
                            delta: 1,
                        });
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                })
                .finally(() => {
                    this.showloading2 = false;
                });
        },
        // 删除图片
        deletePic(event) {
            this.imgs.splice(event.index, 1);
        },
        // 新增图片
        async afterRead(event) {
            let lists = [].concat(event.file);
            lists.map((item, i) => {
                this.imgs.push({
                    ...item,
                    status: "uploading",
                    message: "上传中",
                    uploadstatus: false,
                });
            });
            for (let i = 0; i < this.imgs.length; i++) {
                let data = this.imgs[i];
                if (data.status === "uploading" && !this.imgs[i].uploadstatus) {
                    this.imgs[i].uploadstatus = true;
                    const result = await this.uploadFilePromise(data.url);
                    this.imgs[i].url = result;
                    this.imgs[i].status = "success";
                    this.imgs[i].message = "";
                }
            }
        },
        //上传图片
        uploadFilePromise(url) {
            return new Promise((resolve, reject) => {
                uni.uploadFile({
                    url: getApp().globalData.uploadUrl,
                    filePath: url,
                    name: "file",
                    formData: {
                        file: url,
                    },
                    header: {
                        "Content-Type": "multipart/form-data",
                    },
                    success: (uploadFileRes) => {
                        resolve(JSON.parse(uploadFileRes.data).data);
                    },
                });
            });
        },
        // 上传视频
        afterReadvideo(event) {
            this.videos = [];
            // let url = '';
            // if (!event.file.url.split('/')[3]) {
            //     //手机上
            //     url = event.file.url.split('/')[2];
            // } else {
            //     // 电脑上
            //     url = event.file.url.split('/')[3];
            // }
            const arr = event.file.url.split(".");
            const time = new Date().getTime();
            const num = Math.floor(Math.random() * 100) + 1;
            let url = time + num + "." + arr[1];

            console.log(url);
            let that = this;
            this.$newrequest.get("/coc-file/api/v1/oss/policy").then((res) => {
                console.log(res, url);
                uni.uploadFile({
                    url: "https://51shanky.oss-cn-hangzhou.aliyuncs.com/",
                    filePath: event.file.url,
                    name: "file",
                    formData: {
                        key: res.data.dir + url,
                        policy: res.data.policy,
                        OSSAccessKeyId: res.data.accessid,
                        signature: res.data.signature,
                        success_action_status: "200",
                    },
                    success: function (res1) {
                        that.percentage = 100;
                        that.showLoading = false;
                        that.videos.push({
                            url: "https://oss.dcqcjlb.com/" + res.data.dir + url,
                            status: "success",
                            message: "",
                            coverImage:
                                "https://oss.dcqcjlb.com/" +
                                res.data.dir +
                                url +
                                "?x-oss-process=video/snapshot,t_1000,m_fast",
                        });
                    },
                }).onProgressUpdate((res) => {
                    this.showLoading = true;
                    this.percentage = res.progress < 99 ? res.progress : 99;
                    this.totalPercentage = Math.trunc(res.totalBytesExpectedToSend / 1000000);
                    if (res.progress == 100) {
                        this.showLoading = false;
                    }
                });
            });
        },
        // 删除视频
        deletevideo(event) {
            this.videos.splice(event.index, 1);
        },
        //预览图片
        previewImage(urllist, index) {
            uni.previewImage({
                urls: urllist,
                current: index,
            });
        },
        //评论输入框键盘获取焦点
        focusText(event) {
            this.keywordHeight = event.detail.height + 20 - 50 + "rpx";
        },
        //评论输入框键盘失去焦点
        blurText() {
            this.keywordHeight = "0rpx";
        },
        previewvideo() {
            this.showvideopop = true;
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
    min-height: 100vh;
    background-color: #fff;
}

.comment {
    padding: 25rpx;
    margin-bottom: 200rpx;

    .shopName {
        font-size: 38rpx;
    }
}

.btn-div {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 30rpx 0;
    left: 0;
    z-index: 100;

    .subBtn {
        width: 50%;
        margin-left: 25%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        background-color: #d91b1b;
        color: #fff;
        font-size: 28rpx;
        border-radius: 50rpx;
        margin-bottom: 50rpx;
    }
}

.hadvideo {
    position: relative;
    width: 160rpx;
    height: 160rpx;

    .playPic {
        position: absolute;
        top: 50rpx;
        left: 50rpx;
        z-index: 10;
    }

    .delPic {
        position: absolute;
        top: 0rpx;
        right: 0rpx;
        z-index: 10;
    }
}

::v-deep .u-upload__wrap__preview {
    margin: 0 10rpx 10rpx 0 !important;
}
</style>
