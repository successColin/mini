<template>
	<view class="page">
		<view v-if="isshowpage">
			<carousel v-if="imgList.length>0" :list="imgList" :topStyle="{width: '750rpx',borderRadius: '0rpx'}"
				height="430rpx" urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
			</carousel>
			<view>
				<view class="card">
					<view class="size32 fwb">{{dataList.title}}</view>
					<view class="u-flex">
						<view v-for="(item,index) in dataList.tagNamesList" :key="index" class="u-flex tag-item">
							{{item}}
						</view>
					</view>
					<view class="mt10 flex alc">
						<view v-if="isExpert==1&&token&&dataList.commissionPrice&&iscommission!=1" class="u-flex">
							<view class="rebate-img rebate-size"></view>
						</view>
						<view
							v-if="isExpert==1&&token&&dataList.commissionPrice&&iscommission!=1"
							class="rebate-style" style="margin-right: 24rpx;">
							{{dataList.commissionPrice}}
						</view>
						<text
							class="mainRed fwb size28"><text>官方补贴价￥</text><text>{{dataList.flashSalePrice}}</text></text>
						<text
							class="txtLighGray txtls ml10 size24"><text>M团价￥</text><text>{{dataList.mgroupPrice==0?dataList.marketPrice:dataList.mgroupPrice}}</text></text>
					</view>
					<view v-if="iscommission==1">
						<commission :price='dataList.commissionPrice' :proportion='dataList.rate'></commission>
					</view>
				</view>
				<view class="card" @click="OnPushshopHome">
					<view class="u-flex jsb alc">
						<view>{{dataList.shopName}}</view>
						<!--  #ifdef MP-WEIXIN  -->
						<view class="mainhome-btn">主页</view>
						<!--  #endif -->
					</view>
					<view v-if="dataList.openingHoursMsg" class="size24 mt20">
						营业时间 {{dataList.openingHoursMsg}}
					</view>
					<view class="size24 mt20" @click.stop="OnPushMap">
						{{dataList.baseAddress}}
					</view>
				</view>
				<view class="card">
					<view class="size32 fwb">
						购买须知
					</view>
					<view class="mt20">
						<view class="size28 txtLighGray">有效日期</view>
						<view class="size28 mt10">{{dataList.expirationTime}}</view>
					</view>
					<view class="mt20">
						<view class="size28 txtLighGray">使用时间</view>
						<view class="size28 mt10"><text v-if="dataList.holidaysIsUse==1">节假日通用</text>
						</view>
					</view>
					<view class="mt20">
						<view class="size28 txtLighGray">购买后需到店核销使用，请知悉，谢谢</view>
					</view>
				</view>
				<view class="card">
					<view class="size32 fwb">
						包含单品
					</view>
					<view v-for="(item,index) in dataList.mealLists" :key="index">
						<view class="u-flex jsb mt20 size24">
							<view>{{item.productName}}</view>
							<view>
								<text class="txtLighGray">{{item.num}}份</text>
								<text class="ml10">￥{{item.marketPrice}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="card">
					<view class="size32 fwb">
						套餐详情
					</view>
					<view class="mt20 size28" v-if="dataList.detail">
						<u-parse :content="dataList.detail"></u-parse>
					</view>
					<view class="mt20 size28" v-else-if="dataList.details">
						<view v-for="item in dataList.details" :key="item.id">
							<view v-if="item.type == 1" class="select-shop-text">
								{{ item.associatedContent }}
							</view>
							<view v-if="item.type == 2 " class="select-shop-one">
								<image class="select-shop-one-img" mode="widthFix" :src="item.associatedContent">
								</image>
							</view>

							<video v-if="item.type == 3" class="select-shop-video" :enable-progress-gesture="false"
								:src="item.associatedContent"></video>
						</view>
					</view>
				</view>
				<view class="card">
					<view class="size32 fwb">
						价格说明
					</view>
					<view class="card-goumai">
						<ul class="ul-item">
							<li class="li-item" style="margin-top: 0rpx;"><text class="txtDarkGray">划线价格</text>
								<view class="txtDarkGray mt10">商品的专柜价、吊牌价、正品零售价、厂商指导价或该商品的曾经展示过的销售价等，并非原价，仅供参考。</view>
							</li>
							<li class="li-item "><text class="txtDarkGray">未划线价格</text>
								<view class="txtDarkGray mt10">
									商品的实时标价，不因表述的差异改变性质。具体成交价格根据商品参加活动，或会员使用优惠券、积分等发生变化，最终以订单结算页介
								</view>
							</li>
							<li class="li-item"><text class="txtDarkGray">商家详情页 (含主图)
									以图片或文字形式标注的一口价、促销价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动和时段等情</text></li>
							<li class="li-item"><text class="txtDarkGray">此说明仅当出现价格比较时有效，若商家单独对划线价格进行
									说明的，以商家的表述为准。</text>
							</li>
						</ul>
					</view>
				</view>
				<view style="height: 150rpx;"></view>
			</view>
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
							{{dataList.posterDesc}}
						</view>
						<view class="tac mt20 " @click="Oncopy(dataList.posterDesc)">
							<image style="width: 230rpx;height: 60rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
							</image>
						</view>
					</view>
				</view>
			</u-popup>
			<!--  #ifdef MP-WEIXIN  -->
			<view v-if="iscommission==0" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view" :style="{paddingBottom:safeHeight>0?0:'21rpx'}">
					<view class="u-flex"
						style="margin-top: 14rpx;width: 360rpx;justify-content: space-around;font-size: 24rpx;">

						<view @click="Onaddcollections"
							style="margin-left: 20rpx;text-align: center;position: relative;top: -8rpx;">
							<view v-if="dataList.isCollection==2||dataList.isCollection==null">
								<image src="@/static/image/weishoucang.png" style="width: 56rpx;height: 56rpx;"></image>
							</view>
							<view v-if="dataList.isCollection==1">
								<image src="@/static/image/xinyishoucang.png" style="width: 56rpx;height: 56rpx;">
								</image>
							</view>
							<view v-if="dataList.isCollection==2||dataList.isCollection==null"
								style="margin-top: -6rpx;">收藏
							</view>
							<view v-if="dataList.isCollection==1" style="margin-top: -6rpx;">已收藏</view>
						</view>
						<view style="margin-left: 20rpx;text-align: center;" @click="popposter">
							<view>
								<image src="@/static/image/share.png" style="width: 41rpx;height: 41rpx;"></image>
							</view>
							<view style="margin-top: 2rpx;">分享</view>
						</view>
						<view style="margin-left: 20rpx;text-align: center;position: relative;top: -9.5rpx;">
							<view>
								<image src="@/static/image/kefu.png" style="width: 56rpx;height: 56rpx;"></image>
							</view>
							<view style="margin-top: -6rpx;">客服</view>
							<button open-type='contact' session-from='' class="kefu-contact"
								style="position: absolute;height: 56px;top: 0;opacity: 0;"></button>
						</view>
					</view>
					<view v-if='dataList.changeTime <= 0' class="signup">
						<text style="background-color: #999999;">已结束</text>
					</view>
					<view v-else-if='dataList.status==2' class="signup">
						<text style="background-color: #999999;">已下架</text>
					</view>
					<view @click="Onsingup" class="signup" v-else>
						<text>立即抢购</text>
					</view>
				</view>
				<view class="safe-bottom-height"></view>
			</view>
			<view v-else-if="iscommission==1" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view " :style="{paddingBottom:safeHeight>0?0:'21rpx'}">
					<joinshopbtn :ids="dataList.id" :type='5' :isSelection='dataList.isSelection'></joinshopbtn>
				</view>
			</view>
			<!--  #endif -->
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	import Poster from '@/components/zhangyuhao-poster/Poster.vue'
	import commission from "@/components/commission/index.vue"
	import joinshopbtn from "@/components/joinshopbtn/index.vue"
	import {
		tologin,
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {
			carousel,
			Poster,
			commission,
			joinshopbtn
		},
		data() {
			return {
				imgList: [],
				id: '',
				dataList: {},
				showpopshare: false,
				poster: '',
				list: [],
				forwardUserId: null,
				isshowpage: false,
				iscommission: 0,
				token: null,
				isExpert: null,
			}
		},
		destroyed() {
			uni.$off('saveaddshop')
		},
		onLoad(option) {
			this.id = option.id
			if (option.iscommission) {
				this.iscommission = option.iscommission
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
				this.id = option.scene.split('_')[0]
				this.forwardUserId = option.scene.split('_')[1]
				if (!uni.getStorageSync('token')) {
					tologin()
				} else if (uni.getStorageSync('token') && uni.getStorageSync('isExpert') != 1) {
					this.tempparentid()
				}
			}
			if (!this.forwardUserId) {
				this.forwardUserId = getstorage("userId")
			}
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			this.getList()
			uni.$on('saveaddshop', (data) => {
				this.getList()
			})
		},
		 onShareTimeline(res) {
			 if (!uni.getStorageSync('token')) {
			 	tologin()
			 	return false
			 }
			 let title = this.dataList.title
			 let imageUrl = this.dataList.appletsSharePic ? this.dataList.appletsSharePic : this.dataList.coverPicture
			 return {
			 	title,
			 	path: `/pages/grouppurchase/packagedetail?forwardUserId=` + this.forwardUserId + '&id=' + this.id,
			 	imageUrl
			 };
		 },
		  onShareAppMessage(res) {
			  if (!uni.getStorageSync('token')) {
			  	tologin()
			  	return false
			  }
			  let title = this.dataList.title
			  let imageUrl = this.dataList.appletsSharePic ? this.dataList.appletsSharePic : this.dataList.coverPicture
			  return {
			  	title,
			  	path: `/pages/grouppurchase/packagedetail?forwardUserId=` + this.forwardUserId + '&id=' + this.id,
			  	imageUrl
			  };
		  },
		methods: {
			
			tempparentid() {
				this.$request.post("/coc-active/api/v1/invite/temp_parent_id/add", {
					tempParentId: this.forwardUserId
				}).then(res => {

				})
			},
			getList() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.post('/coc-merchant-app/app/v2/order_management/merchantMealDetails', {
					id: this.id
				}).then(res => {
					let list = [];
					if (res.data.adUrl) {
						let arr = res.data.adUrl.split(",")
						arr.forEach(function(data) {
							list.push({
								url: data,
								type: "image"
							});
						});
						this.imgList = list
					}
					this.dataList = res.data
				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			Onaddcollections() {
				let _this = this
				tologin()
				if (this.dataList.isCollection == 2) {
					this.dataList.isCollection = 1
				} else {
					this.dataList.isCollection = 2
				}
				if (getstorage("token")) {
					this.$request.post("/coc-active/api/v1/collections/add_collections", {
						type: '4',
						relId: this.dataList.id,
						relName: this.dataList.shopName,
						activityMoney: this.dataList.flashSalePrice
					}).then(res => {
						if (res.code == 200) {
							// _this.getList()
							let msg = '操作成功'
						}
					})
				}
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
					page: 'pages/grouppurchase/packagedetail',
					scene: this.id + '_' + this.forwardUserId
				}).then(res => {
					this.showpopshare = true
					this.list = [{
							type: 'image',
							// path替换成你自己的图片，注意需要在小程序开发设置中配置域名
							path: this.dataList.posterFigureUrl,
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
			posterSuccess(url) {
				// 生成成功，会把临时路径在这里返回
				this.poster = url;

			},
			Oncopy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.$u.toast('复制成功')
					}
				});
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
			Onsingup() {
				let _this = this
				uni.navigateTo({
					url: '/pages/grouppurchase/packagepayindex?istype=wx' + '&forwardUserId=' + this.forwardUserId,
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getinfo', {
							data: _this.dataList
						})
						_this.showpop = false
					}
				})
			},
			OnPushMap() {
				// #ifdef  MP-WEIXIN
				let _this = this
				uni.openLocation({
					latitude: _this.dataList.lat,
					longitude: _this.dataList.lng,
					success: function() {
						console.log('success');
					}
				});
				// #endif
			},
			OnPushshopHome() {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + this.dataList.shopId
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.margin23 {
		margin: 23rpx;
	}

	.card {
		margin: 23rpx;
		border-radius: 15rpx;
		background: #FFFFFF;
		padding: 15rpx 23rpx;
	}

	.tag-item {
		margin-right: 8rpx;
		border-radius: 12rpx;
		background: #FFF0F0;
		color: #D91B1B;
		font-size: 20rpx;
		padding: 3rpx 7rpx;
		margin-top: 10rpx;
	}

	.card-detail {
		width: 338rpx;
		height: 181rpx;
		background: #FFFFFF;
		border-radius: 15rpx;
		text-align: center;
	}

	.card-order {
		margin: 23rpx;
		border-radius: 15rpx;
		background: #FFFFFF;
		padding: 23rpx;
	}

	.msg-item {
		border-radius: 8rpx;
		border: 2rpx solid #999999;
		color: #999999;
		font-size: 28rpx;
		width: 127rpx;
		height: 54rpx;
		text-align: center;
		line-height: 54rpx;
	}

	.blue-item {
		border: 2rpx solid #2C9D4C;
		color: #2C9D4C;
	}

	.redcolor {
		color: #D91B1B;
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

	.card-goumai {
		padding: 32rpx 24rpx 32rpx 0;
		background-color: #ffffff;
		border-radius: 10rpx;
		font-size: 24rpx;
	}

	.ul-item {
		list-style-type: disc;
	}

	.li-item {
		color: #D91B1B;
		font-size: 24rpx;
		display: list-item;
		margin-left: 40rpx;
		margin-top: 24rpx;
	}

	.bottom-btn {
		width: 100%;
		padding: 0rpx 28rpx 0rpx 0rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #ffffff;
		margin-top: 40rpx;
		font-size: 24rpx;


		.view {
			display: flex;
			font-size: 28rpx;
			padding-top: 22rpx;
		}

		.btn {
			background-color: #ffffff;
			border-radius: 10rpx;
			display: flex;
			padding: 20rpx;

		}

		.signup {
			// background-color: #d91b1b;
			border-radius: 40rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: #ffffff;
			width: 360rpx;
			height: 70rpx;
			align-self: center;
			font-size: 28rpx;
			// z-index: 2;
			margin-left: 18rpx;

			text {
				display: inline-block;
				text-align: center;
				background-color: #d91b1b;
				border-radius: 40rpx;
				padding: 16rpx;
			}
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

	.mainhome-btn {
		width: 80rpx;
		height: 40rpx;
		border: 1rpx solid #D91B1B;
		border-radius: 20rpx;
		line-height: 40rpx;
		color: #D91B1B;
		font-size: 24rpx;
		text-align: center;
	}
</style>
