<template>
	<view class="page">
		<view class="card">
			<view class="u-flex jsb" style="align-items: flex-end">
				<view class="size32 fwb">上传行驶证照片</view>
				<view class="mainRed size24">需上传本人车辆行驶证</view>
			</view>
			<view style="margin-top: 30rpx;">
				<ocr-navigator @onSuccess="driverSuccess" certificateType="drivingLicense"
					selectedOptions="{['plateNum','vehicleType','owner']}">
					<image style="width: 650rpx;height: 318rpx;x;" :src="cardurl"></image>

				</ocr-navigator>
			</view>
		</view>
		<view class="card">
			<view class="u-flex jsb size28 fwb">
				<view>所有人</view>
				<view>{{realName}}</view>
			</view>
			<u-divider :text="null"></u-divider>
			<view class="u-flex jsb size28 fwb">
				<view>车牌号</view>
				<view>{{dataList.plate}}</view>
			</view>
		</view>
		<view class="tac size24 txtLighGray">
			信息识别有误？请重新上传清晰度高的行驶证照片
		</view>
	<!-- 	<view class="card u-flex jsb">
			<view class="size28 fwb">身份证号</view>
			<view>
				<u--input placeholder="请输入本人身份证号码" border="none" v-model="idCard" type="idcard"></u--input>
			</view>
		</view> -->
		<view @click="Onnext" class="btn-save">
			下一步
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
				cardurl: 'https://oss.dcqcjlb.com/51che_java_dev/20230710/file_1688959677508.png',
				idCard: '',
				show: false,
				dataList: {},
				realName: ''
			}
		},

		onLoad() {
			this.realName = uni.getStorageSync("realName")
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getData', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.dataList = data.data
				})
			})
		},
		onShow() {},
		methods: {
			Onnext(){
				if (!this.dataList.plate) {
					uni.$u.toast('请扫描行驶证')
					return false
				}
				this.$request.post("/coc-my/api/v1/my/user/car/drivingLicenseRecognition",{
					// idCard:this.idCard,
					realName:this.realName
				}).then(res=>{
					if(res.code==200){
						this.OnSave()
					}else{
							uni.$u.toast(res.message)
					}
				})
			},
			driverSuccess(e) {
				let _this = this
			console.log(e)
				if(e.detail.owner.text!=uni.getStorageSync("realName")){
					uni.$u.toast('车辆与本人实名信息不匹配,请上传本人车辆行驶证。')
					return false
				}
				
				uni.uploadFile({
					url: getApp().globalData.uploadUrl,
					filePath: e.detail.image_path,
					name: 'file',
					formData: {
						'file': e.detail.image_path
					},
					header: {
						"Content-Type": 'multipart/form-data'
					},
					success: (uploadFileRes) => {
						_this.cardurl = JSON.parse(uploadFileRes.data).data
						_this.dataList.plate = e.detail.plate_num.text
					}
				});
			},
			OnSave() {	
				this.dataList.realName=this.realName
				this.dataList.drivingLicense=this.cardurl
				this.$request.post("/coc-my/api/v1/my/user/car/add", this.dataList).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							type: 'success',
							message: '添加成功',
							complete() {
						uni.reLaunch({
						    url: "/pages/my/mycar/index"
						})
							}
						});
					} else {
						uni.$u.toast(res.message)
					}
				})
			},


		}
	}
</script>

<style lang="scss">
	.page {}


	.card {
		margin: 25rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 25rpx;
	}

	.btn-save {
		width: 600rpx;
		height: 80rpx;
		background: #d91b1b;
		border-radius: 40rpx;
		text-align: center;
		line-height: 80rpx;
		color: #ffffff;
		font-size: 32rpx;
		margin: 400rpx auto;
	}
</style>
