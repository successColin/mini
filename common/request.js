import Request from '@/utils/luch/index.js'
import md5 from 'js-md5'
const BASE_URL = 'http://coc.51api.dcqcjlb.com' // 
const request = new Request();
const newrequest = new Request(); //不用登录调用接口
const xjlrequest = new Request(); //小精灵接口不用登录
const tokenxjlrequest = new Request(); //小精灵接口需要登录
/* 设置全局配置 */
request.setConfig((config) => {
        config.baseURL = BASE_URL
        return config
    })
    /* 设置全局配置  不用登录*/
newrequest.setConfig((config) => {
        config.baseURL = BASE_URL
        return config
    })
    /* 设置全局配置  小精灵接口不用登录*/
xjlrequest.setConfig((config) => {
        // config.baseURL = 'http://xjl.51api.dcqcjlb.com' //测试
        config.baseURL = 'https://newapi.51xuej.com' //正式
        return config
    })
    /* 设置全局配置  小精灵接口需要登录*/
tokenxjlrequest.setConfig((config) => {
        // config.baseURL = 'http://xjl.51api.dcqcjlb.com' //测试
        config.baseURL = 'https://newapi.51xuej.com' //正式
        return config
    })
    /* 请求以前拦截器 */
request.interceptors.request.use((config) => {
        let timestamp = new Date().getTime()
        config.header["timestamp"] = timestamp;

        if (config.data) {

            var obj = config.data; //要排序的对象
            obj.timestamp = timestamp

            function objKeySort(obj) { //排序的函数
                var newkey = Object.keys(obj).sort();
                //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组+
                var tmpString = "";
                var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
                for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
                    // tmpString += newkey[i]+"=" +obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
                    tmpString += newkey[i]
                }
                return tmpString; //返回排好序的新对象
            }
            config.header['signature'] = md5(objKeySort(obj))
        } else {
            config.data = {}
            config.header['signature'] = md5("timestamp")
        }
        config.header["Content-Type"] = "application/json;charset=UTF-8"
        config.header = {
                ...config.header
            }
            // 权限认证
        config.header.Authorization = "Bearer " + uni.getStorageSync("token")
        config.header.lat = uni.getStorageSync("lat")
        config.header.lng = uni.getStorageSync("lng")
        config.header.city = uni.getStorageSync("city")
        return config
    })
    /* 请求以前拦截器  不用登录*/
newrequest.interceptors.request.use((config) => {
        let timestamp = new Date().getTime()
        config.header["timestamp"] = timestamp;
        if (config.data) {
            let obj = Object.assign({}, obj, config.data, {
                'timestamp': timestamp
            })

            function objKeySort(obj) { //排序的函数
                var newkey = Object.keys(obj).sort();
                var tmpString = "";
                //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
                var newObj = {}; //创建一个新的对象，用于存放排好序的键值对

                for (var i = 0; i < newkey.length; i++) { //遍历newkey数组
                    // tmpString += newkey[i]+"=" +obj[newkey[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
                    tmpString += newkey[i] //向新创建的对象中按照排好的顺序依次增加键值对

                }
                return tmpString; //返回排好序的新对象
            }

            config.header['signature'] = md5(objKeySort(obj))
        } else {
            config.data = {}
            config.header['signature'] = md5("timestamp")
        }
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
    /* 请求以前拦截器  小精灵的不用登录*/
xjlrequest.interceptors.request.use((config) => {
        config.header["Content-Type"] = "application/json;charset=UTF-8"
        config.header = {
                ...config.header
            }
            // 权限认证
        config.header.lat = uni.getStorageSync("lat")
        config.header.lng = uni.getStorageSync("lng")
        return config
    })
    /* 请求以前拦截器  小精灵的需要登录*/
tokenxjlrequest.interceptors.request.use((config) => {
    if (!uni.getStorageSync("xjltoken")) {
        if (!uni.getStorageSync("token")) {
            uni.navigateTo({
                url: "/pages/activity/share/index"
            })
            return false
        } else {
            xjlrequest.post('/user/login/get_center_tmp_token', {
                mobile: uni.getStorageSync("mobile")
            }).then(res => {
                xjlrequest.post('/user/login/getXjlTokenByTmpToken', {
                    tmp_token: res.data.access_token
                }).then(s => {
                    uni.setStorageSync('xjltoken', s.data.token)
                    uni.setStorageSync('xjluserid', s.data.id)
                })
            })

        }

    }
    config.header["Content-Type"] = "application/json;charset=UTF-8"
    config.header = {
            ...config.header
        }
        // 权限认证
    config.header.lat = uni.getStorageSync("lat")
    config.header.lng = uni.getStorageSync("lng")
    return config
})
request.interceptors.response.use(async(res) => {
    /* 请求以后拦截器 */
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    if (res.data.code == 230) {
        uni.removeStorageSync('token');
        uni.showToast({
            title: '您的登录状态已过期，请重新登录',
            icon: 'none',
            duration: 3000,
            success() {
                setTimeout(() => {
                    // 跳转到登录页
                    uni.navigateTo({
                        url: "/pages/activity/share/index"
                    })
                }, 1000)
            }
        })

        return false
    }
    return res.data
}, (error) => { // 请求错误
    if (error.statusCode == 230) {
        // 登录态失效则清除token：没有携带token、token没法再刷新
        let msg = error.errMsg || error.data
        if (msg == null || msg == undefined) msg = '当前登录状态过期，请重新登录'
            // uni.clearStorageSync()
        uni.removeStorageSync('token');
        uni.showToast({
            title: msg,
            icon: 'none',
            success() {
                setTimeout(() => {
                    // 跳转到登录页
                    uni.navigateTo({
                        url: "/pages/home/index"
                    })
                }, 1000)
            }
        })
    } else {
        // 	let msg = error.errMsg || error.data||error.data.message
        // uni.showToast({
        // 	title: error,
        // 	icon: 'none',
        // 	duration: 2000
        // })
    }
    return Promise.reject(error)
})
newrequest.interceptors.response.use(async(res) => {
    /* 请求以后拦截器  不用登录*/
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => { // 请求错误
    if (error.statusCode == 230) {
        // 登录态失效则清除token：没有携带token、token没法再刷新
        let msg = error.errMsg || error.data
        if (msg == null || msg == undefined) msg = '当前登录状态过期，请重新登录'
            // uni.clearStorageSync()
        uni.removeStorageSync('token');
        uni.showToast({
            title: msg,
            icon: 'none',
            success() {
                setTimeout(() => {
                    // 跳转到登录页
                    uni.navigateTo({
                        url: "/pages/home/index"
                    })
                }, 1000)
            }
        })
    } else {
        // let msg = error.errMsg || error.data||error.data.message
        // uni.showToast({
        // 	title: msg,
        // 	icon: 'none',
        // 	duration: 2000
        // })
    }
    return Promise.reject(error)
})
xjlrequest.interceptors.response.use(async(res) => {
    /* 请求以后拦截器  小精灵的不用登录*/
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => { // 请求错误
    if (error.statusCode == 230) {
        // 登录态失效则清除token：没有携带token、token没法再刷新
        let msg = error.errMsg || error.data
        if (msg == null || msg == undefined) msg = '当前登录状态过期，请重新登录'

        uni.showToast({
            title: msg,
            icon: 'none',
            success() {

            }
        })
    } else {
        let msg = error.errMsg || error.data
        uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
        })
    }
    return Promise.reject(error)
})
tokenxjlrequest.interceptors.response.use(async(res) => {
    /* 请求以后拦截器  小精灵的需要登录*/
    if (res.statusCode != 200) {
        return Promise.reject(res)
    }
    return res.data
}, (error) => { // 请求错误
    if (error.statusCode == 230) {
        // 登录态失效则清除token：没有携带token、token没法再刷新
        let msg = error.errMsg || error.data
        if (msg == null || msg == undefined) msg = '当前登录状态过期，请重新登录'

        uni.showToast({
            title: msg,
            icon: 'none',
            success() {

            }
        })
    } else {
        let msg = error.errMsg || error.data
        uni.showToast({
            title: msg,
            icon: 'none',
            duration: 2000
        })
    }
    return Promise.reject(error)
})
export {
    request,
    newrequest,
    xjlrequest,
    tokenxjlrequest
}