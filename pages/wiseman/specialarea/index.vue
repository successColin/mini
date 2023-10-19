<template>
	<view class="page">
		<view class="card">
			<view class="u-flex alc jsb colorff">
				<view style="margin-top: 50rpx;margin-left: 25rpx;">
					<view class="size28">可提现<text class="size24">(元)</text></view>
					<view style="font-size: 60rpx;" class="fwb ">{{dataList.balance}}</view>
				</view>
				<view @click="OnWithdrawal" class="size28 Withdrawal" style="margin-top: 50rpx;margin-right: 25rpx;">
					提现
				</view>
			</view>
			<view style="margin-left: 25rpx;margin-right: 25rpx;">
				<u-divider :text="null"></u-divider>
			</view>
			<view class="u-flex alc  colorff">
				<view style="margin-left: 25rpx;">
					<view class="size28">总收益<text class="size24">(元)</text></view>
					<view style="font-size: 40rpx;" class="fwb ">{{dataList.earnMoney}}</view>
				</view>
				<view style="margin-left: 100rpx;">
					<view class="size28">已提现<text class="size24">(元)</text></view>
					<view style="font-size: 40rpx;" class="fwb ">{{dataList.withdrawMoney}}</view>
				</view>
			</view>
		</view>
		<view class="card-item">
			<view class="tac" @click="OnPushOrder">
				<view>
					<image style="width: 53rpx;height: 62rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684979913021.png">
					</image>
				</view>
				<view class="mt10">收益订单</view>
			</view>
			<view>
				<image style="width: 1rpx;height: 77rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684980268886.png">
				</image>
			</view>
			<view class="tac" @click="OnPushTeam">
				<view>
					<image style="width: 70rpx;height: 59rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684980344813.png">
					</image>
				</view>
				<view class="mt10">我的团队</view>
			</view>
			<view>
				<image style="width: 1rpx;height: 77rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684980268886.png">
				</image>
			</view>
			<view class="tac" @click="Onwithdrawlist">
				<view>
					<image style="width: 65rpx;height: 59rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684980380615.png">
					</image>
				</view>
				<view class="mt10">提现记录</view>
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
				dataList: {}
			}
		},

		onLoad() {
			
		},
		onShow() {
			this.getList()
		},
		methods: {
			Onwithdrawlist(){
				uni.navigateTo({
					url: "/pages/wiseman/specialarea/withdrawlist"
				})
			},
			OnPushTeam(){
				uni.navigateTo({
					url: "/pages/wiseman/specialarea/myteam"
				})
			},
			OnPushOrder(){
				uni.navigateTo({
					url: "/pages/wiseman/specialarea/order"
				})
			},
			OnWithdrawal(){
				uni.navigateTo({
					url: "/pages/wiseman/specialarea/withdrawal?withdrawMoney="+this.dataList.balance
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v1/expert/expertSpecialArea").then(res => {
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		width: 700rpx;
		height: 358rpx;
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684976001891.png");
		background-size: 100% 100%;
		margin: 25rpx auto;
	}

	.Withdrawal {
		margin-top: 50rpx;
		margin-right: 25rpx;
		width: 120rpx;
		height: 50rpx;
		color: #D91B1B;
		border-radius: 30rpx;
		background-color: #ffffff;
		text-align: center;
		line-height: 50rpx;
	}

	.card-item {
		margin: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 40rpx 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
