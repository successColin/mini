<template>
    <view class="page">
        <image :src="info.backImage" class="bgc" />
        <view class="card">
            <view class="navigation" @click="toBack()">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169759970.png"
                    class="w96h96" />
            </view>
            <view class="df option">
                <!-- <view v-if="type === 2" class="btn">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692415831735.png"
                        class="w36h36" />
                    <view class="btn-title">私信</view>
                </view> -->
                <view v-if="type !== 2" class="btn" @click="toRenovation">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169989455.png"
                        class="w36h36" />
                    <view class="btn-title">去装修</view>
                </view>
                <view class="btn ml15" @click="toSearch">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170025878.png"
                        class="w36h36" />
                    <view class="btn-title">搜商品</view>
                </view>
                <view v-if="type === 2 && info.followType === 0" class="btn ml15 mr23 bgcD91B1B" @click="setAttention">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692415861444.png"
                        class="w36h36" />
                    <view class="btn-title">关注</view>
                </view>
                <view v-else-if="type === 2 && info.followType === 1" class="btn ml15 mr23 bgcEFEFEF" @click="setAttention">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692415889023.png"
                        class="w36h36" />
                    <view class="btn-title c999999">已关注</view>
                </view>
                <view v-else class="w85h85 ml15 mr23" @click="setShare">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170070546.png"
                        class="w48h48" />
                </view>
            </view>
        </view>
        <view class="card2">
            <view class="df">
                <image class="tx" :src="info.headImg" />
                <view class="ml13">
                    <view class="name">{{ info.shopName }}</view>
                    <view class="content">{{ info.intro }}</view>
                </view>
            </view>
            <view class="df">
                <view v-for="(v, i) in info.tagsList" :key="i" class="label mr15">
                    <view class="label-title">{{ v }}</view>
                </view>
            </view>
        </view>
        <view class="card3">
            <view class="line" />
        </view>
        <image v-if="type === 0"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170147023.png"
            class="no-image" />
        <square v-if="type === 0" :list="squarerows.list" :preview="preview" @update="setObj" />
        <goods v-if="type === 1" :list="goodrows.list" :preview="preview" :userId="info.userId" @setsort="setSort"
            @settab="setTab" @setstab="setShopCategoryTab" @scrolltolower="onScrollToLower" />
        <lookgoods v-if="type === 2" :list="goodrows.list" :preview="'1'" :userId="info.userId" :show="show"
            @setsort="setSort" @settab="setTab" @setstab="setShopCategoryTab" @scrolltolower="onScrollToLower" />
        <view v-if="type === 0" class="safe-bottom-height"></view>
        <share v-if="share" :data="info" @close="share = false" />

        <u-toast ref="uToast"></u-toast>
        <overlayloadingicon :show="showload" />
    </view>
</template>

<script>
import square from '@/pages/wiseman/darenxiaodian/components/square.vue'
import goods from '@/pages/wiseman/darenxiaodian/components/goods.vue'
import share from '@/pages/wiseman/darenxiaodian/components/share.vue'
import lookgoods from '@/pages/wiseman/darenxiaodian/components/lookgoods.vue'
import overlayloadingicon from '@/pages/wiseman/darenxiaodian/components/overlayloadingicon.vue'
export default {
    components: {
        square,
        goods,
        share,
        lookgoods,
        overlayloadingicon
    },
    data() {
        return {
            type: undefined,
            preview: '0',
            info: {
                userId: '',
                backImage: 'https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169916276.png',
                headImg: 'https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20221014/ed79357b28b44d9d8eaa99a41ae4e41e.jpg',
                shopName: '',
                intro: '该店主尚未添加简介',
                tagsList: [],
                posterDesc: '',
                posterShareUrl: 'https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693451973736.jpg',
                followType: 0
            },
            obj: {
                relatedName: '',
                lockType: '',
                sort: 1,
                current: 1,
                size: 50
            },
            squarerows: {
                list: [],
                total: 0
            },
            goodrows: {
                list: [],
                total: 0
            },
            good: {
                obj: {},
                rows: {
                    data: [],
                    total: 0
                }
            },
            share: false,
            userId: undefined,
            showload: false,
            show: true
        }
    },
    onLoad(option) {
        this.preview = option.preview
        if (option.scene) {
            this.userId = option.scene
            this.setObj('userId', option.scene)
            this.type = 2
        } else {
            if (option.info) {
                this.type = 2
                this.show = false
                this.getInfo(option.info)
            }
            this.getGoodList()
        }
        uni.$on('drxdupdate', () => {
            this.obj = {
                relatedName: '',
                lockType: '',
                sort: 1,
                current: 1,
                size: 50
            }
            this.setObj()
        })
        uni.$on('drxdsearch', (value) => {
            this.setObj('relatedName', value)
        })
    },
    onShow() {
        this.getDetails()
    },
    beforeDestroy() {
        uni.$off('drxdupdate')
        uni.$off('drxdsearch')
    },
    methods: {
        toBack() {
            let routes = getCurrentPages()
            if (routes.length > 1) {
                uni.navigateBack()
            } else {
                uni.switchTab({
                    url: '/pages/home/index'
                })
            }
        },
        isPreview() {
            if (this.preview === '1') {
                throw Error('');
            }
        },
        getInfo(obj) {
            this.info = {}
            this.$nextTick(() => {
                this.info = JSON.parse(obj)
            })
        },
        toRenovation() {
            this.isPreview()
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/renovation?info=' + JSON.stringify(this.info)
            })
        },
        toSearch() {
            this.isPreview()
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/search?name=' + this.obj.relatedName
            })
        },
        async getDetails() {
            this.isPreview()
            let obj = this.userId ? { userId: this.userId } : {}
            const { data } = await this.$request.post('/coc-active/api/v1/newExpert/shop', obj)
            data.tagsList = data.tags.length === 0 ? [] : data.tagsList
            this.info = this.compare(data, this.info)
        },
        setObj(key, value) {
            if (key) {
                this.obj[key] = value
            }
            if (key === 'userId') {
                this.obj.status = 1
            }
            this.obj.current = 1
            this.goodrows = {
                list: [],
                total: 0
            }
            this.getGoodList()
        },
        async getGoodList() {
            const { data } = await this.$request.post('/coc-active/api/v1/expert/shop/selection/list', this.obj)
            const list = JSON.parse(JSON.stringify(this.goodrows.list))
            data.records.forEach((v) => {
                if (v.status !== 3) {
                    v.type_txt = v.type === 1 ? '活' : v.type === 2 ? '保' : v.type === 3 ? '救' : v.type === 4 ? '团' : v.type === 5 ? '套' : ''
                    list.push(v)
                }
            })
            this.goodrows.list = list
            this.goodrows.total = data.total
            if (this.type !== 2) {
                if (list.length === 0 && this.obj.lockType === '' && this.obj.relatedName === '') {
                    this.type = 0
                    this.getSquareList()
                } else {
                    this.type = 1
                }
            }
        },
        async getSquareList() {
            const { data } = await this.$request.post('/coc-active/api/v1/expert/selection/library/list', { current: 1, size: 4 })
            const list = JSON.parse(JSON.stringify(this.squarerows.list))
            data.records.forEach((v) => {
                v.type_txt = v.type === 1 ? '活' : v.type === 2 ? '保' : v.type === 3 ? '救' : v.type === 4 ? '团' : v.type === 5 ? '套' : ''
                list.push(v)
            })
            this.squarerows.list = list
            this.squarerows.total = data.total
        },
        setSort(id) {
            this.obj.relatedName = ''
            this.setObj('sort', id)
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
            if (this.goodrows.total > this.obj.current * this.obj.size) {
                this.obj.current += 1
                this.getGoodList()
            }
        },
        compare(newobj, oldobj) {
            const obj = {}
            Object.keys(oldobj).forEach((key) => {
                if (typeof newobj[key] === 'number') {
                    obj[key] = newobj[key]
                } else {
                    obj[key] = newobj[key] || oldobj[key]
                }
            })
            return obj
        },
        setShare() {
            this.share = true
        },
        async setAttention() {
            this.isPreview()
            this.showload = true
            const { code } = await this.$request.post('/coc-social/api/v2/article/followExpert', { userId: this.obj.userId })
            if (code === 200) {
                this.$refs.uToast.show({
                    message: this.info.followType === 0 ? '关注成功' : '取关成功',
                    type: 'success'
                })
                this.getDetails()
            }
            this.showload = false
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #FFFFFF;
}

.card {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 750rpx;
    height: 385rpx;
    background: linear-gradient(180deg, rgba(34, 34, 34, 0) 0%, rgba(34, 34, 34, 0.7) 100%);
    margin-top: -385rpx;
}

.navigation {
    width: 750rpx;
    height: 92rpx;
    margin-bottom: 88rpx;
}

.option {
    justify-content: flex-end;
    align-items: center;
    height: 85rpx;
    margin-bottom: 29rpx;
}

.bgc {
    width: 750rpx;
    height: 385rpx;
}

.df {
    display: flex;
}

.fdc {
    flex-direction: column;
}

.aic {
    align-items: center;
}

.mt15 {
    margin-top: 15rpx;
}

.ml13 {
    margin-left: 13rpx;
}

.ml15 {
    margin-left: 15rpx;
}

.mr15 {
    margin-right: 15rpx;
}

.mr23 {
    margin-right: 23rpx;
}

.w36h36 {
    width: 36rpx;
    height: 36rpx;
}

.w38h38 {
    width: 38rpx;
    height: 38rpx;
    border-radius: 19rpx;
}

.w48h48 {
    width: 48rpx;
    height: 48rpx;
}

.w85h85 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 85rpx;
    height: 85rpx;
}

.w96h96 {
    width: 96rpx;
    height: 96rpx;
}

.mh925 {
    min-height: 925rpx;
}

.btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 62rpx;
    background: rgba(34, 34, 34, 0.1);
    border-radius: 31rpx;
    border: 2rpx solid #FFFFFF;
    padding-left: 31rpx;
    padding-right: 31rpx;

    &-title {
        font-size: 27rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 32rpx;
        margin-left: 8rpx;
    }
}

.card2 {
    width: 704rpx;
    height: 279rpx;
    margin-top: -29rpx;
    // box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(153,153,153,0.25);
}

.tx {
    width: 176rpx;
    height: 176rpx;
    border-radius: 88rpx;
    border: 8rpx solid #FFFFFF;
}

.name {
    font-size: 38rpx;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #222222;
    line-height: 54rpx;
    margin-top: 95rpx;
}

.content {
    font-size: 23rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 33rpx;
    margin-top: 4rpx;
}

.label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48rpx;
    background: #FFF2F2;
    border-radius: 24rpx;
    margin-top: 15rpx;

    &-title {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #D91B1B;
        line-height: 27rpx;
        margin: 0 15rpx;
    }
}

.card3 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 742rpx;
    height: 15rpx;
}

.line {
    width: 704rpx;
    height: 1rpx;
    background: #DEDEDE;
}

.no-image {
    width: 732rpx;
    height: 288rpx;
    margin-top: 23rpx;
    margin-bottom: 39rpx;
}

.bgcD91B1B {
    background: #D91B1B;
    border: 1rpx solid #D91B1B;
}

.bgcEFEFEF {
    background: #EFEFEF;
    border: 1rpx solid #EFEFEF;
}

.c999999 {
    color: #999999;
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>