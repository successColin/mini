<template>
  <view class="page">
    <view class="tabs">
      <view
        :class="{ 'current-tab-left': type == 1 }"
        @click="OnClickTab(1)"
        class="tab-item"
        >收藏活动</view
      >
      <view
        :class="{ 'current-tab-right': type == 5 }"
        @click="OnClickTab(5)"
        class="tab-item"
        >收藏拼团</view
      >
    </view>
    <view v-if="type == 1">
      <view v-if="dataList.length > 0">
        <view
          class="card"
          v-for="(item, index) in dataList"
          :key="index"
          @click="OnPushDetail(item)"
        >
          <view class="u-flex">
            <view>
              <u-avatar shape="square" :src="item.coverPicture"> </u-avatar>
            </view>
            <view style="margin-left: 20rpx">
              <view class="title">
                {{ item.title }}
              </view>
              <view class="u-flex from">
                <view>
                  {{ item.shopName }}
                </view>
                <view class="fromTip" v-if="item.shopTypeId == 4">
                  <image
                    style="
                      width: 104rpx;
                      height: 28rpx;
                      margin-left: 20rpx;
                      margin-top: 6rpx;
                      margin-top: 8rpx;
                    "
                    mode="heightFix"
                    src="@/static/image/rendarenzheng.png"
                  />
                </view>
                <view class="fromTip" v-else-if="item.shopTypeId == 1">
                  <image
                    src="@/static/image/guan.png"
                    style="width: 29rpx; height: 29rpx"
                  ></image>
                  <view
                    style="
                      font-size: 24rpx;
                      margin-top: -4rpx;
                      color: #d91b1b;
                      margin-left: 20rpx;
                    "
                  >
                    官方
                  </view>
                </view>
                <view class="fromTip" v-else-if="item.shopTypeId == 2">
                  <image
                    src="@/static/image/4Sdian.png"
                    style="width: 29rpx; height: 29rpx"
                  ></image>
                  <view
                    style="
                      font-size: 24rpx;
                      margin-top: -4rpx;
                      color: #d91b1b;
                      margin-left: 20rpx;
                    "
                  >
                    4S店
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view style="10" class="rightBox">
            <view class="price">
              <view v-if="item.payType == 2"
                >¥{{ item.flashSalePrice }}/人</view
              >
              <view v-else>免费</view>
            </view>
            <view class="activitystatus" v-if="item.activityStatus == 2">
              已下架
            </view>
          </view>
        </view>
      </view>
      <view v-else style="text-align: center; margin-top: 300rpx">
        <image
          style="width: 269rpx; height: 232rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221130/7734996e1ed14322a9f3336976ff2136.png"
        >
        </image>
        <view style="font-size: 24rpx; color: #999999; margin-top: 80rpx">
          暂无活动
        </view>
      </view>
    </view>
    <view v-else>
      <view v-if="dataList.length > 0">
        <view
          class="card"
          v-for="(item, index) in dataList"
          :key="index"
          @click="OnPushtuangou(item)"
        >
          <view class="u-flex">
            <view>
              <u-avatar shape="square" :src="item.coverPicture"> </u-avatar>
            </view>
            <view style="margin-left: 20rpx">
              <view class="title">
                {{ item.title }}
              </view>
              <view class="u-flex from">
                <view>
                  {{ item.shopName || '' }}
                </view>
                <view class="fromTip" v-if="item.shopTypeId == 4">
                  <image
                    style="
                      width: 104rpx;
                      height: 28rpx;
                      margin-left: 20rpx;
                      margin-top: 6rpx;
                      margin-top: 8rpx;
                    "
                    mode="heightFix"
                    src="@/static/image/rendarenzheng.png"
                  />
                </view>
                <view class="fromTip" v-else-if="item.shopTypeId == 1">
                  <image
                    src="@/static/image/guan.png"
                    style="width: 29rpx; height: 29rpx"
                  ></image>
                  <view
                    style="
                      font-size: 24rpx;
                      margin-top: -4rpx;
                      color: #d91b1b;
                      margin-left: 20rpx;
                    "
                  >
                    官方
                  </view>
                </view>
                <view class="fromTip" v-else-if="item.shopTypeId == 2">
                  <image
                    src="@/static/image/4Sdian.png"
                    style="width: 29rpx; height: 29rpx"
                  ></image>
                  <view
                    style="
                      font-size: 24rpx;
                      margin-top: -4rpx;
                      color: #d91b1b;
                      margin-left: 20rpx;
                    "
                  >
                    4S店
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view v-else style="text-align: center; margin-top: 300rpx">
        <image
          style="width: 269rpx; height: 232rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221130/7734996e1ed14322a9f3336976ff2136.png"
        >
        </image>
        <view style="font-size: 24rpx; color: #999999; margin-top: 80rpx">
          暂无数据
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      isLoadMore: false,
      current: 1,
      dataList: [],
      type: 1,
    };
  },

  onLoad(option) {
    this.getList();
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.current++;
      this.getList();
    }
  },
  onShow() {},
  methods: {
    OnPushtuangou(item) {
      if (item.type == 0) {
        uni.navigateTo({
          url: '/pages/grouppurchase/newpeople/detail?id=' + item.relId,
        });
      } else if (item.type == 5) {
        uni.navigateTo({
          url: '/pages/groupBooking/detail?id=' + item.relId,
        });
      } else {
        uni.navigateTo({
          url: '/pages/grouppurchase/detail?id=' + item.relId,
        });
      }
    },
    OnClickTab(index) {
      this.current = 1;
      this.type = index;
      this.dataList = [];
      this.getList();
    },
    OnPushDetail(item) {
      uni.navigateTo({
        url: '/pages/home/activityDetail/index?id=' + item.relId,
      });
    },
    getList() {
      this.$request
        .post('/coc-my/api/v1/my/user/collections/activity/list', {
          current: this.current,
          size: 20,
          type: this.type,
        })
        .then((res) => {
          if (res.data.records.length < 20) {
            this.isLoadMore = true;
          }
          if (res.data.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
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

.card {
  background-color: #ffffff;
  border-radius: 12rpx;
  margin: 20rpx;
  padding: 20rpx;
  display: flex;
  justify-content: space-between;

  .title {
    font-weight: bold;
    font-size: 32rpx;
    width: 450rpx;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .from {
    font-size: 28rpx;
    margin-top: 10rpx;
    align-items: center;
  }

  .fromTip {
    margin-left: 10rpx;
    display: flex;
    text-align: center;
    margin-top: 6rpx;
  }

  .activitystatus {
    width: 100rpx;
    font-size: 24rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    line-height: 40rpx;
    text-align: center;
  }

  .price {
    color: #d91b1b;
    font-size: 28rpx;
    font-weight: bold;
    float: right;
    text-align: right;
  }

  .status {
    background-color: #d91b1b;
    border-radius: 10rpx;
    padding: 0rpx 20rpx;
    color: #ffffff;
    font-size: 24rpx;
    margin-top: 116rpx;
  }

  .rightBox {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}

.tabs {
  height: 100rpx;
  background: #ffffff;
  display: flex;
  justify-content: space-around;

  .tab-item {
    font-size: 28rpx;
    font-weight: bold;
    line-height: 100rpx;
  }

  .current-tab-left {
    color: #d91b1b;
    // border-bottom: 6rpx #D91B1B solid;
  }

  .current-tab-right {
    color: #d91b1b;
    // border-bottom: 6rpx #D91B1B solid;
  }

  .current-tab-left:before {
    content: '';
    position: absolute;
    top: 94rpx;
    left: 150rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #d91b1b;
  }

  .current-tab-right:before {
    content: '';
    position: absolute;
    top: 94rpx;
    left: 540rpx;
    height: 6rpx;
    width: 30rpx;
    background-color: #d91b1b;
  }
}
</style>
