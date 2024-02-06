<!--
 * @Descripttion: 咨询人列表
 * @Author: ytx
 * @Date: 2023-11-08 13:35:51
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-08 13:35:51
-->
<template>
  <div class="consultPeople">
    <div class="consultPeople__message">
      <div class="consultPeople__message--content" @click="handleUser">
        <div class="consultPeople__message--one">
          <u-avatar size="23" :src="item.headImg || defaultImg"></u-avatar>
          <text class="people__name">{{ item.name }}</text>
          <div
            class="people__status"
            v-if="item.onlineStatusMsg"
            :style="
              item.onlineStatus === 1
                ? 'background: #2C9D4C;'
                : 'background: #E97521;'
            "
          >
            {{ item.onlineStatusMsg }}
          </div>
          <div class="people__local oneLine">
            {{ item.baseName }}
          </div>
        </div>
        <div class="consultPeople__message--two">
          <text>{{ item.distanceMsg }}</text>
          <span v-if="item.baseAddress"></span>
          <text style="" class="oneLine">{{ item.baseAddress }}</text>
        </div>
      </div>
      <div class="consultPeople__message--btn" @click="handleConsult">咨询</div>
    </div>
    <div class="consultPeople__dec" :style="isShowType ? '' : 'margin-top: 0'">
      <div v-for="(v, i) in item.tagNameList" :key="i">{{ v }}</div>
    </div>
    <div class="consultPeople__line" v-if="state"></div>
  </div>
</template>

<script>
import { tologin } from '@/utils/index.js';

export default {
  props: {
    state: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      defaultImg:
        'https://oss.dcqcjlb.com/51che_java_dev/20231208/file_1702019665548.png',
    };
  },
  components: {},
  computed: {
    isShowType() {
      return this.item.tagNameList && this.item.tagNameList.length !== 0;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    async handleUser() {
      // await getApp().globalData.nim.destroy();
      tologin();
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/technicianDetails?technicianId=${this.item.technicianId}`,
      });
    },
    // 点击咨询
    async handleConsult() {
      this.$request.post('/coc-active/api/v1/technician/addClickNum', {
        accid: this.item.accid,
      });

      if (!this.item.accid) {
        return uni.showToast({
          title: 'accid 获取失败',
          icon: 'none',
        });
      }

      // await getApp().globalData.nim.destroy();
      console.log(this.item);
      tologin();
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/onlineConversation?back=1&teacherId=${this.item.accid}&technicianId=${this.item.technicianId}`,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.consultPeople {
  padding: 35rpx 20rpx 0;
  background: #ffffff;
  &__message {
    display: flex;
    width: 100%;
    &--content {
      flex: 1;
      width: calc(100% - 100rpx);
      margin-right: 20rpx;
    }
    &--one {
      display: flex;
      align-items: center;
      .people__name {
        font-size: 31rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin: 0 16rpx;
      }
      .people__status {
        background: #e97521;
        border-radius: 4rpx;
        padding: 4rpx 8rpx;
        font-size: 19rpx;
        color: #ffffff;
        height: 27rpx;
        line-height: 27rpx;
      }
      .people__local {
        flex: 1;
        font-size: 23rpx;
        color: #222222;
        margin-left: 16rpx;
        font-family: PingFang SC-Regular, PingFang SC;
      }
    }
    &--two {
      font-size: 23rpx;
      color: #999999;
      display: flex;
      align-items: center;
      margin-top: 8rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      span {
        height: 15rpx;
        border-radius: 2rpx;
        border-right: 1rpx solid #cccccc;
        margin: 0 15rpx;
      }
    }
    &--btn {
      background: #d91b1b;
      border-radius: 8rpx;
      font-size: 23rpx;
      color: #ffffff;
      height: 50rpx;
      line-height: 50rpx;
      width: 80rpx;
      text-align: center;
    }
  }
  &__dec {
    display: flex;
    margin-top: 23rpx;
    margin-bottom: 35rpx;
    div {
      background: #efefef;
      border-radius: 4rpx;
      padding: 8rpx 15rpx;
      font-size: 23rpx;
      color: #222222;
      margin-right: 8rpx;
      font-family: PingFang SC-Regular, PingFang SC;
    }
  }
  &__line {
    width: 100%;
    height: 1px;
    border-radius: 2rpx;
    background: #e2e2e2;
    opacity: 0.7;
  }
}
</style>
