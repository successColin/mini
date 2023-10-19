<template>
    <view class="df sorts">
        <view class="df">
            <view v-for="(v, i) in list" :key="i" :class="sort === v.id ? 'sorts-select' : 'sorts-init'"
                @click="setList(v)">
                <view :class="sort === v.id && preview === '0' ? 'sorts-select-title' : 'sorts-init-title'">{{ v.title }}
                </view>
                <image v-if="v.status === 0"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692172953660.png"
                    class="w10h19" />
                <image v-else-if="v.status === 1"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692174344930.png"
                    class="w10h19" />
                <image v-else-if="v.status === 2"
                    src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692174328520.png"
                    class="w10h19" />
            </view>
        </view>
        <view v-if="!edit && !show" class="df" @click="toMy">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692173409084.png"
                class="w40h40" />
            <view class="sorts-manage">管理</view>
        </view>
        <view v-else-if="edit" class="sorts-btn" @click="toSearch">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230817/file_1692242856885.png"
                class="w48h48" />
            <view class="sorts-btn-title">搜商品</view>
        </view>
    </view>
</template>

<script>

import tabs from '@/pages/wiseman/darenxiaodian/components/tabs.vue'
export default {
    components: {
        tabs
    },
    props: {
        list: {
            type: Array,
            default() {
                return [];
            },
        },
        preview: {
            type: String,
            default() {
                return '0';
            },
        },
        edit: {
            type: Boolean,
            default() {
                return false;
            },
        },
        show: {
            type: Boolean,
            default() {
                return false;
            },
        }
    },
    data() {
        return {
            sort: undefined
        }
    },
    onLoad() { },
    onShow() { },
    methods: {
        isPreview() {
            if (this.preview === '1') {
                throw Error('')
            }
        },
        setList(value) {
            this.sort = value.id
            this.$emit('click', value)
        },
        toMy() {
            this.isPreview()
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/my'
            })
        },
        toSearch() {
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/search'
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.sorts {
    align-items: center;
    justify-content: space-between;
    width: 704rpx;
    height: 54rpx;

    &-init {
        display: flex;
        align-items: center;
        height: 54rpx;
        border-radius: 27rpx;
        border: 1rpx solid #FFFFFF;
        margin-right: 15rpx;
        padding-left: 23rpx;
        padding-right: 23rpx;

        &-title {
            font-size: 23rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 31rpx;
            margin-right: 8rpx;
        }
    }

    &-select {
        display: flex;
        align-items: center;
        height: 54rpx;
        background: #FFEEEE;
        border-radius: 27rpx;
        border: 1rpx solid #D91B1B;
        margin-right: 15rpx;
        padding-left: 23rpx;
        padding-right: 23rpx;

        &-title {
            font-size: 23rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 31rpx;
            margin-right: 8rpx;
        }
    }

    &-manage {
        font-size: 27rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #D91B1B;
        margin-left: 8rpx;
        margin-right: 15rpx;
    }

    &-btn {
        display: flex;
        align-items: center;
        width: 146rpx;
        height: 54rpx;
        border-radius: 27rpx;
        border: 1rpx solid #999999;
        padding-left: 15rpx;

        &-title {
            font-size: 23rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #666666;
            line-height: 27rpx;
        }
    }
}

.df {
    display: flex;
}

.w10h19 {
    width: 10rpx;
    height: 19rpx;
}

.w40h40 {
    width: 40rpx;
    height: 40rpx;
}

.w48h48 {
    width: 48rpx;
    height: 48rpx;
}
</style>