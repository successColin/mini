<template>
	<view class="page">
		<view class="top" style="">
			<view style="border-radius: 16rpx 16rpx 0 0;">
				<u-swiper radius='4' :list="dataList.place_img" @click="clickswiper" height='190'></u-swiper>
			</view>
			<view style="height: 8rpx;background:#ffffff;position: relative;top: -4rpx;"></view>
			<view class="size32 fwb top-title" style="margin-top: 16rpx;">
				{{dataList.name}}
			</view>
			<view class="u-flex jsb  alc" style="margin-left: 24rpx;margin-top: -14rpx;">
				<view class="size28 txtLighGray">
					<text v-if="dataList.found_time">创办于{{dataList.found_time}}｜</text>{{dataList.rel_teacher_num}}名教练
				</view>
				<view class="u-flex alc">
					<view class="tac size20" @click="OnopenLocation">
						<view style="margin-top: 12rpx;">
							<image src="../static/image/daohang.svg" style="width: 48rpx;height: 48rpx;"></image>
						</view>
						<view>
							导航
						</view>
					</view>
					<view @click="Ontel" class="tac size20" style="margin-right: 44rpx;margin-left: 48rpx;">
						<view style="margin-top: 12rpx;">
							<image src="../static/image/dianhua.svg" style="width: 48rpx;height: 48rpx;"></image>
						</view>
						<view>
							电话
						</view>
					</view>
				</view>
			</view>
			<view class="u-flex " style="margin-left: 24rpx;margin-top: -10rpx;">
				<view v-for="(item,index) in dataList.rel_school_tag" :key="index" class="tag-item"
					:class="{'ml0':index==0}">
					{{item}}
				</view>
			</view>
		</view>

		<view class="card u-flex jsb alc">
			<view>
				<view class="u-flex alc">
					<view>
						<u-avatar-group :urls="dataList.likes_user.length>3?likesuser:dataList.likes_user" size="24"
							gap="0.3"></u-avatar-group>
					</view>

					<view class="size28 txtLighGray" style="margin-left: 16rpx;">
						{{dataList.likes_count}}位学员给驾校点赞
					</view>
				</view>
				<view class="u-flex alc txtLighGray size28" style="margin-top: 16rpx;">
					<view>
						每日一赞，助力驾校快速上榜
					</view>
					<view class="ml10" @click="Onshowmodal">
						<u-icon name="question-circle" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="dataList.today_is_likes==0" @click="OnLikes" class="likes-item">点赞</view>
			<view class="likes-item" style="background-color: #D9D9D9;color: #666666;"
				v-else-if="dataList.today_is_likes==1">已点赞</view>
		</view>
		<view class="card">
			<view class="title">驾校简介</view>
			<view class="title-bottom"></view>
			<view v-if="!isActive" class="intro">
				{{dataList.intro}}
			</view>
			<view v-else class="intro-item">
				{{dataList.intro}}
			</view>
			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view class="btntext" @click="OnWatchAll">
				{{btntext}}
			</view>
		</view>
		<view class="card">
			<view class="title">教练团队</view>
			<view class="title-bottom"></view>
			<view v-for="(item,index) in dataList.teacher.teacher" style="margin-top: 48rpx;" :class="{'mt34':index==0}"
				@click="OnPushTeacherDetail(item)">
				<view class="u-flex alc jsb">
					<view class="u-flex alc">
						<u-avatar size="48" :src="item.head_img"></u-avatar>
						<view class="size28 fwb" style="margin-left: 24rpx;">
							{{item.name}}
						</view>
					</view>
					<view class="txtLighGray size28">
						{{item.teach_age}}年教龄｜{{item.student_num}}名学员
					</view>
				</view>
			</view>
			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view class="btntext" @click="Openteacherlist">
				查看全部（{{dataList.teacher.count}}）
			</view>
		</view>
		<view class="card" v-if="dataList.evaluate.list.length>0">
			<view class="title">学员评价</view>
			<view class="title-bottom"></view>
			<view class="u-flex jsb alc">
				<view class="u-flex " style="margin-top: 44rpx;align-items: center;">
					<view v-if="dataList.evaluate.list[0].user_avator">
						<u-avatar size="48" :src="dataList.evaluate.list[0].user_avator"></u-avatar>
					</view>
					<view v-else>
						<u-avatar  size="48" src="https://oss.dcqcjlb.com/51che_java_dev/20230419/file_1681907219037.png"></u-avatar>
					</view>
					<view style="margin-left: 16rpx">
						<view  class="size28">
							{{dataList.evaluate.list[0].user_name}}
						</view>
						<view class="u-flex alc mt10">
							<view>
								<u-rate gutter='0' active-color="#D91B1B" count="5" v-model="dataList.evaluate.list[0].star"
									readonly></u-rate>
							</view>
							<view style="margin-left: 16rpx;" class="size24">
								{{dataList.evaluate.list[0].star.toFixed(1)}}
							</view>
						</view>
					</view>
				</view>
				<view class="txtLighGray size24">
					{{dataList.evaluate.list[0].date}}
				</view>
			</view>
			<view class="size28" style="margin-top: 24rpx;">
				{{dataList.evaluate.list[0].content}}
			</view>
			<view class="u-flex" style="flex-wrap: wrap;">
				<view v-for="(item1, index1) in dataList.evaluate.list[0].imgs" :key="index1">
					<view class="mt10">
						<image class="mr10" @click="clickImg(item1)" :src="item1"
							style="width: 200rpx; height: 200rpx;border-radius: 8rpx"></image>
					</view>
				</view>
			</view>
			<view class="u-flex" style="flex-wrap: wrap;margin-top: 24rpx;">
				<view v-for="(item,index) in dataList.evaluate.list[0].tag_name" :key="index" class="tag-item-b">
					{{item}}
				</view>
			</view>

			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view class="btntext" @click="OnAllevaluate">
				查看全部（{{dataList.evaluate.total}}）
			</view>
		</view>
		<view class="card">
			<view class="title">学驾技巧</view>
			<view class="title-bottom"></view>
			<view v-for="(item,index) in circleList" @click="OnPusharticleDetail(item)" :key="item.id" class="mt20">
				<view class="u-flex jsb ">
					<view>
						<view class="moreLine size28 fwb" style="width: 414rpx;">
							{{item.title}}
						</view>
						<view class="u-flex  alc jsb" style="margin: 16rpx 68rpx 0rpx 0rpx;">
							<view class="u-flex ">
								<view>
									<image src="../static/image/liulanliang.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.user_view_count}}
								</view>
							</view>
							<view class="u-flex ">
								<view>
									<image src="../static/image/dianzan.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.user_likes_count}}
								</view>
							</view>
							<view class="u-flex ">
								<view>
									<image src="../static/image/pinglun.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.comment_num}}
								</view>
							</view>
						</view>
					</view>
					<view>
						<image style="width: 240rpx;height: 160rpx;border-radius: 8rpx;" :src="item.cover_image">
						</image>
					</view>
				</view>
			</view>
		</view>
		<view class="btn-bottom" :style="{paddingBottom:safeHeight>0?'45rpx':'0'}">
			<view class="view" >
			<view class="btn-appraise" @click="OnPushEvaluateSchool()" >
				<view class="u-flex">
					<image style="width: 48rpx;height: 48rpx;" src="../static/image/pingjiaicon.svg"></image>
				</view>
				<view class="ml20">
					评价驾校
				</view>

			</view>
			<view class="btn-consult" @click="OnPushsingup">
				<view class="u-flex">
					<image style="width: 48rpx;height: 48rpx;" src="../static/image/zixunicon.svg"></image>
				</view>
				<view class="ml20">
					在线咨询
				</view>
			</view>
				</view>
				<view class="safe-bottom-height"></view>
		</view>
		<view style="height: 200rpx;"></view>
		<u-modal @confirm='closeshowmodal' confirmColor='#D91B1B' confirmText='我知道了' :show="showmodal" title="点赞说明"
			content='每给驾校点一次赞,就能助力驾校排名更靠前,招生更轻松,快来给您的驾校点赞吧!'></u-modal>
		<u-popup :safeAreaInsetBottom='false' :show="poplikes" @close="closepoplikes" bgColor='transparent'
			mode="center">
			<view>
				<image style="width: 577rpx;height: 785rpx;"
					src='https://oss.dcqcjlb.com/51che_java_dev/20230406/file_1680773187908.png'>
				</image>
			</view>
			<view style="justify-content: center;" class="u-flex" @click="closepoplikes">
				<u-icon color="#ffffff" name="close-circle" size="30px"></u-icon>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				safeHeight: 0,
				isActive: false,
				btntext: '查看全部',
				poplikes: false,
				showmodal: false,
				id: '',
				dataList: {},
				likesuser: [],
				circleList: [],
				page: 1,
				isLoadMore: false,
			}
		},
	computed: {
			height() {
				return `calc(100vh - 42px - 48rpx - ${this.safeHeight}px)`
			},
		},
		onLoad(option) {
			let _this = this
			this.id = option.id
			this.getList()
			this.getarticlelist()
			uni.$on('getdata', function(data) {
				if(!uni.getStorageSync("xjltoken")){
					uni.navigateBack({
						delta: 1
					})
					return false
				}
				_this.getList()
			})
			uni.$on('add', function(data) {
			
					_this.getList()
			
			})
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight =  parseInt(data.height)
			}).exec()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.page++
				this.getarticlelist()
			}

		},
		onShareAppMessage(res) {

			let title = this.dataList.name
			return {
				title,
			};
		},
		onShareTimeline(res) {

			let title = this.dataList.name
			return {
				title,
			};
		},
		onShow() {},
		methods: {
			OnPusharticleDetail(item){
				uni.navigateTo({
					url: '/pages/xjl/article/detail?id='+item.id
				});
			},
			closepoplikes() {
				this.poplikes = false
			},
			closeshowmodal() {
				this.showmodal = false
			},
			Onshowmodal() {
				this.showmodal = true
			},
			clickswiper(e) {
				let _this = this
				uni.previewImage({
					urls: _this.dataList.place_img,
					current: e
				})
			},
			OnPushsingup() {
				let _this = this
				uni.navigateTo({
					url: '/pages/xjl/school/singup?id=' + this.id,
					success: function(res) {
						res.eventChannel.emit('sendlist', {
							data: _this.dataList
						})
					}
				});
			},
			OnPushEvaluateSchool() {
				uni.navigateTo({
					url: '/pages/xjl/school/evaluatedetail?id=' + this.id
				});
			},
			OnAllevaluate() {
				uni.navigateTo({
					url: '/pages/xjl/school/evaluate?id=' + this.id
				});
			},
			Openteacherlist() {
				uni.navigateTo({
					url: '/pages/xjl/school/teacherlist?id=' + this.id
				});
			},
			OnPushTeacherDetail(item) {
				uni.navigateTo({
					url: '/pages/xjl/teacher/detail?id=' + item.id
				});
			},
			clickImg(item) {
				wx.previewImage({
					urls: [item], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},
			getarticlelist() {
				this.$xjlrequest.get("/user/learn/drive/circle/list?page_size=20&token=&page=" + this.page).then(res => {
					if (res.data.length < 20) {
						this.isLoadMore = true
					}
					if (this.page == 1) {
						this.circleList = res.data
					} else {
						res.data.filter(s => {
							this.circleList.push(s)
						})
					}
				})
			},
			OnWatchAll() {
				if (this.btntext == '查看全部') {
					this.btntext = '收起'
					this.isActive = true

				} else if (this.btntext == '收起') {
					this.btntext = '查看全部'
					this.isActive = false
				}
			},
			OnLikes() {
				this.$xjlrequest.post("/api/userLike", {
					type: '6',
					rel_id: this.id,
					user_id: getstorage('xjluserid'),
					source: '1'
				}).then(res => {
					if (res.code == 200) {
						this.getList()
						this.poplikes = true
					} else {
						uni.$u.toast(res.msg)
					}
				})

			},
			Ontel() {
				let _this = this
				uni.makePhoneCall({
					phoneNumber: _this.dataList.tel //仅为示例
				});
			},
			OnopenLocation() {
				let _this = this
				let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
				let x = this.dataList.lng - 0.0065;
				let y = this.dataList.lat - 0.006;
				let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
				let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
				let lngs = z * Math.cos(theta);
				let lats = z * Math.sin(theta);
				uni.openLocation({
					latitude: Number(lats),
					longitude: Number(lngs),
					success: function() {
						console.log('success');
					}
				});
			},
			getList() {
				this.$tokenxjlrequest.get("/user/home/newSchoolDetail" +
						'?token='+	getstorage('xjltoken')+'&school_id=' +
						this.id)
					.then(res => {
						if(res.data.evaluate.list.length>0){
							res.data.evaluate.list[0].tag_name=res.data.evaluate.list[0].tag_name.split(',')
						}
								
								res.data.evaluate.list.filter(s => {
									s.imgs.filter((i, index) => {
										if (i.substring(23, 68) ==
											'https://oss.dcqcjlb.com') {
											s.imgs[index] = i.substring(23)
										}
									})
								})	
						this.dataList = res.data
						this.likesuser=[]
						if (res.data.likes_user.length > 3) {
							res.data.likes_user.filter((s, i) => {
								if (i < 3) {
									this.likesuser.push(s)
								}
							})
							this.likesuser.push(
								'https://oss.dcqcjlb.com/51che_java_dev/20230406/file_1680768096146.png'
							)
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.ml0 {
		margin-left: 0rpx !important;
	}

	.top {
		border-radius: 16rpx;
		background: #FFFFFF;
		margin: 24rpx;
		padding-bottom: 24rpx !important;
	}

	.top-title {
		margin-top: 16rpx;
		margin-left: 24rpx;
	}

	.tag-item {
		font-size: 20rpx;
		color: #E85454;
		border-radius: 106rpx;
		border: 1rpx solid rgba(232, 84, 84, 0.9);
		padding: 4rpx 12rpx;
		margin-left: 12rpx;
	}

	.mt34 {
		margin-top: 34rpx !important;
	}

	.card {
		margin: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
	}

	.likes-item {
		width: 128rpx;
		height: 64rpx;
		background: #D91B1B;
		font-size: 28rpx;
		line-height: 64rpx;
		color: #ffffff;
		text-align: center;
		border-radius: 276rpx;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.title-bottom {
		height: 24rpx;
		width: 128rpx;
		background-color: #D91B1B;
		margin-top: -14rpx;
	}

	.intro {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 4;
		font-size: 24rpx;
		margin-top: 34rpx;
	}

	.intro-item {
		font-size: 24rpx;
		margin-top: 34rpx;
	}

	.btntext {
		text-align: center;
		font-size: 28rpx;
		text-align: center;
		color: #999999;
	}

	.tag-item-b {
		border-radius: 298rpx;
		border: 1rpx solid #D91B1B;
		padding: 8rpx 16rpx;
		color: #D91B1B;
		font-size: 20rpx;
		margin-top: 16rpx;
		margin-right: 16rpx;
	}

	.btn-bottom {
		position: fixed;
		bottom: 0rpx;
		height: 120rpx;
		background-color: #ffffff;
		width: -webkit-fill-available;
		padding: 24rpx 48rpx;
		.view {
			display: flex;
			font-size: 28rpx;
			padding-top: 22rpx;
			display: flex;
			justify-content: space-between;
		}
	}

	.btn-appraise {
		width: 256rpx;
		height: 88rpx;
		border-radius: 174rpx;
		border: 2rpx solid #D91B1B;
		font-size: 28rpx;
		color: #D91B1B;
		line-height: 88rpx;
		justify-content: center;
		display: flex;
		align-items: center;
	}

	.btn-consult {
		width: 256rpx;
		height: 88rpx;
		border-radius: 174rpx;
		font-size: 28rpx;
		color: #ffffff;
		background: #D91B1B;
		line-height: 88rpx;
		justify-content: center;
		display: flex;
		align-items: center;
	}
	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}
</style>
