<template>
	<!-- 顶部 -->
	<view :style="{height:navbarHeight+'px'}">
		<u-navbar :autoBack="true" :title="title"></u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: function() {
					return '';
				}
			},
		},
		computed: {
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			}
		},
		data() {
			return {

			}
		}
	}
</script>

<style>
</style>
