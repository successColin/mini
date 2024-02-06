<template>
  <view class="page">
    <view
      v-for="(item, index) in dataList"
      :key="index"
      class="card"
      @click="OnPushDetail(item)"
    >
      <view class="u-flex jsb">
        <view class="u-flex">
          <view>
            <image
              style="width: 32rpx; height: 32rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697008307662.png"
            ></image>
          </view>
          <view class="ml10 size24 cblack">{{ item.vehicleName }}</view>
          <view class="ml10 size24 cblack">{{ item.plate }}</view>
        </view>
        <view
          class="mainRed size24"
          :class="{ txtLighGray: item.status == 6 }"
          >{{ item.statusMsg }}</view
        >
      </view>
      <view class="mt10 u-flex">
        <view>
          <image
            style="width: 32rpx; height: 32rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697008644592.png"
          ></image>
        </view>
        <view class="ml10 size24 cblack">{{ item.arrivalDateTime }}</view>
      </view>
      <view class="mt10 u-flex jsb alc">
        <view class="u-flex">
          <view>
            <image
              style="width: 32rpx; height: 32rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697009875490.png"
            ></image>
          </view>
          <view class="ml10 size24 cblack">{{ item.baseName }}</view>
        </view>
        <view
          class="closeorder"
          v-if="item.status == 1"
          @click.stop="Oncloseorder(item)"
        >
          取消
        </view>
      </view>
    </view>
    <no-data v-if="dataList.length === 0"></no-data>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="showpop"
      @close="showpop = false"
      mode="center"
    >
      <view
        class="tac"
        style="width: 400rpx; padding: 60rpx 130rpx 60rpx 130rpx"
      >
        <view class="size24">请确认是否取消预约，</view>
        <view class="size24">取消后如有需要请重新下单！</view>
      </view>
      <view class="u-flex jsc" style="margin-bottom: 60rpx">
        <view class="left-btn" @click="showpop = false">点错了</view>
        <view class="right-btn" @click="Ontrue">确认取消</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import NoData from '@/components/samllTool/NoData.vue';

export default {
  components: {NoData},
  data() {
    return {
      showpop: false,
      orderid: '',
      isLoadMore: false,
      current: 1,
      dataList: [],
    };
  },

  onLoad() {},
  onReachBottom() {
    if (!this.isLoadMore) {
      this.current++;
      this.getList();
    }
  },
  // onShow
  mounted() {
    this.getList();
  },
  methods: {
    OnPushDetail(item) {
      uni.navigateTo({
        url: '/pages/upkeep/orderdetail?id=' + item.maintenanceAppointmentId,
      });
    },
    Ontrue() {
      this.$request
        .post('/coc-active/api/v1/maintenance_appointment/updateStatus', {
          maintenanceAppointmentId: this.orderid,
          status: 6,
        })
        .then((res) => {
          if (res.code == 200) {
            uni.$u.toast('取消订单成功');
            this.getList();
            this.showpop = false;
          } else {
            uni.$u.toast(res.message);
          }
        });
    },
    Oncloseorder(item) {
      this.orderid = item.maintenanceAppointmentId;
      this.showpop = true;
    },
    getList() {
      this.$request
        .post('/coc-active/api/v1/maintenance_appointment/list', {
          current: this.current,
          size: 20,
        })
        .then((res) => {
          if (res.data.length < 20) {
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
  border-radius: 16rpx;
  padding: 24rpx;
  background: #ffffff;
  margin: 24rpx;
}

.cblack {
  color: #3d3d3d;
}

.closeorder {
  width: 88rpx;
  height: 48rpx;
  line-height: 48rpx;
  border-radius: 160rpx;
  text-align: center;
  border: 2rpx solid #999999;
  font-size: 24rpx;
  color: #999999;
}
.left-btn {
  width: 200rpx;
  height: 64rpx;
  text-align: center;
  line-height: 64rpx;
  background-color: #e8e8e8;
  font-size: 24rpx;
  border-radius: 160rpx;
}
.right-btn {
  width: 200rpx;
  height: 64rpx;
  text-align: center;
  line-height: 64rpx;
  background-color: #d91b1b;
  font-size: 24rpx;
  border-radius: 160rpx;
  color: #ffffff;
  margin-left: 40rpx;
}
</style>