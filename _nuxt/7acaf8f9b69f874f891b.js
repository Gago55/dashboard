(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{306:function(r,t,e){"use strict";e.r(t);var o={layout:"center",data:function(){return{username:"",password:"",confirmPassword:"",hasError:!1,error:"",successSnackbar:!1}},created:function(){localStorage.getItem("username")&&(this.$router.push({path:"/"}),this.$store.commit("setIsAuth",!0))},methods:{submit:function(){return this.username?this.password?this.password.length<7?(this.error="Password must be at least 8 symbols",void(this.hasError=!0)):this.password!==this.confirmPassword?(this.error="The passwords do not match",void(this.hasError=!0)):(this.$store.commit("addUser",{username:this.username,password:this.password}),void(this.successSnackbar=!0)):(this.error="Password is required",void(this.hasError=!0)):(this.error="Username is required",void(this.hasError=!0))}}},n=e(31),c=e(37),l=e.n(c),d=e(221),m=e(207),v=e(188),h=e(298),w=e(299),f=e(300),k=e(303),component=Object(n.a)(o,(function(){var r=this,t=r.$createElement,e=r._self._c||t;return e("div",[e("v-card",{attrs:{raised:"",light:"",width:"400"}},[e("v-card-title",[r._v("Registration")]),r._v(" "),e("v-form",{staticClass:"mx-10"},[e("v-text-field",{attrs:{label:"Username"},model:{value:r.username,callback:function(t){r.username=t},expression:"username"}}),r._v(" "),e("v-text-field",{attrs:{type:"password",label:"Password"},model:{value:r.password,callback:function(t){r.password=t},expression:"password"}}),r._v(" "),e("v-text-field",{attrs:{type:"password",label:"Confirm password"},model:{value:r.confirmPassword,callback:function(t){r.confirmPassword=t},expression:"confirmPassword"}})],1),r._v(" "),e("v-card-actions",[e("v-spacer"),r._v(" "),e("v-btn",{staticClass:"mr-3 mb-3",attrs:{link:"",to:"/login"}},[r._v("Login")]),r._v(" "),e("v-btn",{staticClass:"mr-3 mb-3",on:{click:r.submit}},[r._v("Register")])],1)],1),r._v(" "),e("v-snackbar",{attrs:{top:"",color:"error"},model:{value:r.hasError,callback:function(t){r.hasError=t},expression:"hasError"}},[r._v("\n    "+r._s(r.error)+"\n    "),e("v-btn",{attrs:{text:""},on:{click:function(t){r.hasError=!1}}},[r._v("Close")])],1),r._v(" "),e("v-snackbar",{attrs:{top:"",color:"success"},model:{value:r.successSnackbar,callback:function(t){r.successSnackbar=t},expression:"successSnackbar"}},[r._v("\n    Registration successfully completed!\n  ")])],1)}),[],!1,null,"a282d2e6",null);t.default=component.exports;l()(component,{VBtn:d.a,VCard:m.a,VCardActions:v.a,VCardTitle:v.b,VForm:h.a,VSnackbar:w.a,VSpacer:f.a,VTextField:k.a})}}]);