<template>
	<view class="page">
		<view class="order-list" @click="OnPushOrder">
			<image style="width: 141rpx;height: 52rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230625/file_1687653531472.png"></image>
		</view>
		<view class="top">
			<!-- <view class="vipone" v-if="dataList.roadVip==1">
				待投保
			</view> -->
			<view class="vipone"  v-if="dataList.roadVip==2">
				权益到期时间:{{dataList.roadVipExp}}
			</view>
		</view>
		<view class="card">
			<view class="size32 fwb ">
				救援项目说明
			</view>
			<view class="card-title">
			</view>
			<view>
				<u-divider :text="null"></u-divider>
			</view>
			<view class="u-flex jsb">
				<view v-for="(item,index) in list1" :key="index" class="txtLighGray size28"
					:class="{'selecttag':index==tagindex}" @click="OnClickTag(index)">
					<view>
						{{item.name}}
					</view>
					<view class="u-flex jsc" v-if="index==tagindex">
						<view class="tac tag-item">
						</view>
					</view>

				</view>
			</view>
			<view v-if="tagindex==2">
				<view class="tac mt20">
					<image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642010807.png">
					</image>
				</view>
				<view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
					车辆在正常辅装道路行驶过程中不慎脱离行驶道路陷入困境(如轮胎卡并、陷入泥坑等)，车辆无损失但无法正常驶离困境，无需动用辅助设备、吊车等协助摆脱困境。
				</view>
			</view>
			<view v-else-if="tagindex==0">
				<view class="tac mt20">
					<image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641805787.png">
					</image>
				</view>
				<view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
					车辆在道路行驶过程中因轮胎故障(爆胎、亏气、扎钉等情况)无法正常行驶时，提供更换备胎服务救援无忧卡服务用户需自备完好足气备胎。
				</view>
			</view>
			<view v-else-if="tagindex==1">
				<view class="tac mt20">
					<image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641924703.png">
					</image>
				</view>
				<view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
车辆因缺电无法正常启动，救援车辆将前来救援，将救援车辆的电池或其他外部电源连接到故障车辆，以达到启动故障车辆的目的。离市、县中心区50公里以内的免费救援，超过50公里的救援费用由用户自行承担。				</view>
			</view>
			<view v-else-if="tagindex==3">
				<view class="tac mt20">
					<image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642116252.png">
					</image>
				</view>
				<view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
车辆因故障无法正常行驶，即接电、快修、换胎等救援项目无法解决问题的。拖车负责将故障车辆拖至就近50公里之内的维修场所，超过50公里的救援费用由用户自行承担。				</view>
			</view>
			<view v-else-if="tagindex==4">
				<view class="tac mt20">
					<image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642162555.png">
					</image>
				</view>
				<view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
车辆位于地下车库、地下室、高层车库无法行驶时，救援车辆利用牵引辅具将故障车辆牵引脱离现场至指定位置，超过50公里的救援费用由用户自行承担。				</view>
			</view>
		</view>
		<view class="bottom-btn">
			<view class="tohelp" @click="Onpushloadhelp">我要救援</view>
		</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				dataList:{},
				tagindex: 0,
				list1: [ {
					name: '更换轮胎',
				}, {
					name: '车辆搭电'
				},{
					name: '困境救援',
				},
				{
					name: '平板拖车'
				}, {
					name: '地库牵引'
				}]
			}
		},

		onLoad(option) {
			console.log(option)
		},
		onShow() {
			this.getList()
		},
		methods: {
			OnPushOrder(){
				uni.navigateTo({
					url: '/pages/roadhelp/orderlist'
				})
			},
			getList(){
				this.$request.get("coc-my/api/v1/my/findUser").then(res=>{
					this.dataList=res.data.user
				})
			},
			Onpushloadhelp() {
			uni.navigateTo({
				url: '/pages/roadhelp/index/index'
			})
			},
			OnClickTag(e) {
				this.tagindex = e
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.top {
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688608144429.png");
		background-size: 100% 100%;
		height: 1133rpx;
		width: 100%;
	}

	.card {
		background: #FFFFFF;
		border-radius: 10rpx 60rpx 10rpx 10rpx;
		padding: 50rpx 20rpx 20rpx 20rpx;
		margin: 22rpx;
	}

	.card-title {
		background: #D91B1B;
		opacity: 0.12;
		height: 8rpx;
		width: 190rpx;
		margin-top: -10rpx;
	}

	.selecttag {
		color: #222222;
		font-weight: bold;
	}

	.tag-item {
		width: 24rpx;
		height: 4rpx;
		background: #D91B1B;
		border-radius: 2rpx;
		text-align: center;
	}

	.bottom-btn {
		position: fixed;
		z-index: 9999;
		bottom: 0rpx;
		background: #FFFFFF;
		width: 100%;
		height: 120rpx;
		display: flex;
		justify-content: center;
	}

	.tohelp {
		width: 330rpx;
		height: 70rpx;
		background: #D91B1B;
		border-radius: 35rpx;
		color: #ffffff;
		line-height: 70rpx;
		text-align: center;
		margin-top: 20rpx;
	}
	.vipone{
		color: #6E4029;
		font-size: 28rpx;
		text-align: center;
		position: relative;
		top: 31%;
	}
	.order-list{
		position: fixed;
		right: -20rpx;
		margin-top: 5%;
	}
</style>
