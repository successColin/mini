<template>
    <view class="page">
        <swiper v-if="newCarList.length > 0" class="scroll" :vertical="true" :autoplay="true" :circular="true"
            :interval="5000" :duration="1000">
            <swiper-item v-for="(v, i) in newCarList" :key="i" class="scroll-item">
                <view class="df jcsb">
                    <view class="scroll-item-left">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277696663.png"
                            class="scroll-item-left-image" />
                        <view class="scroll-item-left-title">{{ v.vehicleName }}</view>
                    </view>
                    <view class="scroll-item-right">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693277935696.png"
                            class="scroll-item-right-image2" />
                        <view class="df">
                            <view class="scroll-item-right-title">限时优惠</view>
                            <view class="scroll-item-right-money">{{ v.bankCardPrice || v.discount }}</view>
                            <view class="scroll-item-right-title">元</view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <swiper v-if="maintenanceList.length > 0" class="scroll" :vertical="true" :autoplay="true" :circular="true"
            :interval="5000" :duration="1000">
            <swiper-item v-for="(v, i) in maintenanceList" :key="i" class="scroll-item">
                <view class="df jcsb">
                    <view class="scroll-item-left">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278143504.png"
                            class="scroll-item-left-image" />
                        <view class="scroll-item-left-title">{{ v.vehicleName }}</view>
                    </view>
                    <view class="scroll-item-right">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693533200720.png"
                            class="scroll-item-right-image" />
                        <view class="df">
                            <view class="scroll-item-right-title">工行特惠价:</view>
                            <view class="scroll-item-right-money">{{ v.bankCardPrice || v.discount }}</view>
                            <view class="scroll-item-right-title">元</view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <swiper v-if="activityList.length > 0" class="scroll" :vertical="true" :autoplay="true" :circular="true"
            :interval="5000" :duration="1000">
            <swiper-item v-for="(v, i) in activityList" :key="i" class="scroll-item">
                <view class="df jcsb">
                    <view class="scroll-item-left">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278221246.png"
                            class="scroll-item-left-image" />
                        <view class="scroll-item-left-title">{{ v.vehicleName }}</view>
                    </view>
                    <view v-if="v.activityPaymentPreferenceId !== 0" class="scroll-item-right">
                        <image :src="v.bankImage" class="scroll-item-right-image" />
                        <view class="df">
                            <view class="scroll-item-right-title">{{ v.bankName }}特惠价:</view>
                            <view class="scroll-item-right-money">{{ v.bankCardPrice || v.discount }}</view>
                            <view class="scroll-item-right-title">元</view>
                        </view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
    props: {
        obj: {
            type: Object,
            default: {}
        }
    },
    computed: {
        newCarList() {
            return this.obj.vehicleInfoVOS || []
        },
        maintenanceList() {
            return this.obj.mealVOS || []
        },
        activityList() {
            const list = this.obj.activityVOS || []
            list.forEach((v) => {
                if (v.activityPaymentPreferenceId === 4) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693533161813.png'
                    v.bankName = '人保'
                } else if (v.activityPaymentPreferenceId === 5) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693533183352.png'
                    v.bankName = '农行'
                } else if (v.activityPaymentPreferenceId === 6) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693533200720.png'
                    v.bankName = '工行'
                } else if (v.activityPaymentPreferenceId === 7) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278251759.png'
                    v.bankName = '邮储'
                } else if (v.activityPaymentPreferenceId === 8) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693533103514.png'
                    v.bankName = '民生'
                } else if (v.activityPaymentPreferenceId === 10) {
                    v.bankImage = 'https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278180893.png'
                    v.bankName = '官方'
                }
            })
            return list
        }
    },
    created() { },
    destroyed() { },
    methods: {}
}
</script>

<style lang="scss" scoped>
.page {
    height: 100%;
}

.scroll {
    height: 50rpx;
    // margin-top: 14rpx;
    margin-left: 26rpx;
    margin-right: 27rpx;
    overflow: hidden;

    &-item {
        height: 50rpx;

        &-left {
            display: flex;
            align-items: center;
            height: 50rpx;

            &-image {
                width: 29rpx;
                height: 29rpx;
            }

            &-title {
                width: 280rpx;
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
}

.df {
    display: flex;
}

.jcsb {
    justify-content: space-between;
}

.h100 {
    height: 100%;
}
</style>