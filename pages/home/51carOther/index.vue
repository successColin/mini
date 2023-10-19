<template>
    <view class="page">
        <view>
            <view class="search">
                <view class="search-frame">
                    <input v-model="input" :placeholder="tabIndex === 3 ? '搜索4s店' : '搜索车型'"
                        placeholder-style="color:#999999;font-size:26rpx;" class="search-frame-input" @blur="setInit" />
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693442474478.png"
                        class="search-frame-image" />
                </view>
            </view>
            <view class="tabs">
                <view v-for="(v, i) in tabList" :key="i" class="tabs-item" @click="setTab(v)">
                    <view :class="[v.id === tabIndex ? 'tabs-item-title' : 'tabs-item-untitle']">{{ v.name }}</view>
                </view>
                <view class="tabs-item-line" :class="'tabs-item-line' + tabIndex" />
            </view>
        </view>
        <bank v-if="tabIndex === 1" />
        <rentBeforeBuy v-if="tabIndex === 2" />
        <visit4S v-if="tabIndex === 3" />
        <view :style="{ 'height': tabbarHeight + 'px' }"></view>
        <tabbar v-model="tabbarHeight" routePath="pages/home/51carOther/index"></tabbar>
    </view>
</template>

<script>
import bank from "./components/bank.vue"
import rentBeforeBuy from "./components/rentBeforeBuy.vue"
import visit4S from "./components/visit4S.vue"
import tabbar from '@/components/tabbar/index.vue'
export default {
    components: {
        bank,
        rentBeforeBuy,
        visit4S,
        tabbar
    },
    computed: {},
    data() {
        return {
            input: '',
            tabList: [{ id: 1, name: '银行分期' }, { id: 2, name: '先租后买' }, { id: 3, name: '逛4S店' }, { id: 4, name: '娱乐精选' }],
            tabIndex: 1,
            tabbarHeight: 0, //tabbar高度
        }
    },
    onHide() { },
    onUnload() { },
    onLoad() { },
    onShow() { },
    onReachBottom() {
        uni.$emit('51carOther_carList', { type: 2 })
    },
    onPullDownRefresh() { },
    methods: {
        setInit() {
            if (this.tabIndex !== 3) {
                uni.$emit('51carOther_carList', { type: 1, title: this.input })
            } else {
                uni.navigateTo({
                    url: "/pages/carShops/shop/index?searchtxt=" + this.input
                });
            }
        },
        setTab(value) {
            this.input = ''
            if (value.id === 4) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/playfulperson'
                })
            } else {
                this.tabIndex = value.id
            }
        },
    }
}
</script>

<style lang="scss">
.page {
    padding: 0;
}

.search {
    width: 750rpx;
    height: 64rpx;
    background: #FFFFFF;
    padding-top: 20rpx;
    display: flex;
    justify-content: center;

    &-frame {
        width: 700rpx;
        height: 64rpx;
        background: #F8F8F8;
        border-radius: 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-input {
            width: 590rpx;
            font-size: 26rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-left: 32rpx;
        }

        &-image {
            width: 30rpx;
            height: 31rpx;
            margin-right: 35rpx;
        }
    }
}

.tabs {
    position: relative;
    display: flex;
    width: 750rpx;
    height: 86rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 20rpx 20rpx;

    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 188rpx;
        height: 86rpx;

        &-untitle {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
        }

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
        }

        &-line {
            position: absolute;
            top: 80rpx;
            width: 38rpx;
            height: 6rpx;
            background: #D91B1B;
            border-radius: 3rpx;
        }

        &-line1 {
            transform: translate(75rpx, 0);
            transition: 0.5s;
        }

        &-line2 {
            transform: translate(263rpx, 0);
            transition: 0.5s;
        }

        &-line3 {
            transform: translate(451rpx, 0);
            transition: 0.5s;
        }

        &-line4 {
            transform: translate(639rpx, 0);
            transition: 0.5s;
        }
    }
}
</style>
