(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/packagepayindex"],{"184f":function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return o})),t.d(n,"a",(function(){return a}));var a={uNumberBox:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-number-box/u-number-box")]).then(t.bind(null,"0356"))},"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"4b8f"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"4019"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"e709"))},uToast:function(){return t.e("uni_modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,"4bf8"))}},r=function(){var e=this.$createElement;this._self._c},o=[]},"61d2":function(e,n,t){},"64aa":function(e,n,t){"use strict";t.r(n);var a=t("a259"),r=t.n(a);for(var o in a)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return a[e]}))}(o);n["default"]=r.a},"7a8f":function(e,n,t){"use strict";(function(e,n){var a=t("4ea4");t("4319");a(t("66fd"));var r=a(t("9fc2"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(r.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"9fc2":function(e,n,t){"use strict";t.r(n);var a=t("184f"),r=t("64aa");for(var o in r)["default"].indexOf(o)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(o);t("bf92");var u=t("f0c5"),i=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],void 0);n["default"]=i.exports},a259:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=t("7dcd"),r={data:function(){return{rules:{mobile:[{required:!0,message:"请输入手机号",trigger:["change","blur"]},{validator:function(n,t,a){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],name:{type:"string",required:!0,message:"请填写联系人",trigger:["blur","change"]}},formdata:{name:"",mobile:"",remark:""},forwardUserId:"",merchantMealNum:1,maxnum:1,dataList:{},orderId:null}},onLoad:function(e){var n=this,t=this.getOpenerEventChannel();t.on("getinfo",(function(e){n.dataList=e.data})),this.forwardUserId=e.forwardUserId,(0,a.getstorage)("token")||(0,a.tologin)()},onShow:function(){this.formdata.name=(0,a.getstorage)("nickname"),this.formdata.mobile=(0,a.getstorage)("mobile")},onReady:function(){this.$refs.form1.setRules(this.rules)},methods:{wxpay:function(n){var t=this;e.requestPayment({provider:"wxpay",timeStamp:n.miniPayRequest.timeStamp,nonceStr:n.miniPayRequest.nonceStr,package:n.miniPayRequest.package,signType:n.miniPayRequest.signType,paySign:n.miniPayRequest.paySign,appid:n.miniPayRequest.appId,success:function(n){e.showToast({icon:"success",title:"支付成功",complete:function(){setTimeout((function(){e.reLaunch({url:"/pages/grouppurchase/packageorder/detail?id="+t.orderId})}),1e3)}})},fail:function(e){}})},OnPay:function(){var n=this;this.$refs.form1.validate().then((function(t){var a=null;n.orderId&&(a=n.orderId);var r={merchantMealId:n.dataList.id,merchantMealNum:n.merchantMealNum,mobile:n.formdata.mobile,name:n.formdata.name,orderId:a,remark:n.formdata.remark,forwardUserId:n.forwardUserId};r.subOpenId=e.getStorageSync("openid"),n.$request.post("/coc-active/api/v1/merchant_meal_order/payment",r).then((function(e){200==e.code?(n.orderId=e.data.orderId,n.wxpay(e.data.payment)):n.$refs.uToast.show({message:e.message})}))}))}}};n.default=r}).call(this,t("543d")["default"])},bf92:function(e,n,t){"use strict";var a=t("61d2"),r=t.n(a);r.a}},[["7a8f","common/runtime","common/vendor"]]]);