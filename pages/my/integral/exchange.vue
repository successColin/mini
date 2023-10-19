<template>
	<view class="page">
		<view>
			<image mode="widthFix" style="width: 750rpx;" :src="dataList.titleImg"></image>
		</view>
		<view class="user-info">
			<view class="u-flex">
				<view class="user-avatar">
					<u-avatar size='60' :src="dataList.shopAvatar">
					</u-avatar>
				</view>
				<view class="user-info-detail">
					<view class="name">
						{{dataList.shopName}}
					</view>
					<view class="u-flex" style="margin-top: 14rpx;">
						<image src="@/static/image/yirenzheng.png" style="width: 104rpx; height:28rpx"></image>
						<view style="margin-top: -5rpx;">
							<u-rate :readonly='true' :count="1" v-model="value" size='18' active-color="#f7c261">
							</u-rate>
						</view>

						<view style="font-size: 24rpx;margin-top: -1rpx;">{{dataList.shopStar}}</view>
					</view>
				</view>
			</view>
			<view>
				<view @click="Oninteractive()" class="btn-follow">
					<view v-if="dataList.isFans==1">
						已关注</view>
					<view v-else>关注</view>
					<u-icon name="arrow-down" color="#d91b1b">
					</u-icon>
				</view>
				<view class="u-flex" style="margin-top: 10rpx;">
					<view @click="OnchooseLocation(1)"
						style="background-color: white;border-radius: 50%;padding: 10rpx;position: relative;right: 20rpx;">
						<u-icon name="map-fill" color="#222222" size="24">
						</u-icon>
					</view>
					<view @click="Ontel()" style="background-color: white;border-radius: 50%;padding: 10rpx;">
						<u-icon name="phone" color="#222222" size="24">
						</u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view v-if="address.id" class="u-flex" style="justify-content: space-between;">
				<view class="u-flex">
					<view style="margin-top: 20rpx;">
						<image v-if="address.addressTag==='公司'" style="width: 87rpx;height: 31rpx;" mode="heightFix"
							src="../static/image/gongsi.png">
							<image v-else-if="address.addressTag==='家庭'" style="width: 87rpx;height: 31rpx;"
								mode="heightFix" src="../static/image/jiating.png">
								<image v-else-if="address.addressTag==='学校'" style="width: 87rpx;height: 31rpx;"
									mode="heightFix" src="../static/image/xuexiao.png">
					</view>
					<view class="add-info">
						<view>
							<text>{{getname(address.name)}}</text>
							<text style="margin-left: 20rpx;">{{getphone(address.mobile)}}</text>
						</view>
						<view style="margin-top: 10rpx;font-size: 24rpx;width: 400rpx;">
							{{address.addressDetail}}
						</view>
					</view>

				</view>
				<view class="u-flex" style="font-size: 24rpx;margin-top: 20rpx;" @click="OnPushAddress">
					<view>地址簿</view>
					<view style="margin-top: 4rpx;margin-left: 10rpx;">
						<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
					</view>
				</view>
			</view>
			<view class="u-flex" style="justify-content: space-between;" v-else>
				<view>
					<view style="font-size: 28rpx;">
						请添加默认收货地址
					</view>
				</view>
				<view class="u-flex" style="font-size: 24rpx;" @click="OnPushAddress">
					<view>地址簿</view>
					<view style="margin-top: 4rpx;margin-left: 10rpx;">
						<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="title">
				{{dataList.name}}
			</view>
			<view style="font-size: 24rpx;margin-top: 20rpx;margin-left: 18rpx;width: 630rpx;">
				{{dataList.exchangeKnow}}
			</view>
			<view style="text-align: center;margin-top: 20rpx;">
				<image :src="dataList.detailsImg" mode="widthFix" style="width: 630rpx;border-radius: 10rpx;"></image>
			</view>
		</view>
		<view class="bottom">
			<view style="margin-left: 40rpx;font-size: 24rpx">
				积分兑换价:<text
					style="font-size: 36rpx;color: #d91b1b;font-weight: bold;">{{dataList.exchangePrice}}</text>积分
			</view>
			<view class="btn" >
				<text @click="OnExchange">
					立即兑换
				</text>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
		<u-picker @confirm="changepicker" :closeOnClickOverlay='true' :showToolbar='true' :show="showinteractive"
			@close='showinteractive=false' @cancel='showinteractive=false' :columns="columns" keyName="label">
		</u-picker>
		<u-picker @confirm="changepickerComment" :closeOnClickOverlay='true' :showToolbar='true'
			:show="showinteractiveComment" @close='showinteractiveComment=false' @cancel='showinteractiveComment=false'
			:columns="columnsComment" keyName="label">
		</u-picker>
		<u-popup :safeAreaInsetBottom='false' :show="showgroup" @close="showgroup=false" mode="center">
			<scroll-view style="height: 710rpx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y">
				<view class="pop">
					<view class="session" v-for="(item,index) in mygroup" :key="index">
						<view class="container">
							<view class="avatar-container">
								<image class="avatar" :src="item.groupHeadImg">
								</image>
							</view>
							<view class="content">
								<text class="name">{{item.name}}</text>
							</view>
							<view class="time-container">
								<text @click="OnpullInGroup(item)" class="time">拉入</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<u-toast ref="uToast"></u-toast>
		</u-popup>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				mygroup: [],
				dataList: {},
				id: '',
				value: 1,
				address: {},
				columns: [],
				showinteractive: false,
				showgroup: false,
				userAddressId: '',

			}
		},

		onLoad(option) {
			this.id = option.id
			this.getList()

		},
		onShow() {
			this.getaddress()
		},
		methods: {
			OnExchange() {
				if (!this.userAddressId) {
					this.$refs.uToast.show({
						message: '请选择默认收货地址',
						complete() {
							uni.navigateTo({
								url: '/pages/my/address/index'
							})
						}
					});
				} else {
					this.$request.post("/coc-my/api/v1/my/user/score/commodity/exchange", {
						scoreCommodityId: this.dataList.id,
						userAddressId: this.userAddressId
					}).then(res => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								message: '兑换成功',
								complete() {
									uni.navigateBack({
										delta: 1
									});
								}
							});
						}else{
							this.$refs.uToast.show({
								message: res.message,
							
							});
						}
					})
				}
			},
			OnPushAddress() {
				uni.navigateTo({
					url: '/pages/my/address/index'
				})
			},
			OnpullInGroup(item) {
				let _this = this
				this.$request.post("/coc-social/api/v1/group/pullInGroup", {
					userId: this.dataList.shopUserId,
					groupId: item.id
				}).then(res => {
					_this.showgroup = false
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: res.message,
							type: "success",
							complete() {
								
							}
						});
					} else {
						_this.showgroup = false
						this.$refs.uToast.show({
							message: res.message,
							type: "default",
						});
					}
				})
			},
			changepicker(arr) {
				let _this = this
				let value = arr.value[0].type
				if (value == 1 || value == 2 || value == 3) {
					this.$request.post("/coc-active/api/v1/Follow/update_follow", {
						userId: this.dataList.shopUserId,
						status: value,
						source: '1'
					}).then(res => {
						if (res.code == 200) {
							this.getList()
							this.showinteractive = false
						}
					})
				} else if (value == 4) {
					let data = {
						id: this.dataList.shopUserId,
						nickname: this.dataList.shopName
					}
					uni.navigateTo({
						url: '/pages/service/message/detail?type=0',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('getinfo', {
								data: data
							})
							_this.showinteractive = false
						}
					})
				} else if (value == 5) {
					this.$request.get("/coc-social/api/v1/group/getCircleQueue").then(res => {
						this.mygroup = res.data.my
						this.showgroup = true
						this.showinteractive = false
					})
				}
			},
			Oninteractive() {
				if (this.dataList.isFans == 1) {
					this.columns = [
						[{
								label: '取关',
								type: '2'
							},
							{
								label: '私信',
								type: '4'
							},
							{
								label: '屏蔽',
								type: '3'
							},
							{
								label: '拉入圈子',
								type: '5'
							}
						]
					]
				} else {
					this.columns = [
						[{
								label: '关注',
								type: '1'
							},
							{
								label: '私信',
								type: '4'
							},
							{
								label: '屏蔽',
								type: '3'
							},
							{
								label: '拉入圈子',
								type: '5'
							}
						]
					]

				}

				this.showinteractive = true
			},
			getphone(val) {
				return val.substr(0, 3) + '****' + val.substr(7);
			},
			getsex(val) {
				switch (val) {
					case 1:
						return '先生';
						break;
					case 2:
						return '女士';
						break;
				}
			},
			getname(val) {
				let length = val.length - 1
				let a = val + ''
				let Symbol = ''
				for (let i = 0; i < length; i++) {
					Symbol = Symbol + '*'
				}
				a = a.substr(0, 1) + Symbol

				return a
			},
			getaddress() {
				this.$request.post("/coc-my/api/v1/my/user/address/list", {
					current: 1,
					name: '',
					size: 100
				}).then(res => {
					let arr = {}
					res.data.records.filter(s => {
						if (s.isDefault == 1) {
							arr = s
						}
					})
					if (arr.id) {
						this.address = arr
						this.userAddressId = arr.id
					} else {
						this.userAddressId = ''
					}
				})
			},
			Ontel() {
				let _this = this
				uni.makePhoneCall({
					phoneNumber: _this.dataList.shopMobile
				});
			},
			OnchooseLocation(index) {
				let _this = this
				let lat = ''
				let lng = ''
				lat = _this.dataList.lat
				lng = _this.dataList.lng
				uni.openLocation({
					latitude: lat,
					longitude: lng,
				});
			},
			getList() {
				this.$request.get("/coc-my/api/v1/my/user/score/commodity/" + this.id).then(res => {
					this.dataList = res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.bottom {
		display: flex;
		justify-content: space-between;
		margin-top: 40rpx;

		.btn {
			margin-right: 20rpx;


			text {
				width: 200rpx;
				height: 61rpx;
				background-color: #d91b1b;
				border-radius: 10rpx;
				line-height: 61rpx;
				font-size: 28rpx;
				color: #ffffff;
				text-align: center;
				display: inline-block;
			}
		}
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		margin-left: 18rpx;
		width: 630rpx;
	}

	.pop {
		width: 710rpx;
	}

	.container {
		width: 100%;
		display: flex;
		margin-top: 10rpx;
	}

	.time-container {
		margin-left: auto;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}

	.time {
		width: 70rpx;
		height: 50rpx;
		background-color: #d91b1b;
		border-radius: 10rpx;
		line-height: 50rpx;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		display: inline-block;
	}

	.avatar-container {
		position: relative;
		margin: 10rpx;
	}

	.name {
		text-align: left;
		margin-top: 0;
		font-weight: bold;
		font-size: 32rpx;
	}

	.avatar {
		width: 110rpx;
		height: 110rpx;
		border-radius: 12rpx;
	}

	.session {
		border-radius: 15rpx;
		/* background-color: rgb(200,199,204); */
		background-color: #ffffff;
		margin: 20rpx;
	}

	.add-info {
		margin-left: 40rpx;
		font-size: 28rpx;
	}

	.card {
		background-color: #ffffff;
		border-radius: 10rpx;
		margin: 20rpx;
		padding: 20rpx;
	}

	.user-info {
		margin: 20rpx;
		margin-top: 40rpx;
		display: flex;
		justify-content: space-between;

		.user-avatar {
			display: flex;
		}

		.user-info-detail {
			margin-left: 20rpx;

			.name {
				font-size: 32rpx;
				font-weight: bold;
				color: #222222;
			}
		}

		.user-about {
			color: #666666;
			font-size: 24rpx;
		}

		.btn-follow {
			display: flex;
			justify-content: center;
			border-radius: 10rpx;
			border: solid 2rpx #222222;
			padding-top: 4rpx;
			color: #222222;
			font-size: 24rpx;
			width: 108rpx;
			height: 40rpx;
			line-height: 38rpx;
			position: relative;
			left: 20rpx;
			margin-right: 20rpx;
		}
	}
</style>
