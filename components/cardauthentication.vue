<template>
	<view class="page">
		<u-popup :safeAreaInsetBottom='false' :round='15' :show="showpop" @close="closepop()" mode="center">
			<view class="pop-card">
				<view class="top-img">
					<image style="width: 268rpx;height:65rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230506/file_1683360991929.png">
					</image>
				</view>
				<view class="u-flex jsc">
					<view class="txtLighGray size28 " style="margin-top: 80rpx;width: 598rpx;">
						应国家法规对于账号实名的要求，进行当前操作前，请您先完成实名认证，之后您可以使用发帖、评论等功能。
					</view>
				</view>
				<view style="margin: 20rpx auto;width: 600rpx;">
					<u--form labelPosition="left" :model="data" ref="uForm" labelWidth='80'>
						<u-form-item label="真实姓名" prop="data.name" borderBottom ref="item1">
							<u--input v-model="data.name" border="none"></u--input>
						</u-form-item>
						<u-form-item label="身份证号" prop="data.idCard" borderBottom ref="item1">
							<u--input v-model="data.idCard" border="none"></u--input>
						</u-form-item>
					</u--form>
					<view class="u-flex" style="margin-top: 42rpx;justify-content: center;">
						<view>
							<u-radio-group v-model="radiovalue1" placement="column">
								<u-radio activeColor='#D91B1B' :customStyle="{marginBottom: '8px'}" :name="1">
								</u-radio>
							</u-radio-group>
						</view>
						<text style="font-size: 30rpx;">
							我已阅读并同意
						</text>
						<text @click="OnPushPrivacyPolicy" style="font-size: 30rpx;color: #D91B1B;">
							《个人信息保护声明》
						</text>
					</view>
					<view style="display: flex;justify-content: center;margin-top: 50rpx;">
						<view @click="OnrealNameIdMatch" style="width: 380rpx;
						              height: 76rpx;
						              background: #D91B1B;
						              border-radius: 38rpx;
									  line-height: 76rpx;
									  text-align: center;
									  font-size: 32rpx;
									  color: #ffffff;">
							提交
						</view>
					</view>
					<view class="txtLighGray size28 tac" style="margin-top: 40px;" @click="closepop">
						暂不认证，浏览其它功能~
					</view>
				</view>

			</view>

		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				radiovalue1: false,
				data: {
					name: '',
					idCard: ''
				}
			}
		},
		props: {
			showpop: {
				type: Boolean,
				default: false
			}
		},
		onLoad() {},
		onShow() {
			
		},
		methods: {
			OnrealNameIdMatch() {
				if (!this.data.name) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名',
					});
					return false
				}
				if (!this.data.idCard) {
					uni.showToast({
						icon: 'none',
						title: '请输入身份证号',
					});
					return false
				}
				if(!this.radiovalue1){
					uni.$u.toast('请同意并阅读个人信息保护声明')
					return false
				}
				this.$request.post("/coc-active/api/v1/my/realNameIdMatch", this.data).then(res => {
					if (res.code == 200) {
						uni.$emit('closepop')
							this.$emit('setshowpop')
						uni.setStorageSync('isCertify', 1)
						uni.setStorageSync('realName',this.data.name )
						uni.showToast({
							icon: 'none',
							title: '认证成功',
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
						})
					}
				})
			},
			OnPushPrivacyPolicy() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
				})
			},
			closepop() {
				uni.$emit('closepop')
				this.$emit('setshowpop')
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.top-img {
		position: absolute;
		top: -32rpx;
		left: 50%;
		transform: translate(-50%, 0%);
	}

	.pop-card {
		width: 700rpx;
		background: #FFFFFF;
		border-radius: 30rpx;
	}
</style>
