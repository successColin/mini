<template>
  <view class="page">
    <view class="top-title">
      <view class="u-flex" style="align-items: flex-end">
        <view style="color: #d91b1b; font-weight: bold; font-size: 52rpx">
          {{ dataList.newVehicleInfoCXDetailVOS[cartype].price / 10000
          }}<text style="font-size: 32rpx">万</text>
        </view>
        <view
          style="
            font-size: 28rpx;
            color: #999999;
            margin-left: 16rpx;
            margin-bottom: 4rpx;
          "
        >
          指导价{{
            dataList.newVehicleInfoCXDetailVOS[cartype].elevatingPrice / 10000
          }}万
        </view>
      </view>
      <view
        class="u-flex"
        style="color: #d91b1b; font-size: 28rpx; font-weight: bold"
      >
        <view>
          <image
            src="@/static/image/down.png"
            class="carDown"
            mode="widthFix"
          ></image>
        </view>
        <view>
          优惠{{
            dataList.newVehicleInfoCXDetailVOS[cartype].discount / 10000
          }}万
        </view>
      </view>
    </view>
    <view class="car-name">
      <view style="font-size: 36rpx; font-weight: bold">
        {{ dataList.vehicleName }}
      </view>
      <view style="font-size: 24rpx; color: #999999">
        {{ dataList.askNum }}人咨询
      </view>
    </view>
    <view class="car-list">
      <u-divider :text="null"></u-divider>
      <view
        style="
          display: flex;
          justify-content: space-between;
          font-size: 28rpx;
          align-items: center;
        "
        @click="Onshowcartype"
      >
        <view class="u-flex">
          <view> 车型 </view>
          <view class="oneLine" style="margin-left: 85rpx; width: 495rpx">
            {{ dataList.newVehicleInfoCXDetailVOS[cartype].cxTitle }}
          </view>
        </view>
        <view>
          <u-icon
            size="12"
            name="arrow-right"
            :bold="true"
            color="#222222"
          ></u-icon>
        </view>
      </view>
      <u-divider :text="null"></u-divider>
    </view>
    <view>
      <scroll-view
        style="margin-left: 25rpx; width: 722rpx; white-space: nowrap"
        scroll-x="true"
      >
        <view class="u-flex">
          <view v-for="(item, index) in dataList.showMsg" :key="index">
            <view v-if="item" class="tag-item">
              <view style="font-size: 32rpx; font-weight: bold; color: #d91b1b">
                {{ item[0] }}
              </view>
              <view style="margin-top: 20rpx">
                {{ item[1] }}
              </view>
              <view>
                {{ item[2] }}
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view @click="OnPushHome" class="adress">
      <view class="u-flex" style="align-items: center">
        <view>
          <u-avatar
            mode="aspectFit"
            size="50"
            :src="dataList.shopAvatar"
            shape="square"
          ></u-avatar>
        </view>
        <view style="margin-left: 17rpx">
          <view style="font-size: 32rpx; font-weight: bold">{{
            dataList.shopName
          }}</view>
          <view style="font-size: 24rpx; color: #666666; margin-top: 21rpx">{{
            dataList.shopAddress
          }}</view>
        </view>
      </view>
      <view class="u-flex" @click.stop="OnOnLocation">
        <view>
          <image
            src="../static/image/dingwei.png"
            style="width: 24rpx; height: 30rpx"
          ></image>
        </view>
        <view style="font-size: 24rpx; margin-left: 14rpx">
          {{ dataList.distance }}
        </view>
      </view>
    </view>
    <view class="parse">
      <u-parse :content="dataList.detail"></u-parse>
    </view>
    <view style="height: 200rpx"></view>
    <!--  #ifdef MP-WEIXIN  -->
    <view class="bottom-btn" style="border-top: 1rpx #e7e7e7 solid">
      <view v-if="dataList.deposit > 0" style="margin-left: 25rpx">
        <view class="size24"
          ><text class="fwb">订金:</text><text class="mainRed size24">￥</text
          ><text class="mainRed size32 fwb">{{ dataList.deposit }}</text>
          元</view
        >
        <view class="size24">
          在线支付订金，到店购车立减<text class="mainRed size24">￥</text
          ><text class="mainRed size32 fwb">{{
            dataList.depositReduction
          }}</text
          >元
        </view>
      </view>
      <view
        class="view"
        :style="{
          paddingBottom: safeHeight > 0 ? 0 : '21rpx',
          margin: dataList.sameNum > 0 ? '0rpx' : '0rpx 0rpx',
        }"
      >
        <!-- <view @click="OnPushSame" v-if="dataList.sameNum>0">
					<image style="width: 93rpx;height: 80rpx;" src="../static/image/tongkuanershouche.png"></image>
				</view>
				<view v-else style="width: 93rpx;margin-left: 53rpx;height: 80rpx;display: none;"></view> -->
        <view @click="Onshowfloorprice" class="btn-bottom"> 获取底价 </view>
        <view @click="Ontestdrive" class="btn-bottom"> 预约试驾 </view>
        <view class="btn-bottom" v-if="dataList.deposit > 0" @click="Onpayment">
          支付订金
        </view>
      </view>
    </view>
    <!--  #endif -->
    <view style="height: 100rpx"></view>
    <!--  #ifdef MP-WEIXIN  -->
    <!-- 	<view @click="Ontestdrive" style="position: fixed;right: 50rpx;bottom: 215rpx;">
			<image style="width: 108rpx;height: 108rpx;" src="../static/image/yuyueshijia.png"></image>
		</view> -->
    <!--  #endif -->
    <u-popup
      :closeable="true"
      :round="10"
      :safeAreaInsetBottom="false"
      :show="showcartype"
      @close="closepop"
      mode="bottom"
    >
      <view class="car-pop-title"> 车型选择 </view>
      <view class="car-pop-detail">
        <u-avatar size="60" :src="dataList.faceImage" shape="square"></u-avatar>
        <view class="flex-item" style="margin-left: 24rpx">
          <view style="font-size: 36rpx; font-weight: bold">
            {{ dataList.vehicleName }}
          </view>
          <view class="u-flex" style="align-items: baseline">
            <view style="color: #d91b1b; font-size: 44rpx; font-weight: bold">
              {{ dataList.newVehicleInfoCXDetailVOS[popcartype].price / 10000
              }}<text style="font-size: 24rpx">万</text>
            </view>
            <view style="font-size: 24rpx; color: #999999; margin-left: 24rpx">
              指导价{{
                dataList.newVehicleInfoCXDetailVOS[popcartype].elevatingPrice /
                10000
              }}万
            </view>
          </view>
        </view>
      </view>
      <scroll-view scroll-y="true" style="max-height: 400rpx">
        <view style="margin-top: 28rpx">
          <view
            @click="OnCurrentCar(index)"
            v-for="(item, index) in dataList.newVehicleInfoCXDetailVOS"
            class="pop-car-list"
            :class="{ 'pop-car-list-current': popcartype == index }"
          >
            <view>{{ item.cxTitle }}</view>
          </view>
        </view>
      </scroll-view>

      <view style="display: flex; justify-content: center; margin-top: 50rpx">
        <view @click="OnTrueCar" class="pop-car-btn"> 确认 </view>
      </view>
      <view style="height: 100rpx"> </view>
    </u-popup>
    <u-popup
      :closeable="true"
      :round="10"
      :safeAreaInsetBottom="false"
      :show="showmanger"
      @close="showmanger = false"
      mode="bottom"
    >
      <view class="pop-title">联系销售</view>

      <view
        v-for="(item, index) in dataList.salesConsultantListVOS"
        :key="index"
        style="margin-left: 25rpx; margin-right: 50rpx"
      >
        <view class="manger-list">
          <view class="u-flex" style="align-items: center">
            <view>
              <u-avatar size="46" :src="item.headPortrait"></u-avatar>
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
          <view class="pop-choose">
            <view @click="OnWechat(item)" style="margin-right: 30rpx">
              <image
                style="width: 48rpx; height: 71rpx"
                src="../static/image/weixinlianxi.png"
              ></image>
            </view>
            <view @click="OnTell(item)">
              <image
                style="width: 38rpx; height: 71rpx"
                src="../static/image/dianhualianxi.png"
              ></image>
            </view>
          </view>
        </view>
      </view>
      <view style="height: 60rpx"> </view>
    </u-popup>
    <u-popup
      :closeable="true"
      :round="10"
      :safeAreaInsetBottom="false"
      :show="showtestdrive"
      @close="showtestdrive = false"
      mode="bottom"
    >
      <view class="pop-title">预约试驾</view>
      <view style="display: flex; justify-content: center; margin-top: 38rpx">
        <view class="pop-submit">
          <view style="margin-top: 9rpx; margin-left: 29rpx">
            <image
              style="width: 36rpx; height: 36rpx"
              src="../static/image/tijiaodianhua.png"
            ></image>
          </view>
          <view style="margin-left: 13rpx"
            >提交信息后经销商会为您安排试驾车与约定试驾时间</view
          >
        </view>
      </view>
      <view
        class="car-pop-detail"
        style="align-items: center; margin-top: 32rpx; margin-bottom: 45rpx"
      >
        <view>
          <u-avatar
            size="60"
            :src="dataList.faceImage"
            shape="square"
          ></u-avatar>
        </view>
        <view style="margin-left: 24rpx">
          <view style="font-size: 36rpx; font-weight: bold">
            {{ dataList.vehicleName }}
          </view>
          <view
            class="oneLine"
            style="font-size: 24rpx; width: 500rpx; margin-top: 21rpx"
          >
            {{ dataList.newVehicleInfoCXDetailVOS[cartype].cxTitle }}
          </view>
        </view>
      </view>
      <view class="card-price">
        <view>
          <view style="font-size: 24rpx"> 经销商报价 </view>
          <view
            style="
              color: #d91b1b;
              font-size: 44rpx;
              font-weight: bold;
              margin-top: 12rpx;
            "
          >
            {{ dataList.newVehicleInfoCXDetailVOS[cartype].price / 10000
            }}<text style="font-size: 24rpx">万</text>
          </view>
        </view>
        <view>
          <view style="font-size: 24rpx"> 降价幅度 </view>
          <view
            class="u-flex"
            style="
              color: #d91b1b;
              font-size: 44rpx;
              font-weight: bold;
              margin-top: 12rpx;
              align-items: center;
            "
          >
            <view>
              <image
                style="width: 38rpx; height: 41rpx"
                src="@/static/image/down.png"
              ></image>
            </view>
            <view style="margin-left: 8rpx">
              {{ dataList.newVehicleInfoCXDetailVOS[cartype].discount / 10000 }}
            </view>
            <view style="font-size: 24rpx; margin-left: 8rpx; margin-top: 8rpx">
              万
            </view>
          </view>
        </view>
        <view>
          <view style="font-size: 24rpx"> 指导价 </view>
          <view
            style="
              color: #999999;
              font-size: 44rpx;
              font-weight: bold;
              margin-top: 12rpx;
            "
          >
            <text style="">{{
              dataList.newVehicleInfoCXDetailVOS[cartype].elevatingPrice / 10000
            }}</text
            ><text style="font-size: 24rpx; text-decoration: none">万</text>
          </view>
        </view>
      </view>
      <view style="margin: 0rpx 25rpx -25rpx 25rpx">
        <scroll-view
          scroll-y="true"
          style="height: 220rpx"
          v-if="dataList.salesConsultantListVOS&&dataList.salesConsultantListVOS.length > 2"
        >
          <view
            v-for="(item, index) in dataList.salesConsultantListVOS"
            :key="item.id"
            class="mb10"
          >
            <view class="u-flex jsb alc">
              <view class="u-flex alc">
                <view>
                  <image
                    style="border-radius: 50%; width: 92rpx; height: 92rpx"
                    :src="item.headPortrait"
                  >
                  </image>
                </view>
                <view class="ml20">
                  <view class="u-flex alc">
                    <view style="font-size: 36rpx" class="fwb">{{
                      item.nickname
                    }}</view>
                    <view class="user-tagitem" v-if="item.tag">
                      {{ item.tag }}
                    </view>
                  </view>
                  <view class="size24 txtDarkGray">已服务{{ item.num }}人</view>
                </view>
              </view>
              <view @click="Onchoosepeople(item, index)">
                <view v-if="currentindex == index">
                  <image
                    style="width: 34rpx; height: 34rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091667034.png"
                  >
                  </image>
                </view>
                <view v-else>
                  <image
                    style="width: 34rpx; height: 34rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091645457.png"
                  >
                  </image>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view v-else>
          <view
            v-for="(item, index) in dataList.salesConsultantListVOS"
            :key="item.id"
            class="mb10"
          >
            <view class="u-flex jsb alc">
              <view class="u-flex alc">
                <view>
                  <image
                    style="border-radius: 50%; width: 92rpx; height: 92rpx"
                    :src="item.headPortrait"
                  >
                  </image>
                </view>
                <view class="ml20">
                  <view class="u-flex alc">
                    <view style="font-size: 36rpx" class="fwb">{{
                      item.nickname
                    }}</view>
                    <view class="user-tagitem" v-if="item.tag">
                      {{ item.tag }}
                    </view>
                  </view>
                  <view class="size24 txtDarkGray">已服务{{ item.num }}人</view>
                </view>
              </view>
              <view @click="Onchoosepeople(item, index)">
                <view v-if="currentindex == index">
                  <image
                    style="width: 34rpx; height: 34rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091667034.png"
                  >
                  </image>
                </view>
                <view v-else>
                  <image
                    style="width: 34rpx; height: 34rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230919/file_1695091645457.png"
                  >
                  </image>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view style="margin: 30rpx">
        <u--form :model="form" ref="uForm" labelWidth="80">
          <u-form-item
            borderBottom
            label="姓名"
            prop="customerName"
            :rules="rules"
          >
            <u-input
              placeholder="请输入姓名"
              border="none"
              v-model="form.customerName"
            />
          </u-form-item>
          <u-form-item
            borderBottom
            label="手机号"
            prop="customerMobile"
            :rules="rules"
          >
            <u-input
              placeholder="请输入手机号"
              border="none"
              v-model="form.customerMobile"
            />
          </u-form-item>
          <u-form-item
            labelPosition="top"
            label="可试驾时间"
            prop="driveTime"
            :rules="rules"
          >
            <view class="u-flex" style="margin-left: 50rpx">
              <view>
                <u-checkbox-group v-model="checkboxValue1" placement="column">
                  <u-checkbox
                    activeColor="#D91B1B"
                    inactiveColor="#D91B1B"
                    :customStyle="{ marginBottom: '8px' }"
                    label="周一至周五"
                    name="1"
                  >
                  </u-checkbox>
                  <u-checkbox
                    activeColor="#D91B1B"
                    inactiveColor="#D91B1B"
                    :customStyle="{ marginBottom: '8px' }"
                    label="上午"
                    name="3"
                  >
                  </u-checkbox>
                </u-checkbox-group>
              </view>
              <view style="margin-left: 50rpx">
                <u-checkbox-group v-model="checkboxValue2" placement="column">
                  <u-checkbox
                    activeColor="#D91B1B"
                    inactiveColor="#D91B1B"
                    :customStyle="{ marginBottom: '8px' }"
                    label="周末"
                    name="2"
                  >
                  </u-checkbox>
                  <u-checkbox
                    activeColor="#D91B1B"
                    inactiveColor="#D91B1B"
                    :customStyle="{ marginBottom: '8px' }"
                    label="下午"
                    name="4"
                  >
                  </u-checkbox>
                </u-checkbox-group>
              </view>
            </view>
          </u-form-item>
          <view style="font-size: 24rpx; color: #999999">
            *试驾时请携带本人驾驶证
          </view>
          <view
            class="u-flex"
            style="margin-top: 42rpx; justify-content: center"
          >
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
              《个人信息保护声明》
            </text>
          </view>
        </u--form>
        <view style="display: flex; justify-content: center; margin-top: 50rpx">
          <view
            @click="Onappointment"
            style="
              width: 380rpx;
              height: 76rpx;
              background: #d91b1b;
              border-radius: 38rpx;
              line-height: 76rpx;
              text-align: center;
              font-size: 32rpx;
              color: #ffffff;
            "
          >
            预约
          </view>
        </view>
      </view>
      <view style="height: 50rpx"></view>
    </u-popup>
    <u-popup
      :closeable="true"
      :round="10"
      :safeAreaInsetBottom="false"
      :show="showcontact"
      @close="showcontact = false"
      mode="center"
    >
      <view style="width: 700rpx; height: 700rpx">
        <view style="text-align: center; margin-top: 50rpx">
          <image
            @click="OnpreviewImage"
            :show-menu-by-longpress="true"
            style="width: 440rpx; height: 444rpx"
            :src="codeurl"
          ></image>
        </view>
        <view style="font-size: 24rpx; text-align: center; margin-top: 50rpx">
          <view>长按保存销售经理微信二维码</view>
        </view>
      </view>
    </u-popup>
    <u-popup
      :closeable="true"
      :round="10"
      :safeAreaInsetBottom="false"
      :show="showfloorprice"
      @close="showfloorprice = false"
      mode="bottom"
    >
      <floorprice
        @OnClosefloorprice="OnClosefloorprice"
        :shopId="shopId"
        ref="Son"
        :cartype="cartype"
        :dataList="dataList"
      ></floorprice>
    </u-popup>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
import { getstorage } from '@/utils/index.js';
import floorprice from '@/pages/carShops/4Sdetail/components/floorprice.vue';
export default {
  components: {
    floorprice,
  },
  data() {
    return {
      currentindex: 0,
      showfloorprice: false,
      radiovalue1: '',
      checkboxValue1: [],
      checkboxValue2: [],
      rules: {
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
        customerName: {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change'],
        },
      },
      form: {
        customerName: '',
        customerMobile: '',
      },
      salesConsultantId: '',
      showmanger: false,
      safeHeight: 0,
      showcartype: false,
      cartype: 0,
      popcartype: 0,
      showtestdrive: false,
      showcontact: false,
      codeurl: '',
    };
  },
  props: {
    dataList: {
      type: Object,
    },
    shopId: {
      type: String,
    },
    isback: {
      type: Boolean,
      default: false,
    },
  },
  onLoad() {},
  created() {
    this.salesConsultantId = this.dataList.salesConsultantListVOS[0].id;
  },
  onShow() {},
  onReady() {
    uni
      .createSelectorQuery()
      .in(this)
      .select('.safe-bottom-height')
      .boundingClientRect((data) => {
        this.safeHeight = data?.height;
      })
      .exec();
  },
  methods: {
    closepop() {
      this.showcartype = false;
    },
    topay(res) {
      let _this = this;
      uni.requestPayment({
        provider: 'wxpay', //支付类型-固定值
        timeStamp: res.data.payment.miniPayRequest.timeStamp, // 时间戳（单位：秒）
        nonceStr: res.data.payment.miniPayRequest.nonceStr, // 随机字符串
        package: res.data.payment.miniPayRequest.package, // 固定值
        signType: res.data.payment.miniPayRequest.signType, //固定值
        paySign: res.data.payment.miniPayRequest.paySign, //签名
        appid: res.data.payment.miniPayRequest.appId,
        success: function (res) {
          console.log('qian');
          uni.showToast({
            icon: 'success',
            title: '支付成功',
            complete() {
              setTimeout(() => {
                uni.$u.toast('支付成功');
              }, 1000);
            },
          });
        },
        fail: function (err) {
          _this.$request.post('/coc-active/api/v1/deposit/order/cancel', {
            id: res.data.orderId,
          });
        },
      });
    },
    Onpayment() {
      if (tologin() !== true) {
        return;
      }
      this.$request
        .post('/coc-active/api/v1/deposit/order/payment', {
          payType: 2,
          subOpenId: uni.getStorageSync('openid'),
          vehicleInfoCxId:
            this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
        })
        .then((res) => {
          if (res.code == 200) {
            this.topay(res);
            // setTimeout(() => {
            //    this.$request.post('/coc-active/api/v1/deposit/order/cancel',{
            // 	   id:res.data.orderId
            //    })
            // }, 5000)
          } else {
            uni.$u.toast(res.message);
          }
        });
    },
    Onchoosepeople(item, index) {
      this.currentindex = index;
      this.salesConsultantId = item.id;
    },
    Onshowmanger() {
      if (tologin() !== true) {
        return;
      }
      this.showmanger = true;
    },
    OnpreviewImage() {
      let _this = this;
      uni.previewImage({
        urls: _this.codeurl,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function (data) {},
          fail: function (err) {
            console.log(err.errMsg);
          },
        },
      });
    },
    OnPushHome() {
      if (!this.isback) {
        uni.navigateTo({
          url: '/pages/carShops/4Sdetail/index?id=' + this.dataList.shopId,
        });
      }
    },
    OnPushSame() {
      uni.navigateTo({
        url:
          '/pages/carShops/carList/sameused?shopId=' +
          this.shopId +
          '&vehicleId=' +
          this.dataList.vehicleId,
      });
    },
    OnClosefloorprice() {
      this.showfloorprice = false;
    },
    Onshowfloorprice() {
      if (tologin() !== true) {
        return;
      }
      this.showfloorprice = true;
      setTimeout(() => {
        this.$refs.Son.setrule();
      }, 200);
    },
    OnTell(item) {
      if (this.dataList.isBind == 0) {
        this.$request
          .post('/coc-active/api/v1/four_s/sales_consultant/bind', {
            id: item.id,
          })
          .then((res) => {
            if (res.code == 200) {
              uni.$emit('update');
            } else {
              uni.$u.toast(res.message);
            }
          });
      }
      this.$request.post('/coc-active/api/v1/four_s/save_data', {
        type: 3,
        vehicleInfoCxId:
          this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
        shopId: this.shopId,
      });
      this.showmanger = false;
      uni.makePhoneCall({
        phoneNumber: item.mobile,
      });
    },
    OnWechat(item) {
      if (this.dataList.isBind == 0) {
        this.$request
          .put('/coc-active/api/v1/four_s/sales_consultant/bind', {
            id: item.id,
          })
          .then((res) => {
            if (res.code == 200) {
              uni.$emit('update');
              this.$request.post('/coc-active/api/v1/four_s/save_data', {
                type: 3,
                vehicleInfoCxId:
                  this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
                shopId: this.shopId,
              });
              this.codeurl = item.code;
              this.showcontact = true;
              this.showmanger = false;
            } else {
              uni.$u.toast(res.message);
            }
          });
      } else {
        this.$request.post('/coc-active/api/v1/four_s/save_data', {
          type: 3,
          vehicleInfoCxId:
            this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
          shopId: this.shopId,
        });
        this.codeurl = item.code;
        this.showcontact = true;
        this.showmanger = false;
      }
    },
    Onappointment() {
      if (!this.radiovalue1) {
        uni.$u.toast('请同意并阅读个人信息保护声明');
        return false;
      }
      this.$refs.uForm
        .validate()
        .then((res) => {
          let driveTime1 = '';
          let driveTime2 = '';
          let driveTime = '';
          if (this.checkboxValue1) {
            this.checkboxValue1.filter((s, index) => {
              if (index == 0) {
                driveTime1 = s;
              } else {
                driveTime1 = driveTime1 + ',' + s;
              }
            });
          }
          if (this.checkboxValue2) {
            this.checkboxValue2.filter((s, index) => {
              if (index == 0) {
                driveTime2 = s;
              } else {
                driveTime2 = driveTime2 + ',' + s;
              }
            });
          }
          if (driveTime1 && driveTime2) {
            driveTime = driveTime1 + ',' + driveTime2;
          } else if (!driveTime1 && driveTime2) {
            driveTime = driveTime2;
          } else if (driveTime1 && !driveTime2) {
            driveTime = driveTime1;
          } else {
            uni.$u.toast('请选择试驾时间');
            return false;
          }
          this.tosave(driveTime);
        })
        .catch((errors) => {});
    },
    tosave(value) {
      this.$request
        .post('/coc-active/api/v1/four_s/clues/add', {
          customerMobile: this.form.customerMobile,
          customerName: this.form.customerName,
          driveTime: value,
          shopId: this.shopId,
          type: 2,
          vehicleInfoCxId:
            this.dataList.newVehicleInfoCXDetailVOS[this.cartype].id,
          salesConsultantId: this.salesConsultantId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.showtestdrive = false;
            uni.$u.toast('操作成功');
          } else {
            uni.$u.toast(res.message);
          }
        });
    },
    OnPushPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
      });
    },
    Ontestdrive() {
      if (tologin() !== true) {
        return;
      }
      this.showtestdrive = true;
      if (getstorage('mobile')) {
        this.form.customerMobile = getstorage('mobile');
      }

      setTimeout(() => {
        this.$refs.uForm.setRules(this.rules);
      }, 500);
    },
    OnOnLocation() {
      let _this = this;
      uni.getLocation({
        type: 'gcj02', //返回可以用于uni.openLocation的经纬度
        success: function (res) {
          const latitude = _this.dataList.lat;
          const longitude = _this.dataList.lng;
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
    OnTrueCar() {
      this.cartype = this.popcartype;
      this.showcartype = false;
    },
    Onshowcartype() {
      this.popcartype = this.cartype;
      this.showcartype = true;
    },
    OnCurrentCar(index) {
      this.popcartype = index;
    },
  },
};
</script>

<style lang="scss">
.page {
  background-color: #ffffff;
}

.top-title {
  display: flex;
  justify-content: space-between;
  margin: 46rpx 28rpx;
  align-items: flex-end;
}

.carDown {
  width: 38rpx;
  height: 41rpx;
}

.car-name {
  display: flex;
  justify-content: space-between;
  margin: 52rpx 28rpx 26rpx 28rpx;
  align-items: center;
}

.car-list {
  margin: 0rpx 28rpx;
}

.car-pop-title {
  font-size: 32rpx;
  font-weight: bold;
  text-align: center;
  margin-top: 41rpx;
}

.car-pop-detail {
  display: flex;
  margin: 43rpx 25rpx 28rpx 25rpx;
}

.pop-car-list {
  margin: 8rpx 25rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  font-size: 28rpx;
  padding: 27rpx 30rpx;
}

.pop-car-list-current {
  color: #d91b1b;
  background: rgba(217, 27, 27, 0.08);
}

.pop-car-btn {
  text-align: center;
  width: 380rpx;
  height: 76rpx;
  background: #d91b1b;
  border-radius: 38rpx;
  color: #ffffff;
  line-height: 76rpx;
}

.tag-item {
  background: #f8f8f8;
  border-radius: 10rpx;
  padding: 45rpx 29rpx;
  margin-left: 9rpx;
  font-size: 24rpx;
}

.adress {
  margin: 25rpx;
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  border: 1rpx solid #f8f8f8;
  box-shadow: 0rpx 3rpx 5rpx 0rpx rgba(142, 142, 142, 0.09);
  border-radius: 10rpx;
  padding: 15rpx;
}

.parse {
  margin: 25rpx;
}

.bottom-btn {
  width: 100%;
  padding: 20rpx 0rpx;
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
    justify-content: space-around;
  }
}

.safe-bottom-height {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}

.btn-bottom {
  width: 200rpx;
  height: 68rpx;
  background: #d91b1b;
  text-align: center;
  line-height: 68rpx;
  border-radius: 34rpx;
  color: #ffffff;
}

.pop-title {
  text-align: center;
  font-size: 32rpx;
  font-weight: bold;
  margin-top: 47rpx;
}

.manger-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 34rpx;
}

.pop-choose {
  display: flex;
  align-items: center;
}

.pop-submit {
  width: 700rpx;
  height: 56rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  text-align: center;
  display: flex;
  font-size: 24rpx;
  color: #666666;
  line-height: 56rpx;
}

.flex-item {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-price {
  margin: 0 25rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  padding: 40rpx 0rpx;
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.user-tagitem {
  padding: 6rpx 14rpx;
  background-color: #fff5de;
  border-radius: 10rpx;
  color: #ac6606;
  font-weight: bold;
  margin-left: 7rpx;
}
</style>