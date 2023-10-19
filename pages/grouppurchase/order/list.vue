<template>
	<view class="page">
		<view class="top">
			<view v-for="(item,index) in tabs" :key="index" class="tabs" @click="changetab(item,index)"
				:class="{'currenttab':index==type}">
				{{item.label}}
			</view>
		</view>
		<view v-if="dataList.length>0">
			<view v-for="(item,index) in dataList" :key="index">
				<view class="card">
					<view class="flex-1">
						<view class="flex-2" @click="OnDetail(item)">
							<view>
								<u-avatar size="73rpx" shape="square" :src="item.coverPicture">
								</u-avatar>
							</view>
							<view>
								<view class="order-name">
									{{item.title}}
								</view>
								<view class="order-detail">
									<view style="font-size: 28rpx;">
										<text>¥{{item.flashSalePrice}}</text>
									</view>
									<view style="margin-top: 10rpx;width: 426rpx;font-size: 24rpx;color: #999999;">
										下单时间：{{item.createdAt}}
									</view>
									<view v-if="item.status!=0&&item.status!=7"
										style="margin-top: 10rpx;width: 426rpx;font-size: 24rpx;color: #999999;">
										有效时间：{{item.expirationTime}}
									</view>
								</view>
							</view>
						</view>
						<view class="item-right">
							<view
								style="height: 100%;position: relative;display: flex;flex-direction: column;align-items: flex-end;">
								<view class="get-type">
									{{item.statusMsg}}
								</view>
								<view style="text-align: right;" v-if="item.status==0&&!item.iscountdown">
									<u-count-down @finish="setcountdown(index)" :time="getcountdown(item.createdAt)"
										format="mm:ss">
									</u-count-down>
								</view>
								<view v-if="(item.status===0||item.status===7)&&!item.iscountdown">
									<view class="payment">
										<text @click.stop="OnDetail(item)">付款</text>
									</view>
									<view class="payfalse">
										<text @click.stop="signupfalse(item)">取消</text>
									</view>
								</view>
								<view v-else-if="item.status===1" class="type-2">
									<view class="watch-code">
										<text @click="OnDetail(item)">查看券码</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-else style="text-align: center;margin-top: 303rpx;">
			<image style="width: 247rpx;height: 222rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221130/9b1553f3d213427fa0aced53491a1ca5.png">
			</image>
			<view style="font-size: 24rpx;color: #999999;margin-top: 30rpx;">暂无订单</view>
		</view>
		<u-modal @close="showpop=false" :closeOnClickOverlay="true" confirmColor='#D91B1B' :show="showpop"
			title="您要取消待付款订单" :content='poptitle' @confirm='confirm'></u-modal>

	</view>
</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {

		},
		data() {
			return {
				showpop: false,
				tabs: [{
						label: '全部',
						value: null,
					}, {
						label: '待付款',
						value: 0,
					}, {
						label: '待核销',
						value: 1,
					},
					{
						label: '已退款',
						value: 4,
					},

				],
				type: 0,
				status: null,
				current: 1,
				dataList: [],
				isLoadMore: false,
				signUpId: 0,
				poptitle: '',
				orderType: null
			}
		},

		onLoad() {
			// this.getList()
		},
		onShow() {
			this.isLoadMore = false
			this.current = 1
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		methods: {
			confirm() {
				if (this.orderType == 5) {
					this.$request.post("/coc-active/api/v1/merchant_meal_order/cancel", {
						id: this.signUpId
					}).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '取消订单成功'
							})
							let index = this.dataList.findIndex(m => m.orderId == this.signUpId)
							this.dataList[index].status = 5
							this.dataList[index].statusMsg = '已取消'
							this.showpop = false
						} else {
							this.$refs.uToast.show({
								message: res.message,
							});
						}
					})
				} else {
					this.$request.get("/coc-active/api/v1/group_purchase/cancelOrder/" + this.signUpId).then(res => {
						if (res.code == 200) {
							uni.showToast({
								title: '取消订单成功'
							})
							let index = this.dataList.findIndex(m => m.orderId == this.signUpId)
							this.dataList[index].status = 5
							this.dataList[index].statusMsg = '已取消'
							this.showpop = false
						} else {
							this.$refs.uToast.show({
								message: res.message,
							});
						}
					})
				}
			},
			signupfalse(item) {
				this.signUpId = item.orderId
				this.poptitle = item.title
				this.orderType = item.orderType
				this.showpop = true
			},
			getcountdown(time) {
				return dayjs(time).add(5, 'minute').toDate().getTime() - new Date().getTime()
			},
			OnDetail(item) {
				if (item.orderType == 5) {
					uni.navigateTo({
						url: '/pages/grouppurchase/packageorder/detail?id=' + item.orderId
					})
				} else {
					uni.navigateTo({
						url: '/pages/grouppurchase/order/detail?id=' + item.orderId
					})
				}
			},

			getList() {
				this.$request.post("/coc-active/api/v1/group_purchase/orderTabulation", {
					size: 20,
					current: this.current,
					status: this.status
				}).then(res => {
					res.data.records.forEach(m => {
						m.iscountdown = false
					})
					if (res.data.records.length < 20) {
						this.isLoadMore = true
					}
					if (res.data.current == 1) {
						this.dataList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
			changetab(item, index) {
				this.type = index
				this.status = item.value
				this.isLoadMore = false
				this.current = 1
				this.dataList = []
				this.getList()
			},
			setcountdown(index) {
				this.dataList[index].iscountdown = true
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top {
		display: flex;
		justify-content: space-around;
		margin: 20rpx;

		.tabs {
			background-color: #ffffff;
			border-radius: 30rpx;
			font-size: 24rpx;
			padding: 8rpx 36rpx;
			color: #222222;
		}

		.currenttab {
			background-color: #d91b1b;
			color: #ffffff;
		}
	}

	.card {
		background-color: #ffffff;
		border-radius: 14rpx;
		margin: 20rpx;
		padding: 30rpx 20rpx;

		.flex-1 {
			display: flex;
			justify-content: space-between;
		}

		.flex-2 {
			display: flex;
		}

		.order-name {
			// height: 84rpx;
			font-size: 32rpx;
			color: #222222;
			margin-left: 28rpx;
			width: 400rpx;
			word-break: break-all;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

		.order-detail {
			font-size: 28rpx;
			color: #222222;
			margin-top: 10rpx;
			margin-left: 28rpx;
			height: 122rpx;

			.price {
				color: #d91b1b;
				margin-left: 42rpx;
			}
		}

		.item-right {
			text {
				margin-bottom: 2rpx;
			}

			.get-type {
				font-size: 28rpx;
				color: #d91b1b;
				text-align: right;
				// padding-left: 46rpx;
			}

			.payfalse {
				margin-top: 10rpx;
				background-color: #f8f8f8;
				border-radius: 10rpx;
				color: #666666;
				width: 141rpx;
				height: 53rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}

			.payment {
				background-color: #d91b1b;
				border-radius: 10rpx;
				color: #ffffff;
				width: 141rpx;
				height: 53rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}

			.payment-four {
				background-color: #d91b1b;
				border-radius: 10rpx;
				color: #ffffff;
				position: absolute;
				bottom: 0;
				right: 26rpx;
				width: 141rpx;
				height: 53rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
			}

			.paymentreturn {
				font-size: 28rpx;
				border-radius: 10rpx;
				border: solid 1rpx #666666;
				color: #666666;
				position: absolute;
				bottom: 0;
				right: 0rpx;
				width: 141rpx;
				line-height: 53rpx;
				height: 53rpx;
				display: flex;
				justify-content: center;

			}

			.type-2 {
				position: absolute;
				bottom: 0;
				right: -5rpx;

				.watch-code {
					background-color: #d91b1b;
					border-radius: 10rpx;
					color: #ffffff;
					width: 141rpx;
					height: 53rpx;
					font-size: 28rpx;
					text-align: center;
					margin-bottom: 10rpx;
					display: flex;
					justify-content: center;
					align-items: center;

				}

				.refund {
					border-radius: 10rpx;
					border: solid 1rpx #666666;
					color: #666666;
					width: 139rpx;
					height: 53rpx;
					font-size: 28rpx;
					text-align: center;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}
</style>
