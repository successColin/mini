<template>
    <view class="goods">
        <view class="h23" />
        <sorts :list="sortlist" :preview="preview" :edit="edit" @click="setSort" />
        <view class="h15" />
        <tabs :list="tablist" @click="setTabList" />
        <scroll-view :class="release === '1' ? 'h70vh' : 'h73vh'" scroll-y="true" @scrolltolower="onScrollToLower">
            <view class="goods-shop">
                <view v-for="(v, i) in list" :key="i" class="goods-shop-item" @click="setList(v)">
                    <view v-if="edit&&release=='0'" @click.stop="setSelectList(v)">
                        <image v-if="v.select"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692255763089.png"
                            class="goods-shop-item-selected" />
                        <image v-else
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692255786059.png"
                            class="goods-shop-item-selected" />
                    </view>
                    <image :src="v.coverPicture" :class="['goods-shop-item-image', v.status === 2 ? 'is-expire' : '']" />
                    <view>
                        <view :class="edit ? 'w435h173' : 'w504h173'">
                            <view :class="['goods-shop-item-name', v.status === 2 ? 'c99999' : '']">
                                {{ v.relatedName }}
                            </view>
                            <view v-if="preview !== '1'" class="df mt15 mb7">
                                <view :class="['goods-shop-item-treetop', v.status === 2 ? 'c99999 bgcCCCCCC' : '']">
                                    {{ v.type_txt }}
                                </view>
                                <view :class="['goods-shop-item-red', v.status === 2 ? 'c99999' : '']">¥{{ v.bankCardPrice
                                    || v.flashSalePrice
                                }}
                                </view>
                                <view class="goods-shop-item-grey">¥{{ v.marketPrice }}</view>
                            </view>
                            <view v-if="v.shopName" class="goods-shop-item-business" @click.stop="toShop(v)">
                                <view :class="['goods-shop-item-business-title', v.status === 2 ? 'c99999' : '']">{{
                                    v.shopName.length > 10 ? v.shopName.substring(0, 10) + '...' : v.shopName
                                }}
                                </view>
                                <view v-if="v.shopId !== 1"
                                    :class="['goods-shop-item-business-black', v.status === 2 ? 'c99999' : '']">进店</view>
                                <image v-if="v.shopId !== 1" src="@/static/image/vector.svg"
                                    :class="['w6h12', v.status === 2 ? 'is-expire' : '']" />
                            </view>
                            <view v-if="preview !== '1'" class="goods-shop-item-order">
                                <view class="goods-shop-item-order-title">¥{{ v.commissionPrice }}/单</view>
                                <view class="goods-shop-item-order-title2">{{ v.rate }}%佣金率</view>
                                <view class="goods-shop-item-order-title3">已带货{{ v.expertSaleCount }}份</view>
                            </view>
                        </view>
                        <view class="df aic jcsb h100">
                            <view v-if="preview !== '1'" class="goods-shop-item-money">
                                <view :class="['goods-shop-item-money-title', v.status === 2 ? 'is-expire' : '']">¥</view>
                                <view :class="['goods-shop-item-money-title2', v.status === 2 ? 'is-expire' : '']">
                                    {{ v.expertEarnedCommission }}
                                </view>
                                <view :class="['goods-shop-item-money-title', v.status === 2 ? 'is-expire' : '']">共赚</view>
                            </view>
                            <view v-else class="goods-shop-item-money">
                                <view class="goods-shop-item-money-title">¥</view>
                                <view class="goods-shop-item-money-title2">{{ v.bankCardPrice || v.flashSalePrice }}</view>
                                <view class="goods-shop-item-money-title3">¥{{ v.marketPrice }}</view>
                            </view>
                            <view v-if="v.status === 2" class="goods-shop-item-expire">已失效</view>
                            <view v-else class="goods-shop-item-add" @click.stop="toCommerce(v)">去带货</view>
                        </view>
                    </view>
                </view>
                <view v-if="list.length === 0">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170147023.png"
                        class="goods-shop-empty" />
                </view>
            </view>
        </scroll-view>
        <view :class="edit && release === '0' ? 'h147' : 'h0'" />
    </view>
</template>

<script>
import sorts from '@/pages/wiseman/darenxiaodian/components/sorts.vue'
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue'
export default {
    components: {
        sorts,
        tabs
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            },
        },
        preview: {
            type: String,
            default() {
                return '0';
            },
        },
        edit: {
            type: Boolean,
            default() {
                return false;
            },
        },
        release: {
            type: String,
            default() {
                return '';
            }
        },
        userId: {
            type: String,
            default() {
                return '';
            }
        }
    },
    data() {
        return {
            sortlist: [
                { id: 1, title: '销量', status: 0 },
                { id: 3, title: '价格', status: 0 },
                { id: 5, title: '佣金率', status: 0 }
            ],
            sort: null,
            tablist: [
                { id: 0, name: '全部', status: true },
                { id: 1, name: '市场活动', status: false },
                { id: 2, name: '保养特惠', status: false },
                { id: 3, name: '救援年卡', status: false },
            ],
            tab: null,
            current: 0
        }
    },
    onLoad() { },
    onShow() { },
    created() {
        this.getTabList()
    },
    methods: {
        isPreview() {
            if (this.preview === '1') {
                throw Error('')
            }
        },
        async getTabList() {
            const { data } = await this.$request.post('/coc-active/api/v1/expert/selection/library/shopCategoryList', { 'showType': 2 })
            const list = JSON.parse(JSON.stringify(this.tablist))
            data.forEach((v) => {
                list.push({ id: list.length + 1, sid: v.shopCategoryId, name: v.shopCategoryName, status: false })
            })
            this.tablist = list
        },
        setSort(value) {
            this.isPreview()
            let sort = 1
            this.sortlist.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    if (v.status > 1) {
                        v.status = 1;
                    } else {
                        v.status += 1;
                    }
                    sort = v.status + v.id
                }
            })
            this.$emit('setsort', sort)
        },
        toMy() {
            this.isPreview()
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/my'
            })
        },
        toCommerce(value) {
			console.log(value)
            this.isPreview()
			let commissionPrice=''
			if(value.commissionPrice>0){
				commissionPrice=1
			}else{
				commissionPrice=0
			}
            if (this.release === '1') {
                uni.$emit('drxdrelease', { citeId: value.id, citename: value.relatedName,commissionPrice:commissionPrice })
                uni.navigateBack()
            } else {
                uni.navigateTo({
                    url: '/pages/wiseman/component/addimgarticle?citeId=' + value.id + '&citename=' + value.relatedName+"&commissionPrice="+commissionPrice
                })
            }
        },
        setTabList(value) {
            this.isPreview()
            this.tablist.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    v.status = true
                } else {
                    v.status = false
                }
            })
            if (value.sid) {
                this.$emit('setstab', value.sid)
            } else {
                this.$emit('settab', value.id === 0 ? '' : value.id)
            }
        },
        onScrollToLower() {
            this.$emit('scrolltolower')
        },
        setSelectList(value) {
            this.isPreview()
            this.$emit('set-value', value)
        },
        setList(value) {
            this.isPreview()
            const list = [
                { id: 1, url: '/pages/home/activityDetail/index' },
                { id: 2, url: '/pages/carShops/upkeep/detail' },
                { id: 3, url: '/pages/roadhelp/index' },
                { id: 4, url: '/pages/grouppurchase/detail' },
                { id: 5, url: '/pages/grouppurchase/packagedetail' }
            ]
            list.forEach((v) => {
                if (value.type === v.id) {
                    uni.navigateTo({
                        url: v.url + '?id=' + value.relatedId + '&forwardUserId=' + this.userId
                    })
                }
            })
        },
        toShop(value) {
            this.isPreview()
            if (value.shopTypeId === 2) {
                uni.navigateTo({
                    url: '/pages/carShops/4Sdetail/index?id=' + value.shopId
                })
            } else if (value.shopTypeId === 3) {
                uni.navigateTo({
                    url: '/pages/activityMall/business/index?id=' + value.shopId
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.goods {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;

    &-shop {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 750rpx;

        &-item {
            display: flex;
            width: 704rpx;
            // height: 288rpx;
            background: #FFFFFF;
            border-radius: 15rpx;
            margin-bottom: 15rpx;

            &-selected {
                width: 88rpx;
                height: 88rpx;
                margin-top: 15rpx;
            }

            &-image {
                width: 154rpx;
                height: 154rpx;
                border-radius: 15rpx;
                margin: 15rpx;
            }

            &-name {
                font-size: 27rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 38rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
            }

            &-treetop {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 31rpx;
                height: 31rpx;
                background: #FFEEEE;
                border-radius: 16rpx;
                font-size: 19rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #DD3232;
                line-height: 23rpx;
            }

            &-red {
                font-size: 23rpx;
                font-family: OPPOSans-Heavy, OPPOSans;
                font-weight: 800;
                color: #D91B1B;
                line-height: 31rpx;
                margin-left: 8rpx;
            }

            &-grey {
                font-size: 23rpx;
                font-family: OPPOSans-Medium, OPPOSans;
                font-weight: 500;
                color: #999999;
                line-height: 31rpx;
                text-decoration: line-through;
                margin-left: 8rpx;
            }

            &-business {
                display: flex;
                align-items: center;
                height: 33rpx;
                background: #EFEFEF;
                border-radius: 17rpx;
                margin-top: 8rpx;

                &-title {
                    font-size: 23rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 33rpx;
                    margin-left: 8rpx;
                    margin-right: 15rpx;
                }

                &-black {
                    font-size: 23rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #222222;
                    line-height: 33rpx;
                    margin-right: 8rpx;
                }
            }

            &-order {
                display: flex;
                margin-top: 8rpx;

                &-title {
                    font-size: 23rpx;
                    font-family: OPPOSans-Regular, OPPOSans;
                    font-weight: 400;
                    color: #999999;
                    line-height: 33rpx;
                }

                &-title2 {
                    font-size: 23rpx;
                    font-family: OPPOSans-Regular, OPPOSans;
                    font-weight: 400;
                    color: #999999;
                    line-height: 33rpx;
                    margin-left: 38rpx;
                }

                &-title3 {
                    font-size: 23rpx;
                    font-family: OPPOSans-Regular, OPPOSans;
                    font-weight: 400;
                    color: #999999;
                    line-height: 33rpx;
                    margin-left: 38rpx;
                }
            }

            &-money {
                display: flex;
                align-items: flex-end;

                &-title {
                    font-size: 23rpx;
                    font-family: OPPOSans-Medium, OPPOSans;
                    font-weight: 500;
                    color: #D91B1B;
                    line-height: 32rpx;
                }

                &-title2 {
                    font-size: 31rpx;
                    font-family: OPPOSans-Medium, OPPOSans;
                    font-weight: 500;
                    color: #D91B1B;
                    line-height: 40rpx;
                }

                &-title3 {
                    font-size: 23rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 33rpx;
                    margin-left: 8rpx;
                    margin-bottom: 2rpx;
                }
            }

            &-add {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 158rpx;
                height: 69rpx;
                border-radius: 35rpx;
                border: 2rpx solid #D91B1B;
                font-size: 27rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #D91B1B;
                line-height: 32rpx;
                margin-right: 15rpx;
            }

            &-expire {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 158rpx;
                height: 69rpx;
                border-radius: 35rpx;
                border: 2rpx solid #999999;
                font-size: 27rpx;
                font-family: PingFang SC-Medium, PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 32rpx;
                margin-right: 15rpx;
            }
        }

        &-empty {
            width: 732rpx;
            height: 288rpx;
            margin-top: 23rpx;
            margin-bottom: 39rpx;
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

.h100 {
    height: 100rpx;
}

.h0 {
    width: 100vw;
    background: #EFEFEF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

.h15 {
    height: 15rpx;
}

.h23 {
    height: 23rpx;
}

.h147 {
    width: 100vw;
    height: 147rpx;
    background: #EFEFEF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

.h73vh {
    margin-top: 15rpx;
    height: calc(100vh - 312rpx - constant(safe-area-inset-bottom));
    height: calc(100vh - 312rpx - env(safe-area-inset-bottom));
    background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
}

.h70vh {
    margin-top: 15rpx;
    height: calc(100vh - 165rpx - constant(safe-area-inset-bottom));
    height: calc(100vh - 165rpx - env(safe-area-inset-bottom));
    background: linear-gradient(180deg, #FFFFFF 0%, #EFEFEF 100%);
}

.w6h12 {
    width: 11rpx;
    height: 16rpx;
    margin-right: 15rpx;
}

.w435h173 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 435rpx;
    // height: 173rpx;
    margin-top: 15rpx;
    margin-right: 15rpx;
}

.w504h173 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 504rpx;
    // height: 173rpx;
    margin-top: 15rpx;
    margin-right: 15rpx;
}

.is-expire {
    transition: all .3s ease;
    filter: grayscale(100%);
    opacity: .6;
}

.c99999 {
    color: #999999;
}

.bgcCCCCCC {
    background: #CCCCCC;
}

.mt15 {
    margin-top: 15rpx;
}

.mb7 {
    margin-bottom: 7rpx;
}
</style>