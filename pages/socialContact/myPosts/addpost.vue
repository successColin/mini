<template>
	<view class="page">
		<view class="title">
			<view>
				<u-avatar size="86rpx" :src="avatar">
				</u-avatar>
			</view>
			<view class="card">
				<view>
					<u--input placeholderStyle="margin-left:20rpx"
						:customStyle="{backgroundColor:'#ffffff',width:'528rpx',height:'80rpx'}"
						placeholder="此处标题，限定14字" border="none" v-model="dataList.title" maxlength='14'></u--input>
				</view>
				<view class="hr">
				</view>
				<view>
					<u--textarea maxlength='-1' height='300rpx' border='none' v-model="dataList.content"
						placeholder="请输入内容">
					</u--textarea>
				</view>
			</view>
		</view>
		<view class="u-flex" style="flex-wrap: wrap;margin-top: 20rpx;margin-left: 126rpx;
    margin-right: 35rpx">
			<view v-for="(item,index) in imgArr" :key="index">
				<view @click="DetailImg(index)">
					<u-icon name="close"></u-icon>
				</view>
				<image style="width: 166rpx;height: 200rpx;margin-top: 10rpx;margin-left: 10rpx;" mode="aspectFit"
					:src="item"></image>
			</view>
		</view>
		<view style="margin-left: 126rpx;" v-if="video">
			<video style="width: 520rpx;" :src="video"></video>
			<view style="width: 30%;">
				<u-tag @click="Detailvideo" v-if="video" text="删除视频" type="error"></u-tag>
			</view>
		</view>

		<view v-if="isvote" class="vote">
			<view class="title">
				<view style="margin-right: 20rpx;line-height: 72rpx;">投票标题</view>
				<u--input placeholder="请输入投票标题" border="surround" v-model="dataList.votesTitle"></u--input>
			</view>
			<view v-for="(item,index) in dataList.optionContent" :key="index">
				<u--input :placeholder="'选项'+Number(index+1)" border="surround" v-model="optionContent[index]">
				</u--input>
			</view>
			<view class="u-flex">
				<view class="add-btn">
					<view @click="Additem" class="u-flex">
						<view>
							<u-icon :bold='true' color="#d91b1b" name="plus"></u-icon>
						</view>
						<view style="margin-top: -3rpx;">增加</view>
					</view>

				</view>
				<view class="add-btn" style="margin-left: 20rpx;">
					<view @click="Deleteitem" class="u-flex">
						<view>
							<u-icon :bold='true' color="#d91b1b" name="minus"></u-icon>
						</view>
						<view style="margin-top: -3rpx;">取消</view>
					</view>
				</view>
			</view>
			<view class="duration">
				<view style="line-height: 54rpx;">时长：</view>
				<view style="width: 80rpx;height: 60rpx;">
					<u--input type='number' :customStyle="{height:'30rpx'}" placeholder="1" border="surround"
						v-model="day"></u--input>
				</view>
				<view style="line-height: 54rpx;margin-left: 10rpx;">天</view>
				<view style="width: 80rpx;height: 60rpx;">
					<u--input type='number' :customStyle="{height:'30rpx'}" placeholder="1" border="surround"
						v-model="hour"></u--input>
				</view>
				<view style="line-height: 54rpx;margin-left: 10rpx;">时</view>
				<view style="width: 80rpx;height: 60rpx;">
					<u--input type='number' :customStyle="{height:'30rpx'}" placeholder="1" border="surround"
						v-model="branch"></u--input>
				</view>
				<view style="line-height: 54rpx;margin-left: 10rpx;">分</view>
			</view>
			<view class="remove-vote">
				<text @click="Onremovevote" class="btn">移除投票</text>
			</view>
		</view>

		<view class="add">
			<view style="margin-top: 6rpx;font-size: 32rpx;">插入</view>
			<view @click="OnchoooseImg" class="item">
				<image style="width: 37rpx;height: 37rpx;" mode="widthFix" src="../static/image/huisetupian.png">
				</image>
				<view style="margin-left: 10rpx;font-size: 24rpx">图片</view>
			</view>
			<view @click="OnchoooseVideo" class="item">
				<image style="width: 37rpx;height: 37rpx;" mode="widthFix" src="../static/image/huiseshipin.png">
				</image>
				<view style="margin-left: 10rpx;font-size: 24rpx">视频</view>
			</view>
			<!-- 	<view @click="Onvote" class="item">
				<image style="width: 37rpx;height: 37rpx;" mode="widthFix" src="../static/image/huisetoupiao.png"></image>
				<view style="margin-left: 10rpx;font-size: 24rpx">投票</view>
			</view> -->
		</view>
		<view class="jurisdiction">
			<view>
				<u-radio-group @change="groupChange" shape="square" activeColor="#d91b1b" v-model="radiovalue1"
					placement="row">
					<u-radio label="所有人可见" name="1">
					</u-radio>
					<u-radio :customStyle="{marginLeft: '30rpx'}" label="关注我可见" name="2">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<view class="release">
			<text @click="Onsave()">发布</text>
		</view>
		<view style="height: 60rpx;">

		</view>
		<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		getstorage
	} from '@/utils/index.js'
	export default {
		components: {},
		data() {
			return {
				showloading: false,
				day: '',
				hour: '',
				branch: '',
				optionContent: [],
				radiovalue1: '1',
				isvote: false,
				imgArr: [],
				video: '',
				dataList: {
					imgs: [],
					title: '',
					content: '',
					showType: '1',
					isInsertVote: 0,
					votesTitle: '',
					duration: '',
					optionContent: [{}, {}]
				},
				avatar: '',
				groupId: ''
			}
		},

		onLoad(option) {
			if (option.groupId) {
				this.groupId = option.groupId
			}

			this.avatar = getstorage("headImg")
		},
		onShow() {},
		methods: {
			Onsave() {
				if (this.dataList.isInsertVote === 1) {
					this.dataList.optionContent = this.optionContent
					this.dataList.duration = this.day * 86400000 + this.hour * 3600000 + this.branch * 60000
				}
				if (this.dataList.isInsertVote == 0) {
					delete this.dataList.optionContent
				}
				if (this.groupId) {
					this.dataList.groupId = this.groupId
				}
				if (this.dataList.imgs.length == 0) {
					this.$refs.uToast.show({
						message: '发布贴文最少添加一张图片',
					});
					return false
				}
				this.dataList.imgs = this.dataList.imgs.join(',')
				if (!this.dataList.title) {
					this.$refs.uToast.show({
						message: '请填写标题',
					});
					return false
				}
				this.showloading = true
				this.$request.post('/coc-social/api/v1/article/addArticle', this.dataList).then(res => {
					if (res.code == 200) {
						this.showloading = false
						this.$refs.uToast.show({
							message: "发布成功",
							type: "success",
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					} else {
						this.showloading = false
						this.$refs.uToast.show({
							message: res.message,
							type: "error",
							complete() {
								uni.navigateBack({
									delta: 1
								});
							}
						});
					}
				})
			},
			groupChange(val) {
				this.dataList.showType = val
			},
			Detailvideo() {
				this.video = false
			},
			DetailImg(index) {
				this.imgArr.splice(index, 1)
				this.dataList.imgs.splice(index, 1)
			},
			Onremovevote() {
				this.isvote = false
				this.dataList.isInsertVote = 0
			},
			Deleteitem() {
				if (this.dataList.optionContent.length < 3) {
					this.$refs.uToast.show({
						type: 'error',
						message: '最少2个选项',
					});
				} else {
					this.dataList.optionContent.pop()
					this.optionContent.pop()
				}
			},
			Additem() {
				if (this.dataList.optionContent.length > 8) {
					this.$refs.uToast.show({
						type: 'error',
						message: '最多9个选项',
					});

				} else {
					let index = '选项' + Number(this.dataList.optionContent + 1)
					this.dataList.optionContent.push({})
				}

			},
			Onvote() {
				this.dataList.isInsertVote = 1
				this.isvote = true
			},
			OnchoooseVideo() {
				let _this = this
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						_this.showloading = true
						uni.uploadFile({
							url: getApp().globalData.uploadUrl,
							filePath: res.tempFilePath,
							name: 'file',
							formData: {
								'file': res.tempFilePath
							},
							header: {
								"Content-Type": 'multipart/form-data'
							},
							success: (uploadFileRes) => {
								_this.video = JSON.parse(uploadFileRes.data).data
								_this.dataList.video = JSON.parse(uploadFileRes.data).data
								_this.showloading = false
							}
						})


					}
				});
			},
			OnchoooseImg() {
				let _this = this
				uni.chooseImage({
					count: 9,
					sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						_this.showloading = true
						res.tempFilePaths.filter((s, i) => {
							_this.imgArr.push(s)
							uni.uploadFile({
								url: getApp().globalData.uploadUrl,
								filePath: s,
								name: 'file',
								formData: {
									'file': s
								},
								header: {
									"Content-Type": 'multipart/form-data'
								},
								success: (uploadFileRes) => {
									_this.dataList.imgs.push(JSON.parse(uploadFileRes.data)
										.data)
									if (i == res.tempFilePaths.length - 1) {
										_this.showloading = false
									}
								}
							})
						})

					},

				})

			},


		}
	}
</script>

<style lang="scss">
	.page {
		margin: 30rpx;
	}

	.title {
		display: flex;
	}

	.card {
		margin-left: 40rpx;
		margin-top: 10rpx;
		background-color: #ffffff;
		border-radius: 12rpx;

		.hr {
			height: 1rpx;
			background-color: #eeeeee;
			width: 100%;
		}
	}

	.add {
		display: flex;
		justify-content: space-around;
		margin: 0rpx 35rpx 20rpx 126rpx;
		font-size: 28rpx;
		background-color: #ffffff;
		padding: 25rpx 25rpx 20rpx 25rpx;
		border-radius: 12rpx;

		.item {
			display: flex;
			align-items: center;
			background-color: #ffffff;
			padding: 6rpx 20rpx 6rpx 20rpx;
			border-radius: 24rpx;
			border: solid 2rpx #cccccc;
		}
	}

	.vote {
		padding: 20rpx 20rpx 60rpx 20rpx;
		background-color: #ffffff;
		border-radius: 12rpx;
		margin-left: 126rpx;
		margin-top: 20rpx;
		margin-right: 35rpx;

		.title {
			display: flex;
			font-weight: normal;
			font-size: 24rpx;
		}

		.duration {
			display: flex;
			font-size: 32rpx;
			margin-top: 30rpx;
		}
	}

	.add-btn {
		display: inline-block;
		font-size: 28rpx;
		color: #d91b1b;
		border: solid 1rpx #cccccc;
		border-radius: 8rpx;
		padding: 10rpx 20rpx;
		margin-top: 20rpx;
		font-weight: bold;
	}

	.remove-vote {
		text-align: center;
		margin-top: 60rpx;

		.btn {
			background-color: #d91b1b;
			border-radius: 44px;
			padding: 10rpx 50rpx;
			color: #ffffff;
		}
	}

	.jurisdiction {
		background-color: #ffffff;
		border-radius: 12rpx;
		margin-left: 126rpx;
		margin-top: 20rpx;
		margin-right: 35rpx;
		padding: 30rpx 30rpx 30rpx 30rpx;
		display: flex;
		justify-content: space-around;
	}

	.release {
		margin-top: 60rpx;
		text-align: center;

		text {
			background-color: #d91b1b;
			border-radius: 44rpx;
			font-size: 36rpx;
			color: #ffffff;
			padding: 20rpx 200rpx;

		}
	}
</style>
