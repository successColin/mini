<template>
	<view class="page">
		<view class="card">
			<view class="u-flex jsb">
				<view class="fwb size32">救援无忧卡</view>
				<view class="mainRed fwb size32">￥{{commission}}/年</view>
			</view>
			<view v-if="user.roadVip==2" class="size24 mt30 txtLighGray">
				当前权益到期时间：{{user.roadVipExp}}
			</view>
			<view class="mainRed size24 mt30">
				下单后将在7个工作日内对您进行投保,投保后权益生效,若您有多笔订单,后面的订单将在上一笔订单到期前一天进行投保(只适用于个人乘用车)
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb size28">
				<view>联系人</view>
				<view>{{name}}</view>
			</view>
			<view class="u-flex jsb size28 mt30">
				<view>手机号</view>
				<view>{{mobile}}</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="mainRed">
				<text class="size28">￥</text>
				<text style="font-size: 48rpx;" class="fwb">{{commission}}</text>
			</view>
			<view class="btn" @click="OnToPay">去支付</view>
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
				mobile: '',
				name: '',
				user: {},
				customerManagerId:'',
				shareId:'',
				orderId:'',
				lockin:true,
				sourceType:null,
				affiliationType:null
			}
		},

		onLoad(option) {
			if(uni.getStorageSync('commission')){
				this.commission=uni.getStorageSync('commission')
			}
			this.getList()
			this.mobile = uni.getStorageSync('mobile')
			this.name = uni.getStorageSync('realName')
			console.log(option)
	if(option.shareId){
		this.shareId=option.shareId
	}if (option.customerManagerId){
		this.customerManagerId=option.customerManagerId
	}  if (option.sourceType){
		this.sourceType=option.sourceType
	}  if (option.affiliationType){
		this.affiliationType=option.affiliationType
	}
		},
		onShow() {},
		methods: {
			wxpay(data) {
					let _this = this
					uni.requestPayment({
						provider: 'wxpay', //支付类型-固定值
						timeStamp: data.timeStamp, // 时间戳（单位：秒）
						nonceStr: data.nonceStr, // 随机字符串
						package: data.package, // 固定值
						signType: data.signType, //固定值
						paySign: data.paySign, //签名
						appid: data.appId,
						success: function(res) {
							
							uni.showToast({
								icon: 'success',
								title: '支付成功',
								complete() {													
									uni.redirectTo({
										url: '/pages/roadhelp/successpay'
									})
								}
							})
						},
					
					});
				},
				nextpay(){
					let msg={}
									msg.mobile=this.mobile
									msg.name=this.name
									msg.payType=5
									msg.subOpenId= uni.getStorageSync('openid')
									msg.forwardUserId=this.shareId
									console.log(this.customerManagerId,this.sourceType,this.affiliationType)
									if(this.customerManagerId){
										msg.customerManagerId=this.customerManagerId
									}
									if(this.sourceType){
										msg.sourceType=this.sourceType
									}
									if(this.affiliationType){
										msg.affiliationType=this.affiliationType
									}
									if(this.shareId){
										msg.shareId=this.shareId
									}
									if(!this.lockin){
										return false
									}
									this.lockin=false
									this.$request.post("/coc-active/api/v1/sky_you_service/order/orderPayment",msg).then(res=>{
										if(res.code==200){
											this.lockin=true
											this.orderId=res.data.orderId
											this.wxpay(res.data.payment.miniPayRequest)
										}else{
												uni.$u.toast(res.message)
										}
									})
				},
			OnToPay(){	
				let _this=this
				uni.requestSubscribeMessage({
					tmplIds: [
						'EDPZBi96qqYOHGorQC2raNQYmW-DX85vtPjpf9RRPIE',
						'7hWjRBvg3ovr8g8JufBvXVk813lh9A4A534plStdxUw'
					],
					complete(res) {
						_this.nextpay()
					}
				})
				
			},
			getList() {
				this.$request.get('/coc-my/api/v1/my/findUser').then(res => {
					this.user = res.data.user
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
		padding: 30rpx 26rpx;
	}

	.bottom-btn {
		position: fixed;
		bottom: 0rpx;
		width: 700rpx;
		background: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 24rpx;
		padding-right: 24rpx;
		height: 120rpx;
	}
	.btn{
		width: 180rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		font-size: 28rpx;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
	}
</style>
