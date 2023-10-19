<template>
	<view class="page">
		<div>
			<image mode="widthFix" style="width: 100%;" src="https://oss.dcqcjlb.com/51che_java_dev/20230508/file_1683512430434.png"></image>
		</div>
		<div class="u-flex jsb margin50 size32" style="margin-top: 30rpx;">
			<div >真实姓名</div>
			<div class="txtLighGray">{{name}}</div>
		</div>
		<div style="margin: 0 50rpx 0 50rpx;">
			<u-divider :text="null"></u-divider>
		</div>
		<div class="u-flex jsb margin50 size32 mt20" >
			<div >身份证号</div>
			<div class="txtLighGray">{{idCard}}</div>
		</div>
		<div style="margin: 0 50rpx 0 50rpx;">
			<u-divider :text="null"></u-divider>
		</div>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
		name:'',
		idCard:''
			}
		},

		onLoad(option) {
			this.idCard=option.idCard
			this.name=option.name
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
.margin50{
	margin:0 50rpx 0 50rpx;
}
</style>
