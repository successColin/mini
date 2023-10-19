<template>
	<view class="page">
		<view class="top">
			<view>
				<image style="width: 80rpx;height: 80rpx;"
					:src="dataList[0].imgUrl">
				</image>
			</view>
			<view style="margin-left: 20rpx;line-height: 80rpx; font-size: 36rpx; font-weight: bold;">
				{{dataList[0].vehicleName}}
			</view>
		</view>
		<view class="choosecartype">
			选择车型
		</view>
		<view v-for="(item,index) in dataList" :key="index" class="typelist" @click="OnAdd(item)">
			{{item.cxTitle}}
			<view class="hr"></view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				dataList: [],
				sendList: {}
			}
		},

		onLoad(option) {
			this.getList(option.vehicleId)
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sengdataList', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.sendList = data.data
				})

			})
		},
		onShow() {},
		methods: {
			OnAdd(item) {
				this.sendList.brandId = item.brandId
				this.sendList.vehicleId = item.vehicleId
				this.sendList.brandName = item.brandName
				this.sendList.vehicleName = item.vehicleName
				let _this = this
				uni.navigateTo({
					url: "/pages/my/customer/binding",
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getList', {
							data: _this.sendList
						})
					}
				});
			},
			getList(id) {
				this.$request.get("/coc-system/api/v1/system/chexing/list/" + id).then(res => {
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top {
		margin: 40rpx;
		display: flex;
	}

	.choosecartype {
		background-color: rgb(239, 239, 239);
		color: rgb(60, 60, 60);
		padding: 10rpx 20rpx;
		font-size: 28rpx;
		font-weight: bold;
	}

	.typelist {
		margin: 40rpx 20rpx;
		font-size: 32rpx;

		.hr {
			height: 1rpx;
			background-color: #e3e3e3;
			margin-top: 40rpx;
		}
	}
</style>
