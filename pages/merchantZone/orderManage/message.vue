<template>
	<view class="page">
		<view class="search-top">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot" slot="center">
					<view class="u-flex">
						{{info.nickname}}
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view class="u-flex">
						{{info.nickname}}
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 26%;"></view>
		<view v-for="(item,index) in dataList" :key="index" :class="item.sourceUserId==userId?'me-class':null">
			<view class="time" v-if="item.createdAt!=dataList[index-1].createdAt">{{item.createdAt}}</view>
			<view v-if="item.sourceUserId==userId" class="message-me">
				<view style="margin-right: 20rpx;">
					<view class="title">
						<text style="margin-right: 20rpx;">我</text>
						<!-- <text>{{item.createdAt}}</text> -->
					</view>
					<view class="question">
						{{item.content}}
					</view>
				</view>
				<view>
					<u-avatar shape="square" :src="headImg" size="35"></u-avatar>
				</view>
			</view>
			<view class="message-zn" v-else>
				<u-avatar shape="square" :src="item.sourceUserImg" size="35"></u-avatar>
				<view style="margin-right: 20rpx;">
					<view class="title">
						<!-- <text>{{item.createdAt}}</text> -->
					</view>
					<view v-if="type==2" class="defaultAnswer" @click="OnGetCounpon(item)">
						<view style="position: relative;top: 9rpx;">
							{{item.title}}
						</view>
						<view style="margin-top: 30rpx;">
							<image mode="widthFix" style="width: 400rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20221025/505741bd6f9f4697bab56db2c561d97e.png">
							</image>
						</view>
					</view>
					<view v-else class="defaultAnswer">
						<view>{{item.content}}</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 400rpx;"></view>
		<view v-if="type==0" class="bottom-chat">
			<view class="u-input">
				<view class="input">
					<u--input v-model="msg" placeholder="请输入对话内容"></u--input>
				</view>
				<view @click="Onsendout" class="btn-send">
					<view>发送</view>
					<view>
					<!-- 	<image style="width: 30rpx;height: 24rpx;" src="../static/image/zhifeiji.png"></image> -->
					</view>
				</view>
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
				isLoadMore: false,
				headImg: '',
				id: '',
				msg: '',
				info: {},
				dataList: [],
				userId: '',
				current: 1,
				type: ''
			}
		},
		onUnload() {
			uni.closeSocket({})
		},
		onLoad(option) {
			this.headImg = getstorage("headImg")
			let _this = this
			this.type = option.type
			this.userId = getstorage("userId")
			_this.id = option.id
			_this.info = {
				id: option.id,
				nickname: option.nickname
			}
			_this.connectSocket(option.id)
			_this.getrecord(option.id)
		
		},
		onShow() {},
		onPullDownRefresh() {
			if (!this.isLoadMore) {
				this.current++
				this.pushgetrecord()
			}

		},
		methods: {
			OnGetCounpon(item) {
				// 红包领取
				if (item.couponType == 1) {
					uni.navigateTo({
						url: "/pages/merchantZone/receive/receiveCoupon?couponid=" + item.relId
					})
				} else if (item.couponType == 2) {
					uni.navigateTo({
						url: "/pages/merchantZone/receive/receiveyouhuiCoupon?couponid=" + item.relId
					})
				}

			},
			scrollToBottom() {
				this.$nextTick(function() {
					setTimeout(() => {
						uni.pageScrollTo({
							scrollTop: 99999,
							duration: 0
						})
					}, 200) // 要加点延迟, 不然有可能不生效
				})
			},
			pushgetrecord() {
				this.$request.post("/coc-active/api/v1/news/findMessage", {
					id: this.id,
					size: 5,
					current: this.current,
					type: this.type
				}).then(res => {
					if (res.data.records.length < 5) {
						this.isLoadMore = true
					} else {
						res.data.records.filter(s => {
							this.dataList.unshift(s)
						})
					}
				})
			},
			getrecord(id) {
				this.$request.post("/coc-active/api/v1/news/findMessage", {
					id: this.id,
					size: 5,
					current: this.current,
					type: this.type
				}).then(res => {
					this.dataList = res.data.records
					this.scrollToBottom()
				})
			},
			Onsendout() {
				let _this = this
				let date = new Date();
				let day = date.getDate()
				let month = date.getMonth() + 1
				let hours = date.getHours()
				let minutes = date.getMinutes()
				let year = date.getFullYear()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				let time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
				this.$request.post("/coc-active/api/v1/news/sendMessage", {
					message: this.msg,
					userId: this.id,
				}).then(res => {
					if (res.code == 200) {
						_this.dataList.push({
							content: this.msg,
							createdAt: time,
							sourceUserId: getstorage("userId"),
							sourceUserImg: getstorage("headImg")
						})
						this.msg = ''
						this.scrollToBottom()
					}
				})
			},
			connectSocket(id) {
				let _this = this
				let date = new Date();
				let day = date.getDate()
				let month = date.getMonth() + 1
				let hours = date.getHours()
				let minutes = date.getMinutes()
				let year = date.getFullYear()
				if (hours < 10) {
					hours = '0' + hours
				}
				if (minutes < 10) {
					minutes = '0' + minutes
				}
				let time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes
				uni.connectSocket({
					url: 'ws://cocuat.51api.dcqcjlb.com:28082/ws/message/' + _this.userId + '/' + id,
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
								_this.dataList.push({
									content: obj.message,
									createdAt: time,
									sourceUserId: _this.id,
									sourceUserImg: getstorage("headImg")
								})
							}
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.me-class {
		display: flex;
		justify-content: flex-end;
	}

	.time {
		text-align: center;
		font-size: 24rpx;
		color: #999999;
	}

	.message-me {
		// float: right;
		margin-top: 40rpx;
		margin-right: 40rpx;
		display: flex;
		justify-content: flex-end;

		.title {
			font-size: 24rpx;
			color: #999999;
			text-align: right;
		}

		.question {
			background-color: #ffffff;
			border-radius: 10rpx 0rpx 10;
			font-size: 28rpx;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			margin-left: 40rpx;
		}

	}

	.message-zn {
		margin-top: 40rpx;
		margin-left: 40rpx;
		display: flex;
		// float: left;

		.title {
			font-size: 24rpx;
			color: #999999;
			text-align: left;
			margin-left: 20rpx;
		}

		.defaultAnswer {
			background-color: #ffffff;
			border-radius: 10rpx 0rpx 10;
			font-size: 28rpx;
			padding: 10rpx 20rpx;
			margin-top: 10rpx;
			margin-left: 20rpx;
			margin-right: 40rpx;
			display: inline-block;
		}
	}

	.bottom-chat {
		width: 100%;
		height: 10%;
		background-color: #ffffff;
		bottom: 0rpx;
		position: fixed;

		.u-input {
			display: flex;
			justify-content: center;
			padding-top: 30rpx;

			.input {
				background-color: #f8f8f8;
				width: 527rpx;
			}

			.btn-send {
				padding: 0rpx 20rpx;
				font-size: 28rpx;
				color: #ffffff;
				line-height: 74rpx;
				margin-left: 10rpx;
				display: flex;
				background-color: #d91b1b;
				border-radius: 12rpx;
			}
		}
	}
</style>
