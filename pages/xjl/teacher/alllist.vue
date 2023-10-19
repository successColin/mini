<template>
	<view class="page">
		<view class="top">
			<u-search :showAction='false' placeholder="搜索教练" inputAlign="center" v-model="search" @search='Onsearch'>
			</u-search>
			<view class="mt10">
				<u-tabs :activeStyle="{
							    color: '#303133',
							    fontWeight: 'bold',
								fontSize:'32rpx',
							    transform: 'scale(1.05)',
							}" :inactiveStyle="{
								fontSize:'28rpx'
							}" itemStyle="height:88rpx;width:306rpx" lineHeight="3" lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`"
					keyName='name' :list="tags" @click="OnClickTags()">
				</u-tabs>
			</view>
		</view>
		<view style="height: 214rpx;"></view>
			<view v-for="(item,index) in dataList" :key="item.id" class="card" @click="OnPushTeacherDetail(item)">
				<view class="u-flex">
					<view class="headimg" :style="{backgroundImage: 'url('+item.head_img+')',backgroundSize: 'cover'}">
						
						<image class="top-box" v-if="index==0" style="width: 57rpx;height: 57rpx;"
							src="../static/image/diyi.svg"></image>
						<image class="top-box" v-else-if="index==1" style="width: 57rpx;height: 57rpx;"
							src="../static/image/dier.svg"></image>
						<image class="top-box" v-else-if="index==2" style="width: 57rpx;height: 57rpx;"
							src="../static/image/disan.svg"></image>
						<view class="else-box" v-else>{{index+1}}</view>
					</view>
					<view style="margin: auto 0;margin-left: 16rpx;">
						<view class="u-flex alc">
						
							<view class="size32 fwb oneLine">
								{{item.name}}
								</view>
								<view class="zheng-item" v-if="item.is_certify==1">
									证
									</view>
								<view class="size28 txtDarkGray ml20 oneLine" style="width: 200rpx;">
									{{item.school_name}}
									</view>
									
							</view>
							<view class="size24 txtDarkGray" style="margin-top: 8rpx;">
								{{item.teach_age}}年教龄｜{{item.student_num}}名学员｜{{item.distance}}
							</view>
							<view class="u-flex alc" style="margin-top: 24rpx;">
								<view v-for="(item1,index1) in item.tags" :key="item1.id" class="style-tag">
									{{item1.tag_name}}
								</view>
							</view>
						</view>
					</view>
			<view class="add-item">
				报名
			</view>
				</view>
				<view style="height: 50rpx;"></view>
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
				page: 1,
				isLoadMore: false,
				dataList: [],
				type:1,
				search:'',
				tags: [{
						name: '综合排序',
						id: '1'
					},
					{
						name: '距离排序',
						id: '2'
					}
				],
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
				
			}
		},

		onLoad() {
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.page++
				this.getList()
			}

		},
		onShow() {},
		methods: {
			OnPushTeacherDetail(item){
				uni.navigateTo({
					url: '/pages/xjl/teacher/detail?id='+item.id
				});
			},
			OnClickTags(e) {
				if (e.index == 0) {
					this.type = 1
				} else if (e.index == 1) {
					this.type = 2
				}
				this.page = 1
				this.getList()
			},
			Onsearch() {
				this.page = 1
				this.getList()
			},
			getList() {
				this.$xjlrequest.get("/user/home/new_teacher_lists?page_size=20&lng=" + getstorage('lng') +
					"&lat=" + getstorage('lat') + "&page=" + this.page+"&type="+this.type+'&search=' + this.search).then(res => {
					if (res.data.length < 10) {
						this.isLoadMore = true
					}
					if (this.page == 1) {
						this.dataList = res.data
					} else {
						res.data.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}
	.top {
		background: #FFFFFF;
		padding: 24rpx;
		position: fixed;
		top: 0rpx	;
		z-index: 9999;
	}
	.card {
		margin: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.headimg {
		width: 112rpx;
		height: 112rpx;
		border-radius: 130rpx;
		position: relative;
	}
	.top-box {
			width: 57rpx;
			height: 57rpx;
			position: absolute;
			top: -12rpx;
			left: -12rpx;
		}
	
		.else-box {
			position: absolute;
			top: -12rpx;
			left: -12rpx;
			width: 48rpx;
			height: 48rpx;
			background: #38405A;
			border-radius: 164rpx;
			opacity: 1;
			color: #ffffff;
			font-size: 32rpx;
			text-align: center;
			line-height: 48rpx;
	font-family: fantasy;
		}
		.zheng-item{
			width: 28rpx;
			height: 28rpx;
			background: #F9AD29;
			border-radius: 4rpx;
			color: #ffffff;
			font-size: 20rpx;
			text-align: center;
			line-height: 28rpx;
			font-weight: bold;
			margin-left: 10rpx;
		}
		.style-tag{
				font-size: 20rpx;
				color: #D91B1B;
		border: 1rpx solid #DD5959;
		padding: 4rpx 12rpx;
		border-radius: 106rpx;
		margin-right: 12rpx;
			}
			.add-item{
				width: 96rpx;
				height: 48rpx;
				background: #D91B1B;
				border-radius: 122rpx;
				font-size: 28rpx;
				text-align: center;
				line-height: 48rpx;
				color: #ffffff;
			}
			
</style>
