<template>
    <view class="page">
        <view class="navigation">
            <view :style="{ height: navbarHeight + 'px' }" class="navigation__title">
                <u-navbar v-if="isShow" :bgColor="styles.bgColor" title="51车·人车生活俱乐部">
                    <view class="navigation-navbar-left" slot="left" @click="toCity">
                        <u-icon :bold="true" name="map" :color="styles.color" size="14"></u-icon>
                        <view class="navigation-navbar-left-title" :style="{ color: styles.color }"
                            >{{ obj.cityname }}
                        </view>
                    </view>
                    <view class="navigation-navbar-center" :style="{ color: styles.color }" slot="center">
                        <view class="navigation-search">
                            <view class="navigation-search-frame" @click="toSearch">
                                <view class="navigation-search-frame-title">51车·人车生活俱乐部</view>
                                <image
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693442474478.png"
                                    class="navigation-search-frame-image"
                                />
                            </view>
                            <!-- open-type="contact" session-from="" type="default" -->
                            <button class="kefu-contact" @click="handleJumpClick">
                                <image
                                    v-if="styles.color === '#FFFFFF'"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693447185918.png"
                                    class="navigation-search-customer"
                                />
                                <image v-else src="@/static/image/kefu.svg" class="navigation-search-customer" />
                            </button>
                        
                        </view>
                    </view>
                </u-navbar>
            </view>
        </view>
    </view>
</template>

<script>

import { getstorage, setstorage } from "@/utils/index.js";
import carousel from "@/components/carousel/index.vue";
import { getLocationSync, reverseGeocoderSync } from "@/utils/location";
export default {
    components: {
        carousel,
    },
    data() {
        return {
            obj: {
                index: 0,
                background: "",
                cityname: "无法获取",
                customer: true,
            },
            styles: {
                bgColor: "transparent",
                color: "#FFFFFF",
            },
			isShow: true
        };
    },
    props: {},
    computed: {
        navbarHeight() {
            const height = uni.getStorageSync("menuInfo") ? uni.getStorageSync("menuInfo").contentTop : 0;
            return height; // `height: ${height}px`
        },
    },
    created() {
        // this.getBackground();
        uni.$on("consentAuthority", () => {
            this.getAddress();
        });
        uni.$on("changebannercurrent", (res) => {
            this.obj.background = res.url || "";
            this.obj.index = 2;
            if (!res.url) {
                // this.styles.color = "#222222";
                // this.obj.customer = false;
            } else if (this.styles.bgColor === "transparent") {
                this.styles.color = "#FFFFFF";
                this.obj.customer = true;
            }
        });
        uni.$on("homeChangeCity", (res) => {
            setstorage("lat", res.location.lat);
            setstorage("lng", res.location.lng);
            setstorage("city", encodeURI(res.name));
            setstorage("cityname", res.name);
            setstorage("citycode", res.code);
            this.obj.cityname = res.name;
            console.log(res);
            uni.$emit("updatedata");
        });
        uni.$on("setNavigation", (res) => {
            if (res.scrollTop > 0) {
                this.styles.bgColor = "#FFFFFF";
                this.styles.color = "#222222";
            } else if (res.scrollTop === 0) {
                this.styles.bgColor = "transparent";
                if (!this.obj.background) {
                    this.styles.color = "#222222";
                    this.obj.customer = false;
                } else {
                    this.styles.color = "#FFFFFF";
                    this.obj.customer = true;
                }
            }
        });
		uni.$on("showNavigation", () => {
			this.isShow = false
			setTimeout(()=>{
				this.isShow = true
			},10)
		})
    },
    destroyed() {
        uni.$off("changebannercurrent");
        uni.$off("homeChangeCity");
        uni.$off("setNavigation");
        uni.$off("consentAuthority");
		uni.$off("showNavigation");
    },
    methods: {
        handleJumpClick() {
            uni.navigateTo({
                url: "/pages/service/customerService/index",
            });
        },
        toCity() {
            uni.navigateTo({
                url: "/pages/activity/chooseCity/chooseCity",
            });
        },
        toSearch() {
            uni.navigateTo({
                url: "/pages/home/search",
            });
        },
        async getBackground() {
            const { data } = await this.$newrequest.post("/coc-system/api/v1/system/dictionaries/banner/list", {
                adPosition: "applets_wonderful_first",
            });
            this.obj.background = data[0].backgroundUrl;
        },
        async getAddress() {
            let cityname = getstorage("cityname");
            let citycode = getstorage("citycode");
            if (cityname && citycode) {
                this.obj.cityname = cityname;
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
                    this.obj.cityname = city.substr(0, city.length - 1);
                    setstorage("cityname", this.obj.cityname);
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
                this.obj.cityname = cityname.substr(0, cityname.length - 1);
                setstorage("cityname", this.obj.cityname);
                // #endif
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
    },
};
</script>

<style lang="scss" scoped>
.page {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 750rpx;
}

.navigation {
    height: 100%;
    width: 100%;

    &__title {
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    &__search {
        position: absolute;
        width: 100%;
        z-index: 998;
    }

    &-navbar {
        &-left {
            display: flex;
            align-items: center;
            justify-content: center;

            &-title {
                font-size: 28rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                margin-left: 6rpx;
            }
        }

        &-center {
            font-size: 28rpx;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            line-height: 36rpx;
        }
    }

    &-search {
        display: flex;
        align-items: center;
        width: 750rpx;

        &-frame {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 387rpx;
            height: 64rpx;
            background: #f8f8f8;
            border-radius: 32rpx;
            margin-left: 110rpx;

            &-title {
                font-size: 26rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #999999;
                margin-left: 26rpx;
            }

            &-image {
                width: 30rpx;
                height: 31rpx;
                margin-right: 28rpx;
            }
        }

        &-customer {
            width: 37rpx;
            height: 37rpx;
        }
    }
}

.kefu-contact {
    background: none;
    border: 0;
    margin: 0;
    padding: 0;
    outline: none;
    width: 37rpx;
    height: 37rpx;
    display: inline-flex;
    margin-left: 12rpx;
}

button::after {
    border: initial;
}
</style>
