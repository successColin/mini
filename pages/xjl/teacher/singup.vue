<template>
	<view class="page">
		<view class="card u-flex alc">
			<view>
				<u-avatar size="56" :src="dataList.head_img"></u-avatar>
			</view>
			<view style="margin-left: 54rpx;">
				<view class="u-flex alc">
					<view class="size32 fwb oneLine">
						{{dataList.name}}
					</view>
					<view class="size28 txtDarkGray ml20 oneLine" style="width: 200rpx;">
						{{dataList.school_name}}
					</view>
					<view class="zheng-item" v-if="dataList.is_certify==1">
						证
					</view>
				</view>
				<view class="size28 txtDarkGray" style="margin-top: 8rpx;">
					{{dataList.teach_age}}年教龄｜{{dataList.student_num}}名学员｜距您{{dataList.distance}}
				</view>
				<view class="u-flex alc" style="margin-top: 24rpx;">
					<view v-for="(item1,index1) in dataList.rel_teacher_tags" :key="index1" class="style-tag">
						{{item1}}
					</view>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="u-flex alc jsb">
				<view class="size28">姓名</view>
				<view>
					<u--input fontSize='14px' color='#999999' inputAlign='right' placeholder="请输入" border="none" v-model="user_name"></u--input>
				</view>
			</view>
			<view class="u-flex alc jsb" style="margin-top: 48rpx;">
				<view class="size28">手机号码</view>
				<view>
					<u--input fontSize='14px' color='#999999' inputAlign='right' placeholder="请输入" border="none" v-model="mobile"></u--input>
				</view>
			</view>
			<view class="u-flex alc jsb" style="margin-top: 48rpx;">
				<view class="size28">报考车型</view>
				<view class="u-flex alc" @click="OnChoosecartype">
					<view style="margin-right: 16rpx;">
						{{cartypetext}}
					</view>
					<view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="card" style="padding: 0rpx;">
			<u--textarea placeholderStyle="padding:0" border="none" v-model="student_remark" placeholder="你想说点什么"></u--textarea>
		</view>
		<view class="concord">
			<view style="margin-top: 4rpx;">  <u-checkbox-group
			            v-model="checkboxValue1"
			            placement="column"
			        >
			            <u-checkbox
			                :customStyle="{marginBottom: '8px'}"
							shape="circle"
							activeColor="#D91B1B"
			            >
			            </u-checkbox>
			        </u-checkbox-group></view>
					<view>
						<text class="txtLighGray size24">我已阅读并同意51车俱乐部</text>
								<text @click="OnPushwebview" class="size24 mainRed">《个人信息保护声明》</text>
					</view>
			 
		</view>
		<view class="add-item" @click="Onadd">
			提交报名
		</view>
		<u-picker @confirm='Ontruepicker' :show="showcartype" :columns="cartypecolumns" keyName="name" @close='showcartype=false' @cancel='showcartype=false'></u-picker>
			<u-toast ref="showtoast"></u-toast>
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
						checkboxValue1:[],
				student_remark:'',
				driver_license:'',
				showcartype: false,			
				dataList: {},
				mobile: '',
				user_name: '',
				cartypetext: '请选择',
				cartypecolumns: [
					[{
							name: 'C1(小型汽车)',
							value: 1
						},
						{
							name: 'C2(小型自动挡汽车)',
							value: 2
						},
						{
							name: 'C3(低速载货汽车)',
							value: 3
						},
						{
							name: 'D(普通三轮摩托车)',
							value: 4
						},
						{
							name: 'E(普通二轮摩托车)',
							value: 5
						},
						{
							name: 'F(轻便摩托车)',
							value: 6
						}
					]
				],
			}
		},

		onLoad(option) {
			let _this = this
			this.id = option.id
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendlist', function(data) {
				_this.dataList = data.data
			})
			this.user_name = getstorage('realName')
			this.mobile = getstorage('mobile')
		},
		onShow() {},
		methods: {
			Onadd(){
				if(this.checkboxValue1.length==0){
						uni.$u.toast('请同意隐私条款')
						return false
				}
				if(!this.user_name){
					uni.$u.toast('请输入报考人姓名')
					return false
				}
				if(!this.mobile){
					uni.$u.toast('请输入报考人手机号码')
					return false
				}
				if(!this.driver_license){
					uni.$u.toast('请选择报考车型')
					return false
				}
			this.$tokenxjlrequest.post("/user/home/add_student_clue",{
				token:getstorage('xjltoken'),
				teacher_id:this.id,
				user_name:this.user_name,
				mobile:this.mobile,
				driver_license:this.driver_license,
				student_remark:this.student_remark,
				school_id:this.dataList.school_id+'',
				source:'1'
			}).then(res=>{
				if(res.code==200){
					this.$refs.showtoast.show({
						message: '报名成功',
						type: "default",
						duration: 2000,
						complete() {
							uni.navigateBack({
								delta: 1
							});
						}
					})
				}else{
					uni.$u.toast(res.msg)
				}
			})
			
			
			
		
			},
			OnPushwebview(){
				uni.navigateTo({
					url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
				})
			},
			Ontruepicker(e){
				this.cartypetext=e.value[0].name
				this.driver_license=e.value[0].value
				this.showcartype=false
			},
			OnChoosecartype() {
				this.showcartype = true
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background: #FFFFFF;
		border-radius: 16rpx;
		padding: 24rpx;
		margin: 24rpx;
	}
	.style-tag{
			font-size: 20rpx;
			color: #E85454;
	border: 1rpx solid #E85454;
	padding: 4rpx 12rpx;
	border-radius: 106rpx;
	margin-right: 12rpx;
		}
		.zheng-item{
			width: 28rpx;
			height: 28rpx;
			background: #F9AD29;
			border-radius: 4rpx;
			color: #ffffff;
			font-size: 20rpx;
			text-align: center;
			line-height: 28rpx;
			font-weight: bold;
		}
		.concord{
			display: flex;
			justify-content: center;
			margin-top: 40rpx;
		}
		.add-item{
			width: 440rpx;
			height: 84rpx;
			background: #D91B1B;
			border-radius: 174rpx ;
			text-align: center;
			line-height: 84rpx;
			color: #ffffff;
			font-size: 28rpx;
			margin: 22rpx auto;
		}
</style>
