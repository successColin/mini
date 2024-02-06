<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="search-top" :style="{ height: navbarHeight + 'px' }">
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
				<view class="u-nav-slot" slot="center" style="margin-left: 46px;">
					<view @click="OnPushSearch" :style="{ width: searchWidth }">
						<u-search placeholder="搜索感兴趣的精彩活动回放" v-model="searchField.search" :showAction="false"
							placeholderColor="#999999" height="34px"></u-search>
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<!-- 顶部 -->
		<scroll-view scroll-y="true" @scrolltolower="onReachScollBottom" :style="{ maxHeight: height }" @scroll="scroll"
			:scroll-top="scrollTop">
			<view class="content">
				<carousel :topStyle="{ marginTop: '28rpx' }" height="260rpx" urlkey="url" :dataType="2"
					systemCode="applets_marvellous" :indicatorType="4">
				</carousel>
				<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 20rpx;">
					<view style="width: 660rpx;">
						<u-tabs :list="categoryList" @click="tabClick" :current="categoryIndex"
							activeStyle="color:#222222;fontSize:32rpx;fontWeight: 500;"
							inactiveStyle="color:#222222;fontSize:32rpx;fontWeight: 500;" lineColor="#D91B1B"></u-tabs>
					</view>
					<image style="width: 34rpx;height: 34rpx;" src="@/static/image/gengduo.png" @click="openSearch" />
				</view>
				<view v-if="dataList.length == 0" style="text-align: center;">
					<view style="margin-top: 301rpx;">
						<image src="https://oss.dcqcjlb.com/51che_java_dev/20221130/60f0315baef34f75aed243e1c0323899.png"
							style="width: 263rpx;height: 218rpx;">
						</image>
					</view>
					<view style="font-size: 24rpx;color: #999999;margin-top: 80rpx;">
						暂无活动回放
					</view>
				</view>
				<view v-else style="margin-top: 36rpx;">
					<view v-for="(item, index) in dataList" :key="index" class="list-item" @click="OnPushDetail(item)">
						<view style="padding: 30rpx 24rpx 20rpx 26rpx;">
							<image style="width: 650rpx;height: 300rpx;" :src="item.img"></image>
							<view class="title ellipsis" style="margin-top: 20rpx;">{{ item.title }}</view>
							<view style="display: flex;justify-content: space-between;margin-top: 20rpx;">
								<view style="display: flex;align-items: center;">
									<image style="width: 50rpx;height: 50rpx;border-radius: 50%;" :src="item.headImg">
									</image>
									<text class="name ellipsis"
										style="margin-left: 25rpx;max-width: 260rpx;">{{ item.nickname }}</text>
								</view>
								<view style="display: flex;align-items: center;">
									<view class="price" style="margin-right: 25rpx;">
										<view>
											<text>￥</text>
											<text>{{ item.price }}</text>
										</view>
									</view>
									<view class="btn">精彩回放</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>
		<image v-if="isShowZhiding" class="zhiding" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059356929.png" @click="ClickZhiDing"></image>
		<view>
			<u-popup :show="searchVisble" @close="searchVisble = false" mode="top">
				<view :style="{ height: navbarHeight + 'px' }"></view>
				<view class="search">
					<text class="search-title" style="margin-bottom: 35rpx;">默认排序</text>
					<view class="search-btn-view">
						<view v-for="(item, index) in sortList" :key="index" class="search-btn" @click="searchSort(item.id)"
							:style="{ color: searchField.sortType === item.id ? '#D91B1B' : '#222222', background: searchField.sortType === item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="search-btn-text">{{ item.name }}</text>
						</view>
					</view>
					<text class="search-title" style="margin-top: 35rpx;margin-bottom: 35rpx;">活动分类</text>
					<view class="search-btn-view">
						<view v-for="(item, index) in categoryList" :key='index' class="search-btn"
							@click="searchCategory(item.id, index)"
							:style="{ color: searchField.categoryId === item.id ? '#D91B1B' : '#222222', background: searchField.categoryId === item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="search-btn-text">{{ item.name }}</text>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
export default {
	components: {
		carousel
	},
	computed: {
		// z状态栏高度适配
		navbarHeight() {
			return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
		},
		// 搜索框宽度适配
		searchWidth() {
			let menuWidth = uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuWidth : 0
			let menuRight = uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuRight : 0
			return `calc(100vw - ${menuWidth}px - ${menuRight}px - 46px - 26rpx)`
		},
		// scroll view 滚动高度适配
		height() {
			return `calc(100vh - ${this.navbarHeight}px)`
		},
	},
	data() {
		return {
			dataList: [],
			searchField: {
				sortType: 1,
				categoryId: '',
				search: '',
				current: 1,
				size: 10
			},
			isLoadMore: true,
			searchVisble: false,
			sortList: [{
				id: 1,
				name: '上架时间倒序'
			}, {
				id: 2,
				name: '价格从低到高'
			}, {
				id: 3,
				name: '价格从高到低'
			}],
			categoryList: [{
				id: '',
				name: '全部'
			}],
			categoryIndex: 0,
			isShowZhiding: false,
			scrollTop: 0,
			oldScrollTop: 0
		}
	},
	onLoad(option) {
		this.searchField.search = option.keyword
		this.getCategoryList()
		this.getList()
	},

	methods: {
		OnPushSearch() {
			uni.navigateTo({
				// 本地开发type=12表示精彩回顾
				url: "/pages/activity/search/index?type=12"
			});
		},
		OnPushDetail(item) {
			uni.navigateTo({
				url: '/pages/home/wonderfulReview/detail?id=' + item.id
			})
		},
		tabClick(item) {
			this.categoryIndex = item.index
			this.searchField.categoryId = item.id
			this.searchField.current = 1
			this.isLoadMore = true
			this.getList()
		},
		//打开搜索
		openSearch() {
			this.searchVisble = true
		},
		searchSort(id) {
			this.searchField.sortType = id
			this.searchField.current = 1
			this.isLoadMore = true
			this.getList()
		},
		searchCategory(id, index) {
			this.categoryIndex = index
			this.searchField.categoryId = id
			this.searchField.current = 1
			this.isLoadMore = true
			this.getList()
		},
		//获取活动分类
		getCategoryList() {
			this.$newrequest.get("/coc-system/api/v1/system/category/tag/list").then(res => {
				if (res.data.length > 0) {
					res.data.forEach(data => {
						this.categoryList.push({
							id: data.id,
							name: data.categoryName
						})
					})
				}
			})
		},
		//获取精彩回放列表
		getList() {
			if (this.isLoadMore) {
				this.isLoadMore = false
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/list", this.searchField).then(res => {
					if (this.searchField.current == 1) {
						this.dataList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
					}
					if (res.data.records.length >= this.searchField.size) {
						this.isLoadMore = true
					}
				})
			}
		},
		onReachScollBottom() {
			this.searchField.current += 1
			this.getList()
		},
		scroll(event) {
			this.oldScrollTop = event.detail.scrollTop;
			this.isShowZhiding = event.target.scrollTop > 300;
		},
		ClickZhiDing() {
			this.scrollTop = this.oldScrollTop
			// this.$nextTick(() => {
			// 	this.isShowZhiding = false
			// 	this.scrollTop = 0
			// });
			setTimeout(() => {
				this.isShowZhiding = false
				this.scrollTop = 0
			}, 50)

		}
	}
}
</script>

<style lang="scss" scoped>
.page {}

.search-top {
	width: 480rpx;
	margin-left: -100rpx;
	display: flex;
}

.content {
	padding: 25rpx 26rpx 0 25rpx;
}

.list-item {
	background: #FFFFFF;
	border-radius: 10px;
	margin-bottom: 20rpx;

	.title {
		font-size: 28rpx;
		font-weight: bold;
		color: #222222;
		width: 100%;
	}

	.name {
		font-size: 24rpx;
		font-weight: 500;
		color: #222222;
	}

	.btn {
		width: 120rpx;
		height: 40rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: #FFFFFF;
		text-align: center;
		line-height: 40rpx;
	}

	.price {
		font-size: 36rpx;
		font-weight: bold;
		color: #D91B1B;
	}
}

.search {
	padding: 42rpx 0 0 50rpx;
}

.search-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #222222;
	display: inline-block;
}

.search-btn-view {
	width: 100%;
	display: inline-block;
}

.search-btn {
	width: 200rpx;
	height: 60rpx;
	border-radius: 10rpx;
	float: left;
	margin-right: 16rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 24rpx;
}

.search-btn-text {
	font-size: 24rpx;
	font-weight: 500;
}

.zhiding {
	position: absolute;
	bottom: 286rpx;
	right: 24rpx;
	width: 72rpx;
	height: 72rpx;
}

.ellipsis {
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

::v-deep .u-navbar__content {
	justify-content: left !important;
}
</style>
