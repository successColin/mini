<template>
  <view class="page">
    <div class="content">
      <view class="top">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="tabs"
          @click="changetab(item.status)"
          :style="{
            background:
              item.status == searchField.status ? '#D91B1B' : '#FFFFFF',
            color: item.status == searchField.status ? '#FFFFFF' : '#222222',
          }"
        >
          {{ item.label }}
        </view>
      </view>
      <view style="height: 24rpx"></view>
      <view class="list" v-if="dataList.length > 0">
        <view
          class="list_item"
          v-for="(item, i) in dataList"
          @click="OnDetail(item)"
          :key="i"
        >
          <view class="list_item_top">
            <view class="flex alc jsb" style="width: 100%">
              <text class="list_item_top_orderno"
                >订单编号:{{ item.orderNo }}</text
              >
              <text class="list_item_top_status">{{
                getStatusType(item.status, item.isOverdue)
              }}</text>
            </view>
            <view class="list_item_top_line"></view>
          </view>
          <view class="list_item_top_bottom">
            <view class="flex alc" style="margin-top: 24rpx">
              <view style="height: 92rpx">
                <image class="list_item_top_bottom_img" :src="item.coverImage">
                </image>
              </view>
              <view
                class="moreLine list_item_top_bottom_title"
                style="height: 75rpx; margin-left: 14rpx"
              >
                {{ item.maintainName }}
              </view>
            </view>
            <view class="flex alc jsb" style="margin-top: 18rpx">
              <text class="list_item_top_bottom_shop"
                >门店：{{ item.baseName }}</text
              >
              <text class="list_item_top_bottom_price"
                >￥{{ item.price }}X{{ item.maintainNum }}</text
              >
            </view>
            <view class="flex alc jsb" style="height: 40rpx; margin-top: 5rpx">
              <text class="list_item_top_bottom_time"
                >下单日期：{{ item.orderTime }}</text
              >
              <view v-if="item.status === 0" class="list_item_top_bottom_btn1"
                >去付款</view
              >
            </view>
            <view class="flex alc jsb" style="height: 40rpx; margin-top: 12rpx">
              <text
                v-if="item.status == 1 || item.status == 2 || item.status == 3"
                class="list_item_top_bottom_time"
                >有效日期：{{ item.validityDay }}</text
              >
              <text v-else class="list_item_top_bottom_time"></text>
              <view
                v-if="item.status === 0"
                class="list_item_top_bottom_btn2"
                @click.stop="openCancel(item)"
                >取消</view
              >
              <view
                v-if="item.status === 1"
                class="list_item_top_bottom_btn1"
                :class="{ list_item_top_bottom_btn3: item.isOverdue == 1 }"
              >
                {{ item.isOverdue == 1 ? '申请退款' : '去使用' }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <u-loading-icon
        v-if="loadMore"
        mode="circle"
        size="20"
        duration="600"
      ></u-loading-icon>
      <view class="reachBottom" v-if="dataList.length > 0 && isReachBottom"
        >我到底啦~</view
      >
      <view
        v-if="dataList.length == 0 && isReachBottom"
        style="text-align: center; padding-top: 303rpx"
      >
        <view>
          <image
            style="width: 247rpx; height: 222rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20221130/9b1553f3d213427fa0aced53491a1ca5.png"
          >
          </image>
        </view>
        <view style="font-size: 24rpx; color: #999999; margin-top: 30rpx"
          >暂无订单</view
        >
      </view>
    </div>
    <u-popup
      :show="cancelVisble"
      mode="center"
      :safeAreaInsetBottom="false"
      round="16rpx"
    >
      <view class="cancel_view">
        <text class="text">请确认是否取消订单</text>
        <view
          class="flex alc jsc"
          style="margin-top: 36rpx; text-align: center"
        >
          <view class="btn1" @click="closeCancel">点错了</view>
          <view class="btn2" @click="submitCancel">确认取消</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      dataList: [],
      tabs: [
        {
          label: '全部',
          value: 0,
          status: -1,
        },
        {
          label: '待付款',
          value: 1,
          status: 0,
        },
        {
          label: '待核销',
          value: 2,
          status: 1,
        },
        {
          label: '已退款',
          value: 3,
          status: 4,
        },
      ],
      searchField: {
        current: 1,
        size: 10,
        status: -1,
      },
      loadMore: false, //加载更多
      isReachBottom: false, //没有更多
      cancelVisble: false,
      cancelOrderId: '',
    };
  },
  // onLoad(option) {
  //   let { status } = option;
  //   this.searchField.status = this.tabs.find((m) => m.value == status).status;
  //   this.getList();
  // },
  //
  mounted() {
    this.getList();
  },
  onReachBottom() {
    if (!this.isReachBottom && !this.loadMore) {
      this.searchField.current += 1;
      this.getList();
    }
  },
  methods: {
    OnDetail(item) {
      uni.navigateTo({
        url: '/pages/my/myUpkeepOrder/detail?id=' + item.orderId,
      });
    },
    //获取列表
    getList() {
      // this.dataList = []
      this.loadMore = true;
      let msg = Object.assign({}, this.searchField);
      if (msg.status == -1) {
        delete msg['status'];
      }
      this.$newrequest
        .post('/coc-active/api/v2/maintain_meal/orderList', msg)
        .then((res) => {
          if (res.code == 200) {
            if (msg.current === 1) {
              this.dataList = res.data.records;
            } else {
              res.data.records.forEach((m) => {
                this.dataList.push(m);
              });
            }
            if (res.data.records.length < msg.size) {
              this.isReachBottom = true;
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        })
        .finally(() => {
          this.loadMore = false;
        });
    },
    //选择状态
    changetab(status) {
      this.searchField.status = status;
      this.isReachBottom = false;
      this.loadMore = false;
      this.searchField.current = 1;
      this.getList();
    },
    //打开取消框
    openCancel(item) {
      this.cancelVisble = true;
      this.cancelOrderId = item.orderId;
    },
    //关闭取消框
    closeCancel() {
      this.cancelVisble = false;
      this.cancelOrderId = '';
    },
    //取消订单
    submitCancel() {
      this.$newrequest
        .get(
          '/coc-active/api/v2/maintain_meal/cancelOrder/' + this.cancelOrderId
        )
        .then((res) => {
          if (res.code == 200) {
            let index = this.dataList.findIndex(
              (m) => m.orderId === this.cancelOrderId
            );
            if (index >= 0) {
              uni.showToast({
                title: '取消成功',
              });
              this.closeCancel();
              this.dataList = [];
              this.isReachBottom = false;
              this.loadMore = false;
              this.searchField.current = 1;
              this.getList();
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    //获取状态枚举
    getStatusType(status, isOverdue) {
      if (status == 1 && isOverdue == 1) {
        return '已过期';
      } else {
        switch (status) {
          case 0:
            return '待付款';
          case 1:
            return '待核销';
          case 2:
            return '已完成';
          case 4:
            return '已退款';
          case 5:
            return '已取消';
          case 8:
            return '退款中';
          default:
            return '';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  color: #222222;
}

.content {
  padding: 28rpx 0 0 0;
}

.top {
  display: flex;
  margin: 0 25rpx;
  // justify-content: space-around;
  // margin: 20rpx;

  .tabs {
    width: 164rpx;
    height: 60rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 14rpx;
  }

  .tabs:last-child {
    margin-right: 0;
  }
}

.list {
  margin-left: 25rpx;
  margin-right: 25rpx;

  .list_item {
    padding: 28rpx 25rpx 25rpx 25rpx;
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 10rpx;
    margin-bottom: 24rpx;
    display: flex;
    flex-direction: column;
  }

  .list_item_top {
    width: 100%;
  }

  .list_item_top_orderno {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
  }

  .list_item_top_status {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #d91b1b;
  }

  .list_item_top_line {
    height: 1rpx;
    background: #000000;
    opacity: 0.2;
    margin-top: 28rpx;
  }

  .list_item_top_bottom {
    width: 100%;
  }

  .list_item_top_bottom_img {
    width: 92rpx;
    height: 92rpx;
    border-radius: 10rpx;
  }

  .list_item_top_bottom_title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
  }

  .list_item_top_bottom_shop {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }

  .list_item_top_bottom_price {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
  }

  .list_item_top_bottom_time {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }

  .list_item_top_bottom_btn1 {
    width: 100rpx;
    height: 40rpx;
    background: #d91b1b;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    text-align: center;
    line-height: 40rpx;
  }

  .list_item_top_bottom_btn2 {
    width: 100rpx;
    height: 40rpx;
    background: #f8f8f8;
    border-radius: 20rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    text-align: center;
    line-height: 40rpx;
  }

  .list_item_top_bottom_btn3 {
    width: 130rpx;
  }
}

.cancel_view {
  width: 700rpx;
  text-align: center;
  padding: 65rpx 0 49rpx 0;
  background: #ffffff;
  border-radius: 16rpx;

  .text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
  }

  .btn1 {
    width: 200rpx;
    height: 76rpx;
    background: #f8f8f8;
    border-radius: 38rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    text-align: center;
    line-height: 76rpx;
  }

  .btn2 {
    width: 200rpx;
    height: 76rpx;
    background: #d91b1b;
    border-radius: 38rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    margin-left: 71rpx;
    text-align: center;
    line-height: 76rpx;
  }
}

.reachBottom {
  text-align: center;
  font-size: 24rox;
  color: #999999;
  padding: 20rpx;
  font-size: 24rpx;
  color: #999999;
}
</style>
