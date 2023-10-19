<template>
	<view class="page">
		<view class="top">
			<view>
				<image :src="dataList.class_type_img"
					style="width: 100%;height: 380rpx;border-radius: 16rpx 16rpx 0 0;"></image>
			</view>
			<view class="top-card">
				<view>
					<view class="size32 fwb">
						{{dataList.class_name_text}}
					</view>
					<view class="txtLighGray size28 mt10">
						{{dataList.study_car_time_text}}｜{{dataList.transfer_mode_text}}｜{{dataList.num_per_car_text}}
					</view>
				</view>
				<view class="mainRed fwb " style="font-size: 40rpx;">
					¥{{dataList.course_cost}}
				</view>
			</view>
		</view>

		<view class="card u-flex alc">
			<view>
				<u-avatar size="56" :src="dataList.teacher_info.head_img"></u-avatar>
			</view>
			<view style="margin-left: 54rpx;">
				<view>
					<view class="u-flex alc">
						<view class="size32 fwb oneLine">
							{{dataList.teacher_info.name}}
						</view>
						<view class="size28 txtDarkGray ml20 oneLine" style="width: 200rpx;">
							{{dataList.teacher_info.school_name}}
						</view>
						<view class="zheng-item" v-if="dataList.teacher_info.is_certify==1">
							证
						</view>
					</view>
				</view>
				<view class="size24 txtDarkGray" style="margin-top: 8rpx;">
					{{dataList.teacher_info.teach_age}}年教龄｜{{dataList.teacher_info.student_num}}名学员｜{{dataList.teacher_info.distance}}
				</view>
				<view class="u-flex alc" style="margin-top: 24rpx;">
					<view v-for="(item1,index1) in dataList.teacher_info.rel_teacher_tags" :key="index1"
						class="style-tag">
						{{item1}}
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title">班级信息</view>
			<view class="title-bottom"></view>
			<view class="table-item">
				<view class="first-table">
					<view class="table-left">训练科目</view>
					<view class="table-mid">科目二</view>
					<view class="table-right">科目三</view>
				</view>
				<view class="first-table">
					<view class="table-left">车辆分配</view>
					<view class="table-mid">{{dataList.num_per_car_text}}</view>
					<view class="table-right">{{dataList.num_per_car_text}}</view>
				</view>
				<view class="first-table">
					<view class="table-left">学车时间</view>
					<view class="one-th">{{dataList.study_car_time_text}}</view>
				</view>
				<view class="first-table" style="border-bottom: 0rpx solid">
					<view class="table-end">接送形式</view>
					<view class="one-th">{{dataList.transfer_mode_text}}</view>
				</view>
			</view>
		</view>
		<view class="card">
			<u--textarea disabled  border="none" v-model="dataList.class_describe"></u--textarea>
		</view>
		<view class="btn" @click="OnAdd">
			立即咨询
		</view>
		<view style="height: 50rpx;">
		</view>
		<u-toast ref="uToast"></u-toast>
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
				id: '',
				dataList: {},
				student_remark: '',
				user_name:'',
				mobile:'',
				school_id:'',
				teacher_id:''
			}
		},

		onLoad(option) {
			this.id = option.id
			this.school_id=option.school_id
			this.teacher_id=option.teacher_id
			this.user_name=getstorage('realName')
			this.mobile=getstorage('mobile')
			this.getList()
		},
		onShow() {},
		methods: {
			OnAdd() {
				this.$tokenxjlrequest.post("/user/home/add_student_clue",{
					token:getstorage('xjltoken'),
					user_name:this.user_name,
					mobile:this.mobile,
					driver_license:this.dataList.driver_license,
					student_remark:this.student_remark,
					teacher_id:this.school_id,
					source:'1'
				}).then(res=>{
					if(res.code==200){
						this.$refs.uToast.show({
							message: '报名成功',
							type: "default",
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}else{
						uni.$u.toast(res.msg)
					}
				})
			
			},
			getList() {
				this.$xjlrequest.newget('/user/home/get_class_type_detail', {
					id: this.id
				}).then(res => {
					res.data.course_cost = Math.trunc(res.data.course_cost)
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top {
		margin: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.top-card {
		background-color: #ffffff;
		padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card {
		margin: 24rpx;
		padding: 16rpx 24rpx 24rpx;
		background-color: #ffffff;
	}

	.zheng-item {
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

	.style-tag {
		font-size: 20rpx;
		color: #D91B1B;
		border: 1rpx solid #DD5959;
		padding: 4rpx 12rpx;
		border-radius: 106rpx;
		margin-right: 12rpx;
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

	.table-item {
		height: 400rpx;
		width: 100%;
		border: 2rpx #E05A5D solid;
		border-radius: 16rpx;
		margin-top: 34rpx;
	}

	.first-table {
		display: flex;
		border-bottom: 1rpx #E05A5D solid;
	}

	.table-left {
		font-size: 28rpx;
		color: #E05A5D;
		text-align: center;
		height: 99rpx;
		background-color: #FEF8F8;
		width: 33.333333333333333333333%;
		border-radius: 16rpx 0 0 0;
		line-height: 99rpx;
	}

	.table-end {
		font-size: 28rpx;
		color: #E05A5D;
		text-align: center;
		height: 99rpx;
		background-color: #FEF8F8;
		width: 33.333333333333333333333%;
		border-radius: 0 0 0 16rpx;
		line-height: 99rpx;
	}

	.table-mid {
		height: 99rpx;
		width: 33.333333333333333333333%;
		line-height: 99rpx;
		color: #666666;
		text-align: center;
		font-size: 24rpx;
		border-right: 1rpx #E05A5D solid;
	}

	.table-right {
		height: 99rpx;
		width: 33.333333333333333333333%;
		line-height: 99rpx;
		color: #666666;
		text-align: center;
		font-size: 24rpx;
	}

	.one-th {
		height: 99rpx;
		width: 100-33.333333333333333333333%;
		line-height: 99rpx;
		color: #666666;
		text-align: center;
		font-size: 24rpx;
	}

	.btn {
		width: 494rpx;
		height: 84rpx;
		background: #D91B1B;
		border-radius: 174rpx;
		color: #ffffff;
		font-size: 28rpx;
		font-weight: bold;
		line-height: 84rpx;
		text-align: center;
		margin: 56rpx auto;
	}
</style>
