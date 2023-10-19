<template>
	<view class="page">
		<view class="tobbar">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot  tobbar u-flex" slot="center">
					<view>{{nickname}}</view>
				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot tobbar u-flex" slot="center">
					<view>{{nickname}}</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 25%;">
		</view>
		<view class="tags">
			<view class="item" :class="{'current-item':numcurrent=='1'}" @click="Oncurrent('1')">
				关注
			</view>
			<view class="item" :class="{'current-item':numcurrent=='2'}" @click="Oncurrent('2')">
				粉丝
			</view>
			<view class="item" :class="{'current-item':numcurrent=='3'}" @click="Oncurrent('3')">
				黑名单
			</view>
		</view>
		<view class="card">
			<!-- 关注列表 -->
			<view v-if="numcurrent=='1'" v-for="(item,index) in dataList" :key="index" class="follow-list">
				<view class="u-flex">
					<view>
						<u-avatar size="36" :src="item.followHeadImg"></u-avatar>
					</view>
					<view style="margin-left: 20rpx;margin-top: 0rpx;">
						<view style="font-size: 28rpx;">
							{{item.nickname}}
						</view>
						<view style="	font-size: 24rpx;">
							{{item.signature}}
						</view>
					</view>
				</view>
				<view class="btn" @click="Onfalse(item)">
					取消关注
				</view>
			</view>
			<!-- 粉丝列表 -->
			<view v-if="numcurrent=='2'"  v-for="(item,index) in dataList" :key="index" class="follow-list">
				<view class="u-flex">
					<view>
						<u-avatar size="36" :src="item.fansHeadImg"></u-avatar>
					</view>
					<view style="margin-left: 20rpx;margin-top: 0rpx;">
						<view style="font-size: 28rpx;">
							{{item.nickname}}
						</view>
						<view style="	font-size: 24rpx;">
							{{item.signature}}
						</view>
					</view>
				</view>
				<view class="btn" @click="Oninteractive(item)">
					<view v-if="item.status==0||item.status==2||item.status==3||item.status==null">
						关注</view>
					<view v-else>已关注</view>
				</view>
			</view>
			<!-- 黑名单列表 -->
	<view v-if="numcurrent=='3'" v-for="(item,index) in dataList" :key="index" class="follow-list">
		<view class="u-flex">
			<view>
				<u-avatar size="36" :src="item.blackHeadImg"></u-avatar>
			</view>
			<view style="margin-left: 20rpx;margin-top: 0rpx;">
				<view style="font-size: 28rpx;">
					{{item.nickname}}
				</view>
				<view style="	font-size: 24rpx;">
					{{item.signature}}
				</view>
			</view>
		</view>
		<view class="btn" @click="Onfalse(item)">
			取消关注
		</view>
		</view>
		<u-modal :show="showfans" title="确定进行此操作？" :showCancelButton='true' confirmColor='#606266'
			@cancel='showfans=false' @confirm='Onupdatefollow'></u-modal>
		<u-picker @confirm="changepicker" :closeOnClickOverlay='true' :showToolbar='true' :show="showinteractive"
			@close='showinteractive=false' @cancel='showinteractive=false' :columns="columns" keyName="label">
		</u-picker>
		<u-popup :safeAreaInsetBottom='false' :show="showgroup" @close="showgroup=false" mode="center">
			<scroll-view style="height: 710rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="pop">
						<u-toast ref="uToast"></u-toast>
					<view class="session" v-for="(item,index) in mygroup" :key="index">
						<view class="container">
							<view class="avatar-container">
								<image class="avatar" :src="item.groupHeadImg">
								</image>
							</view>
							<view class="content">
								<text class="name">{{item.name}}</text>
							</view>
							<view class="time-container">
								<text @click="OnpullInGroup(item)" class="time">拉入</text>
							</view>
						</view>
					</view>
		
				</view>
				
			</scroll-view>
		
		</u-popup>
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
				value: {},
				showfans: false,
				dataList: {},
				nickname: '',
				current: 1,
				numcurrent: '1',
				isLoadMore: false,
				shopUserId: '',
				name: '',
				columns: [],
				showinteractive: false,
				mygroup: [],
				showgroup:false
			}
		},

		onLoad() {
			this.nickname = getstorage("nickname")
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onShow() {},
		methods: {
			OnpullInGroup(item) {
				let _this = this
				this.$request.post("/coc-social/api/v1/group/pullInGroup", {
					userId: this.shopUserId,
					groupId: item.id
				}).then(res => {
						_this.showgroup = false
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: res.message,
							type: "success",
							complete() {
							
							}
						});
					} else {
					
						this.$refs.uToast.show({
							message: res.message,
							type: "default",
							complete() {
								_this.showgroup = false
							}
						});
					}
				})
			},
			changepicker(arr) {
				let _this = this
				let value = arr.value[0].type
				if (value == 1 || value == 2 || value == 3) {
					this.$request.post("/coc-active/api/v1/Follow/update_follow", {
						userId: this.shopUserId,
						status: value,
						source: '1'
					}).then(res => {
						if (res.code == 200) {
							this.getList()
							this.showinteractive = false
						}
					})
				} else if (value == 4) {
					let data = {
						id: this.shopUserId,
						nickname: this.name
					}
					uni.navigateTo({
						url: '/pages/service/message/detail?type=0',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('getinfo', {
								data: data
							})
							_this.showinteractive = false
						}
					})
				} else if (value == 5) {
					this.$request.get("/coc-social/api/v1/group/getCircleQueue").then(res => {
						this.mygroup = res.data.my
						this.showgroup = true
						this.showinteractive = false
					})
			
				}
			},
			Oninteractive(item) {
				this.shopUserId = item.userId
				this.name = item.nickname
				if (item.status == 0 || item.status == 2 || item.status == null) {
					this.columns = [
						[{
								label: '关注',
								type: '1'
							},
							{
								label: '私信',
								type: '4'
							},
							{
								label: '屏蔽',
								type: '3'
							},
							{
								label: '拉入圈子',
								type: '5'
							}
						]
					]
				} else {
					this.columns = [
						[{
								label: '取关',
								type: '2'
							},
							{
								label: '私信',
								type: '4'
							},
							{
								label: '屏蔽',
								type: '3'
							},
							{
								label: '拉入圈子',
								type: '5'
							}
						]
					]
				}

				this.showinteractive = true
			},
			Onfalse(item) {
				this.value = item
				this.showfans = true
			},
			Onupdatefollow() {
				this.$request.post("/coc-active/api/v1/Follow/update_follow", {
					userId: this.value.userId,
					status: '2',
					source: '2'
				}).then(res => {
					if (res.code == 200) {
						this.getList()
						this.showfans = false
					}
				})
			},
			getList() {
				if (this.numcurrent == '1') {
					this.$request.post("/coc-my/api/v1/my/user/follow/list", {
						current: this.current,
						size: 20
					}).then(res => {
						if (res.data.records.length < 10) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					})
				} else if (this.numcurrent == '2') {
					this.$request.post("/coc-my/api/v1/my/user/fans/list", {
						current: this.current,
						size: 20
					}).then(res => {
						if (res.data.records.length < 10) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					})
				} else {
					this.$request.post("/coc-my/api/v1/my/user/black/list", {
						current: this.current,
						size: 20
					}).then(res => {
						if (res.data.records.length < 10) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					})
				}

			},
			Oncurrent(index) {
				this.numcurrent = index
				this.isLoadMore = false
				this.current = 1
				this.getList()
			}
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 20rpx;
	}
	.pop {
		width: 710rpx;
	}

	.time-container {
		margin-left: auto;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}

	.time {
		width: 70rpx;
		height: 50rpx;
		background-color: #d91b1b;
		border-radius: 10rpx;
		line-height: 50rpx;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		display: inline-block;
	}

	.content {
		display: flex;
		align-items: auto;
		flex-direction: column;
		margin-top: 20rpx;
		padding-left: 10rpx;
	}

	.name {
		text-align: left;
		margin-top: 0;
		font-weight: bold;
		font-size: 32rpx;
	}

	.container {
		width: 100%;
		display: flex;
		margin-top: 10rpx;
	}

	.avatar-container {
		position: relative;
		margin: 10rpx;
	}

	.avatar {
		width: 110rpx;
		height: 110rpx;
		border-radius: 12rpx;
	}

	.session {
		border-radius: 15rpx;
		/* background-color: rgb(200,199,204); */
		background-color: #ffffff;
		margin: 20rpx;
	}
	.tags {
		display: flex;
		justify-content: space-around;

		.item {
			width: 219rpx;
			height: 55rpx;
			background-color: #ffffff;
			border-radius: 14rpx;
			line-height: 55rpx;
			font-size: 28rpx;
			text-align: center;
		}

		.current-item {
			background-color: #d91b1b;
			color: #ffffff;
		}
	}

	.card {
		background-color: #ffffff;
		border-radius: 12rpx;
		padding: 20rpx 10rpx;
		margin-top: 40rpx;

		.follow-list {
			display: flex;
			justify-content: space-between;
			margin-top: 20rpx;

			.btn {
				width: 107rpx;
				height: 36rpx;
				border-radius: 10rpx;
				border: solid 1rpx #2c2c2c;
				font-size: 24rpx;
				line-height: 36rpx;
				text-align: center;
				margin-top: 14rpx;
			}
		}
	}
</style>
