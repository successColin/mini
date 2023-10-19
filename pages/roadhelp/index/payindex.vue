<template>
	<view class="page">
		<view v-for="(item,index) in dataList.rescue_project" :key="index">
			<view class="card">
				<view class="u-flex jsb">
					<view class="u-flex">
						<view>
							<image v-if="item.options==3"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689212347032.png"
								style="border-radius: 10rpx;width: 100rpx;height: 100rpx;"></image>
							<image v-if="item.options==5"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689212391114.png"
								style="border-radius: 10rpx;width: 100rpx;height: 100rpx;"></image>
							<image v-if="item.options==2"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689212431138.png"
								style="border-radius: 10rpx;width: 100rpx;height: 100rpx;"></image>
							<image v-if="item.options==6"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689212466729.png"
								style="border-radius: 10rpx;width: 100rpx;height: 100rpx;"></image>
							<image v-if="item.options==4"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689212504719.png"
								style="border-radius: 10rpx;width: 100rpx;height: 100rpx;"></image>
						</view>
						<view style="margin-left: 32rpx;position: relative;">
							<view class="fwb" style="font-size: 36rpx;">{{item.options_name}}</view>
							<view class="u-flex " style="align-items: flex-end;">
								<view>
									<text class="mainRed fwb" style="font-size: 48rpx">{{item.money}}</text><text
										class="mainRed size24" style="margin-left: 5rpx;">元/次</text><text
										class="size24 txtLighGray" v-if="item.options==4">（15公里内）</text>
								</view>

								<view class="ml10" v-if="item.is_member_price==1"
									style="position: absolute;left: 230rpx;bottom: 0rpx;">
									<image style="width: 179rpx;height: 43rpx;"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230713/file_1689228018313.png">
									</image>
								</view>
							</view>

						</view>

					</view>
					<view class="u-flex txtLighGray size24" @click="watchrule(item)">
						<view>计费规则</view>
						<view class="ml10">
							<u-icon name="question-circle"></u-icon>
						</view>
					</view>
				</view>
				<view class="hr">
				</view>
				<view class="size24">
					救援地址：{{dataList.rescue_start}}
				</view>
				<view v-if="item.options==4" class="size24" style="margin-top: 25rpx;">
					拖车地点：{{dataList.rescue_dest}}
				</view>
				<view v-if="item.options==5" class="size24" style="margin-top: 25rpx;">
					地库位置：负{{item.floor_number}}层
				</view>
			</view>
		</view>
		<view class="mainRed size24" style="margin:30rpx 0 30rpx 50rpx;">
			实际救援费用请参考计费规则为准。
		</view>
		<view class="card">
			<view class="u-flex jsb">
				<view class="size28 fwb">救援车辆</view>
				<view @click="showkeyboard=true" class="size28 " style="width: 400rpx;">{{rescue_plate}}
				</view>
			</view>
			<view class="hr"></view>
			<view class="u-flex jsb">
				<view class="size28 fwb">联系人</view>
				<view style="width: 400rpx;">
					<u--input placeholder="请输入联系人" placeholderStyle="color:#222222" border="none" v-model="dataList.customer_name"></u--input>
				</view>
			</view>
			<view class="hr" ></view>
			<view class="u-flex jsb">
				<view class="size28 fwb">手机号码</view>
				<view style="width: 400rpx;" class="u-flex jsb">
					<view style="width: 200rpx;">
						<view>
							<u--input placeholder="请输入手机号" border="none" v-model="dataList.customer_phone">
							</u--input>
						</view>

					</view>
					<view style="width: 194rpx;" :class="{'btn-code':!tips}">
						<u-toast ref="uToast"></u-toast>
						<u-code changeText='X秒' seconds="60" ref="uCode" @change="codeChange"></u-code>
						<u-button
							:customStyle="{height:'54rpx',borderRadius:'27rpx',border:'2rpx solid #D91B1B',color:'#D91B1B'}"
							@tap="getCode">{{tips}}
						</u-button>
					</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="u-flex jsb">
				<view class="size28 fwb">验证码</view>
				<view style="width: 400rpx;">
					<u--input placeholder="请输入验证码" placeholderStyle="color:#222222" border="none" v-model="dataList.code" type="number"></u--input>
				</view>
			</view>
		</view>
		<view class="u-flex" style="margin: 48rpx 25rpx 200rpx 25rpx;">
			<view>
				<u-radio-group v-model="radiovalue1" placement="column">
					<u-radio activeColor="#D91B1B" @change="changeradio">
					</u-radio>
				</u-radio-group>
			</view>
			<view class="size24 ml10">
				我已阅读并同意<text class="mainRed" @click="OnPushweb">《道路救援服务协议》</text>
			</view>
		</view>
		<view class="bottom-item" :class="{'bottom-height':isheight}">
			<view>
				支付费用：<text class="mainRed" style="font-size: 48rpx;"><text
						class="fwb">{{dataList.total_money}}</text><text class="size24">元</text></text>
			</view>
			<view class="btn-pay" @click="Onorder">
				呼叫订单支付
			</view>
		</view>
		<u-keyboard @confirm='getprice' @backspace='Onbackspace' ref="uKeyboard" mode="car" @change='changekey'
			:show="showkeyboard" @cancel='getprice'></u-keyboard>
		<u-popup :safeAreaInsetBottom='false' :show="showrule" @close="showrule=false" mode="center">
			<view class="pop">
				<view class="tac size32 fwb" style="margin-top: 35rpx;">救援说明</view>
				<view style="margin-top: 57rpx;" class="size24">
					<text>{{money_rule}}</text>
				</view>
				<view class="u-flex jsc" style="margin-top: 57rpx;margin-bottom: 35rpx;">
					<view class="pop-btn" @click="showrule=false">已知晓</view>
				</view>
			</view>
		</u-popup>
		<u-modal
		@confirm='advancePayment' cancelText='关闭'
		 @cancel='showmodal=false' confirmText='去支付'
		  :show="showmodal" confirmColor='#D91B1B' :showCancelButton='true' title="温馨提醒" content='订单可在待接单状态时取消订单，已接单订单不可取 消订单。'>
			
		</u-modal>
		<view style="height: 200rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				ischeck: false,
				radiovalue1: false,
				showkeyboard: false,
				dataList: {},
				rescue_plate: '请输入车牌号',
				roadVip: '',
				money_rule: '',
				showrule: false,
				tips: '',
				isheight: false,
				order_no: '',
				showmodal: false
			}
		},

		onLoad(option) {
			this.roadVip = option.roadVip

			let _this = this
			uni.getSystemInfo({
				success(res) {
					if (res.statusBarHeight > 20) {
						_this.isheight = true
					}
				}
			})
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getList', function(data) {

				_this.dataList = data.data
				_this.dataList.customer_phone=uni.getStorageSync('mobile')
				if(data.data.user_car.length>0){
					_this.dataList.rescue_plate=data.data.user_car[0]
					_this.rescue_plate=data.data.user_car[0]
									_this.getprice2()
				}
				
			})
		},
		onShow() {},
		methods: {
			OnPushweb(){
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/road_rescue_service_agreement.html',
				})
			},
			wxpay(data){
				let _this = this
				uni.requestPayment({
					provider: 'wxpay', //支付类型-固定值
					timeStamp: data.timeStamp, // 时间戳（单位：秒）
					nonceStr: data.nonceStr, // 随机字符串
					package: data.package, // 固定值
					signType: data.signType, //固定值
					paySign: data.paySign, //签名
					appid: data.appId,
					success: function(res) {
						console.log('qian')
						uni.showToast({
							icon: 'success',
							title: '支付成功',
							complete() {
								setTimeout(() => {
							uni.navigateTo({
								url: '/pages/roadhelp/index/successpay'
							})
								}, 1000)								
							}
						})
					},
					fail: function(err) {
				uni.$u.toast('支付失败');
					}
				});
			},
			advancePayment(){
				this.$request.post("/coc-active/api/v1/road/rescue/advancePayment",{
					openid:uni.getStorageSync('openid'),
					order_no:this.order_no
				}).then(res=>{
					if(res.code==200){
						this.showmodal=false
						this.wxpay(res.data)
					}else{
						uni.$u.toast(res.message);
					}
				})
			},
			changeradio(value) {
				this.ischeck = true

			},
			nextpay(){
				this.dataList.rescue_plate = this.rescue_plate
				this.$request.post("/coc-active/api/v1/road/rescue/placeOrder", this.dataList).then(res => {
					if (res.code == 200) {
						if (res.data.is_pay == 0) {
							this.order_no = res.data.order_no
							this.showmodal = true
						} else {
							uni.navigateTo({
								url: '/pages/roadhelp/index/successpay'
							})
						}
					} else {
						uni.$u.toast(res.message);
					}
				})
			},
			Onorder() {
				if (!this.ischeck) {
					uni.$u.toast('请确认阅读道路救援服务协议');
					return false
				}
				if (this.rescue_plate == '请输入车牌号' || !this.rescue_plate) {
					uni.$u.toast("请输入救援车辆车牌号")
					return false
				}
				let _this=this
				uni.requestSubscribeMessage({
					tmplIds: [
						'ah92VNgOpkMBlr2USaGPPUURyts2lF65yUvdIJSVkes',
						'j2e7-MfrZvFZyfxtqenCQK1nEOdTHwMFXvBBrS_F5o0',
						'jXOYl_PFUFvYK9eZlgrMeDRoUPpnf6ds8p6rm-fgpoQ'
					],
					complete(res) {
						_this.nextpay()
					}
				})
				
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})
					this.$newrequest.post('/coc-system/api/v1/system/sms/send/code', {
						mobile: this.dataList.customer_phone,
						type: 1
					}).then(res => {
						if (res.code == 200) {
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								uni.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 2000);
						} else {
							uni.$u.toast(res.message);
						}

					})


				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			codeChange(text) {
				this.tips = text;
			},
			watchrule(item) {
				this.money_rule = item.money_rule
				this.showrule = true
			},
			getprice2(){
				this.$request.post("/coc-active/api/v1/road/rescue/calculatePrice", this.dataList).then(res => {
					if (res.code == 200) {
						this.dataList.rescue_project = res.data.rescue_project
						this.dataList.total_money = res.data.total_money
					} else {
						uni.$u.toast(res.message)
					}
				})
			},
			getprice() {
				this.showkeyboard = false
				this.dataList.rescue_plate = this.rescue_plate
				this.$request.post("/coc-active/api/v1/road/rescue/calculatePrice", this.dataList).then(res => {
					if (res.code == 200) {
						this.dataList.rescue_project = res.data.rescue_project
						this.dataList.total_money = res.data.total_money
					} else {
						uni.$u.toast(res.message)
					}
				})
			},
			changekey(value) {
				if (this.rescue_plate == '请输入车牌号') {
					this.rescue_plate = ''
				}
				if (this.rescue_plate.length == 8) {
					return false
				}
				this.rescue_plate = this.rescue_plate + value
			},
			Onbackspace() {
				this.rescue_plate = this.rescue_plate.substr(0, this.rescue_plate.length - 1);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {}

	.card {
		margin: 25rpx;
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		background-color: #E8E8E8;
		margin-top: 25rpx;
		margin-bottom: 25rpx;
	}

	.mt25 {
		margin-top: 25rpx;
	}

	.pop {
		width: 650rpx;
		background-color: #f8f8f8;
		padding: 25rpx;
	}

	.pop-btn {
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		text-align: center;
		line-height: 70rpx;
		color: #ffffff;
	}

	.bottom-item {
		width: 670rpx;
		position: fixed;
		bottom: 0rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;
		padding: 30rpx 25rpx 30rpx 53rpx;
        z-index: 100;
	}

	.bottom-height {
		padding-bottom: 60rpx;
	}

	.btn-pay {
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		line-height: 70rpx;
		color: #ffffff;
		text-align: center;
		font-size: 28rpx;
		font-weight: bold;
	}
	.btn-code{
		width: 112rpx;
	}
</style>
