<template>
	<view class="page">
		<view class="card">
			<view class="size28 fwb moreLine" style="width: 626rpx;">
				{{ dataList.title }}
			</view>
			<view class="size24" style="margin-top: 24rpx;">
				{{ dataList.mealname }}
			</view>
			<view class="u-flex jsb" style="margin-top: 24rpx;">
				<view class="mainRed size32 fwb"><text class="size24">￥</text><text>{{ dataList.allmealprice }}</text>
					<text v-if="dataList.bankCardPrice > 0" class="ml10">
						<text v-if="dataList.activityPaymentPreferenceId == 6">工行信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 5">农行信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 7">邮储信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 8">民生信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 10">官方补贴价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
					</text>
				</view>
				<view>
					<u-number-box :disabled="true" buttonSize='25' :max='maxnum' inputWidth='30'
						v-model="groupPurchaseSetMealNum" @change="changenum"></u-number-box>
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
				<u-form-item v-if="dataList.activityPaymentPreferenceId == 4" :required='true' label="车牌号" prop="plate"
					borderBottom ref="item1">
					<view @click='OpenCarkeyboard' style="margin-left: 30rpx;">
						<u--input disabledColor='#ffffff' :disabled='true'
							:customStyle="{ color: '#999999', height: '34rpx' }" placeholder="请输入车牌号" border="none"
							v-model="formdata.plate"></u--input>
					</view>
				</u-form-item>
				<u-form-item label="备注" ref="item1">
					<u--input v-model="formdata.remark" border="none" placeholder="请输入"></u--input>
				</u-form-item>
			</u--form>
		</view>


		<!-- 底部悬浮框 -->
		<view @click="OnOpenDetail" id="bottomPay">
			<view class="u-flex jsb alc">
				<view>
					<text style="font-size: 24rpx;">
						合计：
					</text>
					<text class="size24 mainRed fwb">
						¥
					</text>
					<text style="font-size: 44rpx;" class="mainRed fwb">
						{{ dataList.allmealprice }}
					</text>
					<text v-if="dataList.bankCardPrice > 0" class="ml10 mainRed fwb size24">
						<text v-if="dataList.activityPaymentPreferenceId == 6">工行信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 5">农行信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 7">邮储信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 8">民生信用卡专属价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
						<text v-if="dataList.activityPaymentPreferenceId == 10">官方补贴价<text
								class="size24 fwb">￥</text>{{ dataList.bankCardPrice }}</text>
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


		<!-- <view class="keyboard"> -->
		<u-keyboard zIndex='9999999999' @backspace='Onbackspace' @cancel='showcarkeyboard = false'
			@confirm='showcarkeyboard = false' @change='changekeyboard' ref="uKeyboard" mode="car"
			:show="showcarkeyboard"></u-keyboard>
		<!-- </view> -->
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
						{{ dataList.mealname }}
					</view>
					<view>
						¥{{ dataList.mealprice }}x{{ groupPurchaseSetMealNum }}
					</view>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
		<view style="height: 140rpx;">

		</view>
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
				'plate': {
					type: 'string',
					required: true,
					message: '请输入车牌号',
					trigger: ['blur', 'change']
				}
			},
			formdata: {
				name: '',
				mobile: '',
				plate: '',
				remark: ''
			},
			forwardUserId: '',
			groupPurchaseSetMealNum: 1,
			maxnum: 999,
			dataList: {},
			istype: 0,
			showcarkeyboard: false,
			showdetail: false,
			orderId: null
		}
	},

	onLoad(option) {
		let _this = this
		if (option.istype == 'wx') {

			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getinfo', function (data) {
				_this.dataList = data.data
				_this.dataList.allmealprice = _this.dataList.mealprice
				_this.maxnum = data.data.stock - data.data.saleNum
			})
		}
		if (option.from == 'app') {
			this.istype = 1
			this.dataList = option
			this.dataList.allmealprice = this.dataList.mealprice
			this.maxnum = option.stock - option.saleNum
		}
		this.forwardUserId = option.forwardUserId
		if (!getstorage('token')) {
			tologin()
		}
		this.formdata.name = getstorage('nickname')
		this.formdata.mobile = getstorage('mobile')
		if (option.isnew == 1) {
			this.isnumberbox = true
		}
	},
	onShow() {
		this.formdata.name = getstorage('nickname')
		this.formdata.mobile = getstorage('mobile')
	},
	onReady() {
		this.$refs.form1.setRules(this.rules)
	},
	methods: {
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
				success: function (res) {
					console.log('qian')
					uni.showToast({
						icon: 'success',
						title: '支付成功',
						complete() {
							setTimeout(() => {
								console.log('后')

								uni.reLaunch({
									url: '/pages/grouppurchase/order/detail?id=' + _this.orderId + '&istype=' + _this.istype
								})
							}, 1000)

						}
					})
				},
				fail: function (err) {
					_this.$request.get('/coc-active/api/v1/group_purchase/failOrder/' + _this.orderId).then(res => {

					})
				}
			});
		},
		userIsCanBuyProduct() {
			this.$request.post('/coc-active/api/v1/payment/preference/userIsCanBuyProduct', {
				activityPaymentPreferenceId: this.dataList.activityPaymentPreferenceId,
				goodsId: this.dataList.id,
				type: 2,
				userId: uni.getStorageSync("userId")
			}).then(res => {
				if (res.code == 200) {
					if (res.data.isCanBuy == 1) {
						this.OnPay()
					} else if (res.data.isCanBuy == 0) {
						uni.$u.toast('您本月已享受该优惠，暂不可购买')
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
					groupPurchaseProductId: this.dataList.id,
					groupPurchaseSetMealId: this.dataList.groupPurchaseSetMealId,
					groupPurchaseSetMealNum: this.groupPurchaseSetMealNum,
					mobile: this.formdata.mobile,
					name: this.formdata.name,
					orderId: orderId,
					plate: this.formdata.plate,
					remark: this.formdata.remark,
					forwardUserId: this.forwardUserId
				}
				if (this.dataList.userInitiateAssistId) {
					msg.userInitiateAssistId = this.dataList.userInitiateAssistId
				}
				console.log('团购的支付分享人id', this.forwardUserId)
				msg.subOpenId = uni.getStorageSync("openid")
				this.$request.post("/coc-active/api/v1/group_purchase/groupPayment", msg).then(res => {
					if (res.code == 200) {
						this.orderId = res.data.orderId
						this.wxpay(res.data.payment)
					} else {
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
		Onbackspace() {
			if (this.formdata.plate.length == 0) {
				return false
			}
			this.formdata.plate = this.formdata.plate.substr(0, this.formdata.plate.length - 1);
		},
		OpenCarkeyboard() {
			this.showcarkeyboard = true
		},
		changenum(e) {
			this.dataList.allmealprice = this.dataList.mealprice * e.value
		},
	}
}
</script>

<style lang="scss">
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
	text{
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
}
</style>
