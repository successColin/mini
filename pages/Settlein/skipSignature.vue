<!--
 * @Descripttion: 签署页面
 * @Author: ytx
 * @Date: 2023-11-03 14:01:58
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-03 14:01:58
-->
<template>
  <view style="width: 100%; height: 100%">
    <u-loading-page
      v-if="showloading"
      loading-mode="spinner"
      :loading="showloading"
      bgColor="rgba(34,34,34,0.2)"
      color="white"
      loadingColor="white"
    ></u-loading-page>
    <web-view
      v-else
      :src="src"
      :webview-styles="webviewStyles"
      :update-title="false"
      @message="handleMessage"
      @load="handleLoad"
      @error="handleError"
    >
    </web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      umsRegId: '',

      src: '',
      showloading: true,

      webviewStyles: {
        height: '100%',
        width: '100%',
      },
    };
  },
  onBackPress(options) {
    console.log(options);
    // let pages = getCurrentPages()
    // 		let page = pages[pages.length - 1];
    // 		let currentPages = page.$getAppWebview()
    // 		let children = currentPages.children()
    // 		children[0].close()
    // 		setTimeout(() => {
    // 			uni.navigateBack()
    // 		}, 0)
  },
  mounted() {},
  onLoad(option) {
    this.umsRegId = option.umsRegId;
    this.getUrl();
  },
  methods: {
    handleLoad(e) {
      console.log('加载成功', e);
      // uni.showToast({
      //   title: '加载成功',
      //   icon: 'none',
      // });
    },
    handleError() {
      console.log('加载错误');
      uni.showToast({
        title: '加载错误，请重试！',
        icon: 'none',
      });
    },
    handleMessage() {
      console.log('网页返回');
      // uni.showToast({
      //   title: '网页返回',
      //   icon: 'none',
      // });
    },
    async getUrl() {
      await this.$request
        .get(
          `/coc-active/api/v1/merchantsettledin/signAContractMsg/${this.umsRegId}`
        )
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.src = res.data + '#wechat_redirect';
          } else {
            uni.navigateBack();
            uni.showToast({
              title: res.message,
              icon: 'none',
            });
          }
          this.showloading = false;
        });
    },
  },
};
</script>
<style lang='scss' scoped>
</style>
