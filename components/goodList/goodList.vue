<template>
    <view class="page">
        <view class="listBox flex jsb">
            <view class="listItem " v-for="item in list" :key="item.id" @click="toDetail(item.id)">
                <image :src="item.titleImg" class="goodImg" mode="aspectFill"></image>
                <view class="goodCont">
                    <view class="goodTitle">{{ item.name }}</view>
                    <view class="goodjifen"><text class="numjifen fwb size32">{{ item.exchangePrice }}</text><text
                            class="size24">积分</text></view>
                </view>
            </view>
        </view>
        <!-- <view class="reachBottom" v-if="proList.length > 0 && isReachBottom">我到底啦~</view> -->
    </view>
</template>

<script>
import value from '../../uni_modules/uview-ui/components/u-text/value'
export default {
    data() {
        return {
            list: [],
            isReachBottom: false,
        }
    },
    props: ['proList'],
    watch: {
        proList(value) {
            this.list = value
        }
    },
    methods: {
        toDetail(id) {
            uni.navigateTo({
                url: "/pages/integralMall/goods/detail?id=" + id
            })
        }
    }

}
</script>
<style lang="scss" scoped>
.listBox {
    flex-wrap: wrap;

    .listItem {
        width: 330rpx;
        margin-bottom: 20rpx;

        .goodImg {
            width: 330rpx;
            display: block;
            height: 330rpx !important;
            object-fit: cover;
            border-radius: 10rpx 10rpx 0px 0px;
        }

        .goodCont {
            border-radius: 0px 0px 10rpx 10rpx;
            background-color: #fff;
            padding: 20rpx;

            .goodTitle {
                height: 64rpx;
                line-height: 1.2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
            }

            .goodjifen {
                display: flex;
                color: #D91B1B;
                align-items: baseline;

                .numjifen {
                    margin-right: 5rpx;
                }

            }
        }
    }
}

.reachBottom {
    text-align: center;
    font-size: 24rox;
    color: #999999;
    padding: 20rpx;
    font-size: 24rpx;
    color: #999999;
}</style>

