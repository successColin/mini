<template>
	<view class="page">
		<!-- 首页搜索 -->
		<view class="bgfff" style="position: sticky;top: 0rpx;z-index: 99999999999;">
			<view v-if="isshow" style="margin:20rpx" class="u-flex">



				<view style="width: 640rpx;">
					<u-search @custom="tosearch" :showAction="true" :clearabled="true" @clear='clear' v-model="keyword"
						@search='tosearch' :placeholder="placeholder"></u-search>
				</view>
				<view style="margin-left: 20rpx;margin-top: -4rpx;height:64rpx">
					<view class="u-flex">
						<button open-type='contact' session-from='' class="kefu-contact">
							<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
						</button>
					</view>
				</view>
			</view>
			<view>
				<u-tabs :activeStyle="{
										  color: '#303133',
										  fontWeight: 'bold',
										  fontSize: '28rpx',
										  transform: 'scale(1.05)',
										}" :inactiveStyle="{
										  fontSize: '28rpx',
										}" itemStyle="height:88rpx;width:146rpx" lineHeight="3" lineWidth="24"
					:lineColor="`url(${lineBg}) 100% 100%`" keyName="name" :list="statusList" @click="OnClickStatus">
				</u-tabs>
			</view>
		</view>
		<!-- 轮播图 -->
		<carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
			systemCode="applets_4s_activity" :indicatorType="3"></carousel>
		<view class="btn-project" v-if="isshow">
			<view>
				<u-tabs :activeStyle="{
							    color: '#303133',
							    fontWeight: 'bold',
								fontSize:'32rpx',
							    transform: 'scale(1.05)',
							}" :inactiveStyle="{
								fontSize:'28rpx'
							}" itemStyle="height:88rpx" lineHeight="3" lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`"
					keyName='brandName' :list="newtags" @click="OnClickTags" :current='currentnow'>
				</u-tabs>
			</view>
		</view>

		<view @click="OnPushcreditCard" style="text-align: center;margin-bottom: 24rpx;margin-top: 24rpx;">
			<image style="width: 700rpx;height: 120rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230228/file_1677571756222.gif">
			</image>
		</view>
		<scroll-view v-if="selectbrand.length>0" style="margin-left: 25rpx;width: 700rpx; white-space: nowrap;"
			scroll-x="true">

			<view class="u-flex">
				<view @click="OngetAll" v-if="selectbrand.length>1" :key="-1" style="margin-right: 20rpx;width: 80rpx;"
					class="shop-btn" :class="{'shop-btn-s':shopselect==-1}">
					全部
				</view>
				<view v-for="(item,index) in selectbrand" :key="item.shopId" style="margin-right: 20rpx;"
					class="shop-btn" :class="{'shop-btn-s':shopselect==index}" @click="OnchooseShopId(item,index)">
					<view>
						{{item.baseName}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view v-if="toptype==3">
			<view v-if="dataList.length>0">
				<view v-for="(item,index) in dataList" :key="index" class="card" @click="Onbrand(item)">
					<view>
						<u-avatar shape="square" size="65" :src="item.faceImg"></u-avatar>
					</view>
					<view style="margin-left: 21rpx;position: relative;">
						<view class="moreLine" style="font-size: 28rpx;width: 514rpx;">
							{{item.title}}
						</view>
						<view class="u-flex"
							style="font-size: 24rpx;color: #999999;position: absolute;bottom: 0rpx;width: 514rpx;justify-content: space-between;">
							<view>{{item.shopName}}
							</view>
							<view>{{item.createdAt}}
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="dataList.length==0" class="tac">
				<view style="font-size: 24rpx;color: #999999;">
					暂无优惠资讯
				</view>
			</view>
		</view>
		<view v-if="toptype==1">
			<view class="upkeepList flex" style="margin: 25rpx;" v-if="dataList.length>0">
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
			<view v-else-if="dataList.length==0" class="tac">
				<view>
					<image style="width: 350rpx;height: 280rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
					</image>
				</view>
				<view style="font-size: 24rpx;color: #999999;">
					暂无保养套餐
				</view>
			</view>
		</view>
		<view v-if="toptype==0">
			<view v-if="dataList.length!=0">
				<view @click="OnCarDetail(1,item)" v-for="(item,index) in dataList" :key="index"
					class="newCarItem flex jsb alc">
					<view class="newCarL">
						<image :src="item.faceImage"></image>
					</view>
					<view class="newCarR">
						<view class="flex alc mb20">
							<text class="newCarT oneLine">{{item.vehicleName}}</text>
							<image src="@/static/image/down.png" class="carDown" mode="widthFix"></image>
							<text class="size24 newCarHui">优惠{{item.discount}}</text>
						</view>
						<view class="size24 mb20">指导价：{{item.elevatingPriceMin}}
							<text v-if="item.elevatingPriceMax">
								-{{item.elevatingPriceMax}}
							</text>

						</view>
						<view class="flex alc jsb">
							<view class="newCarShopName txtLighGray size24">{{item.askNum}}人咨询</view>
							<view class="goShop">咨询</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else style="margin-top: 120rpx;text-align: center;">
				<image style="width: 152rpx;height: 153rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230708/file_1688782337036.png">
				</image>
			</view>
		</view>
		<view style="margin: 25rpx;" v-if="toptype==2">
			<view v-for="(item,index) in dataList" :key="index" style="margin-top: 47rpx;" @click="OnPushDetail(item)">
				<view class="coverPicture"
					:style="{backgroundImage: 'url('+item.coverPicture+')',backgroundSize: 'cover'}">
					<view
						style="line-height:52rpx ;font-size: 24rpx;color: #ffffff;padding-left: 14rpx;border-radius: 0rpx 24rpx 28rpx 0rpx;position: absolute;top: 30rpx;padding-right:20rpx;height: 52rpx;background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)"
						v-if="item.activitySignUpStatus==1||item.activitySignUpStatus==2">
						<view v-if="item.activitySignUpStatus==2">报名截止时间 <text
								class="ml10">{{item.activityEndTime}}</text> </view>
						<view v-if="item.activitySignUpStatus==1">报名开启时间 <text
								class="ml10">{{item.activityBeginTime}}</text></view>
					</view>

					<view v-if="item.activitySignUpStatus==1||item.activitySignUpStatus==2" class="backimg">
						<view style="font-size: 24rpx;color: #ffffff">
							{{item.districtName}}
						</view>
					</view>
					<view style="position: absolute;left: 260rpx;top:110rpx ;" v-if="item.activitySignUpStatus==1">
						<image src="@/static/image/huodongyugao.png" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view style="position: absolute;left: 260rpx;top:110rpx ;"
						v-if="item.activitySignUpStatus==3||item.activitySignUpStatus==5||item.activitySignUpStatus==4">
						<image src="@/static/image/jieshu.png" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view style="position: absolute;bottom: 24rpx;right: 27rpx;" v-if="item.activitySignUpStatus==2">
						<view class="btn">报名中</view>
					</view>
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="item-detail">
					<view v-if="item.payType == 2">
						<text style="color: #D91B1B;font-size: 24rpx;">
							¥
						</text>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
							{{item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice}}
						</text>
						<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
							<view class="u-flex" v-if="isExpert==1&&token&&item.maxCommissionPrice">
								<view class="u-flex">
									<view class="rebate-img rebate-size"></view>
								</view>
								<view class="rebate-style" style="margin-right: 24rpx;"
									v-if="item.maxCommissionPrice>item.minCommissionPrice">{{item.maxCommissionPrice}}
								</view>
								<view class="rebate-style" style="margin-right: 24rpx;" v-else>
									{{item.minCommissionPrice}}
								</view>
							</view>
						</view>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							¥{{item.marketPrice}}
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
								<view class="rebate-style" style="margin-right: 24rpx;"
									v-if="item.maxCommissionPrice>item.minCommissionPrice">
									{{item.maxCommissionPrice}}
								</view>
								<view class="rebate-style" style="margin-right: 24rpx;" v-else>
									{{item.minCommissionPrice}}
								</view>
							</view>
						</view>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							¥{{item.marketPrice}}
						</text>
					</view>
					<view @click.stop="Onremind(item,index)" class="remind" v-if="item.activitySignUpStatus==1"
						:class="{'Asreminder':item.isRemind==1}">
						提醒我
					</view>
					<view class="headPortraits" v-else>
						<view style="margin-right: 16rpx;">
							已报名<text style="margin-left: 9rpx;">{{item.saleNum}}/{{item.stock}}</text>
						</view>
						<view style="padding-right: 4rpx;" v-for="(item1,index1) in item.headPortraits" :key="index1">
							<u-avatar size="40rpx" :src="item1"></u-avatar>
						</view>
						<view v-if="item.saleNum>3">
							<u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
						</view>
					</view>

				</view>
			</view>
		</view>

		<view v-if="isLoadMore&&isActivitys&&isEnd==2"
			style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
			我到底啦~
		</view>
		<view v-if="!isActivitys" style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720543309.png"
				style="width: 126rpx;height: 148rpx;"></image>
		</view>
		<view style="height: 50rpx;">
		</view>
		<view v-if="isEnd==1&&newisshowend&&toptype==2" @click="OnPushClose">
			<pushclosedactivity></pushclosedactivity>
		</view>

		<image class="zhiding" src="@/static/image/zhidingicon.png" @click="ClickZhiDing"></image>
	</view>

</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	import {
		setstorage,
		getstorage
	} from '@/utils/index.js'
	import carousel from "@/components/carousel/index.vue"
	import pushclosedactivity from '../components/pushclosedactivity.vue'
	export default {
		components: {
			carousel,
			pushclosedactivity
		},
		data() {
			return {
				placeholder: '搜索新车',
				statusList: [{
						name: "市场活动",
						id: 2,
					},
					{
						name: "保养特惠	",
						id: 1,
					},

					{
						name: "新车鉴赏",
						id: 0,
					},
					{
						name: "优惠信息",
						id: 3,
					},
				],
				shopselect: null,
				shopId: 0,
				selectbrand: [],

				isstatus: 1,
				token: null,
				isExpert: null,
				activityPaymentPreferenceId: null,
				tagitem: null,
				newisshowend: false,
				isshowend: false,
				isshow: true,
				isEnd: 1,
				tags: [],
				isActivitys: true,
				keyword: '',
				newUserLimit: 0,
				dataList: [],
				tagList: [],
				title: '',
				currentnow: 0,
				payType: 0,
				current: 1,
				isLoadMore: false,
				brandId: 0,
				newtags: [],
				visitinto: null,
				toptype: 2,
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
			}
		},
		computed: {
			// z状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			// 胶囊高度
			menuHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuHeight : 0
			},
			// 胶囊top
			menuTop() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuTop - this.statusBarHeight : 0
			},

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
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			if (option.isEnd == 2) {
				this.isEnd = 2
			}
			if (option.brandindex) {
				this.currentnow = Number(option.brandindex) + 1
			}
			if (option.brandId) {
				this.brandId = option.brandId

			} else {
				this.brandId = null
			}
			if (option.value) {
				this.title = option.value
				this.keyword = option.value
			}
			if (option.isstatus) {
				this.isstatus = option.isstatus
			}
			this.getList()
			// this.getcar()

		},

		onReachBottom() {
			console.log(this.toptype)
			if (!this.isLoadMore) {
				this.current++
				// this.brandId = 0

				if (this.toptype == 0) {
					this.getcar()
				} else if (this.toptype == 2) {
					this.getList()
				} else if (this.toptype == 1) {
					this.getmeal()
				} else if (this.toptype == 3) {
					this.getnews()
				}
				// this.getList()
			}
			if (this.isshowend) {
				this.newisshowend = true
			}
			if (this.isEnd == 1 && this.toptype == 2) {
				this.current++
				this.getendactivity()
			}
		},
		onPullDownRefresh() {
			this.current = 1
			this.brandId = 0
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {

			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 3
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		methods: {
			OnCarDetail(index, item) {
				let id = ''
				id = item.vehicleInfoId

				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=' + index + '&id=' + id + '&shopId=' + this.id
				})
			},
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + id
				})
			},
			Onbrand(item) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/brandInfo?id=' + item.id
				})
			},
			getnews() {
				let shopId = ''
				if (this.shopId == 0) {
					shopId = null
				} else {
					shopId = this.shopId
				}
				let brandId = ''
				if (this.brandId == 0) {
					brandId = null
				} else {
					brandId = this.brandId
				}
				this.$newrequest.post('coc-active/api/v1/fours/brandNews/list', {
					current: 1,
					shopId: shopId,
					brandId: brandId,
					size: 99,
					title: this.keyword
				}).then(res => {
					if (res.data.records.length < 20) {
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
			getmeal() {
				let shopId = ''
				if (this.shopId == 0) {
					shopId = null
				} else {
					shopId = this.shopId
				}
				let brandId = ''
				if (this.brandId == 0) {
					brandId = null
				} else {
					brandId = this.brandId
				}

				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/lowPriceMaintenances", {
						shopId: shopId,
						brandId: brandId,
						size: 20,
						current: this.current,
						maintainName: this.keyword
					})
					.then(res => {
						if (res.data.records.length < 20) {
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
			getcar() {
				let shopId = ''
				if (this.shopId == 0) {
					shopId = null
				} else {
					shopId = this.shopId
				}
				let brandId = ''
				if (this.brandId == 0) {
					brandId = null
				} else {
					brandId = this.brandId
				}

				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/carModelList", {
					current: this.current,
					vehicleName: this.keyword,
					priceMin: 0,
					priceMax: 99999999,
					shopId: shopId,
					brandId: brandId,
					size: 20
				}).then(res => {
					if (res.data.records.length < 20) {
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
			OnClickStatus(e) {
				// this.currentnow=0
				this.toptype = e.id
				this.isLoadMore = false
				this.keyword = ''
				this.title = ''
				this.current = 1
				// this.shopId = 0
				// this.brandId = 0														
				if (e.id == 0) {
					this.getcar()
					this.placeholder = '搜索新车'
				} else if (e.id == 2) {
					this.placeholder = '搜索市场活动'
					this.getList()
				} else if (e.id == 1) {
					this.placeholder = '搜索保养特惠'
					this.getmeal()
				} else if (e.id == 3) {
					this.placeholder = '搜索优惠信息'
					this.getnews()
				}
			},
			OnchooseShopId(item, index) {
				if (this.isstatus == 1) {
					this.isEnd = 1
				} else {
					this.isEnd = 2
				}
				this.current = 1
				this.shopselect = index
				this.activityPaymentPreferenceId = null
				this.tagitem = null
				this.shopId = item.shopId
				this.isActivitys = true
				this.isLoadMore = false
				if (this.toptype == 0) {
					this.getcar()
				} else if (this.toptype == 2) {
					this.getList()
				} else if (this.toptype == 1) {
					this.getmeal()
				} else if (this.toptype == 3) {
					this.getnews()
				}
			},
			OngetAll() {
				if (this.isstatus == 1) {
					this.isEnd = 1
				} else {
					this.isEnd = 2
				}
				this.current = 1
				this.activityPaymentPreferenceId = null
				this.tagitem = null
				this.shopId = 0
				this.isLoadMore = false
				this.shopselect = -1
				this.isActivitys = true
				if (this.toptype == 0) {
					this.getcar()
				} else if (this.toptype == 2) {
					this.getList()
				} else if (this.toptype == 1) {
					this.getmeal()
				} else if (this.toptype == 3) {
					this.getnews()
				}

			},

			ClickZhiDing() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			resettingbank() {
				this.tagitem = null
				this.current = 1
				this.activityPaymentPreferenceId = null
				this.getList()
			},
			OnChangeBank(index) {
				this.tagitem = index
				this.current = 1
				this.activityPaymentPreferenceId = index
				this.getList()
			},
			OnPushcreditCard() {
				uni.navigateTo({
					url: "/pages/my/creditCard/index"
				})
			},
			OnPushClose() {
				// if (this.brandId == 0 || this.brandId == null) {
				// 	uni.navigateTo({
				// 		url: '/pages/activity/activityRegistration/foursactivity?isEnd=2&isstatus=2&value=' + this
				// 			.title
				// 	})
				// } else {
				this.isEnd = 2
				this.current = 1
				this.getendactivity()
				// }
			},
			OnPush(item, index) {
				this.currentnow = index
				if (index > 3) {
					this.lineBg = ''
				} else {
					this.lineBg =
						'https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678332343343.png'
				}
				this.brandId = item.brandId
				this.getList()

				// uni.navigateTo({
				// 	url: '/pages/activity/activityRegistration/foursactivity?brandId=' + item.brandId + '&isEnd=' +
				// 		this.isEnd
				// })
			},

			OnClickTags(e) {
				this.selectbrand = []
				this.tags.filter(s => {
					if (s.brandId == e.brandId) {
						if (s.fourSShopVO) {
							this.selectbrand = s.fourSShopVO
						}

					}
				})
				console.log(this.selectbrand)
				if (this.selectbrand.length == 1) {
					this.shopId = this.selectbrand[0].shopId
					this.shopselect = 0
				} else if (this.selectbrand.length > 1) {
					this.shopId = 0
					this.shopselect = -1
				}
				if (this.selectbrand.length == 0) {
					this.shopId = 0
				}
				this.brandId = e.brandId
				if (e.brandId == 0) {
					this.selectbrand = []
				}
				this.current = 1
				if (this.isstatus == 1) {
					this.isEnd = 1
				} else {
					this.isEnd = 2
				}
				this.activityPaymentPreferenceId = null
				this.tagitem = null
				if (this.toptype == 0) {
					this.getcar()
				} else if (this.toptype == 2) {
					this.getList()
				} else if (this.toptype == 1) {
					this.getmeal()
				} else if (this.toptype == 3) {
					this.getnews()
				}
			},
			clear() {
				this.keyword = ''
				this.title = ''
				this.current = 1
			},
			tosearch(value) {
				this.title = value
				this.keyword = value

				if (this.toptype == 0) {
					this.getcar()
				} else if (this.toptype == 1) {

					this.getmeal()
				} else if (this.toptype == 2) {

					this.getList()
				} else if (this.toptype == 3) {

					this.getnews()
				}

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
									console.log(this.dataList)
									_this.dataList[index].isRemind = 1
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
			OnPushDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			getendactivity() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: this.current,
					payType: this.payType,
					shopTypeId: 2,
					isEnd: this.isEnd,
					size: 20,
					title: this.title,
					newUserLimit: this.newUserLimit,
					brandId: this.brandId,
					activityPaymentPreferenceId: this.activityPaymentPreferenceId,
					shopId: this.shopId
				}).then(res => {

					res.data.homePageActivitysVOIPage.records.filter(s => {
						this.dataList.push(s)
					})
				})
			},

			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: this.current,
					payType: this.payType,
					shopTypeId: 2,
					isEnd: this.isEnd,
					size: 20,
					shopId: this.shopId,
					title: this.title,
					newUserLimit: this.newUserLimit,
					brandId: this.brandId,
					activityPaymentPreferenceId: this.activityPaymentPreferenceId
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.total == 0) {
						this.isActivitys = false
					} else {
						this.isActivitys = true
					}

					if (this.brandId == null) {
						this.tags = res.data.activityCategories
						this.tags.unshift({
							brandId: 0,
							brandName: "全部",
							brandCarLogo: ''
						})
						this.newtags = this.tags

					}

					this.isLoadMore = true
					if (res.data.homePageActivitysVOIPage.records.length < 3 && this.current == 1 && this.isEnd ==
						1) {
						this.newisshowend = true
						this.isshowend = true
						this.isLoadMore = true
					} else if (res.data.homePageActivitysVOIPage.records.length < 20 && this.isEnd == 1) {
						this.isshowend = true
						this.isLoadMore = true
					} else if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isLoadMore = true
					} else if (res.data.homePageActivitysVOIPage.records.length == 20) {
						this.isLoadMore = false
					}
					if (this.current === 1) {
						this.dataList = res.data.homePageActivitysVOIPage.records
					} else {
						res.data.homePageActivitysVOIPage.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

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
		// background-color: rgb(34 34 34 / 0.5);
		background-color: rgba(34, 34, 34, 0.5);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		width: 120rpx;
		height: 52rpx;
	}

	.btn-project {
		font-size: 32rpx;
	}

	.pop-item {
		display: flex;
		padding: 25rpx 44rpx;
		flex-wrap: wrap;

		.item {
			width: 160rpx;
			height: 60rpx;
			background-color: #F8F8F8;
			border-radius: 10rpx;
			text-align: center;
			line-height: 60rpx;
			font-size: 24rpx;
			margin-left: 4rpx;
			margin-top: 20rpx;
		}
	}

	.currenttag {
		color: #D91B1B;
		background-color: #fceded !important;
	}

	.tag-item {
		width: 156rpx;
		height: 56rpx;
	}

	.zhiding {
		position: fixed;
		bottom: 286rpx;
		right: 24rpx;
		width: 72rpx;
		height: 72rpx;
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

	.newCarItem {
		position: relative;
		padding: 0 16rpx 0 0;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 10rpx 25rpx;

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
			image {
				width: 280rpx;
				height: 200rpx;
				border-radius: 10rpx 0 0 10rpx;
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

	.mb20 {
		margin-bottom: 20rpx;
	}

	.goShop {
		width: 100rpx;
		height: 52rpx;
		line-height: 52rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		color: #FFFFFF;
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

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 12rpx 25rpx;
		padding: 14rpx;
		display: flex;
	}

	.fanyong {
		position: absolute;
		top: 0rpx;
	}
</style>
