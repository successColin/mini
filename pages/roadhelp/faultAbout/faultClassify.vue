<template>
  <view class="page">
    <view class="faultclassify">
      <scroll-view class="faultclassify-left" scroll-y="true">
        <view
          v-for="(v, i) in leftList"
          :key="i"
          class="faultclassify-left-item"
          @click="setClassify(v, i)"
        >
          <image
            :src="v.icon"
            mode="aspectFill"
            class="faultclassify-left-item-image"
          />
          <view class="faultclassify-left-item-title">{{ v.name }}</view>
        </view>
        <view class="faultclassify-left-line" :style="[lineStyle]" />
      </scroll-view>
      <scroll-view class="faultclassify-right" scroll-y="true">
        <u-sticky offset-top="0">
          <view class="faultclassify-right-question" style="margin-top: 0">
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695288279356.png"
              class="faultclassify-right-question-image"
            />
            <view class="u-flex">
              <!-- <button
                type="default"
                class="faultclassify-right-question-lbtn"
                open-type="contact"
                session-from=""
              >
                <image
                  src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695262101416.png"
                  class="faultclassify-right-question-lbtn-image"
                />
                <view class="faultclassify-right-question-lbtn-title"
                  >我要咨询</view
                >
              </button> -->
              <!-- infoShow = true -->
              <view
                class="faultclassify-right-question-rbtn"
                @click="handleTechnician"
                style="right: auto; left: 30rpx;"
              >
                <image
                  src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695262175428.png"
                  class="faultclassify-right-question-rbtn-image"
                />
                <view class="faultclassify-right-question-rbtn-title"
                  >咨询技师</view
                >
              </view>
            </view>
          </view>
        </u-sticky>
        <view
          v-for="(v, i) in rightList"
          :key="i"
          class="faultclassify-right-item"
          @click="toQustion(v)"
        >
          <view class="faultclassify-right-item-title">{{ v.question }}</view>
          <view class="faultclassify-right-item-line" />
        </view>
      </scroll-view>
    </view>
    <!-- <u-popup
      :show="infoShow"
      :safeAreaInsetBottom="false"
      @close="infoShow = false"
      mode="bottom"
      round="10"
    >
      <view class="tac size28 fwb" style="padding: 40rpx"
        >请先选择爱车品牌</view
      >
      <view class="list flex alc" style="padding: 0 25rpx; flex-wrap: wrap">
        <view
          class="brand tac"
          v-for="item in brandList"
          :key="item.brandId"
          @click="bindBrand(item)"
          :style="{
            color: brand.brandId == item.brandId ? '#D91B1B' : '#222222',
            background: brand.brandId == item.brandId ? '#FFE1E1' : '#F8F8F8',
          }"
        >
          {{ item.brandName }}</view
        >
      </view>
      <view class="size20 tac mt20 txtLighGray">更多4S店接洽中..</view>
      <view class="tac brandBtn" @click="bindCar">去选择4S店</view>
    </u-popup> -->
    <!-- 我的提问 -->
    <view class="InitiateQuestion" @click="lookMyQ">
      <view class="wenPic">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230921/file_1695279864019.png"
          class="xin"
        ></image>
        <text class="num">{{ num }}</text>
      </view>
      <view class="size24">我的提问</view>
    </view>
  </view>
</template>
<script>
import { tologin } from '@/utils/index.js';
export default {
  data() {
    return {
      leftList: [],
      rightList: [],
      // infoShow: false,
      // brandList: [],
      brand: {},
      index: 0,
      num: 0,
      currentId: null,
    };
  },
  computed: {
    lineStyle() {
      return {
        transform: `translate(0, ${176 * this.index + 45}rpx)`,
        transition: '0.5s',
      };
    },
  },
  onLoad(option) {
    console.log(option);
    this.currentId = option.id;
    // this.getBrand();
    this.getCategoryList();
    this.getMyList();
  },
  methods: {
    // 咨询技师 选品牌
    handleTechnician() {
      uni.navigateTo({
        url: '/pages/roadhelp/faultAbout/selectCar',
      });
    },
    toQustion(value) {
      uni.navigateTo({
        url: '/pages/roadhelp/faultAbout/faultDetail',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('getinfo', {
            data: value,
          });
        },
      });
    },
    setClassify(value, index) {
      this.index = index;
      this.rightList = value.questions;
    },
    getCategoryList() {
      this.$newrequest
        .post('/coc-active/api/v1/fault/category/list')
        .then((res) => {
          const { data } = res.data;
          this.leftList = data;
          console.log(this.currentId);
          if (this.currentId) {
            const index = this.leftList.findIndex(
              (item) => +item.id === +this.currentId
            );

            this.rightList = this.leftList[index].questions;
            this.index = index;
            console.log(this.index, this.currentId, this.leftList);

            // this.$nextTick(() => {
            //   uni.pageScrollTo({
            //     scrollTop: 176 * index,
            //     duration: 300,
            //   });
            // });
          } else {
            this.rightList = data[0].questions;
          }
        });
    },
    // getBrand() {
    //   this.$request
    //     .post('/coc-active/api/v1/four_s/fourSBrand', {})
    //     .then((res) => {
    //       this.brandList = res.data;
    //     });
    // },
    bindBrand(item) {
      this.brand = item;
    },
    jumpDetail(id) {
      uni.navigateTo({
        url: '/pages/carShops/4Sdetail/index?id=' + id,
      });
    },
    bindCar() {
      if (tologin() !== true) {
        return;
      }
      if (this.brand.brandId) {
        // this.infoShow = false;
        uni.navigateTo({
          url:
            '/pages/roadhelp/faultAbout/faultCheckShop?brand=' +
            JSON.stringify(this.brand),
        });
      } else {
        uni.$u.toast('请选择品牌');
      }
    },
    getMyList() {
      let uid = String(uni.getStorageSync('userId'));
      if (!uid) {
        this.num = 0;
      } else {
        this.$request51help
          .post('api/club/fault_ask_list', {
            uid: String(uni.getStorageSync('userId')),
          })
          .then((res) => {
            this.num = res.total;
          });
      }
    },
    lookMyQ() {
      if (tologin() !== true) {
        return;
      }
      if (this.num > 0) {
        uni.navigateTo({
          url: '/pages/roadhelp/faultAbout/faultMy',
        });
      } else {
        uni.$u.toast('您还没有提问问题');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background: #ffffff;
}

.faultclassify {
  display: flex;

  &-left {
    position: relative;
    width: 200rpx;
    height: 100vh;
    border-right: 1px solid #e8e8e8;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 200rpx;
      height: 176rpx;

      &-image {
        width: 60rpx;
        height: 60rpx;
      }

      &-title {
        // font-size: 24rpx;
        // font-family: PingFang SC;
        // font-weight: bold;
        // color: #222222;

        margin-top: 7rpx;
        font-size: 23rpx;
        font-family: PingFang SC, PingFang SC;
        color: #2d2d2d;
      }
    }

    &-line {
      // position: absolute;
      // top: 0;
      // width: 4rpx;
      // height: 50rpx;
      // background: #cc201e;
      // border-radius: 2rpx;
      position: absolute;
      top: 0;
      right: 0;
      width: 6rpx;
      height: 100rpx;
      background: #d91b1b;
      border-radius: 2rpx;
    }
  }

  &-right {
    height: 100vh;
    margin-left: 30rpx;

    &-item {
      display: flex;
      flex-direction: column;
      justify-content: center;

      &-title {
        display: flex;
        align-items: center;
        height: 115rpx;
        color: #222222;
        font-size: 27rpx;
        font-family: PingFang SC, PingFang SC;
      }

      &-line {
        width: 495rpx;
        height: 1rpx;
        background: #e8e8e8;
      }
    }

    &-question {
      position: relative;
      width: 494rpx;
      height: 176rpx;
      margin-top: 30rpx;
      padding-bottom: 20rpx;

      &-image {
        position: absolute;
        top: 0;
        width: 494rpx;
        height: 176rpx;
        background: #fff2f2;
        border-radius: 10rpx;
      }

      &-lbtn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 86rpx;
        left: 31rpx;
        width: 210rpx;
        height: 72rpx;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10rpx;

        &-image {
          width: 32rpx;
          height: 28rpx;
        }

        &-title {
          color: #222222;
          margin-left: 6rpx;
          font-size: 27rpx;
          font-family: PingFang SC, PingFang SC;
        }
      }

      &-rbtn {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 86rpx;
        right: 21rpx;
        width: 210rpx;
        height: 72rpx;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 10rpx;

        &-image {
          width: 29rpx;
          height: 29rpx;
        }

        &-title {
          color: #222222;
          margin-left: 6rpx;
          font-size: 27rpx;
          font-family: PingFang SC, PingFang SC;
        }
      }
    }
  }
}

.brand {
  width: 160rpx;
  height: 66rpx;
  line-height: 66rpx;
  background: #f8f8f8;
  border-radius: 10rpx;
  box-sizing: border-box;
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  font-size: 24rpx;
}

.brand:nth-child(4n) {
  margin-right: 0;
}

.brandBtn {
  margin: 50rpx auto;
  width: 330rpx;
  height: 70rpx;
  line-height: 70rpx;
  background: #d91b1b;
  border-radius: 35rpx;
  color: #fff;
}

button::after {
  border: initial;
}

.InitiateQuestion {
  position: fixed;
  bottom: 300rpx;
  right: 25rpx;
  z-index: 100;
}

.wenPic {
  position: relative;
}

.xin {
  width: 90rpx;
  height: 90rpx;
}

.num {
  position: absolute;
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background-color: #d91b1b;
  color: #fff;
  font-size: 18rpx;
  text-align: center;
  line-height: 30rpx;
  top: -10rpx;
  right: 0rpx;
}
</style>