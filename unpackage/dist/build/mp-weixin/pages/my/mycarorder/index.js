(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/mycarorder/index"],{"0b08":function(t,e,n){"use strict";(function(t,e){var a=n("4ea4");n("4319");a(n("66fd"));var i=a(n("eeaa"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"351b":function(t,e,n){"use strict";n.r(e);var a=n("41ca"),i=n.n(a);for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);e["default"]=i.a},"41ca":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={components:{},data:function(){return{current:1,isLoadMore:!1,dataList:[]}},onLoad:function(){this.getList()},onShow:function(){},onReachBottom:function(){this.isLoadMore||(this.current++,this.getList())},methods:{Onwatch:function(e){t.navigateTo({url:"/pages/my/mycarorder/detail",success:function(t){t.eventChannel.emit("getinfo",{data:e})}})},getList:function(){var t=this;this.$request.post("/coc-active/api/v1/deposit/order/list",{current:this.current,size:20}).then((function(e){e.data.records.length<20&&(t.isLoadMore=!0),1==t.current?t.dataList=e.data.records:e.data.records.filter((function(e){t.dataList.push(e)}))}))}}};e.default=n}).call(this,n("543d")["default"])},5066:function(t,e,n){},"7e12":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this.$createElement,e=(this._self._c,this.dataList.length);this.$mp.data=Object.assign({},{$root:{g0:e}})},i=[]},cab9:function(t,e,n){"use strict";var a=n("5066"),i=n.n(a);i.a},eeaa:function(t,e,n){"use strict";n.r(e);var a=n("7e12"),i=n("351b");for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);n("cab9");var c=n("f0c5"),o=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=o.exports}},[["0b08","common/runtime","common/vendor"]]]);