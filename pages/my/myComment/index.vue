<template>
	<view class="page">
		<view class="tobbar">
			<!--  #ifdef APP-PLUS  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot  tobbar " slot="center">
					<view v-if="numcurrent==1">我的评价</view>
					<view v-if="numcurrent==2">我的评论</view>
				</view>
			</u-navbar>
			<!--  #endif -->
			<!--  #ifdef MP-WEIXIN  -->
			<u-navbar :autoBack="true">
				<view class="u-nav-slot tobbar" slot="center">
					<view v-if="numcurrent==1">我的评价</view>
					<view v-if="numcurrent==2">我的评论</view>
				</view>
			</u-navbar>
			<!--  #endif -->
		</view>
		<view style="margin-top: 25%;"></view>

		<view>
			<view class="tags">
				<view class="item" :class="{'current-item':numcurrent=='1'}" @click="Oncurrent('1')">
					我的评价
				</view>
				<view class="item" :class="{'current-item':numcurrent=='2'}" @click="Oncurrent('2')">
					我的评论
				</view>
			</view>
		</view>
		<view v-if="numcurrent==1">
			<view v-if="dataList.length>0">
				<view v-for="(item,index) in dataList" :key="index" class="card">
					<view class="time">{{item.createdAt}}</view>
					<view class="value">{{item.content}}</view>
					<view class="activity-card">
						<image :src="item.headImg" style="width: 159rpx;height: 117rpx;	border-radius: 12rpx;"></image>
						<view class="detail">
							<view class="name">{{item.relTitle}}</view>
							<view class="title">{{item.activityBelongUser}}</view>
						</view>
					</view>
					<view style="margin-top: 40rpx;font-size: 28rpx;display: flex;">
						<view>评分：</view>
						<u-rate active-color="#f7c261" readonly count="5" v-model="item.star"></u-rate>
					</view>
				</view>
			</view>
			<view v-else style="text-align: center;margin-top: 40rpx;">
				<image mode="widthFix" style="width: 500rpx;" src="@/static/image/zanwuxinxi.png"></image>
			</view>
		</view>

		<view v-if="numcurrent==2">
			<view v-if="dataList.length>0">
			
			
				<view v-for="(item,index) in dataList" :key="index" class="card">
					<view>
						<view class="time">{{item.createdAt}}</view>
						<view class="value">{{item.content}}</view>
					</view>
					<view style="	background-color: #f8f8f8;border-radius: 12rpx;padding: 20rpx;margin-top: 40rpx;">
						<view>
							<text style="font-size: 32rpx;">{{item.userName}}</text>
							<text
								style="font-size: 24rpx;color: #999999;margin-left: 20rpx;">{{gettiem(item.updatedAt)}}</text>
						</view>
						<view style="font-size: 32rpx;font-weight: bold;margin-top: 20rpx;">
							{{item.relName}}
						</view>
						<view
							style="margin-top: 40rpx;color: #333333;margin-top: 20rpx;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;overflow: hidden;	font-size: 24rpx;">
							{{item.content}}
						</view>
						<view style="margin-top: 20rpx;" v-if="item.imgs">
							<image mode="widthFix" style="width: 556rpx;" :src="getimgs(item.imgs)">
							</image>
						</view>
						<view style="margin-top: 20rpx;" v-if="item.video">
							<video style="width: 556rpx;" id="myVideo" :src="item.video" controls></video>
						</view>
					</view>
						</view>
					
				</view>
				<view v-else style="text-align: center;margin-top: 40rpx;">
					<image mode="widthFix" style="width: 500rpx;" src="@/static/image/zanwuxinxi.png"></image>
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
				isLoadMore: false,
				current: 1,
				numcurrent: '1',
				index: 20,
				dataList: [{
						time: '2022-07-20 18:20',
						type: 2, //type=1是贴文评论 2是活动评论
						value: '活动组织的很好，希望今后能继续参与这样的活动。',
						activityimg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F27%2F76%2F5e277696d85b4d3c1d91047f3fe623f4.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662191185&t=9f76d8000218ea2da4e9b6dedf50df6c',
						name: '金华武义牛头山漂流',
						from: '红星旅行社发起'
					},
					{
						time: '2022-07-20 18:20',
						value: '很好！',
						type: 1,
						username: '穿山甲@chuanshanjia',
						fromtime: '1662365632000',
						title: '宜将剩勇追穷寇不可沽名学霸王',
						connent: '“凝心聚力共赢未来”团建有感炎炎酷日下的高强度团建， 一般情况下应该是人困马乏，疲惫不堪。但和所有参加团建的伙伴们越发有精神凝心聚力共赢未来”团建有感炎炎酷日下的高强度团建， 一般情况下应该是人困马”',
						img: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F5e%2F27%2F76%2F5e277696d85b4d3c1d91047f3fe623f4.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1662191185&t=9f76d8000218ea2da4e9b6dedf50df6c',

					}
				]
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
			getimgs(imgs) {
				let arr = imgs.split(',')
				return arr[0]
			},
			gettiem(dateTimeStamp) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = ''
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;
			},
			getList() {
				if (this.numcurrent == 1) {
					this.$request.post("/coc-my/api/v1/my/evaluates/list", {
						current: this.current,
						size: 10
					}).then(res => {
						if (res.data.records.length < 10) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					})
				} else {
					this.$request.post("/coc-my/api/v1/my/comments/list", {
						current: this.current,
						size: 10
					}).then(res => {
						if (res.data.records.length < 10) {
							this.isLoadMore = true
						}
						if (res.data.current == 1) {
							this.dataList = res.data.records
						} else {
							res.data.records.filter(s => {
								this.dataList.push(s)
							})
						}
					})
				}

			},
			Oncurrent(index) {
				this.numcurrent = index
				this.isLoadMore = false
				this.current = 1
				this.getList()
			},
			gettiem(dateTimeStamp) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = ''
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;
			}
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 20rpx;
	}

	.tags {
		display: flex;
		justify-content: space-around;

		.item {
			width: 335rpx;
			height: 55rpx;
			background-color: #ffffff;
			border-radius: 14rpx;
			line-height: 55rpx;
			font-size: 28rpx;
			text-align: center;
		}

		.current-item {
			background-color: #d91b1b;
			color: #ffffff;
		}
	}

	.card {
		margin: 20rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		padding: 20rpx;

		.time {
			color: #999999;
			font-size: 24rpx;
		}

		.value {
			font-size: 28rpx;
			margin-top: 20rpx;
		}



		.activity-card {
			background-color: #f8f8f8;
			border-radius: 12rpx;
			margin-top: 40rpx;
			padding: 10rpx;
			display: flex;
			position: relative;

			.detail {
				margin-left: 20rpx;
				position: absolute;
				top: 50%;
				transform: translate(0, -50%);
				left: 25%;

				.name {
					font-size: 32rpx;
					font-weight: bold;
				}

				.title {
					font-size: 24rpx;
					color: #999999;
					margin-top: 20rpx;
				}

			}

			.username {
				font-size: 32rpx;
			}


		}

		.post-card {
			background-color: #f8f8f8;
			border-radius: 12rpx;
			margin-top: 40rpx;
			padding: 20rpx;

			.post-title {
				font-size: 32rpx;
				font-weight: bold;
				margin-top: 40rpx;
			}

			.connent {
				margin-top: 40rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
				overflow: hidden;
				font-size: 24rpx;
			}

			.fromtime {
				font-size: 24rpx;
				color: #999999;
				margin-left: 20rpx;
			}
		}

	}
</style>
