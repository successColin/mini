(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myUpkeepOrder/index"],{"1a6b":function(t,e,a){"use strict";a.r(e);var n=a("3185"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e["default"]=i.a},3185:function(t,e,a){"use strict";(function(t){var n=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;n(a("d12b")),a("7dcd");var i={data:function(){return{dataList:[],tabs:[{label:"全部",value:0,status:-1},{label:"待付款",value:1,status:0},{label:"待核销",value:2,status:1},{label:"已退款",value:3,status:4}],searchField:{current:1,size:10,status:""},loadMore:!1,isReachBottom:!1,cancelVisble:!1,cancelOrderId:""}},onLoad:function(t){var e=t.status;this.searchField.status=this.tabs.find((function(t){return t.value==e})).status,this.getList()},onReachBottom:function(){this.isReachBottom||this.loadMore||(this.searchField.current+=1,this.getList())},methods:{OnDetail:function(e){t.navigateTo({url:"/pages/my/myUpkeepOrder/detail?id="+e.orderId})},getList:function(){var e=this;this.loadMore=!0;var a=Object.assign({},this.searchField);-1==a.status&&delete a["status"],this.$newrequest.post("/coc-active/api/v2/maintain_meal/orderList",a).then((function(n){200==n.code?(1===a.current?e.dataList=n.data.records:n.data.records.forEach((function(t){e.dataList.push(t)})),n.data.records.length<a.size&&(e.isReachBottom=!0)):t.showToast({title:n.message,icon:"none",duration:2e3})})).finally((function(){e.loadMore=!1}))},changetab:function(t){this.searchField.status=t,this.isReachBottom=!1,this.loadMore=!1,this.searchField.current=1,this.getList()},openCancel:function(t){this.cancelVisble=!0,this.cancelOrderId=t.orderId},closeCancel:function(){this.cancelVisble=!1,this.cancelOrderId=""},submitCancel:function(){var e=this;this.$newrequest.get("/coc-active/api/v2/maintain_meal/cancelOrder/"+this.cancelOrderId).then((function(a){if(200==a.code){var n=e.dataList.findIndex((function(t){return t.orderId===e.cancelOrderId}));n>=0&&(t.showToast({title:"取消成功"}),e.closeCancel(),e.dataList=[],e.isReachBottom=!1,e.loadMore=!1,e.searchField.current=1,e.getList())}else t.showToast({title:a.message,icon:"none",duration:2e3})}))},getStatusType:function(t,e){if(1==t&&1==e)return"已过期";switch(t){case 0:return"待付款";case 1:return"待核销";case 2:return"已完成";case 4:return"已退款";case 5:return"已取消";case 8:return"退款中";default:return""}}}};e.default=i}).call(this,a("543d")["default"])},"6f2c":function(t,e,a){},"78eb":function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return n}));var n={uLoadingIcon:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(a.bind(null,"8a2a"))},uPopup:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(a.bind(null,"076f"))}},i=function(){var t=this,e=t.$createElement,a=(t._self._c,t.dataList.length),n=a>0?t.__map(t.dataList,(function(e,a){var n=t.__get_orig(e),i=t.getStatusType(e.status,e.isOverdue);return{$orig:n,m0:i}})):null,i=t.dataList.length>0&&t.isReachBottom,s=0==t.dataList.length&&t.isReachBottom;t.$mp.data=Object.assign({},{$root:{g0:a,l0:n,g1:i,g2:s}})},s=[]},"854c":function(t,e,a){"use strict";var n=a("6f2c"),i=a.n(n);i.a},"941b":function(t,e,a){"use strict";a.r(e);var n=a("78eb"),i=a("1a6b");for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("854c");var r=a("f0c5"),o=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,"790cbaab",null,!1,n["a"],void 0);e["default"]=o.exports},"98d0":function(t,e,a){"use strict";(function(t,e){var n=a("4ea4");a("4319");n(a("66fd"));var i=n(a("941b"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(i.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])}},[["98d0","common/runtime","common/vendor"]]]);