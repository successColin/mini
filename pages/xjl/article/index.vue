<template>
	<view class="page">
	<view v-for="(item,index) in circleList" :key="item.id" class="mt20 card" @click="OnPusharticleDetail(item)">
				<view class="u-flex jsb ">
					<view>
						<view class="moreLine size28 fwb" style="height: 74rpx;width: 414rpx;">
							{{item.title}}
						</view>
						<view class="u-flex  alc jsb" style="margin: 16rpx 68rpx 0rpx 0rpx;">
							<view class="u-flex ">
								<view>
									<image src="../static/image/liulanliang.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.user_view_count}}
								</view>
							</view>
							<view class="u-flex ">
								<view>
									<image src="../static/image/dianzan.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.user_likes_count}}
								</view>
							</view>
							<view class="u-flex ">
								<view>
									<image src="../static/image/pinglun.svg" style="width: 32rpx;height: 32rpx;">
									</image>
								</view>
								<view class="size24 txtDarkGray ml10">
									{{item.comment_num}}
								</view>
							</view>
						</view>
					</view>
					<view>
						<image style="width: 240rpx;height: 160rpx;border-radius: 8rpx;" :src="item.cover_image">
						</image>
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
		circleList:[],
		isLoadMore:false,
		page:1
			}
		},

		onLoad() {
			this.getarticlelist()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.page++
				this.getarticlelist()
			}
		
		},
		onShow() {
		},
		methods: {
			OnPusharticleDetail(item){
				uni.navigateTo({
					url: '/pages/xjl/article/detail?id='+item.id
				});
			},
			getarticlelist() {
				this.$xjlrequest.get("/user/learn/drive/circle/list?page_size=20&token=&page=" + this.page).then(res => {
					if (res.data.length < 20) {
						this.isLoadMore = true
					}
					if (this.page == 1) {
						this.circleList = res.data
					} else {
						res.data.filter(s => {
							this.circleList.push(s)
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
.card{
	margin: 24rpx;
	padding: 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
}
</style>
