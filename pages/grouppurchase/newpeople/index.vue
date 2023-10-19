<template>
	<view class="page">
			<view class="top-icon" @click.stop='OnPushweb'>

		</view>
			<view class="top-text" @click.stop='OnPushweb'>
			<view>
				活动规则
			</view>
			<view style="margin-left: 6rpx;">
				<u-icon name="question-circle" color="#ffffff" size="11"></u-icon>
			</view>
		</view>
		<!-- 	<view class="margin25">
			<carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
				systemCode="applets_exclusive_for_newcomers" :indicatorType="3"></carousel>
		</view> -->
		<div>
			<image style="width: 750rpx;height: 388rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694480925852.gif">

			</image>
		</div>
	<!-- 	<u-navbar bgColor='' leftText="" title=" " :safeAreaInsetTop="true" :autoBack="false" @leftClick='clickleft'>
			<view class="u-nav-slot" slot="left">
				<u-icon name="arrow-left" size="19"></u-icon>
			</view>
		</u-navbar> -->
		<view v-if="dataList.length>0" style="margin-top: -20rpx;">
			<view v-for="(item,index) in dataList" :key="item.id" style="margin: 25rpx;">
				<view class="card" @click="OnPushDetail(item)">
					<!-- 详情 -->
					<view style="position: relative;" class="u-flex  mt20">
						<view>
							<view class="picture-bac">
								<image style="border-radius: 10rpx;width: 128rpx;height: 128rpx;margin-top: 5rpx;"
									:src="item.coverPicture">
								</image>
								<view v-if="item.type==2" class="colorff size20" style="margin-top: -2rpx;">
									{{item.helpNum}}人助力
								</view>
								<view v-else-if="item.type==1" class="colorff size20" style="margin-top: -2rpx;">
									新人首单
								</view>
							</view>
							<view class="pink-bac">
								<view class="size20 mainRed " style="margin-top: 40rpx;">
									立减<text class="size28 fwb">
									
									<text v-if="item.bankCardPrice>0">{{item.markPrice-item.bankCardPrice}}</text>
									<text v-else>{{item.immediateReduction}}</text>
									</text>元
								</view>
								<view class="u-flex jsc mt10">
									<image style="width: 83rpx;height: 9rpx;"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693200830236.png">
									</image>
								</view>
								<view class="size20 mainRed mt10">
									<text v-if="item.activityPaymentPreferenceId==6">工行优惠</text>
										<text v-if="item.activityPaymentPreferenceId==7">邮储优惠</text>
												<text v-if="item.activityPaymentPreferenceId==8">民生优惠</text>
												<text v-if="item.activityPaymentPreferenceId==10">官方优惠</text>
								</view>
							</view>

						</view>

						<view style="margin-left: 22rpx;">
							<view class="moreLine size28 fwb" style="width: 480rpx;">
								{{item.title}}
							</view>
							<view class="u-flex mt20 mb20" style="flex-wrap: wrap;">
								<view v-for="(item1,index1) in item.tagNamesList" class="tagname" :key="index1"
									style="margin-left: 16rpx;" :class="{'marginleft0':index1==0}">
									<view>{{item1}}</view>
								</view>
							</view>
							<view class="txtLighGray size20 mt20 oneLine" style="width: 480rpx;">
								<text>{{item.baseName}}</text>
								<text class="ml20 mr20">|</text>
								<text>{{item.distanceMsg}}</text>
							</view>
							<view class="mainRed u-flex mt10">
								<view class="u-flex" style="align-items: flex-end;margin-bottom: 6rpx;">
									<view class="size24">¥</view>
								</view>
								<view class="fwb" style="font-size: 48rpx;">
									<!-- 		<view v-if='item.bankCardPrice' style="font-size: 40rpx;margin-left: 6rpx;"
										class="fwb">{{item.bankCardPrice}}</view> -->
									<view style="font-size: 40rpx;margin-left: 6rpx;" class="fwb">
										{{item.bankCardPrice?item.bankCardPrice:item.flashSalePrice}}
									</view>
								</view>
							</view>
							<view class="u-flex jsb alc">
								<view class="txtls txtLighGray size20">
									<!-- 原价: ￥{{item.markPrice}} -->
									{{item.marketPriceName}}:￥{{item.markPrice}}
								</view>
								<view>
									<image style="width: 143rpx;height: 53rpx;"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693202494040.png">
									</image>
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
		</view>
		<view v-else-if="dataList.length==0" class="tac mt20">
			<image style="width: 269rpx;height: 232rpx;" src="../static/image/queshengye.png"></image>
			<view class="mt20 tac size24 txtLighGray">暂无团购</view>
		</view>
		<view class="u-flex jsb colorff m25">
			<view class="size32">
				猜你喜欢
			</view>
			<view class="u-flex size24" @click="toClick">
				<view>更多</view>
				<view>	<u-icon name="arrow-right" color="#ffffff"></u-icon></view>
			</view>
		</view>
			<recommend />
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	import recommend from "../components/recommend.vue"
	export default {
		components: {
			carousel,
			recommend
		},
		data() {
			return {
				dataList: [],
				visitinto: null,
				token: null,
				isExpert: null,
				current:1,
				isLoadMore: false,
				articleList:[]
			}
		},
		onHide() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onUnload() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onLoad() {
			this.getList()
			this.getarticleList()
		},
		onShow() {
			this.token = uni.getStorageSync('token')
			this.isExpert = uni.getStorageSync('isExpert')
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 7
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		onReachBottom() {
			uni.$emit('recommend')
		},
		methods: {
	toClick() {
	    uni.navigateTo({
	        url: '/pages/activity/activityRegistration/playfulperson'
	    })
	},
			clickleft() {
				uni.navigateBack({
					delta: 1
				});
			},
			OnPushweb() {
				uni.navigateTo({
					url: '/pages/activity/GoPdf/webview?url=https://h5.dcqcjlb.com/protocol/activity_rules.html'
				})
			},
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/grouppurchase/newpeople/detail?id=' + item.id + '&type=' + item.type
				})
			},
			getList() {
				this.$newrequest.get("/coc-active/api/v1/group/new_person/list", ).then(res => {
					this.dataList = res.data

				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		// height: 100vh;
		background-color: #fd6d46;
	}

	.mt14 {
		margin-top: 14rpx;
	}

	.margin25 {
		margin: 25rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 24rpx;
		position: relative;
	}

	.buy-btn {
		width: 107rpx;
		height: 40rpx;
		background: #D91B1B;
		border-radius: 20rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.marginleft0 {
		margin-left: 0 !important;
	}

	.tagname {
		padding: 9rpx 18rpx;
		background-color: #ffe4e0;
		color: #FB5A35;
		font-size: 24rpx;
		border-radius: 10rpx;
		margin-top: 10rpx;
	}



	.top-icon {
		width: 152rpx;
		height: 40rpx;
		background: #000000;
		opacity: 0.2;
		top: 221rpx;
		z-index: 9999;
		right: 0rpx;
		border-radius: 10rpx;
		position: absolute;
	}

	.top-text {
		font-size: 24rpx;
		color: #ffffff;
		position: absolute;
		top: 225rpx;
		right: 25rpx;
		z-index: 99999;
		display: flex;
		align-items: center;
	}

	.picture-bac {
		width: 138rpx;
		height: 177rpx;
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693270218385.png");
		background-size: 100% 100%;
		border-radius: 10rpx;
		text-align: center;
		position: relative;
	}

	.pink-bac {
		width: 138rpx;
		height: 144rpx;
		background: #FFEAEA;
		border-radius: 10rpx;
		margin-top: -53rpx;
		text-align: center;
		padding-top: 14rpx;
	}
	.m25{
		margin: 0 25rpx;
	}
</style>
