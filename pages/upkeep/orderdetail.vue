<template>
	<view class="page">
		<view v-if="dataList.status!=6" class="progress-bar txtLighGray">
			<view class="tac">
				<view>
					<image v-if="dataList.status==0" src="./static/image/step1.svg" class="svg-s"></image>
					<image v-else-if="dataList.status>0" src="./static/image/step1s.svg" class="svg-s"></image>
				</view>
				<view class="mt10 w100" :class="{'mainRed':dataList.status>0}">已预约</view>
			</view>
			<view>
				<image v-if="dataList.status==0" src="./static/image/jiantouw.svg" class="svg-jiantou"></image>
				<image v-else-if="dataList.status>0" src="./static/image/jiantous.svg" class="svg-jiantou"></image>
			</view>
			<view class="tac">
				<view>
					<image v-if="dataList.status<2" src="./static/image/step2.svg" class="svg-s"></image>
					<image v-else-if="dataList.status>=2" src="./static/image/step2s.svg" class="svg-s"></image>
				</view>
				<view class="mt10 w100" :class="{'mainRed':dataList.status>=2}">预约确认</view>
			</view>
			<view>
				<image v-if="dataList.status<2" src="./static/image/jiantouw.svg" class="svg-jiantou"></image>
				<image v-else-if="dataList.status>=2" src="./static/image/jiantous.svg" class="svg-jiantou"></image>
			</view>
			<view class="tac">
				<view>
					<image v-if="dataList.status<3" src="./static/image/step3.svg" class="svg-s"></image>
					<image v-if="dataList.status>=3" src="./static/image/step3s.svg" class="svg-s"></image>
				</view>
				<view class="mt10 w100" :class="{'mainRed':dataList.status>=3}">保养项目待确认</view>
			</view>
			<view>
				<image v-if="dataList.status<3" src="./static/image/jiantouw.svg" class="svg-jiantou"></image>
				<image v-else-if="dataList.status>=3" src="./static/image/jiantous.svg" class="svg-jiantou"></image>
			</view>
			<view class="tac">
				<view>
					<image v-if="dataList.status<4" src="./static/image/step4.svg" class="svg-s"></image>
					<image v-if="dataList.status>=4" src="./static/image/step4s.svg" class="svg-s"></image>
				</view>
				<view class="mt10 w100" :class="{'mainRed':dataList.status>=4}">保养中</view>
			</view>
			<view>
				<image v-if="dataList.status<4" src="./static/image/jiantouw.svg" class="svg-jiantou"></image>
				<image v-else-if="dataList.status>=4" src="./static/image/jiantous.svg" class="svg-jiantou"></image>
			</view>
			<view class="tac">
				<view>
					<image v-if="dataList.status<5" src="./static/image/step5.svg" class="svg-s"></image>
					<image v-if="dataList.status==5" src="./static/image/step5s.svg" class="svg-s"></image>
				</view>
				<view class="mt10 w100" :class="{'mainRed':dataList.status>=5}">保养完成</view>
			</view>

		</view>
		<view v-else-if="dataList.status==6" class="remove-view">
			<image style="width: 116rpx;height: 116rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20231011/file_1697016850678.png"></image>
			<view class="mt20">预约已取消</view>
		</view>
		<view class="card-shop u-flex alc" @click="Onpush4shome">
			<image style="width: 120rpx;height: 120rpx;" :src="dataList.shopVO.brandCarLogo"></image>
			<view class="ml20 size28 fwb oneLine w500">{{dataList.shopVO.baseName}}</view>
		</view>
		<view class="card">
			<view class="size28 fwb">
				您要保养的车辆
			</view>
			<view class="mt20 car-box">
				<image style="width: 120rpx;height: 120rpx;" :src='dataList.vehicleVO.brandCarLogo'></image>
				<view class="ml20">
					<view class="fwb size28">{{dataList.vehicleVO.vehicleName}}</view>
					<view class="size20 txtLighGray mt">{{dataList.vehicleVO.plate}}</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="size28 fwb">
				预约信息
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb size24">
				<view>到店日期</view>
				<view>{{dataList.arrivalDate}}</view>
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb size24">
				<view>到店时间</view>
				<view>{{dataList.arrivalTime}}</view>
			</view>
		</view>
		<view class="card" v-if="dataList.maintainMealOrderVOList.length>0">
			<view class="size28 fwb">
				使用套餐
			</view>
			<view v-for="item in dataList.maintainMealOrderVOList" :key="item.maintainMealOrderId"
				@click="Onpushdetail(item)">
				<u-divider :text="null"></u-divider>
				<view class="u-flex jsb mainRed size24">
					<view>{{item.maintainMealName}}</view>
					<view><u-icon color="#D91B1B" name="arrow-right" size="14"></u-icon></view>
				</view>
			</view>
		</view>
		<view v-if="dataList.status==1" style="margin-left: 24rpx;margin-top: 16rpx;" class="size24 mainRed">
			等待店内预约确认
		</view>
		<view v-if="dataList.status==2" style="margin-left: 24rpx;margin-top: 16rpx;" class="size24 mainRed">
			店内已预约确认，请按规定时间到店
		</view>
		<view class="card" v-if="dataList.status==3||dataList.status==4||dataList.status==5">
			<view class="size28 fwb">
				保养项目确认单
			</view>
			<view class="mt20" @click="watchimg(1)">
				<image style="width: 200rpx;height: 200rpx;border-radius: 16rpx;" :src="dataList.maintenanceListPic">
				</image>
			</view>
		</view>
		<view v-if="dataList.status==3" style="margin-left: 24rpx;margin-top: 16rpx;margin-right: 24rpx" class="size24 mainRed">
			请认真核对保养项目确认单各项目明细，核对无误后点击确认， 如有疑问请与客户经理联系，变更保养项目。
		</view>
		<view v-if="dataList.status==4" style="margin-left: 24rpx;margin-top: 16rpx;" class="size24 mainRed">
			请耐心等待保养完成
		</view>
		<view class="card" v-if="dataList.status==5">
			<view class="size28 fwb">
				结算单
			</view>
			<view class="mt20" @click="watchimg(2)">
				<image style="width: 200rpx;height: 200rpx;border-radius: 16rpx;" :src="dataList.finalStatement">
				</image>
			</view>
		</view>
		<view v-if="dataList.status==3" @click="Ontruestep3" class="tac">
			<view class="step3-btn">确认</view>
		</view>
		<view v-if="dataList.status==5&&dataList.payStatus==2" style="margin-left: 24rpx;margin-top: 16rpx;margin-right: 24rpx;"
			class="size24 mainRed">
			请认真核对结算单各项目明细以及结算金额，核对无误后在线支付 款项或与客户经理联系至店内财务处付款。
		</view>
		<view v-if="dataList.status==5&&dataList.payStatus==1" style="margin-left: 24rpx;margin-top: 16rpx;"
			class="size24 mainRed">
			本次保养已完成，如有问题请联系您的客户经理，祝您用车愉快！
		</view>
		<!-- 支付框 -->
		<view class="bottom-view" v-if="dataList.status==5">
			<view style="margin-left: 48rpx;">
				<view class="size24 txtLighGray txtls">标准价：{{dataList.standardPrice}}元</view>
				<view style="margin-top: 4rpx;" class="size24">
					<text>结算价：</text>
					<text class="mainRed fwb size32">{{dataList.settlementPrice}}</text>
					<text>元</text>
				</view>
			</view>
			<view v-if="dataList.payStatus==2" class="pay-btn" @click="Ontopay">
				立即支付
			</view>
			<view v-else-if="dataList.payStatus==1" class="pay-gray">
				已支付
			</view>
		</view>
		<!-- 客户经理 -->
		<view class="manager-btn" @click="OnTell" v-if="dataList.customerManagerVO.customerManagerId">
			<u-avatar :src="dataList.customerManagerVO.url" size="54"></u-avatar>
			<view class="name-btn">{{dataList.customerManagerVO.nickname}}</view>
		</view>
		<view style="height: 200rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				id: '',
				dataList: {}
			}
		},

		onLoad(option) {
			this.id = option.id
			this.getList()
		},
		onShow() {},
		methods: {
			Ontruestep3(){
				this.$request.post("/coc-active/api/v1/maintenance_appointment/updateStatus",{
					status:4,
					maintenanceAppointmentId:this.id
				}).then(res=>{
					this.getList()
				})
			},
			OnTell() {
				if (this.dataList.customerManagerVO.phone) {
					uni.makePhoneCall({
						phoneNumber: this.dataList.customerManagerVO.phone
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: '暂无联系方式'
					})
				}
			},
			wxpay(data) {
				let _this = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.miniPayRequest.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.miniPayRequest.nonceStr, // 随机字符串
					package: data.miniPayRequest.package, // 固定值
					signType: data.miniPayRequest.signType, //固定值
					paySign: data.miniPayRequest.paySign, //签名
					appid: data.miniPayRequest.appId,
					success: function(res) {
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								setTimeout(() => {
									_this.getList()
								}, 1000)
							}
						})
					},
				})
			},
			Ontopay() {
				this.$request.post("/coc-active/api/v1/maintenance_appointment/payment", {
					maintenanceAppointmentId:Number(this.id),
					subOpenId: uni.getStorageSync('openid')
				}).then(res => {
					if (res.code == 200) {
						if(!res.data){
							this.getList()
						}else{
							this.wxpay(res.data.payment)
						}
						
					} else {
						uni.$u.toast(res.message)
					}
				})
			},
			watchimg(index) {
				let _this = this
				let url = ''
				if (index == 1) {
					url = [this.dataList.maintenanceListPic]
				} else {
					url = [this.dataList.finalStatement]
				}
				uni.previewImage({
					urls: url,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			Onpushdetail(item) {
				uni.navigateTo({
					url: '/pages/my/myUpkeepOrder/detail?id=' + item.maintainMealOrderId
				})
			},
			Onpush4shome() {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopVO.shopId
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v1/maintenance_appointment/details", {
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

	.progress-bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin: 40rpx 24rpx;
		font-size: 24rpx;
	}

	.svg-s {
		width: 40rpx;
		height: 40rpx;
	}

	.svg-jiantou {
		width: 40rpx;
		height: 16rpx;
	}

	.w100 {
		width: 100rpx;
		height: 32rpx;
	}

	.remove-view {
		text-align: center;
		font-size: 28rpx;
		padding: 60rpx;
	}

	.card-shop {
		margin: 24rpx;
		padding: 12rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.card {
		margin: 24rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.w500 {
		width: 500rpx;
	}

	.car-box {
		border: 2rpx solid #F8F8F8;
		border-radius: 16rpx;
		display: flex;
		align-items: center;
		padding: 12rpx;
	}

	.manager-btn {
		position: fixed;
		right: 50rpx;
		bottom: 300rpx;
	}

	.name-btn {
		position: relative;
		margin-top: -10rpx;
		width: 112rpx;
		height: 40rpx;
		line-height: 40rpx;
		background: #D91B1B;
		border-radius: 160rpx;
		text-align: center;
		font-size: 24rpx;
		color: #ffffff;
	}

	.bottom-view {
		position: fixed;
		bottom: 0rpx;
		background-color: #ffffff;
		height: 120rpx;
		width: 100%;
		padding: 20rpx 0rpx;
		display: flex;
		justify-content: space-between;
	}

	.pay-btn {
		margin-right: 48rpx;
		width: 208rpx;
		height: 72rpx;
		background: #D91B1B;
		border-radius: 100rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		text-align: center;
		color: #ffffff;
	}

	.pay-gray {
		margin-right: 48rpx;
		width: 208rpx;
		height: 72rpx;
		background: #E8E8E8;
		border-radius: 100rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		text-align: center;
		color: #999999;
	}
	.step3-btn{
		width: 400rpx;
		height: 72rpx;
		background: #D91B1B;
		border-radius: 100rpx ;
		line-height: 72rpx;
		text-align: center;
		font-size: 28rpx;
		color: #ffffff;
		margin: 40rpx auto;
	}
</style>