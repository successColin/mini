<template>
  <view class="page">
    <view v-if="isshowpage">
      <view style="text-align: center; margin-top: 15rpx">
        <image
          @click="watchimg(imglist[index])"
          style="width: 473rpx; height: 726rpx; border-radius: 15rpx"
          :src="imglist[index]"
        ></image>
      </view>
      <view class="wenan">
        {{ dataList[index].inviteText }}
      </view>
      <view class="btn" @click="Oncopy(dataList[index].inviteText)">
        复制文案
      </view>
    </view>
    <view class="bottom-card">
      <view>
        <scroll-view class="scroll-view_H" scroll-x="true">
          <view class="u-flex">
            <view
              v-for="(item, index) in imglist"
              :key="index"
              style="margin-right: 23rpx"
            >
              <image
                @click="OnChooseImg(index)"
                style="width: 123rpx; height: 184rpx; border-radius: 8rpx"
                :src="item"
              ></image>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="u-flex jsc mt20">
        <view>
          <button class="botton-none" open-type="share">
            <view class="u-flex alc">
              <image
                style="width: 54rpx; height: 54rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685060753642.png"
              >
              </image>
              <view class="ml10 size24">微信好友</view>
            </view>
          </button>
        </view>
        <view @click="OnSaveImage" class="u-flex" style="margin-left: 120rpx">
          <view>
            <button class="botton-none">
              <image
                style="width: 54rpx; height: 54rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685061767859.png"
              >
              </image>
            </button>
          </view>
          <view class="ml10 mt10">保存相册</view>
        </view>
      </view>
    </view>
    <request-loading></request-loading>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      index: 0,
      imglist: [],
      dataList: [],
      isshowpage: false,
    };
  },
  onShareAppMessage(res) {
    let title = uni.getStorageSync('nickname') + '邀请您入驻51车俱乐部';
    return {
      title,
      imageUrl:
        'https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693017266630.jpg',
      path:
        `/pages/Settlein/welcomevue?sourceType=1&operateId=` +
        uni.getStorageSync('userId') +
        '&enter=117',
      success(res) {
        //console.log('success(res)==', res);
        uni.showToast({
          title: '分享朋友成功',
        });
      },
      fail(res) {
        //console.log('fail(res)==', res);
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
      title: uni.getStorageSync('nickname') + '邀请您入驻51车俱乐部',
      imageUrl:
        'https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693017266630.jpg',
      path:
        `/pages/Settlein/welcomevue?sourceType=1&operateId=` +
        uni.getStorageSync('userId') +
        '&enter=117',
      success(res) {
        //console.log('success(res)==', res);
        uni.showToast({
          title: '分享朋友圈成功',
        });
      },
      fail(res) {
        //console.log('fail(res)==', res);
        uni.showToast({
          title: '分享朋友圈失败',
          icon: 'none',
        });
      },
    };
  },
  onLoad() {
    this.getList();
  },
  onShow() {},
  methods: {
    OnSaveImage() {
      let _this = this;
      uni.showToast({
        title: '正在保存中',
        icon: 'loading',
      });
      uni.downloadFile({
        url: _this.imglist[_this.index],
        success: (res) => {
          if (res.statusCode === 200) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: function () {
                uni.$u.toast('保存下载成功');
              },
              fail: function () {
                uni.$u.toast('保存失败，请稍后重试');
              },
            });
          } else {
            uni.$u.toast('下载失败');
          }
        },
      });
    },
    OnChooseImg(index) {
      this.index = index;
    },
    Oncopy(value) {
      uni.setClipboardData({
        data: value,
        success: function () {
          uni.$u.toast('复制成功');
        },
      });
    },
    watchimg(img) {
      let value = [img];
      uni.previewImage({
        current: 99999,
        urls: value,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {
            console.log(
              '选中了第' +
                (data.tapIndex + 1) +
                '个按钮,第' +
                (data.index + 1) +
                '张图片'
            );
          },
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    getList() {
      if (!this.isshowpage) {
        this.$showLoading();
      }
      this.$request
        .post('/coc-active/api/v1/newExpert/invite/newList', {
          type: 2,
        })
        .then((res) => {
          this.dataList = res.data;
          res.data.filter((s) => {
            this.imglist.push(s.img);
          });
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
}

.wenan {
  margin: 28rpx 25rpx;
  font-size: 28rpx;
  color: #666666;
}

.btn {
  width: 169rpx;
  height: 54rpx;
  background: #ffffff;
  border-radius: 123rpx;
  opacity: 1;
  text-align: center;
  line-height: 54rpx;
  font-size: 26rpx;
  margin: 0 auto;
}

.bottom-card {
  position: fixed;
  bottom: 0rpx;
  background-color: #ffffff;
  padding: 20rpx 24rpx 50rpx 24rpx;
  width: 700rpx;
}

.botton-none {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
}

.botton-none::after {
  border: none;
}
</style>
