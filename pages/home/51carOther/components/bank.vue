<template>
    <view class="page">
        <carousel :topStyle="{ width: '700rpx', 'margin-top': '20rpx' }" :radius="10" height="300rpx" urlkey="url"
            :dataType="2" systemCode="applets_bank_installment" :indicatorType="5" />
        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695090872711.png" class="bank-image"
            @click="toImage" />
        <view class="w700">
            <callist :type="1" :brandApi="brandApi" :carApi="carApi"></callist>
        </view>
    </view>
</template>
<script>
import carousel from '@/components/carousel/index.vue'
import callist from "./carList.vue"
export default {
    components: {
        carousel,
        callist
    },
    data() {
        return {
            brandApi: "api/club_brand_list",
            carApi: "api/direct/wechat_car_list",
        }
    },
    methods: {
        toImage() {
            uni.navigateTo({
                url: `/pages/carShops/51carOther/showPage?type=${8}&title=${'银行优势'}`
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.bank {
    &-image {
        width: 699rpx;
        height: 126rpx;
        margin-top: 30rpx;
    }
}

.w700 {
    width: 700rpx;
}
</style>