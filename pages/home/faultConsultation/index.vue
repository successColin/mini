<template>
  <view class="page">
    <u-sticky>
      <!-- :rightVal="sessionsNum" -->
      <fixed-input
        :value.sync="keycode"
        placeholder="请输入技师名称"
        :barArr="['51车·人车生活俱乐部', '请输入技师名称']"
        :rightType="1"
        @click="handleMessage"
        @blur="handleBlur"
      ></fixed-input>
    </u-sticky>

    <view class="faultsearch">
      <carousel
        :topStyle="{ width: '700rpx', 'margin-top': '20rpx' }"
        :radius="10"
        height="260rpx"
        urlkey="url"
        :dataType="2"
        systemCode="applets_problem"
        :indicatorType="1"
      />

      <!-- indicatorWidth="30"
          indicatorBarWidth="15" -->
      <view class="page__scroll">
        <u-scroll-list
          indicatorActiveColor="#D91B1B"
          indicatorColor="#EFEFEF;"
          indicatorWidth="25"
          indicatorBarWidth="10"
          :indicator="indicator"
        >
          <view class="scroll-list">
            <view
              class="scroll-list__line"
              v-for="(item, index) in consultArr"
              :key="index"
            >
              <view
                class="scroll-list__line__item"
                v-for="(v, i) in item"
                :key="i"
                :class="[
                  i === item.length - 1 &&
                    'scroll-list__line__item--no-margin-right',
                ]"
                @click="handleClickItem(v)"
              >
                <image
                  class="scroll-list__line__item__image"
                  :src="v.icon"
                ></image>
                <text class="scroll-list__line__item__text">{{ v.name }}</text>
              </view>
            </view>
          </view>
        </u-scroll-list>
      </view>

      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231204/file_1701669096625.png"
        class="w700h124 mt20"
        @click="toJiuyuan"
      />

      <faultsearch-list style="width: 100%;" :keycodeVal="keycode" ref="faultsearchList"></faultsearch-list>
    </view>

    <view style="height: 180rpx"></view>

    <tabbar
      v-model="tabbarHeight"
      routePath="pages/home/faultConsultation/index"
    ></tabbar>

    <!-- <u-loading-page
      :loading="showLoading"
      bgColor="rgba(225,225,225,0.3)"
      color="rgba(34,34,34,0.5)"
      loadingColor="rgba(34,34,34,0.5)"
    ></u-loading-page> -->
  </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue';
import faultsearchList from '@/components/samllTool/faultsearchList.vue';
import fixedInput from '@/components/search/fixedInput.vue';
import tabbar from '@/components/tabbar/index.vue';
import { getstorage, tologin } from '@/utils/index.js';

export default {
  components: {
    carousel,
    fixedInput,
    tabbar,
    faultsearchList,
  },
  data() {
    return {
      tabbarHeight: 0,
      // showLoading: false,
      keycode: '',
      leftList: [],
      rightList: [],
      consultArr: [],
      indicator: true,
    };
  },
  onLoad() {
    this.loginWYYXFun();
    this.getCategoryList();
  },
  computed: {
    // sessionsNum() {
    //   let num = 0;
    //   this.sessionsArr.forEach((item) => {
    //     num += item.unread;
    //   });
    //   return num;
    // },
  },
  methods: {
    loginWYYXFun() {},
    loginWYYXFun() {
      const params = {
        userId: uni.getStorageSync('userId'),
        name: uni.getStorageSync('nickname'),
        icon: getstorage('userImg'),
      };
      this.$newrequest.post(
        '/coc-tencent-im/api/v1/yunxin/registerYunXinAccount',
        params
      );
    },
    async handleMessage() {
      tologin();
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/consultationList`,
      });
    },
    handleClickItem(item) {
      tologin();
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/faultClassify?id=${item.id}`,
      });
    },
    // 获取咨询数据
    getCategoryList() {
      this.$newrequest
        .post('/coc-active/api/v1/fault/category/list')
        .then((res) => {
          const { data } = res.data;
          console.log(data);
          this.leftList = data;
          this.rightList = data[0].questions;

          const one = [...data.slice(0, Math.ceil(data.length / 2))];
          this.consultArr.push(one, [
            ...data.slice(Math.ceil(data.length / 2)),
          ]);
          const num = one.length * 58 + (one.length - 1) * 10 + 23 + 25;
          if (num < 380) {
            this.indicator = false;
          }
        });
    },
    handleBlur() {
      this.$refs.faultsearchList.getList();
    },
    toJiuyuan() {
      tologin();
      uni.navigateTo({
        url: '/pages/roadhelp/index',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  // height: 100vh;
  background: #efefef;
}
$width: calc(100% - 50rpx);

::v-deep {
  .u-scroll-list__indicator {
    margin-top: 13px !important;
  }
}
.page__scroll {
  width: $width;
  background: #ffffff;
  border-radius: 15rpx 15rpx 15rpx 15rpx;
  margin-top: 23rpx;
}
.scroll-list {
  @include flex(column);
  &__line {
    @include flex;
    margin: 23rpx 23rpx 0;

    &__item {
      margin-right: 10px;

      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: flex;
      width: 116rpx;

      &__image {
        width: 53rpx;
        height: 53rpx;
      }

      &__text {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #2d2d2d;
        text-align: center;
        margin-top: 7rpx;
      }

      &--no-margin-right {
        margin-right: 0;
      }
    }
  }
  &__line:nth-child(2) {
    margin-top: 54rpx;
  }
}
.faultsearch {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-question {
    position: relative;
    width: 700rpx;
    height: 370rpx;
    margin-top: 18rpx;

    &-image {
      position: absolute;
      top: 0;
      width: 700rpx;
      height: 370rpx;
    }

    &-video {
      position: absolute;
      top: 89rpx;
      left: 25rpx;
      width: 359rpx;
      height: 192rpx;
      border-radius: 10rpx;
    }

    &-title {
      position: absolute;
      width: 359rpx;
      top: 303rpx;
      left: 27rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    &-list {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 89rpx;
      right: 26rpx;
      width: 281rpx;
      height: 256rpx;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10rpx;
    }

    &-item {
      display: flex;
      align-items: center;
      width: 228rpx;
      height: 63rpx;

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 40rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }

    &-line {
      width: 228rpx;
      height: 1rpx;
      background: #e8e8e8;
    }
  }

  &-list {
    width: $width;
    margin: 15rpx 23rpx 0;
    background: #ffffff;
    margin-top: 15rpx;
    border-radius: 15rpx;
    overflow: hidden;
    &--head {
      display: flex;
      align-items: center;
      font-size: 31rpx;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;

      margin: 23rpx 0 0 23rpx;
    }
    &--content {
      margin-bottom: 50rpx;
    }
    &--local {
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      color: #222222;

      display: flex;
      align-items: center;
      margin-left: 23rpx;
      span {
        width: 0;
        height: 0;
        border-top: 11rpx solid #222222;
        border-right: 11rpx solid transparent;
        border-left: 11rpx solid transparent;
        margin-left: 6rpx;
      }
    }
  }

  &-image {
    width: 161rpx;
    height: 31rpx;
    padding: 30rpx;
  }

  &-car {
    width: 725rpx;
    margin-left: 23rpx;
    margin-top: 23rpx;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46rpx;
      // background: #ffeaea;
      border-radius: 8rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      margin-right: 10rpx;

      &-title {
        white-space: nowrap;
        font-size: 31rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
        position: relative;
      }

      &-title:before {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-17.5rpx);
        content: '';
        width: 35rpx;
        height: 12rpx;
        background: linear-gradient(
          180deg,
          #d91b1b 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }

    &-unitem {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46rpx;
      // background: #f8f8f8;
      border-radius: 8rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      margin-right: 10rpx;

      &-title {
        white-space: nowrap;
        font-size: 27rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #666666;
      }
    }
  }

  &-shop {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    &-item {
      width: 700rpx;

      &-top {
        display: flex;
        align-items: center;
        height: 93rpx;

        &-logo {
          height: 50rpx;
          margin-right: 18rpx;
        }

        &-title {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27rpx;
        }
      }

      &-image {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-small {
        width: 226rpx;
        height: 226rpx;
        background: #2e2020;
        border-radius: 10rpx;
      }

      &-big {
        width: 700rpx;
        height: 210rpx;
        background: #2e2020;
        border-radius: 10rpx;
      }

      &-label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48rpx;
        background: rgba(217, 27, 27, 0.1);
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d91b1b;
        line-height: 27rpx;
        margin-top: 18rpx;
        padding-left: 30rpx;
        padding-right: 30rpx;
      }

      &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 8rpx 0rpx 27rpx 0rpx;

        &-location {
          width: 24rpx;
          height: 30rpx;
        }

        &-phone {
          width: 26rpx;
          height: 25rpx;
          margin-left: 19rpx;
        }

        &-title {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 27rpx;
          margin-left: 12rpx;
        }

        &-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 114rpx;
          height: 52rpx;
          background: #d91b1b;
          border-radius: 10rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 27rpx;
        }
      }

      &-line {
        width: 700rpx;
        height: 1rpx;
        background: #e8e8e8;
      }
    }
  }
}

.w700h124 {
  width: 700rpx;
  height: 124rpx;
}

.mt17 {
  margin-top: 17rpx;
}

.mt20 {
  margin-top: 20rpx;
}

image {
  display: block;
}
</style>
