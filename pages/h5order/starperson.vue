<template>
	<view class="page">
	<view class="user_fengyun">
					<view class="fengyun_title">风云热榜</view>
					<view class="fengyun_list flex">
						<view class="fengyun_list_dhpx">
							<view class="fengyun_list_title">带货排行榜</view>
							<view v-for="(item, index) in rankList" class="fengyun_list_item flex alc">
								<view style="width: 25rpx;"><text class="item_num">{{ index + 1 }}</text></view>
								<image class="item_img" :src="item.coverPicture"></image>
								<text class="item_nickname oneLine">{{ item.title }}</text>
							</view>
						</view>
						<view class="fengyun_list_dhbs">
							<view class="fengyun_list_title">带货飙升榜</view>
							<view v-for="(item, index) in hotList" class="fengyun_list_item flex alc">
								<view style="width: 25rpx;"><text class="item_num">{{ index + 1 }}</text></view>
								<image class="item_img" :src="item.coverPicture"></image>
								<text class="item_nickname oneLine">{{ item.title }}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="fengcai">
					达人风采
				</view>
				<view>
					<recommend />
				</view>
	</view>
</template>

<script>
	import recommend from "./components/recommend.vue"
	export default {
		components: {
recommend
		},
		data() {
			return {
		rankList: [],
		hotList:[]
			}
		},

		onLoad() {
			this.queryRankingList(5)
			this.queryRankingList(6)
		},
		onShow() {
		},
		onReachBottom() {
			uni.$emit('recommend')
		},
		onUnload() {
				if (window._51club) {
					window._51club.backIntercept('app');
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.backIntercept.postMessage("app")
				}
		},
		methods: {
			queryRankingList(type) {
				this.$newrequest.post("/coc-merchant-app/app/v2/home_page/merchant/power/list", {
						type
					})
					.then(res => {
						if (res.code === 200) {
							if (type === 5) {
								this.rankList = res.data
							} else if (type === 6) {
								this.hotList = res.data
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
	
	.fengcai {
		font-size: 35rpx;
		font-weight: 500;
		color: #222222;
		margin:20rpx;
	}
.user_fengyun {
			padding: 38rpx 23rpx 23rpx 23rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 23rpx;

			.fengyun_title {
				font-size: 35rpx;
				font-weight: 500;
				color: #222222;
			}

			.fengyun_list {
				margin-top: 23rpx;

				.fengyun_list_dhpx {
					padding: 16rpx;
					background: #FFF4F4;
					border-radius: 8rpx;
					flex: 1;
				}

				.fengyun_list_dhbs {
					padding: 16rpx;
					background: #FBF6EF;
					border-radius: 8rpx;
					margin-left: 23rpx;
					flex: 1;
				}

				.fengyun_list_title {
					font-size: 27rpx;
					font-weight: 500;
					color: #666666;
				}

				.fengyun_list_item {
					padding: 23rpx 0;

					.item_num {
						font-size: 31rpx;
						font-weight: 800;
						color: #222222;
					}

					.item_img {
						width: 77rpx;
						height: 77rpx;
						border-radius: 8rpx;
						margin-left: 16rpx;
					}

					.item_nickname {
						font-size: 27rpx;
						font-weight: 400;
						color: #222222;
						margin-left: 8rpx;
						width: 170rpx;
					}
				}
			}
		}
	
</style>
