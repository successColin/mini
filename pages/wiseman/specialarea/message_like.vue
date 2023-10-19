<template>
	<view class="page">
		<view v-if="dataList.length>0" class="msglist">
			<view class="msg_item flex" v-for="item in dataList">
				<view class="flex alc jsb">
					<view class="item_left flex alc">
						<image class="item_img" :src="item.operateUserHeadImg">
						</image>
						<view class="item_info">
							<view class="flex alc">
								<text class="item_nickname oneLine">{{item.operateUserNickname}}</text>
								<text class="item_content">赞了我的作品</text>
							</view>
							<view class="item_time">{{item.time}}</view>
						</view>
					</view>
					<view style="position: relative;width: 85rpx;height: 85rpx;">
						<image v-if="!item.videoList||item.videoList.length==0" class="item_works_img"
							:src="item.imgsList[0]" @click="jumpDetail(item)"></image>
						<view style="height: 85rpx;" @click="jumpDetail(item)">
							<image v-if="item.videoList&&item.videoList.length>0" class="item_works_img"
								:src="item.videoList[0]+'?x-oss-process=video/snapshot,t_1000,m_fast'"></image>
							<image v-if="item.videoList&&item.videoList.length>0" class="player"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png">
							</image>
						</view>
					</view>
				</view>
				<view>
					<view class="item_line"></view>
				</view>
			</view>
		</view>
		<view v-else class="tac mt50">
			<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
			</image>
			<view class="txtDarkGray">暂无点赞</view>
		</view>
		<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
		<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList: [],
				searchField: {
					current: 1,
					size: 10,
					type: 2
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
			},
			jumpDetail(item) {
				let url = ""
				if (item.videoList && item.videoList.length > 0) {
					url = `/pages/wiseman/component/videoarticle?id=${item.articleId}`
				} else {
					url = `/pages/wiseman/component/imgarticle?id=${item.articleId}`
				}
				uni.navigateTo({
					url
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		background-color: #fff;
		min-height: 100vh;
	}

	.msglist {
		padding: 0 23rpx;

		.msg_item {
			margin-bottom: 10rpx;
			flex-direction: column;
			padding: 23rpx 0;
		}

		.item_img {
			width: 85rpx;
			height: 85rpx;
			border-radius: 117rpx;
		}

		.item_left {
			width: calc(100% - 90rpx);
		}

		.item_info {
			margin-left: 16rpx;
		}

		.item_nickname {
			font-size: 27rpx;
			font-weight: 500;
			color: #222222;
			max-width: 320rpx;
			display: inline-block;
		}

		.item_content {
			font-size: 27rpx;
			font-weight: 400;
			color: #666666;
			margin-left: 8rpx;
		}

		.item_time {
			font-size: 23rpx;
			font-weight: 400;
			color: #999999;
			margin-top: 8rpx;
		}

		.item_works_img {
			width: 85rpx;
			height: 85rpx;
			border-radius: 8rpx;
		}

		.item_line {
			height: 0;
			border-radius: 1rpx;
			border-top: 1rpx solid #999999;
			margin-top: 16rpx;
			width: calc(100% - 101rpx);
			float: right;
		}
	}

	.player {
		width: 46rpx;
		height: 46rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
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
