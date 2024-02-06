<template>
  <view>
    <view class="register">
      <view class="welcomeH">
        <text class="weltxt">欢迎来到</text>
        <image :src="logo" style="width: 160rpx" mode="widthFix"></image>
      </view>
      <view class="realPhone" v-show="!photoShow">
        <view class="phoneLook">
          <view class="phoneLookL">
            <!-- <view class="rednumTip">2</view> -->
            <view class="phoneLookTxt"> 手机实名认证 </view>
          </view>
          <button
            class="phoneBtn"
            openType="getPhoneNumber"
            @getphonenumber="getPhoneNumber"
          >
            一键认证
          </button>
        </view>
        <view class="phoneTips"> 应网信办规定用户注册需实名认证 </view>
      </view>
      <view class="headItem" v-show="photoShow">
        <view class="headCustom">
          <!-- <view class="rednumTip">1</view> -->
          <button
            class="checkPhoto"
            openType="chooseAvatar"
            @chooseavatar="OngetUserPhoto"
          >
            <image
              src="@/pages/activity/static/image/upPhoto.png"
              mode="widthFix"
              v-if="!dataList.userPhoto"
            >
            </image>
            <image :src="dataList.userPhoto" mode="widthFix" v-else></image>
          </button>
        </view>
        <view class="uname">
          <input
            class="nameInput"
            type="text"
            placeholder="请设置昵称"
            v-model="dataList.name"
          />
        </view>
      </view>
    </view>
    <view class="footer" v-show="photoShow">
      <view class="checkbox">
        <view style="position: absolute; top: -30px; left: 24px">
          <image
            v-if="showBubble"
            style="width: 250rpx; height: 54rpx"
            src="@/pages/activity/static/image/Bubble.png"
          ></image>
        </view>
        <checkbox-group placement="column" @change="checkboxChange">
          <checkbox
            iconSize="26"
            style="transform: scale(0.7)"
            color="#db1a1b"
            :customStyle="{ marginBottom: '8px' }"
            :checked="isAgree"
          >
          </checkbox>
        </checkbox-group>
        <view class="xieyi">
          <text>我已阅读并同意51车俱乐部</text>
          <text @click="OnPushUserAgreement" style="color: #db1a1b"
            >《用户协议》</text
          >和
          <text @click="OnPushPrivacyPolicy" style="color: #db1a1b"
            >《隐私政策》</text
          >
        </view>
      </view>
      <button class="nowBtn" @click="upInfo">立即登录</button>
    </view>
    <u-toast ref="uToast"></u-toast>
    <view> </view>
  </view>
</template>

<script>
import { setstorage } from '@/utils/index.js';
export default {
  data() {
    return {
      dataList: {
        name: '',
        userPhoto: '',
      },
      activityId: null,
      inviteId: '',
      photoShow: false, // 是否显示设置头像
      openCode: '',
      phoneCode: '',
      isAgree: false,
      showBubble: false,
      logo: 'https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20221005/a6e7ee23928f42ea897da87de5053fb0.png',
      userChannelId: '',
    };
  },
  onLoad(option) {
    // 除了你这个页面，其他页面都要清除 enter
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    if (option.scene) {
      this.inviteId = option.scene;
    }
    if (option.activityId) {
      this.activityId = option.activityId;
    }
    if (option.userChannelId) {
      this.userChannelId = option.userChannelId;
    }
  },
  methods: {
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: getApp().globalData.uploadUrl, // 仅为示例，非真实的接口地址
          filePath: url,
          name: 'file',
          formData: {
            user: 'test',
          },
          success: (res) => {
            setTimeout(() => {
              resolve(JSON.parse(res.data).data);
            }, 0);
          },
        });
      });
    },
    getPhoneNumber(val) {
      this.phoneCode = val.detail.code;
      this.getopencode(val.detail.code);
    },
    async OngetUserPhoto(val) {
      this.dataList.userPhoto = await this.uploadFilePromise(
        val.detail.avatarUrl
      );
    },
    OnPushPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html',
      });
    },
    OnPushUserAgreement() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_service.html',
      });
    },
    getopencode(phoneCode) {
      let _this = this;
      uni.login({
        provider: 'weixin',
        onlyAuthorize: true,
        success: function (loginRes) {
          _this.openCode = loginRes.code;
          _this.loginNow(phoneCode, loginRes.code, '', '', 0);
        },
      });
    },

    loginNow(phoneCode, openCode, photo, nick, register, enter) {
      let that = this;
      const data = {
        phoneCode: phoneCode,
        openCode: openCode,
        avatar: photo,
        nickName: nick,
        grant_type: 'wechat',
        inviteId: this.inviteId + '',
        activityId: this.activityId,
        userChannelId: this.userChannelId || enter,
      };
      // if (enter) {
      //   data.userChannelId = enter;
      // }
      uni.request({
        url: 'http://coc.51api.dcqcjlb.com/coc-oauth/oauth/token',
        method: 'POST',
        data,
        header: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic Y29jLW1lcmNoYW50LWFwcDoxMjM0NTY=',
        },
        success: (res) => {
          console.log('输出', res);
          if (res.data.code === 102) {
            this.photoShow = true;
          } else if (res.data.code == 200) {
            console.log(11111111111111, enter);
            if (enter) {
              uni.removeStorageSync('enter');
            }
            this.$refs.uToast.show({
              message: '登录成功',
              type: 'success',
              complete() {
                setstorage('openid', res.data.data.openid);
                setstorage('mobile', res.data.data.username);
                setstorage('register', register);
                setstorage('ishomepop', 0);
                setstorage('userImg', res.data.data.headImg);
                that.$xjlrequest
                  .post('/user/login/get_center_tmp_token', {
                    mobile: res.data.data.username,
                  })
                  .then((s) => {
                    that.$xjlrequest
                      .post('/user/login/getXjlTokenByTmpToken', {
                        tmp_token: s.data.access_token,
                      })
                      .then((i) => {
                        uni.setStorageSync('xjltoken', i.data.token);
                        uni.setStorageSync('xjluserid', i.data.id);
                      });
                  });
                uni.setStorage({
                  key: 'token',
                  data: res.data.data.access_token,
                  success: function () {
                    that.getinfo();
                    if (
                      getCurrentPages()[0].is == 'pages/activity/share/index'
                    ) {
                      uni.switchTab({
                        url: '/pages/home/index',
                      });
                      return false;
                    }

                    uni.navigateBack({
                      delta: 1,
                    });
                    uni.$emit('getdata');
                  },
                });
              },
            });
          }
        },
        fail: (err) => {
          uni.showToast({
            title: err.msg,
            icon: 'none',
            duration: 2000,
          });
        },
      });
    },
    checkboxChange(val) {
      this.isAgree = !this.isAgree;
      if (this.isAgree) {
        this.showBubble = false;
      }
    },
    upInfo() {
      if (this.dataList.userPhoto && this.dataList.name && this.isAgree) {
        const enter = uni.getStorageSync('enter');
        this.loginNow(
          this.phoneCode,
          this.openCode,
          this.dataList.userPhoto,
          this.dataList.name,
          1,
          enter
        );
      } else if (!this.dataList.userPhoto) {
        uni.showToast({
          title: '请设置头像',
          icon: 'none',
          duration: 2000,
        });
      } else if (!this.dataList.name) {
        uni.showToast({
          title: '请设置昵称',
          icon: 'none',
          duration: 2000,
        });
      } else if (!this.isAgree) {
        this.showBubble = true;
      }
    },
    getinfo() {
      this.$request.get('/coc-my/api/v1/my/findUser').then((res) => {
        setstorage('headImg', res.data.user.headImg);
        setstorage('nickname', res.data.user.nickname);
        setstorage('userType', res.data.user.userType);
        setstorage('userId', res.data.user.id);
        setstorage('isCertify', res.data.user.isCertify);
        setstorage('realName', res.data.user.realName);
        setstorage('mobile', res.data.user.mobile);
        if (res.data.shop == null) {
          setstorage('status', null);
          setstorage('shopId', null);
          setstorage('shopName', null);
          setstorage('shopTypeId', 0);
          setstorage('shopType', null);
        } else {
          setstorage('status', res.data.shop.status);
          setstorage('shopId', res.data.shop.id);
          setstorage('shopName', res.data.shop.shopName);
          setstorage('shopTypeId', res.data.shop.shopTypeId);
          setstorage('shopType', res.data.shop.status);
        }
      });
    },
  },
};
</script>

<style lang="scss">
.register {
  margin: 20rpx 40rpx;
  padding: 20rpx 40rpx;
  background-color: #fff;
  border-radius: 10rpx;

  .welcomeH {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 20rpx 0 40rpx;
    border-bottom: 1px solid #dedede;

    .weltxt {
      font-size: 36rpx;
      font-weight: bold;
      margin-right: 17rpx;
      font-family: PingFang-SC-Bold;
    }
  }

  .headItem {
    .headCustom {
      display: flex;
      padding: 42rpx 0;

      .checkPhoto {
        width: 160rpx;
        height: 160rpx;
        display: inline-flex;
        padding: 0;
        border-radius: 50%;
        border: none;
        outline: none;

        imgae {
          width: 100%;
          height: 100%;
        }
      }

      .checkPhoto::after {
        border: none;
      }
    }

    .uname {
      .nameInput {
        height: 80rpx;
        line-height: 80rpx;
        background: #f8f8f8;
        border-radius: 5px;
        padding-left: 28rpx;
        font-size: 28rpx;
      }
    }
  }

  .rednumTip {
    width: 40rpx;
    height: 40rpx;
    background-color: #d91b1b;
    font-size: 28rpx;
    color: #fff;
    text-align: center;
    line-height: 40rpx;
    border-radius: 50%;
  }

  .realPhone {
    margin-top: 50rpx;

    .phoneLook {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 36rpx;

      .phoneLookL {
        display: flex;
        align-items: center;

        .phoneLookTxt {
          font-weight: bold;
        }
      }

      .phoneBtn {
        width: 140rpx;
        height: 42rpx;
        background: #ffecec;
        border: 1px solid #de2627;
        border-radius: 30rpx;
        text-align: center;
        line-height: 42rpx;
        color: #d91b1b;
        font-size: 24rpx;
        padding: 0;
        margin: 0;
        letter-spacing: 2rpx;
      }
    }

    .phoneTips {
      padding: 56rpx 0 46rpx;
      font-size: 28rpx;
      color: #999;
    }
  }
}

.newtype {
  margin-top: 39%;
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;

  .checkbox {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .xieyi {
      font-size: 24rpx;
      color: #666666;
    }
  }

  .nowBtn {
    width: 500rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #d91b1b;
    border-radius: 50rpx;
    text-align: center;
    color: #fff;
    font-size: 32rpx;
    margin: 100rpx auto;
    background: #d91b1b;
    color: #fff;
  }
}

.img-style {
  width: 30rpx;
  height: 30rpx;
}
</style>
