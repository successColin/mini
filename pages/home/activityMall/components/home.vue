<template>
	<view class="page">
		<view @touchmove.stop.prevent="moveHandle">
			<search class="page_top" fromType="海量游乐" :isIcon="true" :isBgf="true" @search="search"></search>
			<view class="tabs">
				<view class="tabs-list">
					<view class="tabs-item">
						<view class=" tabs-item-left">
							<view class="tabs-item-view" @click="getStatus(true)">
								<view :class="status ? 'tabs-item-title' : 'tabs-item-untitle'">精选团购</view>
								<image v-show="status"
									src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698392764793.png"
									class="tabs-item-image" />
							</view>
						</view>
					</view>
					<view class="tabs-item">
						<view class="tabs-item-right">
							<view class="tabs-item-view" @click="getStatus(false)">
								<view :class="!status ? 'tabs-item-title' : 'tabs-item-untitle'">热门玩乐</view>
								<image v-show="!status"
									src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698392764793.png"
									class="tabs-item-image" />
							</view>
						</view>
					</view>
				</view>
				<view>
					<view class="line"></view>
				</view>
				<view style="position: relative;z-index: 9999;">
					<view class="flex jsb" style="margin-top: 10rpx;align-items: flex-end;">
						<scroll-view class="tabs-bottom-list" scroll-x="true"
							style="border-radius: 0rpx 0rpx 20rpx 20rpx;">
							<view class="flex">
								<view v-for="(v, i) in categoryList" :key="i"
									:class="v.id===searchField.shopCategoryId ? 'tabs-bottom-item' : 'tabs-bottom-unitem'"
									@click="setTabList(v)">
									{{ v.name }}
								</view>
							</view>
						</scroll-view>
						<image @click="searchShow=true"
							src="https://oss.dcqcjlb.com/51che_java_dev/20231029/file_1698565896277.png"
							style="width: 40rpx;height: 40rpx;margin-right: 31rpx;"></image>
					</view>
					<view v-if="searchShow" class="category_div">
						<view style="margin-right: 31rpx;width: 100%;text-align: right;">
							<image style="width: 40rpx;height: 40rpx;margin-right: 16px;" @click="searchShow=false"
								src="https://oss.dcqcjlb.com/51che_java_dev/20231029/file_1698572185337.png">
							</image>
						</view>
						<view class="category_list">
							<view v-for="(item,index) in categoryList" class="item" @click="setTabList(item)"
								:class="{'item_sel':item.id===searchField.shopCategoryId}"
								:style="{'margin-right': (index+1)%4===0?'0rpx':'10rpx'}">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;border-radius: 0rpx 0rpx 20rpx 20rpx;background: #FFFFFF;"></view>
		</view>
		<view>
			<view v-if="searchShow" class="mask" @touchmove.stop.prevent="moveHandle" @click="searchShow=false"></view>
			<view v-for="(item,index) in dataList" :key="item.id" class="card-list" @click="OnPush(item)">
				<view class="flex" style="position: relative;">
					<view class="size24 txtLighGray" style="position: absolute;right: 0rpx;">
						{{item.distanceMsg}}
					</view>
					<view>
						<view class="size32 fwb title oneLine">{{item.baseName}}</view>
						<view class="flex alc" style="color: #D91B1B;">
							<image v-for="item in item.star"
								src="https://oss.dcqcjlb.com/51che_java_dev/20231031/file_1698717060730.png"
								style="width: 24rpx;height: 24rpx;margin-right: 5rpx;"></image>
							<text style="margin-left: 5rpx;font-size: 24rpx;font-weight: 400;">{{item.starStr}}</text>
						</view>
					</view>
				</view>
				<view class="flex mt20" style="margin-left: -7rpx;">
					<scroll-view scroll-x="true">
						<view style="display: flex;">
							<view v-for="(item1,index1) in item.imgsList" :key="index1" style="margin-right: 10rpx">
								<image :src="item1"
									style="margin-right: 7rpx;width: 223rpx;height: 160rpx;border-radius: 10rpx;">
								</image>
							</view>
						</view>
					</scroll-view>
				</view>
				<view v-if="item.baoType==1" class="flex size24 alc">
					<view class="bao-item">活动</view>
					<view class="mainRed fwb ml10">￥</view>
					<view class="mainRed fwb size32">{{item.flashSalePriceBao}}</view>
					<view class="oneLine ml10 size28" style="width: 480rpx;margin-left: 13rpx;">{{item.titleBao}}</view>
				</view>
				<view v-if="item.tuanType==1" class="flex size24 alc mt10">
					<view class="tuan-item">团购</view>
					<view class="mainRed fwb ml10">￥</view>
					<view class="mainRed fwb size32">{{item.flashSalePricetuan}}</view>
					<view class="oneLine ml10 size28" style="width: 480rpx;margin-left: 13rpx;">{{item.titletuan}}
					</view>
				</view>
				<view v-if="item.merchantType==1" class="flex size24 alc mt10">
					<view class="tuan-item">团购</view>
					<view class="mainRed fwb ml10">￥</view>
					<view class="mainRed fwb size32">{{item.flashSalePricemerchant}}</view>
					<view class="oneLine ml10 size28" style="width: 480rpx;margin-left: 13rpx;">{{item.titlemerchant}}
					</view>
				</view>
			</view>
			<view style="height: 50rpx;"></view>
		</view>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
import search from "@/components/search/index.vue"
	export default {
		components: {
			carousel,
			search
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},

		},
		data() {
			return {
				categoryList: [],
				dataList: [],
				status: true,
				searchField: {
					current: 1,
					sort: 2, //1:活动结束时间正序排序  2:距离最近  3.活动场次从多到少 4.参与人数从多到少
					shopCategoryId: '', //商家分类
					name: '', //搜索商家名称
					size: 10,
					property: 3
				},
				isLoadMore: false,
				searchShow: false
			}
		},
		mounted() {
			this.getCategoryList(2)
			this.getList()
		},

		props: {
			shopCategoryId: {
				type: Number,
				default () {
					return 0;
				},
			}
		},
		methods: {
			moveHandle: function() {
				return false
			},
			getStatus(value) {
				this.status = value;
				this.searchField.shopCategoryId = ""
				if (value) {
					this.searchField.property = 3
					this.getCategoryList(2)
				} else {
					this.searchField.property = 1
					this.getCategoryList(1)
				}
				this.OnPushSearch()
			},
			setTabList(v) {
				this.searchField.shopCategoryId = v.id
				this.OnPushSearch()
			},
			getmore() {
				if (!this.isLoadMore) {
					this.searchField.current++
					this.getList()
				}
			},
			OnPush(item) {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + item.id
				})
			},

			getList() {
				this.searchShow = false
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivityShopNew", this.searchField).then(res => {
					res.data.records.filter(s => {
						s.imglist = []
						s.imgs.filter(r => {
							r.associatedContent.split(',').filter(e => {
								s.imglist.push(e)
							})

						})
					})
					if (res.data.records.length < 10) {
						this.isLoadMore = true
					}
					if (res.data.current == 1) {
						this.dataList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
			//获取商家分类
			getCategoryList(shopType) {
				this.categoryList = []
				this.$newrequest.post("/coc-active/api/v1/activityShop/getNewShopCategoryList", {
					type: 3,
					shopType
				}).then(async res => {
					if (res.code == 200) {
						res.data.unshift({
							id: "",
							name: '推荐'
						})
						this.categoryList = res.data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			search(value) {
				this.searchField.name = value
				this.OnPushSearch()
			},
			OnPushSearch() {
				this.isLoadMore = false
				this.dataList = []
				this.searchField.current = 1
				this.getList()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.line {
		height: 1rpx;
		background: #F8F8F8;
		width: 730rpx;
	}

	.tabs {
		position: relative;
		width: 750rpx;
		background: #FFFFFF;

		&-list {
			display: flex;
			padding-bottom: 14rpx;
		}

		&-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 375rpx;

			&-title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
			}


			&-image {
				width: 24rpx;
				height: 6rpx;
				margin-top: 10rpx;
			}

			&-untitle {
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			&-left {
				display: flex;
				justify-content: flex-end;
				width: 285rpx;
				margin-right: 90rpx;
			}

			&-right {
				display: flex;
				margin-left: 90rpx;
			}

			&-view {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}

		}

		&-bottom {
			position: relative;
			display: flex;
			width: 730rpx;
			height: 46rpx;
			border-top: 1rpx solid #F8F8F8;
			margin-left: 10rpx;

			&-list {
				width: 652rpx;
				white-space: nowrap;
				margin-left: 16rpx;
			}

			&-item {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				height: 46rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			&-unitem {
				display: flex;
				align-items: flex-end;
				justify-content: center;
				height: 46rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				margin-left: 20rpx;
				margin-right: 20rpx;
			}

			&-search {
				position: absolute;
				top: 19rpx;
				right: 20rpx;
				width: 30rpx;
				height: 31rpx;
			}

			&-input {
				width: 657rpx;
				height: 50rpx;
				background: #F8F8F8;
				border-radius: 25rpx;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				padding-left: 20rpx;
			}

			&-goback {
				position: absolute;
				top: 17rpx;
				right: 22rpx;
				width: 26rpx;
				height: 29rpx;
			}
		}

		&-add {
			position: fixed;
			right: 10rpx;
			bottom: 400rpx;
			width: 88rpx;
			height: 88rpx;
			z-index: 200;
		}
	}

	.category_div {
		position: absolute;
		top: 0;
		background: #FFFFFF;
		width: 750rpx;

		.category_list {
			padding: 10rpx 20rpx 0rpx 20rpx;
			flex-wrap: wrap;
			display: flex;

			.item {
				width: 170rpx;
				height: 62rpx;
				line-height: 62rpx;
				text-align: center;
				background: #F8F8F8;
				border-radius: 10rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #222222;
				margin-bottom: 20rpx;
			}

			.item_sel {
				color: #D91B1B;
				background: #FFF1F1;
			}
		}
	}

	.card-list {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx;
		margin: 10rpx 10rpx 0 10rpx;
	}

	.title {
		width: 550rpx;
	}

	.tag-item {

		border-radius: 16rpx;
		background-color: #fceded;
		font-size: 20rpx;
		color: #D91B1B;
		padding: 6rpx 15rpx;
		text-align: center;
		margin-left: 8rpx;
	}

	.bao-item {
		color: #D91B1B;
		border-radius: 10rpx;
		font-size: 24rpx;
		width: 61rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		background: rgba(217, 27, 27, 0.1);
	}

	.tuan-item {
		color: #D91B1B;
		border-radius: 10rpx;
		font-size: 24rpx;
		width: 61rpx;
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		background: rgba(217, 27, 27, 0.1);
	}

	.quan-item {
		padding: 6rpx 15rpx;
		border-radius: 10rpx;
		size: 24rpx;
		font-weight: bold;
		line-height: 32rpx;
		background-color: #fceded;
		color: #D91B1B;
		border-radius: 16rpx;
	}

	.mask {
		background: black;
		opacity: 0.2;
		position: absolute;
		width: 100%;
		min-height: 100vh;
		z-index: 999;
	}
</style>
