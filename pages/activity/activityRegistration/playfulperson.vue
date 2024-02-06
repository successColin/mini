<!--
 * @Descripttion: 达人推荐
 * @Author: ytx
 * @Date: 2023-10-29 08:35:04
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-29 08:35:04
-->
<template>
  <view class="page">
    <view>
      <!-- 头部 -->
      <custom-head
        class="page__head"
        :current="tagcurrent"
        :list="tags"
        :isNoShow="isNoShow"
        @giveClickTabs="OnClickTags"
      ></custom-head>
      <!-- 轮播图 -->
      <!-- <carousel ref='carousel' :topClass="['activity-img']" height="260rpx" urlkey="url" :dataType="2"
			systemCode="applets_article_list" :indicatorType="3"></carousel> -->
      <!-- 关注 -->
      <view
        v-if="type == 0"
        @touchstart="touchStart"
        @touchend="followTouchEnd"
      >
        <view v-if="isShowMyLike">
          <view class="choice-list" :style="{ marginTop: statusBarHeight }">
            <view
              v-for="(v, i) in dataList"
              :key="i"
              class="choice-item"
              @click="toList(v)"
            >
              <view class="choice-item-top">
                <view class="choice-item-top-image">
                  <u-avatar size="24" :src="v.headImg" />
                </view>
                <view class="choice-item-top-name">{{ v.nickname }}</view>
                <view class="choice-item-top-date">{{ v.createdAt }}</view>
              </view>
              <view class="choice-item-video">
                <image
                  :src="v.coverPicture"
                  class="choice-item-image"
                  mode="aspectFill"
                />
                <view class="choice-item-video-icon" v-if="v.video">
                  <image
                    mode="aspectFill"
                    class="choice-item-video-image"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698492577434.png"
                  />
                </view>
              </view>
              <view class="choice-item-below">
                <view class="choice-item-below-name">{{ getTitle(v) }}</view>
                <view class="choice-item-below-title">{{ v.content }}</view>
              </view>
              <view class="choice-item-line" />
              <view class="choice-item-bottom">
                <view class="flex alc">
                  <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403214617.png"
                    class="choice-item-bottom-like"
                  />
                  <view class="choice-item-bottom-title">{{
                    v.likeBaseNum
                  }}</view>
                  <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403564187.png"
                    class="choice-item-bottom-comment"
                  />
                  <view class="choice-item-bottom-title">{{
                    v.commentNum
                  }}</view>
                  <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231027/file_1698403655698.png"
                    class="choice-item-bottom-forward"
                  />
                  <view class="choice-item-bottom-title">{{
                    v.shareBaseNum
                  }}</view>
                </view>
                <view class="choice-item-bottom-look"
                  >{{ v.viewBaseNum }}人看过</view
                >
              </view>
            </view>
          </view>
        </view>

        <MyAttention v-if="!isShowMyLike"></MyAttention>
        <view
          v-if="!isShowMyLike"
          class="playitem mybox waterfall"
          :style="{ marginTop: !isShowMyLike ? '0' : statusBarHeight }"
        >
          <view style="padding-top: 24rpx">
            <!--  #ifdef MP-WEIXIN  -->
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
                style="
                  padding-bottom: 10rpx;
                  border-radius: 0px 0px 10rpx 10rpx;
                "
              >
                <list-page
                  :item="item"
                  :list.sync="dataList"
                  :index="index"
                ></list-page>
              </view>
            </custom-waterfalls-flow>
            <!--  #endif -->
          </view>
        </view>

        <view
          v-if="isLoadMore && isarticle && showBottom"
          style="
            font-size: 24rpx;
            color: #999999;
            text-align: center;
            margin: 20rpx 0;
          "
        >
          我到底啦~
        </view>
        <view style="height: 130rpx"></view>
        <!-- <view style="height: 100rpx"> </view> -->
      </view>
      <!-- 全部 -->
      <view v-else-if="type == 1">
        <view class="u-flex bbbbbbbb" :style="{ top: statusBarHeight }">
          <my-search
            v-if="!isNoShow"
            style="width: 100%"
            :keyword.sync="keyword"
            :list="searchTabs"
            :current.sync="tabscurrent"
            @giveSearch="tosearch"
            @giveTabsFun="handleTabs"
            @giveClose="clear"
            @giveToggle="handleToggle"
          ></my-search>
        </view>
        <view
          class="playitem mybox waterfall"
          :style="[{ marginTop: statusBarHeight }]"
        >
          <view
            :style="[!isNoShow ? { paddingTop: '48px' } : '10rpx']"
            @touchstart="touchStart"
            @touchend="touchEnd"
          >
            <swiper :style="{ height: listHeight }" :circular="circular">
              <swiper-item>
                <scroll-view
                  :scroll-y="true"
                  :style="{ height: listHeight }"
                  :refresher-enabled="true"
                  :refresher-triggered="triggered"
                  @scrolltolower="scrolltolower"
                  @refresherrefresh="refresherrefresh"
                  @refresherpulling="refresherpulling"
                >
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
                      style="
                        padding-bottom: 10rpx;
                        border-radius: 0px 0px 10rpx 10rpx;
                      "
                    >
                      <list-page
                        :item="item"
                        :list.sync="dataList"
                        :index="index"
                      ></list-page>
                    </view>
                  </custom-waterfalls-flow>
                  <view
                    v-if="isLoadMore && isarticle && showBottom"
                    style="
                      font-size: 24rpx;
                      color: #999999;
                      text-align: center;
                      margin-top: 40rpx;
                    "
                  >
                    我到底啦~
                  </view>
                  <view
                    v-if="!isarticle"
                    style="
                      font-size: 24rpx;
                      color: #999999;
                      text-align: center;
                      margin: 200rpx 0;
                    "
                  >
                    <image
                      src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720245068.png"
                      style="width: 153rpx; height: 152rpx"
                    ></image>
                  </view>
                  <view style="height: 130rpx"></view>
                </scroll-view>
              </swiper-item>
            </swiper>
          </view>
        </view>

        <!-- <view style="height: 100rpx"> </view> -->
      </view>
      <!-- 视频 -->
      <!-- <view v-else-if="type == 1">
        <videolist
          ref="videolist"
          :dataList="videoList"
          @detailvideo="detailvideo"
          @getmorevideo="getmorevideo"
          @likenumchange="likenumchange"
          @setnewvideo="setnewvideo"
        ></videolist>
      </view> -->
      <!-- 图文 -->
      <!-- <view v-else-if="type == 2" class="mybox" style="overflow: auto">
        <swiper
          class="swiper"
          :vertical="true"
          style="height: 93.5vh"
          @change="change"
          duration="800"
        >
          <swiper-item v-for="(item, index) in imgList" :key="index">
            <scroll-view scroll-y="true" style="height: 100%">
              <imgcomponent
                @changefollowType="changefollowType"
                :dataList="item"
                @deleteimg="deleteimg"
                @sendid="sendid(item)"
                :userId="userId"
                :index="index"
              >
              </imgcomponent>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view> -->
      <view @click="OnAddpost" class="tabs-add">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060308658.png"
        ></image>
      </view>
    </view>
    <request-loading></request-loading>
    <u-loading-page
      loading-mode="spinner"
      :loading="showloading"
      bgColor="rgba(0,0,0,0.1)"
      color="white"
      loadingColor="white"
      loadingText="加载中"
    ></u-loading-page>
  </view>
</template>

<script>
import MySearch from '@/components/TypeTabs/index.vue';
import carousel from '@/components/carousel/index.vue';
import customHead from '@/components/customHead/index.vue';
import { statusBarHeight } from '@/config/index';
import { tologin } from '@/utils/index.js';
// import imgcomponent from "../components/imgcomponent.vue";
import ListPage from './components/ListPage.vue';
import MyAttention from './components/MyAttention';
// import videolist from "./components/videolist.vue";

export default {
  components: {
    carousel,
    // videolist,
    // imgcomponent,
    MySearch,
    MyAttention,
    customHead,
    ListPage,
  },
  data() {
    return {
      sharedetail: {},
      triggered: false,
      shopType: '',
      shopTypeId: '',
      relatedType: '',
      userId: '',
      isShopPunch: '',
      searchTabs: [], // 搜索的tabs
      tags: [
        {
          name: '关注',
          id: 0,
        },
        {
          name: '发现',
          id: 1,
        },
        // {
        //   name: '全部',
        //   id: 0,
        // },
        // {
        //   name: '视频',
        //   id: 1,
        // },
        // {
        //   name: '图文',
        //   id: 2,
        // },
      ],
      showloading: true,
      type: 1,
      isarticle: true,
      keyword: '',
      dataList: [],
      videoList: [],
      imgList: [],
      current: 1,
      tabscurrent: 0,
      isLoadMore: false,
      visitinto: null,
      tagcurrent: 1,
      videocurrent: 1,
      imgcurrent: 1,
      articleId: null,
      newuserid: null,
      isShowMyLike: true, //  是显示我喜欢 否显示关注
      isNoShow: false,
      homeMenuId: undefined,
      touchStartX: 0,
      circular: false,
      showBottom: false,
    };
  },
  onPullDownRefresh() {
    this.tosearch();
    console.log(2222222);
    setTimeout(() => {
      uni.stopPullDownRefresh();
    }, 1000);
  },
  computed: {
    statusBarHeight() {
      return `calc(45px + ${statusBarHeight})`;
    },
    listHeight() {
      return `calc(100vh - 45px - 45px - ${statusBarHeight})`;
    },
    // z状态栏高度适配
    navbarHeight() {
      return uni.getStorageSync('menuInfo')
        ? uni.getStorageSync('menuInfo').contentTop
        : 0;
    },
    // 胶囊高度
    menuHeight() {
      return uni.getStorageSync('menuInfo')
        ? uni.getStorageSync('menuInfo').menuHeight
        : 0;
    },
    // 胶囊top
    menuTop() {
      return uni.getStorageSync('menuInfo')
        ? uni.getStorageSync('menuInfo').menuTop - this.statusBarHeight
        : 0;
    },
  },

  async onLoad(option) {
    console.log(option);
    this.getshareimg();
    let _this = this;
    this.userId = uni.getStorageSync('userId');
    await this.getTabsList();
    if (option.keycode) {
      this.keyword = option.keycode;
    }
    if (option.isNoShow) {
      this.isNoShow = option.isNoShow;
    }
    if (option.homeMenuId) {
      this.homeMenuId = option.homeMenuId * 1;
    }
    // uni.removeStorageSync('enter');
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    // type 1是关注   2是发现
    if (option.type) {
      this.type = option.type;
      this.tagcurrent = option.type;

      this.getPageList();
      // 图文和视频
      //  else {
      //   this.getbyId(option.articleId, option.type);
      // }
    } else {
      // 获取视频
      // this.getvideoList();
      this.getList();
    }
    if (option.userId) {
      this.newuserid = option.userId;
    }
    uni.$on('changelike', function (data) {
      if (data.likeType == 1) {
        _this.imgList[data.index].article.likeType = 1;
        _this.imgList[data.index].article.likeBaseNum =
          _this.imgList[data.index].article.likeBaseNum + 1;
      } else if (data.likeType == 2) {
        _this.imgList[data.index].article.likeType = 2;
        _this.imgList[data.index].article.likeBaseNum =
          _this.imgList[data.index].article.likeBaseNum + -1;
      }
    });
    uni.$on('changid', function (data) {
      _this.articleId = data;
    });
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      // if (this.type == 1 || this.type == 0) {
      // }
      this.current++;
      this.getList();
    }
  },
  // 记录用户行为
  onShow() {
    if (uni.getStorageSync('token')) {
      this.$request
        .post('/coc-active/api/v1/user/behavior/visit_into', {
          type: 5,
        })
        .then((res) => {
          this.visitinto = res;
        });
    }
  },
  onHide() {
    if (uni.getStorageSync('token')) {
      this.$request
        .post('/coc-active/api/v1/user/behavior/visit_exit', {
          userVisitId: this.visitinto,
        })
        .then((res) => {});
    }
  },
  onUnload() {
    if (uni.getStorageSync('token')) {
      this.$request
        .post('/coc-active/api/v1/user/behavior/visit_exit', {
          userVisitId: this.visitinto,
        })
        .then((res) => {});
    }
  },
  // -------
  // 分享
  onShareAppMessage(res) {
    this.share();
    let path =
      '/pages/activity/activityRegistration/playfulperson?type=' +
      this.type +
      '&articleId=' +
      this.articleId +
      '&enter=117';
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: path,
      success(res) {
        uni.showToast({
          title: "分享成功",
        });
      },
      fail(res) {
        uni.showToast({
          title: "分享失败",
          icon: "none",
        });
      },
    };
  },
  onShareTimeline(res) {
    //分享到朋友圈
    this.share();
    let path =
      '/pages/activity/activityRegistration/playfulperson?type=' +
      this.type +
      '&articleId=' +
      this.articleId +
      '&enter=117';
    //分享到朋友圈
    let title = this.sharedetail.shareTitle;
    let imageUrl = this.sharedetail.shareImg;
    return {
      title: title,
      imageUrl: imageUrl,
      path: path,
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
  watch: {
    isLoadMore(v) {
      if (v) {
        setTimeout(() => {
          this.showBottom = true;
        }, 2000)
      } else {
        this.showBottom = false;
      }
    }
  },
  // 方法
  methods: {
    getshareimg() {
      this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/38").then((res) => {
        this.sharedetail = res.data;
      });
    },
    refresherpulling(e) {
      console.log(e);
      if (e.detail.dy < 30) {
        return;
      }
      this.triggered = true;
    },
    refresherrefresh() {
      this.tosearch();

      setTimeout(() => {
        this.triggered = false;
      }, 1000);
    },
    scrolltolower() {
      if (!this.isLoadMore) {
        this.current++;
        this.getList();
      }
    },
    touchStart(e) {
      console.log(e);
      this.touchStartX = e.touches[0].clientX;
    },
    followTouchEnd(e) {
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      console.log(e, this.tabscurrent, deltaX);
      if (Math.abs(deltaX) < 90) return;
      if (deltaX < 0) {
        this.tagcurrent = 1;
        this.OnClickTags(this.tags[1]);
      }
    },
    touchEnd(e) {
      console.log(e);
      if (
        this.tabscurrent === 0 ||
        this.tabscurrent === 1 ||
        this.tabscurrent === this.searchTabs.length - 1 ||
        this.tabscurrent === this.searchTabs.length - 2
      ) {
        this.circular = false;
      } else {
        this.circular = true;
      }
      let deltaX = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(deltaX) < 90) return;
      if (deltaX > 0) {
        if (this.tabscurrent === 0) {
          this.tagcurrent = 0;
          this.OnClickTags(this.tags[0]);
          return;
        } else {
          this.tabscurrent -= 1;
        }
      } else {
        if (this.tabscurrent === this.searchTabs.length - 1) return;
        this.tabscurrent += 1;
      }
      this.handleTabs(this.searchTabs[this.tabscurrent]);
    },
    async getTabsList() {
      const { data } = await this.$request.post(
        '/coc-social/api/v2/article/getArticleSecondList',
        {
          newType: 1,
        }
      );
      const list = [{ value: 0, name: '推荐' }];
      data.forEach((v) => {
        list.push({ value: v.articleNewType, name: v.name });
      });
      this.searchTabs = list;
      console.log(this.searchTabs);
    },
    toList(value) {
      if (value.video) {
        uni.navigateTo({
          url:
            '/pages/activity/articlevideo/index?id=' +
            value.articleId +
            '&newType=1&userType=1&title=达人推荐&tabscurrent=' +
            this.tabscurrent + '&isShowTab=true',
        });
      } else {
        uni.navigateTo({
          url:
            '/pages/activity/waterfull/imglist?id=' +
            value.articleId +
            '&newType=1&userType=1',
        });
      }
    },
    getTitle(value) {
      const { activityTitle, articleTitle, productTitle } = value;
      return activityTitle || articleTitle || productTitle;
    },
    // 搜索和类型切换
    handleToggle(state) {
      this.handleTabs({}, state);
    },
    // 切换类型
    handleTabs(item, state = true) {
      uni.pageScrollTo({
        scrollTop: 1, //距离页面顶部的距离
        duration: 0,
      });
      this.isLoadMore = false;
      console.log(item);
      this.shopType = '';
      this.relatedType = '';
      this.shopTypeId = '';
      this.isShopPunch = '';
      if (item.shopType) {
        this.shopType = item.shopType;
      }
      if (item.shopTypeId) {
        this.shopTypeId = item.shopTypeId;
      }
      if (item.id) {
        this.relatedType = item.id;
      }
      if (item.isShopPunch) {
        this.isShopPunch = item.isShopPunch;
      }
      if (state) {
        this.tosearch();
      } else {
        this.keyword = '';
      }
    },
    // -----------
    share() {
      if (this.type == 1 || this.type == 2) {
        this.$newrequest
          .post('/coc-social/api/v2/article/share', {
            id: this.articleId,
          })
          .then((res) => {
            if (res.code == 200) {
              if (this.type == 1) {
                this.videoList.filter((s, i) => {
                  if (this.articleId == s.article.id) {
                    s.article.shareBaseNum++;
                  }
                });
              } else {
                this.imgList.filter((s, i) => {
                  if (this.articleId == s.article.id) {
                    s.article.shareBaseNum++;
                  }
                });
              }
            }
          });
      }
    },
    // getbyId(id, type) {
    //   this.$request
    //     .post('coc-social/api/v1/article/findById', {
    //       current: 1,
    //       id: id,
    //       size: 99,
    //     })
    //     .then((res) => {
    //       if (type == 2) {
    //         res.data.article.imgarr = res.data.article.imgs.split(',');
    //         this.imgList.push(res.data);
    //         this.getotherimgList(id);
    //       } else {
    //         this.videoList.push(res.data);
    //         this.getothervideoList(id);
    //       }
    //     });
    // },
    OnPushPostDetail(e) {
      if (!e.video) {
        uni.navigateTo({
          url: `/pages/activity/waterfull/imglist?id=${
            e.articleId
          }&relatedType=${
            this.relatedType ? this.relatedType : ''
          }&selectionType=${
            this.shopType ? this.shopType : ''
          }&newType=1&keyword=${this.keyword ? this.keyword : ''}&userType=2`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/activity/articlevideo/index?id=${
            e.articleId
          }&relatedType=${
            this.relatedType ? this.relatedType : ''
          }&selectionType=${
            this.shopType ? this.shopType : ''
          }&newType=1&keyword=${
            this.keyword ? this.keyword : ''
          }&userType=2&title=达人推荐&tabscurrent=${this.tabscurrent}&isShowTab=true`,
        });
      }
    },
    // changefollowType(index) {
    //   if (this.imgList[index].article.followType == 1) {
    //     this.imgList[index].article.followType = 2;
    //   } else {
    //     this.imgList[index].article.followType = 1;
    //   }
    // },
    // change(e) {
    //   let _this = this;
    //   this.articleId = this.imgList[e.detail.current].article.id;
    //   if ((e.detail.current / 8) % 1 === 0) {
    //     this.imgcurrent++;
    //     this.getimgList();
    //   }
    // },
    sendid(item) {
      this.$newrequest
        .post('coc-social/api/v1/article/findById', {
          current: 1,
          id: item.article.id,
          size: 3,
        })
        .then((res) => {
          res.data.article.imgarr = res.data.article.imgs.split(',');
          this.imgList.filter((s, i) => {
            if (s.article.id == item.article.id) {
              this.$set(this.imgList, i, res.data);
            }
          });
        });
    },
    deleteimg(id) {
      this.imgList.filter((s, i) => {
        if (s.article.id == id) {
          this.imgList.splice(i, 1);
        }
      });
    },
    detailvideo(id) {
      this.videoList.filter((s, i) => {
        if (s.article.id == id) {
          this.videoList.splice(i, 1);
        }
      });
    },
    setnewvideo(index, data) {
      this.$set(this.videoList, index, data);
    },
    likenumchange(type, index) {
      if (type == 2) {
        this.videoList[index].article.likeType = 1;
        this.videoList[index].article.likeBaseNum =
          this.videoList[index].article.likeBaseNum + 1;
      } else {
        this.videoList[index].article.likeType = 2;
        this.videoList[index].article.likeBaseNum =
          this.videoList[index].article.likeBaseNum - 1;
      }
    },
    // getmorevideo() {
    //   this.videocurrent++;
    //   this.getvideoList();
    // },
    // getotherimgList(id) {
    //   let _this = this;
    //   this.$newrequest
    //     .post('/coc-social/api/v2/article/articleList', {
    //       current: this.imgcurrent,
    //       size: 10,
    //       type: 2,
    //       articleId: id,
    //       userType: this.type === 0 && this.isShowMyLike ? 1 : 2,
    //       userId: this.newuserid,
    //     })
    //     .then((res) => {
    //       res.data.records.filter((s) => {
    //         s.article.imgarr = s.article.imgs.split(',');
    //       });

    //       res.data.records.filter((s) => {
    //         this.imgList.push(s);
    //       });
    //     });
    // },
    // getimgList() {
    //   let _this = this;
    //   if (this.imgcurrent == 1) {
    //     this.$showLoading();
    //     setTimeout(() => {
    //       _this.$hideLoading();
    //     }, 3000);
    //   }

    //   this.$newrequest
    //     .post('/coc-social/api/v2/article/articleList', {
    //       current: this.imgcurrent,
    //       size: 10,
    //       type: 2,
    //       userId: this.newuserid,
    //       userType: this.type === 0 && this.isShowMyLike ? 1 : 2,
    //     })
    //     .then((res) => {
    //       if (this.imgcurrent == 1) {
    //         this.articleId = res.data.records[0].article.id;
    //       }
    //       res.data.records.filter((s) => {
    //         s.article.imgarr = s.article.imgs.split(',');
    //       });
    //       res.data.records.filter((s) => {
    //         this.imgList.push(s);
    //       });
    //     });
    // },
    // getothervideoList(id) {
    //   let _this = this;
    //   this.$newrequest
    //     .post('/coc-social/api/v2/article/articleList', {
    //       current: this.videocurrent,
    //       size: 10,
    //       type: 1,
    //       articleId: id,
    //       userId: this.newuserid,
    //     })
    //     .then((res) => {
    //       if (this.videocurrent == 1) {
    //         _this.$refs.videolist.getonload();
    //         _this.$refs.videolist.getchangdi(res.data.records[0].article.id);
    //         res.data.records.filter((s) => {
    //           this.videoList.push(s);
    //         });
    //       }
    //     });
    // },
    // getvideoList() {
    //   let _this = this;
    //   if (this.videocurrent == 1) {
    //     if (!this.isshowpage) {
    //       this.$showLoading();
    //     }
    //   }

    //   this.$newrequest
    //     .post('/coc-social/api/v2/article/articleList', {
    //       current: this.videocurrent,
    //       size: 10,
    //       type: 1,
    //       userId: this.newuserid,
    //       userType: this.type === 0 && this.isShowMyLike ? 1 : 2,
    //     })
    //     .then((res) => {
    //       if (this.videocurrent == 1) {
    //         this.articleId = res.data.records[0].article.id;
    //         _this.$refs.videolist.getonload();
    //         _this.$refs.videolist.getchangdi(res.data.records[0].article.id);
    //         res.data.records.filter((s) => {
    //           this.videoList.push(s);
    //         });
    //       } else {
    //         res.data.records.filter((s) => {
    //           this.videoList.push(s);
    //         });
    //       }
    //     })
    //     .finally(() => {
    //       if (!this.isshowpage && this.videocurrent == 1) {
    //         this.isshowpage = true;
    //         this.$hideLoading();
    //       }
    //     });
    // },
    async getPageList() {
      await this.getList();
      console.log(this.type, this.dataList);
      if (this.type == 0 && this.dataList.length === 0) {
        //  是显示我喜欢 否显示关注
        this.isShowMyLike = false;

        this.current = 1;
        this.isLoadMore = false;
        // 显示发现的内容
        this.getList();
      }
    },
    async OnClickTags(item) {
      if (item.id === 0) {
        if (!tologin()) {
          this.tagcurrent = 0;
          setTimeout(() => {
            this.tagcurrent = 1;
          }, 1000);
          return false;
        }
      }
      this.tagcurrent = item.id;
      this.type = item.id;

      uni.pageScrollTo({
        scrollTop: 1, //距离页面顶部的距离
        duration: 0,
      });
      this.current = 1;
      this.dataList = [];
      this.articleId = null;
      this.isLoadMore = false;
      this.isarticle = true;
      this.isShowMyLike = true;
      this.relatedType = '';
      this.shopType = '';
      this.keyword = '';
      await this.getPageList();
      // if (item.id == 0) {
      //   this.current = 1;
      //   this.dataList = [];
      //   this.articleId = null;
      //   this.getList();
      // } else if (item.id == 1) {
      //   this.articleId = null;
      //   this.videocurrent = 1;
      //   this.videoList = [];
      //   this.getvideoList();
      // } else if (item.id == 2) {
      //   this.articleId = null;
      //   this.imgcurrent = 1;
      //   this.imgList = [];
      //   this.getimgList();
      // }
    },

    async OnAddpost() {
      const type = tologin();
      if (type) {
        uni.navigateTo({
          url: '/pages/wiseman/component/addimgarticle?isold=1&mustTalent=true&newType=1&isShowUploadImg=false',
        });
      }
    },
    clear() {
      this.current = 1;
      this.isLoadMore = false;
      this.dataList = [];
      this.keyword = '';
      // this.$refs.waterfallsFlowRef.refresh();
      this.getList();
    },
    tosearch(value) {
      // console.log(value, this.$refs.waterfallsFlowRef);
      this.current = 1;
      this.isLoadMore = false;
      this.dataList = [];
      this.keyword = value;
      if (this.$refs.waterfallsFlowRef) {
        this.$refs.waterfallsFlowRef.refresh();
      }
      this.getList();
    },
    async getList() {
      this.showloading = true;
      console.log(this.type);
      console.log(this.isShowMyLike);

      let url = '';
      let params = this.params;
      if (this.tabscurrent === 0 && this.type === 1) {
        url = '/coc-social/api/v2/article/getExpertRecommendBySetting';
        params = {
          articleType: 1,
          current: this.current,
          size: 10,
          title: this.keyword,
          homeMenuId: this.homeMenuId,
        };
      } else {
        url = '/coc-social/api/v2/article/expertRecommend';
        params = {
          current: this.current, // 当前页
          relatedType: this.relatedType, // 选品类型：1-活动；2-保养套餐；3-救援卡；4-团购;5-单品套餐
          size: 10,
          title: this.keyword,
          type: this.type === 0 && this.isShowMyLike ? 1 : 2, // 类型：1-关注，2-发现
          shopType: this.shopType,
          shopTypeId: this.shopTypeId,
          isShopPunch: this.isShopPunch,
          articleNewType: this.searchTabs[this.tabscurrent].value,
          // relatedId: // 选品id
          // shopId
        };
      }

      await this.$newrequest.post(url, params).then((res) => {
        if (res.data.total == 0) {
          this.isarticle = false;
        } else {
          this.isarticle = true;
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
          this.dataList = res?.data?.records || [];
        } else {
          res.data.records.filter((s) => {
            this.dataList.push(s);
          });
        }
        this.showloading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-add {
  display: flex;
  position: fixed;
  right: 0;
  bottom: 0;
  z-index: 200;
  height: 116rpx;
  width: 100%;
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231120/file_1700450258398.png');
  background-size: 100% 100%;

  image {
    height: 88rpx;
    width: 88rpx;
    margin: 0 auto;
    margin-top: 10rpx;
  }
}

.bbbbbbbb {
  position: fixed;
  top: 70px;
  z-index: 99;
  background: #fff;
  width: 100%;
}

.mybox {
  margin-top: 70px;
  // height: calc(100vh - 90px);
}

::v-deep {
  .page__head {
    .u-tabs__wrapper__nav__line {
      width: 28rpx !important;
      height: 6rpx !important;
      bottom: 10rpx !important;
    }

    .u-tabs__wrapper__nav > .u-tabs__wrapper__nav__item {
      padding: 0 20px;
    }
  }
}
</style>
<style lang="scss">
.coverPicture {
  width: 700rpx;
  height: 400rpx;
  border-radius: 10rpx;
  position: relative;
}

.kefu-contact {
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
}

button::after {
  border: initial;
}

.activity-img {
  margin-top: 20rpx;
  margin-left: 20rpx;
  margin-right: 20rpx;
  width: 710rpx;
}

.currenttab {
  color: #d91b1b;
}

.btn {
  width: 120rpx;
  height: 52rpx;
  text-align: center;
  background: linear-gradient(90deg, #d91b1b 0%, #e94040 100%);
  border-radius: 25rpx 25rpx 27rpx 25rpx;
  line-height: 52rpx;
  color: #ffffff;
}

.title {
  margin-top: 35rpx;
  font-size: 28rpx;
  width: 603rpx;
  margin-left: 25rpx;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.item-detail {
  display: flex;
  justify-content: space-between;
  margin-top: 22rpx;
  align-items: center;
  margin-left: 25rpx;
  margin-right: 26rpx;
}

.remind {
  width: 160rpx;
  height: 52rpx;
  border-radius: 26rpx;
  color: #ffffff;
  font-size: 28rpx;
  text-align: center;
  background: #d91b1b;
  line-height: 52rpx;
}

.headPortraits {
  display: flex;
  align-items: center;
  font-size: 24rpx;
}

.Asreminder {
  background-color: #999999;
}

.backimg {
  position: absolute;
  bottom: 18rpx;
  left: 20rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: rgb(34 34 34 / 0.5);
  background-color: rgba(34, 34, 34, 0.5);
  border-radius: 25rpx 25rpx 27rpx 25rpx;
  width: 120rpx;
  height: 52rpx;
}

.playitem {
  // margin: 16rpx 20rpx;
  // background-color: #ffffff;
  border-radius: 10rpx;
  padding-bottom: 20rpx;
}

.btn-project {
  font-size: 28rpx;
}

.choice {
  &-list {
    padding-top: 10rpx;
  }

  &-item {
    width: 730rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin: 0 10rpx 10rpx;

    &-top {
      display: flex;
      align-items: center;
      height: 90rpx;

      &-image {
        width: 48rpx;
        height: 48rpx;
        margin-left: 11rpx;
      }

      &-name {
        width: 180rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-left: 10rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      &-date {
        font-size: 28rpx;
        font-family: HONOR Sans CN;
        font-weight: 400;
        color: #999999;
        margin-left: 24rpx;
      }
    }

    &-image {
      width: 710rpx;
      height: 710rpx;
      border-radius: 10rpx;
      margin-left: 10rpx;
      object-fit: cover;
    }

    &-below {
      &-name {
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-left: 9rpx;
        margin-right: 9rpx;
        margin-top: 15rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 11rpx;
        margin-right: 11rpx;
        margin-top: 13rpx;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }

    &-line {
      margin-top: 20rpx;
      width: 710rpx;
      height: 1rpx;
      background: #e8e8e8;
      margin-left: 10rpx;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 60rpx;

      &-like {
        width: 36rpx;
        height: 34rpx;
        margin-left: 10rpx;
      }

      &-comment {
        width: 36rpx;
        height: 36rpx;
        margin-left: 30rpx;
      }

      &-forward {
        width: 26rpx;
        height: 26rpx;
        margin-left: 30rpx;
      }

      &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 10rpx;
      }

      &-look {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-right: 10rpx;
      }
    }

    &-video {
      position: relative;

      &-icon {
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &-image {
        width: 100rpx;
        height: 100rpx;
      }
    }
  }

  &-nodata {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-image {
      width: 267rpx;
      height: 267rpx;
      margin-top: 80rpx;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #999999;
      margin-top: 60rpx;
    }

    &-name {
      font-size: 32rpx;
      font-family: Alimama ShuHeiTi;
      font-weight: bold;
      font-style: italic;
      color: #222222;
      margin-top: 115rpx;
      margin-bottom: 25rpx;
    }
  }

  &-bottom {
    font-size: 24rpx;
    color: #999999;
    text-align: center;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
  }
}
</style>
