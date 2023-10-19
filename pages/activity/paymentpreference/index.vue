<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="search-top" :style="{height:navbarHeight+'px'}">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot u-flex" slot="center">
					<view @click="OnPushSearch" style="margin-left: 100rpx;margin-right: 20rpx;">
						<u-search :disabled="true" :placeholder="title" v-model="keyword" :showAction="false">
						</u-search>
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view @click="OnPushSearch">
						<u-search :disabled="true" :showAction="false" :placeholder="title" v-model="keyword">
						</u-search>
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<!-- 顶部广告栏 -->
		<carousel :topClass="['top-img']" height="130px" urlkey="url"  :dataType="2"
			:systemCode="systemCode" :indicatorType="4">
		</carousel>
		<activitylist v-if="dataList.length>0" :dataList="dataList">
		</activitylist>
		<view v-if="dataList.length==0" style="text-align: center;margin-top: 300rpx;">
			<image style="width: 269rpx;height: 232rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221130/7734996e1ed14322a9f3336976ff2136.png">
			</image>
			<view style="font-size: 24rpx;color: #999999;margin-top: 80rpx;">
				暂无活动
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<u-popup :safeAreaInsetBottom='false' :show="showvideo" @close="showvideo=false" mode="center">
			<view>
				<video :src="popvideo"></video>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	import activitylist from '@/components/activitylist/activitylist.vue'
	export default {
		components: {
			activitylist,
			carousel
		},
		data() {
			return {
				popvideo: '',
				showvideo: false,
				dataList: {},
				keyword: '',
				title: '搜索支付优惠活动',
				current: 1,
				isLoadMore: false,
				activityPaymentPreferenceId: '',
				systemCode: ''
			}
		},

		onLoad(option) {
			this.keyword = option.keyword ? option.keyword : ''
			this.activityPaymentPreferenceId = option.activityPaymentPreferenceId
			if (option.activityPaymentPreferenceId == 4) {
				this.title = '搜索人保优惠活动'
				this.systemCode = 'applets_life_insurance'
			} else if (option.activityPaymentPreferenceId == 5) {
				this.title = '搜索农行优惠活动'
				this.systemCode = 'applets_agricultural_bank'
			} else if (option.activityPaymentPreferenceId == 6) {
				this.title = '搜索工行优惠活动'
				this.systemCode = 'applets_icbc'
			}
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		computed: {
			// z状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},

		},
		methods: {
			OnInsertBroadcast(url) {
				// uni.navigateTo({
				// 	url: '/pages/my/webview/index?url=' + url
				// })
				this.popvideo = url
				this.showvideo = true
			},
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.id
				})
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v1/activity/getActivitys", {
					current: this.current,
					size: '10',
					keyword: this.keyword,
					activityPaymentPreferenceId: this.activityPaymentPreferenceId
				}).then(res => {
					if (res.data.activityHomePageVOS.length < 10) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.dataList = res.data.activityHomePageVOS
					} else {
						res.data.activityHomePageVOS.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
			OnPushSearch() {
				uni.redirectTo({
					url: "/pages/activity/search/index?type=14&activityPaymentPreferenceId=" +
						this.activityPaymentPreferenceId
				});
			},



		}
	}
</script>

<style lang="scss">
	.search-top {
		width: 480rpx;
		margin-left: -100rpx;
		display: flex;
	}

	.play-title-top {
		margin-top: -80rpx;
	}

	.top-icon {
		width: 143rpx;
		height: 48rpx;
		background-color: #d91b1b;
		border-radius: 16rpx 0rpx 24rpx;
		font-size: 24rpx;
		color: #ffffff;
		line-height: 48rpx;
		text-align: center;
		margin-bottom: -48rpx;
		float: right;
	}

	.top-img {
		margin: 20rpx 20rpx 20rpx 20rpx;
		border-radius: 12rpx;
	}

	.btn-project {
		font-size: 24rpx;

		.btn {
			height: 51rpx;
			background-color: white;
			text-align: center;
			line-height: 51rpx;
			border-radius: 14rpx;
			font-weight: bold;
			width: 230rpx;
			padding-top: 6rpx;
			padding-bottom: 6rpx;
			font-size: 28rpx;
		}

		.active-project {
			background-color: #d91b1b;
			color: white;
		}
	}

	.btn-status {
		display: flex;
		// justify-content: space-between;
		margin: 20rpx;
		font-size: 24rpx;

		.btn {
			height: 51rpx;
			background-color: white;
			text-align: center;
			line-height: 51rpx;
			border-radius: 14rpx;
			font-weight: bold;
			width: 174rpx;
			padding-top: 6rpx;
			padding-bottom: 6rpx;
		}

		.active-project {
			background-color: #d91b1b;
			color: white;
		}
	}

	.play-item {
		width: 100%;

		margin-top: 20rpx;
		display: flex;
		flex-wrap: wrap;
		// column-count: 2;
	}

	.imgitem {
		width: 330rpx;
		margin-top: 20rpx;
	}

	.play-title {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 这里是超出几行省略 */
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		margin-left: 20rpx;
		margin-right: 20rpx;
		margin-top: 10rpx;
	}

	.play-price {
		display: flex;
		justify-content: space-between;
		margin: 0 10rpx 10rpx 10rpx;
	}

	.text-price {
		color: #d91b1b;
		font-size: 28rpx;
		font-weight: bold;
		position: relative;
		line-height: 50rpx;
	}
</style>
