(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/upkeep/orderStatus"],{"0d90":function(e,t,n){"use strict";n.r(t);var o=n("2607"),i=n("c6a0");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("fcc0");var u=n("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"352f8d11",null,!1,o["a"],void 0);t["default"]=c.exports},2607:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"f23e"))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,"076f"))},uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"4bf8"))}},i=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showcontact=!1})},a=[]},"5bd6":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("4319");o(n("66fd"));var i=o(n("0d90"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"99f5":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("7dcd");var o={components:{},data:function(){return{orderData:{},showcontact:!1,codeurl:"",params:{id:""},mySale:{},orderId:"",shopId:""}},onLoad:function(e){e.id&&(this.orderId=e.id)},onShow:function(){this.getDetail(this.orderId)},methods:{checkSale:function(){e.navigateTo({url:"/pages/carShops/upkeep/checkSales?shopId="+this.shopId})},lookOrder:function(){e.navigateTo({url:"/pages/my/myUpkeepOrder/detail?id="+this.orderId})},backHome:function(){e.switchTab({url:"/pages/home/index"})},OnpreviewImage:function(){e.previewImage({urls:this.codeurl,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了图片",e)},fail:function(e){console.log(e.errMsg)}}})},getStatus:function(e){var t=this;this.params.id=e,this.$request.post("/coc-active/api/v2/maintain_meal/result",this.params).then((function(e){t.orderData=e.data}))},getDetail:function(e){var t=this;this.$request.get("/coc-active/api/v2/maintain_meal/orderDetails/"+e).then((function(e){t.shopId=e.data.shopId,t.mySale=e.data.salesConsultantUserVO}))},OnWechat:function(){this.mySale.qrCode?(this.codeurl=this.mySale.qrCode,this.showcontact=!0):e.showToast({icon:"none",title:"暂无个人二维码，点击右侧打电话试试吧~"})},OnTell:function(){this.mySale.phone?e.makePhoneCall({phoneNumber:this.mySale.phone}):e.showToast({icon:"none",title:"暂无联系方式，点击左侧添加微信吗吧~"})}}};t.default=o}).call(this,n("543d")["default"])},c6a0:function(e,t,n){"use strict";n.r(t);var o=n("99f5"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},f10f:function(e,t,n){},fcc0:function(e,t,n){"use strict";var o=n("f10f"),i=n.n(o);i.a}},[["5bd6","common/runtime","common/vendor"]]]);