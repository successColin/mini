(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/specialarea/home"],{1737:function(e,n,t){"use strict";var i=t("2e48"),a=t.n(i);a.a},"2e48":function(e,n,t){},"7b20":function(e,n,t){"use strict";t.r(n);var i=t("f36c"),a=t("ce6d");for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);t("1737");var s=t("f0c5"),u=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"14cfe952",null,!1,i["a"],void 0);n["default"]=u.exports},ce6d:function(e,n,t){"use strict";t.r(n);var i=t("fc25"),a=t.n(i);for(var o in i)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(o);n["default"]=a.a},db18:function(e,n,t){"use strict";(function(e,n){var i=t("4ea4");t("4319");i(t("66fd"));var a=i(t("7b20"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},f36c:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return i}));var i={uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,"45e8"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"f23e"))},uNoticeBar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-notice-bar/u-notice-bar")]).then(t.bind(null,"fe8c"))}},a=function(){var e=this.$createElement,n=(this._self._c,this.isshowpage?this.noticeList.length:null);this.$mp.data=Object.assign({},{$root:{g0:n}})},o=[]},fc25:function(e,n,t){"use strict";(function(e){var i=t("4ea4");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(t("2eee")),o=i(t("c973")),s={components:{square:function(){t.e("pages/wiseman/darenxiaodian/components/square").then(function(){return resolve(t("7bea"))}.bind(null,t)).catch(t.oe)},carousel:function(){Promise.all([t.e("common/vendor"),t.e("components/carousel/index")]).then(function(){return resolve(t("c969"))}.bind(null,t)).catch(t.oe)}},computed:{navbarHeight:function(){return e.getStorageSync("menuInfo")?e.getStorageSync("menuInfo").contentTop:0}},onLoad:function(){this.queryNoticeList(),this.queryRankingList(5),this.queryRankingList(6),this.getSquareList()},onShow:function(){this.queryHome(),this.setObj()},data:function(){return{showVisble:!1,noticeList:[],detail:{},isshowpage:!1,rankList:[],hotList:[],squarerows:{list:[],total:0}}},methods:{queryHome:function(){var n=this;this.isshowpage||this.$showLoading(),this.$newrequest.post("/coc-active/api/v1/newExpert/expertIndex").then((function(t){200===t.code?n.detail=t.data:e.showToast({title:t.message,icon:"none",duration:2e3})})).finally((function(e){n.isshowpage||(n.isshowpage=!0,n.$hideLoading())}))},queryNoticeList:function(){var n=this;this.$newrequest.post("/coc-active/api/v1/newExpert/untruthBroadcastMessageList",{current:1,size:99,displayLocation:1}).then((function(t){200===t.code?n.noticeList=t.data.map((function(e){return e.content})):e.showToast({title:t.message,icon:"none",duration:2e3})}))},queryRankingList:function(n){var t=this;this.$newrequest.post("/coc-merchant-app/app/v2/home_page/merchant/power/list",{type:n}).then((function(i){200===i.code?5===n?t.rankList=i.data:6===n&&(t.hotList=i.data):e.showToast({title:i.message,icon:"none",duration:2e3})}))},closeQrcode:function(){this.showVisble=!1},showQrcode:function(){this.showVisble=!this.showVisble},onWebView:function(){e.navigateTo({url:"/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/talent_business_policy.html"})},jumpWisemanSmallStore:function(){e.navigateTo({url:"/pages/wiseman/darenxiaodian/index"})},jumpFollowFans:function(n){e.navigateTo({url:"/pages/wiseman/specialarea/myfriends?type=".concat(n)})},jumpMessage:function(){e.navigateTo({url:"/pages/wiseman/specialarea/message"})},jumpRecommendedShopQrcode:function(){e.navigateTo({url:"/pages/wiseman/inviteinbusiness"})},jumpRecommendedShop:function(){e.navigateTo({url:"/pages/wiseman/recommended_merchants"})},jumpRecommendedWiseman:function(){e.navigateTo({url:"/pages/wiseman/invitein"})},jumpOrder:function(){e.navigateTo({url:"/pages/wiseman/specialarea/order"})},jumpInCome:function(){e.navigateTo({url:"/pages/myEarnings/mainPage"})},jumpWorks:function(){e.navigateTo({url:"/pages/wiseman/mywork"})},jumpMyTeam:function(){e.navigateTo({url:"/pages/wiseman/specialarea/myteam"})},jumpflowplan:function(){e.navigateTo({url:"/pages/wiseman/flowplan/index"})},jumpCreativeCenter:function(){e.navigateTo({url:"/pages/wiseman/specialarea/creative_center"})},jumpAddPost:function(){e.navigateTo({url:"/pages/wiseman/component/addimgarticle"})},getSquareList:function(){var e=this;return(0,o.default)(a.default.mark((function n(){var t,i,o;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$request.post("/coc-active/api/v1/expert/selection/library/expert/list",{current:1,size:3});case 2:t=n.sent,i=t.data,o=[],i.records.forEach((function(e){e.type_txt=1===e.type?"活":2===e.type?"保":3===e.type?"救":4===e.type?"团":5===e.type?"套":"",o.push(e)})),e.squarerows.list=o,e.squarerows.total=i.total;case 8:case"end":return n.stop()}}),n)})))()},setObj:function(){this.getSquareList()}}};n.default=s}).call(this,t("543d")["default"])}},[["db18","common/runtime","common/vendor"]]]);