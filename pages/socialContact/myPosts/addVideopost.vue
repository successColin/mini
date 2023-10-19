<template>
	<view class="page">
	
		
		<view style="margin-top: 30rpx;">
			<u--input fontSize='20' maxlength='14' v-model="dataList.title" placeholder="填写标题" border="none" clearable>
			</u--input>
		</view>
		<view style="margin-bottom: -18rpx;">
			<u-divider :text="null"></u-divider>
		</view>

		<view style="margin-left: -18rpx;margin-top: -18prx;">
			<u--textarea :customStyle="{backgroundColor:'#f8f8f8'}" maxlength='-1' border='none'
				v-model="dataList.content" placeholder="添加正文笔记容易获得更多点赞哦">
			</u--textarea>
		</view>
		<video style="width: 300rpx;height: 400rpx;"  :src="fileList1[0].url"></video>
	<view class="u-flex" v-if="isshow" style="margin-top: 100rpx;">
		<view class="add-btn" @click="OnPushGroup">
			<view>
				<u-icon :bold='true' color="#D91B1B" size="12" name="plus"></u-icon>
			</view>
			<view style="margin-left: 9rpx;">添加团购</view>
		</view>
		<view class="add-btn" style="margin-left: 24rpx;" @click="OnPushActivity">
			<view>
				<u-icon :bold='true' color="#D91B1B" size="12" name="plus"></u-icon>
			</view>
			<view style="margin-left: 9rpx;">添加活动</view>
		</view>
		<view class="add-btn" style="margin-left: 24rpx;" @click="OnPushshopList">
			<view>
				<u-icon :bold='true' color="#D91B1B" size="12" name="plus"></u-icon>
			</view>
			<view style="margin-left: 9rpx;">添加商家</view>
		</view>
	</view>
	<view v-else>
		<view class="choosed" @click="OnAgain">
				<view>已添加:<text v-if="type==1">{{grouptitle}}</text><text v-else-if="type==2">{{activitytitle}}</text><text v-else-if="type==3">{{shoptitle}}</text>
				</view>
			<view>
				<u-icon name="arrow-right" size="12" color="#999999"></u-icon>
			</view>
		</view>
	</view>
		<view class="release">
			<text @click="OnSend">发布帖子</text>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-loading-page :loading="showload"></u-loading-page>
		<view>
			<cardauthentication :showpop='showpop'></cardauthentication>
		</view>
	</view>
</template>

<script>
	import cardauthentication from '@/components/cardauthentication.vue'
	export default {
		components: {
cardauthentication
		},
		data() {
			return {
				shoptitle: '',
				shopid: '',
				showpop:false,
				activityid:null,
				activitytitle:'',
				groupid: null,
				grouptitle: '',
				type: null,
				isshow: true,
				istrue: true,
				showload: false,
				dataList: {
					title: '',
					content: '',
					showType: '1',
					imgs: [],
					isInsertVote: 0,
					votesTitle: '',
					duration: '',
				},
				fileList1: [
				],
			}
		},
		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendinfo', function(data) {
					_this.fileList1.push({
						url: data.data,
						status: 'success',
						message: ''
				})
			
			})
			uni.$on('closepop', res => {
			_this.showpop=false
			})
			uni.$on('choosegroup', res => {
				_this.type = 1
				_this.grouptitle = res.title
				_this.groupid = res.id
				_this.isshow = false
			})
			uni.$on('chooseactivity', res => {
				console.log(res)
				_this.type = 2
				_this.activitytitle = res.title
				_this.activityid = res.activityId
				_this.isshow = false
			})
			uni.$on('chooseshop', res => {
				_this.type = 3
				_this.shoptitle = res.baseName
				_this.shopid = res.id
				_this.isshow = false
			})
		},
		onShow() {},
		methods: {
			OnPushshopList(){
				uni.navigateTo({
					url: '/pages/socialContact/myPosts/shoplist'
				})
			},
			OnAgain() {
				if (this.type == 1) {
					uni.navigateTo({
						url: '/pages/socialContact/myPosts/groupList'
					})
				}
				else if (this.type == 3) {
					uni.navigateTo({
						url: '/pages/socialContact/myPosts/shoplist'
					})
				}
				else{
					uni.navigateTo({
						url: '/pages/socialContact/myPosts/activityList'
					})
				}
			},
			OnPushActivity(){
				uni.navigateTo({
					url: '/pages/socialContact/myPosts/activityList'
				})
			},
			OnPushGroup() {
				uni.navigateTo({
					url: '/pages/socialContact/myPosts/groupList'
				})
			},
			save() {
				if(this.type==1){
					this.dataList.citeId=this.groupid
					this.dataList.citeType=1
				}else if (this.type==2){
					this.dataList.citeId=this.activityid
					this.dataList.citeType=2
				} else if (this.type == 3) {
					this.dataList.citeShopId = this.shopid
				}
					this.showload = true
				this.dataList.video = this.fileList1[0].url
				this.$request.post('/coc-social/api/v1/article/addArticle', this.dataList).then(res => {
					if (res.code == 200) {
						this.showload = false
						this.$refs.uToast.show({
							message: "发布成功",
							type: "success",
							complete() {
							uni.redirectTo({
								url: '/pages/activity/activityRegistration/playfulperson?'
							})
							}
						});
					} else {
						this.showload = false
						this.$refs.uToast.show({
							message: res.message,
							type: "error",

						});
					}
				})
			},
	
			OnSend() {
		
		if(uni.getStorageSync('isCertify')!=1){
			this.showpop=true
			return false
		}
				if (!this.dataList.title) {
					this.$refs.uToast.show({
						message: '请填写标题',
					});
					return false
				}
				 this.save()
			},
			OnChoose(index) {
				this.dataList.showType = index
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			async afterRead(event) {
				let lists = [].concat(event.file)
				lists.map((item, i) => {
					this.fileList1.push({
						url: item.url,
						status: 'success',
						message: ''
					})
				})

			},
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 24rpx;
	}

	.show-type {
		display: flex;
	}

	.visible-person {
		background: #ffffff;
		border-radius: 28rpx;
		font-size: 24rpx;
		padding: 13rpx 18rpx;
	}

	.choose-type {
		background-color: #FFF3F3;
		color: #D91B1B;
	}

	.release {
		position: fixed;
		bottom: 120rpx;
		left: 50%;
		margin-left: -272rpx;

		text {
			background-color: #d91b1b;
			border-radius: 44rpx;
			font-size: 36rpx;
			color: #ffffff;
			padding: 20rpx 200rpx;
		}
	}
	
	.release {
		position: fixed;
		bottom: 120rpx;
		left: 50%;
		margin-left: -272rpx;
	
		text {
			background-color: #d91b1b;
			border-radius: 44rpx;
			font-size: 36rpx;
			color: #ffffff;
			padding: 20rpx 200rpx;
		}
	}
	
	.add-btn {
		display: flex;
		align-items: center;
		background: #FFF3F3;
		border: 1rpx solid #D91B1B;
		border-radius: 27rpx;
		color: #D91B1B;
		size: 24rpx;
		width: 180rpx;
		height: 54rpx;
		justify-content: center;
	}
	
	.choosed {
		align-items: center;
		padding: 16rpx 24rpx;
		margin-top: 100rpx;
		background: #ebebeb;
		border-radius: 10rpx;
		size: 24rpx;
		color: #999999;
		display: flex;
		justify-content: space-between;
	}
</style>
