(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/order/list"],{"13dd":function(t,e,n){"use strict";n.r(e);var o=n("d596"),a=n("b2db7");for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);n("9a5e");var s=n("f0c5"),u=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);e["default"]=u.exports},"19ed":function(t,e,n){"use strict";(function(t){var o=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("d12b")),i={components:{},data:function(){return{showpop:!1,tabs:[{label:"全部",value:null},{label:"待付款",value:0},{label:"待核销",value:1},{label:"已退款",value:4}],type:0,status:null,current:1,dataList:[],isLoadMore:!1,signUpId:0,poptitle:"",orderType:null}},onLoad:function(){},onShow:function(){this.isLoadMore=!1,this.current=1,this.getList()},onReachBottom:function(){this.isLoadMore||(this.current++,this.getList())},methods:{confirm:function(){var e=this;5==this.orderType?this.$request.post("/coc-active/api/v1/merchant_meal_order/cancel",{id:this.signUpId}).then((function(n){if(200==n.code){t.showToast({title:"取消订单成功"});var o=e.dataList.findIndex((function(t){return t.orderId==e.signUpId}));e.dataList[o].status=5,e.dataList[o].statusMsg="已取消",e.showpop=!1}else e.$refs.uToast.show({message:n.message})})):this.$request.get("/coc-active/api/v1/group_purchase/cancelOrder/"+this.signUpId).then((function(n){if(200==n.code){t.showToast({title:"取消订单成功"});var o=e.dataList.findIndex((function(t){return t.orderId==e.signUpId}));e.dataList[o].status=5,e.dataList[o].statusMsg="已取消",e.showpop=!1}else e.$refs.uToast.show({message:n.message})}))},signupfalse:function(t){this.signUpId=t.orderId,this.poptitle=t.title,this.orderType=t.orderType,this.showpop=!0},getcountdown:function(t){return(0,a.default)(t).add(5,"minute").toDate().getTime()-(new Date).getTime()},OnDetail:function(e){5==e.orderType?t.navigateTo({url:"/pages/grouppurchase/packageorder/detail?id="+e.orderId}):t.navigateTo({url:"/pages/grouppurchase/order/detail?id="+e.orderId})},getList:function(){var t=this;this.$request.post("/coc-active/api/v1/group_purchase/orderTabulation",{size:20,current:this.current,status:this.status}).then((function(e){e.data.records.forEach((function(t){t.iscountdown=!1})),e.data.records.length<20&&(t.isLoadMore=!0),1==e.data.current?t.dataList=e.data.records:e.data.records.filter((function(e){t.dataList.push(e)}))}))},changetab:function(t,e){this.type=e,this.status=t.value,this.isLoadMore=!1,this.current=1,this.dataList=[],this.getList()},setcountdown:function(t){this.dataList[t].iscountdown=!0}}};e.default=i}).call(this,n("543d")["default"])},"5bf9":function(t,e,n){"use strict";(function(t,e){var o=n("4ea4");n("4319");o(n("66fd"));var a=o(n("13dd"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"9a5e":function(t,e,n){"use strict";var o=n("ea02"),a=n.n(o);a.a},b2db7:function(t,e,n){"use strict";n.r(e);var o=n("19ed"),a=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);e["default"]=a.a},d596:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return o}));var o={uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"6d2c"))},uCountDown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(n.bind(null,"e517"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"3d02"))}},a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.dataList.length),o=n>0?t.__map(t.dataList,(function(e,n){var o=t.__get_orig(e),a=0!=e.status||e.iscountdown?null:t.getcountdown(e.createdAt);return{$orig:o,m0:a}})):null;t._isMounted||(t.e0=function(e){t.showpop=!1}),t.$mp.data=Object.assign({},{$root:{g0:n,l0:o}})},i=[]},ea02:function(t,e,n){}},[["5bf9","common/runtime","common/vendor"]]]);