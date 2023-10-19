<template>
    <view class="page">
        <view class="play">
            <image v-show="status" src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695015091029.png"
                class="play-image" />
            <image v-show="!status" src="https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695015752642.png"
                class="play-image" />
            <view class="play-display">
                <view class="df fdc aic">
                    <view class="play-top">
                        <view :class="['play-top-left', status ? 'o0' : '']" @click="setStatus(true)">户外畅游</view>
                        <view :class="['play-top-right', status ? '' : 'o0']" @click="setStatus(false)">户内嗨乐</view>
                    </view>
                    <view v-for="(v, i) in list" :key="i" class="play-item" @click="toList(v)">
                        <view class="play-item-top">
                            <image :src="v.coverPicture" class="play-item-top-image"></image>
                            <view v-if="v.activitySignUpStatus == 1 || v.activitySignUpStatus == 2"
                                class="play-item-top-time">
                                <text v-if="v.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
                                <text style="margin-right: 14rpx;" v-if="v.activitySignUpStatus == 1">报名开启时间</text>
                                {{ v.activitySignUpStatus == 2 ? v.activityEndTime : v.activityBeginTime }}
                            </view>
                            <!-- 	<view class="s_ghbox" v-if="v.activitySignUpStatus == 1 || v.activitySignUpStatus == 2">
										<text v-if="v.activitySignUpStatus == 2" style="margin-right: 14rpx;">报名截止时间</text>
										<text style="margin-right: 14rpx;" v-if="v.activitySignUpStatus == 1">报名开启时间</text>{{
									        v.activitySignUpStatus==2?v.activityEndTime:v.activityBeginTime }}
									</view> -->
                            <view v-if="v.activitySignUpStatus == 2" class="play-item-top-btn">
                                <view :class="v.districtName && v.districtName.length > 0 ? '' : 'o0'"
                                    class="play-item-top-btn-left">{{
                                        v.districtName }}</view>
                                <view v-if="v.activitySignUpStatus == 2" class="play-item-top-btn-right">报名中</view>
                            </view>
                            <view v-if="v.activitySignUpStatus == 1" class="pa260110">
                                <image src="@/static/image/huodongyugao.png" class="w180h180" />
                            </view>
                            <view
                                v-if="v.activitySignUpStatus == 3 || v.activitySignUpStatus == 5 || v.activitySignUpStatus == 4"
                                class="pa260110">
                                <image src="@/static/image/jieshu.png" class="w180h180" />
                            </view>
                        </view>
                        <view class="play-item-title">{{ v.title }}</view>
                        <view class="play-item-bottom">
                            <view class="df aife">
                                <view v-if="v.payType !== 1" class="play-item-bottom-money">￥</view>
                                <view v-if="v.payType !== 1" class="play-item-bottom-money2">{{ v.bankCardPrice ?
                                    v.bankCardPrice :
                                    v.flashSalePrice }}
                                </view>
                                <view v-if="v.payType === 1" class="play-item-bottom-money2">免费</view>
                                <view v-if="v.maxCommissionPrice" class="play-item-bottom-range">
                                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693276785188.png"
                                        class="play-item-bottom-range-image" />
                                    <view class="play-item-bottom-range-money">{{ v.maxCommissionPrice }}
                                    </view>
                                </view>
                                <view class="play-item-bottom-money3">￥{{ v.marketPrice }}</view>
                            </view>
                            <view class="df aic h40">
                                <view class="play-item-bottom-enroll">已报名 {{ v.saleNum }}/{{ v.stock }}</view>
                                <view v-if="v.saleNum > 0" class="df">
                                    <image v-for="(value, index) in v.headPortraits" :key="index" :src="value"
                                        class="play-item-bottom-head" />
                                    <view v-if="v.saleNum > 2" class="play-item-bottom-more">
                                        <view class="w6h6" />
                                        <view class="w6h6 ml4 mr4" />
                                        <view class="w6h6" />
                                    </view>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>
                <!-- <view class="play-btn" @click="toClick">
                    <view class="play-btn-title">查看更多</view>
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692170166388.png"
                        class="play-btn-image" />
                </view> -->
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            status: true,
            list: [],
            obj: {
                current: 1,
                size: 100,
                zone: 3
            },
            codeTime: undefined,
            click: false,
            hylist: [],
            hnlist: []
        }
    },
    props: {},
    created() {
        this.getList()
        uni.$on('updatedata', () => {
            this.getList()
        })
        this.initInterval()
    },
    destroyed() {
        uni.$off('updatedata')
        clearInterval(this.codeTime)
    },
    methods: {
        initInterval() {
            this.codeTime = setInterval(() => {
                if (this.click) {
                    clearInterval(this.codeTime)
                } else {
                    this.status = !this.status
                    this.obj.zone = this.status ? 3 : 4
                    if (this.hnlist.length === 0 || this.hylist.length === 0) {
                        this.getList()
                    }
                    this.list = this.status ? this.hylist : this.hnlist
                }
            }, 5000)
        },
        setStatus(value) {
            this.click = true
            this.status = value
            this.obj.zone = value ? 3 : 4
            this.getList()
        },
        async getList() {
            const { data: { records } } = await this.$request.post('/coc-active/api/v2/homePage/getActivitysByTop', this.obj)
            this.list = records.splice(0, 1)
            if (this.obj.zone === 3) {
                this.hylist = records.splice(0, 1)
            } else {
                this.hnlist = records.splice(0, 1)
            }
        },
        toClick() {
            if (this.status) {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/outdoorsactivity'
                })
            } else {
                uni.navigateTo({
                    url: '/pages/activity/activityRegistration/indooractivity'
                })
            }
        },
        toList(value) {
            uni.navigateTo({
                url: '/pages/home/activityDetail/index?id=' + value.activityId
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
    background: #FFFFFF;
    border-radius: 36rpx;
    margin-top: 35rpx;
}

.play {
    position: relative;

    &-image {
        position: absolute;
        top: 0;
        width: 750rpx;
        height: 741rpx;
    }

    &-display {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        min-height: 741rpx;
    }

    &-top {
        display: flex;
        align-items: center;
        width: 750rpx;
        height: 124rpx;

        &-left {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 201rpx;
            height: 121rpx;
            margin-left: 87rpx;
            margin-right: 87rpx;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height: 36rpx;
        }

        &-right {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 201rpx;
            height: 121rpx;
            margin-left: 87rpx;
            margin-right: 87rpx;
            font-size: 32rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #666666;
            line-height: 36rpx;
        }
    }

    &-item {
        position: relative;
        width: 700rpx;
        background: #FFFFFF;
        border-radius: 10rpx;
        margin-top: 17rpx;

        &-top {
            width: 700rpx;
            height: 400rpx;
            background: #6A6A6A;
            border-radius: 10rpx;

            &-image {
                width: 700rpx;
                height: 400rpx;
                border-radius: 10rpx;
            }

            &-time {
                position: absolute;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 30rpx;
                left: -2rpx;
                // width: 280rpx;
                padding-left: 10rpx;
                padding-right: 10rpx;
                height: 52rpx;
                background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
                border-radius: 0rpx 24rpx 28rpx 0rpx;
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                line-height: 40rpx;
            }

            &-btn {
                position: absolute;
                top: 330rpx;
                left: 20rpx;
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 653rpx;

                &-left {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120rpx;
                    height: 52rpx;
                    background: rgba(34, 34, 34, 0.5);
                    border-radius: 25rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 40rpx;
                }

                &-right {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 120rpx;
                    height: 52rpx;
                    background: linear-gradient(90deg, #D91B1B 0%, #E94040 100%);
                    border-radius: 25rpx;
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: #FFFFFF;
                    line-height: 40rpx;
                }
            }
        }

        &-title {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 40rpx;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            margin: 25rpx 25rpx 10rpx 25rpx;
        }

        &-bottom {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            padding: 0rpx 26rpx 30rpx 28rpx;

            &-money {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #D91B1B;
                line-height: 32rpx;
            }

            &-money2 {
                font-size: 40rpx;
                font-family: PingFang SC;
                font-weight: bold;
                color: #D91B1B;
                line-height: 40rpx;
            }

            &-range {
                display: flex;
                align-items: center;
                height: 48rpx;
                background: #FFDBDB;
                border-radius: 24rpx;
                margin-left: 10rpx;

                &-image {
                    width: 48rpx;
                    height: 48rpx;
                }

                &-money {
                    font-size: 24rpx;
                    font-family: PingFang SC;
                    font-weight: bold;
                    color: #D91B1B;
                    line-height: 40rpx;
                    margin-left: 9rpx;
                    margin-right: 14rpx;
                }
            }

            &-money3 {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                text-decoration: line-through;
                color: #999999;
                line-height: 40rpx;
                margin-left: 10rpx;
            }

            &-enroll {
                font-size: 24rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                margin-right: 7rpx;
            }

            &-head {
                width: 40rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background: #F8F8F8;
                margin-right: 4rpx;
            }

            &-more {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40rpx;
                height: 40rpx;
                border-radius: 20rpx;
                background: #F8F8F8;
            }
        }
    }

    &-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 750rpx;
        height: 50rpx;
        margin-bottom: 21rpx;

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #999999;
            line-height: 40rpx;
        }

        &-image {
            width: 46rpx;
            height: 46rpx;
        }
    }
}

.pa0 {
    position: absolute;
    top: 0;
}

.o0 {
    opacity: 0;
}

.df {
    display: flex;
}

.fdc {
    flex-direction: column;
}

.aic {
    align-items: center;
}

.aife {
    align-items: flex-end;
}

.w6h6 {
    width: 6rpx;
    height: 6rpx;
    background: #999999;
    border-radius: 6rpx;
}

.w180h180 {
    width: 180rpx;
    height: 180rpx;
}

.h40 {
    height: 40rpx;
}

.ml4 {
    margin-left: 4rpx;
}

.mr4 {
    margin-right: 4rpx;
}

.o0 {
    opacity: 0;
}

.pa260110 {
    position: absolute;
    left: 260rpx;
    top: 110rpx;
}
</style>
