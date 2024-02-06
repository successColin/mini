<template>
    <view>
        <video
            :id="`video${index}`"
            class="video"
            object-fit="contain"
            :src="encodeURI(details.video)"
            :autoplay="autoplay"
            :loop="loop"
            :controls="controls"
            :enable-progress-gesture="false"
            :show-center-play-btn="false"
            :play-strategy="2"
            @click="videoClick"
            @timeupdate="timeupdate"
            @loadedmetadata="loadedmetadata"
        />
        <view class="slider">
            <view v-if="!slidering" class="slider-time">
                <view class="slider-time-title">{{ startTime }}</view>
                <view class="slider-time-line">/</view>
                <view class="slider-time-title">{{ endTime }}</view>
            </view>
            <slider
                class="slider-data"
                :value="slider"
                activeColor="#FFFFFF"
                backgroundColor="#BFBFBF"
                block-color="#FFFFFF"
                block-size="12"
                @change="sliderChange"
                @changing="sliderChanging"
            />
        </view>
        <view v-if="!status" class="image" @click="play">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20231128/file_1701149668524.png" class="w100h100" />
        </view>
    </view>
</template>
<script>
export default {
    props: {
        index: {
            type: Number,
            default: 0,
        },
        details: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            autoplay: false,
            controls: false,
            loop: true,
            videoContext: undefined,
            timer: undefined,
            status: false,
            slider: 0,
            slidering: true,
            startTime: "00:00",
            endTime: "",
            duration: 0,
        };
    },
    // onReady() {
    //     this.videoContext = uni.createVideoContext(`video${this.index}`, this)
    // },
    mounted() {
        this.videoContext = uni.createVideoContext(`video${this.index}`, this);
        this.initVideo();
    },
    created() {},
    methods: {
        initVideo() {
            this.autoplay = this.index === 0;
            this.status = this.index === 0;
            console.log(this.index, this.autoplay, this.status, this.details.video);
        },
        videoClick() {
            if (!this.status) {
                this.play();
            } else {
                this.pause();
            }
        },
        play() {
            console.log("播放视频");
            this.status = true;
            this.$nextTick(() => {
                this.videoContext.play();
            });
        },
        pause() {
            this.videoContext.pause();
            console.log("暂停视频");
            this.status = false;
        },
        timeupdate({ detail: { currentTime, duration } }) {
            // 视频出现问题时添加代码
            if (!this.status) {
                this.pause();
            }
            // console.log(currentTime, duration, (currentTime / duration).toFixed(2) * 100, "播放进度变化时触发");
            if (this.slidering) {
                this.slider = (currentTime / duration).toFixed(2) * 100;
                this.startTime = this.getTime(Number(currentTime.toFixed(0)));
            }
        },
        loadedmetadata({ detail: { duration } }) {
            console.log(duration, Number(duration.toFixed(0)), "加载完成");
            this.duration = duration;
            this.endTime = this.getTime(Number(duration.toFixed(0)));
            // this.videoContext.play();
            // this.status = true;
        },
        getTime(t) {
            const hours = Math.floor(t / 3600);
            const minutes = ("0" + Math.floor((t % 3600) / 60)).slice(-2);
            const seconds = ("0" + Math.floor((t % 3600) % 60)).slice(-2);
            if (t >= 3600) {
                return hours + ":" + minutes + ":" + seconds;
            } else if (t < 3600 && t >= 0) {
                return minutes + ":" + seconds;
            }
            return "识别失败";
        },
        sliderChange({ detail: { value } }) {
            console.log(value, "sliderChange");
            this.slider = value;
            this.videoContext.seek((value / 100) * this.duration);
            this.slidering = true;
        },
        sliderChanging({ detail: { value } }) {
            this.startTime = this.getTime(Number(((value / 100) * this.duration).toFixed(0)));
            this.slidering = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.video {
    width: 100vw;
    height: 100vh;
}

.slider {
    position: absolute;
    z-index: 100;
    bottom: calc(30rpx + constant(safe-area-inset-bottom));
    bottom: calc(30rpx + env(safe-area-inset-bottom));
    width: 100vw;

    &-time {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 500rpx;
        &-title {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
        }
        &-line {
            margin-left: 10rpx;
            margin-right: 10rpx;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
        }
    }
    &-data {
        margin: 0 !important;
    }
}

.image {
    position: absolute;
    z-index: 50;
    bottom: constant(safe-area-inset-bottom);
    bottom: env(safe-area-inset-bottom);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.w100h100 {
    width: 100rpx;
    height: 100rpx;
}
</style>
