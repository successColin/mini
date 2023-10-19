<template>
	<view class="page">
		<view v-if="dataList.length==0" style="text-align: center;margin-top: 330rpx;">
			<image style="width: 254rpx;height: 254rpx;" src="../static/image/zanwudizhi.png"></image>
			<view style="font-size: 24rpx;color: #999999;margin-top: 94rpx;">
				暂无地址
			</view>
		</view>
		<view v-else>
			<view class="card" v-for="(item,index) in dataList" :key="index" @click="OnChoose(item)">
				<view class="card-left">
					<view v-if="item.addressTag=='家庭'">
						<image style="width: 40rpx;height: 40rpx;" src="../static/image/jiating.png"></image>
					</view>
					<view v-else-if="item.addressTag=='公司'">
						<image style="width: 40rpx;height: 40rpx;" src="../static/image/gongsi.png"></image>
					</view>
					<view v-else-if="item.addressTag=='学校'">
						<image style="width: 40rpx;height: 40rpx;" src="../static/image/xuexiao.png"></image>
					</view>
					<view style="margin-left: 18rpx;">
						<view class="u-flex">
							<view style="font-size: 32rpx;font-weight: bold;">
								{{getname(item.name)}}
							</view>
							<view style="font-size: 32rpx;font-weight: bold;margin-left: 20rpx;">
								{{getphone(item.mobile)}}
							</view>
							<view v-if="item.isDefault==1" class="isdefault">
								默认
							</view>
						</view>
						<view style="font-size: 24rpx;color: #666666;margin-top: 20rpx;">
							{{item.addressDetail}}
						</view>
					</view>
				</view>
				<view style="width: 80rpx;" @click.stop="OnSetAddress(item)">
					<image style="width: 26rpx;height: 26rpx;" src="../static/image/bianji.png"></image>
				</view>
			</view>
		</view>
		<view class="btn-add">
			<text @click="OnAddAddress">新增联系地址</text>
		</view>
		<u-toast ref="uToast"></u-toast>
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
		computed: {

		},
		methods: {
		
			OnChoose(item) {
				uni.$emit('sendinfo', {
					info: item
				})
				uni.navigateBack({
					delta: 1
				});
			},
			setDefault(id) {
				let _this = this
				this.$request.get("/coc-my/api/v1/my/user/address/setDefault/" + id).then(res => {
					this.$refs.uToast.show({
						message: "操作成功",
						type: "success",
						complete() {
							_this.getList()
						}
					});
				})
			},
			getList() {
				this.$request.post('/coc-active/api/v1/user/address/list', {
					current: 1,
					size: 100
				}).then(res => {
					this.dataList = res.data.records
				})
			},
			OnSetAddress(item) {
				uni.navigateTo({
					url: '/pages/my/address/addAddress?isadd=0',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('getaddressdetail', {
							data: item
						})
					}
				})

			},
			OnAddAddress() {
				uni.navigateTo({
					url: "/pages/my/address/addAddress?isadd=1"
				})
			},
			getphone(val) {
				return val.substr(0, 3) + '****' + val.substr(7);
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
		}
	}
</script>

<style lang="scss">
	.card {
		background-color: #ffffff;
		padding: 34rpx 25rpx;
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	.btn-add {
		position: fixed;
		bottom: 200rpx;
		text-align: center;
		left: 50%;
		transform: translate(-50%, -50%);

		text {
			width: 300rpx;
			height: 80rpx;
			display: inline-block;
			line-height: 80rpx;
			color: #ffffff;
			background-color: #D91B1B;
			font-size: 28rpx;
			border-radius: 40rpx;
		}
	}

	.card-left {
		display: flex;
		align-items: center
	}

	.isdefault {
		margin-left: 20rpx;
		width: 80rpx;
		height: 33rpx;
		line-height: 33rpx;
		border: 1rpx solid #D91B1B;
		border-radius: 17rpx;
		line-height: 33rpx;
		text-align: center;
		color: #D91B1B;
		font-size: 20rpx;
	}
</style>
