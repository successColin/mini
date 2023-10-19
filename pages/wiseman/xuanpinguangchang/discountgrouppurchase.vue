<template>
    <view class="page">
        <view class="top">
            <view class="top-search">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
                    class="top-search-image" />
                <input v-model="init.relatedName" placeholder="搜索商品名称" placeholder-style="color:#999999;font-size:27rpx;"
                    class="top-search-input" @blur="setInit" />
            </view>
            <button type="default" class="kefu-contact" open-type='contact' session-from=''>
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230821/file_1692578313770.png"
                    class="top-image" />
            </button>
        </view>
        <carousel :topStyle="{ width: '704rpx', 'margin-top': '23rpx', 'margin-bottom': '14rpx' }" :radius="7"
            height="256rpx" urlkey="url" :dataType="2" systemCode="applets_group_top" :indicatorType="1"
            @input="setCarousel" />
        <tabs :list="tabs.list" @click="setTabsList" />
        <square :list="rows.list" :show="true" :min-height="mh" @updateselect="setSelect" @setsort="setSort" />
        <view class="safe-bottom-height" />
    </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue'
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue'
import square from '@/pages/wiseman/darenxiaodian/components/square.vue'
import { unifyMixin } from '@/pages/wiseman/xuanpinguangchang/mixin.js'
export default {
    mixins: [unifyMixin],
    components: {
        carousel,
        tabs,
        square
    },
    data() {
        return {
            mh: ''
        }
    },
    onLoad() { },
    onShow() { },
    created() {
        this.initial()
    },
    onReachBottom() {
        this.onScrollToLower()
    },
    methods: {
        initial() {
            this.init.lockType = 6
            this.tabs.list.push({ id: 6, name: '全部', status: true })
            this.getTabsList()
            this.getList()
        },
        setCarousel(data) {
            if (data.length === 0) {
                this.mh = '150'
            } else {
                this.mh = '442'
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #EFEFEF;
}

.top {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
    height: 77rpx;
    background: #FFFFFF;
    padding-bottom: 16rpx;

    &-search {
        display: flex;
        align-items: center;
        width: 615rpx;
        height: 62rpx;
        border-radius: 31rpx;
        border: 2rpx solid #D91B1B;

        &-image {
            width: 48rpx;
            height: 48rpx;
            margin-left: 15rpx;
        }

        &-input {
            width: 521rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 32rpx;
            margin-left: 8rpx;
        }
    }

    &-image {
        width: 40rpx;
        height: 40rpx;
    }
}

.kefu-contact {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
    outline: none;
    width: 40rpx;
    height: 40rpx;
    display: inline-flex;
    margin-left: 32rpx;
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

button::after {
    border: initial;
}
</style>