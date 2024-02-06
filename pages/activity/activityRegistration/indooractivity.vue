<template>
    <view class="page">
        <view class="bgfff page_top">
            <search :fromType="'户内'" :isIcon="1" @getValue="getValue" :isBgf="true"></search>
            <view class="tabs">
                <view class="tabs-list">
                    <view class="tabs-item">
                        <view class="tabs-item-left">
                            <view class="tabs-item-view" @click="getStatus(true)">
                                <view :class="status ? 'tabs-item-title' : 'tabs-item-untitle'">精选活动</view>
                                <image
                                    v-show="status"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698392764793.png"
                                    class="tabs-item-image"
                                />
                            </view>
                        </view>
                    </view>
                    <view class="tabs-item">
                        <view class="tabs-item-right">
                            <view class="tabs-item-view" @click="getStatus(false)">
                                <view :class="!status ? 'tabs-item-title' : 'tabs-item-untitle'">更多玩乐</view>
                                <image
                                    v-show="!status"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698392764793.png"
                                    class="tabs-item-image"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view>
                <view class="line"></view>
            </view>
            <view v-if="statusList.length" class="flex jsb alc tabListTop">
                <scroll-view style="width: 670rpx; padding-left: 10rpx; white-space: nowrap" scroll-x="true">
                    <view class="flex">
                        <view
                            v-for="item in statusList"
                            :key="item.id"
                            style="margin-right: 20rpx"
                            class="shop-btn"
                            :class="{ 'shop-btn-s': currentTabId == item.id, allbtn: item.shopId == 0 }"
                            @click="OnClickStatus(item)"
                            >{{ item.name }}</view
                        >
                    </view>
                </scroll-view>
                <u-icon name="arrow-down" @click="lookMoreTab"></u-icon>
            </view>
        </view>
        <view>
            <template v-if="status">
                <view style="margin: 20rpx" v-if="dataList.length">
                    <view
                        v-for="(item, index) in dataList"
                        :key="index"
                        style="margin-top: 20rpx"
                        @click="OnPushDetail(item)"
                    >
                        <view class="coverPicture_div">
                            <video
                                v-if="item.adPushUrl"
                                class="coverPicture"
                                :src="item.adPushUrl"
                                :poster="item.adCoverImg"
                                style="object-fit: cover"
                                @click.stop
                            ></video>
                            <image
                                v-else
                                class="coverPicture"
                                :src="item.coverPicture"
                                style="object-fit: cover"
                            ></image>
                            <view
                                class="s_ghbox"
                                v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2"
                            >
                                <text v-if="item.activitySignUpStatus == 2" style="margin-right: 14rpx"
                                    >报名截止时间</text
                                >
                                <text style="margin-right: 14rpx" v-if="item.activitySignUpStatus == 1"
                                    >报名开启时间</text
                                >{{ item.activitySignUpStatus == 2 ? item.activityEndTime : item.activityBeginTime }}
                            </view>
                            <view
                                v-if="
                                    (item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2) &&
                                    item.districtName
                                "
                                class="backimg"
                            >
                                <view style="font-size: 24rpx; color: #ffffff">
                                    {{ item.districtName }}
                                </view>
                            </view>
                            <view
                                style="position: absolute; left: 260rpx; top: 110rpx"
                                v-if="item.activitySignUpStatus == 1"
                            >
                                <image
                                    src="@/static/image/huodongyugao.png"
                                    style="width: 180rpx; height: 180rpx"
                                ></image>
                            </view>
                            <view
                                style="position: absolute; left: 260rpx; top: 110rpx"
                                v-if="
                                    item.activitySignUpStatus == 3 ||
                                    item.activitySignUpStatus == 5 ||
                                    item.activitySignUpStatus == 4
                                "
                            >
                                <image src="@/static/image/jieshu.png" style="width: 180rpx; height: 180rpx"></image>
                            </view>
                            <view
                                style="position: absolute; bottom: 24rpx; right: 27rpx"
                                v-if="item.activitySignUpStatus == 2"
                            >
                                <view class="btn">报名中</view>
                            </view>
                        </view>
                        <view class="activity_title moreLine size28">
                            {{ item.title }}
                        </view>
                        <view class="item-detail">
                            <view v-if="item.payType == 2">
                                <text style="color: #d91b1b; font-size: 24rpx"> ¥ </text>
                                <text style="color: #d91b1b; font-size: 32rpx; font-weight: bold; margin-left: 9rpx">
                                    {{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
                                </text>
                                <view style="display: inline-table; position: relative; top: 10rpx" class="ml10">
                                    <view class="u-flex" v-if="isExpert == 1 && token && item.maxCommissionPrice">
                                        <view class="u-flex">
                                            <view class="rebate-img rebate-size"></view>
                                        </view>
                                        <view
                                            class="rebate-style"
                                            style="margin-right: 24rpx"
                                            v-if="item.maxCommissionPrice > item.minCommissionPrice"
                                        >
                                            {{ item.maxCommissionPrice }}
                                        </view>
                                        <view class="rebate-style" style="margin-right: 24rpx" v-else>
                                            {{ item.minCommissionPrice }}
                                        </view>
                                    </view>
                                </view>
                                <text style="color: #999999; font-size: 24rpx; text-decoration: line-through">
                                    <text v-if="item.shopTypeId != 2" style="margin-right: 10rpx">M团价</text
                                    ><text
                                        >¥{{
                                            item.shopTypeId != 2 && item.mgroupPrice != 0
                                                ? item.mgroupPrice
                                                : item.marketPrice
                                        }}</text
                                    >
                                </text>
                            </view>
                            <view v-else>
                                <text style="color: #d91b1b; font-size: 32rpx; font-weight: bold"> 免费 </text>
                                <text
                                    style="
                                        color: #999999;
                                        font-size: 24rpx;
                                        text-decoration: line-through;
                                        margin-left: 14rpx;
                                    "
                                >
                                    <text v-if="item.shopTypeId != 2" style="margin-right: 10rpx">M团价</text
                                    ><text
                                        >¥{{
                                            item.shopTypeId != 2 && item.mgroupPrice != 0
                                                ? item.mgroupPrice
                                                : item.marketPrice
                                        }}</text
                                    >
                                </text>
                            </view>
                            <view
                                @click.stop="Onremind(item, index)"
                                class="remind"
                                v-if="item.activitySignUpStatus == 1"
                                :class="{ Asreminder: item.isRemind == 1 }"
                            >
                                提醒我
                            </view>
                            <view class="headPortraits" v-else>
                                <view style="margin-right: 16rpx">
                                    已报名<text style="margin-left: 9rpx">{{ item.saleNum }}/{{ item.stock }}</text>
                                </view>
                                <view class="u-flex">
                                    <view
                                        style="padding-right: 4rpx"
                                        v-for="(item1, index1) in item.headPortraits"
                                        :key="index1"
                                    >
                                        <u-avatar size="40rpx" :src="item1"></u-avatar>
                                    </view>
                                    <view v-if="item.saleNum > 3">
                                        <u-icon size="16" :bold="true" name="more-dot-fill"></u-icon>
                                    </view>
                                </view>
                            </view>
                        </view>
                        <view class="flex alc mt10" v-if="item.baseName">
                            <image
                                class="shop-image"
                                src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"
                            />
                            <view class="ml10 txtLighGray size24">{{ item.baseName }}</view>
                            <view v-if="item.cbBaseName" class="txtLighGray size24">&{{ item.cbBaseName }}</view>
                        </view>
                    </view>
                </view>
                <view class="tac mt50" v-else>
                    <image
                        style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
                    >
                    </image>
                    <view class="txtDarkGray">暂无相关活动</view>
                </view>
            </template>
            <template v-if="!status">
                <view v-if="dataList.length">
                    <view v-for="(item, index) in dataList" :key="index" class="card-list" @click="OnPush(item)">
                        <view class="flex" style="position: relative">
                            <view class="size24 txtLighGray" style="position: absolute; right: 20rpx">
                                {{ item.distanceMsg }}
                            </view>
                            <view>
                                <view class="size32 fwb title oneLine">{{ item.baseName }}</view>
                                <view class="flex alc" style="color: #d91b1b">
                                    <image
                                        v-for="(item, index) in item.star"
                                        :key="index"
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698717060730.png"
                                        style="width: 24rpx; height: 24rpx; margin-right: 5rpx"
                                    ></image>
                                    <text style="margin-left: 5rpx; font-size: 24rpx; font-weight: 400">{{
                                        item.starStr
                                    }}</text>
                                </view>
                            </view>
                        </view>
                        <view v-if="item.storeLabelMsg">
                            <text class="tag-item size24" v-for="(m, i) in item.storeLabelMsg" :key="i">{{ m }}</text>
                        </view>
                        <view class="tag_line"></view>
                        <view v-if="item.shopActivityVO.length === 0" class="flex mt20" style="margin-left: -7rpx">
                            <scroll-view scroll-x="true">
                                <view style="display: flex">
                                    <view
                                        v-for="(item1, index1) in item.doorheadPhotoMsg"
                                        :key="index1"
                                        style="margin-right: 10rpx"
                                    >
                                        <image
                                            :src="item1"
                                            style="
                                                margin-right: 7rpx;
                                                width: 223rpx;
                                                height: 160rpx;
                                                border-radius: 10rpx;
                                            "
                                        >
                                        </image>
                                    </view>
                                </view>
                            </scroll-view>
                        </view>
                        <view class="item_div">
                            <view
                                class="item flex"
                                v-for="(item1, index1) in item.shopActivityVO"
                                :key="index1"
                                @click.stop="OnPushDetail(item1)"
                            >
                                <image class="img" :src="item1.coverPicture" mode="aspectFill"></image>
                                <view class="item_right">
                                    <view class="item_title_div moreLine">
                                        <image
                                            class="tg_icon"
                                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699868485617.png"
                                        >
                                        </image>
                                        <text class="item_title">{{ item1.title }}</text>
                                    </view>
                                    <view
                                        class="item_label_div"
                                        :style="{ 'margin-top': item1.tagNamesMsg ? '0' : '10rpx' }"
                                    >
                                        <text v-for="(m, i) in item1.tagNamesMsg" :key="i" class="item_label">{{
                                            m
                                        }}</text>
                                    </view>
                                    <view class="item_sign_num"
                                        >已报名{{ item1.signUpCount }}/{{ item1.allStock }}</view
                                    >
                                    <view class="item_bottom flex jsb">
                                        <view>
                                            <text class="prefix">￥</text>
                                            <text class="txt1">{{
                                                item1.specialPrice ? item1.specialPrice : item1.flashSalePrice
                                            }}</text>
                                            <text class="txt2" v-if="item1.shopTypeId != 2">M团价</text>
                                            <text class="txt2"
                                                >￥{{
                                                    item1.shopTypeId != 2 && item1.mgroupPrice != 0
                                                        ? item1.mgroupPrice
                                                        : item1.marketPrice
                                                }}</text
                                            >
                                        </view>
                                        <image
                                            class="btn_img"
                                            src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699868513276.png"
                                        >
                                        </image>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="tac mt50" v-else>
                    <image
                        style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
                    >
                    </image>
                    <view class="txtDarkGray">暂无相关商家</view>
                </view>
            </template>
        </view>
        <view style="height: 50rpx"></view>
        <u-popup :show="showTabs" @close="closetabs" :safeAreaInsetBottom="false" :safeAreaInsetTop="false" mode="top">
            <view class="tabBox">
                <view class="selectIcon flex" style="padding: 25rpx; justify-content: flex-end">
                    <u-icon name="arrow-up" color="#222222" @click="closetabs"></u-icon>
                </view>
                <view class="flex alc u-flex-wrap">
                    <view
                        v-for="item in statusList"
                        class="popBtn tac bgf8 br10"
                        @click="OnClickStatus(item)"
                        :key="item.id"
                        :style="{
                            color: currentTabId == item.id ? '#D91B1B' : '#222222',
                            background: currentTabId == item.id ? '#FFF1F1' : '#F8F8F8',
                        }"
                    >
                        <text class="ellipsis">{{ item.name }}</text>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import search from "@/components/search/index.vue";
import { tologin } from "@/utils/index.js";
import pushclosedactivity from "../components/pushclosedactivity.vue";
export default {
    components: {
        pushclosedactivity,
        search,
    },
    data() {
        return {
            showTabs: false,
            statusList: [],
            currentTabId: null,
            isLoadMore: false,
            current: 1,
            dataList: [],
            keyword: "",
            status: true,
        };
    },

    onLoad(option) {
        this.getStatus(true);
    },
    onShow() {
        // this.getStatus(this.status)
    },
    onReachBottom() {
        if (!this.isLoadMore) {
            this.current++;
            if (this.status) {
                this.getactivity();
            } else {
                this.getmoreactivity();
            }
        }
    },
    methods: {
        //切换选项
        getStatus(value) {
            this.status = value;
            this.currentTabId = null;
            this.statusList = [];
            if (value) {
                this.getTabList();
            } else {
                this.getMoreTabList();
            }
            this.tosearch();
        },
        //搜索
        getValue(msg) {
            this.keyword = msg;
            this.tosearch();
        },
        //精选活动分类
        getTabList() {
            this.$request
                .post("/coc-active/api/v2/homePage/shopCategoryList", { type: 2, parentId: 17 })
                .then((res) => {
                    res.data = res.data.map((m) => {
                        return {
                            name: m.shopCategoryName,
                            id: m.shopCategoryId,
                        };
                    });
                    if (res.data.length) {
                        res.data.unshift({
                            name: "推荐",
                            id: null,
                        });
                    }
                    this.statusList = res.data;
                });
        },
        //更多玩乐分类
        getMoreTabList() {
            this.$request.post("/coc-active/api/v2/homePage/shopCategoryList", { parentId: 17 }).then((res) => {
                res.data = res.data.map((m) => {
                    return {
                        name: m.shopCategoryName,
                        id: m.shopCategoryId,
                    };
                });
                if (res.data.length) {
                    res.data.unshift({
                        name: "推荐",
                        id: null,
                    });
                }
                this.statusList = res.data;
            });
        },
        lookMoreTab() {
            this.showTabs = true;
        },
        closetabs() {
            this.showTabs = false;
        },
        OnClickStatus(e) {
            this.currentTabId = e.id;
            this.showTabs = false;
            this.tosearch();
        },
        tosearch() {
            this.isLoadMore = false;
            this.current = 1;
            this.dataList = [];
            if (this.status) {
                this.getactivity();
            } else {
                this.getmoreactivity();
            }
        },
        OnPush(item) {
            uni.navigateTo({
                url: "/pages/activityMall/business/index?id=" + item.shopId,
            });
        },
        Onremind(item, index) {
            tologin();
            let _this = this;
            if (item.isRemind == 1) {
                return false;
            }
            uni.requestSubscribeMessage({
                tmplIds: ["jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q"],
                success(res) {
                    if (res["jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q"] == "accept") {
                        _this.$request
                            .get("/coc-active/api/v1/activity/signUpStartRemind/" + item.activityId)
                            .then((s) => {
                                if (s.code == 200) {
                                    this.dataList[index].isRemind = 1;
                                    uni.showToast({
                                        icon: "none",
                                        title: "提醒成功，请等待通知",
                                    });
                                } else {
                                    uni.showToast({
                                        icon: "none",
                                        title: s.message,
                                    });
                                }
                            });
                    }
                },
            });
        },
        OnPushDetail(item) {
            if (item.shopTypeId === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + item.activityId,
                });
            } else {
                uni.navigateTo({
                    url: "/pages/home/activityDetail/index?id=" + item.activityId,
                });
            }
        },
        //获取精选活动列表
        getactivity() {
            this.$newrequest
                .post("/coc-active/api/v2/homePage/getActivitysV2", {
                    current: this.current,
                    payType: 0,
                    property: 2,
                    shopTypeId: 1,
                    shopCategoryId: this.currentTabId,
                    size: 20,
                    title: this.keyword,
                    newUserLimit: 0,
                })
                .then((res) => {
                    if (res.code == 200) {
                        if (res.data.homePageActivitysVOIPage.records.length < 20) {
                            this.isLoadMore = true;
                        }
                        if (this.current === 1) {
                            this.dataList = res.data.homePageActivitysVOIPage.records;
                        } else {
                            res.data.homePageActivitysVOIPage.records.filter((s) => {
                                this.dataList.push(s);
                            });
                        }
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                });
        },
        //获取更多玩乐列表
        getmoreactivity() {
            this.$newrequest
                .post("/coc-active/api/v2/homePage/shopList", {
                    current: this.current,
                    shopCategoryId: this.currentTabId,
                    size: 10,
                    keyword: this.keyword,
                    parentId: 17,
                })
                .then((res) => {
                    if (res.code == 200) {
                        res.data.records.filter((s) => {
                            s.shopActivityVO = s.shopActivityVO.slice(0, 2);
                        });

                        if (res.data.records.length < 10) {
                            this.isLoadMore = true;
                        }
                        if (res.data.current == 1) {
                            this.dataList = res.data.records;
                        } else {
                            res.data.records.filter((s) => {
                                this.dataList.push(s);
                            });
                        }
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: "none",
                            duration: 2000,
                        });
                    }
                });
        },
    },
};
</script>

<style lang="scss" scoped>
.tabListTop {
    border-radius: 0 0 20rpx 20rpx;
    padding: 0 25rpx 10rpx 10rpx;
}

.tabBox {
    padding: 20rpx;

    .popBtn {
        width: 170rpx;
        height: 62rpx;
        line-height: 62rpx;
        font-size: 28rpx;
        margin-right: 10rpx;
        margin-bottom: 20rpx;
    }

    .popBtn:nth-child(4n) {
        margin-right: 0;
    }
}

.page_top {
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
}

.line {
    height: 1rpx;
    background: #f8f8f8;
    width: 730rpx;
}

.tabs {
    position: relative;
    width: 750rpx;
    background: #ffffff;

    &-list {
        display: flex;
        padding-bottom: 14rpx;
    }

    &-item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 375rpx;

        &-title {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
        }

        &-image {
            width: 24rpx;
            height: 6rpx;
            margin-top: 10rpx;
        }

        &-untitle {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
        }

        &-left {
            display: flex;
            justify-content: flex-end;
            width: 285rpx;
            margin-right: 90rpx;
        }

        &-right {
            display: flex;
            margin-left: 90rpx;
        }

        &-view {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
}

.kefu-contact {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
}

button::after {
    border: initial;
}

.coverPicture_div {
    width: 700rpx;
    height: 400rpx;
    border-radius: 10rpx;
    position: relative;
}

.coverPicture {
    width: 700rpx;
    height: 400rpx;
    border-radius: 10rpx;
}

.s_ghbox {
    line-height: 52rpx;
    font-size: 24rpx;
    color: #ffffff;
    padding-left: 14rpx;
    border-radius: 0rpx 24rpx 28rpx 0rpx;
    position: absolute;
    top: 30rpx;
    padding-right: 20rpx;
    height: 52rpx;
    background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
}

.backimg {
    position: absolute;
    bottom: 18rpx;
    left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgb(34 34 34 / 0.5);
    background-color: rgba(34, 34, 34, 0.5);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    width: 120rpx;
    height: 52rpx;
}

.btn {
    width: 120rpx;
    height: 52rpx;
    text-align: center;
    background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    line-height: 52rpx;
    color: #ffffff;
}

.activity_title {
    margin-top: 15rpx;
}

.item-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 5rpx;
    align-items: center;
    margin-right: 26rpx;
}

.remind {
    width: 160rpx;
    height: 52rpx;
    border-radius: 26rpx;
    color: #ffffff;
    font-size: 28rpx;
    text-align: center;
    background: #d91b1b;
    line-height: 52rpx;
}

.Asreminder {
    background-color: #999999;
}

.headPortraits {
    display: flex;
    align-items: center;
    font-size: 24rpx;
}

.tab {
    .tab_inner {
        padding: 0 30rpx 0 30rpx;

        .tab_item {
            width: 140rpx;
            text-align: center;
        }

        .tab_item_sel {
            font-size: 28rpx;
            font-weight: bold;
            color: #222222;
        }

        .tab_item_nosel {
            font-size: 28rpx;
            font-weight: 500;
            color: #222222;
        }

        .tab_line {
            width: 33rpx;
            height: 6rpx;
            background: #f70000;
            border-radius: 3rpx;
            margin-left: 54rpx;
            margin-top: 14rpx;
        }

        .tab_tran1 {
            transform: translate(0, 0);
            transition: 0.5s;
        }

        .tab_tran2 {
            transform: translate(183rpx, 0);
            transition: 0.5s;
        }

        .tab_tran3 {
            transform: translate(366rpx, 0);
            transition: 0.5s;
        }

        .tab_tran4 {
            transform: translate(549rpx, 0);
            transition: 0.5s;
        }
    }
}

.recommend {
    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750rpx;
        height: 103rpx;

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
        background: #ffffff;
        margin-bottom: 10rpx;

        &-video {
            position: absolute;
            width: 82rpx;
            height: 82rpx;
            margin-top: 187rpx;
            margin-left: 130rpx;
        }

        &-image {
            width: 342rpx;
            height: 456rpx;
            background: #000000;
            border-radius: 10rpx;
        }

        &-bottom {
            width: 342rpx;
            border-radius: 0rpx 0rpx 10rpx 10rpx;
            padding-top: 20rpx;
            padding-bottom: 10rpx;

            &-title {
                width: 306rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 18rpx;
                margin-left: 14rpx;
                margin-right: 20rpx;
            }

            &-image {
                width: 40rpx;
                height: 40rpx;
                margin-left: 15rpx;
                border-radius: 20rpx;
            }

            &-name {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 38rpx;
                margin-left: 10rpx;
            }

            &-check {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 38rpx;
                margin-right: 20rpx;
            }
        }
    }

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}

.card-list {
    background: #ffffff;
    border-radius: 10rpx;
    padding: 20rpx 10rpx 20rpx 20rpx;
    margin: 33rpx 10rpx 0 10rpx;

    .title {
        width: 550rpx;
    }

    .tag-item {
        border-radius: 10rpx;
        background-color: rgba(217, 27, 27, 0.1);
        color: #d91b1b;
        padding: 8rpx 13rpx 7rpx 11rpx;
        display: inline-block;
        margin-right: 10rpx;
        margin-top: 10rpx;
    }

    .tag_line {
        height: 1rpx;
        background: #e8e8e8;
        width: 690rpx;
        margin-top: 20rpx;
    }

    .item_div {
    }

    .item {
        margin-top: 20rpx;

        .img {
            width: 230rpx;
            height: 230rpx;
            border-radius: 10rpx;
        }

        .item_right {
            margin-left: 20rpx;
        }

        .item_title_div {
            width: 450rpx;
            height: 80rpx;
            line-height: 40rpx;

            .tg_icon {
                width: 58rpx;
                height: 32rpx;
                margin-right: 10rpx;
                position: relative;
                top: 4px;
            }

            .item_title {
                font-size: 28rpx;
                color: #222222;
            }
        }

        .item_label_div {
            min-height: 38rpx;

            .item_label {
                background: rgba(217, 27, 27, 0.1);
                border-radius: 10rpx;
                padding: 8rpx 11rpx 7rpx 11rpx;
                font-size: 24rpx;
                color: #d91b1b;
                display: inline-block;
                margin-top: 10rpx;
                margin-right: 10rpx;
            }
        }

        .item_sign_num {
            font-size: 24rpx;
            color: #999999;
            margin-top: 10rpx;
        }

        .item_bottom {
            align-items: flex-end;

            .prefix {
                font-size: 28rpx;
                color: #d91b1b;
                font-weight: 500;
            }

            .txt1 {
                font-size: 36rpx;
                color: #d91b1b;
                font-weight: 500;
            }

            .txt2 {
                font-size: 24rpx;
                text-decoration: line-through;
                color: #999999;
                margin-left: 9rpx;
            }

            .btn_img {
                width: 143rpx;
                height: 53rpx;
            }
        }
    }
}

.card-list:first-child {
    margin-top: 20rpx;
}

.shop-btn {
    color: #999999;
    font-size: 28rpx;
    padding: 10rpx;
}

.shop-btn-s {
    font-weight: bold;
    color: #222222;
}

.allbtn {
    width: 80rpx;
}

.shop-image {
    width: 30rpx;
    height: 30rpx;
}
</style>
