(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myEarnings/addBankCard"],{"0e81":function(e,n,t){"use strict";(function(e,n){var r=t("4ea4");t("4319");r(t("66fd"));var u=r(t("1ba1"));e.__webpack_require_UNI_MP_PLUGIN__=t,n(u.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},"1ba1":function(e,n,t){"use strict";t.r(n);var r=t("bd71"),u=t("4b02");for(var a in u)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return u[e]}))}(a);t("7d8b");var i=t("f0c5"),o=Object(i["a"])(u["default"],r["b"],r["c"],!1,null,"c3d86b38",null,!1,r["a"],void 0);n["default"]=o.exports},"4b02":function(e,n,t){"use strict";t.r(n);var r=t("9f8a"),u=t.n(r);for(var a in r)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return r[e]}))}(a);n["default"]=u.a},"68fb":function(e,n,t){},"7d8b":function(e,n,t){"use strict";var r=t("68fb"),u=t.n(r);u.a},"9f8a":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{form1:{name:"",cardNumber:"",mobile:"",idCard:"",bankName:"",branchBankName:""},form2:{bank:"",ziBank:""},rules1:{name:[{type:"string",required:!0,message:"请输入姓名",trigger:["blur","change"]}],cardNumber:[{type:"string",required:!0,message:"请输入卡号",trigger:["blur","change"]}],mobile:[{type:"string",required:!0,message:"请输入手机号",trigger:["blur","change"]},{validator:function(n,t,r){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],idCard:[{type:"string",required:!0,message:"请输入身份证号",trigger:["blur","change"]},{validator:function(n,t,r){return e.$u.test.idCard(t)},message:"身份证号号码不正确",trigger:["change","blur"]}],bankName:[{type:"string",required:!0,message:"请选择银行",trigger:["blur","change"]}],branchBankName:[{type:"string",required:!0,message:"请输入开户分行",trigger:["blur","change"]}]}}},onLoad:function(e){},onShow:function(){var n=this;e.$on("bankdata",(function(e){n.form1.bankName=e}))},onReady:function(){this.$refs.uForm1.setRules(this.rules1)},methods:{checkBank:function(){e.navigateTo({url:"/pages/myEarnings/searchBank"})},onSubmit:function(){var n=this;this.$refs.uForm1.validate().then((function(t){n.$request.post("/coc-active/api/v2/withdraw/bankCard/add",n.form1).then((function(n){200==n.code?(e.showToast({icon:"success",title:"绑定成功",duration:"1500"}),e.navigateBack({delta:1})):e.$u.toast(n.message)}))}))}}};n.default=t}).call(this,t("543d")["default"])},bd71:function(e,n,t){"use strict";t.d(n,"b",(function(){return u})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return r}));var r={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"4b8f"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"4019"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-input/u-input")]).then(t.bind(null,"a5da"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"f23e"))}},u=function(){var e=this.$createElement;this._self._c},a=[]}},[["0e81","common/runtime","common/vendor"]]]);