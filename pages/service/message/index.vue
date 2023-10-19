<template>
	<view class="page">
		<view class="search-top">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot" slot="center">
					<view class="u-flex" style="margin-left: 100rpx;margin-right: 20rpx;">
						<u-search :showAction='false' @search='getList' placeholder="搜索消息" v-model="name">
						</u-search>
			
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view class="u-flex">
						<u-search :showAction='false' @search='getList' placeholder="搜索消息" v-model="name">
						</u-search>
					
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 26%;"></view>
		<!-- 系统消息这一块 -->
		<view class="system">
			<view @click="OnPushservice" class="card">
				<view class="u-flex">
					<view>
						<image mode="widthFix" style="width: 88rpx;" :src='dataList.systemAnnouncement.headImg'></image>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 32rpx;color: #222222;font-weight: bold;">
							{{dataList.systemAnnouncement.nickname}}
						</view>
						<view v-if="dataList.systemAnnouncement.count>0">
							<text
								style="	font-size: 24rpx;color: #d91b1b;">[{{dataList.systemAnnouncement.count}}条]</text>
							<text style="font-size: 24rpx;">{{dataList.systemAnnouncement.newTitle}}</text>
						</view>
					</view>
				</view>
				<view v-if="dataList.systemAnnouncement.newTime" style="font-size: 24rpx;color: #999999;">
					{{gettiem(dataList.systemAnnouncement.newTime)}}
				</view>
			</view>
			<view @click="OnPushDiscount" class="card">
				<view class="u-flex">
					<view>
						<image mode="widthFix" style="width: 88rpx;" :src='dataList.eventAnnouncement.headImg'></image>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 32rpx;color: #222222;font-weight: bold;">
							{{dataList.eventAnnouncement.nickname}}
						</view>
						<view v-if="dataList.eventAnnouncement.count>0">
							<text
								style="	font-size: 24rpx;color: #d91b1b;">[{{dataList.eventAnnouncement.count}}条]</text>
							<text style="font-size: 24rpx;">{{dataList.eventAnnouncement.newTitle}}</text>
						</view>
					</view>
				</view>
				<view style="font-size: 24rpx;color: #999999;" v-if="dataList.eventAnnouncement.newTime">
					{{gettiem(dataList.eventAnnouncement.newTime)}}
				</view>
			</view>
		</view>
		<!-- 私信 -->
		<view class="private">
			<view v-for="(item,index) in dataList.lists" :key="index" class="card" @click="OnPushInfo(item)">
				<view class="u-flex">
					<view>
						<image style="width: 100rpx;height: 88rpx;" :src='item.headImg'></image>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 32rpx;color: #222222;font-weight: bold;">
							{{item.nickname}}
						</view>
						<view v-if="item.count>0">
							<text style="	font-size: 24rpx;color: #d91b1b;">[{{item.count}}条]</text>
							<text style="font-size: 24rpx;">{{item.newTitle}}</text>
						</view>
					</view>
				</view>
				<view style="font-size: 24rpx;color: #999999;" v-if="item.newTime">
					{{gettiem(item.newTime)}}
				</view>
			</view>
		</view>
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
				a: false,
				name: '',
				dataList: {}
			}
		},

		onLoad() {


		},
		onShow() {
			this.getList()
			this.connectSocket()
		},
		methods: {
			connectSocket() {
				let _this = this
				let userId = getstorage('userId')

				uni.connectSocket({
					url: 'ws://172.16.91.149：28082/ws/queue/' + userId,
					data() {
						return {
							x: '',
							y: ''
						};
					},
					header: {
						'content-type': 'application/json'
					},
					method: 'GET',
					success: () => {
						uni.onSocketMessage(function(res) {
							let obj = JSON.parse(res.data)
							if (obj.code == 200) {
								if (obj.type == 0) {

									if (_this.dataList.lists.length == 0) {
										_this.dataList.lists = [{
											count: obj.count,
											id: obj.id,
											headImg: obj.headImg,
											newTime: obj.newTime,
											newTitle: obj.newTitle,
											nickname: obj.nickname,
											type: obj.type
										}]
									} else {
										_this.a = false
										_this.dataList.lists.filter((s, i) => {
											if (s.id == obj.id) {
												_this.dataList.lists[i].count = obj.count
												_this.dataList.lists[i].newTime = obj.newTime
												_this.dataList.lists[i].newTitle = obj.newTitle
												_this.a = true
											} else if (s.id != obj.id) {
												_this.dataList.lists.push({
													count: obj.count,
													id: obj.id,
													headImg: obj.headImg,
													newTime: obj.newTime,
													newTitle: obj.newTitle,
													nickname: obj.nickname,
													type: obj.type
												})
											}
										})
										for (var i = 0; i < _this.dataList.lists.length; i++) {
											for (var j = i + 1; j < _this.dataList.lists.length; j++) {
												if (_this.dataList.lists[i].id == _this.dataList.lists[
														j].id) {
													_this.dataList.lists.splice(j, 1)
													j--
												}
											}
										}
									}
								} else if (obj.type == 1) {
									_this.dataList.systemAnnouncement.push({
										count: obj.count,
										id: obj.id,
										headImg: obj.headImg,
										newTime: obj.newTime,
										newTitle: obj.newTitle,
										nickname: obj.nickname,
										type: obj.type
									})
								} else if (obj.type == 2) {
									_this.dataList.eventAnnouncement.push({
										count: obj.count,
										id: obj.id,
										headImg: obj.headImg,
										newTime: obj.newTime,
										newTitle: obj.newTitle,
										nickname: obj.nickname,
										type: obj.type
									})
								}

							}
						})
					}
				});
			},
			OnPushInfo(item) {
				uni.navigateTo({
					url: '/pages/service/message/detail?type=0?type=0',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: item
						})
					}
				})
			},
			OnPushDiscount() {
				//转跳优惠福利
				//转跳服务通知
				let item = {
					id: null,
					nickname: '优惠福利'
				}
				uni.navigateTo({
					url: '/pages/service/message/detail?type=2',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: item
						})
					}
				})
			},
			OnPushservice() {
				//转跳服务通知
				let item = {
					id: null,
					nickname: '服务通知'
				}
				uni.navigateTo({
					url: '/pages/service/message/detail?type=1',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: item
						})
					}
				})
			},
			gettiem(dateTimeStamp) {
				let newdate = Date.parse(dateTimeStamp)
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - newdate;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = ''
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;
			},
			OnMyManager() {
				uni.navigateTo({
					url: '/pages/my/myManager/index'
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v1/news/findMessages", {
					name: this.name
				}).then(res => {
					this.dataList = res.data
				})
			},

		}
	}
</script>

<style lang="scss">
	.page {}

	.search-top {
		width: 440rpx;
		margin-left: -100rpx;
	}

	.system {
		margin-top: 40rpx;
	}

	.card {
		background-color: #ffffff;
		border-radius: 10rpx;
		margin: 20rpx;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}

	.private {
		margin-top: 40rpx;
	}
</style>
