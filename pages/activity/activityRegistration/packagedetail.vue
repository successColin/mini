<template>
	<view class="page">
		<u-navbar :autoBack='true' bgColor='' leftText="" title=" " :safeAreaInsetTop="true">
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="19"></u-icon>
			</view>
		</u-navbar>
		<carousel v-if="imgList.length > 0" :list="imgList" :topStyle="{ width: '750rpx', borderRadius: '0rpx' }" height="430rpx"
			urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
		</carousel>

		<view v-if="index == 0">
			<view class="card">
				<view class="size32 fwb">{{ dataList.title }}</view>
				<view class="u-flex">
					<view v-for="(item, index) in dataList.tagNamesList" :key="index" class="u-flex tag-item">
						{{ item }}
					</view>
				</view>
				<view class="mt10">
					<text class="mainRed fwb "
						style="font-size: 36rpx;"><text>￥</text><text>{{ dataList.flashSalePrice }}</text></text>
					<text class="txtLighGray txtls ml10 size24"><text>￥</text><text>{{ dataList.marketPrice }}</text></text>
				</view>
				<view v-if="iscommission == 1">
					<commission :price='dataList.commissionPrice' :proportion='dataList.rate'></commission>
				</view>
			</view>
			<view class="card">
				<view class="size32 fwb">
					购买须知
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">有效日期</view>
					<view class="size28 mt10">{{ dataList.expirationTime }}</view>
				</view>
				<view class="mt20">
					<view class="size28 txtLighGray">使用时间</view>
					<view class="size28 mt10">门店营业期间<text v-if="dataList.holidaysIsUse == 1" class="ml10">节假日通用</text>
					</view>
				</view>
			</view>
			<view class="card" @click="OnPushshopHome">
				<view class="flex jsb alc">
					<view>{{ dataList.shopName }}</view>
					<view class="mainhome-btn">主页</view>
				</view>
				<view v-if="dataList.openingHoursMsg" class="size24 mt20">
					营业时间 {{ dataList.openingHoursMsg }}
				</view>
				<view class="size24 mt20" @click.stop="OnPushMap">
					{{ dataList.baseAddress }}
				</view>
			</view>
			<view class="card">
				<view class="size32 fwb">
					包含单品
				</view>
				<view v-for="(item, index) in dataList.mealLists" :key="index">
					<view class="u-flex jsb mt20 size24">
						<view>{{ item.productName }}</view>
						<view>
							<text class="txtLighGray">{{ item.num }}份</text>
							<text class="ml10">￥{{ item.marketPrice }}</text>
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
						<view v-if="item.type == 2" class="select-shop-one">
							<image class="select-shop-one-img" mode="widthFix" :src="item.associatedContent">
							</image>
						</view>

						<video v-if="item.type == 3" class="select-shop-video" :enable-progress-gesture="false"
							:src="item.associatedContent"></video>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 140rpx;">

		</view>
		<view v-if="iscommission == 1" class="bottom-btn">
			<view class="view">
				<joinshopbtn :type='5' :ids='dataList.id' :isSelection='dataList.isSelection'></joinshopbtn>
			</view>

		</view>
	</view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
import commission from "@/components/commission/index.vue"
import joinshopbtn from "@/components/joinshopbtn/index.vue"
export default {
	components: {
		carousel,
		commission,
		joinshopbtn
	},
	data() {
		return {
			iscommission: 0,
			imgList: [],
			index: 0,
			isapp: 0,
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
		let _this = this
		this.id = option.id
		if (option.iscommission) {
			this.iscommission = option.iscommission
		}
		uni.$on('saveaddshop', function (data) {
			_this.getList()
		})
		this.getList()

	},
	onShow() { },

	methods: {
		OnPushshopHome() {
			uni.navigateTo({
				url: '/pages/activityMall/business/index?id=' + this.dataList.shopId
			})
		},
		getverificationDetail() {
			this.$request.post("/coc-merchant-app/app/v2/order_management/verificationDetail", {
				orderType: '1',
				relProductId: this.id
			}).then(res => {
				this.verificationlist = res.data
			})
		},
		getList() {
			this.$newrequest.post('/coc-merchant-app/app/v2/order_management/merchantMealDetails', {
				id: this.id
			}).then(res => {
				let list = [];
				if (res.data.adUrl) {
					let arr = res.data.adUrl.split(",")
					arr.forEach(function (data) {
						list.push({
							url: data,
							type: "image",
						});
					});
					if (res.data.adPushUrl) {
						list.push({
							url: res.data.adPushUrl,
							type: "video",
							poster: res.data.adCoverImg
						})
					}
					this.imgList = list

				}
				this.dataList = res.data
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
	padding: 22rpx 23rpx;
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

.bottom-btn {
	width: 100%;
	padding: 0rpx 28rpx 0rpx 0rpx;
	position: fixed;
	bottom: 0rpx;
	background-color: #ffffff;
	margin-top: 40rpx;
	font-size: 24rpx;
	z-index: 9999;


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
