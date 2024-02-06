<template>
	<view class="page">
		<u-navbar bgColor="transparent">
			<view class="u-nav-slot" slot="left" style="display: flex;margin-left: 15rpx;">
				<view class="navbar-left" :style="{ height: menuHeight + 'px', marginTop: menuTop + 'px' }">
					<view class="back_icon_div flex jsc alc">
						<u-icon name="arrow-left" size="16" :bold="true" color="#222222" @click="goback"></u-icon>
						<view style="font-weight: bold;margin-left: 235rpx;font-size: 28rpx;">我的团队</view>
					</view>
				</view>
			</view>
		</u-navbar>
		<view class="topBox">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702536132391.jpg" class="teamBg"></image>
			<view class="person">
				<view class="flex jsb alc">
					<view class="">
						<view class="flex jsc bsbl">
							<view class="num fwb">{{ info.inviteExpertCount }}</view>
							<view class="num_ch size24">人</view>
						</view>
						<view class="mt10 size24">团队总人数</view>
					</view>
					<view class="">
						<view class="flex jsc bsbl">
							<view class="num fwb">{{ info.monthInviteExpertCount }}</view>
							<view class="num_ch size28 fwb">人</view>
						</view>
						<view class="mt10 size24">本月推荐人数</view>
					</view>
					<view class="">
						<view class="flex jsc bsbl">
							<view class="num_ch size28 fwb ">¥</view>
							<view class="num fwb">{{ info.teamContributionPrice }}</view>
						</view>
						<view class="mt10 size24">团队贡献</view>
					</view>
				</view>
				<view class="yaoBtn bgRed tac colorff size24  fwb" @click="yaoPerson">邀请达人</view>
			</view>
		</view>
		<view class="card">
			<view class="tabs">
				<view class="flex alc" @click="handleTab(0, 1)">
					<view class="mr10 size24" :class="{ fwb: currentTab == 0 }">最新邀请</view>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703155862055.png"  v-if="currentTab==0"></image>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703155764968.png" v-else></image>
				</view>
				<view class="flex alc" style="margin-left: 64rpx;" @click="handleTab(1, 3)">
					<view class="mr10 size24" :class="{ 'fwb': currentTab == 1 }">累计贡献</view>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703155862055.png"  v-if="currentTab==1"></image>
					<image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703155764968.png" v-else></image>
				</view>
			</view>
			<view v-if="dataList.length">
				<view class="leftList flex jsb" v-for="(item) in dataList" :key="item.id">
					<view class="left flex " @click="lookPerson(item)">
						<u--image :src="item.headImg" :width="50" :height="50" shape="circle"></u--image>
						<view style="flex-direction: column;height:122rpx;" class="flex jsb ml20">
							<view class="flex">
								<view class="mr20 size28 fwb">{{ item.expertName }}</view>
								<u-icon name='arrow-right' size='14'></u-icon>
							</view>
							<view class="size24 ">{{ item.mobile }}</view>
							<view class=" size20 txtLighGray">关联时间：{{ item.auditTime }}</view>
						</view>
					</view>
					<view style="flex-direction: column;height:122rpx;align-items: flex-end;" class="flex jsb ">
						<view class="size24">累计贡献：<text class="mainRed fwb">￥{{ item.contributeTotal }}</text></view>
						<!-- <view>
							<image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703155918500.png"
								style="width:40rpx;height: 40rpx;"></image>
						</view> -->
					</view>
				</view>
			</view>
			<!-- 暂无团队人员 -->
			<view style="text-align: center;margin-top: 50rpx;" v-else>
				<image style="width: 423rpx;height: 364rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20231220/file_1703058966555.png">
				</image>
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
			currentTab: 0,
			currentTop: true,
			info: {},
			sort: 1,
		}
	},
	onReachBottom() {
		if (!this.isLoadMore) {
			this.current++
			this.getList()
		}

	},
	onLoad() {
		this.getInfo()
		this.getList()
	},
	onShow() { },
	methods: {
		getInfo() {
			this.$request.post("/coc-active/api/v1/newExpert/expertIndex", {}).then(res => {
				this.info = res.data
			})
		},
		getmobile(value) {
			var reg = /^(\d{3})\d{4}(\d{4})$/;
			return value.replace(reg, "$1****$2");
		},
		getname(value) {
			return value.charAt(0) + '**'
		},
		handleTab(index, sort) {
			this.currentTab = index
			this.sort = sort
			this.getList()
		},
		getList() {
			this.$request.post("/coc-active/api/v1/newExpert/down/list", {
				current: this.current,
				size: 20,
				sort: this.sort
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
		},
		lookPerson(item) {
			uni.navigateTo({
				url: '/pages/wiseman/component/shopinfo?type=1&userId=' + item.userId
			});
		},
		goback() {
			let routes = getCurrentPages()
			if (routes.length > 1) {
				uni.navigateBack()
			} else {
				uni.switchTab({
					url: '/pages/home/index'
				})
			}
		},
		yaoPerson() {
			uni.navigateTo({
				url: '/pages/wiseman/invitein'
			})
		},
	}
}
</script>

<style lang="scss">
.topBox {
	.teamBg {
		display: block;
		width: 100%;
		height: 400rpx;
	}

	position: relative;

	.person {
		padding: 30rpx 50rpx;
		background-color: #fff;
		position: absolute;
		top: 346rpx;
		width: 730rpx;
		box-sizing: border-box;
		border-radius: 10rpx;
		left: 10rpx;

		.num {
			font-size: 44rpx;
		}

		.bsbl {
			align-items: baseline;
		}

		.yaoBtn {
			width: 434rpx;
			height: 54rpx;
			line-height: 54rpx;
			border-radius: 54rpx;
			margin: 20rpx auto 0;
		}
	}
}


.card {
	background-color: #ffffff;
	padding: 20rpx 20rpx  50rpx;
	width: 730rpx;
	margin: 206rpx auto 50rpx;
	box-sizing: border-box;
	border-radius: 10rpx;

	.tabs {
		display: flex;
		image {
			width: 24rpx;
			height: 24rpx;
		}
	}

	.leftList,
	.rightList {
		margin-top: 20rpx;
	}
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
