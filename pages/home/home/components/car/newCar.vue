<template>
	<view class="page">
		<CarAdTwo @getHeight="getAdHeight"></CarAdTwo>
		<CarList ref="carList" :otherHeight="otherHeight + adHeight"></CarList>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import CarAdTwo from './carAdTwo.vue'
	import CarList from './carList.vue'
	export default {
		components: {
			CarAdTwo,
			CarList
		},
		props: {
			otherHeight: { //组件之外高度
				type: Number
			}
		},
		data() {
			return {
				adHeight: 0
			};
		},
		created() {
			// this.$showLoading()
			// setTimeout(() => {
			// 	this.$hideLoading();
			// }, 500)
		},
		methods: {
			getAdHeight(height) {
				this.adHeight = height
			},
			changeTab(type) {
				if (type == 'left') {
					this.$parent.changeTab('left')
				} else if (type == 'right') {
					this.$parent.changeTab('right')
				}
			},
			scrolltolower() {
				this.$refs.carList.scrolltolower()
			}
		},
	};
</script>

<style lang="scss" scoped>
</style>