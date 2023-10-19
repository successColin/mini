<template>
  <view id="page" class="page">
    <view class="content">
      <view class="u-flex-al jsb" style="margin-top:25rpx;">
        <view class="u-flex">
          <view style="width: 630rpx;">
            <u-search placeholder="搜索车型" :clearabled="true" v-model="oldSearchTxt" :showAction="false"
              @search='search'></u-search>
          </view>
          <view style="position: relative;margin-left: 12rpx;height: 37rpx;">
            <image src="@/static/image/kefu.svg" style="width: 37rpx;height: 37rpx;"></image>
            <button open-type='contact' session-from='' class="kefu-contact"></button>
          </view>
        </view>
      </view>
      <view class="select" :class="{ 'sticky-box': !isSticky }" style="padding-bottom: 33rpx;">
        <view class="flex alc jsb" style="width:100%">
          <view class="u-flex-al ml10" @click="openSearch(2)">
            <view class="text" v-if="tabindex == 1">{{ carPriceName!=''?carPriceName:'车价区间' }}</view>
            <view class="text" v-if="tabindex == 2">{{ carPriceName!=''?carPriceName:'首付区间' }}</view>
            <view style="margin-left: 11rpx;">
              <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
            </view>
          </view>
          <view class="u-flex-al ml10" @click="openSearch(3)">
            <view class="text"> 
              {{ brandName!=''  ? brandName : '品牌筛选' }}
            </view>
            <view style="margin-left: 11rpx;">
              <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
            </view>
          </view>
          <view class="u-flex-al ml10" @click="openSearch(4)">
            <view class="text">
              {{ energyTypeName!=''  ? energyTypeName : '能源类型' }}
            </view>
            <view style="margin-left: 11rpx;">
              <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
            </view>
          </view>
        </view>
      </view>

      <!-- 列表组件 -->
      <carlist :objData="searchField" :changeList="changeList" :isBottom="isBottom"></carlist>
    </view>
    <u-popup :show="searchVisble" @close="closeSearch" :safeAreaInsetBottom="false" :safeAreaInsetTop="false" mode="top">
      <view class="top-search">
        <view class="select" style="margin-top: 0;">
          <view class="u-flex-al jsb" style="width:100%;">
            <view class="u-flex-al ml10" @click="openSearch(2)">
              <view class="text" v-if="tabindex == 1" :class="{ 'text-bold': searchType === 2 }">车价区间</view>
              <view class="text" v-if="tabindex == 2" :class="{ 'text-bold': searchType === 2 }">首付区间</view>
              <view class="ml10">
                <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
              </view>
            </view>
            <view class="u-flex-al ml10" @click="openSearch(3)">
              <view class="text " :class="{ 'text-bold': searchType === 3 }">品牌筛选
                <!-- {{ brandName!='' ? brandName : '品牌筛选' }} -->
              </view>
              <view class="ml10">
                <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
              </view>
            </view>
            <view class="u-flex-al ml10" @click="openSearch(4)">
              <view class="text" :class="{ 'text-bold': searchType === 4 }">能源类型
                <!-- {{ energyTypeName!=''  ? energyTypeName : '能源类型' }} -->
              </view>
              <view class="ml10">
                <u-icon name="arrow-down-fill" color="#222222" size="16rpx"></u-icon>
              </view>
            </view>
          </view>
        </view>
        <view :class="{ 'top-search-btn-view': searchType !== 1, '.top-search-btn-other-view': searchType === 1 }">
          <template v-if="searchType === 2">
            <view :key="-1" class="top-search-btn" @click="searchItem({ price: '', name: '全部' })"
              :style="{ color: searchField.price == '' ? '#D91B1B' : '#222222', background: searchField.price == '' ? '#FFF1F1' : '#F8F8F8' }">
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view v-if="tabindex == 1">
              <view v-for="(item, index) in carPriceList" class="top-search-btn" @click="searchItem(item)" :key="index"
                :style="{ color: searchField.price == item.price ? '#D91B1B' : '#222222', background: searchField.price == item.price ? '#FFF1F1' : '#F8F8F8' }">
                <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
              </view>
            </view>
            <view v-else>
              <view v-for="(item, index) in selfList" class="top-search-btn" @click="searchItem(item)" :key="index"
                :style="{ color: searchField.price == item.price ? '#D91B1B' : '#222222', background: searchField.price == item.price ? '#FFF1F1' : '#F8F8F8' }">
                <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
              </view>
            </view>
          </template>
          <template v-if="searchType === 3">
            <view :key="-1" class="top-search-btn" @click="searchItem({ brand_id: '', brand_name: '全部' })"
              :style="{ color: searchField.brand_id == '' ? '#D91B1B' : '#222222', background: searchField.brand_id == '' ? '#FFF1F1' : '#F8F8F8' }">
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view v-for="(item, index) in brandList" class="top-search-btn" @click="searchItem(item)" :key="index"
              :style="{ color: searchField.brand_id == item.brand_id ? '#D91B1B' : '#222222', background: searchField.brand_id == item.brand_id ? '#FFF1F1' : '#F8F8F8' }">
              <text class="top-search-btn-text ellipsis">{{ item.brand_name }}</text>
            </view>
          </template>
          <template v-if="searchType === 4">
            <view :key="-1" class="top-search-btn" @click="searchItem({ value: '', name: '全部' })"
              :style="{ color: searchField.car_type == '' ? '#D91B1B' : '#222222', background: searchField.energyTypeId == '' ? '#FFF1F1' : '#F8F8F8' }">
              <text class="top-search-btn-text ellipsis">全部</text>
            </view>
            <view v-for="(item, index) in energyTypeList" class="top-search-btn" @click="searchItem(item)" :key="index"
              :style="{ color: searchField.car_type == item.value ? '#D91B1B' : '#222222', background: searchField.car_type == item.value ? '#FFF1F1' : '#F8F8F8' }">
              <text class="top-search-btn-text ellipsis">{{ item.name }}</text>
            </view>
          </template>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import carousel from "@/components/carousel/index.vue"
import carlist from "@/components/carlist/carlist.vue"
export default {
  components: { carousel, carlist },
  data() {
    return {
      searchVisble: false, //筛选弹框
      searchType: 1,
      oldSearchTxt: '',
      tabindex: '',
      searchField: {
        api_name: 'list',
        page: 1,
        page_size: 10,
        price: '', //车价
        brand_id: '', //品牌
        car_type: '', //能源类型
        vehicle_title: '', //搜索车型名称
        tab_type: '2',
        vehicle_title: '',
        list_type: '',
      },
      changeList: true,
      isBottom: false,
      carPriceName: '',
      brandName: '',
      energyTypeName: '',
      carPriceList: [
        {
          name: '10万以下',
          price: '0-10'
        }, {
          name: '10-15万',
          price: '10-15'
        }, {
          name: '15-20万',
          price: '15-20'
        }, {
          name: '20-30万',
          price: '20-30'
        }, {
          name: '30-40万',
          price: '30-40'
        }, {
          name: '40-50万',
          price: '40-50'
        }, {
          name: '50万以上',
          price: '50-9999'
        }],//价格区间
      selfList: [
        {
          name: "1万以内",
          price: "0-1",
        },
        {
          name: "1-2万",
          price: "1-2",
        },
        {
          name: "2-3万",
          price: "2-3",
        },
        {
          name: "3-4万",
          price: "3-4",
        },
        {
          name: "4-5万",
          price: "4-5",
        },
        {
          name: "5万以上",
          price: "5-9999",
        },],//首付区间
      energyTypeList: [
        {
          name: "燃油",
          value: "1",
        },
        {
          name: "新能源车",
          value: "3",
        },
        {
          name: "混合动力",
          value: "4",
        },

      ],//能源车型
      brandList: [],
      scrollTop: 0,
      pageHeight: 0, //内容可见高度
      pageTotalHeight: 0 //内容总高度
    }
  },
  onLoad(options) {
    let { type, searchId, searchName, tabindex ,searchValue} = options
    this.tabindex = tabindex
    this.searchField.list_type = tabindex
    this.oldSearchTxt = searchValue
    this.searchField.vehicle_title = searchValue
    if (type && searchId) {
      searchId = parseInt(searchId)
      if (type == 3) {
        this.searchField.brand_id = searchId
        this.brandName = searchName
      } else if (type == 4) {
        this.searchField.car_type = searchId
        this.energyTypeName = searchName
      }
    }
    uni.getSystemInfo({
      success: res => {
        this.pageHeight = res.windowHeight;
      }
    });
    this.getBrandList()
  },
 
  onReachBottom() {
    this.searchField.page++
    this.changeList = false
    this.isBottom = true
  },
  computed: {
    isSticky() {
      return this.scrollTop < this.stickyTop
    },
  },
  methods: {
    //品牌列表
    getBrandList() {
      this.$request51car.post("app/wechat/api",{api_name: 'brand_list',list_type: this.tabindex})
        .then(res => {
          if (res.code == 1) {
            this.brandList = res.data
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000
            })
          }
        })
    },
    //打开筛选框
    openSearch(type) { //type 2:车价 3:品牌 4:能源类型
      this.searchType = type
      this.searchVisble = true
      if (this.isSticky && this.pageTotalHeight >= this.stickyTop + this.pageHeight) {
        uni.pageScrollTo({
          scrollTop: this.stickyTop,
          duration: 0,
        })
      }
    },
    //关闭筛选框
    closeSearch() {
      this.searchType = 1
      this.searchVisble = false
    },
    //选中搜索项
    searchItem(item) {
      if (this.searchType == 2) { //区间
        this.searchField.price = item.price
        this.carPriceName = item.name 
      } else if (this.searchType == 3) { //品牌
        this.searchField.brand_id = item.brand_id
        this.brandName = item.brand_name 
      } else if (this.searchType == 4) { //能源类型
        this.searchField.car_type = item.value
        this.energyTypeName = item.name 
      }
      this.searchField.page = 1
      this.changeList = true
      this.isBottom = false
	  this.searchVisble=false
    },
    
    //搜索
    search() {
      this.searchField.vehicle_title = this.oldSearchTxt
      this.searchField.page = 1
      this.changeList = true
      this.isBottom = false
    },
  }
}
</script>

<style lang="scss" scoped>
.page {
  color: #222222;
}

.content {
  padding: 0 25rpx;
}

.search {
  width: 630rpx;
  height: 80rpx;
  box-shadow: 0rpx 3rpx 5rpx 3rpx rgba(51, 51, 51, 0.06);
  border-radius: 40rpx;
  background: #FFFFFF;
  position: relative;

  .input {
    width: 520rpx;
    height: 80rpx;
    font-size: 28rpx;
    margin-left: 28rpx;
    font-family: PingFang SC;
    color: #999999;
  }

  .btn {
    height: 80rpx;
    position: absolute;
    bottom: 0;
    right: 31rpx;
  }
}

.select {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 31rpx;

  .text {
    font-size: 28rpx;
    font-family: PingFang SC;
    // font-weight: 500;
  }

  .text-bold {
    font-weight: bold !important;
  }
}


.top-search {
  padding: 30rpx 25rpx 40rpx;
  box-sizing: border-box;

  .top-search-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #222222;
    display: inline-block;
  }

  .top-search-btn-view {
    margin-top: 43rpx;
    width: 100%;
    display: table;
  }

  .top-search-btn {
    width: 160rpx;
    height: 60rpx;
    border-radius: 10rpx;
    float: left;
    margin-right: 15rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24rpx;
  }

  .top-search-otherbtn {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    margin-top: 35rpx;
  }

  .top-search-btn-text {
    font-size: 24rpx;
    font-weight: 500;
  }

  .top-search-confirm {
    width: 150rpx;
    height: 60rpx;
    background: #D91B1B;
    border-radius: 30rpx;
    margin-top: 26rpx;
    margin-bottom: 50rpx;
    margin-left: 250rpx;
  }

  .top-search-confirm-text {
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
  }
}

.reachBottom {
  text-align: center;
  font-size: 24rox;
  color: #999999;
  padding: 20rpx;
  font-size: 24rpx;
  color: #999999;
}

.kefu-contact {
  position: absolute;
  width: 55rpx;
  height: 55rpx;
  top: 0;
  opacity: 0;
}

.u-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.u-flex-al {
  display: flex;
  align-items: center;
}

.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sticky-box {
  position: sticky;
  top: var(--window-top);
  z-index: 99;
  flex-direction: row;
  margin: 0px;
  background: #F8F8F8;
}
</style>
