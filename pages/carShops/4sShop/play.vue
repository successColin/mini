<template>
    <view class="">
        <search :fromType="'玩乐'" :isIcon="1" @getValue="getValue" :isBgf="true"></search>
        <view class="page_top">
            <u-tabs :activeStyle="{
                color: '#303133',
                fontWeight: 'bold',
                fontSize: '28rpx',
                transform: 'scale(1.05)',
            }" :inactiveStyle="{ fontSize: '28rpx' }" itemStyle="height:60rpx" lineHeight="3" lineWidth="24"
                :lineColor="`url(${lineBg}) 100% 100%`" keyName='brandName' :list="fourbrand" @click="OnClickTags">
            </u-tabs>
        </view>
        <scroll-view style="width: 700rpx; white-space: nowrap;margin: 25rpx auto;" scroll-x="true" v-if="dataList.length">
            <view class="flex">
                <view v-for="(item, index) in fourSShopVO" :key="item.shopId" style="margin-right: 20rpx;" class="shop-btn"
                    :class="{ 'shop-btn-s': shopId == item.shopId, 'allbtn': item.shopId == 0 }"
                    @click="OnchooseShopId(item, index)">
                    <view>
                        {{ item.baseName }}
                    </view>
                </view>
            </view>
        </scroll-view>
        <view style="margin: 25rpx;" v-if="dataList.length">
            <view v-for="(item, index) in dataList" :key="index" style="margin-top: 20rpx;" @click="OnPushDetail(item)">
                <view class="coverPicture"
                    :style="{ backgroundImage: 'url(' + item.coverPicture + ')', backgroundSize: 'cover' }">
                    <view class="s_ghbox" v-if="item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2">
                        <text v-if="item.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
                        <text style="margin-right: 14rpx;" v-if="item.activitySignUpStatus == 1">报名开启时间</text>{{
                            item.activitySignUpStatus == 2 ? item.activityEndTime : item.activityBeginTime }}
                    </view>
                    <view v-if="(item.activitySignUpStatus == 1 || item.activitySignUpStatus == 2) && item.districtName"
                        class="backimg">
                        <view style="font-size: 24rpx;color: #ffffff">
                            {{ item.districtName }}
                        </view>
                    </view>
                    <view style="position: absolute;left: 260rpx;top:110rpx ;" v-if="item.activitySignUpStatus == 1">
                        <image src="@/static/image/huodongyugao.png" style="width: 180rpx;height: 180rpx;"></image>
                    </view>
                    <view style="position: absolute;left: 260rpx;top:110rpx ;"
                        v-if="item.activitySignUpStatus == 3 || item.activitySignUpStatus == 5 || item.activitySignUpStatus == 4">
                        <image src="@/static/image/jieshu.png" style="width: 180rpx;height: 180rpx;"></image>
                    </view>
                    <view style="position: absolute;bottom: 24rpx;right: 27rpx;" v-if="item.activitySignUpStatus == 2">
                        <view class="btn">报名中</view>
                    </view>
                </view>
                <view class="title  moreLine size28"> {{ item.title }} </view>
                <view class="item-detail">
                    <view v-if="item.payType == 2">
                        <text style="color: #D91B1B;font-size: 24rpx;">
                            ¥
                        </text>
                        <text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;margin-left: 9rpx;">
                            {{ item.bankCardPrice ? item.bankCardPrice : item.flashSalePrice }}
                        </text>
                        <view style="display: inline-table;position: relative;top: 10rpx;" class="ml10">
                            <view class="u-flex" v-if="isExpert == 1 && token && item.maxCommissionPrice">
                                <view class="u-flex">
                                    <view class="rebate-img rebate-size"></view>
                                </view>
                                <view class="rebate-style" style="margin-right: 24rpx;"
                                    v-if="item.maxCommissionPrice > item.minCommissionPrice">
                                    {{ item.maxCommissionPrice }}
                                </view>
                                <view class="rebate-style" style="margin-right: 24rpx;" v-else>
                                    {{ item.minCommissionPrice }}
                                </view>
                            </view>
                        </view>
                        <text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
                            ¥{{ item.marketPrice }}
                        </text>
                    </view>
                    <view v-else>
                        <text style="color: #D91B1B;font-size: 32rpx;font-weight: bold;">
                            免费
                        </text>
                        <text style="color: #999999;font-size: 24rpx;text-decoration: line-through;margin-left: 14rpx;">
                            ¥{{ item.marketPrice }}
                        </text>
                    </view>
                    <view @click.stop="Onremind(item, index)" class="remind"
                        v-if="item.activitySignUpStatus == 1 && iscommission == 0"
                        :class="{ 'Asreminder': item.isRemind == 1 }">
                        提醒我
                    </view>
                    <view class="headPortraits" v-else>
                        <view style="margin-right: 16rpx;">
                            已报名<text style="margin-left: 9rpx;">{{ item.saleNum }}/{{ item.stock }}</text>
                        </view>
                        <view class="u-flex" v-if="iscommission == 0">
                            <view style="padding-right: 4rpx;" v-for="(item1, index1) in item.headPortraits" :key="index1">
                                <u-avatar size="40rpx" :src="item1"></u-avatar>
                            </view>
                            <view v-if="item.saleNum > 3">
                                <u-icon size="16" :bold='true' name="more-dot-fill"></u-icon>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="flex alc mt10" v-if="item.baseName">
                    <image class="shop-image" src="https://oss.dcqcjlb.com/51che_java_dev/20231030/file_1698662297066.png"/>
                    <view class="ml10 txtLighGray size24">{{ item.baseName }}</view>
                    <view v-if="item.cbBaseName " class="txtLighGray size24">&{{item.cbBaseName }}</view>
                </view>
            </view>
        </view>
        <view class="tac mt50" v-else>
            <image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
            </image>
            <view class="txtDarkGray">暂无内容~</view>
        </view>
        <view style="height: 50rpx;"></view>
    </view>
</template>

<script>
import search from "@/components/search/index.vue"
import {
tologin
} from '@/utils/index.js'
export default {
    components: {
        search
    },
    data() {
        return {
            fourSShopVO: [],
            newisshowend: false,
            isLoadMore: false,
            current: 1,
            dataList: [],
            iscommission: 0,
            brandName: '全部',
            fourbrand: [],
            keyword: '',
            shopId: null,
            brandId: null,
            lineBg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC',
        }
    },

    onLoad(option) {
        this.getactivity()
        this.getBrand()
    },
    onShow() { },
    onReachBottom() {
        if (!this.isLoadMore) {
            this.current++
            this.getBrand()
        }
    },
    methods: {
        getValue(msg){
            this.keyword = msg
            this.getactivity()
        },
        OnClickTags(e) {
            this.brandId = e.brandId
            this.brandindex = e.index
            let shopL = this.fourbrand[e.index].fourSShopVO
            if (shopL.length) {
                this.shopId = shopL[0].shopId
            } else {
                this.shopId = e.shopId
            }
            this.fourSShopVO = this.fourbrand[e.index].fourSShopVO
            this.brandName = e.brandName
            this.getactivity()  
        },
        OnchooseShopId(e){
            this.shopId = e.shopId
            this.getactivity()  
        },
        getBrand() {
            this.$newrequest.post("/coc-active/api/v1/four_s/fourSBrandByType",{type: 3}).then(res => {
                if (res.data.length > 1) {
                    res.data.unshift({
                        brandName: '全部',
                        shopId: null,
                        brandId: '',
                        fourSShopVO: []
                    })
                }
                res.data.filter(s => {
                    if (s.fourSShopVO.length > 1) {
                        s.fourSShopVO.unshift({
                            baseName: '全部',
                            shopId: null
                        })
                    }
                })
                this.fourbrand = res.data
                let shopL = res.data[0].fourSShopVO
                if (shopL.length) {
                    this.shopId = shopL[0].shopId
                } else {
                    this.shopId = null
                }
                this.brandId = res.data[0].brandId
                this.fourSShopVO = res.data[0].fourSShopVO
                this.getactivity()
            })
        },
        getactivity() {
            this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2", {
                current: this.current,
                size: 20,
                payType: 0,
                shopTypeId: 2,
                isEnd: 1,
                shopId: this.shopId,
                title: this.keyword,
                brandId: this.brandId,
                newUserLimit: 0,
            }).then(res => {
                if (res.data.homePageActivitysVOIPage.records.length < 20) {
                    this.isLoadMore = true
                    this.newisshowend = false
                }
                if (this.current === 1) {
                    this.dataList = res.data.homePageActivitysVOIPage.records
                } else {
                    res.data.homePageActivitysVOIPage.records.filter(s => {
                        this.dataList.push(s)
                    })
                }
            })
        },
        Onremind(item, index) {
            tologin()
            let _this = this
            if (item.isRemind == 1) {
                return false
            }
            uni.requestSubscribeMessage({
                tmplIds: [
                    'jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'
                ],
                success(res) {
                    if (res['jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q'] == 'accept') {
                        _this.$request.get("/coc-active/api/v1/activity/signUpStartRemind/" + item
                            .activityId).then(s => {
                                if (s.code == 200) {
                                    this.dataList[index].isRemind = 1
                                    uni.showToast({
                                        icon: 'none',
                                        title: '提醒成功，请等待通知',
                                    });
                                } else {
                                    uni.showToast({
                                        icon: 'none',
                                        title: s.message,
                                    });
                                }
                            })
                    }
                }
            })
        },
        OnPushDetail(item) {
            uni.navigateTo({
                url: '/pages/carShops/4Sdetail/shopActiveDetail?id=' + item.activityId + '&iscommission=' + this
                    .iscommission
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 0 25rpx 50rpx;
}
// .topSearch{
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 100%;    
//     z-index: 10;
// }
.page_top {
    border-bottom-left-radius: 20rpx;
    border-bottom-right-radius: 20rpx;
}

.kefu-contact {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
}

button::after {
    border: initial;
}

.coverPicture {
    width: 700rpx;
    height: 400rpx;
    border-radius: 10rpx;
    position: relative;
}

.s_ghbox {
    line-height: 52rpx;
    font-size: 24rpx;
    color: #ffffff;
    padding-left: 14rpx;
    border-radius: 0rpx 24rpx 28rpx 0rpx;
    position: absolute;
    top: 30rpx;
    padding-right: 20rpx;
    height: 52rpx;
    background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%)
}

.backimg {
    position: absolute;
    bottom: 18rpx;
    left: 20rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgb(34 34 34 / 0.5);
    background-color: rgba(34, 34, 34, 0.5);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    width: 120rpx;
    height: 52rpx;
}

.btn {
    width: 120rpx;
    height: 52rpx;
    text-align: center;
    background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
    border-radius: 25rpx 25rpx 27rpx 25rpx;
    line-height: 52rpx;
    color: #ffffff;
}

.title {
    margin-top: 35rpx;
}

.item-detail {
    display: flex;
    justify-content: space-between;
    margin-top: 22rpx;
    align-items: center;
    margin-right: 26rpx;
}

.remind {
    width: 160rpx;
    height: 52rpx;
    border-radius: 26rpx;
    color: #ffffff;
    font-size: 28rpx;
    text-align: center;
    background: #D91B1B;
    line-height: 52rpx;
}

.Asreminder {
    background-color: #999999;
}

.headPortraits {
    display: flex;
    align-items: center;
    font-size: 24rpx;
}

.card-list {
    box-shadow: 2rpx 3rpx 12rpx 0rpx rgba(0, 0, 0, 0.1);
    margin: 25rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 25rpx;
}

.tag-item {
    border-radius: 16rpx;
    background-color: #fceded;
    font-size: 24rpx;
    color: #D91B1B;
    padding: 14rpx 20rpx;
    text-align: center;
    margin-left: 8rpx;
}

.bao-item {
    padding: 5rpx;
    background: #D91B1B;
    border-radius: 10rpx;
    size: 24rpx;
    color: #ffffff;
    font-weight: bold;
    line-height: 32rpx;
}

.tuan-item {

    padding: 5rpx;

    background: #54CBBA;

    border-radius: 10rpx;

    size: 24rpx;

    color: #ffffff;

    font-weight: bold;

    line-height: 32rpx;

}

.quan-item {

    padding: 5rpx;

    background: #FD6F36;

    border-radius: 10rpx;

    size: 24rpx;

    color: #ffffff;

    font-weight: bold;

    line-height: 32rpx;

}

.tab {
    .tab_inner {
        padding: 0 30rpx 0 30rpx;

        .tab_item {
            width: 140rpx;
            text-align: center;
        }

        .tab_item_sel {
            font-size: 28rpx;
            font-weight: bold;
            color: #222222;
        }

        .tab_item_nosel {
            font-size: 28rpx;
            font-weight: 500;
            color: #222222;
        }

        .tab_line {
            width: 33rpx;
            height: 6rpx;
            background: #F70000;
            border-radius: 3rpx;
            margin-left: 54rpx;
            margin-top: 14rpx;
        }

        .tab_tran1 {
            transform: translate(0, 0);
            transition: 0.5s;
        }

        .tab_tran2 {
            transform: translate(183rpx, 0);
            transition: 0.5s;
        }

        .tab_tran3 {
            transform: translate(366rpx, 0);
            transition: 0.5s;
        }

        .tab_tran4 {
            transform: translate(549rpx, 0);
            transition: 0.5s;
        }
    }
}


.recommend {
    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750rpx;
        height: 103rpx;

        &-logo {
            width: 33rpx;
            height: 26rpx;
            margin-left: 25rpx;
        }

        &-title {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 40rpx;
            margin-left: 10rpx;
        }

        &-go {
            width: 10rpx;
            height: 16rpx;
            margin-right: 24rpx;
        }
    }

    &-item {
        background: #FFFFFF;
        margin-bottom: 10rpx;

        &-video {
            position: absolute;
            width: 82rpx;
            height: 82rpx;
            margin-top: 187rpx;
            margin-left: 130rpx;
        }

        &-image {
            width: 342rpx;
            height: 456rpx;
            background: #000000;
            border-radius: 10rpx;
        }

        &-bottom {
            width: 342rpx;
            border-radius: 0rpx 0rpx 10rpx 10rpx;
            padding-top: 20rpx;
            padding-bottom: 10rpx;

            &-title {
                width: 306rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 18rpx;
                margin-left: 14rpx;
                margin-right: 20rpx;
            }

            &-image {
                width: 40rpx;
                height: 40rpx;
                margin-left: 15rpx;
                border-radius: 20rpx;
            }

            &-name {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 38rpx;
                margin-left: 10rpx;
            }

            &-check {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 38rpx;
                margin-right: 20rpx;
            }
        }
    }

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }

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

.shop-image {
    width: 30rpx;
    height: 30rpx;
}
</style>
