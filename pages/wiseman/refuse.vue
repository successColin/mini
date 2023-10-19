<template>
	<view class="page">
		<view class="tac topimg">
			<image style="width: 323rpx;height: 210rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230527/file_1685147790759.png">
			</image>
		</view>
		<view class="tac size32 fwb" style="margin-top: 60rpx;">
			审核未通过
		</view>
		<view class="tac size24 mt20 txtLighGray">
			拒绝原因：{{data.auditReason}}
		</view>
		<view @click="OnmakePhoneCall" style="text-align: center;position: fixed;bottom: 350rpx;">
			<image mode="widthFix" style="width: 715rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221112/073e9ea9c2a44986bead88f6c2bc4357.png">
			</image>
		</view>
		<view class="bottom-next" @click="OnGoWelcome">
			<text @click="OnNext">重新提交</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				data: {},
				expertParentId:null
			}
		},

		onLoad(option) {
			this.expertParentId=option.id
			this.getstatus()
		},
		onShow() {},
		methods: {
			OnGoWelcome(){
				uni.navigateTo({
					url: "/pages/wiseman/welcome?expertParentId="+this.expertParentId+"&isnext=1"
				})
			},
			getstatus() {
				this.$request.post("/coc-active/api/v1/expert/echoVerify").then(res => {
					this.data = res.data
				})
			},
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
	.bottom-next {
		text-align: center;
	position: fixed;
	bottom: 115rpx;
	left: 50%;
	transform: translate(-50%, 0%);
		text {
			display: inline-block;
			border-radius: 40rpx;
			width: 600rpx;
			height: 80rpx;
			background-color: #D91B1B;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: 400;
		}
	}
</style>
