<template>
    <view class="page">
        <!-- 订单记录 -->
        <view class="order-list" @click="OnPushOrder">
            <image
                style="width: 141rpx; height: 52rpx"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230625/file_1687653531472.png"
            ></image>
        </view>
        <movable-area>
            <movable-view :x="x" :y="y" direction="all">
                <view v-if="isExpert == 1 && token" class="fanyong" @click="Onpopposter">
                    <view class="mainRed fwb tac" style="position: absolute; bottom: 0rpx; width: 100%">
                        得{{ commission }}元
                    </view>
                </view>
            </movable-view>
        </movable-area>
        <!-- <view class="top"> </view> -->
        <view class="contentDec">
            <view class="card">
                <view class="contentDec__tabs">
                    <view class="u-flex jsb">
                        <view
                            v-for="(item, index) in list1"
                            :key="index"
                            class="txtLighGray size28"
                            :class="{ selecttag: index == tagindex }"
                            @click="OnClickTag(index)"
                        >
                            <view>
                                {{ item.name }}
                            </view>
                            <view class="u-flex jsc" v-if="index == tagindex">
                                <view class="tac tag-item"> </view>
                            </view>
                        </view>
                    </view>
                </view>

                <view v-if="tagindex == 2" class="card__conTentBox">
                    <view class="tac mt20">
                        <image
                            style="width: 646rpx; height: 284rpx; border-radius: 10rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642010807.png"
                        >
                        </image>
                    </view>
                    <view class="size24" style="line-height: 52rpx; margin-top: 34rpx">
                        车辆在正常辅装道路行驶过程中不慎脱离行驶道路陷入困境(如轮胎卡并、陷入泥坑等)，车辆无损失但无法正常驶离困境，无需动用辅助设备、吊车等协助摆脱困境。
                    </view>
                </view>
                <view v-else-if="tagindex == 0" class="card__conTentBox">
                    <view class="tac mt20">
                        <image
                            style="width: 646rpx; height: 284rpx; border-radius: 10rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641805787.png"
                        >
                        </image>
                    </view>
                    <view class="size24" style="line-height: 52rpx; margin-top: 34rpx">
                        车辆在道路行驶过程中因轮胎故障(爆胎、亏气、扎钉等情况)无法正常行驶时，提供更换备胎服务救援无忧卡服务用户需自备完好足气备胎。
                    </view>
                </view>
                <view v-else-if="tagindex == 1" class="card__conTentBox">
                    <view class="tac mt20">
                        <image
                            style="width: 646rpx; height: 284rpx; border-radius: 10rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689641924703.png"
                        >
                        </image>
                    </view>
                    <view class="size24" style="line-height: 52rpx; margin-top: 34rpx">
                        车辆因缺电无法正常启动，救援车辆将前来救援，将救援车辆的电池或其他外部电源连接到故障车辆，以达到启动故障车辆的目的。离市、县中心区50公里以内的免费救援，超过50公里的救援费用由用户自行承担。
                    </view>
                </view>
                <view v-else-if="tagindex == 3" class="card__conTentBox">
                    <view class="tac mt20">
                        <image
                            style="width: 646rpx; height: 284rpx; border-radius: 10rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642116252.png"
                        >
                        </image>
                    </view>
                    <view class="size24" style="line-height: 52rpx; margin-top: 34rpx">
                        车辆因故障无法正常行驶，即接电、快修、换胎等救援项目无法解决问题的。拖车负责将故障车辆拖至就近50公里之内的维修场所，超过50公里的救援费用由用户自行承担。
                    </view>
                </view>
                <view v-else-if="tagindex == 4" class="card__conTentBox">
                    <view class="tac mt20">
                        <image
                            style="width: 646rpx; height: 284rpx; border-radius: 10rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230718/file_1689642162555.png"
                        >
                        </image>
                    </view>
                    <view class="size24" style="line-height: 52rpx; margin-top: 34rpx">
                        车辆位于地下车库、地下室、高层车库无法行驶时，救援车辆利用牵引辅具将故障车辆牵引脱离现场至指定位置，超过50公里的救援费用由用户自行承担。
                    </view>
                </view>
            </view>
        </view>
        <view class="rescueVideo">
            <view class="size32 fwb rescueVideo__dec"> 救援故事 </view>
            <view class="search">
                <input v-model="title" placeholder="搜索" class="search-input" @blur="setInput" />
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231028/file_1698477292746.png"
                    class="search-image"
                />
            </view>
            <waterfall-flow
                ref="waterfallFlow"
                :rescueDataList="rescueDataList"
                :isarticle="isarticle"
                :isLoadMore="isLoadMore"
            ></waterfall-flow>
        </view>

        <view class="bottom-btn">
            <view class="mainRed size28 relativtop6">￥</view>
            <view class="mainRed fwb size48">
                {{ dataList.price }}
            </view>
            <view class="mainRed fwb size28 relativtop6"> /年 </view>
            <view class="txtLighGray size24 txtls relativtop6" style="margin-left: 5rpx">
                ￥{{ dataList.marketPrice }}/年
            </view>
            <view class="tohelp" @click="Onpushloadhelp">我要救援</view>
            <view v-if="iscommission == 0" class="buy-btn" @click="OnPay">立即抢购</view>
            <view
                v-else-if="iscommission == 1"
                class="buy-btn"
                @click.stop="OnAddshop"
                :class="{ bgGray: dataList.isSelection == 1 }"
                ><text v-if="dataList.isSelection == 1">移出小店</text><text v-else>加小店</text></view
            >
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <official-account
            style="width: 750rpx; position: fixed; left: 0; bottom: 145rpx; z-index: 9999"
        ></official-account>
        <!-- #endif -->
        <view :style="{ height: `calc(150rpx + 84px)` }"></view>
        <u-popup :safeAreaInsetBottom="false" round="10" :show="showpopshare" @close="OnCloseShare" mode="center">
            <!-- 海报 -->
            <view class="pop-poster">
                <view @click="OnSaveImage" style="margin-top: 100rpx" class="u-flex jsc">
                    <image :src="poster" style="width: 443rpx; height: 787rpx"></image>
                    <!-- 生成图片 -->
                    <poster
                        ref="poster"
                        :list="list"
                        background-color="#FFF"
                        :width="443"
                        :height="787"
                        @on-success="posterSuccess"
                    ></poster>
                </view>
                <view class="tac size28" style="margin-top: 28rpx"> 点击图片,长按保存到相册 </view>
                <view class="pyq">
                    <view class="text-pyq">
                        {{ posterList.shareLabel }}
                    </view>
                    <view class="tac mt20" @click="Oncopy(posterList.shareLabel)">
                        <image
                            style="width: 230rpx; height: 60rpx"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png"
                        >
                        </image>
                    </view>
                </view>
            </view>
        </u-popup>
        <view>
            <cardauthentication :showpop="showrealpop"></cardauthentication>
        </view>
        <u-popup
            :safeAreaInsetBottom="false"
            round="10"
            :closeOnClickOverlay="false"
            :show="showfourshop"
            @close="showfourshop = false"
            mode="center"
        >
            <view class="pop">
                <view class="size28 fwb tac" style="margin-top: 80rpx"> 选择客户经理/销售顾问/市场经理 </view>
                <view class="u-flex jsc" style="margin-top: 40rpx">
                    <view class="btn-pop" @click="OnOpenfirst">
                        <view class="txtLighGray size28" style="margin-left: 10rpx"
                            >{{ selectname ? selectname : "请选择" }}
                        </view>
                        <view style="margin-left: 108rpx; margin-right: 10rpx" class="u-flex alc">
                            <image
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
                                style="width: 17rpx; height: 10rpx"
                            ></image>
                        </view>
                    </view>
                    <view class="btn-pop" style="margin-left: 10rpx" @click="OnOpentwo">
                        <view class="txtLighGray size28" style="margin-left: 10rpx">
                            {{ selecttwoname ? selecttwoname : "请选择" }}
                        </view>
                        <view style="margin-left: 108rpx; margin-right: 10rpx" class="u-flex alc">
                            <image
                                src="https://oss.dcqcjlb.com/51che_java_dev/20230616/file_1686897573512.png"
                                style="width: 17rpx; height: 10rpx"
                            ></image>
                        </view>
                    </view>
                </view>
                <view class="u-flex jsc">
                    <view class="pop-btn" @click="Onnextfours"> 确定 </view>
                </view>
            </view>
        </u-popup>
        <u-picker
            :immediateChange="true"
            :show="showfirst"
            :columns="columnsfirst"
            @cancel="showfirst = false"
            @confirm="Onselectfirst"
        ></u-picker>
        <u-picker
            :immediateChange="true"
            :show="showtwo"
            :columns="selectList"
            keyName="nickname"
            @cancel="showtwo = false"
            @confirm="Onselecttwo"
        ></u-picker>
        <floatVideo :relatedType="3"></floatVideo>
    </view>
</template>

<script>
import cardauthentication from "@/components/cardauthentication.vue";
import floatVideo from "@/components/floatVideo/index.vue";
import WaterfallFlow from "@/components/waterfallFlow";
import Poster from "@/components/zhangyuhao-poster/Poster.vue";
import { tologin } from "@/utils/index.js";
export default {
    components: {
        Poster,
        cardauthentication,
        WaterfallFlow,
        floatVideo
    },
    data() {
        return {
            // 救援故事
            rescueCurrent: 1,
            rescueDataList: [],
            rescueArticleId: null,
            isarticle: false, // ture 我到底啦 false 暂无图片
            isLoadMore: true, // 是否加载更多
            //
            tabsTimer: null,
            iscommission: 0,
            selectname: "",
            columnsfirst: [["客户经理", "销售顾问", "市场经理"]],
            dataList: {},
            commission: "",
            shareId: "",
            customerManagerId: "",
            showrealpop: false,
            poster: "",
            showpopshare: false,
            list: [],
            posterList: {},
            token: null,
            isExpert: null,
            tagindex: 0,
            sourceType: "",
            showfourshop: false,
            affiliationType: null,
            showfirst: false,
            selecttwoname: "",
            fourshopid: "",
            selectList: [],
            showtwo: false,
            userChannelId: "",
            list1: [
                {
                    name: "更换轮胎",
                },
                {
                    name: "车辆搭电",
                },
                {
                    name: "困境救援",
                },
                {
                    name: "平板拖车",
                },
                {
                    name: "地库牵引",
                },
            ],
            x: 0,
            y: 0,
            title: "",
        };
    },
    created() {
        uni.getSystemInfo({
            success: (res) => {
                const screenWidth = res.windowWidth; // 屏幕宽度，单位为px
                const screenHeight = res.windowHeight; // 屏幕高度，单位为px
                this.x = screenWidth - uni.upx2px(25) - uni.upx2px(140);
                this.y = screenHeight - uni.upx2px(200) - uni.upx2px(153);
            },
        });
    },
    mounted() {
        this.timer = setInterval(() => {
            const num = this.tagindex + 1;
            this.tagindex = num > 4 ? 0 : num;
        }, 15000); // 改 15000 需要改动画
    },
    destroyed() {
        clearInterval(this.timer);
        this.timer = null;
    },
    onLoad(option) {
        console.log("进来了===========》", JSON.stringify(option), option);
        if (option.enter) {
            uni.setStorageSync("enter", option.enter);
        }
        // 二维码分享特殊处理
        if (option.scene && option.scene.indexOf("_enter=117")) {
            uni.setStorageSync("enter", "117");
        }
        if (option.iscommission) {
            this.iscommission = option.iscommission;
        }
        let _this = this;
        this.isExpert = uni.getStorageSync("isExpert");

        this.token = uni.getStorageSync("token");
        if (option.scene) {
            if (option.scene.split("_")[0] == 1) {
                // 达人
                this.sourceType = 1;
                this.shareId = option.scene.split("_")[1];
            } else if (option.scene.split("_")[0] == 2) {
                // 客户经理
                this.sourceType = 2;
                this.affiliationType = 2;
                this.customerManagerId = option.scene.split("_")[1];
            } else if (option.scene.split("_")[0] == 5) {
                // 销售
                this.sourceType = 3;
                this.affiliationType = 3;
                this.customerManagerId = option.scene.split("_")[1];
                this.getChannelId(this.customerManagerId, 2);
            } else if (option.scene.split("_")[0] == 7) {
                // 市场
                this.sourceType = 7;
                this.affiliationType = 7;
                this.customerManagerId = option.scene.split("_")[1];
                this.getChannelId(this.customerManagerId, 3);
            } else if (option.scene.split("_")[0] == 4) {
                // 渠道
                this.sourceType = 4;
                this.affiliationType = 4;
                this.customerManagerId = option.scene.split("_")[1];
            } else if (option.scene.split("_")[0] == 3) {
                // 4S店
                this.showfourshop = true;
                this.sourceType = 5;
                this.fourshopid = option.scene.split("_")[1];
            }
        }
        if (option.forwardUserId) {
            this.shareId = option.forwardUserId;
        }
        if (option.sourceType) {
            this.sourceType = 2;
        }
        if (!this.shareId) {
            this.shareId = uni.getStorageSync("userId");
        }
        if (this.shareId && uni.getStorageSync("token")) {
            this.tempparentid();
        }
        this.rescueGetList();
        this.getList();
        uni.$on("closepop", (res) => {
            _this.showrealpop = false;
        });
    },
    onShow() {},
    methods: {
        OnPushOrder() {
            uni.navigateTo({
                url: "/pages/roadhelp/orderlist",
            });
        },
        setInput() {
            this.rescueCurrent = 1;
            this.rescueGetList(true);
        },
        // 救援故事
        async rescueGetList(status) {
            const {
                data: { records, total },
            } = await this.$request.post("/coc-active/api/v1/video/list", {
                current: this.rescueCurrent,
                size: 10,
                type: 1,
                title: this.title,
            });
            this.list = records;

            console.log(records, total);

            if (total === 0) {
                this.isarticle = false;
            } else {
                this.isarticle = true;
            }
            records.filter((s) => {
                // 封面图
                if (s.coverImage) {
                    s.coverPicture = s.coverImage;
                } else if (s.videoUrl) {
                    s.coverPicture = s.videoUrl + "?x-oss-process=video/snapshot,t_1000,m_fast";
                }
            });
            if (records.length < 10 && this.rescueCurrent !== 1) {
                this.isLoadMore = false;
            } else {
                this.isLoadMore = true;
            }

            if (this.rescueCurrent === 1) {
                this.rescueDataList = records;
                if (status) {
                    this.$refs.waterfallFlow.refresh();
                }
            } else {
                if (total > this.rescueDataList.length) {
                    this.rescueDataList.push(...records);
                } else {
                    this.isLoadMore = false;
                }
            }
        },
        onReachBottom() {
            if (this.isLoadMore) {
                this.rescueCurrent++;
                this.rescueGetList();
            }
        },
        //
        OnAddshop() {
            if (this.dataList.isSelection == 0) {
                this.$request
                    .post("/coc-active/api/v1/expert/shop/selection/add", {
                        type: 3,
                        relatedId: 1,
                    })
                    .then((res) => {
                        if (res.code == 200) {
                            this.dataList.isSelection = 1;
                            uni.$u.toast("加入小店成功");
                        } else {
                            uni.$u.toast(res.message);
                        }
                    });
            } else {
                this.$request
                    .post("/coc-active/api/v1/expert/shop/selection/remove", {
                        type: 3,
                        relatedId: 1,
                    })
                    .then((res) => {
                        if (res.code == 200) {
                            this.dataList.isSelection = 0;
                            uni.$u.toast("移出小店成功");
                        } else {
                            uni.$u.toast(res.message);
                        }
                    });
            }
        },
        Onnextfours() {
            if (!this.customerManagerId) {
                uni.$u.toast("请先选择客户经理/销售类型/市场经理");
                return false;
            }
            this.showfourshop = false;
        },
        Onselecttwo(e) {
            this.showtwo = false;
            this.customerManagerId = e.value[0].id;
            this.selecttwoname = e.value[0].nickname;
            this.userChannelId = e.value[0].userChannelId;
        },
        OnOpentwo() {
            if (this.selectList.length == 0) {
                uni.$u.toast("请先选择客户经理/销售/市场类型");
                return false;
            }
            this.showtwo = true;
        },
        Onselectfirst(e) {
            this.selectname = e.value[0];
            this.selecttwoname = "";
            this.customerManagerId = "";
            this.userChannelId = "";
            if (e.indexs[0] == 0) {
                this.$newrequest
                    .get("/coc-system/api/v1/system/customer/manager/list?shopId=" + this.fourshopid)
                    .then((res) => {
                        this.showfirst = false;
                        this.affiliationType = 2;
                        this.selectList = [res.data];
                    });
            } else if (e.indexs[0] == 1) {
                this.$newrequest
                    .post("/coc-active/api/v1/sales_consultant/list", {
                        shopId: this.fourshopid,
                        current: 1,
                        size: 99,
                    })
                    .then((res) => {
                        this.showfirst = false;
                        this.affiliationType = 3;
                        this.selectList = [res.data.records];
                    });
            } else if (e.indexs[0] == 2) {
                this.affiliationType = 7;
                this.$newrequest
                    .post("/coc-active/api/v1/sales_consultant/marketingManagerList", {
                        shopId: this.fourshopid,
                        current: 1,
                        size: 99,
                    })
                    .then((res) => {
                        this.showfirst = false;
                        this.selectList = [res.data.records];
                    });
            }
        },
        OnOpenfirst() {
            this.showfirst = true;
        },
        getList() {
            this.$newrequest.post("/coc-active/api/v1/sky_you_product/details").then((res) => {
                uni.setStorageSync("commission", res.data.price);
                this.dataList = res.data;
                this.commission = res.data.commission;
            });
        },
        tempparentid() {
            this.$request
                .post("/coc-active/api/v1/invite/temp_parent_id/add", {
                    tempParentId: this.shareId,
                })
                .then((res) => {});
        },
        OnPay() {
            if (!uni.getStorageSync("token")) {
                uni.navigateTo({
                    url: "/pages/activity/share/index?userChannelId=" + this.userChannelId,
                });
                return false;
            }
            if (uni.getStorageSync("isCertify") != 1) {
                this.showrealpop = true;
                return false;
            }
            uni.navigateTo({
                url:
                    "/pages/roadhelp/payindex?shareId=" +
                    this.shareId +
                    "&customerManagerId=" +
                    this.customerManagerId +
                    "&sourceType=" +
                    this.sourceType +
                    "&affiliationType=" +
                    this.affiliationType,
            });
        },
        Oncopy(value) {
            uni.setClipboardData({
                data: value,
                success: function () {
                    uni.$u.toast("复制成功");
                },
            });
        },
        posterSuccess(url) {
            // 生成成功，会把临时路径在这里返回
            this.poster = url;
        },
        OnSaveImage() {
            let value = [this.poster];
            uni.previewImage({
                current: 99999,
                urls: value,
                longPressActions: {
                    itemList: ["发送给朋友", "保存图片", "收藏"],
                    success: function (data) {},
                    fail: function (err) {
                        console.log(err.errMsg);
                    },
                },
            });
        },
        OnCloseShare() {
            this.showpopshare = false;
        },
        getcode() {
            let _this = this;
            this.$request
                .post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
                    page: "pages/roadhelp/index",
                    scene: "1_" + this.shareId + "_enter=117",
                })
                .then((res) => {
                    this.showpopshare = true;
                    this.list = [
                        {
                            type: "image",
                            // path替换成你自己的图片，注意需要在小程序开发设置中配置域名
                            path: this.posterList.shareImage,
                            x: 0,
                            y: 0,
                            width: 443,
                            height: 787,
                        },
                        {
                            type: "image",
                            path: res.data.qrCode,
                            x: 18,
                            y: 682,
                            width: 90,
                            height: 90,
                        },
                    ];
                    this.$nextTick(() => {
                        // 要放在$nextTick()里，不然会空白
                        _this.$refs.poster.create();
                    });
                });
        },
        Onpopposter() {
            this.$request
                .post("/coc-active/api/v1/sky_you_product/share", {
                    id: 1,
                })
                .then((res) => {
                    this.posterList = res.data;
                    this.getcode();
                });
        },
        Onpushloadhelp() {
            if (!tologin()) {
                return false;
            }
            uni.navigateTo({
                url: "/pages/roadhelp/index/index",
            });
        },
        OnClickTag(e) {
            this.tagindex = e;
        },
        getChannelId(id, type) {
            this.$request
                .post("/coc-system/api/v1/system/customer/manager/getChannel", {
                    id,
                    type,
                })
                .then((res) => {
                    if (res.code == 200) {
                        if (res.data && res.data.userChannelId) {
                            this.userChannelId = res.data.userChannelId;
                        }
                    }
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.page {
    background-size: contain;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20231025/file_1698220513244.png");
    background-repeat: no-repeat;
}
.contentDec {
    padding-top: 385rpx;
    &__tabs {
        padding: 33rpx 0 20rpx;
    }
    .card {
        background: #ffffff;
        padding: 0 25rpx;
        margin: 0 25rpx 25rpx;
        border-radius: 10rpx 60rpx 10rpx 10rpx;
        height: 660rpx;
    }
}
.rescueVideo {
    &__dec {
        margin: 0 26rpx;
    }
}
</style>
<style lang="scss">
.top {
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230706/file_1688608206861.png");
    background-size: 100% 100%;
    height: 1131rpx;
    width: 100%;
}

.card-title {
    background: #d91b1b;
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
    background: #d91b1b;
    border-radius: 2rpx;
    text-align: center;
}

.bottom-btn {
    position: fixed;
    z-index: 9999;
    bottom: 0rpx;
    background: #ffffff;
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
    color: #d91b1b;
    line-height: 70rpx;
    text-align: center;
    margin-left: 29rpx;
    border: 1px solid #d91b1b;
}

.fanyong {
    position: relative;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230703/file_1688367949765.png");
    background-size: 100% 100%;
    width: 140rpx;
    height: 153rpx;
    z-index: 99;
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
    background: #d91b1b;
    border-radius: 35rpx;
    color: #ffffff;
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

.pop {
    width: 710rpx;
    background-color: #f8f8f8;
    text-align: center;
    padding-bottom: 80rpx;
    border-radius: 10rpx;
}

.btn-pop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 260rpx;
    height: 50rpx;
    border: 1px solid #999999;
    border-radius: 10rpx;
}

.pop-btn {
    width: 301rpx;
    height: 81rpx;
    background: #d91b1b;
    border-radius: 40rpx;
    text-align: center;
    line-height: 81rpx;
    color: #ffffff;
    font-size: 32rpx;
    font-weight: bold;
    margin-top: 40rpx;
}
.bgGray {
    background-color: #999999 !important;
}
.order-list {
    position: fixed;
    right: -20rpx;
    margin-top: 5%;
}
movable-area {
    position: fixed;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10000;
}

movable-view {
    position: absolute;
    width: 140rpx;
    height: 153rpx;
    display: inline-block;
    pointer-events: auto;
}

.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 699rpx;
    height: 64rpx;
    background: #ffffff;
    border-radius: 32rpx;
    margin-top: 20rpx;
    margin-left: 26rpx;
    margin-bottom: 10rpx;

    &-input {
        width: 629rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 20rpx;
    }

    &-image {
        width: 30rpx;
        height: 30rpx;
        margin-right: 20rpx;
    }
}
</style>
