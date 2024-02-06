<template>
  <div class="order">
    <u-sticky>
      <div class="order__tabs">
        <u-tabs
          :current="current"
          :list="tabsList"
          @click="handleTabs"
          :inactiveStyle="{
            fontWeight: '600',
            color: '#999999',
            fontSize: '28rpx',
            fontFamily: 'PingFang SC, PingFang SC',
          }"
          :activeStyle="{
            fontWeight: '800',
            color: '#D91B1B',
            fontSize: '28rpx',
            fontFamily: 'PingFang SC, PingFang SC',
          }"
          lineColor="#D91B1B"
          :lineHeight="2"
          :lineWidth="16"
        ></u-tabs>
      </div>
    </u-sticky>

    <div class="order__box">
      <welfare-pooling v-if="current === 0"></welfare-pooling>
      <activity v-else-if="current === 1" :typeNum="18"></activity>
      <activity v-else-if="current === 2" :typeNum="17"></activity>
      <group-buy v-else-if="current === 3" :typeNum="3"></group-buy>
      <activity v-else-if="current === 4" :shopTypeNum="2"></activity>
      <upkeep-order v-else-if="current === 5"></upkeep-order>
      <maintenance-coupon v-else-if="current === 6"></maintenance-coupon>
      <upkeep-reserve v-else-if="current === 7"></upkeep-reserve>
      <point-order v-else-if="current === 8"></point-order>
      <car-order v-else-if="current === 9"></car-order>
      <group-buy v-else-if="current === 10" :typeNum="1"></group-buy>
      <group-buy v-else-if="current === 11" :typeNum="4"></group-buy>
    </div>
  </div>
</template>

<script>
import Activity from './Activity.vue'; // 活动
import TalentEvent from './TalentEvent.vue';
import CarOrder from './CarOrder.vue'; // 订车
import GroupBuy from './GroupBuy.vue'; // 优惠团购
import MaintenanceCoupon from './MaintenanceCoupon.vue'; // 保养预约
import PointOrder from './PointOrder.vue'; // 积分订单
import UpkeepOrder from './UpkeepOrder.vue'; // 保养订单
import UpkeepReserve from './UpkeepReserve.vue'; // 保养预约
import WelfarePooling from './WelfarePooling';

export default {
  data() {
    return {
      current: 0,
      tabsList: [
        {
          name: '福利拼团',
          key: 'groupTeamCount',
        },
        {
          name: '户外畅游',
          key: 'outdoorActivityCount',
        },
        {
          name: '户内嗨乐',
          key: 'indoorActivityCount',
        },
        {
          name: '寻味住店',
          key: 'cateringHotelsActivityCount',
        },
        {
          name: '4s店活动',
          key: 'fourShopActivityCount',
        },
        {
          name: '保养套餐',
          key: 'maintainOrderCount',
        },
        {
          name: '保养券',
          key: 'maintainTicketCount',
        },
        {
          name: '保养预约',
          key: 'maintenanceAppointmentCount',
        },

        {
          name: '积分订单',
          key: 'scoreOrderCount',
        },
        {
          name: '订车订单',
          key: 'depositCount',
        },
        {
          name: '福利团购',
          key: 'groupCount',
        },
        {
          name: '其他',
          key: 'otherCount',
        },
        // {
        //   name: '拼团订单',
        // },
        // {
        //   name: '租车订单',
        // },
      ],
    };
  },
  components: {
    GroupBuy,
    TalentEvent,
    Activity,
    UpkeepOrder,
    PointOrder,
    CarOrder,
    UpkeepReserve,
    MaintenanceCoupon,
    WelfarePooling,
  },
  computed: {},
  watch: {},
  mounted() {
    this.getCornerMark();
  },
  onReachBottom() {
    uni.$emit('onReachBottom');
  },
  onShow() {
    uni.$emit('onRefresh');
  },
  methods: {
    async getCornerMark() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/my/statCountInfo'
      );
      console.log(data);
      for (let i in data) {
        this.tabsList.forEach((v, index) => {
          if (i === v.key && data[i] !== 0) {
            this.$set(this.tabsList, index, {
              ...this.tabsList[index],
              badge: {
                value: data[i],
              },
            });
          }
        });
      }
    },
    handleTabs(v) {
      this.current = v.index;
    },
  },
};
</script>
<style lang='scss' scoped>
.order {
  &__tabs {
    background: #fff;
    height: 88rpx;
  }
}
::v-deep {
  .u-tabs__wrapper__nav__item {
    position: relative;
    .u-badge--error {
      position: absolute;
      top: 4px;
      right: -8px;
      background-color: #d91b1b !important;
    }
  }

  .welfarePooling__tabs {
    .u-tabs__wrapper__nav__item {
      padding: 0 10rpx !important;
    }
  }

  .list__count--down {
    .u-count-down__text {
      color: #999999 !important;
      font-size: 20rpx !important;
    }
  }
}
</style>
