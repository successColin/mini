<template>
  <view class="page">
    <view class="flex alc mb10 bgfff contentBox">
      <text>联系方式： </text>
      <input
        type="text"
        v-model="payData.uMobile"
        @change="changeTel"
        style="width: 490rpx"
      />
    </view>
    <view class="orderHui contentBox bgfff">
      <view class="flex jsb mb30">
        <view class="huiL">{{ orderData.maintainName }}</view>
        <view class="mainRed">￥{{ orderData.price }}</view>
      </view>
      <view class="flex alc jsb mb30">
        <view>数量</view>
        <view>1</view>
        <!-- <view class="flex alc qpm">
          <view class="minNum" @click="minNum">-</view>
          <view>{{ payData.maintainNum }}</view>
          <view class="addNum" @click="addNum">+</view>
        </view> -->
      </view>
      <view
        class="flex jsb alc quanCheck"
        style="padding-bottom: 36rpx"
        v-if="orderData.couponUserNews && orderData.couponUserNews.length == 0"
      >
        <view class="huiL">优惠券</view>
        <view class="flex alc">
          <text class="txtLighGray">暂无可用优惠券</text>
        </view>
      </view>
      <view
        class="flex jsb alc quanCheck"
        style="padding-bottom: 36rpx"
        @click="checkQuan"
        v-else
      >
        <view class="huiL">优惠券</view>
        <view class="flex alc">
          <text class="mainRed">{{
            choosecoupon.couponUserNewId
              ? choosecoupon.couponName
              : '请选择优惠券'
          }}</text>
          <u-icon name="arrow-right" size="14"></u-icon>
        </view>
      </view>
      <!-- 合计 -->
      <view class="flex jsb alc" style="padding-top: 36rpx">
        <view class="fwb size32">合计</view>
        <view class="mainRed fwb size32">{{ totalprice }}元</view>
      </view>
    </view>
    <view
      class="mt10 mainRed size24"
      style="text-align: right"
      v-show="minMoney"
      >当前优惠券金额大于等于订单金额，需支付0.01元才可提交</view
    >
    <u-toast ref="uToast"></u-toast>
    <view class="payBtn flex alc jsc" @click="OnPay">
      <image src="@/pages/carShops/static/image/wxpay.png"></image>
      <text class="ml10">微信支付</text>
    </view>
  </view>
</template>

<script>
import { getstorage, tologin } from '@/utils/index.js';
export default {
  components: {},
  data() {
    return {
      isform: 0,
      forwardUserId: '',
      showpay: true,
      orderData: {},
      userId: '',
      totalprice: 0,
      choosecoupon: {},
      id: '', //套餐id
      customerManagerId: '',
      payData: {
        uMobile: '',
        userId: '',
        couponId: '',
        maintainMealId: '',
        couponMoney: 0,
        maintainNum: 1,
        payType: '2',
      },
      minMoney: false,
      formType: 1,
    };
  },

  onLoad(option) {
    if (!getstorage('token')) {
      tologin();
    }
    if (option.formType == 2) {
      this.formType = 2;
    }

    if (option.customerManagerId) {
      this.customerManagerId = option.customerManagerId;
    }
    if (option.isform) {
      this.isform = 1;
    }
    this.payData.maintainMealId = option.id;
    this.forwardUserId = option.forwardUserId;
    this.payData.uMobile = getstorage('mobile');
    this.payData.userId = getstorage('userId');
    this.getOrder(option.id);
    uni.$on('choosecoupon', (data) => {
      this.payData.couponId = data.data;
      if (data.data) {
        this.totalprice = this.payData.maintainNum * this.orderData.price;
        this.orderData.couponUserNews.filter((res) => {
          if (res.couponUserNewId == data.data) {
            this.choosecoupon = res;
            this.payData.couponMoney = res.discountMoney;
            this.totalprice = (
              this.totalprice - this.payData.couponMoney
            ).toFixed(2);
          }
        });
        if (this.totalprice <= 0) {
          this.minMoney = true;
          this.totalprice = 0.01;
        } else {
          this.minMoney = false;
        }
      } else {
        this.choosecoupon = {};
        this.totalprice = this.payData.maintainNum * this.orderData.price;
        this.payData.couponMoney = 0;
      }
    });
  },
  methods: {
    changeTel(e) {
      this.payData.uMobile = e.detail.value.trim();
    },
    addNum() {
      this.payData.maintainNum++;
      if (this.choosecoupon.discountMoney) {
        this.totalprice =
          this.payData.maintainNum * this.orderData.price -
          this.choosecoupon.discountMoney;
      } else {
        this.totalprice = this.payData.maintainNum * this.orderData.price;
      }
      if (this.totalprice <= 0) {
        this.minMoney = true;
        this.totalprice = 0.01;
      } else {
        this.minMoney = false;
      }
    },
    minNum() {
      if (this.payData.maintainNum > 1) {
        this.payData.maintainNum--;
      } else {
        this.payData.maintainNum = 1;
      }
      if (this.choosecoupon.discountMoney) {
        this.totalprice =
          this.payData.maintainNum * this.orderData.price -
          this.choosecoupon.discountMoney;
      } else {
        this.totalprice = this.payData.maintainNum * this.orderData.price;
      }
      if (this.totalprice <= 0) {
        this.minMoney = true;
        this.totalprice = 0.01;
      } else {
        this.minMoney = false;
      }
    },
    // 选择优惠券
    checkQuan() {
      let that = this;
      uni.navigateTo({
        url: '/pages/carShops/upkeep/checkCouponlist',
        success: function (res) {
          res.eventChannel.emit('couponList', {
            data: {
              couponList: that.orderData.couponUserNews,
              couponId: that.payData.couponId,
            },
          });
        },
      });
    },
    // 获取订单详情
    getOrder(id) {
      this.$newrequest
        .post('/coc-active/api/v2/maintain_meal/buyNow', { maintainMealId: id })
        .then((res) => {
          this.orderData = res.data;
          this.totalprice = res.data.price;
        });
    },
    OnPay() {
      let that = this;
      // let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
      // if (!reg.test(this.payData.uMobile)) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: '请输入正确的手机号'
      //   })
      //   return false
      // }
      if (this.showpay == false) {
        return false;
      }
      this.showpay = false;
      that.payData.subOpenId = uni.getStorageSync('openid');
      if (that.customerManagerId) {
        that.payData.customerManagerId = that.customerManagerId;
      }
      this.payData.forwardUserId = this.forwardUserId;
      this.$request
        .post('/coc-active/api/v2/maintain_meal/payment', that.payData)
        .then((res) => {
          if (res.code == 200) {
            that.showloading = false;
            that.wxpay(res.data.payment.miniPayRequest, res.data.orderId);
          } else {
            that.$refs.uToast.show({
              message: res.message,
            });
          }
        });
    },
    wxpay(data, orderId) {
      let _this = this;
      uni.requestPayment({
        provider: 'wxpay', //支付类型-固定值
        timeStamp: data.timeStamp, // 时间戳（单位：秒）
        nonceStr: data.nonceStr, // 随机字符串
        package: data.package, // 固定值
        signType: data.signType, //固定值
        paySign: data.paySign, //签名
        appid: data.appId,
        success: function (res) {
          uni.showToast({
            icon: 'success',
            title: '支付成功',
            duration: '2000',
          });
          if (_this.formType === 2) {
            wx.navigateBack({
              delta: getCurrentPages().length // 返回上一级页面或多级页面
            });
          } else if (_this.isform) {
            uni.navigateBack({
              delta: 2,
            });
          } else {
            uni.reLaunch({
              url: '/pages/carShops/upkeep/orderStatus?id=' + orderId,
            });
          }
        },
        fail: function (err) {
          uni.showToast({
            icon: 'none',
            title: '支付失败',
          });
          uni.reLaunch({
            url: '/pages/my/myUpkeepOrder/detail?id=' + orderId,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 15rpx 25rpx;
  border-radius: 10rpx;
}

.contentBox {
  padding: 36rpx 26rpx;
  box-sizing: border-box;
  border-radius: 10rpx 10rpx 0 0;
}

.orderHui {
  .qpm {
    border: 1rpx solid #999;
    height: 44rpx;
    line-height: 44rpx;
    border-radius: 44rpx;
    min-width: 120rpx;
    justify-content: space-around;

    .minNum,
    .addNum {
      padding: 0 30rpx;
      font-size: 32rpx;
    }
  }

  .quanCheck {
    border-bottom: 1rpx solid #f8f8f8;
  }
}

.mb30 {
  margin-bottom: 30rpx;
}

.payBtn {
  background-color: #1bd993;
  border-radius: 40rpx;
  height: 80rpx;
  line-height: 80rpx;
  color: #ffffff;
  margin: 300rpx auto 0;
  width: 600rpx;

  image {
    width: 44rpx;
    height: 40rpx;
  }
}
</style>
