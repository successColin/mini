<template>
    <view class="page">
        <view v-if="list && list.length > 0" class="strolling">
            <view class="strolling-head" @click="toClick">
                <view class="df aic">
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277524227.png"
                        class="strolling-head-logo" />
                    <view class="strolling-head-title">4S店逛逛专区</view>
                </view>
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277279704.png"
                    class="strolling-head-go" />
            </view>
            <view v-for="(v, i) in list" :key="i" :class="['strolling-item', i === 0 ? '' : 'mt19']" @click="toList(v)">
                <view class="strolling-item-top">
                    <image v-if="v.brandLogo" :src="v.brandLogo" class="strolling-item-top-logo" mode="heightFix" />
                    <view class="strolling-item-top-title">{{ v.storeAbbreviation }}</view>
                </view>
                <view v-if="v.doorheadPhotos && v.doorheadPhotos.length > 1" class="strolling-item-image">
                    <image v-for="(value, index) in v.doorheadPhotos" :key="index" :src="value" class="strolling-item-small"
                        mode="aspectFill" />
                </view>
                <image v-else :src="v.doorheadPhotos[0]" class="strolling-item-big" mode="aspectFill" />
                <scroll :obj="v" />
                <view class="df">
                    <view v-if="v.storeLabel && v.storeLabel.length > 0" class="strolling-item-label">{{ v.storeLabel }}
                    </view>
                </view>
                <view class="strolling-item-bottom">
                    <view class="df aic">
                        <view class="df aic" @click.stop="getLocation(v.lng, v.lat)">
                            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278317912.png"
                                class="strolling-item-bottom-location" />
                            <view class="strolling-item-bottom-title">{{ v.distanceMsg }}</view>
                        </view>
                        <view class="df aic" @click.stop="getMobile(v.mobile)">
                            <image v-if="v.mobile && v.mobile.length > 0"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278362085.png"
                                class="strolling-item-bottom-phone" />
                            <view v-if="v.mobile && v.mobile.length > 0" class="strolling-item-bottom-title">{{ v.mobile }}
                            </view>
                        </view>
                    </view>
                    <view class="strolling-item-bottom-btn">进店</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>

import scroll from '@/pages/home/components/scroll.vue'
export default {
    components: {
        scroll
    },
    data() {
        return {
            list: []
        }
    },
    props: {},
    onLoad() { },
    onShow() { },
    created() {

        this.list = []
        this.getList({ isTopping: 1 })
        uni.$on('updatedata', () => {
            this.list = []
            this.getList({ isTopping: 1 })
        })
    },
    destroyed() {
        uni.$off('updatedata')
    },
    methods: {
        async getList(params) {
            const { data } = await this.$request.post('/coc-active/api/v2/homePage/four_s/nearbyShopS', params)
            if (data.length > 0) {
                this.list = this.list.concat(data)
            } else if (params.isTopping === 1) {
                this.getList({ isTopping: 0, number: 2 })
            }
        },
        toClick() {
            uni.navigateTo({
                url: '/pages/carShops/4sShop/index'
            })
        },
        toList(value) {
            uni.navigateTo({
                url: '/pages/carShops/4Sdetail/index?id=' + value.shopId
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
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
}

.strolling {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750rpx;
        height: 93rpx;

        &-logo {
            width: 33rpx;
            height: 26rpx;
            margin-left: 25rpx;
        }

        &-title {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 40rpx;
            margin-left: 10rpx;
        }

        &-go {
            width: 10rpx;
            height: 16rpx;
            margin-right: 24rpx;
        }
    }

    &-item {
        width: 700rpx;
        // height: 603rpx;
        background: #FFFFFF;
        border-radius: 10rpx;

        &-top {
            display: flex;
            align-items: center;
            height: 93rpx;
            margin-left: 29rpx;

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
            margin-left: 27rpx;
            margin-right: 25rpx;
        }

        &-small {
            width: 210rpx;
            height: 210rpx;
            background: #2E2020;
            border-radius: 10rpx;
        }

        &-big {
            width: 650rpx;
            height: 210rpx;
            background: #2E2020;
            border-radius: 10rpx;
            margin-left: 27rpx;
        }

        &-middle {
            height: 150rpx;

            &-left {
                display: flex;
                align-items: center;
                height: 50rpx;

                &-image {
                    width: 29rpx;
                    height: 29rpx;
                }

                &-title {
                    width: 250rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #222222;
                    line-height: 40rpx;
                    margin-left: 12rpx;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 1;
                    overflow: hidden;
                }
            }

            &-right {
                display: flex;
                align-items: center;

                &-image {
                    width: 27rpx;
                    height: 27rpx;
                    margin-right: 8rpx;
                }

                &-image2 {
                    width: 27rpx;
                    height: 28rpx;
                    margin-right: 8rpx;
                }

                &-title {
                    font-size: 20rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #D91B1B;
                    line-height: 40rpx;
                }

                &-money {
                    font-size: 28rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #D91B1B;
                    line-height: 40rpx;
                    margin-left: 8rpx;
                    margin-right: 5rpx;
                }
            }
        }

        &-scroll {
            height: 150rpx;
            margin-top: 14rpx;
            margin-left: 26rpx;
            margin-right: 27rpx;
            background: red;
            overflow: hidden;
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
            margin-left: 27rpx;
            margin-top: 8rpx;
            padding-left: 30rpx;
            padding-right: 30rpx;
        }

        &-bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 8rpx 25rpx 24rpx 29rpx;

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
                width: 100rpx;
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
    }

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

.mt19 {
    margin-top: 19rpx;
}

.h100 {
    height: 100%;
}
</style>
