<template>
	<view class="page">
<view>
	<view class="title">积分价值</view>
	<view>
			500积分等于1元人民币价值
	</view>
<view class="title">签到得积分</view>
	<view>
			连续签到3天，第3天发放100分 连续签到7天，第7天发放200分连续签到15天，第15天发放400分连续签到30天，第30天发放
			800分按以上规则，可连续循环
	</view>
<!-- 	<view class="title">邀请得积分</view>
	<view>
			活动转发得积分活动转发奖励100分/次，活动转发内容阅读量达到100人以上奖励500分/次，转发后有用户通过该转发内容报名的，奖励1000分/次
	</view> -->
	<view class="title">活动转发得积分</view>
		<view>
			活动转发奖励100分/次（单个活动转发只能获得一次，每日最多获得三次）
			<!-- ，活动转发内容阅读量达到100人以上奖励500分/次，转发后有用户通过该转发内容报名的，买励1000分/次 -->
		</view>
<view class="title">活动评价得积分</view>
	<view>
		一级有效评价(20字以上)奖励10分/次
	</view>
<view class="title">参与活动得积分</view>
	<view>
		免费活动:奖励300分/次;付费活动:奖励500分/次
	</view>
	<view class="title">邀请得积分</view>
	<view>
	邀请新用户完成实名认证获得500积分
	</view>
	<view class="title">特别声明</view>
	<view>
	请勿违规刷积分，平台一旦发现用户有恶意作弊行为，平台有权取消用户获得积分以及兑换积分商品的资格，并清空历史所获得的积分，保留诉诸法律的权利
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
		
			}
		},

		onLoad() {
		},
		onShow() {
		},
		methods: {
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 24rpx;
		font-size: 24rpx;
	}
.title{
	font-size: 28rpx;
	font-weight: bold;
	margin-top: 20rpx;
}
</style>
