(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Settlein/welcomevue"],{"07d6":function(e,t,i){"use strict";i.r(t);var s=i("3650"),n=i("8a4c");for(var o in n)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(o);i("c9a5");var a=i("f0c5"),r=Object(a["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],void 0);t["default"]=r.exports},"0fb9":function(e,t,i){},"2b21":function(e,t,i){"use strict";(function(e,t){var s=i("4ea4");i("4319");s(i("66fd"));var n=s(i("07d6"));e.__webpack_require_UNI_MP_PLUGIN__=i,t(n.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},3650:function(e,t,i){"use strict";i.d(t,"b",(function(){return n})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return s}));var s={uAvatar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(i.bind(null,"6d2c"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"076f"))},uCountDown:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(i.bind(null,"e517"))},uPicker:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(i.bind(null,"3f29"))}},n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showall=!1},e.e1=function(t){e.showall=!1},e.e2=function(t){e.showfourshop=!1},e.e3=function(t){e.showfirst=!1},e.e4=function(t){e.showtwo=!1})},o=[]},"52bb":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=i("7dcd"),n={components:{},data:function(){return{showtwo:!1,selectname:"市场经理",showfirst:!1,columnsfirst:[["客户经理","销售顾问","市场经理"]],timeData:1e4,time:1e4,index:0,headImg:"",mobile:"",showall:!1,isseconds:!0,isend:!0,sourceType:null,operateId:null,affiliationType:null,fourshopid:"",showfourshop:!1,selectList:[],selecttwoname:""}},onLoad:function(t){t.scene&&(this.getinfo(),10==t.scene.split("_")[0]&&(this.sourceType=1,this.operateId=t.scene.split("_")[1],this.affiliationType=1,console.log(t.scene.split("_")[0])),2==t.scene.split("_")[0]?(this.affiliationType=6,this.sourceType=6,this.operateId=t.scene.split("_")[1]):1==t.scene.split("_")[0]?(this.sourceType=5,this.fourshopid=t.scene.split("_")[1],this.affiliationType=7,this.getshichangList(),this.showfourshop=!0):7==t.scene.split("_")[0]&&(this.affiliationType=7,this.sourceType=7,this.operateId=t.scene.split("_")[1])),t.sourceType&&(this.sourceType=t.sourceType,this.operateId=t.operateId),!0===(0,s.tologin)()&&(this.headImg=e.getStorageSync("headImg"),this.mobile=this.hidePhoneNumber(e.getStorageSync("mobile")))},onShow:function(){},methods:{getinfo:function(){this.$request.get("/coc-my/api/v1/my/findUser").then((function(t){4==t.data.shop.unionPayStatus&&0==t.data.shop.status?1==t.data.shop.bankAcctType&&e.redirectTo({url:"/pages/Settlein/enterpriseProgress?type=1&isLineLedger="+t.data.shop.isLineLedger}):0==t.data.shop.status?1==t.data.shop.bankAcctType?e.redirectTo({url:"/pages/Settlein/enterpriseProgress?type=2&isLineLedger="+t.data.shop.isLineLedger}):e.redirectTo({url:"/pages/Settlein/individualProgress?type=1&isLineLedger="+t.data.shop.isLineLedger}):1==t.data.shop.status?1==t.data.shop.bankAcctType?e.redirectTo({url:"/pages/Settlein/enterpriseProgress?type=3&isLineLedger="+t.data.shop.isLineLedger}):e.redirectTo({url:"/pages/Settlein/individualProgress?type=2&isLineLedger="+t.data.shop.isLineLedger}):2==t.data.shop.status&&(1==t.data.shop.bankAcctType?e.redirectTo({url:"/pages/Settlein/enterpriseProgress?type=4&auditReason="+t.data.shop.auditReason+"&unionPayStatus="+t.data.shop.unionPayStatus+"&isLineLedger="+t.data.shop.isLineLedger}):e.redirectTo({url:"/pages/Settlein/individualProgress?type=3&auditReason="+t.data.shop.auditReason+"&unionPayStatus="+t.data.shop.unionPayStatus+"&isLineLedger="+t.data.shop.isLineLedger}))}))},Onnextfours:function(){if(!this.operateId)return e.$u.toast("请先选择客户经理/销售类型/市场经理"),!1;this.showfourshop=!1},OnOpentwo:function(){if(0==this.selectList.length)return e.$u.toast("请先选择客户经理/销售/市场类型"),!1;this.showtwo=!0},Onselecttwo:function(e){this.showtwo=!1,this.operateId=e.value[0].id,this.selecttwoname=e.value[0].nickname},Onselectfirst:function(e){var t=this;this.selectname=e.value[0],this.selecttwoname="",this.operateId="",console.log(e),0==e.indexs[0]?(this.affiliationType=2,this.$newrequest.get("/coc-system/api/v1/system/customer/manager/list?shopId="+this.fourshopid).then((function(e){t.showfirst=!1,t.selectList=[e.data]}))):1==e.indexs[0]?(this.affiliationType=3,this.$newrequest.post("/coc-active/api/v1/sales_consultant/list",{shopId:this.fourshopid,current:1,size:99}).then((function(e){t.showfirst=!1,t.selectList=[e.data.records]}))):2==e.indexs[0]&&(this.affiliationType=7,this.getshichangList())},getshichangList:function(){var e=this;this.$newrequest.post("/coc-active/api/v1/sales_consultant/marketingManagerList",{shopId:this.fourshopid,current:1,size:99}).then((function(t){e.showfirst=!1,e.selectList=[t.data.records]}))},OnOpenfirst:function(){this.showfirst=!0},onChange:function(e){this.timeData=e,0==e.seconds&&(this.isend=!1)},Onopenallshow:function(e){1!=e&&2!=e||(this.time=1e4,this.isend=!0),this.index=e,this.showall=!0},hidePhoneNumber:function(e){var t=/^(\d{3})\d{4}(\d{4})$/.exec(e);if(t&&3===t.length){var i=t[1]+"****"+t[2];return i}return e},OnNext:function(){if(this.isend)return!1;this.showall=!1;var t=1==this.index?0:1;console.log(this.affiliationType,this.operateId,this.sourceType),e.navigateTo({url:"/pages/Settlein/Processdescription?isLineLedger="+t+"&affiliationType="+this.affiliationType+"&operateId="+this.operateId+"&sourceType="+this.sourceType})},OnmakePhoneCall:function(){e.makePhoneCall({phoneNumber:"4008-010-111"})}}};t.default=n}).call(this,i("543d")["default"])},"8a4c":function(e,t,i){"use strict";i.r(t);var s=i("52bb"),n=i.n(s);for(var o in s)["default"].indexOf(o)<0&&function(e){i.d(t,e,(function(){return s[e]}))}(o);t["default"]=n.a},c9a5:function(e,t,i){"use strict";var s=i("0fb9"),n=i.n(s);n.a}},[["2b21","common/runtime","common/vendor"]]]);