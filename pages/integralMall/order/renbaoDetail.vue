<template>
  <view class="page">
    <view v-if="isshowpage&&dataList">
      <template v-if="dataList.source===2">
        <view v-for="(item,index) in dataList.cardLists" :key="index" style="margin-top: 12rpx;">
          <view class="order-detail">
            <view class="u-flex" style="justify-content: space-between">
              <view>
                商品名称:
              </view>
              <view>
                <text class="ellipsis" user-select="true" style="max-width: 480rpx;">
                  {{ dataList.scoreProductName }}
                </text>
              </view>
            </view>
            <view v-if="item.username" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
              <view>
                兑换码:
              </view>
              <view class="u-flex">
                <view user-select="true">
                  {{ item.username }}
                </view>
                <view @click="OnCopy(item.username)" style="margin-left: 14rpx;">
                  <image src="@/static/image/fuzhi.png" style="height: 22rpx;width:22rpx;"></image>
                </view>
              </view>
            </view>
            <view v-if="geturl(item)" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
              <view>
                兑换券:
              </view>
              <view class="click-this" @click="clickthis(item)">
              复制链接到浏览器打开
              </view>
            </view>
            <view v-if="item.password" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
              <view>
                密码:
              </view>
              <view>
                <text user-select="true">
                  {{ item.password }}
                </text>
              </view>
            </view>
            <view v-if="item.price" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
              <view>
                面值:
              </view>
              <view>
                <text user-select="true">
                  ￥{{ item.price }}
                </text>
              </view>
            </view>
            <view v-if="item.endtime" class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
              <view>
                截至日期:
              </view>
              <view>
                {{ item.endtime }}
              </view>
            </view>

          </view>
        </view>
      </template>
      <view v-if="dataList.source===1&&dataList.commodityType===3" style="margin-top: 12rpx;">
        <view class="order-detail">
          <view class="u-flex" style="justify-content: space-between">
            <view>
              商品名称:
            </view>
            <view>
              <text class="ellipsis" user-select="true" style="max-width: 480rpx;">
                {{ dataList.scoreProductName }}
              </text>
            </view>
          </view>
          <view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
            <view>
              手机号:
            </view>
            <view class="u-flex">
              <text user-select="true">
                {{ dataList.mobile }}
              </text>
            </view>
          </view>
          <view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
            <view>
              订单编号:
            </view>
            <view class="u-flex">
              <text user-select="true">
                {{ dataList.orderNo }}
              </text>
            </view>
          </view>
          <view class="u-flex" style="justify-content: space-between;margin-top: 40rpx;">
            <view>
              领取时间:
            </view>
            <view>
              <text user-select="true">
                {{ dataList.exchangeTime }}
              </text>
            </view>
          </view>
        </view>
      </view>
      <view class="u-flex" style="justify-content: space-between;margin-top: 37rpx;margin-bottom: 37rpx;">
        <view>

        </view>
        <view style="font-size: 28rpx;color: #D91B1B;font-weight: bold;">
          领取成功
        </view>
      </view>
      <view style="font-size: 32;font-weight: bold;">
        领取须知
      </view>
      <view style="font-size: 24rpx;color: #666666;margin-top: 34rpx;">
        <u-parse :content="dataList.exchangeKnow"></u-parse>
      </view>
    </view>
    <request-loading></request-loading>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      isshowpage: false,
      id: '',
      dataList: null
    }
  },

  onLoad(option) {
    this.id = option.orderid
    this.getList(option.orderid)
  },
  onShow() {
  },
  methods: {
    OnCopy(value) {
      uni.setClipboardData({
        data: value,
        success: function () {
          console.log('success', value)
          uni.showToast({
            title: '复制成功',
            icon: 'none',
          })
        }
      })
    },
    clickthis(item) {
      if (item.shorturl) {

		uni.setClipboardData({
		  data: item.shorturl,
		  success: function () {
		    console.log('success', value)
		    uni.showToast({
		      title: '复制成功',
		      icon: 'none',
		    })
		  }
		})
      } else {
		uni.setClipboardData({
		  data: item.link,
		  success: function () {
		    console.log('success', value)
		    uni.showToast({
		      title: '复制成功',
		      icon: 'none',
		    })
		  }
		})
      }
    },
    geturl(item) {
      if (item.shorturl || item.link) {
        return true;
      } else {
        return false;
      }
    },
    getList(id) {
      if (!this.isshowpage) {
        this.$showLoading()
      }
      this.$newrequest.get('/coc-active/api/v2/score/shop/score/order/' + id).then(res => {
        this.dataList = res.data
      }).catch(err => {

      }).finally(() => {
        if (!this.isshowpage) {
          this.isshowpage = true
          this.$hideLoading()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page {
  margin: 25rpx;
}

.card-zhi {
  padding: 27rpx 29rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  font-size: 28rpx;
  font-weight: 500;
}

.order-detail {
  margin-top: 8rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 44rpx 26rpx 39rpx 28rpx;
  font-size: 24rpx;
  font-weight: 500;
}

.commodity-card {
  margin-bottom: 34rpx;
  margin-top: 8rpx;
  background-color: #ffffff;
  border-radius: 10rpx;
  padding: 29rpx 31rpx 31rpx 26rpx;
  display: flex;
}

.card-title {
  width: 478rpx;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  /* 这里是超出几行省略 */
}

.click-this {
  color: #D91B1B;
  text-decoration: underline;
}

.ellipsis {
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
