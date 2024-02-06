<template>
	<view class="page">
		<template v-if="isshowpage">
			<view @click="OnChangeAddress" class="harvest-address-no" v-if="detail.commodityType==2&&!isdefaultaddress">
				<view>
					您尚未设置收货地址请先设置
				</view>
				<view>
					<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
				</view>
			</view>
			<view @click="OnChangeAddress" v-else-if="detail.commodityType==2&&isdefaultaddress"
				class="harvest-address">
				<view style="display: flex;align-items: center;">
					<view>
						<u-icon :bold='true' size="12" name="map" color="#222222"></u-icon>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							<text>
								{{defaultaddress.name}}
							</text>
							<text style="margin-left: 28rpx;">
								{{defaultaddress.mobile}}
							</text>
						</view>
						<view style="font-size: 24rpx;margin-top: 20rpx;color: #222222;">
							{{defaultaddress.addressDetail}}
						</view>
					</view>
				</view>
				<view>
					<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
				</view>
			</view>

			<view class="goodsinfo">
				<view class="goodsinfo-left">
					<image class="goodsinfo-left-img" :src="detail.titleImg">
					</image>
				</view>
				<view class="goodsinfo-right">
					<view class="goodsinfo-right-title">
						{{detail.name}}
					</view>
					<view class="goodsinfo-right-bottom">
						<view class="goodsinfo-right-score">
							{{detail.exchangePrice}}
						</view>
						<view class="goodsinfo-right-score-suffix-view">
							<view class="goodsinfo-right-score-suffix">
								积分
							</view>
							<view class="goodsinfo-sel-count">
								<u-number-box v-model="count" min="1" :max="detail.purchaseLimit">
									<view slot="minus" class="goodsinfo-sel-count-text">
										-
									</view>
									<input class="uni-input input" type="number" shape="circle" v-model="count" />
									<view slot="plus" class="goodsinfo-sel-count-text">
										+
									</view>
								</u-number-box>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="account">
				<text class="account-title">留言</text>
				<u--input placeholder="选填, 请输入备注信息" border="none" v-model="remark"
					placeholderStyle="font-size: 24rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
					fontSize="24rpx" color="#222222"></u--input>
			</view>
			<view class="bottom-btn">
				<view class="view" :style="{paddingBottom:safeHeight>0?0:'25rpx'}">
					<view>
						<text class="bottom-btn-score">{{totalPrice}}</text>
						<text class="bottom-btn-score-suffix">积分</text>
					</view>
					<view class="bottom-btn-confirm" @click="submit">
						立即兑换
					</view>
				</view>
				<view class="safe-bottom-height"></view>
			</view>
		</template>
		<request-loading></request-loading>
		<u-modal :show="showmodal" confirmText='去设置' title="您尚未设置收货地址" :content='null' confirmColor='#D91B1B' @confirm='OnChangeAddress'></u-modal>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		onLoad(option) {
			//#ifdef H5
			if(option.token){
				uni.setStorage({
					key: 'token',
					data: option.token
				});
			}
			// #endif
			let _this=this
			this.id = option.id
			this.queryDetail(option.id)
			
	uni.$on('sendinfo', res => {
			_this.showmodal = false
			_this.isdefaultaddress = true
			_this.defaultaddress = res.info
			})
		},
		onShow() {
			this.getdefaultaddress()
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight = data.height
			}).exec()
		},
		computed: {
			totalPrice() {
				return (this.detail.exchangePrice && parseFloat(this.detail.exchangePrice) > 0 ? this.detail
					.exchangePrice : 0) * (this.count && parseInt(this.count) > 0 ? this.count : 0)
			}
		},
		data() {
			return {
				showmodal:false,
				isdefaultaddress: false,
				defaultaddress: {},
				next: true,
				id: '',
				count: 1,
				remark: '',
				safeHeight: 0,
				isSubmit: true,
				detail: {},
				isshowpage: false
			}
		},
		methods: {
			OnChangeAddress() {
				uni.navigateTo({
					url: '/pages/my/address/index'
				})
			},
			getdefaultaddress() {
				this.$request.get("/coc-active/api/v1/user/address/default").then(res => {
					if(this.isdefaultaddress){
						return false
					}
					if (res.data == null) {
						this.isdefaultaddress = false
					} else {
						this.showmodal = false
						this.isdefaultaddress = true
						this.defaultaddress = res.data
					}
				})
			},
			//查看详情
			queryDetail(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.get("/coc-active/api/v2/score/shop/product/detail/" + id)
					.then(res => {
						if (res.code == 200) {
							this.detail = res.data

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
			//下单
			submit() {
				if (tologin() !== true) {
					return
				}
				if (!this.isSubmit) {
					return
				}
				var reg = new RegExp("^[0-9]*$");
				if (!reg.test(this.count)) {
					uni.showToast({
						title: '请选择正确数量',
						icon: 'none',
						duration: 2000
					})
					return
				}
				if (this.detail.commodityType == 2 && !this.isdefaultaddress) {
					this.showmodal = true
					return false
				}
				if (this.next) {
					// #ifdef MP-WEIXIN
					uni.requestSubscribeMessage({
						tmplIds: [
							'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
						],
						success(res) {}
					})
					// #endif
					this.isSubmit = false
					this.$newrequest.post("/coc-active/api/v2/score/shop/score/exchange", {
						remark: this.remark,
						num: this.count,
						scoreProductId: this.id
					}).then(res => {
						if (res.code == 200) {
							this.next = false
							uni.showToast({
								title: '兑换成功',
								icon: 'none',
								duration: 3000,
								mask: true,
								success: () => {
									// #ifdef MP-WEIXIN
									setTimeout(() => {
										uni.switchTab({
											url: '/pages/home/my'
										})
									}, 3000)
									// #endif
								}
							})
						} else {
							this.next = false
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(() => {
						this.next = false
						this.isSubmit = true
					})
				}

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

	.goodsinfo {
		padding: 25rpx 50rpx 25rpx 25rpx;
		background: #FFFFFF;
		margin-top: 9rpx;
		display: flex;
		align-items: center;

		.goodsinfo-left {
			height: 160rpx;
		}

		.goodsinfo-left-img {
			width: 160rpx;
			height: 160rpx;
			border-radius: 10rpx;
		}

		.goodsinfo-right {
			margin-left: 12rpx;
			width: 100%;
		}

		.goodsinfo-right-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

		.goodsinfo-right-bottom {
			display: flex;
			margin-top: 35rpx;
		}

		.goodsinfo-right-score {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
		}

		.goodsinfo-right-score-suffix-view {
			margin-left: 7rpx;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			width: 100%;
		}

		.goodsinfo-right-score-suffix {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
			position: relative;
			top: -4rpx;
		}

		.goodsinfo-sel-count {
			height: 23px;
			background: #FFFFFF;
			border: 1rpx solid #999999;
			border-radius: 22rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goodsinfo-sel-count-text {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				width: 50rpx;
				text-align: center;
			}
		}
	}

	.goodsinfo-sel-count ::v-deep .u-number-box__input {
		width: 50rpx !important;
		height: 23px !important;
		font-size: 28rpx !important;
		font-family: PingFang SC;
		font-weight: bold;
		background: #FFFFFF !important;
	}

	.account {
		padding: 30rpx 50rpx 30rpx 27rpx;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		margin-top: 11rpx;

		.account-title {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			margin-right: 61rpx;
		}
	}

	.bottom-btn {
		border-top: 1rpx #e7e7e7 solid;
		position: fixed;
		z-index: 9999;
		background-color: #ffffff;
		bottom: 0;
		width: 100%;

		.view {
			padding: 25rpx 26rpx 0 28rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.bottom-btn-score {
			font-size: 40rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
		}

		.bottom-btn-score-suffix {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
			margin-left: 5rpx;
		}

		.bottom-btn-confirm {
			width: 260rpx;
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

	.harvest-address-no {
		background: #FFFFFF;
		padding: 56rpx 26rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.harvest-address {
		background: #FFFFFF;
		padding: 38rpx 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
