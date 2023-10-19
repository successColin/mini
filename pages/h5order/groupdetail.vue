<template>
	<view class="page">
		<u-navbar :autoBack='false' bgColor='' leftText="" title=" " :safeAreaInsetTop="true" @leftClick='onreturn'>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="19"></u-icon>
			</view>
		</u-navbar>
		<carousel v-if="imgList.length>0" :list="imgList" :topStyle="{width: '750rpx',borderRadius: '0rpx'}"
			height="430rpx" urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
		</carousel>
		<view>
			<u-tabs :activeStyle="{
				    color: '#303133',
				    fontWeight: 'bold',
				    fontSize: '32rpx',
				    transform: 'scale(1.05)',
				}" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:88rpx;width:340rpx" lineHeight="3" lineWidth="24"
				:lineColor="`url(${lineBg}) 100% 100%`" keyName='name' :list="tags" @click="OnClickTags">
			</u-tabs>
		</view>
		<view v-if="index==0">
			<view class="card">
				<view class="size32 fwb">{{dataList.title}}</view>
				<view class="u-flex">
					<view v-for="(item,index) in dataList.tagNamesList" :key="index" class="u-flex tag-item">
						{{item}}
					</view>
				</view>
				<view class="mt10 u-flex alc">
					<view class="mainRed fwb size28"><text>￥</text><text>{{dataList.flashSalePrice}}</text></view>
					<view class="txtLighGray txtls ml10 size24 u-flex alc">
						<view>￥</view>
						<view>{{dataList.marketPrice}}</view>
						<view class="ml10">
							<image v-if="dataList.activityPaymentPreferenceId==6" style="width: 176rpx;height: 32rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230722/file_1690017025022.png">
							</image>
							<image v-else-if="dataList.activityPaymentPreferenceId==5" style="width: 176rpx;height: 32rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230725/file_1690264071625.png">
							</image>
						</view>
					</view>
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
					<view class="size28 txtLighGray">抢购日期</view>
					<view class="size28 mt10">{{dataList.rushPurchaseBeginTime}}-{{dataList.rushPurchaseEndTime}}</view>
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">使用时间</view>
					<view class="size28 mt10">门店营业期间<text v-if="dataList.holidaysIsUse==1" class="ml10">节假日通用</text></view>
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
							<image class="select-shop-one-img" mode="widthFix"
								:src="item.associatedContent">
							</image>
						</view>
					
						<video v-if="item.type == 3" class="select-shop-video"
							:enable-progress-gesture="false" :src="item.associatedContent"></video>
					</view>
				</view>
			</view>
		</view>
		<!-- 明细 -->
		<view v-else-if="index==1">
			<view class="u-flex jsb margin23">
				<view class="card-detail">
					<view class="size32 mt30">已核销份数</view>
					<view style="font-size: 36rpx;" class="mainRed mt30">{{verificationlist.verificationOrderNum}}</view>
				</view>
				<view class="card-detail">
					<view class="size32 mt30">分账合计</view>
					<view style="font-size: 36rpx;" class="mainRed mt30"><text class="size28">¥</text>{{verificationlist.verificationIncome}}</view>
				</view>
			</view>
			<view v-if="verificationlist.orderDetail.length>0">
				<view class="card-order" v-for="(item,index) in verificationlist.orderDetail" :key="index">
					<view class="u-flex jsb alc">
						<view class="txtLighGray" :class="{'redcolor':item.status==1}">
							<text class="size28 fwb">¥{{item.shopLedgerAmount}}</text>
							<text class="size24 ml10">分账收入</text>
						</view>
						<view class="msg-item" :class="{'blue-item':item.status==1}">{{item.statusMsg}}</view>
					</view>
					<view class="mt30 txtLighGray size24">
						<view>
							联系方式&nbsp;&nbsp;{{item.mobile}}
						</view>
						<view class="mt20">
							订单编号&nbsp;&nbsp;{{item.orderNo}}
						</view>
						<view class="mt20">
							下单时间&nbsp;&nbsp;{{item.orderTime}}
						</view>
						<view class="mt20" v-if="item.status==2">
							核销时间&nbsp;&nbsp;{{item.verificationTime}}
						</view>
					</view>
				</view>
			</view>
			<view v-else style="margin-top: 100rpx;">
				<image style="width:732rpx;height: 288rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230724/file_1690166562929.png">
				</image>
			</view>
		</view>
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
				isapp: 0,
			
				imgList: [],
				index: 0,
				tags: [{
						name: '团购详情',
					},
					{
						name: '核销明细',
					}
				],
				id: '',
				dataList: {},
				verificationlist: {},
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
			}
		},

		onLoad(option) {
			if (option.isapp) {
				this.isapp = 1
			}
			this.id = option.id
			uni.setStorageSync('token', option.token)
			this.getList()
			this.getverificationDetail()
		},
		onShow() {},
		onUnload() {
			if (this.isapp == 1) {
				if (window._51club) {
					window._51club.backIntercept('app');
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.backIntercept.postMessage("app")
				}
			}
		},
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
			onreturn(){
				if (this.isapp == 1) {
					if (window._51club) {
						window._51club.backIntercept('app');
					}
					if (window.webkit.messageHandlers) {
						window.webkit.messageHandlers.backIntercept.postMessage("app")
					}
				}
			},
			getverificationDetail() {
				this.$request.post("/coc-merchant-app/app/v2/order_management/verificationDetail", {
					orderType: '4',
					relProductId: this.id
				}).then(res => {
					this.verificationlist = res.data
				})
			},
			getList() {
				this.$newrequest.post('/coc-merchant-app/app/v2/order_management/groupProductDetails', {
					id: this.id
				}).then(res => {
					let list = [];
					if (res.data.adUrl) {
						let arr = res.data.adUrl.split(",")
						arr.forEach(function(data) {
							list.push({
								url: data,
							});
						});
						this.imgList = list
					}
					this.dataList = res.data
				})
			},
			OnClickTags(e) {
				this.index = e.index
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
</style>
