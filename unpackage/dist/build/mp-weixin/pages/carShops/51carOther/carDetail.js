(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/51carOther/carDetail"],{"447a":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={uParse:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-parse/u-parse")]).then(n.bind(null,"5dcf"))},uModal:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(n.bind(null,"3d02"))},uButton:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-button/u-button")]).then(n.bind(null,"b177"))},uForm:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form/u-form")]).then(n.bind(null,"abf7"))},uFormItem:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(n.bind(null,"4019"))},uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"f23e"))},uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,"35d2"))},uRadio:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(n.bind(null,"df92"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.swiperlist.length);e._isMounted||(e.e0=function(t){e.formShow=!1}),e.$mp.data=Object.assign({},{$root:{g0:n}})},r=[]},"451f":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("4319");o(n("66fd"));var i=o(n("64b39"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(i.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"62fa":function(e,t,n){},"64b39":function(e,t,n){"use strict";n.r(t);var o=n("447a"),i=n("8747");for(var r in i)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("7b19");var a=n("f0c5"),u=Object(a["a"])(i["default"],o["b"],o["c"],!1,null,"55436f94",null,!1,o["a"],void 0);t["default"]=u.exports},"7b19":function(e,t,n){"use strict";var o=n("62fa"),i=n.n(o);i.a},8747:function(e,t,n){"use strict";n.r(t);var o=n("fea6"),i=n.n(o);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=i.a},fea6:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(n("2eee")),r=o(n("c973")),a=n("7dcd"),u={components:{carousel:function(){Promise.all([n.e("common/vendor"),n.e("components/carousel/index")]).then(function(){return resolve(n("c969"))}.bind(null,n)).catch(n.oe)}},data:function(){return{radiovalue1:"",content:"提交成功，我们将安排专业的销售经理马上与您取得联系！",infoShow:!1,formShow:!1,formData:{city:"",mobile:"",name:"",sex:0,port:12},detailData:{},detail:{},swiperlist:[],pagetype:"",id:"",sex:[{name:"先生",current:!0},{name:"女士",current:!1}],rules:{name:{type:"string",required:!0,message:"请填写姓名",trigger:["blur","change"]},mobile:[{type:"string",required:!0,message:"请填写手机号",trigger:["blur","change"]},{pattern:/^1[3456789]\d{9}$/,message:"请输入有效手机号",trigger:"blur"}],city:{type:"string",required:!0,message:"请选择城市",trigger:["blur","change"]}}}},onLoad:function(t){var n=this;(0,a.getstorage)("cityname")&&(this.formData.city=(0,a.getstorage)("cityname")),(0,a.getstorage)("mobile")&&(this.formData.mobile=(0,a.getstorage)("mobile")),e.$on("getcity",(function(e){n.formData.city=e.name,n.formData.city_id=e.city_id})),this.pagetype=t.type;var o=JSON.parse(t.item);this.detailData=o,this.id=o.id,this.getDetail();var i=[];o.detail_img.length?o.detail_img.filter((function(e){i.push({url:e,type:"image"})})):i.push({url:"https://oss.dcqcjlb.com/51che_java_dev/20230413/file_1681356414481.jpg",type:"image"}),this.swiperlist=i},onShow:function(){},computed:{getadUrl:function(){return!!this.detailData.imgList}},methods:{getDetail:function(){var e=this,t={id:this.id,api_name:"detail",list_type:this.pagetype};this.$request51car.post("/app/wechat/api",t).then((function(t){e.detail=t.data,e.cx_name=t.data.cx_name,e.sale_price=t.data.sale_price,e.guide_price=t.data.guide_price}))},changesex:function(e){this.formData.sex=e,this.sex.filter((function(e){e.current=!1})),this.sex[e].current=!0},checkCity:function(){e.navigateTo({url:"/pages/carShops/51carOther/selectCity"})},OnPushwebview:function(){e.navigateTo({url:"/pages/agreement/webview?url=https://h5.dcqcjlb.com/protocol/user_vehicle_consultation.html"})},buyScheme:function(){1==this.pagetype&&e.navigateTo({url:"/pages/carShops/51carOther/buyScheme?id="+this.id})},morecont:function(){e.navigateTo({url:"/pages/carShops/51carOther/moreCont"})},handleBuy:function(){this.formShow=!0},getNow:function(){var t=this;return(0,r.default)(i.default.mark((function n(){var o,r;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(o=t,o.radiovalue1){n.next=4;break}return e.$u.toast("请同意并阅读个人信息保护声明"),n.abrupt("return",!1);case 4:return n.next=6,o.$refs.formData.validate();case 6:r=Object.assign({},o.formData),console.log(r),r.uv_id=o.detailData.cx_id,r.name=o.formData.name+o.sex[o.formData.sex].name,r.way=9,o.$request51car.post("user/events/user_record",r).then((function(e){o.infoShow=!0,t.formShow=!1})).catch((function(t){console.log(t),e.showToast({title:t,icon:"none",duration:2e3}),o.$message.error(error)}));case 12:case"end":return n.stop()}}),n)})))()},closeModal:function(){this.infoShow=!1}}};t.default=u}).call(this,n("543d")["default"])}},[["451f","common/runtime","common/vendor"]]]);