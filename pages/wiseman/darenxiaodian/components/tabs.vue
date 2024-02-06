<template>
  <view class="tabs">
    <scroll-view v-if="scroll" class="tabs-scroll" scroll-x="true">
      <view
        v-for="(v, i) in list"
        :key="i"
        class="tabs-item"
        @click="setList(v)"
      >
        <view class="tabs-item-view">
          <view :class="v.status ? 'tabs-item-title2' : 'tabs-item-title'">{{
            v.name
          }}</view>
          <view v-if="v.status" class="tabs-line">
            <view class="tabs-item-line" :class="type === 1 ? 'typeOne' : ''" />
          </view>
        </view>
      </view>
    </scroll-view>
    <view v-else class="tabs-list">
      <view
        v-for="(v, i) in list"
        :key="i"
        class="tabs-item"
        @click="setList(v)"
      >
        <view class="tabs-item-view">
          <view :class="v.status ? 'tabs-item-title2' : 'tabs-item-title'">{{
            v.name
          }}</view>
          <view v-if="v.status" class="tabs-line">
            <view class="tabs-item-line" :class="type === 1 ? 'typeOne' : ''" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    scroll: {
      type: Boolean,
      default: true,
    },
    type: {
      type: Number,
    },
  },
  data() {
    return {};
  },
  onLoad() {},
  onShow() {},
  methods: {
    setList(value) {
      this.$emit('click', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  // display: flex;
  // align-items: center;
  width: 704rpx;
  height: 58rpx;

  &-scroll {
    white-space: nowrap;
    height: 100%;
  }

  &-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  &-item {
    position: relative;
    display: inline-block;
    padding-left: 20rpx;
    padding-right: 20rpx;
    margin-right: 18rpx;

    &-view {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 58rpx;
    }

    &-title {
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }

    &-title2 {
      font-size: 31rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }

    &-line {
      width: 35rpx;
      height: 12rpx;
      background: linear-gradient(
        180deg,
        #d91b1b 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }

  &-line {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: -12rpx;
  }
}
.typeOne {
  background: url('https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698306684056.png')
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  top: 6px;
  width: 28rpx;
  height: 6rpx;
}
</style>