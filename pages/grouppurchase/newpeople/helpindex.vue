<template>
	<view class="page">
		<u-navbar :autoBack='true' bgColor='' leftText="" title=" " :safeAreaInsetTop="true">
			<view @click="OnGoHome" class="u-nav-slot" slot="left">
				<u-icon name="home" size="22"></u-icon>
			</view>
		</u-navbar>
	<view class="tac" style="margin-top: 246rpx;">
			<image style="border-radius: 10rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679035109531.png">
			</image>
		</view>
		<view class="top-icon" @click.stop='OnPushweb'>
		
		</view>
		<view class="top-text" @click.stop='OnPushweb'>
			<view>
				活动规则
			</view>
			<view style="margin-left: 6rpx;">
				<u-icon name="question-circle" color="#ffffff" size="11"></u-icon>
			</view>
		</view>
		<view class="card">
			<view style="position: relative;">
				<view class="type-icon">
					<view style="width: 48rpx;height: 64rpx;text-align: center;" class="u-flex alc">
						{{dataList.needPersonNum}}人助力
					</view>
				</view>
				<image :src="dataList.coverPicture" style="width: 212rpx;height: 212rpx;"></image>
			</view>
			<view style="margin-left: 25rpx;">
				<view class="moreLine size24" style="width: 418rpx;height: 70rpx;">
					{{dataList.title}}
				</view>
				<view class="u-flex mt20 mb20">
					<view v-for="(item,index) in dataList.tagNamesList" class="tagname" :key="index"
						style="margin-left: 16rpx;" :class="{'marginleft0':index==0}">
						<view>{{item}}</view>
					</view>
				</view>
				<view class="mainRed size24">
					￥<text class="fwb" style="font-size: 40rpx;">{{ dataList.bankCardPrice ? dataList.bankCardPrice :dataList.flashSalePrice}}</text>
				</view>
			</view>
		</view>
		  
		  <view style="margin: 25rpx;" @click="Onassist" v-if="!isshow">
			  <image style="width: 700rpx;height: 367rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679049824564.png">
				  
			  </image>
		  </view>
		  <view class="tac" @click="OnPushreturn" v-else>
			  <image style="width: 281rpx;height: 84rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230318/file_1679100068600.png"></image>
		  </view>
		  <view style="height: 50rpx;">
		  	
		  </view>
	</view>
</template>

<script>
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
		userInitiateAssistId:0,
		dataList:{},
		num:0,
		isshow:false
			}
		},

		onLoad(option) {
			// tologin()
					this.userInitiateAssistId = option.userInitiateAssistId
					this.getList()
		},
		onShow() {
			this.getList()
		},
		methods: {
			OnGoHome(){
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnPushweb(){
				uni.navigateTo({
					url: '/pages/activity/GoPdf/webview?url=https://h5.dcqcjlb.com/protocol/activity_rules.html' 
				})
			},
			OnPushreturn(){
				uni.navigateTo({
					url: '/pages/grouppurchase/newpeople/index'
				})
			},
			Onassist(){
				if (tologin() !== true) {
					return
				}
				this.$request.post("/coc-active/api/v1/group/isNewPerson",{
					type:2
				}).then(res=>{
					if(res.data.type==1){
						this.next()
					}else{
						uni.showToast({
							icon: 'none',
							title: '新用户才可以帮忙助力哦~',
						});
					}
				})
				
				
			
			},
			next(){
				this.$request.post("/coc-active/api/v1/group/assist",{
					id:this.userInitiateAssistId
				}).then(res=>{
					if(res.code==200){
						uni.showToast({
							icon: 'none',
							title: '助力成功'
						});
						this.isshow=true
					}else{
					uni.showToast({
						icon: 'none',
						title: res.message,
					});
					}
				})
			},
			getList() {
				this.$request.get("/coc-active/api/v1/group/getAssistDetails/" + this.userInitiateAssistId).then(res => {
					this.num = res.data.needPersonNum - res.data.assistPersonNum
					this.dataList = res.data
				})
		}
	},
	}
</script>

<style lang="scss">
page {
		background-color: #FFE1E1;
	}
.card {
		margin: 25rpx;
		background: #FFFFFF;
		border-radius: 40rpx;
		padding: 25rpx;
		display: flex;
	}
	.type-icon {
		position: absolute;
		top: 0rpx;
		width: 59rpx;
		height: 64rpx;
		background-color: #D91B1B;
		border-radius: 10rpx;
		font-size: 20rpx;
		display: flex;
		justify-content: center;
		color: #ffffff;
		left: 12rpx;
	}
	.tagname{
		padding:9rpx 18rpx;
		background-color: #fceded;
		color: #D91B1B;
		font-size: 20rpx;
		border-radius: 10rpx;
	}
	.top-icon{
		width: 152rpx;
		height: 40rpx;
		background: #000000;
		opacity: 0.2;
		top: 250rpx;
		z-index: 9999;
		right: 0rpx;
		border-radius: 10rpx;
		position: absolute;
	}
	.top-text{
		font-size: 24rpx;
		color: #ffffff;
		position: absolute;
		top: 254rpx;
		right: 25rpx;
		z-index: 99999;
		display: flex;
		align-items: center;
	}
</style>
