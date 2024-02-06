<template>
  <view class="page">
    <view class="top-tab">
      <u-tabs
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          fontSize: '32rpx',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{ fontSize: '28rpx' }"
        itemStyle="height:88rpx;"
        lineHeight="3"
        lineWidth="24"
        :lineColor="`url(${lineBg}) 100% 100%`"
        keyName="name"
        :list="tags"
        @click="OnClickTags"
      >
      </u-tabs>
    </view>
    <template v-if="dataList.length > 0">
      <view v-for="item in dataList" :key="item.id">
        <view class="card">
          <view class="u-flex">
            <view v-if="type == 1">
              <image
                style="width: 256rpx; height: 146rpx; border-radius: 10rpx"
                :src="item.coverPicture"
              >
              </image>
            </view>
            <view v-else-if="type == 4">
              <image
                style="width: 146rpx; height: 146rpx; border-radius: 10rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230627/file_1687847018088.png"
              >
              </image>
            </view>
            <view v-else>
              <image
                style="width: 146rpx; height: 146rpx; border-radius: 10rpx"
                :src="item.coverPicture"
              >
              </image>
            </view>
            <view style="position: relative; margin-left: 17rpx">
              <template v-if="type != 7">
                <view class="size28 fwb moreLine">
                  {{ item.title }}
                </view>
                <view style="position: absolute; bottom: 0rpx; width: 400rpx">
                  <text class="size24 txtLighGray">消费金额</text
                  ><text class="mainRed size28">￥</text
                  ><text class="mainRed fwb" style="font-size: 40rpx">{{
                    item.orderMoney
                  }}</text>
                </view>
              </template>
              <template v-if="type == 7">
                <view
                  class="flex alc"
                  style="
                    height: 100%;
                    font-size: 36rpx;
                    color: #222222;
                    font-weight: bold;
                  "
                >
                  {{ item.title }}
                </view>
              </template>
            </view>
          </view>
          <view class="hr"></view>
          <view class="u-flex jsb alc">
            <view class="u-flex alc">
              <view>
                <view class="status-item" v-if="item.status == 1">
                  待分佣
                </view>
                <view class="status-item" v-else-if="item.status == 2">
                  已分佣
                </view>
                <view class="status-item" v-else-if="item.status == 3">
                  已退款
                </view>
              </view>
              <view class="size24 txtLighGray ml20" v-if="item.leave == 1">
                分享佣金
              </view>
              <view class="size24 txtLighGray ml20" v-else-if="item.leave == 2">
                邀请佣金
              </view>
              <view class="mainRed size28 ml0"> ￥ </view>
              <view style="font-size: 40rpx" class="mainRed fwb">
                {{
                  item.leave == 1
                    ? item.oneLevelCommission
                    : item.twoLevelCommission
                }}
              </view>
            </view>
            <view class="u-flex">
              <view class="txtLighGray size24">订单来源：{{ item.name }}</view>
              <view class="ml10">
                <u-avatar size="16" :src="item.headImg"></u-avatar>
              </view>
            </view>
          </view>
          <view class="txtLighGray size24" style="margin-top: 25rpx">
            订单时间：{{ item.createdAt }}
          </view>
        </view>
      </view>
    </template>
    <view v-else class="tac mt50">
      <image
        style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
      >
      </image>
      <view class="txtDarkGray">暂无订单</view>
    </view>
    <view style="height: 50rpx"></view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isLoadMore: false,
      dataList: [],
      type: 9,
      shopCategoryId: '',
      shopTypeId: '',
      current: 1,
      tags: [
        {
          name: '福利拼团',
          i: 9,
        },
        {
          name: '达人活动',
          i: 9,
        },
        {
          name: '户外畅游',
          i: 1,
          shopCategoryId: 18,
        },
        {
          name: '户内嗨乐',
          i: 1,
          shopCategoryId: 17,
        },
        {
          name: '寻味住店',
          i: 10025,
        },
        {
          name: '4S店活动',
          i: 1,
          shopTypeId: 2,
        },
        {
          name: '保养套餐',
          i: 3,
        },
        {
          name: '救援年卡',
          i: 4,
        },
        {
          name: '信用卡',
          i: 7,
        },
        {
          name: '福利团购',
          i: 2,
        },
        // {
        //   name: '产品订单',
        //   index: 5,
        // },
        // {
        //   name: '活动订单',
        //   index: 1,
        // },
        // {
        //   name: '团购订单',
        //   index: 2,
        // },
        // {
        //   name: '保养订单',
        //   index: 3,
        // },
        // {
        //   name: '救援年卡',
        //   index: 4,
        // },
        // {
        //   name: '信用卡',
        //   index: 7,
        // },
      ],
      lineBg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
    };
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.current++;
      this.getList();
    }
  },
  onLoad() {
    this.getList();
  },
  onShow() {},
  methods: {
    getList() {
      let url = '/coc-active/api/v1/activity/order/revenueOrderList';

      if (this.type === 10025) {
        url = '/coc-active/api/v1/activity/order/revenueHotelsOrderList';
      }

      this.$request
        .post(url, {
          current: this.current,
          size: 20,
          type: this.type,
          shopCategoryId: this.shopCategoryId,
          shopTypeId: this.shopTypeId,
        })
        .then((res) => {
          if (this.type === 10025) {
            this.dataList = res.data || [];
            return;
          }

          if (res.data.records.length < 20) {
            this.isLoadMore = true;
          }
          if (this.current == 1) {
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    OnClickTags(e, item) {
      this.current = 1;
      this.isLoadMore = false;

      console.log(e, item);
      this.type = '';
      this.shopCategoryId = '';
      this.shopTypeId = '';

      this.type = e.i;
      this.shopCategoryId = e.shopCategoryId || '';
      this.shopTypeId = e.shopTypeId || '';

      // this.type
      // if (e.name == '团购订单') {
      //   this.type = 2;
      // } else if (e.name == '保养订单') {
      //   this.type = 3;
      // } else if (e.name == '活动订单') {
      //   this.type = 1;
      // } else if (e.name == '救援年卡') {
      //   this.type = 4;
      // } else if (e.name == '产品订单') {
      //   this.type = 5;
      // } else if (e.name == '信用卡') {
      //   this.type = 7;
      // }
      this.dataList = [];
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
}

.top-tab {
  background-color: #ffffff;
  // padding-bottom: 30rpx;
  width: 100%;
}

.card {
  margin: 25rpx;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 12rpx 25rpx 20rpx 12rpx;
}

.hr {
  margin: 10rpx 0;
  width: 100%;
  height: 1rpx;
  background: #f8f8f8;
}

.status-item {
  width: 72rpx;
  height: 32rpx;
  border: 1px solid #d91b1b;
  border-radius: 10rpx;
  text-align: center;
  line-height: 32rpx;
  font-size: 20rpx;
  color: #d91b1b;
}

::v-deep .u-tabs__wrapper__nav__item {
  padding: 0 10px !important;
}
</style>
