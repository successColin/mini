<template>
    <view class="">
        <view class="custom-section-p color-gray font-24">当前定位城市</view>
        <view class="custom-section-p bgfff">
            {{ cityName }}
        </view>
        <view class="custom-section-p bgfff u-m-t-20">
            <view>已入驻地区</view>
            <view class="province" v-for="item in provinceList" :key="item.province_id"
                @click="getCityList(item.province_id)">
                {{ item.name }}
            </view>
        </view>
        <view class="custom-section-p txtDarkGray size24">城市</view>
        <view class="custom-section-p city bgfff" v-for="item in cityList" :key="item.city_id" @click="confirm(item)">
            {{ item.name }}
        </view>
    </view>
</template>
<script>
import { getstorage, setstorage, tologin } from '@/utils/index.js'
export default {
    name: "SelectCity",
    data() {
        return {
            provinceList: [],
            cityList: [],
            cityName: ''
        };
    },

    methods: {
        async getCityList(id) {
            const { data } = await this.$request51car.get("/app/home/api?api_name=getCity&province_id=" + id);
            this.cityList = data;
        },
        confirm(item) {
            const eventChannel = this.getOpenerEventChannel();
            uni.$emit('getcity', item)
            uni.navigateBack({
                delta: 1
            })
        },
    },
    async onLoad() {
        if (getstorage("cityname")) {
            this.cityName = getstorage("cityname")
        }
        const { data } = await this.$request51car.get("/user/home/api?api_name=get_enter_lists");
        const { province_list, city_list } = data;
        this.provinceList = province_list;
        this.cityList = city_list;
    },
};
</script>
<style lang="scss" scoped>
.province {
    display: inline-block;
    width: 160rpx;
    line-height: 60rpx;
    text-align: center;
    margin: 20rpx calc((100% - 640rpx) / 8);
    background-color: #f8f8f8;
    border-radius: 12rpx;
}

.city {
    &:not(:last-of-type) {
        border-bottom: 1px solid #eee;
    }
}

.custom-section-p {
    padding: 20rpx 25rpx;
}
</style>
