<template>
	<view class="page">
		<view v-if="dataList.length==0" style="text-align: center;margin-top: 50rpx;">
			<image style="width: 423rpx;height: 364rpx;"
				src="https://oss.dcqcjlb.com/51che_java_dev/20230525/file_1684998902730.png">
			</image>
		</view>
		<view v-else-if="dataList.length>0" class="card">
			<view v-for="(item,index) in dataList" :key="item.id">
				<view class="u-flex jsb">
					<view class="u-flex alc">
						<view>
							<u-avatar size="50" :src="item.headImg"></u-avatar>
						</view>
						<view class="ml20">
							<view class="size28 fwb">{{getname(item.expertName)}}</view>
							<view class="size24 fwb">{{getmobile(item.mobile)}}</view>
							<view class="size24 fwb txtLighGray">关联时间：{{item.auditTime}}</view>
						</view>
					</view>
					<view>
						<view style="text-align: right;">
							<text class="txtLighGray size24">累计贡献</text>
							<text class="mainRed size28">￥</text>
							<text class="mainRed size40 fwb">{{item.contributeTotal}}</text>
						</view>

					</view>
				</view>
				<view v-if="index!=dataList.length-1" class="hr"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				dataList: [],
				current: 1,
				isLoadMore: false,
			}
		},
		onReachBottom() {
			if (!this.isLoadMore) {
				this.current++
				this.getList()
			}

		},
		onLoad() {
			this.getList()
		},
		onShow() {},
		methods: {
			getmobile(value){
				 var reg = /^(\d{3})\d{4}(\d{4})$/;  
				    return value.replace(reg, "$1****$2");
			},
			getname(value){
				return value.charAt(0)+'**'
			},
			getList() {
				this.$request.post("/coc-active/api/v1/newExpert/down/list", {
					current: this.current,
					size: 20
				}).then(res => {
					if (res.data.records.length < 20) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.dataList = res.data.records
					} else {
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}

	.card {
		background-color: #ffffff;
		padding: 20rpx 45rpx;
	}

	.hr {
		width: 100%;
		height: 1rpx;
		margin: 18rpx 0;
		background: #F8F8F8;
	}

	.jiesuo {
		position: absolute;
		bottom: 0rpx;
		right: 0rpx;
		width: 88rpx;
		height: 44rpx;
		background: #D91B1B;
		border-radius: 10rpx;
		text-align: center;
		line-height: 44rpx;
		font-size: 24rpx;
		color: #ffffff;
	}
</style>
