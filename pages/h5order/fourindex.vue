<template>
	<view class="page">
	
		<view v-if="isShowpage">
			<u-navbar :autoBack='false' bgColor='' leftText="" title=" " :safeAreaInsetTop="true" @leftClick='onreturn'>
				<view class="u-nav-slot" slot="left">
					<!-- <u-icon v-if="isshowreturn" name="arrow-left" size="19"></u-icon> -->
					<image v-if="isshowreturn" name="arrow-left" style="width: 61rpx;height: 61rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230811/file_1691716605149.png"></image>
					
				</view>
			</u-navbar>
			<view v-if="imgList.length==0" style="height: 100rpx;"></view>
			<carousel v-if="imgList.length>0" :list="imgList" :topStyle="{width: '750rpx',borderRadius: '0rpx'}"
				height="430rpx" urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
			</carousel>
			<view class="info-item">
				<view class="u-flex jsb alc">
					<view>
						<view class="size32 fwb oneLine" style="width: 534rpx;">{{dataList.baseName}}</view>

					</view>
					<view class="tac" @click="Oncooperate">
						<view>
							<image style="width: 46rpx;height: 46rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690182269650.png">
							</image>
						</view>
						<view class="mainRed size24">我要合作</view>
					</view>
				</view>
				<u-divider :text="null"></u-divider>
				<view class="size28">
					{{dataList.baseAddress}}
				</view>
				<view class="u-flex txtDarkGray size24  mt10">
					<view @click="openmap" class="u-flex ">
						<view style="margin-top: 4rpx;">
							<image style="width: 27rpx;height: 27rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183164211.png">
							</image>
						</view>
						<view class="ml10">距您{{dataList.distanceMsg}}</view>
					</view>
					<view @click="telphone" class="u-flex " style="margin-left: 65rpx;">
						<view style="margin-top: 4rpx;">
							<image style="width: 27rpx;height: 27rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690183493823.png">
							</image>
						</view>
						<view class="ml10">电话联系</view>
					</view>
				</view>
			</view>

			<view class="main-item">
				<view class="u-flex tac "
					style="position: sticky;top: 0rpx;background-color: #ffffff;z-index: 9999999;height: 100rpx;justify-content: space-around;">
					<view class="tab_item" style="line-height: 100rpx;" v-for="(item, index) in tags" :key="index"
						:class="{ active: tabsindex === index }" @click="Onclicktab(item,index)">
						<view :class="{'currentitem':tabsindex==index}">
							{{ item.name}}
						</view>
						<view v-if="tabsindex==index" style="margin-top: -80rpx;">
							<image style="width: 34rpx;height: 11rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690189860584.png">
							</image>
						</view>
					</view>
				</view>
				<view class="u_contetns mt10">
					<!-- 市场活动 -->
					<view class="main0">
						<!-- 活动 -->
						<view v-if="dataList.activityDisplayVOS.length>0">
							<view v-for="(item,index) in dataList.activityDisplayVOS" :key="item.id" class="u-flex"
								style="margin-bottom: 30rpx;" @click="Onpushactivity(item)">
								<view>
									<image style="width: 188rpx;height: 107rpx;border-radius: 8rpx;"
										:src="item.coverPicture"></image>
								</view>
								<view style="margin-left: 15rpx;">
									<view class="moreLine size28 fwb " style="width: 370rpx;">{{item.title}}</view>
									<view class="mt10">
										<image v-if="item.activityPaymentPreferenceId==6"
											style="width: 169rpx;height: 30rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230722/file_1690017025022.png">
										</image>
										<image v-else-if="item.activityPaymentPreferenceId==5"
											style="width: 169rpx;height: 30rpx;"
											src="https://oss.dcqcjlb.com/51che_java_dev/20230725/file_1690264071625.png">
										</image>
									</view>
									<view class="u-flex mt10">
										<view class="yuan">活动</view>
										<view class="mainRed fwb size24" style="margin-left: 7rpx;">
											{{item.flashSalePrice>0?item.flashSalePrice:'免费'}}
										</view>
										<view class="txtLighGray size24 txtls" style="margin-left: 7rpx;">
											¥{{item.marketPrice}}</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 精彩回放 -->
						<view v-if="dataList.marvellousVOS.length>0">
							<view class="mt30 size28 fwb">精彩回放</view>
							<view class="mt10">
								<scroll-view scroll-x="true" scroll-left="0">
									<view class="u-flex">
										<view v-for="item in dataList.marvellousVOS" :key="item.marvellousId"
											style="margin-right: 23rpx;" @click="Onpushwonder(item)">
											<view>
												<image style="border-radius: 8rpx;width: 250rpx;height: 188rpx;"
													:src="item.img"></image>
											</view>
											<view class="moreLine size28">
												{{item.title}}
											</view>
										</view>
									</view>
								</scroll-view>
							</view>
						</view>
					</view>
					<!-- 保养特惠 -->
					<view class="main1">
						<view v-if="dataList.maintainMealListVOS.length>0">
							<view class="mt30 size28 fwb">保养特惠</view>
							<view class="upkeepList">

								<view v-for="(item,index) in dataList.maintainMealListVOS" :key="index"
									class="upkeepItem mb10" @click="Onpushmeal(item)">
									<image :src="item.coverPicture	" class="upkeepImg" mode="aspectFill"></image>

									<view style="padding: 15rpx;">
										<view class="ukH moreLine mb20">{{item.title}}</view>
										<view class="flex" style="align-items: baseline;">
											<u-icon name="rmb" :bold='true' color="#D91B1B" size="12"></u-icon>
											<view class="huiPrice">{{item.flashSalePrice>0?item.flashSalePrice:"免费" }}
											</view>
											<view class="txtLighGray size24 ml10 txtls">¥{{item.marketPrice}}元</view>
										</view>
										<view class="flex alc jsb">
											<view class="txtLighGray size24">{{dataList.baseName}}</view>
											<view class="goShop">购买</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 新车鉴赏 -->
					<view class="main2">
						<view v-if="dataList.newCarDiscountVOS.length>0">
							<view>
								<view class="mt30 size28 fwb">新车鉴赏</view>
							</view>
							<view v-for="(item,index) in dataList.newCarDiscountVOS" :key="index"
								class="newCarItem flex jsb alc" @click="Onpushnewcar(item)">
								<view class="newCarL">
									<image :src="item.faceImage"></image>
								</view>
								<view class="newCarR ml20">
									<view class="flex alc mb20">
										<text class="newCarT oneLine">{{item.vehicleName}}</text>
										<image src="@/static/image/down.png" class="carDown" mode="widthFix"></image>
										<text class="size24 mainRed">优惠{{item.discount}}</text>
									</view>
									<view class="size24 mb20">指导价：{{item.elevatingPriceMin}}
										<text v-if="item.elevatingPriceMax">
											-{{item.elevatingPriceMax}}
										</text>

									</view>
									<view class="flex alc jsb">
										<view class="newCarShopName txtLighGray size24">{{item.askNum}}人咨询</view>
										<view class="goShop">咨询</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 优惠信息 -->
					<view class="main3">
						<view v-if="dataList.couponNewListVOS.length>0||dataList.brandNewsListVOS.length>0">
							<view>
								<view class="mt30 size28 fwb">优惠信息</view>
							</view>
							<view v-if="dataList.couponNewListVOS.length>0">
								<view class="quanItem bgfff br10" v-for="(item, index) in dataList.couponNewListVOS"
									:key="index" style="margin-bottom: 20rpx;">
									<view @click="lookCoupon(item)">
										<view class="u-flex jsb HuiNum">
											<view class="u-flex mt10">
												<text class="size32 fwb oneLine"
													style="width: 350rpx;">{{item.name}}</text>
											</view>
											<view class="u-flex mainRed " style="align-items:baseline;">
												<text class="fwb" style="font-size:36rpx;">¥</text>
												<text class="fwb"
													style="font-size:52rpx;">{{ item.discountMoney }}</text>
											</view>
										</view>
										<view class="u-flex jsb alc mt10">
											<view class="size24">{{item.shopName}}</view>
											<view class="mainRed size24">{{item.useSceneName}}</view>
										</view>
									</view>
									<view class="u-flex jsb alc expirationDate">
										<view class="size24 txtLighGray">
											有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}</view>

									</view>
								</view>
							</view>
							<view v-if="dataList.brandNewsListVOS.length>0">
								<view>
									<view class="mt30 size28 fwb">品牌咨询</view>
								</view>
								<view v-for="(item,index) in dataList.brandNewsListVOS" :key="index" class="card"
									@click="Onpushnews(item)">
									<view>
										<u-avatar shape="square" size="65" :src="item.faceImg"></u-avatar>
									</view>
									<view style="margin-left: 21rpx;position: relative;">
										<view class="moreLine" style="font-size: 28rpx;width: 400rpx;">
											{{item.title}}
										</view>
										<view class="u-flex"
											style="font-size: 24rpx;color: #999999;position: absolute;bottom: 0rpx;width: 400rpx;justify-content: space-between;">
											<view>{{item.shopName}}
											</view>
											<view>{{item.createdAt}}
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			carousel
		},
		data() {
			return {
				tabsindex: 0,
				tags: [{
						name: '市场活动',
					},
					{
						name: '保养特惠',
					},
					{
						name: '新车鉴赏',
					},
					{
						name: '优惠信息',
					}
				],
				dataList: {},
				isapp: 0,
				isShowpage: false,
				isshowreturn: true,
				id: '',
				isClick: false,
				preActive: 0,
				imgList: [
					"https://oss.dcqcjlb.com/51che_java_dev/20221208/f686953912354ff7b262120b6c5c4015.jpg"
				],
			}
		},

		onLoad(option) {
			let _this = this
			if (option.isapp) {
				this.isapp = 1
			}
			this.id = option.id
			setTimeout(() => {
				_this.getheight()
			}, 1000)
			this.getList()
		},
		onPageScroll(obj) {
			const {
				scrollTop
			} = obj
			this.scrollTochang(scrollTop)
		},
		onShow() {},
		// onUnload() {
		// 	if (this.isapp == 1) {
		// 		if (window._51club) {
		// 			window._51club.backIntercept('app');
		// 		}
		// 		if (window.webkit.messageHandlers) {
		// 			window.webkit.messageHandlers.backIntercept.postMessage("app")
		// 		}
		// 	}
		// },
		methods: {
			onreturn() {
				if (this.isapp == 1) {
					if (window._51club) {
						window._51club.backIntercept('app');
					}
					if (window.webkit.messageHandlers) {
						window.webkit.messageHandlers.backIntercept.postMessage("app")
					}
				}
			},
			Onpushnews(item) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/brandInfo?id=' + item.id
				})
			},
			Onpushnewcar(item) {
				uni.navigateTo({
					url: '/pages/carShops/carList/index?type=1' + '&id=' + item.vehicleInfoId
				})
			},
			Onpushmeal(item) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + item.id
				})
			},
			Onpushwonder(item) {
				uni.navigateTo({
					url: "/pages/home/wonderfulReview/detail?id=" + item.marvellousId,
				});
			},
			Onpushactivity(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.id
				})
			},
			getheight() {
				this.$nextTick(() => {
					//   此时把每个dom的距离拿出来
					this.tags.forEach((item, index) => {
						// uni.createSelectorQuery().select('.u_contetns').boundingClientRect(data => {
						// 	console.log(data)
						// 		//目标节点、也可以是最外层的父级节点
						// 		uni.createSelectorQuery().select(`.main${index}`).boundingClientRect(
						// 				res => {
						// 					item.scrollTop = res.top - data.top + 380
						// 				})
						// 			.exec()
						// 	})
						// 	.exec()
					
					let element = document.querySelector('.main' + index);
					let elementTop = this.getElementTop(element);
					// console.log(elementTop)
					item.scrollTop =document.querySelector('.main' + index).offsetTop-50
					})
				})
			},
			getElementTop(element){
				let actualTop = element.offsetTop;
				  let current = element.offsetParent;
				  
				  while (current !== null) {
				    actualTop += current.offsetTop;
				    current = current.offsetParent;
				  }
				  
				  return actualTop;
			},
			scrollTochang(scrollTop) {

				if (scrollTop > 0) {
					this.isshowreturn = false
				} else {
					this.isshowreturn = true
				}
				if (this.isClick) return
				let idx = this.tags.findIndex(item => scrollTop <= item.scrollTop)
				if(idx==-1){
					idx=3
				}else if (idx==0){
					
				}else{
					idx=idx-1
				}
				this.tabsindex = idx
			
				this.preActive = this.tabsindex 
			},
			Onclicktab(item, index) {
				this.isClick = true
				const that = this
				const {
					scrollTop
				} = item
				uni.pageScrollTo({
					duration: 0,
					scrollTop:scrollTop+1,
					complete() {
						that.isClick = false
					}
				})
				this.tabsindex=index
				this.preActive = this.currentActive
			},
			telphone() {
				if (window._51club) {
					window._51club.callPhone(this.dataList.baseMobile)
					return false
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.callPhone.postMessage(this.dataList.baseMobile)
					return false
				}
			},
			openmap() {
				if (window._51club) {
					window._51club.openMap(this.dataList.lat, this.dataList.lng)
					return false
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.openMap.postMessage(this.dataList.lat, this.dataList.lng)
					return false
				}
			},
			Oncooperate() {
				if (window._51club) {
					window._51club.goTimChat(this.dataList.shopId)
					return false
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.goTimChat.postMessage(this.dataList.shopId)
					return false
				}
			},
			getList() {
				this.$showLoading();
				this.$newrequest
					.post("/coc-merchant-app/app/v2/home_page/foursMerchantHomepage", {
						id: this.id
					})
					.then(res => {
						if (res.code == 200) {
							this.dataList = res.data

							if (res.data.carouselUrl) {
								let list = []
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
							
								})
								this.imgList = list;
							}
						} else {
							uni.showToast({
								title: res.message,
								icon: "none",
								duration: 2000,
							});
						}
					}).finally(() => {
						this.isShowpage = true;
						this.$hideLoading();
					});
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.info-item {
		border-radius: 38rpx 38rpx 0rpx 0rpx;
		background: #FFFFFF;
		padding: 23rpx;
		position: relative;
		top: -19rpx;
	}

	.main-item {
		margin: 23rpx;
		padding: 23rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
	}

	.tab_item {
		color: #666;
		// margin-right: 40rpx;
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
		background: #FBE8E8;
		border-radius: 158rpx 158rpx 158rpx 158rpx;
		line-height: 36rpx;
		font-size: 20rpx;
		text-align: center;
		color: #DD3232;
	}

	.upkeepItem {
		border-radius: 10rpx;
		background-color: #fff;
		width: 295rpx;
		margin-right: 10rpx;
	}

	.upkeepImg {
		width: 295rpx;
		height: 295rpx;
		border-radius: 10rpx 10rpx 0 0;
	}

	.ukH {
		font-size: 28rpx;
		font-weight: bold;
		height: 76rpx;
	}

	.huiPrice {
		font-size: 44rpx;
		font-weight: bold;
		color: #D91B1B;
	}

	.goShop {
		width: 100rpx;
		height: 52rpx;
		line-height: 52rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.upkeepList {
		display: flex;
		flex-wrap: wrap;
		margin: 13rpx 25rpx;
	}

	.newCarItem {
		position: relative;
		padding: 0 16rpx 0 0;
		background-color: #fff;
		border-radius: 10rpx;
		margin: 10rpx 25rpx;
	}

	.newCarL {
		image {
			width: 280rpx;
			height: 200rpx;
			border-radius: 10rpx 0 0 10rpx;
		}
	}

	.newCarR {
		width: 380rpx;
		padding: 30rpx 0 20rpx;
	}

	.newCarT {
		font-size: 32rpx;
		font-weight: bold;
		margin-right: 10rpx;
		max-width: 180rpx;
	}

	.carDown {
		width: 38rpx;
		height: 41rpx;
	}

	.quanItem {
		padding: 20rpx 30rpx;
	}

	.expirationDate {
		margin-top: 30rpx;
		padding-top: 20rpx;
		border-top: 1rpx dotted #999;
	}

	.quanbtn {
		width: 140rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		color: #ffffff;
		border-radius: 28rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 12rpx 25rpx;
		padding: 14rpx;
		display: flex;
	}
</style>
