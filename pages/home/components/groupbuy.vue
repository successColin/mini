<template>
    <view class="page">
        <view class="groupbuy" @click="toClick">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694481025611.png"
                class="groupbuy-image" />
            <scroll-view class="groupbuy-goods" scroll-x="true">
                <view class="u-flex">
                    <view v-for="(v, i) in list" :key="i"
                        :class="['groupbuy-goods-item', (list.length - 1) === i ? 'pr20' : '']" @click.stop="toList(v)">
                        <image :src="v.coverPicture" mode="aspectFill" class="groupbuy-goods-item-image">
                        </image>
                        <view class="groupbuy-goods-item-title">{{ v.title }}</view>
                        <view class="df mt10">
                            <view class="groupbuy-goods-item-money">￥</view>
                            <view class="groupbuy-goods-item-money2">{{ v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice
                            }}
                            </view>
                            <view class="groupbuy-goods-item-money3">￥{{ v.marketPrice }}</view>
                        </view>
                        <view v-if="v.activityPaymentPreferenceId === 4" class="groupbuy-goods-item-image-title">人保优惠</view>
                        <view v-else-if="v.activityPaymentPreferenceId === 5" class="groupbuy-goods-item-image-title">农行优惠
                        </view>
                        <view v-else-if="v.activityPaymentPreferenceId === 6" class="groupbuy-goods-item-image-title">工行优惠
                        </view>
                        <view v-else-if="v.activityPaymentPreferenceId === 10" class="groupbuy-goods-item-image-title">官方优惠
                        </view>
                        <view v-else-if="v.activityPaymentPreferenceId === 7" class="groupbuy-goods-item-image-title">邮储优惠
                        </view>
                        <view v-else-if="v.activityPaymentPreferenceId === 8" class="groupbuy-goods-item-image-title">民生优惠
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            list: []
        }
    },
    props: {},
    onLoad() { },
    onShow() { },
    created() {
        this.getList()
        uni.$on('updatedata', () => {
            this.getList()
        })
    },
    destroyed() {
        uni.$off('updatedata')
    },
    methods: {
        toClick() {
            uni.navigateTo({
                url: "/pages/grouppurchase/index?type=1"
            })
        },
        toList(value) {
            uni.navigateTo({
                url: "/pages/grouppurchase/detail?id=" + value.id
            })
        },
        async getList() {
            const { data } = await this.$request.post('/coc-active/api/v1/group/list/top')
            this.list = data
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
    height: 353rpx;
}

.groupbuy {
    position: absolute;
    width: 700rpx;

    &-image {
        width: 700rpx;
        height: 353rpx;
    }

    &-goods {
        position: absolute;
        top: 10rpx;
        left: 186rpx;
        width: 505rpx;
        height: 333rpx;
        background: #FFFFFF;
        border-radius: 10rpx;

        &-item {
            margin-left: 20rpx;
            margin-top: 13rpx;

            &-image {
                width: 180rpx;
                height: 180rpx;
                background: #FF2215;
                border-radius: 10rpx;

                &-title {
                    position: absolute;
                    top: 13rpx;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 96rpx;
                    height: 34rpx;
                    background: linear-gradient(132deg, #FA5151 0%, #D91B1B 100%);
                    border-radius: 10rpx 0rpx 10rpx 0rpx;
                    font-size: 20rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #FFFFFF;
                    line-height: 36rpx;
                }
            }

            &-title {
                width: 180rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-top: 6rpx;
            }

            &-money {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #D91B1B;
                line-height: 36rpx;
            }

            &-money2 {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #D91B1B;
                line-height: 36rpx;
            }

            &-money3 {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #999999;
                line-height: 36rpx;
                margin-left: 13rpx;
            }
        }
    }


}

.df {
    display: flex;
}

.mt10 {
    margin-top: 10rpx;
}

.pr20 {
    padding-right: 20rpx;
}
</style>
