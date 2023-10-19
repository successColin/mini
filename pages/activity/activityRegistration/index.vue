<template>
	<view class="page">
		<!-- 首页搜索 -->
		<view style="margin:20rpx" class="u-flex">
			<view style="width: 640rpx;">
				<u-search @custom="tosearch" :showAction="true" :clearabled="true" @clear='clear' v-model="keyword"
					@search='tosearch' placeholder="搜索感兴趣的活动"></u-search>
			</view>
			<view style="margin-left: 20rpx;margin-top: -4rpx;height:64rpx">
				<view class="u-flex">
					<button open-type='contact' session-from='' class="kefu-contact">
						<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
					</button>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
			:systemCode="systemCode" :indicatorType="3"></carousel>
		<view class="btn-project">

		</view>

		<view style="margin: 24rpx 20rpx;background-color: #ffffff;border-radius: 10rpx;padding:17rpx 10rpx">
			<scroll-view :scroll-left='scrollleft' @scroll="scroll" scroll-x="true">
				<view class="u-flex">
					<view v-for="(item,index) in tagList" :key="index" class="u-flex"
						style="flex-shrink: 0;margin-left: 42rpx;align-items: center;" @click="OnClickitemtag(item)"
						:class="{'firsttag':index==0}">
						<view>
							<image style="width: 42rpx;height: 42rpx;" :src="item.iconUrl"></image>
						</view>
						<view :class="{'currenttab':item.id==categoryId}"
							style="margin-left: 14rpx;font-size: 28rpx;font-weight: bold;">
							{{item.categoryName}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view @click="OnPushcreditCard" style="text-align: center;margin-bottom: 24rpx;margin-top: 24rpx;">
			<image style="width: 700rpx;height: 120rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688625743747.gif">
			</image>
		</view>
		<view style="margin: 25rpx;">
			<view v-for="(item,index) in dataList" :key="index" style="margin-top: 47rpx;" @click="OnPushDetail(item)">
				<view class="coverPicture"
					:style="{backgroundImage: 'url('+item.coverPicture+')',backgroundSize: 'cover'}">
					<view
						style="line-height:52rpx ;font-size: 24rpx;color: #ffffff;padding-left: 14rpx;border-radius: 0rpx 24rpx 28rpx 0rpx;position: absolute;top: 30rpx;padding-right:20rpx;height: 52rpx;background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)"
						v-if="item.activitySignUpStatus==1||item.activitySignUpStatus==2">
						<text v-if="item.activitySignUpStatus==2" style="margin-right: 14rpx;">报名截止时间</text>
						<text style="margin-right: 14rpx;"
							v-if="item.activitySignUpStatus==1">报名开启时间</text>{{item.activityBeginTime}}
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
					<view v-if="item.payType==2">
						<text style="color: #D91B1B;font-size: 24rpx;">
							¥
						</text>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
							{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice}}
						</text>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							原价¥{{item.marketPrice}}
						</text>
					</view>
					<view v-else>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
							免费
						</text>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							原价¥{{item.marketPrice}}
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
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720543309.png" style="width: 126rpx;height: 148rpx;"></image>
		</view>
		<view style="height: 50rpx;">
		</view>

		<view v-if="isEnd==1&&newisshowend" @click="OnPushClose" >
			<pushclosedactivity></pushclosedactivity>
		</view>
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
				newisshowend: false,
				isshowend: false,
				isActivitys: true,
				systemCode: 'applets_activity_registration',
				keyword: '',
				newUserLimit: 0,
				dataList: [],
				tagList: [],
				title: '',
				shopTypeId: 0,
				payType: 0,
				current: 1,
				categoryId: 0,
				current: 1,
				oldScrollleft: 0,
				scrollleft: 0,
				isLoadMore: false,
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
				city: '',
				isEnd: 1
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
		onLoad(option) {
			this.shopTypeId=option.shopTypeId
			if (option.isEnd == 2) {
				this.isEnd = 2
				this.payType=option.payType
				this.newUserLimit=option.newUserLimit
				this.shopTypeId=option.shopTypeId
			}
			if(option.type==1){
				this.payType=1
				this.newUserLimit=0
				this.shopTypeId=0
			}else if (option.type==2){
				this.shopTypeId=0
					this.newUserLimit=1
					// this.systemCode='applets_exclusive_for_newcomers'
			}
			if(option.value){
				this.title=option.value
				this.keyword = option.value
			}
			this.getList()
		},

		onReachBottom(e) {
			if (!this.isLoadMore && !this.isshowend) {
				this.current++
				this.getList()
			}
			if (this.isshowend) {
				this.newisshowend = true
			}

		},
		onPullDownRefresh() {
			this.current = 1
			this.getList()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {},
		methods: {
			OnPushcreditCard() {
				uni.navigateTo({
					url: "/pages/my/creditCard/index"
				})
			},
			OnPushClose() {
				uni.navigateTo({
					url: '/pages/activity/activityRegistration/index?isEnd=2'+'&newUserLimit='+this.newUserLimit+'&payType='+this.payType+'&shopTypeId='+this.shopTypeId+'&value='+this.title
				})
			},
			clear() {
				this.keyword = ''
				this.title = ''
				this.current = 1
				this.categoryId = 0
				this.scrollleft = this.oldScrollleft
				this.$nextTick(() => {
					this.scrollleft = 0
				});
				this.getList()
			},
			tosearch(value) {
				this.title = value
				this.categoryId = 0
				this.scrollleft = this.oldScrollleft
				this.$nextTick(() => {
					this.scrollleft = 0
				});
				this.getList()
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
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			scroll(e) {
				this.oldScrollleft = e.detail.scrollLeft
			},
			OnClickitemtag(item) {
				this.isLoadMore = false
				this.current = 1
				if (item.id == this.categoryId) {
					this.categoryId = 0
				} else {
					this.categoryId = item.id
				}
				this.getList()
			},
			//返回上一页/回到首页
			goback() {
				let routes = getCurrentPages()
				if (routes.length > 1) {
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					categoryId: this.categoryId,
					current: this.current,
					payType: this.payType,
					shopTypeId: this.shopTypeId,
					isEnd: this.isEnd,
					size: 20,
					title: this.title,
					newUserLimit: this.newUserLimit
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.total == 0) {
						this.isActivitys = false
					} else {
						this.isActivitys = true
					}
					this.tagList = res.data.activityCategories
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

	.btn-project {
		font-size: 32rpx;

		.btn {
			height: 51rpx;
			background-color: white;
			text-align: center;
			line-height: 51rpx;
			border-radius: 14rpx;
			font-weight: bold;
			width: 230rpx;
			padding-top: 6rpx;
			padding-bottom: 6rpx;
			font-size: 28rpx;
		}

		.active-project {
			background-color: #d91b1b;
			color: white;
		}
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

	.firsttag {
		margin-left: 0rpx !important;
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

</style>
