<template>
	<view class="page">
		<u-navbar bgColor="transparent">
			<view class="u-nav-slot" slot="left" style="display: flex;margin-left: 15rpx;">
				<view class="navbar-left" :style="{height:menuHeight+'px',marginTop:menuTop+'px'}" @click="goback">
					<view class="back_icon_div flex jsc alc">
						<u-icon name="arrow-left" size="16" :bold="true" color="#222222"></u-icon>
					</view>
				</view>
			</view>
		</u-navbar>
		<image class="page_background_img" :style="{'height':backgroundHeight}"
			src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692434417948.png"></image>
		<image class="page_background_icon1" :style="{'top':`calc(83rpx + ${navbarHeight}px)`}"
			src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692436598398.png"></image>
		<image class="page_background_icon2" :style="{'top':`calc(184rpx + ${navbarHeight}px)`}"
			src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692436655362.png"></image>
		<view :style="{height:navbarHeight+'px'}"></view>
		<view class="invite">
			<image style="width:413rpx;height: 554rpx;position: absolute;right: 0;top: 0;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692430160684.png">
			</image>
			<view class="invite_info">
				<view class="total flex">
					<view class="total_item flex alc">
						<view class="total_money">
							<text class="symbol">¥</text>
							<text class="counttxt">{{accumulatedShare}}</text>
						</view>
						<view class="tip_div flex alc" @click="jumpDetail">
							<text class="tiptxt" style="margin-right: 5rpx;">累计分成</text>
							<u-icon name="arrow-right" color="#999999" :bold="true" size="18rpx"></u-icon>
						</view>
					</view>
					<view class="total_item flex alc" style="margin-left: 23rpx;">
						<view class="total_count">
							<text class="counttxt">{{accumulatedShop}}</text>
							<text class="symbol">家</text>
						</view>
						<view class="tip_div">
							<text class="tiptxt">累计邀请</text>
						</view>
					</view>
				</view>
				<view class="rule">
					<view class="rule_title">
						<text class="rule_title_txt">邀请规则</text>
					</view>
					<view class="rule_content_div">
						<text class="rule_content_txt1">邀请商家入驻51车俱乐部平台，商家入驻成功之日</text>
						<text class="rule_content_txt2">30天内</text>
						<text class="rule_content_txt1">，商家自主发布活动/团购，</text>
						<text class="rule_content_txt2">订单交易核销金额的1%计入佣金中</text>
						<text class="rule_content_txt1">，超过30天后佣金不再计入。</text>
					</view>
				</view>
				<view class="btn flex alc jsc" @click="jumpInvite">
					<text class="btn_txt">去邀请</text>
				</view>
			</view>
			<view style="height: 895rpx;"></view>
			<view class="invite_list">
				<view class="title">邀请进度</view>
				<view class="tabs flex alc">
					<view class="tab_item flex alc" :class="{'item_sel':curIndex===0,'item_nosel':curIndex!==0}"
						@click="selStatus(0)">
						<view>生效中</view>
						<view v-if="curIndex===0" class="item_line"></view>
					</view>
					<view class="tab_item flex alc" :class="{'item_sel':curIndex===1,'item_nosel':curIndex!==1}"
						@click="selStatus(1)">
						<view>入驻中</view>
						<view v-if="curIndex===1" class="item_line"></view>
					</view>
					<view class="tab_item flex alc" :class="{'item_sel':curIndex===2,'item_nosel':curIndex!==2}"
						@click="selStatus(2)">
						<view>已失效</view>
						<view v-if="curIndex===2" class="item_line"></view>
					</view>
				</view>
				<view class="list_item flex jsb" v-for="(item,index) in dataList" :key="index">
					<view v-if="curIndex!==1">
						<view class="title">{{item.baseName}}</view>
						<view class="time">{{item.auditTime}}入驻</view>
					</view>
					<view v-else>
						<view class="title">{{item.shopName}}</view>
						<view class="time">{{item.createdAt}}入驻</view>
					</view>
					<view>
						<view class="money">
							<template v-if="curIndex!==1">
								<text style="font-size: 23rpx;">¥</text>
								<text>{{item.accumulatedShare}}</text>
							</template>
							<template v-else>
								<text>{{item.statusMsg}}</text>
							</template>
						</view>
						<view v-if="curIndex!==1" class="tip">累计分成</view>
						<view v-else class="tip">当前进度</view>
					</view>
				</view>
			</view>
			<view style="height: 50rpx;"></view>
		</view>
	</view>
</template>

<script>
	export default {
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			// 胶囊高度
			menuHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuHeight : 0
			},
			// 胶囊top
			menuTop() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').menuTop - this.statusBarHeight : 0
			},
			backgroundHeight() {
				return `calc(${this.navbarHeight}px + 960rpx)`
			},
			dataList() {
				if (this.curIndex == 0) {
					return this.takeEffectList
				} else if (this.curIndex == 1) {
					return this.progressList
				} else if (this.curIndex == 2) {
					return this.loseEffectList
				} else {
					return []
				}
			}
		},
		data() {
			return {
				curIndex: 0,
				accumulatedShare: 0,
				accumulatedShop: 0,
				loseEffectList: [],
				takeEffectList: [],
				progressList: []
			}
		},
		onLoad() {
			this.getCommissionInfo()
			this.getInvitationProgress()
		},
		methods: {
			//返回上一页/回到首页
			goback() {
				let routes = getCurrentPages()
				if (routes.length > 1) {
					uni.navigateBack()
				} else {
					uni.switchTab({
						url: '/pages/home/index'
					})
				}
			},
			//获取佣金分成
			getCommissionInfo() {
				this.$request.post("/coc-active/api/v1/expert/shop/commission/sharing").then(res => {
					if (res.code == 200) {
						let {
							accumulatedShare,
							accumulatedShop,
							loseEffect = [],
							takeEffect = []
						} = res.data
						this.loseEffectList = loseEffect
						this.takeEffectList = takeEffect
						this.accumulatedShare = accumulatedShare
						this.accumulatedShop = accumulatedShop
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			//获取邀请进度
			getInvitationProgress() {
				this.$request.post("/coc-active/api/v1/expert/shop/invitationProgress").then(res => {
					if (res.code == 200) {
						this.progressList = res.data ? res.data : []
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			selStatus(status) {
				this.curIndex = status
			},
			jumpInvite() {
				uni.navigateTo({
					url: '/pages/wiseman/inviteinbusiness'
				})
			},
			jumpDetail() {
				uni.navigateTo({
					url: '/pages/wiseman/recommended_merchants_detail'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #F8E3B8;
		min-height: 100vh;
		position: relative;
	}

	.page_background_img {
		width: 750rpx;
		height: 960rpx;
		position: absolute;
	}

	.page_background_icon1 {
		position: absolute;
		width: 292rpx;
		height: 81rpx;
		left: 23rpx;
	}

	.page_background_icon2 {
		position: absolute;
		width: 292rpx;
		height: 81rpx;
		left: 23rpx;
	}

	.navbar-left {
		height: 92rpx !important;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.back_icon_div {
		width: 46rpx;
		height: 46rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 192rpx;
	}

	.back_icon {
		width: 92rpx;
		height: 92rpx;
	}

	.invite {
		position: relative;
		padding: 0 23rpx;
	}

	.invite_info {
		padding: 23rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		position: absolute;
		top: 300rpx;

		.total {
			.total_item {
				flex: 1;
				background: #F9F8F6;
				border-radius: 15rpx;
				padding: 27rpx 0;
				flex-direction: column;
			}

			.tip_div {
				margin-top: 27rpx;
			}

			.symbol {
				font-size: 23rpx;
				font-weight: 500;
				color: #D91B1B;
			}

			.counttxt {
				font-size: 35rpx;
				font-weight: 800;
				color: #D91B1B;
			}

			.tip_div {
				margin-top: 15rpx;
			}

			.tiptxt {
				font-size: 23rpx;
				font-weight: 400;
				color: #999999;
			}

			.arrow {
				color: #999999;
			}
		}

		.rule {
			background: #F9F8F6;
			border-radius: 15rpx;
			margin-top: 23rpx;
			padding-bottom: 35rpx;

			.rule_title {
				width: 115rpx;
				height: 40rpx;
				line-height: 40rpx;
				background: #D91B1B linear-gradient(180deg, #FFF8E1 0%, #FADC79 100%);
				border-radius: 15rpx 0rpx 15rpx 0rpx;
				text-align: center;
			}

			.rule_title_txt {
				font-size: 23rpx;
				font-weight: 500;
				color: #222222;
			}

			.rule_content_div {
				width: 604rpx;
				margin-left: 38rpx;
				margin-top: 23rpx;
			}

			.rule_content_txt1 {
				font-size: 27rpx;
				font-weight: 400;
				color: #666666;
			}

			.rule_content_txt2 {
				font-size: 31rpx;
				font-weight: 800;
				color: #D91B1B;
			}
		}

		.btn {
			width: 658rpx;
			height: 73rpx;
			background: #FCD144;
			border-radius: 163rpx;
			margin-top: 23rpx;

			.btn_txt {
				font-size: 31rpx;
				font-weight: 600;
				color: #222222;
			}
		}
	}

	.invite_list {
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 23rpx 38rpx 23rpx 23rpx;

		.title {
			font-size: 35rpx;
			font-weight: 500;
			color: #222222;
		}

		.tabs {
			margin-top: 38rpx;
		}

		.tab_item {
			width: 119rpx;
			height: 54rpx;
			margin-right: 8rpx;
			flex-direction: column;
		}

		.item_sel {
			font-size: 31rpx;
			font-weight: 500;
			color: #222222;
		}

		.item_nosel {
			font-size: 27rpx;
			font-weight: 400;
			color: #999999;
		}

		.item_line {
			width: 35rpx;
			height: 12rpx;
			background: linear-gradient(180deg, #D91B1B 0%, rgba(255, 255, 255, 0) 100%);
			position: relative;
			bottom: 15rpx;
		}

		.list_item {
			padding: 15rpx;
			margin-top: 23rpx;

			.title {
				font-size: 27rpx;
				font-weight: 500;
				color: #222222;
			}

			.time {
				font-size: 23rpx;
				font-weight: 500;
				color: #999999;
				margin-top: 4rpx;
			}

			.money {
				font-size: 27rpx;
				font-weight: 500;
				color: #D91B1B;
			}

			.tip {
				font-size: 23rpx;
				font-weight: 400;
				color: #999999;
				margin-top: 4rpx;
				text-align: right;
			}
		}
	}
</style>
