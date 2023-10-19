<template>
	<view class="page">
		<view style="margin: 23rpx;">
			<carousel ref='carousel' :topClass="['activity-img']" height="395rpx" urlkey="url" :dataType="2"
				systemCode="app_business_school" :indicatorType="5"></carousel>
		</view>
		<view class="card" v-for="(item,index) in dataList" :key="item.id" >
			<view class="u-flex jsb" @click="OnPushList(item)">
				<view class="size32 fwb">{{item.title}}</view>
				<view><u-icon name="arrow-right"></u-icon></view>
			</view>
			<view v-for="(item1,index1) in item.article" :key="item1.id" class="u-flex jsb" style="margin-top: 23rpx;" @click="OnPushdetail(item1)">
				<view class="size28 moreLine" style="width: 450rpx;height: 100%;">{{item1.title}}</view>
				<view style="position: relative;">
					<image :src="item1.coverImage" style="border-radius: 8rpx;width: 192rpx;height: 138rpx;"></image>
					<view v-if="item1.contextType==2">
						<image class="player"  src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 50rpx;"></view>
	</view>
</template>

<script>
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			carousel
		},
		data() {
			return {
				dataList:[
				]
			}
		},

		onLoad() {
			uni.clearStorage();
			this.getList()
		},
		onShow() {},
		methods: {
			OnPushList(item){
				uni.navigateTo({
					url: '/pages/h5order/articlelist?id='+item.id+'&title='+item.title
				})
			},
			OnPushdetail(item){
				uni.navigateTo({
					url: '/pages/h5order/articledetail?id='+item.id+'&contextType='+item.contextType
				})
			},
			getList(){
				this.$newrequest.post("/coc-merchant-app/api/v1/business/school/article/home").then(res=>{
					this.dataList=res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.page {}
	.card{
		margin: 23rpx;
		background-color: #ffffff;
		border-radius: 15rpx;
		padding: 23rpx;
	}
	.player{
		width: 46rpx;
		height: 46rpx;
		position: absolute;
		left: 50%;
			top:50%;
		transform: translate(-50%, -50%);
	
	}
</style>
