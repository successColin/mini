(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/grouppurchase/packagedetail"],{"25b9":function(e,t,n){},"3f93":function(e,t,n){"use strict";(function(e,t){var i=n("4ea4");n("76b1");i(n("66fd"));var o=i(n("e0c3"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(o.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},"448f":function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return i}));var i={uParse:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-parse/u-parse")]).then(n.bind(null,"b3af"))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,"8add"))}},o=function(){var e=this.$createElement,t=(this._self._c,this.isshowpage?this.imgList.length:null),n=this.isshowpage?this.commentList.length:null;this.$mp.data=Object.assign({},{$root:{g0:t,g1:n}})},s=[]},"667b":function(e,t,n){"use strict";var i=n("25b9"),o=n.n(i);o.a},c9f3:function(e,t,n){"use strict";n.r(t);var i=n("e378"),o=n.n(i);for(var s in i)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(s);t["default"]=o.a},e0c3:function(e,t,n){"use strict";n.r(t);var i=n("448f"),o=n("c9f3");for(var s in o)["default"].indexOf(s)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(s);n("667b");var a=n("f0c5"),r=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],void 0);t["default"]=r.exports},e378:function(e,t,n){"use strict";(function(e){var i=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=i(n("2eee")),s=i(n("c973")),a=n("04ff"),r={components:{carousel:function(){Promise.all([n.e("common/vendor"),n.e("components/carousel/index")]).then(function(){return resolve(n("7662"))}.bind(null,n)).catch(n.oe)},Poster:function(){n.e("components/zhangyuhao-poster/Poster").then(function(){return resolve(n("8293"))}.bind(null,n)).catch(n.oe)},commission:function(){n.e("components/commission/index").then(function(){return resolve(n("d371"))}.bind(null,n)).catch(n.oe)},joinshopbtn:function(){n.e("components/joinshopbtn/index").then(function(){return resolve(n("ba8e"))}.bind(null,n)).catch(n.oe)},recommendX:function(){Promise.all([n.e("common/vendor"),n.e("components/darenRecommend/recommendX")]).then(function(){return resolve(n("9dd0"))}.bind(null,n)).catch(n.oe)},floatVideo:function(){Promise.all([n.e("common/vendor"),n.e("components/floatVideo/index")]).then(function(){return resolve(n("954c"))}.bind(null,n)).catch(n.oe)},detailEvaluate:function(){Promise.all([n.e("common/vendor"),n.e("components/evaluate/detailEvaluate")]).then(function(){return resolve(n("27ef"))}.bind(null,n)).catch(n.oe)}},computed:{noTimeArr:function(){return console.log(this.dataList),this.dataList.merchantNotUseTimesMsg&&this.dataList.merchantNotUseTimesMsg.split(",")||[]}},data:function(){return{imgList:[],id:"",dataList:{},showpopshare:!1,poster:"",list:[],forwardUserId:null,isshowpage:!1,iscommission:0,token:null,isExpert:null,relatedType:null,recommendLength:0,commentList:[],commentInfo:{}}},destroyed:function(){e.$off("saveaddshop")},onLoad:function(t){var n=this;console.log("option.relatedType=========",t.relatedType),this.id=t.id,console.log("进来了===========》",JSON.stringify(t),t),t.enter&&e.setStorageSync("enter",t.enter),t.scene&&t.scene.indexOf("_enter=117")&&e.setStorageSync("enter","117"),t.iscommission&&(this.iscommission=t.iscommission),t.relatedType&&(this.relatedType=t.relatedType),t.forwardUserId&&(this.forwardUserId=t.forwardUserId,e.getStorageSync("token")?e.getStorageSync("token")&&1!=e.getStorageSync("isExpert")&&this.tempparentid():(0,a.tologin)()),t.scene&&(this.id=t.scene.split("_")[0],this.forwardUserId=t.scene.split("_")[1],e.getStorageSync("token")?e.getStorageSync("token")&&1!=e.getStorageSync("isExpert")&&this.tempparentid():(0,a.tologin)()),this.forwardUserId||(this.forwardUserId=(0,a.getstorage)("userId")),this.token=e.getStorageSync("token"),this.isExpert=e.getStorageSync("isExpert"),this.getList(),e.$on("saveaddshop",(function(e){n.getList()})),this.getRecommendList(),this.getComments()},onShareTimeline:function(t){if(!e.getStorageSync("token"))return(0,a.tologin)(),!1;var n=this.dataList.title,i=this.dataList.appletsSharePic?this.dataList.appletsSharePic:this.dataList.coverPicture;return{title:n,path:"/pages/grouppurchase/packagedetail?forwardUserId="+this.forwardUserId+"&id="+this.id+"&enter=117",imageUrl:i}},onShareAppMessage:function(t){if(!e.getStorageSync("token"))return(0,a.tologin)(),!1;var n=this.dataList.title,i=this.dataList.appletsSharePic?this.dataList.appletsSharePic:this.dataList.coverPicture;return{title:n,path:"/pages/grouppurchase/packagedetail?forwardUserId="+this.forwardUserId+"&id="+this.id+"&enter=117",imageUrl:i}},methods:{getRecommendList:function(){var e=this;return(0,s.default)(o.default.mark((function t(){var n,i;return o.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request.post("/coc-social/api/v2/article/expertRecommend",{current:1,size:100,relatedType:e.relatedType,relatedId:e.id});case 2:n=t.sent,i=n.data.records,e.recommendLength=i.length;case 5:case"end":return t.stop()}}),t)})))()},tempparentid:function(){this.$request.post("/coc-active/api/v1/invite/temp_parent_id/add",{tempParentId:this.forwardUserId}).then((function(e){}))},getList:function(){var t=this;this.isshowpage||this.$showLoading(),this.$newrequest.post("/coc-merchant-app/app/v2/order_management/merchantMealDetails",{id:this.id}).then((function(n){var i=[];if(200===n.code){if(n.data.adUrl){var o=n.data.adUrl.split(",");o.forEach((function(e){i.push({url:e,type:"image"})})),t.imgList=i}t.dataList=n.data}else e.$u.toast(n.message)})).finally((function(){t.isshowpage||(t.isshowpage=!0,t.$hideLoading())}))},handleComment:function(){var t={commentType:7,id:this.id,shopName:this.dataList.shopName};e.navigateTo({url:"/pages/service/evaluate/writeEvaluate?info="+JSON.stringify(t)})},Onaddcollections:function(){(0,a.tologin)(),2==this.dataList.isCollection?this.dataList.isCollection=1:this.dataList.isCollection=2,(0,a.getstorage)("token")&&this.$request.post("/coc-active/api/v1/collections/add_collections",{type:"4",relId:this.dataList.id,relName:this.dataList.shopName,activityMoney:this.dataList.flashSalePrice}).then((function(e){if(200==e.code);}))},OnCloseShare:function(){this.showpopshare=!1},popposter:function(){var t=this;if(!e.getStorageSync("token"))return(0,a.tologin)(),!1;this.$request.post("/coc-active/api/v1/invite/getMiniProgramQrCode",{page:"pages/grouppurchase/packagedetail",scene:this.id+"_"+this.forwardUserId+"_enter=117"}).then((function(e){t.showpopshare=!0,t.list=[{type:"image",path:t.dataList.posterFigureUrl,x:0,y:0,width:443,height:787},{type:"image",path:e.data.qrCode,x:18,y:682,width:90,height:90}],t.$nextTick((function(){t.$refs.poster.create()}))}))},posterSuccess:function(e){this.poster=e},Oncopy:function(t){e.setClipboardData({data:t,success:function(){e.$u.toast("复制成功")}})},OnSaveImage:function(){var t=[this.poster];e.previewImage({current:99999,urls:t,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},Onsingup:function(){var t=this;e.navigateTo({url:"/pages/grouppurchase/packagepayindex?istype=wx&forwardUserId="+this.forwardUserId,success:function(e){e.eventChannel.emit("getinfo",{data:t.dataList}),t.showpop=!1}})},OnPushMap:function(){e.openLocation({latitude:this.dataList.lat,longitude:this.dataList.lng,success:function(){console.log("success")}})},OnPushshopHome:function(){e.navigateTo({url:"/pages/activityMall/business/index?id="+this.dataList.shopId})},getComments:function(){var e=this;this.$newrequest.post("/coc-system/api/v1/user_interaction/getComment",{id:this.id,commentType:7,current:1,size:10}).then((function(t){t.data.records.forEach((function(e){e.imgs&&(e.imgs=e.imgs.split(","))})),e.commentList=t.data.records,e.commentInfo={id:e.id,commentType:7,listNum:t.data.total}}))},submitAppoint:function(){var t=this;!0===(0,a.tologin)()&&(1!=this.dataList.isAppointment?this.$newrequest.post("/coc-merchant-app/app/v2/order_management/appointment",{relId:this.id,relType:3}).then((function(n){200==n.code?(t.dataList.isAppointment=1,e.showToast({icon:"none",title:"预约成功"})):e.showToast({icon:"none",title:n.message})})):e.showToast({icon:"none",title:"已预约"}))}}};t.default=r}).call(this,n("543d")["default"])}},[["3f93","common/runtime","common/vendor"]]]);