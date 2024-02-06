<template>
	<view class="page">
		<view :style="{'height':contentHeight}">
			<swiper class="swiper-box-list" :current="currentTab" @change="swiperChange">
				<swiper-item class="swiper-topic-list">
					<scroll-view scroll-y class="scroll-content">
						<Index></Index>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-topic-list">
					<scroll-view scroll-y class="scroll-content">
						<car-service v-if="isLoadSecondPage" :tabbarHeight="tabbarHeight"></car-service>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<view v-show="currentTab==0" class="slideBox"
			:style="{'top':`calc(23rpx + ${navbarHeight}px + 66rpx)`,'right':0,'border-radius': '10rpx 0rpx 0rpx 10rpx'}">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20240110/file_1704850493481.gif" class="leftGif"></image>
		</view>
		<view v-show="currentTab==1" class="slideBox"
			:style="{'top':`calc(23rpx + ${navbarHeight}px + 66rpx)`,'left':0,'border-radius': '0rpx 10rpx 10rpx 0rpx'}">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704785417622.gif" class="leftGif"></image>
		</view>
		<view :style="{ height: tabbarHeight + 'px' }"></view>
		<tabbar v-model="tabbarHeight" routePath="pages/home/index"></tabbar>
	</view>
</template>

<script>
	import tabbar from '@/components/tabbar/index.vue';
	import Index from "@/pages/home/index.vue"
	import CarService from "@/pages/home/home/carService.vue"
	export default {
		components: {
			Index,
			CarService,
			tabbar
		},
		data() {
			return {
				tabbarHeight: 0,
				currentTab: 0,
				isLoadSecondPage: false
			}
		},
		onShow() {

			uni.$emit('car_service_show')
		},
		computed: {
			contentHeight() {
				return `calc(100vh - ${this.tabbarHeight}px)`
			},
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
		},
		methods: {
			swiperChange(e) {
				this.currentTab = e.detail.current
				if (e.detail.current == 1) {
					this.isLoadSecondPage = true
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
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

	.slideBox {
		position: fixed;
		z-index: 99999;
		background: #222222;
		opacity: 0.4;
		width: 60rpx;
		height: 200rpx;

		.leftGif {
			width: 60rpx;
			height: 200rpx;
		}
	}
</style>