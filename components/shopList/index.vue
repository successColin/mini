<template>
    <view>
        <u-tabs :activeStyle="{
            color: '#303133',
            fontWeight: 'bold',
            fontSize: '28rpx',
            transform: 'scale(1.05)',
        }" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:60rpx" lineHeight="3" lineWidth="24"
            :lineColor="`url(${lineBg}) 100% 100%`" keyName='brandName' :list="fourbrand" @click="OnClickTags">
        </u-tabs>
        <scroll-view style="width: 700rpx; white-space: nowrap;margin: 25rpx 0;" scroll-x="true" v-if="fourSShopVO.length">
            <view class="flex">
                <view v-for="(item, index) in fourSShopVO" :key="item.shopId" style="margin-right: 20rpx;" class="shop-btn"
                    :class="{ 'shop-btn-s': shopindex == index, 'allbtn': item.shopId == 0 }"
                    @click="OnchooseShopId(item, index)">
                    <view>
                        {{ item.baseName }}
                    </view>
                </view>
            </view>
        </scroll-view>
        <view class="modalBox nearBox" v-for="item in shopList" mode="heightFix" :key="item.shopId"
            @click="OnchooseShopId(item, 0)">
            <view class="newrH mb20 u-flex-al">
                <image v-if="item.brandLogo" :src="item.brandLogo" class="shopLogo" mode="heightFix"></image>
                <text>{{ item.storeAbbreviation }}</text>
            </view>
            <view class="flex alc jsb boxDec" v-if="item.doorheadPhotos && item.doorheadPhotos.length > 0">
                <template v-if="item.doorheadPhotos.length == 3">
                    <image :src="photo" class="nearItemPic3" mode="aspectFill" :key="index"
                        v-for="(photo, index) in item.doorheadPhotos">
                    </image>
                </template>
                <template v-if="item.doorheadPhotos.length == 1">
                    <image :src="item.doorheadPhotos[0]" class="nearItemPic1" mode="aspectFill">
                    </image>
                </template>
            </view>
            <view v-if="item.storeLabel" class="shopSpetial mb10"><text style="text-align: left;">{{ item.storeLabel
            }}</text></view>
            <view v-else style="height: 52rpx;"></view>
            <view class="flex alc jsb boxDec">
                <view class="flex alc">
                    <view class="flex alc" @click.stop="showLocation(item.lng, item.lat)">
                        <image src="@/static/image/dingwei.png" class="dwIcon"></image>
                        <view class="ml10 size24">{{ item.distanceMsg }}</view>
                    </view>
                    <view v-if="item.mobile" class="flex alc ml20" @click.stop="clickTel(item.mobile)">
                        <image src="@/static/image/dianhua.png" class="telIcon"></image>
                        <view class="ml10 size24">{{ item.mobile }}</view>
                    </view>
                </view>
                <view class="goShop">{{ fromPage == 'shop' ? '进店' : '保养' }}</view>
            </view>
        </view>
    </view>
</template>
<script>
import { getstorage } from '@/utils/index.js'
export default {
    props: {
        fromPage: String,
        title: String
    },
    data() {
        return {
            fourSShopVO: {},
            brandindex: 0,
            shopindex: 0,
            istoken: false,
            current: 1,
            shopList: [],
            brandId: null,
            shopId: '',
            visitinto: null,
            tabbarHeight: 0, //tabbar高度
            refresherStatus: false, //下拉刷新状态
            token: null,
            isExpert: null,
            brandName: '奔驰',
            fourbrand: [],
            lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
            gdData: [],
        }
    },
    created() {
        this.token = uni.getStorageSync('token')
        this.isExpert = uni.getStorageSync('isExpert')
        this.getBrand()
        this.userId = getstorage("userId")
    },
    onHide() {
        if (uni.getStorageSync('token')) {
            this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
                userVisitId: this.visitinto
            }).then(res => { })
        }
    },
    onUnload() {
        if (uni.getStorageSync('token')) {
            this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
                userVisitId: this.visitinto
            }).then(res => { })
        }
    },
    onShow() {
        if (uni.getStorageSync('token')) {
            this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
                type: 12
            }).then(res => {
                this.visitinto = res
            })
        }
    },
    watch: {
        title: {
            handler(newval, oldval) {
                this.getList()
            }
        }
    },
    methods: {
        OnchooseShopId(item, index) {
            if (item.shopId == 0) {
                this.shopId = item.shopId
                this.shopindex = index
                this.getList()
            } else {
                if (this.fromPage == 'shop') {
                    uni.navigateTo({
                        url: '/pages/carShops/4Sdetail/index?id=' + item.shopId
                    })
                } else if (this.fromPage == 'baoyang') {
                    uni.navigateTo({
                        url: "/pages/upkeep/bookingForm?shopId=" + item.shopId + '&brandId=' + this.brandId
                    });
                } else if (this.fromPage== 'home_baoyang') {
					uni.navigateBack({
						delta: 1
					});
					uni.$emit('carService_selshop', {shopId:item.shopId, storeAbbreviation:item.storeAbbreviation?item.storeAbbreviation:item.baseName})
				}
            }
        },
        OnClickTags(e) {
            this.shopindex = 0
            this.brandindex = e.index
            this.brandId = e.brandId
            let shopL = this.fourbrand[e.index].fourSShopVO
            if (shopL.length) {
                this.shopId = shopL[0].shopId
            } else {
                this.shopId = e.shopId
            }
            this.fourSShopVO = this.fourbrand[e.index].fourSShopVO
            this.brandName = e.brandName
            this.getList()
        },
        getBrand() {
            this.$newrequest.post("/coc-active/api/v1/four_s/fourSBrand").then(res => {
                res.data.unshift({
                    brandName: '全部',
                    brandId: '0',
                    shopId: 0,
                    fourSShopVO: []
                })
                res.data.filter(s => {
                    if (s.fourSShopVO.length > 1) {
                        s.fourSShopVO.unshift({
                            baseName: '全部',
                            shopId: '0'
                        })
                    }
                })
                this.fourbrand = res.data
                let shopL = res.data[0].fourSShopVO
                if (shopL.length) {
                    this.shopId = shopL[0].shopId
                } else {
                    this.shopId = 0
                }
                this.brandId = res.data[0].brandId
                this.fourSShopVO = res.data[0].fourSShopVO
                this.getList()
            })
        },
        OnPushcreditCard() {
            uni.navigateTo({
                url: "/pages/my/creditCard/index"
            })
        },
        //上拉刷新
        refresherrefresh() {
            this.refresherStatus = true
            this.getBrand()
            setTimeout(() => {
                this.refresherStatus = false
            }, 1000);
        },
        OnPushfourS() {
            uni.navigateTo({
                url: '/pages/activity/activityRegistration/foursactivity?brandId=' + this.brandId +
                    '&brandindex=' + this.brandindex
            })
        },
        // OnPushSearch() {
        //     uni.navigateTo({
        //         url: "/pages/carShops/shop/index?searchtxt=" + this.searchValue
        //     });
        //     this.searchValue = ''
        // },

        getList() {
            this.$newrequest.post("/coc-active/api/v2/homePage/four_s/nearbyShopS", {
                brandId: this.brandId,
                shopId: this.shopId,
                title: this.title
            }).then(res => {
                this.shopList = res.data
            })
        },
        getmonthday(time) {
            return time.substr(0, 5)
        },
        gettime(time) {
            return time.substr(6, 11)
        },
        //显示位置
        showLocation(lng, lat) {
            uni.openLocation({
                latitude: lat,
                longitude: lng,
                success: function () {
                    //console.log('success');
                }
            });
        },
        //拨打电话
        clickTel(tel) {
            uni.makePhoneCall({
                phoneNumber: tel
            });
        },

    }
}

</script>
  
<style lang="scss" scoped>
.title {
    padding: 20rpx 32rpx;
    display: flex;
    justify-content: space-between;
}

.more {
    height: 48rpx;
    background-color: #ffffff;
    font-size: 24rpx;
    line-height: 48rpx;
    border-radius: 24rpx;
    color: #666666;
    text-align: center;
    display: flex;
    justify-content: space-around;
}

.locationIcon {
    width: 36rpx;
    height: 44rpx;

}

.kefu-contact {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    width: 55rpx;
    height: 55rpx;
    display: inline-flex;
}

button::after {
    border: initial;
}

.u-flex {
    display: flex;
    justify-content: center;
    align-items: center;
}

.u-flex-al {
    display: flex;
    align-items: center;
}

.ellipsis {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.modalBox {
    background: #FFFFFF;
    border-radius: 10rpx;
    box-sizing: border-box;
}

.mb20 {
    margin-bottom: 20rpx;
}

.ml15 {
    margin-left: 15rpx;
}

.nearBox {
    padding: 20rpx 25rpx 24rpx 27rpx;
    margin: 10rpx 0 25rpx 0;

    .newrH {
        font-size: 32rpx;
        font-weight: bold;

        .shopLogo {
            margin-right: 16rpx;
            height: 50rpx;
        }
    }

    .nearItemPic1 {
        width: 100%;
        height: 210rpx;
        border-radius: 10rpx;
    }

    .nearItemPic3 {
        width: 210rpx;
        height: 210rpx;
        border-radius: 10rpx;
    }

    .shopSpetial {
        background: #FBE8E8;
        border-radius: 10rpx;
        color: #D91B1B;
        font-size: 24rpx;
        text-align: center;
        margin-top: 20rpx;
        padding: 10rpx 25rpx;
        display: inline-flex;
    }

    .dwIcon {
        width: 24rpx;
        height: 30rpx;
    }

    .telIcon {
        width: 25rpx;
        height: 25rpx;
    }

}

.nearBox:nth-last-child(1) {
    margin-bottom: 0;
}

.goShop {
    width: 100rpx;
    height: 52rpx;
    background: #D91B1B;
    border-radius: 10rpx;
    text-align: center;
    line-height: 52rpx;
    font-size: 24rpx;
    color: #fff;
}

.coverPicture {
    width: 700rpx;
    height: 400rpx;
    border-radius: 10rpx;
    position: relative;
}

.shop-btn {
    border-radius: 10rpx;
    background-color: #ffffff;
    font-size: 24rpx;
    text-align: center;
    height: 60rpx;
    line-height: 60rpx;
    padding-left: 10rpx;
    padding-right: 10rpx;
}

.shop-btn-s {
    background-color: #ffe2e2;
    color: #D91B1B;
    border: 1rpx #d91b1b solid;
}

.allbtn {
    width: 80rpx;
}

.boxDec {
    margin-top: 10rpx;
}
</style>
  