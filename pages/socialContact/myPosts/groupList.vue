<template>
	<view class="page">
		<view style="margin: 25rpx;">
			<u-search @search='Onsearch' :showAction='false' placeholder="搜索商家/团购名称" v-model="title"></u-search>
		</view>
		<view class="select">
			<!-- <view class="u-flex-al" style="align-items:center;"> -->
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
		<view v-if="dataList.length>0">
			<view v-for="(item,index) in dataList" :key="item.id" @click="OnPushDetail(item)">
				<view class="card" >
					<view class="card-name">
						<view class="u-flex alc">
							<view class="u-flex alc">
								<image
									src="https://oss.dcqcjlb.com/51che_java_dev/20230503/file_1683103775283.png"
									style="width: 30rpx;height: 30rpx;"></image>
							</view>
							<view class="size28 ml10">
								{{item.baseName}}
							</view>
						</view>
						<view class="txtLighGray">
							{{item.distanceMsg}}
						</view>
					</view>
					<!-- 详情 -->
					<view class="u-flex jsb mt20">
						<view style="position: relative;">
							<image style="border-radius: 10rpx;width: 212rpx;height: 212rpx;" :src="item.coverPicture">
							</image>
							<view class="fanyong" v-if="isExpert==1&&token&&item.maxCommissionPrice">
								<view class="u-flex" >
									<view  class="u-flex">
										<view class="rebate-img rebate-size"></view>
									</view>
									<view  class="rebate-style" style="margin-right: 24rpx;">
										{{item.minCommissionPrice}}
									</view>
								</view>
							</view>
						</view>

						<view style="margin-left: 25rpx;">
							<view class="moreLine size24" style="width: 418rpx;">
								{{item.title}}
							</view>
							<view class="mt10 flex alc">
								<view style="width: 280rpx;">
									<u-line-progress :showText='false' :percentage="(100-item.percentage)"
										inactiveColor="#fceded" activeColor="#D91B1B">
									</u-line-progress>
								</view>
								<view class="ml10 size24 txtLighGray">剩余{{100-item.percentage}}%
								</view>
							</view>
							<view class="preferentialpng">
								<image
									src="https://oss.dcqcjlb.com/51che_java_dev/20230503/file_1683103698121.png"
									style="width: 418rpx;height: 125rpx;"></image>
							</view>
							<view v-if="item.bankCardPrice" class="size24 fwb txtColorWhite price-inpng">
								{{item.marketPrice-item.bankCardPrice}}</view>
							<view v-else class="size24 fwb txtColorWhite price-inpng">{{item.saveMoney}}</view>
							<view class="u-flex alc jsb" style="margin-top: 30rpx;position: relative;">
								<view>
									<view class="size24 txtLighGray" style="text-decoration: line-through;">
										¥{{item.marketPrice}}
									</view>
									<view class="mainRed u-flex" style="margin-top: 10rpx;">
										<view class="u-flex" style="align-items: flex-end;margin-bottom: 6rpx;">
											<view class="font20">¥</view>
										</view>
										<view class="u-flex alc">
											<view v-if="item.bankCardPrice" style="font-size: 40rpx;margin-left: 6rpx;"
												class="fwb">{{item.bankCardPrice}}</view>
											<view v-else style="font-size: 40rpx;margin-left: 6rpx;" class="fwb">
												{{item.flashSalePrice}}</view>
										</view>
									</view>
								</view>

								<view class="buy-btn" @click.stop="Onreturn(item)">
										添加
								</view>
							</view>
						</view>

					</view>
				</view>
			</view>
			<view
				style="font-size: 24rpx;color:#999999;text-align: center;margin-top: 80rpx;">
				我到底啦~
			</view>
			<view style="height: 50rpx;"></view>
		</view>
		<view v-else-if="dataList.length==0" class="tac mt20">
			<image style="width: 269rpx;height: 232rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230503/file_1683103740289.png">
			</image>
			<view class="mt20 tac size24 txtLighGray">暂无团购</view>
		</view>
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
				<view v-for="(item,index) in classifyList" :key="item.id" class="left-stype"
					:class="{'currenttag':item.id==classify}" @click="Onleft(item)">
					{{item.title}}
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
				dataList: [],
				index: 1,
				leftbox: '团购分类',
				rightbox: '支付优惠',
				classifyList: [],
				isshowpop: false,
				title: '',
				classify: null,
				current: 1,
				type: 1,
				isLoadMore: false,
				token:null,
				isExpert: null,
				typeList: [{
						id: 1,
						title: '全部'
					},
					{
						id: 2,
						title: '工行信用卡满减'
					},
					{
						id: 3,
						title: '农行信用卡满减'
					}
				]
			}
		},

		onLoad() {
			this.token=uni.getStorageSync('token')
			this.isExpert =  uni.getStorageSync('isExpert')
			this.getbaseinfo()
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
			OnPushDetail(item){
				uni.navigateTo({
				     url: '/pages/grouppurchase/detail?id='+item.id
				    })
			},
			Onreturn(item){
				uni.navigateBack({
					delta: 1
				});
				uni.$emit('choosegroup', item)
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
				this.classify = item.id
				this.getList()
				if (item.id == null) {
					this.leftbox = '团购分类'
				} else {
					this.leftbox = item.title
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
			getbaseinfo() {
				this.$newrequest.post('coc-system/api/v1/system/base_info/list', {
					type: 4
				}).then(res => {
					res.data.unshift({
						id: null,
						title: '全部'
					})
					this.classifyList = res.data
				})
			},
			Onsearch() {
				this.current = 1
				this.getList()
			},
			getList() {
				this.$request.post("/coc-social/api/v1/article/groupQuote", {
					classify: this.classify,
					current: this.current,
					searchKeyword: this.title,
					size: 20,
					type: this.type
				}).then(res => {
					if (res.data.length < 20) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.dataList = res.data.records
					} else {
						res.data.records.filter(s => {
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
		width: 100rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 20rpx;
		line-height: 70rpx;
		text-align: center;
		font-size: 24rpx;
		color: #FFFFFF;
		position: absolute;
		right: 25rpx;
	}

	

	.card {
		padding-top: 24rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin: 16rpx 25rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 24rpx;
		position: relative;
	}

	.card-name {
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx #e3e3e3 solid;
		padding-bottom: 25rpx;
	}
	.fanyong{
		position: absolute;
		top: 0rpx;
	}
</style>
