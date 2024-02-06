<template>
    <view>
        <Currency :head="head">
            <scroll-view class="tabs" slot="tabs" scroll-x>
                <image v-for="(v, i) in tabs" :key="i" :src="v.icon" class="tabs-icon" @click="setTabs(i)" />
            </scroll-view>
            <scroll-view class="list" slot="list" :scroll-into-view="scrollx" scroll-x>
                <view :id="`scroll-${tabIndex}`" />
                <view v-for="(v, i) in list[tabIndex]" :key="i" :id="'scroll' + i" class="item" @click="toDetails(v)">
                    <image :src="v.url" class="item-image" />
                    <view class="item-title">{{ v.name }}</view>
                </view>
            </scroll-view>
        </Currency>
    </view>
</template>
<script>
import Currency from "./currency.vue";
import { getstorage } from "@/utils/index.js";
export default {
    options: {
        styleIsolation: "shared",
    },
    components: { Currency },
    data() {
        return {
            head: {
                image: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705455012732.png",
                title: "周末好去处",
                url: "/pages/activity/activityRegistration/localCharm",
            },
            tabs: [],
            tabIndex: 0,
            list: [],
            scrollx: "",
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
            this.getLocalCharmList();
        },
        async getLocalCharmList() {
            const { data } = await this.$request.post("/coc-active/api/v1/localCharm/categoryAndLocalCharmList", {
                cityCode: getstorage("citycode"),
            });
            const tabs = [],
                list = [];
            data.forEach((v) => {
                const {
                    logoUrl,
                    localCharmListByCategory: { records },
                } = v;
                if (records.length) {
                    tabs.push({ icon: logoUrl });
                    list.push([]);
                    records.forEach((value) => {
                        const { id, title, coverImage } = value;
                        list[list.length - 1].push({ id, name: title, url: coverImage });
                    });
                }
            });
            this.tabs = tabs;
            this.list = list;
        },
        toDetails(value) {
            uni.navigateTo({
                url: "/pages/activity/activityRegistration/localCharmDetails?id=" + value.id,
            });
        },
        setTabs(index) {
            this.tabIndex = index;
            this.scrollx = "scroll-" + index;
        },
    },
};
</script>
<style lang="scss" scoped>
::v-deep .currency-top-image {
    width: 127rpx;
}

.tabs {
    white-space: nowrap;
    height: 42rpx;
    &-icon {
        width: 138rpx;
        height: 42rpx;
        border-radius: 10rpx;
        margin-right: 10rpx;
    }
}

.list {
    white-space: nowrap;
}
.item {
    display: inline-block;
    margin: 16rpx 10rpx 0 0;
    &-image {
        display: block;
        width: 276rpx;
        height: 208rpx;
        background: #ff2215;
        border-radius: 10rpx;
    }
    &-title {
        width: 276rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 28rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: 16rpx 0 17rpx;
    }
}
</style>
