<template>
  <view class="page">
    <view class="page__img">
      <image
        class="page__img--bgn"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702536206283.png"
				@click="handleJumpCard"
      ></image>
      <image
        class="page__img--btn"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231214/file_1702537085250.png"
				@click="handleJumpRecord"
      ></image>
    </view>
    <view class="btn-bottom" @click="OnAdd"> 新增信用卡 </view>
    <view v-if="dataList.length > 0">
      <view v-for="(item, index) in dataList" :key="item.id" class="card">
        <view class="u-flex alc">
          <image
            v-if="item.bankName == '中国农业银行'"
            style="width: 88rpx; height: 88rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230523/file_1684802649568.png"
          >
          </image>
          <image
            v-else-if="item.bankName == '中国工商银行'"
            style="width: 88rpx; height: 88rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230523/file_1684805696940.png"
          >
          </image>
          <view style="margin-left: 16rpx">
            <view class="size28 fwb">{{ item.bankName }}</view>
            <view class="size24 mt20">{{ getbank(item.bankCard) }}</view>
          </view>
        </view>
        <view class="card-name"> 信用卡 </view>
      </view>
    </view>
    <view class="tac" v-else-if="dataList.length == 0">
      <image
        style="width: 423rpx; height: 364rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230523/file_1684801551003.png"
      >
      </image>
    </view>
    <view>
      <cardauthentication :showpop="showpop"></cardauthentication>
    </view>
  </view>
</template>

<script>
import cardauthentication from '@/components/cardauthentication.vue';
export default {
  components: {
    cardauthentication,
  },
  data() {
    return {
      showpop: false,
      dataList: [],
    };
  },

  onLoad() {
    let _this = this;
    uni.$on('closepop', (res) => {
      _this.showpop = false;
    });
  },
  onShow() {
    this.getList();
  },
  methods: {
		handleJumpCard() {
			uni.navigateTo({
        url: '/pages/my/creditCard/index',
      });
		},
		handleJumpRecord() {
			uni.navigateTo({
        url: '/pages/my/card/record',
      });
		},
    getbank(val) {
      let _len = val.length;
      return val.substring(0, 4) + '****' + val.substring(_len - 4, _len);
    },
    getList() {
      this.$request.post('/coc-active/api/v1/my/getBankList').then((res) => {
        this.dataList = res.data;
      });
    },
    OnAdd() {
      if (uni.getStorageSync('isCertify') != 1) {
        this.showpop = true;
        return false;
      }
      uni.navigateTo({
        url: '/pages/my/card/add',
      });
    },
  },
};
</script>

<style lang="scss">
.page {
}
.page__img {
  position: relative;
  &--bgn {
    width: 700rpx;
    height: 300rpx;
    display: block;
    margin: 0 auto;
    margin-top: 20rpx;
  }
  &--btn {
    position: absolute;
    width: 128rpx;
    height: 42rpx;
    right: 25rpx;
    top: 75rpx;
  }
}

.btn-bottom {
  position: fixed;
  bottom: 50rpx;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #d91b1b;
  font-size: 34rpx;
  color: #ffffff;
  border-radius: 40rpx;
  padding: 24rpx 0rpx;
  width: 600rpx;
  text-align: center;
}

.card {
  background: #ffffff;
  border-radius: 10rpx;
  margin: 25rpx;
  padding: 25rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-name {
  font-size: 24rpx;
  color: #d91b1b;
  background: #ffeeee;
  border-radius: 10rpx;
  padding: 8rpx 15rpx;
}
</style>
