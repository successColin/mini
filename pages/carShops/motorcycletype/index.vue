<template>
	<view id="page" class="page">
		<view class="content">
			<view class="u-flex-al jsb" style="margin-top:25rpx;">
				<view class="u-flex">
					<view style="width: 630rpx;">
						<u-search placeholder="搜索车型" :clearabled="true" v-model="oldSearchTxt" :showAction="false"
							@search='search'></u-search>
					</view>
					<view style="position: relative;margin-left: 12rpx;height: 55rpx;">
						<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061953183.png" style="width: 55rpx;height: 55rpx;"></image>
						<button open-type='contact' session-from='' class="kefu-contact"></button>
					</view>
				</view>
			</view>
			<carousel :topStyle="{ marginTop: '25rpx' }" height="300rpx" urlkey="url" :dataType="2"
				systemCode="applets_vehicle_info_cx_list" :indicatorType="3" v-model="bannerList"></carousel>
			<view class="select" :class="{ 'sticky-box': !isSticky }" style="padding-bottom: 33rpx;">
				<view class="flex alc jsb" style="width:100%">
					<view class="u-flex-al" @click="openSearch(1)">
						<view class="text">{{ sortName }}</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al ml10" @click="openSearch(2)">
						<view class="text">
							{{ searchField.carPriceName ? searchField.carPriceName : '车价' }}
						</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al ml10" @click="openSearch(3)">
						<view class="text">
							{{ searchField.brandName ? searchField.brandName : '品牌' }}
						</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al ml10" @click="openSearch(4)">
						<view class="text">
							{{ searchField.energyTypeName ? searchField.energyTypeName : '能源类型' }}
						</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view>
				<view class="newCarItem flex alc" v-for="item in dataList" :key="item.vehicleInfoId"
					@click="jumpDetail(item.vehicleInfoId)">
					<view class="newCarL">
						<image :src="item.faceImage">
						</image>
					</view>
					<view class="newCarR">
						<view class="flex alc">
							<text class="newCarT ellipsis" style="max-width: 200rpx;">{{ item.vehicleName }}</text>
							<image src="@/static/image/down.png" class="carDown" mode="widthFix"></image>
							<text class="size24 newCarHui">优惠{{ item.discount }}</text>
						</view>
						<view class="newCarPrice">
							指导价：<text v-if="item.elevatingPriceMin">{{ item.elevatingPriceMin }}</text>
							<text v-if="item.elevatingPriceMax">-{{ item.elevatingPriceMax }}</text>
						</view>
						<view class="flex alc jsb">
							<view class="newCarShopName txtLighGray size24 ellipsis" style="max-width: 290rpx;">
								{{ item.baseName }}
							</view>
							<view class="goShop flex alc jsc">咨询</view>
						</view>
					</view>
					<view class="topTip">{{ item.askNum }}人咨询</view>
				</view>
			</view>
			<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
			<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
			<view v-if="dataList.length == 0 && isReachBottom" style="text-align: center;margin-top:200rpx;">
				<view>
					<image style="width: 350rpx;height: 280rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
					</image>
				</view>
				<view style="font-size: 24rpx;color: #999999;">
					暂无车型
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<u-popup :show="searchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
			mode="top">
			<view class="top-search">
				<view class="select" style="margin-top: 0;">
					<view class="u-flex-al jsb" style="width:100%;">
						<view class="u-flex-al" @click="openSearch(1)">
							<view class="text" :class="{ 'text-bold': searchType === 1 }">
								{{ sortName }}
							</view>
							<view class="ml10">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
						<view class="u-flex-al ml10" @click="openSearch(2)">
							<view class="text" :class="{ 'text-bold': searchType === 2 }">
								{{ searchField.carPriceName ? searchField.carPriceName : '车价' }}
							</view>
							<view class="ml10">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
						<view class="u-flex-al ml10" @click="openSearch(3)">
							<view class="text " :class="{ 'text-bold': searchType === 3 }">
								{{ searchField.brandName ? searchField.brandName : '品牌' }}
							</view>
							<view class="ml10">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
						<view class="u-flex-al ml10" @click="openSearch(4)">
							<view class="text" :class="{ 'text-bold': searchType === 4 }">
								{{ searchField.energyTypeName ? searchField.energyTypeName : '能源类型' }}
							</view>
							<view class="ml10">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
					</view>
				</view>
				<view
					:class="{ 'top-search-btn-view': searchType !== 1, '.top-search-btn-other-view': searchType === 1 }">
					<template v-if="searchType === 1">
						<view v-for="(item, index) in sortList" class="top-search-otherbtn" @click="searchItem(item)"
							:key="index" :style="{ color: searchField.sort == item.id ? '#D91B1B' : '#222222' }">
							<text>{{ item.name }}</text>
						</view>
					</template>
					<template v-if="searchType === 2">
						<view :key="-1" class="top-search-btn" @click="searchItem({ id: '', name: '全部' })"
							:style="{ color: searchField.carPriceId == '' ? '#D91B1B' : '#222222', background: searchField.carPriceId == '' ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">全部</text>
						</view>
						<view v-for="(item, index) in carPriceList" class="top-search-btn" @click="searchItem(item)"
							:key="index"
							:style="{ color: searchField.carPriceId == item.id ? '#D91B1B' : '#222222', background: searchField.carPriceId == item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
						</view>
					</template>
					<template v-if="searchType === 3">
						<view :key="-1" class="top-search-btn" @click="searchItem({ id: '', name: '全部' })"
							:style="{ color: searchField.brandId == '' ? '#D91B1B' : '#222222', background: searchField.brandId == '' ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">全部</text>
						</view>
						<view v-for="(item, index) in brandList" class="top-search-btn" @click="searchItem(item)"
							:key="index"
							:style="{ color: searchField.brandId == item.id ? '#D91B1B' : '#222222', background: searchField.brandId == item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
						</view>
					</template>
					<template v-if="searchType === 4">
						<view :key="-1" class="top-search-btn" @click="searchItem({ id: '', name: '全部' })"
							:style="{ color: searchField.energyTypeId == '' ? '#D91B1B' : '#222222', background: searchField.energyTypeId == '' ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">全部</text>
						</view>
						<view v-for="(item, index) in energyTypeList" class="top-search-btn" @click="searchItem(item)"
							:key="index"
							:style="{ color: searchField.energyTypeId == item.id ? '#D91B1B' : '#222222', background: searchField.energyTypeId == item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
						</view>
					</template>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			carousel
		},
		data() {
			return {
				searchVisble: false, //筛选弹框
				searchType: 1,
				oldSearchTxt: '',
				searchField: {
					current: 1,
					sort: 1, //1:默认排序  2:咨询量  3.上新 4.优惠幅度
					carPriceId: '', //车价
					carPriceName: '', //车价名称
					priceMax: "", //最大范围值
					priceMin: 0, //最小范围值
					brandId: '', //品牌
					brandName: '', //品牌名称
					energyTypeId: '', //能源类型
					energyTypeName: '', //能源类型名称
					vehicleName: '', //搜索车型名称
					size: 10
				},
				dataList: [],
				loadMore: false, //加载更多
				isReachBottom: false, //没有更多
				sortList: [{
					id: 1,
					name: '默认排序'
				}, {
					id: 2,
					name: '咨询量'
				}, {
					id: 3,
					name: '上新'
				}, {
					id: 4,
					name: '优惠幅度'
				}],
				carPriceList: [{
					id: 1,
					name: '10万以下',
					min: "",
					max: 100000
				}, {
					id: 2,
					name: '10-15万',
					min: 100000,
					max: 150000
				}, {
					id: 3,
					name: '15-20万',
					min: 150000,
					max: 200000
				}, {
					id: 4,
					name: '20-30万',
					min: 200000,
					max: 300000
				}, {
					id: 5,
					name: '30-40万',
					min: 300000,
					max: 400000
				}, {
					id: 6,
					name: '40-50万',
					min: 400000,
					max: 500000
				}, {
					id: 7,
					name: '50万以上',
					min: 500000,
					max: ""
				}],
				energyTypeList: [{
					id: 1,
					name: '燃油车'
				}, {
					id: 2,
					name: '新能源'
				}, {
					id: 3,
					name: '混合动力'
				}],
				brandList: [],
				scrollTop: 0,
				bannerList: [],
				pageHeight: 0, //内容可见高度
				pageTotalHeight: 0 //内容总高度
			}
		},
		onLoad(options) {
			let {
				type,
				searchId,
				searchName
			} = options
			if (type && searchId) {
				searchId = parseInt(searchId)
				if (type == 1) {
					this.searchField.sort = searchId
				} else if (type == 2) {
					this.searchField.carPriceId = searchId
					this.searchField.carPriceName = searchName
				} else if (type == 3) {
					this.searchField.brandId = searchId
					this.searchField.brandName = searchName
				} else if (type == 4) {
					this.searchField.energyTypeId = searchId
					this.searchField.energyTypeName = searchName
				}
			}
			if(options.brandId){
				this.searchField.brandId=options.brandId
				this.searchField.brandName=options.brandName
			}
			uni.getSystemInfo({
				success: res => {
					this.pageHeight = res.windowHeight;
				}
			});
			this.getBrandList()
			this.queryList()
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		},
		onReachBottom() {
			if (!this.isReachBottom && !this.loadMore) {
				this.searchField.current += 1
				this.queryList()
			}
		},
		computed: {
			//排序名称
			sortName() {
				return this.sortList.find(m => m.id === this.searchField.sort).name
			},
			isSticky() {
				return this.scrollTop < this.stickyTop
			},
			stickyTop() {
				return this.bannerList.length > 0 ? uni.upx2px(430) : uni.upx2px(105)
			}
		},
		methods: {
			//品牌列表
			getBrandList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/vehicleInfoBrand")
					.then(res => {
						if (res.code == 200) {
							this.brandList = res.data.map(m => {
								return {
									id: m.brandId,
									name: m.brandName
								}
							})
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			//打开筛选框
			openSearch(type) { //type 1:排序 2:车价 3:品牌 4:能源类型
				this.searchType = type
				this.searchVisble = true
				if (this.isSticky && this.pageTotalHeight >= this.stickyTop + this.pageHeight) {
					uni.pageScrollTo({
						scrollTop: this.stickyTop,
						duration: 0,
					})
				}
			},
			//关闭筛选框
			closeSearch() {
				this.searchType = 1
				this.searchVisble = false
			},
			//选中搜索项
			searchItem(item) {
				if (this.searchType == 1) { //排序
					this.searchField.sort = item.id
				} else if (this.searchType == 2) { //车价
					this.searchField.carPriceId = item.id
					this.searchField.carPriceName = item.id ? item.name : ''
					this.searchField.priceMin = item.id ? item.min : 0
					this.searchField.priceMax = item.id ? item.max : ''
				} else if (this.searchType == 3) { //品牌
					this.searchField.brandId = item.id
					this.searchField.brandName = item.id ? item.name : ''
				} else if (this.searchType == 4) { //能源类型
					this.searchField.energyTypeId = item.id
					this.searchField.energyTypeName = item.id ? item.name : ''
				}
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.searchVisble=false
				this.queryList()
			},
			//获取列表
			queryList() {
				// this.dataList = []
				this.loadMore = true
				let msg = Object.assign({}, this.searchField)
				msg.sortType = msg.sort
				if (msg.energyTypeId) {
					msg.energyType = msg.energyTypeId
				}
				delete msg['sort']
				delete msg['carPriceId']
				delete msg['carPriceName']
				delete msg['brandName']
				delete msg['energyTypeId']
				delete msg['energyTypeName']
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/carModelList", msg)
					.then(res => {
						if (res.code == 200) {
							if (msg.current === 1) {
								this.dataList = res.data.records
							} else {
								res.data.records.forEach(m => {
									this.dataList.push(m)
								})
							}
							if (res.data.records.length < msg.size) {
								this.isReachBottom = true
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(() => {
						this.loadMore = false
						let query = uni.createSelectorQuery().in(this);
						query.select('#page').boundingClientRect();
						query.exec(res => {
							this.pageTotalHeight = res[0].height
							let top = 0
							if (!this.isSticky && res[0].height >= this.stickyTop + this.pageHeight) {
								top = this.stickyTop
							}
							uni.pageScrollTo({
								scrollTop: top,
								duration: 0,
							})
						});
					})
			},
			//搜索
			search() {
				this.searchField.vehicleName = this.oldSearchTxt
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.queryList()
			},
			//跳转详情
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=1' + '&id=' + id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.content {
		padding: 0 25rpx;
	}

	.search {
		width: 630rpx;
		height: 80rpx;
		box-shadow: 0rpx 3rpx 5rpx 3rpx rgba(51, 51, 51, 0.06);
		border-radius: 40rpx;
		background: #FFFFFF;
		position: relative;

		.input {
			width: 520rpx;
			height: 80rpx;
			font-size: 28rpx;
			margin-left: 28rpx;
			font-family: PingFang SC;
			color: #999999;
		}

		.btn {
			height: 80rpx;
			position: absolute;
			bottom: 0;
			right: 31rpx;
		}
	}

	.select {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-top: 31rpx;

		.text {
			font-size: 28rpx;
			font-family: PingFang SC;
			// font-weight: 500;
		}

		.text-bold {
			font-weight: bold !important;
		}
	}

	.newCarItem {
		position: relative;
		padding: 0 20rpx 0 20rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		margin-bottom: 11rpx;

		.topTip {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.2);
			color: #fff;
			font-size: 24rpx;
			text-align: center;
			padding: 8rpx 18rpx 9rpx 19rpx;
			border-radius: 10rpx 0 10rpx 0;
		}

		.newCarL {
			height: 160rpx;

			image {
				width: 260rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}

		.newCarR {
			margin-left: 20rpx;
			width: 100%;
			padding: 30rpx 0 20rpx 0;

			.newCarT {
				font-size: 32rpx;
				font-weight: bold;
				font-family: PingFang SC;
			}

			.carDown {
				width: 38rpx;
				height: 41rpx;
				margin-left: 9rpx;
			}

			.newCarHui {
				color: #D91B1B;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
				margin-left: 5rpx;

			}

			.newCarPrice {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				margin-top: 20rpx;
				margin-bottom: 15rpx;
			}

			.newCarShopName {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
			}

			.goShop {
				width: 100rpx;
				height: 52rpx;
				background: #D91B1B;
				border-radius: 10rpx;
				color: #FFFFFF;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}
		}
	}

	.top-search {
		padding: 30rpx 25rpx 40rpx;
		box-sizing: border-box;

		.top-search-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
			display: inline-block;
		}

		.top-search-btn-view {
			margin-top: 43rpx;
			width: 100%;
			display: table;
		}

		.top-search-btn {
			width: 160rpx;
			height: 60rpx;
			border-radius: 10rpx;
			float: left;
			margin-right: 15rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-bottom: 24rpx;
		}

		.top-search-otherbtn {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			margin-top: 35rpx;
		}

		.top-search-btn-text {
			font-size: 24rpx;
			font-weight: 500;
		}

		.top-search-confirm {
			width: 150rpx;
			height: 60rpx;
			background: #D91B1B;
			border-radius: 30rpx;
			margin-top: 26rpx;
			margin-bottom: 50rpx;
			margin-left: 250rpx;
		}

		.top-search-confirm-text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
	}

	.reachBottom {
		text-align: center;
		font-size: 24rox;
		color: #999999;
		padding: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}

	.kefu-contact {
		position: absolute;
		width: 55rpx;
		height: 55rpx;
		top: 0;
		opacity: 0;
	}

	.u-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}

	.ellipsis {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.sticky-box {
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		background: #F8F8F8;
	}
</style>
