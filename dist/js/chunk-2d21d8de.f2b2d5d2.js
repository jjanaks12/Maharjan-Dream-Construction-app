(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21d8de"],{d293:function(e,t,n){"use strict";n.r(t);var r=n("5530"),c=n("1da1"),i=n("d4ec"),a=n("bee2"),s=n("262e"),o=n("2caf"),u=(n("96cf"),n("b0c0"),n("a4d3"),n("e01a"),n("9ab4")),d=n("1b40"),h=n("2f62"),l=function(e){Object(s["a"])(n,e);var t=Object(o["a"])(n);function n(){var e;return Object(i["a"])(this,n),e=t.apply(this,arguments),e.rent={name:"",description:"",excerpt:"",machinery:"",price:""},e}return Object(a["a"])(n,[{key:"routeWatcher",value:function(){this.checkRoute()}},{key:"mounted",value:function(){this.checkRoute()}},{key:"render",value:function(){var e=arguments[0];return e("main",{attrs:{id:"main"}},[e("section",{class:"item__section"},[e("div",{class:"item__detail"},[e("div",{class:"item__detail__description"},[e("h2",{class:"title"},[this.rent.name]),e("div",{class:"holder"},[e("em",{class:"price"},["Rs.",this.rent.price]),e("strong",{class:"sub__heading"},[this.rent.machinery])]),e("div",{class:"text__holder",domProps:{innerHTML:this.rent.description}})])])])])}},{key:"checkRoute",value:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(){var t,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=parseInt(null===(t=this.$route)||void 0===t||null===(n=t.params)||void 0===n?void 0:n.id),e.next=3,this.getRent(r);case 3:this.rent=e.sent;case 4:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()}]),n}(d["c"]);Object(u["a"])([Object(d["d"])("$route",{deep:!0})],l.prototype,"routeWatcher",null),l=Object(u["a"])([Object(d["a"])({methods:Object(r["a"])({},Object(h["b"])({getRent:"rent/getRent"}))})],l),t["default"]=l}}]);
//# sourceMappingURL=chunk-2d21d8de.f2b2d5d2.js.map