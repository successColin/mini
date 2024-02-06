<template>
  <view class="merchantPunch">
    <view class="merchantPunch__top">
      <tabs :list="tablist" :scroll="false" @click="setTabList" :type="1" />
      <my-search
        :keyword.sync="obj.name"
        :list="smallTabList"
        :placeholder="placeholder"
        :current.sync="currentTab"
        @giveSearch="tosearch"
        @giveTabsFun="handleTabs"
        @giveClose="clear"
        @giveToggle="handleToggle"
      ></my-search>
    </view>
    <view class="merchantPunch__content">
      <merchant-punchList
        :showloading="showloading"
        :newLockType="newLockType"
        :list="rows.list"
        @giveItem="getItem"
      />
    </view>
    <view class="safe-bottom-height" />
    <u-loading-page
      loading-mode="spinner"
      :loading="showloading"
      bgColor="rgba(0,0,0,0)"
      color="rgba(34,34,34,0.2)"
      loadingColor="rgba(34,34,34,0.2)"
    ></u-loading-page>
  </view>
</template>

<script>
import MySearch from '@/components/TypeTabs/index.vue';
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue';
import merchantPunchList from './merchantPunchList.vue';
export default {
  components: {
    tabs,
    MySearch,
    merchantPunchList,
  },
  data() {
    return {
      currentTab: 0,
      placeholder: '搜索精选团购',
      showloading: true,
      newLockType: 1, // 大类型
      shopType: undefined,
      tablist: [
        { id: 1, name: '精选团购', shopType: 2, status: true },
        { id: 2, name: '热门玩乐', shopType: 1, status: false },
        { id: 3, name: '4S店', status: false },
      ],
      obj: {
        // 精品团购和热门玩乐
        current: 1,
        name: '',
        size: 20,
        shopCategoryId: '', // 小类的id
        sort: 2, // 商家排序 1 默认排序2 距离最近 3 评分
        // ----------------------
      },
      rows: {
        list: [],
        total: 0,
      },
      smallTabList: [],
    };
  },
  onLoad() {},
  onShow() {},
  mounted() {
    const id = this.tablist[0].id;
    this.shopType = this.tablist[0].shopType;
    this.setTab(id);
  },
  onReachBottom() {
    this.onScrollToLower();
  },
  methods: {
    // 重置
    resetFun() {
      this.obj.current = 1;
      this.obj.shopCategoryId = '';
      this.rows.list = [];
      this.rows.total = 0;

      this.getGoodList();
    },
    // tabs搜索框清楚
    clear() {
      this.obj.name = '';
      this.resetFun();
    },
    // tabs 来回切换类型
    handleToggle(state) {
      this.handleTabs({}, state);
    },
    // tabs切换点击搜索
    tosearch(value) {
      this.obj.name = value;
      this.resetFun();
    },
    // tabs切换类型
    handleTabs(item, state = true) {
      console.log(item);
      uni.pageScrollTo({
        scrollTop: 1, //距离页面顶部的距离
        duration: 0,
      });
      this.obj.shopCategoryId = '';
      if (item.id) {
        this.obj.shopCategoryId = item.id;
      }

      if (state) {
        this.obj.current = 1;
        this.rows.list = [];
        this.rows.total = 0;
        this.obj.name = '';
        this.getGoodList();
      }
    },

    // 分页下拉
    onScrollToLower() {
      console.log(11111);
      if (this.rows.total > this.obj.current * this.obj.size) {
        this.obj.current += 1;
        this.getGoodList();
      }
    },
    // 点击三大类型
    setTabList(value) {
      const { id, shopType } = value;
      this.tablist.forEach((v) => {
        if (JSON.stringify(value) === JSON.stringify(v)) {
          v.status = true;
        } else {
          v.status = false;
        }
      });
      if (id == 3) {
        this.placeholder = `搜索品牌4S店`;
      } else {
        this.placeholder = `搜索商家名称`;
      }

      this.shopType = shopType;
      this.currentTab = 0;

      this.setTab(id);
    },
    // 小类型值，加调用下方内容接口
    async setTab(id) {
      this.showloading = true;
      // 精选团购
      let url = '/coc-active/api/v1/activityShop/getNewShopCategoryList';
      let obj = {
        type: 3,
        shopType: this.shopType,
      };
      // 活动商家
      if (id === 2) {
        obj.shopType = this.shopType;
      } else if (id === 3) {
        // 4s店
        url = '/coc-active/api/v1/four_s/fourSBrand';
        obj = {};
      }
      let { data } = await this.$request.post(url, obj);

      if (id === 1 || id === 2) {
        data.unshift({ id: '', name: '推荐' });
      } else if (id === 3) {
        data = data.map((item) => {
          return {
            name: item.brandName,
            id: item.brandId,
          };
        });
        data.unshift({ id: '', name: '全部' });
      }
      // 小类型数据
      this.smallTabList = data;

      // 记住大类型
      this.newLockType = id;

      this.rows = {
        list: [],
        total: 0,
      };
      this.obj = {
        current: 1,
        name: '',
        shopCategoryId: '', // 小类的id
        size: 20,
        sort: 2, // 商家排序 1 默认排序2 距离最近 3 评分
        shopType: this.shopType,
      };

      console.log(obj);

      this.showloading = false;

      this.getGoodList();
    },
    // 获取页面的数据
    async getGoodList() {
      this.showloading = true;

      let params = {};
      let url = '/coc-active/api/v2/homePage/getActivityShopNew';
      if (this.newLockType === 1 || this.newLockType === 2) {
        params = this.obj;
      } else if (this.newLockType === 3) {
        url = '/coc-active/api/v2/homePage/four_s/nearbyShopS';
        params = {
          brandId: this.obj.shopCategoryId,
        };
      }
      const { data } = await this.$request.post(url, params);
      const list = JSON.parse(JSON.stringify(this.rows.list));
      if (this.newLockType === 1 || this.newLockType === 2) {
        data.records.forEach((v) => {
          if (v.baoType === 1) {
            v.btnIndex = 1;
          } else if (v.tuanType == 1) {
            v.btnIndex = 2;
          } else if (v.quanType == 1) {
            v.btnIndex = 3;
          } else if (v.merchantType == 1) {
            v.btnIndex = 4;
          } else {
            v.btnIndex = 5;
          }

          list.push({
            ...v,
          });
        });
        this.rows.list = list;
        this.rows.total = data.total;
      } else if (this.newLockType === 3) {
        this.rows.list = data;
        this.rows.total = list.length;
      }

      console.log(this.obj, this.rows);
      this.showloading = false;
    },
    getItem(name, id) {
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2]; //上一个页面
      prevPage.$vm.otherFun(name, id); //重点$vm
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
.merchantPunch {
  background: #f8f8f8;
  width: 100%;
  &__top {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #fff;
    z-index: 99;
  }
  &__content {
    margin: 154rpx 10rpx 10rpx;
  }
  ::v-deep {
    .tabs {
      padding: 0 40px;
      background: #fff;
      width: auto;
    }
  }
}
.safe-bottom-height {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: content-box;
}
</style>