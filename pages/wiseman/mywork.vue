<template>
  <view class="page">
    <view class="top">
      <view style="width: 700rpx">
        <u-search
          @custom="tosearch"
          @search="tosearch"
          placeholder="搜索作品标题"
          v-model="title"
          :showAction="false"
        ></u-search>
      </view>
      <!-- 	<view style="margin-left: -40rpx;">
				<u-tabs :activeStyle="{
                color: '#303133',
                fontWeight: 'bold',
                fontSize: '32rpx',
                transform: 'scale(1.05)',
            }" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:88rpx;width:140rpx" lineHeight="3"
					lineWidth="24" :lineColor="`url(${lineBg}) 100% 100%`" keyName='name' :list="taglist">
				</u-tabs>
			</view> -->
    </view>
    <view v-if="ishave">
      <view class="margin25" style="margin-top: 20%">
        <custom-waterfalls-flow
          imageKey="coverPicture"
          ref="waterfallsFlowRef"
          :value="dataList"
          :isshowicon="true"
          @imageClick="OnPushPostDetail"
        >
          <view
            v-for="(item, index) in dataList"
            :key="index"
            slot="slot{{index}}"
            style="padding-bottom: 10rpx; border-radius: 0px 0px 10rpx 10rpx"
          >
            <view v-if="item.status != 1" @click="Ondetail(item)">
              <image
                style="
                  width: 46rpx;
                  height: 48rpx;
                  position: absolute;
                  right: 0rpx;
                  top: 0rpx;
                "
                src="https://oss.dcqcjlb.com/51che_java_dev/20230928/file_1695867520236.png"
              ></image>
            </view>
            <view v-if="item.citeType == 10 || item.citeType == 11">
              <!-- 车型 -->
              <view v-if="item.type == 6" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  车型丨{{ item.relatedName }}
                </view>
              </view>
              <view v-if="item.type == 4" class="prominent">
                <!-- 团购 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  团购丨{{ item.relatedName }}
                </view>
              </view>
              <view v-if="item.type == 1" class="prominent">
                <!-- 活动 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  活动丨{{ item.relatedName }}
                </view>
              </view>
              <view v-if="item.type == 3" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  救援丨{{ item.relatedName }}
                </view>
              </view>
              <view v-if="item.type == 2" class="prominent">
                <!-- 保养套餐 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  4S店丨{{ item.relatedName }}
                </view>
              </view>
              <view v-if="item.type == 5" class="prominent">
                <!-- 套餐 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <!-- <image style="width: 32rpx;height: 32rpx;"
										src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png">
									</image> -->
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  <!-- 套餐丨{{item.relatedName}} -->
                  团购丨{{ item.relatedName }}
                </view>
              </view>
            </view>
            <view
              v-else-if="
                item.citeType == 1 || item.citeType == 2 || item.citeType == 3
              "
            >
              <view v-if="item.citeType == 1" class="prominent">
                <!-- 团购 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  团购丨{{ item.productTitle }}
                </view>
              </view>
              <view v-if="item.citeType == 2" class="prominent">
                <!-- 活动 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  活动丨{{ item.activityTitle }}
                </view>
              </view>
              <view v-if="item.citeType == 3" class="prominent">
                <!-- 活动 -->
                <view class="u-flex alc" style="margin-left: 10rpx">
                  <image
                    style="width: 32rpx; height: 32rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png"
                  >
                  </image>
                </view>
                <view
                  class="txtColorWhite size24 oneLine"
                  style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx"
                >
                  商家丨{{ item.shopName }}
                </view>
              </view>
            </view>
            <view
              class="waterfall-title"
              :class="{ 'mt-40': item.type || item.citeType }"
            >
              <text v-if="item.articleTitle">{{ item.articleTitle }}</text>
              <text v-else>{{ item.content }}</text>
            </view>
            <view v-if="item.status == 1" class="u-flex jsb ml10 mr10 size20">
              <view class="u-flex alc">
                <view class="u-flex alc">
                  <image
                    style="width: 25rpx; height: 19rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692146471728.png"
                  >
                  </image>
                </view>
                <view style="margin-left: 5rpx">{{ item.viewBaseNum }}</view>
              </view>
              <view class="u-flex alc">
                <view class="u-flex alc">
                  <image
                    style="width: 24rpx; height: 20rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692146773166.png"
                  >
                  </image>
                </view>
                <view style="margin-left: 5rpx">{{ item.likeBaseNum }}</view>
              </view>
              <view class="u-flex alc">
                <view class="u-flex alc">
                  <image
                    style="width: 20rpx; height: 22rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692146821761.png"
                  >
                  </image>
                </view>
                <view style="margin-left: 5rpx">{{
                  item.expertSaleCount
                }}</view>
              </view>
            </view>
            <view v-else class="size20 ml10">
              <view v-if="item.status == 4">待审核</view>
              <view v-else-if="item.status == 3"
                >屏蔽原因：{{ item.shieldedReason }}</view
              >
            </view>
          </view>
        </custom-waterfalls-flow>
      </view>
    </view>
    <view v-if="!ishave">
      <view class="tac mt50">
        <image
          style="width: 423rpx; height: 324rpx; margin-top: 100rpx"
          src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png"
        >
        </image>
        <view class="txtDarkGray">暂无作品</view>
      </view>
    </view>
    <!-- <view style="position: fixed;bottom: 30rpx;left: 600rpx;z-index:9999" @click="Onadd">
			<image style="width: 88rpx;height: 88rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060308658.png"></image>
		</view> -->
    <u-modal
      :show="showmodal"
      @confirm="detailarcitle"
      :showCancelButton="true"
      content="确认删除贴文?"
      @cancel="closemodal"
    ></u-modal>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ishave: true,
      dataList: [],
      title: '',
      isLoadMore: false,
      showmodal: false,
      rowid: '',
      taglist: [
        {
          name: '全部',
          type: 0,
        },
        {
          name: '运动',
          type: 1,
        },
        {
          name: '亲子',
          type: 2,
        },
        {
          name: '观影',
          type: 3,
        },
        {
          name: '休闲娱乐',
          type: 4,
        },
      ],
      lineBg:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
    };
  },

  onLoad() {},

  onShow() {
    this.isLoadMore = false;
    this.title = '';
    this.dataList = [];
    this.current = 1;
    this.getList();
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.current++;
      this.getList();
    }
  },

  methods: {
    detailarcitle() {
      this.$request
        .post('/coc-social/api/v2/article/addArticle', {
          articleId: this.rowid,
          articleUserId: uni.getStorageSync('userId'),
        })
        .then((res) => {
          if (res.code == 200) {
            uni.$u.toast('删除成功');
            setTimeout(() => {
              uni.redirectTo({
                url: '/pages/wiseman/mywork',
              });
            }, 800);
          } else {
            uni.$u.toast(res.message);
          }
        });
    },
    closemodal() {
      this.showmodal = false;
    },
    Ondetail(item) {
      this.showmodal = true;
      this.rowid = item.articleId;
    },
    tosearch() {
      this.current = 1;
      this.isLoadMore = false;
      // this.dataList = []
      // uni.stopPullDownRefresh()
      this.getList();
    },
    getList() {
      this.$request
        .post('/coc-social/api/v2/article/myArticleList', {
          current: this.current,
          size: 10,
          title: this.title,
          isOwn: 1,
        })
        .then((res) => {
          if (this.current == 1) {
            this.$nextTick(() => {
              this.$refs.waterfallsFlowRef.refresh();
            });
          }
          if (res.data.total > 0) {
            this.ishave = true;
          } else {
            this.ishave = false;
          }
          res.data.records.filter((s, index) => {
            if (s.imgs) {
              s.coverPicture = s.imgs.split(',')[0];
            } else if (s.articleCoverImage) {
              s.coverPicture = s.articleCoverImage;
            } else if (s.video) {
              s.coverPicture =
                s.video + '?x-oss-process=video/snapshot,t_1000,m_fast';
            }
          });
          if (res.data.records.length < 10) {
            this.isLoadMore = true;
          }

          if (this.current == 1) {
            this.dataList = [];
            this.dataList = res.data.records;
          } else {
            res.data.records.filter((s) => {
              this.dataList.push(s);
            });
          }
        });
    },
    OnPushPostDetail(item) {
      if (item.status != 1) {
        return false;
      }
      if (item.video) {
        // 视频
        // uni.navigateTo({
        //   url: '/pages/wiseman/component/videoarticle?id=' + item.articleId,
        // });
        uni.navigateTo({
          url:
            '/pages/activity/articlevideo/index?id=' +
            item.articleId +
            '&userId=' +
            uni.getStorageSync('userId') +
            '&isDel=' +
            true,
        });
      } else {
        // 图文
        // uni.navigateTo({
        //   url: '/pages/wiseman/component/imgarticle?id=' + item.articleId,
        // });
        uni.navigateTo({
          url:
            '/pages/activity/waterfull/imglist?id=' +
            item.articleId +
            '&userId=' +
            uni.getStorageSync('userId'),
        });
      }
    },

    Onadd() {
      uni.redirectTo({
        url: '/pages/wiseman/component/addimgarticle',
        success: function (s) {},
      });
    },
  },
};
</script>

<style lang="scss">
.page {
}

.top {
  position: fixed;
  z-index: 99999;
  top: 0rpx;
  background: #ffffff;
  padding: 25rpx 25rpx 25rpx 25rpx;
  border-radius: 0 0 13rpx 13rpx;
  width: 100%;
}

.prominent {
  position: relative;
  top: -60rpx;
  height: 48rpx;
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685780222536.png');
  background-size: 100% 100%;
  border-radius: 10rpx;
  margin: 0 10rpx;
  display: flex;
}

.waterfall-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 10rpx;
  width: 230rpx;
  font-size: 20rpx;
  line-height: 40rpx;
}

.waterfall-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-left: 10rpx;
  width: 320rpx;
  font-size: 28rpx;
  line-height: 60rpx;
  font-weight: bold;
  // margin-top: -40rpx;
}

.mt-40 {
  margin-top: -40rpx;
}
</style>