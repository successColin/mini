<template>
  <view class="page">
    <view class="card" @click="OnPushDetail" style="padding: 30rpx 25rpx">
      <view
        class="u-flex alc"
        style="margin-bottom: 30rpx; justify-content: space-between"
        @click.stop="OnPushshopHome"
        v-if="dataList.shopName"
      >
        <div style="display: flex; align-items: center">
          <view>{{ dataList.shopName }}</view>
          <view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </div>
      </view>
      <view class="u-flex">
        <view class="u-flex">
          <image
            style="width: 120rpx; height: 120rpx; border-radius: 10rpx"
            :src="dataList.coverPicture"
          >
          </image>
        </view>
        <view style="margin-left: 23rpx; flex: 1">
          <view class="size28 fwb moreLine">
            {{ dataList.title }}
          </view>
          <view class="u-flex jsb size24 alc" style="margin-top: 14rpx">
            <view>
              {{ dataList.groupTeamSetMealName }}
            </view>
            <view class="downPayment">
              <template
                v-if="
                  (dataList.productStatus === 2 && dataList.status === 0) ||
                  (dataList.productStatus === 2 && dataList.status === 13)
                "
              >
                <div style="margin-right: 6rpx">订金</div>
                ¥{{ dataList.depositPrice }} x
                {{ dataList.groupTeamSetMealNum }}
              </template>
              <template v-else>
                <div>
                  ¥{{
                    dataList.productStatus === 2
                      ? dataList.marketPrice
                      : currentPriceObj.flashSalePrice
                  }}
                  x {{ dataList.groupTeamSetMealNum }}
                </div>
              </template>
            </view>
          </view>
          <view
            class="drawback"
            @click.stop="Ondrawback"
            v-if="
              (dataList.status === 13 && dataList.productStatus === 3) ||
              dataList.status === 1
            "
          >
            申请退款
          </view>
        </view>
      </view>
    </view>
    <!-- // -->
    <!-- 订单资料 -->
    <view class="card">
      <view class="u-flex groupDetails alc aaaaa" v-if="pingtuanState === 1">
        <div>{{ dataList.depositOrderCount }}人已拼</div>
        <div>
          再满{{
            ladderPriceObj.groupTeamNum - (dataList.depositOrderCount || 0)
          }}人成团，享￥{{ ladderPriceObj.flashSalePrice || 0 }}
        </div>
      </view>
      <view
        class="u-flex groupDetails alc aaaaa"
        v-else-if="pingtuanState === 2"
      >
        <div>拼团成功</div>
        <div>享￥{{ currentPriceObj.flashSalePrice || 0 }}</div>
      </view>
      <view
        class="u-flex groupDetails alc aaaaa"
        v-else-if="pingtuanState === 3"
      >
        <div>拼团失败</div>
      </view>

      <u-divider :text="null" v-if="dataList.orderNo"></u-divider>
      <view class="u-flex jsb aaaaa" v-if="dataList.orderNo">
        <view class="size24 fwb">订单编号</view>
        <view style="display: flex; align-items: center">
          {{ dataList.orderNo }}
          <image
            style="width: 26rpx; height: 26rpx; padding: 13rpx 0 13rpx 13rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240108/file_1704711811380.png"
            @click="handleCopy"
          >
          </image>
        </view>
      </view>

      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb aaaaa">
        <view class="size24 fwb">联系人</view>
        <view>{{ dataList.name }}</view>
      </view>

      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb aaaaa">
        <view class="size24 fwb">手机号</view>
        <view>{{ dataList.mobile }}</view>
      </view>
      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb aaaaa">
        <view class="size24 fwb">备注</view>
        <view>{{ dataList.orderRemark }}</view>
      </view>
    </view>
    <view class="card">
      <view class="u-flex jsb aaaaa">
        <view class="size24 fwb">市场价</view>
        <view class="txtLighGray size24 txtls"
          >￥{{ dataList.marketPrice }}</view
        >
      </view>
      <view v-if="dataList.deductionAmount > 0">
        <u-divider :text="null"></u-divider>
        <view class="u-flex jsb aaaaa">
          <view class="size24 fwb">优惠</view>
          <view class="size24">
            <text class="txtLighGray">信用卡优惠</text>
            <!-- <text class="txtLighGray" v-if="dataList.paymentPreferenceId == 5"
              >农行信用卡满减</text
            >
            <text class="txtLighGray" v-if="dataList.paymentPreferenceId == 6"
              >工行信用卡满减</text
            >
            <text class="txtLighGray" v-if="dataList.paymentPreferenceId == 7"
              >农行信用卡满减</text
            > -->
            <text class="mainRed ml10 fwb"
              >-￥{{ dataList.deductionAmount }}</text
            >
          </view>
        </view>
      </view>

      <u-divider :text="null" v-if="pingtuanState !== 3"></u-divider>
      <view class="u-flex jsb aaaaa" v-if="pingtuanState !== 3">
        <view class="size24 fwb">实际支付</view>
        <view class="mainRed size24" v-if="balancePayment">
          ￥订金<text class="fwb">{{ dataList.paidMoney }}</text>
        </view>
        <view class="mainRed size24" v-else>
          <text class="fwb">{{ actualPayment }}</text>
        </view>
      </view>

      <u-divider :text="null" v-if="balancePayment"></u-divider>
      <view class="u-flex jsb aaaaa" v-if="balancePayment">
        <view class="size24 fwb">待支付尾款</view>
        <view class="mainRed size24">
          ￥<text class="fwb size32">{{
            (
              currentPriceObj.flashSalePrice * dataList.groupTeamSetMealNum
            ).toFixed(2) -
              dataList.paidMoney -
              (dataList.deductionAmount || 0) >
            0
              ? (
                  (
                    currentPriceObj.flashSalePrice *
                    dataList.groupTeamSetMealNum
                  ).toFixed(2) -
                  dataList.paidMoney -
                  (dataList.deductionAmount || 0)
                ).toFixed(2)
              : 0
          }}</text>
        </view>
      </view>

      <u-divider :text="null" v-if="balancePayment"></u-divider>
      <view
        class="u-flex jsb aaaaa"
        style="align-items: center"
        v-if="noClustering"
        @click="handleInvite"
      >
        <view class="size24 fwb"></view>
        <div class="list__btn--invite">邀请好友拼团</div>
      </view>
    </view>
    <!-- 二维码区域 -->
    <view v-if="dataList.status == 1" class="card" style="padding: 20rpx">
      <view class="tac fwb">
        {{ dataList.orderCode }}
      </view>
      <view class="code-img">
        <image
          mode="widthFix"
          style="width: 251rpx; height: 245rpx"
          :src="codeImg"
        >
        </image>
      </view>
      <view class="tac size24 txtDarkGray" style="margin-top: 24rpx">
        请勿随意截图发给他人
      </view>
      <view class="tac size28 fwb u-flex alc jsc" style="margin-top: 24rpx">
        <view> 剩余可核销数量：{{ dataList.orderSurplusNum || 0 }}份 </view>
        <!-- v-if="dataList.orderSurplusNum > 0 && dataList.nonRefund == 0" -->
      </view>
    </view>
    <view v-if="dataList.status == 0 || balancePayment" class="u-flex jsc mb20">
      <view class="On-pay" @click="OnPay">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230906/file_1693984892940.png"
          style="
            width: 44rpx;
            height: 40rpx;
            position: relative;
            top: 8rpx;
            right: 15rpx;
          "
        ></image>
        <text>微信支付</text>
      </view>
    </view>
    <!-- // -->
    <!-- 合作商家 -->
    <!-- 		<view class="card-enterprice" @click="OnPushshopHome">
			<view class="u-flex jsb alc">
				<view>{{dataList.shopVO.baseName}}</view>
				<view class="mainhome-btn">主页</view>
			</view>
			<view class="size24 mt20">
				营业时间 {{dataList.shopVO.openingHours}}
			</view>
			<view class="size24 mt20" @click.stop="OnPushMap">
				{{dataList.shopVO.baseAddress}}
			</view>
		</view> -->
    <!-- // -->
    <view class="title-info"> 购买须知 </view>
    <view class="card-goumai">
      <ul class="ul-item">
        <li
          v-if="dataList.holidaysIsUse == 1"
          class="li-item"
          style="margin-top: 0rpx"
        >
          <text class="txtDarkGray">节假日通用</text>
        </li>

        <li
          v-if="dataList.notUseTimes && dataList.notUseTimes.length !== 0"
          class="li-item"
        >
          <text class="txtDarkGray">不可用日期:{{ notUseTimesStr }}</text>
        </li>
        <li class="li-item">
          <text class="txtDarkGray"
            >使用截止时间: {{ dataList.expirationTime }}</text
          >
        </li>

        <!-- <li v-if="dataList.isRefund == 0" class="li-item">
          <text class="txtDarkGray">
            本商品为限时限量优惠团购，请您在订单使用时间内及时消费使用，一经购买不支持退款
          </text>
        </li> -->

        <li v-if="dataList.remark" class="li-item">
          <text class="txtDarkGray">特殊说明：{{ dataList.remark }}</text>
        </li>
      </ul>
    </view>
    <view class="u-flex jsb m25">
      <view class="size32"> 猜你喜欢 </view>
      <view class="u-flex size24" @click="toClick">
        <view>更多</view>
        <view> <u-icon name="arrow-right"></u-icon></view>
      </view>
    </view>
    <view style="position: relative; left: -12rpx">
      <recommend />
    </view>
    <view style="height: 160rpx"> </view>
    <!-- <view class="app-btn" v-if="istype == 1">
        <button open-type="launchApp" app-parameter="wechat">
          <text class="app">打开APP</text>
        </button>
      </view> -->

    <u-popup
      :safeAreaInsetBottom="false"
      round="10"
      :show="showpopshare"
      @close="OnCloseShare"
      mode="center"
    >
      <view class="pop-poster">
        <view
          @click="OnSaveImage"
          style="margin-top: 100rpx"
          class="u-flex jsc"
        >
          <image :src="poster" style="width: 443rpx; height: 787rpx"></image>
          <!-- 生成图片 -->
          <poster
            ref="poster"
            :list="list"
            background-color="#FFF"
            :width="443"
            :height="787"
            @on-success="posterSuccess"
          ></poster>
        </view>
        <view class="tac size28" style="margin-top: 28rpx">
          点击图片,长按保存到相册
        </view>
        <view class="pyq">
          <view class="text-pyq">
            {{ dataList.posterDesc }}
          </view>
          <view class="tac mt20" style="display: flex; justify-content: center">
            <image
              @click="Oncopy(dataList.posterDesc)"
              style="width: 230rpx; height: 60rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png"
            >
            </image>
            <button
              @click="handleShare"
              open-type="share"
              style="
                width: 230rpx;
                height: 60rpx;
                margin-left: 20rpx;
                background: url('https://oss.dcqcjlb.com/51che_java_dev/20240113/file_1705126744698.png');
                margin-right: 0;
                background-size: 100%;
              "
            ></button>
          </view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import Poster from '@/components/zhangyuhao-poster/Poster.vue';
import dayjs from 'dayjs';
import recommend from './components/recommend.vue';
export default {
  components: {
    recommend,
    Poster,
  },
  data() {
    return {
      id: 0,
      dataList: {},
      showpopshare: false,
      poster: [],
      list: [],
      // istype: 0,
    };
  },

  onLoad(option) {
    console.log(111111);
    this.id = option.id;
    this.getList();
    // if (option.istype == 1) {
    //   this.istype = 1;
    // }
  },
  // 分享
  onShareAppMessage() {
    const { groupTeamProductId, title, coverPicture } = this.dataList;
    return {
      title: title,
      imageUrl: coverPicture,
      path: `/pages/groupBooking/detail?id=${groupTeamProductId}`,
      success() {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
  computed: {
    codeImg() {
      return this.dataList.shopIds > 0
        ? this.dataList.orderCodeImg
        : this.dataList.orderCodeImgH5;
    },
    // 支付尾款
    balancePayment() {
      return (
        this.dataList.productStatus === 3 &&
        this.dataList.status === 13 &&
        this.getbunchingTime(this.dataList.signUpEndTime) <= 0
      );
    },
    // 拼团中没有成团
    noClustering() {
      return (
        this.getbunchingTime(this.dataList.signUpEndTime) > 0 &&
        this.dataList.productStatus === 2 &&
        this.dataList.status === 13
      );
    },
    downPayment() {
      return (
        this.dataList.depositPrice * this.dataList.groupTeamSetMealNum
      ).toFixed(2);
    },
    actualPayment() {
      if (
        this.getbunchingTime(this.dataList.signUpEndTime) > 0 &&
        this.dataList.productStatus === 2
      ) {
        return `￥ 订金 ${this.downPayment}`;
      } else if (this.dataList.status === 1) {
        return `￥ ${(
          this.currentPriceObj?.flashSalePrice *
            this.dataList.groupTeamSetMealNum -
          (this.dataList.deductionAmount || 0)
        ).toFixed(2)}${
          this.dataList.remainingAmount
            ? `(订金￥${this.downPayment} 尾款￥${this.dataList.remainingAmount})`
            : ''
        }`;
      } else {
        return (
          (
            this.currentPriceObj?.flashSalePrice *
              this.dataList.groupTeamSetMealNum -
            (this.dataList.deductionAmount || 0)
          ).toFixed(2) || 0
        );
      }
    },
    notUseTimesStr() {
      let str = '';
      this.dataList.notUseTimes?.forEach((item, i) => {
        str += `${item.beginTime} 至 ${item.endTime}`;
        if (i !== this.dataList.notUseTimes?.length - 1) {
          str += ',';
        }
      });
      return str;
    },
    // 满多少，享受价格
    ladderPriceObj() {
      const arr = this.dataList.groupTeamSetMealPriceList || [];
      let obj = '';
      obj = arr.find((v) => v.groupTeamNum > this.dataList.depositOrderCount);
      if (
        !obj &&
        this.dataList.groupTeamSetMealPriceList &&
        this.dataList.groupTeamSetMealPriceList.length !== 0
      ) {
        obj =
          this.dataList.groupTeamSetMealPriceList[
            this.dataList.groupTeamSetMealPriceList?.length - 1
          ];
        obj.isEndladder = true;
      }
      return obj;
    },
    // 成团享受价
    currentPriceObj() {
      const arr = this.dataList.groupTeamSetMealPriceList || [];
      let obj = '';
      // obj = arr.find((v) => v.groupTeamNum <= this.dataList.depositOrderCount);
      arr.forEach((v, i) => {
        if (arr[i + 1]) {
          if (
            v.groupTeamNum <= this.dataList.depositOrderCount &&
            arr[i + 1].groupTeamNum > this.dataList.depositOrderCount
          ) {
            obj = v;
          }
        }
      });
      if (!obj) {
        obj = arr[arr.length - 1];
      }
      return obj;
    },
    getbunchingTime() {
      return function (time) {
        return dayjs(time).toDate().getTime() - new Date().getTime();
      };
    },
    // `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '
    //  //订单状态：0-待付款；1-已支付；2-已完成；3-已评价；4-已退款；
    //  5-已取消；6-支付失败；7-付款中；8-退款申请中；12-部分退款；13-定金已支付；'

    // 1、多少人拼团（1、拼团中待付款 2、已支付订金成团还未到截至日期）
    // 2、拼团成功（1、热抢中待付款 2、待支付尾款 3、待核销 4、已核销）
    // 3、拼团失败（1、退款中 2、已退款）
    pingtuanState() {
      const item = this.dataList;
      if (
        item.status === 5 ||
        item.teamworkStatus === 1 ||
        (item.productStatus === 4 && item.status !== 1)
      ) {
        return 3;
      }
      if (
        (item.productStatus === 2 &&
          item.status === 0 &&
          !this.ladderPriceObj?.isEndladder) ||
        (item.productStatus === 2 &&
          item.status === 13 &&
          this.getbunchingTime(item.signUpEndTime) > 0 &&
          !this.ladderPriceObj?.isEndladder)
      ) {
        return 1;
      }
      if (
        (item.productStatus === 2 &&
          item.status === 0 &&
          this.ladderPriceObj?.isEndladder) ||
        (item.productStatus === 2 &&
          item.status === 13 &&
          this.getbunchingTime(item.signUpEndTime) > 0 &&
          this.ladderPriceObj?.isEndladder) ||
        (item.productStatus === 2 &&
          item.status === 13 &&
          this.getbunchingTime(item.signUpEndTime) <= 0) ||
        (item.productStatus === 3 && item.status === 0) ||
        (item.productStatus === 3 && item.status === 13) ||
        (item.productStatus === 4 && item.status === 1) ||
        item.status === 1 ||
        item.status === 2 ||
        item.status === 8 ||
        item.status === 4
      ) {
        return 2;
      }
    },
  },
  methods: {
    handleShare() {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
      });
    },
    Oncopy(value) {
      uni.setClipboardData({
        data: value,
        success: function () {
          uni.$u.toast('复制成功');
        },
      });
    },
    posterSuccess(url) {
      console.log(url);
      // 生成成功，会把临时路径在这里返回
      this.poster = url;
    },
    OnSaveImage() {
      let value = [this.poster];
      uni.previewImage({
        current: 99999,
        urls: value,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {
            console.log(
              '选中了第' +
                (data.tapIndex + 1) +
                '个按钮,第' +
                (data.index + 1) +
                '张图片'
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    OnCloseShare() {
      this.showpopshare = false;
    },
    handleInvite() {
      if (!uni.getStorageSync('token')) {
        tologin();
        return false;
      }
      this.showpopshare = true;
      this.$request
        .post('/coc-active/api/v1/invite/getMiniProgramQrCode', {
          page: 'pages/groupBooking/detail',
          scene:
            this.dataList.groupTeamProductId +
            '_' +
            uni.getStorageSync('userId') +
            '_enter=117',
        })
        .then((res) => {
          this.list = [
            {
              type: 'image',
              // path替换成你自己的图片，注意需要在小程序开发设置中配置域名
              path: encodeURI(this.dataList.posterFigureUrl),
              x: 0,
              y: 0,
              width: 443,
              height: 787,
            },
            {
              type: 'image',
              path: res.data.qrCode,
              x: 18,
              y: 682,
              width: 90,
              height: 90,
            },
          ];
          this.$nextTick(() => {
            // 要放在$nextTick()里，不然会空白
            this.$refs.poster.create();
          });
        });
    },
    handleCopy() {
      uni.setClipboardData({
        data: this.dataList.orderNo,
        success: function () {
          uni.$u.toast('复制成功');
        },
      });
    },
    toClick() {
      uni.navigateTo({
        url: '/pages/activity/activityRegistration/playfulperson',
      });
    },
    OnPushDetail() {
      uni.navigateTo({
        url:
          '/pages/groupBooking/detail?id=' + this.dataList.groupTeamProductId,
      });
    },
    Ondrawback() {
      let _this = this;
      uni.navigateTo({
        url: '/pages/groupBooking/groupRefund?id=' + this.id + '&back=2&type=2',
        success: function (res) {
          res.eventChannel.emit('getInfoObjVal', {
            data: _this.dataList,
            currentPriceObj: _this.currentPriceObj,
          });
        },
      });
    },
    wxpay(data) {
      let _this = this;
      uni.requestPayment({
        provider: 'wxpay', //支付类型-固定值
        timeStamp: data.miniPayRequest.timeStamp, // 时间戳（单位：秒）
        nonceStr: data.miniPayRequest.nonceStr, // 随机字符串
        package: data.miniPayRequest.package, // 固定值
        signType: data.miniPayRequest.signType, //固定值
        paySign: data.miniPayRequest.paySign, //签名
        appid: data.miniPayRequest.appId,
        success: function (res) {
          uni.showToast({
            icon: 'success',
            title: '支付成功',
            complete() {
              setTimeout(() => {
                // 跳转到登录页
                // _this.getList();
                uni.navigateBack();
              }, 1000);
            },
          });
        },
      });
    },
    OnPay() {
      let url = '';
      let params = {};
      // 尾款
      const {
        groupTeamProductId,
        groupTeamSetMealId,
        groupTeamSetMealNum,
        mobile,
        name,
        orderId,
        paymentPreferenceId,
        remark,
      } = this.dataList;
      if (this.balancePayment) {
        url = '/coc-active/api/v1/groupTeamPurchase/groupTeamBalancePayment';
        params = {
          groupTeamProductId,
          orderId,
          payType: 2,
          subOpenId: uni.getStorageSync('openid'),
        };
      } else {
        url = '/coc-active/api/v1/groupTeamPurchase/groupTeamPayment';
        params = {
          groupTeamProductId,
          groupTeamSetMealId,
          groupTeamSetMealNum,
          mobile,
          name,
          orderId,
          payType: 2,
          paymentPreferenceId,
          remark,
          subOpenId: uni.getStorageSync('openid'),
        };
      }
      this.$request.post(url, params).then((res) => {
        if (res.code == 200) {
          this.id = res.data.orderId;
          this.wxpay(res.data.payment);
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none',
          });
        }
      });
    },
    OnCopy(value) {
      uni.setClipboardData({
        data: value,
        success: function () {
          uni.showToast({
            title: '复制成功',
            icon: 'none',
          });
        },
      });
    },
    // OnPushMap() {
    //   let _this = this;
    //   uni.openLocation({
    //     latitude: _this.dataList.shopVO.lat,
    //     longitude: _this.dataList.shopVO.lng,
    //     success: function () {
    //       console.log('success');
    //     },
    //   });
    // },
    OnPushshopHome() {
      if (this.dataList.shopTypeId == 3) {
        // 商家
        uni.navigateTo({
          url: '/pages/activityMall/business/index?id=' + this.dataList.shopIds,
        });
      } else if (this.dataList.shopTypeId == 2) {
        // 4S
        uni.navigateTo({
          url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopIds,
        });
      }
    },
    getList() {
      this.$request
        .post('/coc-active/api/v1/groupTeamPurchase/orderDetail', {
          orderId: this.id,
        })
        .then((res) => {
          if (res.code !== 200) {
            uni.showToast({
              icon: 'none',
              title: res.message,
            });
          }
          this.dataList = res.data;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep {
  .u-divider {
    margin: 0 !important;
  }
}
</style>
<style lang="scss">
.card {
  background: #ffffff;
  border-radius: 10rpx;
  margin: 25rpx;
  padding: 0 24rpx;
}

.code-img {
  width: 300rpx;
  height: 300rpx;
  background: #ffffff;
  border-radius: 50rpx;
  margin: 25rpx auto;
  text-align: center;
  margin-bottom: 0rpx;
  image {
    width: 300rpx !important;
    height: 300rpx !important;
  }
}

.card-enterprice {
  background-color: #ffffff;
  margin: 25rpx;
  border-radius: 10rpx;
  padding: 24rpx;
}

.mainhome-btn {
  width: 80rpx;
  height: 40rpx;
  border: 1rpx solid #d91b1b;
  border-radius: 20rpx;
  line-height: 40rpx;
  color: #d91b1b;
  font-size: 24rpx;
  text-align: center;
}

.card-goumai {
  padding: 32rpx 24rpx 32rpx 10rpx;
  background-color: #ffffff;
  margin: 25rpx;
  border-radius: 10rpx;
  font-size: 24rpx;
}

.ul-item {
  list-style-type: disc;
}

.li-item {
  color: #d91b1b;
  font-size: 24rpx;
  display: list-item;
  margin-left: 40rpx;
  margin-top: 24rpx;
}

.btn-follow {
  background-color: #d91b1b;
  display: flex;
  justify-content: center;
  border-radius: 10rpx;
  color: #ffffff;
  font-size: 24rpx;
  width: 108rpx;
  height: 40rpx;
  line-height: 40rpx;
  align-self: center;
}

.title-info {
  font-size: 28rpx;
  font-weight: bold;
  border-left: 10rpx solid #d91b1b;
  margin-left: 25rpx;
  padding-left: 20rpx;
}

.On-pay {
  text-align: center;
  background-color: #1bd993;
  border-radius: 40rpx;
  width: 500rpx;
  text {
    display: inline-block;
    // width: 600rpx;
    height: 80rpx;
    color: #ffffff;
    line-height: 34rpx;
    text-align: center;
    line-height: 80rpx;
  }
}

.drawback {
  width: 132rpx;
  height: 40rpx;
  border: 1rpx solid #666666;
  border-radius: 20rpx;
  text-align: center;
  line-height: 40rpx;
  font-size: 24rpx;
  color: #666666;
  margin-left: 60rpx;
  float: right;
  margin-top: 14rpx;
}

.app-btn {
  position: fixed;
  bottom: 0rpx;
  width: 100%;
  background-color: #ffffff;

  .app {
    width: 320rpx;
    border-radius: 20rpx;
    background-color: #d91b1b;
    text-align: center;
    font-size: 28rpx;
    color: #ffffff;
    line-height: 65rpx;
    display: inline-block;
  }
}
.m25 {
  margin: 0 25rpx;
}
.downPayment {
  display: flex;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #d91b1b;
}
.groupDetails {
  font-size: 24rpx;
  font-family: PingFang SC;
  & > div:nth-child(1) {
    padding: 0 14rpx;
    background: #d91b1b;
    border-radius: 10rpx;
    font-weight: bold;
    color: #ffffff;
    height: 45rpx;
    line-height: 45rpx;
  }
  & > div:nth-child(2) {
    font-weight: 500;
    color: #d91b1b;
    margin-left: 15rpx;
  }
}
.aaaaa {
  height: 80rpx;
  line-height: 80rpx;
}
.list__btn--invite {
  width: 184rpx;
  height: 42rpx;
  border-radius: 100rpx;
  text-align: center;
  align-items: center;
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 42rpx;
  margin-left: 12rpx;
  background: #d91b1b;
}
.pop-poster {
  width: 650rpx;
  border-radius: 10rpx;
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685084245034.png');
  background-size: 100% 100%;
  margin-top: -12rpx;

  button::after {
    border: none;
  }
}
.pyq {
  margin: 25rpx;
  border-radius: 10rpx;
  background-color: #d91b1b;
  padding: 7rpx 7rpx 20rpx 7rpx;
}

.text-pyq {
  padding: 20rpx 20rpx 50rpx 20rpx;
  font-size: 24rpx;
  background-color: #ffffff;

  border-radius: 10rpx;
}
</style>
