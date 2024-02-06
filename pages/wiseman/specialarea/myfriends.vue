<template>
  <view class="page">
    <view class="firend_tab">
      <view class="tab_div flex jsb">
        <view
          class="tab_item"
          :class="{
            tab_item_sel: currentIndex === 1,
            tab_item_nosel: currentIndex === 2,
          }"
          @click="OnClickType(1)"
          >关注</view
        >
        <view
          class="tab_item"
          :class="{
            tab_item_sel: currentIndex === 2,
            tab_item_nosel: currentIndex === 1,
          }"
          @click="OnClickType(2)"
          >粉丝</view
        >
      </view>
      <view
        class="tab_line"
        :class="{
          tab_tran1: currentIndex === 1,
          tab_tran2: currentIndex === 2,
        }"
      ></view>
    </view>
    <view v-if="dataList.length > 0" class="firend_list">
      <view v-for="item in dataList" :key="item.userId" class="list_item">
        <view class="flex alc jsb" @click="handleJump(item)">
          <view class="flex alc">
            <image class="list_item_img" :src="item.headImg"></image>
            <view class="list_item_info">
              <view class="info_title oneLine">{{ item.nickname }}</view>
              <view class="info_content oneLine"></view>
            </view>
          </view>
          <view
            v-if="item.status == 1"
            class="list_item_btn btn2"
            @click.stop="follow(item)"
          >
            <text>取消关注</text>
          </view>
          <view
            v-if="currentIndex === 2 && item.status == 0"
            class="list_item_btn btn1"
            @click.stop="follow(item)"
          >
            <text>回关</text>
          </view>
        </view>
        <view>
          <view class="item_line"></view>
        </view>
      </view>
    </view>
    <view v-else class="tac mt50">
      <image
        style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
      >
      </image>
      <view class="txtDarkGray"
        >暂无{{ currentIndex == 1 ? '关注' : '粉丝' }}</view
      >
    </view>
    <view style="height: 50rpx"></view>
  </view>
</template>

<script>
export default {
  onLoad(options) {
    this.currentIndex = options.type ? parseInt(options.type) : 1;
    this.queryList();
  },
  data() {
    return {
      typeList: [
        {
          name: '关注',
        },
        {
          name: '粉丝',
        },
      ],
      dataList: [],
      currentIndex: 1,
    };
  },
  methods: {
    handleJump(item) {
      console.log(1111);
      const { userId, userStatus, isExpert, expertStatus } = item;
      if (userStatus === 2) {
        return uni.$u.toast('该用户被冻结');
      } else if (userStatus == 3) {
        return uni.$u.toast('该用户已注销');
      } else if (isExpert === 1) {
        if (expertStatus === 1) {
          uni.$u.toast('该用户被封禁');
        } else {
          // 达人转跳
          uni.navigateTo({
            url: '/pages/wiseman/component/shopinfo?type=1&userId=' + userId,
          });
        }
      } else if (isExpert === 0) {
        // 不是达人的转跳
        uni.navigateTo({
          url: '/pages/wiseman/component/shopinfo?type=2&userId=' + userId,
        });
      }
    },
    OnClickType(type) {
      this.currentIndex = type;
      this.queryList();
    },
    queryList() {
      this.dataList = [];
      this.$request
        .post('/coc-social/api/v2/article/friendList', {
          type: this.currentIndex,
        })
        .then((res) => {
          if (res.code === 200) {
            this.dataList = res.data;
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    follow(item) {
      this.$request
        .post('/coc-social/api/v2/article/followExpert', {
          userId: item.userId,
        })
        .then((res) => {
          if (res.code === 200) {
            uni.showToast({
              title: '操作成功',
              icon: 'none',
            });
            this.queryList();
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #ffffff;
  min-height: 100vh;
}

.firend_tab {
  padding: 10rpx 131rpx 0 131rpx;

  .tab_item {
    width: 62rpx;
    text-align: center;
  }

  .tab_item_sel {
    font-size: 31rpx;
    font-weight: 500;
    color: #222222;
    // height: 92rpx;
  }

  .tab_item_nosel {
    font-size: 27rpx;
    font-weight: 400;
    color: #666666;
    // height: 92rpx;
  }

  .tab_line {
    width: 46rpx;
    height: 8rpx;
    background: #d91b1b;
    border-radius: 100rpx;
    margin-left: 8rpx;
    margin-top: 12rpx;
  }

  .tab_tran1 {
    transform: translate(0, 0);
    transition: 0.5s;
  }

  .tab_tran2 {
    transform: translate(430rpx, 0);
    transition: 0.5s;
  }
}

.firend_list {
  margin-top: 39rpx;
  padding: 0 24rpx;

  .list_item {
    padding: 24rpx 0;
    margin-bottom: 10rpx;

    .list_item_img {
      width: 85rpx;
      height: 85rpx;
      border-radius: 117rpx;
    }

    .list_item_info {
      margin-left: 16rpx;

      .info_title {
        font-size: 27rpx;
        font-weight: 500;
        color: #222222;
        max-width: 400rpx;
      }

      .info_content {
        font-size: 27rpx;
        font-weight: 400;
        color: #666666;
        margin-top: 8rpx;
        height: 38rpx;
        max-width: 400rpx;
      }
    }

    .list_item_btn {
      width: 131rpx;
      border-radius: 110rpx;
      font-size: 23rpx;
      font-weight: 400;
      padding: 12rpx 0;
      text-align: center;
    }

    .btn1 {
      border: 1rpx solid #d91b1b;
      color: #d91b1b;
      width: 129rpx;
    }

    .btn2 {
      background: #efefef;
      color: #666666;
    }

    .item_line {
      height: 0;
      border-radius: 1rpx;
      border-top: 1rpx solid #999999;
      margin-top: 16rpx;
      width: calc(100% - 101rpx);
      float: right;
    }
  }
}
</style>
