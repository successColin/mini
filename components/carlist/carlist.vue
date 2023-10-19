<template>
  <view>
    <view v-if="objData.list_type != 3">
      <view class="newCarItem flex jsb alc mt20" v-for="(item, index) in list" :key="index" @click="lookCarDetail(item)">
        <view class="topTip flex alc jsc" v-if="objData.tab_type!=2">
          <image src="https://oss.dcqcjlb.com/51che_java_dev/20230428/file_1682645411877.png"></image>
        </view>
        <view class="newCarL">
          <image :src="item.img_url" mode="aspectFill"></image>
        </view>
        <view class="newCarR">
          <view class="flex alc mb20">
            <text class="newCarT oneLine">{{ item.vehicle_name }}</text>
          </view>
          <view class="oneLine mb20">{{ item.vehicle_title }}</view>
          <view class="mb20 flex alc">
            <text class="size24 txtLighGray">指导价:{{ item.guide_price }}万</text>
            <image src="@/static/image/down.png" class="carDown ml10" mode="widthFix"></image>
            <text class="size24 newCarHui">直降{{ item.down }}万</text>
          </view>
          <view class="flex alc jsb">
            <view class="newCarShopName size24">
              <text v-if="objData.list_type == 1">月供仅需:</text>
              <text class="fwb mainRed" style="font-size:40rpx" v-if="objData.list_type == 1">{{ item.month_money
              }}</text>
              <text v-if="objData.list_type == 2">一成首付:</text>
              <text class="fwb mainRed" style="font-size:40rpx" v-if="objData.list_type == 2">{{ item.self_pay }}</text>
              <text>{{ ' ' }}万起</text>
            </view>
            <view class="goShop">详情</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 特价列表 -->
    <view v-else>
      <view class="teCarItem flex jsb alc mt20" v-for="(item, index) in list" :key="index" @click="lookCarDetail(item)">
        <view class="teCarL">
          <image :src="item.img_url" mode="aspectFill"></image>
        </view>
        <view class="teCarR">
          <view class="mb20 size28 fwb ">
            <text class="newCarT moreLine">{{ item.vehicle_title }} </text>
          </view>
          <view class="flex alc jsb priceBox">
            <view class="lineG"></view>
            <view class="bgf8 priceItem1">
              <view class="size20">指导价</view>
              <view class="size24">{{ item.guide_price }}万</view>
            </view>
            <view class="bgf8 priceItem2">
              <view class="size20">市场价</view>
              <view class="size24">{{ item.market_price }}万</view>
            </view>
            <view class="mainRed priceItem3" style="background-color: #FCEDED;">
              <view class="size20">直降</view>
              <view class="size24">{{ item.cut_price }}万</view>
            </view>
            <image src="@/static/image/down.png" class="teCarDown" mode="widthFix"></image>
          </view>
          <view class="flex mt20" style='align-items: baseline;'>
            <text>特价:</text> <text class="mainRed size40">{{ item.new_car_price }}</text><text
              class="mainRed size24">万</text>
          </view>
        </view>
      </view>
    </view>
    <view v-if="list.length == 0 && !bottomShow && !loadMore" style="text-align: center;margin-top:160rpx;">
      <view>
        <image style="width: 350rpx;height: 280rpx;"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
        </image>
      </view>
      <view style="font-size: 24rpx;color: #999999;">
        暂无车型
      </view>
    </view>
    <u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
    <view class="reachBottom" v-if="bottomShow">我到底啦~</view>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js'
export default {
  props: {
    objData: {
      type: Object,
      default() {
        return {};
      },
    },
    changeList: {
      type: Boolean,
      default: true
    },
    isBottom: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      obj: {},
      bottomShow: false,
      loadMore: false
    }
  },
  created() {
    this.getList()
  },
  watch: {
    objData: {
      handler(newval, oldval) {
        if (this.changeList) {
          this.list = []
        }
        this.obj = newval
        this.loadMore = false
        this.bottomShow = this.isBottom
        this.getList()
      },
      deep: true,
      immediate: true
    },

  },
  methods: {
    getList() {
      this.loadMore = true
      this.$request51car.post("/app/wechat/api", this.obj).then(res => {
        if (res.data.length > 0) {
          this.bottomShow = false
          if (this.obj.page > 1) {
            res.data.filter(item => {
              this.list.push(item)
            })
          } else {
            this.list = res.data
          }
        }
      }).finally(() => {
        this.loadMore = false
      })
    },
    lookCarDetail(item) {
      if(!tologin()){
      		return false
      	}
      uni.navigateTo({
        url: '/pages/carShops/51carOther/carDetail?type=' + this.objData.list_type + '&item=' + JSON.stringify(item)
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.reachBottom {
  text-align: center;
  font-size: 24rox;
  color: #999999;
  padding: 20rpx;
  font-size: 24rpx;
  color: #999999;
}

.newCarItem {
  position: relative;
  padding: 0 16rpx 0 0;
  background-color: #fff;
  border-radius: 10rpx;
  margin-bottom: 10rpx;

  .topTip {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100rpx;
    height: 38rpx;
    background-color: #FCEDED;
    border-radius: 10rpx 0 10rpx 0;

    image {
      width: 66rpx;
      height: 18rpx;
    }
  }

  .newCarL {
    background: #fff;
    width: 280rpx;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 208rpx;

    image {
      width: 260rpx;
      height: 230rpx;
      border-radius: 10rpx;
    }
  }

  .newCarR {
    width: 380rpx;
    padding: 30rpx 0 20rpx;

    .newCarT {
      font-size: 32rpx;
      font-weight: bold;
      margin-right: 10rpx;
      max-width: 200rpx;
    }

    .carDown {
      width: 38rpx;
      height: 41rpx;
    }

    .newCarHui {
      color: #D91B1B;
    }
  }
}

.teCarItem {
  padding: 10rpx 20rpx 10rpx 10rpx;
  border-radius: 16rpx;
  background-color: #fff;
  box-sizing: border-box;

  .teCarL {
    image {
      width: 250rpx;
      height: 250rpx;
      border-radius: 16rpx;
    }
  }

  .teCarR {
    width: 400rpx;

    .priceBox {
      position: relative;
      border-radius: 10rpx;
      position: relative;

      .priceItem1 {
        width: 132rpx;
        text-align: center;
        padding: 10rpx 0;
      }

      .priceItem2 {
        width: 132rpx;
        text-align: center;
        padding: 10rpx 0;
      }

      .lineG {
        position: absolute;
        width: 1rpx;
        height: 40rpx;
        background-color: #999;
        left: 131rpx;
        top: 20rpx;
        display: block;
      }

      .priceItem3 {
        flex: 1;
        text-align: center;
        padding: 10rpx 0;
      }

      .teCarDown {
        position: absolute;
        width: 38rpx;
        height: 41rpx;
        right: 118rpx;
        top: 20rpx;
      }
    }
  }
}

.size40 {
  font-size: 40rpx;
}

.shopTitle {
  padding: 30rpx 0;

  .moduleTitleL {
    height: 31rpx;
  }
}

.mb20 {
  margin-bottom: 20rpx;
}

.ml15 {
  margin-left: 15rpx;
}


.goShop {
  width: 100rpx;
  height: 52rpx;
  background: #D91B1B;
  border-radius: 10rpx;
  text-align: center;
  line-height: 52rpx;
  font-size: 24rpx;
  color: #fff;
}
</style>
