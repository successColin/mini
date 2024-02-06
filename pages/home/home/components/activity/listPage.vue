<template>
    <view class="listPage">
        <view v-if="item.citeType == 10 || item.citeType == 11">
            <!-- 车型 -->
            <view v-if="item.type == 6" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    车型丨{{ item.relatedName }}
                </view>
            </view>
            <!-- 团购 -->
            <view v-if="item.type == 4" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    团购丨{{ item.relatedName }}
                </view>
            </view>
            <!-- 活动 -->
            <view v-if="item.type == 1" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    活动丨{{ item.relatedName }}
                </view>
            </view>
            <view v-if="item.type == 3" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230823/file_1692770227497.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    救援丨{{ item.relatedName }}
                </view>
            </view>
            <!-- 保养套餐 -->
            <view v-if="item.type == 2" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147614258.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    4S店丨{{ item.relatedName }}
                </view>
            </view>
            <!-- 套餐 -->
            <view v-if="item.type == 5" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <!-- <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692147663591.png">
                    </image> -->
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    <!-- 套餐丨{{ item.relatedName }} -->
                    团购丨{{ item.relatedName }}
                </view>
            </view>
        </view>
        <view v-else-if="item.citeType == 1 || item.citeType == 2 || item.citeType == 3">
            <!-- 团购 -->
            <view v-if="item.citeType == 1" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779116967.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    团购丨{{ item.productTitle }}
                </view>
            </view>
            <!-- 活动 -->
            <view v-if="item.citeType == 2" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685779655989.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    活动丨{{ item.activityTitle }}
                </view>
            </view>
            <!-- 活动 -->
            <view v-if="item.citeType == 3" class="prominent">
                <view class="u-flex alc" style="margin-left: 10rpx">
                    <image style="width: 32rpx; height: 32rpx"
                        src="https://oss.dcqcjlb.com/51che_java_dev/20230705/file_1688537558093.png">
                    </image>
                </view>
                <view class="txtColorWhite size24 oneLine" style="margin-left: 15rpx; width: 225rpx; line-height: 48rpx">
                    商家丨{{ item.shopName }}
                </view>
            </view>
        </view>
        <view class="waterfall-title oneLine" :class="{ 'mt-40': item.type || item.citeType }">
            <text>{{ item.activityTitle }}</text>
        </view>
        <view class="u-flex jsb ml10 mr10 size20">
            <view class="u-flex alc">
                <view>
                    <u-avatar size="20" :src="item.headImg"></u-avatar>
                </view>
                <view class="size20 ml10 w180">
                    {{ item.nickname }}
                </view>
            </view>
            <view class="u-flex alc" @click="handleLike(item, index)">
                <view class="u-flex alc">
                    <!-- 点赞 -->
                    <image v-if="item.likeType === 1" style="width: 28rpx; height: 28rpx" src="@/static/image/like1.svg">
                    </image>
                    <!-- 没点赞 -->
                    <image v-else style="width: 28rpx; height: 28rpx" src="@/static/image/like2.svg">
                    </image>
                </view>
                <view style="margin-left: 5rpx">{{ item.likeBaseNum }}</view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => { },
        },
        list: {
            type: Array,
            default: () => [],
        },
        index: {
            type: Number,
        },
    },
    data() {
        return {};
    },
    components: {},
    computed: {},
    watch: {},
    mounted() { },
    methods: {
        handleLike(item) {
            console.log(item);
            this.$request
                .post('/coc-social/api/v2/article/like', {
                    id: item.articleId,
                })
                .then((res) => {
                    if (res.code == 200) {
                        // 是否点赞 2 没有点赞 1 点赞(原先要取反)
                        if (item.likeType == 1) {
                            item.likeBaseNum = item.likeBaseNum - 1;
                        } else {
                            item.likeBaseNum = item.likeBaseNum + 1;
                        }
                        //
                        item.likeType = item.likeType == 2 ? 1 : 2;
                        this.$set(this.list, this.index, {
                            ...item,
                        });
                        this.$emit('update:list', this.list);
                    } else {
                        uni.showToast({
                            title: res.message,
                            icon: 'none',
                        });
                    }
                });
        },
    },
};
</script>
<style lang='scss' scoped>
.listPage {
    position: relative;
}

.prominent {
    position: absolute;
    top: -60rpx;
    height: 48rpx;
    background-image: url('https://oss.dcqcjlb.com/51che_java_dev/20230603/file_1685780222536.png');
    background-size: 100% 100%;
    border-radius: 10rpx;
    margin: 0 10rpx;
    display: flex;
}

.waterfall-title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    margin-left: 10rpx;
    width: 320rpx;
    font-size: 28rpx;
    line-height: 60rpx;
    font-weight: bold;
}

// .mt-40 {
//   margin-top: -40rpx;
// }

.w180 {
    width: 180rpx;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
