(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/address/addAddress"],{2614:function(e,a,t){"use strict";(function(e,a){var n=t("4ea4");t("4319");n(t("66fd"));var u=n(t("a25e"));e.__webpack_require_UNI_MP_PLUGIN__=t,a(u.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},6169:function(e,a,t){"use strict";var n=t("6d07"),u=t.n(n);u.a},"6d07":function(e,a,t){},8351:function(e,a,t){"use strict";(function(e){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var t={components:{},data:function(){return{isDefault:!1,areacode:[],isareaopen:!1,showareaCode:!1,isadd:"1",types:[{label:"家庭",value:"1"},{label:"公司",value:"2"},{label:"学校",value:"3"}],tagcurrent:0,radiosex:[{name:"先生",value:0},{name:"女士",value:1}],dataList:{addressDetail:"",name:"",mobile:"",addressTag:"家庭",isDefault:0,areaCode:"",cityCode:"",provinceCode:"",sex:1},rules:{mobile:[{required:!0,message:"请输入手机号码",trigger:["change","blur"]},{validator:function(a,t,n){return e.$u.test.mobile(t)},message:"手机号码不正确",trigger:["change","blur"]}],addressDetail:{type:"string",required:!0,message:"请填写详细地址",trigger:["blur","change"]},areaCode:{type:"string",required:!0,message:"请选择地区",trigger:["blur","change"]},name:{type:"string",required:!0,message:"请输入收货人姓名",trigger:["blur","change"]}}}},onLoad:function(a){1==a.isadd?(e.setNavigationBarTitle({title:"新增收货地址"}),this.isadd=1):(this.isadd=2,e.setNavigationBarTitle({title:"编辑收货地址"}));var t=this,n=this.getOpenerEventChannel();n.on("getaddressdetail",(function(a){e.$u.sleep(0).then((function(){"家庭"==a.data.addressTag?t.tagcurrent=0:"公司"==a.data.addressTag?t.tagcurrent=1:"学校"==a.data.addressTag&&(t.tagcurrent=2),1==a.data.isDefault&&(t.isDefault=!0),t.dataList=a.data}))}))},onShow:function(){},onReady:function(){this.$refs.form1.setRules(this.rules)},methods:{changeswitch:function(e){this.dataList.isDefault=e?1:0},confirmareaCode:function(e){this.dataList.provinceCode=e.value[0].value+"0000",this.dataList.cityCode=e.value[1].value+"00",this.dataList.areaCode=e.value[2].value,this.dataList.areatext=e.value[0].label+e.value[1].label+e.value[2].label,this.showareaCode=!1},changeAreaCode:function(a){var t=this;this.areaData=[];var n=a.columnIndex,u=a.value,i=(a.values,a.index,a.picker),s=void 0===i?this.$refs.uPicker:i;0===n&&this.$request.post("/coc-active/api/v1/merchantsettledin/getAreaCode",{level:"2",adCode:u[0].value}).then((function(a){a.data.filter((function(e,a){t.areaData.push({label:e.name,value:e.adCode})})),e.$u.sleep(0).then((function(){0===n&&s.setColumnValues(1,t.areaData),t.areaquData=[],t.$request.post("/coc-active/api/v1/merchantsettledin/getAreaCode",{level:"3",adCode:t.areaData[0].value}).then((function(a){a.data.filter((function(e,a){t.areaquData.push({label:e.name,value:e.adCode})})),e.$u.sleep(0).then((function(){s.setColumnValues(2,t.areaquData)}))}))}))})),1===n&&(this.areaquData=[],this.$request.post("/coc-active/api/v1/merchantsettledin/getAreaCode",{level:"3",adCode:u[1].value}).then((function(a){a.data.filter((function(e,a){t.areaquData.push({label:e.name,value:e.adCode})})),e.$u.sleep(30).then((function(){1===n&&s.setColumnValues(2,t.areaquData)}))})))},getcity:function(){var e=this;this.$request.post("/coc-active/api/v1/merchantsettledin/getAreaCode",{level:"1"}).then((function(a){e.isareaopen||(a.data.filter((function(a,t){0!=t&&e.areacode.push({label:a.name,value:a.adCode})})),e.areacode=[e.areacode],e.areacode.push([{label:"市辖区",value:"1101"}]),e.areacode.push([{label:"东城区 ",value:"110101"},{label:"西城区",value:"110102"},{label:"朝阳区",value:"110105"},{label:"丰台区",value:"110106"},{label:"石景山区",value:"110107"},{label:"海淀区",value:"110108"},{label:"门头沟区",value:"110109"},{label:"房山区 ",value:"110111"},{label:"通州区",value:"110112"},{label:"顺义区",value:"110113"},{label:"昌平区",value:"110114"},{label:"大兴区",value:"110115"},{label:"怀柔区",value:"110116"},{label:"平谷区",value:"110117"},{label:"密云区",value:"110118"},{label:"延庆区",value:"110119"}]),e.isareaopen=!0),e.showareaCode=!0}))},Ondelete:function(){var a=this;this.$request.get("/coc-active/api/v1/user/address/del/"+this.dataList.id).then((function(t){200==t.code?a.$refs.uToast.show({message:"删除成功",type:"success",complete:function(){e.navigateBack({delta:1})}}):a.$refs.uToast.show({message:t.message,type:"error"})}))},OnSave:function(){var a=this;this.$refs.form1.validate().then((function(t){1==a.isadd?a.$request.post("/coc-active/api/v1/user/address/add",a.dataList).then((function(t){200==t.code&&a.$refs.uToast.show({message:"新增成功",type:"success",complete:function(){e.navigateBack({delta:1})}})})):a.$request.post("/coc-active/api/v1/user/address/edit",a.dataList).then((function(t){200==t.code&&a.$refs.uToast.show({message:"编辑成功",type:"success",complete:function(){e.navigateBack({delta:1})}})}))})).catch((function(e){}))},changetags:function(e,a){this.tagcurrent=e,this.dataList.addressTag=a}}};a.default=t}).call(this,t("543d")["default"])},9060:function(e,a,t){"use strict";t.d(a,"b",(function(){return u})),t.d(a,"c",(function(){return i})),t.d(a,"a",(function(){return n}));var n={"u-Form":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--form/u--form")]).then(t.bind(null,"4b8f"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"4019"))},"u-Input":function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u--input/u--input")]).then(t.bind(null,"e709"))},uIcon:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(t.bind(null,"f23e"))},uSwitch:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-switch/u-switch")]).then(t.bind(null,"fd83"))},uToast:function(){return t.e("uni_modules/uview-ui/components/u-toast/u-toast").then(t.bind(null,"4bf8"))},uPicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uview-ui/components/u-picker/u-picker")]).then(t.bind(null,"3f29"))}},u=function(){var e=this,a=e.$createElement;e._self._c;e._isMounted||(e.e0=function(a){e.showareaCode=!1})},i=[]},a25e:function(e,a,t){"use strict";t.r(a);var n=t("9060"),u=t("fa3e");for(var i in u)["default"].indexOf(i)<0&&function(e){t.d(a,e,(function(){return u[e]}))}(i);t("6169");var s=t("f0c5"),o=Object(s["a"])(u["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);a["default"]=o.exports},fa3e:function(e,a,t){"use strict";t.r(a);var n=t("8351"),u=t.n(n);for(var i in n)["default"].indexOf(i)<0&&function(e){t.d(a,e,(function(){return n[e]}))}(i);a["default"]=u.a}},[["2614","common/runtime","common/vendor"]]]);