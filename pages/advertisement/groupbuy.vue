<template>
    <view class="groupbuy">
        <view v-for="(v, i) in rows.list" :key="i" class="item" @click="toDetails(v)">
            <image :src="v.coverPicture" class="item-image" />
            <view class="flex jsb">
                <view class="flex">
                    <view class="item-symbol">￥</view>
                    <view class="item-integer">{{ v.bankCardPrice ? getMoney(v.bankCardPrice, 0) :
                        getMoney(v.flashSalePrice,
                            0) }}</view>
                    <view class="item-decimal">{{ v.bankCardPrice ? getMoney(v.bankCardPrice, 1) :
                        getMoney(v.flashSalePrice,
                            1) }}</view>
                    <view class="item-price">{{ params.tag === 6 ? '市场价' : 'M团价' }}:{{ v.marketPrice }}</view>
                </view>
                <view class="item-number">已售:{{ v.saleNum }}份</view>
            </view>
            <view class="item-title">{{ v.title }}</view>
            <view class="item-shop">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698629497831.png"
                    class="item-shop-image" />
                <view class="item-shop-title">{{ v.baseName }}</view>
            </view>
            <view class="item-line" />
            <view class="flex jsb">
                <view class="flex">
                    <view class="item-collect">
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698629557647.png"
                            class="item-collect-image" />
                        <view class="item-collect-title">收藏</view>
                    </view>
                    <view class="item-forward">
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698629589468.png"
                            class="item-forward-image" />
                        <view class="item-forward-title">转发</view>
                    </view>
                </view>
                <view class="item-btn">立即抢购</view>
            </view>
        </view>
        <view v-if="bottom_status" class="groupbuy-bottom">我到底啦~</view>
        <float v-if="params.tag" :tag="params.tag" />
        <view class="safe-bottom-height" />
    </view>
</template>

<script>
import float from '@/components/float/index.vue'
export default {
    components: {
        float
    },
    data() {
        return {
            rows: {
                list: [],
                total: 0
            },
            params: {
                current: 1,
                size: 10,
                tag: 0
            }
        }
    },
    onLoad(option) {
        uni.setNavigationBarTitle({
            title: option.title,
        });
        this.params.tag = option.tag * 1
        this.params.relId = option.id * 1
        this.params.type = option.type * 1
        this.getList()
    },
    created() { },
    onReachBottom() {
        if (this.rows.total > this.params.current * this.params.size) {
            this.params.current += 1
            this.getList()
        } else {
            this.bottom_status = true
        }
    },
    methods: {
        async getList() {
            const { data: { records, total } } = await this.$request.post('/coc-active/api/v2/homePage/productDetails', this.params)
            const list = JSON.parse(JSON.stringify(this.rows.list))
            records.forEach((v) => {
                list.push(v)
            })
            this.rows.list = list
            this.rows.total = total
        },
        getMoney(value, index) {
            let number = ''
            if (typeof value === 'number') {
                let list = value.toString().split('.')
                if (list.length > 1 && index === 0) {
                    number = list[index] + '.'
                } else {
                    number = list[index] || ''
                }
            }
            return number
        },
        toDetails(value) {
            // 2.优惠团购 6.保养套餐 15.海量游乐; relatedType: 达人推荐用的
            const list = [
                {
                    id: 2,
                    relatedType: 4,
                    url: '/pages/grouppurchase/detail'
                },
                {
                    id: 6,
                    relatedType: 2,
                    url: '/pages/carShops/upkeep/detail'
                },
                {
                    id: 15,
                    relatedType: 5,
                    url: '/pages/grouppurchase/packagedetail'
                }
            ]
            let url = '',relatedType = null;
            list.forEach((v) => {
                if (v.id === this.params.tag) {
                    url = v.url
                    relatedType = v.relatedType
                }
            })
            if (url.length > 0) {
                uni.navigateTo({
                    url: url + '?id=' + value.relId + '&relatedType=' + relatedType
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.groupbuy {
    padding-top: 15rpx;

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}

.item {
    width: 730rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    margin-left: 10rpx;
    margin-right: 10rpx;
    margin-top: 10rpx;
    padding-top: 5rpx;

    &-image {
        width: 710rpx;
        height: 710rpx;
        border-radius: 10rpx;
        margin-left: 10rpx;
        margin-right: 10rpx;
        margin-top: 5rpx;
        margin-bottom: 2rpx;
        object-fit: cover;
    }

    &-symbol {
        font-size: 24rpx;
        font-family: HONOR Sans CN;
        font-weight: 500;
        color: #D91B1B;
        margin-top: 27rpx;
        margin-left: 10rpx;
    }

    &-integer {
        font-size: 44rpx;
        font-family: HONOR Sans CN;
        font-weight: bold;
        color: #D91B1B;
        margin-top: 9rpx;
        margin-left: 4rpx;
    }

    &-decimal {
        font-size: 32rpx;
        font-family: HONOR Sans CN;
        font-weight: bold;
        color: #D91B1B;
        margin-top: 20rpx;
    }

    &-price {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        text-decoration: line-through;
        color: #999999;
        margin-top: 28rpx;
        margin-left: 15rpx;
    }

    &-number {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-top: 28rpx;
        margin-right: 10rpx;
    }

    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-left: 10rpx;
        margin-right: 10rpx;
        margin-top: 14rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }



    &-shop {
        display: flex;
        align-items: center;
        margin-top: 20rpx;

        &-image {
            width: 26rpx;
            height: 26rpx;
            margin-left: 10rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            margin-left: 11rpx;
        }
    }

    &-line {
        width: 710rpx;
        height: 1rpx;
        background: #E8E8E8;
        margin-top: 16rpx;
    }

    &-collect {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 106rpx;
        margin-left: 11rpx;

        &-image {
            width: 44rpx;
            height: 44rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-top: 7rpx;
        }
    }

    &-forward {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 106rpx;
        margin-left: 29rpx;

        &-image {
            width: 44rpx;
            height: 44rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-top: 7rpx;
        }
    }

    &-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 162rpx;
        height: 54rpx;
        background: linear-gradient(-59deg, rgba(217, 27, 27, 0.95), rgba(255, 114, 101, 0.95));
        border-radius: 27rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 36rpx;
        margin-top: 26rpx;
        margin-right: 11rpx;
    }
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
