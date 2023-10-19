<template>
	<view class="page">
		<view v-for="(item,index) in couponList" :key="index" style="margin-top: 10rpx;" @click="OnChoose(item)">
			<view class="list-img" :class="{'list-img-current':oncurrent(item)}">
				<view class="u-flex" style="align-items: center;">
					<view style="width: 182rpx;text-align: center;">
						<view class="card-left">
							<text style="font-size: 32rpx;">¥</text><text>{{item.discountMoney}}</text>
						</view>
						<view style="font-size: 20rpx;margin-top: 10rpx;">
							满{{item.fullMoney}}元可用
						</view>
					</view>
					<view style="margin-top: -10rpx;margin-left: 40rpx;">
						<view class="card-name">
							{{item.couponName}} <text class="add" v-if="item.allowOverlayUse==1">可叠加</text>
						</view>
						<view style="font-size: 20rpx;margin-top: 10rpx;">
							有效期：{{item.useBeginTime}}-{{item.useEndTime}}
						</view>
					</view>
				</view>
				<view>
				</view>
			</view>
		</view>
		<view style="height: 200rpx;">
		</view>
		<view class="bottom-btn">
			<text @click="onTrue()" class="true" v-if="choosecoupon.length>0">确认使用</text>
			<text @click="onTrue()" class="nochoose" v-else>暂不使用</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				couponList: [

				],
				choosecoupon: []
			}
		},

		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('couponList', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.couponList=data.data.couponList
					_this.choosecoupon=data.data.choosecoupon
				})
			})
		},
		onShow() {},
		methods: {
			onTrue() {
				uni.$emit('choosecoupon', {data:this.choosecoupon})
				uni.navigateBack({
					delta: 1
				});
			},
			oncurrent(item) {
				let iscurrent = false
				this.choosecoupon.filter(res => {
					if (res.couponUserNewId == item.couponUserNewId) {
						iscurrent = true
					}
				})
				return iscurrent
			},
			OnChoose(item) {
				let repeat = true
				let repeattwo = true
				let num = 0
				this.choosecoupon.filter(res => {
					if (res.allowOverlayUse == 0) {
						num++
					}
				})
				if (this.choosecoupon.length == 0) {
					this.choosecoupon.push(item)
				} else if (item.allowOverlayUse == 0) { //不叠加的券
					if (num == 0) {
						this.choosecoupon.push(item)
						return false
					}
					this.choosecoupon.filter((res, index) => {
						if (res.couponUserNewId == item.couponUserNewId) { //有相同的直接删除		即取消选中
							this.choosecoupon.splice(index, 1)
						} else if (res.allowOverlayUse == 0) { //已经有同类型的存在 则取消原来选中的 并选中现在选中的		
							this.choosecoupon.splice(index, 1)
							repeat = false
						}

					})
					if (!repeat) {
						this.choosecoupon.push(item)
					}

				} else if (item.allowOverlayUse == 1) {
					let add = 0
					this.choosecoupon.filter((res, index) => {
						if (res.couponUserNewId == item.couponUserNewId) { //如果有相同的id			
							this.choosecoupon.splice(index, 1)
							repeattwo = false
						}
					})
					if (repeattwo) {
						this.choosecoupon.push(item)
					}
				}

			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.list-img {
		margin: 10rpx auto;
		width: 705rpx;
		height: 138rpx;
		background-image: url('@/pages/service/static/image/weixuanzhongq.png');
		background-size: 100% 100%;
		display: flex;
		justify-content: space-between;
	}

	.list-img-current {
		background-image: url('@/pages/service/static/image/xuanzhongq.png');
	}

	.card-left {
		font-size: 42rpx;
		font-weight: bold;
		color: #D91B1B;
		margin-top: -10rpx;
	}

	.card-name {
		font-size: 28rpx;
		color: #D91B1B;
		font-weight: bold;
	}

	.add {
		border: #D91B1B 1rpx solid;
		font-size: 24rpx;
		margin-left: 20rpx;
		border-radius: 10rpx;
		padding: 6rpx 8rpx 6rpx 6rpx;
	}

	.bottom-btn {
		text-align: center;
		position: fixed;
		margin: 0 auto;
		bottom: 100rpx;
		left: 74rpx;

		.true {
			display: inline-block;
			width: 600rpx;
			height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			color: #ffffff;
			font-size: 34rpx;
			background-color: #D91B1B;
			line-height: 80rpx;
		}

		.nochoose {
			display: inline-block;
			width: 600rpx;
			height: 80rpx;
			text-align: center;
			border-radius: 40rpx;
			color: #ffffff;
			font-size: 34rpx;
			background-color: #999999;
			line-height: 80rpx;
		}
	}
</style>
