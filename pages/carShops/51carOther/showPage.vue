<template>
	<view>
		<video v-if="type == 3" :src="videoUrl" :autoplay="true" style="width: 100%;"></video>
		<image mode="widthFix" :src="imgUrl" style="width: 100%;"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: "", //1:个人购车 2:企业购车 3:了解51车 4:新车鉴赏 5:维修保养 6:玩乐专区 7:二手车评估 
				imgUrl: "",
				videoUrl: ""
			}
		},
		onLoad(options) {
			this.type = options.type
			if (options.type == 1) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/jpg/4e456f73da60c3184f7b3fcd6033f110.jpg"
			} else if (options.type == 2) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/xcx/images/business-bg.jpg"
			} else if (options.type == 3) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/xcx/images/buycar-intro.png"
				this.videoUrl =
					"https://oss.dcqcjlb.com/51che_java_dev/20230921/1695277617902_0701d760dd1947c34a5e8843bb1c9b33d7bd00701.mp4"
			} else if (options.type == 4) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/jpg/2932a85b02fa07487325551166e73f17.jpg"
			} else if (options.type == 5) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/jpg/d326558cd8ff2e66f9a37a04cd0b2163.jpg"
			} else if (options.type == 6) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/jpg/e9b3bcdc613466f42e2d328556e81bbe.jpg"
			} else if (options.type == 7) {
				this.imgUrl = "https://51che.oss-cn-hangzhou.aliyuncs.com/jpg/ff0e72cba158fbf57a56c0669629133e.jpg"
			} else if (options.type == 8) {
				this.imgUrl =
					"https://oss.dcqcjlb.com/51che_java_dev/20230920/file_1695191647931.png"
			}
			uni.setNavigationBarTitle({
				title: options.title
			})
		}
	}
</script>

<style></style>
