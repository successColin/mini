<template>
  <view class="page pageContainer">
    <!-- 广告位轮播 -->
    <carousel :topClass="['activity-img']" height="130px" urlkey="url" :autoPlay="false" :dataType="2"
      :systemCode="queryUrl" :indicatorType="4" :clickType="clickType">
    </carousel>
    <view class="select">
      <view class="u-flex-al">
        <view class="u-flex-al" @click="openSearch" style="width: 152rpx;justify-content: flex-end;">
          <view class="text ellipsis" style="max-width: 120rpx;">
            {{ queryData.goodCategoryName ? queryData.goodCategoryName : '商品分类' }}
          </view>
          <view style="margin-left: 15rpx;">
            <u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
          </view>
        </view>
        <view class="sortline"></view>
        <view class="u-flex-al" @click="choiceSort">
          <view class="text">积分排序</view>
          <image :src="queryData.sort == 2 ? require('@/static/image/xzDown.png') : require('@/static/image/xzUp.png')"
            class="choiceIcon"></image>
        </view>
      </view>
    </view>
    <GoodlList :proList.sync="proList"></GoodlList>
    <u-loading-icon text="正在加载..." textSize="14" :show="isLoadMore" style="padding:15rpx 0;"></u-loading-icon>
    <view class="reachBottom" v-show="isReachBottom">我到底了~</view>
    <u-toast ref="uToast"></u-toast>
    <u-popup :show="searchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
      mode="top">
      <view :style="{ height: navbarHeight + 'px' }"></view>
      <view class="top-search">
        <text class="top-search-title" style="margin-bottom: 35rpx;">商品分类</text>
        <view class="top-search-btn-view">
          <view class="top-search-btn" @click="search('')"
            :style="{ color: queryData.type == '' ? '#D91B1B' : '#222222', background: queryData.type == '' ? '#FFF1F1' : '#F8F8F8' }">
            <text class="top-search-btn-text ellipsis">全部</text>
          </view>
          <view v-for="(item, index) in gradTags" :key="index" class="top-search-btn" @click="search(item.id)"
            :style="{ color: queryData.type == item.id ? '#D91B1B' : '#222222', background: queryData.type == item.id ? '#FFF1F1' : '#F8F8F8' }">
            <text class="top-search-btn-text ellipsis">{{ item.title }}</text>
          </view>
        </view>
        <view class="u-flex top-search-confirm" @click="confirmSearch">
          <view class="top-search-confirm-text">完成</view>
        </view>
      </view>
    </u-popup>
    <view v-if="showEmpty">
      <view style="margin-top: 100rpx;text-align: center;">
        <image style="width: 350rpx;height: 280rpx;"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
        </image>
      </view>
      <view style="font-size: 24rpx;color: #999999;text-align: center;">
        暂无商品
      </view>
    </view>
  </view>
</template>

<script>
import GoodlList from '@/components/goodList/goodList.vue'
import { shareMixin } from "@/mixin/share.js"
import carousel from "@/components/carousel/index.vue"
export default {
  mixins: [shareMixin],
  components: {
    GoodlList, carousel
  },
  data() {
    return {
      proList: [],
      searchVisble: false,
      banner: [],
      queryData: {
        size: 10,
        sort: 1, //1:积分正序排序  2:倒叙排序
        current: 1,
        tagsId: '',//跳转进来的标签id
        type: '',//分类
      },
      pageTotal: 1,
      gradTags: [],
      searchField: {},
      bigTypeName: '',
      queryUrl: '',
      isReachBottom: false,
      isLoadMore: false,
      showEmpty: false,
	  clickType: 1
    }
  },

  onLoad(options) {
	//#ifdef H5
	this.clickType = 3
	if(options.token){
		uni.setStorage({
			key: 'token',
			data: options.token
		});
	}
	// #endif
    let bigType = JSON.parse(options.item)
    this.bigTypeName = bigType.title
    this.queryData.tagsId = bigType.id
    uni.setNavigationBarTitle({
      title: bigType.title,
    })
    this.getTypes()
    this.getbanner()
    this.getGoodList()
    uni.showLoading({
      title: '加载中...'
    });
  },
  onShow() { },
  onReachBottom() {
    if (this.queryData.current < this.pageTotal) {
      this.queryData.current++  
      this.isLoadMore = true
      this.isReachBottom = false
      this.getGoodList();
    } else {
      this.isLoadMore = false
      this.isReachBottom = true
    }
  },
  methods: {
    getbanner() {
      let queryUrl = ''
      if (this.bigTypeName == '51优选') {
        queryUrl = "applets_51_preferably"
      } else if (this.bigTypeName == '超值优惠') {
        queryUrl = "applets_premium_offer"
      } else if (this.bigTypeName == '低分秒杀') {
        queryUrl = "applets_low_second_kill"
      } else if (this.bigTypeName == '网红热兑') {
        queryUrl = "applets_online_hot_exchange"
      }
      this.queryUrl = queryUrl
      this.$newrequest.post('coc-my/banner/list', {
        layoutTypeId: '8',
        current: 1,
        size: 99
      }).then(res => {
        this.banner = res.data.records
      })
    },
    clickswiper(index) {
      let url = this.banner[index].jumpUrl
      if (!url) {
        return false
      }
      uni.navigateTo({
        url: '/pages/home/webview?url=' + url
      })
    },
    getTypes() {
      this.$newrequest.post('/coc-system/api/v1/system/base_info/list', { type: 3 }).then(res => {
        this.gradTags = res.data
      })
    },
    getGoodList() {
      this.$newrequest.post("/coc-active/api/v2/score/shop/product/list", this.queryData).then(res => {
        this.pageTotal = res.data.pages
        this.isReachBottom = false
        this.showEmpty = false
        if (res.data.records.length) {
          res.data.records.forEach(v => {
            this.proList.push(v)
          })
        }
        if(!res.data.total){
          this.showEmpty = true
        }
        if(this.pageTotal == res.data.pages && res.data.records.length <= this.queryData.size){
          this.isLoadMore = false
        }
        uni.hideLoading()
      })
    },
    // 积分排序
    choiceSort() {
      this.proList = []
      if (this.queryData.sort == 2) {
        this.queryData.sort = 1
        this.queryData.current = 1
        this.getGoodList()
      } else if (this.queryData.sort == 1) {
        this.queryData.sort = 2
        this.queryData.current = 1
        this.getGoodList()
      }
    },
    openSearch() {
      this.searchVisble = true
    },
    search(tipid) {
      this.queryData.type = tipid
    },
    //关闭筛选框
    closeSearch() {
      this.searchVisble = false
    },
    confirmSearch() {
      this.queryData.current = 1
      this.proList = []
      this.getGoodList()
      this.searchVisble = false
    }
  }
}
</script>

<style lang="scss" scoped>
.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select {
  margin: 30rpx 0 40rpx;
}

.u-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.sortline {
  width: 1px;
  height: 26rpx;
  background-color: #999999;
}

.u-flex-al {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.list {
  padding: 20rpx;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: flex-start;

  .card {
    border-radius: 16rpx;
    background-color: #ffffff;
    width: 345rpx;
    margin-top: 20rpx;
  }
}

.top-search {
  padding: 42rpx 0 0 50rpx;

  .top-search-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #222222;
    display: inline-block;
  }

  .top-search-btn-view {
    width: 100%;
    display: table;
  }

  .top-search-btn {
    width: 200rpx;
    height: 60rpx;
    border-radius: 10rpx;
    float: left;
    margin-right: 16rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
  }

  .top-search-btn-text {
    font-size: 24rpx;
    font-weight: 500;
  }

  .top-search-confirm {
    display: block;
    width: 260rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #D91B1B;
    border-radius: 40rpx;
    margin: 70rpx auto;
    text-align: center;
    position: relative;
    right: 36rpx;
  }

  .top-search-confirm-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}

.cardBox {
  background: #fff;
  border-radius: 10rpx;
  margin-top: 20rpx;
  padding: 0 20rpx;
  box-sizing: border-box;
}

.choiceIcon {
  width: 12rpx;
  height: 22rpx;
  margin-left: 10rpx;
}
.pageContainer{
  padding-bottom: 20rpx;
}
.reachBottom {
  text-align: center;
  margin-top: 20rpx;
}
</style>
