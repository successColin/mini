<!--
 * @Descripttion: 视频封面
 * @Author: ytx
 * @Date: 2023-12-06 14:25:30
 * @Last Modified by: ytx
 * @Last Modified time: 2023-12-06 14:25:30
-->
<template>
  <div class="cover">
    <div
      class="cover__back"
      :style="[{ top: statusBarHeight }]"
      @click="handleiBack"
    >
      <u-icon name="arrow-left" color="#FFFFFF"></u-icon>
    </div>

    <div :style="[{ marginTop: blankHeight }]"></div>
    <!-- 图片 -->
    <div class="cover__img" :style="[{ height: imgHeight }]">
      <image :src="showImage" mode="aspectFit" style="height: 100%"></image>
    </div>

    <!-- 选择封面 -->
    <div class="cover__select">
      <view class="cover__select--title">
        设置封面
        <div class="cover__select--title--ok" @click="handleOk">
          <u-icon name="checkbox-mark" color="#FFFFFF" size="40rpx"></u-icon>
        </div>
      </view>
      <div class="cover__tabs">
        <div
          class="cover__tabs--item"
          v-for="(item, i) in list"
          :key="i"
          :class="current === i ? 'tabselect' : ''"
          @click="handleTabs(i)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="cover__update">
        <div v-if="current === 0">
          <scroll-view
            scroll-x="true"
            :scroll-into-view="scrollTo"
            scroll-with-animation
            @scroll="handleScroll"
          >
            <div style="display: flex; flex-wrap: nowrap">
              <div class="cover__update--white" id="resset"></div>
              <image
                v-for="(item, i) in time"
                class="cover__update--image"
                :key="i"
                :style="[imageStyle]"
                :src="`${videoUrl}?x-oss-process=video/snapshot,t_${i}000,ar_auto`"
              ></image>
              <div class="cover__update--white"></div>
            </div>
          </scroll-view>
          <div class="cover__update--line"></div>
          <div class="cover__update--dec">左右滑动可选择封面</div>
        </div>
        <div
          v-else-if="coverImg"
          style="display: flex; flex-direction: column; align-items: center"
          @click="uploadImg"
        >
          <image :style="[imageStyle]" :src="coverImg"></image>
          <!-- <div class="cover__update--dec">点击替换</div> -->
        </div>
      </div>
      <!-- 重置 -->
      <div class="cover__reset">
        <div class="cover__reset--btn" @click="handleReset">
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20231207/file_1701913817723.png"
          ></image>
          {{ current === 0 ? '重置' : '点击替换' }}
        </div>
      </div>
    </div>
    <a-compress ref="compress"></a-compress>
  </div>
</template>

<script>
import ACompress from '@/components/samllTool/ACompress.vue';
import { statusBarHeight } from '@/config/index';
export default {
  onLoad(option) {
    console.log(option);
    this.time = Math.floor(option.time);
    this.videoUrl = option.url;
  },
  data() {
    return {
      time: 0,
      videoUrl: '',
      coverImageType: 2, // 1-横屏；2-竖屏
      imageSize: 60,
      urlParams: '?x-oss-process=video/snapshot,t_0,ar_auto',
      coverImg: '',

      scrollTo: 'resset',
      current: 0,
      list: [
        {
          name: '视频帧',
        },
        {
          name: '相册导入',
        },
      ],
    };
  },
  components: {
    ACompress,
  },
  computed: {
    imageStyle() {
      return {
        width: this.imageSize * 2 + 'rpx',
        height: this.imageSize * 2 + 'rpx',
      };
    },
    blankHeight() {
      return `calc(${this.statusBarHeight} + 80rpx)`;
    },
    imgHeight() {
      // calc(100vh - 644rpx)
      return `calc(100vh - 644rpx - ${this.statusBarHeight} - 80rpx)`;
    },
    statusBarHeight() {
      return statusBarHeight;
    },
    showImage() {
      if (this.current === 1 && this.coverImg) {
        console.log(this.coverImg);
        return this.coverImg;
      }
      return this.videoUrl + this.urlParams;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    handleiBack() {
      uni.navigateBack();
    },
    handleOk() {
      // var pages = getCurrentPages();
      // var prevPage = pages[pages.length - 2];
      // prevPage.$vm.giveParams(params);
      uni.navigateBack({
        success: () => {
          const params = {
            coverImageType: this.coverImageType,
            showImage: this.showImage,
          };
          uni.$emit('getCover', params);
        },
      });
    },
    handleScroll(e) {
      const left = e.detail.scrollLeft;
      const i = Math.floor(left / this.imageSize);
      this.urlParams = `?x-oss-process=video/snapshot,t_${i * 1000},ar_auto`;
    },
    handleTabs(i) {
      console.log(i);
      this.current = i;
      if (i === 1 && this.coverImg === '') {
        // 上传
        this.uploadImg();
      }
    },
    // 上传方法
    uploadImg() {
      let _this = this;
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        // sourceType: this.sourceType, // 从相册选择
        success: (res) => {
          let url = res.tempFilePaths[0];
          console.log(url);
          wx.getImageInfo({
            src: url,
            success: function (res) {
              const { height, width } = res;
              // 1-横屏；2-竖屏
              if (width / height > 1) {
                _this.coverImageType = 1;
              } else {
                _this.coverImageType = 2;
              }
            },
          });
          this.$refs.compress
            .start(url)
            .then((url) => {
              url = url;
              uni.uploadFile({
                url: getApp().globalData.uploadUrl,
                filePath: url,
                name: 'file',
                formData: {
                  file: url,
                },
                header: {
                  'Content-Type': 'multipart/form-data',
                },
                fail: () => {
                  uni.showToast({
                    title: '上传失败',
                    icon: 'none',
                  });
                },
                success: (v) => {
                  console.log(v);
                  this.coverImg = JSON.parse(v.data).data;
                },
              });
            })
            .catch(() => {
              uni.$u.toast('图片压缩失败');
            });
        },
      });
    },
    handleReset() {
      if (this.current === 0) {
        this.scrollTo = '';
        this.$nextTick(() => {
          this.scrollTo = 'resset';
          this.urlParams = '?x-oss-process=video/snapshot,t_0,ar_auto';
        });
      } else {
        this.uploadImg();
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.cover {
  position: relative;
  height: 100vh;
  background: #111111;
  overflow: hidden;

  &__back {
    position: absolute;
    left: 25rpx;
    padding: 25rpx;
  }

  &__img {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__select {
    // height: 631rpx;
    background: #333333;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    position: fixed;
    width: 100%;
    bottom: 0;

    &--title {
      position: relative;
      height: 110rpx;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);

      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;

      &--ok {
        position: absolute;
        right: 50rpx;
      }
    }
  }

  &__tabs {
    display: flex;
    align-items: center;
    justify-content: center;
    &--item {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      padding: 40rpx 50rpx;
      position: relative;
    }
  }
  &__update {
    position: relative;
    height: 240rpx;
    &--image {
      flex-shrink: 0;
    }
    &--dec {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &--line {
      width: 4rpx;
      height: 142rpx;
      background: #ffffff;
      border-radius: 2rpx 2rpx 2rpx 2rpx;
      position: absolute;
      left: 50%;
      top: -11rpx;
    }
    &--white {
      width: 50%;
      flex-shrink: 0;
    }
  }
  &__reset {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-bottom: 80rpx;
    &--btn {
      display: flex;
      flex-direction: column;
      padding: 0 30rpx;
      justify-content: center;
      align-items: center;
    }
    image {
      width: 44rpx;
      height: 44rpx;
      margin-bottom: 20rpx;
    }
  }
}
.tabselect {
  font-weight: bold;
  color: #ff4d4d;
}
.tabselect::before {
  position: absolute;
  content: '';
  display: bolck;
  width: 23rpx;
  height: 4rpx;
  background-color: #ff4d4d;
  margin-right: 10rpx;
  position: absolute;
  bottom: 28rpx;
  left: 50%;
  transform: translateX(-11.5rpx);
  border-radius: 4rpx;
}
</style>
