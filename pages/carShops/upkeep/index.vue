<template>
	<view id="page" class="page">
		<view class="content">
			<view class="u-flex-al jsb" style="margin-top:25rpx;">
				<view class="u-flex">
					<view style="width: 630rpx;">
						<u-search placeholder="搜索保养套餐" :clearabled="true" v-model="oldMaintainName" :showAction="false"
							@search='search'></u-search>
					</view>
					<view style="position: relative;margin-left: 12rpx;height: 55rpx;">
						<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061953183.png" style="width: 55rpx;height: 55rpx;"></image>
						<button open-type='contact' session-from='' class="kefu-contact"></button>
					</view>
				</view>
			</view>
			<carousel :topStyle="{ marginTop: '25rpx' }" height="300rpx" urlkey="url" :dataType="2"
				systemCode="applets_maintain_meal_list" :indicatorType="3" v-model="bannerList"></carousel>
			<view class="select" :class="{ 'sticky-box': !isSticky }" style="padding-bottom: 28rpx;">
				<view class="u-flex-al" style="width: 100%;justify-content: space-around;">
					<view class="u-flex-al" @click="openSearch(1)">
						<view class="text ellipsis" style="max-width: 123rpx;">{{ sortName }}</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(3)">
						<view class="text ellipsis" style="max-width: 123rpx;">{{ brandName }}</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(2)">
						<view class="text ellipsis" style="max-width: 128rpx;">
							{{ searchField.priceName ? searchField.priceName : '价格' }}
						</view>
						<view style="margin-left: 11rpx;">
							<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="upkeepList flex">
				<view class="upkeepItem mb10" v-for="item in dataList" :key="item.maintainMealId"
					@click="jumpDetail(item.maintainMealId)">
					<view style="position: relative;height: 345rpx;">
						<image :src="item.coverImage" class="upkeepImg"></image>
						<view class="fanyong" v-if="isExpert==1&&token&&item.commissionPrice">
							<view class="u-flex">
								<view class="u-flex">
									<view class="rebate-img rebate-size"></view>
								</view>
								<view class="rebate-style" style="margin-right: 24rpx;">
									{{item.commissionPrice}}
								</view>
							</view>
						</view>
					</view>
					<view class="upkeepCont">
						<view class="ukH moreLine">{{ item.maintainName }}</view>
						<view class="flex priceLine">
							<u-icon name="rmb" color="#D91B1B" size="12"></u-icon>
							<view class="huiPrice">{{item.bankCardPrice?item.bankCardPrice:item.price }}</view>
							<view class="txtLighGray size24 ml10 fw500" style="text-decoration: line-through;">
								原价{{ item.marketPrice }}元</view>
						</view>
						<view class="flex alc jsb mt10">
							<view class="txtLighGray size24 fw500">{{ item.shopName }}</view>
							<view class="goShop fwb">购买</view>
						</view>
					</view>
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
					暂无保养套餐
				</view>
			</view>
			<view style="height: 30rpx;"></view>
		</view>
		<u-popup :show="searchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
			mode="top">
			<view class="top-search">
				<view class="select" style="margin-top: 0;">
					<view class="u-flex-al" style="width: 100%;justify-content: space-around;">
						<view class="u-flex-al" @click="openSearch(1)">
							<view class="text ellipsis" :class="{ 'text-bold': searchType === 1 }"
								style="max-width: 123rpx;">
								{{ sortName }}
							</view>
							<view style="margin-left: 11rpx;">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
						<view class="u-flex-al" @click="openSearch(3)">
							<view class="text ellipsis" :class="{ 'text-bold': searchType === 3 }"
								style="max-width: 123rpx;">
								{{ brandName }}
							</view>
							<view style="margin-left: 11rpx;">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>
						<view class="u-flex-al" @click="openSearch(2)">
							<view class="text ellipsis" :class="{ 'text-bold': searchType === 2 }"
								style="max-width: 128rpx;">
								{{ searchField.priceName ? searchField.priceName : '价格' }}
							</view>
							<view style="margin-left: 11rpx;">
								<u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
							</view>
						</view>

					</view>
				</view>
				<view
					:class="{ 'top-search-btn-view': searchType !== 1, '.top-search-btn-other-view': searchType === 1 }">
					<template v-if="searchType === 1">
						<view v-for="(item, index) in sortList" :key="index" class="top-search-otherbtn"
							@click="searchItem(item)"
							:style="{ color: searchField.sort == item.id ? '#D91B1B' : '#222222' }">
							<text>{{ item.name }}</text>
						</view>
					</template>
					<template v-if="searchType === 2">
						<view :key="-1" class="top-search-btn" @click="searchItem({ id: '', name: '全部' })"
							:style="{ color: searchField.priceId == '' ? '#D91B1B' : '#222222', background: searchField.priceId == '' ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">全部</text>
						</view>
						<view v-for="(item, index) in priceList" :key="index" class="top-search-btn"
							@click="searchItem(item)"
							:style="{ color: searchField.priceId == item.id ? '#D91B1B' : '#222222', background: searchField.priceId == item.id ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
						</view>
					</template>

					<template v-if="searchType === 3">
						<view @click="OnsearchNobrand()" :key="-1" class="top-search-btn" 
							:style="{ color: brandId == 0 ? '#D91B1B' : '#222222', background:  brandId == 0 ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">全部</text>
						</view>
						<view v-for="(item, index) in brandList" :key="index" class="top-search-btn"
						@click="searbrandItem(item)"
							:style="{ color: brandId  == item.brandId ? '#D91B1B' : '#222222', background: brandId == item.brandId ? '#FFF1F1' : '#F8F8F8' }">
							<text class="top-search-btn-text ellipsis">{{ item.brandName }}</text>
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
				brandId:0,
				brandList: [],
				brandName: '品牌',
				token: null,
				isExpert: null,
				searchVisble: false, //筛选弹框
				searchType: 1,
				oldMaintainName: '',
				searchField: {
					current: 1,
					sort: 1, //1:默认排序  2:销量  3.上新
					priceId: '', //价格
					priceName: '', //价格名称
					maintainName: '', //搜索名称
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
					name: '销量'
				}, {
					id: 3,
					name: '上新'
				}],
				priceList: [{
					id: 1,
					name: '500以下'
				}, {
					id: 2,
					name: '500-1千'
				}, {
					id: 3,
					name: '1千以上'
				}],
				scrollTop: 0,
				isDiscount:0,
				bannerList: [],
				pageHeight: 0, //内容可见高度
				pageTotalHeight: 0 //内容总高度
			}
		},
		onLoad(options) {
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			uni.getSystemInfo({
				success: res => {
					this.pageHeight = res.windowHeight;
				}
			});
			if(options.brandId){
				this.searchField.brandId=options.brandId
				this.brandId=options.brandId
				this.brandName=options.brandName
			}
			if(options.isDiscount){
				this.isDiscount=options.isDiscount
			}
			this.getbrandList()
			this.queryList()
		},
		onPageScroll(res) {
			this.scrollTop = res.scrollTop
		},
		onReachBottom() {
			if (!this.isReachBottom && !this.loadMore) {
				this.searchField.current += 1
				this.queryList()()
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
			OnsearchNobrand(){
				this.brandId=0
				this.searchField.brandId=null
			this.isReachBottom = false
			this.loadMore = false
			this.searchField.current = 1
			this.brandName='品牌'
				this.queryList()
			},
			searbrandItem(item){
				this.brandName=item.brandName
				this.brandId=item.brandId
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.queryList()
			},
			getbrandList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/maintenanceBrand").then(res => {
					this.brandList = res.data
				})
			},
			//打开筛选框
			openSearch(type) { //type 1:排序 2:价格 3:品牌
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
					this.searchField.priceId = item.id
					this.searchField.priceName = item.id ? item.name : ''
				}
				this.searchVisble=false
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.queryList()
			},
			//获取列表
			queryList() {
				// this.dataList = []
				this.loadMore = true
				let msg = Object.assign({}, this.searchField)
				if(this.brandId){
					msg.brandId=this.brandId
				}
				if (!msg.maintainName) {
					delete msg['maintainName']
				}
				if (msg.priceId) {
					msg.range = msg.priceId
				}
				delete msg['priceId']
				delete msg['priceName']
				msg.isDiscount=this.isDiscount
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/lowPriceMaintenances", msg)
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
				this.searchField.maintainName = this.oldMaintainName
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.queryList()
			},
			//跳转详情
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + id
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

	.upkeepList {
		flex-wrap: wrap;

		.upkeepItem {
			border-radius: 10rpx;
			background-color: #fff;
			width: 345rpx;
			margin-right: 10rpx;

			.upkeepImg {
				width: 345rpx;
				height: 345rpx;
				border-radius: 10rpx;
			}

			.upkeepCont {
				padding: 26rpx 14rpx 15rpx 14rpx;

				.ukH {
					font-size: 28rpx;
					font-weight: bold;
					font-family: PingFang SC;
					height: 80rpx;
				}

				.priceLine {
					align-items: baseline;

					.huiPrice {
						font-size: 44rpx;
						font-weight: bold;
						color: #D91B1B;
					}
				}
			}

			.goShop {
				width: 71rpx;
				height: 45rpx;
				background: #D91B1B;
				border-radius: 10rpx;
				text-align: center;
				line-height: 45rpx;
				font-size: 24rpx;
				color: #fff;
			}
		}

		.upkeepItem:nth-child(2n) {
			margin-right: 0;
		}
	}

	.top-search {
		padding: 31rpx 0 40rpx 28rpx;

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
			margin-right: 20rpx;
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

	.sticky-box {
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		flex-direction: row;
		margin: 0px;
		background: #F8F8F8;
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

	.fanyong {
		position: absolute;
		top: 0rpx;
	}

	.top-search-brandbtn {
		display: flex;
		flex-wrap: wrap;

	}
</style>
