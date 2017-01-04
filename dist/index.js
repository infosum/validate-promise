!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("validate-promise",[],t):"object"==typeof exports?exports["validate-promise"]=t():e["validate-promise"]=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="/",t(0)}([function(e,t,r){e.exports=r(1)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.whitelist=t.required=t.lessthan=t.int=t.greaterthan=t.blacklist=t.before=t.after=void 0;var o=r(2),u=n(o),i=r(3),f=n(i),s=r(4),a=n(s),c=r(5),l=n(c),d=r(6),p=n(d),v=r(7),m=n(v),P=r(8),y=n(P),j=r(9),_=n(j),b=function(e){var t=Object.keys(e);return Promise.all(t.map(function(t){return Promise.resolve(e[t]).then(function(e){var r={state:"fulfilled",key:t,value:e};return r},function(e){var r={state:"rejected",key:t,reason:e};return r})}))},h=function(e,t){var r={};return e.forEach(function(e){var n=e.key,o=t[n];e.arg||[];e.promises.forEach(function(u,i){var f=n+"."+i,s=void 0===u.arg?null:u.arg;r[f]=u.rule(o,t,e.msg,s)})}),new Promise(function(e,t){b(r).then(function(r){var n=r.filter(function(e){return"rejected"===e.state}),o={};n.forEach(function(e){var t=e.key.split(".").shift();o[t]||(o[t]=[]),o[t].push(e.reason)}),0===n.length&&e(!0),t(o)})})};t.default=h,t.after=u.default,t.before=f.default,t.blacklist=a.default,t.greaterthan=l.default,t.int=p.default,t.lessthan=m.default,t.required=y.default,t.whitelist=_.default},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){var o=Date.parse(e);"function"==typeof n&&(n=n(e,t));var u=Date.parse(n);return o>u?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){var o=Date.parse(e);"function"==typeof n&&(n=n(e,t));var u=Date.parse(n);return o<u?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){return"function"==typeof n&&(n=n(e,t)),n.indexOf(e)===-1?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){return"function"==typeof n&&(n=n(e,t)),parseInt(e,10)>n?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){"function"==typeof n&&(n=n(e,t));var o=/^(?:[-+]?(?:0|[1-9][0-9]*))$/;if(null!==n){if(void 0!==n.min&&parseInt(e,10)<parseInt(n.min,10))return Promise.reject(r(e,t,n));if(n.max&&parseInt(e,10)>parseInt(n.max,10))return Promise.reject(r(e,t,n))}return o.test(e)?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){return"function"==typeof n&&(n=n(e,t)),parseInt(e,10)<n?Promise.resolve():Promise.reject(r(e,t,n))}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r){return new Promise(function(n,o){return""!==e&&void 0!==e?n():o(r(e,t))})}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t,r,n){return"function"==typeof n&&(n=n(e,t)),n.indexOf(e)!==-1?Promise.resolve():Promise.reject(r(e,t,n))}}])});
//# sourceMappingURL=index.js.map