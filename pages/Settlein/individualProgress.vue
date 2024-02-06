<template>
  <view class="page">
    <!--  #ifdef MP-WEIXIN  -->
    <view class="search-top">
      <u-navbar leftIconSize="0">
        <view @click="OnGoHome" class="u-nav-slot search-top" slot="center">
          <view class="u-flex" style="margin-left: 6%; line-height: 170%">
            <u-icon name="home" color="#222222" size="28"></u-icon>
          </view>
          <view style="margin-right: 70rpx" class="u-flex top-conent">
            个体工商户入驻进度
          </view>
        </view>
      </u-navbar>
    </view>
    <!--  #endif -->
    <view style="margin-top: 24%"></view>
    <view class="card u-flex">
      <!-- 个体工商户 入驻资料 -->
      <view @click="OnReturnimg" class="card__box passClass">
        <image
          style="width: 60rpx; height: 60rpx"
          src="@/static/image/myEnter1.svg"
        >
        </image>
        个体工商户 <br />入驻资料
      </view>
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231102/file_1698889551401.png"
        style="width: 30rpx; height: 10rpx"
      ></image>
      <!-- 个体工商户 信息确认 -->
      <view @click="OnReturnenterpriseInfo" class="card__box passClass">
        <image
          style="width: 60rpx; height: 60rpx"
          src="@/static/image/myEnter2.svg"
        >
        </image>
        个体工商户<br />信息确认
      </view>
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231102/file_1698889551401.png"
        style="width: 30rpx; height: 10rpx"
      ></image>
      <!-- <view @click="OnReturnuploadAccountOpening">
				<image src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972195678.png"
					style="width: 106rpx;height: 164rpx;">
				</image>
			</view> -->
      <!-- <view class="transition-line">
				<image src="@/pages/Settlein/static/image/guoduxian.png" style="width: 120rpx;height: 10rpx;"></image>
			</view> -->
      <!-- 查看合作协议 -->
      <view @click="OnPushagreement" class="card__box passClass">
        <image
          style="width: 60rpx; height: 60rpx"
          src="@/static/image/myEnter3.svg"
        >
        </image>
        查看合作<br />协议
      </view>
      <template v-if="settleType == 1">
        <!-- ok -->
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20231102/file_1698889551401.png"
          style="width: 30rpx; height: 10rpx"
        ></image>
        <!-- 经营者视频 认证 -->
        <view
          class="card__box"
          :class="flowStatus === 3 || flowStatus === 2 ? 'passClass' : ''"
        >
          <image
            style="width: 60rpx; height: 60rpx"
            src="@/static/image/myEnter4.svg"
            v-if="flowStatus === 1"
          >
          </image>
          <image
            style="width: 60rpx; height: 60rpx"
            src="@/static/image/myEnter41.svg"
            v-else
          >
          </image>
          经营者视频<br />认证
        </view>
        <!-- ok -->
        <image
          v-if="flowStatus === 3 || flowStatus === 2"
          src="https://oss.dcqcjlb.com/51che_java_dev/20231102/file_1698889551401.png"
          style="width: 30rpx; height: 10rpx"
        ></image>
        <!-- no -->
        <image
          v-else
          src="https://oss.dcqcjlb.com/51che_java_dev/20231102/file_1698891103393.png"
          style="width: 30rpx; height: 10rpx"
        ></image>
        <!-- 银联协议 签约 -->
        <view class="card__box" :class="flowStatus === 3 ? 'passClass' : ''">
          <image
            style="width: 60rpx; height: 60rpx"
            src="@/static/image/myEnter51.svg"
            v-if="flowStatus === 3"
          >
          </image>
          <image
            style="width: 60rpx; height: 60rpx"
            src="@/static/image/myEnter5.svg"
            v-else
          >
          </image>

          银联协议<br />签约
        </view>
      </template>
    </view>
    <view class="card-item">
      <view> 个体工商户入驻进度 </view>
      <view style="color: #d91b1b">
        <text>{{ auditStatusMsg }}</text>
      </view>
    </view>
    <view class="card__work" v-if="settleType == 1">
      <view>
        <view> 经营者视频认证 </view>
        <view v-if="flowStatus !== 1" class="passClass disabledClass">
          已完成
        </view>
        <!-- send-message-title="视频认证"
          send-message-img="https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678343590247.jpg"
          session-from="jul"
          :show-message-card="true"
          open-type="contact" -->
        <button
          v-else
          class="card__work--buttom"
          :class="btnState ? 'disabledClass grayClass' : ''"
          @click="handleAuthentication(1)"
        >
          去认证
        </button>
      </view>
      <view>
        <view> 银联协议在线签署 </view>
        <view v-if="flowStatus === 3" class="passClass disabledClass">
          已完成
        </view>
        <!-- send-message-title="银联签署"
          send-message-img="https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678343590247.jpg"
          session-from="jul"
          :show-message-card="true"
          open-type="contact" -->
        <button
          v-else
          class="card__work--buttom"
          :class="flowStatus === 1 || btnState ? 'grayClass disabledClass' : ''"
          @click="handleAuthentication(2)"
        >
          {{ flowStatus === 1 ? '待签署' : '去签署' }}
        </button>
      </view>
    </view>
    <view class="card-reject" v-if="auditStatus == 7">
      驳回理由：<text style="color: #d91b1b">{{ auditReason }}</text>
    </view>
    <!-- <view
      v-if="isLineLedger == 1"
      style="text-align: center; font-size: 24rpx; margin-top: 40rpx"
    >
      如果您已提交全部资料但未收到短信，请<text
        style="color: #d91b1b"
        @click="resendMessage"
        >《点击此处》</text
      >
    </view> -->
    <view style="position: fixed; bottom: 220rpx" v-if="auditStatus == 5">
      <!-- <view style="margin: 25rpx; font-size: 24rpx" v-if="settleType == 1">
        温馨提示:认证资料提交后将转给第三方银联商务审核，审核
        通过后24小时内会收到一笔通常不超过1元人民币的小额打款
        请注意查收。收到后请输入该打款金额予以验证。
      </view> -->
      <view style="margin: 25rpx; font-size: 24rpx">
        温馨提示：<br />
        请从应用市场或复制链接到浏览器打开下载俱乐部商家APP，
        及时查看入驻进度并体验相关功能。
      </view>
      <view class="copy-btn" @click="Oncopy"> 复制链接 </view>
    </view>

    <u-toast ref="uToastpop"></u-toast>
    <u-toast ref="uToast"></u-toast>

    <view class="bottom-btn" v-if="auditStatus == 7">
      <text @click="Onagain"> 重新提交 </text>
    </view>
  </view>
</template>

<script>
// unionPayStatus:银联状态：0:待审核 （提交银行）1:审核通过 2：审核不通过 3:未提交（信息未提交银行状态）4, "待打款"
// status:平台状态：0:待审核 （提交银行）1:审核通过 2：审核不通过 3:未提交（信息未提交银行状态）
// bankAcctType：账户类型 0:个人账户 1:公司账户
// 审核状态：1-待经营者视频认证；2-经营者视频认证中；3-经营者视频认证失败；4-待签署银联协议；5-审核中；6-审核通过；7-审核失败
export default {
  components: {},
  data() {
    return {
      unionPayStatus: '',
      auditReason: '',
      transAmt: '',
      poptransAmt: false,
      isLineLedger: null,
      downlist: {},
      settleType: '',
      // needObj: {},

      btnState: false, // 防止连续点
      auditStatusMsg: '', // 待审核任务

      auditStatus: '', // 状态
      umsRegId: '',

      videoVerification: '', // 视频验证：0-视频未认证；1-视频认证中；2-视频认证成功；3-视频认证失败
      signingVerification: '', // 签约验证：0-签约中；1-签约成功；

      myurl: '', // 链接
    };
  },

  onLoad(option) {
    console.log(option);
    // this.needObj = JSON.parse(option.needObj);
    this.settleType = option.settleType;
    this.umsRegId = option.umsRegId;
    if (option.type) {
      if (option.type == 1) {
        this.auditStatusMsg = '个体账户认证中';
      } else if (option.type == 2) {
        this.auditStatusMsg = '待审核';
      } else if (option.type == 3) {
        this.auditStatusMsg = '入驻成功';
        this.auditStatus = 5;
      } else {
        this.auditStatusMsg = '驳回';
        this.auditStatus = 7;
      }
    }
    if (option.auditReason) {
      this.auditReason = option.auditReason;
    }
    if (option.unionPayStatus) {
      this.unionPayStatus = option.unionPayStatus;
    }
    if (option.isLineLedger) {
      this.isLineLedger = option.isLineLedger;
    }
    this.getdown();
    if (this.settleType == 1) {
      this.handleOngridState();
    }
  },
  onShow() {},
  computed: {
    // 流程状态
    flowStatus() {
      // // * 视频验证：0-视频未认证；1-视频认证中；2-视频认证成功；3-视频认证失败
      //  videoVerification: this.finduserList.shop.videoVerification,
      // 	// * 签约验证：0-签约中；1-签约成功；
      //  signingVerification: this.finduserList.shop.signingVerification,
      let state = 1;
      if (this.videoVerification === 2) {
        state = 2;
        if (this.signingVerification === 1) {
          state = 3;
        }
      }
      return state;
    },
  },
  onPullDownRefresh() {
    if (this.settleType == 1) {
      this.handleOngridState();
    } else {
      this.getFindUser();
    }
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  methods: {
    getFindUser() {
      this.$request.get('/coc-my/api/v1/my/findUser').then((res) => {
        const { status, auditReason } = res.data.shop;
        if (status === 0) {
          this.auditStatusMsg = '待审核';
        } else if (status === 1) {
          this.auditStatusMsg = '入驻成功';
          this.auditStatus = 5;
        } else if (status === 2) {
          this.auditStatusMsg = '驳回';
          this.auditStatus = 7;
        }
        this.auditReason = auditReason;
      });
    },
    // 去视频认证 和 签约
    async handleAuthentication() {
      this.btnState = true;
      setTimeout(() => {
        this.btnState = false;
      }, 3000);

      uni.navigateTo({
        url: '/pages/Settlein/skipSignature?umsRegId=' + this.umsRegId,
      });
    },
    // 调用入网状态查询
    async handleOngridState() {
      const res = await this.$request.get(
        `/coc-active/api/v1/merchantsettledin/accessStatusQuery/${this.umsRegId}`
      );
      const {
        auditStatusMsg,
        videoVerification,
        signingVerification,
        auditStatus,
      } = res.data;
      console.log(auditStatusMsg, videoVerification, signingVerification);
      this.auditStatus = auditStatus;
      this.auditStatusMsg = auditStatusMsg;
      this.videoVerification = videoVerification; // 视频验证：0-视频未认证；1-视频认证中；2-视频认证成功；3-视频认证失败
      this.signingVerification = signingVerification; // 签约验证：0-签约中；1-签约成功；
    },
    getdown() {
      this.$request
        .get('/coc-active/api/v1/merchantsettledin/appDownloadUrl')
        .then((res) => {
          this.downlist = res.data;
        });
    },
    Oncopy() {
      // let _this = this
      // let port = uni.getSystemInfoSync().platform
      // if (port == 'ios') {
      // 	uni.setClipboardData({
      // 		data: _this.downlist.iosUrl,
      // 		success: function () {
      // 			uni.$u.toast('复制成功,请在浏览器打开')
      // 		}
      // 	});
      // } else if (port == 'android') {
      // 	uni.setClipboardData({
      // 		data: _this.downlist.androidUrl,
      // 		success: function () {
      // 			uni.$u.toast('复制成功,请在浏览器打开')
      // 		}
      // 	});
      // } else {
      // 	console.log('运行在开发者工具上');
      // }
      uni.setClipboardData({
        data: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.dsrz.skystore',
        success: function () {
          uni.$u.toast('复制成功,请在浏览器打开');
        },
      });
    },
    OnGoHome() {
      uni.switchTab({
        url: '/pages/home/my',
      });
    },
    Onagain() {
      uni.navigateTo({
        url: '/pages/Settlein/uploadIndividual?shopType=3&isshow=2',
      });
    },
    OnPushagreement() {
      uni.navigateTo({
        url: `/pages/Settlein/agreement?isLineLedger=${this.isLineLedger}&settleType=${this.settleType}`,
      });
    },

    OnshowOntransAmt() {
      this.poptransAmt = true;
    },
    OnReturnuploadAccountOpening() {
      uni.navigateTo({
        url: '/pages/Settlein/uploadindividualOpening?isshow=1',
      });
    },
    OnReturnenterpriseInfo() {
      uni.navigateTo({
        url: '/pages/Settlein/enterpriseInfo?isshow=2',
      });
    },
    OnReturnimg() {
      uni.navigateTo({
        url: '/pages/Settlein/uploadIndividual?isshow=1',
      });
    },
    resendMessage() {
      this.$request
        .get('/coc-active/api/v1/merchantsettledin/resendMessage')
        .then((res) => {
          if (res.code == 200) {
            this.$refs.uToast.show({
              message:
                '银联签约资料提交成功，稍后您的手机将收到短信，提醒您点击相应链接地址完成签约',
              duration: '10000',
            });
          } else {
            this.$refs.uToast.show({
              message: res.message,
              duration: '10000',
            });
          }
        });
    },
  },
};
</script>

<style lang="scss">
.page {
}

.search-top {
  width: 100%;
  // margin-left: -100rpx;
  display: flex;
  justify-content: space-between;
  line-height: 46rpx;
  margin-right: 26%;
}

.card {
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 25rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__box {
    display: flex;
    align-items: center;
    flex-direction: column;

    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 30rpx;
  }
  &__work {
    display: flex;
    flex-direction: column;
    background: #ffffff;
    margin-top: 10rpx;
    padding: 0 25rpx;
    & > view:first-child {
      border-bottom: 1px solid #f8f8f8;
    }
    & > view {
      display: flex;
      padding: 20rpx 0;
      justify-content: space-between;
      align-items: center;
      & > view:first-child {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
    }
    &--buttom {
      padding: 15rpx 27rpx;
      background: #d91b1b;
      border-radius: 10rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin: 0;
      line-height: 40rpx;
      outline: none;
    }
  }
}

.passClass {
  color: #d91b1b;
}
.disabledClass {
  pointer-events: none;
}
.grayClass {
  background: #999999;
}

.transition-line {
  margin-top: 24rpx;
}

.card-item {
  background-color: #ffffff;
  border-radius: 10rpx;
  display: flex;
  justify-content: space-between;
  margin-top: 10rpx;
  padding: 25rpx;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #222222;
}

.pop {
  width: 600rpx;
  padding: 58rpx 50rpx 48rpx 50rpx;

  .pop-title {
    text-align: center;
    font-size: 28rpx;
    font-weight: bold;
  }

  .pop-item {
    display: flex;
    padding: 20rpx;
    margin-top: 40rpx;
  }

  .u-input {
    width: 400rpx;
    height: 20rpx;
  }

  .pop-btn {
    text-align: center;
    margin-top: 20rpx;

    text {
      display: inline-block;
      width: 180rpx;
      height: 60rpx;
      background-color: #d91b1b;
      border-radius: 10rpx;
      text-align: center;
      line-height: 60rpx;
      color: #ffffff;
    }
  }
}

.card-reject {
  background-color: #ffffff;
  border-radius: 10rpx;
  margin: 25rpx;
  text-align: center;
  padding: 80rpx;
  font-size: 28rpx;
  font-weight: bold;
}

.bottom-btn {
  position: fixed;
  z-index: 9999;
  bottom: 50rpx;
  left: 70rpx;

  text {
    display: inline-block;
    width: 600rpx;
    height: 80rpx;
    border-radius: 40rpx;
    background-color: #d91b1b;
    text-align: center;
    color: #ffffff;
    font-weight: bold;
    line-height: 80rpx;
  }
}

.copy-btn {
  width: 200rpx;
  height: 80rpx;
  line-height: 80rpx;
  background-color: #d91b1b;
  text-align: center;
  border-radius: 25rpx;
  color: #ffffff;
  margin: 25rpx auto;
}
</style>
