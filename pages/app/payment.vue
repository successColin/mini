<template>
  <div class="payment" v-if="state">
    <div class="payment__name">{{ state === 1 ? '支付成功' : '支付失败' }}</div>
    <image
      v-if="state === 1"
      style="width: 168rpx; height: 178rpx"
      src="https://oss.dcqcjlb.com/51che_java_dev/20240203/file_1706946058665.png"
    >
    </image>
    <image
      v-else
      style="width: 168rpx; height: 178rpx"
      src="https://oss.dcqcjlb.com/51che_java_dev/20240203/file_1706946070149.png"
    >
    </image>

    <button open-type="launchApp" app-parameter="wechat" class="app">
      <text>返回APP</text>
    </button>
  </div>
</template>

<script>
import { setstorage } from '@/utils/index.js';

export default {
  data() {
    return {
      url: '',
      params: {},
      state: 0,
    };
  },
  components: {},
  computed: {},
  watch: {
    state() {
      uni.setNavigationBarTitle({
        title: '订单状态',
      });
    },
  },
  onLoad(option) {
    console.log(11111111);
    this.url = option.url || '';
    if (!this.url) return;
    setstorage('token', option.token);
    this.params = (option.params && JSON.parse(option.params)) || {};
    uni.login({
      provider: 'weixin',
      onlyAuthorize: true,
      success: async (res) => {
        const { data } = await this.$request.get(
          `/coc-oauth/oauth/login/${res.code}`
        );
        this.params.subOpenId = data.openid;
        this.OnPay();
      },
    });
  },
  methods: {
    OnPay() {
      this.$request.post(this.url, this.params).then((res) => {
        if (res.code == 200) {
          this.wxpay(res.data.payment.miniPayRequest);
        } else {
          uni.showModal({
            content: res.message,
            showCancel: false,
            confirmText: '知道了',
          });
        }
      });
    },
    wxpay(data) {
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
          console.log(JSON.stringify(res));
          if (res.errMsg === 'requestPayment:ok') {
            _this.state = 1;
          } else {
            _this.state = 2;
          }
        },
        fail: function (res) {
          console.log(JSON.stringify(res));
          _this.state = 2;
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.payment {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__name {
    margin-top: 100rpx;
    font-size: 36rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #d91b1b;
  }
}
.app {
  margin-top: 300rpx;
  width: 330rpx;
  height: 70rpx;
  background: #d91b1b;
  border-radius: 35rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
}
.app::after {
  border: 0 !important;
}
</style>
