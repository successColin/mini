<template>
	<view class="page">
		<view v-for="(item,index) in commentList" :key="item.id" class="mt20">
			<view class="u-flex jsb">
				<view class="u-flex">
					<view>
						<u-avatar size="32" :src="item.user_avator	"></u-avatar>
					</view>
					<view class="ml20">
						<view class="size28 fwb">{{item.user_name}}</view>
						<view class="txtLighGray size24">{{item.comment_time}}</view>
					</view>
				</view>
				<view class="u-flex alc " @click="OnPushlike(item,index)">
					<view v-if="!item.user_likes_is_exists">
						<u-icon name="thumb-up"></u-icon>
					</view>
					<view v-else>
						<u-icon color="#D91B1B" name="thumb-up"></u-icon>
					</view>
					<view style="margin-left: 8rpx;" :class="{'mainRed':item.user_likes_is_exists}">{{item.user_likes}}
					</view>
				</view>

			</view>
			<view class="size32 moreLine " style="margin-left: 80rpx;margin-top: 30rpx;width: 540rpx;">
				{{item.content}}
			</view>
			<u-divider :text="null"></u-divider>
		</view>
		<view style="height: 50rpx;">

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
				id: '',
				page: 1,
				isLoadMore: false,
				commentList: []
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.page++
				this.getcomment()
			}

		},
		onLoad(option) {

			this.id = option.id
			this.getcomment()
			let _this = this
			uni.$on('getdata', function(data) {
				if(!uni.getStorageSync("xjltoken")){
					uni.navigateBack({
						delta: 1
					})
					return false
				}
				_this.getcomment()
			})
		},
		onShow() {},
		methods: {
			OnPushlike(item, index) {
				this.$tokenxjlrequest.post("/user/learn/drive/circle/updateLikesStatus", {
					token: getstorage('xjltoken'),
					rel_id: item.id,
					type: '4',
					source_type: '1'
				}).then(res => {
					if (res.code == 200) {
						if (!this.commentList[index].user_likes_is_exists) {
							this.commentList[index].user_likes = this.commentList[index].user_likes + 1
						} else {
							this.commentList[index].user_likes = this.commentList[index].user_likes - 1
						}
						this.commentList[index].user_likes_is_exists = !this.commentList[index]
							.user_likes_is_exists
					} else {
						uni.$u.toast(res.msg)
					}
				})
			},
			getcomment() {
				this.$tokenxjlrequest.get('/user/learn/drive/circle/getCommentsLists?id=' + this.id +
					'&comment_type=2&token='+getstorage('xjltoken')+'&page_size=20&&page=' + this.page).then(
					res => {
						if (res.data.length < 20) {
							this.isLoadMore = true
						}
						if (this.page == 1) {
							this.commentList = res.data.list
						} else {
							res.data.list.filter(s => {
								this.commentList.push(s)
							})
						}
					})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 24rpx;
	}
</style>
