<template>
	<view style="background-color: #fff;">
		<u-sticky offset-top="71rpx">
			<BrandSelect ref="brandselect" @getBrandlist="getBrandlist" @selBrand="selBrand"
				@getHeight="getBrandSelHeight" :request="brandRequest" :params="brandParams"
				@touchstart="brandTouchstart" @touchend="brandTouchend">
			</BrandSelect>
		</u-sticky>
		<view class="scroll-content" @touchstart="touchStart" @touchend="touchEnd" @scrolltolower="scrolltolower">
			<view class="activity">
				<template v-if="dataList.length>0">
					<view style="height: 20rpx;"></view>
					<ActivityStyleOne v-for="(item,index) in dataList" :key="index" :item="item"
						@openAppoint="openAppoint">
					</ActivityStyleOne>
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
		<u-popup :show="appointVisble" @close="closeAppoint" mode="bottom" :safeAreaInsetBottom="false">
			<view class="appoint">
				<text class="appoint-title" style="margin-bottom: 46rpx;">客户参与活动时间意愿调查（可多选）</text>
				<view class="appoint-btn-view">
					<view v-for="(item, i) in appointList" class="appoint-btn" @click="clickAppoint(i)" :key="i"
						:style="{ color: item.ischecked ? '#D91B1B' : '#222222', background: item.ischecked ? '#FFF1F1' : '#F8F8F8' }">
						<text class="appoint-btn-text">{{ item.name }}</text>
					</view>
				</view>
				<view style="display: flex;justify-content: center;">
					<view class="appoint-submit" @click="submitAppoint">提交</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import BrandSelect from '../brandSelect.vue'
	import ActivityStyleOne from './activityStyleOne.vue'

	export default {
		components: {
			BrandSelect,
			ActivityStyleOne
		},
		props: {
			otherHeight: { //组件之外高度
				type: Number
			},
			isEnd: Number //1:未结束  2:已结束
		},
		data() {
			return {
				current: 1,
				pagesize: 10,
				isLoadMore: false,
				isReachBottom: false,
				dataList: [],
				brandList: [],
				brandId: "",
				touchStartX: 0, // 触屏起始点x
				touchStartY: 0, // 触屏起始点y  
				brandSelHeight: 0,
				brandRequest: (params) => {
					return this.$newrequest.post("/coc-active/api/v2/homePage/four_s/activity/brandList", params)
				},
				brandParams: {
					isEnd: this.isEnd
				},
				appointVisble: false,
				appointList: [{
					id: 1,
					name: '周末',
					ischecked: false
				}, {
					id: 2,
					name: '节假日',
					ischecked: false
				}, {
					id: 3,
					name: '晚上',
					ischecked: false
				}, {
					id: 4,
					name: '都可以',
					ischecked: false
				}],
				appointId: ""
			}
		},
		computed: {
			contentHeight() {
				return `calc(100vh - ${this.otherHeight}px - ${this.brandSelHeight}px)`
			}
		},
		methods: {
			brandTouchstart() {
				uni.$emit('car_service_istouch', false)
			},
			brandTouchend() {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
			},
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
				this.getActivityList()
			},
			getActivityList() {
				this.isLoadMore = true
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
					current: this.current,
					size: this.pagesize,
					payType: 0,
					shopTypeId: 2,
					isEnd: this.isEnd,
					brandId: this.brandId,
					newUserLimit: 0,
				}).then(res => {
					if (res.code == 200) {
						if (res.data.homePageActivitysVOIPage.records.length < this.pagesize) {
							this.isReachBottom = true
						}
						if (this.current === 1) {
							this.dataList = res.data.homePageActivitysVOIPage.records
						} else {
							res.data.homePageActivitysVOIPage.records.filter(s => {
								this.dataList.push(s)
							})
						}
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
				uni.$emit('car_service_istouch', false)
				this.touchStartX = e.touches[0].clientX;
				this.touchStartY = e.touches[0].clientY;
			},
			touchEnd(e) {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
				let deltaX = e.changedTouches[0].clientX - this.touchStartX;
				let deltaY = e.changedTouches[0].clientY - this.touchStartY;
				let brandIndex = this.brandList.findIndex(m => m.brandId == this.brandId)
				if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX >= 0) {
						console.log('左边')
						if (this.brandList.length == 0 || this.brandList.length > 0 && brandIndex == 0) {
							this.$parent.changeTab('left')
						} else {
							let index = this.brandList.findIndex(m => m.brandId == this.brandId)
							this.$refs.brandselect.onChangeTags(index - 1)
						}
					} else {
						console.log('右边')
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
					this.getActivityList()
				}
			},
			//预约初始化
			appointInit() {
				this.appointList = [{
					id: 1,
					name: '周末',
					ischecked: false
				}, {
					id: 2,
					name: '节假日',
					ischecked: false
				}, {
					id: 3,
					name: '晚上',
					ischecked: false
				}, {
					id: 4,
					name: '都可以',
					ischecked: false
				}]
			},
			//打开预约
			openAppoint(item) {
				this.appointInit()
				this.appointId = item.activityId
				this.appointVisble = true
			},
			//关闭预约
			closeAppoint() {
				this.appointId = ""
				this.appointVisble = false
			},
			//选择预约选项
			clickAppoint(index) {
				this.appointList[index].ischecked = !this.appointList[index].ischecked
			},
			//提交预约
			submitAppoint() {
				let time = []
				this.appointList.map(m => {
					if (m.ischecked) {
						time.push(m.id)
					}
				})
				if (time.length === 0) {
					uni.showToast({
						title: '请选择预约时间',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/appointment", {
					activityId: this.appointId,
					time
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '预约成功',
							icon: 'none',
							duration: 2000
						})
						this.closeAppoint()
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
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

	.activity {
		margin: 0 25rpx;
		height: 100%;
	}

	.appoint {
		padding: 42rpx 50rpx 50rpx 50rpx;
	}

	.appoint-title {
		font-size: 32rpx;

		color: #222222;
		display: inline-block;
	}

	.appoint-btn-view {
		width: 100%;
		height: 60rpx;
		display: inline-block;
	}

	.appoint-btn {
		width: 150rpx;
		height: 60rpx;
		border-radius: 10rpx;
		float: left;
		margin-right: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.appoint-btn-text {
		font-size: 24rpx;
		font-weight: 500;
	}

	.appoint-submit {
		width: 200rpx;
		height: 60rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		margin-top: 48rpx;
		text-align: center;
		line-height: 60rpx;
		color: #FFFFFF;
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