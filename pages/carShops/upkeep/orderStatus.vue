<template>
  <view class="page">
    <view class="mainRed size32 fweb mb30 payTitile tac">支付成功</view>
    <view class="size24 txtLighGray tac">可前往我的订单中查看购买套餐信息</view>
    <image src="@/pages/carShops/static/image/paySuccess.png" class="paySuccess"></image>
    <!-- 未绑定客户经理 -->
    <view class="checkSale flex jsb alc bgfff br10 mb20" @click="checkSale" v-if="!mySale.customerManagerId">
      <view>选择您的专属客户经理</view>
      <u-icon name="arrow-right" size="14"></u-icon>
    </view>
    <!-- 已绑定客户经理 -->
    <view class="haveSale flex jsb alc bgfff br10 " v-else>
      <view class="flex alc" @click="OnWechat()">
        <image :src="mySale.url" class="salePic"></image>
        <view class="fwb">{{ mySale.nickname }}</view>
        <view class="txtDarkGray" style="margin-left:40rpx">您的专属客户经理</view>
      </view>
      <image src="@/pages/carShops/static/image/sale.png" class="saletel" @click="OnTell()"></image>
    </view>
    <!-- 返回首页 查看订单-->
    <view class="flex alc jsb bgfff fixBottom">
      <view class="backHome" @click="backHome">
        <image src="@/pages/carShops/static/image/backHome.png" class="homePic"></image>
        <view class="size24 mt10">返回首页</view>
      </view>
      <view class="sbrBtn" @click="lookOrder">查看订单</view>
    </view>
    <!-- 二维码弹窗 -->
    <u-popup :safeAreaInsetBottom='false' :show="showcontact" @close="showcontact = false" mode="center">
      <view style="width: 700rpx;height: 700rpx;">
        <view style="text-align: center;margin-top: 50rpx;">
          <image style="width: 440rpx;height: 444rpx;" :src="codeurl" @click="OnpreviewImage"
            :show-menu-by-longpress="true"></image>
        </view>
        <view style="font-size: 24rpx;text-align: center;margin-top: 50rpx;">
          <view>长按保存销售经理微信二维码</view>
        </view>
      </view>
    </u-popup>
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
  components: {
  },
  data() {
    return {
      orderData: {},
      showcontact: false,
      codeurl: '',
      params: {
        id: ''
      },
      mySale: {},
      orderId: '',
      shopId: ''
    }
  },

  onLoad(option) {
    if (option.id) {
      // this.getStatus(option.id)
      this.orderId = option.id
    }
  },
  onShow() {
    this.getDetail(this.orderId)
  },

  methods: {
    checkSale() {
      uni.navigateTo({
        url: "/pages/carShops/upkeep/checkSales?shopId=" + this.shopId
      });
    },
    lookOrder() {
      uni.navigateTo({
        url: "/pages/my/myUpkeepOrder/detail?id=" + this.orderId
      });
    },
    backHome() {
      uni.switchTab({
        url: '/pages/home/index'
      })
    },
    OnpreviewImage() {
      let _this = this
      uni.previewImage({
        urls: _this.codeurl,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {
            console.log('选中了图片', data);
          },
          fail: function (err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    getStatus(id) {
      this.params.id = id
      this.$request.post("/coc-active/api/v2/maintain_meal/result", this.params).then(res => {
        this.orderData = res.data
      })
    },
    getDetail(id) {
      this.$request.get("/coc-active/api/v2/maintain_meal/orderDetails/" + id).then(res => {
        this.shopId = res.data.shopId
        this.mySale = res.data.salesConsultantUserVO
      })
    },
    OnWechat() {
      if (this.mySale.qrCode) {
        this.codeurl = this.mySale.qrCode
        this.showcontact = true
      } else {
        uni.showToast({
          icon: 'none',
          title: '暂无个人二维码，点击右侧打电话试试吧~'
        })
      }
    },
    OnTell() {
      if (this.mySale.phone) {
        uni.makePhoneCall({
          phoneNumber: this.mySale.phone
        });
      } else {
        uni.showToast({
          icon: 'none',
          title: '暂无联系方式，点击左侧添加微信吗吧~'
        })
      }
    },
  }
}

</script>

<style lang="scss" scoped>
.page {
  padding: 15rpx 25rpx;
}

.payTitile {
  font-size: 36rpx;
  margin: 70rpx 0 30rpx;
}

.paySuccess {
  width: 168rpx;
  height: 178rpx;
  display: block;
  margin: 40rpx auto 50rpx;
}

.checkSale {
  padding: 0 25rpx;
  height: 120rpx;
  line-height: 120rpx;
}

.fixBottom {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: 25rpx;
  background-color: #fff;
  z-index: 100;
  box-sizing: border-box;

  .backHome {
    margin-left: 24rpx;
    width: 100rpx;
    text-align: center;

    .homePic {
      width: 46rpx;
      height: 46rpx;
    }
  }

  .sbrBtn {
    width: 260rpx;
    height: 70rpx;
    background: #D91B1B;
    border-radius: 35rpx;
    text-align: center;
    line-height: 70rpx;
    color: #fff;
  }
}

.haveSale {
  padding: 0 25rpx;
  height: 120rpx;
  line-height: 120rpx;

  .salePic {
    width: 84rpx;
    height: 84rpx;
    border-radius: 50%;
    margin-right: 26rpx;
  }

  .saletel {
    width: 34rpx;
    height: 34rpx;
  }
}
</style>
