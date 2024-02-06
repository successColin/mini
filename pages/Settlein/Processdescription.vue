<template>
  <view class="page">
    <!-- <view class="tabs">
      <view
        :class="{ 'current-tab-left': currenttab == 1 }"
        @click="OnClickTab(1)"
        class="tab-item"
        >企业入驻</view
      >
      <view
        :class="{ 'current-tab-right': currenttab == 2 }"
        @click="OnClickTab(2)"
        class="tab-item"
        >个体工商户认证</view
      >
    </view> -->
    <view class="tabs" v-if="currenttab == 2">
      <view
        :class="{ 'current-tab-left': settleType == 1 }"
        @click="OnClickTab(1)"
        class="tab-item"
      >
        线上入驻
      </view>
      <view
        :class="{ 'current-tab-right': settleType == 2 }"
        @click="OnClickTab(2)"
        class="tab-item"
      >
        纸质资料入驻
      </view>
    </view>
    <!-- 线下 -->
    <view class="item-img" v-if="currenttab == 1">
      <image
        v-if="settleType == 1"
        mode="widthFix"
        style="width: 600rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20221114/2b5babe477cc4f4492f2d84ea2a83a7b.png"
      >
      </image>
      <!-- 企业入驻 -->
      <image
        v-else-if="settleType == 2"
        mode="widthFix"
        style="width: 600rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697767304763.png"
      >
      </image>
    </view>
    <view class="item-img" v-else>
      <image
        v-if="settleType == 1"
        mode="widthFix"
        style="width: 600rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231101/file_1698817415710.png"
      >
      </image>
      <image
        v-else-if="settleType == 2"
        mode="widthFix"
        style="width: 600rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697767345746.png"
      >
      </image>
    </view>
    <view class="bottom-next">
      <text @click="OnNext">下一步</text>
    </view>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
export default {
  components: {},
  data() {
    return {
      currenttab: 1,
      sourceType: null,
      operateId: null,
      affiliationType: null,
      isLineLedger: null,
      settleType: '',
      type: '',
    };
  },
  computed: {
    // currenttab() {
    //   // isLineLedger 是否线上分账 1 是 0 否 (0是线下，1为线上)
    //   // currenttab 1是线下（企业），2是线上（个人）
    //   // return this.isLineLedger == 0 ? 1 : 2;
    //   return this.type;
    // },
  },
  onLoad(option) {
    if (tologin() !== true) {
      return;
    }
    if (option.type) {
      this.type = option.type;
      this.currenttab = option.type;
    }
    if (option.sourceType) {
      this.sourceType = option.sourceType;
    }
    if (option.operateId) {
      this.operateId = option.operateId;
    }
    if (option.operateId) {
      this.operateId = option.operateId;
    }
    if (option.affiliationType) {
      this.affiliationType = option.affiliationType;
    }
    if (option.isLineLedger) {
      this.isLineLedger = option.isLineLedger;
    }
    if (option.settleType) {
      this.settleType = option.settleType;
      this.isLineLedger = option.settleType == 2 ? 0 : 1; // 是否分账
    }
  },
  onShow() {},
  methods: {
    OnNext() {
      uni.navigateTo({
        url:
          '/pages/Settlein/dataDisplay?type=' +
          this.type +
          '&affiliationType=' +
          this.affiliationType +
          '&operateId=' +
          this.operateId +
          '&sourceType=' +
          this.sourceType +
          '&isLineLedger=' +
          this.isLineLedger +
          '&settleType=' +
          this.settleType,
      });
    },
    // 1: 2:
    OnClickTab(index) {
      this.isLineLedger = index === 1 ? 1 : 0;
      this.settleType = index;
    },
  },
};
</script>

<style lang="scss">
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

.item-img {
  text-align: center;
  margin-top: 40rpx;
}

.bottom-next {
  text-align: center;
  margin-top: 60rpx;

  text {
    display: inline-block;
    border-radius: 40rpx;
    width: 600rpx;
    height: 80rpx;
    background-color: #d91b1b;
    text-align: center;
    line-height: 80rpx;
    color: #ffffff;
    font-size: 34rpx;
    font-weight: 400;
  }
}
</style>
