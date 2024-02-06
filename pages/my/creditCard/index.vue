<template>
	<view class="page">
		<!--
      海报弹窗  申请信用卡
       <view @click="OnOpenImg(1)">
			<image mode="widthFix" style="width: 710rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221109/65dc9a3d89474201b1253984943e6ad1.png">
			</image>
		</view>
		<view @click="OnOpenImg(2)">
			<image mode="widthFix" style="width: 710rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221115/0475f08fbbdf489ca4be7058d61d4016.png">
			</image>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="isshow" @close="isshow=false" mode="center">
				<image show-menu-by-longpress mode="widthFix" :src="showimg"></image>
		</u-popup> -->
		<image src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684980690625.png"
			class="topimg" mode="widthFix"></image>
		<view class="cards">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20231010/file_1696904329037.png"
				@click="lookdetail('y')"></image>
			<!-- <image src="https://oss.dcqcjlb.com/51che_java_dev/20230227/file_1677482867029.png"
				@click="lookdetail('n')"></image> -->
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20230311/file_1678518857995.png"
				class="mt20" @click="lookdetail('g')"></image>
		</view>
		<view>
			<cardauthentication :showpop='showpop'></cardauthentication>
		</view>
		<u-popup :safeAreaInsetBottom='false' round="10" :closeOnClickOverlay="false" :show="showfourshop"
			@close="showfourshop=false" mode="center">
			<view class="pop">
				<view class="size28 fwb tac" style="margin-top: 80rpx;">
					选择客户经理/销售顾问/市场经理
				</view>
				<view class="u-flex jsc" style="margin-top: 40rpx;">
					<view class="btn-pop" @click="OnOpenfirst">
						<view class="txtLighGray size28" style="margin-left: 10rpx;">{{selectname?selectname:'请选择'}}</view>
						<view style="margin-left: 108rpx;margin-right: 10rpx;" class="u-flex alc">
							
							<image
								src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
								style="width: 17rpx;height: 10rpx;"></image>
						</view>
					</view>
					<view class="btn-pop" style="margin-left: 10rpx;" @click="OnOpentwo">
						<view class="txtLighGray size28" style="margin-left: 10rpx;">{{selecttwoname?selecttwoname:'请选择'}}</view>
						<view style="margin-left: 108rpx;margin-right: 10rpx;" class="u-flex alc">
							<image
								src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
								style="width: 17rpx;height: 10rpx;"></image>
						</view>
					</view>
				</view>
				<view class="u-flex jsc">
					<view class="pop-btn" @click="Onnextfours">
						确定
					</view>
				</view>
				
			</view>
		</u-popup>
		<u-picker :immediateChange ='true' :show="showfirst" :columns="columnsfirst" @cancel="showfirst=false" @confirm="Onselectfirst"></u-picker>
		<u-picker :immediateChange ='true' :show="showtwo" :columns="selectList" keyName="nickname" @cancel="showtwo=false" @confirm="Onselecttwo"></u-picker>
	<view :style="{'height':`calc(50rpx + 84px)`}"></view>
	<!-- #ifdef MP-WEIXIN -->
	<official-account style="width:750rpx;position: fixed;left: 0;bottom: 0rpx;z-index: 9999;"></official-account>
	<!-- #endif -->
	</view>
</template>

<script>
	import UImage from '../../../uni_modules/uview-ui/components/u--image/u--image.vue'
	import cardauthentication from '@/components/cardauthentication.vue'
	export default {
		components: {
			UImage,
			cardauthentication
		},
		data() {
			return {
				showtwo:false,
				selectList:[],
				 columnsfirst: [
				                    ['客户经理', '销售顾问','市场经理']
				                ],
				showfirst:false,
				selecttwoname: '',
				selectname: '',
				showpop: false,
				showimg: '',
				isshow: false,
				visitinto: null,
				sourceType: 0,
				affiliationId: '',
				showfourshop: false,
				fourshopid: '',
				affiliationType:'',
				userChannelId:''
			}
		},
		onHide() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onUnload() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onLoad(option) {
			console.log(option)
			if (option.scene) {

				if (option.scene.split('_').length == 2) {
					this.sourceType = option.scene.split('_')[0]
					this.affiliationType=option.scene.split('_')[0]
					this.affiliationId = option.scene.split('_')[1]
					if(this.sourceType == 2) { //客户经理
						this.getChannelId(this.affiliationId,1)
					} else if(this.sourceType == 3) { //销售顾问
						this.getChannelId(this.affiliationId,2)
					} else if(this.sourceType == 7) { //市场经理
						this.getChannelId(this.affiliationId,3)
					}
				} else if (option.scene.split('_').length == 1) {
					this.sourceType = 5
					this.fourshopid = option.scene.split('_')[0]
					this.showfourshop = true
				}

			}
			let _this = this
			uni.$on('closepop', res => {
				_this.showpop = false
			})
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
					type: 10
				}).then(res => {
					this.visitinto = res
				})
			}
		},
		methods: {
			Onnextfours(){
				if(!this.affiliationId){
						uni.$u.toast('请先选择客户经理/销售经理/市场经理')
						return false
				}
				this.showfourshop=false
			},
			Onselecttwo(e){
			
				this.showtwo=false
				this.affiliationId=e.value[0].id
				this.selecttwoname=e.value[0].nickname
				this.userChannelId=e.value[0].userChannelId
			},
			Onselectfirst(e){
				this.selectname=e.value[0]
			this.selecttwoname=''
			this.affiliationId=''
			this.userChannelId=''
				if(e.indexs[0]==0){
			this.affiliationType=2
					this.$newrequest.get('/coc-system/api/v1/system/customer/manager/list?shopId='+this.fourshopid).then(res=>{
						this.showfirst=false
				
						this.selectList=[res.data]
				
					})
				}else if (e.indexs[0]==1){
					this.affiliationType=3
					this.$newrequest.post("/coc-active/api/v1/sales_consultant/list",{
						shopId:this.fourshopid,
						current:1,
						size:99
					}).then(res=>{
						this.showfirst=false
							this.selectList=[res.data.records]
					})
				}else if (e.indexs[0]==2){
					this.affiliationType=7
					this.$newrequest.post("/coc-active/api/v1/sales_consultant/marketingManagerList",{
						shopId:this.fourshopid,
						current:1,
						size:99
					}).then(res=>{
						this.showfirst=false
							this.selectList=[res.data.records]
					})
				}		
			
				
			},
			OnOpenImg(type) {
				if (type == 1) {
					this.showimg =
						'https://oss.dcqcjlb.com/51che_java_dev/20221109/de11e942f15f4085be184c52c78adc1e.jpg'
				} else {
					this.showimg =
						'https://oss.dcqcjlb.com/51che_java_dev/20221115/6abc070b042443db82cd3db9ce2fa83d.jpg'
				}
				this.isshow = true
			},
			OnOpentwo(){
				if(this.selectList.length==0){
					uni.$u.toast('请先选择客户经理/销售类型/市场经理')
					return false
				}
				this.showtwo=true
			},
			OnOpenfirst(){
				this.showfirst=true
			},
			lookdetail(type) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '/pages/activity/share/index?userChannelId='+this.userChannelId
					})
					return false
				}
				if (uni.getStorageSync('isCertify') != 1) {
					this.showpop = true
					return false
				}
				uni.navigateTo({
					url: '/pages/my/creditCard/detail?type=' + type + "&sourceType=" + this.sourceType +
						"&affiliationId=" + this.affiliationId+"&affiliationType="+this.affiliationType
				})
			},
			getChannelId(id,type){
				this.$request
				  .post('/coc-system/api/v1/system/customer/manager/getChannel', {
				    id,
					type
				  })
				  .then((res) => {
					  if(res.code == 200){
					  	if(res.data && res.data.userChannelId) {
					  		this.userChannelId = res.data.userChannelId
					  	}
					  }
				  });
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #D91B1B;
		text-align: center;
	}

	.pop {
		width: 710rpx;
		background-color: #f8f8f8;
		text-align: center;
		padding-bottom: 80rpx;
		border-radius: 10rpx;
	}

	.topimg {
		width: 100%;
	}

	.cards {
		margin: 0 25rpx;
		padding: 25rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		box-sizing: border-box;

		image {
			height: 340rpx;
			width: 650rpx;
		}
	}

	.btn-pop {
		display: flex;
		justify-content: space-between;
		align-items: center;
width: 260rpx;
height: 50rpx;
		border: 1px solid #999999;
		border-radius: 10rpx;
	}
	.pop-btn{
		width: 301rpx;
		height: 81rpx;
		background: #D91B1B;
		border-radius: 40rpx;
		text-align: center;
		line-height: 81rpx;
		color: #ffffff;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 40rpx;
	}
</style>
