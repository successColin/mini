<template>
	<view class="page">
		<view class="card">
			<view class="row">
				<view class="row-left">
				<image  style="width: 52rpx;height: 52rpx;" mode="heightFix"
					src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061209137.png">
					<view style="line-height: 56rpx;margin-left: 20rpx;">微信</view>
				</view>
				<view class="row-right">未绑定	<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon></view>
			</view>
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
		methods: {}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background-color: #ffffff;
		padding: 20rpx;
		margin-top: 20rpx;

		.row {
			display: flex;
			justify-content: space-between;

			.row-left {
				display: flex;
			}

			.row-right {
				line-height: 64rpx;
				font-size: 28rpx;
				color: #666666;
				display: flex;
				.u-icon{
					margin-left: 10rpx;
				}
			}
		}
	}
</style>
