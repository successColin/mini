<template>
	<view class="page">
		<view class="actrice_list">
			<view v-for="(item,index) in dataList" :key="item.id" class="actrice_item u-flex jsb"
				@click="OnPushdetail(item)">
				<view class="article_title moreLine">{{item.title}}
				</view>
				<view style="position: relative;">
					<image class="article_img" :src="item.coverImage"></image>
					<view v-if="item.contextType==2">
						<image class="player"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png">
						</image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				id: '',
				title: '',
				dataList: []
			}
		},

		onLoad(option) {
			this.id = option.id
			uni.setNavigationBarTitle({
				title: option.title,
			})
			this.getList()
		},
		onShow() {},
		methods: {
			OnPushdetail(item) {
				uni.navigateTo({
					url: `/pages/wiseman/specialarea/creative_center_detail?id=${item.id}&contextType=${item.contextType}`
				})
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v1/creative/center/list", {
					baseDataDictionaryIdType: this.id
				}).then(res => {
					if (res.code === 200) {
						this.dataList = res.data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 0 23rpx;
	}

	.actrice_item {
		margin-top: 23rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		padding: 23rpx;

		.article_title {
			width: 450rpx;
			height: 100%;
			font-size: 27rpx;
			font-weight: 400;
			color: #222222;
		}

		.article_img {
			width: 192rpx;
			height: 138rpx;
			border-radius: 8rpx;
		}
	}

	.player {
		width: 46rpx;
		height: 46rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

	}
</style>
