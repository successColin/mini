<template>
	<view class="page">
		<view v-for="(item,index) in dataList" :key="item.orderId">
			<view class="card" @click="OnPushDetail(item)">
				<view>
					<view class="size28 fwb">{{item.name}}</view>
					<!-- <view class="size24 mt20">有效期至：{{item.createdAt}}</view> -->
					<view class="size24 mt20">下单时间：{{item.createdAt}}</view>
				</view>
				<view class="u-flex alc mainRed" >
					<view>{{item.statusMsg}}</view>
					<view v-if="item.status==1">
						<u-icon color="#D91B1B" name="arrow-right"></u-icon>
					</view>
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
				dataList: []
			}
		},

		onLoad() {
			
		},
		onShow() {
			this.getList()
		},
		methods: {
			OnPushDetail(item){
				if(item.status==1){
					uni.navigateTo({
						url: '/pages/roadhelp/orderdetail?id='+item.orderId
					})
				}
			},
			getList() {
				this.$request.post("/coc-active/api/v1/sky_you_service/order/list").then(res => {
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 24rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 25rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
