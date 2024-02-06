<template>
	<view id="brandselect" class="brand">
		<scroll-view id="brand-list" :scroll-left="scrollLeft" scroll-x="true" :scroll-with-animation="true"
			style="white-space: nowrap;">
			<view class="flex">
				<view :id="'brand-item'+index" class="brand-item flex alc jsc"
					:class="{'brand-sel':brandId==item.brandId,'brand-nosel':brandId!=item.brandId}"
					v-for="(item,index) in fourbrand" :key="index" @click="OnClickTags(item,index)">
					<image mode="heightFix" v-if="index>0" :src="item.brandLogo"
						style="width:30rpx;height: 30rpx;margin-right: 6rpx;">
					</image>
					{{item.brandName}}
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props: {
			request: {
				type: Function
			}
		},
		data() {
			return {
				fourbrand: [],
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
				current: 0,
				scrollLeft: 0,
				brandId: "0",
				widthList: [],
				screenWidth: uni.upx2px(730)
			}
		},
		created() {
			this.getBrand()
		},
		methods: {
			getBrand() {
				if (this.request) {
					this.request().then(res => {
						if (res.code == 200) {
							res.data.unshift({
								brandName: '推荐',
								brandId: '0'
							})
							this.fourbrand = res.data
							this.$emit('getBrandlist', res.data)
							this.$emit('selBrand', '0')
							setTimeout(async () => {
								await this.compute()
								uni.createSelectorQuery().in(this).select("#brandselect")
									.boundingClientRect(
										data => {
											this.$emit('getHeight', data.height)
										}).exec()
							}, 1000)
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000,
							});
						}
					})
				}
			},
			async compute() {
				let widthList = []
				let otherWidth = uni.upx2px(6)
				for (let i = 0; i < this.fourbrand.length; i++) {
					let width = await this.computeWidth("#brand-item" + i)
					widthList.push(width + otherWidth)
				}
				this.widthList = widthList
			},
			computeWidth(element) {
				return new Promise((resolve, reject) => {
					uni.createSelectorQuery().in(this).select(element).boundingClientRect(
						data => {
							resolve(data.width)
						}).exec()
				})

			},
			OnClickTags(e, index) {
				this.brandId = e.brandId
				this.$emit('selBrand', e.brandId)
				let totalWidth = 0
				for (let i = 0; i < index; i++) {
					totalWidth += this.widthList[i]
				}
				let width = this.screenWidth / 2 - this.widthList[index] / 2
				this.scrollLeft = totalWidth - width
			},
			onChangeTags(index) {
				this.OnClickTags({
					brandId: this.fourbrand[index].brandId
				}, index)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.brand {
		padding: 20rpx 0;
		margin: 0 10rpx;
		background: #F8F8F8;

		&-item {
			padding: 0 20rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			border-radius: 10rpx;
			margin-right: 6rpx;
			height: 48rpx;
			line-height: 48rpx;
		}

		&-sel {
			border: 1px solid #D91B1B;
			font-weight: bold;
			color: #D91B1B;
			background: #FFF2F2;
		}

		&-nosel {
			border: 1px solid #FFFFFF;
			font-weight: 500;
			color: #222222;
			background: #FFFFFF;
		}
	}
</style>