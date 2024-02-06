<template>
  <view>
    <view class="TopBox">
      <groupSearch :fromType="'拼团'" :isIcon="1" @search="search" @blur-search="handleBlurSearch" :isBgf="true">
      </groupSearch>
      <scroll-view scroll-x="true" style="position: absolute; bottom: 0">
        <view class="tabListTop">
          <view v-for="(item, index) in tabgroupList" :key="index" @click="handClickitem(index, item)" class="tabItem"
            :class="{ 'is-highlighted': currentIndex === index }">
            <view class="stage_name" :class="{ highlighted: currentIndex === index }">{{ item.signUpBeginTimeStr }}</view>
            <text class="fotname" style="font-size: 20rpx; font-family: PingFang-SC-Medium">{{ item.supplement }}</text>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="groups">
      <view class="sortList">
        <view>
          <text @click="distance">距离</text>
          <img class="sort_Img" v-if="distflag"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704763059821.png" alt="" />
          <img class="sort_Img" v-else src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704762974617.png"
            alt="" />
        </view>
        <view><text @click="Latest">最新</text>
          <img class="sort_Img" v-if="Lateflag"
            src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704763059821.png" alt="" />
          <img class="sort_Img" v-else src="https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704762974617.png"
            alt="" />
        </view>
      </view>
      <view class="GroupList" v-for="item in GroupsList" :key="item.id">
        <view class="Group_ads">
          <view class="Time_labels">
            <view class="labelText" v-if="goroupType == 2">
              {{ item.rushPurchaseEndTimeStr }}结束
            </view>
            <view class="labelText" v-if="goroupType == 3">
              {{ item.rushPurchaseEndTimeStr }}结束
            </view>
            <view class="labelText" v-if="goroupType == 1">
              {{ item.signUpBeginTimeStr }}开始
            </view>
          </view>
          <Bigvideo :item="item"></Bigvideo>
          <!-- <carousel   :list="item.adPushUrl" height="400rpx" urlkey="url" :dataType="1" :indicatorType="1"
						:clickType="2" :radius="5">
					</carousel> -->
        </view>
        <!-- 标题 -->
        <view class="ads_title" @click="handelDetail(item.id)">
          {{ item.title }}
        </view>
        <view class="priceshow" @click="handelDetail(item.id)">
          <view style="display: flex; align-items: center; margin-left: 20rpx">
            <view class="bargain" v-for="(v, index) in item.groupTeamSetMealPrice" :key="v.groupTeamProductId">
              <!-- 左侧数据 -->
              <view class="ladder" v-if="goroupType == 2 || goroupType == 1">
                <view class="numGroup">{{ v.groupTeamNum }}人成团:</view>
                <view class="prices" style="display: flex">
                  <view class="price_tags">￥</view>
                  <view class="price_number">{{ v.flashSalePrice }}</view>
                </view>
              </view>

              <!--取消最后一条分割线,并满足只有拼团未开始阶段展示  -->
              <view v-if="goroupType == 2 || goroupType == 1">
                <view v-if="index !== item.groupTeamSetMealPrice.length - 1" class="Dividing_line"></view>
              </view>
            </view>
          </view>
          <view class="ladders" v-if="goroupType == 3">
            <view class="prices1" style="display: flex">
              <view class="price_tags1">￥</view>
              <view class="price_number1">{{ item.teamworkPrice }}</view>
            </view>
            <view class="numGroup1" style="text-decoration: line-through">市场价:￥{{ item.marketPrice }}
            </view>
          </view>
          <!-- 未开始 -->
          <view class="buy" v-if="goroupType == 1" :style="{
            background: `url(https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705302787639.png)`,
            backgroundSize: 'cover',
          }">
            <view class="leftover">仅剩 <text>{{ item.stock - item.saleNum }}</text>份</view>
            <view class="Jump"></view>
          </view>
          <!-- 拼团中 -->
          <view class="buy" v-if="goroupType == 2" :style="{
            background: `url(https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704778228646.png)`,
            backgroundSize: 'cover',
          }">
            <view class="leftover">仅剩 <text>{{ item.stock - item.saleNum }}</text>份</view>
            <view class="Jump"></view>
          </view>
          <!-- 热抢中 -->
          <view class="buys" v-if="goroupType == 3" :style="{
            background: `url(https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704778269287.png)`,
            backgroundSize: 'cover',
          }">
            <view class="leftovers">仅剩 <text>{{ item.stock - item.saleNum }}</text>份</view>
            <view class="Jumps"></view>
          </view>
        </view>
      </view>
    </view>
    <view v-if="GroupsList.length == 0" class="tac mt50">
      <image style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
      </image>
      <view class="txtDarkGray">暂无拼团</view>
    </view>
    <u-loading-icon v-if="loadMore" mode="circle" size="20" duration="600"></u-loading-icon>
    <view class="reachBottom" v-if="GroupsList.length ==total && isReachBottom">我到底啦~</view>
    <view style="height: 50rpx"></view>
  </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue';
import BigDec from '@/components/samllTool/BigDec.vue';
import groupSearch from '@/components/search/groupSearch.vue';
import Bigvideo from './components/Bigvideo.vue';
export default {
  components: {
    groupSearch,
    carousel,
    Bigvideo,
    BigDec,
  },
  data() {
    return {
      keyword: '', //搜索字符
      loadMore: false, //loading
      isReachBottom: false,
      goroupType: 2, //动态判断类型
      swiperList: [],
      list: [],
      total: 0,
      carflag: true,
      distflag: false, //距离
      Lateflag: false, //最新
      //传参对象
      ListParams: {
        current: 1, //当前页
        signUpBeginDate: '', //拼团开始日期:格式：2021-01-06
        size: 10, //	页大小
        sort: 1, //排序：1-即将开始列表默认按照拼团开始时间从近到远的顺序排列;2-拼团中列表默认按照拼团结束时间从近到远的顺序排列;3-热抢中列表默认按照抢购结束时间从近到远的顺序排列；4-距离由近到远；5-时间最新发布进行排序

        teamType: 2, //	1-未开始拼团；2-拼团中；3-热抢中；
        title: '', //	拼团关键字
        //返回数据
      },
      isLoadMore: true,
      isReachBottom: false,
      currentIndex: 0,
      tabgroupList: [
        {
          signUpBeginTimeStr: '拼团中',
          teamType: 2,
          supplement: '限时特惠',
        },
        {
          signUpBeginTimeStr: '热抢中',
          teamType: 3,
          supplement: '全网低价',
        },
      ],
      //拼团列表数据
      GroupsList: [],
      interData: [],
      timeArr: [],
      sharedetail: {},
    };
  },
  methods: {
    // tab切换列表
    getDateList() {
      this.loadMore = true;
      this.$request
        .post('/coc-active/api/v1/groupTeam/getDateList')
        .then((res) => {
          this.timeArr = res.data;
          let timeData = res.data;
          // 拿到时间添加字段合并数组
          timeData = timeData.map((item) => ({
            ...item,
            teamType: 1, //判断列表类型
            supplement: '即将开始',
          }));
          this.tabgroupList = this.tabgroupList.concat(timeData);
        })
        .finally(() => {
          this.loadMore = false;
        });
    },
    handelDetail(id) {
      // 1-未开始拼团；2-拼团中；3-热抢中；
      if (this.goroupType == 1) {
        uni.navigateTo({
          url: '/pages/groupBooking/detail?id=' + id,
        });
      } else if (this.goroupType == 2) {
        uni.navigateTo({
          url: '/pages/groupBooking/detail?id=' + id,
        });
      } else if (this.goroupType == 3) {
        uni.navigateTo({
          url: '/pages/groupBooking/detail?id=' + id,
        });
      }
    },
    distance() {
      this.distflag = !this.distflag;
      if (this.distflag) {
        this.ListParams.sort = 4;
      } else {
        this.ListParams.sort = 6;
      }
      this.getGroupList();
    },
    Latest() {
      this.Lateflag = !this.Lateflag;
      if (this.Lateflag) {
        this.ListParams.sort = 5;
      } else {
        this.ListParams.sort = 7;
      }
      this.getGroupList();
    },
    async getGroupList() {
      await this.$request
        .post('/coc-active/api/v1/groupTeam/productList', this.ListParams)
        .then((res) => {

          if (res.data.records) {
            res.data.records.forEach((item) => {
              item.groupTeamSetMealPrice.sort(
                (a, b) =>
                  parseFloat(a.flashSalePrice) - parseFloat(b.flashSalePrice)
              );
              item.groupTeamSetMealPrice = item.groupTeamSetMealPrice.slice(
                0,
                3
              );
              // item.adPushUrl = [
              // 	{
              // 		url: item.adPushUrl,
              // 		type: "video",
              // 		poster: item.coverPicture ? item.coverPicture : item.adPushUrl + "?x-oss-process=video/snapshot,t_1000,m_fast",
              // 	}
              // ]
            });
          }
          if (res.data.records.length < this.ListParams.size) {
            this.isReachBottom = true;
          }
          const { records, current, total } = res.data;
          this.total = total;
          if (records.length < 10) {
            this.isLoadMore = false;
          } else {
            this.isReachBottom = true;
          }
          if (current == 1) {
          this.GroupsList = records;
        } else {
          this.GroupsList.push(...records);
        }
          // this.GroupsList = res.data.records;
          console.log(this.GroupsList);
        });
    },
    handClickitem(index, item) {
      this.ListParams.title = '';
      this.currentIndex = index; //高亮下标
      let { signUpBeginTime, teamType } = item; //列表类型，时间戳

      // 赋值给入参对象
      this.ListParams.signUpBeginDate = signUpBeginTime;
      this.ListParams.teamType = teamType;
      this.goroupType = teamType; //判断改页面样式的类型

      // 即将开始
      if (this.ListParams.teamType == 1) {
        this.ListParams.sort = 1;
      } else if (this.ListParams.teamType == 2) {
        // 拼团中
        this.ListParams.sort = 2;
      } else if (this.ListParams.teamType == 3) {
        // 热抢中
        this.ListParams.sort = 3;
      }
      // 调用获取拼团列表
      this.ListParams.current=1;
      this.isLoadMore =true;
      this.GroupsList = [];
      this.getGroupList();
    },
    // 搜索
    search(value) {
      this.ListParams.title = value;
      this.tosearch();
    },
    tosearch() {
      this.isReachBottom = false;
      this.ListParams.current = 1;
      this.GroupsList = [];
      this.getGroupList();
    },
    //失去焦点
    handleBlurSearch(value) {
      this.ListParams.title = value;
      this.tosearch();
    },
    getshareimg() {
      this.$newrequest
        .get('/coc-system/api/v1/system/dictionaries/pageLayout/details/41')
        .then((res) => {
          this.sharedetail = res.data;
        });
    },
  },
 
  onShareAppMessage(res) {
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: '/pages/groupBooking/groupList?enter=117',
      success(res) {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: '/pages/groupBooking/groupList?enter=117',
      success(res) {
        uni.showToast({
          title: '分享成功',
        });
      },
      fail(res) {
        uni.showToast({
          title: '分享失败',
          icon: 'none',
        });
      },
    };
  },
  async onLoad(option) {
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    this.getshareimg();
    await this.getDateList(); //tab列表
    //拼团数据列表
    await this.getGroupList();

    if (this.ListParams.teamType == 2 && this.GroupsList.length == 0) {
      this.ListParams.teamType = 3;
      this.currentIndex = 1; // 高亮下标
      await this.getGroupList();
      if (this.ListParams.teamType == 3 && this.GroupsList.length == 0) {
        this.ListParams.teamType = 1;
        this.currentIndex = 2; // 高亮下标
        if (!this.timeArr[0]) {
          this.ListParams.teamType = 2;
          this.currentIndex = 0;
          return;
        }
        this.ListParams.signUpBeginDate = this.timeArr[0].signUpBeginTime;
        this.goroupType = 1;
        await this.getGroupList();
        if (this.ListParams.teamType == 1 && this.GroupsList.length == 0) {
          this.ListParams.teamType = 2;
          this.currentIndex = 0;
        }
      }
    }
  },
  //页面滚动底部
  onReachBottom() {
     if (this.isLoadMore) {
      this.ListParams.current++;
      this.getGroupList();
    }
  
  },
  
};
</script>

<style lang="scss" scoped>
.TopBox {
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20240109/file_1704765846904.png');
  background-size: 100% 100%;
  position: relative;
  width: 750rpx;
  height: 358rpx;

  // tab切换
  .tabListTop {
    text-align: center;
    margin-left: 25rpx;
    overflow-x: auto; // 启用水平滚动
    white-space: nowrap; // 防止换行
    height: 85rpx;
    display: flex;

    .tabItem {
      flex-shrink: 0;
      box-sizing: border-box;
      padding-top: 6rpx;
      display: inline-block; // 以行内块的方式排列
      margin-right: 45rpx;
      color: #ffffff;
      width: 160rpx;
      height: 75rpx;
    }

    //高亮样式
    .is-highlighted {
      width: 160rpx;
      height: 75rpx;
      color: #ff2215;
      border-radius: 10rpx;
      background-color: #ffffff;
    }

    .highlighted {
      font-weight: bold;
    }
  }
}

//拼团文字
.stage_name {
  // margin-top: 7rpx;
  font-size: 28rpx;
  font-family: PingFang-SC-Bold;
}

.fotname {
  display: block;
  line-height: 20rpx;
  // margin-bottom: 16rpx;
}

//排序
.sortList {
  display: flex;
  font-family: PingFang-SC-Medium;
  align-items: center;
  font-size: 24rpx;
  color: #222222;
  justify-content: space-between;
  padding: 25rpx 190rpx;

  .sort_Img {
    width: 17rpx;
    height: 17rpx;
  }
}

.GroupList {
  border-radius: 10rpx;
  margin: 6rpx 25rpx;
  background-color: #fff;
  width: 710rpx;

  //广告内容
  .Group_ads {
    position: relative;
    // background: #6a6a6a;
    border: 4px solid #ffffff;
    border-radius: 10rpx;

    width: 700rpx;
    height: 400rpx;

    //时间标签
    .Time_labels {
      position: absolute;
      z-index: 666;
      left: 0;
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      line-height: 46rpx;

      height: 49rpx;
      background: #e43e3e;
      border-top-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;

      .labelText {
        text-align: center;
        // height: 23rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        padding: 0 10rpx;
        color: #ffffff;
        // line-height: 45rpx;
      }
    }
  }

  // 拼团标题
  .ads_title {
    width: 645rpx;
    height: 33rpx;
    margin-left: 26rpx;
    margin-top: 16rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    white-space: nowrap;
    /* 防止换行 */
    overflow: hidden;
    /* 隐藏溢出的文本 */
    text-overflow: ellipsis;
    /* 显示省略号 */
    line-height: 33rpx;
  }

  // 价格
  .priceshow {
    background-color: #fff;
    display: flex;
    margin-top: 10rpx;
    // padding: 15rpx;
    border-bottom-left-radius: 10rpx;
    /* 设置底部左侧的圆角 */
    border-bottom-right-radius: 10rpx;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20rpx;

    // 价格分类
    .bargain {
      margin-bottom: 13rpx;
      padding-bottom: 10rpx;
      display: flex;
      align-items: center;

      // 分割线样式
      .Dividing_line {
        height: 30rpx;
        margin: 0 10rpx;
        background-color: #999999;
        border: 1rpx solid #999999;
      }

      .ladder {
        // width: 80rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        // 成团
        .numGroup {
          height: 20rpx;
          // margin-left: 10rpx;
          font-size: 20rpx;
          font-family: PingFang SC;
          color: #999999;
          line-height: 36rpx;
          margin-bottom: 15rpx;
        }

        .prices {
          // 价钱标识
          margin-left: -5rpx;

          .price_tags {
            height: 16rpx;
            font-size: 20rpx;
            margin-right: 5rpx;
            font-family: HONOR Sans CN;
            font-weight: 500;
            color: #d91b1b;
            line-height: 47rpx;
          }

          //价格
          .price_number {
            height: 28rpx;
            font-size: 36rpx;
            font-family: HONOR Sans CN;
            font-weight: 600;
            color: #d91b1b;
            line-height: 36rpx;
          }
        }
      }
    }
  }

  .ladders {
    margin-left: -280rpx;
    display: flex;
    margin-top: -7rpx;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-bottom: 10rpx;

    // 成团
    .numGroup1 {
      height: 20rpx;
      margin-left: 4rpx;
      font-size: 20rpx;
      font-family: PingFang SC;
      color: #999999;
      line-height: 36rpx;
      margin-bottom: 15rpx;
    }

    .prices1 {
      // 价钱标识
      width: 110rpx;
      margin-left: -3rpx;

      .price_tags1 {
        height: 16rpx;
        font-size: 20rpx;

        font-family: HONOR Sans CN;
        font-weight: 500;
        color: #d91b1b;
        line-height: 47rpx;
      }

      //价格
      .price_number1 {
        margin-left: 2rpx;
        height: 28rpx;
        font-size: 36rpx;
        font-family: HONOR Sans CN;
        font-weight: 600;
        color: #d91b1b;
        line-height: 36rpx;
      }
    }
  }

  // 右侧按钮
  .buy {
    width: 285rpx;
    background-size: 100% 100%;
    height: 53rpx;
    border-radius: 10rpx;
    display: flex;
    margin-right: 15rpx;
    line-height: 53rpx;
    justify-content: space-between;

    .leftover {
      color: #d91b1b;
      margin-left: 13rpx;

      text {
        font-weight: bold;
      }
    }

    .Jump {
      width: 100rpx;
      height: 53rpx;
    }
  }
}

.buys {
  margin-top: -15rpx;
  width: 285rpx;
  margin-right: 15rpx;
  background-size: 100% 100%;
  height: 53rpx;
  border-radius: 10rpx;
  display: flex;
  line-height: 53rpx;
  justify-content: space-between;

  .leftovers {
    color: #d91b1b;
    margin-left: 12rpx;

    text {
      font-weight: bold;
    }
  }

  .Jumps {
    width: 100rpx;
    height: 53rpx;
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
</style>