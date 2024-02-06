<template>
    <view class="page">
        <!-- <view class="faultclassify">
            <scroll-view class="faultclassify-left" scroll-y="true">
                <view v-for="(v, i) in leftList" :key="i" class="faultclassify-left-item" @click="setClassify(v, i)">
                    <view class="faultclassify-left-item-title">{{ v.brandName }}</view>
                </view>
                <view class="faultclassify-left-line" :style="[lineStyle]" />
            </scroll-view>
            <scroll-view class="faultclassify-right" scroll-y="true">
                <view v-for="(v, i) in rightList" :key="i" class="faultclassify-right-item" @click="toQustion(v)">
                    <view class="faultclassify-right-item-title">{{ v.baseName }}</view>
                    <view class="faultclassify-right-item-line" />
                </view>
                <view class="h200" />
            </scroll-view>
        </view> -->
        <search :fromType="'保养预约'" :isIcon="0" :isBgf="true" @search="search"></search>
        <view style="margin: 0 25rpx  50rpx;">
            <shopList :fromPage="isnew?'home_baoyang':'baoyang'" :title="title"></shopList>
        </view>
    </view>
</template>
<script>
import search from "@/components/search/index.vue"
import shopList from "@/components/shopList/index.vue"
export default {
    components: {
        shopList, search
    },
    data() {
        return {
            leftList: [],
            rightList: [],
            infoShow: false,
            brandList: [],
            brand: {},
            index: 0,
            title: '',
			isnew: false //true：首页保养预约页面  false：4s店逛逛保养页面
        }
    },
    computed: {
        lineStyle() {
            return { transform: `translate(0, ${(100 * this.index) + 25}rpx)`, transition: '0.5s' }
        }
    },
    onLoad(option) {
		if (option.isnew) {
			this.isnew = true
		}
        this.getBrand()
    },
    methods: {
        search(msg) {
            this.title = msg
        },
        toQustion(value) {
			uni.navigateTo({
				url: "/pages/upkeep/bookingForm?shopId=" + value.shopId + '&brandId=' + this.brand.brandId
			});
        },
        setClassify(value, index) {
            this.index = index
            this.brand = value
            this.rightList = value.fourSShopVO
        },
        getBrand() {
            this.$request.post("/coc-active/api/v1/four_s/fourSBrand", {}).then(res => {
                this.leftList = res.data
                this.rightList = res.data[0].fourSShopVO
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.page {
    // background: #FFFFFF;
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
            height: 100rpx;

            &-image {
                width: 60rpx;
                height: 60rpx;
            }

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #222222;
                // margin-top: 16rpx;
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
        margin-left: 30rpx;
        height: 100vh;

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

.h200 {
    width: 100rpx;
    height: 200rpx;
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
</style>