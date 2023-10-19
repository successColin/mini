(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/zhangyuhao-poster/Poster"],{3799:function(t,e,i){"use strict";i.r(e);var n=i("7d84"),a=i.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(s);e["default"]=a.a},"66b6":function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return a})),i.d(e,"a",(function(){}));var n=function(){var t=this.$createElement;this._self._c},a=[]},"7d84":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"Poster",props:{list:{type:Array,required:!0},width:{type:Number,required:!0},height:{type:Number,required:!0},backgroundColor:{type:String,default:"rgba(0,0,0,0)"}},emit:["on-success","on-error"],data:function(){return{posterUrl:"",ctx:null,counter:-1,drawPathQueue:[]}},computed:{imgCount:function(){return this.list.filter((function(t){return"image"==t.type})).length},successImageCount:function(){return this.drawPathQueue.filter((function(t){return"image"==t.type&&t.success})).length}},watch:{drawPathQueue:{handler:function(t,e){var i=this;if(console.log(this.imgCount,this.successImageCount),this.imgCount||t==this.imgCount){var n=function(t){i.ctx.setFillStyle(t.color),i.ctx.setFontSize(t.size),i.ctx.setTextBaseline(t.textBaseline||"top"),i.ctx.fillText(t.text,t.x,t.y)},a=function(t){i.ctx.setFontSize(t.size);var e=JSON.parse(JSON.stringify(t));e.lineSpace=e.lineSpace?e.lineSpace:10;var a=t.text,s=Math.floor((e.height||i.height+e.lineSpace)/(e.size+e.lineSpace)),r=a.split(""),c=[],o="";while(r.length){var h=r.shift();o+=h;var u=i.ctx.measureText(o).width;u>t.width?(o=o.substr(0,o.length-1),c.push(o),o="",r.unshift(h)):r.length||c.push(o)}if(c.length>s){c.length=s;var l=i.ctx.measureText("...").width,f=0,g=c[c.length-1].split(""),d="";while(l>f)d+=g.pop(),f=i.ctx.measureText(d).width;c[c.length-1]=g.join("")+"..."}for(var x=e.y,p=0;p<c.length;p++)e.y=x+e.size*p+e.lineSpace*p,e.text=c[p],n(e)};if(this.ctx.setFillStyle(this.backgroundColor),this.ctx.fillRect(0,0,this.width,this.height),this.drawPathQueue.length===this.list.length)try{console.log("开始绘制...");for(var s=0;s<this.drawPathQueue.length;s++)for(var r=0;r<this.drawPathQueue.length;r++){var c=this.drawPathQueue[r];if(c.index===s&&("text"===c.type&&(console.log("绘制文本："+c.text),n(c),this.counter--),"textarea"===c.type&&(console.log("绘制段落："+c.text),a(c),this.counter--),"image"===c.type)){if(console.log("绘制图片："+c.path),c.area){this.ctx.save(),this.ctx.beginPath(),this.ctx.rect(c.area.x,c.area.y,c.area.width,c.area.height),this.ctx.clip();var o=c.x+Number(c.width)/2,h=c.y+Number(c.height)/2;this.ctx.translate(o,h);var u=c.rotate?Number(c.rotate)%360:0;this.ctx.rotate(u*Math.PI/180),this.ctx.drawImage(c.path,c.x-o,c.y-h,c.width,c.height),this.ctx.closePath(),this.ctx.restore()}else if("circle"==c.shape){this.ctx.save(),this.ctx.beginPath();var l=c.width/2+c.x,f=c.height/2+c.y,g=c.width/2;this.ctx.arc(l,f,g,0,2*Math.PI),this.ctx.clip();var d=c.x+Number(c.width)/2,x=c.y+Number(c.height)/2;this.ctx.translate(d,x);var p=c.rotate?Number(c.rotate)%360:0;this.ctx.rotate(p*Math.PI/180),this.ctx.drawImage(c.path,c.x-d,c.y-x,c.width,c.height),this.ctx.closePath(),this.ctx.restore()}else this.ctx.drawImage(c.path,c.x,c.y,c.width,c.height);this.counter--}}}catch(m){console.log(m),this.$emit("on-error",m)}}},deep:!0},counter:function(e,i){var n=this;0===e&&this.ctx.draw(!1,(function(){console.log("final counter",n.counter),t.canvasToTempFilePath({canvasId:"myCanvas",success:function(t){console.log("in canvasToTempFilePath"),n.posterUrl=t.tempFilePath,n.$emit("on-success",t.tempFilePath)},fail:function(t){console.log(t)}},n)}))}},mounted:function(){this.ctx=t.createCanvasContext("myCanvas",this),console.log("mounted")},methods:{create:function(){this.generateImg()},generateImg:function(){var e=this;console.log("generateimg"),this.counter=this.list.length,this.drawPathQueue=[];for(var i=function(i){var n=e.list[i];if(n.index=i,"text"===n.type||"textarea"===n.type)return e.drawPathQueue.push(n),"continue";console.log(n),t.getImageInfo({src:n.path,success:function(t){n.path=t.path,n.success=!0,e.drawPathQueue.push(n)},fail:function(t){console.error(t)}})},n=0;n<this.list.length;n++)i(n)},saveImg:function(){t.canvasToTempFilePath({canvasId:"myCanvas",success:function(e){t.saveImageToPhotosAlbum({filePath:e.tempFilePath,success:function(){console.log("save success")}})}})}}};e.default=i}).call(this,i("543d")["default"])},9216:function(t,e,i){"use strict";var n=i("9243"),a=i.n(n);a.a},9243:function(t,e,i){},dce9:function(t,e,i){"use strict";i.r(e);var n=i("66b6"),a=i("3799");for(var s in a)["default"].indexOf(s)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(s);i("9216");var r=i("f0c5"),c=Object(r["a"])(a["default"],n["b"],n["c"],!1,null,"a1a82cf4",null,!1,n["a"],void 0);e["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/zhangyuhao-poster/Poster-create-component',
    {
        'components/zhangyuhao-poster/Poster-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("dce9"))
        })
    },
    [['components/zhangyuhao-poster/Poster-create-component']]
]);