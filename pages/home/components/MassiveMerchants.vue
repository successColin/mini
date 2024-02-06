<template>
  <div class="merchants">
    <div class="merchants__title">
      <div>海量商家</div>
      <div @click="handleJump">
        去合作
        <div style="position: relative; top: 1px">
          <u-icon name="arrow-right" size="14"></u-icon>
        </div>
      </div>
    </div>

    <view class="merchants__box">
      <view class="merchants__box--tabs">
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

      <view v-for="item in dataList" :key="item.id" class="merchants__list">
        <shop-menu
          :item="item"
          v-if="current === 0"
          :flashSale="false"
          :cooperation="true"
        ></shop-menu>
        <car-shop
          :item="item"
          :isShop="true"
          :isConsult="false"
          v-else
          class="merchants__carShop"
        ></car-shop>
      </view>
      <!-- <view class="reachBottom">
        查看更多
        <u-icon name="arrow-right" size="14"></u-icon>
      </view> -->
    </view>
  </div>
</template>

<script>
import CarShop from '@/components/CarShop';
import ShopMenu from '@/components/samllTool/ShopMenu.vue';

export default {
  data() {
    return {
      current: 0,
      tabsList: [
        {
          name: '优质商户',
        },
        {
          name: '合作4S店',
        },
      ],
      dataList: [],
    };
  },
  components: {
    ShopMenu,
    CarShop,
  },
  computed: {},
  watch: {},
  mounted() {
    this.getList();
  },
  methods: {
    handleJump() {
      uni.navigateTo({
        url: '/pages/activity/manage/index',
      });
    },
    handleTabs(v) {
      this.current = v.index;
      this.getList();
    },
    // 获取列表
    getList() {
      this.dataList = [];
      if (this.current === 1) {
        this.$newrequest
          .post('/coc-active/api/v2/homePage/four_s/nearbyShopS', {
            isTopping: 1,
            shopId: 0,
          })
          .then((res) => {
            this.dataList = res.data;
          });
      } else {
        let url = '/coc-active/api/v2/homePage/qualityShopList';
        this.$newrequest
          .post(url, {
            current: 1,
            size: 3,
            isHighQuality: 1,
          })
          .then((res) => {
            const { records } = res.data;
            this.dataList = records;
          });
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.merchants {
  &__title {
    display: flex;
    justify-content: space-between;
    font-family: PingFang SC, PingFang SC;
    color: #222222;
    align-items: center;
    margin-bottom: 20rpx;
    margin-top: 4rpx;
    div:nth-child(1) {
      font-size: 28rpx;
      font-weight: 800;
    }
    div:nth-child(2) {
      font-size: 24rpx;
      font-weight: 500;
      display: flex;
      align-items: center;
    }
    image {
      width: 46rpx;
      height: 46rpx;
    }
  }
  &__box {
    background: #ffffff;
    border-radius: 10rpx;
    &--tabs {
      width: 500rpx;
      margin: 0 auto;
    }
  }
  &__list {
    padding: 10rpx;
  }
}
.reachBottom {
  font-size: 24rpx;
  font-family: PingFang SC, PingFang SC;
  font-weight: 500;
  color: #000000;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 20rpx;
  image {
    width: 46rpx;
    height: 46rpx;
  }
}
</style>
