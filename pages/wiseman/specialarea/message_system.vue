<template>
	<view>
		<u-navbar bgColor="#D91B1B" title="系统通知" leftIconColor="#FFFFFF" :autoBack="true"
			titleStyle="color: #FFFFFF;font-weight: 600;">
		</u-navbar>
		<view :style="{height:navbarHeight+'px'}"></view>
		<view v-if="dataList.length>0" class="msglist">
			<view class="msg_item" v-for="item in dataList">
				<view class="msg_item_top flex alc jsb">
					<text class="item_title oneLine">{{item.typeMsg}}</text>
					<text class="item_time">{{item.time}}</text>
				</view>
				<view class="msg_item_bottom">
					<text class="item_content">{{item.content}}</text>
				</view>
			</view>
		</view>
		<view v-else class="tac mt50">
			<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
			</image>
			<view class="txtDarkGray">暂无通知</view>
		</view>
		<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
		<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
		},
		data() {
			return {
				dataList: [],
				searchField: {
					current: 1,
					size: 10,
					type: 1
				},
				loadMore: false, //加载更多
				isReachBottom: false, //没有更多
			}
		},
		onLoad() {
			this.getList()
			this.readMessage()
		},
		onReachBottom() {
			if (!this.isReachBottom && !this.loadMore) {
				this.searchField.current += 1
				this.getList()
			}
		},
		methods: {
			readMessage() {
				this.$newrequest.post("/coc-active/api/v1/newExpert/viewExpertMessage", {
						type: this.searchField.type
					})
					.then(res => {
						if (res.code === 200) {

						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			getList() {
				this.loadMore = true
				this.$newrequest.post("/coc-active/api/v1/newExpert/expertMessageList", this.searchField)
					.then(res => {
						if (res.code === 200) {
							if (this.searchField.current === 1) {
								this.dataList = res.data.records
							} else {
								res.data.records.forEach(m => {
									this.dataList.push(m)
								})
							}
							if (res.data.records.length < this.searchField.size) {
								this.isReachBottom = true
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(() => {
						this.loadMore = false
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	.msglist {
		padding: 0 23rpx;

		.msg_item {
			padding: 23rpx 23rpx 27rpx 23rpx;
			background: #FFFFFF;
			border-radius: 15rpx 15rpx 15rpx 15rpx;
			margin-top: 23rpx;
		}

		.item_title {
			font-size: 27rpx;
			font-weight: 400;
			color: #000000;
			max-width: 600rpx;
		}

		.item_time {
			font-size: 23rpx;
			font-weight: 400;
			color: #999999;
		}

		.msg_item_bottom {
			margin-top: 29rpx;
		}

		.item_content {
			font-size: 27rpx;
			font-weight: 400;
			color: #999999;
		}
	}

	.reachBottom {
		text-align: center;
		font-size: 24rox;
		color: #999999;
		padding: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}
</style>
