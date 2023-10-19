<template>
  <view class="page">
    <scroll-view scroll-y="true" @scrolltolower="onReachScollBottom" style="max-height:100vh">
      <view v-if="dataList.length == 0" style="margin-top: 300rpx;text-align: center;">
        <image style="width: 245rpx;height: 232rpx;"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221130/d394c9a026f24de9a137783515f5d3c2.png">
        </image>
        <view style="margin-top: 79rpx;" class="size24 txtLighGray">暂无优惠券</view>
      </view>
      <view class="quanItem bgfff br10" v-if="dataList.length > 0" v-for="(item, index) in dataList" :key="index"
        style="margin-bottom: 30rpx;">
        <view @click="lookCoupon(item)">
          <view class="flex jsb HuiNum">
            <view class="flex mt10">
              <text :class="[item.receivingStatus == 1 ? 'bgGray' : 'bgRed', 'typeTip', 'size24', 'br10', 'tac']">{{
                item.useSceneName
              }}</text>
              <text
                :class="[item.receivingStatus == 1 ? 'txtLighGray' : '', 'size32', 'ml10', 'leftOneLine', 'oneLine', 'fwb']">{{ item.name }}</text>
            </view>
            <view :class="[item.receivingStatus == 1 ? 'txtLighGray' : 'mainRed', 'flex']"
              style="align-items:baseline;">
              <text class="fwb" style="font-size:36rpx;">¥</text>
              <text class="fwb" style="font-size:52rpx;">{{ item.discountMoney }}</text>
            </view>
          </view>
          <view class="flex jsb alc mt10">
            <view :class="[item.receivingStatus == 1 ? 'txtLighGray' : '', 'size24']">{{ item.shopName }}</view>
            <view :class="[item.receivingStatus == 1 ? 'txtLighGray' : 'mainRed', 'size24']">满{{ item.fullMoney }}元可用
            </view>
          </view>
        </view>
        <view class="flex jsb alc expirationDate">
          <view class="size24 txtLighGray">有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}</view>
          <view v-if="item.receivingStatus == 1" class="quanbtn bgGray ">
            不可领取
          </view>
          <view v-if="item.receivingStatus == 2" class="quanbtn  bgRed" @click="receiveCoupon(item)">
            领取
          </view>
        </view>
      </view>
      <view v-if="dataList.length > 0" v-for="(item, index) in dataList" :key="index"
        style="margin-top: 40rpx;display: none;">
        <view class="list-img">
          <view class="u-flex" style="align-items: center;">
            <view style="width: 182rpx;text-align: center;">
              <view class="card-left">
                <text style="font-size: 32rpx;">¥</text><text>{{ item.discountMoney }}</text>
              </view>
              <view style="font-size: 20rpx;margin-top: 10rpx;">
                满{{ item.fullMoney }}元可用
              </view>
            </view>
            <view style="margin-top: -10rpx;margin-left: 40rpx;">
              <view class="card-name ellipsis" style="max-width: 350rpx;">
                {{ item.name }}
              </view>
              <view style="font-size: 20rpx;margin-top: 10rpx;">
                有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}
              </view>
            </view>
          </view>
          <view v-if="item.receivingStatus == 1" class="card-right"
            style="background-color: #f8f8f8;color:#999999;border:1rpx solid #f8f8f8;">
            不可领取
          </view>
          <view v-if="item.receivingStatus == 2" class="card-right"
            style="background-color: #FFFFFF;border:1rpx solid #D91B1B;color:#D91B1B ;" @click="receiveCoupon(item)">
            领取
          </view>
        </view>
      </view>
      <view class="reachBottom" v-show="isReachBottom">我到底了~</view>
      <view style="height: 20rpx;"></view>
    </scroll-view>
  </view>
</template>

<script>
import {
  tologin
} from '@/utils/index.js'
export default {
  data() {
    return {
      isLoadMore: true,
      dataList: [],
      data: {
        current: 1,
        size: 20
      },
      isReachBottom: false,
      isLoadMore: false,
      pageTotal: 1,
    }
  },
  onLoad(option) {
    this.getList()
  },

  methods: {
    onReachScollBottom() {
      if (this.data.current < this.pageTotal) {
        this.data.current++
        this.isLoadMore = true
        this.isReachBottom = false
        this.getList();
      } else {
        this.isLoadMore = false
        this.isReachBottom = true
      }
    },
    getList() {
      this.$request.post("/coc-active/api/v1/couponNew/ticket/center", this.data).then(res => {
        this.isReachBottom = false
        this.pageTotal = res.data.pages
        if (res.data.records.length) {
          res.data.records.filter(s => {
            this.dataList.push(s)
          })
        }
        if (this.pageTotal == res.data.pages && res.data.records.length <= this.data.size) {
          this.isLoadMore = false
        }
      })
    },
    receiveCoupon(item) {
      if (tologin() !== true) {
        return
      }
      this.$request.post("/coc-active/api/v1/couponNew/userGetCouponFromTicketCenter", {
        couponNewId: item.id
      }).then(res => {
        if (res.code == 200) {
          uni.showToast({
            title: '领取成功，前往我的券包查看',
            icon: 'none',
            duration: 2000
          })
          this.isLoadMore = true
          this.data.current = 1
          this.getList()
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    lookCoupon(item) {
      uni.navigateTo({
        url: '/pages/carShops/upkeep/couponDes?id=' + item.id + '&jumpType=quancenter'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  padding: 30rpx 25rpx;
  background-color: #f8f8f8;
}

.quanItem {
  padding: 20rpx 30rpx;

  .HuiNum {
    .typeTip {
      width: 80rpx;
      height: 40rpx;
      line-height: 40rpx;
      color: #fff;
    }

    .leftOneLine {
      width: 350rpx;
    }
  }

  .expirationDate {
    margin-top: 30rpx;
    padding-top: 20rpx;
    border-top: 1rpx dotted #999;
  }

  .quanbtn {
    width: 140rpx;
    height: 48rpx;
    line-height: 48rpx;
    text-align: center;
    color: #ffffff;
    border-radius: 24rpx;
  }

  .bgGray {
    background-color: #999999;
    color: #ffffff;
  }
}

.tabs {
  height: 100rpx;
  // background: #FFFFFF;
  display: flex;
  justify-content: space-around;

  .tab-item {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 100rpx;
  }

  .current-tab-left {
    color: #D91B1B;
  }

  .current-tab-right {
    color: #D91B1B;
  }

  .current-tab-left:before {
    content: '';
    position: absolute;
    top: 84rpx;
    left: 180rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #D91B1B;
  }

  .current-tab-right:before {
    content: '';
    position: absolute;
    top: 84rpx;
    left: 550rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #D91B1B;
  }
}

.status-type {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-around;

  .type-item {
    width: 220rpx;
    height: 50rpx;
    background-color: #ffffff;
    text-align: center;
    font-size: 24rpx;
    line-height: 50rpx;
    border-radius: 10rpx;
  }

  .current-status-type {
    color: #ffffff;
    background-color: #D91B1B;
  }
}

// .list-img {
//   margin: 20rpx auto;
//   width: 705rpx;
//   height: 138rpx;
//   background-image: url('@/pages/my/static/image/youhuiquan.png');
//   background-size: 100% 100%;
//   display: flex;
//   justify-content: space-between;
//   // align-items: center;
// }

// .card-left {
//   font-size: 42rpx;
//   font-weight: bold;
//   color: #D91B1B;
//   margin-top: -10rpx;
// }

// .card-name {
//   font-size: 28rpx;
//   color: #D91B1B;
//   font-weight: bold;
// }

// .card-right {
//   width: 85rpx;
//   height: 40rpx;
//   border-radius: 10rpx;
//   font-size: 20rpx;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-right: 20rpx;
//   margin-top: 49rpx;
// }

.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.reachBottom {
  text-align: center;
  margin-top: 20rpx;
}
</style>
