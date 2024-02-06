<template>
  <div
    class="customHead"
    :style="{ height: `calc(45px + ${statusBarHeight})` }"
  >
    <div class="customHead__box" :style="{ marginTop: statusBarHeight }">
      <!-- <u-icon
        name="arrow-left"
        color="#222222;"
        size="30rpx"
        @click="handleBack"
      ></u-icon> -->
      <div class="customHead__box--arrow" @click="handleBack">
        <u-image
          src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698391916956.png"
          width="18rpx"
          height="36rpx"
        ></u-image>
      </div>
      <div class="customHead__box--tabs" v-if="!isNoShow">
        <u-tabs
          inactiveStyle="font-size: 32rpx;font-weight: 500;color: #222222;"
          activeStyle="font-size: 32rpx; font-weight: bold;color: #222222;"
          :lineColor="`url(https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698306684056.png) 100% 100%`"
          :list="list"
          @click="handleClick"
          :current="current"
        >
        </u-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { statusBarHeight } from '@/config/index';

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    current: {
      type: Number,
      default: 0,
    },
    isNoShow: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    statusBarHeight() {
      return statusBarHeight;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    handleBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handleClick(v) {
      this.$emit('giveClickTabs', v);
    },
  },
};
</script>
<style lang='scss' scoped>
.customHead {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 99;
  background: white;
  display: flex;
  position: flex;
  &__box {
    margin: 0 22rpx 15px;
    display: flex;
    align-items: flex-end;
    width: 100%;
    &--arrow {
      width: 50rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
    }
    &--tabs {
      position: relative;
      bottom: -12px;
      margin: 0 auto;
      transform: translateX(-30px);
    }
  }
}
</style>
