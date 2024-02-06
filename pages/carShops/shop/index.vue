<template>
	<view class="page">
		<scroll-view :scroll-y="true" @scrolltolower="onReachScollBottom" style="max-height: calc(100vh);">
			<view class="content">
				<view class="u-flex-al jsb" style="margin-top:25rpx;">
					<view class="u-flex">
						<view style="width: 630rpx;">
							<u-search placeholder="搜索品牌4S店" :clearabled="true" v-model="oldSearchTxt" :showAction="false"
								@search='search'></u-search>
						</view>
						<view style="position: relative;margin-left: 12rpx;height: 55rpx;">
							<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061953183.png" style="width: 55rpx;height: 55rpx;"></image>
							<button open-type='contact' session-from='' class="kefu-contact"></button>
						</view>
					</view>
				</view>
				<carousel :topStyle="{marginTop: '25rpx'}" height="300rpx" urlkey="url" :dataType="2"
					systemCode="applets_four_s_list" :indicatorType="3"></carousel>
				<view style="margin: 16rpx 0 0 0;">
					<view class="nearBox" v-for="item in dataList" @click="jumpDetail(item.shopId)">
						<view  class="newrH u-flex-al">
							<image v-if='item.brandLogo' mode="heightFix" :src="item.brandLogo" class="shopLogo"></image>
							<text>{{item.storeAbbreviation}}</text>
						</view>
            <view class="flex alc jsb mb20" v-if="item.doorheadPhotos&&item.doorheadPhotos.length>0">
              <template v-if="item.doorheadPhotos.length == 3">
                <image :src="photo" class="nearItemManyPic" mode="aspectFill" :key="index" v-for="photo in item.doorheadPhotos">
                </image>
              </template>
              <template v-if="item.doorheadPhotos.length == 1">
                <image :src="item.doorheadPhotos[0]" class="nearItemOnePic" mode="aspectFill" >
                </image>
              </template>
            </view>
						<view v-if="item.storeLabel" class="shopSpetial">
							<text class="shopSpetial-text">{{item.storeLabel}}</text>
						</view>
						<view class="flex alc jsb">
							<view class="flex alc">
								<view class="flex alc" @click.stop="showLocation(item.lng,item.lat)">
									<image src="@/static/image/dingwei.png" class="dwIcon"></image>
									<view class="size24 fwb ml10">{{item.distanceMsg}}</view>
								</view>
								<view v-if="item.mobile" class="flex alc" @click.stop="clickTel(item.mobile)">
									<image src="@/static/image/dianhua.png" class="telIcon ml20">
									</image>
									<view class="size24 fwb ml10">{{item.mobile}}</view>
								</view>
							</view>
							<view class="goShop">进店</view>
						</view>
					</view>
				</view>
				<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
				<view class="reachBottom" v-if="dataList.length>0&&isReachBottom">我到底啦~</view>
				<view v-if="dataList.length==0&&isReachBottom" style="text-align: center;margin-top:200rpx;">
					<view>
						<image style="width: 350rpx;height: 280rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
						</image>
					</view>
					<view style="font-size: 24rpx;color: #999999;">
						暂无4s店
					</view>
				</view>
				<view style="height: 30rpx;"></view>
			</view>
		</scroll-view>
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
				oldSearchTxt: '',
				searchField: {
					title: ''
				},
				dataList: [],
				loadMore: false, //加载更多
				isReachBottom: false //没有更多
			}
		},
		onLoad(options) {
			if (options.searchtxt) {
				this.oldSearchTxt = options.searchtxt
				this.searchField.title = options.searchtxt
			}
			this.queryList()
		},
		methods: {
		
			//获取列表
			queryList() {
				// this.dataList = []
				this.loadMore = true
				let msg = Object.assign({}, this.searchField)
				if (!msg.title) {
					// delete msg['title']
					msg.title=''
					msg.current=1
				}
				this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS", msg)
					.then(res => {
						if (res.code == 200) {
								this.dataList = res.data
		
						} else {
							uni.showToast({
								title: res.message,
								icon: 'none',
								duration: 2000
							})
						}
					}).finally(() => {
						this.loadMore = false
					})
			},
			//搜索
			search() {
				this.searchField.title = this.oldSearchTxt
				this.isReachBottom = false
				this.loadMore = false
				this.searchField.current = 1
				this.queryList()
			},
			//显示位置
			showLocation(lng, lat) {
				uni.openLocation({
					latitude: lat,
					longitude: lng,
					success: function() {
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		color: #222222;
	}

	.content {
		padding: 0 25rpx;
	}

	.search {
		width: 630rpx;
		height: 80rpx;
		box-shadow: 0rpx 3rpx 5rpx 3rpx rgba(51, 51, 51, 0.06);
		border-radius: 40rpx;
		background: #FFFFFF;
		position: relative;

		.input {
			width: 520rpx;
			height: 80rpx;
			font-size: 28rpx;
			margin-left: 28rpx;
			font-family: PingFang SC;
			color: #999999;
		}

		.btn {
			height: 80rpx;
			position: absolute;
			bottom: 0;
			right: 31rpx;
		}
	}

	.nearBox {
		padding: 25rpx;
		margin-bottom: 16rpx;
		background: #FFFFFF;
		border-radius: 10rpx;

		.newrH {
			font-size: 32rpx;
			font-weight: bold;
			font-family: PingFang SC;
			margin-bottom: 22rpx;

			.shopLogo {
				margin-right: 20rpx;
				height: 50rpx;
			}
		}

		.nearItemOnePic {
			width: 650rpx;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.nearItemManyPic {
			width: 210rpx;
			height: 210rpx;
			border-radius: 10rpx;
		}

		.shopSpetial {
			background: rgba(217, 27, 27, 0.1);
			border-radius: 10rpx;
			padding: 10rpx 25rpx;
			display: inline-block;
			margin-bottom: 8rpx;

			.shopSpetial-text {
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #D91B1B;
			}
		}

		.dwIcon {
			width: 24rpx;
			height: 30rpx;
		}

		.telIcon {
			width: 26rpx;
			height: 25rpx;
		}

		.goShop {
			width: 100rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #D91B1B;
			border-radius: 10rpx;
			text-align: center;
			color: #FFFFFF;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;

		}
	}

	.reachBottom {
		text-align: center;
		font-size: 24rox;
		color: #999999;
		padding: 20rpx;
		font-size: 24rpx;
		color: #999999;
	}

	.kefu-contact {
		position: absolute;
		width: 55rpx;
		height: 55rpx;
		top: 0;
		opacity: 0;
	}

	.u-flex {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.u-flex-al {
		display: flex;
		align-items: center;
	}

	.ellipsis {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.ml15 {
		margin-left: 15rpx;
	}
</style>
