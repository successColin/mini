(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/message/detail"],{"0e24":function(e,t,n){},2001:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(n.bind(null,"6d3c"))},uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"d838"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"c00c"))}},i=function(){var e=this.$createElement;this._self._c},a=[]},"3ac8":function(e,t,n){"use strict";n.r(t);var o=n("9233"),i=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},9233:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("04ff"),i={components:{},data:function(){return{isLoadMore:!1,headImg:"",id:"",msg:"",info:{},dataList:[],userId:"",current:1,type:""}},onUnload:function(){e.closeSocket({})},onLoad:function(e){this.headImg=(0,o.getstorage)("headImg");var t=this;this.type=e.type,this.userId=(0,o.getstorage)("userId");var n=this.getOpenerEventChannel();n.on("getinfo",(function(e){t.id=e.data.id,t.info=e.data,t.connectSocket(e.data.id),t.getrecord(e.data.id)}))},onShow:function(){},onPullDownRefresh:function(){this.isLoadMore||(this.current++,this.pushgetrecord())},methods:{OnGetCounpon:function(t){1==t.couponType?e.navigateTo({url:"/pages/merchantZone/receive/receiveCoupon?couponid="+t.relId}):2==t.couponType&&e.navigateTo({url:"/pages/merchantZone/receive/receiveyouhuiCoupon?couponid="+t.relId})},scrollToBottom:function(){this.$nextTick((function(){setTimeout((function(){e.pageScrollTo({scrollTop:99999,duration:0})}),200)}))},pushgetrecord:function(){var e=this;this.$request.post("/coc-active/api/v1/news/findMessage",{id:this.id,size:5,current:this.current,type:this.type}).then((function(t){t.data.records.length<5?e.isLoadMore=!0:t.data.records.filter((function(t){e.dataList.unshift(t)}))}))},getrecord:function(e){var t=this;this.$request.post("/coc-active/api/v1/news/findMessage",{id:this.id,size:5,current:this.current,type:this.type}).then((function(e){t.dataList=e.data.records,t.scrollToBottom()}))},Onsendout:function(){var e=this,t=this,n=new Date,i=n.getDate(),a=n.getMonth()+1,r=n.getHours(),u=n.getMinutes(),s=n.getFullYear();r<10&&(r="0"+r),u<10&&(u="0"+u);var c=s+"-"+a+"-"+i+" "+r+":"+u;this.$request.post("/coc-active/api/v1/news/sendMessage",{message:this.msg,userId:this.id}).then((function(n){200==n.code&&(t.dataList.push({content:e.msg,createdAt:c,sourceUserId:(0,o.getstorage)("userId"),sourceUserImg:(0,o.getstorage)("headImg")}),e.msg="",e.scrollToBottom())}))},connectSocket:function(t){var n=this,i=new Date,a=i.getDate(),r=i.getMonth()+1,u=i.getHours(),s=i.getMinutes(),c=i.getFullYear();u<10&&(u="0"+u),s<10&&(s="0"+s);var d=c+"-"+r+"-"+a+" "+u+":"+s;e.connectSocket({url:"ws://cocuat.51api.dcqcjlb.com:28082/ws/message/"+n.userId+"/"+t,data:function(){return{x:"",y:""}},header:{"content-type":"application/json"},method:"GET",success:function(){e.onSocketMessage((function(e){var t=JSON.parse(e.data);200==t.code&&n.dataList.push({content:t.message,createdAt:d,sourceUserId:n.id,sourceUserImg:(0,o.getstorage)("headImg")})}))}})}}};t.default=i}).call(this,n("543d")["default"])},b880:function(e,t,n){"use strict";var o=n("0e24"),i=n.n(o);i.a},dad1:function(e,t,n){"use strict";n.r(t);var o=n("2001"),i=n("3ac8");for(var a in i)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("b880");var r=n("f0c5"),u=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=u.exports},f4e9:function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("76b1");o(n("66fd"));var i=o(n("dad1"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])}},[["f4e9","common/runtime","common/vendor"]]]);