(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-notice-bar/u-notice-bar"],{"48a9":function(n,t,e){"use strict";e.r(t);var i=e("d7b2"),u=e.n(i);for(var o in i)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return i[n]}))}(o);t["default"]=u.a},"5b48":function(n,t,e){"use strict";var i=e("a28e"),u=e.n(i);u.a},a28e:function(n,t,e){},d7b2:function(n,t,e){"use strict";(function(n){var i=e("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=i(e("9e49")),o={name:"u-notice-bar",mixins:[n.$u.mpMixin,n.$u.mixin,u.default],data:function(){return{show:!0}},methods:{click:function(n){this.$emit("click",n),this.url&&this.linkType&&this.openPage()},close:function(){this.show=!1,this.$emit("close")}}};t.default=o}).call(this,e("543d")["default"])},e497:function(n,t,e){"use strict";e.d(t,"b",(function(){return u})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return i}));var i={uColumnNotice:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-column-notice/u-column-notice")]).then(e.bind(null,"2655"))},uRowNotice:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uview-ui/components/u-row-notice/u-row-notice")]).then(e.bind(null,"19e1"))}},u=function(){var n=this.$createElement,t=(this._self._c,this.show?this.__get_style([{backgroundColor:this.bgColor},this.$u.addStyle(this.customStyle)]):null);this.$mp.data=Object.assign({},{$root:{s0:t}})},o=[]},fe8c:function(n,t,e){"use strict";e.r(t);var i=e("e497"),u=e("48a9");for(var o in u)["default"].indexOf(o)<0&&function(n){e.d(t,n,(function(){return u[n]}))}(o);e("5b48");var c=e("f0c5"),r=Object(c["a"])(u["default"],i["b"],i["c"],!1,null,"64b720da",null,!1,i["a"],void 0);t["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component',
    {
        'uni_modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fe8c"))
        })
    },
    [['uni_modules/uview-ui/components/u-notice-bar/u-notice-bar-create-component']]
]);