<template>
  <view>
    <!-- <view class="tabs bgfff">
			<view :class="{ 'current-tab-left': currenttab == 1 }" @click="OnClickTab(1)" class="tab-item">优惠券</view>
			<view :class="{ 'current-tab-right': currenttab == 2 }" @click="OnClickTab(2)" class="tab-item">保养券</view>
		</view> -->
    <view class="page">
      <view class="status-type" v-if="currenttab == 1">
        <view
          class="type-item"
          @click="changestatustype(1)"
          :class="{ 'current-status-type': '1' == statustype }"
          >可使用
        </view>
        <view
          class="type-item"
          @click="changestatustype(2)"
          :class="{ 'current-status-type': '2' == statustype }"
          >已使用
        </view>
        <view
          class="type-item"
          @click="changestatustype(3)"
          :class="{ 'current-status-type': '3' == statustype }"
          >已过期
        </view>
        <view
          class="type-item"
          @click="changestatustype(4)"
          :class="{ 'current-status-type': '4' == statustype }"
          >领券中心
        </view>
      </view>
      <!-- && currenttab == 1 -->
      <view
        v-if="dataList.length == 0"
        style="margin-top: 300rpx; text-align: center"
      >
        <image
          style="width: 245rpx; height: 232rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221130/d394c9a026f24de9a137783515f5d3c2.png"
        >
        </image>
        <view style="font-size: 24rpx; color: #999999; margin-top: 79rpx"
          >暂无优惠券</view
        >
      </view>
      <view
        v-if="dataList.length == 0 && currenttab == 2"
        style="margin-top: 300rpx; text-align: center"
      >
        <image
          style="width: 254rpx; height: 242rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221130/ec87e032524742a48b4075fe030b9375.png"
        >
        </image>
        <view style="font-size: 24rpx; color: #999999; margin-top: 79rpx"
          >暂无保养券</view
        >
      </view>
      <view v-if="currenttab == 1 && statustype === 4" class="bbbbbb">
        <view class="page">
          <scroll-view
            scroll-y="true"
            @scrolltolower="onReachScollBottom"
            style="max-height: 100vh"
          >
            <!-- <view
              v-if="dataList.length == 0"
              style="margin-top: 300rpx; text-align: center"
            >
              <image
                style="width: 245rpx; height: 232rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20221130/d394c9a026f24de9a137783515f5d3c2.png"
              >
              </image>
              <view style="margin-top: 79rpx" class="size24 txtLighGray"
                >暂无优惠券</view
              >
            </view> -->
            <view
              class="quanItem bgfff br10"
              v-for="(item, index) in dataList"
              :key="index"
              style="margin-bottom: 30rpx"
            >
              <view @click="lookCoupon(item)">
                <view class="flex jsb HuiNum">
                  <view class="flex mt10">
                    <text
                      :class="[
                        item.receivingStatus == 1 ? 'bgGray' : 'bgRed',
                        'typeTip',
                        'size24',
                        'br10',
                        'tac',
                      ]"
                      >{{ item.useSceneName }}</text
                    >
                    <text
                      :class="[
                        item.receivingStatus == 1 ? 'txtLighGray' : '',
                        'size32',
                        'ml10',
                        'leftOneLine',
                        'oneLine',
                        'fwb',
                      ]"
                      >{{ item.name || '' }}</text
                    >
                  </view>
                  <view
                    :class="[
                      item.receivingStatus == 1 ? 'txtLighGray' : 'mainRed',
                      'flex',
                    ]"
                    style="align-items: baseline"
                  >
                    <text class="fwb" style="font-size: 36rpx">¥</text>
                    <text class="fwb" style="font-size: 52rpx">{{
                      item.discountMoney
                    }}</text>
                  </view>
                </view>
                <view class="flex jsb alc mt10">
                  <view
                    :class="[
                      item.receivingStatus == 1 ? 'txtLighGray' : '',
                      'size24',
                    ]"
                    >{{ item.shopName }}</view
                  >
                  <view
                    :class="[
                      item.receivingStatus == 1 ? 'txtLighGray' : 'mainRed',
                      'size24',
                    ]"
                    >满{{ item.fullMoney }}元可用
                  </view>
                </view>
              </view>
              <view class="flex jsb alc expirationDate">
                <view class="size24 txtLighGray"
                  >有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}</view
                >
                <view v-if="item.receivingStatus == 1" class="quanbtn bgGray">
                  不可领取
                </view>
                <view
                  v-if="item.receivingStatus == 2"
                  class="quanbtn bgRed"
                  @click="receiveCoupon(item)"
                >
                  领取
                </view>
              </view>
            </view>
            <view
              v-for="(item, index) in dataList"
              :key="index"
              style="margin-top: 40rpx; display: none"
            >
              <view class="list-img">
                <view class="u-flex" style="align-items: center">
                  <view style="width: 182rpx; text-align: center">
                    <view class="card-left">
                      <text style="font-size: 32rpx">¥</text
                      ><text>{{ item.discountMoney }}</text>
                    </view>
                    <view style="font-size: 20rpx; margin-top: 10rpx">
                      满{{ item.fullMoney }}元可用
                    </view>
                  </view>
                  <view style="margin-top: -10rpx; margin-left: 40rpx">
                    <view class="card-name ellipsis" style="max-width: 350rpx">
                      {{ item.name }}
                    </view>
                    <view style="font-size: 20rpx; margin-top: 10rpx">
                      有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}
                    </view>
                  </view>
                </view>
                <view
                  v-if="item.receivingStatus == 1"
                  class="card-right"
                  style="
                    background-color: #f8f8f8;
                    color: #999999;
                    border: 1rpx solid #f8f8f8;
                  "
                >
                  不可领取
                </view>
                <view
                  v-if="item.receivingStatus == 2"
                  class="card-right"
                  style="
                    background-color: #ffffff;
                    border: 1rpx solid #d91b1b;
                    color: #d91b1b;
                  "
                  @click="receiveCoupon(item)"
                >
                  领取
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
      </view>
      <view v-else>
        <view
          class="quanItem bgfff br10"
          v-for="(item, index) in dataList"
          :key="index"
          style="margin-top: 30rpx"
          @click="receiveCoupon(item)"
        >
          <view class="flex jsb HuiNum">
            <view class="flex mt10">
              <text
                :class="[
                  item.status != 0 ? 'bgGray' : 'bgRed',
                  'typeTip',
                  'size24',
                  'br10',
                  'tac',
                ]"
                >{{ item.useSceneName }}</text
              >
              <text
                :class="[
                  item.status != 0 ? 'txtLighGray' : '',
                  'size32',
                  'ml10',
                  'leftOneLine',
                  'oneLine',
                ]"
                >{{ item.name || '' }}</text
              >
            </view>
            <view
              style="align-items: baseline"
              :class="[item.status != 0 ? 'txtLighGray' : 'mainRed', 'flex']"
            >
              <text class="fwb" style="font-size: 36rpx">¥</text>
              <text class="fwb" style="font-size: 52rpx">{{
                item.discountMoney
              }}</text>
            </view>
          </view>
          <view class="flex jsb alc mt10">
            <view :class="[item.status != 0 ? 'txtLighGray' : '', 'size24']">{{
              item.shopName
            }}</view>
            <view
              :class="[item.status != 0 ? 'txtLighGray' : 'mainRed', 'size24']"
              >满{{ item.fullMoney }}元可用
            </view>
          </view>
          <view class="flex jsb alc expirationDate">
            <view class="size24 txtLighGray"
              >有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}</view
            >
            <view v-if="item.status == 0" class="quanbtn bgRed"> 详情 </view>
            <view v-if="item.status == 1" class="quanbtn bgGray"> 已使用 </view>
            <view v-if="item.status == 2" class="quanbtn bgGray"> 已过期 </view>
          </view>
        </view>
      </view>
      <view v-if="currenttab == 2">
        <view
          class="quanItem bgfff br10"
          v-for="(item, index) in dataList"
          :key="index"
          style="margin-top: 30rpx"
        >
          <view class="u-flex jsb" style="align-items: center">
            <view style="width: 400rpx">
              <view class="size32 fwb oneLine">
                {{ item.ticketName }}
              </view>
              <view class="size24 txtLighGray" style="margin-top: 30rpx">
                市场价：{{ item.marketPrice }}
              </view>
              <view class="size24" style="margin-top: 30rpx">
                {{ item.baseName }}
              </view>
            </view>
            <view class="hexiao" @click="OnuseMaintainTicket(item)">
              核销
            </view>
          </view>
          <view v-if="item.status != 0" class="card-right">
            {{ item.statusMsg }}
          </view>
        </view>
        <view
          class="size24 txtLighGray tac"
          style="margin-top: 50rpx"
          @click="OnPushexpirecode"
          >查看已使用保养券>>
        </view>
      </view>
      <u-loading-icon
        text="正在加载..."
        textSize="14"
        :show="isLoadMore"
        style="padding: 15rpx 0"
      ></u-loading-icon>
      <view class="reachBottom" v-show="isReachBottom">我到底了~</view>
      <u-toast ref="uToast"></u-toast>
      <u-popup
        :safeAreaInsetBottom="false"
        :show="popshowhexiao"
        @close="popshowhexiao = false"
        mode="center"
      >
        <view class="pop">
          <view class="size28 fwb"> 请让店内客户经理输入核销密码完成核销 </view>
          <!-- 	<view style="width: 567rpx;margin: 93rpx auto;">
						<u--input placeholder="请输入核销密码" border="bottom" v-model="currentcode" clearable
							:disabled='true'></u--input>
					</view> -->
          <view
            class="tac fwb mt30"
            style="margin-bottom: -20rpx; font-size: 40rpx"
          >
            {{ currentcode }}
          </view>
          <u-divider :text="null"></u-divider>
          <view class="mainRed size24"> 请勿私自将核销码发给他人 </view>

          <view class="true-item" @click="Oncopy">复制</view>
        </view>
      </u-popup>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      currentcode: '',
      verificationPassword: '',
      shopId: '',
      orderid: '',
      popshowhexiao: false,
      isLoadMore: false,
      isReachBottom: false,
      current: '1',
      pageTotal: 1,
      currenttab: 1,
      type: '',
      statustype: 1,
      currentsutaustype: '1',
      dataList: [],
      data: {
        current: 1,
        size: 20,
        status: 0,
        type: 2,
      },
    };
  },
  onLoad(option) {
    // this.type = option.type
    // this.getList()
    this.OnClickTab(option.type);
  },
  onReachBottom() {
    if (this.data.current < this.pageTotal) {
      let type = '';
      if (this.currenttab == 1) {
        type = 2;
      } else {
        type = 1;
      }
      this.current++;
      this.data = {
        current: this.current,
        size: 20,
        status: this.statustype - 1,
        type: type,
      };
      if (this.currenttab == 1) {
        this.getList();
      } else {
        this.getMaintainTicket();
      }
    } else {
      this.isLoadMore = false;
      this.isReachBottom = true;
    }
    // if (!this.isLoadMore) {

    //   this.getList()
    // }
  },
  onShow() {},
  methods: {
    onReachScollBottom() {
      if (this.data.current < this.pageTotal) {
        this.data.current++;
        this.isLoadMore = true;
        this.isReachBottom = false;
        this.getList();
      } else {
        this.isLoadMore = false;
        this.isReachBottom = true;
      }
    },
    lookCoupon(item) {
      uni.navigateTo({
        url:
          '/pages/carShops/upkeep/couponDes?id=' +
          item.id +
          '&jumpType=quancenter',
      });
    },
    // ----------------------

    Oncopy() {
      let _this = this;
      uni.setClipboardData({
        data: _this.currentcode,
        success: function () {
          uni.$u.toast('复制成功');
        },
      });
    },
    OnPushexpirecode() {
      uni.navigateTo({
        url: '/pages/my/myorder/expirecode',
      });
    },

    OnuseMaintainTicket(item) {
      this.shopId = item.shopId;
      this.orderid = item.id;
      this.currentcode = item.code;
      this.popshowhexiao = true;
    },
    getList() {
      if (this.statustype === 4) {
        this.dataList = [];
        this.$request
          .post('/coc-active/api/v1/couponNew/ticket/center', this.data)
          .then((res) => {
            this.isReachBottom = false;
            this.pageTotal = res.data.pages;
            if (res.data.records.length) {
              res.data.records.filter((s) => {
                this.dataList.push(s);
              });
            }
            if (
              this.pageTotal == res.data.pages &&
              res.data.records.length <= this.data.size
            ) {
              this.isLoadMore = false;
            }
          });
      } else {
        this.$request
          .post('/coc-active/api/v1/couponNew/list', this.data)
          .then((res) => {
            // if (res.data.records.length < 20) {
            //   this.isLoadMore = true
            // }
            this.pageTotal = res.data.pages;
            this.isReachBottom = false;
            if (res.data.current == 1) {
              this.dataList = res.data.records;
            } else {
              res.data.records.filter((s) => {
                this.dataList.push(s);
              });
            }
            if (
              this.pageTotal == res.data.pages &&
              res.data.records.length <= this.data.size
            ) {
              this.isLoadMore = false;
            }
          });
      }
    },
    changestatustype(index) {
      let type = '';
      if (this.currenttab == 1) {
        type = 2;
      } else {
        type = 1;
      }
      this.data = {
        current: 1,
        size: 20,
        status: index - 1,
        type: type,
      };
      this.statustype = index;
      if (this.currenttab == 1) {
        this.getList();
      }
    },
    getMaintainTicket() {
      this.data.status = 0;
      this.$request
        .post('/coc-active/api/v1/my/getMaintainTicket', this.data)
        .then((res) => {
          this.pageTotal = res.data.pages;
          this.isReachBottom = false;
          if (res.data.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
          if (
            this.pageTotal == res.data.pages &&
            res.data.records.length <= this.data.size
          ) {
            this.isLoadMore = false;
          }
        });
    },
    OnClickTab(index) {
      let type = '';
      if (index == 1) {
        type = 2;
      } else {
        type = 1;
      }
      this.data = {
        current: 1,
        size: 20,
        status: 0,
        type: type,
      };
      this.statustype = 1;
      this.currenttab = index;

      if (this.currenttab == 1) {
        this.getList();
      } else {
        this.getMaintainTicket();
      }
    },
    receiveCoupon(item) {
      // 领券
      if (this.statustype === 4) {
        this.$request
          .post('/coc-active/api/v1/couponNew/userGetCouponFromTicketCenter', {
            couponNewId: item.id,
          })
          .then((res) => {
            if (res.code == 200) {
              uni.showToast({
                title: '领取成功，前往我的券包查看',
                icon: 'none',
                duration: 2000,
              });
              this.isLoadMore = true;
              this.data.current = 1;
              this.getList();
            } else {
              uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000,
              });
            }
          });
      } else {
        uni.navigateTo({
          url:
            '/pages/carShops/upkeep/couponDes?id=' +
            item.couponNewId +
            '&jumpType=myCoupon',
        });
      }
    },
  },
};
</script>

<style lang="scss">
.page {
  padding: 0rpx 25rpx 30rpx;
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
      width: 300rpx;
    }
  }

  .expirationDate {
    margin-top: 30rpx;
    padding-top: 20rpx;
    border-top: 1rpx dotted #999;
  }

  .quanbtn {
    width: 120rpx;
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
    color: #d91b1b;
  }

  .current-tab-right {
    color: #d91b1b;
  }

  .current-tab-left:before {
    content: '';
    position: absolute;
    top: 84rpx;
    left: 180rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #d91b1b;
  }

  .current-tab-right:before {
    content: '';
    position: absolute;
    top: 84rpx;
    left: 550rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #d91b1b;
  }
}

.status-type {
  margin-top: 20rpx;
  display: flex;
  justify-content: space-around;

  .type-item {
    width: 135rpx;
    height: 54rpx;
    background-color: #ffffff;
    text-align: center;
    font-size: 24rpx;
    line-height: 54rpx;
    border-radius: 10rpx;
  }

  .current-status-type {
    color: #ffffff;
    background-color: #d91b1b;
  }
}

.list-img {
  margin: 20rpx auto;
  width: 705rpx;
  height: 138rpx;
  background-image: url('@/pages/my/static/image/youhuiquan.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
}

.card-left {
  font-size: 42rpx;
  font-weight: bold;
  color: #d91b1b;
  margin-top: -10rpx;
}

.card-name {
  font-size: 28rpx;
  color: #d91b1b;
  font-weight: bold;
}

.card-right {
  width: 85rpx;
  height: 40rpx;
  line-height: 40rpx;
  border-radius: 10rpx;
  text-align: center;
  font-size: 20rpx;
  color: #ffffff;
  background-color: #999999;
  margin: auto 20rpx;
}

.reachBottom {
  text-align: center;
  margin-top: 20rpx;
}

.hexiao {
  width: 120rpx;
  height: 69rpx;
  background: #d91b1b;
  border-radius: 10rpx;
  text-align: center;
  line-height: 69rpx;
  color: #ffffff;
  font-size: 28rpx;
}

.pop {
  width: 710rpx;
  background-color: #f8f8f8;
  text-align: center;
  padding: 50rpx 100rpx 0rpx 100rpx;
}

.true-item {
  width: 300rpx;
  height: 82rpx;
  background: #d91b1b;
  border-radius: 40rpx;
  text-align: center;
  line-height: 82rpx;
  color: #ffffff;
  font-size: 32rpx;
  margin: 50rpx auto;
}

.bbbbbb {
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
      color: #d91b1b;
    }

    .current-tab-right {
      color: #d91b1b;
    }

    .current-tab-left:before {
      content: '';
      position: absolute;
      top: 84rpx;
      left: 180rpx;
      height: 6rpx;
      width: 30rpx;
      background-color: #d91b1b;
    }

    .current-tab-right:before {
      content: '';
      position: absolute;
      top: 84rpx;
      left: 550rpx;
      height: 6rpx;
      width: 30rpx;
      background-color: #d91b1b;
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
      background-color: #d91b1b;
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
}
</style>
