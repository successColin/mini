<template>
    <view class="page">
        <view class="shop flex alc jsb" v-for="item in brand.fourSShopVO" :key="item.shopId" @click="checkShop(item)">
            <view class="size28 fwb " >{{ item.baseName }}</view>
            <view class="btn size24 fwb">咨询</view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
           brand:{}
        }
    },
    onLoad(option) {
        this.brand = JSON.parse(option.brand)
    }, 

    methods: {
        checkShop(item) {
            if(item.baseMobile){
                uni.redirectTo({
                    url: "/pages/roadhelp/faultAbout/faultForm?shop="+ JSON.stringify(item)
                })
            }else {
                uni.showToast({
                    title: '该4S店没有售后电话,请换一家',
                    icon: 'none',
                    duration: 2000
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
}
.shop {
    padding: 35rpx 25rpx;
    background-color: #fff;
    border-radius: 10rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
}
.btn {
    width: 72rpx;
    height: 48rpx;
    line-height: 48rpx;
    background: #D91B1B;
    border-radius: 10rpx;
    color: #fff;
    text-align: center;
}

</style>



