<template>
  <view class="page">
    <view class="search-top">
      <!--  #ifdef APP-PLUS  -->
      <u-navbar :autoBack="true">
        <view class="u-nav-slot" slot="center">
          <view>
            {{ title }}
          </view>
        </view>
      </u-navbar>
      <!--  #endif -->
      <!--  #ifdef MP-WEIXIN  -->
      <u-navbar :autoBack="true">
        <view class="u-nav-slot search-top" slot="center">
          <view style="position: relative; right: 50rpx">
            {{ title }}
          </view>
        </view>
      </u-navbar>
      <!--  #endif -->
    </view>
    <view style="margin-top: 26%"></view>
    <!-- type： 1等于企业，2为个体 -->
    <!-- isLineLedger：1等于个体工商户，0为企业工商户 -->
    <view v-if="type == 1" class="item-img">
      <!-- 线上企业 -->
      <image
        v-if="isLineLedger == 1"
        mode="widthFix"
        style="width: 700rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231017/file_1697524261159.png"
      >
      </image>
      <!-- 线下企业 -->
      <view v-else-if="isLineLedger == 0">
        <!-- 1 到 7 -->
        <image
          mode="widthFix"
          style="width: 700rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697769810195.png"
        >
        </image>
        <!-- 8 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697767986694.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(1)">
            模板下载
          </div>
        </div>
        <!-- 9 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697768001297.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(2)">
            模板下载
          </div>
        </div>

        <div class="contentTxet">如非法人直接签约还需另外提供如下材料:</div>
        <!-- 1 -->
        <div>
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697770352842.png"
          >
          </image>
        </div>
        <!-- 2 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697768430759.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(3)">
            模板下载
          </div>
        </div>
      </view>
    </view>
    <view v-else class="item-img">
      <!-- 线上个体工商户 -->
      <image
        v-if="isLineLedger == 1"
        mode="widthFix"
        style="width: 700rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231101/file_1698817007949.png"
      >
      </image>
      <!-- 线下个体 -->
      <view v-else-if="isLineLedger == 0">
        <!-- 1 到 7 -->
        <image
          mode="widthFix"
          style="width: 700rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697787258674.png"
        >
        </image>
        <!-- 8 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697767986694.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(1)">
            模板下载
          </div>
        </div>
        <!-- 9 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697768001297.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(2)">
            模板下载
          </div>
        </div>

        <div class="contentTxet">如非法人直接签约还需另外提供如下材料:</div>
        <!-- 1 -->
        <div>
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697770352842.png"
          >
          </image>
        </div>
        <!-- 2 -->
        <div class="contentbox">
          <image
            mode="widthFix"
            style="width: 700rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697768430759.png"
          >
          </image>
          <div class="contentbox__button" @click="handleDownload(3)">
            模板下载
          </div>
        </div>
      </view>
    </view>
    <view class="bottom-next">
      <text @click="OnNext">我准备好了</text>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      title: '',
      type: 1,
      sourceType: null,
      operateId: null,
      affiliationType: null,
      isLineLedger: null,
      dataDisplay: '',
    };
  },

  onLoad(option) {
    this.type = option.type;
    if (option.type == 1) {
      this.title = '企业入驻需上传资料模板';
    } else {
      this.title = '个体工商户入驻需上传资料模板';
    }
    if (option.sourceType) {
      this.sourceType = option.sourceType;
    }
    if (option.operateId) {
      this.operateId = option.operateId;
    }
    if (option.operateId) {
      this.operateId = option.operateId;
    }
    if (option.affiliationType) {
      this.affiliationType = option.affiliationType;
    }
    if (option.isLineLedger) {
      this.isLineLedger = option.isLineLedger;
    }
    if (option.settleType) {
      this.settleType = option.settleType;
    }
  },
  onShow() {},
  methods: {
    OnNext() {
      console.log(this.settleType);
      if (this.type == 1) {
        uni.navigateTo({
          url:
            '/pages/Settlein/uploadEnterprise?shopType=3' +
            '&affiliationType=' +
            this.affiliationType +
            '&operateId=' +
            this.operateId +
            '&sourceType=' +
            this.sourceType +
            '&isLineLedger=' +
            this.isLineLedger +
            '&settleType=' +
            this.settleType,
        });
      } else {
        uni.navigateTo({
          url:
            '/pages/Settlein/uploadIndividual?shopType=3' +
            '&affiliationType=' +
            this.affiliationType +
            '&operateId=' +
            this.operateId +
            '&sourceType=' +
            this.sourceType +
            '&isLineLedger=' +
            this.isLineLedger +
            '&settleType=' +
            this.settleType,
        });
      }
    },
    handleDownload(type) {
      let url = '';
      if (type === 1) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231017/1697532676171_%E8%A1%8C%E4%B8%9A%E6%88%90%E5%91%98%E8%B5%84%E9%87%91%E7%AE%A1%E7%90%86%E6%8E%88%E6%9D%83%E7%A1%AE%E8%AE%A4%E4%B9%A6.png';
      } else if (type === 2) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231017/1697532682706_%E6%8E%88%E6%9D%83%E4%B8%8E%E6%9C%8D%E5%8A%A1%E8%B4%B9%E7%94%A8%E7%A1%AE%E8%AE%A4%E4%B9%A6.png';
      } else if (type === 3) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231017/1697532696280_%E9%93%B6%E8%81%94%E7%89%B9%E7%BA%A6%E5%95%86%E6%88%B7%E6%8E%88%E6%9D%83%E4%B9%A6.png';
      }
      uni.downloadFile({
        url,
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
  },
};
</script>

<style lang="scss">
.page {
}

.item-img {
  text-align: center;
  margin-top: 40rpx;
}

.bottom-next {
  text-align: center;
  margin: 60rpx 0;

  text {
    display: inline-block;
    border-radius: 40rpx;
    width: 600rpx;
    height: 80rpx;
    background-color: #d91b1b;
    text-align: center;
    line-height: 80rpx;
    color: #ffffff;
    font-size: 34rpx;
    font-weight: 400;
    margin-bottom: 60rpx;
  }
}

.contentTxet {
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #d91b1b;
  margin: 30rpx 25rpx;
  text-align: left;
}

.contentbox {
  position: relative;

  &__button {
    position: absolute;
    right: 45rpx;
    bottom: 25rpx;
    width: 116rpx;
    height: 52rpx;
    line-height: 52rpx;
    background: #d91b1b;
    border-radius: 10rpx;
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
