<template>
	<view class="page">
		<view v-if="isshowpage">
			<carousel v-if="getadUrl" :list="getswiper()"
				:topStyle="{ margin: '20rpx', width: '710rpx', borderRadius: '12rpx' }" height="200px" urlkey="url"
				:dataType="1" :indicatorType="4" :clickType="2" :autoPlay="autoPlay">
			</carousel>
			<view class="price-top">
				<view style="margin-left: 25rpx;margin-top: -10rpx;">
					<view>
						￥<text style="font-size: 32rpx;font-weight: bold;margin-left: 2rpx;">{{
							dataList.flashSalePrice }}</text>
						<text v-if="dataList.bankCardPrice > 0" class=" txtColorWhite" style="margin-left: 10rpx;">
							<text v-if="dataList.activityPaymentPreferenceId == 6"><text
									class="size20">工行信用卡专属价:</text><text class="size24 fwb">￥</text><text class="fwb"
									style="font-size: 32rpx;">{{ dataList.bankCardPrice }}</text></text>
							<text v-if="dataList.activityPaymentPreferenceId == 5"><text
									class="size20">农行信用卡专属价:</text><text class="size24 fwb">￥</text><text class="fwb"
									style="font-size: 32rpx;">{{ dataList.bankCardPrice }}</text></text>
							<text v-if="dataList.activityPaymentPreferenceId == 7"><text
									class="size20">邮储信用卡专属价:</text><text class="size24 fwb">￥</text><text class="fwb"
									style="font-size: 32rpx;">{{ dataList.bankCardPrice }}</text></text>
							<text v-if="dataList.activityPaymentPreferenceId == 8"><text
									class="size20">民生信用卡专属价:</text><text class="size24 fwb">￥</text><text class="fwb"
									style="font-size: 32rpx;">{{ dataList.bankCardPrice }}</text></text>
							<text v-if="dataList.activityPaymentPreferenceId == 10"><text class="size20">官方补贴价:</text><text
									class="size24 fwb">￥</text><text class="fwb" style="font-size: 32rpx;">{{
										dataList.bankCardPrice }}</text></text>
						</text>
					</view>
					<view class="size20">
						<text class="txtls">{{ dataList.marketPriceName }}￥{{ dataList.marketPrice }}</text>
						<!-- <text
							style="margin-left: 30rpx;">库存已抢{{dataList.percentage}}%</text> -->
					</view>
				</view>
				<view style="margin-right: 24rpx;text-align: right;">
					<view>
						抢购截止时间
					</view>
					<view>
						<u-count-down :time="dataList.changeTime" format="HH:mm:ss" autoStart millisecond
							@change="onChange">
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
			<view class="card">
				<view class="u-flex" style="flex-wrap: wrap;">
					<view v-for="(item, index) in dataList.tagNamesList" :key="index" class="label-item">
						{{ item }}
					</view>
				</view>
				<!--  #ifdef MP-WEIXIN  -->
				<!-- 人保横幅 -->
				<view @click="Oncard(1)" style="text-align: center;margin-top: 24rpx;"
					v-if="dataList.activityPaymentPreferenceId == 4">
					<image style="width: 650rpx;height: 58rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678359774395.png">
					</image>
				</view>

				<!-- 农行横幅 -->
				<view @click="Oncard(2)" style="text-align: center;margin-top: 24rpx"
					v-if="dataList.activityPaymentPreferenceId == 5">
					<image style="width: 650rpx;height: 58rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230314/file_1678777956124.png">
					</image>
				</view>
				<!-- 工行横幅 -->
				<view @click="Oncard(3)" style="text-align: center;margin-top: 24rpx"
					v-if="dataList.activityPaymentPreferenceId == 6">
					<image style="width: 650rpx;height: 58rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230314/file_1678777988027.png">
					</image>
				</view>
				<!-- 邮储横幅 -->
				<view @click="Oncard(4)" style="text-align: center;margin-top: 24rpx"
					v-if="dataList.activityPaymentPreferenceId == 7">
					<image style="width: 650rpx;height: 58rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230928/file_1695861861848.png">
					</image>
				</view>
				<!-- 民生横幅 -->
				<view style="text-align: center;margin-top: 24rpx" v-if="dataList.activityPaymentPreferenceId == 8">
					<image style="width: 650rpx;height: 58rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230928/file_1695861938600.png">
					</image>
				</view>
				<!--  #endif -->
				<view class="size32 fwb moreLine mt10" style="line-height: 48rpx;">
					{{ dataList.title }}
				</view>
				<view style="display: flex;margin-top: 30rpx;align-items: center;">
					<view v-if="isExpert == 1 && token && dataList.maxCommissionPrice && iscommission != 1" class="u-flex">
						<view class="rebate-img rebate-size"></view>
					</view>
					<view
						v-if="isExpert == 1 && token && dataList.maxCommissionPrice && dataList.maxCommissionPrice > dataList.minCommissionPrice && iscommission != 1"
						class="rebate-style" style="margin-right: 24rpx;">
						{{ dataList.maxCommissionPrice }}
					</view>
					<view
						v-if="isExpert == 1 && token && dataList.maxCommissionPrice && dataList.maxCommissionPrice == dataList.minCommissionPrice && iscommission != 1"
						class="rebate-style" style="margin-right: 24rpx;">
						{{ dataList.minCommissionPrice }}
					</view>
					<!-- <view style="font-size: 24rpx;margin-right: 10rpx;line-height: 36rpx">
						已售<text style="margin-left: 10rpx;">{{dataList.saleNum}}/{{dataList.stock}}</text>
					</view> -->
					<!-- 	<view v-for="(item,index) in dataList.heads" :key="index">
						<view style="margin-left: 12rpx;" v-if="index<6">
							<u-avatar :src="item" size="20"></u-avatar>
						</view>
					</view>
					<view v-if="dataList.heads.length>6" style="margin-left: 10rpx;">
						<image src="@/static/image/sangedian.png" style="width: 40rpx;height: 40rpx;"></image>
					</view> -->
					<view class="size24">
						仅剩：{{ dataList.stock - dataList.saleNum }}份<text class="mainRed ml20">限时限量 抢占先机</text>
					</view>

				</view>
				<view v-if="iscommission == 1">
					<commission :price='dataList.commissionPrice' :proportion='dataList.rate'></commission>
				</view>
			</view>

			<view class="card-enterprice" @click="OnPushshopHome">
				<view class="u-flex jsb alc">
					<view>{{ dataList.shopName }}</view>
					<!--  #ifdef MP-WEIXIN  -->
					<view class="mainhome-btn">主页</view>
					<!--  #endif -->
				</view>
				<view v-if="dataList.openingHoursMsg" class="size24 mt20">
					营业时间 {{ dataList.openingHoursMsg }}
				</view>
				<view class="size24 mt20" @click.stop="OnPushMap">
					{{ dataList.baseAddress }}
				</view>
			</view>
			<!-- 达人推荐 -->
			<view style="padding: 0 25rpx; ">
				<recommendX v-if="id" fromType="1" :relatedId="id" :relatedType="4" :isTitle="3"></recommendX>
			</view>
			<floatVideo :relatedType="4" :relatedId="id"></floatVideo>

			<view class="title-info" style="margin-top: 25rpx;">
				购买须知
			</view>
			<view class="card-goumai">
				<ul class="ul-item">
					<li v-if="dataList.holidaysIsUse == 1" class="li-item" style="margin-top: 0rpx;"><text
							class="txtDarkGray">节假日通用</text></li>
					<li v-if="dataList.holidaysIsUse == 0 && dataList.groupPurchaseNotUseTimesMsg" class="li-item"><text
							class="txtDarkGray">不可用日期:{{ dataList.groupPurchaseNotUseTimesMsg }}</text></li>
					<li class="li-item"><text class="txtDarkGray">使用截止时间: {{ dataList.expirationTime }}</text></li>
					<li v-if="dataList.nonRefund == 1" class="li-item"><text
							class="txtDarkGray">本商品为限时限量优惠团购，请您在订单使用时间内及时消费使用，一经购买不支持退款</text></li>
					<li v-if="dataList.remark" class="li-item"><text class="txtDarkGray">特殊说明：{{ dataList.remark }}</text>
					</li>
				</ul>
			</view>

			<view class="title-info">
				活动详情
			</view>
			<view class="content" v-if="dataList.detail">
				<view>
					<u-parse :content="dataList.detail"></u-parse>
				</view>
			</view>
			<view class="card-comments" style="margin: 25rpx;" v-if="commentList.length">
				<!-- 用户评价 -->
				<detailEvaluate :commentList="commentList" :commentInfo="commentInfo" >
				</detailEvaluate>
			</view>
			<view class="title-info">
				价格说明
			</view>
			<view class="card-goumai">
				<ul class="ul-item">
					<li class="li-item" style="margin-top: 0rpx;"><text class="txtDarkGray">划线价格</text>
						<view class="txtDarkGray mt10">划线价格为参考价，该价格指商品或服务的门市价、指导价、零售价或该商品或服务曾经展示过的销售价等，并非原价；由于商品信息实时更新、市场价格波动等可能会与您购买时展示的不一致，该价格仅供您参考。</view>
					</li>
					<li class="li-item "><text class="txtDarkGray">非划线价格</text>
						<view class="txtDarkGray mt10">商品或服务的实时标价，为划线价基础上计算出的优惠金额。具体成交价格根据商品参与活动，或使用优惠券等发生变化，最终以订单结算页价格为准。
此说明仅当出现价格比较时有效。若商家单独对划线价格进行说明的，以商家的表述为准。
						</view>
					</li>
					<!-- <li class="li-item"><text class="txtDarkGray">商家详情页 (含主图) 以图片或文字形式标注的一口价、促销
							价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动
							和时段等情</text></li>
					<li class="li-item"><text class="txtDarkGray">此说明仅当出现价格比较时有效，若商家单独对划线价格进行 说明的，以商家的表述为准。</text></li> -->
				</ul>
			</view>
			<!--  #ifdef MP-WEIXIN  -->
			<view v-if="iscommission == 0" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view  jsb flex alc" :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
					<view class="u-flex"
						style="margin-top: 14rpx;width: 300rpx;justify-content: space-around;font-size: 24rpx;">
						<view @click="Onaddcollections"
							style="margin-left: 20rpx;text-align: center;position: relative;top: -8rpx;">
							<view v-if="dataList.isCollection == 2 || dataList.isCollection == null">
								<image src="@/static/image/weishoucang.png" style="width: 56rpx;height: 56rpx;"></image>
							</view>
							<view v-if="dataList.isCollection == 1">
								<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060433937.png" style="width: 56rpx;height: 56rpx;">
								</image>
							</view>
							<view v-if="dataList.isCollection == 2 || dataList.isCollection == null"
								style="margin-top: -6rpx;">收藏
							</view>
							<view v-if="dataList.isCollection == 1" style="margin-top: -6rpx;">已收藏</view>
						</view>
						<view style="margin-left: 20rpx;text-align: center;" @click="popposter">
							<view>
								<image src="@/static/image/share.png" style="width: 41rpx;height: 41rpx;"></image>
							</view>
							<view style="margin-top: 2rpx;">分享</view>
						</view>
						<view style="margin-left: 20rpx;text-align: center;position: relative;top: -9.5rpx;">
							<view>
								<image src="@/static/image/kefu.png" style="width: 56rpx;height: 56rpx;"></image>
							</view>
							<view style="margin-top: -6rpx;">客服</view>
							<button open-type='contact' session-from='' class="kefu-contact"
								style="position: absolute;height: 56px;top: 0;opacity: 0;"></button>
						</view>
					</view>
					<view @click="handleComment" class="btnComment tac mainRed size28">评价</view>
					<view v-if='!istimeend' class="signup">
						<text style="background-color: #999999;">已结束</text>
					</view>
					<view v-else-if='dataList.status == 2' class="signup">
						<text style="background-color: #999999;">已下架</text>
					</view>
					<view v-else-if='surplusStock == 0' class="signup">
						<text style="background-color: #999999;">库存已抢光</text>
					</view>
					<view @click="Onopen" class="signup" v-else>
						<text>立即抢购</text>
					</view>
				</view>
				<view class="safe-bottom-height"></view>
			</view>
			<view v-else-if="iscommission == 1" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view " :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
					<joinshopbtn :ids="dataList.id" :type='4' :isSelection='dataList.isSelection'></joinshopbtn>
				</view>
			</view>
			<!--  #endif -->

		</view>
		<u-popup :safeAreaInsetBottom='false' :show="showpop" @close="showpop = false" mode="bottom">
			<view class="pop-singup">
				<view class="u-flex" style="margin-bottom: -30rpx;">
					<view style="position: relative;bottom: 40rpx;border: 5rpx #ffffff solid;border-radius: 10rpx;">
						<image mode="aspectFill" style="width: 185rpx;height: 185rpx;border-radius: 10rpx;"
							:src="dataList.coverPicture">
						</image>
					</view>
					<view style="margin-left: 20rpx">
						<view>
							<view class="u-flex alc">
								<view style="color: #d91b1b;font-size: 32rpx;font-weight: bold;">
									<text style="font-size: 20rpx;">￥</text><text style="font-size: 32rpx;">{{
										currentflashSalePrice }}</text>
								</view>
								<view v-if="isExpert == 1 && token && dataList.maxCommissionPrice" class="u-flex ml20">
									<view class="u-flex">
										<view class="rebate-img rebate-size"></view>
									</view>
									<view class="rebate-style" style="margin-right: 24rpx;" v-if="currentmeal == null">
										{{ dataList.minCommissionPrice }}
									</view>
									<view class="rebate-style" style="margin-right: 24rpx;" v-else>
										{{ dataList.groupDetailsMealVOS[currentmeal].commissionPrice }}
									</view>
								</view>

							</view>
						</view>
						<view v-if="dataList.bankCardPrice > 0 && bankCardPrice.toFixed(2) > 0" class="size24 mt10" style="border-radius: 10rpx;">
							<view v-if="dataList.activityPaymentPreferenceId == 6" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view clk>工行信用卡用户立减</view>
									<view class="mainRed">{{ bankCardPrice.toFixed(2) }}
									</view>
									<view>元</view>
								</view>
							</view>
							<view v-if="dataList.activityPaymentPreferenceId == 5" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view>农行信用卡用户立减</view>
									<view class="mainRed">{{ bankCardPrice.toFixed(2) }}
									</view>
									<view>元</view>
								</view>
							</view>
							<view v-if="dataList.activityPaymentPreferenceId == 7" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view clk>邮储信用卡用户立减</view>
									<view class="mainRed">{{ bankCardPrice.toFixed(2) }}
									</view>
									<view>元</view>
								</view>
							</view>
							<view v-if="dataList.activityPaymentPreferenceId == 8" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view clk>民生信用卡用户立减</view>
									<view class="mainRed">{{ bankCardPrice.toFixed(2) }}
									</view>
									<view>元</view>
								</view>
							</view>
							<view v-if="dataList.activityPaymentPreferenceId == 10" class="u-flex alc"
								style="background-color: #f6f6f6;padding: 14rpx">
								<view class="u-flex alc">
									<view>官方补贴下单支付立减</view>
									<view class="mainRed">{{ bankCardPrice.toFixed(2) }}
									</view>
									<view>元</view>
								</view>
							</view>
						</view>
						<view style="font-size: 24rpx;color: #666666" class="mt10">
							库存{{ currentstock }}
						</view>
					</view>
				</view>
				<view style="margin-top: 30rpx;margin-bottom: 30rpx;">
					<u-divider :text="null"></u-divider>
				</view>
				<view style="margin-left: 28rpx;">
					商品套餐
				</view>
				<view class="u-flex" style="flex-wrap: wrap;margin-top: 32rpx;">
					<view @click="choosemeal(item, index)" v-for="(item, index) in dataList.groupDetailsMealVOS"
						:key="item.id" style="margin-left: 32rpx;" class="pop-btn"
						:class="{ 'current-btn': index == currentmeal }">
						{{ item.name }}
					</view>
				</view>
				<view class="btn">
					<text @click="Onsingup">立即抢购</text>
				</view>
			</view>
		</u-popup>
		<request-loading></request-loading>
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
						{{ dataList.posterDesc }}
					</view>
					<view class="tac mt20 " @click="Oncopy(dataList.posterDesc)">
						<image style="width: 230rpx;height: 60rpx;"
							src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
						</image>
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup :closeable='true' round='8' :show="showsignup" mode="bottom" @close="closesignup">
			<view class="tac fwb size32" style="margin-top: 40rpx;">
				<text>预约报名</text>
			</view>
			<view class="u-flex jsc top-info">
				<view class="u-flex">
					<image style="height: 56rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230425/file_1682386335949.png">
					</image>
				</view>
			</view>
			<view style="margin: 50rpx 30rpx;">
				<u--form labelWidth='60' :labelStyle="{ fontSize: '32rpx' }" labelPosition="left" :model="signuodata"
					:rules="rules" ref="uForm">
					<u-form-item :required='true' label="姓名" prop="name" borderBottom ref="item1">
						<u--input placeholder="请输入姓名" v-model="signuodata.name" border="none"></u--input>
					</u-form-item>
					<u-form-item :required='true' label="手机号" prop="mobile" borderBottom ref="item1">
						<u--input placeholder="请输入手机号" v-model="signuodata.mobile" border="none"></u--input>
					</u-form-item>
				</u--form>
			</view>
			<view class="u-flex" style="margin-top: 20rpx;justify-content: center;">
				<view>
					<u-radio-group v-model="radiovalue1" placement="column">
						<u-radio activeColor='#D91B1B' :customStyle="{ marginBottom: '8px' }" :name="1">
						</u-radio>
					</u-radio-group>
				</view>
				<text style="font-size: 30rpx">我已阅读并同意</text>
				<text @click="OnPushPrivacyPolicy" style="font-size: 30rpx;color: #D91B1B">
					《个人信息保护声明》
				</text>
			</view>
			<view style="display: flex;justify-content: center;margin-top: 50rpx"
				:style="{ paddingBottom: safeHeight > 0 ? 0 : '50rpx' }">
				<view @click="addClue" style="width: 380rpx;
				              height: 76rpx;
				              background: #D91B1B;
				              border-radius: 38rpx;
							  line-height: 76rpx;
							  text-align: center;
							  font-size: 32rpx;
							  color: #ffffff;">
					提交
				</view>
			</view>
		</u-popup>
		<view style="height: 200rpx;"></view>
		<view v-if="!istimeend || dataList.status == 2 || surplusStock == 0" class="btn-rescue" @click="submitAppoint">
			<image style="width: 117rpx;height: 132rpx;" src="./static/image/appoint.png">
			</image>
		</view>
	</view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
import commission from "@/components/commission/index.vue"
import recommendX from "@/components/darenRecommend/recommendX.vue"
import floatVideo from '@/components/floatVideo/index.vue'
import joinshopbtn from "@/components/joinshopbtn/index.vue"
import Poster from '@/components/zhangyuhao-poster/Poster.vue'
import detailEvaluate from '@/components/evaluate/detailEvaluate.vue'
import { getstorage, tologin } from '@/utils/index.js'
export default {
	components: {
		carousel, Poster, commission, joinshopbtn, recommendX, floatVideo, detailEvaluate
	},
	data() {
		return {
			poster: '',
			list: [],
			token: null,
			isExpert: null,
			bankCardPrice: 0,
			surplusStock: 0,
			currentflashSalePrice: 0,
			currentstock: 0,
			radiovalue1: '',
			rules: {
				'name': {
					type: 'string',
					required: true,
					message: '请填写姓名',
					trigger: ['blur', 'change']
				},
				'mobile': [{
					required: true,
					message: '请输入手机号',
					trigger: ['change', 'blur'],
				},
				{
					// 自定义验证函数，见上说明
					validator: (rule, value, callback) => {
						// 上面有说，返回true表示校验通过，返回false表示不通过
						// uni.$u.test.mobile()就是返回true或者false的
						return uni.$u.test.mobile(value);
					},
					message: '手机号码不正确',
					// 触发器可以同时用blur和change
					trigger: ['change', 'blur'],
				}
				],
			},
			signuodata: {
				name: '',
				mobile: ''
			},
			isshowpage: false,
			currentmeal: null,
			showpop: false,
			istimeend: true,
			safeHeight: 0,
			timeData: {},
			autoPlay: false,
			swiperList: [],
			dataList: {},
			openpop: false,
			id: '',
			posterShareUrl: '',
			option: {},
			showpopshare: false,
			choosemealdata: {},
			showsignup: false,
			forwardUserId: null,
			isapp: 0,
			iscommission: 0,
			commentList: [],
			commentInfo: {}
		}
	},

	onLoad(option) {
		let _this = this;
		// uni.removeStorageSync('enter');
		if (option.enter) {
			uni.setStorageSync('enter', option.enter);
		}
		// 二维码分享特殊处理
		if (option.scene && option.scene.indexOf('_enter=117')) {
			uni.setStorageSync('enter', '117');
		}
		if (option.isapp) {
			this.isapp = 1
		}
		if (option.id) {
			this.id = option.id
		}
		if (option.forwardUserId) {
			this.forwardUserId = option.forwardUserId
			if (!uni.getStorageSync('token')) {
				tologin()
			} else if (uni.getStorageSync('token') && uni.getStorageSync('isExpert') != 1) {
				this.tempparentid()
			}

		}
		if (option.scene) {
			this.id = option.scene.split('_')[0]
			this.forwardUserId = option.scene.split('_')[1]
			if (!uni.getStorageSync('token')) {
				tologin()
			} else if (uni.getStorageSync('token') && uni.getStorageSync('isExpert') != 1) {
				this.tempparentid()
			}
		}
		if (!this.forwardUserId) {
			this.forwardUserId = getstorage("userId")
		}
		this.token = uni.getStorageSync('token')
		this.isExpert = uni.getStorageSync('isExpert')
		this.getList()
		if (option.iscommission) {
			this.iscommission = option.iscommission
		}
		uni.$on('saveaddshop', function (data) {
			_this.getList()
		})

	},
	onUnload() {
		if (this.isapp == 1) {
			if (window._51club) {
				window._51club.backIntercept('app');
			}
			if (window.webkit.messageHandlers) {
				window.webkit.messageHandlers.backIntercept.postMessage("app")
			}
		}
	},
	onShareAppMessage(res) {
		if (!uni.getStorageSync('token')) {
			tologin()
			return false
		}
		let title = this.dataList.title
		let imageUrl = this.dataList.appletsSharePic ? this.dataList.appletsSharePic : this.dataList.coverPicture
		return {
			title,
			path: `/pages/grouppurchase/detail?forwardUserId=` + this.forwardUserId + '&id=' + this.id + '&enter=117',
			imageUrl
		};
	},
	onShareTimeline(res) {
		if (!uni.getStorageSync('token')) {
			tologin()
			return false
		}
		let title = this.dataList.title
		let imageUrl = this.dataList.appletsSharePic ? this.dataList.appletsSharePic : this.dataList.coverPicture
		return {
			title,
			path: `/pages/grouppurchase/detail?forwardUserId=` + this.forwardUserId + '&id=' + this.id + '&enter=117',
			imageUrl
		};
	},
	onShow() {
		this.signuodata.mobile = getstorage("mobile")
		if (this.forwardUserId && uni.getStorageSync('token')) {
			this.tempparentid()
		}
		this.getList()
		this.getComments()
	},
	computed: {
		height() {
			return `calc(100vh - 42px - 48rpx - ${this.safeHeight}px)`
		},
		getadUrl() {
			if (this.dataList.adUrl) {
				return true
			} else {
				return false
			}
		},
	},
	onReady() {

		this.$refs.uForm.setRules(this.rules)
		uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
			this.safeHeight = data.height
		}).exec()
	},
	methods: {
		tempparentid() {
			this.$request.post("/coc-active/api/v1/invite/temp_parent_id/add", {
				tempParentId: this.forwardUserId
			}).then(res => {

			})
		},
		Oncopy(value) {
			uni.setClipboardData({
				data: value,
				success: function () {
					uni.$u.toast('复制成功')
				}
			});
		},
		posterSuccess(url) {
			// 生成成功，会把临时路径在这里返回
			this.poster = url;

		},
		OnSaveImage() {
			let value = [this.poster]
			uni.previewImage({
				current: 99999,
				urls: value,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function (data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function (err) {
						console.log(err.errMsg);
					}
				}
			})
		},
		handleComment() {
			let obj = {
				commentType: 6,
				id: this.id,
				shopName: this.dataList.shopName
			}
			uni.navigateTo({
				url: '/pages/service/evaluate/writeEvaluate?info=' + JSON.stringify(obj)
			})
		},
		addClue() {
			let _this = this
			if (!this.radiovalue1) {
				uni.$u.toast('请同意并阅读个人信息保护声明')
				return false
			}
			this.$refs.uForm.validate().then(res => {
				this.$newrequest.post('/coc-active/api/v1/sign_up/not/designated/user/addClue', {
					correlationId: this.id,
					mobile: this.signuodata.mobile,
					name: this.signuodata.name,
					type: '2'
				}).then(res => {
					if (res.code == 200) {
						uni.$u.toast('预约成功')
						this.showsignup = false
					} else {
						uni.$u.toast(res.message)
					}

				})
			})
		},
		OnPushPrivacyPolicy() {
			uni.navigateTo({
				url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
			})
		},
		closesignup() {
			this.showsignup = false
		},


		OnCloseShare() {
			this.showpopshare = false
		},
		popposter() {
			if (!uni.getStorageSync('token')) {
				tologin()
				return false
			}
			this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
				page: 'pages/grouppurchase/detail',
				scene: this.id + '_' + this.forwardUserId + '_enter=117',
			}).then(res => {
				this.showpopshare = true
				this.list = [{
					type: 'image',
					// path替换成你自己的图片，注意需要在小程序开发设置中配置域名
					path: this.dataList.posterFigureUrl,
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
		isnext() {
			if (this.dataList.isDesignated == 1) {
				this.$newrequest.post("/coc-active/api/v1/sign_up/designated/user/canBuy", {
					activityId: this.id,
					type: '2'
				}).then(res => {
					if (res.code == 200) {
						if (res.data == 0) {
							this.showsignup = true
						} else {
							this.showpop = true
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
						});
					}
				})
			} else {
				this.showpop = true
			}
		},
		Onopen() {
			if (tologin() !== true) {
				return
			}
			if (this.dataList.skuCoding) {
				this.$request.post("/coc-active/api/v1/payment/preference/userIsCanBuyProduct", {
					activityPaymentPreferenceId: this.dataList.activityPaymentPreferenceId,
					goodsId: this.dataList.id,
					type: 2
				}).then(res => {
					if (res.code == 200) {
						if (res.data.isCanBuy == 1) {
							this.isnext()
						} else if (res.data.isCanBuy == 0) {
							uni.$u.toast('您本月已享受该优惠，暂不可购买')
						}
					} else {
						uni.$u.toast(res.message)
					}
				})
			} else {
				this.isnext()
			}

		},
		Onaddcollections() {
			let _this = this
			tologin()
			if (this.dataList.isCollection == 2) {
				this.dataList.isCollection = 1
			} else {
				this.dataList.isCollection = 2
			}
			if (getstorage("token")) {
				this.$request.post("/coc-active/api/v1/collections/add_collections", {
					type: '3',
					relId: this.dataList.id,
					relName: this.dataList.shopName,
					activityMoney: this.dataList.flashSalePrice
				}).then(res => {
					if (res.code == 200) {
						// _this.getList()
						let msg = '操作成功'
					}
				})
			} else {

			}

		},

		Onsingup() {
			let _this = this
			if (this.currentmeal == null && this.currentmeal != 0) {
				uni.showToast({
					icon: 'none',
					title: '请选择一个套餐~',
				});
				return false
			}
			if (this.choosemealdata.stock - this.choosemealdata.saleNum <= 0) {
				uni.showToast({
					icon: 'none',
					title: '库存已抢光',
				});
				return false
			}
			uni.navigateTo({
				url: '/pages/grouppurchase/payindex?istype=wx' + '&forwardUserId=' + this.forwardUserId,
				success: function (res) {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('getinfo', {
						data: _this.dataList
					})
					_this.showpop = false
				}
			})
		},
		choosemeal(item, index) {
			this.currentflashSalePrice = item.flashSalePrice
			this.currentstock = item.stock - item.saleNum
			this.dataList.groupPurchaseSetMealId = item.id
			this.dataList.mealname = item.name
			this.dataList.mealprice = item.flashSalePrice
			this.currentmeal = index
			this.choosemealdata = item
			this.bankCardPrice = item.flashSalePrice - item.bankCardPrice
		},

		OnPushshopHome() {
			uni.navigateTo({
				url: '/pages/activityMall/business/index?id=' + this.dataList.shopId
			})
		},
		OnPushMap() {
			// #ifdef  MP-WEIXIN
			let _this = this
			uni.openLocation({
				latitude: _this.dataList.lat,
				longitude: _this.dataList.lng,
				success: function () {
					console.log('success');
				}
			});
			// #endif
		},
		onChange(e) {
			this.timeData = e
			if (e.days == 0 && e.hours == 0 && e.minutes == 0 && e.seconds == 0) {
				this.istimeend = false
			}
		},
		Oncard(index) {
			// 1是人保 2 是农行 3是工行 4是邮储
			if (index == 1) {
				uni.navigateTo({
					url: '/pages/carShops/upkeep/insurance?id=0'
				})
			} else if (index == 2) {
				uni.navigateTo({
					url: '/pages/my/creditCard/detail?type=n'
				})
			} else if (index == 3) {
				uni.navigateTo({
					url: '/pages/my/creditCard/detail?type=g'
				})
			} else if (index == 4) {
				uni.navigateTo({
					url: '/pages/my/creditCard/detail?type=y'
				})
			}
			this.openpop = false
		},
		getswiper() {
			return this.swiperList
		},
		getcode(res) {

			uni.uploadFile({
				url: getApp().globalData.uploadUrl,
				filePath: res.data.appletsCode,
				name: 'file',
				formData: {
					'file': res.data.appletsCode
				},
				header: {
					"Content-Type": 'multipart/form-data'
				},
				success: (uploadFileRes) => {
					console.log(JSON.parse(uploadFileRes.data).data)
				}
			});
		},
		getList() {
			if (!this.isshowpage) {
				this.$showLoading()
			}
			this.$newrequest.get('/coc-active/api/v1/group/getDetails/' + this.id).then(res => {
				res.data.groupDetailsMealVOS.filter(s => {
					this.surplusStock += (s.stock - s.saleNum)
				})
				this.bankCardPrice = res.data.flashSalePrice - res.data.bankCardPrice
				this.currentflashSalePrice = res.data.flashSalePrice
				this.currentstock = res.data.stock
				this.getcode(res)
				this.option = {
					marketPrice: res.data.marketPrice,
					flashSalePrice: res.data.bankCardPrice ? res.data.bankCardPrice : res.data
						.flashSalePrice,
					codeUrl: res.data.qrCode,
					signUpEndTimeStr: res.data.expirationTime,
					coverUrl: res.data.coverPicture,
					headUrl: 'https://oss.dcqcjlb.com/51che_java_dev/20221201/ee67baa9692a4ec2a2d1f3141fb3b649.png',
					bgUrl: 'https://oss.dcqcjlb.com/51che_java_dev/20221201/ee67baa9692a4ec2a2d1f3141fb3b649.png',
					fillStyle: '#0688ff',
					nickName: '', //授权登录的用户名
					miniName: '', //小程序名称
					tkName: res.data.title,
					tkAuthor: '内容',
					tkType: '考试', //题库类型
					cost: '免费', //是否需要收费   免费/付费
					isPub: '公开' //公开 还是 私有

				}
				let swiperList = []
				if (res.data.adUrl) {
					let curlist = res.data.adUrl.split(',')
					curlist.forEach(function (data) {
						swiperList.push({
							url: data,
							type: 'image'
						})
					})
				}

				if (res.data.adPushUrl) {
					swiperList.unshift({
						url: res.data.adPushUrl,
						type: 'video',
						poster: res.data.adCoverImg ? res.data.adCoverImg : '',
					})
					this.autoPlay = false
				} else {
					this.autoPlay = true
				}
				this.choosemealdata = res.data.groupDetailsMealVOS[0]
				this.swiperList = swiperList
				this.dataList = res.data
				this.dataList.groupPurchaseSetMealId = res.data.groupDetailsMealVOS[0].id
				this.dataList.mealname = res.data.groupDetailsMealVOS[0].name
				this.dataList.mealprice = res.data.groupDetailsMealVOS[0].flashSalePrice
			}).catch(err => {

			}).finally(() => {
				if (!this.isshowpage) {
					this.isshowpage = true
					this.$hideLoading()
				}
			})
		},
		//我要预约
		submitAppoint() {
			if (tologin() !== true) {
				return
			}
			this.$newrequest.post("/coc-active/api/v1/group/appointment", {
				id: this.id
			}).then(res => {
				if (res.code == 200) {
					this.dataList.isAppointment = 1
					uni.showToast({
						icon: 'none',
						title: "预约成功",
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: res.message,
					});
				}
			})
		},
		// 用户评价
		getComments() {
			this.$newrequest.post("/coc-system/api/v1/user_interaction/getComment", {
				id: this.id,
				commentType: 6,
				current: 1,
				size: 10
			}).then(res => {
				if (res.data.total > 0) {
					res.data.records.forEach(item => {
						if (item.imgs != null && item.imgs != '') {
							item.imgs = item.imgs.split(',')
						}
					})
					this.commentList = res.data.records
					this.commentInfo = {
						id: this.id,
						commentType: 6,
						listNum: res.data.total
					}
				}
			})
		},
	}
}
</script>

<style lang="scss">
.card {
	margin: 25rpx;
	background-color: #ffffff;
	border-radius: 10rpx;
	padding: 24rpx;
}

.label-item {
	margin-left: 10rpx;
	background-color: #fceded;
	border-radius: 10rpx;
	color: #D91B1B;
	font-size: 20rpx;
	padding: 8rpx 18rpx;
	margin-top: 10rpx;
}

.price-top {
	background-image: url("./static/image/jiagebeijing.png");
	background-size: 100% 100%;
	margin: -40rpx 25rpx 0rpx 25rpx;
	position: relative;
	display: flex;
	justify-content: space-between;
	color: #ffffff;
	font-size: 24rpx;
	align-items: center;
	height: 116rpx;
}

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
			color: #EB2E01;
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

.card-enterprice {
	background-color: #ffffff;
	margin: 25rpx 25rpx 10rpx;
	border-radius: 10rpx;
	padding: 24rpx;
}

.mainhome-btn {
	width: 80rpx;
	height: 40rpx;
	border: 1rpx solid #D91B1B;
	border-radius: 20rpx;
	line-height: 40rpx;
	color: #D91B1B;
	font-size: 24rpx;
	text-align: center;
}

.title-info {
	font-size: 28rpx;
	font-weight: bold;
	border-left: 10rpx solid #D91B1B;
	margin-left: 25rpx;
	padding-left: 20rpx;
}

.card-goumai {
	padding: 32rpx 24rpx 32rpx 10rpx;
	background-color: #ffffff;
	margin: 25rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
}

.card-comments {
	border-radius: 10rpx;
	background-color: #fff;
	padding: 23rpx;
}

.ul-item {
	list-style-type: disc;
	/*  #ifdef  H5  */
	margin-left: -80rpx;
	/* #endif */
}

.li-item {
	color: #D91B1B;
	font-size: 24rpx;
	display: list-item;
	margin-left: 40rpx;
	margin-top: 24rpx;
}

.content {
	margin: 25rpx;
	background-color: #f8f8f8;
	border-radius: 12rpx;
	padding: 20rpx 0rpx;
}

.safe-bottom-height {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}

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
		border: 2rpx solid #D91B1B;
		margin-left: 30rpx;
	}

	.signup {
		// background-color: #d91b1b;
		border-radius: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #ffffff;
		width: 185rpx;
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
}

.pop-btn {
	background: #F6F6F6;
	border-radius: 10rpx;
	padding: 14rpx 36rpx;
	font-size: 24rpx;
	margin-bottom: 10rpx;
}

.current-btn {
	background-color: #fceded;
	color: #D91B1B;
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

.top-info {
	border-radius: 10rpx;
	margin: 60rpx 25rpx 0 25rpx;
}

.btn-rescue {
	position: fixed;
	bottom: 300rpx;
	right: 30rpx;
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

::v-deep .u-read-more__toggle {
    justify-content: flex-start!important;
}
::v-deep .u-read-more__toggle__icon{
    display: none!important;
}
</style>
