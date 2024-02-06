<template>
  <view class="list">
    <view
      class="choice-nodata"
      :style="{ marginTop: statusBarHeight }"
      v-if="rows.list.length === 0"
    >
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698476399530.png"
        class="choice-nodata-image"
      />
      <view class="choice-nodata-title">暂无相关贴文</view>
      <view v-if="bottom_status" class="choice-bottom">我到底啦~</view>
      <view style="height: 130rpx"></view>
    </view>
    <custom-waterfalls-flow
      v-else
      imageKey="coverPicture"
      :ref="refs"
      :value="rows.list"
      :isshowicon="true"
      @imageClick="toList"
    >
      <view v-for="(v, i) in rows.list" :key="i" slot="slot{{i}}" class="item">
        <view class="item-title">{{ getTitle(v) }}</view>
        <view class="flex alc jsb item-avatar">
          <view class="flex alc">
            <u-avatar size="20" :src="v.headImg" />
            <view class="item-name">{{ v.nickname }}</view>
          </view>
          <view class="item-like" @click="setLikeBase(v)">
            <image
              v-if="v.likeType === 2"
              class="item-like-image"
              src="@/static/image/unlike.svg"
            />
            <image
              v-else
              class="item-like-image"
              src="@/static/image/like.svg"
            />
            <view class="item-like-title">{{ v.likeBaseNum }}</view>
          </view>
        </view>
      </view>
    </custom-waterfalls-flow>
    <view v-if="bottomStatus && showBottom" class="choice-bottom">我到底啦~</view>
    <view style="height: 130rpx"></view>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
export default {
  props: {
    rows: {
      type: Object,
      default: () => {},
    },
    refs: {
      type: String,
      default: 'waterfallsFlowRef',
    },
    bottomStatus: {
      type: Boolean,
      default: false,
    },
    showBottom: {
      type: Boolean,
      default: false,
    }
  },
  options: {
    styleIsolation: 'shared', // 解除样式隔离
  },
  data() {
    return {
      tabCurrent: 0,
    };
  },
  mounted() {
    uni.$on('tabsChange', (v) => {
      console.log('进来了=======', v);
      this.tabCurrent = v;
    });
  },
  destroyed() {
    uni.$off('tabsChange');
  },
  methods: {
    getTitle(value) {
      const { activityTitle, articleTitle, productTitle } = value;
      return activityTitle || articleTitle || productTitle;
    },
    toList(value) {
      if (value.video) {
        // userType 1-关注，2-发现
        uni.navigateTo({
          url:
            '/pages/activity/articlevideo/index?id=' +
            value.articleId +
            '&newType=2' +
            '&isQuote=10' +
            '&isShopPunch=10' +
            '&userType=2&title=娱乐生活&tabscurrent=' +
            this.tabCurrent + '&isShowTab=true',
        });
      } else {
        uni.navigateTo({
          url:
            '/pages/activity/waterfull/imglist?id=' +
            value.articleId +
            '&newType=2' +
            '&isQuote=10' +
            '&isShopPunch=10' +
            '&userType=2',
        });
      }
    },
    setLikeBase(value) {
      if (tologin() !== true) {
        return;
      }
      this.$request
        .post('/coc-social/api/v2/article/like', {
          id: value.articleId,
        })
        .then((res) => {
          if (res.code == 200) {
            if (value.likeType === 2) {
              this.$emit('setlike', {
                likeType: 1,
                articleId: value.articleId,
              });
            } else {
              this.$emit('setlike', {
                likeType: 2,
                articleId: value.articleId,
              });
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  width: calc(100vw - 10rpx);
  margin: 0rpx 5rpx;
  padding-top: 10rpx;
}

.item {
  position: relative;
  height: 100%;
  width: 100%;

  &-title {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 13rpx;
    padding-top: 12rpx;
    margin-right: 13rpx;
    margin-bottom: 11rpx;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  &-avatar {
    margin-left: 13rpx;
    margin-bottom: 12rpx;
  }

  &-name {
    width: 180rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-left: 6rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  &-like {
    display: flex;
    align-items: center;

    &-image {
      width: 28rpx;
      height: 28rpx;
    }

    &-title {
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      margin-left: 5rpx;
      margin-right: 10rpx;
    }
  }
}

::v-deep .waterfalls-flow-column {
  width: calc((100vw - 10rpx) / 2) !important;
  margin-left: 0 !important;
}

::v-deep .column-value {
  width: calc(100% - 10rpx) !important;
  margin: 0 5rpx;
}

::v-deep .column-value-position .inner {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
}
.choice-nodata {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-image {
    width: 267rpx;
    height: 267rpx;
    margin-top: 80rpx;
  }

  &-title {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 60rpx;
  }

  &-name {
    font-size: 32rpx;
    font-family: Alimama ShuHeiTi;
    font-weight: bold;
    font-style: italic;
    color: #222222;
    margin-top: 115rpx;
    margin-bottom: 25rpx;
  }
}
.choice-bottom {
  font-size: 24rpx;
  color: #999999;
  text-align: center;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
}
</style>
