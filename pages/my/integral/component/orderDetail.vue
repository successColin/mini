<template>
	<view class="page">

		<view style="margin: 40rpx 20rpx;" class="u-flex">
			<view @click="OnStartTime" style="width: 240rpx;">
				<u--input   placeholder="开始时间" v-model="startTime" :disabled='true'
					:customStyle="{backgroundColor:'#ffffff',height:'30rpx'}">
				</u--input>
			</view>
			<view style="margin: 10rpx 20rpx 0rpx 20rpx;">
				—
			</view>
			<view @click="OnEndTime" style="width: 240rpx;">
				<u--input   placeholder="结束时间" v-model="endTime" :disabled='true' :customStyle="{backgroundColor:'#ffffff',height:'30rpx'}">
				</u--input>
			</view>
			<view @click="OnSearch" class="search-btn">
				<text>查询</text>
			</view>
		</view>
		<view class="card" style="margin-top: 40rpx;">
			<view class="u-flex" style="font-size: 28rpx;">
				<view style="width: 33%;text-align: center;">
					日期
				</view>
				<view style="width: 33%;text-align: center;">
					交易描述
				</view>
				<view style="width: 33%;text-align: center;">
					积分
				</view>
			</view>
			<view style="border-top: 1rpx #d8d8d8 solid;height: 1rpx;margin-top: 29rpx;margin-bottom: 29rpx;"></view>
			<view v-for="(item,index) in detailList" :key="index" @click="OnDetail(item.id)" class="u-flex"
				style="font-size: 24rpx;color: #666666;margin-top: 20rpx;">
				<view style="width: 33%;text-align: center;">
					{{item.date}}
				</view>
				<view style="width: 33%;text-align: center;">
					{{item.transactionDescription}}
				</view>
				<view style="width: 33%;text-align: center;">
					{{item.profit}}
				</view>
			</view>
		</view>
		<u-datetime-picker ref="datetimePicker" v-model="starttoday" :show="showstart" mode="date"
			:minDate="1664629900000" :maxDate='today' @confirm='OnChooseStart' @cancel='showstart=false'>
		</u-datetime-picker>
		<u-datetime-picker ref="datetimePicker" v-model="endtoday" :show="showend" mode="date" :minDate="1664629900000"
			:maxDate='today' @confirm='OnChooseEnd' @cancel='showend=false'>
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isapp: 0,
			showstart: false,
				showend: false,
				current: 1,
				detailList: [],
				startTime: '',
				endTime: '',
				isLoadMore: false,
				today: '',
				starttoday: '',
				endtoday: '',
				
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
			if (option.isapp) {
				this.isapp = 1
			}
			this.today = new Date().valueOf()
			this.starttoday = new Date().valueOf()
			this.endtoday = new Date().valueOf()
			this.startTime= uni.$u.timeFormat( new Date().valueOf()- 31 * 24 * 3600 * 1000, 'yyyy-mm-dd');
			this.endTime=  uni.$u.timeFormat( new Date().valueOf(), 'yyyy-mm-dd');
			this.OnSearch()
		},
		onShow() {
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.OnSearch()
			}
		
		},
		onUnload() {
			if(this.isapp==1){
				if (window._51club) {
					window._51club.backIntercept('app');
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.backIntercept.postMessage("app")
				}
			}
			
		},
		methods: {
			OnChooseStart(val) {
				let time = val.value
				var date = new Date(time);
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			
				this.startTime = date.getFullYear() + "-" + month + "-" + currentDate
				this.current=1
				this.showstart = false
			},
			OnChooseEnd(val) {
				let time = val.value
				var date = new Date(time);
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hh = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var mm = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
			
				this.endTime = date.getFullYear() + "-" + month + "-" + currentDate
							this.current=1
				this.showend = false
			},
			OnDetail(id) {
				// uni.navigateTo({
				// 	url: '/pages/my/integral/detail?id=' + id
				// })
			},
			OnSearch() {
				if (this.startTime && this.endTime) {
					this.current=1
					this.$request.post("/coc-active/api/v2/score/shop/scoreDetailed", {
						current: this.current,
						endTime: this.endTime,
						size: 30,
						beginTime: this.startTime
					}).then(res => {
						if (res.data.records.length < 30) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.detailList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.detailList.push(s)
							})
						}
					})
				} else {
					this.$refs.uToast.show({
						message: '请选择起始日期',
					});
				}
			},
			OnEndTime() {
				this.showend = true
			},
			OnStartTime() {
				this.showstart = true
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
	.card {
		margin: 24rpx;
		background-color: #ffffff;
		border-radius: 10px;
		padding: 35rpx 25rpx 43rpx 28rpx;
	 
	}
	.search-btn {
		margin-left: 36rpx;
		text-align: center;

		text {
			width: 117rpx;
			height: 60rpx;
			background-color: #d91b1b;
			border-radius: 14rpx;
			text-align: center;
			display: inline-block;
			font-size: 28rpx;
			color: #ffffff;
			line-height: 60rpx;
		}
	}
</style>
