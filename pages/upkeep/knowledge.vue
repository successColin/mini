<template>
	<view class="page">
		<div v-if="dataList.length>0">
			<up-keep-style-one v-for="(item,index) in dataList" :key="index" :item="item"></up-keep-style-one>
		</div>
		<view v-if="dataList.length==0&&isReachBottom" class="flex alc" style="height: 100%;flex-direction: column;">
			<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
			</image>
			<view class="txtDarkGray">暂无内容~</view>
		</view>
		<u-loading-icon v-if="isLoadMore" mode="circle" size="20" duration="600"></u-loading-icon>
		<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
	</view>
</template>

<script>
	import UpKeepStyleOne from "./components/upkeepStyleOne.vue"
	export default {
		components: {
			UpKeepStyleOne
		},
		onReachBottom() {
			if (!this.isLoadMore && !this.isReachBottom) {
				this.current++
				this.getList()
			}
		},
		data() {
			return {
				current: 1,
				pagesize: 10,
				isLoadMore: false,
				isReachBottom: false,
				dataList: []
			}
		},
		created() {
			this.getList()
		},
		methods: {
			getList() {
				this.isLoadMore = true
				this.$newrequest.post("/coc-active/api/v1/vehicleInfo/vehicleVideoList", {
					current: this.current,
					size: this.pagesize,
					typeId: 2
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
						this.dataList.forEach((m, index) => {
							if (index == 0) {
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
	.page {
		padding-top: 10rpx;
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