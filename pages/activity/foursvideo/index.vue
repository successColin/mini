<template>
	<view class="page">
		<view v-if="isshowpage">
		<view class="item-top">
		</view>
		<view>
			<videolist ref="videolist" :dataList="dataList" @detailvideo='detailvideo' @getmorevideo='getmorevideo'
				@likenumchange='likenumchange' @setnewvideo='setnewvideo'></videolist>
		</view>
		</view>
<request-loading></request-loading>
	</view>
</template>

<script>
	import videolist from "./videolist.vue"
	export default {
		components: {
videolist
		},
		data() {
			return {
		articleId:'',
		type:'',
			current: 1,
			dataList:[],
				isshowpage: false,
			}
		},
	onShareAppMessage(res) {
			
		let path='/pages/activity/foursvideo/index?id='+this.articleId+'&type='+this.type
			return {
				path: path,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			};
		},
		onShareTimeline(res) { //分享到朋友圈
		let path='/pages/activity/foursvideo/index?id='+this.articleId+'&type='+this.type
			return {
				path: path,
				success(res) {
					uni.showToast({
						title: '分享成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			};
		},
		onLoad(option) {
			let _this=this
			this.articleId=option.id
			this.type=option.type
			if(option.type==1){
				uni.setNavigationBarTitle({title: '救援故事'})
			}else if (option.type==2){
				uni.setNavigationBarTitle({title: '故障咨询'})
			}else if (option.type==3){
				uni.setNavigationBarTitle({title: '汽车保养'})
			}else if (option.type==4){
				uni.setNavigationBarTitle({title: '新车鉴赏'})
			}
			this.getbyId()
			uni.$on('changid', function(data) {
				_this.articleId=data
			})
		},
		onShow() {
		},
		methods: {
			getvideoList() {
				let _this=this
				
			
				this.$newrequest.post("/coc-active/api/v1/video/detailsList", {
					current: this.current,
					size: 10,
					type: this.type,
					videoId:this.articleId
				}).then(res => {
					if (this.current == 1) {
						this.articleId =res.data.records[0].id
						_this.$refs.videolist.getonload()
						_this.$refs.videolist.getchangdi(res.data.records[0].id)
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
			
					}else{
						res.data.records.filter(s => {
							this.dataList.push(s)
						})
					}
				})
			},
			getmorevideo() {
				this.current++
				this.getvideoList()
			},
			getbyId(){
			if (!this.isshowpage) {
				this.$showLoading()
			}
				this.$newrequest.post("/coc-active/api/v1/video/details",{
					id: this.articleId
				}).then(res=>{
					this.dataList.push(res.data)
					this.getvideoList()
				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.page {
	}
.item-top {
		background-color: #ffffff;
		border-radius: 0rpx 0rpx 20rpx 20rpx;
		// padding-top: 24rpx;
	}
</style>
