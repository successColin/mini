(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uview-ui/components/u-index-anchor/u-index-anchor"],{"0a85":function(n,t,i){"use strict";i.d(t,"b",(function(){return e})),i.d(t,"c",(function(){return u})),i.d(t,"a",(function(){}));var e=function(){var n=this.$createElement,t=(this._self._c,this.$u.addUnit(this.height)),i=this.$u.addUnit(this.size);this.$mp.data=Object.assign({},{$root:{g0:t,g1:i}})},u=[]},"213f":function(n,t,i){"use strict";var e=i("eb1c"),u=i.n(e);u.a},45029:function(n,t,i){"use strict";i.r(t);var e=i("0a85"),u=i("f9f2");for(var a in u)["default"].indexOf(a)<0&&function(n){i.d(t,n,(function(){return u[n]}))}(a);i("213f");var r=i("f0c5"),c=Object(r["a"])(u["default"],e["b"],e["c"],!1,null,"1afb93c7",null,!1,e["a"],void 0);t["default"]=c.exports},"9f68":function(n,t,i){"use strict";(function(n){var e=i("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var u=e(i("5ec8")),a={name:"u-index-anchor",mixins:[n.$u.mpMixin,n.$u.mixin,u.default],data:function(){return{}},mounted:function(){this.init()},methods:{init:function(){var t=n.$u.$parent.call(this,"u-index-list");if(!t)return n.$u.error("u-index-anchor必须要搭配u-index-list组件使用");t.anchors.push(this);var i=n.$u.$parent.call(this,"u-index-item");if(!i)return n.$u.error("u-index-anchor必须要搭配u-index-item组件使用");i.id=this.text.charCodeAt(0)}}};t.default=a}).call(this,i("543d")["default"])},eb1c:function(n,t,i){},f9f2:function(n,t,i){"use strict";i.r(t);var e=i("9f68"),u=i.n(e);for(var a in e)["default"].indexOf(a)<0&&function(n){i.d(t,n,(function(){return e[n]}))}(a);t["default"]=u.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uview-ui/components/u-index-anchor/u-index-anchor-create-component',
    {
        'uni_modules/uview-ui/components/u-index-anchor/u-index-anchor-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("45029"))
        })
    },
    [['uni_modules/uview-ui/components/u-index-anchor/u-index-anchor-create-component']]
]);
