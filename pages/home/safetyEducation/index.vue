<template>
  <view class="page">
    <u-navbar :autoBack="true" :title="title" leftIconSize="0" />
    <videos ref="videos" v-if="status" :value="value" :type="2" />
    <float v-if="tag" :tag="tag" />
    <request-loading />

    <view style="height: 100rpx"></view>

    <tabbar
      v-model="tabbarHeight"
      routePath="pages/home/safetyEducation/index"
    ></tabbar>
  </view>
</template>

<script>
import float from '@/components/float/index.vue';
import tabbar from '@/components/tabbar/index.vue';
import videos from '@/components/videos/index.vue';

export default {
  components: {
    videos,
    float,
    tabbar,
  },
  data() {
    return {
      value: {
        details: {
          params: {
            id: '',
          },
          url: '/coc-active/api/v1/video/details',
        },
        list: {
          params: { type: '', videoId: '' },
          url: '/coc-active/api/v1/video/detailsList',
        },
        like: {
          //点赞
          type: 4,
        },
      },
      status: false,
      share: {
        id: '',
        type: '',
      },
      tag: 0,
      title: '安全教育',
    };
  },
  onShareAppMessage() {
    const { id, type } = this.share;
    let path =
      '/pages/activity/foursvideo/index?id=' +
      id +
      '&type=' +
      type +
      '&enter=117';
    this.$refs.videos.setShare(2);
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
    const { id, type } = this.share;
    let path =
      '/pages/activity/foursvideo/index?id=' +
      id +
      '&type=' +
      type +
      '&enter=117';
    this.$refs.videos.setShare(2);
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
    const { id, type, title, tag, enter, brandId } = option;
    this.value.details.params.id = id;
    this.value.list.params.type = type || 6;
    this.value.list.params.videoId = id;
    this.value.list.params.brandId = brandId;
    this.status = true;
    if (title) {
      // uni.setNavigationBarTitle({ title });
      this.title = title;
    }
    if (enter) {
      uni.setStorageSync('enter', enter);
    }
    if (tag) {
      this.tag = tag * 1;
    }
    this.share = {
      id,
      type,
    };
    uni.$on('videoDetails', (res) => {
      this.share.id = res.player.id;
    });
  },
  onShow() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.page {
  background: #000000;
}
::v-deep .request-loading-view {
  background: #000000 !important;
}

::v-deep .u-status-bar {
  background: transparent !important;
}
::v-deep .u-navbar__content {
  background: transparent !important;
}

::v-deep .u-navbar__content__title {
  color: #ffffff !important;
}

::v-deep .u-icon__icon {
  color: #ffffff !important;
}

::v-deep {
  .swiper,
  .video {
    height: calc(100vh - 100rpx) !important;
  }
  // .bottom {
  //   bottom: 40rpx !important;
  // }
  // .slider {
  //   bottom: 10rpx !important;
  // }
  // .image {
  //   bottom: -70rpx !important;
  // }
}
</style>
