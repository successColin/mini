<template>
  <view class="page">
    <view
      class="card flex jsb alc"
      @click="checkBank"
      style="height: 86rpx; line-height: 86rpx"
    >
      <view>转出到银行卡</view>
      <view class="flex alc">
        <text class="size28 mr10 ml10" v-if="bank.bankName"
          >{{ bank.bankName }}{{ bank.endNumber }}</text
        >
        <text class="size28 mr10 ml10" v-else>请选择银行</text>
        <u-icon size="12" name="arrow-right"> </u-icon>
      </view>
    </view>
    <view class="card mt20" style="padding: 25rpx">
      <view class="flex jsb money">
        <input
          style="
            width: 90%;
            height: 70rpx;
            font-weight: bold;
            font-size: 60rpx;
            padding-left: 50rpx;
            box-sizing: border-box;
          "
          type="number"
          v-model="withdrawPrice"
          @change="handleChange"
        />
        <image
          src="https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693016853270.png"
          class="iconRmb"
          mode="widthFix"
        ></image>
        <text>税前</text>
      </view>
      <view class="size24 txtLighGray mt30">
        提现说明：满50元可发起提现，获得佣金为税前金额。佣金由51车俱乐部实施“预扣预缴”或“代扣代缴”办理扣缴义务；如达人开具的是非自然人开具的增值税发票（包括免税发票），按应打款佣金金额结算。
      </view>
    </view>

    <view
      class="card size28"
      style="line-height: 100rpx; padding: 0 25rpx; margin-top: 10rpx"
    >
      <view class="flex jsb alc borderB">
        <view>月累计申请金额</view>
        <view class="txtLighGray"
          >￥{{ withdrawBasic.monthAccumulateWithdraw || 0 }}</view
        >
      </view>
      <view class="flex jsb alc borderB">
        <view>月累计预扣个税</view>
        <view class="txtLighGray"
          >￥{{ withdrawBasic.monthAccumulateIncomeTax || 0 }}</view
        >
      </view>
      <view class="flex jsb alc">
        <view>本次预扣个税</view>
        <view class="txtLighGray">￥{{ withdrawBasic.incomeTax || 0 }}</view>
      </view>
    </view>
    <!--  -->
    <view class="card mt20 flex jsb alc" style="padding: 25rpx">
      <view class="size28 fwb" style="display: flex; align-items: center">
        提现对象类型
        <div
          style="margin-left: 10rpx; position: relative"
          @click="handleClickIcon"
        >
          <u-icon name="info-circle" color="#D91B1B"></u-icon>
        </div>
      </view>
      <view>
        <u-radio-group v-model="withdrawType" placement="row">
          <u-radio
            activeColor="#D91B1B"
            labelSize="28rpx"
            name="1"
            label="对公"
            :disabled="!disabledRadio"
          ></u-radio>
          <u-radio
            activeColor="#D91B1B"
            labelSize="28rpx"
            name="0"
            label="对私"
            :customStyle="{ marginLeft: '25px' }"
          ></u-radio>
        </u-radio-group>
      </view>
    </view>
    <view v-if="withdrawType == 1">
      <view class="size32 fwb" style="padding: 25rpx 0">开户许可证</view>
      <view
        class="card size28"
        style="line-height: 100rpx; padding: 0 25rpx 0rpx"
      >
        <view style="padding-top: 30rpx" class="borderB">
          <u-upload
            width="80"
            height="80"
            sizeType="compressed"
            :fileList="permissionArr"
            @afterRead="handleAfterRead"
            @delete="handleDelete"
            name="1"
            multiple
            :maxCount="1"
            :capture="['album']"
          >
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692867629768.png"
              mode="widthFix"
              style="width: 160rpx; height: 160rpx"
            ></image>
          </u-upload>
          <div
            style="
              font-size: 20rpx;
              font-family: PingFang SC;
              font-weight: 500;
              color: #d91b1b;
              line-height: 30rpx;
              margin: 20rpx 0 30rpx;
            "
          >
            请上传清晰的开户许可证图片，以便系统自动获取对公账户信息
          </div>
        </view>
        <view class="flex jsb alc borderB">
          <view>银行对公账户名称</view>
          <view class="txtLighGray">
            <u--input
              placeholder="自动获取"
              border="none"
              v-model="licenceParams.name"
            ></u--input>
          </view>
        </view>
        <view class="flex jsb alc borderB">
          <view>银行对公账号</view>
          <view class="txtLighGray">
            <u--input
              placeholder="自动获取"
              border="none"
              v-model="licenceParams.account"
            ></u--input>
          </view>
        </view>
        <view class="flex jsb alc">
          <view>开户银行</view>
          <view class="txtLighGray">
            <u--input
              placeholder="自动获取"
              border="none"
              v-model="licenceParams.bank"
            ></u--input>
          </view>
        </view>
      </view>
    </view>
    <!--  -->

    <view class="card mt20 flex jsb alc" style="padding: 25rpx">
      <view class="size28 fwb">发票类型</view>
      <view>
        <u-radio-group v-model="isInvoicing" placement="row">
          <u-radio
            activeColor="#D91B1B"
            labelSize="28rpx"
            name="1"
            label="电子发票"
          ></u-radio>
          <u-radio
            activeColor="#D91B1B"
            labelSize="28rpx"
            name="0"
            label="不开发票"
            :disabled="disableBill"
            :customStyle="{ marginLeft: '25px' }"
          ></u-radio>
        </u-radio-group>
      </view>
    </view>
    <view v-if="isInvoicing == 1">
      <view class="size32 fwb" style="padding: 25rpx 0">开票信息</view>
      <view
        class="card size28"
        style="line-height: 100rpx; padding: 0 25rpx 25rpx"
      >
        <view class="flex jsb alc borderB">
          <view>发票抬头</view>
          <view class="txtLighGray">{{ info.shopName }}</view>
        </view>
        <view class="flex jsb alc borderB">
          <view>税号</view>
          <view class="txtLighGray">{{ info.uniformSocialCreditCode }}</view>
        </view>
        <view class="flex jsb alc borderB">
          <view>开票项目</view>
          <view class="txtLighGray">{{ info.invoiceName }}</view>
        </view>
        <view class="flex jsb alc borderB">
          <view>投送邮箱</view>
          <view class="txtLighGray">{{ info.email }}</view>
        </view>
        <view class="">
          <view>*上传已开发票印件</view>
          <u-upload
            width="79"
            height="79"
            sizeType="compressed "
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="1"
            :capture="['album']"
          >
            <image
              src="https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692867629768.png"
              mode="widthFix"
              style="width: 180rpx; height: 180rpx"
            ></image>
          </u-upload>
        </view>
      </view>
    </view>
    <view class="payoutBtn" @click="widthdrawBtn">立即提现</view>
    <u-toast ref="uToast"></u-toast>
    <u-loading-icon :show="showload"></u-loading-icon>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      showpop: false,
      show: false,
      isInvoicing: '0',
      withdrawType: '0',
      withdrawPrice: 0,
      balance: 0,
      bank: {},
      info: {
        email: '',
        brancdutyParagraph: '',
        invoiceHeader: '',
        invoiceName: '服务费',
        invoiceImg: '',
      },
      fileList1: [],
      picUrl: '',
      showload: false,
      isclick: false,
      licenceParams: {},
      withdrawBasic: {},
      disabledRadio: false,
      disableBill: false,
      permissionArr: [],
    };
  },

  onLoad(option) {
    console.log(option);
    if (option.balance) {
      this.balance = Number(option.balance);
      this.withdrawPrice = Number(option.balance);
    }
    this.getInfo();
    this.getWithdrawInfo();
    this.getWithdrawType();
  },
  onShow() {
    let that = this;
    uni.$on('bankdata', function (data) {
      that.bank = data;
    });
  },
  watch: {
    withdrawType(v) {
      if (v == 1) {
        this.isInvoicing = '1';
        this.disableBill = true;
      } else {
        this.disableBill = false;
        if (this.withdrawPrice > 800) {
          this.isInvoicing = '1';
          this.disableBill = true;
        }
      }
    },
    withdrawPrice(v) {
      console.log(v);
      if (v > 800) {
        this.isInvoicing = '1';
        this.disableBill = true;
      } else {
        this.disableBill = false;
      }
    },
  },
  methods: {
    handleChange() {
      this.getWithdrawInfo();
    },
    handleClickIcon() {
      let message = '';
      if (this.withdrawType == 0) {
        message = `当月累计佣金金额不超过4000元且单笔佣金金额在800元以下的，可选择不开票;
          当月累计佣金金额超过4000元或单笔佣金金额大于800元的，需提供税务机关代开
          的增值税普通发票。由51车俱乐部直接按照劳务报酬所得计算代扣代缴个人所得税。
        `;
      } else {
        message =
          '开具非自然人开具的增值税发票（包括免税发票），按应打款佣金金额结算';
      }
      this.$refs.uToast.show({
        message: message,
      });
    },
    async handleUpload(e) {
      // if (!e) {
      //   this.$refs.uToast.show({
      //     type: 'default',
      //     message: '照片模糊',
      //   });
      // }
      // if (e.detail.reg_num.text.length == 20) {
      //   this.dataList.shopLic = e.detail.reg_num.text.substring(0, 18);
      // } else if (e.detail.reg_num.text.length == 17) {
      //   this.dataList.shopLic = e.detail.reg_num.text.substring(0, 15);
      // } else {
      //   this.dataList.shopLic = e.detail.reg_num.text;
      // }
      // this.dataList.shopName = e.detail.enterprise_name.text;
      // this.dataList.shopAddrExt = e.detail.address.text;
      // let _this = this;
      // this.showloading = true;
      // const { code, message } = await this.$newrequest.post(
      //   '/coc-active/api/v1/merchantsettledin/isRepeat',
      //   {
      //     shopName: this.dataList.shopName,
      //   }
      // );
      // if (code !== 200) {
      //   uni.$u.toast(message);
      //   this.showloading = false;
      //   return;
      // }
      // console.log('============111111111');
      // uni.uploadFile({
      //   url: getApp().globalData.uploadUrl,
      //   filePath: e.detail.image_path,
      //   name: 'file',
      //   formData: {
      //     file: e.detail.image_path,
      //   },
      //   header: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   success: (uploadFileRes) => {
      //     _this.showloading = false;
      //     console.log('============222222222');
      //     _this.dataList.licenseImg = JSON.parse(uploadFileRes.data).data;
      //     if (_this.dataList.settleType == 1) {
      //       _this.getbase64(e.detail.image_path, '0002');
      //     }
      //   },
      // });
    },
    checkBank() {
      uni.navigateTo({
        url: '/pages/myEarnings/bankList',
      });
    },
    // 获取默认开票信息
    getInfo() {
      this.$request
        .post('/coc-merchant-app/app/v2/invoicing/getDetails', {
          id: 1,
        })
        .then((res) => {
          this.info = res.data;
          this.info.invoiceName = '服务费';
        });
    },
    getWithdrawType() {
      this.$request
        .post('/coc-active/api/v2/withdraw/isAbleOfThePublic')
        .then((res) => {
          if (res.code === 200) {
            this.disabledRadio = true;
          }
        });
    },
    getWithdrawInfo() {
      this.$request
        .post('/coc-active/api/v2/withdraw/getWithdrawBaseInfo', {
          withdrawPrice: this.withdrawPrice,
        })
        .then((res) => {
          if (res.code === 200) {
            this.withdrawBasic = res.data;
            if (this.withdrawBasic.monthAccumulateWithdraw > 4000) {
              this.isInvoicing = '1';
              this.disableBill = true;
            }
          } else {
            return uni.showToast({
              title: res.message,
              icon: 'none',
              duration: 2000,
            });
          }
        });
    },
    handleDelete() {
      this.permissionArr = [];
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    handleAfterRead(event) {
      let lists = [].concat(event.file);
      let _this = this;
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
              const newUrl = 'https://oss.dcqcjlb.com/' + res.data.dir + url;
              _this.$request
                .post(
                  '/coc-active/api/v2/withdraw/recognizeBankAccountLicense',
                  {
                    licenceImg: newUrl,
                  }
                )
                .then((bbb) => {
                  _this.permissionArr.push({
                    url: newUrl,
                    status: 'success',
                    message: '',
                  });
                  if (bbb.code === 200) {
                    const { accountName, corporateAccount, depositBank } =
                      bbb.data;
                    _this.licenceParams = {
                      name: accountName,
                      account: corporateAccount,
                      bank: depositBank,
                    };
                  } else {
                    uni.showToast({
                      title: bbb.message,
                      icon: 'none',
                      duration: 2000,
                    });
                  }
                });
            },
          });
        });
      });
    },
    async afterRead(event) {
      let lists = [].concat(event.file);
      lists.map((item, i) => {
        this.fileList1.push({
          url: item.url,
          status: 'success',
          message: '',
        });
      });
    },
    widthdrawBtn() {
      if (this.bank.bankName && this.withdrawPrice) {
        if (this.withdrawType == 1) {
          if (
            this.permissionArr.length !== 1 ||
            !this.licenceParams.name ||
            !this.licenceParams.account ||
            !this.licenceParams.bank
          ) {
            return uni.showToast({
              title: '请确认开户许可证信息',
              icon: 'none',
              duration: 2000,
            });
          }
        }
        if (this.isInvoicing == 1) {
          if (this.fileList1.length) {
            this.picUrl = this.fileList1[0].url;
            this.uploadFilePromise();
          } else {
            uni.showToast({
              title: '请上传发票印件',
              icon: 'none',
              duration: 2000,
            });
          }
        } else {
          this.picUrl = '';
          this.save();
        }
      } else {
        uni.showToast({
          title: '请确认银行信息和输入金额不为空',
          icon: 'none',
          duration: 2000,
        });
      }
    },
    uploadFilePromise() {
      let _this = this;
      _this.info.invoiceImg = '';
      this.fileList1.filter((s, i) => {
        s.index = i;
      });
      let arr = [];
      const promistList = this.fileList1.map((res) => {
        console.log(res);
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: getApp().globalData.uploadUrl,
            filePath: res.url,
            name: 'file',
            formData: {
              file: res.url,
            },
            success: (uploadFileRes) => {
              arr.push({
                index: res.index,
                data: JSON.parse(uploadFileRes.data).data,
              });
              resolve(uploadFileRes);
              // _this.dataList.imgs.push(JSON.parse(uploadFileRes.data).data)
            },
          });
        });
      });
      Promise.all(promistList).then((res) => {
        let a = arr.sort((a, b) => {
          return a.index - b.index;
        });
        a.filter((s) => {
          // 只有一张图片
          _this.info.invoiceImg = s.data;
        });
        this.save();
      });
    },
    save() {
      if (!this.isclick) {
        this.isclick = true;

        this.$request
          .post('/coc-active/api/v2/withdraw/add', {
            bankCardId: this.bank.bankCardId,
            dutyParagraph: this.info.uniformSocialCreditCode,
            email: this.info.email,
            invoiceHeader: this.info.shopName,
            invoiceName: this.info.invoiceName,
            isInvoicing: Number(this.isInvoicing),
            withdrawPrice: Number(this.withdrawPrice),
            invoiceImg: this.info.invoiceImg,
            isCorporate: this.withdrawType,
            accountName: this.licenceParams.name,
            corporateAccount: this.licenceParams.account,
            depositBank: this.licenceParams.bank,
            licenceImg: this.permissionArr?.[0]?.url || '',
          })
          .then((res) => {
            this.isclick = false;
            if (res.code == 200) {
              uni.showToast({
                title: '提现成功',
                icon: 'none',
                duration: 2000,
              });
              setTimeout(() => {
                uni.redirectTo({
                  url: '/pages/myEarnings/withdrawlist',
                });
              }, 1000);
            } else {
              uni.showToast({
                title: res.message,
                icon: 'none',
                duration: 2000,
              });
            }
          });
      }
    },
    onRequest() {},
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 25rpx;
}

.card {
  background-color: #fff;
  width: 700rpx;
  border-radius: 10rpx;
  padding: 25rpx;
  box-sizing: border-box;
}

.money {
  align-items: baseline;
  border-bottom: 1rpx solid #e8e8e8;
  padding: 0rpx 0 20rpx;
  position: relative;
}
.iconRmb {
  position: absolute;
  top: 14px;
  left: 10rpx;
  width: 32rpx;
}

.bankIcon {
  width: 40rpx;
}

.borderB {
  border-bottom: 1rpx solid #e8e8e8;
}
.Kf {
  width: 79rpx;
  height: 38rpx;
}

.payoutBtn {
  width: 300rpx;
  height: 80rpx;
  line-height: 80rpx;
  color: #fff;
  font-size: 32rpx;
  text-align: center;
  background: #d91b1b;
  border-radius: 40rpx;
  margin: 100rpx auto;
}
.licence {
  width: 180rpx;
  height: 180rpx;
  border-radius: 10rpx;
  background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230824/file_1692867629768.png');
  background-size: 100% 100%;
}
::v-deep {
  .u-input__content__field-wrapper__field {
    text-align: right !important;
  }
}
</style>