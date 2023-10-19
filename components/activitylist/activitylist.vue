<template>
	<view class="page">
		<view class="u-flex" style="flex-wrap: wrap;justify-content: space-between;">
			<view v-for="(item,index) in dataList" :key="index"
			@click="OnPushDetail(item)"
				style="position: relative;background-color: #f8f8f8;margin-bottom: 20rpx;border-radius: 0rpx 0rpx 10rpx 10rpx;padding-bottom: 20rpx;">
				<view>
					<image :style="{width:width,height:height}"
						style="width: 310rpx;height: 310rpx;border-radius: 10rpx 10rpx 0 0;" :src="item.coverPicture">
					</image>
				</view>
				<view v-if="item.signUpStatus==2" class="strat-time">
					<view style="font-size: 24rpx;color:rgb(255,255,255,1);text-align: center;opacity: 1;">
						{{getmonthday(item.activityBeginTime)}}
					</view>
					<view style="font-size: 20rpx;color:rgb(255,255,255,1);text-align: center;opacity:1;">
						{{gettime(item.activityBeginTime)}}开始
					</view>
				</view>
				<view v-if="item.signUpStatus==2" class="sing-up">
					报名中{{item.saleNum}}/{{item.stock}}
				</view>
				<view v-if="item.signUpStatus==5||item.signUpStatus==4||item.signUpStatus==3"
				style="position: absolute;top: 0rpx;"
					 >
					<image :style="{width:width,height:height}" src="https://oss.dcqcjlb.com/51che_java_dev/20230328/file_1679972339365.png"></image>
				</view>
				<view class="four-title">
					{{item.title}}
				</view>
				<view style="display: flex;justify-content: space-between;margin-top: 10rpx;">
					<view style="font-size: 20rpx;color: #D91B1B;font-weight: bold;line-height: 45rpx;margin-left: 20rpx;">
						<text v-if="item.payType==2"><text style="font-size: 28rpx;"><text
									style="font-size: 20rpx;">¥</text>{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice}}</text><text
								style="margin-left: 4rpx;">起</text></text>
						<text v-if="item.payType==1" style="font-size: 24rpx;">免费参与</text>
					</view>
					<view class="four-btn">
						<text v-if="item.signUpStatus==1">活动未开始</text>
						<text v-else-if="item.signUpStatus==2">参与报名</text>
						<text v-else-if="item.signUpStatus==5||item.signUpStatus==4||item.signUpStatus==3">我要预约</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {

			}
		},
		props: {
			width: {
				type: String,
				default: '340rpx'
			},
			height: {
				type: String,
				default: '340rpx'
			},
			dataList: {
				type: Array,
			},

		},
		onLoad() {
		},
		onShow() {},
		methods: {
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			getmonthday(time) {
				return time.substr(0, 5)
			},
			gettime(time) {
				return time.substr(6, 11)
			},
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 25rpx;
	}

	.strat-time {
		background: #000000;
		opacity: 0.6;
		border-radius: 10rpx;
		position: absolute;
		// z-index: 999;
		top: 15rpx;
		left: 15rpx;
		padding: 4rpx 10rpx;

	}

	.sing-up {
		background: #000000;
		opacity: 0.6;
		border-radius: 10rpx;
		font-size: 20rpx;
		color: #ffffff;
		text-align: center;
		position: absolute;
		bottom: 160rpx;
		right: 15rpx;
		padding: 4rpx 10rpx;
	}

	.four-title {
		margin-left: 20rpx;
		width: 320rpx;
		font-size: 28rpx;
		font-weight: bold;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		margin-top: 20rpx;
	}
	.four-btn {
		margin-right: 20rpx;
	
		text {
			display: inline-block;
			font-size: 20rpx;
			color: #ffffff;
			background-color: #D91B1B;
			text-align: center;
			border-radius: 10rpx;
			width: 100rpx;
			height: 40rpx;
			line-height: 40rpx;
		}
	}
</style>
