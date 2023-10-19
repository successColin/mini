<template>
	<view class="page">
		<view class="tac topimg">
			<image style="width: 323rpx;height: 210rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230524/file_1684894503376.png">
			</image>
		</view>
		<view class="tac size32 fwb" style="margin-top: 60rpx;">
			审核中
		</view>
		<view class="tac size24 mt20 txtLighGray">
			请耐心等待审核结果..
		</view>
		<view @click="OnmakePhoneCall" style="text-align: center;position: fixed;bottom: 115rpx;">
			<image mode="widthFix" style="width: 715rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221112/073e9ea9c2a44986bead88f6c2bc4357.png">
			</image>
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
		onShow() {},
		methods: {
		
			OnmakePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '4008-010-111' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.topimg {
		margin-top: 104rpx;
	}
</style>
