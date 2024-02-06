<template>
    <view class="page">
        <view class="top">
            <view class="top-search">
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
                    class="top-search-image"
                />
                <input
                    v-model="search"
                    placeholder="搜索活动商品"
                    placeholder-style="color:#999999;font-size:27rpx;"
                    class="top-search-input"
                    @blur="setSearch"
                />
            </view>
        </view>
        <view v-if="outdoors.length" class="list">
            <view class="list-top">
                <view class="list-left">
                    <view class="list-top-red">{{ lookSearch }}</view>
                    <view class="list-top-line" />
                    <view class="list-top-title">户外畅游</view>
                </view>
                <view class="list-top-more" @click="toOutdoors">更多</view>
            </view>
            <view v-for="(v, i) in outdoors" :key="i" class="outdoors" @click="toOutdoorsDetails(v)">
                <view class="outdoors-top">
                    <video
                        v-if="v.adPushUrl"
                        class="outdoors-top-image"
                        :src="v.adPushUrl"
                        :poster="v.adCoverImg"
                        style="object-fit: cover"
                        @click.stop
                    />
                    <image v-else class="outdoors-top-image" :src="v.coverPicture" style="object-fit: cover" />
                    <view v-if="v.activitySignUpStatus === 1 || v.activitySignUpStatus === 2" class="outdoors-top-date">
                        <view v-if="v.activitySignUpStatus === 2" class="outdoors-top-date-title">报名截止时间</view>
                        <view v-if="v.activitySignUpStatus === 1" class="outdoors-top-date-title">报名开启时间</view>
                        <view class="outdoors-top-date-title">{{
                            v.activitySignUpStatus == 2 ? v.activityEndTime : v.activityBeginTime
                        }}</view>
                    </view>
                    <view class="outdoors-top-in">
                        <image
                            v-if="v.activitySignUpStatus === 1"
                            class="outdoors-top-in-image"
                            src="@/static/image/huodongyugao.png"
                        />
                        <image
                            v-if="
                                v.activitySignUpStatus == 3 ||
                                v.activitySignUpStatus == 4 ||
                                v.activitySignUpStatus == 5
                            "
                            class="outdoors-top-in-image"
                            src="@/static/image/jieshu.png"
                        />
                    </view>
                    <view class="outdoors-top-ae">
                        <view
                            v-if="(v.activitySignUpStatus === 1 || v.activitySignUpStatus === 2) && v.districtName"
                            class="outdoors-top-ae-area"
                            >{{ v.districtName }}</view
                        >
                        <view />
                        <view v-if="v.activitySignUpStatus === 2" class="outdoors-top-ae-enroll">报名中</view>
                    </view>
                </view>
                <view class="outdoors-title" v-html="getTitle('<p>' + v.title + '</p>')" />
                <view class="outdoors-mh">
                    <view class="outdoors-mh-left">
                        <view v-if="v.payType === 2" class="outdoors-mh-symbol">￥</view>
                        <view v-if="v.payType === 2" class="outdoors-mh-money">{{
                            v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice
                        }}</view>
                        <view v-else class="outdoors-mh-money">免费</view>
                        <view v-if="v.shopTypeId !== 2" class="outdoors-mh-cross">M团价</view>
                        <view class="outdoors-mh-cross"
                            >￥{{ v.shopTypeId !== 2 && v.mgroupPrice !== 0 ? v.mgroupPrice : v.marketPrice }}</view
                        >
                    </view>
                    <view class="outdoors-mh-right">
                        <view class="outdoors-mh-enroll">已报名 {{ v.saleNum }}/{{ v.stock }}</view>
                        <image
                            class="outdoors-mh-head"
                            v-for="(value, index) in v.headPortraits"
                            :key="index"
                            :src="value"
                        />
                        <view v-if="v.saleNum > 3" class="outdoors-mh-head">
                            <view class="outdoors-mh-head-drop" />
                            <view class="outdoors-mh-head-drop" />
                            <view class="outdoors-mh-head-drop" />
                        </view>
                    </view>
                </view>
                <view v-if="v.baseName" class="outdoors-shop">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"
                        class="outdoors-shop-image"
                    />
                    <view class="outdoors-shop-title">{{ v.baseName }}</view>
                    <view v-if="v.cbBaseName" class="outdoors-shop-title">&{{ v.cbBaseName }}</view>
                </view>
            </view>
        </view>
        <view v-if="indoor.length" class="list">
            <view class="list-top">
                <view class="list-left">
                    <view class="list-top-red">{{ lookSearch }}</view>
                    <view class="list-top-line" />
                    <view class="list-top-title">户内嗨乐</view>
                </view>
                <view class="list-top-more" @click="toIndoor">更多</view>
            </view>
            <view v-for="(v, i) in indoor" :key="i" class="indoor" @click="toIndoorDetails(v)">
                <view class="indoor-top">
                    <video
                        v-if="v.adPushUrl"
                        class="indoor-top-image"
                        :src="v.adPushUrl"
                        :poster="v.adCoverImg"
                        style="object-fit: cover"
                        @click.stop
                    />
                    <image v-else class="indoor-top-image" :src="v.coverPicture" style="object-fit: cover" />
                    <view v-if="v.activitySignUpStatus === 1 || v.activitySignUpStatus === 2" class="indoor-top-date">
                        <view v-if="v.activitySignUpStatus === 2" class="indoor-top-date-title">报名截止时间</view>
                        <view v-if="v.activitySignUpStatus === 1" class="indoor-top-date-title">报名开启时间</view>
                        <view class="indoor-top-date-title">{{
                            v.activitySignUpStatus == 2 ? v.activityEndTime : v.activityBeginTime
                        }}</view>
                    </view>
                    <view class="indoor-top-in">
                        <image
                            v-if="v.activitySignUpStatus === 1"
                            class="indoor-top-in-image"
                            src="@/static/image/huodongyugao.png"
                        />
                        <image
                            v-if="
                                v.activitySignUpStatus == 3 ||
                                v.activitySignUpStatus == 4 ||
                                v.activitySignUpStatus == 5
                            "
                            class="indoor-top-in-image"
                            src="@/static/image/jieshu.png"
                        />
                    </view>
                    <view class="indoor-top-ae">
                        <view
                            v-if="(v.activitySignUpStatus === 1 || v.activitySignUpStatus === 2) && v.districtName"
                            class="indoor-top-ae-area"
                            >{{ v.districtName }}</view
                        >
                        <view />
                        <view v-if="v.activitySignUpStatus === 2" class="indoor-top-ae-enroll">报名中</view>
                    </view>
                </view>
                <view class="indoor-title" v-html="getTitle(getTitle('<p>' + v.title + '</p>'))" />
                <view class="indoor-mh">
                    <view class="indoor-mh-left">
                        <view v-if="v.payType === 2" class="indoor-mh-symbol">￥</view>
                        <view v-if="v.payType === 2" class="indoor-mh-money">{{
                            v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice
                        }}</view>
                        <view v-else class="indoor-mh-money">免费</view>
                        <view v-if="v.shopTypeId !== 2" class="indoor-mh-cross">M团价</view>
                        <view class="indoor-mh-cross"
                            >￥{{ v.shopTypeId !== 2 && v.mgroupPrice !== 0 ? v.mgroupPrice : v.marketPrice }}</view
                        >
                    </view>
                    <view class="indoor-mh-right">
                        <view class="indoor-mh-enroll">已报名 {{ v.saleNum }}/{{ v.stock }}</view>
                        <image
                            class="indoor-mh-head"
                            v-for="(value, index) in v.headPortraits"
                            :key="index"
                            :src="value"
                        />
                        <view v-if="v.saleNum > 3" class="indoor-mh-head">
                            <view class="indoor-mh-head-drop" />
                            <view class="indoor-mh-head-drop" />
                            <view class="indoor-mh-head-drop" />
                        </view>
                    </view>
                </view>
                <view v-if="v.baseName" class="indoor-shop">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"
                        class="indoor-shop-image"
                    />
                    <view class="indoor-shop-title">{{ v.baseName }}</view>
                    <view v-if="v.cbBaseName" class="indoor-shop-title">&{{ v.cbBaseName }}</view>
                </view>
            </view>
        </view>
        <view v-if="groupbuy.length" class="list">
            <view class="list-top">
                <view class="list-left">
                    <view class="list-top-red">{{ lookSearch }}</view>
                    <view class="list-top-line" />
                    <view class="list-top-title">优惠团购</view>
                </view>
                <view class="list-top-more" @click="toGroupbuy">更多</view>
            </view>
            <view v-for="(v, i) in groupbuy" :key="i" class="groupbuy" @click="toGroupbuyDetails(v)">
                <image :src="v.coverPicture" class="groupbuy-image" />
                <view class="groupbuy-right">
                    <view class="groupbuy-right-title" v-html="getTitle('<p>' + v.title + '</p>')" />
                    <view class="groupbuy-right-shop">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"
                            class="groupbuy-right-shop-image"
                        />
                        <view class="groupbuy-right-shop-title">{{ v.baseName }}</view>
                        <view v-if="v.distance" class="groupbuy-right-shop-range">{{ v.distanceMsg }}</view>
                    </view>
                    <view class="groupbuy-right-mb">
                        <view class="groupbuy-right-mb-left">
                            <view class="groupbuy-right-mb-symbol">￥</view>
                            <view class="groupbuy-right-mb-money">{{
                                v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice
                            }}</view>
                            <view class="groupbuy-right-mb-cross">{{ v.marketPriceName }}</view>
                            <view class="groupbuy-right-mb-cross">￥{{ v.marketPrice }}</view>
                        </view>
                        <image
                            class="groupbuy-right-mb-image"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699868513276.png"
                        />
                    </view>
                </view>
            </view>
        </view>
        <view v-if="thali.length" class="list">
            <view class="list-top">
                <view class="list-left">
                    <view class="list-top-red">{{ lookSearch }}</view>
                    <view class="list-top-line" />
                    <view class="list-top-title">精选套餐</view>
                </view>
                <view class="list-top-more" @click="toThali">更多</view>
            </view>
            <view v-for="(v, i) in thali" :key="i" class="thali" @click="toThaliDetails(v)">
                <video
                    v-if="v.adPushUrl"
                    class="thali-image"
                    :src="v.adPushUrl"
                    :poster="v.adCoverImg"
                    style="object-fit: cover"
                    @click.stop
                />
                <image v-else class="thali-image" :src="v.coverPicture" style="object-fit: cover" />
                <view class="thali-right">
                    <view class="thali-right-title" v-html="getTitle('<p>' + v.title + '</p>')" />
                    <view class="thali-right-shop">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"
                            class="thali-right-shop-image"
                        />
                        <view class="thali-right-shop-title">{{ v.baseName }}</view>
                        <view v-if="v.distance" class="thali-right-shop-range">{{ v.distanceMsg }}</view>
                    </view>
                    <view class="thali-right-mb">
                        <view class="thali-right-mb-left">
                            <view class="thali-right-mb-symbol">￥</view>
                            <view class="thali-right-mb-money">{{
                                v.bankCardPrice ? v.bankCardPrice : v.flashSalePrice
                            }}</view>
                            <view class="thali-right-mb-cross">{{ v.marketPriceName }}</view>
                            <view class="thali-right-mb-cross">￥{{ v.marketPrice }}</view>
                        </view>
                        <image
                            class="thali-right-mb-image"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699868513276.png"
                        />
                    </view>
                </view>
            </view>
        </view>
        <view v-if="business.length" class="list">
            <view class="list-top">
                <view class="list-left">
                    <view class="list-top-red">{{ lookSearch }}</view>
                    <view class="list-top-line" />
                    <view class="list-top-title">商家</view>
                </view>
            </view>
            <view v-for="(v, i) in business" :key="i" class="business" @click="toBusiness(v)">
                <view class="business-top">
                    <view class="business-left">
                        <view class="business-top-title" v-html="getTitle('<p>' + v.baseName + '</p>')" />
                        <view class="business-top-star">
                            <image
                                v-for="(v, i) in v.star"
                                :key="i"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698717060730.png"
                                class="business-top-star-image"
                            />
                            <view class="business-top-star-title">{{ v.starStr }}</view>
                        </view>
                        <view v-for="(value, index) in v.storeLabelMsg" :key="index" class="business-top-label">{{
                            value
                        }}</view>
                    </view>
                    <view class="business-top-range">{{ v.distanceMsg }}</view>
                </view>
                <view class="business-line" />
                <view class="business-centre">
                    <scroll-view class="business-centre-list" scroll-x="true">
                        <image
                            v-for="(value, index) in v.doorheadPhotoMsg"
                            :key="index"
                            :src="value"
                            class="business-centre-image"
                        />
                    </scroll-view>
                </view>
            </view>
        </view>
        <view class="safe-bottom-height" />
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            search: "",
            lookSearch: "",
            outdoors: [],
            indoor: [],
            groupbuy: [],
            thali: [],
            business: [],
        };
    },
    onLoad() {},
    onShow() {},
    methods: {
        async setSearch() {
            if (this.search.length === 0) {
                this.outdoors = [];
                this.indoor = [];
                this.groupbuy = [];
                this.thali = [];
                this.business = [];
                this.lookSearch = this.search;
                return;
            }
            const { code, data, message } = await this.$request.post(
                "/coc-active/api/v2/homePage/comprehensiveSearch",
                {
                    searchStr: this.search,
                    current: 1,
                    size: 10,
                }
            );
            if (code === 200) {
                this.lookSearch = this.search;
                const {
                    getActivitysVOInDoors,
                    getActivitysVOOutDoors,
                    groupListV2VOIPage,
                    groupListV3VOIPage,
                    shopListVOIPageFood,
                    shopListVOIPageHotel,
                    shopListVOIPageInDoor,
                    shopListVOIPageOutDoor,
                } = data;
                const {
                    homePageActivitysVOIPage: { records: outdoors },
                } = getActivitysVOOutDoors;
                this.outdoors = outdoors;
                const {
                    homePageActivitysVOIPage: { records: indoor },
                } = getActivitysVOInDoors;
                this.indoor = indoor;
                const { records: groupbuy } = groupListV2VOIPage;
                this.groupbuy = groupbuy;
                const { records: thali } = groupListV3VOIPage;
                this.thali = thali;
                const { records: business1 } = shopListVOIPageFood;
                const { records: business2 } = shopListVOIPageHotel;
                const { records: business3 } = shopListVOIPageInDoor;
                const { records: business4 } = shopListVOIPageOutDoor;
                business1.forEach((v) => {
                    const list = [];
                    v.doorheadPhotoMsg.forEach((val) => {
                        if (val.indexOf(".mp4") > -1) {
                            list.unshift(val + "?x-oss-process=video/snapshot,t_1000,m_fast");
                        } else {
                            list.push(val);
                        }
                    });
                    v.doorheadPhotoMsg = list;
                });
                business2.forEach((v) => {
                    const list = [];
                    v.doorheadPhotoMsg.forEach((val) => {
                        if (val.indexOf(".mp4") > -1) {
                            list.unshift(val + "?x-oss-process=video/snapshot,t_1000,m_fast");
                        } else {
                            list.push(val);
                        }
                    });
                    v.doorheadPhotoMsg = list;
                });
                business3.forEach((v) => {
                    const list = [];
                    v.doorheadPhotoMsg.forEach((val) => {
                        if (val.indexOf(".mp4") > -1) {
                            list.unshift(val + "?x-oss-process=video/snapshot,t_1000,m_fast");
                        } else {
                            list.push(val);
                        }
                    });
                    v.doorheadPhotoMsg = list;
                });
                business4.forEach((v) => {
                    const list = [];
                    v.doorheadPhotoMsg.forEach((val) => {
                        if (val.indexOf(".mp4") > -1) {
                            list.unshift(val + "?x-oss-process=video/snapshot,t_1000,m_fast");
                        } else {
                            list.push(val);
                        }
                    });
                    v.doorheadPhotoMsg = list;
                });
                this.business = business1.concat(business2).concat(business3).concat(business4);
            } else {
                uni.$u.toast(message);
            }
        },
        toOutdoors() {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/outdoorsactivity",
            });
        },
        toOutdoorsDetails(value) {
            if (value.shopTypeId === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + value.activityId,
                });
            } else {
                uni.navigateTo({
                    url: "/pages/home/activityDetail/index?id=" + value.activityId,
                });
            }
        },
        toIndoor() {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/indooractivity",
            });
        },
        toIndoorDetails(value) {
            if (value.shopTypeId === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + value.activityId,
                });
            } else {
                uni.navigateTo({
                    url: "/pages/home/activityDetail/index?id=" + value.activityId,
                });
            }
        },
        toGroupbuy() {
            uni.navigateTo({
                url: "/pages/grouppurchase/index",
            });
        },
        toGroupbuyDetails(value) {
            uni.navigateTo({
                url: "/pages/grouppurchase/detail?id=" + value.productId,
            });
        },
        toThali() {
            uni.navigateTo({
                url: "/pages/gourmetGroggery/index",
            });
        },
        toThaliDetails(value) {
            if (value.type === 1) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/detail?id=" + value.id,
                });
            } else if (value.type === 2) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/packagedetail?id=" + value.id,
                });
            }
        },
        toBusiness(value) {
            uni.navigateTo({
                url: "/pages/activityMall/business/index?id=" + value.shopId,
            });
        },
        getTitle(value) {
            return value.replaceAll(this.lookSearch, `<label style="color:#D91B1B">${this.lookSearch}</label>`);
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
    background: #efefef;
}

.top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
    height: 77rpx;
    background: #ffffff;
    padding-bottom: 16rpx;

    &-search {
        display: flex;
        align-items: center;
        width: 704rpx;
        height: 62rpx;
        border-radius: 31rpx;
        border: 2rpx solid #d91b1b;

        &-image {
            width: 48rpx;
            height: 48rpx;
            margin-left: 15rpx;
        }

        &-input {
            width: 621rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 32rpx;
            margin-left: 8rpx;
            margin-right: 15rpx;
        }
    }
}

.list {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin-left: 10rpx;
    margin-top: 10rpx;

    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 86rpx;

        &-red {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d91b1b;
            margin-left: 11rpx;
        }

        &-line {
            width: 12rpx;
            height: 2rpx;
            background: #222222;
            margin-left: 12rpx;
            margin-right: 13rpx;
        }

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
        }

        &-more {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            margin-right: 18rpx;
        }
    }

    &-left {
        display: flex;
        align-items: center;
    }
}

.outdoors {
    margin-left: 15rpx;
    margin-right: 15rpx;
    padding-bottom: 6rpx;

    &-top {
        position: relative;
        width: 700rpx;
        height: 400rpx;

        &-image {
            width: 700rpx;
            height: 400rpx;
            background: #6a6a6a;
            border-radius: 10rpx;
        }

        &-date {
            position: absolute;
            left: 1rpx;
            top: 16rpx;
            display: flex;
            align-items: center;
            height: 52rpx;
            background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
            border-radius: 0rpx 24rpx 28rpx 0rpx;
            padding-left: 7rpx;
            padding-right: 23rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                margin-left: 7rpx;
                margin-right: 7rpx;
            }
        }

        &-in {
            position: absolute;
            left: 260rpx;
            top: 110rpx;
            &-image {
                width: 180rpx;
                height: 180rpx;
            }
        }

        &-ae {
            position: absolute;
            left: 29rpx;
            right: 27rpx;
            bottom: 29rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-area {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120rpx;
                height: 52rpx;
                background: rgba(34, 34, 34, 0.5);
                border-radius: 25rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
            }

            &-enroll {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120rpx;
                height: 52rpx;
                background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
                border-radius: 25rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }

    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 16rpx;
    }

    &-mh {
        display: flex;
        justify-content: space-between;
        margin-top: 2rpx;

        &-left {
            display: flex;
            align-items: flex-end;
            margin-top: 4rpx;
        }

        &-right {
            display: flex;
            align-items: center;
            height: 40rpx;
        }

        &-symbol {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #d91b1b;
            margin-bottom: 2rpx;
        }

        &-money {
            font-size: 40rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d91b1b;
            margin-left: 7rpx;
            margin-right: 10rpx;
        }

        &-cross {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            text-decoration: line-through;
            color: #999999;
            margin-bottom: 4rpx;
        }

        &-enroll {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-right: 14rpx;
        }

        &-head {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40rpx;
            height: 40rpx;
            border-radius: 20rpx;
            background: #f8f8f8;
            margin-left: 2rpx;
            margin-right: 2rpx;

            &-drop {
                width: 6rpx;
                height: 6rpx;
                background: #999999;
                border-radius: 3rpx;
                margin-left: 2rpx;
                margin-right: 2rpx;
            }
        }
    }

    &-shop {
        display: flex;
        align-items: center;
        margin-top: 17rpx;
        padding-bottom: 26rpx;

        &-image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 9rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
        }
    }
}

.indoor {
    margin-left: 15rpx;
    margin-right: 15rpx;
    padding-bottom: 6rpx;

    &-top {
        position: relative;
        width: 700rpx;
        height: 400rpx;

        &-image {
            width: 700rpx;
            height: 400rpx;
            background: #6a6a6a;
            border-radius: 10rpx;
        }

        &-date {
            position: absolute;
            left: 1rpx;
            top: 16rpx;
            display: flex;
            align-items: center;
            height: 52rpx;
            background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
            border-radius: 0rpx 24rpx 28rpx 0rpx;
            padding-left: 7rpx;
            padding-right: 23rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                margin-left: 7rpx;
                margin-right: 7rpx;
            }
        }

        &-in {
            position: absolute;
            left: 260rpx;
            top: 110rpx;
            &-image {
                width: 180rpx;
                height: 180rpx;
            }
        }

        &-ae {
            position: absolute;
            left: 29rpx;
            right: 27rpx;
            bottom: 29rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &-area {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120rpx;
                height: 52rpx;
                background: rgba(34, 34, 34, 0.5);
                border-radius: 25rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
            }

            &-enroll {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 120rpx;
                height: 52rpx;
                background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
                border-radius: 25rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
            }
        }
    }

    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        margin-top: 16rpx;
    }

    &-mh {
        display: flex;
        justify-content: space-between;
        margin-top: 2rpx;

        &-left {
            display: flex;
            align-items: flex-end;
            margin-top: 4rpx;
        }

        &-right {
            display: flex;
            align-items: center;
            height: 40rpx;
        }

        &-symbol {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #d91b1b;
            margin-bottom: 2rpx;
        }

        &-money {
            font-size: 40rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d91b1b;
            margin-left: 7rpx;
            margin-right: 10rpx;
        }

        &-cross {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            text-decoration: line-through;
            color: #999999;
            margin-bottom: 4rpx;
        }

        &-enroll {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-right: 14rpx;
        }

        &-head {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40rpx;
            height: 40rpx;
            border-radius: 20rpx;
            background: #f8f8f8;
            margin-left: 2rpx;
            margin-right: 2rpx;

            &-drop {
                width: 6rpx;
                height: 6rpx;
                background: #999999;
                border-radius: 3rpx;
                margin-left: 2rpx;
                margin-right: 2rpx;
            }
        }
    }

    &-shop {
        display: flex;
        align-items: center;
        margin-top: 17rpx;
        padding-bottom: 26rpx;

        &-image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 9rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
        }
    }
}

.groupbuy {
    display: flex;
    justify-content: space-between;
    margin-left: 10rpx;
    margin-right: 20rpx;
    padding-bottom: 10rpx;

    &-image {
        width: 230rpx;
        height: 230rpx;
        background: #ff3b3b;
        border-radius: 10rpx;
    }

    &-right {
        width: 450rpx;

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        &-shop {
            display: flex;
            align-items: center;
            margin-top: 14rpx;
            padding-bottom: 50rpx;

            &-image {
                width: 26rpx;
                height: 26rpx;
                margin-left: 2rpx;
                margin-right: 11rpx;
            }

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
            }

            &-range {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 20rpx;
            }
        }

        &-mb {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            &-left {
                display: flex;
                align-items: flex-end;
            }

            &-symbol {
                font-size: 28rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #d91b1b;
                margin-bottom: 2rpx;
            }

            &-money {
                font-size: 36rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #d91b1b;
                margin-left: 3rpx;
                margin-right: 9rpx;
            }

            &-cross {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #999999;
                margin-bottom: 4rpx;
            }

            &-image {
                width: 143rpx;
                height: 53rpx;
            }
        }
    }
}

.thali {
    display: flex;
    justify-content: space-between;
    margin-left: 10rpx;
    margin-right: 20rpx;
    padding-bottom: 10rpx;

    &-image {
        width: 230rpx;
        height: 230rpx;
        background: #ff3b3b;
        border-radius: 10rpx;
    }

    &-right {
        width: 450rpx;

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
        }

        &-shop {
            display: flex;
            align-items: center;
            margin-top: 14rpx;
            padding-bottom: 50rpx;

            &-image {
                width: 26rpx;
                height: 26rpx;
                margin-left: 2rpx;
                margin-right: 11rpx;
            }

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
            }

            &-range {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 20rpx;
            }
        }

        &-mb {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;

            &-left {
                display: flex;
                align-items: flex-end;
            }

            &-symbol {
                font-size: 28rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #d91b1b;
                margin-bottom: 2rpx;
            }

            &-money {
                font-size: 36rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #d91b1b;
                margin-left: 3rpx;
                margin-right: 9rpx;
            }

            &-cross {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #999999;
                margin-bottom: 4rpx;
            }

            &-image {
                width: 143rpx;
                height: 53rpx;
            }
        }
    }
}

.business {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;

    &-top {
        display: flex;
        justify-content: space-between;
        padding-left: 20rpx;
        padding-right: 20rpx;

        &-title {
            width: 560rpx;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            word-break: break-all;
            text-overflow: ellipsis;
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
        }

        &-label {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 38rpx;
            background: rgba(217, 27, 27, 0.1);
            border-radius: 10rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #d91b1b;
            padding-left: 11rpx;
            padding-right: 16rpx;
            margin-bottom: 20rpx;
        }

        &-star {
            display: flex;
            align-items: center;
            height: 44rpx;

            &-image {
                width: 24rpx;
                height: 24rpx;
                margin-left: 2.5rpx;
                margin-right: 2.5rpx;
            }

            &-title {
                font-size: 24rpx;
                font-family: HONOR Sans CN;
                font-weight: 400;
                color: #d91b1b;
                margin-left: 8rpx;
            }
        }

        &-range {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
        }
    }

    &-left {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    &-line {
        width: 690rpx;
        height: 1rpx;
        background: #e8e8e8;
        margin-left: 20rpx;
    }

    &-centre {
        display: flex;
        padding: 20rpx;

        &-list {
            white-space: nowrap;
            width: 690rpx;
        }

        &-image {
            display: inline-block;
            width: 223rpx;
            height: 160rpx;
            background: #c85252;
            border-radius: 10rpx;
            margin-right: 10rpx;
        }
    }
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
