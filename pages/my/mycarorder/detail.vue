<template>
	<view class="page">
		<view class="card">
			<view class="size28 fwb">{{dataList.shopName}}</view>
			<view class="size24 mt20">{{dataList.chexingName}}</view>
			<view class="size24 mt20">订<text class="mainRed">{{dataList.deposit}}元</text>到店立减<text
					class="mainRed">{{dataList.depositReduction}}元</text></view>
			<view class="size20 txtLighGray mt20">
				支付时间{{dataList.payTime}}
			</view>
		</view>
		<view class="tac mt40 fwb size28">{{dataList.orderCode}}</view>
		<view class="code-img">
			<image style="width: 250rpx;height: 250rpx;margin: 25rpx;" :src="dataList.orderCodeImg"></image>
		</view>
		<view class="tac txtLighGray size24 mt20">
			请勿随意截图发给他人
		</view>
		<view class="btn-return" @click="Onrefund">
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
				dataList: {}
			}
		},

		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getinfo', function(data) {
				_this.dataList = data.data
			})
		},
		onShow() {},
		methods: {
			Onrefund(){
				this.$request.post("/coc-active/api/v1/deposit/order/refund",{
					id:this.dataList.orderId
				}).then(res=>{
					if(res.code==200){
							uni.$u.toast('退款成功')
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 2000)
							
					}else{
						uni.$u.toast(res.message)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 25rpx;
		background-color: #ffffff;
		padding: 30rpx 28rpx;
	}
	.code-img{
		margin: 28rpx auto;
		width: 300rpx;
height: 300rpx;
background: #FFFFFF;
border-radius: 50rpx;
	}
	.btn-return{
		margin: 70rpx auto;
		width: 174rpx;
height: 64rpx;
background: #E8E8E8;
border-radius: 32rpx;
line-height: 64rpx;
text-align: center;
font-size: 24rpx;
font-weight: bold;
	}
</style>