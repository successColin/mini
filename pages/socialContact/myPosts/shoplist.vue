<template>
	<view class="page">
		<view style="margin:0rpx 20rpx 28rpx 20rpx;margin-bottom: -10rpx;" class="u-flex">
			<view style="width: 640rpx;">

				<u-search placeholder="搜索商家名称,如乐园" :clearabled="true" v-model="keyword" :showAction="false"
					@search='tosearch()'></u-search>
			</view>
			<view style="margin-left: 20rpx;margin-top: -4rpx">
				<view class="u-flex">
					<button open-type='contact' class="kefu-contact">
						<image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
					</button>
				</view>
			</view>
		</view>
		
		<view v-for="(item,index) in dataList" :key="item.id" class="card-list"  @click="OnAdd(item)">
			<view class="flex alc">
				<view>
					<view>
						<image style="width: 200rpx;height: 200rpx;border-radius: 10rpx;" :src="item.baseHead"></image>
					</view>
				</view>
		
				<view class="ml20">
					<view class="size32 fwb">{{item.baseName}}</view>
					<view v-if="item.shopFeature" class="size24 txtLighGray mt10">{{item.shopFeature}}</view>
					<view class="flex mt10 jsb alc" style="width: 450rpx;">
						<view>
							<u-rate gutter='0' :readonly='true' active-color="#FCCA00" count="5"
								v-model="item.star"></u-rate>
						</view>
						<view>
							<view class="size24 txtLighGray" style="margin-right: 25rpx;">
								{{item.distanceMsg}}
							</view>
						</view>
					</view>
					<view v-if="item.baoType==0&&item.tuanType==0&&item.quanType==0" class="flex size24"
						style="margin-top: 10rpx;">

					</view>
					<view v-else class="flex mt10" style="margin-left: -8rpx;">
						<view v-if="item.baoType==1" class="tag-item">活动承办</view>
						<view v-if="item.tuanType==1||item.quanType==1" class="tag-item">团购优惠</view>
						<view v-if="item.baoType==1&&item.scoreType==1" class="tag-item">积分兑换</view>
						<view v-if="item.bankType==1" class="tag-item">信用卡满减</view>
					</view>
				</view>
			</view>
			<view style="height: 20rpx;"></view>
			<view v-if="item.baoType==1" class="flex size24 alc mb10">
				<view class="bao-item">报</view>
				<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePriceBao }}</view>
				<view class="txtLighGray txtls ml10">￥{{item.marketPriceBao}}</view>
				<view class="oneLine ml10">{{item.titleBao}}</view>
			</view>
			<view v-if="item.tuanType==1" class="flex size24 alc mb10">
				<view class="tuan-item">团</view>
				<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePricetuan}}
				</view>
				<view class="txtLighGray txtls ml10">￥{{item.marketPricetuan}}</view>
				<view class="oneLine ml10">{{item.titletuan}}</view>
			</view>
			<view v-if="item.quanType==1" class="flex size24 alc mb10">
				<view class="quan-item">券</view>
				<view class="mainRed fwb ml10">￥{{item.bankCardPrice?item.bankCardPrice:item.flashSalePricequan}}
				</view>
				<view class="txtLighGray txtls ml10">￥{{item.marketPricequan}}</view>
				<view class="oneLine ml10">{{item.titlequan}}</view>
			</view>
			<view v-if="item.baoType==0&&item.tuanType==0&&item.quanType==0&&item.associatedContentText"
				class="txtLighGray size24 oneLine">
				商家简介:{{item.associatedContentText}}
			</view>
			<view class="flex mt20" style="margin-left: -7rpx;">
				<view v-for="(item1,index1) in item.imglist" :key="index1" style="margin-left: 7rpx;">
					<image v-if="index1<3" :src="item1" style="width: 212rpx;height: 159rpx;border-radius: 10rpx;">
					</image>
				</view>
			</view>
			<view v-if="item.moreType==1" class="jsc mt20 flex">
				<view class="size24">更多优惠项目</view>
				<view>
					<u-icon size="14px" name="arrow-right"></u-icon>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				keyword: '',
				isLoadMore: false,
				current: 1,
				dataList: []
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onLoad() {
			this.getList()
		},
		onShow() {},
		methods: {
			OnAdd(item){
				uni.navigateBack({
					delta: 1
				});
				uni.$emit('chooseshop', item)
			},
			tosearch() {
				this.isLoadMore = false
				this.current = 1
				this.getList()
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/getActivityShopNew", {
					property: 0,
					current: this.current,
					payType: 0,
					shopType: 0,
					size: 10,
					sort: 1,
					shopCategoryId: 0,
					name: this.keyword
				}).then(res => {
					res.data.records.filter(s => {
						s.imglist = []
						s.imgs.filter(r => {
							r.associatedContent.split(',').filter(e => {
								s.imglist.push(e)
							})

						})
					})
					if (res.data.records.length < 10) {
						this.isLoadMore = true
					}
					if (res.data.current == 1) {
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
	.page {
		margin: 25rpx;
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
	.card-list {
		box-shadow: 2rpx 3rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
		margin-top: 10rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 25rpx;
	}
	
	.tag-item {
		border-radius: 16rpx;
		background-color: #fceded;
		font-size: 24rpx;
		color: #D91B1B;
		padding: 14rpx 20rpx;
		text-align: center;
		margin-left: 8rpx;
	}
	
	.bao-item {
		padding: 5rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		size: 24rpx;
		color: #ffffff;
		font-weight: bold;
		line-height: 32rpx;
	}
	
	.tuan-item {
	
		padding: 5rpx;
	
		background: #54CBBA;
	
		border-radius: 10rpx;
	
		size: 24rpx;
	
		color: #ffffff;
	
		font-weight: bold;
	
		line-height: 32rpx;
	
	}
	
	.quan-item {
	
		padding: 5rpx;
	
		background: #FD6F36;
	
		border-radius: 10rpx;
	
		size: 24rpx;
	
		color: #ffffff;
	
		font-weight: bold;
	
		line-height: 32rpx;
	
	}
</style>
