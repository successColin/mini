require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/wiseman/component/imgcomponent"],{3742:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i("04ff"),o={components:{popcomment:function(){Promise.all([i.e("common/vendor"),i.e("components/pop/popcomment")]).then(function(){return resolve(i("052f6"))}.bind(null,i)).catch(i.oe)},carousel:function(){Promise.all([i.e("common/vendor"),i.e("components/carousel/index")]).then(function(){return resolve(i("7662"))}.bind(null,i)).catch(i.oe)},cardauthentication:function(){i.e("components/cardauthentication").then(function(){return resolve(i("fc50"))}.bind(null,i)).catch(i.oe)}},data:function(){return{imgsbig:"",morenum:5,isshowpage:!1,showload:!1,showsheet:!1,list:[{name:"贴文删除",color:"#D91B1B",fontSize:"20"},{name:"取消",fontSize:"20"}],popimgs:!1,comments:[],current:1,name:"",imgs:[],choseshare:{},showshare:!1,chosecomment:{},showcomment:!1,chosequote:{},showquote:!1,isLoadMore:!1,tiewen:"",showpop:!1}},onLoad:function(t){var i=this;e.$on("closepop",(function(e){i.showpop=!1}))},props:{userId:{type:Number,default:0},index:{type:Number,default:0},dataList:{type:Object,default:function(){return{}}}},onShow:function(){},methods:{OnPushCommentList:function(){e.navigateTo({url:"/pages/wiseman/component/commentlist?id="+this.dataList.article.id+"&num="+this.dataList.article.commentNum})},submitcomments:function(){this.showcomment=!1,e.$u.toast("评论成功"),this.$emit("sendid",this.dataList.article.id)},OnWatchImg:function(t){e.previewImage({current:t,urls:this.dataList.article.imgarr,longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},OnPushshop:function(){e.navigateTo({url:"/pages/activityMall/business/index?id="+this.dataList.citeDetails.id})},OnPushrodehelp:function(){e.navigateTo({url:"/pages/roadhelp/index?forwardUserId="+this.dataList.article.userId})},OnPushGroup:function(){var t=this.dataList.expertShopSelection?this.dataList.expertShopSelection.relatedId:this.dataList.expertSelectionLibrary.relatedId;e.navigateTo({url:"/pages/grouppurchase/detail?id="+t+"&forwardUserId="+this.dataList.article.userId})},OnPushcar:function(){e.navigateTo({url:"/pages/carShops/carList/index?id="+this.dataList.expertSelectionLibrary.relatedId+"&type=1&shopId="+this.dataList.expertSelectionLibrary.shopId})},OnPushActivity:function(){var t=this.dataList.expertShopSelection?this.dataList.expertShopSelection.relatedId:this.dataList.expertSelectionLibrary.relatedId;e.navigateTo({url:"/pages/home/activityDetail/index?id="+t+"&forwardUserId="+this.dataList.article.userId})},OnPushupcarhelp:function(){e.navigateTo({url:"/pages/roadhelp/index?sourceType=2&forwardUserId="+this.dataList.article.userId})},OnPushupkeep:function(){var t=this.dataList.expertShopSelection?this.dataList.expertShopSelection.relatedId:this.dataList.expertSelectionLibrary.relatedId;e.navigateTo({url:"/pages/carShops/upkeep/detail?id="+t+"&forwardUserId="+this.dataList.article.userId})},OnPushuppackage:function(){var t=this.dataList.expertShopSelection?this.dataList.expertShopSelection.relatedId:this.dataList.expertSelectionLibrary.relatedId;e.navigateTo({url:"/pages/activity/activityRegistration/packagedetail?id="+t+"&forwardUserId="+this.dataList.article.userId})},submitShare:function(t){var i=this;this.$newrequest.post("/coc-active/api/v1/marvellous_activity/share_v2",{relId:this.id,shareType:t,type:2}).then((function(t){200==t.code?i.dataList.article.shareBaseNum=i.dataList.article.shareBaseNum+1:e.showToast({title:t.message,icon:"none"})}))},OnMore:function(){this.morenum=999999},closeimg:function(){this.popimgs=!1},OnSelectsheet:function(t){var i=this;"贴文删除"==t.name&&this.$request.post("/coc-social/api/v2/article/addArticle",{articleId:this.dataList.article.id,articleUserId:this.userId}).then((function(t){200==t.code?i.$refs.uToast.show({message:"删除成功",type:"success",complete:function(){e.navigateBack({delta:1})}}):i.$refs.uToast.show({message:t.message})}))},Onshowsheet:function(){this.showsheet=!0},delComments:function(t){var i=this;this.$request.post("/coc-active/api/v1/comments/delComments",{id:t}).then((function(t){200==t.code?(e.$u.toast("删除成功"),i.$emit("sendid",i.dataList.article.id)):i.$refs.uToast.show({message:t.message})}))},OnOpenImg:function(e){console.log(e),this.imgsbig=e,this.popimgs=!0},previewImage:function(t){e.previewImage({urls:[t],longPressActions:{itemList:["发送给朋友","保存图片","收藏"],success:function(e){console.log("选中了第"+(e.tapIndex+1)+"个按钮,第"+(e.index+1)+"张图片")},fail:function(e){console.log(e.errMsg)}}})},Onshare:function(){this.choseshare=this.dataList.article,this.showshare=!0},Onquote:function(){!0===(0,n.tologin)()&&(this.chosequote=this.dataList.article,this.showquote=!0)},OnlikeBase:function(){var t=this;!0===(0,n.tologin)()&&this.$request.post("/coc-social/api/v2/article/like",{id:this.dataList.article.id}).then((function(i){200==i.code?2==t.dataList.article.likeType?e.$emit("changelike",{likeType:1,index:t.index}):e.$emit("changelike",{likeType:2,index:t.index}):e.showToast({title:i.message,icon:"none"})}))},getList:function(){var e=this;this.isshowpage||this.$showLoading(),this.$newrequest.post("/coc-social/api/v1/article/findById",{id:this.id,current:this.current,size:10}).then((function(t){t.data.article.title&&(e.tiewen=t.data.article.title),e.dataList=t.data,e.imgs=t.data.article.imgs.split(","),t.data.comments.length<10&&(e.isLoadMore=!0),1==e.current?e.comments=t.data.comments:t.data.comments.filter((function(t){e.comments.push(t)}))})).catch((function(e){})).finally((function(){e.isshowpage||(e.isshowpage=!0,e.$hideLoading())}))},gettiem:function(e){var t=864e5,i=(new Date).getTime(),n=i-e;if(!(n<0)){var o=n/2592e6,s=n/(7*t),a=n/t,c=n/36e5,r=n/6e4,u="";return u=o>=1?parseInt(o)+"月前":s>=1?parseInt(s)+"周前":a>=1?parseInt(a)+"天前":c>=1?parseInt(c)+"小时前":r>=1?parseInt(r)+"分钟前":"刚刚",u}},Onreply:function(t){if(!0===(0,n.tologin)()){if(1!=e.getStorageSync("isCertify"))return this.showpop=!0,!1;this.chosecomment=this.dataList.article,this.chosecomment.commentType="4",this.chosecomment.id=t.commentId,this.showcomment=!0}},OnOpencomment:function(){if(!0===(0,n.tologin)()){if(1!=e.getStorageSync("isCertify"))return this.showpop=!0,!1;this.chosecomment=this.dataList.article,this.chosecomment.commentType="2",this.chosecomment.id=this.dataList.article.id,this.showcomment=!0}},closepopcomment:function(){this.showcomment=!1}}};t.default=o}).call(this,i("543d")["default"])},"4bb7":function(e,t,i){},5008:function(e,t,i){"use strict";i.r(t);var n=i("3742"),o=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=o.a},"6a3f":function(e,t,i){"use strict";i.r(t);var n=i("a94c"),o=i("5008");for(var s in o)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return o[e]}))}(s);i("d110");var a=i("f0c5"),c=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);t["default"]=c.exports},a94c:function(e,t,i){"use strict";i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={uSwiper:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(i.bind(null,"d76a"))},uAvatar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(i.bind(null,"d838"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"0f14"))},uDivider:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(i.bind(null,"944a"))},"u-Input":function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u--input/u--input")]).then(i.bind(null,"c00c"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"8add"))},uToast:function(){return i.e("uni_modules/uview-ui/components/u-toast/u-toast").then(i.bind(null,"1b13"))},uActionSheet:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-action-sheet/u-action-sheet")]).then(i.bind(null,"ab3c"))},uLoadingPage:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(i.bind(null,"e325"))}},o=function(){var e=this,t=e.$createElement,i=(e._self._c,e.gettiem(e.dataList.article.time)),n=e.dataList.comments.length;e._isMounted||(e.e0=function(t){e.showsheet=!1},e.e1=function(t){e.showpop=!1}),e.$mp.data=Object.assign({},{$root:{m0:i,g0:n}})},s=[]},d110:function(e,t,i){"use strict";var n=i("4bb7"),o=i.n(n);o.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/wiseman/component/imgcomponent-create-component',
    {
        'pages/wiseman/component/imgcomponent-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("6a3f"))
        })
    },
    [['pages/wiseman/component/imgcomponent-create-component']]
]);
