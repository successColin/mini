<template>
  <view class="page">
    <carousel
      :topStyle="{ marginTop: '23rpx' }"
      :radius="7"
      height="256rpx"
      urlkey="url"
      :dataType="2"
      systemCode="APPLETS_CREATIVE_CENTER_TOP"
      :indicatorType="1"
    >
    </carousel>
    <view class="joingroup flex jsb alc">
      <view class="flex alc">
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692167968026.png"
          class="join_icon"
        ></image>
        <text class="join_title">加入创作者专属VIP群</text>
      </view>
      <view class="join_btn" @click="isshow = true">加入</view>
    </view>
    <view class="inspiration" v-if="topicList.length > 0">
      <view class="inspiration_title">{{ topicTitle }}</view>
      <scroll-view class="tabs_div" :scroll-x="true">
        <view class="tabs flex alc">
          <view
            v-for="(item, index) in tagList"
            :key="index"
            class="tab_item flex alc"
            :class="{
              item_sel: curIndex === item.id,
              item_nosel: curIndex !== item.id,
            }"
            @click="selStatus(item.id)"
          >
            <view>{{ item.name }}</view>
            <view v-if="curIndex === item.id" class="item_line"></view>
          </view>
        </view>
      </scroll-view>
      <view class="inspiration_list">
        <template v-for="item in topicList">
          <view
            v-if="item.baseDataDictionaryIdContextType === curIndex"
            :key="item.id"
            class="inspiration_item flex jsb alc"
          >
            <view class="flex alc">
              <image class="item_img" :src="item.coverImage"> </image>
              <view class="item_info">
                <view class="item_title oneLine">#{{ item.title }}#</view>
                <view class="item_count oneLine">{{ item.intro }}</view>
              </view>
            </view>
            <view style="width: 127rpx" @click="jumpAddPost(item)">
              <u-button
                type="error"
                :plain="true"
                shape="circle"
                text="去发布"
                customStyle="width:127rpx;height:62rpx;color:#D91B1B;border-color:#D91B1B;font-size: 27rpx;font-weight: 400;"
              >
              </u-button>
            </view>
          </view>
        </template>
      </view>
    </view>
    <view class="card" v-for="item in dataList" :key="item.id">
      <view class="u-flex jsb" @click="() => OnPushList(item)">
        <view class="card_title">{{ item.title }}</view>
        <view>
          <u-icon name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view class="actrice_list">
        <view
          v-for="item1 in item.article"
          :key="item1.id"
          class="actrice_item u-flex jsb"
          @click="() => OnPushdetail(item1)"
        >
          <view class="article_title moreLine">{{ item1.title }} </view>
          <view style="position: relative">
            <image class="article_img" :src="item1.coverImage"></image>
            <view v-if="item1.contextType == 2">
              <image
                class="player"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230801/file_1690871065316.png"
              >
              </image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view style="height: 50rpx"></view>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="isshow"
      @close="isshow = false"
      mode="center"
    >
      <image show-menu-by-longpress mode="widthFix" :src="showimg"></image>
    </u-popup>
  </view>
</template>

<script>
import carousel from '@/components/carousel/index.vue';
export default {
  components: {
    carousel,
  },
  data() {
    return {
      curIndex: null,
      tagList: [],
      topicList: [],
      dataList: [],
      topicTitle: '',
      isshow: false,
      showimg:
        'https://oss.dcqcjlb.com/51che_java_dev/20231229/file_1703819972283.jpg',
    };
  },
  onLoad() {
    this.queryTopicList();
    this.queryActriceList();
  },
  methods: {
    selStatus(id) {
      this.curIndex = id;
    },
    //查询话题列表
    queryTopicList() {
      this.$newrequest
        .post('/coc-active/api/v1/creative/center/topic/context_type/list')
        .then((res) => {
          if (res.code === 200) {
            res.data.forEach((m) => {
              if (m.article.length > 0) {
                this.topicTitle = m.article[0].typeMsg;
                this.tagList.push({
                  id: m.baseDataDictionaryIdContextType,
                  name: m.title,
                });
                m.article.forEach((n) => {
                  this.topicList.push(n);
                });
              }
            });
            if (this.tagList.length > 0) {
              this.curIndex = this.tagList[0].id;
            }
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    //查询文章列表
    queryActriceList() {
      this.$newrequest
        .post('/coc-active/api/v1/creative/center/home', {
          isAllType: 0,
        })
        .then((res) => {
          if (res.code === 200) {
            this.dataList = res.data;
          }
        });
    },
    OnPushList(item) {
      uni.navigateTo({
        url: `/pages/wiseman/specialarea/creative_center_list?id=${item.baseDataDictionaryIdType}&title=${item.title}`,
      });
    },
    OnPushdetail(item) {
      uni.navigateTo({
        url: `/pages/wiseman/specialarea/creative_center_detail?id=${item.id}&contextType=${item.contextType}`,
      });
    },
    jumpAddPost(item) {
      uni.navigateTo({
        url: `/pages/wiseman/component/addimgarticle?content=${item.title}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 23rpx;
}

.joingroup {
  padding: 0 23rpx;
  height: 92rpx;
  background: #d91b1b;
  border-radius: 15rpx;
  margin-top: 15rpx;

  .join_icon {
    width: 46rpx;
    height: 46rpx;
  }

  .join_title {
    font-size: 27rpx;
    font-weight: 400;
    color: #ffffff;
    margin-left: 15rpx;
  }

  .join_btn {
    width: 115rpx;
    height: 54rpx;
    line-height: 54rpx;
    text-align: center;
    background: #ffffff;
    border-radius: 56rpx;
    font-size: 27rpx;
    font-weight: 500;
    color: #d91b1b;
  }
}

.inspiration {
  padding: 23rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  margin-top: 23rpx;

  .inspiration_title {
    font-size: 35rpx;
    font-weight: 500;
    color: #222222;
  }

  .tabs_div {
    margin-top: 46rpx;
    width: 658rpx;
    white-space: nowrap;

    .tabs {
      .tab_item {
        height: 30px;
        padding: 0 19rpx;
        margin-right: 8rpx;
        flex-direction: column;
        justify-content: flex-start;
      }

      .item_sel {
        font-size: 31rpx;
        font-weight: 500;
        color: #222222;
      }

      .item_nosel {
        font-size: 27rpx;
        font-weight: 400;
        color: #666666;
      }

      .item_line {
        width: 35rpx;
        height: 12rpx;
        background: linear-gradient(
          180deg,
          #d91b1b 0%,
          rgba(255, 255, 255, 0) 100%
        );
        position: relative;
        bottom: 13rpx;
      }
    }
  }

  .inspiration_list {
    .inspiration_item {
      height: 92rpx;
      margin-top: 38rpx;

      .item_img {
        width: 92rpx;
        height: 92rpx;
        border-radius: 8rpx;
      }

      .item_info {
        margin-left: 15rpx;
      }

      .item_title {
        font-size: 27rpx;
        font-weight: 500;
        color: #222222;
        max-width: 400rpx;
      }

      .item_count {
        font-size: 27rpx;
        font-weight: 400;
        color: #999999;
        margin-top: 4rpx;
        height: 40rpx;
        max-width: 400rpx;
      }
    }
  }
}

.card {
  margin-top: 23rpx;
  background-color: #ffffff;
  border-radius: 15rpx;
  padding: 23rpx;
}

.card_title {
  font-size: 35rpx;
  font-weight: 500;
  color: #222222;
}

.actrice_list {
  margin-top: 15rpx;
}

.actrice_item {
  margin-top: 23rpx;

  .article_title {
    width: 450rpx;
    height: 100%;
    font-size: 27rpx;
    font-weight: 400;
    color: #222222;
  }

  .article_img {
    width: 192rpx;
    height: 138rpx;
    border-radius: 8rpx;
  }
}

.player {
  width: 46rpx;
  height: 46rpx;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
