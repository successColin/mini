<template>
	<view class="page">
		<view class="top-tab">
			<u-tabs :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '28rpx',
          transform: 'scale(1.05)',
        }" :inactiveStyle="{
          fontSize: '28rpx',
        }" itemStyle="height:88rpx;width:320rpx" lineHeight="3" lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`"
				keyName="name" :list="tags" @click="OnClickTags">
			</u-tabs>
		</view>
		<template v-if="dataList.length>0">
			<view v-for="(item,index) in dataList" :key="index">
				<view class="card">
					<view class="u-flex ">
						<view v-if="type==1">
							<image style="width: 256rpx;height: 146rpx;border-radius: 10rpx;"
								:src="item.productCoverPicture">
							</image>
						</view>
						<view v-else>
							<image style="width: 146rpx;height: 146rpx;border-radius: 10rpx;"
								:src="item.productCoverPicture">
							</image>
						</view>
						<view style="position: relative;margin-left: 17rpx;">
							<view class="size28 fwb moreLine">
								{{item.productTitle}}
							</view>
							<view style="position: absolute;bottom: 0rpx;width: 400rpx;">
								<text class="size24 txtLighGray">消费金额</text><text class="mainRed size28">￥</text><text
									class="mainRed fwb" style="font-size: 40rpx;">{{item.paidMoney}}</text>
							</view>
						</view>
					</view>
					<view class="hr"></view>
					<view class="u-flex jsb alc">
						<view class="u-flex alc">
							<view>
								<view class="status-item">
									{{item.commissionStatusMsg}}
								</view>
							</view>
							<view class="mainRed size28 ml0">
								￥
							</view>
							<view style="font-size: 40rpx;" class="mainRed fwb ">
								{{item.commissionAmount}}
							</view>
						</view>
						<view class="u-flex ">
							<view class="txtLighGray size24">订单来源：{{item.sourceShopName}}</view>
							<view class="ml10">
								<u-avatar size="16" :src="item.sourceHeadImg"></u-avatar>
							</view>
						</view>
					</view>
					<view class="txtLighGray size24" style="margin-top: 25rpx;">
						订单时间：{{item.orderTime}}
					</view>
				</view>
			</view>
		</template>
		<view v-else class="tac mt50">
			<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
			</image>
			<view class="txtDarkGray">暂无订单</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isLoadMore: false,
				dataList: [],
				type: 5,
				current: 1,
				tags: [{
						name: '产品订单',
						index: 5
					},
					{
						name: '活动订单',
						index: 1
					}
				],
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onLoad() {
			this.getList()
		},
		onShow() {},
		methods: {
			getList() {
				this.$request.post("/coc-active/api/v1/expert/shop/commission/detail", {
					current: this.current,
					size: 20,
					orderType: this.type
				}).then(res => {
					if (res.code === 200) {
						if (res.data.records.length < 20) {
							this.isLoadMore = true
						}
						if (this.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			OnClickTags(e) {
				this.current = 1
				if (e.name == '活动订单') {
					this.type = 1
				} else if (e.name == '产品订单') {
					this.type = 5
				}
				this.getList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {}

	.top-tab {
		background-color: #ffffff;
		padding-bottom: 30rpx;
	}

	.card {
		margin: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 12rpx 25rpx 20rpx 12rpx;
	}

	.hr {
		margin: 10rpx 0;
		width: 100%;
		height: 1rpx;
		background: #F8F8F8;
	}

	.status-item {
		width: 72rpx;
		height: 32rpx;
		border: 1px solid #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 32rpx;
		font-size: 20rpx;
		color: #D91B1B;
	}
</style>
