<template>
  <view class="page">
    <view class="card">
      <view class="u-flex jsb">
        <view class="fwb">订单编号</view>
        <view>{{ dataList.orderCode }}</view>
      </view>
      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb">
        <view class="fwb">套餐金额</view>
        <view>¥{{ dataList.setMealFlashSalePrice }}</view>
      </view>
      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb">
        <view class="fwb">可退份数</view>
        <view>{{ dataList.verificationNum }}</view>
      </view>
      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb">
        <view class="fwb">退款金额</view>
        <view class="size28 mainRed"
          >¥{{
            dataList.setMealFlashSalePrice * dataList.verificationNum
          }}</view
        >
      </view>
      <u-divider :text="null"></u-divider>
      <view class="u-flex jsb">
        <view class="fwb">退款方式</view>
        <view>原路返回（3个工作日内原路退回）</view>
      </view>
    </view>
    <view class="card">
      <view class="size24 fwb">退款原因:</view>
      <u-divider :text="null"></u-divider>
      <u-radio-group
        placement="column"
        activeColor="#D91B1B"
        v-model="refundReason"
      >
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="计划有变"
          shape="square"
          label="计划有变"
        ></u-radio>
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="没看清楚规则，有使用限制"
          shape="square"
          label="没看清楚规则，有使用限制"
        ></u-radio>
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="到店支付了团购价"
          shape="square"
          label="到店支付了团购价"
        ></u-radio>
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="线上商家活动更优惠"
          shape="square"
          label="线上商家活动更优惠"
        ></u-radio>
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="联系不上商家"
          shape="square"
          label="联系不上商家"
        ></u-radio>
        <u-radio
          :customStyle="{ marginBottom: '8px' }"
          name="商家营业但不接待"
          shape="square"
          label="商家营业但不接待"
        ></u-radio>
        <u-radio
          name="买多了/买错了"
          shape="square"
          label="买多了/买错了"
        ></u-radio>
      </u-radio-group>
    </view>
    <view class="btn-bottom">
      <text @click="OnRefund">申请退款</text>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      refundReason: '计划有变',
      dataList: {},
      id: 0,
    };
  },

  onLoad(option) {
    this.id = option.id;
    let _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('getinfo', function (data) {
      _this.dataList = data.data;
    });
    
  },
  onShow() {},
  methods: {
    OnRefund() {
      this.$request
        .post('/coc-active/api/v1/group_purchase/refund', {
          orderId: this.id,
          refundReason: this.refundReason,
        })
        .then((res) => {
          if (res.code == 200) {
            this.$refs.uToast.show({
              message: '退款申请中',
              type: 'default',
              complete() {
                uni.redirectTo({
                  url: '/pages/grouppurchase/order/list',
                });
              },
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
  background: #ffffff;
  border-radius: 10rpx;
  padding: 25rpx;
  font-size: 24rpx;
}
.btn-bottom {
  margin-top: 80rpx;
  text-align: center;
  margin-bottom: 60rpx;

  text {
    background-color: #d91b1b;
    border-radius: 10rpx;
    color: #ffffff;
    font-size: 28rpx;
    padding: 10rpx 40rpx;
  }
}
</style>
