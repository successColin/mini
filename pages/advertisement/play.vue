<template>
    <view class="play">
        <view class="navigation">
            <scroll-view class="navigation-list" scroll-x="true">
                <view class="flex">
                    <view v-for="(v, i) in category" :key="i" :class="v.status ? 'navigation-title' : 'navigation-untitle'"
                        @click="setCategory(v)">{{ v.name }}</view>
                </view>
            </scroll-view>
            <view class="navigation-image" @click="popup = true">
                <u-icon name="arrow-down" />
            </view>
        </view>
        <view v-for="(v, i) in rows.list" :key="i" class="item" @click="toDetails(v)">
            <view class="pr">
                <image :src="v.coverPicture" class="item-image" />
                <view v-if="v.activitySignUpStatus === 1 || v.activitySignUpStatus === 2" class="item-date">
                    <text v-if="v.activitySignUpStatus === 2">报名截止时间</text>
                    <text v-if="v.activitySignUpStatus === 1">报名开启时间</text>
                    {{ v.activitySignUpStatus === 2 ? v.signUpEndTime : v.signUpEndTime }}
                </view>
                <view class="item-position">
                    <view :class="v.districtName && v.districtName.length > 0 ? '' : 'o0'" class="item-address">{{
                        v.districtName }}</view>
                    <view v-if="v.activitySignUpStatus === 2" class="item-signup">报名中</view>
                </view>
            </view>
            <view class="item-title">{{ v.title }}</view>
            <view class="flex jsb alc mt12">
                <view class="flex aife">
                    <view class="flex aife">
                        <view class="item-symbol">￥</view>
                        <view class="item-money">{{ v.flashSalePrice }}</view>
                    </view>
                    <view class="item-price">{{ v.marketPrice }}</view>
                </view>
                <view class="flex alc">
                    <view class="item-number">已报名 {{ v.saleNum }}/{{ v.stock }}</view>
                    <image v-if="v.saleNum > 0" v-for="(value, index) in v.headPortraits" :key="index" :src="value"
                        class="item-head ml16" />
                    <view v-if="v.saleNum > 2" class="item-head mr19">
                        <view class="item-head-drop" />
                        <view class="item-head-drop" />
                        <view class="item-head-drop" />
                    </view>
                </view>
            </view>
            <view class="item-shop">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698629497831.png"
                    class="item-shop-image" />
                <view class="item-shop-title">{{ v.baseName }}</view>
            </view>
        </view>
        <view v-if="popup" class="popup" @click="popup = false">
            <view class="popup-top" @click.stop="popup = true">
                <view class="popup-top-image" @click.stop="popup = false">
                    <u-icon name="arrow-up" />
                </view>
            </view>
            <view class="popup-list" @click.stop="">
                <view v-for="(v, i) in category" :key="i" :class="v.status ? 'popup-item' : 'popup-unitem'"
                    @click.stop="setCategory(v)">{{ v.name }}</view>
            </view>
        </view>
        <view v-if="bottom_status" class="play-bottom">我到底啦~</view>
        <float v-if="params.tag" :tag="params.tag" />
        <view class="safe-bottom-height" />
    </view>
</template>

<script>
import float from '@/components/float/index.vue'
export default {
    components: {
        float
    },
    data() {
        return {
            rows: {
                list: [],
                total: 0
            },
            category: [],
            popup: false,
            params: {
                current: 1,
                size: 10
            }
        }
    },
    onLoad(option) {
        console.log(option)
        uni.setNavigationBarTitle({
            title: option.title,
        });
        this.params.tag = option.tag * 1
        this.params.relId = option.id * 1
        this.params.type = option.type * 1
        this.getList()
        this.getCategoryList()
    },
    created() { },
    onReachBottom() {
        if (this.rows.total > this.params.current * this.params.size) {
            this.params.current += 1
            this.getList()
        } else {
            this.bottom_status = true
        }
    },
    methods: {
        async getList() {
            const { data: { records, total } } = await this.$request.post('/coc-active/api/v2/homePage/activityDetails', this.params)
            const list = JSON.parse(JSON.stringify(this.rows.list))
            records.forEach((v) => {
                list.push(v)
            })
            this.rows.list = list
            this.rows.total = total
        },
        async getCategoryList() {
            const params = { shopType: 1, type: 2 }
            if (this.params.tag === 3 || this.params.tag === 4) {
                params.property = this.params.tag === 3 ? 1 : 2
            }
            if (this.params.tag === 5) {
                params.type = 3
            }
            const { data } = await this.$request.post('/coc-active/api/v1/activityShop/getNewShopCategoryList', params)
            const list = [{ id: 0, name: '推荐', status: true }]
            if (data) {
                data.forEach((v) => {
                    list.push({ id: v.id, name: v.name, status: false })
                })
            }
            this.category = list
        },
        setCategory(value) {
            this.category.forEach((v) => {
                if (JSON.stringify(v) === JSON.stringify(value)) {
                    v.status = true
                } else {
                    v.status = false
                }
            })
            this.params.shopCategoryId = value.id
            this.rows.list = []
            this.popup = false
            this.getList()
        },
        toDetails(value) {
            const list = [
                {
                    id: 3,//户外畅游  详情
                    url: '/pages/home/activityDetail/index'
                },
                {
                    id: 4,//户内嗨乐 详情
                    url: '/pages/home/activityDetail/index'
                },
                {
                    id: 5,//4s 玩乐活动详情
                    url: '/pages/carShops/4Sdetail/shopActiveDetail'
                }
            ]
            let url = ''
            list.forEach((v) => {
                if (v.id === this.params.tag) {
                    url = v.url
                }
            })
            if (url.length > 0) {
                uni.navigateTo({
                    url: url + '?id=' + value.relId
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.play {
    position: relative;

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }
}

.navigation {
    position: relative;
    display: flex;
    align-items: center;
    width: 729rpx;
    height: 67rpx;
    background: #FFFFFF;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    padding-left: 21rpx;

    &-list {
        width: 652rpx;
        white-space: nowrap;
        margin-left: 16rpx;
        margin-right: 62rpx;
    }

    &-untitle {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 15rpx;
        margin-right: 15rpx;
    }

    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 15rpx;
        margin-right: 15rpx;
    }

    &-image {
        position: absolute;
        top: 18rpx;
        right: 31rpx;
        height: 16rpx;
    }

}

.item {
    width: 700rpx;
    border-radius: 10rpx;
    margin-left: 25rpx;
    margin-right: 25rpx;
    margin-top: 10rpx;
    padding-top: 5rpx;

    &-image {
        width: 700rpx;
        height: 400rpx;
        border-radius: 10rpx;
    }

    &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-top: 30rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }

    &-symbol {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #D91B1B;
        padding-bottom: 4rpx;
    }

    &-money {
        font-size: 40rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #D91B1B;
        margin-left: 2rpx;
    }

    &-price {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        text-decoration: line-through;
        color: #999999;
        margin-left: 10rpx;
        padding-bottom: 5rpx;
    }

    &-number {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
    }

    &-head {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        margin-left: 2rpx;
        margin-right: 2rpx;

        &-drop {
            width: 6rpx;
            height: 6rpx;
            background: #999999;
            border-radius: 50%;
            margin-left: 2rpx;
            margin-right: 2rpx;
        }
    }

    &-shop {
        display: flex;
        align-items: center;
        margin-top: 10rpx;
        margin-bottom: 20rpx;

        &-image {
            width: 26rpx;
            height: 26rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            margin-left: 8rpx;
        }
    }

    &-address {
        width: 120rpx;
        height: 52rpx;
        background: rgba(34, 34, 34, 0.5);
        border-radius: 25rpx;
    }

    &-position {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 28rpx;
        margin-right: 28rpx;
        width: 644rpx;
        bottom: 28rpx;
    }

    &-address {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 52rpx;
        background: rgba(34, 34, 34, 0.5);
        border-radius: 25rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }

    &-signup {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 120rpx;
        height: 52rpx;
        background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
        border-radius: 26rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }

    &-date {
        position: absolute;
        display: flex;
        align-items: center;
        padding-left: 14rpx;
        padding-right: 30rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        top: 16rpx;
        left: 1rpx;
        // width: 280rpx;
        height: 52rpx;
        background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
        border-radius: 0rpx 26rpx 26rpx 0rpx;
    }
}

.popup {
    position: absolute;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);

    &-top {
        position: relative;
        height: 67rpx;
        background: #FFFFFF;

        &-image {
            position: absolute;
            top: 25.5rpx;
            right: 31rpx;
        }
    }

    &-list {
        display: flex;
        flex-wrap: wrap;
        background: #FFFFFF;
        padding-left: 15rpx;
        padding-right: 15rpx;
        padding-bottom: 24rpx;
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 170rpx;
        height: 62rpx;
        background: rgba(217, 27, 27, 0.08);
        border-radius: 10rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #D91B1B;
        margin: 10rpx 5rpx;
    }

    &-unitem {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 170rpx;
        height: 62rpx;
        background: #F8F8F8;
        border-radius: 10rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin: 10rpx 5rpx;
    }

}

image {
    display: block;
}

.mt12 {
    margin-top: 12rpx;
}

.ml16 {
    margin-left: 16rpx;
}

.pr {
    position: relative;
}

.o0 {
    opacity: 0;
}

.aife {
    align-items: flex-end;
}

.safe-bottom-height {
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>
