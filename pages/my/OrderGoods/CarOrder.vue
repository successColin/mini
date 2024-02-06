<template>
  <view class="page">
    <no-data v-if="dataList.length === 0"></no-data>
    <view v-else>
      <view v-for="item in dataList" :key="item.orderCode">
        <view class="card">
          <view>
            <view class="size28 fwb">{{ item.shopName }}</view>
            <view class="size24 mt20">{{ item.chexingName }}</view>
            <view class="size24 mt20"
              >订金<text class="mainRed">{{ item.deposit }}元</text
              >到店立减<text class="mainRed"
                >{{ item.depositReduction }}元</text
              ></view
            >
            <view
              class="size20 txtLighGray mt20"
              v-if="item.status == 1 || item.status == 2 || item.status == 4"
            >
              支付时间{{ item.payTime }}
            </view>
            <view class="size20 txtLighGray mt20" v-if="item.status == 2">
              核销时间{{ item.verificationTime }}
            </view>
            <view class="size20 txtLighGray mt20" v-if="item.status == 4">
              退款时间{{ item.refundTime }}
            </view>
          </view>
          <view class="size24 mainRed fwb" style="width: 100rpx">
            {{ item.statusMsg }}
          </view>
          <view v-if="item.status == 1" class="watchimg" @click="Onwatch(item)">
            查看凭证
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import NoData from '@/components/samllTool/NoData.vue';

export default {
  components: { NoData },
  data() {
    return {
      current: 1,
      isLoadMore: false,
      dataList: [],
    };
  },

  // onLoad
  mounted() {
    this.getList();
  },
  onShow() {},
  onReachBottom() {
    if (!this.isLoadMore) {
      this.current++;
      this.getList();
    }
  },
  methods: {
    Onwatch(item) {
      uni.navigateTo({
        url: '/pages/my/mycarorder/detail',
        success: function (res) {
          res.eventChannel.emit('getinfo', {
            data: item,
          });
        },
      });
    },
    getList() {
      this.$request
        .post('/coc-active/api/v1/deposit/order/list', {
          current: this.current,
          size: 20,
        })
        .then((res) => {
          if (res.data.records.length < 20) {
            this.isLoadMore = true;
          }
          if (this.current == 1) {
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
  margin: 25rpx;
  background-color: #ffffff;
  padding: 30rpx 28rpx;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.watchimg {
  position: absolute;
  bottom: 30rpx;
  right: 28rpx;
  width: 116rpx;
  height: 47rpx;
  line-height: 47rpx;
  background-color: #d91b1b;
  border-radius: 24rpx;
  text-align: center;
  color: #ffffff;
  font-size: 24rpx;
}
</style>