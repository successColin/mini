(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/activity/activityRegistration/components/videolist"],{"2226a":function(e,t,i){"use strict";var n=i("bd43"),o=i.n(n);o.a},6516:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"f23e"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"076f"))},uAvatar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(i.bind(null,"6d2c"))},"u-Input":function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u--input/u--input")]).then(i.bind(null,"e709"))},"u-Textarea":function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(i.bind(null,"a746"))},uUpload:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-upload/u-upload")]).then(i.bind(null,"8f994"))},uActionSheet:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-action-sheet/u-action-sheet")]).then(i.bind(null,"9f65"))}},o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.showcomment=!1},e.e1=function(t){e.showcommentpop=!0},e.e2=function(t){e.showreply=!1},e.e3=function(t){e.showcommentpop=!1},e.e4=function(t){e.showsheet=!1})},s=[]},7221:function(e,t,i){"use strict";i.r(t);var n=i("6516"),o=i("dc00");for(var s in o)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(s);i("2226a");var a=i("f0c5"),c=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=c.exports},bd43:function(e,t,i){},c4d8:function(e,t,i){"use strict";(function(e){var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("2eee")),s=n(i("9523")),a=n(i("c973"));function c(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,n)}return i}function r(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?c(Object(i),!0).forEach((function(t){(0,s.default)(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}var u={data:function(){return{isshowitem:!0,list:[{name:"贴文删除",color:"#D91B1B",fontSize:"20"},{name:"取消",fontSize:"20"}],showsheet:!1,userId:"",imgsbig:"",fileList:[],showcommentpop:!1,showreply:!1,chosecomment:{},showload:!1,showcomment:!1,index:"",endid:"",id:"",changid:"",isplay:!1,swiperindex:0,textcontent:"",replyid:"",popimgs:!1,isshowpage:!1}},onLoad:function(e){},onShow:function(){},props:{dataList:{type:Array}},methods:{animationfinish:function(){console.log("结束的"),this.isshowitem=!0},Onpushuserinfo:function(t){1==t.article.isExpert?1==t.article.expertStatus?e.$u.toast("该用户被封禁"):e.navigateTo({url:"/pages/wiseman/component/shopinfo?type=1&userId="+t.article.userId}):e.navigateTo({url:"/pages/wiseman/component/shopinfo?type=2&userId="+t.article.userId})},Onfollow:function(t){var i=this;this.$request.post("/coc-social/api/v2/article/followExpert",{userId:t.article.userId}).then((function(n){200==n.code?(e.$u.toast("操作成功"),i.getnewdata(t.article.id)):e.$u.toast(n.message)}))},getchangdi:function(e){this.changid=e},getonload:function(){e.getStorageSync("userId")&&(this.userId=e.getStorageSync("userId"))},OnSelectsheet:function(t){var i=this;"贴文删除"==t.name&&this.$request.post("/coc-social/api/v2/article/addArticle",{articleId:this.changid,articleUserId:this.userId}).then((function(t){200==t.code?(e.$u.toast("删除成功"),setTimeout((function(){i.$emit("detailvideo",i.changid)}),1e3)):e.$u.toast(t.message)}))},Onshowsheet:function(){this.showsheet=!0},delComments:function(t,i){var n=this;this.$request.post("/coc-active/api/v1/comments/delComments",{id:t}).then((function(t){200==t.code?(e.$u.toast("删除成功"),n.getnewdata(i.article.id)):n.$refs.uToast.show({message:t.message})}))},closeimg:function(){this.popimgs=!1},OnOpenImg:function(e){this.imgsbig=e.imgs,this.popimgs=!0},Onreplyfirst:function(t){var i=this,n=[];this.fileList.length>0&&(n=[this.fileList[0].url]),this.$request.post("/coc-social/api/v2/article/comment",{commentType:2,content:this.textcontent,id:t.article.id,imgs:n}).then((function(n){200==n.code?(i.textcontent="",i.showcommentpop=!1,i.getnewdata(t.article.id)):e.$u.toast(n.message)}))},uploadFilePromise:function(t){return new Promise((function(i,n){e.uploadFile({url:getApp().globalData.uploadUrl,filePath:t,name:"file",formData:{user:"test"},success:function(e){setTimeout((function(){i(JSON.parse(e.data).data)}),0)}})}))},afterRead:function(e){var t=this;return(0,a.default)(o.default.mark((function i(){var n,s,a,c;return o.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:n=[].concat(e.file),n.map((function(e,i){t.fileList.push(r(r({},e),{},{status:"uploading",message:"上传中",uploadstatus:!1}))})),s=0;case 3:if(!(s<t.fileList.length)){i.next=16;break}if(a=t.fileList[s],"uploading"!==a.status||t.fileList[s].uploadstatus){i.next=13;break}return t.fileList[s].uploadstatus=!0,i.next=9,t.uploadFilePromise(a.url);case 9:c=i.sent,t.fileList[s].url=c,t.fileList[s].status="success",t.fileList[s].message="";case 13:s++,i.next=3;break;case 16:case"end":return i.stop()}}),i)})))()},deletePic:function(e){this.fileList.splice(e.index,1)},getnewdata:function(e){var t=this;this.$request.post("coc-social/api/v1/article/findById",{current:1,id:e,size:99}).then((function(i){t.dataList.filter((function(n,o){n.article.id==e&&t.$emit("setnewvideo",o,i.data)}))}))},Onreplypop:function(){var t=this;this.$request.post("/coc-social/api/v2/article/comment",{commentType:4,content:this.textcontent,id:this.replyid}).then((function(i){200==i.code?(t.textcontent="",t.showreply=!1,t.getnewdata(t.changid)):e.$u.toast(i.message)}))},Onreply:function(e){console.log(e),this.replyid=e.commentId,this.showreply=!0},Onopencomment:function(){this.showcomment=!0},Onpushmap:function(t){e.getLocation({type:"gcj02",success:function(i){var n=t.article.lat,o=t.article.lng;e.openLocation({latitude:n,longitude:o,success:function(){console.log("success")}})}})},share:function(){var e=this;this.$request.post("/coc-social/api/v2/article/share",{id:this.changid}).then((function(t){200==t.code&&e.dataList.filter((function(t){t.article.id==e.changid&&t.article.shareBaseNum++}))}))},OnlikeBase:function(t){var i=this;this.$request.post("/coc-social/api/v2/article/like",{id:this.dataList[t].article.id}).then((function(n){200==n.code?2==i.dataList[t].article.likeType?i.$emit("likenumchange",2,t):i.$emit("likenumchange",1,t):e.showToast({title:n.message,icon:"none"})}))},OnClickVideo:function(){console.log(e.createVideoContext("videoid")),e.createVideoContext("videoid").pause()},Onpushdetail:function(t){2==t.expertShopSelection.type?e.navigateTo({url:"/pages/carShops/upkeep/detail?id="+t.expertShopSelection.relatedId+"&forwardUserId="+t.article.userId}):3==t.expertShopSelection.type?e.navigateTo({url:"/pages/roadhelp/index?forwardUserId="+t.article.userId}):1==t.expertShopSelection.type?e.navigateTo({url:"/pages/home/activityDetail/index?id="+t.expertShopSelection.relatedId+"&forwardUserId="+t.article.userId}):4==t.expertShopSelection.type?e.navigateTo({url:"/pages/grouppurchase/detail?id="+t.expertShopSelection.relatedId+"&forwardUserId="+t.article.userId}):5==t.expertShopSelection.type&&e.navigateTo({url:"/pages/activity/activityRegistration/packagedetail?id="+t.expertShopSelection.relatedId+"&forwardUserId="+t.article.userId})},change:function(t){console.log("开始变"),this.isshowitem=!1,this.showcomment=!1,this.changid=this.dataList[t.detail.current].article.id,e.$emit("changid",this.dataList[t.detail.current].article.id),this.dataList.article=this.dataList[t.detail.current].comments,this.commentList=this.isplay=!1,this.swiperindex=t.detail.current,e.createVideoContext("videoid").play(),t.detail.current/8%1===0&&this.$emit("getmorevideo")}}};t.default=u}).call(this,i("543d")["default"])},dc00:function(e,t,i){"use strict";i.r(t);var n=i("c4d8"),o=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/activity/activityRegistration/components/videolist-create-component',
    {
        'pages/activity/activityRegistration/components/videolist-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7221"))
        })
    },
    [['pages/activity/activityRegistration/components/videolist-create-component']]
]);