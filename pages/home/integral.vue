<template>
  <view class="page pageContainer">
	<!-- #ifdef MP-WEIXIN -->
    <!-- 广告位轮播 -->
    <carousel :topClass="['activity-img']" height="130px" urlkey="url" :autoPlay="true" :dataType="2"
      systemCode="applets_score_mall" :indicatorType="4">
    </carousel>
    <!-- 积分签到 -->
    <view class="signBox">
      <view class="signL">
        <view class="nums">{{ score }}</view>
        <view>积分</view>
      </view>
      <view class="signR">
        <image class="queen" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061689915.png"></image>
        <image class="signGo" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061529737.png" @click="signGo"></image>
      </view>
    </view>
    <!-- 宫格导航 -->
    <view class="gradNavBox">
      <view class="gradNavItem" v-for="(item, index) in gradNav" :key="index" @click="SelectedPage(item)">
        <image :src="item.icon" class="gradImg"></image>
        <view>{{ item.title }}</view>
      </view>
    </view>
    <!-- 公告  -->
    <view class="playitem" style="padding-bottom: 0rpx;" @click="OnPushPlay(1)">
      <view class="title">
        <image src="@/static/image/notice.png" class="noticeImg"></image>
        <view class="notieLine"></view>
        <view style="width: 510rpx;align-items: center;" class="flex">
          <!-- <view class="noticeTip">物流发货</view> -->
          <u-notice-bar color='#222222' direction='column' :text="noticeList.length ? noticeList : '暂无最新公告'"
            bgColor="#ffffff" :icon='none'>
          </u-notice-bar>
        </view>
        <view style="margin-top: 10rpx;">
          <u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
        </view>
      </view>
    </view>
    <!-- 信用卡 -->
    <view class="creditCardBox cardBox flex" v-if="bankShow">
      <view class="creditCard" v-for="(item, index) in cardArr" :key="index">
        <view class="flex">
          <image :src="item.ico" class="cardIco"></image>
          <view class="cardTitle">{{ item.title }}</view>
        </view>
        <image :src="item.img" class="cardimg" @click="showQRcode(item.id)"></image>
      </view>
    </view>
	<!-- #endif -->
    <!-- 积分导航 -->
    <view class="integralNav">
      <u-tabs :list="itegralNavArr" @click="bindInt" lineWidth="30" lineColor="#D91B1B"
        :inactiveStyle="{ color: '#222222' }"
        :activeStyle="{ fontWeight: 'bold', fontSize: '32rpx', color: '#222222' }">
      </u-tabs>
    </view>
    <!-- 积分列表列表组件 -->
    <GoodlList :proList.sync="proList"></GoodlList>
    <view class="reachBottom" v-if="proList.length > 0 && isReachBottom">我到底啦~</view>
    <u-popup :safeAreaInsetBottom='false' :show="isshow" @close="isshow = false" mode="center">
      <image show-menu-by-longpress mode="widthFix" :src="showimg"></image>
    </u-popup>
    <view v-if="proList.length == 0" style="text-align: center;">
      <view>
        <image style="width: 350rpx;height: 280rpx;"
          src="https://oss.dcqcjlb.com/51che_java_dev/20221216/77fba5780ba64e4ca8e6164e6b0dc52b.png">
        </image>
      </view>
      <view style="font-size: 24rpx;color: #999999;">
        暂无商品
      </view>
    </view>
    <u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
import GoodlList from '@/components/goodList/goodList.vue'
import carousel from "@/components/carousel/index.vue"
// import {numberFilter} from '@/utils/filter.js'
import {
  getstorage,
  setstorage,
  tologin
} from '@/utils/index.js'
import {
  shareMixin
} from "@/mixin/share.js"
export default {
  mixins: [shareMixin],
  components: {
    carousel,
    GoodlList
  },
  data() {
    return {
      cardQrIco: '../../static/image/ghicon.png',
      cardQrcode: 'https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720939094.png',
      itegralNavArr: [{
          name: '全部',
          start: null,
          end: null
        }],
      gradNav: [],
      cardArr: [{
        ico: '../../static/image/ghicon.png',
        title: '工行ETC信用卡',
        img: '../../static/image/ghcard.png',
        id: '1'
      },
      {
        ico: '../../static/image/nhicon.png',
        title: '农行车主信用卡',
        img: 'https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684719811033.png',
        id: '2'
      },
      ],
      showimg: '',
      isshow: false,
      noticeList: [],
      isLoadMore: true,
      banner: [],
      bankShow: false,
      score: 0,
      proList: [],
      queryData: {
        size: 10,
        minStore: null,
        maxStore: null,
        current: 1
      },
      isReachBottom: false,
	  visitinto:null
    }
  },
	onHide() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
		onUnload() {
			if (uni.getStorageSync('token')) {
				this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
					userVisitId: this.visitinto
				}).then(res => {})
			}
		},
  onLoad(option) {
	//#ifdef H5
		if(option.token){
			uni.setStorage({
				key: 'token',
				data: option.token
			});
		}
	// #endif
	// #ifdef MP-WEIXIN
    this.getbanner()
	this.getTypes(2)
	// #endif
	this.getIntegral()
    this.getGoodList()
  },
  onShow() {
	  if (uni.getStorageSync('token')) {
	  	this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
	  		type: 9
	  	}).then(res => {
	  		this.visitinto = res
	  	})
	  }
    this.score = 0
    // this.bankShow = false
	// #ifdef MP-WEIXIN
    this.getData()
    this.getTypes(1)
	// #endif
  },
  onReachBottom() {
    if (this.isLoadMore) {
      this.queryData.current++
      this.getGoodList();
    }
  },
  methods: {
    getbanner() {
      this.$newrequest.post("coc-my/banner/list", {
        layoutTypeId: '8',
        current: 1,
        size: 99
      }).then(res => {
        this.banner = res.data.records
      })
    },
    clickswiper(index) {
      let url = this.banner[index].jumpUrl
      if (!url) {
        return false
      }
      uni.navigateTo({
        url: '/pages/home/webview?url=' + url
      })
    },
    showQRcode(type) {
      if (type == 1) {
        this.showimg =
          'https://oss.dcqcjlb.com/51che_java_dev/20221109/de11e942f15f4085be184c52c78adc1e.jpg'
      } else {
        this.showimg =
          'https://oss.dcqcjlb.com/51che_java_dev/20221115/6abc070b042443db82cd3db9ce2fa83d.jpg'
      }
      this.isshow = true
    },
    getTypes(type) {
      this.$newrequest.post('/coc-system/api/v1/system/base_info/list', {
        type: type
      }).then(res => {
        if (type == 1) {
          if (res.data.length > 0) {
            res.data.filter(obj => {
              this.noticeList.push(obj.title)
            })
          } else {
            this.noticeList.push('暂无最新公告')
          }
        } else if (type == 2) {
          this.gradNav = res.data
        }
      })
    },
    getData() {
      this.$newrequest.get("/coc-active/api/v2/score/shop/index").then(res => {
        this.bankShow = res.data.bankShow;
        this.score = res.data.score
      })
    },
    getIntegral() {
      this.$newrequest.get("/coc-system/api/v1/system/score_section/list").then(res => {
        let itegralNavArr = [{
          name: '全部',
          start: null,
          end: null
        }]
        if (res.data && res.data.length > 0) {
          res.data.forEach(data => {
            itegralNavArr.push({
              name: data.title,
              start: data.start,
              end: data.end
            })
          })
        }
        this.itegralNavArr = itegralNavArr
      })
    },
    bindInt(e) {
      let {
        start,
        end
      } = e
      let queryData = {
        size: 10,
        minStore: start,
        maxStore: end,
        current: 1
      }
      this.queryData = queryData
      this.isLoadMore = true
      this.proList = []
      this.getGoodList();
    },
    getGoodList() {
      if (!this.isLoadMore) {
        return
      }
      this.isLoadMore = false
      this.$newrequest.post("/coc-active/api/v2/score/shop/product/list", this.queryData).then(res => {
        let list = res.data.records && res.data.records.length > 0 ? res.data.records : []
        if (this.queryData.current == 1) {
          this.proList = list
        } else {
          list.map(data => {
            this.proList.push(data)
          })
        }
        if (list.length >= this.queryData.size) {
          this.isLoadMore = true
        } else {
          this.isReachBottom = true
        }
      })
    },
    SelectedPage(item) {
      uni.navigateTo({
        url: '/pages/integralMall/selectPage?item=' + JSON.stringify(item)
      })
    },
    OnPushPlay(index) {
      if (index === 1) {
        if (this.noticeList[0] != '暂无最新公告') {
          uni.navigateTo({
            url: '/pages/integralMall/noticeDetail'
          })
        }
      }
    },
    signGo() {
      if (tologin() !== true) {
        return
      }
      uni.navigateTo({
        url: '/pages/my/integral/index'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.signBox {
  display: flex;
  justify-content: space-between;
  padding: 0rpx 25rpx;
  height: 160rpx;
  align-items: center;

  .signL {
    width: 61%;
    display: flex;
    align-items: baseline;

    .nums {
      font-size: 52rpx;
      color: #D91B1B;
      margin-right: 10rpx;
    }
  }

  .signR {
    position: relative;
    width: 36%;
    height: 160rpx;
    display: flex;
    align-items: center;

    .queen {
      position: absolute;
      width: 160rpx;
      height: 146rpx;
      z-index: 1;
      left: 0;
      top: 20rpx;

    }

    .signGo {
      position: absolute;
      z-index: 10;
      width: 120rpx;
      height: 44rpx;
      right: 0rpx;
    }
  }
}

.gradNavBox {
  width: 100%;
  height: 180rpx;
  background: #FFFFFF;
  border-radius: 10rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .gradNavItem {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: space-around;
    font-size: 28rpx;

    .gradImg {
      width: 70rpx;
      height: 70rpx;
      margin-bottom: 22rpx;
    }

  }
}

.notice {
  display: flex;
  align-items: center;
  height: 80rpx;
  line-height: 80rpx;
  padding: 0 25rpx;

  .noticeImg {
    width: 48rpx;
    height: 32rpx;
  }

  .notieLine {
    margin: 0 24rpx;
    background: rgba(76, 74, 74, 0.13);
    width: 1px;
    height: 40rpx;
  }

  .noticeR {
    display: flex;
    align-items: center;
    // clear: both;


    .noticeTip {
      width: 120rpx;
      height: 40rpx;
      line-height: 40rpx;
      background: rgba(217, 27, 27, 0.3);
      border-radius: 10rpx;
      color: #D91B1B;
      text-align: center;
      font-size: 24rpx;
      margin-right: 20rpx;
      // float: left;
    }

  }
}

.creditCardBox {
  padding: 25rpx;
  justify-content: space-between;

  .creditCard {
    flex-direction: column;
    justify-content: space-between;

    .cardIco {
      width: 34rpx;
      height: 34rpx;
      margin-right: 10rpx;
    }

    .cardTitle {
      font-size: 24rpx;
      font-weight: bold;
    }

    .cardimg {
      width: 305rpx;
      height: 200rpx;
      margin-top: 20rpx;
    }

  }
}

.slot-content {
  text-align: center;

  .cardQrIco {
    width: 50rpx;
    height: 50rpx;
    margin: 0 auto 10rpx;
    display: block;
  }

  .cardQRTitle {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 30rpx;
    text-align: center;
  }

  .cardQRImg {
    width: 440rpx;
    height: 440rpx;
    margin-bottom: 30rpx;
  }
}

.integralNav {
  margin: 10rpx 0 20rpx;
}

.cardBox {
  background: #fff;
  border-radius: 10rpx;
  margin-top: 20rpx;
  box-sizing: border-box;

}

.reachBottom {
  text-align: center;
  font-size: 24rox;
  color: #999999;
  padding: 20rpx;
  font-size: 24rpx;
  color: #999999;
}

.playitem {
  margin-top: 20rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding-bottom: 20rpx;
}

.title {
  padding: 20rpx 26rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.noticeImg {
  width: 48rpx;
  height: 32rpx;
}

.noticeTip {
  width: 120rpx;
  height: 40rpx;
  line-height: 40rpx;
  background: rgba(217, 27, 27, 0.3);
  border-radius: 10rpx;
  color: #D91B1B;
  text-align: center;
  font-size: 24rpx;
  margin-right: 20rpx;
}

.notieLine {
  margin: 0 24rpx;
  background: rgba(76, 74, 74, 0.13);
  width: 1px;
  height: 40rpx;
}
</style>
