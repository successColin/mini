<template>
    <view @click.stop="toSearch">
        <view :class="{ whiteBg: isBgf === true }" :style="{ 'border-radius': radius + 'rpx' }">
            <view :class="{ haveKefu: isIcon === 1 }" class="mt10" :style="{ 'margin-top': marginTop + 'rpx' }">
                <view class="searchTop flex">
                    <swiper :vertical="true" duration="1000" :circular="true" class="swiperBox" :autoplay="autoplay">
                        <swiper-item v-for="(item, index) in txtList" :key="index">
                            <input
                                type="text"
                                :placeholder="searchShow ? searchShow : item"
                                v-model="searchValue"
                                @focus.stop="onFocus(item)"
                                @blur.stop="onBlur(item)"
                                @confirm.stop="OnPushSearch"
                            />
                        </swiper-item>
                    </swiper>
                    <view class="searchBtn">
                        <u-icon name="search" @click.stop="OnPushSearch"></u-icon>
                    </view>
                </view>
                <button open-type="contact" session-from="" class="kefu-contact" v-if="isIcon">
                    <image src="@/static/image/kefu.svg"></image>
                </button>
            </view>
        </view>
    </view>
</template>
<script>
import search from "@/components/search/index.vue";
export default {
    components: {
        search,
    },
    props: {
        fromType: String,
        isIcon: Number,
        isBgf: Boolean,
        radius: {
            type: Number,
            default: 0,
        },
        marginTop: {
            type: Number,
            default: 10,
        },
    },
    data() {
        return {
            txtList: [],
            searchValue: "",
            searchShow: "",
            autoplay: true,
        };
    },
    created() {
        if (this.fromType == "4s逛逛") {
            this.txtList = [
                "51车·人车生活俱乐部",
                "故障咨询有点灵",
                "道路救援有点快",
                "保养预约有点准",
                "搜索品牌4S店",
            ];
        } else if (this.fromType == "玩乐") {
            this.txtList = ["51车·人车生活俱乐部", "吃喝玩乐有点嗨", "搜索精选活动", "搜索商家名称，如乐园"];
        } else if (this.fromType == "优惠团购") {
            this.txtList = ["51车·人车生活俱乐部", "官方补贴有点多", "搜索活动商品全网官方补贴"];
        } else if (this.fromType == "海量游乐") {
            this.txtList = ["搜索商家名称，如乐园"];
        } else if (this.fromType == "户外") {
            this.txtList = ["51车·人车生活俱乐部", "搜索精选活动全网官方补贴", "户外畅游有点爽"];
        } else if (this.fromType == "户内") {
            this.txtList = ["51车·人车生活俱乐部", "搜索精选活动全网官方补贴", "户内嗨乐有点爆"];
        } else if (this.fromType == "保养预约") {
            this.txtList = ["51车·人车生活俱乐部", "保养预约有点准", "搜索品牌4S店"];
        }
    },
    watch: {},
    methods: {
        onFocus() {
            if (this.fromType == "4s逛逛") {
                this.searchShow = "搜索品牌4S店";
            } else if (this.fromType == "玩乐") {
                this.searchShow = "搜索商家名称，如乐园";
            } else if (this.fromType == "优惠团购") {
                this.searchShow = "搜索活动商品全网官方补贴";
            } else if (this.fromType == "海量游乐") {
                this.searchShow = "搜索商家名称，如乐园";
            } else if (this.fromType == "户外") {
                this.searchShow = "搜索精选活动全网官方补贴";
            } else if (this.fromType == "户内") {
                this.searchShow = "搜索精选活动全网官方补贴";
            } else if (this.fromType == "保养预约") {
                this.searchShow = "搜索品牌4S店";
            }
            this.autoplay = false;
        },
        onBlur() {
            this.searchShow = "";
            if (this.searchValue) {
                this.autoplay = false;
            } else {
                this.autoplay = true;
            }
        },
        OnPushSearch() {
            if (this.fromType == "玩乐" || this.fromType == "户外" || this.fromType == "户内") {
                this.$emit("getValue", this.searchValue);
                this.autoplay = false;
            } else if (this.fromType == "优惠团购" || this.fromType == "海量游乐" || this.fromType == "保养预约") {
                this.$emit("search", this.searchValue);
            }
            if (!this.searchValue) {
                this.autoplay = true;
            }
        },
        toSearch() {
            if (this.fromType == "4s逛逛") {
                uni.navigateTo({
                    url: "/pages/carShops/shop/index",
                });
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.searchTop {
    box-sizing: border-box;
    position: relative;
}

.searchBtn {
    position: absolute;
    right: 36rpx;
    top: 16rpx;
    z-index: 100;
}

.swiperBox {
    width: 100%;
    height: 64rpx;
    line-height: 64rpx;
    background: #ffffff;
    border-radius: 32rpx;

    input {
        height: 64rpx;
        line-height: 64rpx;
        display: block;
        width: 100%;
        padding-left: 45rpx;
        border-radius: 30rpx;
    }
}

.haveKefu {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .searchTop {
        width: 670rpx;
    }

    .kefu-contact {
        background: none;
        border: none;
        margin: 0;
        padding: 0;
        outline: none;
        width: 36rpx;
        height: 36rpx;

        image {
            width: 36rpx;
            height: 36rpx;
            display: block;
        }
    }

    button::after {
        border: initial;
    }
}

.whiteBg {
    background-color: #fff;
    padding: 25rpx;

    .haveKefu .searchTop {
        width: 650rpx;
    }

    .swiperBox {
        background-color: #f8f8f8;
    }

    input {
        padding-left: 45rpx;
        border-radius: 30rpx;
        box-sizing: border-box;
    }
}
</style>
