<template>
	<view class="page">
		<view class="search-top">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot" slot="center">
					<view style="margin-left: 100rpx;margin-right: 20rpx;">
						<u-search @custom='Onsearch' @search='Onsearch' :placeholder="title" v-model="keyword">
						</u-search>
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view>
						<u-search @custom='Onsearch' @search='Onsearch' :placeholder="title" v-model="keyword">
						</u-search>
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<!-- 占位元素 -->
		<view style="margin-top: 24%">
		</view>
		<!-- 搜索历史 -->
		<view v-if=" history.length>0" class="search-history">
			<view class="top-hr">
			</view>
			<view class="title">
				<view>
					<u-icon color="#999999" size='16' name="clock"></u-icon>
				</view>
				<view class="text">搜索历史</view>
			</view>
			<view class="search-item">
				<view @click="OnSetkeyword(item)" v-for="(item,index) in history" :key="index" class="history">
					{{item}}
				</view>

			</view>
		</view>
		<!-- 搜索发现 -->
		<!-- <view v-if="dataList.keywordUsersVO.length>0" class="search-find">
			<view class="title">
				<view>
					<u-icon color="#999999" size='16' name="clock"></u-icon>
				</view>
				<view class="text">搜索发现</view>
			</view>
			<view class="search-item">
				<view v-for="(item,index) in dataList.keywordUsersVO" :key="index" class="history" @click="OnSetkeyword(item.keyword)">
					{{item.keyword}}
				</view>

			</view>
		</view> -->
		<!-- 搜索排名 -->
		<!-- 		<view v-if="dataList.keywordAllsVO.length>0" class="search-rank">
			<view class="title">
				<view>
					<u-icon color="#999999" size='16' name="clock"></u-icon>
				</view>
				<view class="text">搜索排名</view>
			</view>
			<view style="margin-left: 74rpx;">
				<view class="rank" v-for="(item,index) in dataList.keywordAllsVO" :key='index' @click="OnSetkeyword(item.keyword)">
					<text class="icon-rank">{{index+1}}</text>{{item.keyword}}
				</view>
			</view>
			<view>
			</view>
		</view> -->
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				dataList: {},
				history: [],
				type: '',
				keyword: '',
				title: '搜索感兴趣的活动',
				activityPaymentPreferenceId: ''

			}
		},

		onLoad(option) {
			this.type = option.type
			this.activityPaymentPreferenceId = option.activityPaymentPreferenceId
			this.getHistory(option.type)
			if (option.type == 1) {
				this.title = '搜索俱乐部官方活动'
			} else if (option.type == 2) {
				this.title = '搜索4S店专享活动'
			} else if (option.type == 3) {
				this.title = '搜索爱玩达人活动'
			} else if (option.type == 12) {
				this.title = '搜索感兴趣的精彩活动回放'
			} else if (option.type == 4) {
				this.title = '搜索感兴趣的活动'
			} else if (option.type == 13) {
				this.title = '搜索感兴趣的商家'
			} else if (option.type == 14) {
				if (option.activityPaymentPreferenceId == 4) {
					this.title = '搜索人保优惠活动'
				} else if (option.activityPaymentPreferenceId == 5) {
					this.title = '搜索农行优惠活动'
				} else if (option.activityPaymentPreferenceId == 6) {
					this.title = '搜索工行优惠活动'
				}
			}

			// this.getList()
		},
		onShow() {

		},
		methods: {

			getList() {
				this.$request.post("/coc-active/api/v1/search/getSearchList", {
					shopTypeId: this.type
				}).then(res => {
					this.dataList = res.data

				})
			},
			OnSetkeyword(item) {
				this.keyword = item
				this.Onsearch()
			},
			getHistory(type) {
				let _this = this
				uni.getStorage({
					key: 'history' + type,
					success: function(res) {
						_this.history = res.data
					}
				});

			},
			Onsearch(val) {
				if (val) {
					uni.getStorage({
						key: 'history' + this.type,
						success: function(res) {
							this.history = res.data
						}
					});
					let history = this.history

					if (history.length < 6) {
						history.unshift(val)

					} else {
						history.splice(5, 1)
						history.unshift(val)
					}
					uni.setStorage({
						key: 'history' + this.type,
						data: history,
						success: function() {
							console.log('success');
						}
					});
					this.history = history
				}
			 if (this.type == 3) {
					uni.redirectTo({
						url: '/pages/home/Playfulperson/index?keyword=' + this.keyword
					})
				} else if (this.type == 13) { //活动商城列表
					uni.redirectTo({
						url: '/pages/activityMall/list?type=4&keyword=' + this.keyword
					})
				} else if (this.type == 14) { //支付优惠活动列表
					uni.redirectTo({
						url: `/pages/activity/paymentpreference/index?keyword=${this.keyword}&activityPaymentPreferenceId=${this.activityPaymentPreferenceId}`
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.search-top {

		width: 480rpx;
		margin-left: -100rpx;
	}

	.top-hr {
		border-top: 1rpx #cacaca solid;
		height: 1rpx;
		width: 100%;

	}

	.search-history {
		.title {
			margin: 30rpx;
			display: flex;

			.text {
				font-size: 32rpx;
				line-height: 30rpx;
				margin-left: 20rpx;
			}
		}

		.search-item {
			margin: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.history {
				margin-left: 60rpx;
				margin-top: 30rpx;
			}
		}
	}

	.search-find {
		margin-top: 30rpx;
		border-top: 1rpx #e3e3e3 solid;

		.title {
			margin: 30rpx;
			display: flex;

			.text {
				font-size: 32rpx;
				line-height: 30rpx;
				margin-left: 20rpx;
			}
		}

		.search-item {
			margin: 30rpx;
			display: flex;
			flex-wrap: wrap;

			.history {
				margin-left: 60rpx;
				margin-top: 30rpx;
			}
		}
	}

	.search-rank {
		margin-top: 30rpx;
		border-top: 1rpx #cacaca solid;

		.title {
			margin: 30rpx 30rpx 10rpx 30rpx;
			display: flex;

			.text {
				font-size: 32rpx;
				line-height: 30rpx;
				margin-left: 20rpx;
			}
		}

		.rank {
			padding-top: 20rpx;
			font-size: 28rpx;
		}

		.icon-rank {
			margin-right: 15rpx;
		}
	}
</style>
