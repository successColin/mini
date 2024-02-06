<template>
	<view v-if="adlist.length>0" id="adBox" class="adBox" @touchstart="touchstart" @touchend="touchend">
		<u-swiper :list="adlist" keyName="url" indicator radius="10rpx" height="240rpx" indicatorMode="dot"
			:interval="5000" circular @click="jump" imgMode="aspectFill"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adlist: [],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			touchstart() {
				uni.$emit('car_service_istouch', false)
			},
			touchend() {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v1/adv/space/getAdvNewCar").then(res => {
					if (res.code == 200) {
						this.adlist = res.data.map(m => {
							return {
								url: m.adUrl,
								id: m.id,
								type: 'image'
							}
						})
						setTimeout(() => {
							uni.createSelectorQuery().in(this).select("#adBox").boundingClientRect(
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
			},
			jump(index) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/brandInfo?id=' + this.adlist[index].id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.adBox {
		margin: 0 10rpx;
		padding-top: 10rpx;
	}
</style>