<template>
    <view>
        <view class="mb20 bgfff">
            <view class="flex jsb alc topItem pdlr">
                <view class="txtDarkGray">车型</view>
                <view>{{ cx_name }}</view>
            </view>
            <view class="flex jsb alc topItem pdlr">
                <view class="txtDarkGray">销售价</view>
                <view>{{ sale_price }}万<text class="txtls"> (指导价{{ guide_price }}万)</text>
                </view>
            </view>
        </view>
        <view class="mb20 bgfff">
            <view class="pdlr listTille size32">首付比例</view>
            <view class="flex alc pdlr" style="flex-wrap:wrap;">
                <view class="listItem payItem jsb alc " v-for="(item, index) in planInfo" :key="index"
                    @click="handlePay(index)" :class="payIndex == index ? 'current' : ''">
                    <view>{{ item.self_pay_rate }}%</view>
                    <view class="size24 ">{{ item.self_pay }}万</view>
                </view>
            </view>
        </view>
        <view class="mb20 bgfff">
            <view class="pdlr listTille size32">分期期限</view>
            <view class="flex alc pdlr ">
                <view class="fenqiItem listItem" v-for="(item, index) in numArr" :key="index" @click="handleNum(index)"
                    :class="fenIndex == index ? 'current' : ''">
                    {{ item.term }}期</view>
            </view>
        </view>
        <view class="mb20 bgfff">
            <view class="pdlr listTille size32">月供金额</view>
            <view class="pdlr flex">
                <view class="fenqiItem listItem current">{{ payNum }}元</view>
            </view>
        </view>
    </view>
</template>
  
<script>
export default {
    data() {
        return {
            id: '',
            cx_name: '',
            guide_price: 0,
            sale_price: 0,
            planInfo: [],
            numArr: [],
            payNum: 0,
            payIndex: 0,
            fenIndex: 0,
        }
    },
    onLoad(option) {
        this.id = option.id
        this.getDetail()
    },
    created() { },
    watch: {},
    methods: {
        getDetail() {
            let obj = {
                id: this.id,
                api_name: 'detail',
                list_type: 1
            }
            this.$request51car.post("/app/wechat/api", obj).then(res => {
                this.planInfo = res.data.plan_info
                this.cx_name = res.data.cx_name
                this.sale_price = res.data.sale_price
                this.guide_price = res.data.guide_price
                this.payNum  = res.data.plan_info[0].plan_list[0].month_money
                this.numArr = this.planInfo[0].plan_list
            }).finally(() => {
                this.loadMore = false
            })
        },
        handlePay(index) {
            this.payIndex = index
            this.numArr = this.planInfo[index].plan_list
            this.payNum = this.planInfo[index].plan_list[0].month_money
        },
        handleNum(index) {
            this.fenIndex = index
            this.payNum = this.numArr[index].month_money
        }
    }
}

</script>
  
<style lang="scss" scoped>
.pdlr {
    padding: 0 30rpx;
}

.topItem {
    height: 110rpx;
    line-height: 110rpx;
    border-top: 1rpx solid #eee;
}

.listTille {
    height: 110rpx;
    line-height: 110rpx;
}

.listItem {
    width: 150rpx;
    height: 100rpx;
    box-sizing: border-box;
    border: 1rpx solid #eee;
    border-radius: 10rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 10rpx;
    margin-right: 30rpx;
    margin-bottom: 30rpx;
}

.flex .fenqiItem {
    justify-content: center;
}

.listItem:nth-child(4n) {
    margin-right: 0;
}

.listItem.current {
    background: #D91B1B;
    color: #fff;
}
</style>
  