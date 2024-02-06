<template>
  <view class="privacy" v-if="showPrivacy">
    <view class="privacy__box">
      <view class="privacy__box--title"
        >用户协议、隐私保护及俱乐部用户规范提示</view
      >
      <view class="privacy__box--content">
        在你使用 51车俱乐部 服务之前，请仔细阅读
        <span @click="handleJump(1)"> {{ privacyContractName }} </span>、
        <span @click="handleJump(2)">《51车俱乐部用户协议》</span>、
        <span @click="handleJump(3)">《51车俱乐部用户规范》</span>，
        如你同意该指引，请点击“同意”开始使用本小程序。
      </view>
      <view class="privacy__box--btn">
        <button class="pop-reject-tip" @click.stop="handleClose()">拒绝</button>
        <button
          class="pop-agree-tip"
          id="agree-btn"
          open-type="agreePrivacyAuthorization"
          @agreeprivacyauthorization="handleClose(true)"
        >
          同意
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showPrivacy: false,
      privacyContractName: '',
      resolveFun: '',
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {
    this.getprivacy();
  },
  methods: {
    getprivacy() {
      wx.getPrivacySetting({
        success: (res) => {
          console.log(res);
          // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }
          const { needAuthorization, privacyContractName } = res;
          if (needAuthorization) {
            this.showPrivacy = needAuthorization;
            this.privacyContractName = privacyContractName;
          } else {
            uni.$emit('consentAuthority');
          }
        },
      });
    },
    handleClose(type) {
      this.showPrivacy = false;
      if (type) {
        uni.$emit('consentAuthority');
      }
    },
    handleJump(type) {
      if (type === 1) {
        wx.openPrivacyContract();
      } else if (type === 2) {
        uni.navigateTo({
          url: '/pages/home/webview?myUrl=https://h5.dcqcjlb.com/protocol/user_service.html',
        });
      } else if (type === 3) {
        uni.navigateTo({
          url: '/pages/home/webview?myUrl=https://m.dcqcjlb.com/pages/agreement/userSpecification/index',
        });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.privacy {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 99999999;
  &__box {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: #fff;
    border-radius: 30rpx;
    &--title {
      padding: 0 40rpx;
      color: #000;
      font-size: 32rpx;
      margin-top: 50rpx;
      font-weight: 900;
    }
    &--content {
      color: rgb(126, 128, 128);
      font-size: 30rpx;
      padding: 30rpx 40rpx;
      text-align: justify;
      line-height: 1.4;
      span {
        color: rgb(87, 107, 149);
      }
    }
    &--btn {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 60rpx 120rpx;
      button {
        width: 40%;
        border-radius: 20rpx;
      }
      button::after {
        border: 0;
      }
      .pop-reject-tip {
        background: rgb(242, 242, 242);
        color: #000000;
      }
      .pop-agree-tip {
        color: #fff;
        background: rgb(7, 193, 96);
      }
    }
  }
}
</style>
