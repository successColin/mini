(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/myFeedback/index"],{"188d":function(e,t,n){"use strict";n.r(t);var i=n("88cd"),a=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);t["default"]=a.a},"1c66":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("4319");i(n("66fd"));var a=i(n("6bd7"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(a.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},2163:function(e,t,n){},"4b29":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return i}));var i={"u-Textarea":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--textarea/u--textarea")]).then(n.bind(null,"a746"))},uParse:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-parse/u-parse")]).then(n.bind(null,"5dcf"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"e709"))},uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"4bf8"))}},a=function(){var e=this.$createElement;this._self._c},u=[]},"6bd7":function(e,t,n){"use strict";n.r(t);var i=n("4b29"),a=n("188d");for(var u in a)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return a[e]}))}(u);n("8265");var s=n("f0c5"),r=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);t["default"]=r.exports},8265:function(e,t,n){"use strict";var i=n("2163"),a=n.n(i);a.a},"88cd":function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("2eee")),u=i(n("9523")),s=i(n("c973"));function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){(0,u.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var c={components:{},data:function(){return{info:{},type:"",fileList1:[],dataList:{imgs:"",complaintContent:"",mobile:""}}},onLoad:function(t){if(2==t.type)this.type=t.type;else{this.type=t.type;var n=this,i=this.getOpenerEventChannel();i.on("getinfo",(function(t){e.$u.sleep(0).then((function(){n.info=t.data}))}))}},onShow:function(){},methods:{getdate:function(e){var t=e.substring(5,10);return t},gettiem:function(e){var t=Date.parse(e),n=864e5,i=(new Date).getTime(),a=i-t;if(!(a<0)){var u=a/2592e6,s=a/(7*n),r=a/n,o=a/36e5,c=a/6e4,l="";return l=u>=1?parseInt(u)+"月前":s>=1?parseInt(s)+"周前":r>=1?parseInt(r)+"天前":o>=1?parseInt(o)+"小时前":c>=1?parseInt(c)+"分钟前":"刚刚",l}},OnSubmit:function(){var t=this,n=new RegExp("^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-9])|(18[0-9])|166|198|199|191|(147))\\d{8}$");return this.dataList.complaintContent?n.test(this.dataList.mobile)?(this.fileList1.filter((function(e,n){t.dataList.imgs=0==n?e.url:t.dataList.imgs+","+e.url})),this.dataList.type=this.type,1==this.type&&(this.dataList.objId=this.info.activity.id,this.dataList.objType=1),void this.$request.post("/coc-my/api/v1/my/complaint/management/add",this.dataList).then((function(n){200==n.code&&t.$refs.uToast.show({type:"success",message:"反馈成功",complete:function(){e.navigateBack({delta:1})}})}))):(this.$refs.uToast.show({type:"default",message:"请输入正确格式手机号码"}),!1):(this.$refs.uToast.show({type:"default",message:"请输入反馈意见"}),!1)},deletePic:function(e){this["fileList".concat(e.name)].splice(e.index,1)},afterRead:function(e){var t=this;return(0,s.default)(a.default.mark((function n(){var i,u,s,r,c;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:i=[].concat(e.file),u=t["fileList".concat(e.name)].length,i.map((function(n){t["fileList".concat(e.name)].push(o(o({},n),{},{status:"uploading",message:"上传中"}))})),s=0;case 4:if(!(s<i.length)){n.next=14;break}return n.next=7,t.uploadFilePromise(i[s].url);case 7:r=n.sent,c=t["fileList".concat(e.name)][u],t["fileList".concat(e.name)].splice(u,1,Object.assign(c,{status:"success",message:"",url:r})),u++;case 11:s++,n.next=4;break;case 14:case"end":return n.stop()}}),n)})))()},uploadFilePromise:function(t){return new Promise((function(n,i){e.uploadFile({url:getApp().globalData.uploadUrl,filePath:t,name:"file",formData:{user:"test"},success:function(e){setTimeout((function(){n(JSON.parse(e.data).data)}),0)}})}))}}};t.default=c}).call(this,n("543d")["default"])}},[["1c66","common/runtime","common/vendor"]]]);