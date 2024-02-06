<template>
	<view class="item" @click="OnPushDetail(item)">
		<view class="coverPicture"
			:style="{ backgroundImage: 'url(' + item.coverPicture + ')', backgroundSize: 'cover' }">
			<view class="s_ghbox" v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2">
				<text v-if="item.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
				<text style="margin-right: 14rpx;" v-if="item.activitySignUpStatus == 1">报名开启时间</text>{{
	                item.activitySignUpStatus == 2 ? item.activityEndTime : item.activityBeginTime }}
			</view>
			<view v-if="(item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2) && item.districtName"
				class="backimg">
				<view style="font-size: 24rpx;color: #ffffff">
					{{ item.districtName }}
				</view>
			</view>
			<view style="position: absolute;left: 260rpx;top:110rpx ;" v-if="item.activitySignUpStatus == 1">
				<image src="@/static/image/huodongyugao.png" style="width: 180rpx;height: 180rpx;"></image>
			</view>
			<view style="position: absolute;left: 260rpx;top:110rpx ;"
				v-if="item.activitySignUpStatus == 3 || item.activitySignUpStatus == 5 || item.activitySignUpStatus == 4">
				<image src="@/static/image/jieshu.png" style="width: 180rpx;height: 180rpx;"></image>
			</view>
			<view style="position: absolute;bottom: 24rpx;right: 27rpx;" v-if="item.activitySignUpStatus == 2">
				<view class="btn">报名中</view>
			</view>
		</view>
		<view class="title  moreLine size28">{{item.title}}</view>
		<view class="item-detail">
			<view v-if="item.payType == 2">
				<text style="color: #D91B1B;font-size: 24rpx;">
					¥
				</text>
				<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
					{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
				</text>
				<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
					<view class="u-flex" v-if="isExpert == 1 && token && item.maxCommissionPrice">
						<view class="u-flex">
							<view class="rebate-img rebate-size"></view>
						</view>
						<view class="rebate-style" style="margin-right: 24rpx;"
							v-if="item.maxCommissionPrice > item.minCommissionPrice">
							{{ item.maxCommissionPrice }}
						</view>
						<view class="rebate-style" style="margin-right: 24rpx;" v-else>
							{{ item.minCommissionPrice }}
						</view>
					</view>
				</view>
				<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
					¥{{ item.marketPrice }}
				</text>
			</view>
			<view v-else>
				<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
					免费
				</text>
				<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
					¥{{ item.marketPrice }}
				</text>
			</view>
			<view @click.stop="Onremind(item, index)" class="remind"
				v-if="!isOnlyDetail&&item.activitySignUpStatus == 1" :class="{ 'Asreminder': item.isRemind == 1 }">
				提醒我
			</view>
			<view @click.stop="openAppoint(item)" class="remind"
				v-else-if="!isOnlyDetail&&(item.activitySignUpStatus == 3||item.activitySignUpStatus == 4||item.activitySignUpStatus == 5)">
				我要预约
			</view>
			<view class="headPortraits" v-else-if="!isOnlyDetail">
				<view style="margin-right: 16rpx;">
					已报名<text style="margin-left: 9rpx;">{{ item.saleNum }}/{{ item.stock }}</text>
				</view>
				<view class="u-flex">
					<view style="padding-right: 4rpx;" v-for="(item1, index1) in item.headPortraits" :key="index1">
						<u-avatar size="40rpx" :src="item1"></u-avatar>
					</view>
					<view v-if="item.saleNum > 3">
						<u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="flex alc mt10" v-if="item.baseName">
			<image class="shop-image" src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png" />
			<view class="ml10 txtLighGray size24">{{ item.baseName }}</view>
			<view v-if="item.cbBaseName " class="txtLighGray size24">&{{item.cbBaseName }}</view>
		</view>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		props: {
			item: { //数据项
				type: Object,
				default: () => {
					return {}
				}
			},
			isOnlyDetail: { //是否仅详情显示
				type: Boolean,
				default: false
			},
			searchKey: { //用于高亮显示
				type: String,
				default: ""
			}
		},
		data() {
			return {
				token: null,
				isExpert: null,
			}
		},
		// created() {
		// 	this.token = uni.getStorageSync('token')
		// 	this.isExpert = uni.getStorageSync('isExpert')
		// },
		methods: {
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/shopActiveDetail?id=' + item.activityId + '&iscommission=0'
				})
			},
			Onremind(item, index) {
				let _this = this
				if (tologin()) {
					if (item.isRemind == 1) {
						return false
					}
					uni.requestSubscribeMessage({
						tmplIds: [
							'jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'
						],
						success(res) {
							if (res['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'] == 'accept') {
								_this.$request.get("/coc-active/api/v1/activity/signUpStartRemind/" + item
									.activityId).then(s => {
									if (s.code == 200) {
										this.dataList[index].isRemind = 1
										uni.showToast({
											icon: 'none',
											title: '提醒成功，请等待通知',
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: s.message,
										});
									}
								})
							}
						}
					})
				}
			},
			openAppoint(item) {
				if (tologin()) {
					this.$emit('openAppoint', item)
				}
			},
			getTitle(value) {
				// if (this.searchKey) {
				// 	return value.replaceAll(this.searchKey, `<label style="color:#D91B1B">${this.searchKey}</label>`);
				// } else {
				// 	return value
				// }
				return value
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		padding-bottom: 20rpx;

		.coverPicture {
			width: 700rpx;
			height: 400rpx;
			border-radius: 10rpx;
			position: relative;
		}

		.s_ghbox {
			line-height: 52rpx;
			font-size: 24rpx;
			color: #ffffff;
			padding-left: 14rpx;
			border-radius: 0rpx 24rpx 28rpx 0rpx;
			position: absolute;
			top: 30rpx;
			padding-right: 20rpx;
			height: 52rpx;
			background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)
		}

		.backimg {
			position: absolute;
			bottom: 18rpx;
			left: 20rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			// background-color: rgb(34 34 34 / 0.5);
			background-color: rgba(34, 34, 34, 0.5);
			border-radius: 25rpx 25rpx 27rpx 25rpx;
			width: 120rpx;
			height: 52rpx;
		}

		.btn {
			width: 120rpx;
			height: 52rpx;
			text-align: center;
			background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
			border-radius: 25rpx 25rpx 27rpx 25rpx;
			line-height: 52rpx;
			color: #ffffff;
		}

		.title {
			margin-top: 15rpx;
		}

		.item-detail {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;
			align-items: center;
			margin-right: 26rpx;
		}

		.remind {
			width: 160rpx;
			height: 52rpx;
			border-radius: 26rpx;
			color: #ffffff;
			font-size: 28rpx;
			text-align: center;
			background: #D91B1B;
			line-height: 52rpx;
		}

		.Asreminder {
			background-color: #999999;
		}

		.headPortraits {
			display: flex;
			align-items: center;
			font-size: 24rpx;
		}

		.shop-image {
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>