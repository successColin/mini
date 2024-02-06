<template>
	<view>
		<view @touchstart="adTouchstart" @touchend="adTouchend">
			<swiper v-if="swiper.list.length > 0" class="swiper" :previous-margin="swiper.pre_margin"
				:next-margin="swiper.next_margin" :circular="true" :autoplay="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in swiper.list" :key="index">
					<view class="le-item" :class="{ 'le-item-active': swiper.index == index }" @click="jump(item)">
						<image class="le-img" :src="item.coverPicture"></image>
						<view class="le-title oneLine">{{ item.title }}</view>
						<view class="le-bottom">
							<view class="le-label" v-if="item.activityPaymentPreferenceId">
								<text class="le-label-item">
									{{
							        getPaymentPreferenceIdTitle(item.activityPaymentPreferenceId)
							    }}
								</text>
							</view>
							<view class="flex alc" style="position: relative;">
								<image class="le-bottom-price-div-icon"
									src="https://oss.dcqcjlb.com/51che_java_dev/20240111/file_1704957555709.png">
								</image>
								<view class="le-bottom-price-div flex">
									<view v-if="item.payType == 1" class="le-bottom-price1">免费</view>
									<template v-else>
										<view class="le-bottom-prefix">￥</view>
										<view class="le-bottom-price1">
											{{item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice}}
										</view>
									</template>
									<view class="le-bottom-price2">￥{{ item.marketPrice }}</view>
								</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<u-sticky offset-top="0">
			<view class="play-tab">
				<image v-show="tabIndex==1" class="play-tab-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20240112/file_1705019137818.png"></image>
				<image v-show="tabIndex==2" class="play-tab-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20240112/file_1705019470540.png"></image>
				<image v-show="tabIndex==3" class="play-tab-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20240112/file_1705019488191.png"></image>
				<view class="play-tab-btn play-tab-img flex">
					<view class="play-tab-btn-item" @click="clickTab(1)"></view>
					<view class="play-tab-btn-item" @click="clickTab(2)"></view>
					<view class="play-tab-btn-item" @click="clickTab(3)"></view>
				</view>
			</view>
		</u-sticky>
		<ActivityList ref="childlist" v-if="tabIndex==1" :otherHeight="topHeight+otherHeight" :isEnd="1"></ActivityList>
		<Recommend ref="childlist" v-if="tabIndex==2" :otherHeight="topHeight+otherHeight"></Recommend>
		<ActivityList ref="childlist" v-if="tabIndex==3" :otherHeight="topHeight+otherHeight" :isEnd="2"></ActivityList>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import ActivityList from './activityList.vue'
	import Recommend from './recommend.vue'
	export default {
		components: {
			ActivityList,
			Recommend
		},
		props: {
			otherHeight: { //组件之外高度
				type: Number
			}
		},
		computed: {
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			}
		},
		data() {
			return {
				swiper: {
					next_margin: "86rpx",
					pre_margin: "0rpx",
					index: 0,
					list: []
				},
				tabList: [{
					index: 1,
					name: '精选活动'
				}, {
					index: 2,
					name: '达人推荐'
				}, {
					index: 3,
					name: '往期活动'
				}],
				tabIndex: 1,
				topHeight: 0
			}
		},
		created() {
			this.$showLoading()
			setTimeout(() => {
				this.$hideLoading();
			}, 500)
			this.getFourSAdvActivity();
		},
		methods: {
			adTouchstart() {
				uni.$emit('car_service_istouch', false)
			},
			adTouchend() {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
			},
			//获取置顶活动
			getFourSAdvActivity() {
				this.$request.post("/coc-active/api/v1/adv/space/getFourSAdvActivity").then((res) => {
					if (res.code == 200) {
						this.swiper.list = res.data;
					} else {
						uni.showToast({
							title: res.message,
							icon: "none",
							duration: 2000,
						});
					}
				}).finally(() => {
					// setTimeout(() => {
					// 	uni.createSelectorQuery().in(this).select("#top").boundingClientRect(data => {
					// 		this.topHeight = data.height
					// 	}).exec()
					// }, 1000)
				});
			},
			getPaymentPreferenceIdTitle(id) {
				if (id == 4) {
					return "人保用户专享";
				} else if (id == 5) {
					return "农行信用卡用户专享";
				} else if (id == 6) {
					return "工行信用卡用户专享";
				} else if (id == 7) {
					return "邮储信用卡用户专享";
				} else if (id == 8) {
					return "民生信用卡用户专享";
				} else if (id == 10) {
					return "官方优惠专享";
				}
			},
			//swiper滑动事件
			swiperChange: function(e) {
				this.swiper.index = e.detail.current;
			},
			jump(item) {
				if (item.shopTypeId === 2) {
					uni.navigateTo({
						url: "/pages/carShops/4Sdetail/shopActiveDetail?id=" + item.id,
					});
				} else {
					uni.navigateTo({
						url: "/pages/home/activityDetail/index?id=" + item.id,
					});
				}
			},
			clickTab(tabindex) {
				if (this.tabIndex != tabindex) {
					this.tabIndex = tabindex
				}
			},
			changeTab(type) {
				if (type == 'left') {
					if (this.tabIndex == 1) {
						this.$parent.changeTab('left')
					} else if (this.tabIndex == 2 || this.tabIndex == 3) {
						this.tabIndex = this.tabIndex - 1
					}
				} else if (type == 'right') {
					if (this.tabIndex == 1 || this.tabIndex == 2) {
						this.tabIndex = this.tabIndex + 1
					} else if (this.tabIndex == 3) {
						this.$parent.changeTab('right')
					}
				}
			},
			scrolltolower() {
				this.$refs.childlist.scrolltolower()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper {
		margin-left: 10rpx;
		padding-top: 10rpx;
		height: 361rpx;

		.le-item {
			width: 644rpx;
			height: 361rpx;
			border-radius: 20rpx;
			position: relative;

			.le-img {
				width: 644rpx;
				height: 361rpx;
				border-radius: 20rpx;
			}

			.le-content {
				padding: 0 9rpx 0 21rpx;
			}

			.le-title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				position: absolute;
				top: 20rpx;
				left: 21rpx;
				width: 580rpx;
			}

			.le-label {
				&-item {
					padding: 6rpx 17rpx 6rpx 17rpx;
					border-radius: 10rpx 10rpx 0rpx 0rpx;
					font-size: 20rpx;
					font-weight: 500;
					color: #d91b1b;
					background: #FFE2E2;
				}
			}

			.le-bottom {
				position: absolute;
				bottom: 0;
				left: 0;
				z-index: 100;

				&-price-div {
					background: #FFFFFF;
					border-radius: 0rpx 10rpx 0rpx 20rpx;
					position: absolute;
					left: 10rpx;
					bottom: 8rpx;
					align-items: flex-end;
				}

				&-price-div-icon {
					width: 346rpx;
					height: 60rpx;
					border-radius: 0 0 0 15rpx;
				}

				&-prefix {
					font-size: 24rpx;
					font-weight: 500;
					color: #D91B1B;
					line-height: 40rpx;
				}

				&-price1 {
					font-size: 32rpx;
					font-weight: 500;
					color: #d91b1b;
					line-height: 40rpx;
				}

				&-price2 {
					font-size: 24rpx;
					font-weight: 400;
					text-decoration: line-through;
					color: #999999;
					margin-left: 10rpx;
					line-height: 40rpx;
				}
			}
		}
	}

	.play-tab {
		margin-top: 10rpx;
		height: 71rpx;
		position: relative;
		background: #F8F8F8;

		&-img {
			width: 750rpx;
			height: 71rpx;
		}

		&-btn {
			position: absolute;
			left: 0;
			top: 0;

			&-item {
				flex: 1;
			}
		}
	}
</style>