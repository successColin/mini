<template>
  <div class="center">
    <view class="center__title" :style="{ paddingTop: statusBarHeight }">
      <div class="center__title--icon" @click="handleBack">
        <u-icon name="arrow-left"></u-icon>
      </div>
      达人成长中心
    </view>
    <swiper class="swiper" :current="current" @change="handleChange">
      <swiper-item
        v-for="(item, i) in codeArr"
        :key="i"
        class="center__code--item"
        :id="`item_${i}`"
      >
        <image :src="item.img"></image>
        <div
          class="center__code--state"
          :style="{
            background:
              i === 0
                ? '#f3e2d9'
                : i === 1
                ? '#FDF9ED'
                : i === 2
                ? '#FDF9ED'
                : i === 3
                ? '#EEF2FD'
                : '#FFE2E6',
          }"
        >
          {{ dataObj.grade - 1 >= i ? '已解锁' : '未解锁' }}
        </div>
        <div class="center__code--type">{{ item.name }}</div>
        <div class="center__code--dec">
          {{
            dataObj.grade == i
              ? '待解锁'
              : dataObj.grade - 1 > i
              ? '已完成任务'
              : dataObj.grade - 1 == i
              ? `完成任务解锁下一等级“${codeArr[current + 1].dec}”`
              : '请先完成上一级任务才可解锁'
          }}
        </div>
      </swiper-item>
    </swiper>
    <view class="center__quest" v-if="codeArr.length - 1 !== current">
      <div class="center__quest--title">升级任务</div>
      <div class="center__quest--border"></div>
      <div v-for="(v, i) in questArr" :key="i">
        <div class="center__quest--box" v-if="needArr[current][v.field]">
          <div style="display: flex; align-items: center">
            <image :src="v.img"></image>
            <div class="center__quest--box--name">
              {{ current === 0 ? '累计发布视频数' : v.name }}
            </div>
          </div>
          <div class="center__quest--box--val">
            {{ showNum(v) }}
          </div>
        </div>
      </div>
    </view>
    <view class="center__tag">
      <div class="center__tag--title">
        <div>解锁标签</div>
        <div>
          （{{ getTag }}/{{
            (dataObj.tagsList && dataObj.tagsList.length) || 0
          }}）
        </div>
      </div>
      <div class="center__tag--box">
        <div
          v-for="(item, index) in dataObj.tagsList"
          :key="index"
          :style="[index % 3 === 1 ? { width: '40%' } : '']"
        >
          <image
            :src="item.isGeted === 1 ? item.getedImg : item.notGetedImg"
          ></image>
          <div>{{ item.tagsName }}</div>
          <div>
            {{
              item.isGeted === 1
                ? '已解锁'
                : `未解锁(${item.userGetedCondition}/${item.conditions})`
            }}
          </div>
        </div>
      </div>
    </view>
  </div>
</template>

<script>
import { statusBarHeight } from '@/config/index';
export default {
  data() {
    return {
      dataObj: {
        tagsList: [],
        gradeList: [],
      },
      // scrollTo: 'item_0',
      current: 0,
      codeArr: [
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703644711001.png',
          name: '车友小白Lv.1',
          dec: '车友小白',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703644728345.png',
          name: '车友新手Lv.2',
          dec: '车友新手',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703644736953.png',
          name: '车友专家Lv.3',
          dec: '车友专家',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703644746441.png',
          name: '车友大师Lv.4',
          dec: '车友大师',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231227/file_1703644755753.png',
          name: '车友领袖Lv.5',
          dec: '车友领袖',
        },
      ],
      questArr: [
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703568945891.png',
          name: '累计粉丝数',
          field: 'upgradeFans',
          fieldVal: 'nowUpgradeFans',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703568971931.png',
          name: '累计发布达人推荐视频数',
          field: 'upgradeArticleVideo',
          fieldVal: 'nowUpgradeArticleVideo',
        },
        {
          img: 'https://oss.dcqcjlb.com/51che_java_dev/20231226/file_1703568925923.png',
          name: '累计带货销售额',
          field: 'upgradeSalesMoney',
          fieldVal: 'nowUpgradeSalesMoney',
        },
      ],
    };
  },
  components: {},
  computed: {
    statusBarHeight() {
      return statusBarHeight;
    },
    getTag() {
      let num = 0;
      if (this.dataObj.tagsList) {
        this.dataObj.tagsList.forEach((item) => {
          if (item.isGeted === 1) {
            num += 1;
          }
        });
      }
      return num;
    },
    needArr() {
      let arr = [];
      if (this.dataObj.gradeList) {
        this.dataObj.gradeList.forEach((item, i) => {
          if (i !== 0) {
            const obj = {};
            obj.upgradeFans = item.upgradeFans;
            obj.upgradeArticleVideo = item.upgradeArticleVideo;
            obj.upgradeSalesMoney = item.upgradeSalesMoney;
            arr.push(obj);
          }
        });
      }
      return arr;
    },
    showNum() {
      return function (v) {
        let num = 0;
        if (this.current === 0) {
          num = this.dataObj.nowUpgradeArticleVideoXiaoBai || 0;
        } else {
          num = this.dataObj[v.fieldVal] || 0;
        }

        if (num >= this.needArr[this.current][v.field]) {
          return '已完成';
        } else {
          return `
          （${num}/${this.needArr[this.current][v.field] || 0}）
          `;
        }
      };
    },
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    handleChange(e) {
      this.current = e.detail.current;
    },
    async init() {
      const { data } = await this.$request.post(
        '/coc-active/api/v1/newExpert/growth/center'
      );
      this.dataObj = data || {};
      this.current = data?.grade ? data.grade - 1 : 0;
    },
    // handleScroll(e) {
    //   const scrollLeft = e.target.scrollLeft;
    //   const i = (scrollLeft - 170) / 348;
    //   const val = Math.floor(i);
    //   this.current = val + 1;
    // },
    // handleTouchend() {
    //   this.scrollTo = '';
    //   this.$nextTick(() => {
    //     setTimeout(() => {
    //       this.scrollTo = `item_${this.current}`;
    //     }, 100);
    //   });
    // },
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang='scss' scoped>
.center {
  background: url('https://oss.dcqcjlb.com/51che_java_dev/20231213/file_1702433545556.png')
    no-repeat;
  background-size: 100% 100%;
  height: 100vh;
  padding: 0 10rpx;
  &__code {
    display: flex;
    width: 100%;
    &--item {
      position: relative;
      margin-left: 16rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      image {
        width: 680rpx;
        height: 240rpx;
      }
    }
    &--state {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 20rpx;
      color: #333333;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80rpx;
      height: 38rpx;
      border-radius: 20rpx 0rpx 20rpx 0rpx;
      border: 2rpx solid #ffffff;
    }
    &--type {
      position: absolute;
      top: 58rpx;
      left: 20rpx;
      font-size: 28rpx;
      font-weight: 800;
      color: #333333;
    }
    &--dec {
      position: absolute;
      left: 20rpx;
      bottom: 38rpx;
      font-size: 20rpx;
      color: #333333;
    }
    &--item:first-child {
      margin-left: 0;
    }
  }
  &__title {
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-size: 28rpx;
    font-family: PingFang SC, PingFang SC;
    font-weight: 800;
    color: #222222;
    &--icon {
      position: absolute;
      left: 20rpx;
      bottom: 15rpx;
      padding: 10rpx;
      ::v-deep {
        .u-icon__icon {
          font-weight: 900 !important;
          color: #222222 !important;
        }
      }
    }
  }
  &__img {
    width: 680rpx;
    height: 240rpx;
    border-radius: 20rpx;
    border: 2rpx solid #ffffff;
  }
  &__quest {
    margin-top: 20rpx;
    padding: 26rpx 10rpx 0;
    background: #ffffff;
    border-radius: 10rpx;
    &--title {
      font-size: 28rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 800;
      color: #222222;
      padding-bottom: 20rpx;
    }
    &--border {
      // margin: 0 40rpx;
      border-bottom: 2rpx solid #f8f8f8;
    }
    &--box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      margin-top: 24rpx;
      image {
        width: 40rpx;
        height: 40rpx;
      }
      &--name {
        color: #000000;
        margin-left: 4rpx;
      }
      &--val {
        color: #999999;
      }
    }
    &--box:last-child {
      padding-bottom: 16rpx;
    }
  }
  &__tag {
    margin-top: 20rpx;
    padding: 10rpx;
    background: #ffffff;
    border-radius: 10rpx;
    &--title {
      font-size: 28rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 800;
      color: #222222;
      display: flex;
      justify-content: space-between;
      & > div:nth-child(2) {
        color: #999999;
      }
    }
    &--box {
      display: flex;
      font-size: 24rpx;
      font-family: PingFang SC, PingFang SC;
      font-weight: 800;
      color: #222222;
      flex-wrap: wrap;
      & > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 30%;
        margin-top: 20rpx;
        image {
          width: 160rpx;
          height: 160rpx;
        }
        div:nth-child(3) {
          font-size: 20rpx;
          font-weight: 500;
          color: #999999;
        }
      }
    }
  }
}
::v-deep {
  .swiper {
    height: 240rpx;
  }
  .center__code--item {
    width: 700rpx !important;
    margin-left: 0;
  }
}
</style>
