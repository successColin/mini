<template>
	<view class="page">
		<view v-if="isShowpage">
			<u-navbar :autoBack="false" bgColor="" leftText="" title=" " :safeAreaInsetTop="true" @leftClick="onreturn">
				<view class="u-nav-slot" slot="left">
					<!-- <u-icon v-if="isshowreturn" name="arrow-left" size="19"></u-icon> -->
					<image v-if="isshowreturn" style="width: 61rpx; height: 61rpx"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230811/file_1691716605149.png"></image>
				</view>
			</u-navbar>
			<view v-if="imgList.length==0" style="height: 100rpx;"></view>
			<view v-if="imgList.length > 0">
				<carousel :list="imgList" :topStyle="{ width: '750rpx', borderRadius: '0rpx' }" height="430rpx"
					urlkey="url" :dataType="1" :indicatorType="4" :clickType="2" :isfullscreen="false">
				</carousel>
			</view>

			<view class="info-item">
				<view class="u-flex jsb">
					<view>
						<view class="size32 fwb oneLine" style="width: 534rpx">{{
              dataList.baseName
            }}</view>
						<view class="u-flex alc mt10">
							<view class="u-flex alc">
								<view>
									<u-rate activeColor="#D91B1B" count="5" v-model="dataList.star"
										:readonly="true"></u-rate>
								</view>
								<view class="size24" style="margin-left: 15rpx">{{
                  dataList.star
                }}</view>
							</view>
							<view class="ml20 size24 txtDarkGray u-flex">
								{{ dataList.shopFeature }}
							</view>
						</view>
					</view>
					<view class="tac" @click="Oncooperate">
						<view>
							<image style="width: 46rpx; height: 46rpx"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690182269650.png">
							</image>
						</view>
						<view class="mainRed size24">我要合作</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="size26">
					{{ dataList.baseAddress }}
				</view>
				<view class="u-flex txtDarkGray size24 mt10">
					<view @click="openmap" class="u-flex">
						<view style="margin-top: 4rpx">
							<image style="width: 27rpx; height: 27rpx"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183164211.png">
							</image>
						</view>
						<view class="ml10">距您{{ dataList.distanceMsg }}</view>
					</view>
					<view @click="telphone" class="u-flex" style="margin-left: 60rpx">
						<view style="margin-top: 4rpx">
							<image style="width: 27rpx; height: 27rpx"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183493823.png">
							</image>
						</view>
						<view class="ml10">电话联系</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="size26">
					营业时间：<text class="txtDarkGray">{{ dataList.openingHours }}</text>
				</view>
			</view>

			<view class="main-item">
				<view>
					<view class="u-flex tac" style="
              position: sticky;
              top: 0rpx;
              background-color: #ffffff;
              z-index: 9999999;
              height: 100rpx;
              justify-content: space-around;
            ">
						<view class="tab_item" style="line-height: 100rpx" v-for="(item, index) in tags" :key="index"
							:class="{ active: tabsindex === index }" @click="Onclicktab(item, index)">
							<view :class="{ currentitem: tabsindex == index }">
								{{ item.name }}
							</view>
							<view v-if="tabsindex == index" style="margin-top: -80rpx">
								<image style="width: 34rpx; height: 11rpx"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690189860584.png">
								</image>
							</view>
						</view>
					</view>
					<!-- 内容 -->
					<view class="u_contetns mt10">
						<view>
							<view class="main0">
								<!-- 套餐 -->
								<view v-if="dataList.merchantDisplayVOS.length > 0" class="mt10">
									<view v-for="item in dataList.merchantDisplayVOS" :key="item.id" class="u-flex"
										style="margin-bottom: 15rpx" @click="Onpushchant(item)">
										<view>
											<image style="
                          width: 107rpx;
                          height: 107rpx;
                          border-radius: 8rpx;
                        " :src="item.coverPicture">
											</image>
										</view>
										<view style="margin-left: 15rpx">
											<view class="size26 oneLine fwb" style="width: 400rpx">{{ item.title }}
											</view>
											<view class="u-flex alc mt10">
												<view class="yuan">套</view>
												<view class="size24 mainRed ml10 fwb">¥{{ item.flashSalePrice }}</view>
												<view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="main1">
								<!-- 团购 -->
								<view v-if="dataList.groupDisplayVOS.length > 0" class="mt10">
									<view v-for="item in dataList.groupDisplayVOS" :key="item.groupPurchaseProductId"
										class="flex" style="margin-bottom: 15rpx" @click="OnPushGroup(item)">
										<view>
											<image style="
                          width: 107rpx;
                          height: 107rpx;
                          border-radius: 8rpx;
                        " :src="item.coverPicture"></image>
										</view>
										<view style="margin-left: 15rpx">
											<view class="size28 oneLine fwb" style="width: 400rpx">{{ item.title }}
											</view>
											<view v-if="item.activityPaymentPreferenceId" class="mainRed redBorder">
												<text v-if="item.activityPaymentPreferenceId == 4">人保信用卡用户专享</text>
												<text v-else-if="item.activityPaymentPreferenceId == 5">农行信用卡用户专享</text>
												<text v-else-if="item.activityPaymentPreferenceId == 6">工行信用卡用户专享</text>
												<text v-else-if="item.activityPaymentPreferenceId == 7">邮储信用卡用户专享</text>
													<text v-else-if="item.activityPaymentPreferenceId == 8">民生信用卡用户专享</text>
														<text v-else-if="item.activityPaymentPreferenceId == 10">官方优惠专享</text>
											</view>
											<view v-else> </view>
											<view class="u-flex alc mt10">
												<view class="yuan">团</view>
												<view class="size24 mainRed ml10 fwb">¥{{ item.flashSalePrice }}</view>
												<view class="size24 txtLighGray ml10 txtls ">¥{{ item.marketPrice }}
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="main2">
								<!-- 活动 -->
								<view>
									<view v-if="dataList.activityDisplayVOS.length > 0" class="mt10">
										<view v-for="item in dataList.activityDisplayVOS" :key="item.activityId"
											class="u-flex" style="margin-bottom: 15rpx" @click="Onpushactivity(item)">
											<view>
												<image style="
                            width: 188rpx;
                            height: 107rpx;
                            border-radius: 8rpx;
                          " :src="item.coverPicture"></image>
											</view>
											<view style="margin-left: 15rpx">
												<view class="size28 oneLine fwb" style="width: 400rpx">{{ item.title }}
												</view>
												<view class="mainRed redBorder-num">
													<text>剩余名额：{{ item.num }}</text>
												</view>

												<view class="u-flex alc mt10">
													<view class="yuan">活</view>
													<view class="size24 mainRed ml10 fwb">¥{{ item.flashSalePrice }}
													</view>
													<view class="size24 txtLighGray ml10 txtls">¥{{ item.marketPrice }}
													</view>
												</view>
											</view>
										</view>
									</view>
									<!-- 精彩回放 -->
									<view class="size26 fwb" v-if="dataList.marvellousVOS.length > 0">
										<view>精彩回放</view>
										<view class="mt10">
											<scroll-view scroll-x="true" scroll-left="0">
												<view class="u-flex">
													<view v-for="item in dataList.marvellousVOS"
														:key="item.marvellousId" style="margin-right: 23rpx"
														@click="Onpushwonder(item)">
														<view>
															<image style="
                                  border-radius: 8rpx;
                                  width: 250rpx;
                                  height: 188rpx;
                                " :src="item.img"></image>
														</view>
														<view class="moreLine size26">
															{{ item.title }}
														</view>
													</view>
												</view>
											</scroll-view>
										</view>
									</view>
								</view>
							</view>
							<view class="main3 mt10">
								<view class="size26 fwb">主页</view>
								<view>
									<div v-for="(item, index) in dataList.homePageDateVOS" :key="index">
										<view v-if="item.type == 1" class="select-shop-text">
											{{ item.associatedContent }}
										</view>
										<view v-if="item.type == 2 && item.pictureType == 1" class="select-shop-one">
											<image class="select-shop-one-img" mode="widthFix"
												:src="item.associatedContent">
											</image>
										</view>
										<view v-if="item.type == 2 && item.pictureType == 2"
											class="select-shop-two u-flex-al">
											<image class="select-shop-two-img" mode="widthFix"
												:src="item.associatedContent.split(',')[0]">
											</image>
											<image class="select-shop-two-img" mode="widthFix"
												:src="item.associatedContent.split(',')[1]">
											</image>
										</view>
										<video v-if="item.type == 3" class="select-shop-video"
											:enable-progress-gesture="false" :src="item.associatedContent"></video>
									</div>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 50rpx"></view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue";
	export default {
		components: {
			carousel,
		},
		data() {
			return {
				tabsindex: 0,
				tags: [{
						name: "精选套餐",
					},
					{
						name: "优惠团购",
					},
					{
						name: "活动报名",
					},
					{
						name: "主页",
					},
				],
				ispreview: 0,
				shopId: "",
				isapp: 0,
				dataList: {},
				imgList: [],
				isShowpage: false,
				isClick: false,
				preActive: 0,
				isshowreturn: true,
			};
		},
		onPageScroll(obj) {
			const {
				scrollTop
			} = obj;
			this.scrollTochang(scrollTop);
		},
		onLoad(option) {
			let _this = this;
			if (option.isapp) {
				this.isapp = 1;
			}
			if (option.ispreview) {
				this.ispreview = 1;
			}
			uni.setStorageSync("lat", option.lat);
			uni.setStorageSync("lng", option.lng);
			this.shopId = option.id;
			setTimeout(() => {
				_this.getheight();
			}, 1000);

			this.getlist();
		},

		onShow() {},
		onUnload() {
			// if (this.isapp == 1) {
			// 	if (window._51club) {
			// 		window._51club.backIntercept('app');
			// 	}
			// 	if (window.webkit.messageHandlers) {
			// 		window.webkit.messageHandlers.backIntercept.postMessage("app")
			// 	}
			// }
		},
		methods: {
			Onpushwonder(item) {
				uni.navigateTo({
					url: "/pages/home/wonderfulReview/detail?id=" + item.marvellousId,
				});
			},
			onreturn() {
				if (this.isapp == 1) {
					if (window._51club) {
						window._51club.backIntercept("app");
					}
					if (window.webkit.messageHandlers) {
						window.webkit.messageHandlers.backIntercept.postMessage("app");
					}
				}
			},
			Onpushactivity(item) {
				if (this.ispreview == 1) {
					return false;
				}
				uni.navigateTo({
					url: "/pages/home/activityDetail/index?id=" + item.id,
				});
			},
			OnPushGroup(item) {
				if (this.ispreview == 1) {
					return false;
				}
				uni.navigateTo({
					url: "/pages/grouppurchase/detail?id=" + item.id,
				});
			},
			Onpushchant(item) {
				if (this.ispreview == 1) {
					return false;
				}
				uni.navigateTo({
					url: "/pages/h5order/packageindex?id=" + item.id,
				});
			},
			getheight() {
				this.$nextTick(() => {
					//   此时把每个dom的距离拿出来

					this.tags.forEach((item, index) => {
						let element = document.querySelector(".main" + index);
						let elementTop = this.getElementTop(element);
						item.scrollTop =
							document.querySelector(".main" + index).offsetTop - 50;
					});
				});
			},

			scrollTochang(scrollTop) {
				if (scrollTop > 0) {
					this.isshowreturn = false;
				} else {
					this.isshowreturn = true;
				}
				if (this.isClick) return;
				let idx = this.tags.findIndex((item) => scrollTop <= item.scrollTop);
				if (idx == -1) {
					idx = 3;
				} else if (idx == 0) {} else {
					idx = idx - 1;
				}
				this.tabsindex = idx;
				this.preActive = this.tabsindex;
			},

			Onclicktab(item, index) {
				this.isClick = true;
				const that = this;
				const {
					scrollTop
				} = item;
				uni.pageScrollTo({
					duration: 0,
					scrollTop: scrollTop + 1,
					complete() {
						that.isClick = false;
					},
				});
				this.tabsindex = index;
				this.preActive = this.currentActive;
			},
			openmap() {
				if (window._51club) {
					window._51club.openMap(this.dataList.lat, this.dataList.lng);
					return false;
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.openMap.postMessage(
						this.dataList.lat,
						this.dataList.lng
					);
					return false;
				}
			},
			telphone() {
				if (window._51club) {
					window._51club.callPhone(this.dataList.baseMobile);
					return false;
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.callPhone.postMessage(
						this.dataList.baseMobile
					);
					return false;
				}
			},
			Oncooperate() {
				if (window._51club) {
					window._51club.goTimChat(this.dataList.shopId);
					return false;
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.goTimChat.postMessage(
						this.dataList.shopId
					);
					return false;
				}
			},

			getlist() {
				this.$showLoading();
				this.$newrequest
					.post("/coc-merchant-app/app/v2/home_page/merchantHomepage", {
						id: this.shopId,
					})
					.then((res) => {
						if (res.code == 200) {
							this.dataList = res.data;
							if (res.data.carouselUrl) {
								let list = [];
								res.data.carouselUrl.forEach(function(s) {
									if (s.shopCarouselType == 1) {
										list.push({
											url: s.carouselUrl,
											type: "image",
										});
									} else {
										list.push({
											url: s.carouselUrl,
											type: "video",
										});
									}
								});
								this.imgList = list;
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: "none",
								duration: 2000,
							});
						}
					})
					.finally(() => {
						this.isShowpage = true;
						this.$hideLoading();
					});
			},
		},
	};
</script>

<style lang="scss">
	.page {}

	.info-item {
		border-radius: 38rpx 38rpx 0rpx 0rpx;
		background: #ffffff;
		padding: 23rpx;
		position: relative;
		top: -19rpx;
	}

	.main-item {
		margin: 23rpx;
		padding: 23rpx;
		background: #ffffff;
		border-radius: 15rpx;
		margin-top: 10rpx;
	}

	.tab_item {
		color: #666;
		// margin-right: 60rpx;
		font-size: 28rpx;
	}

	.currentitem {
		font-size: 32rpx;
		font-weight: bold;
		color: #222222;
	}

	.yuan {
		width: 72rpx;
		height: 36rpx;
		background: #fbe8e8;
		border-radius: 158rpx 158rpx 158rpx 158rpx;
		line-height: 36rpx;
		font-size: 20rpx;
		text-align: center;
		color: #dd3232;
	}

	.select-shop-text {
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		// font-weight: 500;
		margin-bottom: 50rpx;
		white-space: pre-wrap;
	}

	.select-shop-one {
		margin-bottom: 8rpx;
	}

	.select-shop-one-img {
		width: 650rpx;
		border-radius: 10rpx;
	}

	.select-shop-two {
		justify-content: space-between;
		margin-bottom: 15rpx;
	}

	.select-shop-two-img {
		width: 320rpx;
		border-radius: 10rpx;
	}

	.select-shop-video {
		width: 100%;
		height: 400rpx;
		margin-bottom: 15rpx;
		border-radius: 10rpx;
	}

	.redBorder {
		display: initial;
		border-radius: 4rpx;
		border: 1rpx solid #d91b1b;
		padding: 4rpx;
		text-align: center;
		margin-top: 10rpx;
		font-size: 18rpx;
	}

	.redBorder-num {
		display: initial;
		border-radius: 4rpx;
		border: 1rpx solid #d91b1b;
		padding: 4rpx;
		text-align: center;
		margin-top: 5rpx;
		font-size: 18rpx;
	}

	.size26 {
		font-size: 26rpx;
	}
</style>