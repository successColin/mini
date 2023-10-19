<template>
	<view class="page">

		<view class="top-img">
			<image style="width: 750rpx;height: 184rpx;" src="../static/image/renzhengchexing.png"></image>
		</view>
		<view class="background-white">
			<view class="scanning-btn">
				<!--  #ifdef MP-WEIXIN  -->
				<ocr-navigator @onSuccess="driverSuccess" certificateType="drivingLicense"
					selectedOptions="{['plateNum','vehicleType','owner']}">
					<image style="width: 40rpx;height: 37rpx;margin-right: 10rpx;position: relative;top: 5rpx;"
						src="../static/image/saomiao.png"></image>
					扫描行驶证认证车型
				</ocr-navigator>
				<!--  #endif -->
			
			</view>

			<view class="secrecy-info">
				<image style="width: 26rpx;height: 30rpx;margin-right: 10rpx;position: relative;
    top: 5rpx;" src="../static/image/baozheng.png"></image>
				行驶证信息仅用于认证，我们将为您严格保密
			</view>
			<view class="three-icon">
				<view>
					<image style="width: 63rpx;height: 65rpx;" src="../static/image/tehui.png"></image>
					<view>保险车险特惠</view>
				</view>
				<view>
					<image style="width: 63rpx;height: 65rpx;" src="../static/image/naozhong.png"></image>
					<view>保险到期提醒</view>
				</view>
				<view>
					<image style="width: 63rpx;height: 65rpx;" src="../static/image/kefu.png"></image>
					<view>专属服务顾问</view>
				</view>
			</view>
			<view class="card">
				<view class="title">
					认证常见问题
				</view>
				<view class="hr"></view>
				<view v-for="(item,index) in list" :key="index" style="margin-top: 20rpx;">
					<view>
						<text class="wen">问</text><text class="question">{{item.question}}</text>
					</view>
					<view style="margin-top: 10rpx;">
						<text class="da">答</text><text class="answer">{{item.answer}}</text>
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
				id: "",
				list: [{
						question: '车型认证需要什么信息？',
						answer: '车牌号、车辆识别代码（VIN）、行驶证照片。'
					},
					{
						question: '为什么会认证失败？？',
						answer: '车型信息填写有误，车型信息忆被认证，车型信息失效，行驶证照片模糊太暗、遮挡均不予通过认证。'
					},
					{
						question: '重新认证和申诉需要什么信息？？',
						answer: '为保证数据真实性，重新认证和申诉需要额外提供身份证下面找照片。'
					},
					{
						question: '多长时间可以通过审核？？',
						answer: '1-3个工作日内。'
					},
					{
						question: '认证成功后，我的车型信息有变动怎么办？？？',
						answer: '请重新认证。'
					}
				],
				dataList: {
					name: '奥迪 Q5L'
				}
			}
		},

		onLoad(option) {
			this.id = option.id
		},
		onShow() {},
		methods: {

			pushrenzheng(e) {
				uni.navigateTo({
					url: '/pages/my/mycar/authenticationindex?id=' + this.id,
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: e.detail
						})
					}
				})
			},
			driverSuccess(e) {
				let _this = this
				uni.uploadFile({
					url: getApp().globalData.uploadUrl,
					filePath: e.detail.image_path,
					name: 'file',
					formData: {
						'file': e.detail.image_path
					},
					header: {
						"Content-Type": 'multipart/form-data'
					},
					success: (uploadFileRes) => {
						e.detail.path = JSON.parse(uploadFileRes.data).data
						_this.pushrenzheng(e)
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.top-img {
		margin-top: 20rpx;
		text-align: center;
	}

	.background-white {
		text-align: center;
		background-color: #ffffff;
		margin-top: -20rpx;

		.scanning-btn {
			display: inline-block;
			background-image: linear-gradient(-23deg,
					#d91b1b 0%,
					#f24141 100%),
				linear-gradient(#d91b1b,
					#d91b1b);
			background-blend-mode: normal,
				normal;
			border-radius: 40rpx;
			padding: 16rpx 60rpx;
			margin-top: 40rpx;
			font-size: 32rpx;
			color: #ffffff;
			font-weight: bold;
		}

		.secrecy-info {
			display: inline-block;
			background-color: #f8f8f8;
			border-radius: 14rpx;
			font-size: 24rpx;
			color: #666666;
			margin-top: 40rpx;
			padding: 10rpx 40rpx;
		}

		.three-icon {
			margin-top: 40rpx;
			display: flex;
			justify-content: space-around;
			font-size: 24rpx;
			color: #666666;
		}

		.card {
			margin: 20rpx;
			background-color: #f8f8f8;
			border-radius: 14rpx;
			padding: 30rpx;
			text-align: left;

			.title {
				font-size: 32rpx;
				font-weight: bold;
			}

			.hr {
				width: 650rpx;
				height: 1rpx;
				background-color: #999999;
				text-align: center;
				margin-top: 40rpx;
			}

			.wen {
				color: white;
				font-size: 24rpx;
				background-color: #d91b1b;
				border-radius: 5rpx;
				padding: 5rpx 8rpx;
				margin-right: 10rpx;
			}

			.da {
				color: white;
				font-size: 24rpx;
				background-color: #5488ff;
				border-radius: 5rpx;
				padding: 5rpx 8rpx;
				margin-right: 10rpx;
			}

			.question {
				font-size: 28rpx;
				font-weight: bold;
			}

			.answer {
				font-size: 24rpx;
			}
		}
	}
</style>
