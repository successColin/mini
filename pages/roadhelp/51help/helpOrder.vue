<template>
    <view class="page">
        <view class="list" v-if="orderList.length">
            <view class="item mt20 bgfff br10" v-for="(item,index) in orderList" :key="index">
                <view class="title flex jsb alc" @click="lookOrder(item.id)">
                    <view class="fwb size28 ">{{ item.options_text }}</view>
                    <!--待接单:  0 待派单 9商家拒单 10司机拒单 11商家派单超时 12司机接单超时 
                        已接单： 1派单 3商家接单 4商家已派单 
                        已出车： 5司机已接单 6司机到达救援地点 7开始拖车14到达目的地 
                        已完成：8订单完成 
                        已取消：2订单取消 13放空 15确认放空 -->
                    <view class="mainRed size24" v-if="item.status==0||item.status==9||item.status==10||item.status==11||item.status==12">待接单</view>
                    <view class="mainRed size24" v-if="item.status==1||item.status==3||item.status==4">已接单</view>
                    <view class="mainRed size24" v-if="item.status==5||item.status==6||item.status==7||item.status==14">已出车</view>
                    <view class="mainRed size24" v-if="item.status==8">已完成</view>
                    <view class="mainRed size24" v-if="item.status==2||item.status==13||item.status==15">已取消</view>
                </view>
                <view class="cont">
                    <view  @click="lookOrder(item.id)">
                        <view class="contRow flex" >
                            <text class="contL txtDarkGray size24 ">救援地点</text>
                            <text class="contR oneLine size24">{{item.rescue_start}}</text>
                        </view>
                        <view class="contRow flex" v-if="item.options==4">
                            <text class="contL txtDarkGray size24">拖车地点</text>
                            <text class="contR oneLine size24">{{ item.rescue_dest }}</text>
                        </view>
                        <view class="contRow flex">
                            <text class="contL txtDarkGray size24">订单时间</text>
                            <text class="contR size24">{{ item.created_at }}</text>
                        </view>
                    </view>
                    <view class="flex jsb alc contRow">
                        <view>
                            <text class="contL txtDarkGray size24">救援费用</text>
                            <text class="mainRed size24">￥{{item.money}}</text>
                        </view>
                        <view class="flex ">
                            <!-- item.options = 0 -->
                            <view class="cancelBtn orderBtn" @click="lookCancelOrder(item.id)"  v-if="item.status==0||item.status==9||item.status==10||item.status==11||item.status==12">取消</view>
                            <view class="lookBtn  ml10 orderBtn bgRed txtColorWhite" @click="lookOrder(item.id)">查看</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view v-if="showEmpty">
            <view style="margin-top: 100rpx;text-align: center;">
                <image style="width: 350rpx;height: 280rpx;"
                src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
                </image>
            </view>
            <view style="font-size: 24rpx;color: #999999;text-align: center;">
                暂无订单
            </view>
        </view>
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
        orderList:[],
        showEmpty: false,
        isReachBottom: false,
        isLoadMore: false,
      };
    },
    onLoad() {
        this.getOrderList()
	},
  
    methods: {
        getOrderList(){
            this.$request.post("/coc-active/api/v1/road/rescue/orderList").then(res => {
                this.orderList = res.data
                if(!res.data.length){
                    this.showEmpty = true
                }
            })
        },
        lookOrder(id){
            console.log(id)
            uni.navigateTo({
                url: '/pages/roadhelp/51help/helpOrderDetail?id=' + id
            })
        },
        lookCancelOrder(id){
            uni.navigateTo({
                url: '/pages/roadhelp/51help/helpOrderCancel?id=' + id
            })  
        }
    }
  };
  </script>
  <style lang="scss" scoped>
    .page {
        padding: 0 25rpx 50rpx;
    }
    .item {
        padding:0 25rpx 30rpx;
        .title{
            padding: 30rpx 0;
            border-bottom: 1rpx solid #E8E8E8;
        }
        .contRow{
            padding-top: 30rpx
        }

        .contL{
            margin-right: 30rpx;
        }
        .contR{
            width: 500rpx;
            
        }
        .orderBtn{
            width: 100rpx;
            height: 46rpx;
            line-height: 46rpx;
            border-radius: 10rpx;
            text-align: center;
            font-size: 24rpx;
        }
        .cancelBtn{
            background-color: #E8E8E8;
        }
    
    }
  </style>
  