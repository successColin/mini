(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/service/serviceman/index"],{"2a11":function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}));var o={uIcon:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-icon/u-icon")]).then(n.bind(null,"0f14"))},uAvatar:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-avatar/u-avatar")]).then(n.bind(null,"d838"))},uDivider:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-divider/u-divider")]).then(n.bind(null,"944a"))},uCountDown:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-count-down/u-count-down")]).then(n.bind(null,"cda7"))},"u-Input":function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u--input/u--input")]).then(n.bind(null,"c00c"))},uLoadingPage:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-loading-page/u-loading-page")]).then(n.bind(null,"e325"))},uPopup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-popup/u-popup")]).then(n.bind(null,"8add"))},uRadioGroup:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio-group/u-radio-group")]).then(n.bind(null,"8f9f"))},uRadio:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-radio/u-radio")]).then(n.bind(null,"37f9"))},uRate:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uview-ui/components/u-rate/u-rate")]).then(n.bind(null,"439d"))},uToast:function(){return n.e("uni_modules/uview-ui/components/u-toast/u-toast").then(n.bind(null,"1b13"))}},s=function(){var e=this,t=e.$createElement,n=(e._self._c,e.isautomaticreply?null:e.__map(e.message,(function(t,n){var o=e.__get_orig(t),s=1==t.type?e.getheadImg():null;return{$orig:o,m0:s}})));e._isMounted||(e.e0=function(t){e.show=!0}),e.$mp.data=Object.assign({},{$root:{l0:n}})},i=[]},"621f":function(e,t,n){"use strict";var o=n("ee9c"),s=n.n(o);s.a},"6f16":function(e,t,n){"use strict";(function(e,t){var o=n("4ea4");n("76b1");o(n("66fd"));var s=o(n("eab5"));e.__webpack_require_UNI_MP_PLUGIN__=n,t(s.default)}).call(this,n("bc2e")["default"],n("543d")["createPage"])},7441:function(e,t,n){"use strict";(function(e){var o=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var s=o(n("9523")),i=n("04ff"),u={components:{},data:function(){return(0,s.default)({score:{statusResult:"0",isRecommend:"0",score:5},vshow:!0,show:!1,thumb3:!1,isconnecttext:!1,isthumb2:!1,thumb2:null,message:[],loading:!1,isconnect:!1,isautomaticreply:!0,dataList:[],msg:"",current:0,serviceNo:"",serviceId:"",serviceName:"",question:"",isthumb3:"",isconnecttext3:""},"show",!1)},onLoad:function(){this.getList()},onShow:function(){},onUnload:function(){e.closeSocket({})},methods:{Onevaluate:function(){var t=this;this.score.serviceNo=this.serviceNo,this.show=!1,this.$request.post("/coc-asback/api/v1/complaint_feedback/update",this.score).then((function(n){200==n.code&&t.$refs.uToast.show({message:"评分成功",type:"success",complete:function(){e.navigateBack({delta:1})}})}))},returnrouter:function(){e.navigateBack({delta:1})},Onfinish:function(){this.show=!0},Onthumb3:function(e){this.isthumb3||(this.thumb3=e,this.isthumb3=!0,2==e&&(this.isconnecttext3=!0))},Onthumb:function(e){this.isthumb2||(this.thumb2=e,this.isthumb2=!0,2==e&&(this.isconnecttext=!0))},getheadImg:function(){return(0,i.getstorage)("headImg")},OnOnquestion2:function(e){var t=new Date,n=t.getHours(),o=t.getMinutes();n<10&&(n="0"+n),o<10&&(o="0"+o),this.question=e.questionDescribe,this.message.push({type:3,msg:e.questionDescribe,time:n+":"+o,name:"【智能客服】",defaultAnswer:e.defaultAnswer}),this.scrollToBottom()},Onquestion:function(e){var t=new Date,n=t.getHours(),o=t.getMinutes();n<10&&(n="0"+n),o<10&&(o="0"+o),this.isautomaticreply=!1,this.question=e.questionDescribe,this.message.push({type:1,msg:e.questionDescribe,time:n+":"+o,name:"我"}),this.message.push({type:2,msg:e.questionDescribe,time:n+":"+o,name:"【智能客服】",defaultAnswer:e.defaultAnswer,questions:e.questions})},sendinfo:function(){var e=this,t=this.serviceId?this.serviceId:"",n=this.msg,o=this.question?this.question:this.msg,s=this.questionId?this.questionId:"",u=this.serviceNo,c=(0,i.getstorage)("userId"),r={};t&&(r.customerServiceId=t),s&&(r.questionId=s),r.question=o,r.msg=n,r.serviceNo=u,r.type=1,r.userId=c;var a=new Date,m=a.getHours(),l=a.getMinutes();m<10&&(m="0"+m),l<10&&(l="0"+l),this.$request.post("/coc-asback/api/v1/complaint_feedback/send",r).then((function(t){200==t.code&&(e.loading=!1,e.message.push({type:1,msg:e.msg,time:m+":"+l,name:"我"}),e.$refs.countDown.reset(),e.$refs.countDown.start(),e.msg="",e.scrollToBottom())}))},scrollToBottom:function(){this.$nextTick((function(){setTimeout((function(){e.pageScrollTo({scrollTop:99999,duration:0})}),200)}))},Oncustomerservice:function(){var t=this,n=this,o=new Date,s=o.getHours(),u=o.getMinutes();if(s<10&&(s="0"+s),u<10&&(u="0"+u),!this.isconnect){this.loading=!0;var c=(0,i.getstorage)("userId");e.connectSocket({url:"ws://172.16.91.106:28088/websocket/"+c+"/1",data:function(){return{x:"",y:""}},header:{"content-type":"application/json"},method:"GET",success:function(){n.isconnect=!0,n.isautomaticreply=!1,n.message.push({type:3,time:s+":"+u,name:"【智能客服】",defaultAnswer:"正在为您转接人工客服，请稍等。",isfalse:1}),t.isconnecttext3=!1,n.$refs.countDown.reset(),n.$refs.countDown.start(),e.onSocketMessage((function(e){var t=JSON.parse(e.data);2001==t.code?(n.serviceNo=t.serviceNo,n.loading=!1,n.scrollToBottom()):2005==t.code?(n.serviceId=t.serviceId,n.serviceName=t.serviceName,n.message.push({type:3,time:s+":"+u,name:"【客服"+n.serviceName+"】",defaultAnswer:"当前为人工客服【"+n.serviceName+"】为您服务，请问有什么可以帮助您？",avatar:"1",isfalse:1}),n.$refs.countDown.reset(),n.$refs.countDown.start(),n.scrollToBottom()):2002==t.code&&(n.message.push({type:2,time:s+":"+u,name:"【客服"+n.serviceName+"】",defaultAnswer:t.message,avatar:"1",isback:1,isfalse:1}),n.$refs.countDown.reset(),n.$refs.countDown.start(),n.scrollToBottom())}))}})}},Onsendout:function(){var t=this,n=new Date,o=n.getHours(),s=n.getMinutes();if(o<10&&(o="0"+o),s<10&&(s="0"+s),this.isconnect)t.sendinfo();else{this.loading=!0;var u=(0,i.getstorage)("userId");e.connectSocket({url:"ws://172.16.91.106:28088/websocket/"+u+"/1",data:function(){return{x:"",y:""}},header:{"content-type":"application/json"},method:"GET",success:function(){t.isconnect=!0,t.isautomaticreply=!1,e.onSocketMessage((function(n){var i=JSON.parse(n.data);2001==i.code?(t.serviceNo=i.serviceNo,e.$u.sleep(300).then((function(){t.serviceNo&&t.sendinfo()})),t.scrollToBottom()):2005==i.code?(t.serviceId=i.serviceId,t.serviceName=i.serviceName,t.message.push({type:3,time:o+":"+s,name:"【客服"+t.serviceName+"】",defaultAnswer:"当前为人工客服【"+t.serviceName+"】为您服务，请问有什么可以帮助您？",avatar:"1",isfalse:1}),t.$refs.countDown.reset(),t.$refs.countDown.start(),t.scrollToBottom()):2002==i.code&&(t.message.push({type:2,time:o+":"+s,name:"【客服"+t.serviceName+"】",defaultAnswer:i.message,avatar:"1",isback:1,isfalse:1}),t.$refs.countDown.reset(),t.$refs.countDown.start(),t.scrollToBottom())}))}})}},getList:function(){var e=this;this.$request.get("/coc-social/api/v1/customer/problem").then((function(t){e.dataList=t.data}))},Onproblemtype:function(e){this.current=e}}};t.default=u}).call(this,n("543d")["default"])},7667:function(e,t,n){"use strict";n.r(t);var o=n("7441"),s=n.n(o);for(var i in o)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=s.a},eab5:function(e,t,n){"use strict";n.r(t);var o=n("2a11"),s=n("7667");for(var i in s)["default"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return s[e]}))}(i);n("621f");var u=n("f0c5"),c=Object(u["a"])(s["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],void 0);t["default"]=c.exports},ee9c:function(e,t,n){}},[["6f16","common/runtime","common/vendor"]]]);