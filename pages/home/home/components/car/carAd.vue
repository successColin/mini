<template>
	<view id="adBox" style="padding-top: 10rpx;">
		<view class="adBox">
			<scroll-view scroll-x="true" class="scrollAd" @touchstart="touchstart" @touchend="touchend">
				<view class="flex">
					<view v-for="(item, index) in adlist" :key="index" class="itemBox" @click="jump({id:1})">
						<image src="https://oss.dcqcjlb.com/51che_java_dev/20230208/1675837430333_CT5.png"
							mode="aspectFill" class="adImg br10"></image>
						<view class="size20 tac adName">{{ item.name }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				adlist: [{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
				],
			}
		},
		created() {
			this.getList()
		},
		methods: {
			touchstart() {
				uni.$emit('car_service_istouch', false)
			},
			touchend() {
				setTimeout(() => {
					uni.$emit('car_service_istouch', true)
				}, 100)
			},
			getList() {
				// this.$newrequest.post("/coc-active/api/v1/vehicleInfo/advNewVehicleList", {
				// 	current: 1,
				// 	size: 99
				// }).then(res => {
				// 	console.log(res, "llll")
				// })
				this.adlist = [{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
					{
						name: '凯迪拉克',
						img: ''
					},
				]
				setTimeout(() => {
					uni.createSelectorQuery().in(this).select("#adBox").boundingClientRect(data => {
						this.$emit('getHeight', data.height)
					}).exec()
				}, 1000)
			},
			jump(item) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/brandInfo?id=' + item.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.adBox {
		background-color: #fff;
		position: relative;
		box-sizing: border-box;
		padding: 39rpx 0 38rpx 20rpx;

		.scrollAd {
			.itemBox {
				margin-right: 40rpx;

				.adImg {
					width: 120rpx;
					height: 120rpx;
					border-radius: 10rpx;
				}

				.adName {
					font-size: 20rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #222222;
					line-height: 24rpx;
					margin-top: 10rpx;
				}
			}
		}
	}
</style>