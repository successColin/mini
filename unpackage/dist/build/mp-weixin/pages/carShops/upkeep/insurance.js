(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/upkeep/insurance"],{2408:function(e,t,n){"use strict";n.r(t);var o=n("62e4"),i=n("ca5d");for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("8a16");var r=n("f0c5"),a=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"e24c90d8",null,!1,o["a"],void 0);t["default"]=a.exports},"62e4":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"0f14"))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,"8add"))},uForm:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form/u-form")]).then(n.bind(null,"cf22"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"ee1b"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"c00c"))},uInput:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-input/u-input")]).then(n.bind(null,"ce45"))},uKeyboard:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-keyboard/u-keyboard")]).then(n.bind(null,"c984"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"ba5d"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"bfa6"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.topList.length),o=n>0?e.__map(e.topList,(function(t,n){var o=e.__get_orig(t),i=e._f("numberfilter")(n+1);return{$orig:o,f0:i}})):null;e._isMounted||(e.e0=function(t){e.keyShow=!0},e.e1=function(t){e.infoShow=!1},e.e2=function(t){e.explainShow=!1}),e.$mp.data=Object.assign({},{$root:{g0:n,l0:o}})},u=[]},"8a16":function(e,t,n){"use strict";var o=n("f940"),i=n.n(o);i.a},"8ec2":function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("2eee")),u=o(n("c973")),r=n("04ff"),a=o(n("14ae")),c={components:{},filters:{numberfilter:function(e){var t=["零","一","二","三","四","五","六","七","八","九"],n=["","十","百"];e=parseInt(e);var o=function(e){for(var o=e.toString().split("").reverse(),i="",u=0;u<o.length;u++)i=(0==u&&0==o[u]||u>0&&0==o[u]&&0==o[u-1]?"":t[o[u]]+(0==o[u]?n[0]:n[u]))+i;return i},i=Math.floor(e/100),u=e%100;return u.toString().length<2&&(u="0"+u),i?o(i)+"百"+o(u):o(e)}},data:function(){return{explainShow:!1,explainInfo:"",infoShow:!1,keyShow:!1,showQuote:!1,isAgree:!1,showBubble:!1,columns:[a.default],Defaultprovince:"浙",formData:{city:"",type:5,plate:"",shopId:""},content:"已收到您的报价申请，我们将安排专业的客户经理 马上与您取得联系！",shopId:"",topList:[],contentList1:[],contentList2:[],key:"",rules:{customerMobile:{type:"string",required:!0,message:"请填写手机号",trigger:["blur","change"]},customerName:{type:"string",required:!0,message:"请填写姓名",trigger:["blur","change"]},plate:{type:"string",required:!0,message:"请填写车牌号",trigger:["blur","change"]}}}},onLoad:function(t){var n=this;(0,r.getstorage)("cityname")&&(this.formData.city=(0,r.getstorage)("cityname")),(0,r.getstorage)("mobile")&&(this.formData.customerMobile=(0,r.getstorage)("mobile")),this.shopId=t.id,this.formData.shopId=t.id,this.getJuhui(t.id),this.getList(t.id),e.$on("homeChangeCity",(function(e){n.formData.city=e.name}))},methods:{getJuhui:function(e){var t=this;this.$newrequest.post("/coc-active/api/v1/fours/carInsurance/list",{shopId:e}).then((function(e){console.log(e.data),t.topList=e.data})).catch((function(e){}))},getList:function(e){var t=this;this.$newrequest.get("/coc-active/api/v1/fours/carInsurance/list").then((function(e){var n=[],o=[];e.data.forEach((function(e){1==e.type?n.push(e):2==e.type&&o.push(e)})),t.contentList1=n,t.contentList2=o})).catch((function(e){}))},getQuote:function(){!0===(0,r.tologin)()&&(this.showQuote=!0)},closeQuote:function(){this.showQuote=!1},handleCity:function(){},handleCarCity:function(){},open:function(){},OnPushUserAgreement:function(){e.navigateTo({url:"/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html"})},changeKey:function(e){this.key=e},chooseKey:function(){this.Defaultprovince=this.key,this.keyShow=!1},checkCity:function(){e.navigateTo({url:"/pages/activity/chooseCity/chooseCity"})},getPrice:function(){this.isAgree?this.getNow():this.isAgree||(this.showBubble=!0)},checkboxChange:function(){this.isAgree=!this.isAgree,this.isAgree&&(this.showBubble=!1)},getNow:function(){var t=this;return(0,u.default)(i.default.mark((function n(){var o;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,t.$refs.formData.validate();case 3:return t.formData.plate=t.Defaultprovince+t.formData.plate,o=Object.assign({},t.formData),n.next=7,t.$newrequest.post("/coc-active/api/v1/four_s/save_data",o);case 7:t.formData.plate="",t.formData.customerName="",t.showQuote=!1,t.infoShow=!0,n.next=16;break;case 13:n.prev=13,n.t0=n["catch"](0),e.showToast({title:n.t0,icon:"none",duration:2e3});case 16:case"end":return n.stop()}}),n,null,[[0,13]])})))()},lookExplain:function(e){this.explainShow=!0,this.explainInfo=e}}};t.default=c}).call(this,n("543d")["default"])},9457:function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("76b1");o(n("66fd"));var i=o(n("2408"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},ca5d:function(e,t,n){"use strict";n.r(t);var o=n("8ec2"),i=n.n(o);for(var u in o)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(u);t["default"]=i.a},f940:function(e,t,n){}},[["9457","common/runtime","common/vendor"]]]);