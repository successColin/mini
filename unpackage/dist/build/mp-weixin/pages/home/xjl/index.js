(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/xjl/index"],{"1da5":function(t,e,n){"use strict";var i=n("6b8c"),o=n.n(i);o.a},2766:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("76b1");i(n("66fd"));var o=i(n("f874"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"54cb":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}));var i={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"0f14"))},uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"d838"))}},o=function(){var t=this.$createElement;this._self._c},a=[]},"6b8c":function(t,e,n){},"6fb6":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n("04ff"),o={components:{carousel:function(){Promise.all([n.e("common/vendor"),n.e("components/carousel/index")]).then(function(){return resolve(n("7662"))}.bind(null,n)).catch(n.oe)},tabbar:function(){Promise.all([n.e("common/vendor"),n.e("components/tabbar/index")]).then(function(){return resolve(n("a91c"))}.bind(null,n)).catch(n.oe)}},computed:{contentHeight:function(){return"calc(100vh - ".concat(this.tabbarHeight,"px)")},loadhelpBottom:function(){return"calc(".concat(this.tabbarHeight,"px + 100rpx)")}},data:function(){return{schoolList:[],teacherList:[],circleList:[],page:1,isLoadMore:!1,visitinto:null,tabbarHeight:0}},onHide:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onUnload:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onLoad:function(){this.getschoollist(),this.getteacherlist(),this.getarticlelist()},onShow:function(){var e=this;t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_into",{type:11}).then((function(t){e.visitinto=t}))},methods:{scrolltolower:function(){this.isLoadMore||(this.page++,this.getarticlelist())},OnPusharticleDetail:function(e){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/article/detail?id="+e.id})},OnPushArticle:function(){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/article/index"})},OnPushTeacherDetail:function(e){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/teacher/detail?id="+e.id})},OnPushTeacherList:function(){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/teacher/alllist"})},OnPushSchoolDetail:function(e){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/school/detail?id="+e.id})},OnPushSchoolList:function(){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/school/index"})},getarticlelist:function(){var t=this;this.$xjlrequest.get("/user/learn/drive/circle/list?page_size=20&page="+this.page+"&token=").then((function(e){e.data.length<20&&(t.isLoadMore=!0),1==t.page?t.circleList=e.data:e.data.filter((function(e){t.circleList.push(e)}))}))},scroll:function(){if(!t.getStorageSync("xjltoken")&&!t.getStorageSync("token"))return t.navigateTo({url:"/pages/activity/share/index"}),!1;t.navigateTo({url:"/pages/xjl/school/index"})},getteacherlist:function(){var t=this;this.$xjlrequest.get("/user/home/new_teacher_lists?type=1&lng="+(0,i.getstorage)("lng")+"&lat="+(0,i.getstorage)("lat")).then((function(e){t.teacherList=e.data}))},getschoollist:function(){var t=this;this.$xjlrequest.get("/user/home/new_school_lists?type=1&token=&lng="+(0,i.getstorage)("lng")+"&lat="+(0,i.getstorage)("lat")).then((function(e){t.schoolList=e.data}))}}};e.default=o}).call(this,n("543d")["default"])},a283:function(t,e,n){"use strict";n.r(e);var i=n("6fb6"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},f874:function(t,e,n){"use strict";n.r(e);var i=n("54cb"),o=n("a283");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("1da5");var r=n("f0c5"),c=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=c.exports}},[["2766","common/runtime","common/vendor"]]]);