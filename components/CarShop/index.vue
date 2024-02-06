<!--
 * @Descripttion: 车店
 * @Author: ytx
 * @Date: 2023-11-07 15:38:05
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-07 15:38:05
-->
<template>
  <view class="carShop">
    <view class="carShop__head">
      <image
        v-if="item.brandLogo"
        :src="item.brandLogo"
        class="carShop__head--logo"
        mode="heightFix"
      />
      <view class="carShop__head--title">{{ item.storeAbbreviation }}</view>
    </view>
    <!-- 图片 -->
    <view
      class="carShop__imgView"
      v-if="item.doorheadPhotos && item.doorheadPhotos.length > 1"
    >
      <u-scroll-list :indicator="false">
        <view class="carShop__imgView--box">
          <image
            v-for="(value, index) in item.doorheadPhotos"
            :key="index"
            :src="value"
            class="carShop__imgView--small"
            mode="aspectFill"
          />
        </view>
      </u-scroll-list>
    </view>
    <image
      v-else
      :src="item.doorheadPhotos[0]"
      class="carShop__imgView--big"
      mode="aspectFill"
    />
    <!-- 标签 -->
    <view class="oneLine carShop__tag" v-if="item.storeLabel">
      <text class="carShop__tag--dec">
        {{ item.storeLabel }}
      </text>
    </view>
    <!-- 电话和距离 -->
    <view class="carShop__dec">
      <view class="u-flex alc">
        <view
          class="u-flex alc"
          style="height: 100%"
          @click="getLocation(item.lng, item.lat)"
        >
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278317912.png"
            class="carShop__dec--local"
          />
          <view class="carShop__dec--title">{{ item.distanceMsg }}</view>
        </view>
        <view
          class="u-flex alc"
          style="height: 100%"
          @click="getMobile(item.mobile)"
        >
          <image
            v-if="item.mobile && item.mobile.length > 0"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693278362085.png"
            class="carShop__dec--phone"
          />
          <view
            v-if="item.mobile && item.mobile.length > 0"
            class="carShop__dec--title"
          >
            {{ item.mobile }}
          </view>
        </view>
      </view>
      <view class="carShop__dec--btn" @click="checkShop" v-if="isConsult">{{
        btnName
      }}</view>
      <view class="carShop__dec--btn" @click="handleJump" v-if="isShop"
        >进店</view
      >
    </view>
  </view>
</template>

<script>
import { tologin } from '@/utils/index.js';
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    btnName: {
      type: String,
      default: '咨询',
    },
    isShop: {
      type: Boolean,
      default: false,
    },
    isConsult: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getLocation(lng, lat) {
      uni.openLocation({
        latitude: lat,
        longitude: lng,
      });
    },
    getMobile(mobile) {
      uni.makePhoneCall({
        phoneNumber: mobile,
      });
    },
    checkShop() {
      if (tologin() !== true) {
        return;
      }
      this.$emit('click', this.item);
    },
    handleJump() {
      console.log(this.item);
      uni.navigateTo({
        url: '/pages/carShops/4Sdetail/index?id=' + this.item.shopId,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.carShop {
  padding: 20rpx;
  background: #ffffff;
  border-radius: 15rpx 15rpx 15rpx 15rpx;
  display: flex;
  flex-direction: column;

  &__head {
    display: flex;
    align-items: center;
    &--logo {
      height: 50rpx;
      margin-right: 18rpx;
    }
    &--title {
      font-size: 32rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
    }
  }
  &__imgView {
    width: 100%;
    margin-top: 20rpx;
    &--small,
    &--big {
      height: 230rpx;
      border-radius: 8rpx;
    }
    &--small {
      width: 226rpx;
      height: 200rpx;
      margin-right: 10rpx;
    }
    &--big {
      margin-top: 20rpx;
      width: 100%;
    }
    &--box {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
    }
  }
  &__tag {
    margin-top: 15rpx;
    &--dec {
      background: #fbe8e8;
      border-radius: 8rpx;
      padding: 7rpx 10rpx;
      font-size: 25rpx;
      color: #dd3232;
    }
  }
  &__dec {
    display: flex;
    justify-content: space-between;
    margin-top: 15rpx;
    &--local {
      width: 24rpx;
      height: 30rpx;
    }
    &--phone {
      width: 26rpx;
      height: 25rpx;
      margin-left: 19rpx;
    }
    &--title {
      font-size: 27rpx;
      color: #222222;
      line-height: 27rpx;
      margin-left: 10rpx;
    }
    &--btn {
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
}
</style>
