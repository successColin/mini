<template>
	<view class="page">
		<view >
			<view class="item-top">
			<view class="btn-project">
				<u-tabs :activeStyle="{
						        color: '#D91B1B',
						        fontWeight: 'bold',
						        fontSize: '28rpx',
						        transform: 'scale(1.05)',
						    }" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:88rpx;width:200rpx" lineHeight="3" lineWidth="24"
					:lineColor="`url(${lineBg}) 100% 100%`" keyName='name' :list="tags" @click="OnClickTags"
					:current='tagcurrent'>
				</u-tabs>
			</view>

		</view>
		<!-- 轮播图 -->
		<!-- <carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
			systemCode="applets_article_list" :indicatorType="3"></carousel> -->
		<view v-if="type==0">
			<view style="margin:20rpx;margin-left: 40rpx;" class="u-flex">
				<view style="width: 640rpx;">
					<u-search @custom="tosearch" :showAction="true" :clearabled="true" @clear='clear' v-model="keyword"
						@search='tosearch' placeholder="搜索感兴趣的贴文"></u-search>
				</view>
				<view style="margin-left: 20rpx;margin-top: -4rpx;height:64rpx">
					<view class="u-flex">
						<button open-type='contact' session-from='' class="kefu-contact">
							<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
						</button>
					</view>
				</view>
			</view>
			<view class="playitem">
				<view style="padding:20rpx 20rpx;">
					<!--  #ifdef MP-WEIXIN  -->
					<custom-waterfalls-flow imageKey='coverPicture' ref="waterfallsFlowRef" :value="dataList"
						:isshowicon='true' @imageClick='OnPushPostDetail'>
						<view v-for="(item,index) in dataList" :key="item.articleId" slot="slot{{index}}"
							style="padding-bottom: 10rpx;border-radius: 0px 0px 10rpx 10rpx;">
							<view v-if="item.citeType==10||item.citeType==11">
								<!-- 车型 -->
								<view v-if="item.type==6" class="prominent">
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										车型丨{{item.relatedName}}
									</view>
								</view>
								<view v-if="item.type==4" class="prominent">
									<!-- 团购 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										团购丨{{item.relatedName}}
									</view>
								</view>
								<view v-if="item.type==1" class="prominent">
									<!-- 活动 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										活动丨{{item.relatedName}}
									</view>
								</view>
								<view v-if="item.type==3" class="prominent">

									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										救援丨{{item.relatedName}}
									</view>
								</view>
								<view v-if="item.type==2" class="prominent">
									<!-- 保养套餐 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										4S店丨{{item.relatedName}}
									</view>
								</view>
								<view v-if="item.type==5" class="prominent">
									<!-- 套餐 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										套餐丨{{item.relatedName}}
									</view>
								</view>
							</view>
							<view v-else-if="item.citeType==1||item.citeType==2||item.citeType==3">
								<view v-if="item.citeType==1" class="prominent">
									<!-- 团购 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										团购丨{{item.productTitle}}
									</view>
								</view>
								<view v-if="item.citeType==2" class="prominent">
									<!-- 活动 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										活动丨{{item.activityTitle}}
									</view>
								</view>
								<view v-if="item.citeType==3" class="prominent">
									<!-- 活动 -->
									<view class=" u-flex alc" style="margin-left: 10rpx;">
										<image style="width: 32rpx;height: 32rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png">
										</image>
									</view>
									<view class="txtColorWhite size24 oneLine "
										style="margin-left: 15rpx;width: 225rpx;line-height: 48rpx;">
										商家丨{{item.shopName}}
									</view>
								</view>
							</view>
							<view class="waterfall-title oneLine" :class="{'mt-40':item.type||item.citeType}">
								<text >{{item.activityTitle}}</text>
							</view>
							<view class="u-flex jsb ml10 mr10 size20">
								<view class="u-flex alc">
									<view>
										<u-avatar size="20" :src="item.headImg"></u-avatar>
									</view>
									<view class="size20 ml10">
										{{item.nickname}}
									</view>
								</view>
								<view class="u-flex alc">
									<view class="u-flex alc">
										<image style="width: 24rpx;height: 20rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692146773166.png">
										</image>
									</view>
									<view style="margin-left: 5rpx;">{{item.likeBaseNum}}</view>
								</view>

							</view>
						</view>
					</custom-waterfalls-flow>
					<!--  #endif -->
				</view>
			</view>


			<view v-if="isLoadMore&&isarticle&type==0"
				style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
				我到底啦~
			</view>
			<view v-if="!isarticle&&type==0"
				style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
				<image
					src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720245068.png"
					style="width: 153rpx;height: 152rpx;"></image>
			</view>
			<view style="height: 100rpx;">
			</view>
		</view>
		<view v-else-if="type==1">
			<videolist ref="videolist" :dataList="videoList" @detailvideo='detailvideo' @getmorevideo='getmorevideo'
				@likenumchange='likenumchange' @setnewvideo='setnewvideo'></videolist>
		</view>
		<view v-else-if="type==2">
			<swiper class="swiper" :vertical='true' style="height:93.5vh" @change='change' duration='800'>
				<swiper-item v-for="(item,index) in imgList" :key="index">
					<scroll-view scroll-y="true" style="height: 100%;">
						<imgcomponent @changefollowType='changefollowType' :dataList="item" @deleteimg='deleteimg'
							@sendid='sendid(item)' :userId='userId' :index="index">
						</imgcomponent>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>
		<view v-if="!showpopadd&&type==0" @click="OnAddpost"
			style="position: fixed;bottom: 30rpx;left: 600rpx;z-index:9999">
			<image style="width: 88rpx;height: 88rpx;" src="@/static/image/xinzeng.png"></image>
		</view>
		</view>
		<request-loading></request-loading>
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
	import videolist from './components/videolist.vue'
	import imgcomponent from '../components/imgcomponent.vue'
	export default {
		components: {
			carousel,
			videolist,
			imgcomponent
		},
		data() {
			return {
				userId: '',
				tags: [{
						name: '全部',
						id: 0
					},
					{
						name: '视频',
						id: 1
					},
					{
						name: '图文',
						id: 2
					}
				],
				type: 1,
				showpopadd: false,
				isarticle: true,
				keyword: '',
				dataList: [],
				videoList: [],
				imgList: [],
				current: 1,
				isLoadMore: false,
				visitinto: null,
				tagcurrent: 1,
				videocurrent: 1,
				imgcurrent: 1,
				articleId: null,
			newuserid:null,
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
			let _this = this
			
			this.userId = uni.getStorageSync("userId")
			if (option.type) {
				this.type = option.type
				this.tagcurrent = option.type
				if( option.type==0){
					this.getList()
				} else if( option.type==1){
					this.getbyId(option.articleId,option.type)
				}else{
					this.getbyId(option.articleId,option.type)
				}
			}else{
				this.getvideoList()
			}
			if(option.userId){
				this.newuserid=option.userId
			}
			uni.$on('changelike', function(data) {
				if (data.likeType == 1) {
					_this.imgList[data.index].article.likeType = 1
					_this.imgList[data.index].article.likeBaseNum = _this.imgList[data.index].article
						.likeBaseNum + 1
				} else if (data.likeType == 2) {
					_this.imgList[data.index].article.likeType = 2
					_this.imgList[data.index].article.likeBaseNum = _this.imgList[data.index].article
						.likeBaseNum + -1
				}
			})
			uni.$on('changid', function(data) {
				_this.articleId=data
			})
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				if (this.type == 0) {
					this.current++
					this.getList()
				}

			}

		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 5
				}).then(res => {
					this.visitinto = res
				})
			}

		},
		onShareAppMessage(res) {
			this.share()
		let path='/pages/activity/activityRegistration/playfulperson?type=' + this.type+'&articleId='+this.articleId
			return {
				path: path,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			};
		},
		onShareTimeline(res) { //分享到朋友圈
			this.share()
		let path='/pages/activity/activityRegistration/playfulperson?type='+this.type+'&articleId='+this.articleId
			return {
				path: path,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			};
		},
		methods: {
			share(){
				if(this.type==1||this.type==2){
					this.$newrequest.post("/coc-social/api/v2/article/share",{
						id:this.articleId
					}).then(res=>{
						if(res.code==200){
							if(this.type==1){
								this.videoList.filter((s, i) => {
									if (this.articleId == s.article.id) {
									s.article.shareBaseNum++
									}
								})
							}else{
								this.imgList.filter((s, i) => {
									if (this.articleId == s.article.id) {
									s.article.shareBaseNum++
									}
								})
							}
						}
					})
				}
			},
			getbyId(id, type) {
				this.$request.post("coc-social/api/v1/article/findById", {
					current: 1,
					id: id,
					size: 99
				}).then(res => {
					if (type == 2) {
							res.data.article.imgarr=res.data.article.imgs.split(',')
						this.imgList.push(res.data)
						this.getotherimgList(id)
					} else {
						this.videoList.push(res.data)
						this.getothervideoList(id)
					}
				})
			},
			OnPushPostDetail(e) {
				if (!e.video) {
					// this.imgList = []
					// this.tagcurrent = 2
					// this.type = 2
					// this.getbyId(e.articleId, 2)
					uni.navigateTo({
						url: '/pages/activity/waterfull/imglist?id='+e.articleId,
					})
				} else {
					// this.videoList = []
					// this.tagcurrent = 1
					// this.type = 1
					// this.getbyId(e.articleId, 1)
					uni.navigateTo({
						url: '/pages/activity/waterfull/videolist?id='+e.articleId,
					})
				}
			},
			changefollowType(index) {
				if (this.imgList[index].article.followType == 1) {
					this.imgList[index].article.followType = 2
				} else {
					this.imgList[index].article.followType = 1
				}

			},
			change(e) {
				let _this = this			
				this.articleId=this.imgList[e.detail.current].article.id
				if ((e.detail.current / 8) % 1 === 0) {
					this.imgcurrent++
					this.getimgList()
				}
			},
			sendid(item) {
				this.$newrequest.post("coc-social/api/v1/article/findById", {
					current: 1,
					id: item.article.id,
					size: 3
				}).then(res => {
							res.data.article.imgarr=res.data.article.imgs.split(',')
					this.imgList.filter((s, i) => {
						if (s.article.id == item.article.id) {

							this.$set(this.imgList, i, res.data)
						}
					})
				})
			},
			deleteimg(id) {
				this.imgList.filter((s, i) => {
					if (s.article.id == id) {
						this.imgList.splice(i, 1)
					}
				})
			},
			detailvideo(id) {
				this.videoList.filter((s, i) => {
					if (s.article.id == id) {
						this.videoList.splice(i, 1)
					}
				})
			},
			setnewvideo(index, data) {
				this.$set(this.videoList, index, data)
			},
			likenumchange(type, index) {
				if (type == 2) {
					this.videoList[index].article.likeType = 1
					this.videoList[index].article.likeBaseNum = this.videoList[index].article.likeBaseNum + 1
				} else {
					this.videoList[index].article.likeType = 2
					this.videoList[index].article.likeBaseNum = this.videoList[index].article.likeBaseNum - 1
				}
			},
			getmorevideo() {
				this.videocurrent++
				this.getvideoList()
			},
			getotherimgList(id) {
				let _this = this
				this.$newrequest.post("/coc-social/api/v2/article/articleList", {
					current: this.imgcurrent,
					size: 10,
					type: 2,
					articleId: id,
					userId:this.newuserid
				}).then(res => {
					res.data.records.filter(s => {
						s.article.imgarr = s.article.imgs.split(',')
					})
				
					res.data.records.filter(s => {
						this.imgList.push(s)
					})
				})
			},
			getimgList() {
			let _this=this
			if(this.imgcurrent==1){
				this.$showLoading()
				setTimeout(() => {
				
				_this.$hideLoading()
				}, 3000)
			}
			
				this.$newrequest.post("/coc-social/api/v2/article/articleList", {
					current: this.imgcurrent,
					size: 10,
					type: 2,
					userId:this.newuserid
				}).then(res => {
					if(this.imgcurrent==1){
						this.articleId =res.data.records[0].article.id
					}
					res.data.records.filter(s => {
						s.article.imgarr = s.article.imgs.split(',')
					})
					res.data.records.filter(s => {
						this.imgList.push(s)
					})
				})
			},
			getothervideoList(id) {
				let _this = this
				this.$newrequest.post("/coc-social/api/v2/article/articleList", {
					current: this.videocurrent,
					size: 10,
					type: 1,
					articleId: id,
					userId:this.newuserid
				}).then(res => {
					if (this.videocurrent == 1) {
						_this.$refs.videolist.getonload()
						_this.$refs.videolist.getchangdi(res.data.records[0].article.id)
						res.data.records.filter(s => {
							this.videoList.push(s)
						})

					}
				})
			},
			getvideoList() {
				let _this=this
				if(this.videocurrent==1){
			if (!this.isshowpage) {
				this.$showLoading()
			}
				}
			
				this.$newrequest.post("/coc-social/api/v2/article/articleList", {
					current: this.videocurrent,
					size: 10,
					type: 1,
					userId:this.newuserid
				}).then(res => {
					if (this.videocurrent == 1) {
						this.articleId =res.data.records[0].article.id
						_this.$refs.videolist.getonload()
						_this.$refs.videolist.getchangdi(res.data.records[0].article.id)
						res.data.records.filter(s => {
							this.videoList.push(s)
						})

					}else{
						res.data.records.filter(s => {
							this.videoList.push(s)
						})
					}
				}).finally(() => {
					if (!this.isshowpage&&this.videocurrent==1) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			OnClickTags(item) {
				this.tagcurrent = item.id
				this.type = item.id
				this.isLoadMore = false
				if (item.id == 0) {
					this.current = 1
					this.dataList = []
					this.articleId = null
					this.getList()
				} else if (item.id == 1) {
					this.articleId = null
					this.videocurrent = 1
					this.videoList = []
					this.getvideoList()
				} else if (item.id == 2) {
					this.articleId = null
					this.imgcurrent = 1
					this.imgList = []
					this.getimgList()
				}
			},

			OnAddpost() {
				tologin()
				uni.redirectTo({
					url: "/pages/wiseman/component/addimgarticle?isold=1",
					success: function(s) {

					}
				});
			},
			clear() {
				this.current = 1
				this.isLoadMore = false
				this.dataList = []
				this.keyword = ''
				// this.$refs.waterfallsFlowRef.refresh();
				this.getList()
			},
			tosearch(value) {
				this.current = 1
				this.isLoadMore = false
				this.dataList = []
				this.keyword = value
				this.$refs.waterfallsFlowRef.refresh();
				this.getList()
			},
			getList() {
				this.$newrequest.post('/coc-social/api/v2/article/myArticleList', {
					size: 10,
					current: this.current,
					title: this.keyword,
					userId: 0
				}).then(res => {

					if (res.data.total == 0) {
						this.isarticle = false
					} else {
						this.isarticle = true
					}
					res.data.records.filter((s, index) => {
						if (s.imgs) {
							s.coverPicture = s.imgs.split(',')[0]
						} else if(s.articleCoverImage) {
							s.coverPicture = s.articleCoverImage
						}
						else if(s.video) {
							s.coverPicture = s.video + '?x-oss-process=video/snapshot,t_1000,m_fast'
						}
					})
					if (res.data.records.length < 10) {
						this.isLoadMore = true
					}

					if (this.current == 1) {
						this.dataList = res.data.records

					} else {
						res.data.records.filter(s => {
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

	.playitem {
		margin: 16rpx 20rpx;
		// background-color: #ffffff;
		border-radius: 10rpx;
		padding-bottom: 20rpx;
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
	.item-top {
		background-color: #ffffff;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		// padding-top: 24rpx;
	}

	.btn-project {
		font-size: 28rpx;
	}

	.prominent {
		position: relative;
		top: -60rpx;
		height: 48rpx;
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685780222536.png");
		background-size: 100% 100%;
		border-radius: 10rpx;
		margin: 0 10rpx;
		display: flex;

	}

	.mt-40 {
		margin-top: -40rpx;
	}
</style>
