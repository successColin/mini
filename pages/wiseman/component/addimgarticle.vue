<template>
  <view class="page">
    <view class="u-flex">
      <view>
        <view v-if="fileList1.length > 0">
          <scroll-view scroll-x="true" scroll-left="0" style="width: 700rpx">
            <view class="u-flex">
              <view
                v-for="(item, index) in fileList1"
                :key="index"
                class="mr20"
                style="position: relative"
              >
                <image
                  :src="item.url"
                  style="width: 210rpx; height: 210rpx"
                ></image>
                <view class="deleteimg">
                  <image
                    @click.stop="ondeleteimg(index)"
                    style="width: 38rpx; height: 38rpx"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694502983613.png"
                  >
                  </image>
                </view>
              </view>
            </view>
          </scroll-view>
        </view>
        <u-upload
          v-if="
            fileList2.length == 0 && fileList1.length == 0 && isShowUploadImg
          "
          width="80"
          height="80"
          :compressed="false"
          sizeType="compressed "
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="9"
        >
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20230503/file_1683092299818.png"
            mode="widthFix"
            style="width: 160rpx; height: 160rpx"
          ></image>
        </u-upload>
        <u-upload
          v-else-if="
            fileList2.length == 0 && fileList1.length != 0 && isShowUploadImg
          "
          sizeType="compressed "
          :compressed="false"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="9"
          class="mt20"
        >
          <view class="btn-addimg"> 添加照片 </view>
        </u-upload>
      </view>

      <view class="ml20">
        <u-upload
          v-if="fileList1.length == 0 && fileList2.length == 0 && !coverImg"
          width="113"
          height="113"
          :compressed="false"
          sizeType="compressed "
          :fileList="fileList2"
          @afterRead="afterReadvideo"
          @beforeRead="handleBeforeRead"
          @delete="deletePicvideo"
          name="2"
          multiple
          :maxCount="1"
          accept="video"
        >
          <image
            src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692435279788.png"
            mode="widthFix"
            style="width: 160rpx; height: 166rpx"
          ></image>
        </u-upload>

        <view v-else-if="fileList2.length == 1 && coverImg">
          <view>
            <image
              mode="widthFix"
              style="width: 226rpx"
              :src="coverImg"
            ></image>
          </view>
          <view class="u-flex mt10">
            <view>
              <u-upload
                width="113"
                height="113"
                sizeType="compressed "
                @afterRead="afterReadvideo"
                :compressed="false"
                name="2"
                multiple
                accept="video"
              >
                <view class="btn-addimg">更换视频</view>
              </u-upload>
            </view>
            <view class="u-flex btn-addimg ml10" @click="previewvideo">
              <view>
                <image
                  style="width: 21rpx; height: 23rpx"
                  src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694504523028.png"
                >
                </image>
              </view>
              <view style="margin-left: 14rpx">预览视频</view>
            </view>
            <view class="btn-cover" @click="Onchangecover"> 更换封面 </view>
          </view>
        </view>
      </view>
    </view>
    <view style="margin-top: 30rpx">
      <u--input
        placeholderStyle="color:#999999"
        fontSize="20"
        maxlength="14"
        v-model="dataList.title"
        placeholder="填写标题"
        border="none"
        clearable
      >
      </u--input>
    </view>
    <view style="margin-bottom: -18rpx">
      <u-divider placeholderStyle="color:#999999" :text="null"></u-divider>
    </view>

    <view style="margin-left: -18rpx; margin-top: -18prx">
      <u--textarea
        :customStyle="{ backgroundColor: '#f8f8f8' }"
        maxlength="-1"
        border="none"
        v-model="dataList.content"
        placeholder="添加正文笔记容易获得更多点赞哦~"
      >
      </u--textarea>
    </view>
    <view class="talk" @click="OnAddtalk(1)"> # 话题 </view>
    <view class="card">
      <view class="u-flex jsb">
        <view class="u-flex alc">
          <view>
            <image
              style="width: 20rpx; height: 20rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694508683335.png"
            >
            </image>
          </view>
          <view class="size28 fwb" style="margin-left: 6rpx">添加话题</view>
          <view class="size24 txtLighGray">（推荐）</view>
        </view>
      </view>
      <view class="u-flex mt30" style="flex-wrap: wrap">
        <view
          v-for="(item, index) in topicList"
          :key="index"
          class="mr20 top-style mb10"
          @click="OnAddtalk(item)"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <view class="card u-flex jsb alc">
      <view class="u-flex alc" style="width: calc(100% - 260rpx)">
        <view>
          <image
            style="width: 15rpx; height: 24rpx"
            src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694510640310.png"
          >
          </image>
        </view>
        <view class="u-flex alc" v-if="isShowAddressTitle">
          <view class="size28 fwb" style="margin-left: 6rpx">你在哪里</view>
          <view class="size24 txtLighGray">（让更多人看到）</view>
        </view>
        <view
          v-else
          class="size28 oneLine"
          style="margin-left: 6rpx; width: calc(100% - 50rpx)"
        >
          {{ dataList.address ? dataList.address : dataList.shopPunchClock }}
        </view>
      </view>
      <view
        class="position__btn"
        style="margin-right: 10rpx"
        @click="Onchooseadress"
      >
        实时位置
      </view>
      <!-- mustTalent 达人推荐的意思 -->
      <view class="position__btn" v-if="mustTalent" @click="handleMerchant"
        >商家打卡</view
      >

      <!-- <view>
				<u-icon name="arrow-right" size="12" color="#999999"></u-icon>
			</view> -->
    </view>

    <view v-if="newType === 2 || newType === 3" class="card">
      <view class="u-flex jsb">
        <view class="u-flex alc">
          <view>
            <image
              style="width: 20rpx; height: 20rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694508683335.png"
            >
            </image>
          </view>
          <view class="size28 fwb" style="margin-left: 6rpx">内容分类</view>
          <view class="size24 txtLighGray">（推荐）</view>
        </view>
      </view>
      <view class="u-flex mt30" style="flex-wrap: wrap">
        <view
          v-for="(v, i) in tablist"
          :key="i"
          :class="['mr10 mb10', v.status ? 'tabs-style' : 'tabs-unstyle']"
          @click="setTabsList(v)"
        >
          {{ v.label }}
        </view>
      </view>
    </view>

    <view
      v-if="
        (isExpert == 1 && newType === 0) || (isExpert == 1 && newType === 1)
      "
    >
      <view
        class="card u-flex jsb alc"
        v-if="commissionPrice == 1 || isshowcommissionPrice"
        @click="OnPushshop(0)"
      >
        <view class="u-flex alc">
          <view>
            <image
              style="width: 20rpx; height: 20rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694510816065.png"
            >
            </image>
          </view>
          <view class="u-flex alc" v-if="isshow">
            <view class="size28 fwb" style="margin-left: 6rpx">添加带货</view>
            <view class="size24 txtLighGray"
              >（快去选择达人小店的商品带货吧）</view
            >
          </view>
          <view v-else class="size28" style="margin-left: 6rpx">
            {{ citename }}
          </view>
        </view>

        <view>
          <u-icon name="arrow-right" size="12" color="#999999"></u-icon>
        </view>
      </view>
    </view>
    <view
      v-if="
        (isExpert == 1 && newType === 0) || (isExpert == 1 && newType === 1)
      "
    >
      <view
        class="card u-flex jsb alc"
        v-if="commissionPrice == 0 || isshowcommissionPrice"
        @click="OnPushshop(1)"
      >
        <view class="u-flex alc">
          <view>
            <image
              style="width: 20rpx; height: 20rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694510816065.png"
            >
            </image>
          </view>
          <view class="u-flex alc" v-if="isshow">
            <view class="size28 fwb" style="margin-left: 6rpx">分享好物</view>
            <view class="size24 txtLighGray"
              >（丰富贴文寻找志同道合的伙伴）</view
            >
          </view>
          <view v-else class="size28" style="margin-left: 6rpx">
            {{ citename }}
          </view>
        </view>

        <view>
          <u-icon name="arrow-right" size="12" color="#999999"></u-icon>
        </view>
      </view>
    </view>

    <view class="card">
      <view class="u-flex jsb">
        <view class="u-flex alc">
          <view>
            <image
              style="width: 20rpx; height: 20rpx"
              src="https://oss.dcqcjlb.com/51che_java_dev/20240122/file_1705901631379.png"
            >
            </image>
          </view>
          <view class="size28 fwb" style="margin-left: 6rpx">原创说明</view>
        </view>
        <u-switch
          activeColor="#D91B1B"
          v-model="dataList.isOriginal"
          :activeValue="1"
          :inactiveValue="0"
          :size="16"
        ></u-switch>
      </view>
      <view
        class="u-flex mt30"
        style="
          flex-wrap: wrap;
          font-size: 24rpx;
          font-family: PingFang SC;
          font-weight: 500;
          color: #222222;
        "
      >
        声明后视频将展示原创标记， 我已阅读并同意
        <span style="color: #d91b1b" @click="handleJumpXuzhi"
          >《原创声明须知》</span
        >如滥用声明，平台将做下架处理
      </view>
    </view>

    <view style="height: 500rpx"></view>
    <view class="release">
      <text @click="OnSend">发布帖子</text>
    </view>

    <u-toast ref="uToast"></u-toast>
    <!-- <view style="position: fixed; top: 800rpx; left: 50%"><u-loading-icon :show="showload"></u-loading-icon></view> -->

    <view>
      <cardauthentication
        @setshowpop="showpop = false"
        :showpop="showpop"
      ></cardauthentication>
    </view>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="showvideopop"
      @close="showvideopop = false"
      mode="center"
    >
      <video :loop="true" :src="fileList2[0].url"></video>
    </u-popup>
    <!-- 达人 -->
    <u-modal
      :show="masterShow"
      content="升级51车达人俱乐部，开启赚钱之旅"
      title="升级达人"
    >
      <view slot="confirmButton" style="display: flex; margin: 0 51px">
        <u-button
          shape="circle"
          :customStyle="{
            width: '148rpx',
            backgroundColor: '#999999',
            color: '#fff',
          }"
          @click="closeModal"
        >
          再看看
        </u-button>
        <u-button
          shape="circle"
          :customStyle="{
            width: '148rpx',
            backgroundColor: '#D91B1B;',
            color: '#fff',
          }"
          @click="handleUpgrades"
        >
          去升级
        </u-button>
      </view>
    </u-modal>
    <!-- 上传进度百分比 -->
    <u-modal :show="showLoading" title="上传进度" :show-confirm-button="false">
      <view class="u-update-content">
        <u-loading mode="flower"></u-loading>
        <view>预计上传时间: {{ totalPercentage }}s</view>
        <view class="mt20"
          >上传进度:
          <text class="mainRed ml10 size32">{{ percentage }}%</text></view
        >
        <view
          class="addimgarticle__btn"
          :style="[
            percentage == 100 && videoUrl
              ? { background: '#D91b1b', color: '#ffffff' }
              : '',
          ]"
          @click="handleJump"
        >
          设置封面
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import cardauthentication from '@/components/cardauthentication.vue';
import { setstorage, tologin } from '@/utils/index.js';
export default {
  components: {
    cardauthentication,
  },
  data() {
    return {
      videoTime: 0,
      videoUrl: '',
      coverImageType: 2, // 1-横屏；2-竖屏

      mustTalent: false,
      masterShow: false,
      showLoading: false,
      percentage: 0,
      totalPercentage: 0,
      isshowcommissionPrice: true,
      topicList: [],
      isExpert: 0,
      showpop: false,
      shoptitle: '',
      shopid: '',
      activityid: null,
      activitytitle: '',
      groupid: null,
      grouptitle: '',
      type: null,
      isshow: true,
      istrue: true,
      showload: false,
      dataList: {
        title: '',
        content: '',
        showType: '1',
        imgs: [],
        isInsertVote: 0,
        votesTitle: '',
        duration: '',
        lat: '',
        lng: '',
        address: '添加地点',
        video: '',
        shopPunchClock: '',
        shopPunchClockId: '',
        isOriginal: 1,
      },
      commissionPrice: null,
      citename: '',
      fileList2: [],
      isold: 0,
      fileList1: [],
      showvideopop: false,
      newType: 0,
      tablist: [],
      pageType: 10,
      isShowUploadImg: true,
      coverImg: '',
    };
  },
  onLoad(option) {
    let _this = this;
    if (option.isShowUploadImg) {
      this.isShowUploadImg = JSON.parse(option.isShowUploadImg);
    }
    if (option.type) {
      this.pageType = option.type;
    }
    // 必须是达人、达人推荐中的
    if (option.mustTalent) {
      this.mustTalent = option.mustTalent;
    }
    if (option.content) {
      this.dataList.content = '#' + option.content;
    }
    if (option.citeId) {
      this.dataList.citeId = option.citeId;
      this.dataList.citeType = 10;
      this.citename = option.citename;
      this.isshow = false;
    }
    if (option.isold) {
      this.isold = 1;
    }
    if (option.newType) {
      this.newType = option.newType * 1;
      this.dataList.newType = option.newType * 1;
      this.isold = 1;
    }
    // 不敢改你们代码，先走校园文化
    // if (option.newType == 3) {
    //     this.dataList.newType = option.newType;
    // }

    this.getIsExpert();

    uni.$on('drxdrelease', function (data) {
      console.log(data);
      _this.isshow = false;
      if (data.commissionPrice == 0) {
        _this.dataList.citeType = 11;
      } else if (data.commissionPrice > 0) {
        _this.dataList.citeType = 10;
      }
      _this.dataList.citeId = data.citeId;
      _this.citename = data.citename;
      _this.commissionPrice = data.commissionPrice;
      _this.isshowcommissionPrice = false;
    });
    if (option.commissionPrice) {
      _this.isshowcommissionPrice = false;
      _this.commissionPrice = option.commissionPrice;
    }
    this.gettopicList();
    this.getTabsList();

    uni.$on('getCover', (params) => {
      _this.giveParams(params);
    });
  },

  destroyed() {
    uni.$off('getCover');
  },
  onShow() {},
  computed: {
    isShowAddressTitle() {
      if (
        this.dataList.address ||
        this.dataList.shopPunchClock ||
        this.dataList.shopPunchClockId
      ) {
        return false;
      }
      return true;
    },
    coverParams() {
      if (this.videoUrl) {
        return `/pages/wiseman/component/coverImg?time=${this.videoTime}&url=${this.videoUrl}`;
      }
    },
  },
  watch: {
    coverImg(v) {
      if (v) {
        this.showLoading = false;
      } else {
        this.showLoading = true;
      }
    },
  },
  methods: {
    handleJumpXuzhi() {
      uni.navigateTo({
        url: '/pages/home/webview?myUrl=https://m.dcqcjlb.com/pages/agreement/originalStatement/index',
      });
    },
    giveParams(obj) {
      let data = JSON.parse(JSON.stringify(obj));
      console.log(data);
      this.coverImg = data.showImage;
      this.coverImageType = data.coverImageType;
    },
    // 获取是否是达人
    async getIsExpert() {
      const isToken = tologin();
      if (isToken) {
        await this.$request.post('/coc-active/api/v1/my/index').then((res) => {
          setstorage('isExpert', res.data.isExpert);
          this.isExpert = res.data.isExpert;
          if (res.data.isExpert != 1 && this.mustTalent) {
            this.masterShow = true;
          }
        });
      }
    },

    otherFun(name, id) {
      if ((name, id)) {
        this.dataList.shopPunchClock = name;
        this.dataList.shopPunchClockId = id;
        this.dataList.address = '';
      }
    },
    handleMerchant() {
      uni.navigateTo({
        url: '/pages/wiseman/xuanpinguangchang/merchantPunch',
      });
    },
    async getTabsList() {
      const { data } = await this.$request.post(
        '/coc-system/api/v1/system/base_info/list',
        { type: this.pageType }
      );
      const list = [];
      data.forEach((v) => {
        list.push({ value: v.id, label: v.title, status: false });
      });
      this.tablist = list;
    },
    setTabsList(value) {
      this.tablist.forEach((v) => {
        if (JSON.stringify(v) === JSON.stringify(value)) {
          v.status = true;
        } else {
          v.status = false;
        }
      });
      this.dataList.entertainmentSiftCategoryId = value.value;
    },
    handleUpgrades() {
      console.log('去升级');
      uni.navigateTo({
        url: '/pages/wiseman/welcome',
      });
    },
    closeModal() {
      uni.navigateBack({
        delta: 1,
      });
    },
    gettopicList() {
      // 这个接口改成
      this.$request
        .post('/coc-system/api/v1/system/article/topic/list', {
          newType: this.newType,
          current: 1,
          size: 100,
        })
        .then((res) => {
          res.data.forEach((v) => {
            this.topicList.push('# ' + v.topic);
          });
        });
      // this.$request.post('/coc-social/api/v2/article/topicList').then((res) => {
      //     res.data.filter((s) => {
      //         this.topicList.push('# ' + s);
      //     });
      // });
    },
    previewvideo() {
      this.showvideopop = true;
    },
    OnPushshop(index) {
      if (index == 1) {
        uni.navigateTo({
          url: '/pages/wiseman/component/sharegoods',
        });
      } else {
        uni.navigateTo({
          url: '/pages/wiseman/darenxiaodian/my?release=1&isCommissionPrice=0',
        });
      }
    },
    Onchooseadress() {
      let _this = this;
      uni.chooseLocation({
        success: function (res) {
          console.log(res);
          _this.dataList.lat = res.latitude;
          _this.dataList.lng = res.longitude;
          _this.dataList.address = res.name;
        },
      });
    },
    OnAddtalk(item) {
      if (item == 1) {
        this.dataList.content = this.dataList.content + '#';
      } else {
        this.dataList.content = this.dataList.content + item;
      }
    },
    OnAgain() {
      // 转跳我的小店
    },

    save() {
      if (this.dataList.content.charAt(0) === '#') {
        this.dataList.topic = this.dataList.content.substring(1);
      }
      this.$request
        .post('/coc-social/api/v2/article/add', this.dataList)
        .then((res) => {
          if (res.code == 200) {
            this.showload = false;
            if (this.isold == 0) {
              this.$refs.uToast.show({
                message: '发布成功',
                type: 'success',
                complete() {
                  uni.redirectTo({
                    url: '/pages/wiseman/mywork',
                  });
                },
              });
            } else if (this.newType === 2) {
              this.$refs.uToast.show({
                message: '发布成功',
                type: 'success',
                complete() {
                  uni.redirectTo({
                    url: '/pages/advertisement/choice',
                  });
                },
              });
            } else if (this.newType === 3 || this.newType === 1) {
              this.$refs.uToast.show({
                message: '发布成功',
                type: 'success',
                complete() {
                  // uni.redirectTo({
                  //     url: '/pages/activity/activityRegistration/campusCulture',
                  // });
                  var pages = getCurrentPages();
                  var prevPage = pages[pages.length - 2]; //上一个页面
                  prevPage.$vm.tosearch(); //重点$vm
                  uni.navigateBack();
                },
              });
            } else {
              this.$refs.uToast.show({
                message: '发布成功',
                type: 'success',
                complete() {
                  uni.redirectTo({
                    url: '/pages/activity/activityRegistration/playfulperson',
                  });
                },
              });
            }
          } else {
            this.showload = false;
            this.istrue = true;
            this.$refs.uToast.show({
              message: res.message,
              type: 'error',
            });
          }
        });
    },
    Onchangecover() {
      uni.navigateTo({
        url: this.coverParams,
      });
      // let _this = this;
      // uni.chooseImage({
      //   count: 1,
      //   sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      //   success: function (imgdata) {
      //     // console.log(imgdata);

      //     // wx.getImageInfo({
      //     //   src: imgdata.tempFilePaths[0],
      //     //   success: function (res) {
      //     //     console.log(res);
      //     //   },
      //     // });

      //     _this.$newrequest.get('/coc-file/api/v1/oss/policy').then((res) => {
      //       uni.uploadFile({
      //         url: 'https://oss.dcqcjlb.com/',
      //         filePath: imgdata.tempFilePaths[0],
      //         name: 'file',
      //         formData: {
      //           key: res.data.dir + imgdata.tempFilePaths[0].split('/')[2],
      //           policy: res.data.policy,
      //           OSSAccessKeyId: res.data.accessid,
      //           signature: res.data.signature,
      //           success_action_status: '200',
      //         },
      //         success: function (res1) {
      //           let obj = {
      //             coverImage:
      //               'https://oss.dcqcjlb.com/' +
      //               res.data.dir +
      //               imgdata.tempFilePaths[0].split('/')[2],
      //             message: '',
      //             status: 'success',
      //             url: _this.fileList2[0].url,
      //           };
      //           _this.$set(_this.fileList2, 0, obj);
      //         },
      //       });
      //     });
      //   },
      // });
    },
    uploadFilePromise() {
      let _this = this;
      this.showload = true;
      if (this.fileList1.length > 0) {
        _this.dataList.imgs = [];
      } else {
        delete this.dataList.imgs;
      }

      this.fileList1.filter((s, i) => {
        s.index = i;
      });
      let arrimg = [];
      let arrvideo = [];
      if (this.fileList1.length > 0) {
        this.fileList1.filter((s) => {
          _this.dataList.imgs.push(s.url);
        });
        this.save();
      } else if (this.fileList2.length > 0) {
        _this.dataList.video = this.fileList2[0].url;
        _this.dataList.coverImage = this.coverImg;
        _this.dataList.coverImageType = this.coverImageType;

        this.save();
      }
    },
    OnSend() {
      if (this.istrue) {
        console.log(this.fileList2);
        if (this.fileList1.length == 0 && this.fileList2.length == 0) {
          this.$refs.uToast.show({
            message: '发布贴文最少添加一张图片或视频',
          });
          return false;
        }
        if (!this.dataList.title) {
          this.$refs.uToast.show({
            message: '请填写标题',
          });
          return false;
        }
        if (uni.getStorageSync('isCertify') != 1) {
          this.showpop = true;
          return false;
        }
        this.istrue = false;
        this.uploadFilePromise();
      } else {
        return false;
      }
    },
    OnChoose(index) {
      this.dataList.showType = index;
    },
    ondeleteimg(index) {
      this.fileList1.splice(index, 1);
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 删除视频
    deletePicvideo(event) {
      this.fileList2 = [];
    },
    handleBeforeRead(event) {
      this.showLoading = true;
      this.videoTime = event.file[0].duration;
      if (event.file[0].size / 1024 / 1024 > 500) {
        uni.$u.toast('视频大小不能超过500mb');
        return false;
      }
      if (event.file[0].duration > 300) {
        uni.$u.toast('请将视频控制在5分钟内');
        return false;
      }
      if (event.file[0].duration < 15) {
        uni.$u.toast('视频需大于15s');
        return false;
      }
    },
    afterReadvideo(event) {
      console.log(event);
      this.videoTime = event.file[0].duration;
      let _this = this;
      _this.fileList2 = [];
      this.showload = true;

      // let url = '';
      // if (!event.file[0].url.split('/')[3]) {
      //   //手机上
      //   url = event.file[0].url.split('/')[2];
      // } else {
      //   // 电脑上
      //   url = event.file[0].url.split('/')[3];
      // }
      const arr = event.file[0].url.split('.');
      const time = new Date().getTime();
      const num = Math.floor(Math.random() * 100) + 1;
      let url = time + num + '.' + arr[1];

      this.$newrequest.get('/coc-file/api/v1/oss/policy').then((res) => {
        console.log(res, url);
        uni
          .uploadFile({
            url: 'https://51shanky.oss-cn-hangzhou.aliyuncs.com/',
            filePath: event.file[0].url,
            name: 'file',
            formData: {
              key: res.data.dir + url,
              policy: res.data.policy,
              OSSAccessKeyId: res.data.accessid,
              signature: res.data.signature,
              success_action_status: '200',
            },
            success: function (res1) {
              console.log(res1);
              let obj = {
                url: 'https://oss.dcqcjlb.com/' + res.data.dir + url,
                status: 'success',
                message: '',
              };

              _this.percentage = 100;
              _this.showload = false;
              _this.videoUrl = obj.url;
              _this.$set(_this.fileList2, 0, obj);

              _this.coverImg = '';
              _this.coverImageType = '';
              // _this.fileList2[0].coverImage =
              //   'https://oss.dcqcjlb.com/' +
              //   res.data.dir +
              //   url +
              //   '?x-oss-process=video/snapshot,t_1000,m_fast';
            },
          })
          .onProgressUpdate((res) => {
            // console.log('上传进度', res.progress)
            // console.log('已经上传的数据长度', res.totalBytesSent)
            // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            this.showLoading = true;
            this.percentage = res.progress < 99 ? res.progress : 99;
            this.totalPercentage = Math.trunc(
              res.totalBytesExpectedToSend / 1000000
            );
            // if (res.progress == 100) {
            //   this.showLoading = false;
            // }
          });
      });
    },
    async afterRead(event) {
      let _this = this;
      let lists = [].concat(event.file);

      if (this.fileList1.length == 9) {
        uni.$u.toast('最多上传9张图片');
      }

      this.$newrequest.get('/coc-file/api/v1/oss/policy').then((res) => {
        lists.map((item, i) => {
          let url = '';
          if (!item.url.split('/')[3]) {
            //手机上
            url = item.url.split('/')[2];
          } else {
            // 电脑上
            url = item.url.split('/')[3];
          }
          uni.uploadFile({
            url: 'https://oss.dcqcjlb.com/',
            filePath: item.url,
            name: 'file',
            formData: {
              key: res.data.dir + url,
              policy: res.data.policy,
              OSSAccessKeyId: res.data.accessid,
              signature: res.data.signature,
              success_action_status: '200',
            },
            success: function (res1) {
              console.log('https://oss.dcqcjlb.com/' + res.data.dir + url);
              _this.fileList1.push({
                url: 'https://oss.dcqcjlb.com/' + res.data.dir + url,
                status: 'success',
                message: '',
              });

              // _this.$set(_this.fileList1, i, {
              // 	url: 'https://oss.dcqcjlb.com/' + res.data.dir + item.url.split('/')[2],
              // 	status: 'success',
              // 	message: ''
              // })
            },
          });
        });
      });
    },
    handleJump() {
      console.log(this.percentage);
      if (this.percentage == 100) {
        console.log(this.coverParams, this.videoUrl);
        uni.navigateTo({
          url: this.coverParams,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.addimgarticle__btn {
  width: 200rpx;
  height: 65rpx;
  line-height: 65rpx;
  background: #999999;
  border-radius: 33rpx;

  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  margin-top: 40rpx;
}
.position__btn {
  background: #f8f8f8;
  border-radius: 10rpx;
  padding: 12rpx;

  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #222222;
}

.page {
  margin: 24rpx;
}

.show-type {
  display: flex;
}

.visible-person {
  background: #ffffff;
  border-radius: 28rpx;
  font-size: 24rpx;
  padding: 13rpx 18rpx;
}

.choose-type {
  background-color: #fff3f3;
  color: #d91b1b;
}

.release {
  position: fixed;
  bottom: 120rpx;
  left: 50%;
  margin-left: -272rpx;

  text {
    background-color: #d91b1b;
    border-radius: 44rpx;
    font-size: 36rpx;
    color: #ffffff;
    padding: 20rpx 200rpx;
  }
}

.add-btn {
  display: flex;
  align-items: center;
  background: #fff3f3;
  border: 1rpx solid #d91b1b;
  border-radius: 27rpx;
  color: #d91b1b;
  size: 24rpx;
  width: 180rpx;
  height: 54rpx;
  justify-content: center;
}

.choosed {
  align-items: center;
  padding: 16rpx 24rpx;
  margin-top: 100rpx;
  background: #ebebeb;
  border-radius: 10rpx;
  size: 24rpx;
  color: #999999;
  display: flex;
  justify-content: space-between;
}

.talk {
  background-color: #ebebeb;
  text-align: center;
  height: 60rpx;
  line-height: 60rpx;
  font-size: 28rpx;
  margin-bottom: 20rpx;
  width: 120rpx;
  border-radius: 24rpx;
}

.btn-addimg {
  background-color: #e6e3e3;
  border-radius: 27rpx;
  font-size: 24rpx;
  height: 54rpx;
  line-height: 54rpx;
  padding: 0 38rpx;
}

.deleteimg {
  position: absolute;
  right: 0rpx;
  top: 0rpx;
}

.btn-cover {
  background-color: #ffdddd;
  border-radius: 27rpx;
  font-size: 24rpx;
  height: 54rpx;
  line-height: 54rpx;
  padding: 0 38rpx;
  color: #d91b1b;
  margin-left: 10rpx;
}

.card {
  padding: 30rpx 25rpx;
  background-color: #ffffff;
  margin-bottom: 20rpx;
}

.top-style {
  background-color: #f8f8f8;
  line-height: 62rpx;
  height: 62rpx;
  border-radius: 10rpx;
  padding: 0rpx 20rpx;
}

.tabs-unstyle {
  background: #f8f8f8;
  line-height: 62rpx;
  height: 62rpx;
  border-radius: 10rpx;
  padding: 0 36rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #222222;
}

.tabs-style {
  background: rgba(217, 27, 27, 0.08);
  line-height: 62rpx;
  height: 62rpx;
  border-radius: 10rpx;
  padding: 0 36rpx;
  font-size: 24rpx;
  font-family: PingFang SC;
  font-weight: 500;
  color: #d91b1b;
}

.mr10 {
  margin-right: 10rpx;
}
</style>