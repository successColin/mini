(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activityMall/list"],{"3bc8":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},o=[]},8503:function(t,e,n){"use strict";n.r(e);var a=n("ef31"),o=n.n(a);for(var i in a)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},b369:function(t,e,n){"use strict";(function(t,e){var a=n("4ea4");n("4319");a(n("66fd"));var o=a(n("e5ed"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},e5ed:function(t,e,n){"use strict";n.r(e);var a=n("3bc8"),o=n("8503");for(var i in o)["default"].indexOf(i)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(i);var r=n("f0c5"),c=Object(r["a"])(o["default"],a["b"],a["c"],!1,null,"67890748",null,!1,a["a"],void 0);e["default"]=c.exports},ef31:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{activityMall:function(){Promise.all([n.e("common/vendor"),n.e("pages/home/activityMall/components/home")]).then(function(){return resolve(n("eb90"))}.bind(null,n)).catch(n.oe)}},data:function(){return{shopCategoryId:0}},onReachBottom:function(){this.$refs.mall.getmore()},onLoad:function(e){27==e.shopCategoryId?(this.shopCategoryId=18,t.setNavigationBarTitle({title:"户外商家"})):26==e.shopCategoryId?(this.shopCategoryId=17,t.setNavigationBarTitle({title:"户内商家"})):28==e.shopCategoryId&&(this.shopCategoryId=19,t.setNavigationBarTitle({title:"团购商家"}));var n=e.type,a=e.shopCategoryId,o=e.shopCategoryName,i=e.keyword,r="";2==n&&a&&(r={id:parseInt(a),name:o}),this.$refs.mall.initData(n,r,i)}};e.default=a}).call(this,n("543d")["default"])}},[["b369","common/runtime","common/vendor"]]]);