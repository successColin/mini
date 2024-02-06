<template>
	<view class="page">
		<view class="navigation">
			<u-navbar bgColor="#FFFFFF" title="51车·人车生活俱乐部" :leftIconSize="0">
				<view class="navigation-navbar-center" slot="center">
					<view class="navigation-search">
						<view class="navigation-search-frame" @click="toSearch">
							<view class="navigation-search-frame-title">51车·人车生活俱乐部</view>

							<image src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693442474478.png"
								class="navigation-search-frame-image" />
						</view>
						<button type="default" class="kefu-contact" open-type="contact" session-from="" :plain="true" style="border-color: transparent;">
							<image src="@/static/image/kefu.svg" class="navigation-search-customer" />
						</button>
					</view>
				</view>
			</u-navbar>
		</view>
	</view>
</template>

<script>
	export default {
		methods: {
			toSearch() {
				uni.navigateTo({
					url: "/pages/search/homeSecond/index",
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 750rpx;
	}

	.navigation {
		height: 100%;
		width: 100%;

		&-search {
			display: flex;
			align-items: center;
			width: 750rpx;

			&-frame {
				display: flex;
				align-items: center;
				justify-content: space-between;
				width: 490rpx;
				height: 64rpx;
				background: #f8f8f8;
				border-radius: 32rpx;
				margin-left: 10rpx;

				&-title {
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #999999;
					margin-left: 26rpx;
				}

				&-image {
					width: 30rpx;
					height: 31rpx;
					margin-right: 28rpx;
				}
			}

			&-customer {
				width: 37rpx;
				height: 37rpx;
			}
		}
	}

	.kefu-contact {
		background: none;
		border: 0;
		margin: 0;
		padding: 0;
		outline: none;
		width: 37rpx;
		height: 37rpx;
		display: inline-flex;
		margin-left: 12rpx;
	}
</style>