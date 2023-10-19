<template>
	<view class="page">
		<view class="pop-title">获取底价</view>
		<view style="display: flex;justify-content: center;margin-top: 38rpx;">
			<view class="pop-submit">
				<view style="margin-top: 9rpx;margin-left: 29rpx;">
					<image style="width: 36rpx;height: 36rpx;" src="@/pages/carShops/static/image/tijiaodianhua.png">
					</image>
				</view>
				<view style="margin-left: 13rpx;">提交信息后经销商会为您电话报价</view>
			</view>
		</view>
		<view class="car-pop-detail" style="align-items: center;margin-top: 32rpx;margin-bottom: 45rpx;">
			<view>
				<u-avatar size="60" :src="dataList.faceImage" shape="square"></u-avatar>
			</view>
			<view style="margin-left: 24rpx;">
				<view style="font-size: 36rpx;font-weight: bold;">
					{{dataList.vehicleName}}
				</view>
				<view class="oneLine" style="font-size: 24rpx;width: 500rpx;margin-top: 21rpx;">
					{{dataList.newVehicleInfoCXDetailVOS[cartype].cxTitle}}
				</view>
			</view>
		</view>
		<view class="card-price">
			<view>
				<view style="font-size: 24rpx;">
					经销商报价
					</view>
				<view style="color: #D91B1B;font-size: 44rpx;font-weight: bold;margin-top: 12rpx">
					{{(dataList.newVehicleInfoCXDetailVOS[cartype].price*0.0001).toFixed(2)}}<text style="font-size: 24rpx;">万</text>
				</view>
			</view>
			<view>
				<view style="font-size: 24rpx;">
					降价幅度
					</view>
				<view class="u-flex" style="color: #D91B1B;font-size: 44rpx;font-weight: bold;margin-top: 12rpx;align-items: center;">
					<view>
						<image style="width: 38rpx;height: 41rpx;" src="@/static/image/down.png"></image>
					</view>
					<view style="margin-left: 8rpx;">
						{{(dataList.newVehicleInfoCXDetailVOS[cartype].discount*0.0001).toFixed(2)}}
					</view>
					<view style="font-size: 24rpx;margin-left: 8rpx;margin-top: 8rpx;">
						万
					</view>
				</view>
			</view>
			<view>
			<view style="font-size: 24rpx;">
				指导价
				</view>
			<view style="color: #999999;font-size: 44rpx;font-weight: bold;margin-top: 12rpx">
				<text style="">{{(dataList.newVehicleInfoCXDetailVOS[cartype].elevatingPrice*0.0001).toFixed(2)}}</text><text style="font-size: 24rpx;text-decoration: none;">万</text>
			</view>
			</view>
		</view>
		<view style="margin: 0rpx 25rpx -25rpx 25rpx;">
			<scroll-view scroll-y="true" style="height:220rpx" v-if="dataList.salesConsultantListVOS.length>2">
			<view v-for="(item,index) in dataList.salesConsultantListVOS" :key="item.id" class="mb10">
				<view class="u-flex jsb alc">
					<view class="u-flex alc">
						<view>
							<image style="border-radius: 50%;width: 92rpx;height: 92rpx;" :src="item.headPortrait"></image>
						</view>
						<view class="ml20">
							<view class="u-flex alc">
								<view style="font-size: 36rpx;" class="fwb">{{item.nickname}}</view>
									<view class="user-tagitem" v-if="item.tag">
										{{item.tag}}
									</view>
									<!-- <view class="u-flex"><image style="width: 107rpx;height: 33rpx;margin-left: 7rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695092069106.png"></image></view> -->
							</view>
							<view class="size24 txtDarkGray">已服务{{item.num}}人</view>
						</view>
					</view>
					<view @click="Onchoosepeople(item,index)">
						<view v-if="currentindex==index">
							<image style="width: 34rpx;height: 34rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091667034.png"></image>
						</view>
						<view v-else 
						>
						<image style="width: 34rpx;height: 34rpx;" src='https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091645457.png'></image></view>
					</view>
				</view>
			</view>
			</scroll-view>
			<view v-else>
				<view v-for="(item,index) in dataList.salesConsultantListVOS" :key="item.id" class="mb10">
				<view class="u-flex jsb alc">
					<view class="u-flex alc">
						<view>
							<image style="border-radius: 50%;width: 92rpx;height: 92rpx;" :src="item.headPortrait"></image>
						</view>
						<view class="ml20">
							<view class="u-flex alc">
								<view style="font-size: 36rpx;" class="fwb">{{item.nickname}}</view>
									<view class="user-tagitem" v-if="item.tag">
										{{item.tag}}
									</view>
									<!-- <view class="u-flex"><image style="width: 107rpx;height: 33rpx;margin-left: 7rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695092069106.png"></image></view> -->
							</view>
							<view class="size24 txtDarkGray">已服务{{item.num}}人</view>
						</view>
					</view>
					<view @click="Onchoosepeople(item,index)">
						<view v-if="currentindex==index">
							<image style="width: 34rpx;height: 34rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091667034.png"></image>
						</view>
						<view v-else 
						>
						<image style="width: 34rpx;height: 34rpx;" src='https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091645457.png'></image></view>
					</view>
				</view>
			</view>
			</view>
		</view>
		<view style="margin: 30rpx;">
			<u--form :model="form" ref="uForm1" labelWidth='80'>
				<u-form-item label="姓名" prop="customerName" :rules="rules">
					<u-input placeholder="请输入姓名" borderBottom border="none" v-model="form.customerName" />
				</u-form-item>
				<u-form-item label="手机号" prop="customerMobile" :rules="rules">
					<u-input placeholder="请输入手机号" borderBottom border="none" v-model="form.customerMobile" />
				</u-form-item>
				<view class="u-flex" style="margin-top: 42rpx;justify-content: center;">
					<view>
						<u-radio-group v-model="radiovalue1" placement="column">
							<u-radio activeColor='#D91B1B' :customStyle="{marginBottom: '8px'}" 
								:name="1">
							</u-radio>
						</u-radio-group>
					</view>
					<text style="font-size: 30rpx">我已阅读并同意</text>
					<text @click="OnPushPrivacyPolicy" style="font-size: 30rpx;color: #D91B1B">
						《个人信息保护声明》
					</text>
				</view>
			</u--form>
			<view style="display: flex;justify-content: center;margin-top: 50rpx;">
				<view @click="Onappointment" style="width: 380rpx;
		                  height: 76rpx;
		                  background: #D91B1B;
		                  border-radius: 38rpx;
						  line-height: 76rpx;
						  text-align: center;
						  font-size: 32rpx;
						  color: #ffffff;">
					咨询底价
				</view>
			</view>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="showinfo" @close="showinfo=false" mode="center">
			<view class="pop">
				<view style="font-size: 28rpx;margin-top: 100rpx;">
					已收到您的留言，我们将安排专业的销售经理马上与您取得联系！
				</view>
				<view style="display: flex;justify-content: center;">
					<view @click="OnClose" class="pop-btn">
						好的
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				salesConsultantId:'',
				currentindex:0,
				rules: {
					'customerMobile': [{
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
							// 触发器可以同时用blur和change
							trigger: ['change', 'blur'],
						}
					],
					'customerName': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
				},
				form: {
					customerName: '',
					customerMobile: getstorage('mobile')
				},
				radiovalue1: '',
				showinfo: false
			}
		},
		props: {
			shopId: {
				type: String
			},
			cartype: {
				type: String
			},
			dataList: {
				type: Object
			},

		},
		onLoad() {

		},
		mounted() {
		},
		created() {
			this.salesConsultantId=this.dataList.salesConsultantListVOS[0].id
		},
		onShow() {},
		methods: {
			Onchoosepeople(item,index){
				this.currentindex=index
				this.salesConsultantId=item.id
			},
			OnClose() {
				this.$emit("OnClosefloorprice");
				this.showinfo = false
			},
			Onappointment() {
				let _this = this
				if (!this.radiovalue1) {
					uni.$u.toast('请同意并阅读个人信息保护声明')
					return false
				}
				this.$refs.uForm1.validate().then(res => {
					this.$request.post("/coc-active/api/v1/four_s/clues/add", {
						customerMobile: this.form.customerMobile,
						customerName: this.form.customerName,
						shopId: this.dataList.shopId,
						type: 1,
						vehicleInfoCxId: this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
						salesConsultantId:this.salesConsultantId
					}).then(res => {
						if (res.code == 200) {

							_this.showinfo = true
						} else {
							uni.$u.toast(res.message)
						}
					})

				}).catch(errors => {})
			},
			OnPushPrivacyPolicy() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
				})
			},
			setrule() {
				this.$refs.uForm1.setRules(this.rules)
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.pop-title {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 47rpx;
	}

	.pop-submit {
		width: 700rpx;
		height: 56rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		text-align: center;
		display: flex;
		
		font-size: 24rpx;
		color: #666666;
		line-height: 56rpx;
	}

	.car-pop-detail {
		display: flex;
		margin: 43rpx 25rpx 28rpx 25rpx;
	}

	.pop {
		width: 710rpx;
		background-color: #f8f8f8;
		text-align: center;
		padding: 0rpx 72rpx;
	}

	.pop-btn {
		width: 200rpx;
		height: 76rpx;
		background: #D91B1B;
		border-radius: 38rpx;
		text-align: center;
		font-size: 32rpx;
		color: #ffffff;
		margin-top: 83rpx;
		margin-bottom: 64rpx;
		line-height: 76rpx;
	}
	.card-price{
		margin: 25rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		padding: 40rpx 0rpx;
		display: flex;
		justify-content: space-around;
		text-align: center;
	}
	.user-tagitem{
		padding: 6rpx 14rpx;
		background-color: #fff5de;
		border-radius: 10rpx;
		color: #AC6606;
		font-weight: bold;
		margin-left: 7rpx;
	}
</style>
