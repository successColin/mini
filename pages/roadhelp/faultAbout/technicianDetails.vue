<!--
 * @Descripttion: 技师详情
 * @Author: ytx
 * @Date: 2023-11-08 14:38:04
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-08 14:38:04
-->
<template>
  <div class="technicianDetails">
    <div class="technicianDetails__box">
      <div class="technicianDetails__head">
        <div class="technicianDetails__head--one">
          <u-avatar :src="userObj.headImg || defaultImg" size="53"></u-avatar>
        </div>
        <div class="technicianDetails__head--two">
          <div>{{ userObj.name }}</div>
          <div v-if="userObj.techYearMsg">
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231108/file_1699426682787.png"
            ></image>
            {{ userObj.techYearMsg || '' }}
          </div>
        </div>
        <div class="technicianDetails__head--three">
          <div v-for="(v, i) in userObj.tagNameMsg" :key="i">
            {{ v }}
            <span></span>
          </div>
        </div>
      </div>
    </div>

    <div class="technicianDetails__content">
      <div class="technicianDetails__content--title">技师简介</div>
      <div class="technicianDetails__content--neilong">{{ userObj.intro }}</div>
      <car-shop
        :item="userObj"
        @click="handleClickItem"
        btnName="进店"
      ></car-shop>
    </div>

    <div style="height: 160rpx"></div>

    <div class="technicianDetails__footer">
      <div class="technicianDetails__footer--btn" @click="handleConsult">
        在线咨询
      </div>
    </div>
  </div>
</template>

<script>
import CarShop from '@/components/CarShop';
export default {
  onLoad(option) {
    console.log(option);
    this.technicianId = option.technicianId;
  },
  data() {
    return {
      defaultImg:
        'https://oss.dcqcjlb.com/51che_java_dev/20231208/file_1702019665548.png',
      technicianId: '',

      userObj: {},
    };
  },
  components: { CarShop },
  computed: {},
  watch: {},
  mounted() {
    this.getProvince();
  },
  methods: {
    // 获取用户详情
    async getProvince() {
      const res = await this.$request.post(
        '/coc-active/api/v1/technician/details',
        {
          id: this.technicianId,
        }
      );
      this.userObj = res.data;
    },
    handleClickItem() {
      //
      console.log('进店');
      uni.navigateTo({
        url: '/pages/carShops/4Sdetail/index?id=' + this.userObj.shopId,
      });
    },
    async handleConsult() {
      console.log(this.userObj);
      this.$request.post('/coc-active/api/v1/technician/addClickNum', {
        accid: this.userObj.accid,
      });

      if (!this.userObj.accid) {
        return uni.showToast({
          title: 'accid 获取失败',
          icon: 'none',
        });
      }

      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/onlineConversation?back=2&teacherId=${this.userObj.accid}&technicianId=${this.technicianId}`,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.technicianDetails {
  background: #ffffff;
  height: 100vh;
  // &__box {
  // }
  &__head {
    width: 100%;
    height: 413rpx;
    background: url('https://oss.dcqcjlb.com/51che_java_dev/20231208/file_1702019159143.png')
      no-repeat;
    background-size: 100% 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #ffffff;

    &--one {
    }
    &--two {
      display: flex;
      align-items: center;
      margin-top: 20rpx;
      div:first-child {
        margin-right: 10rpx;
        font-size: 31rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
      }
      div:nth-child(2) {
        display: flex;
        align-items: center;
        background: #c11212;
        border-radius: 200rpx;
        padding: 10rpx 20rpx;
        padding-left: 15rpx;
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
      }
      image {
        width: 23rpx;
        height: 23rpx;
        margin-right: 10rpx;
      }
    }
    &--three {
      display: flex;
      margin-top: 15rpx;
      margin-bottom: 50rpx;
      align-items: center;
      & > div {
        font-size: 23rpx;
        color: #ffffff;
        font-family: PingFang SC-Regular, PingFang SC;
        display: flex;
        align-items: center;
        span {
          width: 1rpx;
          height: 25rpx;
          background: #ffffff;
          display: inline-block;
          margin: 0 15rpx;
        }
      }
      & > div:last-child > span {
        display: none;
      }
    }
  }
  &__content {
    // margin-bottom: 100rpx;
    &--title {
      font-size: 31rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      margin-top: 80rpx;
      padding: 20rpx;
    }
    &--neilong {
      padding: 20rpx;
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 32rpx;
      padding-bottom: 40rpx;
      background: #fff;
    }
  }
  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 154rpx;
    background: #ffffff;
    box-shadow: 0rpx -8rpx 15rpx 0rpx rgba(214, 214, 214, 0.25);
    &--btn {
      width: 404rpx;
      height: 77rpx;
      background: #d91b1b;
      border-radius: 137rpx;
      font-size: 27rpx;
      color: #ffffff;
      margin: 15rpx auto 0;
      text-align: center;
      line-height: 77rpx;
    }
  }
}
</style>
