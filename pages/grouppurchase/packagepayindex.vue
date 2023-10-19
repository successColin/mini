<template>
	<view class="page">
		<view class="card">
			<view class="size28 fwb moreLine" style="width: 626rpx;">
				{{dataList.title}}
			</view>
			<view class="u-flex jsb" style="margin-top: 24rpx;">
				<view class="mainRed size32 fwb"><text class="size24">￥</text>{{dataList.flashSalePrice}}</view>
				<view>
					<u-number-box :disabled="true" buttonSize='25' :max='maxnum' inputWidth='30'
						v-model="merchantMealNum" @change="changenum"></u-number-box>
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
					<u--input v-model="formdata.remark" border="none"></u--input>
				</u-form-item>
			</u--form>
		</view>


		<!-- 底部悬浮框 -->
		<view @click="OnOpenDetail"
			style="z-index: 10076;border-top: 1rpx #e7e7e7 solid;position: fixed;bottom: 0rpx;background-color: #ffffff;width: 100%;padding: 30rpx 20rpx 50rpx 20rpx;">
			<view class="u-flex" style="justify-content: space-between;">
				<view>
					<text style="font-size: 24rpx;">
						合计：
					</text>
					<text style="font-size: 24rpx;color: #D91B1B;font-weight: bold;">
						¥
					</text>
					<text style="font-size: 44;color: #D91B1B;font-weight: bold;">
						{{dataList.flashSalePrice}}
					</text>
				</view>
				<view class="u-flex" style="margin-right: 70rpx;">
					<view class="btn">
						<text @click.stop="OnPay">去支付</text>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import {
		tologin,
		getstorage
	} from '@/utils/index.js'
	export default {
		data() {
			return {
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
					}
				},
				formdata: {
					name: '',
					mobile: '',
					remark: ''
				},
				forwardUserId: '',
				merchantMealNum: 1,
				maxnum: 1,
				dataList: {},
				orderId: null
			}
		},

		onLoad(option) {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getinfo', function(data) {
				_this.dataList = data.data
			})
			this.forwardUserId = option.forwardUserId
			if (!getstorage('token')) {
				tologin()
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
					success: function(res) {
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								setTimeout(() => {
									uni.reLaunch({
										url: '/pages/grouppurchase/packageorder/detail?id=' +
											_this.orderId
									})
								}, 1000)
							}
						})
					},
					fail: function(err) {}
				});
			},
			OnPay() {
				this.$refs.form1.validate().then(res => {
					let orderId = null
					if (this.orderId) {
						orderId = this.orderId
					}
					let msg = {
						merchantMealId: this.dataList.id,
						merchantMealNum: this.merchantMealNum,
						mobile: this.formdata.mobile,
						name: this.formdata.name,
						orderId: orderId,
						remark: this.formdata.remark,
						forwardUserId: this.forwardUserId
					}
					msg.subOpenId = uni.getStorageSync("openid")
					this.$request.post("/coc-active/api/v1/merchant_meal_order/payment", msg).then(res => {
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
			}
		}
	}
</script>

<style lang="scss">
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

	.btn {
		margin-top: -14rpx;

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
	}
</style>
