<template>
  <view v-if="list.length > 0">
    <Currency :head="head">
      <scroll-view class="list" slot="list" scroll-x>
        <view
          v-for="(v, i) in list"
          :key="i"
          class="item"
          @click="handleJump(v)"
        >
          <view class="item-flex">
            <view class="item-left">
              <image :src="v.coverPicture" class="item-left-image" />
              <view class="item-left-label" v-if="v.marketingTags">
                <view class="item-left-label-title">{{ v.marketingTags }}</view>
              </view>
            </view>
            <view class="item-right">
              <view class="item-right-title">{{ v.title }}</view>
              <view class="item-right-label"
                >报名截止时间: {{ v.signUpDeadline }}</view
              >
              <view class="item-right-head">
                <image :src="v.headImg" class="item-right-head-image" />
                <view class="item-right-head-name">{{ v.nickname }}</view>
                <view class="item-right-head-icon">
                  <u-icon name="arrow-right" color="#222222" size="6" />
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </Currency>
  </view>
</template>
<script>
import Currency from './currency.vue';
export default {
  options: {
    styleIsolation: 'shared',
  },
  components: { Currency },
  data() {
    return {
      head: {
        image:
          'https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705456272805.png',
        title: '去参与',
        url: '/pages/talentShow/list',
      },
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      const { data } = await this.$request.post(
        `/coc-active/api/v1/adv/space/getExpertActivityAdv`
      );
      this.list = data;
    },
    handleJump(v) {},
  },
};
</script>
<style lang="scss" scoped>
::v-deep .currency-top-image {
  width: 156rpx;
}
.list {
  white-space: nowrap;
}
.item {
  display: inline-block;
  &-flex {
    display: flex;
    margin-bottom: 5rpx;
  }
  &-left {
    position: relative;
    &-image {
      display: block;
      width: 228rpx;
      height: 148rpx;
      background: #d2d2d2;
      border-radius: 10rpx;
    }
    &-label {
      position: absolute;
      top: 12rpx;
      left: 8rpx;
      &-title {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 28rpx;
        font-size: 16rpx;
        font-family: CKTKingKong;
        font-weight: bold;
        color: #582c12;
        line-height: 36rpx;
        padding: 0 10rpx;

        background: linear-gradient(142deg, #fde1c9, #eab999);
        border-radius: 14rpx;
      }
    }
  }
  &-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 344rpx;
    margin: 0 15rpx;
    &-title {
      width: 344rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 26rpx;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    &-label {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 32rpx;
      border: 1px solid #d8271c;
      border-radius: 16rpx;
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      line-height: 36rpx;
      padding: 0 16rpx;
      margin: 20rpx 0 24rpx;
    }
    &-head {
      display: flex;
      align-items: center;
      height: 36rpx;
      background: #f8f8f8;
      border-radius: 18rpx;
      &-image {
        width: 36rpx;
        height: 36rpx;
        background: #000000;
        border-radius: 50%;
      }
      &-name {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 36rpx;
        margin: 0 7rpx 0 10rpx;
      }
      &-icon {
        margin-right: 15rpx;
      }
    }
  }
}
</style>
