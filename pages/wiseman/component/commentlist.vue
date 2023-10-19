<template>
	<view class="page">
		<view style="margin-left: 20rpx;font-size: 24rpx;">
			共{{ num }}条评论
		</view>
		<view v-for="(item, index) in dataList" :key="index" @click="Onreply(item)" class="mt20">
			<view class="comment">
				<view class="u-flex">
					<view>
						<u-avatar :src="item.headImg" size="30"></u-avatar>
					</view>
					<view style="margin-left: 20rpx;">
						<view
							style="font-size: 28rpx;font-weight: bold;width: 500rpx;display: flex;align-items: center;">
							<view>{{ item.userName }}</view>
							<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
								来自{{ item.userIpProvince }}</view>
						</view>
						<view style="font-size: 28rpx;width: 500rpx;margin-top: 10rpx;">{{ item.content }}
						</view>
						<view @click.stop="OnOpenImg(item.imgs)" v-if="item.imgs"
							style="display: flex;font-size: 24rpx;color: #D91B1B;margin-top: 16rpx;align-items: center;">
							<view style="margin-top: 2rpx;">
								<u-icon color="#D91B1B" name="photo"></u-icon>
							</view>
							<view>查看图片</view>
						</view>
					</view>
				</view>
				<view
					style="font-size: 20rpx;color: #999999;width: 100rpx;margin-top: 16rpx;text-align: right;margin-right: 24rpx;">
					<view>{{item.commentTime}}</view>
					<view v-if="item.userId == userId" @click.stop="delComments(item.commentId)"
						style="color: #D91B1B;margin-top: 16rpx;font-size: 28rpx;">删除</view>
				</view>

			</view>
			<view v-for="(item1,index1) in item.replyVOS" :key="index" style="margin-top: 30rpx;">
				<view class="u-flex" style="align-items: center;">
					<view style="margin-left: 88rpx;">
						<image style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="item1.headImg">
						</image>
					</view>
					<view style="font-size: 24rpx;font-weight: bold;margin-left: 10rpx;">
						{{item1.userName}}
					</view>
					<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
						来自{{item1.userIpProvince}}
					</view>
				</view>
				<view style="margin-left: 160rpx;">
					{{item1.content}}
				</view>
			</view>
		</view>
	<u-popup :safeAreaInsetBottom='false' :show="showcomment" @close="showcomment=false" mode="center" round="15">
		<view style="width: 650rpx;height: 400rpx;padding: 25rpx;">
			<view class="size28 fwb mt20">评论</view>
			<view class="mt20" style="width: 650rpx;display: inline-block;">
				<u--textarea v-model="textcontent" placeholder="请输入内容"></u--textarea>
			</view>
			
			<view class="tac return-btn" style="display: inline-block;" @click="Onreplypop">提交评论</view>
		</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				textcontent:'',
showcomment:false,
				num: 0,
				id: '',
				current: 1,
				isLoadMore: false,
				dataList: [],
				commentid:''

			}
		},

		onLoad(option) {
			this.id = option.id
			this.num = option.num
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onShow() {},
		methods: {
	
			Onreplypop() {
			this.$request.post("/coc-social/api/v2/article/comment", {
				commentType: 4,
				content: this.textcontent,
				id: this.commentid,
			}).then(res => {
				if (res.code == 200) {
					this.textcontent = ''
					this.showcomment = false
					this.current=1
					this.isLoadMore=false
					this.getList()
					uni.$u.toast('评论成功')
				} else {
					uni.$u.toast(res.message)
				}
			})			
			},
			Onreply(item) {
				this.commentid=item.commentId
				this.showcomment = true
			},
			getList() {
				this.$request.post('coc-social/api/v1/article/findById', {
					current: this.current,
					id: this.id,
					size: 20
				}).then(res => {
					if (res.data.comments.length < 20) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.dataList = res.data.comments
					} else {
						res.data.comments.filter(s => {
							this.dataList.push(s)
						})
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 25rpx;
	}
	.comment {
		display: flex;
		justify-content: space-between;
	}
	.return-btn {
		margin-top: 50rpx;
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: #ffffff;
		border-radius: 15rpx;
		background-color: #D91B1B;
	}
</style>
