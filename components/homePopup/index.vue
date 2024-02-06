<template>
  <u-popup
    class="homePopup"
    :safeAreaInsetBottom="false"
    :show="show"
    @close="handleClose"
    bgColor="transparent"
    mode="center"
  >
    <view @click="handleClick">
      <image :style="imgStyle" :src="img"></image>
    </view>
    <view
      style="justify-content: center; padding: 30rpx 0"
      class="u-flex"
      @click="handleClose"
    >
      <u-icon color="#ffffff" name="close-circle" size="20px"></u-icon>
    </view>
  </u-popup>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
      default: '',
    },
    imgStyle: {
      type: String,
      default: 'width: 652rpx; height: 697rpx',
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleClick() {
      this.$emit('click');
      this.$emit('update:show', false);
    },
    handleClose() {
      this.$emit('update:show', false);
    },
  },
};
</script>
<style lang='scss' scoped>
.homePopup {
}
</style>
