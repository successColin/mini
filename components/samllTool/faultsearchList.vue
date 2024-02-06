<template>
  <view class="faultsearch-list" :style="widthS">
    <view class="faultsearch-list--head">
      <template v-if="!isAnswer">
        <view style="display: flex">
          <text>找专业技师</text>
          <div class="faultsearch-list--local" @click="handleSelectLocal">
            {{ cityObj.name || '请选择' }}
            <span></span>
          </div>
        </view>
      </template>
      <template v-else>
        <div class="faultsearch-list--local" @click="handleSelectLocal">
          {{ cityObj.name || '请选择' }}
          <span></span>
        </div>
        <div class="answer" @click="handleJump" v-if="isAnswer">
          <div style="margin-top: 7rpx; margin-right: 7rpx">
            <u-icon name="question-circle" :size="12" color="#999999"></u-icon>
          </div>
          <div class="size28 mr10">大家都在问</div>
          <div style="margin-top: 7rpx">
            <u-icon name="arrow-right" :size="12" color="#999999"></u-icon>
          </div>
        </div>
      </template>
    </view>
    <fixed-input
      v-if="isAnswer"
      :value.sync="keycode"
      placeholder="请输入技师名称"
      :barArr="['51车·人车生活俱乐部', '请输入技师名称']"
      :rightType="1"
      @click="handleMessage"
      @blur="handleBlur"
    ></fixed-input>
    <scroll-view class="faultsearch-car" scroll-x="true">
      <view class="u-flex">
        <view
          v-for="(v, i) in brandList"
          :key="i"
          :class="
            v.brandId === brand.brandId
              ? 'faultsearch-car-item'
              : 'faultsearch-car-unitem'
          "
          @click="setBrand(v, $event)"
        >
          <!-- {{ v.brandId }} {{ brand.brandId }} -->
          <view
            :class="
              v.brandId === brand.brandId
                ? 'faultsearch-car-item-title'
                : 'faultsearch-car-unitem-title'
            "
          >
            {{ v.brandName }}
          </view>
        </view>
      </view>
    </scroll-view>
    <view class="faultsearch-list--content">
      <view v-if="technicianList.length">
        <consult-people
          v-for="(v, g) in technicianList"
          :state="!(g === technicianList.length - 1)"
          :key="g"
          :leng="technicianList.length - 1"
          :item="v"
        ></consult-people>
      </view>
      <view class="tac mt50" v-else>
        <image
          style="
            width: 423rpx;
            height: 324rpx;
            margin-top: 100rpx;
            margin: 0 auto;
          "
          src="https://51shanky.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20230818/file_1692345210274.png"
        >
        </image>
        <view class="txtDarkGray">暂无数据</view>
      </view>
    </view>
    <province-area
      :show.sync="isShow"
      :columns="columns"
      :columnData="columnData"
      @confirm="handleProvinceArea"
    ></province-area>
  </view>
</template>

<script>
import ConsultPeople from '@/components/ConsultPeople';
import ProvinceArea from '@/components/ProvinceArea/index.vue';
import fixedInput from '@/components/search/fixedInput.vue';

export default {
  props: {
    widthS: {
      type: String,
      default: '',
    },
    isAnswer: {
      type: Boolean,
      default: false,
    },
    keycodeVal: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      cityObj: {}, // 市编码
      columns: [],
      columnData: [],
      technicianList: [],
      isShow: false,
      brandList: [],
      brand: {},
      keycode: '',
    };
  },
  components: {
    ConsultPeople,
    ProvinceArea,
    fixedInput,
  },
  computed: {},
  watch: {
    // keycodeVal: {
    //   handle(v) {
    //     console.log(v);
    //     this.keycode = v;
    //   },
    //   deep: true,
    // },
  },
  mounted() {
    this.getProvince();
  },
  methods: {
    async handleMessage() {
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/consultationList`,
      });
    },
    handleBlur() {
      console.log('jinlaile', this.keycode);
      this.getList();
    },
    handleJump() {
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/faultClassify`,
      });
    },
    checkShop(value) {
      let item = {};
      this.brand.fourSShopVO.forEach((v) => {
        if (v.shopId === value.shopId) {
          item = v;
        }
      });
      if (item.baseMobile) {
        uni.navigateTo({
          url:
            '/pages/roadhelp/faultAbout/faultForm?shop=' + JSON.stringify(item),
        });
      } else {
        uni.showToast({
          title: '该4S店没有售后电话,请换一家',
          icon: 'none',
          duration: 2000,
        });
      }
    },
    setBrand(value, e) {
      console.log(e);
      uni.pageScrollTo({
        scrollTop: 0,
      });
      this.brand = value;
      this.getList();
    },
    // 获取第一行数据 二级联动
    async getProvince() {
      this.columns = [];
      this.columnData = [];

      const res = await this.$request.get(
        '/coc-active/api/v1/technician/province/list'
      );

      if (JSON.stringify(res.data) === '[]') return;

      const arr = res.data.filter((item) => item.adCode);
      this.columns.push(arr);

      const { data } = await this.$request.get(
        `/coc-active/api/v1/technician/city/list/${res.data[0].adCode}`
      );
      this.cityObj = data[0];
      this.columns.push(data);
      this.columnData.push(data);

      console.log(22222222222, this.cityObj, data);
      this.getBrand();
    },
    handleProvinceArea(item) {
      this.cityObj = item[1];
      console.log(222222222222222, this.cityObj);
      this.getBrand();
    },
    handleSelectLocal() {
      this.isShow = true;
    },
    // 获取技师列表
    async getList() {
      const params = {
        cityCode: this.cityObj.adCode, // 市编码 this.cityObj.cityCode
        name: this.keycode || this.keycodeVal, // 技师名称
        brandId: this.brand.brandId,
      };
      await this.$newrequest
        .post('/coc-active/api/v1/technician/list', params)
        .then((res) => {
          this.technicianList = res.data || [];
        });
    },
    async getBrand() {
      await this.$request
        .post('/coc-active/api/v1/technician/brand/list', {
          cityCode: this.cityObj.adCode,
        })
        .then((res) => {
          console.log(res);
          this.brandList = res.data;
          this.brandList.unshift({
            brandName: '全部',
          });
          this.brand = res.data[0];
          this.getList();
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.page {
  // height: 100vh;
  background: #efefef;
}
$width: calc(100% - 50rpx);

.answer {
  display: flex;
  align-items: center;
  div {
    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }
}
::v-deep {
  .u-scroll-list__indicator {
    margin-top: 13px !important;
  }
}
.page__scroll {
  width: $width;
  background: #ffffff;
  border-radius: 15rpx 15rpx 15rpx 15rpx;
  margin-top: 23rpx;
}
.scroll-list {
  @include flex(column);
  &__line {
    @include flex;
    margin: 23rpx 23rpx 0;

    &__item {
      margin-right: 10px;

      flex-direction: column;
      align-items: center;
      justify-content: center;
      display: flex;
      width: 116rpx;

      &__image {
        width: 53rpx;
        height: 53rpx;
      }

      &__text {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #2d2d2d;
        text-align: center;
        margin-top: 7rpx;
      }

      &--no-margin-right {
        margin-right: 0;
      }
    }
  }
  &__line:nth-child(2) {
    margin-top: 54rpx;
  }
}
.faultsearch {
  display: flex;
  flex-direction: column;
  align-items: center;

  &-question {
    position: relative;
    width: 700rpx;
    height: 370rpx;
    margin-top: 18rpx;

    &-image {
      position: absolute;
      top: 0;
      width: 700rpx;
      height: 370rpx;
    }

    &-video {
      position: absolute;
      top: 89rpx;
      left: 25rpx;
      width: 359rpx;
      height: 192rpx;
      border-radius: 10rpx;
    }

    &-title {
      position: absolute;
      width: 359rpx;
      top: 303rpx;
      left: 27rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    &-list {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      top: 89rpx;
      right: 26rpx;
      width: 281rpx;
      height: 256rpx;
      background: rgba(255, 255, 255, 0.8);
      border-radius: 10rpx;
    }

    &-item {
      display: flex;
      align-items: center;
      width: 228rpx;
      height: 63rpx;

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 40rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }

    &-line {
      width: 228rpx;
      height: 1rpx;
      background: #e8e8e8;
    }
  }

  &-list {
    width: $width;
    margin: 15rpx auto 15rpx;
    background: #ffffff;
    margin-top: 15rpx;
    border-radius: 15rpx;
    overflow: hidden;
    &--head {
      display: flex;
      align-items: center;
      font-size: 31rpx;
      font-family: PingFang SC-Semibold, PingFang SC;
      font-weight: 600;
      color: #222222;

      margin: 23rpx 0 0 23rpx;
      justify-content: space-between;
    }
    &--content {
      margin-bottom: 50rpx;
    }
    &--local {
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      color: #222222;

      display: flex;
      align-items: center;
      margin-left: 23rpx;
      span {
        width: 0;
        height: 0;
        border-top: 11rpx solid #222222;
        border-right: 11rpx solid transparent;
        border-left: 11rpx solid transparent;
        margin-left: 6rpx;
      }
    }
  }

  &-image {
    width: 161rpx;
    height: 31rpx;
    padding: 30rpx;
  }

  &-car {
    width: 725rpx;
    margin-left: 23rpx;
    margin-top: 23rpx;

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46rpx;
      // background: #ffeaea;
      border-radius: 8rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      margin-right: 10rpx;

      &-title {
        white-space: nowrap;
        font-size: 31rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
        position: relative;
      }

      &-title:before {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-17.5rpx);
        content: '';
        width: 35rpx;
        height: 12rpx;
        background: linear-gradient(
          180deg,
          #d91b1b 0%,
          rgba(255, 255, 255, 0) 100%
        );
      }
    }

    &-unitem {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 46rpx;
      // background: #f8f8f8;
      border-radius: 8rpx;
      padding-left: 20rpx;
      padding-right: 20rpx;
      margin-right: 10rpx;

      &-title {
        white-space: nowrap;
        font-size: 27rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        color: #666666;
      }
    }
  }

  &-shop {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    &-item {
      width: 700rpx;

      &-top {
        display: flex;
        align-items: center;
        height: 93rpx;

        &-logo {
          height: 50rpx;
          margin-right: 18rpx;
        }

        &-title {
          font-size: 32rpx;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27rpx;
        }
      }

      &-image {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      &-small {
        width: 226rpx;
        height: 226rpx;
        background: #2e2020;
        border-radius: 10rpx;
      }

      &-big {
        width: 700rpx;
        height: 210rpx;
        background: #2e2020;
        border-radius: 10rpx;
      }

      &-label {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48rpx;
        background: rgba(217, 27, 27, 0.1);
        border-radius: 10rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d91b1b;
        line-height: 27rpx;
        margin-top: 18rpx;
        padding-left: 30rpx;
        padding-right: 30rpx;
      }

      &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 8rpx 0rpx 27rpx 0rpx;

        &-location {
          width: 24rpx;
          height: 30rpx;
        }

        &-phone {
          width: 26rpx;
          height: 25rpx;
          margin-left: 19rpx;
        }

        &-title {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 27rpx;
          margin-left: 12rpx;
        }

        &-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 114rpx;
          height: 52rpx;
          background: #d91b1b;
          border-radius: 10rpx;
          font-size: 28rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 27rpx;
        }
      }

      &-line {
        width: 700rpx;
        height: 1rpx;
        background: #e8e8e8;
      }
    }
  }
}

.w700h124 {
  width: 700rpx;
  height: 124rpx;
}

.mt17 {
  margin-top: 17rpx;
}

.mt20 {
  margin-top: 20rpx;
}

image {
  display: block;
}
</style>
