(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myorder/index"],{1786:function(e,t,n){},"3deb":function(e,t,n){"use strict";var o=n("1786"),i=n.n(o);i.a},41395:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"d838"))},uCountDown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(n.bind(null,"cda7"))},uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"1b13"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"ba5d"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.dataList.length),o=n>0?e.__map(e.dataList,(function(t,n){var o=e.__get_orig(t),i=4!=e.type?e.gettype(t.status):null;return{$orig:o,m0:i}})):null;e._isMounted||(e.e0=function(e,t){var n=arguments[arguments.length-1].currentTarget.dataset,o=n.eventParams||n["event-params"];t=o.item;t.iscountdown=!0},e.e1=function(t){e.showpop=!1}),e.$mp.data=Object.assign({},{$root:{g0:n,l0:o}})},r=[]},"8ea7":function(e,t,n){"use strict";n.r(t);var o=n("ac9d"),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},ac9d:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("9523")),r=o(n("84c4")),a=n("04ff");function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){(0,i.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={components:{},data:function(){return{poptitle:"",showpop:"",signUpId:"",chosecomment:{},current:1,dataList:[],tabs:[{label:"全部",value:0},{label:"待付款",value:1},{label:"待核销",value:2},{label:"已退款",value:3},{label:"待评论",value:4}],type:0,seacher:{current:1,size:20,orderByColumn:1,orderByMethod:"desc",isComments:1},isLoadMore:!0}},onLoad:function(e){this.type=e.type},onShow:function(){this.getList()},onReachBottom:function(){this.isLoadMore&&(this.isLoadMore=!1,this.seacher.current++,this.getList())},methods:{clickisComment:function(e){this.seacher.current=1,this.seacher.isComments=e,this.getList()},OnPay:function(e){var t=this;this.$request.post("/coc-active/api/v1/sign_up/payment",{type:"3",activityId:e.activityId,totalAmount:e.orderMoney,merOrderId:e.orderNo,subOpenId:(0,a.getstorage)("openid")}).then((function(e){200==e.code&&t.wxpay(e.data)}))},wxpay:function(t){var n=this;e.requestPayment({provider:"wxpay",timeStamp:t.miniPayRequest.timeStamp,nonceStr:t.miniPayRequest.nonceStr,package:t.miniPayRequest.package,signType:t.miniPayRequest.signType,paySign:t.miniPayRequest.paySign,appid:t.miniPayRequest.appId,success:function(t){e.showToast({icon:"success",title:"支付成功",complete:function(){n.getList(),e.navigateTo({url:"/pages/my/myorder/orderList?orderNo="+n.dataList.activitySignUp.orderNo})}})},fail:function(t){e.showToast({icon:"none",title:"支付失败"})}})},signupfalse:function(e){this.signUpId=e.id,this.poptitle=e.title,this.showpop=!0},confirm:function(){var e=this;this.$request.post("/coc-active/api/v1/sign_up/cancel",{signUpId:this.signUpId}).then((function(t){200==t.code?(e.$refs.uToast.show({message:"取消订单成功"}),e.showpop=!1,e.getList()):e.$refs.uToast.show({message:t.message})}))},OnActivityDetail:function(t){e.navigateTo({url:"/pages/home/activityDetail/index?id="+t.activityId})},OnDetail:function(t){4==this.type?e.navigateTo({url:"/pages/home/wonderfulReview/detail?id="+t.activityMarvellousId}):e.navigateTo({url:"/pages/my/myorder/orderList?id="+t.orderNo})},getcountdown:function(e){return(0,r.default)(e).add(5,"minute").toDate().getTime()-(new Date).getTime()},getList:function(){var e=this;0==this.type?(this.seacher=this.seacher,delete this.seacher.status):1==this.type?this.seacher.status=0:2==this.type?this.seacher.status=1:3==this.type?this.seacher.status=4:4==this.type&&(this.seacher.status=2);var t=Object.assign({},this.seacher);4!=this.type&&delete t.isComments,this.$request.post("/coc-my/activity/order/list",t).then((function(n){1==t.current?e.dataList=n.data.records.map((function(t){return u(u({},t),{},{downTime:e.getcountdown(t.createdAt)})})):n.data.records.map((function(t){e.dataList.push(u(u({},t),{},{downTime:e.getcountdown(t.createdAt)}))})),n.data.records.length>=e.seacher.size&&(e.isLoadMore=!0)}))},OnCouponcode:function(t){e.navigateTo({url:"/pages/my/myorder/orderList?orderNo="+t.orderNo})},OnRefundprogress:function(){e.navigateTo({url:"/pages/my/myorder/refundprogress"})},Onrefund:function(t){e.navigateTo({url:"/pages/my/myorder/refund?orderNo="+t.orderNo+"&orderCode="+t.orderCode+"&orderMoney="+t.paidMoney})},gettype:function(e){switch(e){case 0:return"待付款";case 1:return"待核销";case 2:return"已完成";case 3:return"已完成";case 4:return"已退款";case 5:return"已取消";case 6:return"支付失败";case 7:return"付款中";case 8:return"退款申请中"}},changetab:function(e){this.type=e,this.seacher.current=1,4==e&&(this.seacher.isComments=1),this.getList()}}};t.default=c}).call(this,n("543d")["default"])},e566:function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("76b1");o(n("66fd"));var i=o(n("ffb0"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},ffb0:function(e,t,n){"use strict";n.r(t);var o=n("41395"),i=n("8ea7");for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("3deb");var a=n("f0c5"),s=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"1d72d1ac",null,!1,o["a"],void 0);t["default"]=s.exports}},[["e566","common/runtime","common/vendor"]]]);