<template>
	<view class="page">
		<view class="bgfff page_top">
			<view class="tab">
				<view class="tab_inner">
					<view class="tab_div flex jsb">
						<view class="tab_item"
							:class="{'tab_item_sel':currentIndex===1,'tab_item_nosel':currentIndex!==1}"
							@click="OnClickType(1)">当前招募计划</view>
						<view class="tab_item"
							:class="{'tab_item_sel':currentIndex===2,'tab_item_nosel':currentIndex!==2}"
							@click="OnClickType(2)">历史扶持计划</view>
						<view class="tab_item"
							:class="{'tab_item_sel':currentIndex===3,'tab_item_nosel':currentIndex!==3}"
							@click="OnClickType(3)">我报名的</view>
					</view>
					<view class="tab_line"
						:class="{'tab_tran1':currentIndex===1,'tab_tran2':currentIndex===2,'tab_tran3':currentIndex===3}">
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view v-for="(item,index) in dataList" :key="item.id" class="card" @click="Onpushdetail(item)">
			<view class="u-flex jsb">
				<view class="fwb size28">{{item.name}}</view>
				<view class="mainRed size28" v-if="currentIndex==1||currentIndex==3">已报名{{item.expertSignUpCount}}</view>
					<view class="mainRed size28" v-else>已结束</view>
			</view>
			<view class="txtLighGray size28 mt10 oneLine">
				{{item.intro}}
			</view>
			<view class="mt20">
				<image style="width: 657rpx;height: 230rpx;" :src="item.coverPicture"></image>
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
				url: '/coc-merchant-app/app/v2/traffic/support/plan/List',
				currentIndex: 1,
				current: 1,
				dataList: [],
				type: 1,
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
			this.url = '/coc-merchant-app/app/v2/traffic/support/plan/List'
			this.getList()
		},
		onShow() {},
		methods: {
			Onpushdetail(item){
			let uid=''
			if(this.currentIndex==1||this.currentIndex==2){
				uid=item.id
			}else{
				uid=item.planId
			}
				uni.navigateTo({
					url: '/pages/wiseman/flowplan/detail?id=' + uid
				})
			},
			getList() {
				this.$request.post(this.url, {
					current: this.current,
					size: 10,
					type: this.type,
					planType: 2
				}).then(res => {
					if (res.data.length < 10) {
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
			// 点击tag
			OnClickType(type) {
				this.currentIndex = type
				this.isLoadMore = false
				if (type == 1 || type == 2) {
					this.url = '/coc-merchant-app/app/v2/traffic/support/plan/List'
					this.dataList = []
					this.current = 1
					if(type==1){
						this.type=1
					}else{
						this.type=3
					}
					this.getList()
				}else{
					this.url='/coc-merchant-app/app/v2/traffic/support/plan/getExpertSignUpPlanList'
					this.dataList = []
					this.current = 1
					this.type=4
					this.getList()
				}
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.page_top {

		position: absolute;
		width: 100%;
		z-index: 1;
	}

	.tab {
		.tab_inner {
			padding: 20rpx 25rpx 20rpx 25rpx;

			.tab_item {
				// width: 120rpx;
				text-align: center;
				color: #666666;
			}

			.tab_item_sel {
				font-size: 28rpx;
				font-weight: bold !important;
				color: #222222;
			}

			.tab_item_nosel {
				font-size: 28rpx;
				font-weight: 500;
				color: #222222;
			}

			.tab_line {
				width: 33rpx;
				height: 6rpx;
				background: #F70000;
				border-radius: 3rpx;
				margin-left: 44rpx;
				margin-top: 14rpx;
			}

			.tab_tran1 {
				transform: translate(20rpx, 0);
				transition: 0.5s;
			}

			.tab_tran2 {
				transform: translate(318rpx, 0);
				transition: 0.5s;
			}

			.tab_tran3 {
				transform: translate(590rpx, 0);
				transition: 0.5s;
			}

			.tab_tran4 {
				transform: translate(531rpx, 0);
				transition: 0.5s;
			}
		}
	}

	.card {
		margin: 25rpx;
		border-radius: 15rpx;
		background: #FFFFFF;
		padding: 25rpx;
	}
</style>