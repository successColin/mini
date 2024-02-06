<!--
 * @Descripttion: 个体入驻材料上传vue
 * @Author: ytx
 * @Date: 2023-10-17 16:07:24
 * @Last Modified by: ytx
 * @Last Modified time: 2023-10-17 16:07:24
-->
<template>
  <view class="page">
    <u-form>
      <view class="card">
        <view class="title"> 营业执照 </view>
        <!--  #ifdef MP-WEIXIN  -->
        <ocr-navigator
          @onSuccess="CardlicenseImg"
          certificateType="businessLicense"
          key="businessLicense"
        >
          <view class="yingyezhizhao">
            <image :src="dataList.licenseImg" style="height: 300rpx"></image>
          </view>
        </ocr-navigator>
        <!--  #endif -->
        <!-- <view class="yingyezhizhao" @click="handleUpload('licenseImg')">
          <image :src="dataList.licenseImg" style="height: 300rpx"></image>
        </view> -->
      </view>
      <view class="card">
        <view class="title"> 经营者身份证 </view>
        <!-- <view class="zhengmian" @click="handleUpload('juridicalIdCardFrontImg')">
          <image :src="dataList.juridicalIdCardFrontImg" style="height: 300rpx"></image>
        </view>
        <view class="fanmian" @click="handleUpload('juridicalIdCardBackImg')">
          <image :src="dataList.juridicalIdCardBackImg" style="height: 300rpx"></image>
        </view> -->
        <!--  #ifdef MP-WEIXIN  -->
        <ocr-navigator
          @onSuccess="CardFrontImg"
          certificateType="idCard"
          :opposite="false"
          key="idCard1"
        >
          <view class="zhengmian">
            <image
              :src="dataList.juridicalIdCardFrontImg"
              style="height: 300rpx"
            ></image>
          </view>
        </ocr-navigator>
        <ocr-navigator
          @onSuccess="CardBackImg"
          key="idCard2"
          certificateType="idCard"
          :opposite="true"
        >
          <view class="fanmian">
            <image
              :src="dataList.juridicalIdCardBackImg"
              style="height: 300rpx"
            ></image>
          </view>
        </ocr-navigator>
        <!--  #endif -->
      </view>

      <view class="card">
        <view class="title"> 经营者银行卡 </view>
        <!--  #ifdef MP-WEIXIN  -->
        <!-- 银行卡正面 -->
        <ocr-navigator
          @onSuccess="handleBankCard"
          key="bankCard1"
          certificateType="bankCard"
          :opposite="false"
        >
          <view class="screenshot bankCardFront">
            <image :src="dataList.bankImgFront" style="height: 300rpx"></image>
          </view>
        </ocr-navigator>
        <!-- 银行卡反面 -->
        <!-- <ocr-navigator
                    @onSuccess="handleBankImgBack"
                    key="bankCard2"
                    certificateType="bankCard"
                    :opposite="true"
                >
                    <view class="screenshot bankCardVerso">
                        <image :src="dataList.bankImgBack" style="height: 300rpx"></image>
                    </view>
                </ocr-navigator> -->
        <!--  #endif -->
        <!-- <view class="screenshot bankCardFront" @click="handleUpload('bankImgFront')">
                    <image :src="dataList.bankImgFront" style="height: 300rpx"></image>
                </view> -->
        <view
          class="screenshot bankCardVerso"
          @click="handleUpload('bankImgBack')"
        >
          <image :src="dataList.bankImgBack" style="height: 300rpx"></image>
        </view>
      </view>

      <view class="card" v-if="dataList.settleType == 1">
        <view class="title"> 经营者手持身份证自拍照 </view>
        <view class="screenshot hold-img" @click="handleUpload('selfieImg')">
          <image :src="dataList.selfieImg" style="height: 300rpx"></image>
        </view>
      </view>
      <!-- <view class="card">
			<view class="title">
				51车俱乐部小程序“我的”页面截图
			</view>
			<view class="screenshot" @click="Onscreenshot">
				<image :src="dataList.screenshotImg" style="height: 300rpx;"></image>
			</view>
		</view> -->
      <view class="card">
        <view class="title">
          {{ dataList.settleType == 2 ? '经营照片' : '门店照片' }}
        </view>
        <view class="Doorhead" @click="OnDoorhead">
          <image :src="dataList.DoorheadImg" style="height: 300rpx"></image>
        </view>
        <template v-if="dataList.settleType == 2">
          <view
            class="Indoor checkstandImg"
            @click="handleUpload('cashierImg')"
          >
            <image :src="dataList.cashierImg" style="height: 300rpx"></image>
          </view>
          <view
            class="Indoor siteImg"
            @click="handleUpload('indoorPhotograph')"
          >
            <image
              :src="dataList.indoorPhotograph"
              style="height: 300rpx"
            ></image>
          </view>
        </template>

        <template v-else>
          <view class="Indoor" @click="handleUpload('indoorPhotograph')">
            <image
              :src="dataList.indoorPhotograph"
              style="height: 300rpx"
            ></image>
          </view>
          <view class="Indoor" @click="handleUpload('indoorPhotograph2')">
            <image
              :src="dataList.indoorPhotograph2"
              style="height: 300rpx"
            ></image>
          </view>
        </template>
      </view>

      <view class="card" v-if="dataList.settleType == 2">
        <view class="title"> 《行业成员资金管理授权确认书》 </view>
        <view
          class="screenshot authorizationImg"
          @click="handleUpload('fundManagementConfirmationLetterImg')"
        >
          <image
            :src="dataList.fundManagementConfirmationLetterImg"
            style="height: 300rpx"
          ></image>
        </view>
      </view>

      <view class="card" v-if="dataList.settleType == 2">
        <view class="title"> 《授权与服务费确认书》 </view>
        <view
          class="screenshot serviceChargeImg"
          @click="handleUpload('feeConfirmationLetterImg')"
        >
          <image
            :src="dataList.feeConfirmationLetterImg"
            style="height: 300rpx"
          ></image>
        </view>
      </view>

      <view class="card-hy">
        <u-form-item label="行业" :required="true">
          <view @click="OnMccCode">
            <u--input
              inputAlign="right"
              border="none"
              :disabled="true"
              placeholder="请选择行业"
              v-model="dataList.mccMsg"
              :customStyle="{ backgroundColor: '#ffffff' }"
            >
            </u--input>
          </view>
        </u-form-item>
      </view>
      <view class="card" v-if="qualificationsList.length > 0">
        <view class="title"> 特殊资质 </view>
        <view
          v-for="(item, index) in qualificationsList"
          :key="index"
          @click="Onspecialimg(index)"
        >
          <view v-if="!qualificationsImg[index]" class="Indoor-special">
            <view
              class="tac txtLighGray size24"
              style="position: relative; top: 60%"
            >
              {{ item }}
            </view>
          </view>
          <view
            v-else
            class="Indoor-special"
            :style="{
              backgroundImage: 'url(' + qualificationsImg[index] + ')',
            }"
          >
          </view>
        </view>
      </view>
      <view class="card-hy myFormRadio" v-if="dataList.settleType == 2">
        <u-form-item :required="true">
          <span slot="label" :required="true" class="myFormRadio__title">
            我的身份
          </span>
          <div class="myFormRadio__radio">
            <u-radio-group
              v-model="identity"
              @change="groupChange"
              :disabled="identityDisabled"
            >
              <u-radio
                :customStyle="{ flexDirection: 'row-reverse' }"
                v-for="item in identityArr"
                :key="item.value"
                :name="item.value"
                :label="item.name"
              >
              </u-radio>
            </u-radio-group>
          </div>
        </u-form-item>
      </view>
      <view class="card" v-if="identity === 2 && dataList.settleType == 2">
        <view class="title"> 代理人所需资料 </view>
        <view
          class="Doorhead agentFrontImg"
          @click="handleUpload('agentIdCardFrontImg')"
        >
          <image
            :src="dataList.agentIdCardFrontImg"
            style="height: 300rpx"
          ></image>
        </view>
        <view
          class="Indoor agentReverseImg"
          @click="handleUpload('agentIdCardBackImg')"
        >
          <image
            :src="dataList.agentIdCardBackImg"
            style="height: 300rpx"
          ></image>
        </view>
        <view
          class="Indoor powerAttorneyImg"
          @click="handleUpload('agentPowerOfAttorneyImg')"
        >
          <image
            :src="dataList.agentPowerOfAttorneyImg"
            style="height: 300rpx"
          ></image>
        </view>
      </view>
      <!-- <agreement :value.sync="dataList.checkboxValue" /> -->
      <view v-if="isshow" class="bottom-btn">
        <text @click="Submit">下一步</text>
      </view>
    </u-form>
    <view style="height: 60rpx"></view>
    <u-toast ref="uToast"></u-toast>
    <u-loading-page
      loading-mode="spinner"
      :loading="showloading"
      bgColor="rgba(34,34,34,0.2)"
      color="white"
      loadingColor="white"
    ></u-loading-page>
    <u-popup
      :safeAreaInsetBottom="false"
      :show="mccshow"
      @close="mccshow = false"
      mode="center"
    >
      <view class="pop-mcc">
        <view class="tags">
          <view
            :class="{ 'current-tags': index == currentmcc }"
            class="tags-type"
            v-for="(item, index) in industrylist"
            :key="item"
            @click="currentmcc = index"
            >{{ item.typeMsg }}
          </view>
        </view>
        <view style="margin-top: 40rpx 20rpx 20rpx 20rpx">
          <view
            class="scc-value mccitem"
            v-for="(item1, index1) in industrylist[currentmcc].industryVOS"
            :key="index1"
            @click="Onchoosemcc(item1)"
          >
            <view class="u-flex jsb alc">
              <view style="width: 480rpx">
                {{ item1.mccMsg }}
              </view>
              <view>
                <u-icon
                  size="12"
                  name="arrow-right"
                  :bold="true"
                  color="#222222"
                ></u-icon>
              </view>
            </view>
          </view>
        </view>
      </view>
    </u-popup>
    <a-compress ref="compress"></a-compress>
  </view>
</template>

<script>
import { pathToBase64 } from 'image-tools';
// import agreement from "./agreement"
import ACompress from './components/ACompress.vue';
export default {
  components: {
    ACompress,
    // agreement
  },
  data() {
    return {
      option: {},
      identityDisabled: false,
      identityArr: [
        {
          name: '我是经营者本人',
          value: 1,
        },
        {
          name: '我不是经营者本人',
          value: 2,
        },
      ],
      currentmcc: 0,
      showloading: false,
      type: '',
      base64: '',
      isshow: true,
      mccshow: false,
      industrylist: [],
      qualificationsList: [],
      qualificationsImg: [],
      identity: 1,
      dataList: {
        settleType: '',
        // checkboxValue: [],
        qualificationsImg: [],
        mccCode: '',
        mccMsg: '',
        bankImgFront: '',
        bankImgBack: '',
        selfieImg: '',
        licenceOpening: '',
        indoorPhotograph: '',
        doorheadPhoto: '',
        appScreenshot: '',
        bnfHomeAddr: '',
        bnfCertExpire: '',
        bnfCertno: '',
        bnfName: '',
        companyAddrExt: '',
        companyCertExpire: '9999-12-31',
        shareholderHomeAddr: '',
        shareholderCertExpire: '',
        shareholderCertno: '',
        shareholderName: '',
        companyName: '',
        companyCertNo: '',
        legalmanHomeAddr: '',
        legalIdcardNo: '',
        legalName: '',
        juridicalIdCardFrontImg: '',
        juridicalIdCardBackImg: '',
        licenseImg: '',
        picList: [],
        legalCardDeadline: '',
        screenshotImg: '',
        fundManagementConfirmationLetterImg: '',
        cashierImg: '',
        feeConfirmationLetterImg: '',
        agentIdCardFrontImg: '',
        agentIdCardBackImg: '',
        agentPowerOfAttorneyImg: '',
        regMerType: '00',
        bankAcctType: '1',
        shareHolderType: '1',
        bnfType: '1',
        bnfList: [
          {
            bnfName: '',
            bnfCertno: '',
            bnfCertExpire: '',
            bnfCertType: '1',
            bnfHomeAddr: '',
          },
        ],
      },
    };
  },

  onLoad(option) {
    this.option = option;
    this.type = option.type;
    if (option.isshow == 1) {
      this.isshow = false;
      uni.setNavigationBarTitle({
        title: '入驻资料查看',
      });
      this.getList('1');
    } else if (option.isshow == 2) {
      this.getList('4');
    } else {
      this.getList('4', '/coc-merchant-app/app/v1/merchantsettledin/viewSave');
    }
    if (option.sourceType) {
      this.dataList.sourceType = option.sourceType;
    }
    if (option.operateId) {
      this.dataList.operateId = option.operateId;
    }
    if (option.operateId) {
      this.dataList.operateId = option.operateId;
    }
    if (option.affiliationType) {
      this.dataList.affiliationType = option.affiliationType;
    }
    if (option.isLineLedger) {
      this.dataList.isLineLedger = option.isLineLedger;
    }
    if (option.settleType) {
      this.dataList.settleType = option.settleType;
    }
  },
  onShow() {},
  methods: {
    groupChange(n) {
      this.identity = n;
      if (n == 1) {
        this.dataList.agentIdCardFrontImg = '';
        this.dataList.agentIdCardBackImg = '';
        this.dataList.agentPowerOfAttorneyImg = '';
      }
    },
    Onchoosemcc(item) {
      this.mccshow = false;
      this.dataList.mccCode = item.mccCode;
      this.dataList.mccMsg = item.mccMsg;
      this.qualificationsList = item.qualificationsList;
      this.qualificationsImg = [];
    },
    OnMccCode() {
      this.$request
        .post('/coc-merchant-app/app/v1/merchantsettledin/selectIndustry')
        .then((res) => {
          this.industrylist = res.data;
          this.mccshow = true;
        });
    },
    getList(type, url) {
      const urlHttp = url || '/coc-active/api/v1/merchantsettledin/dataEcho';
      let params = {};
      if (url) {
        params = {
          mobile: uni.getStorageSync('mobile'),
        };
      } else {
        params = {
          echoType: type,
        };
      }
      this.$request.post(urlHttp, params).then((res) => {
        let data = '';
        if (type === '1') {
          data = res.data.settlementMaterials;
        } else if (type === '4') {
          if (url) {
            data = res.data;
          } else {
            data = res.data.merchansettledinDTO;
          }
          this.dataList.bnfList = [];
        }

        const {
          licenseImg,
          juridicalIdCardFrontImg,
          juridicalIdCardBackImg,
          appScreenshot,
          licenceOpening,
          doorheadPhoto,
          indoorPhotograph,
          fundManagementConfirmationLetterImg,
          feeConfirmationLetterImg,
          cashierImg,
          agentIdCardFrontImg,
          agentIdCardBackImg,
          agentPowerOfAttorneyImg,
          industryMsg,
          qualificationsImg,
          indoorPhotograph2,
          settleType,
          isLineLedger,
          mccMsg,
        } = data;
        this.dataList = data;
        this.dataList.licenseImg = licenseImg;
        this.dataList.juridicalIdCardFrontImg = juridicalIdCardFrontImg;
        this.dataList.juridicalIdCardBackImg = juridicalIdCardBackImg;
        this.dataList.screenshotImg = appScreenshot;
        this.dataList.licenceOpening = licenceOpening;
        this.dataList.DoorheadImg = doorheadPhoto;
        this.dataList.cashierImg = cashierImg;
        this.dataList.indoorPhotograph = indoorPhotograph;
        this.dataList.fundManagementConfirmationLetterImg =
          fundManagementConfirmationLetterImg;
        this.dataList.feeConfirmationLetterImg = feeConfirmationLetterImg;
        this.dataList.agentIdCardFrontImg = agentIdCardFrontImg;
        this.dataList.agentIdCardBackImg = agentIdCardBackImg;
        this.dataList.agentPowerOfAttorneyImg = agentPowerOfAttorneyImg;
        this.dataList.mccMsg = industryMsg;
        this.indoorPhotograph2 = indoorPhotograph2;

        // 线上或线下
        this.dataList.isLineLedger = isLineLedger; // 线上为1  线下为0 反

        this.dataList.settleType = settleType;

        if (this.option.settleType) {
          this.dataList.settleType = this.option.settleType;
        }
        if (this.option.isLineLedger) {
          this.dataList.isLineLedger = this.option.isLineLedger;
        }

        if (type === '1') {
          this.dataList.IndoorImg = doorheadPhoto;
          this.dataList.licenceOpening =
            res.data.featuredMaterials.licenceOpening;

          this.dataList.bankImgBack = res.data.featuredMaterials.bankImgBack;
          this.dataList.bankImgFront = res.data.featuredMaterials.bankImgFront;
          this.dataList.selfieImg = res.data.featuredMaterials.selfieImg;
        } else if (type === '4') {
          this.dataList.IndoorImg = indoorPhotograph;
          this.dataList.mccMsg = mccMsg;
          this.dataList.bnfList = [];
        }

        console.log(
          agentIdCardFrontImg,
          agentIdCardBackImg,
          agentPowerOfAttorneyImg
        );
        if (
          agentIdCardFrontImg &&
          agentIdCardBackImg &&
          agentPowerOfAttorneyImg
        ) {
          this.identity = 2;
        } else {
          this.identity = 1;
        }

        this.qualificationsImg = qualificationsImg.split(',');
        this.qualificationsList = qualificationsImg.split(',');

        // 查看的时候不能让他修改 不显示下一步按钮，禁用功能
        if (!this.isshow) {
          this.identityDisabled = true;
        }
      });
    },
    Submit() {
      let _this = this;
      let state = true;
      // 判断是否我的身份
      if (this.identity === 2) {
        state = false;
        if (
          this.dataList.agentIdCardFrontImg &&
          this.dataList.agentIdCardBackImg &&
          this.dataList.agentPowerOfAttorneyImg
        ) {
          state = true;
        }
      }
      // 线下判断
      let isOnline = true;
      if (this.dataList.settleType == 2) {
        isOnline = false;
        if (
          this.dataList.fundManagementConfirmationLetterImg &&
          this.dataList.feeConfirmationLetterImg &&
          this.dataList.cashierImg &&
          this.dataList.indoorPhotograph
        ) {
          isOnline = true;
        }
      }
      // 线上判断
      let isUnOnline = true;
      if (this.dataList.settleType == 1) {
        isUnOnline = false;
        if (
          // this.dataList.IndoorImg &&
          this.dataList.indoorPhotograph2 &&
          this.dataList.indoorPhotograph &&
          this.dataList.selfieImg
        ) {
          isUnOnline = true;
        }
      }
      console.log(this.dataList, state, isOnline, isUnOnline);
      if (
        this.dataList.juridicalIdCardFrontImg &&
        this.dataList.juridicalIdCardBackImg &&
        this.dataList.licenseImg &&
        this.dataList.DoorheadImg &&
        this.dataList.bankImgFront &&
        this.dataList.bankImgBack &&
        this.dataList.mccCode &&
        this.dataList.doorheadPhoto &&
        state &&
        isOnline &&
        isUnOnline
      ) {
        // if(this.dataList.isLineLedger==1&&!this.dataList.screenshotImg){
        // 	this.$refs.uToast.show({
        // 		type: 'default',
        // 		message: "请上传'我的'页面截图",
        // 	})
        // 	return false
        // }
        // if (this.dataList.checkboxValue.length == 0) {
        //   uni.$u.toast('请确认阅读并同意商家合作协议');
        //   return false;
        // }
        let num = 0;
        this.qualificationsImg.filter((s) => {
          if (s) {
            num++;
          }
        });
        if (num != this.qualificationsList.length) {
          this.$refs.uToast.show({
            type: 'default',
            message: '请上传特殊资质图片',
          });
          return false;
        }
        if (this.qualificationsImg) {
          this.dataList.qualificationsImg = this.qualificationsImg.join(',');
        }
        this.dataList.picList?.filter((res) => {
          if (res.document_type == '0001') {
            res.document_name = '法人身份证';
          } else if (res.document_type == '0011') {
            res.document_name = '身份证反面';
          } else if (res.document_type == '0002') {
            res.document_name = '商户营业执照';
          } else if (res.document_type == '0034') {
            res.document_name = '商户网站/APP截图';
          } else if (res.document_type == '0005') {
            res.document_name = '门头照片';
          } else if (res.document_type == '0015') {
            res.document_name = '室内照片';
          } else if (res.document_type == '0007') {
            res.document_name = '手持身份证自拍照';
          } else if (res.document_type == '0025') {
            res.document_name = '银联卡正面';
          } else if (res.document_type == '0026') {
            res.document_name = '银联卡反面';
          }
        });

        this.dataList.regMerType = '01';
        this.dataList.bankAcctType = '0';
        this.dataList.shareHolderType = '1';
        this.dataList.bnfType = '1';

        // redis 缓存
        const newObj = JSON.parse(JSON.stringify(this.dataList));
        delete newObj.isLineLedger;
        delete newObj.settleType;

        this.$request.post(
          '/coc-merchant-app/app/v1/merchantsettledin/preservation',
          {
            mobile: uni.getStorageSync('mobile'),
            ...newObj,
          }
        );

        uni.navigateTo({
          url: `/pages/Settlein/individualInfo?identity=${this.identity}&settleType=${this.dataList.settleType}`,
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('getinfo', {
              data: _this.dataList,
            });
          },
        });
      } else {
        this.$refs.uToast.show({
          type: 'default',
          message: '请上传个体工商户入驻资料',
        });
      }
    },
    uploadPictures(path, type) {
      let add = false;
      let _this = this;
      this.$newrequest
        .post('/coc-active/api/v1/merchantsettledin/uploadPictures', {
          img: path,
        })
        .then((res) => {
          _this.showloading = false;
          if (res.code == 200) {
            this.dataList.picList?.filter((s, i) => {
              if (s.document_type == type) {
                add = true;
                this.dataList.picList[i] = {
                  document_type: type,
                  file_path: res.data.filePath,
                  file_size: res.data.fileSize,
                };
              }
            });
            if (!add) {
              this.dataList.picList?.push({
                document_type: type,
                file_path: res.data.filePath,
                file_size: res.data.fileSize,
              });
            }
          } else {
            uni.$u.toast(res.message);
            _this.showloading = false;
          }
        });
    },
    getbase64(img, type) {
      pathToBase64(img)
        .then((path) => {
          this.uploadPictures(path, type);
        })
        .catch((error) => {
          console.error(error);
          _this.showloading = false;
        });
    },
    Onspecialimg(index) {
      let _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          _this.uploadimg(res.tempFilePaths[0], index);
        },
      });
    },
    OnDoorhead() {
      let _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          _this.showloading = false;
          _this.dataList.DoorheadImg = res.tempFilePaths[0];
          _this.uploadimg(res.tempFilePaths[0], 'doorheadPhoto');
        },
      });
    },
    Onscreenshot() {
      let _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          _this.showloading = false;
          _this.dataList.screenshotImg = res.tempFilePaths[0];
          _this.uploadimg(res.tempFilePaths[0], 'appScreenshot');
        },
      });
    },
    handleUpload(type) {
      let _this = this;
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        success: function (res) {
          _this.uploadimg(res.tempFilePaths[0], type);
        },
      });
    },
    uploadimg(url, type) {
      let _this = this;
      this.$refs.compress
        .start(url)
        .then((res) => {
          url = res;
          this.showloading = true;
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
            fail: () => {
              _this.showloading = false;
              uni.showToast({
                title: '上传失败',
                icon: 'none',
              });
            },
            success: (uploadFileRes) => {
              console.log(11111111, JSON.parse(uploadFileRes.data).data);
              _this.dataList[type] = JSON.parse(uploadFileRes.data).data;

              // 这什么东西
              _this.qualificationsImg[type] = JSON.parse(
                uploadFileRes.data
              ).data;

              if (type === 'licenseImg') {
                this.getbase64(url, '0002');
              }
              if (type === 'juridicalIdCardFrontImg') {
                this.getbase64(url, '0001');
              }
              if (type === 'juridicalIdCardBackImg') {
                this.getbase64(url, '0011');
              }
              if (type === 'bankImgFront') {
                this.getbase64(url, '0025');
              }
              if (type === 'bankImgBack') {
                this.getbase64(url, '0026');
              }
              if (type === 'doorheadPhoto' && _this.dataList.settleType == 1) {
                _this.getbase64(url, '0005');
              }
              if (type === 'appScreenshot' && _this.dataList.settleType == 1) {
                _this.getbase64(url, '0034');
              }
              if (type === 'indoorPhotograph') {
                _this.getbase64(url, '0015');
              }
              if (type === 'selfieImg') {
                _this.getbase64(url, '0007');
              } else {
                this.showloading = false;
              }
            },
          });
        })
        .catch(() => {
          uni.$u.toast('图片压缩失败');
          this.showloading = false;
        });
    },
    async CardlicenseImg(e) {
      this.showloading = true;
      if (e.detail.reg_num.text.length == 20) {
        this.dataList.shopLic = e.detail.reg_num.text.substring(0, 18);
      } else if (e.detail.reg_num.text.length == 17) {
        this.dataList.shopLic = e.detail.reg_num.text.substring(0, 15);
      } else {
        this.dataList.shopLic = e.detail.reg_num.text;
      }
      this.dataList.shopName = e.detail.enterprise_name.text;
      this.dataList.shopAddrExt = e.detail.address.text;

      const { code, message } = await this.$newrequest.post(
        '/coc-active/api/v1/merchantsettledin/isRepeat',
        {
          shopName: this.dataList.shopName,
        }
      );
      if (code !== 200) {
        uni.$u.toast(message);
        this.showloading = false;
        return;
      }

      const { image_path } = e.detail;
      console.log(11111111, image_path);
      if (image_path) {
        this.uploadimg(image_path, 'licenseImg');
      }
    },
    handleBankCard(e) {
      this.showloading = true;
      const { number, image_path } = e.detail;
      // 带出开户账号
      this.dataList.bankAcctNo = number.text;

      console.log(4444444, image_path);
      if (image_path) {
        this.uploadimg(image_path, 'bankImgFront');
      }
    },
    handleBankImgBack(e) {
      console.log(e);
      this.showloading = true;
      const { image_path } = e.detail;

      console.log(555555, image_path);
      if (image_path) {
        this.uploadimg(image_path, 'bankImgBack');
      }
    },
    CardBackImg(e) {
      this.showloading = true;
      let valid_date = e.detail.valid_date.text.substr(
        e.detail.valid_date.text.lastIndexOf('-') + 1,
        8
      );
      valid_date = valid_date.slice(0, 4) + '-' + valid_date.slice(4);
      valid_date = valid_date.slice(0, 7) + '-' + valid_date.slice(7);
      this.dataList.legalCardDeadline = valid_date;

      const { image_path } = e.detail;

      console.log(33333333, image_path);
      if (image_path) {
        this.uploadimg(image_path, 'juridicalIdCardBackImg');
      }
    },
    CardFrontImg(e) {
      this.showloading = true;
      this.dataList.legalName = e.detail.name.text;
      this.dataList.legalIdcardNo = e.detail.id.text;
      this.dataList.legalmanHomeAddr = e.detail.address.text;
      // 开户名称字段
      this.dataList.bankAcctName = e.detail.name.text;

      const { image_path } = e.detail;
      console.log(22222222, image_path);
      if (image_path) {
        this.uploadimg(image_path, 'juridicalIdCardFrontImg');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.myFormRadio {
  ::v-deep {
    .u-radio text {
      font-size: 14px !important;
      line-height: 14px !important;
    }
    .u-radio__icon-wrap--circle {
      width: 16px !important;
      height: 16px !important;
    }
  }
}

ocr-navigator {
  ::v-deep {
    .container-center {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
.ocr-wrapper {
  margin: 40rpx auto;
  width: 750rpx;
}
.intro {
  margin: 40rpx;
}
</style>
<style lang="scss">
.page {
}

.card {
  margin: 20rpx;
  background-color: #ffffff;
  padding: 40rpx;
  border-radius: 14rpx;

  .zhengmian {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231021/file_1697852633009.png');
    background-size: 100% 100%;
  }

  .fanmian {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231021/file_1697852706778.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .bankCardFront {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231021/file_1697852777957.png') !important;
  }

  .bankCardVerso {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231021/file_1697852808196.png') !important;
  }

  .yingyezhizhao {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721244760.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .screenshot {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217227814.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .Doorhead {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217453529.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .Indoor {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230805/file_1691217397052.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .Indoor-special {
    height: 300rpx;
    background-color: #f8f8f8;
    border-radius: 10rpx;
    background-image: url('@/pages/Settlein/static/image/teshuzizhi.png');
    background-size: 100% 100%;
    margin-top: 40rpx;
  }

  .openAccount {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697779704137.png');
  }

  .checkstandImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697779788961.png');
  }

  .siteImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697779843080.png');
  }

  // 《行业成员资金管理授权确认书》
  .authorizationImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697780652985.png');
  }

  // 《授权与服务费确认书》
  .serviceChargeImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697780652985.png');
  }

  // 代理人身份证正面
  .agentFrontImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697780860388.png');
  }

  // 代理人身份证反面
  .agentReverseImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697780881837.png');
  }

  // 代理人授权书
  .powerAttorneyImg {
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20231020/file_1697780704916.png');
  }

  .hold-img {
    background-image: url('@/pages/Settlein/static/image/shouchi.png');
  }
}

.bottom-btn {
  text-align: center;
  margin-top: 40rpx;

  text {
    display: inline-block;
    width: 599rpx;
    height: 81rpx;
    background-color: #d91b1b;
    border-radius: 40rpx;
    line-height: 81rpx;
    font-size: 32rpx;
    color: #ffffff;
  }
}

.title {
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 40rpx;
}

.card-hy {
  margin: 20rpx;
  padding: 0rpx 40rpx;
  background-color: #ffffff;
  border-radius: 14rpx;
  text-align: center;
}

.pop-mcc {
  width: 600rpx;
  background-color: #f8f8f8;
  border-radius: 20rpx;
  padding: 40rpx;

  .tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .tags-type {
    width: 160rpx;
    height: 50rpx;
    background-color: #ffffff;
    border-radius: 10rpx;
    font-size: 28rpx;
    line-height: 50rpx;
    text-align: center;
    margin-top: 40rpx;
  }

  .current-tags {
    background-color: #d91b1b;
    color: #ffffff;
  }

  .scc-value {
    background-color: #ffffff;
    border-radius: 10rpx;
    color: #999999;
    font-size: 24rpx;
    margin-top: 20rpx;
    padding: 10rpx 20rpx 10rpx 20rpx;
  }
}

.myFormRadio {
  &__title {
    flex: 1;
    text-align: left;
  }

  &__radio {
    position: relative;
    right: 130rpx;
  }
}
</style>
