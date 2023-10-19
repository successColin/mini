<template>
	<view class="page">
		<view class="u-flex alc mt10">
			<view class="price-item">
				可赚佣金¥<text class="size32 fwb">{{price}}</text>
			</view>
			<view class="size24 txtLighGray" style="margin-left: 7rpx;">
				佣金率{{proportion}}%
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
		
			}
		},
	props: {
			price: {
				type: String,
				default: function() {
					return '';
				}
			},
			proportion: {
				type: String,
				default: function() {
					return '';
				}
			}
		},
		onLoad() {
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
.price-item{
	padding: 6rpx 15rpx;
	font-size: 24rpx;
	color: #ffffff;
	border-radius: 119rpx;
background: #D91B1B;
}
</style>
