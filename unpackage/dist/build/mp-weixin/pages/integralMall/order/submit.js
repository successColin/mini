(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/integralMall/order/submit"],{"107f":function(e,t,n){"use strict";var i=n("fb8d"),o=n.n(i);o.a},71041:function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("4319");i(n("66fd"));var o=i(n("acf2"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"993a":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=n("7dcd"),o={onLoad:function(t){var n=this;this.id=t.id,this.queryDetail(t.id),e.$on("sendinfo",(function(e){n.showmodal=!1,n.isdefaultaddress=!0,n.defaultaddress=e.info}))},onShow:function(){this.getdefaultaddress()},onReady:function(){var t=this;e.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect((function(e){t.safeHeight=e.height})).exec()},computed:{totalPrice:function(){return(this.detail.exchangePrice&&parseFloat(this.detail.exchangePrice)>0?this.detail.exchangePrice:0)*(this.count&&parseInt(this.count)>0?this.count:0)}},data:function(){return{showmodal:!1,isdefaultaddress:!1,defaultaddress:{},next:!0,id:"",count:1,remark:"",safeHeight:0,isSubmit:!0,detail:{},isshowpage:!1}},methods:{OnChangeAddress:function(){e.navigateTo({url:"/pages/my/address/index"})},getdefaultaddress:function(){var e=this;this.$request.get("/coc-active/api/v1/user/address/default").then((function(t){if(e.isdefaultaddress)return!1;null==t.data?e.isdefaultaddress=!1:(e.showmodal=!1,e.isdefaultaddress=!0,e.defaultaddress=t.data)}))},queryDetail:function(t){var n=this;this.isshowpage||this.$showLoading(),this.$newrequest.get("/coc-active/api/v2/score/shop/product/detail/"+t).then((function(t){200==t.code?n.detail=t.data:e.showToast({title:t.message,icon:"none",duration:2e3})})).finally((function(){n.isshowpage||(n.isshowpage=!0,n.$hideLoading())}))},submit:function(){var t=this;if(!0===(0,i.tologin)()&&this.isSubmit){var n=new RegExp("^[0-9]*$");if(n.test(this.count))return 2!=this.detail.commodityType||this.isdefaultaddress?void(this.next&&(e.requestSubscribeMessage({tmplIds:["b4r77TQXXqIxfxxMx81L7Lp3pOhPKlAb7eVpp6mi7bY"],success:function(e){}}),this.isSubmit=!1,this.$newrequest.post("/coc-active/api/v2/score/shop/score/exchange",{remark:this.remark,num:this.count,scoreProductId:this.id}).then((function(n){200==n.code?(t.next=!1,e.showToast({title:"兑换成功",icon:"none",duration:3e3,mask:!0,success:function(){setTimeout((function(){e.switchTab({url:"/pages/home/my"})}),3e3)}})):(t.next=!1,e.showToast({title:n.message,icon:"none",duration:2e3}))})).finally((function(){t.next=!1,t.isSubmit=!0})))):(this.showmodal=!0,!1);e.showToast({title:"请选择正确数量",icon:"none",duration:2e3})}}}};t.default=o}).call(this,n("543d")["default"])},abff:function(e,t,n){"use strict";n.r(t);var i=n("993a"),o=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},acf2:function(e,t,n){"use strict";n.r(t);var i=n("e2cd"),o=n("abff");for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("107f");var u=n("f0c5"),a=Object(u["a"])(o["default"],i["b"],i["c"],!1,null,"7df8d8cc",null,!1,i["a"],void 0);t["default"]=a.exports},e2cd:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var i={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"f23e"))},uNumberBox:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-number-box/u-number-box")]).then(n.bind(null,"0356"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"e709"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"3d02"))}},o=function(){var e=this.$createElement;this._self._c},s=[]},fb8d:function(e,t,n){}},[["71041","common/runtime","common/vendor"]]]);