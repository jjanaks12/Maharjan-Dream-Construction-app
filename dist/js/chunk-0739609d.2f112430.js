(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0739609d"],{"1dfe":function(e,t,a){"use strict";var i=a("d4ec"),s=a("bee2"),r=a("262e"),n=a("2caf"),o=a("9ab4"),l=a("1b40"),c=function(e){Object(r["a"])(a,e);var t=Object(n["a"])(a);function a(e){return Object(i["a"])(this,a),t.call(this,e)}return Object(s["a"])(a,[{key:"valueChanged",value:function(){this.value?document.body.style.overflow="hidden":document.body.style.overflow=""}},{key:"render",value:function(){var e=this,t=arguments[0];return t("div",{class:{modal:!0,"modal--active":this.value},on:{click:function(t){t.preventDefault(),e.$emit("input",!1)}}},[t("div",{class:"modal__holder",on:{click:function(e){e.stopPropagation()}}},[this.$scopedSlots.header?t("header",{class:"modal__header"},[this.$scopedSlots.header({})]):this.title?t("header",{class:"modal__header"},[t("h2",[this.title])]):null,t("div",{class:"modal__body"},[this.$slots.default]),t("footer",{class:"modal__footer"},[t("button",{class:"btn btn__default btn__xs",on:{click:function(t){t.preventDefault(),e.$emit("input",!1)}}},["close"])])])])}}]),a}(l["c"]);Object(o["a"])([Object(l["b"])({required:!0})],c.prototype,"value",void 0),Object(o["a"])([Object(l["b"])({default:null})],c.prototype,"title",void 0),Object(o["a"])([Object(l["d"])("value")],c.prototype,"valueChanged",null),c=Object(o["a"])([l["a"]],c),t["a"]=c},"7f7e":function(e,t,a){"use strict";var i=a("d4ec"),s=a("bee2"),r=a("262e"),n=a("2caf"),o=(a("b64b"),a("159b"),a("9ab4")),l=a("1b40"),c=function(e){Object(r["a"])(a,e);var t=Object(n["a"])(a);function a(){return Object(i["a"])(this,a),t.apply(this,arguments)}return Object(s["a"])(a,[{key:"hasError",get:function(){var e=this;return Object.keys(this.errors).reduce((function(t,a){return t||e.errors[a].length>0}),!1)}},{key:"errorMessage",get:function(){var e="";for(var t in this.errors)if(this.errors[t].length>0)return e=this.errors[t][0],e;return e}},{key:"resetErrorMessage",value:function(){var e=this;Object.keys(this.errors).forEach((function(t){e.errors[t]=[]}))}}]),a}(l["c"]);c=Object(o["a"])([l["a"]],c),t["a"]=c},c4bc:function(e,t,a){"use strict";a.r(t);var i=a("5530"),s=a("d4ec"),r=a("bee2"),n=a("262e"),o=a("2caf"),l=(a("b0c0"),a("9ab4")),c=a("1b40"),u=a("2f62"),d=a("c1df"),h=a.n(d),f=(a("d3b7"),function(e){Object(n["a"])(a,e);var t=Object(o["a"])(a);function a(e){var i;return Object(s["a"])(this,a),i=t.call(this,e),i.isLoading=!1,i.mailSent=!1,i}return Object(r["a"])(a,[{key:"render",value:function(){var e=arguments[0];return e("div",{class:"meta__info"},[this.mailSent?[e("h3",["We have sent you a mail"]),e("p",["Please check your inbox and verify it."])]:this.isLoading?[e("h3",{class:"h4"},["We are sending mail."]),e("p",["Just a minute please. We will be done..."])]:[e("h3",{class:"h4"},["Your account hasn't been verified"]),e("p",["If you did not get verification mail. ",e("a",{attrs:{href:"#"},on:{click:this.requestEmail}},["Want to resend?"])])]])}},{key:"requestEmail",value:function(e){var t=this;e.preventDefault(),this.isLoading=!0,this.resendEmail({email:this.userDetail.email,url:location.origin+"/verification"}).then((function(){t.mailSent=!0})).finally((function(){t.isLoading=!1}))}}]),a}(c["c"]));f=Object(l["a"])([Object(c["a"])({computed:Object(i["a"])({},Object(u["c"])({userDetail:"root/getLoggedinUser"})),methods:Object(i["a"])({},Object(u["b"])({resendEmail:"root/resendEmail"}))})],f);var m=f,p=a("2638"),b=a.n(p),v=a("7f7e"),_=function(e){Object(n["a"])(a,e);var t=Object(o["a"])(a);function a(e){var i;return Object(s["a"])(this,a),i=t.call(this,e),i.isSaving=!1,i.formData={address:"",email:"",name:"",phone:""},i.errors={address:[],email:[],name:[],phone:[],citizenship_back:[],citizenship_front:[],photo:[]},i}return Object(r["a"])(a,[{key:"mounted",value:function(){this.formData={id:this.userDetail.id,address:this.userDetail.address,email:this.userDetail.email,name:this.userDetail.name,phone:this.userDetail.phone}}},{key:"userDetailChanged",value:function(){this.formData={id:this.userDetail.id,address:this.userDetail.address,email:this.userDetail.email,name:this.userDetail.name,phone:this.userDetail.phone}}},{key:"render",value:function(){var e=this,t=arguments[0];return t("div",{class:"account__form"},[t("div",{class:"avatar"},[this.formData.photo&&this.formData.photo.length>0?t("img",{attrs:{src:this.formData.photo[0],alt:this.formData.name}}):t("span",{class:"icon-user"}),t("label",{class:"custom__file__upload"},[t("input",{attrs:{type:"file",accept:"*/image"},on:{change:function(t){e.fileHandler(t,"photo")}}}),t("span",{class:"btn btn__danger btn__xs"},["Select a Photo"])])]),t("form",{attrs:{action:"#",method:"POST",novalidate:!0},on:{submit:this.formSubmit}},[t("div",{class:"form__group"},[t("label",{attrs:{for:"name"}},["Name"]),t("input",b()([{on:{input:function(t){t.target.composing||e.$set(e.formData,"name",t.target.value)}},attrs:{type:"text",name:"name",id:"name",placeholder:"Fullname"},domProps:{value:e.formData.name}},{directives:[{name:"model",value:e.formData.name,modifiers:{}}]}]))]),t("div",{class:"form__group"},[t("label",{attrs:{for:"address"}},["Address"]),t("input",b()([{on:{input:function(t){t.target.composing||e.$set(e.formData,"address",t.target.value)}},attrs:{type:"text",name:"address",id:"address",placeholder:"Address"},domProps:{value:e.formData.address}},{directives:[{name:"model",value:e.formData.address,modifiers:{}}]}]))]),t("div",{class:"form__group"},[t("label",{attrs:{for:"phone"}},["Phone"]),t("input",b()([{on:{input:function(t){t.target.composing||e.$set(e.formData,"phone",t.target.value)}},attrs:{type:"text",name:"phone",id:"phone",placeholder:"Phone"},domProps:{value:e.formData.phone}},{directives:[{name:"model",value:e.formData.phone,modifiers:{}}]}]))]),t("div",{class:"form__group"},[t("strong",["Other Documents"]),t("div",{class:"files"},[t("label",{class:"custom__file__upload"},[t("input",{attrs:{type:"file",accept:"*/image"},on:{change:function(t){e.fileHandler(t,"citizenship_front")}}}),this.formData.citizenship_front&&this.formData.citizenship_front.length>0?t("img",{attrs:{src:this.formData.citizenship_front[0],alt:this.formData.name}}):t("span",{class:"text"},["Upload citizenship front"])]),t("label",{class:"custom__file__upload"},[t("input",{attrs:{type:"file",accept:"*/image"},on:{change:function(t){e.fileHandler(t,"citizenship_back")}}}),this.formData.citizenship_back&&this.formData.citizenship_back.length>0?t("img",{attrs:{src:this.formData.citizenship_back[0],alt:this.formData.name}}):t("span",{class:"text"},["Upload citizenship back"])])])]),t("div",{class:"btn__holder"},[t("button",{attrs:{type:"submit"},class:"btn btn__primary"},[this.isSaving?t("span",{class:"icon-spinner loading"}):null,"Save"])])])])}},{key:"fileHandler",value:function(e,t){var a=this,i=e.target,s=i.files;if(s){var r=new FileReader,n=s[0];n&&(r.readAsDataURL(n),r.onload=function(){r.result&&(a.formData[t]||(a.formData[t]=[]),a.formData[t][0]=r.result,a.$forceUpdate())})}}},{key:"formSubmit",value:function(e){var t=this;e.preventDefault(),this.resetErrorMessage(),this.$nextTick((function(){t.hasError||(t.isSaving=!0,t.save(t.formData).then((function(){t.$emit("close"),t.resetErrorMessage()})).finally((function(){t.isSaving=!1})))}))}}]),a}(v["a"]);Object(l["a"])([Object(c["d"])("userDetail")],_.prototype,"userDetailChanged",null),_=Object(l["a"])([Object(c["a"])({computed:Object(i["a"])({},Object(u["c"])({userDetail:"root/getLoggedinUser"})),methods:Object(i["a"])({},Object(u["b"])({save:"root/save"}))})],_);var D=_,g=a("1dfe"),O=function(e){Object(n["a"])(a,e);var t=Object(o["a"])(a);function a(){var e;return Object(s["a"])(this,a),e=t.apply(this,arguments),e.showProfieForm=!1,e}return Object(r["a"])(a,[{key:"hasCitizenship",get:function(){return Boolean(this.userDetail.citizenship_front||this.userDetail.citizenship_back)}},{key:"render",value:function(){var e=this,t=arguments[0];return t("main",{attrs:{id:"main"}},[t("section",{class:"item__section"},[this.userDetail.email_verified_at?null:t(m),t("header",{class:"item__section__heading"},[t("h2",{class:"h3"},[this.userDetail.name]),t("a",{attrs:{href:"#"},class:"text--primary",on:{click:function(t){t.preventDefault(),e.showProfieForm=!0}}},["edit"])]),t("div",{class:"user__image"},[this.userDetail.photo?t("img",{attrs:{src:this.userDetail.photo_url,alt:this.userDetail.name}}):t("span",{class:"icon-user"})]),t("dl",{class:"user__detail"},[t("dt",["Email"]),t("dd",[this.userDetail.email]),t("dt",["Address"]),t("dd",[this.userDetail.address]),t("dt",["Phone"]),t("dd",[this.userDetail.phone]),t("dt",["Email Verification"]),t("dd",[t("span",{class:{verified:this.userDetail.email_verified_at}},[this.userDetail.email_verified_at?"verified":"not verified"])]),t("dt",["Date of Join"]),t("dd",[t("time",{attrs:{datetime:h()(this.userDetail.created_at).local().format("YYYY-MM-DD HH:mm:ss")}},[h()(this.userDetail.created_at).local().format("Do [of] MMMM [in] YYYY")])]),this.hasCitizenship?[t("dt",["Documents"]),t("dd",[t("strong",["Citizenship"]),t("div",{class:"image__list"},[this.userDetail.citizenship_front?t("div",{class:"image__holder"},[t("img",{attrs:{src:this.userDetail.citizenship_front_url,alt:this.userDetail.name+"_citizenship_front"}})]):null,this.userDetail.citizenship_back?t("div",{class:"image__holder"},[t("img",{attrs:{src:this.userDetail.citizenship_back_url,alt:this.userDetail.name+"_citizenship_back"}})]):null])])]:null])]),t(g["a"],{model:{value:e.showProfieForm,callback:function(t){e.showProfieForm=t}}},[t(D,{on:{close:function(){return e.showProfieForm=!1}}})])])}}]),a}(c["c"]);O=Object(l["a"])([Object(c["a"])({computed:Object(i["a"])({},Object(u["c"])({userDetail:"root/getLoggedinUser"}))})],O);t["default"]=O}}]);
//# sourceMappingURL=chunk-0739609d.2f112430.js.map