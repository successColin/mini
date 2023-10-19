<template>
    <view>
        <u-popup :safeAreaInsetBottom='false' round='10' :show="showshare" @close="OnCloseShare" mode="center">
            <view class="pop-poster">
                <view @click="OnSaveImage" style="margin-top: 100rpx;" class="u-flex jsc">
                    <image :src="poster" style="width: 443rpx;height: 787rpx;"></image>
                    <!-- 生成图片 -->
                    <poster ref="poster" :list="list" background-color="#FFF" :width="443" :height="787"
                        @on-success="posterSuccess"></poster>
                </view>
                <view class="tac size28" style="margin-top: 28rpx;">
                    点击图片,长按保存到相册
                </view>
                <view class="pyq">
                    <view class="text-pyq">
                        {{ data.posterDesc }}
                    </view>
                    <view class="tac mt20 " @click="Oncopy(data.posterDesc)">
                        <image style="width: 230rpx;height: 60rpx;"
                            src="https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685085631958.png">
                        </image>
                    </view>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import Poster from '@/components/zhangyuhao-poster/Poster.vue'
export default {
    components: { Poster },
    props: {
        data: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            poster: '',
            list: [],
            showshare: false
        }
    },
    onLoad() { },
    onShow() { },
    created() {
        this.getShare()
    },
    methods: {
        getShare() {
            this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode", {
                page: 'pages/wiseman/darenxiaodian/index',
                scene: this.data.userId
            }).then(res => {
                this.showshare = true
                this.list = [
                    {
                        type: 'image',
                        // path替换成你自己的图片，注意需要在小程序开发设置中配置域名
                        path: this.data.posterShareUrl,
                        x: 0,
                        y: 0,
                        width: 443,
                        height: 787
                    },
                    {
                        type: 'image',
                        path: res.data.qrCode,
                        x: 18,
                        y: 682,
                        width: 90,
                        height: 90
                    }
                ]
                this.$nextTick(() => {
                    // 要放在$nextTick()里，不然会空白
                    this.$refs.poster.create();
                })
            })

        },
        OnCloseShare() {
            this.showshare = false
            this.$emit('close')
        },
        OnSaveImage() {
            let value = [this.poster]
            uni.previewImage({
                current: 99999,
                urls: value,
                longPressActions: {
                    itemList: ['发送给朋友', '保存图片', '收藏'],
                    success: function (data) {
                        console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
                    },
                    fail: function (err) {
                        console.log(err.errMsg);
                    }
                }
            })
        },
        posterSuccess(url) {
            // 生成成功，会把临时路径在这里返回
            this.poster = url;
        },
        Oncopy(value) {
            uni.setClipboardData({
                data: value,
                success: function () {
                    uni.$u.toast('复制成功')
                }
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.pop-poster {
    width: 650rpx;
    border-radius: 10rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685084245034.png");
    background-size: 100% 100%;
    margin-top: -12rpx;

    button::after {
        border: none;
    }
}

.pyq {
    margin: 25rpx;
    border-radius: 10rpx;
    background-color: #d91b1b;
    padding: 7rpx 7rpx 20rpx 7rpx;
}

.text-pyq {
    padding: 20rpx 20rpx 50rpx 20rpx;
    font-size: 24rpx;
    background-color: #ffffff;

    border-radius: 10rpx;
}
</style>