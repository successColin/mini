<template>
    <view @click.stop="toSearch">
        <view :class="{ whiteBg: isBgf === true }" :style="{ 'border-radius': radius + 'rpx' }">
            <view :class="{ haveKefu: isIcon === 1 }" class="mt10" :style="{ 'margin-top': marginTop + 'rpx' }">
                <view class="searchTop flex">
                    <swiper :vertical="true" duration="1000" :circular="true" class="swiperBox" :autoplay="autoplay">
                        <swiper-item v-for="(item, index) in txtList" :key="index">
                            <input type="text" :placeholder="searchShow ? searchShow : item" v-model="searchValue"
                                @focus.stop="onFocus(item)" @blur.stop="onBlur(item)" @confirm.stop="OnPushSearch" />
                        </swiper-item>
                    </swiper>
                    <view class="searchBtn">
                        <!-- <u-icon name="search" @click.stop=""></u-icon> -->
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20231106/file_1699234499627.png"
                            class="search__image" @click.stop="OnPushSearch" />
                    </view>
                </view>
                <button open-type="contact" session-from="" class="kefu-contact" v-if="isIcon">
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693447185918.png"></image>
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
        if (this.fromType == "拼团") {
            this.txtList = [
                "搜索拼团福利",
                "搜索拼团福利",
                "搜索拼团福利",
                "搜索拼团福利",
                "搜索拼团福利",
            ];
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
            this.$emit('blur-search', this.searchValue);
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
            } else if (this.fromType == "拼团" || this.fromType == "海量游乐" || this.fromType == "保养预约") {
                this.$emit("search", this.searchValue);
            }
            if (!this.searchValue) {
                this.autoplay = true;
            }
        },
        toSearch() {

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
    right: 25rpx;
    top: 13rpx;
    z-index: 100;
}

.search__image {
    width: 43rpx;
    height: 43rpx;
}

.swiperBox {
    width: 100%;
    height: 64rpx;
    line-height: 64rpx;
    border-radius: 32rpx;

    input {
        height: 64rpx;
        line-height: 64rpx;
        display: block;
        width: 100%;
        opacity: 0.8;
        padding-left: 45rpx;
        border-radius: 32px;
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

    padding: 10rpx;

    .haveKefu .searchTop {
        width: 650rpx;
    }

    .swiperBox {
        background: #FFFFFF;
        opacity: 0.8;
    }

    input {
        padding-left: 45rpx;
        border-radius: 30rpx;
        box-sizing: border-box;
    }
}
</style>
