(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tabbar/index"],{bf46:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("7dcd"),i={components:{noticebar:function(){n.e("pages/home/components/noticeBar/index").then(function(){return resolve(n("e332"))}.bind(null,n)).catch(n.oe)}},props:{routePath:{type:String,required:!0}},created:function(){t.hideTabBar()},mounted:function(){var t=this,e=(0,a.getstorage)("menuconfiglist");e?this.initmenu(JSON.parse(e)):this.$request.post("/coc-active/api/v2/homePage/menuTag/list").then((function(n){e={},n.data.forEach((function(t){e[t.menuKey]=t.tag?t.tag.split(",").map((function(t){return{text:t}})):[]})),(0,a.setstorage)("menuconfiglist",JSON.stringify(e)),t.initmenu(e)}))},data:function(){return{tabbarHeight:0,tabBarList:[]}},methods:{initmenu:function(){var e=this,i=JSON.parse((0,a.getstorage)("menuconfiglist"));this.tabBarList=[{pagePath:"pages/home/index",iconPath:n("054f"),selectedIconPath:n("cf6b"),text:"首页",tabs:i["applets_exciting_first_look"]?i["applets_exciting_first_look"]:[],isshow:Object.keys(i).findIndex((function(t){return"applets_exciting_first_look"===t}))>=0},{pagePath:"pages/home/xjl/index",iconPath:n("97bc"),selectedIconPath:n("2b25c"),text:"51学驾",tabs:i["applets_drive_car"]?i["applets_drive_car"]:[],isshow:Object.keys(i).findIndex((function(t){return"applets_drive_car"===t}))>=0},{pagePath:"carrental",iconPath:n("0b94"),selectedIconPath:n("0b94"),text:"51租车",tabs:i["applets_installment_buy_car"]?i["applets_installment_buy_car"]:[],isshow:Object.keys(i).findIndex((function(t){return"applets_installment_buy_car"===t}))>=0},{pagePath:"pages/home/51carOther/index",iconPath:n("5bfc"),selectedIconPath:n("a16d"),text:"51购车",tabs:i["applets_installment_buy_car"]?i["applets_installment_buy_car"]:[],isshow:Object.keys(i).findIndex((function(t){return"applets_installment_buy_car"===t}))>=0},{pagePath:"pages/home/my",iconPath:n("218d"),selectedIconPath:n("760a"),text:"我的",tabs:i["applets_my"]?i["applets_my"]:[],isshow:Object.keys(i).findIndex((function(t){return"applets_my"===t}))>=0}],setTimeout((function(){t.createSelectorQuery().in(e).select(".tab-bar").boundingClientRect((function(t){e.$emit("input",t.height)})).exec()}),50)},selectTabBar:function(e){console.log(e),"carrental"===e?t.navigateToMiniProgram({appId:"wx3433be59ccbad45d",extraData:{foo:"bar"},success:function(t){}}):t.switchTab({url:"/"+e})}}};e.default=i}).call(this,n("543d")["default"])},d50f:function(t,e,n){"use strict";var a=n("ea08"),i=n.n(a);i.a},db36:function(t,e,n){"use strict";n.r(e);var a=n("f43b"),i=n("ff14");for(var c in i)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(c);n("d50f");var s=n("f0c5"),o=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"4b9aed23",null,!1,a["a"],void 0);e["default"]=o.exports},ea08:function(t,e,n){},f43b:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.tabBarList,(function(e,n){var a=t.__get_orig(e),i=e.isshow?e.tabs.length:null;return{$orig:a,g0:i}})));t.$mp.data=Object.assign({},{$root:{l0:n}})},i=[]},ff14:function(t,e,n){"use strict";n.r(e);var a=n("bf46"),i=n.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tabbar/index-create-component',
    {
        'components/tabbar/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("db36"))
        })
    },
    [['components/tabbar/index-create-component']]
]);