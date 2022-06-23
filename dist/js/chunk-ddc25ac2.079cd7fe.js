(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ddc25ac2"],{"29a9":function(r,e,s){"use strict";s.r(e);var a=s("5530"),t=s("1da1"),n=s("2638"),o=s.n(n),i=s("d4ec"),c=s("bee2"),l=s("262e"),u=s("2caf"),m=(s("96cf"),s("b0c0"),s("d3b7"),s("9ab4")),d=s("7f7e"),f=s("7bb1"),p=s("1b40"),h=s("2f62"),b=s("7e6a"),g=function(r){Object(l["a"])(s,r);var e=Object(u["a"])(s);function s(){var r;return Object(i["a"])(this,s),r=e.call(this),r.isLoggingIn=!1,r.isSuccess=!1,r.formData={name:"",address:"",password:"",confirm_password:"",phone:"",email:""},r.errors={name:[],address:[],password:[],confirm_password:[],phone:[],email:[]},r}return Object(c["a"])(s,[{key:"render",value:function(){var r=this,e=arguments[0];return e("section",{class:"account__section"},[e("div",{class:"account__section__body"},[this.isSuccess?e("div",{class:"account__message"},[e("h2",{class:"h3"},["Your account has been created successfully"]),e("p",["Please check you registered email ",e("strong",[this.formData.email])," for verification link."]),e("a",{attrs:{href:"#"},class:"btn btn__primary",on:{click:function(e){e.preventDefault(),r.$router.push({name:"login",query:{email:r.formData.email}})}}},["Continue"])]):[e(b["a"]),e("h1",["Register"]),e("form",{attrs:{action:"#",novalidate:!0},class:"account__section__form",on:{submit:this.formSubmitted}},[e("div",{class:{form__group:!0,"input--invalid":this.errors.name.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-name"}},["Full Name"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"name",e.target.value)}},attrs:{type:"text",name:"name",id:"asf-name",placeholder:"Name"},domProps:{value:r.formData.name}},{directives:[{name:"model",value:r.formData.name,modifiers:{}}]}])),this.errors.name.length>0?e("span",{class:"input__text"},[this.errors.name[0]]):null]),e("div",{class:{form__group:!0,"input--invalid":this.errors.email.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-username"}},["Username"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"email",e.target.value)}},attrs:{type:"email",name:"username",id:"asf-username",placeholder:"Email"},domProps:{value:r.formData.email}},{directives:[{name:"model",value:r.formData.email,modifiers:{}}]}])),this.errors.email.length>0?e("span",{class:"input__text"},[this.errors.email[0]]):null]),e("div",{class:{form__group:!0,"input--invalid":this.errors.password.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-password"}},["Password"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"password",e.target.value)}},attrs:{type:"password",name:"password",id:"asf-password",placeholder:"Password"},domProps:{value:r.formData.password}},{directives:[{name:"model",value:r.formData.password,modifiers:{}}]}])),this.errors.password.length>0?e("span",{class:"input__text"},[this.errors.password[0]]):null]),e("div",{class:{form__group:!0,"input--invalid":this.errors.confirm_password.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-confirm_password"}},["Confirm Password"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"confirm_password",e.target.value)}},attrs:{type:"password",name:"password",id:"asf-confirm_password",placeholder:"Confirm Password"},domProps:{value:r.formData.confirm_password}},{directives:[{name:"model",value:r.formData.confirm_password,modifiers:{}}]}])),this.errors.confirm_password.length>0?e("span",{class:"input__text"},[this.errors.confirm_password[0]]):null]),e("div",{class:{form__group:!0,"input--invalid":this.errors.address.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-address"}},["Address"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"address",e.target.value)}},attrs:{type:"text",name:"name",id:"asf-address",placeholder:"Address"},domProps:{value:r.formData.address}},{directives:[{name:"model",value:r.formData.address,modifiers:{}}]}])),this.errors.address.length>0?e("span",{class:"input__text"},[this.errors.address[0]]):null]),e("div",{class:{form__group:!0,"input--invalid":this.errors.phone.length>0}},[e("label",{class:"sr-only",attrs:{for:"asf-phone"}},["Phone"]),e("input",o()([{on:{input:function(e){e.target.composing||r.$set(r.formData,"phone",e.target.value)}},attrs:{type:"text",name:"name",id:"asf-phone",placeholder:"Phone"},domProps:{value:r.formData.phone}},{directives:[{name:"model",value:r.formData.phone,modifiers:{}}]}])),this.errors.phone.length>0?e("span",{class:"input__text"},[this.errors.phone[0]]):null]),e("div",{class:"btn__holder"},[e("div",{class:"btn__block"},[e("button",{attrs:{type:"submit"},class:"btn btn__danger"},[this.isLoggingIn?e("span",{class:"icon-spinner loading"}):null,"Register"])]),e("div",{class:"btn__block"},[e("span",{class:"text"},["or"])]),e("div",{class:"btn__block"},[e("router-link",{attrs:{to:{name:"login"}},class:"btn btn__primary"},["login"])])])])]])])}},{key:"formSubmitted",value:function(){var r=Object(t["a"])(regeneratorRuntime.mark((function r(e){var s=this;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.preventDefault(),this.resetErrorMessage(),r.next=4,Object(f["b"])(this.formData.email,"required|email|min:4",{name:"email"}).then((function(r){s.errors["email"]=r.errors}));case 4:return r.next=6,Object(f["b"])(this.formData.name,"required",{name:"name"}).then((function(r){s.errors["name"]=r.errors}));case 6:return r.next=8,Object(f["b"])(this.formData.address,"required",{name:"address"}).then((function(r){s.errors["address"]=r.errors}));case 8:return r.next=10,Object(f["b"])(this.formData.password,"required|min:6|confirmed:confirmation",{name:"password",values:{confirmation:this.formData.confirm_password}}).then((function(r){s.errors["password"]=r.errors}));case 10:return r.next=12,Object(f["b"])(this.formData.confirm_password,"required",{name:"confirm_password"}).then((function(r){s.errors["confirm_password"]=r.errors}));case 12:this.$nextTick((function(){if(!s.hasError){s.isLoggingIn=!0;var r=Object(a["a"])({},s.formData);delete r.confirm_password,s.register(r).then((function(){s.errors=Object(a["a"])(Object(a["a"])({},s.errors),s.errorList),s.hasError||(s.isSuccess=!0)})).finally((function(){s.isLoggingIn=!1}))}}));case 13:case"end":return r.stop()}}),r,this)})));function e(e){return r.apply(this,arguments)}return e}()}]),s}(d["a"]);g=Object(m["a"])([Object(p["a"])({computed:Object(a["a"])({},Object(h["c"])({errorList:"root/getErrorMessage"})),methods:Object(a["a"])({},Object(h["b"])({register:"root/register"}))})],g),e["default"]=g},"7e6a":function(r,e,s){"use strict";var a=s("d4ec"),t=s("bee2"),n=s("262e"),o=s("2caf"),i=s("9ab4"),c=s("1b40"),l=s("e347"),u=s.n(l),m=function(r){Object(n["a"])(s,r);var e=Object(o["a"])(s);function s(){return Object(a["a"])(this,s),e.apply(this,arguments)}return Object(t["a"])(s,[{key:"render",value:function(){var r=arguments[0];return r("div",{class:"logo"},[r("router-link",{attrs:{to:{name:"home"}}},[r("img",{attrs:{src:u.a,alt:"Guthi"}})])])}}]),s}(c["c"]);m=Object(i["a"])([c["a"]],m),e["a"]=m},"7f7e":function(r,e,s){"use strict";var a=s("d4ec"),t=s("bee2"),n=s("262e"),o=s("2caf"),i=(s("d3b7"),s("b64b"),s("159b"),s("9ab4")),c=s("1b40"),l=function(r){Object(n["a"])(s,r);var e=Object(o["a"])(s);function s(){return Object(a["a"])(this,s),e.apply(this,arguments)}return Object(t["a"])(s,[{key:"hasError",get:function(){var r=this;return Object.keys(this.errors).reduce((function(e,s){return e||r.errors[s].length>0}),!1)}},{key:"errorMessage",get:function(){var r="";for(var e in this.errors)if(this.errors[e].length>0)return r=this.errors[e][0],r;return r}},{key:"resetErrorMessage",value:function(){var r=this;Object.keys(this.errors).forEach((function(e){r.errors[e]=[]}))}}]),s}(c["c"]);l=Object(i["a"])([c["a"]],l),e["a"]=l},e347:function(r,e,s){r.exports=s.p+"img/logo.3bfb7f4b.svg"}}]);
//# sourceMappingURL=chunk-ddc25ac2.079cd7fe.js.map