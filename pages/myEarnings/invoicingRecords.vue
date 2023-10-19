<template>
    <view class="page">
        <view class="card mt20" v-if="dataList.length">
            <view class="item" v-for="(item, index) in dataList" :key="index" @click="lookInvoicing(item)">
                <view class="flex jsb alc">
                    <view class="size28 flex fwb">申请开票 <u-icon size="12" name="error-circle" class="ml10"></u-icon>
                    </view>
                    <view class="mainRed size32 fwb">￥{{ item.invoicingAmount }}</view>
                </view>
                <view class="size24 mt10">{{ item.notes }}</view>
                <view class="flex jsb mt10">
                    <view class="size24 txtLighGray">{{ item.createdAt }}</view>
                    <view class="size24 mainRed">{{ item.invoicingStatusMsg }}</view>
                </view>
                <view v-if="item.invoicingStatus == 3" class="size20 mainRed mt20">
                    驳回原因: {{ item.reason }}
                </view>
            </view>
        </view>
        <view class="tac mt50" v-else>
            <image style="width: 423rpx;height: 324rpx;margin-top: 100rpx;"
                src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692345210274.png">
            </image>
            <view class="txtDarkGray">暂无开票记录</view>
        </view>

    </view>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            dataList: [],
            current: 1,
            isLoadMore: false,
        }
    },
    onReachBottom() {
        if (!this.isLoadMore) {
            this.current++
            this.getList()
        }

    },
    onLoad() {
        this.getList()
    },
    onShow() { },
    methods: {
        getList() {
            this.$request.post("/coc-active/api/v1/newExpert/expertInvoicing/list", {
                current: this.current,
                size: 20
            }).then(res => {
                if (res.data.records.length < 20) {
                    this.isLoadMore = true
                }
                if (this.current == 1) {
                    this.dataList = res.data.records
                } else {
                    res.data.records.filter(s => {
                        this.dataList.push(s)
                    })
                }
            })
        },
        lookInvoicing(item) {
            uni.navigateTo({
                url: "/pages/myEarnings/invoicing?id=" + item.expertInvoicingId
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page {}

.card {
    background-color: #ffffff;
    padding: 0rpx 50rpx;
}

.item {
    padding: 25rpx;
    border-bottom: 1rpx solid #F8F8F8;
}
</style>