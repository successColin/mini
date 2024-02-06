<template>
  <view class="page">
    <view v-if="isshowpage">
      <u-navbar
        bgColor=""
        leftText=""
        title=" "
        :safeAreaInsetTop="true"
        :autoBack="false"
        @leftClick="clickleft"
      >
        <view class="u-nav-slot" slot="left">
          <u-icon name="arrow-left" size="19"></u-icon>
        </view>
      </u-navbar>
      <carousel
        v-if="getadUrl"
        :list="getswiper()"
        :topStyle="{ width: '750rpx', borderRadius: '0rpx' }"
        height="741rpx"
        urlkey="url"
        :dataType="1"
        :indicatorType="4"
        :clickType="2"
      >
      </carousel>

      <view v-if="type == 1">
        <newcar :isback="isback" :shopId="shopId" :dataList="dataList"></newcar>
      </view>
      <view v-else>
        <usedcar
          :isback="isback"
          :shopId="shopId"
          :dataList="dataList"
        ></usedcar>
      </view>
    </view>
    <request-loading></request-loading>
  </view>
</template>
<script>
import carousel from '@/components/carousel/index.vue';
import newcar from '@/pages/carShops/carList/newcar.vue';
import usedcar from '@/pages/carShops/carList/usedcar.vue';
export default {
  components: {
    carousel,
    usedcar,
    newcar,
  },
  data() {
    return {
      dataList: {},
      isshowpage: false,
      type: '',
      id: '',
      shopId: '',
      isapp: 0,
      isback: false,
    };
  },

  onLoad(option) {
    let _this = this;
    this.type = option.type;
    this.id = option.id;
    // uni.removeStorageSync('enter');
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    if (option.shopId) {
      this.shopId = option.shopId;
    }
    if (option.isapp == 1) {
      this.isback = true;
    }
    uni.$on('update', function (data) {
      _this.getList();
    });
    this.getList();
  },
  onShow() {},
  computed: {
    getadUrl() {
      if (this.dataList.imgList) {
        return true;
      } else {
        return false;
      }
    },
  },
  onShareAppMessage(res) {
    let title = this.dataList.maintainName;
    let imageUrl = this.dataList.shareImage
      ? this.dataList.shareImage
      : this.dataList.coverImg;
    return {
      title,
      path:
        `/pages/carShops/carList/index?id=` + this.id + '&type=' + this.type + '&enter=117',
      imageUrl,
      success(res) {
        uni.showToast({
          title: '分享朋友成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享朋友失败',
          icon: 'none',
        });
      },
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    return {
      title: this.dataList.maintainName,
      path:
        `/pages/carShops/carList/index?id=` + this.id + '&type=' + this.type + '&enter=117',
      imageUrl: this.dataList.shareImage
        ? this.dataList.shareImage
        : this.dataList.coverImg,
      success(res) {
        uni.showToast({
          title: '分享朋友圈成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享朋友圈失败',
          icon: 'none',
        });
      },
    };
  },
  methods: {
    clickleft() {
      if (!this.isback) {
        uni.navigateBack({
          delta: 1,
        });
      } else {
        if (window._51club) {
          window._51club.backIntercept('app');
        }
        if (window.webkit.messageHandlers) {
          window.webkit.messageHandlers.backIntercept.postMessage('app');
        }
      }
    },
    getswiper() {
      return this.dataList.imgList;
    },
    getList() {
      if (!this.isshowpage) {
        this.$showLoading();
      }
      let url = '';
      if (this.type == 1) {
        url = '/coc-active/api/v1/four_s/new/details/' + this.id;
      } else {
        url = '/coc-active/api/v1/four_s/second/details/' + this.id;
      }

      this.$newrequest
        .get(url)
        .then((res) => {
          this.shopId = res.data.shopId;
          if (res.data.energyType) {
            if (res.data.energyType.indexOf('2') != -1) {
              res.data.isenergyType = true;
            } else {
              res.data.isenergyType = false;
            }
          }
          const arr = [];
          res.data.bannerImageList.forEach((v) => {
            arr.push({
              url: v,
              type: 'image',
            });
          });
          if (res.data.bannerVideo) {
            arr.unshift({
              url: res.data.bannerVideo,
              type: 'video',
              // poster: arr[arr.length - 1].url,
            });
          }
          res.data.imgList = arr;

          this.dataList = res.data;
        })
        .catch((err) => {})
        .finally(() => {
          if (!this.isshowpage) {
            this.isshowpage = true;
            this.$hideLoading();
          }
        });
    },
  },
};
</script>

<style lang="scss">
.page {
  background-color: #ffffff;
}

.return {
  position: fixed;
  left: 60rpx;
  top: var(--status-bar-height);
  z-index: 999;
}
</style>
