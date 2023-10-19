<template>
	<view class="page">
		<view class="list" v-for="(item,index) in dataList" :key="index">

			<view class="card">
				<view class="Unbinding">
					解绑
				</view>
				<view class="avatar">
					<image :src="item.url" mode="widthFix" style="width: 155rpx;"></image>
				</view>
				<view class="hr">
				</view>
				<view class="info">
					<view>
						{{item.nickname}}
					</view>
					<view style="margin-top: 20rpx;">
						{{item.customerInfo}}
					</view>
					<view style="margin-top: 20rpx;">
						手机号{{item.phone}}
					</view>
				</view>
			</view>
			<view class="btn-list">
				<view class="btn" @click="OntelPhone(item)">
					<view style="display: flex">
						<view style="margin-top: 8rpx;">
							<image src="../static/image/dianhuatianchong.png" style="width: 34rpx;height: 34rpx;">
							</image>
						</view>
						<view style="margin-left: 20rpx;">
							电话联系
						</view>
					</view>
				</view>
				<view class="btn" @click="OnqrCode(item)">
					<view style="display: flex;justify-content: space-around;">
						<view style="margin-top: 8rpx;">
							<image src="../static/image/baiweixin.png" style="width: 34rpx;height: 34rpx;">
							</image>
						</view>
						<view style="margin-left: 20rpx;">
							微信联系
						</view>
					</view>
				</view>
				<view class="btn">
					<view style="display: flex;justify-content: space-around;">
						<view style="margin-top: 8rpx;">
							<image src="../static/image/sixin.png" style="width: 34rpx;height: 34rpx;">
							</image>
						</view>
						<view @click="sendinfo(item)" style="margin-left: 20rpx;">
							站内私信
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="btn-bottom">
			<text @click="Add">
				添加客户经理
			</text>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="showpopadd" @close="showpopadd=false" mode="center">
			<view class="pop">
				<view style="display: flex;justify-content: space-around;margin-top: 80rpx;">
					<view class="u-flex">
						<view style="font-size: 28rpx;margin-right: 20rpx;line-height: 60rpx;">
							选择门店
						</view>
						<view
							style="line-height: 60rpx;height:60rpx;width:320rpx;background-color: #ffffff;font-size: 28rpx"
							@click='showPicker=true'>
							{{chooseshop.shopName}}
						</view>
					</view>
				</view>
				<view class="pop-btn" @click="OnPushManager">
					<text>确定</text>
				</view>
			</view>
		</u-popup>
		<u-popup :safeAreaInsetBottom='false' :show="showqrCode" @close="showqrCode=false" mode="center">
			<view>
				<image :src="qrCode" mode="widthFix" style="width: 500rpx;"></image>
			</view>
		</u-popup>
		<u-picker @confirm='OnchooseShop' @cancel='showPicker=false' :show="showPicker" :columns="shopList"
			keyName="shopName"></u-picker>
		<view style="height: 300rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				qrCode: '',
				showqrCode: false,
				showPicker: false,
				isLoadMore: false,
				current: 1,
				dataList: [],
				showpopadd: false,
				shopList: [],
				chooseshop: {
					shopName: ''
				}
			}
		},

		onLoad() {
			this.getList()
		},
		onShow() {},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		methods: {
			sendinfo(item) {
				let data = {
					id: item.userId,
					nickname: item.nickname
				}
				uni.navigateTo({
					url: '/pages/service/message/detail?type=0',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: data
						})
					}
				})
			},
			OnqrCode(val) {
				this.showqrCode = true
				this.qrCode = val.qrCode
			},
			OntelPhone(val) {
				uni.makePhoneCall({
					phoneNumber: val.phone
				});
			},
			OnPushManager() {
				if (this.chooseshop.id) {
					uni.navigateTo({
						url: '/pages/my/customer/binding?shopId=' + this.chooseshop.id
					})
				} else {
					this.showpopadd = false
				}
			},
			OnchooseShop(item) {
				this.chooseshop = item.value[0]
				this.showPicker = false
			},
			Add() {
				this.shopList = []
				this.$request.post("/coc-system/api/v1/system/shop/list", {
					shopType: '2'
				}).then(res => {
					this.shopList.push(res.data)
					this.showpopadd = true
				})

			},
			getList() {
				this.$request.post("/coc-my/api/v1/my/customer/manager/list", {
					current: this.current,
					size: 10
				}).then(res => {
					if (res.data.records.length < 10) {
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
		}
	}
</script>

<style lang="scss">
	.list {
		margin-top: 20rpx;

		.card {
			background-color: #ffffff;
			border-radius: 14px;
			padding: 20rpx;
			margin: 20rpx;
			display: flex;
			position: relative;

			.Unbinding {
				position: absolute;
				right: 40rpx;
				width: 101rpx;
				height: 40rpx;
				background-color: #999999;
				border-radius: 10rpx;
				line-height: 40rpx;
				font-size: 24rpx;
				text-align: center;
				color: #ffffff;
			}
		}

		.avatar {
			margin: 40rpx 40rpx 40rpx 0rpx;
		}

		.hr {
			background-color: #dddddd;
			width: 1rpx;
			margin-right: 40rpx;
		}

		.info {
			font-size: 24rpx;
			color: #222222;
			margin-top: 40rpx;
		}

		.btn-list {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;

			.btn {
				display: flex;
				justify-content: space-around;
				line-height: 56rpx;
				width: 222rpx;
				height: 56rpx;
				background-color: #d91b1b;
				border-radius: 10rpx;
				font-size: 28rpx;
				color: #ffffff;
			}
		}
	}

	.btn-bottom {
		width: 750rpx;
		text-align: center;
		position: fixed;
		bottom: 150rpx;

		text {
			display: inline-block;
			width: 600rpx;
			height: 81rpx;
			background-color: #d91b1b;
			border-radius: 40rpx;
			line-height: 81rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #ffffff;
		}
	}

	.pop {
		width: 710rpx;
		background-color: #f8f8f8;
		text-align: center;

		.pop-btn {
			margin-top: 40rpx;
			margin-bottom: 40rpx;

			text {
				width: 150rpx;
				height: 51rpx;
				background-color: #ffffff;
				border-radius: 10rpx;
				text-align: center;
				line-height: 51rpx;
				font-size: 32rpx;
				display: inline-block;
			}
		}
	}
</style>
