<template>
	<view style="background-color: #f8f8f8">
		<view class="Placements">
			<view class="Placements_content">
				<carousel v-if="groupDetail.adUrl || groupDetail.adPushUrl" :list="getswiper()" height="400rpx" urlkey="url"
					:dataType="1" :indicatorType="4" :clickType="2" :autoPlay="autoPlay" :radius="5">
				</carousel>
			</view>
			<view class="Placements_footer">
				<view class="price_left">
					<view class="letop" v-if="groupDetail.productStatus == 1 || groupDetail.productStatus == 2">￥ <text
							style="font-weight: 500;font-size: 50rpx;color: #FFFFFF;">{{ toFixeds(groupDetail.depositPrice)
							}}</text>订金
					</view>
					<view class="letop" v-if="groupDetail.productStatus == 3">￥ <text
							style="font-weight: 500;font-size: 50rpx;color: #FFFFFF;">{{ toFixeds(groupDetail.teamworkPrice)
							}}</text>成团价
					</view>
					<view style="font-size: 20rpx; color: #FFFFFF;text-decoration: line-through;">
						市场价：￥{{ toFixeds(groupDetail.marketPrice) }}</view>
				</view>
				<view class="times_right">
					<view style="margin-right: 24rpx; text-align: right">
						<view style="font-size: 24rpx; color: #fff; margin-top: 10rpx">
							{{
								groupDetail.productStatus == 2
								? "拼团截止时间" : groupDetail.productStatus == 3 ? "抢购截止时间" : "拼团还未开始"
							}}
						</view>
						<view>
							<u-count-down v-if="groupDetail.productStatus == 2 || groupDetail.productStatus == 3"
								:time="changetime" format="DD:HH:mm:ss" autoStart millisecond @change="onChange">
								<view class="time">
									<view class="time__custom">
										<text class="time__custom__item">{{ timeData.days }}</text>
									</view>
									<text class="time__doc mt10">天</text>
									<view class="time__custom">
										<text class="time__custom__item">{{ timeData.hours }}</text>
									</view>
									<text class="time__doc">:</text>
									<view class="time__custom">
										<text class="time__custom__item">{{ timeData.minutes }}</text>
									</view>
								</view>
							</u-count-down>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ads">
			<!--  #ifdef MP-WEIXIN  -->
			<view>
				<!--银行横幅  -->
				<swiper class="swiper_box" autoplay interval="3000" duration="500" vertical v-if="info.length>0">
					<swiper-item v-for="(item, index) in info" :key="index" class="swiper_item">
						<view @click="Oncard(item.paymentPreferenceId)">
							<image :src="item.bankLogoBackgroundUrl" mode="widthFix" style="width:655rpx"></image>
							<view class="banners_text">
								{{ item.remark }}</view>
						</view>
					</swiper-item>
				</swiper>
			</view>

			<!--  #endif -->
			<view class="ads_title">
				{{ groupDetail.title }}
			</view>
			<view class="buy">
				<view class="amount">
					仅剩{{ groupDetail.stock - groupDetail.saleNum }}份
				</view>
				<view class="together"> 一起拼,更划算 </view>
			</view>
		</view>

		<scroll-view scroll-x="true">
			<view class="Goupstage">
				<view class="stage_Item" v-for="(v) in groupDetail.groupTeamSetMealPrice" :key="v.groupTeamProductId">
					<img v-if="finalPrice == v.flashSalePrice && groupDetail.productStatus !== 1"
						src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704768775883.png" alt=""
						class="rightImg" />
					<view class="stage_content">
						<view class="cont_left">
							<view class="group_number">市场价:</view>
							<view class="Pack_prc"> <text style="font-size: 20rpx">￥</text>{{ v.marketPrice }}</view>
						</view>
						<!--  -->
						<view class="cont_right">
							<view class="group_num">拼团
								<text style="color: #d91b1b; margin: 0 1rpx">{{
									v.groupTeamNum
								}}</text>
								人
							</view>
							<view class="Package_price"> <img
									src="https://oss.dcqcjlb.com/51che_java_dev/20240113/file_1705106638346.png" alt=""
									style="margin-right: 6rpx;"> {{ v.flashSalePrice }}</view>
						</view>
					</view>
					<view class="stage_foot" v-if="groupDetail.depositOrderCount >= v.groupTeamNum" :style="{
						background: `url(https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704795982363.png)`,
						backgroundSize: 'cover',
					}">
						<view class="fx">
							<view class="tuan">
								<image v-for="(item, dex) in groupDetail.heads " :key="dex" class="stageImg" :src="item"
									mode=""></image>
							</view>
							<text style="font-weight: bold;color: #000;">{{ groupDetail.depositOrderCount }} </text>人在组团
						</view>
						<view class="ft">已成团</view>
					</view>
					<view class="stage_foot" v-else :style="{
						background: `url(https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704795882959.png)`,
						backgroundSize: 'cover',
					}">
						<view class="fx">
							<view class="tuan">
								<image v-for="(item, dex) in groupDetail.heads " :key="dex" class="stageImg" :src="item"
									mode=""></image>
							</view>
							&ensp; <text style="font-weight: bold;color: #000;">{{ groupDetail.depositOrderCount }}</text>
							人在组团
						</view>
						<view class="fs" @click="popposter" v-if="groupDetail.productStatus == 2">加速分享</view>
						<view class="fs mr10" v-if="groupDetail.productStatus == 3">未成团</view>
						<view class="fs mr10" v-if="groupDetail.productStatus == 1">未开始</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 商家主页 -->
		<view class="card-item1" v-if="groupDetail.shopIds" style="padding-top: 10rpx">
			<view class="card-enterprices">
				<view class="u-flexs">
					<view class="shop_title">{{ groupDetail.shopName }}</view>
					<view class="mainhome-btn" @click.stop="OnPushMap">主页</view>

				</view>
				<view class="size24 mt20 rt25" v-if="groupDetail.openingHoursMsg"> 营业时间 {{ groupDetail.openingHoursMsg }}
				</view>
				<view class="size24 mt20 rt25">
					{{ groupDetail.baseAddress }}
				</view>
			</view>
		</view>
		<floatVideo v-if="groupDetail.productStatus === 2" :relatedType=9 :relatedId="videoId"></floatVideo> 

		<!-- 达人推荐 -->
		<!-- <view class="card-item">
			
		</view> -->
		<view style="margin-left: 25rpx;"><recommendX :fromType=1 :relatedType=9 :relatedId="videoId" :isTitle=3></recommendX></view>
	
		<view class="title2-info">购买须知</view>
		<view class="card-item">
			<ul class="ul-item">
				<li class="li-item" v-if="groupDetail.holidaysIsUse == 1">
					<view class="txtLighGrays">节假日通用</view>
				</li>
				<li class="li-item" v-if="gr.oupDetail.holidaysIsUse == 2">
					<text style="color:#000">不可用日期：</text>
					<text class="txtLighGrays">
						{{ groupDetail.groupTeamNotUseTimesMsg }}
					</text>
				</li>
				<li class="li-item" v-if="groupDetail.expirationTime">
					<view class="txtLighGrays">使用截止时间：{{ groupDetail.expirationTime }}</view>
				</li>
				<li class="li-item" v-if="groupDetail.nonRefund == 1">
					<view class="txtLighGrays">是否支持退款：{{ groupDetail.nonRefund == 1 }}</view>
				</li>
				<li class="li-item" v-if="groupDetail.remark">
					<view class="txtLighGrays">特殊说明：{{ groupDetail.remark || '' }}</view>
				</li>
			</ul>

		</view>
		<view class="title2-info">活动详情</view>
		<view class="content">
			<u-parse :content="groupDetail.detail"></u-parse>
		</view>
		<view class="title2-info">价格说明</view>
		<!--  -->
		<view class="card-item">
			<view class="card-goumai">
				<ul class="ul-item">
					<li class="li-item" style="margin-top: 0rpx">
						<view class="txtDarkGray mt10">订金：指的是在拼团开始时间和拼团结束时间内，需支付商品订金的价格，该阶段可以邀请好友一起拼团。</view>
					</li>
					<li class="li-item">
						<view class="txtDarkGray mt10">成团价：指的是拼团时间结束时拼团成功，已成团人数对应的价格，已支付订金的拼团成员可以支付尾款。
						</view>
					</li>
					<li class="li-item">
						<text class="txtDarkGray">划线价：商品的专柜价、吊牌价、正品零售价、厂家指导价或该商品曾经展示过的销售价等，并非原价，仅供参考。</text>
					</li>
					<li class="li-item">
						<text class="txtDarkGray">特别提示：
拼团成功：指的是拼团时间已结束且达到最低成团标准。
拼团失败：指的是拼团时间已结束但未达到最低成团标准，已拼团用户的订金原路退回。</text>
					</li>
				</ul>
			</view>
		</view>
		<!--  -->
		<!--  #ifdef MP-WEIXIN  -->
		<!-- 通过条件做判断 -->
		<view class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid" v-if="iscommission == 0">
			<view class="view jsb flex alc" :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
				<view class="u-flex"
					style=" margin-top: 14rpx;  width: 300rpx; justify-content: space-around; font-size: 24rpx; ">
					<view @click="Onaddcollections"
						style=" margin-left: 20rpx;  text-align: center;position: relative;  top: -8rpx; ">
						<view v-if="groupDetail.isCollection == 2 || groupDetail.isCollection == null">
							<image src="@/static/image/weishoucang.png" style="width: 56rpx; height: 56rpx"></image>
						</view>
						<view v-if="groupDetail.isCollection == 1">
							<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060433937.png" style="width: 56rpx; height: 56rpx">
							</image>
						</view>
						<view v-if="groupDetail.isCollection == 2 || groupDetail.isCollection == null"
							style="margin-top: -6rpx">
							收藏
						</view>
						<view v-if="groupDetail.isCollection == 1" style="margin-top: -6rpx">已收藏</view>
					</view>
					<view style="margin-left: 20rpx; text-align: center" @click="popposter">
						<view>
							<image src="@/static/image/share.png" style="width: 41rpx; height: 41rpx"></image>
						</view>
						<view style="margin-top: 2rpx">分享</view>
					</view>
					<view style="  margin-left: 20rpx; text-align: center; position: relative;   top: -9.5rpx;">
						<view>
							<image src="@/static/image/kefu.png" style="width: 56rpx; height: 56rpx"></image>
						</view>
						<view style="margin-top: -6rpx">客服</view>
						<button open-type="contact" session-from="" class="kefu-contact"
							style="position: absolute; height: 56px; top: 0; opacity: 0"></button>
					</view>
				</view>
				<!-- <view  class="btnComment tac mainRed size28">评价</view>
			<view v-if='!istimeend' class="signup">
				<text style="background-color: #999999;">已结束</text>
			</view>
			<view v-else-if='dataList.status == 2' class="signup"> 
				<text style="background-color: #999999;">已下架</text>
			</view>
			<view v-else-if='surplusStock == 0' class="signup">
				<text style="background-color: #999999;">库存已抢光</text>
			</view> -->
				<view class="signup" v-if="groupDetail.stock - groupDetail.saleNum > 0 && groupDetail.productStatus === 2">
					<text @click="Onopen">立即跟团</text>
				</view>
				<view class="signup"
					v-else-if="groupDetail.stock - groupDetail.saleNum > 0 && groupDetail.productStatus === 3">
					<text @click="Onopen">立即抢购</text>
				</view>
				<view class="signup" v-else-if="groupDetail.productStatus === 1">
					<text @click="pointment">提醒我</text>
				</view>
				<view class="signup" v-else-if="groupDetail.productStatus === 4">
					<text style="background-color: #999999;">已结束</text>
				</view>
				<view class="signup" v-else>
					<text style="background-color: #999999;">库存已抢光</text>
				</view>
			</view>
			<view class="safe-bottom-height"></view>
		</view>
		<view v-else-if="iscommission == 1" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid">
			<view class="view" :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
				<joinshopbtn :ids="videoId" :type="9" :isSelection="groupDetail.isCollection">
				</joinshopbtn>
			</view>
		</view>

		<!--  #endif -->
		<!-- 底部弹出框 -->
		<u-popup :safeAreaInsetBottom="false" :show="showpop" @close="showpop = false" mode="bottom">
			<view class="pop-singup">
				<view class="u-flex" style="margin-bottom: -30rpx">
					<view style="
              position: relative;
              bottom: 40rpx;
              border: 5rpx #ffffff solid;
              border-radius: 10rpx;
            ">
						<image mode="aspectFill" style="width: 185rpx; height: 185rpx; border-radius: 10rpx"
							:src="groupDetail.coverPicture">
						</image>
					</view>
					<view style="margin-left: 20rpx">
						<view>
							<view class="u-flex alc" v-if="groupDetail.productStatus == 2">
								<view style="color: #d91b1b; font-size: 32rpx; font-weight: bold">
									<text style="font-size: 27rpx"><text>订金：</text>￥</text><text style="font-size: 32rpx">{{
										toFixeds(groupDetail.depositPrice)
									}}</text>
								</view>
							</view>
							<view class="u-flex alc" v-if="groupDetail.productStatus == 3">
								<view style="color: #d91b1b; font-size: 32rpx; font-weight: bold">
									<text style="font-size: 27rpx"><text>成团价：</text>￥</text><text
										style="font-size: 32rpx">{{
											toFixeds(groupDetail.teamworkPrice)
										}}</text>
								</view>
							</view>
						</view>

						<!-- 展示不同银行信用卡用户的立减优惠 -->
						<view v-if="info.length" class="size24 mt10" style="border-radius: 10rpx;">
							<view v-for="(v) in info " :key="v.paymentPreferenceId" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view clk> <text v-if="v.paymentPreferenceId == 5">农行</text>
										<text v-if="v.paymentPreferenceId == 6">工行</text>
										<text v-if="v.paymentPreferenceId == 7">邮储</text>
										<text v-if="v.paymentPreferenceId == 8">民生</text>
										<text v-if="v.paymentPreferenceId == 4">人保</text>
										<text v-if="v.paymentPreferenceId == 10">官方</text>信用卡用户立减
									</view>
									<view class="mainRed"> {{ toFixeds(v.deductionAmount) }}
									</view>
									<view>元</view>
								</view>
							</view>

						</view>
						<view style="font-size: 24rpx; color: #666666" class="mt10">
							库存{{ groupDetail.stock - groupDetail.saleNum }}
						</view>
					</view>
				</view>
				<view style="margin-top: 30rpx; margin-bottom: 30rpx">
					<u-divider :text="null"></u-divider>
				</view>
				<view style="margin-left: 28rpx"> 商品套餐 </view>
				<view class="u-flex" style="flex-wrap: wrap; margin-top: 32rpx">
					<view style="margin-left: 32rpx" class="pop-btn" @click="detailpackage"
						:class="currentmeal ? 'current-btn' : ''">
						{{ groupDetail.name }}
					</view>
				</view>
				<view class="btn">
					<text v-if="groupDetail.productStatus == 2" @click="Onsingup">立即拼团</text>
					<text v-if="groupDetail.productStatus == 3" @click="Onsingup">立即抢购</text>
				</view>
			</view>
		</u-popup>
		<u-popup :safeAreaInsetBottom='false' round='10' :show="showpopshare" @close="OnCloseShare" mode="center">
			<view class="pop-poster">
				<view @click="OnSaveImage" style="margin-top: 100rpx;" class="u-flex jsc">
					<image :src="poster" style="width: 443rpx;height: 787rpx;"></image>
                     
					<!-- 生成图片 -->
					<poster ref="poster" :list="list" background-color="#FFF" :width="443" :height="787"
						@on-success="posterSuccess"></poster>
				</view>
				<view class="tac size28" style="margin-top: 28rpx;">
					点击图片,长按保存到相册
				</view>
				<view class="pyq">
					<view class="text-pyq">
						{{ groupDetail.posterDesc }}
					</view>
					<view class="tac mt20 " @click="Oncopy(groupDetail.posterDesc)" style="display: flex; justify-content: center">
						<image style="width: 230rpx;height: 60rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
						</image>
						<button
                @click="handleShare"
                open-type="share"
                 style="
                width: 230rpx;
                height: 60rpx;
                margin-left: 20rpx;
                background: url('https://oss.dcqcjlb.com/51che_java_dev/20240113/file_1705126744698.png');
                margin-right: 0;
                background-size: 100%;
              "
            >
            </button>
					</view>
				</view>
			</view>
		</u-popup>
		<view style="height: 200rpx"></view>
	</view>
</template>

<script>
import carousel from "@/components/carousel/index.vue";
import recommendX from "@/components/darenRecommend/recommendX.vue";
import floatVideo from "@/components/floatVideo/index.vue";
import { getstorage, tologin } from "@/utils/index.js";

import Poster from '@/components/zhangyuhao-poster/Poster.vue';
import joinshopbtn from "@/components/joinshopbtn/index.vue";
export default {
	components: {
		recommendX,
		floatVideo,
		carousel,
		Poster,
		joinshopbtn
	},
	data() {
		return {
			info: [],
			videoId: null,
			depositOrderCount: '', //已解锁拼团的人数
			forwardUserId: "",
			finalPrice: 0, //拿到最终的拼团价格
			token: "",
			timeData: {},//倒计时
			istimeend: true,
			groupTeamSetMealId: "", //拼团套餐id
			showpop: false, //弹出框
			groupDetail: {},
			changetime: '',
			priceList: [],
			booking: {//预约
				id: '',
				relType: 4,
			},
			foundItem: null,
			swiperList: [], //处理轮播图数据
			autoPlay: false, //轮播图滚动
			currentmeal: true, //是否选择套餐
			dataList: {
				bankCardPrice: 0,
				activityPaymentPreferenceId: 0,
			},
			list: [],
			poster: '',
			showpopshare: false,
			iscommission: 0
		};
	},

	methods: {
		// 获取详情数据的接口
		getGroupDetail(id) {
			this.$request
				.post("/coc-active/api/v1/groupTeam/getProductDetails", { id })
				.then((res) => {
					this.groupDetail = res.data;
					this.depositOrderCount = this.groupDetail.depositOrderCount
					this.priceList = this.groupDetail.groupTeamSetMealPrice;
					this.priceList.forEach((item) => {
						if (this.depositOrderCount < item.groupTeamNum && !this.finalPrice) {
							this.finalPrice = item.flashSalePrice;
						}
					});
					// console.log("最终解锁价格", this.finalPrice);
					let swiperList = [];
					// 轮播图片数据处理
					if (res.data.adUrl) {
						let curlist = res.data.adUrl.split(",");
						curlist.forEach((data) => {
							swiperList.push({
								url: data,
								type: "image",
							});
						});
					}
					// 倒计时处理
					if (res.data.productStatus == 2) {
						let getime = new Date(res.data.signUpEndTime)
						this.changetime = getime.getTime() - new Date().getTime();

					
					} else if (res.data.productStatus == 3) {
						let getime = new Date(res.data.rushPurchaseEndTime)
						this.changetime = getime.getTime() - new Date().getTime();
					}


					// 轮播视频数据处理
					if (res.data.adPushUrl) {
						swiperList.unshift({
							url: res.data.adPushUrl,
							type: "video",
							poster: res.data.adCoverImg
								? res.data.adCoverImg
								: res.data.adPushUrl +
								"?x-oss-process=video/snapshot,t_1000,m_fast",
						});
						this.autoPlay = false;
					} else {
						this.autoPlay = true;
					}
					this.swiperList = swiperList; //处理好轮播列表数据
					//   银行横幅数据
					this.info = res.data.paymentPreference;
					this.booking.id = res.data.id
					console.log(this.groupDetail);
				});
		},

		handleShare() {
        wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline'],
      });
    },


		Oncard(index) {
			// 4是人保 5是农行 6是工行 7是邮储 8民生 


			if (index == 4) {
				uni.navigateTo({
					url: "/pages/carShops/upkeep/insurance?id=0",
				});
			} else if (index == 5) {
				uni.navigateTo({
					url: "/pages/my/creditCard/detail?type=n",
				});
			} else if (index == 6) {
				uni.navigateTo({
					url: "/pages/my/creditCard/detail?type=g",
				});
			} else if (index == 7) {
				uni.navigateTo({
					url: "/pages/my/creditCard/detail?type=y",
				});
			} else if (index == 8) {
				uni.navigateTo({
					url: "/pages/my/creditCard/detail?type=m",
				});
			}
			this.openpop = false;
		},
		// 预约
		pointment() {
			let _this=this
			uni.requestSubscribeMessage({
				tmplIds: [
					'VaQGVQ3W7TKmfEBRDZzRcjXyOhnjNQSfWteBrL7qp5s'
				],
				success(res) {
					if (res['VaQGVQ3W7TKmfEBRDZzRcjXyOhnjNQSfWteBrL7qp5s'] == 'accept') {
						_this.$request.post("/coc-active/api/v1/groupTeam/appointment", _this.booking).then((s) => {
							console.log(s);
								if (s.code == 200) {
									uni.showToast({
										icon: 'none',
										title: '提醒成功，请等待通知',
									});
								} else {
									uni.showToast({
										icon: 'none',
										title: s.message,
									});
								}
							})
					}
				}
			})

			// uni.requestSubscribeMessage({
			//       tmplIds: [''],
			//       success(res) {
			//         console.log(res);
			// 	  },
			//     });

			// this.$request
			// 	.post("/coc-active/api/v1/groupTeam/appointment", this.booking)
			// 	.then((res) => {
			// 		if (res.code == 200) {

			// 		} else {
			// 			uni.$u.toast(res.message)
			// 		}
			// 	})
		},
		//
		getswiper() {
			return this.swiperList;
		},
		OnPushMap() {
			uni.navigateTo({
				url: '/pages/activityMall/business/index?id=' + this.groupDetail.shopIds,
			});
		},
		// 关闭弹框
		OnCloseShare() {
			this.showpopshare = false
		},
		//是否选择套餐
		detailpackage() {
			this.currentmeal = !this.currentmeal;
		},
		// 立即跟团
		Onopen() {
			this.showpop = true;
		},
		//选择套餐抢购
		Onsingup() {
			if (!this.currentmeal) {
				uni.showToast({
					icon: "none",
					title: "请选择一个套餐~",
				});
				return false;
			}
			if (this.groupDetail.stock - this.groupDetail.saleNum <= 0) {
				uni.showToast({
					icon: 'none',
					title: '库存已抢光',
				});
				return false
			}
			this.groupTeamSetMealId = this.groupDetail.groupTeamSetMealId;

			uni.navigateTo({
				url:
					"/pages/groupBooking/detailPay?payType=finalPrice" +
					this.finalPrice +
					"&forwardUserId=" +
					this.forwardUserId,
				success: (res) => {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit("getinfo", {
						data: this.groupDetail,
					});
					this.showpop = false;
				},
			});
			return false;
		},
		//
		posterSuccess(url) {
			console.log(url);
			// 生成成功，会把临时路径在这里返回
			this.poster = url;

		},
		Oncopy(value) {
			uni.setClipboardData({
				data: value,
				success: function () {
					uni.$u.toast('复制成功')
				}
			});
		},
		OnSaveImage() {
			let value = [this.poster]
			console.log(this.poster);
			uni.previewImage({
				current: 99999,
				urls: value,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function (data) {
						// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function (err) {
						console.log(err.errMsg);
					}
				}
			})
		},
		//倒计时
		onChange(e) {
		   return this.timeData = e

		},
		toFixeds(item) {
			return Number(item).toFixed(2);
		},
		Onaddcollections() {
			tologin()
			if (this.groupDetail.isCollection == 2) {
				this.groupDetail.isCollection = 1
			} else {
				this.groupDetail.isCollection = 2
			}
			if (getstorage("token")) {
				this.$request.post("/coc-active/api/v1/collections/add_collections", {
					type: '5',
					relId: this.groupDetail.id,
					relName: this.groupDetail.shopName,
					activityMoney: ''
				}).then(res => {
					if (res.code == 200) {
						let msg = '操作成功'
					}
				})
			}

		},
		popposter() {
			if (!uni.getStorageSync('token')) {
				tologin()
				return false
			}  
			console.log(this.videoId,this.forwardUserId);
			this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
				page: 'pages/groupBooking/detail',
				scene: this.videoId + '_' + this.forwardUserId + '_enter=117',
			}).then(res => {
				this.showpopshare = true
				this.list = [{
					type: 'image',
					// path替换成你自己的图片，注意需要在小程序开发设置中配置域名
					path: encodeURI(this.groupDetail.posterFigureUrl),
					x: 0,
					y: 0,
					width: 443,
					height: 787
				},
				{
					type: 'image',
					path: res.data.qrCode,
					x: 18,
					y: 682,
					width: 90,
					height: 90
				}
				]
				this.$nextTick(() => {
					// 要放在$nextTick()里，不然会空白
					this.$refs.poster.create();
				})
			})

		},
	},
	onLoad(option) {
		console.log(option.id);
		this.videoId = Number(option.id);
		if (option.iscommission) {
			this.iscommission = option.iscommission;
		}
		if (option.scene) {
      let arr = option.scene.split('_');
			this.videoId = arr[0];
			this.forwardUserId = arr[1];
    }
		this.getGroupDetail(this.videoId);
		if (!this.forwardUserId) {
			this.forwardUserId = getstorage("userId");
		}
		this.token = uni.getStorageSync("token");
		if (!uni.getStorageSync("token")) {
			tologin();
		}
	},
	 // 分享
	 onShareAppMessage() {
    const { groupTeamProductId, title, coverPicture,posterFigureUrl } = this.groupDetail;
	// console.log(groupTeamProductId, title, coverPicture,posterFigureUrl,'打印测试！！！');
     return {
      title: title,
      imageUrl: posterFigureUrl,
      path: `/pages/groupBooking/detail?id=${this.videoId }`,
      success() {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.Placements {
	width: 700rpx;
	margin: 10rpx 25rpx;
	height: 517rpx;

	.Placements_content {
		width: 700rpx;
		height: 400rpx;
		// background: #6A6A6A;
		border-radius: 10rpx;
	}

	// 底部
	.Placements_footer {
		position: absolute;
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20240113/file_1705109686706.png");
		background-size: 100% 100%;
		margin-top: -15rpx;
		width: 700rpx;
		z-index: 88;
		height: 127rpx;
		border-radius: 13rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.price_left {
			margin-left: 20rpx;

			.letop {

				font-weight: 500;
				color: #FFFFFF;
				font-size: 20rpx;
			}
		}

		// .times_right {}
	}
}

//
.card {
	margin: 25rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	padding: 24rpx;
}

// 横幅轮播
.swiper_box {
	width: 660rpx;
	height: 61rpx;
	position: relative;

	.banners_text {
		top: 0;
		left: 0rpx;
		width: 660rpx;
		color: #666666;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
		line-height: 61rpx;
		position: absolute;
		z-index: 999;
	}
}

.ads {
	background-color: #fff;
	width: 700rpx;
	margin-left: 25rpx;
	margin-top: 15rpx;
	box-sizing: border-box;

	border-radius: 10rpx;
	padding: 20rpx 25rpx;

	// 商品链接标题
	.ads_title {
		// height: 63rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #222222;
		line-height: 36rpx;
	}

	// 商品状态
	.buy {
		margin-top: 22rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		// 剩余多少份
		.amount {
			height: 23rpx;
			font-size: 24rpx;
			font-family: PingFang SC;

			color: #666666;
		}

		//广告语
		.together {

			width: 167rpx;
			height: 24rpx;
			font-size: 24rpx;
			font-family: PingFang SC;

			margin-right: -25rpx;
			color: #d91b1b;
		}
	}
}

//
.card-item {
	width: 720rpx;
	border-radius: 10rpx;
	margin-top: 20rpx;
	padding-bottom: 32rpx;
	margin-left: 25rpx;
	box-sizing: border-box;
	padding-right: 25rpx;
	background-color: #ffffff;

	i {
		width: 10rpx;
		height: 10rpx;
		background-color: #666666;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
		position: relative;
		bottom: 5rpx;
	}
}

//红线标题
.title2-info {
	margin-top: 15rpx;
	margin-left: 25rpx;
	font-size: 28rpx;
	font-weight: bold;
	border-left: 10rpx solid #d91b1b;
	padding-left: 20rpx;
}

.card-item1 {
	width: 720rpx;
	border-radius: 10rpx;
	margin-top: 16rpx;
	margin-left: 25rpx;
	box-sizing: border-box;
	padding-right: 25rpx;
	background-color: #ffffff;

	i {
		width: 10rpx;
		height: 10rpx;
		background-color: #666666;
		border-radius: 50%;
		display: inline-block;
		margin-right: 10rpx;
		position: relative;
		bottom: 5rpx;
	}
}


.rt25 {
	margin-right: 25rpx;
}

//商家主页
.card-enterprices {
	width: 700rpx;
	border-radius: 10rpx;
	margin-top: 10rpx;
	margin-left: 24rpx;
	margin-right: 25rpx;
	padding-bottom: 25rpx;

	.u-flexs {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
		padding-right: 25rpx;
		justify-content: space-between;
	}
}

.mainhome-btn {
	width: 80rpx;
	margin-top: 8rpx;
	height: 40rpx;
	margin-right: 17rpx;
	border: 1rpx solid #d91b1b;
	border-radius: 20rpx;
	line-height: 40rpx;
	color: #d91b1b;
	font-size: 24rpx;
	text-align: center;
}

// 购买须知
.txtLighGrays {
	margin-top: 20rpx;
	font-size: 24rpx;
	color: #222222;
	font-family: PingFang SC;
	font-weight: 500;
}

//列表
card-goumai {
	padding: 32rpx 24rpx 32rpx 10rpx;
	background-color: #ffffff;
	margin: 25rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
}

.mr10 {
	padding-right: 10rpx;
}

.ul-item {
	padding-top: 15rpx;
	list-style-type: disc;
	/*  #ifdef  H5  */
	margin-left: -80rpx;
	margin-bottom: 32rpx;
	/* #endif */
}

.li-item {
	color: #d91b1b;
	font-size: 24rpx;
	display: list-item;
	margin-left: 40rpx;
	margin-top: 24rpx;
}

//
.pop-btn {
	text-align: center;
	padding: 10rpx;
	height: 43rpx;
}

.current-btn {
	border-radius: 12rpx;

	background-color: #fceded;
	color: #d91b1b;
}

//活动详情
.content {
	margin: 20rpx 25rpx;

	background-color: #f8f8f8;
	border-radius: 12rpx;
}

// 底部按钮样式
.bottom-btn {
	width: 100%;
	padding: 0rpx 28rpx 0rpx 0rpx;
	position: fixed;
	z-index: 9999;
	bottom: 0rpx;
	background-color: #ffffff;
	margin-top: 40rpx;
	font-size: 24rpx;

	.view {
		font-size: 28rpx;
		padding-top: 22rpx;
		padding-right: 25rpx;
	}

	.btn {
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		padding: 20rpx;
	}

	.btnComment {
		width: 130rpx;
		height: 66rpx;
		line-height: 66rpx;
		border-radius: 35rpx;
		border: 2rpx solid #d91b1b;
		margin-left: 30rpx;
	}

	.signup {
		// background-color: #d91b1b;
		border-radius: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #ffffff;
		width: 360rpx;
		height: 70rpx;
		align-self: center;
		font-size: 28rpx;
		// z-index: 2;

		text {
			display: inline-block;
			text-align: center;
			background-color: #d91b1b;
			border-radius: 40rpx;
			padding: 16rpx;
		}
	}
}

//倒计时
.time {
	@include flex;
	align-items: center;

	&__custom {
		margin-top: 4px;
		width: 22px;
		height: 22px;
		background-color: #ffffff;
		border-radius: 4px;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: center;
		align-items: center;

		&__item {
			color: #eb2e01;
			font-size: 12px;
			text-align: center;
		}
	}

	&__doc {
		color: #ffffff;
		padding: 0px 4px;
	}

	&__item {
		color: #606266;
		font-size: 15px;
		margin-right: 4px;
	}
}

.pyq {
  margin: 25rpx;
  border-radius: 10rpx;
  background-color: #d91b1b;
  padding: 7rpx 7rpx 20rpx 7rpx;
}

.text-pyq {
  padding: 20rpx 20rpx 50rpx 20rpx;
  font-size: 24rpx;
  background-color: #ffffff;

  border-radius: 10rpx;
}


// 拼团阶段横滚
.Goupstage {
	width: 750rpx;
	height: 260rpx;
	border-radius: 10rpx;
	margin-top: 16rpx;
	white-space: nowrap; // 防止换行
	display: flex;
	align-items: center;

	.stage_content {
		background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20240113/file_1705106481318.png");
		background-size: 100% 100%;
		display: flex;
		margin-left: 12rpx;
		height: 130rpx;


		.cont_left {
			width: 100rpx;
			margin-top: 30rpx;
			.group_number {
				color: #999999;
				font-size: 24rpx;

				font-family: PingFang-SC-Medium;
			}

			.Pack_prc {
				color: #d91b1b;
				font-style: 24rpx;
				margin-top: 10rpx;
				font-weight: bold;
			}
		}

		.cont_right {
			margin-left: 140rpx;
			margin-top: 48rpx;
			position: relative;
			height: 60rpx;

			.group_num {
				position: absolute;
				top: -56rpx;
				width: 99rpx;
				height: 24rpx;
				left: -5rpx;
				font-size: 25rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #222222;
				line-height: 48rpx;
			}

			.Package_price {
				padding-bottom: 15rpx;

				img {
					width: 47rpx;
					height: 47rpx;
				}

				font-size: 52rpx;

				font-family: OPPOSans;
				font-weight: bold;

				color: #d91b1b;
			}
		}
	}

	.stage_foot {
		margin-top: 30rpx;
		margin-left: 15rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-size: 100% 100%;
		width: 400rpx;
		height: 49rpx;

		.fx {
			display: flex;
			color: #999999;
			font-size: 24rpx;
			margin-top: 5rpx;
			align-items: center;
		}

		.tuan {
    display: flex;
    width: 80rpx;
    overflow: hidden;
    align-items: center;
    line-height: 49rpx;
    margin-left: 18rpx;
    flex-shrink: 0; /* 阻止子元素在空间不足时被挤压 */
}

		.stageImg {
			border-radius: 50%;
			width: 28rpx;
			display: inline-block;
			height: 28rpx;
			line-height: 29rpx;
		}

		.ft {
			margin-right: 30rpx;
			font-size: 24rpx;
			margin-top: 3rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
		}

		.fs {
			margin-top: 3rpx;
			margin-right: 20rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #ffffff;
		}
	}

	.stage_Item {
		position: relative;
		width: 454rpx;
		border-radius: 10rpx;
		padding-top: 30rpx;
		padding-left: 20rpx;
		flex: 0 0 auto;
		/* 防止子元素扩展 */
		height: 234rpx;
		margin-left: 20rpx;
		background-color: #fff;
		text-align: center;

		.rightImg {
			position: absolute;
			right: -5rpx;
			top: -5rpx;
			width: 76rpx;
			z-index: 10;
			height: 76rpx;
		}
	}
}

.shop_title {

	font-size: 28rpx;
	font-weight: bold;

}

.pop-poster {
	width: 650rpx;
	border-radius: 10rpx;
	background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685084245034.png");
	background-size: 100% 100%;
	margin-top: -12rpx;

	button::after {
		border: none;
	}
}


// 底部弹出框
.pop-singup {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 20rpx;

	.btn {
		text-align: center;
		margin-bottom: 40rpx;
		margin-top: 100rpx;

		text {
			width: 600rpx;
			height: 80rpx;
			background-color: #d91b1b;
			border-radius: 40rpx;
			line-height: 80rpx;
			font-size: 32rpx;
			color: #ffffff;
			display: inline-block;
		}
	}
}</style>