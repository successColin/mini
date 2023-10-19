<template>
  <view
    class="banner-top"
    :class="topClass"
    :style="[topStyle]"
    v-if="banner.length > 0"
  >
    <u-swiper
      :bgColor="bgColor"
      v-if="indicatorType == 4"
      :list="banner"
      :keyName="urlkey"
      circular
      :autoplay="autoPlay"
      @change="(e) => (bannercurrent = e.current)"
      :height="height"
      @click="clickswiper"
      :radius="radius"
      :imgMode="imgMode"
      :interval="5000"
    >
      <view slot="indicator" class="indicator">
        <view
          class="indicator__dot"
          v-for="(item, index) in banner"
          :key="index"
          :class="[index === bannercurrent && 'indicator__dot--active']"
        >
        </view>
      </view>
    </u-swiper>
    <u-swiper
      :bgColor="bgColor"
      v-else-if="indicatorType == 2 || indicatorType == 3"
      :list="banner"
      :keyName="urlkey"
      circular
      indicator
      :indicatorMode="indicatorType == 3 ? 'dot' : 'line'"
      :autoplay="autoPlay"
      :height="height"
      @click="clickswiper"
      :radius="radius"
      @change="(e) => (bannercurrent = e.current)"
      :imgMode="imgMode"
      :interval="5000"
    >
    </u-swiper>
    <u-swiper
      :bgColor="bgColor"
      v-else-if="indicatorType == 5"
      easingFunction="easeInCubic"
      :list="banner"
      :keyName="urlkey"
      circular
      indicator
      :indicatorMode="indicatorType == 5 ? 'dot' : 'line'"
      :autoplay="autoPlay"
      :height="height"
      @click="clickswiper"
      :radius="radius"
      @change="changebannercurrent"
      :imgMode="imgMode"
      :interval="5000"
    >
    </u-swiper>
    <u-swiper
      :bgColor="bgColor"
      v-else
      :list="banner"
      :keyName="urlkey"
      circular
      :autoplay="autoPlay"
      :height="height"
      @click="clickswiper"
      :radius="radius"
      @change="(e) => (bannercurrent = e.current)"
      :imgMode="imgMode"
      :interval="5000"
    >
    </u-swiper>
    <view v-if="showCount" class="showcount">
      {{ bannercurrent + 1 }}<text style="margin: 0 5rpx">/</text
      >{{ banner.length }}
    </view>
    <view class="preview-full" v-if="videoUrl">
      <video
        id="myVideo"
        :src="videoUrl"
        @fullscreenchange="fullscreenchange"
        :autoplay="true"
      ></video>
    </view>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
export default {
  props: {
    type: {
      type: Number,
      default: 1,
    },
    shopId: {
      type: Number,
      default: null,
    },
    topClass: {
      type: Array,
      default: function () {
        return [];
      },
    },
    topStyle: {
      type: Object,
      default: function () {
        return {};
      },
    },
    //轮播图高度
    height: {
      type: String,
      default: function () {
        return '400rpx';
      },
    },
    //数组
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
    //地址键名
    urlkey: {
      type: String,
      default: function () {
        return 'url';
      },
    },
    //1:是否自己传入/2:读取轮播图配置
    dataType: {
      type: Number,
      default: function () {
        return 2;
      },
    },
    //系统轮播图标识
    systemCode: {
      type: String,
      default: function () {
        return '';
      },
    },
    //指示器类型 1:没有 2:轮播图自带line 3:轮播图自带dot 4:自定义样式 5:轮播背景
    indicatorType: {
      type: Number,
      default: function () {
        return 4;
      },
    },
    //自动播放
    autoPlay: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    // 是否显示视频按钮
    isfullscreen: {
      type: Boolean,
      default: function () {
        return true;
      },
    },
    //点击类型 1:跳转 2:图片放大 3:无操作
    clickType: {
      type: Number,
      default: function () {
        return 1;
      },
    },
    radius: {
      type: Number,
      default: function () {
        return 4;
      },
    },
    showCount: {
      type: Boolean,
      default: function () {
        return false;
      },
    },
    imgMode: {
      type: String,
      default: function () {
        return 'scaleToFill';
      },
    },
    bgColor: {
      type: String,
      default: function () {
        return '#f8f8f8';
      },
    },
  },
  created() {
    if (this.dataType == 2) {
      if (this.systemCode) {
        this.getCarouselList(this.systemCode);
      }
    } else {
      this.list.forEach((m) => {
        if (m.type == 'video' && !m.poster) {
          m.poster = m.url + '?x-oss-process=video/snapshot,t_1000,m_fast';
        }
        this.banner.push(m);
      });
      // this.banner = this.list
    }
  },
  watch: {
    systemCode(val) {
      if (val && val.length > 0) {
        this.getCarouselList(val);
      }
    },
  },
  data() {
    return {
      banner: [],
      bannercurrent: 0,
      videoUrl: null,
      videoContext: null,
    };
  },
  methods: {
    changebannercurrent(index) {
      this.bannercurrent = index.current;
      uni.$emit('changebannercurrent', {
        index: index.current,
        url: this.banner[index.current].backgroundUrl,
      });
    },
    //获取轮播图列表传shipid
    getCarouselListshopid(code, shopid) {
      let url = '';
      if (this.type == 1) {
        url = '/coc-system/api/v1/system/dictionaries/banner/list';
      } else {
        url = '/coc-active/api/v1/four_s/bannerList';
      }

      this.$newrequest
        .post(url, {
          adPosition: code,
          shopId: shopid,
        })
        .then((res) => {
          if (res.code == 200) {
            this.banner = res.data;
            this.$emit('input', res.data);
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    //获取轮播图列表
    getCarouselList(code) {
      let url = '';
      if (this.type == 1) {
        url = '/coc-system/api/v1/system/dictionaries/banner/list';
      } else {
        url = '/coc-active/api/v1/four_s/bannerList';
      }

      this.$newrequest
        .post(url, {
          adPosition: code,
          shopId: this.shopId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.banner = res.data;
            this.$emit('input', res.data);
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    //点击轮播图
    clickswiper(index) {
      //#ifdef MP-WEIXIN
      if (!tologin()) {
        return false;
      }
      // #endif
      let info = Object.assign({}, this.banner[index]);
      // if (info.activityStatus == 2 && info.pageRoute == 'pages/home/activityDetail/index') {
      // 	uni.showToast({
      // 		title: '该活动已下架',
      // 		icon: 'none',
      // 		duration: 2000
      // 	})
      // 	return false
      // }
      if (info.type == 'video') {
        //如果是视频
        this.videoUrl = this.banner[index].url;
        this.videoContext = uni.createVideoContext('myVideo', this);
        // this.videoContext.requestFullScreen({
        // 	direction: 90
        // });
      } else {
        if (this.clickType == 1) {
          //跳转
          //#ifdef MP-WEIXIN
          let pageList = [
            'pages/home/index',
            'pages/home/integral',
            'pages/home/activityMall/index',
            'pages/home/my',
            'pages/home/4sShop',
          ];

          if (info.jumpType == 1 && info.pageRoute) {
            //内部小程序之间跳转

            if (info.jumpUrl) {
              if (pageList.findIndex((m) => m == info.pageRoute) >= 0) {
                uni.switchTab({
                  url: '/' + info.pageRoute + '?id=' + info.jumpUrl,
                });
              } else if (
                info.pageRoute == 'pages/carShops/carList/index?type=1' ||
                info.pageRoute == 'pages/carShops/carList/index?type=2'
              ) {
                uni.navigateTo({
                  url: '/' + info.pageRoute + '&id=' + info.jumpUrl,
                });
              } else {
                uni.navigateTo({
                  url: '/' + info.pageRoute + '?id=' + info.jumpUrl,
                });
              }
            } else {
              if (pageList.findIndex((m) => m == info.pageRoute) >= 0) {
                uni.switchTab({
                  url: '/' + info.pageRoute,
                });
              } else {
                uni.navigateTo({
                  url: '/' + info.pageRoute,
                });
              }
            }
          } else if (info.jumpType == 2 && info.jumpUrl) {
            //外部H5链接
            uni.navigateTo({
              url: '/pages/home/webview?url=' + info.jumpUrl,
            });
          }
          // #endif
        } else if (this.clickType == 2) {
          //放大图片
          if (info.type == 'image') {
            let urlList = [];
            let videoCount = 0;
            this.banner.forEach((data, dataindex) => {
              if (data.type == 'image') {
                urlList.push(data[this.urlkey]);
              } else if (data.type == 'video') {
                if (dataindex < index) {
                  videoCount++;
                }
              }
            });
            uni.previewImage({
              urls: urlList,
              current: index - videoCount,
            });
          }
        }
      }
    },
    //视频全屏状态监测
    fullscreenchange(e) {
      if (!e.detail.fullScreen) {
        this.videoUrl = null;
        this.videoContext = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.banner-top {
  border-radius: 10rpx;
  position: relative;
}

.showcount {
  padding: 8rpx 20rpx;
  // height: 40rpx;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10rpx;
  position: absolute;
  bottom: 22rpx;
  right: 25rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}

.indicator {
  @include flex(row);
  justify-content: center;

  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: #666666;
    margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #222222;
    }
  }
}

.preview-full {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 9999999999999999999;
}

.preview-full video {
  width: 100%;
  height: 100%;
  z-index: 999999999999999999999999;
}
</style>
