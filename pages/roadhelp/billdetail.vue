<template>
	<view class="page">
		<view class="card">
			<view class="u-flex jsb">
				<view>发票类型</view>
				<view>普通电子发票</view>
			</view>
			<view class="u-flex jsb mt30">
				<view>发票选项</view>
				<view>{{data.typeMsg}}</view>
			</view>
			<view  class="u-flex jsb mt30">
				<view>发票抬头</view>
				<view>{{data.title}}</view>
			</view>
			<view v-if="data.type==2" class="u-flex jsb mt30">
				<view>纳税人识别号</view>
				<view>{{data.tax}}</view>
			</view>
			<view v-if="data.type==2" class="u-flex jsb mt30">
				<view>注册地址</view>
				<view>{{data.address}}</view>
			</view>
			<view v-if="data.type==2" class="u-flex jsb mt30">
				<view>注册电话</view>
				<view>{{data.mobile}}</view>
			</view>
			<view v-if="data.type==2" class="u-flex jsb mt30">
				<view>开户银行</view>
				<view>{{data.bank}}</view>
			</view>
			<view v-if="data.type==2" class="u-flex jsb mt30">
				<view>银行账号</view>
				<view>{{data.bankCard}}</view>
			</view>
			<view  class="u-flex jsb mt30">
				<view>邮箱</view>
				<view>{{data.email}}</view>
			</view>
			<view  class="u-flex jsb mt30">
				<view>发票金额</view>
				<view>￥{{commission}}</view>
			</view>
			<view  class="u-flex jsb mt30">
				<view>申请时间</view>
				<view>{{data.createdAt}}</view>
			</view>
			<view  class="u-flex jsb mt30">
				<view>开票状态</view>
				<view>{{data.statusMsg}}</view>
			</view>
		</view>
		<view class="txtLighGray size24" style="margin-left: 50rpx;margin-top: 30rpx;">
			温馨提示：请登录邮箱，查收发票凭证。
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				commission:89.9,
				orderId: '',
				orderSn: '',
				data:{}
			}
		},

		onLoad(option) {
			if(uni.getStorageSync('commission')){
				this.commission=uni.getStorageSync('commission')
			}
			this.orderId = option.id
			this.orderSn = option.orderNo
			this.getList()
		},
		onShow() {},
		methods: {
			getList() {
				this.$request.post("/coc-active/api/v1/bill/billDetail", {
					orderId: this.orderId,
					orderSn: this.orderSn,
					orderType: '4'
				}).then(res => {
this.data=res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 25rpx;
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		font-size: 24rpx;
	}
</style>
