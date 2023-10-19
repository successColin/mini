<template>
	<view class="page">
		<view class="top">
			<view v-for="(item,index) in tabs" :key="index" class="tabs" @click="changetab(index)"
				:class="{'currenttab':index==type}">
				{{item.label}}
			</view>
		</view>
		<view v-if="type==4" style="display: flex;">
			<view class="evaluatebtn" :class="[seacher.isComments==1?'evaluatebtn-color2':'evaluatebtn-color1']"
				@click="clickisComment(1)">待评论</view>
			<view class="evaluatebtn" :class="[seacher.isComments==2?'evaluatebtn-color2':'evaluatebtn-color1']"
				@click="clickisComment(2)">已评论</view>
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
								<view class="order-name" :class="{'type-four':type==4}">
									{{item.title}}
								</view>
								<view class="order-detail">
									<view style="font-size: 28rpx;">
										<text v-if="item.activityPayType==2">¥{{item.paidMoney}}</text>
										<text v-else>免费</text>
									</view>


									<view style="margin-top: 10rpx;width: 426rpx;font-size: 24rpx;color: #999999;">
										下单时间：{{item.createdAt}}
									</view>
									<view v-if="item.status!=0&&item.status!=7" style="margin-top: 10rpx;width: 426rpx;    font-size: 24rpx;color: #999999;">
										有效时间：{{item.endUseTime}}
									</view>
								</view>
							</view>
						</view>
						<view class="item-right">
							<view style="height: 100%;position: relative;display: flex;flex-direction: column;align-items: flex-end;">
								<view class="get-type" v-if="type!=4">
									{{gettype(item.status)}}
								</view>
								<view style="text-align: right;" v-if="item.status==0">
									<u-count-down @finish="item.iscountdown=true" :time="item.downTime" format="mm:ss">
									</u-count-down>
								</view>
								<view v-if="type==4" class="payment-four">
									<text
										@click.stop="OnDetail(item)">{{seacher.isComments==1?'去评论':seacher.isComments==2?'已评论':''}}</text>
								</view>
								<view
									v-else-if="(item.status===0||item.status===7)&&!item.iscountdown">

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
									<view v-if="item.activityPayType==2&&item.nonRefund==0" class="refund">
										<text @click="Onrefund(item)">申请退款</text>
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

		<u-toast ref="uToast"></u-toast>
		<u-modal @close="showpop=false" :closeOnClickOverlay="true" confirmColor='#D91B1B' :show="showpop" title="您要取消待付款订单" :content='poptitle' @confirm='confirm'></u-modal>
	</view>
</template>

<script>
	import dayjs from 'dayjs'
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				poptitle: '',
				showpop: '',
				signUpId: '',
				chosecomment: {},
				current: 1,
				dataList: [],
				tabs: [{
						label: '全部',
						value: 0,
					}, {
						label: '待付款',
						value: 1,
					}, {
						label: '待核销',
						value: 2,
					},
					{
						label: '已退款',
						value: 3,
					},
					{
						label: '待评论',
						value: 4,
					},
				],
				type: 0,

				seacher: {
					current: 1,
					size: 20,
					orderByColumn: 1,
					orderByMethod: 'desc',
					isComments: 1 //评价类型 1:待评价 2:已评价
				},
				isLoadMore: true
			}
		},

		onLoad(option) {
			this.type = option.type
		},
		onShow() {
			this.getList()
		},
		onReachBottom() {
			if (this.isLoadMore) {
				this.isLoadMore = false
				this.seacher.current++
				this.getList()
			}
		},
		methods: {
			clickisComment(type) {
				this.seacher.current = 1
				this.seacher.isComments = type
				this.getList()
			},
			OnPay(item) {
				this.$request.post("/coc-active/api/v1/sign_up/payment", {
					type: '3',
					activityId: item.activityId,
					totalAmount: item.orderMoney,
					merOrderId: item.orderNo,
					subOpenId: getstorage("openid")
				}).then(res => {
					if (res.code == 200) {
						this.wxpay(res.data)
					}
				})
			},
			wxpay(data) {
				let _this = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.miniPayRequest.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.miniPayRequest.nonceStr, // 随机字符串
					package: data.miniPayRequest.package, // 固定值
					signType: data.miniPayRequest.signType, //固定值
					paySign: data.miniPayRequest.paySign, //签名
					appid: data.miniPayRequest.appId,
					success: function(res) {

						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								_this.getList()
								uni.navigateTo({
									url: '/pages/my/myorder/orderList?orderNo=' + _this
										.dataList.activitySignUp.orderNo
								})
							}
						})
					},

					fail: function(err) {
						uni.showToast({
							icon: 'none',
							title: '支付失败'
						})
					}
				});
			},

			signupfalse(item) {
				this.signUpId = item.id
				this.poptitle = item.title
				this.showpop = true
			},
			confirm(){
				this.$request.post("/coc-active/api/v1/sign_up/cancel",{
					signUpId:this.signUpId
				}).then(res=>{
					if(res.code==200){
						this.$refs.uToast.show({
							message: '取消订单成功',
						})
						this.showpop=false
						this.getList()
					}else{
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			OnActivityDetail(item){
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			OnDetail(item) {
				if (this.type == 4) {
					uni.navigateTo({
						url: '/pages/home/wonderfulReview/detail?id=' + item.activityMarvellousId
					})
				} else {
					uni.navigateTo({
						url: '/pages/my/myorder/orderList?id=' + item.orderNo
					})
				}
			},
			getcountdown(time) {
				return dayjs(time).add(5, 'minute').toDate().getTime() - new Date().getTime()
			},
			getList() {
				if (this.type == 0) {
					this.seacher = this.seacher
					delete this.seacher.status
				} else {
					if (this.type == 1) {
						this.seacher.status = 0
					} else if (this.type == 2) {
						this.seacher.status = 1
					} else if (this.type == 3) {
						this.seacher.status = 4
					} else if (this.type == 4) {
						this.seacher.status = 2
					}
				}
				let msg = Object.assign({}, this.seacher)
				if (this.type != 4) {
					delete msg.isComments
				}
				this.$request.post("/coc-my/activity/order/list", msg).then(res => {
					if (msg.current == 1) {
						this.dataList = res.data.records.map(s => {
							return {
								...s,
								downTime: this.getcountdown(s.createdAt)
							}
						})
					} else {
						res.data.records.map(s => {
							this.dataList.push({
								...s,
								downTime: this.getcountdown(s.createdAt)
							})
						})
					}
					if (res.data.records.length >= this.seacher.size) {
						this.isLoadMore = true
					}
				})
			},
			OnCouponcode(item) {
				uni.navigateTo({
					url: '/pages/my/myorder/orderList?orderNo=' + item.orderNo
				})
			},
			OnRefundprogress() {
				uni.navigateTo({
					url: '/pages/my/myorder/refundprogress'
				})
			},
			Onrefund(item) {
				uni.navigateTo({
					url: '/pages/my/myorder/refund?orderNo=' + item.orderNo + '&orderCode=' + item.orderCode +
						'&orderMoney=' + item.paidMoney
				})
			},
			gettype(type) {
				switch (type) {
					case 0:
						return '待付款'
						break;
					case 1:
						return '待核销'
						break;
					case 2:
					// 待评价
						return '已完成'
						break;
					case 3:
						return '已完成'
						break;
					case 4:
						return '已退款'
						break;
					case 5:
						return '已取消'
						break;
					case 6:
						return '支付失败'
						break;
					case 7:
						return '付款中'
						break;
					case 8:
						return '退款申请中'
						break;
				}
			},
			changetab(index) {
				this.type = index
				this.seacher.current = 1
				if (index == 4) {
					this.seacher.isComments = 1
				}
				this.getList()
			},
		}
	}
</script>

<style lang="scss" scoped>
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

		.type-four {
			width: 600rpx;
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

	.evaluatebtn {
		width: 150rpx;
		height: 60rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
		background: #ffffff;
		margin-left: 20rpx;
	}

	.evaluatebtn-color1 {
		background: #ffffff;
		color: #000000;
	}

	.evaluatebtn-color2 {
		background: #d91b1b;
		color: #ffffff;
	}
</style>
