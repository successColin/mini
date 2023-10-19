<template>
	<view class="page">
		<view class="top">
			<view class="u-flex jsc " style="padding-top: 40rpx;">
				<u-avatar size="56" :src="dataList.head_img"></u-avatar>
			</view>
			<view class="u-flex jsc alc" style="margin-top: 32rpx;">
				<view class="size32 fwb colorff">
					{{dataList.name}}
				</view>
				<view v-if="dataList.is_certify==1" class="ml10 u-flex alc">
					<image style="width: 90rpx;height: 36rpx;" src="../static/image/jiaolian.svg"></image>
				</view>
			</view>
			<view class="size24  mt20 tac" style="color: #9F9F9F;">
				{{dataList.teach_age}}年教龄｜{{dataList.student_num}}名学员
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
						{{dataList.likes_count}}位学员给教练点赞
					</view>
				</view>
				<view class="u-flex alc txtLighGray size28" style="margin-top: 16rpx;">
					<view>
						每日一赞，助力教练快速上榜
					</view>
					<view class="ml10" @click="openshowmodal">
						<u-icon name="question-circle" color="#999999"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="dataList.today_is_likes==0" @click="OnLikes" class="likes-item">点赞</view>
			<view class="likes-item" style="background-color: #D9D9D9;color: #666666;"
				v-else-if="dataList.today_is_likes==1">已点赞</view>
		</view>
		<view class="card" v-if="dataList.class_type.length>0">
			<view class="title">学驾班型</view>
			<view class="title-bottom" style="margin-bottom: 34rpx;"></view>
			<view v-for="(item,index) in dataList.class_type" :key="item.id" @click="OnPushDetail(item)">
				<view class="u-flex alc jsb">
					<view class="u-flex alc">
						<view>
							<image :src="item.class_type_img"
								style="width: 112rpx;height: 112rpx;border-radius: 16rpx;"></image>
						</view>
						<view style="margin-top: 8rpx;margin-left: 16rpx;">
							<view class="size32 fwb">{{item.class_name_text}}</view>
							<view class="txtLighGray size28">{{item.num_per_car_text}}｜{{item.transfer_mode_text}}
							</view>
						</view>
					</view>
					<view class="u-flex alc">
						<view class="mainRed fwb" style="font-size: 40rpx;margin-right: 16rpx;">￥{{item.course_cost}}
						</view>
						<view class="zixun-style">咨询</view>
					</view>
				</view>
				<u-divider v-if="index+1!==dataList.class_type.length" :text="null"></u-divider>
			</view>

		</view>

		<view class="card">
			<view class="title">教练简介</view>
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

		<view class="card" @click="OnPushSchoolDetail()">
			<view class="title">所属驾校</view>
			<view class="title-bottom"></view>
			<view class="u-flex" style="margin-top: 36rpx;">
				<view>
					<image style="width: 240rpx;height: 176rpx;border-radius: 8rpx;"
						:src="dataList.school_info.head_img"></image>
				</view>
				<view style="margin-left: 24rpx;">
					<view class="size32 fwb oneLine" style="width: 330rpx;">
						{{dataList.school_info.name}}
					</view>
					<view class="txtLighGray size28 mt10">
						创办于{{dataList.school_info.found_time}}｜{{dataList.school_info.rel_teacher_num}}名教练
					</view>
					<view class="u-flex" style="flex-wrap: wrap;">
						<view v-for="(item,index) in dataList.school_info.rel_school_tag" :key="index" class="tag-item">
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="card" v-if="dataList.evaluate.total>0">
			<view class="title">学员评价</view>
			<view class="title-bottom"></view>
			<view class="u-flex jsb alc">
				<view class="u-flex alc" style="margin-top: 44rpx;">
					<view v-if="dataList.evaluate.list[0].user_avator">
						<u-avatar size="48" :src="dataList.evaluate.list[0].user_avator"></u-avatar>
					</view>
					<view v-else>
						<u-avatar size="48"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230419/file_1681907219037.png">
						</u-avatar>
					</view>
					<view style="margin-left: 16rpx;">
						<view class="size28" style="margin-top: -20rpx;">
							{{dataList.evaluate.list[0].user_name}}
						</view>
						<view class="u-flex alc mt10">
							<view>
								<u-rate gutter='0' active-color="#D91B1B" count="5"
									v-model="dataList.evaluate.list[0].star" readonly></u-rate>
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
				查看更多评价({{dataList.evaluate.total}})
			</view>
		</view>
		<view class="btn-bottom" :style="{paddingBottom:safeHeight>0?'45rpx':'0'}">
			<view class="view">
				<view class="btn-appraise" @click="OnPushEvaluateTeacher">
					<view class="u-flex">
						<image style="width: 48rpx;height: 48rpx;" src="../static/image/pingjiaicon.svg"></image>
					</view>
					<view class="ml20">
						评价教练
					</view>

				</view>
				<view class="btn-consult" @click="OnPushSingup">
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
			content='每给教练点一次赞,就能助力教练排名更靠前,招生更轻松,快来给您的教练点赞吧!'></u-modal>
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
				id: '',
				dataList: {},
				likesuser: [],
				showmodal: false,
				poplikes: false,
				isActive: false,
				btntext: '查看全部',
			}
		},
		computed: {
			height() {
				return `calc(100vh - 42px - 48rpx - ${this.safeHeight}px)`
			},
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight = parseInt(data.height)
			}).exec()
		},
		onLoad(option) {
			this.id = option.id
			this.getList()
			let _this = this
			uni.$on('getdata', function(data) {
				if (!uni.getStorageSync("xjltoken")) {
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
		onShow() {},
		onShareAppMessage(res) {

			let title = this.dataList.name + '教练'
			return {
				title,
			};
		},
		onShareTimeline(res) {

			let title = this.dataList.name + '教练'
			return {
				title,
			};
		},
		methods: {
			OnPushSchoolDetail() {
				uni.navigateTo({
					url: '/pages/xjl/school/detail?id=' + this.dataList.school_id
				});
			},
			closepoplikes() {
				this.poplikes = false
			},
			closeshowmodal() {
				this.showmodal = false
			},
			openshowmodal() {
				this.showmodal = true
			},
			OnPushSingup() {
				let _this = this
				uni.navigateTo({
					url: '/pages/xjl/teacher/singup?id=' + this.id,
					success: function(res) {
						res.eventChannel.emit('sendlist', {
							data: _this.dataList
						})
					}
				});
			},
			OnPushEvaluateTeacher() {
				uni.navigateTo({
					url: '/pages/xjl/teacher/evaluatedetail?id=' + this.id
				});
			},
			OnAllevaluate() {
				uni.navigateTo({
					url: '/pages/xjl/teacher/evaluate?id=' + this.id
				});
			},
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/xjl/teacher/classdetail?id=' + item.id + '&school_id=' + this.id +
						'&teacher_id=' + this.id
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
					type: '5',
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
			getList() {
				this.$tokenxjlrequest.get('/user/home/getTeachersInfo?teacher_id=' + this.id +
					'&token=' + getstorage('xjltoken')).then(res => {
					res.data.school_info.found_time_ = res.data.school_info.found_time_.substring(0, 5);
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
					res.data.evaluate.list.filter(s => {
						s.imgs.filter((i, index) => {
							if (i.substring(23, 68) ==
								'https://oss.dcqcjlb.com') {
								s.imgs[index] = i.substring(23)
							}
						})
					})
					res.data.class_type.filter(s => {
						s.course_cost = Math.trunc(s.course_cost)
					})
					if (res.data.evaluate.list.length > 0) {
						res.data.evaluate.list[0].tag_name = res.data.evaluate.list[0].tag_name.split(',')
					}
					res.data.school_info.found_time = res.data.school_info.found_time.slice(0, 7)
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top {

		background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230407/file_1680852653733.png');
		background-size: 100% 100%;
		height: 336rpx;
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

	.card {
		margin: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
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

	.zixun-style {
		width: 104rpx;
		height: 54rpx;
		background: #D91B1B;
		border-radius: 84rpx;
		color: #ffffff;
		font-size: 28rpx;
		line-height: 54rpx;
		text-align: center;
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

	.tag-item {
		border-radius: 152rpx;
		padding: 4rpx 16rpx;
		color: #666666;
		font-size: 24rpx;
		margin-top: 24rpx;
		margin-right: 6rpx;
		background: #EFEFEF;
	}

	.tag-item-b {
		border-radius: 152rpx;
		padding: 4rpx 16rpx;
		color: #D91B1B;
		font-size: 24rpx;
		margin-top: 24rpx;
		margin-right: 6rpx;
		border: 1rpx solid #D91B1B;
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

	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
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
</style>
