<template>
	<view class="page">
		<template v-if="isshowpage">
			<!-- #ifdef MP-WEIXIN -->
			<u-navbar>
				<view class="u-nav-slot" slot="left" style="display: flex;">
					<view class="navbar-left" :style="{height:menuHeight+'px',marginTop:menuTop+'px'}" @click="goback">
						<u-icon name="arrow-left" size="16" color="#222222"></u-icon>
						<!-- 				<u-icon name="home" size="20" color="#222222"></u-icon> -->
					</view>
				</view>
			</u-navbar>
			<!-- #endif -->
			<scroll-view :scroll-y="true" :style="{maxHeight:scrollHeight}">
				<view class="top" :style="{marginTop:statusBarHeight+'px'}">
					<carousel v-if="banner.length>0" :list="banner" height="750rpx" urlkey="url" :dataType="1"
						:indicatorType="1" :clickType="2" :radius="0" :showCount="true" :autoPlay="autoPlay">
					</carousel>
					<view class="goodsinfo">
						<view class="goodsinfo-top">
							<view class="goodsinfo-score">{{detail.exchangePrice}}</view>
							<view
								style="display: flex;align-items: center;justify-content: space-between;width: 100%;position: relative;top: -4px;">
								<view class="goodsinfo-score-suffix">积分</view>
								<text class="goodsinfo-price">{{detail.shopPrice}}元</text>
							</view>
						</view>
						<view class="goodsinfo-title">
							{{detail.name}}
						</view>
					</view>
				</view>
				<view  @click="jumpShopDetail" v-if="detail.shopId&&detail.source==1" class="shop-card">
					<view class="u-flex" style="align-items: center;">
						<view v-if="detail.baseHead">
							<u-avatar bg-color='f8f8f8' :src="detail.baseHead"></u-avatar>
						</view>
						<view v-else>
							<u-avatar bg-color='f8f8f8'  src="https://oss.dcqcjlb.com/51che_java_dev/20230214/file_1676338106065.png"></u-avatar>
						</view>
						<view style="margin-left: 16rpx;font-size: 28rpx;font-weight: bold;">
							{{detail.shopName}}
						</view>
					</view>
						<!--  #ifdef MP-WEIXIN  -->
					<view class="inshop">
						进店逛逛
					</view>
					<!--  #endif -->
				</view>
				<view class="middle">
					<view class="middle-item" @click="clickType(1)">
						<view class="middle-title" :style="{fontWeight:selType==1?'bold':'0'}">
							商品详情
						</view>
						<view style="height: 12rpx;"></view>
						<view v-if="selType==1" class="middle-line"></view>
						<view v-else style="height: 4rpx;"></view>
					</view>
					<view class="middle-item" @click="clickType(2)">
						<view class="middle-title" :style="{fontWeight:selType==2?'bold':'0'}">
							兑换须知
						</view>
						<view style="height: 12rpx;"></view>
						<view v-if="selType==2" class="middle-line"></view>
						<view v-else style="height: 4rpx;"></view>
					</view>
				</view>
				<view class="bottom">
					<view v-if="selType==1" class="bottom-detail">
						<u-parse :content="detail.detail"></u-parse>
					</view>
					<view v-if="selType==2" class="bottom-detail1">
						<u-parse :content="detail.exchangeKnow"></u-parse>
					</view>
				</view>
				<view style="height: 130rpx;"></view>
			</scroll-view>
	
			<view class="bottom-btn">
				<view class="view" :style="{paddingBottom:safeHeight>0?0:'25rpx'}">
					<view class="bottom-btn-confirm" @click="submitOrder">
						立即兑换
					</view>
				</view>
				<view class="safe-bottom-height"></view>
			</view>
		</template>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		onShareAppMessage(res) {
			return {
				title: this.detail.name,
				path: `/pages/integralMall/goods/detail?id=` + this.id,
				imageUrl: this.detail.titleImg
			};
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.detail.name,
				path: `/pages/integralMall/goods/detail?id=` + this.id,
				imageUrl: this.detail.titleImg
			}
		},
		components: {
			carousel
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			// 胶囊高度
			menuHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuHeight : 0
			},
			// 胶囊top
			menuTop() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuTop - this.statusBarHeight : 0
			},
			// 状态栏高度
			statusBarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').statusBarHeight : 0
			},
			scrollHeight() {
				return `calc(100vh - 96rpx - ${this.safeHeight}px)`
			}
		},
		onLoad(option) {
			//#ifdef H5
			if(option.token){
				uni.setStorage({
					key: 'token',
					data: option.token
				});
			}
			// #endif
			this.id = option.id
			this.queryDetail(option.id)
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight = data.height
			}).exec()
		},
		data() {
			return {
				id: '',
				banner: [],
				safeHeight: 0,
				selType: 1, //1:商品详情 2:兑换须知
				detail: {},
				isshowpage: false,
				autoPlay: false
			}
		},
		methods: {
			jumpShopDetail(item) {
				// #ifdef  MP-WEIXIN
			  uni.navigateTo({
			    url: '/pages/activityMall/business/index?id=' + this.detail.shopId
			  })
			  // #endif
			},
			//返回上一页/回到首页
			goback() {
				let routes = getCurrentPages()
				if (routes.length > 1) {
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
			},
			//切换选项
			clickType(type) {
				this.selType = type
			},
			//查看详情
			queryDetail(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.get("/coc-active/api/v2/score/shop/product/detail/" + id)
					.then(res => {
						if (res.code == 200) {
							let data = res.data
							let imglist = data.images.split(',')
							let newimglist = []
							if (imglist && imglist.length > 0) {
								imglist.forEach((m) => {
									newimglist.push({
										url: m,
										type: 'image'
									})
								})
							}
							if (data.video) {
								newimglist.unshift({
									url: data.video,
									type: 'video'
								})
								this.autoPlay = false
							} else {
								this.autoPlay = true
							}
							this.banner = newimglist
							this.detail = data
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(() => {
						if (!this.isshowpage) {
							this.isshowpage = true
							this.$hideLoading()
						}
					})
			},
			//提交订单
			submitOrder() {
				if (tologin() !== true) {
					return
				}
				uni.navigateTo({
					url: '/pages/integralMall/order/submit?id=' + this.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.navbar-left {
		width: 92rpx;
		// height: 64rpx;
		background: rgba(255, 255, 255, 0.68);
		border-radius: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.goodsinfo {
		padding: 35rpx 28rpx 43rpx 26rpx;
		background: #FFFFFF;

		.goodsinfo-top {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
		}

		.goodsinfo-score {
			font-size: 44rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
		}

		.goodsinfo-score-suffix {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
			margin-left: 8rpx;
		}

		.goodsinfo-price {
			font-size: 20rpx;
			font-family: PingFang SC;
			text-decoration: line-through;
			color: #999999;
			display: none;
		}

		.goodsinfo-title {
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-top: 15rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* 这里是超出几行省略 */
		}
	}
.shop-card{
	align-items: center;
	background: #FFFFFF;
	display: flex;
	padding: 25rpx;
	margin: 20rpx 0;
	justify-content: space-between;
	.inshop{
		border: 1rpx solid #D91B1B;
		border-radius: 24rpx;
		color: #D91B1B;
		font-size: 24rpx;
		padding: 10rpx;
	}
}
	.middle {
		padding: 36rpx 0 25rpx 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #EEEDFA;

		.middle-item {
			display: flex;
			// justify-content: center;
			align-items: center;
			flex-direction: column;
		}

		.middle-item:first-child {
			margin-right: 248rpx;
		}

		.middle-title {
			font-size: 28rpx;
			font-family: PingFang SC;
		}

		.middle-line {
			width: 36rpx;
			height: 4rpx;
			background: #D91B1B;
			border-radius: 2rpx;
		}
	}

	.bottom {
		padding: 50rpx 25rpx 70rpx 25rpx;
		background: #FFFFFF;

		.bottom-detail1 {
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #666666;
			white-space: pre-wrap;
		}
	}

	.bottom-btn {
		border-top: 1rpx #e7e7e7 solid;
		position: fixed;
		background-color: #ffffff;
		bottom: 0;
		width: 100%;
		padding-top: 25rpx;

		.view {
			display: flex;
			justify-content: center;
		}

		.bottom-btn-confirm {
			width: 400rpx;
			height: 70rpx;
			background: #D91B1B;
			border-radius: 35rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	::v-deep .u-navbar__content {
		background-color: transparent !important;
	}

	::v-deep .u-navbar__content__left {
		align-items: flex-start !important;
	}
</style>
