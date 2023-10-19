<template>
    <view class="page">
        <carousel v-if="swiperlist.length" :list="swiperlist" :topStyle="{ width: '750rpx', borderRadius: '0rpx' }"
            height="500rpx" urlkey="url" :dataType="1" :indicatorType="1" :showCount="true" :clickType="2" :autoPlay="true"
            :radius="0">
        </carousel>
        <!-- 内容 -->
        <view class="bgfff">
            <view class="" style="padding-bottom:200rpx;">
                <view class="pdlr30" style="border-bottom: 1rpx solid #eee;">
                    <view style="font-size:36rpx;font-weight:bold;padding: 10rpx 0 0;">{{ detail.vehicle_name }}</view>
                    <view class="size28" style="padding: 10rpx 0 20rpx;">{{ detail.cx_name }}</view>
                </view>
                <view class="flex alc jsb detailItem pdlr30" style="align-items:baseline;">
                    <view class="flex">
                        <text class="size32">销售价</text>
                        <text class="mainRed fwb" style="font-size:42rpx">{{ pagetype == 1 ? detail.sale_price : detail.pt_price
                        }}</text>
                        <text class="size32">万起</text>
                    </view>
                    <view class="size32 txtls">指导价{{ detail.guide_price }}万</view>
                </view>
                <view v-if="pagetype == 1">
                    <view class="pdlr30">
                        <view class="flex alc jsb detailItem " style="align-items:baseline;">
                            <view class="flex">
                                <text class="size32">月供仅需</text>
                                <text class="mainRed fwb" style="font-size:42rpx">{{ detail.min_month_money }}</text>
                                <text class="size32">万起</text>
                            </view>
                            <view class="detailType" @click="buyScheme">银行分期</view>
                        </view>
                    </view>
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230509/file_1683613351053.png"
                        style="display: block;width: 100%;" mode="widthFix">
                    </image>
                </view>
                <view v-if="pagetype == 2">
                    <view class="pdlr30">
                        <view class="flex alc jsb detailItem " style="align-items:baseline;" v-if="pagetype == 2">
                            <view class="flex">
                                <text class="size32">首付低至</text>
                                <text class="mainRed fwb" style="font-size:42rpx">{{ detail.min_self_pay }}</text>
                                <text class="size32">万起</text>
                            </view>
                            <view class="detailType">融资租赁</view>
                        </view>
                    </view>
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230509/file_1683613381476.png"
                        mode="widthFix" style="display: block;width: 100%;">

                    </image>
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230509/file_1683613398113.png"
                        @click="morecont" style="display: block;width: 100%;" mode="widthFix">
                    </image>
                </view>
                <view v-if="pagetype == 3">
                    <view class="flex alc detailItem pdlr30" style="align-items:baseline;" v-if="pagetype == 3">
                        <text class="size32">直降</text>
                        <text class="mainRed fwb" style="font-size:42rpx">{{ detail.cut_price }}</text>
                        <text class="size32">万</text>
                    </view>
                    <view style="padding: 30rpx">
                        <u-parse :content="detail.content"></u-parse>
                    </view>
                </view>
            </view>
            <view class="bottomBox">
                <view class="btn size32 colorff" @click="handleBuy">购车咨询</view>
            </view>
        </view>
        <u-modal :show="infoShow" :content="content" closeOnClickOverlay showCancelButton>
            <u-button slot="confirmButton" shape="circle"
                :customStyle="{ width: '200rpx', backgroundColor: '#D91B1B', color: '#fff' }"
                @click="closeModal">好的</u-button>
        </u-modal>
        <u-modal :show="formShow" :closeOnClickOverlay="true" showCancelButton @close="formShow = false">
            <u-form labelWidth='50' labelPosition="left" :model="formData" :rules="rules" ref="formData">
                <u-form-item label="姓名" prop="name" borderBottom class="formItem">
                    <view class="flex jsb alc">
                        <input :border='none' placeholder="请输入您的姓名" v-model="formData.name" class="nameInput" />
                        <view class="flex alc sexBox jsb">
                            <view v-for="(item, index) in sex" :key="index" class="sexItem" @click="changesex(index)"
                                :class="item.current ? 'current' : ''">
                                {{ item.name }}</view>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item label="电话" prop="mobile" borderBottom class="formItem">
                    <input :border='none' placeholder="请输入您的电话" v-model="formData.mobile" class="itemHeight" />
                </u-form-item>
                <u-form-item label="城市" prop="city" class="formItem" borderBottom>
                    <view class="flex alc jsb br10  cityBox" @click="checkCity">
                        <view>
                            {{ formData.city }}
                        </view>
                        <view style="margin-left: 4rpx;">
                            <u-icon size="12" name="arrow-right" :bold='true' color="#222222"></u-icon>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item>
                    <view class="flex alc checkbox">
                        <view>
                            <u-radio-group v-model="radiovalue1" placement="column">
                                <u-radio activeColor='#D91B1B' :name="1"> </u-radio>
                            </u-radio-group>
                        </view>
                        <text class="txtLighGray size24">我已阅读并同意51车俱乐部</text>
                        <text @click="OnPushwebview" class="size24 mainRed">《个人信息保护声明》</text>
                    </view>
                </u-form-item>
            </u-form>
            <u-button slot="confirmButton" shape="circle"
                :customStyle="{ width: '200rpx', backgroundColor: '#D91B1B', color: '#fff' }" @click="getNow">提交</u-button>
        </u-modal>
    </view>
</template>
<script>
import carousel from "@/components/carousel/index.vue"
// import CustomFormItemCity from "@/components/custom-form-item-city/custom-form-item-city.vue";
import {
    getstorage
} from '@/utils/index.js'
export default {
    components: {
        carousel
    },
    data() {
        return {
            radiovalue1: '',
            content: '提交成功，我们将安排专业的销售经理马上与您取得联系！',
            infoShow: false,
            formShow: false,
            formData: {
                city: '',
                mobile: '',
                name: '',
                sex: 0,
                port: 12,
            },
            detailData: {},
            detail: {},
            swiperlist: [],
            pagetype: '',//tabindex
            id: '',
            sex: [
                {
                    name: '先生',
                    current: true
                },
                {
                    name: '女士',
                    current: false
                }
            ],
            rules: {
                name: {
                    type: 'string',
                    required: true,
                    message: '请填写姓名',
                    trigger: ['blur', 'change']
                },
                mobile: [{
                    type: 'string', required: true, message: '请填写手机号', trigger: ['blur', 'change']
                },
                { pattern: /^1[3456789]\d{9}$/, message: '请输入有效手机号', trigger: 'blur' }],
                city: {
                    type: 'string',
                    required: true,
                    message: '请选择城市',
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
            this.formData.mobile = getstorage("mobile")
        }
        uni.$on('getcity', res => {
            this.formData.city = res.name
            this.formData.city_id = res.city_id
        })
        this.pagetype = option.type
        let obj = JSON.parse(option.item)
        this.detailData = obj
        this.id = obj.id
        this.getDetail()
        let arr = []
        if (obj.detail_img.length) {
            obj.detail_img.filter(res => {
                arr.push({ url: res, type: 'image' })
            })
        } else {
            arr.push({
                url: 'https://oss.dcqcjlb.com/51che_java_dev/20230413/file_1681356414481.jpg',
                type: 'image'
            })
        }
        this.swiperlist = arr
    },
    onShow() { },
    computed: {
        getadUrl() {
            if (this.detailData.imgList) {
                return true
            } else {
                return false
            }
        },
    },
    methods: {
        getDetail() {
            let obj = {
                id: this.id,
                api_name: 'detail',
                list_type: this.pagetype
            }
            this.$request51car.post("/app/wechat/api", obj).then(res => {
                this.detail = res.data
                this.cx_name = res.data.cx_name
                this.sale_price = res.data.sale_price
                this.guide_price = res.data.guide_price
            })
        },
        changesex(e) {
            this.formData.sex = e
            this.sex.filter(res => {
                res.current = false
            })
            this.sex[e].current = true
        },
        checkCity() {
            uni.navigateTo({
                url: '/pages/carShops/51carOther/selectCity'
            })
        },
        OnPushwebview() {
            uni.navigateTo({
                url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html',
            })
        },
        buyScheme() {
            if (this.pagetype == 1) {
                uni.navigateTo({
                    url: '/pages/carShops/51carOther/buyScheme?id=' + this.id,
                })
            }
        },
        morecont() {
            uni.navigateTo({
                url: '/pages/carShops/51carOther/moreCont'
            })
        },
        handleBuy() {
            this.formShow = true
        },
        async getNow() {
            let that = this
            if (!that.radiovalue1) {
                uni.$u.toast('请同意并阅读个人信息保护声明')
                return false
            }
            await that.$refs.formData.validate()
            let msg = Object.assign({}, that.formData);
            console.log(msg)
            msg.uv_id = that.detailData.cx_id
            msg.name = that.formData.name + that.sex[that.formData.sex].name
            msg.way = 9
            that.$request51car.post("user/events/user_record", msg).then(e => {
                that.infoShow = true
                this.formShow = false
            }).catch(errors => {
                console.log(errors)
                uni.showToast({
                    title: errors,
                    icon: 'none',
                    duration: 2000
                })
                that.$message.error(error);
            })
        },
        closeModal() {
            this.infoShow = false
        }
    }
}
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
}

.pdlr30 {
    padding: 0 30rpx;
}

.detailItem {
    height: 110rpx;
    line-height: 110rpx;
    border-bottom: 1rpx solid #eee;

}

.itemHeight {
    height: 50rpx;
    line-height: 50rpx;
}

.detailType {
    width: 180rpx;
    height: 64rpx;
    background: #F1F1F1;
    border-radius: 32rpx;
    text-align: center;
    line-height: 64rpx;
    font-size: 28rpx;
    font-weight: bold;
}

.bottomBox {
    width: 100%;
    padding: 30rpx 0;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;

    .btn {
        width: 470rpx;
        height: 96rpx;
        background: #D91B1B;
        border-radius: 48rpx;
        text-align: center;
        line-height: 96rpx;
        margin: 0 auto;
    }
}

.nameInput {
    width: 230rpx;
    height: 50rpx;
    line-height: 50rpx;
}

.formItem {
    width: 100%;
    box-sizing: border-box;
}

.checkbox {
    text-align: center;
    width: 100%;
    justify-content: center;
    padding: 0;
    // background: #f8f8f8;
}

.sexBox {
    margin-left: 20rpx;
    width: 260rpx;

    .sexItem {
        width: 120rpx;
        height: 64rpx;
        line-height: 64rpx;
        background: #F1F1F1;
        border-radius: 12rpx;
        font-size: 28rpx;
        text-align: center;

        &.current {
            color: #D91B1B;
            width: 116rpx;
            height: 62rpx;
            line-height: 62rpx;
            border: 1rpx solid #D91B1B;
            background-color: #FFF9F9;
        }
    }
}

.getPhone {
    width: 180rpx;
    padding: 10rpx 0;
    background-color: #f8f8f8;
    border-radius: 4rpx;
    font-size: 24rpx;

}

.size32 {
    font-size: 32rpx;
}

.ml10 {
    margin-left: 10rpx;
}
</style>
