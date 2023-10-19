<template>
	<view class="page">
		<view class="card-hy">
			<u-form-item label="行业"  :required='true'>
				<view @click="OnMccCode">
					<u--input inputAlign='right' border="none" :disabled='true' placeholder="请选择行业"
						v-model="dataList.mccMsg" :customStyle="{backgroundColor:'#ffffff'}">
					</u--input>
				</view>
			</u-form-item>
		</view>
		<view class="card">
			<view class="title">
				营业执照
			</view>
			<!--  #ifdef MP-WEIXIN  -->
			<ocr-navigator @onSuccess="CardlicenseImg" certificateType="businessLicense">
				<view class="yingyezhizhao">
					<image :src="dataList.licenseImg" style="height: 300rpx;"></image>
				</view>
			</ocr-navigator>
			<!--  #endif -->
		</view>
		<view class="card">
			<view class="title">
				法定代表人身份证
			</view>
			<!--  #ifdef MP-WEIXIN  -->
			<ocr-navigator @onSuccess="CardFrontImg" certificateType="idCard" :opposite="fals">
				<view class="zhengmian">
					<image :src="dataList.juridicalIdCardFrontImg" style="	height: 300rpx;"></image>
				</view>
			</ocr-navigator>
			<ocr-navigator @onSuccess="CardBackImg" certificateType="idCard" :opposite="true">
				<view class="fanmian">
					<image :src="dataList.juridicalIdCardBackImg" style="height: 300rpx;"></image>
				</view>
			</ocr-navigator>
			<!--  #endif -->
		</view>
		<view class="card" v-if="dataList.isLineLedger==1">
			<view class="title">
				51车俱乐部小程序“我的”页面截图
			</view>
			<view class="screenshot" @click="Onscreenshot">
				<image :src="dataList.screenshotImg" style="height: 300rpx;"></image>
			</view>
		</view>
		<view class="card">
			<view class="title">
				门店照片
			</view>
			<view class="Doorhead" @click="OnDoorhead">
				<image :src="dataList.DoorheadImg" style="height: 300rpx;"></image>
			</view>
			<view class="Indoor" @click="OnIndoor(1)">
				<image :src="dataList.IndoorImg" style="height: 300rpx;"></image>
			</view>
			<view class="Indoor" @click="OnIndoor(2)">
				<image :src="dataList.indoorPhotograph2" style="height: 300rpx;"></image>
			</view>
		</view>
		<view class="card" v-if="qualificationsList.length>0">
			<view class="title" >
				特殊资质
			</view>
	<view v-for="(item,index) in qualificationsList" :key="index" @click="Onspecialimg(index)">
		<view v-if="!qualificationsImg[index]" class="Indoor-special" >
			<view class="tac txtLighGray size24" style="position: relative;top: 60%;">
				{{item}}
			</view>
		</view>
		<view v-else class="Indoor-special" :style="{ backgroundImage: 'url(' + qualificationsImg[index] + ')', }">
		</view>
	</view>
		</view>
		<view v-if="isshow" class="bottom-btn">
			<text @click="Submit">下一步</text>
		</view>
		<view style="height: 60rpx;"></view>
		<u-toast ref="uToast"></u-toast>
		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
	<u-popup :safeAreaInsetBottom='false' :show="mccshow" @close="mccshow=false" mode="center">
		<view class="pop-mcc">
			<view class="tags">
				<view :class="{'current-tags':index==currentmcc}" class="tags-type" v-for="(item,index) in industrylist"
					:key="item" @click="currentmcc=index">{{item.typeMsg}}</view>
			</view>
			<view style="margin-top: 40rpx 20rpx 20rpx 20rpx;">
				<view class="scc-value mccitem" v-for="(item1,index1) in industrylist[currentmcc].industryVOS" :key="index1"
					@click="Onchoosemcc(item1)">
					<view class="u-flex jsb alc ">
							<view style="width: 480rpx;">
								{{item1.mccMsg}}
							</view>
							<view>
								<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
							</view>
					</view>
				</view>
			</view>
		</view>
	</u-popup>
	</view>

</template>

<script>
	import {
		pathToBase64,
	} from 'image-tools'
	export default {
		components: {

		},
		data() {
			return {
				currentmcc: 0,
				showloading: false,
				base64: '',
				type: '',
				isshow: true,
				mccshow: false,
				industrylist:[],
					currentmcc: 0,
						qualificationsList:[],
						qualificationsImg:[],
				dataList: {
					qualificationsImg:[],
					mccCode:'',
					mccMsg: '',
					bankImgFront: '',
					bankImgBack: '',
					selfieImg: '',
					licenceOpening: '',
					indoorPhotograph: '',
					doorheadPhoto: '',
					appScreenshot: '',
					bnfHomeAddr: '',
					bnfCertExpire: '',
					bnfCertno: '',
					bnfName: '',
					companyAddrExt: '',
					companyCertExpire: '9999-12-31',
					shareholderHomeAddr: '',
					shareholderCertExpire: '',
					shareholderCertno: '',
					shareholderName: '',
					companyName: '',
					companyCertNo: '',
					legalmanHomeAddr: '',
					legalIdcardNo: '',
					legalName: '',
					juridicalIdCardFrontImg: '',
					juridicalIdCardBackImg: '',
					licenseImg: '',
					picList: [],
					legalCardDeadline: '',
					screenshotImg: '',
					regMerType: '00',
					bankAcctType: '1',
					shareHolderType: '1',
					bnfType: '1',				
					bnfList: [{
						bnfName: '',
						bnfCertno: '',
						bnfCertExpire: '',
						bnfCertType: '1',
						bnfHomeAddr: ''
					}]
				}
			}
		},

		onLoad(option) {
			this.dataList.shopTypeId = option.shopTypeId
			this.type = option.type
			if (option.isshow == 1) {
				this.isshow = false
				uni.setNavigationBarTitle({
					title: "个体工商户入驻资料查看"
				})
				this.getList()
			} else if (option.isshow == 2) {
				//重新上传用
				this.getallList()
			}
			if (option.sourceType) {
				this.dataList.sourceType = option.sourceType
			}
			if (option.operateId) {
				this.dataList.operateId = option.operateId
			}
			if (option.operateId) {
				this.dataList.operateId = option.operateId
			}
			if (option.affiliationType) {
				this.dataList.affiliationType = option.affiliationType
			}
			if (option.isLineLedger) {
				this.dataList.isLineLedger = option.isLineLedger
			}
					console.log(this.dataList)
		},
		onShow() {},
		methods: {
			Onspecialimg(index){
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						_this.uploadimg(res.tempFilePaths[0], index)					
					}
				});
			},
			Onchoosemcc(item){
				this.mccshow=false
				this.dataList.mccCode=item.mccCode
				this.dataList.mccMsg=item.mccMsg
				this.qualificationsList=item.qualificationsList
				this.qualificationsImg=[]
			},
			OnMccCode(){
				if(!this.isshow){
					return false
				}
				this.$request.post("/coc-merchant-app/app/v1/merchantsettledin/selectIndustry").then(res=>{
					this.industrylist=res.data
					this.mccshow=true
				})
			},
			getallList() {
				this.$request.post("/coc-active/api/v1/merchantsettledin/dataEcho", {
					echoType: '4'
				}).then(res => {
				this.dataList = res.data.merchansettledinDTO
				this.dataList.screenshotImg = res.data.merchansettledinDTO.appScreenshot
				this.dataList.DoorheadImg = res.data.merchansettledinDTO.doorheadPhoto
				this.dataList.IndoorImg = res.data.merchansettledinDTO.indoorPhotograph
				this.dataList.indoorPhotograph2 = res.data.merchansettledinDTO.indoorPhotograph2
				this.dataList.bnfList=[]
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v1/merchantsettledin/dataEcho", {
					echoType: '1'
				}).then(res => {
					this.dataList.licenseImg = res.data.settlementMaterials.licenseImg
					this.dataList.juridicalIdCardFrontImg = res.data.settlementMaterials.juridicalIdCardFrontImg
					this.dataList.juridicalIdCardBackImg = res.data.settlementMaterials.juridicalIdCardBackImg
					this.dataList.screenshotImg = res.data.settlementMaterials.appScreenshot
					this.dataList.DoorheadImg = res.data.settlementMaterials.indoorPhotograph
					this.dataList.IndoorImg = res.data.settlementMaterials.doorheadPhoto
					this.dataList.indoorPhotograph2 = res.data.settlementMaterials.indoorPhotograph2
					this.dataList.mccMsg=res.data.settlementMaterials.industryMsg
					this.qualificationsImg=res.data.settlementMaterials.qualificationsImg.split(",")
					this.qualificationsList=res.data.settlementMaterials.qualificationsImg.split(",")
				})
			},
			Submit() {
				let _this = this
			
				if (this.dataList.juridicalIdCardFrontImg && this.dataList.juridicalIdCardBackImg && this.dataList
					.licenseImg  && this.dataList.DoorheadImg && this.dataList.IndoorImg&&this.dataList.indoorPhotograph2&&this.dataList.mccCode) {
						if(this.dataList.isLineLedger==1&&!this.dataList.screenshotImg){
							this.$refs.uToast.show({
								type: 'default',
								message: "请上传'我的'页面截图",
							})
							return false
						}
				let num=0
						this.qualificationsImg.filter(s=>{
							if(s){
								num++
							}
						})
				if(num!=this.qualificationsList.length){
					this.$refs.uToast.show({
						type: 'default',
						message: '请上传特殊资质图片',
					})
					return false
				}
				if(this.qualificationsImg){
					this.dataList.qualificationsImg=this.qualificationsImg.join(",")
				}
					this.dataList.picList.filter(res => {
						if (res.document_type == '0001') {
							res.document_name = '法人身份证'
						} else if (res.document_type == '0011') {
							res.document_name = '身份证反面'
						} else if (res.document_type == '0002') {
							res.document_name = '商户营业执照'
						} else if (res.document_type == '0034') {
							res.document_name = '商户网站/APP截图'
						} else if (res.document_type == '0005') {
							res.document_name = '门头照片'
						} else if (res.document_type == '0015') {
							res.document_name = '室内照片'
						}
					})

					this.dataList.regMerType = '01'
					this.dataList.bankAcctType = '0'
					this.dataList.shareHolderType = '1'
					this.dataList.bnfType = '1'
					uni.navigateTo({
						url: '/pages/Settlein/individualInfo',
						success: function(res) {
							// 通过eventChannel向被打开页面传送数据
							res.eventChannel.emit('getinfo', {
								data: _this.dataList
							})
						}
					})
				} else {
					this.$refs.uToast.show({
						type: 'default',
						message: '请上传个体工商户入驻资料',
					})
				}
			},
			uploadPictures(path, type) {
				let add = false
				this.$newrequest.post("/coc-active/api/v1/merchantsettledin/uploadPictures", {
					img: path
				}).then(res => {

					this.dataList.picList.filter((s, i) => {
						if (s.document_type == type) {
							add = true
							this.dataList.picList[i] = {
								document_type: type,
								file_path: res.data.filePath,
								file_size: res.data.fileSize
							}
						}
					})
					if (!add) {
						this.dataList.picList.push({
							document_type: type,
							file_path: res.data.filePath,
							file_size: res.data.fileSize
						})
					}
					this.showloading = false
				})
			},
			getbase64(img, type) {
				pathToBase64(img)
					.then(path => {
						this.uploadPictures(path, type)
					})
					.catch(error => {
						console.error(error)
					})

			},
			OnIndoor(index) {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
					if(index==1){
						_this.dataList.IndoorImg = res.tempFilePaths[0]
						_this.uploadimg(res.tempFilePaths[0], 'indoorPhotograph')
						_this.getbase64(res.tempFilePaths[0], '0015')
					}else{
						_this.dataList.indoorPhotograph2 = res.tempFilePaths[0]
						_this.uploadimg(res.tempFilePaths[0], 'indoorPhotograph2')
						// _this.getbase64(res.tempFilePaths[0], '内部字段')
					}

					}
				});
			},
			OnDoorhead() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						_this.dataList.DoorheadImg = res.tempFilePaths[0]
						_this.uploadimg(res.tempFilePaths[0], 'doorheadPhoto')
						_this.getbase64(res.tempFilePaths[0], '0005')

					}
				});
			},
			Onscreenshot() {
				let _this = this
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						_this.dataList.screenshotImg = res.tempFilePaths[0]
						_this.uploadimg(res.tempFilePaths[0], 'appScreenshot')
						_this.getbase64(res.tempFilePaths[0], '0034')

					}
				});
			},
			uploadimg(url, name) {
				this.showloading = true
				uni.uploadFile({
					url: getApp().globalData.uploadUrl,
					filePath: url,
					name: 'file',
					formData: {
						'file': url
					},
					header: {
						"Content-Type": 'multipart/form-data'
					},
					success: (uploadFileRes) => {
						if (name == 'appScreenshot') {
							this.dataList.appScreenshot = JSON.parse(uploadFileRes.data).data
						} else if (name == 'doorheadPhoto') {
							this.dataList.doorheadPhoto = JSON.parse(uploadFileRes.data).data
						} else if (name == 'indoorPhotograph') {
							this.dataList.indoorPhotograph = JSON.parse(uploadFileRes.data).data
						}else if (name=='indoorPhotograph2'){
							this.dataList.indoorPhotograph2 = JSON.parse(uploadFileRes.data).data
							this.showloading = false
						}else{
								this.qualificationsImg[name] = JSON.parse(uploadFileRes.data).data
								this.showloading = false
						}
					}
				});
			},
			CardlicenseImg(e) {
				if(e.detail.reg_num.text.length==20){
					this.dataList.shopLic = e.detail.reg_num.text.substring(0,18)
				}else if(e.detail.reg_num.text.length==17){
					this.dataList.shopLic = e.detail.reg_num.text.substring(0,15)
				}else{
					this.dataList.shopLic = e.detail.reg_num.text
				}
				this.dataList.shopName = e.detail.enterprise_name.text
				this.dataList.shopAddrExt = e.detail.address.text
				let _this = this
				this.showloading=true
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
						_this.dataList.licenseImg = JSON.parse(uploadFileRes.data).data
						_this.getbase64(e.detail.image_path, '0002')
					}
				});
			},
			CardBackImg(e) {
				let valid_date = e.detail.valid_date.text.substr(e.detail.valid_date.text.lastIndexOf("-") + 1, 8);
				valid_date = valid_date.slice(0, 4) + '-' + valid_date.slice(4)
				valid_date = valid_date.slice(0, 7) + '-' + valid_date.slice(7)
				this.dataList.legalCardDeadline = valid_date
				let _this = this
				this.showloading = true
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
						_this.dataList.juridicalIdCardBackImg = JSON.parse(uploadFileRes.data).data
						_this.getbase64(e.detail.image_path, '0011')
					}
				});
			},
			CardFrontImg(e) {
				this.dataList.legalName = e.detail.name.text
				this.dataList.legalIdcardNo = e.detail.id.text
				this.dataList.legalmanHomeAddr = e.detail.address.text
				let _this = this
				this.showloading = true
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
						_this.dataList.juridicalIdCardFrontImg = JSON.parse(uploadFileRes.data).data
						_this.getbase64(e.detail.image_path, '0001')
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 20rpx;
		background-color: #ffffff;
		padding: 40rpx;
		border-radius: 14rpx;

		.zhengmian {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217537008.png');
			background-size: 100% 100%;
		}

		.fanmian {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217569265.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}

		.yingyezhizhao {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721244760.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}

		.screenshot {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217600639.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}

		.Doorhead {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217453529.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}

		.Indoor {
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217397052.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}
		.Indoor-special{
			height: 300rpx;
			background-color: #f8f8f8;
			border-radius: 10rpx;
			background-image: url('@/pages/Settlein/static/image/teshuzizhi.png');
			background-size: 100% 100%;
			margin-top: 40rpx;
		}
	}

	.bottom-btn {
		text-align: center;
		margin-top: 40rpx;

		text {
			display: inline-block;
			width: 599rpx;
			height: 81rpx;
			background-color: #d91b1b;
			border-radius: 40rpx;
			line-height: 81rpx;
			font-size: 32rpx;
			color: #ffffff;
		}
	}

	.title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 40rpx;
	}
	.card-hy {
		margin: 20rpx;
		padding: 0rpx 40rpx;
		background-color: #ffffff;
		border-radius: 14rpx;
		text-align: center;
	}
	.pop-mcc {
		width: 600rpx;
		background-color: #f8f8f8;
		border-radius: 20rpx;
		padding: 40rpx;
	
		.tags {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	
		.tags-type {
			width: 160rpx;
			height: 50rpx;
			background-color: #ffffff;
			border-radius: 10rpx;
			font-size: 28rpx;
			line-height: 50rpx;
			text-align: center;
			margin-top: 40rpx;
		}
	
		.current-tags {
			background-color: #d91b1b;
			color: #ffffff;
		}
	.scc-value {
			background-color: #ffffff;
			border-radius: 10rpx;
			color: #999999;
			font-size: 24rpx;
			margin-top: 20rpx;
			padding:10rpx 20rpx 10rpx 20rpx;
		}
	}
</style>
