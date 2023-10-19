<template>
	<view class="page">
		<view>
			<image :src="dataList.coverPicture" style="width: 100%;height: 260rpx;"></image>
		</view>
		<view v-if="istimeend&&dataList.isExpertSignUp==0" class="icon-img">
			<view class="u-flex alc" style="margin-left: 15rpx;">
				<view>报名时间还剩</view>
				<view class="countview">
					<u-count-down :time="counttime" format="HH:mm:ss" autoStart millisecond @change="onChange">
						<view class="time">
							<view class="time__custom">
								<text class="time__custom__item">{{ timeData.days }}</text>
							</view>
							<text class="time__doc mt10">天</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ timeData.hours}}</text>
							</view>
							<text class="time__doc">:</text>
							<view class="time__custom">
								<text class="time__custom__item">{{ timeData.minutes  }}</text>
							</view>
						</view>
					</u-count-down>
				</view>
			</view>
			<view class="txtColorWhite" style="margin-right: 70rpx;">
				立即报名
			</view>
		</view>
		<view class="card">
			<view class="fwb size28">{{dataList.name}}</view>
			<view class="txtLighGray size28 mt10 oneLine">
				{{dataList.intro}}
			</view>
			<view class="u-flex alc" style="margin-top: 15rpx;">
				<view v-if="dataList.expertSignUpCount>0" style="margin-right: 60rpx;">
					<view v-if="dataList.signUpExpertList.length<4" class="u-flex">
						<view v-for="(item,index) in dataList.signUpExpertList" :key="item.userId" style="margin-right: -30rpx;">
							<u-avatar size="30" :src="item.headImg"></u-avatar>
						</view>
					</view>
					<view v-else class="u-flex">
						<view v-for="(item,index) in dataList.newsignUpExpertList" :key="item.userId" style="margin-right: -30rpx;">
							<u-avatar size="30" :src="item.headImg"></u-avatar>
						</view>
					</view>
				</view>
				<view class="size28 mainRed" >
					已报名 {{dataList.expertSignUpCount}}
				</view>
			</view>
		</view>
		<view class="card">
			<view class="fwb size28">报名须知</view>
			<view class="mt20 txtLighGray size24">
				报名时间
			</view>
			<view class="size28" style="margin-top: 6rpx;">
				{{dataList.rushPurchaseBeginTime}}至{{dataList.rushPurchaseEndTime}}
			</view>
			<view class="mt20 txtLighGray size24">
				发帖时间
			</view>
			<view class="size28" style="margin-top: 6rpx;">
				{{dataList.planDate}}
			</view>
			<view class="mt20 txtLighGray size24">
				活动规则
			</view>
			<view class="size28" style="margin-top: 6rpx;">
				<u-parse :content="dataList.detail"></u-parse>
			</view>
		</view>
		<view v-if="istimeend&&dataList.isExpertSignUp==0" class="btn-bottom" @click="Onadd">
			我要报名
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				id: '',
				dataList: {},
				type: '',
				counttime: '',
				timeData: {},
				istimeend: true,
			}
		},

		onLoad(option) {
			this.id = option.id
			this.type = option.type
			this.getList()
		},
		onShow() {},
		methods: {
			Onadd(){
				this.$request.post("/coc-active/api/v1/expert/merchant_plan/sign_up/signUp",{
					id:this.id
				}).then(res=>{
					if(res.code==200){
						uni.$u.toast('报名成功')
						this.getList()
					}else{
						uni.$u.toast(res.message)
					}
				})
			},
			onChange(e) {
				this.timeData = e
				if (e.days == 0 && e.hours == 0 && e.minutes == 0 && e.seconds == 0) {
					this.istimeend = false
				}
			},
			getList() {
				this.$request.post("/coc-merchant-app/app/v2/traffic/support/plan/planDetail", {
					id: this.id
				}).then(res => {
					var date = new Date(res.data.countdownTime)
					var timestamp = date.getTime()
					if(res.data.signUpExpertList.length>3){
						res.data.newsignUpExpertList=res.data.signUpExpertList
						res.data.newsignUpExpertList.push({
							planId:this.id,
							nickname:'',
							userId:0,
							headImg:'https://oss.dcqcjlb.com/51che_java_dev/20231009/file_1696812337760.png'
						})
					}
					this.counttime = timestamp - new Date().getTime()
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.icon-img {
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20231006/file_1696581111796.png");
		background-size: 100% 100%;
		width: 704rpx;
		height: 77rpx;
		margin: 23rpx auto;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #ffffff;
		line-height: 77rpx;
	}

	.time {
		@include flex;
		align-items: center;

		&__custom {
			margin-top: 4px;
			width: 22px;
			height: 22px;
			background-color: #ffffff;
			border-radius: 4px;
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			justify-content: center;
			align-items: center;

			&__item {
				color: #EB2E01;
				font-size: 12px;
				text-align: center;
			}
		}

		&__doc {
			color: #ffffff;
			padding: 0px 4px;
		}

		&__item {
			color: #606266;
			font-size: 15px;
			margin-right: 4px;
		}
	}

	.countview {
		margin-left: 4rpx;
		position: relative;
		bottom: 4rpx;
	}

	.card {
		margin: 25rpx;
		border-radius: 15rpx;
		background: #FFFFFF;
		padding: 25rpx;
	}

	.btn-bottom {
		width: 656rpx;
		height: 81rpx;
		background: #D91B1B;
		border-radius: 131rpx;
		text-align: center;
		line-height: 81rpx;
		position: absolute;
		bottom: 100rpx;
		left: 50%;
		transform: translate(-50%, 0%);
		color: #FFFFFF;
	}
</style>