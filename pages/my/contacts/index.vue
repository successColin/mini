<template>
	<view class="page">
		<view v-if="dataList.length==0" style="text-align: center;margin-top: 200rpx;">
			<image mode="widthFix" style="width: 412rpx;" src="../static/image/wulianxiren.png"></image>
		</view>
		<view class="card-list" v-else>
			<view style="padding: 0 38rpx 0 29rpx;background: #FFFFFF;border-radius: 10rpx;">
				<view v-for="(item,index) in dataList" :key="index" class="card">
					<view class="card-left u-flex-al">
						<view class="card-left-type">
							<text v-if="item.type==1">成人</text>
							<text v-else>儿童</text>
						</view>
						<view style="margin-left: 27rpx;">
							<view class="card-left-name">
								{{item.name}}
							</view>
							<view class="card-left-idcard">身份证
								<text>{{item.idCard}}</text>
							</view>
						</view>
					</view>
					<view class="card-right">
						<view class="u-flex-al">
							<view @click="Onedit(item.id)" style="margin-right: 20rpx;">
								<u-icon size="22px" color="#a8a8a8" name="edit-pen"></u-icon>
							</view>
							<view @click="OnDelete(item.id)">
								<u-icon size="22px" color="#a8a8a8" name="trash"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;margin: 50rpx 0;">
			<view class="btn" @click="OnAdd">
				<text>新增联系人</text>
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
				dataList: []
			}
		},
		onLoad() {

		},
		onShow() {
			this.getList()
		},
		onUnload() {
			uni.$emit('refresh')
		},
		methods: {
			Onedit(id) {
				uni.navigateTo({
					url: '/pages/my/contacts/detail?id=' + id
				})
			},
			OnDelete(id) {
				this.$request.get("/coc-my/api/v1/userContacts/delete/" + id).then(res => {
					if (res.code == 200) {
						uni.$u.toast('操作成功')
						this.getList()
					} else {
						uni.$u.toast(res.message)
					}
				})
			},
			OnAdd() {
				uni.navigateTo({
					url: '/pages/my/contacts/detail'
				})
			},
			getList() {
				this.$request.post("/coc-my/api/v1/userContacts/list", {
					keyword: '',
					current: 1,
					size: 99
				}).then(res => {
					this.dataList = res.data.records
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
		overflow-y: auto;
	}

	.card-list {
		margin-top: 30rpx;
		padding: 0 25rpx;

		.card {
			padding: 50rpx 0 50rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-top: 1px solid #E5E5E5;
		}

		.card:first-child {
			border-top: 0;
		}

		.card-left {
			.card-left-type {
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			.card-left-name {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
			}

			.card-left-idcard {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				margin-top: 15rpx;
			}
		}

		.card-right {
			margin-right: 13rpx;
		}
	}



	.btn {
		width: 600rpx;
		height: 80rpx;
		background: linear-gradient(-82deg, #C31D1D, #D91B1B);
		border-radius: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;

		text {
			font-size: 34rpx;
			font-family: Alibaba PuHuiTi;
			font-weight: 400;
			color: #FFFFFF;
		}
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}
</style>
