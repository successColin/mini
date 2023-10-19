<template>
	<view class="page">
		<view class="flex jsb alc checkTime" @click="checkMonth">
			<text class="txtDarkGray">{{ value1?value1:'请选择年/月份' }}</text> 
			<u-icon size="12" name="arrow-down"></u-icon>
		</view>
		<view v-if="dataList.length > 0" class="card">
			<view v-for="(item, index) in dataList" :key="item.id">
				<view class="u-flex jsb">
					<view>
						<view class="size28 fwb">提现</view>
						<view class="size20 txtLighGray mt20">{{ item.time }}</view>
						<view v-if="item.examineStatus == 3" class="size20 mainRed mt20">
							驳回原因: {{ item.examineReason }}
						</view>
					</view>
					<view>
						<view class="mainRed size32 fwb" style="text-align: right;">
							￥{{ item.withdrawPrice }}
						</view>
						<view class="size24" style="margin-top: 15rpx;text-align: right;">
							<text v-if="item.examineStatus == 3" class="mainRed">{{ item.examineStatusMsg }}</text>
							<text v-else class="txtLighGray">{{ item.examineStatusMsg }}</text>
						</view>
					</view>
				</view>
				<view v-if="index != dataList.length - 1" class="hr"></view>
			</view>
		</view>
		<view v-else class="tac mt100">
			<image style="width: 423rpx;height: 324rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230527/file_1685172708426.png">
			</image>
		</view>
		<u-datetime-picker ref="datetimePicker" :show="show" mode="year-month" @confirm='OnChooseStart'
			@cancel='show = false'  v-model="value2"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				value2: Number(new Date()),
				dataList: [],
				current: 1,
				isLoadMore: false,
				show: false,
				value1: '',
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}
		},
		onLoad() {},
		onShow() {
			this.getList()
		},
		methods: {
			checkMonth() {
				this.show = true
			},
			OnChooseStart(val) {
				console.log(val)
				let time = val.value
				var date = new Date(time);
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				this.value2 = date.getFullYear() + "-" + month
				this.value1 = this.value2
				this.getList()
				this.show = false
			},
			getList() {
				console.log(this.value1)
				this.$request.post("/coc-active/api/v2/withdraw/record/list", {
					current: this.current,
					size: 20,
					yearMonth: this.value1
				}).then(res => {
					if (res.data.length < 20) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.dataList = res.data
					} else {
						res.data.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background-color: #ffffff;
		padding: 20rpx 50rpx;
	}

	.mt100 {
		margin-top: 100rpx;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		margin: 18rpx 0;
		background: #F8F8F8;
	}

	.checkTime {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 28rpx;
		width: 700rpx;
		background: #fff;
		margin: 20rpx auto;
		border-radius: 10rpx;
		box-sizing: border-box;
		padding: 0 20rpx;
	}
</style>