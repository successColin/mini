<template>
	<view class="page">
		<carousel :topStyle="{ marginTop: '20rpx' }" :radius="5" height="300rpx" urlkey="url" :dataType="2"
			systemCode="applets_visiting_four_s_stores" :indicatorType="5">
		</carousel>
		<view class="tab_list">
			<image class="tab_item" v-for="item in tabList" :src="item.url" @click="jumpShowUrl(item)"></image>
		</view>
		<view style="margin-top: 20rpx;">
			<u-tabs :activeStyle="{
			    color: '#222222',
			    fontWeight: 'bold',
				fontSize:'28rpx',
			    transform: 'scale(1.05)',
			}" :inactiveStyle="{
				color: '#999999',
				fontSize:'28rpx',
				fontWeight: 500,
			}" itemStyle="height:50rpx" lineHeight="8rpx" lineWidth="54rpx"
				lineColor="linear-gradient(0deg, #D91B1B 0%, #FFFFFF 100%)" keyName='brandName' :list="fourbrand"
				@click="OnClickTags">
			</u-tabs>
		</view>
		<scroll-view style="width: 700rpx; white-space: nowrap;margin-bottom: 30rpx;margin-top: 30rpx;" scroll-x="true">
			<view class="flex">
				<view v-for="(item,index) in fourSShopVO" :key="item.shopId" style="margin-right: 20rpx;"
					class="shop-btn" :class="{'shop-btn-s':shopindex==index,'allbtn':item.shopId==0}"
					@click="OnchooseShopId(item,index)">
					<view>
						{{item.baseName}}
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="modalBox nearBox" v-for="item in shopList" mode="heightFix" :key="item.shopId"
			@click="jumpDetail(item.shopId)">
			<view class="newrH mb20 u-flex-al">
				<image v-if="item.brandLogo" :src="item.brandLogo" class="shopLogo" mode="heightFix"></image>
				<text>{{ item.storeAbbreviation }}</text>
			</view>
			<view class="flex alc jsb" v-if="item.doorheadPhotos && item.doorheadPhotos.length > 0">
				<template v-if="item.doorheadPhotos.length == 3">
					<image :src="photo" class="nearItemPic3" mode="aspectFill" :key="index"
						v-for="photo in item.doorheadPhotos">
					</image>
				</template>
				<template v-if="item.doorheadPhotos.length == 1">
					<image :src="item.doorheadPhotos[0]" class="nearItemPic1" mode="aspectFill">
					</image>
				</template>
			</view>
			<view v-if="item.storeLabel" class="shopSpetial">{{ item.storeLabel }}</view>
			<view class="flex alc jsb" :style="{'marginTop':item.storeLabel?'10rpx':'20rpx'}">
				<view class="flex alc">
					<view class="flex alc" @click.stop="showLocation(item.lng, item.lat)">
						<image src="@/static/image/dingwei.png" class="dwIcon"></image>
						<view class="ml10 size24">{{ item.distanceMsg }}</view>
					</view>
					<view v-if="item.mobile" class="flex alc ml20" @click.stop="clickTel(item.mobile)">
						<image src="@/static/image/dianhua.png" class="telIcon"></image>
						<view class="ml10 size24">{{ item.mobile }}</view>
					</view>
				</view>
				<view class="goShop">进店</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			carousel
		},
		data() {
			return {
				tabList: [{
					name: '新车鉴赏',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230920/file_1695176975316.png',
					type: 4
				}, {
					name: '维修保养',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230920/file_1695177028408.png',
					type: 5
				}, {
					name: '玩乐专区',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230920/file_1695177049408.png',
					type: 6
				}, {
					name: '二手车评估',
					url: 'https://oss.dcqcjlb.com/51che_java_dev/20230920/file_1695177070077.png',
					type: 7
				}],
				fourSShopVO: {},
				shopindex: 0,
				fourbrand: [],
				brandId: "",
				shopList: [],
			}
		},
		mounted() {
			this.getBrand()
		},
		methods: {
			jumpShowUrl(item) {
				uni.navigateTo({
					url: `/pages/carShops/51carOther/showPage?type=${item.type}&title=${item.name}`
				})
			},
			OnchooseShopId(item, index) {
				if (item.shopId == 0) {
					this.shopindex = index
					this.getList()
				} else {
					uni.navigateTo({
						url: '/pages/carShops/4Sdetail/index?id=' + item.shopId
					})
				}

			},
			OnClickTags(e) {
				this.shopindex = 0
				this.brandId = e.brandId
				this.shopId = this.fourbrand[e.index].fourSShopVO[0].shopId
				this.fourSShopVO = this.fourbrand[e.index].fourSShopVO
				this.getList()
			},
			getBrand() {
				this.$newrequest.post("/coc-active/api/v1/four_s/fourSBrand").then(res => {
					res.data.filter(s => {
						if (s.fourSShopVO.length > 1) {
							s.fourSShopVO.unshift({
								baseName: '全部',
								shopId: '0'
							})
						}
					})
					this.fourbrand = res.data
					this.shopId = res.data[0].fourSShopVO[0].shopId
					this.brandId = res.data[0].brandId
					this.fourSShopVO = res.data[0].fourSShopVO
					this.getList()
				})
			},
			getList() {
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS", {
					brandId: this.brandId,
					shopId: this.shopId
				}).then(res => {
					this.shopList = res.data
				})
			},
			//显示位置
			showLocation(lng, lat) {
				uni.openLocation({
					latitude: lat,
					longitude: lng,
					success: function() {
						//console.log('success');
					}
				});
			},
			//拨打电话
			clickTel(tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				});
			},
			//跳转详情
			jumpDetail(id) {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + id
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		padding: 0 25rpx;
	}

	.tab_list {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;

		.tab_item {
			width: 165rpx;
			height: 102rpx;
		}
	}

	.shop-btn {
		border-radius: 10rpx;
		background-color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		height: 60rpx;
		line-height: 60rpx;
		padding-left: 10rpx;
		padding-right: 10rpx;
	}

	.shop-btn-s {
		background-color: #ffe2e2;
		color: #D91B1B;
		border: 1rpx #d91b1b solid;
	}

	.allbtn {
		width: 80rpx;
	}

	.modalBox {
		background: #FFFFFF;
		border-radius: 10rpx;
		box-sizing: border-box;
	}

	.mb20 {
		margin-bottom: 20rpx;
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}


	.nearBox {
		padding: 25rpx;
		margin-bottom: 20rpx;

		.newrH {
			font-size: 32rpx;
			font-weight: bold;

			.shopLogo {
				margin-right: 16rpx;
				height: 50rpx;
			}
		}

		.nearItemPic1 {
			width: 100%;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.nearItemPic3 {
			width: 210rpx;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.shopSpetial {
			background: #FBE8E8;
			border-radius: 10rpx;
			color: #D91B1B;
			font-size: 24rpx;
			text-align: center;
			margin-top: 20rpx;
			padding: 10rpx 25rpx;
			display: inline-flex;
		}

		.dwIcon {
			width: 24rpx;
			height: 30rpx;
		}

		.telIcon {
			width: 25rpx;
			height: 25rpx;
		}

	}

	.nearBox:nth-last-child(1) {
		margin-bottom: 0;
	}

	.newCarItem {
		position: relative;
		padding: 0 16rpx 0 0;
		background-color: #fff;
		border-radius: 10rpx;
		margin-bottom: 10rpx;

		.topTip {
			position: absolute;
			top: 0;
			left: 0;
			background-color: rgba(0, 0, 0, .3);
			color: #fff;
			font-size: 24rpx;
			text-align: center;
			padding: 0 25rpx;
			height: 40rpx;
			line-height: 40rpx;
			border-radius: 10rpx 0 10rpx 0;
		}

		.newCarL {
			background: #fff;
			width: 280rpx;
			text-align: center;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 208rpx;

			image {
				width: 260rpx;
				height: 160rpx;
				border-radius: 10rpx;
			}
		}

		.newCarR {
			width: 380rpx;
			padding: 30rpx 0 20rpx;

			.newCarT {
				font-size: 32rpx;
				font-weight: bold;
				margin-right: 10rpx;
				max-width: 200rpx;
			}

			.carDown {
				width: 38rpx;
				height: 41rpx;
			}

			.newCarHui {
				color: #D91B1B;
			}
		}
	}

	.goShop {
		width: 100rpx;
		height: 52rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 52rpx;
		font-size: 24rpx;
		color: #fff;
	}
</style>
