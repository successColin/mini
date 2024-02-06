<template>
  <view class="page">
    <view v-for="(item, i) in dataList" :key="i" class="card">
      <image
        v-if="item.type === 2"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702539480153.png"
      >
      </image>
      <image
        v-else-if="item.type === 1"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702539492941.png"
      >
      </image>
      <image
        v-else
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702539504680.png"
      >
      </image>
      <view class="card__dec">
        <div>{{ item.typeMsg }}</div>
        <div>申请时间：{{ item.createdAt }}</div>
      </view>
      <view class="card__btn">{{
        item.status === 4
          ? '已办卡'
          : item.status === 5
          ? '已激活'
          : item.status === 6
          ? '办卡失败'
          : item.status === 2
          ? '审核中'
          : ''
      }}</view>
    </view>

    <view class="tac mt50" v-if="dataList.length === 0">
      <image
        style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
      >
      </image>
      <view class="txtDarkGray">暂无记录</view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dataList: [],
    };
  },

  onLoad() {},
  onShow() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .post('/coc-active/api/v1/cluesCreditCard/list', {
          size: 100,
          current: 1,
        })
        .then((res) => {
          console.log(res);
          this.dataList = res.data.records;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 20rpx 25rpx 0;
  padding: 20rpx 30rpx;
  display: flex;
  align-items: center;
  background: #ffffff;
  image {
    width: 88rpx;
    height: 88rpx;
  }
  &__dec {
    flex: 1;
    margin-left: 16rpx;
    div:nth-child(1) {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }
    div:nth-child(2) {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }
  &__btn {
    width: 100rpx;
    height: 40rpx;
    background: #ffeeee;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #d91b1b;
    text-align: center;
    line-height: 40rpx;
  }
}
</style>
