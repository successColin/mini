<template>
    <about left="出游食宿" right="去寻味" @click="toList">
        <template>
            <scroll-view class="accommodations" scroll-x="true">
                <view v-for="(v, i) in list" :key="i" class="accommodations-item" @click="toDetails(v)">
                    <img :src="v.coverPicture" class="accommodations-item-image" />
                    <view class="accommodations-item-title">{{ v.title }}</view>
                    <view class="accommodations-item-bottom">
                        <view class="accommodations-item-symbol">￥</view>
                        <view class="accommodations-item-money">{{ v.bankCardPrice || v.flashSalePrice }}</view>
                        <view class="accommodations-item-cross">M团价￥{{ v.mgroupPrice || v.marketPrice }}</view>
                    </view>
                </view>
            </scroll-view>
        </template>
    </about>
</template>
<script>
import about from '@/pages/home/components/about.vue';
export default {
    components: { about },
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getList()
        uni.$on('updatedata', () => {
            this.getList()
        })
    },
    destroyed() {
        uni.$off('updatedata')
    },
    methods: {
        async getList() {
            const { code, data } = await this.$request.post('/coc-active/api/v1/adv/space/getAdvGroupAndMeal', {})
            console.log(code, data)
            if (code === 200) {
                this.list = data
            }
        },
        toList() {
            uni.navigateTo({
                url: '/pages/gourmetGroggery/index'
            })
        },
        toDetails(value) {
            if (value.relatedType === 4) {
                uni.navigateTo({
                    url: '/pages/grouppurchase/packagedetail?id=' + value.relatedId
                })
            } else {

                uni.navigateTo({
                    url: '/pages/grouppurchase/detail?id=' + value.relatedId
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.accommodations {
    white-space: nowrap;
    width: 710rpx;
    margin-left: 10rpx;

    &-item {
        display: inline-block;
        margin-right: 10rpx;

        &-image {
            width: 276rpx;
            height: 276rpx;
            background: #FF2215;
            border-radius: 10rpx;
        }

        &-title {
            white-space: normal;
            width: 276rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 28rpx;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 9rpx;
            margin-bottom: 10rpx;
        }

        &-bottom {
            display: flex;
            margin-bottom: 16rpx;
        }

        &-symbol {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #D91B1B;
            line-height: 36rpx;
            margin-top: 2rpx;
        }

        &-money {
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #D91B1B;
            line-height: 36rpx;
        }

        &-cross {
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            text-decoration: line-through;
            color: #999999;
            line-height: 36rpx;
            margin-left: 9rpx;
            margin-top: 1rpx;
        }
    }
}
</style>