(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Settlein/uploadEnterprise"],{"3598e":function(t,e,a){"use strict";a.r(e);var i=a("eec8"),o=a("5b21");for(var s in o)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return o[t]}))}(s);a("465a");var n=a("f0c5"),d=Object(n["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);e["default"]=d.exports},"465a":function(t,e,a){"use strict";var i=a("5e67"),o=a.n(i);o.a},"5b21":function(t,e,a){"use strict";a.r(e);var i=a("a668"),o=a.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);e["default"]=o.a},"5e67":function(t,e,a){},"5e9a":function(t,e,a){"use strict";(function(t,e){var i=a("4ea4");a("4319");i(a("66fd"));var o=i(a("3598e"));t.__webpack_require_UNI_MP_PLUGIN__=a,e(o.default)}).call(this,a("bc2e")["default"],a("543d")["createPage"])},a668:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=a("e2cc"),o={components:{},data:function(){return{currentmcc:0,showloading:!1,type:"",base64:"",isshow:!0,mccshow:!1,industrylist:[],qualificationsList:[],qualificationsImg:[],dataList:{qualificationsImg:[],mccCode:"",mccMsg:"",bankImgFront:"",bankImgBack:"",selfieImg:"",licenceOpening:"",indoorPhotograph:"",doorheadPhoto:"",appScreenshot:"",bnfHomeAddr:"",bnfCertExpire:"",bnfCertno:"",bnfName:"",companyAddrExt:"",companyCertExpire:"9999-12-31",shareholderHomeAddr:"",shareholderCertExpire:"",shareholderCertno:"",shareholderName:"",companyName:"",companyCertNo:"",legalmanHomeAddr:"",legalIdcardNo:"",legalName:"",juridicalIdCardFrontImg:"",juridicalIdCardBackImg:"",licenseImg:"",picList:[],legalCardDeadline:"",screenshotImg:"",regMerType:"00",bankAcctType:"1",shareHolderType:"1",bnfType:"1",bnfList:[{bnfName:"",bnfCertno:"",bnfCertExpire:"",bnfCertType:"1",bnfHomeAddr:""}]}}},onLoad:function(e){this.type=e.type,1==e.isshow?(this.isshow=!1,t.setNavigationBarTitle({title:"企业入驻资料查看"}),this.getList()):2==e.isshow&&this.getallList(),e.sourceType&&(this.dataList.sourceType=e.sourceType),e.operateId&&(this.dataList.operateId=e.operateId),e.operateId&&(this.dataList.operateId=e.operateId),e.affiliationType&&(this.dataList.affiliationType=e.affiliationType),e.isLineLedger&&(this.dataList.isLineLedger=e.isLineLedger)},onShow:function(){},methods:{Onchoosemcc:function(t){this.mccshow=!1,this.dataList.mccCode=t.mccCode,this.dataList.mccMsg=t.mccMsg,this.qualificationsList=t.qualificationsList,this.qualificationsImg=[]},OnMccCode:function(){var t=this;if(!this.isshow)return!1;this.$request.post("/coc-merchant-app/app/v1/merchantsettledin/selectIndustry").then((function(e){t.industrylist=e.data,t.mccshow=!0}))},getallList:function(){var t=this;this.$request.post("/coc-active/api/v1/merchantsettledin/dataEcho",{echoType:"4"}).then((function(e){t.dataList=e.data.merchansettledinDTO,t.dataList.screenshotImg=e.data.merchansettledinDTO.appScreenshot,t.dataList.DoorheadImg=e.data.merchansettledinDTO.doorheadPhoto,t.dataList.IndoorImg=e.data.merchansettledinDTO.indoorPhotograph,t.dataList.indoorPhotograph2=e.data.merchansettledinDTO.indoorPhotograph2,t.dataList.bnfList=[]}))},getList:function(){var t=this;this.$request.post("/coc-active/api/v1/merchantsettledin/dataEcho",{echoType:"1"}).then((function(e){t.dataList.licenseImg=e.data.settlementMaterials.licenseImg,t.dataList.juridicalIdCardFrontImg=e.data.settlementMaterials.juridicalIdCardFrontImg,t.dataList.juridicalIdCardBackImg=e.data.settlementMaterials.juridicalIdCardBackImg,t.dataList.screenshotImg=e.data.settlementMaterials.appScreenshot,t.dataList.DoorheadImg=e.data.settlementMaterials.doorheadPhoto,t.dataList.IndoorImg=e.data.settlementMaterials.doorheadPhoto,t.dataList.indoorPhotograph2=e.data.settlementMaterials.indoorPhotograph2,t.dataList.mccMsg=e.data.settlementMaterials.industryMsg,t.qualificationsImg=e.data.settlementMaterials.qualificationsImg.split(","),t.qualificationsList=e.data.settlementMaterials.qualificationsImg.split(",")}))},Submit:function(){var e=this;if(this.dataList.juridicalIdCardFrontImg&&this.dataList.juridicalIdCardBackImg&&this.dataList.licenseImg&&this.dataList.DoorheadImg&&this.dataList.IndoorImg&&this.dataList.indoorPhotograph2&&this.dataList.mccCode){if(1==this.dataList.isLineLedger&&!this.dataList.screenshotImg)return this.$refs.uToast.show({type:"default",message:"请上传'我的'页面截图"}),!1;var a=0;if(this.qualificationsImg.filter((function(t){t&&a++})),a!=this.qualificationsList.length)return this.$refs.uToast.show({type:"default",message:"请上传特殊资质图片"}),!1;this.qualificationsImg&&(this.dataList.qualificationsImg=this.qualificationsImg.join(",")),this.dataList.picList.filter((function(t){"0001"==t.document_type?t.document_name="法人身份证":"0011"==t.document_type?t.document_name="身份证反面":"0002"==t.document_type?t.document_name="商户营业执照":"0034"==t.document_type?t.document_name="商户网站/APP截图":"0005"==t.document_type?t.document_name="门头照片":"0015"==t.document_type&&(t.document_name="室内照片")})),this.dataList.regMerType="00",this.dataList.bankAcctType="1",this.dataList.shareHolderType="1",this.dataList.bnfType="1",t.navigateTo({url:"/pages/Settlein/enterpriseInfo",success:function(t){t.eventChannel.emit("getinfo",{data:e.dataList})}})}else this.$refs.uToast.show({type:"default",message:"请上传企业入驻资料"})},uploadPictures:function(e,a){var i=this,o=!1;this.$newrequest.post("/coc-active/api/v1/merchantsettledin/uploadPictures",{img:e}).then((function(e){200==e.code?(i.dataList.picList.filter((function(t,s){t.document_type==a&&(o=!0,i.dataList.picList[s]={document_type:a,file_path:e.data.filePath,file_size:e.data.fileSize})})),o||i.dataList.picList.push({document_type:a,file_path:e.data.filePath,file_size:e.data.fileSize}),i.showloading=!1):t.$u.toast(e.message)}))},getbase64:function(t,e){var a=this;(0,i.pathToBase64)(t).then((function(t){a.uploadPictures(t,e)})).catch((function(t){console.error(t)}))},OnIndoor:function(e){var a=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){1==e?(a.dataList.IndoorImg=t.tempFilePaths[0],a.uploadimg(t.tempFilePaths[0],"indoorPhotograph"),a.getbase64(t.tempFilePaths[0],"0015")):(a.dataList.indoorPhotograph2=t.tempFilePaths[0],a.uploadimg(t.tempFilePaths[0],"indoorPhotograph2"))}})},Onspecialimg:function(e){var a=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){a.uploadimg(t.tempFilePaths[0],e)}})},OnDoorhead:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){e.dataList.DoorheadImg=t.tempFilePaths[0],e.uploadimg(t.tempFilePaths[0],"doorheadPhoto"),e.getbase64(t.tempFilePaths[0],"0005")}})},Onscreenshot:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){e.dataList.screenshotImg=t.tempFilePaths[0],e.uploadimg(t.tempFilePaths[0],"appScreenshot"),e.getbase64(t.tempFilePaths[0],"0034")}})},uploadimg:function(e,a){var i=this;this.showloading=!0,t.uploadFile({url:getApp().globalData.uploadUrl,filePath:e,name:"file",formData:{file:e},header:{"Content-Type":"multipart/form-data"},success:function(t){"appScreenshot"==a?i.dataList.appScreenshot=JSON.parse(t.data).data:"doorheadPhoto"==a?i.dataList.doorheadPhoto=JSON.parse(t.data).data:"indoorPhotograph"==a?i.dataList.indoorPhotograph=JSON.parse(t.data).data:"indoorPhotograph2"==a?(i.dataList.indoorPhotograph2=JSON.parse(t.data).data,i.showloading=!1):"indoorPhotograph"==a?i.dataList.indoorPhotograph=JSON.parse(t.data).data:(i.qualificationsImg[a]=JSON.parse(t.data).data,i.showloading=!1)}})},CardlicenseImg:function(e){20==e.detail.reg_num.text.length?this.dataList.shopLic=e.detail.reg_num.text.substring(0,18):17==e.detail.reg_num.text.length?this.dataList.shopLic=e.detail.reg_num.text.substring(0,15):this.dataList.shopLic=e.detail.reg_num.text,this.dataList.shopName=e.detail.enterprise_name.text,this.dataList.shopAddrExt=e.detail.address.text;var a=this;this.showloading=!0,t.uploadFile({url:getApp().globalData.uploadUrl,filePath:e.detail.image_path,name:"file",formData:{file:e.detail.image_path},header:{"Content-Type":"multipart/form-data"},success:function(t){a.dataList.licenseImg=JSON.parse(t.data).data,a.getbase64(e.detail.image_path,"0002")}})},CardBackImg:function(e){var a=e.detail.valid_date.text.substr(e.detail.valid_date.text.lastIndexOf("-")+1,8);a=a.slice(0,4)+"-"+a.slice(4),a=a.slice(0,7)+"-"+a.slice(7),this.dataList.legalCardDeadline=a;var i=this;this.showloading=!0,t.uploadFile({url:getApp().globalData.uploadUrl,filePath:e.detail.image_path,name:"file",formData:{file:e.detail.image_path},header:{"Content-Type":"multipart/form-data"},success:function(t){i.dataList.juridicalIdCardBackImg=JSON.parse(t.data).data,i.getbase64(e.detail.image_path,"0011")}})},CardFrontImg:function(e){this.dataList.legalName=e.detail.name.text,this.dataList.legalIdcardNo=e.detail.id.text,this.dataList.legalmanHomeAddr=e.detail.address.text;var a=this;this.showloading=!0,t.uploadFile({url:getApp().globalData.uploadUrl,filePath:e.detail.image_path,name:"file",formData:{file:e.detail.image_path},header:{"Content-Type":"multipart/form-data"},success:function(t){a.dataList.juridicalIdCardFrontImg=JSON.parse(t.data).data,a.getbase64(e.detail.image_path,"0001")}})}}};e.default=o}).call(this,a("543d")["default"])},eec8:function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return s})),a.d(e,"a",(function(){return i}));var i={uFormItem:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-form-item/u-form-item")]).then(a.bind(null,"4019"))},"u-Input":function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u--input/u--input")]).then(a.bind(null,"e709"))},uToast:function(){return a.e("uni_modules/uview-ui/components/u-toast/u-toast").then(a.bind(null,"4bf8"))},uLoadingPage:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(a.bind(null,"fbb6"))},uPopup:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(a.bind(null,"076f"))},uIcon:function(){return Promise.all([a.e("common/vendor"),a.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(a.bind(null,"f23e"))}},o=function(){var t=this,e=t.$createElement,a=(t._self._c,t.qualificationsList.length);t._isMounted||(t.e0=function(e){t.mccshow=!1},t.e1=function(e,a){var i=arguments[arguments.length-1].currentTarget.dataset,o=i.eventParams||i["event-params"];a=o.index;t.currentmcc=a}),t.$mp.data=Object.assign({},{$root:{g0:a}})},s=[]}},[["5e9a","common/runtime","common/vendor"]]]);