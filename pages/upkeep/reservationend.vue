<template>
	<view class="page">
<view>
	<image style="height: 209rpx;width: 100%;" src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697005479603.png"></image>
</view>
<!-- 已绑定客户经理 -->
		<view class="card flex jsb alc bgfff br10 " v-if="managerobj.customerManagerId">
			<view class="flex alc">
				<image :src="managerobj.url" class="salePic"></image>
				<view class="fwb">{{ managerobj.nickname }}</view>
				<view class="contacts-item-label" style="margin-left:40rpx;font-weight: normal;">您的专属客户经理</view>
			</view>
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20231010/file_1696923217553.png" class="saletel"
				@click="OnTell()"></image>
		</view>
		<view class="bottom-view">
			<view class="tac" style="margin-left: 48rpx;" @click="Ongohome">
				<view class="u-flex jsc"><image style="width: 52rpx;height: 52rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697006360899.png"></image></view>
			<text class="size24">返回首页</text>
			</view>
			<view class="order-btn" style="margin-right: 48rpx;" @click="onpushorderlist()">
				查看预约记录
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
		shopId:'',
		managerobj:{},
		status:1
			}
		},
		onLoad(option) {
			this.status=option.status
			this.shopId=option.shopId
			this.getcustomerManager()
		},
		onShow() {
		},
		methods: {
			onpushorderlist(){
				uni.navigateTo({
					url: '/pages/upkeep/orderlist'
				})
			},
			Ongohome(){
				uni.switchTab({
					url: '/pages/home/index'
				});
			},
			OnTell() {
				if (this.managerobj.phone) {
					uni.makePhoneCall({
						phoneNumber: this.managerobj.phone
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂无联系方式'
					})
				}
			},
			getcustomerManager(){
				this.$request.post("/coc-active/api/v2/maintain_meal/shop/customerManager/list",{
					shopId:this.shopId
				}).then(res=>{
					this.managerobj=res.data[0]
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
.card {
		border-radius: 16rpx;
		padding: 24rpx;
		background: #FFFFFF;
		margin: 74rpx 24rpx;
	}
	.salePic {
		width: 84rpx;
		height: 84rpx;
		border-radius: 50%;
		margin-right: 26rpx;
	}
	.contacts-item-label {
		color: #222;
		font-weight: bold;
		font-size: 28rpx;
	}
	.saletel {
		width: 34rpx;
		height: 34rpx;
	}
	.bottom-view{
		position: fixed;
		bottom: 0rpx;
		background-color: #ffffff;
		height: 120rpx;
		width: 100%;
		padding: 20rpx 0rpx;
		display: flex;
		justify-content: space-between;
	}
	.order-btn{
		width: 208rpx;
		height: 72rpx;
		line-height: 72rpx;
		text-align: center;
		border-radius: 100rpx;
		font-size: 28rpx;
		color: #ffffff;
		background-color: #D91B1B;
	}
</style>
