<template>
	<view class="meal_item flex" @click="jump">
		<image class="meal_item_img" :src="item.cover_image" mode="aspectFill">
		</image>
		<view class="meal_item_right flex jsb">
			<view>
				<view class="meal_item_title moreLine">{{item.maintain_name}}</view>
				<view class="flex alc" style="margin-top: 15rpx;">
					<image class="meal_item_icon"
						src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"></image>
					<view class="meal_item_shopname" style="margin-left: 11rpx;">{{item.shopName}}</view>
					<!-- 				<view class="meal_item_distance" style="margin-left: 24rpx;">3.8KM</view> -->
				</view>
			</view>
			<view class="flex jsb" style="align-items: flex-end;">
				<view class="flex alc">
					<view class="meal_item_prefix">￥</view>
					<view class="meal_item_price1">{{item.bankCardPrice?item.bankCardPrice:item.price}}</view>
					<view class="meal_item_price2">市场价￥{{item.market_price}}</view>
				</view>
				<image class="meal_item_btn_icon"
					src="https://oss.dcqcjlb.com/51che_java_dev/20231113/file_1699853590879.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: { //数据项
				type: Object,
				default: () => {
					return {}
				}
			},
			searchKey: { //用于高亮显示
				type: String,
				default: ""
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + this.item.id
				})
			},
			getTitle(value) {
				// if (this.searchKey) {
				// 	return value.replaceAll(this.searchKey, `<label style="color:#D91B1B">${this.searchKey}</label>`);
				// } else {
				// 	return value
				// }
				return value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.meal {
		&_item {
			padding-bottom: 10rpx;

			&_img {
				width: 230rpx;
				height: 230rpx;
				border-radius: 10rpx;
			}

			&_right {
				margin-left: 20rpx;
				width: calc(100% - 230rpx - 20rpx);
				flex-direction: column;
			}

			&_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				max-width: 450rpx;
			}

			&_icon {
				width: 26rpx;
				height: 26rpx;
			}



			&_shopname,
			&_distance {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			&_prefix {
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

			&_btn_icon {
				width: 143rpx;
				height: 53rpx;
			}
		}
	}
</style>