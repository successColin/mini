<template>
    <view class="page">
        <view class="faultsearch">
            <carousel :topStyle="{ width: '700rpx', 'margin-top': '20rpx' }" :radius="10" height="260rpx" urlkey="url"
                :dataType="2" systemCode="applets_problem" :indicatorType="1" />
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695122773442.png"
                class="w700h124 mt20" @click="toJiuyuan" />
            <view class="faultsearch-question">
                <image @click="Onpushdetail"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695122959250.png"
                    class="faultsearch-question-image" />
                <video :src="questionList[0].videoUrl" class="faultsearch-question-video" :autoplay="true" :loop="true"
                    :muted="true" :controls="false" objectFit='cover' @click.stop="Onpushdetail"></video>
                <view class="faultsearch-question-title">{{ questionList[0].title }}</view>
                <view class="faultsearch-question-list">
                    <view class="faultsearch-question-item">
                        <view class="faultsearch-question-item-title" @click.stop="pushtrue(questionList[1].id)">{{
                            questionList[1].title }}</view>
                    </view>
                    <view class="faultsearch-question-line" />
                    <view class="faultsearch-question-item">
                        <view class="faultsearch-question-item-title" @click.stop="pushtrue(questionList[2].id)">{{
                            questionList[2].title }}</view>
                    </view>
                    <view class="faultsearch-question-line" />
                    <view class="faultsearch-question-item">
                        <view class="faultsearch-question-item-title" @click.stop="pushtrue(questionList[3].id)">{{
                            questionList[3].title }}</view>
                    </view>
                    <view class="faultsearch-question-line" />
                    <view class="faultsearch-question-item">
                        <view class="faultsearch-question-item-title" @click.stop="pushtrue(questionList[4].id)">{{
                            questionList[4].title }}</view>
                    </view>
                </view>
            </view>
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695123473304.png"
                class="w700h124 mt17" @click="toWenti" />
            <view class="faultsearch-list">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695284629084.png"
                    class="faultsearch-image" />
                <scroll-view class="faultsearch-car" scroll-x="true">
                    <view class="u-flex">
                        <view v-for="(v, i) in brandList" :key="i"
                            :class="v.brandId === brand.brandId ? 'faultsearch-car-item' : 'faultsearch-car-unitem'"
                            @click="setBrand(v)">
                            <view
                                :class="v.brandId === brand.brandId ? 'faultsearch-car-item-title' : 'faultsearch-car-unitem-title'">
                                {{ v.brandName }}
                            </view>
                        </view>
                    </view>
                </scroll-view>
                <view class="faultsearch-shop">
                    <view v-for="(v, i) in shopList" :key="i" class="faultsearch-shop-item" @click="jumpDetail(v.shopId)">
                        <view class="faultsearch-shop-item-top">
                            <image v-if="v.brandLogo" :src="v.brandLogo" class="faultsearch-shop-item-top-logo"
                                mode="heightFix" />
                            <view class="faultsearch-shop-item-top-title">{{ v.storeAbbreviation }}</view>
                        </view>
                        <view v-if="v.doorheadPhotos && v.doorheadPhotos.length > 1" class="faultsearch-shop-item-image">
                            <image v-for="(value, index) in v.doorheadPhotos" :key="index" :src="value"
                                class="faultsearch-shop-item-small" mode="aspectFill" />
                        </view>
                        <image v-else :src="v.doorheadPhotos[0]" class="faultsearch-shop-item-big" mode="aspectFill" />
                        <view v-if="v.storeLabel && v.storeLabel.length > 0" class="u-flex mb20" >
                            <view  class="faultsearch-shop-item-label">
                                {{ v.storeLabel }}
                            </view>
                        </view>
						<view v-else style="height: 20rpx;"></view>
                        <view class="faultsearch-shop-item-bottom" >
                            <view class="u-flex alc">
                                <view class="u-flex alc" @click.stop="getLocation(v.lng, v.lat)">
                                    <image
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278317912.png"
                                        class="faultsearch-shop-item-bottom-location" />
                                    <view class="faultsearch-shop-item-bottom-title">{{ v.distanceMsg }}</view>
                                </view>
                                <view class="u-flex alc" @click.stop="getMobile(v.mobile)">
                                    <image v-if="v.mobile && v.mobile.length > 0"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278362085.png"
                                        class="faultsearch-shop-item-bottom-phone" />
                                    <view v-if="v.mobile && v.mobile.length > 0" class="faultsearch-shop-item-bottom-title">
                                        {{ v.mobile }}
                                    </view>
                                </view>
                            </view>
                            <view class="faultsearch-shop-item-bottom-btn" @click.stop="checkShop(v)">找技师</view>
                        </view>
                        <view class="faultsearch-shop-item-line" />
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
import carousel from "@/components/carousel/index.vue"
export default {
    components: { carousel },
    data() {
        return {
            brandList: [],
            brand: {},
            shopList: [],
            questionList: []
        }
    },
    onLoad(option) {
        this.getQuestionList()
        this.getBrand()
    },
    onShow() { },
    onReachBottom() { },
    methods: {
        pushtrue(id) {
            uni.navigateTo({
                url: '/pages/activity/foursvideo/index?id=' + id + '&type=2'
            })
        },
        Onpushdetail(v) {
            uni.navigateTo({
                url: '/pages/activity/foursvideo/index?id=' + this.questionList[0].id + '&type=2'
            })
        },
        toJiuyuan() {
            uni.navigateTo({
                url: "/pages/roadhelp/index"
            });
        },
        toWenti() {
            uni.navigateTo({
                url: "/pages/roadhelp/faultAbout/faultClassify"
            });
        },
        async getQuestionList() {
            const { data: { records } } = await this.$request.post('/coc-active/api/v1/video/list', {
                current: 1, size: 5,
                type: 2
            })
            console.log('records', records)
            this.questionList = records
        },
        getBrand() {
            this.$request.post("/coc-active/api/v1/four_s/fourSBrand", {}).then(res => {
                this.brandList = res.data
                this.brand = res.data[0]
                this.getList()
            })
        },
        setBrand(value) {
            this.brand = value;
            this.getList();
        },
        getList() {
            this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS", {
                brandId: this.brand.brandId,
                shopId: '0'
            }).then(res => {
                this.shopList = res.data
            })
        },
        getLocation(lng, lat) {
            uni.openLocation({
                latitude: lat,
                longitude: lng,
                success: () => { }
            })
        },
        getMobile(mobile) {
            uni.makePhoneCall({
                phoneNumber: mobile
            });
        },
        checkShop(value) {
			if (tologin() !== true) {
			    return
			}
            let item = {}
            this.brand.fourSShopVO.forEach((v) => {
                if (v.shopId === value.shopId) {
                    item = v;
                }
            })
            if (item.baseMobile) {
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultForm?shop=" + JSON.stringify(item)
                })
            } else {
                uni.showToast({
                    title: '该4S店没有售后电话,请换一家',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.faultsearch {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-question {
        position: relative;
        width: 700rpx;
        height: 370rpx;
        margin-top: 18rpx;

        &-image {
            position: absolute;
            top: 0;
            width: 700rpx;
            height: 370rpx;
        }

        &-video {
            position: absolute;
            top: 89rpx;
            left: 25rpx;
            width: 359rpx;
            height: 192rpx;
            border-radius: 10rpx;
        }

        &-title {
            position: absolute;
            width: 359rpx;
            top: 303rpx;
            left: 27rpx;
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

        &-list {
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
            top: 89rpx;
            right: 26rpx;
            width: 281rpx;
            height: 256rpx;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 10rpx;
        }

        &-item {
            display: flex;
            align-items: center;
            width: 228rpx;
            height: 63rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 40rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }
        }

        &-line {
            width: 228rpx;
            height: 1rpx;
            background: #E8E8E8;
        }
    }

    &-list {
        width: 750rpx;
        background: #FFFFFF;
        margin-top: 15rpx;
    }

    &-image {
        width: 161rpx;
        height: 31rpx;
        padding: 30rpx;
    }

    &-car {
        width: 725rpx;
        margin-left: 25rpx;

        &-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 46rpx;
            background: #FFEAEA;
            border-radius: 8rpx;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 10rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #D91B1B;
                white-space: nowrap;
            }
        }

        &-unitem {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 46rpx;
            background: #F8F8F8;
            border-radius: 8rpx;
            padding-left: 20rpx;
            padding-right: 20rpx;
            margin-right: 10rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                white-space: nowrap;
            }
        }
    }

    &-shop {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 750rpx;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);

        &-item {
            width: 700rpx;

            &-top {
                display: flex;
                align-items: center;
                height: 93rpx;

                &-logo {
                    height: 50rpx;
                    margin-right: 18rpx;
                }

                &-title {
                    font-size: 32rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #222222;
                    line-height: 27rpx;
                }
            }

            &-image {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            &-small {
                width: 226rpx;
                height: 226rpx;
                background: #2E2020;
                border-radius: 10rpx;
            }

            &-big {
                width: 700rpx;
                height: 210rpx;
                background: #2E2020;
                border-radius: 10rpx;
            }

            &-label {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 48rpx;
                background: rgba(217, 27, 27, 0.1);
                border-radius: 10rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #D91B1B;
                line-height: 27rpx;
                margin-top: 18rpx;
                padding-left: 30rpx;
                padding-right: 30rpx;
            }

            &-bottom {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin: 8rpx 0rpx 27rpx 0rpx;

                &-location {
                    width: 24rpx;
                    height: 30rpx;
                }

                &-phone {
                    width: 26rpx;
                    height: 25rpx;
                    margin-left: 19rpx;
                }

                &-title {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #222222;
                    line-height: 27rpx;
                    margin-left: 12rpx;
                }

                &-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 114rpx;
                    height: 52rpx;
                    background: #D91B1B;
                    border-radius: 10rpx;
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 27rpx;
                }
            }

            &-line {
                width: 700rpx;
                height: 1rpx;
                background: #E8E8E8;
            }
        }
    }
}

.w700h124 {
    width: 700rpx;
    height: 124rpx;
}

.mt17 {
    margin-top: 17rpx;
}

.mt20 {
    margin-top: 20rpx;
}

image {
    display: block;
}

</style>
