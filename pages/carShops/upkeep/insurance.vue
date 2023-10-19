<template>
  <view class="page">
    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230109/file_1673227077888.png"
      class="topPic" mode="widthFix"></image>
    <view class="contBox">
      <view class="huiList" v-if="topList.length>0">
        <view class="HuiItem" v-for="(item, index) in topList" :key="item.id">
          <view class="huiNum tac fwb">钜惠好礼{{ index+ 1 | numberfilter }}</view>
          <view class="huiCont fwb tac">{{ item.discount }}</view>
        </view>
      </view>
      <view class="buyList bgfff br10" >
        <view class="buyItem" >
          <view class="buyH size32 fwb">交强险</view>
          <view class="itemInfo" v-for="item in contentList1">
            <view class="flex alc itemInfoH mb20">
              <image src="@/pages/carShops/static/image/must.png" class="mustpng" v-if="item.proposal == 1"></image>
              <image src="@/pages/carShops/static/image/mayNo.png" class="mayPng" v-if="item.proposal == 2"></image>
              <image src="@/pages/carShops/static/image/maybe.png" class="mayPng" v-if="item.proposal == 3"></image>
              <view class="ml10" style="margin-right:8rpx;">{{ item.insurance }}</view>
              <u-icon name="info-circle" color="#666666" size="14" class="ml10"
                @click="lookExplain(item.insuranceExplain)"></u-icon>
            </view>
            <view class="reason size24">
              <text class="mainRed ">推荐理由:</text>
              <text>{{ item.reason }}</text>
            </view>
          </view>
        </view>
        <view class="buyItem" >
          <view class="buyH size32 fwb">商业险</view>
          <view class="itemInfo" v-for="item in contentList2" :key="index">
            <view class="flex alc itemInfoH mb20">
              <image src="@/pages/carShops/static/image/must.png" class="mustpng" v-if="item.proposal == 1"></image>
              <image src="@/pages/carShops/static/image/mayNo.png" class="mayPng" v-if="item.proposal == 2"></image>
              <image src="@/pages/carShops/static/image/maybe.png" class="mayPng" v-if="item.proposal == 3"></image>
              <view class="ml10" style="margin-right:8rpx;">{{ item.insurance }}</view>
              <u-icon name="info-circle" color="#666666" size="14" class="ml10"
                @click="lookExplain(item.insuranceExplain)"></u-icon>
            </view>
            <view class="reason size24">
              <text class="mainRed ">推荐理由:</text>
              <text>{{ item.reason }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="bmBtn fwb size32" @click="getQuote">获取报价</view>
    </view>
    <!-- 报价弹窗 -->
    <u-popup :show="showQuote" @close="closeQuote" @open="open" :round="10" mode="bottom" :closeable='true'>
      <view class="popTitle size32 fwb tac">报价</view>
      <view class="formBox">
        <u-form :model="formData" ref="formData" :rules="rules" label-width="80"
          :border-bottom="false">
          <u-form-item label="行驶城市" prop="city" :border-bottom="false">
            <view class="flex alc jsb br10 bgf8 cityBox" @click="checkCity">
              <view>
                {{ formData.city }}
              </view>
              <view style="margin-left: 4rpx;">
                <u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
              </view>
            </view>
          </u-form-item>
          <u-form-item label="车牌号" prop="plate" :border-bottom="false">
            <view class="input-info  flex alc">
              <view @click="keyShow = true" class="province flex alc br10">
                <view>
                  {{ Defaultprovince }}
                </view>
                <view style="margin-left: 4rpx;">
                  <u-icon size="12" name="arrow-down" :bold='true' color="#222222"></u-icon>
                </view>
              </view>
              <u--input
                :customStyle="{ backgroundColor: '#f8f8f8', width: '240rpx', height: '60rpx', lineHeight: '60rpx', padding: '0 12rpx' }"
                v-model="formData.plate" placeholder="请输入车牌号">
              </u--input>
            </view>
          </u-form-item>
          <u-form-item label="姓名" prop="customerName" :border-bottom="false">
            <u-input v-model="formData.customerName" type='text' placeholder="请输入" />
          </u-form-item>
          <u-form-item label="手机号" prop="customerMobile" :border-bottom="false">
            <u-input v-model="formData.customerMobile" type='number' placeholder="自动获取，支持修改" />
          </u-form-item>
        </u-form>
        <view class="checkbox flex">
          <view style="position: absolute;top: -60rpx;left: 100rpx;" v-if="showBubble">
            <image style="width: 250rpx;height: 54rpx;" src="@/pages/carShops/static/image/Bubble.png"></image>
          </view>
          <checkbox-group placement="column" @change="checkboxChange">
            <checkbox style="transform: scale(0.8)" color="#db1a1b"
              :customStyle="{ marginBottom: '8px', fontSize: '10rpx' }" shape="circle" activeColor="#D91B1B"
              :checked="isAgree">
              <view class="xieyi flex alc">
                <text>我已阅读并同意</text>
                <text @click="OnPushUserAgreement" style="color:#db1a1b;">《个人信息保护声明》</text>
              </view>
            </checkbox>
          </checkbox-group>
        </view>
        <view class="bmBtn" @click="getPrice" style="background: #D91B1B;color:#fff;">快速报价</view>
      </view>
    </u-popup>
    <u-keyboard ref="uKeyboard" mode="car" :show="keyShow" @change="changeKey" @confirm="chooseKey"></u-keyboard>
    <!-- 收到提示弹窗-->
    <u-modal :show="infoShow" :content="content" closeOnClickOverlay showCancelButton >
      <u-button slot="confirmButton" shape="circle"
        :customStyle="{ width: '200rpx', backgroundColor: '#D91B1B', color: '#fff' }"
        @click="infoShow = false">好的</u-button>
    </u-modal>
    <!-- 感叹号 信息说明 -->
    <u-modal :show="explainShow" title="险种说明" closeOnClickOverlay showCancelButton
      class="infoModal" >
      <view style="max-height:600rpx;overflow-y: auto;">
        <view>{{ explainInfo }}</view>
      </view>
      <u-button slot="confirmButton" shape="circle" @click="explainShow = false"
        :customStyle="{ width: '200rpx', backgroundColor: '#D91B1B', color: '#fff' }">好的</u-button>
    </u-modal>
    <request-loading></request-loading>
  </view>
</template>

<script>
import {
  getstorage,
  setstorage,
  tologin
} from '@/utils/index.js'
import Licenseplate from '@/utils/Licenseplate.js'
export default {
  components: {
  },
  filters: {
    numberfilter: function (num) {
      const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'] // changeNum[0] = "零"
      const unit = ['', '十', '百']
      num = parseInt(num)
      const getWan = (temp) => {
        const strArr = temp.toString().split('').reverse()
        let newNum = ''
        for (var i = 0; i < strArr.length; i++) {
          newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
        }
        return newNum
      }
      const overWan = Math.floor(num / 100)
      let noWan = num % 100
      if (noWan.toString().length < 2) noWan = '0' + noWan
      return overWan ? getWan(overWan) + '百' + getWan(noWan) : getWan(num)
    }
  },
  data() {
    return {
      explainShow: false,
      explainInfo: '',
      infoShow: false,
      keyShow: false,
      showQuote: false,
      isAgree: false,
      showBubble: false,
      columns: [Licenseplate],
      Defaultprovince: '浙',
      formData: {
        city: '',
        type: 5,
        plate: '',
        shopId: ''
      },
      content: '已收到您的报价申请，我们将安排专业的客户经理 马上与您取得联系！',
      shopId: '',
      topList: [],
      contentList1: [],
      contentList2: [],
      key: '',
      rules: {
        'customerMobile': {
          type: 'string',
          required: true,
          message: '请填写手机号',
          trigger: ['blur', 'change']
        },
        'customerName': {
          type: 'string',
          required: true,
          message: '请填写姓名',
          trigger: ['blur', 'change']
        },
        'plate': {
          type: 'string',
          required: true,
          message: '请填写车牌号',
          trigger: ['blur', 'change']
        },
      },
    }
  },

  onLoad(option) {
    if (getstorage("cityname")) {
      this.formData.city = getstorage("cityname")
    }
    if (getstorage("mobile")) {
      this.formData.customerMobile = getstorage("mobile")
    }
    // if (getstorage("shopId")) {
    //   this.formData.shopId = getstorage("shopId")
    // }
    this.shopId = option.id
    this.formData.shopId = option.id
    this.getJuhui(option.id)
    this.getList(option.id)
    uni.$on('homeChangeCity', res => {
      this.formData.city = res.name
    })
  },

  methods: {
    // 顶部钜惠列表
    getJuhui(shopid) {
      this.$newrequest.post("/coc-active/api/v1/fours/carInsurance/list", { shopId: shopid }).then(res => {
        console.log(res.data)
        this.topList = res.data
      }).catch(err => {

      })
    },
    // 下面车险列表内容
    getList(shopid) {
      this.$newrequest.get("/coc-active/api/v1/fours/carInsurance/list").then(res => {
        let CompulsoryArr = [], CommercialArr = [];
        res.data.forEach(res => {
          if (res.type == 1) {
            CompulsoryArr.push(res)
          } else if (res.type == 2) {
            CommercialArr.push(res)
          }
        })
        this.contentList1 = CompulsoryArr
        this.contentList2 = CommercialArr
      }).catch(err => {

      })
    },
    // 获取报价按钮
    getQuote() {
      if (tologin() !== true) {
        return
      }
      this.showQuote = true
    },
    closeQuote() {
      this.showQuote = false
    },
    handleCity() { },
    handleCarCity() { },
    open() { },
    OnPushUserAgreement() {
      uni.navigateTo({
        url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
      })
    },
    changeKey(e) {
      this.key = e
    },
    chooseKey() {
      this.Defaultprovince = this.key
      this.keyShow = false
    },
    checkCity() {
      uni.navigateTo({
        url: '/pages/activity/chooseCity/chooseCity'
      })
    },
    // 快速报价
    getPrice() {
      if (this.isAgree) {
        this.getNow()
      } else if (!this.isAgree) {
        this.showBubble = true
      }
    },
    checkboxChange() {
      this.isAgree = !this.isAgree
      if (this.isAgree) {
        this.showBubble = false
      }
    },
    async getNow() {
      try {
        await this.$refs.formData.validate();
        this.formData.plate = this.Defaultprovince + this.formData.plate
        let msg = Object.assign({}, this.formData);
        await this.$newrequest.post("/coc-active/api/v1/four_s/save_data", msg);
        this.formData.plate = ''
        this.formData.customerName = ''
        // this.formData = {
        //   city: getstorage("cityname"),
        //   type: 5,
        //   plate: '',
        //   shopId: this.shopId
        // }
        this.showQuote = false
        this.infoShow = true
      } catch (error) {
        uni.showToast({
          title: error,
          icon: 'none',
          duration: 2000
        })
        // this.$message.error(error);
       }
    },
    lookExplain(cont) {
      this.explainShow = true
      this.explainInfo = cont
    }
  }
}

</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: #FF2B2D;
}

.topPic {
  width: 100%;
}

.contBox {
  position: relative;
  margin-top: -60rpx;
  padding: 0 25rpx 5rpx;

  .huiList {
    .HuiItem {
      position: relative;
      width: 100%;
      height: 150rpx;
      margin-bottom: 34rpx;

      .huiNum {
        position: absolute;
        width: 210rpx;
        height: 50rpx;
        line-height: 50rpx;
        background: #FF4A4A;
        border-radius: 26rpx;
        color: #fff;
        top: -20rpx;
        left: 250rpx;
      }

      .huiCont {
        width: 100%;
        height: 150rpx;
        line-height: 150rpx;
        background: linear-gradient(0deg, #FFBD84, #FFEEDE);
        box-shadow: 0px 4rpx 5rpx 0px #FF0B0C;
        border-radius: 75rpx;
        font-size: 36rpx;
      }
    }
  }

  .buyList {
    margin-top: 60rpx;
    box-sizing: border-box;
    padding: 30rpx 25rpx 50rpx;

    .buyItem {
      border-bottom: 1rpx solid #999999;
      margin-bottom: 40rpx;

      .buyH {
        margin-bottom: 26rpx;
      }

      .itemInfo {
        margin-bottom: 40rpx;

        .mustpng {
          width: 70rpx;
          height: 38rpx;
        }

        .mayPng {
          width: 90rpx;
          height: 38rpx;
        }

        .reason {
          line-height: 36rpx;
        }
      }
    }

    .buyItem:nth-last-child(1) {
      border: none;
    }

  }
}

.bmBtn {
  width: 350rpx;
  height: 80rpx;
  background: linear-gradient(0deg, #FFBD84, #FFEEDE);
  border-radius: 40rpx;
  text-align: center;
  line-height: 80rpx;
  color: #FF4F2B;
  margin: 85rpx auto;
}

.popTitle {
  height: 86rpx;
  line-height: 86rpx;
}

.formBox {
  padding: 0 30rpx;

  .province {
    width: 100rpx;
    background: #f8f8f8;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin-right: 20rpx;
    box-sizing: border-box;
    height: 60rpx;
    line-break: 60rpx;
  }

  .bgf8 {
    background-color: #f8f8f8;
  }

  /deep/ .u-form-item {
    .u-form-item__body__right__content {
      width: 390rpx;
      height: 60rpx;
      line-height: 60rpx;

      .u-input {
        background: #f8f8f8;
        border: 0;
        font-size: 32rpx;
      }
    }

    .u-form-item--left__content__label {
      font-size: 32rpx;
      font-weight: bold;
    }

    .u-input__input {
      box-sizing: border-box;
      height: 0rpx;
      background: #f8f8f8;
      border-radius: 10rpx;
      font-size: 30rpx;
    }
  }

}

.checkbox {
  justify-content: center;
  position: relative;
  margin-top: 30rpx;

  .xieyi {
    font-size: 32rpx;
    margin-left: 10rpx;
  }
}

.cityBox {
  padding: 0 20rpx;
  height: 60rpx;
  line-height: 60rpx;
}

</style>
