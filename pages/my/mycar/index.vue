<template>
	<view class="page">
		<view v-if="dataList.length>0">
			<view v-for="(item,index) in dataList" :key="index">
				<view class="card">
					<view class="u-flex">
						<view>
							<image mode="aspectFit" style="width: 182rpx;height: 117rpx;" :src="item.imgUrl"></image>
						</view>
						<view style="margin-left: 30rpx;">

							<view class="moreLine size28 fwb" style="width: 360rpx;">{{item.vehicleName}}</view>
							<view class="size24 mt10">{{item.plate}}</view>
						</view>
					</view>
					<view class="mainRed" @click="ToDelete(item)">删除</view>
				</view>
			</view>
		</view>
		<view v-else-if="dataList.length==0">
			<view class="tac mt218">
				<image style="width: 423rpx;height: 364rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230614/file_1686720738173.png">
				</image>
			</view>
		</view>
		<view class="btn" v-if="dataList.length<2">
			<view @click="OnAddcar" class="btn-bottom">
				添加爱车
			</view>
		</view>
		<u-toast ref="uToast"></u-toast>
		<u-modal :show="showdelete" title="温馨提示" :content='content' :showCancelButton='true' confirmColor='#606266'
			@cancel='showdelete=false' @confirm="OnDelete"></u-modal>
		<view>
			<cardauthentication :showpop='showrealpop'></cardauthentication>
		</view>
	</view>
</template>

<script>
	import cardauthentication from '@/components/cardauthentication.vue'
	export default {
		components: {
			cardauthentication
		},
		data() {
			return {
				showrealpop: false,
				content: '删除车型后，车型数据将不再保留，您确定删除吗？',
				showdelete: false,
				dataList: [],
				currentList: {},
				brandId:null
			}
		},

		onLoad(option) {
			if(option.brandId){
				this.brandId=option.brandId
			}
			let _this=this
			uni.$on('closepop', res => {
				_this.showrealpop = false
			})
		},
		onShow() {
			this.getList()
		},
		methods: {

			OnAddcar() {

				if (this.dataList.length == 2) {
					this.$refs.uToast.show({
						type: 'default',
						message: '最多可添加2辆爱车',
					})
				} else {
					if (uni.getStorageSync('isCertify') != 1) {
						this.showrealpop = true
						return false
					}
					uni.navigateTo({
						url: '/pages/my/mycar/addcar?brandId='+this.brandId
					})
				}
			},

			getList() {
				this.$request.get("/coc-my/api/v1/my/user/car/lists").then(res => {
					this.dataList = res.data
				})
			},

			ToDelete(item) {
				this.showdelete = true
				this.currentList = item
			},
			OnDelete() {
				let _this = this

				this.$request.get("/coc-my/api/v1/my/user/car/del/" + this.currentList.id).then(res => {
					if (res.code == 200) {
						_this.showdelete = false
						this.$refs.uToast.show({
							type: 'success',
							message: '删除成功',
							complete() {
								_this.getList()
							}
						});
					} else {
						this.$refs.uToast.show({
							type: 'error',
							message: res.messsage,
						});
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		margin: 25rpx;
		padding: 25rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}


	.btn-bottom {
		margin-top: 100rpx;
		background-color: #d91b1b;
		border-radius: 40rpx;
		color: #ffffff;
		width: 600rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
	}

	.btn {
		position: fixed;
		bottom: 50rpx;
		left: 50%;
		transform: translate(-50%, 0%);
	}

	.mt218 {
		margin-top: 218rpx;
	}
</style>
