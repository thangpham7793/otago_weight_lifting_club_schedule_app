(this.webpackJsonpinstructor=this.webpackJsonpinstructor||[]).push([[0],{34:function(e,t){},41:function(e,t,n){e.exports=n(63)},46:function(e,t,n){},47:function(e,t,n){},59:function(e,t){},60:function(e,t){},61:function(e,t,n){e.exports=n.p+"static/media/logo.226e3c4c.jpg"},63:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(23),o=n.n(c),s=(n(46),n(47),n(20)),u=n(5);function l(e){var t=e.to,n=e.label;return a.a.createElement(s.b,{to:t,className:"nav-item"},n)}var i=function(e){var t=e.links.map((function(e){var t=e.to,n=e.label;return a.a.createElement(l,{key:t,to:t,label:n})}));return a.a.createElement("nav",{className:"header index"},a.a.createElement("section",null,a.a.createElement("div",{className:"navContent"},a.a.createElement("header",null,a.a.createElement("h1",{className:"main-title"},"Otago Weightlifting Instructor Space")),a.a.createElement("div",{className:"navLinks"},t))))};function m(){return a.a.createElement("div",null,"You're lost!")}function p(){return a.a.createElement("footer",{className:"footer index"},a.a.createElement("div",{className:"footer-text-wrapper"},"Otago Weightlifting 2020. All Rights Reserved"))}var f=n(9),d=n(12),h=function(){function e(){Object(f.a)(this,e)}return Object(d.a)(e,null,[{key:"isAuthenticated",value:function(){return null!==sessionStorage.getItem("token")}},{key:"saveToken",value:function(e){sessionStorage.setItem("token",e)}},{key:"getToken",value:function(){return sessionStorage.getItem("token")}},{key:"clearToken",value:function(){sessionStorage.removeItem("token")}}]),e}();function v(e){var t=e.component;return console.log("Checking",h.isAuthenticated()),h.isAuthenticated()?a.a.createElement(t,null):a.a.createElement(u.a,{to:{pathname:"/"}})}var b=n(1),g=n.n(b),E=n(2),y=n(4),k=n(15),O=n(13),w=n(18),j=n(17);function N(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return Object(E.a)(g.a.mark((function n(){var r,a=arguments;return g.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.apply(void 0,a);case 3:return n.abrupt("return",n.sent);case 6:n.prev=6,n.t0=n.catch(0),null!==(r=null===t||void 0===t?void 0:t(n.t0))&&void 0!==r||console.log("Something went wrong: ".concat(n.t0));case 9:case"end":return n.stop()}}),n,null,[[0,6]])})))}function S(e,t){return Object.entries(e).every((function(e){var n=Object(y.a)(e,2),r=n[0],a=n[1];return t.hasOwnProperty(r)&&a===t[r]}))}var x={show:function(e){!0===e?(console.log("Show spinner now!"),document.querySelector("#spinner").style.display="block"):(document.querySelector("#spinner").style.display="none",console.log("Hide spinner"))}};function L(e){return Object(E.a)(g.a.mark((function t(){var n,r=arguments;return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return x.show(!0),t.next=3,N(e).apply(void 0,r);case 3:return n=t.sent,x.show(!1),t.abrupt("return",n);case 6:case"end":return t.stop()}}),t)})))}var C=function(){function e(){if(Object(f.a)(this,e),this.fetchProgrammes=e._fetchJsonFactory("programmes"),this.postInstructorCredentials=e._fetchPostFactory("instructor/login",!0),this.postNewSchedule=e._fetchPostFactory("programmes/schedules"),this._instance=this,e._instance)return this._instance}return Object(d.a)(e,null,[{key:"_makeUrl",value:function(e){return"".concat(this.BASE_URL,"/").concat(e)}},{key:"_fetchPostFactory",value:function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=e._makeUrl(t);return N(function(){var e=Object(E.a)(g.a.mark((function e(t){var a,c,o,s,u;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a={method:"POST",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(h.getToken())},body:JSON.stringify(t)},!n){e.next=9;break}return e.next=4,fetch(r,a);case 4:return c=e.sent,e.next=7,c.json();case 7:return o=e.sent,e.abrupt("return",[c.ok,o]);case 9:return e.next=11,fetch(r,a);case 11:return s=e.sent,u=s.ok,e.abrupt("return",u);case 14:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"_fetchPutFactory",value:function(t){var n=e._makeUrl(t);return N(function(){var e=Object(E.a)(g.a.mark((function e(t){var r,a,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"PUT",mode:"cors",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(h.getToken())},body:JSON.stringify(t)},e.next=3,fetch(n,r);case 3:return a=e.sent,c=a.ok,e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"_fetchJsonFactory",value:function(t){var n=e._makeUrl(t);return N(Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(n,{headers:{Authorization:"Bearer ".concat(h.getToken())}});case 2:return t=e.sent,e.abrupt("return",t.json());case 4:case"end":return e.stop()}}),e)}))))}},{key:"_fetchDeleteFactory",value:function(t){var n=e._makeUrl(t);return N(function(){var e=Object(E.a)(g.a.mark((function e(t){var r,a,c;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={method:"DELETE",mode:"cors",headers:{Authorization:"Bearer ".concat(h.getToken())}},e.next=3,fetch("".concat(n,"/").concat(t),r);case 3:return a=e.sent,c=a.ok,e.abrupt("return",c);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}},{key:"_retryFetch",value:function(e){setInterval(Object(E.a)(g.a.mark((function t(){return g.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("Refetching ..."),t.abrupt("return",N(e()));case 2:case"end":return t.stop()}}),t)}))),5e3)}},{key:"getInstance",value:function(){return e._instance||new e}}]),e}();C.BASE_URL=window.location.href.split(".").includes("herokuapp")?"https://lifting-schedule-v2.herokuapp.com":"http://localhost:5000";var I=C.getInstance(),P=function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(){var e;return Object(f.a)(this,n),e=t.call(this),console.log("New LearnerServiceSingleton!"),e.updateLearner=L(e.updateLearner),e.deleteLearner=L(e.deleteLearner),e.createLearner=L(e.createLearner),e._instance=Object(O.a)(e),n._instance?Object(k.a)(e,e._instance):e}return Object(d.a)(n,[{key:"fetchLearners",value:function(){var e=Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Fetching Learners"),e.next=3,n._fetchJsonFactory("learners")();case 3:return t=e.sent,e.abrupt("return",t||!1);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()},{key:"updateLearner",value:function(){var e=Object(E.a)(g.a.mark((function e(t){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Sending ".concat(JSON.stringify(t))),e.next=3,n._fetchPutFactory("learners/details")({learner:t});case 3:return r=e.sent,e.abrupt("return",r||!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"deleteLearner",value:function(){var e=Object(E.a)(g.a.mark((function e(t){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Delete learner id ",t),e.next=3,n._fetchDeleteFactory("learners")(t);case 3:return r=e.sent,e.abrupt("return",r||!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},{key:"createLearner",value:function(){var e=Object(E.a)(g.a.mark((function e(t){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("Sending new learner ".concat(JSON.stringify(t))),e.next=3,n._fetchPostFactory("learners")({learner:t});case 3:return r=e.sent,e.abrupt("return",r||!1);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}],[{key:"getLearnerInstance",value:function(){return n._instance||new n}}]),n}(C).getLearnerInstance();function _(){var e=Object(r.useState)([]),t=Object(y.a)(e,2),n=t[0],c=t[1];return Object(r.useEffect)((function(){function e(){return(e=Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.fetchLearners();case 2:t=e.sent,c(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),a.a.createElement("div",null,a.a.createElement("h2",null,"Learners"),0===n.length?a.a.createElement("div",null,"Fetching ..."):a.a.createElement(U,{payload:n}))}var A=n(14),F=n(35);function U(e){var t=function(e){return[e,Object.keys(e[0]).reduce((function(e,t){return"learnerId"===t?e:[].concat(Object(A.a)(e),[{Header:(n=t,n.split("").reduce((function(e,t,n){return 0===n?t.toUpperCase():t===t.toUpperCase()?e+" "+t:e+t}),"")),accessor:t}]);var n}),[])]}(e.payload),n=Object(y.a)(t,2),c=n[0],o=n[1],s=Object(r.useMemo)((function(){return c}),[]),u=Object(r.useMemo)((function(){return o}),[]),l=Object(F.useTable)({columns:u,data:s}),i=l.getTableProps,m=l.getTableBodyProps,p=l.headerGroups,f=l.rows,d=l.prepareRow;return a.a.createElement("table",Object.assign({},i(),{className:"learner-table"}),a.a.createElement("thead",null,p.map((function(e){return a.a.createElement("tr",e.getHeaderGroupProps(),e.headers.map((function(e){return a.a.createElement("th",Object.assign({className:"learner-table-cell head"},e.getHeaderProps()),e.render("Header"))})))}))),a.a.createElement("tbody",m(),f.map((function(e){return d(e),a.a.createElement("tr",e.getRowProps(),e.cells.map((function(e){return a.a.createElement("td",Object.assign({suppressContentEditableWarning:!0,contentEditable:"true",className:"learner-table-cell"},e.getCellProps()),e.render("Cell"))})))}))))}var T=n(39);function D(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return function(n){switch(n.isFetchSuccess){default:return a.a.createElement("div",null,"Loading ",e||"data"," ...");case!0:return a.a.createElement("div",null,t||"Finished loading data!");case!1:return a.a.createElement("div",null,"Failed to load ",e||"data")}}}function B(e){var t,n=e.actionStatus,r=e.onCloseActionStatusDiv,c=n.action,o=n.isActionSuccess,s="";if(c)switch(o){default:t="Applying ".concat(c.toUpperCase()," ...");break;case!0:t="".concat(c.toUpperCase()," Successful!");break;case!1:t="Failed to load ".concat(c.toUpperCase())}else s="none";return a.a.createElement("div",{className:"action-status-div",style:{display:s}},a.a.createElement("div",null,t),a.a.createElement("span",{className:"action-status-close",onClick:r},"X"))}function J(){var e=Object(r.useState)([]),t=Object(y.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)([]),s=Object(y.a)(o,2),u=s[0],l=s[1],i=Object(r.useState)(""),m=Object(y.a)(i,2),p=m[0],f=m[1],d=Object(r.useState)(null),h=Object(y.a)(d,2),v=h[0],b=h[1],k=Object(r.useState)(!1),O=Object(y.a)(k,2),w=O[0],j=O[1],N=Object(r.useState)({action:null,isActionSuccess:null}),x=Object(y.a)(N,2),L=x[0],C=x[1],I=Object(r.useState)(null),_=Object(y.a)(I,2),F=_[0],U=_[1],J=D("learners","Click On A Name");function M(e,t){var n=t.trim().toLowerCase();return 0===n.length?e:e.filter((function(e){var t=e.firstName,r=e.lastName;return t.toLowerCase().trim().startsWith(n)||r.toLowerCase().trim().startsWith(n)}))}function W(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"UPDATE",r=Object(A.a)(n);switch(t){default:r[e]=v,c(r),l(M(r,"".concat(v.firstName))),f("".concat(v.firstName));break;case"DELETE":r.splice(e,1),l(r),c(r),b(null),f("")}}function R(e,t){return e.findIndex((function(e){return e.learnerId===t.learnerId}))}function Y(){return(Y=Object(E.a)(g.a.mark((function e(t){var r,a;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=R(n,v),window.confirm("Are you sure you want to update ".concat(v.firstName,"'s record?"))){e.next=8;break}return b(null),l(n),f(""),e.abrupt("return");case 8:if(!S(n[r],v)){e.next=11;break}return console.log("No need to rerender or update!"),e.abrupt("return");case 11:return C({action:"update",isActionSuccess:null}),e.next=14,P.updateLearner(v);case 14:(a=e.sent)?(W(r),C({action:"update",isActionSuccess:!0})):(console.log("Updating failed!",a),b(n[r]),f(v.firstName),C({action:"update",isActionSuccess:!1}));case 16:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function q(){return(q=Object(E.a)(g.a.mark((function e(t){return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(window.confirm("Are you sure you want to delete ".concat(v.firstName,"'s record?"))){e.next=3;break}return j(!1),e.abrupt("return");case 3:return C({action:"delete",isActionSuccess:null}),e.next=6,P.deleteLearner(v.learnerId);case 6:e.sent?(C({action:"delete",isActionSuccess:!0}),W(R(n,v),"DELETE"),console.log("Deleting ... Success!")):(C({action:"delete",isActionSuccess:!1}),console.log("Deleting failed!"));case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(r.useEffect)((function(){function e(){return(e=Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,P.fetchLearners();case 2:(t=e.sent)?(c(t),l(t),U(!0)):U(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement(B,{actionStatus:L,onCloseActionStatusDiv:function(e){C({action:null,isActionSuccess:null})}}),a.a.createElement("div",{className:"learnerPanelWrapper",style:{display:"flex"}},F?a.a.createElement(z,{searchPhrase:p,onSearchPhraseChanged:function(e){var t=e.target.value;f(e.target.value),l(M(n,t))},learners:n,displayedLearners:u,onLearnerItemClicked:function(e){var t,r=(t=e.target.getAttribute("learnerId"),n.find((function(e){return e.learnerId===parseInt(t)})));b(r)}}):a.a.createElement(J,{isFetchSuccess:F}),v?a.a.createElement(H,{selectedLearner:v,onPersonalBestsInputChange:function(e){var t=e.target.getAttribute("name"),n=e.target.value;b((function(e){var r=Object(T.a)({},e);return r[t]=n,r}))},onUpdatePersonalBests:function(e){return Y.apply(this,arguments)},canEditAndUpdate:w,enableEditAndUpdate:function(){j(!w)},onDeleteLearner:function(e){return q.apply(this,arguments)}}):a.a.createElement(J,{isFetchSuccess:F})))}function M(e){var t=e.learners,n=e.onLearnerItemClicked,r=t.map((function(e){var t=e.learnerId,r=e.firstName,c=e.lastName;return a.a.createElement("li",{className:"learner-name",key:t,learnerid:t,onClick:n},"".concat(r," ").concat(c))}));return a.a.createElement("ul",null,0===t.length?a.a.createElement("li",{className:"learner-name"},"No Learner Found!"):r)}var W=n(40);function R(e){var t=e.label,n=Object(W.a)(e,["label"]);return a.a.createElement("div",{className:"pbs-field"},a.a.createElement("label",{htmlFor:n.id||n.name},t.split("").reduce((function(e,t,n){return 0===n?t.toUpperCase():t===t.toUpperCase()?e+" "+t:e+t}),"")),a.a.createElement("input",Object.assign({className:"text-input"},n)))}function H(e){var t=e.selectedLearner,n=void 0===t?{}:t,r=e.onPersonalBestsInputChange,c=e.onUpdatePersonalBests,o=e.enableEditAndUpdate,s=e.canEditAndUpdate,u=e.onDeleteLearner,l=Object.keys(n).map((function(e){return"learnerId"===e?null:a.a.createElement(R,{label:e,name:e,type:"text",key:e,value:n[e],onChange:r,readOnly:!s,style:{opacity:s?"1":"0.75"}})}));return a.a.createElement("div",{className:"pbs-form-wrapper"},a.a.createElement("h3",null,n.firstName),a.a.createElement("form",{readOnly:!s,onDoubleClick:o},l),a.a.createElement("div",{className:"pbs-form-btn-wrapper"},a.a.createElement("button",{className:"pbs-btn",onClick:o},s?"Disable Edit":"Enable Edit"),a.a.createElement("button",{className:"pbs-btn",onClick:c,disabled:!s},s?"Save":"Edit"),a.a.createElement("button",{className:"pbs-btn",onClick:u,disabled:!s},"Delete")))}function z(e){var t=e.searchPhrase,n=e.onSearchPhraseChanged,r=e.learners,c=e.displayedLearners,o=e.onLearnerItemClicked;return a.a.createElement("div",{className:"learnerListPanel",style:{display:"flex"}},a.a.createElement("div",{className:"searchInputWrapper",style:{display:"flex",flexDirection:"column"}},a.a.createElement("input",{className:"learnerSearchInput",value:t,onChange:n,placeholder:0===r.length?"No Learners Added Yet":"Type to Filter",disabled:0===r.length})),a.a.createElement("div",{className:"learnerNameList"},0===r.length?a.a.createElement("ul",null,a.a.createElement("li",{className:"learner-name"},"No Learners Added Yet")):a.a.createElement(M,{learners:c,onLearnerItemClicked:o})))}var Y=n(30),q=n.n(Y);var G=function e(t){var n;Object(f.a)(this,e),this.reader=new FileReader,this.reader.makeTimeTable=function(e){var t={};return function(e){var t=[0,0];return e.reduce((function(e,n){var r=n.week,a=n.day;return t[0]===r&&t[1]===a||(t=[r,a],e.push([r,a])),e}),[])}(e).forEach((function(n){return r=n[0],a=n[1],void e.filter((function(e){var t=e.week,n=e.day;return t===r&&n===a})).reduce((function(e,t){var n=t.exercise,c=t.instruction;return void 0===e["week ".concat(r)]&&(e["week ".concat(r)]={}),void 0===e["week ".concat(r)]["day ".concat(a)]&&(e["week ".concat(r)]["day ".concat(a)]=[]),e["week ".concat(r)]["day ".concat(a)].push({exercise:n,instruction:c}),e}),t);var r,a})),t},this.reader.programmeId=t,this.reader.onload=function(){var e=Object(E.a)(g.a.mark((function e(t){var n,r,a,c,o;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.target.result,r=q.a.read(n,{type:"buffer"}),a={scheduleName:"",timetable:"",programmeId:this.programmeId,weekCount:0},c=[],r.SheetNames.forEach((function(e){var t=q.a.utils.sheet_to_json(r.Sheets[e]);a.scheduleName=e,c.push.apply(c,Object(A.a)(t))})),a.timetable=this.makeTimeTable(c),document.getElementById("jsonObject").innerHTML=JSON.stringify(a,null,4),a.weekCount=Math.max.apply(null,Object.keys(a.timetable).map((function(e){return parseInt(e.substring(e.length-1))}))),e.next=10,I.postNewSchedule(a);case 10:return o=e.sent,e.abrupt("return",o);case 12:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),this.reader.onerror=function(e){console.error("File could not be read! Code "+e.target.error.code)},this.reader.readAsArrayBufferPromise=(n=this.reader.readAsArrayBuffer,function(){for(var e=this,t=arguments.length,r=new Array(t),a=0;a<t;a++)r[a]=arguments[a];return new Promise((function(t,a){r.push((function(e,n){e?a(e):t(n)})),n.call.apply(n,[e].concat(r))}))})},V=function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(){var e;return Object(f.a)(this,n),e=t.call(this),console.log("I was created!"),e.fetchProgrammes=L(e.fetchProgrammes),e._instance=Object(O.a)(e),n._instance?Object(k.a)(e,e._instance):e}return Object(d.a)(n,[{key:"fetchProgrammes",value:function(){var e=Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._fetchJsonFactory("programmes")();case 2:return t=e.sent,e.abrupt("return",t||!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()}],[{key:"getProgrammeInstance",value:function(){return n._instance||new n}}]),n}(C).getProgrammeInstance();function X(){var e=Object(r.useState)(null),t=Object(y.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(null),s=Object(y.a)(o,2),u=s[0],l=s[1],i=Object(r.useState)(null),m=Object(y.a)(i,2),p=m[0],f=m[1],d=D("programmes");return Object(r.useEffect)((function(){function e(){return(e=Object(E.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,V.fetchProgrammes();case 2:(t=e.sent)?(console.log(t),c((function(e){return[].concat(Object(A.a)(t.programmes),[{programmeId:0,programmeName:"None"}])})),l(0),f(!0)):f(!1);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[]),a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement("div",null,n?a.a.createElement($,{onProgrammeSelected:function(e){l(parseInt(e.target.value))},programmes:n,selectedProgrammeId:u,isFetchSuccess:p}):a.a.createElement(d,{isFetchSuccess:p})),a.a.createElement(Z,{onFileUploaded:function(e){var t=e.target.files[0];new G(u).reader.readAsArrayBufferPromise(t).then((function(e){return console.log(e)}))}})))}function Z(e){var t=e.onFileUploaded;return a.a.createElement("div",null,a.a.createElement("input",{type:"file",id:"fileUploader",name:"fileUploader",accept:".xls, .xlsx",onChange:t}),a.a.createElement("pre",{id:"jsonObject"}," JSON : "))}function $(e){var t=e.programmes,n=e.onProgrammeSelected,r=e.selectedProgrammeId,c=t.map((function(e){var t=e.programmeName,n=e.programmeId;return a.a.createElement("option",{key:n,value:n},t)}));return a.a.createElement(a.a.Fragment,null,a.a.createElement("div",null,a.a.createElement("label",{htmlFor:"programmes"},"Publish to Programme: ")),a.a.createElement("select",{name:"programmes",onChange:n,value:r||void 0},c))}function K(e){return e.trim().length>0}function Q(e){var t=e.email,n=e.password;return K(t)&&K(n)?function(e){return/^([\w_-]+|[\w_-]+(.[\w_-]+)+?)@([\w_-]+|[\w_-]+(.[\w_-]+)+?)$/.test(e)}(t)?null:"Invalid email":"Missing Email or Password"}var ee=function(e){Object(w.a)(n,e);var t=Object(j.a)(n);function n(){var e;return Object(f.a)(this,n),(e=t.call(this)).instructorLogin=L(e.instructorLogin),e._instance=Object(O.a)(e),n._instance?Object(k.a)(e,e._instance):e}return Object(d.a)(n,[{key:"instructorLogin",value:function(){var e=Object(E.a)(g.a.mark((function e(t){var r;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n._fetchPostFactory("instructor/login",!0)(t);case 2:return r=e.sent,e.abrupt("return",r||[!1,{}]);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}],[{key:"getInstructorInstance",value:function(){return n._instance||new n}}]),n}(C).getInstructorInstance();function te(){var e=Object(r.useState)({email:"",password:""}),t=Object(y.a)(e,2),n=t[0],c=t[1],o=Object(r.useState)(null),s=Object(y.a)(o,2),u=s[0],l=s[1],i=Object(r.useState)(h.isAuthenticated()),m=Object(y.a)(i,2),p=m[0],f=m[1];function d(e){var t=e.target.getAttribute("name"),n=e.target.value.trim();c((function(e){return e[t]=n,e}))}function v(){return(v=Object(E.a)(g.a.mark((function e(t){var r,a,c,o,s;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),!(r=Q(n))){e.next=5;break}return l(r),e.abrupt("return");case 5:return l(null),console.log("Logging in with ",n),e.next=9,ee.instructorLogin(n);case 9:a=e.sent,c=Object(y.a)(a,2),o=c[0],s=c[1],o?(h.saveToken(s.token),f(!0)):l(s.message);case 14:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var b=Object.keys(n).map((function(e){return a.a.createElement(ae,{key:e,label:e,onInputChanged:d,value:n[e]})}));return a.a.createElement("div",null,a.a.createElement(re,null),p?a.a.createElement(ne,{onLogOutClicked:function(e){console.log("log me out!"),h.clearToken(),f(!1)}}):a.a.createElement(se,{onFormSubmitted:function(e){return v.apply(this,arguments)},fields:b,errorMessage:u}))}function ne(e){var t=e.onLogOutClicked;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"Welcome to the Instructor Space"),a.a.createElement(ce,{customClassName:"logout",label:"Log Out",onClick:t}))}function re(){return a.a.createElement("div",{className:"logo-wrapper"},a.a.createElement("img",{className:"logo",src:n(61),alt:"New Zealand Olympic Weight-Lifting Logo"}))}function ae(e){var t=e.label,n=e.onInputChanged,r=e.fieldValue;return a.a.createElement("div",{className:"field-container ".concat(t)},a.a.createElement("label",{htmlFor:t,className:"search-form-label index ".concat(t)},t),a.a.createElement("input",{id:t,name:t,className:"text-input",type:"password"===t?"password":"text",onChange:n,value:r}))}function ce(e){var t=e.customClassName,n=e.label,r=e.onClick;return a.a.createElement("button",{type:"submit",className:"submit-btn ".concat(t),onClick:r},n)}function oe(e){var t=e.errorMessage;return a.a.createElement("div",{className:"error-message-wrapper"},a.a.createElement("p",{className:"error-message",style:{visibility:t?"visible":"hidden"}},t))}function se(e){var t=e.onFormSubmitted,n=e.fields,r=e.errorMessage;return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",{className:"login-form-title"},"Login"),a.a.createElement("form",{className:"login-form",onSubmit:t},n,a.a.createElement(oe,{errorMessage:r}),a.a.createElement("div",{className:"submit-btn-container"},a.a.createElement(ce,{customClassName:"login right",label:"Log In"}))))}var ue=function(){return a.a.createElement(s.a,null,a.a.createElement(i,{links:[{to:"/instructor",label:"Home Panel"},{to:"/instructor/learners",label:"Learners"},{to:"/instructor/schedules",label:"Schedules"},{to:"/instructor/schedules/new",label:"Publish Schedule"},{to:"/instructor/testLearners",label:"Learners Panel"}]}),a.a.createElement("div",{className:"App main"},a.a.createElement(u.d,null,a.a.createElement(u.b,{exact:!0,path:"/instructor/login",component:te}),a.a.createElement(v,{exact:!0,path:"/instructor/learners",component:_}),a.a.createElement(v,{exact:!0,path:"/instructor/schedules/new",component:X}),a.a.createElement(v,{exact:!0,path:"/instructor/testLearners",component:J}),a.a.createElement(u.b,{exact:!0,path:"/instructor/error",component:m}),a.a.createElement(u.a,{to:"/instructor/login"}))),a.a.createElement(p,null))},le=n(38),ie=Object(le.a)({reducer:{}}),me=n(37);o.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement(me.a,{store:ie},a.a.createElement(ue,null))),document.getElementById("root"))}},[[41,1,2]]]);
//# sourceMappingURL=main.787fa9e3.chunk.js.map