<template>
  <div class="typeTabsClass">
    <view class="typeTabsClass__tabs" v-if="typeChange">
      <div style="width: calc(100% - 56rpx)">
        <u-tabs
          keyName="name"
          itemStyle="height:34px;font-family: PingFang SC;"
          inactiveStyle="font-weight: 500;color: #999999; font-size: 28rpx;"
          activeStyle="font-weight: bold;color: #222222; font-size: 28rpx;"
          :list="list"
          :current="current"
          @click="handleClick"
        >
        </u-tabs>
      </div>
      <div class="typeTabsClass__tabs--icon" @click="handleToggle">
        <u-icon name="search" size="20"></u-icon>
      </div>
    </view>
    <view class="typeTabsClass__input" v-else>
      <view>
        <u-search
          :showAction="true"
          :clearabled="true"
          :value="keyword"
          :placeholder="placeholder"
          @change="handleChange"
          @clear="handleClose"
          @custom="handleSearch"
          @search="handleSearch"
        ></u-search>
      </view>

      <div class="typeTabsClass__btn" @click="handleToggle">
        <u-image
          src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698369811840.png"
          width="26rpx"
          height="29rpx"
        ></u-image>
      </div>
    </view>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: '',
    },
    // 选品类型：1-活动；2-保养套餐；3-救援卡；4-团购;5-单品套餐;6-4S店车款;7-4S店车型
    list: {
      type: Array,
      default: () => {},
    },
    placeholder: {
      type: String,
      default: '搜索感兴趣的贴文',
    },
    current: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      typeChange: true,
      tagcurrent: 1,
    };
  },
  components: {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handleChange(v) {
      console.log(v);
      this.$emit('update:value', v);
    },
    handleToggle() {
      this.typeChange = !this.typeChange;
      this.$emit('update:current', this.current);
      this.$emit('giveToggle', this.typeChange);
    },
    handleClick(item) {
      console.log(item);
      this.$emit('update:current', item.index);
      this.$emit('giveTabsFun', item);
    },
    handleSearch(item) {
      this.$emit('giveSearch', item);
    },
    handleClose(item) {
      this.$emit('giveClose', item);
    },
  },
};
</script>
<style lang='scss' scoped>
.typeTabsClass {
  padding: 6rpx 20rpx 10rpx;
  width: calc(100% - 40rpx);
  &__input {
    display: flex;
    align-items: center;
    view:first-child {
      flex: 1;
    }
  }
  &__btn {
    padding: 10rpx;
  }
  &__tabs {
    display: flex;
    &--icon {
      display: flex;
      align-items: center;
      padding: 0 20rpx;
    }
  }
}
</style>
