(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/component/commentlist"],{"216c":function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return u})),e.d(n,"a",(function(){return o}));var o={uAvatar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(e.bind(null,"6d2c"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"f23e"))},uPopup:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(e.bind(null,"076f"))},"u-Textarea":function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(e.bind(null,"a746"))}},i=function(){var t=this,n=t.$createElement;t._self._c;t._isMounted||(t.e0=function(n){t.showcomment=!1})},u=[]},"23e5":function(t,n,e){"use strict";e.r(n);var o=e("e9e0"),i=e.n(o);for(var u in o)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(u);n["default"]=i.a},"6a7a":function(t,n,e){"use strict";var o=e("d370"),i=e.n(o);i.a},"8d15":function(t,n,e){"use strict";e.r(n);var o=e("216c"),i=e("23e5");for(var u in i)["default"].indexOf(u)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(u);e("6a7a");var c=e("f0c5"),a=Object(c["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);n["default"]=a.exports},cb7e:function(t,n,e){"use strict";(function(t,n){var o=e("4ea4");e("4319");o(e("66fd"));var i=o(e("8d15"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(i.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},d370:function(t,n,e){},e9e0:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={components:{},data:function(){return{textcontent:"",showcomment:!1,num:0,id:"",current:1,isLoadMore:!1,dataList:[],commentid:""}},onLoad:function(t){this.id=t.id,this.num=t.num,this.getList()},onReachBottom:function(){this.isLoadMore||(this.current++,this.getList())},onShow:function(){},methods:{Onreplypop:function(){var n=this;this.$request.post("/coc-social/api/v2/article/comment",{commentType:4,content:this.textcontent,id:this.commentid}).then((function(e){200==e.code?(n.textcontent="",n.showcomment=!1,n.current=1,n.isLoadMore=!1,n.getList(),t.$u.toast("评论成功")):t.$u.toast(e.message)}))},Onreply:function(t){this.commentid=t.commentId,this.showcomment=!0},getList:function(){var t=this;this.$request.post("coc-social/api/v1/article/findById",{current:this.current,id:this.id,size:20}).then((function(n){n.data.comments.length<20&&(t.isLoadMore=!0),1==t.current?t.dataList=n.data.comments:n.data.comments.filter((function(n){t.dataList.push(n)}))}))}}};n.default=e}).call(this,e("543d")["default"])}},[["cb7e","common/runtime","common/vendor"]]]);