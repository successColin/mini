(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/home/components/rescuestory"],{"08ba":function(t,e,i){"use strict";i.r(e);var n=i("4eb0"),a=i.n(n);for(var r in n)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(r);e["default"]=a.a},"4eb0":function(t,e,i){"use strict";(function(t){var n=i("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n(i("2eee")),r=n(i("c973")),o={data:function(){return{list:[]}},created:function(){this.getList()},methods:{Onpushdetail:function(e){t.navigateTo({url:"/pages/activity/foursvideo/index?id="+e.id+"&type=1"})},getList:function(){var t=this;return(0,r.default)(a.default.mark((function e(){var i,n;return a.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request.post("/coc-active/api/v1/video/list",{current:1,size:100,type:1});case 2:i=e.sent,n=i.data.records,t.list=n;case 5:case"end":return e.stop()}}),e)})))()},toClick:function(){t.navigateTo({url:"/pages/activity/foursvideo/index?id="+this.list[0].id+"&type=1"})},loadedmetadata:function(t,e){var i=this,n=t.detail.duration,a=JSON.parse(JSON.stringify(this.list));a.forEach((function(t){e.id===t.id&&(t.time=i.toHourMinute(n))})),this.list=a},toHourMinute:function(t){var e="";return t=Math.trunc(t),0===Math.floor(t/60)?e=t>10?"00:"+t%60:"00:0"+t%60:(e=Math.floor(t/60)>10?Math.floor(t/60):"0"+Math.floor(t/60),Math.floor(t%60)>10?e+=":"+Math.floor(t%60):e+=":0"+Math.floor(t%60)),e}}};e.default=o}).call(this,i("543d")["default"])},6029:function(t,e,i){"use strict";var n=i("77d0"),a=i.n(n);a.a},"77d0":function(t,e,i){},"7fd6":function(t,e,i){"use strict";i.r(e);var n=i("be25"),a=i("08ba");for(var r in a)["default"].indexOf(r)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(r);i("6029");var o=i("f0c5"),u=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"0d7a69c8",null,!1,n["a"],void 0);e["default"]=u.exports},be25:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement,e=(this._self._c,this.list&&this.list.length>0);this.$mp.data=Object.assign({},{$root:{g0:e}})},a=[]}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/home/components/rescuestory-create-component',
    {
        'pages/home/components/rescuestory-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7fd6"))
        })
    },
    [['pages/home/components/rescuestory-create-component']]
]);
