<template>
  <view class="page">
    <view class="quanItem bgfff br10">
      <view class="flex jsb HuiNum">
        <view class="flex mt10">
          <text class="typeTip size24 br10 bgRed tac">{{ detailData.useSceneName }}</text>
          <text class="size32 fwb ml10 leftOneLine oneLine">{{ detailData.name }}</text>
        </view>
        <view class="flex mainRed " style="align-items:baseline;">
          <text class="fwb" style="font-size:36rpx;">¥</text>
          <text class="fwb" style="font-size:52rpx;">{{ detailData.discountMoney }}</text>
        </view>
      </view>
      <view class="flex jsb alc mt10">
        <view class="size24">{{ detailData.shopName }}</view>
        <view class="mainRed size24">满{{ detailData.fullMoney }}元使用</view>
      </view>
      <view class="expirationDate size24 txtLighGray">有效期：{{ detailData.useBeginTime }}-{{ detailData.useEndTime }}
      </view>
    </view>
    <view class="othenExplain" >
      <view class="othenH size32 fwb">适用{{detailData.useSceneName }}</view>
      <view v-if="detailData.useType==1">商家内通用</view>
      <view v-if="detailData.useType==2" >
        <view v-for="item in detailData.activityNames" :key="index" class="mb10">{{ item }}</view>
      </view>
    </view>
    <view class="othenExplain">
      <view class="othenH size32 fwb">使用说明</view>
      <u-parse :content="detailData.useDesc"></u-parse>
    </view>
    <!-- 领取 判断显示 -->
    <template v-if="jumpType=='quancenter'">
      <view class="bgRed receiveBtn tac size32 fwb" v-if="detailData.receivingStatus == 2" @click="receiveQuan">领取
      </view>
      <view class="bgGray receiveBtn tac size32 fwb" v-if="detailData.receivingStatus == 1">不可领取</view>
    </template>
  </view>
</template>

<script>
import {
  getstorage,
  setstorage,
  tologin
} from '@/utils/index.js'
export default {
  components: {
  },
  data() {
    return {
      detailData: {},
      id: '',
      jumpType: ''
    }
  },

  onLoad(option) {
    this.id = option.id
    if(option.jumpType){
      this.jumpType = option.jumpType
    }
    this.getDetail(option.id)
  },

  methods: {
    getDetail(id) {
      this.$newrequest.post("/coc-active/api/v1/couponNew/details", { couponNewId: id })
        .then(res => {
          if (res.code == 200) {
            this.detailData = res.data
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
    },
    receiveQuan(item) {
      if (tologin() !== true) {
        return
      }
      this.$request.post("/coc-active/api/v1/couponNew/userGetCouponFromTicketCenter", {
        couponNewId: this.id
      }).then(res => {
        if (res.code == 200) {
          uni.showToast({
            title: '领取成功，前往我的券包查看',
            icon: 'none',
            duration: 1500
          })
          setTimeout(() => {
            uni.navigateBack()
          }, 1500)
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },

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
}

.othenExplain {
  margin-top: 20rpx;
  padding: 10rpx 30rpx 20rpx;

  .othenH {
    margin-bottom: 28rpx;
  }
}

.receiveBtn {
  width: 380rpx;
  height: 76rpx;
  line-height: 76rpx;
  border-radius: 40rpx;
  margin: 200rpx auto;
  color: #fff;

}
</style>
