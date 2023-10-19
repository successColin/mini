<template>
	<view class="page">
		<view class="card">
			<view>
				订单编号：{{orderNo}}
			</view>
			<view class="mt30">
				退款金额：<text class="mainRed">￥{{commission}}</text>
			</view>
			<view class="mt30">
				退款方式：原路返回（3个工作日内原路退回）
			</view>
		</view>
		<view class="card">
			<view>
				退款原因：
			</view>
			<view class="mt30">
				<u-radio-group v-model="radiovalue1" placement="column" labelSize='12' activeColor='#D91B1B'>
					<u-radio :customStyle="{marginBottom: '8px'}" v-for="(item, index) in radiolist1" :key="index"
						:label="item.name" :name="item.name" @change="radioChange">
					</u-radio>
				</u-radio-group>
			</view>

		</view>
		<view class="btn" @click="Onrefund">
			申请退款
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				commission:89.9,
				radiolist1: [{
						name: '没看清楚规则，有使用限制',
						disabled: false
					},
					{
						name: '买多了/买错了',
						disabled: false
					}
				],
				radiovalue1: null,
				id: '',
				orderNo: '',
				refundReason: ''
			}
		},

		onLoad(option) {
			if(uni.getStorageSync('commission')){
				this.commission=uni.getStorageSync('commission')
			}
			this.id = option.id
			this.orderNo = option.orderNo
		},
		onShow() {},
		methods: {
			Onrefund(){
				if(!this.refundReason){
					uni.$u.toast('请选择退款原因')
				}
				this.$request.post("/coc-active/api/v1/sky_you_service/order/refund",{
					orderId:this.id,
					refundReason:this.refundReason
				}).then(res=>{
					if(res.code==200){
						uni.$u.toast('申请退款成功，请等待审核')
					setTimeout(() => {
					uni.navigateBack({
						delta: 2
					});
					}, 1500)
					
					}else{
							uni.$u.toast(res.message)
					}
				})
			},
			radioChange(e) {
				this.refundReason = e
			},
		}
	}
</script>

<style lang="scss">
	.page {
		font-size: 24rpx;
	}

	.card {
		margin: 24rpx;
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.btn {
		margin: 150rpx auto;
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>
