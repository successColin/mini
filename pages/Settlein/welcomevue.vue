<template>
  <view class="page">
    <view class="top">
      <view style="margin-left: 23rpx">
        <u-avatar :src="headImg" size="23"></u-avatar>
      </view>
      <view class="size28 txtDarkGray fwb ml10">
        {{ mobile }}
      </view>
    </view>
    <view class="img-item">
      <view class="phone-item" @click="OnmakePhoneCall">
        <image
          style="width: 704rpx; height: 138rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20230717/file_1689597298048.png"
        >
        </image>
      </view>
      <view class="card-btn">
        <view class="u-flex">
          <view class="fwb size28">银联分账入驻方式选择</view>
          <view @click="Onopenallshow(0)">
            <image
              style="width: 38rpx; height: 38rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230717/file_1689598082947.png"
            >
            </image>
          </view>
        </view>
        <view class="u-flex jsb mt20">
          <!-- 我要线下转账 -->
          <!-- 企业入驻：直接走刚做的企业线下入驻银联的流程即可 -->
          <view class="linedowm" @click="Onopenallshow(1, 2)">企业入驻</view>
          <!-- 我要银联分账 -->
          <!-- 个体工商户入驻：走个体工商户线上入驻的流程 -->
          <view class="lineup" @click="Onopenallshow(2, 1)"
            >个体工商户入驻</view
          >
        </view>
      </view>
    </view>

    <view
      :style="{ height: `calc(20rpx + 84px)`, background: '#FFFFFF' }"
    ></view>
    <!-- #ifdef MP-WEIXIN -->
    <official-account
      style="
        width: 750rpx;
        position: fixed;
        left: 0;
        bottom: 0rpx;
        z-index: 9999;
      "
    ></official-account>
    <!-- #endif -->
    <u-popup
      :safeAreaInsetBottom="false"
      :round="15"
      :show="showall"
      @close="showall = false"
      mode="center"
    >
      <view class="pop">
        <view v-if="index == 0">
          <view class="pop-title"> 银联分账结算说明 </view>
          <view class="size28 txtDarkGray">
            <text decode="true">
              {{ memo }}
            </text>
          </view>
          <view @click="showall = false" class="pop-btn"> 知道了 </view>
        </view>
        <view v-else-if="index == 1">
          <view class="pop-title tac"> 企业入驻阅读须知信息如下 </view>
          <view class="size28 txtDarkGray">
            <text decode="true">
              {{ offlineMemo }}
            </text>
          </view>
          <view @click="OnNext" class="pop-btn u-flex jsc">
            <view>我已阅读</view>
            <view v-if="isend">
              <u-count-down
                :time="time"
                format="ss"
                autoStart
                @change="onChange"
              >
                <view class="time">
                  <view class="time__custom">
                    <text class="time__custom__item"
                      >({{ timeData.seconds }}秒)</text
                    >
                  </view>
                </view>
              </u-count-down>
            </view>
          </view>
        </view>
        <view v-else-if="index == 2">
          <view class="pop-title tac"> 个体工商户入驻阅读须知信息如下 </view>
          <view class="size28 txtDarkGray">
            <text decode="true">
              {{ onlineMemo }}
            </text>
          </view>
          <view @click="OnNext" class="pop-btn u-flex jsc">
            <view>我已阅读</view>
            <view v-if="isend">
              <u-count-down
                :time="time"
                format="ss"
                autoStart
                @change="onChange"
              >
                <view class="time">
                  <view class="time__custom">
                    <text class="time__custom__item"
                      >({{ timeData.seconds }}秒)</text
                    >
                  </view>
                </view>
              </u-count-down>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <u-popup
      :safeAreaInsetBottom="false"
      round="10"
      :closeOnClickOverlay="false"
      :show="showfourshop"
      @close="showfourshop = false"
      mode="center"
    >
      <view class="pop-four">
        <view class="size28 fwb tac" style="margin-top: 80rpx">
          选择客户经理/销售顾问/市场经理
        </view>
        <view class="u-flex jsc" style="margin-top: 40rpx">
          <view class="btn-pop" @click="OnOpenfirst">
            <view class="txtLighGray size28" style="margin-left: 10rpx">{{
              selectname ? selectname : '请选择'
            }}</view>
            <view
              style="margin-left: 108rpx; margin-right: 10rpx"
              class="u-flex alc"
            >
              <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
                style="width: 17rpx; height: 10rpx"
              ></image>
            </view>
          </view>
          <view class="btn-pop" style="margin-left: 10rpx" @click="OnOpentwo">
            <view class="txtLighGray size28" style="margin-left: 10rpx"
              >{{ selecttwoname ? selecttwoname : '请选择' }}
            </view>
            <view
              style="margin-left: 108rpx; margin-right: 10rpx"
              class="u-flex alc"
            >
              <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
                style="width: 17rpx; height: 10rpx"
              ></image>
            </view>
          </view>
        </view>
        <view class="u-flex jsc">
          <view class="pop-btn-four" @click="Onnextfours"> 确定 </view>
        </view>
      </view>
    </u-popup>
    <u-picker
      :defaultIndex="[2]"
      :immediateChange="true"
      :show="showfirst"
      :columns="columnsfirst"
      @cancel="showfirst = false"
      @confirm="Onselectfirst"
    ></u-picker>
    <u-picker
      :immediateChange="true"
      :show="showtwo"
      :columns="selectList"
      keyName="nickname"
      @cancel="showtwo = false"
      @confirm="Onselecttwo"
    ></u-picker>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      luzhuState: '',
      memo: `
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您需按照银联要求提供对应材料完成银联入驻。
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户下单购买商品/活动后，订单状态为“已核销”的，货款即可通过银联自动分账至您的银行账户。银联自动分账功能需收取分账手续费，手续费标准为：0-1w，1.5元/笔；1w-5w，3.5元/笔；5w以上，0.02%；35元封顶，分账划付时由银联收取。为了降低您的财务成本，建议您选择银联分账模式入驻后，分账周期选择为一月一结，一单一结银联会按单收取分账手续费。 
			`,
      onlineMemo: `
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您需按照银联要求提供对应材料完成银联入驻。
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户下单购买商品/活动后，订单状态为“已核销”的，货款即可通过银联自动分账至您的银行账户。银联自动分账功能需收取分账手续费，手续费标准为：0-1w，1.5元/笔；1w-5w，3.5元/笔；5w以上，0.02%；35元封顶，分账划付时由银联收取。为了降低您的财务成本，建议您选择银联分账模式入驻后，分账周期选择为一月一结，一单一结银联会按单收取分账手续费。
			`,
      offlineMemo: `
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;您需按照银联要求提供对应材料完成银联入驻。
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户下单购买商品/活动后，订单状态为“已核销”的，货款即可通过银联自动分账至您的银行账户。银联自动分账功能需收取分账手续费，手续费标准为：0-1w，1.5元/笔；1w-5w，3.5元/笔；5w以上，0.02%；35元封顶，分账划付时由银联收取。为了降低您的财务成本，建议您选择银联分账模式入驻后，分账周期选择为一月一结，一单一结银联会按单收取分账手续费。
			`,
      showtwo: false,
      selectname: '市场经理',
      showfirst: false,
      columnsfirst: [['客户经理', '销售顾问', '市场经理']],
      timeData: 10000,
      time: 10000,
      index: 0,
      headImg: '',
      mobile: '',
      showall: false,
      isseconds: true,
      isend: true,
      sourceType: null,
      operateId: null,
      affiliationType: null,
      fourshopid: '',
      showfourshop: false,
      selectList: [],
      selecttwoname: '',
      userChannelId: '',
    };
  },

  onLoad(option) {
    // uni.removeStorageSync('enter');
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    if (option.scene) {
      if (option.scene.split('_')[0] == 10) {
        this.sourceType = 1;
        this.operateId = option.scene.split('_')[1];
        this.affiliationType = 1;
        console.log(option.scene.split('_')[0]);
      }
      if (option.scene.split('_')[0] == 2) {
        this.affiliationType = 6;
        this.sourceType = 6;
        this.operateId = option.scene.split('_')[1];
      } else if (option.scene.split('_')[0] == 1) {
        this.sourceType = 5;
        this.fourshopid = option.scene.split('_')[1];
        this.affiliationType = 7;
        this.getshichangList();
        this.showfourshop = true;
      } else if (option.scene.split('_')[0] == 7) {
        this.affiliationType = 7;
        this.sourceType = 7;
        this.operateId = option.scene.split('_')[1];
      }
    }
    if (option.sourceType) {
      this.sourceType = option.sourceType;
      this.operateId = option.operateId;
    }
  },
  onShow() {
    if (uni.getStorageSync('token')) {
      this.getinfo();
      this.headImg = uni.getStorageSync('headImg');
      this.mobile = this.hidePhoneNumber(uni.getStorageSync('mobile'));
    }
  },
  methods: {
    getinfo() {
      this.$request.get('/coc-my/api/v1/my/findUser').then((res) => {
        if (res.data.shop.unionPayStatus == 4 && res.data.shop.status == 0) {
          if (res.data.shop.bankAcctType == 1) {
            uni.redirectTo({
              url:
                '/pages/Settlein/enterpriseProgress?type=1' +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          }
        } else if (res.data.shop.status == 0) {
          if (res.data.shop.bankAcctType == 1) {
            uni.redirectTo({
              url:
                '/pages/Settlein/enterpriseProgress?type=2' +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          } else {
            uni.redirectTo({
              url:
                '/pages/Settlein/individualProgress?type=1' +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          }
        } else if (res.data.shop.status == 1) {
          if (res.data.shop.bankAcctType == 1) {
            uni.redirectTo({
              url:
                '/pages/Settlein/enterpriseProgress?type=3' +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          } else {
            uni.redirectTo({
              url:
                '/pages/Settlein/individualProgress?type=2' +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          }
        } else if (res.data.shop.status == 2) {
          if (res.data.shop.bankAcctType == 1) {
            uni.redirectTo({
              url:
                '/pages/Settlein/enterpriseProgress?type=4&auditReason=' +
                res.data.shop.auditReason +
                '&unionPayStatus=' +
                res.data.shop.unionPayStatus +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          } else {
            uni.redirectTo({
              url:
                '/pages/Settlein/individualProgress?type=3&auditReason=' +
                res.data.shop.auditReason +
                '&unionPayStatus=' +
                res.data.shop.unionPayStatus +
                '&isLineLedger=' +
                res.data.shop.isLineLedger,
            });
          }
        }
      });
    },
    Onnextfours() {
      if (!this.operateId) {
        uni.$u.toast('请先选择客户经理/销售类型/市场经理');
        return false;
      }
      this.showfourshop = false;
    },
    OnOpentwo() {
      if (this.selectList.length == 0) {
        uni.$u.toast('请先选择客户经理/销售/市场类型');
        return false;
      }
      this.showtwo = true;
    },
    Onselecttwo(e) {
      this.showtwo = false;
      this.operateId = e.value[0].id;
      this.selecttwoname = e.value[0].nickname;
      this.userChannelId = e.value[0].userChannelId;
    },
    Onselectfirst(e) {
      this.selectname = e.value[0];
      this.selecttwoname = '';
      this.operateId = '';
      this.userChannelId = '';
      console.log(e);
      if (e.indexs[0] == 0) {
        this.affiliationType = 2;
        this.$newrequest
          .get(
            '/coc-system/api/v1/system/customer/manager/list?shopId=' +
              this.fourshopid
          )
          .then((res) => {
            this.showfirst = false;

            this.selectList = [res.data];
          });
      } else if (e.indexs[0] == 1) {
        this.affiliationType = 3;
        this.$newrequest
          .post('/coc-active/api/v1/sales_consultant/list', {
            shopId: this.fourshopid,
            current: 1,
            size: 99,
          })
          .then((res) => {
            this.showfirst = false;
            this.selectList = [res.data.records];
          });
      } else if (e.indexs[0] == 2) {
        this.affiliationType = 7;
        this.getshichangList();
      }
    },
    getshichangList() {
      this.$newrequest
        .post('/coc-active/api/v1/sales_consultant/marketingManagerList', {
          shopId: this.fourshopid,
          current: 1,
          size: 99,
        })
        .then((res) => {
          this.showfirst = false;
          this.selectList = [res.data.records];
        });
    },
    OnOpenfirst() {
      this.showfirst = true;
    },
    onChange(e) {
      this.timeData = e;
      if (e.seconds == 0) {
        this.isend = false;
      }
    },
    Onopenallshow(index, state) {
      if (!uni.getStorageSync('token')) {
        uni.navigateTo({
          url:
            '/pages/activity/share/index?userChannelId=' + this.userChannelId,
        });
        return false;
      }
      if (index == 1 || index == 2) {
        this.time = 10 * 1000;
        this.isend = true;
      }
      this.index = index;
      this.luzhuState = state; // 1是线上 2是线下
      this.showall = true;
    },
    hidePhoneNumber(phoneNumber) {
      // 使用正则表达式匹配手机号中的前三位和后四位
      var regex = /^(\d{3})\d{4}(\d{4})$/;
      var matches = regex.exec(phoneNumber);

      if (matches && matches.length === 3) {
        // 替换中间四位数字为 *
        var hiddenNumber = matches[1] + '****' + matches[2];
        return hiddenNumber;
      } else {
        // 手机号格式不正确，返回原始值
        return phoneNumber;
      }
    },
    OnNext() {
      if (this.isend) {
        return false;
      }
      this.showall = false;
      console.log(this.luzhuState);

      uni.navigateTo({
        url:
          '/pages/Settlein/Processdescription?affiliationType=' +
          this.affiliationType +
          '&operateId=' +
          this.operateId +
          '&sourceType=' +
          this.sourceType +
          '&settleType=' +
          this.luzhuState +
          '&type=' +
          this.index,
      });
    },
    OnmakePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: '4008-010-111', //仅为示例
      });
    },
  },
};
</script>

<style lang="scss">
page {
  // background-color: #f1e9e9;
  background: linear-gradient(180deg, #f0e9e9 0%, #ffffff 100%);
}

.page {
}

.top {
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230717/file_1689596028586.png');
  background-size: 100% 100%;
  margin: 23rpx auto;
  width: 665rpx;
  height: 92rpx;
  display: flex;
  align-items: center;
  margin-bottom: 0rpx;
}

.img-item {
  width: 100%;
  height: 1312rpx;
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642972150.png');
  background-size: 100% 100%;
  margin-top: -30rpx;
  position: relative;
}

.phone-item {
  position: absolute;
  bottom: 260rpx;
  left: 50%;
  transform: translate(-50%, 0%);
}

.card-btn {
  width: 660rpx;
  position: absolute;
  bottom: 40rpx;
  left: 50%;
  transform: translate(-50%, 0%);
  background: #f8f8f8;
  padding: 23rpx;
}

.linedowm {
  width: 308rpx;
  height: 100rpx;
  border-radius: 8rpx;
  border: 2rpx solid #e05a5d;
  font-size: 28rpx;
  color: #e05a5d;
  line-height: 100rpx;
  text-align: center;
}

.lineup {
  width: 308rpx;
  height: 100rpx;
  background: #d91b1b;
  border-radius: 8rpx;
  color: #ffffff;
  line-height: 100rpx;
  text-align: center;
}

.pop {
  width: 650rpx;
  border-radius: 15rpx;
  padding: 72rpx 32rpx;
}

.pop-title {
  font-size: 28rpx;
  font-weight: bold;
}

.pop-btn {
  height: 88rpx;
  text-align: center;
  color: #ffffff;
  font-weight: bold;
  line-height: 88rpx;
  background-color: #d91b1b;
  margin-top: 38rpx;
  margin-left: 32rpx;
  margin-right: 32rpx;
  border-radius: 206rpx;
}

.pop-four {
  width: 710rpx;
  background-color: #f8f8f8;
  text-align: center;
  padding-bottom: 80rpx;
  border-radius: 10rpx;
}

.topimg {
  width: 100%;
}

.cards {
  margin: 0 25rpx;
  padding: 25rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  box-sizing: border-box;

  image {
    height: 340rpx;
    width: 650rpx;
  }
}

.btn-pop {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 260rpx;
  height: 50rpx;
  border: 1px solid #999999;
  border-radius: 10rpx;
}

.pop-btn-four {
  width: 301rpx;
  height: 81rpx;
  background: #d91b1b;
  border-radius: 40rpx;
  text-align: center;
  line-height: 81rpx;
  color: #ffffff;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 40rpx;
}
</style>
