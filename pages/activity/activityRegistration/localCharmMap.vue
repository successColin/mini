<template>
    <view class="page">
        <map
            id="map"
            ref="myMap"
            class="map"
            :latitude="latitude"
            :longitude="longitude"
            :markers="markers"
            @markertap="markertap"
            @callouttap="callouttap"
            @tap="tap"
            @regionchange="regionchange"
        >
            <cover-view slot="callout">
                <block v-for="(v, i) in markers" :key="i">
                    <cover-view class="callout" :marker-id="v.id">
                        <cover-image class="callout-image" :src="v.marker.url" />
                        <cover-view class="callout-title">{{ v.marker.name }}</cover-view>
                    </cover-view>
                </block>
            </cover-view>
        </map>
        <view class="search">
            <input class="search-input" placeholder="商家名称" />
            <image src="https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693442474478.png" class="search-image" />
        </view>
        <view
            :class="[
                status ? (start.status === undefined ? 'up-y' : start.status ? 'up-height' : 'down-height') : 'down-y',
            ]"
            @touchstart="touchstart"
            @touchend="touchend"
        >
            <view class="bottom" @click.stop>
                <view class="bottom-close" @click.stop="close">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705305476893.png"
                        class="bottom-close-image"
                    />
                </view>
                <view class="bottom-up" @click.stop="toLocalCharmDetails">
                    <image
                        src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705305610759.png"
                        class="bottom-up-image"
                    />
                </view>
                <view class="bottom-name">{{ details.name }}</view>
                <view class="bottom-address">{{ details.address }}</view>
                <view class="bottom-item">
                    <view class="bottom-item-image">
                        <image :src="details.url" class="bottom-item-image" />
                        <view class="bottom-item-mark">
                            <image
                                src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705305815344.png"
                                class="bottom-item-mark-image"
                            />
                            <view v-if="details.imageList" class="bottom-item-mark-title">
                                {{ details.imageList.length }}
                            </view>
                        </view>
                    </view>
                    <view v-if="details.content" class="bottom-item-title">
                        <u-parse :content="details.content" />
                    </view>
                    <view v-else class="bottom-item-shop">
                        <view>电话联系: {{ details.mobile }}</view>
                        <view>营业时间: {{ details.hours }}</view>
                        <view class="bottom-flex">
                            <view class="bottom-item-shop-title">用户评价:</view>
                            <view class="bottom-flex">
                                <image
                                    v-for="v in details.star"
                                    :key="v"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705306066634.png"
                                    class="bottom-item-shop-image"
                                />
                                <image
                                    v-for="v in 5 - details.star"
                                    :key="v"
                                    src="https://oss.dcqcjlb.com/51che_java_dev/20240115/file_1705306094727.png"
                                    class="bottom-item-shop-image"
                                />
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
import { getstorage } from "@/utils/index.js";
export default {
    data() {
        return {
            latitude: getstorage("lat") || 29.079195,
            longitude: getstorage("lng") || 119.647265,
            markers: [],
            status: false,
            details: {},
            start: { y: 0, status: undefined },
            mapContext: undefined,
            clusters: [],
        };
    },
    created() {},
    onReady() {
        this.init();
    },
    mounted() {},
    methods: {
        async init() {
            if (!this.mapContext) {
                this.mapContext = uni.createMapContext("map", this);
                this.initMarkerClusterSync(this.mapContext);
                this.mapContext.on("markerClusterCreate", ({ clusters }) => {
                    console.log("markerClusterCreate", clusters);
                    let markers = [];
                    clusters.forEach((cluster) => {
                        const {
                            center, // 聚合点的经纬度数组
                            clusterId, // 聚合簇id
                            markerIds, // 已经聚合了的标记点id数组
                        } = cluster;
                        const value = {
                            clusterId, //必须
                            ...center,
                            width: 25,
                            height: 29,
                            iconPath: "https://oss.dcqcjlb.com/51che_java_dev/20240124/file_1706066105556.png",
                        };
                        markers.push(value);
                    });
                    // 添加聚合簇
                    this.mapContext.addMarkers({
                        markers,
                        clear: false,
                        complete(res) {
                            console.log("addMarkers", res);
                        },
                    });
                });
            }
            const { latitude, longitude } = await this.getCenterLocationSync(this.mapContext);
            const { northeast, southwest } = await this.getRegionSync(this.mapContext);
            const radius = this.calculateDistance(northeast, { latitude, longitude }, southwest);
            const markers = await this.getMapList({
                cityCode: getstorage("citycode"),
                lat: latitude,
                lng: longitude,
                radius: Math.round(radius),
            });
            if (JSON.stringify(this.markers) !== JSON.stringify(markers)) {
                this.markers = markers;
                await this.addMarkersSync(this.mapContext, markers, true);
            }
        },
        initMarkerClusterSync(map) {
            return new Promise((resolve, reject) => {
                map.initMarkerCluster({
                    enableDefaultStyle: false,
                    gridSize: 80,
                    success: (res) => {
                        console.log(res, "res - initMarkerClusterSync");
                        resolve(res);
                    },
                    fail: (error) => {
                        console.log(error, "error - initMarkerClusterSync");
                        reject(error);
                    },
                });
            });
        },
        getCenterLocationSync(map) {
            return new Promise((resolve, reject) => {
                map.getCenterLocation({
                    success: (res) => {
                        console.log(res, "res - getCenterLocationSync");
                        resolve(res);
                    },
                    fail: (error) => {
                        console.log(error, "error - getCenterLocationSync");
                        reject(error);
                    },
                });
            });
        },
        getRegionSync(map) {
            return new Promise((resolve, reject) => {
                map.getRegion({
                    success: (res) => {
                        console.log(res, "res - getRegionSync");
                        resolve(res);
                    },
                    fail: (error) => {
                        console.log(error, "error - getRegionSync");
                        reject(error);
                    },
                });
            });
        },
        addMarkersSync(map, markers, clear) {
            return new Promise((resolve, reject) => {
                map.addMarkers({
                    markers,
                    clear,
                    success: (res) => {
                        console.log(res, "res - addMarkersSync");
                        resolve(res);
                    },
                    fail: (error) => {
                        console.log(error, "error - addMarkersSync");
                        reject(error);
                    },
                });
            });
        },
        calculateDistance(left, center, right) {
            const R = 6371; // 地球平均半径（单位为千米）

            const toRadians = (degrees) => degrees * (Math.PI / 180);

            const lLat = toRadians(left.latitude) - toRadians(center.latitude);
            const lLng = toRadians(left.longitude) - toRadians(center.longitude);
            const rLat = toRadians(right.latitude) - toRadians(center.latitude);
            const rLng = toRadians(right.longitude) - toRadians(center.longitude);
            console.log(lLat, lLng, rLat, rLng);

            const l =
                Math.sin(lLat / 2) * Math.sin(lLat / 2) +
                Math.cos(toRadians(left.latitude)) *
                    Math.cos(toRadians(center.latitude)) *
                    Math.sin(lLng / 2) *
                    Math.sin(lLng / 2);
            const r =
                Math.sin(rLat / 2) * Math.sin(rLat / 2) +
                Math.cos(toRadians(right.latitude)) *
                    Math.cos(toRadians(center.latitude)) *
                    Math.sin(rLng / 2) *
                    Math.sin(rLng / 2);
            console.log(l, r);
            const lNumber = R * 2 * Math.atan2(Math.sqrt(l), Math.sqrt(1 - l));
            const rNumber = R * 2 * Math.atan2(Math.sqrt(r), Math.sqrt(1 - r));
            console.log(lNumber, rNumber);

            return lNumber > rNumber ? lNumber * 1000 : rNumber * 1000;
        },
        async getMapList(params) {
            console.log(params);
            const {
                code,
                data: { localCharmList, localCharmShopList },
            } = await this.$request.post("/coc-active/api/v1/localCharm/getMapLocalCharmShopList", params);
            const list = [];
            const value = {
                width: 25,
                height: 29,
                customCallout: {
                    anchorY: 5,
                    anchorX: 0,
                    display: "ALWAYS",
                },
                joinCluster: true, // 指定了该参数才会参与聚合
            };
            if (code === 200) {
                (localCharmList || []).forEach((v) => {
                    const { id, lat, lng, title, coverImage } = v;
                    if (Number(lat) !== 0 && Number(lng) !== 0) {
                        Object.assign(value, {
                            id: list.length,
                            iconPath: "https://oss.dcqcjlb.com/51che_java_dev/20240111/file_1704959165691.png",
                            latitude: Number(lat),
                            longitude: Number(lng),
                            marker: { id, name: title, url: coverImage },
                        });
                        list.push(JSON.parse(JSON.stringify(value)));
                    }
                });
                (localCharmShopList || []).forEach((v) => {
                    const {
                        id,
                        lat,
                        lng,
                        shopName,
                        coverImage,
                        address,
                        indoorPhotograph,
                        openingHours,
                        baseMobile,
                        star,
                    } = v;
                    let imageList = [];
                    imageList.push(coverImage);
                    imageList = imageList.concat((indoorPhotograph || "").split(","));
                    if (Number(lat) !== 0 && Number(lng) !== 0) {
                        Object.assign(value, {
                            id: list.length,
                            iconPath: "https://oss.dcqcjlb.com/51che_java_dev/20240111/file_1704959085555.png",
                            latitude: Number(lat),
                            longitude: Number(lng),
                            marker: {
                                id,
                                name: shopName,
                                url: coverImage,
                                address,
                                imageList,
                                hours: openingHours,
                                mobile: baseMobile,
                                star,
                            },
                        });
                        list.push(JSON.parse(JSON.stringify(value)));
                    }
                });
            }
            return list;
        },
        async getLocalCharmDetail(localCharmId) {
            const {
                data: { title, address, coverImage, imgs, detail },
            } = await this.$request.post("/coc-active/api/v1/localCharm/getLocalCharmDetail", {
                localCharmId,
            });
            let imageList = [];
            imageList.push(coverImage);
            imageList = imageList.concat(imgs.split(","));
            this.details = {
                id: localCharmId,
                name: title,
                address,
                url: coverImage,
                imageList,
                content: detail,
            };
        },
        async markertap({ detail: { markerId } }) {
            console.log(markerId, "markertap");
            let value = {};
            this.markers.forEach((v) => {
                if (v.id === markerId) {
                    value = v.marker;
                }
            });
            console.log(value);
            if (value.mobile) {
                this.details = value;
            } else {
                await this.getLocalCharmDetail(value.id);
            }
            console.log(this.details);
            this.status = true;
        },
        async callouttap({ detail: { markerId } }) {
            let value = {};
            this.markers.forEach((v) => {
                if (v.id === markerId) {
                    value = v.marker;
                }
            });
            console.log(value);
            if (value.mobile) {
                this.details = value;
            } else {
                await this.getLocalCharmDetail(value.id);
            }
            console.log(this.details);
            this.status = true;
        },
        tap(e) {
            console.log(e, "???-tap");
            this.status = false;
            this.start.status = undefined;
        },
        regionchange({ type }) {
            console.log(type, "???-regionchange");
            if (type === "end") {
                this.init();
            }
        },
        toLocalCharmDetails() {
            this.start.status = true;
            if (this.details.mobile) {
                uni.navigateTo({
                    url: "/pages/activityMall/business/index?id=" + this.details.id + "&relatedType=1",
                });
            } else {
                uni.navigateTo({
                    url: "/pages/activity/activityRegistration/localCharmDetails?id=" + this.details.id,
                });
            }
            const timer = setTimeout(() => {
                this.start.status = false;
                clearTimeout(timer);
            }, 3000);
        },
        touchstart(e) {
            this.start.y = e.changedTouches[0].clientY;
        },
        touchend(e) {
            const number = this.start.y - e.changedTouches[0].clientY;
            if (number > 0) {
                this.toLocalCharmDetails();
            } else {
                this.start.status = undefined;
            }
        },
        close() {
            this.status = false;
            this.start.status = undefined;
        },
    },
};
</script>

<style lang="scss" scoped>
.page {
    position: relative;
    width: 100vw;
    height: 100vh;
}

.map {
    width: 100vw;
    height: 100vh;
}

.callout {
    width: 200rpx;
    height: 195rpx;
    background-image: url("https://oss.dcqcjlb.com/51che_java_dev/20240111/file_1704963302426.png");
    background-size: cover;

    &-image {
        width: 194rpx;
        height: 134rpx;
        border-radius: 10rpx;
        margin: 3rpx;
    }

    &-title {
        display: flex;
        align-items: center;
        height: 30rpx;
        font-size: 20rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        margin: 0 11rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
}

.search {
    position: absolute;
    top: 10rpx;
    left: 10rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 730rpx;
    height: 64rpx;
    background: #ffffff;
    border-radius: 32rpx;
    z-index: 0;

    &-input {
        width: 620rpx;
        font-size: 26rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        padding-left: 28rpx;
    }

    &-image {
        width: 30rpx;
        height: 31rpx;
        margin-right: 28rpx;
    }
}

.bottom {
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 750rpx;
    height: 100vh;
    background: #ffffff;
    border-radius: 20rpx 20rpx 0rpx 0rpx;
    z-index: 1000;

    &-flex {
        display: flex;
        align-items: center;
    }

    &-close {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;

        &-image {
            width: 16rpx;
            height: 16rpx;
        }
    }

    &-up {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 104rpx;
        height: 56rpx;

        &-image {
            width: 64rpx;
            height: 16rpx;
        }
    }

    &-name {
        width: 710rpx;
        font-size: 28rpx;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 36rpx;
    }

    &-address {
        width: 710rpx;
        font-size: 24rpx;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 36rpx;
        margin-top: 10rpx;
    }

    &-item {
        display: flex;
        width: 710rpx;
        margin-top: 16rpx;
        margin-bottom: 36rpx;

        &-image {
            position: relative;
            width: 230rpx;
            height: 180rpx;
            background: red;
            border-radius: 10rpx;
        }

        &-mark {
            position: absolute;
            display: flex;
            align-items: center;
            bottom: 5rpx;
            right: 9rpx;
            height: 29rpx;
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10rpx;

            &-image {
                width: 16rpx;
                height: 16rpx;
                margin: 0 8rpx;
            }

            &-title {
                font-size: 20rpx;
                font-family: PingFang SC;
                font-weight: 500;
                color: #ffffff;
                margin-right: 10rpx;
            }
        }

        &-title {
            width: 460rpx;
            height: 180rpx;
            // font-size: 20rpx;
            // font-family: PingFang SC;
            // font-weight: 500;
            // color: #222222;
            // line-height: 30rpx;
            margin-left: 20rpx;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // display: -webkit-box;
            // -webkit-line-clamp: 6;
            // -webkit-box-orient: vertical;
        }

        &-shop {
            width: 460rpx;
            height: 180rpx;
            font-size: 24rpx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 40rpx;
            margin-left: 20rpx;

            &-title {
                margin-right: 10rpx;
            }

            &-image {
                display: block;
                width: 21rpx;
                height: 22rpx;
                margin: 0 4rpx;
            }
        }
    }
}

.up-y {
    animation: slideUp 1s ease forwards;
    /* 添加动画效果 */
}

.down-y {
    animation: slideDown 1s ease forwards;
    /* 添加动画效果 */
}

.up-height {
    animation: slideMaxHeight 1s ease forwards;
    /* 添加动画效果 */
}

.down-height {
    animation: slideMinHeight 1s ease forwards;
    /* 添加动画效果 */
}

@keyframes slideUp {
    0% {
        transform: translateY(100vh);
    }

    100% {
        transform: translateY(calc(100vh - 370rpx - constant(safe-area-inset-bottom)));
        transform: translateY(calc(100vh - 370rpx - env(safe-area-inset-bottom)));
    }
}

@keyframes slideDown {
    0% {
        transform: translateY(calc(100vh - 370rpx - constant(safe-area-inset-bottom)));
        transform: translateY(calc(100vh - 370rpx - env(safe-area-inset-bottom)));
    }

    100% {
        transform: translateY(100vh);
    }
}

@keyframes slideMaxHeight {
    0% {
        transform: translateY(calc(100vh - 370rpx - constant(safe-area-inset-bottom)));
        transform: translateY(calc(100vh - 370rpx - env(safe-area-inset-bottom)));
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes slideMinHeight {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(calc(100vh - 370rpx - constant(safe-area-inset-bottom)));
        transform: translateY(calc(100vh - 370rpx - env(safe-area-inset-bottom)));
    }
}
</style>
