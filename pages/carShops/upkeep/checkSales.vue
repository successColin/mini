<template>
    <view class="page">
        <view class="SaleList">
            <view class="saleItem flex jsb alc" v-for="(item, index) in saleList" :key="item.id" @click="checkSale(item)">
                <view class="flex alc">
                    <image :src="item.url ? item.url : noneImg" @error="imgError($event, index)" class="salePic"></image>
                    <view class="">
                        <view class="fwb">{{ item.nickname }}</view>
                        <view class="size21 txtDarkGray" style="margin-top:15rpx;">已服务{{ item.num }}人</view>
                    </view>
                </view>
                <view class="checkBtn tac">选择</view>
            </view>
        </view>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
import {
    getstorage,
    setstorage,
    tologin
} from '@/utils/index.js'
export default {
    components: {
    },
    data() {
        return {
            saleList: [],
            isLoadMore: false,
            total: 0,
            shopId: '',
            noneImg: '../static/image/mo.png'
        }
    },

    onLoad(option) {
        this.shopId = option.shopId
        this.getList()
    },
    onReachScollBottom() {
        if (this.isLoadMore) {
            this.isLoadMore = false
            this.queruData.current++
            this.getList()
        }
    },
    methods: {
        getList() {
            this.$newrequest.get("/coc-active/api/v1/four_s/customer_manager/list/" + this.shopId).then(res => {
                this.saleList = res.data
            })
        },
        imgError(e, index) {
            if (this.saleList.length > 0) {
                this.saleList[index].url = "../static/image/mo.png"
            }
        },
        checkSale(item) {
            this.$newrequest.post("/coc-active/api/v1/four_s/customer_manager/bind", {
                id: item.id
            }).then(res => {
                if (res.code == 200) {
                    uni.showToast({
                        icon: 'success',
                        title: '绑定成功',
                        duration: '1500',
                    })
                    uni.navigateBack({
                        delta: 1
                    });
                }
            })
        }
    }
}

</script>

<style lang="scss" scoped>
.page {
    padding: 15rpx 25rpx;
    background-color: #fff;
}

.SaleList {
    margin-bottom: 20rpx;

    .saleItem {
        margin-bottom: 30rpx;

        .salePic {
            width: 84rpx;
            height: 84rpx;
            border-radius: 50%;
            margin-right: 30rpx;
        }

        .checkBtn {
            width: 100rpx;
            height: 48rpx;
            line-height: 48rpx;
            background: #D91B1B;
            border-radius: 24rpx;
            color: #fff;
        }
    }

    .saleItem:nth-last-child(1) {
        margin-bottom: 0;
    }
}
</style>
