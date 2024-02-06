<template>
    <view class="page">
        <view class="card">
            <view>
                <view class="wen">问</view>
                <text class="size28 fwb ml10">{{ info.question }}</text>
            </view>
            <image :src="info.image" class="mt20 swiperPic" v-if="info.image" mode="widthFix" @click="clickImg" />
            <view v-if="info.answers && info.answers.length">
                <view class="flex jsb alc mt20">
                    <view class="flex ">
                        <image :src="'https://51che.oss-cn-hangzhou.aliyuncs.com' + info.answers[0].user_pic" class="head"
                            v-if="info.answers[0].user_pic"></image>
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706063549640.png" class="head" v-else></image>
                        <view class="ml20">
                            <view class="size32 fwb">{{ info.answers[0].user_name }}</view>
                            <view class="tip">{{ info.answers[0].shop_name }}</view>
                        </view>
                    </view>
                    <view class="connect" style="text-align:center;" @click="clickTel">
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693470616139.png" class="telPic">
                        </image>
                        <view class="size20 txtLighGray">电话联系</view>
                    </view>
                </view>
                <view class="contentInfo mt30">
                    <text style="line-height:1.5;">{{ info.answers[0].answer }}</text>	
                </view>
            </view>
            <view v-else-if="info.answer">
                <view class="contentInfo mt30">
                    <text style="line-height:1.5;">{{ info.answer }}</text>
                </view>
            </view>
            <view class="tac mt50" v-else>
                <image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
                </image>
                <view class="txtDarkGray mt20">暂无回答,请耐心等候~</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            id: '',
            info: {},
        }
    },
    onLoad(option) {
        let that = this
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('getinfo', function (data) {
            console.log(data)
            that.info = data.data
        })
        console.log(that.info)

    },
    onShow() {
    },
    methods: {
        //拨打电话
        clickTel() {
            uni.makePhoneCall({
                phoneNumber: this.info.answers[0].shop_mobile,
            });
        },
        clickImg() {
            let urlList = []
            urlList.push(this.info.image)
            uni.previewImage({
                urls: urlList,
                current: 1
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
    background-color: #f8f8f8;
}

.card {
    background-color: #fff;
    border-radius: 10rpx;
    padding: 25rpx;
    box-sizing: border-box;
}

.swiperPic {
    width: 100%;
    // height: 320rpx;
    border-radius: 8rpx;
}

.wen {
    font-size: 20rpx;
    color: #fff;
    background-color: #D91B1B;
    border-radius: 10rpx 0rpx 10rpx 0rpx;
    text-align: center;
    width: 30rpx;
    height: 30rpx;
    line-height: 30rpx;
    display: inline-block;

}

.head {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
}

.tip {
    background: #FBE8E8;
    border-radius: 10rpx;
    color: #D91B1B;
    font-size: 20rpx;
    text-align: center;
    margin-top: 20rpx;
    padding: 5rpx 10rpx
}

.telPic {
    width: 62rpx;
    height: 62rpx;
}
</style>



