(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/upkeep/submmitOrder"],{"135d2":function(t,a,e){"use strict";(function(t,a){var n=e("4ea4");e("4319");n(e("66fd"));var o=n(e("15b3"));t.__webpack_require_UNI_MP_PLUGIN__=e,a(o.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"15b3":function(t,a,e){"use strict";e.r(a);var n=e("8e14"),o=e("163e");for(var i in o)["default"].indexOf(i)<0&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("2c47");var r=e("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,"70e5f838",null,!1,n["a"],void 0);a["default"]=s.exports},"163e":function(t,a,e){"use strict";e.r(a);var n=e("2475"),o=e.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a},2475:function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=e("7dcd"),o={components:{},data:function(){return{forwardUserId:"",showpay:!0,orderData:{},userId:"",totalprice:0,choosecoupon:{},id:"",customerManagerId:"",payData:{uMobile:"",userId:"",couponId:"",maintainMealId:"",couponMoney:0,maintainNum:1,payType:"2"},minMoney:!1}},onLoad:function(a){var e=this;a.customerManagerId&&(this.customerManagerId=a.customerManagerId),this.payData.maintainMealId=a.id,this.forwardUserId=a.forwardUserId,this.payData.uMobile=(0,n.getstorage)("mobile"),this.payData.userId=(0,n.getstorage)("userId"),this.getOrder(a.id),t.$on("choosecoupon",(function(t){e.payData.couponId=t.data,t.data?(e.totalprice=e.payData.maintainNum*e.orderData.price,e.orderData.couponUserNews.filter((function(a){a.couponUserNewId==t.data&&(e.choosecoupon=a,e.payData.couponMoney=a.discountMoney,e.totalprice=(e.totalprice-e.payData.couponMoney).toFixed(2))})),e.totalprice<=0?(e.minMoney=!0,e.totalprice=.01):e.minMoney=!1):(e.choosecoupon={},e.totalprice=e.payData.maintainNum*e.orderData.price,e.payData.couponMoney=0)}))},methods:{changeTel:function(t){this.payData.uMobile=t.detail.value.trim()},addNum:function(){this.payData.maintainNum++,this.choosecoupon.discountMoney?this.totalprice=this.payData.maintainNum*this.orderData.price-this.choosecoupon.discountMoney:this.totalprice=this.payData.maintainNum*this.orderData.price,this.totalprice<=0?(this.minMoney=!0,this.totalprice=.01):this.minMoney=!1},minNum:function(){this.payData.maintainNum>1?this.payData.maintainNum--:this.payData.maintainNum=1,this.choosecoupon.discountMoney?this.totalprice=this.payData.maintainNum*this.orderData.price-this.choosecoupon.discountMoney:this.totalprice=this.payData.maintainNum*this.orderData.price,this.totalprice<=0?(this.minMoney=!0,this.totalprice=.01):this.minMoney=!1},checkQuan:function(){var a=this;t.navigateTo({url:"/pages/carShops/upkeep/checkCouponlist",success:function(t){t.eventChannel.emit("couponList",{data:{couponList:a.orderData.couponUserNews,couponId:a.payData.couponId}})}})},getOrder:function(t){var a=this;this.$newrequest.post("/coc-active/api/v2/maintain_meal/buyNow",{maintainMealId:t}).then((function(t){a.orderData=t.data,a.totalprice=t.data.price}))},OnPay:function(){var a=this;return/^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(this.payData.uMobile)?0!=this.showpay&&(this.showpay=!1,a.payData.subOpenId=t.getStorageSync("openid"),a.customerManagerId&&(a.payData.customerManagerId=a.customerManagerId),this.payData.forwardUserId=this.forwardUserId,void this.$request.post("/coc-active/api/v2/maintain_meal/payment",a.payData).then((function(t){200==t.code?(a.showloading=!1,a.wxpay(t.data.payment.miniPayRequest,t.data.orderId)):a.$refs.uToast.show({message:t.message})}))):(t.showToast({icon:"none",title:"请输入正确的手机号"}),!1)},wxpay:function(a,e){t.requestPayment({provider:"wxpay",timeStamp:a.timeStamp,nonceStr:a.nonceStr,package:a.package,signType:a.signType,paySign:a.paySign,appid:a.appId,success:function(a){t.showToast({icon:"success",title:"支付成功",duration:"2000"}),t.reLaunch({url:"/pages/carShops/upkeep/orderStatus?id="+e})},fail:function(a){t.showToast({icon:"none",title:"支付失败"}),t.reLaunch({url:"/pages/my/myUpkeepOrder/detail?id="+e})}})}}};a.default=o}).call(this,e("543d")["default"])},"2c47":function(t,a,e){"use strict";var n=e("303a"),o=e.n(n);o.a},"303a":function(t,a,e){},"8e14":function(t,a,e){"use strict";e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}));var n={uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"f23e"))},uToast:function(){return e.e("uni_modules/uview-ui/components/u-toast/u-toast").then(e.bind(null,"4bf8"))}},o=function(){var t=this.$createElement,a=(this._self._c,this.orderData.couponUserNews.length);this.$mp.data=Object.assign({},{$root:{g0:a}})},i=[]}},[["135d2","common/runtime","common/vendor"]]]);