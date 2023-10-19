<template>
	<view class="page">
		<view @click="OnCarDetail(1,item)" v-for="(item,index) in dataList" :key="index" class="newCarItem flex jsb alc">
					<view class="newCarL">
						<image :src="item.faceImage"></image>
					</view>
					<view class="newCarR">
						<view class="flex alc mb20">
							<text class="newCarT">{{item.vehicleName}}</text>
							<image src="@/static/image/down.png" class="carDown" mode="widthFix"></image>
							<text class="size24 newCarHui">优惠{{(item.discount*0.0001).toFixed(2)}}万</text>
						</view>
						<view class="size24 mb20">指导价：{{item.elevatingPriceMin}}-{{item.elevatingPriceMax}}</view>
						<view class="flex alc jsb">
							<view class="newCarShopName txtLighGray size24">{{item.askNum}}人咨询</view>
							<view class="goShop">咨询</view>
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
		dataList:{}
			}
		},

		onLoad(option) {
			this.shopId=option.shopId
			this.vehicleId=option.vehicleId
			this.getList()
		},
		onShow() {
		},
		methods: {
			OnCarDetail(index,item){
				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=' + index+'&id='+item.vehicleInfoId+'&shopId='+this.id
				})
			},
			getList(){
				this.$newrequest.post('/coc-active/api/v1/vehicleInfo/same/vehicle',{
					vehicleId:this.vehicleId,
					sortType:'1',
					priceMin:0,
					size:100,
					current:1
				}).then(res=>{
					this.dataList=res.data.records
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
	}
.newCarItem {
		position: relative;
		padding: 0 16rpx 0 0;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 10rpx 25rpx;

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

		.newCarL {
			image {
				width: 280rpx;
				height: 200rpx;
				border-radius: 10rpx 0 0 10rpx;
			}
		}

		.newCarR {
			width: 380rpx;
			padding: 30rpx 0 20rpx;

			.newCarT {
				font-size: 32rpx;
				font-weight: bold;
				margin-right: 10rpx;
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
	.mb20 {
		margin-bottom: 20rpx;
	}
	
	.goShop {
		width: 100rpx;
		height: 52rpx;
		line-height: 52rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		color: #FFFFFF;
	}
</style>
