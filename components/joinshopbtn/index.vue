<template>
	<view class="page">
		<view class="u-flex jsb " style="width: 700rpx;margin-left: 46rpx;">
			<view>
				<button open-type='share' class="botton-none">
					<view class="u-flex jsc">
						<image style="width: 46rpx;height: 46rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692319672498.png"></image>
					</view>
					<view class="size24">分享好友</view>
					
				</button>
			</view>
			<view class="u-flex jsc button-style alc" @click="OnAddshop" :class="{'graybtn':isSelection==1}">
				<view class="u-flex alc"><image style="width: 46rpx;height: 46rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692320797115.png"></image></view>
				<view v-if="isSelection==1" style="margin-left: 15rpx;">移出小店</view>
					<view v-else style="margin-left: 15rpx;">加入小店</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {

		},
		props:{
			ids: {
				type: String,
				default: ''
			},
			type: {
				type: String,
				default: ''
			},
			isSelection:{
				type: String,
				default: ''
			}
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
			OnAddshop(){
				if(this.isSelection==0){
					this.$request.post("/coc-active/api/v1/expert/shop/selection/add",{
						type:this.type,
						relatedId:this.ids
					}).then(res=>{
						if(res.code==200){
									uni.$emit('saveaddshop',{msg:'页面更新'})
							uni.$u.toast('加入小店成功')
						}else{
							uni.$u.toast(res.message)
						}
					})
				}else{
					this.$request.post("/coc-active/api/v1/expert/shop/selection/remove",{
						type:this.type,
						relatedId:this.ids
					}).then(res=>{
						if(res.code==200){
									uni.$emit('saveaddshop',{msg:'页面更新'})
							uni.$u.toast('移出小店成功')
						}else{
							uni.$u.toast(res.message)
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {
	}
.botton-none {
			background: none;
			border: none;
			margin: 0;
			padding: 0;
			outline: none;
		}

		.botton-none::after {
			border: none;
		}
		.button-style{
			margin-right: 47rpx;
background: #D91B1B;
border-radius: 137rpx;
color: #ffffff;
font-size: 28rpx;
height: 85rpx;
line-height: 85rpx;
padding-left: 107rpx;
padding-right: 107rpx;
		}
		.graybtn {
			background-color: #999999;
		}
</style>
