
/**
 * 获取当前的地理位置、速度
 * @param {*} object 
 * @returns 
 */
export const getLocationSync = (object = {}) => {
    return new Promise((resolve, reject) => {
        uni.getLocation(
            Object.assign(object, {
                success: (res) => {
                    console.log(res, 'success - getLocationSync')
                    resolve(res);
                },
                fail: (error) => {
                    console.log(error, 'fail - getLocationSync')
                    reject(error);
                },
            })
        );
    });
}

import QQMapWX from "@/utils/qqmap/qqmap-wx-jssdk.min.js";
/**
 * 根据经纬度转换为地址信息
 * @param {*} longitude 
 * @param {*} latitude 
 * @returns 
 */
export const reverseGeocoderSync = (latitude, longitude) => {
    return new Promise((resolve, reject) => {
        const qqmapwx = new QQMapWX({
            key: "BH7BZ-PEPCX-SNA47-TZBJA-SKIFV-GVFSW",
        });
        qqmapwx.reverseGeocoder({
            location: { latitude, longitude },
            success: (res) => {
                console.log(res, 'success - reverseGeocoderSync')
                resolve(res);
            },
            fail: (error) => {
                console.log(error, 'fail - reverseGeocoderSync')
                reject(error);
            },
        });
    });
}

export const getCityListSync = () => {
    return new Promise((resolve, reject) => {
        const qqmapwx = new QQMapWX({
            key: "BH7BZ-PEPCX-SNA47-TZBJA-SKIFV-GVFSW",
        });
        qqmapwx.getCityList({
            success: (res) => {
                console.log(res, 'success - getCityListSync')
                resolve(res);
            },
            fail: (error) => {
                console.log(res, 'fail - getCityListSync')
                reject(error);
            },
        });
    });
}