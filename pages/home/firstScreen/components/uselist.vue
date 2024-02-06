<template>
    <view class="use">
        <image src="https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705460156432.png" class="use-bgc" />
        <view class="use-list">
            <view v-for="(v, i) in list" :key="i" class="use-item" @click="toClick(v, i)">
                <image :src="v.icon" class="use-item-icon" />
                <image :src="v.url" class="use-item-image" :id="`use${i}`" />
                <view class="use-item-title">{{ v.name }}</view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {
                    icon: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705461497665.png",
                },
                {
                    icon: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705461558312.png",
                },
                {
                    icon: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705461591870.png",
                },
                {
                    icon: "https://oss.dcqcjlb.com/51che_java_dev/20240117/file_1705461617999.png",
                },
            ],
        };
    },
    created() {
        this.init();
        uni.$on("updatedata", () => {
            this.init();
        });
    },
    destroyed() {
        uni.$off("updatedata");
    },
    methods: {
        init() {
            this.getUseList();
        },
        async getUseList() {
            const { data } = await this.$request.post("/coc-active/api/v2/homePage/home/menu/list");
            const list = JSON.parse(JSON.stringify(this.list));
            data.forEach((v) => {
                if (v) {
                    const { relatedId, menuType, slogan, menuIcon } = v;
                    Object.assign(list[menuType - 1], { id: relatedId, url: slogan, name: menuIcon });
                }
            });
            this.list = list;
            this.$nextTick(() => {
                this.getQuery(0);
            });
        },
        toClick(value, index) {
            const list = [
                "/pages/activity/activityRegistration/changyouHiLe",
                "/pages/gourmetGroggery/index",
                "/pages/activity/activityRegistration/playfulperson",
                "/pages/advertisement/choice",
            ];
            uni.navigateTo({
                url: list[index] + "?homeMenuId=" + (value.id || ""),
            });
        },
        getQuery(current) {
            let query = uni
                .createSelectorQuery()
                .in(this)
                .select("#use" + current);
            query
                .boundingClientRect((data) => {
                    uni.$emit("use_height", data.top);
                })
                .exec();
        },
    },
};
</script>
<style lang="scss" scoped>
.use {
    position: relative;
    width: 750rpx;
    height: 288rpx;
    background: #ffffff;
    border-radius: 10rpx;
    margin-top: -10rpx;
    &-bgc {
        width: 601rpx;
        height: 52rpx;
        margin-left: 129rpx;
    }
    &-list {
        position: absolute;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    &-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 12rpx 12rpx 3rpx;
        &-icon {
            width: 83rpx;
            height: 26rpx;
        }
        &-image {
            width: 160rpx;
            height: 200rpx;
            border-radius: 10rpx;
            margin: 10rpx 0 5rpx;
        }
        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 33rpx;
        }
    }
}
</style>
