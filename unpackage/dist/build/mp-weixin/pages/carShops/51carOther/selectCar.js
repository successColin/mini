(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/carShops/51carOther/selectCar"],{"173c":function(e,t,i){"use strict";(function(e){var n=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("9523")),c={components:{carousel:function(){Promise.all([i.e("common/vendor"),i.e("components/carousel/index")]).then(function(){return resolve(i("c969"))}.bind(null,i)).catch(i.oe)},carlist:function(){Promise.all([i.e("common/vendor"),i.e("components/carlist/carlist")]).then(function(){return resolve(i("3f63"))}.bind(null,i)).catch(i.oe)}},data:function(){var e;return{searchVisble:!1,searchType:1,oldSearchTxt:"",tabindex:"",searchField:(e={api_name:"list",page:1,page_size:10,price:"",brand_id:"",car_type:"",vehicle_title:"",tab_type:"2"},(0,a.default)(e,"vehicle_title",""),(0,a.default)(e,"list_type",""),e),changeList:!0,isBottom:!1,carPriceName:"",brandName:"",energyTypeName:"",carPriceList:[{name:"10万以下",price:"0-10"},{name:"10-15万",price:"10-15"},{name:"15-20万",price:"15-20"},{name:"20-30万",price:"20-30"},{name:"30-40万",price:"30-40"},{name:"40-50万",price:"40-50"},{name:"50万以上",price:"50-9999"}],selfList:[{name:"1万以内",price:"0-1"},{name:"1-2万",price:"1-2"},{name:"2-3万",price:"2-3"},{name:"3-4万",price:"3-4"},{name:"4-5万",price:"4-5"},{name:"5万以上",price:"5-9999"}],energyTypeList:[{name:"燃油",value:"1"},{name:"新能源车",value:"3"},{name:"混合动力",value:"4"}],brandList:[],scrollTop:0,pageHeight:0,pageTotalHeight:0}},onLoad:function(t){var i=this,n=t.type,a=t.searchId,c=t.searchName,r=t.tabindex,s=t.searchValue;this.tabindex=r,this.searchField.list_type=r,this.oldSearchTxt=s,this.searchField.vehicle_title=s,n&&a&&(a=parseInt(a),3==n?(this.searchField.brand_id=a,this.brandName=c):4==n&&(this.searchField.car_type=a,this.energyTypeName=c)),e.getSystemInfo({success:function(e){i.pageHeight=e.windowHeight}}),this.getBrandList()},onReachBottom:function(){this.searchField.page++,this.changeList=!1,this.isBottom=!0},computed:{isSticky:function(){return this.scrollTop<this.stickyTop}},methods:{getBrandList:function(){var t=this;this.$request51car.post("app/wechat/api",{api_name:"brand_list",list_type:this.tabindex}).then((function(i){1==i.code?t.brandList=i.data:e.showToast({title:i.message,icon:"none",duration:2e3})}))},openSearch:function(t){this.searchType=t,this.searchVisble=!0,this.isSticky&&this.pageTotalHeight>=this.stickyTop+this.pageHeight&&e.pageScrollTo({scrollTop:this.stickyTop,duration:0})},closeSearch:function(){this.searchType=1,this.searchVisble=!1},searchItem:function(e){2==this.searchType?(this.searchField.price=e.price,this.carPriceName=e.name):3==this.searchType?(this.searchField.brand_id=e.brand_id,this.brandName=e.brand_name):4==this.searchType&&(this.searchField.car_type=e.value,this.energyTypeName=e.name),this.searchField.page=1,this.changeList=!0,this.isBottom=!1,this.searchVisble=!1},search:function(){this.searchField.vehicle_title=this.oldSearchTxt,this.searchField.page=1,this.changeList=!0,this.isBottom=!1}}};t.default=c}).call(this,i("543d")["default"])},"4ebc":function(e,t,i){"use strict";i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return c})),i.d(t,"a",(function(){return n}));var n={uSearch:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-search/u-search")]).then(i.bind(null,"ea79"))},uIcon:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(i.bind(null,"f23e"))},carlist:function(){return Promise.all([i.e("common/vendor"),i.e("components/carlist/carlist")]).then(i.bind(null,"3f63"))},uPopup:function(){return Promise.all([i.e("common/vendor"),i.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(i.bind(null,"076f"))}},a=function(){var e=this.$createElement;this._self._c},c=[]},"570b":function(e,t,i){"use strict";i.r(t);var n=i("173c"),a=i.n(n);for(var c in n)["default"].indexOf(c)<0&&function(e){i.d(t,e,(function(){return n[e]}))}(c);t["default"]=a.a},"9b0f":function(e,t,i){"use strict";i.r(t);var n=i("4ebc"),a=i("570b");for(var c in a)["default"].indexOf(c)<0&&function(e){i.d(t,e,(function(){return a[e]}))}(c);i("ac0c");var r=i("f0c5"),s=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"25251f66",null,!1,n["a"],void 0);t["default"]=s.exports},a4e6:function(e,t,i){"use strict";(function(e,t){var n=i("4ea4");i("4319");n(i("66fd"));var a=n(i("9b0f"));e.__webpack_require_UNI_MP_PLUGIN__=i,t(a.default)}).call(this,i("bc2e")["default"],i("543d")["createPage"])},ac0c:function(e,t,i){"use strict";var n=i("eb0d"),a=i.n(n);a.a},eb0d:function(e,t,i){}},[["a4e6","common/runtime","common/vendor"]]]);