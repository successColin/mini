require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/darenxiaodian/index"],{"13ba":function(e,t,n){"use strict";n.r(t);var o=n("3c47"),s=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=s.a},3389:function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("76b1");o(n("66fd"));var s=o(n("85d2"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(s.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"3c47":function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n("2eee")),a=o(n("c973")),r={components:{square:function(){n.e("pages/wiseman/darenxiaodian/components/square").then(function(){return resolve(n("bc7d"))}.bind(null,n)).catch(n.oe)},goods:function(){n.e("pages/wiseman/darenxiaodian/components/goods").then(function(){return resolve(n("38e8"))}.bind(null,n)).catch(n.oe)},share:function(){n.e("pages/wiseman/darenxiaodian/components/share").then(function(){return resolve(n("ebd4"))}.bind(null,n)).catch(n.oe)},lookgoods:function(){n.e("pages/wiseman/darenxiaodian/components/lookgoods").then(function(){return resolve(n("7891"))}.bind(null,n)).catch(n.oe)},overlayloadingicon:function(){n.e("pages/wiseman/darenxiaodian/components/overlayloadingicon").then(function(){return resolve(n("4223"))}.bind(null,n)).catch(n.oe)}},data:function(){return{type:void 0,preview:"0",info:{userId:"",backImage:"https://oss.dcqcjlb.com/51che_java_dev/20230816/file_1692169916276.png",headImg:"https://51xiaojingling.oss-cn-hangzhou.aliyuncs.com/51che_java_dev/20221014/ed79357b28b44d9d8eaa99a41ae4e41e.jpg",shopName:"",intro:"该店主尚未添加简介",tagsList:[],posterDesc:"",posterShareUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230831/file_1693451973736.jpg",followType:0},obj:{relatedName:"",lockTypeV3:"",lockType:"",sort:1,current:1,size:50},squarerows:{list:[],total:0},goodrows:{list:[],total:0},good:{obj:{},rows:{data:[],total:0}},share:!1,userId:void 0,showload:!1,show:!0}},onLoad:function(t){var n=this;console.log("进来了===========》",JSON.stringify(t),t),t.enter&&e.setStorageSync("enter",t.enter),t.scene&&t.scene.indexOf("_enter=117")&&e.setStorageSync("enter","117"),this.preview=t.preview,t.scene?(this.userId=t.scene,this.setObj("userId",t.scene),this.type=2):(t.info&&(this.type=2,this.show=!1,this.getInfo(t.info)),this.getGoodList()),e.$on("drxdupdate",(function(){n.obj={relatedName:"",lockTypeV3:"",lockType:"",sort:1,current:1,size:50},n.setObj()})),e.$on("drxdsearch",(function(e){n.setObj("relatedName",e)}))},onShow:function(){this.getDetails()},beforeDestroy:function(){e.$off("drxdupdate"),e.$off("drxdsearch")},methods:{toBack:function(){var t=getCurrentPages();t.length>1?e.navigateBack():e.switchTab({url:"/pages/home/index"})},isPreview:function(){if("1"===this.preview)throw Error("")},getInfo:function(e){var t=this;this.info={},this.$nextTick((function(){t.info=JSON.parse(e)}))},toRenovation:function(){this.isPreview(),e.navigateTo({url:"/pages/wiseman/darenxiaodian/renovation?info="+JSON.stringify(this.info)})},toSearch:function(){this.isPreview(),e.navigateTo({url:"/pages/wiseman/darenxiaodian/search?name="+this.obj.relatedName})},getDetails:function(){var e=this;return(0,a.default)(s.default.mark((function t(){var n,o,a;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isPreview(),n=e.userId?{userId:e.userId}:{},t.next=4,e.$request.post("/coc-active/api/v1/newExpert/shop",n);case 4:o=t.sent,a=o.data,a.tagsList=0===a.tags.length?[]:a.tagsList,e.info=e.compare(a,e.info);case 8:case"end":return t.stop()}}),t)})))()},setObj:function(e,t){e&&(this.obj[e]=t),"userId"===e&&(this.obj.status=1),this.obj.current=1,this.goodrows={list:[],total:0},this.getGoodList()},getGoodList:function(){var e=this;return(0,a.default)(s.default.mark((function t(){var n,o,a;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request.post("/coc-active/api/v1/expert/shop/selection/list",e.obj);case 2:n=t.sent,o=n.data,a=JSON.parse(JSON.stringify(e.goodrows.list)),o.records.forEach((function(e){3!==e.status&&(e.type_txt=1===e.type?"活":2===e.type?"保":3===e.type?"救":4===e.type?"团":5===e.type?"套":"",a.push(e))})),e.goodrows.list=a,e.goodrows.total=o.total,2!==e.type&&(0===a.length&&""===e.obj.lockTypeV3&&""===e.obj.relatedName?(e.type=0,e.getSquareList()):e.type=1);case 9:case"end":return t.stop()}}),t)})))()},getSquareList:function(){var e=this;return(0,a.default)(s.default.mark((function t(){var n,o,a;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request.post("/coc-active/api/v1/expert/selection/library/expert/list",{current:1,size:5,sort:8});case 2:n=t.sent,o=n.data,a=JSON.parse(JSON.stringify(e.squarerows.list)),o.records.forEach((function(e){e.type_txt=1===e.type?"活":2===e.type?"保":3===e.type?"救":4===e.type?"团":5===e.type?"套":"",a.push(e)})),e.squarerows.list=a,e.squarerows.total=o.total;case 8:case"end":return t.stop()}}),t)})))()},setSort:function(e){this.obj.relatedName="",this.setObj("sort",e)},setTab:function(e){this.obj.relatedName="",delete this.obj.shopCategoryId,this.setObj("lockTypeV3",e)},setShopCategoryTab:function(e){this.obj.relatedName="",delete this.obj.lockType,this.setObj("shopCategoryId",e)},onScrollToLower:function(){this.goodrows.total>this.obj.current*this.obj.size&&(this.obj.current+=1,this.getGoodList())},compare:function(e,t){var n={};return Object.keys(t).forEach((function(o){"number"===typeof e[o]?n[o]=e[o]:n[o]=e[o]||t[o]})),n},setShare:function(){this.share=!0},setAttention:function(){var e=this;return(0,a.default)(s.default.mark((function t(){var n,o;return s.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.isPreview(),e.showload=!0,t.next=4,e.$request.post("/coc-social/api/v2/article/followExpert",{userId:e.obj.userId});case 4:n=t.sent,o=n.code,200===o&&(e.$refs.uToast.show({message:0===e.info.followType?"关注成功":"取关成功",type:"success"}),e.getDetails()),e.showload=!1;case 8:case"end":return t.stop()}}),t)})))()}}};t.default=r}).call(this,n("543d")["default"])},"56fb":function(e,t,n){"use strict";var o=n("6860"),s=n.n(o);s.a},6860:function(e,t,n){},"85d2":function(e,t,n){"use strict";n.r(t);var o=n("8f33"),s=n("13ba");for(var a in s)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(a);n("56fb");var r=n("f0c5"),i=Object(r["a"])(s["default"],o["b"],o["c"],!1,null,"392d483b",null,!1,o["a"],void 0);t["default"]=i.exports},"8f33":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"1b13"))}},s=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.share=!1})},a=[]}},[["3389","common/runtime","common/vendor"]]]);