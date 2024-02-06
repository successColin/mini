<template>
  <view class="page">
    <view class="use">
      <view
        v-for="(v, i) in list"
        :key="i"
        class="use-item"
        @click="toClick(v)"
      >
        <image :src="v.image" :class="v.image_class" />
        <view class="use-item-title" :class="v.title_class">{{ v.title }}</view>
        <view
          v-if="menulist[v.id] && menulist[v.id].length > 0"
          class="use-item-prompt"
        >
          <noticebar
            class="use-item-prompt-noticebar"
            :notices="menulist[v.id]"
            :width="90"
            :height="43"
            :textheight="36"
          />
          <image
            class="use-item-prompt-image"
            src="@/static/image/arrowlabel.png"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import noticebar from '@/pages/home/components/noticeBar/index.vue';
import { getstorage } from '@/utils/index.js';
export default {
  components: {
    noticebar,
  },
  data() {
    return {
      menulist: {},
      list: [
        // 加
        {
          id: 'applets_group_purchase',
          url: '/pages/groupBooking/groupList',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721303615.png',
          image_class: 'w56h56',
          title: '福利拼团',
          title_class: 'mt6',
        },
        {
          id: 'applets_outdoor_activity',
          url: '/pages/activity/activityRegistration/outdoorsactivity?property=1',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693222957376.png',
          image_class: 'w56h56',
          title: '户外畅游',
          title_class: 'mt6',
        },
        {
          id: 'applets_indoor_activity',
          url: '/pages/activity/activityRegistration/indooractivity?property=2',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223102477.png',
          image_class: 'w56h56',
          title: '户内嗨乐',
          title_class: 'mt6',
        },
        {
          id: 1,
          url: '/pages/gourmetGroggery/index',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695021125305.png',
          image_class: 'w56h56',
          title: '寻味住店',
          title_class: 'mt6',
        },
        {
          id: 11,
          url: `/pages/advertisement/choice`, // id=${1}&
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698198580988.png',
          image_class: 'w56h56',
          title: '娱乐生活',
          title_class: 'mt6',
        },
        {
          id: 'applets_wise_man_recommend',
          url: '/pages/activity/activityRegistration/playfulperson',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721370724.png',
          image_class: 'w56h56',
          title: '达人推荐',
          title_class: 'mt6',
          // token: true
        },
        {
          id: 3,
          url: '/pages/roadhelp/faultAbout/faultSearch',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693536736674.png',
          image_class: 'w56h56',
          title: '故障咨询',
          title_class: 'mt6',
          token: true,
        },
        // {
        //     id: 'applets_4s_activity',
        //     url: '/pages/carShops/4sShop/index',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223201093.png',
        //     image_class: 'w56h56',
        //     title: '4S店逛逛',
        //     title_class: 'mt6'
        // },
        // 加 拿之前的道路救援
        {
          id: 10,
          url: '/pages/roadhelp/index',
          image:
            'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693536708284.png',
          image_class: 'w56h56',
          title: '救援故事',
          title_class: 'mt6',
          // token: true
        },
        // 加
        // {
        //     id: 10,
        //     url: '/pages/activity/activityRegistration/campusCulture',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698200351917.png',
        //     image_class: 'w56h56',
        //     title: '校园文化',
        //     title_class: 'mt6',
        //     token: true
        // }

        // {
        //     id: 'applets_sign_gift',
        //     url: '/pages/my/integral/index',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223545190.png',
        //     image_class: 'w56h56',
        //     title: '签到有礼',
        //     title_class: 'mt6',
        //     token: true
        // },
        // {
        //     id: 'applets_new_person',
        //     url: '/pages/grouppurchase/newpeople/index',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693269302091.png',
        //     image_class: 'w56h56',
        //     title: '新人专享',
        //     title_class: 'mt6'
        // },
        // {
        //     id: 'applets_score_shop',
        //     url: '/pages/home/integral',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720980383.png',
        //     image_class: 'w56h56',
        //     title: '积分兑换',
        //     title_class: 'mt6'
        // },
        // {
        //     id: 2,
        //     url: '/pages/grouppurchase/index?type=3',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695019431377.png',
        //     image_class: 'w56h56',
        //     title: '银行特惠',
        //     title_class: 'mt6'
        // },

        // {
        //     id: 10,
        //     url: '/pages/home/carhelp',
        //     image: 'https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693536708284.png',
        //     image_class: 'w56h56',
        //     title: '道路救援',
        //     title_class: 'mt6'
        // }
      ],
    };
  },
  props: {
    city: {
      type: String,
      default: '',
    },
  },
  onLoad() {},
  onShow() {},
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.$request
        .post('/coc-active/api/v2/homePage/menuTag/list')
        .then((res) => {
          let menulist = {};
          res.data.forEach((n) => {
            menulist[n.menuKey] = n.tag
              ? n.tag.split(',').map((m) => {
                  return {
                    text: m,
                  };
                })
              : [];
          });
          this.menulist = menulist;
        });
    },
    toClick(value) {
      if (!getstorage('token') && value.token) {
        uni.navigateTo({
          url: '/pages/activity/share/index',
        });
        return false;
      }
      uni.setStorageSync('qShopBobile', '');
      uni.setStorageSync('qShopName', '');
      uni.navigateTo({
        url: value.url,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 0rpx;
}

.use {
  display: flex;
  flex-wrap: wrap;
  width: calc(100vw - 20rpx);
  background: #ffffff;
  margin: 10rpx 10rpx;
  border-radius: 10rpx;

  &-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: calc((100vw - 20rpx) / 4);
    height: 143rpx;

    &-title {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #222222;
    }

    &-prompt {
      position: absolute;
      left: 76rpx;
      top: 3rpx;

      &-noticebar {
        width: 90rpx;
        height: 43rpx;
        position: absolute;
        top: 0;
      }

      &-image {
        width: 90rpx;
        height: 43rpx;
      }
    }
  }
}

.mt6 {
  margin-top: 6rpx;
}

.w56h56 {
  width: 56rpx;
  height: 56rpx;
}
</style>
