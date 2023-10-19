import Request from '@/utils/luch/index.js'
// const BASE_URL2 = 'https://51che.51api.dcqcjlb.com/' //测试
const BASE_URL2 = 'https://car.51dsrz.com/' //正式
const request51car = new Request();
const request51help = new Request();
/* 设置全局配置 */
request51car.setConfig((config) => {
    config.baseURL = BASE_URL2
    return config
})
request51car.interceptors.request.use((config) => {
    config.header["Content-Type"] = "application/json;charset=UTF-8"
    config.header = {
            ...config.header
        }
        // 权限认证
    config.header.Authorization = uni.getStorageSync("token") ? "Bearer " + uni.getStorageSync("token") : ''
    config.header.lat = uni.getStorageSync("lat")
    config.header.lng = uni.getStorageSync("lng")
    config.header.city = uni.getStorageSync("city")
    return config
})
request51car.interceptors.response.use(async(res) => {
    /* 请求以后拦截器  不用登录*/
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => { // 请求错误
    return Promise.reject(error)
})


/* 设置全局配置 故障咨询*/
request51help.setConfig((config) => {
    // config.baseURL = 'https://dispatch.51api.dcqcjlb.com/' //测试
    config.baseURL = 'https://pd.51dsrz.com/' //正式
    return config
})
request51help.interceptors.request.use((config) => {
    config.header["Content-Type"] = "application/json;charset=UTF-8"
    config.header = {
            ...config.header
        }
        // 权限认证
    config.header.Authorization = uni.getStorageSync("token") ? "Bearer " + uni.getStorageSync("token") : ''
    config.header.lat = uni.getStorageSync("lat")
    config.header.lng = uni.getStorageSync("lng")
    config.header.city = uni.getStorageSync("city")
    return config
})
request51help.interceptors.response.use(async(res) => {
    /* 请求以后拦截器  不用登录*/
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => { // 请求错误
    return Promise.reject(error)
})
export {
    request51car,
    request51help
}