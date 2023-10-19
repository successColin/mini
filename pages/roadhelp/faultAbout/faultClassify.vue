<template>
    <view class="page">
        <view class="faultclassify">
            <scroll-view class="faultclassify-left" scroll-y="true">
                <view v-for="(v, i) in leftList" :key="i" class="faultclassify-left-item" @click="setClassify(v, i)">
                    <image :src="v.icon" mode="aspectFill" class="faultclassify-left-item-image" />
                    <view class="faultclassify-left-item-title">{{ v.name }}</view>
                </view>
                <view class="faultclassify-left-line" :style="[lineStyle]" />
            </scroll-view>
            <scroll-view class="faultclassify-right" scroll-y="true">
                <view v-for="(v, i) in rightList" :key="i" class="faultclassify-right-item" @click="toQustion(v)">
                    <view class="faultclassify-right-item-title">{{ v.question }}</view>
                    <view class="faultclassify-right-item-line" />
                </view>
                <view class="faultclassify-right-question">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695288279356.png"
                        class="faultclassify-right-question-image" />
                    <view class="u-flex">
                        <button type="default" class="faultclassify-right-question-lbtn" open-type='contact'
                            session-from=''>
                            <image
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695262101416.png"
                                class="faultclassify-right-question-lbtn-image" />
                            <view class="faultclassify-right-question-lbtn-title">我要咨询</view>
                        </button>
                        <view class="faultclassify-right-question-rbtn" @click="infoShow = true">
                            <image
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695262175428.png"
                                class="faultclassify-right-question-rbtn-image" />
                            <view class="faultclassify-right-question-rbtn-title">咨询技师</view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
        <u-popup :show="infoShow" :safeAreaInsetBottom='false' @close="infoShow = false" mode="bottom" round="10">
            <view class="tac size28 fwb" style="padding: 40rpx;">请先选择爱车品牌</view>
            <view class="list flex alc" style="padding: 0 25rpx;flex-wrap: wrap;">
                <view class="brand tac" v-for="item in brandList" :key="item.brandId" @click="bindBrand(item)"
                    :style="{ color: brand.brandId == item.brandId ? '#D91B1B' : '#222222', background: brand.brandId == item.brandId ? '#FFE1E1' : '#F8F8F8' }">
                    {{ item.brandName }}</view>
            </view>
            <view class="size20  tac  mt20 txtLighGray">更多4S店接洽中..</view>
            <view class="tac brandBtn" @click="bindCar">去选择4S店</view>
        </u-popup>
        <!-- 我的提问 -->
        <view class="InitiateQuestion" @click="lookMyQ">
            <view class="wenPic">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695279864019.png"
                    class="xin"></image>
                <text class="num">{{ num }}</text>
            </view>
            <view class="size24">我的提问</view>
        </view>
    </view>
</template>
<script>
import { tologin } from '@/utils/index.js';
export default {
    data() {
        return {
            leftList: [],
            rightList: [],
            infoShow: false,
            brandList: [],
            brand: {},
            index: 0,
            num: 0
        }
    },
    computed: {
        lineStyle() {
            return { transform: `translate(0, ${(176 * this.index) + 45}rpx)`, transition: '0.5s' }
        }
    },
    onLoad(option) {
        this.getBrand()
        this.getCategoryList()
        this.getMyList()
    },
    methods: {
        toQustion(value) {
            uni.navigateTo({
                url: '/pages/roadhelp/faultAbout/faultDetail',
                success: function (res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('getinfo', {
                        data: value
                    })
                }
            })
        },
        setClassify(value, index) {
            this.index = index
            this.rightList = value.questions
        },
        getCategoryList() {
            this.$request51help.post("/api/fault_common_question/category/list", { status: 1 }).then(res => {
                this.leftList = res.data
                this.rightList = res.data[0].questions
            })
        },
        getBrand() {
            this.$request.post("/coc-active/api/v1/four_s/fourSBrand", {}).then(res => {
                this.brandList = res.data
            })
        },
        bindBrand(item) {
            this.brand = item
        },
        jumpDetail(id) {
            uni.navigateTo({
                url: '/pages/carShops/4Sdetail/index?id=' + id
            })
        },
        bindCar() {
			if (tologin() !== true) {
			    return
			}
            if (this.brand.brandId) {
                this.infoShow = false
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultCheckShop?brand=" + JSON.stringify(this.brand)
                })
            } else {
                uni.$u.toast('请选择品牌')
            }
        },
        getMyList() {
            let uid = String(uni.getStorageSync("userId"))
            if (!uid) {
                this.num = 0
            } else {
                this.$request51help.post("api/club/fault_ask_list", {
                    uid: String(uni.getStorageSync("userId"))
                }).then(res => {
                    this.num = res.total
                })
            }
        },
        lookMyQ() {
            if (tologin() !== true) {
                return
            }
            if (this.num > 0) {
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultMy"
                })
            } else {
                uni.$u.toast('您还没有提问问题')
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.page {
    background: #FFFFFF;
}

.faultclassify {
    display: flex;

    &-left {
        position: relative;
        width: 200rpx;
        height: 100vh;
        border-right: 1px solid #E8E8E8;

        &-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 200rpx;
            height: 176rpx;

            &-image {
                width: 60rpx;
                height: 60rpx;
            }

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #222222;
                margin-top: 16rpx;
            }
        }

        &-line {
            position: absolute;
            top: 0;
            width: 4rpx;
            height: 50rpx;
            background: #CC201E;
            border-radius: 2rpx;
        }
    }

    &-right {
        height: 100vh;
        margin-left: 30rpx;

        &-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            height: 87rpx;

            &-title {
                display: flex;
                align-items: center;
                height: 86rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
            }

            &-line {
                width: 495rpx;
                height: 1rpx;
                background: #E8E8E8;
            }
        }

        &-question {
            position: relative;
            width: 494rpx;
            height: 176rpx;
            margin-top: 30rpx;
            padding-bottom: 200rpx;

            &-image {
                position: absolute;
                top: 0;
                width: 494rpx;
                height: 176rpx;
                background: #FFF2F2;
                border-radius: 10rpx;
            }

            &-lbtn {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 86rpx;
                left: 31rpx;
                width: 210rpx;
                height: 72rpx;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 10rpx;

                &-image {
                    width: 32rpx;
                    height: 28rpx;
                }

                &-title {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #222222;
                    margin-left: 6rpx;
                }
            }

            &-rbtn {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 86rpx;
                right: 21rpx;
                width: 210rpx;
                height: 72rpx;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 10rpx;

                &-image {
                    width: 29rpx;
                    height: 29rpx;
                }

                &-title {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #222222;
                    margin-left: 6rpx;
                }
            }
        }
    }
}

.brand {
    width: 160rpx;
    height: 66rpx;
    line-height: 66rpx;
    background: #F8F8F8;
    border-radius: 10rpx;
    box-sizing: border-box;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    font-size: 24rpx;
}

.brand:nth-child(4n) {
    margin-right: 0;
}

.brandBtn {
    margin: 50rpx auto;
    width: 330rpx;
    height: 70rpx;
    line-height: 70rpx;
    background: #D91B1B;
    border-radius: 35rpx;
    color: #fff;

}

button::after {
    border: initial;
}

.InitiateQuestion {
    position: fixed;
    bottom: 300rpx;
    right: 25rpx;
    z-index: 100;
}

.wenPic {
    position: relative;
}

.xin {
    width: 90rpx;
    height: 90rpx;
}

.num {
    position: absolute;
    width: 30rpx;
    height: 30rpx;
    border-radius: 50%;
    background-color: #D91B1B;
    color: #fff;
    font-size: 18rpx;
    text-align: center;
    line-height: 30rpx;
    top: -10rpx;
    right: 0rpx;
}
</style>