<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<view id="top">
			<!-- 			<u-navbar title="51车·人车生活俱乐部" :leftIconSize="0"></u-navbar> -->
			<Navigation></Navigation>
			<view :style="{'height':navbarHeight+'px'}"></view>
			<view class="service_tab flex jsb" @touchstart="tabTouchStart" @touchend="tabTouchEnd">
				<view class="service_tab_item flex alc" v-for="(item,index) in tabList" :key="index"
					@click="clickTab(item.index,index)">
					<view class="service_tab_item_title" :class="{'service_tab_item_title_sel':tabIndex===item.index}">
						{{item.name}}
					</view>
					<image v-if="tabIndex===item.index" class="service_tab_item_line"
						src="https://oss.dcqcjlb.com/51che_java_dev/20240106/file_1704510304600.png"></image>
				</view>
			</view>
		</view>
		<view :style="{'height':contentHeight}">
			<swiper class="swiper-box-list">
				<swiper-item class="swiper-topic-list">
					<scroll-view v-if="tabIndex===1" scroll-y class="scroll-content" @scrolltolower="scrolltolower">
						<NewCar ref="newCar" :otherHeight="otherHeight"></NewCar>
					</scroll-view>
					<scroll-view v-if="tabIndex===2" scroll-y class="scroll-content">
						<KeepAppoint></KeepAppoint>
					</scroll-view>
					<scroll-view v-if="tabIndex===3" scroll-y class="scroll-content" @scrolltolower="scrolltolower">
						<PlayActivity ref="playActivity" :otherHeight="otherHeight"></PlayActivity>
					</scroll-view>
					<scroll-view v-if="tabIndex===4" scroll-y class="scroll-content">
						<TechnicianQa></TechnicianQa>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import Navigation from './components/navigation.vue'
	import NewCar from './components/car/newCar.vue'
	import KeepAppoint from './components/keep/keepAppoint.vue'
	import PlayActivity from './components/activity/playActivity.vue'
	import TechnicianQa from './components/technician/technicianQa.vue'
	export default {
		components: {
			Navigation,
			NewCar,
			KeepAppoint,
			PlayActivity,
			TechnicianQa
		},
		props: {
			tabbarHeight: { //tabbar高度
				type: Number,
				default: 0
			},
			currentTabIndex: { //初始tab位置
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabList: [{
					index: 1,
					name: '新车鉴赏'
				}, {
					index: 2,
					name: '保养预约'
				}, {
					index: 3,
					name: '玩乐活动'
				}, {
					index: 4,
					name: '技师答疑'
				}],
				tabIndex: 1,
				touchStartX: 0, // 触屏起始点x
				touchStartY: 0, // 触屏起始点y  
				topHeight: 0,
				isTouch: true
			}
		},
		computed: {
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			contentHeight() {
				return `calc(100vh - ${this.otherHeight}px)`
			},
			otherHeight() {
				return this.topHeight + this.tabbarHeight
			}
		},
		created() {
			//用于控制是否滑屏返回
			uni.$on('car_service_istouch', value => {
				this.isTouch = value
			})
			if (this.currentTabIndex > 1) { //初始化跳转tab
				this.clickTab(this.currentTabIndex, this.currentTabIndex - 1)
			}
		},
		destroyed() {
			uni.$off('car_service_istouch')
		},
		mounted() {
			uni.createSelectorQuery().in(this).select("#top").boundingClientRect(data => {
				this.topHeight = data.height
			}).exec()
		},
		methods: {
			clickTab(tabindex) {
				this.tabIndex = tabindex
			},
			tabTouchStart(){
				this.isTouch = false
			},
			tabTouchEnd(){
				setTimeout(() => {
					this.isTouch = true
				}, 100)
			},
			/**
			 * 触摸开始  
			 **/
			touchStart(e) {
				if (this.isTouch) {
					this.touchStartX = e.touches[0].clientX;
					this.touchStartY = e.touches[0].clientY;
				}
			},
			/**  
			 * 触摸结束  
			 **/
			touchEnd(e) { //父级页面切屏
				if (this.isTouch) {
					let deltaX = e.changedTouches[0].clientX - this.touchStartX;
					let deltaY = e.changedTouches[0].clientY - this.touchStartY;
					if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
						if (deltaX >= 0) {
							if (this.tabIndex > 1) {
								this.clickTab(this.tabIndex - 1)
							}
						} else {
							if (this.tabIndex < this.tabList.length) {
								this.clickTab(this.tabIndex + 1)
							}
						}
					}
				}
			},
			//子组件切屏
			changeTab(type) {
				if (type == 'left') {
					if (this.tabIndex == 1) {
						this.$parent.currentTab = 0
					} else {
						this.tabIndex = this.tabIndex - 1
					}
				} else if ('right') {
					this.tabIndex = this.tabIndex + 1
				}
			},
			scrolltolower() {
				if (this.tabIndex == 1) {
					this.$refs.newCar.scrolltolower()
				} else if (this.tabIndex == 3) {
					this.$refs.playActivity.scrolltolower()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		min-height: 100%;
	}

	.service {
		&_tab {
			padding: 0 50rpx 0 50rpx;
			background: #FFFFFF;
			height: 66rpx;
			border-radius: 0rpx 0rpx 20rpx 20rpx;

			&_item {
				flex-direction: column;
				padding-top: 15rpx;

				&_title {
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
				}

				&_title_sel {
					font-weight: bold;
					color: #222222;
				}

				&_line {
					width: 40rpx;
					height: 6rpx;
					margin-top: 10rpx;
				}
			}
		}
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
</style>