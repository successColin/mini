(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/index"],{"17dc":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={components:{carousel:function(){Promise.all([i.e("common/vendor"),i.e("components/carousel/index")]).then(function(){return resolve(i("7662"))}.bind(null,i)).catch(i.oe)},search:function(){i.e("components/search/index").then(function(){return resolve(i("7546"))}.bind(null,i)).catch(i.oe)}},data:function(){return{placeholder:"搜索活动商品全网官方补贴",keyword:"",current:1,size:10,loadMore:!1,isReachBottom:!1,dataList:[],topList:[],visitinto:null,token:null,isExpert:null,searchIndex:1,searchList:[{name:"综合",status:1},{name:"销量",status:2},{name:"价格",status:5},{name:"热度",status:3},{name:"折扣",status:4}],scrollTop:0,currentTopIndex:1,topScrollLeft:"0rpx",topScrollLeftNum:0,totaltopScrollLeft:0,topItemWidth:0,timer:null}},computed:{isSticky:function(){return this.scrollTop<this.stickyTop},stickyTop:function(){return t.upx2px(600)},topWidth:function(){return t.upx2px(630)+20}},onPageScroll:function(t){this.scrollTop=t.scrollTop},onHide:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onUnload:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){})),this.timer&&clearTimeout(this.timer)},onLoad:function(e){e.title&&(this.keyword=e.title),t.setNavigationBarTitle({title:"优惠团购"}),this.token=t.getStorageSync("token"),this.isExpert=t.getStorageSync("isExpert"),this.getList(),this.getTopList()},onReachBottom:function(){this.isReachBottom||this.loadMore||(this.current++,this.getList())},onShow:function(){var e=this;t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_into",{type:8}).then((function(t){e.visitinto=t}))},methods:{selSearchType:function(t){this.searchIndex=t,this.tosearch()},getTopList:function(){var e=this;this.$newrequest.post("/coc-active/api/v1/group/list/top").then((function(i){200==i.code?(e.topList=i.data,e.$nextTick((function(){if(i.data.length>3){var n=t.createSelectorQuery().in(e);n.select(".hot_item0").boundingClientRect((function(t){e.topItemWidth=t.width+10,e.totaltopScrollLeft=(i.data.length-3)*e.topItemWidth,e.startTopTimer()})).exec()}}))):t.showToast({title:i.message,icon:"none",duration:2e3})}))},scrollTopList:function(e){var i=t.upx2px(220),n=Math.round(e.detail.scrollLeft/i);this.currentTopIndex=n+1},getList:function(){var e=this;this.loadMore=!0,this.$newrequest.post("/coc-active/api/v1/group/list/v2",{current:this.current,size:this.size,title:this.keyword,sort:this.searchIndex,saleType:1}).then((function(i){if(200==i.code){var n=new Date;i.data.records.filter((function(t){t.countdown=Math.abs(new Date(t.rushPurchaseEndTime)-new Date(n)),t.discount=parseFloat(t.discount)})),1===e.current?e.dataList=i.data.records:i.data.records.filter((function(t){e.dataList.push(t)})),i.data.records.length<e.size&&(e.isReachBottom=!0)}else t.showToast({title:i.message,icon:"none",duration:2e3})})).finally((function(){e.loadMore=!1}))},OnPushDetail:function(e){t.navigateTo({url:"/pages/grouppurchase/detail?id="+e})},search:function(t){this.keyword=t,this.tosearch()},tosearch:function(){this.isReachBottom=!1,this.current=1,this.dataList=[],this.getList()},getPaymentTitle:function(t){var e="";return 4==t.activityPaymentPreferenceId?e="人保优惠，":5==t.activityPaymentPreferenceId?e="农行信用卡优惠，":6==t.activityPaymentPreferenceId?e="工行信用卡优惠，":7==t.activityPaymentPreferenceId?e="邮储信用卡优惠，":8==t.activityPaymentPreferenceId?e="民生信用卡优惠，":10==t.activityPaymentPreferenceId&&(e="官方补贴，超值低价，"),e&&(t.discount<=8?e+="享".concat(t.discount,"折"):e+="省".concat(t.saveMoney,"元")),e},toList:function(e){e.video?(1,t.navigateTo({url:"/pages/activity/articlevideo/index?id="+e.articleId+"&selectionType=3"})):t.navigateTo({url:"/pages/activity/waterfull/imglist?id="+e.articleId+"&selectionType=3"})},startTopTimer:function(){var t=this;this.timer=setTimeout((function(){t.topScrollLeftNum<t.totaltopScrollLeft?t.topScrollLeftNum+=t.topItemWidth:t.topScrollLeftNum=0,t.topScrollLeft=t.topScrollLeftNum+"px",t.startTopTimer()}),5e3)}}};e.default=n}).call(this,i("543d")["default"])},"2c72":function(t,e,i){},"442c":function(t,e,i){"use strict";(function(t,e){var n=i("4ea4");i("76b1");n(i("66fd"));var o=n(i("e8f8"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(o.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},4750:function(t,e,i){"use strict";var n=i("2c72"),o=i.n(n);o.a},"87bd":function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return c})),i.d(e,"a",(function(){return n}));var n={countdownTimer:function(){return i.e("components/countdown-timer/countdown-timer").then(i.bind(null,"4478"))},uLoadingIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(i.bind(null,"db21"))}},o=function(){var t=this.$createElement,e=(this._self._c,this.dataList.length),i=this.dataList.length,n=this.dataList.length>0&&this.isReachBottom;this.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})},c=[]},b1c4:function(t,e,i){"use strict";i.r(e);var n=i("17dc"),o=i.n(n);for(var c in n)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(c);e["default"]=o.a},e8f8:function(t,e,i){"use strict";i.r(e);var n=i("87bd"),o=i("b1c4");for(var c in o)["default"].indexOf(c)<0&&function(t){i.d(e,t,(function(){return o[t]}))}(c);i("4750");var r=i("f0c5"),s=Object(r["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=s.exports}},[["442c","common/runtime","common/vendor"]]]);