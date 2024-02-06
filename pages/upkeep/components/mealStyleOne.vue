<template>
	<view class="shopMenu">
		<view class="shopMenu_inner" @click.stop="jumpShopDetail">
			<view>
				<view class="shopMenu_top flex alc jsb">
					<view class="flex alc">
						<image class="shopMenu_top_logo" mode="heightFix" :src="data.brandLogo"></image>
						<view class="shopMenu_top_title oneLine">{{ data.storeAbbreviation }}</view>
					</view>
					<view class="shopMenu_top_distance">{{ data.distanceMsg }}</view>
				</view>
				<view class="shopMenu_tips flex" v-if="data.storeLabel&&data.storeLabel.length>0">
					<view class="shopMenu_tips_item" v-for="(v, i) in data.storeLabel" :key="i">
						{{ v }}
					</view>
				</view>
			</view>
			<view class="shopMenu_line"></view>
			<template v-if="data.latestTwoMeals&&data.latestTwoMeals.length>0">
				<view class="shopMenu_pro" v-for="(v, i) in data.latestTwoMeals" :key="i"
					@click.stop="jumpMealDetail(v.id)">
					<image class="shopMenu_pro_image" mode="aspectFill" :src="v.cover_image" />
					<view style="width: 538rpx;">
						<view class="shopMenu_pro_title oneLine">
							{{ v.maintain_name }}
						</view>
						<view class="shopMenu_pro_price flex jsb alc">
							<view class="shopMenu_pro_price_left">
								<span class="shopMenu_pro_price_left_unit">￥</span>
								<span
									class="shopMenu_pro_price_left_price1">{{ v.bankCardPrice?v.bankCardPrice:v.price }}</span>
								<span class="shopMenu_pro_price_left_price2">市场价￥{{ v.market_price }}</span>
							</view>
							<view class="shopMenu_pro_price_right">
								<image mode="aspectFill"
									src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699853590879.png" />
							</view>
						</view>
					</view>
				</view>
			</template>
		</view>
		<view v-if="data.showtype==1" style="height: 100rpx;margin: 10rpx 10rpx 0 0;">
			<image class="invite_icon" @click="jumpAppoint"
				src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705307901258.png">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			data: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		methods: {
			//跳转保养预约
			jumpAppoint() {
				uni.navigateTo({
					url: "/pages/upkeep/consult"
				})
			},
			//跳转4s店主页
			jumpShopDetail() {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + this.data.shopId
				})
			},
			//跳转保养套餐详情
			jumpMealDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + id
				})
			},
		},
	};
</script>
<style lang='scss' scoped>
	.shopMenu {
		padding-left: 10rpx;
		margin-top: 10rpx;

		&_inner {
			background: #FFFFFF;
			padding: 20rpx 30rpx 20rpx 10rpx;
			border-radius: 10rpx;
		}

		&_top {
			&_logo {
				width: 40rpx;
				height: 40rpx;
			}

			&_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				margin-left: 10rpx;
				max-width: 520rpx;
			}

			&_distance {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}
		}

		&_tips {
			flex-wrap: wrap;

			&_item {
				padding: 8rpx 12rpx;
				background: rgba(217, 27, 27, 0.1);
				border-radius: 10rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D91B1B;
				margin-right: 10rpx;
				float: left;
				display: inline-block;
				margin-top: 10rpx;
			}
		}

		&_line {
			width: 100%;
			height: 1rpx;
			background: #e8e8e8;
			margin-top: 20rpx;
		}

		&_pro {
			display: flex;
			margin-top: 20rpx;

			&_image {
				width: 142rpx;
				height: 142rpx;
				background: #ff3b3b;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			&_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				max-width: 520rpx;
			}

			&_tips {
				flex-wrap: wrap;

				&_item {
					padding: 8rpx 12rpx;
					background: rgba(217, 27, 27, 0.1);
					border-radius: 10rpx;
					font-size: 24rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #D91B1B;
					margin-right: 10rpx;
					float: left;
					display: inline-block;
					margin-top: 5rpx;
				}
			}

			&_price {
				margin-top: 40rpx;

				&_left {
					&_unit {
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #D91B1B;
					}

					&_price1 {
						font-size: 36rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #D91B1B;
					}

					&_price2 {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 500;
						text-decoration: line-through;
						color: #999999;
						margin-left: 9rpx;
					}
				}

				&_right {
					image {
						width: 143rpx;
						height: 53rpx;
					}
				}
			}
		}

		.invite_icon {
			width: 730rpx;
			height: 100rpx;
		}
	}
</style>