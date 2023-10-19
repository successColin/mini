<template>
	<view class="page">
		<view class="top-title">
			<view style="font-size: 32rpx;font-weight: bold;line-height: 60rpx;">
				{{dataList.newVehicleInfoCXDetailVOS[0].cxTitle}}
			</view>
		</view>
		<view style="font-size: 24rpx;color: #999999;margin: 28rpx;margin-top: -28rpx;">
			{{dataList.askNum}}人咨询
		</view>
		<view class="price-item">
			<text
				style="font-size: 52rpx;font-weight: bold;color: #D91B1B;">{{(dataList.newVehicleInfoCXDetailVOS[0].price/10000)}}</text>
			<text style="font-size: 32rpx;font-weight: bold;color: #D91B1B;margin-left: 6rpx;">万</text>
			<text
				style="font-size: 28rpx;color: #999999;margin-left: 18rpx;">新车指导价{{(dataList.newVehicleInfoCXDetailVOS[0].elevatingPrice/10000)}}万</text>
		</view>
		<view style="margin:25rpx 28rpx;margin-left: 12rpx;" class="u-flex">
			<view v-for="(item,index) in dataList.vehicleTagsList" :key="index" style="margin-left: 12rpx;">
				<view class="vehicleTagsList">
					{{item}}
				</view>
			</view>
		</view>
		<view>
			<scroll-view style="margin-left: 17rpx;width: 722rpx;white-space: nowrap;" scroll-x="true">
				<view class="u-flex">
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.firstLicenseDate}}
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							上牌时间
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.mileage/10000}}万公里
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							表显里程
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.emissionStandardMsg}}
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							排放标准
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.licenseAddress}}
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							上牌地
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.transferNum}}次
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							过户次数
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.compulsoryInsuranceDate}}
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							交强险到期
						</view>
					</view>
					<view class="tag-item">
						<view style="font-size: 24rpx;font-weight: bold">
							{{dataList.commercialInsuranceDate}}
						</view>
						<view style="margin-top: 18rpx;color: #666666;">
							商业险到期
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view v-if="dataList.energyType!='2'" class="stages">
			<view style="color: #D91B1B;font-size: 28rpx;font-weight: bold;">
				{{dataList.showMsg[0]}}
			</view>
			<view style="margin-left: 71rpx;">
				{{dataList.showMsg[1]}}
			</view>
			<view>
				{{dataList.showMsg[2]}}
			</view>
		</view>
		<view @click="OnPushHome" class="adress" >
			<view class="u-flex" style="align-items: center;">
				<view>
					<u-avatar mode='widthFix' size="50" :src="dataList.shopAvatar" shape="square"></u-avatar>
				</view>
				<view style="margin-left: 17rpx;">
					<view style="font-size: 32rpx;font-weight: bold;">{{dataList.shopName}}</view>
					<view style="font-size: 24rpx;color: #666666;margin-top: 21rpx;">{{dataList.shopAddress}}</view>
				</view>
			</view>
			<view class="u-flex" @click.stop="OnOnLocation">
				<view>
					<image src="../static/image/dingwei.png" style="width: 24rpx;height: 30rpx;"></image>
				</view>
				<view style="font-size: 24rpx;margin-left: 14rpx;">
					{{dataList.distance}}
				</view>
			</view>
		</view>
		<view class="parse">
			<u-parse :content="dataList.detail"></u-parse>
		</view>
		<view style="height: 200rpx;"></view>
					<!--  #ifdef MP-WEIXIN  -->
		<view class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
			<view class="view" style="justify-content: space-around;" :style="{paddingBottom:safeHeight>0?0:'21rpx'}">
				<view @click="OnPushSame" v-if="dataList.sameNum>0" style="margin-left: 53rpx;">
					<image style="width: 93rpx;height: 80rpx;" src="../static/image/tongkuanxinche.png"></image>
				</view>
				<view v-else style="width: 93rpx;margin-left: 53rpx;height: 80rpx;"></view>
			<!-- 	<view @click="Onshowmanger" class="btn-bottom" style="margin-left: 50rpx;">
					联系销售
				</view> -->
				<view @click="Onshowfloorprice" class="btn-bottom" style="margin-left: 23rpx;">
					获取底价
				</view>
			</view>
		</view>
			<!--  #endif -->
		<u-popup :closeable='true'  :safeAreaInsetBottom='false' :show="showmanger" @close="showmanger=false" mode="bottom">
			<view class="pop-title">联系销售</view>
			<view v-for="(item,index) in dataList.salesConsultantListVOS" :key="index"
				style="margin-left: 25rpx;margin-right: 50rpx;">
				<view class="manger-list">
					<view class="u-flex" style="align-items: center;">
						<view>
							<u-avatar size="46" :src="item.headPortrait"></u-avatar>
						</view>
						<view style="margin-left: 24rpx;">
							<view style="font-size: 36rpx;font-weight: bold;">
								{{item.nickname}}
							</view>
							<view style="font-size: 24rpx;color: #666666;">
								已服务{{item.num}}人
							</view>
						</view>
					</view>
					<view class="pop-choose">
						<view @click="OnWechat(item)" style="margin-right: 30rpx;">
							<image style="width: 48rpx;height: 75rpx;" src="../static/image/weixinlianxi.png"></image>
						</view>
						<view @click="OnTell(item)" >
							<image style="width: 38rpx;height: 71rpx;" src="../static/image/dianhualianxi.png"></image>
						</view>
					</view>
				</view>
			</view>
			<view style="height: 60rpx;">
			</view>
		</u-popup>
		<u-popup :closeable='true'  :safeAreaInsetBottom='false' :show="showcontact" @close="showcontact=false" mode="center">
			<view style="width: 700rpx;height: 700rpx;">
				<view style="text-align: center;margin-top: 50rpx;">
					<image @click="OnpreviewImage" :show-menu-by-longpress="true" style="width: 440rpx;height: 444rpx;" :src="codeurl"></image>
				</view>
				<view style="font-size: 24rpx;text-align: center;margin-top: 50rpx;">
					<view>长按保存销售经理微信二维码</view>
		
				</view>
			</view>
		</u-popup>
		<u-popup :closeable='true'  :safeAreaInsetBottom='false' :show="showfloorprice" @close="showfloorprice=false" mode="bottom">
			<floorprice @OnClosefloorprice='OnClosefloorprice' :shopId='shopId' ref="Son" cartype='0' :dataList="dataList"></floorprice>
		</u-popup>
	</view>
</template>

<script>
	import {
	  tologin,
	} from '@/utils/index.js'
	import floorprice from "@/pages/carShops/4Sdetail/components/floorprice.vue"
	export default {
		components: {
floorprice
		},
		data() {
			return {
				showcontact:false,
				safeHeight: 0,
				showmanger: false,
				codeurl:'',
				showfloorprice:false
			}
		},
		props: {
			dataList: {
				type: Object,
			},
			shopId: {
				type: String
			},
			isback:{
				type:Boolean,
				 default: false
			}
		},
		onLoad() {},
		onShow() {},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight = data.height
			}).exec()

		},
		methods: {
			Onshowmanger(){
				if (tologin() !== true) {
				  return;
				}
				this.showmanger=true
			},
			OnpreviewImage(){
				let _this=this
				uni.previewImage({
							urls: _this.codeurl,
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {
								},
								fail: function(err) {
									console.log(err.errMsg);
								}
							}
						});
			},
			OnPushSame() {
				uni.navigateTo({
					url: '/pages/carShops/carList/samenew?shopId=' + this.shopId + '&vehicleId=' + this.dataList
						.vehicleId
				})
			},
			OnPushHome() {
					if(!this.isback){
						uni.navigateTo({
							url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopId
						})
					}
			
			},
			OnClosefloorprice(){
				this.showfloorprice = false
			},
			Onshowfloorprice() {
				if (tologin() !== true) {
				  return;
				}
				this.showfloorprice = true
				setTimeout(() => {
					this.$refs.Son.setrule()
				}, 200)
			},
			OnTell(item) {
				if (this.dataList.isBind == 0) {
					this.$request.post("/coc-active/api/v1/four_s/sales_consultant/bind",{
						id:item.id
					}).then(res => {
						if (res.code == 200) {
							uni.$emit('update')
						} else {
							uni.$u.toast(res.message)
						}
					})
				}
				this.$request.post("/coc-active/api/v1/four_s/save_data", {
					type: 3,
					vehicleInfoCxId: this.dataList.newVehicleInfoCXDetailVOS[0].id,
					shopId: this.shopId
				})
				this.showmanger = false
				uni.makePhoneCall({
					phoneNumber: item.mobile
				});
			},
			OnWechat(item) {
				if (this.dataList.isBind == 0) {
					this.$request.post("/coc-active/api/v1/four_s/sales_consultant/bind",{
						id:item.id
					}).then(res => {
						if (res.code == 200) {
							uni.$emit('update')
							this.$request.post("/coc-active/api/v1/four_s/save_data", {
								type: 3,
								vehicleInfoCxId: this.dataList.newVehicleInfoCXDetailVOS[0].id,
								shopId: this.shopId
							})
							this.codeurl = item.code
							this.showcontact = true
							this.showmanger = false
						} else {
							uni.$u.toast(res.message)
						}
					})
				}else{
					this.$request.post("/coc-active/api/v1/four_s/save_data", {
						type: 3,
						vehicleInfoCxId: this.dataList.newVehicleInfoCXDetailVOS[0].id,
						shopId: this.shopId
					})
					this.codeurl = item.code
					this.showcontact = true
					this.showmanger = false
				}
		
			},
			
			OnOnLocation() {
				let _this = this
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = _this.dataList.lat;
						const longitude = _this.dataList.lng;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #ffffff;
		padding-bottom: 100rpx;
	}

	.top-title {
		display: flex;
		justify-content: space-between;
		margin: 42rpx 28rpx;
	}

	.price-item {
		margin: 0rpx 28rpx;
	}

	.vehicleTagsList {
		border-radius: 10rpx;
		background-color: rgba(217, 27, 27, 0.08);
		padding: 13rpx 13rpx 9rpx 13rpx;
		color: #D91B1B;
		font-size: 24rpx;
	}

	.tag-item {
		background: #F8F8F8;
		border-radius: 10rpx;
		padding: 30rpx 15rpx 26rpx 15rpx;
		font-size: 24rpx;
		margin-left: 8rpx;
		text-align: center;
	}

	.stages {
		margin: 18rpx 25rpx 23rpx 25rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		display: flex;
		padding: 28rpx 29rpx;
		align-items: center;
		font-size: 24rpx;
	}

	.adress {
		margin: 25rpx;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		border: 1rpx solid #F8F8F8;
		box-shadow: 0rpx 3rpx 5rpx 0rpx rgba(142, 142, 142, 0.09);
		border-radius: 10rpx;
		padding: 15rpx;
	}

	.parse {
		margin: 25rpx;
	}

	.bottom-btn {
		width: 100%;
		padding: 20rpx 0rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #ffffff;
		margin-top: 40rpx;
		font-size: 24rpx;

		.view {
			display: flex;
			font-size: 28rpx;
			padding-top: 22rpx;
		}
	}

	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.btn-bottom {
		width: 253rpx;
		height: 68rpx;
		background: #D91B1B;
		text-align: center;
		line-height: 68rpx;
		border-radius: 34rpx;
		color: #FFFFFF;
	}

	.btn-bottom {
		width: 253rpx;
		height: 68rpx;
		background: #D91B1B;
		text-align: center;
		line-height: 68rpx;
		border-radius: 34rpx;
		color: #FFFFFF;
	}

	.pop-title {
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 47rpx;
	}

	.manger-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 34rpx;
	}

	.pop-choose {
		display: flex;
		align-items: center;
	}
</style>
