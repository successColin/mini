<template>
	<view class="page">
		<u-popup :safeAreaInsetBottom='false' round='12rpx' :show="showcomment" @close="close" mode="bottom">
			<view class="pop">
				<view class="card">
					<view style="margin-top: 20rpx;">
						<u--textarea maxlength='500' v-model="value" placeholder="请输入评论内容"></u--textarea>
					</view>
				</view>
				<view v-if="chosecomment.commentType!=4" style="margin: 40rpx;">
					<u-upload :fileList="fileList" @delete="deletePic" name="1" @afterRead="afterRead" :maxCount="1">
					</u-upload>
				</view>
				<view class="Totrue">
					<text @click="submitcomments">提交评论</text>
				</view>
			</view>
		</u-popup>
			<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				isend:true,
				fileList: [],
				value: '',
				imgs: ''
			}
		},
		props: {
			type:{
				type: String,
				default: false
			},
			showload:{
				type: Boolean,
				default: false
			},
			showcomment: {
				type: Boolean,
				default: false
			},
			chosecomment: {
				type: Object,
				default () {
					return {};
				},
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
			async afterRead(event) {
				let lists = [].concat(event.file)
				lists.map((item, i) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中',
						uploadstatus: false
					})
				})
				for (let i = 0; i < this.fileList.length; i++) {
					let data = this.fileList[i]
					if (data.status === 'uploading' && !this.fileList[i].uploadstatus) {
						this.fileList[i].uploadstatus = true
						const result = await this.uploadFilePromise(data.url)
						this.fileList[i].url = result
						this.fileList[i].status = 'success'
						this.fileList[i].message = ''
					}
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: getApp().globalData.uploadUrl, // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(JSON.parse(res.data).data)
							}, 0)
						}
					});
				})
			},
			deletePic(event) {
				this.fileList.splice(event.index, 1)
			},

			submitcomments() {
				if(this.isend){
					this.isend=false
					if (this.fileList.length > 0) {
						this.imgs = this.fileList[0].url
					}
					if(!this.imgs){
						this.imgs=null
					}else{
						this.imgs=[this.imgs]
					}
					let url=''
					if(this.type==1){
						url='/coc-social/api/v2/article/comment'
					}else{
						url='/coc-active/api/v1/marvellous_activity/comment'
					}
					this.$request.post(url, {
						commentType: this.chosecomment.commentType,
						relName: this.chosecomment.title ? this.chosecomment.title : this.chosecomment.name,
						content: this.value,
						imgs: this.imgs,
						id:this.chosecomment.id
					}).then(res => {
						if (res.code == 200) {
							this.isend=true
							this.value=''
							this.fileList=[]
							this.imgs=''
							this.$emit('submitcomments')
						}else{
							this.isend=true
							this.$refs.uToast.show({
								message: res.message,
							});
						}
					})
				}else{
					return false
				}
			
			},
			close() {
				this.$emit('closepopcomment')
			},
		}
	}
</script>

<style lang="scss">
	.page {}

	.pop {
		padding: 20rpx;
		// width: 640rpx;
		background-color: #ffffff;

		.title {
			font-size: 36rpx;
			font-weight: bold;
			margin-top: 15rpx;
			margin-left: 20rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.card {
			background-color: #ffffff;
			border-radius: 12rpx;

			.rate {
				display: flex;
				font-size: 28rpx;
				margin-left: 20rpx;
				padding-bottom: 20rpx;
			}

		}

		.Totrue {
			text-align: center;
			margin-top: 60rpx;
			margin-bottom: 40rpx;

			text {
				font-size: 32rpx;
				padding: 10rpx 80rpx;
				background-color: #d91b1b;
				border-radius: 10rpx;
				color: #ffffff;
			}
		}
	}
</style>
