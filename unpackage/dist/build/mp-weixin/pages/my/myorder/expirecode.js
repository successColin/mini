(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myorder/expirecode"],{"0549":function(t,n,e){},"346a":function(t,n,e){"use strict";e.r(n);var i=e("82d8"),a=e("71df");for(var r in a)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(r);e("9785");var o=e("f0c5"),c=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=c.exports},"4c78":function(t,n,e){"use strict";(function(t,n){var i=e("4ea4");e("76b1");i(e("66fd"));var a=i(e("346a"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(a.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},6015:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;n.default={components:{},data:function(){return{isLoadMore:!1,current:1,dataList:[]}},onReachBottom:function(){this.isLoadMore||(this.current++,this.getList())},onLoad:function(){this.getList()},onShow:function(){},methods:{getList:function(){var t=this;this.$request.post("/coc-active/api/v1/my/getMaintainTicket",{current:this.current,size:20,status:1}).then((function(n){n.data.records.length<20&&(t.isLoadMore=!0),1==t.current?t.dataList=n.data.records:n.data.records.filter((function(n){t.dataList.push(n)}))}))}}}},"71df":function(t,n,e){"use strict";e.r(n);var i=e("6015"),a=e.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(r);n["default"]=a.a},"82d8":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){}));var i=function(){var t=this.$createElement,n=(this._self._c,this.dataList.length);this.$mp.data=Object.assign({},{$root:{g0:n}})},a=[]},9785:function(t,n,e){"use strict";var i=e("0549"),a=e.n(i);a.a}},[["4c78","common/runtime","common/vendor"]]]);