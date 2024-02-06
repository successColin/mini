<template>
  <view class="page" @click.stop="closeQrcode">
      <scroll-view :scroll-y="true" :style="{ maxHeight: contentHeight, overflow: 'auto' }">
          <view class="search-top" :style="{ height: navbarHeight + 'px' }">
              <u-navbar leftIconSize="0" bgColor="#D91B1B">
                  <view class="u-nav-slot" slot="center" style="width: 100%">
                      <view @click="OnCity" class="city-view"> </view>
                  </view>
              </u-navbar>
          </view>
          <!-- 个人信息头像界面 -->
          <view class="top-img">
              <view class="user-info">
                  <view class="u-flex">
                      <view>
                          <u--image
                              v-if="istoken && dataList.headImg"
                              :showLoading="true"
                              :src="dataList.headImg"
                              width="100rpx"
                              height="100rpx"
                              radius="14rpx"
                          >
                          </u--image>
                          <image
                              @click="login"
                              v-else
                              :showLoading="true"
                              src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706063549640.png"
                              style="width: 100rpx; height: 100rpx"
                              radius="10rpx"
                          >
                          </image>
                      </view>
                      <view v-if="istoken" class="left-info">
                          <view class="user-name">{{ dataList.nickname }}</view>
                          <view v-if="roadVip == 2" style="margin-top: 10rpx" class="helpcard" @click="OnPushquanyi">
                              <image
                                  style="width: 420rpx; height: 50rpx"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20230621/file_1687318101841.png"
                              >
                              </image>
                              <view class="helptime"> 至{{ roadVipExp }} </view>
                          </view>
                          <view
                              v-if="roadVip == 0 && roadVipExp"
                              style="margin-top: 10rpx"
                              class="helpcard"
                              @click="Onpushloadhelp"
                          >
                              <image
                                  style="width: 389rpx; height: 50rpx"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20230621/file_1687325213711.png"
                              >
                              </image>
                          </view>
                          <view v-if="roadVip == 1" style="margin-top: 10rpx" class="helpcard" @click="OnPushquanyi">
                              <image
                                  style="width: 298rpx; height: 50rpx"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20230621/file_1687325788854.png"
                              >
                              </image>
                          </view>
                      </view>
                      <view v-else class="left-info">
                          <view class="user-name">点击头像登录</view>
                      </view>
                  </view>
                  <view class="u-flex">
                      <view class="message" @click="toMessage">
                          <image
                              class="message-image"
                              src="https://oss.dcqcjlb.com/51che_java_dev/20231121/file_1700532364102.png"
                          />
                          <view v-if="dataList.messageNum" class="message-number">{{ dataList.messageNum }}</view>
                      </view>
                      <view @click="OnPushSetInfo" style="margin-right: 20rpx">
                          <image style="height: 40rpx; width: 40rpx" src="@/static/image/shezhi.png"> </image>
                      </view>
                  </view>
              </view>
              <view class="top-list">
                  <view class="list" @click="OnPushCollection(1)">
                      <view class="num">
                          {{ dataList.collectionsCount }}
                      </view>
                      <view class="text"> 我的收藏 </view>
                  </view>
                  <view class="list" @click="Oncouponpackage(1)">
                      <view class="num">
                          {{ dataList.couponCount + dataList.maintainCount }}
                      </view>
                      <view class="text"> 卡券 </view>
                  </view>

                  <view class="list" @click="OnPushIntegral">
                      <view class="num">
                          {{ getscore(dataList.score) }}
                      </view>
                      <view class="text"> 我的积分 </view>
                  </view>
                  <view v-if="dataList.isExpert == 1 && istoken" style="position: relative">
                      <view class="list" @click.stop="showQrcode">
                          <view class="num">
                              <image
                                  style="width: 40rpx; height: 40rpx"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1685003137161.png"
                              >
                              </image>
                          </view>
                          <view class="text"> 邀请码 </view>
                      </view>
                      <view v-show="showVisble" class="qrcode_visble">
                          <view class="btn qrcode_btn_one" @click="jumpRecommendedWiseman">推荐达人</view>
                          <view class="btn" @click="jumpRecommendedShopQrcode">推荐商家</view>
                      </view>
                  </view>
              </view>
          </view>
          <view class="body-item">
              <view
                  v-if="(dataList.isExpert == 1 || wisemanstatus) && istoken"
                  class="operation"
                  style="
                      display: flex;
                      padding: 32rpx 25rpx 32rpx 28rpx;
                      position: relative;
                      align-items: center;
                      justify-content: space-between;
                  "
              >
                  <view class="u-flex" style="z-index: 100">
                      <view @click="OnPusharea(1)">
                          <view class="size24"> 可提现(元) </view>
                          <view style="font-size: 44rpx" class="mainRed">
                              {{ dataList.balance }}
                          </view>
                      </view>
                      <view style="margin-left: 60rpx" @click="OnPusharea(2)">
                          <view class="size24"> 累计收益(元) </view>
                          <view style="font-size: 44rpx" class="mainRed">
                              {{ dataList.earnMoney }}
                          </view>
                      </view>
                      <view style="margin-left: 60rpx" @click="OnPusharea(3)">
                          <view class="size24"> 作品(个) </view>
                          <view style="font-size: 44rpx" class="mainRed">
                              {{ dataList.articleCount }}
                          </view>
                      </view>
                  </view>

                  <view class="wise-img"> </view>
                  <view class="wiseman-btn" @click="OnPusharea(4)"> 达人特区 </view>
              </view>
              <view class="operation" style="display: flex; justify-content: space-around; padding: 52rpx 0rpx">
                  <view @click="Onpushorder(0)" style="text-align: center; position: relative">
                      <view>
                          <image src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702949200098.svg" style="width: 56rpx; height: 56rpx"></image>
                      </view>
                      <view style="font-size: 24rpx; font-weight: 500"> 活动订单 </view>
                      <view class="badge" v-if="dataList.activityPayOrderNum > 0">
                          <u-badge type="error" :value="dataList.activityPayOrderNum"></u-badge>
                      </view>
                  </view>

                  <view @click="Onpushgroup()" style="text-align: center; position: relative">
                      <view>
                          <image src="@/static/image/tuangoudingdan.svg" style="width: 56rpx; height: 56rpx"></image>
                      </view>
                      <view style="font-size: 24rpx; font-weight: 500"> 团购订单 </view>
                      <view class="badge" v-if="dataList.groupPayOrderNum > 0">
                          <u-badge type="error" :value="dataList.groupPayOrderNum"></u-badge>
                      </view>
                  </view>
                  <view @click="OnPushmyIntegralOrder" style="text-align: center; position: relative">
                      <view>
                          <image src="@/static/image/jifendingdan.svg" style="width: 56rpx; height: 56rpx"></image>
                      </view>
                      <view style="font-size: 24rpx; font-weight: 500"> 积分订单 </view>
                      <view class="badge" v-if="dataList.scorePayOrderNum > 0">
                          <u-badge type="error" :value="dataList.scorePayOrderNum"></u-badge>
                      </view>
                  </view>
                  <view @click="OnPushmyUpkeepOrder()" style="text-align: center; position: relative">
                      <view>
                          <image src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702949346602.svg" style="width: 56rpx; height: 56rpx"></image>
                      </view>
                      <view style="font-size: 24rpx; font-weight: 500"> 保养订单 </view>
                      <view class="badge" v-if="dataList.maintainPayOrderNum > 0">
                          <u-badge type="error" :value="dataList.maintainPayOrderNum"></u-badge>
                      </view>
                  </view>
              </view>
              <view v-if="istoken" @click="Onpushloadhelp" style="margin-left: 32rpx">
                  <image
                      style="width: 686rpx; height: 140rpx"
                      src="https://oss.dcqcjlb.com/51che_java_dev/20230428/file_1682647469032.png"
                  >
                  </image>
              </view>
              <view class="myList">
                  <!-- <view class="bottom-item flex alc jsb" v-if="istoken">
        <view class="u-flex">
          <view style="margin-right: 20rpx">
            <image style="width: 38rpx;height: 30rpx" mode="heightFix" src="@/static/image/daren.png" />
          </view>
          <view style="font-size: 28rpx;font-weight: bold;">升级达人</view>
        </view>
        <view>
          <u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
        </view>
      </view> -->

                  <!-- 	<view v-if="dataList.isExpert==0&&istoken" class="bottom-item flex alc jsb" @click="upgradewiseman">
          <view class="u-flex alc">
            <view style="margin-right: 20rpx">
              <image style="width: 40rpx;height: 40rpx" mode="heightFix"
                src="@/static/image/darenlogo.svg" />
            </view>
            <view style="font-size: 28rpx;font-weight: bold;">升级达人</view>
          </view>
          <view>
            <u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
          </view>
        </view> -->
                  <view class="bottom-item flex alc jsb" @click="myupkeeporder">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 40rpx; height: 40rpx"
                                  mode="heightFix"
                                  src="@/static/image/baoyangyuyue.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">保养预约</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
                  <view class="bottom-item flex alc jsb" @click="AddmyCar">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 40rpx; height: 40rpx"
                                  mode="heightFix"
                                  src="@/static/image/wodeaiche.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">我的爱车</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
                  <view class="bottom-item flex alc jsb" @click="mycaroder">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 40rpx; height: 40rpx"
                                  mode="heightFix"
                                  src="@/static/image/wodeaiche.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">订车订单</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
                  <view class="bottom-item flex alc jsb" v-if="istoken" @click="Onopencard">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 39rpx; height: 39rpx"
                                  mode="heightFix"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702949250688.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">信用卡管理</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
                  <view class="bottom-item flex alc jsb" v-if="istoken" @click="OnMerchantsettlement">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 39rpx; height: 39rpx"
                                  mode="heightFix"
                                  src="@/static/image/shangjiaruzhu.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">商家入驻</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
                  <view class="bottom-item flex alc jsb" @click="OnPushCouponCenter">
                      <view class="u-flex alc">
                          <view style="margin-right: 20rpx" class="u-flex">
                              <image
                                  style="width: 40rpx; height: 40rpx"
                                  mode="heightFix"
                                  src="https://oss.dcqcjlb.com/51che_java_dev/20231219/file_1702949389329.svg"
                              />
                          </view>
                          <view style="font-size: 28rpx; font-weight: bold">领券中心</view>
                      </view>
                      <view>
                          <u-icon size="12" name="arrow-right" :bold="true" color="#222222"></u-icon>
                      </view>
                  </view>
              </view>
          </view>
      </scroll-view>
      <u-modal
          confirmColor="red"
          :show="showmodal"
          content="商家入驻需要获取您的位置信息,请打开小程序设置,更改位置信息为'使用小程序时允许'后再次点击"
          @confirm="Ontruemodal"
      ></u-modal>
      <u-popup
          round="20"
          :safeAreaInsetBottom="false"
          :show="showsetheadimg"
          @close="showsetheadimg = false"
          mode="center"
      >
          <view style="width: 450rpx; height: 142rpx; padding: 70rpx 130rpx 56rpx 130rpx; text-align: center">
              <view style="font-size: 32rpx; font-weight: bold"> 您还未设置头像昵称 </view>
              <view class="u-flex" style="margin-top: 56rpx; justify-content: space-between">
                  <view class="noset" @click="showsetheadimg = false"> 暂不设置 </view>
                  <view class="toset" @click="OnToset"> 去设置 </view>
              </view>
          </view>
      </u-popup>
      <tabbar v-model="tabbarHeight" routePath="pages/home/my"></tabbar>
  </view>
</template>

<script>
import tabbar from "@/components/tabbar/index.vue";
import { getstorage, gettoken, setstorage, tologin } from "@/utils/index.js";
import QQMapWX from "@/utils/qqmap/qqmap-wx-jssdk.min.js";
export default {
  components: {
      tabbar,
  },
  data() {
      return {
          roadVip: 0,
          roadVipExp: null,
          showsetheadimg: false,
          showmodal: false,
          qqmapsdk: "",
          shoptypeid: "",
          istoken: false,
          orderbtn: [
              {
                  label: "待付款",
                  value: "1",
              },
              {
                  label: "待核销",
                  value: "2",
              },
              {
                  label: "已退款",
                  value: "3",
              },
              {
                  label: "待评论",
                  value: "4",
              },
          ],
          dataList: {
              collectionsCount: 0,
              couponCount: 0,
              redCount: 0,
              maintainCount: 0,
              score: 0,
          },
          finduserList: {},
          visitinto: null,
          tabbarHeight: 0, //tabbar高度
          wisemanstatus: false,
          showVisble: false,
      };
  },
  computed: {
      // 状态栏高度适配
      navbarHeight() {
          return uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
      },
      //除去自定义tabbar的高度
      contentHeight() {
          return `calc(100vh - ${this.tabbarHeight}px)`;
      },
  },
  onHide() {
      if (uni.getStorageSync("token")) {
          this.$request
              .post("/coc-active/api/v1/user/behavior/visit_exit", {
                  userVisitId: this.visitinto,
              })
              .then((res) => {});
      }
  },
  onUnload() {
      if (uni.getStorageSync("token")) {
          this.$request
              .post("/coc-active/api/v1/user/behavior/visit_exit", {
                  userVisitId: this.visitinto,
              })
              .then((res) => {});
      }
  },
  onLoad() {
      this.qqmapsdk = new QQMapWX({
          key: "BH7BZ-PEPCX-SNA47-TZBJA-SKIFV-GVFSW",
      });
      if (gettoken()) {
          this.getstatus();
      }
  },
  onShow() {
      let _this = this;
      uni.getLocation({
          type: "wgs84",
          success: function (res) {
              console.log("当前位置的经度：" + res.longitude);
              console.log("当前位置的纬度：" + res.latitude);
              setstorage("lat", res.latitude);
              setstorage("lng", res.longitude);
          },
      });
      this.shoptypeid = getstorage("shopTypeId");
      this.istoken = gettoken();
      if (gettoken()) {
          this.$request.post("/coc-active/api/v1/my/index").then((res) => {
              setstorage("isExpert", res.data.isExpert);
              this.dataList = res.data;
              if (res.data.isDefaultAvatar == 1 && tologin()) {
                  this.showsetheadimg = true;
              }
          });

          this.getinfo();
      } else {
          this.dataList = {
              collectionsCount: 0,
              couponCount: 0,
              redCount: 0,
              maintainCount: 0,
              score: 0,
          };
      }
      if (uni.getStorageSync("token")) {
          this.$request
              .post("/coc-active/api/v1/user/behavior/visit_into", {
                  type: 15,
              })
              .then((res) => {
                  this.visitinto = res;
              });
      }
  },
  methods: {
      toMessage() {
          uni.navigateTo({
              url: "/pages/wiseman/specialarea/message",
          });
      },
      OnPushquanyi() {
          uni.navigateTo({
              url: "/pages/roadhelp/equity",
          });
      },
      Onopencard() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/card/index",
          });
      },
      Onpushloadhelp() {
          if (!uni.getStorageSync("token")) {
              uni.navigateTo({
                  url: "/pages/activity/share/index",
              });
              return false;
          }
          uni.navigateTo({
              url: "/pages/roadhelp/index",
          });
      },
      OnPusharea(num) {
          if (this.dataList.expertStatus == 1) {
              uni.$u.toast("您的达人权限被封禁，暂不能进入达人特区");
              return false;
          }
          if (this.wisemanstatus) {
              uni.navigateTo({
                  url: "/pages/wiseman/applying",
              });
              return false;
          }
          if (num == 1) {
              uni.navigateTo({
                  url: "/pages/myEarnings/mainPage",
              });
          } else if (num == 2) {
              uni.navigateTo({
                  url: "/pages/myEarnings/mainPage",
              });
          } else if (num == 3) {
              uni.navigateTo({
                  url: "/pages/wiseman/mywork",
              });
          } else {
              uni.navigateTo({
                  url: "/pages/wiseman/specialarea/home",
              });
          }
      },
      getstatus() {
          this.$request.post("/coc-active/api/v1/expert/echoVerify").then((res) => {
              if (res.data.status == 1) {
                  this.wisemanstatus = true;
              }
          });
      },
      upgradewiseman() {
          this.$request.post("/coc-active/api/v1/expert/echoVerify").then((res) => {
              if (res.code == 1101) {
                  uni.navigateTo({
                      url: "/pages/wiseman/welcome",
                  });
              } else if (res.data.status == 1) {
                  uni.navigateTo({
                      url: "/pages/wiseman/applying",
                  });
              } else if (res.data.status == 3) {
                  uni.navigateTo({
                      url: "/pages/wiseman/welcome",
                  });
              }
          });
      },
      OnToset() {
          this.showsetheadimg = false;
          this.OnPushSetInfo();
      },
      getscore(score) {
          if (score >= 10000) {
              let num = 0;
              num = score / 10000;
              return num + "W";
          } else {
              return score;
          }
      },
      Ontruemodal() {
          this.showmodal = false;
      },

      OnMerchantsettlement() {
          let _this = this;
          if (!getstorage("lat")) {
              this.showmodal = true;
              return false;
          }
          // let needObj = JSON.stringify({
          //   // // * 视频验证：0-视频未认证；1-视频认证中；2-视频认证成功；3-视频认证失败
          //   // videoVerification: this.finduserList.shop?.videoVerification,
          //   // // * 签约验证：0-签约中；1-签约成功；
          //   // signingVerification: this.finduserList.shop?.signingVerification,

          //   // // sendCount 视频次数
          //   // sendCount: this.finduserList.shop?.sendCount,
          //   // // signingSendCount 签约次数
          //   // signingSendCount: this.finduserList.shop?.signingSendCount,

          //   // 银联标识，调用入网状态查询
          //   umsRegId: this.finduserList.shop?.umsRegId,
          // });
          if (this.finduserList.shop == null) {
              uni.navigateTo({
                  url: "/pages/Settlein/welcomevue",
              });
          } else if (this.finduserList.shop.unionPayStatus == 4 && this.finduserList.shop.status == 0) {
              if (this.finduserList.shop.bankAcctType == 1) {
                  uni.navigateTo({
                      url:
                          "/pages/Settlein/enterpriseProgress?type=1" +
                          "&isLineLedger=" +
                          this.finduserList.shop.isLineLedger +
                          "&settleType=" +
                          this.finduserList.shop.settleType,
                  });
              }
          } else if (this.finduserList.shop.status == 0) {
              if (this.finduserList.shop.bankAcctType == 1) {
                  uni.navigateTo({
                      url:
                          "/pages/Settlein/enterpriseProgress?type=2" +
                          "&isLineLedger=" +
                          this.finduserList.shop.isLineLedger +
                          "&settleType=" +
                          this.finduserList.shop.settleType,
                  });
              } else {
                  uni.navigateTo({
                      url: `/pages/Settlein/individualProgress?isLineLedger=${this.finduserList.shop.isLineLedger}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
                  });
              }
          } else if (this.finduserList.shop.status == 1) {
              if (this.finduserList.shop.bankAcctType == 1) {
                  uni.navigateTo({
                      url:
                          "/pages/Settlein/enterpriseProgress?type=3" +
                          "&isLineLedger=" +
                          this.finduserList.shop.isLineLedger +
                          "&settleType=" +
                          this.finduserList.shop.settleType,
                  });
              } else {
                  uni.navigateTo({
                      url: `/pages/Settlein/individualProgress?isLineLedger=${this.finduserList.shop.isLineLedger}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
                  });
              }
          } else if (this.finduserList.shop.status == 2) {
              if (this.finduserList.shop.bankAcctType == 1) {
                  uni.navigateTo({
                      url:
                          "/pages/Settlein/enterpriseProgress?type=4&auditReason=" +
                          this.finduserList.shop.auditReason +
                          "&unionPayStatus=" +
                          this.finduserList.shop.unionPayStatus +
                          "&isLineLedger=" +
                          this.finduserList.shop.isLineLedger +
                          "&status=" +
                          this.finduserList.shop.status +
                          "&settleType=" +
                          this.finduserList.shop.settleType,
                  });
              } else {
                  uni.navigateTo({
                      url: `/pages/Settlein/individualProgress?auditReason=${this.finduserList.shop.auditReason}
              &unionPayStatus=${this.finduserList.shop.unionPayStatus}&isLineLedger=${this.finduserList.shop.isLineLedger}
              &status=${this.finduserList.shop.status}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
                  });
              }
          }
      },
      OnaddVerification() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/merchantZone/writeOffCode/index",
          });
      },

      OnPushCouponCenter() {
          uni.navigateTo({
              url: "/pages/my/couponCenter/index",
          });
      },
      getinfo() {
          this.$request.get("/coc-my/api/v1/my/findUser").then((res) => {
              this.roadVip = res.data.user.roadVip;
              this.roadVipExp = res.data.user.roadVipExp;
              // this.roadVip = 0
              this.finduserList = res.data;
              setstorage("headImg", res.data.user.headImg);
              setstorage("nickname", res.data.user.nickname);
              setstorage("userType", res.data.user.userType);
              setstorage("userId", res.data.user.id);
              setstorage("isCertify", res.data.user.isCertify);
              setstorage("realName", res.data.user.realName);
              setstorage("mobile", res.data.user.mobile);
              if (res.data.shop == null) {
                  setstorage("status", null);
                  setstorage("shopId", null);
                  setstorage("shopName", null);
                  setstorage("shopTypeId", 0);
                  setstorage("shopType", null);
              } else {
                  setstorage("status", res.data.shop.status);
                  setstorage("shopId", res.data.shop.id);
                  setstorage("shopName", res.data.shop.shopName);
                  setstorage("shopTypeId", res.data.shop.shopTypeId);
                  setstorage("shopType", res.data.shop.status);
              }
          });
      },
      Onmyfans() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/myfans/index",
          });
      },

      //老客户经理转跳
      // OnMyManager() {
      // 	if (tologin() !== true) {
      // 		return
      // 	}
      // 	uni.navigateTo({
      // 		url: '/pages/my/myManager/index'
      // 	})
      // },
      Oninviteinfluencers() {
          uni.navigateTo({
              url: "/pages/wiseman/invitein",
          });
      },
      OnPushIntegral() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/integral/index",
          });
      },
      // 保养预约订单
      myupkeeporder() {
          tologin();
          uni.navigateTo({
              url: "/pages/upkeep/orderlist",
          });
      },
      // 订车订单
      mycaroder() {
          tologin();
          uni.navigateTo({
              url: "/pages/my/mycarorder/index",
          });
      },
      // 老我的爱车转跳
      AddmyCar() {
          tologin();
          uni.navigateTo({
              url: "/pages/my/mycar/index",
          });
      },
      OnFeedback() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/myFeedback/index?type=2",
          });
      },

      login() {
          if (tologin() !== true) {
              return;
          }
      },

      Oncouponpackage(type) {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/myorder/couponpackage?type=" + type,
          });
      },
      Onpushgroup() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/grouppurchase/order/list",
          });
      },
      Onpushorder(type) {
          if (tologin() !== true) {
              return;
          }
          if (type == 99) {
              return false;
          }
          uni.navigateTo({
              url: "/pages/my/myorder/index?type=" + type,
          });
      },

      OnPushCollection(type) {
          if (tologin() !== true) {
              return;
          }
          if (type == 2) {
              return false;
          }
          uni.navigateTo({
              // type=1时表示我的收藏 =2时表示我的足迹
              url: "/pages/my/collection/index?type=" + type,
          });
      },
      OnPushSetInfo() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/info/index",
          });
      },
      OnPushmyIntegralOrder() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/myIntegralOrder/index?status=0",
          });
      },
      OnPushmyUpkeepOrder() {
          if (tologin() !== true) {
              return;
          }
          uni.navigateTo({
              url: "/pages/my/myUpkeepOrder/index?status=0",
          });
      },
      showQrcode() {
          this.showVisble = !this.showVisble;
      },
      closeQrcode() {
          this.showVisble = false;
      },
      //推荐商家二维码
      jumpRecommendedShopQrcode() {
          uni.navigateTo({
              url: "/pages/wiseman/inviteinbusiness",
          });
      },
      //推荐达人
      jumpRecommendedWiseman() {
          uni.navigateTo({
              url: "/pages/wiseman/invitein",
          });
      },
  },
};
</script>

<style lang="scss">
.page {
  min-height: 100vh;
}

.user-info {
  margin: 0rpx 20rpx 20rpx 20rpx;
  display: flex;
  justify-content: space-between;
  padding-top: 20rpx;

  .left-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 20rpx;
      color: #ffffff;

      .user-name {
          font-size: 32rpx;
          font-weight: bold;
      }

      .fans-info {
          display: flex;
          font-size: 24rpx;
          color: #ffffff;
          font-weight: 500;
      }
  }
}

.body-item {
  position: relative;

  .operation {
      padding: 20rpx;
      margin: 10rpx 32rpx 20rpx 32rpx;
      background-color: #ffffff;
      border-radius: 10rpx;
  }

  .myList {
      padding: 0 25rpx;
      border-radius: 10rpx;
      background-color: #fff;
      margin-bottom: 50rpx;
      box-sizing: border-box;
      width: 691rpx;
      margin: 8rpx auto 50rpx;

      .bottom-item {
          padding: 25rpx 0;
          border-bottom: 1rpx solid #f8f8f8;
      }

      .bottom-item:nth-last-child(1) {
          border-bottom: none;
      }
  }
}

.search-top {
  .city-view {
      padding-left: 32rpx;
      display: flex;
      align-items: center;
  }
}

.top-img {
  background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720392529.png");
  background-size: 100% 100%;
  width: 750rpx;
  height: 384rpx;
  position: relative;
  margin-bottom: -105rpx;
}

.top-list {
  color: #ffffff;
  display: flex;
  justify-content: space-around;
  margin-top: 52rpx;

  .list {
      text-align: center;

      .num {
          font-size: 36rpx;
          font-weight: bold;
      }

      .text {
          font-weight: 500;
          font-size: 24rpx;
      }
  }
}

.order-name {
  font-size: 28rpx;
  font-weight: bold;
}

.order-watch {
  font-size: 24rpx;
  color: #d91b1b;
  display: flex;
  align-items: center;
  margin-top: 6rpx;
}

.noset {
  width: 200rpx;
  height: 70rpx;
  background: #999999;
  border-radius: 35rpx;
  text-align: center;
  color: #ffffff;
  line-height: 70rpx;
}

.toset {
  width: 200rpx;
  height: 70rpx;
  background: #d91b1b;
  border-radius: 35rpx;
  color: #ffffff;
  text-align: center;
  line-height: 70rpx;
}

.noset {
  width: 200rpx;
  height: 70rpx;
  background: #999999;
  border-radius: 35rpx;
  text-align: center;
  color: #ffffff;
  line-height: 70rpx;
}

.toset {
  width: 200rpx;
  height: 70rpx;
  background: #d91b1b;
  border-radius: 35rpx;
  color: #ffffff;
  text-align: center;
  line-height: 70rpx;
}

.wise-img {
  position: absolute;
  background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230527/file_1685154237738.png");
  background-size: 100% 100%;
  top: 10rpx;
  left: 410rpx;
  width: 148rpx;
  height: 113rpx;
}

.wiseman-btn {
  width: 130rpx;
  height: 50rpx;
  background: #d91b1b;
  border-radius: 24rpx;
  line-height: 50rpx;
  text-align: center;
  font-size: 24rpx;
  color: #ffffff;
}

.helpcard {
  position: relative;
}

.helptime {
  position: absolute;
  left: 190rpx;
  color: #ac6606;
  font-size: 20rpx;
  line-height: 50rpx;
  display: inline-flex;
}

.badge {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
}

.qrcode_visble {
  width: 176rpx;
  height: 188rpx;
  background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169684893.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: absolute;
  right: -17rpx;
  top: 95rpx;
  z-index: 999;

  .qrcode_btn_one {
      margin-top: 12rpx;
  }

  .btn {
      height: 88rpx;
      width: 100%;
      font-size: 27rpx;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
      line-height: 88rpx;
  }
}

.message {
  position: relative;

  &-image {
      width: 38rpx;
      height: 38rpx;
      margin-right: 20rpx;
  }

  &-number {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      top: -18rpx;
      right: 6rpx;
      width: 32rpx;
      height: 32rpx;
      background: #ffffff;
      border-radius: 16rpx;
      font-size: 19rpx;
      font-weight: 800;
      color: #d91b1b;
  }
}
</style>
