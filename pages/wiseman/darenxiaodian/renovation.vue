<template>
    <view class="page">
        <view class="renovation">
            <view class="renovation-card">
                <view class="df">
                    <view class="renovation-card-title">小店背景图</view>
                    <view class="renovation-card-tip">（1张，建议尺寸780*400）</view>
                </view>
                <view class="renovation-card-content" @click="setImage('backImage')">
                    <view class="renovation-card-content-title">更换图片</view>
                    <image :src="info.backImage" class="renovation-card-content-image" />
                </view>
            </view>
            <view class="renovation-card2">
                <view class="df">
                    <view class="renovation-card-title">我的小店名称</view>
                    <view class="renovation-card-tip">（10字以内）</view>
                </view>
                <textarea v-model="info.name" placeholder="请输入" placeholder-style="color:#999999"
                    class="renovation-card2-content" @input="setMaxLength(info.name, 'name', 10)"></textarea>
            </view>
            <view class="renovation-card2">
                <view class="df">
                    <view class="renovation-card-title">我的简介</view>
                    <view class="renovation-card-tip">（20字以内）</view>
                </view>
                <textarea v-model="info.intro" placeholder="请输入一句话做自我介绍" placeholder-style="color:#999999"
                    class="renovation-card2-content" @input="setMaxLength(info.intro, 'intro', 20)"></textarea>
            </view>
            <view class="renovation-card3">
                <view class="df">
                    <view class="renovation-card-title">我的标签</view>
                    <view class="renovation-card-tip">（不超过3个）</view>
                </view>
                <view class="renovation-card3-content">
                    <view v-for="(v, i) in taglist" :key="i">
                        <view v-if="v.state === 'check'" class="renovation-card3-content-check">
                            <view class="renovation-card3-content-check-title" @click="setTagList(v)">{{ v.title }}</view>
                            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692348804349.png"
                                class="renovation-card3-content-check-image" @click="delTagList(v)" />
                        </view>
                        <input v-else v-model="tag.value" placeholder="请输入"
                            placeholder-style="color:#999999;font-size:23rpx;" class="renovation-card3-content-input"
                            @blur="addTagList(v)" @input="setListMaxLength(tag.value, 5)">
                    </view>
                    <view v-if="state === 'add' && taglist.length !== 3" class="renovation-card3-content-add"
                        @click="setState('input')">
                        <image src="https://oss.dcqcjlb.com/51che_java_dev/20230818/file_1692347783188.png"
                            class="renovation-card3-content-add-image" />
                        <view class="renovation-card3-content-add-title">自定义标签</view>
                    </view>
                    <input v-if="state === 'input'" v-model="tag.value" placeholder="请输入"
                        placeholder-style="color:#999999;font-size:23rpx;" class="renovation-card3-content-input"
                        @blur="addTagList()" @input="setListMaxLength(tag.value, 5)">
                </view>
            </view>
            <view class="renovation-card4">
                <view class="df">
                    <view class="renovation-card-title">分享小程序配图</view>
                    <view class="renovation-card-tip">（1张，建议尺寸900*1600）</view>
                </view>
                <view class="renovation-card4-content" @click="setImage('posterShareUrl')">
                    <view class="renovation-card4-content-title">更换图片</view>
                    <image :src="info.posterShareUrl" class="renovation-card4-content-image" />
                </view>
            </view>
            <view class="renovation-card2">
                <view class="df">
                    <view class="renovation-card-title">分享文案</view>
                    <view class="renovation-card-tip">（20字以内）</view>
                </view>
                <textarea v-model="info.posterDesc" placeholder="请输入分享达人小店的文案" placeholder-style="color:#999999"
                    class="renovation-card2-content" @input="setMaxLength(info.posterDesc, 'posterDesc', 20)"></textarea>
            </view>
        </view>
        <view class="h107" />
        <view class="bottom">
            <view class="bottom-view">
                <view class="bottom-view-preview" @click="toPreview">预览</view>
                <view class="bottom-view-save" @click="setModal">保存修改</view>
            </view>
        </view>
        <view v-if="modal" class="modal">
            <view class="modal-view">
                <view class="modal-view-title">您还未保存当前修改，确定要离开吗？</view>
                <view class="modal-view-btn">
                    <view class="modal-view-btn-cancel" @click="setModal">取消修改</view>
                    <view class="modal-view-btn-confirm" @click="setModal">保存修改</view>
                </view>
            </view>
        </view>

        <u-toast ref="uToast"></u-toast>
        <overlayloadingicon :show="showload" />
    </view>
</template>

<script>
import overlayloadingicon from '@/pages/wiseman/darenxiaodian/components/overlayloadingicon.vue'
export default {
    components: {
        overlayloadingicon
    },
    data() {
        return {
            value: '',
            taglist: [],
            state: 'add',
            renovation: {},
            tag: {
                value: ''
            },
            modal: false,
            info: {},
            showload: false
        }
    },
    onLoad(option) {
        console.log(option)
        const info = JSON.parse(option.info)
        info.intro = info.intro === '该店主尚未添加简介' ? '' : info.intro
        this.info = Object.assign({ name: info.shopName }, info)
        info.tagsList.forEach((v, i) => {
            if (v) {
                this.taglist.push({ id: i, title: v, state: 'check' })
            }
        })
    },
    onShow() { },
    methods: {
        setState(value) {
            this.state = value
        },
        setImage(key) {
            let that = this
            uni.chooseImage({
                count: 1, //默认9
                success: (res) => {
                    let newheadimg = res.tempFilePaths[0]
                    uni.uploadFile({
                        url: getApp().globalData.uploadUrl,
                        filePath: newheadimg,
                        name: 'file',
                        formData: {
                            'file': newheadimg
                        },
                        header: {
                            "Content-Type": 'multipart/form-data'
                        },
                        success: (uploadFileRes) => {
                            that.info[key] = JSON.parse(uploadFileRes.data).data
                        }
                    })
                }
            })
        },
        async setModal() {
            // this.modal = !this.modal
            let info = this.info
            if (info.backImage && info.name && info.intro && info.tagsList.length && info.posterShareUrl && info.posterDesc) {
                this.showload = true
                let { code } = await this.$request.post('/coc-active/api/v1/newExpert/updateExpertShop', this.getInfo())
                if (code === 200) {
                    this.$refs.uToast.show({
                        message: '修改成功',
                        type: 'success',
                        complete() {
                            uni.$emit('drxdupdate')
                            uni.navigateBack()
                        }
                    })
                }
                this.showload = false
            } else {
                this.$refs.uToast.show({
                    message: '所有内容必填',
                    type: 'error',
                })
            }

        },
        getInfo() {
            const info = this.info
            info.shopName = info.name
            info.tagsList = []
            this.taglist.forEach((v) => {
                info.tagsList.push(v.title)
            })
            return info
        },
        addTagList(value = {}) {
            if (value.id) {
                this.taglist.forEach((v) => {
                    if (v.id === value.id) {
                        v.title = this.tag.value
                        v.state = 'check'
                    }
                })
            } else {
                const id = this.taglist.length === 0 ? 0 : this.taglist[this.taglist.length - 1].id + 1
                if (this.tag.value !== "") {
                    this.taglist.push({ id: id, title: this.tag.value, state: 'check' })
                }
            }
            if (this.tag.value === '') {
                this.delTagList(value)
            }
            this.state = 'add'
            this.tag.value = ''
        },
        setTagList(value) {
            this.taglist.forEach((v) => {
                if (JSON.stringify(v) === JSON.stringify(value)) {
                    this.tag.value = v.title
                    v.state = 'input'
                } else {
                    v.state = 'check'
                }
            })
        },
        delTagList(value) {
            let list = []
            this.taglist.forEach((v) => {
                if (JSON.stringify(v) !== JSON.stringify(value)) {
                    list.push(v)
                }
            })
            this.taglist = list
        },
        toPreview() {
            uni.navigateTo({
                url: '/pages/wiseman/darenxiaodian/index?preview=1&info=' + JSON.stringify(this.getInfo())
            })
        },
        setMaxLength(value, id, max) {
            if (value.length > max) {
                this.$nextTick(() => {
                    this.info[id] = value.substr(0, max)
                })
            }
        },
        setListMaxLength(value, max) {
            if (value.length > max) {
                this.$nextTick(() => {
                    this.tag.value = value.substr(0, max)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #EFEFEF;
}

.renovation {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 704rpx;
    height: 1625rpx;
    background: #FFFFFF;
    border-radius: 15rpx;
    margin-top: 23rpx;
    margin-bottom: 65rpx;

    &-card {
        width: 658rpx;
        height: 231rpx;
        margin-top: 23rpx;

        &-title {
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 38rpx;
        }

        &-tip {
            font-size: 23rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 38rpx;
        }

        &-content {
            width: 327rpx;
            height: 169rpx;
            margin-top: 23rpx;

            &-image {
                width: 327rpx;
                height: 169rpx;
            }

            &-title {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 327rpx;
                height: 46rpx;
                background: rgba(34, 34, 34, 0.3);
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 27rpx;
                margin-top: 123rpx;
            }
        }
    }

    &-card2 {
        width: 658rpx;
        height: 215rpx;
        margin-top: 39rpx;

        &-content {
            width: 612rpx;
            height: 131rpx;
            border-radius: 8rpx;
            border: 2rpx solid #EFEFEF;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 32rpx;
            margin-top: 8rpx;
            padding: 19rpx 23rpx;
            position: sticky;
        }
    }

    &-card3 {
        width: 658rpx;
        height: 140rpx;
        margin-top: 39rpx;

        &-content {
            display: flex;
            width: 658rpx;
            height: 63rpx;
            margin-top: 39rpx;

            &-check {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 63rpx;
                background: #FFEEEE;
                border-radius: 32rpx;
                border: 1rpx solid #FFEEEE;
                margin-right: 23rpx;
                padding-left: 23rpx;
                padding-right: 23rpx;

                &-title {
                    font-size: 23rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #D91B1B;
                    line-height: 27rpx;
                }

                &-image {
                    width: 24rpx;
                    height: 25rpx;
                    margin-left: 4rpx;
                }
            }

            &-add {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 177rpx;
                height: 63rpx;
                border-radius: 32rpx;
                border: 2rpx solid #999999;

                &-image {
                    width: 24rpx;
                    height: 25rpx;
                }

                &-title {
                    font-size: 23rpx;
                    font-family: PingFang SC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #666666;
                    line-height: 27rpx;
                }
            }

            &-input {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 177rpx;
                height: 63rpx;
                border-radius: 32rpx;
                border: 1rpx solid #999999;
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #D91B1B;
                line-height: 27rpx;
                margin-right: 23rpx;
                padding-left: 23rpx;
                padding-right: 23rpx;
            }
        }
    }

    &-card4 {
        width: 658rpx;
        height: 369rpx;
        margin-top: 38rpx;

        &-content {
            width: 327rpx;
            height: 169rpx;
            margin-top: 23rpx;

            &-image {
                width: 231rpx;
                height: 308rpx;
            }

            &-title {
                display: flex;
                align-items: center;
                justify-content: center;
                position: absolute;
                width: 231rpx;
                height: 46rpx;
                background: rgba(34, 34, 34, 0.3);
                font-size: 23rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #FFFFFF;
                line-height: 27rpx;
                margin-top: 262rpx;
            }
        }
    }
}

.bottom {
    width: 750rpx;
    position: fixed;
    bottom: 0;
    background: #FFFFFF;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    &-view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 107rpx;
        margin-left: 23rpx;
        margin-right: 23rpx;

        &-preview {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 262rpx;
            height: 77rpx;
            background: #FFFFFF;
            border-radius: 39rpx;
            opacity: 1;
            border: 2rpx solid #D91B1B;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #D91B1B;
            line-height: 32rpx;
        }

        &-save {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 404rpx;
            height: 77rpx;
            background: #D91B1B;
            border-radius: 39rpx;
            font-size: 27rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 32rpx;
        }
    }
}

.modal {
    width: 750rpx;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.5);

    &-view {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 750rpx;
        height: 406rpx;
        background: #FFFFFF;
        border-radius: 35rpx 35rpx 35rpx 35rpx;

        &-title {
            font-size: 35rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 66rpx;
            margin-top: 88rpx;
        }

        &-btn {
            display: flex;
            margin-top: 106rpx;
            margin-bottom: 44rpx;

            &-cancel {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 282rpx;
                height: 101rpx;
                background: rgba(239, 239, 239, 0);
                border-radius: 51rpx;
                font-size: 35rpx;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #666666;
                line-height: 66rpx;
            }

            &-confirm {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 282rpx;
                height: 101rpx;
                background: #D91B1B;
                border-radius: 51rpx;
                font-size: 35rpx;
                font-family: PingFang SC-Semibold, PingFang SC;
                font-weight: 600;
                color: #FFFFFF;
                line-height: 66rpx;
                margin-left: 141rpx;
            }
        }
    }
}

.df {
    display: flex;
}

.h107 {
    height: 107rpx;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
}
</style>