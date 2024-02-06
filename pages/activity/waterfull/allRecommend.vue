<!-- 达人推荐列表  更多跳进来 -->
<template>
    <view class="page">
        <view v-if="showFlow">
            <WaterfallFlowList :shopId="shopId" :relatedType="relatedType" :relatedId="relatedId" :isShopPunch="isShopPunch"></WaterfallFlowList>
        </view>
    </view>
</template>

<script>
import WaterfallFlowList from "@/components/darenRecommend/WaterfallFlowList.vue"
export default {
    components: {WaterfallFlowList},
    data() {
        return {
            shopId: {
                type: Number,
                default: null,
            },
            relatedId: {
                type: Number,
                default: null,
            },
            relatedType: {
                type: Number,
                default: null,
            },
            isShopPunch: {
                type: Number,
                default: null,
            },
            showFlow: false
        }
    },
    created() {
    },
    onLoad(option){
        this.shopId = option.shopId
        this.relatedType = option.relatedType
        this.relatedId = option.relatedId
        this.isShopPunch= option.isShopPunch
        this.showFlow = true
    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>


</style>
