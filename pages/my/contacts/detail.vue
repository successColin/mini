<template>
	<view class="page">
		<view class="contacts">
			<view class="contacts-item">
				<view class="contacts-item-label">类型</view>
				<view class="contacts-item-select-text"
					:class="dataList.type==1?['contacts-item-select2']:['contacts-item-select1']"
					@click="dataList.type=1">
					成人
					<image v-if="dataList.type==1" class="contacts-item-icon" src="@/static/image/dagou.png"></image>
				</view>
				<view class="contacts-item-select-text"
					:class="dataList.type==2?['contacts-item-select2']:['contacts-item-select1']"
					style="margin-left: 45rpx;" @click="dataList.type=2">
					儿童
					<image v-if="dataList.type==2" class="contacts-item-icon" src="@/static/image/dagou.png"></image>
				</view>
			</view>
			<view class="contacts-item">
				<view class="contacts-item-label">姓名<text class="contacts-required">*</text></view>
				<u--input placeholder="请准确输入姓名" border="none" v-model="dataList.name"
					placeholderStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #999999;"
					fontSize="28rpx" color="#222222"></u--input>
			</view>
			<view class="contacts-item">
				<view class="contacts-item-label">身份证号<text class="contacts-required">*</text></view>
				<u--input placeholder="请准确输入身份证号" border="none" v-model="dataList.idCard"
					placeholderStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #999999;"
					fontSize="28rpx" color="#222222"></u--input>
			</view>
			<view class="contacts-item">
				<view class="contacts-item-label">手机号</view>
				<u--input placeholder="请准确输入手机号" border="none" v-model="dataList.mobile"
					placeholderStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 400;color: #999999;"
					fontSize="28rpx" color="#222222"></u--input>
			</view>
		</view>
		<view style="font-size: 24rpx;color: #999999;margin-top: 16rpx;">*因部分活动需要为您购买保险，所以身份证为必填项</view>
		<view class="btn-view">
			<view class="btn" @click="OnSave">
				<text>保存</text>
			</view>
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
				dataList: {
					id: '',
					name: '',
					type: '1',
					idCard: '',
					mobile: ''
				}

			}
		},
		onLoad(option) {
			if (option.id) {
				this.dataList.id = option.id
				uni.setNavigationBarTitle({
					title: '人员编辑'
				})
				this.getdetail(option.id)

			} else {
				uni.setNavigationBarTitle({
					title: '人员新增'
				});
			}
		},
		onShow() {},
		onUnload() {
			uni.$emit('refresh')
		},
		methods: {
			getdetail(id) {
				this.$request.get('/coc-my/api/v1/userContacts/details/' + id).then(res => {
					this.dataList = res.data
					this.dataList.type = this.dataList.type + ''
				})
			},
			OnSave() {
				let url = ''
				if (!this.dataList.name) {
					uni.$u.toast('请填写姓名')
					return false
				}
				if (!this.dataList.idCard) {
					uni.$u.toast('请填写身份证号')
					return false
				}
				if (!uni.$u.test.idCard(this.dataList.idCard)) {
					uni.$u.toast('请填写正确的身份证号')
					return false
				}
				if (this.dataList.type == 1) {
					if (!this.dataList.mobile) {
						uni.$u.toast('成人用户请填写手机号码')
						return false
					}
					let reg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
					if (!reg.test(this.dataList.mobile)) {
						uni.showToast({
							icon: 'none',
							title: '请输入正确的11位手机号'
						})
						return false
					}
				}
				if (this.dataList.id) {
					url = '/coc-my/api/v1/userContacts/edit'
				} else {
					url = '/coc-my/api/v1/userContacts/add'
				}
				this.$request.post(url, this.dataList).then(s => {
					if (s.code == 200) {
						this.$refs.uToast.show({
							message: this.dataList.id ? '修改成功' : '添加成功',
							type: "success",
							complete() {
								uni.navigateBack({
									delta: 1
								})
							}
						})
					} else {
						uni.$u.toast(s.message)
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx 25rpx 0 25rpx;
		color: #222222;
	}

	.contacts {
		padding: 0 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;

		.contacts-item-select1 {
			width: 80rpx;
			height: 37rpx;
			border-radius: 10rpx;
			background: rgba(248, 248, 248, 0.96);
			border: 1px solid #F8F8F8;
			position: relative;
		}

		.contacts-item-select2 {
			width: 80rpx;
			height: 37rpx;
			border-radius: 10rpx;
			background: rgba(217, 27, 27, 0.05);
			border: 1px solid #D91B1B;
			color: #D91B1B;
			position: relative;
		}

		.contacts-item-icon {
			width: 18rpx;
			height: 18rpx;
			position: absolute;
			bottom: 0;
			right: 0;
		}

		.contacts-item-select-text {
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.contacts-item {
			padding: 35rpx 0;
			border-top: 1rpx solid #EBEBEB;
			display: flex;
			align-items: center;
		}

		.contacts-item:first-child {
			padding: 35rpx 0;
			border-top: 0;
		}

		.contacts-item-label {
			width: 170rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
		}

		.contacts-required {
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #D91B1B;
			position: relative;
			top: -6rpx;
			left: 6rpx;
		}
	}

	.btn-view {
		margin-top: 215rpx;
		display: flex;
		justify-content: center;

		.btn {
			width: 600rpx;
			height: 80rpx;
			background: linear-gradient(-82deg, #C31D1D, #D91B1B);
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			text {
				font-size: 34rpx;
				font-family: Alibaba PuHuiTi;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>
