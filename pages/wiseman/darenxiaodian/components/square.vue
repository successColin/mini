<template>
  <view class="square" :class="mh100">
    <view v-if="!show" class="square-top" :class="home ? 'pt23' : ''">
      <view class="square-top-title" :class="home ? 'ml15' : ''">选品广场</view>
      <!-- <view class="df aic" :class="home ? 'mr15' : ''" @click="toXPGC">
        <view class="square-top-content">去选品赚佣金</view>
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170166388.png"
          class="w46h46"
        />
      </view> -->
    </view>
    <view v-else>
      <view class="h23" />
      <tabs
        v-if="tablist && tablist.length > 0"
        :list="tablist"
        :scroll="true"
        @click="(e) => $emit('settab', e)"
      />
      <view v-if="classify && classify.length > 0">
        <view class="classify">
          <scroll-view class="classify-list" scroll-x="true">
            <view class="flex">
              <view
                v-if="!classify_status"
                v-for="(v, i) in classify"
                :key="i"
                :class="v.status ? 'classify-item' : 'classify-unitem'"
                @click="setClassifyList(v)"
              >
                {{ v.name }}
              </view>
            </view>
          </scroll-view>
          <view
            class="classify-right"
            @click="classify_status = !classify_status"
          >
            <u-icon v-if="classify_status" name="arrow-up" />
            <u-icon v-else name="arrow-down" />
          </view>
        </view>
        <view
          v-if="classify_status"
          :style="{ top: '0px', height: `${classify_top}px` }"
          class="classify-ws"
          @click="classify_status = false"
          @touchmove.stop.prevent
        />
        <view
          v-if="classify_status"
          class="classify-hide"
          :style="{
            top: classify_top + 'px',
            height: `calc(100% - ${classify_top}px)`,
          }"
          @click="classify_status = false"
          @touchmove.stop.prevent
        >
          <view class="classify-hide-list">
            <view
              v-for="(v, i) in classify"
              :key="i"
              :class="v.status ? 'classify-hide-item' : 'classify-hide-unitem'"
              @click="setClassifyList(v)"
            >
              {{ v.name }}
            </view>
          </view>
        </view>
      </view>
      <sorts :list="sortlist" :show="show" @click="setSort" />
    </view>
    <view
      v-for="(v, i) in list"
      :key="i"
      class="square-item"
      @click="setList(v)"
    >
      <image :src="v.coverPicture" class="square-item-image" />
      <view>
        <view class="square-item-name">{{ v.relatedName }}</view>
        <view class="df">
          <view
            v-if="v.activityPaymentPreferenceId === 4"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">人保信用卡用户专享</view>
          </view>
          <view
            v-else-if="v.activityPaymentPreferenceId === 5"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">农行信用卡用户专享</view>
          </view>
          <view
            v-else-if="v.activityPaymentPreferenceId === 6"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">工行信用卡用户专享</view>
          </view>
          <view
            v-else-if="v.activityPaymentPreferenceId === 7"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">邮储信用卡用户专享</view>
          </view>
          <view
            v-else-if="v.activityPaymentPreferenceId === 8"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">民生信用卡用户专享</view>
          </view>
          <view
            v-else-if="v.activityPaymentPreferenceId === 10"
            class="square-item-label mt8"
          >
            <view class="square-item-label-title">官方优惠专享</view>
          </view>
        </view>
        <view class="df jcsb w504h156">
          <view class="w419h156">
            <view v-if="v.marketPriceStr" class="df mt8">
              <view class="square-item-red"
                >¥{{ v.bankCardPriceStr || v.flashSalePriceStr }}</view
              >
              <view class="square-item-grey">¥{{ v.marketPriceStr }}</view>
            </view>
            <view v-else class="df mt8">
              <view v-if="v.type_txt" class="square-item-treetop">{{
                v.type_txt
              }}</view>
              <view class="square-item-red"
                >¥{{ v.bankCardPrice || v.flashSalePrice }}</view
              >
              <view class="square-item-grey">¥{{ v.marketPrice }}</view>
            </view>
            <view
              v-if="v.shopName"
              class="square-item-business"
              @click.stop="toShop(v)"
            >
              <image :src="v.baseHead" class="w38h38" />
              <view class="square-item-business-title">{{
                v.shopName.length > 8
                  ? v.shopName.substring(0, 8) + '...'
                  : v.shopName
              }}</view>
              <view v-if="v.shopId !== 1" class="square-item-business-black"
                >进店</view
              >
              <image
                v-if="v.shopId !== 1"
                src="@/static/image/vector.svg"
                class="w6h12"
              />
            </view>
            <view v-if="isshow" class="df aife">
              <view class="df aife">
                <view class="square-item-money">赚¥</view>
                <view class="square-item-money2">{{ v.commissionPrice }}</view>
                <view class="square-item-money">/笔</view>
              </view>
              <view class="square-item-commission">{{ v.rate }}%佣金率</view>
            </view>
          </view>
          <view v-if="isshow">
            <view
              v-if="v.isSelection"
              class="w77h81"
              @click.stop="setDelete(v)"
            >
              <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692437414837.png"
                class="w48h48"
              />
              <view class="square-item-delete">移出小店</view>
            </view>
            <view v-else class="w77h81" @click.stop="setAdd(v)">
              <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170202051.png"
                class="w48h48"
              />
              <view class="square-item-add">加入小店</view>
            </view>
          </view>
          <view v-else class="toshare" @click.stop="toCommerce(v)">
            去分享
          </view>
        </view>
      </view>
    </view>
    <view v-if="list.length === 0" class="square-empty">
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20230822/file_1692689603184.png"
        class="square-empty-image"
      />
      <view class="square-empty-title">暂无商品</view>
    </view>
    <!-- <view v-if="!show" class="square-more" @click="toXPGC">
      <view class="square-more-content">去选品赚佣金</view>
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170166388.png"
        class="w46h46"
      />
    </view> -->
    <u-toast ref="uSquareToast"></u-toast>
    <home-popup
      :show.sync="homeShow"
      :img="homeShowImg"
      @click="handleJump"
    ></home-popup>
  </view>
</template>

<script>
import homePopup from '@/components/homePopup/index.vue';
import sorts from '@/pages/wiseman/darenxiaodian/components/sorts.vue';
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue';
export default {
  components: {
    sorts,
    tabs,
    homePopup,
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    preview: {
      type: String,
      default() {
        return '0';
      },
    },
    isshow: {
      type: Boolean,
      default() {
        return true;
      },
    },
    show: {
      type: Boolean,
      default() {
        return false;
      },
    },
    minHeight: {
      type: String,
      default() {
        return '0';
      },
    },
    home: {
      type: Boolean,
      default() {
        return false;
      },
    },
    classify: {
      type: Array,
      default() {
        return [];
      },
    },
    tablist: {
      type: Array,
      default() {
        return [];
      },
    },
    grade: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    mh100() {
      return `mh${this.minHeight}`;
    },
  },
  data() {
    return {
      sortlist: [
        { id: 1, title: '销量', status: 0 },
        { id: 3, title: '价格', status: 0 },
        { id: 5, title: '佣金率', status: 0 },
      ],
      classify_status: false,
      classify_top: 0,
      homeShow: false,
      homeShowImg: '',
    };
  },
  watch: {
    classify: {
      handler(newval, oldval) {
        console.log(newval, oldval);
        this.$nextTick(() => {
          uni
            .createSelectorQuery()
            .in(this)
            .select('.classify')
            .boundingClientRect((v) => {
              console.log(v, 'classify');
              this.classify_top = v.top + v.height;
            })
            .exec();
        });
      },
    },
  },
  onLoad() {},
  created() {
    if (!this.isshow) {
      this.sortlist = [
        { id: 1, title: '销量', status: 0 },
        { id: 3, title: '价格', status: 0 },
      ];
    }
  },
  onShow() {},
  mounted() {},
  methods: {
    handleJump() {
      uni.navigateTo({
        url: '/pages/my/growthCenter/index',
      });
    },
    toCommerce(value) {
      uni.$emit('drxdrelease', {
        citeId: value.id,
        citename: value.relatedName,
        commissionPrice: 0,
      });
      uni.navigateBack();
    },
    isPreview() {
      if (this.preview === '1') {
        throw Error('');
      }
    },
    toXPGC() {
      this.isPreview();
      uni.navigateTo({
        url: '/pages/wiseman/xuanpinguangchang/index',
      });
    },
    setSort(value) {
      this.isPreview();
      let sort = 1;
      this.sortlist.forEach((v) => {
        if (JSON.stringify(value) === JSON.stringify(v)) {
          if (v.status > 1) {
            v.status = 1;
          } else {
            v.status += 1;
          }
          sort = v.status + v.id;
        }
      });
      this.$emit('setsort', sort);
    },
    async setAdd(value) {
      if (this.grade < 2) {
        console.log('1111111111111111111111');
        this.homeShow = true;
        this.homeShowImg =
          'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703637818337.png';
        return;
      }

      this.isPreview();
      const { code } = await this.$request.post(
        '/coc-active/api/v1/expert/shop/selection/add',
        {
          relatedId: value.relatedId,
          type: value.type,
        }
      );
      if (code === 200) {
        this.$refs.uSquareToast.show({
          message: '加入小店成功',
          type: 'success',
        });
        this.$emit('update');
        this.$emit('updateselect', value);
      }
    },
    async setDelete(value) {
      if (this.grade < 2) {
        console.log('1111111111111111111111');
        this.homeShow = true;
        this.homeShowImg =
          'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703637818337.png';
        return;
      }

      this.isPreview();
      const { code } = await this.$request.post(
        '/coc-active/api/v1/expert/shop/selection/remove',
        {
          relatedId: value.relatedId,
          type: value.type,
        }
      );
      if (code === 200) {
        this.$refs.uSquareToast.show({
          message: '移出小店成功',
          type: 'success',
        });
        this.$emit('update');
        this.$emit('updateselect', value);
      }
    },
    setList(value) {
      let iscommission = 1;
      if (!this.isshow) {
        iscommission = 0;
      }
      this.isPreview();
      if (value.type === 1) {
        uni.navigateTo({
          url:
            '/pages/home/activityDetail/index?id=' +
            value.relatedId +
            '&iscommission=' +
            iscommission,
        });
      } else if (value.type === 2) {
        uni.navigateTo({
          url:
            '/pages/carShops/upkeep/detail?id=' +
            value.relatedId +
            '&iscommission=' +
            iscommission,
        });
      } else if (value.type === 3) {
        uni.navigateTo({
          url: '/pages/roadhelp/index?iscommission=' + iscommission,
        });
      } else if (value.type === 4) {
        uni.navigateTo({
          url:
            '/pages/grouppurchase/detail?id=' +
            value.relatedId +
            '&iscommission=' +
            iscommission,
        });
      } else if (value.type === 5) {
        uni.navigateTo({
          url:
            '/pages/grouppurchase/packagedetail?id=' +
            value.relatedId +
            '&iscommission=' +
            iscommission,
        });
      } else if (value.type === 6) {
        uni.navigateTo({
          url:
            '/pages/carShops/carList/index?id=' +
            value.relatedId +
            '&type=1&shopId=' +
            value.shopId,
        });
      }
    },
    toShop(value) {
      this.isPreview();
      if (value.shopTypeId === 2) {
        uni.navigateTo({
          url:
            '/pages/carShops/4Sdetail/index?id=' +
            value.shopId +
            '&iscommission=1',
        });
      } else if (value.shopTypeId === 3) {
        uni.navigateTo({
          url:
            '/pages/activityMall/business/index?id=' +
            value.shopId +
            '&iscommission=1',
        });
      }
    },
    setClassifyList(value) {
      this.isPreview();
      this.classify_status = false;
      this.$emit('setclassify', value);
    },
  },
};
</script>

<style lang="scss" scoped>
.square {
  width: 704rpx;
  background: #ffffff;
  border-radius: 15rpx;

  &-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 704rpx;
    height: 46rpx;
    margin-top: 23rpx;
    margin-bottom: 23rpx;

    &-title {
      font-size: 31rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 31rpx;
    }

    &-right {
      display: flex;
      align-items: center;

      &-content {
        font-size: 27rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 31rpx;
      }
    }
  }

  &-item {
    width: 704rpx;
    // height: 267rpx;
    display: flex;
    margin-bottom: 16rpx;

    &-image {
      width: 154rpx;
      height: 154rpx;
      border-radius: 15rpx;
      margin: 15rpx;
    }

    &-name {
      width: 504rpx;
      font-size: 27rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 38rpx;
      margin-top: 15rpx;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
    }

    &-label {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 27rpx;
      border-radius: 8rpx;
      border: 1rpx solid #d91b1b;
      margin-right: 8rpx;

      &-title {
        font-size: 19rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #dd3232;
        line-height: 23rpx;
        margin-left: 4rpx;
        margin-right: 4rpx;
      }
    }

    &-treetop {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 31rpx;
      height: 31rpx;
      background: #ffeeee;
      border-radius: 16rpx;
      font-size: 19rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #dd3232;
      line-height: 23rpx;
    }

    &-red {
      font-size: 23rpx;
      font-family: OPPOSans-Heavy, OPPOSans;
      font-weight: 800;
      color: #d91b1b;
      line-height: 31rpx;
      margin-left: 8rpx;
    }

    &-grey {
      font-size: 23rpx;
      font-family: OPPOSans-Medium, OPPOSans;
      font-weight: 500;
      color: #999999;
      line-height: 31rpx;
      text-decoration: line-through;
      margin-left: 8rpx;
    }

    &-business {
      display: flex;
      align-items: center;
      height: 38rpx;
      background: #efefef;
      border-radius: 19rpx;
      margin-top: 15rpx;
      margin-bottom: 15rpx;

      &-title {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 38rpx;
        margin-left: 8rpx;
        margin-right: 15rpx;
      }

      &-black {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 38rpx;
        margin-right: 8rpx;
      }
    }

    &-money {
      font-size: 23rpx;
      font-family: OPPOSans-Medium, OPPOSans;
      font-weight: 500;
      color: #d91b1b;
      line-height: 32rpx;
    }

    &-money2 {
      font-size: 31rpx;
      font-family: OPPOSans-Medium, OPPOSans;
      font-weight: 500;
      color: #d91b1b;
      line-height: 40rpx;
    }

    &-commission {
      font-size: 23rpx;
      font-family: OPPOSans-Medium, OPPOSans;
      font-weight: 500;
      color: #999999;
      line-height: 33rpx;
      margin-left: 15rpx;
    }

    &-add {
      font-size: 19rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #d91b1b;
      line-height: 27rpx;
    }

    &-delete {
      font-size: 19rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 27rpx;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }

    &-interval {
      font-size: 24rpx;
      font-family: HONOR Sans CN;
      font-weight: 300;
      color: #222222;
    }
  }

  &-empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 704rpx;
    height: 288rpx;
    padding-top: 23rpx;
    padding-bottom: 339rpx;

    &-image {
      width: 408rpx;
      height: 256rpx;
    }

    &-title {
      font-size: 23rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 31rpx;
    }
  }

  &-more {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 704rpx;
    height: 92rpx;
    border-top: 1rpx solid rgba(153, 153, 153, 0.5);

    &-content {
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 31rpx;
    }
  }
}

.classify {
  position: relative;
  display: flex;
  align-items: center;
  width: 681rpx;
  height: 54rpx;
  margin-bottom: 23rpx;
  margin-left: 23rpx;

  &-list {
    white-space: nowrap;
    width: 627rpx;
  }

  &-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54rpx;
    background: #f6f6f6;
    border-radius: 8rpx;
    font-size: 27rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #d91b1b;
    margin-right: 15rpx;
    padding-left: 31rpx;
    padding-right: 31rpx;
  }

  &-unitem {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 54rpx;
    background: #f6f6f6;
    border-radius: 8rpx;
    font-size: 27rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    margin-right: 15rpx;
    padding-left: 31rpx;
    padding-right: 31rpx;
  }

  &-right {
    position: absolute;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54rpx;
    height: 54rpx;
    background: #ffffff;
  }

  &-ws {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 100;
  }

  &-hide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 100;

    &-list {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      background: #ffffff;
      padding: 20rpx;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54rpx;
      background: #f6f6f6;
      border-radius: 8rpx;
      font-size: 27rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #d91b1b;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      padding-left: 31rpx;
      padding-right: 31rpx;
    }

    &-unitem {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54rpx;
      background: #f6f6f6;
      border-radius: 8rpx;
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      padding-left: 31rpx;
      padding-right: 31rpx;
    }
  }
}

.mh150 {
  min-height: calc(100vh - 150rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 150rpx - env(safe-area-inset-bottom));
}

.mh244 {
  min-height: calc(100vh - 244rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 244rpx - env(safe-area-inset-bottom));
}

.mh358 {
  min-height: calc(100vh - 358rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 358rpx - env(safe-area-inset-bottom));
}

.mh442 {
  min-height: calc(100vh - 442rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 442rpx - env(safe-area-inset-bottom));
}

.mh544 {
  min-height: calc(100vh - 544rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 544rpx - env(safe-area-inset-bottom));
}

.mh628 {
  min-height: calc(100vh - 628rpx - constant(safe-area-inset-bottom));
  min-height: calc(100vh - 628rpx - env(safe-area-inset-bottom));
}

.df {
  display: flex;
}

.aic {
  align-items: center;
}

.aife {
  align-items: flex-end;
}

.jcsb {
  justify-content: space-between;
}

.aife {
  align-items: flex-end;
}

.h23 {
  height: 23rpx;
}

.w6h12 {
  width: 11rpx;
  height: 16rpx;
  margin-right: 15rpx;
}

.w38h38 {
  width: 38rpx;
  height: 38rpx;
  border-radius: 19rpx;
}

.w46h46 {
  width: 46rpx;
  height: 46rpx;
}

.w48h48 {
  width: 48rpx;
  height: 48rpx;
}

.w77h81 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 77rpx;
  height: 81rpx;
}

.w419h156 {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // width: 419rpx;
  height: 156rpx;
}

.w504h156 {
  width: 504rpx;
  height: 156rpx;
  align-items: flex-end;
  margin-top: 8rpx;
  margin-bottom: 15rpx;
}

.mt8 {
  margin-top: 8rpx;
}

.ml8 {
  margin-left: 8rpx;
}

.ml15 {
  margin-left: 15rpx;
}

.mr15 {
  margin-right: 15rpx;
}

.pt23 {
  padding-top: 23rpx;
}

.toshare {
  border-radius: 177rpx;
  border: 2rpx solid #d91b1b;
  text-align: center;
  line-height: 69rpx;
  height: 69rpx;
  padding: 0 38rpx;
  color: #d91b1b;
  font-weight: bold;
  margin-bottom: 60rpx;
}

.pr {
  position: relative;
}
</style>
