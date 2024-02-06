<template>
	<view class="page">
		<view class="top-fixed">
			<view style="margin: 25rpx;">
				<u-search @search='Onsearch' :showAction='false' placeholder="搜索活动名称" v-model="title"></u-search>
			</view>
			<view class="select">
				<view class="u-flex-al" @click="openSearch(1)">
					<view class="text ellipsis">{{leftbox}}</view>
					<view style="margin-left: 15rpx;">
						<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
					</view>
				</view>
				<view class="u-flex-al" @click="openSearch(2)" style="justify-content: flex-end;margin-left: 20rpx;">
					<view class="text ellipsis">
						{{rightbox}}
					</view>
					<view style="margin-left: 15rpx;">
						<u-icon name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
					</view>
				</view>
			</view>
		</view>
	
		
		<view style="margin: 25rpx;margin-top: 210rpx;">
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
					
					
					<view style="position: absolute;bottom: 24rpx;right: 27rpx;" >
						<view class="btn" v-if="item.activitySignUpStatus==1">未开始</view>
						<view class="btn" v-if="item.activitySignUpStatus==2">报名中</view>
						<view class="btn" v-if="item.activitySignUpStatus==3">报名结束</view>
						<view class="btn" v-if="item.activitySignUpStatus==4">活动中</view>
						<view class="btn" v-if="item.activitySignUpStatus==5">活动结束</view>
				
						
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
							{{item.flashSalePrice}}
						</text>
						<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
							<view class="u-flex" v-if="isExpert==1&&token&&item.maxCommissionPrice">
								<view  class="u-flex">
									<view class="rebate-img rebate-size"></view>
								</view>
								<view  class="rebate-style" style="margin-right: 24rpx;">
							{{item.maxCommissionPrice}}
								</view>
							</view>
						</view>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							¥{{item.marketPrice}}
						</text>
					</view>
					<view v-else>
						<text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
							免费
						</text>
						<view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
							<view class="u-flex" v-if="isExpert==1&&token&&item.maxCommissionPrice">
								<view  class="u-flex">
									<view class="rebate-img rebate-size"></view>
								</view>
								<view  class="rebate-style" style="margin-right: 24rpx;">
									{{item.maxCommissionPrice}}
								</view>
							</view>
						</view>
						<text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
							¥{{item.marketPrice}}
						</text>
					</view>
					<view @click.stop="OnAdd(item)" class="remind"
						>
						添加
					</view>
				
		
				</view>
			</view>
			</view>
	<!-- 	<view
			style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
			我到底啦~
		</view> -->
		<view v-if="isshow" @click="OnPushClose">
		 <view style="font-size: 24rpx;color: #999999;text-align: center;">
		 	点击查看往期精彩活动
		 </view>
		 <view style="text-align: center;margin-top: 37rpx;">
		 	<image style="width: 38rpx;height: 47rpx;" src="../static/image/jiazai.gif"></image>
		 </view>
		</view>
		<view style="height: 50rpx;"></view>
		<u-popup :show="isshowpop" @close="closepop" mode="top">
			<view class="select">
				<view class="u-flex-al" @click="Onchangeindex(1)">
					<view class="text ellipsis" :class="{'mainRed':index==1}">{{leftbox}}</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==1" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" size="16rpx" color="#666666"></u-icon>
					</view>
				</view>
				<view class="u-flex-al" style="justify-content: flex-end;margin-left: 20rpx;" @click="Onchangeindex(2)">
					<view class="text ellipsis" :class="{'mainRed':index==2}">
						{{rightbox}}
					</view>
					<view style="margin-left: 15rpx;">
						<u-icon v-if="index==2" name="arrow-down-fill" color="#D91B1B" size="16rpx"></u-icon>
						<u-icon v-else name="arrow-down-fill" color="#666666" size="16rpx"></u-icon>
					</view>
				</view>
			</view>
			<view v-if="index==1" class="u-flex" style="margin: 25rpx;flex-wrap: wrap;">
				<view v-for="(item,index) in categoryList" :key="item.id" class="left-stype"
					:class="{'currenttag':item.id==categoryId}" @click="Onleft(item)">
					{{item.categoryName}}
				</view>

			</view>
			<view v-if="index==2" class="u-flex" style="margin: 25rpx;flex-wrap: wrap;">
				<view v-for="(item,index) in typeList" :key="item.id" class="left-stype"
					:class="{'currenttag':item.id==type}" @click="Onright(item)">
					{{item.title}}
				</view>

			</view>
		</u-popup>
	</view>
</template>

<script>

	export default {
		components: {

		},
		data() {
			return {
				istwo:false,
				isshow:false,
				isnext:false,
				type: null,
				index: null,
				isshowpop: false,
				rightbox: '支付优惠',
				leftbox: '活动分类',
				categoryList: [],
				categoryId: null,
				dataList: [],
				title: '',
				current: 1,
				isLoadMore: false,
				token:null,
				isExpert: null,
				typeList: [{
						id: null,
						title: '全部'
					},
					{
						id: 6,
						title: '工行优惠'
					},
					{
						id: 5,
						title: '农行优惠'
					},
					{
						id: 4,
						title: '人保优惠'
					}
				]
			}
		},

		onLoad() {
			this.token=uni.getStorageSync('token')
			this.isExpert =  uni.getStorageSync('isExpert')
			this.getcategoryId()
			this.getList()
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}
		
			if(!this.isnext&&this.istwo){
				this.current++
				this.getendList()
			}

		},
		onShow() {},
		methods: {
			OnPushClose() {
			       
				this.isshow=false
				this.istwo=true
				this.current=1
				this.getendList()
			},
			OnAdd(item){
				uni.navigateBack({
					delta: 1
				});
				uni.$emit('chooseactivity', item)
			},
			OnPushDetail(item) {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + item.activityId
				})
			},
			Onright(item) {
				this.current = 1
				this.type = item.id
				this.getList()
				if (item.id == 1) {
					this.rightbox = '支付优惠'
				} else {
					this.rightbox = item.title
				}
			},
			Onleft(item) {
				this.current = 1
				this.categoryId = item.id
				this.getList()
				if (item.id == null) {
					this.leftbox = '活动分类'
				} else {
					this.leftbox = item.categoryName
				}
			},
			Onchangeindex(index) {
				this.index = index
			},
			closepop() {
				this.isshowpop = false
			},
			openSearch(index) {
				this.isshowpop = true
				this.index = index
			},
			Onsearch() {
				this.current = 1
				this.dataList=[]
				if(!this.title){
				this.getList()
					return false
				}else{
					this.getAll()
				}
			
			},
			getcategoryId() {
				this.$newrequest.post("/coc-system/api/v1/system/category/tag/list", {
					status: 1
				}).then(res => {
					res.data.unshift({
						categoryName: '全部',
						id: null
					})
					this.categoryList = res.data
				})
			},
			getall2(){
				this.$request.post("/coc-active/api/v2/homePage/getActivitysV2", {
						activityPaymentPreferenceId: this.type,
						current: this.current,
						isEnd: 2,
						isStart: 2,
						newUserLimit: 0,
						payType: 0,
						shopTypeId: 0,
						size: 99,
						title: this.title,
						shopId: null,
						categoryId: this.categoryId,
					
				}).then(res=>{
				
					res.data.homePageActivitysVOIPage.records.filter(i => {
						this.dataList.push(i)
					})
				})
			},
			getAll(){
				this.$request.post("/coc-active/api/v2/homePage/getActivitysV2", {
					activityPaymentPreferenceId: this.type,
					current: this.current,
					isEnd: 1,
					isStart: 2,
					newUserLimit: 0,
					payType: 0,
					shopTypeId: 0,
					size: 99,
					title: this.title,
					shopId: null,
					categoryId: this.categoryId,
				}).then(res=>{
					res.data.homePageActivitysVOIPage.records.filter(s => {
						this.dataList.push(s)
					})
					this.getall2()
				})
			},
			getendList(){
				this.$request.post("/coc-active/api/v2/homePage/getActivitysV2", {
					activityPaymentPreferenceId: this.type,
					current: this.current,
					isEnd: 2,
					isStart: 2,
					newUserLimit: 0,
					payType: 0,
					shopTypeId: 0,
					size: 20,
					title: this.title,
					shopId: null,
					categoryId: this.categoryId,
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isnext = true
					}
					res.data.homePageActivitysVOIPage.records.filter(s => {
						this.dataList.push(s)
					})
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v2/homePage/getActivitysV2", {
					activityPaymentPreferenceId: this.type,
					current: this.current,
					isEnd: 1,
					isStart: 2,
					newUserLimit: 0,
					payType: 0,
					shopTypeId: 0,
					size: 20,
					title: this.title,
					shopId: null,
					categoryId: this.categoryId,
				}).then(res => {
					if (res.data.homePageActivitysVOIPage.records.length < 20) {
						this.isLoadMore = true
						this.isshow=true
					}
					if (this.current == 1) {
						this.dataList = res.data.homePageActivitysVOIPage.records
					} else {
						res.data.homePageActivitysVOIPage.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.select {
		display: flex;
		align-items: center;
		justify-content: space-around;
		margin: 25rpx;
		margin-top: 31rpx;

		.text {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
		}
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}

	.left-stype {
		margin-right: 25rpx;
		font-size: 24rpx;
		color: #222222;
		background: #F8F8F8;
		padding: 8rpx 40rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
	}

	.currenttag {
		color: #D91B1B;
		background-color: #FFF1F1;
	}

	.preferentialpng {
		position: absolute;
	}

	.price-inpng {

		text-align: center;
		position: relative;
		top: 64rpx;
		right: 4rpx;
	}

	.buy-btn {
		margin-top: 16rpx;
		width: 107rpx;
		height: 40rpx;
		background: #D91B1B;
		border-radius: 20rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
	}
	.coverPicture {
		width: 700rpx;
		height: 400rpx;
		border-radius: 10rpx;
		position: relative;
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
	
	.activity-img {
		margin-top: 20rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		width: 710rpx;
	}
	
	.currenttab {
		color: #d91b1b;
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
	.backimg {
		position: absolute;
		bottom: 18rpx;
		left: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		// background-color: rgb(34 34 34 / 0.5);
		background-color: rgba(34, 34, 34, 0.5);
		border-radius: 25rpx 25rpx 27rpx 25rpx;
		width: 120rpx;
		height: 52rpx;
	}
	.top-fixed{
		    position: fixed;
		    top: 0rpx;
		    z-index: 999;
		    background-color: #ffffff;
		    width: 100%;
		    top: -10rpx;
	}
</style>
