<template>
	<view class="page">
		<!--  #ifdef MP-WEIXIN  -->
		<view class="search-top">
			<u-navbar leftIconSize='0'>
				<view @click="OnGoHome" class="u-nav-slot search-top" slot="center">
					<view class="u-flex" style="margin-left: 6%;line-height: 170%;">
						<u-icon name="home" color="#222222" size="28"></u-icon>
					</view>
					<view style="margin-right: 25%;" class="u-flex top-conent">
						支付订单
					</view>

				</view>
			</u-navbar>
		</view>
		<view style="margin-top: 24%;"></view>
		<!--  #endif -->

		<view style="padding: 32rpx;background-color: #ffffff;border-radius: 10rpx;">
			<view style="font-size: 28rpx;">
				您一共需要支付费用
			</view>
			<view class="row">
				<view style="color: #666666;">套餐：{{MealName}}</view>
				<view>￥{{flashSalePrice}}x{{setMealNum}}</view>
			</view>
			<view style="font-size: 24rpx;color: #666666;margin-top: 20rpx;">
				活动场次：{{Events}}
			</view>
			<view
				v-if="(orderdetail.isScoreDeduction==1||orderdetail.status==0||orderdetail.status==7)&&orderdetail.scoreDeduction>0"
				class="row  mainRed">
				<view>积分抵扣</view>
				<view>￥-{{orderdetail.scoreDeduction}}</view>
			</view>
			<view v-for="(item,index) in choosecoupon" :key="index">
				<view class="u-flex"
					style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
					<view>
						{{item.couponName}}
					</view>
					<view style="color: #D91B1B;">
						-¥{{item.discountMoney}}
					</view>
				</view>
			</view>
			<view v-if="insuranceList.length>0">
				<view style="font-size: 28rpx;margin-top: 40rpx;">
					保险
				</view>
				<view>
					<view v-for="(item,index) in insuranceList" :key="index">
						<view v-if="item.istrue" class="u-flex"
							style="justify-content: space-between;font-size: 24rpx;margin-top: 20rpx;">
							<view style="font-size: 20rpx;color: #666666;">
								{{item.insuranceName}}
							</view>
							<view style="color: #666666;">
								¥{{item.insurancePriceStr}}x{{choosepeople}}x{{day}}天
							</view>
						</view>
					</view>

					<view class="u-flex"
						style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
						<view>
							官方减免
						</view>
						<view style="color: #D91B1B;">
							-¥{{officialrelief}}
						</view>
					</view>
				</view>
			</view>
			<view>

			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex" style="justify-content: space-between;" v-if="isScoreDeduction!=1">
				<view class="u-flex" style="font-size: 24rpx;">
					<image src="../static/image/youhuiquan.png" style="width: 28rpx;height: 20rpx;margin-top: 6rpx;">
					</image>
					<view style="margin-left: 10rpx;">优惠券</view>
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

			<!-- 积分抵扣 -->
			<view v-if="(isScoreDeduction==1&&scoreDeduction>0)&&!orderdetail" class="u-flex mt20"
				style="justify-content: space-between;">
				<view class="u-flex" style="font-size: 24rpx;">
					<image src="../static/image/jifendikou.png" style="width: 28rpx;height: 28rpx;margin-top: 6rpx;">
					</image>
					<view class="ml10">
						<view>
							可用{{scoreDeduction*500}}积分，抵扣{{scoreDeduction}}元
						</view>

						<view class="size24 txtLighGray mt10">
							剩余{{surplusScore}}积分
						</view>
					</view>
				</view>
				<view>
					<u-switch size="20" activeColor="#d91b1b" v-model="isvalue" @change="changvalue"></u-switch>
				</view>
			</view>
			<view v-if="(isScoreDeduction==1&&scoreDeduction>0)&&!orderdetail" class="size20 mainRed mt10"
				style="margin-left: 40rpx;">
				若您有信用卡满减优惠，抵扣后可能不满足其使用门槛
			</view>

			<u-divider v-if="(isScoreDeduction==1&&scoreDeduction>0)&&!orderdetail" :text="null"></u-divider>
			<view style="display: flex;justify-content: space-between;">
				<view style="28rpx">合计</view>
				<view style="color: #D91B1B;">
					<text style="font-size: 24rpx;">￥</text>
					<text style="font-size: 44rpx;font-weight: bold;">{{totalprice.toFixed(2)}}</text>
				</view>
			</view>
		</view>
		<view class="On-pay" v-if="!orderdetail">
			<image src="@/pages/service/static/image/newwxpay.png"
				style="width: 44rpx;height: 40rpx;position: relative;top: 8rpx;left: 220rpx;"></image>
			<text @click="OnPay">微信支付</text>
		</view>
		<view v-else>
			<view class="top-card">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672815483227.png"
					style="width: 386rpx;height: 358rpx;"></image>
				<view style="position: absolute;top: 50rpx;left: calc(50% - 100rpx);">
					<image :src="orderdetail.orderCodeImg" mode="widthFix" style="width: 200rpx;"></image>
				</view>
			</view>
			<view class="card-item" @click="OnPushshop">
				<!-- 活动发起人信息 -->
				<view class="user-info" style="margin-left: 0rpx;">
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
									<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate>
								</view>
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<view style="font-size: 24rpx;margin-top: -1rpx;">5.0</view>
							</view>
							<view class="u-flex" style="margin-top: 14rpx;" v-else-if="orderdetail.shopTypeId==1">
								<image src="@/static/image/guan.png" style="width: 29rpx; height:29rpx"></image>
								<view style="margin-top: -5rpx;">
									<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate>
								</view>
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<view style="font-size: 24rpx;margin-top: -1rpx;">5.0</view>
							</view>
							<view class="u-flex" style="margin-top: 14rpx;" v-else-if="orderdetail.shopTypeId==2">
								<image src="@/static/image/4Sdian.png" style="width: 29rpx; height:29rpx"></image>
								<view style="margin-top: -5rpx;">
									<u-rate :readonly='true' :count="1" v-model="value" size='18'
										active-color="#f7c261">
									</u-rate>
								</view>
								<!-- <view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopVO.star}}</view> -->
								<view style="font-size: 24rpx;margin-top: -1rpx;">5.0</view>
							</view>
						</view>
					</view>
				</view>
			</view>		
		</view>
		
	<view class="app-btn" v-if="istype==1">
				<button open-type="launchApp" app-parameter="wechat"><text class="app">打开APP</text>
				</button>
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
				<view>
				<recommend />
				</view>
		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import recommend from "../components/recommend.vue"
	import {
		getstorage,
		tologin
	} from '@/utils/index.js'
	export default {
		components: {
recommend
		},
		data() {
			return {
				isvalue: false,
				showloading: false,
				userId: '',
				value: 1,
				insuranceList: [], //保险列表
				MealName: '', //套餐名
				setMealNum: '', //套餐数量
				flashSalePrice: '', //套餐价
				Events: '', //活动场次
				allpeople: '', //参加得总人数
				day: '', //参加得天数
				officialrelief: '', //官方减免
				totalprice: '', //总价
				setMealId: '', //套餐id
				activityId: '',
				signUpId: '',
				orderNo: '',
				orderdetail: null,
				choosepeople: '',
				couponList: [],
				choosecoupon: [],
				isScoreDeduction: 0,
				scoreDeduction: 0,
				surplusScore: 0,
				istype:0,
			}
		},

		onLoad(option) {
			let _this = this
			if (this.getOpenerEventChannel().on) {
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('payinfo', function(data) {
					uni.$u.sleep(0).then(() => {
						_this.insuranceList = data.data.list
						_this.couponList = data.data.couponVOS
					})
				})
				this.userId = getstorage("userId")
				this.MealName = option.MealName
				this.setMealNum = option.setMealNum
				this.flashSalePrice = option.flashSalePrice
				this.Events = option.Events
				this.allpeople = option.allpeople
				this.choosepeople = option.choosepeople
				this.officialrelief = option.officialrelief
				this.totalprice = (option.totalprice * 100) / 100
				this.activityId = option.activityId
				this.setMealId = option.setMealId
				this.signUpId = option.signUpId
				this.orderNo = option.orderNo
				this.day = option.day
				this.isScoreDeduction = option.isScoreDeduction
				this.scoreDeduction = option.scoreDeduction
				this.surplusScore = option.surplusScore
				

			} else {
				let obj=JSON.parse(option.data)
				this.userId = getstorage("userId")
				this.MealName = obj.MealName
				this.setMealNum = obj.setMealNum
				this.flashSalePrice = obj.flashSalePrice
				this.Events = obj.Events
				this.allpeople = obj.allpeople
				this.choosepeople = obj.choosepeople
				this.officialrelief = obj.officialrelief
				this.totalprice = (obj.totalprice * 100) / 100
				this.activityId = obj.activityId
				this.setMealId = obj.setMealId
				this.signUpId = obj.signUpId
				this.orderNo = obj.orderNo
				this.day = obj.day
				this.isScoreDeduction = obj.isScoreDeduction
				this.scoreDeduction = obj.scoreDeduction
				this.surplusScore = obj.surplusScore
				this.insuranceList=obj.isInsuranceVOS
				this.couponList = obj.couponVOS
				this.istype=1
			}
			if (!getstorage('token')) {
				tologin()
			}
			uni.$on("choosecoupon", (data) => {
				this.choosecoupon = data.data
				this.totalprice = (option.totalprice * 100) / 100
				this.choosecoupon.filter(res => {
					this.totalprice = this.totalprice - res.discountMoney
				})
				if (this.totalprice <= 0) {
					this.totalprice = 0.01
				}
			})
		},
		onShow() {},
		methods: {
			toClick() {
			    uni.navigateTo({
			        url: '/pages/activity/activityRegistration/playfulperson'
			    })
			},
			OnPushshop(){
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
					this.totalprice = parseFloat(this.totalprice) - parseFloat(this.scoreDeduction)
					if (this.totalprice == 0) {
						this.totalprice = 0.01
					}
				} else {
					if (this.totalprice == 0.01) {
						this.totalprice = 0
					}
					this.totalprice = parseFloat(this.totalprice) + parseFloat(this.scoreDeduction)
				}
			},
			OnPushcoupon() {
				if (this.orderdetail) {
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
		
			Onreturn() {
				uni.navigateBack({
					delta: 2
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
			OnGoHome() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			getcode() {
				this.$request.post("/coc-my/activity/order/detail/v2", {
					orderNo: this.orderNo
				}).then(res => {
					this.orderdetail = res.data
				})
			},
			OnPay() {
				let isjoin = false
				if (this.insuranceList.length == 0) {
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
				this.showloading = true
				let scoreDeduction = 0
				if (this.isvalue) {
					scoreDeduction = this.scoreDeduction
				}
				this.$request.post("/coc-active/api/v1/sign_up/payment", {
					scoreDeduction: scoreDeduction,
					couponUserNews: couponUserNews,
					payType: '3',
					signUpId: this.signUpId,
					activityId: this.activityId,
					setMealId: this.setMealId,
					isInsurance: isjoin,
					subOpenId: getstorage('openid'),
					setMealAmount: this.flashSalePrice
				}).then(res => {
					if (res.code == 200) {
						this.showloading = false
						this.wxpay(res.data.payment.miniPayRequest)
					} else {
						this.showloading = false,
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
								//
								_this.getcode()
								// uni.navigateTo({
								// 	url: '/pages/my/myorder/couponcode?orderNo=' + _this
								// 		.dataList.activitySignUp.orderNo
								// })
							}
						})
					},
					fail: function(err) {
						_this.$request.get("/coc-active/api/v1/sign_up/paymentFailed/" + _this.signUpId).then(
							res => {})
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
					}
				});
			},

		}
	}
</script>

<style lang="scss">
	.page {
		margin: 40rpx;
	}

	.search-top {
		width: 100%;
		// margin-left: -100rpx;
		display: flex;
		justify-content: space-between;
		line-height: 46rpx;
		margin-right: 26%;
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
margin-bottom: 20rpx;
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
	.app-btn {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		background-color: #ffffff;
	margin-left: -40rpx;
		.app {
			width: 320rpx;
			border-radius: 20rpx;
			background-color: #D91B1B;
			text-align: center;
			font-size: 28rpx;
			color: #ffffff;
			line-height: 65rpx;
			display: inline-block;
		}
	}

</style>
