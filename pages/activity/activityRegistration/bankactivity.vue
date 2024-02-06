<template>
	<!-- 此页面暂时不要了 -->
	<view class="page">
		<!-- 首页搜索 -->
		<view v-if="isshow" style="margin:20rpx" class="u-flex">
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
			systemCode="applets_bank_activity" :indicatorType="3"></carousel>
		<view v-if="isshow" class="btn-project">
			<u-tabs :activeStyle="{
                color: '#303133',
                fontWeight: 'bold',
                fontSize: '32rpx',
                transform: 'scale(1.05)',
            }" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:88rpx;width:220rpx" lineHeight="3"
				lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`" keyName='name' :list="tags" @click="OnClickTags"
				:current='shopTypeId'>
			</u-tabs>
		</view>
		<view v-if="currenttag != 2" class="u-flex jsb" style="margin: 25rpx;" :class="{ 'tagtwo': currenttag == 2 }">
			<view :class="{ 'tagthree': currenttag == 2 }">
				<image v-if='tagitem == 3' class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575797200.png">
				</image>
				<image v-else @click="OnChangeTagItem(3)" class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575385996.png">
				</image>
			</view>
			<view>
				<image v-if='tagitem == 1' class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682574859659.png">
				</image>
				<image @click="OnChangeTagItem(1)" v-else class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682576159314.png">
				</image>
			</view>
			<view>
				<image v-if='tagitem == 2' class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575735680.png">
				</image>
				<image @click="OnChangeTagItem(2)" v-else class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575342009.png">
				</image>
			</view>

		</view>
		<view v-else-if="currenttag == 2" class="u-flex tagtwo" style="margin: 25rpx;width: 60%;">
			<view>
				<image v-if='tagitem == 3' class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575797200.png">
				</image>
				<image v-else @click="OnChangeTagItem(3)" class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682575385996.png">
				</image>
			</view>
			<view class="tagthree">
				<image v-if='tagitem == 1' class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682574859659.png">
				</image>
				<image @click="OnChangeTagItem(1)" v-else class="tag-img"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682576159314.png">
				</image>
			</view>
		</view>
		<view @click="OnClickBank(1)" v-if="currenttag == 0" style="text-align: center;margin-top: 20rpx;">
			<image style="width: 700rpx;height: 120rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688524558532.png">
			</image>
		</view>
		<view @click="OnClickBank(2)" v-else-if="currenttag == 1" style="text-align: center;margin-top: 20rpx;">
			<image style="width: 700rpx;height: 120rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688524649655.png">
			</image>
		</view>
		<view @click="OnClickBank(3)" v-else-if="currenttag == 2" style="text-align: center;margin-top: 20rpx;">
			<image style="width: 700rpx;height: 120rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688524769339.png">
			</image>
		</view>
		<view v-if="tagitem == 1">
			<view style="margin: 25rpx;">
				<view v-for="(item, index) in dataList" :key="index" style="margin-top: 47rpx;"
					@click="OnPushDetail(item)">
					<view class="coverPicture"
						:style="{ backgroundImage: 'url(' + item.coverPicture + ')', backgroundSize: 'cover' }">
						<view class="s_ghbox" v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2">
							<text v-if="item.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
							<text style="margin-right: 14rpx;" v-if="item.activitySignUpStatus == 1">报名开启时间</text>{{
                                item.activitySignUpStatus==2?item.activityEndTime:item.activityBeginTime }}
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
					<view class="title">
						{{ item.title }}
					</view>
					<view class="item-detail">
						<view v-if="item.payType == 2">
							<text style="color: #D91B1B;font-size: 24rpx;">
								¥
							</text>
							<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
								{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
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
							<text
								style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
								¥{{ item.marketPrice }}
							</text>
						</view>
						<view v-else>
							<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
								免费
							</text>
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

			<view v-if="isLoadMore && isActivitys && isEnd == 2"
				style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
				我到底啦~
			</view>
			<view v-if="!isActivitys" style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720543309.png"
					style="width: 126rpx;height: 148rpx;"></image>
			</view>
			<view style="height: 50rpx;">
			</view>
			<view v-if="isEnd == 1 && newisshowend" @click="OnPushClose">
				<pushclosedactivity></pushclosedactivity>
			</view>
		</view>
		<view v-if="tagitem == 2">
			<view v-if="groupList.length > 0">
				<view v-for="item in groupList" :key="item.id">
					<view class="card" @click="OnPushGroupDetail(item)">
						<view class="card-name">
							<view class="u-flex alc">
								<view class="u-flex alc">
									<image
										src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682578930243.png"
										style="width: 30rpx;height: 30rpx;"></image>
								</view>
								<view class="size28 ml10">
									{{ item.baseName }}
								</view>
							</view>
							<view class="txtLighGray">
								{{ item.distanceMsg }}
							</view>
						</view>
						<!-- 详情 -->
						<view class="u-flex jsb mt20">
							<view>
								<image style="border-radius: 10rpx;width: 212rpx;height: 212rpx;"
									:src="item.coverPicture">
								</image>
							</view>

							<view style="margin-left: 25rpx;">
								<view class="moreLine size24" style="width: 418rpx;">
									{{ item.title }}
								</view>
								<view class="mt10 flex alc">
									<view style="width: 280rpx;">
										<u-line-progress :showText='false' :percentage="(100 - item.percentage)"
											inactiveColor="#fceded" activeColor="#D91B1B">

										</u-line-progress>
									</view>
									<view class="ml10 size24 txtLighGray">剩余{{ 100 - item.percentage }}%
									</view>
								</view>
								<view class="preferentialpng">
									<image
										src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682578957686.png"
										style="width: 418rpx;height: 125rpx;"></image>
								</view>
								<view v-if="item.bankCardPrice" class="size24 fwb txtColorWhite price-inpng">
									{{ (item.marketPrice * 1000 - item.bankCardPrice * 1000) / 1000 }}
								</view>
								<view v-else class="size24 fwb txtColorWhite price-inpng">{{ item.saveMoney }}</view>
								<view class="u-flex alc jsb" style="margin-top: 30rpx;">
									<view>
										<view class="size24 txtLighGray" style="text-decoration: line-through;">
											¥{{ item.marketPrice }}
										</view>
										<view class="mainRed u-flex" style="margin-top: 10rpx;">
											<view class="u-flex" style="align-items: flex-end;margin-bottom: 6rpx;">
												<view class="font20">¥</view>
											</view>
											<view class="u-flex alc">
												<view v-if="item.bankCardPrice"
													style="font-size: 40rpx;margin-left: 6rpx;" class="fwb">
													{{ item.bankCardPrice }}</view>
												<view v-else style="font-size: 40rpx;margin-left: 6rpx;" class="fwb">
													{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
												</view>
											</view>
										</view>
									</view>
									<view class="tac">
										<view class="size20 txtLighGray "> 即将恢复 </view>
										<view v-if="item.isEnd == 0 && item.stock != item.saleNum" class="buy-btn">马上抢
										</view>
										<view v-else-if="item.stock == item.saleNum" class="buy-btn graybtn">已抢光</view>
										<view v-else-if="item.isEnd == 1" class="buy-btn graybtn">已结束</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="groupList.length == 0" class="tac mt20">
				<image style="width: 269rpx;height: 232rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230427/file_1682578776689.png">
				</image>
				<view class="mt20 tac size24 txtLighGray">暂无团购</view>
			</view>
		</view>
		<view v-if='tagitem == 3' style="margin: 25rpx;">
			<view v-for="(item, index) in newList" :key="item.id" @click="OnPushNewDetail(item)">
				<view class="moreLine size28 fwb" style="width: 700rpx;">{{ item.title }}</view>
				<view style="margin-top: 24rpx;">
					<image style="width: 700rpx;height: 320rpx;border-radius: 10rpx;" :src="item.faceImg"></image>
				</view>
				<view class="u-flex jsb size24 txtLighGray" style="margin-top: 24rpx;">
					<view>发布人:51车俱乐部</view>
					<view>{{ item.createdAt }}</view>
				</view>
				<u-divider :text="null"></u-divider>
			</view>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="isshowpop" @close="isshowpop = false" mode="center">
			<image show-menu-by-longpress mode="widthFix" :src="showimg"></image>
		</u-popup>
		<image class="zhiding" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059356929.png" @click="ClickZhiDing"></image>
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
				token: null,
				isExpert: null,
				newList: [],
				groupList: [],
				tagitem: 3,
				isshowpop: false,
				showimg: '',
				currenttag: 0,
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
				shopTypeId: 0,
				payType: 0,
				current: 1,
				categoryId: '',
				current: 1,
				isLoadMore: false,
				activityPaymentPreferenceId: 6,
				visitinto: null,
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
			if (option.value) {
				// this.isshow = false
				this.title = option.value
				this.keyword = option.value
			}
			if (option.shopTypeId) {
				this.shopTypeId = option.shopTypeId
			}
			if (option.activityPaymentPreferenceId) {
				this.activityPaymentPreferenceId = option.activityPaymentPreferenceId
				if (option.activityPaymentPreferenceId == 6) {
					this.currenttag = 0
				} else if (option.activityPaymentPreferenceId == 5) {
					this.currenttag = 1
				} else if (option.activityPaymentPreferenceId == 4) {
					this.currenttag = 2
				}
			}
			this.getList()
			this.getnewslist()
		},

		onReachBottom() {
			console.log(this.tagitem)
			if (!this.isLoadMore && !this.isshowend) {
				this.current++

				if (this.tagitem == 1) {
					this.getList()
				} else if (this.tagitem == 2) {
					this.getgrouplist()
				} else if (this.tagitem == 3) {
					this.getnewslist()
				}
			}
			if (!this.isLoadMore) {
				this.current++
				if (this.tagitem == 1) {
					this.getList()
				} else if (this.tagitem == 2) {
					this.getgrouplist()
				} else if (this.tagitem == 3) {
					this.getnewslist()
				}
			}
			if (this.isshowend && this.tagitem == 1) {
				this.newisshowend = true
			}
			if (!this.isLoadMore && this.isEnd == 2) {
				this.current++
				this.getendactivity()
			}

		},
		onPullDownRefresh() {
			this.current = 1
			this.getnewslist()
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 2
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		methods: {
			ClickZhiDing() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			OnPushNewDetail(item) {
				console.log(item)
				uni.navigateTo({
					url: '/pages/activity/activityRegistration/newdetail?id=' + item.id
				})
			},
			OnPushGroupDetail(item) {
				uni.navigateTo({
					url: '/pages/grouppurchase/detail?id=' + item.id
				})
			},
			getgrouplist() {
				this.$newrequest.post("/coc-active/api/v1/group/list", {
					current: this.current,
					size: 20,
					title: this.keyword,
					type: this.currenttag + 2
				}).then(res => {
					if (res.data.records.length < 20) {
						this.isLoadMore = true
					}
					if (this.current === 1) {
						this.groupList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.groupList.push(s)
						})
					}
				})
			},
			getnewslist() {
				this.$newrequest.post("/coc-active/api/v1/bank/news/list", {
					activityPaymentPreferenceId: this.activityPaymentPreferenceId,
					current: this.current,
					size: 20
				}).then(res => {
					if (res.data.records.length < 20) {
						this.isLoadMore = true
					}
					if (this.current === 1) {
						this.newList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.newList.push(s)
						})
					}
				})
			},
			OnChangeTagItem(index) {
				this.tagitem = index
				this.current = 1
				if (index == 1) {
					this.getList()
				} else if (index == 2) {
					this.getgrouplist()
				} else if (index == 3) {
					this.getnewslist()
				}
			},
			OnClickBank(index) {
				if (index == 3) {
					uni.navigateTo({
						url: '/pages/carShops/upkeep/insurance?id=0'
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '/pages/my/creditCard/detail?type=g'
					})
				} else if (index == 2) {
					uni.navigateTo({
						url: '/pages/my/creditCard/detail?type=n'
					})
				}
			},
			OnPushClose() {
				this.isLoadMore = false
				this.isEnd = 2
				this.current = 1
				this.getendactivity()
			},

			OnClickTags(e) {
				this.current = 1
				this.currenttag = e.index
				this.activityPaymentPreferenceId = e.id
				this.tagitem = 3
				this.isEnd = 1
				this.isLoadMore = false
				this.getnewslist()
			},
			clear() {
				this.keyword = ''
				this.title = ''
				this.current = 1
			},
			tosearch(value) {
				this.title = value
				if (this.tagitem == 3) {
					this.getnewslist()
				} else if (this.tagitem == 1) {
					this.getList()
				} else {
					this.getgrouplist()
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
			getendactivity() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					categoryId: this.categoryId,
					current: this.current,
					payType: this.payType,
					shopTypeId: 5,
					isEnd: this.isEnd,
					size: 20,
					title: this.title,
					newUserLimit: this.newUserLimit,
					activityPaymentPreferenceId: this.activityPaymentPreferenceId
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.total == 0) {
						this.isActivitys = false
					} else {
				  this.isActivitys = true
					}
					if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isLoadMore = true
					}
					res.data.homePageActivitysVOIPage.records.filter(s => {
						this.dataList.push(s)
					})

				})
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					categoryId: this.categoryId,
					current: this.current,
					payType: this.payType,
					shopTypeId: 5,
					isEnd: this.isEnd,
					size: 20,
					title: this.title,
					newUserLimit: this.newUserLimit,
					activityPaymentPreferenceId: this.activityPaymentPreferenceId
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.total == 0) {
						this.isActivitys = false
					} else {
						this.isActivitys = true
					}
					// res.data.activityCategories.unshift({
					// 	id: 0,
					// 	name: "全部",
					// })
					this.tags = res.data.activityCategories
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

	.btn {
		// background: none;
		// border: none;
		// margin: 0;
		// padding: 0;
		outline: none;
	}

	.tag-img {
		width: 156rpx;
		height: 56rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 24rpx;
		position: relative;
	}

	.card-name {
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx #e3e3e3 solid;
		padding-bottom: 25rpx;
	}

	.preferentialpng {
		position: absolute;
	}

	.discount-btn {
		border: 1rpx solid #D91B1B;
		border-radius: 14rpx;
		width: 60rpx;
		height: 28rpx;
		line-height: 28rpx;
		font-size: 20rpx;
		text-align: center;
		margin-left: 10rpx;
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

	.graybtn {
		background-color: #999999;
	}

	.tagtwo {
		justify-content: end !important;
	}

	.tagthree {
		margin-left: 110rpx;
	}

	.s_ghbox {
		line-height: 52rpx;
		font-size: 24rpx;
		color: #ffffff;
		padding-left: 14rpx;
		border-radius: 0rpx 24rpx 28rpx 0rpx;
		position: absolute;
		top: 30rpx;
		padding-right: 20rpx;
		height: 52rpx;
		background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)
	}

	.price-inpng {
		text-align: center;
		position: relative;
		top: 64rpx;
		right: 4rpx;
	}

	.zhiding {
		position: fixed;
		bottom: 286rpx;
		right: 24rpx;
		width: 72rpx;
		height: 72rpx;
	}
</style>
