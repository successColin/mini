<template>
	<view>
		<view class="carList" @click.stop="jumpVideoDetail">
			<view class="car bgfff br10">
				<view class="flex alc jsb" @click.stop="jumpShopDetail">
					<view class="left flex alc">
						<image v-if="data.isArticle==0" :src="data.brandLogo" class="car_shoplogo" mode="heightFix">
						</image>
						<image v-else :src="data.headImage" class="car_shoplogo" style="border-radius: 50%;"></image>
						<view class="car_shopname oneLine">{{data.isArticle==0?data.baseName:data.nickname}}</view>
					</view>
					<template v-if="data.isArticle==1">
						<view v-if="!data.followType||data.followType==0||data.followType==2" class="car_follow"
							@click="follow">关注</view>
						<view v-else-if="data.followType==1" class="car_nofollow" @click="follow">已关注</view>
					</template>
				</view>
				<view class="oneLine car_title">{{data.title}}</view>
				<view v-if="data.isLandscapeScreen" class="car_videoBoxRow">
					<image :src="data.coverImage" mode="aspectFill" class="car_videoBoxRow_itemBg br10">
					</image>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
						class="car_videoBoxRow_iconPlay">
					</image>
				</view>
				<view v-else class="car_videoBoxH">
					<image :src="data.coverImage" mode="aspectFill" class="car_videoBoxH_itemBg br10">
					</image>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231026/file_1698288905836.png"
						class="car_videoBoxH_iconPlay">
					</image>
				</view>
				<view v-if="data.maintainMealListVO" class="flex jsb alc mt10" @click.stop="jumpMealDetail">
					<view class="flex">
						<image :src="data.maintainMealListVO.cover_image" mode="aspectFill" class="car_goodImg"></image>
						<view>
							<view class="flex" style="align-items: flex-end;margin-top: 8rpx;">
								<view class="car_brandName oneLine">{{data.maintainMealListVO.maintain_name}}</view>
							</view>
							<view class="flex alc" style="margin-top: 5rpx;">
								<text
									class="car_guidePrice">￥{{data.maintainMealListVO.bankCardPrice?data.maintainMealListVO.bankCardPrice:data.maintainMealListVO.price}}</text>
								<text class="car_yhPrice">原价:{{data.maintainMealListVO.market_price}}元</text>
							</view>
						</view>
					</view>
					<view class="car_zixun">抢购</view>
				</view>
				<view class="flex alc mt10" :class="{'car_bottom':data.maintainMealListVO}">
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704781119349.png"
						class="car_likeicon"></image>
					<text class="car_number">{{data.likeNum}}</text>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704781164003.png"
						class="car_commenticon"></image>
					<text class="car_number">{{data.commentNum}}</text>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704781184131.png"
						class="car_shareicon"></image>
					<text class="car_number">{{data.shareNum}}</text>
				</view>
			</view>
		</view>
		<image v-if="data.showtype==1" class="invite_icon" @click="jumpAppoint"
			src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705307737656.png">
		</image>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js';
	export default {
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
		},
		data() {
			return {
				data: null
			}
		},
		created() {
			this.data = this.item
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
				if (this.data.shopId == 0 || this.data.isArticle == 1) {

				} else {
					uni.navigateTo({
						url: '/pages/carShops/4Sdetail/index?id=' + this.data.shopId
					})
				}
			},
			//跳转保养套餐详情
			jumpMealDetail() {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + this.data.maintainMealListVO.id
				})
			},
			//跳转视频详情
			jumpVideoDetail() {
				if (this.data.isArticle == 0) {
					uni.navigateTo({
						url: "/pages/activity/foursvideo/index?id=" + this.data.id + "&type=3&title=保养知识",
					});
				} else if (this.data.isArticle == 1) {
					uni.navigateTo({
						url: `/pages/activity/articlevideo/index?id=${this.data.id}&relatedType=2&newType=1&type=1&userType=2&isQuote=1`,
					});
				}
			},
			follow() {
				if (!tologin()) {
					return false;
				}
				this.$newrequest.post("/coc-social/api/v2/article/followExpert", {
					userId: this.data.userId
				}).then(res => {
					if (res.code == 200) {
						if (!this.data.followType || this.data.followType == 0 || this.data.followType == 2) {
							this.data.followType = 1
						} else {
							this.data.followType = 2
						}
						uni.showToast({
							title: '操作成功',
							icon: 'none',
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.carList {
		padding: 0rpx 10rpx 10rpx 10rpx;

		.car {
			padding: 20rpx 10rpx 15rpx 10rpx;

			&_shoplogo {
				margin-right: 16rpx;
				height: 40rpx;
				width: 40rpx;
			}

			&_shopname {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				max-width: 500rpx;
			}

			&_title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				margin-top: 15rpx;
			}

			&_goshop {
				border: 1rpx solid #D91B1B;
				border-radius: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				width: 94rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D91B1B;
			}
			
			&_follow {
				border: 1rpx solid #D91B1B;
				border-radius: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				width: 94rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				background: #D91B1B;
			}
			
			&_nofollow {
				border: 1rpx solid #999999;
				border-radius: 20rpx;
				height: 40rpx;
				line-height: 40rpx;
				width: 94rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				background: #999999;
			}

			&_goodImg {
				width: 80rpx;
				height: 80rpx;
				border-radius: 10rpx;
				margin-right: 20rpx;
			}

			&_brandName {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				max-width: 450rpx;
			}

			&_consultCount {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-left: 18rpx;
			}

			&_guidePrice {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 800;
				color: #D91B1B;
			}

			&_yhPrice {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				text-decoration: line-through;
				color: #999999;
				margin: 0 14rpx 0 9rpx;
			}

			&_zixun {
				width: 100rpx;
				height: 52rpx;
				line-height: 52rpx;
				background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
				border-radius: 25rpx;
				text-align: center;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
			}

			&_videoBoxRow {
				position: relative;
				margin-top: 15rpx;

				&_itemBg {
					width: 710rpx;
					height: 300rpx;
				}

				&_iconPlay {
					position: absolute;
					top: 131rpx;
					left: 336rpx;
					width: 38rpx;
					height: 38rpx;
					z-index: 10;
				}
			}

			&_videoBoxH {
				position: relative;
				margin-top: 15rpx;

				&_itemBg {
					width: 480rpx;
					height: 580rpx;
				}

				&_iconPlay {
					position: absolute;
					top: 275rpx;
					left: 234rpx;
					width: 38rpx;
					height: 38rpx;
					z-index: 10;
				}
			}

			&_bottom {
				border-top: 1px solid #F8F8F8;
				padding-top: 10rpx;
			}

			&_likeicon {
				width: 36rpx;
				height: 34rpx;
			}

			&_commenticon {
				width: 36rpx;
				height: 36rpx;
				margin-left: 88rpx;
			}

			&_shareicon {
				width: 26rpx;
				height: 26rpx;
				margin-left: 105rpx;
			}

			&_number {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-left: 10rpx;
			}
		}
	}

	.invite_icon {
		width: 730rpx;
		height: 100rpx;
		margin: 0 10rpx 0 10rpx;
	}
</style>