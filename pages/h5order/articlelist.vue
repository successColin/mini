<template>
	<view class="page">
<view class="card" v-for="(item,index) in dataList" :key="item.id">
	<view  class="u-flex jsb" style="margin-top: 23rpx;" @click="OnPushdetail(item)">
		<view class="size28 moreLine">{{item.title}}</view>
		<view style="position: relative;">
			<image :src="item.coverImage" style="border-radius: 8rpx;width: 192rpx;height: 138rpx;"></image>
			<view v-if="item.contextType==2">
				<image class="player"  src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png"></image>
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
		id:'',
		title:'',
		dataList:[]
			}
		},

		onLoad(option) {
			this.id=option.id
				uni.setNavigationBarTitle({
				  title: option.title,
				})
				this.getList()
		},
		onShow() {
		},
		methods: {
			OnPushdetail(item){
				uni.navigateTo({
					url: '/pages/h5order/articledetail?id='+item.id+'&contextType='+item.contextType
				})
			},
			getList(){
				this.$newrequest.post("/coc-merchant-app/api/v1/business/school/article/getArticleListByType",{
					typeId:this.id
				}).then(res=>{
					this.dataList=res.data
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
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
