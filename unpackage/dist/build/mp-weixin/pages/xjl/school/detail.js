(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/xjl/school/detail"],{"1e0c":function(t,e,i){},7267:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uSwiper:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(i.bind(null,"d76a"))},uAvatarGroup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar-group/u-avatar-group")]).then(i.bind(null,"500a"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"0f14"))},uDivider:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(i.bind(null,"944a"))},uAvatar:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(i.bind(null,"d838"))},uRate:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-rate/u-rate")]).then(i.bind(null,"439d"))},uModal:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-modal/u-modal")]).then(i.bind(null,"ba5d"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"8add"))}},a=function(){var t=this.$createElement,e=(this._self._c,this.dataList.likes_user.length),i=this.dataList.evaluate.list.length,n=i>0?this.dataList.evaluate.list[0].star.toFixed(1):null;this.$mp.data=Object.assign({},{$root:{g0:e,g1:i,g2:n}})},o=[]},"87e0":function(t,e,i){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("04ff"),o={components:{},data:function(){return{safeHeight:0,isActive:!1,btntext:"查看全部",poplikes:!1,showmodal:!1,id:"",dataList:{},likesuser:[],circleList:[],page:1,isLoadMore:!1}},computed:{height:function(){return"calc(100vh - 42px - 48rpx - ".concat(this.safeHeight,"px)")}},onLoad:function(e){var i=this;this.id=e.id,this.getList(),this.getarticlelist(),t.$on("getdata",(function(e){if(!t.getStorageSync("xjltoken"))return t.navigateBack({delta:1}),!1;i.getList()})),t.$on("add",(function(t){i.getList()}))},onReady:function(){var e=this;t.createSelectorQuery().in(this).select(".safe-bottom-height").boundingClientRect((function(t){e.safeHeight=parseInt(t.height)})).exec()},onReachBottom:function(){this.isLoadMore||(this.page++,this.getarticlelist())},onShareAppMessage:function(t){var e=this.dataList.name;return{title:e}},onShareTimeline:function(t){var e=this.dataList.name;return{title:e}},onShow:function(){},methods:{OnPusharticleDetail:function(e){t.navigateTo({url:"/pages/xjl/article/detail?id="+e.id})},closepoplikes:function(){this.poplikes=!1},closeshowmodal:function(){this.showmodal=!1},Onshowmodal:function(){this.showmodal=!0},clickswiper:function(e){t.previewImage({urls:this.dataList.place_img,current:e})},OnPushsingup:function(){var e=this;t.navigateTo({url:"/pages/xjl/school/singup?id="+this.id,success:function(t){t.eventChannel.emit("sendlist",{data:e.dataList})}})},OnPushEvaluateSchool:function(){t.navigateTo({url:"/pages/xjl/school/evaluatedetail?id="+this.id})},OnAllevaluate:function(){t.navigateTo({url:"/pages/xjl/school/evaluate?id="+this.id})},Openteacherlist:function(){t.navigateTo({url:"/pages/xjl/school/teacherlist?id="+this.id})},OnPushTeacherDetail:function(e){t.navigateTo({url:"/pages/xjl/teacher/detail?id="+e.id})},clickImg:function(t){n.previewImage({urls:[t],current:"",success:function(t){},fail:function(t){},complete:function(t){}})},getarticlelist:function(){var t=this;this.$xjlrequest.get("/user/learn/drive/circle/list?page_size=20&token=&page="+this.page).then((function(e){e.data.length<20&&(t.isLoadMore=!0),1==t.page?t.circleList=e.data:e.data.filter((function(e){t.circleList.push(e)}))}))},OnWatchAll:function(){"查看全部"==this.btntext?(this.btntext="收起",this.isActive=!0):"收起"==this.btntext&&(this.btntext="查看全部",this.isActive=!1)},OnLikes:function(){var e=this;this.$xjlrequest.post("/api/userLike",{type:"6",rel_id:this.id,user_id:(0,a.getstorage)("xjluserid"),source:"1"}).then((function(i){200==i.code?(e.getList(),e.poplikes=!0):t.$u.toast(i.msg)}))},Ontel:function(){t.makePhoneCall({phoneNumber:this.dataList.tel})},OnopenLocation:function(){var e=52.35987755982988,i=this.dataList.lng-.0065,n=this.dataList.lat-.006,a=Math.sqrt(i*i+n*n)-2e-5*Math.sin(n*e),o=Math.atan2(n,i)-3e-6*Math.cos(i*e),s=a*Math.cos(o),u=a*Math.sin(o);t.openLocation({latitude:Number(u),longitude:Number(s),success:function(){console.log("success")}})},getList:function(){var t=this;this.$tokenxjlrequest.get("/user/home/newSchoolDetail?token="+(0,a.getstorage)("xjltoken")+"&school_id="+this.id).then((function(e){e.data.evaluate.list.length>0&&(e.data.evaluate.list[0].tag_name=e.data.evaluate.list[0].tag_name.split(",")),e.data.evaluate.list.filter((function(t){t.imgs.filter((function(e,i){"https://oss.dcqcjlb.com"==e.substring(23,68)&&(t.imgs[i]=e.substring(23))}))})),t.dataList=e.data,t.likesuser=[],e.data.likes_user.length>3&&(e.data.likes_user.filter((function(e,i){i<3&&t.likesuser.push(e)})),t.likesuser.push("https://oss.dcqcjlb.com/51che_java_dev/20230406/file_1680768096146.png"))}))}}};e.default=o}).call(this,i("543d")["default"],i("bc2e")["default"])},a6c2:function(t,e,i){"use strict";i.r(e);var n=i("7267"),a=i("f26d");for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("dbab");var s=i("f0c5"),u=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=u.exports},b132:function(t,e,i){"use strict";(function(t,e){var n=i("4ea4");i("76b1");n(i("66fd"));var a=n(i("a6c2"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(a.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},dbab:function(t,e,i){"use strict";var n=i("1e0c"),a=i.n(n);a.a},f26d:function(t,e,i){"use strict";i.r(e);var n=i("87e0"),a=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a}},[["b132","common/runtime","common/vendor"]]]);