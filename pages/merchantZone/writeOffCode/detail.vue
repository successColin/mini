<template>
	<view class="page">
		<view v-if="isShow">
			<scroll-view scroll-y="true" :style="{maxHeight: height}">
				<view class="card">
					<view class="title">
						{{dataList.title}}
					</view>
					<view class="package">
						<view>
							{{dataList.activitySetMealName}}
						</view>
						<view style="color: #222222;">￥{{dataList.paidMoney}}x{{dataList.activitySetMealNum}}</view>
					</view>
					<view style="font-size: 24rpx;color: #666666;margin-top: 20rpx;">
						活动场次：{{dataList.activityBeginTime}}-{{dataList.activityEndTime}}
					</view>
					<view v-if="dataList.isExpert==1"
						style="font-size: 24rpx;color: #666666;margin-top: 20rpx;display: flex;">
						<view> 联系方式：</view>
						<view>
							<view v-for="(item,index) in dataList.expertMobile" :key="index">
								<view>
									{{item}}
								</view>
							</view>
						</view>
					</view>
					<view v-for="(item,index) in dataList.orderCouponListVO" :key="index">
						<view class="u-flex"
							style="justify-content: space-between;font-size: 24rpx;color: #D91B1B;margin-top: 20rpx;">
							<view>
								{{item.name}}
							</view>

							<view style="color: #D91B1B;">
								-¥{{item.discountMoney}}
							</view>
						</view>
					</view>
					<!-- 			<view class="coupon" v-if="dataList.couponName">
					<view>
						{{dataList.couponName}}
					</view>
					<view>
						-￥{{dataList.couponMoney}}
					</view>
				</view> -->
					<view v-if="dataList.activitySignUpInsurances.length>0">
						<view style="font-size: 28rpx;margin-top: 40rpx;">
							保险
						</view>
						<view>
							<view v-for="(item,index) in dataList.activitySignUpInsurances" :key="index">
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
					<view style="font-size: 28rpx;">
						报名人
					</view>
					<view v-for="(item,index) in dataList.activitySignUpParticipants" :key="index">
						<u-divider v-if="index!=0" :text="null"></u-divider>
						<view style="display: flex;justify-content: space-between;margin-top: 40rpx;">
							<view style="color: #999999;font-size: 28rpx;margin-right: 20rpx;align-self: center;">
								<text v-if="item.participantsType==1"
									style="display: inline-block;width: 80rpx;">成人</text>
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
					<view style="display: flex;justify-content: space-between;">
						<view style="28rpx">合计</view>
						<view style="color: #D91B1B;">
							<text style="font-size: 24rpx;">￥</text>
							<text style="font-size: 44rpx;font-weight: bold;">{{dataList.paidMoney}}</text>
						</view>
					</view>
					<view style="margin-top: 100rpx;">
						<view style="display: flex;justify-content: space-between;">
							<text>订单编号</text>
							<view>
								<text style="margin-right: 20rpx;">{{dataList.orderNo}}</text>
								<text style="color: #D91B1B;" @click="paste(dataList.orderNo)">复制</text>
							</view>
						</view>
						<view style="display: flex;justify-content: space-between;margin-top: 39rpx;">
							<text>{{dataList.orderCode}}</text>
							<text>{{dataList.activitySetMealNum}}份</text>
						</view>
						<view style="display: flex;justify-content: space-between;margin-top: 39rpx;">
							<text>核销状态</text>
							<text>{{dataList.isVerification==1?'已核销':'未核销'}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="bottom-item">
				<view class="u-flex">
				</view>
				<view v-if="dataList.isVerification!=1" class="signup" @click="OnaddVerification">
					<text>确定核销</text>
				</view>
				<view v-else class="signup" @click="scanCode">
					<text>继续核销</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getstorage,
		tologin
	} from '@/utils/index.js'

	export default {
		components: {

		},
		computed: {
			height() {
				return `calc(100vh - 146rpx)`
			}
		},
		data() {
			return {
				orderNo: '',
				dataList: {},
				isShow: false
			}
		},

		onLoad(option) {
			this.orderNo = option.scene
		},
		onShow() {
			if (!this.isShow) {
				if (tologin() !== true) {
					return
				}
				this.getList(this.orderNo)
			}
		},
		methods: {
			OnaddVerification() {
				this.$request.post("/coc-active/api/v1/activity/order/writeOff", {
					orderNo: this.orderNo,
					openid: getstorage("openid")
				}).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: '核销成功',
						});
						this.dataList.isVerification = 1

					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}

				})

			},
			getList(orderNo) {
				this.$request.post("/coc-active/api/v1/activity/order/details", {
					orderNo: orderNo,
					openid: getstorage("openid")
				}).then(res => {
					if (res.code == 200) {
						this.dataList = res.data
						this.isShow = true
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			paste(value) {
				uni.setClipboardData({
					data: value
				});
			},
			//扫码核销
			scanCode() {
				uni.scanCode({
					success: (res) => {
						if (res.path) {
							uni.redirectTo({
								url: '/' + res.path
							})
						} else {
							this.$refs.uToast.show({
								message: '核销码无效',
							});
						}
					},
					fail: res => {
						if (res.errMsg !== 'scanCode:fail cancel') {
							this.$refs.uToast.show({
								message: res.errMsg,
							});
						}
					}
				});
			}
		},

	}
</script>

<style lang="scss">
	.page {
		background-color: rgba(248, 248, 248, 1);
	}

	.card {
		background-color: rgba(255, 255, 255, 1);
		border-radius: 10rpx;
		margin: 20rpx;
		color: rgba(34, 34, 34, 1);
		padding: 44rpx 32rpx;
		font-size: 28rpx;

		.title {
			font-size: 28rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.package {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #666666;
			margin-top: 30rpx;
		}

		.coupon {
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			color: #D91B1B;
		}
	}

	.bottom-status {
		display: flex;
		justify-content: space-between;
		margin: 40rpx;
		font-size: 28rpx;
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
</style>
