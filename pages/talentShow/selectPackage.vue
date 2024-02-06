<template>
  <div class="selectPackage">
    <div class="selectPackage__input">
      <fixed-input
        :barArr="barArr"
        :value.sync="keyword"
        :labour="false"
        placeholder="搜索套餐"
        @blur="handleBlur"
      ></fixed-input>
    </div>
    <u-checkbox-group v-model="checkbox" placement="column">
      <div
        v-for="(item, index) in listArr"
        :key="index"
        class="selectPackage__item"
        @click="handleClick(item)"
      >
        <div class="selectPackage__item--left">
          <image
            style="width: 107rpx; height: 107rpx; margin-right: 15rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230506/file_1683360991929.png"
          >
          </image>
          <div class="selectPackage__item--left--dec">
            <div>单人套餐</div>
            <div>
              <div>套</div>
              <div>¥88</div>
              <div>¥100</div>
            </div>
          </div>
        </div>
        <div class="selectPackage__item--right">
          <u-checkbox
            activeColor="#D91B1B"
            :customStyle="{ marginBottom: '8px' }"
            :name="item.id"
          >
          </u-checkbox>
        </div>
      </div>
    </u-checkbox-group>

    <div style="height: 100rpx"></div>
    <no-data v-if="listArr.length === 0 && !isFirst"></no-data>

    <div style="width: 100%; position: fixed; bottom: 100rpx">
      <div class="selectPackage__btn" @click="handleOk">确定</div>
    </div>
  </div>
</template>

<script>
import NoData from '@/components/samllTool/NoData.vue';
import fixedInput from '@/components/search/fixedInput.vue';

export default {
  data() {
    return {
      isFirst: true,

      keyword: '',
      barArr: ['搜索套餐'],

      checkbox: [],
      listArr: [
        {
          id: 1,
        },
        {
          id: 2,
        },
        {
          id: 3,
        },
        {
          id: 4,
        },
        {
          id: 5,
        },
      ],
    };
  },
  components: {
    fixedInput,
    NoData,
  },
  computed: {},
  watch: {},
  mounted() {
    this.isFirst = false;
  },
  methods: {
    handleBlur() {},
    handleClick(item) {
      console.log(item);
      const i = this.checkbox.findIndex((v) => v === item.id);
      if (i !== -1) {
        this.checkbox.splice(i, 1);
      } else {
        this.checkbox.push(item.id);
      }
    },
    handleOk() {
      console.log(this.checkbox);
    },
  },
};
</script>
<style lang='scss' scoped>
.selectPackage {
  &__input {
    background: #ffffff;
  }
  &__item {
    margin: 23rpx 23rpx 0;
    padding: 15rpx;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 15rpx;
    &--left {
      display: flex;
      &--dec {
        & > div:nth-child(1) {
          font-size: 27rpx;
          font-family: PingFang SC, PingFang SC;
          font-weight: 500;
          color: #222222;
          height: 38rpx;
          line-height: 38rpx;
        }
        & > div:nth-child(2) {
          margin-top: 10rpx;
          display: flex;
          & > div:nth-child(1) {
            width: 31rpx;
            height: 31rpx;
            background: #fbe8e8;
            border-radius: 158rpx;
            font-size: 19rpx;
            font-family: PingFang SC, PingFang SC;
            font-weight: 500;
            color: #dd3232;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 8rpx;
          }
          & > div:nth-child(2) {
            font-size: 23rpx;
            font-family: OPPOSans, OPPOSans;
            font-weight: 500;
            color: #d91b1b;
            margin-right: 8rpx;
          }
          & > div:nth-child(3) {
            font-size: 23rpx;
            font-family: PingFang SC, PingFang SC;
            color: #999999;
          }
        }
      }
    }
    &--right {
    }
  }
  &__btn {
    width: 512rpx;
    height: 77rpx;
    background: linear-gradient(270deg, #d91b1b 0%, #e94141 100%);
    border-radius: 137rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 27rpx;
    font-family: PingFang SC, PingFang SC;
    color: #ffffff;
  }
}
</style>
