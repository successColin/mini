(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activity/activityRegistration/index"],{"01ca":function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=n(i("9523")),o=i("04ff"),a={components:{carousel:function(){Promise.all([i.e("common/vendor"),i.e("components/carousel/index")]).then(function(){return resolve(i("7662"))}.bind(null,i)).catch(i.oe)},pushclosedactivity:function(){i.e("pages/activity/components/pushclosedactivity").then(function(){return resolve(i("e3a8"))}.bind(null,i)).catch(i.oe)}},data:function(){var t;return t={newisshowend:!1,isshowend:!1,isActivitys:!0,systemCode:"applets_activity_registration",keyword:"",newUserLimit:0,dataList:[],tagList:[],title:"",shopTypeId:0,payType:0,current:1,categoryId:0},(0,s.default)(t,"current",1),(0,s.default)(t,"oldScrollleft",0),(0,s.default)(t,"scrollleft",0),(0,s.default)(t,"isLoadMore",!1),(0,s.default)(t,"lineBg","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC"),(0,s.default)(t,"city",""),(0,s.default)(t,"isEnd",1),t},computed:{navbarHeight:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").contentTop:0},menuHeight:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").menuHeight:0},menuTop:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").menuTop-this.statusBarHeight:0}},onLoad:function(t){this.shopTypeId=t.shopTypeId,2==t.isEnd&&(this.isEnd=2,this.payType=t.payType,this.newUserLimit=t.newUserLimit,this.shopTypeId=t.shopTypeId),1==t.type?(this.payType=1,this.newUserLimit=0,this.shopTypeId=0):2==t.type&&(this.shopTypeId=0,this.newUserLimit=1),t.value&&(this.title=t.value,this.keyword=t.value),this.getList()},onReachBottom:function(t){this.isLoadMore||this.isshowend||(this.current++,this.getList()),this.isshowend&&(this.newisshowend=!0)},onPullDownRefresh:function(){this.current=1,this.getList(),setTimeout((function(){t.stopPullDownRefresh()}),1e3)},onShow:function(){},methods:{OnPushcreditCard:function(){t.navigateTo({url:"/pages/my/creditCard/index"})},OnPushClose:function(){t.navigateTo({url:"/pages/activity/activityRegistration/index?isEnd=2&newUserLimit="+this.newUserLimit+"&payType="+this.payType+"&shopTypeId="+this.shopTypeId+"&value="+this.title})},clear:function(){var t=this;this.keyword="",this.title="",this.current=1,this.categoryId=0,this.scrollleft=this.oldScrollleft,this.$nextTick((function(){t.scrollleft=0})),this.getList()},tosearch:function(t){var e=this;this.title=t,this.categoryId=0,this.scrollleft=this.oldScrollleft,this.$nextTick((function(){e.scrollleft=0})),this.getList()},Onremind:function(e,i){(0,o.tologin)();var n=this;if(1==e.isRemind)return!1;t.requestSubscribeMessage({tmplIds:["jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q"],success:function(s){"accept"==s["jdZ2r8BMJ6YmBpnrT_jXa4chRwMWEVLpjYfCUgPnD4Q"]&&n.$request.get("/coc-active/api/v1/activity/signUpStartRemind/"+e.activityId).then((function(e){200==e.code?(n.dataList[i].isRemind=1,t.showToast({icon:"none",title:"提醒成功，请等待通知"})):t.showToast({icon:"none",title:e.message})}))}})},OnPushDetail:function(e){t.navigateTo({url:"/pages/home/activityDetail/index?id="+e.activityId})},scroll:function(t){this.oldScrollleft=t.detail.scrollLeft},OnClickitemtag:function(t){this.isLoadMore=!1,this.current=1,t.id==this.categoryId?this.categoryId=0:this.categoryId=t.id,this.getList()},goback:function(){var e=getCurrentPages();e.length>1?t.navigateBack():t.switchTab({url:"/pages/home/index"})},getList:function(){var t=this;this.$newrequest.post("/coc-active/api/v2/homePage/getActivitysV2",{categoryId:this.categoryId,current:this.current,payType:this.payType,shopTypeId:this.shopTypeId,isEnd:this.isEnd,size:20,title:this.title,newUserLimit:this.newUserLimit}).then((function(e){0==e.data.homePageActivitysVOIPage.total?t.isActivitys=!1:t.isActivitys=!0,t.tagList=e.data.activityCategories,e.data.homePageActivitysVOIPage.records.length<3&&1==t.current&&1==t.isEnd?(t.newisshowend=!0,t.isshowend=!0,t.isLoadMore=!0):e.data.homePageActivitysVOIPage.records.length<20&&1==t.isEnd?(t.isshowend=!0,t.isLoadMore=!0):e.data.homePageActivitysVOIPage.records.length<20&&(t.isLoadMore=!0),1===t.current?t.dataList=e.data.homePageActivitysVOIPage.records:e.data.homePageActivitysVOIPage.records.filter((function(e){t.dataList.push(e)}))}))}}};e.default=a}).call(this,i("543d")["default"])},"440c":function(t,e,i){"use strict";(function(t,e){var n=i("4ea4");i("76b1");n(i("66fd"));var s=n(i("e7dc"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(s.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},"59a8":function(t,e,i){},"5b72":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uSearch:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-search/u-search")]).then(i.bind(null,"ab09e"))},uAvatar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(i.bind(null,"d838"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"0f14"))}},s=function(){var t=this.$createElement;this._self._c},o=[]},"732d":function(t,e,i){"use strict";i.r(e);var n=i("01ca"),s=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=s.a},d4e6:function(t,e,i){"use strict";var n=i("59a8"),s=i.n(n);s.a},e7dc:function(t,e,i){"use strict";i.r(e);var n=i("5b72"),s=i("732d");for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("d4e6");var a=i("f0c5"),c=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=c.exports}},[["440c","common/runtime","common/vendor"]]]);