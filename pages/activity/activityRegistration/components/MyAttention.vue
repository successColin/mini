<!--
 * @Descripttion: 我的关注
 * @Author: ytx
 * @Date: 2023-10-26 17:41:03
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-26 17:41:03
-->
<template>
  <div class="myAttention">
    <no-attention></no-attention>
    <div class="myAttention__title">猜你喜欢</div>
  </div>
</template>

<script>
import NoAttention from '@/components/NoAttention/index.vue';

export default {
  data() {
    return {};
  },
  components: {
    NoAttention,
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>
<style lang='scss' scoped>
.myAttention {
  margin-top: 90px;
  &__title {
    font-size: 32rpx;
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-style: italic;
    color: #222222;
    text-align: center;
  }
}
</style>
