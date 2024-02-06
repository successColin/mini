<template>
  <view class="tabs">
    <custom-head
      class="page__head"
      :current="status ? 0 : 1"
      :list="twolist"
      @giveClickTabs="OnClickTags"
    />
    <view :style="[isNoShow ? { height: statusBarHeight } : '']"></view>
    <!-- <view
      v-if="!status && list.length > 0 && !isNoShow"
      class="tabs-bottom"
      :style="{ marginTop: statusBarHeight }"
    >
      <scroll-view v-if="search" class="tabs-bottom-list" scroll-x="true">
        <view class="flex">
          <view
            v-for="(v, i) in list"
            :key="i"
            :class="v.status ? 'tabs-bottom-item' : 'tabs-bottom-unitem'"
            @click="setTabList(v)"
          >
            {{ v[id] }}
          </view>
        </view>
      </scroll-view>
      <view v-else class="tabs-bottom-list flex alc">
        <input
          v-model="search_value"
          placeholder="搜索感兴趣的精彩内容"
          class="tabs-bottom-input"
          @blur="setSearch(false)"
        />
      </view>
      <view class="tabs-bottom-btn" @click="setBtn">
        <image
          v-if="search"
          src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698477292746.png"
          class="tabs-bottom-search"
        />
        <image
          v-else
          src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698477360910.png"
          class="tabs-bottom-goback"
        />
      </view>
    </view> -->

    <my-search
      v-if="!status && list.length > 0 && !isNoShow"
      :current.sync="tabCurrent"
      class="tabs-bottom"
      :style="{ marginTop: statusBarHeight }"
      style="width: 100%"
      :keyword.sync="search_value"
      :list="list"
      @giveSearch="setSearch"
      @giveTabsFun="setTabList"
      @giveClose="setSearch"
      @giveToggle="setBtn"
    ></my-search>

    <!-- 底部 -->
    <view class="tabs-add">
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698410123485.png"
        @click="add()"
      />
    </view>
  </view>
</template>

<script>
import MySearch from '@/components/TypeTabs/index.vue';
import customHead from '@/components/customHead/index.vue';
import { statusBarHeight } from '@/config/index';

export default {
  components: {
    customHead,
    MySearch,
  },
  props: {
    twolist: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: 'label',
    },
    list: {
      type: Array,
      default: () => [],
    },
    isNoShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      status: false,
      search: true,
      search_value: '',
      tabCurrent: 0,
    };
  },
  computed: {
    statusBarHeight() {
      return `calc(45px + ${statusBarHeight})`;
    },
  },
  watch: {
    tabCurrent(v) {
      uni.$emit('tabsChange', v);
    },
  },
  methods: {
    OnClickTags(value) {
      this.getStatus(value.id === 0);
    },
    getStatus(value) {
      this.status = value;
      this.search = true;
      this.search_value = '';
      this.$emit('setstatus', value);
    },
    setTabList(value) {
      this.$emit('settabs', value);
    },
    setSearch(item) {
      this.$emit('setsearch', item);
    },
    add() {
      uni.redirectTo({
        url: '/pages/wiseman/component/addimgarticle?newType=2&isShowUploadImg=false',
      });
    },
    setBtn() {
      this.search = !this.search;
      if (this.search) {
        this.setSearch();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  position: relative;
  width: 750rpx;
  background: #ffffff;
  border-radius: 0rpx 0rpx 20rpx 20rpx;

  &-list {
    display: flex;
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 375rpx;
    height: 90rpx;

    &-title {
      font-size: 32rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }

    &-image {
      width: 24rpx;
      height: 6rpx;
      margin-top: 10rpx;
    }

    &-untitle {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
    }

    &-left {
      display: flex;
      justify-content: flex-end;
      width: 285rpx;
      margin-right: 90rpx;
    }

    &-right {
      display: flex;
      margin-left: 90rpx;
    }

    &-view {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }

  &-bottom {
    position: relative;
    display: flex;
    // width: 730rpx;
    // height: 66rpx;
    border-top: 1rpx solid #f8f8f8;
    margin-left: 10rpx;

    &-list {
      width: 652rpx;
      white-space: nowrap;
      margin-left: 16rpx;
      margin-right: 62rpx;
    }

    &-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 66rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }

    &-unitem {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 66rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }

    &-btn {
      position: absolute;
      height: 66rpx;
      width: 80rpx;
      right: 0rpx;
    }

    &-search {
      position: absolute;
      top: 19rpx;
      right: 20rpx;
      width: 30rpx;
      height: 31rpx;
    }

    &-input {
      width: 657rpx;
      height: 50rpx;
      background: #f8f8f8;
      border-radius: 25rpx;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      padding-left: 20rpx;
    }

    &-goback {
      position: absolute;
      top: 17rpx;
      right: 22rpx;
      width: 26rpx;
      height: 29rpx;
    }
  }

  &-add {
    display: flex;
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 200;
    height: 116rpx;
    width: 100%;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231120/file_1700450258398.png');
    background-size: 100% 100%;

    image {
      height: 88rpx;
      width: 88rpx;
      margin: 0 auto;
      margin-top: 10rpx;
    }
  }
}

::v-deep {
  .page__head {
    .u-tabs__wrapper__nav__line {
      width: 28rpx !important;
      height: 6rpx !important;
      bottom: 10rpx !important;
    }

    .u-tabs__wrapper__nav > .u-tabs__wrapper__nav__item {
      padding: 0 20px;
    }
  }
}
</style>