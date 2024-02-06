<template>
    <div class="bigDec">
        <view class="bigDec__image">
            <video
                v-if="item.adPushUrl"
                :src="item.adPushUrl"
                :id="videoId"
                :poster="coverImage"
                class="bigDec__image--video"
                :controls="controls"
                :object-fit="objectFit"
                :show-play-btn="showPlayBtn"
                :show-center-play-btn="false"
                :loop="false"
                :show-fullscreen-btn="false"
                @ended="handleEnded"
                @error="videoErrorCallback"
            ></video>
            <image v-else :src="coverImage" class="bigDec__image--img" mode="aspectFill" @click="handleClick" />
            <!-- 播放图 -->
            <view class="bigDec__image--icon" v-if="item.adPushUrl && isShowPlayImg" @click="handlePlay">
                <image
                    style="width: 100rpx; height: 100rpx"
                    mode="aspectFill"
                    class="choice-item-video-image"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698492577434.png"
                />
            </view>
        </view>
    </div>
</template>

<script>
export default {
    onReady: function () {
        this.videoContext = uni.createVideoContext(this.videoId, this);
    },
    props: {
        item: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            videoContext: null,
            objectFit: "cover",
            controls: false,
            showPlayBtn: false,
            isShowPlayImg: true,
        };
    },
    components: {},
    computed: {
        videoId() {
            return `myVideo_${this.item.id}`;
        },
        coverImage() {
            // return this.item.adCoverImg ? this.item.adCoverImg : this.item.coverPicture;
            return  this.item.coverPicture ? this.item.coverPicture : this.item.adPushUrl + "?x-oss-process=video/snapshot,t_1000,m_fast"
        },
    },
    methods: {
        handlePlay() {
            this.videoContext.play();
            this.objectFit = "contain";
            this.controls = true;
            this.showPlayBtn = true;
            this.isShowPlayImg = false;
        },
        handleEnded() {
            this.objectFit = "cover";
            this.controls = false;
            this.showPlayBtn = false;
            this.isShowPlayImg = true;
        },
        handleClick() {
            // console.log(this.item);
            // const { type } = this.item;
            // if (type === 1) {
            //     uni.navigateTo({
            //         url: "/pages/grouppurchase/detail?id=" + this.item.id + "&relatedType=4",
            //     });
            // } else if (type === 2) {
            //     uni.navigateTo({
            //         url: "/pages/grouppurchase/packagedetail?id=" + this.item.id + "&relatedType=5",
            //     });
            // }
        },
        videoErrorCallback(e) {
            console.log(e);
            // uni.showModal({
            //     content: e.target.errMsg,
            //     showCancel: false,
            // });
        },
    },
};
</script>
<style lang="scss" scoped>
.bigDec {
    &__image {
        position: relative;
        &--img,
        &--video {
            width: 100%;
            height: 400rpx;
            border-radius: 10rpx;
        }
        &--icon {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    &__price {
        margin-top: 15rpx;
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        &--left {
            display: flex;
            align-items: baseline;
            & > div:nth-child(1) {
                font-size: 44rpx;
                font-family: HONOR Sans CN;
                font-weight: bold;
                color: #d91b1b;
                line-height: 36rpx;
                span {
                    font-size: 24rpx;
                    font-weight: 500;
                }
                text {
                    font-size: 32rpx;
                }
            }
            & > div:nth-child(2) {
                text-decoration: line-through;
                margin-left: 15rpx;
            }
        }
    }
    &__title {
        margin-top: 15rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
    }
    &__tradeName {
        margin-top: 20rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        display: flex;
        align-items: center;
        image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 11rpx;
        }
    }
}
</style>
