(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/my"],{"140e":function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=n("7dcd"),o=i(n("93fe9")),a={components:{tabbar:function(){Promise.all([n.e("common/vendor"),n.e("components/tabbar/index")]).then(function(){return resolve(n("db36"))}.bind(null,n)).catch(n.oe)}},data:function(){return{roadVip:0,roadVipExp:null,showsetheadimg:!1,showmodal:!1,qqmapsdk:"",shoptypeid:"",istoken:!1,orderbtn:[{label:"待付款",value:"1"},{label:"待核销",value:"2"},{label:"已退款",value:"3"},{label:"待评论",value:"4"}],dataList:{collectionsCount:0,couponCount:0,redCount:0,maintainCount:0,score:0},finduserList:{},visitinto:null,tabbarHeight:0,wisemanstatus:!1,showVisble:!1}},computed:{navbarHeight:function(){return e.getStorageSync("menuInfo")?e.getStorageSync("menuInfo").contentTop:0},contentHeight:function(){return"calc(100vh - ".concat(this.tabbarHeight,"px)")}},onHide:function(){e.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(e){}))},onUnload:function(){e.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(e){}))},onLoad:function(){this.qqmapsdk=new o.default({key:"BH7BZ-PEPCX-SNA47-TZBJA-SKIFV-GVFSW"}),(0,s.gettoken)()&&this.getstatus()},onShow:function(){var t=this;e.getLocation({type:"wgs84",success:function(e){console.log("当前位置的经度："+e.longitude),console.log("当前位置的纬度："+e.latitude),(0,s.setstorage)("lat",e.latitude),(0,s.setstorage)("lng",e.longitude)}}),this.shoptypeid=(0,s.getstorage)("shopTypeId"),this.istoken=(0,s.gettoken)(),(0,s.gettoken)()?(this.$request.post("/coc-active/api/v1/my/index").then((function(e){(0,s.setstorage)("isExpert",e.data.isExpert),t.dataList=e.data,1==e.data.isDefaultAvatar&&(0,s.tologin)()&&(t.showsetheadimg=!0)})),this.getinfo()):this.dataList={collectionsCount:0,couponCount:0,redCount:0,maintainCount:0,score:0},e.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_into",{type:15}).then((function(e){t.visitinto=e}))},methods:{OnPushquanyi:function(){e.navigateTo({url:"/pages/roadhelp/equity"})},Onopencard:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/card/index"})},Onpushloadhelp:function(){if(!e.getStorageSync("token"))return e.navigateTo({url:"/pages/activity/share/index"}),!1;e.navigateTo({url:"/pages/roadhelp/index"})},OnPusharea:function(t){return 1==this.dataList.expertStatus?(e.$u.toast("您的达人权限被封禁，暂不能进入达人特区"),!1):this.wisemanstatus?(e.navigateTo({url:"/pages/wiseman/applying"}),!1):void(1==t||2==t?e.navigateTo({url:"/pages/myEarnings/mainPage"}):3==t?e.navigateTo({url:"/pages/wiseman/mywork"}):e.navigateTo({url:"/pages/wiseman/specialarea/home"}))},getstatus:function(){var e=this;this.$request.post("/coc-active/api/v1/expert/echoVerify").then((function(t){1==t.data.status&&(e.wisemanstatus=!0)}))},upgradewiseman:function(){this.$request.post("/coc-active/api/v1/expert/echoVerify").then((function(t){1101==t.code?e.navigateTo({url:"/pages/wiseman/welcome"}):1==t.data.status?e.navigateTo({url:"/pages/wiseman/applying"}):3==t.data.status&&e.navigateTo({url:"/pages/wiseman/welcome"})}))},OnToset:function(){this.showsetheadimg=!1,this.OnPushSetInfo()},getscore:function(e){if(e>=1e4){var t;return t=e/1e4,t+"W"}return e},Ontruemodal:function(){this.showmodal=!1},OnMerchantsettlement:function(){if(!(0,s.getstorage)("lat"))return this.showmodal=!0,!1;null==this.finduserList.shop?e.navigateTo({url:"/pages/Settlein/welcomevue"}):4==this.finduserList.shop.unionPayStatus&&0==this.finduserList.shop.status?1==this.finduserList.shop.bankAcctType&&e.navigateTo({url:"/pages/Settlein/enterpriseProgress?type=1&isLineLedger="+this.finduserList.shop.isLineLedger}):0==this.finduserList.shop.status?1==this.finduserList.shop.bankAcctType?e.navigateTo({url:"/pages/Settlein/enterpriseProgress?type=2&isLineLedger="+this.finduserList.shop.isLineLedger}):e.navigateTo({url:"/pages/Settlein/individualProgress?type=1&isLineLedger="+this.finduserList.shop.isLineLedger}):1==this.finduserList.shop.status?1==this.finduserList.shop.bankAcctType?e.navigateTo({url:"/pages/Settlein/enterpriseProgress?type=3&isLineLedger="+this.finduserList.shop.isLineLedger}):e.navigateTo({url:"/pages/Settlein/individualProgress?type=2&isLineLedger="+this.finduserList.shop.isLineLedger}):2==this.finduserList.shop.status&&(1==this.finduserList.shop.bankAcctType?e.navigateTo({url:"/pages/Settlein/enterpriseProgress?type=4&auditReason="+this.finduserList.shop.auditReason+"&unionPayStatus="+this.finduserList.shop.unionPayStatus+"&isLineLedger="+this.finduserList.shop.isLineLedger}):e.navigateTo({url:"/pages/Settlein/individualProgress?type=3&auditReason="+this.finduserList.shop.auditReason+"&unionPayStatus="+this.finduserList.shop.unionPayStatus+"&isLineLedger="+this.finduserList.shop.isLineLedger}))},OnaddVerification:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/merchantZone/writeOffCode/index"})},OnPushCouponCenter:function(){e.navigateTo({url:"/pages/my/couponCenter/index"})},getinfo:function(){var e=this;this.$request.get("/coc-my/api/v1/my/findUser").then((function(t){e.roadVip=t.data.user.roadVip,e.roadVipExp=t.data.user.roadVipExp,e.finduserList=t.data,(0,s.setstorage)("headImg",t.data.user.headImg),(0,s.setstorage)("nickname",t.data.user.nickname),(0,s.setstorage)("userType",t.data.user.userType),(0,s.setstorage)("userId",t.data.user.id),(0,s.setstorage)("isCertify",t.data.user.isCertify),(0,s.setstorage)("realName",t.data.user.realName),(0,s.setstorage)("mobile",t.data.user.mobile),null==t.data.shop?((0,s.setstorage)("status",null),(0,s.setstorage)("shopId",null),(0,s.setstorage)("shopName",null),(0,s.setstorage)("shopTypeId",0),(0,s.setstorage)("shopType",null)):((0,s.setstorage)("status",t.data.shop.status),(0,s.setstorage)("shopId",t.data.shop.id),(0,s.setstorage)("shopName",t.data.shop.shopName),(0,s.setstorage)("shopTypeId",t.data.shop.shopTypeId),(0,s.setstorage)("shopType",t.data.shop.status))}))},Onmyfans:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/myfans/index"})},Oninviteinfluencers:function(){e.navigateTo({url:"/pages/wiseman/invitein"})},OnPushIntegral:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/integral/index"})},mycaroder:function(){(0,s.tologin)(),e.navigateTo({url:"/pages/my/mycarorder/index"})},AddmyCar:function(){(0,s.tologin)(),e.navigateTo({url:"/pages/my/mycar/index"})},OnFeedback:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/myFeedback/index?type=2"})},login:function(){(0,s.tologin)()},Oncouponpackage:function(t){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/myorder/couponpackage?type="+t})},Onpushgroup:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/grouppurchase/order/list"})},Onpushorder:function(t){if(!0===(0,s.tologin)())return 99!=t&&void e.navigateTo({url:"/pages/my/myorder/index?type="+t})},OnPushCollection:function(t){if(!0===(0,s.tologin)())return 2!=t&&void e.navigateTo({url:"/pages/my/collection/index?type="+t})},OnPushSetInfo:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/info/index"})},OnPushmyIntegralOrder:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/myIntegralOrder/index?status=0"})},OnPushmyUpkeepOrder:function(){!0===(0,s.tologin)()&&e.navigateTo({url:"/pages/my/myUpkeepOrder/index?status=0"})},showQrcode:function(){this.showVisble=!this.showVisble},closeQrcode:function(){this.showVisble=!1},jumpRecommendedShopQrcode:function(){e.navigateTo({url:"/pages/wiseman/inviteinbusiness"})},jumpRecommendedWiseman:function(){e.navigateTo({url:"/pages/wiseman/invitein"})}}};t.default=a}).call(this,n("543d")["default"])},"1b49":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("4319");i(n("66fd"));var s=i(n("6f02"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(s.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"6f02":function(e,t,n){"use strict";n.r(t);var i=n("dcab"),s=n("77fe");for(var o in s)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(o);n("a9b7");var a=n("f0c5"),u=Object(a["a"])(s["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);t["default"]=u.exports},"77fe":function(e,t,n){"use strict";n.r(t);var i=n("140e"),s=n.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(o);t["default"]=s.a},a9b7:function(e,t,n){"use strict";var i=n("f825"),s=n.n(i);s.a},dcab:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return i}));var i={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(n.bind(null,"45e8"))},"u-Image":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--image/u--image")]).then(n.bind(null,"4497"))},uBadge:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-badge/u-badge")]).then(n.bind(null,"a081"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"f23e"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"3d02"))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,"076f"))}},s=function(){var e=this,t=e.$createElement,n=(e._self._c,e.getscore(e.dataList.score));e._isMounted||(e.e0=function(t){e.showsetheadimg=!1},e.e1=function(t){e.showsetheadimg=!1}),e.$mp.data=Object.assign({},{$root:{m0:n}})},o=[]},f825:function(e,t,n){}},[["1b49","common/runtime","common/vendor"]]]);