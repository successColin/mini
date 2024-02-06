<template>
  <view class="square" :class="mh100">
    <template v-if="newLockType === 1 || newLockType === 2">
      <view v-for="item in list" :key="item.id" class="square__list">
        <view class="flex" style="position: relative">
          <!-- 距离 -->
          <view
            class="size24 txtLighGray"
            style="position: absolute; right: 0rpx"
          >
            {{ item.distanceMsg }}
          </view>
          <view class="square__list--dec">
            <!-- 商家简称 -->
            <view class="size28 fwb square__list--title oneLine">{{
              item.baseName
            }}</view>
            <!-- 评分 -->
            <view class="flex mt10 alc" style="color: #d91b1b">
              <u-rate
                gutter="1"
                :readonly="true"
                active-color="#D91B1B"
                inactive-color="#D91B1B"
                count="5"
                v-model="item.star"
              ></u-rate
              >{{ item.starStr ? item.starStr : '暂无评分' }}
            </view>
          </view>
        </view>
        <!-- <u-divider :text="null"></u-divider> -->
        <view class="flex mt20" style="margin-left: -7rpx">
          <scroll-view scroll-x="true">
            <view style="display: flex">
              <view
                v-for="(item1, index1) in item.imgsList"
                :key="index1"
                style="margin-right: 7rpx"
              >
                <image
                  :src="item1"
                  style="
                    margin-right: 7rpx;
                    width: 212rpx;
                    height: 159rpx;
                    border-radius: 8rpx;
                  "
                >
                </image>
              </view>
            </view>
          </scroll-view>
        </view>
        <view v-if="item.baoType == 1" class="flex size24 alc">
          <view class="bao-item">活动</view>
          <view class="mainRed fwb ml10">￥{{ item.flashSalePriceBao }}</view>
          <view class="txtLighGray txtls ml10"
            >￥{{ item.marketPriceBao }}</view
          >
          <view class="oneLine ml10 flexOne">{{ item.titleBao }}</view>

          <view
            class="clockBtn"
            v-if="item.btnIndex === 1"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
        <view v-if="item.tuanType == 1" class="flex size24 alc mt10">
          <view class="tuan-item">团购</view>
          <view class="mainRed fwb ml10">￥{{ item.flashSalePricetuan }}</view>
          <view class="txtLighGray txtls ml10"
            >￥{{ item.marketPricetuan }}</view
          >
          <view class="oneLine ml10 flexOne">{{ item.titletuan }}</view>

          <view
            class="clockBtn"
            v-if="item.btnIndex === 2"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
        <view v-if="item.quanType == 1" class="flex size24 alc mt10">
          <view class="quan-item">券</view>
          <view class="mainRed fwb ml10">￥{{ item.flashSalePricequan }}</view>
          <view class="txtLighGray txtls ml10"
            >￥{{ item.marketPricequan }}</view
          >
          <view class="oneLine ml10 flexOne">{{ item.titlequan }}</view>

          <view
            class="clockBtn"
            v-if="item.btnIndex === 3"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
        <view v-if="item.merchantType == 1" class="flex size24 alc mt10">
          <view class="quan-item">套餐</view>
          <view class="mainRed fwb ml10"
            >￥{{ item.flashSalePricemerchant }}</view
          >
          <view
            v-if="item.marketPricemerchant > 0"
            class="txtLighGray txtls ml10"
            >￥{{ item.marketPricemerchant }}</view
          >
          <view class="oneLine ml10 flexOne">{{ item.titlemerchant }}</view>

          <view
            class="clockBtn"
            v-if="item.btnIndex === 4"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
        <view v-else class="flex size24 alc mt10">
          <view style="flex: 1"></view>
          <view
            class="clockBtn"
            v-if="item.btnIndex === 5"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
      </view>
    </template>
    <template v-if="newLockType === 3">
      <view
        class="modalBox nearBox"
        v-for="item in list"
        mode="heightFix"
        :key="item.shopId"
      >
        <view
          class="newrH mb20 u-flex-al"
          style="display: flex; align-items: center"
        >
          <image
            v-if="item.brandLogo"
            :src="item.brandLogo"
            class="shopLogo"
            mode="heightFix"
          ></image>
          <text>{{ item.storeAbbreviation }}</text>
        </view>
        <view
          class="flex alc jsb"
          v-if="item.doorheadPhotos && item.doorheadPhotos.length > 0"
        >
          <template v-if="item.doorheadPhotos.length == 3">
            <image
              :src="photo"
              class="nearItemPic3"
              mode="aspectFill"
              :key="index"
              v-for="(photo, index) in item.doorheadPhotos"
            >
            </image>
          </template>
          <template v-if="item.doorheadPhotos.length == 1">
            <image
              :src="item.doorheadPhotos[0]"
              class="nearItemPic1"
              mode="aspectFill"
            >
            </image>
          </template>
        </view>
        <view
          v-if="item.storeLabel"
          class="mb10"
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 10rpx;
          "
        >
          <view class="shopSpetial oneLine">{{ item.storeLabel }}</view>
          <view
            class="clockBtn"
            style="margin-right: 0"
            @click="handleClockBtn(item)"
            >打卡</view
          >
        </view>
        <view v-else style="height: 52rpx"></view>
        <view class="flex alc jsb">
          <view class="flex alc">
            <view
              class="flex alc"
              @click.stop="showLocation(item.lng, item.lat)"
            >
              <image src="@/static/image/dingwei.png" class="dwIcon"></image>
              <view class="ml10 size24">{{ item.distanceMsg }}</view>
            </view>
            <view
              v-if="item.mobile"
              class="flex alc ml20"
              @click.stop="clickTel(item.mobile)"
            >
              <image src="@/static/image/dianhua.png" class="telIcon"></image>
              <view class="ml10 size24">{{ item.mobile }}</view>
            </view>
          </view>
          <!-- <view class="goShop">进店</view> -->
        </view>
      </view>
    </template>
    <view v-if="list.length === 0 && !showloading" class="square-empty">
      <view class="square-empty--img">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230822/file_1692689603184.png"
          class="square-empty-image"
        />
      </view>
      <view class="square-empty-title" style="color: rgba(34, 34, 34, 0.7)">
        暂无数据
      </view>
    </view>
    <u-toast ref="uSquareToast"></u-toast>
  </view>
</template>

<script>
export default {
  components: {},
  props: {
    newLockType: {
      type: Number,
      default: 1,
    },
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    showloading: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    handleClockBtn(item) {
      let address = item.baseName;
      let id = item.id;
      if (this.newLockType === 3) {
        address = item.storeAbbreviation;
        id = item.shopId;
      }
      this.$emit('giveItem', address, id);
    },
  },
  compent: {},
};
</script>

<style lang="scss" scoped>
.square {
  &__list {
    margin-top: 10rpx;
    background: #ffffff;
    border-radius: 10rpx;
    padding: 20rpx;
    &--title {
      width: 100%;
    }
    &--dec {
      width: calc(100% - 100rpx);
    }
  }
}
.bao-item {
  padding: 6rpx 15rpx;
  background-color: #fceded;
  color: #d91b1b;
  border-radius: 16rpx;
  size: 24rpx;
  font-weight: bold;
  line-height: 32rpx;
}
.tuan-item {
  padding: 6rpx 15rpx;
  background-color: #fceded;
  color: #d91b1b;
  border-radius: 16rpx;
  size: 24rpx;
  font-weight: bold;
  line-height: 32rpx;
}
.quan-item {
  padding: 6rpx 15rpx;
  border-radius: 10rpx;
  size: 24rpx;
  font-weight: bold;
  line-height: 32rpx;
  background-color: #fceded;
  color: #d91b1b;
  border-radius: 16rpx;
}
.nearBox {
  padding: 10rpx;
  margin-bottom: 10rpx;
  margin-top: 10rpx;
  .newrH {
    font-size: 32rpx;
    font-weight: bold;
    .shopLogo {
      margin-right: 16rpx;
      height: 50rpx;
    }
  }
  .nearItemPic1 {
    width: 100%;
    height: 210rpx;
    border-radius: 10rpx;
  }
  .nearItemPic3 {
    width: 230rpx;
    height: 230rpx;
    border-radius: 10rpx;
  }
  .shopSpetial {
    background: #fbe8e8;
    border-radius: 10rpx;
    color: #d91b1b;
    font-size: 24rpx;
    text-align: center;
    padding: 10rpx 25rpx;
    display: inline-flex;
  }
  .dwIcon {
    width: 24rpx;
    height: 30rpx;
  }
  .telIcon {
    width: 25rpx;
    height: 25rpx;
  }
}

.nearBox:nth-last-child(1) {
  margin-bottom: 0;
}
.modalBox {
  background: #ffffff;
  border-radius: 10rpx;
  box-sizing: border-box;
}
.square-empty {
  text-align: center;
}
.flexOne {
  flex: 1;
}
.clockBtn {
  background: #d91b1b;
  border-radius: 10rpx;
  padding: 10rpx 20rpx;
  color: white;
  margin: 0 36rpx;
  white-space: nowrap;
}
</style>