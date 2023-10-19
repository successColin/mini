<template>
	<view class="noticebar" :style="{'height':height+'rpx'}">
		<scroll-view class="noticebar-scroll" :scroll-y="true" :scroll-with-animation="true" :scroll-top="scrollTop">
			<view :animation="animationData" class="noticebar-content">
				<view class="noticebar-item" :style="{'lineHeight':height+'rpx','height':height+'rpx'}"
					v-for="(item, index) in noticeList" :key="index" @tap="handleClickNotice(item)">
					<text class="label_view_text"
						:style="{'width':width+'rpx','height':textheight+'rpx'}">{{ item.text }}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "notice-bar",
		data() {
			return {
				noticeList: [], // 通知列表
				timer: null, // 定时器
				interval: 5000, // 滚动时间间隔
				scrollTop: 0, // 滚动距离
				currentIndex: 0, // 当前通知索引
			};
		},
		props: {
			notices: {
				// 外部传入的通知列表
				type: Array,
				default: [],
			},
			width: Number,
			height: Number,
			textheight: Number
		},
		mounted() {
			this.initNoticeList();
		},
		methods: {
			// 初始化通知列表
			initNoticeList() {
				const _this = this;
				_this.noticeList = _this.notices;
				if (_this.noticeList.length > 1) {
					_this.timer = setInterval(() => {
						_this.handleScrollNotice();
					}, _this.interval);
				}
			},
			// 点击通知时触发
			handleClickNotice(item) {
				this.$emit("click", item);
			},
			// 滚动通知
			handleScrollNotice() {
				const len = this.noticeList.length;
				if (this.currentIndex === len - 1) {
					this.currentIndex = 0;
				} else {
					this.currentIndex++;
				}
				this.animateScroll();
			},
			// 动画滚动
			animateScroll() {
				const _this = this;
				const noticeHeight = uni.upx2px(this.height); // 通知高度，根据实际情况调整
				const scrollTop = _this.currentIndex * noticeHeight;
				_this.scrollTop = scrollTop;
			},
		},
		destroyed() {
			if (this.timer) {
				clearInterval(this.timer);
			}
		},
	};
</script>

<style scoped>
	.noticebar {
		/* 组件高度，根据实际情况调整 */
		/* 		height: 36rpx; */
		overflow: hidden;
	}

	.noticebar-scroll {
		width: 100%;
		height: 100%;
	}

	.noticebar-content {
		display: flex;
		flex-direction: column;
	}

	.noticebar-item {
		/* 通知高度，根据实际情况调整 */
		/* 		height: 36rpx; */
		/* 通知行高，根据实际情况调整 */
		/* 	line-height: 36rpx; */
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.label_view_text {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		display: flex;
		justify-content: center;
		align-items: center;
		/* 		width: 80rpx;
		height: 36rpx; */
	}
</style>
