(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/inviteinbusiness"],{"76b1":function(t,e,n){},b70d:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={components:{},data:function(){return{index:0,imglist:[],dataList:[],isshowpage:!1}},onShareAppMessage:function(e){var n=t.getStorageSync("nickname")+"邀请您入驻51车俱乐部";return{title:n,imageUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693017266630.jpg",path:"/pages/Settlein/welcomevue?sourceType=1&operateId="+t.getStorageSync("userId"),success:function(e){t.showToast({title:"分享朋友成功"})},fail:function(e){t.showToast({title:"分享朋友失败",icon:"none"})}}},onShareTimeline:function(e){return{title:t.getStorageSync("nickname")+"邀请您入驻51车俱乐部",imageUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230826/file_1693017266630.jpg",path:"/pages/Settlein/welcomevue?sourceType=1&operateId="+t.getStorageSync("userId"),success:function(e){t.showToast({title:"分享朋友圈成功"})},fail:function(e){t.showToast({title:"分享朋友圈失败",icon:"none"})}}},onLoad:function(){this.getList()},onShow:function(){},methods:{OnSaveImage:function(){t.showToast({title:"正在保存中",icon:"loading"}),t.downloadFile({url:this.imglist[this.index],success:function(e){200===e.statusCode?t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){t.$u.toast("保存下载成功")},fail:function(){t.$u.toast("保存失败，请稍后重试")}}):t.$u.toast("下载失败")}})},OnChooseImg:function(t){this.index=t},Oncopy:function(e){t.setClipboardData({data:e,success:function(){t.$u.toast("复制成功")}})},watchimg:function(e){var n=[e];t.previewImage({current:99999,urls:n,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮,第"+(t.index+1)+"张图片")},fail:function(t){console.log(t.errMsg)}}})},getList:function(){var t=this;this.isshowpage||this.$showLoading(),this.$request.post("/coc-active/api/v1/newExpert/invite/newList",{type:2}).then((function(e){t.dataList=e.data,e.data.filter((function(e){t.imglist.push(e.img)}))})).catch((function(t){})).finally((function(){t.isshowpage||(t.isshowpage=!0,t.$hideLoading())}))}}};e.default=n}).call(this,n("543d")["default"])},cab0:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},o=[]},cb63:function(t,e,n){"use strict";(function(t,e){var i=n("4ea4");n("4319");i(n("66fd"));var o=i(n("cd3f"));t.__webpack_require_UNI_MP_PLUGIN__=n,e(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},cd3f:function(t,e,n){"use strict";n.r(e);var i=n("cab0"),o=n("ec59");for(var a in o)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("fae7");var s=n("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=c.exports},ec59:function(t,e,n){"use strict";n.r(e);var i=n("b70d"),o=n.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},fae7:function(t,e,n){"use strict";var i=n("76b1"),o=n.n(i);o.a}},[["cb63","common/runtime","common/vendor"]]]);