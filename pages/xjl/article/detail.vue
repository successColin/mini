<template>
	<view class="page">
		<view  v-if="isshowpage">
		<view class="top-swiper" v-if="dataList.show_type == '2'">
			<u-swiper :list="dataList.images" @click="clickswiper"></u-swiper>
		</view>
		<view v-if="dataList.show_type == '3'">
			<video class="video-css" :src="dataList.video_url"></video>
		</view>
		<view class="size32 fwb m-24">
			{{dataList.title}}
		</view>
		<view class="info">
			<view class="u-flex alc">
				<view>
					<u-avatar size="32" :src="'https://cdn.51xuej.com/'+dataList.release_avator	"></u-avatar>
				</view>
				<view class="size28 txtLighGray ml10">
					{{dataList.release_name}}
				</view>
			</view>
			<view class="txtLighGray size28 u-flex">
				<view style="margin-right: 34rpx;">{{dataList.created_at}}</view>
				<view>
					{{dataList.user_view_count}}次观看
				</view>
			</view>
		</view>
		<view class="m-24" style="line-height: 50rpx;">
			<u-parse :content="dataList.content"></u-parse>
		</view>
		<view class="m-24 ">
			<view class="size32 fwb" style="margin-bottom: 30rpx;">
				共{{total}}条评论
			</view>
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
						<view style="margin-left: 8rpx;width: 50rpx;" :class="{'mainRed':item.user_likes_is_exists}">
							{{item.user_likes}}
						</view>
					</view>

				</view>
				<view class="size32 moreLine " style="margin-left: 80rpx;margin-top: 30rpx;width: 540rpx;">
					{{item.content}}
				</view>
				<u-divider v-if="index!=1" :text="null"></u-divider>
			</view>

			<view v-if="total>0">
				<!-- <u-divider :text="null"></u-divider> -->
				<view @click="OnPushMoreComment" class="txtLighGray tac size28">查看更多评论</view>
			</view>

		</view>
		<view class="btn-bottom">
			<view class="u-flex alc jsb">
				<view class="u-flex alc jsb" style="width: 160rpx;">
					<view class="tac">
						<view @click="Onlike">
							<image v-if="!dataList.is_user_likes_exists" src="@/static/image/weidianzanbig.png"
								style="width: 44rpx;height: 38rpx;">
							</image>
							<image v-else src="@/static/image/yidianzanbig.png" style="width: 44rpx;height: 38rpx;">
							</image>
						</view>
						<view>
							<text>{{dataList.user_likes_count}}</text>

						</view>
					</view>

					<view style="margin-top: 6rpx">
						<view>
							<button class="botton-none" open-type='share'>

								<view style="display: initial;">
									<image src="@/static/image/fenxiangbig.png" style="width: 41rpx;height: 41rpx;">
									</image>
								</view>
							</button>
						</view>
						<view style="text-align: center;position: relative;top: -26rpx;">
							<text>{{dataList.user_share_count}}</text>
						</view>
					</view>
				</view>
				<view>
					<view style="width: 420rpx;">
						<u--input v-model='content' @confirm='addcomment' placeholder="说点什么..." suffixIcon="edit-pen"
							shape='circle' prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</view>
				</view>
			</view>

		</view>
		<view style="height: 200rpx;"></view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import {
		tologin,
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
					isshowpage: false,
				content: '',
				id: '',
				dataList: {},
				commentList: [],
				total:0
			}
		},

		onLoad(option) {
			if (!this.isshowpage) {
				this.$showLoading()
			}
			this.id = option.id
			this.getList()
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
		onShareAppMessage(res) {
			tologin()
			this.$tokenxjlrequest.post("/user/learn/drive/circle/add_view_share", {
				token: getstorage('xjltoken'),
				rel_id: this.id,
				type: '3',
				source: '2',
				from: 'shares'
			}).then(res => {
				this.dataList.user_share_count = this.dataList.user_share_count + 1
			})
			let title = this.dataList.title
			return {
				title,
			};
		},
		onShareTimeline(res) {
			tologin()
			this.$tokenxjlrequest.post("/user/learn/drive/circle/add_view_share", {
				token: getstorage('xjltoken'),
				rel_id: this.id,
				type: '3',
				source: '2',
				from: 'shares'
			}).then(res => {
				this.dataList.user_share_count = this.dataList.user_share_count + 1
			})
			let title = this.dataList.title
			return {
				title,
			};
		},
		methods: {
			addcomment(e) {
				console.log(e)
				this.$tokenxjlrequest.post("/user/learn/drive/circle/addComment", {
					token: getstorage('xjltoken'),
					rel_id: this.id,
					comment_type: '2',
					source_type: '1',
					content: e
				}).then(res => {
					if (res.code == 200) {
						this.content = ''
						uni.$u.toast('评论成功')
						this.getList()
						this.getcomment()
					} else {
						uni.$u.toast(res.msg)
					}

				})
			},
			Onlike() {
				this.$tokenxjlrequest.post('/user/learn/drive/circle/updateLikesStatus', {
					token: getstorage('xjltoken'),
					rel_id: this.id,
					type: '3',
					source_type: '1'
				}).then(res => {
					if (res.code == 200) {
						if (!this.dataList.is_user_likes_exists) {
							this.dataList.user_likes_count = this.dataList.user_likes_count + 1
						} else {
							this.dataList.user_likes_count = this.dataList.user_likes_count - 1
						}
						this.dataList.is_user_likes_exists = !this.dataList.is_user_likes_exists
					} else {
						uni.$u.toast(res.msg)
					}
				})
				if (!this.dataList.is_user_likes_exists) {
					thi
				}
			},
			OnPushMoreComment() {
				uni.navigateTo({
					url: '/pages/xjl/article/comment?id=' + this.id
				});
			},
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
					'&page=1&comment_type=2&token='+getstorage('xjltoken')+'&page_size=2').then(res => {
					this.commentList = res.data.list
					this.total=res.data.total
				})
			},
			clickswiper(e) {
				let _this = this
				uni.previewImage({
					urls: _this.dataList.images,
					current: e
				})
			},
			getList() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$xjlrequest.get('/user/learn/drive/circle/detail?token='+getstorage('xjltoken')+'&id=' + this
					.id).then(res => {
					res.data.created_at = res.data.created_at.substring(5, 10)

					this.dataList = res.data
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.m-24 {
		margin: 24rpx;
	}

	.top-swiper {
		margin: 24rpx;
	}

	.video-css {
		margin: 24rpx;
		width: 100%;
	}

	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 16rpx;
		margin: 16rpx 24rpx 0rpx 24rpx;
		align-items: center;
	}

	.btn-bottom {
		position: fixed;
		bottom: 0rpx;
		height: 120rpx;
		background-color: #ffffff;
		width: -webkit-fill-available;
		padding: 24rpx 48rpx;
	}

	.botton-none {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
	}

	.botton-none::after {
		border: none;
	}

</style>
