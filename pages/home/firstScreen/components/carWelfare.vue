<template>
    <view>
        <Currency :head="head">
            <swiper class="list" slot="list" :style="{ height: swiperHeight + 'px' }" circular @change="change">
                <swiper-item v-for="(v, i) in list" :key="i">
                    <view :id="`swiper${i}`" class="item" @click="toClick(v)">
                        <view class="item-top">
                            <image :src="v.coverPicture" class="item-top-image" />
                            <view class="item-top-label">{{ v.timeStr }}</view>
                        </view>
                        <view class="item-title">{{ v.title }}</view>
                        <view class="item-bottom">
                            <view class="item-flex">
                                <view v-for="(value, index) in v.groupTeamSetMealPrice" :key="index" class="item-flex">
                                    <view>
                                        <view class="item-bottom-title">{{ value.groupTeamNum }}人成团:</view>
                                        <view class="item-flex">
                                            <view class="item-bottom-symbol">￥</view>
                                            <view class="item-bottom-money">{{ value.flashSalePrice }}</view>
                                        </view>
                                    </view>
                                    <view
                                        v-if="index !== v.groupTeamSetMealPrice.length - 1"
                                        class="item-bottom-line"
                                    />
                                </view>
                            </view>
                            <view class="item-pr">
                                <image
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705473520654.png"
                                    class="item-bottom-image"
                                />
                                <view class="item-bottom-residue">
                                    仅剩
                                    <text class="item-bottom-number">{{ v.stock - v.saleNum }}</text>
                                    份
                                </view>
                                <view class="item-bottom-group">
                                    <view v-if="v.productStatus === 1" class="item-bottom-group-title">未开始</view>
                                    <view v-else-if="v.productStatus === 2" class="item-bottom-group-title"
                                        >去拼团</view
                                    >
                                    <view v-else-if="v.productStatus === 3" class="item-bottom-group-title"
                                        >去抢购</view
                                    >
                                    <view v-else-if="v.productStatus === 4" class="item-bottom-group-title"
                                        >已结束</view
                                    >
                                    <view class="item-bottom-group-image">
                                        <u-icon name="arrow-right" color="#FFFFFF" size="6" />
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </swiper-item>
            </swiper>
        </Currency>
    </view>
</template>
<script>
import Currency from "./currency.vue";
export default {
    options: {
        styleIsolation: "shared",
    },
    components: { Currency },
    data() {
        return {
            head: {
                image: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705455805557.png",
                title: "惊喜天天有",
                url: "/pages/groupBooking/groupList",
            },
            list: [],
            swiperHeight: 0,
        };
    },
    created() {
        this.init();
        uni.$on("updatedata", () => {
            this.init();
        });
    },
    destroyed() {
        uni.$off("updatedata");
    },
    methods: {
        init() {
            this.getList();
        },
        async getList() {
            const { data } = await this.$request.post("/coc-active/api/v1/adv/space/getAdvGroupTeam");
            this.list = data;
            this.$nextTick(() => {
                this.getQuery(0);
            });
        },
        toClick(value) {
            uni.navigateTo({
                url: "/pages/groupBooking/detail?id=" + value.id,
            });
        },
        change({ detail: { current } }) {
            this.getQuery(current);
        },
        getQuery(current) {
            let query = uni
                .createSelectorQuery()
                .in(this)
                .select("#swiper" + current);
            query
                .boundingClientRect((data) => {
                    this.swiperHeight = data.height;
                })
                .exec();
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .currency-top-image {
    width: 155rpx;
}
.list {
    white-space: nowrap;
}
.item {
    display: inline-block;
    margin: 0 10rpx;
    &-flex {
        display: flex;
    }
    &-pr {
        position: relative;
    }
    &-top {
        position: relative;
        width: 710rpx;
        height: 405rpx;
        &-image {
            display: block;
            width: 710rpx;
            height: 405rpx;
            border-radius: 10rpx;
        }
        &-label {
            position: absolute;
            top: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 52rpx;
            background: #e43e3e;
            border-radius: 10rpx 0 10rpx 0;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            line-height: 40rpx;
            padding: 0 10rpx;
        }
    }
    &-title {
        width: 710rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 13rpx 0 0;
    }
    &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 13rpx 0 20rpx;
        &-title {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            line-height: 20rpx;
        }
        &-symbol {
            font-size: 20rpx;
            font-family: HONOR Sans CN;
            font-weight: 500;
            color: #d91b1b;
            line-height: 16rpx;
            margin-top: 19rpx;
        }
        &-money {
            font-size: 36rpx;
            font-family: HONOR Sans CN;
            font-weight: 500;
            color: #d91b1b;
            line-height: 28rpx;
            margin-top: 7rpx;
        }
        &-line {
            width: 2rpx;
            height: 30rpx;
            background: #6a6a6a;
            margin: 9rpx 20rpx 0 18rpx;
        }
        &-image {
            width: 285rpx;
            height: 54rpx;
        }
        &-residue {
            position: absolute;
            top: 9rpx;
            left: 14rpx;
            display: flex;
            align-items: center;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #d91b1b;
            line-height: 36rpx;
        }
        &-number {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d91b1b;
            line-height: 36rpx;
        }
        &-group {
            position: absolute;
            top: 9rpx;
            right: 11rpx;
            display: flex;
            align-items: center;
            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 36rpx;
            }
            &-image {
                margin-left: 6rpx;
            }
        }
    }
}
swiper {
    height: 100%;
}

::v-deep .currency-list {
    width: 730rpx !important;
    margin: 0 !important;
}
</style>
