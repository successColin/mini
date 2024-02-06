<template>
  <view class="page" v-if="isshowpage">
    <!-- 顶部广告栏 -->
    <carousel v-if="swiperList.length > 0" :list="swiperList" height="400rpx" urlkey="url" :dataType="1"
      :indicatorType="1" :clickType="2" :radius="0" :showCount="true" :autoPlay="autoPlay">
    </carousel>
    <!--  -->
    <view class="mb10 bgfff infoH">
      <view class="detailH size32 fwb">{{ infoData.title }}</view>
      <view class="flex jsb alc size24 txtLighGray">
        <view>发布人：{{ infoData.shopName }}</view>
        <view>发布时间：{{ infoData.createdAt }}</view>
      </view>
    </view>
    <!-- 详情 -->
    <view class="contentInfo">
      <u-parse :content="infoData.content"></u-parse>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
export default {
  components: {
    carousel
  },
  data() {
    return {
      swiperList: [],
      bannercurrent: 0,
      infoData: {},
      autoPlay: false,
      isshowpage: false
    }
  },

  onLoad(option) {
    this.getDetail(option.id)
  },

  methods: {
    onShareAppMessage(res) {
      let imageUrl = this.infoData.shareImage ? this.infoData.shareImage : this.nfoData.coverImg
      return {
        title: this.infoData.title,
        path: `/pages/carShops/upkeep/brandInfo?id=${this.infoData.id}&enter=117`,
        imageUrl: imageUrl,
        success(res) {
					uni.showToast({
						title: '分享朋友成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享朋友失败',
						icon: 'none'
					})
				}
      };
    },
    onShareTimeline(res) { //分享到朋友圈
      let imageUrl = this.infoData.shareImage ? this.infoData.shareImage : this.nfoData.coverImg
      return {
        title: this.infoData.title,
        path: `/pages/carShops/upkeep/brandInfo?id=${this.infoData.id}&enter=117`,
        imageUrl: imageUrl,
        success(res) {
					uni.showToast({
						title: '分享朋友圈成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享朋友圈失败',
						icon: 'none'
					})
				}
      }
    },
    //点击轮播图
    clickswiper(index) {
      let url = this.banner[index].jumpUrl
      if (!url) {
        return false
      }
      uni.navigateTo({
        url: '/pages/home/webview?url=' + url
      })
    },
    getDetail(id) {
      if (!this.isshowpage) {
        this.$showLoading()
      }
      this.$newrequest.post("/coc-active/api/v1/bank/news/details",{
		  id:id
	  }).then(res => {
        let swiperList = []
        if (res.data.imgs) {
          let curlist = res.data.imgs.split(',')
          curlist.forEach(function (data) {
            swiperList.push({
              url: data,
              type: 'image'
            })
          })
        }
        if (res.data.video) {
          swiperList.unshift({
            url: res.data.video,
            poster: res.data.videoImg ||  + res.data.video + '?x-oss-process=video/snapshot,t_1000,m_fast',
            type: 'video'
          })
          this.autoPlay = false
        }else {
          this.autoPlay = true
        }
        this.swiperList = swiperList
        this.infoData = res.data
      }).catch(err => {

      }).finally(() => {
        if (!this.isshowpage) {
          this.isshowpage = true
          this.$hideLoading()
        }
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.infoH {
  padding: 40rpx 25rpx;

  .detailH {
    line-height: 50rpx;
    margin-bottom: 30rpx;
  }
}

.contentInfo {
  padding: 25rpx;
  background-color: #fff;
}

.swiper {
  width: 100%;
  height: 400rpx;

}
</style>
