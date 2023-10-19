<template>
	<view class="page">
		<view class="channel">
			<view style="font-size: 32rpx;">
				绑定途径
			</view>
			<view style="margin-left: 40rpx;">
				<u-radio-group labelSize='14' v-model="dataList.bindingApproach" placement="row">
					<u-radio activeColor="#d91b1b" shape="square" label="销售" name="1">
					</u-radio>
					<u-radio :customStyle="{marginLeft: '20px'}" activeColor="#d91b1b" shape="square" label="售后"
						name="2">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="car-brand">
			<view style="font-size: 32rpx;">
				选择品牌
			</view>
			<view @click="Choosecar" class="choosecar">
				<view>
					{{dataList.brandName}}
				</view>
				<view style="margin-top: 20rpx;margin-right: 20rpx">
					<u-icon size="12" name="arrow-right" :bold='true' color="#666666"></u-icon>
				</view>
			</view>
		</view>
		<view class="vehicle-series">
			<view style="font-size: 32rpx;">
				选择车系
			</view>
			<view @click="Choosecar" class="choosecar">
				<view>
					{{dataList.vehicleName}}
				</view>
				<view style="margin-top: 20rpx;margin-right: 20rpx;">
					<u-icon size="12" name="arrow-right" :bold='true' color="#666666"></u-icon>
				</view>
			</view>
		</view>

		<view class="licenseplate">
			<view class="title">
				车牌号码
			</view>
			<view class="input-info">
				<view @click="show=true" class="province">
					<view>
						{{dataList.Defaultprovince}}
					</view>
					<view style="margin-top: 14rpx;margin-left: 6rpx;">
						<u-icon size="12" name="arrow-down" :bold='true' color="#222222"></u-icon>
					</view>
				</view>
				<view style="margin-left: 20rpx;">
					<u--input :customStyle="{backgroundColor:'#ffffff',width:'422rpx'}" v-model="dataList.carid">
					</u--input>
				</view>
			</view>
		</view>
		<view class="btn-bottom">
			<text @click="OnPushManager">选择专属客户经理</text>
		</view>
		<u-picker :show="show" :columns="columns" @cancel="show=false" @confirm="choosepick"></u-picker>
	</view>
</template>

<script>
	import Licenseplate from '@/utils/Licenseplate.js'
	export default {
		components: {

		},
		data() {
			return {
				columns: [Licenseplate],
				show: false,
				brandname: '',
				vehiclename: '',
				dataList: {
					bindingApproach: '1',
					shopId: '',
					plate: '',
					brandName: '',
					vehicleName: '',
					Defaultprovince: '浙',
					carid: '',

				}
			}
		},

		onLoad(option) {
			if (option.shopId) {
				this.dataList.shopId = option.shopId
			} else {
				let _this = this
				const eventChannel = this.getOpenerEventChannel();
				eventChannel.on('getList', function(data) {
					uni.$u.sleep(0).then(() => {
						_this.dataList = data.data
					})

				})
			}
		},
		onShow() {},
		methods: {
			OnPushManager(){
				let _this=this
					this.dataList.plate = this.dataList.Defaultprovince + this.dataList.carid
					uni.navigateTo({
						url: '/pages/my/customer/index' ,
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('sengdataList', {
								data: _this.dataList
							})
						}
					})
			},
			Choosecar() {
			
				let _this = this
				uni.navigateTo({
					url: '/pages/my/customer/addcar',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('sengdataList', {
							data: _this.dataList
						})
					}
				})
			},
			choosepick(val) {
				this.dataList.Defaultprovince = val.value[0]
				this.show = false
			},

		}
	}
</script>

<style lang="scss">
	.page {
		margin: 20rpx;
	}

	.channel {
		display: flex;
	}

	.car-brand {
		display: flex;
		margin-top: 40rpx;
	}

	.choosecar {
		width: 540rpx;
		height: 60rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: #666666;
		text-align: right;
		line-height: 60rpx;
		margin-left: 40rpx;
		display: flex;
		justify-content: flex-end;
	}

	.vehicle-series {
		display: flex;
		margin-top: 40rpx;
	}

	.licenseplate {
		display: flex;
		margin-top: 40rpx;

		.title {
			font-size: 32rpx;
			line-height: 78rpx;
		}

		.input-info {
			display: flex;

			.province {
				display: flex;
				background-color: #f8f8f8;
				padding: 18rpx;
				border-radius: 14rpx;
			}
		}
	}

	.btn-bottom {
		margin-top: 160rpx;
		text-align: center;

		text {
			display: inline-block;
			width: 599rpx;
			height: 81rpx;
			background-color: #d91b1b;
			border-radius: 40rpx;
			text-align: center;
			line-height: 81rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
	}
</style>
