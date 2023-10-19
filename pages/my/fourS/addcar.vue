<template>
	<view class="page">
		<!-- 顶部搜索栏 -->
		<view class="search-top">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot u-flex" slot="center">
					<view style="margin-left: 100rpx;margin-right: 20rpx;">
						<u-search placeholder="请输入品牌" v-model="keyword" @search='getList' @custom='getList'>
						</u-search>
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view>
						<u-search placeholder="请输入品牌" v-model="keyword" @search='getList' @custom='getList'>
						</u-search>
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 24%;"></view>
		<u-index-list :index-list="dataList.letters">
			<template v-for="(item, index) in dataList.brands">
				<u-index-item>
					<!-- #ifndef APP-NVUE -->
					<u-index-anchor :text="dataList.letters[index]"></u-index-anchor>
					<!-- #endif -->
					<view @click="OnPushCar(cell)" class="list-cell" v-for="(cell, index2) in item" :key="index2">
						<view>
							<image style="width: 88rpx;height: 88rpx;" :src="cell.brandCarLogo">
							</image>
						</view>
						<view style="margin-left: 20rpx;line-height: 88rpx;">{{cell.brandName}}</view>

					</view>
				</u-index-item>
			</template>
		</u-index-list>
		<view style="margin-bottom: 5%;"></view>
		<u-popup :show="show" @close="show=false" mode="right">
			<view class="pop">
				<view style="margin-top: 50%;"></view>
				<view class="u-flex" style="margin-left: 20rpx;">
					<view>
						<image :src="brandCarLogo" style="width: 70rpx;height: 70rpx;"></image>
					</view>
					<view style="margin-left: 20rpx;">
						{{brandName}}
					</view>
				</view>
				<view class="choosevehicle">
					请选择车系
				</view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" :style="{height:screenHeight}">
					<view v-for="(item,index) in vehicleList" @click="Onchexing(item)" :key="index"
						style="height: 90rpx;line-height: 60rpx;padding: 20rpx;">
						<view class="u-flex">
							<view>
								<image :src="item.listImg" mode="heightFix" style="width: 120rpx;height: 60rpx;">
								</image>
							</view>
							<view style="margin-left: 10rpx;font-weight: bold">
								{{item.vehicleName}}
							</view>
						</view>

					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				screenHeight: '',
				brandName: '',
				brandCarLogo: '',
				vehicleList: {},
				show: false,
				keyword: '',
				dataList: {},
				sendList: {}
			}
		},

		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sengdataList', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.keyword = data.data
				})

			})
			uni.$u.sleep(300).then(() => {
				this.getList()
				let a = uni.$u.sys().screenHeight / 4
				this.screenHeight = (uni.$u.sys().screenHeight + a) + 'rpx'
			})

		},
		onShow() {},
		computed: {},
		methods: {
			Onchexing(item) {
				let _this = this
				// uni.navigateBack({
				// 	delta: 2,
				// 	complete() {
				// 		uni.$emit('sendinfo', _this.sendList)
				// 	},
				// });

			},
			getvehicle(brandId) {
				this.$request.get("/coc-system/api/v1/system/vehicle/list/" + brandId).then(res => {
					this.vehicleList = res.data
				})
			},
			OnPushCar(item) {
				let _this = this
				uni.navigateBack({
					delta: 1,
					complete() {
						uni.$emit('sendinfo', item)
					},
				});
			},
			getList() {
				this.$request.post("/coc-system/api/v1/system/brand/list", {
					brandName: this.keyword
				}).then(res => {
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.search-top {
		width: 400rpx;
		margin-left: -160rpx;
		display: flex;
	}

	.list-cell {
		display: flex;
		margin-top: 20rpx;
		// margin-bottom: -36rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
	}

	.pop {
		width: 500rpx;

		.choosevehicle {
			margin-bottom: 20rpx;
			padding: 20rpx;
			background-color: rgb(248, 248, 248);
			color: rgb(164, 164, 165);
			font-weight: bold;
			font-size: 28rpx;
		}

	}
</style>
