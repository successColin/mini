(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/contacts/index"],{"0bc0":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={components:{},data:function(){return{dataList:[]}},onLoad:function(){},onShow:function(){this.getList()},onUnload:function(){t.$emit("refresh")},methods:{Onedit:function(n){t.navigateTo({url:"/pages/my/contacts/detail?id="+n})},OnDelete:function(n){var e=this;this.$request.get("/coc-my/api/v1/userContacts/delete/"+n).then((function(n){200==n.code?(t.$u.toast("操作成功"),e.getList()):t.$u.toast(n.message)}))},OnAdd:function(){t.navigateTo({url:"/pages/my/contacts/detail"})},getList:function(){var t=this;this.$request.post("/coc-my/api/v1/userContacts/list",{keyword:"",current:1,size:99}).then((function(n){t.dataList=n.data.records}))}}};n.default=e}).call(this,e("543d")["default"])},"123f":function(t,n,e){},2072:function(t,n,e){"use strict";e.r(n);var i=e("0bc0"),o=e.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);n["default"]=o.a},3569:function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return i}));var i={uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"f23e"))}},o=function(){var t=this.$createElement,n=(this._self._c,this.dataList.length);this.$mp.data=Object.assign({},{$root:{g0:n}})},u=[]},"580d":function(t,n,e){"use strict";e.r(n);var i=e("3569"),o=e("2072");for(var u in o)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(u);e("ffd4");var a=e("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=c.exports},f7e2:function(t,n,e){"use strict";(function(t,n){var i=e("4ea4");e("4319");i(e("66fd"));var o=i(e("580d"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(o.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},ffd4:function(t,n,e){"use strict";var i=e("123f"),o=e.n(i);o.a}},[["f7e2","common/runtime","common/vendor"]]]);