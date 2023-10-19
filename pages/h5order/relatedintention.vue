<template>
	<view class="page">
<view v-for="(item,index) in dataList" :key="index">
	<view class="card">
		<view class="size32 fwb oneLine">{{item.intentionTitle}}</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				意向份数
			</view>
			<view class="mainRed">
				{{item.intentionNum}}
			</view>
		</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				意向单价（元/份）
			</view>
			<view class="mainRed">
				{{item.intentionPrice}}
			</view>
		</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				计划活动时间
			</view>
			<view >
				{{item.cooperationBeginTime}}-{{item.cooperationEndTime}}
			</view>
		</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				申请时间
			</view>
			<view>
				{{item.applyTime}}
			</view>
		</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				商家电话
			</view>
			<view >
				{{item.mobile}}
			</view>
		</view>
		<view class="flex-jsb" style="margin-top: 40rpx;">
			<view>
				备注
			</view>
			<view >
				{{item.notes}}
			</view>
		</view>
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
dataList:[]
			}
		},

		onLoad() {
			let _this = this;
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on("getinfo", function(data) {
				console.log(data)
				_this.dataList=data.data
			});
		},
		onShow() {},
		methods: {}
	}
</script>

<style lang="scss">
	.page {}
	.card{
		margin: 24rpx;
background: #FFFFFF;
border-radius: 15rpx;
padding: 24rpx;
font-size: 28rpx;
	}
	.flex-jsb{
		display: flex;
		justify-content: space-between;
	}
</style>
