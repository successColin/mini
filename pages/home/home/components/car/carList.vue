<template>
	<view>
		<u-sticky offset-top="0">
			<CarBrandSelect ref="brandselect" @touchstart="brandTouchstart" @touchend="brandTouchend"
				@getHeight="getBrandSelHeight" @getBrandlist="getBrandlist" @selBrand="selBrand"
				:request="brandRequest">
			</CarBrandSelect>
		</u-sticky>
		<view class="scroll-content" @touchstart="touchstart" @touchend="touchend">
			<template v-if="dataList.length>0">
				<CarItemStyleOne v-for="(item,index) in dataList" :key="index" :item="item" :brandId="brandId">
				</CarItemStyleOne>
			</template>
			<view v-if="dataList.length==0&&isReachBottom" class="flex alc"
				style="height: 100%;flex-direction: column;">
				<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
				</image>
				<view class="txtDarkGray">暂无内容~</view>
			</view>
			<u-loading-icon v-if="isLoadMore" mode="circle" size="20" duration="600"></u-loading-icon>
			<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
		</view>
	</view>
</template>

<script>
	import CarItemStyleOne from './carItemStyleOne.vue'
	import CarBrandSelect from './carBrandSelect.vue'
	export default {
		components: {
			CarItemStyleOne,
			CarBrandSelect
		},
		props: {
			otherHeight: { //组件之外高度
				type: Number
			}
		},
		computed: {
			contentHeight() {
				return `calc(100vh - ${this.otherHeight}px - ${this.brandSelHeight}px)`
			}
		},
		data() {
			return {
				current: 1,
				pagesize: 10,
				isLoadMore: false,
				isReachBottom: false,
				brandList: [],
				brandId: "",
				dataList: [],
				brandSelHeight: 0,
				touchStartX: 0, // 触屏起始点x
				touchStartY: 0, // 触屏起始点y  
				brandRequest: () => {
					return this.$newrequest.post("/coc-active/api/v1/vehicleInfo/newVehicleInfoBrandList", {
						typeId: 1
					})
				}
			}
		},
		created() {
			this.$showLoading()
		},
		methods: {
			getBrandSelHeight(height) {
				this.$hideLoading();
				this.brandSelHeight = height
			},
			brandTouchstart() {
				uni.$emit('car_service_istouch', false)
			},
			brandTouchend() {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
			},
			touchstart(e) {
				uni.$emit('car_service_istouch', false)
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
			},
			touchend(e) {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
				let deltaX = e.changedTouches[0].clientX - this.touchStartX;
				let deltaY = e.changedTouches[0].clientY - this.touchStartY;
				let brandIndex = this.brandList.findIndex(m => m.brandId == this.brandId)
				if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX >= 0) {
						if (this.brandList.length == 0 || this.brandList.length > 0 && brandIndex == 0) {
							this.$parent.changeTab('left')
						} else {
							let index = this.brandList.findIndex(m => m.brandId == this.brandId)
							this.$refs.brandselect.onChangeTags(index - 1)
						}
					} else {
						if (this.brandList.length == 0 || this.brandList.length > 0 && this.brandList.length - 1 ==
							brandIndex) {
							this.$parent.changeTab('right')
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
				this.$newrequest.post("/coc-active/api/v1/vehicleInfo/vehicleVideoList", {
					current: this.current,
					size: this.pagesize,
					brandId: this.brandId,
					typeId: 1
				}).then(async res => {
					if (res.code == 200) {
						for (let j = 0; j < res.data.records.length; j++) {
							let m = res.data.records[j]
							if (m.isArticle == 0) { //运营视频需要检测图片
								if (m.coverImage) {
									res.data.records[j].isLandscapeScreen = await this.checkImgType(m
										.coverImage)
								} else {
									res.data.records[j].isLandscapeScreen = true
								}
							} else {
								m.isLandscapeScreen = m.coverImageType == 1
							}
						}
						if (res.data.records.length < this.pagesize) {
							this.isReachBottom = true
						}
						if (this.current === 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
						this.dataList.forEach((m, i) => {
							if (i == 1) {
								m.showtype = 1
							} else if (i == 11) {
								m.showtype = 2
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
			checkImgType(url) {
				let isLandscapeScreen = true
				return new Promise((resolve, reject) => {
					uni.getImageInfo({
						src: url, // 设置图片路径
						success(res) {
							if (res.width < res.height) {
								isLandscapeScreen = false
							}
							resolve(isLandscapeScreen)
						},
						fail(err) {
							resolve(isLandscapeScreen)
						}
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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

	.reachBottom {
		text-align: center;
		font-size: 24rox;
		color: #999999;
		padding: 30rpx;
		font-size: 24rpx;
		color: #999999;
	}
</style>