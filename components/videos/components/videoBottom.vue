<template>
    <view class="bottom">
        <view class="bottom-df">
            <view v-if="value.business.content" class="bottom-business" @click="toBusiness">
                <image :src="value.business.image" class="bottom-business-image" />
                <view class="bottom-business-content">商家 丨 {{ value.business.content }}</view>
            </view>
        </view>
        <view class="bottom-df">
            <view v-if="value.groupbuy.content" class="bottom-groupbuy" @click="toGroupBuy">
                <image :src="value.groupbuy.image" class="bottom-groupbuy-image" />
                <view :class="value.address ? 'bottom-groupbuy-mintitle' : 'bottom-groupbuy-maxtitle'">{{
                    value.groupbuy.content
                }}</view>
            </view>
            <view v-if="value.address" class="bottom-location" @click="toAddress">
                <view class="bottom-location-image">
                    <u-icon color="#ffffff" name="map" />
                </view>
                <view :class="value.groupbuy.content ? 'bottom-location-address' : 'bottom-location-address1'">{{ value.address }}</view>
            </view>
            <view v-if="value.isOriginal == 1" style="display:flex; align-items: center;" :style="[value.groupbuy.content || value.address ? {marginLeft: '6rpx'} : {marginLeft: '27rpx'}]">
                <image style="width: 28rpx; height: 28rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240122/file_1705904096229.png"></image>
                <view style="
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #ffffff;
                    margin-left: 8rpx;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                ">原创</view>
            </view>
        </view>
        <view class="bottom-df" style="width: 100%; flex-wrap: wrap;">
            <view class="bottom-name" @click="toName">@{{ value.name }}</view>
            <view
                v-if="value.followfriends !== -1"
                :class="value.followfriends ? 'bottom-followfriends' : 'bottom-unfollowfriends'"
                @click="setFollowFriends"
            >
                {{ value.followfriends ? "已关注" : "关注" }}
            </view>
            <view v-for="(val, i) in details.expertTagsVOList" :key="i" class="tagClass">
                {{ val.tagsName }}
            </view>
        </view>
        <view class="bottom-content">
            {{ firstTitle }}
            <span v-for="(v, i) in otherTitle" :key="i" @click="handleJump(v)">
                #{{ v }}
            </span>
        </view>
    </view>
</template>
<script>
export default {
    computed: {
        titleArr() {
            return this.value.content.split("#") || []
        },
        firstTitle() {
            return this.titleArr[0]
        },
        otherTitle() {
            const arr = JSON.parse(JSON.stringify(this.titleArr));
            arr.shift();
            console.log(arr);
            return arr;
        }
    },
    props: {
        details: {
            type: Object,
            default: () => {},
        },
        params: {
            type: Object,
            default: () => {},
        }
    },
    data() {
        return {
            value: {
                name: "",
                content: "",
                followfriends: false,
                address: "",
                groupbuy: {
                    list: [
                        { type: [1, 9], url: "https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png" },
                        { type: [2, 6], url: "https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png" },
                        { type: [3], url: "https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png" },
                        { type: [4], url: "https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png" },
                        // { type: [5], url: "https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png" },
                        { type: [5], url: "https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png" },
                    ],
                    content: "",
                    image: "",
                },
                business: {
                    content: "",
                    image: "https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png",
                },
            },
        };
    },
    watch: {
        details: {
            handler(newVal, oldVal) {
                this.getDetails();
            },
        },
        deep: true,
    },
    mounted() {
        this.getDetails();
    },
    methods: {
        handleJump(v) {
            const keycode = v.trim();
            console.log(11111111111, this.params);
            if (this.params.list.params.newType == 2) {
                uni.navigateTo({
                    url: `/pages/advertisement/choice?keycode=${keycode}&isNoShow=true`,
                });
            }
            if (this.params.list.params.newType == 1) {
                uni.navigateTo({
                    url: `/pages/activity/activityRegistration/playfulperson?keycode=${keycode}&isNoShow=true`,
                });
            }
            
        },
        getDetails() {
            const business = Object.assign(this.value.business, this.details.business);
            const groupbuy = Object.assign(this.value.groupbuy, this.details.groupbuy);
            groupbuy.list.forEach((v) => {
                if (v.type.indexOf(groupbuy.type) > -1) {
                    groupbuy.image = v.url;
                }
            });
            Object.assign(this.value, this.details, { business }, { groupbuy });
        },
        toBusiness() {
            const {
                business: { id },
            } = this.value;
            uni.navigateTo({
                url: "/pages/activityMall/business/index?id=" + id,
            });
        },
        toGroupBuy() {
            const { userId, groupbuy } = this.value;
            const { type, id, shopId, shopTypeId } = groupbuy;
            if (type === 1) {
                if (shopTypeId === 2) {
                    uni.navigateTo({
                        url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + id + "&forwardUserId=" + userId,
                    });
                } else {
                    uni.navigateTo({
                        url: "/pages/home/activityDetail/index?id=" + id + "&forwardUserId=" + userId,
                    });
                }
            } else if (type === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/upkeep/detail?id=" + id + "&forwardUserId=" + userId,
                });
            } else if (type === 3) {
                uni.navigateTo({
                    url: "/pages/roadhelp/index?forwardUserId=" + userId,
                });
            } else if (type === 4) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/detail?id=" + id + "&forwardUserId=" + userId,
                });
            } else if (type === 5) {
                uni.navigateTo({
                    url: "/pages/grouppurchase/packagedetail?id=" + id + "&forwardUserId=" + userId,
                });
            } else if (type === 6) {
                uni.navigateTo({
                    url: "/pages/carShops/carList/index?id=" + id + "&type=1&shopId=" + shopId,
                });
            } else if (type === 9) {
                uni.navigateTo({
                    url: "/pages/groupBooking/detail?id=" + id + "&forwardUserId=" + userId,
                });
            }
        },
        toAddress() {
            const { latitude, longitude } = this.value;
            uni.getLocation({
                type: "gcj02",
                success: () => {
                    //返回可以用于uni.openLocation的经纬度
                    uni.openLocation({
                        latitude: latitude,
                        longitude: longitude,
                        success: () => {
                            console.log("success");
                        },
                    });
                },
            });
        },
        toName() {
            const { userId, userStatus, isExpert, expertStatus, followfriends, shopId, type } = this.value;
            console.log(userId, userStatus, isExpert, expertStatus, followfriends, shopId);
            if (userStatus === 2) {
                return uni.$u.toast("该用户被冻结");
            } else if (userStatus == 3) {
                return uni.$u.toast("该用户已注销");
            } else if (isExpert === 1) {
                if (expertStatus === 1) {
                    uni.$u.toast("该用户被封禁");
                } else {
                    // 达人转跳
                    uni.navigateTo({
                        url: "/pages/wiseman/component/shopinfo?type=1&userId=" + userId,
                    });
                }
            } else if (followfriends === -1 && type === 4) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/index?id=" + shopId,
                });
            } else if (isExpert === 0) {
                // 不是达人的转跳
                uni.navigateTo({
                    url: "/pages/wiseman/component/shopinfo?type=2&userId=" + userId,
                });
            }
        },
        async setFollowFriends() {
            let { userId, followfriends } = this.value;
            const { code, message } = await this.$request.post("/coc-social/api/v2/article/followExpert", { userId });
            if (code === 200) {
                followfriends = !followfriends;
                uni.$u.toast(followfriends ? "关注成功" : "取关成功");
                this.$emit("setfollowfriends", { userId, followfriends });
            } else {
                uni.$u.toast(message);
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.bottom {
    position: absolute;
    bottom: calc(60rpx + constant(safe-area-inset-bottom));
    bottom: calc(60rpx + env(safe-area-inset-bottom));
    width: 750rpx;

    &-df {
        display: flex;
        align-items: center;
    }

    &-business {
        display: flex;
        align-items: center;
        height: 48rpx;
        background: rgba(0, 0, 0, 0.22);
        border-radius: 10rpx;
        padding-left: 9rpx;
        padding-right: 18rpx;
        margin-left: 25rpx;

        &-image {
            width: 32rpx;
            height: 32rpx;
        }

        &-content {
            max-width: 560rpx;
            margin-left: 14rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    &-groupbuy {
        display: flex;
        align-items: center;
        height: 48rpx;
        background: rgba(0, 0, 0, 0.22);
        border-radius: 10rpx;
        padding-left: 9rpx;
        padding-right: 18rpx;
        margin-left: 25rpx;
        // margin-top: 10rpx;

        &-image {
            width: 32rpx;
            height: 32rpx;
        }

        &-mintitle {
            max-width: 300rpx;
            margin-left: 14rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &-maxtitle {
            max-width: 560rpx;
            margin-left: 14rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    &-location {
        display: flex;
        align-items: center;
        height: 48rpx;

        &-image {
            width: 32rpx;
            height: 32rpx;
            margin-left: 6rpx;
        }

        &-address {
            max-width: 200rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            margin-left: 8rpx;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }

        &-address1 {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #ffffff;
            margin-left: 8rpx;

            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }

    &-unfollowfriends {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36rpx;
        background: #d91b1b;
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-left: 10rpx;
        margin-top: 20rpx;
        padding: 3rpx 20rpx;
    }

    &-followfriends {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36rpx;
        background: #999999;
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-left: 10rpx;
        margin-top: 20rpx;
        padding: 3rpx 20rpx;
    }

    &-name {
        max-width: 600rpx;
        font-size: 36rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        margin-left: 27rpx;
        margin-top: 20rpx;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    &-content {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;

        margin-left: 25rpx;
        margin-right: 25rpx;
        margin-top: 20rpx;

        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
}
.tagClass {
    background: #D91B1B;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    padding: 4rpx 12rpx;
    margin-left: 10rpx;
    margin-top: 20rpx;
}
</style>
