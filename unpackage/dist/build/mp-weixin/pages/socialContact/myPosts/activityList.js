(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/socialContact/myPosts/activityList"],{"029d":function(t,e,i){"use strict";i.d(e,"b",(function(){return s})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}));var n={uSearch:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-search/u-search")]).then(i.bind(null,"ea79"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"f23e"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"076f"))}},s=function(){var t=this.$createElement;this._self._c},o=[]},2020:function(t,e,i){"use strict";i.r(e);var n=i("029d"),s=i("fd4a");for(var o in s)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return s[t]}))}(o);i("498d");var a=i("f0c5"),c=Object(a["a"])(s["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],void 0);e["default"]=c.exports},"498d":function(t,e,i){"use strict";var n=i("e194"),s=i.n(n);s.a},"4c80":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={components:{},data:function(){return{istwo:!1,isshow:!1,isnext:!1,type:null,index:null,isshowpop:!1,rightbox:"支付优惠",leftbox:"活动分类",categoryList:[],categoryId:null,dataList:[],title:"",current:1,isLoadMore:!1,token:null,isExpert:null,typeList:[{id:null,title:"全部"},{id:6,title:"工行优惠"},{id:5,title:"农行优惠"},{id:4,title:"人保优惠"}]}},onLoad:function(){this.token=t.getStorageSync("token"),this.isExpert=t.getStorageSync("isExpert"),this.getcategoryId(),this.getList()},onReachBottom:function(){this.isLoadMore||(this.current++,this.getList()),!this.isnext&&this.istwo&&(this.current++,this.getendList())},onShow:function(){},methods:{OnPushClose:function(){this.isshow=!1,this.istwo=!0,this.current=1,this.getendList()},OnAdd:function(e){t.navigateBack({delta:1}),t.$emit("chooseactivity",e)},OnPushDetail:function(e){t.navigateTo({url:"/pages/home/activityDetail/index?id="+e.activityId})},Onright:function(t){this.current=1,this.type=t.id,this.getList(),1==t.id?this.rightbox="支付优惠":this.rightbox=t.title},Onleft:function(t){this.current=1,this.categoryId=t.id,this.getList(),null==t.id?this.leftbox="活动分类":this.leftbox=t.categoryName},Onchangeindex:function(t){this.index=t},closepop:function(){this.isshowpop=!1},openSearch:function(t){this.isshowpop=!0,this.index=t},Onsearch:function(){if(this.current=1,this.dataList=[],!this.title)return this.getList(),!1;this.getAll()},getcategoryId:function(){var t=this;this.$newrequest.post("/coc-system/api/v1/system/category/tag/list",{status:1}).then((function(e){e.data.unshift({categoryName:"全部",id:null}),t.categoryList=e.data}))},getall2:function(){var t=this;this.$request.post("/coc-active/api/v2/homePage/getActivitysV2",{activityPaymentPreferenceId:this.type,current:this.current,isEnd:2,isStart:2,newUserLimit:0,payType:0,shopTypeId:0,size:99,title:this.title,shopId:null,categoryId:this.categoryId}).then((function(e){e.data.homePageActivitysVOIPage.records.filter((function(e){t.dataList.push(e)}))}))},getAll:function(){var t=this;this.dataList=[],this.$request.post("/coc-active/api/v2/homePage/getActivitysV2",{activityPaymentPreferenceId:this.type,current:this.current,isEnd:1,isStart:2,newUserLimit:0,payType:0,shopTypeId:0,size:99,title:this.title,shopId:null,categoryId:this.categoryId}).then((function(e){e.data.homePageActivitysVOIPage.records.filter((function(e){t.dataList.push(e)})),t.getall2()}))},getendList:function(){var t=this;this.$request.post("/coc-active/api/v2/homePage/getActivitysV2",{activityPaymentPreferenceId:this.type,current:this.current,isEnd:2,isStart:2,newUserLimit:0,payType:0,shopTypeId:0,size:20,title:this.title,shopId:null,categoryId:this.categoryId}).then((function(e){e.data.homePageActivitysVOIPage.records.length<20&&(t.isnext=!0),e.data.homePageActivitysVOIPage.records.filter((function(e){t.dataList.push(e)}))}))},getList:function(){var t=this;this.$request.post("/coc-active/api/v2/homePage/getActivitysV2",{activityPaymentPreferenceId:this.type,current:this.current,isEnd:1,isStart:2,newUserLimit:0,payType:0,shopTypeId:0,size:20,title:this.title,shopId:null,categoryId:this.categoryId}).then((function(e){e.data.homePageActivitysVOIPage.records.length<20&&(t.isLoadMore=!0,t.isshow=!0),1==t.current?t.dataList=e.data.homePageActivitysVOIPage.records:e.data.homePageActivitysVOIPage.records.filter((function(e){t.dataList.push(e)}))}))}}};e.default=i}).call(this,i("543d")["default"])},e194:function(t,e,i){},f4f9:function(t,e,i){"use strict";(function(t,e){var n=i("4ea4");i("4319");n(i("66fd"));var s=n(i("2020"));t.__webpack_require_UNI_MP_PLUGIN__=i,e(s.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},fd4a:function(t,e,i){"use strict";i.r(e);var n=i("4c80"),s=i.n(n);for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=s.a}},[["f4f9","common/runtime","common/vendor"]]]);