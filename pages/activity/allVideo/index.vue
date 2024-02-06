<template>
  <view class="page">
    <u-navbar :autoBack="true" />
    <videos
      v-if="status"
      :value="value"
      :type="videoType"
      :shareObj.sync="shareObj"
    />
    <!-- <float v-if="tag" :tag="tag" /> -->
    <request-loading />
  </view>
</template>

<script>
import float from '@/components/float/index.vue';
import videos from '@/components/videos/index.vue';
export default {
  components: {
    videos,
    float,
  },
  data() {
    return {
      videoType: 1,
      shareObj: {},
      value: {
        details: {
          params: {
            id: '',
          },
          url: 'coc-social/api/v1/article/findById',
        },
        list: {
          url: '/coc-active/api/v2/homePage/advertisingSpace/v6_2',
        },
        like: {
          //点赞
          type: 2,
        },
      },
      status: false,
      share: {
        id: '',
      },
      tag: 0,
    };
  },
  onShareAppMessage() {
    const { id } = this.share;
    let path = '/pages/activity/articlevideo/index?id=' + id + '&enter=117';
    console.log(this.shareObj);
    if (this.$refs.videos) {
      this.$refs.videos.setShare(1);
    }
    return {
      title: this.shareObj.content,
      path: path,
      imageUrl: this.shareObj.url,
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
    const { id } = this.share;
    let path = '/pages/activity/articlevideo/index?id=' + id + '&enter=117';
    console.log(this.shareObj);
    if (this.$refs.videos) {
      this.$refs.videos.setShare(1);
    }
    return {
      path: path,
      title: this.shareObj.content,
      imageUrl: this.shareObj.url,
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
    console.log(option, '17855869923 - option');
    const {
      id,
      // relatedId,
      // shopId,
      // shopCategory,
      // newType,
      // isQuote,
      // relatedType,
      // isShopPunch,
      // selectionType,
      // entertainmentSiftCategoryId,
      // keyword,
      // userType,
      // quoteType,
      videoType,
      tag,
      enter,
      // userId,
      // isDel,
      highArticleId,
      temporaryId,
    } = option;
    if (tag) {
      this.tag = tag * 1;
    }
    if (enter) {
      uni.setStorageSync('enter', enter);
    }
    this.videoType = videoType;
    if (videoType == 2) {
      this.value.details.url = '/coc-active/api/v1/video/details';
      this.value.like.type = 4;
    }
    this.value.details.params.id = id;
    // this.value.list.params = {
    //   type: 1,
    //   articleId: id,
    //   shopId,
    //   relatedId,
    //   shopCategory,
    //   newType,
    //   isQuote: isQuote * 1 === 10 ? 0 : isQuote * 1,
    //   relatedType,
    //   isShopPunch: isShopPunch * 1 === 10 ? 0 : isShopPunch * 1,
    //   selectionType,
    //   entertainmentSiftCategoryId,
    //   keyword,
    //   userType,
    //   quoteType,
    //   userId,
    //   isDel,
    // };
    this.value.list.params = {
      highArticleId,
      temporaryId: +temporaryId,
    };
    console.log(this.value, '17855869923 - value');
    this.status = true;

    this.share = {
      id,
    };
    uni.$on('videoDetails', (res) => {
      this.share.id = res.player.id;
    });
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #000000;
}
::v-deep .request-loading-view {
  background: #000000 !important;
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
</style>
