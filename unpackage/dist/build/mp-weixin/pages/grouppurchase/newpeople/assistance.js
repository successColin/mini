(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/newpeople/assistance"],{"021a":function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("4319");i(n("66fd"));var a=i(n("a91d"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"0e6b":function(t,e,n){},2247:function(t,e,n){"use strict";n.r(e);var i=n("cba1"),a=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=a.a},"39f1":function(t,e,n){"use strict";var i=n("0e6b"),a=n.n(i);a.a},"5fad":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return i}));var i={uNavbar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(n.bind(null,"45e8"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"f23e"))},uCountDown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(n.bind(null,"e517"))},uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"6d2c"))}},a=function(){var t=this.$createElement;this._self._c},u=[]},a91d:function(t,e,n){"use strict";n.r(e);var i=n("5fad"),a=n("2247");for(var u in a)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(u);n("39f1");var s=n("f0c5"),o=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=o.exports},cba1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={components:{},data:function(){return{userInitiateAssistId:0,dataList:{endTimeL:9e4},timeData:0,num:0,arrynull:[],currentdata:{},istimeend:!0}},onLoad:function(t){this.userInitiateAssistId=t.userInitiateAssistId,this.getList();var e=this,n=this.getOpenerEventChannel();n.on("getinfo",(function(t){e.currentdata=t.data,e.currentdata.allmealprice=e.currentdata.mealprice}))},onShow:function(){},onShareAppMessage:function(t){return{title:"分享助力",path:"/pages/grouppurchase/newpeople/helpindex?userInitiateAssistId="+this.userInitiateAssistId,imageUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230318/file_1679101807444.png"}},methods:{OnPushweb:function(){t.navigateTo({url:"/pages/activity/GoPdf/webview?url=https://h5.dcqcjlb.com/protocol/activity_rules.html"})},OnPushreturn:function(){this.$request.put("/coc-active/api/v1/group/initiateAssistAgain/"+this.userInitiateAssistId).then((function(e){200==e.code&&t.navigateTo({url:"/pages/grouppurchase/newpeople/index"})}))},OnPushList:function(){var e=this;e.currentdata.userInitiateAssistId=this.userInitiateAssistId,t.navigateTo({url:"/pages/grouppurchase/payindex?isnew=1&istype=wx",success:function(t){t.eventChannel.emit("getinfo",{data:e.currentdata})}})},onChange:function(t){this.timeData=t,0==t.days&&0==t.hours&&0==t.minutes&&0==t.seconds&&(this.istimeend=!1)},getList:function(){var t=this;this.$request.get("/coc-active/api/v1/group/getAssistDetails/"+this.userInitiateAssistId).then((function(e){t.num=e.data.needPersonNum-e.data.assistPersonNum;for(var n=0;n<e.data.needPersonNum;n++)t.arrynull.push([]);t.dataList=e.data}))}}};e.default=n}).call(this,n("543d")["default"])}},[["021a","common/runtime","common/vendor"]]]);