(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myIntegralOrder/detail"],{6635:function(t,n,e){},"7aa3":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return o}));var o={uSteps:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-steps/u-steps")]).then(e.bind(null,"71c4"))},uStepsItem:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-steps-item/u-steps-item")]).then(e.bind(null,"ceb1"))},uParse:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-parse/u-parse")]).then(e.bind(null,"5dcf"))}},i=function(){var t=this,n=t.$createElement,e=(t._self._c,t.isshowpage?t.__map(t.dataList.cardLists,(function(n,e){var o=t.__get_orig(n),i=t.geturl(n);return{$orig:o,m0:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:e}})},s=[]},9197:function(t,n,e){"use strict";(function(t,n){var o=e("4ea4");e("4319");o(e("66fd"));var i=o(e("9dad"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(i.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"9dad":function(t,n,e){"use strict";e.r(n);var o=e("7aa3"),i=e("d174");for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);e("efb6");var a=e("f0c5"),c=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=c.exports},b424:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={components:{},data:function(){return{isshowpage:!1,id:"",dataList:{}}},onLoad:function(n){var e=this;this.id=n.orderid,this.getList(n.orderid),t.$on("sendinfo",(function(t){e.changeaddress(t.info)}))},onShow:function(){},methods:{Onconfirm:function(){var n=this;this.$request.post("/coc-active/api/v2/score/shop/confirm/receipt",{orderId:this.id}).then((function(e){200==e.code&&(t.showToast({title:"确认收货成功",icon:"none"}),n.getList(n.id))}))},changeaddress:function(n){var e=this;this.$request.post("/coc-active/api/v2/score/shop/change/address",{orderId:this.id,userAddressId:n.id}).then((function(n){200==n.code&&(t.showToast({title:"修改收货地址成功",icon:"none"}),e.getList(e.id))}))},OnChangeAddress:function(){t.navigateTo({url:"/pages/my/address/index"})},OnCopy:function(n){t.setClipboardData({data:n,success:function(){t.showToast({title:"复制成功",icon:"none"})}})},clickthis:function(n){n.shorturl?t.setClipboardData({data:n.shorturl,success:function(){console.log("success",value),t.showToast({title:"复制成功",icon:"none"})}}):t.setClipboardData({data:n.link,success:function(){console.log("success",value),t.showToast({title:"复制成功",icon:"none"})}})},geturl:function(t){return!(!t.shorturl&&!t.link)},OnPushgoods:function(){t.navigateTo({url:"/pages/integralMall/goods/detail?id="+this.dataList.scoreProductId})},getList:function(t){var n=this;this.isshowpage||this.$showLoading(),this.$request.get("/coc-active/api/v2/score/shop/score/order/"+t).then((function(t){t.data.logisticsInfo=JSON.parse(t.data.logisticsInfo),n.dataList=t.data})).catch((function(t){})).finally((function(){n.isshowpage||(n.isshowpage=!0,n.$hideLoading())}))}}};n.default=e}).call(this,e("543d")["default"])},d174:function(t,n,e){"use strict";e.r(n);var o=e("b424"),i=e.n(o);for(var s in o)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(s);n["default"]=i.a},efb6:function(t,n,e){"use strict";var o=e("6635"),i=e.n(o);i.a}},[["9197","common/runtime","common/vendor"]]]);