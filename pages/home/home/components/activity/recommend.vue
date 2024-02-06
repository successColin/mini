<template>
	<view class="scroll-content" @touchstart="touchStart" @touchend="touchEnd">
		<view class="activity waterfall">
			<!--  #ifdef MP-WEIXIN  -->
			<template v-if="dataList.length>0">
				<view style="height: 20rpx;"></view>
				<custom-waterfalls-flow imageKey="coverPicture" ref="waterfallsFlowRef" :value="dataList"
					:isshowicon="true" @imageClick="OnPushPostDetail">
					<view v-for="(item, index) in dataList" :key="index" slot="slot{{index}}"
						style="padding-bottom: 10rpx; border-radius: 0px 0px 10rpx 10rpx">
						<list-page :item="item" :list.sync="dataList" :index="index"></list-page>
					</view>
				</custom-waterfalls-flow>
				<view style="height: 20rpx;"></view>
			</template>
			<!--  #endif -->
			<view v-else class="flex alc jsc" style="height: 100%;">
				<image src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720245068.png"
					style="width: 153rpx; height: 152rpx"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import ListPage from "./listPage.vue";
	export default {
		components: {
			ListPage
		},
		props: {
			otherHeight: { //组件之外高度
				type: Number
			}
		},
		data() {
			return {
				touchStartX: 0, // 触屏起始点x
				touchStartY: 0, // 触屏起始点y  
				current: 1,
				pagesize: 10,
				isLoadMore: false,
				dataList: [],
				relatedType: 1
			}
		},
		computed: {
			contentHeight() {
				return `calc(100vh - ${this.otherHeight}px)`
			}
		},
		created() {
			this.getList()
		},
		methods: {
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
				if (Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY)) {
					if (deltaX >= 0) {
						this.$parent.changeTab('left')
					} else {
						this.$parent.changeTab('right')
					}
				}
			},
			async getList() {
				this.isLoadMore = true
				this.$newrequest
					.post("/coc-active/api/v2/homePage/four_s/activityArticle", {
						current: this.current, // 当前页
						size: this.pagesize
					}).then((res) => {
						res.data.records.filter((s, index) => {
							if (s.imgsMsg) {
								s.coverPicture = s.imgsMsg.split(",")[0];
							} else if (s.coverImage) {
								s.coverPicture = s.coverImage;
							} else if (s.videoUrl) {
								s.coverPicture = s.videoUrl +
									"?x-oss-process=video/snapshot,t_1000,m_fast";
							}
							s.citeType = 10
							s.type = 1
							s.activityTitle = s.title
							s.likeBaseNum = s.likeNum
						});
						if (res.data.records.length >= this.pagesize) {
							this.isLoadMore = false;
						}

						if (this.current == 1) {
							this.dataList = res?.data?.records || [];
						} else {
							res.data.records.filter((s) => {
								this.dataList.push(s);
							});
						}
					})
			},
			OnPushPostDetail(e) {
				uni.navigateTo({
					url: `/pages/activity/articlevideo/index?id=${e.id}&relatedType=1&shopTypeId=2&isQuote=1&newType=1&userType=2&type=1`,
				});
			},
			scrolltolower() {
				if (!this.isLoadMore) {
					this.current++
					this.getList()
				}
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

	.activity {
		height: 100%;
	}
</style>