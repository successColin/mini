(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/order/detail"],{1792:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{recommend:function(){Promise.all([i.e("common/vendor"),i.e("pages/grouppurchase/components/recommend")]).then(function(){return resolve(i("9450"))}.bind(null,i)).catch(i.oe)}},data:function(){return{id:0,dataList:{},isshowpage:!1,istype:0}},onLoad:function(t){this.id=t.id,1==t.istype&&(this.istype=1),this.getList()},onShow:function(){},methods:{toClick:function(){t.navigateTo({url:"/pages/activity/activityRegistration/playfulperson"})},OnPushDetail:function(){0==this.dataList.type?t.navigateTo({url:"/pages/grouppurchase/detail?id="+this.dataList.groupPurchaseProductId}):t.navigateTo({url:"/pages/grouppurchase/newpeople/detail?id="+this.dataList.groupPurchaseProductId})},Ondrawback:function(){var e=this;t.navigateTo({url:"/pages/grouppurchase/order/drawbackindex?id="+this.id,success:function(t){t.eventChannel.emit("getinfo",{data:e.dataList})}})},wxpay:function(e){var i=this;t.requestPayment({provider:"wxpay",timeStamp:e.miniPayRequest.timeStamp,nonceStr:e.miniPayRequest.nonceStr,package:e.miniPayRequest.package,signType:e.miniPayRequest.signType,paySign:e.miniPayRequest.paySign,appid:e.miniPayRequest.appId,success:function(e){t.showToast({icon:"success",title:"支付成功",complete:function(){setTimeout((function(){i.getList()}),1e3)}})},fail:function(t){i.$request.get("/coc-active/api/v1/group_purchase/failOrder/"+i.id).then((function(t){}))}})},OnPay:function(){var e=this;this.$request.post("/coc-active/api/v1/group_purchase/groupPayment",{groupPurchaseProductId:this.dataList.groupPurchaseProductId,groupPurchaseSetMealId:this.dataList.groupPurchaseSetMealId,groupPurchaseSetMealNum:this.dataList.groupPurchaseSetMealNum,mobile:this.dataList.mobile,name:this.dataList.name,orderId:this.id,plate:this.dataList.plate,subOpenId:t.getStorageSync("openid")}).then((function(t){200==t.code?(e.id=t.data.orderId,e.wxpay(t.data.payment)):e.$refs.uToast.show({message:t.message})}))},OnCopy:function(e){t.setClipboardData({data:e,success:function(){t.showToast({title:"复制成功",icon:"none"})}})},OnPushMap:function(){t.openLocation({latitude:this.dataList.shopVO.lat,longitude:this.dataList.shopVO.lng,success:function(){console.log("success")}})},OnPushshopHome:function(){3==this.dataList.shopVO.shopTypeId?t.navigateTo({url:"/pages/activityMall/business/index?id="+this.dataList.shopVO.shopId}):2==this.dataList.shopVO.shopTypeId&&t.navigateTo({url:"/pages/carShops/4Sdetail/index?id="+this.dataList.shopVO.shopId})},getList:function(){var t=this;this.isshowpage||this.$showLoading(),this.$request.get("coc-active/api/v1/group_purchase/orderDetails/"+this.id).then((function(e){t.dataList=e.data})).catch((function(t){})).finally((function(){t.isshowpage||(t.isshowpage=!0,t.$hideLoading())}))}}};e.default=a}).call(this,i("543d")["default"])},"4bb7":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return a}));var a={uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"f23e"))},uDivider:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(i.bind(null,"4e62"))}},n=function(){var t=this.$createElement;this._self._c},s=[]},"4fcc":function(t,e,i){"use strict";i.r(e);var a=i("4bb7"),n=i("66df");for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);i("82e8");var o=i("f0c5"),u=Object(o["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);e["default"]=u.exports},"66df":function(t,e,i){"use strict";i.r(e);var a=i("1792"),n=i.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);e["default"]=n.a},"82e8":function(t,e,i){"use strict";var a=i("fe59"),n=i.n(a);n.a},"8b58":function(t,e,i){"use strict";(function(t,e){var a=i("4ea4");i("4319");a(i("66fd"));var n=a(i("4fcc"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(n.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},fe59:function(t,e,i){}},[["8b58","common/runtime","common/vendor"]]]);