require('./common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralMall/noticeDetail"],{"04d5":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"1b13"))}},o=function(){var t=this.$createElement;this._self._c},a=[]},"103f":function(t,e,n){},"3e3a":function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("76b1");i(n("66fd"));var o=i(n("b0a0"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"3f53":function(t,e,n){"use strict";var i=n("103f"),o=n.n(i);o.a},"4a34":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={data:function(){return{noticeList:[],pageTotal:1,current:1,isLoadMore:!1}},onLoad:function(){this.getNoticeList()},onShow:function(){},onReachBottom:function(){this.isLoadMore||(this.current++,this.current<this.pageTotal&&(this.isLoadMore=!0,this.getNoticeList()))},methods:{getNoticeList:function(){var t=this;this.$newrequest.post("/coc-system/api/v1/system/base_info/list",{type:1}).then((function(e){e.data.forEach((function(e){t.noticeList.push(e)})),t.isLoadMore=!1}))}}}},b0a0:function(t,e,n){"use strict";n.r(e);var i=n("04d5"),o=n("ee4b");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("3f53");var u=n("f0c5"),c=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"f1ce5c8e",null,!1,i["a"],void 0);e["default"]=c.exports},ee4b:function(t,e,n){"use strict";n.r(e);var i=n("4a34"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a}},[["3e3a","common/runtime","common/vendor"]]]);