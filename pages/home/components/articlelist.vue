<template>
    <view class="page">
        <view class="u-flex jsb">
            <view class="left" @click="Onpush(1)">
                <view class="left-img">
                    <swiper duration='1000' :autoplay='true' interval='6000' :current='leftindex' @change="changleft"
                        circular style="position: relative;left: 44rpx;">
                        <swiper-item v-for="(item, index) in leftlist" :key="item.article.id" style="width: 120rpx;">
                            <view class="size20 ml44 oneLine" style="width: 120rpx;">{{ item.article.name }}</view>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="img-ab">
                    <!-- <swiper  circular :autoplay='true' :circular='true'  duration='1500'  > -->
                    <!-- <swiper-item v-for="(item, index) in leftlist" :key="item.article.id" > -->

                    <!-- </swiper-item> -->
                    <!-- <swiper-item> -->
                    <!-- 		 <view v-for="(item, index) in leftlist" :key="item.article.id">
							 <video  :show-center-play-btn='false'  :loop='true' :autoplay='true' duration='6000' objectFit='cover' :muted='true'
							     :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
							     :src="item.article.video+'?free_start=0&free_end=6'"></video>
						 </view> -->
                    <view>
                        <video :http-cache='true' :poster="leftcoverImage" :show-center-play-btn='false' :loop='true'
                            :autoplay='true' duration='6000' objectFit='cover' :muted='true' :controls='false'
                            style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
                            :src="leftvideo + '?free_start=0&free_end=6'"></video>
                    </view>
                    <!--   <video :show-center-play-btn='false' :http-cache='true' :loop='true' :autoplay='true'  objectFit='cover' :muted='true'
						                                :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
						                                :src="leftvideo"></video> -->
                    <!-- </swiper-item> -->
                    <!--  <swiper-item>
						                            <video :show-center-play-btn='false' :http-cache='true' :loop='true' :autoplay='true' objectFit='cover' :muted='true'
						                                :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
						                                :src="leftvideo"></video>
						                        </swiper-item> -->
                    </swiper>
                </view>
                <view class="mt17 ml25">
                    <swiper duration='1000' :autoplay='true' interval='6000' :current='leftindex' circular>
                        <swiper-item v-for="(item, index) in leftlist" :key="item.article.id"
                            catchtouchmove="stopTouchMove">
                            <view class="size24 fwb oneLine">{{ item.article.title }}</view>
                            <view class="size20  oneLine mt10">{{ item.article.content }}</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
            <view class="right" @click="Onpush(2)">
                <view class="right-img">
                    <swiper duration='1000' :autoplay='true' interval='5000' :current="rightindex" circular
                        @change="changright" style="position: relative;left: 44rpx;width: 120rpx;">
                        <swiper-item v-for="(item, index) in rightlist" :key="item.article.id"
                            catchtouchmove="stopTouchMove">
                            <view class="size20 ml44 oneLine" style="width: 120rpx;">{{ item.article.name }}</view>
                        </swiper-item>
                    </swiper>
                </view>
                <view class="img-ab">

                    <!-- <swiper  circular duration='1000' :current='rightindex' autoplay='true' interval='5000'> -->
                    <!-- <swiper-item    > -->
                    <!-- <view v-for="(item, index) in rightlist" :key="item.article.id">
						   <video  :show-center-play-btn='false'  :loop='true' :autoplay='true' duration='6' objectFit='cover' :muted='true'
						       :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
						       :src="item.article.video+'?free_start=0&free_end=6'"></video>
					   </view> -->
                    <view>
                        <video :http-cache='true' :poster="rightcoverImage" :show-center-play-btn='false' :loop='true'
                            :autoplay='true' duration='6' objectFit='cover' :muted='true' :controls='false'
                            style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
                            :src="rightvideo + '?free_start=0&free_end=6'"></video>
                    </view>
                    <!-- </swiper-item> -->
                    <!-- <swiper-item> -->
                    <!--    <video :show-center-play-btn='false' :http-cache='true' :loop='true' :autoplay='true'  objectFit='cover' :muted='true'
                                          :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
                                          :src="rightvideo"></video> -->
                    <!--         </swiper-item>
                                 <swiper-item>
                                      <video :show-center-play-btn='false' :http-cache='true' :loop='true' :autoplay='true' objectFit='cover' :muted='true'
                                          :controls='false' style="width: 320rpx;height: 188rpx;border-radius: 10rpx;"
                                          :src="rightvideo"></video>
                                  </swiper-item>
                    </swiper> -->
                </view>
                <view class="mt17 ml25">
                    <swiper duration='1000' :autoplay='true' interval='5000' :current="rightindex" circular>
                        <swiper-item v-for="(item, index) in rightlist" :key="item.article.id"
                            catchtouchmove="stopTouchMove">
                            <view class="size24 fwb oneLine">{{ item.article.title }}</view>
                            <view class="size20  oneLine mt10">{{ item.article.content }}</view>
                        </swiper-item>
                    </swiper>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    components: {

    },
    data() {
        return {
            swipervideoleft: 0,
            swipervideoright: 0,
            leftindex: 0,
            rightindex: 0,
            leftcurrent: 1,
            rightcurrent: 1,
            leftlist: [],
            rightlist: [],
            leftid: '',
            rightid: '',
            isleftnext: true,
            isrightnext: true,
            leftvideo: '',
            leftcoverImage: '',
            rightvideo: '',
            rightcoverImage: ''
        }
    },

    onLoad() { },
    created() {
        this.getleftlist()
        this.getrightlist()
    },
    onShow() { },
    methods: {
        stopTouchMove(res) {
            console.log(res)
            return true
        },
        Onpush(type) {
            let id = "",
                title = "";
            if (type == 1) {
                id = this.leftid;
                title = "娱乐精选";
            } else {
                id = this.rightid;
                title = "达人推荐";
            }
            uni.navigateTo({
                url: "/pages/activity/articlevideo/index?id=" + id + "&title=" + title + "&isQuote=1&quoteType=1",
            });
        },

        changleft(e) {
            this.leftindex = e.detail.current
            this.leftlist.filter(s => {
                if (s.article.id == this.leftlist[e.detail.current].article.id) {
                    this.leftid = s.article.id
                }
            })
            if (this.swipervideoleft == 0) {
                this.swipervideoleft = 1
            } else {
                this.swipervideoleft = 0
            }
            this.leftvideo = this.leftlist[e.detail.current].article.video
            this.leftcoverImage = this.leftlist[e.detail.current].article.coverImage
            // if (this.isleftnext) {
            //     if (e.detail.current != 0) {
            //         if ((e.detail.current / 8) % 1 === 0) {
            //             this.leftcurrent++
            //             this.getleftlist()
            //         }
            //     }
            // }
        },
        changright(e) {
            this.rightindex = e.detail.current
            this.rightlist.filter(s => {
                if (s.article.id == this.rightlist[e.detail.current].article.id) {
                    this.rightid = s.article.id
                }
            })
            if (this.swipervideoright == 0) {
                this.swipervideoright = 1
            } else {
                this.swipervideoright = 0
            }
            this.rightvideo = this.rightlist[e.detail.current].article.video
            this.rightcoverImage = this.rightlist[e.detail.current].article.coverImage
            // if (this.isrightnext) {
            //     if (e.detail.current != 0) {
            //         if ((e.detail.current / 8) % 1 === 0) {
            //             this.rightcurrent++
            //             this.getrightlist()
            //         }
            //     }
            // }
        },

        getrightlist() {
            this.$newrequest.post("coc-social/api/v2/article/articleList", {
                current: this.rightcurrent,
                size: 3,
                type: 1,
                isQuote: 1,
                quoteType: 1
            }).then(res => {
                if (this.rightcurrent == 1) {
                    this.rightid = res.data.records[0].article.id
                    this.rightlist = res.data.records
                    this.rightvideo = res.data.records[0].article.video
                    setTimeout(() => {
                        uni.createVideoContext("rightvodeo0", this).play()
                    }, 500)
                } else {
                    if (res.data.records.length != 10) {
                        this.isrightnext = false
                    }
                    res.data.records.filter(s => {
                        this.rightlist.push(s)
                    })
                }

            })
        },
        getleftlist() {
            this.$newrequest.post("coc-social/api/v2/article/articleList", {
                current: this.leftcurrent,
                size: 3,
                type: 1,
                isQuote: 0,
                quoteType: 1
            }).then(res => {
                if (this.leftcurrent == 1) {
                    this.leftid = res.data.records[0].article.id
                    this.leftlist = res.data.records
                    setTimeout(() => {
                        uni.createVideoContext("leftvodeo0", this).play()
                    }, 500)
                    this.leftvideo = res.data.records[0].article.video

                } else {
                    if (res.data.records.length != 10) {
                        this.isleftnext = false
                    }
                    res.data.records.filter(s => {
                        this.leftlist.push(s)
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss">
.page {
    margin: 0 25rpx 10rpx 25rpx;
}

.left {
    width: 340rpx;
    height: 354rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230905/file_1693903676738.png");
    background-size: 100% 100%;
    position: relative;
    border-radius: 25rpx;

    &-img {
        background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230906/file_1693985791729.png");
        background-size: 100% 100%;
        width: 180rpx;
        height: 40rpx;
        position: absolute;
        right: 11rpx;
        top: 15rpx;
    }
}

.right {
    width: 340rpx;
    height: 354rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230905/file_1693903727529.png");
    background-size: 100% 100%;
    position: relative;
    border-radius: 25rpx;

    &-img {
        background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230905/file_1693904285872.png");
        background-size: 100% 100%;
        width: 180rpx;
        height: 40rpx;
        position: absolute;
        right: 11rpx;
        top: 15rpx;
    }
}

.ml44 {
    // margin-left: 44rpx;
    line-height: 40rpx;
}

.img-ab {
    margin-left: 10rpx;
    margin-top: 65rpx;
    margin-right: 10rpx;
    height: 188rpx;
}

.ml25 {
    margin-left: 25rpx;
}

.mt17 {
    margin-top: 12rpx;
}</style>
