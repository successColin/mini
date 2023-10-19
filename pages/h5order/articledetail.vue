<template>
	<view class="page">
<view class="fwb size32">
	{{dataList.title}}
</view>
<view class="size24 txtLighGray mt30">
	发布于：{{dataList.createdAt}}
</view>
<view v-if="contextType==1" class="mt30">
		<u-parse :content="dataList.context"></u-parse>
</view>
<view class="mt30" v-else>
	<video style="width: 100%;" :autoplay="true" :loop="true" :src="dataList.videoPath" :poster="dataList.videoPath+'?x-oss-process=video/snapshot,t_1000,m_fast'"></video>
	<view class="mt20">视频简介：{{dataList.videoBlurb}}</view>
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
		contextType:'',
		dataList:{}
			}
		},

		onLoad(option) {
			this.id=option.id
			this.contextType=option.contextType
			this.getList()
		},
		onShow() {
		},
		methods: {
			getList(){
				this.$newrequest.post("/coc-merchant-app/api/v1/business/school/article/detail",{
					id:this.id
				}).then(res=>{
					this.dataList=res.data
				})
			}
		
		}
	}
</script>

<style lang="scss">
	.page {
		margin: 23rpx;
	}

</style>
