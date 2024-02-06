<template>
	<view class="page">
		<template v-if="isshowpage">
			<scroll-view :scroll-y="true" :style="{maxHeight:scrollHeight}">
				<view class="top">
					<carousel v-if="banner.length>0" :list="banner" height="750rpx" urlkey="url" :dataType="1"
						:indicatorType="1" :clickType="2" :radius="0" :showCount="true" :autoPlay="autoPlay">
					</carousel>
					<view class="goodsinfo">
						<view class="goodsinfo-title">
							{{detail.name}}
						</view>
						<view class="goodsinfo-shopname">
							本商品由<text style="color: #D91B1B;">大昌汽车俱乐部有限公司</text>提供
						</view>
					</view>
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
							领取须知
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
				<view class="view" :style="{paddingBottom:'30rpx'}">
					<view class="bottom-btn-confirm" @click="openConfirm">
						立即领取
					</view>
				</view>
			</view>
			<u-popup :show="confirmVisble" mode="center" :safeAreaInsetBottom="false" round="16rpx"
				@close="closeConfirm">
				<view class="cancel_view">
					<view class="content flex alc">
						<view style="width: 100rpx;height: 100rpx;">
							<image class="img" :src="detail.titleImg"></image>
						</view>
						<view class="moreLine title">{{detail.name}}</view>
					</view>
					<view class="flex alc jsc" style="margin-top: 36rpx;text-align: center;">
						<view class="btn2" @click="submitOrder">确认</view>
					</view>
				</view>
			</u-popup>
		</template>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			carousel
		},
		computed: {
			scrollHeight() {
				return `calc(100vh - 96rpx - 30rpx)`
			}
		},
		onLoad(option) {
			this.params = {
				orderNo: option.orderNo ? option.orderNo : "",
				cuponNo: option.cuponNo ? option.cuponNo : "",
				orderOrg: option.orderOrg ? option.orderOrg : "",
				virtualGiftCode: option.virtualGiftCode ? option.virtualGiftCode : "",
				merchantUserName: option.merchantUserName ? option.merchantUserName : "",
				source: option.source ? option.source : "",
				currentTime: option.currentTime ? option.currentTime : ""
			}
			this.queryDetail()
		},
		data() {
			return {
				params: {
					orderNo: "", //订单号
					cuponNo: "", //兑换码
					orderOrg: "", //订单归属机构
					virtualGiftCode: "", //产品ID/权益编码
					merchantUserName: "", //商家用户名
					source: "", //环境app/wx
					currentTime: "" //时间戳
				},
				banner: [],
				selType: 1, //1:商品详情 2:领取须知
				detail: {},
				isshowpage: false,
				autoPlay: true,
				confirmVisble: false,
				isSubmit: false,
				totalNum: 5,
				curNum: 0,
				isConfirm: false
			}
		},
		methods: {
			//切换选项
			clickType(type) {
				this.selType = type
			},
			//查看详情
			queryDetail() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.post("/coc-active/api/v1/life_insurance/orderDetails", this.params)
					.then(res => {
						if (res.code == 200) {
							let data = res.data
							let newimglist = []
							if (data.images && data.images.length > 0) {
								data.images.forEach((m) => {
									newimglist.push({
										url: m,
										type: 'image'
									})
								})
							}
							this.banner = newimglist
							this.detail = data
							if (data.scoreOrderId) {
								uni.redirectTo({
									url: '/pages/integralMall/order/renbaoDetail?orderid=' + data.scoreOrderId
								})
							} else {
								if (this.isConfirm) {
									this.execTimer(1000)
								}
							}
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
			//打开商品提交框
			openConfirm() {
				if (this.detail.isExchange == 1) {
					uni.showToast({
						title: '已领取',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.confirmVisble = true
			},
			//关闭商品提交框
			closeConfirm() {
				this.confirmVisble = false
			},
			//提交订单
			submitOrder() {
				if (this.isSubmit) {
					return
				}
				if (this.detail.isExchange == 1) {
					uni.showToast({
						title: '已领取',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.isSubmit = true
				let msg = Object.assign({}, this.detail.orderDetailsDTO)
				msg.name = this.detail.name
				this.$newrequest.post("/coc-active/api/v1/life_insurance/exchange", msg)
					.then(res => {
						if (res.code == 200) {
							this.closeConfirm()
							uni.showToast({
								title: '领取成功',
								icon: 'none',
								duration: 3000,
								mask: true,
								success: () => {
									this.isConfirm = true
									setTimeout(() => {
										this.curNum = 0
										this.execTimer(0)
									}, 3000)
								}
							})
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(res => {
						this.isSubmit = false
					})
			},
			//执行定时
			execTimer(timer) {
				this.curNum++
				if (this.curNum <= this.totalNum) {
					setTimeout(() => {
						this.queryDetail()
					}, timer)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.goodsinfo {
		padding: 35rpx 28rpx 33rpx 26rpx;
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
			// margin-top: 15rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
			/* 这里是超出几行省略 */
		}

		.goodsinfo-shopname {
			font-size: 20rpx;
			font-family: PingFang SC;
			// font-weight: 500;
			color: #999999;
			margin-top: 20rpx;
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
		z-index: 9999;
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

	.cancel_view {
		width: 700rpx;
		text-align: center;
		padding: 60rpx 0 55rpx 0;
		background: #FFFFFF;
		border-radius: 16rpx;

		.content {
			padding: 0 50rpx 0 70rpx;
		}

		.title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			margin-left: 20rpx;
			height: 80rpx;
			// line-height: 85rpx;
		}

		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 10rpx;
		}

		.btn2 {
			width: 200rpx;
			height: 60rpx;
			background: #D91B1B;
			border-radius: 38rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			color: #FFFFFF;
			text-align: center;
			line-height: 60rpx;
		}
	}

	::v-deep .u-navbar__content {
		background-color: transparent !important;
	}

	::v-deep .u-navbar__content__left {
		align-items: flex-start !important;
	}
</style>
