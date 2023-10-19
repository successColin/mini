<template>
	<view class="page">
		<view @click="OnCarDetail(2,item)" v-for="(item,index) in dataList" :key="index" class="secondCarItem flex">
			<view class="secondCarL">
				<image :src="item.faceImage"></image>
			</view>
			<view class="newCarR">
				<view class="flex alc  moreLine">
					<view class="newCarT">{{item.cxTitle}}</view>
				</view>
				<view class="u-flex" style="margin-left: -12rpx;margin-top: 12rpx;">
					<view v-for="(item1,index1) in item.biaoqian" :key="index1" style="padding-left: 12rpx;">
						<view class="label">
							{{item1}}
						</view>
					</view>
				</view>
				<view style="margin-left: -12rpx;" class="u-flex" >
					<view class="tag-style" v-for="(itemtag,indextag) in item.vehicleTagsList[0]" :key="vehicleTagsList">
						<text class="tag-text">{{itemtag}}</text>
					</view>
				</view>
			
				<view class="size24" style="color: #999999;margin-top: 12rpx;margin-bottom: 12rpx;">
					{{item.firstLicenseDate}}丨{{item.mileage*0.0001}}万公里
				</view>
				<view class="u-flex" style="align-items: baseline;">
					<view style="font-size: 32rpx;font-weight: bold;color: #D91B1B;">
						{{(item.price*0.0001).toFixed(2) }}<text style="font-size: 24rpx;margin-left: 6rpx;">万</text>
					</view>
					<view style="font-size: 24rpx;text-decoration:line-through;margin-left: 16rpx;">
						{{(item.elevatingPrice*0.0001).toFixed(2)}}<text>万</text>
					</view>
				</view>
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
				shopId: '',
				vehicleId: '',
				dataList: {}
			}
		},

		onLoad(option) {
			this.shopId = option.shopId
			this.vehicleId = option.vehicleId
			this.getList()
		},
		onShow() {},
		methods: {
			OnCarDetail(index, item) {

				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=' + index + '&id=' + item.vehicleInfoId + '&shopId=3'
				})
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v1/vehicleInfo/same/vehicle/secondHand", {
					vehicleId: this.vehicleId,
					sort: '1'
				}).then(res => {
					res.data.filter(s => {
						s.vehicleTagsList = []
						s.vehicleTagsList.push(s.vehicleTags.split(','))
					})
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.secondCarItem {
		position: relative;
		padding: 15rpx;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 10rpx 25rpx;

		.label {
			background-color: rgba(217, 27, 27, 0.08);
			border-radius: 18rpx;
			color: #D91B1B;
			font-size: 20rpx;
			text-align: center;
			padding: 10rpx;
		}

		.topTip {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .3);
			color: #fff;
			font-size: 24rpx;
			text-align: center;
			padding: 0 25rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 10rpx 0 10rpx 0;
		}

		.secondCarL {
			margin-bottom: -4rpx;

			image {
				width: 240rpx;
				height: 240rpx;
				border-radius: 10rpx;
			}
		}

		.newCarR {
			width: 400rpx;
			margin-left: 18rpx;

			.newCarT {
				font-size: 28rpx;
				font-weight: bold;
				margin-right: 10rpx;
				height: 80rpx;
			}

			.carDown {
				width: 38rpx;
				height: 41rpx;
			}

			.newCarHui {
				color: #D91B1B;
			}
		}
	}
	.tag-style{
		background: #fceded;
		border-radius: 18rpx;
		text-align: center;
		padding: 0rpx 8rpx 2rpx 8rpx;
		margin-left: 12rpx;
		.tag-text{
			color: #D91B1B;
			font-size: 20rpx;
			text-align: center;
		}
	}
</style>
