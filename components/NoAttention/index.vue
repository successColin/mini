<!--
 * @Descripttion: 关注没内容
 * @Author: ytx
 * @Date: 2023-10-26 17:41:10
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-26 17:41:10
-->
<template>
  <div class="noAttention">
    <u--image :src="src" width="267rpx" height="267rpx"></u--image>
    <view>暂无关注，快去发现你感兴趣的贴文吧~</view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      src: 'https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698367014136.png',
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.noAttention {
  width: 100%;
  height: 550rpx;
  background: #f8f8f8;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  & > view {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 60rpx;
  }
}
</style>
