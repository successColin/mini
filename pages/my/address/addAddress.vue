<template>
	<view class="page">
		<view style="background-color: #ffffff;padding: 20rpx 50rpx;">
			<u--form labelWidth='80' labelPosition="left" :model="dataList" :rules="rules" ref="form1">
				<u-form-item label="收件人" prop="name" ref="item1" borderBottom :required='true'>
					<view style="background-color: white;">
						<u--input border='none' placeholder="请输入收货人姓名" v-model="dataList.name"></u--input>
					</view>
				</u-form-item>
				<u-form-item label="手机号码" prop="mobile" ref="item1" borderBottom :required='true'>
					<view style="background-color: white;">
						<u--input border='none' placeholder="请输入手机号码" v-model="dataList.mobile"></u--input>
					</view>
				</u-form-item>
				<u-form-item label="所在地区" prop="areaCode" ref="item1" borderBottom :required='true'>
					<view @click="getcity" class="u-flex" style="align-items: center;justify-content: space-between;">
						<view>
							<u--input disabledColor='#ffffff' :disabled='true' border='none' placeholder="省/市/区"
								v-model="dataList.areatext">
							</u--input>
						</view>
						<view>
							<u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
						</view>
					</view>
				</u-form-item>
				<u-form-item :required='true' label="详细地址" prop="addressDetail" ref="item1" borderBottom>
					<view style="background-color: white;">
						<u--input border='none' placeholder="请填写详细地址" v-model="dataList.addressDetail"></u--input>
					</view>
				</u-form-item>
				<u-form-item label="标签" ref="item1">
					<view class="u-flex" style="justify-content: space-around;">
						<view class="tags" :class="{'active-tags':tagcurrent==index}" v-for="(item,index) in types"
							:key="index" @click="changetags(index,item.label)">
							{{item.label}}
						</view>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="default">
			<view>
				设为默认地址
			</view>
			<view>
			<u-switch activeColor="#D91B1B " v-model="isDefault" @change="changeswitch"></u-switch>
			</view>
		</view>
		<view class="bottom-btn">
			<view v-if="isadd===2" style="margin-right: 30rpx;">
				<text @click="Ondelete" class="btn-delete">删除</text>
			</view>
			<view>
				<text @click="OnSave" class="btn-save">保存地址</text>
			</view>

		</view>
		<u-toast ref="uToast"></u-toast>
		<u-picker @cancel="showareaCode=false" :show="showareaCode" ref="uPicker" :columns="areacode"
			@change="changeAreaCode" @confirm="confirmareaCode" keyName="label"></u-picker>
	</view>
</template>

<script>
	export default {
		components: {

		},

		data() {
			return {
				isDefault:false,
				areacode: [],
				isareaopen: false,
				showareaCode: false,
				isadd: '1',
				types: [{
						label: '家庭',
						value: '1'
					},
					{
						label: '公司',
						value: '2'
					},
					{
						label: '学校',
						value: '3'
					},
				],
				tagcurrent: 0,
				radiosex: [{
						name: '先生',
						value: 0
					},
					{
						name: '女士',
						value: 1
					}
				],
				dataList: {
					addressDetail: '',
					name: '',
					mobile: '',
					addressTag: '家庭',
					isDefault: 0,
					areaCode: '',
					cityCode: '',
					provinceCode: '',
					sex: 1
				},
				rules: {
					mobile: [{
							required: true,
							message: '请输入手机号码',
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
					'addressDetail': {
						type: 'string',
						required: true,
						message: '请填写详细地址',
						trigger: ['blur', 'change']
					},
					'areaCode': {
						type: 'string',
						required: true,
						message: '请选择地区',
						trigger: ['blur', 'change']
					},
					"name": {
						type: 'string',
						required: true,
						message: '请输入收货人姓名',
						trigger: ['blur', 'change']
					},
				},
			}
		},

		onLoad(option) {
			if (option.isadd == 1) {
				uni.setNavigationBarTitle({
					title: '新增收货地址'
				})
				this.isadd = 1
			} else {
				this.isadd = 2
				uni.setNavigationBarTitle({
					title: '编辑收货地址'
				});
			}
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getaddressdetail', function(data) {
				uni.$u.sleep(0).then(() => {
					if (data.data.addressTag == '家庭') {
						_this.tagcurrent = 0
					} else if (data.data.addressTag == '公司') {
						_this.tagcurrent = 1
					} else if (data.data.addressTag == '学校') {
						_this.tagcurrent = 2
					}
					if(data.data.isDefault==1){
						_this.isDefault=true
					}
					_this.dataList = data.data
				})

			})
		},
		onShow() {},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			changeswitch(e){
				if(e){
					this.dataList.isDefault=1
				}else{
					this.dataList.isDefault=0
				}
			},
			confirmareaCode(e) {
				this.dataList.provinceCode = e.value[0].value+'0000'
				this.dataList.cityCode = e.value[1].value+'00'
				this.dataList.areaCode = e.value[2].value
				this.dataList.areatext = e.value[0].label + e.value[1].label + e.value[2]
					.label
				this.showareaCode = false
			},
			changeAreaCode(e) {
				this.areaData = []
				const {
					columnIndex,
					value,
					values, // values为当前变化列的数组内容
					index,
					picker = this.$refs.uPicker
				} = e
				// 当第一列值发生变化时，变化第二列(后一列)对应的选项
				if (columnIndex === 0) {
					this.$request.post(
						"/coc-active/api/v1/merchantsettledin/getAreaCode", {
							level: '2',
							adCode: value[0].value
						}).then(res => {
						res.data.filter((s, i) => {
							this.areaData.push({
								label: s.name,
								value: s.adCode
							})
						})
						uni.$u.sleep(0).then(() => {
							if (columnIndex === 0) {
								// picker为选择器this实例，变化第二列对应的选项
								picker.setColumnValues(1, this.areaData)
							}
							this.areaquData = []
							this.$request.post(
								"/coc-active/api/v1/merchantsettledin/getAreaCode", {
									level: '3',
									adCode: this.areaData[0]
										.value
								}).then(res => {
								res.data.filter((s, i) => {
									this.areaquData.push({
										label: s.name,
										value: s.adCode
									})

								})
								uni.$u.sleep(0).then(() => {
									// picker为选择器this实例，变化第二列对应的选项
									picker.setColumnValues(2,this.areaquData)
								})
							})
						})
					})

				}
				if (columnIndex === 1) {
					this.areaquData = []
					this.$request.post(
						"/coc-active/api/v1/merchantsettledin/getAreaCode", {
							level: '3',
							adCode: value[1].value
						}).then(res => {
						res.data.filter((s, i) => {
							this.areaquData.push({
								label: s.name,
								value: s.adCode
							})
						})
						uni.$u.sleep(30).then(() => {
							if (columnIndex === 1) {
								// picker为选择器this实例，变化第二列对应的选项
								picker.setColumnValues(2, this.areaquData)
							}
						})
					})
				}
			},
			getcity() {
				this.$request.post("/coc-active/api/v1/merchantsettledin/getAreaCode", {
					level: '1'
				}).then(res => {
					if (!this.isareaopen) {
						res.data.filter((s, i) => {
							if (i != 0) {
								this.areacode.push({
									label: s.name,
									value: s.adCode
								})

							}
						})
						this.areacode = [this.areacode]
						this.areacode.push(
							[{
								label: '市辖区',
								value: '1101'
							}]
						)
						this.areacode.push(
							[{
									label: '东城区 ',
									value: '110101'
								}, {
									label: '西城区',
									value: '110102'
								}, {
									label: '朝阳区',
									value: '110105'
								}, {
									label: '丰台区',
									value: '110106'
								}, {
									label: '石景山区',
									value: '110107'
								}, {
									label: '海淀区',
									value: '110108'
								}, {
									label: '门头沟区',
									value: '110109'
								}, {
									label: '房山区 ',
									value: '110111'
								}, {
									label: '通州区',
									value: '110112'
								}, {
									label: '顺义区',
									value: '110113'
								},
								{
									label: '昌平区',
									value: '110114'
								}, {
									label: '大兴区',
									value: '110115'
								}, {
									label: '怀柔区',
									value: '110116'
								}, {
									label: '平谷区',
									value: '110117'
								},
								{
									label: '密云区',
									value: '110118'
								}, {
									label: '延庆区',
									value: '110119'
								}

							]
						)
						this.isareaopen = true

					}
					this.showareaCode = true
				})
			},
			Ondelete() {
				this.$request.get('/coc-active/api/v1/user/address/del/' + this.dataList.id).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: "删除成功",
							type: "success",
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					} else {
						this.$refs.uToast.show({
							message: res.message,
							type: "error"
						})
					}
				})
			},
			OnSave() {
				this.$refs.form1.validate().then(res => {
								if (this.isadd == 1) {
									this.$request.post('/coc-active/api/v1/user/address/add', this.dataList).then(res => {
										if (res.code == 200) {
											this.$refs.uToast.show({
												message: "新增成功",
												type: "success",
												complete() {
													uni.navigateBack({
														delta: 1
													});
												}
											});
										}
									})
								} else {
									this.$request.post('/coc-active/api/v1/user/address/edit', this.dataList).then(res => {
										if (res.code == 200) {
											this.$refs.uToast.show({
												message: "编辑成功",
												type: "success",
												complete() {
													uni.navigateBack({
														delta: 1
													});
												}
											});
										}
									})
								}
							}).catch(errors => {
								
							})
			},
			changetags(index, label) {
				this.tagcurrent = index
				this.dataList.addressTag = label
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.uni-list-cell {
		display: flex;
		margin-left: 40rpx;
	}

	.tags {
		width: 100rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		background-color: #F8F8F8;
		border-radius: 20rpx;
		font-size: 24rpx;
	}

	.active-tags {
		background-color: #ffeeee;
		color: #D91B1B;
	}

	.bottom-btn {
		display: flex;
		justify-content: center;
		position: fixed;
		z-index: 9999;
		bottom: 200rpx;
		left: 50%;
		transform: translate(-50%, -50%);

		.btn-save {
			font-size: 28rpx;
			width: 300rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #D91B1B;
			border-radius: 40rpx;
			color: #ffffff;
			text-align: center;
			font-weight: bold;
			display: inline-block;
		}

		.btn-delete {
			font-size: 28rpx;
			width: 300rpx;
			height: 80rpx;
			line-height: 80rpx;
			background: #999999;
			border-radius: 40rpx;
			color: #ffffff;
			text-align: center;
			font-weight: bold;
			display: inline-block;
		}
	}

	.default {
		margin-top: 20rpx;
		background: #FFFFFF;
		padding: 38rpx 51rpx 38rpx 51rpx;
		display: flex;
		justify-content: space-between;
	}
</style>
