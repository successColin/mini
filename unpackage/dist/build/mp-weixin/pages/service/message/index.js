(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/message/index"],{"02c7":function(e,n,t){"use strict";(function(e,n){var i=t("4ea4");t("4319");i(t("66fd"));var a=i(t("ee16"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},1459:function(e,n,t){"use strict";t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return i}));var i={uNavbar:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-navbar/u-navbar")]).then(t.bind(null,"45e8"))},uSearch:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-search/u-search")]).then(t.bind(null,"ea79"))}},a=function(){var e=this,n=e.$createElement,t=(e._self._c,e.dataList.systemAnnouncement.newTime?e.gettiem(e.dataList.systemAnnouncement.newTime):null),i=e.dataList.eventAnnouncement.newTime?e.gettiem(e.dataList.eventAnnouncement.newTime):null,a=e.__map(e.dataList.lists,(function(n,t){var i=e.__get_orig(n),a=n.newTime?e.gettiem(n.newTime):null;return{$orig:i,m2:a}}));e.$mp.data=Object.assign({},{$root:{m0:t,m1:i,l0:a}})},s=[]},"38c0":function(e,n,t){},"4d4a":function(e,n,t){"use strict";t.r(n);var i=t("afe2"),a=t.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(s);n["default"]=a.a},"5b01":function(e,n,t){"use strict";var i=t("38c0"),a=t.n(i);a.a},afe2:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=t("7dcd"),a={components:{},data:function(){return{a:!1,name:"",dataList:{}}},onLoad:function(){},onShow:function(){this.getList(),this.connectSocket()},methods:{connectSocket:function(){var n=this,t=(0,i.getstorage)("userId");e.connectSocket({url:"ws://172.16.91.149：28082/ws/queue/"+t,data:function(){return{x:"",y:""}},header:{"content-type":"application/json"},method:"GET",success:function(){e.onSocketMessage((function(e){var t=JSON.parse(e.data);if(200==t.code)if(0==t.type)if(0==n.dataList.lists.length)n.dataList.lists=[{count:t.count,id:t.id,headImg:t.headImg,newTime:t.newTime,newTitle:t.newTitle,nickname:t.nickname,type:t.type}];else{n.a=!1,n.dataList.lists.filter((function(e,i){e.id==t.id?(n.dataList.lists[i].count=t.count,n.dataList.lists[i].newTime=t.newTime,n.dataList.lists[i].newTitle=t.newTitle,n.a=!0):e.id!=t.id&&n.dataList.lists.push({count:t.count,id:t.id,headImg:t.headImg,newTime:t.newTime,newTitle:t.newTitle,nickname:t.nickname,type:t.type})}));for(var i=0;i<n.dataList.lists.length;i++)for(var a=i+1;a<n.dataList.lists.length;a++)n.dataList.lists[i].id==n.dataList.lists[a].id&&(n.dataList.lists.splice(a,1),a--)}else 1==t.type?n.dataList.systemAnnouncement.push({count:t.count,id:t.id,headImg:t.headImg,newTime:t.newTime,newTitle:t.newTitle,nickname:t.nickname,type:t.type}):2==t.type&&n.dataList.eventAnnouncement.push({count:t.count,id:t.id,headImg:t.headImg,newTime:t.newTime,newTitle:t.newTitle,nickname:t.nickname,type:t.type})}))}})},OnPushInfo:function(n){e.navigateTo({url:"/pages/service/message/detail?type=0?type=0",success:function(e){e.eventChannel.emit("getinfo",{data:n})}})},OnPushDiscount:function(){var n={id:null,nickname:"优惠福利"};e.navigateTo({url:"/pages/service/message/detail?type=2",success:function(e){e.eventChannel.emit("getinfo",{data:n})}})},OnPushservice:function(){var n={id:null,nickname:"服务通知"};e.navigateTo({url:"/pages/service/message/detail?type=1",success:function(e){e.eventChannel.emit("getinfo",{data:n})}})},gettiem:function(e){var n=Date.parse(e),t=864e5,i=(new Date).getTime(),a=i-n;if(!(a<0)){var s=a/2592e6,c=a/(7*t),u=a/t,o=a/36e5,r=a/6e4,d="";return d=s>=1?parseInt(s)+"月前":c>=1?parseInt(c)+"周前":u>=1?parseInt(u)+"天前":o>=1?parseInt(o)+"小时前":r>=1?parseInt(r)+"分钟前":"刚刚",d}},OnMyManager:function(){e.navigateTo({url:"/pages/my/myManager/index"})},getList:function(){var e=this;this.$request.post("/coc-active/api/v1/news/findMessages",{name:this.name}).then((function(n){e.dataList=n.data}))}}};n.default=a}).call(this,t("543d")["default"])},ee16:function(e,n,t){"use strict";t.r(n);var i=t("1459"),a=t("4d4a");for(var s in a)["default"].indexOf(s)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(s);t("5b01");var c=t("f0c5"),u=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=u.exports}},[["02c7","common/runtime","common/vendor"]]]);