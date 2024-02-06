<template>
	<view class="page">
		<!--  #ifdef H5  -->
		<u-navbar :autoBack='true' :safeAreaInsetTop="true"></u-navbar>
		<view style="height: 80rpx;"></view>
		<!--  #endif -->
		<template v-if="isshowpage">
			<view v-for="(allitem,allindex) in detail" :key="allindex" class="content">
				<view style="font-size: 32rpx;margin: 20rpx 0rpx;font-weight: bold;">
					{{allitem.title}}
				</view>
				<scroll-view scroll-y="true" :style="{ maxHeight: height }">
					<carousel v-if="banner.length > 0" :list="banner[current]" height="400rpx" urlkey="url"
						:dataType="1" :indicatorType="4" :clickType="2" :autoPlay="autoPlay">
					</carousel>
					<!--  #ifdef MP-WEIXIN  -->
					<view class="business">
						<view class="left">
							<view style="margin-left: 22rpx;font-size: 24rpx;">
								<view class="flex alc " style="width: 660rpx;justify-content: space-between;">
									<view>
										<view class="size28 fwb oneLine" style="width: 450rpx;">
											{{allitem.activityTitle}}</view>
										<view class="title" style="font-size: 24rpx;margin-top: 23rpx;">本次活动由
											<text style="color: #d91b1b;"> {{allitem.shopName}}</text>主办
										</view>

									</view>

									<view class="othercount" @click="jumpActivity(allindex)">
										<!-- 				<image style="width: 124rpx;
                     		height: 124rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230224/file_1677231696979.png"
											@click="jumpActivity(allindex)"></image> -->
										去看看
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--  #endif -->
					<!--  #ifdef MP-WEIXIN  -->

					<!-- 		<view class="activity" @click="jumpActivity">
						<view class="left">
							<image class="left-img" :src="detail.aboutCoverPicture" />
							<view style="margin-left: 18rpx">
								<view class="left-title ellipsis" style="max-width: 350rpx">{{ detail.aboutTitle }}
								</view>
								<view class="left-time">活动时间：{{ detail.aboutActivityBeginTime }}</view>
							</view>
						</view>
						<view class="right">
							<view class="right-price1">历史价格</view>
							<view class="right-price2">￥{{ detail.aboutFlashSalePrice }}</view>
						</view>
					</view> -->
					<!--  #endif -->
					<view v-if="allitem.content" class="detail">
						<u-parse :content="allitem.content"></u-parse>
					</view>
					<view class="detail" v-else="allitem.details">
						<view v-for="(item,index) in allitem.details" :key="item.id">
							<view v-if="item.type==1">
								{{item.associatedContent}}
							</view>
							<view v-else-if="item.type==2">
								<image :src="item.associatedContent"></image>
							</view>
						</view>
					</view>
					<view class="comment">
						<view class="all-title">
							<view class="u-flex" style="font-size: 28rpx;">
								<view @click="OnClickTag(1)" :class="{ 'click-type': clicktype == 1 }">
									评论{{allitem.commentNum }}
								</view>
								<view @click="OnClickTag(2)" style="margin-left: 20rpx;"
									:class="{ 'click-type': clicktype == 2 }">
									转发{{ allitem.shareNum }}
								</view>
								<view @click="OnClickTag(3)" style="margin-left: 20rpx;"
									:class="{ 'click-type': clicktype == 3 }">
									点赞{{ allitem.likeNum }}
								</view>
							</view>
							<view class="u-flex alc">
								<view>
									<u-rate activeColor='#FCCA00' inactiveColor='#FCCA00' :readonly='true' count="1"
										v-model="onestar"></u-rate>
								</view>

								<view>{{ allitem.averageGrade }}</view>
							</view>
						</view>
						<!-- 评论 -->
						<view v-if="clicktype == 1" class="item">
							<view v-for="(item, index) in allitem.comments" :key="index"
								@click="Onreply(item,allindex,index)">
								<view v-if="index < morenum" style="padding-bottom: 10rpx;">
									<view class="item-top">
										<view style="display: flex">
											<image v-if="item.headImg" class="top-img" :src="item.headImg" />
											<image v-else class="top-img" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706063549640.png" />
											<text class="top-title">{{ item.userName }}</text>

										</view>
										<view class="top-time">
											<view>
												{{ item.commentTime }}·<text style=" color: #999999">来自
													<text v-if=" item.userIpProvince "> {{item.userIpProvince }}</text>
													<text v-else>未知</text>
												</text>
											</view>

										</view>

									</view>
									<view class="item-bottom" style="margin-left: 96rpx;margin-top: -30rpx;">
										<view class="bottom-content">

											<view style="margin-left: 10rpx;width: 430rpx
	                                         text-overflow: ellipsis;
	                                          overflow: hidden;
	                                          white-space: nowrap;">
												{{ item.content }}


											</view>

										</view>
										<view v-if="item.imglist && item.imglist.length > 0" class="bottom-img-list">
											<image v-for="(imgitem, index) in item.imglist" class="bottom-img"
												:src="imgitem" @click="previewImage(item.imglist, index)" />
										</view>
									</view>
									<view class="u-flex jsb alc">
										<view class="u-flex mt20 alc" style="margin-left: 94rpx;">
											<view>
												<u-rate activeColor='#FCCA00' inactiveColor='#FCCA00' :readonly='true'
													count="1" v-model="onestar"></u-rate>
											</view>
											<view>
												{{ item.grade }}
											</view>
										</view>
										<view v-if="item.userId == userId&&item.commentId"
											@click.stop="delComments(item.commentId)"
											style="color: #d91b1b; margin-top: 16rpx; font-size: 28rpx">删除</view>
									</view>

									<view style="margin-top: 20rpx;" v-for="(item1, index) in item.replyVOS">
										<view class="item-top">
											<view style="display: flex;margin-left: 96rpx">
												<image v-if="item1.headImg" class="top-img-small"
													:src="item1.headImg" />
												<image class="top-img-small" v-else
													src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706063549640.png"></image>
												<text class="top-title"
													style="font-size: 24rpx;font-weight: 600;">{{ item1.userName }}</text>
												<text
													style="font-size: 20rpx; color: #999999; margin-left: 10rpx;margin-top: 6rpx">来自{{
                          item1.userIpProvince }}</text>
											</view>
											<view class="top-time">
												<view>
													{{ item1.commentTime }}
												</view>
											</view>
										</view>
										<view style="margin-left: 176rpx;margin-top: -30rpx;">
											{{ item1.content }}
										</view>
									</view>
								</view>
							</view>
							<view @click="OnMore(1)" v-if="allitem.comments.length > 5 && morenum == 5"
								style="align-items: center;margin-top: 20rpx;color:#999999;text-align: center;display: flex;justify-content: center;">
								<view>展开更多</view>
								<view>
									<u-icon name="arrow-down"></u-icon>
								</view>
							</view>
						</view>
						<!-- 转发 -->
						<view v-if="clicktype == 2" style="margin-top: 20rpx;">
							<view v-for="(item, index) in allitem.shares" :key="index">
								<view v-if="index < morenum" class="tabItemBox">
									<view class="u-flex">
										<view>
											<image class="top-img" :src="item.headImg" />
										</view>
										<view style="font-size: 28rpx;font-weight: bold;margin-left: 10rpx;">
											{{ item.userName }}
										</view>
										<view
											style="font-size: 20rpx;color: #999999;margin-left: 20rpx;;margin-top: 6rpx">
											来自<text v-if="item.userIpProvince">{{ item.userIpProvince }}</text>
											<text v-else>未知</text>
										</view>
									</view>
									<view style="font-size: 24rpx;color: #999999;font-weight: bold;">
										{{ item.commentTime }}
									</view>
								</view>
							</view>
							<view @click="OnMore(2)" v-if="allitem.shares.length > 5 && morenum == 5"
								style="align-items: center;margin-top: 20rpx;color:#999999;text-align: center;display: flex;justify-content: center;">
								<view>展开更多</view>
								<view>
									<u-icon name="arrow-down"></u-icon>
								</view>
							</view>
						</view>
						<!-- 点赞 -->
						<view v-if="clicktype == 3" style="margin-top: 20rpx;">
							<view v-for="(item, index) in allitem.likes" :key="index">
								<view v-if="index < morenum" class="tabItemBox">
									<view class="u-flex" style="align-items: center;">
										<view>
											<image class="top-img" :src="item.headImg" />
										</view>
										<view style="font-size: 28rpx;font-weight: bold;margin-left: 10rpx;">
											{{ item.userName }}
										</view>
										<view
											style="font-size: 20rpx;color: #999999;margin-left: 20rpx;margin-top: 6rpx">
											来自<text v-if="item.userIpProvince">{{ item.userIpProvince }}</text>
											<text v-else>未知</text>
										</view>
									</view>
									<view style="font-size: 24rpx;color: #999999;font-weight: bold;">
										{{ item.commentTime }}
									</view>
								</view>
							</view>
							<view @click="OnMore(3)" v-if="allitem.shares.length > 5 && morenum == 5"
								style="align-items: center;margin-top: 20rpx;color:#99999;text-align: center;display: flex;justify-content: center;">
								<view>展开更多</view>
								<view>
									<u-icon name="arrow-down"></u-icon>
								</view>
							</view>
						</view>
					</view>
					<!--  #ifdef MP-WEIXIN  -->
					<view class="bottom-btn">
						<view class="view" :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
							<view style="display: flex; flex-direction: row">
								<view style="text-align: center; width: 85rpx" @click="submitLike(allitem,allindex)">
									<view style="height: 42rpx">
										<image v-if="allitem.isLike === 2" src="@/static/image/weidianzanbig.png"
											style="width: 44rpx; height: 38rpx"></image>
										<image v-if="allitem.isLike === 1" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059901925.png"
											style="width: 44rpx; height: 38rpx"></image>
									</view>
									<view class="text" style="margin-top: 10rpx">
										{{ allitem.likeNum }}
									</view>
								</view>
								<view style="text-align: center; width: 85rpx; margin-left: 10rpx"
									@click="openComment(allitem,allindex)">
									<view style="height: 42rpx">
										<image src="@/static/image/pinglunbig.png" style="width: 44rpx; height: 40rpx">
										</image>
									</view>
									<view class="text" style="margin-top: 10rpx"> {{ allitem.commentNum }} </view>
								</view>
								<view style="text-align: center; width: 85rpx; margin-left: 10rpx"
									@click="OnShare(allindex)">
									<view style="height: 42rpx">
										<image src="@/static/image/fenxiangbig.png" style="width: 41rpx; height: 41rpx">
										</image>
									</view>
									<view class="text" style="margin-top: 10rpx">{{ allitem.shareNum }} </view>
								</view>
							</view>
							<view class="signup" @click="openAppoint(allindex)">
								<text>我要预约</text>
							</view>
						</view>
						<!-- <view class="safe-bottom-height"></view> -->
					</view>
					<!--  #endif -->
					<!--   <view class="lookWonderf" @click="lookWonderf">点击查看更多精彩活动》</view>
          <view style="height: 10rpx"></view> -->
				</scroll-view>

			</view>
			<!--  #ifdef MP-WEIXIN  -->
			<view @click="OnPushNext" class="mt20 mb2">

				<view style="font-size: 24rpx;color: #999999;text-align: center;">
					点击查看下一篇
				</view>
				<view style="text-align: center;margin-top: 37rpx;">
					<image style="width: 38rpx;height: 47rpx;" src="@/static/image/jiazai.gif"></image>
				</view>
			</view>
			<!--  #endif -->
			<view style="height: 50rpx"> </view>
			<!-- <view style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-between;
                    margin: 0rpx 20rpx;
                  ">
        <view v-for="(item, index) in playbackList" :key="index" style="margin-top: 40rpx"
          @click="OnPushreviewDetail(item)" :class="{ margintop0: index == 0 || index == 1 }"
          v-if="id != item.marvellousId">
          <view v-if="item.coverPicture" style="position: relative">
            <image :mode="mode" :src="item.coverPicture" style="border-radius: 10rpx; width: 345rpx; height: 460rpx">
            </image>
            <view style="position: absolute; top: 14rpx; left: 14rpx">
              <image src="@/static/image/bofang.png" style="width: 40rpx; height: 40rpx"></image>
            </view>
          </view>
          <view v-else>
            <image :mode="mode" :src="item.img" style="border-radius: 10rpx; width: 345rpx; height: 460rpx">
            </image>
          </view>
          <view class="playback-title">
            {{ item.title }}
          </view>
        </view>
      </view> 
      <view v-if="isLoadMore" style="
                    font-size: 24rpx;
                    color: #999999;
                    text-align: center;
                    margin-top: 80rpx;
                    margin-bottom: 80rpx;
                  ">
        我到底啦~
      </view>
      <view style="height: 200rpx"> </view>-->

			<view>
				<u-popup :show="appointVisble" @close="appointVisble = false" mode="bottom">
					<view class="appoint">
						<text class="appoint-title" style="margin-bottom: 46rpx">客户参与活动时间意愿调查（可多选）</text>
						<view class="appoint-btn-view">
							<view v-for="(item, i) in appointList" class="appoint-btn" @click="clickAppoint(i)" :style="{
                color: item.ischecked ? '#D91B1B' : '#222222',
                background: item.ischecked ? '#FFF1F1' : '#F8F8F8',
              }">
								<text class="appoint-btn-text">{{ item.name }}</text>
							</view>
						</view>
						<view style="display: flex; justify-content: center">
							<view class="appoint-submit" @click="submitAppoint()">提交</view>
						</view>
					</view>
				</u-popup>
			</view>
			<view>
				<u-popup :show="shareVisble" @close="shareVisble = false" mode="bottom">
					<view></view>
					<view class="share">
						<view class="share-title" style="margin-bottom: 60rpx; margin-left: 58rpx">分享到</view>
						<view class="share-img-list" style="position: relative">
							<image class="share-img" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061132637.png">
								<button open-type="share" style="
                                opacity: 0;
                                position: absolute;
                                width: 127rpx;
                                height: 126rpx;
                              "></button>
							</image>
						</view>
					</view>
				</u-popup>
			</view>
			<view>
				<u-popup :show="commentVisble" @close="commentVisble = false" mode="bottom">
					<view class="comment-popup">
						<view v-if="commenttype == 1"
							style="text-align: center;font-size: 28rpx;color: #999999;margin-top: 20rpx;margin-bottom: 20rpx;">
							请您对本次活动进行评分
						</view>
						<view v-if="commenttype == 1" style="margin-bottom: 20rpx;">
							<u-rate activeColor='#FCCA00' inactiveColor='#FCCA00' :allowHalf='true' count="5"
								v-model="grade"></u-rate>
						</view>
						<textarea class="textarea" v-model="commentInfo.content" :placeholder="placeholder"
							@focus="focusText" @blur="blurText" :maxlength="500" :adjust-position="false"></textarea>
						<view v-if="commenttype == 1" style="margin-top: 22rpx">
							<u-upload :fileList="commentInfo.fileList" @afterRead="afterRead" @delete="deletePic"
								:multiple="true" :maxCount="5" style="width: 160rpx; height: 160rpx"></u-upload>
						</view>
						<view v-if="commenttype == 1" style="color: #d91b1b;font-size: 24rpx;">
							带图评论可额外获得10积分
						</view>
						<view class="btn-div">
							<view class="btn btn-color1" @click="commentVisble = false">取消</view>
							<view class="btn btn-color2" style="margin-left: 75rpx" @click="submitComment">{{bottombtn}}
							</view>
						</view>
						<view :style="{ height: keywordHeight }"></view>
					</view>
				</u-popup>
			</view>
		</template>
		<u-toast ref="uToast"></u-toast>
		<request-loading></request-loading>
		<view>
			<cardauthentication :showpop='showpop'></cardauthentication>
		</view>
	</view>
</template>

<script>
	import cardauthentication from '@/components/cardauthentication.vue'
import carousel from "@/components/carousel/index.vue"
import {
getstorage,
tologin
} from '@/utils/index.js'
	export default {
		components: {
			carousel,
			cardauthentication
		},
		onShareAppMessage(res) {
			this.submitShare(2)
			if (res.from == 'menu') {
				this.currentindex = 0
			}
			let title = this.detail[this.currentindex].title
			let imageUrl = this.detail[this.currentindex].appletsSharePic ? this.detail[this.currentindex]
				.appletsSharePic : this
				.detail[this.currentindex].coverImg
			return {
				title,
				path: `/pages/home/wonderfulReview/detail?id=` + this.id + '&enter=117',
				imageUrl,
				success(res) {
					uni.showToast({
						title: '分享朋友成功'
					})
				},
				fail(res) {
					//console.log('fail(res)==', res);
					uni.showToast({
						title: '分享朋友失败',
						icon: 'none'
					})
				}
			};
		},
		onShareTimeline(res) { //分享到朋友圈
			this.submitShare(1)
			if (res.from == 'menu') {
				this.currentindex = 0
			}
			return {
				title: this.detail[this.currentindex].title,
				path: `/pages/home/wonderfulReview/detail?id=` + this.id + '&enter=117',
				imageUrl: this.detail[this.currentindex].appletsSharePic ? this.detail[this.currentindex].appletsSharePic :
					this
					.detail[this.currentindex].coverImg,
				success(res) {
					//console.log('success(res)==', res);
					uni.showToast({
						title: '分享朋友圈成功'
					})
				},
				fail(res) {
					uni.showToast({
						title: '分享朋友圈失败',
						icon: 'none'
					})
				}
			}
		},
		computed: {

		},
		data() {
			return {
				showpop: false,
				bottombtn: '提交评论',
				placeholder: '请输入评价内容（20字以上可获得10积分',
				morenum: 5,
				clicktype: 1,
				onestar: 1,
				grade: 5,
				autoPlay: false,
				mode: 'aspectFill',
				current: 0,
				isshowpage: false,
				userId: '',
				id: '',
				commentList: [],
				shareVisble: false,
				appointVisble: false,
				commentVisble: false,
				commentInfo: {
					content: '',
					fileList: []
				},
				appointList: [{
					id: 1,
					name: '周末',
					ischecked: false
				}, {
					id: 2,
					name: '节假日',
					ischecked: false
				}, {
					id: 3,
					name: '晚上',
					ischecked: false
				}, {
					id: 4,
					name: '都可以',
					ischecked: false
				}],
				detail: [],
				banner: [],
				bannercurrent: 0,
				keywordHeight: '0rpx',
				safeHeight: 0,
				isSubmit: false,
				isLoadMore: false,
				playbackList: [],
				commenttype: '',
				commentid: '',
				replyid: '',
				nextid: '',
				nextMarvellousId: '',
				replyindex: '',
				commentindex: 0,
				currentindex: 0
			}
		},
		onLoad(option) {
			// uni.removeStorageSync('enter');
			if (option.enter) {
				uni.setStorageSync('enter', option.enter);
			}
			this.id = option.id
			this.queryDetail(option.id)
			this.userId = getstorage("userId")
			let _this = this
			uni.$on('closepop', res => {
				_this.showpop = false
			})
		},
		onReady() {
			uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
				this.safeHeight = data.height
			}).exec()
		},
		// onReachBottom() {
		// 	this.current++
		// 	this.queryDetail(this.nextMarvellousId)
		// },
		methods: {
			OnPushNext() {
				this.current++
				this.queryDetail(this.nextMarvellousId)
			},
			OnMore() {
				this.morenum = 999999
			},
			OnClickTag(index) {
				this.clicktype = index
				this.morenum = 5
			},
			OnPushreviewDetail(item) {
				uni.navigateTo({
					url: '/pages/home/wonderfulReview/detail?id=' + item.marvellousId
				})
			},

			delComments(id) {
				let _this = this
				this.$request.post('/coc-active/api/v1/comments/delComments', {
					id: id
				}).then(res => {
					if (res.code == 200) {
						this.$refs.uToast.show({
							message: '删除成功',
							type: "success",
							// complete() {
							//   _this.queryDetail(_this.id)
							// }
						});
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			//点击轮播图
			clickswiper(index) {
				let url = this.banner[index].jumpUrl
				if (!url) {
					return false
				}
				uni.navigateTo({
					url: '/pages/home/webview?url=' + url
				})
			},
			//跳转关联活动
			jumpActivity(index) {
				// if (this.detail[this.current].aboutActivityUpDown == 0) {
				//   uni.showToast({
				//     icon: 'none',
				//     title: '该活动已下架',
				//   });
				//   return false
				// } else {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + this.detail[index].activityId
				})
				// }

			},
			//预约初始化
			appointInit() {
				this.appointList = [{
					id: 1,
					name: '周末',
					ischecked: false
				}, {
					id: 2,
					name: '节假日',
					ischecked: false
				}, {
					id: 3,
					name: '晚上',
					ischecked: false
				}, {
					id: 4,
					name: '都可以',
					ischecked: false
				}]
			},
			//打开预约
			openAppoint(allindex) {
				if (tologin() !== true) {
					return
				}
				this.currentindex = allindex
				this.appointInit()
				this.appointVisble = true
			},
			OnShare(index) {
				this.currentindex = index
				this.shareVisble = true

			},
			//选择预约选项
			clickAppoint(index) {
				this.appointList[index].ischecked = !this.appointList[index].ischecked
			},
			//提交预约
			submitAppoint() {
				if (tologin() !== true) {
					return
				}
				let time = []
				this.appointList.map(m => {
					if (m.ischecked) {
						time.push(m.id)
					}
				})
				if (time.length === 0) {
					uni.showToast({
						title: '请选择预约时间',
						icon: 'none',
						duration: 2000
					})
					return
				}
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/appointment", {
					activityId: this.detail[this.currentindex].activityId,
					time
				}).then(res => {
					if (res.code == 200) {
						this.appointVisble = false
						uni.showToast({
							title: '预约成功',
							icon: 'success',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				}).catch(err => {

				})
			},
			//查看详情
			queryDetail(id) {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/getDetails", {
					id: id
				}).then(res => {
					this.nextMarvellousId = res.data.nextMarvellousId
					let data = res.data
					let bannerlist = []
					if (data.imgs && data.imgs.length > 0) {
						let imglist = data.imgs.split(',')
						imglist.forEach(img => {
							bannerlist.push({
								url: img,
								type: 'image'
							})
						})
					}
					if (data.videos) {
						bannerlist.unshift({
							url: data.videos,
							type: 'video'
						})
						this.autoPlay = false
					} else {
						this.autoPlay = true
					}
					this.banner[this.current] = bannerlist
					this.detail[this.current] = data
					// 评论
					data.comments.forEach(m => {
						if (m.imgs && m.imgs.length > 0) {
							let list = m.imgs.split(',')
							m.imglist = list
						}
					})
					this.commentList[this.current] = data.comments
					// if (this.current == 0) {
					// 	this.current = 1
					// 	this.queryDetail(res.data.nextMarvellousId)
					// }
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			//点赞
			submitLike(row, index) {
				if (tologin() !== true) {
					return
				}
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/like", {
					id: row.id
				}).then(res => {

					if (res.code == 200) {
						this.detail[index].isLike = this.detail[index].isLike === 1 ? 2 : 1
						if (this.detail[index].isLike === 1) {
							this.detail[index].likeNum += 1
						} else {
							this.detail[index].likeNum -= 1
						}
						this.$forceUpdate()
						uni.showToast({
							title: '操作成功',
							icon: 'success',
							duration: 2000
						})
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				})
			},
			Onreply(item, allindex, index) {
				if (tologin() !== true) {
					return
				}
				if (!item.commentId) {
					return false
				}
				this.bottombtn = '回复'
				this.commentindex = allindex
				this.replyindex = index
				this.commenttype = 4
				this.replyid = item.commentId
				this.commentInfo = {
					commentType: '4',
					content: '',
					fileList: [],
				}
				this.placeholder = '请输入回复内容'
				this.commentVisble = true
			},
			//打开评论框
			openComment(row, index) {
				if (tologin() !== true) {
					return
				}
				if (uni.getStorageSync('isCertify') != 1) {
					this.showpop = true
					return false
				}
				uni.requestSubscribeMessage({
					tmplIds: [
						'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
					],
					success(res) {}
				})
				this.bottombtn = '提交评论'
				this.commentindex = index
				this.commentid = row.id
				this.grade = 5
				this.placeholder = '请输入评价内容（20字以上可获得10积分)'
				this.commentVisble = true
				this.commenttype = 1
				this.commentInfo = {
					commentType: '3',
					content: '',
					fileList: [],
				}
			},
			//评论
			submitComment() {

				if (tologin() !== true) {
					return
				}
				if (this.isSubmit) {
					return
				}
				if (!this.commentInfo.content || this.commentInfo.content.trim().length === 0) {
					uni.showToast({
						title: '请输入内容',
						icon: 'none',
						duration: 2000
					})
					return
				}

				let imgs = [],
					uploadsuccess = true
				this.commentInfo.fileList.forEach(m => {
					imgs.push(m.url)
					if (m.status === 'uploading') {
						uploadsuccess = false
					}
				})
				if (!uploadsuccess) {
					uni.showToast({
						title: '图片正在上传中',
						icon: 'none',
						duration: 2000
					})
					return
				}
				let id = ''
				if (this.commenttype == 1) {
					id = this.commentid
				} else {
					this.grade = null
					imgs = null
					id = this.replyid
				}
				this.isSubmit = true
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/comment", {
					id: id,
					content: this.commentInfo.content,
					imgs,
					grade: this.grade,
					commentType: this.commentInfo.commentType
				}).then(res => {
					if (res.code == 200) {
						let fileList = []
						this.commentInfo.fileList.filter(s => {
							fileList.push(s.url)
						})
						if (this.commenttype == 1) {
							this.detail[this.commentindex].comments.push({
								commentTime: '刚刚',
								content: this.commentInfo.content,
								grade: this.grade,
								headImg: getstorage('headImg'),
								imglist: fileList,
								replyVOS: [],
								userId: getstorage('userId'),
								userIpProvince: '未知',
								userName: getstorage('realName'),
								commentId: ''
							})
							this.detail[this.commentindex].commentNum = this.detail[this.commentindex].commentNum +
								1
						} else {
							this.detail[this.commentindex].comments[this.replyindex].replyVOS.push({
								commentId: '',
								commentTime: '刚刚',
								content: this.commentInfo.content,
								headImg: getstorage('headImg'),
								userIpProvince: '未知',
								userName: getstorage('realName'),
							})
						}


						this.commentVisble = false
						uni.showToast({
							title: '评论成功',
							icon: 'success',
							duration: 2000
						})
						this.queryDetail(this.id)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							duration: 2000
						})
					}
				}).finally(res => {
					this.isSubmit = false
				})
			},
			//分享
			submitShare(shareType) {
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/share_v2", {
					relId: this.id,
					shareType,
					type: 3
				}).then(res => {

				})
			},
			// 删除图片
			deletePic(event) {
				this.commentInfo.fileList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				let lists = [].concat(event.file)
				lists.map((item, i) => {
					this.commentInfo.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中',
						uploadstatus: false
					})
				})
				for (let i = 0; i < this.commentInfo.fileList.length; i++) {
					let data = this.commentInfo.fileList[i]
					if (data.status === 'uploading' && !this.commentInfo.fileList[i].uploadstatus) {
						this.commentInfo.fileList[i].uploadstatus = true
						const result = await this.uploadFilePromise(data.url)
						this.commentInfo.fileList[i].url = result
						this.commentInfo.fileList[i].status = 'success'
						this.commentInfo.fileList[i].message = ''
					}
				}
			},
			//上传图片
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: getApp().globalData.uploadUrl,
						filePath: url,
						name: 'file',
						formData: {
							'file': url
						},
						header: {
							"Content-Type": 'multipart/form-data'
						},
						success: (uploadFileRes) => {
							resolve(JSON.parse(uploadFileRes.data).data)
						}
					});
				})
			},
			//预览图片
			previewImage(urllist, index) {
				uni.previewImage({
					urls: urllist,
					current: index
				})
			},
			//评论输入框键盘获取焦点
			focusText(event) {
				this.keywordHeight = (event.detail.height + 20 - 50) + 'rpx'
			},
			//评论输入框键盘失去焦点
			blurText() {
				this.keywordHeight = '0rpx'
			}
		},
	}
</script>

<style lang="scss" scoped>
	.safe-bottom-height {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.content {
		padding: 20rpx 25rpx 0 25rpx;
	}

	.indicator {
		@include flex(row);
		justify-content: center;

		&__dot {
			height: 6px;
			width: 6px;
			border-radius: 100px;
			background-color: #666666;
			margin: 0 5px;
			transition: background-color 0.3s;

			&--active {
				background-color: #222222;
			}
		}
	}

	.business {
		background-color: #ffffff;
		border-radius: 10rpx;
		padding: 24rpx;
		display: flex;
		justify-content: space-between;
		margin-top: 24rpx;

		.left {
			display: flex;
			align-items: center;
			width: 100%;
		}

		.img {
			width: 84rpx;
			height: 84rpx;
			border-radius: 50%;
		}

		.title {
			font-size: 36rpx;
			font-weight: bold;
			color: #222222;
		}

		.othercount {
			width: 100rpx;
			height: 44rpx;
			border-radius: 22rpx;
			font-size: 24rpx;
			color: #D91B1B;
			line-height: 44rpx;
			text-align: center;
			border: 1rpx solid #D91B1B;
			margin-right: 17rpx;
		}
	}

	.activity {
		height: 140rpx;
		background: #ffffff;
		border-radius: 10rpx;
		margin-top: 35rpx;
		padding: 0 25rpx 0 9rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;
		}

		.left-img {
			width: 120rpx;
			height: 120rpx;
			border-radius: 10rpx;
		}

		.left-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #222222;
		}

		.left-time {
			font-size: 24rpx;
			font-weight: 500;
			color: #222222;
			margin-top: 5rpx;
		}

		.right {}

		.right-price1 {
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
			text-align: right;
		}

		.right-price2 {
			font-size: 36rpx;
			font-weight: bold;
			color: #d91b1b;
			text-align: right;
			margin-top: 20rpx;
		}
	}

	.detail {
		background: #ffffff;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 24rpx;
	}

	.comment {
		margin-top: 33rpx;

		.title {
			font-size: 28rpx;
			font-weight: bold;
			color: #222222;
		}

		.item-list {
			padding: 0 20rpx 32rpx 28rpx;
			background: #ffffff;
			border-radius: 10rpx;
		}

		.item {
			padding: 25rpx 0 32rpx 0;
			border-bottom: 1px solid #dedede;
		}

		.item-top {
			display: flex;
			justify-content: space-between;
		}

		.top-title {
			font-size: 28rpx;
			font-weight: bold;
			color: #222222;
			margin-left: 21rpx;
		}

		.top-time {
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
			margin-right: 30rpx;
			text-align: right;
		}

		.item-bottom {}

		.bottom-content {
			font-size: 28rpx;
			color: #222222;
			display: flex;
		}

		.bottom-img-list {
			margin-top: 26rpx;
			display: inline-block;
			margin-bottom: -30rpx;
		}

		.bottom-img {
			width: 205rpx;
			height: 205rpx;
			border-radius: 10rpx;
			margin-right: 28rpx;
			float: left;
			margin-bottom: 20rpx;
		}
	}

	.bottom-btn {
		border-bottom: 1rpx #e7e7e7 solid;
		background-color: #ffffff;
		width: 100%;
		padding-top: 27rpx;
		margin-top: 10px;

		.view {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			padding: 0 25rpx 0 0;
		}

		.btn {
			background-color: #ffffff;
			border-radius: 10rpx;
			display: flex;
			padding: 20rpx;
		}

		.signup {
			background-color: #d91b1b;
			border-radius: 35rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			width: 360rpx;
			height: 70rpx;
			align-self: center;

			text {
				text-align: center;
				font-weight: bold;
				color: #ffffff;
				font-size: 28rpx;
			}
		}

		.text {
			font-size: 24rpx;
			font-weight: 500;
			color: #222222;
		}
	}

	.appoint {
		padding: 42rpx 50rpx 50rpx 50rpx;
	}

	.appoint-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #222222;
		display: inline-block;
	}

	.appoint-btn-view {
		width: 100%;
		height: 60rpx;
		display: inline-block;
	}

	.appoint-btn {
		width: 150rpx;
		height: 60rpx;
		border-radius: 10rpx;
		float: left;
		margin-right: 12rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.appoint-btn-text {
		font-size: 24rpx;
		font-weight: 500;
	}

	.appoint-submit {
		width: 200rpx;
		height: 60rpx;
		background: #d91b1b;
		border-radius: 10rpx;
		margin-top: 48rpx;
		text-align: center;
		line-height: 60rpx;
		color: #ffffff;
	}

	.share {
		padding: 53rpx 0 76rpx 0;
	}

	.share-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #222222;
	}

	.share-img-list {
		display: flex;
		justify-content: center;
	}

	.share-img {
		width: 126rpx;
		height: 127rpx;
	}

	.comment-popup {
		padding: 28rpx 26rpx 50rpx 24rpx;

		.textarea {
			background-color: #f8f8f8;
			width: calc(100% - 54rpx);
			height: 200rpx;
			border-radius: 10rpx;
			font-size: 24rpx;
			font-weight: 500;
			color: #999999;
			padding: 32rpx 27rpx 32rpx 27rpx;
		}

		.btn-div {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 65rpx;
		}

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-weight: bold;
			width: 200rpx;
			height: 60rpx;
		}

		.btn-color1 {
			background: #f8f8f8;
			color: #222222;
		}

		.btn-color2 {
			background: #d91b1b;
			color: #ffffff;
		}
	}

	.ellipsis {
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	::v-deep .u-upload__wrap__preview {
		margin: 0 15rpx 16rpx 0 !important;
	}

	.margintop0 {
		margin-top: 0rpx !important;
	}

	.playback-title {
		margin-top: 32rpx;
		margin-left: 9rpx;
		font-size: 28rpx;
		width: 306rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* 这里是超出几行省略 */

	}

	.all-title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.click-type {
		color: #d91b1b;
	}

	.top-img {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.top-img-small {
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
	}

	.tabItemBox {
		padding: 10rpx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx #dadada solid;
		align-items: center;
	}
</style>
