<template>
  <view class="videoTabs">
    <u-navbar :autoBack="true" :title="title" />
    <view class="videoTabs__tabs" :style="{ top: topHeight }" v-if="isShowTab">
      <u-tabs
        keyName="name"
        itemStyle="height:34px;font-family: PingFang SC;"
        inactiveStyle="font-weight: 500;color: #FFFFFF; font-size: 28rpx; opacity: 0.8"
        activeStyle="font-weight: bold;color: #FFFFFF; font-size: 28rpx;"
        :lineWidth="0"
        :list="searchTabs"
        :current="current"
        @click="handleClick"
      >
      </u-tabs>
    </view>
  </view>
</template>

<script>
import { statusBarHeight } from '@/config/index';

export default {
  props: {
    current: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: '',
    },
    searchTabs: {
      type: Array,
      default: () => [],
    },
    relatedId: {
      type: String,
    },
    isShowTab: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    topHeight() {
      return `calc(44px + ${statusBarHeight})`;
    },
  },
  watch: {},
  mounted() {
    console.log(1111, this.relatedId);
  },
  methods: {
    handleClick(item) {
      this.$emit('update:current', item.index);
      this.$emit('giveTabsFun', item);
    },
  },
};
</script>
<style lang='scss' scoped>
.videoTabs {
  &__tabs {
    width: 100%;
    position: fixed;
    left: 0;
    z-index: 99999999;
  }
}
</style>
