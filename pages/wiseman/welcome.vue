<template>
	<view class="page">
		<view style="text-align: center;">
			<image mode="widthFix" style="width: 700rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230524/file_1684890652445.png">
			</image>
		</view>
		<view @click="OnmakePhoneCall" style="text-align: center;margin-top: 20rpx;">
			<image mode="widthFix" style="width: 715rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221112/073e9ea9c2a44986bead88f6c2bc4357.png">
			</image>
		</view>
		<view class="bgfff" style="padding:10rpx 25rpx;margin: 25rpx;">
			<u--form :model="form" ref="uForm1" labelWidth='80'>
				<u-form-item :required='true' label="姓名" prop="expertName" :rules="rules">
					<u-input placeholder="请输入真实姓名" borderBottom border="none" v-model="form.expertName" />
				</u-form-item>
				<view style="margin-top: -10rpx;margin-bottom: -10rpx;">
					<u-divider :text="null"></u-divider>
				</view>

				<u-form-item :required='true' label="手机号" prop="mobile" :rules="rules">
					<u-input disabledColor='#ffffff' :disabled='true' placeholder="请输入本人手机号码" borderBottom border="none" v-model="form.mobile" />
				</u-form-item>

			</u--form>

		</view>
		<view class="u-flex size24" style="margin-top: 42rpx;justify-content: center;">
			<view>
				<u-radio-group v-model="radiovalue1" placement="column">
					<u-radio activeColor='#D91B1B' :customStyle="{marginBottom: '8px'}" :name="1">
					</u-radio>
				</u-radio-group>
			</view>
			<text>我已阅读并同意</text>
			<text @click="OnPushwisemanPolicy" style="color: #D91B1B">
				《达人入驻协议》
			</text>
			<text>和</text>
			<text @click="OnPushPrivacyPolicy" style="color: #D91B1B">
				《个人信息保护声明》
			</text>
		</view>
		<view class="bottom-next">
			<text @click="OnNext">升级达人</text>
		</view>
		<view style="height: 50rpx;">

		</view>
	</view>
</template>

<script>
	import {
		getstorage,tologin
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				expertParentId:null,
				radiovalue1: '',
				rules: {
					'mobile': [{
							required: true,
							message: '请输入手机号',
							trigger: ['change', 'blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// uni.$u.test.mobile()就是返回true或者false的
								return uni.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					'expertName': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
				},
				form: {
					expertName: '',
					mobile: getstorage('mobile')
				}
			}
		},

		onLoad(option) {
			console.log(option)
			if(option.scene){
				this.expertParentId=option.scene
			}
			if(option.expertParentId){
				this.expertParentId=option.expertParentId
				if(option.isnext==1){
					return false
				}
			}
			
			if (tologin() !== true) {
				return
			}
			this.getstatus()
			
		},
		onShow() {
			this.form.mobile=getstorage('mobile')
		},
		onReady() {
			this.$refs.uForm1.setRules(this.rules)
		},
		methods: {
			getstatus(){
						this.$request.post("/coc-active/api/v1/expert/echoVerify").then(res => {
							if(res.code == 1101){
								return false
							}
							else if(res.data.status==2){
					
								uni.$u.toast('您已成为达人。请勿重复操作')
								setTimeout(() => {
								uni.switchTab({
									url: "/pages/home/my"
								})
								}, 2000)
								
							}else if (res.data.status==1){
								uni.navigateTo({
									url: "/pages/wiseman/applying"
								})
							}else if (res.data.status==3){
								uni.navigateTo({
									url: "/pages/wiseman/refuse?id="+this.expertParentId
								})
							}
						})
			},
			OnPushwisemanPolicy() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/club_cooperation_agreement.html',
				})
			},
			OnPushPrivacyPolicy() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
				})
			},
			OnNext() {
				
				let _this = this
				if (!this.radiovalue1) {
					uni.$u.toast('请同意并阅读以下协议')
					return false
				}
				uni.requestSubscribeMessage({
				    tmplIds: [
				        'qgGX0K_PPv65088pNUsqknop_Yc9zbl-thBq3Hyk2uw'
				    ],
				    success(res) { }
				})
				this.$refs.uForm1.validate().then(res => {
					this.$request.post("/coc-active/api/v1/expert/upgradeExpert/v2",{
						expertParentId:this.expertParentId,
						expertName:this.form.expertName,
						mobile:this.form.mobile
					}).then(res=>{
						if(res.code==200){
							uni.navigateTo({
								url: "/pages/wiseman/applying"
							})
						}else{
							uni.$u.toast(res.message)
						}
					})
				})
			},
			OnmakePhoneCall() {
				uni.makePhoneCall({
					phoneNumber: '4008-010-111' //仅为示例
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.OnNext {}

	.bottom-next {
		text-align: center;
		margin-top: 60rpx;

		text {
			display: inline-block;
			border-radius: 40rpx;
			width: 600rpx;
			height: 80rpx;
			background-color: #D91B1B;
			text-align: center;
			line-height: 80rpx;
			color: #ffffff;
			font-size: 34rpx;
			font-weight: 400;
		}
	}
</style>
