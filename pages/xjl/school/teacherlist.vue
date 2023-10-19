<template>
	<view class="page">
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
							<view class="size32 fwb oneLine" style="margin-right: 24rpx;">
								{{item.name}}
								</view>
								<!-- <view class="size28 txtDarkGray ml20 oneLine" style="width: 200rpx;">
									{{item.school_name}}
									</view> -->
									<view class="zheng-item" v-if="item.is_certify==1">
										证
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
			<view class="add-item" @click.stop="OnPushSingup(item)">
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
				id:'',
				page: 1,
				isLoadMore: false,
				dataList: [],
				type:1,
				search:'',				
			}
		},

		onLoad(option) {
			this.id=option.id
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
			OnPushSingup(item){
				let _this=this
				this.$tokenxjlrequest.get('/user/home/getTeachersInfo?teacher_id=' + item.id +
					'&token='+getstorage('xjltoken')).then(res=>{
						uni.navigateTo({
							url: '/pages/xjl/teacher/singup?id=' + item.id,
							success: function (r) {
							  r.eventChannel.emit('sendlist', {
							    data: res.data
							  })
							}
						});
					})
		
			},
			OnPushTeacherDetail(item){
				uni.navigateTo({
					url: '/pages/xjl/teacher/detail?id='+item.id
				});
			},			
			getList() {
				this.$xjlrequest.get("/user/home/new_teacher_lists?page_size=20&lng=" + getstorage('lng') +
					"&lat=" + getstorage('lat') + "&page=" + this.page+"&type="+this.type+'&search=' + this.search+'&school_id='+this.id).then(res => {
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
