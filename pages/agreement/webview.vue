<template>
	<view class="page">
		<view>
			<!-- url为要跳转外链的地址-->
			<web-view :src="pushurl">
			</web-view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				pushurl: ''
			}
		},
		onLoad(option) {
			this.pushurl =  option.url
			
		},
		onShow() {},
		methods: {}
	}
</script>

<style lang="scss">
	.page {}
</style>
