<template>
    <view class="page">
        <view v-if="rows.list && rows.list.length > 0" class="recommend">
            <view class="w700">
                <custom-waterfalls-flow imageKey='coverPicture' ref="waterfallsFlowRef" :value="rows.list"
                    :isshowicon='true' class="w700" @imageClick='toList'>
                    <view v-for="(v, i) in rows.list" :key="i" slot="slot{{i}}" class="recommend-item">
                        <!-- <image v-if="v.video && v.video.length > 0"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230830/file_1693395602623.png"
                            class="recommend-item-video" /> -->
                        <!-- <image :src="v.coverPicture" class="recommend-item-image" /> -->
                        <view class="recommend-item-bottom">
                            <view class="recommend-item-bottom-title">{{ v.activityTitle || v.articleTitle || v.productTitle
                            }}
                            </view>
                            <view class="df aic jcsb" >
                                <view class="df aic" style="padding-left: 10rpx;">
                                    <!-- <image :src="v.headImg" mode="aspectFill" class="recommend-item-bottom-image" /> -->
									<u-avatar size="20" :src="v.headImg"></u-avatar>
                                    <view class="recommend-item-bottom-name">{{ v.nickname }}</view>
                                </view>
                                <view class="recommend-item-bottom-check">{{ v.viewBaseNum }}人看过</view>
                            </view>
                        </view>
                    </view>
                </custom-waterfalls-flow>
            </view>
            <view v-if="bottomStatus" class="recommend-bottom">
                我到底啦~
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            rows: {
                list: [],
                total: 0
            },
            obj: {
                current: 1,
                size: 10,
                userId: 0,
				isQuote:1,
				type:0
            },
            bottomStatus: false
        }
    },
    props: {},
    created() {
        this.getList()
        uni.$on('updatedata', () => {
            this.obj.current = 1
            this.rows.list = []
            this.rows.total = 0
            this.getList()
        })
        uni.$on('recommend', () => {
            if (this.rows.total > this.obj.current * this.obj.size) {
                this.obj.current += 1
                this.getList()
            } else {
                this.bottomStatus = true
            }
        })
    },
    destroyed() {
        uni.$off('updatedata')
        uni.$off('recommend')
    },
    methods: {
        async getList() {
            const { data: { records, total } } = await this.$request.post('/coc-social/api/v2/article/myArticleList', this.obj)
            const list = JSON.parse(JSON.stringify(this.rows.list))
            records.forEach((v) => {
                if (v.imgs) {
                    v.coverPicture = v.imgs.split(',')[0]
                } else if(v.articleCoverImage) {
                    v.coverPicture = v.articleCoverImage
                }else if(v.video) {
                    v.coverPicture = v.video + '?x-oss-process=video/snapshot,t_1000,m_fast'
                }
                list.push(v)
            })
            this.rows.list = list
            this.rows.total = total
        },
        toClick() {
            uni.navigateTo({
                url: '/pages/activity/activityRegistration/playfulperson'
            })
        },
        toList(value) {
            let type = 2
            if (value.video) {
                type = 1
				uni.navigateTo({
					url: '/pages/activity/waterfull/videolist?id='+value.articleId+'&type=2',
				})
            }else{
				uni.navigateTo({
					url: '/pages/activity/waterfull/imglist?id='+value.articleId+'&isQuote=1',
				})
			}          
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
}

.recommend {
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;

    &-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 750rpx;
        height: 93rpx;

        &-logo {
            width: 33rpx;
            height: 26rpx;
            margin-left: 25rpx;
        }

        &-title {
            font-size: 36rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #222222;
            line-height: 40rpx;
            margin-left: 10rpx;
        }

        &-go {
            width: 10rpx;
            height: 16rpx;
            margin-right: 24rpx;
        }
    }

    &-item {
        background: #FFFFFF;
        margin-bottom: 10rpx;

        &-video {
            position: absolute;
            width: 82rpx;
            height: 82rpx;
            margin-top: 187rpx;
            margin-left: 130rpx;
        }

        &-image {
            width: 342rpx;
            height: 456rpx;
            background: #000000;
            border-radius: 10rpx;
        }

        &-bottom {
            width: 342rpx;
            border-radius: 0rpx 0rpx 10rpx 10rpx;
            padding-top: 20rpx;
            padding-bottom: 10rpx;

            &-title {
                width: 306rpx;
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 36rpx;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                margin-bottom: 18rpx;
                margin-left: 14rpx;
                margin-right: 20rpx;
            }

            &-image {
                width: 40rpx;
                height: 40rpx;
                margin-left: 15rpx;
                border-radius: 20rpx;
            }

            &-name {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #222222;
                line-height: 38rpx;
                margin-left: 10rpx;
            }

            &-check {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                line-height: 38rpx;
                margin-right: 20rpx;
            }
        }
    }

    &-bottom {
        font-size: 24rpx;
        color: #999999;
        text-align: center;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
    }

}

.df {
    display: flex;
}

.aic {
    align-items: center;
}

.jcsb {
    justify-content: space-between;
}

.fww {
    flex-wrap: wrap;
}

.w700 {
    width: 700rpx;
    margin-left: 25rpx;
}
</style>
