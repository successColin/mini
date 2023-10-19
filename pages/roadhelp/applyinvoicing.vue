<template>
	<view class="page">
		<view class="card">
			<view class="u-flex jsb">
				<view class="u-flex fwb size24">发票类型</view>
				<view class="txtLighGray size24">普通电子发票</view>
			</view>
		</view>
		<view class="card">
			<u--form :model="data" :rules="rules" ref="uForm">
				<u-form-item label="发票选项" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u-radio-group v-model="typetext" placement="row" @change="OnChangeradio">
								<u-radio activeColor="red" label="个人" name="个人"></u-radio>
								<u-radio :customStyle="{marginLeft: '10px'}" activeColor="red" label="企业" name="企业">
								</u-radio>
							</u-radio-group>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="发票抬头" labelWidth="150" prop="title" borderBottom ref="item1" :required='true'>
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.title" border="none" placeholder="请输入发票抬头" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item v-if="data.type==2" label="纳税人识别号" labelWidth="150" prop="tax" borderBottom ref="item1"
					:required='true'>
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.tax" border="none" placeholder="请输入纳税人识别号" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item v-if="data.type==2" label="注册地址" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.address" border="none" placeholder="请输入注册地址" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item v-if="data.type==2" label="注册电话" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.mobile" border="none" placeholder="请输入注册电话" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item v-if="data.type==2" label="开户银行" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.bank" border="none" placeholder="请输入开户银行" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item v-if="data.type==2" label="银行账号" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.bankCard" border="none" placeholder="请输入银行账号" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
				<u-form-item label="发票金额" labelWidth="150" borderBottom ref="item1">
					<view class="u-flex jsb">
						<view></view>
						<view class="mainRed size24">
							￥{{commission}}
						</view>
					</view>
				</u-form-item>
				<u-form-item label="接收邮箱" labelWidth="150" prop="email" borderBottom ref="item1" :required='true'>
					<view class="u-flex jsb">
						<view></view>
						<view>
							<u--input v-model="data.email" border="none" placeholder="请输入接收邮箱账号" inputAlign='right'>
							</u--input>
						</view>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="btn" @click="Onsubmit ">
			申请开票
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				data: {
					type: '1',
					title: '',
					tax: '',
					price: 89.9,
					address: '',
					mobile: '',
					bank: '',
					bankCard: '',
					email: '',
					orderType:4
				},
				commission:89.9,
				typetext: '个人',
				orderId: '',
				rules: {
					'type': {
						required: true,
						type: 'string',
						max: 1,
						required: true,
						message: '请选择发票选项',
						trigger: ['blur', 'change']
					},
					'title': {
						type: 'string',
						required: true,
						message: '请填写发票抬头',
						trigger: ['blur', 'change']
					},
					'tax': {
						type: 'string',
						required: true,
						message: '请填写纳税人识别号',
						trigger: ['blur', 'change']
					},
					'email': {
						type: 'string',
						required: true,
						message: '请填写接收邮箱',
						trigger: ['blur', 'change']
					},
				},
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
		onLoad(option) {
			if(uni.getStorageSync('commission')){
				this.data.price=uni.getStorageSync('commission')
				this.commission=uni.getStorageSync('commission')
			}
			this.data.orderId = option.id
			this.data.orderSn = option.orderNo
		},
		onShow() {},
		methods: {
			Onsubmit(){
				this.$refs.uForm.validate().then(res => {
					this.$request.post("/coc-active/api/v1/bill/applyBill",this.data).then(s=>{
						if(s.code==200){
							uni.$u.toast('已提交，等待审核')
						setTimeout(() => {
						uni.navigateBack({
							delta: 1
						});
						}, 1500)
						
						}else{
								uni.$u.toast(s.message)
						}
					})
				}).catch(errors => {
				uni.$u.toast('请填写资料')
			})
			},
			OnChangeradio(e) {
				if (e == '个人') {
					this.typetext = e
					this.data.type = 1
				} else {
					this.typetext = e
					this.data.type = 2
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 25rpx;
		margin: 25rpx;
	}
	.btn{
		margin: 168rpx auto;
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		line-height: 70rpx;
		text-align: center;
		color: #ffffff;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>
