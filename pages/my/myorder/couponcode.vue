<template>
	<view class="page">
	<view v-if="isshowpage">
		<view style="padding: 32rpx;background-color: #ffffff;border-radius: 10rpx;">
			<view style="font-size: 28rpx;">
				{{orderdetail.title}}
			</view>
			<view class="row">
				<view style="color: #666666;">套餐：{{orderdetail.activitySetMealName}}</view>
				<view>￥{{orderdetail.paidMoney}}x{{orderdetail.activitySetMealNum}}</view>
			</view>
			<view style="font-size: 24rpx;color: #666666;margin-top: 20rpx;">
				活动场次：{{orderdetail.activityBeginTime}}-{{orderdetail.activityEndTime}}
			</view>
			<view v-if="orderdetail.isExpert==1" style="font-size: 24rpx;color: #666666;margin-top: 20rpx;display: flex;">
				<view> 联系方式：</view>
				<view>
					<view v-for="(item,index) in orderdetail.expertMobile" :key="index">
						<view>
							{{item}}
						</view>
					</view>
				</view>
			</view>
			<view  v-for="(item,index) in choosecoupon" :key="index">
				<view class="u-flex"
					style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
					<view v-if="orderdetail.status==1||orderdetail.status==2||orderdetail.status==3||orderdetail.status==4">
						{{item.name}}
					</view>
					<view v-else>
						{{item.couponName}}
					</view>
					<view style="color: #D91B1B;">
						-¥{{item.discountMoney}}
					</view>
				</view>
			</view>
			<view v-if="orderdetail.activitySignUpInsurances && orderdetail.activitySignUpInsurances.length>0">
				<view style="font-size: 28rpx;margin-top: 40rpx;">
					保险
				</view>
				<view>
					<view v-for="(item,index) in orderdetail.activitySignUpInsurances" :key="index">
						<view class="u-flex" style="justify-content: space-between;font-size: 24rpx;margin-top: 20rpx;">
							<view>
								{{item.insuranceName}}
							</view>
							<view style="color: #666666;">
								¥{{item.price}}x{{joinpeople}}x{{item.purchaseDays}}天
							</view>
						</view>
						<view class="u-flex" v-if="item.isUndertaker==1"
							style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
							<view>
								官方减免
							</view>
							<view style="color: #D91B1B;">
								-¥{{item.insuranceMoney*joinpeople*item.purchaseDays}}
							</view>
						</view>
					</view>


				</view>
			</view>
			<u-divider :text="null"></u-divider>
			<view style="font-size: 28rpx;">
				报名人
			</view>
			<view v-for="(item,index) in orderdetail.activitySignUpParticipants" :key="index">
					<u-divider v-if="index!=0" :text="null"></u-divider>
					<view style="display: flex;justify-content: space-between;margin-top: 40rpx;">
						<view
							style="color: #999999;font-size: 28rpx;margin-right: 20rpx;align-self: center;">
							<text v-if="item.participantsType==1" style="display: inline-block;width: 80rpx;">成人</text>
							<text v-else style="display: inline-block;width: 80rpx;">儿童</text>
						</view>
						<view style="margin-left: -60rpx;">
							<view
								style="font-size: 28rpx; font-weight: bold;width: 380rpx;	text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								{{item.participants}}
							</view>
							<view v-if="item.participantsMobile" style="font-size: 24rpx;margin-top: 6rpx;">手机号<text
									style="margin-left: 20rpx;">{{item.participantsMobile}}</text></view>
							<view style="font-size: 24rpx;margin-top: 6rpx;">身份证<text
									style="margin-left: 20rpx;">{{item.idCard}}</text></view>
						</view>
					
					</view>
				</view>
		
			
			<u-divider :text="null"></u-divider>
	<view  v-if="orderdetail.status==0||orderdetail.status==7" class="u-flex" style="justify-content: space-between;">
		<view class="u-flex" style="font-size: 24rpx;">
			<image src="@/pages/my/static/image/youhuiquan2.png" style="width: 28rpx;height: 20rpx;margin-top: 6rpx;">
			</image>
			<view >优惠券</view>
		</view>
		<view class="u-flex" style="font-size: 24rpx;" v-if="couponList.length==0">
			<view style="color: #666666;margin-left: 10rpx;">暂无可用优惠券</view>
			<view style="margin-top: 8rpx;">
				<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
			</view>
		</view>
		<view class="u-flex" style="font-size: 24rpx;" v-else-if="choosecoupon.length==0" @click="OnPushcoupon">
			<view style="color: #C71D1D;margin-left: 10rpx;">您有可用优惠券</view>
			<view style="margin-top: 8rpx;">
				<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
			</view>
		</view>
		<view class="u-flex" style="font-size: 24rpx;" v-else @click="OnPushcoupon">
			<view style="color: #C71D1D;margin-left: 10rpx;">已选择</view>
			<view style="margin-top: 8rpx;">
				<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
			</view>
		</view>
	
	</view>
			<u-divider  v-if="orderdetail.status==0||orderdetail.status==7"  :text="null"></u-divider>
			<view>
			</view>
			<view style="display: flex;justify-content: space-between;">
				<view style="28rpx">合计</view>
				<view style="color: #D91B1B;">
					<text style="font-size: 24rpx;">￥</text>
					<text style="font-size: 44rpx;font-weight: bold;">{{orderdetail.paidMoney === 0 ? 0 : orderdetail.paidMoney.toFixed(2)}}</text>
				</view>

			</view>
		</view>

		<view>
			<view v-if="orderdetail.status==1||orderdetail.status==2||orderdetail.status==3" class="top-card">
				<image
					:src="orderdetail.isVerification==1?'https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672817102893.png':'https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672815483227.png'"
					style="width: 386rpx;height: 358rpx;"></image>
				<view style="position: absolute;top: 50rpx;left: calc(50% - 100rpx);">
					<image :src="orderdetail.orderCodeImg" mode="widthFix" style="width: 200rpx;"></image>
				</view>
				<view v-if="orderdetail.isVerification==1" style="position: absolute;top: 0;">
					<image
						src="https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672818964238.png"
						style="width: 386rpx;height: 358rpx;"></image>
				</view>
			</view>
			<view v-else-if="orderdetail.status==0||orderdetail.status==7">
				<view class="On-pay">
					<image src="@/pages/my/static/image/newwxpay.png"
						style="width: 44rpx;height: 40rpx;position: relative;top: 8rpx;left: 220rpx;"></image>
					<text @click="OnPay">微信支付</text>
				</view>

			</view>
			<view v-else>

			</view>
			<view class="card-item">
				<!-- 活动发起人信1息 -->
				<view class="user-info">
					<view class="u-flex">
						<view class="user-avatar">
							<u-avatar size='50' :src="orderdetail.shopAvatar">
							</u-avatar>
						</view>
						<view class="user-info-detail">
							<view class="name">
								{{orderdetail.shopName}}
							</view>
							<view class="u-flex" style="margin-top: 14rpx;"
								v-if="orderdetail.shopTypeId==4||orderdetail.shopTypeId==3">
								<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059677976.png" style="width: 104rpx; height:28rpx"></image>
								<view style="margin-top: -5rpx;">
									<!-- 	<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate> -->
								</view>
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">5.0</view> -->
							</view>
							<view class="u-flex" style="margin-top: 14rpx;" v-else-if="orderdetail.shopTypeId==1">
								<image src="@/static/image/guan.png" style="width: 29rpx; height:29rpx"></image>
								<view style="margin-top: -5rpx;">
									<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate>
								</view>
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<view style="font-size: 24rpx;margin-top: -1rpx;color: #D91B1B;margin-left: 20rpx;">官方
								</view>
							</view>
							<view class="u-flex" style="margin-top: 14rpx;" v-else-if="orderdetail.shopTypeId==2">
								<image src="@/static/image/4Sdian.png" style="width: 29rpx; height:29rpx"></image>
								<!-- 	<view style="margin-top: -5rpx;">
									<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate>
								</view> -->
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<view style="font-size: 24rpx;margin-top: -1rpx;margin-left: 20rpx;">4S店</view>
							</view>
						</view>
					</view>

				</view>
			</view>
	
			<view style="margin-bottom: 25%;">
				
			</view>
	
		</view>
</view>
<request-loading></request-loading>
		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				orderdetail: {},
				orderNo: '',
				userId: '',
				joinpeople: '',
				couponList: [],
				choosecoupon: [],
				allprice:'',
				isshowpage: false,
			}
		},

		onLoad(option) {
			let _this = this
			this.userId = getstorage("userId")
			this.orderNo = option.id
			uni.$on("choosecoupon", (data) => {
					
				this.choosecoupon = data.data
			this.orderdetail.paidMoney=this.allprice
				this.choosecoupon.filter(res => {
					this.orderdetail.paidMoney =this.orderdetail.paidMoney - res.discountMoney
				})
				if (this.orderdetail.paidMoney <= 0) {
					this.orderdetail.paidMoney = 0.01
				}
			})
			this.getcode()
		},
		onShow() {},
		methods: {
			OnGoHome() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnPushcoupon() {
				if(this.orderdetail.status==1||this.orderdetail.status==2||this.orderdetail.status==3){
					return false
				}
				let _this = this
				uni.navigateTo({
					url: '/pages/service/couponList/index',
					success: function(res) {
						res.eventChannel.emit('couponList', {
							data: {
								couponList: _this.couponList,
								choosecoupon: _this.choosecoupon,
							}
						})
					}
				})
			},
			OnPay() {
				let isjoin = false
				let _this = this
				if (!this.orderdetail.activitySignUpInsurances) {
					isjoin = 0
				} else {
					isjoin = 1
				}
				let couponUserNews = []
				this.choosecoupon.filter(res => {
					couponUserNews.push({
						discountMoney: res.discountMoney,
						couponNewId: res.couponNewId,
						couponUserNewId: res.couponUserNewId
					})
				})
					this.showloading=true
				this.$request.post("/coc-active/api/v1/sign_up/payment", {
						couponUserNews: couponUserNews,
					payType: '3',
					signUpId: this.orderdetail.id,
					activityId: this.orderdetail.activityId,
					setMealId: this.orderdetail.activitySetMealId,
					isInsurance: isjoin,
					subOpenId: getstorage('openid'),
					setMealAmount: this.orderdetail.flashSalePrice
				}).then(res => {
					if (res.code == 200) {
							this.showloading=false
						this.wxpay(res.data.payment.miniPayRequest)
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			wxpay(data) {
				let _this = this
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
								_this.getcode()
							}
						})
					},
					fail: function(err) {
						_this.$request.get("/coc-active/api/v1/sign_up/paymentFailed/" + _this.orderdetail
							.id).then(res => {
						})
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
					}
				});
			},
			Onreport() {
				let _this = this
				let info = {
					shopVO: {
						headImg: this.orderdetail.shopAvatar,
						shopName: this.orderdetail.shopName,
						id: this.orderdetail.activityId
					},
					activity: {
						signUpEndTime: this.orderdetail.signUpEndTime,
						createdAt: this.orderdetail.createdAt,
						title: this.orderdetail.title,
						detail: ''
					}
				}
				uni.navigateTo({
					url: "/pages/my/myFeedback/index?type=1",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: info
						})
					}
				});
			},
		
			getcode() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$request.post("/coc-my/activity/order/detail/v2", {
					orderNo: this.orderNo
				}).then(res => {
					this.joinpeople = res.data.activitySignUpParticipants.length
					this.orderdetail = res.data
					this.allprice=res.data.paidMoney
					this.couponList=res.data.couponVOS
					this.choosecoupon=res.data.orderCouponListVO
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},


		}
	}
</script>

<style lang="scss">
	.page {
		margin: 40rpx;
	}

	.btn-follow {

		background-color: #d91b1b;
		display: flex;
		justify-content: center;
		border-radius: 10rpx;
		color: #ffffff;
		font-size: 24rpx;
		width: 108rpx;
		height: 40rpx;
		line-height: 40rpx;
		align-self: center;
	}

	.onbtn-follow {
		background-color: #ffffff;
		font-size: 28rpx;
		color: #d91b1b;
		border: 1rpx solid #d91b1b;
		padding: 10rpx 15rpx;
	}

	.user-info {
		display: flex;
		justify-content: space-between;
	}

	.user-info-detail {
		margin-left: 20rpx;
		align-self: center;

		.name {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
		}
	}

	.row {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		margin-top: 20rpx;
	}

	.On-pay {
		margin-top: 80rpx;
		text-align: center;
		background-color: #1BD993;
		border-radius: 40rpx;

		text {
			display: inline-block;
			width: 600rpx;
			height: 80rpx;
			color: #ffffff;
			line-height: 34rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}

	.top-card {
		margin: 40rpx auto;
		// width: 386rpx;
		// height: 358rpx;
		// background-color: #ffffff;
		// box-shadow: 4rpx 9rpx 16rpx 0rpx rgba(16, 16, 16, 0.07);
		// border-radius: 50rpx;
		// // ----
		// background: radial-gradient(circle at left bottom, transparent 40rpx, #ffffff 0) top left / 50% 31% no-repeat,
		// 	radial-gradient(circle at left top, transparent 40rpx, #ffffff 0) bottom left /50% 70% no-repeat,
		// 	radial-gradient(circle at right bottom, transparent 40rpx, #ffffff 0) top right /50% 31% no-repeat,
		// 	radial-gradient(circle at right top, transparent 40rpx, #ffffff 0) bottom right /50% 70% no-repeat;
		// filter: drop-shadow(0 0 20rpx #ffffff);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.top-detail {
		text-align: center;
		font-weight: bold;
		line-height: 136rpx;

		.name {
			font-size: 32rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}
	}

	.top-code {
		display: flex;
		justify-content: space-between;
		margin-left: 40rpx;
		margin-right: 40rpx;
		margin-top: 10rpx;
		float: left;

		.code {
			font-size: 40rpx;
			font-weight: bold;
		}

		.top-btn {
			font-size: 28rpx;
			display: flex;
			align-items: center;
			background-color: #ffffff;
			border-radius: 12rpx;
			border: solid 1rpx #666666;
			padding: 0rpx 19rpx;
			margin-left: 8rpx;
		}

	}

	.hr {
		width: 78%;
		height: 1rpx;
		border-bottom: 1rpx #222222 dashed;
		position: relative;
		left: 47rpx;
	}

	.bottom-item {
		padding: 26rpx 50rpx 60rpx 66rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #ffffff;
		margin-left: -40rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
	}

	.signup {
		margin-right: 110rpx;
		background-color: #d91b1b;
		border-radius: 10rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #ffffff;
		width: 180rpx;
		height: 60rpx;
		align-self: center;
		font-size: 28rpx;

		text {
			display: inline-block;
			text-align: center;
			background-color: #d91b1b;
			border-radius: 10rpx;
			padding: 16rpx;
		}
	}

	.card-item {
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;

		li {
			margin-top: 15rpx;
		}

		i {
			width: 10rpx;
			height: 10rpx;
			background-color: #d91b1b;
			border-radius: 50%;
			display: inline-block;
			margin-right: 10rpx;
			position: relative;
			bottom: 5rpx;
		}
	}

	.On-pay {
		margin-top: 80rpx;
		text-align: center;
		background-color: #1BD993;
		border-radius: 40rpx;

		text {
			display: inline-block;
			width: 600rpx;
			height: 80rpx;
			color: #ffffff;
			line-height: 34rpx;
			text-align: center;
			line-height: 80rpx;
		}
	}
	.search-top {
			width: 100%;
			// margin-left: -100rpx;
			display: flex;
			justify-content: space-between;
			line-height: 46rpx;
			margin-right: 26%;
		}
</style>
