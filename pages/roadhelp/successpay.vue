<template>
	<view class="page">
		<view class="mainRed fwb toptext">支付成功</view>
		<view class="txtLighGray mt30 size24 tac">
			可前往救援无忧卡页面查看购买订单信息
		</view>
		<view class="tac" style="margin-top: 40rpx;">
			<image style="width: 168rpx;height: 178rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230620/file_1687247863284.png">
			</image>
		</view>
		<view class="btn" @click="OnPushmycar">
			添加爱车
		</view>
		<view class="bottom-btn" >
			<view class="size24" @click="OnGoHome">
				<view class="u-flex jsc"><u-icon name="home" size="23"></u-icon></view>
				<view>返回首页</view>
			</view>
			<view class="btn-bottom" @click="OnWatchVip">查看权益</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},

		onLoad() {},
		onShow() {},
		methods: {
			OnWatchVip(){
				uni.navigateTo({
					url: '/pages/roadhelp/equity'
				})
			},
			OnGoHome(){
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnPushmycar(){
				uni.navigateTo({
					url: '/pages/my/mycar/index'
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.toptext {
		margin-top: 100rpx;
		text-align: center;
		font-size: 36rpx;
	}
	.btn{
		width: 330rpx;
		height: 70rpx;
		background: #FFEAEA;
		border: 1px solid #D91B1B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		color: #D91B1B;
		font-size: 28rpx;
		font-weight: bold;
		margin: 100rpx auto;
	}
	.bottom-btn {
		position: fixed;
		z-index: 9999;
		bottom: 0rpx;
		width: 700rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		height: 120rpx;
	}
	.btn-bottom{
		width: 260rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		font-size: 28rpx;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
	}
</style>
