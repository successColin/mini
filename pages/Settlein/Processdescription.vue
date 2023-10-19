<template>
	<view class="page">
		<view class="tabs">
			<view :class="{'current-tab-left':currenttab==1}" @click="OnClickTab(1)" class="tab-item">企业入驻</view>
			<view :class="{'current-tab-right':currenttab==2}" @click="OnClickTab(2)" class="tab-item">个体工商户认证</view>
		</view>
		<view class="item-img" v-if="currenttab==1">
			<image v-if="isLineLedger==1" mode="widthFix" style="width: 600rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221114/2b5babe477cc4f4492f2d84ea2a83a7b.png">
			</image>
			<image v-else-if="isLineLedger==0" mode="widthFix" style="width: 600rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689664487623.png">
			</image>
		</view>
		<view class="item-img" v-else>
			<image v-if="isLineLedger==1" mode="widthFix" style="width: 600rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221114/7246e1d8af8b48cdbc020b4688c7b1aa.png">
			</image>
			<image v-else-if="isLineLedger==0" mode="widthFix" style="width: 600rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689664545345.png">
			</image>
		</view>
		<view class="bottom-next">
			<text @click="OnNext">下一步</text>
		</view>
	</view>
</template>

<script>
	import {
		getstorage,tologin
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				currenttab: 1,
				sourceType:null,
				operateId:null,
				affiliationType:null,
				isLineLedger:null
			}
		},

		onLoad(option) {
			if (tologin() !== true) {
				return
			}
			if(option.sourceType){
				this.sourceType=option.sourceType
			}
			if(option.operateId){
				this.operateId=option.operateId
			}
			if(option.operateId){
				this.operateId=option.operateId
			}
			if(option.affiliationType){
				this.affiliationType=option.affiliationType
			}
			if(option.isLineLedger){
				this.isLineLedger=option.isLineLedger
			}
		},
		onShow() {},
		methods: {
			OnNext() {
				uni.navigateTo({
					url: "/pages/Settlein/dataDisplay?type=" + this.currenttab+"&affiliationType="+this.affiliationType+"&operateId="+this.operateId+"&sourceType="+this.sourceType+"&isLineLedger="+this.isLineLedger
				});
			},
			OnClickTab(index) {
				this.currenttab = index
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.tabs {
		height: 100rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;

		.tab-item {
			font-size: 28rpx;
			font-weight: bold;
			line-height: 100rpx;
		}

		.current-tab-left {
			color: #D91B1B;
			// border-bottom: 6rpx #D91B1B solid;
		}

		.current-tab-right {
			color: #D91B1B;
			// border-bottom: 6rpx #D91B1B solid;
		}

		.current-tab-left:before {
			content: '';
			position: absolute;
			top: 94rpx;
			left: 150rpx;
			height: 6rpx;
			width: 30rpx;
			background-color: #D91B1B;
		}

		.current-tab-right:before {
			content: '';
			position: absolute;
			top: 94rpx;
			left: 540rpx;
			height: 6rpx;
			width: 30rpx;
			background-color: #D91B1B;
		}
	}

	.item-img {
		text-align: center;
		margin-top: 40rpx;
	}

	.bottom-next {
		text-align: center;
		margin-top: 60rpx;

		text {
			display: inline-block;
			border-radius: 40rpx;
			width: 600rpx;
			height: 80rpx;
			background-color: #D91B1B;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: 400;
		}
	}
</style>
