(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/carousel/index"],{1557:function(e,t,n){},"1c26":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"a",(function(){return r}));var r={uSwiper:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-swiper/u-swiper")]).then(n.bind(null,"d76a"))}},i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.banner.length),r=n>0?e.__get_style([e.topStyle]):null,i=n>0&&e.showCount?e.banner.length:null;e._isMounted||(e.e0=function(t){return e.bannercurrent=t.current},e.e1=function(t){return e.bannercurrent=t.current},e.e2=function(t){return e.bannercurrent=t.current}),e.$mp.data=Object.assign({},{$root:{g0:n,s0:r,g1:i}})},u=[]},3054:function(e,t,n){"use strict";n.r(t);var r=n("61db"),i=n.n(r);for(var u in r)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return r[e]}))}(u);t["default"]=i.a},"61db":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n("04ff"),i={props:{type:{type:Number,default:1},shopId:{type:Number,default:null},topClass:{type:Array,default:function(){return[]}},topStyle:{type:Object,default:function(){return{}}},height:{type:String,default:function(){return"400rpx"}},list:{type:Array,default:function(){return[]}},urlkey:{type:String,default:function(){return"url"}},dataType:{type:Number,default:function(){return 2}},systemCode:{type:String,default:function(){return""}},indicatorType:{type:Number,default:function(){return 4}},autoPlay:{type:Boolean,default:function(){return!0}},isfullscreen:{type:Boolean,default:function(){return!0}},clickType:{type:Number,default:function(){return 1}},radius:{type:Number,default:function(){return 4}},showCount:{type:Boolean,default:function(){return!1}},imgMode:{type:String,default:function(){return"scaleToFill"}},bgColor:{type:String,default:function(){return"#f8f8f8"}},indicatorStyle:{type:String,default:""}},created:function(){var e=this;2==this.dataType?this.systemCode&&this.getCarouselList(this.systemCode):(console.log(this.list),this.list.forEach((function(t){"video"!=t.type||t.poster||(t.poster=t.poster||t.url+"?x-oss-process=video/snapshot,t_1000,m_fast"),e.banner.push(t)})))},watch:{systemCode:function(e){e&&e.length>0&&this.getCarouselList(e)}},data:function(){return{banner:[],bannercurrent:0,videoUrl:null,videoContext:null}},methods:{changebannercurrent:function(t){this.bannercurrent=t.current,e.$emit("changebannercurrent",{index:t.current,url:this.banner[t.current].backgroundUrl})},getCarouselListshopid:function(t,n){var r=this,i="";i=1==this.type?"/coc-system/api/v1/system/dictionaries/banner/list":"/coc-active/api/v1/four_s/bannerList",this.$newrequest.post(i,{adPosition:t,shopId:n}).then((function(t){200==t.code?(r.banner=t.data,r.$emit("input",t.data)):e.showToast({title:t.message,icon:"none",duration:2e3})}))},getCarouselList:function(t){var n=this,r="";r=1==this.type?"/coc-system/api/v1/system/dictionaries/banner/list":"/coc-active/api/v1/four_s/bannerList",this.$newrequest.post(r,{adPosition:t,shopId:this.shopId}).then((function(t){200==t.code?(n.banner=t.data,n.$emit("input",t.data)):e.showToast({title:t.message,icon:"none",duration:2e3})}))},clickswiper:function(t){var n=this;if(!(0,r.tologin)())return!1;var i=Object.assign({},this.banner[t]);if("video"==i.type)this.videoUrl=this.banner[t].url,this.videoContext=e.createVideoContext("myVideo",this);else if(1==this.clickType){var u=["pages/home/index","pages/home/integral","pages/home/activityMall/index","pages/home/my","pages/home/4sShop"];1==i.jumpType&&i.pageRoute?i.jumpUrl?u.findIndex((function(e){return e==i.pageRoute}))>=0?e.switchTab({url:"/"+i.pageRoute+"?id="+i.jumpUrl}):"pages/carShops/carList/index?type=1"==i.pageRoute||"pages/carShops/carList/index?type=2"==i.pageRoute?e.navigateTo({url:"/"+i.pageRoute+"&id="+i.jumpUrl}):e.navigateTo({url:"/"+i.pageRoute+"?id="+i.jumpUrl}):u.findIndex((function(e){return e==i.pageRoute}))>=0?e.switchTab({url:"/"+i.pageRoute}):e.navigateTo({url:"/"+i.pageRoute}):2==i.jumpType&&i.jumpUrl&&e.navigateTo({url:"/pages/home/webview?url="+i.jumpUrl})}else if(2==this.clickType&&"image"==i.type){var o=[],a=0;this.banner.forEach((function(e,r){"image"==e.type?o.push(e[n.urlkey]):"video"==e.type&&r<t&&a++})),e.previewImage({urls:o,current:t-a})}},fullscreenchange:function(e){e.detail.fullScreen||(this.videoUrl=null,this.videoContext=null)},setVideo:function(){this.videoUrl=null,this.videoContext=null}}};t.default=i}).call(this,n("543d")["default"])},7662:function(e,t,n){"use strict";n.r(t);var r=n("1c26"),i=n("3054");for(var u in i)["default"].indexOf(u)<0&&function(e){n.d(t,e,(function(){return i[e]}))}(u);n("c083");var o=n("f0c5"),a=Object(o["a"])(i["default"],r["b"],r["c"],!1,null,"6c1f2fdc",null,!1,r["a"],void 0);t["default"]=a.exports},c083:function(e,t,n){"use strict";var r=n("1557"),i=n.n(r);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/carousel/index-create-component',
    {
        'components/carousel/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("7662"))
        })
    },
    [['components/carousel/index-create-component']]
]);
