<template>
	<view class="page">
		<view class="top-card">
			<view class="top-text">
				<view v-if="user.roadVip==0||user.roadVip==1" class="u-flex">
					<view>
						<image style="width: 16rpx;height: 21rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689041535651.png">
						</image>
					</view>
					<view class="ml10">待解锁(可购买)</view>
				</view>
				<view v-else-if="user.roadVip==2">
					有效期至：{{user.roadVipExp}}
				</view>
			</view>
		</view>
		<view class="tag-card">
			<!-- 更换轮胎 -->
			<view>
				<view v-if="index==0">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689045889803.png">
					</image>
				</view>
				<view v-else @click="OnClickTag(0)">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689044955041.png">
					</image>
				</view>
			</view>
			<!-- 车辆搭电 -->
			<view>
				<view v-if="index==1">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689046158558.png">
					</image>
				</view>
				<view v-else @click="OnClickTag(1)">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689045564358.png">
					</image>
				</view>
			</view>
			<!-- 困境救援 -->
			<view>
				<view v-if="index==2">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689053095025.png">
					</image>
				</view>
				<view v-else @click="OnClickTag(2)">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689045603621.png">
					</image>
				</view>
			</view>
			<!-- 平板拖车 -->
			<view>
				<view v-if="index==3">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689053138781.png">
					</image>
				</view>
				<view v-else @click="OnClickTag(3)">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689045643666.png">
					</image>
				</view>
			</view>
			<!-- 地库牵引 -->
			<view>
				<view v-if="index==4">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689053186580.png">
					</image>
				</view>
				<view v-else @click="OnClickTag(4)">
					<image class="tag-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689045684826.png">
					</image>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="u-flex jsb" @click="Openpop">
				<view class="size24">请确认救援地点</view>
				<view class="u-flex">
					<view>
						<image style="width: 24rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689053873440.png">
						</image>
					</view>
					<view class="ml10 txtLighGray size24">
						救援说明
					</view>
				</view>
			</view>
			<view class="hr"></view>
			<view class="u-flex jsb mt30 alc" @click="chooseaddress">
				<view class="u-flex  ">
					<view>
						<image style="width: 20rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689054376817.png">
						</image>
					</view>
					<view class="size24 ml10">
						{{address}}
					</view>
				</view>
				<view>
					<u-icon name="arrow-right" :bold='true' size="14px"></u-icon>
				</view>
			</view>
			<view v-if="index==3" class="hr"></view>
			<view v-if="index==3" class="u-flex jsb mt30 alc" @click="choosetraileraddress">
				<view class="u-flex ">
					<view>
						<image style="width: 20rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689060995131.png">
						</image>
					</view>
					<view class="size24 ml10 ">
						{{traileraddress}}
					</view>
				</view>
				<view>
					<u-icon name="arrow-right" :bold='true' size="14px"></u-icon>
				</view>
			</view>
			<view v-if="index==3||index==4" class="hr"></view>
			<view v-if="index==3" class="mt30">
				<view class="u-flex jsb">
					<view>
						是否地库拖车
					</view>
					<view>
						<u-switch v-model="istrailer" activeColor="#D91B1B" size='20'></u-switch>
					</view>
				</view>
				<view class="txtLighGray size24 mt30" v-if="!istrailer">
					若您的爱车在地下停车场或高层停车场，请选择地库拖车
				</view>
				<view v-else class="mt30">
					<view class="u-flex">
						<view class="btn-cheku" :class="{'c-btn':basementtype==1}" @click="Onchoosebasementtype(1)">地下车库
						</view>
						<view class="btn-cheku ml20" :class="{'c-btn':basementtype==2}"
							@click="Onchoosebasementtype(2)">高层车库</view>
					</view>
					<view class="mt30 u-flex jsb alc">
						<view class="size24">请选择救援车辆所在地下层数</view>
						<view>
							<u-number-box v-model="floornum"></u-number-box>
						</view>
					</view>
				</view>
			</view>
			<view v-if="index==4">
				<view class="mt30">
					<view class="u-flex">
						<view class="btn-cheku" :class="{'c-btn':basementtype==1}" @click="Onchoosebasementtype(1)">地下车库
						</view>
						<view class="btn-cheku ml20" :class="{'c-btn':basementtype==2}"
							@click="Onchoosebasementtype(2)">高层车库</view>
					</view>
					<view class="mt30 u-flex jsb alc">
						<view class="size24">请选择救援车辆所在地下层数</view>
						<view>
							<u-number-box v-model="floornum"></u-number-box>
						</view>
					</view>
				</view>
				<view class="hr"></view>
				<view class="u-flex jsb mt30">
					<view>
						是否需要平板拖车
					</view>
					<view>
						<u-switch v-model="isflatbed" activeColor="#D91B1B" size='20'></u-switch>
					</view>
				</view>
				<view class="txtLighGray size24 mt30" v-if="!isflatbed">
					若您的爱车需要拖车处请选择平板拖车
				</view>
				<view class="u-flex mt30" v-else-if="isflatbed" @click="choosetraileraddress">
					<view>
						<image style="width: 20rpx;height: 24rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689060995131.png">
						</image>
					</view>
					<view class="size24 ml10 txtLighGray">
						{{traileraddress}}
					</view>
				</view>
			</view>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="showtext" @close="showtext=false" mode="center">
			<view class="pop">
				<view class="tac mb20 size32 fwb">救援手册</view>
				<text>
					1、更换轮胎：登记车辆在道路行驶过程中因一条轮胎故障（爆胎，亏气，炸钉等情况）无法正常行驶时，救援中心提供更换备胎服务，客户需自备完好足气备胎。说明:如客户车辆出现两条或以上轮胎故障或无足气可用备胎，需要提供拖车服务。
					2、车辆搭电：登记车辆因蓄电池亏电等情况造成车辆无法启动，救援中心提供蓄电池搭电服务；说明：因机舱内有保险盒和模块，线路进水会造成短路引起电器设备损失或者造成车辆损坏，故雨天或车辆进水的情况下，禁止提供搭电服务。
					3、平板拖车/地库牵引:登记车辆在道路行驶中发生故障,即使按本条第1至第4款的规定救援均无法行驶的,原路救援中心负责将车辆拖到就近的车辆维修场所。免费非事故道路救援单日累计拖车公里数不超过50KM,超出50KM的救援费用由您自行承担。(说明:沙漠、沼泽、海滩、河道、田地等非车辆儿正常行驶的道路不属于拖车牵引救援范围内。
					4、困境救援:登记车辆在正常铺装道路行驶过程中,不慎脱离行驶道路陷入困境(如轮胎卡井、陷入泥坑等),车辆无损失但无法正常驶离困境,救援中心动用辅助设备、吊车等协助摆脱困境(说明:沙漠、沼泽、海滩、河道、田地等非车辆正常行驶的道路不属于困境救援范围内)。
				</text>
			</view>
		</u-popup>
		<view class="xiayibu">
			<view class="btn-next" @click="OnNext">
				下一步
			</view>
		</view>

		<!-- 电话 -->
		<view style="position: fixed;right: 25rpx;bottom: 16%;" @click="telcall">
			<image class="bottom-icon"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230714/file_1689318827661.png">
			</image>
		</view>
		<!-- 订单 -->
		<view style="position: fixed;right: 25rpx;bottom: 6%;" @click="OntoorderList">
			<view style="position: absolute;right: 0rpx;">
					<u-badge type="error" max="99" :value="ordernum"></u-badge>
			</view>
			<image class="bottom-icon"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230714/file_1689318803286.png">
			</image>
		</view>
			<u-modal :buttonReverse='true' @confirm='OnAddcar' @cancel='Onpay' :show="shownocar" title="提示" :showCancelButton='true' content='您未绑定爱车,是否添加爱车' confirmColor='#D91B1B' cancelText='继续' confirmText='去添加'></u-modal>
	</view>
</template>

<script>
	import QQMapWX from '@/utils/qqmap/qqmap-wx-jssdk.min.js'
	export default {
		components: {},
		data() {
			return {
				shownocar:false,
				isflatbed: false,
				floornum: 1,
				istrailer: false,
				showtext: false,
				index: 0,
				user: {},
				address: '',
				traileraddress: '请选择拖车目的地',
				lat: '',
				lng: '',
				trailerlat: '',
				trailerlng: '',
				basementtype: 1,
				carlist: {},
				nextdata:{},
				ordernum:0
			}
		},
		onShow() {
		},
		onLoad() {
			let _this = this
			this.getordernum()
			this.getList()
			this.qqmapsdk = new QQMapWX({
				key: 'BH7BZ-PEPCX-SNA47-TZBJA-SKIFV-GVFSW',
			});
			uni.getLocation({
				type: 'wgs84',
				success(res) {
					// 调用接口
					_this.qqmapsdk.reverseGeocoder({
						location: {
							latitude: res.latitude,
							longitude: res.longitude
						},
						fail: function(res) {

						},
						complete: function(res) {
							if (!res.status) {
								_this.address = res.result.address
								_this.lng = res.result.location.lng
								_this.lat = res.result.location.lat
							}
						}
					})
				},
				fail(err) {}
			})
		},
		onShow() {},
		methods: {
			getordernum(){
				this.$request.post("/coc-active/api/v1/road/rescue/workingOrderNum").then(res=>{
					this.ordernum=res.data
				})
			},
			OntoorderList(){
				uni.navigateTo({
					url: '/pages/roadhelp/51help/helpOrder'
				})
			},
			Onpay(){
				this.shownocar=false
				let _this=this
				uni.navigateTo({
					url: '/pages/roadhelp/index/payindex?roadVip=' + this.user.roadVip,
					success: function(s) {
						s.eventChannel.emit('getList', {
							data: _this.nextdata
						})
					}
				})
			},
	OnAddcar(){
		this.shownocar=false
		uni.navigateTo({
			url: '/pages/my/mycar/index'
		})
	},
			OnNext() {
				let data = {
					rescue_start: this.address,
					gps_x: this.lat,
					gps_y: this.lng
				}
				if (this.index == 0) {
					data.rescue_project = [{
						options: 2
					}]
				} else if (this.index == 1) {
					data.rescue_project = [{
						options: 3
					}]
				} else if (this.index == 2) {
					data.rescue_project = [{
						options: 6
					}]
				} else if (this.index == 3) {
					data.rescue_dest = this.traileraddress
					data.des_gps_x = this.trailerlat
					data.des_gps_y = this.trailerlng
					if (this.istrailer) {
						data.rescue_project = [{
							options: 4
						}]
						data.rescue_project.push({
							options: 5,
							floor_pos: this.basementtype - 1,
							floor_number: this.floornum
						})
					} else {
						data.rescue_project = [{
							options: 4
						}]
					}

				} else if (this.index == 4) {
					if (this.isflatbed) {
						data.rescue_project = [{
							options: 4
						}]
						data.rescue_project.push({
							options: 5,
							floor_pos: this.basementtype - 1,
							floor_number: this.floornum
						}) 
					
						data.rescue_dest = this.traileraddress
						data.des_gps_x = this.trailerlat
						data.des_gps_y = this.trailerlng

					} else {
						data.rescue_project = [{
							options: 5,
							floor_pos: this.basementtype - 1,
							floor_number: this.floornum
						}]
					}
				}
				this.$request.post("/coc-active/api/v1/road/rescue/calculatePrice", data).then(res => {
					if (res.code == 200) {
						if(res.data.road_vip==2&&res.data.user_car.length==0){
								this.nextdata=res.data
							this.shownocar=true		
						}else{
						uni.navigateTo({
							url: '/pages/roadhelp/index/payindex?roadVip=' + this.user.roadVip,
							success: function(s) {
								s.eventChannel.emit('getList', {
									data: res.data
								})
							}
						})
						}
					
					} else {
						uni.$u.toast(res.message)
					}
				})
			},
			telcall() {
				uni.makePhoneCall({
					phoneNumber: '4008010111' //仅为示例
				});
			},
			Onchoosebasementtype(index) {
				// this.isflatbed=false
				 // this.istrailer=false
				this.basementtype = index
			},
			choosetraileraddress() {
				let _this = this
				uni.chooseLocation({
					success: function(res) {
						_this.trailerlat = res.latitude
						_this.trailerlng = res.longitude
						_this.traileraddress = res.name

					}
				});
			},
			Openpop() {
				this.showtext = true
			},
			chooseaddress() {
				let _this = this
				uni.chooseLocation({
					success: function(res) {
						console.log(res)
						_this.lat = res.latitude
						_this.lng = res.longitude
						_this.address = res.name

					}
				});
			},
			OnClickTag(index) {
				this.index = index
			},
			getList() {
				this.$request.get('/coc-my/api/v1/my/findUser').then(res => {
					this.user = res.data.user
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top-card {
		margin: 25rpx;
		width: 700rpx;
		height: 348rpx;
		box-shadow: 0rpx 5rpx 14rpx 0rpx rgba(0, 0, 0, 0.11);
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230711/file_1689040478287.png");
		background-size: 100% 100%;
		position: relative;
		border-radius: 20rpx;
	}

	.top-text {
		position: absolute;
		bottom: 50rpx;
		left: 45rpx;
		font-size: 24rpx;
		color: #6E4029;
		font-weight: 400;
	}

	.tag-card {
		display: flex;
		justify-content: space-around;
		margin: 25rpx;
		margin-top: 36rpx;
		margin-bottom: 0rpx;
		padding: 14rpx 25rpx 0 25rpx;
		background-color: #D91B1B;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}

	.tag-img {
		width: 112rpx;
		height: 128rpx;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx;
		border-radius: 0 0 10rpx 10rpx;
		margin: 0 25rpx;
		padding: 25rpx;
	}

	.hr {
		width: 100%;
		background-color: #E8E8E8;
		height: 1rpx;
		margin-top: 30rpx;
	}

	.pop {
		width: 640rpx;
		background-color: #f8f8f8;
		padding: 25rpx;
	}

	.btn-cheku {
		background: #F8F8F8;
		border-radius: 10rpx;
		font-size: 24rpx;
		padding: 12rpx;
	}

	.c-btn {
		background: #FFE9E9;
		border: 1px solid #D91B1B;
		color: #D91B1B;
	}

	.bottom-icon {
		width: 112rpx;
		height: 112rpx;
	}

	.btn-next {
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		font-size: 28rpx;
		color: #ffffff;
		font-weight: bold;
		line-height: 70rpx;
		text-align: center;
	}

	.xiayibu {
		// position: fixed;
		// bottom: 50rpx;
		// left: 50%;
		// transform: translate(-50%, 0%);
		display: flex;
		justify-content: center;
		margin-top: 200rpx;
	}
</style>
