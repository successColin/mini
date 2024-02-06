<template>
	<view>
		<activityMall ref="mall" />
	</view>
</template>

<script>
	import activityMall from '@/pages/home/activityMall/components/home.vue'
	export default {
		components: {
			activityMall
		},
		onReachBottom() {
			this.$refs.mall.getmore()
		}
	}
</script>

<style lang="scss" scoped>

</style>
