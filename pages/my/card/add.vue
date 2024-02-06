<template>
	<view class="page">
		<view class="card">
			<view>
				<text class="mainRed size20">*</text>
				<text class="size28 fwb" style="margin-left: 4rpx;">银行</text>
			</view>
			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view class="u-flex jsb" @click="Onopenpicker ">
				<view class="txtLighGray">{{bank}}</view>
				<view>
					<u-icon color="#999" name="arrow-down"></u-icon>
				</view>
			</view>
		</view>
		<view class="card">
			<view>
				<text class="mainRed size20">*</text>
				<text class="size28 fwb" style="margin-left: 4rpx;">信用卡卡号</text>
			</view>
			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view>
				<u--input @blur='Onblur' placeholder="单行输入" border="none" type='number' v-model="bankCard"></u--input>
			</view>
		</view>
		<view class="mainRed size24" style="margin: 25rpx;">
			需为本人信用卡卡号
			<!-- ，且为浙江省金华市网点开卡 -->
		</view>
		<u-picker @confirm='Onchoosebank' @cancel="closepicker" :show="showpicker" :columns="columns"></u-picker>
		<view class="btn-bottom" @click="banKCardBind">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				banktype:'',
				bankCard: '',
				bank: '请选择银行',
				showpicker: false,
				columns: [
					['中国工商银行','中国邮储银行'] // '中国农业银行'
				],
			}
		},

		onLoad() {},
		onShow() {},
		methods: {
			Onblur() {
				if (this.bankCard.length < 16) {
					uni.$u.toast('请输入16-19位卡号')
				} else if (this.bankCard.length > 19) {
					uni.$u.toast('请输入16-19位卡号')
				}
			},
			banKCardBind() {
				if (this.bank == '请选择银行') {
					uni.$u.toast('请选择银行')
					return false
				}
				if (this.bankCard.length < 16) {
					uni.$u.toast('请输入16-19位卡号')
					return false
				} else if (this.bankCard.length > 19) {
					uni.$u.toast('请输入16-19位卡号')
					return false
				}
				uni.requestSubscribeMessage({
				    tmplIds: [
				        'kw8B2ENKpyxIvUxWzuwPOyO500oaGqqspTwyO3_E6cg',
						'IutJPhF9VhovRfVqAM4JH1dDhOQGLpzmeF_qrVASJTo'
				    ],
				    success(res) { }
				})
				this.$request.post("/coc-active/api/v1/my/banKCardBind",{
					bank:this.banktype,
					bankCard:this.bankCard
				}).then(res=>{
					if(res.code==200){
					
						uni.navigateBack({
							delta: 1
						});
					}else{
						uni.$u.toast(res.message)
					}
				})
			},
			Onchoosebank(e) {
				console.log(e);
				if(e.indexs[0]==0){
					this.banktype=2
				}else {
					this.banktype=3
				}
				this.bank = e.value[0]
				this.showpicker = false
			},
			closepicker() {
				this.showpicker = false
			},
			Onopenpicker() {
				this.showpicker = true
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		margin: 25rpx;
		padding: 25rpx;
	}

	.btn-bottom {
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #D91B1B;
		font-size: 34rpx;
		color: #FFFFFF;
		border-radius: 40rpx;
		padding: 24rpx 0rpx;
		width: 600rpx;
		text-align: center;
	}
</style>
