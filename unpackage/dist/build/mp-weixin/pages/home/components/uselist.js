(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/components/uselist"],{"0c5d7":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("7dcd"),s={components:{noticebar:function(){i.e("pages/home/components/noticeBar/index").then(function(){return resolve(i("e332"))}.bind(null,i)).catch(i.oe)}},data:function(){return{menulist:{},list:[{id:"applets_group_purchase",url:"/pages/grouppurchase/index",image:"https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721303615.png",image_class:"w56h56",title:"优惠团购",title_class:"mt6"},{id:"applets_outdoor_activity",url:"/pages/activity/activityRegistration/outdoorsactivity",image:"https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693222957376.png",image_class:"w56h56",title:"户外畅游",title_class:"mt6"},{id:"applets_indoor_activity",url:"/pages/activity/activityRegistration/indooractivity",image:"https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223102477.png",image_class:"w56h56",title:"户内嗨乐",title_class:"mt6"},{id:1,url:"/pages/activityMall/list",image:"https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695021125305.png",image_class:"w56h56",title:"海量游乐",title_class:"mt6"},{id:"applets_4s_activity",url:"/pages/carShops/4sShop/index",image:"https://oss.dcqcjlb.com/51che_java_dev/20230828/file_1693223201093.png",image_class:"w56h56",title:"4S店逛逛",title_class:"mt6"},{id:"applets_wise_man_recommend",url:"/pages/activity/activityRegistration/playfulperson",image:"https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684721370724.png",image_class:"w56h56",title:"达人推荐",title_class:"mt6"},{id:"applets_new_person",url:"/pages/grouppurchase/newpeople/index",image:"https://oss.dcqcjlb.com/51che_java_dev/20230829/file_1693269302091.png",image_class:"w56h56",title:"新人专享",title_class:"mt6"},{id:"applets_score_shop",url:"/pages/home/integral",image:"https://oss.dcqcjlb.com/51che_java_dev/20230522/file_1684720980383.png",image_class:"w56h56",title:"积分兑换",title_class:"mt6"},{id:2,url:"/pages/grouppurchase/index?type=3",image:"https://oss.dcqcjlb.com/51che_java_dev/20230918/file_1695019431377.png",image_class:"w56h56",title:"银行特惠",title_class:"mt6"},{id:3,url:"/pages/roadhelp/faultAbout/faultSearch",image:"https://oss.dcqcjlb.com/51che_java_dev/20230901/file_1693536736674.png",image_class:"w56h56",title:"故障咨询",title_class:"mt6"}]}},props:{city:{type:String,default:""}},onLoad:function(){},onShow:function(){},created:function(){this.getList()},methods:{getList:function(){var t=this;this.$request.post("/coc-active/api/v2/homePage/menuTag/list").then((function(e){var i={};e.data.forEach((function(t){i[t.menuKey]=t.tag?t.tag.split(",").map((function(t){return{text:t}})):[]})),t.menulist=i}))},toClick:function(e){if(!(0,a.getstorage)("token")&&e.token)return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.setStorageSync("qShopBobile",""),t.setStorageSync("qShopName",""),t.navigateTo({url:e.url})}}};e.default=s}).call(this,i("543d")["default"])},"2bd6":function(t,e,i){"use strict";var a=i("ef4b"),s=i.n(a);s.a},"613f":function(t,e,i){"use strict";i.r(e);var a=i("0c5d7"),s=i.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(c);e["default"]=s.a},be56:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=(t._self._c,t.__map(t.list,(function(e,i){var a=t.__get_orig(e),s=t.menulist[e.id]&&t.menulist[e.id].length>0;return{$orig:a,g0:s}})));t.$mp.data=Object.assign({},{$root:{l0:i}})},s=[]},de08:function(t,e,i){"use strict";i.r(e);var a=i("be56"),s=i("613f");for(var c in s)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(c);i("2bd6");var n=i("f0c5"),l=Object(n["a"])(s["default"],a["b"],a["c"],!1,null,"32a983e6",null,!1,a["a"],void 0);e["default"]=l.exports},ef4b:function(t,e,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/home/components/uselist-create-component',
    {
        'pages/home/components/uselist-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("de08"))
        })
    },
    [['pages/home/components/uselist-create-component']]
]);
