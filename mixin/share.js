import {
		getstorage
	} from '@/utils/index.js'
export const shareMixin = {
	data() {
		return {
			shareConfigInfo: {
				title: '',
				path: '',
				imageUrl: '',
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
			} //分享配置信息
		}
	},
	onShareAppMessage() {
		return this.shareConfigInfo
	},
	onShareTimeline() {
		return this.shareConfigInfo
	},
	methods: {
		//获取分享配置
		shareConfig: function(pagetype) { //1:首页  2:活动商城 3:积分商城 4:活动详情页 5:精彩回放详情页 13:商家专区1 14:商家专区2
		console.log(pagetype)
			if (getstorage("token")) {
				this.getloginTime()
			}
		
			this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/" + pagetype)
				.then(res => {
					if (res.code == 200) {
						if (res.data) {
							this.shareConfigInfo.title = res.data.shareTitle;
							this.shareConfigInfo.path = res.data.pageRoute;
							this.shareConfigInfo.imageUrl = res.data.shareImg
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
		}
	}
}
