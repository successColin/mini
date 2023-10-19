<template>
	<view class="page">
		<view class="top" @click="Onreturndefault">
			<view>51车小晶灵系统自动推荐</view>
			<view>
				<image style="width: 48rpx;height: 48rpx;" src="../static/image/xuanzhonglvse.svg"></image>
			</view>
		</view>
		<view style="height:124rpx ;"></view>
		<view class="mt20">
			<u-search :showAction='false' placeholder="搜索教练" inputAlign="center" v-model="search" @search='Onsearch'>
			</u-search>
		</view>
		<view class="card">
			<view v-for="(item,index) in dataList" :key="item.id"  @click="OnChoosecoach(item)">
				<view class="u-flex alc">
					<view>
						<u-avatar size="48" :src="item.head_img"></u-avatar>
					</view>
					<view style="margin-left: 16rpx;">
						<view class="size28 fwb">{{item.name}}</view>
						<view class="size28 txtLighGray">
							{{item.teach_age}}年教龄｜{{item.student_num}}名学员
						</view>
					</view>
				</view>
			<view>
				<u-divider :text="null"></u-divider>
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
				school_id: '',
				search: '',
				page: 1,
				isLoadMore: false,
				dataList: []
			}
		},

		onLoad(option) {
			this.school_id = option.id
			this.getList()
			let _this = this
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
			OnChoosecoach(item){
				uni.navigateBack({
					delta: 1
				});
					uni.$emit('getcoach',{teacher_id:item.id,coachtext:item.name})
			},
			Onsearch() {
				this.page = 1
				this.getList()
			},
			Onreturndefault(){
				uni.navigateBack({
					delta: 1
				});
				uni.$emit('getcoach',{teacher_id:'0',coachtext:'由51小晶灵系统自动推荐'})
			},
			getList() {
				this.$tokenxjlrequest.get('/user/home/new_teacher_lists?lng=' + getstorage('lng') + '&lat=' + getstorage(
						'lat') + '&type=1&search=' + this.search +
					'&token='+getstorage('xjltoken')+'&page_size=20' +
					'&school_id=' + this.school_id + '&page=' + this.page).then(res => {
					if (res.data.length < 20) {
						this.isLoadMore = true
					}
					if (this.page == 1) {
						this.dataList = res.data
					} else {
						res.data.filter(s => {
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

	.top {
		position: fixed;
		top: 0rpx;
		background: #FFFFFF;
		width: 100%;
	z-index: 999;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28rpx 24rpx;
		width: -webkit-fill-available;
	}
	.card{
		margin: 24rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	
	}
</style>
