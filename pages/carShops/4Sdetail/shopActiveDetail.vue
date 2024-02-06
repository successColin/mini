<template>
	<!-- 4s店  活动详情 -->
	<view class="page">
		<view v-if="isshowpage">
			<view v-if="isapp == 1">
				<u-navbar :autoBack='false' bgColor='' leftText="" title=" " :safeAreaInsetTop="true" @leftClick='onreturn'>
					<view class="u-nav-slot" slot="left">
						<u-icon name="arrow-left" size="19"></u-icon>
					</view>
				</u-navbar>
			</view>
			<!-- 顶部广告栏 -->
			<carousel v-if="dataList.activity.adUrl" :list="getswiper()"
				:topStyle="{ margin: '20rpx', width: '710rpx', borderRadius: '12rpx' }" height="200px" urlkey="url"
				:dataType="1" :indicatorType="4" :clickType="2" :autoPlay="autoPlay">
			</carousel>
			<!--  #ifdef MP-WEIXIN  -->
			<!-- 人保横幅 -->
			<view @click="Oncard(1)" style="text-align: center;" v-if="dataList.activity.activityPaymentPreferenceId == 4">
				<image style="width: 650rpx;height: 58rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230309/file_1678359774395.png">
				</image>
			</view>
			<!-- 农行横幅 -->
			<view @click="Oncard(2)" style="text-align: center;" v-if="dataList.activity.activityPaymentPreferenceId == 5">
				<image style="width: 650rpx;height: 58rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230311/file_1678523370586.png">
				</image>
			</view>
			<!-- 工行横幅 -->
			<view @click="Oncard(3)" style="text-align: center;" v-if="dataList.activity.activityPaymentPreferenceId == 6">
				<image style="width: 650rpx;height: 58rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230311/file_1678518040507.png">
				</image>
			</view>
			<!-- 邮储横幅 -->
			<view @click="Oncard(4)" style="text-align: center;" v-if="dataList.activity.activityPaymentPreferenceId == 7">
				<image style="width: 650rpx;height: 58rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230928/file_1695861786835.png">
				</image>
			</view>
			<!-- 民生横幅 -->
			<view style="text-align: center;" v-if="dataList.activity.activityPaymentPreferenceId == 8">
				<image style="width: 650rpx;height: 58rpx;"
					src="https://oss.dcqcjlb.com/51che_java_dev/20230928/file_1695862005389.png">
				</image>
			</view>
			<!--  #endif -->
			<view class="card" style="padding-top: 0rpx;">
				<view class="title" style="position: relative;">
					{{ dataList.activity.title }}
					<!--  #ifdef MP-WEIXIN  -->
					<image v-if="dataList.activityMarvellousId" class="jchf-img"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230224/file_1677231216777.png"
						@click="jumpWonderfulReview"></image>
					<!--  #endif -->
				</view>
				<!-- 活动标签 -->
				<view class="activity-tags">
					<view v-for="(item, index) in dataList.activity.tagNamesList" :key="index" style="margin-top: 10rpx;">
						<view class="name">{{ item }}</view>
					</view>
				</view>
				<view class="u-flex" style="align-items: flex-end;margin-top: 24rpx;">
					<view class="price">
						<text v-if="!dataList.activity.bankCardPrice">
							<text style="font-size: 20rpx;" v-if="dataList.activity.flashSalePrice">￥</text>
							<text style="font-size: 40rpx;">{{
								dataList.activity.flashSalePrice?dataList.activity.flashSalePrice:"免费" }}</text>
						</text>
						<text v-else-if="!dataList.activity.flashSalePrice" style="font-size: 40rpx;">
							免费
						</text>
						<text v-if="dataList.activity.bankCardPrice > 0">
							<text v-if="dataList.activity.activityPaymentPreferenceId == 5" class="mainRed size24 ml20">
								农行信用卡专属价:￥
							</text>
							<text v-if="dataList.activity.activityPaymentPreferenceId == 6" class="mainRed size24 ml20">
								工行信用卡专属价:￥
							</text>
							<text v-if="dataList.activity.activityPaymentPreferenceId == 7" class="mainRed size24 ml20">
								邮储信用卡专属价:￥
							</text>
							<text v-if="dataList.activity.activityPaymentPreferenceId == 8" class="mainRed size24 ml20">
								民生信用卡专属价:￥
							</text>
							<text v-if="dataList.activity.activityPaymentPreferenceId == 10" class="mainRed size24 ml20">
								官方补贴价:￥
							</text>
							<text class="mainRed  fwb" style="font-size: 40rpx;">
								{{ dataList.activity.bankCardPrice>0?dataList.activity.bankCardPrice:'免费' }}
							</text>
						</text>
					</view>
					<view style="font-size: 28rpx;color: #999999;margin-left: 20rpx;">
						<text style="text-decoration: line-through;">¥{{ dataList.activity.marketPrice }}</text>
					</view>
				</view>
				<view class="deadline-text">报名截止时间：{{ dataList.activity.signUpEndTimeStr }}</view>
				<view class="mt30 flex alc">
					<template v-if="dataList.activity.payType == 2 && iscommission != 1">
						<view v-if="isExpert == 1 && token && dataList.activity.maxCommissionPrice" class="u-flex">
							<view class="rebate-img rebate-size"></view>
						</view>
						<view
							v-if="isExpert == 1 && token && dataList.activity.maxCommissionPrice && dataList.activity.maxCommissionPrice > dataList.activity.minCommissionPrice"
							class="rebate-style" style="margin-right: 24rpx;">
							{{ dataList.activity.maxCommissionPrice }}
						</view>
						<view
							v-if="isExpert == 1 && token && dataList.activity.maxCommissionPrice && dataList.activity.maxCommissionPrice == dataList.activity.minCommissionPrice"
							class="rebate-style" style="margin-right: 24rpx;">
							{{ dataList.activity.minCommissionPrice }}
						</view>
					</template>
					<!-- <view style="font-size: 24rpx;margin-right: 10rpx;line-height: 36rpx;">
						已报名<text style="margin-left: 10rpx;">{{ dataList.signUpCount }}/{{ dataList.allStock }}</text>
					</view> -->
					<!-- 	<view v-for="(item, index) in dataList.signUpUserHeadImg" :key="index">
						<view style="margin-left: 12rpx;" v-if="index < 6">
							<u-avatar :src="item.headImg" size="20"></u-avatar>
						</view>
					</view>
					<view v-if="dataList.signUpUserHeadImg.length > 6" style="margin-left: 10rpx;">
						<image src="@/static/image/sangedian.png" style="width: 40rpx;height: 40rpx;"></image>
					</view> -->
					<view class="size24">
						库存：{{ dataList.allStock - dataList.signUpCount }}
					</view>

				</view>
				<view v-if="iscommission == 1">
					<commission :price='dataList.activity.commissionPrice' :proportion='dataList.activity.rate'>
					</commission>
				</view>
				<view class="card-item">
					<view style="margin-top: 16rpx">
						<view class="u-flex" v-for="(item, index) in dataList.activity.activityAttends"
							:class="{ 'u-m-33': index != 0 }" :key="index">
							<view v-if="index == 0" style="margin-right: 10rpx;">
								<image src="@/static/image/changci.png" style="width: 22rpx;height: 22rpx;">
								</image>
							</view>
							<view style="font-size: 24rpx;">
								活动场次<text style="color: #999999;margin-left: 20rpx;">{{ item.beginTime + ' - '
									+ item.endTime }}</text>
							</view>
						</view>
						<view @click="OnchooseLocation(2)" class="u-flex" style="margin-top: 22rpx;">
							<!--  #ifdef MP-WEIXIN  -->
							<view
								style="margin-right: 14rpx;padding-left: 20rpx;margin-left: -20rpx;padding-bottom: 20rpx;margin-bottom: -20rpx;">
								<image src="@/static/image/dingwei.png" style="width: 18rpx;height: 22rpx;">
								</image>
							</view>
							<!--  #endif -->
							<view style="font-size: 24rpx;display: flex;">
								<view>活动地点</view>
								<view style="color: #999999;margin-left: 20rpx;width: 515rpx;">
									{{ dataList.activity.address }}
								</view>
							</view>
						</view>
						<view @click="Ontel()" class="u-flex" style="margin-top: 22rpx;">
							<!--  #ifdef MP-WEIXIN  -->
							<view
								style="margin-right: 14rpx;padding-left: 20rpx;margin-left: -20rpx;padding-bottom: 20rpx;margin-bottom: -20rpx;">
								<image src="@/static/image/dianhua.png" style="width: 21rpx;height: 22rpx;">
								</image>
							</view>
							<!--  #endif -->
							<view style="font-size: 24rpx;">
								联系方式<text style="color: #999999;margin-left: 20rpx;">{{ dataList.activity.tel }}</text>
							</view>
						</view>
						<view v-if="dataList.activity.nonRefund == 1" class="u-flex" style="margin-top: 22rpx;">
							<view style="margin-right: 14rpx;">
								<image src="@/static/image/lingdang.png" style="width: 23rpx;height: 29rpx;">
								</image>
							</view>
							<view style="font-size: 24rpx;color: #D91B1B;">
								本套餐一经购买不支持退款
							</view>
						</view>
					</view>
				</view>
				<!-- 达人推荐 -->
				<recommendX :fromType="1" :relatedType="1"  :relatedId="id" :isTitle="3"></recommendX>
				<floatVideo :relatedType="1" :relatedId="id" ></floatVideo>
				<view class="card-item">
					<!-- 活动发起人信息 -->
					<view class="user-info" style="margin-left: 0rpx;" @click="OnPushSHome">
						<view class="u-flex">
							<view class="user-avatar">
								<u-avatar shape="square" size='50' mode='widthFix' :src="dataList.shopVO.headImg">
								</u-avatar>
							</view>
							<view class="user-info-detail">
								<view class="name">
									{{ getshopName() }}
								</view>
								<!-- 	<view class="u-flex" style="margin-top: 14rpx;align-items: center;"
									v-if="dataList.activity.shopTypeId==4||dataList.activity.shopTypeId==3">
									<image src="@/static/image/rendarenzheng.png" style="width: 28rpx; height:32rpx">
									</image>
								</view>
								<view class="u-flex" style="margin-top: 14rpx;align-items: center;"
									v-else-if="dataList.activity.shopTypeId==1">
									<image src="@/static/image/guan.png" style="width: 29rpx; height:29rpx"></image>
									<view style="font-size: 24rpx;color: #D91B1B;margin-left: 10rpx;">官方
									</view>
								</view>
								<view class="u-flex" style="margin-top: 14rpx;align-items: center;"
									v-else-if="dataList.activity.shopTypeId==2">
									<image src="@/static/image/4Sdian.png" style="width: 29rpx; height:29rpx"></image>
									<view style="font-size: 24rpx;margin-top: -1rpx;margin-left: 20rpx;">4S店</view>
								</view> -->
							</view>
						</view>


					</view>

				</view>

				<view class="content" v-if="dataList.activity.detail">
					<view>
						<u-parse :content="dataList.activity.detail"></u-parse>
					</view>
				</view>
				<view class="content" v-else>
					<view v-for="item in dataList.activity.details" :key="item.id">
						<view v-if="item.type == 1">
							{{ item.associatedContent }}
						</view>
						<view v-else-if="item.type == 2">
							<image style="width: 710rpx;" mode='widthFix' :src="item.associatedContent"></image>
						</view>
					</view>
				</view>
				<view v-if="imgs[0]" style="margin-top: 20rpx;">
					<view v-for="(item, index) in imgs" :key="index">
						<image style="width: 660rpx;margin-top: 10rpx;margin-left: 10rpx;" mode="widthFix" :src="item">
						</image>
					</view>
				</view>
				<view style="margin-top: 20rpx;" v-if="dataList.activity.video">
					<video style="width: 670rpx;" id="myVideo" :src="dataList.activity.video" controls></video>
				</view>
				<view class="vote" v-if="dataList.activity.isInsertVote == 1">
					<view class="title">{{ dataList.activity.votesTitle }}</view>
					<view v-for="(item, index) in dataList.activity.votesOptions" :key="index" class="option"
						:class="choosevote === index ? 'choose' : undefined" @click="OnChoosevote(item, index)">
						<view>{{ item.optionContent }}</view>
						<view><text v-if="item.percentage == null">0%</text><text v-else>{{ item.percentage }}</text>
						</view>
					</view>
				</view>
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
							价、优惠价等价格可能是在使用优惠券、满减或特定优惠活动 和时段等情</text></li>
					<li class="li-item"><text class="txtDarkGray">此说明仅当出现价格比较时有效，若商家单独对划线价格进行 说明的，以商家的表述为准。</text></li> -->
				</ul>
			</view>

			<!--  #ifdef MP-WEIXIN  -->
			<!-- 活动推荐 -->
			<view class="activityrecommend">
				<view class="title">
					活动推荐
				</view>
			</view>
			<view class="activity-item" v-for="(item, index) in dataList.similarActivities" :key="index"
				@click="OnPushDetail(item)">
				<view class="u-flex" v-if="index < 4">
					<u--image radius='12rpx' :showLoading="true" :src="item.coverPicture" width="159rpx" height="117rpx">
					</u--image>
					<view
						style="margin-left: 10rpx;font-size: 28rpx;   display: flex;flex-direction: column;justify-content: center;">
						<view class="activity-name moreLine"><text>{{ item.title }}</text></view>
					</view>
				</view>

			</view>
			<!--  #endif -->
			<view style="height: 86rpx;"></view>
			<view style="height: 120rpx;"></view>
			<!--  #ifdef MP-WEIXIN  -->
			<view v-if="iscommission == 0" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view" :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
					<view class="u-flex"
						style="margin-top: 14rpx;width: 360rpx;justify-content: space-around;font-size: 24rpx;">

						<view @click="Onaddcollections"
							style="margin-left: 20rpx;text-align: center;position: relative;top: -8rpx;">
							<view v-if="dataList.activity.isCollection == 2 || dataList.activity.isCollection == null">
								<image src="@/static/image/weishoucang.png" style="width: 56rpx;height: 56rpx;"></image>
							</view>
							<view v-if="dataList.activity.isCollection == 1">
								<image src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060433937.png" style="width: 56rpx;height: 56rpx;">
								</image>
							</view>
							<view v-if="dataList.activity.isCollection == 2 || dataList.activity.isCollection == null"
								style="margin-top: -6rpx;">收藏
							</view>
							<view v-if="dataList.activity.isCollection == 1" style="margin-top: -6rpx;">已收藏</view>
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
					<view class="signup" v-if="dataList.activity.activityEnd == 2">
						<text style="background-color: #999999;">已下架</text>
					</view>
					<view @click="Onremind" v-else-if="dataList.activity.signUpStatus == 1" class="signup1"
						:class="{ 'Asreminder': dataList.isRemind == 1 }">
						<text>提醒我</text>
					</view>
					<view v-else-if="surplusStock == 0" class="signup Asreminder">
						<text>库存已抢光~</text>
					</view>
					<view v-else-if="dataList.activity.activityEnd == 0" class="signup"
						:class="{ 'Asreminder': surplusStock == 0 }" @click="Onsignup">
						<text>立即报名</text>
					</view>
					<view @click="openAppoint" class="signup" style="background-color: #ffffff;"
						v-else-if="dataList.activity.activityEnd == 1">
						<text>我要预约</text>
					</view>

				</view>
				<view class="safe-bottom-height"></view>
			</view>
			<view v-else-if="iscommission == 1" class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid;">
				<view class="view " :style="{ paddingBottom: safeHeight > 0 ? 0 : '21rpx' }">
					<joinshopbtn :ids="dataList.activity.id" :type='1' :isSelection='dataList.activity.isSelection'>
					</joinshopbtn>
				</view>
			</view>
			<!--  #endif -->
			<image v-if="showtop" class="zhiding" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059356929.png" @click="ClickZhiDing"></image>

			<u-popup :safeAreaInsetBottom='false' :show="showsingnup" @close="OnClosesingnup" mode="bottom">
				<view class="pop-singup">
					<view class="flex" style="margin-bottom: -70rpx;">
						<view
							style="position: relative;bottom: 40rpx;border: 4rpx solid #fff;border-radius: 10rpx;margin-bottom: 30rpx;">
							<image mode="aspectFill" style="width: 184rpx;height: 184rpx;border-radius: 10rpx;"
								:src="dataList.activity.coverPicture"></image>
						</view>
						<!-- // 佣金 -->
						<view style="margin-left: 20rpx;">
							<view>
								<view class="flex alc">
									<view class="fwb size32  mainRed">
										<text style="font-size: 20rpx;">￥</text><text style="font-size: 40rpx;">{{
											flashSalePrice }}</text>
									</view>
									<view
										style="font-size: 20rpx;color: #999999;text-decoration: line-through;margin-left: 20rpx;margin-top: 8rpx;">
										￥{{ marketPrice }}
									</view>
									<view class="u-flex ml20"
										v-if="isExpert == 1 && token && dataList.activity.maxCommissionPrice && dataList.activity.payType == 2">
										<view class="u-flex">
											<view class="rebate-img rebate-size"></view>
										</view>
										<view class="rebate-style" style="margin-right: 24rpx;" v-if="MealIndex == '999'">
											{{ dataList.activity.minCommissionPrice }}
										</view>
										<view class="rebate-style" style="margin-right: 24rpx;" v-else>
											{{ dataList.setMealVO[MealIndex].commissionPrice }}
										</view>
									</view>
								</view>
							</view>

							<view v-if="dataList.activity.bankCardPrice > 0" class="size24 mt10"
								style="border-radius: 10rpx;">
								<view v-if="dataList.activity.activityPaymentPreferenceId == 6" class="u-flex alc"
									style="background-color: #f6f6f6;padding: 14rpx">
									<view class="u-flex alc">
										<view clk>工行信用卡用户立减</view>
										<view class="mainRed">
											{{ bankCardPrice.toFixed(2) }}
										</view>
										<view>元</view>
									</view>
								</view>
								<view v-if="dataList.activity.activityPaymentPreferenceId == 5" class="u-flex alc"
									style="background-color: #f6f6f6;padding: 14rpx">
									<view class="u-flex alc">
										<view>农行信用卡用户立减</view>
										<view class="mainRed">
											{{ bankCardPrice.toFixed(2) }}
										</view>
										<view>元</view>
									</view>
								</view>
								<view v-if="dataList.activity.activityPaymentPreferenceId == 7" class="u-flex alc"
									style="background-color: #f6f6f6;padding: 14rpx">
									<view class="u-flex alc">
										<view>邮储信用卡用户立减</view>
										<view class="mainRed">
											{{ bankCardPrice.toFixed(2) }}
										</view>
										<view>元</view>
									</view>
								</view>
								<view v-if="dataList.activity.activityPaymentPreferenceId == 8" class="u-flex alc"
									style="background-color: #f6f6f6;padding: 14rpx">
									<view class="u-flex alc">
										<view>民生信用卡用户立减</view>
										<view class="mainRed">
											{{ bankCardPrice.toFixed(2) }}
										</view>
										<view>元</view>
									</view>
								</view>
							</view>
							<view style="font-size: 24rpx;color: #666666;margin-bottom: -30rpx;">
								库存{{ stock }}
							</view>
						</view>
					</view>
					<u-divider :text="null"></u-divider>
					<view style="font-size: 28rpx;margin-left: 20rpx;">选择套餐</view>
					<view class="u-flex" style="flex-wrap: wrap;margin-top: 20rpx;margin-left: -20rpx;">
						<view v-for="(item, index) in Meal.activitySetMeals" :key="index"
							@click="OnChooseMeal(item, index)">
							<view :class="{ 'current-Meal': index == MealIndex }" class="Meal">
								{{ item.name }}
							</view>
						</view>
					</view>

					<u-divider :text="null"></u-divider>
					<view>
						<view style="font-size: 28rpx;margin-left: 20rpx;">选择场次</view>
						<view>
							<scroll-view scroll-x="true" style="margin: 20rpx;font-size: 24rpx;width: 670rpx;">
								<view class="box-session">
									<view @click="OnSession(item, index)" v-for="(item, index) in Meal.activityAttends"
										:key="index" style="background: #F6F6F6;border-radius: 10rpx;margin-left: 30rpx">
										<view style="padding: 20rpx;width: 140rpx;"
											:class="{ 'disable-session': item.isCanSignUp == 0, 'current-session': currentsession == index }">
											<view>{{ item.beginTime }}</view>
											<view style="text-align: center;">-</view>
											<view>{{ item.endTime }}</view>
										</view>
									</view>
								</view>
							</scroll-view>
						</view>
					</view>
					<u-divider :text="null"></u-divider>
					<view class="u-flex" style="justify-content: space-between;">
						<view style="font-size: 28rpx;margin-left: 20rpx;">数量<text
								style="color: #D41B1B;font-size: 24rpx;margin-left: 10rpx;" v-if="limitNum != 0">(限购{{
									limitNum }}份)</text></view>
						<view class="u-flex">
							<view @click="OnDelete"
								style="text-align: center;line-height: 40rpx;border: solid 1rpx #c8c8c8;width: 38rpx;height: 40rpx">
								-</view>
							<view style="font-size: 30rpx;border: 1rpx solid #c8c8c8;padding: 0 10rpx;">
								{{ activitySetMealNum }}
							</view>
							<view @click="OnAddMeal"
								style="text-align: center;line-height: 40rpx;border: solid 1rpx #c8c8c8;width: 38rpx;height: 40rpx">
								+</view>
						</view>
					</view>
					<view class="btn">
						<text @click="Onsingup">立即抢购</text>
					</view>
				</view>

				<u-toast ref="uToastpop"></u-toast>
			</u-popup>

			<u-popup :safeAreaInsetBottom='false' round='10' :show="showpopshare" @close="OnCloseShare" mode="center">
				<!-- 海报 -->
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
							{{ dataList.activity.posterDesc }}
						</view>
						<view class="tac mt20 " @click="Oncopy(dataList.activity.posterDesc)">
							<image style="width: 230rpx;height: 60rpx;"
								src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
							</image>
						</view>
					</view>
				</view>
			</u-popup>
			<view>
				<u-popup :show="appointVisble" @close="closeAppoint" mode="bottom">
					<view class="appoint">
						<text class="appoint-title" style="margin-bottom: 46rpx;">客户参与活动时间意愿调查（可多选）</text>
						<view class="appoint-btn-view">
							<view v-for="(item, i) in appointList" class="appoint-btn" @click="clickAppoint(i)" :key="i"
								:style="{ color: item.ischecked ? '#D91B1B' : '#222222', background: item.ischecked ? '#FFF1F1' : '#F8F8F8' }">
								<text class="appoint-btn-text">{{ item.name }}</text>
							</view>
						</view>
						<view style="display: flex;justify-content: center;">
							<view class="appoint-submit" @click="submitAppoint">提交</view>
						</view>
					</view>
				</u-popup>
			</view>
			<u-popup :safeAreaInsetBottom='false' :show="appointSuccessVisble" :closeOnClickOverlay="false" mode="center"
				customStyle="width:90%;borderRadius:20rpx">
				<view class="appointsuccess">
					<text class="appoint-title"
						style="margin-bottom: 48rpx;margin-top: 20rpx;: center;">已收到您的需求，后续我们会考虑再次举办该活动，您也可以关注下我们其他活动。</text>
					<view style="display: flex;justify-content: center;margin-bottom: 30rpx;">
						<view class="appoint-submit" style="margin: 0;" @click="closeAppointSuccess">好的</view>
					</view>
				</view>
			</u-popup>
			<u-toast ref="uToast"></u-toast>
			<u-loading-page loading-mode="spinner" :loading='showloading'></u-loading-page>
		</view>
		<request-loading></request-loading>
		<u-popup round='10' :safeAreaInsetBottom='false' :show="openpop" @close="openpop = false" mode="center">
			<view style="text-align: center;padding: 40rpx 50rpx;width: 550rpx;">
				<view v-if="dataList.activity.activityPaymentPreferenceId == 4">
					<view class="bank-title">投人保车险，享更多专属活动优惠
					</view>
					<view class="bank-btn">
						<view @click="openpop = false" class="bankbtn-left">我已投保
						</view>
						<view @click="Oncard(1)" class="bankbtn-right">我要投保
						</view>

					</view>
				</view>
				<view v-else-if="dataList.activity.activityPaymentPreferenceId == 5">
					<view class="bank-title">本活动报名支付时享农行信用卡专属满减优惠
					</view>
					<view class="bank-btn">
						<view @click="creditcard(1)" class="bankbtn-left">
							我已有卡
						</view>
						<view @click="Oncard(2)" class="bankbtn-right">
							我要办卡
						</view>
					</view>
				</view>
				<view v-else-if="dataList.activity.activityPaymentPreferenceId == 6">
					<view class="bank-title">本活动报名支付时享工行信用卡专属满减优惠
					</view>
					<view class="bank-btn">
						<view @click="creditcard(2)" class="bankbtn-left">
							我已有卡
						</view>
						<view @click="Oncard(3)" class="bankbtn-right">
							我要办卡
						</view>
					</view>
				</view>
				<view v-else-if="dataList.activity.activityPaymentPreferenceId == 7">
					<view class="bank-title">本活动报名支付时享邮储信用卡专属满减优惠
					</view>
					<view class="bank-btn">
						<view @click="creditcard(2)" class="bankbtn-left">
							我已有卡
						</view>
						<view @click="Oncard(4)" class="bankbtn-right">
							我要办卡
						</view>
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
				<view @click="addClue" class='addBtn tac size32 colorff bgRed'>
					提交
				</view>
			</view>
		</u-popup>
		
	</view>
</template>
<script>
import carousel from "@/components/carousel/index.vue"
import commission from "@/components/commission/index.vue"
import recommendX from "@/components/darenRecommend/recommendX.vue"
import floatVideo from '@/components/floatVideo/index.vue'
import joinshopbtn from "@/components/joinshopbtn/index.vue"
import Poster from '@/components/zhangyuhao-poster/Poster.vue'
import {
getstorage,
setstorage,
tologin
} from '@/utils/index.js'
export default {
	components: {
		carousel, Poster, commission, recommendX, joinshopbtn, floatVideo
	},
	data() {
		return {
			poster: '',
			list: [],
			token: null,
			isExpert: null,
			surplusStock: 0,
			showsignup: false,
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
			currentmealitem: {},
			openpop: false,
			autoPlay: false,
			showloading: false,
			safeHeight: 0,
			setMealId: '', //选中套餐id
			stock: '',
			limitNum: '1',
			currentsession: null,
			showpopshare: false,
			activitySetMealNum: 1,
			evaluates: [],
			choosevote: '',
			today: '',
			forwardUserId: null,
			showsingnup: false,
			imgs: [],
			mygroup: [],
			columns: [],
			showinteractive: false,
			client: true,
			dataList: {},
			count: 4,
			value: 1,
			id: '',
			name: '',
			choseshare: {},
			userId: '',
			isLoadMore: false,
			current: 1,
			posterShareUrl: '',
			Meal: [],
			MealIndex: 999,
			currentMeal: {},
			attendId: '',
			day: '',
			Events: '',
			flashSalePrice: '',
			isapp: 0,
			marketPrice: '',
			swiperList: [],
			appointSuccessVisble: false,
			appointVisble: false,
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
			iscommission: 0,
			isshowpage: false,
			showtop: false,
			bankCardPrice: 0,
		}
	},
	onShareAppMessage(res) {
		tologin()
		this.$request.post("/coc-active/api/v1/marvellous_activity/share_v2", {
			relId: this.dataList.activity.id,
			shareType: '1',
			type: '1'
		}).then(res => { })
		let title = this.dataList.activity.title
		let imageUrl = this.dataList.activity.appletsSharePic ? this.dataList.activity.appletsSharePic : this.dataList
			.activity.coverPicture
		return {
			title,
			// path: `/pages/home/activityDetail/index?forwardUserId=` + this.forwardUserId + '&id=' + this.id,
			path: `/pages/carShops/4Sdetail/shopActiveDetail?forwardUserId=` + this.forwardUserId + '&id=' + this.id + "&enter=117",
			imageUrl
		};
	},
	onShareTimeline() {
		tologin()
		this.$request.post("/coc-active/api/v1/marvellous_activity/share_v2", {
			relId: this.dataList.activity.id,
			shareType: '2',
			type: '1'
		}).then(res => { })
		let title = this.dataList.activity.title
		let imageUrl = this.dataList.activity.appletsSharePic ? this.dataList.activity.appletsSharePic : this.dataList
			.activity.coverPicture
		return {
			title,
			// path: `/pages/home/activityDetail/index?forwardUserId=` + this.forwardUserId + '&id=' + this.id,
			path: `/pages/carShops/4Sdetail/shopActiveDetail?forwardUserId=` + this.forwardUserId + '&id=' + this.id + "&enter=117",
			imageUrl
		};
	},
	computed: {
		height() {
			return `calc(100vh - 42px - 48rpx - ${this.safeHeight}px)`
		},
		// getadUrl() {
		//     if (this.dataList.activity.adUrl) {
		//         return true
		//     } else {
		//         return false
		//     }
		// },
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
	onPageScroll(e) {
		// e.scrollTop 获取页面的滚动高度
		let _this = this
		uni.getSystemInfo({
			success(res) {

				if (e.scrollTop > 300) {
					_this.showtop = true
				} else {
					_this.showtop = false
				}
			}
		})
	},
	onLoad(option) {
		// uni.removeStorageSync('enter');
		console.log("进来了===========》", JSON.stringify(option), option);
		if (option.enter) {
			uni.setStorageSync('enter', option.enter);
		}
		// 二维码分享特殊处理
		if (option.scene && option.scene.indexOf('_enter=117')) {
			uni.setStorageSync('enter', '117');
		}
		if (option.iscommission) {
			this.iscommission = option.iscommission
		}
		if (option.id) {
			this.id = option.id
		}
		if (option.isapp) {
			this.isapp = 1
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
		let _this = this
		this.today = new Date().valueOf()
		if (uni.getSystemInfoSync().platform == 'ios') {
			this.client = false
		} else {
			this.client = true
		}
		this.token = uni.getStorageSync('token')
		this.isExpert = uni.getStorageSync('isExpert')
		if (!this.forwardUserId) {
			this.forwardUserId = getstorage("userId")
		}
		uni.$on('saveaddshop', function (data) {
			_this.getList()
		})
		this.getList()

	},
	onReachBottom() {
		if (!this.isLoadMore) {
			this.current++
			this.getList()
		}
	},
	onShow() {
		this.signuodata.mobile = getstorage("mobile")
		if (this.forwardUserId && uni.getStorageSync('token')) {
			this.tempparentid()
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules)
		uni.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect(data => {
			this.safeHeight = data.height
		}).exec()

	},
	methods: {
		onreturn() {
			if (this.isapp == 1) {
				if (window._51club) {
					window._51club.backIntercept('app');
				}
				if (window.webkit.messageHandlers) {
					window.webkit.messageHandlers.backIntercept.postMessage("app")
				}
			}
		},
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
					type: '1'
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
		creditcard(index) {
			// if (getstorage('token')) {
			//     this.$request.post('/coc-active/api/v1/activity/credit_card', {
			//         creditCard: index
			//     }).then(res => {
			//         this.openpop = false
			//     })
			// } else {
			//     this.openpop = false
			// }
			uni.navigateTo({
				url: "/pages/my/card/index"
			});
			this.openpop = false
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
		OnPushSHome() {
			if (this.dataList.activity.shopTypeId == 2) {
				uni.navigateTo({
					url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopVO.shopId
				})
			} else if (this.dataList.activity.shopTypeId == 3) {
				uni.navigateTo({
					url: '/pages/activityMall/business/index?id=' + this.dataList.shopVO.shopId
				})
			}

		},
		Onremind() {
			if (!getstorage('token')) {
				uni.navigateTo({
					url: "/pages/activity/share/index?activityId=" + this.id
				})
			}
			if (this.dataList.isRemind == 1) {
				return false
			}
			let _this = this

			uni.requestSubscribeMessage({
				tmplIds: [
					'DS1aWHTQ1gSPOeuh2-eng-mUZMX0xc_OMhFeJMESElY',
				],
				success(res) {
					if (res['DS1aWHTQ1gSPOeuh2-eng-mUZMX0xc_OMhFeJMESElY'] == 'accept') {
						setstorage('setRegistrationreminder', '1')
						_this.$request.get("/coc-active/api/v1/activity/signUpStartRemind/" + _this.dataList
							.activity.id).then(res => {
								if (res.code == 200) {
									uni.showToast({
										icon: 'none',
										title: '提醒成功，请等待通知',
									});
									_this.dataList.isRemind = 1
								} else {
									uni.showToast({
										icon: 'none',
										title: res.message,
									});
								}
							})
					}
				}
			})
		},
		ClickZhiDing() {
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		},
		getshopName() {
			if (this.dataList.shopVO.shopName) {
				return this.dataList.shopVO.shopName
			}
		},


		//跳转精彩活动
		jumpWonderfulReview() {
			uni.navigateTo({
				url: '/pages/home/wonderfulReview/detail?id=' + this.dataList.activityMarvellousId
			})
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
		OnSession(item, index) {
			if (item.isCanSignUp == 0) {
				return false
			}
			this.day = item.days
			this.Events = item.beginTime + ' - ' + item.endTime
			this.attendId = item.id
			this.currentsession = index
		},
		OnClosesingnup() {
			this.showsingnup = false
		},
		OnCloseShare() {
			this.showpopshare = false
		},
		popposter() {
			if (!uni.getStorageSync('token')) {
				tologin()
				return false
			}
			uni.requestSubscribeMessage({
				tmplIds: [
					'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
				],
				success(res) { }
			})
			this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
				page: 'pages/carShops/4Sdetail/shopActiveDetail',
				scene: this.id + '_' + this.forwardUserId + '_enter=117',
			}).then(res => {
				this.showpopshare = true
				this.list = [{
					type: 'image',
					// path替换成你自己的图片，注意需要在小程序开发设置中配置域名
					path: this.dataList.activity.posterFigureUrl,
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


		OnChooseMeal(item, index) {
			// if (this.Meal.activitySetMeals[index].surplusStock == 0) {
			// 	this.$refs.uToastpop.show({
			// 		message: '该套餐无库存',
			// 	});
			// 	return false
			// } else {
			this.currentmealitem = item
			this.limitNum = item.limitNum
			this.setMealId = item.id
			this.stock = item.surplusStock
			this.MealIndex = index
			this.marketPrice = item.marketPrice
			this.flashSalePrice = item.flashSalePrice
			this.activitySetMealNum = 1
			this.bankCardPrice = item.flashSalePrice - item.bankCardPrice
			// }

		},
		OnAddMeal() {
			if (!this.setMealId) {
				this.$refs.uToastpop.show({
					message: '请选择套餐',
				});
				return false
			}
			let a = this.Meal.activitySetMeals[this.MealIndex].surplusStock
			let limitNum = this.Meal.activitySetMeals[this.MealIndex].limitNum
			if (this.activitySetMealNum == a) {
				this.$refs.uToastpop.show({
					message: '选购数量无法超过库存',
				});
			} else {
				if (this.activitySetMealNum == limitNum) {
					return false
				}
				this.activitySetMealNum++
			}
		},
		OnDelete() {
			if (!this.setMealId) {
				this.$refs.uToastpop.show({
					message: '请选择套餐',
				});
				return false
			}
			if (this.activitySetMealNum == 1) {
				return false
			} else {
				this.activitySetMealNum--
			}
		},

		OnChoosevote(item, index) {
			this.$request.post("/coc-social/api/v1/article/vote", {
				votesId: item.votesId,
				votesOptionsId: item.id
			}).then(res => {
				if (res.code == 200) {
					this.choosevote = index
					this.getList()
				} else {
					this.$refs.uToast.show({
						message: res.message,
					})
				}
			})

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
		openAppoint() {
			if (!getstorage('token')) {
				uni.navigateTo({
					url: "/pages/activity/share/index?activityId=" + this.id
				})
			}
			this.appointInit()
			this.appointVisble = true
		},
		//关闭预约
		closeAppoint() {
			this.appointVisble = false
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
				activityId: this.id,
				time
			}).then(res => {
				if (res.code == 200) {
					this.appointVisble = false
					this.appointSuccessVisble = true
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none',
						duration: 2000
					})
				}
			})
		},
		//关闭预约成功
		closeAppointSuccess() {
			this.appointSuccessVisble = false
		},

		OnPushDetail(item) {
			// #ifdef  MP-WEIXIN
			if (item.shopTypeId === 2) {
			    uni.navigateTo({
			        url: '/pages/carShops/4Sdetail/shopActiveDetail?id=' + item.id
			    })
			} else {
			    uni.navigateTo({
			        url: '/pages/home/activityDetail/index?id=' + item.id
			    })
			}
			// #endif
		},

		Onaddcollections() {
			let _this = this
			tologin()
			if (this.dataList.activity.isCollection == 2) {
				this.dataList.activity.isCollection = 1
			} else {
				this.dataList.activity.isCollection = 2
			}
			if (getstorage("token")) {
				this.$request.post("/coc-active/api/v1/collections/add_collections", {
					type: '1',
					relId: this.dataList.activity.id,
					relName: this.dataList.shopVO.shopName,
					activityMoney: this.dataList.activity.flashSalePrice
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
			if (!this.setMealId) {
				this.$refs.uToastpop.show({
					message: '请选择套餐',

				});
				return false
			}
			if (!this.attendId) {
				this.$refs.uToastpop.show({
					message: '请选择场次',

				});
				return false
			}
			if (this.currentmealitem.newUserLimit == 1) {
				this.$request.post("/coc-active/api/v1/group/isNewPerson", {
					type: 1
				}).then(res => {
					if (res.data.type == 1) {
						this.topay()
					} else {
						uni.showToast({
							icon: 'none',
							title: '此套餐仅限新用户购买',
						});

					}
				})
			} else {
				this.topay()
			}
		},
		topay() {
			this.$request.get("/coc-active/api/v1/activity/getActivitySetMeal/" + this.id).then(res => {
				if (res.data.activitySetMeals[this.MealIndex].surplusStock < this.activitySetMealNum) {
					this.showsingnup = false
					this.$refs.uToast.show({
						message: '库存已抢光~',

					});
					this.MealIndex = '999'
					this.limitNum = '1'
					this.setMealId = ''
					this.stock = ''
					this.marketPrice = ''
					this.flashSalePrice = ''
					this.activitySetMealNum = 1
					this.day = ''
					this.Events = ''
					this.attendId = ''
					this.currentsession = null
					return false
				} else {

					this.currentMeal = this.Meal.activitySetMeals[this.MealIndex]
					let personnum = this.currentMeal.adultNum * this.activitySetMealNum
					let childnum = this.currentMeal.childrenNum * this.activitySetMealNum
					this.showsingnup = false
					uni.navigateTo({
						url: '/pages/service/payMent/detail?activityId=' + this.id + '&setMealId=' +
							this.setMealId +
							'&MealName=' + this.currentMeal.name + '&setMealNum=' + this
								.activitySetMealNum +
							'&attendId=' + this.attendId + '&personnum=' + personnum + '&childnum=' +
							childnum +
							'&flashSalePrice=' + this.currentMeal.flashSalePrice + '&title=' + this
								.Meal.title +
							'&day=' + this.day + '&Events=' + this.Events +
							'&activityPaymentPreferenceId=' + this.dataList.activity
								.activityPaymentPreferenceId + '&forwardUserId=' + this.forwardUserId
					})
				}
			})
		},
		next() {
			let _this = this
			uni.requestSubscribeMessage({
				tmplIds: [
					'DS1aWHTQ1gSPOeuh2-eng-mUZMX0xc_OMhFeJMESElY',
					'JeuwJCr-FQboBcI6RFJl6GmVxPNWbtU31_B_Ti3jj0w',
					'b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY'
				],
				success(res) { }
			})
			if (getstorage("token")) {
				if (_this.dataList.activity.status == 2) {
					_this.$refs.uToast.show({
						message: '已下架的活动无法报名',
					})
					return false
				}
				_this.MealIndex = '999'
				_this.limitNum = '1'
				_this.setMealId = ''
				_this.stock = ''
				_this.marketPrice = ''
				_this.flashSalePrice = ''
				_this.activitySetMealNum = 1
				_this.day = ''
				_this.Events = ''
				_this.attendId = ''
				_this.currentsession = null
				_this.$request.get("/coc-active/api/v1/activity/getActivitySetMeal/" + _this.id)
					.then(
						res => {
							_this.stock = res.data.stock
							_this.limitNum = res.data.limitNum
							_this.Meal = res.data
							_this.marketPrice = res.data.marketPrice
							_this.flashSalePrice = res.data.flashSalePrice
						})
				_this.showsingnup = true
			}

		},
		Onsignup() {
			if (!getstorage('token')) {
				uni.navigateTo({
					url: "/pages/activity/share/index?activityId=" + this.id
				})
			}
			if (this.surplusStock == 0) {
				return false
			}
			let _this = this

			if (this.dataList.activity.isDesignated == 1) {
				this.$newrequest.post("/coc-active/api/v1/sign_up/designated/user/canBuy", {
					activityId: this.id,
					type: '1'
				}).then(res => {
					if (res.code == 200) {
						if (res.data == 0) {
							this.showsignup = true

						} else {
							this.next()
						}
					} else {
						uni.showToast({
							icon: 'none',
							title: res.message,
						});
					}

				})
			} else {
				this.next()
			}
		},

		getdate(val) {
			var aa = val.substring(5, 10) + ' ' + val.substring(11, 16)
			return aa
		},
		Ontel() {
			let _this = this
			uni.makePhoneCall({
				phoneNumber: _this.dataList.activity.tel //仅为示例
			});
		},
		OnchooseLocation(index) {
			// #ifdef  MP-WEIXIN
			let _this = this
			let lat = ''
			let lng = ''
			if (index == 2) {
				lat = _this.dataList.activity.lat
				lng = _this.dataList.activity.lng
			} else {
				lat = _this.dataList.shopVO.lat
				lng = _this.dataList.shopVO.lng
			}
			uni.openLocation({
				latitude: lat,
				longitude: lng,
				success: function () {
					console.log('success');
				}
			});
			// #endif
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
			let _this = this
			this.$newrequest.post("/coc-active/api/v1/activity/detail", {
				activityId: this.id,
				forwardUserId: this.forwardUserId,
				current: this.current,
				size: 10
			}).then(res => {
				this.bankCardPrice = res.data.activity.flashSalePrice - res.data.activity.bankCardPrice
				this.getcode(res)
				res.data.setMealVO.filter(i => {
					this.surplusStock += i.surplusStock
				})

				let swiperList = []
				if (res.data.activity.adUrl) {
					let curlist = res.data.activity.adUrl.split(',')
					curlist.forEach(function (data) {
						swiperList.push({
							url: data,
							type: 'image'
						})
					})
				}

				if (res.data.activity.adPushUrl) {
					swiperList.unshift({
						url: res.data.activity.adPushUrl,
						type: 'video',
						poster: res.data.activity.adCoverImg ? res.data.activity.adCoverImg : res.data
							.activity.adPushUrl + '?x-oss-process=video/snapshot,t_1000,m_fast'
					})
					this.autoPlay = false
				} else {
					this.autoPlay = true
				}

				this.swiperList = swiperList
				this.dataList = res.data
				if (this.dataList.activity.imgs) {
					this.imgs = this.dataList.activity.imgs.split(',')
				}
				if (this.current == 1) {
					this.evaluates = res.data.evaluates
				} else {
					res.data.evaluates.filter(s => {
						this.evaluates.push(s)
					})
				}

				// #ifdef  MP-WEIXIN
				if (res.data.activity.activityPaymentPreferenceId == 4) {
					if (!getstorage('poptype4') || new Date().getTime() - getstorage('poptype4') > 1000 * 60 *
						60 * 24 * 30) {
						this.openpop = true;
						setstorage("poptype4", new Date().getTime())
					} else {
						this.openpop = false;
					}
				}
				// 农行弹框
				else if (res.data.activity.activityPaymentPreferenceId == 5) {
					if (!getstorage('poptype5') || new Date().getTime() - getstorage('poptype5') > 1000 * 60 *
						60 * 24 * 30) {
						this.openpop = true;
						setstorage("poptype5", new Date().getTime())
					} else {
						this.openpop = false;
					}
				}
				// 工行弹框
				else if (res.data.activity.activityPaymentPreferenceId == 6) {

					if (!getstorage('poptype6') || new Date().getTime() - getstorage('poptype6') > 1000 * 60 *
						60 * 24 * 30) {
						this.openpop = true;
						setstorage("poptype6", new Date().getTime())
					} else {
						this.openpop = false;
					}
				}
				// 邮储弹框
				else if (res.data.activity.activityPaymentPreferenceId == 7) {

					if (!getstorage('poptype7') || new Date().getTime() - getstorage('poptype7') > 1000 * 60 *
						60 * 24 * 30) {
						this.openpop = true;
						setstorage("poptype7", new Date().getTime())
					} else {
						this.openpop = false;
					}
				}
				// #endif
			}).catch(err => {

			}).finally(() => {
				if (!this.isshowpage) {
					this.isshowpage = true
					this.$hideLoading()
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.u-m-33 {
	margin-left: 33rpx;
	margin-top: 22rpx;
}

.disable-session {
	background: #F6F6F6;
	color: #999999;
	border-radius: 10rpx;
}

.current-session {
	background: #C61D1D;
	color: #FFFFFF;
	border-radius: 10rpx;
}

.box-session {
	display: flex;
	margin-left: -30rpx;
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

.activity-tags {

	display: flex;
	color: #d91b1b;
	margin-top: 24rpx;
	margin-left: -20rpx;
	margin-bottom: 0rpx;
	flex-wrap: wrap;

	.name {
		font-weight: 500;
		padding: 10rpx 16rpx;
		font-size: 24rpx;
		margin-left: 20rpx;
		background-color: #fceaea;
		text-align: center;
		border-radius: 10rpx;
	}
}

.Meal {
	font-size: 24rpx;
	background-color: #f6f6f6;
	border-radius: 10rpx;
	padding: 16rpx;
	margin-top: 20rpx;
	margin-left: 30rpx
}

.current-Meal {
	background-color: #d91b1b;
	color: #ffffff;

}

.pop {
	width: 550rpx;
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


.user-info {
	display: flex;
	justify-content: space-between;
}

.user-avatar {
	display: flex;
}

.user-info-detail {
	margin-left: 20rpx;
	align-self: center;

	.name {
		font-size: 32rpx;
		font-weight: bold;
		color: #222222;
	}
}

.btn-follow {
	background-color: #d91b1b;
	display: flex;
	justify-content: center;
	border-radius: 10rpx;
	color: #ffffff;
	font-size: 24rpx;
	width: 108rpx;
	height: 40rpx;
	line-height: 40rpx;
	align-self: center;
}

.onbtn-follow {
	background-color: #ffffff;
	font-size: 28rpx;
	color: #d91b1b;
	border: 1rpx solid #d91b1b;
	padding: 10rpx 15rpx;
}


.card {
	// margin: 20rpx;
	border-radius: 12rpx;
	margin-top: 20rpx;
	padding: 20rpx;
	margin-bottom: 0rpx;
	padding-top: 0rpx;

	.card-item {
		border-radius: 12rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #ffffff;

		li {}

		i {
			width: 10rpx;
			height: 10rpx;
			background-color: #d91b1b;
			border-radius: 50%;
			display: inline-block;
			margin-right: 10rpx;
			position: relative;
			bottom: 5rpx;
		}
	}


	.title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.price {
		color: #d91b1b;
		font-size: 32rpx;
		font-weight: bold;


	}

	.deadline-text {
		background-color: #ffffff;
		border-radius: 18rpx;
		font-size: 24rpx;
		line-height: 44rpx;
		padding: 0rpx 16rpx 0rpx 24rpx;
		height: 46rpx;
		margin-top: 20rpx;
		display: inline-block;
	}

	.endtime {
		font-size: 24rpx;
		background-color: #f8f8f8;
		border-radius: 10rpx;
		line-height: 44rpx;
		margin-left: -10rpx;
		padding-left: 30rpx;
		padding-right: 10rpx;
	}

	.address {
		font-size: 24rpx;
		display: flex;
		width: 600rpx;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		/* 这里是超出几行省略 */
	}

	.content {
		margin-top: 20rpx;
		background-color: #f8f8f8;
		border-radius: 12rpx;
		padding: 0rpx 0rpx 20rpx;
	}
}

.activityrecommend {
	display: flex;
	justify-content: space-between;
	margin: 30rpx 20rpx 20rpx 20rpx;

	.title {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 20rpx;
	}

}

.activity-item {
	margin: 20rpx;
	background-color: #ffffff;
	border-radius: 12rpx;
	padding: 20rpx;
	display: flex;
	justify-content: space-between;

	.activity-name {
		width: 500rpx;
		font-size: 32rpx;
		margin-left: 10rpx;

	}

	.from {
		font-size: 24rpx;
		color: #666666;
	}

	.endtime {
		font-size: 24rpx;
		background-color: #f8f8f8;
		padding: 0rpx 10rpx;
		margin-top: 10rpx;
		width: 306rpx;
	}

	.btn-follow {
		display: flex;
		justify-content: center;
		border-radius: 10rpx;
		border: solid 2rpx #222222;
		padding-top: 4rpx;
		color: #222222;
		font-size: 24rpx;
		width: 108rpx;
		height: 40rpx;
		line-height: 38rpx;

	}

	.activity-btn {
		margin-top: 10rpx;
		background-color: #d91b1b;
		border-radius: 10rpx;
		padding: 6rpx 20rpx;
		font-size: 24rpx;
		color: white;
	}
}


.bottom-btn {
	width: 100%;
	padding: 0rpx 28rpx 0rpx 0rpx;
	position: fixed;
	bottom: 0rpx;
	background-color: #ffffff;
	margin-top: 40rpx;
	font-size: 24rpx;
	z-index: 9999;


	.view {
		display: flex;
		font-size: 28rpx;
		padding-top: 22rpx;
	}

	.btn {
		background-color: #ffffff;
		border-radius: 10rpx;
		display: flex;
		padding: 20rpx;

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
		margin-left: 18rpx;

		text {
			display: inline-block;
			text-align: center;
			background-color: #d91b1b;
			border-radius: 40rpx;
			padding: 16rpx;
		}
	}
}

.signup1 {
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
	margin-left: 18rpx;
	background-color: #d91b1b;

	text {
		display: inline-block;
		text-align: center;
		border-radius: 40rpx;
		padding: 16rpx;
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

.choose {
	font-weight: bold;
	background-color: #7bc5f4;
}

.option {
	background-color: #999999;
	margin-top: 10rpx;
	display: flex;
	justify-content: space-between;
	padding: 5rpx 10rpx;
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
}

.appoint {
	padding: 42rpx 50rpx 50rpx 50rpx;
}

.appoint-title {
	font-size: 32rpx;

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
	background: #D91B1B;
	border-radius: 10rpx;
	margin-top: 48rpx;
	text-align: center;
	line-height: 60rpx;
	color: #FFFFFF;
}

.jchf-img {
	width: 124rpx;
	height: 124rpx;
	position: fixed;
	right: 10rpx;
	top: 500rpx;
}

.appointsuccess {
	padding: 42rpx 30rpx 20rpx 30rpx;
}

.safe-bottom-height {
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	box-sizing: content-box;
}

ul {
	/*  #ifdef  H5   */
	list-style-type: none;
	margin-left: -80rpx;
	/*  #endif  */
}

.zhiding {
	position: fixed;
	bottom: 286rpx;
	right: 24rpx;
	width: 72rpx;
	height: 72rpx;
}

.Asreminder {
	background-color: #999999;

	text {
		background-color: #999999 !important;
	}
}

.bank-title {
	width: 422rpx;
	font-size: 28rpx;
	margin: 0 auto;
}

.bank-btn {
	display: flex;
	justify-content: space-around;
	margin-top: 40rpx;
}

.bankbtn-left {
	width: 160rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 24rpx;
	background-color: #999999;
	color: #ffffff;
	border-radius: 35rpx;
}

.bankbtn-right {
	width: 160rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	font-size: 24rpx;
	background-color: #D91B1B;
	color: #ffffff;
	border-radius: 35rpx;
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

.ul-item {
	list-style-type: disc;
}

.li-item {
	color: #D91B1B;
	font-size: 24rpx;
	display: list-item;
	margin-left: 40rpx;
	margin-top: 24rpx;
}

.top-info {
	border-radius: 10rpx;
	margin: 60rpx 25rpx 0 25rpx;
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

.addBtn {
	width: 380rpx;
	height: 76rpx;
	border-radius: 38rpx;
	line-height: 76rpx;
}
</style>
