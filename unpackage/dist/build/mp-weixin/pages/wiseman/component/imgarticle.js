(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/component/imgarticle"],{"0787":function(t,i,e){"use strict";e.r(i);var a=e("77f7"),n=e("1b88");for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);e("6397");var c=e("f0c5"),r=Object(c["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);i["default"]=r.exports},"1b88":function(t,i,e){"use strict";e.r(i);var a=e("6d1f"),n=e.n(a);for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(s);i["default"]=n.a},"4db6":function(t,i,e){"use strict";(function(t,i){var a=e("4ea4");e("4319");a(e("66fd"));var n=a(e("0787"));t.__webpack_require_UNI_MP_PLUGIN__=e,i(n.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},"4e11":function(t,i,e){},6397:function(t,i,e){"use strict";var a=e("4e11"),n=e.n(a);n.a},"6d1f":function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var a={components:{imgcomponent:function(){Promise.all([e.e("common/vendor"),e.e("pages/wiseman/component/imgcomponent")]).then(function(){return resolve(e("5f8b"))}.bind(null,e)).catch(e.oe)}},data:function(){return{isshowpage:!1,endid:"",id:"",userId:"",changid:0,viewheight:0,dataList:[]}},onLoad:function(i){this.id=i.id,this.changid=i.id;var e=t.getSystemInfoSync(),a=e.screenHeight;this.viewheight=2*a,this.getdetail(),this.userId=t.getStorageSync("userId");var n=this;t.$on("changelike",(function(t){1==t.likeType?(n.dataList[t.index].article.likeType=1,n.dataList[t.index].article.likeBaseNum=n.dataList[t.index].article.likeBaseNum+1):2==t.likeType&&(n.dataList[t.index].article.likeType=2,n.dataList[t.index].article.likeBaseNum=n.dataList[t.index].article.likeBaseNum+-1)}))},onShow:function(){},onShareAppMessage:function(i){var e=this;this.share();var a="";return this.dataList.filter((function(t){t.article.id==e.changid&&(a=t.article.title)})),{title:a,path:"/pages/wiseman/component/imgarticle?id="+this.changid,success:function(i){t.showToast({title:"分享成功"})},fail:function(i){t.showToast({title:"分享失败",icon:"none"})}}},onShareTimeline:function(i){var e=this;this.share();var a="";return this.dataList.filter((function(t){t.article.id==e.changid&&(a=t.article.title)})),{title:a,path:"/pages/wiseman/component/imgarticle?id="+this.changid,success:function(i){t.showToast({title:"分享成功"})},fail:function(i){t.showToast({title:"分享失败",icon:"none"})}}},methods:{getnewdata:function(t){var i=this;this.$request.post("coc-social/api/v1/article/findById",{current:1,id:t,size:3}).then((function(e){e.data.article.imgarr=e.data.article.imgs.split(","),i.dataList.filter((function(a,n){a.article.id==t&&i.$set(i.dataList,n,e.data)}))}))},sendid:function(t){this.getnewdata(t.article.id)},share:function(){var t=this;this.$request.post("/coc-social/api/v2/article/share",{id:this.changid}).then((function(i){200==i.code&&t.dataList.filter((function(i){i.article.id==t.changid&&i.article.shareBaseNum++}))}))},getdetail:function(){var t=this;this.isshowpage||this.$showLoading();var i=this;this.$request.post("coc-social/api/v1/article/findById",{current:1,id:this.id,size:99}).then((function(e){e.data.article.imgarr=e.data.article.imgs.split(","),t.dataList.push(e.data),setTimeout((function(){i.getList()}),100)}))},getList:function(){var t=this;this.$request.post("/coc-social/api/v2/article/ids",{id:this.id}).then((function(i){10==i.data.length&&(t.endid=i.data[9].article.id),i.data.filter((function(t){t.article.imgarr=t.article.imgs.split(",")})),i.data.filter((function(i){t.dataList.push(i)}))})).catch((function(t){})).finally((function(){t.isshowpage||(t.isshowpage=!0,t.$hideLoading())}))},change:function(t){var i=this;this.changid=this.dataList[t.detail.current].article.id;t.detail.current/9%1===0&&this.$request.post("/coc-social/api/v2/article/ids",{id:this.endid}).then((function(t){i.endid=t.data[9].article.id,t.data.filter((function(t){t.article.imgarr=t.article.imgs.split(",")})),t.data.filter((function(t){i.dataList.push(t)}))}))}}};i.default=a}).call(this,e("543d")["default"])},"77f7":function(t,i,e){"use strict";e.d(i,"b",(function(){return a})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){}));var a=function(){var t=this.$createElement;this._self._c},n=[]}},[["4db6","common/runtime","common/vendor"]]]);