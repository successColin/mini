<template>
	<view id="brandselect" style="background: #FFFFFF;">
		<u-tabs :activeStyle="{
	        color: '#222222',
	        fontWeight: 'bold',
	        fontSize: '28rpx'
	    }" :inactiveStyle="{ fontSize: '28rpx',color: '#222222',fontWeight: 500 }" itemStyle="height:70rpx" lineHeight="3"
			lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`" keyName='brandName' :list="fourbrand"
			:current="current" @click="OnClickTags">
		</u-tabs>
	</view>
</template>

<script>
	export default {
		props: {
			request: {
				type: Function
			},
			params: {
				type: Object,
				default: () => {
					return {}
				}
			}
		},
		data() {
			return {
				fourbrand: [],
				lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
				current: 0
			}
		},
		created() {
			this.getBrand()
		},
		methods: {
			getBrand() {
				if (this.request) {
					this.request(this.params).then(res => {
						if (res.code == 200) {
							res.data.unshift({
								brandName: '全部',
								brandId: '0'
							})
							this.fourbrand = res.data
							this.$emit('getBrandlist', res.data)
							this.$emit('selBrand', '0')
							setTimeout(() => {
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
			OnClickTags(e) {
				this.$emit('selBrand', e.brandId)
			},
			onChangeTags(index) {
				this.current = index
				this.OnClickTags({
					brandId: this.fourbrand[index].brandId
				})
			}
		},
	}
</script>

<style lang="scss" scoped>

</style>