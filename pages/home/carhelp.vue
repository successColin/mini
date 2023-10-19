<template>
    <view class="page">
        <view v-if="isExpert == 1 && token" class="fanyong" @click="Onpopposter">

            <view class="mainRed fwb tac" style="position: absolute;bottom: 0rpx;width: 100%;">
                得{{ commission }}元
            </view>
        </view>
        <view class="top">
        </view>
        <view class="card">
            <view class="size32 fwb ">
                救援项目说明
            </view>
            <view class="card-title">
            </view>
            <view>
                <u-divider :text="null"></u-divider>
            </view>
            <view class="u-flex jsb">
                <view v-for="(item, index) in list1" :key="index" class="txtLighGray size28"
                    :class="{ 'selecttag': index == tagindex }" @click="OnClickTag(index)">
                    <view>
                        {{ item.name }}
                    </view>
                    <view class="u-flex jsc" v-if="index == tagindex">
                        <view class="tac tag-item">
                        </view>
                    </view>

                </view>
            </view>
            <view v-if="tagindex == 2">
                <view class="tac mt20">
                    <image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642010807.png">
                    </image>
                </view>
                <view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
                    车辆在正常辅装道路行驶过程中不慎脱离行驶道路陷入困境(如轮胎卡并、陷入泥坑等)，车辆无损失但无法正常驶离困境，无需动用辅助设备、吊车等协助摆脱困境。
                </view>
            </view>
            <view v-else-if="tagindex == 0">
                <view class="tac mt20">
                    <image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641805787.png">
                    </image>
                </view>
                <view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
                    车辆在道路行驶过程中因轮胎故障(爆胎、亏气、扎钉等情况)无法正常行驶时，提供更换备胎服务救援无忧卡服务用户需自备完好足气备胎。
                </view>
            </view>
            <view v-else-if="tagindex == 1">
                <view class="tac mt20">
                    <image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641924703.png">
                    </image>
                </view>
                <view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
                    车辆因缺电无法正常启动，救援车辆将前来救援，将救援车辆的电池或其他外部电源连接到故障车辆，以达到启动故障车辆的目的。离市、县中心区50公里以内的免费救援，超过50公里的救援费用由用户自行承担。
                </view>
            </view>
            <view v-else-if="tagindex == 3">
                <view class="tac mt20">
                    <image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642116252.png">
                    </image>
                </view>
                <view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
车辆因故障无法正常行驶，即接电、快修、换胎等救援项目无法解决问题的。拖车负责将故障车辆拖至就近50公里之内的维修场所，超过50公里的救援费用由用户自行承担。                </view>
            </view>
            <view v-else-if="tagindex == 4">
                <view class="tac mt20">
                    <image style="width: 646rpx;height: 284rpx;border-radius: 10rpx;"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642162555.png">
                    </image>
                </view>
                <view class="size24" style="line-height: 52rpx;margin-top: 34rpx;">
车辆位于地下车库、地下室、高层车库无法行驶时，救援车辆利用牵引辅具将故障车辆牵引脱离现场至指定位置，超过50公里的救援费用由用户自行承担。                </view>
            </view>
        </view>
        <view class="bottom-btn" :style="{'bottom':tabbarHeight+'px'}">
            <view class="mainRed size28 relativtop6">￥</view>
            <view class="mainRed fwb size48">
                {{ dataList.price }}
            </view>
            <view class="mainRed fwb size28 relativtop6">
                /年
            </view>
            <view class="txtLighGray size24 txtls relativtop6" style="margin-left: 5rpx;">
                ￥{{ dataList.marketPrice }}/年
            </view>
            <view class="tohelp" @click="Onpushloadhelp">我要救援</view>
            <view class="buy-btn" @click="OnPay">立即抢购</view>
        </view>
        <view style="height: 200rpx;"></view>
        <u-popup :safeAreaInsetBottom='false' round='10' :show="showpopshare" @close="OnCloseShare" mode="center">
            <!-- 海报 -->
            <view class="pop-poster">
                <view @click="OnSaveImage" style="margin-top: 100rpx;" class="u-flex jsc">
                    <image :src="poster" style="width: 443rpx;height: 787rpx;"></image>
                    <!-- 生成图片 -->
                    <poster ref="poster" :list="list" background-color="#FFF" :width="443" :height="787"
                        @on-success="posterSuccess"></poster>
                </view>
                <view class="tac size28" style="margin-top: 28rpx;">
                    点击图片,长按保存到相册
                </view>
                <view class="pyq">
                    <view class="text-pyq">
                        {{ posterList.shareLabel }}
                    </view>
                    <view class="tac mt20 " @click="Oncopy(posterList.shareLabel)">
                        <image style="width: 230rpx;height: 60rpx;"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
                        </image>
                    </view>
                </view>
            </view>
        </u-popup>
        <view>
            <cardauthentication :showpop='showrealpop'></cardauthentication>
        </view>
        <tabbar v-model="tabbarHeight" routePath="pages/home/carhelp"></tabbar>
        <view style="height: 200rpx;"></view>
    </view>
</template>

<script>
import tabbar from '@/components/tabbar/index.vue'
import {
    getstorage,
    setstorage,
    tologin
} from '@/utils/index.js'
import Poster from '@/components/zhangyuhao-poster/Poster.vue'
import cardauthentication from '@/components/cardauthentication.vue'
export default {
    components: {
        Poster,
        cardauthentication,
        tabbar
    },
    data() {
        return {
            tabbarHeight: 0, //tabbar高度
            dataList: {},
            commission: '',
            shareId: '',
            customerManagerId: '',
            showrealpop: false,
            poster: '',
            showpopshare: false,
            list: [],
            posterList: {},
            token: null,
            safaheight: '',
            isExpert: null,
            tagindex: 0,
            list1: [{
                name: '更换轮胎',
            }, {
                name: '车辆搭电'
            }, {
                name: '困境救援',
            }, {
                name: '平板拖车'
            }, {
                name: '地库牵引'
            }]
        }
    },
    computed: {
        //除去自定义tabbar的高度
        contentHeight() {
            return `calc(100vh - ${this.tabbarHeight}px)`
        },
        loadhelpBottom() {
            return `calc(${this.tabbarHeight}px + 100rpx)`
        }
    },

    onLoad(option) {
        let _this = this
        let statusBarHeight = 0
        uni.getSystemInfo({
            success(res) {
                statusBarHeight = res.statusBarHeight
            }
        })
        if (statusBarHeight > 20) {
            this.safaheight = 10
        } else {
            this.safaheight = 7
        }
        this.isExpert = uni.getStorageSync('isExpert')

        this.token = uni.getStorageSync('token')
        if (option.scene) {
            if (option.scene.split('_')[0] == 1) {
                this.shareId = option.scene.split('_')[1]
            } else if (option.scene.split('_')[0] == 2) {
                this.customerManagerId = option.scene.split('_')[1]
            }
        }
        if (option.forwardUserId) {
            this.shareId = option.forwardUserId
        }
        if (!this.shareId) {
            this.shareId = uni.getStorageSync('userId')
        }
        if (this.shareId && uni.getStorageSync('token')) {
            this.tempparentid()
        }
        this.getList()
        uni.$on('closepop', res => {
            _this.showrealpop = false
        })
    },
    onShow() { },
    methods: {
        getList() {
            this.$newrequest.post("/coc-active/api/v1/sky_you_product/details").then(res => {
                uni.setStorageSync('commission', res.data.price)
                this.dataList = res.data
                this.commission = res.data.commission
            })
        },
        tempparentid() {
            this.$request.post("/coc-active/api/v1/invite/temp_parent_id/add", {
                tempParentId: this.shareId
            }).then(res => {

            })
        },
        OnPay() {
            if (!uni.getStorageSync('token')) {
                tologin()
                return false
            }
            if (uni.getStorageSync('isCertify') != 1) {
                this.showrealpop = true
                return false
            }
            uni.navigateTo({
                url: "/pages/roadhelp/payindex?shareId=" + this.shareId + "&customerManagerId=" + this
                    .customerManagerId
            })
        },
        Oncopy(value) {
            uni.setClipboardData({
                data: value,
                success: function () {
                    uni.$u.toast('复制成功')
                }
            });
        },
        posterSuccess(url) {
            console.log('asda', url)
            // 生成成功，会把临时路径在这里返回
            this.poster = url;

        },
        OnSaveImage() {
            let value = [this.poster]
            uni.previewImage({
                current: 99999,
                urls: value,
                longPressActions: {
                    itemList: ['发送给朋友', '保存图片', '收藏'],
                    success: function (data) {
                        console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                    },
                    fail: function (err) {
                        console.log(err.errMsg);
                    }
                }
            })


        },
        OnCloseShare() {
            this.showpopshare = false
        },
        getcode() {
            let _this = this
            this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
                page: 'pages/roadhelp/index',
                scene: '1_' + uni.getStorageSync('userId')
            }).then(res => {
                this.showpopshare = true
                this.list = [{
                    type: 'image',
                    // path替换成你自己的图片，注意需要在小程序开发设置中配置域名
                    path: this.posterList.shareImage,
                    x: 0,
                    y: 0,
                    width: 443,
                    height: 787
                },
                {
                    type: 'image',
                    path: res.data.qrCode,
                    x: 18,
                    y: 682,
                    width: 90,
                    height: 90
                }
                ]
                this.$nextTick(() => {
                    // 要放在$nextTick()里，不然会空白
                    _this.$refs.poster.create();
                })
            })
        },
        Onpopposter() {
            this.$request.post("/coc-active/api/v1/sky_you_product/share", {
                id: 1
            }).then(res => {
                this.posterList = res.data
                this.getcode()
            })
        },
        Onpushloadhelp() {
            if (!getstorage('token')) {
                tologin()
            }
            uni.navigateTo({
                url: '/pages/roadhelp/index/index'
            })
        },
        OnClickTag(e) {
            this.tagindex = e
        }
    }
}
</script>

<style lang="scss">
.top {
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688608206861.png");
    background-size: 100% 100%;
    height: 1131rpx;
    width: 100%;
}

.card {
    background: #FFFFFF;
    border-radius: 10rpx 60rpx 10rpx 10rpx;
    padding: 50rpx 20rpx 20rpx 20rpx;
    margin: 22rpx;
}

.card-title {
    background: #D91B1B;
    opacity: 0.12;
    height: 8rpx;
    width: 190rpx;
    margin-top: -10rpx;
}

.selecttag {
    color: #222222;
    font-weight: bold;
}

.tag-item {
    width: 24rpx;
    height: 4rpx;
    background: #D91B1B;
    border-radius: 2rpx;
    text-align: center;
}

.bottom-btn {
    position: fixed;
    bottom: 0rpx;
    background: #FFFFFF;
    width: 100%;
    height: 120rpx;
    display: flex;
    align-items: center;
    padding-bottom: 30rpx;
    padding-left: 25rpx;
    padding-right: 25rpx;
}

.tohelp {
    width: 180rpx;
    height: 70rpx;
    background: #ffe2e2;
    border-radius: 35rpx;
    color: #D91B1B;
    line-height: 70rpx;
    text-align: center;
    margin-left: 29rpx;
    border: 1px solid #D91B1B
}

.fanyong {
    position: fixed;
    bottom: 400rpx;
    right: 25rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230703/file_1688367949765.png");
    background-size: 100% 100%;
    width: 140rpx;
    height: 153rpx;
}

.size48 {
    font-size: 48rpx;
}

.relativtop6 {
    position: relative;
    top: 6rpx;
}

.buy-btn {
    width: 180rpx;
    height: 70rpx;
    background: #D91B1B;
    border-radius: 35rpx;
    color: #FFFFFF;
    line-height: 70rpx;
    text-align: center;
    margin-left: 12rpx;

}

.pyq {
    margin: 25rpx;
    border-radius: 10rpx;
    background-color: #d91b1b;
    padding: 7rpx 7rpx 20rpx 7rpx;
}

.text-pyq {
    padding: 20rpx 20rpx 50rpx 20rpx;
    font-size: 24rpx;
    background-color: #ffffff;

    border-radius: 10rpx;
}

.pop-poster {
    width: 650rpx;
    border-radius: 10rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685084245034.png");
    background-size: 100% 100%;
    margin-top: -12rpx;

    button::after {
        border: none;
    }
}
</style>
