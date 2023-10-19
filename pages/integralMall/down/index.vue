<template>
	<view class="page ">

		<view class="flex topBox">
			<image src="https://oss.dcqcjlb.com/51che_java_dev/20230106/file_1672973096965.png"
				class="imgL"></image>
			<image @click="OnDownLoad"
				src="https://oss.dcqcjlb.com/51che_java_dev/20221220/file_1671535240097.png"
				class="imgR"></image>
		</view>
		<view class="bodybg">
			<view class="contBox">
				<view style="margin-top: 48rpx">
					<image style="width: 408rpx;height: 68rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230106/file_1672973398060.png">
					</image>
				</view>

				<view style="margin-top: 20rpx">
					<image style="width: 424rpx;height: 76rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671606937718.png">
					</image>
				</view>
				<view style="margin-top: 40rpx">
					<image style="width: 590rpx;height: 208rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671607202017.png">
					</image>
				</view>
		<!-- 		<view style="margin-top: 40rpx;margin-left: -90rpx;">
					<image style="width: 650rpx;height: 468rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671607573512.png">
					</image>
				</view>
				<view class="chat">
					识别二维码 立即下载
				</view> -->
				<view @click="OnDownLoad" style="margin-top: 126rpx;">
					<image style="width: 336rpx;height: 120rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671608360348.png">
					</image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			dataList:{}
			}
		},
		onLoad(option) {
			this.getList()
		},
		methods: {
			getList(){
				this.$newrequest.get("/coc-active/api/v1/merchantsettledin/appDownloadUrl").then(res=>{
					this.dataList=res.data
				})
				
			},
			downloadApp(url, filename) {
				let a = document.createElement("a");
				a.download = filename;
				a.href = url;
				a.target = "_blank";
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
			},
			OnDownLoad() {
				let port = uni.getSystemInfoSync().platform
				if (port == 'ios') {
					window.location.replace(this.dataList.iosUrl);
				} else if (port == 'android') {
					this.downloadApp(this.dataList.androidUrl, "51club")
				} else {
					console.log('运行在开发者工具上');
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.bodybg {
		height: 100vh;
		overflow: hidden;
		background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20221221/file_1671605338403.png');
		background-size: 100% 100%;
	}

	.topBox {
		width: 100%;
		background-color: rgba(34, 34, 34, 0.90);
		padding: 24rpx;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;

		.imgL {
			width: 354rpx;
			height: 80rpx;
		}

		.imgR {
			width: 170rpx;
			height: 60rpx;
		}
	}

	.contBox {
		text-align: center;

		.center51 {
			display: block;
			width: 100%;
		}

		.centerBox {
			position: relative;
			width: 515rpx;
			padding-left: 20rpx;
			margin-top: 50rpx;

			.qrBox {
				width: 100%;
			}

			.centerQr {
				width: 340rpx;
				height: 340px;
				position: absolute;
				top: 30rpx;
				right: 25rpx;

			}
		}

	}

	.bottomBox {
		image {
			width: 315rpx;
			height: 110rpx;
			margin-top: 50rpx;
			display: block;
			margin: 50rpx auto 0;
		}
	}

	.chat {
		color: #BC1010;
		font-size: 32rpx;
		font-weight: 800;
		margin-top: 24rpx;
	}
</style>
