<template>
	<view class="page">
		<view v-if="dataList.length">
			<view class="card mb20" v-for="item in dataList" @click="checkBank(item)">
				<view class="size28 fwb">{{ item.bankName }}</view>
				<view class="size24 mt20">{{ item.cardNumber }}</view>
			</view>
		</view>
		<view class="tac" style="margin-top: 200rpx;" v-else>
			<image style="width: 423rpx;height: 365rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692187669321.png">
			</image>
		</view>
		<view class="btn" @click="OnAdd">新增银行卡</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				current: 1,
				isLoadMore: false,
				show: false,
				value1: '',
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}
		},
		onLoad() {
			
		},
		onShow() {
			let value = new Date()
			let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
			this.value1 = value.getFullYear() + "-" + month
			this.getList()
			// let that = this
			// uni.$on('refresh', (data) => {
			// 	console.log(data)
			// 	if (data.refresh) {
			// 		// 刷新操作
			// 		that.getList()
			// 	}
			// })
		},
	
		methods: {
			checkMonth() {
				this.show = true
			},
			getList() {
				this.$request.post("/coc-active/api/v2/withdraw/bankCard/list").then(res => {
					this.dataList = res.data
				})
			},
			OnAdd() {
				uni.navigateTo({
					url: "/pages/myEarnings/addBankCard"
				})
			},
			checkBank(item) {
				uni.$emit('bankdata', item)
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 25rpx;
	}

	.card {
		background-color: #ffffff;
		padding: 30rpx;
		border-radius: 10rpx;
	}

	.bankIcon {
		width: 88rpx;
		height: 88rpx;
	}

	.btn {
		width: 600rpx;
		height: 80rpx;
		background: #D91B1B;
		border-radius: 40rpx;
		text-align: center;
		margin: 100rpx auto;
		font-size: 32rpx;
		color: #FFFFFF;
		line-height: 80rpx;
		margin-top: 50%;
	}
</style>