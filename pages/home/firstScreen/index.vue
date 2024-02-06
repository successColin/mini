<template>
    <view>
        <Navigation />
        <scroll-view
            class="h100vh"
            scroll-y
            @scroll="pageScroll"
            @scrolltolower="reachBottom"
            :refresher-enabled="true"
            :refresher-triggered="triggered"
            @refresherpulling="onPulling"
            @refresherrefresh="onRefresh"
            @refresherrestore="onRestore"
        >
            <Carousel
                class="navigation__carousel"
                :topClass="['activity-img']"
                :height="210"
                urlkey="url"
                :dataType="2"
                systemCode="applets_wonderful_first"
                :indicatorType="5"
                :radius="0"
                indicatorStyle="bottom: 20rpx"
            />
            <UseList />
            <LocalCharm />
            <CarWelfare />
            <GotTalent />
            <ShopPlay />
            <Recommend />
        </scroll-view>
    </view>
</template>
<script>
import Navigation from "./components/navigation.vue";
import Carousel from "@/components/carousel/index.vue";
import UseList from "./components/uselist.vue";
import LocalCharm from "./components/localCharm.vue";
import CarWelfare from "./components/carWelfare.vue";
import GotTalent from "./components/gotTalent.vue";
import ShopPlay from "./components/shopPlay.vue";
import Recommend from "./components/recommend.vue";
export default {
    components: { Navigation, Carousel, UseList, LocalCharm, CarWelfare, GotTalent, ShopPlay, Recommend },
    data() {
        return {
            triggered: false,
        };
    },
    methods: {
        //页面滚动
        pageScroll(e) {
            console.log(e.detail.scrollTop);
            uni.$emit("setNavigation", {
                scrollTop: e.detail.scrollTop,
            });
        },
        //页面滑到底部
        reachBottom() {
            uni.$emit("recommend");
        },
        // 自定义下拉刷新控件被下拉
        onPulling(e) {
            if (e.detail.deltaY < 0) return; // 防止上滑页面也触发下拉
            this.triggered = true;
        },
        // 自定义下拉刷新被触发
        onRefresh() {
            this.timer = setTimeout(() => {
                uni.$emit("updatedata");
                this.triggered = false;
            }, 1000);
        },
        // 自定义下拉刷新被复位
        onRestore() {
            this.triggered = "restore"; // 需要重置
        },
    },
};
</script>
<style lang="scss" scoped>
.h100vh {
    height: 100vh;
}
</style>
