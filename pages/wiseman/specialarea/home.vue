<template>
	<view class="page" @click.stop="closeQrcode">
		<view v-if="isshowpage">
			<u-navbar bgColor="#D91B1B" leftIconColor="#FFFFFF" :autoBack="true">
			</u-navbar>
			<view :style="{ height: navbarHeight + 'px' }"></view>
			<view class="user_info flex">
				<view class="head_border">
					<image class="head_pic"
						:src="detail.headImg?detail.headImg:'https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693016884192.jpg'">
					</image>
				</view>
				<view class="user_info_right flex jsb">
					<view class="top">
						<view class="nickname oneLine">{{ detail.nickname }}</view>
						<view class="numinfo flex alc">
							<view @click="jumpFollowFans(1)">
								<text class="label">关注</text>
								<text class="num num_left">{{ detail.followNum }}</text>
							</view>
							<view @click="jumpFollowFans(2)">
								<text class="label label_left">粉丝</text>
								<text class="num num_left">{{ detail.fansNum }}</text>
							</view>
							<text class="label label_left">获赞</text>
							<text class="num num_left">{{ detail.likeNum }}</text>
						</view>
						<view class="shop_btn flex alc jsc" @click="jumpWisemanSmallStore">
							<view class="flex alc">
								<image class="shop_btn_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692855379023.png">
								</image>
								<text class="shop_btn_text">店铺</text>
							</view>
						</view>
					</view>
					<view class="flex" style="margin-top: 15rpx;">
						<view class="message_div" @click="jumpMessage">
							<image class="message_icon"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692168054462.png">
							</image>
							<view v-if="detail.messageNum > 0" class="message_num_div flex jsc alc">
								<text class="message_num">{{ detail.messageNum }}</text>
							</view>
						</view>
						<view class="qrcode_icon_div">
							<image class="qrcode_icon"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692167968026.png"
								@click.stop="showQrcode">
							</image>
							<view v-show="showVisble" class="qrcode_visble">
								<view class="btn qrcode_btn_one" @click="jumpRecommendedWiseman">推荐达人</view>
								<view class="btn" @click="jumpRecommendedShopQrcode">推荐商家</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="content">
				<view class="user_num_info flex">
					<view class="user_num_item" @click="jumpInCome">
						<view>
							<text class="num_font fs24">¥</text>
							<text class="num_font fs35">{{ detail.balance }}</text>
						</view>
						<view class="user_num_btn flex alc">
							<text class="font">佣金收入</text>
							<u-icon name="arrow-right" color="#666666" :bold="true" size="20rpx"></u-icon>
						</view>
					</view>
					<view class="user_num_item" @click="jumpOrder">
						<view>
							<text class="num_font fs35">{{ detail.orderNum }}</text>
							<text class="num_font fs24">笔</text>
						</view>
						<view class="user_num_btn flex alc">
							<text class="font">我的订单</text>
							<u-icon name="arrow-right" color="#666666" :bold="true" size="20rpx"></u-icon>
						</view>
					</view>
					<view class="user_num_item" @click="jumpWorks">
						<view>
							<text class="num_font fs35">{{ detail.articleNum }}</text>
							<text class="num_font fs24">个</text>
						</view>
						<view class="user_num_btn flex alc">
							<text class="font">我的作品</text>
							<u-icon name="arrow-right" color="#666666" :bold="true" size="20rpx"></u-icon>
						</view>
					</view>
				</view>
				<view class="notice flex alc">
					<image class="notice_icon"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692184617100.png">
					</image>
					<view style="width: 100%;margin-left: 8rpx;" class="flex alc">
						<u-notice-bar color='#222222' fontSize="27rpx" direction='column'
							:text="noticeList.length ? noticeList : ['暂无']" bgColor="#ffffff" :icon='none'>
						</u-notice-bar>
					</view>
				</view>

				<square :list="squarerows.list" :home="true" @update="setObj" />

				<view class="user_tool">
					<view class="tool_title">经营工具</view>
					<view class="tool_div flex jsb">
						<view class="tool_item" @click="jumpMyTeam">
							<view class="tool_item_img">
								<image class="tool_item_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692187497066.png">
								</image>
							</view>
							<view class="tool_item_title">我的团队</view>
						</view>
						<view class="tool_item" @click="jumpRecommendedShop">
							<view class="tool_item_img">
								<image class="tool_item_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692187515099.png">
								</image>
							</view>
							<view class="tool_item_title">推荐商家</view>
						</view>
						<view class="tool_item" @click="jumpflowplan">
							<view class="tool_item_img">
								<image class="tool_item_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20231006/file_1696572869471.png">
								</image>
							</view>
							<view class="tool_item_title">流量计划</view>
						</view>
						<view class="tool_item" @click="jumpCreativeCenter">
							<view class="tool_item_img">
								<image class="tool_item_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692187549355.png">
								</image>
							</view>
							<view class="tool_item_title">创作中心</view>
						</view>
						<view class="tool_item" @click="onWebView">
							<view class="tool_item_img">
								<image class="tool_item_img"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692187565740.png">
								</image>
							</view>
							<view class="tool_item_title">商务政策</view>
						</view>
					</view>
				</view>
				<carousel :topStyle="{ marginTop: '23rpx' }" :radius="7" height="146rpx" urlkey="url" :dataType="2"
					systemCode="APPLETS_EXPERT_HOME_CENTRAL" :indicatorType="1">
				</carousel>
				<view class="user_fengyun">
					<view class="fengyun_title">风云热榜</view>
					<view class="fengyun_list flex">
						<view class="fengyun_list_dhpx">
							<view class="fengyun_list_title">带货排行榜</view>
							<view v-for="(item, index) in rankList" class="fengyun_list_item flex alc">
								<view style="width: 25rpx;"><text class="item_num">{{ index + 1 }}</text></view>
								<image class="item_img" :src="item.coverPicture"></image>
								<text class="item_nickname oneLine">{{ item.title }}</text>
							</view>
						</view>
						<view class="fengyun_list_dhbs">
							<view class="fengyun_list_title">带货飙升榜</view>
							<view v-for="(item, index) in hotList" class="fengyun_list_item flex alc">
								<view style="width: 25rpx;"><text class="item_num">{{ index + 1 }}</text></view>
								<image class="item_img" :src="item.coverPicture"></image>
								<text class="item_nickname oneLine">{{ item.title }}</text>
							</view>
						</view>
					</view>
				</view>
				<view style="height: 50rpx;"></view>
			</view>
			<view class="add_post" @click="jumpAddPost">
				<view class="add_post_icon">
					<image class="add_post_icon"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237294607.png">
					</image>
				</view>
			</view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import square from '@/pages/wiseman/darenxiaodian/components/square.vue'
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			square,
			carousel
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
		},
		onLoad() {
			this.queryNoticeList()
			this.queryRankingList(5)
			this.queryRankingList(6)
			this.getSquareList()
		},
		onShow() {
			this.queryHome()
			this.setObj()
		},
		data() {
			return {
				showVisble: false,
				noticeList: [],
				detail: {},
				isshowpage: false,
				rankList: [],
				hotList: [],
				squarerows: {
					list: [],
					total: 0
				},
			}
		},
		methods: {
			queryHome() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.post("/coc-active/api/v1/newExpert/expertIndex")
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
					}).finally(res => {
						if (!this.isshowpage) {
							this.isshowpage = true
							this.$hideLoading()
						}
					})
			},
			queryNoticeList() {
				this.$newrequest.post("/coc-active/api/v1/newExpert/untruthBroadcastMessageList", {
					current: 1,
					size: 99,
					displayLocation: 1
				}).then(res => {
					if (res.code === 200) {
						this.noticeList = res.data.map(m => {
							return m.content
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			queryRankingList(type) {
				this.$newrequest.post("/coc-merchant-app/app/v2/home_page/merchant/power/list", {
						type
					})
					.then(res => {
						if (res.code === 200) {
							if (type === 5) {
								this.rankList = res.data
							} else if (type === 6) {
								this.hotList = res.data
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					})
			},
			closeQrcode() {
				this.showVisble = false
			},
			showQrcode() {
				this.showVisble = !this.showVisble
			},
			//商务政策
			onWebView() {
				let url = 'https://h5.dcqcjlb.com/protocol/talent_business_policy.html'
				uni.navigateTo({
					url: '/pages/agreement/webview?url=' + url
				})
			},
			//达人小店
			jumpWisemanSmallStore() {
				uni.navigateTo({
					url: '/pages/wiseman/darenxiaodian/index'
				})
			},
			//关注粉丝
			jumpFollowFans(type) {
				uni.navigateTo({
					url: `/pages/wiseman/specialarea/myfriends?type=${type}`
				})
			},
			//消息
			jumpMessage() {
				uni.navigateTo({
					url: '/pages/wiseman/specialarea/message'
				})
			},
			//推荐商家二维码
			jumpRecommendedShopQrcode() {
				uni.navigateTo({
					url: '/pages/wiseman/inviteinbusiness'
				})
			},
			//推荐商家
			jumpRecommendedShop() {
				uni.navigateTo({
					url: '/pages/wiseman/recommended_merchants'
				})
			},
			//推荐达人
			jumpRecommendedWiseman() {
				uni.navigateTo({
					url: '/pages/wiseman/invitein'
				})
			},
			//佣金收入
			jumpOrder() {
				uni.navigateTo({
					url: '/pages/wiseman/specialarea/order'
				})
			},
			//我的收益
			jumpInCome() {
				uni.navigateTo({
					url: '/pages/myEarnings/mainPage'
				})
			},
			//我的作品
			jumpWorks() {
				uni.navigateTo({
					url: '/pages/wiseman/mywork'
				})
			},
			//我的团队
			jumpMyTeam() {
				uni.navigateTo({
					url: '/pages/wiseman/specialarea/myteam'
				})
			},
			// 流量计划
			jumpflowplan(){
				uni.navigateTo({
					url: '/pages/wiseman/flowplan/index'
				})
			},
			//创作中心
			jumpCreativeCenter() {
				uni.navigateTo({
					url: '/pages/wiseman/specialarea/creative_center'
				})
			},
			//发帖
			jumpAddPost() {
				uni.navigateTo({
					url: '/pages/wiseman/component/addimgarticle'
				})
			},
			async getSquareList() {
				const {
					data
				} = await this.$request.post('/coc-active/api/v1/expert/selection/library/expert/list', {
					current: 1,
					size: 3
				})
				const list = []
				data.records.forEach((v) => {
					v.type_txt = v.type === 1 ? '活' : v.type === 2 ? '保' : v.type === 3 ? '救' : v.type === 4 ?
						'团' : v.type === 5 ? '套' : ''
					list.push(v)
				})
				this.squarerows.list = list
				this.squarerows.total = data.total
			},
			setObj() {
				// this.squarerows = {
				// 	list: [],
				// 	total: 0
				// }
				this.getSquareList()
			},
		}
	}
</script>

<style scoped lang="scss">
	.page {
		min-height: 100vh;
	}

	.user_info {
		background-color: #D91B1B;
		padding: 10rpx 38rpx 31rpx 23rpx;

		.head_border {
			width: 108rpx;
			height: 108rpx;
			border-radius: 88rpx;
			border: 4rpx solid #FFFFFF;
		}

		.head_pic {
			width: 108rpx;
			height: 108rpx;
			border-radius: 88rpx;
		}

		.user_info_right {
			margin-left: 16rpx;
			width: 100%;


			.nickname {
				font-size: 31rpx;
				font-weight: 600;
				color: #FFFFFF;
				max-width: 320rpx;
			}


			.numinfo {
				margin-top: 7rpx;

				.label {
					font-size: 27rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 0.8);
				}

				.num {
					font-size: 27rpx;
					font-weight: 500;
					color: #FFFFFF;
				}

				.num_left {
					margin-left: 8rpx;
				}

				.label_left {
					margin-left: 31rpx;
				}
			}

			.shop_btn {
				width: 379rpx;
				height: 54rpx;
				background: rgba(255, 255, 255, 0.2);
				border-radius: 138rpx;
				margin-top: 8rpx;

				.shop_btn_img {
					width: 31rpx;
					height: 31rpx;
				}

				.shop_btn_text {
					font-size: 27rpx;
					font-weight: 400;
					color: #FFFFFF;
					margin-left: 8rpx;
				}
			}

			.message_div {
				width: 46rpx;
				height: 46rpx;
				position: relative;

				.message_icon {
					width: 46rpx;
					height: 46rpx;
				}

				.message_num_div {
					width: 31rpx;
					height: 31rpx;
					background: #FFFFFF;
					border-radius: 98rpx;
					position: absolute;
					top: -12rpx;
					right: -12rpx;

					.message_num {
						font-size: 19rpx;
						font-weight: 800;
						color: #D91B1B;
					}
				}
			}

			.qrcode_icon_div {
				width: 46rpx;
				height: 46rpx;
				margin-left: 30rpx;
				position: relative;

				.qrcode_icon {
					width: 46rpx;
					height: 46rpx;
				}

				.qrcode_visble {
					width: 176rpx;
					height: 188rpx;
					background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169684893.png');
					background-size: 100% 100%;
					background-repeat: no-repeat;
					position: absolute;
					right: -17rpx;
					top: 68rpx;

					.qrcode_btn_one {
						margin-top: 12rpx;
					}

					.btn {
						height: 88rpx;
						width: 100%;
						font-size: 27rpx;
						font-weight: 400;
						color: #FFFFFF;
						text-align: center;
						line-height: 88rpx;
					}
				}
			}
		}
	}

	.content {
		padding: 0 23rpx;

		.user_num_info {
			padding: 8rpx 0;
			background: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 23rpx;

			.user_num_item {
				flex: 1;
				height: 162rpx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;

				.num_font {
					font-size: 35rpx;
					font-weight: 800;
					color: #D91B1B;
				}

				.fs24 {
					font-size: 24rpx;
				}

				.fs35 {
					font-size: 35rpx;
				}

				.user_num_btn {
					margin-top: 16rpx;

					.font {
						font-size: 27rpx;
						font-weight: 400;
						color: #666666;
					}
				}
			}
		}

		.notice {
			padding: 16rpx 23rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 23rpx;
			height: 46rpx;
		}

		.notice_icon {
			width: 46rpx;
			height: 46rpx;
		}

		.user_tool {
			padding: 23rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 23rpx;

			.tool_title {
				font-size: 35rpx;
				font-weight: 500;
				color: #222222;
			}

			.tool_div {
				margin-top: 39rpx;

				.tool_item {
					width: 138rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					.tool_item_img {
						width: 46rpx;
						height: 46rpx;
					}

					.tool_item_title {
						font-size: 27rpx;
						font-weight: 400;
						color: #222222;
						margin-top: 15rpx;
					}
				}
			}
		}

		.user_fengyun {
			padding: 38rpx 23rpx 23rpx 23rpx;
			background: #FFFFFF;
			border-radius: 15rpx;
			margin-top: 23rpx;

			.fengyun_title {
				font-size: 35rpx;
				font-weight: 500;
				color: #222222;
			}

			.fengyun_list {
				margin-top: 23rpx;

				.fengyun_list_dhpx {
					padding: 16rpx;
					background: #FFF4F4;
					border-radius: 8rpx;
					flex: 1;
				}

				.fengyun_list_dhbs {
					padding: 16rpx;
					background: #FBF6EF;
					border-radius: 8rpx;
					margin-left: 23rpx;
					flex: 1;
				}

				.fengyun_list_title {
					font-size: 27rpx;
					font-weight: 500;
					color: #666666;
				}

				.fengyun_list_item {
					padding: 23rpx 0;

					.item_num {
						font-size: 31rpx;
						font-weight: 800;
						color: #222222;
					}

					.item_img {
						width: 77rpx;
						height: 77rpx;
						border-radius: 8rpx;
						margin-left: 16rpx;
					}

					.item_nickname {
						font-size: 27rpx;
						font-weight: 400;
						color: #222222;
						margin-left: 8rpx;
						width: 170rpx;
					}
				}
			}
		}
	}

	.add_post {
		position: fixed;
		bottom: 60rpx;
		right: 20rpx;

		.add_post_icon {
			width: 108rpx;
			height: 108rpx;
		}

		.add_post_title {
			font-size: 27rpx;
			font-weight: 500;
			color: #222222;
			margin-top: 5rpx;
			text-align: center;
		}
	}

	::v-deep .u-notice__swiper {
		height: 46rpx !important;
	}
</style>
