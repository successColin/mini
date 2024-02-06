<template>
	<view class="page">
		<view class="top">
			<view class="top-search">
				<image src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
					class="top-search-image" />
				<input v-model="search" placeholder="搜索" placeholder-style="color:#999999;font-size:27rpx;"
					class="top-search-input" @blur="setSearch" />
			</view>
		</view>
		<view v-if="activityList.length" class="list">
			<view class="list-top">
				<view class="list-left">
					<view class="list-top-red">{{ lookSearch }}</view>
					<view class="list-top-line" />
					<view class="list-top-title">玩乐专区</view>
				</view>
				<view class="list-top-more" @click="toActivity">更多</view>
			</view>
			<view style="margin: 0 10rpx 0 15rpx;">
				<ActivityStyleOne v-for="(item,index) in activityList" :key="index" :item="item" :isOnlyDetail="true"
					:searchKey="lookSearch">
				</ActivityStyleOne>
			</view>
		</view>
		<view v-if="mealList.length" class="list">
			<view class="list-top">
				<view class="list-left">
					<view class="list-top-red">{{ lookSearch }}</view>
					<view class="list-top-line" />
					<view class="list-top-title">保养套餐</view>
				</view>
				<view class="list-top-more" @click="toMeal">更多</view>
			</view>
			<view style="margin: 0 10rpx 0 10rpx;">
				<MealStyleOne v-for="(item,index) in mealList" :key="index" :item="item" :searchKey="lookSearch">
				</MealStyleOne>
			</view>
		</view>
		<view class="safe-bottom-height" />
	</view>
</template>

<script>
	import ActivityStyleOne from "@/pages/home/home/components/activity/activityStyleOne.vue"
	import MealStyleOne from "./components/mealStyleOne.vue"
	export default {
		components: {
			ActivityStyleOne,
			MealStyleOne
		},
		data() {
			return {
				search: "",
				lookSearch: "",
				activityList: [],
				mealList: []
			};
		},
		methods: {
			async setSearch() {
				this.activityList = [];
				this.mealList = [];
				this.lookSearch = this.search;
				if (this.search) {
					this.$request.post(
						"/coc-active/api/v2/homePage/fourShopComprehensiveSearch", {
							searchStr: this.search,
							current: 1,
							size: 10,
						}
					).then(res => {
						if (res.code == 200) {
							this.activityList = res.data.getActivitysVOShop.homePageActivitysVOIPage.records
							this.mealList = res.data.maintainMealPageVO.maintainMealListVOS
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
				}
			},
			toActivity() {
				uni.navigateTo({
					url: "/pages/carShops/4sShop/play"
				})
			},
			toMeal() {
				uni.navigateTo({
					url: "/pages/upkeep/meal"
				})
			}
		},
	};
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
		height: 64rpx;
		margin: 10rpx 0;

		&-search {
			display: flex;
			align-items: center;
			width: 730rpx;
			height: 64rpx;
			border-radius: 32rpx;
			background: #ffffff;

			&-image {
				width: 48rpx;
				height: 48rpx;
				margin-left: 15rpx;
			}

			&-input {
				width: 621rpx;
				font-size: 27rpx;
				font-family: PingFang SC-Regular, PingFang SC;
				font-weight: 400;
				color: #222222;
				line-height: 32rpx;
				margin-left: 8rpx;
				margin-right: 15rpx;
			}
		}
	}

	.list {
		width: 730rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin-left: 10rpx;

		&-top {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 86rpx;

			&-red {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #d91b1b;
				margin-left: 11rpx;
			}

			&-line {
				width: 12rpx;
				height: 2rpx;
				background: #222222;
				margin-left: 12rpx;
				margin-right: 13rpx;
			}

			&-title {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
			}

			&-more {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-right: 18rpx;
			}
		}

		&-left {
			display: flex;
			align-items: center;
		}
	}

	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}
</style>