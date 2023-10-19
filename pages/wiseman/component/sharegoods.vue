<template>
    <view class="page">
        <view class="top">
            <view class="top-search">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
                    class="top-search-image" />
                <input v-model="obj.relatedName" placeholder="搜索商品名称" placeholder-style="color:#999999;font-size:27rpx;"
                    class="top-search-input" @blur="setObj" />
            </view>
        </view>
        <view class="mt30">
            <tabs :list="tablist" @click="setTabList" />
            <square :isshow='false' :list="rows.list" :show="show" :min-height="mh" @updateselect="setSelect"
                @setsort="setSort" />
            <view class="safe-bottom-height" />
        </view>

    </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue'
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue'
import square from '@/pages/wiseman/darenxiaodian/components/square.vue'
export default {
    components: {
        carousel,
        tabs,
        square
    },
    data() {
        return {
            noticelist: [],
            tablist: [
                { id: 0, name: '全部', status: true },
                { id: 1, name: '市场活动', status: false },
                { id: 2, name: '保养特惠', status: false },
                { id: 9, name: '新车鉴赏', status: false },
                // { id: 3, name: '救援年卡', status: false },
            ],
            show: true,
            obj: {
                relatedName: '',
                lockType: 0,
                sort: 1,
                current: 1,
                size: 50
            },
            rows: {
                list: [],
                total: 0
            },
            mh: ''
        }
    },
    onLoad() { },
    onShow() { },
    created() {
        this.getNoticeList()
        this.getTabList()
        this.getGoodList()
    },
    onReachBottom() {
        this.onScrollToLower()
    },
    methods: {
        async getNoticeList() {
            const { data } = await this.$request.post('/coc-active/api/v1/newExpert/untruthBroadcastMessageList', { 'displayLocation': 1 })
            const list = []
            data.forEach((v) => {
                list.push(v.content)
            })
            this.noticelist = list
        },
        async getTabList() {
            const { data } = await this.$request.post('/coc-active/api/v1/expert/selection/library/shopCategoryList', { 'showType': 1 })
            const list = JSON.parse(JSON.stringify(this.tablist))
            data.forEach((v) => {
                list.push({ id: list.length + 1, sid: v.shopCategoryId, name: v.shopCategoryName, status: false })
            })
            this.tablist = list
        },
        async getGoodList() {
            this.obj.isCommissionPrice = 0
            const { data } = await this.$request.post('/coc-active/api/v1/expert/selection/library/list', this.obj)
            const list = JSON.parse(JSON.stringify(this.rows.list))
            data.records.forEach((v) => {
                v.type_txt = v.type === 1 ? '活' : v.type === 2 ? '保' : v.type === 3 ? '救' : v.type === 4 ? '团' : v.type === 5 ? '套' : ''
                list.push(v)
            })
            this.rows.list = list
            this.rows.total = data.total
        },
        setProjectList(value) {
            uni.navigateTo({
                url: value.url
            })
        },
        setTabList(value) {
            this.tablist.forEach((v) => {
                if (JSON.stringify(value) === JSON.stringify(v)) {
                    v.status = true
                } else {
                    v.status = false
                }
            })
            if (value.sid) {
                this.setShopCategoryTab(value.sid)
            } else {
                this.setTab(value.id)
            }
        },
        setTab(id) {
            delete this.obj.shopCategoryId
            this.setObj('lockType', id)
        },
        setShopCategoryTab(id) {
            delete this.obj.lockType
            this.setObj('shopCategoryId', id)
        },
        setSort(id) {
            this.setObj('sort', id)
        },
        setObj(key, value) {
            if (key) {
                this.obj[key] = value
            }
            if (this.obj.relatedName.length > 0) {
                this.obj.lockType = this.obj.lockType === 0 ? '' : this.obj.lockType
            } else {
                this.obj.lockType = this.obj.lockType === '' ? 0 : this.obj.lockType
            }
            this.obj.current = 1
            this.rows = {
                list: [],
                total: 0
            }
            this.getGoodList()
        },
        setSelect(value) {
            this.rows.list.forEach((v) => {
                if (JSON.stringify(v) === JSON.stringify(value)) {
                    v.isSelection = v.isSelection === 0 ? 1 : 0
                }
            })
        },
        onScrollToLower() {
            if (this.rows.total > this.obj.current * this.obj.size) {
                this.obj.current += 1
                this.getGoodList()
            }
        },
        setCarousel(data) {
            if (data.length === 0) {
                this.mh = '358'
            } else {
                this.mh = '628'
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
    flex-direction: column;
    align-items: center;
    width: 750rpx;
    // height: 575rpx;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 91%, rgba(255, 255, 255, 0) 100%);

    &-search {
        display: flex;
        align-items: center;
        width: 704rpx;
        height: 62rpx;
        border-radius: 31rpx;
        border: 2rpx solid #D91B1B;

        &-image {
            width: 48rpx;
            height: 48rpx;
            margin-left: 15rpx;
        }

        &-input {
            width: 621rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 32rpx;
            margin-left: 8rpx;
        }
    }

    &-carousel {
        // width: 704rpx;
        // height: 256rpx;
        // background: linear-gradient(180deg, #D91B1B 0%, #EF7C5F 100%);
        // border-radius: 15rpx;
        // margin-top: 15rpx;
    }

    &-broadcast {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 704rpx;
        height: 87rpx;
        background: #FFFFFF;
        border-radius: 15rpx;
        border: 2rpx solid #EFEFEF;
        margin-top: 15rpx;

        &-image {
            width: 48rpx;
            height: 49rpx;
            margin-left: 15rpx;
        }

        &-head {
            width: 62rpx;
            height: 62rpx;
            border-radius: 31rpx;
            border: 4rpx solid #FFFFFF;

            &-image {
                width: 62rpx;
                height: 62rpx;
                border-radius: 31rpx;
            }
        }

        &-content {
            margin-left: 15rpx;

            &-title {
                font-size: 27rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #222222;
                line-height: 38rpx;
            }

            &-title2 {
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 33rpx;
            }
        }

        &-money {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            margin-right: 15rpx;

            &-title {
                font-size: 19rpx;
                font-family: OPPOSans-Regular, OPPOSans;
                font-weight: 400;
                color: #D91B1B;
                line-height: 25rpx;
            }
        }
    }

    &-notice {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 704rpx;
        height: 77rpx;
        background: #FFFFFF;
        border-radius: 15rpx;
        border: 2rpx solid #EFEFEF;
        margin-top: 15rpx;

        &-image {
            width: 48rpx;
            height: 49rpx;
            margin-left: 15rpx;
        }
    }

    &-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 704rpx;
        height: 140rpx;

        &-item {
            display: flex;
            flex-direction: column;
            align-items: center;

            &-image {
                width: 64rpx;
                height: 64rpx;
            }

            &-title {
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #222222;
                line-height: 33rpx;
                margin-top: 16rpx;
            }
        }
    }
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}

.df {
    display: flex;
}

.aic {
    align-items: center;
}

.ml-20 {
    margin-left: -20rpx;
}

.mh925 {
    min-height: 925rpx;
}
</style>