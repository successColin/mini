<template>
	<view class="page">
		<view class="content">
			<view style="margin:0rpx 20rpx 28rpx 20rpx;margin-bottom: -10rpx;" class="u-flex">
				<view style="width: 640rpx;">

					<u-search placeholder="搜索商家名称,如乐园" :clearabled="true" v-model="keyword" :showAction="false"
						@search='tosearch()'></u-search>
				</view>
				<view style="margin-left: 20rpx;margin-top: -4rpx">
					<view class="u-flex">
						<button open-type='contact' class="kefu-contact">
							<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
						</button>
					</view>
				</view>
			</view>
			<carousel :topStyle="{ marginTop: '28rpx' }" height="260rpx" urlkey="url" :dataType="2"
				systemCode="applets_activity_shop" :indicatorType="4">
			</carousel>

			<view class="u-flex mt20 mb20 icon-item" style="justify-content: space-between;">
				<view>
					<view v-if="outdoors==0" class="tac" @click="OnClickOutDoors(1)">
						<view>
							<image   class="type-img"
								src="@/static/image/huwaihuodongweixuanzhong.svg">
							</image>
						</view>					
						<view class="size28 fwb ">
							户外商家
						</view>
						<view class="size20 mt10 txtLighGray">
							走！趣野!
						</view>
					</view>				
					<view v-else-if='outdoors==1' class="tac mainRed"  @click="OnClickOutDoors(0)">
						<view>
							<image  class="type-img"
								src="@/static/image/huwaihuodongxuanzhong.svg">
							</image>
						</view>			
						<view class="size28 fwb ">
							户外商家
						</view>
						<view  class="size20 mt10 mainRed">
							走！趣野!
						</view>
					</view>
					
				</view>					
				<view>
					<view v-if="indoor==0" class="tac" @click="OnClickInDoors(1)">
						<view>
							<image   class="type-img"
								src="@/static/image/shineihuodongweixuanzhong.svg">
							</image>
						</view>					
						<view class="size28 fwb">
							室内商家
						</view>
						<view class="size20 mt10 txtLighGray">
							潮玩无极限！
						</view>
					</view>				
					<view v-else-if='indoor==1' class="tac mainRed"  @click="OnClickInDoors(0)">
						<view>
							<image  class="type-img"
								src="@/static/image/shineihuodongxuanzhong.svg">
							</image>
						</view>			
						<view class="size28 fwb mt10">
							室内商家
						</view>
						<view  class="size20 mt10 mainRed">
							潮玩无极限！
						</view>
					</view>					
				</view>
				<view>
					<view v-if="groupstore==0" class="tac" @click="OnClickIngroup(1)">
						<view>
							<image   class="type-img"
								src="@/static/image/tuangouhuodongweixuanzhong.svg">
							</image>
						</view>					
						<view class="size28 fwb mt10">
							团购商家
						</view>
						<view class="size20 mt10 txtLighGray">
						限时享钜惠！
						</view>
					</view>				
					<view v-else-if='groupstore==1' class="tac mainRed"  @click="OnClickIngroup(0)" >
						<view>
							<image  class="type-img"
								src="@/static/image/tuangouhuodongxuanzhong.svg">
							</image>
						</view>			
						<view class="size28 fwb mt10">
							团购商家
						</view>
						<view  class="size20 mt10 mainRed">
						限时享钜惠！
						</view>
					</view>					
				</view>
				
			</view>
	<!-- 		<view class="select">
				<view class="u-flex-al" style="width: 710rpx;justify-content:space-between;align-items: ;">
					<view class="u-flex-al" @click="openSearch(1)">
						<view class="text">{{sortbtn}}</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(2)"
						style="justify-content: flex-end;margin-left: 20rpx;">
						<view class="text ellipsis" style="max-width: 120rpx;">
							{{classbtn}}
						</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(3)"
						style="justify-content: flex-end;margin-left: 20rpx;">
						<view class="text ellipsis" style="max-width: 120rpx;">
							{{typebtn}}
						</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
					<view class="u-flex-al" @click="openSearch(4)"
						style="justify-content: flex-end;margin-left: 20rpx;">
						<view class="text ellipsis" style="max-width: 180rpx;">
							{{paybtn}}
						</view>
						<view style="margin-left: 15rpx;">
							<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
						</view>
					</view>
				</view>
			</view> -->
			<view v-for="(item,index) in dataList" :key="item.id" class="card-list" @click="OnPush(item)">
				<view class="flex alc">
					<view>
						<!-- <u-avatar size="100" :src="item.baseHead" shape="square"></u-avatar> -->
						<view>
							<image style="width: 200rpx;height: 200rpx;border-radius: 10rpx;" :src="item.baseHead"></image>
						</view>
					</view>

					<view class="ml20">
						<view class="size32 fwb">{{item.baseName}}</view>
						<view v-if="item.shopFeature" class="size24 txtLighGray mt10">{{item.shopFeature}}</view>
						<view class="flex mt10 jsb alc" style="width: 450rpx;">
							<view>
								<u-rate gutter='0' :readonly='true' active-color="#FCCA00" count="5"
									v-model="item.star"></u-rate>
							</view>
							<view>
								<view class="size24 txtLighGray" style="margin-right: 25rpx;">
									{{item.distanceMsg}}
								</view>
							</view>
						</view>
						<view v-if="item.baoType==0&&item.tuanType==0&&item.quanType==0" class="flex size24"
							style="margin-top: 10rpx;">
						<!-- 	<view>
								<image class="business-cc-img" src="@/static/image/huodong.png"></image>
								<text class="business-cc business-text">举办活动:{{ item.activityAttendNum }}</text>
							</view>
							<view class="ml20">

								<image class="business-rs-img" src="@/static/image/renshu.png"></image>
								<text class="business-rs business-text">参与人数:{{ item.peopleNum }}</text>
							</view> -->

						</view>
						<view v-else class="flex mt10" style="margin-left: -8rpx;">
							<view v-if="item.baoType==1" class="tag-item">活动承办</view>
							<view v-if="item.tuanType==1||item.quanType==1" class="tag-item">团购优惠</view>
							<view v-if="item.baoType==1&&item.scoreType==1" class="tag-item">积分兑换</view>
							<view v-if="item.bankType==1" class="tag-item">信用卡满减</view>
						</view>
					</view>
				</view>
				<view style="height: 20rpx;"></view>
				<view v-if="item.baoType==1" class="flex size24 alc mb10">
					<view class="bao-item">报</view>
					<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePriceBao }}</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPriceBao}}</view>
					<view class="oneLine ml10">{{item.titleBao}}</view>
				</view>
				<view v-if="item.tuanType==1" class="flex size24 alc mb10">
					<view class="tuan-item">团</view>
					<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePricetuan}}
					</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPricetuan}}</view>
					<view class="oneLine ml10">{{item.titletuan}}</view>
				</view>
				<view v-if="item.quanType==1" class="flex size24 alc mb10">
					<view class="quan-item">券</view>
					<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePricequan}}
					</view>
					<view class="txtLighGray txtls ml10">￥{{item.marketPricequan}}</view>
					<view class="oneLine ml10">{{item.titlequan}}</view>
				</view>
				<view v-if="item.baoType==0&&item.tuanType==0&&item.quanType==0&&item.associatedContentText"
					class="txtLighGray size24 oneLine">
					商家简介:{{item.associatedContentText}}
				</view>
				<view class="flex mt20" style="margin-left: -7rpx;">
					<view v-for="(item1,index1) in item.imglist" :key="index1" style="margin-left: 7rpx;">
						<image v-if="index1<3" :src="item1" style="width: 212rpx;height: 159rpx;border-radius: 10rpx;">
						</image>
					</view>
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
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972649577.png">
						</image>
					</view>
					<view class="prefecture-item" @click="OnPushView(2)">
						<image class="prefecture-item-img"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972548951.png">
						</image>
					</view>
					<view class="prefecture-item" @click="OnPushView(3)">
						<image class="prefecture-item-img"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972732934.png">
						</image>
					</view>
				</view>
			</scroll-view>



		</view>
		<u-popup :show="otherSearchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false"
			mode="top">
			<view class="select" style="margin: 35rpx 35rpx 0rpx 35rpx;">
				<view class="u-flex-al" @click="Onchangeindex(1)">
					<view class="text ellipsis" :class="{'mainRed':index==1}">{{sortbtn}}</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==1" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" size="16rpx" color="#666666"></u-icon>
					</view>
				</view>
				<view class="u-flex-al" style="justify-content: flex-end;margin-left: 20rpx;" @click="Onchangeindex(2)">
					<view class="text ellipsis" :class="{'mainRed':index==2}">
						{{classbtn}}
					</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==2" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
					</view>
				</view>
				<view class="u-flex-al" @click="Onchangeindex(3)">
					<view class="text ellipsis" :class="{'mainRed':index==3}">{{typebtn}}</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==3" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" size="16rpx" color="#666666"></u-icon>
					</view>
				</view>
				<view class="u-flex-al" @click="Onchangeindex(4)">
					<view class="text ellipsis" :class="{'mainRed':index==4}">{{paybtn}}</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==4" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" size="16rpx" color="#666666"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="index==1" style="margin: 25rpx;flex-wrap: wrap;">
				<view v-for="(item,index) in sortList" :key="item.id"
					style="width: 150rpx; text-align: center;margin-bottom: 20rpx;"
					:class="{'currentcolor':item.id==sortindex}" @click="Onsort(item)">
					{{item.name}}
				</view>
			</view>
			<view v-if="index==2" class="flex" style="margin:25rpx ;flex-wrap: wrap;">
				<view v-for="(item,index) in categoryList" :key="item.id" class="left-stype"
					:class="{'currenttag':item.id==businessTypeindex}" @click="Onclass(item)">
					{{item.name}}
				</view>
			</view>
			<view v-if="index==4" class="flex" style="margin: 25rpx ;flex-wrap: wrap;">
				<view v-for="(item,index) in paymentDiscountList" :key="item.id" class="left-stype"
					style="padding: 8rpx 30rpx;" :class="{'currenttag':item.id==payTypeindex}" @click="Onpay(item)">
					{{item.name}}
				</view>
			</view>
			<view v-if="index==3" class="flex" style="margin:25rpx ;flex-wrap: wrap;">
				<view v-for="(item,index) in sponsorList" :key="item.id" class="left-stype"
					:class="{'currenttag':item.id==shopTypeindex}" @click="Ontype(item)">
					{{item.name}}
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
				paybtn: '支付优惠',
				typebtn: '商家类型',
				classbtn: '商家分类',
				sortbtn: '商家排序',
				property: 0,
				indoor: 0,
				groupstore: 0,
				outdoors: 0,
				categoryList: [],
				otherSearchVisble: false, //主办方，支付优惠弹框
				index: null,
				sortList: [{
						id: 1,
						name: '默认'
					}, {
						id: 2,
						name: '离我最近'
					},
					// {
					// 	id: 3,
					// 	name: '评分'
					// },
				],
				sponsorList: [{
					id: 0,
					name: '全部'
				}, {
					id: 1,
					name: '活动商家'
				}, {
					id: 2,
					name: '团购商家'
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
				payType: 0,
				shopType: 0,
				sort: 1,
				payTypepop: null,
				shopTypepop: null,
				businessTypeindex: 0,
				sortpop: 1,
				current: 1,
				isLoadMore: false,
				sortindex: 1,
				shopTypeindex: 0,
				payTypeindex: 0,
				shopCategoryId: 0,
				keyword: '',
				visitinto: null
			}
		},

		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onHide() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onUnload() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onLoad(option) {
			if (option.lat) {
				uni.setStorageSync('lat', option.lat)
			}
			if (option.lng) {
				uni.setStorageSync('lng', option.lng)
			}
			this.getCategoryList()
			this.getPaymentPreferenceList()
			this.getList()
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 4
				}).then(res => {
					this.visitinto = res
				})
			}
			// #ifdef H5
			uni.hideTabBar({});
			// #endif
		},
		methods: {
			Ontype(item) {
                console.log('商家类型',item)
				this.current = 1
				this.shopTypeindex = item.id
				this.shopType = item.id
				this.getList()
				if (item.id == 0) {
					this.typebtn = '商家类型'
				} else {
					this.typebtn = item.name
				}
					this.otherSearchVisble=false
			},
			Onpay(item) {
				this.current = 1
				this.payTypeindex = item.id
				this.payType = item.id
				this.getList()
				if (item.id == 0) {
					this.paybtn = '商家优惠'
				} else {
					this.paybtn = item.name
				}
					this.otherSearchVisble=false
			},
			Onclass(item) {
				this.current = 1
				this.businessTypeindex = item.id
				this.shopCategoryId = item.id
				this.getList()
				if (item.id == 0) {
					this.classbtn = '商家分类'
				} else {
					this.classbtn = item.name
				}
				this.otherSearchVisble=false
			},
			Onsort(item) {
				this.current = 1
				this.sortindex = item.id
				this.sort = item.id
				this.getList()
				if (item.id == 1) {
					this.sortbtn = '商家排序'
				} else {
					this.sortbtn = item.name
				}
                this.otherSearchVisble=false
			},
			Onchangeindex(index) {
				this.index = index
			},
			OnClickIngroup(index) {
				if (index == 0) {
					this.outdoors = 0
					this.indoor = 0
					this.groupstore = 0
					this.property = 0
				} else {
					this.outdoors = 0
					this.indoor = 0
					this.groupstore = index
					this.property = 3
				}
				this.classbtn = '商家分类'
				this.businessTypeindex = 0
				this.shopCategoryId = 0
				this.current = 1
				this.getCategoryList()
				this.getList()
			},
			OnClickInDoors(index) {
				if (index == 0) {
					this.outdoors = 0
					this.indoor = 0
					this.property = 0
					this.groupstore = 0
				} else {
					this.groupstore = 0
					this.outdoors = 0
					this.indoor = index
					this.property = 2
				}
				this.classbtn = '商家分类'
				this.businessTypeindex = 0
				this.shopCategoryId = 0
				this.current = 1
				this.getCategoryList()
				this.getList()
			},
			OnClickOutDoors(index) {
				if (index == 0) {
					this.groupstore = 0
					this.outdoors = 0
					this.indoor = 0
					this.property = 0
				} else {
					this.groupstore = 0
					this.outdoors = index
					this.indoor = 0
					this.property = 1
				}
				this.classbtn = '商家分类'
				this.businessTypeindex = 0
				this.shopCategoryId = 0
				this.current = 1
				this.getCategoryList()
				this.getList()
			},
			OnPush(item) {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + item.id + '&shopType=' + this.shopType
				})
			},
			nextList() {
				if (!this.isLoadMore) {
					this.current++
					this.getList()
				}
			},
			tosearch() {
				this.isLoadMore=false
				this.current = 1
				this.getList()
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivityShopNew", {
					property: this.property,
					current: this.current,
					payType: this.payType,
					shopType: this.shopType,
					size: 10,
					sort: this.sort,
					shopCategoryId: this.shopCategoryId,
					name: this.keyword
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
					id: 0,
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
					property: this.property,
					current: 1,
					size: 100
				}).then(async res => {
					if (res.code == 200) {

						this.categoryList = res.data.records && res.data.records.length > 0 ? res.data
							.records : [],
							this.categoryList.unshift({
								id: 0,
								name: '全部'
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
			openSearch(index) {
				this.index = index
				this.oldSearchField.activityPaymentPreferenceId = this.searchField.activityPaymentPreferenceId
				this.oldSearchField.activityPaymentPreferenceName = this.searchField.activityPaymentPreferenceName
				this.oldSearchField.shopTypeId = this.searchField.shopTypeId
				this.oldSearchField.shopTypeName = this.searchField.shopTypeName
				this.otherSearchVisble = true

			},
			//关闭筛选框
			closeSearch() {
				this.oldSearchField.activityPaymentPreferenceId = ''
				this.oldSearchField.activityPaymentPreferenceName = ''
				this.oldSearchField.shopTypeId = ''
				this.oldSearchField.shopTypeName = ''
				this.oldSearchField.shopCategoryId = ''
				this.oldSearchField.shopCategoryName = ''
				this.otherSearchVisble = false
			},

			//确认搜索
			confirmSearch(type) {
				this.sort = this.sortpop
				this.shopType = this.shopTypepop
				this.payType = this.payTypepop
				this.shopCategoryId = this.shopCategoryId
				this.current = 1
				this.getList()
				this.otherSearchVisble = false
			},
			//跳转分类
			jumpCategory(item) {
				uni.navigateTo({
					url: `/pages/activity/grouppuchaselist?shopCategoryId=` + item.id
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.flex {
		display: flex;
	}

	.content {
		padding: 0rpx 25rpx 25rpx 25rpx;
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





	.prefecture {
		.prefecture-item {
			margin-right: 20rpx;
		}

		.prefecture-item-img {
			width: 220rpx;
			height: 180rpx;
		}
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
		box-shadow: 2rpx 3rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		margin-top: 10rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 25rpx;
	}

	.tag-item {
		border-radius: 16rpx;
		background-color: #fceded;
		font-size: 24rpx;
		color: #D91B1B;
		padding: 14rpx 20rpx;
		text-align: center;
		margin-left: 8rpx;
	}

	.bao-item {
		padding: 5rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		size: 24rpx;
		color: #ffffff;
		font-weight: bold;
		line-height: 32rpx;
	}

	.tuan-item {

		padding: 5rpx;

		background: #54CBBA;

		border-radius: 10rpx;

		size: 24rpx;

		color: #ffffff;

		font-weight: bold;

		line-height: 32rpx;

	}

	.quan-item {

		padding: 5rpx;

		background: #FD6F36;

		border-radius: 10rpx;

		size: 24rpx;

		color: #ffffff;

		font-weight: bold;

		line-height: 32rpx;

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

	.type-img {
		width: 40rpx;
		height: 40rpx;
	}

	.select {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 25rpx;
		margin-top: 31rpx;

		.text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}

	.left-stype {
		margin-right: 25rpx;
		font-size: 24rpx;
		color: #222222;
		background: #F8F8F8;
		padding: 8rpx 40rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	.currenttag {
		color: #D91B1B;
		background-color: #FFF1F1;
	}

	.currentcolor {
		color: #D91B1B;
	}

	.preferentialpng {
		position: absolute;
	}

	.price-inpng {

		text-align: center;
		position: relative;
		top: 64rpx;
		right: 4rpx;
	}

	.buy-btn {
		margin-top: 16rpx;
		width: 107rpx;
		height: 40rpx;
		background: #D91B1B;
		border-radius: 20rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.coverPicture {
		width: 700rpx;
		height: 400rpx;
		border-radius: 10rpx;
		position: relative;
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

	.activity-img {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 710rpx;
	}

	.currenttab {
		color: #d91b1b;
	}

	.btn {
		width: 120rpx;
		height: 52rpx;
		text-align: center;
		background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		line-height: 52rpx;
		color: #ffffff;
	}

	.title {
		margin-top: 35rpx;
		font-size: 28rpx;
		width: 603rpx;
		margin-left: 25rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.item-detail {
		display: flex;
		justify-content: space-between;
		margin-top: 22rpx;
		align-items: center;
		margin-left: 25rpx;
		margin-right: 26rpx;
	}

	.remind {
		width: 160rpx;
		height: 52rpx;
		border-radius: 26rpx;
		color: #ffffff;
		font-size: 28rpx;
		text-align: center;
		background: #D91B1B;
		line-height: 52rpx;
	}

	.business-cc-img {
		width: 30rpx;
		height: 26rpx;

	}

	.business-cc {
		margin-left: 7rpx;
	}

	.business-rs-img {
		width: 28rpx;
		height: 24rpx;
		margin-left: 16rpx;
	}

	.business-rs {
		margin-left: 8rpx;
	}
	.icon-item{
		background-color: #ffffff;
		padding:  24rpx 43rpx;
border-radius: 10rpx;
	}
</style>
