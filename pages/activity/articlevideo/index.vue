<template>
  <view class="page">
    <videoTabs
      :searchTabs="searchTabs"
      @giveTabsFun="tabsFun"
      :title="title"
      :current.sync="current"
      :relatedId="relatedId"
      :isShowTab="isShowTab"
    ></videoTabs>
    <videos
      ref="videos"
      v-if="status"
      :value="value"
      :type="1"
      :shareObj.sync="shareObj"
      :tabscurrent.sync="current"
      :searchTabs="searchTabs"
      :newType="newType"
      :isShowTab="isShowTab"
    />
    <float v-if="tag" :tag="tag" />
    <request-loading />
  </view>
</template>

<script>
import float from '@/components/float/index.vue';
import videos from '@/components/videos/index.vue';
import videoTabs from './videoTabs.vue';
export default {
  components: {
    videos,
    float,
    videoTabs,
  },
  data() {
    return {
      isShowTab: false,
      newType: '',
      searchTabs: [],
      shareObj: {},
      value: {
        details: {
          // 获取文章详情
          params: {
            id: '',
          },
          url: 'coc-social/api/v1/article/findById',
        },
        list: {
          // 获取文章列表
          params: { shopCategory: '', articleId: '' },
          url: '/coc-social/api/v2/article/articleList',
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
      title: '',
      current: 0,
      relatedId: ''
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
  methods: {
    tabsFun(v) {
      console.log(v);
      this.$refs.videos.refreshFun(v.value);
    },
    async getTabsList() {
      const { newType } = this.value.list.params;
      if (newType == 1 || newType == 2) {
        const { data } = await this.$request.post(
          '/coc-social/api/v2/article/getArticleSecondList',
          {
            newType,
          }
        );
        const list = [{ value: 0, name: '推荐' }];
        data.forEach((v) => {
          let obj;
          if (newType == 1) {
            obj = { value: v.articleNewType, name: v.name };
          } else {
            obj = { value: v.categoryId, name: v.name };
          }
          list.push(obj);
        });
        this.searchTabs = list;
        console.log(this.searchTabs);
      }
    },
  },
  onLoad(option) {
    console.log(option, '17855869923 - option');
    const {
      id,
      relatedId,
      shopId,
      shopCategory,
      newType,
      isQuote,
      relatedType,
      isShopPunch,
      selectionType,
      entertainmentSiftCategoryId,
      keyword,
      userType,
      quoteType,
      title,
      tag,
      enter,
      userId,
      isDel,
      brandId,
      shopTypeId,
      tabscurrent,
      isShowTab
    } = option;
    this.current = tabscurrent;

    this.newType = +newType;
    this.relatedId = relatedId || '';
    if (isShowTab) {
      this.isShowTab = JSON.parse(isShowTab) || false;
    }
    this.value.details.params.id = id;
    this.value.list.params = {
      type: 1,
      articleId: id,
      shopId,
      relatedId,
      shopCategory,
      newType,
      isQuote: isQuote * 1 === 10 ? 0 : isQuote * 1,
      relatedType,
      isShopPunch: isShopPunch * 1 === 10 ? 0 : isShopPunch * 1,
      selectionType,
      entertainmentSiftCategoryId,
      keyword,
      userType,
      quoteType,
      userId,
      isDel,
      brandId,
      shopTypeId,
    };
    console.log(this.value, '17855869923 - value');
    this.status = true;
    if (title) {
      this.title = title;
      // uni.setNavigationBarTitle({ title });
    }
    if (tag) {
      this.tag = tag * 1;
    }
    if (enter) {
      uni.setStorageSync('enter', enter);
    }
    this.share = {
      id,
    };
    uni.$on('videoDetails', (res) => {
      this.share.id = res.player.id;
    });
    this.getTabsList();
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
