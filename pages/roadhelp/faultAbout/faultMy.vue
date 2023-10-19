<template>
    <view class="page">
        <view class="list ">
            <view class="question card mb20" v-for="(item, index) in myList" :key="item.id" @click="lookDetail(item)">
                <view class="flex alc">
                    <view class="wen">问</view>
                    <text class="oneLine size28 fwb ml10" style="width: 90%;">{{ item.question }}</text>
                </view>
                <view class="flex alc jsb mt10">
                    <view class="oneLine txtLighGray size24" style="width: 85%;" v-if="item.answers[0].answer">{{ item.answers[0].answer }}</view>
                    <view class="oneLine txtLighGray size24"  v-else>目前暂无回复...</view>
                    <view class="mainRed size24" >查看 ></view>
                </view>
            </view>
        </view>
        <!-- 底部 -->
        <view class="qb flex jsb alc" @click="bindModal">
            <view class="flex">
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693530000054.png" class="Kf"></image>
                <view class="txtLighGray size24">专业4S店售后经理为您解答</view>
            </view>
            <view class="flex qubtn alc jsc" >
                <u-icon name="question-circle" color="#fff"></u-icon>
                <text class="ml10 size28 fwb">去提问</text>
            </view>
        </view>
        <u-popup :show="infoShow" :safeAreaInsetBottom='false' @close="infoShow = false" mode="bottom" round="10">
            <view class="tac size28 fwb" style="padding: 40rpx;">请先选择爱车品牌</view>
            <view class="list flex alc" style="padding: 0 25rpx;flex-wrap: wrap;">
                <view class="brand tac" v-for="item in brandList" :key="item.brandId" @click="bindBrand(item)"
                    :style="{ color: brand.brandId == item.brandId ? '#D91B1B' : '#222222', background: brand.brandId == item.brandId ? '#FFE1E1' : '#F8F8F8' }">
                    {{ item.brandName }}</view>
            </view>
            <view class="size20  tac  mt20 txtLighGray">更多4S店接洽中..</view>
            <view class="tac brandBtn" @click="bindCar">去选择4S店</view>
        </u-popup>
    </view>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            infoShow: false,
            brandList: [],
            myList: [],
            brand: {},
        }
    },

    onLoad(option) {
        this.getMyList()
        this.getBrand()
    },
    
    methods: {
        getBrand() {
            this.$request.post("/coc-active/api/v1/four_s/fourSBrand", {}).then(res => {
                this.brandList = res.data
            })
        },
        getMyList(){
            this.$request51help.post("api/club/fault_ask_list", { uid: uni.getStorageSync("userId") }).then(res => {
                if (res.code == 1) {
                    this.myList = res.data
                }
            })
        },
        bindModal() {
            this.infoShow = true
        },
        
        bindBrand(item) {
            this.brand = item
        },
        bindCar() {
            if (this.brand.brandId) {
                this.infoShow = false
                uni.navigateTo({
                    url: "/pages/roadhelp/faultAbout/faultCheckShop?brand=" + JSON.stringify(this.brand)
                })
            }else {
                uni.$u.toast('请选择品牌')  
            }
        },
        lookDetail(item) {
            uni.navigateTo({
                url: '/pages/roadhelp/faultAbout/faultDetail',
                success: function(res) {
                    // 通过eventChannel向被打开页面传送数据
                    res.eventChannel.emit('getinfo', {
                        data: item
                    })
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.page{
    padding: 25rpx;
}
.card {
    width: 700rpx;
    box-sizing: border-box;
    margin: 25rpx auto ; 
    padding: 25rpx ;
    border-radius: 10rpx;
    background: #fff;
}
.wen {
    font-size: 20rpx;
    color: #fff;
    background-color: #D91B1B;
    border-radius: 10rpx 0rpx 10rpx 0rpx;
    text-align: center;
    width: 30rpx;
    height: 30rpx;
    line-height: 30rpx;

}
.qb {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 40rpx;
    box-sizing: border-box;
    background-color: #fff;
}
.Kf {
    width: 79rpx;
    height: 38rpx;
}
.qubtn{
    width: 207rpx;
    height: 70rpx;
    line-height: 70rpx;
    background: #D91B1B;
    border-radius: 35rpx;
    color: #fff;
}
.brand {
    width: 160rpx;
    height: 66rpx;
    line-height: 66rpx;
    background: #F8F8F8;
    border-radius: 10rpx;
    box-sizing: border-box;
    margin-right: 20rpx;
    margin-bottom: 20rpx;
    font-size: 24rpx;
}
.brand:nth-child(4n) {
    margin-right: 0;
}

.brandBtn {
    margin: 50rpx auto;
    width: 330rpx;
    height: 70rpx;
    line-height: 70rpx;
    background: #D91B1B;
    border-radius: 35rpx;
    color: #fff;

}
</style>



