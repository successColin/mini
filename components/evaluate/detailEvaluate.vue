<template>
    <view>
        <view class="comments">
            <view class="fwb size32">用户评价 ({{ commentInfo.listNum }})</view>
            <view class="list">
                <view class="EvaluateItem" v-for="(item, index) in commentList.slice(0, 3)" :key="index">
                    <view class="flex jsb alc">
                        <view class="flex">
                            <u-image
                                :src="item.headImg"
                                width="32"
                                height="32"
                                :lazy-load="true"
                                shape="circle"
                            ></u-image>
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
                    <!-- 内容 -->
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
                    <!-- 图片 -->
                    <view class="photos mt10" v-if="item.imgs != null || item.video">
                        <scroll-view scroll-x="true">
                            <view class="flex">
                                <view class="hadvideo" v-if="item.video && item.coverImage" @click="previewvideo(item)">
                                    <image
                                        :src="item.coverImage"
                                        mode="aspectFill"
                                        style="width: 215rpx; height: 215rpx"
                                    >
                                    </image>
                                    <image
                                        style="width: 85rpx; height: 85rpx"
                                        class="playPic"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702987370146.png"
                                    >
                                    </image>
                                </view>
                                <view class="flex">
                                    <view v-for="(p, k) in item.imgs" :key="k">
                                        <image
                                            :src="p"
                                            class="photo"
                                            mode="aspectFill"
                                            @click="previewImg(item.imgs, k)"
                                        >
                                        </image>
                                    </view>
                                </view>
                            </view>
                        </scroll-view>
                        <view v-if="!item.video">
                            <view class="flex photoNum alc" v-if="item.imgs != null && item.imgs.length > 3">
                                <u-icon name="photo" color="#ffffff" size="22"></u-icon>
                                <text class="size28 colorff">{{ item.imgs.length }}</text>
                            </view>
                        </view>
                        <view v-else>
                            <view class="flex photoNum alc" v-if="item.imgs != null && item.imgs.length > 2">
                                <u-icon name="photo" color="#ffffff" size="22"></u-icon>
                                <text class="size28 colorff">{{ item.imgs.length }}</text>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="flex alc jsc lookAll mt20" @click="lookAll" v-if="commentList.length > 3">
                    <view class="size28 mr10">查看全部评价</view>
                    <u-icon name="arrow-right" :size="16"></u-icon>
                </view>
            </view>
        </view>
        <u-popup :safeAreaInsetBottom="false" :show="showvideopop" @close="showvideopop = false" mode="center">
            <video :loop="true" :src="videoUrl" :autoplay="true" :controls="true"></video>
        </u-popup>
    </view>
</template>
<script>
export default {
    props: {
        commentList: Array,
        shopName: String,
        commentInfo: Object,
    },
    data() {
        return {
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
            showvideopop: false,
            videoUrl: "",
            userId: 0,
        };
    },
    created() {
        this.getUser();
    },
    watch: {},
    methods: {
        //预览图片
        previewImg(urllist, index) {
            uni.previewImage({
                urls: urllist,
                current: index,
            });
        },
        lookAll() {
            uni.navigateTo({
                url: "/pages/service/evaluate/allEvaluate?commentInfo=" + JSON.stringify(this.commentInfo),
            });
        },
        previewvideo(item) {
            this.videoUrl = item.video;
            this.showvideopop = true;
        },
        getUser() {
            const userId = uni.getStorageSync("userId");
            if (userId) {
                this.userId = userId * 1;
            }
        },
        async delComment(value) {
            const { code, message } = await this.$request.post("/coc-system/api/v1/user_interaction/delComments", {
                id: value.id,
            });
            if (code == 200) {
                uni.$u.toast("删除成功");
                uni.$emit("del_comment");
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
    width: 215rpx;
    height: 215rpx;
    display: block;
    border-radius: 4rpx;
    margin-right: 6rpx;
}

.hadvideo {
    position: relative;
    width: 215rpx;
    height: 215rpx;
    margin-right: 6rpx;

    .playPic {
        position: absolute;
        top: 65rpx;
        left: 65rpx;
        z-index: 5;
    }
}

.EvaluateItem {
    padding: 23rpx 0;
    border-bottom: 1rpx solid #e5e5e5;
}

.EvaluateItem:nth-last-child(1) {
    border: none;
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
