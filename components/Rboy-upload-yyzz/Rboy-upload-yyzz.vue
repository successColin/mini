<template>
	<div>
		<view class="Rboy-box">
			<view class="Rboy-obverse">
			<image v-if="!obverseUrl" class="obverseimg" src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721244760.png" @click="obverse_btn" mode="">
			</image>
			<image v-else class="obverseimg"  :src="obverseUrl " @click="obverse_btn" mode="">
			</image>
				<image class="del_btn" :src="del" mode="" v-if="obverseUrl" @click="del_btn('obverse')"></image>
		
			</view>
			<view class="Rboy-reverse">
			
		
			<image v-if="!reverseUrl" class="reverseimg" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060226165.png" @click="reverse_btn" mode="">
			</image>
			<image v-else class="reverseimg"  :src="reverseUrl " @click="reverse_btn" mode="">
			</image>
					<image class="del_btn" :src="del" mode="" v-if="reverseUrl" @click="del_btn('reverse')"></image>
			</view>
		</view>
	</div>
</template>

<script>
	import file from "./file.js"
	export default {
		name: "Rboy-upload-sfz",
		props: {
			// 正面
			obverseUrl: {
				type: String,
				default: ""
			},
			// 反面
			reverseUrl: {
				type: String,
				default: ""
			},
			// album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
			sourceType: {
				type: Array || Object,
				default: () => {
					return ['album', 'camera']
				}
			}
		},
		data() {
			return {
				obverse: file.obverse,
				reverse: file.reverse,
				del: file.del,
			}
		},
		created() {

		},
		methods: {
			obverse_btn() {
				if (this.obverseUrl) {
					// 预览
					this.previewImage(this.obverseUrl)
				} else {
					// 上传
					this.select_change("obverse")
				}
			},
			reverse_btn() {
				if (this.reverseUrl) {
					// 预览
					this.previewImage(this.reverseUrl)
				} else {
					// 上传
					this.select_change("reverse")
				}
			},
			// 上传
			select_change(name) {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
					sourceType: this.sourceType, // 从相册选择
					success: (res) => {
						this.$emit("selectChange", {
							msg: `${name}Image:ok`,
							name,
							tempFilePath: res.tempFilePaths[0],
							tempFile: res.tempFiles[0]
						})
					}
				});
			},
			// 预览
			previewImage(current = 0) {
				uni.previewImage({
					current,
					urls: [this.obverseUrl, this.reverseUrl],
				});
			},
			// 删除
			del_btn(name) {
				this.$emit("del", {
					name,
				})
			}
		}
	}
</script>

<style scoped lang="less">
	@imgWidth: 486rpx;
	@imgheight: 380rpx;
	@boxheight: 380rpx;

	.Rboy-box {
		// margin-left: 140rpx;
		// margin-top: 40rpx;
		.Rboy-obverse {
			border-radius: 10rpx;
			width: @imgWidth;
			height: @boxheight;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			position: relative;

			.obverseimg {
				width: @imgWidth;
				height: @imgheight;
			}

			.bottom {
				text-align: center;
				height: calc(@boxheight - @imgheight);
				background-color: #B7D7FF;
				color: #666666;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.del_btn {
				position: absolute;
				top: 5rpx;
				right: 5rpx;
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				z-index: 20;
			}
		}

		.Rboy-reverse {
			margin-top: 20rpx;
			border-radius: 10rpx;
			width: @imgWidth;
			height: @boxheight;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			position: relative;

			.reverseimg {
				width: @imgWidth;
				height: @imgheight;
			}

			.bottom {
				text-align: center;
				height: calc(@boxheight - @imgheight);
				background-color: #B7D7FF;
				color: #3B5FD2;
				font-size: 28rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.del_btn {
				position: absolute;
				top: 5rpx;
				right: 5rpx;
				width: 50rpx;
				height: 50rpx;
				border-radius: 50%;
				z-index: 20;
			}
		}
	}
</style>
