<template>
	<view class="page">
		<view style="position: fixed;top: 0rpx;">
			<video @click.stop="OnClickVideo" id="videoid" :autoplay='true' :loop='true' :controls='false'
				style="width: 750rpx;height: 100vh;" :src="dataList[swiperindex].article.video" object-fit='contain'>
			</video>
		</view>
		<swiper @animationfinish='animationfinish' class="swiper" :vertical='true' style="height: 100vh;" @change='change'
			duration='300'>
			<swiper-item v-for="(item, index) in dataList" :key="index">
				<view v-show="isshowitem">
					<!-- 	<view style="height:100vh;z-index: 1;">
					<video @click="OnClickVideo(index)" :id="'play'+index" :loop='true' :controls='false'
						style="width: 100%;height: 100%;" :src="item.article.video" object-fit='contain'></video>
				</view> -->
					<!-- 发布时间 -->
					<view class="createdtime">
						{{ item.article.createdAt }}
					</view>
					<!-- 内容 -->
					<view class="conent-style moreLine">
						{{ item.article.content }}
					</view>
					<!-- 发布人 -->
					<view class="from-name">
						<view @click="Onpushuserinfo(item)">@{{ item.article.name }}</view>
						<view v-if="userId != item.article.userId" class="follow"
							:class="{ 'bgGray-new': item.article.followType == 1 }" @click="Onfollow(item)">

							<text v-if='item.article.followType == 1'>已关注</text>
							<text v-else>关注</text>
						</view>

					</view>
					<!-- 商家信息 -->
					<view class="merchant-style" @click="handleJumpMerchant(item)" :style="{bottom: few(item) === 0 ?  '250rpx' : '310rpx'}">
						<view v-if="item.article.shopPunchClockId" class="prominent oneLine">
							<view class="u-flex alc" style="margin-left: 10rpx">
								<image
									style="width: 32rpx; height: 32rpx"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png"
								>
								</image>
							</view>
							<view
								class="txtColorWhite size24 oneLine"
								style="margin-left: 15rpx; flex: 1; line-height: 48rpx; margin-right: 15rpx;"
							>
								商家丨{{ item.article.shopPunchClock }}
							</view>
						</view>
					</view>
					<!-- 带货定位信息 -->
					<view class="shop-style oneLine">
						<view v-if="item.expertShopSelection" class="u-flex background-touming oneLine" @click="Onpushdetail(item)">
							<view class="u-flex alc">
								<!-- 2保养套餐  3救援卡 1活动 4团购 5单品套餐-->
								<image v-if='item.expertShopSelection.type == 2' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
								</image>
								<image v-if='item.expertShopSelection.type == 3' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png">
								</image>
								<image v-if='item.expertShopSelection.type == 1' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
								</image>
								<image v-if='item.expertShopSelection.type == 4' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
								</image>
								<image v-if='item.expertShopSelection.type == 5' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png">
								</image>
							</view>
							<view class="oneLine" style="flex: 1;margin-left: 15rpx;">
								{{ item.expertShopSelection.relatedName }}
							</view>
						</view>
						<view v-else-if="item.expertSelectionLibrary" class="u-flex background-touming oneLine"
							@click="Onpushdetail(item)">
							<view class="u-flex alc">
								<!-- 2保养套餐  3救援卡 1活动 4团购 5单品套餐6车款-->
								<image v-if='item.expertSelectionLibrary.type == 6' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
								</image>
								<image v-if='item.expertSelectionLibrary.type == 3' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png">
								</image>
								<image v-if='item.expertSelectionLibrary.type == 1' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
								</image>
								<image v-if='item.expertSelectionLibrary.type == 4' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
								</image>
								<image v-if='item.expertSelectionLibrary.type == 5' style="width: 32rpx;height: 32rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png">
								</image>
							</view>
							<view class="oneLine" style="flex: 1;margin-left: 15rpx;">
								{{ item.expertSelectionLibrary.relatedName }}
							</view>
						</view>

						<view v-if="item.article.address" class="ml10" @click="Onpushmap(item)">
							<u-icon color="#ffffff" name="map"></u-icon>
						</view>
						<view v-if="item.article.address" @click="Onpushmap(item)" class="oneLine ml10" style="min-width: 100px;">
							{{ item.article.address }}
						</view>
					</view>
					<!-- 点赞评论转发信息 -->
					<view class="area">
						<view @click="OnlikeBase(index)">
							<image v-if="item.article.likeType == 2" style="width: 61rpx;height: 53rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237534362.png">
							</image>
							<image v-else style="width: 58rpx;height: 52rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692776944499.png">
							</image>
						</view>
						<view class="mt15">{{ item.article.likeBaseNum }}</view>
						<view class="mt40" @click="Onopencomment">
							<image style="width: 58rpx;height: 52rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237915057.png">
							</image>

						</view>
						<view class="mt15">{{ item.article.commentNum }}</view>
						<view class="mt40">
							<button class="botton-none" open-type='share' style="display: inline-flex;">
								<image style="width: 57rpx;height: 46rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237952655.png">
								</image>
							</button>
						</view>
						<view class="mt15" style="margin-bottom: 15rpx;">{{ item.article.shareBaseNum }}</view>
						<view v-if="userId == item.article.userId" @click="Onshowsheet" style="margin-left: 5rpx;">
							<u-icon color="#ffffff" size="24" :bold='true' name="more-dot-fill"></u-icon>
						</view>
					</view>
					<u-popup round='5' :safeAreaInsetBottom='false' :show="showcomment" @close="showcomment = false"
						mode="bottom">
						<view style="height: 600rpx;padding: 40rpx 55rpx 20rpx 25rpx;">
							<view class="tac size24 fwb mb20">{{ item.article.commentNum }}条评论</view>
							<scroll-view scroll-y="true" v-if="item.comments" style="min-height: 0rpx;max-height: 400rpx;">
								<view class="comment-list">
									<view v-for="(item1, index1) in item.comments" :key="index1" @click="Onreply(item1)"
										class="mb20">
										<view class="comment">
											<view class="u-flex">
												<view>
													<u-avatar :src="item1.headImg" size="30"></u-avatar>
												</view>
												<view style="margin-left: 20rpx;">
													<view
														style="font-size: 28rpx;font-weight: bold;width: 400rpx;display: flex;align-items: center;">
														<view>{{ item1.userName }}</view>
														<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
															来自{{ item1.userIpProvince }}</view>
													</view>
													<view style="font-size: 28rpx;width: 400rpx;margin-top: 10rpx;"
														class="oneLine">
														{{ item1.content }}
													</view>
													<view @click.stop="OnOpenImg(item1)" v-if="item1.imgs"
														style="display: flex;font-size: 24rpx;color: #D91B1B;margin-top: 16rpx;align-items: center;">
														<view style="margin-top: 2rpx;">
															<u-icon color="#D91B1B" name="photo"></u-icon>
														</view>
														<view>查看图片</view>
													</view>
												</view>
											</view>
											<view
												style="font-size: 20rpx;color: #999999;width: 100rpx;margin-top: 16rpx;text-align: right;">
												<view>{{ item1.commentTime }}</view>
												<view v-if="item1.userId == userId"
													@click.stop="delComments(item1.commentId, item)"
													style="color: #D91B1B;margin-top: 16rpx;font-size: 28rpx;">删除</view>
											</view>
										</view>
										<view v-for="(item2, index2) in item1.replyVOS" :key="index"
											style="margin-top: 30rpx;">
											<view class="u-flex" style="align-items: center;">
												<view style="margin-left: 88rpx;">
													<image style="width: 60rpx;height: 60rpx;border-radius: 50%;"
														:src="item2.headImg">
													</image>
												</view>
												<view style="font-size: 24rpx;font-weight: bold;margin-left: 10rpx;">
													{{ item2.userName }}
												</view>
												<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
													来自{{ item2.userIpProvince }}
												</view>
											</view>
											<view style="margin-left: 160rpx;">
												{{ item2.content }}
											</view>
										</view>
									</view>
								</view>
							</scroll-view>
							<view style="position: fixed;bottom: 50rpx;width: 700rpx;" @click="showcommentpop = true">
								<u--input shape='circle' :disabled='true' placeholder="说点什么" prefixIcon="edit-pen"
									prefixIconStyle="font-size: 22px;color: #909399"></u--input>
							</view>
						</view>

					</u-popup>
					<u-popup :safeAreaInsetBottom='false' :show="showreply" @close="showreply = false" mode="bottom">
						<view class="tac" style="height: 600rpx;width: 750rpx;padding: 40rpx 0rpx;">
							<view class="size28 fwb mt20">评论</view>
							<view class="mt20" style="width: 650rpx;display: inline-block;">
								<u--textarea v-model="textcontent" placeholder="请输入内容"></u--textarea>
							</view>

							<view class="tac return-btn" style="display: inline-block;" @click="Onreplypop(item)">提交评论
							</view>
						</view>
					</u-popup>
					<u-popup :safeAreaInsetBottom='false' :show="showcommentpop" @close="showcommentpop = false"
						mode="bottom">
						<view class="tac" style="height: 600rpx;width: 750rpx;padding: 40rpx 0rpx;">
							<view class="size28 fwb mt20">评论</view>
							<view class="mt20" style="width: 650rpx;display: inline-block;">
								<u--textarea v-model="textcontent" placeholder="请输入内容"></u--textarea>
							</view>
							<view style="margin: 40rpx;">
								<u-upload :fileList="fileList" @delete="deletePic" name="1" @afterRead="afterRead"
									:maxCount="1">
								</u-upload>
							</view>
							<view class="tac return-btn" style="display: inline-block;margin-top: -10rpx;"
								@click="Onreplyfirst(item)">提交评论</view>
						</view>
					</u-popup>
					<u-popup :safeAreaInsetBottom='false' :show="popimgs" @close="closeimg" mode="center">
						<view>
							<image mode="widthFix" style="width: 650rpx;" :src="imgsbig"></image>
						</view>
					</u-popup>
					<u-action-sheet @select='OnSelectsheet' @close='showsheet = false' :closeOnClickOverlay="true"
						:actions="list" :show="showsheet"></u-action-sheet>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
export default {

	data() {
		return {
			isshowitem: true,
			list: [{
				name: '贴文删除',
				color: '#D91B1B',
				fontSize: '20'
			},
			{
				name: '取消',
				fontSize: '20'
			},

			],
			showsheet: false,
			userId: '',
			imgsbig: '',
			fileList: [],
			showcommentpop: false,
			showreply: false,
			chosecomment: {},
			showload: false,
			showcomment: false,
			index: '',
			endid: '',
			id: '',
			changid: '',
			isplay: false,
			swiperindex: 0,
			// dataList: [],
			textcontent: '',
			replyid: '',
			popimgs: false,
			isshowpage: false,
		}
	},
	computed: {
		few() {
			return function(item) {
				let num = 0;
				if (item.expertShopSelection || item.expertSelectionLibrary) {
					num += 1;
				}
				if (item.article.address){
					num += 1;
				}
				return num;
			}
		}
	},
	onLoad(option) {
	},
	mounted() {
		// 保持屏幕常亮
		uni.setKeepScreenOn({
			keepScreenOn: true
		});
	},
	onShow() { },
	props: {
		dataList: {
			type: Array
		}
	},
	methods: {
		handleJumpMerchant(item) {
			console.log(item);
			uni.navigateTo({
				url: '/pages/activityMall/business/index?id=' + item.article.shopPunchClockId // + '&shopType=' + this.shopType
			})
		},
		animationfinish() {
			this.isshowitem = true
		},
		Onpushuserinfo(item) {
			console.log(item);
			if (item.article.userStatus == 2) {
				return uni.$u.toast('该用户被冻结');
			} else if (item.article.userStatus == 3) {
				return uni.$u.toast('该用户已注销');
			}
			if (item.article.isExpert == 1) {
				if (item.article.expertStatus == 1) {
					uni.$u.toast('该用户被封禁')
				} else {
					// 达人转跳
					uni.navigateTo({
						url: '/pages/wiseman/component/shopinfo?type=1&userId=' + item.article.userId
					});
				}
			} else {
				// 不是达人的转跳
				uni.navigateTo({
					url: '/pages/wiseman/component/shopinfo?type=2&userId=' + item.article.userId
				});
			}
		},
		Onfollow(item) {
			this.$request.post("/coc-social/api/v2/article/followExpert", {
				userId: item.article.userId
			}).then(res => {
				if (res.code == 200) {
					uni.$u.toast('操作成功')
					this.getnewdata(item.article.id)
				} else {
					uni.$u.toast(res.message)
				}
			})
		},
		getchangdi(id) {
			this.changid = id
		},
		getonload() {
			uni.createVideoContext("play0", this).play()
			if (uni.getStorageSync("userId")) {
				this.userId = uni.getStorageSync("userId")
			}
		},
		OnSelectsheet(e) {
			let _this = this
			if (e.name == "贴文删除") {
				this.$request.post('/coc-social/api/v2/article/addArticle', {
					articleId: this.changid,
					articleUserId: this.userId
				}).then(res => {
					if (res.code == 200) {

						uni.$u.toast('删除成功')
						setTimeout(() => {
							_this.$emit('detailvideo', _this.changid)
						}, 1000)
					} else {
						uni.$u.toast(res.message)
					}
				})
			}
		},
		Onshowsheet() {
			this.showsheet = true
		},
		delComments(id, item) {
			let _this = this
			this.$request.post('/coc-active/api/v1/comments/delComments', {
				id: id
			}).then(res => {
				if (res.code == 200) {
					uni.$u.toast('删除成功')
					this.getnewdata(item.article.id)
				} else {
					this.$refs.uToast.show({
						message: res.message,
					});
				}
			})
		},
		closeimg() {
			this.popimgs = false
		},
		OnOpenImg(imgs) {
			this.imgsbig = imgs.imgs
			this.popimgs = true
		},
		Onreplyfirst(item) {
			let img = []
			if (this.fileList.length > 0) {
				img = [this.fileList[0].url]
			}
			this.$request.post('/coc-social/api/v2/article/comment', {
				commentType: 2,
				content: this.textcontent,
				id: item.article.id,
				imgs: img
			}).then(res => {
				if (res.code == 200) {
					this.textcontent = ''
					this.showcommentpop = false
					this.getnewdata(item.article.id)
				} else {
					uni.$u.toast(res.message)
				}
			})
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
		deletePic(event) {
			this.fileList.splice(event.index, 1)
		},
		getnewdata(id) {
			this.$request.post('coc-social/api/v1/article/findById', {
				current: 1,
				id: id,
				size: 99
			}).then(res => {
				this.dataList.filter((s, i) => {
					if (s.article.id == id) {

						this.$emit('setnewvideo', i, res.data)
					}
				})
			})

		},
		Onreplypop() {
			this.$request.post("/coc-social/api/v2/article/comment", {
				commentType: 4,
				content: this.textcontent,
				id: this.replyid,
			}).then(res => {
				if (res.code == 200) {
					this.textcontent = ''
					this.showreply = false
					this.getnewdata(this.changid)
				} else {
					uni.$u.toast(res.message)
				}
			})
		},
		Onreply(item) {
			console.log(item)
			this.replyid = item.commentId
			this.showreply = true
		},
		Onopencomment() {
			this.showcomment = true
		},
		Onpushmap(item) {
			let _this = this
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: function (res) {
					const latitude = item.article.lat;
					const longitude = item.article.lng;
					uni.openLocation({
						latitude: latitude,
						longitude: longitude,
						success: function () {
							console.log('success');
						}
					});
				}
			});
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
		OnlikeBase(index) {
			this.$request.post("/coc-social/api/v2/article/like", {
				id: this.dataList[index].article.id
			}).then(res => {
				if (res.code == 200) {

					if (this.dataList[index].article.likeType == 2) {
						this.$emit('likenumchange', 2, index)
					} else {
						this.$emit('likenumchange', 1, index)
					}
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
					});
				}
			})
		},

		OnClickVideo(index) {
			if (!this.isplay) {
				this.isplay = true
				uni.createVideoContext("play" + index, this).pause()
			} else {
				this.isplay = false
				uni.createVideoContext("play" + index, this).play()
			}

		},
		Onpushdetail(item) {
			let id = item.expertShopSelection ? item.expertShopSelection.relatedId : item.expertSelectionLibrary.relatedId
			// 2保养套餐  3救援卡 1活动 4团购 5单品套餐6车款
			if (item.expertShopSelection) {
				if (item.expertShopSelection.type == 2) {
					uni.navigateTo({
						url: '/pages/carShops/upkeep/detail?id=' + id +
							'&forwardUserId=' + item.article.userId
					})
				} else if (item.expertShopSelection.type == 3) {
					uni.navigateTo({
						url: '/pages/roadhelp/index?forwardUserId=' + item.article.userId
					})
				} else if (item.expertShopSelection.type == 1) {
					uni.navigateTo({
						url: '/pages/home/activityDetail/index?id=' + id +
							'&forwardUserId=' + item.article.userId
					})
				} else if (item.expertShopSelection.type == 4) {
					uni.navigateTo({
						url: '/pages/grouppurchase/detail?id=' + id +
							'&forwardUserId=' +
							item.article.userId
					})
				} else if (item.expertShopSelection.type == 5) {
					uni.navigateTo({
						url: '/pages/grouppurchase/packagedetail?id=' + id,
						// url: '/pages/activity/activityRegistration/packagedetail?id=' + id +
						// 	'&forwardUserId=' + item.article.userId
					})
				}
			} else {
				if (item.expertSelectionLibrary.type == 2) {
					uni.navigateTo({
						url: '/pages/carShops/upkeep/detail?id=' + id +
							'&forwardUserId=' + item.article.userId
					})
				} else if (item.expertSelectionLibrary.type == 3) {
					uni.navigateTo({
						url: '/pages/roadhelp/index?forwardUserId=' + item.article.userId
					})
				} else if (item.expertSelectionLibrary.type == 1) {
					uni.navigateTo({
						url: '/pages/home/activityDetail/index?id=' + id +
							'&forwardUserId=' + item.article.userId
					})
				} else if (item.expertSelectionLibrary.type == 4) {
					uni.navigateTo({
						url: '/pages/grouppurchase/detail?id=' + id +
							'&forwardUserId=' +
							item.article.userId
					})
				} else if (item.expertSelectionLibrary.type == 5) {
					uni.navigateTo({
						url: '/pages/grouppurchase/packagedetail?id=' + id,
						// url: '/pages/activity/activityRegistration/packagedetail?id=' + id +
						// 	'&forwardUserId=' + item.article.userId
					})
				} else if (item.expertSelectionLibrary.type == 6) {
					uni.navigateTo({
						url: '/pages/carShops/carList/index?id=' + item.expertSelectionLibrary.relatedId + '&type=1&shopId=' + item.expertSelectionLibrary.shopId
					})
				}
			}

		},
		change(e) {
			this.isshowitem = false
			this.showcomment = false
			this.changid = this.dataList[e.detail.current].article.id
			uni.$emit('changid', this.dataList[e.detail.current].article.id)
			this.dataList.article = this.dataList[e.detail.current].comments
			this.commentList =
				this.isplay = false
			uni.createVideoContext("play" + this.swiperindex, this).stop()
			this.swiperindex = e.detail.current
			uni.createVideoContext("play" + this.swiperindex, this).play()

			if ((e.detail.current / 9) % 1 === 0) {
				this.$emit('getmorevideo')
			}
		}
	}
}
</script>

<style lang="scss">
.page {}

.createdtime {
	font-size: 20rpx;
	position: fixed;
	bottom: 65rpx;
	left: 25rpx;
	color: #ffffff;
	z-index: 99;
}

.conent-style {
	font-size: 28rpx;
	position: fixed;
	bottom: 110rpx;
	left: 25rpx;
	color: #ffffff;
	z-index: 99;
}

.from-name {
	display: flex;
	font-size: 36rpx;
	position: fixed;
	bottom: 190rpx;
	left: 25rpx;
	color: #ffffff;
	z-index: 99;
}

.follow {
	width: 86rpx;
	height: 36rpx;
	background: #D91B1B;
	border-radius: 10rpx;
	font-size: 24rpx;
	line-height: 36rpx;
	text-align: center;
	display: inline-block;
	margin-left: 9rpx;
	margin-top: 9rpx;
}

.merchant-style {
	font-size: 24rpx;
	position: fixed;
	bottom: 310rpx;
	left: 25rpx;
	color: #ffffff;
	display: flex;
	align-items: center;
	z-index: 99;
	width: calc(100% - 100rpx);
}

.shop-style {
	font-size: 24rpx;
	position: fixed;
	bottom: 250rpx;
	left: 25rpx;
	color: #ffffff;
	display: flex;
	align-items: center;
	z-index: 99;
	width: calc(100% - 100rpx);
}

.background-touming {
	background-color: rgba(0, 0, 0, 0.22);
	border-radius: 10rpx;
	padding: 8rpx;
}

.area {
	font-size: 24rpx;
	position: fixed;
	bottom: 350rpx;
	right: 25rpx;
	color: #ffffff;
	text-align: center;
	z-index: 99;
}

.mt15 {
	margin-top: 15rpx;
}

.mt40 {
	margin-top: 40rpx;
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

.comment-list {


	.comment {
		display: flex;
		justify-content: space-between;
	}
}

.return-btn {
	margin-top: 50rpx;
	width: 160rpx;
	height: 60rpx;
	line-height: 60rpx;
	font-size: 28rpx;
	color: #ffffff;
	border-radius: 15rpx;
	background-color: #D91B1B;
}

.bgGray-new {
	background-color: #999999 !important;
}

.prominent {
	height: 48rpx;
	background-image: url(https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685780222536.png);
	background-size: 100% 100%;
	border-radius: 10rpx;
	display: flex;
	top: 0;
	margin: 0;
	width: 100;
}
</style>
