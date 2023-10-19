<template>
	<view class="page">
		<view class="notice_remind_div">
			<view class="notice_remind flex ">
				<view class="tac remind_item flex alc" @click="jumpUrl(1)">
					<view class="remind_icon" style="position: relative;">
						<image class="remind_icon"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692319683983.png">
						</image>
						<view v-if="detail.systemMessageNum>0" class="remind_num flex jsc alc">
							<text class="remind_num_txt">{{detail.systemMessageNum}}</text>
						</view>
					</view>
					<view class="remind_title">系统通知</view>
				</view>
				<view class="tac remind_item flex alc" @click="jumpUrl(2)">
					<view class="remind_icon" style="position: relative;">
						<image class="remind_icon"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692319732482.png">
						</image>
						<view v-if="detail.likeMessageNum>0" class="remind_num flex jsc alc">
							<text class="remind_num_txt">{{detail.likeMessageNum}}</text>
						</view>
					</view>
					<view class="remind_title">收到的赞</view>
				</view>
				<view class="tac remind_item flex alc" @click="jumpUrl(3)">
					<view class="remind_icon" style="position: relative;">
						<image class="remind_icon"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692319752312.png">
						</image>
						<view v-if="detail.commentMessageNum>0" class="remind_num flex jsc alc">
							<text class="remind_num_txt">{{detail.commentMessageNum}}</text>
						</view>
					</view>
					<view class="remind_title">评论</view>
				</view>
			</view>
		</view>
		<view class="message_list">

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					systemMessageNum: 0,
					likeMessageNum: 0,
					commentMessageNum: 0
				}
			}
		},
		onShow() {
			this.getMessageCount()
		},
		methods: {
			jumpUrl(type) {
				let url = ""
				if (type === 1) {
					url = "/pages/wiseman/specialarea/message_system"
				} else if (type === 2) {
					url = "/pages/wiseman/specialarea/message_like"
				} else if (type === 3) {
					url = "/pages/wiseman/specialarea/message_comment"
				}
				uni.navigateTo({
					url
				})
			},
			getMessageCount() {
				this.$request.post("/coc-active/api/v1/newExpert/expertMessageCount")
					.then(res => {
						if (res.code === 200) {
							this.detail = res.data
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100vh;
		background-color: #fff;
	}

	.notice_remind_div {
		padding: 23rpx 23rpx 0 23rpx;
	}

	.notice_remind {
		height: 169rpx;
		background: #FFFFFF;
		box-shadow: inset 0rpx -1rpx 0rpx 0rpx rgba(153, 153, 153, 0.25);
		border-radius: 0rpx;
		justify-content: space-around;
		align-items: flex-start;
	}

	.remind_item {
		flex: 1;
		flex-direction: column;
	}

	.remind_icon {
		width: 85rpx;
		height: 85rpx;
	}

	.remind_title {
		margin-top: 8rpx;
		font-size: 27rpx;
		font-weight: 400;
		color: #999999;
	}

	.remind_num {
		width: 31rpx;
		height: 31rpx;
		background: #D91B1B;
		border-radius: 98rpx;
		position: absolute;
		right: -10rpx;
		top: 0;
	}

	.remind_num_txt {
		font-size: 19rpx;
		font-weight: 800;
		color: #FFFFFF;
	}
</style>
