<template>
	<view class="page">
		<template v-if="isshowpage">
			<view class="order-detail-view" :class="{ 'order-detail-view-height': detail.status == 0 }">
				<view class="content-view">
					<view class="u-flex alc" style="margin-bottom: 30rpx;" @click.stop="OnPushshopHome">
						<view>{{detail.baseName}}</view>
						<view>
							<u-icon name="arrow-right"></u-icon>
						</view>
					</view>
					<view class="u-flex" @click="OnPushDetail">
						<view>
							<image style="width: 120rpx;height: 120rpx; border-radius: 10rpx;" :src="detail.coverImage">
							</image>
						</view>
						<view class="ml20">
							<view class="flex jsb" style="align-items: flex-start;">
								<view class="label moreLine" style="width: 432rpx;height: 80rpx;">{{ detail.maintainName }}</view>
								<view class="other-label">￥{{ detail.price }}</view>
							</view>
							<view class="flex alc jsb" style="margin-top: 14rpx;">
								<text class="label">数量</text>
								<text class="other-label">{{ detail.maintainNum }}份</text>
							</view>
						</view>
					</view>
				
					<view v-if="detail.couponName" class="flex alc jsb" style="margin-top: 20rpx;">
						<text class="label">优惠券</text>
						<text class="other-label" style="color:#D91B1B;">{{ detail.couponName }}</text>
					</view>
					<view class="line" style="margin-top: 35rpx;"></view>
					<view class="flex alc jsb" style="margin-top: 15rpx;">
						<text class="label">原价</text>
						<view style="flex txtls" class="txtls txtLighGray">
							<text class="order-curprice-symbol">￥</text>
							<text class="order-curprice">{{ detail.marketPrice }}</text>
						</view>
					</view>
					<view v-if="detail.couponOtherContribute" class="line" style="margin-top: 14rpx;"></view>
					<view v-if="detail.couponOtherContribute" class="flex alc jsb" style="margin-top: 15rpx;">
						<text class="label">优惠</text>
						<view style="flex ">
							<text class="txtLighGray size24" v-if="detail.activityPaymentPreferenceId==6">工行信用卡满减</text>
								<text class="txtLighGray size24" v-if="detail.activityPaymentPreferenceId==5">农行信用卡满减</text>
							<text class="mainRed size24 fwb ml10">-￥{{ detail.couponOtherContribute }}</text>
						</view>
					</view>
					<view class="line" style="margin-top: 14rpx;"></view>
					<view v-if class="flex alc jsb" style="margin-top: 15rpx;">
						<text class="label">实际支付</text>
						<view class="u-flex mainRed" style="position: relative;">
							<text class="size24" style="position: absolute;bottom: 0rpx;left: -25rpx;">￥</text>
						<text class="fwb size32">{{detail.buyerPayAmount?detail.buyerPayAmount:0}}</text>
						</view>
					</view>
					<view class="line" style="margin-top: 20rpx;"></view>
					<view class="label" style="padding-top: 25rpx;padding-bottom: 5rpx;">套餐包含</view>
					<view class="package-item flex alc jsb" v-for="item in detail.products">
						<text class="package-item-text ellipsis"
							style="max-width: 590rpx;">{{ item.productName }}</text>
						<text class="package-item-text">{{item.num}}份</text>
					</view>
					<view class="line" style="margin-top: 25rpx;margin-bottom: 5rpx;"></view>
					<view class="flex alc jsb label-top">
						<text class="label">有效期至</text>
						<text class="other-label">{{ detail.validityDay }}</text>
					</view>
					<view class="flex alc jsb label-top">
						<text class="label">门店名称</text>
						<text class="other-label">{{ detail.baseName }}</text>
					</view>
					<view class="flex alc jsb label-top">
						<text class="label">门店地址</text>
						<view class="flex alc" @click="showLocation">
							<text class="other-label ellipsis"
								style="max-width: 450rpx;">{{ detail.baseAddress }}</text>
							<image src="@/static/image/dingwei.png" class="dwIcon" style="margin-left: 9rpx;"></image>
						</view>
					</view>
					<view class="flex alc jsb label-top">
						<text class="label">门店电话</text>
						<view class="flex alc" @click="clickTel">
							<text class="other-label">{{ detail.baseMobile }}</text>
							<image src="@/static/image/dianhua.png" class="telIcon" style="margin-left: 6rpx;" />
						</view>

					</view>
					<view class="flex alc jsb label-top">
						<text class="label">订单编号</text>
						<view>
							<text class="other-label">{{ detail.orderNo }}</text>
							<text class="other-label" style="color: #D91B1B;margin-left: 9rpx;"
								@click="paste(detail.orderNo)">复制</text>
						</view>
					</view>
					<view v-if="detail.status == 1 || detail.status == 2 || detail.status == 8"
						class="flex alc jsb label-top">
						<text class="label">核销码</text>
						<view>
							<text class="other-label"
								:class="{ 'code': detail.status != 2, 'code-end': detail.status == 2 }">{{ detail.orderCode }}</text>
							<text class="other-label" style="color: #D91B1B;margin-left: 9rpx;"
								@click="paste(detail.orderCode)">复制</text>
						</view>
					</view>
				</view>
				<view
					v-if="detail.status == 1 || detail.status == 2 || detail.status == 4 || detail.status == 5 || detail.status == 8"
					style="text-align: right;margin-right: 3rpx;margin-top: 40rpx;">
					<text v-if="detail.status == 1 && detail.noRefundReason"
						class="tip">已驳回:{{ detail.noRefundReason }}</text>
					<text v-if="detail.status != 1" class="tip">{{ getStatusType(detail.status) }}</text>
				</view>
				<view v-if="detail.status == 1" class="flex" style="justify-content: flex-end;margin-top: 28rpx;">
					<view class="btn" @click="openRefund">申请退款</view>
				</view>
				<!-- 未绑定客户经理 -->
				<view v-if="detail.status != 0 && detail.status != 5" style="padding-bottom: 70rpx;padding-top: 70rpx;">
					<view v-if="!detail.salesConsultantUserVO || !detail.salesConsultantUserVO.customerManagerId"
						class="checkSale flex jsb alc bgfff br10" @click="checkSale">
						<view>选择您的专属客户经理</view>
						<u-icon name="arrow-right" size="14"></u-icon>
					</view>
					<!-- 已绑定客户经理 -->
					<view v-if="detail.salesConsultantUserVO && detail.salesConsultantUserVO.customerManagerId"
						class="haveSale flex jsb alc bgfff br10">
						<view class="flex alc" @click="OnWechat()">
							<image :src="detail.salesConsultantUserVO.url" class="salePic" />
							<view class="fwb">{{ detail.salesConsultantUserVO.nickname }}</view>
							<view class="txtDarkGray" style="margin-left:40rpx">您的专属客户经理</view>
						</view>
						<image src="@/static/image/sale.png" class="saletel" @click="OnTell()"></image>
					</view>
				</view>
			</view>
			<view v-if="detail.status == 0" class="bottom flex alc" style="justify-content: flex-end; z-index: 999;">
				<view class="btn" @click.stop="orderPay">继续支付</view>
			</view>
			<view class="u-flex jsb  m25">
				<view class="size32">
					猜你喜欢
				</view>
				<view class="u-flex size24" @click="toClick">
					<view>更多</view>
					<view>	<u-icon name="arrow-right" ></u-icon></view>
				</view>
			</view>
				<view style="position: relative;left:-12rpx">
				<recommend />
				</view>
				<view style="height: 100rpx;"></view>
			<u-popup :show="refundVisble" mode="center" :safeAreaInsetBottom="false" round="16rpx">
				<view class="cancel_view">
					<view class="text">
						请确认是否取消预约，审核通过后实际支付金额将在7个工作日内原路退回您的支付账户，如使用了优惠券，该优惠券将立即退回您的账户中，如有需要请重新下单！
					</view>
					<view class="flex alc jsc" style="margin-top: 36rpx;text-align: center;">
						<view class="btn1" @click="closeCancel">点错了</view>
						<view class="btn2" @click="submitRefund">确认取消</view>
					</view>
				</view>
			</u-popup>
		</template>
		<!-- 二维码弹窗 -->
		<u-popup :safeAreaInsetBottom='false' :show="showcontact" @close="showcontact = false" mode="center">
			<view style="width: 700rpx;height: 700rpx;">
				<view style="text-align: center;margin-top: 50rpx;">
					<image style="width: 440rpx;height: 444rpx;" :src="codeurl" @click="OnpreviewImage"
						:show-menu-by-longpress="true"></image>
				</view>
				<view style="font-size: 24rpx;text-align: center;margin-top: 50rpx;">
					<view>长按保存销售经理微信二维码</view>
				</view>
			</view>
		</u-popup>
		<request-loading></request-loading>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import recommend from "../myorder/components/recommend.vue"
	export default {
		components: {
		recommend
				},
		data() {
			return {
				showpay:true,
				id: '',
				detail: {},
				showcontact: false,
				codeurl: '',
				refundVisble: false,
				isshowpage: false,
				isRefresh: false,
				shopId: ''
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getDetail(option.id)
		},
		onShow() {
			if (this.isRefresh) {
				this.getDetail(this.id)
			}
		},
		onReachBottom() {
			uni.$emit('recommend')
		},
		methods: {
			toClick() {
			    uni.navigateTo({
			        url: '/pages/activity/activityRegistration/playfulperson'
			    })
			},
			OnPushDetail(){
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + this.detail.maintainMealId
				})
			},
			OnPushshopHome() {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + this.detail.shopId
				})
			},
			OnpreviewImage() {
				let _this = this
				uni.previewImage({
					urls: _this.codeurl,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			OnWechat() {
				if (this.detail.salesConsultantUserVO.qrCode) {
					this.codeurl = this.detail.salesConsultantUserVO.qrCode
					this.showcontact = true
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂无个人二维码，点击右侧打电话试试吧~'
					})
				}
			},
			OnTell() {
				if (this.detail.salesConsultantUserVO.phone) {
					uni.makePhoneCall({
						phoneNumber: this.detail.salesConsultantUserVO.phone
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂无联系方式，点击左侧添加微信吗吧~'
					})
				}
			},
			//获取详情
			getDetail(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.get("/coc-active/api/v2/maintain_meal/orderDetails/" + id)
					.then(res => {
						if (res.code == 200) {
							this.detail = res.data
							this.shopId = res.data.shopId
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
			//付款
			orderPay() {
				if(this.showpay==false){
					return false
				}
				this.showpay=false
				this.$newrequest.post("/coc-active/api/v2/maintain_meal/payment", {
						orderId: this.id,
						payType: 2,
						subOpenId:uni.getStorageSync("openid")
					})
					.then(res => {
						this.showpay = true;
						if (res.code == 200) {
							this.wxpay(res.data.payment.miniPayRequest)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			//调起微信支付
			wxpay(data) {
				let that = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.nonceStr, // 随机字符串
					package: data.package, // 固定值
					signType: data.signType, //固定值
					paySign: data.paySign, //签名
					appid: data.appId,
					success: function(res) {
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								uni.reLaunch({
									url: '/pages/carShops/upkeep/orderStatus?id=' + that.id
								})
							}
						})
					},
					fail: function(err) {
						that.showpay=true
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
					}
				});
			},
			//打开退款框
			openRefund() {
				this.refundVisble = true
			},
			//关闭退款框
			closeCancel() {
				this.refundVisble = false
			},
			//申请退款
			submitRefund() {
				this.$newrequest.post("/coc-active/api/v2/maintain_meal/refund", {
						orderId: this.id
					})
					.then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '申请退款成功'
							})
							this.closeCancel()
							this.getDetail(this.id)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			//显示位置
			showLocation() {
				this.isRefresh = false
				uni.openLocation({
					latitude: this.detail.lat,
					longitude: this.detail.lng,
					success: function() {
						//console.log('success');
					}
				});
			},
			//拨打电话
			clickTel() {
				this.isRefresh = false
				uni.makePhoneCall({
					phoneNumber: this.detail.baseMobile
				});
			},
			//复制
			paste(value) {
				uni.setClipboardData({
					data: value
				});
			},
			//跳转选择客户经理
			checkSale() {
				this.isRefresh = true
				uni.navigateTo({
					url: '/pages/carShops/upkeep/checkSales?shopId=' + this.shopId
				})
			},
			//预览图片
			preview(img) {
				uni.previewImage({
					urls: [img],
					current: 0
				})
			},
			//获取状态枚举
			getStatusType(status) {
				switch (status) {
					case 0:
						return '待付款'
					case 1:
						return '待核销'
					case 2:
						return '已完成'
					case 4:
						return '已退款'
					case 5:
						return '已取消'
					case 8:
						return '退款申请中'
					default:
						return ''
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.order-detail-view-height {
		max-height: calc(100vh - 133rpx);
		overflow: auto;
	}

	.order-detail-view {
		padding: 13rpx 26rpx 0 25rpx;

		.content-view {
			padding: 32rpx 25rpx 45rpx 25rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
		}

		.label {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		.label-top {
			padding-top: 15rpx;
		}

		.other-label {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		.order-curprice-symbol {
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #999;
		}

		.order-curprice {
			font-size: 24rpx;
			font-family: PingFang SC;
			color: #999;
		}

		.package-item {
			margin-top: 15rpx;
		}

		.package-item-text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}

		.dwIcon {
			width: 20rpx;
			height: 24rpx;
		}

		.telIcon {
			width: 23rpx;
			height: 22rpx;
		}

		.line {
			height: 1rpx;
			background: #E5E5E5;
		}

		.tip {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #D91B1B;
		}

		.btn {
			width: 140rpx;
			height: 52rpx;
			line-height: 52rpx;
			text-align: center;
			background: #FFFFFF;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}

		.code {
			// font-size: 36rpx;
			// font-family: PingFang SC;
			// font-weight: 500;
		}

		.code-end {
			// font-size: 36rpx;
			// font-family: PingFang SC;
			// font-weight: 500;
			text-decoration: line-through;
			// color: #999999;
		}
	}

	.checkSale {
		padding: 0 25rpx;
		height: 120rpx;
		line-height: 120rpx;
	}

	.haveSale {
		padding: 0 25rpx;
		height: 120rpx;
		line-height: 120rpx;

		.salePic {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
			margin-right: 26rpx;
		}

		.saletel {
			width: 34rpx;
			height: 34rpx;
		}
	}

	.bottom {
		width: 750rpx;
		height: 120rpx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		right: 0;
		padding-right: 50rpx;

		.btn {
			width: 180rpx;
			height: 60rpx;
			line-height: 60rpx;
			text-align: center;
			background: #D91B1B;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
		}
	}

	.cancel_view {
		width: 700rpx;
		text-align: center;
		padding: 65rpx 0 49rpx 0;
		background: #FFFFFF;
		border-radius: 16rpx;

		.text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			text-align: left;
			padding: 0 32rpx 0 26rpx;
		}

		.btn1 {
			width: 200rpx;
			height: 76rpx;
			background: #F8F8F8;
			border-radius: 38rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			text-align: center;
			line-height: 76rpx;
		}

		.btn2 {
			width: 200rpx;
			height: 76rpx;
			background: #D91B1B;
			border-radius: 38rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #FFFFFF;
			margin-left: 71rpx;
			text-align: center;
			line-height: 76rpx;
		}
	}

	.ellipsis {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.m25{
		margin: 0 25rpx 20rpx 25rpx;
	}
</style>
