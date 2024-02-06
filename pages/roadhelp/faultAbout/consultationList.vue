<!--
 * @Descripttion: 咨询列表
 * @Author: ytx
 * @Date: 2023-11-17 09:06:55
 * @Last Modified by: ytx
 * @Last Modified time: 2023-11-17 09:06:55
-->
<template>
  <div class="consultationList">
    <div
      v-for="(item, i) in showList"
      :key="i"
      class="consultationList__box"
      @click="handleClick(item, nickName(item, 'technicianId'))"
    >
      <u-avatar :src="nickName(item, 'img') || defaultImg" size="42"></u-avatar>
      <div class="consultationList__box--dec">
        <div>{{ nickName(item, 'name') }}</div>
        <div>
          <!-- 文本、图片、位置 -->
          {{
            item.lastMsg.type === 'text'
              ? item.lastMsg.body
              : item.lastMsg.type === 'image'
              ? '图片'
              : item.lastMsg.type === 'geo'
              ? '位置'
              : ''
          }}
        </div>
      </div>
      <div class="consultationList__box--time">
        <div>{{ latelyTime(item) }}</div>
        <div v-if="item.unread !== 0">
          <div>
            {{
              item.unread >= 100 ? '...' : item.unread === 0 ? '' : item.unread
            }}
          </div>
        </div>
      </div>
    </div>
    <no-data v-if="showList.length === 0"></no-data>
  </div>
</template>

<script>
import NoData from '@/components/samllTool/NoData.vue';
import { loginWYYX, timeFun } from './utils.js';
import wyyxJs from './wyyx.js';

export default {
  mixins: [wyyxJs],
  onLoad() {},
  data() {
    return {
      technicianList: [],
      defaultImg:
        'https://oss.dcqcjlb.com/51che_java_dev/20231208/file_1702019665548.png',
    };
  },
  components: { NoData },
  computed: {
    showList() {
      console.log(111111111111111111111);
      const arr = [];

      this.sessionsArr.forEach((item) => {
        const v = this.technicianList.find((j) => item.to === j.accid);
        if (v) {
          arr.push(item);
        }
      });
      return arr;
    },
    latelyTime() {
      return function (item) {
        return timeFun(item.updateTime);
      };
    },
    nickName() {
      return function (item, name) {
        const user = this.technicianList.find((v) => v?.accid === item.to);
        console.log(user);
        if (name === 'name') {
          if (!user) {
            return item.to;
          }
          return user.name;
        } else if (name === 'technicianId') {
          return user.technicianId;
        } else {
          return user.headImg;
        }
      };
    },
  },
  watch: {},
  mounted() {
    this.loginWYYXFun();
  },
  methods: {
    // 网易云信登录
    loginWYYXFun() {
      console.log('进来了登录刷新。。。。。。。。');
      this.getList();
      loginWYYX().then(() => {
        this.initWYYX();
      });
    },
    async handleClick(item, technicianId) {
      console.log(item);
      this.$request.post('/coc-active/api/v1/technician/addClickNum', {
        accid: item.to,
      });
      // await getApp().globalData.nim.session.resetSessionUnreadCount({
      //   id: item.id,
      // });
      // this.eventList.forEach(async (item) => {
      //   await getApp().globalData.nim.off(item);
      // });

      if (!item.to) {
        return uni.showToast({
          title: 'accid 获取失败',
          icon: 'none',
        });
      }

      await getApp().globalData.nim.destroy();
      uni.navigateTo({
        url: `/pages/roadhelp/faultAbout/onlineConversation?back=1&teacherId=${item.to}&technicianId=${technicianId}`,
      });
    },
    // 获取技师列表
    async getList() {
      await this.$newrequest
        .post('/coc-active/api/v1/technician/list')
        .then((res) => {
          this.technicianList = res.data || [];
        });
    },
  },
  async beforeDestroy() {
    const state = await getApp().globalData.nim.status;
    if (state === 'logined') {
      await getApp().globalData.nim.destroy();
    }

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 1]; //上一个页面
    prevPage.$vm.loginWYYXFun();
  },
};
</script>
<style lang='scss' scoped>
.consultationList {
  background: #ffffff;
  height: 100vh;
  padding: 0 23rpx;
  &__box {
    display: flex;
    padding: 30rpx 0;
    &--dec {
      margin-left: 15rpx;
      flex: 1;
      display: flex;
      flex-direction: column;
      font-family: PingFang SC, PingFang SC;

      & > div:nth-child(1) {
        font-size: 27rpx;
        color: #222222;
        flex: 1;
      }
      & > div:nth-child(2) {
        font-size: 23rpx;
        color: #999999;
      }
    }
    &--time {
      display: flex;
      flex-direction: column;
      font-family: PingFang SC, PingFang SC;
      align-items: center;
      & > div:nth-child(1) {
        font-size: 23rpx;
        color: #999999;
        flex: 1;
      }
      & > div:nth-child(2) {
        background: #d91b1b;
        border-radius: 275rpx;
        font-size: 23rpx;
        color: #ffffff;
        width: fit-content;
        padding: 3rpx 10rpx;
      }
    }
  }
}
</style>
