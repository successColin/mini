(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/invitein"],{"15a7":function(t,n,e){"use strict";e.r(n);var i=e("fa22"),o=e("f323");for(var a in o)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return o[t]}))}(a);e("e9b2");var s=e("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);n["default"]=c.exports},"860d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={components:{},data:function(){return{index:0,imglist:[],dataList:[],isshowpage:!1}},onShareAppMessage:function(n){var e=t.getStorageSync("nickname")+"邀请您升级51车俱乐部达人";return{title:e,imageUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685064278696.jpg",path:"/pages/wiseman/welcome?expertParentId="+t.getStorageSync("userId"),success:function(n){t.showToast({title:"分享朋友成功"})},fail:function(n){t.showToast({title:"分享朋友失败",icon:"none"})}}},onShareTimeline:function(n){return{title:t.getStorageSync("nickname")+"邀请您升级51车俱乐部达人",imageUrl:"https://oss.dcqcjlb.com/51che_java_dev/20230526/file_1685064278696.jpg",path:"/pages/wiseman/welcome?expertParentId="+t.getStorageSync("userId"),success:function(n){t.showToast({title:"分享朋友圈成功"})},fail:function(n){t.showToast({title:"分享朋友圈失败",icon:"none"})}}},onLoad:function(){this.getList()},onShow:function(){},methods:{OnSaveImage:function(){t.showToast({title:"正在保存中",icon:"loading"}),t.downloadFile({url:this.imglist[this.index],success:function(n){200===n.statusCode?t.saveImageToPhotosAlbum({filePath:n.tempFilePath,success:function(){t.$u.toast("保存下载成功")},fail:function(){t.$u.toast("保存失败，请稍后重试")}}):t.$u.toast("下载失败")}})},OnChooseImg:function(t){this.index=t},Oncopy:function(n){console.log(n),t.setClipboardData({data:n,success:function(){t.$u.toast("复制成功")}})},watchimg:function(n){var e=[n];t.previewImage({current:99999,urls:e,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(t){console.log("选中了第"+(t.tapIndex+1)+"个按钮,第"+(t.index+1)+"张图片")},fail:function(t){console.log(t.errMsg)}}})},getList:function(){var t=this;this.isshowpage||this.$showLoading(),this.$request.post("/coc-active/api/v1/newExpert/invite/list").then((function(n){t.dataList=n.data,n.data.filter((function(n){t.imglist.push(n.img)}))})).catch((function(t){})).finally((function(){t.isshowpage||(t.isshowpage=!0,t.$hideLoading())}))}}};n.default=e}).call(this,e("543d")["default"])},a2c2:function(t,n,e){},c00b5:function(t,n,e){"use strict";(function(t,n){var i=e("4ea4");e("4319");i(e("66fd"));var o=i(e("15a7"));t.__webpack_require_UNI_MP_PLUGIN__=e,n(o.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},e9b2:function(t,n,e){"use strict";var i=e("a2c2"),o=e.n(i);o.a},f323:function(t,n,e){"use strict";e.r(n);var i=e("860d"),o=e.n(i);for(var a in i)["default"].indexOf(a)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=o.a},fa22:function(t,n,e){"use strict";e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){}));var i=function(){var t=this.$createElement;this._self._c},o=[]}},[["c00b5","common/runtime","common/vendor"]]]);