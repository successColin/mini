<template>
	<view class="page">
		<view class="card u-flex">
			<view>
				<image :src="dataList.head_img" style="width: 260rpx;height: 160rpx;border-radius: 16rpx;"></image>
			</view>
			<view style="margin-left: 32rpx;">
				<view class="size32 fwb">
					{{dataList.name}}
				</view>
				<view class="size24" style="margin-top: 16rpx;">
					{{dataList.teacher.count}}名教练｜距您{{dataList.distance}}
				</view>
				<view class="u-flex u-flex-wrap" style="margin-top: 24rpx; ">
					<view v-for="(item,index) in dataList.rel_school_tag" :key="index" class="tag-item">
						{{item}}
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
			<view class="u-flex alc jsb" style="margin-top: 48rpx;">
				<view class="size28">选择教练</view>
				<view class="u-flex alc" @click="OnChoosecoach">
					<view style="margin-right: 16rpx;">
						{{coachtext}}
					</view>
					<view>
						<u-icon name="arrow-right"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="card" style="padding: 0rpx;">
			<u--textarea border="none" v-model="student_remark" placeholder="你想说点什么"></u--textarea>
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
		<u-toast ref="showtoast"></u-toast>
		<u-picker @confirm='Ontruepicker' :show="showcartype" :columns="cartypecolumns" keyName="name" @close='showcartype=false' @cancel='showcartype=false'></u-picker>
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
				cartypetext: '请选择',
				coachtext:'请选择',
				mobile: '',
				user_name: '',
				id: '',
				dataList: {},
				showcartype: false,
				driver_license:'',
				teacher_id:'',
				driver_license:''
				
			}
		},

		onLoad(option) {
			let _this = this
			this.id = option.id
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('sendlist', function(data) {
				_this.dataList = data.data
			})
			uni.$on('getcoach',function(data){
					_this.teacher_id=data.teacher_id
					_this.coachtext=data.coachtext
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
				if(!this.teacher_id){
					uni.$u.toast('请选择教练')
					return false
				}
				this.$tokenxjlrequest.post("/user/home/add_student_clue",{
					token:getstorage('xjltoken'),
					teacher_id:this.teacher_id,
					user_name:this.user_name,
					mobile:this.mobile,
					driver_license:this.driver_license,
					student_remark:this.student_remark,
					school_id:this.id,
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
			OnChoosecoach(){
			uni.navigateTo({
				url: '/pages/xjl/school/coachlist?id=' + this.id
			});
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
		margin: 24rpx;
		padding: 24rpx;
		background: #FFFFFF;
		border-radius: 16rpx;
	}

	.tag-item {
		padding: 4rpx 12rpx;
		border: 1rpx solid rgba(232, 84, 84, 0.9);
		border-radius: 106rpx;
		font-size: 20rpx;
		color: rgba(232, 84, 84, 0.9);
		margin-right: 12rpx;
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
