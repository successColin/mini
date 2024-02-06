<template>
	<view class="page">
		<view v-if="isShowpage">
			<!-- 顶部搜索栏 -->
			<view class="search-top" :style="{ height: navbarHeight + 'px' }">
				<!--  #ifdef APP-PLUS  -->
				<u-navbar :autoBack="true">
					<view class="u-nav-slot u-flex" slot="center">
						<view @click="OnPushSearch" style="margin-left: 100rpx; margin-right: 20rpx">
							<u-search :disabled="true" :placeholder="title" v-model="keyword" :showAction="false">
							</u-search>
						</view>
					</view>
				</u-navbar>
				<!--  #endif -->
				<!--  #ifdef MP-WEIXIN  -->
				<u-navbar :autoBack="true">
					slot="center" style="margin-left: 46px">
					<view @click="OnPushSearch" :style="{ width: searchWidth }"></view>
				</u-navbar>
			</view>
			
			<!--  #endif -->
		</view>
		<view class="content">
			<scroll-view scroll-y="true" @scrolltolower="scrollBottom" :style="{ maxHeight: height }">
				<carousel v-if="banner.length > 0" :list="banner" :topStyle="{ marginTop: '17rpx' }" height="525rpx"
					urlkey="url" :dataType="1" :indicatorType="4" :clickType="2">
				</carousel>
				<view class="business u-flex-al">
					<image class="business-shop-img" :src="detail.baseHead"> </image>
					<view style="margin-left: 18rpx; width: 497rpx">
						<view class="u-flex-al" style="justify-content: space-between">
							<view class="business-title">{{ detail.baseName }}</view>
							<view class="business-btn business-text u-flex" @click="previewImg">添加微信</view>
						</view>
						<view class="business-text" style="color: #666666; margin-top: 12rpx">
							{{ detail.baseAddress }}
						</view>
						<view class="u-flex-al" style="margin-top: 14rpx">
							<view class="u-flex-al" @click="showLocation">
								<image class="business-dw-img" src="@/pages/activityMall/static/image/dingwei.png">
								</image>
								<text class="business-dw business-text">距离{{ detail.distance }}</text>
							</view>
							<view class="u-flex-al" @click="clickTel">
								<image class="business-dh-img" src="@/pages/activityMall/static/image/dianhua.png">
								</image>
								<text class="business-dh business-text">{{
									detail.baseMobile
								}}</text>
							</view>
						</view>
						<!-- 			<view class="u-flex-al" style="margin-top: 16rpx">
								<image class="business-pf-img" src="@/static/image/yishoucang.png"></image>
								<text class="business-pf business-text">商家评分{{ detail.starStr }}</text>
								<image class="business-cc-img" src="@/static/image/huodong.png"></image>
								<text class="business-cc business-text">举办活动:{{ detail.activityAttendNum }}</text>
								<image class="business-rs-img" src="@/static/image/renshu.png"></image>
								<text class="business-rs business-text">参与人数:{{ detail.peopleNum }}</text>
							</view> -->
					</view>
				</view>
				<view class="select">
					<u-tabs :list="selectList" @change="tabClick" :current="index"
						activeStyle="color:#D91B1B;fontSize:32rpx;font-weight: bold;"
						inactiveStyle="color:#222222;fontSize:28rpx;fontWeight: 500;" lineColor="#D91B1B">
					</u-tabs>
					<view class="select-content">
						<view v-if="selectIndex == 0" class="select-shop">
							<template v-for="item in detail.shopHomepageDataVO">
								<view v-if="item.type == 1" class="select-shop-text">
									{{ item.associatedContent }}
								</view>
								<view v-if="item.type == 2 && item.pictureType == 1" class="select-shop-one">
									<image class="select-shop-one-img" mode="widthFix" :src="item.associatedContent">
									</image>
								</view>
								<view v-if="item.type == 2 && item.pictureType == 2" class="select-shop-two u-flex-al">
									<image class="select-shop-two-img" mode="widthFix"
										:src="item.associatedContent.split(',')[0]">
									</image>
									<image class="select-shop-two-img" mode="widthFix"
										:src="item.associatedContent.split(',')[1]">
									</image>
								</view>
								<video v-if="item.type == 3" class="select-shop-video" :enable-progress-gesture="false"
									:src="item.associatedContent"></video>
							</template>
						</view>
						<view
							v-if="(selectIndex == 2 || selectIndex == 3) && (detail.shopTypeDetails == 1 || detail.shopTypeDetails == 3)"
							class="select-activity">
							<view v-if="dataList.length">
								<view class="select-activity-item" v-for="(item, index) in dataList"
									@click="jumpActivity(item.id)" :key="index">
									<view style="height: 300rpx; position: relative">
										<image class="select-activity-item-img" :src="item.coverPicture"></image>
										<view v-if="selectIndex == 3"
											style="width: 100%;height: 300rpx;position: absolute; 
                                        top: 0;left: 0; background: #000000;opacity: 0.5;border-radius: 10rpx 10rpx 0rpx 0rpx; ">
										</view>
										<view
											v-if="selectIndex == 3 && (detail.shopTypeDetails == 1 || detail.shopTypeDetails == 3)"
											class="u-flex"
											style="width: 100%;height: 100%; position: absolute;top: 0;left: 0;">
											<image src="@/pages/activityMall/static/image/huodongjieshu.png"
												style="width: 150rpx; height: 150rpx"></image>
										</view>
									</view>
									<view class="u-flex-al jsb bgf8"
										style="padding: 15rpx 17rpx 21rpx 21rpx; border-radius: 0rpx 0rpx 10rpx 10rpx;">
										<text class="select-activity-item-title ellipsis">{{
											item.title
										}}</text>
										<view v-if="selectIndex == 2 && iscommission == 0"
											class="select-activity-item-btn u-flex" style="background: #d91b1b">参与报名
										</view>
										<view v-else-if="selectIndex == 2 && iscommission == 1"
											@click.stop="Onjoinshop(item, index, 1)" class="select-activity-item-btn u-flex"
											style="background: #d91b1b" :class="{ 'bg999': item.isSelection == 1 }">加小店
										</view>
										<view v-if="selectIndex == 3 && item.isLeaveMessage == 1"
											@click.stop="openAppoint(item.id)" class="select-activity-item-btn u-flex"
											style="background: #d91b1b">我想参加
										</view>
										<view v-if="selectIndex == 3 && item.isLeaveMessage == 0"
											class="select-activity-item-btn u-flex" style="background: grey" @click.stop>
											我想参加</view>
									</view>
								</view>
							</view>
							<view v-else>
								<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
							</view>
						</view>
						<view v-if="selectIndex == 6">

							<view v-if="dataList.length > 0">
								<view v-for="(item, index) in dataList" :key="item.productId" @click="Onpushdanpin(item)">
									<view class="card" style="display: flex;">
										<view>
											<image style="width: 107rpx;height: 107rpx;border-radius: 8rpx;"
												:src="item.coverPicture"></image>
										</view>
										<view class="ml10">
											<view class="size28 fwb">{{ item.title }}</view>
											<view class="size24 mainRed mt10">
												<text class="fwb" v-if="item.bankCardPrice > 0">¥{{ item.bankCardPrice }}</text>
												<text class="fwb" v-else>¥{{ item.flashSalePrice }}</text>
												<text class="txtLighGray txtls ml10">¥{{ item.mgroupPrice }}</text>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view v-else>
								<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
							</view>
						</view>
						<view v-if="selectIndex == 1">
							<view v-if="grouplist.length">
								<view v-for="(item, index) in grouplist" :key="item.id">
									<view class="card" @click="OnPushDetail(item)">
										<!-- 详情 -->
										<view class="u-flex jsb mt20">
											<view>
												<image style="border-radius: 10rpx;width: 212rpx;height: 212rpx;"
													:src="item.coverPicture"></image>
											</view>
											<view style="margin-left: 25rpx;">
												<view class="moreLine size24" style="width: 418rpx;">
													{{ item.title }}
												</view>
												<view class="mt10 flex alc">
													<view style="width: 280rpx;">
														<u-line-progress :showText='false'
															:percentage="(100 - item.percentage)" inactiveColor="#fceded"
															activeColor="#D91B1B">

														</u-line-progress>
													</view>
													<view class="ml10 size24 txtLighGray">
														剩余{{ 100 - item.percentage }}%
													</view>
												</view>
												<view class="preferentialpng">
													<image src="../static/image/liebiaopng.png"
														style="width: 418rpx;height: 125rpx;" />
												</view>
												<view v-if="item.bankCardPrice"
													class="size24 fwb txtColorWhite price-inpng">
													{{ item.marketPrice - item.bankCardPrice }}
												</view>
												<view v-else class="size24 fwb txtColorWhite price-inpng">
													{{ item.saveMoney }}
												</view>
												<view class="flex alc jsb" style="margin-top: 30rpx;">
													<view>
														<view class="size24 txtLighGray"
															style="text-decoration: line-through;">
															¥{{ item.marketPrice }}
														</view>
														<view class="mainRed u-flex" style="margin-top: 10rpx;">
															<view class="u-flex"
																style="align-items: flex-end;margin-bottom: 6rpx;">
																<view class="font20">¥</view>
															</view>
															<view class="u-flex alc">
																<view class="fwb"
																	style="font-size: 40rpx;margin-left: 6rpx;">
																	{{
																		item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice
																	}}
																</view>
															</view>
														</view>
													</view>

													<view class="tac">
														<view class="size20 txtLighGray ">
															即将恢复
														</view>
														<view class="buy-btn" v-if="item.isEnd == 0 && iscommission == 0"
															:class="{ 'graybtn': 100 - item.percentage == 0 }">
															马上抢
														</view>
														<view v-else-if="item.isEnd == 1 && iscommission == 0" class="buy-btn"
															:class="{ graybtn: true }">
															已结束
														</view>
														<view @click.stop="Onjoinshop(item, index, 4)" class="buy-btn"
															v-else-if="iscommission == 1"
															:class="{ 'bg999': item.isSelection == 1 }">
															加小店
														</view>
													</view>
												</view>
											</view>

										</view>
									</view>
								</view>
							</view>
							<view v-else>
								<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
							</view>
						</view>

						<view v-if="selectIndex == 4 && (detail.shopTypeDetails == 1 || detail.shopTypeDetails == 3)"
							class="select-wonderfulreview">
							<!--  #ifdef MP-WEIXIN  -->
							<view v-if="dataList.length">
								<custom-waterfalls-flow imageKey="coverImg" ref="waterfallsFlowRef" :value="dataList"
									@imageClick="jumpWonderfulReviewDetail">
									<view class="select-wonderfulreview-item" v-for="(item, index) in dataList" :key="index"
										slot="slot{{index}}" @click="jumpWonderfulReviewDetail(item)">
										<view class="select-wonderfulreview-title">
											<text>{{ item.title }}</text>
										</view>
										<view class="select-wonderfulreview-sj u-flex">{{
											item.activityBeginTime
										}}</view>
									</view>
								</custom-waterfalls-flow>
							</view>
							<view v-else>
								<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
								</u-empty>
							</view>
							<!--  #endif -->
						</view>

					</view>
					<view v-if="selectIndex == 2 && detail.shopTypeDetails == 2" style="padding-top: 20rpx;">
						<view v-if="dataList.length">
							<GoodlList :proList.sync="dataList"></GoodlList>
						</view>
						<view v-else>
							<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png">
							</u-empty>
						</view>
					</view>
					<view v-else-if="selectIndex == 5 && detail.shopTypeDetails != 2" style="padding-top: 20rpx;">
						<GoodlList :proList.sync="dataList"></GoodlList>
						<view v-if="dataList.length == 0">
							<u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/list.png" text="暂无">
							</u-empty>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<u-popup :show="appointVisble" @close="appointVisble = false" mode="bottom">
			<view class="appoint">
				<text class="appoint-title" style="margin-bottom: 46rpx">客户参与活动时间意愿调查（可多选）</text>
				<view class="appoint-btn-view">
					<view v-for="(item, i) in appointList" class="appoint-btn" @click="clickAppoint(i)" :key="i" :style="{
						color: item.ischecked ? '#D91B1B' : '#222222',
						background: item.ischecked ? '#FFF1F1' : '#F8F8F8',
					}">
						<text class="appoint-btn-text">{{ item.name }}</text>
					</view>
				</view>
				<view style="display: flex; justify-content: center">
					<view class="appoint-submit" @click="submitAppoint">提交</view>
				</view>
			</view>
		</u-popup>
		<u-popup :safeAreaInsetBottom="false" :show="appointSuccessVisble" :closeOnClickOverlay="false" mode="center"
			customStyle="width:90%;borderRadius:20rpx">
			<view class="appointsuccess">
				<text class="appointsuccess-title"
					style="margin-bottom: 48rpx; margin-top: 20rpx">已收到您的需求，后续我们会考虑再次举办该活动，您也可以关注下我们其他活动。</text>
				<view style="display: flex; justify-content: center; margin-bottom: 30rpx">
					<view class="appointsuccess-submit" style="margin: 0" @click="appointSuccessVisble = false">好的
					</view>
				</view>
			</view>
			<request-loading></request-loading>
		</u-popup>
	</view>
</view></template>

<script>
import {
	tologin
} from "@/utils/index.js";
import carousel from "@/components/carousel/index.vue";
import GoodlList from '@/components/goodList/goodList.vue'

export default {
	components: {
		carousel,
		GoodlList
	},
	computed: {
		// 状态栏高度适配
		navbarHeight() {
			return uni.getStorageSync("menuInfo") ?
				uni.getStorageSync("menuInfo").contentTop :
				0;
		},
		height() {
			return `calc(100vh - ${this.navbarHeight}px - 10px)`;
		},
	},
	data() {
		return {
			index: 0,
			isShowpage: false,
			id: "",
			detail: {},
			banner: [],
			bannercurrent: 0,
			selectList: [],
			selectIndex: 0,
			dataList: [],
			searchField: {
				current: 1,
				size: 10,
				shopId: "",
				activitySignUpStatus: 2,
			},
			isMany: true,
			lng: "",
			lat: "",
			activityId: "",
			appointList: [],
			appointVisble: false,
			appointSuccessVisble: false,
			grouplist: [],
			shopType: 0,
			iscommission: 0
		};
	},
	onLoad(option) {
		this.searchField.shopId = option.id;
		if (option.iscommission) {
			this.iscommission = option.iscommission
		}
		this.lng = uni.getStorageSync("lng") ? uni.getStorageSync("lng") : "";
		this.lat = uni.getStorageSync("lat") ? uni.getStorageSync("lat") : "";
		this.queryDetail();
	},
	methods: {
		Onjoinshop(item, index, type) {
			if (item.isSelection == 0) {
				this.$request.post("/coc-active/api/v1/expert/shop/selection/add", {
					type: type,
					relatedId: item.id
				}).then(res => {
					if (res.code == 200) {
						if (type == 4) {
							this.grouplist[index].isSelection = 1
						} else {
							this.dataList[index].isSelection = 1
						}

						uni.$u.toast('加入小店成功')
					} else {
						uni.$u.toast(res.message)
					}
				})
			} else {
				this.$request.post("/coc-active/api/v1/expert/shop/selection/remove", {
					type: type,
					relatedId: item.id
				}).then(res => {
					if (res.code == 200) {
						if (type == 4) {
							this.grouplist[index].isSelection = 0
						} else {
							this.dataList[index].isSelection = 0
						}

						uni.$u.toast('移出小店成功')
					} else {
						uni.$u.toast(res.message)
					}
				})
			}
		},
		OnPushDetail(item) {
			uni.navigateTo({
				url: '/pages/grouppurchase/detail?id=' + item.id + '&iscommission=' + this.iscommission,
			})
		},
		// 转跳单品套餐
		Onpushdanpin(item) {
			uni.navigateTo({
				url: "/pages/grouppurchase/packagedetail?id=" + item.productId
			});
		},
		//跳转关联活动详情
		jumpActivity(id) {
			uni.navigateTo({
				url: "/pages/home/activityDetail/index?id=" + id + '&iscommission=' + this.iscommission,
			});
		},
		//跳转精彩回放详情
		jumpWonderfulReviewDetail(item) {
			uni.navigateTo({
				url: "/pages/home/wonderfulReview/detail?id=" + item.id,
			});
		},
		//查看详情
		queryDetail() {
			this.$showLoading();
			let msg = {
				shopId: this.searchField.shopId,
			};
			if (this.lng) {
				msg.lng = this.lng;
			}
			if (this.lat) {
				msg.lat = this.lat;
			}
			this.$newrequest
				.post("/coc-active/api/v1/activityShop/index", msg)
				.then((res) => {
					if (res.code == 200) {
						let shopTag = res.data.shopTag.split(',')
						if (shopTag.length == 1) {
							this.shopType = shopTag[0]
						} else {
							this.shopType = 12
						}
						// shopTypeDetails 1 活动商家 2 积分商家 3 活动及积分商家
						// shoptype  1活动商家  2团购商家
						// 只是活动商家 不是团购商家 1 1
						// 活动商家+团购商家 1 2
						// 活动+积分  + 团购 3 2
						// 活动+积分  非团购 3 1
						// 只是积分商家(完) 2
						// 活动  活动+团购  1 12

						if (res.data.shopTypeDetails == 2) {
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "积分商城",
								id: 5
							}
							]
						} else if (res.data.shopTypeDetails == 1 && this.shopType == 1) {
							// shoptype = 1 只是活动商家 不是团购商家
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "报名中",
								id: 2
							},
							{
								name: "已结束",
								id: 3
							},
							{
								name: "精彩回放",
								id: 4
							},
							]
						} else if (res.data.shopTypeDetails == 1 && this.shopType != 1) {
							// shoptype = 2 活动商家+团购商家
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "团购套餐",
								id: 1
							},
							{
								name: "报名中",
								id: 2
							},
							{
								name: "已结束",
								id: 3
							},
							{
								name: "精彩回放",
								id: 4
							},
							]
						} else if (res.data.shopTypeDetails == 3 && this.shopType == 2) {
							// shoptype = 2  活动+积分 + 团购
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "团购套餐",
								id: 1
							}, {
								name: "积分商城",
								id: 5
							}
							]
						} else if (res.data.shopTypeDetails == 3 && this.shopType == 1) {
							// 活动+积分  非团购
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "报名中",
								id: 2
							},
							{
								name: "已结束",
								id: 3
							},
							{
								name: "精彩回放",
								id: 4
							},
							{
								name: "积分商城",
								id: 5
							}
							]
						} else if (res.data.shopTypeDetails == 3 && this.shopType != 1) {
							// 活动+积分 + 团购
							this.selectList = [{
								name: "主页",
								id: 0
							},
							{
								name: "团购套餐",
								id: 1
							},
							{
								name: "报名中",
								id: 2
							},
							{
								name: "已结束",
								id: 3
							},
							{
								name: "精彩回放",
								id: 4
							},
							{
								name: "积分商城",
								id: 5
							}
							]
						}
						if (this.iscommission == 1) {
							this.selectList = [{
								name: "团购套餐",
								id: 1
							},
							{
								name: "活动",
								id: 2
							},

							]

							this.getgrouplist()
							this.selectIndex = 1
						}
						this.selectList.splice(1, 0, {
							name: '单品套餐',
							id: '6'
						})
						this.dataList = this.dataList.concat(res.data.records);
						this.detail = res.data;
						let list = [];
						if (res.data.shopCarousels) {
							res.data.shopCarousels.forEach(function (data) {
								if (data.type) {
									if (data.status == 2) {
										list.push({
											url: data.carouselUrl,
											type: "image",
										});
									} else {
										list.push({
											url: data.carouselUrl,
											type: "video",
										});
									}
								} else {
									list.push({
										url: data.carouselUrl,
										type: "image",
									});
								}


							});
						}
						this.banner = list;
					} else {
						uni.showToast({
							title: res.message,
							icon: "none",
							duration: 2000,
						});
					}
				})
				.finally(() => {
					this.isShowpage = true;
					this.$hideLoading();
				});
		},
		getGoodList() {
			let msg = Object.assign({}, this.searchField);
			if (!this.isMany) {
				return;
			}
			msg.status = 1
			this.isMany = false;
			this.$newrequest.post("/coc-active/api/v2/score/shop/product/list", msg).then(res => {
				if (res.code == 200) {
					if (res.data.records.length >= msg.size) {
						this.isMany = true;
					}
					this.dataList = this.dataList.concat(res.data.records);
				} else {
					uni.showToast({
						title: res.message,
						icon: "none",
						duration: 2000,
					});
				}
			})
		},
		getgrouplist() {
			this.$newrequest.post("/coc-active/api/v1/group/list", {
				current: 1,
				shopId: this.searchField.shopId,
				size: 99,
				title: '',
				type: 1,
				saleType: 0
			}).then(res => {
				this.grouplist = res.data.records
			})
		},
		tabClick(item) {
			if (item.id == this.selectIndex) {
				return;
			}
			this.dataList = [];
			this.selectIndex = item.id;
			this.searchField.current = 1;
			this.isMany = true;
			if (this.detail.shopTypeDetails == 2 && item.id == 2) {
				this.getGoodList()
			} else if (item.id == 2 || item.id == 3) {
				this.searchField.activitySignUpStatus = item.id == 2 ? 2 : 3;
				this.queryActivityList();
			} else if (item.id == 4) {
				this.queryWonderfulReviewList();
			} else if (item.id == 5) {
				this.getGoodList()
			} else if (item.id == 1) {
				this.getgrouplist()
			} else if (item.id == 6) {
				this.getexclusiveToMembers()
			}
		},
		// 活动单品套餐
		getexclusiveToMembers() {
			let msg = Object.assign({}, this.searchField);
			msg.saleType = 1
			msg.size = 99
			this.$newrequest.post("/coc-active/api/v1/group/exclusiveToMembers", msg).then(res => {
				if (res.code == 200) {
					this.dataList = this.dataList.concat(res.data.records);
				} else {
					uni.showToast({
						title: res.message,
						icon: "none",
						duration: 2000,
					});
				}
			})
		},
		//查询活动列表
		queryActivityList() {
			let msg = Object.assign({}, this.searchField);
			this.$newrequest
				.post("/coc-active/api/v1/activityShop/activity/list", msg)
				.then((res) => {
					if (res.code == 200) {
						this.dataList = this.dataList.concat(res.data);
					} else {
						uni.showToast({
							title: res.message,
							icon: "none",
							duration: 2000,
						});
					}
				});
		},
		//查询精彩回放列表
		queryWonderfulReviewList() {
			let msg = Object.assign({}, this.searchField);
			if (!this.isMany) {
				return;
			}
			this.isMany = false;
			this.$newrequest
				.post("/coc-active/api/v1/activityShop/activity/marvellous/list", msg)
				.then((res) => {
					if (res.code == 200) {
						if (res.data.records.length >= this.searchField.size) {
							this.isMany = true;
						}
						this.dataList = this.dataList.concat(res.data.records);
					} else {
						uni.showToast({
							title: res.message,
							icon: "none",
							duration: 2000,
						});
					}
				});
		},
		//滚动到底部
		scrollBottom() {
			if (this.selectIndex == 4) {
				this.searchField.current += 1;
				this.queryWonderfulReviewList();
			} else if (this.selectIndex == 5) {
				this.searchField.current += 1;
				this.getGoodList()
			}
		},
		//预览图片
		previewImg() {
			uni.previewImage({
				urls: [this.detail.baseCode],
			});
		},
		//预约初始化
		appointInit() {
			this.appointList = [{
				id: 1,
				name: "周末",
				ischecked: false
			},
			{
				id: 2,
				name: "节假日",
				ischecked: false
			},
			{
				id: 3,
				name: "晚上",
				ischecked: false
			},
			{
				id: 4,
				name: "都可以",
				ischecked: false
			},
			];
		},
		//打开预约
		openAppoint(id) {
			if (tologin() !== true) {
				return;
			}
			this.appointInit();
			this.activityId = id;
			this.appointVisble = true;
		},
		//选择预约选项
		clickAppoint(index) {
			this.appointList[index].ischecked = !this.appointList[index].ischecked;
		},
		//提交预约
		submitAppoint() {
			if (tologin() !== true) {
				return;
			}
			let time = [];
			this.appointList.map((m) => {
				if (m.ischecked) {
					time.push(m.id);
				}
			});
			if (time.length === 0) {
				uni.showToast({
					title: "请选择预约时间",
					icon: "none",
					duration: 2000,
				});
				return;
			}
			this.$newrequest
				.post("/coc-active/api/v1/marvellous_activity/appointment", {
					activityId: this.activityId,
					time,
				})
				.then((res) => {
					if (res.code == 200) {
						this.appointVisble = false;
						this.appointSuccessVisble = true;
					} else {
						uni.showToast({
							title: res.message,
							icon: "none",
							duration: 2000,
						});
					}
				});
		},
		//显示位置
		showLocation() {
			// #ifdef  MP-WEIXIN

			let _this = this
			uni.openLocation({
				latitude: _this.detail.lat,
				longitude: _this.detail.lng,
				success: function () {
					//console.log('success');
				},
			});
			// #endif
		},
		//拨打电话
		clickTel() {
			uni.makePhoneCall({
				phoneNumber: this.detail.baseMobile,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.page {
	color: #222222;
}

.content {
	padding: 0 25rpx 0 25rpx;
}

.business {
	margin-top: 15rpx;
	padding: 15rpx 0 15rpx 15rpx;
	background: #ffffff;
	border-radius: 10rpx;

	.business-shop-img {
		width: 170rpx;
		height: 170rpx;
		border-radius: 10rpx;
	}

	.business-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
	}

	.business-btn {
		width: 100rpx;
		height: 35rpx;
		background: #d91b1b;
		border-radius: 10rpx;
		color: #ffffff;
		margin-right: 16rpx;
	}

	.business-text {
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.business-dw-img {
		width: 21rpx;
		height: 25rpx;
	}

	.business-dw {
		margin-left: 12rpx;
	}

	.business-dh-img {
		width: 21rpx;
		height: 22rpx;
		margin-left: 31rpx;
	}

	.business-dh {
		margin-left: 9rpx;
	}

	.business-pf-img {
		width: 24rpx;
		height: 24rpx;
	}

	.business-pf {
		margin-left: 11rpx;
	}

	.business-cc-img {
		width: 30rpx;
		height: 26rpx;
		margin-left: 11rpx;
	}

	.business-cc {
		margin-left: 7rpx;
	}

	.business-rs-img {
		width: 28rpx;
		height: 24rpx;
		margin-left: 16rpx;
	}

	.business-rs {
		margin-left: 8rpx;
	}
}

.select {
	margin-top: 15rpx;
	background: #ffffff;
	border-radius: 10rpx;
	padding-bottom: 25rpx;

	.select-content {
		padding: 0 25rpx;
	}

	.select-activity {
		margin-top: 27rpx;
	}

	.select-activity-item {
		margin-bottom: 14rpx;
		border-radius: 0rpx 0rpx 10rpx 10rpx;
	}

	.select-activity-item-img {
		width: 650rpx;
		height: 300rpx;
		border-radius: 10rpx 10rpx 0rpx 0rpx;
	}

	.select-activity-item-title {
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		max-width: 450rpx;
	}

	.select-activity-item-btn {
		width: 140rpx;
		height: 40rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}

	.select-wonderfulreview {
		margin-top: 32rpx;
	}

	.select-wonderfulreview-item {
		margin-bottom: 14rpx;
		background: #f8f8f8;
		border-radius: 0rpx 0rpx 10rpx 10rpx;
		padding: 20rpx 14rpx 20rpx 12rpx;
	}

	.select-wonderfulreview-title {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
	}

	.select-wonderfulreview-sj {
		width: 100rpx;
		height: 40rpx;
		background: #000000;
		opacity: 0.5;
		border-radius: 10rpx;
		position: absolute;
		top: 16rpx;
		left: 14rpx;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
	}

	.select-shop {
		margin-top: 40rpx;
	}

	.select-shop-text {
		font-size: 28rpx;
		font-family: PingFang-SC-Medium;
		// font-weight: 500;
		margin-bottom: 50rpx;
		white-space: pre-wrap;
	}

	.select-shop-one {
		margin-bottom: 8rpx;
	}

	.select-shop-one-img {
		width: 650rpx;
		border-radius: 10rpx;
	}

	.select-shop-two {
		justify-content: space-between;
		margin-bottom: 15rpx;
	}

	.select-shop-two-img {
		width: 320rpx;
		border-radius: 10rpx;
	}

	.select-shop-video {
		width: 100%;
		height: 400rpx;
		margin-bottom: 15rpx;
		border-radius: 10rpx;
	}
}

.appoint {
	padding: 42rpx 50rpx 50rpx 50rpx;

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
}

.appointsuccess {
	padding: 42rpx 30rpx 20rpx 30rpx;

	.appointsuccess-title {
		font-size: 28rpx;
		font-weight: bold;
		font-family: PingFang SC;
		color: #222222;
		display: inline-block;
	}

	.appointsuccess-submit {
		width: 200rpx;
		height: 60rpx;
		background: #d91b1b;
		border-radius: 10rpx;
		margin-top: 48rpx;
		text-align: center;
		line-height: 60rpx;
		color: #ffffff;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
	}
}

.u-flex {
	display: flex;
	justify-content: center;
	align-items: center;
}

.u-flex-al {
	display: flex;
	align-items: center;
}

.ellipsis {
	display: inline-block;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

::v-deep .u-tabs__wrapper__nav__item {
	padding: 0 33rpx !important;
}

// ::v-deep .u-tabs__wrapper__nav__item:first-child {
// 	padding: 0 33rpx 0 0 !important;
// }
.card {
	background: #FFFFFF;
	border-radius: 10rpx;
	padding: 24rpx;
	position: relative;
}

.preferentialpng {
	position: absolute;
}

.discount-btn {
	border: 1rpx solid #D91B1B;
	border-radius: 14rpx;
	width: 60rpx;
	height: 28rpx;
	line-height: 28rpx;
	font-size: 20rpx;
	text-align: center;
	margin-left: 10rpx;
}

.buy-btn {
	margin-top: 16rpx;
	width: 107rpx;
	height: 40rpx;
	background: #D91B1B;
	border-radius: 20rpx;
	line-height: 40rpx;
	text-align: center;
	font-size: 24rpx;
	color: #FFFFFF;
}

.graybtn {
	background-color: #999999;
}

.price-inpng {
	// position: absolute;
	// top: 75rpx;
	// left: 50%;
	// 	transform: translate(-50%, -50%);
	text-align: center;
	position: relative;
	top: 64rpx;
	right: 4rpx;
}

.bg999 {
	background-color: #999999 !important;
}
</style>
