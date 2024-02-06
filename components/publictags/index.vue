<template>
    <view class="page">
        <view class="tag">
            <view class="item-tab">
                <!--  v-if="Object.keys(menulist).findIndex(m => m === 'applets_group_purchase') >= 0" -->
                <view style="text-align: center;" @click="OnPushtag(4)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721303615.png">
                        </image>
                        <view v-if="menulist['applets_group_purchase'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_group_purchase']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        优惠团购
                    </view>
                </view>
                <view style="text-align: center;" @click="OnPushtag(10)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706062067522.png">
                        </image>
                        <view v-if="menulist['applets_indoor_activity'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_indoor_activity']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">室内活动</view>
                </view>
                <view style="text-align: center;" @click="OnPushtag(11)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061759927.png">
                        </image>
                        <view v-if="menulist['applets_outdoor_activity'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_outdoor_activity']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">户外活动</view>
                </view>
                <view style="text-align: center;" @click="OnPushview(3)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061426624.png">
                        </image>
                        <view v-if="menulist['applets_4s_activity'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_4s_activity']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        4S店活动
                    </view>
                </view>
                <view   style="text-align: center;" @click="OnPushview(4)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721370724.png">
                        </image>
                        <view v-if="menulist['applets_wise_man_recommend'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_wise_man_recommend']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        达人推荐
                    </view>
                </view>
                <!-- 	<view style="text-align: center;">
					<image @click="OnPushview(1)" style="width: 56rpx;height: 56rpx;"
						src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706062168439.png">
					</image>
					<view style="font-size: 24rpx;">
						官方联动
					</view>
				</view> -->
            </view>
            <view class="item-tab" style="margin-top: 31rpx;">
                <view  style="text-align: center;" @click="OnPushtag(3)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706061849737.png">
                        </image>
                        <view v-if="menulist['applets_sign_gift'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_sign_gift']" :width="90" :height="43"
                                :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        签到有礼
                    </view>
                </view>
                <view    style="text-align: center;" @click="OnPushtag(2)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706060722088.png">
                        </image>
                        <view v-if="menulist['applets_new_person'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_new_person']" :width="90" :height="43"
                                :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        新人专享
                    </view>
                </view>
                <view   style="text-align: center;" @click="OnPushview(2)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706059799191.png">
                        </image>
                        <view v-if="menulist['applets_bank_activity'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_bank_activity']" :width="90"
                                :height="43" :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>

                    <view style="font-size: 24rpx;">
                        银保资讯
                    </view>
                </view>
                <view  style="text-align: center;" @click="OnPushtag(5)">
                    <view style="position: relative;">
                        <image style="width: 56rpx;height: 56rpx;"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720980383.png">
                        </image>
                        <view v-if="menulist['applets_score_shop'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_score_shop']" :width="90" :height="43"
                                :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                    </view>
                    <view style="font-size: 24rpx;">
                        积分兑换
                    </view>
                </view>
                <view>
                    <button open-type='contact' class="kefu-contact" :session-from='sessionfrom'>
                        <image style="width: 56rpx;height: 56rpx;" src="https://oss.dcqcjlb.com/51che_java_dev/20230821/file_1692579902793.png">
                        </image>
                        <view v-if="menulist['applets_consulting_customer_service'].length > 0" class="label_view_img"
                            style="position: absolute;top: -20rpx;left: 32rpx;">
                            <noticebar class="label_view" :notices="menulist['applets_consulting_customer_service']" :width="90" :height="43"
                                :textheight="36"></noticebar>
                            <image class="label_view_img" src="@/static/image/arrowlabel.png"></image>
                        </view>
                        <text style="font-size: 24rpx;line-height: 100%;">咨询客服</text>
                    </button>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import {
    getstorage,
    tologin
} from '@/utils/index.js'
import noticebar from '@/pages/home/components/noticeBar/index.vue'
export default {
    components: {
        noticebar
    },
    data() {
        return {
            menulist: {}
        }
    },
    props: {
        city: {
            type: String,
            default: ''
        }
    },
    onLoad() { },
    onShow() { },
    created() {
        this.$request.post('/coc-active/api/v2/homePage/menuTag/list').then(res => {
            let menulist = {}
            res.data.forEach(n => {
                menulist[n.menuKey] = n.tag ? n.tag.split(',').map(m => {
                    return {
                        text: m
                    }
                }) : []
            })
            this.menulist = menulist
        })
    },
    methods: {
        OnPushview(index) {
            if (index == 1) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/index?city=' + this.city + '&shopTypeId=1'
                })
            } else if (index == 2) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/bankactivity?'
                })
            } else if (index == 3) {


                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/foursactivity?'
                })
            } else if (index == 4) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/playfulperson?'
                })
            } else if (index == 5) {
                uni.navigateTo({
                    url: '/pages/home/activityMall/index'
                })
            }
        },
        OnPushtag(index) {
            let city = getstorage('cityname')
            if (index == 4) {
                uni.navigateTo({
                    url: '/pages/grouppurchase/index'
                })
            }
            if (index == 3) {
                if (!getstorage('token')) {
                    uni.navigateTo({
                        url: "/pages/activity/share/index"
                    })
                    return false
                }
                uni.navigateTo({
                    url: '/pages/my/integral/index'
                })
            }
            if (index == 2) {
                uni.navigateTo({
                    url: '/pages/grouppurchase/newpeople/index'
                })
            }
            if (index == 1) {

                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/index?type=1&shopTypeId=1'
                })
            }
            if (index == 5) {
                uni.navigateTo({
                    url: '/pages/home/integral'
                })
            }
            if (index == 10) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/indooractivity'
                })
            }
            if (index == 11) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/outdoorsactivity'
                })
            }

        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    margin: 20rpx 0rpx;
}

.tag {
    padding: 28rpx 0rpx 23rpx 0rpx;
    background-color: #ffffff;
    margin: 25rpx;
    border-radius: 10rpx;
}

.zhuanchang {
    display: flex;
    justify-content: space-around;
}

.item-tab {
    display: flex;
    justify-content: space-around;
}

.label_view_img {
    width: 90rpx;
    height: 43rpx;
}

.label_view {
    width: 90rpx;
    height: 43rpx;
    position: absolute;
    top: 0;
}
.kefu-contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    height: 96rpx;
    padding-bottom: 4rpx;

    &button::after{ display: none;}
}

</style>
