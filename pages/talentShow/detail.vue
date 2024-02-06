<template>
  <view class="page">
    <swiper
      class="swiper"
      :indicator-dots="true"
      :autoplay="autoplay"
      :circular="true"
      @change="change"
    >
      <swiper-item v-for="(v, i) in details.imageList" :key="i">
        <image
          v-if="v.type === 'image'"
          :src="v.url"
          class="swiper"
          mode="aspectFit"
        />
        <video
          v-else-if="v.type === 'video'"
          autoplay
          object-fit="contain"
          :id="`video${i}`"
          :src="v.url"
          :poster="v.image"
          class="swiper"
          @click="videoClick"
          @play="play"
          @pause="pause"
        />
      </swiper-item>
    </swiper>
    <view class="top">
      <view class="top-name">{{ details.name }}</view>
      <view class="top-address">{{ details.address }}</view>
      <view class="top-title">
        <u-parse :content="details.content" />
      </view>
    </view>
    <view v-if="tabList.length" class="tabs">
      <view class="tabs-flex">
        <view
          v-for="(v, i) in tabList"
          :key="i"
          class="tabs-item"
          @click="setTabs(v)"
        >
          <view
            :class="
              v.index === tabIndex ? 'tabs-item-title' : 'tabs-item-untitle'
            "
            >{{ v.name }}</view
          >
          <view
            :class="
              v.index === tabIndex ? 'tabs-item-line' : 'tabs-item-unline'
            "
          />
        </view>
      </view>
    </view>
    <view v-if="list.length" class="shop">
      <view
        v-for="(v, i) in list[tabIndex]"
        :key="i"
        class="shop-item"
        @click="toShop(v)"
      >
        <view class="shop-jcsb">
          <view class="shop-item-name">{{ v.shopName }}</view>
          <view class="shop-item-distance">{{ v.distanceMsg }}</view>
        </view>
        <view class="shop-flex">
          <image
            v-for="value in v.star"
            :key="value"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240116/file_1705371405199.png"
            class="shop-item-star"
          />
          <image
            v-for="value in 5 - v.star"
            :key="value"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240116/file_1705371455298.png"
            class="shop-item-star"
          />
          <view class="shop-item-title">{{ v.star }}</view>
        </view>
        <view class="shop-flex">
          <view class="shop-item-m1020"></view>
          <!-- <view class="shop-item-label"></view> -->
        </view>
        <view class="shop-item-line" />
        <scroll-view class="shop-flex" scroll-x>
          <view
            v-for="(value, index) in v.imageList"
            :key="index"
            class="shop-item-dib"
          >
            <image
              v-if="value.shopCarouselType === 1"
              :src="value.carouselUrl"
              class="shop-item-image"
            />
            <video
              v-else-if="value.shopCarouselType === 2"
              :src="value.carouselUrl"
              class="shop-item-image"
            />
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="evaluate" v-if="comment.list.length">
      <!-- 用户评价 -->
      <detailEvaluate :commentList="comment.list" :commentInfo="comment.info" />
    </view>
    <view class="recommend">
      <view class="recommend-title">相关推荐</view>
      <view class="recommend-list">
        <view
          v-for="(v, i) in details.list"
          :key="i"
          class="recommend-item"
          @click="toDetails(v)"
        >
          <image :src="v.url" class="recommend-item-image" />
          <view class="recommend-item-title">{{ v.name }}</view>
        </view>
      </view>
    </view>
    <view class="h200" />
    <view class="bottom">
      <view class="bottom-show">
        <view class="bottom-show-left">
          <image
            v-if="details.like"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240123/file_1705996798969.png"
            class="bottom-show-left-like"
            @click="setLike(2)"
          />
          <image
            v-else
            src="https://oss.dcqcjlb.com/51che_java_dev/20240123/file_1705996619939.png"
            class="bottom-show-left-like"
            @click="setLike(1)"
          />
          <button open-type="share" class="botton-none">
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20240123/file_1705996529765.png"
              class="bottom-show-left-share"
            />
          </button>
        </view>
        <view class="bottom-show-input" @click="toInput">
          <view class="bottom-show-input-image">
            <u-icon name="edit-pen-fill" size="16" color="#999999" />
          </view>
          <view class="bottom-show-input-title">说点什么..</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import detailEvaluate from '@/components/evaluate/detailEvaluate.vue';
export default {
  components: { detailEvaluate },
  data() {
    return {
      id: 0,
      details: {},
      tabIndex: 0,
      initTabList: [
        { index: 0, name: '周边美食' },
        { index: 1, name: '周边玩乐' },
        { index: 2, name: '周边住宿' },
      ],
      tabList: [],
      list: [[], [], []],
      comment: {
        list: [],
        info: {},
      },
      statusLike: false,
      autoplay: true,
      current: 0,
      videoStatus: false,
      videoContext: undefined,
    };
  },
  onShareAppMessage() {
    const { id } = this;
    let path =
      '/pages/activity/activityRegistration/localCharmDetails?id=' + id;
    this.setShare(3);
    return {
      path: path,
      success() {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail() {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
  onShareTimeline() {
    //分享到朋友圈
    const { id } = this;
    let path =
      '/pages/activity/activityRegistration/localCharmDetails?id=' + id;
    this.setShare(3);
    return {
      path: path,
      success() {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail() {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
  onLoad(option) {
    const { id } = option;
    this.id = id || 58;
    uni.$on('del_comment', () => {
      this.getCommentList(1);
    });
  },
  destroyed() {
    uni.$off('del_comment');
  },
  onShow() {
    this.init();
  },
  methods: {
    async init() {
      await this.getLocalCharmDetail(this.id);
      await this.getShopList(this.id);
      await this.getCommentList(1);
      this.$nextTick(() => {
        this.videoContext = uni.createVideoContext(
          `video${this.current}`,
          this
        );
      });
    },
    async getLocalCharmDetail(localCharmId) {
      const {
        data: {
          title,
          address,
          imgs,
          video,
          videoImg,
          detail,
          localCharmList,
          likeType,
        },
      } = await this.$request.post(
        '/coc-active/api/v1/localCharm/getLocalCharmDetail',
        {
          localCharmId,
        }
      );
      const videoList = video ? video.split(',') : [];
      const imageList = imgs.length > 0 ? imgs.split(',') : [];
      const list = [];
      videoList.forEach((v) => {
        list.push({ type: 'video', url: v, image: videoImg || '' });
      });
      imageList.forEach((v) => {
        list.push({ type: 'image', url: v });
      });
      const association = [];
      localCharmList.forEach((v) => {
        const { id, coverImage, title } = v;
        association.push({ id, url: coverImage, name: title });
      });
      this.details = {
        id: localCharmId,
        imageList: list,
        name: title,
        address,
        content: detail,
        list: association,
        like: likeType === 1,
      };
      console.log(this.details);
    },
    async getShopList(localCharmId) {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/localCharm/getLocalCharmDetailShopList',
        {
          localCharmId,
        }
      );
      const list = [[], [], []];
      data.forEach((v) => {
        v.imageList = v.carouselUrl ? v.carouselUrl : [];
        if (v.categoryParentId === 19) {
          list[0].push(v);
        } else if (
          v.categoryParentId === 15 ||
          v.categoryParentId === 17 ||
          v.categoryParentId === 18
        ) {
          list[1].push(v);
        } else if (v.categoryParentId === 16) {
          list[2].push(v);
        }
      });
      const tabList = [];
      const copyList = [];
      list.forEach((v, i) => {
        console.log(v.length);
        if (v.length > 0) {
          copyList.push(v);
          tabList.push(this.initTabList[i]);
        }
      });
      this.tabList = tabList;
      this.list = copyList;
    },
    async getCommentList(current) {
      const {
        data: { records, total },
      } = await this.$request.post(
        '/coc-system/api/v1/user_interaction/getComment',
        {
          id: this.id,
          commentType: 8,
          current,
          size: 10,
        }
      );
      records.forEach((v) => {
        if (v.imgs) {
          v.imgs = v.imgs.split(',');
        }
      });
      this.comment.list = records;
      this.comment.info = {
        id: this.id,
        commentType: 8,
        listNum: total,
      };
    },
    setTabs(value) {
      this.tabIndex = value.index;
    },
    async setLike(isLike) {
      if (!this.statusLike) {
        this.statusLike = true;
        const { code } = await this.$request.post(
          '/coc-system/api/v1/user_interaction/like',
          {
            id: this.id,
            isLike,
            likeType: 5,
          }
        );
        this.statusLike = false;
        if (code === 200) {
          this.getLocalCharmDetail(this.id);
        }
      }
    },
    toInput() {
      let obj = {
        commentType: 8,
        id: this.details.id,
        shopName: this.details.name,
      };
      uni.navigateTo({
        url:
          '/pages/service/evaluate/writeEvaluate?info=' + JSON.stringify(obj),
      });
    },
    async setShare(shareType) {
      const { code, message } = await this.$request.post(
        '/coc-system/api/v1/user_interaction/share',
        {
          id: this.id,
          shareType,
        }
      );
      if (code !== 200) {
        uni.$u.toast(message);
      }
    },
    play() {
      this.autoplay = false;
    },
    pause() {
      this.autoplay = true;
    },
    toDetails(value) {
      uni.navigateTo({
        url:
          '/pages/activity/activityRegistration/localCharmDetails?id=' +
          value.id,
      });
    },
    toShop(value) {
      uni.navigateTo({
        url: '/pages/activityMall/business/index?id=' + value.id,
      });
    },
    async change({ detail: { current } }) {
      this.videoContext = uni.createVideoContext(`video${this.current}`, this);
      this.current = current;
      if (this.videoContext) {
        this.videoContext.pause();
      }
    },
    videoClick() {
      this.videoContext = uni.createVideoContext(`video${this.current}`, this);
      if (!this.videoStatus) {
        this.videoStatus = true;
        this.videoContext.pause();
      } else {
        this.videoStatus = false;
        this.videoContext.play();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 750rpx;
  height: 1000rpx;
}

.top {
  width: 730rpx;
  background: #ffffff;
  border-radius: 10rpx;
  margin: 10rpx;
  &-name {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    padding: 16rpx 10rpx 0 10rpx;
  }
  &-address {
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    padding: 10rpx;
  }
  &-title {
    width: 710rpx;
    // font-size: 24rpx;
    // font-family: PingFang SC;
    // font-weight: 500;
    // color: #222222;
    // line-height: 38rpx;
    padding: 0 10rpx 14rpx 10rpx;
  }
}

.tabs {
  margin: 0 5rpx;
  &-flex {
    display: flex;
    align-items: center;
  }
  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 17rpx 15rpx 20rpx 15rpx;
    &-title {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #d91b1b;
      margin-bottom: 5rpx;
    }
    &-untitle {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-bottom: 5rpx;
    }
    &-line {
      width: 24rpx;
      height: 4rpx;
      background: #d91b1b;
      border-radius: 2rpx;
    }
    &-unline {
      width: 24rpx;
      height: 4rpx;
      background: #f8f8f8;
      border-radius: 2rpx;
    }
  }
}

.shop {
  &-flex {
    white-space: nowrap;
    display: flex;
    align-items: center;
    margin: 0 20rpx;
    width: 690rpx;
  }
  &-jcsb {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20rpx;
    padding: 20rpx 0 10rpx;
    width: 690rpx;
  }
  &-item {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 0 10rpx 10rpx 10rpx;
    &-name {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 36rpx;
    }
    &-distance {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 36rpx;
    }
    &-star {
      width: 24rpx;
      height: 24rpx;
      margin-right: 5rpx;
    }
    &-title {
      font-size: 24rpx;
      font-family: HONOR Sans CN;
      font-weight: 400;
      color: #d91b1b;
      line-height: 36rpx;
      margin-left: 5rpx;
    }
    &-label {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 38rpx;
      background: rgba(217, 27, 27, 0.1);
      border-radius: 10rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      line-height: 40rpx;
      padding: 0 12rpx;
      margin: 10rpx 0 20rpx;
    }
    &-m1020 {
      margin: 10rpx 0 20rpx;
    }
    &-line {
      width: 690rpx;
      height: 1rpx;
      background: #e8e8e8;
      margin: 0 20rpx;
    }
    &-dib {
      display: inline-block;
    }
    &-image {
      width: 223rpx;
      height: 160rpx;
      background: #c85252;
      border-radius: 10rpx;
      margin: 20rpx 10rpx 20rpx 0;
    }
  }
}
.evaluate {
  width: 710rpx;
  background: #ffffff;
  border-radius: 10rpx;
  margin: 10rpx;
  padding: 20rpx 10rpx;
  &-flex {
    display: flex;
    align-items: center;
  }
  &-jcsb {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  &-title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    padding: 20rpx 0 36rpx 11rpx;
  }
  &-item {
    display: flex;
    justify-content: space-between;
    &-head {
      width: 60rpx;
      height: 60rpx;
      background: red;
      margin-left: 16rpx;
    }
    &-name {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 38rpx;
      margin-top: 4rpx;
    }
    &-address {
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 38rpx;
      margin: 4rpx 0 0 22rpx;
    }
    &-time {
      font-size: 20rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      line-height: 38rpx;
      margin: 4rpx 44rpx 0 0;
    }
    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 38rpx;
      margin: 10rpx 0 0;
    }
    &-del {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      line-height: 38rpx;
      margin: 10rpx 46rpx 6rpx 0;
    }
    &-image {
      margin: 14rpx 0 0;
    }
    &-look {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      line-height: 38rpx;
      margin: 14rpx 0 0 15rpx;
    }
    &-line {
      width: 620rpx;
      height: 1rpx;
      background: #dbdbdb;
      margin: 30rpx 15rpx 26rpx 0;
    }
  }
  &-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 730rpx;
    padding: 0 0 24rpx;
    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 38rpx;
    }
    &-image {
      margin-left: 10rpx;
    }
  }
}
.recommend {
  width: 730rpx;
  background: #ffffff;
  border-radius: 10rpx;
  margin: 0 10rpx;
  &-title {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    padding: 16rpx 0 0 9rpx;
  }
  &-list {
    display: flex;
    flex-wrap: wrap;
    width: 720rpx;
    margin: 0 5rpx;
    padding: 33rpx 0;
  }
  &-item {
    width: 350rpx;
    height: 268rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 5rpx;
    &-image {
      width: 350rpx;
      height: 225rpx;
      background: #ff9999;
      border-radius: 10rpx;
    }
    &-title {
      display: flex;
      align-items: center;
      height: 43rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }
}
.h200 {
  height: 200rpx;
}
.bottom {
  position: fixed;
  bottom: 0;
  z-index: 1500;
  background: #ffffff;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  &-show {
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 750rpx;
    height: 120rpx;
    &-left {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 163rpx;
      margin-left: 59rpx;
      &-like {
        width: 38rpx;
        height: 33rpx;
      }
      &-share {
        width: 37rpx;
        height: 37rpx;
      }
    }
    &-input {
      display: flex;
      align-items: center;
      width: 428rpx;
      height: 80rpx;
      background: #f8f8f8;
      border-radius: 40rpx;
      margin: 0 50rpx;
      &-image {
        margin: 0 24rpx 0 34rpx;
      }
      &-title {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
      }
    }
  }
}

.botton-none {
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
}

.botton-none::after {
  border: none;
}

swiper {
  height: 100%;
}
</style>
