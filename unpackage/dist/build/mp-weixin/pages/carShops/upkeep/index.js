(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/upkeep/index"],{2294:function(e,t,i){"use strict";(function(e,t){var n=i("4ea4");i("76b1");n(i("66fd"));var a=n(i("9f29"));e.__webpack_require_UNI_MP_PLUGIN__=i,t(a.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},3605:function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return s})),i.d(t,"a",(function(){return n}));var n={uSearch:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-search/u-search")]).then(i.bind(null,"ab09e"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"0f14"))},uLoadingIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-loading-icon/u-loading-icon")]).then(i.bind(null,"db21"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"8add"))}},a=function(){var e=this.$createElement,t=(this._self._c,this.dataList.length>0&&this.isReachBottom),i=0==this.dataList.length&&this.isReachBottom;this.$mp.data=Object.assign({},{$root:{g0:t,g1:i}})},s=[]},"8a68":function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={components:{carousel:function(){Promise.all([i.e("common/vendor"),i.e("components/carousel/index")]).then(function(){return resolve(i("7662"))}.bind(null,i)).catch(i.oe)}},data:function(){return{brandId:0,brandList:[],brandName:"品牌",token:null,isExpert:null,searchVisble:!1,searchType:1,oldMaintainName:"",searchField:{current:1,sort:1,priceId:"",priceName:"",maintainName:"",size:10},dataList:[],loadMore:!1,isReachBottom:!1,sortList:[{id:1,name:"默认排序"},{id:2,name:"销量"},{id:3,name:"上新"}],priceList:[{id:1,name:"500以下"},{id:2,name:"500-1千"},{id:3,name:"1千以上"}],scrollTop:0,isDiscount:0,bannerList:[],pageHeight:0,pageTotalHeight:0}},onLoad:function(t){var i=this;this.token=e.getStorageSync("token"),this.isExpert=e.getStorageSync("isExpert"),e.getSystemInfo({success:function(e){i.pageHeight=e.windowHeight}}),t.brandId&&(this.searchField.brandId=t.brandId,this.brandId=t.brandId,this.brandName=t.brandName),t.isDiscount&&(this.isDiscount=t.isDiscount),this.getbrandList(),this.queryList()},onPageScroll:function(e){this.scrollTop=e.scrollTop},onReachBottom:function(){this.isReachBottom||this.loadMore||(this.searchField.current+=1,this.queryList()())},computed:{sortName:function(){var e=this;return this.sortList.find((function(t){return t.id===e.searchField.sort})).name},isSticky:function(){return this.scrollTop<this.stickyTop},stickyTop:function(){return this.bannerList.length>0?e.upx2px(430):e.upx2px(105)}},methods:{OnsearchNobrand:function(){this.brandId=0,this.searchField.brandId=null,this.isReachBottom=!1,this.loadMore=!1,this.searchField.current=1,this.brandName="品牌",this.queryList()},searbrandItem:function(e){this.brandName=e.brandName,this.brandId=e.brandId,this.isReachBottom=!1,this.loadMore=!1,this.searchField.current=1,this.queryList()},getbrandList:function(){var e=this;this.$newrequest.post("/coc-active/api/v2/homePage/four_s/maintenanceBrand").then((function(t){e.brandList=t.data}))},openSearch:function(t){this.searchType=t,this.searchVisble=!0,this.isSticky&&this.pageTotalHeight>=this.stickyTop+this.pageHeight&&e.pageScrollTo({scrollTop:this.stickyTop,duration:0})},closeSearch:function(){this.searchType=1,this.searchVisble=!1},searchItem:function(e){1==this.searchType?this.searchField.sort=e.id:2==this.searchType&&(this.searchField.priceId=e.id,this.searchField.priceName=e.id?e.name:""),this.searchVisble=!1,this.isReachBottom=!1,this.loadMore=!1,this.searchField.current=1,this.queryList()},queryList:function(){var t=this;this.loadMore=!0;var i=Object.assign({},this.searchField);this.brandId&&(i.brandId=this.brandId),i.maintainName||delete i["maintainName"],i.priceId&&(i.range=i.priceId),delete i["priceId"],delete i["priceName"],i.isDiscount=this.isDiscount,this.$newrequest.post("/coc-active/api/v2/homePage/four_s/lowPriceMaintenances",i).then((function(n){200==n.code?(1===i.current?t.dataList=n.data.records:n.data.records.forEach((function(e){t.dataList.push(e)})),n.data.records.length<i.size&&(t.isReachBottom=!0)):e.showToast({title:n.message,icon:"none",duration:2e3})})).finally((function(){t.loadMore=!1;var i=e.createSelectorQuery().in(t);i.select("#page").boundingClientRect(),i.exec((function(i){t.pageTotalHeight=i[0].height;var n=0;!t.isSticky&&i[0].height>=t.stickyTop+t.pageHeight&&(n=t.stickyTop),e.pageScrollTo({scrollTop:n,duration:0})}))}))},search:function(){this.searchField.maintainName=this.oldMaintainName,this.isReachBottom=!1,this.loadMore=!1,this.searchField.current=1,this.queryList()},jumpDetail:function(t){e.navigateTo({url:"/pages/carShops/upkeep/detail?id="+t})}}};t.default=n}).call(this,i("543d")["default"])},"8d15":function(e,t,i){},"9f29":function(e,t,i){"use strict";i.r(t);var n=i("3605"),a=i("f278");for(var s in a)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(s);i("da52");var o=i("f0c5"),r=Object(o["a"])(a["default"],n["b"],n["c"],!1,null,"008d0e34",null,!1,n["a"],void 0);t["default"]=r.exports},da52:function(e,t,i){"use strict";var n=i("8d15"),a=i.n(n);a.a},f278:function(e,t,i){"use strict";i.r(t);var n=i("8a68"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(s);t["default"]=a.a}},[["2294","common/runtime","common/vendor"]]]);