<template>
	<view class="page">
		<view v-if="isshowpage">
			<view v-if="contextType==1" class="actrice">
				<view class="fwb size32">
					{{dataList.title}}
				</view>
				<view class="size24 txtLighGray mt30">
					发布于：{{dataList.createdAt}}
				</view>
				<view class="mt30">
					<u-parse :content="dataList.context"></u-parse>
				</view>
				<view style="height: 50rpx;"></view>
			</view>
			<view v-else style="overflow: hidden;">
				<video style="width: 100%;height: 100vh;" :direction="true" objectFit="contain" :loop="true"
					:controls="false" :enable-play-gesture="true" :src="dataList.videoPath"
					:poster="dataList.videoPath+'?x-oss-process=video/snapshot,t_1000,m_fast'">
				</video>
				<view class="introduce">
					<view class="introduce_title">{{dataList.title}}</view>
					<mote-lines-divide class="introduce_content" :dt="dataList.intro" :line="1" expandText="展开全文"
						foldHint="收起" />
					<view class="introduce_time">发布于 {{dataList.createdAt}}</view>
				</view>
			</view>
		</view>
		<request-loading></request-loading>
	</view>
</template>

<script>
	import MoteLinesDivide from "@/components/mote-lines-divide/mote-lines-divide"
	export default {
		components: {
			MoteLinesDivide
		},
		data() {
			return {
				id: '',
				contextType: 1,
				dataList: {},
				isshowpage: false
			}
		},

		onLoad(option) {
			this.id = option.id
			this.contextType = option.contextType
			this.getDetail()
		},
		onShow() {},
		methods: {
			getDetail() {
				this.$showLoading()
				this.$newrequest.post("/coc-active/api/v1/creative/center/detail", {
					id: this.id
				}).then(res => {
					if (res.code === 200) {
						this.dataList = res.data
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				}).finally(res => {
					this.isshowpage = true
					this.$hideLoading()
				})
			}

		}
	}
</script>

<style lang="scss">
	.page {
		position: relative;
	}

	.actrice {
		margin: 23rpx;
	}

	.introduce {
		padding: 0 20rpx;
		position: absolute;
		bottom: 50rpx;
		left: 0;
	}

	.introduce_title {
		font-size: 32rpx;
		font-weight: bold;
		color: #FFFFFF;
		margin-bottom: 20rpx;
	}

	.introduce_content {
		font-size: 24rpx;
		color: #FFFFFF;
	}

	.introduce_time {
		font-size: 24rpx;
		color: #999;
		margin-top: 20rpx;
	}
</style>
