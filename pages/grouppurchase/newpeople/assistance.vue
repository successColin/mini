<template>
  <view>
    <u-navbar
      :autoBack="true"
      bgColor=""
      leftText=""
      title=" "
      :safeAreaInsetTop="true"
    >
      <view class="u-nav-slot" slot="left">
        <u-icon name="arrow-left" size="19"></u-icon>
      </view>
    </u-navbar>
    <view class="top-icon" @click.stop="OnPushweb"> </view>
    <view class="top-text" @click.stop="OnPushweb">
      <view> 活动规则 </view>
      <view style="margin-left: 6rpx">
        <u-icon name="question-circle" color="#ffffff" size="11"></u-icon>
      </view>
    </view>
    <view class="tac" style="margin-top: 246rpx">
      <image
        style="border-radius: 10rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679035109531.png"
      >
      </image>
    </view>

    <view class="card">
      <view style="position: relative">
        <view class="type-icon">
          <view
            style="width: 48rpx; height: 64rpx; text-align: center"
            class="u-flex alc"
          >
            {{ dataList.needPersonNum }}人助力
          </view>
        </view>
        <image
          :src="dataList.coverPicture"
          style="width: 212rpx; height: 212rpx"
        ></image>
      </view>
      <view style="margin-left: 25rpx">
        <view class="moreLine size24" style="width: 418rpx; height: 70rpx">
          {{ dataList.title }}
        </view>
        <view class="u-flex mt20 mb20">
          <view
            v-for="(item, index) in dataList.tagNamesList"
            class="tagname"
            :key="index"
            style="margin-left: 16rpx"
            :class="{ marginleft0: index == 0 }"
          >
            <view>{{ item }}</view>
          </view>
        </view>
        <view class="mainRed size24">
          ￥<text class="fwb" style="font-size: 40rpx">{{
            dataList.bankCardPrice
              ? dataList.bankCardPrice
              : dataList.flashSalePrice
          }}</text>
        </view>
      </view>
    </view>

    <view v-if="num > 0" class="card-info">
      <image
        style="width: 700rpx; height: 376rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679038404274.png"
      >
      </image>
      <view class="info-in">
        <view
          >还差<text style="font-size: 76rpx" class="mainRed">{{ num }}</text
          >人</view
        >
        <view style="margin-top: 10rpx"
          >即可<text style="font-size: 76rpx" class="mainRed">{{
            dataList.bankCardPrice
              ? dataList.bankCardPrice
              : dataList.flashSalePrice
          }}</text
          >元抢购</view
        >
        <view v-if="istimeend" style="margin-top: 20rpx">
          <button class="botton-none" open-type="share">
            <image
              style="width: 281rpx; height: 84rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679038831938.png"
            >
            </image>
          </button>
        </view>
        <view v-else style="margin-top: 20rpx" @click="OnPushreturn">
          <image
            style="width: 424rpx; height: 84rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230317/file_1679053671348.png"
          >
          </image>
        </view>
      </view>
    </view>
    <view v-else>
      <view style="margin: 25rpx" @click="OnPushList">
        <image
          style="width: 700rpx; height: 367rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20230318/file_1679100135624.png"
        >
        </image>
      </view>
    </view>
    <view v-if="num != 0" class="jsc u-flex alc">
      <view class="size28 colorff fwb" style="margin-right: 16rpx"
        >距离失效&nbsp;</view
      >
      <view>
        <u-count-down
          :time="dataList.endTimeL"
          format="HH:mm:ss"
          autoStart
          millisecond
          @change="onChange"
        >
          <view class="time">
            <text class="time__item"
              ><text
                style="
                  background-color: #cb362d;
                  padding: 13rpx 9rpx;
                  border-radius: 10rpx;
                  margin-right: 6rpx;
                "
                >{{ timeData.hours }}</text
              >&nbsp;:</text
            >
            <text class="time__item"
              ><text
                style="
                  background-color: #cb362d;
                  padding: 13rpx 9rpx;
                  border-radius: 10rpx;
                  margin-right: 6rpx;
                "
                >{{ timeData.minutes }}</text
              >&nbsp;:</text
            >
            <text class="time__item"
              ><text
                style="
                  background-color: #cb362d;
                  padding: 13rpx 9rpx;
                  border-radius: 10rpx;
                  margin-right: 6rpx;
                "
                >{{ timeData.seconds }}</text
              >&nbsp;</text
            >
          </view>
        </u-count-down>
      </view>
    </view>

    <view
      class="u-flex"
      style="flex-wrap: wrap; margin: 30rpx auto; width: 500rpx"
    >
      <view
        v-for="(item, index) in arrynull"
        :key="index"
        class="ml20"
        :class="{ marginleft0: index == 0 || index == 5 || index == 10 }"
      >
        <view>
          <view>
            <u-avatar
              v-if="dataList.assistDetailsHeadVOS[index].id"
              size="40"
              :src="dataList.assistDetailsHeadVOS[index].headImg"
            ></u-avatar>
            <u-icon
              v-else
              size="40"
              name="plus-circle"
              color="#CD362D"
            ></u-icon>
          </view>
          <view class="size28 fwb colorff tac">
            <text v-if="dataList.assistDetailsHeadVOS[index].id">{{
              dataList.assistDetailsHeadVOS[index].nickname
            }}</text>
            <text v-else>待助力</text>
          </view>
        </view>
        <!-- 		<view v-esle>
			<view><u-icon size='40' name="plus-circle" color="#CD362D"></u-icon></view>
			<view class="size28 fwb colorff" >待助力</view>
		</view> -->
      </view>
    </view>
    <view style="height: 50rpx"> </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      userInitiateAssistId: 0,
      dataList: {
        endTimeL: 90000,
      },
      timeData: 0,
      num: 0,
      arrynull: [],
      currentdata: {},
      istimeend: true,
    };
  },

  onLoad(option) {
    this.userInitiateAssistId = option.userInitiateAssistId;
    this.getList();
    let _this = this;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('getinfo', function (data) {
      _this.currentdata = data.data;
      _this.currentdata.allmealprice = _this.currentdata.mealprice;
    });
  },
  onShow() {},
  onShareAppMessage(res) {
    let title = '分享助力';
    let imageUrl =
      'https://oss.dcqcjlb.com/51che_java_dev/20230318/file_1679101807444.png';
    return {
      title,
      path:
        '/pages/grouppurchase/newpeople/helpindex?userInitiateAssistId=' +
        this.userInitiateAssistId +
        '&enter=117',
      imageUrl,
    };
  },
  methods: {
    OnPushweb() {
      uni.navigateTo({
        url: '/pages/activity/GoPdf/webview?url=https://h5.dcqcjlb.com/protocol/activity_rules.html',
      });
    },
    OnPushreturn() {
      this.$request
        .put(
          '/coc-active/api/v1/group/initiateAssistAgain/' +
            this.userInitiateAssistId
        )
        .then((res) => {
          if (res.code == 200) {
            uni.navigateTo({
              url: '/pages/grouppurchase/newpeople/index',
            });
          }
        });
    },
    OnPushList() {
      let _this = this;
      _this.currentdata.userInitiateAssistId = this.userInitiateAssistId;
      uni.navigateTo({
        url: '/pages/grouppurchase/payindex?isnew=1&istype=wx',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('getinfo', {
            data: _this.currentdata,
          });
        },
      });
    },

    onChange(e) {
      this.timeData = e;
      if (e.days == 0 && e.hours == 0 && e.minutes == 0 && e.seconds == 0) {
        this.istimeend = false;
      }
    },
    getList() {
      this.$request
        .get(
          '/coc-active/api/v1/group/getAssistDetails/' +
            this.userInitiateAssistId
        )
        .then((res) => {
          this.num = res.data.needPersonNum - res.data.assistPersonNum;
          for (let i = 0; i < res.data.needPersonNum; i++) {
            this.arrynull.push([]);
          }
          this.dataList = res.data;
        });
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #ffe1e1;
}

.card {
  margin: 25rpx;
  background: #ffffff;
  border-radius: 40rpx;
  padding: 25rpx;
  display: flex;
}

.type-icon {
  position: absolute;
  top: 0rpx;
  width: 59rpx;
  height: 64rpx;
  background-color: #d91b1b;
  border-radius: 10rpx;
  font-size: 20rpx;
  display: flex;
  justify-content: center;
  color: #ffffff;
  left: 12rpx;
}

.marginleft0 {
  margin-left: 0 !important;
}

.tagname {
  padding: 9rpx 18rpx;
  background-color: #fceded;
  color: #d91b1b;
  font-size: 20rpx;
  border-radius: 10rpx;
}

.card-info {
  margin: 25rpx;
  position: relative;
}

.info-in {
  width: 500rpx;
  font-size: 44rpx;
  font-weight: bold;
  position: absolute;
  top: 20rpx;
  left: 50%;
  transform: translate(-50%, 0%);
  text-align: center;
}

.time {
  @include flex;
  align-items: center;

  &__custom {
    margin-top: 4px;
    width: 22px;
    height: 22px;
    background-color: $u-primary;
    border-radius: 4px;
    /* #ifndef APP-NVUE */
    display: flex;
    /* #endif */
    justify-content: center;
    align-items: center;

    &__item {
      color: #ffffff;
      font-size: 24rpx;
      text-align: center;
    }
  }

  &__doc {
    color: $u-primary;
    padding: 0px 4px;
  }

  &__item {
    color: #ffffff;
    font-size: 15px;
    margin-right: 4px;
  }
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
.top-icon {
  width: 152rpx;
  height: 40rpx;
  background: #000000;
  opacity: 0.2;
  top: 250rpx;
  z-index: 9999;
  right: 0rpx;
  border-radius: 10rpx;
  position: absolute;
}
.top-text {
  font-size: 24rpx;
  color: #ffffff;
  position: absolute;
  top: 254rpx;
  right: 25rpx;
  z-index: 99999;
  display: flex;
  align-items: center;
}
</style>
