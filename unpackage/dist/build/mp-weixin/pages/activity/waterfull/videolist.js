(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activity/waterfull/videolist"],{"0071":function(t,i,e){"use strict";var s=e("9977"),n=e.n(s);n.a},8983:function(t,i,e){"use strict";e.r(i);var s=e("a704"),n=e.n(s);for(var o in s)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return s[t]}))}(o);i["default"]=n.a},9977:function(t,i,e){},a704:function(t,i,e){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s=e("7dcd"),n={components:{carousel:function(){Promise.all([e.e("common/vendor"),e.e("components/carousel/index")]).then(function(){return resolve(e("c969"))}.bind(null,e)).catch(e.oe)},videolist:function(){Promise.all([e.e("common/vendor"),e.e("pages/activity/waterfull/components/videolist")]).then(function(){return resolve(e("b1315"))}.bind(null,e)).catch(e.oe)}},data:function(){return{userId:"",isQuote:null,type:1,showpopadd:!1,isarticle:!0,keyword:"",dataList:[],videoList:[],imgList:[],current:1,isLoadMore:!1,visitinto:null,tagcurrent:1,videocurrent:1,imgcurrent:1,articleId:null,newuserid:null,selectionType:null,quoteType:null,lineBg:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAAGCAYAAABThMdSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQyIDc5LjE2MDkyNCwgMjAxNy8wNy8xMy0wMTowNjozOSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBNEE4OTg4MjhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBNEE4OTg4MzhDOEYxMUVEQkUxODkxMjU3MTBGOEZCMSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkE0QTg5ODgwOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkE0QTg5ODgxOEM4RjExRURCRTE4OTEyNTcxMEY4RkIxIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6oq/SwAAAPVJREFUeNqkUtsNwjAMjJPyBRt0I8Qf/+yB+GYe5mEQKqBtjINscbIMUkWkax52Lr6e6dr3q5TSUbATbASTYBaMgqfiLnjomZ0Pem4xyxsgNup8g3uWP+l+gjdZ54ak+wprTp/BnXxOggOQZL3QZoJkgn1VItI8BsH2WIZ7xsW6Lq7AaPCP2Ju3Ee0DEoZi2RVPLsZOCDnRFdYoKOL9VnAoIgckVkgFK+1RcydBgTNwEcTMfuStMFP6c7QHL2pjdkor/M0OckrgSglaLDv7OSjYO0VLRLWizrreCtbur7Lr8RyIK+oGtlp1Aihox+RiS53glwADAIjGYd2iTm4WAAAAAElFTkSuQmCC"}},computed:{navbarHeight:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").contentTop:0},menuHeight:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").menuHeight:0},menuTop:function(){return t.getStorageSync("menuInfo")?t.getStorageSync("menuInfo").menuTop-this.statusBarHeight:0}},onHide:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onUnload:function(){t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_exit",{userVisitId:this.visitinto}).then((function(t){}))},onLoad:function(i){var e=this;i.selectionType&&(this.selectionType=i.selectionType),1==i.type?(t.setNavigationBarTitle({title:"娱乐精选"}),this.isQuote=0,this.quoteType=i.quoteType):2==i.type&&(t.setNavigationBarTitle({title:"达人推荐"}),this.isQuote=1,this.quoteType=i.quoteType),this.userId=t.getStorageSync("userId"),this.articleId=i.id,this.getbyId(i.id,1),i.userId&&(this.newuserid=i.userId),t.$on("changelike",(function(t){1==t.likeType?(e.imgList[t.index].article.likeType=1,e.imgList[t.index].article.likeBaseNum=e.imgList[t.index].article.likeBaseNum+1):2==t.likeType&&(e.imgList[t.index].article.likeType=2,e.imgList[t.index].article.likeBaseNum=e.imgList[t.index].article.likeBaseNum+-1)})),t.$on("changid",(function(t){e.articleId=t}))},onReachBottom:function(){this.isLoadMore||0==this.type&&(this.current++,this.getList())},onShow:function(){var i=this;t.getStorageSync("token")&&this.$request.post("/coc-active/api/v1/user/behavior/visit_into",{type:5}).then((function(t){i.visitinto=t}))},onShareAppMessage:function(i){this.share();var e="/pages/activity/waterfull/videolist?id="+this.articleId;return{path:e,title:"",success:function(i){t.showToast({title:"分享成功"})},fail:function(i){t.showToast({title:"分享失败",icon:"none"})}}},onShareTimeline:function(i){this.share();var e="/pages/activity/waterfull/videolis?id="+this.articleId;return{path:e,success:function(i){t.showToast({title:"分享成功"})},fail:function(i){t.showToast({title:"分享失败",icon:"none"})}}},methods:{share:function(){var t=this;1!=this.type&&2!=this.type||this.$newrequest.post("/coc-social/api/v2/article/share",{id:this.articleId}).then((function(i){200==i.code&&(1==t.type?t.videoList.filter((function(i,e){t.articleId==i.article.id&&i.article.shareBaseNum++})):t.imgList.filter((function(i,e){t.articleId==i.article.id&&i.article.shareBaseNum++})))}))},getbyId:function(t,i){var e=this;this.$request.post("coc-social/api/v1/article/findById",{current:1,id:t,size:99}).then((function(s){2==i?(s.data.article.imgarr=s.data.article.imgs.split(","),e.imgList.push(s.data),e.getotherimgList(t)):(e.videoList.push(s.data),e.getothervideoList(t))}))},OnPushPostDetail:function(t){t.video?(this.videoList=[],this.tagcurrent=1,this.type=1,this.getbyId(t.articleId,1)):(this.imgList=[],this.tagcurrent=2,this.type=2,this.getbyId(t.articleId,2))},changefollowType:function(t){1==this.imgList[t].article.followType?this.imgList[t].article.followType=2:this.imgList[t].article.followType=1},change:function(t){this.articleId=this.imgList[t.detail.current].article.id,t.detail.current/9%1===0&&(this.imgcurrent++,this.getimgList())},sendid:function(t){var i=this;this.$newrequest.post("coc-social/api/v1/article/findById",{current:1,id:t.article.id,size:3}).then((function(e){e.data.article.imgarr=e.data.article.imgs.split(","),i.imgList.filter((function(s,n){s.article.id==t.article.id&&i.$set(i.imgList,n,e.data)}))}))},deleteimg:function(t){var i=this;this.imgList.filter((function(e,s){e.article.id==t&&i.imgList.splice(s,1)}))},detailvideo:function(t){var i=this;this.videoList.filter((function(e,s){e.article.id==t&&i.videoList.splice(s,1)}))},setnewvideo:function(t,i){this.$set(this.videoList,t,i)},likenumchange:function(t,i){2==t?(this.videoList[i].article.likeType=1,this.videoList[i].article.likeBaseNum=this.videoList[i].article.likeBaseNum+1):(this.videoList[i].article.likeType=2,this.videoList[i].article.likeBaseNum=this.videoList[i].article.likeBaseNum-1)},getmorevideo:function(){this.videocurrent++,this.getvideoList()},getotherimgList:function(t){var i=this;this.$newrequest.post("/coc-social/api/v2/article/articleList",{current:this.imgcurrent,size:10,type:2,articleId:t,userId:this.newuserid,isQuote:this.isQuote,selectionType:this.selectionType}).then((function(t){t.data.records.filter((function(t){t.article.imgarr=t.article.imgs.split(",")})),t.data.records.filter((function(t){i.imgList.push(t)}))}))},getimgList:function(){var t=this,i=this;1==this.imgcurrent&&(this.$showLoading(),setTimeout((function(){i.$hideLoading()}),3e3)),this.$newrequest.post("/coc-social/api/v2/article/articleList",{current:this.imgcurrent,size:10,type:2,userId:this.newuserid,isQuote:this.isQuote,selectionType:this.selectionType}).then((function(i){1==t.imgcurrent&&(t.articleId=i.data.records[0].article.id),i.data.records.filter((function(t){t.article.imgarr=t.article.imgs.split(",")})),i.data.records.filter((function(i){t.imgList.push(i)}))}))},getothervideoList:function(t){var i=this,e=this;this.$newrequest.post("/coc-social/api/v2/article/articleList",{current:this.videocurrent,size:10,type:1,articleId:t,userId:this.newuserid,isQuote:this.isQuote,selectionType:this.selectionType,quoteType:this.quoteType}).then((function(t){1==i.videocurrent&&(e.$refs.videolist.getonload(),e.$refs.videolist.getchangdi(t.data.records[0].article.id),t.data.records.filter((function(t){i.videoList.push(t)})))}))},getvideoList:function(){var t=this,i=this;1==this.videocurrent&&(this.$showLoading(),setTimeout((function(){i.$hideLoading()}),3e3)),this.$newrequest.post("/coc-social/api/v2/article/articleList",{current:this.videocurrent,size:10,type:1,userId:this.newuserid,isQuote:this.isQuote,selectionType:this.selectionType,quoteType:this.quoteType}).then((function(e){1==t.videocurrent?(t.articleId=e.data.records[0].article.id,i.$refs.videolist.getonload(),i.$refs.videolist.getchangdi(e.data.records[0].article.id),e.data.records.filter((function(i){t.videoList.push(i)}))):e.data.records.filter((function(i){t.videoList.push(i)}))}))},OnAddpost:function(){(0,s.tologin)(),t.redirectTo({url:"/pages/wiseman/component/addimgarticle?isold=1",success:function(t){}})},clear:function(){this.current=1,this.isLoadMore=!1,this.dataList=[],this.keyword="",this.getList()},tosearch:function(t){this.current=1,this.isLoadMore=!1,this.dataList=[],this.keyword=t,this.$refs.waterfallsFlowRef.refresh(),this.getList()},getList:function(){var t=this;this.$newrequest.post("/coc-social/api/v2/article/myArticleList",{size:10,current:this.current,title:this.keyword,userId:0}).then((function(i){0==i.data.total?t.isarticle=!1:t.isarticle=!0,i.data.records.filter((function(t,i){t.imgs?t.coverPicture=t.imgs.split(",")[0]:t.coverPicture=t.video+"?x-oss-process=video/snapshot,t_1000,m_fast"})),i.data.records.length<10&&(t.isLoadMore=!0),1==t.current?t.dataList=i.data.records:i.data.records.filter((function(i){t.dataList.push(i)}))}))}}};i.default=n}).call(this,e("543d")["default"])},b350:function(t,i,e){"use strict";e.d(i,"b",(function(){return s})),e.d(i,"c",(function(){return n})),e.d(i,"a",(function(){}));var s=function(){var t=this.$createElement;this._self._c},n=[]},b85e:function(t,i,e){"use strict";e.r(i);var s=e("b350"),n=e("8983");for(var o in n)["default"].indexOf(o)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(o);e("0071");var r=e("f0c5"),c=Object(r["a"])(n["default"],s["b"],s["c"],!1,null,null,null,!1,s["a"],void 0);i["default"]=c.exports},fc0a:function(t,i,e){"use strict";(function(t,i){var s=e("4ea4");e("4319");s(e("66fd"));var n=s(e("b85e"));t.__webpack_require_UNI_MP_PLUGIN__=e,i(n.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])}},[["fc0a","common/runtime","common/vendor"]]]);