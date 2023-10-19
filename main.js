import App from './App'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
    // #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import { request, newrequest,xjlrequest,tokenxjlrequest } from '@/common/request.js'
import { request51car,request51help } from '@/common/request51.js'
Vue.prototype.$request = request
Vue.prototype.$newrequest = newrequest
Vue.prototype.$request51car = request51car
Vue.prototype.$request51help = request51help
Vue.prototype.$xjlrequest = xjlrequest
Vue.prototype.$tokenxjlrequest = tokenxjlrequest
import store from './store/index'
Vue.prototype.$store = store
const app = new Vue({
    store,
    ...App
})
app.$mount()
    // #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from './store'
Vue.prototype.$store = store
export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}
// #endif


//加载loading组件
import requestLoading from './components/loading/loading.vue';
Vue.component('request-loading', requestLoading);

function showLoading() {
    store.commit('request_show_loading');
}
function hideLoading() {
    store.commit('request_hide_loading');
}
Vue.prototype.$showLoading = showLoading;
Vue.prototype.$hideLoading = hideLoading;