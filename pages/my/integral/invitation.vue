<template>
	<view class="page">
		<view class="search-top" :style="{height:navbarHeight+'px'}">
			<u-navbar leftIconSize='18' leftIconColor='#DD4845' :autoBack='true' bgColor="#ffffff">
				<view class="u-nav-slot" slot="center" style="width: 100%;">

				</view>
			</u-navbar>
		</view>
		<view class="top">
			<!-- 	<view style="position: absolute;left: 28rpx;top: 22%;">
				<image style="width: 686rpx;height: 162rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671621988749.png">
				</image>
			</view> -->
			<!-- 		<view style="position: absolute;top: 34%;right: 0rpx;">
				<image style="width: 164rpx;height: 72rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671622320529.png">
				</image>
			</view> -->
			<view style="text-align: center;padding-top: 975rpx;">
				<button  class="botton-none" open-type='share'>
					<image style="width: 278rpx;height: 92rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221222/file_1671671514982.png">
					</image>
				</button>
			</view>

		</view>
		<view class="tac" style="color: #999;">
			<view class="title">特别声明</view>
			<view style="text-align: left;">
			请勿违规刷积分，平台一旦发现用户有恶意作弊行为，平台有权取消用户获得积分以及兑换积分商品的资格，并清空历史所获得的积分，保留诉诸法律的权利
			</view>
			</view>
		<view v-if="inviteUserVOS.length>0" class="bottom">
			<view>
				<image style="width: 344rpx;height: 50rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20221222/file_1671670606307.png">
				</image>
			</view>
			<view style="margin-bottom: -8rpx;">
				<image style="width: 744rpx;height: 30rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671623157148.png">
				</image>
			</view>
			<view
				style="width: 708rpx;background-color: #ffffff;display: inline-block;padding-bottom: 10rpx;padding-top: 10rpx;">
				<view class="list-user" v-for="(item,index) in inviteUserVOS" :key="index">
					<view class="u-flex" style="align-items: center;margin-left: 40rpx;">
						<view>
							<u-avatar size="44" :src="item.headImg"></u-avatar>
						</view>
						<view style="font-size: 28rpx;margin-left: 16rpx;">
							{{item.nickname}}
						</view>
					</view>
					<view style="margin-right: 40rpx;font-size: 28rpx;">
						{{item.mobile}}
					</view>
				</view>
				<view style="margin-top: 10rpx;">
					<view style="text-align: center">
						<button  class="botton-none" open-type='share'>
							<image style="width: 400rpx;height: 77rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20221222/file_1671687366020.png">
							</image>
						</button>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 5%;background-color: #F8E3B8;">

		</view>
	</view>
</template>

<script>
	import {
getstorage,
} from '@/utils/index.js'
	export default {
		components: {

		},
		data() {
			return {
				inviteUserVOS: []
			}
		},
		computed: {
			// 状态栏高度适配
			navbarHeight() {
				return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
			},
			contentHeight() {
				return `calc(100vh - ${this.navbarHeight}px - 26rpx)`
			}
		},
		onShareAppMessage(res) {
		
			let title = '51车俱乐部邀请您免费畅玩活动，兑换超值积分好礼'
			let imageUrl = 'https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671624525132.jpg'
			return {
				title,
				path: `/pages/activity/share/index?scene=` + getstorage("userId") + '&enter=117',
				imageUrl
			};
		},


		onLoad() {
			this.getList()
		},
		onShow() {},
		methods: {
	
			getList() {
				this.$request.post("/coc-active/api/v1/invite/index", {
					current: 1,
					size: 99
				}).then(res => {
					this.inviteUserVOS = res.data.inviteUserVOS
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
		background-color: #F8E3B8;
		height: calc(100vh);
	}

	.top {
		background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230322/file_1679448118438.png');
		background-size: 100% 100%;
		width: 750rpx;
		height: 1202rpx;
	}

	.bottom {
		background-color: #F8E3B8;
		width: 750rpx;
		text-align: center;
		padding-bottom: 20rpx;
	}

	.botton-none {
		background: none;
		border: none;
		margin: 0;
		padding: 0;
		outline: none;
	}

	.botton-none::after {
		border: none;
	}

	.list-user {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.title{
		font-size: 28rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}
</style>
