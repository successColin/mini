<template>
  <div class="welfarePooling">
    <u-sticky offsetTop="88rpx" bgColor="#F8F8F8">
      <view style="width: 100%; overflow: auto" class="welfarePooling__tabs">
        <u-tabs
          keyName="name"
          lineHeight="0"
          :inactiveStyle="{
            width: '132rpx',
            height: '54rpx',
            background: '#FFFFFF',
            borderRadius: '1000rpx',
            fontSize: '24rpx',
            fontFamily: 'PingFang SC, PingFang SC',
            fontWeight: 500,
            color: '#222222',
            textAlign: 'center',
            lineHeight: '54rpx',
          }"
          :activeStyle="{
            width: '132rpx',
            height: '54rpx',
            background: '#D91B1B',
            borderRadius: '1000rpx',
            fontSize: '24rpx',
            fontFamily: 'PingFang SC, PingFang SC',
            fontWeight: 500,
            color: '#FFFFFF',
            textAlign: 'center',
            lineHeight: '54rpx',
          }"
          :list="tablist"
          :current="current"
          @click="handleTabs"
        ></u-tabs>
      </view>
    </u-sticky>
    <div v-if="listArr.length > 0">
      <div
        v-for="(item, index) in listArr"
        :key="index"
        class="list"
        @click="handleGoPay(item)"
      >
        <div class="list__kanban">
          <template v-if="pingtuanState(item) === 1">
            <div>{{ item.depositOrderCount }}人已拼</div>
            <div>
              再满{{
                ladderPriceObj(item).groupTeamNum - item.depositOrderCount
              }}人成团，享￥{{ ladderPriceObj(item).flashSalePrice }}
            </div>
          </template>
          <template v-else-if="pingtuanState(item) === 2">
            <div>拼团成功</div>
            <div>享￥{{ currentPriceObj(item).flashSalePrice }}</div>
          </template>
          <template v-else-if="pingtuanState(item) === 3">
            <div>拼团失败</div>
          </template>
          <template v-else>
            <div>未知状态</div>
          </template>
        </div>
        <div class="list__dec">
          <image :src="item.coverPicture"> </image>
          <div class="list__dec--center">
            <div>
              {{ item.title }}
            </div>
            <div
              v-if="
                item.productStatus === 2 &&
                getbunchingTime(item.signUpEndTime) > 0
              "
            >
              <div>订金</div>
              ￥{{ item.depositPrice }} x {{ item.groupTeamSetMealNum }}
            </div>
            <div v-else>
              ￥{{ currentPriceObj(item).flashSalePrice || item.marketPrice }} x
              {{ item.groupTeamSetMealNum }}
            </div>
            <div>下单时间:{{ item.createdAt }}</div>
            <div>有效时间:{{ item.expirationTime }}</div>
          </div>
          <div class="list__dec--right list__count--down">
            <div>
              {{
                (item.productStatus === 2 &&
                  item.status === 8 &&
                  item.teamworkStatus === 1) ||
                (item.productStatus === 3 &&
                  item.status === 8 &&
                  item.teamworkStatus === 1)
                  ? '退款申请中'
                  : item.teamworkStatus === 1
                  ? '拼团失败'
                  : item.status === 13 &&
                    item.productStatus === 2 &&
                    item.teamworkStatus === 0
                  ? '待成团'
                  : (item.status === 13 && item.productStatus === 3) ||
                    (item.status === 13 &&
                      item.productStatus === 2 &&
                      item.teamworkStatus === 2)
                  ? '已成团'
                  : item.statusMsg || ''
              }}
            </div>
            <u-count-down
              v-if="
                getcountdown(item.createdAt) > 0 &&
                !item.iscountdown &&
                item.status === 0
              "
              :time="getcountdown(item.createdAt)"
              format="mm:ss"
              @finish="setcountdown(item, index)"
            >
            </u-count-down>

            <u-count-down
              v-if="
                getbunchingTime(item.signUpEndTime) > 0 &&
                !item.ispanic &&
                item.status === 13
              "
              :time="getbunchingTime(item.signUpEndTime)"
              format="DD天 HH:mm:ss"
              @finish="setbunchingTime(item, index)"
            >
            </u-count-down>
          </div>
        </div>
        <div class="list__btn">
          <!-- `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '
            //订单状态：0-待付款；1-已支付；2-已完成；3-已评价；4-已退款；
            5-已取消；6-支付失败；7-付款中；8-退款申请中；12-部分退款；13-定金已支付；', -->
          <div
            class="list__btn--cancel"
            v-if="item.status === 0"
            @click.stop="handleCancel(item, index)"
          >
            取消
          </div>
          <div class="list__btn--toPay" v-if="item.status === 0">去付款</div>
          <!-- @click.stop="handleShare(item)"
          open-type="share" -->
          <button
            class="list__btn--invite"
            v-if="
              item.productStatus === 2 &&
              item.status === 13 &&
              item.teamworkStatus !== 1
            "
            style=""
          >
            邀请好友拼团
          </button>
          <div
            class="list__btn--finally"
            v-if="
              item.status === 13 &&
              item.productStatus === 3 &&
              item.teamworkStatus !== 1
            "
          >
            支付尾款
          </div>
          <!-- <div
            class="list__btn--refund"
            v-if="
              (item.status === 1 && item.productStatus === 3) ||
              (item.status === 1 && item.productStatus === 2)
            "
            @click.stop="Ondrawback(item)"
          >
            申请退款
          </div> -->
          <div
            class="list__btn--refund"
            v-if="item.status === 1 && item.productStatus === 3"
          >
            查看券码
          </div>
          <div class="list__btn--refund" v-if="item.status === 2">查看订单</div>
        </div>
      </div>
      <view class="reachBottom" v-show="!isLoadMore">我到底了~</view>
    </div>
    <view v-else style="text-align: center; margin-top: 303rpx">
      <image
        style="width: 247rpx; height: 222rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20221130/9b1553f3d213427fa0aced53491a1ca5.png"
      >
      </image>
      <view style="font-size: 24rpx; color: #999999; margin-top: 30rpx"
        >暂无订单</view
      >
    </view>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  data() {
    return {
      itemObj: {},
      current: 0,
      tablist: [
        // 0-待付款；1-已支付；2-已完成；3-已评价；4-已退款；
        // 5-已取消；6-支付失败；7-付款中；8-退款申请中；12-部分退款；
        // 13-定金已支付；',
        { name: '全部', key: '' },
        { name: '待付款', key: 0 },
        { name: '待成团', key: 14 },
        { name: '待核销', key: 1 },
        { name: '已核销', key: 2 },
        { name: '退款中', key: 8 },
        { name: '已退款', key: 4 },
        { name: '已取消', key: 5 },
      ],
      listArr: [],
      params: {
        current: 1,
        size: 10,
        status: '',
      },
      total: 0,
      isLoadMore: true,
      isShowCountDown: true,
    };
  },
  components: {},
  computed: {
    ladderPriceObj() {
      return function (item) {
        const arr = item.groupTeamSetMealPriceList || [];
        let obj = '';
        obj = arr.find((v) => v.groupTeamNum > item.depositOrderCount);
        if (!obj && item.groupTeamSetMealPriceList?.length !== 0) {
          obj =
            item.groupTeamSetMealPriceList[
              item.groupTeamSetMealPriceList?.length - 1
            ];
          obj.isEndladder = true;
        }
        return obj;
      };
    },
    currentPriceObj() {
      return function (item) {
        const arr = item.groupTeamSetMealPriceList || [];
        let obj = '';
        // obj = arr.find((v) => v.groupTeamNum <= item.depositOrderCount);
        arr.forEach((v, i) => {
          if (arr[i + 1]) {
            if (
              v.groupTeamNum <= item.depositOrderCount &&
              arr[i + 1].groupTeamNum > item.depositOrderCount
            ) {
              obj = v;
            }
          }
        });
        if (!obj) {
          obj = arr[arr.length - 1];
        }
        return obj;
      };
    },
    getcountdown() {
      return function (time) {
        return (
          dayjs(time).add(5, 'minute').toDate().getTime() - new Date().getTime()
        );
      };
    },
    getbunchingTime() {
      return function (time) {
        console.log(dayjs(time).toDate().getTime(), new Date().getTime());
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
      return function (item) {
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
            !this.ladderPriceObj(item)?.isEndladder) ||
          (item.productStatus === 2 &&
            item.status === 13 &&
            this.getbunchingTime(item.signUpEndTime) > 0 &&
            !this.ladderPriceObj(item)?.isEndladder)
        ) {
          return 1;
        }
        if (
          // this.ladderPriceObj(item)?.isEndladder  && this.getbunchingTime > 0 ||
          (item.productStatus === 2 &&
            item.status === 0 &&
            this.ladderPriceObj(item)?.isEndladder) ||
          (item.productStatus === 2 &&
            item.status === 13 &&
            this.getbunchingTime(item.signUpEndTime) > 0 &&
            this.ladderPriceObj(item)?.isEndladder) ||
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
      };
    },
  },
  watch: {},
  // 分享
  onShareAppMessage(res) {
    console.log(res);
    return {
      title: this.itemObj.title,
      imageUrl: this.itemObj.coverPicture,
      path: `/pages/groupBooking/detail?id=${this.itemObj.groupTeamProductId}`,
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
  // onPullDownRefresh() {
  //   setTimeout(() => {
  //     uni.stopPullDownRefresh();
  //   }, 1000);
  // },
  mounted() {
    this.isLoadMore = true;
    this.params.current = 1;
    this.getList();

    uni.$on('onReachBottom', () => {
      console.log('进来了');
      if (this.isLoadMore) {
        this.params.current += 1;
        this.getList();
      }
    });
    uni.$on('onRefresh', () => {
      this.isLoadMore = true;
      this.params.current = 1;
      this.listArr = [];
      this.getList();
    });
  },
  methods: {
    handleShare(item) {
      this.itemObj = item;
    },
    // Ondrawback(item) {
    //   let _this = this;
    //   uni.navigateTo({
    //     url: '/pages/grouppurchase/order/drawbackindex?id=' + item.orderId,
    //     success: function (res) {
    //       uni.$emit('getInfo', {
    //         data: item,
    //         ladderPriceObj: _this.ladderPriceObj(item),
    //       });
    //     },
    //   });
    // },
    async handleCancel(item, i) {
      const { code, message } = await this.$request.get(
        `/coc-active/api/v1/groupTeamPurchase/cancelOrder/${item.orderId}`
      );
      if (code === 200) {
        item.status = 5;
        item.statusMsg = '已取消';
        item.iscountdown = true;
        this.$set(this.listArr, i, item);
        uni.showToast({
          title: '取消成功',
          icon: 'none',
        });
      } else {
        uni.showToast({
          title: message,
          icon: 'none',
        });
      }
    },
    handleGoPay(item) {
      uni.navigateTo({
        url: `/pages/groupBooking/orderDetails?id=${item.orderId}`,
      });
    },
    setcountdown(item, i) {
      item.iscountdown = true;
      item.status = 5;
      item.statusMsg = '已取消';
      this.$set(this.listArr, i, item);
    },
    async setbunchingTime(item, i) {
      item.ispanic = true;
      const { data } = await this.$request.post(
        '/coc-active/api/v1/groupTeamPurchase/orderDetail',
        {
          orderId: item.orderId,
        }
      );
      if (
        data.depositOrderCount >=
        (item.groupTeamSetMealPriceList[0] &&
          item.groupTeamSetMealPriceList[0].groupTeamNum)
      ) {
        item.productStatus = 3;
        // item.statusMsg = '已成团';
      } else {
        item.teamworkStatus = 1;
        item.status = 8;
        // item.statusMsg = '拼团失败';
      }

      this.$set(this.listArr, i, item);
    },
    handleTabs(v) {
      console.log(v);
      this.isLoadMore = true;
      this.params.current = 1;
      this.params.status = v.key;
      this.listArr = [];
      this.getList();
    },
    async getList() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/groupTeamPurchase/orderList',
        this.params
      );
      const { records, current, size, total } = data;
      this.total = total;
      console.log(records.length, size);
      if (records.length !== size) {
        this.isLoadMore = false;
      }
      if (current === 1) {
        this.listArr = records;
      } else {
        this.listArr.push(...records);
      }
    },
  },
  destroyed() {
    uni.$off('onReachBottom');
  },
};
</script>
<style lang='scss' scoped>
.list {
  margin: 10rpx 10rpx 0;
  position: relative;
  &__kanban {
    height: 76rpx;
    background: rgba(217, 27, 27, 0.08);
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    display: flex;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #d91b1b;
    & > div:nth-child(1) {
      padding: 8rpx 20rpx;
      background: linear-gradient(180deg, #d91b1b 0%, #fd5050 100%);
      border-radius: 1000rpx;
      color: #ffffff;
      margin: 0 10rpx;
    }
    & > div {
      margin-bottom: 10rpx !important;
    }
  }
  &__dec {
    display: flex;
    padding: 20rpx;
    background: #ffffff;
    border-radius: 10rpx;
    position: relative;
    top: -10rpx;
    image {
      width: 92rpx;
      height: 92rpx;
      border-radius: 10rpx;
    }
    &--center {
      flex: 1;
      font-family: PingFang SC, PingFang SC;
      font-size: 24rpx;
      font-weight: 500;
      margin-left: 10rpx;
      & > div:nth-child(1) {
        color: #000000;
      }
      & > div:nth-child(2) {
        color: #d91b1b;
        display: flex;
      }
      & > div:nth-child(3),
      & > div:nth-child(4) {
        font-size: 20rpx;
        color: #999999;
      }
      & > div:nth-child(2),
      & > div:nth-child(3),
      & > div:nth-child(4) {
        margin-top: 10rpx;
      }
    }
    &--right {
      width: 134rpx;
      text-align: right;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      line-height: 28rpx;
      & > div:nth-child(2) {
        color: #999999;
        margin-top: 10rpx;
      }
    }
  }
  &__btn {
    position: absolute;
    right: 10rpx;
    bottom: 30rpx;
    display: flex;
    & > div,
    & > button {
      padding: 0 20rpx;
      height: 42rpx;
      border-radius: 100rpx;
      display: flex;
      text-align: center;
      align-items: center;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #ffffff;
      // line-height: 42rpx;
      margin-left: 12rpx;
    }
    &--cancel {
      background: #999999;
    }
    &--toPay,
    &--invite,
    &--finally,
    &--refund {
      background: #d91b1b;
    }
  }
}
.list:nth-child(1) {
  margin-top: 0 !important;
}
.reachBottom {
  font-size: 12px;
  color: #999999;
  text-align: center;
  padding: 10px 20px 30px;
}
</style>
