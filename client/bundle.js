/*! For license information please see bundle.js.LICENSE.txt */
!function(){function _typeof(e){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_typeof(e)}function _regeneratorRuntime(){"use strict";_regeneratorRuntime=function(){return t};var e,t={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function define(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{define({},"")}catch(e){define=function(e,t,r){return e[t]=r}}function wrap(e,t,r,n){var a=t&&t.prototype instanceof Generator?t:Generator,i=Object.create(a.prototype),c=new Context(n||[]);return o(i,"_invoke",{value:makeInvokeMethod(e,r,c)}),i}function tryCatch(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(e){return{type:"throw",arg:e}}}t.wrap=wrap;var s="suspendedStart",l="suspendedYield",f="executing",h="completed",p={};function Generator(){}function GeneratorFunction(){}function GeneratorFunctionPrototype(){}var y={};define(y,i,(function(){return this}));var d=Object.getPrototypeOf,v=d&&d(d(values([])));v&&v!==r&&n.call(v,i)&&(y=v);var g=GeneratorFunctionPrototype.prototype=Generator.prototype=Object.create(y);function defineIteratorMethods(e){["next","throw","return"].forEach((function(t){define(e,t,(function(e){return this._invoke(t,e)}))}))}function AsyncIterator(e,t){function invoke(r,o,a,i){var c=tryCatch(e[r],e,o);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"==_typeof(s)&&n.call(s,"__await")?t.resolve(s.__await).then((function(e){invoke("next",e,a,i)}),(function(e){invoke("throw",e,a,i)})):t.resolve(s).then((function(e){u.value=e,a(u)}),(function(e){return invoke("throw",e,a,i)}))}i(c.arg)}var r;o(this,"_invoke",{value:function(e,n){function callInvokeWithMethodAndArg(){return new t((function(t,r){invoke(e,n,t,r)}))}return r=r?r.then(callInvokeWithMethodAndArg,callInvokeWithMethodAndArg):callInvokeWithMethodAndArg()}})}function makeInvokeMethod(t,r,n){var o=s;return function(a,i){if(o===f)throw new Error("Generator is already running");if(o===h){if("throw"===a)throw i;return{value:e,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=maybeInvokeDelegate(c,n);if(u){if(u===p)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===s)throw o=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=f;var y=tryCatch(t,r,n);if("normal"===y.type){if(o=n.done?h:l,y.arg===p)continue;return{value:y.arg,done:n.done}}"throw"===y.type&&(o=h,n.method="throw",n.arg=y.arg)}}}function maybeInvokeDelegate(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,maybeInvokeDelegate(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),p;var a=tryCatch(o,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,p;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,p):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,p)}function pushTryEntry(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function resetTryEntry(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function Context(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(pushTryEntry,this),this.reset(!0)}function values(t){if(t||""===t){var r=t[i];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function next(){for(;++o<t.length;)if(n.call(t,o))return next.value=t[o],next.done=!1,next;return next.value=e,next.done=!0,next};return a.next=a}}throw new TypeError(_typeof(t)+" is not iterable")}return GeneratorFunction.prototype=GeneratorFunctionPrototype,o(g,"constructor",{value:GeneratorFunctionPrototype,configurable:!0}),o(GeneratorFunctionPrototype,"constructor",{value:GeneratorFunction,configurable:!0}),GeneratorFunction.displayName=define(GeneratorFunctionPrototype,u,"GeneratorFunction"),t.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===GeneratorFunction||"GeneratorFunction"===(t.displayName||t.name))},t.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,GeneratorFunctionPrototype):(e.__proto__=GeneratorFunctionPrototype,define(e,u,"GeneratorFunction")),e.prototype=Object.create(g),e},t.awrap=function(e){return{__await:e}},defineIteratorMethods(AsyncIterator.prototype),define(AsyncIterator.prototype,c,(function(){return this})),t.AsyncIterator=AsyncIterator,t.async=function(e,r,n,o,a){void 0===a&&(a=Promise);var i=new AsyncIterator(wrap(e,r,n,o),a);return t.isGeneratorFunction(r)?i:i.next().then((function(e){return e.done?e.value:i.next()}))},defineIteratorMethods(g),define(g,u,"Generator"),define(g,i,(function(){return this})),define(g,"toString",(function(){return"[object Generator]"})),t.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function next(){for(;r.length;){var e=r.pop();if(e in t)return next.value=e,next.done=!1,next}return next.done=!0,next}},t.values=values,Context.prototype={constructor:Context,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(resetTryEntry),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function handle(n,o){return i.type="throw",i.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],i=a.completion;if("root"===a.tryLoc)return handle("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),u=n.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return handle(a.catchLoc,!0);if(this.prev<a.finallyLoc)return handle(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return handle(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return handle(a.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===e||"continue"===e)&&a.tryLoc<=t&&t<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=e,i.arg=t,a?(this.method="next",this.next=a.finallyLoc,p):this.complete(i)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),p},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),resetTryEntry(r),p}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;resetTryEntry(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:values(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),p}},t}function asyncGeneratorStep(e,t,r,n,o,a,i){try{var c=e[a](i),u=c.value}catch(e){return void r(e)}c.done?t(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var a=e.apply(t,r);function _next(e){asyncGeneratorStep(a,n,o,_next,_throw,"next",e)}function _throw(e){asyncGeneratorStep(a,n,o,_next,_throw,"throw",e)}_next(void 0)}))}}var e;function getUserPosition(){return _getUserPosition.apply(this,arguments)}function _getUserPosition(){return(_getUserPosition=_asyncToGenerator(_regeneratorRuntime().mark((function _callee4(){return _regeneratorRuntime().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((function(e,t){navigator.geolocation?navigator.geolocation.getCurrentPosition((function(t){var r={latitude:t.coords.latitude,longitude:t.coords.longitude};e(r)}),(function(e){switch(e.code){case e.PERMISSION_DENIED:console.error("用戶拒絕定位請求");break;case e.POSITION_UNAVAILABLE:console.error("無法取得用戶定位");break;case e.TIMEOUT:console.error("定位請求超時");break;case e.UNKNOWN_ERROR:console.error("發生未知錯誤")}t(e)})):(console.error("不支援此瀏覽器"),t(new Error("不支援此瀏覽器")))})));case 1:case"end":return e.stop()}}),_callee4)})))).apply(this,arguments)}function renderDataToTable(e){for(var t=document.getElementById("data-table").getElementsByTagName("tbody")[0];t.firstChild;)t.removeChild(t.firstChild);e.forEach((function(e){var r=t.insertRow(),n=r.insertCell(0),o=r.insertCell(1),a=r.insertCell(2),i=r.insertCell(3),c=r.insertCell(4),u=r.insertCell(5),s=r.insertCell(6);n.innerHTML=e.CarParkName,o.innerHTML=e.Address,a.innerHTML=e.Telephone,i.innerHTML=e.AvailableSpaces,c.innerHTML=e.TotalSpaces,u.innerHTML=e.CarParkDistance,s.innerHTML=e.TotalSpaces,1===e.ServiceStatus?s.innerHTML="營業中":0===e.ServiceStatus?s.innerHTML="未營業":s.innerHTML="錯誤"}))}window.addEventListener("beforeinstallprompt",(function(t){t.preventDefault(),e=t,document.getElementById("installButton").style.display="block"})),document.getElementById("installButton").addEventListener("click",(function(){e&&(e.prompt(),e.userChoice.then((function(t){"accepted"===t.outcome?console.log("User accepted the install prompt"):console.log("User dismissed the install prompt"),e=null})))})),document.addEventListener("DOMContentLoaded",_asyncToGenerator(_regeneratorRuntime().mark((function _callee(){return _regeneratorRuntime().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,getUserPosition();case 3:e.sent,e.next=9;break;case 6:e.prev=6,e.t0=e.catch(0),console.error("錯誤:",e.t0);case 9:case"end":return e.stop()}}),_callee,null,[[0,6]])})))),document.getElementById("searchButton").addEventListener("click",_asyncToGenerator(_regeneratorRuntime().mark((function _callee2(){var e,t,r,n,o,a;return _regeneratorRuntime().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return e=function(e){return/^$|^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(e)},i.next=3,getUserPosition();case 3:t=i.sent,r=document.getElementById("searchInput").value,n="/search?keyword=".concat(r),o=document.getElementById("inputState").value,a={selectedOption:o,data:t},e(r)?fetch("/api"+"".concat(n),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){renderDataToTable(e)})).catch((function(e){console.error(e)})):(searchInput.value="",alert("搜尋欄只允許中文、英文和數字，請不要包含其他符號。"));case 9:case"end":return i.stop()}}),_callee2)})))),document.getElementById("getLocationButton").addEventListener("click",_asyncToGenerator(_regeneratorRuntime().mark((function _callee3(){var e;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,getUserPosition();case 2:e=t.sent,fetch("/api/location",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((function(e){return e.json()})).then((function(e){renderDataToTable(e)})).catch((function(e){console.error("There was a problem with the fetch operation:",e)}));case 4:case"end":return t.stop()}}),_callee3)}))))}();