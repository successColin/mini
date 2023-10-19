<template>
    <view class="page">
        <view class="card">
            <view class="flex jsb alc" style="border-bottom: 1rpx solid #fff;">
                <view>
                    <view class="size28" style="margin-top:20rpx">可提现 (元)</view>
                    <view class="canMoney fwb ">{{ dataList.balance }}</view>
                </view>
                <view class="cardBtn size28 mainRed" @click="OnWithdrawal">提现</view>
            </view>
            <view class="flex alc jsb mt30">
                <view>
                    <view class="size24">总收益 (元)</view>
                    <view class="size40">{{ dataList.earnMoney }}</view>
                </view>
                <view>
                    <view class="size24">已提现 (元)</view>
                    <view class="size40">{{ dataList.withdrawMoney }}</view>
                </view>
                <view>
                    <view class="size24 plainBtn" @click="applyPiao">申请开票</view>
                    <view class="plainBtn mt10 size24" @click="lookRecords">提现记录</view>
                </view>
            </view>
        </view>
        <view class="flex jsb alc " style="padding: 30rpx 0">
            <view class="size32 fwb">收益明细</view>
            <view class="flex" @click="checkMonth"><text class="mr10">{{ value1 }} </text><u-icon size="12" name="arrow-down"></u-icon>
            </view>
        </view>
        <view class="earningsList bgfff br10 size28 hide">
            <view class="flex jsb alc lineh86 borderB">
                <view>产品订单收益 (元)</view>
                <view class="mainRed"><text v-if="earnings.merchantOrderIncome">+</text>{{ earnings.merchantOrderIncome }}</view>
            </view>
            <view class="flex jsb alc lineh86 borderB">
                <view>活动订单收益 (元)</view>
                <view class="mainRed"><text v-if="earnings.activityOrderIncome">+</text>{{ earnings.activityOrderIncome }}</view>
            </view>
			<view class="flex jsb alc lineh86 borderB">
			    <view>保养套餐订单收益 (元)</view>
			    <view class="mainRed"><text v-if="earnings.maintainMealIncome">+</text>{{ earnings.maintainMealIncome }}</view>
			</view>
            <view class="flex jsb alc lineh86 borderB">
                <view>团购订单收益 (元)</view>
                <view class="mainRed"><text v-if="earnings.groupOrderIncome">+</text>{{ earnings.groupOrderIncome }}</view>
            </view>
            <view class="flex jsb alc lineh86 borderB ">
                <view>救援年卡订单收益 (元)</view>
                <view class="mainRed"><text v-if="earnings.skyOrderIncome">+</text>{{ earnings.skyOrderIncome }}</view>
            </view>
            <view class="flex jsb alc lineh86 borderB ">
                <view>信用卡开卡收益 (元)</view>
                <view class="mainRed"><text v-if="earnings.bankOrderIncome">+</text>{{ earnings.bankOrderIncome }}</view>
            </view>
            <view class="flex jsb alc lineh86 borderB ">
                <view>团队贡献 (元)</view>
                <view class="mainRed"><text v-if="earnings.teamContribution">+</text>{{ earnings.teamContribution }}</view>
            </view>
            <view>
                <view class="flex jsb alc lineh86">
                    <view class="flex"><view style="margin-right:10rpx;">技术服务费 (元)</view><u-icon name="info-circle" size="12" ></u-icon></view>
                    <view class="green"><text v-if="earnings.technicalServiceFee">-</text>{{ earnings.technicalServiceFee }}</view>
                </view>
                <view class="txtLighGray size24" style="padding-bottom: 30rpx;">
                    {{ year }}年{{ month }}月销售佣金为{{ earnings.merchantCommission }}元，销售商品佣金的10%作为技术服务费由平台收取，本期收取技术服务费{{
                        earnings.technicalServiceFee }}元。
                </view>
            </view>
        </view>
        <u-datetime-picker ref="datetimePicker" :show="show" mode="year-month" @confirm='OnChooseStart' v-model="value2"
            @cancel='show = false'></u-datetime-picker>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            showpop: false,
            invoicingAmount: 0,
            dataList: {},
            earnings: {},
            show: false,
            value1: '',
            value2: Number(new Date()),
            year: '',
            month: ''
        }
    },

    onLoad() { },
    onShow() {
        let value = new Date()
        let month = value.getMonth() + 1 < 10 ? "0" + (value.getMonth() + 1) : value.getMonth() + 1;
        this.value1 = value.getFullYear() + "-" + month
        this.year =  value.getFullYear()
        this.month = month
        this.getData()
        this.getInfo()
    },
    methods: {
        getInfo() {
            this.$request.post("/coc-active/api/v2/withdraw/expertIncomeDetails", { time: this.value1 }).then(res => {
                if (res.code == 200) {
                    this.earnings = res.data
                }
            })
        },
        checkMonth() {
            this.show = true
        },
        OnChooseStart(val) {
            console.log(val)
            let time = val.value
            let date = new Date(time);
            let mon = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
            this.year = date.getFullYear()
            this.month = mon
            this.value2 = date.getFullYear() + "-" + mon
            this.value1 = this.value2
            this.getInfo()
            this.show = false
        },
        OnWithdrawal() {
            console.log(this.dataList.balance, '4564==gdsfhasdjfk')
            if (this.dataList.balance > 50) {
                uni.navigateTo({
                    url: "/pages/myEarnings/InitiatePayout?balance=" + this.dataList.balance
                })
            } else {
                uni.$u.toast('余额大于50才能提现')
            }
        },
        lookRecords() {
            uni.navigateTo({
                url: "/pages/myEarnings/withdrawlist"
            })
        },
        applyPiao() {
            uni.navigateTo({
                url: "/pages/myEarnings/requestInvoicing"
            })
            // if (this.invoicingAmount > 0) {
            // 	uni.navigateTo({
            // 		url: "/pages/myEarnings/requestInvoicing"
            // 	})
            // } else {
            // 	uni.$u.toast('开票金额不足')
            // }
        },
        getData() {
            this.$request.post("/coc-active/api/v1/expert/expertSpecialArea").then(res => {
                this.dataList = res.data
            })
        }


    }
}
</script>

<style lang="scss" scoped>
.page {
    padding: 25rpx;
}

.card {
    width: 700rpx;
    height: 360rpx;
    background: url(https://oss.dcqcjlb.com/51che_java_dev/20230815/file_1692062486627.png) no-repeat;
    background-size: 100%;
    color: #fff;
    border-radius: 10rpx;
    padding: 25rpx;
    box-sizing: border-box;

}

.green {
    color: #306B3D;
}

.canMoney {
    font-size: 60rpx;
    padding-bottom: 30rpx;
}

.cardBtn {
    width: 140rpx;
    height: 60rpx;
    line-height: 60rpx;
    border-radius: 70rpx;
    background: #FFFFFF;
    border-radius: 30rpx;
    text-align: center;
}

.plainBtn {
    width: 132rpx;
    height: 48rpx;
    line-height: 48rpx;
    border-radius: 66rpx;
    text-align: center;
    border: 1px solid #FFFFFF;
}

.size40 {
    font-weight: bold;
    font-size: 40rpx;
}

.earningsList {
    padding: 0 25rpx;
    margin-bottom: 100rpx;
}

.lineh86 {
    line-height: 86rpx;
}

.borderB {
    border-bottom: 1rpx solid #E8E8E8;
}

.card-item {
    margin: 25rpx;
    background: #FFFFFF;
    border-radius: 10rpx;
    padding: 40rpx 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
</style>