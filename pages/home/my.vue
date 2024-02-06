<template>
  <div class="my">
    <div
      v-show="isShowTop"
      class="my__showTop"
      :style="[
        {
          height: statusBarHeight,
        },
      ]"
    ></div>
   
    <div class="my__info" :style="[{ paddingTop: top }]">
      <div class="my__info--left">
        <div class="info__icon">
          <view class="info__icon--message" @click="toMessage">
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702445506352.png"
            />
            <view v-if="dataList.messageNum" class="messageNum">{{
              dataList.messageNum
            }}</view>
          </view>
          <view @click="OnPushSetInfo" style="margin-right: 20rpx">
            <image
              style="height: 40rpx; width: 40rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702445535601.png"
            >
            </image>
          </view>
        </div>
        <div class="info__name">
          {{ dataList.nickname || '点击头像登录' }}
          <div
            v-for="(item, i) in masterLabel"
            :key="i"
            class="info__name--label"
            @click="handleJumpGrade"
          >
            {{ item }}
          </div>
        </div>
        <div
          class="info__shopname"
          v-if="shopType !== 0"
          @click="handleAdmission"
        >
          <image
            style="height: 38rpx; width: 38rpx; margin-right: 8rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20231215/file_1702609617676.png"
          >
          </image>

          {{ shopName }}
          <div style="margin-left: 6rpx">
            <u-icon name="arrow-right" :size="10"></u-icon>
          </div>
        </div>
        <div class="info__dec">
          <div v-for="(v, i) in userDec" :key="i" @click="handleUserDec(v.id)">
            <div class="info__dec--name">{{ v.name }}</div>
            <div class="info__dec--num">{{ userDecNum(v.id) || 0 }}</div>
          </div>
        </div>
      </div>
      <div class="my__info--right">
        <u-avatar
          size="72"
          @click="handleClick"
          :src="dataList.headImg"
        ></u-avatar>
        <image
          v-if="gradeVal"
          :src="gradeVal"
          class="my__info--right--image"
          @click="handleJumpGrade"
        ></image>
      </div>
    </div>
    <view
      v-if="roadVip === 0 || !istoken"
      @click="Onpushloadhelp"
      class="my__rescueImg"
    >
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450150176.png"
      >
      </image>
    </view>
    <view v-if="istoken && roadVip !== 0" class="my__rescueBuyImg">
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702514089784.png"
      >
      </image>
      <div class="my__rescueBuyImg--btn" @click="handleRescue">我要救援</div>
      <div class="my__rescueBuyImg--equity" @click="handleEquity">
        权益
        <u-icon name="arrow-right" color="#ac6606" size="12"></u-icon>
      </div>
      <div class="my__rescueBuyImg--time" v-if="roadVip === 2 && roadVipExp">
        {{ roadVipExp }} 到期
      </div>
    </view>
    <view class="my__featureArr">
      <div
        v-for="(item, i) in featureArr"
        :key="i"
        @click="handleFeature(item.id)"
      >
        <image :src="item.icon"> </image>
        <title>{{ item.name }}</title>

        <!-- 我的订单 -->
        <!-- <view
          class="badge"
          v-if="item.id === 0 && dataList.activityPayOrderNum > 0"
        >
          <u-badge type="error" :value="dataList.activityPayOrderNum"></u-badge>
        </view> -->
        <!-- 我的积分 -->
        <!-- <view class="badge" v-if="item.id === 1 && getscore(dataList.score)">
          <u-badge type="error" :value="getscore(dataList.score)"></u-badge>
        </view> -->
        <!-- 卡券 -->
        <!-- <view
          class="badge"
          v-if="item.id === 2 && dataList.couponCount + dataList.maintainCount"
        >
          <u-badge
            type="error"
            :value="dataList.couponCount + dataList.maintainCount"
          ></u-badge>
        </view> -->
      </div>
    </view>
    <view class="my__tabs" v-if="isExpertCop">
      <u-tabs
        :current="current"
        :list="tabsList"
        @click="handleTabs"
        :inactiveStyle="{
          fontWeight: '600',
          color: '#999999',
          fontSize: '28rpx',
          fontFamily: 'PingFang SC, PingFang SC',
          padding: '33rpx',
        }"
        :activeStyle="{
          fontWeight: '800',
          color: '#D91B1B',
          fontSize: '28rpx',
          fontFamily: 'PingFang SC, PingFang SC',
          padding: '33rpx',
        }"
        lineColor="#D91B1B"
        :lineHeight="2"
        :lineWidth="16"
      ></u-tabs>
    </view>
    <view class="my__tabsImg" v-if="current === 0 && isExpertCop">
      <div class="my__tabsImg--img">
        <u-swiper :list="swiperList" circular></u-swiper>
      </div>
      <!-- <image
        class="my__tabsImg--img"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703118012388.jpg"
      >
      </image> -->
      <view class="my__btn" @click="handleJumpMaster"> 申请达人 </view>
    </view>
    <view class="my__tabsImg" v-if="current === 1 && isExpertCop">
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231229/file_1703836483752.jpg"
      >
      </image>
      <view class="my__btn" @click="handleAdmission" v-if="!isadmission">
        申请入驻
      </view>
      <view class="my__btn" @click="handleCopy" v-if="isadmission">
        复制链接
      </view>
      <view class="my__copy--title" v-if="isadmission">
        下载51车俱乐部商家端APP
      </view>
    </view>
    <view class="my__master" v-if="isExpertCopOk">
      <div class="my__master--title">达人中心</div>
      <div class="my__master--box">
        <div class="master__one">
          <div class="master__one--num" @click="handleGrossIncome">
            <div>{{ dataList.earnMoney }}</div>
            <div>总收入(元)</div>
          </div>
          <div class="master__one--btn" @click="handleGoWithdraw">去提现</div>
        </div>
        <div class="master__two">
          <div>
            <div>{{ dataList.balance }}</div>
            <div>可提现(元)</div>
          </div>
          <div>
            <div>{{ dataList.withdrawMoney }}</div>
            <div>已提现(元)</div>
          </div>
          <div @click="handleJumpEarnings">
            <div>{{ dataList.earnOrderCount }}</div>
            <div>收益订单(笔)</div>
          </div>
        </div>
      </div>

      <div class="my__master--tabs">
        <div
          v-for="(item, i) in masterTabs"
          :key="i"
          @click="handleClickMasterTabs(item.id)"
        >
          <image :src="item.url"> </image>
          {{ item.name }}
        </div>
      </div>

      <view class="notice flex alc">
        <image
          class="notice_icon"
          src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692184617100.png"
        >
        </image>
        <view style="width: 100%; margin-left: 8rpx" class="flex alc">
          <u-notice-bar
            color="#222222"
            fontSize="27rpx"
            direction="column"
            :text="noticeList.length ? noticeList : ['暂无']"
            bgColor="#ffffff"
            :icon="none"
          >
          </u-notice-bar>
        </view>
      </view>

      <view style="">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702470939152.jpg"
          class="joinShop"
          @click="joinShop"
        ></image>
      </view>

      <square
        :list="squarerows.list"
        :home="true"
        :grade="grade"
        @update="setObj"
        @getSquareList="getSquareList"
      />

      <!-- 海量商家 -->
      <!-- <massive-merchants></massive-merchants> -->

      <!-- <view class="user_fengyun">
        <view class="fengyun_title">风云热榜</view>
        <view class="fengyun_list flex">
          <view class="fengyun_list_dhpx">
            <view class="fengyun_list_title">带货排行榜</view>
            <view
              v-for="(item, index) in rankList"
              :key="index"
              class="fengyun_list_item flex alc"
            >
              <view style="width: 25rpx"
                ><text class="item_num">{{ index + 1 }}</text></view
              >
              <image class="item_img" :src="item.coverPicture"></image>
              <text class="item_nickname oneLine">{{ item.title }}</text>
            </view>
          </view>
          <view class="fengyun_list_dhbs">
            <view class="fengyun_list_title">带货飙升榜</view>
            <view
              v-for="(item, index) in hotList"
              :key="index"
              class="fengyun_list_item flex alc"
            >
              <view style="width: 25rpx"
                ><text class="item_num">{{ index + 1 }}</text></view
              >
              <image class="item_img" :src="item.coverPicture"></image>
              <text class="item_nickname oneLine">{{ item.title }}</text>
            </view>
          </view>
        </view>
      </view> -->
    </view>

    <view style="height: 180rpx"></view>

    <tabbar v-model="tabbarHeight" routePath="pages/home/my"></tabbar>

    <u-modal
      confirmColor="red"
      :show="showmodal"
      content="商家入驻需要获取您的位置信息,请打开小程序设置,更改位置信息为'使用小程序时允许'后再次点击"
      @confirm="Ontruemodal"
    ></u-modal>

    <movable-area>
      <movable-view :x="x" :y="y" direction="all">
        <image
          v-if="isExpertCopOk"
          @click="handleJumpMy"
          src="https://oss.dcqcjlb.com/51che_java_dev/20240103/file_1704262750968.png"
        ></image>
      </movable-view>
    </movable-area>
  </div>
</template>
  
<script>
import tabbar from '@/components/tabbar/index.vue';
import { statusBarHeight } from '@/config/index';
import { getstorage, gettoken, setstorage, tologin } from '@/utils/index.js';
// import MassiveMerchants from './components/MassiveMerchants.vue';
import square from './components/square.vue';

export default {
  onPageScroll(e) {
    if (e.scrollTop > 10) {
      this.isShowTop = true;
    } else {
      this.isShowTop = false;
    }
  },
  components: {
    tabbar,
    square,
    // MassiveMerchants,
  },
  created() {
    uni.getSystemInfo({
      success: (res) => {
        const screenWidth = res.windowWidth; // 屏幕宽度，单位为px
        const screenHeight = res.windowHeight; // 屏幕高度，单位为px
        this.x = screenWidth - uni.upx2px(140);
        this.y = screenHeight - uni.upx2px(340);
      },
    });
  },
  onPullDownRefresh() {
    this.init();
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  onShow() {
    this.init();
  },
  data() {
    return {
      x: 0,
      y: 0,
      shopAccountType: 0,
      showmodal: false,
      isShowTop: false,
      shopName: '',
      shopType: 0,
      rankList: [],
      hotList: [],
      show: true,
      current: 0,
      tabbarHeight: 0, //tabbar高度
      showsetheadimg: false,
      swiperList: [
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580554627.jpg',
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580572595.jpg',
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580583029.jpg',
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580594702.jpg',
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580605627.jpg',
        'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703580615600.jpg',
      ],
      userDec: [
        {
          name: '作品',
          id: 0,
        },
        {
          name: '关注',
          id: 1,
        },
        {
          name: '粉丝',
          id: 2,
        },
        {
          name: '获赞',
          id: 3,
        },
      ],
      featureArr: [
        {
          name: '我的订单',
          icon: 'https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450810046.png',
          id: 0,
        },
        {
          name: '我的积分',
          icon: 'https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450831594.png',
          id: 1,
        },
        {
          name: '我的卡券',
          icon: 'https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450844193.png',
          id: 2,
        },
        {
          name: '我的爱车',
          icon: 'https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450857556.png',
          id: 3,
        },
        {
          name: '信用卡',
          icon: 'https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702450871197.png',
          id: 4,
        },
      ],
      masterTabs: [
        {
          name: '邀请达人',
          url: 'https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702551183445.png',
          id: 0,
        },
        {
          name: '邀请商家',
          url: 'https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702551043831.png',
          id: 1,
        },
        {
          name: '流量扶持',
          url: 'https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702551206948.png',
          id: 2,
        },
        {
          name: '创作中心',
          url: 'https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702551221570.png',
          id: 3,
        },
        {
          name: '活动发布',
          url: 'https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702551235410.png',
          id: 4,
        },
      ],
      noticeList: [],
      tabsList: [
        {
          name: '升级达人',
        },
        {
          name: '商家入驻',
        },
      ],
      dataList: {
        collectionsCount: 0,
        couponCount: 0,
        redCount: 0,
        maintainCount: 0,
        score: 0,
      },
      squarerows: {
        list: [],
        total: 0,
      },
      istoken: false,
      detail: {},
      roadVip: 0,
      roadVipExp: '',
      finduserList: {},
    };
  },
  components: {},
  computed: {
    // 标签
    masterLabel() {
      const tags = this.finduserList?.userExpert?.tags || '';
      if (!tags) return [];
      return tags.split(',');
    },
    grade() {
      return this.finduserList?.userExpert?.grade;
    },
    gradeVal() {
      const val = this.grade;
      console.log(this.finduserList);
      let url = '';
      if (val == 1) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231225/file_1703464940037.png';
      } else if (val == 2) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231225/file_1703464991430.png';
      } else if (val == 3) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231225/file_1703465004561.png';
      } else if (val == 4) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231225/file_1703465019695.png';
      } else if (val == 5) {
        url =
          'https://oss.dcqcjlb.com/51che_java_dev/20231225/file_1703465031744.png';
      }
      return url;
    },
    // 是否入驻
    isadmission() {
      if (this.shopAccountType !== 1) {
        return false;
      }
      return (
        this.finduserList?.shop?.status === 1 &&
        this.finduserList?.shop?.unionPayStatus === 1
      );
    },
    // 是达人
    isExpertCopOk() {
      return this.istoken !== '' && this.dataList?.isExpert === 1;
    },
    // 不是达人
    isExpertCop() {
      return this.istoken !== '' && this.dataList?.isExpert !== 1;
    },
    statusBarHeight() {
      return statusBarHeight;
    },
    top() {
      return `calc(${statusBarHeight} + 88rpx)`;
    },
    getscore() {
      return function (score) {
        if (score >= 10000) {
          let num = 0;
          num = score / 10000;
          return num + 'W';
        } else {
          return score;
        }
      };
    },
    userDecNum() {
      return function (i) {
        if (i === 0) {
          return this.dataList?.articleCount;
        }
        if (i === 1) {
          return this.detail?.followNum;
        }
        if (i === 2) {
          return this.detail?.fansNum;
        }
        if (i === 3) {
          return this.detail?.likeNum;
        }
      };
    },
  },
  watch: {},
  mounted() {},
  onReachBottom() {
    uni.$emit('myScrollToLower');
  },
  methods: {
    handleJumpMy() {
      uni.navigateTo({
        url: '/pages/wiseman/darenxiaodian/index',
      });
    },
    joinShop() {
      uni.navigateTo({
        url: '/pages/roadhelp/index?iscommission=1',
      });
    },
    handleJumpGrade() {
      uni.navigateTo({
        url: '/pages/my/growthCenter/index',
      });
    },
    init() {
      uni.getLocation({
        type: 'wgs84',
        success: function (res) {
          console.log('当前位置的经度：' + res.longitude);
          console.log('当前位置的纬度：' + res.latitude);
          setstorage('lat', res.latitude);
          setstorage('lng', res.longitude);
        },
      });
      this.shoptypeid = getstorage('shopTypeId');
      this.istoken = gettoken();
      if (this.istoken) {
        this.getinfo();
      } else {
        this.dataList = {};
        this.shopAccountType = 0;
        this.finduserList = {};
        this.detail = {};
      }
      if (uni.getStorageSync('token')) {
        this.$request
          .post('/coc-active/api/v1/user/behavior/visit_into', {
            type: 15,
          })
          .then((res) => {
            this.visitinto = res;
          });
      }
    },
    handleGrossIncome() {
      uni.navigateTo({
        url: '/pages/myEarnings/mainPage',
      });
    },
    handleJumpEarnings() {
      uni.navigateTo({
        url: '/pages/wiseman/specialarea/order',
      });
    },
    Ontruemodal() {
      this.showmodal = false;
    },
    async getSquareList() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/expert/selection/library/expert/list',
        {
          current: 1,
          size: 5,
          sort: 8,
        }
      );
      const list = [];
      data.records.forEach((v) => {
        v.type_txt =
          v.type === 1
            ? '活'
            : v.type === 2
            ? '保'
            : v.type === 3
            ? '救'
            : v.type === 4
            ? '团'
            : v.type === 5
            ? '套'
            : '';
        list.push(v);
      });
      this.squarerows.list = list;
      this.squarerows.total = data.total;
    },
    queryRankingList(type) {
      this.$newrequest
        .post('/coc-merchant-app/app/v2/home_page/merchant/power/list', {
          type,
        })
        .then((res) => {
          if (res.code === 200) {
            if (type === 5) {
              this.rankList = res.data;
            } else if (type === 6) {
              this.hotList = res.data;
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    queryNoticeList() {
      this.$newrequest
        .post('/coc-active/api/v1/newExpert/untruthBroadcastMessageList', {
          current: 1,
          size: 99,
          displayLocation: 1,
        })
        .then((res) => {
          if (res.code === 200) {
            this.noticeList = res.data.map((m) => {
              return m.content;
            });
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    handleGoWithdraw() {
      if (this.dataList?.balance > 50) {
        this.$request
          .post('/coc-active/api/v2/withdraw/getWithdrawBaseInfo')
          .then((res) => {
            if (res.code !== 200) {
              return uni.$u.toast(res.message);
            }
            uni.navigateTo({
              url:
                '/pages/myEarnings/InitiatePayout?balance=' +
                this.dataList?.balance,
            });
          });
      } else {
        uni.$u.toast('余额大于50才能提现');
      }
    },
    handleClickMasterTabs(i) {
      if (i === 0) {
        uni.navigateTo({
          url: '/pages/wiseman/specialarea/myteam',
        });
      } else if (i === 1) {
        uni.navigateTo({
          // url: '/pages/wiseman/inviteinbusiness',
          url: '/pages/wiseman/recommended_merchants',
        });
      } else if (i === 2) {
        uni.navigateTo({
          url: '/pages/wiseman/flowplan/index',
        });
      } else if (i === 3) {
        uni.navigateTo({
          url: '/pages/wiseman/specialarea/creative_center',
        });
      } else if (i === 4) {
        uni.showToast({
          icon: 'none',
          title: '开发中',
        });
      }
    },
    handleAdmission() {
      if (tologin() !== true) {
        return;
      }
      if (!getstorage('lat')) {
        this.showmodal = true;
        return false;
      }
      // let needObj = JSON.stringify({
      //   // // * 视频验证：0-视频未认证；1-视频认证中；2-视频认证成功；3-视频认证失败
      //   // videoVerification: this.finduserList.shop?.videoVerification,
      //   // // * 签约验证：0-签约中；1-签约成功；
      //   // signingVerification: this.finduserList.shop?.signingVerification,

      //   // // sendCount 视频次数
      //   // sendCount: this.finduserList.shop?.sendCount,
      //   // // signingSendCount 签约次数
      //   // signingSendCount: this.finduserList.shop?.signingSendCount,

      //   // 银联标识，调用入网状态查询
      //   umsRegId: this.finduserList.shop?.umsRegId,
      // });
      if (this.finduserList.shop == null) {
        uni.navigateTo({
          url: '/pages/Settlein/welcomevue',
        });
      } else if (
        this.finduserList.shop.unionPayStatus == 4 &&
        this.finduserList.shop.status == 0
      ) {
        if (this.finduserList.shop.bankAcctType == 1) {
          uni.navigateTo({
            url:
              '/pages/Settlein/enterpriseProgress?type=1' +
              '&isLineLedger=' +
              this.finduserList.shop.isLineLedger +
              '&settleType=' +
              this.finduserList.shop.settleType,
          });
        }
      } else if (this.finduserList.shop.status == 0) {
        if (this.finduserList.shop.bankAcctType == 1) {
          uni.navigateTo({
            url:
              '/pages/Settlein/enterpriseProgress?type=2' +
              '&isLineLedger=' +
              this.finduserList.shop.isLineLedger +
              '&settleType=' +
              this.finduserList.shop.settleType,
          });
        } else {
          uni.navigateTo({
            url: `/pages/Settlein/individualProgress?type=2&isLineLedger=${this.finduserList.shop.isLineLedger}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
          });
        }
      } else if (this.finduserList.shop.status == 1) {
        if (this.finduserList.shop.bankAcctType == 1) {
          uni.navigateTo({
            url:
              '/pages/Settlein/enterpriseProgress?type=3' +
              '&isLineLedger=' +
              this.finduserList.shop.isLineLedger +
              '&settleType=' +
              this.finduserList.shop.settleType,
          });
        } else {
          uni.navigateTo({
            url: `/pages/Settlein/individualProgress?type=3&isLineLedger=${this.finduserList.shop.isLineLedger}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
          });
        }
      } else if (this.finduserList.shop.status == 2) {
        if (this.finduserList.shop.bankAcctType == 1) {
          uni.navigateTo({
            url:
              '/pages/Settlein/enterpriseProgress?type=4&auditReason=' +
              this.finduserList.shop.auditReason +
              '&unionPayStatus=' +
              this.finduserList.shop.unionPayStatus +
              '&isLineLedger=' +
              this.finduserList.shop.isLineLedger +
              '&status=' +
              this.finduserList.shop.status +
              '&settleType=' +
              this.finduserList.shop.settleType,
          });
        } else {
          uni.navigateTo({
            url: `/pages/Settlein/individualProgress?type=4&auditReason=${this.finduserList.shop.auditReason}
              &unionPayStatus=${this.finduserList.shop.unionPayStatus}&isLineLedger=${this.finduserList.shop.isLineLedger}
              &status=${this.finduserList.shop.status}&settleType=${this.finduserList.shop.settleType}&umsRegId=${this.finduserList.shop?.umsRegId}`,
          });
        }
      }
    },
    handleJumpMaster() {
      if (tologin() !== true) {
        return;
      }
      this.$request.post('/coc-active/api/v1/expert/echoVerify').then((res) => {
        if (res.code == 1101) {
          uni.navigateTo({
            url: '/pages/wiseman/welcome',
          });
        } else if (res.data.status == 1) {
          uni.navigateTo({
            url: '/pages/wiseman/applying',
          });
        } else if (res.data.status == 3) {
          uni.navigateTo({
            url: '/pages/wiseman/refuse',
          });
        }
      });
    },
    handleEquity() {
      uni.navigateTo({
        url: '/pages/roadhelp/equity',
      });
    },
    handleRescue() {
      uni.navigateTo({
        url: '/pages/roadhelp/index/index',
      });
    },
    queryHome() {
      this.$newrequest
        .post('/coc-active/api/v1/newExpert/expertIndex')
        .then((res) => {
          if (res.code === 200) {
            this.detail = res.data;
          }
        });
    },
    handleUserDec(i) {
      if (tologin() !== true) {
        return;
      }
      // 作品 获赞
      if (i === 0 || i === 3) {
        uni.navigateTo({
          url: '/pages/wiseman/mywork',
        });
      }
      // 关注
      if (i === 1) {
        uni.navigateTo({
          url: `/pages/wiseman/specialarea/myfriends?type=1`,
        });
      }
      // 粉丝
      if (i === 2) {
        uni.navigateTo({
          url: `/pages/wiseman/specialarea/myfriends?type=2`,
        });
      }
    },
    handleFeature(i) {
      if (tologin() !== true) {
        return;
      }
      if (i === 0) {
        uni.navigateTo({
          url: '/pages/my/OrderGoods/index',
        });
      }
      // 我的积分
      if (i === 1) {
        uni.navigateTo({
          url: '/pages/my/integral/index',
        });
      }
      // 我的卡券
      if (i === 2) {
        uni.navigateTo({
          url: '/pages/my/myorder/couponpackage?type=1',
        });
      }
      // 我的爱车
      if (i === 3) {
        uni.navigateTo({
          url: '/pages/my/mycar/index',
        });
      }
      // 信用卡
      if (i === 4) {
        uni.navigateTo({
          url: '/pages/my/card/index',
        });
      }
    },
    handleTabs(v) {
      this.current = v.index;
    },
    Onpushloadhelp() {
      if (tologin() !== true) {
        return;
      }
      uni.navigateTo({
        url: '/pages/roadhelp/index',
      });
    },
    handleClick() {
      if (tologin() !== true) {
        return;
      }
      // this.handleJumpGrade();
    },
    toMessage() {
      if (tologin() !== true) {
        return;
      }
      uni.navigateTo({
        url: '/pages/wiseman/specialarea/message',
      });
    },
    OnPushSetInfo() {
      if (tologin() !== true) {
        return;
      }
      uni.navigateTo({
        url: '/pages/my/info/index',
      });
    },
    handleCopy() {
      uni.setClipboardData({
        data: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.dsrz.skystore',
        success: function () {
          uni.$u.toast('复制成功,请在浏览器打开');
        },
      });
    },
    getinfo() {
      this.$request.get('/coc-my/api/v1/my/findUser').then((res) => {
        this.roadVip = res.data.user.roadVip;
        this.roadVipExp = res.data.user.roadVipExp;
        this.shopAccountType = res.data.user.shopAccountType;
        // this.roadVip = 0
        console.log(11111111111, res.data, res);
        this.finduserList = res.data;
        setstorage('headImg', res.data.user.headImg);
        setstorage('nickname', res.data.user.nickname);
        setstorage('userType', res.data.user.userType);
        setstorage('userId', res.data.user.id);
        setstorage('isCertify', res.data.user.isCertify);
        setstorage('realName', res.data.user.realName);
        setstorage('mobile', res.data.user.mobile);
        if (res.data.shop == null) {
          setstorage('status', null);
          setstorage('shopId', null);
          setstorage('shopName', null);
          setstorage('shopTypeId', 0);
          setstorage('shopType', null);
        } else {
          setstorage('status', res.data.shop.status);
          setstorage('shopId', res.data.shop.id);
          setstorage('shopName', res.data.shop.shopName);
          setstorage('shopTypeId', res.data.shop.shopTypeId);
          setstorage('shopType', res.data.shop.status);
          if (res.data.shop) {
            this.shopType = 1;
            this.shopName = '入驻中';
            if (
              res.data.shop.unionPayStatus === 1 &&
              res.data.shop.status === 1
            ) {
              this.shopName = res.data.shop.shopName;
            }
          }
        }

        this.$request.post('/coc-active/api/v1/my/index').then((res) => {
          setstorage('isExpert', res.data.isExpert);
          this.dataList = res.data;
          if (res.data.isDefaultAvatar == 1 && tologin()) {
            this.showsetheadimg = true;
          }
        });
        this.queryNoticeList();
        this.queryRankingList(5);
        this.queryRankingList(6);
        this.getSquareList();
        this.queryHome();
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.my__info--right--image {
  width: 144rpx;
  height: 44rpx;
  position: relative;
  top: -20rpx;
}
.my {
  background: url('https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702433545556.png')
    no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  width: 100%;
  &__copy--title {
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #222222;
    text-align: center;
    margin-top: 20rpx;
  }
  &__tabsImg {
    image {
      width: calc(100% - 20rpx);
      height: 2560rpx;
      margin: 13rpx 10rpx;
      border-radius: 10rpx;
    }
    &--img {
      width: calc(100% - 20rpx);
      margin: 13rpx 10rpx;
      border-radius: 10rpx;
      height: 1357rpx !important;
      ::v-deep {
        .u-swiper,
        .u-swiper__wrapper,
        image {
          height: 1357rpx !important;
        }
      }
    }
  }
  &__showTop {
    background: #fff;
    height: 47px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 9999;
  }
  &__master {
    margin: 0 10rpx;
    &--title {
      font-size: 28rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 800;
      color: #000000;
      margin: 20rpx 0;
    }
    &--box {
      border-radius: 10rpx;
      padding: 20rpx;
      background: url('https://oss.dcqcjlb.com/51che_java_dev/20231215/file_1702602139591.png')
        no-repeat;
      background-size: 100% 100%;
    }
    &--tabs {
      display: flex;
      align-items: center;
      padding: 28rpx 0;
      background: #ffffff;
      border-radius: 10rpx;
      & > div {
        font-size: 24rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 10rpx;
        display: flex;
        align-items: center;
        flex: 1;
        flex-direction: column;
        image {
          width: 48rpx;
          height: 48rpx;
          margin-bottom: 10rpx;
        }
      }
    }
  }
  &__info {
    display: flex;
    justify-content: space-between;
    margin: 0 20rpx;
    &--left {
      flex: 1;
    }
    &--right {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  &__rescueImg {
    padding-top: 32rpx;
    image {
      border-radius: 10rpx;
      display: block;
      width: 730rpx;
      height: 100rpx;
      margin: 0 auto;
    }
  }
  &__rescueBuyImg {
    position: relative;
    margin-top: 32rpx;
    image {
      display: block;
      width: 100%;
      height: 100rpx;
      margin: 0 auto;
    }
    &--btn {
      background: rgba(245, 196, 109, 0.24);
      box-shadow: inset 0rpx 8rpx 8rpx 0rpx rgba(0, 0, 0, 0.02);
      border-radius: 40rpx 40rpx 40rpx 40rpx;

      font-size: 20rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #ac6606;
      padding: 10rpx;
      display: inline-block;
      position: absolute;
      right: 30rpx;
      top: 25rpx;
    }
    &--time {
      position: absolute;
      left: 50rpx;
      bottom: 15rpx;
      color: #ac6606;
      font-size: 23rpx;
    }
    &--equity {
      position: absolute;
      left: 200rpx;
      top: 20rpx;
      color: #ac6606;
      font-size: 23rpx;
      display: flex;
      align-items: center;
    }
  }
  &__featureArr {
    display: flex;
    align-items: center;
    background: #fff;
    margin: 20rpx 10rpx 0;
    border-radius: 10rpx;
    & > div {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex: 1;
      padding: 28rpx 20rpx;
    }
    image {
      width: 50rpx;
      height: 50rpx;
    }
    title {
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #222222;
      margin-top: 10rpx;
    }
  }
  &__tabs {
    width: 450rpx;
    margin: 0 auto;
  }
  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72rpx;
    margin: 0 20rpx;
    margin-bottom: 20rpx;
    background: #d91b1b;
    border-radius: 10000rpx 10000rpx 10000rpx 10000rpx;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}
.messageNum {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: -18rpx;
  right: 6rpx;
  width: 32rpx;
  height: 32rpx;
  background: #ffffff;
  border-radius: 16rpx;
  font-size: 19rpx;
  font-weight: 800;
  color: #d91b1b;
}
.info {
  &__name {
    font-size: 36rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 800;
    color: #222222;
    margin-top: 20rpx;
    &--label {
      font-size: 20rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      background: rgba(217, 27, 27, 0.1);
      border-radius: 100rpx;
      margin-right: 10rpx;
      padding: 4rpx 8rpx;
      display: inline-block;
    }
    &--label:first-child {
      margin-left: 10rpx;
    }
  }
  &__shopname {
    font-size: 24rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 500;
    color: #000000;
    margin-top: 10rpx;
    display: flex;
    align-items: center;
  }
  &__icon {
    display: flex;
    &--message {
      position: relative;
      image {
        width: 38rpx;
        height: 38rpx;
        margin-right: 20rpx;
      }
    }
  }

  &__dec {
    display: flex;
    color: #222222;
    font-weight: 500;
    margin-top: 10rpx;
    & > div {
      display: flex;
      align-items: center;
    }
    &--name {
      font-size: 20rpx;
      font-family: PingFang SC, PingFang SC;
      margin-right: 6rpx;
    }
    &--num {
      margin-right: 20rpx;
      font-size: 28rpx;
      font-family: HONOR Sans CN, HONOR Sans CN;
    }
  }
}
.badge {
  position: absolute;
  top: 0rpx;
  right: 0rpx;
}
.master {
  &__one {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &--num {
      font-size: 44rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 800;
      color: #ffffff;
      & > div:nth-child(2) {
        margin-top: 8rpx;
        font-size: 24rpx;
        font-family: PingFang SC, PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
    &--btn {
      width: 100rpx;
      height: 44rpx;
      line-height: 44rpx;
      background: #ffffff;
      box-shadow: 4rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.25);
      border-radius: 100rpx 100rpx 100rpx 100rpx;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      text-align: center;
    }
  }
  &__two {
    margin-top: 20rpx;
    display: flex;
    justify-content: space-between;
    & > div {
      color: #ffffff;
      font-family: PingFang SC, PingFang SC;
      & > div:nth-child(1) {
        font-size: 32rpx;
        font-weight: 800;
      }
      & > div:nth-child(2) {
        margin-top: 8rpx;
        font-size: 20rpx;
        font-weight: 500;
      }
    }
  }
}
.notice {
  padding: 10rpx;
  border-radius: 10rpx;
  margin: 20rpx 0 0;
  height: 54rpx;
  background: #ffffff;
}

.notice_icon {
  width: 46rpx;
  height: 46rpx;
}
.user_fengyun {
  border-radius: 15rpx;
  .fengyun_title {
    font-size: 35rpx;
    font-weight: 500;
    color: #222222;
    margin: 20rpx 0;
  }

  .fengyun_list {
    padding: 15rpx;
    background: #fff;
    .fengyun_list_dhpx {
      padding: 16rpx;
      background: #fff4f4;
      border-radius: 8rpx;
      flex: 1;
    }

    .fengyun_list_dhbs {
      padding: 16rpx;
      background: #fbf6ef;
      border-radius: 8rpx;
      margin-left: 23rpx;
      flex: 1;
    }

    .fengyun_list_title {
      font-size: 27rpx;
      font-weight: 500;
      color: #666666;
    }

    .fengyun_list_item {
      padding: 23rpx 0;

      .item_num {
        font-size: 31rpx;
        font-weight: 800;
        color: #222222;
      }

      .item_img {
        width: 77rpx;
        height: 77rpx;
        border-radius: 8rpx;
        margin-left: 16rpx;
      }

      .item_nickname {
        font-size: 27rpx;
        font-weight: 400;
        color: #222222;
        margin-left: 8rpx;
        width: 170rpx;
      }
    }
  }
}
::v-deep {
  .square__search {
    .search {
      padding: 16rpx 0 10rpx !important;
    }
  }
  .my__tabs {
    .u-tabs__wrapper__nav__item {
      flex: 1;
    }
  }
  .square__tabs {
    .u-tabs__wrapper__nav__item {
      padding: 0 10rpx !important;
    }
  }

  .merchants__carShop {
    .carShop {
      padding: 0;
    }
  }
}
.joinShop {
  width: 100%;
  height: 115rpx;
  margin-bottom: 16rpx;
  display: block;
  border-radius: 15rpx;
  margin: 0 auto;
}
movable-area {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10000;
  top: 0;
  movable-view {
    position: absolute;
    width: 120rpx;
    height: 120rpx;
    display: inline-block;
    pointer-events: auto;
    image {
      width: 120rpx;
      height: 120rpx;
      position: relative;
      z-index: 99;
    }
  }
}
</style>
  