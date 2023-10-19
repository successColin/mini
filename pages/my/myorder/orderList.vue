<template>
	<view class="page">
		<view v-if="isshowpage">
			<view class="card" @click="OnPushDetail">
				<view class="u-flex alc" style="margin-bottom: 30rpx;" @click.stop="OnPushshopHome">
					<view>{{orderdetail.shopName}}</view>
					<view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				
				<view class="u-flex">
					<view>
						<image style="width: 200rpx;height: 120rpx;border-radius: 10rpx;" :src="orderdetail.coverPicture"></image>
						</view>
						<view style="margin-left: 23rpx;">
							<view class="size28 fwb moreLine" >
								{{orderdetail.title}}
							</view>
							<view class="u-flex jsb size24 alc" style="margin-top: 24rpx;width: 406rpx;">
								<view>
									{{orderdetail.activitySetMealName}}
								</view>
								<view>
									￥{{orderdetail.paidMoney.toFixed(2)}}x{{orderdetail.activitySetMealNum}}
								</view>
							
							</view>
							<view
								v-if="(orderdetail.isScoreDeduction==1||orderdetail.status==0||orderdetail.status==7)&&orderdetail.scoreDeduction>0"
								class="row  mainRed">
								<view>积分抵扣</view>
								<view>￥-{{orderdetail.scoreDeduction}}</view>
							</view>
							<view style="font-size: 24rpx;color: #666666;">
								活动场次：{{orderdetail.activityBeginTime}}-{{orderdetail.activityEndTime}}
							</view>
							</view>
					</view>
					
					
					
	
			
			</view>
			<view class="card">
				<view class="u-flex jsb">
					<view class="size24 fwb">订单编号</view>
					<view class="u-flex alc">
						<view>
							{{orderdetail.orderNo}}
						</view>
						<view class="ml10" @click="paste(orderdetail.orderNo)">
							<image style="width: 26rpx;height: 26rpx;" src="../static/image/redfuzhi.png"></image>
						</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view style="font-size: 28rpx;">
					报名人
				</view>
				<view v-for="(item,index) in orderdetail.activitySignUpParticipants" :key="index">
					<u-divider v-if="index!=0" :text="null"></u-divider>
					<view
						style="display: flex;justify-content: space-between;margin-top: 40rpx;background-color: #f8f8f8;border-radius: 10rpx;padding: 20rpx;">

						<view>
							<view
								style="font-size: 28rpx; font-weight: bold;width: 380rpx;	text-overflow: ellipsis;overflow: hidden;white-space: nowrap;">
								{{item.participants}}
							</view>
							<view v-if="item.participantsMobile" style="font-size: 24rpx;margin-top: 6rpx;">手机号<text
									style="margin-left: 20rpx;">{{item.participantsMobile}}</text></view>
							<view style="font-size: 24rpx;margin-top: 6rpx;">身份证<text
									style="margin-left: 20rpx;">{{item.idCard}}</text></view>
						</view>
						<view style="font-size: 24rpx;align-self: center;">
							<text v-if="item.participantsType==1" style="display: inline-block;width: 80rpx;">成人</text>
							<text v-else style="display: inline-block;width: 80rpx;">儿童</text>
						</view>
					</view>
				</view>

				<view v-if="choosecoupon.length>0"
					style="padding: 32rpx;background-color: #ffffff;border-radius: 10rpx;">
					<view v-for="(item,index) in choosecoupon" :key="index">
						<view class="u-flex"
							style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
							<view
								v-if="orderdetail.status==1||orderdetail.status==2||orderdetail.status==3||orderdetail.status==4">
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


				</view>


				<u-divider v-if="(orderdetail.status==0||orderdetail.status==7)&&orderdetail.isScoreDeduction!=1"
					:text="null"></u-divider>
				<view v-if="(orderdetail.status==0||orderdetail.status==7)&&orderdetail.isScoreDeduction!=1"
					class="u-flex" style="justify-content: space-between;">
					<view class="u-flex" style="font-size: 24rpx;">
						<image src="@/pages/my/static/image/youhuiquan2.png"
							style="width: 28rpx;height: 20rpx;margin-top: 6rpx;">
						</image>
						<view class="ml10">优惠券</view>
					</view>
					<view class="u-flex" style="font-size: 24rpx;" v-if="couponList.length==0">
						<view style="color: #666666;margin-left: 10rpx;">暂无可用优惠券</view>
						<view style="margin-top: 8rpx;">
							<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
						</view>
					</view>
					<view class="u-flex" style="font-size: 24rpx;" v-else-if="choosecoupon.length==0"
						@click="OnPushcoupon">
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




			</view>

			<view class="card">
				<view class="u-flex jsb">
					<view class="size24 fwb">合计</view>
					<view class="txtLighGray size24 txtls">
						￥{{orderdetail.paidMoney}}
					</view>
				</view>
				<view v-if="orderdetail.couponOtherContribute>0">

					<u-divider :text="null"></u-divider>
					<view class="u-flex jsb">
						<view class="size24 fwb">优惠</view>
						<view class="size24">
							<text class="txtLighGray" v-if="orderdetail.activityPaymentPreferenceId==5">农行信用卡满减</text>
							<text class="txtLighGray" v-if="orderdetail.activityPaymentPreferenceId==6">工行信用卡满减</text>
							<text class="mainRed ml10 fwb">-￥{{orderdetail.couponOtherContribute}}</text>
						</view>
					</view>

				</view>
				<u-divider v-if="orderdetail.activitySignUpInsurances.length>0" :text="null"></u-divider>
				<view v-if="orderdetail.activitySignUpInsurances.length>0">
					<view style="font-size: 24rpx;margin-top: 40rpx;font-weight: bold;">
						保险
					</view>
					<view>
						<view v-for="(item,index) in orderdetail.activitySignUpInsurances" :key="index">
							<view class="u-flex"
								style="justify-content: space-between;font-size: 24rpx;margin-top: 20rpx;">
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
				<view class="u-flex jsb">
					<view class="size24 fwb">实际支付</view>
					<view class="mainRed size24 ">￥<text class="fwb size32">{{orderdetail.buyerPayAmount?orderdetail.buyerPayAmount:'免费'}}</text></view>
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
				<view v-else-if="orderdetail.status==0||orderdetail.status==7" class="u-flex jsc">
					<view class="On-pay" style="width: 500rpx;">
						<image src="@/pages/my/static/image/newwxpay.png"
							style="width: 44rpx;height: 40rpx;position: relative;top: 8rpx;right: 15rpx;"></image>
						<text @click="OnPay">微信支付</text>
					</view>

				</view>
				<view v-else>

				</view>
				<view class="card-item">
					<!-- 活动发起人信息 -->
					<view class="user-info" @click="OnPushshopHome">
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
									<image src="@/static/image/yirenzheng.png" style="width: 104rpx; height:28rpx">
									</image>
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
									<view style="font-size: 24rpx;margin-top: -1rpx;color: #D91B1B;margin-left: 20rpx;">
										官方
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

						<view class="btn-follow"
							:class="{'onbtn-follow':orderdetail.status!=0&&orderdetail.status!=2&&orderdetail.status!=3&&orderdetail.status!=null}"
							v-if="userId!=orderdetail.shopUserId" style="font-size: 28rpx;padding: 10rpx 15rpx;">
							<view @click="Onfollow()"
								v-if="orderdetail.status==0||orderdetail.status==2||orderdetail.status==3||orderdetail.status==null">
								关注</view>
							<view v-else>已关注</view>
						</view>
					</view>
				</view>
			<view class="u-flex jsb  m25 ">
				<view class="size32">
					猜你喜欢
				</view>
				<view class="u-flex size24" @click="toClick">
					<view>更多</view>
					<view>	<u-icon name="arrow-right" ></u-icon></view>
				</view>
			</view>
				<view style="width: 700rpx;">
				<recommend />
				</view>
				<view style="margin-bottom: 25%;">

				</view>

			</view>
		</view>
		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
		<u-toast ref="uToast"></u-toast>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	import recommend from "./components/recommend.vue"
	export default {
		components: {
recommend
		},
		data() {
			return {
				isvalue: false,
				orderdetail: {},
				orderNo: '',
				userId: '',
				joinpeople: '',
				couponList: [],
				choosecoupon: [],
				allprice: '',
				isshowpage: false,
			}
		},

		onLoad(option) {
			let _this = this
			this.userId = getstorage("userId")
			this.orderNo = option.id
			uni.$on("choosecoupon", (data) => {

				this.choosecoupon = data.data
				this.orderdetail.paidMoney = this.allprice
				this.choosecoupon.filter(res => {
					this.orderdetail.paidMoney = this.orderdetail.paidMoney - res.discountMoney
				})
				if (this.orderdetail.paidMoney <= 0) {
					this.orderdetail.paidMoney = 0.01
				}
			})
			this.getcode()
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			contentHeight() {
				return `calc(100vh - ${this.navbarHeight}px - 26rpx)`
			}
		},
		onShow() {},
		onReachBottom() {
			uni.$emit('recommend')
		},
		methods: {
			toClick() {
			    uni.navigateTo({
			        url: '/pages/activity/activityRegistration/playfulperson'
			    })
			},
			OnPushshopHome() {
	if(this.orderdetail.shopTypeId==3){
					// 商家
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id='+this.orderdetail.shopId
				})
				}else if (this.orderdetail.shopTypeId==2){
					// 4S
					uni.navigateTo({
						url: '/pages/carShops/4Sdetail/index?id='+this.orderdetail.shopId
					})
				}
			},
			changvalue(e) {
				if (e) {
					this.orderdetail.paidMoney = parseFloat(this.orderdetail.paidMoney) - parseFloat(this.orderdetail
						.scoreDeduction)
					if (this.orderdetail.paidMoney == 0) {
						this.orderdetail.paidMoney = 0.01
					}
				} else {
					this.orderdetail.paidMoney = parseFloat(this.orderdetail.paidMoney) + parseFloat(this.orderdetail
						.scoreDeduction)
				}
			},
			OnPushDetail() {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + this.orderdetail.activityId
				})
			},
			OnGoHome() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnPushcoupon() {
				if (this.orderdetail.status == 1 || this.orderdetail.status == 2 || this.orderdetail.status == 3) {
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
				let scoreDeduction = 0
				if (this.isvalue) {
					scoreDeduction = this.orderdetail.scoreDeduction
				}
				this.showloading = true
				this.$request.post("/coc-active/api/v1/sign_up/payment", {
					scoreDeduction: scoreDeduction,
					couponUserNews: couponUserNews,
					payType: '3',
					signUpId: this.orderdetail.id,
					activityId: this.orderdetail.activityId,
					setMealId: this.orderdetail.activitySetMealId,
					isInsurance: isjoin,
					subOpenId: getstorage('openid'),
					setMealAmount: this.orderdetail.flashSalePrice,
					scoreDeduction: this.orderdetail.scoreDeduction
				}).then(res => {
					if (res.code == 200) {
						this.showloading = false
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
							.id).then(res => {})
						uni.showToast({
							icon: 'none',
							title: '支付失败'
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
					this.allprice = res.data.paidMoney
					this.couponList = res.data.couponVOS
					this.choosecoupon = res.data.orderCouponListVO
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			paste(value) {
				uni.setClipboardData({
					data: value
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {
		// margin: 40rpx;
	}

	.card {
		margin: 25rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 25rpx;
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
		// margin: 80rpx;
		text-align: center;
		background-color: #1BD993;
		border-radius: 40rpx;

		text {
			display: inline-block;
			// width: 600rpx;
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
		// margin-top: 80rpx;
		text-align: center;
		background-color: #1BD993;
		border-radius: 40rpx;

		text {
			display: inline-block;
			// width: 600rpx;
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

	.tobbar {
		color: #ffffff;
	}
	.m25{
		margin: 25rpx 25rpx 20rpx 25rpx;
	}
</style>
	