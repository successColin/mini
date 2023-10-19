<template>
	<view class="page">
		<view style="margin-top: 40rpx;text-align: center;">
			<image v-if="dataList.titleImg" :src="dataList.titleImg" mode="widthFix"
				style="width: 420rpx;border-radius: 10rpx;"></image>
			<image v-else src="https://oss.dcqcjlb.com/51che_java_dev/20221126/eb872b372e14472ba6e07fb4e56623d3.png" mode="widthFix"
				style="width: 420rpx;border-radius: 10rpx;"></image>
		</view>
		<view style="font-size: 32rpx;font-weight: bold;text-align: center;margin-top: 40rpx;">
			{{dataList.scoreDescribe}}
		</view>
		<view style="margin-top: 20rpx;text-align: center;">
			<text style="font-size: 58rpx;color: #d91b1b;font-weight: bold;">
				<text v-if="dataList.scoreChange>0">+</text>
				<text v-if="dataList.scoreChange<0">-</text>
				{{dataList.scoreChange}}
			</text>
			<text style="font-size: 24rpx;margin-left: 10rpx;">积分</text>
		</view>
		<view class="card">
			<u-list>
				<u-list-item>
					<u-cell v-if="dataList.orderCodeImg" title="核销码">
						<view slot="right-icon">
							<view>
								<image mode="widthFix" style="width: 500rpx;" :src="dataList.orderCodeImg"></image>
							</view>
							<view>

							</view>
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item v-if="dataList.orderNo">
					<u-cell title="订单号">
						<view slot="right-icon">
							<view v-if="dataList.titleImg">
								{{dataList.orderNo}}
							</view>
							<view v-else>

							</view>
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell title="订单时间">
						<view slot="right-icon">
							{{dataList.createdAt}}
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell v-if="dataList.expressOrderNo" title="快递单号">
						<view slot="right-icon">
							{{dataList.expressOrderNo}}
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell title="当前状态">
						<view slot="right-icon">
							<view>
								<text v-if="dataList.status==1">已支付</text>
								<text v-else-if="dataList.status==2	">已发货</text>
								<text v-else-if="dataList.status==3">已签收</text>
							</view>
						</view>
					</u-cell>
				</u-list-item>
				<u-list-item>
					<u-cell title="商家">
						<view slot="right-icon">
							<view v-if="dataList.shopName">{{dataList.shopName}}</view>
							<view v-else></view>
						</view>
					</u-cell>
				</u-list-item>
			</u-list>
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

		onLoad(option) {
			this.getList(option.id)
		},
		onShow() {},
		methods: {
			getList(id) {
				this.$request.get("/coc-my/api/v1/my/user/score/details/" + id).then(res => {
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 14px;
		padding: 20rpx;
	}
</style>
