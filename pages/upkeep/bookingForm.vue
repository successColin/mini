<template>
    <view class="page">
        <image src='https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688546149521.png'
            class="yuePic" mode="widthFix"></image>
        <view class="formBox bgfff">
            <u--form labelPosition="left" :model="formData" :rules="rules" ref="uForm" labelWidth="100"
                :labelStyle="{ fontSize: '28rpx', fontWeight: 'bold' }">
                <u-form-item label="姓名" prop="username" borderBottom>
                    <u--input v-model="formData.username" border="none" placeholder="请输入" inputAlign='right'></u--input>
                </u-form-item>
                <u-form-item label="联系方式" prop="phone" borderBottom>
                    <view style="text-align: right;">{{ formData.phone }}</view>
                </u-form-item>
                <u-form-item label="保养车辆" prop="plate" borderBottom @click="checkCar">
                    <u--input v-model="formData.plate" border="none" placeholder="请选择爱车" inputAlign='right' disabled
                        disabledColor="#ffffff"></u--input>
                    <u-icon slot="right" name="arrow-right" color="#ccc"></u-icon>
                </u-form-item>
                <u-form-item label="上门取送车" borderBottom>
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u-radio-group v-model="deliveryCarService" placement="row" inputAlign='right'
                                @change="groupChange">
                                <u-radio :customStyle="{ marginRight: '10rpx' }" v-for="(item, index) in radiolist"
                                    :key="index" :label="item.name" :name="item.name" activeColor="#D91B1B">
                                </u-radio>
                            </u-radio-group>
                        </view>
                    </view>
                </u-form-item>
                <u-form-item label="替换车服务">
                    <view class="u-flex jsb">
                        <view></view>
                        <view>
                            <u-radio-group v-model="replaceCarService" placement="row" inputAlign='right'
                                @change="carChange">
                                <u-radio :customStyle="{ marginRight: '10rpx' }" v-for="(item, index) in radiolist"
                                    :key="index" :label="item.name" :name="item.name" activeColor="#D91B1B">
                                </u-radio>
                            </u-radio-group>
                        </view>
                    </view>
                </u-form-item>
            </u--form>
            <u-action-sheet :show="showCar" :actions="actions" title="请选择爱车" @close="showCar = false" @select="carSelect">
            </u-action-sheet>
        </view>
        <!-- 未绑定客户经理 -->
        <view class="checkSale flex jsb alc bgfff br10 mb20" @click="checkSale" v-if="!mySale.customerManagerId">
            <view class="contacts-item-label">选择您的专属客户经理</view>
            <u-icon name="arrow-right" size="14"></u-icon>
        </view>
        <!-- 已绑定客户经理 -->
        <view class="haveSale flex jsb alc bgfff br10 " v-else>
            <view class="flex alc"  @click="OnWechat()">
                <image :src="mySale.url" class="salePic"></image>
                <view class="fwb">{{ mySale.nickname }}</view>
                <view class="contacts-item-label" style="margin-left:40rpx">您的专属客户经理</view>
            </view>
            <image src="@/pages/carShops/static/image/sale.png" class="saletel" @click="OnTell()"></image>
        </view>
        <view class="u-flex" style="margin-top: 30rpx;justify-content: center;">
            <view>
                <u-radio-group v-model="radiovalue1" placement="column">
                    <u-radio activeColor='#D91B1B' :customStyle="{ marginBottom: '8px' }" :name="1">
                    </u-radio>
                </u-radio-group>
            </view>
            <text style="font-size: 24rpx;">我已阅读并同意</text>
            <text @click="OnPushPolicy1" style="font-size: 24rpx;color: #D91B1B;">《取送车服务协议》、</text>
            <text @click="OnPushPolicy2" style="font-size: 24rpx;color: #D91B1B;"> 《替换车服务协议》 </text>
        </view>
        <view style="margin-top: 50rpx;" class="flex jsc">
            <view @click="onsubmit" class="submitBtn">提交信息</view>
        </view>
         <!-- 二维码弹窗 -->
    <u-popup :safeAreaInsetBottom='false' :show="showcontact" @close="showcontact = false" mode="center">
      <view style="width: 700rpx;height: 700rpx;">
        <view style="text-align: center;margin-top: 50rpx;">
          <image style="width: 440rpx;height: 444rpx;" :src="codeurl" @click="OnpreviewImage"
            :show-menu-by-longpress="true"></image>
        </view>
        <view style="font-size: 24rpx;text-align: center;margin-top: 50rpx;">
          <view>长按保存销售经理微信二维码</view>
        </view>
      </view>
    </u-popup>
        <u-toast ref="uToast"></u-toast>
    </view>
</template>

<script>
import {
    gettoken,
    tologin,
    setstorage,
    getstorage
} from '@/utils/index.js'
export default {
    data() {
        return {
            mySale: {},
            showcontact: false,
            actions: [],
            formData: {
                phone: getstorage('mobile'),
                deliveryCarService: 1,
                replaceCarService: 1,
                managerId:''

            },
            radiolist: [{ name: '需要', value: 1 },
            { name: '不需要', value: 0 },
            ],
            deliveryCarService: '需要',
            replaceCarService: '需要',
            rules: {
                username: {
                    type: 'string', required: true, message: '请输入姓名', trigger: ['blur', 'change']
                },
                phone: [{
                    type: 'string', required: true, message: '请输入手机号', trigger: ['blur', 'change']
                },
                {
                    validator: (rule, value, callback) => {
                        return uni.$u.test.mobile(value);
                    },
                    message: '手机号码不正确', trigger: ['change', 'blur'],
                }
                ],
                plate: {
                    type: 'string', required: true, message: '请选择爱车', trigger: ['blur', 'change']
                },
            },
            radiovalue1: '',
            managerId: '',//客户经理ID，
            plate: '',//车牌
            showCar: false,
            shopId: '',
            codeurl: '',
			brandId:''
        }
    },
    onLoad(option) {
		if(option.brandId){
			this.brandId=option.brandId
		}
        this.shopId = option.shopId
    },
    onShow() {
        this.getDetail()
    },
    methods: {
        getDetail() {
            let id = getstorage('userId')
            this.$request.get("/coc-my/api/v1/my/user/car/lists").then(res => {
                let arr = []
                res.data.filter(car => {
                    arr.push({
                        name: car.plate
                    })
                })
                this.actions = arr
            })
            let obj = { shopId: this.shopId }
            this.$request.post("/coc-active/api/v2/maintain_meal/shop/customerManager/list", obj).then(res => {
                if (res.data.length == 1) {
                    this.mySale = res.data[0]
                    this.formData.managerId = res.data[0].customerManagerId
                } else {
                    this.mySale = {}
                }
            })
        },
        checkSale() {
            uni.navigateTo({
                url: "/pages/carShops/upkeep/checkSales?shopId=" + this.shopId
            });
        },
       
        checkCar() {
            if(this.actions.length){
                this.showCar = true
            }else {
                uni.navigateTo({
                    url: "/pages/my/mycar/index?brandId="+this.brandId 
                })
            }
        },
        carSelect(e) {
            console.log(e)
            this.formData.plate = e.name
        },
        groupChange(e) {
            if (e == '需要') {
                this.formData.deliveryCarService = 1
            } else {
                this.formData.deliveryCarService = 0
            }
        },
        carChange(e) {
            if (e == '需要') {
                this.formData.replaceCarService = 1
            } else {
                this.formData.replaceCarService = 0
            }
        },
        OnTell() {
            if (this.mySale.phone) {
                uni.makePhoneCall({
                    phoneNumber: this.mySale.phone
                });
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '暂无联系方式'
                })
            }
        },
        OnWechat() {
            if (this.mySale.extendQrCode) {
                this.codeurl = this.mySale.extendQrCode
                this.showcontact = true
            } else {
                uni.showToast({
                icon: 'none',
                title: '暂无个人二维码，点击右侧打电话试试吧~'
                })
            }
        },
        OnpreviewImage() {
            let _this = this
            uni.previewImage({
                urls: _this.codeurl,
                longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success: function (data) {
                    console.log('选中了图片', data);
                },
                fail: function (err) {
                    console.log(err.errMsg);
                }
                }
            });
        },
        Onpushloadhelp() {

        },
        OnPushPolicy1() {
            uni.navigateTo({
                url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html',
            })
        },
        OnPushPolicy2() {
            uni.navigateTo({
                url: '/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html',
            })
        },
        onsubmit() {
            if (!this.radiovalue1) {
                uni.$u.toast('请阅读并同意相关协议')
                return false
            }
            this.$refs.uForm.validate().then(res => {
                this.$request.post("/coc-active/api/v2/maintain_meal/appointmentMaintenance", this.formData).then(s => {
                    if (s.code == 200) {
                        uni.$u.toast('已提交')
                        setTimeout(() => {
                            uni.navigateBack({
                                delta: 1
                            });
                        }, 1500)

                    } else {
						console.log(s)
                        uni.$u.toast(s.message)
                        // setTimeout(() => {
                        //     uni.navigateBack({
                        //         delta: 1
                        //     });
                        // }, 2000)
                    }
                })
            }).catch(errors => {
                uni.$u.toast('请填写资料')
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.page {
    padding-bottom: 150rpx;
}

.yuePic {
    width: 450rpx;
    display: block;
    margin: 57rpx auto 0;
}

.formBox {
    width: 700rpx;
    padding: 0 25rpx;
    border-radius: 10rpx;
    margin: 25rpx auto 20rpx;
    box-sizing: border-box;
    font-size: 28rpx;

    .formItem {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1rpx solid #E8E8E8;
        height: 86rpx;
        line-height: 86rpx;

        &:last-child {
            border-bottom: 0;
        }
    }


}

.contacts-item-label {
    color: #222;
    font-weight: bold;
    font-size: 28rpx;
}

.checkSale {
    padding: 0 25rpx;
    height: 120rpx;
    line-height: 120rpx;
    width: 700rpx;
    margin: 25rpx auto;
    box-sizing: border-box;
}

.haveSale {
    padding: 0 25rpx;
    height: 120rpx;
    width: 700rpx;
    margin: 25rpx auto;
    line-height: 120rpx;

    .salePic {
        width: 84rpx;
        height: 84rpx;
        border-radius: 50%;
        margin-right: 26rpx;
    }

    .saletel {
        width: 34rpx;
        height: 34rpx;
    }
}

.submitBtn {
    width: 380rpx;
    height: 76rpx;
    background: #D91B1B;
    border-radius: 38rpx;
    line-height: 76rpx;
    text-align: center;
    font-size: 32rpx;
    color: #ffffff;
}

</style>
