<!--
 * @Descripttion: 选择4S店
 * @Author: ytx
 * @Date: 2023-11-07 17:45:38
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-07 17:45:38
-->
<template>
  <div class="selectShop">
    <div v-for="(item, i) in shopList" :key="i" class="selectShop__item">
      <car-shop :item="item" @click="handleClickItem"></car-shop>
    </div>
  </div>
</template>

<script>
import CarShop from '@/components/CarShop';

export default {
  components: { CarShop },
  onLoad(option) {
    this.brandId = option.brandId;

    this.getList();
  },
  data() {
    return {
      brandId: {},

      shopList: [],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    getList() {
      this.$newrequest
        .post('/coc-active/api/v2/homePage/four_s/nearbyShopS', {
          brandId: this.brandId,
          shopId: '0',
        })
        .then((res) => {
          this.shopList = res.data;
          console.log(this.shopList);
        });
    },
    handleClickItem(item) {
      console.log(item);
      uni.navigateTo({
        url: `/pages/carShops/4Sdetail/index?id=${item.shopId}&tabsindex=1`,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.selectShop {
  // background: #efefef;
  &__item {
    margin: 20rpx 20rpx 0;
  }
}
</style>
