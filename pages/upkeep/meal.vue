<template>
	<view class="page">
		<view class="brand_div">
			<BrandSelect ref="brandselect" @getBrandlist="getBrandlist" @selBrand="selBrand"
				@getHeight="getBrandSelHeight" :request="brandRequest"></BrandSelect>
		</view>
		<view :style="{'height':contentHeight}">
			<swiper class="swiper-box-list">
				<swiper-item class="swiper-topic-list">
					<scroll-view scroll-y class="scroll-content" @touchstart="touchStart" @touchend="touchEnd"
						@scrolltolower="scrolltolower">
						<div v-if="dataList.length>0" class="list">
							<meal-style-one v-for="(item,index) in dataList" :key="index" :data="item"></meal-style-one>
							<view style="height: 30rpx;"></view>
						</div>
						<view v-if="dataList.length==0&&isReachBottom" class="flex alc" style="height: 100%;flex-direction: column;">
							<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
							</image>
							<view class="txtDarkGray">暂无内容~</view>
						</view>
						<u-loading-icon v-if="isLoadMore" mode="circle" size="20" duration="600"></u-loading-icon>
			<!-- 			<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view> -->
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import BrandSelect from '@/pages/home/home/components/brandSelect.vue'
	import MealStyleOne from "./components/mealStyleOne.vue"
	export default {
		components: {
			MealStyleOne,
			BrandSelect
		},
		computed: {
			contentHeight() {
				return `calc(100vh - ${this.brandSelHeight}px)`
			}
		},
		data() {
			return {
				touchStartX: 0, // 触屏起始点x
				touchStartY: 0, // 触屏起始点y  
				brandList: [],
				brandId: "",
				current: 1,
				pagesize: 10,
				isLoadMore: false,
				isReachBottom: false,
				dataList: [],
				brandSelHeight: 0,
				brandRequest: () => {
					return this.$newrequest.post("/coc-active/api/v2/homePage/four_s/maintenanceBrand")
				}
			}
		},
		methods: {
			getBrandSelHeight(height) {
				this.brandSelHeight = height
			},
			getBrandlist(list) {
				this.brandList = list
			},
			selBrand(id) {
				this.brandId = id
				this.current = 1
				this.isLoadMore = false
				this.isReachBottom = false
				this.dataList = []
				this.getList()
			},
			getList() {
				this.isLoadMore = true
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS/latestTwoMeal", {
					brandId: this.brandId
				}).then(res => {
					if (res.code == 200) {
						res.data.forEach(m => {
							m.storeLabel = m.storeLabel ? m.storeLabel.split(',') : []
						})
						// if (res.data.length >= this.pagesize) {
						// 	this.isLoadMore = false
						// }
						this.isReachBottom = true
						if (this.current === 1) {
							this.dataList = res.data
						} else {
							res.data.filter(s => {
								this.dataList.push(s)
							})
						}
						this.dataList.forEach((m, index) => {
							if (index == 1) {
								m.showtype = 1
							}
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000,
						});
					}
				}).finally(() => {
					this.isLoadMore = false
				})
			},
			touchStart(e) {
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
			},
			touchEnd(e) {
				let deltaX = e.changedTouches[0].clientX - this.touchStartX;
				let deltaY = e.changedTouches[0].clientY - this.touchStartY;
				let brandIndex = this.brandList.findIndex(m => m.brandId == this.brandId)
				if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX >= 0) {
						if (this.brandList.length == 0 || this.brandList.length > 0 && brandIndex == 0) {

						} else {
							let index = this.brandList.findIndex(m => m.brandId == this.brandId)
							this.$refs.brandselect.onChangeTags(index - 1)
						}
					} else {
						if (this.brandList.length == 0 || this.brandList.length > 0 && this.brandList.length - 1 ==
							brandIndex) {

						} else {
							let index = this.brandList.findIndex(m => m.brandId == this.brandId)
							this.$refs.brandselect.onChangeTags(index + 1)
						}
					}
				}
			},
			scrolltolower() {
				if (!this.isLoadMore && !this.isReachBottom) {
					this.current++
					this.getList()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		.brand_div {
			background: #FFFFFF;
			padding: 0 30rpx;
		}

		.list {
			margin-top: 10rpx;
		}

		.swiper-box-list {
			width: 100%;
			height: 100%;
			flex: 1;

			.swiper-topic-list {
				width: 100%;

				.scroll-content {
					height: 100%;
				}
			}
		}
	}
	
	.reachBottom {
		text-align: center;
		font-size: 24rox;
		color: #999999;
		padding: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}
</style>