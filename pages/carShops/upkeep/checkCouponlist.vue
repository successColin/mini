<template>
	<view class="page">

		<view class="quanItem bgfff br10 mb20" v-for="item in couponList" :key="item.id"
			@click="(e)=>desChange(e,item)">
			<radio-group>
				<label class="uni-list-cell uni-list-cell-pd">
					<view class="flex jsb HuiNum">
						<view class="flex mt10">
							<text class="typeTip size24 br10 bgRed tac"
								v-if="item.useSceneName">{{ item.useSceneName }}</text>
							<text class="size32 fwb ml10 leftOneLine oneLine">{{ item.couponName }}</text>
						</view>
						<view class="flex mainRed " style="align-items:baseline;">
							<text class="fwb" style="font-size:36rpx;">¥</text>
							<text class="fwb" style="font-size:52rpx;">{{ item.discountMoney }}</text>
						</view>
					</view>
					<view class="flex jsb alc mt10">
						<view class="size24">{{ item.shopName }}</view>
						<view class="mainRed size24">满{{ item.fullMoney }}使用</view>
					</view>
					<view class="expirationDate size24 txtLighGray flex jsb alc">
						<view>有效期：{{ item.useBeginTime }}-{{ item.useEndTime }}</view>
						<view>
							<radio color="#D91B1B" :value="item.couponUserNewId"
								:checked="item.couponUserNewId == activeRadio" @click.stop="(e)=>handleRadio(e,item)" />
						</view>
					</view>
				</label>
			</radio-group>
			<u-collapse @close="desClose" @open="desOpen" :border="false">
				<u-collapse-item title="详情" name="Docs guide">
					<!-- <text class="u-collapse-content size24">{{ item.useDesc ? item.useDesc : '暂无详情说明' }}</text> -->
          <view class="othenExplain" >
            <view class="othenH size32 fwb">适用{{item.useSceneName }}</view>
            <view>{{ item.useActivityIds?item.useActivityIds:'暂无详细内容' }}</view>
          </view>
          <view class="othenExplain">
            <view class="othenH size32 fwb">使用说明</view>
            <u-parse :content="item.useDesc"></u-parse>
          </view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="sureBtn">
			<view class="bgRed receiveBtn tac size32 fwb" @click="receiveQuan">确定</view>
		</view>
	</view>
</template>
<script>
	export default {
		components: {},
		data() {
			return {
				couponList: [],
				choosecoupon: {},
				activeRadio: '',
        
			}
		},
		onLoad() {
			let _this = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('couponList', function(data) {
				uni.$u.sleep(0).then(() => {
					_this.couponList = data.data.couponList
          _this.activeRadio = data.data.couponId
				})
			})
		},
		onShow() {},
		methods: {
			handleRadio(e, item) {
				if (this.activeRadio === item.couponUserNewId) {
					this.activeRadio = ''
				} else {
					this.activeRadio = item.couponUserNewId
				}
			},
			desOpen(e) {
			},
			desClose(e) {
			},
			desChange(e, item) {
				this.activeRadio = item.couponUserNewId
			},
			OnChoose(item) {
				let repeat = true
				let repeattwo = true
				let num = 0
				this.choosecoupon.filter(res => {
					if (res.allowOverlayUse == 0) {
						num++
					}
				})
				if (this.choosecoupon.length == 0) {
					this.choosecoupon.push(item)
				} else if (item.allowOverlayUse == 0) { //不叠加的券
					if (num == 0) {
						this.choosecoupon.push(item)
						return false
					}
					this.choosecoupon.filter((res, index) => {
						if (res.couponUserNewId == item.couponUserNewId) { //有相同的直接删除		即取消选中
							this.choosecoupon.splice(index, 1)
						} else if (res.allowOverlayUse == 0) { //已经有同类型的存在 则取消原来选中的 并选中现在选中的		
							this.choosecoupon.splice(index, 1)
							repeat = false
						}

					})
					if (!repeat) {
						this.choosecoupon.push(item)
					}

				} else if (item.allowOverlayUse == 1) {
					let add = 0
					this.choosecoupon.filter((res, index) => {
						if (res.couponUserNewId == item.couponUserNewId) { //如果有相同的id			
							this.choosecoupon.splice(index, 1)
							repeattwo = false
						}
					})
					if (repeattwo) {
						this.choosecoupon.push(item)
					}
				}

			},
			receiveQuan() {
				uni.$emit('choosecoupon', {
					data: this.activeRadio
				})
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style lang="scss">
	.page {
		padding: 30rpx 25rpx;
		background-color: #f8f8f8;
		padding-bottom: 200rpx;
	}

	.quanItem {
		padding: 20rpx 30rpx;

		.HuiNum {
			.typeTip {
				width: 80rpx;
				height: 40rpx;
				line-height: 40rpx;
				color: #fff;
			}

			.leftOneLine {
				width: 350rpx;
			}
		}

		.expirationDate {
			margin-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx dotted #999;
		}
	}
	.sureBtn {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: #f8f8f8;
		left: 0;

		.receiveBtn {
			width: 70%;
			height: 76rpx;
			line-height: 76rpx;
			border-radius: 40rpx;
			margin: 30rpx auto;
			color: #fff;
		}
	}


	.u-cell__body {
		padding: 10rpx 0 !important;
	}

	.u-collapse-item__content__text {
		padding: 10rpx 0 !important;
	}

  .othenExplain {
    padding: 10rpx 0rpx 20rpx;

    .othenH {
      margin-bottom: 10rpx;
    }
  }
</style>
