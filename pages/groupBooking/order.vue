<template>
  <view class="page">
    <view>
      <!-- url为要跳转外链的地址-->
      <web-view :src="pushurl"> </web-view>
    </view>
  </view>
</template>

<script>
import { h5Url } from '@/config/index';
import { tologin } from '@/utils/index.js';

export default {
  components: {},
  data() {
    return {
      pushurl: `${h5Url}/pages/groupBooking/order`,
    };
  },
  onLoad() {
    if (tologin() !== true) {
      return;
    }
  },
  onShow() {},
  methods: {},
};
</script>

<style lang="scss">
.page {
}
</style>
