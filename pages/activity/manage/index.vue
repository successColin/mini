<template>
  <view class="page">
    <u-sticky offset-top="0">
      <fixed-input
        :barArr="barArr"
        :value.sync="searchField.keyword"
        :labour="true"
        placeholder="搜索商品名称/商家名称"
        @blur="handleBlur"
      ></fixed-input>
      <view class="tabs">
        <view class="tabs-list">
          <view class="tabs-item" v-for="(item, i) in bigType" :key="i">
            <view class="tabs-item-left">
              <view class="tabs-item-view" @click="getStatus(item, i)">
                <view
                  :class="
                    bigIndex === i ? 'tabs-item-title' : 'tabs-item-untitle'
                  "
                  >{{ item.name }}</view
                >
                <image
                  v-show="bigIndex === i"
                  src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698392764793.png"
                  class="tabs-item-image"
                />
              </view>
            </view>
          </view>
        </view>
        <view>
          <view class="line"></view>
        </view>
        <view class="tabsClass">
          <view class="tabsClass__line">
            <view class="tabsClass__line--tab">
              <u-tabs
                :activeStyle="{
                  fontWeight: 'bold',
                  color: '#222222',
                }"
                :inactiveStyle="{
                  fontSize: '28rpx',
                  fontFamily: 'PingFang SC',
                  fontWeight: 500,
                  color: '#999999',
                }"
                :lineWidth="0"
                :list="categoryList"
                keyName="shopCategoryName"
                :current="tabsCurrent"
                @click="setTabList"
              >
              </u-tabs>
            </view>
            <image
              @click="searchShow = true"
              src="https://oss.dcqcjlb.com/51che_java_dev/20231029/file_1698565896277.png"
              style="width: 40rpx; height: 40rpx"
            ></image>

            <view v-if="searchShow" class="category_div">
              <view style="margin-right: 31rpx; width: 100%; text-align: right">
                <image
                  style="width: 40rpx; height: 40rpx; padding: 10rpx 30rpx 0 0"
                  @click="searchShow = false"
                  src="https://oss.dcqcjlb.com/51che_java_dev/20231029/file_1698572185337.png"
                >
                </image>
              </view>
              <view class="category_list">
                <view
                  v-for="(item, index) in categoryList"
                  :key="index"
                  class="item"
                  @click="setTabList(item, index)"
                  :class="{
                    item_sel:
                      item.shopCategoryId === searchField.shopCategoryId,
                  }"
                  :style="{
                    'margin-right': (index + 1) % 4 === 0 ? '0rpx' : '10rpx',
                  }"
                  >{{ item.shopCategoryName }}</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-sticky>
    <view v-if="searchShow" class="mask" @click="searchShow = false"></view>

    <view>
      <view v-for="item in dataList" :key="item.id" class="card-list">
        <!-- <shop-menu :item="item" v-if="bigIndex === 0"></shop-menu> -->
        <shop-menu
          v-if="bigIndex === 0"
          :item="item"
          :flashSale="false"
          :cooperation="true"
        ></shop-menu>
        <car-shop
          v-else
          :item="item"
          :isShop="true"
          :isConsult="false"
          class="merchants__carShop"
        ></car-shop>
      </view>
      <view class="reachBottom" v-show="isReachBottom && dataList.length !== 0"
        >我到底了~</view
      >
      <view class="tac mt50" v-if="dataList.length === 0">
        <image
          style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
        >
        </image>
        <view class="txtDarkGray">暂无数据</view>
      </view>
      <view style="height: 50rpx"></view>
    </view>
  </view>
</template>

<script>
import BigDec from '@/components/samllTool/BigDec.vue';
import ShopMenu from '@/components/samllTool/ShopMenu.vue';

import fixedInput from '@/components/search/fixedInput.vue';
export default {
  components: {
    fixedInput,
    BigDec,
    ShopMenu,
  },
  onReachBottom() {
    this.getmore();
  },
  data() {
    return {
      barArr: ['51车·人车生活俱乐部', '搜索商品名称/商家名称'],
      bigType: [
        // {
        //   name: '全城优选',
        //   id: 100,
        // },
        {
          name: '优质商户',
          id: 19,
        },
        {
          name: '合作4S店',
          id: 16,
        },
      ],
      bigIndex: 0,
      categoryList: [],
      dataList: [],
      searchField: {
        current: 1,
        keyword: '',
        parentId: 100, // 19
        shopCategoryId: '',
        size: 10,
      },
      total: 0,
      tabsCurrent: 0,

      isReachBottom: false,

      isLoadMore: true,
      searchShow: false,
    };
  },
  mounted() {
    // 大分类下的子分类
    this.getCategoryList();
  },
  methods: {
    // 点击最大的
    getStatus(item, i) {
      this.bigIndex = i;
      this.searchField.parentId = item.id;

      this.dataList = [];
      this.searchField.current = 1;
      this.getCategoryList();
    },
    //获取分类
    getCategoryList() {
      this.categoryList = [
        {
          shopCategoryId: '',
          shopCategoryName: '推荐',
        },
      ];
      const params = {
        parentId: this.searchField.parentId,
      };
      if (this.searchField.parentId == 100) {
        params.type = 2;
      }
      this.$newrequest
        .post('/coc-active/api/v2/homePage/shopCategoryList', params)
        .then(async (res) => {
          if (res.code == 200) {
            this.categoryList.push(...res.data);
            this.OnPushSearch();
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    // 获取列表
    getList() {
      this.searchShow = false;
      let url = '/coc-active/api/v2/homePage/shopList';
      if (this.bigIndex === 0) {
        url = '/coc-active/api/v1/group/list/v3';
      }
      this.$newrequest.post(url, this.searchField).then((res) => {
        const { records, current, total } = res.data;
        this.total = total;
        if (records.length < 10) {
          this.isLoadMore = false;
        } else {
          this.isReachBottom = true;
        }
        if (current == 1) {
          this.dataList = records;
        } else {
          this.dataList.push(...records);
        }
      });
    },
    // 获取更多
    getmore() {
      if (this.isLoadMore) {
        this.searchField.current++;
        this.getList();
      }
    },
    // 重置
    OnPushSearch(state = true) {
      this.isLoadMore = true;
      this.dataList = [];
      this.searchField.current = 1;
      if (state) {
        this.searchField.shopCategoryId = '';
        this.tabsCurrent = 0;
      }
      this.getList();
    },
    // 搜索框失去焦点
    handleBlur() {
      this.OnPushSearch();
    },
    // 点击切换
    setTabList(v, i) {
      console.log(v, i);
      if (i) {
        this.tabsCurrent = i;
      } else {
        this.tabsCurrent = v.index;
      }
      this.searchField.shopCategoryId = v.shopCategoryId;
      this.OnPushSearch(false);
    },
  },
};
</script>

<style lang="scss" scoped>
.reachBottom {
  font-size: 12px;
  color: #999999;
  text-align: center;
  margin-top: 40px;
}
.page {
  color: #222222;
}

.line {
  height: 1rpx;
  background: #f8f8f8;
  width: 730rpx;
}

.tabsClass {
  &__line {
    display: flex;
    align-items: center;
    position: relative;
    &--tab {
      width: calc(100% - 66rpx);
    }
  }
}

.tabs {
  position: relative;
  width: 750rpx;
  background: #ffffff;
  // box-shadow: 0px 4px 5px 0px rgb(242, 242, 242);

  &-list {
    display: flex;
    padding-bottom: 14rpx;
    padding-top: 10rpx;
  }

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;

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
      justify-content: center;
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
    width: 730rpx;
    height: 46rpx;
    border-top: 1rpx solid #f8f8f8;
    margin-left: 10rpx;

    &-list {
      width: 652rpx;
      white-space: nowrap;
      margin-left: 16rpx;
    }

    &-item {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 46rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      margin-left: 20rpx;
      margin-right: 20rpx;
    }

    &-unitem {
      display: flex;
      align-items: flex-end;
      justify-content: center;
      height: 46rpx;
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-left: 20rpx;
      margin-right: 20rpx;
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
    position: fixed;
    right: 10rpx;
    bottom: 400rpx;
    width: 88rpx;
    height: 88rpx;
    z-index: 200;
  }
}

.category_div {
  position: absolute;
  top: 0;
  background: #ffffff;
  width: 750rpx;

  .category_list {
    padding: 10rpx 20rpx 0rpx 20rpx;
    flex-wrap: wrap;
    display: flex;

    .item {
      width: 170rpx;
      height: 62rpx;
      line-height: 62rpx;
      text-align: center;
      background: #f8f8f8;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #222222;
      margin-bottom: 20rpx;
    }

    .item_sel {
      color: #d91b1b;
      background: #fff1f1;
    }
  }
}

.card-list {
  background: #ffffff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 10rpx 10rpx 0 10rpx;
}

.title {
  width: 550rpx;
}

.tag-item {
  border-radius: 16rpx;
  background-color: #fceded;
  font-size: 20rpx;
  color: #d91b1b;
  padding: 6rpx 15rpx;
  text-align: center;
  margin-left: 8rpx;
}

.bao-item {
  color: #d91b1b;
  border-radius: 10rpx;
  font-size: 24rpx;
  width: 61rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  background: rgba(217, 27, 27, 0.1);
}

.tuan-item {
  color: #d91b1b;
  border-radius: 10rpx;
  font-size: 24rpx;
  width: 61rpx;
  height: 36rpx;
  line-height: 36rpx;
  text-align: center;
  background: rgba(217, 27, 27, 0.1);
}

.quan-item {
  padding: 6rpx 15rpx;
  border-radius: 10rpx;
  size: 24rpx;
  font-weight: bold;
  line-height: 32rpx;
  background-color: #fceded;
  color: #d91b1b;
  border-radius: 16rpx;
}

.mask {
  background: black;
  opacity: 0.2;
  position: absolute;
  width: 100%;
  min-height: 100vh;
  z-index: 1;
}
</style>
