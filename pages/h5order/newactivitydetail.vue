<template>
	<view class="page">
		
		<carousel v-if="imgList.length>0" :list="imgList" :topStyle="{width: '750rpx',borderRadius: '0rpx'}" height="430rpx"
			urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
		</carousel>
	
		<view v-if="index==0">
			<view class="card">
				<view class="size32 fwb u-flex jsb">
					<view class="moreLine" style="width: 500rpx;">{{dataList.title}}</view>
					<view class="guanlian" v-if="dataList.cooperationList" @click="Onrelatedintention">关联意向</view>
				</view>
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
			<view class="card" v-if="isgetprice">
				<view class="size32 fwb">
					我的收入
				</view>
				<view class="mt20 size28">
					<view v-for="item in dataList.activityMealCooperationShop" :key="item.mealId">
						<view v-if="item.prorateAmount>0">
							<text class="fwb">{{item.mealName}}:</text>
							<text class="fwb mainRed ml10">¥{{item.prorateAmount}}</text>
						</view>
				
					</view>
				</view>
			</view>
			<view class="card">
				<view class="size32 fwb">
					购买须知
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">报名截止</view>
					<view class="size28 mt10">{{dataList.signUpEndTime}}</view>
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">合作活动场次</view>
					<view class="size28 mt10" v-for="(item,index) in dataList.attendTimeVOS" :key="index">{{item.beginTime}} — {{item.endTime}}</view>
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">合作活动地点</view>
					<view class="size28 mt10">{{dataList.address}}</view>
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">联系方式</view>
					<view class="size28 mt10">{{dataList.tel}}</view>
				</view>
			</view>

			<view class="card">
				<view class="size32 fwb">
					合作活动详情
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
				isgetprice:false,
				dataList:{},
				isapp: 0,
				imgList: [
				],
				index: 0,
				tags: [{
						name: '合作活动详情',
					},
					{
						name: '报名人明细',
					}
				],
				id: '',
				verificationlist:{},
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
	// 	onUnload() {
	// 		if (this.isapp == 1) {
	// 			if (window._51club) {
	// 				window._51club.backIntercept('app');
	// 			}
	// 			if (window.webkit.messageHandlers) {
	// 				window.webkit.messageHandlers.backIntercept.postMessage("app")
	// 			}
	// 		}
	// 	},
	
		methods: {
			Onrelatedintention(){
				let _this=this
				uni.navigateTo({
					url: '/pages/h5order/relatedintention',
					success: function (res) {
					  // 通过eventChannel向被打开页面传送数据
					  res.eventChannel.emit("getinfo", {
					    data: _this.dataList.cooperationList,
					  });
					},
				})
			},
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
				this.$request.post("/coc-merchant-app/app/v2/order_management/applicantDetails", {
					orderType: '3',
					relProductId: this.id
				}).then(res => {
					this.verificationlist = res.data
				})
			},
			getList() {
				this.$newrequest.post('/coc-merchant-app/app/v2/order_management/activityDetails', {
					id: this.id
				}).then(res => {
					let list = [];
				res.data.activityMealCooperationShop.filter(s=>{
					if(s.prorateAmount>0){
						this.isgetprice=true
					}
				})
						this.imgList = res.data.adUrlList
					
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
		background: #FFFFFF;
		border-radius: 15rpx;
		padding: 42rpx 23rpx;
		margin: 23rpx;
		display: flex;
		justify-content: space-around;
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
	.guanlian{
		width: 154rpx;
		height: 54rpx;
		border-radius: 90rpx;
		border: 1rpx solid #D91B1B;
		text-align: center;
		line-height: 54rpx;
		font-size: 28rpx;
		color: #D91B1B;
	}
</style>
