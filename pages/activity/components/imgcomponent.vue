<template>
	<view class="page">
		<view>
		<view style="margin: 25rpx;">
			<u-swiper
			@click="OnWatchImg"
			           :list="dataList.article.imgarr"
			        height='350'
					imgMode='aspectFit'
			   ></u-swiper>
		</view>
		
			<view class="u-flex"
				style="align-items: center;margin: 27rpx;margin-top: 0rpx;justify-content: space-between;position: relative;top: 40rpx;">
				<view class="u-flex" style="align-items: center;" @click="Onpushuserinfo">
					<view>
						<u-avatar size="50" :src="dataList.article.headImg"></u-avatar>
					</view>
					<view style="margin-left: 20rpx;">
						<view style="font-size: 32rpx;font-weight: bold;">
							{{ dataList.article.name }}<text
								style="font-size: 24rpx;color: #999999;margin-left: 20rpx;">来自{{ dataList.article.userIpProvince }}</text>
						</view>
						<view style="font-size: 24rpx;margin-top: 10rpx;">
							{{ gettiem(dataList.article.time) }}
							<!-- {{dataList.article.createdAt}} -->
						</view>
					</view>
				</view>
				<view v-if="dataList.article.userId == userId" @click="Onshowsheet">
					<u-icon size="24" :bold='true' name="more-dot-fill"></u-icon>
				</view>
				<view v-else>
					<view class="btn-follow" :class="{'bgGray-new':dataList.article.followType==1}" @click="Onfollow">
						<text v-if='dataList.article.followType==1'>已关注</text>
							<text v-else>关注</text>
					</view>
				</view>
			</view>
			<view style="font-size: 32rpx;font-weight: bold;margin: 27rpx;margin-top: 80rpx;">
				{{ dataList.article.title }}
			</view>
			<view style="font-size: 28rpx;margin: 27rpx;margin-top: 20rpx;word-break:break-all">
			{{ dataList.article.content }}

			</view>
	
			<view v-if="dataList.expertShopSelection" style="margin: 25rpx;">
				<!-- 关联活动 -->
				<view v-if="dataList.expertShopSelection.type==1" class="kapian" @click="OnPushActivity">
					<view style="position: relative;">
						<image style="border-radius: 10rpx;width: 256rpx;height: 146rpx;"
							:src="dataList.expertShopSelection.coverPicture"></image>
						<view style="position: absolute;left:0rpx;bottom: 0rpx;">
							<image style="width: 44rpx;height: 20rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230504/file_1683184347325.png">
							</image>
						</view>
					</view>
					<view style="margin-left: 13rpx;">
						<view class="moreLine size28 fwb" style="width: 415rpx;">
							{{dataList.expertShopSelection.relatedName}}
						</view>
						<view class="u-flex jsb alc">
							<view>
								<text class="mainRed size28">￥</text>
								<text class="mainRed fwb"
									style="font-size: 40rpx;">{{dataList.expertShopSelection.flashSalePrice}}</text>
								<text class="size24 txtLighGray txtls"
									style="margin-left: 14rpx;">原价￥{{dataList.expertShopSelection.marketPrice}}</text>
							</view>
							<view class="baoming">报名</view>
						</view>
					</view>
				</view>
				<!-- 关联团购 -->
				<view v-if="dataList.expertShopSelection.type==4" class="kapian" @click="OnPushGroup">
					<view style="position: relative;">
						<image style="border-radius: 10rpx;width: 146rpx;height: 146rpx;"
							:src="dataList.expertShopSelection.coverPicture"></image>
						<view style="position: absolute;left:0rpx;bottom: 0rpx;">
							<image style="width: 44rpx;height: 20rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230504/file_1683184347325.png">
							</image>
						</view>
					</view>
					<view style="margin-left: 13rpx;">
						<view class="moreLine size28 fwb" style="width: 495rpx;">
							{{dataList.expertShopSelection.relatedName}}
						</view>
						<view class="u-flex jsb alc">
							<view>
								<text class="mainRed size28">￥</text>
								<text class="mainRed fwb"
									style="font-size: 40rpx;">{{dataList.expertShopSelection.bankCardPrice?dataList.expertShopSelection.bankCardPrice:dataList.expertShopSelection.flashSalePrice}}</text>
								<text class="size24 txtLighGray txtls"
									style="margin-left: 14rpx;">原价￥{{dataList.expertShopSelection.marketPrice}}</text>
							</view>
							<view class="baoming">抢购</view>
						</view>
					</view>
				</view>
				<!-- 救援卡 -->
				<view v-if="dataList.expertShopSelection.type==3" class="kapian jsb" @click="OnPushrodehelp">
					<view style="position: relative;">
						<image style="border-radius: 10rpx;width: 146rpx;height: 146rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692772397681.png"></image>
						<view style="position: absolute;left:0rpx;bottom: 0rpx;">
							<image style="width: 44rpx;height: 20rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230504/file_1683184347325.png">
							</image>
						</view>
					</view>
					<view style="margin-left: 13rpx;">
						<view class="moreLine size28 fwb" style="width: 495rpx;">
							{{dataList.expertShopSelection.relatedName}}
						</view>
						<view class="u-flex jsb alc">
							<view>
								<text class="mainRed size28">￥</text>
								<text class="mainRed fwb"
									style="font-size: 40rpx;">{{dataList.expertShopSelection.bankCardPrice?dataList.expertShopSelection.bankCardPrice:dataList.expertShopSelection.flashSalePrice}}</text>
								<text class="size24 txtLighGray txtls"
									style="margin-left: 14rpx;">原价￥{{dataList.expertShopSelection.marketPrice}}</text>
							</view>
							<view class="baoming">抢购</view>
						</view>
					</view>
						</view>
					<!-- 关联保养套餐 -->
					<view v-if="dataList.expertShopSelection.type==2" class="kapian" @click="OnPushupkeep">
						<view style="position: relative;">
							<image style="border-radius: 10rpx;width: 256rpx;height: 146rpx;"
								:src="dataList.expertShopSelection.coverPicture"></image>
							<view style="position: absolute;left:0rpx;bottom: 0rpx;">
								<image style="width: 44rpx;height: 20rpx;"
									src="https://oss.dcqcjlb.com/51che_java_dev/20230504/file_1683184347325.png">
								</image>
							</view>
						</view>
						<view style="margin-left: 13rpx;">
							<view class="moreLine size28 fwb" style="width: 415rpx;">
								{{dataList.expertShopSelection.relatedName}}
							</view>
							<view class="u-flex jsb alc">
								<view>
									<text class="mainRed size28">￥</text>
									<text class="mainRed fwb"
										style="font-size: 40rpx;">{{dataList.expertShopSelection.bankCardPrice?dataList.expertShopSelection.bankCardPrice:dataList.expertShopSelection.flashSalePrice}}</text>
									<text class="size24 txtLighGray txtls"
										style="margin-left: 14rpx;">原价￥{{dataList.expertShopSelection.marketPrice}}</text>
								</view>
								<view class="baoming">购买</view>
							</view>
						</view>
						</view>
				<!-- 关联单品套餐 -->
				<view v-if="dataList.expertShopSelection.type==5" class="kapian" @click="OnPushuppackage">
					<view style="position: relative;">
						<image style="border-radius: 10rpx;width: 256rpx;height: 146rpx;"
							:src="dataList.expertShopSelection.coverPicture"></image>
						<view style="position: absolute;left:0rpx;bottom: 0rpx;">
							<image style="width: 44rpx;height: 20rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230504/file_1683184347325.png">
							</image>
						</view>
					</view>
					<view style="margin-left: 13rpx;">
						<view class="moreLine size28 fwb" style="width: 415rpx;">
							{{dataList.expertShopSelection.relatedName}}
						</view>
						<view class="u-flex jsb alc">
							<view>
								<text class="mainRed size28">￥</text>
								<text class="mainRed fwb"
									style="font-size: 40rpx;">{{dataList.expertShopSelection.bankCardPrice?dataList.expertShopSelection.bankCardPrice:dataList.expertShopSelection.flashSalePrice}}</text>
								<text class="size24 txtLighGray txtls"
									style="margin-left: 14rpx;">原价￥{{dataList.expertShopSelection.marketPrice}}</text>
							</view>
							<view class="baoming">购买</view>
						</view>
					</view>
			
				</view>
			</view>
		
			<view style="margin-top: 40rpx;">
				<u-divider :text="null"></u-divider>
			</view>


			<view style="margin-left: 20rpx;font-size: 24rpx;">
				共{{ dataList.article.commentNum }}条评论
			</view>
			<view class="comment-list">
				<view v-for="(item, index) in dataList.comments" :key="index" @click="Onreply(item)" class="mt20">
					<view v-if="index<3"  class="comment">
						<view class="u-flex">
							<view>
								<u-avatar :src="item.headImg" size="30"></u-avatar>
							</view>
							<view style="margin-left: 20rpx;">
								<view
									style="font-size: 28rpx;font-weight: bold;width: 500rpx;display: flex;align-items: center;">
									<view>{{ item.userName }}</view>
									<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
										来自{{ item.userIpProvince }}</view>
								</view>
								<view style="font-size: 28rpx;width: 500rpx;margin-top: 10rpx;">{{ item.content }}
								</view>
								<view @click.stop="OnOpenImg(item.imgs)" v-if="item.imgs"
									style="display: flex;font-size: 24rpx;color: #D91B1B;margin-top: 16rpx;align-items: center;">
									<view style="margin-top: 2rpx;">
										<u-icon color="#D91B1B" name="photo"></u-icon>
									</view>
									<view>查看图片</view>
								</view>
							</view>
						</view>
						<view
							style="font-size: 20rpx;color: #999999;width: 100rpx;margin-top: 16rpx;text-align: right;margin-right: 24rpx;">
							<view>{{item.commentTime}}</view>
							<view v-if="item.userId == userId" @click.stop="delComments(item.commentId)"
								style="color: #D91B1B;margin-top: 16rpx;font-size: 28rpx;">删除</view>
						</view>

					</view>
					<view v-for="(item1,index1) in item.replyVOS" :key="index" style="margin-top: 30rpx;">
						<view class="u-flex" style="align-items: center;">
							<view style="margin-left: 88rpx;">
								<image style="width: 60rpx;height: 60rpx;border-radius: 50%;" :src="item1.headImg">
								</image>
							</view>
							<view style="font-size: 24rpx;font-weight: bold;margin-left: 10rpx;">
								{{item1.userName}}
							</view>
							<view style="font-size: 20rpx;color: #999999;margin-left: 10rpx;">
								来自{{item1.userIpProvince}}
							</view>
						</view>
						<view style="margin-left: 160rpx;">
							{{item1.content}}
						</view>
					</view>
				

				</view>
				<view v-if="dataList.article.commentNum>3" class="txtLighGray size24 tac" @click="OnPushCommentList">
					查看更多评论 >
				</view>
		<!-- 		<view @click="OnMore" v-if="comments.length>5&&morenum==5"
					style="align-items: center;margin-top: 20rpx;color:#999999;text-align: center;display: flex;justify-content: center;">
					<view>展开更多</view>
					<view>
						<u-icon name="arrow-down"></u-icon>
					</view>
				</view> -->
				<view v-if="dataList.comments.length == 0" style="text-align: center;margin-top: 100rpx;">
					<image style="width: 300rpx;height: 164rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230822/file_1692690442686.png">
					</image>
					<view style="font-size: 24rpx;color: #999999;">暂无评论</view>
				</view>
			</view>
			<view style="height: 200rpx"></view>
			<view class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid">
				<view style="justify-content: space-around;display: flex;margin-right:20rpx;align-items: center;">
					<view @click.stop="OnlikeBase()" style="text-align: center;">
						<view>
							<image v-if="dataList.article.likeType == 2" src="@/static/image/weidianzanbig.png"
								style="width: 44rpx;height: 38rpx;">
							</image>
							<image v-else src="@/static/image/yidianzanbig.png" style="width: 44rpx;height: 38rpx;">
							</image>
						</view>
						<view>
							<text>{{dataList.article.likeBaseNum}}</text>
						</view>
					</view>
					<view style="position: relative;top: 2rpx;">
						<view>
							<button class="botton-none" open-type='share'>

								<view style="display: initial;">
									<image src="@/static/image/fenxiangbig.png" style="width: 41rpx;height: 41rpx;">
									</image>
								</view>
							</button>
						</view>
						<view style="text-align: center;position: relative;top: -26rpx;">
							<text>{{dataList.article.shareBaseNum}}</text>
						</view>
					</view>


					<view @click="OnOpencomment" style="width: 420rpx;">
						<u--input :disabled='true' placeholder="说点什么..." suffixIcon="edit-pen" shape='circle'
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</view>
				</view>
			</view>
			<popcomment @submitcomments='submitcomments' @closepopcomment='closepopcomment' :showload='showload'
				:showcomment='showcomment' :chosecomment='chosecomment' :type='1'>
			</popcomment>
		
			<u-popup :safeAreaInsetBottom='false' :show="popimgs" @close="closeimg" mode="center">
				<view>
					<image mode="widthFix" style="width: 650rpx;" :src="imgsbig"></image>
				</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>
			<u-action-sheet @select='OnSelectsheet' @close='showsheet = false' :closeOnClickOverlay="true"
				:actions="list" :show="showsheet"></u-action-sheet>
			<u-loading-page :loading="showload"></u-loading-page>
		</view>
		<request-loading></request-loading>
		<view >
			<cardauthentication @setshowpop='showpop=false' :showpop='showpop'></cardauthentication>
		</view>
	</view>
</template>
<script>
	import cardauthentication from '@/components/cardauthentication.vue'
	import popcomment from '@/components/pop/popcomment.vue'
	import {
		tologin,
		getstorage,

	} from '@/utils/index.js'
	import carousel from "@/components/carousel/index.vue"
	export default {
		components: {
			popcomment,
			carousel,
			cardauthentication
		},
		data() {
			return {
				imgsbig: '',
				morenum: 5,
				isshowpage: false,
				showload: false,
				showsheet: false,
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
				popimgs: false,
				comments: [],
				current: 1,
				name: '',
				imgs: [],
				choseshare: {},
				showshare: false,
				chosecomment: {},
				showcomment: false,
				chosequote: {},
				showquote: false,
				isLoadMore: false,
				tiewen: '',
				showpop: false
			}
		},
		onLoad(option) {
			let _this=this
			
		uni.$on('closepop', res => {
			_this.showpop = false
		})
		},
		props:{
			userId:{
				type: Number,
				default: 0,
			},
			index: {
			  type: Number,
			 default: 0,
			},
			dataList: {
			  type: Object,
			  default() {
			    return {};
			  },
			},
		},
		onShow() {},
		

		methods: {
			Onpushuserinfo(){
				if(this.dataList.article.isExpert==1){
					if(this.dataList.article.expertStatus==1){
							uni.$u.toast('该用户被封禁')
					}else{
						// 达人转跳
						uni.navigateTo({
							url: '/pages/wiseman/component/shopinfo?type=1&userId='+this.dataList.article.userId
						});
					}
				}else{
					// 不是达人的转跳
					uni.navigateTo({
						url: '/pages/wiseman/component/shopinfo?type=2&userId='+this.dataList.article.userId
					});
				}
			},
			Onfollow(){
				this.$request.post("/coc-social/api/v2/article/followExpert",{
					userId:this.dataList.article.userId
				}).then(res=>{
					if(res.code==200){
						uni.$u.toast('操作成功')
						this.$emit("changefollowType",this.index)
					}else{
						uni.$u.toast(res.message)
					}
				})
			},
			OnPushCommentList(){
				uni.navigateTo({
					url: '/pages/wiseman/component/commentlist?id=' +this.dataList.article.id+'&num='+this.dataList.article.commentNum
				})
			},
			submitcomments() {
				let _this = this
				_this.showcomment = false
				uni.$u.toast('评论成功')
				
				this.$emit('sendid',this.dataList.article.id)
			},
		
			OnWatchImg(index) {
				let _this = this
				uni.previewImage({
					current: index,
					urls: _this.dataList.article.imgarr,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
			OnPushshop(){
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + this.dataList.citeDetails.id 
				})
			},
			OnPushrodehelp(){
				uni.navigateTo({
					url: '/pages/roadhelp/index?forwardUserId=' +this.dataList.article.userId
				})
				
			},
			OnPushGroup() {
				uni.navigateTo({
					url: '/pages/grouppurchase/detail?id=' + this.dataList.expertShopSelection.relatedId + '&forwardUserId=' +
						this.dataList.article.userId
				})
			},
			OnPushActivity() {
				uni.navigateTo({
					url: '/pages/home/activityDetail/index?id=' + this.dataList.expertShopSelection.relatedId +
						'&forwardUserId=' + this.dataList.article.userId
				})
			},
			OnPushupcarhelp(){
				uni.navigateTo({
					url: '/pages/roadhelp/index?sourceType=2&forwardUserId=' + this.dataList.article.userId
				})
			},
			OnPushupkeep(){
				uni.navigateTo({
					url: '/pages/carShops/upkeep/detail?id=' + this.dataList.expertShopSelection.relatedId +
						'&forwardUserId=' + this.dataList.article.userId
				})
			},
			OnPushuppackage(){
				uni.navigateTo({
					url:'/pages/activity/activityRegistration/packagedetail?id='+this.dataList.expertShopSelection.relatedId +
						'&forwardUserId=' + this.dataList.article.userId
				})
			},
			submitShare(shareType) {
				this.$newrequest.post("/coc-active/api/v1/marvellous_activity/share_v2", {
					relId: this.id,
					shareType,
					type: 2
				}).then(res => {
					if (res.code == 200) {
						this.dataList.article.shareBaseNum = this.dataList.article.shareBaseNum + 1
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
						});
					}
				})
			},
			OnMore() {
				this.morenum = 999999
			},
			closeimg() {
				this.popimgs = false
			},
			OnSelectsheet(e) {
				let _this=this
				if (e.name == "贴文删除") {
					this.$request.post('/coc-social/api/v2/article/addArticle', {
						articleId: this.dataList.article.id,
						articleUserId: this.userId
					}).then(res => {
						if (res.code == 200) {
							this.$refs.uToast.show({
								message: '删除成功',
								type: "success",
								complete() {
								_this.$emit('deleteimg', _this.dataList.article.id)
								}
							});
						} else {
							this.$refs.uToast.show({
								message: res.message,
							});
						}
					})
				}
			},
			Onshowsheet() {
				this.showsheet = true
			},
			delComments(id) {
				let _this = this
				this.$request.post('/coc-active/api/v1/comments/delComments', {
					id: id
				}).then(res => {
					if (res.code == 200) {
					uni.$u.toast('删除成功')
					
					this.$emit('sendid',this.dataList.article.id)
					} else {
						this.$refs.uToast.show({
							message: res.message,
						});
					}
				})
			},
			OnOpenImg(imgs) {
				console.log(imgs)
				this.imgsbig = imgs
				this.popimgs = true
			},

			previewImage(img) {
				uni.previewImage({
					urls: [img],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
		


		
			Onshare() {
				this.choseshare = this.dataList.article
				this.showshare = true
			},
		
	
			Onquote() {
				if (tologin() !== true) {
					return
				}
				this.chosequote = this.dataList.article
				this.showquote = true
			},
		
			OnlikeBase() {
				if (tologin() !== true) {
					return
				}
				this.$request.post("/coc-social/api/v2/article/like", {
					id: this.dataList.article.id
				}).then(res => {
					if (res.code == 200) {
						if (this.dataList.article.likeType == 2) {
							uni.$emit('changelike',{likeType:1,index:this.index})
						} else {
							uni.$emit('changelike',{likeType:2,index:this.index})
						}
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
						});
					}
				})
			},

			getList() {
				if (!this.isshowpage) {
					this.$showLoading()
				}
				this.$newrequest.post("/coc-social/api/v1/article/findById", {
					id: this.id,
					current: this.current,
					size: 10
				}).then(res => {

					if (res.data.article.title) {
						this.tiewen = res.data.article.title
					}
					this.dataList = res.data
					this.imgs = res.data.article.imgs.split(',')
					if (res.data.comments.length < 10) {
						this.isLoadMore = true
					}
					if (this.current == 1) {
						this.comments = res.data.comments
					} else {
						res.data.comments.filter(s => {
							this.comments.push(s)
						})
					}
				}).catch(err => {

				}).finally(() => {
					if (!this.isshowpage) {
						this.isshowpage = true
						this.$hideLoading()
					}
				})
			},
			gettiem(dateTimeStamp) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = ''
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				} else
					result = "刚刚";
				return result;
			},
			Onreply(item) {
				if (tologin() !== true) {
					return
				}
				if (uni.getStorageSync('isCertify') != 1) {
					this.showpop = true
					return false
				}
				this.chosecomment = this.dataList.article
				this.chosecomment.commentType = '4'
				this.chosecomment.id = item.commentId
				this.showcomment = true
			},
			OnOpencomment() {
				if (tologin() !== true) {
					return
				}
				if (uni.getStorageSync('isCertify') != 1) {
					this.showpop = true
					return false
				}
				this.chosecomment = this.dataList.article
				this.chosecomment.commentType = '2'
				this.chosecomment.id = this.dataList.article.id
				this.showcomment = true
			},
			closepopcomment() {
				this.showcomment = false
			},
		}
	}
</script>

<style lang="scss">
	.baoming {
		width: 108rpx;
		height: 44rpx;
		background: #D91B1B;
		border-radius: 22rpx;
		font-size: 28rpx;
		color: #ffffff;
		text-align: center;
		line-height: 44rpx;
		text-align: center;
		margin-right: 12rpx;
	}

	.kapian {
		background: #FFFFFF;
		border-radius: 10rpx;
		display: flex;
		padding: 12rpx;
		align-items: center;
	}

	.page {}

	.top-img {
		margin: 20rpx;
	}

	.createdtiem {
		font-size: 24rpx;
		color: #999999;
		margin-right: 20rpx;
		margin-top: 10rpx;
	}

	.card {
		border-radius: 12rpx;
		margin: 20rpx;
		background-color: #ffffff;
		padding: 20rpx;
	}

	.pop {
		width: 710rpx;
	}

	.time-container {
		margin-left: auto;
		margin-right: 20rpx;
		margin-top: 20rpx;
	}

	.time {
		width: 70rpx;
		height: 50rpx;
		background-color: #d91b1b;
		border-radius: 10rpx;
		line-height: 50rpx;
		color: #ffffff;
		font-size: 24rpx;
		text-align: center;
		display: inline-block;
	}

	.content {
		display: flex;
		align-items: auto;
		flex-direction: column;
		margin-top: 20rpx;
		padding-left: 10rpx;
	}

	.name {
		text-align: left;
		margin-top: 0;
		font-weight: bold;
		font-size: 32rpx;
	}

	.container {
		width: 100%;
		display: flex;
		margin-top: 10rpx;
	}

	.avatar-container {
		position: relative;
		margin: 10rpx;
	}

	.avatar {
		width: 110rpx;
		height: 110rpx;
		border-radius: 12rpx;
	}

	.session {
		border-radius: 15rpx;
		/* background-color: rgb(200,199,204); */
		background-color: #ffffff;
		margin: 20rpx;
	}

	.share-detail {


		.username {
			flex: 1;
			font-size: 32rpx;
			color: #000000;
			margin-left: 20rpx;
			width: 300rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;

		}

		.share-from {
			font-size: 24rpx;
			color: #999999;
			margin-right: 20rpx;
			line-height: 48rpx;
			margin-left: 10rpx;
		}
	}

	.btn-follow {
		display: flex;
		justify-content: center;
		border-radius: 24rpx;
		border: solid 2rpx #d91b1b;
		padding: 2rpx;
		color: #d91b1b;
		font-size: 24rpx;
		width: 108rpx;
		height: 40rpx;
		line-height: 38rpx;
		font-weight: bold;
	}

	.title {
		font-size: 32rpx;
		color: #222222;
		font-weight: bold;
		margin-left: 100rpx;
	}

	.content {
		margin-left: 100rpx;
		margin-top: 20rpx;
	}

	.hr {
		background-color: #e8e8e8;
		width: 100%;
		height: 1rpx;
		margin-top: 20rpx;
	}

	.interactive {
		display: flex;
		margin-top: 30rpx;
		font-size: 24rpx;
		color: #222222;
		justify-content: space-around;
	}

	.userinfo {
		margin-left: 20rpx;
		margin-top: 6rpx;
		width: 370rpx;

		.name {
			font-size: 28rpx;

		}

		.text {
			font-size: 24rpx;
			color: #222222;
			width: 380rpx;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}

	.btn-follow-b {
		display: flex;
		justify-content: center;
		border-radius: 24rpx;
		border: solid 2rpx #2c2c2c;
		padding: 2rpx;
		color: #222222;
		font-size: 24rpx;
		width: 108rpx;
		height: 40rpx;
		line-height: 38rpx;
		font-weight: bold;
		margin-top: 18rpx;
	}

	.Release-time {
		font-size: 24rpx;
		color: #222222;
		margin-right: 20rpx;
		line-height: 78rpx;
	}

	.vote {
		margin-top: 40rpx;
		background-color: #f8f8f8;
		border-radius: 14rpx;
		padding: 20rpx;

		.title {
			font-size: 32rpx;
			color: #222222;
			font-weight: bold;
			margin-left: 0rpx;
		}

		.option {
			background-color: #999999;
			margin-top: 10rpx;
			display: flex;
			justify-content: space-between;
			padding: 5rpx 10rpx;
		}

		.choose {
			font-weight: bold;
			background-color: #7bc5f4;
		}
	}

	.quote {
		background-color: aliceblue;
		border-radius: 10rpx;
		padding: 20rpx;
		margin-top: 20rpx
	}

	.quote-title {
		margin-top: 10rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		font-size: 24rpx;
	}

	.quote-content {
		margin-top: 10rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		font-size: 28rpx;
	}

	.comment-list {
		margin: 20rpx;


		.comment {
			display: flex;
			justify-content: space-between;
			// align-items: center;

		}
	}

	.bottom-btn {
		padding: 20rpx 20rpx 40rpx 20rpx;
		position: fixed;
		bottom: 1rpx;
		background-color: #ffffff;

		font-size: 24rpx;
		width: 100%;
	}

	.yinyong-content {
		font-size: 24rpx;
		color: #999999;
		width: 550rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		/* 这里是超出几行省略 */
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
	.bgGray-new{
		background-color: #999999 !important;
		border: 1rpx #999999 solid !important;
		color: #ffffff !important;
	}
</style>
