(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/info/index"],{"03ab":function(n,t,e){"use strict";e.r(t);var o=e("0bfe"),i=e("80e8");for(var a in i)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(a);e("6441");var u=e("f0c5"),c=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=c.exports},"0bfe":function(n,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){return o}));var o={uAvatar:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(e.bind(null,"d838"))},uIcon:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(e.bind(null,"0f14"))},uPopup:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(e.bind(null,"8add"))},"u-Input":function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u--input/u--input")]).then(e.bind(null,"c00c"))},uToast:function(){return e.e("uni_modules/uview-ui/components/u-toast/u-toast").then(e.bind(null,"1b13"))},uModal:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(e.bind(null,"ba5d"))}},i=function(){var n=this,t=n.$createElement;n._self._c;n._isMounted||(n.e0=function(t){n.showmodal=!0},n.e1=function(t){n.showmodal=!1},n.e2=function(t){n.showmodal=!1})},a=[]},"1a97":function(n,t,e){},"387a":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=e("04ff"),i={components:{cardauthentication:function(){e.e("components/cardauthentication").then(function(){return resolve(e("fc50"))}.bind(null,e)).catch(e.oe)}},data:function(){return{showmodal:!1,newnickname:"",dianame:"设置昵称",show:!1,dataList:{mobile:"",headImg:"",birthday:"",signature:""},keywordHeight:"0rpx",showpop:!1}},onShow:function(){this.getList()},onLoad:function(){var t=this;n.$on("closepop",(function(n){t.showpop=!1,t.getList()}))},methods:{handleCollect:function(t){if(!0===(0,o.tologin)())return 2!=t&&void n.navigateTo({url:"/pages/my/collection/index?type="+t})},OnPushIdcard:function(){n.navigateTo({url:"/pages/my/info/idcardindex?name="+this.dataList.realName+"&idCard="+this.dataList.idCard})},OnOpendauthentication:function(){this.showpop=!0},logonout:function(){var t=this;this.$request.post("/coc-oauth/oauth/logout").then((function(e){200==e.code&&(t.showmodal=!1,t.$refs.uToast.show({message:"操作成功",complete:function(){n.removeStorageSync("token"),n.navigateTo({url:"/pages/activity/share/index"})}}))}))},Onusercancel:function(){this.$request.post("/coc-oauth/oauth/cancel").then((function(t){200==t.code&&(n.removeStorageSync("token"),n.switchTab({url:"/pages/home/index"}))}))},OnSwitchAccount:function(){this.logonout()},OnloginOut:function(){this.logonout()},OnTrue:function(){var n=this,t=this;this.$request.post("/coc-my/api/v1/my/user/update",{nickname:t.newnickname}).then((function(e){t.dataList.nickname=t.newnickname,n.show=!1}))},getphone:function(n){return n.substr(0,3)+"****"+n.substr(7)},getList:function(){var n=this;this.$request.get("/coc-my/api/v1/my/user/info").then((function(t){n.dataList=t.data.user}))},OnAboutUs:function(){n.navigateTo({url:"/pages/my/aboutUs/index"})},Onuserinfo:function(){var t=this;n.navigateTo({url:"/pages/my/userinfo/index",success:function(n){n.eventChannel.emit("getuserinfo",{data:t.dataList})}})},Oncertification:function(){var t=this;n.navigateTo({url:"/pages/my/certification/index",success:function(n){n.eventChannel.emit("getuserinfo",{data:t.dataList})}})},OnaccountBinding:function(){n.navigateTo({url:"/pages/my/accountBinding/index"})},OnChangeContacts:function(){n.navigateTo({url:"/pages/my/contacts/index"})},OnChangeAddress:function(){n.navigateTo({url:"/pages/my/address/index"})},onWebView:function(t){var e=1==t?"https://h5.dcqcjlb.com/protocol/user_privacy.html":2==t?"https://h5.dcqcjlb.com/protocol/user_service.html":"";n.navigateTo({url:"/pages/agreement/webview?url="+e})},close:function(){this.show=!1},OpenChangeName:function(){this.show=!0,this.newnickname=this.dataList.nickname},setheadimg:function(n){this.$request.post("/coc-my/api/v1/my/user/update",{headImg:n}).then((function(n){}))},chooseImage:function(){var t=this;n.chooseImage({count:1,sizeType:["original","compressed"],success:function(e){var o=e.tempFilePaths[0];n.uploadFile({url:getApp().globalData.uploadUrl,filePath:o,name:"file",formData:{file:o},header:{"Content-Type":"multipart/form-data"},success:function(n){t.dataList.headImg=JSON.parse(n.data).data,t.setheadimg(JSON.parse(n.data).data)}})}})},focusText:function(n){this.keywordHeight="100rpx"},blurText:function(){this.keywordHeight="0rpx"}}};t.default=i}).call(this,e("543d")["default"])},"5b2d":function(n,t,e){"use strict";(function(n,t){var o=e("4ea4");e("76b1");o(e("66fd"));var i=o(e("03ab"));n.__webpack_require_UNI_MP_PLUGIN__=e,t(i.default)}).call(this,e("bc2e")["default"],e("543d")["createPage"])},6441:function(n,t,e){"use strict";var o=e("1a97"),i=e.n(o);i.a},"80e8":function(n,t,e){"use strict";e.r(t);var o=e("387a"),i=e.n(o);for(var a in o)["default"].indexOf(a)<0&&function(n){e.d(t,n,(function(){return o[n]}))}(a);t["default"]=i.a}},[["5b2d","common/runtime","common/vendor"]]]);