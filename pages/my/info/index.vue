<template>
  <view class="page">
    <view class="page-view">
      <view class="card-top" @click="chooseImage">
        <view class="avatar">头像</view>
        <view class="u-flex-al">
          <view style="margin-right: 15rpx">
            <u-avatar size="80rpx" shape="square" :src="dataList.headImg">
            </u-avatar>
          </view>
          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="OpenChangeName" class="card">
        <view class="title">昵称</view>
        <view class="u-flex-al">
          <view class="card-label">
            {{ dataList.nickname }}
          </view>

          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="Oncertification" class="card">
        <view class="title">实名认证</view>
        <view class="u-flex-al">
          <view
            v-if="dataList.isCertify == 1"
            class="card-label"
            @click="OnPushIdcard"
          >
            已实名
          </view>
          <view
            v-else-if="dataList.isCertify == 0"
            class="card-label"
            @click="OnOpendauthentication"
          >
            未实名
          </view>
          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="OnChangeContacts" class="card">
        <view class="title">报名信息</view>
        <view class="u-flex-al">
          <view class="card-label"> 修改/添加 </view>

          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="handleCollect(1)" class="card">
        <view class="title">我的收藏</view>
        <view class="u-flex-al">
          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="onWebView(1)" class="card">
        <view class="title">隐私政策</view>
        <view class="u-flex-al">
          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="onWebView(2)" class="card">
        <view class="title">用户协议</view>
        <view class="u-flex-al">
          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view @click="OnAboutUs" class="card">
        <view class="title">关于我们</view>
        <view class="u-flex-al">
          <view class="card-label"> </view>

          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
      <view
        @click="showmodal = true"
        class="card"
        style="padding: 26rpx 0 !important"
      >
        <view class="title">
          <view>账号注销</view>
          <view style="font-size: 24rpx; color: #999999; font-weight: 500"
            >注销后无法恢复，请谨慎操作</view
          >
        </view>
        <view class="u-flex-al">
          <view class="card-label"> </view>

          <u-icon size="9" name="arrow-right" color="#999999"></u-icon>
        </view>
      </view>
    </view>
    <view class="bottom-btn u-flex-al">
      <view class="btn u-flex-al" @click="OnloginOut">
        <text>退出登录</text>
      </view>
    </view>
    <u-popup
      round="10rpx"
      bgColor="#FFFFFF"
      :show="show"
      @close="close"
      mode="center"
      :safeAreaInsetBottom="false"
    >
      <view class="dia-card">
        <view class="dia-title">{{ dianame }}</view>
        <view style="margin-top: 130rpx">
          <u--input
            v-model="newnickname"
            placeholder="请设置昵称"
            border="bottom"
            fontSize="28rpx"
            :adjustPosition="false"
            placeholderStyle="font-size: 28rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
            @focus="focusText"
            @blur="blurText"
          >
          </u--input>
        </view>
        <view
          class="u-flex-al"
          style="justify-content: center; margin-top: 87rpx"
        >
          <view
            class="Totrue"
            style="
              margin-right: 72rpx;
              background: #999999;
              border: 1px solid #999999;
            "
            @click="close"
          >
            <text>取消</text>
          </view>
          <view class="Totrue" style="background: #d91b1b" @click="OnTrue">
            <text>保存</text>
          </view>
        </view>
        <view :style="{ height: keywordHeight }"></view>
      </view>
    </u-popup>
    <u-toast ref="uToast"></u-toast>
    <u-modal
      :show="showmodal"
      title="您确定要注销当前账号"
      :showCancelButton="true"
      @close="showmodal = false"
      @cancel="showmodal = false"
      @confirm="Onusercancel"
    ></u-modal>
    <view>
      <cardauthentication :showpop="showpop"></cardauthentication>
    </view>
  </view>
</template>

<script>
import cardauthentication from '@/components/cardauthentication.vue';
import { tologin } from '@/utils/index.js';
export default {
  components: {
    cardauthentication,
  },
  data() {
    return {
      showmodal: false,
      newnickname: '',
      dianame: '设置昵称',
      show: false,
      dataList: {
        mobile: '',
        headImg: '',
        birthday: '',
        signature: '',
      },
      keywordHeight: '0rpx',
      showpop: false,
    };
  },
  onShow() {
    this.getList();
  },
  onLoad() {
    let _this = this;
    uni.$on('closepop', (res) => {
      _this.showpop = false;
      _this.getList();
    });
  },
  methods: {
    handleCollect(type) {
      if (tologin() !== true) {
        return;
      }
      if (type == 2) {
        return false;
      }
      uni.navigateTo({
        // type=1时表示我的收藏 =2时表示我的足迹
        url: '/pages/my/collection/index?type=' + type,
      });
    },
    OnPushIdcard() {
      uni.navigateTo({
        url:
          '/pages/my/info/idcardindex?name=' +
          this.dataList.realName +
          '&idCard=' +
          this.dataList.idCard,
      });
    },
    OnOpendauthentication() {
      this.showpop = true;
    },
    logonout() {
      this.$request.post('/coc-oauth/oauth/logout').then((res) => {
        if (res.code == 200) {
          this.showmodal = false;
          this.$refs.uToast.show({
            message: '操作成功',
            complete() {
              uni.removeStorageSync('token');
              uni.navigateTo({
                url: '/pages/activity/share/index',
              });
            },
          });
        }
      });
    },
    Onusercancel() {
      this.$request.post('/coc-oauth/oauth/cancel').then((res) => {
        if (res.code == 200) {
          uni.removeStorageSync('token');
          uni.switchTab({
            url: '/pages/home/index',
          });
        }
      });
    },
    OnSwitchAccount() {
      this.logonout();
    },
    OnloginOut() {
      this.logonout();
    },
    OnTrue() {
      let _this = this;
      this.$request
        .post('/coc-my/api/v1/my/user/update', {
          nickname: _this.newnickname,
        })
        .then((res) => {
          _this.dataList.nickname = _this.newnickname;
          this.show = false;
        });
    },
    getphone(val) {
      return val.substr(0, 3) + '****' + val.substr(7);
    },
    getList() {
      this.$request.get('/coc-my/api/v1/my/user/info').then((res) => {
        this.dataList = res.data.user;
      });
    },
    OnAboutUs() {
      uni.navigateTo({
        url: '/pages/my/aboutUs/index',
      });
    },
    Onuserinfo() {
      let _this = this;
      uni.navigateTo({
        url: '/pages/my/userinfo/index',
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit('getuserinfo', {
            data: _this.dataList,
          });
        },
      });
    },
    Oncertification() {
      let _this = this;
      uni.navigateTo({
        url: '/pages/my/certification/index',
        success: function (res) {
          res.eventChannel.emit('getuserinfo', {
            data: _this.dataList,
          });
        },
      });
    },

    OnaccountBinding() {
      uni.navigateTo({
        url: '/pages/my/accountBinding/index',
      });
    },
    OnChangeContacts() {
      uni.navigateTo({
        url: '/pages/my/contacts/index',
      });
    },
    OnChangeAddress() {
      uni.navigateTo({
        url: '/pages/my/address/index',
      });
    },
    onWebView(type) {
      let url =
        type == 1
          ? 'https://h5.dcqcjlb.com/protocol/user_privacy.html'
          : type == 2
          ? 'https://h5.dcqcjlb.com/protocol/user_service.html'
          : '';
      uni.navigateTo({
        url: '/pages/agreement/webview?url=' + url,
      });
    },
    close() {
      this.show = false;
    },
    OpenChangeName() {
      this.show = true;
      this.newnickname = this.dataList.nickname;
    },
    setheadimg(val) {
      this.$request
        .post('/coc-my/api/v1/my/user/update', {
          headImg: val,
        })
        .then((res) => {});
    },
    chooseImage() {
      let _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          let newheadimg = res.tempFilePaths[0];
          uni.uploadFile({
            url: getApp().globalData.uploadUrl,
            filePath: newheadimg,
            name: 'file',
            formData: {
              file: newheadimg,
            },
            header: {
              'Content-Type': 'multipart/form-data',
            },
            success: (uploadFileRes) => {
              _this.dataList.headImg = JSON.parse(uploadFileRes.data).data;
              _this.setheadimg(JSON.parse(uploadFileRes.data).data);
            },
          });
        },
      });
    },
    //评论输入框键盘获取焦点
    focusText(event) {
      this.keywordHeight = '100rpx';
    },
    //评论输入框键盘失去焦点
    blurText() {
      this.keywordHeight = '0rpx';
    },
  },
};
</script>

<style lang="scss">
.page-view {
  background-color: #ffffff;
  padding: 0 51rpx;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 0;

  .avatar {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
  }
}

.card {
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1rpx solid #dedede;
  padding: 34rpx 0;

  .title {
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
  }

  .card-label {
    margin-right: 15rpx;
    font-size: 28rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
  }
}

.bottom-btn {
  margin-top: 200rpx;
  justify-content: center;

  .btn {
    width: 360rpx;
    height: 80rpx;
    border-radius: 40rpx;
    font-size: 32rpx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    background: #ffffff;
    justify-content: center;
  }
}

.dia-card {
  width: 650rpx;
  padding: 81rpx 25rpx 84rpx 25rpx;

  .dia-title {
    font-weight: bold;
    font-size: 36rpx;
    text-align: center;
    color: #222222;
    font-family: PingFang SC;
  }

  .Totrue {
    width: 260rpx;
    height: 72rpx;
    border-radius: 36rpx;
    display: flex;
    justify-content: center;
    align-items: center;

    text {
      font-size: 28rpx;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
    }
  }
}

.u-flex-al {
  display: flex;
  align-items: center;
}
</style>
