<template>
	<view class="page">
		<view style="margin: 20rpx 40rpx;">
			<u-search @custom='addVerification' @search='addVerification' v-model='code' placeholder='请输入核销码'
				:showAction="true" actionText="核销" :animation="true"></u-search>
		</view>

		<view class="btn">
			<text @click="scanCode">扫码获取</text>
		</view>
		<view style="margin: 40rpx 20rpx;font-size: 24rpx;color: #666666;">
			此项功能主要是对客户购买的套餐券码进行核销，可拍照后使用相册获取，核销成功后资金结算给4S店商家资金账户，商家即可发起提现。
		</view>
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
				code: ''
			}
		},

		onLoad() {
			
		},
		onShow() {},
		methods: {
			scanCode() {
				let _this = this
				uni.scanCode({
					success: function(res) {
						if (res.path) {
							uni.navigateTo({
								url: '/' + res.path
							})
						} else {
							uni.$u.toast('核销码不可用');
						}
					},
					fail: res => {
						if (res.errMsg !== 'scanCode:fail cancel') {
							uni.$u.toast(res.errMsg);
						}
					}
				});
			},
			addVerification() {
				if (this.code) {
					uni.navigateTo({
						url: '/pages/merchantZone/writeOffCode/detail?scene=' + this.code
					})
				} else {
					uni.$u.toast('请输入核销码');
				}
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.btn {
		text-align: center;
		margin-top: 40rpx;

		text {
			width: 599rpx;
			height: 81rpx;
			background-color: #d91b1b;
			border-radius: 40rpx;
			display: inline-block;
			text-align: center;
			font-size: 32rpx;
			color: #ffffff;
			line-height: 81rpx;
		}
	}
</style>
