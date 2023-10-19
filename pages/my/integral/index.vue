<template>
	<view class="page">
		<view class="tobbar">
			<view class="search-top" :style="{height:navbarHeight+'px'}">
				<u-navbar title="积分签到" :titleStyle="{ color: '#ffffff', fontSize: '32rpx',fontWeight:'blod' }"
					leftIconColor='#ffffff' leftIconSize='20' bgColor="#D91B1B" :autoBack="true">
				</u-navbar>
			</view>
		</view>
		<view class="top">
			<view class="top-item">
				<view style="margin-left: 54rpx;margin-bottom: 40rpx;">
					<view>
						<text class="score">{{dataList.score}}</text>
						<text class="jifen">积分</text>
					</view>
					<view @click="OnPushOrderDetail" class="u-flex">
						<view class="detail-order">
							<view>
								积分明细
							</view>
							<view style="margin-left: 10rpx;margin-top: 4rpx;">
								<u-icon size="12" name="arrow-right" :bold='true' color="#ffffff"></u-icon>
							</view>
						</view>

					</view>
				</view>
				<view @click="OnPushrule" style="margin-bottom: 40rpx;">
					<image src="@/pages/my/static/image/jifenguize.png" style="width: 138rpx;height: 52rpx"></image>
				</view>
			</view>
		</view>
		<view class="card">
			<view style="font-size: 28rpx;font-weight: bold;">
				已连续<text style="color: #D91B1B;font-size: 48rpx;">{{dataList.continuityDays}}</text>天签到
			</view>
			<u-divider textSize='12' :text="getmonth()"></u-divider>
			<view class="u-flex" style="justify-content: space-around;">

				<view class="day-item" :class="{'day-item-Signed':dataList.signInData.twoDaysBefore==1}">
					{{daylist[0].day}}
				</view>
				<view class="day-item" :class="{'day-item-Signed':dataList.signInData.previousday==1}">
					{{daylist[1].day}}
				</view>
				<view class="day-item" :class="{'day-item-Signed':dataList.signInData.yesterday==1}">
					{{daylist[2].day}}
				</view>
				<view class="day-item" style="border: none;" :class="{'today-singn':dataList.isSignIn==1}">
					{{daylist[3].day}}
					<view class="icon-today" v-if="dataList.isSignIn==1">
						<image style="width: 20rpx;height: 20rpx;" src="@/pages/my/static/image/xiaohongqi.png">

						</image>
					</view>
				</view>
				<view class="day-item" style="border: none;">
					{{daylist[4].day}}
				</view>
				<view class="day-item" style="border: none;">
					{{daylist[5].day}}
				</view>
				<view class="day-item" style="border: none;">
					{{daylist[6].day}}
				</view>
			</view>
			<view class="day-btn">
				<text v-if="dataList.isSignIn==2" @click="Onsingup">
					立即签到
				</text>
				<text style="background: #FFE9E9;color:#D91B1B" v-else>
					已签到
				</text>
			</view>
		</view>
		<view class="card">
			<view class="title">
				做任务赚积分
			</view>
			<view class="task">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/santian.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							连续签到3天
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							连续签到3天额外获得100积分
						</view>
					</view>
				</view>
				<view v-if="dataList.continuityDays<3" class="task-right">
					<text style="background-color: #999999;">{{dataList.continuityDays}}/3</text>
				</view>
				<view v-else class="task-right">
					<text>已领取</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/qitian.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							连续签到7天
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							连续签到7天额外获得200积分
						</view>
					</view>
				</view>
				<view v-if="dataList.continuityDays<7" class="task-right">
					<text style="background-color: #999999;">{{dataList.continuityDays}}/7</text>
				</view>
				<view v-else class="task-right">
					<text>已领取</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/shiwutian.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							连续签到15天
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							连续签到15天额外获得400积分
						</view>
					</view>
				</view>
				<view v-if="dataList.continuityDays<15" class="task-right">
					<text style="background-color: #999999;">{{dataList.continuityDays}}/15</text>
				</view>
				<view v-else class="task-right">
					<text>已领取</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/sanshitian.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							连续签到30天
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							连续签到30天额外获得800积分
						</view>
					</view>
				</view>
				<view v-if="dataList.continuityDays<30" class="task-right">
					<text style="background-color: #999999;">{{dataList.continuityDays}}/30</text>
				</view>
				<view v-else class="task-right">
					<text>已领取</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/yaoqing.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							邀请得积分
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							邀请新用户完成实名认证获得500积分
						</view>
					</view>
				</view>
				<view @click="Oninvitation" class="task-right">
					<text>去完成</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/zhuanfa.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							活动转发得积分
						</view>
						<view style="font-size: 24rpx;color: #999999;width: 430rpx;">
							转发活动获得100积分/次，每天最多获得三次
						</view>
					</view>
				</view>
				<view v-if="dataList.continuit.activityForwarding==0" @click="OnGoHome(1)" class="task-right">
					<text>去完成</text>
				</view>
				<view v-else class="task-right">
					<text style="background-color: #FFE9E9;color: #D91B1B;">已完成</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/pingjia.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							活动评价得积分
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							有效评价(20字以上)获得10积分/次
						</view>
					</view>
				</view>
				<view @click="OnPushwonderfulReview" class="task-right">
					<text>去完成</text>
				</view>
			</view>
			<view class="task" style="margin-top: 50rpx;">
				<view class="task-left">
					<view>
						<image src="@/pages/my/static/image/canyu.png" style="width: 47rpx;height: 47rpx;"></image>
					</view>
					<view style="margin-left: 28rpx;">
						<view style="font-size: 28rpx;font-weight: bold;">
							参与活动得积分
						</view>
						<view style="font-size: 24rpx;color: #999999;">
							免费活动:300分/次 付费活动:500分/次
						</view>
					</view>
				</view>
				<view @click="OnGoHome(2)" class="task-right">
					<text>去完成</text>
				</view>
			</view>
		</view>
		<u-popup bgColor='transparent' :safeAreaInsetBottom='false' :show="showsingup" @close="showsingup=false"
			mode="center">
			<view class="pop">
				<view>
					<image style="width: 648rpx;height: 738rpx;"
						src="https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20221214/eb561bb612084bf3a62ad193b7c826ef.png">
					</image>
				</view>
				<view class="btn">
					<text @click="showsingup=false">
						去完成
					</text>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getstorage,
		tologin
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				currenttagintegral: '0',
				dataList: {},
				detailList: [],
				daylist: [],
				showsingup: false,
				visitinto:null
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
			// if(!tologin()){
			// 	return false
			// }
			this.getdaylist()
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 6
				}).then(res => {
					this.visitinto = res
				})
			}
					this.getList()
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				let height = ''
				uni.getSystemInfo({
					success: (result) => {
						height = result.statusBarHeight + 44
					}
				})
				return height
			},
			contentHeight() {
				return `calc(100vh - ${this.navbarHeight}px - 26rpx)`
			}
		},
	

		methods: {
			Oninvitation() {
				uni.requestSubscribeMessage({
					tmplIds: [
						'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
					],
					success(res) {}
				})
				uni.navigateTo({
					url: '/pages/my/integral/invitation'
				})
			},
			OnPushwonderfulReview() {
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnGoHome(index) {
				if (index == 1) {
					uni.requestSubscribeMessage({
						tmplIds: [
							'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
						],
						success(res) {}
					})
				}
				uni.navigateTo({
					url: '/pages/activity/activityRegistration/bankactivity?'
				})
			},
			Onsingup() {
				let _this = this
				uni.requestSubscribeMessage({
					tmplIds: [
						'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
					],
					success(res) {}
				})
				this.$request.get("/coc-active/api/v2/score/shop/signIn").then(res => {
					if (res.code == 200) {
						this.getList()
						this.showsingup = true
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})

			},
			OnPushOrderDetail() {
				uni.navigateTo({
					url: "/pages/my/integral/component/orderDetail"
				});
			},
			OnPushrule() {
				uni.navigateTo({
					url: "/pages/my/integral/component/index"
				});
			},
			getdaylist() {
				let nowDate = new Date();
				this.daylist.push({
					day: uni.$u.timeFormat(nowDate, 'dd')
				})
				let dayStamp = 24 * 60 * 60 * 1000
				this.daylist.push({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() + dayStamp), 'dd')
				})
				this.daylist.push({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() + 2 * dayStamp), 'dd')
				})
				this.daylist.push({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() + 3 * dayStamp), 'dd')
				})
				this.daylist.unshift({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() - dayStamp), 'dd')
				})
				this.daylist.unshift({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() - 2 * dayStamp), 'dd')
				})
				this.daylist.unshift({
					day: uni.$u.timeFormat(new Date(nowDate.getTime() - 3 * dayStamp), 'dd')
				})
			},
			getmonth() {
				var date = new Date()
				var year = date.getFullYear()
				var month = date.getMonth() + 1
				return year + '年' + month + '月'
			},


			getList() {
				this.$request.get("/coc-active/api/v2/score/shop/scoreSignInExhibition").then(res => {
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.card {
		margin: 24rpx;
		background-color: #ffffff;
		border-radius: 10px;
		padding: 35rpx 25rpx 43rpx 28rpx;

		.title {
			font-size: 32rpx;
			font-weight: bold;
			margin-bottom: 56rpx;
		}
	}

	.top {
		width: 750rpx;
		height: 243rpx;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAvAAAADzCAYAAADgrSL9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMkMzQ0Y5QzdBQTgxMUVEOTlFNTlGRTdFNjZERkYxRSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMkMzQ0Y5RDdBQTgxMUVEOTlFNTlGRTdFNjZERkYxRSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkIyQzNDRjlBN0FBODExRUQ5OUU1OUZFN0U2NkRGRjFFIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkIyQzNDRjlCN0FBODExRUQ5OUU1OUZFN0U2NkRGRjFFIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oq1xtAAAny9JREFUeNrsvQeAJFd1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');
		background-size: 100% 100%;
		display: flex;
		margin-bottom: -66rpx;

		.top-item {
			width: 750rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;


			.score {
				font-size: 64rpx;
				color: #ffffff;
				font-weight: bold;
			}

			.jifen {
				font-size: 24rpx;
				color: #ffffff;
				font-weight: bold;
				margin-left: 10rpx;
			}

			.detail-order {
				font-size: 24rpx;
				color: #ffffff;
				display: flex;
				align-items: center;
			}
		}
	}

	.pop {
		.btn {
			text-align: center;
			background-color: #FFFFFF;
			margin-top: -40rpx;
			padding-bottom: 40rpx;
			border-radius: 10rpx;

			text {
				width: 300rpx;
				height: 80rpx;
				background-color: #d91b1b;
				border-radius: 10rpx;
				color: #ffffff;
				font-size: 32rpx;
				line-height: 80rpx;
				display: inline-block;
				border-radius: 40rpx;
			}
		}
	}

	.day-item {
		background-color: #f8f8f8;
		border-radius: 10rpx;
		padding: 24rpx;
		font-size: 24rpx;
		color: #999999;
		border: 1rpx dashed #999999;
	}

	.day-item-Signed {
		background-color: #FFE9E9;
		border: none;
	}

	.today-singn {
		background-color: #FFE9E9;
		border: none;
		position: relative;
	}

	.icon-today {
		position: absolute;
		right: 0rpx;
		top: 0rpx;
	}

	.day-btn {
		margin-top: 40rpx;
		text-align: center;

		text {
			font-size: 32rpx;
			color: #ffffff;
			background: #D91B1B;
			border-radius: 40px;
			font-weight: bold;
			height: 80rpx;
			width: 360rpx;
			display: inline-block;
			text-align: center;
			line-height: 80rpx;

		}
	}

	.task {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.task-left {
			display: flex;
			align-items: center;
		}

		.task-right {
			text {
				display: inline-block;
				width: 100rpx;
				height: 50rpx;
				border-radius: 25px;
				background: #D91B1B;
				font-weight: bold;
				color: #FFFFFF;
				font-size: 24rpx;
				line-height: 50rpx;
				text-align: center;
			}
		}
	}

	.tobbar {
		color: #ffffff;
	}

	.pop {}
</style>
