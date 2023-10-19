<template>
	<view class="page">
<view style="margin-top: 167rpx;">
	<image style="width: 100rpx;height: 100rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689236694452.png">
	</image>
</view>
<view style="margin-top: 50rpx;font-size: 36rpx;">
	已成功取消救援
</view>
<view style="color: #999999;margin-top: 38rpx;" class="size28">
	退款将在2个工作日内原路返回
</view>
<view class="btn" @click="OntoorderList">
	查看订单
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

		onLoad() {
		},
		onShow() {
		},
		methods: {
			OntoorderList(){
				uni.navigateTo({
					url: '/pages/roadhelp/51help/helpOrder'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		text-align: center;
	}
.btn{
	position: fixed;
	bottom: 200rpx;
	left: 50%;
	transform: translate(-50%, 0%);
	text-align: center;
	width: 330rpx;
	height: 70rpx;
	background: #D91B1B;
	border-radius: 35rpx;
	line-height: 70rpx;
	color: #ffffff;
	font-size: 28rpx;
	font-weight: bold;
}
</style>
