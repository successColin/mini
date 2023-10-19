<template>
	<view class="page">
		<view class="card">
			<view class="u-flex alc">
				<view>
					<image
						src="https://oss.dcqcjlb.com/51che_java_dev/20230626/file_1687772255532.png"
						style="width: 80rpx;height: 80rpx;"></image>
				</view>
				<view class="ml20">
					<view class="size32 fwb">救援无忧卡</view>
					<view class="mainRed  size24 mt10">{{dataList.insureStatusMsg}}</view>
				</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>原价</view>
				<view>￥{{dataList.orderMoneyOld}}/年</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>限时优惠</view>
				<view class="mainRed">-￥{{dataList.limitedTimeCoupon-commission}}/年</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>支付金额</view>
				<view class="mainRed">￥{{dataList.paidMoney}}/年</view>
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb size24 ">
				<view>联系人</view>
				<view>{{dataList.name}}</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>手机号</view>
				<view>{{dataList.mobile}}</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>下单时间</view>
				<view>{{dataList.createdAt}}</view>
			</view>
			<view v-if="dataList.insureStatus==10" class="u-flex jsb size24 mt30">
				<view>有效期至</view>
				<view>{{dataList.invalidDate}}</view>
			</view>
			<view class="u-flex jsb size24 mt30" @click="Oncopy()">
				<view>订单编号</view>
				<view>{{dataList.orderNo}}
					<image style="width: 22rpx;height: 22rpx;" class="ml10" src="@/static/image/fuzhi.png"></image>
				</view>
			</view>
			<view class="u-flex jsb size24 mt30">
				<view>开票状态</view>
				<view>{{dataList.billMsg}}</view>
			</view>
			<view class="u-flex jsb mt30" v-if="dataList.insureStatus==10">
				<view></view>
				<view v-if="dataList.bill==0" class="billing" @click="OnapplyBill">申请开票</view>
				<view v-if="dataList.bill==2||dataList.bill==1" @click="OnPushBillDetail" class="billing">查看发票</view>
			</view>
		
			<view v-if="dataList.insureStatus==0||dataList.insureStatus==20" class="u-flex jsb mt30 alc">
			
						<view   class="mainRed size24">
							<view v-if="dataList.status==4||dataList.noRefundReason">退款拒绝：{{dataList.noRefundReason}}</view></view>
				
				<view v-if="dataList.orderSource==2" class="refund" @click="Onrefund">申请退款</view>
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
				id: '',
				dataList: {},
				commission:''
			}
		},

		onLoad(option) {
			this.id = option.id
			if(uni.getStorageSync('commission')){
				this.commission=uni.getStorageSync('commission')
			}
		},
		onShow() {
this.getList()
		},
		methods: {
			OnPushBillDetail(){
				uni.navigateTo({
					url: '/pages/roadhelp/billdetail?id=' + this.dataList.orderId + '&orderNo=' + this.dataList.orderNo
				})
			},
			OnapplyBill(){
			
				uni.navigateTo({
					url: '/pages/roadhelp/applyinvoicing?id=' + this.dataList.orderId + '&orderNo=' + this.dataList.orderNo
				})
			},
			Onrefund() {
				uni.navigateTo({
					url: '/pages/roadhelp/refundindex?id=' + this.dataList.orderId + '&orderNo=' + this.dataList
						.orderNo
				})
			},
			Oncopy() {
				uni.setClipboardData({
					data: this.dataList.orderNo
				});
			},
			getList() {
				this.$request.post("/coc-active/api/v1/sky_you_service/order/details", {
					id: this.id
				}).then(res => {
					this.dataList = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 25rpx;
		padding: 25rpx;
	}

	.billing {
		width: 140rpx;
		height: 48rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		line-height: 48rpx;
		text-align: center;
		color: #ffffff;
	}

	.refund {
		width: 140rpx;
		height: 48rpx;
		background: #999999;
		border-radius: 10rpx;
		line-height: 48rpx;
		text-align: center;
		color: #ffffff;
	}
</style>
