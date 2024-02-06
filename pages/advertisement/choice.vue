<template>
  <view class="choice">
    <div
      v-if="!status"
      :style="{
        position: 'fixed',
        width: '100%',
        height: statusBarHeightAdd,
        background: '#fff',
        top: 0,
        left: 0,
        zIndex: 1,
      }"
    ></div>
    <u-sticky :offset-top="stickyTop">
      <tabs
        ref="tab"
        :list="tablist"
        :twolist="twolist"
        :isNoShow="isNoShow"
        @setstatus="setStatus"
        @settabs="setTabList"
        @setsearch="setSearch"
      />
    </u-sticky>
    <view
      v-if="status && rows.list.length > 0"
      class="choice-list"
      :style="{ marginTop: statusBarHeight }"
      @touchstart="touchStart"
      @touchend="followTouchEnd"
    >
      <view
        v-for="(v, i) in rows.list"
        :key="i"
        class="choice-item"
        @click="toList(v)"
      >
        <view class="choice-item-top">
          <view class="choice-item-top-image">
            <u-avatar size="24" :src="v.headImg" />
          </view>
          <view class="choice-item-top-name">{{ v.nickname }}</view>
          <view class="choice-item-top-date">{{ v.createdAt }}</view>
        </view>
        <view class="choice-item-video">
          <image
            :src="v.coverPicture"
            class="choice-item-image"
            mode="aspectFill"
          />
          <view class="choice-item-video-icon" v-if="v.video">
            <image
              class="choice-item-video-image"
              mode="aspectFill"
              src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698492577434.png"
            />
          </view>
        </view>
        <view class="choice-item-below">
          <view class="choice-item-below-name">{{ getTitle(v) }}</view>
          <view class="choice-item-below-title">{{ v.content }}</view>
        </view>
        <view class="choice-item-line" />
        <view class="choice-item-bottom">
          <view class="flex alc">
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403214617.png"
              class="choice-item-bottom-like"
            />
            <view class="choice-item-bottom-title">{{ v.likeBaseNum }}</view>
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403564187.png"
              class="choice-item-bottom-comment"
            />
            <view class="choice-item-bottom-title">{{ v.commentNum }}</view>
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403655698.png"
              class="choice-item-bottom-forward"
            />
            <view class="choice-item-bottom-title">{{ v.shareBaseNum }}</view>
          </view>
          <view class="choice-item-bottom-look">{{ v.viewBaseNum }}人看过</view>
        </view>
      </view>
      <view v-if="bottom_status && showBottom" class="choice-bottom"
        >我到底啦~</view
      >
      <view style="height: 130rpx"></view>
    </view>
    <view
      v-else-if="bh && rows.list.length === 0 && status"
      class="choice-nodata"
      :style="{ marginTop: statusBarHeight }"
      @touchstart="touchStart"
      @touchend="followTouchEnd"
    >
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698476399530.png"
        class="choice-nodata-image"
      />
      <view v-if="status" class="choice-nodata-title"
        >暂无关注，快去发现你感兴趣的贴文吧~</view
      >
      <view v-else class="choice-nodata-title">暂无相关贴文</view>
      <view v-if="status" class="choice-nodata-name">猜你喜欢</view>
      <list
        v-if="status"
        :rows="like"
        :refs="'waterfalls'"
        :bottomStatus="bottom_status"
        :showBottom="showBottom"
        @setlike="(e) => setLike(like.list, e, 'like')"
      />
    </view>
    <view v-else @touchstart="touchStart" @touchend="touchEnd">
      <swiper
        :current="commCurrent"
        :style="{ height: listHeight }"
        :circular="circular"
      >
        <swiper-item>
          <scroll-view
            :scroll-y="true"
            :style="{ height: listHeight }"
            refresher-enabled
            :refresher-triggered="triggered"
            @scrolltolower="scrolltolower"
            @refresherrefresh="refresherrefresh"
            @refresherpulling="refresherpulling"
          >
            <list
              :rows="rows"
              :refs="'waterfalls2'"
              :bottomStatus="bottom_status"
              :showBottom="showBottom"
              :tabCurrent="tabCurrentVal"
              @setlike="(e) => setLike(rows.list, e, 'rows')"
            />
          </scroll-view>
        </swiper-item>
      </swiper>
    </view>
  </view>
</template>

<script>
import { statusBarHeight, statusBarHeightNopx } from '@/config/index';
import list from '@/pages/advertisement/components/list.vue';
import tabs from '@/pages/advertisement/components/tabs.vue';
import { tologin } from '@/utils/index.js';
export default {
  components: { tabs, list },
  data() {
    return {
      triggered: false,
      isNoShow: false,
      status: false,
      tablist: [],
      params: {
        articleTitle: '',
        current: 1,
        size: 10,
        newType: 2,
        type: 2,
      },
      rows: {
        list: [],
        total: 0,
      },
      like: {
        list: [],
        total: 0,
      },
      bottom_status: false,
      twolist: [
        { id: 0, name: '关注' },
        { id: 1, name: '逛逛' },
      ],
      bh: false,
      commCurrent: 0,
      touchStartX: 0,
      circular: false,
      showBottom: false,
      homeMenuId: '',
      sharedetail: {}
    };
  },
  computed: {
    statusBarHeight() {
      return `calc(45px + ${statusBarHeight})`;
    },
    statusBarHeightAdd() {
      return `calc(45px + 45px + ${statusBarHeight})`;
    },
    stickyTop() {
      return Number((statusBarHeightNopx * 2).toFixed(0));
    },
    listHeight() {
      return `calc(100vh - 45px - 45px - ${statusBarHeight})`;
    },
    tabCurrentVal() {
      return this.$refs.tab.tabCurrent;
    },
  },
  onLoad(option) {
    if (option.enter) {
      uni.setStorageSync("enter", option.enter);
    }
    this.getshareimg();
    if (option.keycode) {
      this.params.articleTitle = option.keycode;
    }
    if (option.isNoShow) {
      this.isNoShow = option.isNoShow;
    }
    if (option.homeMenuId) {
      this.homeMenuId = option.homeMenuId * 1;
    }
    this.getList();
    // this.getLikeList()
    this.getTabsList();
  },
  onPullDownRefresh() {
    this.setSearch();
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onReachBottom() {
    if (this.rows.total > this.params.current * this.params.size) {
      this.params.current += 1;
      this.getList();
    } else if (this.like.total > this.params.current * this.params.size) {
      this.params.current += 1;
      this.getLikeList();
    } else {
      this.bottom_status = true;
    }
  },
  watch: {
    bottom_status(v) {
      if (v) {
        setTimeout(() => {
          this.showBottom = true;
        }, 2000);
      } else {
        this.showBottom = false;
      }
    },
  },
  onShareAppMessage(res) {
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: "/pages/advertisement/choice?enter=117",
      success(res) {
          uni.showToast({
              title: "分享成功",
          });
      },
      fail(res) {
          uni.showToast({
              title: "分享失败",
              icon: "none",
          });
      },
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: "/pages/advertisement/choice?enter=117",
      success(res) {
          uni.showToast({
              title: "分享成功",
          });
      },
      fail(res) {
          uni.showToast({
              title: "分享失败",
              icon: "none",
          });
      },
    };
  },
  methods: {
    getshareimg() {
      this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/39").then((res) => {
        this.sharedetail = res.data;
      });
    },
    refresherpulling(e) {
      if (e.detail.deltaY < 0) {
        return;
      }
      this.triggered = true;
    },
    refresherrefresh() {
      this.setSearch();

      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
    scrolltolower() {
      if (this.rows.total > this.params.current * this.params.size) {
        this.params.current += 1;
        this.getList();
      } else if (this.like.total > this.params.current * this.params.size) {
        this.params.current += 1;
        this.getLikeList();
      } else {
        this.bottom_status = true;
      }
    },
    touchStart(e) {
      console.log(e);
      this.touchStartX = e.touches[0].clientX;
    },
    followTouchEnd(e) {
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      console.log(e, this.tabscurrent, deltaX);
      if (Math.abs(deltaX) < 90) return;
      if (deltaX < 0) {
        this.bottom_status = false;
        this.$refs.tab.getStatus(false);
      }
    },
    touchEnd(e) {
      console.log(e);
      if (
        this.$refs.tab.tabCurrent === 0 ||
        this.$refs.tab.tabCurrent === 1 ||
        this.$refs.tab.tabCurrent === this.tablist.length - 1 ||
        this.$refs.tab.tabCurrent === this.tablist.length - 2
      ) {
        this.circular = false;
      } else {
        this.circular = true;
      }
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(deltaX) < 90) return;
      if (deltaX > 0) {
        if (this.$refs.tab.tabCurrent === 0) {
          this.bottom_status = false;
          this.$refs.tab.getStatus(true);
          return;
        } else {
          this.$refs.tab.tabCurrent -= 1;
        }
      } else {
        if (this.$refs.tab.tabCurrent === this.tablist.length - 1) return;
        this.$refs.tab.tabCurrent += 1;
      }
      this.setTabList(this.tablist[this.$refs.tab.tabCurrent]);
    },
    getTitle(value) {
      const { activityTitle, articleTitle, productTitle } = value;
      return activityTitle || articleTitle || productTitle;
    },
    async getList() {
      this.bottom_status = false;
      this.bh = false;
      console.log(this.$refs.tab.tabCurrent);
      let url = '';
      let params = this.params;
      if (this.$refs.tab.tabCurrent === 0 && !this.status) {
        url = '/coc-social/api/v2/article/getExpertRecommendBySetting';
        const { current, size } = this.params;
        params = {
          articleType: 2,
          current,
          size,
          title: this.keyword,
          homeMenuId: this.homeMenuId,
        };
      } else {
        url = '/coc-social/api/v2/article/entertainmentSift';
      }
      const { data } = await this.$request.post(url, params);
      const list = JSON.parse(JSON.stringify(this.rows.list));
      data.records.forEach((v) => {
        if (v.imgs) {
          v.coverPicture = v.imgs.split(',')[0];
        } else if (v.articleCoverImage) {
          v.coverPicture = v.articleCoverImage;
        } else if (v.video) {
          v.coverPicture =
            v.video + '?x-oss-process=video/snapshot,t_1000,m_fast';
        }
        list.push(v);
      });
      if (data.records.length < data.size) {
        this.bottom_status = true;
      }
      this.rows.list = list;
      this.rows.total = data.total;
      this.bh = true;
      if (this.rows.list.length === 0 && this.params.type === 1) {
        this.like = {
          list: [],
          total: 0,
        };
        this.getLikeList();
      }
    },
    async getLikeList() {
      this.bottom_status = false;
      const { data } = await this.$request.post(
        '/coc-social/api/v2/article/entertainmentSift',
        {
          current: this.params.current,
          size: this.params.size,
          newType: 2,
          type: 2,
        }
      );
      const list = JSON.parse(JSON.stringify(this.like.list));
      data.records.forEach((v) => {
        if (v.imgs) {
          v.coverPicture = v.imgs.split(',')[0];
        } else if (v.articleCoverImage) {
          v.coverPicture = v.articleCoverImage;
        } else if (v.video) {
          v.coverPicture =
            v.video + '?x-oss-process=video/snapshot,t_1000,m_fast';
        }
        list.push(v);
      });
      this.like.list = list;
      this.like.total = data.total;
    },
    async getTabsList() {
      const { data } = await this.$request.post(
        '/coc-social/api/v2/article/getArticleSecondList',
        {
          newType: 2,
        }
      );
      const list = [{ value: 0, name: '推荐' }];
      data.forEach((v) => {
        list.push({ value: v.categoryId, name: v.name });
      });
      this.tablist = list;
    },
    async setStatus(value) {
      if (value) {
        if (!tologin()) {
          this.$refs.tab.status = true;
          setTimeout(() => {
            this.$refs.tab.status = false;
          }, 1000);
          return false;
        }
      }
      this.status = value;
      this.params.type = this.status ? 1 : 2;
      if (this.params.entertainmentSiftCategoryId) {
        delete this.params.entertainmentSiftCategoryId;
      } else {
        console.log(this.tablist[this.$refs.tab.tabCurrent]);
        this.params.entertainmentSiftCategoryId =
          this.tablist[this.$refs.tab.tabCurrent].value;
      }
      if (this.params.articleTitle) {
        delete this.params.articleTitle;
      }
      this.bottom_status = false;
      this.params.current = 1;
      this.rows.list = [];
      this.getList();
    },
    setTabList(value) {
      // console.log(value);
      // this.tablist.forEach((v) => {
      //   if (JSON.stringify(v) === JSON.stringify(value)) {
      //     v.status = true;
      //   } else {
      //     v.status = false;
      //   }
      // });
      this.bottom_status = false;
      this.params.entertainmentSiftCategoryId = value.value;
      this.rows.list = [];
      this.params.current = 1;
      this.getList();
    },
    setSearch(value) {
      this.params.articleTitle = value;
      this.rows.list = [];
      this.params.current = 1;
      this.getList();
    },
    toList(value) {
      if (value.video) {
        // isShopPunch=10  相当于 =0 否商家打卡:1-是；0-否
        uni.navigateTo({
          url:
            '/pages/activity/articlevideo/index?id=' +
            value.articleId +
            '&newType=2' +
            '&isQuote=10' +
            '&isShopPunch=10' +
            '&userType=1&title=娱乐生活&tabscurrent=' +
            this.$refs.tab.tabCurrent + '&isShowTab=true',
        });
      } else {
        uni.navigateTo({
          url:
            '/pages/activity/waterfull/imglist?id=' +
            value.articleId +
            '&newType=2' +
            '&isQuote=10' +
            '&isShopPunch=10' +
            '&userType=1',
        });
      }
    },
    setLike(list, value, id) {
      const oldlist = JSON.parse(JSON.stringify(list));
      oldlist.forEach((v) => {
        if (v.articleId === value.articleId) {
          v.likeType = value.likeType;
          if (value.likeType === 1) {
            v.likeBaseNum += 1;
          } else {
            v.likeBaseNum -= 1;
          }
        }
      });
      this[id].list = oldlist;
    },
  },
};
</script>

<style lang="scss" scoped>
.choice {
  &-list {
    padding-top: 10rpx;
  }

  &-item {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 0 10rpx 10rpx;

    &-top {
      display: flex;
      align-items: center;
      height: 90rpx;

      &-image {
        width: 48rpx;
        height: 48rpx;
        margin-left: 11rpx;
      }

      &-name {
        max-width: 260rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-left: 10rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &-date {
        font-size: 28rpx;
        font-family: HONOR Sans CN;
        font-weight: 400;
        color: #999999;
        margin-left: 24rpx;
      }
    }

    &-image {
      width: 710rpx;
      height: 710rpx;
      border-radius: 10rpx;
      margin-left: 10rpx;
      object-fit: cover;
    }

    &-below {
      &-name {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-left: 9rpx;
        margin-right: 9rpx;
        margin-top: 15rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 11rpx;
        margin-right: 11rpx;
        margin-top: 13rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }

    &-line {
      margin-top: 20rpx;
      width: 710rpx;
      height: 1rpx;
      background: #e8e8e8;
      margin-left: 10rpx;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60rpx;

      &-like {
        width: 36rpx;
        height: 34rpx;
        margin-left: 10rpx;
      }

      &-comment {
        width: 36rpx;
        height: 36rpx;
        margin-left: 30rpx;
      }

      &-forward {
        width: 26rpx;
        height: 26rpx;
        margin-left: 30rpx;
      }

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 10rpx;
      }

      &-look {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-right: 10rpx;
      }
    }

    &-video {
      position: relative;

      &-icon {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }

  &-nodata {
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

  &-bottom {
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
}
::v-deep {
  .page__head {
    .u-tabs__wrapper__nav__line {
      width: 28rpx !important;
      height: 6rpx !important;
      bottom: 10rpx !important;
    }

    .u-tabs__wrapper__nav > .u-tabs__wrapper__nav__item {
      padding: 0 20px;
    }
  }
}
</style>
