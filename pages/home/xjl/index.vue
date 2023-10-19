<template>
	<view class="page">
		<scroll-view :scroll-y="true" @scrolltolower="scrolltolower"
			:style="{'maxHeight':contentHeight,'overflow': 'auto'}">
			<view>
				<carousel :topClass="['activity-img']" height="150px" urlkey="url" :dataType="2"
					systemCode="applets_elfin" :indicatorType="3"></carousel>
			</view>

			<view class="card" style="padding-bottom: 0rpx;">
				<view class="u-flex jsb">
					<view style="font-size: 32rpx;" class="fwb">选驾校</view>
					<view @click="OnPushSchoolList()" class="u-flex txtLighGray size28 alc"
						style="margin-right: 24rpx;">
						<view>全部</view>
						<view>
							<u-icon color='#999999' size="14px" name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view style="padding-right: 18rpx;">
					<scroll-view scroll-x="true" @scrolltolower="scroll">
						<view class="u-flex">
							<view v-for="(item,index) in schoolList" @click="OnPushSchoolDetail(item)" :key="item.id"
								style="margin-left: 18rpx;" :class="{'ml0':index==0}">
								<view v-if="index<10">
									<view class="schoolimg"
										:style="{backgroundImage:'url('+item.head_img+')',backgroundSize: 'cover'}">
										<view class="item-distance">
											<view>
												<u-icon color="#ffffff" name="map"></u-icon>
											</view>
											<view>
												{{item.distance}}
											</view>
										</view>
									</view>
									<view class="size28 oneLine" style="margin-top: 8rpx;color: #4E4E4E;width: 240rpx;">
										{{item.short_name}}
									</view>
									<view class="u-flex ">
										<view v-for="(item1,index1) in item.tags" :key="item1.tag_id">
											<view class="school-tag" v-if="index1<2"> {{item1.tag_name}}</view>

										</view>
									</view>
								</view>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>
			<view @click="OnPushTeacherList" class="u-flex" style="margin-top: 24rpx;">
				<image style="height: 126rpx;width: 702rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230420/file_1681985404694.png">
				</image>
			</view>
			<view class="card">
				<view class="u-flex jsb">
					<view style="font-size: 32rpx;" class="fwb">找教练</view>
					<view @click="OnPushTeacherList" class="u-flex txtLighGray size28 alc" style="margin-right: 24rpx;">
						<view>全部</view>
						<view>
							<u-icon color='#999999' size="14px" name="arrow-right"></u-icon>
						</view>
					</view>
				</view>
				<view v-for="(item,index) in teacherList" :key="item.id" @click="OnPushTeacherDetail(item)">
					<view class="u-flex" style="margin-top: 70rpx;" :class="{'mt26':index==0}" v-if="index<5">
						<view>
							<!-- <image :src="item.head_img" style="width: 224rpx;height: 200rpx;border-radius: 8rpx;"> </image> -->
							<u-avatar size="56" :src="item.head_img"></u-avatar>
						</view>
						<view style="margin-left: 18rpx;">
							<view class="u-flex alc">

								<view style="margin-right: 16rpx;align-items: baseline;" class="u-flex">
									<view class="fwb size32">{{item.name}}</view>
									<view class="size28" style="margin-left: 4rpx;margin-right: 16rpx;">教练</view>
									<view class=" size28 txtLighGray oneLine" style="width: 240rpx;">
										{{item.school_name}}
									</view>
								</view>

							</view>
							<view class="u-flex mainRed size24" style="margin-top: 16rpx;">
								<view>{{item.teach_age}}年教龄</view>
								<view style="margin-left: 24rpx;">已教{{item.student_num}}名学员</view>
							</view>
							<view v-if="item.intro" class="txtLighGray size28 moreLine"
								style="margin-top: 16rpx;width: 510rpx;">
								{{item.intro}}
							</view>
							<view class="u-flex" style="margin-top: 16rpx;">
								<view v-for="(item1,index1) in item.tags" :key="item1.id" class="style-tag"
									:class="{'ml0':index1==0}">
									{{item1.tag_name}}
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card">
				<view class="u-flex jsb">
					<view style="font-size: 32rpx;" class="fwb">学驾技巧</view>
					<!-- 			<view class="u-flex txtLighGray size28 alc" style="margin-right: 24rpx;" @click="OnPushArticle">
						<view>全部</view>
						<view>
							<u-icon color='#999999' size="14px" name="arrow-right"></u-icon>
						</view>
					</view> -->
				</view>
				<view v-for="(item,index) in circleList" :key="item.id" class="mt20" @click="OnPusharticleDetail(item)">
					<view class="u-flex jsb ">
						<view>
							<view class="moreLine size28 fwb" style="width: 414rpx;">
								{{item.title}}
							</view>
							<view class="u-flex  alc jsb" style="margin: 16rpx 68rpx 0rpx 0rpx;">
								<view class="u-flex ">
									<view>
										<image src="@/static/image/liulanliang.svg" style="width: 32rpx;height: 32rpx;">
										</image>
									</view>
									<view class="size24 txtDarkGray ml10">
										{{item.user_view_count}}
									</view>
								</view>
								<view class="u-flex ">
									<view>
										<image src="@/static/image/dianzan.png" style="width: 32rpx;height: 32rpx;">
										</image>
									</view>
									<view class="size24 txtDarkGray ml10">
										{{item.user_likes_count}}
									</view>
								</view>
								<view class="u-flex ">
									<view>
										<image src="@/static/image/pinglunxjl.png" style="width: 32rpx;height: 32rpx;">
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
			<view style="height: 50rpx;"></view>
		</scroll-view>
	
		<tabbar v-model="tabbarHeight" routePath="pages/home/xjl/index"></tabbar>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	import carousel from "@/components/carousel/index.vue"
	import tabbar from '@/components/tabbar/index.vue'
	export default {
		components: {
			carousel,
			tabbar
		},
		computed:{
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
				schoolList: [],
				teacherList: [],
				circleList: [],
				page: 1,
				isLoadMore: false,
				visitinto: null,
				tabbarHeight: 0, //tabbar高度
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
			this.getschoollist()
			this.getteacherlist()
			this.getarticlelist()
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 11
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		methods: {
			//滚动到底部
			scrolltolower() {
				if (!this.isLoadMore) {
					this.page++
					this.getarticlelist()
				}
			},
			OnPusharticleDetail(item) {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/article/detail?id=' + item.id
				});
			},
			OnPushArticle() {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/article/index'
				});
			},
			OnPushTeacherDetail(item) {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/teacher/detail?id=' + item.id
				});
			},
			OnPushTeacherList() {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/teacher/alllist'
				});
			},
			OnPushSchoolDetail(item) {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/school/detail?id=' + item.id
				});
			},
			OnPushSchoolList() {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/school/index'
				});
			},
			getarticlelist() {
				this.$xjlrequest.get("/user/learn/drive/circle/list?page_size=20&page=" + this.page + "&token=").then(
					res => {
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
			scroll() {
				if (!uni.getStorageSync("xjltoken") && !uni.getStorageSync("token")) {
					uni.navigateTo({
						url: "/pages/activity/share/index"
					})
					return false
				}
				uni.navigateTo({
					url: '/pages/xjl/school/index'
				});
			},
			getteacherlist() {
				this.$xjlrequest.get("/user/home/new_teacher_lists?type=1&lng=" + getstorage('lng') + "&lat=" + getstorage(
					'lat')).then(res => {
					this.teacherList = res.data
				})
			},
			getschoollist() {
				this.$xjlrequest.get("/user/home/new_school_lists?type=1&token=&lng=" + getstorage('lng') + "&lat=" +
					getstorage(
						'lat')).then(res => {
					this.schoolList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 25rpx;
	}

	.card {
		margin-top: 24rpx;
		padding: 26rpx 0rpx 24rpx 24rpx;
		border-radius: 16rpx;
		background: #FFFFFF;
	}

	.ml0 {
		margin-left: 0rpx !important;
	}

	.mt26 {
		margin-top: 26rpx !important;
	}

	.mb0 {
		margin-bottom: 0rpx !important;
	}

	.schoolimg {
		position: relative;
		width: 240rpx;
		height: 167rpx;
		border-radius: 8rpx;
		margin-top: 26rpx;
	}

	.item-distance {
		position: absolute;
		width: 116rpx;
		height: 42rpx;
		background: rgba(78, 78, 78, 0.6);
		border-radius: 48rpx 48rpx 48rpx 48rpx;
		opacity: 1;
		bottom: 8rpx;
		left: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #FFFFFF;
		font-size: 24rpx;
	}

	.style-tag {
		font-size: 20rpx;
		color: #D91B1B;
		border: 1rpx solid #DD5959;
		padding: 4rpx 12rpx;
		border-radius: 80rpx;
		margin-left: 8rpx;
	}

	.circle-item {
		padding: 24rpx;
		margin-top: 24rpx;
	}

	.school-tag {
		font-size: 20rpx;
		color: #D91B1B;
		border-radius: 80rpx;
		padding: 4rpx 12rpx;
		border: 1rpx solid #DD5959;
		margin-right: 8rpx;
		margin-top: 8rpx;
	}

	.btn-rescue {
		position: fixed;
		bottom: 100rpx;
		right: 30rpx;
	}
</style>
