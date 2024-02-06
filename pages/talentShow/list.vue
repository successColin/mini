<template>
  <div class="list">
    <div
      class="list__item"
      v-for="(item, index) in listArr"
      :key="index"
      @click="handleJump"
    >
      <div class="list__item--one">
        <div>
          <u-avatar size="22" :src="item.headImg"></u-avatar>
          <span>{{ item.nickname }}</span>
          <div class="tags" v-if="item.marketingTags">
            {{ item.marketingTags }}
          </div>
        </div>
        <div
          @click.stop="handleFollow(item)"
          v-if="userId != item.userId"
          :style="
            item.followType === 1 ? '' : 'border: 1px solid #999; color: #999;'
          "
        >
          <u-icon
            name="plus"
            size="10"
            :color="item.followType === 1 ? '#D91B1B' : '#999'"
          ></u-icon>
          <span style="margin-left: 4rpx">
            {{ item.followType === 1 ? '关注' : '取关' }}
          </span>
        </div>
      </div>
      <div class="list__item--two">{{ item.title }}</div>
      <div class="list__item--three">
        {{ item.detail }}
      </div>
      <div class="list__item--four">
        <!-- <div v-if="">

        </div> -->
        <scroll-view scroll-x="true">
          <view style="display: flex">
            <view
              v-for="(item1, index1) in 5"
              :key="index1"
              style="margin-right: 10rpx"
            >
              <image
                src="https://oss.dcqcjlb.com/51che_java_dev/20240126/d14665808cf5e712c9253c0cd397c2d7.jpeg"
                style="
                  margin-right: 7rpx;
                  width: 223rpx;
                  height: 160rpx;
                  border-radius: 10rpx;
                "
              >
              </image>
            </view>
          </view>
        </scroll-view>
      </div>
      <div class="list__item--five">
        <div>
          <template
            v-if="item.signUpHeadImgs && item.signUpHeadImgs.length > 0"
          >
            <div
              v-for="(v, i) in item.signUpHeadImgs"
              :key="i"
              style="margin-right: 4rpx"
            >
              <u-avatar
                size="20"
                :src="v"
                style="margin-right: 4rpx"
              ></u-avatar>
            </div>
            <div style="margin-right: 16rpx">
              <u-avatar
                size="20"
                src="https://oss.dcqcjlb.com/51che_java_dev/20240205/file_1707124511755.png"
              ></u-avatar>
            </div>
          </template>
          <div v-if="item.residue > 0">报名剩余: {{ item.residue }}</div>
        </div>
        <div v-if="item.residue > 0">我要报名</div>
      </div>
    </div>
    <div class="list__reachBottom" v-if="isFinish && listArr.length !== 0">
      到底了~
    </div>
    <no-data v-if="listArr.length === 0 && !isFirst"></no-data>
  </div>
</template>

<script>
import NoData from '@/components/samllTool/NoData.vue';

export default {
  data() {
    return {
      userId: '',
      isFinish: false,
      isFirst: true,
      params: {
        current: 1,
        size: 3,
      },
      listArr: [],
    };
  },
  components: {
    NoData,
  },
  computed: {},
  watch: {},
  onLoad() {
    if (uni.getStorageSync('userId')) {
      this.userId = uni.getStorageSync('userId');
    }
    this.getList();
  },
  onReachBottom() {
    if (!this.isFinish) {
      this.params.current++;
      this.getList();
    }
  },
  methods: {
    async getList() {
      const { data } = await this.$request.post(
        `/coc-active/api/v1/adv/space/getExpertActivityAdvList`,
        this.params
      );
      this.isFirst = false;
      const { total, current, records } = data;
      console.log(data);
      if (current === 1) {
        this.listArr = records;
      } else {
        this.listArr.push(...records);
      }
      if (total <= this.listArr.length) {
        this.isFinish = true;
      }
    },
    handleJump() {
      uni.navigateTo({
        url: '/pages/talentShow/detail',
      });
    },
    handleFollow(item) {
      this.$request
        .post('/coc-social/api/v2/article/followExpert', {
          userId: item.userId,
        })
        .then((res) => {
          if (res.code == 200) {
            this.getList();
          }
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.list {
  margin: 0 10rpx;
  background: #f8f8f8;
  &__item {
    padding: 20rpx 10rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin-top: 10rpx;
    font-family: PingFang SC;
    color: #222222;
    &--one {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div {
        display: flex;
        align-items: center;
      }
      & > div:nth-child(1) {
        span {
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #222222;
          margin-left: 5rpx;
        }
        image {
          margin-left: 10rpx;
        }
        .tags {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16rpx;
          font-family: CKTKingKong;
          font-weight: bold;
          color: #582c12;
          padding: 0 10rpx;
          height: 28rpx;
          background: linear-gradient(142deg, #fde1c9, #eab999);
          border-radius: 14rpx;
          margin-left: 10rpx;
        }
      }
      & > div:nth-child(2) {
        padding: 0 14rpx;
        height: 40rpx;
        border: 1px solid #d91b1b;
        border-radius: 20rpx;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #d91b1b;
        display: flex;
        align-items: center;
      }
    }
    &--two {
      font-size: 28rpx;
      font-weight: bold;
      margin-top: 20rpx;
    }
    &--three {
      margin-top: 17rpx;
      font-size: 24rpx;
      font-weight: 500;
      line-height: 36rpx;

      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
    &--four {
      height: 160rpx;
      margin-top: 20rpx;
    }
    &--five {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20rpx;
      & > div {
        display: flex;
      }
      & > div:nth-child(2) {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 136rpx;
        height: 52rpx;
        background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
        border-radius: 25rpx;

        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
      }
    }
  }
  &__reachBottom {
    font-size: 12px;
    color: #999999;
    text-align: center;
    padding: 40rpx 0;
  }
}
</style>
