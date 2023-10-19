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
            console.log(option)
            if(option.type&&option.type=='51'){
                this.pushurl = decodeURIComponent(option.url) 
                // this.pushurl = "https://h5.51dsrz.com/pages/imgTemplate?n=20230504.jpg"
            }else {
                this.pushurl = 'http://www.dcqcjlb.com/adv' + option.url
            }
		},
		onShow() {},
		methods: {}
	}
</script>

<style lang="scss">
	.page {}
</style>
