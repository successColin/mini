<template>
	<view class="page">
    <view class="pageContainer">
      <view class="noticeList">
        <view class="listItem " v-for="item in noticeList" :key='item.id' >
          <view class="noticeH">{{item.title}}</view>
          <view class="noticeCont">{{item.content}}</view>
          <view class="noticeT">{{item.updatedAt}}</view>
        </view>
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
	export default {
    data() {
			return {
        noticeList: [],
        pageTotal: 1,
        current: 1,
        isLoadMore: false
			}
		},
		onLoad() {
      this.getNoticeList()
    },
		onShow() {},
    onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
        if (this.current < this.pageTotal) {
          this.isLoadMore = true  
          this.getNoticeList();
        }
			}
		},
		methods: {
      getNoticeList() {
        this.$newrequest.post('/coc-system/api/v1/system/base_info/list',{type: 1}).then(res => {
          res.data.forEach(v =>{
            this.noticeList.push(v)
          })
          this.isLoadMore = false
				})
      }
		} 
	}
</script>
<style lang="scss" scoped>
  .pageContainer {
    padding: 25rpx;
  }
  .listItem {
    margin-bottom: 10rpx;
    background-color: #fff;
    padding: 40rpx 25rpx  35rpx;
    font-size: 24rpx;
    border-radius: 10rpx;
    .noticeH{
      font-size: 32rpx;
      font-weight: bold;
    }
    .noticeCont{
      font-size: 24rpx;
      margin-top: 30rpx;
      line-height: 1.5;
    }
    .noticeT {
      font-size: 24rpx;
      color: #999;
      margin-top: 10rpx;
    }
  }
</style>

