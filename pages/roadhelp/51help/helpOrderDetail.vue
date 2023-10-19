<template>
    <view class="page">
        <view class="orderTop">
            <view class="flex alc jsb">
                 <!-- 更换轮胎 -->
                 <image src="https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689142986596.png" 
                class="titlePic" v-if="orderD.options==2"></image>
                <!-- 车辆搭电 -->
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689142926312.png"
                    class="titlePic" v-if="orderD.options == 3"></image>
                <!-- 困境救援 -->
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689143010235.png" 
                class="titlePic" v-if="orderD.options==6"></image>
                <!-- 平板拖车 -->
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689143039690.png" 
                class="titlePic" v-if="orderD.options==4"></image>
                <!-- 地库牵引 -->
                <image src="https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689142968557.png"
                class="titlePic" v-if="orderD.options==5"></image>
                <!-- <view class="size24 orderState">{{ orderD.status_text }}</view> -->
                <view class="size24 orderState" 
                v-if="orderD.status==0||orderD.status==9||orderD.status==10||orderD.status==11||orderD.status==12">待接单</view>
                <view class="size24" v-if="orderD.status==1||orderD.status==3||orderD.status==4">已接单</view>
                <view class="size24" v-if="orderD.status==5||orderD.status==6||orderD.status==7||orderD.status==14">已出车</view>
                <view class="size24" v-if="orderD.status==8">已完成</view>
                <view class="size24" v-if="orderD.status==2||orderD.status==13||orderD.status==15">已取消</view>
            </view>
            <view class="flex alc jsb mt20">
                <view class="size24">订单编号：{{ orderD.order_no }}</view>
                <view class="orderBtn bgfff mainRed" @click="hasten"  
                v-if="orderD.status!=8&&orderD.status!=2&&orderD.status!=13&&orderD.status!=15">催单</view>
            </view>
        </view>
        <view class="helpBox bgfff br10">
            <view class="contRow flex">
                <text class="contL txtDarkGray size24 ">救援地点</text>
                <text class="contR oneLine size24">{{ orderD.rescue_start }}</text>
            </view>
            <!-- 平板拖车 -->
            <view class="contRow flex" v-if="orderD.options==4||orderD.options==5">
                <text class="contL txtDarkGray size24 ">拖车地点</text>
                <text class="contR oneLine size24">{{ orderD.rescue_dest }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">救援公里</text>
                <text class="size24">{{ orderD.arrive_mileage }}公里</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">救援费用</text>
                <text class="mainRed size24">￥{{ orderD.money }}</text>
            </view>
        </view>
        <view class="helpBox bgfff br10">
            <view class="contRow flex">
                <text class="contL txtDarkGray size24 ">发起人</text>
                <text class="size24">{{ orderD.customer_name }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">联系电话</text>
                <text class="size24">{{ orderD.customer_phone }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">救援车辆</text>
                <text class="size24">{{ orderD.car_number_plates }}</text>
            </view>
        </view>
        <!-- 平板拖车 -->
        <!-- order_status 5司机已接单 6司机到达救援地点 7开始拖车14到达目的地  -->
        <view class="helpBox bgfff br10" v-if="orderD.order_status==5||orderD.order_status==6||
        orderD.order_status==7||orderD.order_status==14">
            <view class="contRow flex">
                <text class="contL txtDarkGray size24 ">救援司机</text>
                <text class="size24">{{ orderD.driver_info.name }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">所属公司</text>
                <text class="size24">{{ orderD.driver_info.owned_company }}</text>
            </view>
            <view class="contRow flex">
                <text class="contL txtDarkGray size24">联系电话</text>
                <text class="size24">{{ orderD.driver_info.phone }}</text>
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

    data() {
        return {
            orderD: {}
        };
    },
    onLoad(options) {
        this.getDetail(options.id)
    },
    methods: {
        getDetail(id) {
            this.$request.post("/coc-active/api/v1/road/rescue/orderDetail", { id: id }).then(res => {
                if(res.code==200){
                    this.orderD = res.data
                }
            })
        },
        hasten() { 
            this.$request.post("/coc-active/api/v1/road/rescue/reminderOrder", { id: this.orderD.id }).then(res => {
                if(res.code==200){
                    this.$refs.uToast.show({
                        message: '已催单，将通知司机尽快到达。',
                    });
                }else {
                    this.$refs.uToast.show({
                        message: '催单失败',
                    });
                }
            })
        }
    }
};
</script>
<style lang="scss" scoped>
.orderTop {
    width: 100%;
    height: 188rpx;
    background: url('https://oss.dcqcjlb.com/51che_java_dev/20230712/file_1689142709649.png') no-repeat;
    background-size: cover;
    padding: 40rpx 50rpx;
    color: #fff;
    box-sizing: border-box;

    .orderBtn {
        width: 100rpx;
        height: 46rpx;
        line-height: 46rpx;
        border-radius: 40rpx;
        text-align: center;
        font-size: 24rpx;
    }

    .orderState {
        width: 100rpx;
        text-align: center;
    }

    .titlePic {
        width: 167rpx;
        height: 44rpx;
    }
}

.helpBox {
    width: 700rpx;
    margin: 20rpx auto 0;
    padding: 20rpx 25rpx;
    line-height: 40rpx;
    font-size: 24rpx;
    box-sizing: border-box;

    .contL {
        margin-right: 30rpx;
        width: 100rpx;
    }
}
.oneLine {
    width: 500rpx;
}
</style>
  