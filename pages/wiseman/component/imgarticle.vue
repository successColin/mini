<template>
	<view class="page">
		<view v-if="isshowpage">
			<swiper class="swiper" :vertical='true' style="height:99vh" @change='change' duration='800'>
				<swiper-item v-for="(item,index) in dataList" :key="index">
					<scroll-view scroll-y="true" style="height: 100%;">
						<imgcomponent :dataList="item" @sendid='sendid(item)' :userId='userId' :index="index">
						</imgcomponent>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>

		<request-loading></request-loading>
	</view>
</template>

<script>
	import imgcomponent from "../component/imgcomponent.vue"
	export default {
		components: {
			imgcomponent
		},
		data() {
			return {
				isshowpage: false,
				endid: '',
				id: '',
				userId: '',
				changid: 0,
				viewheight: 0,
				dataList: []
			}
		},

		onLoad(option) {
			this.id = option.id
			this.changid = option.id
			let systemInfo = uni.getSystemInfoSync();
			let screenHeight = systemInfo.screenHeight;
			this.viewheight = screenHeight * 2
			this.getdetail()
			this.userId = uni.getStorageSync("userId")
			let _this = this
			uni.$on('changelike', function(data) {
				if (data.likeType == 1) {
					_this.dataList[data.index].article.likeType = 1
					_this.dataList[data.index].article.likeBaseNum = _this.dataList[data.index].article
						.likeBaseNum + 1
				} else if (data.likeType == 2) {
					_this.dataList[data.index].article.likeType = 2
					_this.dataList[data.index].article.likeBaseNum = _this.dataList[data.index].article
						.likeBaseNum + -1
				}
			})

		},
		onShow() {},
		onShareAppMessage(res) {
			this.share()
			let title = ''
			this.dataList.filter(s => {
				if (s.article.id == this.changid) {
					title = s.article.title
				}
			})
			return {
				title: title,
				path: `/pages/wiseman/component/imgarticle?id=` + this.changid,
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
			this.share()
			let title = ''
			this.dataList.filter(s => {
				if (s.article.id == this.changid) {
					title = s.article.title
				}
			})
			return {
				title: title,
				path: `/pages/wiseman/component/imgarticle?id=` + this.changid,
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
		methods: {
			getnewdata(id) {
				this.$request.post('coc-social/api/v1/article/findById', {
					current: 1,
					id: id,
					size: 3
				}).then(res => {
					res.data.article.imgarr = res.data.article.imgs.split(',')
					this.dataList.filter((s, i) => {
						if (s.article.id == id) {
							this.$set(this.dataList, i, res.data)
						}
					})
				})

			},
			sendid(item) {
				// this.dataList = []

				this.getnewdata(item.article.id)
			},
			share() {
				this.$request.post("/coc-social/api/v2/article/share", {
					id: this.changid
				}).then(res => {
					if (res.code == 200) {
						this.dataList.filter(s => {
							if (s.article.id == this.changid) {
								s.article.shareBaseNum++
							}
						})
					}
				})
			},
			getdetail() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				let _this = this
				this.$request.post('coc-social/api/v1/article/findById', {
					current: 1,
					id: this.id,
					size: 99
				}).then(res => {
					res.data.article.imgarr = res.data.article.imgs.split(',')
					this.dataList.push(res.data)
					setTimeout(() => {
						_this.getList()
					}, 100)

				})
			},
			getList() {
				this.$request.post("/coc-social/api/v2/article/ids", {
					id: this.id
				}).then(res => {
					if (res.data.length == 10) {
						this.endid = res.data[9].article.id
					}


					res.data.filter(s => {
						s.article.imgarr = s.article.imgs.split(',')
					})
					res.data.filter(s => {
						this.dataList.push(s)
					})
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			change(e) {
				this.changid = this.dataList[e.detail.current].article.id
				let _this = this
				if ((e.detail.current / 9) % 1 === 0) {
					this.$request.post("/coc-social/api/v2/article/ids", {
						id: this.endid
					}).then(res => {
						this.endid = res.data[9].article.id

						res.data.filter(s => {
							s.article.imgarr = s.article.imgs.split(',')
						})
						res.data.filter(s => {
							this.dataList.push(s)
						})
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.page {}
</style>
