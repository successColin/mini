<!--
 * @Descripttion: 选择品牌
 * @Author: ytx
 * @Date: 2023-11-07 17:45:51
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-07 17:45:51
-->
<template>
  <view class="selectCar">
    <fixed-input
      :value.sync="keycode"
      placeholder="请输入品牌名称搜索"
      @blur="handleBlur"
    ></fixed-input>
    <u-index-list :indexList="indexList" class="list" @select="handleSelect">
      <!-- <view slot="header" class="selectCar__hot">
        <view class="selectCar__hot--title">热门品牌</view>
        <view class="selectCar__hot--box">
          <view
            v-for="(item, i) in hotArr"
            :key="i"
            class="selectCar__hot--item oneLine"
          >
            {{ item.name }}
          </view>
        </view>
      </view> -->
      <view v-for="(item, index) in itemArr" :key="index">
        <u-index-item :key="index">
          <u-index-anchor :text="indexList[index]"></u-index-anchor>
          <view
            class="list"
            v-for="(v, i) in item"
            :key="i"
            @click="handleBrandItem(v)"
          >
            <view class="list__item">
              {{ v.brandName }}
            </view>
          </view>
        </u-index-item>
      </view>
      <view slot="footer" class="list__footer">
        共{{ brandArr.length }}个品牌
      </view>
    </u-index-list>
  </view>
</template>

<script>
import fixedInput from '@/components/search/fixedInput.vue';
import { tologin } from '@/utils/index.js';
import cnchar from 'cnchar';
import 'cnchar-poly';

export default {
  components: {
    fixedInput,
  },
  mounted() {
    this.getBrand();
  },
  data() {
    return {
      keycode: '',

      brandArr: [],

      // 热门品牌
      hotArr: [
        {
          name: '凄恻瓶拍啊打发撒旦发',
          id: 1,
        },
        {
          name: '凄恻瓶拍',
          id: 1,
        },
        {
          name: '凄恻瓶拍',
          id: 1,
        },
        {
          name: '凄恻瓶拍',
          id: 1,
        },
        {
          name: '凄恻瓶拍',
          id: 1,
        },
        {
          name: '凄恻瓶拍',
          id: 1,
        },
      ],

      indexList: [], // 右侧位置
      itemArr: [],
    };
  },
  methods: {
    handleSelect(i) {
      console.log(i);
    },
    getBrand() {
      this.$request
        .post('/coc-active/api/v1/four_s/fourSBrand', {
          brandName: this.keycode,
        })
        .then((res) => {
          this.indexList = [];
          this.itemArr = [];

          const data = res.data;
          this.brandArr = data;
          data.forEach((item) => {
            let initial = '';
            if (item.brandName) {
              const spell = cnchar.spell(item.brandName);
              initial = spell.slice(0, 1);

              if (this.indexList.indexOf(initial) === -1) {
                this.indexList.push(initial);
              }
              item.initial = initial;
            }
          });

          this.indexList.sort();

          this.indexList.forEach((item) => {
            const arr = data.filter((v) => v.initial === item);
            console.log(arr);
            this.itemArr.push(arr);
          });

          console.log(this.itemArr, this.indexList);
        });
    },
    handleBlur() {
      this.getBrand();
    },
    handleBrandItem(item) {
      console.log(item);
      if (tologin() !== true) {
        return;
      }
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/selectShop?brandId=${item.brandId}`,
      });
    },
  },
};
</script>

<style lang="scss">
.selectCar {
  &__hot {
    padding: 35rpx;
    background: #ffffff;

    &--title {
      font-size: 27rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #000000;
    }
    &--box {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    &--item {
      width: 110rpx;
      height: 69rpx;
      background: #efefef;
      border-radius: 6rpx;
      border: 2rpx solid #efefef;
      font-size: 27rpx;
      color: #222222;
      margin-top: 30rpx;
      text-align: center;
      line-height: 69rpx;
      margin-right: 10rpx;
      padding: 0 10px;
    }
  }
}
.list {
  &__item {
    @include flex;
    padding: 23rpx 55rpx;
    align-items: center;

    background: #ffffff;
    font-size: 27rpx;
    color: #222222;
  }

  &__footer {
    color: $u-tips-color;
    font-size: 14px;
    text-align: center;
    margin-bottom: 40rpx;
    width: 100%;
    margin: 40rpx 0 60rpx;
  }
}
</style>