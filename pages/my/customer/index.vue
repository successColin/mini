<template>
	<view class="page">
			<view class="card" v-for="(item,index) in dataList" :key="index">
				<view class="u-flex">
					<view>
						<u-avatar :src="item.url" size="50"></u-avatar>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 32rpx;font-weight: bold;display: flex;">
							<view style="width: 250rpx;">
								{{item.nickname}}
							</view>
							<view style="margin-left: 40rpx;">
								<image src="../static/image/dianhua.png" style="width:22rpx;height: 22rpx;"></image>
							</view>
							<view style="margin-left: 20rpx;">
								<image src="../static/image/xiaoweixin.png" style="width:22rpx;height: 22rpx;"></image>
							</view>
						</view>
						<view style="font-size: 20rpx;width: 400rpx;margin-top: 10rpx;">
							{{item.customerInfo}}
						</view>
					</view>
				</view>
				<view class="u-flex" style="align-items: center;">
					<text @click="Onbinding(item)" class="btn">绑定</text>
				</view>
			</view>

		<u-modal :showCancelButton='true' :show="showmodal" :content="content" @cancel="showmodal=false"
			@confirm="OnAddManager"></u-modal>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				content: '',
				choose: {
					nickname: ''
				},
				showmodal: false,
				dataList: [],
				info: {}
			}
		},

		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sengdataList', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.info = data.data
					_this.getList(_this.info.shopId)
				})

			})

		},
		onShow() {},
		methods: {
			OnAddManager() {
				this.$request.post('/coc-my/api/v1/my/customer/manager/add', this.info).then(res => {
					if (res.code == 200) {
						uni.redirectTo({
							url: '/pages/my/myManager/index'
						});
					}
				})
			},
			Onbinding(item) {
				this.info.managerId = item.id
				this.choose = item
				this.content = "您确定绑定" + item.nickname + "客户经理"
				this.showmodal = true
			},
			getList(shopId) {
				let _this = this
				this.$request.get("/coc-my/api/v1/my/customer/manager/shop/list/" + shopId).then(res => {
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 20rpx;
	}

	.card {
		background-image: linear-gradient(-23deg,
				#ffffff 0%,
				#f3f3f3 53%,
				#ffffff 100%),
			linear-gradient(#ffffff,
				#ffffff);
		background-blend-mode: normal,
			normal;
		box-shadow: 0rpx -3rpx 10rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 14rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;

		.btn {
			width: 80rpx;
			height: 50rpx;
			background-color: #d91b1b;
			border-radius: 10rpx;
			text-align: center;
			color: #ffffff;
			font-size: 28rpx;
			line-height: 50rpx;
		}
	}
</style>
