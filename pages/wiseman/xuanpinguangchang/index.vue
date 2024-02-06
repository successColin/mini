<template>
  <view class="page">
    <view class="top">
      <view class="myShop flex jsb alc mb20">
        <view class="flex">
          <!-- <u-image width="115rpx" height="115rpx" :src="src" shape="circle"></u-image> -->
          <image
            class="head_pic"
            :src="
              detail.headImg
                ? detail.headImg
                : 'https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693016884192.jpg'
            "
          >
          </image>
          <view class="ml20 shopPerson">
            <view class="size28 fwb oneLine">{{ detail.shopName }}</view>
            <view class="txtLighGray oneLine briefIntroduction">{{
              detail.intro ? detail.intro : '该店主尚未添加简介'
            }}</view>
          </view>
        </view>
        <view @click="goShop" class="tac colorff bgRed smallBtn size24 br10"
          >进店</view
        >
      </view>
      <view class="flex jsb alc">
        <view class="top-search mr10">
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png"
            class="top-search-image"
          />
          <input
            v-model="obj.keyword"
            placeholder="搜索商品名称/商家名称"
            placeholder-style="color:#999999;font-size:27rpx;"
            class="top-search-input"
            @blur="setBlur"
          />
        </view>
        <button
          type="default"
          class="kefu-contact"
          open-type="contact"
          session-from=""
        >
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20230821/file_1692578313770.png"
            class="top-image"
          />
        </button>
      </view>

      <!-- <view class="top-list">
                <view v-for="(v, i) in projectlist" :key="i" class="top-list-item" @click="setProjectList(v)">
                    <image :src="v.image" class="top-list-item-image" />
                    <view class="top-list-item-title">{{ v.title }}</view>
                </view>
            </view> -->
    </view>
    <view class="carousel">
      <carousel
        ref="carousel"
        :topStyle="{ width: '704rpx', 'margin-top': '15rpx' }"
        :radius="7"
        height="256rpx"
        urlkey="url"
        :dataType="2"
        systemCode="applets_selection_library_top"
        :indicatorType="1"
        @input="setCarousel"
      />
    </view>
    <view class="notice">
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692427518291.png"
        class="notice-image"
      />
      <view style="width: 100%; margin-left: 8rpx" class="flex alc">
        <u-notice-bar
          color="#222222"
          fontSize="27rpx"
          direction="column"
          :text="noticelist.length ? noticelist : ['暂无']"
          bgColor="#ffffff"
          :icon="none"
        />
      </view>
    </view>
    <view>
      <image
        src="https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702470939152.jpg"
        class="joinShop"
        @click="joinShop"
      ></image>
    </view>
    <!-- <tabs :list="tablist" :scroll="false" @click="setTabList" /> -->
    <square
      :list="rows.list"
      :classify="classifylist"
      :tablist="tablist"
      :show="show"
      :min-height="mh"
      :grade="grade"
      @updateselect="setSelect"
      @setsort="setSort"
      @setclassify="setClassify"
      @settab="setTabList"
    />
    <view class="safe-bottom-height" />
    <u-popup
      :show="showRenovation"
      mode="center"
      @close="showRenovation = false"
      round="10"
    >
      <view class="content">
        <view>您还未装修自己的小店主页，请先前往装修</view>
        <view class="confrimBtn bgRed colorff" @click="renovationGo"
          >去装修</view
        >
      </view>
    </u-popup>
  </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue';
import square from '@/pages/wiseman/darenxiaodian/components/square.vue';
import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue';
export default {
  components: {
    carousel,
    tabs,
    square,
  },
  data() {
    return {
      detail: {
        intro: '该店主尚未添加简介',
      },
      noticelist: [],
      tablist: [
        { id: '', name: '全部', status: true },
        { id: 1, name: '福利团购', status: false },
        { id: 2, name: '户外畅游', status: false },
        { id: 3, name: '户内嗨乐', status: false },
        { id: 4, name: '寻味住店', status: false },
        { id: 5, name: '4S店活动', status: false },
        { id: 6, name: '保养套餐', status: false },
      ],
      show: true,
      isTrim: null,
      showRenovation: false,
      obj: {
        keyword: '',
        lockTypeV3: '',
        sort: 1,
        current: 1,
        size: 50,
      },
      rows: {
        list: [],
        total: 0,
      },
      mh: '',
      src: '',
      classifylist: [],
      grade: 0,
    };
  },
  onLoad(option) {
    if (option.grade) {
      this.grade = option.grade;
    }
  },
  onShow() {
    this.queryHome();
  },
  created() {
    this.getNoticeList();
    // this.getTabList()
    this.getGoodList();
  },
  onReachBottom() {
    this.onScrollToLower();
  },
  methods: {
    queryHome() {
      if (!this.isshowpage) {
        this.$showLoading();
      }
      this.$newrequest
        .post('/coc-active/api/v1/newExpert/shop', {})
        .then((res) => {
          if (res.code === 200) {
            this.detail = res.data;
            this.isTrim = res.data.isTrim;

            let isShowRenovation = uni.getStorageSync('isShowRenovation');
            if (res.data.isTrim == 0) {
              //没有装修的情况下  第一次进来   如果是 true 代表弹出过  就不显示弹窗
              if (isShowRenovation) {
                this.showRenovation = false;
              } else {
                this.showRenovation = true;
              }
              uni.setStorageSync('isShowRenovation', true);
            } else {
              this.showRenovation = false;
              uni.setStorageSync('isShowRenovation', true);
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        })
        .finally((res) => {
          if (!this.isshowpage) {
            this.isshowpage = true;
            this.$hideLoading();
          }
        });
    },
    async getNoticeList() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/newExpert/untruthBroadcastMessageList',
        { displayLocation: 1 }
      );
      const list = [];
      data.forEach((v) => {
        list.push(v.content);
      });
      this.noticelist = list;
    },
    async getTabList() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/expert/selection/library/shopCategoryList',
        { showType: 1 }
      );
      const list = JSON.parse(JSON.stringify(this.tablist));
      data.forEach((v) => {
        list.push({
          id: list.length + 1,
          sid: v.shopCategoryId,
          name: v.shopCategoryName,
          status: false,
        });
      });
      this.tablist = list;
    },
    async getGoodList() {
      this.obj.isCommissionPrice = 1;
      const { data } = await this.$request.post(
        '/coc-active/api/v1/expert/selection/library/newList',
        this.obj
      );
      const list = JSON.parse(JSON.stringify(this.rows.list));
      data.records.forEach((v) => {
        v.type_txt =
          v.type === 1
            ? '活'
            : v.type === 2
            ? '保'
            : v.type === 4
            ? '团'
            : v.type === 5
            ? '套'
            : '';
        list.push(v);
      });
      this.rows.list = list;
      this.rows.total = data.total;
    },
    // async get4STabsList() {
    //     const { data } = await this.$request.post("/coc-active/api/v1/four_s/fourSBrandByType", { type: 1 })
    //     const list = [{ id: 0, name: '推荐', status: true }]
    //     data.forEach((v) => {
    //         list.push({ id: v.brandId, label: 'brandId', name: v.brandName, status: false })
    //     })
    //     this.classifylist = list;
    // },
    // async getTabsList(type) {
    //     const { data } = await this.$request.post("/coc-active/api/v1/expert/selection/library/shopCategoryList", {
    //         showType: type,
    //     });
    //     const list = [{ id: 0, name: '推荐', status: true }]
    //     data.forEach((v) => {
    //         list.push({ id: v.shopCategoryId, label: 'shopCategorySecondId', name: v.shopCategoryName, status: false });
    //     });
    //     this.classifylist = list;
    // },
    setTabList(value) {
      this.tablist.forEach((v) => {
        if (JSON.stringify(value) === JSON.stringify(v)) {
          v.status = true;
        } else {
          v.status = false;
        }
      });
      // if (value.sid) {
      //     this.setShopCategoryTab(value.sid)
      // } else {
      //     this.setTab(value.id)
      // }
      this.setTab(value.id);
    },
    setTab(id) {
      delete this.obj.shopCategorySecondId;
      // this.setObj('lockType', id)
      this.setObj('lockTypeV3', id);
      // if (id === '') {
      //     this.classifylist = []
      // } else if (id === 1) {
      //     this.getTabsList(5)
      // } else if (id === 2) {
      //     this.getTabsList(4)
      // } else if (id === 3) {
      //     this.get4STabsList()
      // }
    },
    setShopCategoryTab(id) {
      delete this.obj.lockType;
      // this.setObj('shopCategoryId', id)
      this.setObj('shopCategorySecondId', id);
    },
    setSort(id) {
      this.setObj('sort', id);
    },
    setBlur() {
      this.obj.lockTypeV3 = 0;
      this.tablist.forEach((v) => {
        if (this.obj.lockTypeV3 === v.id) {
          v.status = true;
        } else {
          v.status = false;
        }
      });
      this.setObj();
    },
    setObj(key, value) {
      if (key) {
        this.obj[key] = value;
      }
      // if (this.obj.keyword.length > 0) {
      // this.obj.lockType = this.obj.lockType === 0 ? '' : this.obj.lockType
      // } else {
      // this.obj.lockType = this.obj.lockType === '' ? 0 : this.obj.lockType
      // }
      this.obj.current = 1;
      this.rows = {
        list: [],
        total: 0,
      };
      this.getGoodList();
    },
    setSelect(value) {
      this.rows.list.forEach((v) => {
        if (JSON.stringify(v) === JSON.stringify(value)) {
          v.isSelection = v.isSelection === 0 ? 1 : 0;
        }
      });
    },
    onScrollToLower() {
      if (this.rows.total > this.obj.current * this.obj.size) {
        this.obj.current += 1;
        this.getGoodList();
      }
    },
    setCarousel(data) {
      if (data.length === 0) {
        this.mh = '358';
      } else {
        this.mh = '628';
      }
    },
    setClassify(value) {
      // this.classifylist.forEach((v) => {
      //     if (JSON.stringify(value) === JSON.stringify(v)) {
      //         v.status = true
      //     } else {
      //         v.status = false
      //     }
      // })
      // delete this.obj.brandId
      // delete this.obj.shopCategorySecondId
      this.obj[value.label] = value.id;
      this.rows.list = [];
      this.getGoodList();
    },
    renovationGo() {
      if (!this.detail.backImage) {
        this.detail.backImage =
          'https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169916276.png';
      }
      if (!this.detail.posterShareUrl) {
        this.detail.posterShareUrl =
          'https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693451973736.jpg';
      }
      console.log(this.detail);
      uni.navigateTo({
        url:
          '/pages/wiseman/darenxiaodian/renovation?info=' +
          JSON.stringify(this.detail),
      });
    },
    goShop() {
      uni.navigateTo({
        url: '/pages/wiseman/darenxiaodian/index',
      });
    },
    joinShop() {
      uni.navigateTo({
        url: '/pages/roadhelp/index?iscommission=1',
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #efefef;
}
.head_pic {
  width: 115rpx;
  height: 115rpx;
  border-radius: 50%;
}
.top {
  width: 100%;
  background: #fff;
  padding: 25rpx;
  box-sizing: border-box;

  &-search {
    display: flex;
    align-items: center;
    width: 615rpx;
    height: 62rpx;
    border-radius: 31rpx;
    border: 1rpx solid #999999;

    &-image {
      width: 48rpx;
      height: 48rpx;
      margin-left: 15rpx;
    }

    &-input {
      width: 615rpx;
      font-size: 27rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 62rpx;
      margin-left: 8rpx;
    }
  }

  &-broadcast {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 704rpx;
    height: 87rpx;
    background: #ffffff;
    border-radius: 15rpx;
    border: 2rpx solid #efefef;
    margin-top: 15rpx;

    &-image {
      width: 48rpx;
      height: 49rpx;
      margin-left: 15rpx;
    }

    &-head {
      width: 62rpx;
      height: 62rpx;
      border-radius: 31rpx;
      border: 4rpx solid #ffffff;

      &-image {
        width: 62rpx;
        height: 62rpx;
        border-radius: 31rpx;
      }
    }

    &-content {
      margin-left: 15rpx;

      &-title {
        font-size: 27rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 38rpx;
      }

      &-title2 {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 33rpx;
      }
    }

    &-money {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin-right: 15rpx;

      &-title {
        font-size: 19rpx;
        font-family: OPPOSans-Regular, OPPOSans;
        font-weight: 400;
        color: #d91b1b;
        line-height: 25rpx;
      }
    }
  }

  &-list {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 704rpx;
    height: 140rpx;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;

      &-image {
        width: 64rpx;
        height: 64rpx;
      }

      &-title {
        font-size: 23rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 33rpx;
        margin-top: 16rpx;
      }
    }
  }
}

.notice {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 704rpx;
  height: 77rpx;
  background: #ffffff;
  border-radius: 15rpx;
  border: 2rpx solid #efefef;
  margin-top: 15rpx;
  margin-bottom: 15rpx;

  &-image {
    width: 48rpx;
    height: 49rpx;
    margin-left: 15rpx;
  }
}

.safe-bottom-height {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.df {
  display: flex;
}

.aic {
  align-items: center;
}

.ml-20 {
  margin-left: -20rpx;
}

.mh925 {
  min-height: 925rpx;
}

::v-deep .tabs {
  margin-bottom: 23rpx;
}

::v-deep .tabs-item {
  margin-right: 0rpx !important;
}

.content {
  font-size: 30rpx;
  padding: 60rpx 40rpx;

  .confrimBtn {
    font-size: 30rpx;
    height: 90rpx;
    line-height: 90rpx;
    text-align: center;
    border-radius: 100rpx;
    display: block;
    margin: 50rpx auto 0;
    width: 300rpx;
  }
}

.briefIntroduction {
  margin-top: 10rpx;
}
.smallBtn {
  width: 82rpx;
  height: 40rpx;
  line-height: 40rpx;
  text-align: center;
}
.shopPerson {
  width: 400rpx;
  padding: 16rpx 0;
  box-sizing: border-box;
  height: 114rpx;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 24rpx;
}
.kefu-contact {
  background: none;
  border: 0;
  padding: 0;
  outline: none;
  width: 40rpx;
  height: 40rpx;
  display: inline-flex;

  image {
    width: 40rpx;
    height: 40rpx;
  }
}
button::after {
  border: initial;
}
.joinShop {
  width: 700rpx;
  height: 115rpx;
  margin-bottom: 16rpx;
  display: block;
  border-radius: 15rpx;
}
</style>