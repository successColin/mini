<template>
	<view class="page">
		<view class="card-img" @click="Ongetquan" v-if="drawStatus==null">
			<image style="width: 748rpx;height:322rpx ;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230530/file_1685427021969.png">
			</image>
			<view class="card-text">
				满{{transactionMinimum}}元使用
			</view>
		</view>
		<view class="card-img"  v-if="drawStatus==2">
			<image style="width: 748rpx;height:322rpx ;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230530/file_1685432220358.png">
			</image>
			<view class="card-text">
				满{{transactionMinimum}}元使用
			</view>
		</view>
		<view class="card-img"  v-if="drawStatus==0">
			<image style="width: 748rpx;height:322rpx ;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230530/file_1685432309255.png">
			</image>
			<view class="card-text">
				满{{transactionMinimum}}元使用
			</view>
		</view>
		<view class="card-img"  v-if="drawStatus==1">
			<image style="width: 748rpx;height:322rpx ;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230530/file_1685432336526.png">
			</image>
			<view class="card-text">
				满{{transactionMinimum}}元使用
			</view>
		</view>
		<u-popup :safeAreaInsetBottom='false' :show="showpop" @close="showpop=false" mode="center">
			<view class="pop">
				<view class="pop-title">
					<view>您还未绑定工行信用卡</view>
					<view>无法领券，是否现在去绑定</view>
				</view>
				<view class="u-flex jsb" style="margin-top: 80rpx;">
					<view class="nobind" @click="Ontobind">去绑卡</view>
					<view class="tobind" @click="togetbank">去办卡</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				showpop: false,
				transactionMinimum: '',
				stockId: '',
				drawStatus: null,

			}
		},

		onLoad() {
		
		},
		onShow() {
			this.getList()
		},
		methods: {
			Ontobind() {
				this.showpop = false
				uni.navigateTo({
					url: "/pages/my/card/index"
				});
			},
			togetbank() {
				this.showpop = false
				uni.navigateTo({
					url: "/pages/my/creditCard/detail"
				});
			},
			Ontobind() {
				this.showpop = false
				uni.navigateTo({
					url: "/pages/my/card/index"
				});
			},
			Onnobind() {
				this.showpop = false
			},
			Ongetquan() {
				this.$request.post('/coc-active/api/v1/my/is_card').then(res => {
					if (res.data.cardIcbc == 1) {						
					} else {
						this.showpop = true
					}
				})
			},
			getList() {
				this.$request.post("/coc-active/api/v1/coupon/getIcbcStocksList").then(res => {
					if(res.code==200){
						this.transactionMinimum = res.data[0].transactionMinimum
						this.stockId = res.data[0].stockId
						this.drawStatus = res.data[0].drawStatus
					}			
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230529/file_1685340478197.png");
		background-size: 100% 100%;
		width: 100%;
		height: 1625rpx;
	}

	.card-img {
		position: relative;
		top: 728rpx;
		text-align: center;
	}

	.card-text {
		font-size: 32rpx;
		font-weight: bold;
		color: #ffffff;
		position: absolute;
		left: 310rpx;
		bottom: 154rpx;
	}

	.pop {
		text-align: center;
		width: 600rpx;
		padding: 95rpx 50rpx;
	}

	.pop-title {
		font-size: 36rpx;
		font-weight: bold;
	}

	.nobind {
		width: 260rpx;
		height: 72rpx;
		background: #999999;
		border: 1px solid #999999;
		border-radius: 36rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 72rpx;
	}

	.tobind {
		width: 260rpx;
		height: 72rpx;
		background: #D91B1B;
		border: 1px solid #999999;
		border-radius: 36rpx;
		text-align: center;
		font-size: 28rpx;
		color: #FFFFFF;
		line-height: 72rpx;
	}
</style>
