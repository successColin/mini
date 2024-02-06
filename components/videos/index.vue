<template>
  <view>
    <swiper
      class="swiper"
      :vertical="vertical"
      :circular="circular"
      :current="current"
      :duration="0"
      @change="change"
    >
      <swiper-item
        v-for="(v, i) in list"
        :key="i"
        @touchstart="touchStart"
        @touchend="touchEnd"
      >
        <videoPlayer ref="player" :index="v.index" :details="v.player" />
        <videoRight
          :isDel="isDel"
          :details="v.right"
          @setlike="setLike"
          @setcomment="setComment"
        />
        <videoBottom
          :details="v.bottom"
          @setfollowfriends="setFollowFriends"
          :params="value"
        />
      </swiper-item>
    </swiper>
    <videoComment
      v-if="comment"
      :details="details"
      :userId="userId"
      @submit="getComment"
      @close="setComment"
    />
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
import videoBottom from './components/videoBottom.vue';
import videoComment from './components/videoComment.vue';
import videoPlayer from './components/videoPlayer.vue';
import videoRight from './components/videoRight.vue';
export default {
  computed: {
    isDel() {
      return (
        this.value.list.params?.isDel &&
        JSON.parse(this.value.list.params.isDel)
      );
    },
  },
  components: {
    videoPlayer,
    videoRight,
    videoBottom,
    videoComment,
  },
  props: {
    vertical: {
      type: Boolean,
      default: true,
    },
    value: {
      type: Object,
      default: () => {},
    },
    type: {
      type: Number,
      default: 0,
    },
    shareObj: {
      type: Object,
      default: () => {},
    },
    tabscurrent: {
      type: Number,
      default: 0,
    },
    searchTabs: {
      type: Array,
      default: () => [],
    },
    newType: {
      type: Number,
    },
    isShowTab: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showloading: true,
      current: 0,
      index: 0,
      timer: undefined,
      rows: {
        list: [],
        total: 0,
      },
      list: [],
      circular: false,
      params: {
        current: 1,
        size: 10,
      },
      look: [],
      comment: false,
      details: {},
      userId: '',
      touchStartX: 0,
      tabI: 0,
    };
  },
  mounted() {
    const {
      details: { params },
    } = this.value;
    console.log(params);
    if (params.id) {
      this.getDetails();
    } else {
      this.getList();
    }
    this.getUser();
    this.tabI = this.tabscurrent;
    console.log('value志====》', this.value, this.value.list.params.isDel);
  },
  methods: {
    touchStart(e) {
      this.touchStartX = e.touches[0].clientX;
    },
    touchEnd(e) {
      if (!this.isShowTab) return;
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
        if (this.tabscurrent === 0) return;
        this.tabI = this.tabscurrent - 1;
        this.$emit('update:tabscurrent', this.tabI);
      } else {
        if (this.tabscurrent === this.searchTabs.length - 1) return;
        this.tabI = this.tabscurrent + 1;
        this.$emit('update:tabscurrent', this.tabI);
      }
      this.params.current = 1;
      this.list = [];
      this.rows.list = [];
      this.rows.total = 0;

      this.refreshFun(this.searchTabs[this.tabI].value);
    },
    refreshFun(val) {
      this.tabI = val;
      this.params.current = 1;
      this.list = [];
      this.rows.list = [];
      this.rows.total = 0;
      this.index = 0;
      this.current = 0;
      this.getList(val);
    },
    async getDetails() {
      try {
        this.$showLoading();
        const {
          details: { params, url },
        } = this.value;
        const { code, data, message } = await this.$request.post(url, params);
        console.log(code, data, message, 'getDetails');
        if (code === 200) {
          let url = '';
          const v = data.article || data;
          console.log(v);
          if (v.imgs) {
            url = v.imgs.split(',')[0];
          } else if (v.coverImage) {
            url = v.coverImage;
          } else if (v.video) {
            url = v.video + '?x-oss-process=video/snapshot,t_1000,m_fast';
          }
          this.$emit('update:shareObj', {
            content: v.title,
            url,
          });
          if (this.type === 1) {
            this.setArticleDetails(data);
          } else if (this.type === 2) {
            this.setBackstageDetails(data);
          }
          this.getList();
        } else {
          this.$hideLoading();
          uni.$u.toast(message);
        }
      } catch (error) {
        console.log(error, 'error');
        uni.$u.toast(error);
        this.$hideLoading();
      }
    },
    async getList(tabsType) {
      try {
        const {
          list: { params, url },
        } = this.value;
        const { highArticleId, temporaryId } = params;
        if (tabsType || tabsType == 0) {
          this.showloading = true;
          params.articleId = '';
          if (this.newType === 1) {
            params.articleNewType = tabsType;
          } else if (this.newType === 2) {
            params.entertainmentSiftCategoryId = tabsType;
          }
        } else {
          if (this.tabscurrent) {
            const type =
              (this.searchTabs.length !== 0 &&
                this.searchTabs[this.tabI]?.value) ||
              '';
            if (this.newType === 1) {
              params.articleNewType = type;
            } else if (this.newType === 2) {
              params.entertainmentSiftCategoryId = type;
            }
          }
        }
        if (
          this.searchTabs.length !== 0 &&
          this.searchTabs[this.tabI]?.value === 0
        ) {
          params.isRecommend = 1;
        } else {
          params.isRecommend = '';
        }

        const { code, data, message } = await this.$request.post(
          url,
          Object.assign(this.params, params)
        );
        console.log(code, data, message, 'getList');
        if (tabsType !== '') {
          this.showloading = false;
        }
        if (code === 200) {
          let { records, total } = data;
          if (highArticleId && temporaryId) {
            records = data;
          }
          records.forEach((v) => {
            if (highArticleId && temporaryId) {
              this.rows.total = 999999;
              if (v.videoDetailsVO) {
                this.setBackstageDetails(v.videoDetailsVO);
              } else {
                this.setArticleDetails(v);
              }
            } else {
              if (this.type === 1) {
                this.setArticleDetails(v);
              } else if (this.type === 2) {
                this.setBackstageDetails(v);
              }
            }
          });
          this.rows.total = total;
          if (highArticleId && temporaryId) {
            this.rows.total = 999999;
          }
          this.initSwiper();
        } else {
          uni.$u.toast(message);
        }
        this.$hideLoading();
      } catch (error) {
        console.log(error, 'error');
        uni.$u.toast(error);
        this.$hideLoading();
      }
    },
    getUser() {
      const userId = uni.getStorageSync('userId');
      if (userId) {
        this.userId = userId * 1;
      }
    },
    setArticleDetails(value) {
      const { article, comments, expertShopSelection, expertSelectionLibrary } =
        value;
      const {
        id,
        video,
        content,
        name,
        followType,
        address,
        shopPunchClock,
        likeType,
        likeBaseNum,
        commentNum,
        shareBaseNum,
        userId,
        userStatus,
        isExpert,
        expertStatus,
        lat,
        lng,
        shopPunchClockId,
        isOriginal,
        expertTagsVOList,
      } = article;
      const player = { id, video };
      const bottom = {
        content,
        name,
        followfriends: followType === 1,
        address,
        business: { id: shopPunchClockId, content: shopPunchClock },
        groupbuy: {},
        userId,
        userStatus,
        isExpert,
        expertStatus,
        latitude: lat,
        longitude: lng,
        isOriginal,
        expertTagsVOList,
      };
      const {
        like: { type },
      } = this.value;
      const right = {
        like: {
          id: id,
          number: likeBaseNum,
          status: likeType === 1,
          likeType: type,
        },
        comment: {
          id,
          number: commentNum,
          commentType: [2, 4],
          list: this.getCommentList(comments),
        },
        share: { number: shareBaseNum },
      };

      // 活动数据
      if (expertShopSelection) {
        const { type, relatedId, shopTypeId, relatedName } =
          expertShopSelection;
        bottom.groupbuy.type = type;
        bottom.groupbuy.id = relatedId;
        bottom.groupbuy.shopTypeId = shopTypeId;
        bottom.groupbuy.content = relatedName;
      } else if (expertSelectionLibrary) {
        const { type, relatedId, shopId, shopTypeId, relatedName } =
          expertSelectionLibrary;
        bottom.groupbuy.type = type;
        bottom.groupbuy.id = relatedId;
        bottom.groupbuy.shopId = shopId;
        bottom.groupbuy.shopTypeId = shopTypeId;
        bottom.groupbuy.content = relatedName;
      } else {
        bottom.groupbuy.type = '';
        bottom.groupbuy.id = '';
        bottom.groupbuy.shopId = '';
        bottom.groupbuy.shopTypeId = '';
        bottom.groupbuy.content = '';
      }
      this.rows.list.push({
        index: this.rows.list.length,
        player,
        right,
        bottom,
      });
    },
    setBackstageDetails(value) {
      const {
        id,
        shopId,
        videoUrl,
        likeNum,
        likeType,
        commentNum,
        comments,
        shareNum,
        content,
        shopName,
        address,
        relatedId,
        relatedName,
        relatedType,
      } = value;
      const player = { id, video: videoUrl };
      const {
        like: { type },
      } = this.value;
      const right = {
        like: {
          id: id,
          number: likeNum,
          status: likeType === 1,
          likeType: type,
        },
        comment: {
          id,
          number: commentNum,
          commentType: [5, 4],
          list: this.getCommentList(comments),
        },
        share: { number: shareNum },
      };
      const bottom = {
        name: value.type === 4 ? shopName : '51车俱乐部',
        content,
        followfriends: -1,
        address,
        business: {},
        groupbuy: {},
        shopId,
        type: value.type,
      };
      if (relatedId) {
        bottom.groupbuy.type = relatedType;
        bottom.groupbuy.id = relatedId;
        bottom.groupbuy.shopId = shopId;
        bottom.groupbuy.shopTypeId = '';
        bottom.groupbuy.content = relatedName;
      } else {
        bottom.groupbuy.type = '';
        bottom.groupbuy.id = '';
        bottom.groupbuy.shopId = '';
        bottom.groupbuy.shopTypeId = '';
        bottom.groupbuy.content = '';
      }
      this.rows.list.push({
        index: this.rows.list.length,
        player,
        right,
        bottom,
      });
    },
    async change({ detail: { current } }) {
      clearTimeout(this.timer);
      const all_list = this.rows.list;
      const all_length = this.rows.list.length;
      if (this.current - current === 2 || this.current - current === -1) {
        this.index = this.index + 1 === all_length ? 0 : this.index + 1;
        this.current = this.current + 1 === 3 ? 0 : this.current + 1;
        console.log(
          '1',
          'current:' + current,
          'this.index:' + this.index,
          'this.current:' + this.current
        );
        await this.initSwiper();
        this.list.forEach((v, i) => {
          this.$refs.player[i].pause();
        });
        this.timer = setTimeout(() => {
          this.$refs.player[current].play();
        }, 10);
      } else if (
        this.current - current === -2 ||
        this.current - current === 1
      ) {
        this.index = this.index - 1 === -1 ? all_length - 1 : this.index - 1;
        this.current = this.current - 1 === -1 ? 2 : this.current - 1;
        console.log(
          '2',
          'current:' + current,
          'this.index:' + this.index,
          'this.current:' + this.current
        );
        await this.initSwiper();
        this.list.forEach((v, i) => {
          this.$refs.player[i].pause();
        });
        this.timer = setTimeout(() => {
          this.$refs.player[current].play();
        }, 10);
      }
      if (this.index + 3 >= all_length && this.rows.total > all_length) {
        this.params.current += 1;
        await this.getList();
      }
      uni.$emit('videoDetails', all_list[this.index]);
    },
    initSwiper() {
      const all_list = this.rows.list;
      const all_length = this.rows.list.length;
      const list = [];
      list[this.current] = all_list[this.index];
      list[this.current - 1 === -1 ? 2 : this.current - 1] =
        all_list[this.index - 1 === -1 ? all_length - 1 : this.index - 1];
      list[this.current + 1 === 3 ? 0 : this.current + 1] =
        all_list[this.index + 1 === all_length ? 0 : this.index + 1];
      this.list = list;

      if (this.look.indexOf(this.index) === -1) {
        this.look.push(this.index);
      }
      if (this.look.length === this.rows.list.length) {
        // uni.$u.toast("您已刷完所有视频,现在是重复数据");
        this.circular = true;
      } else if (this.index === 0) {
        this.circular = false;
      } else {
        this.circular = true;
      }
    },
    setLike(like) {
      const list = this.rows.list;
      list.forEach((v) => {
        if (v.right.like.id === like.id) {
          v.right.like = like;
        }
      });
    },
    setComment(value) {
      this.comment = !this.comment;
      this.details = value;
    },
    setFollowFriends(bottom) {
      const list = this.rows.list;
      list.forEach((v) => {
        if (v.bottom.userId === bottom.userId) {
          v.bottom.followfriends = bottom.followfriends;
        }
      });
    },
    async getComment(value) {
      try {
        const {
          details: { url },
        } = this.value;
        const { code, data, message } = await this.$request.post(url, value);
        console.log(code, data, message, 'getComment');
        if (code === 200) {
          const { article, comments, commentNum } = data;
          const list = this.rows.list;
          list.forEach((v) => {
            if (v.right.comment.id === value.id) {
              v.right.comment.number = commentNum || article.commentNum;
              v.right.comment.list = this.getCommentList(comments);
              this.details = v.right.comment;
            }
          });
          console.log(this.details, 'getComment');
        } else {
          uni.$u.toast(message);
        }
      } catch (error) {
        console.log(error, 'error');
        uni.$u.toast(error);
      }
    },
    getCommentList(comments) {
      const commentList = [];
      console.log(comments, 'comments');
      comments.forEach((v) => {
        const {
          commentId,
          userId,
          headImg,
          userName,
          userIpProvince,
          commentTime,
          content,
          imgs,
          replyVOS,
        } = v;
        const children = [];
        replyVOS.forEach((val) => {
          const {
            commentId,
            userId,
            headImg,
            userName,
            userIpProvince,
            commentTime,
            content,
            imgs,
          } = val;
          children.push({
            id: commentId,
            userId,
            head: headImg,
            name: userName,
            location: userIpProvince,
            time: commentTime,
            content,
            image: imgs,
          });
        });
        commentList.push({
          id: commentId,
          userId,
          head: headImg,
          name: userName,
          location: userIpProvince,
          time: commentTime,
          content,
          image: imgs,
          children,
        });
      });
      return commentList;
    },
    async setShare(shareType) {
      const all_list = this.rows.list;
      const {
        player: { id },
      } = all_list[this.index];
      console.log(id, shareType, 'setShare');
      const { code, message } = await this.$request.post(
        '/coc-system/api/v1/user_interaction/share',
        {
          id,
          shareType,
        }
      );
      if (code === 200) {
        all_list[this.index].right.share.number += 1;
      } else {
        uni.$u.toast(message);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.swiper {
  width: 100vw;
  height: 100vh;
}
</style>
