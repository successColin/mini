<template>
	<view class="page">
		<u-tabs v-if="searchField.brand_id" :activeStyle="{
			    color: '#222222',
			    fontWeight: 'bold',
				fontSize:'28rpx',
			    transform: 'scale(1.05)',
			}" :inactiveStyle="{
				color: '#999999',
				fontSize:'28rpx',
				fontWeight: 500,
			}" itemStyle="height:50rpx" lineHeight="8rpx" lineWidth="54rpx"
			lineColor="linear-gradient(0deg, #D91B1B 0%, #FFFFFF 100%)" keyName='brand_name' :list="brandList"
			@click="OnClickTags">
		</u-tabs>
		<view v-if="dataList.length>0" class="list">
			<view class="list_item flex" v-for="item in dataList" :key="item.id" @click="()=>openMsg(item)">
				<view class="img_div">
					<image class="img" mode="aspectFill" :src="item.image"></image>
				</view>
				<view class="content_div">
					<view class="title">{{item.vehicle_name}}</view>
					<view v-if="item.guide_price_min==item.guide_price_max" class="guide_price">指导价:
						{{item.guide_price_min}}万
					</view>
					<view v-else class="guide_price">指导价: {{item.guide_price_min}}万-{{item.guide_price_max}}万</view>
					<view class="flex jsb" style="align-items: flex-end;">
						<view class="flex" style="align-items: flex-start;">
							<image style="width: 16rpx;height: 22rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695103130744.png">
							</image>
							<text v-if="item.reduce_price_min==item.reduce_price_max"
								class="preferential">{{item.reduce_price_min}}万</text>
							<text v-else
								class="preferential">{{item.reduce_price_min}}万-{{item.reduce_price_max}}万</text>
							<image style="width: 22rpx;height: 22rpx;" @click.stop="tipShow=true"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695103147135.png">
							</image>
						</view>
						<view class="btn">
							<text class="btn_txt">咨询</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-else class="tac mt50">
			<image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
			</image>
			<view class="txtDarkGray">暂无车款</view>
		</view>
		<u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
		<view class="reachBottom" v-if="dataList.length > 0 && isReachBottom">我到底啦~</view>
		<view style="height: 50rpx;"></view>
		<u-popup :show="tipShow" mode="center" @close="tipShow=false" round="6" :safeAreaInsetBottom="false"
			zIndex="10076">
			<view class="flex alc" style="padding: 40rpx 0;width: 650rpx;flex-direction: column;">
				<text>优惠金额仅供参考，实际以当地采购价为准</text>
				<view class="btn" style="width: 120rpx;height: 60rpx;line-height: 60rpx;margin-top: 30rpx;"
					@click="tipShow=false">
					<text class="btn_txt">好的</text>
				</view>
			</view>
		</u-popup>
		<consultation v-if="msgShow" @close="msgShow=false" title="获取底价" :msgObj="msgObj" :type="type"></consultation>
	</view>
</template>

<script>
	import consultation from './consultation.vue'
	export default {
		components: {
			consultation
		},
		props: {
			type: { //类型  1银行分期  2融资租赁
				type: Number,
				default: 1
			},
			brandApi: String, //品牌api接口
			carApi: String //车辆列表api接口
		},
		data() {
			return {
				brandList: [],
				searchField: {
					page: 1,
					page_size: 10,
					// status: 1,
					brand_id: '',
					vehicle_name: '',
					// type: ''
				},
				default_brand_id: "",
				loadMore: false, //加载更多
				isReachBottom: false, //没有更多
				dataList: [],
				tipShow: false,
				msgShow: false,
				msgObj: {}
			}
		},
		mounted() {
			uni.$on('51carOther_carList', (res) => { //type:1 搜索 (传title)  type:2 分页
				if (res.type == 1) {
					this.searchField.page = 1
					this.isReachBottom = false
					this.loadMore = false
					this.searchField.vehicle_name = res.title
					if (res.title) {
						this.searchField.brand_id = ""
					} else {
						this.searchField.brand_id = this.default_brand_id
					}
					this.getList()
				} else if (res.type == 2) {
					if (!this.isReachBottom && !this.loadMore) {
						this.searchField.page += 1
						this.getList()
					}
				}
			})
			// this.searchField.type = this.type
			if (this.brandApi) {
				this.getBrandList()
			}
		},
		destroyed() {
			uni.$off('51carOther_carList')
		},
		methods: {
			OnClickTags(obj) {
				this.searchField.brand_id = obj.brand_id
				this.searchField.page = 1
				this.isReachBottom = false
				this.loadMore = false
				this.getList()
			},
			getBrandList() {
				if (this.type == 1) {
					this.$request51help.post(this.brandApi, {
							club_car_type: this.type
						})
						.then(res => {
							if (res.code == 1) {
								this.brandList = res.data
								if (res.data.length > 0) {
									this.searchField.brand_id = res.data[0].brand_id
									this.default_brand_id = res.data[0].brand_id
									if (this.carApi) {
										this.getList()
									}
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						})
				} else if (this.type == 2) {
					this.$request51car.post(this.brandApi, {
							api_name: 'brand_list',
							list_type: 4
						})
						.then(res => {
							if (res.code == 1) {
								this.brandList = res.data
								if (res.data.length > 0) {
									this.searchField.brand_id = res.data[0].brand_id
									this.default_brand_id = res.data[0].brand_id
									if (this.carApi) {
										this.getList()
									}
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						})
				}
			},
			getList() {
				if (this.type == 1) {
					this.loadMore = true
					this.$request51help.post(this.carApi, this.searchField)
						.then(res => {
							if (res.code == 1) {
								if (this.searchField.page === 1) {
									this.dataList = res.data
								} else {
									res.data.forEach(m => {
										this.dataList.push(m)
									})
								}
								if (res.data.length < this.searchField.page_size) {
									this.isReachBottom = true
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						}).finally(() => {
							this.loadMore = false
						})
				} else {
					this.loadMore = true
					let msg = Object.assign({}, this.searchField)
					msg.vehicle_title = msg.vehicle_name
					msg.api_name = 'rz_car_list'
					delete msg['vehicle_name']
					this.$request51car.post(this.carApi, msg)
						.then(res => {
							if (res.code == 1) {
								res.data.forEach(m => {
									m.image = m.car_img
								})
								if (this.searchField.page === 1) {
									this.dataList = res.data
								} else {
									res.data.forEach(m => {
										this.dataList.push(m)
									})
								}
								if (res.data.length < this.searchField.page_size) {
									this.isReachBottom = true
								}
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						}).finally(() => {
							this.loadMore = false
						})
				}
			},
			openMsg(obj) {
				this.msgShow = true
				this.msgObj = obj
			}
		}
	}
</script>

<style scoped lang="scss">
	.page {
		margin-top: 25rpx;
	}

	.list {
		margin-top: 30rpx;
	}

	.list_item {
		width: 700rpx;
		height: 171rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 20rpx;

		.img_div {
			.img {
				width: 193rpx;
				height: 171rpx;
				margin-left: 25rpx;
			}
		}

		.content_div {
			width: 100%;
			padding: 25rpx 25rpx 0 0;
			margin-left: 32rpx;

			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #222222;
			}

			.guide_price {
				font-size: 24rpx;
				font-weight: 500;
				color: #222222;
				margin-top: 15rpx;
			}

			.preferential {
				font-size: 24rpx;
				font-weight: 300;
				color: #D91B1B;
				line-height: 24rpx;
				margin: 0 10rpx;
			}
		}
	}

	.btn {
		width: 85rpx;
		height: 42rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 42rpx;

		.btn_txt {
			font-size: 24rpx;
			font-weight: 500;
			color: #FFFFFF;
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
</style>
