(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/roadhelp/51help/helpOrder"],{"3ae1":function(e,t,n){"use strict";(function(e,t){var r=n("4ea4");n("4319");r(n("66fd"));var a=r(n("e7ec"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"47e1":function(e,t,n){},"680a":function(e,t,n){"use strict";n.r(t);var r=n("c93f"),a=n.n(r);for(var o in r)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},c93f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("7dcd");var r={data:function(){return{orderList:[],showEmpty:!1,isReachBottom:!1,isLoadMore:!1}},onLoad:function(){this.getOrderList()},methods:{getOrderList:function(){var e=this;this.$request.post("/coc-active/api/v1/road/rescue/orderList").then((function(t){e.orderList=t.data,t.data.length||(e.showEmpty=!0)}))},lookOrder:function(t){console.log(t),e.navigateTo({url:"/pages/roadhelp/51help/helpOrderDetail?id="+t})},lookCancelOrder:function(t){e.navigateTo({url:"/pages/roadhelp/51help/helpOrderCancel?id="+t})}}};t.default=r}).call(this,n("543d")["default"])},d02c:function(e,t,n){"use strict";var r=n("47e1"),a=n.n(r);a.a},e7ec:function(e,t,n){"use strict";n.r(t);var r=n("f827"),a=n("680a");for(var o in a)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("d02c");var i=n("f0c5"),c=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"04065b8e",null,!1,r["a"],void 0);t["default"]=c.exports},f827:function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){}));var r=function(){var e=this.$createElement,t=(this._self._c,this.orderList.length);this.$mp.data=Object.assign({},{$root:{g0:t}})},a=[]}},[["3ae1","common/runtime","common/vendor"]]]);