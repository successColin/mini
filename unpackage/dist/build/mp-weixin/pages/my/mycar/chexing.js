(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/mycar/chexing"],{"0ad8":function(e,t,n){"use strict";var a=n("ed23"),i=n.n(a);i.a},"7d9d":function(e,t,n){"use strict";n.r(t);var a=n("e6eb"),i=n.n(a);for(var u in a)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(u);t["default"]=i.a},9024:function(e,t,n){"use strict";n.r(t);var a=n("aae5"),i=n("7d9d");for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("0ad8");var c=n("f0c5"),o=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);t["default"]=o.exports},aae5:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return a}));var a={uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"4bf8"))}},i=function(){var e=this.$createElement;this._self._c},u=[]},c554:function(e,t,n){"use strict";(function(e,t){var a=n("4ea4");n("4319");a(n("66fd"));var i=a(n("9024"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},e6eb:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={components:{},data:function(){return{dataList:[],vehicleName:""}},onLoad:function(e){this.getList(e.vehicleId),this.vehicleName=e.vehicleName},onShow:function(){},methods:{OnAdd:function(t){t.vehicleName=this.vehicleName,e.navigateTo({url:"/pages/my/mycar/successadd",success:function(e){e.eventChannel.emit("getData",{data:t})}})},getList:function(e){var t=this;this.$request.get("/coc-system/api/v1/system/chexing/list/"+e).then((function(e){t.dataList=e.data}))}}};t.default=n}).call(this,n("543d")["default"])},ed23:function(e,t,n){}},[["c554","common/runtime","common/vendor"]]]);