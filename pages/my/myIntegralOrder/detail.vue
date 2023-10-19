<template>
	<view class="page">
		<view v-if="isshowpage">
			<view v-if="dataList.remark" class="card-zhi">
				<view>
					留言：<text style="color: #999999;font-size: 28rpx;">
						{{dataList.remark}}
					</text>
				</view>
			</view>
			<view class="order-detail">
				<view class="u-flex" style="justify-content: space-between;">
					<view>
						商品名称:
					</view>
					<view>
						{{dataList.scoreProductName}}
					</view>
				</view>
					</view>
			<view class="order-detail">
	
				<view class="u-flex" style="justify-content: space-between;">
					<view>
						积分消耗:
					</view>
					<view>
						{{dataList.consumePoints}}
					</view>
				</view>
			<view v-if="dataList.orderCode&&dataList.source==1&&dataList.verificationType==1&&dataList.status!=0&&dataList.status!=4&&dataList.status!=5&&dataList.status!=6" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
				<view>
					兑换码:
				</view>
				<view class="u-flex">
					<view user-select="true">
						{{dataList.orderCode}}
					</view>
					<view @click="OnCopy(dataList.orderCode)" style="margin-left: 14rpx;">
						<image src="../static/image/fuzhi.png" style="height: 22rpx;width:22rpx;"></image>
					</view>
				</view>
			</view>
			<view v-if="dataList.password&&dataList.source==1&&dataList.verificationType==1&&dataList.status!=0&&dataList.status!=4&&dataList.status!=5&&dataList.status!=6" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
				<view>
					密码:
				</view>
				<view>
					<text user-select="true">
						{{dataList.password}}
					</text>
				</view>
			</view>
			<view v-if="dataList.facePrice&&dataList.source==1&&dataList.verificationType==1" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
				<view>
					面值:
				</view>
				<view>
					{{dataList.facePrice}}
				</view>
			</view>
				<view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
					<view>
						订单编号:
					</view>
					<view>
						<text user-select="true">{{dataList.orderNo}}</text>
					</view>
				</view>
				<view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
					<view>
						兑换时间:
					</view>
					<view>
						{{dataList.exchangeTime}}
					</view>
				</view>
			</view>

			<view v-for="(item,index) in dataList.cardLists" :key="index" style="margin-top: 12rpx;">
				<view class="order-detail">
					<view class="u-flex" style="justify-content: space-between">
						<view>
							商品名称:
						</view>
						<view>
							<text user-select="true">
								{{dataList.scoreProductName}}
							</text>
						</view>
					</view>
					<view v-if="item.username" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
						<view>
							兑换码:
						</view>
						<view class="u-flex">
							<view user-select="true">
								{{item.username}}
							</view>
							<view @click="OnCopy(item.username)" style="margin-left: 14rpx;">
								<image src="../static/image/fuzhi.png" style="height: 22rpx;width:22rpx;"></image>
							</view>
						</view>
					</view>
					<view v-if="geturl(item)" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
						<view>
							兑换券:
						</view>
						<view class="click-this" @click="clickthis(item)">
						复制链接到浏览器打开
						</view>
					</view>
					<view v-if="item.password" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
						<view>
							密码:
						</view>
						<view>
							<text user-select="true">
								{{item.password}}
							</text>
						</view>
					</view>
					<view v-if="item.price" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
						<view>
							面值:
						</view>
						<view>
							<text user-select="true">
								￥{{item.price}}
							</text>
						</view>
					</view>
					<view v-if="item.endtime" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
						<view>
							截至日期:
						</view>
						<view>
							{{item.endtime}}
						</view>
					</view>
				</view>
			</view>
			<view v-if="dataList.commodityType==2" class="order-detail">
				<view class="u-flex" style="justify-content: space-between">
					<view>
						商品名称:
					</view>
					<view>
						<text user-select="true">
							{{dataList.scoreProductName}}
						</text>
					</view>
				</view>
				<view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
					<view>
						收货人:
					</view>
					<view>
						<text user-select="true">
							{{dataList.consignee}}
						</text>
					</view>
				</view>
				<view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
					<view>
						收货地址:
					</view>
					<view @click="OnChangeAddress">
						<text user-select="true">
							{{dataList.consigneeAddress}}
							<text class="chang-adress" v-if="dataList.status==1||dataList.status==0">
								更换地址
							</text>
						</text>
					</view>
				</view>
			</view>
			<view v-if="dataList.verificationType==2&&dataList.status!=0&&dataList.status!=4&&dataList.status!=5&&dataList.status!=6&&dataList.source==1" class="top-card">
				<image
					:src="dataList.status==2?'https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672817102893.png':'https://oss.dcqcjlb.com/51che_java_dev/20230104/file_1672815483227.png'"
					style="width: 386rpx;height: 358rpx;"></image>
				<view style="position: absolute;top: 50rpx;left: calc(50% - 100rpx);">
					<image :src="dataList.orderCodeImg" mode="widthFix" style="width: 200rpx;"></image>
				</view>
			</view>
			<view class="u-flex" style="justify-content: space-between;margin-top: 37rpx;margin-bottom: 37rpx;">
				<view>
				</view>
				<view style="font-size: 28rpx;color: #D91B1B;font-weight: bold;">
					{{dataList.statusMsg}}
				</view>
			</view>

			<view @click="OnPushgoods" class="commodity-card">
				<view>
					<image style="height: 160rpx;width: 160rpx;border-radius: 10rpx;"
						:src="dataList.scoreProductTitleImg">
					</image>
				</view>
				<view style="margin-left: 14rpx;position: relative;">
					<view class="card-title">{{dataList.scoreProductName}}</view>
					<view style="justify-content: space-between;align-items: center;position: absolute;bottom: 0rpx;">
						<view class="u-flex" style="justify-content: space-between;align-items: center;width: 478rpx;">
							<view style="color: #D91B1B;font-weight: bold;font-size: 40rpx;">
								{{dataList.scorePrice}}<text style="font-size: 24rpx;">积分</text>
							</view>
							<view style="font-size: 24rpx;margin-top: 10rpx;">
								x{{dataList.num}}
							</view>
						</view>

					</view>
				</view>
			</view>
			<view v-if="dataList.logisticsInfo">
				<view style="font-size: 36rpx;font-weight: bold;">
					物流信息
				</view>
				<view style="font-size: 28rpx;margin-top: 20rpx;">
					<text>
						{{dataList.expressCompanyName}}
					</text>
					<text style="margin-left: 10rpx;">
						{{dataList.expressNo}}
					</text>
				</view>
				<view style="margin-top: 20rpx;">
					<u-steps activeColor='#999999'  dot v-for="(item,index) in dataList.logisticsInfo" :key="index"  direction="column">
						<u-steps-item :title="item.time" :desc="item.context">
						</u-steps-item>
					</u-steps>
				</view>
			</view>
			<view v-if="dataList.commodityType!=2" style="font-size: 32;font-weight: bold;">
				兑换须知
			</view>
			<view v-if="dataList.commodityType!=2" style="font-size: 24rpx;color: #666666;margin-top: 34rpx;">

				<u-parse :content="dataList.exchangeKnow"></u-parse>
			</view>
		</view>
		<view @click="Onconfirm" v-if="dataList.commodityType==2&&(dataList.status==9||dataList.status==10||dataList.status==11)"
			class="btn-bottom">
			<view class="btn">
				确认收货
			</view>
		</view>
		<request-loading></request-loading>
		<view style="height: 200rpx;">

		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isshowpage: false,
				id: '',
				dataList: {}
			}
		},

		onLoad(option) {
			//#ifdef H5
			if(option.token){
				uni.setStorage({
					key: 'token',
					data: option.token
				});
			}
			// #endif
			this.id = option.orderid
			this.getList(option.orderid)
			uni.$on('sendinfo', res => {
				this.changeaddress(res.info)
			})
		},
		onShow() {},
		methods: {
			Onconfirm() {
				this.$request.post("/coc-active/api/v2/score/shop/confirm/receipt", {
					orderId: this.id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '确认收货成功',
							icon: 'none',
						})
						this.getList(this.id)
					}
				})
			},
			changeaddress(item) {
				this.$request.post("/coc-active/api/v2/score/shop/change/address", {
					orderId: this.id,
					userAddressId: item.id
				}).then(res => {
					if (res.code == 200) {
						uni.showToast({
							title: '修改收货地址成功',
							icon: 'none',
						})
						this.getList(this.id)
					}
				})
			},
			OnChangeAddress() {
				uni.navigateTo({
					url: '/pages/my/address/index'
				})
			},
			OnCopy(value) {
				uni.setClipboardData({
					data: value,
					success: function() {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
						})
					}
				})
			},
			clickthis(item) {
				if (item.shorturl) {
				
						uni.setClipboardData({
						  data: item.shorturl,
						  success: function () {
						    console.log('success', value)
						    uni.showToast({
						      title: '复制成功',
						      icon: 'none',
						    })
						  }
						})
				} else {
						uni.setClipboardData({
						  data: item.link,
						  success: function () {
						    console.log('success', value)
						    uni.showToast({
						      title: '复制成功',
						      icon: 'none',
						    })
						  }
						})
				}
			},
			geturl(item) {
				if (item.shorturl || item.link) {
					return true;
				} else {
					return false;
				}
			},
			OnPushgoods() {
				uni.navigateTo({
					url: '/pages/integralMall/goods/detail?id=' + this.dataList.scoreProductId
				})
			},
			getList(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$request.get('/coc-active/api/v2/score/shop/score/order/' + id).then(res => {
					res.data.logisticsInfo = JSON.parse(res.data.logisticsInfo)
					this.dataList = res.data
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 25rpx;
	}

	.card-zhi {
		padding: 27rpx 29rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		font-size: 28rpx;
		font-weight: 500;
	}

	.order-detail {
		margin-top: 8rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 44rpx 26rpx 39rpx 28rpx;
		font-size: 24rpx;
		font-weight: 500;
	}

	.commodity-card {
		margin-bottom: 34rpx;
		margin-top: 8rpx;
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 29rpx 31rpx 31rpx 26rpx;
		display: flex;
	}

	.card-title {
		width: 478rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 这里是超出几行省略 */
	}

	.click-this {
		color: #D91B1B;
		text-decoration: underline;
	}

	.chang-adress {
		display: inline-block;
		width: 116rpx;
		height: 44rpx;
		background: #F8F8F8;
		border-radius: 10rpx;
		color: #999999;
		text-align: center;
		line-height: 44rpx;
		margin-left: 26rpx;
		font-size: 24rpx;
	}

	.top-card {
		margin: 40rpx auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.btn-bottom {
		width: 100%;
		display: flex;
		justify-content: center;
		position: fixed;
		bottom: 0rpx;
		text-align: center;
		background: #FFFFFF;
		padding: 30rpx 0rpx;

		.btn {
			width: 400rpx;
			height: 70rpx;
			background: #D91B1B;
			border-radius: 35rpx;
			line-height: 70rpx;
			font-size: 28rpx;
			color: #ffffff;
		}
	}
</style>
