<template>
    <view class="comment" @click="setComment">
        <view v-if="!image && !upload && !input" class="comment-bottom" @click.stop>
            <view class="h660">
                <view class="comment-bottom-number">{{ value.number }}条评论</view>
                <scroll-view scroll-y="true" class="comment-bottom-scroll">
                    <view v-for="(v, i) in value.list" :key="i">
                        <view class="comment-bottom-item" @click="setInput(v, true)">
                            <image :src="v.head" class="comment-bottom-item-head" />
                            <view class="w620">
                                <view class="df aic jcsb">
                                    <view class="df aic">
                                        <view class="comment-bottom-item-name">{{ v.name }}</view>
                                        <view class="comment-bottom-item-location">来自{{ v.location }}</view>
                                    </view>
                                    <view class="comment-bottom-item-time">{{ v.time }}</view>
                                </view>
                                <view class="df aic jcsb">
                                    <view class="comment-bottom-item-content">
                                        <view class="comment-bottom-item-content-title">{{ v.content }}</view>
                                    </view>
                                    <view
                                        v-if="userId === v.userId"
                                        class="comment-bottom-item-delete"
                                        @click.stop="delComment(v)"
                                        >删除</view
                                    >
                                </view>
                                <view v-if="v.image" class="df" @click.stop="setImage(v)">
                                    <view class="comment-bottom-item-photo">
                                        <u-icon color="#D91B1B" name="photo" size="36rpx" />
                                    </view>
                                    <view class="comment-bottom-item-check">查看图片</view>
                                </view>
                            </view>
                        </view>
                        <view v-for="(val, index) in v.children" :key="index" class="comment-bottom-children">
                            <image :src="val.head" class="comment-bottom-item-head" />
                            <view class="w560">
                                <view class="df aic jcsb">
                                    <view class="df aic">
                                        <view class="comment-bottom-item-name">{{ val.name }}</view>
                                        <view class="comment-bottom-item-location">来自{{ val.location }}</view>
                                    </view>
                                    <view class="comment-bottom-item-time">{{ val.time }}</view>
                                </view>
                                <view class="df jcsb">
                                    <view class="comment-bottom-item-content">{{ val.content }}</view>
                                    <view
                                        v-if="userId === val.userId"
                                        class="comment-bottom-item-delete"
                                        @click.stop="delComment(val)"
                                        >删除</view
                                    >
                                </view>
                                <view v-if="val.image" class="df" @click.stop="setImage(val)">
                                    <view class="comment-bottom-item-photo">
                                        <u-icon color="#D91B1B" name="photo" size="36rpx" />
                                    </view>
                                    <view class="comment-bottom-item-check">查看图片</view>
                                </view>
                            </view>
                        </view>
                        <!-- <view class="comment-bottom-item-line" /> -->
                    </view>
                </scroll-view>
                <view class="comment-bottom-input" @click="setUpload(true)">
                    <view class="comment-bottom-input-frame">
                        <u-icon color="#999999" name="edit-pen" size="36rpx" />
                        <view class="comment-bottom-input-frame-title">说点什么..</view>
                    </view>
                </view>
            </view>
            <view class="safe-bottom-height" />
        </view>
        <view v-else-if="image" class="comment-image" @click.stop="setImage({ image: '' })">
            <image :src="image" mode="widthFix" class="w750" />
        </view>
        <view v-else-if="upload" class="comment-input" @click.stop>
            <view class="h660 jcsb">
                <view class="comment-bottom-number">评论</view>
                <view class="comment-input-textarea">
                    <u--textarea v-model="form.content" placeholder="请输入内容" />
                </view>
                <view class="comment-input-upload">
                    <u-upload
                        :maxCount="1"
                        :fileList="form.fileList"
                        @delete="deleteUpload"
                        @afterRead="afterReadUpload"
                    />
                </view>
                <view class="comment-input-btn" @click="submit(value.commentType[0])">提交评论</view>
            </view>
            <view class="safe-bottom-height" />
        </view>
        <view v-else-if="input" class="comment-input" @click.stop>
            <view class="h660 jcsb">
                <view class="comment-bottom-number">评论</view>
                <view class="comment-input-textarea">
                    <u--textarea v-model="form.content" placeholder="请输入内容" />
                </view>
                <view class="comment-input-btn" @click="submit(value.commentType[1])">提交评论</view>
            </view>
            <view class="safe-bottom-height" />
        </view>
    </view>
</template>
<script>
export default {
    props: {
        details: {
            type: Object,
            default: () => {},
        },
        userId: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            value: {
                number: 1,
                list: [],
            },
            image: "",
            upload: false, // 图片和文字
            input: false, // 文字
            form: {
                id: "",
                content: "",
                fileList: [],
            },
        };
    },
    watch: {
        details: {
            handler(newVal, oldVal) {
                this.getDetails();
            },
        },
        deep: true,
    },
    mounted() {
        this.getDetails();
    },
    methods: {
        getDetails() {
            Object.assign(this.value, this.details);
        },
        setComment() {
            if (this.upload) {
                this.upload = false;
            } else if (this.input) {
                this.input = false;
            } else {
                this.$emit("close");
            }
        },
        setImage(value) {
            console.log(value);
            this.image = value.image;
        },
        setUpload(status) {
            console.log(status, "setUpload");
            this.form.id = this.value.id;
            this.upload = status;
        },
        setInput(value, status) {
            console.log(value, status, "setInput");
            this.form.id = value.id;
            this.input = status;
        },
        async afterReadUpload(event) {
            const list = [].concat(event.file);
            const fileList = JSON.parse(JSON.stringify(this.form.fileList));
            list.forEach((v) => {
                fileList.push({
                    ...v,
                    status: false,
                });
            });
            for (let i = 0; i < fileList.length; i++) {
                if (!fileList[i].status) {
                    const result = await this.uploadFilePromise(fileList[i].url);
                    fileList[i].status = true;
                    fileList[i].url = result;
                }
            }
            this.form.fileList = fileList;
        },
        uploadFilePromise(url) {
            return new Promise((resolve, reject) => {
                uni.uploadFile({
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
        deleteUpload(event) {
            console.log(event);
            this.form.fileList.splice(event.index, 1);
        },
        async delComment(value) {
            const { code, message } = await this.$request.post("/coc-system/api/v1/user_interaction/delComments", {
                id: value.id,
            });
            if (code == 200) {
                uni.$u.toast("删除成功");
                this.$emit("submit", { id: this.value.id });
            } else {
                uni.$u.toast(message);
            }
        },
        async submit(type) {
            const { id, content, fileList } = this.form;
            let imgs = [];
            if (fileList.length > 0) {
                imgs = [fileList[0].url];
            }
            if (content.length === 0) {
                uni.$u.toast("评论内容不可以为空");
                return;
            }
            console.log({
                commentType: type,
                content,
                id,
                imgs,
            });
            const { code, message } = await this.$request.post("/coc-system/api/v1/user_interaction/comment", {
                commentType: type,
                content,
                id,
                imgs,
            });
            if (code === 200) {
                this.form = {
                    id: "",
                    content: "",
                    fileList: [],
                };
                this.setInput({ id: "" }, false);
                this.setUpload(false);
                this.$emit("submit", { id: this.value.id });
            } else {
                uni.$u.toast(message);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.comment {
    position: absolute;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    &-bottom {
        position: absolute;
        bottom: 0;
        width: 750rpx;
        background: #f8f8f8;
        border-radius: 10rpx 10rpx 0 0;

        &-number {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-top: 36rpx;
            margin-bottom: 0rpx;
        }

        &-scroll {
            height: 470rpx;
        }

        &-item {
            display: flex;
            width: 700rpx;
            margin-left: 25rpx;
            margin-right: 25rpx;
            margin-top: 13rpx;
            padding-bottom: 13rpx;
            &-head {
                width: 60rpx;
                height: 60rpx;
                border-radius: 30rpx;
                margin-right: 20rpx;
            }
            &-name {
                display: flex;
                align-items: center;
                height: 46rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #222222;
            }

            &-location {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 22rpx;
            }

            &-time {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-right: 28rpx;
            }

            &-content {
                display: flex;
                align-items: center;
                width: 500rpx;
                height: 42rpx;
                &-title {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #222222;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
            }

            &-delete {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #d91b1b;
                margin-right: 30rpx;
            }

            &-photo {
                width: 28rpx;
                height: 24rpx;
                margin-top: 10rpx;
            }

            &-check {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #d91b1b;
                margin-left: 14rpx;
                margin-top: 10rpx;
            }

            &-line {
                width: 620rpx;
                height: 1rpx;
                background: #dbdbdb;
                margin-top: 28rpx;
                margin-left: 105rpx;
            }
        }

        &-children {
            display: flex;
            width: 640rpx;
            margin-left: 85rpx;
            margin-right: 25rpx;
            margin-top: 13rpx;
            padding-bottom: 13rpx;
        }

        &-input {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 750rpx;
            height: 120rpx;
            background: #ffffff;
            &-frame {
                display: flex;
                align-items: center;
                width: 694rpx;
                height: 80rpx;
                background: #f8f8f8;
                border-radius: 40rpx;
                padding-left: 30rpx;
                &-title {
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #999999;
                    margin-left: 10rpx;
                }
            }
        }
    }

    &-image {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        background: #000000;
    }

    &-input {
        position: absolute;
        bottom: 0;
        width: 750rpx;
        background: #ffffff;
        border-radius: 10rpx 10rpx 0 0;
        &-textarea {
            width: 650rpx;
            margin: 40rpx;
        }
        &-upload {
            width: 650rpx;
            margin-bottom: 40rpx;
        }
        &-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160rpx;
            height: 60rpx;
            line-height: 60rpx;
            font-size: 28rpx;
            color: #ffffff;
            border-radius: 15rpx;
            background-color: #d91b1b;
            margin-bottom: 40rpx;
        }
    }
}

.w620 {
    width: 620rpx;
}

.w560 {
    width: 560rpx;
}

.h660 {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-height: 660rpx;
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    background: #ffffff;
}

.df {
    display: flex;
}
.aic {
    align-items: center;
}
.jcsb {
    justify-content: space-between;
}
</style>
