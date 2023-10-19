<template>
	<view class="page">
		<template v-if="isshowpage">
			<!-- 顶部广告栏 -->
			<carousel v-if="swiperList.length > 0" :list="swiperList" :topStyle="{ width: '750rpx' }" height="750rpx"
				urlkey="url" :dataType="1" :indicatorType="1" :clickType="2" :radius="0" :showCount="true"
				:autoPlay="autoPlay">
			</carousel>
			<view class="detailHbox mb12">
				<view class="detailH">{{ detail.maintainName }}</view>
				<view class="flex jsb detailPrice">
					<view class="flex priceLine">
						<u-icon name="rmb" color="#D91B1B" size="18"></u-icon>
						<view class="huiPrice">{{ detail.price }}</view>
						<view class="txtLighGray size24 ml10 txtls" style=" text-decoration:line-through; ">
							{{ detail.marketPrice }}元
						</view>
						<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10" v-if="iscommission!=1">
							<view class="u-flex" v-if="isExpert==1&&token&&detail.commissionPrice">
								<view class="u-flex">
									<view class="rebate-img rebate-size"></view>
								</view>
								<view class="rebate-style" style="margin-right: 24rpx;">
									{{detail.commissionPrice}}
								</view>
							</view>
						</view>
					</view>
					<view class="size24">已售{{ detail.saleAmount }}份</view>
				</view>
				<view v-if="detail.bankCardPrice&&iscommission==0" class="mainRed size24">
					工行信用卡专属价:<text class="size28 fwb">￥</text><text class="fwb"
						style="font-size: 36rpx;">{{detail.bankCardPrice}}</text>
				</view>
				<view v-else-if="iscommission==1">
					<commission :price='detail.commissionPrice' :proportion='detail.rate'></commission>
				</view>
			</view>
			<!-- 适用车型 -->
			<view class="detailModal mb12 bgfff">
				<view class="detailH">适用车型</view>
				<view class="applyCars mt20 size24">{{ detail.vehicle }}</view>
			</view>
			<!-- 套餐包含 -->
			<view class="detailModal mb12 bgfff">
				<view class="detailH">套餐包含</view>
				<view class="mealsList">
					<view class="mealItem flex jsb size24 mt20" v-for="(item, index) in detail.productVOS" :key="index">
						<view class="oneLine" style="width:500rpx">{{ item.productName }}</view>
						<view class="flex">
							<view class="size24 txtLighGray">（{{item.num}}份）</view>
							<view class="size24" style="width:80rpx;text-align:right;">{{ item.allMarketPrice }}元</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 有效期限 -->
			<view class="detailModal mb12 bgfff">
				<view class="detailH">有效期限</view>
				<view class="applyCars size24 mt20">购买后{{ detail.validityDay }}天内有效</view>
			</view>
			<!-- 温馨提示 -->
			<view class="detailModal mb12 bgfff">
				<view class="detailH">温馨提示</view>
				<view class="applyCars size24 mt20">{{ detail.tips }}</view>
			</view>
			<!-- 店铺地址 -->
			<view class="anotherbox ">
				<view class="flex shopAdress bgfff mb12" @click="goShop(detail.shopVO.shopId)">
					<image :src="detail.shopVO.headImg" class="shopHead"></image>
					<view style="flex:1">
						<view class="flex alc jsb">
							<text class="size32 fwb">{{ detail.shopVO.shopName }}</text>
							<view class="flex">
								<image src="@/static/image/dingwei.png" class="locationIcon"></image>
								<text class="size24">{{ detail.shopVO.shopDistance }}</text>
							</view>
						</view>
						<view class="size24 txtDarkGray mt20">{{ detail.shopVO.shopAddress }}</view>
					</view>
				</view>
				<!-- 图片展示 富文本-->
				<view class="detailImg">
					<u-parse :content="detail.detail"></u-parse>
				</view>
			</view>
			<!--  #ifdef MP-WEIXIN  -->
			<!-- 底部 立即抢购 -->
			<view v-if="iscommission==0" class="fixBottom flex jsb alc">
				<view class="flex detailPrice">
					<view class="flex priceLine">
						<u-icon name="rmb" color="#D91B1B" size="18"></u-icon>
						<view class="huiPrice">{{ detail.price }}</view>
						<view class="txtLighGray size24 ml10 txtls">原价{{ detail.marketPrice }}元</view>
						<view style="margin-left: 40rpx;text-align: center;position: relative;bottom: 22rpx;"
							@click="popposter">
							<view>
								<image src="@/static/image/share.png" style="width: 41rpx;height: 41rpx;"></image>
							</view>
							<view style="margin-top: 2rpx;">分享</view>
						</view>
					</view>
				</view>
				<view v-if="detail.status=='1'" class="sbrBtn" @click="buyBtn">立即抢购</view>
				<view v-else-if="detail.status=='0'" class="sbrBtn" style="background-color: #999999;">已下架</view>
			</view>
			<view v-else-if="iscommission==1" class="fixBottom flex jsb alc">
				<joinshopbtn :ids="detail.maintainMealId" :type='2' :isSelection='detail.isSelection'></joinshopbtn>
			</view>
			<!--  #endif -->
			<image v-if="showtop" class="zhiding" src="@/static/image/zhidingicon.png" @click="ClickZhiDing"></image>
		</template>
		<request-loading></request-loading>
		<u-toast ref="uToast"></u-toast>
		<u-popup :safeAreaInsetBottom='false' round='10' :show="showpopshare" @close="OnCloseShare" mode="center">
			<view class="pop-poster">
				<view @click="OnSaveImage" style="margin-top: 100rpx;" class="u-flex jsc">
					<image :src="poster" style="width: 443rpx;height: 787rpx;"></image>
					<!-- 生成图片 -->
					<poster ref="poster" :list="list" background-color="#FFF" :width="443" :height="787"
						@on-success="posterSuccess"></poster>
				</view>
				<view class="tac size28" style="margin-top: 28rpx;">
					点击图片,长按保存到相册
				</view>
				<view class="pyq">
					<view class="text-pyq">
						{{detail.posterDesc}}
					</view>
					<view class="tac mt20 " @click="Oncopy(detail.posterDesc)">
						<image style="width: 230rpx;height: 60rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
						</image>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getstorage,
		setstorage,
		tologin
	} from '@/utils/index.js'
	import carousel from "@/components/carousel/index.vue"
	import Poster from '@/components/zhangyuhao-poster/Poster.vue'
	import commission from "@/components/commission/index.vue"
	import joinshopbtn from "@/components/joinshopbtn/index.vue"
	export default {
		components: {
			carousel,
			Poster,
			commission,
			joinshopbtn
		},
		data() {
			return {
				showpopshare: false,
				token: null,
				isExpert: null,
				swiperList: [],
				showtop: false,
				isshowpage: false,
				detail: {},
				detailId: '',
				autoPlay: false,
				list: [],
				poster: '',
				forwardUserId: null,
				customerManagerId: '',
				iscommission: 0,
				isback:false
				
			}
		},
		onPageScroll(e) {
			// e.scrollTop 获取页面的滚动高度
			let _this = this
			uni.getSystemInfo({
				success(res) {
					if (e.scrollTop > 300) {
						_this.showtop = true
					} else {
						_this.showtop = false
					}
				}
			})
		},
		onLoad(option) {
			let _this=this
			if (option.iscommission) {
				this.iscommission = option.iscommission
			}
			if (option.isapp == 1) {
				this.isback = true
			}
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			if (option.customerManagerId) {
				this.customerManagerId = option.customerManagerId
			}
			if (option.id) {
				this.detailId = option.id
			}
			if (option.forwardUserId) {
				this.forwardUserId = option.forwardUserId
				if (!uni.getStorageSync('token')) {
					tologin()
				} else if (uni.getStorageSync('token') && uni.getStorageSync('isExpert') != 1) {
					this.tempparentid()
				}

			}
			if (option.scene) {
				this.detailId = option.scene.split('_')[0]
				this.forwardUserId = option.scene.split('_')[1]
				if (!uni.getStorageSync('token')) {
					tologin()
				} else if (uni.getStorageSync('token') && uni.getStorageSync('isExpert') != 1) {
					this.tempparentid()
				}
			}
			if(!this.forwardUserId){
				this.forwardUserId=getstorage("userId")
			}
			uni.$on('saveaddshop',function(data){
					_this.getDetail(_this.detailId)
				})
			this.getDetail(this.detailId)
		},
		onShow() {

			if (this.forwardUserId && uni.getStorageSync('token')) {
				this.tempparentid()
			}
			this.getDetail(this.detailId)

		},
		onUnload() {
			if (this.isback) {
				if (window._51club) {
					window._51club.backIntercept('app');
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.backIntercept.postMessage("app")
				}
			}
		},
		methods: {
			tempparentid() {
				this.$request.post("/coc-active/api/v1/invite/temp_parent_id/add", {
					tempParentId: this.forwardUserId
				}).then(res => {

				})
			},
			posterSuccess(url) {
				// 生成成功，会把临时路径在这里返回
				this.poster = url;

			},
			OnSaveImage() {
				let value = [this.poster]
				uni.previewImage({
					current: 99999,
					urls: value,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				})


			},
			OnCloseShare() {
				this.showpopshare = false
			},
			popposter() {
				if (!uni.getStorageSync('token')) {
					tologin()
					return false
				}
				this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
					page: 'pages/carShops/upkeep/detail',
					scene: this.detailId + '_' + this.forwardUserId
				}).then(res => {
					this.showpopshare = true
					this.list = [{
							type: 'image',
							// path替换成你自己的图片，注意需要在小程序开发设置中配置域名
							path: this.detail.posterFigureUrl,
							x: 0,
							y: 0,
							width: 443,
							height: 787
						},
						{
							type: 'image',
							path: res.data.qrCode,
							x: 18,
							y: 682,
							width: 90,
							height: 90
						}
					]
					this.$nextTick(() => {
						// 要放在$nextTick()里，不然会空白
						this.$refs.poster.create();
					})
				})

			},
			Oncopy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.$u.toast('复制成功')
					}
				});
			},
			ClickZhiDing() {
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				});
			},
			getDetail(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.get("/coc-active/api/v2/maintain_meal/details/" + id).then(res => {
					let swiperList = []
					if (res.data.bannerImage) {
						swiperList = res.data.bannerImage
					}
					if (res.data.bannerVideo) {
						swiperList.unshift({
							url: res.data.bannerVideo,
							type: 'video'
						})
						this.autoPlay = false
					} else {
						this.autoPlay = true
					}
					this.swiperList = swiperList
					this.detail = res.data
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			buyBtn() {
				if (tologin() !== true) {
					return
				}
				uni.navigateTo({
					url: '/pages/carShops/upkeep/submmitOrder?id=' + this.detailId + '&customerManagerId=' + this
						.customerManagerId+'&forwardUserId='+this.forwardUserId
				})
			},
			goShop(shopId) {
				// 跳转店铺主页
					if(!this.isback){
						uni.navigateTo({
							url: '/pages/carShops/4Sdetail/index?id=' + shopId
						})
					}
				
			}
		},
		onShareAppMessage(res) {
			let title = this.detail.maintainName
			let imageUrl = this.detail.shareImage ? this.detail.shareImage : this.detail.coverImg
			return {
				title,
				path: `/pages/carShops/upkeep/detail?id=` + this.detailId + '&forwardUserId=' +this.forwardUserId,
				imageUrl,
				success(res) {
					uni.showToast({
						title: '分享朋友成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享朋友失败',
						icon: 'none'
					})
				}
			};
		},
		onShareTimeline(res) { //分享到朋友圈
			return {
				title: this.detail.maintainName,
				path: `/pages/carShops/upkeep/detail?id=` + this.detailId + '&forwardUserId=' + this.forwardUserId,
				imageUrl: this.detail.shareImage ? this.detail.shareImage : this.detail.coverImg,
				success(res) {
					uni.showToast({
						title: '分享朋友圈成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享朋友圈失败',
						icon: 'none'
					})
				}
			}
		},

	}
</script>

<style lang="scss" scoped>
	.zhiding {
		position: fixed;
		bottom: 286rpx;
		right: 24rpx;
		width: 72rpx;
		height: 72rpx;
	}

	.swiper {
		width: 100%;
		height: 750rpx;

	}

	.detailHbox {
		padding: 40rpx 25rpx;
		background-color: #fff;
		border-radius: 16rpx 16rpx 0 0;
		margin-top: -18rpx;
		position: relative;

		.detailH {
			font-size: 36rpx;
			font-weight: bold;
			// margin-top: 36rpx;
		}
	}

	.detailPrice {
		align-items: baseline;
	}

	.priceLine {
		align-items: baseline;

		.huiPrice {
			font-size: 52rpx;
			font-weight: bold;
			color: #D91B1B;
		}
	}

	.detailModal {
		padding: 35rpx 25rpx;
	}

	.mb12 {
		margin-bottom: 12rpx;
	}

	.detailModal .detailH {
		font-size: 32rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
	}

	.detailModal .detailH::before {
		content: '';
		display: bolck;
		width: 6rpx;
		height: 28rpx;
		background-color: #D91B1B;
		margin-right: 10rpx;
	}

	.anotherbox {
		padding: 0 25rpx 100rpx;

		.shopAdress {
			padding: 15rpx 12rpx;
			border-radius: 10rpx;

			.shopHead {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
				margin-right: 16rpx;
			}

			.locationIcon {
				width: 24rpx;
				height: 30rpx;
				margin-right: 10rpx;
			}
		}
	}

	.detailImg {
		margin-bottom: 150rpx;
	}

	.fixBottom {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		padding: 25rpx;
		background-color: #fff;
		z-index: 100;
		box-sizing: border-box;

		.detailPrice {
			.huiPrice {
				font-size: 50rpx;
				color: #D91B1B;
				font-weight: bold;
			}
		}

		.sbrBtn {
			width: 260rpx;
			height: 70rpx;
			background: #D91B1B;
			border-radius: 35rpx;
			text-align: center;
			line-height: 70rpx;
			color: #fff;
		}
	}

	.pop-poster {
		width: 650rpx;
		border-radius: 10rpx;
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685084245034.png");
		background-size: 100% 100%;
		margin-top: -12rpx;

		button::after {
			border: none;
		}
	}

	.pyq {
		margin: 25rpx;
		border-radius: 10rpx;
		background-color: #d91b1b;
		padding: 7rpx 7rpx 20rpx 7rpx;
	}

	.text-pyq {
		padding: 20rpx 20rpx 50rpx 20rpx;
		font-size: 24rpx;
		background-color: #ffffff;

		border-radius: 10rpx;
	}
</style>
