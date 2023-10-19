<template>
	<view class="page">
		<view class="search-top">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot" slot="center">
					<view>
						{{title}}
					</view>

				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot search-top" slot="center">
					<view style="position: relative;right: 50rpx;">
						{{title}}
					</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 26%;"></view>
		<view v-if="type==1" class="item-img">
			<image  v-if="isLineLedger==1" mode="widthFix" style="width: 700rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221122/7e9e68b6b6384a29876475b7c43f305e.png">
			</image>
			<image  v-else-if="isLineLedger==0" mode="widthFix" style="width: 700rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689665010800.png">
			</image>
		</view>
		<view v-else class="item-img">
			<image v-if="isLineLedger==1" mode="widthFix" style="width: 700rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221121/979ab68434864bccb3297587fa9faf31.png">
			</image>
			<image v-else-if="isLineLedger==0" mode="widthFix" style="width: 700rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689665061709.png">
			</image>
		</view>
		<view class="bottom-next">
			<text @click="OnNext">我准备好了</text>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				title: '',
				type: 1,
				sourceType: null,
				operateId: null,
				affiliationType: null,
				isLineLedger: null
			}
		},

		onLoad(option) {
			this.type = option.type
			if (option.type == 1) {
				this.title = '企业入驻需上传资料模板'
			} else {
				this.title = '个体工商户入驻需上传资料模板'
			}
			if (option.sourceType) {
				this.sourceType = option.sourceType
			}
			if (option.operateId) {
				this.operateId = option.operateId
			}
			if (option.operateId) {
				this.operateId = option.operateId
			}
			if (option.affiliationType) {
				this.affiliationType = option.affiliationType
			}
			if (option.isLineLedger) {
				this.isLineLedger = option.isLineLedger
			}
		},
		onShow() {},
		methods: {
			OnNext() {
				if (this.type == 1) {
					uni.navigateTo({
						url: '/pages/Settlein/uploadEnterprise?shopType=3'+"&affiliationType="+this.affiliationType+"&operateId="+this.operateId+"&sourceType="+this.sourceType+"&isLineLedger="+this.isLineLedger
					})
				} else {
					uni.navigateTo({
						url: '/pages/Settlein/uploadIndividual?shopType=3'+"&affiliationType="+this.affiliationType+"&operateId="+this.operateId+"&sourceType="+this.sourceType+"&isLineLedger="+this.isLineLedger
					})
				}

			},
		}
	}
</script>

<style lang="scss">
	.page {}

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
