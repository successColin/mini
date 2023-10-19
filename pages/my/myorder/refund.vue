<template>
	<view class="page">
		<view class="card">
			<view class="order-detail">
				<view>
					订单券码：{{orderCode}}
				</view>
				<view class="u-m-t-10">
					退款金额：<text style="color: #d91b1b;font-weight: bold;">￥{{orderMoney}}</text>
				</view>
				<view class="u-m-t-10">
					退款方式：原路返回（3个工作日内退款到原支付方）
				</view>
				<view class="u-m-t-10">
					退款原因（以下方式至少勾选1项）
				</view>
			</view>
			<view class="choose-item">
				<u-checkbox-group activeColor="#d91b1b" v-model="checkboxValue1" placement="column"
					@change="checkboxChange">
					<u-checkbox :customStyle="{marginTop: '16px'}" v-for="(item, index) in checkboxList1" :key="index"
						:label="item.name" :name="item.name">
					</u-checkbox>
				</u-checkbox-group>
				<view class="textarea">
					<u--textarea v-model="other" placeholder="输入其他原因"></u--textarea>
				</view>

			</view>
			<view class="btn-bottom">
				<text @click="OnRefund">发起退款</text>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				refundReason: '',
				other: '',
				checkboxValue1: [],
				// 基本案列数据
				checkboxList1: [{
						name: '计划有变，无法参加活动',
						disabled: false
					},
					{
						name: '没看清内容，跟自己预想不符',
						disabled: false
					},
					{
						name: '线下支付了团购价',
						disabled: false
					},
					{
						name: '没赶上活动时间',
						disabled: false
					},
					{
						name: '网友评价不好',
						disabled: false
					},
					{
						name: '后悔了，不想参加了',
						disabled: false
					},
					{
						name: '其他',
						disabled: false
					}
				],
				orderNo: '',
				orderCode: '',
				orderMoney: ''
			}
		},

		onLoad(option) {
			this.orderNo = option.orderNo
			this.orderCode = option.orderCode
			this.orderMoney = option.orderMoney
		},
		onShow() {},
		methods: {
			OnRefund() {
				this.refundReason=this.refundReason+','+this.other
				if (!this.refundReason) {
					this.$refs.uToast.show({
						message: '请至少选择一个退款原因',
						type: "default",
					});
					return false
				} else {
					this.$request.post("/coc-my/activity/order/refund", {
						orderNo: this.orderNo,
						orderSourceType: '2',
						refundReason: this.refundReason
					}).then(res=>{
						if(res.code==200){
							this.$refs.uToast.show({
								message: '退款成功',
								type: "default",
								complete() {
									uni.navigateBack({
										delta: 1
									});
								}
							});
						}
					})
				}

			},
			checkboxChange(n) {
				this.refundReason = n.join(",")
			}
		}
	}
</script>

<style lang="scss">
	.u-m-t-10 {
		margin-top: 10rpx;
	}

	.card {
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 14rpx;
		padding: 20rpx;

		.order-detail {
			font-size: 28rpx;
			color: #222222;
		}

		.choose-item {
			margin-top: 20rpx;
			padding: 20rpx;
			background-color: #f8f8f8;

			.textarea {
				margin-left: 44rpx;
				margin-top: 20rpx;
			}
		}

		.btn-bottom {
			margin-top: 80rpx;
			text-align: center;
			margin-bottom: 60rpx;

			text {
				background-color: #d91b1b;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 28rpx;
				padding: 10rpx 40rpx;
			}
		}
	}
</style>
