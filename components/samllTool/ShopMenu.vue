<template>
    <div class="shopMenu">
        <div @click="handleJumpShop">
            <div class="shopMenu__title">
                <div>{{ item.baseName }}</div>
                <div>{{ item.distanceMsg }}</div>
            </div>
            <!-- <div class="shopMenu__rate">
        <u-rate :value="item.star" readonly></u-rate>
      </div> -->
            <view class="flex alc shopMenu__rate" style="color: #d91b1b">
                <image
                    v-for="(item, i) in item.star"
                    :key="i"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698717060730.png"
                    style="width: 24rpx; height: 24rpx; margin-right: 5rpx"
                ></image>
                <text style="margin-left: 5rpx; font-size: 24rpx; font-weight: 400">{{ item.starStr }}</text>

                <div class="shopMenu__cooperationBtn" v-if="cooperation"></div>
            </view>
            <div class="shopMenu__tips" v-if="!!item.storeLabelMsg">
                <div v-for="(v, i) in item.storeLabelMsg" :key="i">
                    {{ v }}
                </div>
            </div>
        </div>
        <div class="shopMenu__line"></div>
        <div class="shopMenu__pro" v-for="(v, i) in allPriceArr" :key="i" @click="handleJumpProduct(v)">
            <image mode="aspectFill" :src="v.coverPicture" />
            <div class="shopMenu__pro--dec">
                <div class="shopMenu__pro--title moreLine">
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699862542023.png" />
                    {{ v.title }}
                </div>
                <div class="shopMenu__pro--tips" v-if="tagArr(v.tagNamesMsg) !== 0">
                    <div>
                        <div v-for="(j, i) in tagArr(v.tagNamesMsg)" :key="i">
                            {{ j }}
                        </div>
                    </div>
                </div>
                <div class="shopMenu__pro--price">
                    <div class="shopMenu__pro--price--left">
                        <span>￥</span>
                        <span>{{ favorablePrice(v)[0] }}</span>
                        <span v-if="favorablePrice(v)[1]">.{{ favorablePrice(v)[1] }}</span>

                        <!-- 单价 -->
                        <div v-if="v.i === 2">市场价￥{{ v.specialPrice || v.marketPrice }}</div>
                        <!-- 团购价 -->
                        <div v-else-if="v.i === 1">市场价￥{{ v.marketPrice }}</div>
                        <!-- 活动价 -->
                        <div v-else-if="v.i === 0 && v.shopId !== 2">市场价￥{{ v.marketPrice }}</div>
                    </div>

                    <div class="shopMenu__pro--price--right" v-if="flashSale">
                        <image
                            mode="aspectFill"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699853590879.png"
                        />
                    </div>
                </div>
            </div>
        </div>
        <view v-if="allPriceArr.length === 0" class="flex mt20" style="margin-left: -7rpx" @click="handleJumpShop">
            <scroll-view scroll-x="true">
                <view style="display: flex">
                    <view v-for="(item1, index1) in item.doorheadPhotoMsg" :key="index1" style="margin-right: 10rpx">
                        <image
                            :src="item1"
                            style="margin-right: 7rpx; width: 223rpx; height: 160rpx; border-radius: 10rpx"
                        >
                        </image>
                    </view>
                </view>
            </scroll-view>
        </view>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => {},
        },
        flashSale: {
            type: Boolean,
            default: true,
        },
        cooperation: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {};
    },
    components: {},
    computed: {
        tagArr() {
            return function (v) {
                console.log(v);
                if (!!!v) return [];
                return v.filter(function (s) {
                    return s && s.trim();
                });
            };
        },
        favorablePrice() {
            return function (v) {
                let num = "";
                if (v.i === 2) {
                    num = v.flashSalePrice;
                } else {
                    num = v.specialPrice || v.flashSalePrice;
                }
                return String(num)?.split(".") || [];
            };
        },
        allPriceArr() {
            const arr = [];
            const { shopActivityVO, shopGroupPurchaseProductVO, shopMerchantMealVO } = this.item;
            // 0：活动 1：团购 2：单品
            if (shopActivityVO) {
                shopActivityVO.forEach((item) => {
                    item.i = 0;
                });
                arr.push(...shopActivityVO);
            }
            if (shopGroupPurchaseProductVO) {
                shopGroupPurchaseProductVO.forEach((item) => {
                    item.i = 1;
                });
                arr.push(...shopGroupPurchaseProductVO);
            }
            if (shopMerchantMealVO) {
                shopMerchantMealVO.forEach((item) => {
                    item.i = 2;
                });
                arr.push(...shopMerchantMealVO);
            }
            return arr.slice(0, 2);
        },
    },
    watch: {},
    mounted() {},
    methods: {
        handleJumpShop() {
            console.log(this.item);
            uni.navigateTo({
                url: "/pages/activityMall/business/index?id=" + this.item.shopId,
            });
        },
        handleJumpProduct(v) {
            console.log(v);
            // 0：活动 1：团购 2：单品
            if (v.i === 0) {
                uni.navigateTo({
                    url: "/pages/home/activityDetail/index?id=" + v.activityId,
                });
            } else if (v.i === 1) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/detail?id=" + v.groupPurchaseProductId,
                });
            } else if (v.i === 2) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/packagedetail?id=" + v.merchantMealId,
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.shopMenu {
    &__cooperationBtn {
    }
    &__title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFang SC;
        & > div:nth-child(1) {
            font-size: 32rpx;
            font-weight: bold;
            color: #222222;
        }
        & > div:nth-child(2) {
            font-size: 24rpx;
            font-weight: 500;
            color: #999999;
        }
    }
    &__rate {
        margin-top: 10rpx;
    }
    &__tips {
        margin-top: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d91b1b;
        padding: 8rpx 12rpx;
        background: rgba(217, 27, 27, 0.1);
        border-radius: 10rpx;
        width: fit-content;
    }
    &__line {
        width: 100%;
        height: 1rpx;
        background: #e8e8e8;
        margin-top: 20rpx;
    }
    &__pro {
        display: flex;
        margin-top: 20rpx;
        & > image {
            width: 230rpx;
            height: 230rpx;
            background: #ff3b3b;
            border-radius: 10rpx;
            margin-right: 20rpx;
        }
        &--dec {
            flex: 1;
            display: flex;
            flex-direction: column;
        }
        &--title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            image {
                width: 65rpx;
                height: 35rpx;
                position: relative;
                top: 6rpx;
                margin-right: 6rpx;
            }
        }
        &--tips {
            display: flex;
            margin-top: 20rpx;
            flex: 1;
            & div > {
                div {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #d91b1b;
                    padding: 8rpx 10rpx;
                    background: rgba(217, 27, 27, 0.1);
                    border-radius: 10rpx;
                    margin-right: 12rpx;
                    display: inline-block;
                }
                div:last-child {
                    margin-right: 0;
                }
            }
        }
        &--price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            // flex-flow: wrap-reverse;
            &--left {
                font-size: 36rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #d91b1b;
                display: flex;
                align-items: baseline;
                span {
                    font-size: 28rpx;
                }
                & > div {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    text-decoration: line-through;
                    color: #999999;
                    margin-left: 10rpx;
                }
            }
            &--right {
                image {
                    width: 143rpx;
                    height: 53rpx;
                }
            }
        }
    }
}
</style>
