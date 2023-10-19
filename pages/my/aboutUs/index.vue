<template>
	<view class="page">
		<view class="card" @click="OnPush">
			<view>51车俱乐部资质</view>
			<view><u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon></view>
		</view>
		<view class="card">
			<view>版本号</view>
			<view style="color: #666666;">V1.1.0</view>
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
			OnPush(){
				uni.navigateTo({
					url: '/pages/agreement/qualifications/index',
					})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background-color: #ffffff;
		padding: 20rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
		font-size: 32rpx;
	}
</style>
