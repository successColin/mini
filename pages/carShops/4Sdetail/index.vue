<template>
  <!-- 4s店铺主页 -->
  <view class="page">
    <!--  #ifdef H5  -->
    <u-navbar
      :autoBack="false"
      :safeAreaInsetTop="true"
      @leftClick="onreturn"
    ></u-navbar>
    <view style="height: 80rpx"></view>
    <!--  #endif -->
    <view v-if="isshowpage">
      <view class="top-detail">
        <view class="u-flex">
          <view>
            <image
              mode="heightFix"
              style="width: 70rpx; height: 43rpx"
              :src="detail.brandLogo"
            ></image>
          </view>
          <view class="shop-name">
            {{ detail.storeAbbreviation }}
          </view>
        </view>
        <view
          v-if="detail.doorheadPhotos && detail.doorheadPhotos.length == 1"
          style="margin-top: 22rpx"
        >
          <image
            mode="aspectFill"
            style="width: 650rpx; height: 210rpx; border-radius: 10rpx"
            :src="detail.doorheadPhotos[0]"
          >
          </image>
        </view>
        <view
          v-else-if="detail.doorheadPhotos && detail.doorheadPhotos.length == 3"
          style="margin-top: 22rpx"
        >
          <image
            mode="aspectFill"
            style="width: 210rpx; height: 210rpx; border-radius: 10rpx"
            :src="detail.doorheadPhotos[0]"
          >
          </image>
          <image
            mode="aspectFill"
            style="
              width: 210rpx;
              height: 210rpx;
              border-radius: 10rpx;
              padding-left: 10rpx;
            "
            :src="detail.doorheadPhotos[1]"
          >
          </image>
          <image
            mode="aspectFill"
            style="
              width: 210rpx;
              height: 210rpx;
              border-radius: 10rpx;
              padding-left: 10rpx;
            "
            :src="detail.doorheadPhotos[2]"
          >
          </image>
        </view>
        <view v-if="detail.storeLabel" class="top-label">
          <text>{{ detail.storeLabel }}</text>
        </view>
        <view class="top-contact flex alc mt30">
          <view @click="OnLocation" class="u-flex">
            <view>
              <image
                style="width: 24rpx; height: 30rpx"
                src="@/pages/carShops/static/image/dingwei.png"
              >
              </image>
            </view>
            <view style="font-size: 24rpx; margin-left: 12rpx">
              {{ detail.distanceMsg }}
            </view>
          </view>
          <view v-if="detail.mobile" @click="Oncall" class="u-flex ml20 mr20">
            <view>
              <image
                style="width: 26rpx; height: 25rpx"
                src="@/pages/carShops/static/image/dianhua.png"
              >
              </image>
            </view>
            <view style="font-size: 24rpx; margin-left: 12rpx">
              {{ detail.mobile }}
            </view>
          </view>
          <!-- 	<view class="goShop ml20" @click="zixun">咨询</view>
					<view class="goShop ml20" @click="handleHelp">救援</view> -->
        </view>
      </view>

      <u-tabs
        :inactiveStyle="{
          color: '#606266',
          fontSize: '28rpx',
          transform: 'scale(1)',
        }"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '32rpx',
          transform: 'scale(1.05)',
        }"
        lineColor="#D91B1B"
        lineWidth="16"
        :list="tag"
        @click="clicktag"
        itemStyle="height:88rpx;width:160rpx"
        :is-scroll="true"
        :current="tabsindex"
      >
      </u-tabs>

      <!-- 轮播 -->
      <view class="carousel">
        <carousel
          type="2"
          :shopId="id"
          ref="carousel"
          :topClass="['activity-img']"
          height="260rpx"
          urlkey="url"
          :dataType="2"
          :systemCode="systemCode"
          :indicatorType="3"
          v-model="bannerList"
        ></carousel>
      </view>
      <view v-if="dataTag == 6">
        <view class="usercarassess">
          <u--form
            labelPosition="left"
            :model="cardata"
            :rules="rules"
            ref="uForm"
            labelWidth="80"
            :labelStyle="{ fontWeight: 'bold' }"
          >
            <u-form-item
              label="品牌车型"
              prop="brandVehicle"
              borderBottom
              ref="item1"
            >
              <u--input
                inputAlign="right"
                placeholder="请输入品牌如：奥迪A4L"
                border="none"
                v-model="cardata.brandVehicle"
              ></u--input>
            </u-form-item>
            <u-form-item
              label="车辆年份"
              prop="carYear"
              borderBottom
              ref="item1"
            >
              <u--input
                type="number"
                inputAlign="right"
                placeholder="请输入年份如：2023"
                border="none"
                v-model="cardata.carYear"
              ></u--input>
            </u-form-item>
            <u-form-item
              label="行驶里程"
              prop="mileage"
              borderBottom
              ref="item1"
            >
              <u--input
                type="number"
                inputAlign="right"
                placeholder="请输入行驶里程如：6000"
                border="none"
                v-model="cardata.mileage"
              ></u--input>
            </u-form-item>
            <u-form-item
              label="姓名"
              prop="customerName"
              borderBottom
              ref="item1"
            >
              <u--input
                inputAlign="right"
                placeholder="请输入姓名"
                border="none"
                v-model="cardata.customerName"
              ></u--input>
            </u-form-item>
            <u-form-item label="手机号" prop="customerMobile" ref="item1">
              <u--input
                type="number"
                inputAlign="right"
                placeholder="请输入车主手机号"
                border="none"
                v-model="cardata.customerMobile"
              ></u--input>
            </u-form-item>
          </u--form>
        </view>
        <!--  #ifdef MP-WEIXIN  -->
        <view class="u-flex" style="margin-top: 42rpx; justify-content: center">
          <view>
            <u-radio-group v-model="radiovalue1" placement="column">
              <u-radio
                activeColor="#D91B1B"
                :customStyle="{ marginBottom: '8px' }"
                :name="1"
              >
              </u-radio>
            </u-radio-group>
          </view>
          <text style="font-size: 30rpx"> 我已阅读并同意 </text>
          <text
            @click="OnPushPrivacyPolicy"
            style="font-size: 30rpx; color: #d91b1b"
          >
            <text class="mainRed"></text>《个人信息保护声明》
          </text>
        </view>
        <view class="btn-car" @click="Onadd">提交信息</view>
        <!--  #endif -->
      </view>
      <!-- 筛选框 -->
      <view
        v-if="(dataTag == 1 || dataTag == 2) && !showuloadingicon"
        class="select"
        :class="{ 'sticky-box': !isSticky }"
        style="padding-bottom: 15rpx"
      >
        <view class="u-flex-al">
          <view
            class="list-tag"
            @click="openSearch(3)"
            style="justify-content: flex-end"
          >
            <view class="text ellipsis">
              {{
                searchField.energyTypeName
                  ? searchField.energyTypeName
                  : '能源类型'
              }}
            </view>
            <view style="margin-left: 11rpx">
              <u-icon
                name="arrow-down-fill"
                color="#222222"
                size="16rpx"
              ></u-icon>
            </view>
          </view>
          <view
            class="list-tag"
            @click="openSearch(2)"
            style="justify-content: flex-end"
          >
            <view class="text ellipsis">
              {{ searchField.brandName ? searchField.brandName : '车型种类' }}
            </view>
            <view style="margin-left: 11rpx">
              <u-icon
                name="arrow-down-fill"
                color="#222222"
                size="16rpx"
              ></u-icon>
            </view>
          </view>
          <view
            class="list-tag"
            @click="openSearch(1)"
            style="justify-content: flex-end"
          >
            <view class="text ellipsis">
              {{
                searchField.carPriceName ? searchField.carPriceName : '车价区间'
              }}
            </view>
            <view style="margin-left: 11rpx">
              <u-icon
                name="arrow-down-fill"
                color="#222222"
                size="16rpx"
              ></u-icon>
            </view>
          </view>
          <view
            class="list-tag"
            @click="openSearch(4)"
            style="justify-content: flex-end"
          >
            <view class="text ellipsis">
              {{
                searchField.autofinance ? searchField.autofinance : '汽车金融'
              }}
            </view>
            <view style="margin-left: 11rpx">
              <u-icon
                name="arrow-down-fill"
                color="#222222"
                size="16rpx"
              ></u-icon>
            </view>
          </view>
        </view>
      </view>
      <view v-if="dataTag == 1 && !showuloadingicon">
        <view v-if="dataList.length != 0">
          <view
            @click="OnCarDetail(1, item)"
            v-for="(item, index) in dataList"
            :key="index"
            class="newCarItem flex jsb alc"
          >
            <view class="newCarL">
              <image :src="item.faceImage"></image>
            </view>
            <view class="newCarR">
              <view class="flex alc mb20">
                <text class="newCarT oneLine">{{ item.vehicleName }}</text>
                <image
                  src="@/static/image/down.png"
                  class="carDown"
                  mode="widthFix"
                ></image>
                <text class="size24 newCarHui">优惠{{ item.discount }}</text>
              </view>
              <view class="size24 mb20"
                >指导价：{{ item.elevatingPriceMin }}
                <text v-if="item.elevatingPriceMax">
                  -{{ item.elevatingPriceMax }}
                </text>
              </view>
              <view class="flex alc jsb">
                <view class="newCarShopName txtLighGray size24"
                  >{{ item.askNum }}人咨询</view
                >
                <view class="goShop">咨询</view>
              </view>
            </view>
          </view>
          <u-loading-icon :show="showuloadingicon"></u-loading-icon>
        </view>
        <view v-else style="margin-top: 120rpx; text-align: center">
          <image
            style="width: 250rpx; height: 250rpx"
            src="../static/image/zanwucheliang.png"
          ></image>
        </view>
      </view>
      <view v-if="dataTag == 2 && !showuloadingicon">
        <view v-if="dataList.length != 0">
          <view
            @click="OnCarDetail(2, item)"
            v-for="(item, index) in dataList"
            :key="index"
            class="secondCarItem flex"
          >
            <view class="secondCarL">
              <image :src="item.faceImage"></image>
            </view>
            <view class="newCarR">
              <view class="flex alc moreLine">
                <view class="newCarT">{{ item.cxTitle }}</view>
              </view>
              <view
                style="margin-left: -12rpx; margin-top: 16rpx"
                class="u-flex"
              >
                <view
                  class="tag-style"
                  v-for="(itemtag, indextag) in item.biaoqian[0]"
                  :key="indextag"
                >
                  <text class="tag-text">{{ itemtag }}</text>
                </view>
              </view>

              <view
                class="size24"
                style="color: #999999; margin-top: 16rpx; margin-bottom: 16rpx"
              >
                {{ item.firstLicenseDate }}丨{{ item.mileage * 0.0001 }}万公里
              </view>
              <view class="u-flex" style="align-items: baseline">
                <view
                  style="font-size: 32rpx; font-weight: bold; color: #d91b1b"
                >
                  {{ (item.price * 0.0001).toFixed(2)
                  }}<text style="font-size: 24rpx; margin-left: 6rpx">万</text>
                </view>
                <view
                  style="
                    font-size: 24rpx;
                    text-decoration: line-through;
                    margin-left: 16rpx;
                  "
                >
                  {{ (item.elevatingPrice * 0.0001).toFixed(2) }}
                  <text>万</text>
                </view>
              </view>
            </view>
          </view>
          <u-loading-icon :show="showuloadingicon"></u-loading-icon>
        </view>
        <view v-else style="margin-top: 120rpx; text-align: center">
          <image
            style="width: 250rpx; height: 250rpx"
            src="../static/image/zanwucheliang.png"
          ></image>
        </view>
      </view>
      <view v-if="dataTag == 3 && !showuloadingicon">
        <!-- 	<view v-if="iscommission == 0" @click="OnUpkeep" style="margin-left: 32rpx;margin-top: 15rpx;">
					<image style="width:700rpx;height: 92rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688613128063.png">
					</image>
				</view>
				<view v-if="iscommission == 0" style="text-align: center;margin-top: 15rpx;">
					<image @click="OnInsurance" style="width: 700rpx;height: 120rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230116/file_1673847962847.png">
					</image>
				</view> -->
        <!-- <view v-if="iscommission == 0" @click="Onpushloadhelp" style="margin-left: 32rpx">
					<image style="width:700rpx;height: 140rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20230428/file_1682647469032.png">
					</image>
				</view> -->
        <view
          class="tagmaintenance-card"
          style="margin: 25rpx; margin-bottom: 10rpx"
        >
          <view class="tac" @click="Onpushtag(1)">
            <image
              src="../static/image/wodeaiche.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <view class="mt15"> 我的爱车 </view>
          </view>
          <view class="tac" @click="Onpushtag(2)">
            <image
              src="../static/image/weibaoyuyue.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <view class="mt15"> 维保预约 </view>
          </view>
          <view class="tac" @click="Onpushtag(3)">
            <image
              v-if="tagmaintenance != '3'"
              src="../static/image/baoyangzhuanghuang.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <image
              v-else-if="tagmaintenance == '3'"
              src="../static/image/xuanzhongbaoyangzhuanghuang.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <view class="mt15" :class="{ mainRed: tagmaintenance == '3' }">
              保养装潢
            </view>
          </view>
          <view class="tac" @click="Onpushtag(4)">
            <image
              v-if="tagmaintenance != '4'"
              src="../static/image/guzhangzixun.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <image
              v-else-if="tagmaintenance == '4'"
              src="../static/image/xuanzhongguzhangzixun.svg"
              style="width: 66rpx; height: 66rpx"
            ></image>
            <view class="mt15" :class="{ mainRed: tagmaintenance == '4' }">
              故障咨询
            </view>
          </view>
        </view>
        <view v-if="tagmaintenance == '4'">
            <view class="consultMessage">
                <!-- <consult-people></consult-people> -->
                <view v-if="technicianList.length">
                <consult-people
                    v-for="(v, i) in technicianList"
                    :key="i"
                    :item="v"
                ></consult-people>
                </view>
                <view class="tac mt50" v-else>
                <image
                    style="
                    width: 423rpx;
                    height: 324rpx;
                    margin-top: 100rpx;
                    margin: 0 auto;
                    "
                    src="https://51shanky.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20230818/file_1692345210274.png"
                >
                </image>
                <view class="txtDarkGray">暂无数据</view>
                </view>
            </view>
        </view>
        <view v-if="tagmaintenance == '3'">
          <view style="margin-left: 25rpx" @click="OnInsurance">
            <image
              style="width: 700rpx; height: 168rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695034534918.png"
            >
            </image>
          </view>
          <view
            style="margin: 25rpx; margin-top: 10rpx"
            v-if="dataList.maintainMealListVOS.length != 0"
          >
            <u-search
              :showAction="false"
              placeholder="搜索保养套餐"
              v-model="packagetitle"
              @search="getList"
            ></u-search>
          </view>
          <view
            class="upkeepList flex"
            v-if="dataList.maintainMealListVOS.length != 0"
          >
            <view
              @click="OnPushDetail(item)"
              v-for="(item, index) in dataList.maintainMealListVOS"
              :key="index"
              class="upkeepItem mb10"
            >
              <view style="position: relative">
                <image
                  :src="item.cover_image"
                  class="upkeepImg"
                  mode="aspectFill"
                ></image>
                <view
                  class="fanyong"
                  v-if="isExpert == 1 && token && item.commissionPrice"
                >
                  <view class="u-flex">
                    <view class="u-flex">
                      <view class="rebate-img rebate-size"></view>
                    </view>
                    <view class="rebate-style" style="margin-right: 24rpx">
                      {{ item.commissionPrice }}
                    </view>
                  </view>
                </view>
              </view>
              <view class="upkeepCont">
                <view class="ukH moreLine mb20">{{ item.maintain_name }}</view>
                <view class="flex priceLine">
                  <u-icon
                    name="rmb"
                    bold="true"
                    color="#D91B1B"
                    size="12"
                  ></u-icon>
                  <view class="huiPrice"
                    >{{ item.bankCardPrice ? item.bankCardPrice : item.price }}
                  </view>
                  <view class="txtLighGray size24 ml10 txtls"
                    >原价{{ item.market_price }}元</view
                  >
                </view>
                <view class="flex alc jsb">
                  <view class="txtLighGray size24">{{
                    detail.storeAbbreviation
                  }}</view>
                  <view class="goShop" v-if="iscommission == 0">购买</view>
                  <view
                    @click.stop="Onjoinshop(item, index, 4)"
                    class="goShop"
                    v-else-if="iscommission == 1"
                    :class="{ Asreminder: item.isSelection == 1 }"
                  >
                    加小店
                  </view>
                </view>
              </view>
            </view>
            <u-loading-icon :show="showuloadingicon"></u-loading-icon>
          </view>
          <view v-else style="margin-top: 120rpx; text-align: center">
            <image
              style="width: 250rpx; height: 250rpx"
              src="../static/image/zanwubaoyang.png"
            ></image>
          </view>
          <!--  #ifdef MP-WEIXIN  -->
          <view
            v-if="iscommission == 0"
            class="contact"
            :style="{ paddingBottom: safeHeight == 0 ? 0 : '10rpx' }"
          >
            <view @click="Oncontact" class="btn"> 联系客户经理 </view>
          </view>
          <!--  #endif -->
          <view style="height: 200rpx"> </view>
        </view>
      </view>
      <view v-if="dataTag == 4 && !showuloadingicon">
        <view v-if="iscommission == 0" class="activity-tab">
          <view
            class="tab-item"
            :class="{ 'ctab-item': activitytag == 1 }"
            @click="Onactivity(1)"
          >
            户内嗨乐
          </view>
          <view
            class="tab-item"
            :class="{ 'ctab-item': activitytag == 3 }"
            @click="Onactivity(3)"
          >
            户外畅游
          </view>
          <view
            class="tab-item"
            :class="{ 'ctab-item': activitytag == 4 }"
            @click="Onactivity(4)"
          >
            优惠资讯
          </view>
          <view
            class="tab-item"
            :class="{ 'ctab-item': activitytag == 2 }"
            @click="Onactivity(2)"
          >
            精彩回放
          </view>
        </view>
        <view v-if="activitytag == 4" class="consulting-service">
          <view
            v-for="(item, index) in brandNewList"
            :key="index"
            class="card"
            @click="Onbrand(item)"
          >
            <view>
              <u-avatar shape="square" size="65" :src="item.faceImg"></u-avatar>
            </view>
            <view style="margin-left: 21rpx; position: relative">
              <view class="moreLine" style="font-size: 28rpx; width: 514rpx">
                {{ item.title }}
              </view>
              <view
                class="u-flex alc"
                style="
                  font-size: 24rpx;
                  color: #999999;
                  position: absolute;
                  bottom: 0rpx;
                  width: 514rpx;
                  justify-content: space-between;
                  position: absolute;
                  bottom: 0rpx;
                "
              >
                <!-- 	<view>{{ item.shopName }}
								</view> -->
                <view>{{ item.createdAt }} </view>
                <view class="typemsg-btn">{{ item.typeMsg }} </view>
              </view>
            </view>
          </view>
        </view>
        <view v-if="activitytag == 1 || activitytag == 3" style="margin: 25rpx">
          <view v-if="dataList.length != 0">
            <view
              v-for="(item, index) in dataList"
              :key="index"
              style="margin-top: 47rpx"
              @click="OnPushactivityDetail(item)"
            >
              <view
                class="coverPictureactivity"
                :style="{
                  backgroundImage: 'url(' + item.coverPicture + ')',
                  backgroundSize: 'cover',
                }"
              >
                <view
                  style="
                    line-height: 52rpx;
                    font-size: 24rpx;
                    color: #ffffff;
                    padding-left: 14rpx;
                    border-radius: 0rpx 24rpx 28rpx 0rpx;
                    position: absolute;
                    top: 30rpx;
                    padding-right: 20rpx;
                    height: 52rpx;
                    background: linear-gradient(
                      90deg,
                      #d91b1b 0%,
                      #e94040 100%
                    );
                  "
                  v-if="
                    item.activitySignUpStatus == 1 ||
                    item.activitySignUpStatus == 2
                  "
                >
                  <text
                    v-if="item.activitySignUpStatus == 2"
                    style="margin-right: 14rpx"
                    >报名截止时间</text
                  >
                  <text
                    style="margin-right: 14rpx"
                    v-if="item.activitySignUpStatus == 1"
                    >报名开启时间</text
                  >
                  {{
                    item.activitySignUpStatus == 2
                      ? item.activityEndTime
                      : item.activityBeginTime
                  }}
                </view>

                <view
                  v-if="
                    item.activitySignUpStatus == 1 ||
                    item.activitySignUpStatus == 2
                  "
                  class="backimg"
                >
                  <view style="font-size: 24rpx; color: #ffffff">
                    {{ item.districtName }}
                  </view>
                </view>
                <view
                  style="position: absolute; left: 260rpx; top: 110rpx"
                  v-if="item.activitySignUpStatus == 1"
                >
                  <image
                    src="@/static/image/huodongyugao.png"
                    style="width: 180rpx; height: 180rpx"
                  >
                  </image>
                </view>
                <view
                  style="position: absolute; left: 260rpx; top: 110rpx"
                  v-if="
                    item.activitySignUpStatus == 3 ||
                    item.activitySignUpStatus == 5 ||
                    item.activitySignUpStatus == 4
                  "
                >
                  <image
                    src="@/static/image/jieshu.png"
                    style="width: 180rpx; height: 180rpx"
                  >
                  </image>
                </view>
                <view
                  style="position: absolute; bottom: 24rpx; right: 27rpx"
                  v-if="item.activitySignUpStatus == 2"
                >
                  <view class="btn">报名中</view>
                </view>
              </view>
              <view class="title">
                {{ item.title }}
              </view>
              <view class="item-detail">
                <view v-if="item.payType == 2">
                  <text style="color: #d91b1b; font-size: 24rpx"> ¥ </text>
                  <text
                    style="
                      color: #d91b1b;
                      font-size: 32rpx;
                      font-weight: bold;
                      margin-left: 9rpx;
                    "
                  >
                    {{
                      item.bankCardPrice
                        ? item.bankCardPrice
                        : item.flashSalePrice
                    }}
                  </text>
                  <text
                    style="
                      color: #999999;
                      font-size: 24rpx;
                      text-decoration: line-through;
                      margin-left: 14rpx;
                    "
                  >
                    原价¥{{ item.marketPrice }}
                  </text>
                </view>
                <view v-else>
                  <text
                    style="color: #d91b1b; font-size: 32rpx; font-weight: bold"
                  >
                    免费
                  </text>
                  <text
                    style="
                      color: #999999;
                      font-size: 24rpx;
                      text-decoration: line-through;
                      margin-left: 14rpx;
                    "
                  >
                    原价¥{{ item.marketPrice }}
                  </text>
                </view>
                <view
                  @click.stop="Onremind(item, index)"
                  class="remind"
                  v-if="item.activitySignUpStatus == 1 && iscommission == 0"
                  :class="{ Asreminder: item.isRemind == 1 }"
                >
                  提醒我
                </view>
                <view
                  class="remind"
                  v-else-if="
                    item.activitySignUpStatus == 1 && iscommission == 1
                  "
                  :class="{ Asreminder: item.isSelection == 1 }"
                  @click.stop="Onjoinshop(item, index, 1)"
                >
                  加小店
                </view>
                <view class="headPortraits" v-else>
                  <view style="margin-right: 16rpx">
                    已报名<text style="margin-left: 9rpx"
                      >{{ item.saleNum }}/{{ item.stock }}</text
                    >
                  </view>
                  <view class="u-flex" v-if="iscommission == 0">
                    <view
                      style="padding-right: 4rpx"
                      v-for="(item1, index1) in item.headPortraits"
                      :key="index1"
                    >
                      <u-avatar size="40rpx" :src="item1"></u-avatar>
                    </view>
                    <view v-if="item.saleNum > 3">
                      <u-icon
                        size="16"
                        :bold="true"
                        name="more-dot-fill"
                      ></u-icon>
                    </view>
                  </view>
                  <view
                    v-else-if="iscommission == 1"
                    class="joinshop"
                    :class="{ Asreminder: item.isSelection == 1 }"
                    @click.stop="Onjoinshop(item, index, 1)"
                  >
                    加小店
                  </view>
                </view>
              </view>
            </view>
            <u-loading-icon :show="showuloadingicon"></u-loading-icon>
          </view>
          <view v-else style="margin-top: 120rpx; text-align: center">
            <image
              style="width: 250rpx; height: 250rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720543309.png"
            >
            </image>
          </view>
        </view>
        <view v-if="activitytag == 2">
          <view
            v-if="dataList.length != 0"
            style="
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              margin: 32rpx 20rpx;
            "
          >
            <view
              v-for="(item, index) in dataList"
              :key="index"
              style="margin-top: 40rpx"
              @click="OnPushreviewDetail(item)"
              :class="{ margintop0: index == 0 || index == 1 }"
            >
              <view v-if="item.coverPicture" style="position: relative">
                <image
                  :mode="mode"
                  :src="item.coverPicture"
                  class="coverPicture"
                >
                </image>
                <view style="position: absolute; top: 14rpx; left: 14rpx">
                  <image
                    src="@/static/image/bofang.png"
                    style="width: 40rpx; height: 40rpx"
                  ></image>
                </view>
              </view>
              <view v-else>
                <image
                  :mode="mode"
                  :src="item.img"
                  class="coverPicture"
                ></image>
              </view>
              <view class="playback-title">
                {{ item.title }}
              </view>
            </view>
            <u-loading-icon :show="showuloadingicon"></u-loading-icon>
          </view>
          <view
            v-else-if="activitytag == 2"
            style="margin-top: 120rpx; text-align: center"
          >
            <image
              style="width: 250rpx; height: 250rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720494984.png"
            >
            </image>
          </view>
        </view>
      </view>
      <view v-if="dataTag == 6 && !showuloadingicon" class="w700 recommend">
        <custom-waterfalls-flow
          imageKey="coverPicture"
          ref="waterfallsFlowRef"
          :value="dataList"
          @imageClick="jumpDetail"
        >
          <view
            v-for="(item, index) in dataList"
            :key="index"
            class="recommend-item"
            slot="slot{{index}}"
          >
            <view class="recommend-item-bottom">
              <view class="recommend-item-bottom-title"
                >{{
                  item.activityTitle || item.articleTitle || item.productTitle
                }}
              </view>
              <view class="flex alc jsb">
                <view class="flex alc" style="padding-left: 10rpx">
                  <u-avatar size="20" :src="item.headImg"></u-avatar>
                  <view class="recommend-item-bottom-name">{{
                    item.nickname
                  }}</view>
                </view>
                <view class="recommend-item-bottom-check"
                  >{{ item.viewBaseNum }}人看过</view
                >
              </view>
            </view>
          </view>
        </custom-waterfalls-flow>
      </view>
      <!-- 达人推荐 -->
      <view v-if="dataTag == 7">
        <WaterfallFlowList
          :fromType="4"
          :shopId="id"
          :relatedType="6"
        ></WaterfallFlowList>
      </view>
      <view
        v-if="isLoadMore && dataList.length != 0 && tagmaintenance != '4'"
        class="size24 tac txtLighGray"
        style="margin: 0rpx auto"
      >
        我到底啦~
      </view>
    </view>
    <view class="safe-bottom-height"></view>
    <u-popup
      :show="searchVisble"
      @close="closeSearch"
      :safeAreaInsetBottom="false"
      :safeAreaInsetTop="false"
      mode="top"
    >
      <view class="top-search">
        <view class="select" style="margin-top: 0">
          <view class="u-flex-al">
            <view
              class="u-flex-al"
              @click="openSearch(3)"
              style="
                width: 171rpx;
                justify-content: flex-end;
                margin-left: 15rpx;
              "
            >
              <view
                class="text ellipsis"
                :class="{ 'text-bold': searchType === 3 }"
                style="max-width: 120rpx"
              >
                {{
                  searchField.energyTypeName
                    ? searchField.energyTypeName
                    : '能源类型'
                }}
              </view>
              <view style="margin-left: 11rpx">
                <u-icon
                  name="arrow-down-fill"
                  color="#222222"
                  size="16rpx"
                ></u-icon>
              </view>
            </view>
            <view
              class="u-flex-al"
              @click="openSearch(2)"
              style="
                width: 144rpx;
                justify-content: flex-end;
                margin-left: 15rpx;
              "
            >
              <view
                class="text ellipsis"
                :class="{ 'text-bold': searchType === 2 }"
                style="max-width: 120rpx"
              >
                {{ searchField.brandName ? searchField.brandName : '车型种类' }}
              </view>
              <view style="margin-left: 11rpx">
                <u-icon
                  name="arrow-down-fill"
                  color="#222222"
                  size="16rpx"
                ></u-icon>
              </view>
            </view>

            <view
              class="u-flex-al"
              @click="openSearch(1)"
              style="width: 160rpx; justify-content: flex-end"
            >
              <view
                class="text ellipsis"
                :class="{ 'text-bold': searchType === 1 }"
                style="max-width: 120rpx"
              >
                {{
                  searchField.carPriceName
                    ? searchField.carPriceName
                    : '车价区间'
                }}
              </view>
              <view style="margin-left: 11rpx">
                <u-icon
                  name="arrow-down-fill"
                  color="#222222"
                  size="16rpx"
                ></u-icon>
              </view>
            </view>
            <view
              class="u-flex-al"
              @click="openSearch(4)"
              style="width: 160rpx; justify-content: flex-end"
            >
              <view
                class="text ellipsis"
                :class="{ 'text-bold': searchType === 4 }"
                style="max-width: 120rpx"
              >
                {{
                  searchField.autofinance ? searchField.autofinance : '汽车金融'
                }}
              </view>
              <view style="margin-left: 11rpx">
                <u-icon
                  name="arrow-down-fill"
                  color="#222222"
                  size="16rpx"
                ></u-icon>
              </view>
            </view>
          </view>
        </view>
        <view class="top-search-btn-view">
          <template v-if="searchType === 1">
            <view
              :key="-1"
              class="top-search-btn"
              @click="searchItem({ id: '', name: '全部' })"
              :style="{
                color: searchField.carPriceId == '' ? '#D91B1B' : '#222222',
                background:
                  searchField.carPriceId == '' ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view
              v-for="(item, index) in carPriceList"
              :key="index"
              class="top-search-btn"
              @click="searchItem(item)"
              :style="{
                color:
                  searchField.carPriceId == item.id ? '#D91B1B' : '#222222',
                background:
                  searchField.carPriceId == item.id ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
            </view>
          </template>
          <template v-if="searchType === 2">
            <view
              :key="-1"
              class="top-search-btn"
              @click="searchItem({ id: '', name: '全部' })"
              :style="{
                color: searchField.brandId == '' ? '#D91B1B' : '#222222',
                background: searchField.brandId == '' ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view
              v-for="(item, index) in brandList"
              :key="index"
              class="top-search-btn"
              @click="searchItem(item)"
              :style="{
                color: searchField.brandId == item.id ? '#D91B1B' : '#222222',
                background:
                  searchField.brandId == item.id ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
            </view>
          </template>
          <template v-if="searchType === 3">
            <view
              :key="-1"
              class="top-search-btn"
              @click="searchItem({ id: '', name: '全部' })"
              :style="{
                color: searchField.energyTypeId == '' ? '#D91B1B' : '#222222',
                background:
                  searchField.energyTypeId == '' ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view
              v-for="(item, index) in energyTypeList"
              :key="index"
              class="top-search-btn"
              @click="searchItem(item)"
              :style="{
                color:
                  searchField.energyTypeId == item.id ? '#D91B1B' : '#222222',
                background:
                  searchField.energyTypeId == item.id ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
            </view>
          </template>
          <template v-if="searchType === 4">
            <view
              :key="-1"
              class="top-search-btn"
              @click="searchItem({ id: '', name: '全部' })"
              :style="{
                color: searchField.autoFinance == '' ? '#D91B1B' : '#222222',
                background:
                  searchField.autoFinance == '' ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view
              v-for="(item, index) in autofinanceList"
              :key="index"
              class="top-search-btn"
              @click="searchItem(item)"
              :style="{
                color:
                  searchField.autoFinance == item.id ? '#D91B1B' : '#222222',
                background:
                  searchField.autoFinance == item.id ? '#FFF1F1' : '#F8F8F8',
              }"
            >
              <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>
    </u-popup>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="showcontact"
      @close="showcontact = false"
      mode="bottom"
    >
      <view class="pop-title">联系客户经理</view>
      <view class="pop-Tips">
        <view>
          <image
            src="../static/image/shouzhi.png"
            style="width: 28rpx; height: 34rpx"
          ></image>
        </view>
        <view style="font-size: 24rpx; color: #666666; margin-left: 18rpx">
          选择您的客户经理，之后为您专属服务
        </view>
      </view>
      <view
        v-for="(item, index) in dataList.customerManagerListVOS"
        :key="index"
        style="margin-left: 25rpx; margin-right: 50rpx"
      >
        <view class="manger-list">
          <view class="u-flex" style="align-items: center">
            <view>
              <u-avatar size="46" :src="item.url"></u-avatar>
            </view>
            <view style="margin-left: 24rpx">
              <view style="font-size: 36rpx; font-weight: bold">
                {{ item.nickname }}
              </view>
              <view style="font-size: 24rpx; color: #666666">
                已服务{{ item.num }}人
              </view>
            </view>
          </view>
          <view @click="OnManger(item)" class="pop-choose"> 选择 </view>
        </view>
      </view>
      <view style="height: 60rpx"> </view>
    </u-popup>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="showcode"
      @close="showcode = false"
      mode="center"
    >
      <view style="width: 700rpx; height: 700rpx">
        <view style="text-align: center; margin-top: 50rpx">
          <image
            @click="OnpreviewImage"
            :show-menu-by-longpress="true"
            style="width: 440rpx; height: 444rpx"
            :src="dataList.code"
          ></image>
        </view>
        <view style="font-size: 24rpx; text-align: center; margin-top: 50rpx">
          <view>长按保存客户经理微信二维码</view>
          <view>添加客户经理进行售后</view>
        </view>
      </view>
    </u-popup>
    <request-loading></request-loading>
    <!-- <u-loading-icon :show="showuloadingicon"></u-loading-icon> -->
  </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue';
import WaterfallFlowList from '@/components/darenRecommend/WaterfallFlowList.vue';
import { tologin } from '@/utils/index.js';
import ConsultPeople from '@/components/ConsultPeople';

export default {
  components: { carousel, WaterfallFlowList, ConsultPeople },
  data() {
    return {
      technicianList: [], // 技师列表
      radiovalue1: false,
      rules: {
        brandVehicle: {
          type: 'string',
          required: true,
          message: '请填写品牌',
          trigger: ['blur', 'change'],
        },
        carYear: {
          type: 'string',
          required: true,
          message: '请填写车辆年份',
          trigger: ['blur', 'change'],
        },
        mileage: {
          type: 'string',
          required: true,
          message: '请填写车辆行驶里程',
          trigger: ['blur', 'change'],
        },
        customerName: {
          type: 'string',
          required: true,
          message: '请填写车主姓名',
          trigger: ['blur', 'change'],
        },
        customerMobile: [
          {
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
          },
        ],
      },
      cardata: {
        brandVehicle: '',
        carYear: '',
        customerMobile: '',
        customerName: '',
        mileage: '',
        shopId: '',
      },
      tagmaintenance: '3',
      token: null,
      isExpert: null,
      showuloadingicon: false,
      systemCode: 'applets_store_car_buying',
      activitytag: 1,
      current: 1,
      detail: {},
      managerList: [],
      safeHeight: 0,

      energyTypeList: [
        {
          id: 1,
          name: '燃油车',
        },
        {
          id: 2,
          name: '新能源',
        },
        {
          id: 3,
          name: '混合动力',
        },
      ],
      autofinanceList: [
        {
          id: 1,
          name: '银行分期',
        },
        {
          id: 2,
          name: '先租后买',
        },
        {
          id: 3,
          name: '厂家金融',
        },
      ],
      brandList: [
        {
          id: 1,
          name: '轿车',
        },
        {
          id: 2,
          name: 'SUV',
        },
        {
          id: 3,
          name: 'MPV',
        },
        {
          id: 4,
          name: '轿跑',
        },
      ],
      carPriceList: [
        {
          id: 1,
          name: '10万以下',
        },
        {
          id: 2,
          name: '10-15万',
        },
        {
          id: 3,
          name: '15-20万',
        },
        {
          id: 4,
          name: '20-30万',
        },
        {
          id: 5,
          name: '30-40万',
        },
        {
          id: 6,
          name: '40-50万',
        },
        {
          id: 7,
          name: '50万以上',
        },
      ],
      property: 1,
      tabsindex: 0,
      searchType: 1,
      searchVisble: false, //筛选弹框
      id: '',
      tag: [],
      dataTag: '1',
      scrollTop: 0,
      bannerList: [],
      searchField: {
        carPriceId: '', //车价
        carPriceName: '', //车价名称
        autofinance: '', //汽车金融
        brandId: '', //品牌
        brandName: '', //品牌名称
        energyTypeId: '', //能源类型
        autoFinance: '', //汽车金融类型
        energyTypeName: '', //能源类型名称
        size: 10,
      },
      customerManagerId: '',
      isReachBottom: false, //没有更多
      dataList: [],
      showcontact: false,
      isLoadMore: false,
      showcode: false,
      carType: null,
      energyType: null,
      autoFinance: null,
      priceMax: 9999999999,
      priceMin: 0,
      shopId: '',
      iscommission: 0,
      brandNewList: [],
      mode: 'aspectFill',
      isshowpage: false,
      packagetitle: '',
    };
  },
  onLoad(option) {
    if (option.tabsindex == 1) {
        this.tabsindex = option.tabsindex;
        this.dataTag = 3;
        this.systemCode = 'applets_store_maintain';
        this.tagmaintenance = 4;
    }
    if (option.iscommission) {
      this.iscommission = option.iscommission;
    }
    if (option.scene) {
      // this.id=option.scene.split('_')[1]
      this.$newrequest
        .post('/coc-system/api/v1/system/customer/manager/detail', {
          customerManagerId: option.scene.split('_')[1],
        })
        .then((res) => {
          this.id = res.data.shopId;
          this.clicktag({
            index: 2,
            name: '保养',
            value: '3',
            isnew: true,
          });
          this.customerManagerId = option.scene.split('_')[1];
          this.tabsindex = 1;
          this.getDetail();
          this.getList();
        });
    } else {
      this.id = option.id;
      this.getDetail();
      this.getList();
    }
    if (option.tabsindex == 1) {
        this.getTechnicianList();
    }

    this.token = uni.getStorageSync('token');
    this.isExpert = uni.getStorageSync('isExpert');
    this.cardata.customerMobile = uni.getStorageSync('mobile');
  },
  onPageScroll(res) {
    this.scrollTop = res.scrollTop;
  },
  computed: {
    height() {
      return `calc(100vh - 42px - 48rpx - ${this.safeHeight}px)`;
    },
    isSticky() {
      return this.scrollTop < this.stickyTop;
    },
    stickyTop() {
      return this.bannerList.length > 0 ? uni.upx2px(950) : uni.upx2px(644);
    },
  },
  onShow() {},
  onReady() {
    uni
      .createSelectorQuery()
      .in(this)
      .select('.safe-bottom-height')
      .boundingClientRect((data) => {
        this.safeHeight = data.height;
      })
      .exec();
    if (this.$refs.uForm) {
        this.$refs.uForm.setRules(this.rules)
    }
  },
  onReachBottom() {
    if (this.dataTag != 7) {
      if (!this.isLoadMore) {
        this.current++;
        this.getList();
      }
    } else {
      uni.$emit('recommend');
    }
  },
  methods: {
    getTechnicianList() {
        this.$newrequest
        .post('/coc-active/api/v1/technician/list', {
        shopId: this.id,
        cityCode: '', // 市编码 this.cityObj.cityCode
        })
        .then((res) => {
        this.technicianList = res.data || [];
        });
    },
    onreturn() {
      if (window._51club) {
        window._51club.backIntercept('app');
      }
      if (window.webkit && window.webkit.messageHandlers) {
        window.webkit.messageHandlers.backIntercept.postMessage('app');
      }
    },
    Onadd() {
      if (tologin() !== true) {
        return;
      }
      if (!this.radiovalue1) {
        uni.$u.toast('请同意并阅读个人信息保护声明');
        return false;
      }
      this.cardata.shopId = this.id;
      this.$refs.uForm.validate().then((res) => {
        this.$request
          .post(
            '/coc-active/api/v1/four_s/clues/used/car/evaluation/add',
            this.cardata
          )
          .then((res) => {
            if (res.code == 200) {
              uni.$u.toast('操作成功');
              this.cardata = {
                brandVehicle: '',
                carYear: '',
                customerMobile: '',
                customerName: '',
                mileage: '',
                shopId: '',
              };
            } else {
              uni.$u.toast(res.message);
            }
          });
      });
    },
    OnPushPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
      });
    },
    Onpushtag(index) {
      if (index == 1) {
        //#ifdef MP-WEIXIN
        uni.navigateTo({
          url: '/pages/my/mycar/index?brandId=' + this.detail.brandId,
        });
        // #endif
      } else if (index == 2) {
        //#ifdef MP-WEIXIN
        uni.navigateTo({
          url:
            '/pages/upkeep/bookingForm?shopId=' +
            this.id +
            '&brandId=' +
            this.detail.brandId,
        });
        // #endif
      } else if (index == 3) {
        this.tagmaintenance = '3';
      } else if (index == 4) {
        //#ifdef MP-WEIXIN
        // this.tagmaintenance = '4'
        this.tagmaintenance = '4';
        this.getTechnicianList();
        // #endif
      }
    },
    Onjoinshop(item, index, type) {
      let id = '';
      if (type == 1) {
        id = item.activityId;
      } else {
        id = item.id;
      }
      if (item.isSelection == 0) {
        this.$request
          .post('/coc-active/api/v1/expert/shop/selection/add', {
            type: type,
            relatedId: id,
          })
          .then((res) => {
            if (res.code == 200) {
              if (type == 1) {
                this.dataList[index].isSelection = 1;
              } else {
                this.dataList.maintainMealListVOS[index].isSelection = 1;
              }
              uni.$u.toast('加入小店成功');
            } else {
              uni.$u.toast(res.message);
            }
          });
      } else {
        this.$request
          .post('/coc-active/api/v1/expert/shop/selection/remove', {
            type: type,
            relatedId: id,
          })
          .then((res) => {
            if (res.code == 200) {
              if (type == 1) {
                this.dataList[index].isSelection = 0;
              } else {
                this.dataList.maintainMealListVOS[index].isSelection = 0;
              }
              uni.$u.toast('移出小店成功');
            } else {
              uni.$u.toast(res.message);
            }
          });
      }
    },
    Onpushloadhelp() {
      if (!uni.getStorageSync('token')) {
        uni.navigateTo({
          url: '/pages/activity/share/index',
        });
        return false;
      }
      uni.navigateTo({
        url: '/pages/roadhelp/index',
      });
    },
    OnpreviewImage() {
      let _this = this;
      uni.previewImage({
        urls: _this.dataList.code,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {},
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    OnCarDetail(index, item) {
      let id = '';
      if (this.dataTag == 1) {
        id = item.vehicleInfoId;
      } else {
        id = item.id;
      }
      uni.navigateTo({
        url:
          '/pages/carShops/carList/index?type=' +
          index +
          '&id=' +
          id +
          '&shopId=' +
          this.id,
      });
    },
    Oncall() {
      uni.makePhoneCall({
        phoneNumber: this.detail.mobile, //仅为示例
      });
    },
    OnLocation() {
      let _this = this;
      uni.getLocation({
        type: 'gcj02', //返回可以用于uni.openLocation的经纬度
        success: function (res) {
          const latitude = _this.detail.lat;
          const longitude = _this.detail.lng;
          uni.openLocation({
            latitude: latitude,
            longitude: longitude,
            success: function () {
              console.log('success');
            },
          });
        },
      });
    },
    Onbrand(item) {
      uni.navigateTo({
        url: '/pages/carShops/upkeep/brandInfo?id=' + item.id,
      });
    },
    receiveCoupon(item) {
      if (tologin() !== true) {
        return;
      }
      this.$request
        .post('/coc-active/api/v1/couponNew/userGetCouponFromTicketCenter', {
          couponNewId: item.id,
        })
        .then((res) => {
          if (res.code == 200) {
            uni.showToast({
              title: '领取成功，前往我的券包查看',
              icon: 'none',
              duration: 2000,
            });
            this.current = 1;
            this.isLoadMore = false;
            this.getList();
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    lookCoupon(item) {
      uni.navigateTo({
        url:
          '/pages/carShops/upkeep/couponDes?id=' +
          item.id +
          '&jumpType=quancenter',
      });
    },

    OnPushreviewDetail(item) {
      uni.navigateTo({
        url: '/pages/home/wonderfulReview/detail?id=' + item.marvellousId,
      });
    },
    Onactivity(index) {
      this.activitytag = index;
      this.getList();
    },
    OnManger(item) {
      this.$request
        .post('/coc-active/api/v1/four_s/customer_manager/bind', {
          id: item.id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.showcontact = false;
            uni.showToast({
              title: '绑定客户经理成功',
              icon: 'none',
            });
            this.dataList.isBind = 1;
            this.getList();
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
            });
          }
        });
    },
    Onremind(item, index) {
      tologin();
      let _this = this;
      if (item.isRemind == 1) {
        return false;
      }
      uni.requestSubscribeMessage({
        tmplIds: ['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'],
        success(res) {
          if (res['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'] == 'accept') {
            _this.$request
              .get(
                '/coc-active/api/v1/activity/signUpStartRemind/' +
                  item.activityId
              )
              .then((s) => {
                if (s.code == 200) {
                  this.dataList[index].isRemind = 1;
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
              });
          }
        },
      });
    },
    OnPushactivityDetail(item) {
      uni.navigateTo({
        url:
          '/pages/carShops/4Sdetail/shopActiveDetail?id=' +
          item.activityId +
          '&iscommission=' +
          this.iscommission,
      });

      // uni.navigateTo({
      // 	url: '/pages/home/activityDetail/index?id=' + item.activityId + '&iscommission=' + this
      // 		.iscommission
      // })
    },
    getDetail() {
      if (!this.isshowpage) {
        this.$showLoading();
      }
      this.$newrequest
        .get('/coc-active/api/v1/four_s/shopDetails/' + this.id)
        .then((res) => {
          if (res.data.isUsedCar == 1) {
            this.tag = [
              {
                name: '新车鉴赏',
                value: '1',
              },
              {
                name: '二手车',
                value: '2',
              },
              {
                name: '维修保养',
                value: '3',
              },
              {
                name: '玩乐专区',
                value: '4',
              },
              {
                name: '二手车评估',
                value: '6',
              },
              {
                name: '达人推荐',
                value: '7',
              },
            ];
          } else {
            this.tag = [
              {
                name: '新车鉴赏',
                value: '1',
              },
              {
                name: '维修保养',
                value: '3',
              },
              {
                name: '玩乐专区',
                value: '4',
              },
              {
                name: '二手车评估',
                value: '6',
              },
              {
                name: '达人推荐',
                value: '7',
              },
            ];
          }
          if (this.iscommission == 1) {
            this.tag = [
              {
                name: '新车鉴赏',
                value: '1',
              },
              {
                name: '维修保养',
                value: '3',
              },
              {
                name: '玩乐专区',
                value: '4',
              },
              {
                name: '二手车评估',
                value: '6',
              },
              {
                name: '达人推荐',
                value: '7',
              },
            ];
          }
          this.detail = res.data;
          this.$refs.carousel.getCarouselListshopid(
            'applets_store_car_buying',
            option.id
          );
        })
        .catch((err) => {})
        .finally(() => {
          if (!this.isshowpage) {
            this.isshowpage = true;
            this.$hideLoading();
          }
        });
    },

    Oncontact() {
      if (tologin() !== true) {
        return;
      }
      if (this.dataList.isBind == 0) {
        this.showcontact = true;
      } else {
        this.showcode = true;
        this.$request
          .post('/coc-active/api/v1/four_s/save_data', {
            type: '4',
            shopId: this.id,
          })
          .then((res) => {});
      }
    },
    OnPushDetail(item) {
      uni.navigateTo({
        url:
          '/pages/carShops/upkeep/detail?id=' +
          item.id +
          '&customerManagerId=' +
          this.customerManagerId +
          '&iscommission=' +
          this.iscommission,
      });
    },
    OnInsurance() {
      uni.navigateTo({
        url: '/pages/carShops/upkeep/insurance?id=' + this.id,
      });
    },
    //选中搜索项
    searchItem(item) {
      if (this.searchType == 1) {
        this.searchField.carPriceId = item.id;
        if (item.id == 1) {
          this.priceMax = 100000;
          this.priceMin = 0;
        } else if (item.id == 2) {
          this.priceMax = 150000;
          this.priceMin = 100000;
        } else if (item.id == 3) {
          this.priceMax = 200000;
          this.priceMin = 150000;
        } else if (item.id == 4) {
          this.priceMax = 300000;
          this.priceMin = 200000;
        } else if (item.id == 5) {
          this.priceMax = 400000;
          this.priceMin = 300000;
        } else if (item.id == 6) {
          this.priceMax = 500000;
          this.priceMin = 400000;
        } else if (item.id == 7) {
          this.priceMax = 9999999999;
          this.priceMin = 500000;
        } else {
          this.priceMax = 9999999999;
          this.priceMin = 0;
        }
        this.searchField.carPriceName = item.id ? item.name : '';
      } else if (this.searchType == 2) {
        this.searchField.brandId = item.id;
        this.carType = item.id;
        this.searchField.brandName = item.id ? item.name : '';
      } else if (this.searchType == 3) {
        this.searchField.energyTypeId = item.id;
        this.energyType = item.id;
        this.searchField.energyTypeName = item.id ? item.name : '';
      } else if (this.searchType == 4) {
        this.searchField.autoFinance = item.id;
        this.autoFinance = item.id;
        this.searchField.autofinance = item.id ? item.name : '';
      }
      this.isReachBottom = false;
      this.isLoadMore = false;
      this.current = 1;
      this.searchVisble = false;
      this.getList();
    },
    //打开筛选框
    openSearch(type) {
      //type 1:排序 2:车价 3:品牌 4:能源类型
      this.searchType = type;
      this.searchVisble = true;
      if (this.isSticky) {
        uni.pageScrollTo({
          scrollTop: this.stickyTop,
          duration: 0,
        });
      }
    },
    //关闭筛选框
    closeSearch() {
      this.searchType = 1;
      this.searchVisble = false;
    },
    clicktag(index) {
      if (index.value == 1 || index.value == 2) {
        this.systemCode = 'applets_store_car_buying';
      } else if (index.value == 3) {
        this.systemCode = 'applets_store_maintain';
      } else if (index.value == 4) {
        this.systemCode = 'applets_store_activity';
      } else if (index.value == 5) {
        this.systemCode = 'applets_store_discount';
      }
      if (index.isnew) {
      } else {
        this.$refs.carousel.getCarouselList(this.systemCode);
      }
      this.tabsindex = index.index;
      this.dataTag = index.value;
      this.current = 1;
      this.carType = null;
      this.energyType = null;
      this.autoFinance = null;
      this.priceMax = 9999999999;
      this.priceMin = 0;
      this.searchField.carPriceName = '车价区间';
      this.searchField.brandName = '车型种类';
      this.searchField.energyTypeName = '能源类型';
      this.searchField.autofinance = '汽车金融';
      this.searchField.carPriceId = '';
      this.searchField.brandId = '';
      this.searchField.energyTypeId = '';
      this.searchField.autoFinance = '';
      this.dataList = [];
      this.isLoadMore = false;
      this.getList();
    },
    getmaintainmeal() {
      this.$newrequest
        .post('/coc-active/api/v1/four_s/maintain_meal/list', {
          shopId: this.id,
          title: this.packagetitle,
        })
        .then((res) => {
          this.showuloadingicon = false;
          this.dataList = res.data;
          this.isLoadMore = true;
        });
    },
    getactivity() {
      this.$newrequest
        .post('/coc-active/api/v2/homePage/getActivitysV2', {
          categoryId: '',
          current: this.current,
          newUserLimit: 0,
          payType: 0,
          shopTypeId: 2,
          size: 20,
          title: '',
          shopId: this.id,
          property: this.property,
        })
        .then((res) => {
          if (res.code === 200) {
            if (this.iscommission == 1) {
              res.data.homePageActivitysVOIPage.newrecords = [];
              res.data.homePageActivitysVOIPage.records.filter((s) => {
                if (
                  s.activitySignUpStatus == 1 ||
                  s.activitySignUpStatus == 2
                ) {
                  res.data.homePageActivitysVOIPage.newrecords.push(s);
                }
              });
            } else {
              res.data.homePageActivitysVOIPage.newrecords =
                res.data.homePageActivitysVOIPage.records;
            }
            if (res.data.homePageActivitysVOIPage.records.length < 20) {
              this.isLoadMore = true;
            }
            if (res.data.homePageActivitysVOIPage.current == 1) {
              this.dataList = res.data.homePageActivitysVOIPage.newrecords;
            } else {
              res.data.homePageActivitysVOIPage.newrecords.filter((s) => {
                this.dataList.push(s);
              });
            }
          } else {
            this.dataList = [];
          }
          this.showuloadingicon = false;
        });
    },
    getReview() {
      this.$newrequest
        .post('/coc-active/api/v2/homePage/wonderfulReview', {
          categoryId: 0,
          current: this.current,
          shopTypeId: 0,
          size: 20,
          title: '',
          shopId: this.id,
        })
        .then((res) => {
          this.showuloadingicon = false;
          res.data.marvellousVOIPage.records.filter((s) => {
            if (s.videos) {
              s.coverPicture =
                s.videos + '?x-oss-process=video/snapshot,t_1000,m_fast';
            }
          });
          if (res.data.marvellousVOIPage.records.length == 0) {
            this.isLoadMore = false;
          }
          if (this.current === 1) {
            this.dataList = res.data.marvellousVOIPage.records;
          } else {
            res.data.marvellousVOIPage.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    getusedCar() {
      this.$newrequest
        .post('/coc-active/api/v1/four_s/usedCar', {
          carType: this.carType,
          current: this.current,
          energyType: this.energyType,
          priceMax: this.priceMax,
          priceMin: this.priceMin,
          shopId: this.id,
          size: 20,
        })
        .then((res) => {
          this.showuloadingicon = false;
          if (res.data.records.length < 20) {
            this.isLoadMore = true;
          }
          res.data.records.filter((s) => {
            s.biaoqian = [];
            s.biaoqian.push(s.vehicleTags.split(','));
          });
          if (res.data.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    getnewCarDiscount() {
      this.$newrequest
        .post('/coc-active/api/v2/homePage/four_s/carModelList', {
          carType: this.carType,
          current: this.current,
          energyType: this.energyType,
          autoFinance: this.autoFinance,
          priceMax: this.priceMax,
          priceMin: this.priceMin,
          shopId: this.id,
          size: 20,
        })
        .then((res) => {
          this.showuloadingicon = false;
          if (res.data.records.length < 20) {
            this.isLoadMore = true;
          }
          if (res.data.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    getcenter() {
      this.$newrequest
        .post('/coc-active/api/v1/couponNew/shop/ticket/center', {
          current: this.current,
          shopId: this.id,
          size: 99,
        })
        .then((res) => {
          if (res.data.records.length < 99) {
            this.isLoadMore = true;
          }
          if (res.data.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    getbrandNews() {
      this.$newrequest
        .post('coc-active/api/v1/fours/brandNews/list', {
          current: 1,
          shopId: this.id,
          size: 99,
        })
        .then((res) => {
          this.showuloadingicon = false;
          this.brandNewList = res.data.records;
        });
    },

    getList() {
      if (this.dataTag == 3) {
        this.showuloadingicon = true;
        this.getmaintainmeal();
      } else if (this.dataTag == 4) {
        this.showuloadingicon = true;
        if (this.activitytag == 1) {
          this.property = 2;
          this.getactivity();
        } else if (this.activitytag == 3) {
          this.property = 1;
          this.getactivity();
        } else if (this.activitytag == 2) {
          this.getReview();
        } else if (this.activitytag == 4) {
          this.getbrandNews();
        }
      } else if (this.dataTag == 1) {
        this.showuloadingicon = true;
        this.getnewCarDiscount();
      } else if (this.dataTag == 2) {
        this.showuloadingicon = true;
        this.getusedCar();
      }
      // else if (this.dataTag == 5) {
      // 	this.showuloadingicon = true
      // 	this.getcenter()
      // 	this.getbrandNews()
      // } else if (this.dataTag == 6) {
      // 	// this.showuloadingicon = true
      // 	this.getFind()
      // }
    },
    getFind() {
      this.$request
        .post('/coc-social/api/v2/article/myArticleList', {
          size: 10,
          current: this.current,
          shopId: this.id,
          userId: 0,
        })
        .then((res) => {
          this.showuloadingicon = false;
          if (res.data.records.length < 10) {
            this.isLoadMore = true;
          }
          res.data.records.forEach((v) => {
            if (v.imgs) {
              v.coverPicture = v.imgs.split(',')[0];
            } else if (v.articleCoverImage) {
              v.coverPicture = v.articleCoverImage;
            } else if (v.video) {
              v.coverPicture =
                v.video + '?x-oss-process=video/snapshot,t_1000,m_fast';
            }
          });
          if (res.data.page == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    jumpDetail(value) {
      // 发现跳转
      let type = 2;
      if (value.video) {
        type = 1;
        uni.navigateTo({
          url: '/pages/activity/articlevideo/index?id=' + value.articleId,
        });
      } else {
        uni.navigateTo({
          url: '/pages/activity/waterfull/imglist?id=' + value.articleId,
        });
      }
    },

    zixun() {
      uni.navigateTo({
        url: '/pages/roadhelp/faultAbout/faultSearch',
      });
      uni.setStorageSync('qShopBobile', this.detail.mobile);
      uni.setStorageSync('qShopName', this.detail.storeAbbreviation);
    },
    handleHelp() {
      uni.navigateTo({
        url: '/pages/home/carhelp',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.consultMessage {
  margin: 0 24rpx;
}
.page {
}

.top-detail {
  margin: 30rpx 25rpx;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 28rpx 23rpx 35rpx 27rpx;
  margin-bottom: 0rpx;
}

.shop-name {
  font-size: 32rpx;
  font-weight: bold;
  margin-left: 18rpx;
}

.top-label {
  background-color: rgba(217, 27, 27, 0.1);
  border-radius: 10px;
  font-size: 24rpx;
  color: #d91b1b;
  margin-top: 23rpx;
  padding: 13rpx 26rpx 13rpx 26rpx;
  display: inline-block;
}

.carousel {
  margin: 30rpx 25rpx;
  margin-top: 12rpx;
  margin-bottom: 0rpx;
}

.select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 18rpx;

  .text {
    font-size: 28rpx;
    font-family: PingFang SC;
    // font-weight: 500;
  }

  .text-bold {
    font-weight: bold !important;
  }
}

.sticky-box {
  position: sticky;
  top: var(--window-top);
  z-index: 99;
  flex-direction: row;
  margin: 0px;
  background: #f8f8f8;
}

.u-flex-al {
  display: flex;
  align-items: center;
  width: 750rpx;
  justify-content: space-around;
}

.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.top-search {
  padding: 31rpx 0 40rpx 0rpx;

  .top-search-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #222222;
    display: inline-block;
  }

  .top-search-btn-view {
    margin: 43rpx 25rpx 0rpx 25rpx;
    width: 100%;
    display: table;
  }

  .top-search-btn-other-view {
    margin-left: 10rpx;
  }

  .top-search-btn {
    width: 160rpx;
    height: 60rpx;
    border-radius: 10rpx;
    float: left;
    margin-right: 20rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
  }

  .top-search-otherbtn {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    margin-top: 35rpx;
  }

  .top-search-btn-text {
    font-size: 24rpx;
    font-weight: 500;
  }

  .top-search-confirm {
    width: 150rpx;
    height: 60rpx;
    background: #d91b1b;
    border-radius: 30rpx;
    margin-top: 26rpx;
    margin-bottom: 50rpx;
    margin-left: 250rpx;
  }

  .top-search-confirm-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}

.card-list {
  margin: 25rpx;
  background: #ffffff;
  border-radius: 10rpx;
}

.shopTitle {
  padding: 30rpx 0;

  .moduleTitleL {
    height: 31rpx;
  }
}

.newCarItem {
  position: relative;
  padding: 0 16rpx 0 0;
  background-color: #fff;
  border-radius: 10rpx;
  margin: 10rpx 25rpx;

  .topTip {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    padding: 0 25rpx;
    height: 40rpx;
    line-height: 40rpx;
    border-radius: 10rpx 0 10rpx 0;
  }

  .newCarL {
    image {
      width: 280rpx;
      height: 200rpx;
      border-radius: 10rpx 0 0 10rpx;
    }
  }

  .newCarR {
    width: 380rpx;
    padding: 30rpx 0 20rpx;

    .newCarT {
      font-size: 32rpx;
      font-weight: bold;
      margin-right: 10rpx;
      max-width: 200rpx;
    }

    .carDown {
      width: 38rpx;
      height: 41rpx;
    }

    .newCarHui {
      color: #d91b1b;
    }
  }
}

.mb20 {
  margin-bottom: 20rpx;
}

.goShop {
  width: 100rpx;
  height: 52rpx;
  line-height: 52rpx;
  background: #d91b1b;
  border-radius: 10rpx;
  text-align: center;
  color: #ffffff;
}

.secondCarItem {
  position: relative;
  padding: 15rpx;
  background-color: #fff;
  border-radius: 10rpx;
  margin: 10rpx 25rpx;

  .label {
    background-color: rgba(217, 27, 27, 0.08);
    border-radius: 18rpx;
    color: #d91b1b;
    font-size: 20rpx;
    text-align: center;
    padding: 10rpx;
  }

  .topTip {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 24rpx;
    text-align: center;
    padding: 0 25rpx;
    height: 40rpx;
    line-height: 40rpx;
    border-radius: 10rpx 0 10rpx 0;
  }

  .secondCarL {
    margin-bottom: -4rpx;

    image {
      width: 240rpx;
      height: 240rpx;
      border-radius: 10rpx;
    }
  }

  .newCarR {
    width: 400rpx;
    margin-left: 18rpx;

    .newCarT {
      font-size: 28rpx;
      font-weight: bold;
      margin-right: 10rpx;
      height: 80rpx;
    }

    .carDown {
      width: 38rpx;
      height: 41rpx;
    }

    .newCarHui {
      color: #d91b1b;
    }
  }
}

.upkeepList {
  flex-wrap: wrap;
  margin: 13rpx 25rpx;

  .upkeepItem {
    border-radius: 10rpx;
    background-color: #fff;
    width: 345rpx;
    margin-right: 10rpx;

    .upkeepImg {
      width: 345rpx;
      height: 345rpx;
      border-radius: 10rpx 10rpx 0 0;
    }

    .upkeepCont {
      padding: 15rpx;

      .ukH {
        font-size: 28rpx;
        font-weight: bold;
        height: 76rpx;
      }

      .priceLine {
        align-items: baseline;

        .huiPrice {
          font-size: 44rpx;
          font-weight: bold;
          color: #d91b1b;
        }
      }
    }
  }

  .upkeepItem:nth-child(2n) {
    margin-right: 0;
  }
}

.contact {
  position: fixed;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0rpx;
  height: 120rpx;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    width: 260rpx;
    height: 70rpx;
    background-color: #d91b1b;
    border-radius: 35rpx;
    font-size: 28rpx;
    color: #ffffff;
    text-align: center;
    line-height: 70rpx;
    display: inline-block;
  }
}

.safe-bottom-height {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}

.pop-title {
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 47rpx;
}

.pop-Tips {
  margin: 34rpx 25rpx 30rpx 25rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  display: flex;
  padding: 16rpx 32rpx 10rpx 32rpx;
}

.manger-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 34rpx;
}

.pop-choose {
  width: 100rpx;
  height: 48rpx;
  background: #d91b1b;
  border-radius: 24rpx;
  font-size: 28rpx;
  color: #ffffff;
  text-align: center;
  line-height: 48rpx;
}

.coverPictureactivity {
  width: 700rpx;
  height: 400rpx;
  border-radius: 10rpx;
  position: relative;
}

.backimg {
  position: absolute;
  bottom: 18rpx;
  left: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(34 34 34 / 0.5);
  background-color: rgba(34, 34, 34, 0.5);
  border-radius: 25rpx 25rpx 27rpx 25rpx;
  width: 120rpx;
  height: 52rpx;
}

.btn {
  width: 120rpx;
  height: 52rpx;
  text-align: center;
  background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
  border-radius: 25rpx 25rpx 27rpx 25rpx;
  line-height: 52rpx;
  color: #ffffff;
}

.title {
  margin-top: 35rpx;
  font-size: 28rpx;
  width: 603rpx;
  margin-left: 25rpx;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.item-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 22rpx;
  align-items: center;
  margin-left: 25rpx;
  margin-right: 26rpx;
}

.remind {
  width: 160rpx;
  height: 52rpx;
  border-radius: 26rpx;
  color: #ffffff;
  font-size: 28rpx;
  text-align: center;
  background: #d91b1b;
  line-height: 52rpx;
}

.headPortraits {
  display: flex;
  align-items: center;
  font-size: 24rpx;
}

.Asreminder {
  background-color: #999999;
}

.activity-tab {
  margin-top: 15rpx;
  display: flex;
  justify-content: space-around;

  .tab-item {
    color: #222222;
    background: #e8e8e8;
    border-radius: 10rpx;
    width: 170rpx;
    text-align: center;
    font-size: 24rpx;
    height: 52rpx;
    line-height: 52rpx;

    font-weight: bold;
  }

  .ctab-item {
    color: #d91b1b;
    background: rgba(217, 27, 27, 0.1);
    border: 1px solid #d91b1b;
    width: 170rpx;
    text-align: center;
    font-size: 24rpx;
    height: 52rpx;
    line-height: 52rpx;
    font-weight: bold;
  }
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

.margintop0 {
  margin-top: 0rpx !important;
}

.coverPicture {
  border-radius: 10rpx;
  width: 345rpx;
  height: 460rpx;
}

.quanItem {
  padding: 20rpx 30rpx;

  .HuiNum {
    .typeTip {
      width: 80rpx;
      height: 40rpx;
      line-height: 40rpx;
      color: #fff;
    }

    .leftOneLine {
      width: 350rpx;
    }
  }

  .expirationDate {
    margin-top: 30rpx;
    padding-top: 20rpx;
    border-top: 1rpx dotted #999;
  }

  .quanbtn {
    width: 140rpx;
    height: 56rpx;
    line-height: 56rpx;
    text-align: center;
    color: #ffffff;
    border-radius: 28rpx;
  }

  .bgGray {
    background-color: #f8f8f8;
    color: #999999 !important;
    border: 1rpx solid #f8f8f8;
  }
}

.list-tag {
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.consulting-service {
  .title {
    font-size: 28rpx;
    border-left: 8rpx #d91b1b solid;
    padding-left: 20rpx;
    font-weight: bold;
  }

  .card {
    background: #ffffff;
    border-radius: 10rpx;
    margin: 12rpx 25rpx;
    padding: 14rpx;
    display: flex;
    position: relative;
  }
}

.tag-style {
  background: #fceded;
  border-radius: 18rpx;
  text-align: center;
  padding: 0rpx 8rpx 2rpx 8rpx;
  margin-left: 12rpx;

  .tag-text {
    color: #d91b1b;
    font-size: 20rpx;
    text-align: center;
  }
}

.fanyong {
  position: absolute;
  top: 0rpx;
}

.w700 {
  width: 700rpx;
  margin-left: 25rpx;
}

.recommend {
  &-item {
    background: #ffffff;
    margin-bottom: 10rpx;

    &-video {
      position: absolute;
      width: 82rpx;
      height: 82rpx;
      margin-top: 187rpx;
      margin-left: 130rpx;
    }

    &-image {
      width: 342rpx;
      height: 456rpx;
      background: #000000;
      border-radius: 10rpx;
    }

    &-bottom {
      width: 342rpx;
      border-radius: 0rpx 0rpx 10rpx 10rpx;
      padding-top: 20rpx;
      padding-bottom: 10rpx;

      &-title {
        width: 306rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 36rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin-bottom: 18rpx;
        margin-left: 14rpx;
        margin-right: 20rpx;
      }

      &-image {
        width: 40rpx;
        height: 40rpx;
        margin-left: 15rpx;
        border-radius: 20rpx;
      }

      &-name {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 38rpx;
        margin-left: 10rpx;
      }

      &-check {
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 38rpx;
        margin-right: 20rpx;
      }
    }
  }

  &-bottom {
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
}

::v-deep .u-tabs__wrapper__nav__item {
  padding: 0 8rpx !important;
}

.tagmaintenance-card {
  background: #ffffff;
  border-radius: 10rpx;
  padding: 33rpx 25rpx 29rpx 25rpx;
  display: flex;
  justify-content: space-around;
  font-size: 24rpx;
}

.mt15 {
  margin-top: 0rpx;
}

.usercarassess {
  margin: 25rpx;
  background: #ffffff;
  border-radius: 10rpx 0rpx 0rpx 0rpx;
  padding: 6rpx 27rpx;
}

.btn-car {
  position: fixed;
  bottom: 100rpx;
  left: 50%;
  transform: translate(-50%, 0%);
  width: 600rpx;
  height: 80rpx;
  text-align: center;
  color: #ffffff;
  line-height: 80rpx;
  font-weight: bold;
  background-color: #d91b1b;
  border-radius: 40rpx;
}

.typemsg-btn {
  padding: 12rpx 14rpx;
  background: rgba(217, 27, 27, 0.1);
  border-radius: 24rpx;
  font-size: 24rpx;
  color: #d91b1b;
}
</style>
