<template>
  <div class="technician">
    <div class="l-barrage">
      <block v-for="(item, index) in items" :key="index">
        <view
          class="barrage-item"
          :id="item.id"
          :data-duration="item.duration"
          :data-trackindex="item.trackIndex"
          :style="{
            top: `${item.top}`,
            'animation-duration': `${Number(item.duration)}s`,
          }"
          @animationend="handleEnd(item.id, item.trackIndex)"
        >
          <div
            style="
              display: flex;
              height: 40rpx;
              align-items: center;
              padding: 0 20rpx 0 5rpx;
            "
          >
            <div style="margin-left: 10rpx">
              <u-icon
                name="account-fill"
                size="14"
                labelColor="#fff"
                color="#fff"
              ></u-icon>
            </div>
            {{ item.text }}
          </div>
        </view>
      </block>
      <!-- 计算每条弹幕实际的宽度 -->
      <view class="bullet-container">{{ currentBullet }}</view>
    </div>
    <image
      @click="handleImg"
      style="
        width: 730rpx;
        height: 124rpx;
        border-radius: 10rpx;
        margin: 0 auto;
        display: flex;
        position: relative;
        top: -10rpx;
      "
      src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706091042751.png"
    >
    </image>
    <faultsearch-list
      style="position: relative; top: -10rpx"
      widthS="width: calc(100% - 20rpx);"
      :isAnswer="true"
    ></faultsearch-list>
  </div>
</template>

<script>
import faultsearchList from '@/components/samllTool/faultsearchList.vue';

export default {
  data() {
    return {
      num: 0,
      barrageArr: [
        // { content: '祝你幸福1' },
        // { content: '祝你幸福2' },
        // { content: '祝你幸福3' },
        // { content: '祝你幸福4' },
        // { content: '祝你幸福5' },
        // { content: '祝你幸福6' },
        // { content: '祝你幸福7' },
        // { content: '祝你幸福8' },
        // { content: '祝你幸福9' },
        // { content: '祝你幸福10' },
      ],
      items: [],
      currentBullet: '',
      speed: 40,
      duration: 10,
      trackHeight: 42, // 单位为rpx
      targetRight: 0,
      bulletInfo: {},
      cycle: null,
      targetW: 0,
      targetH: 0,
      tracks: [],
      bullets: [],
      arr: [],
    };
  },
  components: {
    faultsearchList,
  },
  computed: {},
  watch: {},
  mounted() {
    this.barrageFun();

    const query = uni.createSelectorQuery().in(this);
    query
      .select('.l-barrage')
      .boundingClientRect((data) => {
        this.targetRight = data.right;
        this.targetW = data.width;
        this.targetH = data.height;
        // const trackNum = Math.floor(this.targetH / this.trackHeight);
        const trackNum = 2;

        // 初始时设置轨道为空闲
        this.tracks = new Array(trackNum).fill('idle');
        this.bullets = new Array(trackNum).fill([]);
      })
      .exec();
  },
  destroyed() {
    this.cycle && clearInterval(this.cycle);
    this.barrageArr = [];
  },
  watch: {
    num(v) {
      if (v === this.barrageArr.length) {
        this.items = [];
        this.num = 0;
        this.start(this.barrageArr);
      }
    },
  },
  methods: {
    handleImg() {
      uni.navigateTo({
        url: '/pages/roadhelp/index',
      });
    },
    loginWYYXFun() {},
    start(items = []) {
      this.items = [];
      this.i = 0;
      this.cycle && clearInterval(this.cycle);
      let i = 0,
        len = items.length;

      this.cycle = setInterval(() => {
        if (this.i < len) {
          this.pushFun(items[this.i]);
        } else {
          clearInterval(this.cycle);
        }
      }, 1000);
    },
    // 插入一条弹幕数据
    pushFun(item) {
      this.currentBullet = item.content;
      this.$nextTick(() => {
        let duration; // 计算在相同速度下每条弹幕动画需要的时间
        const query = uni.createSelectorQuery().in(this);
        query
          .select('.bullet-container')
          .boundingClientRect(async (data) => {
            if (this.speed) {
              duration = (this.targetW + data.width) / this.speed;
            } else {
              duration = this.duration;
            }
            // 记录下当前弹幕的宽度和运动时间
            this.bulletInfo = {
              width: data.width,
              duration,
            };
            const trackIndex = await this.getTrackIndex();

            // 计算弹幕的top, 10px为行间距
            const trackTop =
              trackIndex * this.trackHeight +
              10 * (trackIndex + 1) +
              310 +
              'rpx';

            const id = 's' + Math.random().toString(36).substring(2);
            if (trackIndex > -1) {
              if (this.bullets[trackIndex].length) {
                this.bullets[trackIndex].push({ id });
              } else {
                this.bullets[trackIndex] = [{ id }];
              }

              this.items.push({
                id,
                text: item.content,
                top: trackTop,
                trackIndex,
                duration,
              });
              // push成功了才继续插入下一个
              this.i++;
            }
          })
          .exec();
      });
    },
    // 获取空闲轨道
    getTrackIndex() {
      return new Promise((resolve) => {
        let readyIdxs = [];
        let index = -1;
        // 优先去 idle 状态
        this.tracks.forEach((v, idx) => v === 'idle' && readyIdxs.push(idx));
        if (readyIdxs.length) {
          // 可以插入任意一条空闲的轨道，也可以每次都直接取空闲轨道中的第一条
          const random = parseInt(Math.random() * readyIdxs.length);
          index = readyIdxs[random];
          // index = readyIdxs[0];
          this.tracks[index] = 'running';
          resolve(index);
        }
        // 没有轨道空闲，丛上到下巡检各轨道，选出可执行弹幕轨道
        // console.log(222222222, this.bullets);
        for (let i = 0; i < this.bullets.length; i++) {
          const len = this.bullets[i].length;
          if (len) {
            const item = this.bullets[i][len - 1];
            this.checkTrack(item.id, (flag) => {
              if (item && flag) {
                resolve(i);
              } else if (i == this.bullets.length - 1) {
                resolve(-1);
              }
            });
          }
        }
        // console.log(this.items);
      });
    },
    checkTrack(id, cb) {
      const query = uni.createSelectorQuery().in(this);
      query
        .select('#' + id)
        .boundingClientRect((data) => {
          let itemPos = data;
          // 轨道中最后一个元素尚未完全进入展示区域，直接跳出
          if (itemPos.right > this.targetRight - 20) {
            cb(false);
          } else if (itemPos.right < this.targetRight - 20) {
            // 轨道内最后一条弹幕和新弹幕的追及问题
            // 轨道中最后一个元素已完全进去展示区域
            // 速度相同，只要初始条件满足即可，不用去考虑追及问题
            if (this.speed) {
              cb(true);
            } else {
              // this.compare(itemPos, index, len)
              // 原弹幕速度
              const v1 =
                (this.targetW + itemPos.width) / +itemPos.dataset.duration;
              /**
               * 新弹幕
               * s2：全程距离
               * t2：全程时间
               * v2：速度
               */
              const s2 = this.targetW + this.bulletInfo.width;
              const t2 = this.bulletInfo.duration;
              const v2 = s2 / t2;

              if (v2 <= v1) {
                cb(true);
              } else {
                // t = s / v  比较时间：t1, t2

                // 原弹幕跑完剩余全程所需要的时间
                const t1 = (itemPos.right - 0) / v1;
                // 新弹幕头部跑完全程所需要的时间
                const t2 = this.targetW / v2;
                // console.log('前面的--->', t1, t2, '后面的时间', v1)
                if (t2 < t1) {
                  cb(false);
                }
              }
            }
          }
        })
        .exec();
    },
    handleEnd(id, trackIndex) {
      // 从轨道中剔除已经结束动画的弹幕
      this.bullets[trackIndex] = this.bullets[trackIndex].filter(
        (v) => v.id !== id
      );

      if (!this.bullets[trackIndex].length) {
        this.tracks[trackIndex] = 'idle';
      }
      this.num += 1;

      // const index = this.items.findIndex((item) => item.id === id);
      // this.items.splice(index, 1);
      // console.log(id, trackIndex, this.bullets, this.items);
      // this.$set(this.items)
    },
    async barrageFun() {
      const { data } = await this.$request.post(
        `/coc-active/api/v2/homePage/barrage`
      );
      console.log(data);
      this.barrageArr = data;
      this.start(this.barrageArr);
    },
  },
};
</script>
<style lang='scss' scoped>
.l-barrage {
  background: url('https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706091009803.jpg')
    no-repeat;
  background-size: 750rpx 440rpx;
  height: 440rpx;
  // position: relative;
  // z-index: 3;

  .barrage-item {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    white-space: nowrap;
    background-color: rgba(#222222, 0.2);
    border-radius: 18rpx;
    animation: mymove 10s linear forwards;

    font-size: 24rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }

  .bullet-container {
    position: absolute;
    right: 9999rpx;
    visibility: hidden;
    white-space: nowrap;
  }
}

@keyframes mymove {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}

@-moz-keyframes mymove /* Firefox */ {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}

@-webkit-keyframes mymove /* Safari and Chrome */ {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}

@-o-keyframes mymove /* Opera */ {
  from {
    transform: translateX(100vw);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
