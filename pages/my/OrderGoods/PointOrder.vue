<template>
  <view class="page">
    <div class="content">
      <view class="top">
        <view
          v-for="(item, index) in tabs"
          :key="index"
          class="tabs"
          @click="changetab(item.value)"
          :style="{
            background:
              item.value == searchField.orderStatus ? '#D91B1B' : '#F8F8F8',
            color:
              item.value == searchField.orderStatus ? '#FFFFFF' : '#222222',
          }"
        >
          {{ item.label }}
        </view>
      </view>
      <view v-if="tabs.length > 0" style="height: 30rpx"></view>
      <scroll-view
        class="bottom"
        scroll-y="true"
        @scrolltolower="onReachScollBottom"
        :style="{
          maxHeight: height,
          height: dataList.length > 0 ? '100%' : height,
        }"
      >
        <view class="list" v-if="dataList.length > 0">
          <view
            class="list_item"
            v-for="(item, i) in dataList"
            :key="i"
            @click="OnDetail(item)"
          >
            <view class="list_item_left">
              <image
                class="list_item_left_img"
                :src="item.scoreProductTitleImg"
              >
              </image>
            </view>
            <view class="list_item_right">
              <view class="list_item_right_top">
                <view style="display: flex; align-items: flex-start">
                  <text class="list_item_right_top_title">{{
                    item.scoreProductName
                  }}</text>
                </view>
                <view style="display: flex; align-items: flex-end">
                  <text class="list_item_right_top_count_suffix">X</text>
                  <text class="list_item_right_top_count">{{ item.num }}</text>
                </view>
              </view>
              <view class="list_item_right_middle">
                <text class="list_item_right_top_score">{{
                  item.scorePrice
                }}</text>
                <text class="list_item_right_top_score_suffix">积分</text>
              </view>
              <view class="list_item_right_bottom">
                <text class="list_item_right_top_time"
                  >兑换时间:{{ item.exchangeTime }}</text
                >
                <text class="list_item_right_top_status">
                  <text>{{ item.statusName }}</text>
                </text>
              </view>
            </view>
          </view>
          <!-- <view style="height: 30rpx;"></view> -->
        </view>
        <view v-else style="text-align: center; padding-top: 303rpx">
          <image
            style="width: 247rpx; height: 222rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20221130/9b1553f3d213427fa0aced53491a1ca5.png"
          >
          </image>
          <view style="font-size: 24rpx; color: #999999; margin-top: 30rpx"
            >暂无订单</view
          >
        </view>
      </scroll-view>
    </div>
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
          value: null,
        },
        {
          label: '待发货',
          value: 1,
        },
        {
          label: '已发货',
          value: 2,
        },
        {
          label: '待核销',
          value: 3,
        },
        {
          label: '已完成',
          value: 4,
        },
      ],
      searchField: {
        current: 1,
        size: 20,
        orderStatus: null,
      },
      isLoadMore: true,
    };
  },
  computed: {
    height() {
      return `calc(100vh - ${this.tabs.length > 0 ? 80 : 20}rpx - ${
        this.tabs.length > 0 ? 30 : 0
      }rpx)`;
    },
  },
  // onLoad(option) {
  //   //#ifdef H5
  //   if (option.token) {
  //     uni.setStorage({
  //       key: 'token',
  //       data: option.token,
  //     });
  //   }
  //   // #endif
  //   this.getList();
  // },
  // onShow
  mounted() {
    this.getList();
  },
  methods: {
    OnDetail(item) {
      uni.navigateTo({
        url: '/pages/my/myIntegralOrder/detail?orderid=' + item.scoreOrderId,
      });
    },
    //获取列表
    getList() {
      if (!this.isLoadMore) {
        return;
      }
      let msg = Object.assign({}, this.searchField);
      this.isLoadMore = false;
      this.$request
        .post('/coc-active/api/v2/score/shop/score/order/pageList', msg)
        .then((res) => {
          let list =
            res.data.records && res.data.records.length > 0
              ? res.data.records
              : [];
          if (msg.current == 1) {
            this.dataList = list;
          } else {
            list.map((data) => {
              this.dataList.push(data);
            });
          }
          if (list.length >= this.searchField.size) {
            this.isLoadMore = true;
          }
        });
    },
    //选择状态
    changetab(status) {
      this.searchField.orderStatus = status;
      this.isLoadMore = true;
      this.searchField.current = 1;
      this.dataList = [];
      this.getList();
    },
    //底部加载
    onReachScollBottom() {
      if (this.isLoadMore) {
        this.searchField.current++;
        this.getList();
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
  padding: 20rpx 0 0 0;
  background: #ffffff;
}

.top {
  display: flex;
  margin-left: 25rpx;
  // justify-content: space-around;
  // margin: 20rpx;

  .tabs {
    width: 160rpx;
    height: 60rpx;
    border-radius: 30rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 10rpx;
  }

  .currenttab {
    background-color: #d91b1b;
    color: #ffffff;
  }
}

.list {
  margin-left: 25rpx;
  margin-right: 25rpx;

  .list_item {
    padding: 30rpx 0 30rpx 0;
    display: flex;
    align-items: center;
    border-top: 1px solid #f8f8f8;
  }

  .list_item:first-child {
    border-top: 0;
    padding: 0 0 30rpx 0;
  }

  .list_item_left {
    width: 160rpx;
    height: 160rpx;
  }

  .list_item_left_img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 10rpx;
  }

  .list_item_right {
    width: 100%;
    margin-left: 13rpx;
  }

  .list_item_right_top_title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    max-width: 480rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden; //溢出内容隐藏
    text-overflow: ellipsis; //文本溢出部分用省略号表示
    display: -webkit-box; //特别显示模式
    -webkit-line-clamp: 2; //行数
    line-clamp: 2;
    -webkit-box-orient: vertical; //盒子中内容竖直排列
  }

  .list_item_right_top {
    display: flex;
    justify-content: space-between;
    // align-items: flex-end;
    height: 75rpx;
  }

  .list_item_right_top_count {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: bold;
    position: relative;
    bottom: -2px;
  }

  .list_item_right_top_count_suffix {
    font-size: 14rpx;
    font-family: PingFang SC;
    font-weight: bold;
  }

  .list_item_right_middle {
    font-family: PingFang SC;
    font-weight: bold;
    color: #d91b1b;
  }

  .list_item_right_top_score {
    font-size: 40rpx;
  }

  .list_item_right_top_score_suffix {
    font-size: 24rpx;
    margin-left: 7rpx;
  }

  .list_item_right_bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .list_item_right_top_time {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }

  .list_item_right_top_status {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #d91b1b;
  }
}
</style>
