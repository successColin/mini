<template>
    <div v-if="floatLength">
        <movable-area>
            <movable-view :x="x" :y="y" direction="all">
                <div class="floatVideo" @click.stop="Onpushdetail">
                    <video :src="itemObj.video" :controls="false" object-fit="cover" :loop="true" muted
                            :autoplay="true" style="width: 170rpx;height: 250rpx;border-radius: 15rpx;"></video>
                    <!-- <view class="floatVideo__title">达人推荐</view> -->
                    <image src="https://oss.dcqcjlb.com/51che_java_dev/20231221/file_1703148331014.png" class="zan"></image>
                </div>
            </movable-view>
        </movable-area>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        shopId: {
            type: Number,
            default: null,
        },
        relatedType: {
            type: Number,
            default: null,
        },
        relatedId: {
            type: Number,
            default: null,
        },
        jumpTitle: {
            type: String,
            default: '达人推荐',
        }
    },
    data() {
        return {
            floatLength: 0,
            itemObj: {},
            x: 300,
            y: 150,
        };
    },
    created() {
        this.getList();
    },

    methods: {
        // handleSubmit() {
        //   const e = this.itemObj;
        //   uni.navigateTo({
        //     url: `/pages/activity/articlevideo/index?id=${e.articleId}&newType=3`,
        //   });
        // },
        Onpushdetail() {
            let v = this.itemObj;
            if (v.video) {
                uni.navigateTo({
                    url:
                        "/pages/activity/articlevideo/index?title="+this.jumpTitle+"&newType=1&isQuote=1&relatedId=" +
                        this.relatedId +
                        "&relatedType=" +
                        this.relatedType +
                        "&id=" +
                        v.articleId,
                });
            } else {
                uni.navigateTo({
                    url:
                        "/pages/activity/waterfull/imglist?relatedId=" +
                        this.relatedId +
                        "&type=1" +
                        "&newType=1" +
                        "&isQuote=1" +
                        "&relatedType=" +
                        this.relatedType +
                        "&id=" +
                        v.articleId,
                });
            }
        },
        async getList() {
            const {
                data: { records },
            } = await this.$request.post("/coc-social/api/v2/article/expertRecommend", {
                current: 1,
                size: 100,
                relatedType: this.relatedType,
                shopId: this.shopId,
                relatedId: this.relatedId,
                selectType: 2,
            });
            records.forEach((v) => {
                if (v.imgs) {
                    v.coverPicture = v.imgs.split(",")[0];
                } else if (v.articleCoverImage) {
                    v.coverPicture = v.articleCoverImage;
                } else if (v.video) {
                    v.coverPicture = v.video + "?x-oss-process=video/snapshot,t_1000,m_fast";
                }
            });
            if (records.length) {
                this.floatLength = records.length;
                this.itemObj = records[0];
                console.log('达人推荐',this.itemObj)
            }
        },
    },
};
</script>

<style lang="scss" scoped>
/* drag1.wxss */
movable-area {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    // pointer-events: auto;
}

movable-view {
    position: relative;
    width: auto;
    height: auto;
    display: inline-block;
    // width: fit-content;
    // height: fit-content;
    pointer-events: auto;
}

.floatVideo {
    width: 170rpx;
    height: 250rpx;
    border-radius: 15rpx;
    border: 1rpx solid #D91B1B;
    position: relative;
    .zan {
        width: 140rpx;
        height: 40rpx;
        position: absolute;
        bottom: 15rpx;
        left: 15rpx;
    }

}

::v-deep movable-area{
    z-index: 99999999999!important;
}
</style>
