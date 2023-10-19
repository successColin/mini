<template>
    <view class="page">
        <navigation />

        <!-- <view class="flex alc jsb" style="margin: 0 25rpx 10rpx 25rpx;">
            <view @click="OnPushcreditCard">
                <image style="width: 340rpx;height: 120rpx;"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694480281278.gif">
                </image>
            </view>
            <view @click="OnPushgrouppurchase">
                <image style="width: 340rpx;height: 120rpx;"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694480226652.gif">
                </image>
            </view>
        </view> -->
        <!-- <view @click="OnPushcreditCard" style="text-align: center;margin-bottom: 10rpx;">
            <image style="width: 700rpx;height: 120rpx;"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230912/file_1694479735117.png">
            </image>
        </view> -->
        <!-- 精选贴文 -->
		<view v-if="!showhomepop">
			 <articlelist /> 
		</view>
        <!-- 优惠团购 -->
        <groupbuy />
        <!-- 户外畅游/户内嗨乐 -->
        <play />
        <!-- 4S店逛逛专区 -->
        <!-- <strolling /> -->
        <!-- 救援故事 -->
        <rescuestory />
        <!-- 故障咨询 -->
        <faultconsultation />
        <!-- 保养预约 -->
        <maintenanceappointment />
        <!-- 新车鉴赏 -->
        <newcarappreciation />
        <!-- 达人推荐专区 -->
        <recommend />

        <!-- <view style="height: 100rpx;"></view> -->
        <view :style="{ 'height': tabbarHeight + 'px' }"></view>
        <u-popup :customStyle="{ backgroundColor: 'rgba(127, 127, 127,0.01)' }" :safeAreaInsetBottom='false'
            :show="showpopadd" @close="showpopadd = false" mode="right">
            <view style="position: fixed;bottom: 160rpx;right: 60rpx;">
                <view @click="OnAddImgPost">
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720788860.png"
                        style="width: 160rpx;height: 54rpx;"></image>
                </view>
                <view @click="OnAddVideoPost">
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720739083.png"
                        style="width: 160rpx;height: 54rpx;"></image>
                </view>
            </view>
            <view @click="showpopadd = false" style="position: fixed;bottom: 80rpx;right: 60rpx;">
                <view>
                    <image src="@/static/image/guanbi.png" style="width: 54rpx;height: 54rpx;"></image>
                </view>
            </view>
        </u-popup>
        <u-loading-page :loading="showload"></u-loading-page>
			<u-popup :safeAreaInsetBottom='false' :show="showhomepop" @close="showhomepop = false" bgColor='transparent'
			    mode="center">
			    <view @click="Onclickpop">
			        <image style="width: 550rpx;height: 550rpx;" :src='poplist.url'></image>
			    </view>
			    <view style="justify-content: center;" class="u-flex" @click="showhomepop = false">
			        <u-icon color="#ffffff" name="close-circle" size="20px"></u-icon>
			    </view>
			</u-popup>
        <!-- <u-popup :safeAreaInsetBottom='false' round='20' :show="isneedAuthorization" :closeOnClickOverlay='false' @close="isneedAuthorization=false" mode="center">
	<view style="width: 500rpx;padding: 25rpx 60rpx;" >
		<view class="fwb size28 tac">用户隐私保护提示</view>
		<view class="mt20 size24">
			感谢您使用本小程序，在使用前您应当阅读井同意<text @click="pushwebview" style="color: blue;" >{{privacy}}</text>，当点击同意并继续时，即表示您已理解并同意该条款内容，该条款将对您产生法律约束力;
		</view>
		<view class="mt10">
				<button class="botton-none" open-type="agreePrivacyAuthorization" @agreeprivacyauthorization="handleAgreePrivacyAuthorization">
					<view class="agree_btn">我已知晓</view>
					</button>
		</view>
		</view >
		</u-popup> -->
        <tabbar v-model="tabbarHeight" routePath="pages/home/index"></tabbar>
    </view>
</template>

<script>
import {
    shareMixin
} from "@/mixin/share.js"
import {
    setstorage,
    getstorage
} from '@/utils/index.js'
import tabbar from '@/components/tabbar/index.vue'

import uselist from '@/pages/home/components/uselist.vue'
import groupbuy from '@/pages/home/components/groupbuy.vue'
import play from '@/pages/home/components/play.vue'
import strolling from '@/pages/home/components/strolling.vue'
import recommend from '@/pages/home/components/recommend.vue'
import navigation from '@/pages/home/components/navigation.vue'
import articlelist from '@/pages/home/components/articlelist.vue'
import rescuestory from '@/pages/home/components/rescuestory.vue'
import faultconsultation from '@/pages/home/components/faultconsultation.vue'
import maintenanceappointment from '@/pages/home/components/maintenanceappointment.vue'
import newcarappreciation from '@/pages/home/components/newcarappreciation.vue'

export default {
    mixins: [shareMixin],
    components: {
        tabbar,
        uselist,
        groupbuy,
        play,
        strolling,
        recommend,
        navigation,
        articlelist,
        rescuestory,
        faultconsultation,
        maintenanceappointment,
        newcarappreciation
    },
    data() {
        return {
            privacy: '',
            poplist: {},
            showhomepop: false,
            showload: false,
            showpopadd: false,
            visitinto: null,
            tabbarHeight: 0, //tabbar高度
            timer: undefined,
            sharedetail: {},
            isneedAuthorization: false
        }
    },
    computed: {
        // z状态栏高度适配
        navbarHeight() {
            return uni.getStorageSync('menuInfo') ? uni.getStorageSync('menuInfo').contentTop : 0
        }
    },
    onHide() {
        if (uni.getStorageSync('token')) {
            this.$request.post('/coc-active/api/v1/user/behavior/visit_exit', {
                userVisitId: this.visitinto
            }).then(res => { })
        }
    },
    onLoad() {
        let _this = this
        if (getstorage("token")) {
            this.getloginTime()
        }
        this.getPopup()
        this.getshareimg()
        setTimeout(() => {
            _this.isneedAuthorization = uni.getStorageSync('needAuthorization')
        }, 500)

        this.getprivacy()
    },
    onReachBottom() {
        uni.$emit('recommend')
    },
    onPageScroll(e) {
        uni.$emit('setNavigation', {
            scrollTop: e.scrollTop
        })
    },
    onShow() {
        if (uni.getStorageSync('token')) {
            this.$request.post('/coc-active/api/v1/user/behavior/visit_into', {
                type: 1
            }).then(res => {
                this.visitinto = res
            })
        }
        this.getPopup()
    },
    onPullDownRefresh() {
        uni.$emit('updatedata')
        this.timer = setTimeout(() => {
            uni.stopPullDownRefresh()
        }, 1000)
    },
    destroyed() {
        clearTimeout(this.timer)
    },
    onShareAppMessage(res) {
        let title = this.sharedetail.shareTitle
        let imageUrl = this.sharedetail.shareImg
        return {
            title: title,
            imageUrl: imageUrl,
            success(res) {
                uni.showToast({
                    title: '分享成功'
                })
            },
            fail(res) {
                uni.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        };
    },
    onShareTimeline(res) { //分享到朋友圈
        let title = this.sharedetail.shareTitle
        let imageUrl = this.sharedetail.shareImg
        return {
            title: title,
            imageUrl: imageUrl,
            success(res) {
                uni.showToast({
                    title: '分享成功'
                })
            },
            fail(res) {
                uni.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        };
    },
    methods: {
        handleAgreePrivacyAuthorization() {
            this.isneedAuthorization = false
            setstorage('needAuthorization', false)
        },
        pushwebview() {
            wx.openPrivacyContract({
                success: () => { }, // 打开成功
                fail: () => { }, // 打开失败
                complete: () => { }
            })
        },
        getprivacy() {
            uni.getPrivacySetting({
                success: res => {
                    this.privacy = res.privacyContractName
                    // 返回结果为: res = { needAuthorization: true/false, privacyContractName: '《xxx隐私保护指引》' }	     	    
                },
                fail: () => { },
                complete: () => { }
            })
        },
        getshareimg() {
            this.$newrequest.get("/coc-system/api/v1/system/dictionaries/pageLayout/details/1").then(res => {
                this.sharedetail = res.data
            })
        },
        async getPopup() {
            let status = new Date().toLocaleDateString() !== new Date(getstorage('ishomepop')).toLocaleDateString()
            let token = getstorage('token')
            let register = getstorage('register')
            if (token && status) {
                const {
                    data: {
                        type
                    }
                } = await this.$newrequest.post('/coc-active/api/v1/group/isNewPerson', {
                    type: 1
                })
                if (type == 1) {
                    setstorage('ishomepop', new Date().getTime())
                    if (register) {
                        this.getregisterpop()
                    } else {
                        this.getnewpop()
                    }
                } else if (type == 2) {
                    setstorage('ishomepop', new Date().getTime())
                    this.gethomepop()
                }
            } else if (status) {
                setstorage('ishomepop', new Date().getTime())
                this.getnewpop()
            }
        },
        getloginTime() {
            this.$request.post('/coc-active/api/v2/homePage/loginTime')
        },
        Onclickpop() {
            let pageList = ['pages/home/index', 'pages/home/integral', 'pages/home/activityMall/index',
                'pages/home/my', 'pages/home/4sShop',
            ]
            if (this.poplist.jumpType == 1 && this.poplist.pageRoute) { //内部小程序之间跳转
                if (this.poplist.jumpUrl) {
                    if (pageList.findIndex(m => m == this.poplist.pageRoute) >= 0) {
                        uni.switchTab({
                            url: '/' + this.poplist.pageRoute + '?id=' + this.poplist.jumpUrl
                        })
                    } else if (this.poplist.pageRoute == 'pages/carShops/carList/index?type=1' || this.poplist
                        .pageRoute == 'pages/carShops/carList/index?type=2') {
                        uni.navigateTo({
                            url: '/' + this.poplist.pageRoute + '&id=' + this.poplist.jumpUrl
                        })
                    } else {
                        uni.navigateTo({
                            url: '/' + this.poplist.pageRoute + '?id=' + this.poplist.jumpUrl
                        })
                    }
                } else {
                    if (pageList.findIndex(m => m == this.poplist.pageRoute) >= 0) {
                        uni.switchTab({
                            url: '/' + this.poplist.pageRoute
                        })
                    } else {
                        if (this.poplist.pageRoute == 'pages/my/integral/index') {
                            if (!getstorage('token')) {
                                uni.navigateTo({
                                    url: "/pages/activity/share/index"
                                })
                                return false
                            }
                        }
                        uni.navigateTo({
                            url: '/' + this.poplist.pageRoute
                        })
                    }
                }
            } else if (this.poplist.jumpType == 2 && this.poplist.jumpUrl) { //外部H5链接
                uni.navigateTo({
                    url: '/pages/home/webview?url=' + this.poplist.jumpUrl
                })
            }
            this.showhomepop = false
        },
        getnewpop() {
            this.$newrequest.post("/coc-system/api/v1/system/dictionaries/banner/list", {
                adPosition: 'applets_new_customers_popup'
            }).then(res => {
                if (res.data.length > 0) {
                    this.showhomepop = true
                    this.poplist = res.data[0]
                }
            })
        },
        gethomepop() {
            this.$newrequest.post("/coc-system/api/v1/system/dictionaries/banner/list", {
                adPosition: 'applets_popup'
            }).then(res => {
                if (res.data.length > 0) {
                    this.showhomepop = true
                    this.poplist = res.data[0]
                }
            })
        },
        getregisterpop() {
            this.$newrequest.post("/coc-system/api/v1/system/dictionaries/banner/list", {
                adPosition: 'applets_registration_popup'
            }).then(res => {
                if (res.data.length > 0) {
                    this.showhomepop = true
                    this.poplist = res.data[0]
                    setstorage('register', 0)
                }
            })
        },
        OnPushcreditCard() {
            uni.navigateTo({
                url: "/pages/grouppurchase/index?type=2"
            })
        },
        OnPushgrouppurchase() {
            uni.navigateTo({
                url: `/pages/grouppurchase/index?type=3`
            })
        },
    }
}
</script>

<style lang="scss">
image {
    display: block;
}

.botton-none {
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    outline: none;
    margin: 20rpx auto;
    width: 200rpx;
}

.botton-none::after {
    border: none;
}

.agree_btn {
    background-color: #D91B1B;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 144rpx;
    font-size: 28rpx;
    font-weight: bold;
    color: #ffffff;
}
</style>
