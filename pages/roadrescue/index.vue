<template>
	<view class="page">
		
<view>
<image style="width: 100%;height: 2010rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230419/file_1681904146544.jpg"></image>
</view>
<view class="btn" @click="Onpushloadhelp">
	道路救援
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
			Onpushloadhelp(){
			uni.navigateTo({
				url: '/pages/roadhelp/index/index'
			})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
.btn{
	width: 440rpx;
	height: 84rpx;
	background: #D91B1B;
	border-radius: 174rpx ;
	text-align: center;
	line-height: 84rpx;
	color: #ffffff;
	font-size: 28rpx;
	margin: 124rpx auto;
	position: fixed;
	bottom: -50rpx;
	left: 50%;
	  transform: translate(-50%, 0%);
}
</style>
