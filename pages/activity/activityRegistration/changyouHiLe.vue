<template>
    <view>
        <view id="search" class="search">
            <view class="search-input">
                <input
                    v-model="search.input"
                    class="search-input-text"
                    :placeholder="search.placeholder"
                    @blur="setSearch"
                />
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693442474478.png"
                    class="search-input-image"
                />
            </view>
            <view class="search-icon">
                <image src="@/static/image/kefu.svg" class="search-icon-image" />
            </view>
        </view>
        <view id="father" class="father">
            <scroll-view class="father-scroll" :scroll-x="true">
                <view v-for="(v, i) in list" :key="v.index" class="father-item" @click.stop="tabClick(i, 'father')">
                    <view :class="father === i ? 'father-text' : 'father-untext'">{{ v.name }}</view>
                    <image
                        v-if="father === i"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698306684056.png"
                        class="father-line"
                    />
                </view>
            </scroll-view>
        </view>
        <view :style="{ height: swiperFatherHeight + 'px' }">
            <swiper :current="father" @change="change">
                <swiper-item v-for="(v, i) in list" :key="v.index">
                    <scroll-view
                        v-if="v.children.length"
                        id="son"
                        class="son-scroll"
                        :scroll-x="true"
                        :scroll-with-animation="true"
                        :scroll-left="scrollLeft"
                    >
                        <view
                            v-for="(val, index) in v.children"
                            :key="val.index"
                            :class="['son-item', `son${i}`]"
                            @click.stop="tabClick(index, 'son')"
                        >
                            <image :src="val.url" :class="son === index ? 'son-item-image' : 'son-item-unimage'" />
                        </view>
                    </scroll-view>
                    <swiper v-if="v.children.length" :current="son" @touchstart="touchstart" @touchend="touchend">
                        <swiper-item v-for="val in v.children" :key="val.index">
                            <scroll-view
                                :style="{ height: swiperSonHeight + 'px' }"
                                :scroll-y="true"
                                :refresher-enabled="true"
                                refresher-default-style="none"
                                :refresher-triggered="val.triggered"
                                @refresherrefresh="refresherrefresh(val)"
                                @refresherrestore="refresherrestore(val)"
                                @scrolltolower="scrolltolower(val)"
                            >
                                <view v-if="val.loadmore === 'loading' || val.children.length">
                                    <view
                                        v-for="(value, index) in val.children"
                                        :key="index"
                                        class="item"
                                        @click="setDetails(value)"
                                    >
                                        <view class="item-top">
                                            <view class="item-flex">
                                                <image :src="value.baseHead" class="item-top-head" />
                                                <view class="item-top-name">{{ value.baseName }}</view>
                                                <!-- <view class="item-top-mark">车友新手力荐</view> -->
                                            </view>
                                            <!-- <view class="item-top-btn">
                                                <view class="item-top-btn-title">+</view>
                                                <view class="item-top-btn-title">关注</view>
                                            </view> -->
                                            <view class="item-top-btn">
                                                <view class="item-top-btn-title" @click.stop="setShopDetails(value)">
                                                    进店
                                                </view>
                                            </view>
                                        </view>
                                        <view v-if="value.type === 1" class="item-width">
                                            <video
                                                v-if="value.adPushUrl"
                                                class="item-width"
                                                :src="value.adPushUrl"
                                                :poster="value.adCoverImg"
                                                style="object-fit: cover"
                                                @click.stop
                                            />
                                            <image
                                                v-else
                                                class="item-width"
                                                :src="value.coverPicture"
                                                style="object-fit: cover"
                                            />
                                            <view
                                                v-if="judgeStatus(value, 'activitySignUpStatus', 1)"
                                                class="item-time"
                                            >
                                                <text class="item-time-text">报名开启时间</text>
                                                {{ value.activityBeginTime }}
                                            </view>
                                            <view
                                                v-if="judgeStatus(value, 'activitySignUpStatus', 2)"
                                                class="item-time"
                                            >
                                                <text class="item-time-text">报名截止时间</text>
                                                {{ value.activityEndTime }}
                                            </view>
                                            <view
                                                v-if="
                                                    (judgeStatus(value, 'activitySignUpStatus', 1) ||
                                                        judgeStatus(value, 'activitySignUpStatus', 2)) &&
                                                    value.districtName
                                                "
                                                class="item-address"
                                            >
                                                {{ value.districtName }}
                                            </view>
                                            <view
                                                v-if="judgeStatus(value, 'activitySignUpStatus', 2)"
                                                class="item-enroll"
                                            >
                                                报名中
                                            </view>

                                            <view
                                                v-if="judgeStatus(value, 'activitySignUpStatus', 1)"
                                                class="item-herald"
                                            >
                                                <image
                                                    src="@/static/image/huodongyugao.png"
                                                    class="item-herald-image"
                                                />
                                            </view>
                                            <view
                                                v-if="
                                                    judgeStatus(value, 'activitySignUpStatus', 3) ||
                                                    judgeStatus(value, 'activitySignUpStatus', 4) ||
                                                    judgeStatus(value, 'activitySignUpStatus', 5)
                                                "
                                                class="item-herald"
                                            >
                                                <image src="@/static/image/jieshu.png" class="item-herald-image" />
                                            </view>
                                        </view>
                                        <view v-if="value.type === 2" class="item-height"></view>
                                        <view class="item-title">
                                            {{ value.title }}
                                        </view>
                                        <view class="item-bottom">
                                            <view class="item-flex">
                                                <view v-if="value.payType === 2" class="item-bottom-unit">￥</view>
                                                <view v-if="value.payType === 2" class="item-bottom-money">
                                                    {{
                                                        value.bankCardPrice ? value.bankCardPrice : value.flashSalePrice
                                                    }}
                                                </view>
                                                <view v-else class="item-bottom-money">免费</view>
                                                <view v-if="value.shopTypeId !== 2" class="item-bottom-cross">
                                                    市场价￥{{
                                                        value.shopTypeId !== 2 && value.mgroupPrice !== 0
                                                            ? value.mgroupPrice
                                                            : value.marketPrice
                                                    }}
                                                </view>
                                            </view>
                                            <view
                                                v-if="value.activitySignUpStatus === 1"
                                                class="item-top-remind"
                                                :class="{ Asreminder: value.isRemind === 1 }"
                                            >
                                                <view class="item-top-remind-title">提醒我</view>
                                            </view>
                                            <view v-else class="item-flex">
                                                <view class="item-bottom-enroll">
                                                    报名剩余: {{ value.saleNum }}/{{ value.stock }}
                                                </view>
                                                <image
                                                    v-for="url in value.headPortraits"
                                                    :key="url"
                                                    :src="url"
                                                    class="item-bottom-image"
                                                />
                                                <view v-if="value.saleNum > 3" class="item-bottom-image">
                                                    <view class="item-bottom-image-drop" />
                                                    <view class="item-bottom-image-drop" />
                                                    <view class="item-bottom-image-drop" />
                                                </view>
                                            </view>
                                        </view>
                                    </view>
                                    <view class="loadmore">
                                        <u-loadmore :status="val.loadmore" />
                                    </view>
                                </view>
                                <view v-else class="blank">
                                    <image
                                        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
                                        class="blank-image"
                                    >
                                    </image>
                                    <view class="blank-title">暂无相关活动</view>
                                </view>
                            </scroll-view>
                        </swiper-item>
                    </swiper>
                    <view v-else class="blank">
                        <image
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
                            class="blank-image"
                        >
                        </image>
                        <view class="blank-title">暂无相关活动</view>
                    </view>
                </swiper-item>
            </swiper>
        </view>
        <request-loading />
    </view>
</template>
<script>
export default {
    data() {
        return {
            search: {
                input: "",
                placeholder: "51车·人车生活俱乐部",
            },
            params: {
                current: 1,
                size: 10,
            },
            list: [
                {
                    index: "18",
                    name: "户外畅游",
                    children: [],
                },
                {
                    index: "17",
                    name: "户内嗨乐",
                    children: [],
                },
            ],
            father: 0,
            son: 0,
            searchHeight: 0,
            fatherHeight: 0,
            sonHeight: 0,
            scrollLeft: 0,
            start: {
                x: 0,
                y: 0,
            },
            homeMenuId: undefined,
            sharedetail: {}
        };
    },
    computed: {
        swiperFatherHeight() {
            const { windowHeight } = uni.getSystemInfoSync();
            return windowHeight - this.searchHeight - this.fatherHeight;
        },
        swiperSonHeight() {
            const { windowHeight } = uni.getSystemInfoSync();
            return windowHeight - this.searchHeight - this.fatherHeight - this.sonHeight;
        },
        judgeStatus() {
            return (item, id, value) => {
                return item[id] === value;
            };
        },
    },
    onLoad(option) {
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        this.getshareimg();
        const { homeMenuId } = option;
        this.homeMenuId = homeMenuId;
        this.getTabList();
    },
    onShareAppMessage(res) {
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/activity/activityRegistration/changyouHiLe?enter=117",
            success(res) {
                uni.showToast({
                    title: "分享成功",
                });
            },
            fail(res) {
                uni.showToast({
                    title: "分享失败",
                    icon: "none",
                });
            },
        };
    },
    onShareTimeline(res) {
        //分享到朋友圈
        let title = this.sharedetail.shareTitle;
        let imageUrl = this.sharedetail.shareImg;
        return {
            title: title,
            imageUrl: imageUrl,
            path: "/pages/activity/activityRegistration/changyouHiLe?enter=117",
            success(res) {
                uni.showToast({
                    title: "分享成功",
                });
            },
            fail(res) {
                uni.showToast({
                    title: "分享失败",
                    icon: "none",
                });
            },
        };
    },
    methods: {
        getshareimg() {
            this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/36").then((res) => {
                this.sharedetail = res.data;
            });
        },
        getElementHeight(id, name) {
            const query = uni.createSelectorQuery().in(this);
            query
                .select(id)
                .boundingClientRect((res) => {
                    if (res) {
                        this[name] = res.height;
                    }
                })
                .exec();
        },
        async getTabList() {
            const list = JSON.parse(JSON.stringify(this.list));
            const children = [];
            const { data } = await this.$request.post("/coc-active/api/v2/homePage/shopCategoryList", {
                type: 2,
                parentId: list[this.father].index,
            });
            data.forEach((v) => {
                const { shopCategoryId, shopCategoryName, icon } = v;
                children.push({
                    index: list[this.father].index + "-" + shopCategoryId,
                    id: shopCategoryId,
                    name: shopCategoryName,
                    url: icon,
                    triggered: true,
                    loadmore: "loading",
                    children: [],
                    total: 99999,
                });
            });
            list.forEach((v) => {
                if (v.index === list[this.father].index) {
                    children.unshift({
                        index: list[this.father].index + "-" + 0,
                        id: "",
                        name: "推荐",
                        url: "https://oss.dcqcjlb.com/51che_java_dev/20240125/88b35e6968bc412fa8b9cfd629d30efe.png",
                        triggered: true,
                        loadmore: "loading",
                        children: [],
                        total: 99999,
                    });
                    v.children = children;
                }
            });
            this.list = list;
            this.$nextTick(() => {
                this.getElementHeight("#search", "searchHeight");
                this.getElementHeight("#father", "fatherHeight");
                this.getElementHeight("#son", "sonHeight");
            });
            this.getList();
        },
        async getList() {
            const list = JSON.parse(JSON.stringify(this.list));
            const { id, children } = list[this.father].children[this.son];
            const { current, size } = this.params;
            const {
                data: {
                    homePageActivitysVOIPage: { records, total },
                },
            } = await this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
                payType: 0,
                shopTypeId: 1,
                shopCategoryId: id,
                current: current,
                size: size,
                title: this.search.input,
                newUserLimit: 0,
                property: this.father + 1,
                homeMenuId: this.homeMenuId,
            });
            records.forEach((v) => {
                children.push(Object.assign(v, { type: 1 }));
            });
            list[this.father].children.forEach((v) => {
                if (v.index === list[this.father].children[this.son].index) {
                    v.children = children;
                    v.total = total;
                    if (current * size >= total) {
                        v.loadmore = "nomore";
                    } else {
                        v.loadmore = "loadmore";
                    }
                }
            });
            this.list = list;
        },
        async tabClick(index, name) {
            this[name] = index;
            if (name === "father") {
                this.son = 0;
            } else if (name === "son") {
                await this.getList();
            }
            this.moveTo(this.son);
        },
        async change({ detail: { current } }) {
            this.father = current;
            this.son = 0;
            await this.getTabList();
        },
        touchstart(e) {
            this.start.x = e.changedTouches[0].clientX;
            this.start.y = e.changedTouches[0].clientY;
        },
        async touchend(e) {
            const x = this.start.x - e.changedTouches[0].clientX;
            const y = this.start.y - e.changedTouches[0].clientY;
            if ((x < 100 && x > -100) || (y > 20 && y < -20)) {
                return;
            }
            if (x > 0) {
                this.son++;
            } else {
                this.son--;
            }
            const son_length = this.list[this.father].children.length;
            if (this.father === 0 && this.son === son_length) {
                this.father++;
                this.son = 0;
            } else if (this.father > 0 && this.son === -1) {
                this.father--;
                this.son = this.list[this.father].children.length - 1;
            } else if (this.son === son_length) {
                this.son--;
            } else if (this.son === -1) {
                this.son++;
            } else {
                await this.getList();
            }
            this.moveTo(this.son);
        },
        moveTo(index) {
            const query = uni.createSelectorQuery().in(this);
            query
                .selectAll(`.son${this.father}`)
                .boundingClientRect((res) => {
                    const { windowWidth } = uni.getSystemInfoSync(); //获取屏幕宽度
                    let width = 0;
                    // 循环获取计算当前点击的标签项距离左侧的距离
                    for (let i = 0; i < index; i++) {
                        width += res[i].width;
                    }
                    // 当大于屏幕一半的宽度则滚动，否则就设置位置为0
                    if (width > windowWidth / 2) {
                        this.scrollLeft = width + res[index].width / 2 - windowWidth / 2;
                    } else {
                        this.scrollLeft = 0;
                    }
                    this.$nextTick(() => {
                        this.son = index;
                    });
                })
                .exec();
        },
        async refresherrefresh(value) {
            value.children = [];
            value.total = 99999;
            value.loadmore = "loading";
            value.triggered = false;
            await this.getList();
        },
        refresherrestore(value) {
            value.triggered = true;
        },
        async scrolltolower(value) {
            const { current, size } = this.params;
            if (current * size >= value.total) {
                return;
            }
            this.params.current++;
            value.loadmore = "loading";
            await this.getList();
        },
        setSearch() {
            this.refresherrefresh(this.list[this.father].children[this.son]);
        },
        setDetails(value) {
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
        setShopDetails(value) {
            if (value.shopTypeId === 2) {
                uni.navigateTo({
                    url: "/pages/carShops/4Sdetail/index?id=" + value.shopId,
                });
            } else if (value.shopTypeId === 3) {
                uni.navigateTo({
                    url: "/pages/activityMall/business/index?id=" + value.shopId + "&relatedType=1",
                });
            }
        },
    },
};
</script>
<style lang="scss" scoped>
.search {
    display: flex;
    width: 100vw;
    background: #ffffff;

    &-input {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 64rpx;
        background: #f8f8f8;
        border-radius: 32rpx;
        margin: 10rpx 10rpx 0;

        &-text {
            width: 580rpx;
            height: 64rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            padding-left: 28rpx;
        }

        &-image {
            width: 30rpx;
            height: 31rpx;
            margin-right: 28rpx;
        }
    }

    &-icon {
        &-image {
            width: 37rpx;
            height: 37rpx;
            margin-top: 21rpx;
            margin-right: 10rpx;
        }
    }
}

.father {
    width: 100vw;
    background: #ffffff;
    border-radius: 0rpx 0rpx 20rpx 20rpx;

    &-scroll {
        margin-left: 165rpx;
    }

    &-item {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 210rpx;
        height: 80rpx;
    }

    &-text {
        font-size: 32rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36rpx;
    }

    &-untext {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 36rpx;
    }

    &-line {
        width: 24rpx;
        height: 6rpx;
        margin-top: 10rpx;
    }
}

.son {
    &-scroll {
        white-space: nowrap;
        margin-left: 10rpx;
        width: 740rpx;
    }

    &-item {
        display: inline-flex;
        vertical-align: top;
        width: 148rpx;
        height: 120rpx;

        &-image {
            width: 138rpx;
            height: 100rpx;
            border-radius: 10rpx;
            margin: 10rpx 10rpx 10rpx 0;
            border: 3rpx solid rgba(217, 27, 27, 1);
            // filter: drop-shadow(1px 1px 1px rgba(217, 27, 27, 0.4));
        }

        &-unimage {
            width: 138rpx;
            height: 100rpx;
            border-radius: 10rpx;
            margin: 10rpx 10rpx 10rpx 0;
        }
    }
}

.list {
    height: 100%;
}

.item {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 0 10rpx 10rpx;

    &-flex {
        display: flex;
        align-items: center;
    }

    &-df {
        display: flex;
    }

    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 82rpx;

        &-head {
            width: 40rpx;
            height: 40rpx;
            border-radius: 20rpx;
            margin-left: 10rpx;
        }

        &-name {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 36rpx;
            margin-left: 5rpx;
        }

        &-mark {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 112rpx;
            height: 28rpx;
            background: linear-gradient(142deg, #fde1c9, #eab999);
            border-radius: 14rpx;
            font-size: 16rpx;
            font-family: CKTKingKong;
            font-weight: bold;
            color: #582c12;
            line-height: 36rpx;
            margin-left: 10rpx;
        }

        &-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 94rpx;
            height: 40rpx;
            background: #d91b1b;
            border-radius: 20rpx;
            margin-right: 10rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 40rpx;
                margin: 0 2rpx;
            }
        }

        &-remind {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 160rpx;
            height: 40rpx;
            background: #d91b1b;
            border-radius: 20rpx;
            margin-right: 10rpx;

            &-title {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                line-height: 40rpx;
                margin: 0 2rpx;
            }
        }
    }

    &-width {
        position: relative;
        width: 730rpx;
        height: 416rpx;
        background: #6a6a6a;
        border-radius: 10rpx;
    }

    &-height {
        position: relative;
        width: 480rpx;
        height: 580rpx;
        background: #6a6a6a;
        border-radius: 10rpx;
    }

    &-time {
        position: absolute;
        top: 20rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 52rpx;
        background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
        border-radius: 0rpx 24rpx 28rpx 0rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 40rpx;
        padding: 0 30rpx 0 14rpx;

        &-text {
            margin-right: 14rpx;
        }
    }

    &-address {
        position: absolute;
        bottom: 20rpx;
        left: 20rpx;
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
        line-height: 40rpx;
    }

    &-enroll {
        position: absolute;
        bottom: 20rpx;
        right: 20rpx;
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
        line-height: 40rpx;
    }

    &-herald {
        position: absolute;
        left: 260rpx;
        top: 110rpx;

        &-image {
            width: 180rpx;
            height: 180rpx;
        }
    }

    &-title {
        width: 715rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 40rpx;
        margin-left: 10rpx;
        margin: 14rpx 5rpx 12rpx 10rpx;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8rpx 20rpx 10rpx;

        &-unit {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #d91b1b;
            line-height: 20rpx;
            margin-top: 10rpx;
        }

        &-money {
            font-size: 40rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #d91b1b;
            line-height: 40rpx;
            margin-left: 7rpx;
        }

        &-cross {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            text-decoration: line-through;
            color: #999999;
            line-height: 24rpx;
            margin-left: 10rpx;
            margin-top: 7rpx;
        }

        &-enroll {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-right: 14rpx;
        }

        &-image {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40rpx;
            height: 40rpx;
            background: #f8f8f8;
            border-radius: 20rpx;
            margin: 0 2rpx;

            &-drop {
                width: 6rpx;
                height: 6rpx;
                background: #999999;
                border-radius: 3rpx;
                margin: 0 2rpx;
            }
        }
    }
}

.loadmore {
    width: 750rpx;
    height: 300rpx;
}

.blank {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &-image {
        width: 423rpx;
        height: 324rpx;
        margin-top: 100rpx;
    }

    &-title {
        color: #606266;
    }
}

.Asreminder {
    background: #999999;
}

swiper {
    height: 100%;
}
</style>
