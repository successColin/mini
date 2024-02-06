<template>
	<view class="page">
		<search class="page_top" fromType="优惠团购" :isIcon="true" :isBgf="true" :radius="20" @search="search"></search>
		<view class="page_content" :style="{ 'top': '110rpx' }">
			<view class="hot_div">
				<view style="height: 165rpx;"></view>
				<scroll-view class="hot_list" :style="{ 'width': topWidth + 'px' }" scroll-x="true" @scroll="scrollTopList"
					:scroll-left="topScrollLeft" :scroll-with-animation="true">
					<view class="hot_item hot_one" :class="'hot_item' + index" @click="OnPushDetail(item.id)"
						v-for="(item, index) in topList" :key=index>
						<view class="item_img" :class="{ 'item_img1': currentTopIndex === index }" style="position: relative;">
							<image class="item_img" :class="{ 'item_img1': currentTopIndex === index }" :src="item.coverPicture">
							</image>
							<view v-if="item.distance > 0" class="item_address flex alc">
								<image class="item_icon" style="width: 15rpx;height: 18rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693311930040.png">
								</image>
								<text class="item_txt">{{ item.distanceMsg }}</text>
							</view>
						</view>
						<view class="item_title oneLine" :style="{ 'width': currentTopIndex === index ? '206rpx' : '180rpx' }">
							{{ item.title }}
						</view>
						<view class="item_bottom flex">
							<view>
								<text class="item_unit">￥</text>
								<text
									class="item_price1">{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}</text>
							</view>
							<view class="item_label">惠</view>
							<text class="item_price2">￥{{ item.marketPrice }}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="search flex jsb" :class="{ 'sticky-box': !isSticky }">
				<view v-for="(item, index) in searchList" :key="index" class="search_item"
					:class="{ 'sel': searchIndex == item.status, 'nosel': searchIndex != item.status }"
					@click="selSearchType(item.status)">
					<text class="txt">{{ item.name }}</text>
				</view>
			</view>
			<view v-if="dataList.length > 0" class="list">
				<view class="list_item" :style="{ 'padding': '23rpx 25rpx 20rpx 25rpx' }" v-for="(item, index) in dataList"
					:key="index" @click="OnPushDetail(item.productId)">
					<view class="list_item_top flex jsb alc">
						<view class="flex alc">
							<image class="shop_icon" src="./static/image/dianpulogo.png"></image>
							<text class="shop_title">{{ item.baseName }}</text>
						</view>
						<view v-if="item.distance > 0" class="shop_distance">{{ item.distanceMsg }}</view>
					</view>
					<view class="list_item_line"></view>
					<view class="list_item_content flex">
						<view class="item_content_left">
							<view class="product_img">
								<image class="product_img" :src="item.coverPicture">
								</image>
								<view v-if="isExpert == 1 && token && item.commissionPrice" class="product_yj">
									<text class="txt1">赚</text>
									<text class="txt1">{{ item.commissionPrice }}</text>
									<text class="txt1">元</text>
									<text class="txt1" style="margin-left: 10rpx;">佣金率</text>
									<text class="txt1">{{ item.commissionPricePercentage }}</text>
									<text class="txt1">%</text>
								</view>
							</view>
						</view>
						<view class="item_content_right">
							<view style="height: 72rpx;">
								<view class="product_title moreLine">
									<view v-if="item.activityPaymentPreferenceId"
										style="position: relative;top: 2px;width: 87rpx;height: 27rpx;display: inline-block;">
										<image v-if="item.activityPaymentPreferenceId == 10"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694485960742.png">
										</image>
										<image v-if="item.activityPaymentPreferenceId == 6"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694487708265.png">
										</image>
										<image v-if="item.activityPaymentPreferenceId == 8"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694487744684.png">
										</image>
										<image v-if="item.activityPaymentPreferenceId == 7"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694487777514.png">
										</image>
										<image v-if="item.activityPaymentPreferenceId == 5"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230913/file_1694566851400.png">
										</image>
										<image v-if="item.activityPaymentPreferenceId == 4"
											style="width: 87rpx;height: 27rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230913/file_1694566874907.png">
										</image>
									</view>
									<text :style="{ 'margin-left': '10rpx' }">{{ item.title }}</text>
								</view>
							</view>
							<view class="countdown-item">
								<view class="u-flex">
									<view class="mainRed size24 fwb" style="margin-left: 16rpx;margin-right: 8rpx;">
										截止时间:</view>
									<view>
										<countdown-timer ref="countdown" :time="item.countdown" autoStart>
											<template v-slot="{ day, hour, minute }">
												<view class="size24 mainRed fwb">
													<view>
														<text style="margin-right: 9rpx;"><text
																class="timetext ">{{ day }}</text>天</text>
														<text><text class="timetext">{{ hour }}</text>:</text>
														<text style="margin-left: 6rpx;"><text
																class="timetext">{{ minute }}</text></text>
													</view>
												</view>
											</template>
										</countdown-timer>
									</view>
								</view>
							</view>
							<view class="flex jsb" style="align-items: flex-end;">
								<view class="product_price_div flex">
									<view>
										<text class="txt1">特惠价:</text>
										<text class="txt1" style="margin-left: 8rpx;">￥</text>
										<text class="txt2"
											style="margin-left: 5rpx;">{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}</text>
										<text class="txt3"
											style="margin-left: 16rpx;">{{ item.marketPriceName }}:￥{{ item.marketPrice }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="flex alc" style="margin-top: 5rpx;">
						<view class="product_progress flex" :style="{ 'opacity': item.percentage > 50 ? 1 : 0 }">
							<view v-if="item.percentage > 50" class="progress_val" :style="{ 'width': item.percentage + '%' }">
								<view v-if="item.percentage >= 80" class="progress_val_txt">即将售罄</view>
								<view v-else class="progress_val_txt">热抢 {{ item.percentage }}%</view>
								<image class="progress_icon" :style="{ 'right': item.percentage >= 60 ? '-10rpx' : '-20rpx' }"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223640624.png">
								</image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="dataList.length == 0" class="tac mt50">
				<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
				</image>
				<view class="txtDarkGray">暂无团购</view>
			</view>
			<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
			<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
			<view style="height: 50rpx;"></view>
		</view>
	</view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
import search from "@/components/search/index.vue"
export default {
	components: {
		carousel,
		search
	},
	data() {
		return {
			placeholder: '搜索活动商品全网官方补贴',
			keyword: "",
			current: 1,
			size: 10,
			loadMore: false,
			isReachBottom: false, //没有更多
			dataList: [],
			topList: [],
			visitinto: null,
			token: null,
			isExpert: null,
			searchIndex: 1,
			searchList: [{
				name: '综合',
				status: 1
			}, {
				name: '销量',
				status: 2
			}, {
				name: '价格',
				status: 5
			}, {
				name: '热度',
				status: 3
			}, {
				name: '折扣',
				status: 4
			}],
			scrollTop: 0,
			currentTopIndex: 1,
			topScrollLeft: '0rpx',
			topScrollLeftNum: 0,
			totaltopScrollLeft: 0,
			topItemWidth: 0,
			timer: null
		};
	},
	computed: {
		isSticky() {
			return this.scrollTop < this.stickyTop
		},
		stickyTop() {
			return uni.upx2px(500 + 120 - 20)
		},
		topWidth() {
			return uni.upx2px(630) + 20
		}
	},
	onPageScroll(res) {
		this.scrollTop = res.scrollTop
	},
	onHide() {
		if (uni.getStorageSync("token")) {
			this.$request
				.post("/coc-active/api/v1/user/behavior/visit_exit", {
					userVisitId: this.visitinto,
				})
				.then((res) => { });
		}
	},
	onUnload() {
		if (uni.getStorageSync("token")) {
			this.$request
				.post("/coc-active/api/v1/user/behavior/visit_exit", {
					userVisitId: this.visitinto,
				})
				.then((res) => { });
		}
		if (this.timer) {
			clearTimeout(this.timer)
		}
	},
	onLoad(option) {
		if (option.title) {
			this.keyword = option.title
		}
		uni.setNavigationBarTitle({
			title: '优惠团购' // 设置导航栏标题的内容  
		})
		this.token = uni.getStorageSync("token");
		this.isExpert = uni.getStorageSync("isExpert");
		this.getList();
		this.getTopList()
	},
	onReachBottom() {
		if (!this.isReachBottom && !this.loadMore) {
			this.current++
			this.getList();
		}
	},
	onShow() {
		if (uni.getStorageSync("token")) {
			this.$request
				.post("/coc-active/api/v1/user/behavior/visit_into", {
					type: 8,
				})
				.then((res) => {
					this.visitinto = res;
				});
		}
	},
	methods: {
		selSearchType(val) {
			this.searchIndex = val
			this.tosearch()
		},
		getTopList() {
			this.$newrequest.post("/coc-active/api/v1/group/list/top")
				.then((res) => {
					if (res.code == 200) {
						this.topList = res.data
						this.$nextTick(() => {
							if (res.data.length > 3) {
								const query = uni.createSelectorQuery().in(this);
								query.select('.hot_item0').boundingClientRect(data => {
									this.topItemWidth = data.width + 10
									this.totaltopScrollLeft = (res.data.length - 3) * this
										.topItemWidth
									this.startTopTimer()
								}).exec();
							}
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				});
		},
		scrollTopList(event) {
			let px = uni.upx2px(220)
			let num = Math.round(event.detail.scrollLeft / px)
			this.currentTopIndex = num + 1
		},
		getList() {
			this.loadMore = true
			this.$newrequest
				.post("/coc-active/api/v1/group/list/v2", {
					current: this.current,
					size: this.size,
					title: this.keyword,
					sort: this.searchIndex,
					saleType: 1
				})
				.then((res) => {
					if (res.code == 200) {
						var currentTime = new Date();
						res.data.records.filter(s => {
							s.countdown = Math.abs(new Date(s.rushPurchaseEndTime) - new Date(
								currentTime))
							s.discount = parseFloat(s.discount)
						})
						if (this.current === 1) {
							this.dataList = res.data.records;
						} else {
							res.data.records.filter((s) => {
								this.dataList.push(s);
							});
						}
						if (res.data.records.length < this.size) {
							this.isReachBottom = true
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
				.finally(() => {
					this.loadMore = false
				})
		},
		OnPushDetail(id) {
			uni.navigateTo({
				url: "/pages/grouppurchase/detail?id=" + id
			});
		},
		search(value) {
			this.keyword = value
			this.tosearch()
		},
		tosearch() {
			this.isReachBottom = false
			this.current = 1;
			this.dataList = [];
			this.getList();
		},
		getPaymentTitle(item) {
			let title = ""
			if (item.activityPaymentPreferenceId == 4) {
				title = "人保优惠，"
			} else if (item.activityPaymentPreferenceId == 5) {
				title = "农行信用卡优惠，"
			} else if (item.activityPaymentPreferenceId == 6) {
				title = "工行信用卡优惠，"
			} else if (item.activityPaymentPreferenceId == 7) {
				title = "邮储信用卡优惠，"
			} else if (item.activityPaymentPreferenceId == 8) {
				title = "民生信用卡优惠，"
			} else if (item.activityPaymentPreferenceId == 10) {
				title = "官方补贴，超值低价，"
			}
			if (title) {
				if (item.discount <= 8) {
					title += `享${item.discount}折`
				} else {
					title += `省${item.saveMoney}元`
				}
			}
			return title
		},
		toList(value) {
			let type = 2
			if (value.video) {
				type = 1
				uni.navigateTo({
					url: '/pages/activity/articlevideo/index?id=' + value.articleId + "&selectionType=3",
				})
			} else {
				uni.navigateTo({
					url: '/pages/activity/waterfull/imglist?id=' + value.articleId + "&selectionType=3",
				})
			}
		},
		startTopTimer() {
			this.timer = setTimeout(() => {
				if (this.topScrollLeftNum < this.totaltopScrollLeft) {
					this.topScrollLeftNum += this.topItemWidth
				} else {
					this.topScrollLeftNum = 0
				}
				this.topScrollLeft = this.topScrollLeftNum + 'px'
				this.startTopTimer()
			}, 5000)
		}
	}
};
</script>

<style lang="scss">
.page {}

.page_top {
	border-bottom-left-radius: 20rpx;
	border-bottom-right-radius: 20rpx;
	position: absolute;
	width: 100%;
	z-index: 1;
}

.kefu-contact {
	background: none;
	border: none;
	margin: 0;
	padding: 0;
	outline: none;
}

button::after {
	border: initial;
}

.tab {
	.tab_inner {
		padding: 0 50rpx 0 50rpx;

		.tab_item {
			width: 120rpx;
			text-align: center;
		}

		.tab_item_sel {
			font-size: 28rpx;
			font-weight: bold;
			color: #222222;
		}

		.tab_item_nosel {
			font-size: 28rpx;
			font-weight: 500;
			color: #222222;
		}

		.tab_line {
			width: 33rpx;
			height: 6rpx;
			background: #F70000;
			border-radius: 3rpx;
			margin-left: 44rpx;
			margin-top: 14rpx;
		}

		.tab_tran1 {
			transform: translate(0, 0);
			transition: 0.5s;
		}

		.tab_tran2 {
			transform: translate(177rpx, 0);
			transition: 0.5s;
		}

		.tab_tran3 {
			transform: translate(354rpx, 0);
			transition: 0.5s;
		}

		.tab_tran4 {
			transform: translate(531rpx, 0);
			transition: 0.5s;
		}
	}
}

.page_content {
	position: absolute;
	z-index: 0;
	width: 100%;

	.hot_div {
		background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230907/file_1694067778843.png');
		background-repeat: no-repeat;
		background-size: 100% 100%;
		width: 750rpx;
		height: 500rpx;

		.hot_title1 {
			font-size: 36rpx;
			font-weight: bold;
			font-style: italic;
			color: #FFFFFF;
			text-shadow: 0rpx 2rpx 7rpx rgba(216, 17, 0, 0.37);
		}

		.hot_title2 {
			font-size: 24rpx;
			font-weight: bold;
			font-style: italic;
			color: #FFFFFF;
			text-shadow: 0rpx 2rpx 7rpx rgba(216, 17, 0, 0.37);
			margin-top: 10rpx;
		}

		.hot_list {
			white-space: nowrap;
			margin-left: 40rpx;
		}

		.hot_item {
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 10rpx 10rpx 10rpx 10rpx;
			display: inline-block;
			margin-right: 10px;
		}

		.hot_item:last-child {
			margin-right: 0;
		}

		.hot_one {}

		.hot_two {}

		.hot_three {}

		.item_img {
			width: 180rpx;
			height: 180rpx;
			border-radius: 10rpx;
		}

		.item_img1 {
			width: 206rpx;
			height: 206rpx;
		}

		.item_title {
			font-size: 24rpx;
			font-weight: bold;
			color: #222222;
			margin-top: 8rpx;
		}

		.item_bottom {
			margin-top: 5rpx;
			align-items: center;
		}

		.item_unit {
			font-size: 20rpx;
			font-weight: bold;
			color: #D91B1B;
		}

		.item_price1 {
			font-size: 32rpx;
			font-weight: bold;
			color: #D91B1B;
			margin-left: 3rpx;
		}

		.item_label {
			padding: 0 6rpx;
			background: #D91B1B;
			border-radius: 8rpx 8rpx 8rpx 0rpx;
			margin-left: 4rpx;
			font-size: 14rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		.item_price2 {
			font-size: 20rpx;
			font-weight: 500;
			text-decoration: line-through;
			color: #999999;
			margin-left: 4rpx;
		}

		.item_address {
			position: absolute;
			left: 8rpx;
			bottom: 5rpx;
		}

		.item_icon {
			width: 15rpx;
			height: 18rpx;
		}

		.item_txt {
			font-size: 20rpx;
			font-weight: 500;
			color: #FFFFFF;
			margin-left: 6rpx;
		}
	}

	.search {
		padding: 16rpx 48rpx;

		.search_item {
			width: 96rpx;
			height: 48rpx;
			line-height: 48rpx;
			border-radius: 24rpx;
			text-align: center;
			font-size: 24rpx;
			font-weight: 500;
		}

		.sel {
			background: #FFF5F5;
			border: 1px solid #D91B1B;

			.txt {
				color: #D91B1B;
			}
		}

		.nosel {
			border: 1px solid transparent;

			.txt {
				color: #222222;
			}
		}
	}

	.list {
		padding: 0 25rpx;

		.list_item {
			background: #FFFFFF;
			border-radius: 20rpx;
			padding: 23rpx 10rpx 20rpx 25rpx;
			margin-bottom: 22rpx;

			.list_item_top {
				.shop_icon {
					width: 30rpx;
					height: 30rpx;
				}


				.shop_title {
					font-size: 28rpx;
					font-weight: 500;
					color: #222222;
					margin-left: 11rpx;
				}

				.shop_distance {
					font-size: 24rpx;
					font-weight: 500;
					color: #999999;
				}
			}

			.list_item_line {
				height: 0rpx;
				border-top: 1rpx solid #E8E8E8;
				margin-top: 23rpx;
			}

			.list_item_content {
				align-items: flex-start;
				margin-top: 24rpx;

				.item_content_left {
					position: relative;

					.product_img {
						width: 214rpx;
						height: 214rpx;
						border-radius: 10rpx;
					}

					.product_yj {
						width: 100%;
						padding: 3rpx 0;
						background: #F30000;
						border-radius: 10rpx;
						font-weight: bold;
						color: #FFFFFF;
						position: absolute;
						top: 0;
						left: 0;
						display: flex;
						align-items: center;
						justify-content: center;

						.txt1 {
							font-size: 20rpx;
						}

						.txt2 {
							font-size: 28rpx;
						}
					}
				}

				.item_content_right {
					margin-left: 23rpx;
					width: 100%;

					.product_title {
						font-size: 28rpx;
						font-weight: bold;
						color: #222222;
					}

					.product_timer {
						width: 413rpx;
						height: 64rpx;
						margin-top: 27rpx;

						.txt {
							font-size: 24rpx;
							font-weight: bold;
							color: #D91B1B;
						}

						.bac {
							padding: 10rpx 5rpx;
							background: #FFFFFF;
							border-radius: 10rpx;
						}
					}

					.product_price_div {
						font-weight: bold;
						color: #D91B1B;
						margin-top: 13rpx;
						flex-direction: column;

						.txt1 {
							font-size: 24rpx;
						}

						.txt2 {
							font-size: 40rpx;
						}

						.txt3 {
							font-size: 20rpx;
							font-weight: 500;
							text-decoration: line-through;
							color: #999999;
						}
					}
				}
			}

			.product_progress {
				background: #FFDEDE;
				border-radius: 14rpx;
				width: 214rpx;
				height: 100%;

				.progress_val {
					background: #FF2215;
					border-radius: 14rpx;
					position: relative;

					.progress_val_txt {
						font-size: 20rpx;
						font-weight: bold;
						color: #FFFFFF;
						margin-left: 15rpx;
					}
				}

				.progress_icon {
					width: 28rpx;
					height: 28rpx;
					position: absolute;
					right: -20rpx;
					bottom: 0;
				}
			}

			.product_tip {
				margin-left: 18rpx;

				.product_tip_icon {
					width: 32rpx;
					height: 33rpx;
				}

				.product_tip_txt {
					font-size: 20rpx;
					font-weight: 500;
					color: #D91B1B;
					margin-left: 5rpx;
				}
			}
		}
	}
}

.countdown-item {
	width: 413rpx;
	height: 64rpx;
	background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693296291743.png");
	background-size: 100% 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 20rpx;
}

.timetext {
	background-color: #ffffff;
	padding: 7rpx 8rpx;
	border-radius: 10rpx;
	margin-right: 6rpx;
}

.sticky-box {
	position: sticky;
	top: var(--window-top);
	z-index: 99;
	flex-direction: row;
	margin: 0px;
	background: #F8F8F8;
}

.reachBottom {
	text-align: center;
	font-size: 24rox;
	color: #999999;
	padding: 20rpx;
	font-size: 24rpx;
	color: #999999;
}

.recommend {
	&-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 750rpx;
		height: 93rpx;

		&-logo {
			width: 33rpx;
			height: 26rpx;
			margin-left: 25rpx;
		}

		&-title {
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #222222;
			line-height: 40rpx;
			margin-left: 10rpx;
		}

		&-go {
			width: 10rpx;
			height: 16rpx;
			margin-right: 24rpx;
		}
	}

	&-item {
		background: #FFFFFF;
		margin-bottom: 10rpx;

		&-video {
			position: absolute;
			width: 82rpx;
			height: 82rpx;
			margin-top: 187rpx;
			margin-left: 130rpx;
		}

		&-image {
			width: 342rpx;
			height: 456rpx;
			background: #000000;
			border-radius: 10rpx;
		}

		&-bottom {
			width: 342rpx;
			border-radius: 0rpx 0rpx 10rpx 10rpx;
			padding-top: 20rpx;
			padding-bottom: 10rpx;

			&-title {
				width: 306rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				line-height: 36rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				margin-bottom: 18rpx;
				margin-left: 14rpx;
				margin-right: 20rpx;
			}

			&-image {
				width: 40rpx;
				height: 40rpx;
				margin-left: 15rpx;
				border-radius: 20rpx;
			}

			&-name {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				line-height: 38rpx;
				margin-left: 10rpx;
			}

			&-check {
				font-size: 20rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				line-height: 38rpx;
				margin-right: 20rpx;
			}
		}
	}

	&-bottom {
		font-size: 24rpx;
		color: #999999;
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

}

.n-flex {
	display: flex;
}
</style>
