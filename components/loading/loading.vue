<template>
	<view class="request-loading-view"  :class="{open:loadingShow}">
		<view class="loading-view">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230821/file_1692580138131.gif" class="loginImg"></image>
        </view>
	</view>
</template>
 
<script>
export default {
	data() {
		return {};
	},
	computed: {
		loadingShow() {
			return this.$store.state.requestLoading;
		}
	}
};
</script>
 
<style scoped>
	.request-loading-view {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 198903060;
		background-color: rgba(255, 255, 255, 1);
		display: none;
		justify-content: center;
	}
	.request-loading-view.open{
		display: flex;
	}
	.loginImg {
		width: 450rpx;
		height: 450rpx;
		position: absolute;
		top: 15%;
		left: 150rpx;
	}
</style>