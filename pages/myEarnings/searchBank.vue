<template>
    <view class="page">
        <view class="flex bgfff searchTop alc">
            <view class="box">
                <u-search placeholder="搜索银行名" v-model="keyword" :showAction="true" :clearabled="true"
					@search='getList' ></u-search>
            </view>
        </view>
        <view class="card mt20">
            <view class="size28 fwb bankItem flex jsb alc" v-for="item in dataList" @click="checkBank(item)">
                <view>{{item}}</view>
                <u-icon  size="12" name="arrow-right"></u-icon>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            dataList: [],
            keyword:'',
        }
    },
    onLoad() {
        this.getList()
    },
    onShow() {
       
    },
    methods: {
        getList() {
            this.$request.post("/coc-active/api/v2/withdraw/bank/list", {
                titleStr: this.keyword
            }).then(res => {
                this.dataList = res.data
            })
        },
       
        checkBank(item){
            console.log(item)
            uni.$emit('bankdata', item)
            uni.navigateBack({
                delta: 1
            })
        }
      
    }
}
</script>

<style lang="scss" scoped>

.card {
    background-color: #ffffff;
    padding: 0 30rpx;
    width: 700rpx;
    margin: 30rpx auto;
    line-height: 86rpx;
    box-sizing: border-box;
    border-radius: 10rpx;
}
.searchTop{
    padding: 25rpx;
    
}
.box {
    width: 100%;
}
.sbtn{
    color: #999;
    width: 100rpx;
    text-align: center;

}
.bankItem{
    border-bottom: 1rpx solid #e8e8e8;
}
</style>
