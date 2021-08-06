var e={exports:{}},t=function(e,t){return function(){for(var r=new Array(arguments.length),n=0;n<r.length;n++)r[n]=arguments[n];return e.apply(t,r)}},r=t,n=Object.prototype.toString;function o(e){return"[object Array]"===n.call(e)}function i(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function a(e){if("[object Object]"!==n.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function u(e){return"[object Function]"===n.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),o(e))for(var r=0,n=e.length;r<n;r++)t.call(null,e[r],r,e);else for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&t.call(null,e[i],i,e)}var f={isArray:o,isArrayBuffer:function(e){return"[object ArrayBuffer]"===n.call(e)},isBuffer:function(e){return null!==e&&!i(e)&&null!==e.constructor&&!i(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:a,isUndefined:i,isDate:function(e){return"[object Date]"===n.call(e)},isFile:function(e){return"[object File]"===n.call(e)},isBlob:function(e){return"[object Blob]"===n.call(e)},isFunction:u,isStream:function(e){return s(e)&&u(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:c,merge:function e(){var t={};function r(r,n){a(t[n])&&a(r)?t[n]=e(t[n],r):a(r)?t[n]=e({},r):o(r)?t[n]=r.slice():t[n]=r}for(var n=0,i=arguments.length;n<i;n++)c(arguments[n],r);return t},extend:function(e,t,n){return c(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}},p=f;function d(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var l=function(e,t,r){if(!t)return e;var n;if(r)n=r(t);else if(p.isURLSearchParams(t))n=t.toString();else{var o=[];p.forEach(t,(function(e,t){null!=e&&(p.isArray(e)?t+="[]":e=[e],p.forEach(e,(function(e){p.isDate(e)?e=e.toISOString():p.isObject(e)&&(e=JSON.stringify(e)),o.push(d(t)+"="+d(e))})))})),n=o.join("&")}if(n){var i=e.indexOf("#");-1!==i&&(e=e.slice(0,i)),e+=(-1===e.indexOf("?")?"?":"&")+n}return e},h=f;function m(){this.handlers=[]}m.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},m.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},m.prototype.forEach=function(e){h.forEach(this.handlers,(function(t){null!==t&&e(t)}))};var g=m,y=f,v=function(e){return!(!e||!e.__CANCEL__)},w=f,b=function(e,t,r,n,o){return e.config=t,r&&(e.code=r),e.request=n,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code}},e},E=function(e,t,r,n,o){var i=new Error(e);return b(i,t,r,n,o)},x=E,C=f,S=C.isStandardBrowserEnv()?{write:function(e,t,r,n,o,i){var s=[];s.push(e+"="+encodeURIComponent(t)),C.isNumber(r)&&s.push("expires="+new Date(r).toGMTString()),C.isString(n)&&s.push("path="+n),C.isString(o)&&s.push("domain="+o),!0===i&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}},j=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)},R=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e},A=f,O=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"],N=f,U=N.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),r=document.createElement("a");function n(e){var n=e;return t&&(r.setAttribute("href",n),n=r.href),r.setAttribute("href",n),{href:r.href,protocol:r.protocol?r.protocol.replace(/:$/,""):"",host:r.host,search:r.search?r.search.replace(/^\?/,""):"",hash:r.hash?r.hash.replace(/^#/,""):"",hostname:r.hostname,port:r.port,pathname:"/"===r.pathname.charAt(0)?r.pathname:"/"+r.pathname}}return e=n(window.location.href),function(t){var r=N.isString(t)?n(t):t;return r.protocol===e.protocol&&r.host===e.host}}():function(){return!0},B=f,T=function(e,t,r){var n=r.config.validateStatus;r.status&&n&&!n(r.status)?t(x("Request failed with status code "+r.status,r.config,null,r.request,r)):e(r)},P=S,L=l,q=function(e,t){return e&&!j(t)?R(e,t):t},k=function(e){var t,r,n,o={};return e?(A.forEach(e.split("\n"),(function(e){if(n=e.indexOf(":"),t=A.trim(e.substr(0,n)).toLowerCase(),r=A.trim(e.substr(n+1)),t){if(o[t]&&O.indexOf(t)>=0)return;o[t]="set-cookie"===t?(o[t]?o[t]:[]).concat([r]):o[t]?o[t]+", "+r:r}})),o):o},D=U,F=E,z=function(e){return new Promise((function(t,r){var n=e.data,o=e.headers;B.isFormData(n)&&delete o["Content-Type"];var i=new XMLHttpRequest;if(e.auth){var s=e.auth.username||"",a=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";o.Authorization="Basic "+btoa(s+":"+a)}var u=q(e.baseURL,e.url);if(i.open(e.method.toUpperCase(),L(u,e.params,e.paramsSerializer),!0),i.timeout=e.timeout,i.onreadystatechange=function(){if(i&&4===i.readyState&&(0!==i.status||i.responseURL&&0===i.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in i?k(i.getAllResponseHeaders()):null,o={data:e.responseType&&"text"!==e.responseType?i.response:i.responseText,status:i.status,statusText:i.statusText,headers:n,config:e,request:i};T(t,r,o),i=null}},i.onabort=function(){i&&(r(F("Request aborted",e,"ECONNABORTED",i)),i=null)},i.onerror=function(){r(F("Network Error",e,null,i)),i=null},i.ontimeout=function(){var t="timeout of "+e.timeout+"ms exceeded";e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),r(F(t,e,"ECONNABORTED",i)),i=null},B.isStandardBrowserEnv()){var c=(e.withCredentials||D(u))&&e.xsrfCookieName?P.read(e.xsrfCookieName):void 0;c&&(o[e.xsrfHeaderName]=c)}if("setRequestHeader"in i&&B.forEach(o,(function(e,t){void 0===n&&"content-type"===t.toLowerCase()?delete o[t]:i.setRequestHeader(t,e)})),B.isUndefined(e.withCredentials)||(i.withCredentials=!!e.withCredentials),e.responseType)try{i.responseType=e.responseType}catch(f){if("json"!==e.responseType)throw f}"function"==typeof e.onDownloadProgress&&i.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&i.upload&&i.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then((function(e){i&&(i.abort(),r(e),i=null)})),n||(n=null),i.send(n)}))},H=f,_=function(e,t){w.forEach(e,(function(r,n){n!==t&&n.toUpperCase()===t.toUpperCase()&&(e[t]=r,delete e[n])}))},I={"Content-Type":"application/x-www-form-urlencoded"};function M(e,t){!H.isUndefined(e)&&H.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var X,J={adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(X=z),X),transformRequest:[function(e,t){return _(t,"Accept"),_(t,"Content-Type"),H.isFormData(e)||H.isArrayBuffer(e)||H.isBuffer(e)||H.isStream(e)||H.isFile(e)||H.isBlob(e)?e:H.isArrayBufferView(e)?e.buffer:H.isURLSearchParams(e)?(M(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):H.isObject(e)?(M(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(t){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300}};J.headers={common:{Accept:"application/json, text/plain, */*"}},H.forEach(["delete","get","head"],(function(e){J.headers[e]={}})),H.forEach(["post","put","patch"],(function(e){J.headers[e]=H.merge(I)}));var V=J,$=f,K=function(e,t,r){return y.forEach(r,(function(r){e=r(e,t)})),e},G=v,Q=V;function W(e){e.cancelToken&&e.cancelToken.throwIfRequested()}var Y=f,Z=function(e,t){t=t||{};var r={},n=["url","method","data"],o=["headers","auth","proxy","params"],i=["baseURL","transformRequest","transformResponse","paramsSerializer","timeout","timeoutMessage","withCredentials","adapter","responseType","xsrfCookieName","xsrfHeaderName","onUploadProgress","onDownloadProgress","decompress","maxContentLength","maxBodyLength","maxRedirects","transport","httpAgent","httpsAgent","cancelToken","socketPath","responseEncoding"],s=["validateStatus"];function a(e,t){return Y.isPlainObject(e)&&Y.isPlainObject(t)?Y.merge(e,t):Y.isPlainObject(t)?Y.merge({},t):Y.isArray(t)?t.slice():t}function u(n){Y.isUndefined(t[n])?Y.isUndefined(e[n])||(r[n]=a(void 0,e[n])):r[n]=a(e[n],t[n])}Y.forEach(n,(function(e){Y.isUndefined(t[e])||(r[e]=a(void 0,t[e]))})),Y.forEach(o,u),Y.forEach(i,(function(n){Y.isUndefined(t[n])?Y.isUndefined(e[n])||(r[n]=a(void 0,e[n])):r[n]=a(void 0,t[n])})),Y.forEach(s,(function(n){n in t?r[n]=a(e[n],t[n]):n in e&&(r[n]=a(void 0,e[n]))}));var c=n.concat(o).concat(i).concat(s),f=Object.keys(e).concat(Object.keys(t)).filter((function(e){return-1===c.indexOf(e)}));return Y.forEach(f,u),r},ee=f,te=l,re=g,ne=function(e){return W(e),e.headers=e.headers||{},e.data=K(e.data,e.headers,e.transformRequest),e.headers=$.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),$.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||Q.adapter)(e).then((function(t){return W(e),t.data=K(t.data,t.headers,e.transformResponse),t}),(function(t){return G(t)||(W(e),t&&t.response&&(t.response.data=K(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))},oe=Z;function ie(e){this.defaults=e,this.interceptors={request:new re,response:new re}}ie.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=oe(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=[ne,void 0],r=Promise.resolve(e);for(this.interceptors.request.forEach((function(e){t.unshift(e.fulfilled,e.rejected)})),this.interceptors.response.forEach((function(e){t.push(e.fulfilled,e.rejected)}));t.length;)r=r.then(t.shift(),t.shift());return r},ie.prototype.getUri=function(e){return e=oe(this.defaults,e),te(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},ee.forEach(["delete","get","head","options"],(function(e){ie.prototype[e]=function(t,r){return this.request(oe(r||{},{method:e,url:t,data:(r||{}).data}))}})),ee.forEach(["post","put","patch"],(function(e){ie.prototype[e]=function(t,r,n){return this.request(oe(n||{},{method:e,url:t,data:r}))}}));var se=ie;function ae(e){this.message=e}ae.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},ae.prototype.__CANCEL__=!0;var ue=ae,ce=ue;function fe(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var r=this;e((function(e){r.reason||(r.reason=new ce(e),t(r.reason))}))}fe.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},fe.source=function(){var e;return{token:new fe((function(t){e=t})),cancel:e}};var pe=fe,de=f,le=t,he=se,me=Z;function ge(e){var t=new he(e),r=le(he.prototype.request,t);return de.extend(r,he.prototype,t),de.extend(r,t),r}var ye=ge(V);ye.Axios=he,ye.create=function(e){return ge(me(ye.defaults,e))},ye.Cancel=ue,ye.CancelToken=pe,ye.isCancel=v,ye.all=function(e){return Promise.all(e)},ye.spread=function(e){return function(t){return e.apply(null,t)}},ye.isAxiosError=function(e){return"object"==typeof e&&!0===e.isAxiosError},e.exports=ye,e.exports.default=ye;const ve=e.exports;ve.interceptors.request.use((e=>(e.url="https:suezp.cn/server"+e.url,e))),ve.interceptors.response.use((e=>e),(e=>Promise.reject(e)));
