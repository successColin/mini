<template>
	<view class="page">
		<view style="text-align: center;margin-top: 84rpx;">
			<image style="width: 529rpx;height: 142rpx;" src="@/pages/activity/static/image/logo.png"></image>
		</view>
		<view style="margin-top: 94rpx;text-align: center;">
			<image style="width: 649rpx;height: 730rpx;" src="@/pages/activity/static/image/shareimg.png"></image>
		</view>
		<view>
			<button openType="getPhoneNumber" @getphonenumber='getPhoneNumber' class="nowBtn">
				实名认证登陆
			</button>
		</view>
		<view class="footer">
			<view class="checkbox">
				<view style="position: absolute;top: -30px;left: 24px;">
					<image v-if="showBubble" style="width: 250rpx;height: 54rpx;"
						src="@/pages/activity/static/image/Bubble.png"></image>
				</view>
				<checkbox-group placement="column" @change="checkboxChange">
					<checkbox iconSize='26' style="transform:scale(0.7)" color="#db1a1b"
						:customStyle="{marginBottom: '8px'}" :checked="isAgree">
					</checkbox>
				</checkbox-group>
				<view class="xieyi">
					<text>我已阅读并同意51车俱乐部</text>
					<text @click="OnPushUserAgreement" style="color:#db1a1b;">《用户协议》</text>和
					<text @click="OnPushPrivacyPolicy" style="color:#db1a1b;">《隐私政策》</text>
				</view>
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		setstorage,getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				showBubble: false,
				isAgree: false,
					phoneCode: '',
						inviteId: ''
			}
		},

		onLoad(option) {
			if (option.scene) {
				this.inviteId = option.scene
			}
			if(getstorage('token')){
				this.$request.post("/coc-active/api/v1/user/channel/scan/log",{
					userChannelId:option.scene,
					userId:getstorage('userId')
				}).then(res=>{
					uni.switchTab({
						url: '/pages/home/index'
					});
				})
				
			}
		},
		onShow() {},
		methods: {
			getinfo() {
				this.$request.get('/coc-my/api/v1/my/findUser').then(res => {
					setstorage('headImg', res.data.user.headImg)
					setstorage('nickname', res.data.user.nickname)
					setstorage('userType', res.data.user.userType)
					setstorage('userId', res.data.user.id)
					setstorage('isCertify', res.data.user.isCertify)
					setstorage('realName', res.data.user.realName)
					setstorage('mobile', res.data.user.mobile)
					if (res.data.shop == null) {
						setstorage('status', null)
						setstorage('shopId', null)
						setstorage('shopName', null)
						setstorage('shopTypeId', 0)
						setstorage('shopType', null)
					} else {
						setstorage('status', res.data.shop.status)
						setstorage('shopId', res.data.shop.id)
						setstorage('shopName', res.data.shop.shopName)
						setstorage('shopTypeId', res.data.shop.shopTypeId)
						setstorage('shopType', res.data.shop.status)
					}
				})
			
			},
			loginNow(phoneCode, openCode, photo, nick) {
				let that = this;
				uni.request({
					url: 'http://coc.51api.dcqcjlb.com/coc-oauth/oauth/token',
					method: 'POST',
					data: {
						phoneCode: phoneCode,
						openCode: openCode,
						grant_type: 'canal',
						userChannelId: this.inviteId + ''
					},
					header: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic Y29jLWFwcDoxMjM0NTY=',
					},
					success: (res) => {
					  if (res.data.code == 200) {
							this.$refs.uToast.show({
								message: "登录成功",
								type: "success",
								complete() {
									setstorage('openid', res.data.data.openid)
									uni.setStorage({
										key: 'token',
										data: res.data.data.access_token,
										success: function() {
											that.getinfo()
										uni.switchTab({
																						url: "/pages/home/index"
																					})
											
										}
									});
								}
							});
						}
					},
					fail: (err) => {
						uni.showToast({
							title: err.msg,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			getopencode(phoneCode) {
				let _this = this
				uni.login({
					provider: 'weixin',
					onlyAuthorize: true,
					success: function(loginRes) {
						_this.openCode = loginRes.code
						_this.loginNow(phoneCode, loginRes.code, '', '')
					}
				})
			},
		getPhoneNumber(val) {
			if(!this.isAgree){
				this.showBubble = true
				return false
			}
			this.phoneCode = val.detail.code
			this.getopencode(val.detail.code)
		},
			checkboxChange(val) {
				this.isAgree = !this.isAgree
				if (this.isAgree) {
					this.showBubble = false
				}
			},
			OnPushUserAgreement() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_service.html',
				})
			},
			OnPushPrivacyPolicy() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html',
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.nowBtn {
		width: 650rpx;
		height: 88rpx;
		line-height: 88rpx;
		background: #D91B1B;
		border-radius: 50rpx;
		text-align: center;
		color: #fff;
		font-size: 32rpx;
		margin: 85rpx auto;
		margin-bottom: 0rpx;
		background: #D91B1B;
		color: #fff;
	}

	.footer {
		margin-top: 40rpx;

		.checkbox {
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;

			.xieyi {
				font-size: 24rpx;
				color: #666666;
			}
		}
	}
</style>