(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/socialContact/myPosts/addpost"],{1615:function(t,e,o){"use strict";o.r(e);var n=o("3906"),i=o.n(n);for(var a in n)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return n[t]}))}(a);e["default"]=i.a},3906:function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o("7dcd"),i={components:{},data:function(){return{showloading:!1,day:"",hour:"",branch:"",optionContent:[],radiovalue1:"1",isvote:!1,imgArr:[],video:"",dataList:{imgs:[],title:"",content:"",showType:"1",isInsertVote:0,votesTitle:"",duration:"",optionContent:[{},{}]},avatar:"",groupId:""}},onLoad:function(t){t.groupId&&(this.groupId=t.groupId),this.avatar=(0,n.getstorage)("headImg")},onShow:function(){},methods:{Onsave:function(){var e=this;return 1===this.dataList.isInsertVote&&(this.dataList.optionContent=this.optionContent,this.dataList.duration=864e5*this.day+36e5*this.hour+6e4*this.branch),0==this.dataList.isInsertVote&&delete this.dataList.optionContent,this.groupId&&(this.dataList.groupId=this.groupId),0==this.dataList.imgs.length?(this.$refs.uToast.show({message:"发布贴文最少添加一张图片"}),!1):(this.dataList.imgs=this.dataList.imgs.join(","),this.dataList.title?(this.showloading=!0,void this.$request.post("/coc-social/api/v1/article/addArticle",this.dataList).then((function(o){200==o.code?(e.showloading=!1,e.$refs.uToast.show({message:"发布成功",type:"success",complete:function(){t.navigateBack({delta:1})}})):(e.showloading=!1,e.$refs.uToast.show({message:o.message,type:"error",complete:function(){t.navigateBack({delta:1})}}))}))):(this.$refs.uToast.show({message:"请填写标题"}),!1))},groupChange:function(t){this.dataList.showType=t},Detailvideo:function(){this.video=!1},DetailImg:function(t){this.imgArr.splice(t,1),this.dataList.imgs.splice(t,1)},Onremovevote:function(){this.isvote=!1,this.dataList.isInsertVote=0},Deleteitem:function(){this.dataList.optionContent.length<3?this.$refs.uToast.show({type:"error",message:"最少2个选项"}):(this.dataList.optionContent.pop(),this.optionContent.pop())},Additem:function(){if(this.dataList.optionContent.length>8)this.$refs.uToast.show({type:"error",message:"最多9个选项"});else{Number(this.dataList.optionContent+1);this.dataList.optionContent.push({})}},Onvote:function(){this.dataList.isInsertVote=1,this.isvote=!0},OnchoooseVideo:function(){var e=this;t.chooseVideo({sourceType:["camera","album"],success:function(o){e.showloading=!0,t.uploadFile({url:getApp().globalData.uploadUrl,filePath:o.tempFilePath,name:"file",formData:{file:o.tempFilePath},header:{"Content-Type":"multipart/form-data"},success:function(t){e.video=JSON.parse(t.data).data,e.dataList.video=JSON.parse(t.data).data,e.showloading=!1}})}})},OnchoooseImg:function(){var e=this;t.chooseImage({count:9,sizeType:["compressed"],sourceType:["album"],success:function(o){e.showloading=!0,o.tempFilePaths.filter((function(n,i){e.imgArr.push(n),t.uploadFile({url:getApp().globalData.uploadUrl,filePath:n,name:"file",formData:{file:n},header:{"Content-Type":"multipart/form-data"},success:function(t){e.dataList.imgs.push(JSON.parse(t.data).data),i==o.tempFilePaths.length-1&&(e.showloading=!1)}})}))}})}}};e.default=i}).call(this,o("543d")["default"])},6925:function(t,e,o){"use strict";o.d(e,"b",(function(){return i})),o.d(e,"c",(function(){return a})),o.d(e,"a",(function(){return n}));var n={uAvatar:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(o.bind(null,"6d2c"))},"u-Input":function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u--input/u--input")]).then(o.bind(null,"e709"))},"u-Textarea":function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(o.bind(null,"a746"))},uIcon:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(o.bind(null,"f23e"))},uTag:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-tag/u-tag")]).then(o.bind(null,"bfd6"))},uRadioGroup:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(o.bind(null,"35d2"))},uRadio:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(o.bind(null,"df92"))},uLoadingPage:function(){return Promise.all([o.e("common/vendor"),o.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(o.bind(null,"fbb6"))},uToast:function(){return o.e("uni_modules/uview-ui/components/u-toast/u-toast").then(o.bind(null,"4bf8"))}},i=function(){var t=this,e=t.$createElement,o=(t._self._c,t.isvote?t.__map(t.dataList.optionContent,(function(e,o){var n=t.__get_orig(e),i=Number(o+1);return{$orig:n,m0:i}})):null);t.$mp.data=Object.assign({},{$root:{l0:o}})},a=[]},b58f:function(t,e,o){"use strict";o.r(e);var n=o("6925"),i=o("1615");for(var a in i)["default"].indexOf(a)<0&&function(t){o.d(e,t,(function(){return i[t]}))}(a);o("bf5c");var s=o("f0c5"),u=Object(s["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=u.exports},bf5c:function(t,e,o){"use strict";var n=o("db87"),i=o.n(n);i.a},db87:function(t,e,o){},f171:function(t,e,o){"use strict";(function(t,e){var n=o("4ea4");o("4319");n(o("66fd"));var i=n(o("b58f"));t.__webpack_require_UNI_MP_PLUGIN__=o,e(i.default)}).call(this,o("bc2e")["default"],o("543d")["createPage"])}},[["f171","common/runtime","common/vendor"]]]);