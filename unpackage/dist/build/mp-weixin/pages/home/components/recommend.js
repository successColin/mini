(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/components/recommend"],{"31ef":function(t,e,o){"use strict";var n=o("eceb"),a=o.n(n);a.a},"5f9f1":function(t,e,o){"use strict";(function(t){var n=o("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(o("2eee")),r=n(o("c973")),i={components:{},data:function(){return{rows:{list:[],total:0},obj:{current:1,size:10,userId:0},bottomStatus:!1}},props:{},created:function(){var e=this;this.getList(),t.$on("updatedata",(function(){e.obj.current=1,e.rows.list=[],e.rows.total=0,e.getList()})),t.$on("recommend",(function(){e.rows.total>e.obj.current*e.obj.size?(e.obj.current+=1,e.getList()):e.bottomStatus=!0}))},destroyed:function(){t.$off("updatedata"),t.$off("recommend")},methods:{getList:function(){var t=this;return(0,r.default)(a.default.mark((function e(){var o,n,r,i,s;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request.post("/coc-social/api/v2/article/myArticleList",t.obj);case 2:o=e.sent,n=o.data,r=n.records,i=n.total,s=JSON.parse(JSON.stringify(t.rows.list)),r.forEach((function(t){t.imgs?t.coverPicture=t.imgs.split(",")[0]:t.articleCoverImage?t.coverPicture=t.articleCoverImage:t.video&&(t.coverPicture=t.video+"?x-oss-process=video/snapshot,t_1000,m_fast"),s.push(t)})),t.rows.list=s,t.rows.total=i;case 10:case"end":return e.stop()}}),e)})))()},toClick:function(){t.navigateTo({url:"/pages/activity/activityRegistration/playfulperson"})},toList:function(e){e.video?(1,t.navigateTo({url:"/pages/activity/waterfull/videolist?id="+e.articleId})):t.navigateTo({url:"/pages/activity/waterfull/imglist?id="+e.articleId})}}};e.default=i}).call(this,o("543d")["default"])},"7175a":function(t,e,o){"use strict";o.r(e);var n=o("97c0"),a=o("a562");for(var r in a)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return a[t]}))}(r);o("31ef");var i=o("f0c5"),s=Object(i["a"])(a["default"],n["b"],n["c"],!1,null,"1b7ae760",null,!1,n["a"],void 0);e["default"]=s.exports},"97c0":function(t,e,o){"use strict";o.d(e,"b",(function(){return a})),o.d(e,"c",(function(){return r})),o.d(e,"a",(function(){return n}));var n={customWaterfallsFlow:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/custom-waterfalls-flow/components/custom-waterfalls-flow/custom-waterfalls-flow")]).then(o.bind(null,"b769"))},uAvatar:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(o.bind(null,"6d2c"))}},a=function(){var t=this.$createElement,e=(this._self._c,this.rows.list&&this.rows.list.length>0);this.$mp.data=Object.assign({},{$root:{g0:e}})},r=[]},a562:function(t,e,o){"use strict";o.r(e);var n=o("5f9f1"),a=o.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},eceb:function(t,e,o){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/home/components/recommend-create-component',
    {
        'pages/home/components/recommend-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7175a"))
        })
    },
    [['pages/home/components/recommend-create-component']]
]);
