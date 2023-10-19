<template>
	<view class="page">
		<view class="bgfff page_top">
			<view style="margin: 0rpx 20rpx 30rpx 20rpx;" class="u-flex">
				<view style="width: 640rpx">
					<u-search @custom="OnPushSearch" :show-action='false' :clearabled="true" v-model="keyword"
						@search="OnPushSearch" placeholder="搜索商家名称，如乐园">
					</u-search>
				</view>
				<view style="margin-left: 20rpx; margin-top: -20rpx; height: 64rpx">
					<view class="u-flex">
						<button open-type="contact" class="kefu-contact">
							<image src="/static/image/kefu.svg" style="width: 37rpx; height: 37rpx"></image>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view class="content">
			<carousel :topClass="['activity-img']" :topStyle="{ width: '700rpx', 'margin-left': '25rpx' }"
				height="260rpx" urlkey="url" :dataType="2" systemCode="applets_activity_shop" :indicatorType="4" />
			<uselist />

			<!-- 	<view class="category">
				<template v-for="(item, i) in categoryList">
					<view v-if="i < 9" class="view" :style="{ marginTop: i + 1 > 5 ? '28rpx' : '0' }"
						@click="jumpCategory(item)">
						<image class="img" :src="item.icon" style="width:48rpx;height: 48rpx;">
						</image>
						<view class="text ellipsis">{{ item.name }}</view>
					</view>

				</template>
			</view> -->
			<!-- 		<view class="select">
				<view class="u-flex-al" style="width: 710rpx;justify-content:space-between;">
					<view class="u-flex-al" @click="openSearch(1)">
						<view class="text">商家排序</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(1)"
						style="justify-content: flex-end;margin-left: 20rpx;">
						<view class="text ellipsis" style="max-width: 120rpx;">
							商家类型
						</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(1)"
						style="justify-content: flex-end;margin-left: 20rpx;">
						<view class="text ellipsis" style="max-width: 180rpx;">
							支付优惠
						</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
				</view>
			</view> -->

			<view style="height: 76rpx;"></view>
			<view class="mt20" style="display: flex;justify-content: space-around;border-radius: 10rpx;background-color: #ffffff;padding: 30rpx 0rpx; " v-if="shopCategoryId==0">
				<view class="tac" @click="Onpushpropertychange(1)">
					<view>
						<image style="width: 62rpx;height: 62rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230927/file_1695783057574.png"></image>
					</view>
					<view style="margin-top: 15rpx;" class="size24">户外商家</view>
				</view>
				<view class="tac" @click="Onpushpropertychange(2)">
					<view>
						<image style="width: 62rpx;height: 62rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230927/file_1695783542578.png"></image>
					</view>
					<view style="margin-top: 15rpx;" class="size24">户内商家</view>
				</view>
				<view class="tac" @click="Onpushpropertychange(3)">
					<view>
						<image style="width: 62rpx;height: 62rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230927/file_1695783574730.png"></image>
					</view>
					<view style="margin-top: 15rpx;" class="size24">团购商家</view>
				</view>
			</view>
			<view v-for="(item,index) in dataList" :key="item.id" class="card-list" @click="OnPush(item)">
				<view class="flex" style="position: relative;">
					<view class="size24 txtLighGray" style="position: absolute;right: 0rpx;">
						{{item.distanceMsg}}
					</view>
					<view>
						<u-avatar size="60" :src="item.baseHead" shape="square"></u-avatar>
					</view>
					<view class="ml20">
						<view class="size28 fwb">{{item.baseName}}</view>
						<view class="flex mt10 alc" style="color: #D91B1B;">
							<u-rate gutter='1' :readonly='true' active-color="#D91B1B" inactive-color="#D91B1B"
								count="5" v-model="item.star"></u-rate>{{item.starStr}}
						</view>
						<view class="flex mt10" style="margin-left: -8rpx;">
							<view v-if="item.baoType==1" class="tag-item">活动承办</view>
							<view v-if="item.tuanType==1||item.quanType==1" class="tag-item">团购优惠</view>
							<view v-if="item.baoType==1&&item.scoreType==1" class="tag-item">积分兑换</view>
							<view v-if="item.bankType==1" class="tag-item">信用卡满减</view>
						</view>
					</view>
				</view>
				<!-- <u-divider :text="null"></u-divider> -->
				<view class="flex mt20" style="margin-left: -7rpx;">
					<scroll-view  scroll-x="true" >
						<view style="display: flex;" >
							<view v-for="(item1,index1) in item.imgsList" :key="index1" style="margin-right: 7rpx">
								<image  :src="item1" style="margin-right: 7rpx;width: 212rpx;height: 159rpx;border-radius: 8rpx;">
								</image>
							</view>
						</view>																					
									</scroll-view>
				</view>
				<view v-if="item.baoType==1" class="flex size24 alc">
					<view class="bao-item">活动</view>
					<view class="mainRed fwb ml10">￥{{item.flashSalePriceBao}}</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPriceBao}}</view>
					<view class="oneLine ml10" style="width: 380rpx;">{{item.titleBao}}</view>
				</view>
				<view v-if="item.tuanType==1" class="flex size24 alc mt10">
					<view class="tuan-item">团购</view>
					<view class="mainRed fwb ml10">￥{{item.flashSalePricetuan}}</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPricetuan}}</view>
					<view class="oneLine ml10" style="width: 380rpx;">{{item.titletuan}}</view>
				</view>
				<view v-if="item.quanType==1" class="flex size24 alc mt10">
					<view class="quan-item">券</view>
					<view class="mainRed fwb ml10">￥{{item.flashSalePricequan}}</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPricequan}}</view>
					<view class="oneLine ml10" style="width: 380rpx;">{{item.titlequan}}</view>
				</view>
				<view v-if="item.merchantType==1" class="flex size24 alc mt10">
					<view class="quan-item">套餐</view>
					<view class="mainRed fwb ml10">￥{{item.flashSalePricemerchant}}</view>
					<view v-if="item.marketPricemerchant>0" class="txtLighGray txtls ml10">￥{{item.marketPricemerchant}}</view>
					<view class="oneLine ml10" style="width: 380rpx;">{{item.titlemerchant}}</view>
				</view>

				<view v-if="item.moreType==1" class="jsc mt20 flex">
					<view class="size24">更多优惠项目</view>
					<view>
						<u-icon size="14px" name="arrow-right"></u-icon>
					</view>
				</view>
			</view>



			<scroll-view v-if="showArrondi" scroll-x="true" scroll-left="0">
				<view class="prefecture u-flex-al">
					<view class="prefecture-item" @click="OnPushView(1)">
						<image class="prefecture-item-img"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972649577.png"></image>
					</view>
					<view class="prefecture-item" @click="OnPushView(2)">
						<image class="prefecture-item-img"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972548951.png"></image>
					</view>
					<view class="prefecture-item" @click="OnPushView(3)">
						<image class="prefecture-item-img"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972732934.png"></image>
					</view>
				</view>
			</scroll-view>



		</view>
		<u-popup :show="otherSearchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
			mode="top">
			<!-- <view :style="{ height: navbarHeight + 'px' }"></view> -->
			<view class="top-search">
				<text class="top-search-title" style="margin-bottom: 35rpx;">商家排序</text>
				<view class="top-search-btn-view">
					<view v-for="(item, index) in sortList" :key="index" class="top-search-btn"
						@click="search(item, 1,index)"
						:style="{ color: sortindex == index ? '#D91B1B' : '#222222', background: sortindex==index ? '#FFF1F1' : '#F8F8F8' }">
						<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
					</view>
				</view>
			</view>
			<view class="top-search">
				<text class="top-search-title" style="margin-bottom: 35rpx;">商家类型</text>
				<view class="top-search-btn-view">
					<view v-for="(item, index) in sponsorList" :key="index" class="top-search-btn"
						@click="search(item, 2,index)"
						:style="{ color: shopTypeindex == index ? '#D91B1B' : '#222222', background:  shopTypeindex == index? '#FFF1F1' : '#F8F8F8' }">
						<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
					</view>
				</view>
				<text class="top-search-title" style="margin-top: 35rpx;margin-bottom: 35rpx;">支付优惠</text>
				<view class="top-search-btn-view">
					<view v-for="(item, index) in paymentDiscountList" :key='index' class="top-search-btn"
						@click="search(item, 3,index)"
						:style="{ color: payTypeindex==index ? '#D91B1B' : '#222222', background: payTypeindex==index ? '#FFF1F1' : '#F8F8F8' }">
						<text class="top-search-btn-text ellipsis">{{ item.name }}</text>
					</view>
				</view>
				<view class="u-flex top-search-confirm" @click="confirmSearch(1)">
					<view class="top-search-confirm-text">完成</view>
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
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},

		},
		data() {
			return {
				keyword: '',
				categoryList: [],
				otherSearchVisble: false, //主办方，支付优惠弹框
				searchVisble: false, //商家分类弹框
				sortList: [{
					id: 1,
					name: '默认'
				}, {
					id: 2,
					name: '距离'
				}, {
					id: 3,
					name: '评分'
				}],
				sponsorList: [{
					id: null,
					name: '全部'
				}, {
					id: 1,
					name: '活动'
				}, {
					id: 2,
					name: '团购'
				}], //主办方列表
				paymentDiscountList: [], //支付优惠列表
				oldSearchField: {
					shopTypeId: '', //主办方
					shopTypeName: '', //主办方名称
					activityPaymentPreferenceId: '', //支付优惠
					activityPaymentPreferenceName: '', //支付优惠名称
					shopCategoryId: '', //商家分类
					shopCategoryName: '', //商家分类名称
				},
				searchField: {
					current: 1,
					sort: 1, //1:活动结束时间正序排序  2:距离最近  3.活动场次从多到少 4.参与人数从多到少
					shopTypeId: '', //主办方
					shopTypeName: '', //主办方名称
					activityPaymentPreferenceId: '', //支付优惠
					activityPaymentPreferenceName: '', //支付优惠名称
					shopCategoryId: '', //商家分类
					shopCategoryName: '', //商家分类名称
					lng: '', //经度
					lat: '', //纬度
					shopName: '', //搜索商家名称
					size: 100
				},
				topDataList: [],
				dataList: [],
				showArrondi: false,
				payType: null,
				shopType: null,
				sort: 1,
				payTypepop: null,
				shopTypepop: null,
				sortpop: 1,
				current: 1,
				isLoadMore: false,
				sortindex: 0,
				shopTypeindex: 0,
				payTypeindex: 0,
				shopCategoryId: null,
			}
		},
		mounted() {
			// this.getCategoryList()
			this.getPaymentPreferenceList()
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
			Onpushpropertychange(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/activityMall/list?shopCategoryId=27'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/activityMall/list?shopCategoryId=26'
					})
				} else {
					uni.navigateTo({
						url: '/pages/activityMall/list?shopCategoryId=28'
					})
				}
			},
			getmore() {
				if (!this.isLoadMore) {
					this.current++
					this.getList()
				}
			},
			OnPush(item) {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + item.id
				})
			},
			nextList() {
				if (!this.isLoadMore) {
					this.current++
					this.getList()
				}
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivityShopNew", {
					current: this.current,
					payType: this.payType,
					shopType: this.shopType,
					size: 10,
					sort: this.sort,
					shopCategoryId: this.shopCategoryId,
					name: this.keyword,
					shopCategoryId:this.shopCategoryId
				}).then(res => {
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
			//获取支付优惠列表
			getPaymentPreferenceList() {
				let list = [{
					id: null,
					name: '全部'
				}]
				this.$newrequest.post("/coc-active/api/v1/activityShop/list").then(async res => {
					if (res.code == 200) {
						list = list.concat(res.data)
						this.paymentDiscountList = list
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			//获取商家分类
			getCategoryList() {
				this.$newrequest.post("/coc-active/api/v1/activityShop/categoryList", {
					current: 1,
					size: 100
				}).then(async res => {
					if (res.code == 200) {
						// let list = []
						// if (res.data.records.length > 0) {
						// 	for (let i = 0; i < res.data.records.length; i++) {
						// 		let data = res.data.records[i]
						// 		let imginfo = await this.getImgInfo(data.icon)
						// 		data.width = imginfo ? imginfo.width : ''
						// 		data.height = imginfo ? imginfo.height : ''
						// 		list.push(data)
						// 	}
						// }
						this.categoryList = res.data.records && res.data.records.length > 0 ? res.data
							.records : []
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			OnPushView(index) {
				if (index == 1) {
					uni.navigateTo({
						url: '/pages/activity/activityRegistration/bankactivity?shopTypeId=1&activityPaymentPreferenceId=6'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/activity/activityRegistration/bankactivity?shopTypeId=2&activityPaymentPreferenceId=5'
					})
				} else if (index == 3) {
					uni.navigateTo({
						url: '/pages/activity/activityRegistration/bankactivity?shopTypeId=3&activityPaymentPreferenceId=4'
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '/pages/activity/activityRegistration/foursactivity?'
					})
				}
			},

			OnPushSearch() {
				this.isLoadMore = false
				this.current = 1
				this.getList()
			},

			//获取首页商家列表(筛选)
			getHomeBusinessList(size) {
				let msg = this.changeSearchField()
				if (size) {
					msg.size = size
				}
				this.$newrequest.post("/coc-active/api/v1/activityShop/signUpIn/list", msg).then(
					async res => {
						if (res.code == 200) {
							let list = res.data
							list.forEach(function(data) {
								data.baseHead = data.baseHead ? data.baseHead :
									'https://oss.dcqcjlb.com/51che_java_dev/20221031/96f3cd701da641ddb4c43e4349054230.jpg'
							})
							this.topDataList = list
							this.closeSearch()
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},

			changeSearchField() {
				let msg = Object.assign({}, this.searchField)
				if (!msg.activityPaymentPreferenceId) {
					delete msg['activityPaymentPreferenceId']
				}
				if (!msg.shopCategoryId) {
					delete msg['shopCategoryId']
				}
				if (!msg.shopTypeId) {
					delete msg['shopTypeId']
				}
				if (!msg.shopName) {
					delete msg['shopName']
				}
				if (!msg.lng) {
					delete msg['lng']
				}
				if (!msg.lat) {
					delete msg['lat']
				}
				delete msg['activityPaymentPreferenceName']
				delete msg['shopCategoryName']
				delete msg['shopTypeName']
				return msg
			},

			//打开筛选框
			openSearch(type) { //type 1:主办方，支付优惠  2:商家分类
				if (type == 1) {
					this.oldSearchField.activityPaymentPreferenceId = this.searchField.activityPaymentPreferenceId
					this.oldSearchField.activityPaymentPreferenceName = this.searchField.activityPaymentPreferenceName
					this.oldSearchField.shopTypeId = this.searchField.shopTypeId
					this.oldSearchField.shopTypeName = this.searchField.shopTypeName
					this.otherSearchVisble = true
				} else if (type == 2) {
					this.oldSearchField.shopCategoryId = this.searchField.shopCategoryId
					this.oldSearchField.shopCategoryName = this.searchField.shopCategoryName
					this.searchVisble = true
				}
			},
			//关闭筛选框
			closeSearch() {
				this.oldSearchField.activityPaymentPreferenceId = ''
				this.oldSearchField.activityPaymentPreferenceName = ''
				this.oldSearchField.shopTypeId = ''
				this.oldSearchField.shopTypeName = ''
				this.oldSearchField.shopCategoryId = ''
				this.oldSearchField.shopCategoryName = ''
				this.searchVisble = false
				this.otherSearchVisble = false
			},
			//选中搜索项
			search(item, type, index) {
				if (type == 1) { //商家排序
					this.sortpop = item.id
					this.sortindex = index
				} else if (type == 2) { //商家类型
					this.shopTypepop = item.id
					this.shopTypeindex = index
				} else if (type == 3) { //支付优惠
					this.payTypepop = item.id
					this.payTypeindex = index
				}
			},
			//确认搜索
			confirmSearch(type) {
				this.sort = this.sortpop
				this.shopType = this.shopTypepop
				this.payType = this.payTypepop
				this.current = 1
				this.getList()
				this.otherSearchVisble = false
			},
			//跳转分类
			jumpCategory(item) {
				uni.navigateTo({
					url: `/pages/activityMall/list?type=2&shopCategoryId=${item.id}&shopCategoryName=${item.name}`
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.u-flex {
		display: flex;
		align-items: center;
	}

	.content {
		padding: 25rpx;
		overflow: auto;
	}

	.search {
		width: 700rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background: #FFFFFF;
		position: relative;

		.input {
			width: 520rpx;
			height: 70rpx;
			margin-left: 36rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			// font-weight: 500;
		}

		.btn {
			width: 124rpx;
			height: 70rpx;
			background: #D91B1B;
			border-radius: 35rpx;
			position: absolute;
			bottom: 0;
			right: 0;
		}
	}

	.category {
		padding: 28rpx 0 28rpx 0;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-top: 31rpx;
		display: table;
		width: 100%;

		.view {
			height: 90rpx;
			width: 140rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			float: left;
		}

		.img {
			max-width: 46rpx;
			max-height: 46rpx;
		}

		.text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			max-width: 140rpx;
		}
	}

	.select {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 31rpx;

		.text {
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}
	}

	.top-search {
		padding: 42rpx 0 0 50rpx;

		.top-search-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
			display: inline-block;
		}

		.top-search-btn-view {
			width: 100%;
			display: table;
		}

		.top-search-btn {
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

	.prefecture {
		.prefecture-item {
			margin-right: 20rpx;
		}

		.prefecture-item-img {
			width: 220rpx;
			height: 180rpx;
		}
	}

	.kefu-contact {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
	}

	button::after {
		border: initial;
	}

	.ellipsis {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
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

	::v-deep .input-placeholder {
		font-size: 28rpx;
		font-family: PingFang SC;
		// font-weight: 500;
		color: #999999;
	}

	.card-list {
		margin-top: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 25rpx;
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
		padding: 6rpx 15rpx;
		background-color: #fceded;
		color: #D91B1B;
		border-radius: 16rpx;
		size: 24rpx;
		font-weight: bold;
		line-height: 32rpx;
	}

	.tuan-item {
		padding: 6rpx 15rpx;
		background-color: #fceded;
		color: #D91B1B;
		border-radius: 16rpx;

		size: 24rpx;


		font-weight: bold;

		line-height: 32rpx;

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

	.page_top {
		// border-bottom-left-radius: 20rpx;
		// border-bottom-right-radius: 20rpx;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
</style>