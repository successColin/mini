<template>
    <view class="page">
        <view class="rescuestory">
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695016278236.png"
                class="rescuestory-image" />
            <view>
                <view class="rescuestory-top">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695005018280.png"
                        class="rescuestory-top-image" />
                    <view class="rescuestory-top-title" @click="toClick">去预约</view>
                </view>
                <scroll-view v-if="list && list.length > 0" class="rescuestory-list" scroll-x="true">
                    <view class="u-flex">
                        <view v-for="(v, i) in list" :key="i" class="rescuestory-item" @click="Onpushdetail(v)">
                            <image :src="v.coverImage" class="rescuestory-item-image" />
                            <!-- <video v-show="false" :src="v.videoUrl" class="rescuestory-item-image"
                                @loadedmetadata="e => loadedmetadata(e, v)"></video> -->
                            <view class="df fdc jcsb">
                                <view class="rescuestory-item-title">{{ v.title }}</view>
                                <view class="rescuestory-item-name">51车俱乐部</view>
                                <view class="rescuestory-item-time">{{ v.createdAtStr }}更新</view>
                            </view>
                            <!-- <view class="rescuestory-item-number">
                                <image
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695015861231.png"
                                    class="rescuestory-item-number-image" />
                                <view class="rescuestory-item-number-title">{{ v.time }}</view>
                            </view> -->
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        Onpushdetail(v) {
            uni.navigateTo({
                url: '/pages/activity/foursvideo/index?id=' + v.id + '&type=3'
            })
        },
        async getList() {
            const { data: { records } } = await this.$request.post('/coc-active/api/v1/video/list', {
                current: 1, size: 100,
                type: 3
            })
            this.list = records
        },
        toClick() {
            uni.navigateTo({
                url: '/pages/upkeep/consult'
            })
        },
        loadedmetadata({ detail: { duration } }, v) {
            const list = JSON.parse(JSON.stringify(this.list))
            list.forEach((value) => {
                if (v.id === value.id) {
                    value.time = this.toHourMinute(duration)
                }
            })
            this.list = list
        },
        toHourMinute(duration) {
            let time = ''
            duration = Math.trunc(duration)
            if (Math.floor(duration / 60) === 0) {
                if (duration > 10) {
                    time = '00:' + (duration % 60)
                } else {
                    time = '00:0' + (duration % 60)
                }
            } else {
                if (Math.floor(duration / 60) > 10) {
                    time = Math.floor(duration / 60)
                } else {
                    time = '0' + Math.floor(duration / 60)
                }
                if (Math.floor(duration % 60) > 10) {
                    time += (':' + Math.floor(duration % 60))
                } else {
                    time += (':0' + Math.floor(duration % 60))
                }
            }
            return time
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 270rpx;
    margin-top: 14rpx;
}

.rescuestory {
    position: relative;
    width: 700rpx;
    height: 270rpx;

    &-image {
        position: absolute;
        top: 0;
        width: 700rpx;
        height: 270rpx;
    }

    &-top {
        position: relative;

        &-image {
            position: absolute;
            top: 17rpx;
            right: 21rpx;
            width: 112rpx;
            height: 49rpx;
        }

        &-title {
            position: absolute;
            top: 17rpx;
            right: 21rpx;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 112rpx;
            height: 49rpx;
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            font-style: italic;
            color: #FFFFFF;
            line-height: 35rpx;
        }
    }

    &-list {
        position: absolute;
        top: 80rpx;
        left: 25rpx;
        width: 650rpx;
        height: 160rpx;
    }

    &-item {
        position: relative;
        display: flex;
        height: 160rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        margin-right: 10rpx;

        &-image {
            width: 140rpx;
            height: 140rpx;
            border-radius: 10rpx;
            margin-top: 10rpx;
            margin-left: 10rpx;
        }

        &-title {
            width: 215rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            margin-left: 9rpx;
            margin-right: 26rpx;
            margin-top: 10rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }

        &-name {
            width: 215rpx;
            font-size: 20rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            margin-left: 9rpx;
            margin-right: 26rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 1;
            overflow: hidden;
        }

        &-time {
            width: 215rpx;
            font-size: 20rpx;
            font-family: HONOR Sans CN;
            font-weight: 400;
            color: #999999;
            margin-left: 8rpx;
            margin-right: 26rpx;
            margin-bottom: 10rpx;
        }

        &-number {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            left: 10rpx;
            top: 10rpx;
            width: 77rpx;
            height: 26rpx;
            background: #000000;
            border-radius: 10rpx;

            &-image {
                width: 8rpx;
                height: 10rpx;
            }

            &-title {
                font-size: 20rpx;
                font-family: HONOR Sans CN;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 36rpx;
                margin-left: 3rpx;
            }
        }
    }
}

.df {
    display: flex;
}

.fdc {
    flex-direction: column;
}

.jcsb {
    justify-content: space-between;
}
</style>