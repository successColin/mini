(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myIntegralOrder/index"],{"3b7f":function(t,e,a){"use strict";var i=a("b2db"),n=a.n(i);n.a},"3d5e":function(t,e,a){"use strict";a.r(e);var i=a("b244"),n=a("fbe0");for(var r in n)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(r);a("3b7f");var s=a("f0c5"),o=Object(s["a"])(n["default"],i["b"],i["c"],!1,null,"05814530",null,!1,i["a"],void 0);e["default"]=o.exports},"49ff":function(t,e,a){"use strict";(function(t,e){var i=a("4ea4");a("4319");i(a("66fd"));var n=i(a("3d5e"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(n.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},b244:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){}));var i=function(){var t=this.$createElement,e=(this._self._c,this.tabs.length),a=this.dataList.length,i=this.dataList.length;this.$mp.data=Object.assign({},{$root:{g0:e,g1:a,g2:i}})},n=[]},b2db:function(t,e,a){},fa11:function(t,e,a){"use strict";(function(t){var i=a("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;i(a("d12b")),a("7dcd");var n={data:function(){return{dataList:[],tabs:[{label:"全部",value:null},{label:"待发货",value:1},{label:"已发货",value:2},{label:"待核销",value:3},{label:"已完成",value:4}],searchField:{current:1,size:20,orderStatus:null},isLoadMore:!0}},computed:{height:function(){return"calc(100vh - ".concat(this.tabs.length>0?80:20,"rpx - ").concat(this.tabs.length>0?30:0,"rpx)")}},onLoad:function(t){this.getList()},onShow:function(){this.getList()},methods:{OnDetail:function(e){t.navigateTo({url:"/pages/my/myIntegralOrder/detail?orderid="+e.scoreOrderId})},getList:function(){var t=this;if(this.isLoadMore){var e=Object.assign({},this.searchField);this.isLoadMore=!1,this.$request.post("/coc-active/api/v2/score/shop/score/order/pageList",e).then((function(a){var i=a.data.records&&a.data.records.length>0?a.data.records:[];1==e.current?t.dataList=i:i.map((function(e){t.dataList.push(e)})),i.length>=t.searchField.size&&(t.isLoadMore=!0)}))}},changetab:function(t){this.searchField.orderStatus=t,this.isLoadMore=!0,this.searchField.current=1,this.dataList=[],this.getList()},onReachScollBottom:function(){this.isLoadMore&&(this.searchField.current++,this.getList())}}};e.default=n}).call(this,a("543d")["default"])},fbe0:function(t,e,a){"use strict";a.r(e);var i=a("fa11"),n=a.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(r);e["default"]=n.a}},[["49ff","common/runtime","common/vendor"]]]);