<template>
  <div class="answerQuestion">
    <u-tabs
      inactiveStyle="font-family: PingFang SC, PingFang SC; font-size: 27rpx;font-weight: 500;color: #999999;"
      activeStyle="font-family: PingFang SC, PingFang SC; font-size: 27rpx; font-weight: bold;color: #D91B1B;"
      lineHeight="0"
      :list="tabsArr"
      :current="current"
      @click="handleClick"
    >
    </u-tabs>
    <div class="answerQuestion__line"></div>
    <swiper
      class="swiper"
      :current="swiperCurrent"
      :autoplay="autoplay"
      :duration="duration"
      @change="handlechangeswiper"
    >
      <swiper-item v-for="(item, index) in tabsArr" :key="index">
        <view
          class="answerQuestion__box"
          v-for="(v, i) in question(item.id)"
          :key="i"
          @click="handleQuestion(v)"
        >
          <div>{{ v.question }}</div>
          <div>
            <u-icon name="arrow-right" :size="16" color="#222222"></u-icon>
          </div>
        </view>
        <div
          v-if="item.isMore"
          class="answerQuestion__more"
          @click="handleJumpMore(item)"
        >
          查看更多
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
export default {
  props: {
    tabsArr: {
      type: Array,
      default: () => [],
    },
    current: {
      type: Number,
      default: 0,
    },
    listObj: {
      type: Object,
      default: () => {},
    },
    historyArr: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      swiperCurrent: 0,
      autoplay: false,
      interval: 15000,
      duration: 400,
    };
  },
  components: {},
  computed: {
    question() {
      return function (id) {
        return this.listObj[id];
      };
    },
  },
  watch: {},
  mounted() {},
  methods: {
    handleClick(v) {
      console.log(v);
      this.swiperCurrent = v.index;
    },
    handlechangeswiper(v) {
      console.log(v);
      this.$emit('update:current', v.detail.current);
    },
    handleJumpMore(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/faultClassify?id=${item.id}`,
      });
    },
    handleQuestion(v) {
      console.log(v, this.historyArr);
      this.historyArr.unshift({
        body: v.question,
        flow: 'out',
        type: 'text',
        isnoShow: true,
      });
      this.historyArr.unshift({
        body: v.answer,
        flow: 'in',
        type: 'text',
        isnoShow: true,
      });
      this.$emit('update:historyArr', this.historyArr);
    },
  },
};
</script>
<style lang='scss' scoped>
.answerQuestion {
  padding: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;
  &__line {
    border-bottom: 1rpx solid #e8e8e8;
  }
  &__box {
    display: flex;
    justify-content: space-between;
    padding-top: 20rpx;
    margin: 0 10rpx;
    & > div:nth-child(1) {
      font-size: 23rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }
  &__more {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 400;
    color: #999999;
    height: 42rpx;
  }
}
swiper {
  height: 350rpx;
}
</style>
