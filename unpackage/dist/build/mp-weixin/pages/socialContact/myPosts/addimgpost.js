(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/socialContact/myPosts/addimgpost"],{"1acf":function(t,i,e){},"5f2d":function(t,i,e){"use strict";e.r(i);var n=e("daae"),o=e("71c0");for(var s in o)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return o[t]}))}(s);e("9b2c");var a=e("f0c5"),u=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);i["default"]=u.exports},"71c0":function(t,i,e){"use strict";e.r(i);var n=e("9798"),o=e.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(s);i["default"]=o.a},"8bfe":function(t,i,e){"use strict";(function(t,i){var n=e("4ea4");e("4319");n(e("66fd"));var o=n(e("5f2d"));t.__webpack_require_UNI_MP_PLUGIN__=e,i(o.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},9798:function(t,i,e){"use strict";(function(t){var n=e("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var o=n(e("2eee")),s=n(e("c973")),a={components:{},data:function(){return{shoptitle:"",shopid:"",activityid:null,activitytitle:"",groupid:null,grouptitle:"",type:null,isshow:!0,istrue:!0,showload:!1,dataList:{title:"",content:"",showType:"1",imgs:[],isInsertVote:0,votesTitle:"",duration:""},fileList1:[]}},onLoad:function(){var i=this,e=this.getOpenerEventChannel();e.on("sendinfo",(function(t){t.data.filter((function(t){i.fileList1.push({url:t,status:"success",message:""})}))})),t.$on("choosegroup",(function(t){i.type=1,i.grouptitle=t.title,i.groupid=t.id,i.isshow=!1})),t.$on("chooseactivity",(function(t){i.type=2,i.activitytitle=t.title,i.activityid=t.activityId,i.isshow=!1})),t.$on("chooseshop",(function(t){console.log(t),i.type=3,i.shoptitle=t.baseName,i.shopid=t.id,i.isshow=!1}))},onShow:function(){},methods:{OnPushshopList:function(){t.navigateTo({url:"/pages/socialContact/myPosts/shoplist"})},OnAgain:function(){1==this.type?t.navigateTo({url:"/pages/socialContact/myPosts/groupList"}):3==this.type?t.navigateTo({url:"/pages/socialContact/myPosts/shoplist"}):t.navigateTo({url:"/pages/socialContact/myPosts/activityList"})},OnPushActivity:function(){t.navigateTo({url:"/pages/socialContact/myPosts/activityList"})},OnPushGroup:function(){t.navigateTo({url:"/pages/socialContact/myPosts/groupList"})},save:function(){var i=this;1==this.type?(this.dataList.citeId=this.groupid,this.dataList.citeType=1):2==this.type?(this.dataList.citeId=this.activityid,this.dataList.citeType=2):3==this.type&&(this.dataList.citeShopId=this.shopid),this.$request.post("/coc-social/api/v1/article/addArticle",this.dataList).then((function(e){200==e.code?(i.showload=!1,i.$refs.uToast.show({message:"发布成功",type:"success",complete:function(){t.redirectTo({url:"/pages/activity/activityRegistration/playfulperson?"})}})):(i.showload=!1,i.istrue=!0,i.$refs.uToast.show({message:e.message,type:"error"}))}))},uploadFilePromise:function(){var i=this,e=this;this.showload=!0,e.dataList.imgs=[],this.fileList1.filter((function(t,i){t.index=i}));var n=[],o=this.fileList1.map((function(i){return console.log(i),new Promise((function(e,o){t.uploadFile({url:getApp().globalData.uploadUrl,filePath:i.url,name:"file",formData:{file:i.url},success:function(t){n.push({index:i.index,data:JSON.parse(t.data).data}),e(t)}})}))}));Promise.all(o).then((function(t){var o=n.sort((function(t,i){return t.index-i.index}));o.filter((function(t){e.dataList.imgs.push(t.data)})),i.save()}))},OnSend:function(){return!!this.istrue&&(0==this.fileList1.length?(this.$refs.uToast.show({message:"发布贴文最少添加一张图片"}),!1):this.dataList.title?(this.istrue=!1,void this.uploadFilePromise()):(this.$refs.uToast.show({message:"请填写标题"}),!1))},OnChoose:function(t){this.dataList.showType=t},deletePic:function(t){this["fileList".concat(t.name)].splice(t.index,1)},afterRead:function(t){var i=this;return(0,s.default)(o.default.mark((function e(){var n;return o.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=[].concat(t.file),n.map((function(t,e){i.fileList1.push({url:t.url,status:"success",message:""})}));case 2:case"end":return e.stop()}}),e)})))()}}};i.default=a}).call(this,e("543d")["default"])},"9b2c":function(t,i,e){"use strict";var n=e("1acf"),o=e.n(n);o.a},daae:function(t,i,e){"use strict";e.d(i,"b",(function(){return o})),e.d(i,"c",(function(){return s})),e.d(i,"a",(function(){return n}));var n={"u-Input":function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u--input/u--input")]).then(e.bind(null,"e709"))},uDivider:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(e.bind(null,"4e62"))},"u-Textarea":function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(e.bind(null,"a746"))},uUpload:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-upload/u-upload")]).then(e.bind(null,"8f994"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"f23e"))},uToast:function(){return e.e("uni_modules/uview-ui/components/u-toast/u-toast").then(e.bind(null,"4bf8"))},uLoadingIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(e.bind(null,"8a2a"))}},o=function(){var t=this.$createElement;this._self._c},s=[]}},[["8bfe","common/runtime","common/vendor"]]]);