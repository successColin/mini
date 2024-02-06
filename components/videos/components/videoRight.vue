<template>
  <view class="right">
    <view class="right-like" @click="setLike">
      <image
        :src="value.like.status ? value.like.image : value.like.unimage"
        class="right-like-image"
      />
      <view class="right-like-title">{{ value.like.number }}</view>
    </view>
    <view class="right-comment" @click="setComment">
      <image :src="value.comment.image" class="right-comment-image" />
      <view class="right-comment-title">{{ value.comment.number }}</view>
    </view>
    <button open-type="share" class="right-share">
      <image :src="value.share.image" class="right-share-image" />
      <view class="right-share-title">{{ value.share.number }}</view>
    </button>
    <!-- v-if="value.article.userId == userId" -->
    <view
      @click="Onshowsheet"
      style="margin-left: 5rpx"
      v-if="isDel"
    >
      <u-icon
        color="#ffffff"
        size="24"
        :bold="true"
        name="more-dot-fill"
      ></u-icon>
    </view>
    <u-action-sheet
      @select="OnSelectsheet"
      @close="showsheet = false"
      :closeOnClickOverlay="true"
      :actions="list"
      :show="showsheet"
    ></u-action-sheet>
  </view>
</template>
<script>
export default {
  props: {
    details: {
      type: Object,
      default: () => {},
    },
    isDel: {
        type: Boolean,
        default: false,
    }
  },
  data() {
    return {
      showsheet: false,
      list: [
        {
          name: '贴文删除',
          color: '#D91B1B',
          fontSize: '20',
        },
        {
          name: '取消',
          fontSize: '20',
        },
      ],
      userId: '',
      value: {
        id: '',
        like: {
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692776944499.png',
          unimage:
            'https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237534362.png',
          number: 0,
          status: false,
        },
        comment: {
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237915057.png',
          number: 0,
        },
        share: {
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692237952655.png',
          number: 0,
        },
      },
    };
  },
  watch: {
    details: {
      handler(newVal, oldVal) {
        this.getDetails();
      },
    },
    deep: true,
  },
  mounted() {
    this.userId = uni.getStorageSync('userId');
    console.log('用户Id', this.userId);
    this.getDetails();
  },
  methods: {
    OnSelectsheet(e) {
      if (e.name == '贴文删除') {
        this.$request
          .post('/coc-social/api/v2/article/addArticle', {
            articleId: this.value.like.id,
            articleUserId: this.userId,
          })
          .then((res) => {
            if (res.code == 200) {
              uni.$u.toast('删除成功');
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1,
                });
              }, 1000);
            } else {
              uni.$u.toast(res.message);
            }
          });
      }
    },
    Onshowsheet() {
      this.showsheet = true;
    },
    getDetails() {
      Object.assign(this.value.like, this.details.like);
      Object.assign(this.value.comment, this.details.comment);
      Object.assign(this.value.share, this.details.share);
      console.log(this.value, this.details);
    },
    async setLike() {
      let { id, status, number, likeType } = this.value.like;
      const { code, message } = await this.$request.post(
        '/coc-system/api/v1/user_interaction/like',
        {
          id,
          isLike: status ? 2 : 1,
          likeType,
        }
      );
      if (code === 200) {
        status = !status;
        number = status ? number + 1 : number - 1;
        Object.assign(this.value.like, { id, number, status });
        this.$emit('setlike', { id, number, status });
      } else {
        message ? uni.$u.toast(message) : '';
      }
    },
    setComment() {
      this.$emit('setcomment', this.value.comment);
    },
  },
};
</script>
<style lang="scss" scoped>
.right {
  position: absolute;
  bottom: calc(310rpx + constant(safe-area-inset-bottom));
  bottom: calc(310rpx + env(safe-area-inset-bottom));
  right: 38rpx;

  &-like {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-image {
      width: 61rpx;
      height: 53rpx;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-top: 10rpx;
      margin-bottom: 16rpx;
    }
  }

  &-comment {
    display: flex;
    flex-direction: column;
    align-items: center;

    &-image {
      margin-top: 16rpx;
      width: 58rpx;
      height: 52rpx;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-top: 10rpx;
      margin-bottom: 17rpx;
    }
  }

  &-share {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;

    &-image {
      margin-top: 17rpx;
      width: 57rpx;
      height: 46rpx;
    }

    &-title {
      font-size: 24rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-top: 12rpx;
    }
  }

  &-share::after {
    border: none;
  }
}
</style>
