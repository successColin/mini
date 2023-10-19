<template>
	<view class="page">
		<scroll-view :scroll-y="true" :refresher-enabled="true" @refresherrefresh="refresherrefresh"
			:refresher-triggered="refresherStatus" :style="{'maxHeight':contentHeight,'overflow': 'auto'}">
			<view style="margin-top:25rpx;" class="u-flex">
				<view style="width: 640rpx;">
					<u-search placeholder="搜索品牌4S店" :clearabled="true" v-model="searchValue" :showAction="false"
						@search='OnPushSearch'></u-search>
				</view>
				<view style="margin-left: 20rpx;margin-top: 20rpx;">
					<button class="kefu-contact" open-type='contact' session-from=''>
						<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
					</button>
				</view>
			</view>
			<carousel :topClass="['activity-img']" height="150px" urlkey="url" :dataType="2"
				systemCode="applets_four_s_home_page" :indicatorType="3"></carousel>
			<!-- 转跳分期购车 -->
			<view style="margin-top: 28rpx;" @click="OnPushcar">
				<image style="width: 700rpx;height: 160rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688542229951.png">
				</image>
			</view>
			<u-tabs :activeStyle="{
				    color: '#303133',
				    fontWeight: 'bold',
					fontSize:'32rpx',
				    transform: 'scale(1.05)',
				}" :inactiveStyle="{
					fontSize:'28rpx'
				}" itemStyle="height:88rpx" lineHeight="3" lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`"
				keyName='brandName' :list="fourbrand" @click="OnClickTags">
			</u-tabs>

			<view @click="OnPushcreditCard" style="text-align: center;margin-bottom: 24rpx;margin-top: 24rpx;">
				<image style="width: 700rpx;height: 120rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688625743747.gif">
				</image>
			</view>
			<scroll-view style="width: 700rpx; white-space: nowrap;margin-bottom: 24rpx;" scroll-x="true">
				<view class="flex">
					<view v-for="(item,index) in fourSShopVO" :key="item.shopId" style="margin-right: 20rpx;"
						class="shop-btn" :class="{'shop-btn-s':shopindex==index,'allbtn':item.shopId==0}"
						@click="OnchooseShopId(item,index)">
						<view>
							{{item.baseName}}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 附近4s店 -->
			<!-- 	<view class="shopTitle flex alc jsb">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972461706.png"
					class="moduleTitleL" style="width: 135rpx;"></image>
				<view class="moduleTitleR flex alc " @click="jumpShop">
					<text class="size24">更多 </text>
					<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
				</view>
			</view> -->
			<view class="modalBox nearBox" v-for="item in shopList" mode="heightFix" :key="item.shopId"
				@click="jumpDetail(item.shopId)">
				<view class="newrH mb20 u-flex-al">
					<image v-if="item.brandLogo" :src="item.brandLogo" class="shopLogo" mode="heightFix"></image>
					<text>{{ item.storeAbbreviation }}</text>
				</view>
				<view class="flex alc jsb" v-if="item.doorheadPhotos && item.doorheadPhotos.length > 0">
					<template v-if="item.doorheadPhotos.length == 3">
						<image :src="photo" class="nearItemPic3" mode="aspectFill" :key="index"
							v-for="photo in item.doorheadPhotos">
						</image>
					</template>
					<template v-if="item.doorheadPhotos.length == 1">
						<image :src="item.doorheadPhotos[0]" class="nearItemPic1" mode="aspectFill">
						</image>
					</template>
				</view>
				<view v-if="item.storeLabel" class="shopSpetial ">{{ item.storeLabel }}</view>
				<view class="flex alc jsb mt10">
					<view class="flex alc">
						<view class="flex alc" @click.stop="showLocation(item.lng, item.lat)">
							<image src="@/static/image/dingwei.png" class="dwIcon"></image>
							<view class="ml10 size24">{{ item.distanceMsg }}</view>
						</view>
						<view v-if="item.mobile" class="flex alc ml20" @click.stop="clickTel(item.mobile)">
							<image src="@/static/image/dianhua.png" class="telIcon"></image>
							<view class="ml10 size24">{{ item.mobile }}</view>
						</view>
					</view>
					<view class="goShop">进店</view>
				</view>
			</view>
			<!-- 新车推荐 -->
			<view class="shopTitle flex alc jsb">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972496056.png"
					class="moduleTitleL" style="width: 135rpx;"></image>
				<view class="moduleTitleR flex alc " @click="jumpMotorcycleTypeList">
					<text class="size24">更多 </text>
					<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
				</view>
			</view>
			<view class="newCarItem flex jsb alc" v-for="(item, index) in carList" :key="index"
				@click="lookCarDetail(item)">
				<view class="topTip">{{ item.askNum }}人咨询</view>
				<view class="newCarL">
					<image :src="item.faceImage" mode="aspectFill"></image>
				</view>
				<view class="newCarR">
					<view class="flex alc mb20">
						<text class="newCarT oneLine">{{ item.vehicleName }}</text>
						<image src="@/static/image/down.png" class="carDown" mode="widthFix"></image>
						<text class="size24 newCarHui">优惠{{ item.discount }}</text>
					</view>
					<view class="size24 mb20">指导价：{{
          item.elevatingPriceMax ? item.elevatingPriceMin + '-' + item.elevatingPriceMax :
          item.elevatingPriceMin
        }}</view>
					<view class="flex alc jsb">
						<view class="newCarShopName txtLighGray size24">{{ item.baseName }}</view>
						<view class="goShop">咨询</view>
					</view>
				</view>
			</view>
			<!-- 低价保养 -->
			<template>
				<view class="shopTitle flex alc jsb">
					<image
						src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972422292.png"
						class="moduleTitleL" style="width: 135rpx;"></image>
					<view class="moduleTitleR flex alc " @click="jumpUpkeep">
						<text class="size24">更多 </text>
						<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
					</view>
				</view>
				<view class="upkeepList flex">
					<view class="upkeepItem mb10" v-for="item in lowKeppList" :key="item.maintainMealId"
						@click="OnPushDetail(item, 'lowKeep')">
						<view style="position: relative;">
							<image :src="item.coverImage" class="upkeepImg" mode="aspectFill"></image>
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
							<view class="oneLine fwb mb20">{{ item.maintainName }}</view>
							<view class="flex priceLine">
								<u-icon name="rmb" color="#D91B1B" size="12" bold='true'></u-icon>
								<view class="huiPrice">{{item.bankCardPrice?item.bankCardPrice:item.price }}</view>
								<view class="txtLighGray size24 ml10 txtls">原价{{ item.marketPrice }}元</view>
							</view>
							<view class="flex alc jsb">
								<view class="txtLighGray size24">{{ item.shopName }}</view>
								<view class="goDetail">购买</view>
							</view>
						</view>
					</view>
				</view>
			</template>
			<!-- 4s店活动 -->
			<view class="shopTitle flex alc jsb">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972690463.png"
					class="moduleTitleL" style="width: 135rpx;"></image>
				<view @click="OnPushfourS" class="moduleTitleR flex alc ">
					<text class="size24">更多 </text>
					<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
				</view>
			</view>
			<view class="flex mb20" style="flex-wrap: wrap;">
				<view v-for="(item, index) in activeList" :key="index" class="mb20"
					@click="OnPushDetail(item, 'active')">
					<view class="coverPicture"
						:style="{ backgroundImage: 'url(' + item.coverPicture + ')', backgroundSize: 'cover' }">
						<view
							style="line-height:52rpx ;font-size: 24rpx;color: #ffffff;padding-left: 14rpx;border-radius: 0rpx 24rpx 28rpx 0rpx;position: absolute;top: 30rpx;padding-right:20rpx;height: 52rpx;background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)"
							v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2">
							<text v-if="item.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
							<text style="margin-right: 14rpx;"
								v-if="item.activitySignUpStatus == 1">报名开启时间</text>{{ item.activitySignUpStatus==2?item.activityEndTime:item.activityBeginTime }}
						</view>

						<view v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2" class="backimg">
							<view style="font-size: 24rpx;color: #ffffff">
								{{ item.districtName }}
							</view>
						</view>
						<view style="position: absolute;left: 260rpx;top:110rpx ;"
							v-if="item.activitySignUpStatus == 1">
							<image src="@/static/image/huodongyugao.png" style="width: 180rpx;height: 180rpx;"></image>
						</view>
						<view style="position: absolute;left: 260rpx;top:110rpx ;"
							v-if="item.activitySignUpStatus == 3 || item.activitySignUpStatus == 5 || item.activitySignUpStatus == 4">
							<image src="@/static/image/jieshu.png" style="width: 180rpx;height: 180rpx;"></image>
						</view>
						<view style="position: absolute;bottom: 24rpx;right: 27rpx;"
							v-if="item.activitySignUpStatus == 2">
							<view class="btn">报名中</view>
						</view>
					</view>
					<view class="activeTitle">
						{{ item.title }}
					</view>
					<view class="item-detail">
						<view v-if="item.payType == 2">
							<text style="color: #D91B1B;font-size: 24rpx;">
								¥
							</text>
							<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
								{{ item.bankCardPrice ? item.bankCardPrice :item.flashSalePrice }}
							</text>
							<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
								<view class="u-flex" v-if="isExpert==1&&token&&item.maxCommissionPrice">
									<view class="u-flex">
										<view class="rebate-img rebate-size"></view>
									</view>
									<view class="rebate-style" style="margin-right: 24rpx;">
										{{item.maxCommissionPrice}}
									</view>
								</view>
							</view>
							<text
								style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
								¥{{ item.marketPrice }}
							</text>
						</view>
						<view v-else>
							<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
								免费
							</text>
							<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
								<view class="u-flex" v-if="isExpert==1&&token&&item.maxCommissionPrice">
									<view class="u-flex">
										<view class="rebate-img rebate-size"></view>
									</view>
									<view class="rebate-style" style="margin-right: 24rpx;">
										{{item.maxCommissionPrice}}
									</view>
								</view>
							</view>
							<text
								style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
								¥{{ item.marketPrice }}
							</text>
						</view>
						<view @click.stop="Onremind(item, index)" class="remind" v-if="item.activitySignUpStatus == 1"
							:class="{ 'Asreminder': item.isRemind == 1 }">
							提醒我
						</view>
						<view class="headPortraits" v-else>
							<view style="margin-right: 16rpx;">
								已报名<text style="margin-left: 9rpx;">{{ item.saleNum }}/{{ item.stock }}</text>
							</view>
							<view style="padding-right: 4rpx;" v-for="(item1, index1) in item.headPortraits"
								:key="index1">
								<u-avatar size="40rpx" :src="item1"></u-avatar>
							</view>
							<view v-if="item.saleNum > 3">
								<u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<u-modal confirmColor='red' :show="showmodal" content="4s店车型推荐需要获取您的位置信息,请打开小程序设置,更改位置信息为'使用小程序时允许'后再次点击"
			@confirm='Ontruemodal'></u-modal>
		<tabbar v-model="tabbarHeight" routePath="pages/home/4sShop"></tabbar>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	import tabbar from '@/components/tabbar/index.vue'
	import {
		gettoken,
		tologin,
		setstorage,
		getstorage
	} from '@/utils/index.js'
	import {
		shareMixin
	} from "@/mixin/share.js"
	export default {
		mixins: [shareMixin],
		components: {
			carousel,
			tabbar
		},
		computed: {
			//除去自定义tabbar的高度
			contentHeight() {
				return `calc(100vh - ${this.tabbarHeight}px)`
			},
			loadhelpBottom() {
				return `calc(${this.tabbarHeight}px + 100rpx)`
			}
		},
		data() {
			return {
				fourSShopVO: {},
				brandindex: 0,
				shopindex: 0,
				fourbrand: [],
				istoken: false,
				activeList: [],
				current: 1,
				lowKeppList: [],
				shopList: [],
				carList: [],
				brandId: '2',
				shopId: '',
				searchValue: '',
				visitinto: null,
				tabbarHeight: 0, //tabbar高度
				refresherStatus: false, //下拉刷新状态
				token: null,
				isExpert: null,
				brandName: '奥迪',
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',

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
		onLoad() {
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			this.getActiveList()
			this.getBrand()
			this.getNewCar()

			this.userId = getstorage("userId")
		},
		onShow() {
			this.getNewCar()
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 12
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		methods: {
			OnPushcar(){
				uni.navigateTo({
					url: '/pages/home/51carOther/index'
				})
			},
			OnchooseShopId(item, index) {
				if (item.shopId == 0) {
					this.shopId = item.shopId
					this.shopindex = index
					this.getList()
				} else {
					uni.navigateTo({
						url: '/pages/carShops/4Sdetail/index?id=' + item.shopId
					})
				}

			},
			OnClickTags(e) {
				this.shopindex = 0
				this.brandindex = e.index
				this.brandId = e.brandId
				this.shopId = this.fourbrand[e.index].fourSShopVO[0].shopId
				this.fourSShopVO = this.fourbrand[e.index].fourSShopVO
				this.brandName = e.brandName
				this.getList()
				this.getNewCar()
				this.getActiveList()
			},
			getBrand() {
				this.$newrequest.post("/coc-active/api/v1/four_s/fourSBrand").then(res => {
					res.data.filter(s => {
						if (s.fourSShopVO.length > 1) {
							s.fourSShopVO.unshift({
								baseName: '全部',
								shopId: '0'
							})
						}
					})
					this.fourbrand = res.data
					this.shopId = res.data[0].fourSShopVO[0].shopId
					this.brandId = res.data[0].brandId
					this.fourSShopVO = res.data[0].fourSShopVO
					this.getList()
				})
			},
			OnPushcreditCard() {
				uni.navigateTo({
					url: "/pages/my/creditCard/index"
				})
			},
			//上拉刷新
			refresherrefresh() {
				this.refresherStatus = true
				this.getActiveList()
				this.getBrand()
				this.getNewCar()
				setTimeout(() => {
					this.refresherStatus = false
				}, 1000);
			},
			OnPushfourS() {
				uni.navigateTo({
					url: '/pages/activity/activityRegistration/foursactivity?brandId=' + this.brandId +
						'&brandindex=' + this.brandindex
				})
			},
			OnPushSearch() {
				uni.navigateTo({
					url: "/pages/carShops/shop/index?searchtxt=" + this.searchValue
				});
			},
			getActiveList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: 1,
					size: 4,
					shopTypeId: 2,
					brandId: this.brandId
				}).then(res => {
					res.data.homePageActivitysVOIPage.records.filter(s => {
						if (s.coverPicture) {
							s.coverPicture = s.coverPicture.split(',')[0]
						} else {
							s.coverPicture = s.video + '?x-oss-process=video/snapshot,t_1000,m_fast'
						}
					})
					this.activeList = res.data.homePageActivitysVOIPage.records
				})
			},
			getlowKeppList() {
				this.$newrequest.post("coc-active/api/v2/homePage/four_s/lowPriceMaintenances", {
					brandId: this.brandId,
					current: 1,
					size: 4,
					sort: 1
				}).then(res => {
					this.lowKeppList = res.data.records
				})
			},
			getList() {
				this.getlowKeppList()
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS", {
					brandId: this.brandId,
					shopId: this.shopId
				}).then(res => {
					this.shopList = res.data
				})
			},
			getNewCar() {
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/carModelList", {
					current: 1,
					size: 2,
					priceMax: '',
					priceMin: 0,
					vehicleName: '',
					brandId: this.brandId,
					sortType: 1
				}).then(res => {

					this.carList = res.data.records
				})
			},

			OnPushDetail(item, modal) {
				if (modal == 'active') {
					uni.navigateTo({
						url: '/pages/home/activityDetail/index?id=' + item.activityId
					})
				} else if (modal == 'lowKeep') {
					uni.navigateTo({
						url: '/pages/carShops/upkeep/detail?id=' + item.maintainMealId
					})
				}
			},
			getmonthday(time) {
				return time.substr(0, 5)
			},
			gettime(time) {
				return time.substr(6, 11)
			},
			lookCarDetail(item) {
				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=1' + '&id=' + item.vehicleInfoId
				})
			},
			jumpMotorcycleTypeList(type, id, name) {
				if (type && id && name) {
					uni.navigateTo({
						url: `/pages/carShops/motorcycletype/index?type=${type}&searchId=${id}&searchName=${name}&brandId=` +
							this.brandId + '&brandName=' + this.brandName
					})
				} else {
					uni.navigateTo({
						url: '/pages/carShops/motorcycletype/index?brandId=' + this.brandId + '&brandName=' + this
							.brandName
					})
				}
			},
			jumpShop() {
				uni.navigateTo({
					url: '/pages/carShops/shop/index'
				})
			},
			jumpUpkeep() {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/index?brandId=' + this.brandId + '&brandName=' + this.brandName
				})
			},
			Onremind(item, index) {
				tologin()
				let _this = this
				if (item.isRemind == 1) {
					return false
				}
				uni.requestSubscribeMessage({
					tmplIds: [
						'jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'
					],
					success(res) {
						if (res['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'] == 'accept') {

							_this.$request.get("/coc-active/api/v1/activity/signUpStartRemind/" + item
								.activityId).then(s => {

								if (s.code == 200) {
									this.dataList[index].isRemind = 1
									uni.showToast({
										icon: 'none',
										title: '提醒成功，请等待通知',
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: s.message,
									});
								}
							})
						}
					}
				})
			},
			//显示位置
			showLocation(lng, lat) {
				uni.openLocation({
					latitude: lat,
					longitude: lng,
					success: function() {
						//console.log('success');
					}
				});
			},
			//拨打电话
			clickTel(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				});
			},
			//跳转详情
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + id
				})
			},
			goAbout51() {
				console.log('点击跳转')
				uni.navigateTo({
					url: '/pages/carShops/51carOther/index'
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 25rpx;
	}

	.search-top {
		width: 100%;
		// margin-left: -100rpx;
		display: flex;
		justify-content: space-between;
		line-height: 46rpx;
		margin-right: 26%;

	}

	.activity-img {
		margin: 25rpx auto 0;
	}

	.title {
		padding: 20rpx 32rpx;
		display: flex;
		// align-items: center;
		justify-content: space-between;
	}

	.more {
		height: 48rpx;
		background-color: #ffffff;
		font-size: 24rpx;
		line-height: 48rpx;
		border-radius: 24rpx;
		color: #666666;
		text-align: center;
		display: flex;
		justify-content: space-around;

	}


	.locationIcon {
		width: 36rpx;
		height: 44rpx;

	}

	.kefu-contact {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
		width: 55rpx;
		height: 55rpx;
		display: inline-flex;
	}

	button::after {
		border: initial;
	}

	.four-btn {
		margin-right: 20rpx;

		text {
			display: inline-block;
			font-size: 20rpx;
			color: #ffffff;
			background-color: #D91B1B;
			text-align: center;
			border-radius: 10rpx;
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
		}
	}

	.waterfall-title {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 10rpx;
		width: 320rpx;
		font-size: 28rpx;
		line-height: 60rpx;
		font-weight: bold;
	}

	.waterfall-name {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-left: 10rpx;
		width: 230rpx;
		font-size: 20rpx;
		line-height: 40rpx;
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



	.filterGrad {
		padding: 0rpx 25rpx;
		align-items: center;
		justify-content: space-between;

		.gradItem {
			width: 154rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #F8F8F8;
			border-radius: 10rpx;
			text-align: center;
			font-size: 24rpx;
		}
	}

	.shopTitle {
		padding: 30rpx 0;

		.moduleTitleL {
			height: 31rpx;
		}
	}

	.modalBox {
		background: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
	}

	.mb20 {
		margin-bottom: 20rpx;
	}

	.ml15 {
		margin-left: 15rpx;
	}

	.nearBox {
		padding: 25rpx;
		margin-bottom: 20rpx;

		.newrH {
			font-size: 32rpx;
			font-weight: bold;

			.shopLogo {
				margin-right: 16rpx;
				height: 50rpx;
			}
		}

		.nearItemPic1 {
			width: 100%;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.nearItemPic3 {
			width: 210rpx;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.shopSpetial {
			background: #FBE8E8;
			border-radius: 10rpx;
			color: #D91B1B;
			font-size: 24rpx;
			text-align: center;
			margin-top: 20rpx;
			padding: 10rpx 25rpx;
			display: inline-flex;
		}

		.dwIcon {
			width: 24rpx;
			height: 30rpx;
		}

		.telIcon {
			width: 25rpx;
			height: 25rpx;
		}

	}

	.nearBox:nth-last-child(1) {
		margin-bottom: 0;
	}

	.newCarItem {
		position: relative;
		padding: 0 16rpx 0 0;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 10rpx;

		.topTip {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .3);
			color: #fff;
			font-size: 24rpx;
			text-align: center;
			padding: 0 25rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 10rpx 0 10rpx 0;
		}

		.newCarL {
			background: #fff;
			width: 280rpx;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 208rpx;

			image {
				width: 260rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}

		.newCarR {
			width: 380rpx;
			padding: 30rpx 0 20rpx;

			.newCarT {
				font-size: 32rpx;
				font-weight: bold;
				margin-right: 10rpx;
				max-width: 200rpx;
			}

			.carDown {
				width: 38rpx;
				height: 41rpx;
			}

			.newCarHui {
				color: #D91B1B;
			}
		}
	}

	.goShop {
		width: 100rpx;
		height: 52rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 52rpx;
		font-size: 24rpx;
		color: #fff;
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
				border-radius: 10rpx 10rpx 0 0;
			}

			.upkeepCont {
				padding: 15rpx;

				.priceLine {
					align-items: baseline;

					.huiPrice {
						font-size: 44rpx;
						font-weight: bold;
						color: #D91B1B;
					}
				}
			}

			.goDetail {
				width: 70rpx;
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

	.StatusRB {
		position: absolute;
		bottom: 5px;
		right: 20rpx;
		width: 165rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #fff;
		height: 35rpx;
		line-height: 35rpx;
		text-align: center;
	}

	.StatusLR {
		position: absolute;
		top: 14rpx;
		left: 10rpx;
		width: 120rpx;
		background: rgba(0, 0, 0, .5);
		border-radius: 10rpx;
		color: #fff;
		text-align: center;
		padding: 5rpx 0;
	}

	.coverPicture {
		width: 700rpx;
		height: 400rpx;
		border-radius: 10rpx;
		position: relative;
	}

	.activeTitle {
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

	.headPortraits {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.Asreminder {
		background-color: #999999;
	}

	.backimg {
		position: absolute;
		bottom: 18rpx;
		left: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(34, 34, 34, 0.5);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		width: 120rpx;
		height: 52rpx;
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

	.btn-rescue {
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
	}

	.fanyong {
		position: absolute;
		top: 0rpx;
	}

	.shop-btn {
		border-radius: 10rpx;
		background-color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.shop-btn-s {
		background-color: #ffe2e2;
		color: #D91B1B;
		border: 1rpx #d91b1b solid;
	}

	.allbtn {
		width: 80rpx;
	}
</style>
