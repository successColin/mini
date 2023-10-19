<template>
	<view class="page">
		<view class="bgfff page_top">
			<view style="margin: 0rpx 20rpx 28rpx 20rpx" class="u-flex">
				<view style="width: 640rpx">
					<u-search @custom="tosearch" :showAction="true" actionText="搜索" :clearabled="true" v-model="keyword"
						@search="tosearch" :placeholder="placeholder">
					</u-search>
				</view>
				<view style="margin-left: 20rpx; margin-top: -4rpx; height: 64rpx">
					<view class="u-flex">
						<button open-type="contact" class="kefu-contact">
							<image src="@/static/image/kefu.svg" style="width: 37rpx; height: 37rpx"></image>
						</button>
					</view>
				</view>
			</view>
			<view class="tab">
				<view class="tab_inner">
					<view class="tab_div flex jsb">
						<view class="tab_item" :class="{'tab_item_sel':type===0,'tab_item_nosel':type!==0}"
							@click="OnClickStatus(0)">精选活动</view>
						<view class="tab_item" :class="{'tab_item_sel':type===3,'tab_item_nosel':type!==3}"
							@click="OnClickStatus(3)">发现好去处</view>
						<view class="tab_item" :class="{'tab_item_sel':type===1,'tab_item_nosel':type!==1}"
							@click="OnClickStatus(1)">更多游玩</view>
						<view class="tab_item" :class="{'tab_item_sel':type===2,'tab_item_nosel':type!==2}"
							@click="OnClickStatus(2)">往期活动</view>
					</view>
					<view class="tab_line"
						:class="{'tab_tran1':type===0,'tab_tran2':type===3,'tab_tran3':type===1,'tab_tran4':type===2}">
					</view>
				</view>
			</view>
			<!-- 宣传活动图片 -->
			<!-- 	<carousel ref="carousel" :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
			systemCode="applets_group_purchase" :indicatorType="5"></carousel> -->

			<!-- 			<u-tabs v-if="iscommission==0" :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '28rpx',
          transform: 'scale(1.05)',
        }" :inactiveStyle="{
          fontSize: '28rpx',
        }" itemStyle="height:88rpx;width:200rpx" lineHeight="3" lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`"
				keyName="name" :list="statusList" @click="OnClickStatus">
			</u-tabs> -->
		</view>
		<view v-if="type==0||type==2">
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
						<view v-if="(item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2)&& item.districtName" class="backimg">
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
						<view @click.stop="Onremind(item, index)" class="remind"
							v-if="item.activitySignUpStatus == 1&&iscommission==0"
							:class="{ 'Asreminder': item.isRemind == 1 }">
							提醒我
						</view>
						<view class="remind" v-else-if="item.activitySignUpStatus == 1&&iscommission==1"
							:class="{ 'Asreminder': item.isSelection == 1 }" @click.stop="Onjoinshop(item,index)">
							加小店
						</view>
						<view class="headPortraits" v-else>
							<view style="margin-right: 16rpx;">
								已报名<text style="margin-left: 9rpx;">{{ item.saleNum }}/{{ item.stock }}</text>
							</view>
							<view class="u-flex" v-if="iscommission==0">
								<view style="padding-right: 4rpx;" v-for="(item1, index1) in item.headPortraits"
									:key="index1">
									<u-avatar size="40rpx" :src="item1"></u-avatar>
								</view>
								<view v-if="item.saleNum > 3">
									<u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
								</view>
							</view>
							<view v-else-if="iscommission==1" class="joinshop"
								:class="{ 'Asreminder': item.isSelection == 1 }" @click.stop="Onjoinshop(item,index)">
								加小店
							</view>
						</view>

					</view>
				</view>
			</view>
			<!-- 			<view v-if="newisshowend&&iscommission==0" @click="OnPushClose">
				<pushclosedactivity></pushclosedactivity>
			</view> -->
		</view>
		<view v-if="type==1">
			<view v-for="(item,index) in dataList" :key="item.id" class="card-list" @click="OnPush(item)">
				<view class="flex alc">
					<view>
						<!-- <u-avatar size="100" :src="item.baseHead" shape="square"></u-avatar> -->
						<view>
							<image style="width: 200rpx;height: 200rpx;border-radius: 10rpx;" :src="item.baseHead">
							</image>
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
					<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePriceBao }}
					</view>
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
		</view>
		<view v-if="type==3&&dataList.length>0" style="width: 700rpx;margin-left: 25rpx;margin-top: 20rpx;">
			<custom-waterfalls-flow imageKey='coverPicture' ref="waterfallsFlowRef" :value="dataList" :isshowicon='true'
				@imageClick='toList'>
				<view v-for="(v, i) in dataList" :key="i" slot="slot{{i}}" class="recommend-item">
					<view class="recommend-item-bottom">
						<view class="recommend-item-bottom-title">{{ v.activityTitle || v.articleTitle || v.productTitle
					                }}
						</view>
						<view class="flex alc jsb">
							<view class="flex alc" style="padding-left: 10rpx;">
								<u-avatar size="20" :src="v.headImg"></u-avatar>
								<view class="recommend-item-bottom-name">{{ v.nickname }}</view>
							</view>
							<view class="recommend-item-bottom-check">{{ v.viewBaseNum }}人看过</view>
						</view>
					</view>
				</view>
			</custom-waterfalls-flow>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	import pushclosedactivity from '../components/pushclosedactivity.vue'
	export default {
		components: {
			pushclosedactivity
		},
		data() {
			return {
				statusList: [{
						name: "精选活动",
						id: 0,
					},
					{
						name: "发现好去处",
						id: 2,
					},
					{
						name: "更多玩乐",
						id: 1,
					},
					{
						name: "往期活动",
						id: 2,
					}
				],
				isendnext: false,
				newisshowend: false,
				type: 0,
				isLoadMore: false,
				current: 1,
				dataList: [],
				placeholder: '搜索精选活动',
				keyword: '',
				iscommission: 0,
				lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC",
			}
		},

		onLoad(option) {
			if (option.iscommission) {
				this.iscommission = option.iscommission
			}
			this.getactivity()
		},
		onShow() {},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				if (this.type == 0) {
					this.getactivity()
				} else if (this.type == 1) {
					this.getshoplist()
				} else if (this.type == 2) {
					this.getendactivity()
				} else if (this.type == 3) {
					this.getrecommend()
				}
			}
		},
		methods: {
			Onjoinshop(item, index) {
				if (item.isSelection == 0) {
					this.$request.post("/coc-active/api/v1/expert/shop/selection/add", {
						type: 1,
						relatedId: item.activityId
					}).then(res => {
						if (res.code == 200) {
							this.dataList[index].isSelection = 1
							uni.$u.toast('加入小店成功')
						} else {
							uni.$u.toast(res.message)
						}
					})
				} else {
					this.$request.post("/coc-active/api/v1/expert/shop/selection/remove", {
						type: 1,
						relatedId: item.activityId
					}).then(res => {
						if (res.code == 200) {
							this.dataList[index].isSelection = 0
							uni.$u.toast('移出小店成功')
						} else {
							uni.$u.toast(res.message)
						}
					})
				}
			},
			OnPush(item) {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + item.id + '&shopType=' + this.shopType
				})
			},
			OnPushClose() {
				this.isLoadMore = false
				this.current = 1
				this.isendnext = true
				this.getendactivity()
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
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId + '&iscommission=' + this
						.iscommission
				})
			},
			getendactivity() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: this.current,
					payType: 0,
					shopTypeId: 0,
					isEnd: 2,
					size: 20,
					title: this.keyword,
					newUserLimit: 0,
					property: 1
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isLoadMore = true
						this.newisshowend = false
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
			getrecommend() {
				this.$newrequest.post("/coc-social/api/v2/article/myArticleList", {
					current: this.current,
					size: 10,
					title: this.keyword,
					isQuote: 1,
					selectionType: 1,
					userId: 0
				}).then(res => {
					if (res.code == 200) {
						res.data.records.forEach((v) => {
						if (v.imgs) {
							v.coverPicture = v.imgs.split(',')[0]
						} else if(v.articleCoverImage) {
							v.coverPicture = v.articleCoverImage
						}else if(v.video) {
							v.coverPicture = v.video + '?x-oss-process=video/snapshot,t_1000,m_fast'
						}
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
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			getactivity() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: this.current,
					payType: 0,
					shopTypeId: 0,
					isEnd: 1,
					size: 20,
					title: this.keyword,
					newUserLimit: 0,
					property: 1
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isLoadMore = true
						this.newisshowend = false
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
			getshoplist() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivityShopNew", {
					current: this.current,
					name: this.keyword,
					payType: 0,
					property: 1,
					shopCategoryId: 0,
					shopType: 1,
					size: 10,
					sort: 1
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
			OnClickStatus(type) {
				this.isLoadMore = false
				this.keyword = ''
				this.current = 1
				this.type = type
				this.dataList = [];
				if (type == 0) {
					this.placeholder = '搜索精选活动'
					this.getactivity()

				} else if (type == 1) {
					this.placeholder = '搜索商家名称，如乐园'
					this.getshoplist()

				} else if (type == 2) {
					this.placeholder = '搜索精选活动'
					this.getendactivity()
				} else if (type == 3) {
					this.placeholder = '搜索感兴趣的贴文'
					this.getrecommend()
				}
			},
			tosearch() {
				this.isLoadMore = false
				this.current = 1;
				this.dataList = []
				if (this.type == 0) {
					this.getactivity()
				} else if (this.type == 1) {
					this.getshoplist()
				} else if (this.type == 2) {
					this.getendactivity()
				} else if (this.type == 3) {
					this.getrecommend()
				}

			},
			toList(value) {
				let type = 2
				if (value.video) {
					type = 1
					uni.navigateTo({
						url: '/pages/activity/waterfull/videolist?id=' + value.articleId+'&selectionType=1',
					})
				} else {
					uni.navigateTo({
						url: '/pages/activity/waterfull/imglist?id=' + value.articleId+'&selectionType=1',
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.page_top {
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
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

	.coverPicture {
		width: 700rpx;
		height: 400rpx;
		border-radius: 10rpx;
		position: relative;
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

	.Asreminder {
		background-color: #999999;
	}

	.headPortraits {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}

	.card-list {
		box-shadow: 2rpx 3rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		margin: 25rpx;
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

	.tab {
		.tab_inner {
			padding: 0 30rpx 0 30rpx;

			.tab_item {
				width: 140rpx;
				text-align: center;
			}

			.tab_item_sel {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}

			.tab_item_nosel {
				font-size: 28rpx;
				font-weight: 500;
				color: #222222;
			}

			.tab_line {
				width: 33rpx;
				height: 6rpx;
				background: #F70000;
				border-radius: 3rpx;
				margin-left: 54rpx;
				margin-top: 14rpx;
			}

			.tab_tran1 {
				transform: translate(0, 0);
				transition: 0.5s;
			}

			.tab_tran2 {
				transform: translate(183rpx, 0);
				transition: 0.5s;
			}

			.tab_tran3 {
				transform: translate(366rpx, 0);
				transition: 0.5s;
			}

			.tab_tran4 {
				transform: translate(549rpx, 0);
				transition: 0.5s;
			}
		}

	}

	.recommend {
		&-head {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 750rpx;
			height: 103rpx;

			&-logo {
				width: 33rpx;
				height: 26rpx;
				margin-left: 25rpx;
			}

			&-title {
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #222222;
				line-height: 40rpx;
				margin-left: 10rpx;
			}

			&-go {
				width: 10rpx;
				height: 16rpx;
				margin-right: 24rpx;
			}
		}

		&-item {
			background: #FFFFFF;
			margin-bottom: 10rpx;

			&-video {
				position: absolute;
				width: 82rpx;
				height: 82rpx;
				margin-top: 187rpx;
				margin-left: 130rpx;
			}

			&-image {
				width: 342rpx;
				height: 456rpx;
				background: #000000;
				border-radius: 10rpx;
			}

			&-bottom {
				width: 342rpx;
				border-radius: 0rpx 0rpx 10rpx 10rpx;
				padding-top: 20rpx;
				padding-bottom: 10rpx;

				&-title {
					width: 306rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
					line-height: 36rpx;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					overflow: hidden;
					margin-bottom: 18rpx;
					margin-left: 14rpx;
					margin-right: 20rpx;
				}

				&-image {
					width: 40rpx;
					height: 40rpx;
					margin-left: 15rpx;
					border-radius: 20rpx;
				}

				&-name {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
					line-height: 38rpx;
					margin-left: 10rpx;
				}

				&-check {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					line-height: 38rpx;
					margin-right: 20rpx;
				}
			}
		}

		&-bottom {
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			margin-top: 20rpx;
			margin-bottom: 20rpx;
		}

	}
</style>
