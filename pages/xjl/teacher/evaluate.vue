<template>
	<view class="page">
		<view class="card">
			<view class="u-flex u-flex-wrap">
				<view v-for="(item,index) in taglist" :key="item.id" class="tag-item">
					{{item.tag_name}}({{item.count}})
				</view>
			</view>
		</view>
		<view class="card">
			<view v-for="(item,index) in dataList" :key="item.id">
				<view class="u-flex jsb alc">
					<view class="u-flex " style="margin-top: 44rpx;align-items: center;">
						<view v-if="item.user_avator">
							<u-avatar size="48" :src="item.user_avator"></u-avatar>
						</view>
						<view v-else>
							<u-avatar size="48" src="https://oss.dcqcjlb.com/51che_java_dev/20230419/file_1681907219037.png"></u-avatar>
							</view>
						<view style="margin-left: 16rpx">
							<view class="size28">
								{{item.user_name}}
							</view>
							<view class="u-flex alc mt10">
								<view>
									<u-rate active-color="#D91B1B" count="5" v-model="item.star" readonly></u-rate>
								</view>
								<view style="margin-left: 16rpx;" class="size24">
									{{item.star.toFixed(1)}}
								</view>
							</view>
						</view>
					</view>
					<view class="txtLighGray size24">
						{{item.date}}
					</view>
				</view>
				<view class="size28" style="margin-top: 24rpx;">
					{{item.content}}
				</view>
				<view class="u-flex" style="flex-wrap: wrap;">
					<view v-for="(item1, index1) in item.imgs" :key="index1">
						<view class="mt10">
							<image class="mr10" @click="clickImg(item1)" :src="item1"
								style="width: 200rpx; height: 200rpx;border-radius: 8rpx"></image>
						</view>
					</view>
				</view>
				<view class="u-flex" style="flex-wrap: wrap;margin-top: 24rpx;">
					<view v-for="(item2,index2) in item.evaluate_tags" :key="item2.tag_id" class="tag-item-b">
						{{item2.tag_name}}
					</view>
				</view>

				<view>
					<u-divider :text="null"></u-divider>
				</view>
			</view>
		</view>
		<view class="btn-bottom">
			<view class="btn-appraise" @click="OnPushEvaluateTeacher()">
				<view class="u-flex">
					<image style="width: 48rpx;height: 48rpx;" src="../static/image/pingjiaicon.svg"></image>
				</view>
				<view>
					评价教练
				</view>

			</view>

		</view>
		<view style="height: 200rpx;"></view>
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
				taglist: [],
				dataList: [],
				isLoadMore: false
			}
		},

		onLoad(option) {
			let _this = this
			this.id = option.id
			this.getList()
			uni.$on('add', function(data) {
				_this.page = 1
				_this.getList()
			})
			uni.$on('getdata', function(data) {
				if(!uni.getStorageSync("xjltoken")){
					uni.navigateBack({
						delta: 1
					})
					return false
				}
				_this.getList()
			})
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.page++
				this.getList()
			}

		},
		onShow() {},
		methods: {
			OnPushEvaluateTeacher() {
				uni.navigateTo({
					url: '/pages/xjl/teacher/evaluatedetail?id=' + this.id
				});
			},
			clickImg(item) {
				wx.previewImage({
					urls: [item], //需要预览的图片http链接列表，多张的时候，url直接写在后面就行了
					current: '', // 当前显示图片的http链接，默认是第一个
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},

			getList() {
				this.$tokenxjlrequest.get(
					'/user/home/getTeacherEvaluate?page_size=20&token='+getstorage('xjltoken')+'&page=' + this
					.page + '&teacher_id=' + this.id).then(res => {
					this.taglist = res.data.tags
					res.data.list.filter(s => {
						s.imgs.filter((i, index) => {
							if (i.substring(23, 68) ==
								'https://oss.dcqcjlb.com') {
								s.imgs[index] = i.substring(23)
							}
						})
					})
					if (res.data.list.length < 20) {
						this.isLoadMore = true
					}
					if (this.page == 1) {
						this.dataList = res.data.list
					} else {
						res.data.list.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx 24rpx 0rpx 24rpx;
		margin: 24rpx;
	}

	.tag-item {
		padding: 8rpx 16rpx;
		border-radius: 298rpx;
		border: 1rpx solid #D91B1B;
		margin-right: 8rpx;
		color: #D91B1B;
		font-size: 20rpx;
		margin-bottom: 24rpx;
	}

	.tag-item-b {
		border-radius: 298rpx;
		border: 1rpx solid #D91B1B;
		padding: 8rpx 16rpx;
		color: #D91B1B;
		font-size: 20rpx;
		margin-top: 16rpx;
		margin-right: 16rpx;
	}

	.btn-bottom {
		position: fixed;
		bottom: 0rpx;
		height: 120rpx;
		background-color: #ffffff;
		width: -webkit-fill-available;
		display: flex;
		justify-content: center;
		padding: 24rpx 48rpx;
	}

	.btn-appraise {
		width: 256rpx;
		height: 88rpx;
		border-radius: 174rpx;
		border: 2rpx solid #D91B1B;
		font-size: 28rpx;
		color: #D91B1B;
		line-height: 88rpx;
		justify-content: center;
		display: flex;
		align-items: center;
	}
</style>
