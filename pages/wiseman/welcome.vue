<template>
  <view class="page">
    <view style="text-align: center; padding-top: 20rpx">
      <image
        mode="widthFix"
        class="w700h905"
        src="https://oss.dcqcjlb.com/51che_java_dev/20231115/file_1700016099411.png"
      >
      </image>
    </view>
    <view
      @click="OnmakePhoneCall"
      style="text-align: center; margin-top: 20rpx"
    >
      <image
        mode="widthFix"
        style="width: 715rpx"
        src="https://oss.dcqcjlb.com/51che_java_dev/20221112/073e9ea9c2a44986bead88f6c2bc4357.png"
      >
      </image>
    </view>
    <view
      class="bgfff"
      style="padding: 25rpx; margin: 22rpx 25rpx"
      v-if="isShow"
    >
      <u--form :model="form" ref="uForm1">
        粉丝量截图证明
        <u-form-item prop="expertName">
          <u-upload
            :maxCount="3"
            style="width: 650rpx; height: 300rpx"
            :fileList="form.imgs"
            :multiple="true"
            name="1"
            :previewFullImage="true"
            @afterRead="afterRead"
            @delete="deletePic"
          >
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20231224/file_1703406735247.png"
              mode="widthFix"
              style="width: 650rpx; height: 300rpx"
            ></image>
          </u-upload>
        </u-form-item>
        <!-- <u-form-item
          :required="true"
          label="姓名"
          prop="expertName"
          :rules="rules"
        >
          <u-input
            placeholder="请输入真实姓名"
            borderBottom
            border="none"
            v-model="form.expertName"
          />
        </u-form-item>
        <view style="margin-top: -10rpx; margin-bottom: -10rpx">
          <u-divider :text="null"></u-divider>
        </view>
        <u-form-item
          :required="true"
          label="手机号"
          prop="mobile"
          :rules="rules"
        >
          <u-input
            disabledColor="#ffffff"
            :disabled="true"
            placeholder="请输入本人手机号码"
            borderBottom
            border="none"
            v-model="form.mobile"
          />
        </u-form-item> -->
      </u--form>
    </view>
    <view
      class="u-flex size24"
      style="margin-top: 42rpx; justify-content: center"
      v-if="isShow"
    >
      <view>
        <u-radio-group v-model="radiovalue1" placement="column">
          <u-radio
            activeColor="#D91B1B"
            :customStyle="{ marginBottom: '8px' }"
            :name="1"
          >
          </u-radio>
        </u-radio-group>
      </view>
      <text>我已阅读并同意</text>
      <text @click="OnPushwisemanPolicy" style="color: #d91b1b">
        《达人入驻协议》
      </text>
      <text>和</text>
      <text @click="OnPushPrivacyPolicy" style="color: #d91b1b">
        《个人信息保护声明》
      </text>
    </view>
    <view class="bottom-next">
      <text
        @click="OnNext"
        :style="[
          isShow ? '' : { pointerEvents: 'none', backgroundColor: '#9E9E9E' },
        ]"
        >升级达人</text
      >
    </view>
    <view style="height: 50rpx"></view>
    <cardauthentication
      :showpop="showpop"
      @setshowpop="back"
    ></cardauthentication>
  </view>
</template>

<script>
import cardauthentication from '@/components/cardauthentication.vue';
import { getstorage, tologin } from '@/utils/index.js';
export default {
  components: {
    cardauthentication,
  },
  data() {
    return {
      showpop: false,
      expertParentId: null,
      radiovalue1: '',
      form: {
        imgs: [],
      },
      dataList: {},
      isShow: true,
    };
  },

  onLoad(option) {
    console.log(option);
    // uni.removeStorageSync('enter');
    if (option.q) {
      const arr = option.q.split('phone%3D');
      console.log(arr);
      const mobile = getstorage('mobile');
      if (mobile !== arr[1]) {
        this.isShow = false;
        uni.showToast({
          title: '您不是本次的受邀用户~',
          icon: 'none',
          duration: 3000,
        });
      }
    }
    if (option.enter) {
      uni.setStorageSync('enter', option.enter);
    }
    if (option.scene) {
      this.expertParentId = option.scene;
    }
    if (option.expertParentId) {
      this.expertParentId = option.expertParentId;
      if (option.isnext == 1) {
        return false;
      }
    }

    if (tologin() !== true) {
      return;
    }
    this.getstatus();
  },
  onShow() {
    this.form.mobile = getstorage('mobile');
  },
  methods: {
    // 删除图片
    deletePic(event) {
      this.form.imgs.splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      console.log(event);
      let lists = [].concat(event.file);
      lists.map((item, i) => {
        this.form.imgs.push({
          ...item,
          status: 'uploading',
          message: '上传中',
          uploadstatus: false,
        });
      });
      for (let i = 0; i < this.form.imgs.length; i++) {
        let data = this.form.imgs[i];
        console.log(data);
        if (data.status === 'uploading' && !this.form.imgs[i].uploadstatus) {
          this.form.imgs[i].uploadstatus = true;
          const result = await this.uploadFilePromise(data.url);
          this.form.imgs[i].url = result;
          this.form.imgs[i].status = 'success';
          this.form.imgs[i].message = '';
        }
      }
    },
    //上传图片
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        uni.uploadFile({
          url: getApp().globalData.uploadUrl,
          filePath: url,
          name: 'file',
          formData: {
            file: url,
          },
          header: {
            'Content-Type': 'multipart/form-data',
          },
          success: (uploadFileRes) => {
            resolve(JSON.parse(uploadFileRes.data).data);
          },
        });
      });
    },
    getstatus() {
      this.$request.post('/coc-active/api/v1/expert/echoVerify').then((res) => {
        if (res.code == 1101) {
          return false;
        } else if (res.data.status == 2) {
          uni.$u.toast('您已成为达人。请勿重复操作');
          setTimeout(() => {
            uni.switchTab({
              url: '/pages/home/my',
            });
          }, 2000);
        } else if (res.data.status == 1) {
          uni.navigateTo({
            url: '/pages/wiseman/applying',
          });
        } else if (res.data.status == 3) {
          uni.navigateTo({
            url: '/pages/wiseman/refuse?id=' + this.expertParentId,
          });
        }
      });
    },
    OnPushwisemanPolicy() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/club_cooperation_agreement.html',
      });
    },
    OnPushPrivacyPolicy() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
      });
    },
    getInfo() {
      // 判断是否实名
      this.$request.get('/coc-my/api/v1/my/user/info').then((res) => {
        this.isCertify = res.data.user.isCertify;
        if (this.isCertify) {
          if (!this.radiovalue1) {
            uni.$u.toast('请同意并阅读以下协议');
            return false;
          }
          const imgs = [];
          this.form.imgs.forEach((v) => {
            imgs.push(v.url);
          });
          if (imgs.length > 3) {
            uni.$u.toast('最多上传3张图片');
            return false;
          }
          this.$request
            .post('/coc-active/api/v1/expert/upgradeExpert/v2', {
              expertParentId: this.expertParentId !== 'undefined' ? this.expertParentId : '',
              mobile: res.data.user.mobile,
              imgs,
            })
            .then((res) => {
              if (res.code == 200) {
                uni.requestSubscribeMessage({
                  tmplIds: ['qgGX0K_PPv65088pNUsqknop_Yc9zbl-thBq3Hyk2uw'],
                  success(res) {},
                });
                uni.redirectTo({
                  url: '/pages/wiseman/applying',
                });
              } else {
                uni.$u.toast(res.message);
              }
            });
        } else {
          this.showpop = true;
        }
      });
    },
    back() {
      this.showpop = false;
    },
    OnNext() {
      this.getInfo();

      // this.$refs.uForm1.validate().then(res => {
      //     this.$request.post("/coc-active/api/v1/expert/upgradeExpert/v2", {
      //         expertParentId: this.expertParentId,
      //         expertName: this.form.expertName,
      //         mobile: this.form.mobile
      //     }).then(res => {
      //         if (res.code == 200) {
      //             uni.navigateTo({
      //                 url: "/pages/wiseman/applying"
      //             })
      //         } else {
      //             uni.$u.toast(res.message)
      //         }
      //     })
      // })
    },
    OnmakePhoneCall() {
      uni.makePhoneCall({
        phoneNumber: '4008-010-111', //仅为示例
      });
    },
  },
};
</script>

<style lang="scss">
.page {
}

.bottom-next {
  text-align: center;
  margin-top: 60rpx;

  text {
    display: inline-block;
    border-radius: 40rpx;
    width: 600rpx;
    height: 80rpx;
    background-color: #d91b1b;
    text-align: center;
    line-height: 80rpx;
    color: #ffffff;
    font-size: 34rpx;
    font-weight: 400;
  }
}

.w700h905 {
  width: 700rpx;
  height: 905rpx;
}
::v-deep {
  .u-upload__wrap__preview {
    margin-right: 0 !important;
    .u-upload__wrap__preview__image {
      width: 650rpx !important;
      height: 300rpx !important;
    }
  }
  .u-upload__deletable {
    height: 20px !important;
    width: 20px !important;
    .u-icon__icon {
      font-size: 16px !important;
      line-height: 17px !important;
    }
  }
}
</style>
