(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/upkeep/bookingForm"],{"0353":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=t("7dcd"),i={data:function(){return{mySale:{},showcontact:!1,actions:[],formData:{phone:(0,o.getstorage)("mobile"),deliveryCarService:1,replaceCarService:1,managerId:""},radiolist:[{name:"需要",value:1},{name:"不需要",value:0}],deliveryCarService:"需要",replaceCarService:"需要",rules:{username:{type:"string",required:!0,message:"请输入姓名",trigger:["blur","change"]},phone:[{type:"string",required:!0,message:"请输入手机号",trigger:["blur","change"]},{validator:function(n,t,o){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],plate:{type:"string",required:!0,message:"请选择爱车",trigger:["blur","change"]}},radiovalue1:"",managerId:"",plate:"",showCar:!1,shopId:"",codeurl:"",brandId:""}},onLoad:function(e){e.brandId&&(this.brandId=e.brandId),this.shopId=e.shopId},onShow:function(){this.getDetail()},methods:{getDetail:function(){var e=this;(0,o.getstorage)("userId");this.$request.get("/coc-my/api/v1/my/user/car/lists").then((function(n){var t=[];n.data.filter((function(e){t.push({name:e.plate})})),e.actions=t}));var n={shopId:this.shopId};this.$request.post("/coc-active/api/v2/maintain_meal/shop/customerManager/list",n).then((function(n){1==n.data.length?(e.mySale=n.data[0],e.formData.managerId=n.data[0].customerManagerId):e.mySale={}}))},checkSale:function(){e.navigateTo({url:"/pages/carShops/upkeep/checkSales?shopId="+this.shopId})},checkCar:function(){this.actions.length?this.showCar=!0:e.navigateTo({url:"/pages/my/mycar/index?brandId="+this.brandId})},carSelect:function(e){console.log(e),this.formData.plate=e.name},groupChange:function(e){this.formData.deliveryCarService="需要"==e?1:0},carChange:function(e){this.formData.replaceCarService="需要"==e?1:0},OnTell:function(){this.mySale.phone?e.makePhoneCall({phoneNumber:this.mySale.phone}):e.showToast({icon:"none",title:"暂无联系方式"})},OnWechat:function(){this.mySale.extendQrCode?(this.codeurl=this.mySale.extendQrCode,this.showcontact=!0):e.showToast({icon:"none",title:"暂无个人二维码，点击右侧打电话试试吧~"})},OnpreviewImage:function(){e.previewImage({urls:this.codeurl,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了图片",e)},fail:function(e){console.log(e.errMsg)}}})},Onpushloadhelp:function(){},OnPushPolicy1:function(){e.navigateTo({url:"/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html"})},OnPushPolicy2:function(){e.navigateTo({url:"/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_privacy.html"})},onsubmit:function(){var n=this;if(!this.radiovalue1)return e.$u.toast("请阅读并同意相关协议"),!1;this.$refs.uForm.validate().then((function(t){n.$request.post("/coc-active/api/v2/maintain_meal/appointmentMaintenance",n.formData).then((function(n){200==n.code?(e.$u.toast("已提交"),setTimeout((function(){e.navigateBack({delta:1})}),1500)):(console.log(n),e.$u.toast(n.message))}))})).catch((function(n){e.$u.toast("请填写资料")}))}}};n.default=i}).call(this,t("543d")["default"])},"46b3":function(e,n,t){"use strict";t.r(n);var o=t("0353"),i=t.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(u);n["default"]=i.a},7771:function(e,n,t){"use strict";(function(e,n){var o=t("4ea4");t("4319");o(t("66fd"));var i=o(t("92a1"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(i.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"92a1":function(e,n,t){"use strict";t.r(n);var o=t("c805"),i=t("46b3");for(var u in i)["default"].indexOf(u)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(u);t("ad74");var a=t("f0c5"),r=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"2e9b4d6e",null,!1,o["a"],void 0);n["default"]=r.exports},ad74:function(e,n,t){"use strict";var o=t("d694"),i=t.n(o);i.a},c805:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return u})),t.d(n,"a",(function(){return o}));var o={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"4b8f"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"4019"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"e709"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"f23e"))},uRadioGroup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(t.bind(null,"35d2"))},uRadio:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(t.bind(null,"df92"))},uActionSheet:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-action-sheet/u-action-sheet")]).then(t.bind(null,"9f65"))},uPopup:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(t.bind(null,"076f"))},uToast:function(){return t.e("uni_modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,"4bf8"))}},i=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.showCar=!1},e.e1=function(n){e.showcontact=!1})},u=[]},d694:function(e,n,t){}},[["7771","common/runtime","common/vendor"]]]);