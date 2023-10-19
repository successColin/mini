<template>
    <view class="page">
        <goods :list="rows.list" :edit="true" :release="release" @set-value="setValue" @setsort="setSort" @settab="setTab"
            @setstab="setShopCategoryTab" @scrolltolower="onScrollToLower" />
        <view v-if="release === '0'" class="bottom">
            <view class="bottom-view">
                <view class="bottom-view-left">
                    <view @click="setSelect">
                        <image v-if="select"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692255763089.png"
                            class="bottom-view-left-selected" />
                        <image v-else
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692255786059.png"
                            class="bottom-view-left-selected" />
                    </view>
                    <view class="bottom-view-left-title">全选</view>
                    <view class="bottom-view-left-number">
                        <view class="bottom-view-left-title">已选</view>
                        <view class="bottom-view-left-number-title">{{ rows.number }}/{{ rows.total }}</view>
                    </view>
                </view>
                <view class="bottom-view-right" @click="deleteList">移出小店</view>
            </view>
        </view>
        <u-toast ref="uToast"></u-toast>
        <overlayloadingicon :show="showload" />
    </view>
</template>

<script>
import goods from '@/pages/wiseman/darenxiaodian/components/goods.vue'
import overlayloadingicon from '@/pages/wiseman/darenxiaodian/components/overlayloadingicon.vue'
export default {
    components: {
        goods,
        overlayloadingicon
    },
    data() {
        return {
            select: false,
            obj: {
                relatedName: '',
                lockType: 0,
                sort: 0,
                current: 1,
                size: 50
            },
            rows: {
                list: [],
                number: 0,
                total: 0,
                maintotal: 0
            },
            release: '0',
            showload: false,
            timer: undefined,
			isCommissionPrice:null
        }
    },
    onLoad(option) {
		if(option.isCommissionPrice==1){
			this.isCommissionPrice=0
		}else if (option.isCommissionPrice==0){
			this.isCommissionPrice=1
		}
        this.release = option.release
        this.getList()
        uni.$on('drxdsearch', (value) => {
            this.setObj('relatedName', value)
        })
    },
    onShow() { },
    beforeDestroy() {
        uni.$off('drxdsearch')
        uni.$emit('drxdupdate')
        clearInterval(this.timer)
    },
    methods: {
        setObj(key, value) {
            this.obj[key] = value
            this.obj.current = 1
            this.rows = {
                list: [],
                number: 0,
                total: 0,
                maintotal: 0
            }
            this.getList()
        },
        async getList() {
			if(this.isCommissionPrice==0){
				this.obj.isCommissionPrice=0
			}else if (this.isCommissionPrice==1){
				this.obj.isCommissionPrice=1
			}
            const { data } = await this.$request.post('/coc-active/api/v1/expert/shop/selection/list', this.obj)
            const list = JSON.parse(JSON.stringify(this.rows.list))
            data.records.forEach((v) => {
                if (v.status !== 3) {
                    v.type_txt = v.type === 1 ? '活' : v.type === 2 ? '保' : v.type === 3 ? '救' : v.type === 4 ? '团' : '单'
                    list.push(v)
                }
            })
            this.rows.list = list
            this.rows.total = list.length
            this.rows.maintotal = data.total
        },
        setSort(value) {
            this.obj.relatedName = ''
            this.setObj('sort', value)
        },
        setTab(id) {
            this.obj.relatedName = ''
            delete this.obj.shopCategoryId
            this.setObj('lockType', id)
        },
        setShopCategoryTab(id) {
            this.obj.relatedName = ''
            delete this.obj.lockType
            this.setObj('shopCategoryId', id)
        },
        onScrollToLower() {
            if (this.rows.maintotal > this.obj.current * this.obj.size) {
                this.obj.current += 1
                this.getList()
            }
        },
        setValue(value) {
            this.rows.list.forEach((v) => {
                if (JSON.stringify(v) === JSON.stringify(value)) {
                    v.select = !value.select
                }
            })
            this.setNumber()
            this.timer = setInterval(() => {
                if (this.release === '1') {
                    uni.$emit('drxdrelease', { citeId: value.id, citename: value.relatedName })
                    uni.navigateBack()
                }
            }, 500)
        },
        setSelect() {
            this.select = !this.select
            this.rows.list.forEach((v) => {
                v.select = this.select
            })
            this.setNumber()
        },
        setNumber() {
            let number = 0
            this.rows.list.forEach((v) => {
                if (v.select) {
                    number += 1
                }
            })
            this.rows.number = number
            this.select = this.rows.total === number
        },
        async deleteList() {
            let ids = []
            this.rows.list.forEach((v) => {
                if (v.select) {
                    ids.push(v.id)
                }
            })
            this.showload = true
            const { code } = await this.$request.post('/coc-active/api/v1/expert/shop/selection/batchRemove', { ids })
            if (code === 200) {
                this.$refs.uToast.show({ message: '删除成功', type: 'success' })
                this.rows = {
                    list: [],
                    number: 0,
                    total: 0,
                    maintotal: 0
                }
                this.getList()

            }
            this.showload = false
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    height: 100vh;
    background: #FFFFFF;
}

.bottom {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background: #FFFFFF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    &-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 147rpx;
        margin-left: 23rpx;
        margin-right: 23rpx;

        &-left {
            display: flex;

            &-selected {
                width: 88rpx;
                height: 88rpx;
            }

            &-title {
                font-size: 27rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #999999;
                line-height: 88rpx;
            }

            &-number {
                display: flex;
                margin-left: 38rpx;

                &-title {
                    font-size: 27rpx;
                    font-family: OPPOSans-Medium, OPPOSans;
                    font-weight: 500;
                    color: #999999;
                    line-height: 88rpx;
                }
            }
        }

        &-right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 185rpx;
            height: 69rpx;
            background: #D91B1B;
            border-radius: 125rpx 125rpx 125rpx 125rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 32rpx;
        }

    }
}
</style>