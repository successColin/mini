(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/index"],{"016c":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={components:{carousel:function(){Promise.all([n.e("common/vendor"),n.e("components/carousel/index")]).then(function(){return resolve(n("c969"))}.bind(null,n)).catch(n.oe)}},data:function(){return{ratenum:"5",placeholder:"搜索活动商品全网官方补贴",keyword:"",current:1,size:10,loadMore:!1,isReachBottom:!1,dataList:[],topList:[],visitinto:null,token:null,isExpert:null,currentIndex:1,searchIndex:1,searchList:[{name:"综合",status:1},{name:"销量",status:2},{name:"热度",status:3},{name:"折扣",status:4}],scrollTop:0,currentTopIndex:1,isOnly:!1,topScrollLeft:"0rpx",topScrollLeftNum:0,totaltopScrollLeft:0,topItemWidth:0,timer:null}},computed:{isSticky:function(){return this.scrollTop<this.stickyTop},stickyTop:function(){return 1==this.currentIndex?this.isOnly?t.upx2px(595):t.upx2px(625):this.isOnly?t.upx2px(120):t.upx2px(150)},topWidth:function(){return t.upx2px(630)+20}},onPageScroll:function(t){this.scrollTop=t.scrollTop},onHide:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onUnload:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){})),this.timer&&clearTimeout(this.timer)},onLoad:function(e){e.title&&(this.keyword=e.title),e.type&&(this.currentIndex=parseInt(e.type),this.isOnly=!0),2==e.type?t.setNavigationBarTitle({title:"海量商品"}):3==e.type?t.setNavigationBarTitle({title:"银行补贴"}):1==e.type&&t.setNavigationBarTitle({title:"王炸爆品"}),this.token=t.getStorageSync("token"),this.isExpert=t.getStorageSync("isExpert"),this.getList(),1==this.currentIndex&&this.getTopList()},onReachBottom:function(){this.isReachBottom||this.loadMore||(this.current++,this.getList())},onShow:function(){var e=this;t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_into",{type:8}).then((function(t){e.visitinto=t}))},methods:{onpushshop:function(e){t.navigateTo({url:"/pages/activityMall/business/index?id="+e})},selSearchType:function(t){this.searchIndex=t,this.tosearch()},OnClickType:function(t){this.placeholder=4==t?"搜索感兴趣的贴文":"搜索活动商品全网官方补贴",this.currentIndex=t,this.keyword="",this.tosearch()},getTopList:function(){var e=this;this.$newrequest.post("/coc-active/api/v1/group/list/top").then((function(n){200==n.code?(e.topList=n.data,e.$nextTick((function(){if(n.data.length>3){var i=t.createSelectorQuery().in(e);i.select(".hot_item0").boundingClientRect((function(t){e.topItemWidth=t.width+10,e.totaltopScrollLeft=(n.data.length-3)*e.topItemWidth,e.startTopTimer()})).exec()}}))):t.showToast({title:n.message,icon:"none",duration:2e3})}))},scrollTopList:function(e){var n=t.upx2px(220),i=Math.round(e.detail.scrollLeft/n);this.currentTopIndex=i+1},getList:function(){var e=this;this.loadMore=!0,1==this.currentIndex||3==this.currentIndex?this.$newrequest.post("/coc-active/api/v1/group/list/v2",{current:this.current,size:this.size,title:this.keyword,sort:this.searchIndex,groupType:1==this.currentIndex?1:2,saleType:1}).then((function(n){if(200==n.code){var i=new Date;n.data.records.filter((function(t){t.countdown=Math.abs(new Date(t.rushPurchaseEndTime)-new Date(i)),t.discount=parseFloat(t.discount)})),1===e.current?e.dataList=n.data.records:n.data.records.filter((function(t){e.dataList.push(t)})),n.data.records.length<e.size&&(e.isReachBottom=!0)}else t.showToast({title:n.message,icon:"none",duration:2e3})})).finally((function(){e.loadMore=!1})):2==this.currentIndex?this.$newrequest.post("/coc-active/api/v1/merchant/massiveMerchantMeal",{current:this.current,size:this.size,title:this.keyword}).then((function(n){200==n.code?(1===e.current?e.dataList=n.data.records:n.data.records.filter((function(t){e.dataList.push(t)})),n.data.records.length<e.size&&(e.isReachBottom=!0)):t.showToast({title:n.message,icon:"none",duration:2e3})})).finally((function(){e.loadMore=!1})):4==this.currentIndex&&this.$request.post("/coc-social/api/v2/article/myArticleList",{current:this.current,size:this.size,title:this.keyword,isQuote:1,selectionType:3,userId:0}).then((function(n){200==n.code?(n.data.records.forEach((function(t){t.imgs?t.coverPicture=t.imgs.split(",")[0]:t.articleCoverImage?t.coverPicture=t.articleCoverImage:t.video&&(t.coverPicture=t.video+"?x-oss-process=video/snapshot,t_1000,m_fast")})),1===e.current?e.dataList=n.data.records:n.data.records.filter((function(t){e.dataList.push(t)})),n.data.records.length<e.size&&(e.isReachBottom=!0)):t.showToast({title:n.message,icon:"none",duration:2e3})})).finally((function(){e.loadMore=!1}))},OnPushDetail:function(e){1==this.currentIndex||3==this.currentIndex?t.navigateTo({url:"/pages/grouppurchase/detail?id="+e}):2==this.currentIndex&&t.navigateTo({url:"/pages/grouppurchase/packagedetail?id="+e})},tosearch:function(){this.isReachBottom=!1,this.current=1,this.dataList=[],this.getList()},getPaymentTitle:function(t){var e="";return 4==t.activityPaymentPreferenceId?e="人保优惠，":5==t.activityPaymentPreferenceId?e="农行信用卡优惠，":6==t.activityPaymentPreferenceId?e="工行信用卡优惠，":7==t.activityPaymentPreferenceId?e="邮储信用卡优惠，":8==t.activityPaymentPreferenceId?e="民生信用卡优惠，":10==t.activityPaymentPreferenceId&&(e="官方补贴，超值低价，"),e&&(t.discount<=8?e+="享".concat(t.discount,"折"):e+="省".concat(t.saveMoney,"元")),e},toList:function(e){e.video?(1,t.navigateTo({url:"/pages/activity/waterfull/videolist?id="+e.articleId+"&selectionType=3"})):t.navigateTo({url:"/pages/activity/waterfull/imglist?id="+e.articleId+"&selectionType=3"})},startTopTimer:function(){var t=this;this.timer=setTimeout((function(){t.topScrollLeftNum<t.totaltopScrollLeft?t.topScrollLeftNum+=t.topItemWidth:t.topScrollLeftNum=0,t.topScrollLeft=t.topScrollLeftNum+"px",t.startTopTimer()}),5e3)}}};e.default=i}).call(this,n("543d")["default"])},"829e":function(t,e,n){},"89d2":function(t,e,n){"use strict";n.r(e);var i=n("016c"),o=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=o.a},c4ed:function(t,e,n){"use strict";var i=n("829e"),o=n.n(i);o.a},e7f2:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var i={uSearch:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-search/u-search")]).then(n.bind(null,"ea79"))},uRate:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-rate/u-rate")]).then(n.bind(null,"2b73"))},countdownTimer:function(){return n.e("components/countdown-timer/countdown-timer").then(n.bind(null,"a732"))},customWaterfallsFlow:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow")]).then(n.bind(null,"b769"))},uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"6d2c"))},uLoadingIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(n.bind(null,"8a2a"))}},o=function(){var t=this,e=t.$createElement,n=(t._self._c,(1==t.currentIndex||3==t.currentIndex)&&t.dataList.length>0),i=4==t.currentIndex&&t.dataList.length>0,o=(1==t.currentIndex||2==t.currentIndex||3==t.currentIndex)&&0==t.dataList.length,r=4==t.currentIndex&&0==t.dataList.length,s=t.dataList.length>0&&t.isReachBottom;t.$mp.data=Object.assign({},{$root:{g0:n,g1:i,g2:o,g3:r,g4:s}})},r=[]},eddc:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("4319");i(n("66fd"));var o=i(n("ef91"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},ef91:function(t,e,n){"use strict";n.r(e);var i=n("e7f2"),o=n("89d2");for(var r in o)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(r);n("c4ed");var s=n("f0c5"),a=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=a.exports}},[["eddc","common/runtime","common/vendor"]]]);