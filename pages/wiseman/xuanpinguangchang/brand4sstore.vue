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
        <carousel :topStyle="{ width: '704rpx', 'margin-top': '23rpx', 'margin-bottom': '23rpx' }" :radius="7"
            height="256rpx" urlkey="url" :dataType="2" systemCode="applets_4s_shop_top" :indicatorType="1"
            @input="setCarousel" />
        <tabs :list="tablist" @click="setParentTabsList" />
        <view class="car">
            <scroll-view class="car-list" scroll-x="true">
                <view v-for="(v, i) in cars.list" :key="i" class="car-list-item" @click="setSonTabsList(v)">
                    <view v-if="v.status" class="car-list-item-view">{{ v.name }}</view>
                    <view v-else class="car-list-item-view2">{{ v.name }}</view>
                </view>
            </scroll-view>
        </view>
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
            tablist: [],
            cars: {
                list: []
            },
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
            this.init.lockType = 5
            this.getParentTabsList()
        },
        async getParentTabsList() {
            const { data } = await this.$request.post("/coc-active/api/v1/four_s/fourSBrand")
            const list = []
            data.forEach((v) => {
                const data = []
                v.fourSShopVO.forEach((value) => {
                    data.push({ id: value.shopId, name: value.baseName, status: false })
                })
                list.push({ id: v.brandId, name: v.brandName, list: data, status: false })
            })
            this.tablist = list
            this.setParentTabsList(list[0])
        },
        setParentTabsList(value) {
            this.tablist.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    v.status = true
                } else {
                    v.status = false
                }
            })
            const list = JSON.parse(JSON.stringify(value.list))
            list.unshift({ id: 0, name: '全部', status: true })
            this.cars.list = list
            this.init.brandId = value.id
            delete this.init.shopId
            this.setInit()
        },
        setSonTabsList(value) {
            if (value.status) {
                return
            }
            let list = []
            this.tablist.forEach((v) => {
                if (v.status) {
                    list = JSON.parse(JSON.stringify(v.list))
                }
            })
            list.unshift({ id: 0, name: '全部', status: false })
            list.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    v.status = true
                } else {
                    v.status = false
                }
            })
            this.cars.list = list
            this.init.shopId = value.id || ''
            this.setInit()
        },
        setCarousel(data) {
            if (data.length === 0) {
                this.mh = '244'
            } else {
                this.mh = '544'
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

.car {
    display: flex;
    width: 704rpx;
    height: 58rpx;
    margin-top: 15rpx;
    margin-bottom: 23rpx;

    &-list {
        white-space: nowrap;
        height: 100%;

        &-item {
            position: relative;
            display: inline-block;
            margin-right: 15rpx;

            &-view {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 54rpx;
                background: #FFEEEE;
                border-radius: 27rpx;
                border: 1rpx solid #D91B1B;
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #222222;
                line-height: 31rpx;
                padding-left: 23rpx;
                padding-right: 23rpx;
            }

            &-view2 {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 54rpx;
                background: #FFFFFF;
                border-radius: 27rpx;
                border: 1rpx solid #FFFFFF;
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 31rpx;
                padding-left: 23rpx;
                padding-right: 23rpx;
            }
        }
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