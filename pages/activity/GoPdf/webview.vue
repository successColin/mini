<template>
	<view class="page">
		<view>
			<!-- url为要跳转外链的地址-->
			<web-view :src="url">
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
		url
			}
		},

		onLoad(option) {
			this.url=option.url
		},
		onShow() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.page {
	}

</style>
