<template>
	<view>
		<u-popup :show="tipShow" mode="center" @close="tipShow=false" round="6" :safeAreaInsetBottom="false"
			zIndex="10076">
			<view class="flex alc" style="padding: 40rpx 0;width: 650rpx;flex-direction: column;">
				<text>优惠金额仅供参考，实际以当地采购价为准</text>
				<view class="btn" style="width: 120rpx;height: 60rpx;line-height: 60rpx;margin-top: 30rpx;"
					@click="tipShow=false">
					<text class="btn_txt">好的</text>
				</view>
			</view>
		</u-popup>
		<u-popup :show="msgShow" @close="$emit('close')" :closeOnClickOverlay="true" closeable round="16rpx"
			:safeAreaInsetBottom="false">
			<view class="msgbox">
				<view class="msgbox_title">{{title}}</view>
				<view style="padding: 0 25rpx;margin-top: 10rpx;">
					<image v-if="type==3"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695127504776.png"
						style="width: 700rpx;height: 150rpx;margin-bottom: 45rpx;"></image>
					<view v-if="type==1||type==2" class="list_item flex product_div">
						<view class="img_div">
							<image class="img" mode="aspectFill" :src="msgObj.image">
							</image>
						</view>
						<view class="content_div">
							<view class="title">{{msgObj.vehicle_name}}</view>
							<view v-if="msgObj.guide_price_min==msgObj.guide_price_max" class="guide_price">指导价:
								{{msgObj.guide_price_min}}万
							</view>
							<view v-else class="guide_price">指导价: {{msgObj.guide_price_min}}万-{{msgObj.guide_price_max}}万</view>
							<view class="flex jsb" style="align-items: flex-end;margin-top: 22rpx;">
								<view class="flex" style="align-items: flex-start;">
									<image style="width: 16rpx;height: 22rpx;"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695103130744.png">
									</image>
									<text v-if="msgObj.reduce_price_min==msgObj.reduce_price_max"
										class="preferential">{{msgObj.reduce_price_min}}万</text>
									<text v-else
										class="preferential">{{msgObj.reduce_price_min}}万-{{msgObj.reduce_price_max}}万</text>
									<image style="width: 22rpx;height: 22rpx;" @click.stop="tipShow=true"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695103147135.png">
									</image>
								</view>
							</view>
						</view>
					</view>
					<view style="margin-left: 7rpx;">
						<u-form labelWidth='50' labelPosition="left" :model="msgData" :rules="rules" ref="formData">
							<u-form-item label="姓名" prop="name" borderBottom class="formItem">
								<view class="flex jsb alc">
									<input :border='none' placeholder="请输入姓名" v-model="msgData.name"
										class="nameInput" />
									<view class="flex alc sexBox jsb">
										<view v-for="(item, index) in sex" :key="index" class="sexItem"
											@click="changesex(index)" :class="item.current ? 'current' : ''">
											{{ item.name }}
										</view>
									</view>
								</view>
							</u-form-item>
							<u-form-item label="电话" prop="mobile" borderBottom class="formItem">
								<input :border='none' placeholder="自动获取支持修改" v-model="msgData.mobile"
									class="itemHeight" />
							</u-form-item>
							<u-form-item label="城市" prop="city" class="formItem" borderBottom>
								<view class="flex alc jsb br10  cityBox" @click="checkCity">
									<view>
										{{ msgData.city }}
									</view>
									<view style="margin-right: 20rpx;">
										<u-icon size="13" name="arrow-right" :bold='true' color="#222222"></u-icon>
									</view>
								</view>
							</u-form-item>
							<view style="margin-top: 35rpx;">
								<u-form-item>
									<view class="flex alc checkbox">
										<view>
											<u-radio-group v-model="radiovalue1" placement="column">
												<u-radio activeColor='#D91B1B' :name="1"> </u-radio>
											</u-radio-group>
										</view>
										<text class="size24" style="color: #222222;">我已阅读并同意</text>
										<text @click="OnPushwebview" class="size24 mainRed">《个人信息保护声明》</text>
									</view>
								</u-form-item>
							</view>

						</u-form>
					</view>

					<u-button slot="confirmButton" shape="circle"
						:customStyle="{ width: '380rpx', backgroundColor: '#D91B1B', color: '#fff',marginTop:'30rpx', fontWeight: 'bold',fontSize: '32rpx' }"
						@click="submit">提交
					</u-button>
				</view>
				<view style="height: 70rpx;"></view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		props: {
			title: {
				type: String,
				default: ""
			},
			msgObj: {
				type: Object,
				default: () => {
					return {}
				}
			},
			type: { //1:银行分期留咨 2:先租后买留咨 3.测融资额留咨
				type: Number,
				default: 1
			},
		},
		data() {
			return {
				msgShow: true,
				tipShow: false,
				msgData: {
					city: '',
					mobile: '',
					name: '',
					sex: 0,
					port: 34,
					way: ""
				},
				radiovalue1: '',
				sex: [{
						name: '先生',
						current: true,
						id: 1
					},
					{
						name: '女士',
						current: false,
						id: 2
					}
				],
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					mobile: [{
							type: 'string',
							required: true,
							message: '请填写手机号',
							trigger: ['blur', 'change']
						},
						{
							pattern: /^1[3456789]\d{9}$/,
							message: '请输入有效手机号',
							trigger: 'blur'
						}
					],
					city: {
						type: 'string',
						required: true,
						message: '请选择城市',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		mounted() {
			if (getstorage("cityname")) {
				this.msgData.city = getstorage("cityname")
			}
			if (getstorage("mobile")) {
				this.msgData.mobile = getstorage("mobile")
			}
			uni.$on('getcity', res => {
				this.msgData.city = res.name
				this.msgData.city_id = res.city_id
			})

			if (this.type == 1 || this.type == 2) {
				this.msgData.way = 9
				this.msgData.vehicle_id = this.msgObj.vehicle_id
			} else if (this.type == 3) {
				this.msgData.way = 15
			}
		},
		methods: {
			changesex(e) {
				this.msgData.sex = e
				this.sex.filter(res => {
					res.current = false
				})
				this.sex[e].current = true
			},
			checkCity() {
				uni.navigateTo({
					url: '/pages/carShops/51carOther/selectCity'
				})
			},
			OnPushwebview() {
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
				})
			},
			async submit() {
				if (!this.radiovalue1) {
					uni.showToast({
						title: "请同意并阅读个人信息保护声明",
						icon: 'none',
						duration: 2000
					})
					return false
				}
				await this.$refs.formData.validate()
				let msg = Object.assign({}, this.msgData);
				msg.name = msg.name + this.sex[msg.sex].name
				msg.sex = this.sex[msg.sex].id
				this.$request51car.post("user/events/user_record", msg)
					.then(res => {
						if (res.code == 1) {
							uni.showToast({
								title: '留咨成功',
								icon: 'none',
								duration: 2000
							})
							this.$emit('close')
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							})
						}
					})
					.catch(errors => {
						uni.showToast({
							title: errors,
							icon: 'none',
							duration: 2000
						})
						that.$message.error(error);
					})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.msgbox {
		.msgbox_title {
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 32rpx;
			font-weight: bold;
			color: #000000;
		}

		.product_div {
			width: 700rpx;
			height: 171rpx;
			background: #FFFFFF;
			border: 1px solid #E8E8E8;
			border-radius: 10rpx;
		}

		.nameInput {
			width: 230rpx;
			height: 50rpx;
			line-height: 50rpx;
		}

		.formItem {
			width: 100%;
			box-sizing: border-box;
		}

		.checkbox {
			text-align: center;
			width: 100%;
			justify-content: center;
			padding: 0;
			// background: #f8f8f8;
		}

		.sexBox {
			margin-left: 20rpx;
			width: 204rpx;

			.sexItem {
				width: 97rpx;
				height: 50rpx;
				line-height: 50rpx;
				background: #E8E8E8;
				border-radius: 12rpx;
				font-size: 24rpx;
				font-weight: 500;
				text-align: center;

				&.current {
					color: #D91B1B;
					width: 93rpx;
					height: 50rpx;
					line-height: 50rpx;
					border: 1rpx solid #D91B1B;
					background: rgba(217, 27, 27, 0.08);
				}
			}
		}

		.getPhone {
			width: 180rpx;
			padding: 10rpx 0;
			background-color: #f8f8f8;
			border-radius: 4rpx;
			font-size: 24rpx;

		}
	}

	.list_item {
		width: 100%;
		height: 171rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.img_div {
			.img {
				width: 193rpx;
				height: 171rpx;
				margin-left: 25rpx;
			}
		}

		.content_div {
			width: 100%;
			padding: 25rpx 25rpx 0 0;
			margin-left: 32rpx;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}

			.guide_price {
				font-size: 24rpx;
				font-weight: 500;
				color: #222222;
				margin-top: 15rpx;
			}

			.preferential {
				font-size: 24rpx;
				font-weight: 300;
				color: #D91B1B;
				line-height: 24rpx;
				margin: 0 10rpx;
			}
		}
	}

	.btn {
		width: 85rpx;
		height: 42rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 42rpx;

		.btn_txt {
			font-size: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
		}
	}
</style>
