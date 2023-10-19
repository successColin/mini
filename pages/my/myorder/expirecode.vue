<template>
	<view class="page">
		<view v-if="dataList.length>0">
			<view class="quanItem bgfff br10"  v-for="(item, index) in dataList" :key="index"
				style="margin-top: 30rpx;">
				<view class="u-flex jsb" style="align-items: center;">
					<view style="width: 400rpx;">
						<view class="size32 fwb oneLine">
							{{item.ticketName}}
						</view>
						<view class="size24 txtLighGray" style="margin-top: 30rpx;">
							市场价：{{item.marketPrice}}
						</view>
						<view class="size24 " style="margin-top: 30rpx;">
							{{item.baseName}}
						</view>
					</view>
					<view class="hexiao" >
						已使用
					</view>
				</view>
			
			
			</view>
		</view>
<view v-else>
	<view class="tac mt50" >
	                        <image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
	                                src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
	                        </image>
	                        <view class="txtDarkGray">暂无券</view>
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
				isLoadMore: false,
				current: 1,
				dataList: []
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
			getList() {
				this.$request.post("/coc-active/api/v1/my/getMaintainTicket", {
					current: this.current,
					size: 20,
					status: 1
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
	.quanItem {
		margin: 24rpx;
	  padding: 20rpx 30rpx;
	
	  .HuiNum {
	    .typeTip {
	      width: 80rpx;
	      height: 40rpx;
	      line-height: 40rpx;
	      color: #fff;
	    }
	
	    .leftOneLine {
	      width: 300rpx;
	    }
	  }
	
	  .expirationDate {
	    margin-top: 30rpx;
	    padding-top: 20rpx;
	    border-top: 1rpx dotted #999;
	  }
	
	  .quanbtn {
	    width: 120rpx;
	    height: 48rpx;
	    line-height: 48rpx;
	    text-align: center;
	    color: #ffffff;
	    border-radius: 24rpx;
	  }
	
	  .bgGray {
	    background-color: #999999;
	    color: #ffffff;
	  }
	}
	.hexiao{
		width: 120rpx;
		height: 69rpx;
background: #C5C5C5;
		border-radius: 10rpx;
		text-align: center;
		line-height: 69rpx;
		color: #ffffff;
		font-size: 28rpx;
	}
</style>
