<template>
    <view class="warp">
        <view class="search">
            <input v-model="name" placeholder="搜索城市/区县" class="search-input" @blur="getSearch" />
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230819/file_1692425521949.png" class="search-image" />
        </view>
        <view class="location">
            <view class="location-title">当前: {{ cityname }}</view>
            <view class="location-btn" @click="getAddress(true)">
                <image
                    src="https://oss.dcqcjlb.com/51che_java_dev/20231127/file_1701074504722.png"
                    class="location-btn-image"
                />
                <view class="location-btn-title">重新定位</view>
            </view>
        </view>
        <view v-if="status">
            <view v-for="(v, i) in cityList" :key="i">
                <view class="list-cell" v-for="(val, index) in v.value" :key="index" @click="bindClick(val)">
                    <text>{{ val.value }}</text>
                </view>
            </view>
        </view>
        <u-index-list v-else :scrollTop="scrollTop" :index-list="indexList" :sticky="false">
            <view v-for="(v, i) in cityList" :key="i">
                <u-index-item>
                    <u-index-anchor :text="indexList[i]" use-slot />
                    <view class="list-cell" v-for="(val, index) in v.value" :key="index" @click="bindClick(val)">
                        <text>{{ val.value }}</text>
                    </view>
                </u-index-item>
            </view>
        </u-index-list>
    </view>
</template>

<script>
import { setstorage, getstorage } from "@/utils/index.js";
import { getLocationSync, reverseGeocoderSync, getCityListSync } from "@/utils/location";
export default {
    data() {
        return {
            scrollTop: 0,
            indexList: [
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
                "G",
                "H",
                "I",
                "J",
                "K",
                "L",
                "M",
                "N",
                "O",
                "P",
                "Q",
                "R",
                "S",
                "T",
                "U",
                "V",
                "W",
                "X",
                "Y",
                "Z",
            ],
            name: "",
            cityname: "",
            cityList: [],
            initCityList: [
                {
                    value: [],
                    label: "A",
                },
                {
                    value: [],
                    label: "B",
                },
                {
                    value: [],
                    label: "C",
                },
                {
                    value: [],
                    label: "D",
                },
                {
                    value: [],
                    label: "E",
                },
                {
                    value: [],
                    label: "F",
                },
                {
                    value: [],
                    label: "G",
                },
                {
                    value: [],
                    label: "H",
                },
                {
                    value: [],
                    label: "I",
                },
                {
                    value: [],
                    label: "J",
                },
                {
                    value: [],
                    label: "K",
                },
                {
                    value: [],
                    label: "L",
                },
                {
                    value: [],
                    label: "M",
                },
                {
                    value: [],
                    label: "N",
                },
                {
                    value: [],
                    label: "O",
                },
                {
                    value: [],
                    label: "P",
                },
                {
                    value: [],
                    label: "Q",
                },
                {
                    value: [],
                    label: "R",
                },
                {
                    value: [],
                    label: "S",
                },
                {
                    value: [],
                    label: "T",
                },
                {
                    value: [],
                    label: "U",
                },
                {
                    value: [],
                    label: "V",
                },
                {
                    value: [],
                    label: "W",
                },
                {
                    value: [],
                    label: "X",
                },
                {
                    value: [],
                    label: "Y",
                },
                {
                    value: [],
                    label: "Z",
                },
            ],
            backCityList: [],
            status: false,
        };
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    onLoad() {
        this.getList();
        this.getAddress();
    },
    methods: {
        async getList() {
            // const { code, data, message } = await this.$request.post("/coc-system/api/v1/system/area/allCityList", {
            //     name: this.name,
            // });
            // if (code == 200) {
            //     console.log(data);

            // } else {
            //     uni.$u.toast(message);
            // }
            try {
                const { status, result } = await getCityListSync();
                if (!status) {
                    let data = result[1];
                    const list = JSON.parse(JSON.stringify(this.initCityList));
                    data.forEach((v) => {
                        for (let i = 0; i < list.length; i++) {
                            let val = list[i];
                            if (v.pinyin[0].substr(0, 1).toUpperCase().indexOf(val.label) > -1) {
                                val.value.push({ value: v.name, label: val.label, location: v.location, code: v.id });
                                break;
                            }
                        }
                    });
                    this.cityList = list;
                    this.backCityList = data;
                }
            } catch (error) {
                uni.$u.toast(error);
                this.cityList = JSON.parse(JSON.stringify(this.initCityList));
            }
        },
        getSearch() {
            if (this.name.length > 0) {
                this.status = true;
            } else {
                this.status = false;
            }
            const list = JSON.parse(JSON.stringify(this.initCityList));
            this.backCityList.forEach((v) => {
                for (let i = 0; i < list.length; i++) {
                    let val = list[i];
                    if (
                        v.pinyin[0].substr(0, 1).toUpperCase().indexOf(val.label) > -1 &&
                        (v.name.indexOf(this.name) > -1 || this.name === "")
                    ) {
                        val.value.push({ value: v.name, label: val.label, location: v.location, code: v.id });
                        break;
                    }
                }
            });
            console.log(list);
            this.cityList = list;
        },
        async getAddress(state) {
            let cityname = getstorage("cityname");
            let citycode = getstorage("citycode");
            if (cityname && citycode && !state) {
                this.cityname = cityname;
                return;
            }
            try {
                const { latitude, longitude } = await getLocationSync();
                // #ifdef MP-WEIXIN
                const {
                    status,
                    result: {
                        ad_info: { nation_code, city_code, city },
                        location: { lat, lng },
                    },
                } = await reverseGeocoderSync(latitude, longitude);
                if (!status) {
                    setstorage("lat", lat);
                    setstorage("lng", lng);
                    setstorage("city", encodeURI(city));
                    this.cityname = city.substr(0, city.length - 1);
                    setstorage("cityname", this.cityname);
                    setstorage("citycode", city_code.replace(nation_code, ""));
                }
                // #endif
                // #ifdef APP-PLUS
                const { address } = await this.reverseGeocode(longitude, latitude);
                var reg = /.+?(省|市|自治区|自治州|县|区)/g;
                let cityname = address.match(reg)[1];
                setstorage("lat", latitude);
                setstorage("lng", longitude);
                setstorage("city", encodeURI(cityname));
                this.cityname = cityname.substr(0, cityname.length - 1);
                setstorage("cityname", this.cityname);
                // #endif

                // uni.$emit("homeChangeCity", {
                //     name: this.cityname,
                //     location: { lat, lng },
                //     code: city_code.replace(nation_code, ""),
                // });
            } catch (error) {
                setstorage("lat", "29.092977");
                setstorage("lng", "119.663935");
            }
        },
        reverseGeocode(longitude, latitude) {
            return new Promise((resolve, reject) => {
                const point = new plus.maps.Point(longitude, latitude);
                plus.maps.Map.reverseGeocode(
                    point,
                    {},
                    function (event) {
                        resolve(event);
                    },
                    function (error) {
                        reject(error);
                    }
                );
            });
        },
        bindClick(v) {
            uni.$emit("homeChangeCity", { name: v.value, location: v.location, code: v.code });
            uni.navigateBack({
                delta: 1,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 730rpx;
    height: 64rpx;
    background: #ffffff;
    border-radius: 32rpx;
    margin: 10rpx;

    &-input {
        width: 650rpx;
        height: 25rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        margin-left: 20rpx;
    }

    &-image {
        width: 48rpx;
        height: 48rpx;
        margin-right: 16rpx;
    }
}

.location {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 750rpx;
    height: 82rpx;
    background: #ffffff;
    margin-bottom: 10rpx;

    &-title {
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-left: 20rpx;
    }

    &-btn {
        display: flex;
        align-items: center;
        margin-right: 20rpx;

        &-image {
            width: 26rpx;
            height: 26rpx;
            margin-right: 10rpx;
        }

        &-title {
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
        }
    }
}

.indexAnchor {
    padding-left: 10rpx;
    border-left: 2px solid red;
    font-size: 14px;
    line-height: 1.2;
}

.list-cell {
    display: flex;
    box-sizing: border-box;
    width: 100%;
    padding: 10px 24rpx;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    align-items: center;

    > text {
        margin-left: 10rpx;
    }

    > image {
        height: 30rpx;
        width: 30rpx;
    }
}

.recommend {
    display: flex;
    flex-wrap: wrap;
    // background-color: #f5f5f5;
    padding-bottom: 20rpx;

    > .car {
        margin: 20rpx 0 0 20rpx;
        display: flex;
        align-items: center;
        font-size: 28rpx;
        color: #222222;
        padding: 0 22rpx;
        line-height: 72rpx;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 10rpx;
        border: 1px solid #eee;

        > image {
            height: 30rpx;
            width: 30rpx;
        }

        > text {
            margin-left: 10rpx;
        }
    }
}

.indexedList {
    position: relative;
    height: calc(100vh - 100rpx);
}
</style>
