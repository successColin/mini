<template>
	<view class="page">
	<!-- 首页搜索 -->
		<view style="margin:28rpx 20rpx 28rpx 20rpx" class="u-flex">
			<view style="width: 640rpx;">
				<u-search @custom="tosearch" :showAction="true" actionText="搜索" :clearabled="true" @clear='clear'
					v-model="keyword" @search='tosearch' placeholder="搜索感兴趣的活动"></u-search>
			</view>
			<view style="margin-left: 20rpx;margin-top: -4rpx;height: 64rpx;">
				<view class="u-flex">
					<button open-type='contact' session-from='' class="kefu-contact">
						<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
					</button>
				</view>
			</view>
		</view>
		<!-- 宣传活动图片 -->
		<view style="margin-left: 20rpx;margin-right: 20rpx;">
			<carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
				:systemCode="systemCode" :indicatorType="3"></carousel>
			</view>
		<view style="margin: 25rpx;">
			<view v-for="(item,index) in dataList" :key="index" style="margin-top: 47rpx;" @click="OnPushDetail(item)">
				<view class="coverPicture"
					:style="{backgroundImage: 'url('+item.coverPicture+')',backgroundSize: 'cover'}">
					<view
						style="line-height:52rpx ;font-size: 24rpx;color: #ffffff;padding-left: 14rpx;border-radius: 0rpx 24rpx 28rpx 0rpx;position: absolute;top: 30rpx;padding-right:20rpx;height: 52rpx;background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)"
						v-if="item.activitySignUpStatus==1||item.activitySignUpStatus==2">
						<text v-if="item.activitySignUpStatus==2" style="margin-right: 14rpx;">报名截止时间</text>
						<text style="margin-right: 14rpx;"
							v-if="item.activitySignUpStatus==1">报名开启时间</text>{{item.activitySignUpStatus==2?item.activityEndTime:item.activityBeginTime}}
					</view>
		
					<view v-if="item.activitySignUpStatus==1||item.activitySignUpStatus==2" class="backimg">
						<view style="font-size: 24rpx;color: #ffffff">
							{{item.districtName}}
						</view>
					</view>
					<view style="position: absolute;left: 260rpx;top:110rpx ;" v-if="item.activitySignUpStatus==1">
						<image src="@/static/image/huodongyugao.png" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view style="position: absolute;left: 260rpx;top:110rpx ;"
						v-if="item.activitySignUpStatus==3||item.activitySignUpStatus==5||item.activitySignUpStatus==4">
						<image src="@/static/image/jieshu.png" style="width: 180rpx;height: 180rpx;"></image>
					</view>
					<view style="position: absolute;bottom: 24rpx;right: 27rpx;" v-if="item.activitySignUpStatus==2">
						<view class="btn">报名中</view>
					</view>
				</view>
				<view class="title">
					{{item.title}}
				</view>
				<view class="item-detail">
					<view v-if="item.payType==2">
						<text style="color: #D91B1B;font-size: 24rpx;">
							¥
						</text>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
							{{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice}}
						</text>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							原价¥{{item.marketPrice}}
						</text>
					</view>
					<view v-else>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
							免费
						</text>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							原价¥{{item.marketPrice}}
						</text>
					</view>
					<view @click.stop="Onremind(item,index)" class="remind" v-if="item.activitySignUpStatus==1"
						:class="{'Asreminder':item.isRemind==1}">
						提醒我
					</view>
					<view class="headPortraits" v-else>
						<view style="margin-right: 16rpx;">
							已报名<text style="margin-left: 9rpx;">{{item.saleNum}}/{{item.stock}}</text>
						</view>
						<view style="padding-right: 4rpx;" v-for="(item1,index1) in item.headPortraits" :key="index1">
							<u-avatar size="40rpx" :src="item1"></u-avatar>
						</view>
						<view v-if="item.saleNum>3">
							<u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
						</view>
					</view>
		
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	import {
		shareMixin
	} from "@/mixin/share.js"
	import carousel from "@/components/carousel/index.vue"
	import {
		tologin
	} from '@/utils/index.js'
	export default {
		mixins: [shareMixin],
		components: {
		carousel,
		},
		data() {
			return {
				dataList:[],
				keyword:'',
		systemCode:'applets_zone_one',
		type:1,
		title:''
			}
		},

		onLoad(option) {
			if(option.type==1){
				this.systemCode='applets_zone_one'
				this.type=1
				this.shareConfig(13)
			}else if (option.type==2){
				this.systemCode='applets_zone_two'
				this.type=2
				this.shareConfig(14)
			}
			this.getList()
		},
		computed: {
		
		},
		onShow() {
			
				
		},
		methods: {
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			Onremind(item, index) {
				tologin()
				let _this = this
				if (item.isRemind == 1) {
					return false
				}
					uni.requestSubscribeMessage({
						tmplIds: [
							'jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'
						],
						success(res) {
							if (res['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'] == 'accept') {
						
								_this.$request.get("/coc-active/api/v1/activity/signUpStartRemind/" + item
									.activityId).then(s => {
								
									if (s.code == 200) {
										this.dataList[index].isRemind = 1
										uni.showToast({
											icon: 'none',
											title: '提醒成功，请等待通知',
										});
									} else {
										uni.showToast({
											icon: 'none',
											title: s.message,
										});
									}
								})
							}
						}
					})
			},
			clear() {
				this.keyword = ''
				this.title = ''
				this.getList()
			},
			tosearch(value) {
				this.title = value
				this.getList()
			},
			getList(){
			this.$request.post("/coc-active/api/v2/homePage/getActivitysByZone",{
				current:1,
				size:99,
				shopTypeId:0,
				title:this.title,
				zone:this.type
			}).then(res=>{
				this.dataList = res.data.records
			})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
.kefu-contact {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
	}

	button::after {
		border: initial;
	}
	.coverPicture {
		width: 700rpx;
		height: 400rpx;
		border-radius: 10rpx;
		position: relative;
	}
	.backimg {
		position: absolute;
		bottom: 18rpx;
		left: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: rgb(34 34 34 / 0.5);
		background-color: rgba(34,34,34,0.5);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		width: 120rpx;
		height: 52rpx;
	}
	.btn {
		width: 120rpx;
		height: 52rpx;
		text-align: center;
		background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		line-height: 52rpx;
		color: #ffffff;
	}
	.title {
		margin-top: 35rpx;
		font-size: 28rpx;
		width: 603rpx;
		margin-left: 25rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.item-detail {
		display: flex;
		justify-content: space-between;
		margin-top: 22rpx;
		align-items: center;
		margin-left: 25rpx;
		margin-right: 26rpx;
	}
	.remind {
		width: 160rpx;
		height: 52rpx;
		border-radius: 26rpx;
		color: #ffffff;
		font-size: 28rpx;
		text-align: center;
		background: #D91B1B;
		line-height: 52rpx;
	}
	
	.headPortraits {
		display: flex;
		align-items: center;
		font-size: 24rpx;
	}
	
	.Asreminder {
		background-color: #999999;
	}
</style>
