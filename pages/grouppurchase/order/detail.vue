<template>
	<view class="page">
		<view v-if="isshowpage">
			<view class="card" @click="OnPushDetail">

				<view class="u-flex alc" style="margin-bottom: 30rpx;" @click.stop="OnPushshopHome">
					<view>{{dataList.shopVO.baseName}}</view>
					<view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
				<view class="u-flex">
					<view>
						<image style="width: 120rpx;height: 120rpx; border-radius: 10rpx;" :src="dataList.coverPicture">
						</image>
					</view>
					<view style="margin-left: 23rpx;">
						<view class="size28 fwb moreLine" style="width: 500rpx;">
							{{dataList.productTitle}}
						</view>
						<view class="u-flex jsb size24 alc" style="margin-top: 14rpx;">
							<view>
								{{dataList.setMealName}}
							</view>
							<view>
								¥{{dataList.setMealFlashSalePrice}}*{{dataList.groupPurchaseSetMealNum}}
							</view>
						</view>
					</view>
				</view>


			</view>
			<!-- // -->
			<!-- 订单资料 -->
			<view class="card">
				<view v-if="dataList.status==1||dataList.status==2" class="u-flex jsb">
					<view class="size24 fwb">订单编号</view>
					<view class="u-flex alc">
						<view>
							{{dataList.orderNo}}
						</view>
						<view class="ml10" @click="OnCopy(dataList.orderNo)">
							<image style="width: 26rpx;height: 26rpx;" src="../static/image/redfuzhi.png"></image>
						</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="u-flex jsb">
					<view class="size24 fwb">联系人</view>
					<view>{{dataList.name}}</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="u-flex jsb">
					<view class="size24 fwb">手机号</view>
					<view>{{dataList.mobile}}</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view v-if="dataList.plate" class="u-flex jsb">
					<view class="size24 fwb">车牌号</view>
					<view>{{dataList.plate}}</view>
				</view>
				<u-divider v-if="dataList.plate" :text="null"></u-divider>
				<view class="u-flex jsb">
					<view class="size24 fwb">备注</view>
					<view>{{dataList.orderRemark}}</view>
				</view>

			</view>
			<view class="card">
				<view class="u-flex jsb">
					<view class="size24 fwb">M团价</view>
					<view class="txtLighGray size24 txtls">￥{{dataList.marketPrice}}</view>
				</view>
				<view v-if="dataList.couponOtherContribute>0">

					<u-divider :text="null"></u-divider>
					<view class="u-flex jsb">
						<view class="size24 fwb">优惠</view>
						<view class="size24">
							<text class="txtLighGray" v-if="dataList.activityPaymentPreferenceId==5">农行信用卡满减</text>
							<text class="txtLighGray" v-if="dataList.activityPaymentPreferenceId==6">工行信用卡满减</text>
							<text class="mainRed ml10 fwb">-￥{{dataList.couponOtherContribute}}</text>
						</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="u-flex jsb">
					<view class="size24 fwb">实际支付</view>
					<view class="mainRed size24 ">￥<text class="fwb size32">{{dataList.buyerPayAmount}}</text></view>
				</view>
			</view>
			<!-- 二维码区域 -->
			<view v-if="dataList.status==1">
				<view class="tac fwb">
					{{dataList.orderCode}}
				</view>

				<view class="code-img">
					<image mode="widthFix" style="width: 251rpx;height: 245rpx;" :src="dataList.orderCodeImg">
					</image>
				</view>
				<view class="tac size24 txtDarkGray" style="margin-top: 24rpx;">
					请勿随意截图发给他人
				</view>
				<view class="tac size28 fwb u-flex alc jsc" style="margin-top: 24rpx;">
					<view>
						剩余可核销数量：{{dataList.verificationNum}}份
					</view>
					<view class="drawback" v-if="dataList.verificationNum>0&&dataList.nonRefund==0" @click="Ondrawback">
						申请退款
					</view>

				</view>
			</view>
			<view v-if="dataList.status==0" class="u-flex jsc mb20">
				<view class="On-pay">
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20230906/file_1693984892940.png"
						style="width: 44rpx;height: 40rpx;position: relative;top: 8rpx;right: 15rpx;"></image>
					<text @click="OnPay">微信支付</text>
				</view>

			</view>
			<!-- // -->
			<!-- 合作商家 -->
			<!-- 		<view class="card-enterprice" @click="OnPushshopHome">
			<view class="u-flex jsb alc">
				<view>{{dataList.shopVO.baseName}}</view>
				<view class="mainhome-btn">主页</view>
			</view>
			<view class="size24 mt20">
				营业时间 {{dataList.shopVO.openingHours}}
			</view>
			<view class="size24 mt20" @click.stop="OnPushMap">
				{{dataList.shopVO.baseAddress}}
			</view>
		</view> -->
			<!-- // -->
			<view class="title-info">
				购买须知
			</view>
			<view class="card-goumai">
				<ul class="ul-item">

					<li v-if="dataList.holidaysIsUse==1" class="li-item" style="margin-top: 0rpx;"><text
							class="txtDarkGray">节假日通用</text></li>

					<li v-else-if="dataList.holidaysIsUse==0" class="li-item"><text
							class="txtDarkGray">不可用日期:{{dataList.groupPurchaseNotUseTimesMsg}}</text></li>
					<li class="li-item"><text class="txtDarkGray">使用截止时间: {{dataList.expirationTime}}</text></li>

					<li v-if="dataList.isRefund==0" class="li-item"><text
							class="txtDarkGray">本商品为限时限量优惠团购，请您在订单使用时间内及时消费使用，一经购买不支持退款</text></li>

					<li v-if="dataList.remark" class="li-item"><text class="txtDarkGray">特殊说明：{{dataList.remark}}</text>
					</li>
				</ul>
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
			<view style="height: 160rpx;">

			</view>
			<view class="app-btn" v-if="istype==1">
				<button open-type="launchApp" app-parameter="wechat"><text class="app">打开APP</text>
				</button>
			</view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import recommend from "../components/recommend.vue"
	export default {
		components: {
recommend
		},
		data() {
			return {
				id: 0,
				dataList: {},
				isshowpage: false,
				istype: 0,
			}
		},

		onLoad(option) {
			this.id = option.id
			if (option.istype == 1) {
				this.istype = 1
			}
			this.getList()
		},
		onShow() {},
		// onUnload(){ 
		//        uni.reLaunch({
		//        	url: '/pages/grouppurchase/order/list'
		//        });
		//         },
		methods: {
			toClick() {
			    uni.navigateTo({
			        url: '/pages/activity/activityRegistration/playfulperson'
			    })
			},
			OnPushDetail() {
				if (this.dataList.type == 0) {
					uni.navigateTo({
						url: '/pages/grouppurchase/detail?id=' + this.dataList.groupPurchaseProductId
					})
				} else {
					uni.navigateTo({
						url: '/pages/grouppurchase/newpeople/detail?id=' + this.dataList.groupPurchaseProductId
					})
				}
			},
			Ondrawback() {
		
				let _this = this
				console.log(_this.id);
				uni.navigateTo({
					url: '/pages/grouppurchase/order/drawbackindex?id=' + this.id + '&type=1',
					success: function(res) {
						res.eventChannel.emit('getinfo', {
							data: _this.dataList
						})
					}
				})
			},
			wxpay(data) {
				let _this = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.miniPayRequest.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.miniPayRequest.nonceStr, // 随机字符串
					package: data.miniPayRequest.package, // 固定值
					signType: data.miniPayRequest.signType, //固定值
					paySign: data.miniPayRequest.paySign, //签名
					appid: data.miniPayRequest.appId,
					success: function(res) {
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								setTimeout(() => {
									// 跳转到登录页
									_this.getList()
								}, 1000)

							}
						})
					},
					fail: function(err) {
						_this.$request.get('/coc-active/api/v1/group_purchase/failOrder/' + _this.id).then(
							res => {

							})
					}
				});
			},
			OnPay() {
				this.$request.post("/coc-active/api/v1/group_purchase/groupPayment", {
					groupPurchaseProductId: this.dataList.groupPurchaseProductId,
					groupPurchaseSetMealId: this.dataList.groupPurchaseSetMealId,
					groupPurchaseSetMealNum: this.dataList.groupPurchaseSetMealNum,
					mobile: this.dataList.mobile,
					name: this.dataList.name,
					orderId: this.id,
					plate: this.dataList.plate,
					subOpenId: uni.getStorageSync("openid")
					// remark:this.dataList.remark,
				}).then(res => {
					if (res.code == 200) {
						this.id = res.data.orderId
						this.wxpay(res.data.payment)
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			OnCopy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
						})
					}
				})
			},
			OnPushMap() {
				let _this = this
				uni.openLocation({
					latitude: _this.dataList.shopVO.lat,
					longitude: _this.dataList.shopVO.lng,
					success: function() {
						console.log('success');
					}
				});
			},
			OnPushshopHome() {
				if (this.dataList.shopVO.shopTypeId == 3) {
					// 商家
					uni.navigateTo({
						url: '/pages/activityMall/business/index?id=' + this.dataList.shopVO.shopId
					})
				} else if (this.dataList.shopVO.shopTypeId == 2) {
					// 4S
					uni.navigateTo({
						url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopVO.shopId
					})
				}
			},
			getList() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$request.get('coc-active/api/v1/group_purchase/orderDetails/' + this.id).then(res => {
					this.dataList = res.data
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
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 25rpx;
		padding: 24rpx;
	}

	.code-img {
		width: 300rpx;
		height: 300rpx;
		background: #FFFFFF;
		border-radius: 50rpx;
		margin: 58rpx auto;
		padding-top: 25rpx;
		text-align: center;
		margin-bottom: 0rpx;
	}

	.card-enterprice {
		background-color: #ffffff;
		margin: 25rpx;
		border-radius: 10rpx;
		padding: 24rpx;
	}

	.mainhome-btn {
		width: 80rpx;
		height: 40rpx;
		border: 1rpx solid #D91B1B;
		border-radius: 20rpx;
		line-height: 40rpx;
		color: #D91B1B;
		font-size: 24rpx;
		text-align: center;
	}

	.card-goumai {
		padding: 32rpx 24rpx 32rpx 10rpx;
		background-color: #ffffff;
		margin: 25rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
	}

	.ul-item {
		list-style-type: disc;
	}

	.li-item {
		color: #D91B1B;
		font-size: 24rpx;
		display: list-item;
		margin-left: 40rpx;
		margin-top: 24rpx;
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

	.title-info {
		font-size: 28rpx;
		font-weight: bold;
		border-left: 10rpx solid #D91B1B;
		margin-left: 25rpx;
		padding-left: 20rpx;
	}

	.On-pay {
		text-align: center;
		background-color: #1BD993;
		border-radius: 40rpx;
width: 500rpx;
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

	.drawback {
		width: 132rpx;
		height: 40rpx;
		border: 1rpx solid #666666;
		border-radius: 20rpx;
		text-align: center;
		line-height: 40rpx;
		font-size: 24rpx;
		color: #666666;
		margin-left: 60rpx;
	}

	.app-btn {
		position: fixed;
		bottom: 0rpx;
		width: 100%;
		background-color: #ffffff;

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
	.m25{
		margin: 0 25rpx;
	}
</style>
