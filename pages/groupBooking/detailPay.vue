<template>
	<view class="page">
		<view class="card">
			<view class="size28 fwb moreLine" style="width: 626rpx;">
				{{ dataList.title }}
			</view>
			<view class="size24" style="margin-top: 24rpx;">
				{{ dataList.name }}
			</view>
			<view class="u-flex jsb" style="margin-top: 24rpx;">
				<view class="mainRed size32 fwb"><text class="size24"><text v-if="dataList.productStatus == 2">订金</text>
					￥</text>
					<text v-if="dataList.productStatus == 2">{{ toFixeds(dataList.depositPrice) }}</text>
					<text v-if="dataList.productStatus == 3">{{ toFixeds(dataList.teamworkPrice) }}</text>
					<view v-if="payList.length">
						<view v-for="(v) in payList" :key="v.paymentPreferenceId">
							<text v-if="v.paymentPreferenceId == 5">农行信用卡</text>
							<text v-if="v.paymentPreferenceId == 6">工行信用卡</text>
							<text v-if="v.paymentPreferenceId == 7">邮储信用卡</text>
							<text v-if="v.paymentPreferenceId == 8">民生信用卡</text>
							<text v-if="v.paymentPreferenceId == 4">人保信用卡</text>
							<text v-if="v.paymentPreferenceId == 10">官方补贴</text>
							立减
							<text class="size24 fwb">￥</text> {{ toFixeds(v.deductionAmount) }}
						</view>
					</view>

				</view>

				<!-- <text  class="ml10">
				         <view v-for="(v) in groupDetail.paymentPreference" :key="v.paymentPreferenceId">
						 减免金额
						  {{v. paymentPreferenceId}}优惠id
						  {{v. paymentPreferenceName}}优惠名字
						  {{ v.remark}}优惠说明
						</view>
						<text v-if="dataList.activityPaymentPreferenceId == 5">工行信用卡立减<text
								class="size24 fwb">￥</text> {{v.deductionAmount  }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 7">邮储信用卡立减<text
								class="size24 fwb">￥</text>{{v.deductionAmount  }}</text>
					</text> -->

				<!-- <text  class="ml10">
				         <view v-for="(v) in dataList.paymentPreference" :key="v.paymentPreferenceId">
						  {{v.deductionAmount  }}减免金额
						  {{v. paymentPreferenceId}}优惠id
						  {{v. paymentPreferenceName}}优惠名字
						  {{ v.remark}}优惠说明
						</view>
						<text v-if="dataList.activityPaymentPreferenceId == 5">工行信用卡立减<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 7">邮储信用卡立减<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						
					</text> -->
				<view>
					<u-number-box buttonSize='25' :max='maxnum' :min='1' inputWidth='30' v-model="groupPurchaseSetMealNum"
						@change="changenum"></u-number-box>
				</view>
			</view>
		</view>
		<view class="card">
			<u--form labelWidth='60' labelPosition="left" :model="formdata" :rules="rules" ref="form1">
				<u-form-item :required='true' label="联系人" prop="name" borderBottom ref="item1">
					<u--input v-model="formdata.name" border="none"></u--input>
				</u-form-item>
				<u-form-item :required='true' label="手机号" prop="mobile" borderBottom ref="item1">
					<u--input type='number' v-model="formdata.mobile" border="none"></u--input>
				</u-form-item>

				<u-form-item label="备注" ref="item1">
					<u--input v-model="formdata.remark" border="none" placeholder="请输入"></u--input>
				</u-form-item>
			</u--form>
		</view>
		<view>
			<u-loading-icon :show="showLoding"></u-loading-icon>
		</view>

		<!-- 底部悬浮框 -->
		<view @click="OnOpenDetail" id="bottomPay">
			<view class="u-flex jsb alc">
				<view v-if="dataList.productStatus == 2">
					<text style="font-size: 24rpx;">
						合计：
					</text>
					<text class="size24 mainRed fwb">
						<text>订金</text>¥ 
					</text>
					<text style="font-size: 44rpx;" class="mainRed fwb">
						{{ toFixeds(dataList.depositPrice*groupPurchaseSetMealNum) }}
					</text>

				</view>
				<view v-if="dataList.productStatus == 3">
					<text style="font-size: 24rpx;">
						合计：
					</text>
					<text class="size24 mainRed fwb">
						¥
					</text>
					<text style="font-size: 44rpx;" class="mainRed fwb">
						{{ toFixeds(dataList.teamworkPrice*groupPurchaseSetMealNum) }}
					</text>

				</view>
				<view class="u-flex">
					<view class="u-flex alc" style="margin-right: 20rpx;">
						<view style="font-size: 24rpx;margin-right: 6rpx;">明细</view>
						<view>
							<u-icon name="arrow-up" :bold='true' color="#222222"></u-icon>
						</view>
					</view>
					<view class="mt10" id="payBtn" @click.stop="userIsCanBuyProduct"><text>去支付</text></view>
				</view>
			</view>
		</view>

		<u-popup overlayOpacity='0.001' :safeAreaInsetBottom="false"
			:customStyle="{ position: 'relative', bottom: '130rpx' }" :show="showdetail" @close="showdetail = false"
			mode="bottom">
			<view class="pop-detail">
				<view class="detail-title">
					<view>费用明细</view>
					<view @click="Onclosedetail" style="position: relative;left: 240rpx;">
						<u-icon name="close-circle" size="24"></u-icon>
					</view>
				</view>
				<view style="font-size: 28rpx;margin-top: 20rpx;">
					{{ dataList.title }}
				</view>
				<view class="u-flex"
					style="justify-content: space-between;font-size: 24rpx;color: #666666;margin-top: 20rpx;">
					<view>
						{{ dataList.name }}
					</view>
					<view v-if="dataList.productStatus == 2" style="color: red;">
						<text>订金</text>¥{{ toFixeds(dataList.depositPrice) }}x{{ groupPurchaseSetMealNum }}
                          
					</view>
					<view v-if="dataList.productStatus == 3" style="color: red;">

						¥{{ toFixeds(dataList.teamworkPrice) }}x{{ groupPurchaseSetMealNum }}
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :show="showplay" mode="center" @close="closes" @open="opens"  round="10rpx" style="background: #FFFFFF;">
			<view class="payview">
				<view class="coutentpay">您有订单未支付，请先完成支付或取消订单</view>
				<view class="footpay"><button class="details" @click="navtodetail">再看看</button>
					 <button class="orders" @click="navtorder">查看订单</button></view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
		<view style="height: 140rpx;"></view>
	</view>
</template>

<script>

import {
	tologin,
	getstorage
} from '@/utils/index.js'
export default {
	components: {

	},
	data() {
		return {
			showplay: false,
			isnumberbox: false,
			rules: {
				'mobile': [{
					required: true,
					message: '请输入手机号',
					trigger: ['change', 'blur'],
				},

				{
					// 自定义验证函数，见上说明
					validator: (rule, value, callback) => {
						// 上面有说，返回true表示校验通过，返回false表示不通过
						// uni.$u.test.mobile()就是返回true或者false的
						return uni.$u.test.mobile(value);
					},
					message: '手机号码不正确',
					// 触发器可以同时用blur和change
					trigger: ['change', 'blur'],
				}
				],
				'name': {
					type: 'string',
					required: true,
					message: '请填写联系人',
					trigger: ['blur', 'change']
				},

			},
			payList: [],
			formdata: {
				name: '',
				mobile: '',
				remark: ''
			},
			computePrice:null,
			showLoding: false,
			subOpenId: uni.getStorageSync('openid') || '',
			forwardUserId: '',
			groupPurchaseSetMealNum: 1,
			maxnum: 999,
			dataList: {},
			istype: 0,
			showcarkeyboard: false,
			showdetail: false,
			orderId: null,
			formType: 1
		}
	},

	onLoad(option) {
		if (!getstorage('token')) {
			tologin()
		}
		
		if (option.formType == 2) {
			this.formType = 2;
			this.init(option.groupBooking);
		} else {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getinfo', (data) => {
				this.dataList = data.data

				this.payList = data.data.paymentPreference

			})
		}

		this.forwardUserId = Number(option.forwardUserId);

		// 个人信息
		this.formdata.name = getstorage('nickname')
		this.formdata.mobile = getstorage('mobile')

	},
	onShow() {
		this.formdata.name = getstorage('nickname')
		this.formdata.mobile = getstorage('mobile')
	},
	onReady() {
		this.$refs.form1.setRules(this.rules)
	},
	methods: {
		init(id) {
			this.$request
				.post("/coc-active/api/v1/groupTeam/getProductDetails", { id })
				.then((res) => {
					this.dataList = res.data;
					this.payList = res.data.paymentPreference
				})
		},
		wxpay(data) {
			let orderId = this.orderId; // 保存 this.orderId 到一个变量中
			uni.requestPayment({
				provider: 'wxpay', //支付类型-固定值
				timeStamp: data.miniPayRequest.timeStamp, // 时间戳（单位：秒）
				nonceStr: data.miniPayRequest.nonceStr, // 随机字符串
				package: data.miniPayRequest.package, // 固定值
				signType: data.miniPayRequest.signType, //固定值
				paySign: data.miniPayRequest.paySign, //签名
				appid: data.miniPayRequest.appId,
				success: (res) => {
					uni.showToast({
						icon: 'success',
						title: '支付成功',
						complete: () => {
							setTimeout(() => {
								console.log('后',orderId)
								if (_this.formType === 2) {
									wx.navigateBack({
											delta: getCurrentPages().length // 返回上一级页面或多级页面
									});
								} else {
									uni.reLaunch({
										// pages/groupBooking/orderDetails
										url: '/pages/groupBooking/orderDetails?id=' + orderId
									})
								}
								
							}, 3000)

						}
					})
				},
				fail: function (err) {

				}
			});
		},
		toFixeds(item) {
			return Number(item).toFixed(2);
		},
		userIsCanBuyProduct() {
			this.showLoding = true
			this.$request.post('/coc-active/api/v1/payment/preference/userIsCanBuyProduct', {
				activityPaymentPreferenceId: this.dataList.activityPaymentPreferenceId,
				goodsId: this.dataList.id,
				type: 9,
				userId: uni.getStorageSync("userId")
			}).then(res => {
			
				if (res.code == 200) {
					if (res.data.isCanBuy == 1) {
						this.OnPay()
					}
				} else {
					uni.$u.toast(res.message)
				}
			})
		},
		OnPay() {
			this.$refs.form1.validate().then(res => {
				let orderId = null
				if (this.orderId) {
					orderId = this.orderId
				}
				let msg = {
					forwardUserId: this.forwardUserId,//分享人id
					groupTeamSetMealId: this.dataList.groupTeamSetMealId,//拼团套餐id
					groupTeamProductId: this.dataList.id,// 拼团id
					groupTeamSetMealNum: this.groupPurchaseSetMealNum,//套餐个数
					mobile: this.formdata.mobile,//拼团用户手机号码
					name: this.formdata.name,//拼团用过姓名
					orderId: orderId,//订单Id
					payType: 2, //支付方式
					paymentPreferenceId: this.dataList.paymentPreferenceId == null ? 0 : this.dataList.paymentPreferenceId,//活动支付优惠id
					remark: this.formdata.remark,//订单备注
					subOpenId: this.subOpenId//用户openId	
				}
				if (this.dataList.userInitiateAssistId) {
					msg.userInitiateAssistId = this.dataList.userInitiateAssistId
				}
				// console.log('团购的支付分享人id', this.forwardUserId)
				msg.subOpenId = uni.getStorageSync("openid")
				this.$request.post("/coc-active/api/v1/groupTeamPurchase/groupTeamPayment", msg).then(res => {
					this.showLoding = false
					console.log(res);
					if (res.code == 200) {
						this.orderId = res.data.orderId
						console.log(this.orderId);
						this.wxpay(res.data.payment)
					} else if (res.code == 303)  {
							this.showplay=true
					} else{
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			})
		},
		Onclosedetail() {
			this.showdetail = false
		},
		OnOpenDetail() {
			this.showdetail = !this.showdetail
		},
		changekeyboard(value) {
			if (this.formdata.plate.length == 8) {
				return false
			}
			this.formdata.plate = this.formdata.plate + value
		},
		opens() {
			this.showplay = true
        },
	  navtodetail(){
		uni.navigateBack({
         delta: 1
      });
	  this.showplay = false
	  },
	  navtorder(){
        uni.navigateTo({
			url: '/pages/my/OrderGoods/index',
		});
		this.showplay = false
	  },
	 closes() {
        this.showplay = false
      
      },
		OpenCarkeyboard() {
			this.showcarkeyboard = true
		},
		changenum(e) {
			
			
		},
	}
}
</script>

<style lang="scss">
.payview {
	width: 700rpx;
	text-align: center;
	height: 361rpx;
	border-radius: 10rpx;
	background: #FFFFFF;
	

	.coutentpay {
		margin-left: 82rpx;
		margin-top: 106rpx;
		text-align: center;
		width: 535rpx;
		height: 29rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #222222;
		line-height: 36rpx;
	}

	.footpay {
	
		margin-top: 140rpx;
		margin-left: -5rpx;
		display: flex;
		.details {
			width: 246rpx;
			height: 80rpx;
			font-size: 32rpx;
			color: #fff;
			background: #999999;
			border-radius: 40rpx;
		}

		.orders {
			width: 246rpx;
			height: 80rpx;
			font-size: 32rpx;
			color: #fff;
			background: #D91B1B;
			border-radius: 40rpx;
		}
	}
}


#bottomPay {
	position: fixed;
	bottom: 0rpx;
	width: 100%;
	z-index: 10076;
	border-top: 1rpx #e7e7e7 solid;
	background-color: #ffffff;
	padding: 30rpx 20rpx 50rpx 20rpx;
	box-sizing: border-box;
}

.page {}

.card {
	padding: 28rpx;
	background: #FFFFFF;
	border-radius: 10rpx;
	margin: 25rpx;
}

.minus {
	width: 22px;
	height: 22px;
	border-width: 1px;
	border-color: #E6E6E6;
	border-style: solid;
	border-top-left-radius: 100px;
	border-top-right-radius: 100px;
	border-bottom-left-radius: 100px;
	border-bottom-right-radius: 100px;
	@include flex;
	justify-content: center;
	align-items: center;
}

.input {
	padding: 0 10px;
}

.plus {
	width: 22px;
	height: 22px;
	background-color: #FF0000;
	border-radius: 50%;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	justify-content: center;
	align-items: center;
}

#payBtn {
	text {
		width: 180rpx;
		height: 60rpx;
		background-color: #D91B1B;
		border-radius: 10rpx;
		display: inline-block;
		text-align: center;
		color: #ffffff;
		line-height: 60rpx;
		font-size: 28rpx;
	}
}



.pop-detail {
	background-color: #ffffff;
	padding: 60rpx 50rpx 200rpx 60rpx;

	.detail-title {
		display: flex;
		justify-content: center;
		font-size: 32rpx;
		font-weight: bold;
	}
}</style>
