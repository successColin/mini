<template>
	<view class="page">
		<u--form labelWidth='80' labelPosition="left" :model="dataList" :rules="rules" ref="form1">
			<u-form-item label="姓名:" prop="realName" :borderBottom='false' ref="item1">
				<view style="background-color: white;">
					<u--input placeholder="请输入姓名" v-model="dataList.realName"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="性别:" :borderBottom='false' ref="item1">
				<view>
					<radio-group class="u-flex" @change="radioChange">
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="u-flex">
								<view>
									<radio color='#d91b1b' :value="radiosex[0].value" :checked="0 === current" />
									{{radiosex[0].name}}
								</view>
								<view style="margin-left: 80rpx;">
									<radio color='#d91b1b' :value="radiosex[1].value" :checked="1 === current" />
									{{radiosex[1].name}}
								</view>
							</view>
						</label>
					</radio-group>
				</view>
			</u-form-item>
			<u-form-item label="身份证号:" prop="idCard" :borderBottom='false' ref="item1">
				<view style="background-color: white;">
					<u--input placeholder="请输入身份证号" v-model="dataList.idCard"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="手机号:"  :borderBottom='false' ref="item1">
				<view style="background-color: white;">
					<u--input :disabled='true' placeholder="请输入手机号" v-model="dataList.mobile"></u--input>
				</view>
			</u-form-item>
			<u-form-item label="职业:" prop="job" :borderBottom='false' ref="item1">
				<view @click='OnSelectJob'>
					<u--input placeholder="请选择职业" v-model="job" :disabled='true' suffixIcon="arrow-right"
						suffixIconStyle="color: #909399"></u--input>
				</view>

			</u-form-item>
			<u-form-item label="详细地址" prop="address" :borderBottom='false' ref="item1">
				<view style="background-color: white;">
					<u--input placeholder="请输入详细地址" v-model="dataList.address"></u--input>
				</view>
			</u-form-item>
		</u--form>
		<view>
			<u-picker @confirm='OnTjob' :show="selectjob" :columns="columns" @cancel='closeselect' keyName="name">
			</u-picker>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				rules: {										
					'realName': {
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['blur', 'change']
					},
					'idCard': {
						type: 'string',
						required: true,
						message: '请填写身份证号',
						trigger: ['blur', 'change']
					},

					'job': {
						type: 'string',
						required: true,
						message: '请选择职业',
						trigger: ['blur', 'change']
					},
					'address': {
						type: 'string',
						required: true,
						message: '请输入详细地址',
						trigger: ['blur', 'change']
					}
				},
				job: '',
				columns: [
					[{
							name: '党政机关人员',
							value: '1'
						}, {
							name: '企事业机关人员',
							value: '2'
						}, {
							name: '商业及服务业人员',
							value: '3'
						}, {
							name: '农林牧渔业人员',
							value: '4'
						},
						{
							name: '学生',
							value: '5'
						},
						{
							name: '军人',
							value: '6'
						},
						{
							name: '无业',
							value: '7'
						}, {
							name: '其他',
							value: '8'
						}
					]
				],
				selectjob: false,

				current: 0,
				radiosex: [{
						name: '男',
						value: 0
					},
					{
						name: '女	',
						value: 1
					}
				],
				dataList: {
					sex: 1,
					realName: "",
					idCard: '',
					mobile: '',
					job: '1',
					address: '光南路'
				}
			}
		},

		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('getuserinfo', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.dataList = data.data
				})
			
			})
			this.columns[0].filter(res => {
				if (res.value == this.dataList.job) {
					this.job = res.name
				}
			})
		},
		onShow() {},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			getname() {
				let length = this.dataList.realName.length - 1
				let a = this.dataList.realName + ''
				let Symbol = ''
				for (let i = 0; i < length; i++) {
					Symbol = Symbol + '*'
				}
				a = a.substr(0, 1) + Symbol
				return a
			
			},
			closeselect() {
				this.selectjob = false
			},
			OnTjob(val) {
				this.dataList.job = val.value[0].value
				this.job = val.value[0].name
				this.selectjob = false
			},
			OnSelectJob() {

				this.selectjob = true
			},
			radioChange(val) {
				this.dataList.sex = val.detail.value
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 20rpx;
	}
</style>
