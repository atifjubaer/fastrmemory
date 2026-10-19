import{r as qM,g as ZM,a as Rt,R as Xp,S as dx,P as R_,b as C_,Z as KM,c as QM,C as Jh,d as JM,L as hx,T as $M,A as tb,e as $h,f as eb,N as nb,h as w_,i as D_,j as ib,k as ab,l as sb,M as rb,m as ob,n as lb}from"./lucide-3M5W1ITJ.js";import{r as cb}from"./react-DJFk45sp.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const d of f.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(l){if(l.ep)return;l.ep=!0;const f=i(l);fetch(l.href,f)}})();var ph={exports:{}},sl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var px;function ub(){if(px)return sl;px=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,f){var d=null;if(f!==void 0&&(d=""+f),l.key!==void 0&&(d=""+l.key),"key"in l){f={};for(var h in l)h!=="key"&&(f[h]=l[h])}else f=l;return l=f.ref,{$$typeof:o,type:s,key:d,ref:l!==void 0?l:null,props:f}}return sl.Fragment=e,sl.jsx=i,sl.jsxs=i,sl}var mx;function fb(){return mx||(mx=1,ph.exports=ub()),ph.exports}var M=fb(),mh={exports:{}},rl={},gh={exports:{}},vh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var gx;function db(){return gx||(gx=1,(function(o){function e(z,k){var $=z.length;z.push(k);t:for(;0<$;){var j=$-1>>>1,at=z[j];if(0<l(at,k))z[j]=k,z[$]=at,$=j;else break t}}function i(z){return z.length===0?null:z[0]}function s(z){if(z.length===0)return null;var k=z[0],$=z.pop();if($!==k){z[0]=$;t:for(var j=0,at=z.length,ot=at>>>1;j<ot;){var zt=2*(j+1)-1,wt=z[zt],se=zt+1,ie=z[se];if(0>l(wt,$))se<at&&0>l(ie,wt)?(z[j]=ie,z[se]=$,j=se):(z[j]=wt,z[zt]=$,j=zt);else if(se<at&&0>l(ie,$))z[j]=ie,z[se]=$,j=se;else break t}}return k}function l(z,k){var $=z.sortIndex-k.sortIndex;return $!==0?$:z.id-k.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var d=Date,h=d.now();o.unstable_now=function(){return d.now()-h}}var p=[],m=[],_=1,y=null,v=3,b=!1,R=!1,O=!1,S=!1,x=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function D(z){for(var k=i(m);k!==null;){if(k.callback===null)s(m);else if(k.startTime<=z)s(m),k.sortIndex=k.expirationTime,e(p,k);else break;k=i(m)}}function N(z){if(O=!1,D(z),!R)if(i(p)!==null)R=!0,w||(w=!0,Z());else{var k=i(m);k!==null&&Y(N,k.startTime-z)}}var w=!1,I=-1,T=5,P=-1;function L(){return S?!0:!(o.unstable_now()-P<T)}function G(){if(S=!1,w){var z=o.unstable_now();P=z;var k=!0;try{t:{R=!1,O&&(O=!1,U(I),I=-1),b=!0;var $=v;try{e:{for(D(z),y=i(p);y!==null&&!(y.expirationTime>z&&L());){var j=y.callback;if(typeof j=="function"){y.callback=null,v=y.priorityLevel;var at=j(y.expirationTime<=z);if(z=o.unstable_now(),typeof at=="function"){y.callback=at,D(z),k=!0;break e}y===i(p)&&s(p),D(z)}else s(p);y=i(p)}if(y!==null)k=!0;else{var ot=i(m);ot!==null&&Y(N,ot.startTime-z),k=!1}}break t}finally{y=null,v=$,b=!1}k=void 0}}finally{k?Z():w=!1}}}var Z;if(typeof V=="function")Z=function(){V(G)};else if(typeof MessageChannel<"u"){var J=new MessageChannel,H=J.port2;J.port1.onmessage=G,Z=function(){H.postMessage(null)}}else Z=function(){x(G,0)};function Y(z,k){I=x(function(){z(o.unstable_now())},k)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(z){z.callback=null},o.unstable_forceFrameRate=function(z){0>z||125<z?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):T=0<z?Math.floor(1e3/z):5},o.unstable_getCurrentPriorityLevel=function(){return v},o.unstable_next=function(z){switch(v){case 1:case 2:case 3:var k=3;break;default:k=v}var $=v;v=k;try{return z()}finally{v=$}},o.unstable_requestPaint=function(){S=!0},o.unstable_runWithPriority=function(z,k){switch(z){case 1:case 2:case 3:case 4:case 5:break;default:z=3}var $=v;v=z;try{return k()}finally{v=$}},o.unstable_scheduleCallback=function(z,k,$){var j=o.unstable_now();switch(typeof $=="object"&&$!==null?($=$.delay,$=typeof $=="number"&&0<$?j+$:j):$=j,z){case 1:var at=-1;break;case 2:at=250;break;case 5:at=1073741823;break;case 4:at=1e4;break;default:at=5e3}return at=$+at,z={id:_++,callback:k,priorityLevel:z,startTime:$,expirationTime:at,sortIndex:-1},$>j?(z.sortIndex=$,e(m,z),i(p)===null&&z===i(m)&&(O?(U(I),I=-1):O=!0,Y(N,$-j))):(z.sortIndex=at,e(p,z),R||b||(R=!0,w||(w=!0,Z()))),z},o.unstable_shouldYield=L,o.unstable_wrapCallback=function(z){var k=v;return function(){var $=v;v=k;try{return z.apply(this,arguments)}finally{v=$}}}})(vh)),vh}var vx;function hb(){return vx||(vx=1,gh.exports=db()),gh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xx;function pb(){if(xx)return rl;xx=1;var o=hb(),e=qM(),i=cb();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var c=a.return;if(c===null)break;var u=c.alternate;if(u===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===u.child){for(u=c.child;u;){if(u===a)return p(c),t;if(u===r)return p(c),n;u=u.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=u;else{for(var g=!1,C=c.child;C;){if(C===a){g=!0,a=c,r=u;break}if(C===r){g=!0,r=c,a=u;break}C=C.sibling}if(!g){for(C=u.child;C;){if(C===a){g=!0,a=u,r=c;break}if(C===r){g=!0,r=u,a=c;break}C=C.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}function y(t,n,a,r,c,u){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,c,u)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&y(t.child,n,a,r,c,u))return!0;t=t.sibling}return!1}function v(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function b(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function R(t){var n=[null,null],a=v(t);return a===null||O(n,t,a.child,{foundSelf:!1}),n}function O(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&O(t,n,a.child,r))return!0;a=a.sibling}return!1}function S(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var x=null,U=null;function V(t,n,a){return t===a?!0:t===n?(x=t,!0):!1}function D(t,n,a){return t===a?(U=t,!1):t===n?(U!==null&&(x=t),!0):!1}function N(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function w(t,n,a){for(var r=0,c=t;c;c=a(c))r++;c=0;for(var u=n;u;u=a(u))c++;for(;0<r-c;)t=a(t),r--;for(;0<c-r;)n=a(n),c--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var I=Object.assign,T=Symbol.for("react.element"),P=Symbol.for("react.transitional.element"),L=Symbol.for("react.portal"),G=Symbol.for("react.fragment"),Z=Symbol.for("react.strict_mode"),J=Symbol.for("react.profiler"),H=Symbol.for("react.consumer"),Y=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),k=Symbol.for("react.suspense"),$=Symbol.for("react.suspense_list"),j=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),ot=Symbol.for("react.activity"),zt=Symbol.for("react.legacy_hidden"),wt=Symbol.for("react.memo_cache_sentinel"),se=Symbol.for("react.view_transition"),ie=Symbol.for("react.recoverable"),te=Symbol.iterator;function pt(t){return t===null||typeof t!="object"?null:(t=te&&t[te]||t["@@iterator"],typeof t=="function"?t:null)}var mt=Symbol.for("react.client.reference");function Ot(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===mt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case G:return"Fragment";case J:return"Profiler";case Z:return"StrictMode";case k:return"Suspense";case $:return"SuspenseList";case ot:return"Activity";case se:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case L:return"Portal";case Y:return t.displayName||"Context";case H:return(t._context.displayName||"Context")+".Consumer";case z:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case j:return n=t.displayName||null,n!==null?n:Ot(t.type)||"Memo";case at:n=t._payload,t=t._init;try{return Ot(t(n))}catch{}}return null}var $t=Array.isArray,Mt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Gt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,ze={pending:!1,data:null,method:null,action:null},oe=[],ge=-1;function ve(t){return{current:t}}function ee(t){0>ge||(t.current=oe[ge],oe[ge]=null,ge--)}function et(t,n){ge++,oe[ge]=t.current,t.current=n}var Tt=ve(null),fe=ve(null),_e=ve(null),xe=ve(null);function q(t,n){switch(et(_e,n),et(fe,t),et(Tt,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?yv(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=yv(n),t=Mv(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}ee(Tt),et(Tt,t)}function sn(){ee(Tt),ee(fe),ee(_e)}function Fe(t){var n=t.memoizedState;n!==null&&(Br._currentValue=n.memoizedState,et(xe,t)),n=Tt.current;var a=Mv(n,t.type);n!==a&&(et(fe,t),et(Tt,a))}function B(t){fe.current===t&&(ee(Tt),ee(fe)),xe.current===t&&(ee(xe),Br._currentValue=ze)}var E,it;function ft(t){if(E===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);E=n&&n[1]||"",it=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+E+t+it}var gt=!1;function Et(t,n){if(!t||gt)return"";gt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var _t=function(){throw Error()};if(Object.defineProperty(_t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(_t,[])}catch(Lt){var Q=Lt}Reflect.construct(t,[],_t)}else{try{_t.call()}catch(Lt){Q=Lt}_t=!1;try{var ut=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),_t=!0,new t}finally{_t&&(ut!==void 0?Object.defineProperty(t.prototype,"props",ut):delete t.prototype.props)}}}else{try{throw Error()}catch(Lt){Q=Lt}(_t=t())&&typeof _t.catch=="function"&&_t.catch(function(){})}}catch(Lt){if(Lt&&Q&&typeof Lt.stack=="string")return[Lt.stack,Q.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=r.DetermineComponentFrameRoot(),g=u[0],C=u[1];if(g&&C){var F=g.split(`
`),nt=C.split(`
`);for(c=r=0;r<F.length&&!F[r].includes("DetermineComponentFrameRoot");)r++;for(;c<nt.length&&!nt[c].includes("DetermineComponentFrameRoot");)c++;if(r===F.length||c===nt.length)for(r=F.length-1,c=nt.length-1;1<=r&&0<=c&&F[r]!==nt[c];)c--;for(;1<=r&&0<=c;r--,c--)if(F[r]!==nt[c]){if(r!==1||c!==1)do if(r--,c--,0>c||F[r]!==nt[c]){var dt=`
`+F[r].replace(" at new "," at ");return t.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",t.displayName)),dt}while(1<=r&&0<=c);break}}}finally{gt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?ft(a):""}function Dt(t,n){switch(t.tag){case 26:case 27:case 5:return ft(t.type);case 16:return ft("Lazy");case 13:return t.child!==n&&n!==null?ft("Suspense Fallback"):ft("Suspense");case 19:return ft("SuspenseList");case 0:case 15:return Et(t.type,!1);case 11:return Et(t.type.render,!1);case 1:return Et(t.type,!0);case 31:return ft("Activity");case 30:return ft("ViewTransition");default:return""}}function vt(t){try{var n="",a=null;do n+=Dt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var yt=Object.prototype.hasOwnProperty,Ct=o.unstable_scheduleCallback,Jt=o.unstable_cancelCallback,It=o.unstable_shouldYield,Pt=o.unstable_requestPaint,Xt=o.unstable_now,ae=o.unstable_getCurrentPriorityLevel,de=o.unstable_ImmediatePriority,K=o.unstable_UserBlockingPriority,At=o.unstable_NormalPriority,St=o.unstable_LowPriority,Nt=o.unstable_IdlePriority,kt=o.log,bt=o.unstable_setDisableYieldValue,Qt=null,Vt=null;function Oe(t){if(typeof kt=="function"&&bt(t),Vt&&typeof Vt.setStrictMode=="function")try{Vt.setStrictMode(Qt,t)}catch{}}var he=Math.clz32?Math.clz32:Vu,ei=Math.log,mi=Math.LN2;function Vu(t){return t>>>=0,t===0?32:31-(ei(t)/mi|0)|0}var tr=256,ys=262144,Ba=4194304;function da(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ms(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var c=0,u=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var C=r&134217727;return C!==0?(r=C&~u,r!==0?c=da(r):(g&=C,g!==0?c=da(g):a||(a=C&~t,a!==0&&(c=da(a))))):(C=r&~u,C!==0?c=da(C):g!==0?c=da(g):a||(a=r&~t,a!==0&&(c=da(a)))),c===0?0:n!==0&&n!==c&&(n&u)===0&&(u=c&-c,a=n&-n,u>=a||u===32&&(a&4194048)!==0)?n:c}function Fa(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Vi(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-he(a),c=1<<r;n|=t[r],a&=~c}return n}function uo(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fo(){var t=Ba;return Ba<<=1,(Ba&62914560)===0&&(Ba=4194304),t}function er(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ki(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Al(t,n,a,r,c,u){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,F=t.expirationTimes,nt=t.hiddenUpdates;for(a=g&~a;0<a;){var dt=31-he(a),_t=1<<dt;C[dt]=0,F[dt]=-1;var Q=nt[dt];if(Q!==null)for(nt[dt]=null,dt=0;dt<Q.length;dt++){var ut=Q[dt];ut!==null&&(ut.lane&=-536870913)}a&=~_t}r!==0&&bs(t,r,0),u!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=u&~(g&~n))}function bs(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-he(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function ho(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-he(a),c=1<<r;c&n|t[r]&n&&(t[r]|=n),a&=~c}}function po(t,n){var a=n&-n;return a=(a&42)!==0?1:mo(a),(a&(t.suspendedLanes|n))!==0?0:a}function mo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function go(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Rl(){var t=Gt.p;return t!==0?t:(t=window.event,t===void 0?32:sx(t.type))}function Cl(t,n){var a=Gt.p;try{return Gt.p=t,n()}finally{Gt.p=a}}var gi=Math.random().toString(36).slice(2),A="__reactFiber$"+gi,X="__reactProps$"+gi,ht="__reactContainer$"+gi,lt="__reactEvents$"+gi,ct="__reactListeners$"+gi,Bt="__reactHandles$"+gi,Wt="__reactResources$"+gi,Ut="__reactMarker$"+gi,qt="__reactLoad$"+gi;function Zt(t){delete t[A],delete t[X],delete t[ct],delete t[Bt]}function le(t){var n;if(n=t[A])return n;for(var a=t.parentNode;a;){if(n=a[ht]||a[A]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Fv(t);t!==null;){if(a=t[A])return a;t=Fv(t)}return n}t=a,a=t.parentNode}return null}function pe(t){if(t=t[A]||t[ht]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function jt(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Re(t){var n=t[Wt];return n||(n=t[Wt]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function be(t){t[Ut]=!0}function Ke(t){t[qt]=void 0}var ke=new Set,xn={};function Ft(t,n){ln(t,n),ln(t+"Capture",n)}function ln(t,n){for(xn[t]=n,t=0;t<n.length;t++)ke.add(n[t])}var Pe=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Fn={},ni={};function Xi(t){return yt.call(ni,t)?!0:yt.call(Fn,t)?!1:Pe.test(t)?ni[t]=!0:(Fn[t]=!0,!1)}var Ee=!1;function Ge(){var t=Ee;return Ee=!1,t}function $e(t,n,a){if(Xi(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function ii(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function Ne(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function cn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ha(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function wl(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,u=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(g){a=""+g,u.call(this,g)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function ku(t){if(!t._valueTracker){var n=ha(t)?"checked":"value";t._valueTracker=wl(t,n,""+t[n])}}function cm(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=ha(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var mS=/[\n"\\]/g;function vi(t){return t.replace(mS,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Xu(t,n,a,r,c,u,g,C){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+cn(n)):t.value!==""+cn(n)&&(t.value=""+cn(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?g==="number"&&t.value==n?Wu(t,cn(t.value)):Wu(t,cn(n)):a!=null?Wu(t,cn(a)):r!=null&&t.removeAttribute("value"),c==null&&u!=null&&(t.defaultChecked=!!u),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+cn(C):t.removeAttribute("name")}function um(t,n,a,r,c,u,g,C){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.type=u),n!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||n!=null)){ku(t);return}a=a!=null?""+cn(a):"",n=n!=null?""+cn(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=C?t.checked:!!r,t.defaultChecked=!!r,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),ku(t)}function Wu(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function nr(t,n,a,r){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&r&&(t[a].defaultSelected=!0)}else{for(a=""+cn(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,r&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function fm(t,n,a){if(n!=null&&(n=""+cn(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+cn(a):""}function dm(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if($t(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=cn(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),ku(t)}function ir(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var gS=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function hm(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||gS.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function pm(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",Ee=!0);for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&(hm(t,c,r),Ee=!0)}else for(var u in n)n.hasOwnProperty(u)&&hm(t,u,n[u])}function ju(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var vS=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),xS=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Dl(t){return xS.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Wi(){}var Yu=null;function qu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var ar=null,sr=null;function mm(t){var n=pe(t);if(n&&(t=n.stateNode)){var a=t[X]||null;t:switch(t=n.stateNode,n.type){case"input":if(Xu(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+vi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var c=r[X]||null;if(!c)throw Error(s(90));Xu(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&cm(r)}break t;case"textarea":fm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&nr(t,!!a.multiple,n,!1)}}}var Zu=!1;function gm(t,n,a){if(Zu)return t(n,a);Zu=!0;try{var r=t(n);return r}finally{if(Zu=!1,(ar!==null||sr!==null)&&(Dc(),ar&&(n=ar,t=sr,sr=ar=null,mm(n),t)))for(n=0;n<t.length;n++)mm(t[n])}}function vo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[X]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var pa=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ku=!1;if(pa)try{var xo={};Object.defineProperty(xo,"passive",{get:function(){Ku=!0}}),window.addEventListener("test",xo,xo),window.removeEventListener("test",xo,xo)}catch{Ku=!1}var Ha=null,Qu=null,Nl=null;function vm(){if(Nl)return Nl;var t,n=Qu,a=n.length,r,c="value"in Ha?Ha.value:Ha.textContent,u=c.length;for(t=0;t<a&&n[t]===c[t];t++);var g=a-t;for(r=1;r<=g&&n[a-r]===c[u-r];r++);return Nl=c.slice(t,1<r?1-r:void 0)}function Ul(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Ll(){return!0}function xm(){return!1}function Hn(t){function n(a,r,c,u,g){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=u,this.target=g,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(u):u[C]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Ll:xm,this.isPropagationStopped=xm,this}return I(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Ll)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Ll)},persist:function(){},isPersistent:Ll}),n}var Ga={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ol=Hn(Ga),_o=I({},Ga,{view:0,detail:0}),_S=Hn(_o),Ju,$u,So,Pl=I({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ef,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==So&&(So&&t.type==="mousemove"?(Ju=t.screenX-So.screenX,$u=t.screenY-So.screenY):$u=Ju=0,So=t),Ju)},movementY:function(t){return"movementY"in t?t.movementY:$u}}),_m=Hn(Pl),SS=I({},Pl,{dataTransfer:0}),yS=Hn(SS),MS=I({},_o,{relatedTarget:0}),tf=Hn(MS),bS=I({},Ga,{animationName:0,elapsedTime:0,pseudoElement:0}),ES=Hn(bS),TS=I({},Ga,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),AS=Hn(TS),RS=I({},Ga,{data:0}),Sm=Hn(RS),CS={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},wS={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},DS={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function NS(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=DS[t])?!!n[t]:!1}function ef(){return NS}var US=I({},_o,{key:function(t){if(t.key){var n=CS[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ul(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?wS[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ef,charCode:function(t){return t.type==="keypress"?Ul(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ul(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),LS=Hn(US),OS=I({},Pl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),ym=Hn(OS),PS=I({},Ga,{submitter:0}),IS=Hn(PS),zS=I({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ef}),BS=Hn(zS),FS=I({},Ga,{propertyName:0,elapsedTime:0,pseudoElement:0}),HS=Hn(FS),GS=I({},Pl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),VS=Hn(GS),kS=I({},Ga,{newState:0,oldState:0,source:0}),XS=Hn(kS),WS=[9,13,27,32],nf=pa&&"CompositionEvent"in window,yo=null;pa&&"documentMode"in document&&(yo=document.documentMode);var jS=pa&&"TextEvent"in window&&!yo,Mm=pa&&(!nf||yo&&8<yo&&11>=yo),bm=" ",Em=!1;function Tm(t,n){switch(t){case"keyup":return WS.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Am(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rr=!1;function YS(t,n){switch(t){case"compositionend":return Am(n);case"keypress":return n.which!==32?null:(Em=!0,bm);case"textInput":return t=n.data,t===bm&&Em?null:t;default:return null}}function qS(t,n){if(rr)return t==="compositionend"||!nf&&Tm(t,n)?(t=vm(),Nl=Qu=Ha=null,rr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Mm&&n.locale!=="ko"?null:n.data;default:return null}}var ZS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Rm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!ZS[t.type]:n==="textarea"}function Cm(t,n,a,r){ar?sr?sr.push(r):sr=[r]:ar=r,n=Ic(n,"onChange"),0<n.length&&(a=new Ol("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Mo=null,bo=null;function KS(t){mv(t,0)}function Il(t){var n=jt(t);if(cm(n))return t}function wm(t,n){if(t==="change")return n}var Dm=!1;if(pa){var af;if(pa){var sf="oninput"in document;if(!sf){var Nm=document.createElement("div");Nm.setAttribute("oninput","return;"),sf=typeof Nm.oninput=="function"}af=sf}else af=!1;Dm=af&&(!document.documentMode||9<document.documentMode)}function Um(){Mo&&(Mo.detachEvent("onpropertychange",Lm),bo=Mo=null)}function Lm(t){if(t.propertyName==="value"&&Il(bo)){var n=[];Cm(n,bo,t,qu(t)),gm(KS,n)}}function QS(t,n,a){t==="focusin"?(Um(),Mo=n,bo=a,Mo.attachEvent("onpropertychange",Lm)):t==="focusout"&&Um()}function JS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Il(bo)}function $S(t,n){if(t==="click")return Il(n)}function ty(t,n){if(t==="input"||t==="change")return Il(n)}function ey(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:ey;function Eo(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!yt.call(n,c)||!ai(t[c],n[c]))return!1}return!0}function rf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Om(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Pm(t,n){var a=Om(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Om(a)}}function Im(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Im(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function zm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=rf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=rf(t.document)}return n}function of(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var ny=pa&&"documentMode"in document&&11>=document.documentMode,or=null,lf=null,To=null,cf=!1;function Bm(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;cf||or==null||or!==rf(r)||(r=or,"selectionStart"in r&&of(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),To&&Eo(To,r)||(To=r,r=Ic(lf,"onSelect"),0<r.length&&(n=new Ol("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=or)))}function Es(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var lr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},uf={},Fm={};pa&&(Fm=document.createElement("div").style,"AnimationEvent"in window||(delete lr.animationend.animation,delete lr.animationiteration.animation,delete lr.animationstart.animation),"TransitionEvent"in window||delete lr.transitionend.transition);function Ts(t){if(uf[t])return uf[t];if(!lr[t])return t;var n=lr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Fm)return uf[t]=n[a];return t}var Hm=Ts("animationend"),Gm=Ts("animationiteration"),Vm=Ts("animationstart"),iy=Ts("transitionrun"),ay=Ts("transitionstart"),sy=Ts("transitioncancel"),km=Ts("transitionend"),Xm=new Map,ff="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ff.push("scrollEnd");function Di(t,n){Xm.set(t,n),Ft(n,[t])}var ry=0;function ma(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Oi.identifierPrefix;var a=ry++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Wm(t){if(t==null||typeof t=="string")return t;var n=null,a=Cr;if(a!==null)for(var r=0;r<a.length;r++){var c=t[a[r]];if(c!=null){if(c==="none")return"none";n=n==null?c:n+(" "+c)}}return n??t.default}function ga(t,n){return t=Wm(t),n=Wm(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var zl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},xi=[],cr=0,df=0;function Bl(){for(var t=cr,n=df=cr=0;n<t;){var a=xi[n];xi[n++]=null;var r=xi[n];xi[n++]=null;var c=xi[n];xi[n++]=null;var u=xi[n];if(xi[n++]=null,r!==null&&c!==null){var g=r.pending;g===null?c.next=c:(c.next=g.next,g.next=c),r.pending=c}u!==0&&jm(a,c,u)}}function Fl(t,n,a,r){xi[cr++]=t,xi[cr++]=n,xi[cr++]=a,xi[cr++]=r,df|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function hf(t,n,a,r){return Fl(t,n,a,r),Hl(t)}function As(t,n){return Fl(t,null,null,n),Hl(t)}function jm(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var c=!1,u=t.return;u!==null;)u.childLanes|=a,r=u.alternate,r!==null&&(r.childLanes|=a),u.tag===22&&(t=u.stateNode,t===null||t._visibility&1||(c=!0)),t=u,u=u.return;return t.tag===3?(u=t.stateNode,c&&n!==null&&(c=31-he(a),t=u.hiddenUpdates,r=t[c],r===null?t[c]=[n]:r.push(n),n.lane=a|536870912),u):null}function Hl(t){if(50<Yo)throw Yo=0,wc=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var ur={};function oy(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,n,a,r){return new oy(t,n,a,r)}function pf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function va(t,n){var a=t.alternate;return a===null?(a=Yn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Ym(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Gl(t,n,a,r,c,u){var g=0;if(r=t,typeof r=="function")pf(r)&&(g=1);else if(typeof r=="string")g=PM(t,a,Tt.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case ot:return t=Yn(31,a,n,c),t.elementType=ot,t.lanes=u,t;case G:return Rs(a.children,c,u,n);case Z:g=8,c|=24;break;case J:return t=Yn(12,a,n,c|2),t.elementType=J,t.lanes=u,t;case k:return t=Yn(13,a,n,c),t.elementType=k,t.lanes=u,t;case $:return t=Yn(19,a,n,c),t.elementType=$,t.lanes=u,t;case zt:case se:return t=c|32,t=Yn(30,a,n,t),t.elementType=se,t.lanes=u,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case Y:g=10;break t;case H:g=9;break t;case z:g=11;break t;case j:g=14;break t;case at:g=16,r=null;break t}g=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Yn(g,a,n,c),n.elementType=t,n.type=r,n.lanes=u,n}function Rs(t,n,a,r){return t=Yn(7,t,r,n),t.lanes=a,t}function mf(t,n,a){return t=Yn(6,t,null,n),t.lanes=a,t}function qm(t){var n=Yn(18,null,null,0);return n.stateNode=t,n}function gf(t,n,a){return n=Yn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Zm=new WeakMap;function _i(t,n){if(typeof t=="object"&&t!==null){var a=Zm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:vt(n)},Zm.set(t,n),n)}return{value:t,source:n,stack:vt(n)}}var fr=[],dr=0,Vl=null,Ao=0,Si=[],yi=0,Va=null,ji=1,Yi="";function xa(t,n){fr[dr++]=Ao,fr[dr++]=Vl,Vl=t,Ao=n}function Km(t,n,a){Si[yi++]=ji,Si[yi++]=Yi,Si[yi++]=Va,Va=t;var r=ji;t=Yi;var c=32-he(r)-1;r&=~(1<<c),a+=1;var u=32-he(n)+c;if(30<u){var g=c-c%5;u=(r&(1<<g)-1).toString(32),r>>=g,c-=g,ji=1<<32-he(n)+c|a<<c|r,Yi=u+t}else ji=1<<u|a<<c|r,Yi=t}function kl(t){t.return!==null&&(xa(t,1),Km(t,1,0))}function vf(t){for(;t===Vl;)Vl=fr[--dr],fr[dr]=null,Ao=fr[--dr],fr[dr]=null;for(;t===Va;)Va=Si[--yi],Si[yi]=null,Yi=Si[--yi],Si[yi]=null,ji=Si[--yi],Si[yi]=null}function Qm(t,n){Si[yi++]=ji,Si[yi++]=Yi,Si[yi++]=Va,ji=n.id,Yi=n.overflow,Va=t}var En=null,tn=null,Te=!1,ka=null,Mi=!1,xf=Error(s(519));function Xa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ro(_i(n,t)),xf}function Jm(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[A]=t,n[X]=r,a){case"dialog":we("cancel",n),we("close",n);break;case"iframe":case"object":case"embed":we("load",n);break;case"video":case"audio":for(a=0;a<Zo.length;a++)we(Zo[a],n);break;case"source":we("error",n);break;case"img":case"image":case"link":we("error",n),we("load",n);break;case"details":we("toggle",n);break;case"input":we("invalid",n),um(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":we("invalid",n);break;case"textarea":we("invalid",n),dm(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||_v(n.textContent,a)?(r.popover!=null&&(we("beforetoggle",n),we("toggle",n)),r.onScroll!=null&&we("scroll",n),r.onScrollEnd!=null&&we("scrollend",n),r.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||Xa(t,!0)}function Xl(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:En=En.return}}function hr(t){if(t!==En)return!1;if(!Te)return Xl(t),Te=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||qd(t.type,t.memoizedProps)),a=!a),a&&tn&&Xa(t),Xl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));tn=Bv(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));tn=Bv(t)}else n===27?(n=tn,rs(t.type)?(t=ih,ih=null,tn=t):tn=n):tn=En?Ei(t.stateNode.nextSibling):null;return!0}function Cs(){tn=En=null,Te=!1}function _f(){var t=ka;return t!==null&&(Kn===null?Kn=t:Kn.push.apply(Kn,t),ka=null),t}function Ro(t){ka===null?ka=[t]:ka.push(t)}var Sf=ve(null),ws=null,_a=null;function Wa(t,n,a){et(Sf,n._currentValue),n._currentValue=a}function Sa(t){t._currentValue=Sf.current,ee(Sf)}function Wl(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function yf(t,n,a,r){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var u=c.dependencies;if(u!==null){var g=c.child;u=u.firstContext;t:for(;u!==null;){var C=u;u=c;for(var F=0;F<n.length;F++)if(C.context===n[F]){u.lanes|=a,C=u.alternate,C!==null&&(C.lanes|=a),Wl(u.return,a,t),r||(g=null);break t}u=C.next}}else if(c.tag===18){if(g=c.return,g===null)throw Error(s(341));g.lanes|=a,u=g.alternate,u!==null&&(u.lanes|=a),Wl(g,a,t),g=null}else c.tag===13&&c.memoizedState!==null&&c.memoizedState.dehydrated===null?(c.lanes|=a,g=c.alternate,g!==null&&(g.lanes|=a),Wl(c.return,a,t),g=c.child,g=g!==null?g.sibling:null):g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===t){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}}function Ds(t,n,a,r){t=null;for(var c=n,u=!1;c!==null;){if(!u){if((c.flags&524288)!==0)u=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var g=c.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var C=c.type;ai(c.pendingProps.value,g.value)||(t!==null?t.push(C):t=[C])}}else if(c===xe.current){if(g=c.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(Br):t=[Br])}c=c.return}return t!==null&&yf(n,t,a,r),n.flags|=262144,t!==null}function jl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ns(t){ws=t,_a=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function Cn(t){return $m(ws,t)}function Yl(t,n){return ws===null&&Ns(t),$m(t,n)}function $m(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},_a===null){if(t===null)throw Error(s(308));_a=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else _a=_a.next=n;return a}var ly=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},cy=o.unstable_scheduleCallback,uy=o.unstable_NormalPriority,hn={$$typeof:Y,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Mf(){return{controller:new ly,data:new Map,refCount:0}}function Co(t){t.refCount--,t.refCount===0&&cy(uy,function(){t.controller.abort()})}function tg(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var wo=null;function fy(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Do=null,bf=0,Us=0,pr=null;function dy(t,n){if(Do===null){var a=Do=[];bf=0,Us=Fd(),pr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return bf++,n.then(eg,eg),n}function eg(){if(--bf===0&&(wo=null,Do!==null)){pr!==null&&(pr.status="fulfilled");var t=Do;Do=null,Us=0,pr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function hy(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var ng=Mt.S;Mt.S=function(t,n){if(q0=Xt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&dy(t,n),wo!==null)for(var a=Ur;a!==null;)tg(a,wo),a=a.next;if(a=t.types,a!==null){for(var r=Ur;r!==null;)tg(r,a),r=r.next;if(Us!==0){r=wo,r===null&&(r=wo=[]);for(var c=0;c<a.length;c++){var u=a[c];r.indexOf(u)===-1&&r.push(u)}}}ng!==null&&ng(t,n)};var Ls=ve(null);function Ef(){var t=Ls.current;return t!==null?t:Je.pooledCache}function ql(t,n){n===null?et(Ls,Ls.current):et(Ls,n.pool)}function ig(){var t=Ef();return t===null?null:{parent:hn._currentValue,pool:t}}var mr=Error(s(460)),Tf=Error(s(474)),Zl=Error(s(542)),Kl={then:function(){}};function ag(t){return t=t.status,t==="fulfilled"||t==="rejected"}function sg(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Wi,Wi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,og(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(t=Je,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,og(t),t}throw Ps=n,mr}}function Os(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ps=a,mr):a}}var Ps=null;function rg(){if(Ps===null)throw Error(s(459));var t=Ps;return Ps=null,t}function og(t){if(t===mr||t===Zl)throw Error(s(483))}var gr=null,No=0;function Ql(t){var n=No;return No+=1,gr===null&&(gr=[]),sg(gr,t,n)}function ja(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Jl(t,n){throw n.$$typeof===T?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function lg(t){function n(tt,W){if(t){var rt=tt.deletions;rt===null?(tt.deletions=[W],tt.flags|=16):rt.push(W)}}function a(tt,W){if(!t)return null;for(;W!==null;)n(tt,W),W=W.sibling;return null}function r(tt){for(var W=new Map;tt!==null;)tt.key===null?W.set(tt.index,tt):W.set(tt.key,tt),tt=tt.sibling;return W}function c(tt,W){return tt=va(tt,W),tt.index=0,tt.sibling=null,tt}function u(tt,W,rt){return tt.index=rt,t?(rt=tt.alternate,rt!==null?(rt=rt.index,rt<W?(tt.flags|=2,W):rt):(tt.flags|=134217730,W)):(tt.flags|=1048576,W)}function g(tt){return t&&tt.alternate===null&&(tt.flags|=134217730),tt}function C(tt,W,rt,xt){return W===null||W.tag!==6?(W=mf(rt,tt.mode,xt),W.return=tt,W):(W=c(W,rt),W.return=tt,W)}function F(tt,W,rt,xt){var Yt=rt.type;return Yt===G?(tt=dt(tt,W,rt.props.children,xt,rt.key),ja(tt,rt),tt):W!==null&&(W.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===at&&Os(Yt)===W.type)?(W=c(W,rt.props),ja(W,rt),W.return=tt,W):(W=Gl(rt.type,rt.key,rt.props,null,tt.mode,xt),ja(W,rt),W.return=tt,W)}function nt(tt,W,rt,xt){return W===null||W.tag!==4||W.stateNode.containerInfo!==rt.containerInfo||W.stateNode.implementation!==rt.implementation?(W=gf(rt,tt.mode,xt),W.return=tt,W):(W=c(W,rt.children||[]),W.return=tt,W)}function dt(tt,W,rt,xt,Yt){return W===null||W.tag!==7?(W=Rs(rt,tt.mode,xt,Yt),W.return=tt,W):(W=c(W,rt),W.return=tt,W)}function _t(tt,W,rt){if(typeof W=="string"&&W!==""||typeof W=="number"||typeof W=="bigint")return W=mf(""+W,tt.mode,rt),W.return=tt,W;if(typeof W=="object"&&W!==null){switch(W.$$typeof){case P:return rt=Gl(W.type,W.key,W.props,null,tt.mode,rt),ja(rt,W),rt.return=tt,rt;case L:return W=gf(W,tt.mode,rt),W.return=tt,W;case at:return W=Os(W),_t(tt,W,rt)}if($t(W)||pt(W))return W=Rs(W,tt.mode,rt,null),W.return=tt,W;if(typeof W.then=="function")return _t(tt,Ql(W),rt);if(W.$$typeof===Y)return _t(tt,Yl(tt,W),rt);Jl(tt,W)}return null}function Q(tt,W,rt,xt){var Yt=W!==null?W.key:null;if(typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint")return Yt!==null?null:C(tt,W,""+rt,xt);if(typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case P:return rt.key===Yt?F(tt,W,rt,xt):null;case L:return rt.key===Yt?nt(tt,W,rt,xt):null;case at:return rt=Os(rt),Q(tt,W,rt,xt)}if($t(rt)||pt(rt))return Yt!==null?null:dt(tt,W,rt,xt,null);if(typeof rt.then=="function")return Q(tt,W,Ql(rt),xt);if(rt.$$typeof===Y)return Q(tt,W,Yl(tt,rt),xt);Jl(tt,rt)}return null}function ut(tt,W,rt,xt,Yt){if(typeof xt=="string"&&xt!==""||typeof xt=="number"||typeof xt=="bigint")return tt=tt.get(rt)||null,C(W,tt,""+xt,Yt);if(typeof xt=="object"&&xt!==null){switch(xt.$$typeof){case P:return tt=tt.get(xt.key===null?rt:xt.key)||null,F(W,tt,xt,Yt);case L:return tt=tt.get(xt.key===null?rt:xt.key)||null,nt(W,tt,xt,Yt);case at:return xt=Os(xt),ut(tt,W,rt,xt,Yt)}if($t(xt)||pt(xt))return tt=tt.get(rt)||null,dt(W,tt,xt,Yt,null);if(typeof xt.then=="function")return ut(tt,W,rt,Ql(xt),Yt);if(xt.$$typeof===Y)return ut(tt,W,rt,Yl(W,xt),Yt);Jl(W,xt)}return null}function Lt(tt,W,rt,xt){for(var Yt=null,Le=null,ne=W,re=W=0,gn=null;ne!==null&&re<rt.length;re++){ne.index>re?(gn=ne,ne=null):gn=ne.sibling;var Be=Q(tt,ne,rt[re],xt);if(Be===null){ne===null&&(ne=gn);break}t&&ne&&Be.alternate===null&&n(tt,ne),W=u(Be,W,re),Le===null?Yt=Be:Le.sibling=Be,Le=Be,ne=gn}if(re===rt.length)return a(tt,ne),Te&&xa(tt,re),Yt;if(ne===null){for(;re<rt.length;re++)ne=_t(tt,rt[re],xt),ne!==null&&(W=u(ne,W,re),Le===null?Yt=ne:Le.sibling=ne,Le=ne);return Te&&xa(tt,re),Yt}for(ne=r(ne);re<rt.length;re++)gn=ut(ne,tt,re,rt[re],xt),gn!==null&&(t&&(Be=gn.alternate,Be!==null&&ne.delete(Be.key===null?re:Be.key)),W=u(gn,W,re),Le===null?Yt=gn:Le.sibling=gn,Le=gn);return t&&ne.forEach(function(fs){return n(tt,fs)}),Te&&xa(tt,re),Yt}function Kt(tt,W,rt,xt){if(rt==null)throw Error(s(151));for(var Yt=null,Le=null,ne=W,re=W=0,gn=null,Be=rt.next();ne!==null&&!Be.done;re++,Be=rt.next()){ne.index>re?(gn=ne,ne=null):gn=ne.sibling;var fs=Q(tt,ne,Be.value,xt);if(fs===null){ne===null&&(ne=gn);break}t&&ne&&fs.alternate===null&&n(tt,ne),W=u(fs,W,re),Le===null?Yt=fs:Le.sibling=fs,Le=fs,ne=gn}if(Be.done)return a(tt,ne),Te&&xa(tt,re),Yt;if(ne===null){for(;!Be.done;re++,Be=rt.next())Be=_t(tt,Be.value,xt),Be!==null&&(W=u(Be,W,re),Le===null?Yt=Be:Le.sibling=Be,Le=Be);return Te&&xa(tt,re),Yt}for(ne=r(ne);!Be.done;re++,Be=rt.next())Be=ut(ne,tt,re,Be.value,xt),Be!==null&&(t&&(gn=Be.alternate,gn!==null&&ne.delete(gn.key===null?re:gn.key)),W=u(Be,W,re),Le===null?Yt=Be:Le.sibling=Be,Le=Be);return t&&ne.forEach(function(YM){return n(tt,YM)}),Te&&xa(tt,re),Yt}function ye(tt,W,rt,xt){if(typeof rt=="object"&&rt!==null&&rt.type===G&&rt.key===null&&rt.props.ref===void 0&&(rt=rt.props.children),typeof rt=="object"&&rt!==null){switch(rt.$$typeof){case P:t:{for(var Yt=rt.key;W!==null;){if(W.key===Yt){if(Yt=rt.type,Yt===G){if(W.tag===7){a(tt,W.sibling),xt=c(W,rt.props.children),ja(xt,rt),xt.return=tt,tt=xt;break t}}else if(W.elementType===Yt||typeof Yt=="object"&&Yt!==null&&Yt.$$typeof===at&&Os(Yt)===W.type){a(tt,W.sibling),xt=c(W,rt.props),ja(xt,rt),xt.return=tt,tt=xt;break t}a(tt,W);break}else n(tt,W);W=W.sibling}rt.type===G?(xt=Rs(rt.props.children,tt.mode,xt,rt.key),ja(xt,rt),xt.return=tt,tt=xt):(xt=Gl(rt.type,rt.key,rt.props,null,tt.mode,xt),ja(xt,rt),xt.return=tt,tt=xt)}return g(tt);case L:t:{for(Yt=rt.key;W!==null;){if(W.key===Yt)if(W.tag===4&&W.stateNode.containerInfo===rt.containerInfo&&W.stateNode.implementation===rt.implementation){a(tt,W.sibling),xt=c(W,rt.children||[]),xt.return=tt,tt=xt;break t}else{a(tt,W);break}else n(tt,W);W=W.sibling}xt=gf(rt,tt.mode,xt),xt.return=tt,tt=xt}return g(tt);case at:return rt=Os(rt),ye(tt,W,rt,xt)}if($t(rt))return Lt(tt,W,rt,xt);if(pt(rt)){if(Yt=pt(rt),typeof Yt!="function")throw Error(s(150));return rt=Yt.call(rt),Kt(tt,W,rt,xt)}if(typeof rt.then=="function")return ye(tt,W,Ql(rt),xt);if(rt.$$typeof===Y)return ye(tt,W,Yl(tt,rt),xt);Jl(tt,rt)}return typeof rt=="string"&&rt!==""||typeof rt=="number"||typeof rt=="bigint"?(rt=""+rt,W!==null&&W.tag===6?(a(tt,W.sibling),xt=c(W,rt),xt.return=tt,tt=xt):(a(tt,W),xt=mf(rt,tt.mode,xt),xt.return=tt,tt=xt),g(tt)):a(tt,W)}return function(tt,W,rt,xt){try{No=0;var Yt=ye(tt,W,rt,xt);return gr=null,Yt}catch(ne){if(ne===mr||ne===Zl)throw ne;var Le=Yn(29,ne,null,tt.mode);return Le.lanes=xt,Le.return=tt,Le}finally{}}}var Is=lg(!0),cg=lg(!1),Ya=!1;function Af(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Rf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function qa(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Za(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Ve&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=Hl(t),jm(t,null,a),n}return Fl(t,r,n,a),Hl(t)}function Uo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}function Cf(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?c=u=g:u=u.next=g,a=a.next}while(a!==null);u===null?c=u=n:u=u.next=n}else c=u=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var wf=!1;function Lo(){if(wf){var t=pr;if(t!==null)throw t}}function Oo(t,n,a,r){wf=!1;var c=t.updateQueue;Ya=!1;var u=c.firstBaseUpdate,g=c.lastBaseUpdate,C=c.shared.pending;if(C!==null){c.shared.pending=null;var F=C,nt=F.next;F.next=null,g===null?u=nt:g.next=nt,g=F;var dt=t.alternate;dt!==null&&(dt=dt.updateQueue,C=dt.lastBaseUpdate,C!==g&&(C===null?dt.firstBaseUpdate=nt:C.next=nt,dt.lastBaseUpdate=F))}if(u!==null){var _t=c.baseState;g=0,dt=nt=F=null,C=u;do{var Q=C.lane&-536870913,ut=Q!==C.lane;if(ut?(Ue&Q)===Q:(r&Q)===Q){Q!==0&&Q===Us&&(wf=!0),dt!==null&&(dt=dt.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var Lt=t,Kt=C;Q=n;var ye=a;switch(Kt.tag){case 1:if(Lt=Kt.payload,typeof Lt=="function"){_t=Lt.call(ye,_t,Q);break t}_t=Lt;break t;case 3:Lt.flags=Lt.flags&-65537|128;case 0:if(Lt=Kt.payload,Q=typeof Lt=="function"?Lt.call(ye,_t,Q):Lt,Q==null)break t;_t=I({},_t,Q);break t;case 2:Ya=!0}}Q=C.callback,Q!==null&&(t.flags|=64,ut&&(t.flags|=8192),ut=c.callbacks,ut===null?c.callbacks=[Q]:ut.push(Q))}else ut={lane:Q,tag:C.tag,payload:C.payload,callback:C.callback,next:null},dt===null?(nt=dt=ut,F=_t):dt=dt.next=ut,g|=Q;if(C=C.next,C===null){if(C=c.shared.pending,C===null)break;ut=C,C=ut.next,ut.next=null,c.lastBaseUpdate=ut,c.shared.pending=null}}while(!0);dt===null&&(F=_t),c.baseState=F,c.firstBaseUpdate=nt,c.lastBaseUpdate=dt,u===null&&(c.shared.lanes=0),ns|=g,t.lanes=g,t.memoizedState=_t}}function ug(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function fg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)ug(a[t],n)}var Ka=ve(null),$l=ve(0);function dg(t,n){t=Ta,et($l,t),et(Ka,n),Ta=t|n.baseLanes}function Df(){et($l,Ta),et(Ka,Ka.current)}function Nf(){Ta=$l.current,ee(Ka),ee($l)}var wn=ve(null),Pn=null;function Qa(t){var n=t.alternate;et(Dn,Dn.current&1),et(wn,t),Pn===null&&(n===null||Ka.current!==null||n.memoizedState!==null)&&(Pn=t)}function Uf(t){et(Dn,Dn.current),et(wn,t),Pn===null&&(Pn=t)}function hg(t){t.tag===22?(et(Dn,Dn.current),et(wn,t),Pn===null&&(Pn=t)):Ja()}function Ja(){et(Dn,Dn.current),et(wn,wn.current)}function si(t){ee(wn),Pn===t&&(Pn=null),ee(Dn)}var Dn=ve(0);function Po(t,n){et(wn,wn.current),et(Dn,n)}function Lf(t){ee(Dn),ee(wn),Pn===t&&(Pn=null)}function tc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||eh(a)||nh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ya=0,Se=null,Qe=null,pn=null,ec=!1,vr=!1,zs=!1,nc=0,Io=0,xr=null,py=0;function un(){throw Error(s(321))}function Of(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function Pf(t,n,a,r,c,u){return ya=u,Se=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,Mt.H=t===null||t.memoizedState===null?Kg:Qg,zs=!1,u=a(r,c),zs=!1,vr&&(u=mg(n,a,r,c)),pg(t),u}function pg(t){Mt.H=cc;var n=Qe!==null&&Qe.next!==null;if(ya=0,pn=Qe=Se=null,ec=!1,Io=0,xr=null,n)throw Error(s(300));t===null||mn||(t=t.dependencies,t!==null&&jl(t)&&(mn=!0))}function mg(t,n,a,r){Se=t;var c=0;do{if(vr&&(xr=null),Io=0,vr=!1,25<=c)throw Error(s(301));if(c+=1,pn=Qe=null,t.updateQueue!=null){var u=t.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}Mt.H=My,u=n(a,r)}while(vr);return u}function my(){var t=Mt.H,n=t.useState()[0];return n=typeof n.then=="function"?zo(n):n,t=t.useState()[0],(Qe!==null?Qe.memoizedState:null)!==t&&(Se.flags|=1024),n}function If(){var t=nc!==0;return nc=0,t}function zf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Bf(t){if(ec){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ec=!1}ya=0,pn=Qe=Se=null,vr=!1,Io=nc=0,xr=null}function Gn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?Se.memoizedState=pn=t:pn=pn.next=t,pn}function dn(){if(Qe===null){var t=Se.alternate;t=t!==null?t.memoizedState:null}else t=Qe.next;var n=pn===null?Se.memoizedState:pn.next;if(n!==null)pn=n,Qe=t;else{if(t===null)throw Se.alternate===null?Error(s(467)):Error(s(310));Qe=t,t={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},pn===null?Se.memoizedState=pn=t:pn=pn.next=t}return pn}function ic(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function zo(t){var n=Io;return Io+=1,xr===null&&(xr=[]),t=sg(xr,t,n),n=Se,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,Mt.H=n===null||n.memoizedState===null?Kg:Qg),t}function ac(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return zo(t);if(t.$$typeof===ie)return;if(t.$$typeof===Y)return Cn(t)}throw Error(s(438,String(t)))}function Ff(t){var n=null,a=Se.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=Se.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ic(),Se.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=wt;return n.index++,a}function Ma(t,n){return typeof n=="function"?n(t):n}function sc(t){var n=dn();return Hf(n,Qe,t)}function Hf(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=t.baseQueue,u=r.pending;if(u!==null){if(c!==null){var g=c.next;c.next=u.next,u.next=g}n.baseQueue=c=u,r.pending=null}if(u=t.baseState,c===null)t.memoizedState=u;else{n=c.next;var C=g=null,F=null,nt=n,dt=!1;do{var _t=nt.lane&-536870913;if(_t!==nt.lane?(Ue&_t)===_t:(ya&_t)===_t){var Q=nt.revertLane;if(Q===0)F!==null&&(F=F.next={lane:0,revertLane:0,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null}),_t===Us&&(dt=!0);else if((ya&Q)===Q){nt=nt.next,Q===Us&&(dt=!0);continue}else _t={lane:0,revertLane:nt.revertLane,gesture:null,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},F===null?(C=F=_t,g=u):F=F.next=_t,Se.lanes|=Q,ns|=Q;_t=nt.action,zs&&a(u,_t),u=nt.hasEagerState?nt.eagerState:a(u,_t)}else Q={lane:_t,revertLane:nt.revertLane,gesture:nt.gesture,action:nt.action,hasEagerState:nt.hasEagerState,eagerState:nt.eagerState,next:null},F===null?(C=F=Q,g=u):F=F.next=Q,Se.lanes|=_t,ns|=_t;nt=nt.next}while(nt!==null&&nt!==n);if(F===null?g=u:F.next=C,!ai(u,t.memoizedState)&&(mn=!0,dt&&(a=pr,a!==null)))throw a;t.memoizedState=u,t.baseState=g,t.baseQueue=F,r.lastRenderedState=u}return c===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function Gf(t){var n=dn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,c=a.pending,u=n.memoizedState;if(c!==null){a.pending=null;var g=c=c.next;do u=t(u,g.action),g=g.next;while(g!==c);ai(u,n.memoizedState)||(mn=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),a.lastRenderedState=u}return[u,r]}function gg(t,n,a){var r=Se,c=dn(),u=Te;if(u){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!ai((Qe||c).memoizedState,a);if(g&&(c.memoizedState=a,mn=!0),c=c.queue,Xf(_g.bind(null,r,c,t),[t]),t=c.getSnapshot!==n||g||pn!==null&&(pn.memoizedState.tag&1)!==0,_r(t?9:8,{destroy:void 0},xg.bind(null,r,c,a,n),null),t){if(r.flags|=2048,Je===null)throw Error(s(349));u||(ya&127)!==0||vg(r,n,a)}return a}function vg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Se.updateQueue,n===null?(n=ic(),Se.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function xg(t,n,a,r){n.value=a,n.getSnapshot=r,Sg(n)&&yg(t)}function _g(t,n,a){return a(function(){Sg(n)&&yg(t)})}function Sg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function yg(t){var n=As(t,2);n!==null&&Qn(n,t,2)}function Vf(t){var n=Gn();if(typeof t=="function"){var a=t;if(t=a(),zs){Oe(!0);try{a()}finally{Oe(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:t},n}function Mg(t,n,a,r){return t.baseState=a,Hf(t,Qe,typeof r=="function"?r:Ma)}function gy(t,n,a,r,c){if(lc(t))throw Error(s(485));if(t=n.action,t!==null){var u={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){u.listeners.push(g)}};Mt.T!==null?a(!0):u.isTransition=!1,r(u),a=n.pending,a===null?(u.next=n.pending=u,bg(n,u)):(u.next=a.next,n.pending=a.next=u)}}function bg(t,n){var a=n.action,r=n.payload,c=t.state;if(n.isTransition){var u=Mt.T,g={};g.types=u!==null?u.types:null,Mt.T=g;try{var C=a(c,r),F=Mt.S;F!==null&&F(g,C),Eg(t,n,C)}catch(nt){kf(t,n,nt)}finally{u!==null&&g.types!==null&&(u.types=g.types),Mt.T=u}}else try{u=a(c,r),Eg(t,n,u)}catch(nt){kf(t,n,nt)}}function Eg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Tg(t,n,r)},function(r){return kf(t,n,r)}):Tg(t,n,a)}function Tg(t,n,a){n.status="fulfilled",n.value=a,Ag(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,bg(t,a)))}function kf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,Ag(n),n=n.next;while(n!==r)}t.action=null}function Ag(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Rg(t,n){return n}function Cg(t,n){if(Te){var a=Je.formState;if(a!==null){t:{var r=Se;if(Te){if(tn){e:{for(var c=tn,u=Mi;c.nodeType!==8;){if(!u){c=null;break e}if(c=Ei(c.nextSibling),c===null){c=null;break e}}u=c.data,c=u==="F!"||u==="F"?c:null}if(c){tn=Ei(c.nextSibling),r=c.data==="F!";break t}}Xa(r)}r=!1}r&&(n=a[0])}}return a=Gn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Rg,lastRenderedState:n},a.queue=r,a=Yg.bind(null,Se,r),r.dispatch=a,r=Vf(!1),u=Zf.bind(null,Se,!1,r.queue),r=Gn(),c={state:n,dispatch:null,action:t,pending:null},r.queue=c,a=gy.bind(null,Se,c,u,a),c.dispatch=a,r.memoizedState=t,[n,a,!1]}function wg(t){var n=dn();return Dg(n,Qe,t)}function Dg(t,n,a){if(n=Hf(t,n,Rg)[0],t=sc(Ma)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=zo(n)}catch(g){throw g===mr?Zl:g}else r=n;n=dn();var c=n.queue,u=c.dispatch;return a!==n.memoizedState&&(Se.flags|=2048,_r(9,{destroy:void 0},vy.bind(null,c,a),null)),[r,u,t]}function vy(t,n){t.action=n}function Ng(t){var n=dn(),a=Qe;if(a!==null)return Dg(n,a,t);dn(),n=n.memoizedState,a=dn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function _r(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=Se.updateQueue,n===null&&(n=ic(),Se.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function Ug(){return dn().memoizedState}function rc(t,n,a,r){var c=Gn();Se.flags|=t,c.memoizedState=_r(1|n,{destroy:void 0},a,r===void 0?null:r)}function oc(t,n,a,r){var c=dn();r=r===void 0?null:r;var u=c.memoizedState.inst;Qe!==null&&r!==null&&Of(r,Qe.memoizedState.deps)?c.memoizedState=_r(n,u,a,r):(Se.flags|=t,c.memoizedState=_r(1|n,u,a,r))}function Lg(t,n){rc(8390656,8,t,n)}function Xf(t,n){oc(2048,8,t,n)}function xy(t){Se.flags|=4;var n=Se.updateQueue;if(n===null)n=ic(),Se.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Og(t){var n=dn().memoizedState;return xy({ref:n,nextImpl:t}),function(){if((Ve&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Pg(t,n){return oc(4,2,t,n)}function Ig(t,n){return oc(4,4,t,n)}function zg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Bg(t,n,a){a=a!=null?a.concat([t]):null,oc(4,4,zg.bind(null,n,t),a)}function Wf(){}function Fg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Of(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function Hg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Of(n,r[1]))return r[0];if(r=t(),zs){Oe(!0);try{t()}finally{Oe(!1)}}return a.memoizedState=[r,n],r}function jf(t,n,a){return a===void 0||(ya&1073741824)!==0&&(Ue&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=K0(),Se.lanes|=t,ns|=t,a)}function Gg(t,n,a,r){return ai(a,n)?a:Ka.current!==null?(t=jf(t,a,r),ai(t,n)||(mn=!0),t):(ya&106)===0||(ya&1073741824)!==0&&(Ue&261930)===0?(mn=!0,t.memoizedState=a):(t=K0(),Se.lanes|=t,ns|=t,n)}function Vg(t,n,a,r,c){var u=Gt.p;Gt.p=u!==0&&8>u?u:8;var g=Mt.T,C={};C.types=g!==null?g.types:null,Mt.T=C,Zf(t,!1,n,a);try{var F=c(),nt=Mt.S;if(nt!==null&&nt(C,F),F!==null&&typeof F=="object"&&typeof F.then=="function"){var dt=hy(F,r);Bo(t,n,dt,ci(t))}else Bo(t,n,r,ci(t))}catch(_t){Bo(t,n,{then:function(){},status:"rejected",reason:_t},ci())}finally{Gt.p=u,g!==null&&C.types!==null&&(g.types=C.types),Mt.T=g}}function _y(){}function Yf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var c=kg(t).queue;Vg(t,c,n,ze,a===null?_y:function(){return Xg(t),a(r)})}function kg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:ze,baseState:ze,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:ze},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ma,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Xg(t){var n=kg(t);n.next===null&&(n=t.alternate.memoizedState),Bo(t,n.next.queue,{},ci())}function qf(){return Cn(Br)}function Wg(){return dn().memoizedState}function jg(){return dn().memoizedState}function Sy(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ci();t=qa(a);var r=Za(n,t,a);r!==null&&(Qn(r,n,a),Uo(r,n,a)),n={cache:Mf()},t.payload=n;return}n=n.return}}function yy(t,n,a){var r=ci();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},lc(t)?qg(n,a):(a=hf(t,n,a,r),a!==null&&(Qn(a,t,r),Zg(a,n,r)))}function Yg(t,n,a){var r=ci();Bo(t,n,a,r)}function Bo(t,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(lc(t))qg(n,c);else{var u=t.alternate;if(t.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var g=n.lastRenderedState,C=u(g,a);if(c.hasEagerState=!0,c.eagerState=C,ai(C,g))return Fl(t,n,c,0),Je===null&&Bl(),!1}catch{}finally{}if(a=hf(t,n,c,r),a!==null)return Qn(a,t,r),Zg(a,n,r),!0}return!1}function Zf(t,n,a,r){if(r={lane:2,revertLane:Fd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(t)){if(n)throw Error(s(479))}else n=hf(t,a,r,2),n!==null&&Qn(n,t,2)}function lc(t){var n=t.alternate;return t===Se||n!==null&&n===Se}function qg(t,n){vr=ec=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Zg(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}var cc={readContext:Cn,use:ac,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un,useEffectEvent:un},Kg={readContext:Cn,use:ac,useCallback:function(t,n){return Gn().memoizedState=[t,n===void 0?null:n],t},useContext:Cn,useEffect:Lg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,rc(4194308,4,zg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return rc(4194308,4,t,n)},useInsertionEffect:function(t,n){rc(4,2,t,n)},useMemo:function(t,n){var a=Gn();n=n===void 0?null:n;var r=t();if(zs){Oe(!0);try{t()}finally{Oe(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Gn();if(a!==void 0){var c=a(n);if(zs){Oe(!0);try{a(n)}finally{Oe(!1)}}}else c=n;return r.memoizedState=r.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},r.queue=t,t=t.dispatch=yy.bind(null,Se,t),[r.memoizedState,t]},useRef:function(t){var n=Gn();return t={current:t},n.memoizedState=t},useState:function(t){t=Vf(t);var n=t.queue,a=Yg.bind(null,Se,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Wf,useDeferredValue:function(t,n){var a=Gn();return jf(a,t,n)},useTransition:function(){var t=Vf(!1);return t=Vg.bind(null,Se,t.queue,!0,!1),Gn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=Se,c=Gn();if(Te){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Je===null)throw Error(s(349));(Ue&127)!==0||vg(r,n,a)}c.memoizedState=a;var u={value:a,getSnapshot:n};return c.queue=u,Lg(_g.bind(null,r,u,t),[t]),r.flags|=2048,_r(9,{destroy:void 0},xg.bind(null,r,u,a,n),null),a},useId:function(){var t=Gn(),n=Je.identifierPrefix;if(Te){var a=Yi,r=ji;a=(r&~(1<<32-he(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=nc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=py++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:qf,useFormState:Cg,useActionState:Cg,useOptimistic:function(t){var n=Gn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Zf.bind(null,Se,!0,a),a.dispatch=n,[t,n]},useMemoCache:Ff,useCacheRefresh:function(){return Gn().memoizedState=Sy.bind(null,Se)},useEffectEvent:function(t){var n=Gn(),a={impl:t};return n.memoizedState=a,function(){if((Ve&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Qg={readContext:Cn,use:ac,useCallback:Fg,useContext:Cn,useEffect:Xf,useImperativeHandle:Bg,useInsertionEffect:Pg,useLayoutEffect:Ig,useMemo:Hg,useReducer:sc,useRef:Ug,useState:function(){return sc(Ma)},useDebugValue:Wf,useDeferredValue:function(t,n){var a=dn();return Gg(a,Qe.memoizedState,t,n)},useTransition:function(){var t=sc(Ma)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:gg,useId:Wg,useHostTransitionStatus:qf,useFormState:wg,useActionState:wg,useOptimistic:function(t,n){var a=dn();return Mg(a,Qe,t,n)},useMemoCache:Ff,useCacheRefresh:jg,useEffectEvent:Og},My={readContext:Cn,use:ac,useCallback:Fg,useContext:Cn,useEffect:Xf,useImperativeHandle:Bg,useInsertionEffect:Pg,useLayoutEffect:Ig,useMemo:Hg,useReducer:Gf,useRef:Ug,useState:function(){return Gf(Ma)},useDebugValue:Wf,useDeferredValue:function(t,n){var a=dn();return Qe===null?jf(a,t,n):Gg(a,Qe.memoizedState,t,n)},useTransition:function(){var t=Gf(Ma)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:gg,useId:Wg,useHostTransitionStatus:qf,useFormState:Ng,useActionState:Ng,useOptimistic:function(t,n){var a=dn();return Qe!==null?Mg(a,Qe,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Ff,useCacheRefresh:jg,useEffectEvent:Og};function Kf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:I({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var Qf={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ci(),c=qa(r);c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Qn(n,t,r),Uo(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ci(),c=qa(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Qn(n,t,r),Uo(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ci(),r=qa(a);r.tag=2,n!=null&&(r.callback=n),n=Za(t,r,a),n!==null&&(Qn(n,t,a),Uo(n,t,a))}};function Jg(t,n,a,r,c,u,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,u,g):n.prototype&&n.prototype.isPureReactComponent?!Eo(a,r)||!Eo(c,u):!0}function $g(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&Qf.enqueueReplaceState(n,n.state,null)}function Bs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=I({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function t0(t){zl(t)}function e0(t){console.error(t)}function n0(t){zl(t)}function uc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function i0(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function Jf(t,n,a){return a=qa(a),a.tag=3,a.payload={element:null},a.callback=function(){uc(t,n)},a}function a0(t){return t=qa(t),t.tag=3,t}function s0(t,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var u=r.value;t.payload=function(){return c(u)},t.callback=function(){i0(n,a,r)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){i0(n,a,r),typeof c!="function"&&(is===null?is=new Set([this]):is.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})})}function by(t,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ds(n,a,c,!0),a=wn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Pn===null?Nc():a.alternate===null&&fn===0&&(fn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===Kl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Id(t,r,c)),!1;case 22:return a.flags|=65536,r===Kl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Id(t,r,c)),!1}throw Error(s(435,a.tag))}return Id(t,r,c),Nc(),!1}if(Te)return n=wn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==xf&&(t=Error(s(422),{cause:r}),Ro(_i(t,a)))):(r!==xf&&(n=Error(s(423),{cause:r}),Ro(_i(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,r=_i(r,a),c=Jf(t.stateNode,r,c),Cf(t,c),fn!==4&&(fn=2)),!1;var u=Error(s(520),{cause:r});if(u=_i(u,a),jo===null?jo=[u]:jo.push(u),fn!==4&&(fn=2),n===null)return!0;r=_i(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=Jf(a.stateNode,r,t),Cf(a,t),!1;case 1:if(n=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(is===null||!is.has(u))))return a.flags|=65536,c&=-c,a.lanes|=c,c=a0(c),s0(c,t,a,r),Cf(a,c),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var $f=Error(s(461)),mn=!1;function _n(t,n,a,r){n.child=t===null?cg(n,null,a,r):Is(n,t.child,a,r)}function r0(t,n,a,r,c){a=a.render;var u=n.ref;if("ref"in r){var g={};for(var C in r)C!=="ref"&&(g[C]=r[C])}else g=r;return Ns(n),r=Pf(t,n,a,g,u,c),C=If(),t!==null&&!mn?(zf(t,n,c),ba(t,n,c)):(Te&&C&&kl(n),n.flags|=1,_n(t,n,r,c),n.child)}function o0(t,n,a,r,c){if(t===null){var u=a.type;return typeof u=="function"&&!pf(u)&&u.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=u,l0(t,n,u,r,c)):(t=Gl(a.type,null,r,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(u=t.child,!od(t,c)){var g=u.memoizedProps;if(a=a.compare,a=a!==null?a:Eo,a(g,r)&&t.ref===n.ref)return ba(t,n,c)}return n.flags|=1,t=va(u,r),t.ref=n.ref,t.return=n,n.child=t}function l0(t,n,a,r,c){if(t!==null){var u=t.memoizedProps;if(Eo(u,r)&&t.ref===n.ref)if(mn=!1,n.pendingProps=r=u,od(t,c))(t.flags&131072)!==0&&(mn=!0);else return n.lanes=t.lanes,ba(t,n,c)}return td(t,n,a,r,c)}function c0(t,n,a,r){var c=r.children,u=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,t!==null){for(r=n.child=t.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~u}else r=0,n.child=null;return u0(t,n,u,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&ql(n,u!==null?u.cachePool:null),u!==null?dg(n,u):Df(),hg(n);else return r=n.lanes=536870912,u0(t,n,u!==null?u.baseLanes|a:a,a,r)}else u!==null?(ql(n,u.cachePool),dg(n,u),Ja(),n.memoizedState=null):(t!==null&&ql(n,null),Df(),Ja());return _n(t,n,c,a),n.child}function Fo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function u0(t,n,a,r,c){var u=Ef();return u=u===null?null:{parent:hn._currentValue,pool:u},n.memoizedState={baseLanes:a,cachePool:u},t!==null&&ql(n,null),Df(),hg(n),t!==null&&Ds(t,n,r,!0),n.childLanes=c,null}function fc(t,n){return n=dc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function f0(t,n,a){return Is(n,t.child,null,a),t=fc(n,n.pendingProps),t.flags|=2,si(n),n.memoizedState=null,t}function Ey(t,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Te){if(r.mode==="hidden")return t=fc(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Fo(null,t);if(Uf(n),(t=tn)?(t=zv(t,Mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:ji,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},a=qm(t),a.return=n,n.child=a,En=n,tn=null)):t=null,t===null)throw Xa(n);return n.lanes=536870912,null}return fc(n,r)}var u=t.memoizedState;if(u!==null){var g=u.dehydrated;if(Uf(n),c)if(n.flags&256)n.flags&=-257,n=f0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||Ds(t,n,a,!1),c=(a&t.childLanes)!==0,mn||c){if(Ka.current===null){if(r=Je,r!==null&&(g=po(r,a),g!==0&&g!==u.retryLane))throw u.retryLane=g,As(t,g),Qn(r,t,g),$f;Nc()}n=f0(t,n,a)}else t=u.treeContext,tn=Ei(g.nextSibling),En=n,Te=!0,ka=null,Mi=!1,t!==null&&Qm(n,t),n=fc(n,r),n.flags|=134221824;return n}return t=va(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function td(t,n,a,r,c){return Ns(n),a=Pf(t,n,a,r,void 0,c),r=If(),t!==null&&!mn?(zf(t,n,c),ba(t,n,c)):(Te&&r&&kl(n),n.flags|=1,_n(t,n,a,c),n.child)}function d0(t,n,a,r,c,u){return Ns(n),n.updateQueue=null,a=mg(n,r,a,c),pg(t),r=If(),t!==null&&!mn?(zf(t,n,u),ba(t,n,u)):(Te&&r&&kl(n),n.flags|=1,_n(t,n,a,u),n.child)}function h0(t,n,a,r,c){if(Ns(n),n.stateNode===null){var u=ur,g=a.contextType;typeof g=="object"&&g!==null&&(u=Cn(g)),u=new a(r,u),n.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=Qf,n.stateNode=u,u._reactInternals=n,u=n.stateNode,u.props=r,u.state=n.memoizedState,u.refs={},Af(n),g=a.contextType,u.context=typeof g=="object"&&g!==null?Cn(g):ur,u.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(Kf(n,a,g,r),u.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(g=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),g!==u.state&&Qf.enqueueReplaceState(u,u.state,null),Oo(n,r,u,c),Lo(),u.state=n.memoizedState),typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){u=n.stateNode;var C=n.memoizedProps,F=Bs(a,C);u.props=F;var nt=u.context,dt=a.contextType;g=ur,typeof dt=="object"&&dt!==null&&(g=Cn(dt));var _t=a.getDerivedStateFromProps;dt=typeof _t=="function"||typeof u.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,dt||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(C||nt!==g)&&$g(n,u,r,g),Ya=!1;var Q=n.memoizedState;u.state=Q,Oo(n,r,u,c),Lo(),nt=n.memoizedState,C||Q!==nt||Ya?(typeof _t=="function"&&(Kf(n,a,_t,r),nt=n.memoizedState),(F=Ya||Jg(n,a,F,r,Q,nt,g))?(dt||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(n.flags|=4194308)):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=nt),u.props=r,u.state=nt,u.context=g,r=F):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,Rf(t,n),g=n.memoizedProps,dt=Bs(a,g),u.props=dt,_t=n.pendingProps,Q=u.context,nt=a.contextType,F=ur,typeof nt=="object"&&nt!==null&&(F=Cn(nt)),C=a.getDerivedStateFromProps,(nt=typeof C=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(g!==_t||Q!==F)&&$g(n,u,r,F),Ya=!1,Q=n.memoizedState,u.state=Q,Oo(n,r,u,c),Lo();var ut=n.memoizedState;g!==_t||Q!==ut||Ya||t!==null&&t.dependencies!==null&&jl(t.dependencies)?(typeof C=="function"&&(Kf(n,a,C,r),ut=n.memoizedState),(dt=Ya||Jg(n,a,dt,r,Q,ut,F)||t!==null&&t.dependencies!==null&&jl(t.dependencies))?(nt||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,ut,F),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,ut,F)),typeof u.componentDidUpdate=="function"&&(n.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&Q===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&Q===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=ut),u.props=r,u.state=ut,u.context=F,r=dt):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&Q===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&Q===t.memoizedState||(n.flags|=1024),r=!1)}return u=r,Sr(t,n),r=(n.flags&128)!==0,u||r?(u=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:u.render(),n.flags|=1,t!==null&&r?(n.child=Is(n,t.child,null,c),n.child=Is(n,null,a,c)):_n(t,n,a,c),n.memoizedState=u.state,t=n.child):t=ba(t,n,c),t}function p0(t,n,a,r){return Cs(),n.flags|=256,_n(t,n,a,r),n.child}var ed={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function nd(t){return{baseLanes:t,cachePool:ig()}}function id(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=li),t}function m0(t,n,a){var r=n.pendingProps,c=!1,u=(n.flags&128)!==0,g;if((g=u)||(g=t!==null&&t.memoizedState===null?!1:(Dn.current&2)!==0),g&&(c=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(Te){if(c?Qa(n):Ja(),(t=tn)?(t=zv(t,Mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:ji,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},a=qm(t),a.return=n,n.child=a,En=n,tn=null)):t=null,t===null)throw Xa(n);return nh(t)?n.lanes=32:n.lanes=536870912,null}return u=r.children,r=r.fallback,c?(Ja(),c=n.mode,u=dc({mode:"hidden",children:u},c),r=Rs(r,c,a,null),u.return=n,r.return=n,u.sibling=r,n.child=u,r=n.child,r.memoizedState=nd(a),r.childLanes=id(t,g,a),n.memoizedState=ed,Fo(null,r)):(Qa(n),ad(n,u))}var C=t.memoizedState;if(C!==null){var F=C.dehydrated;if(F!==null)return Ty(t,n,u,g,r,F,C,a)}return c?(Ja(),c=r.fallback,u=n.mode,C=t.child,F=C.sibling,r=va(C,{mode:"hidden",children:r.children}),r.subtreeFlags=C.subtreeFlags&1206910976,F!==null?c=va(F,c):(c=Rs(c,u,a,null),c.flags|=2),c.return=n,r.return=n,r.sibling=c,n.child=r,Fo(null,r),r=n.child,c=t.child.memoizedState,c===null?c=nd(a):(u=c.cachePool,u!==null?(C=hn._currentValue,u=u.parent!==C?{parent:C,pool:C}:u):u=ig(),c={baseLanes:c.baseLanes|a,cachePool:u}),r.memoizedState=c,r.childLanes=id(t,g,a),n.memoizedState=ed,Fo(t.child,r)):(Qa(n),a=t.child,t=a.sibling,a=va(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function ad(t,n){return n=dc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function dc(t,n){return t=Yn(22,t,null,n),t.lanes=0,t}function hc(t,n,a){return Is(n,t.child,null,a),t=ad(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function Ty(t,n,a,r,c,u,g,C){if(a)return n.flags&256?(Qa(n),n.flags&=-257,hc(t,n,C)):n.memoizedState!==null?(Ja(),n.child=t.child,n.flags|=128,null):(Ja(),u=c.fallback,g=n.mode,c=dc({mode:"visible",children:c.children},g),u=Rs(u,g,C,null),u.flags|=2,c.return=n,u.return=n,c.sibling=u,n.child=c,Is(n,t.child,null,C),c=n.child,c.memoizedState=nd(C),c.childLanes=id(t,r,C),n.memoizedState=ed,Fo(null,c));if(Qa(n),nh(u)){if(r=u.nextSibling&&u.nextSibling.dataset,r)var F=r.dgst;return r=F,r!==""&&(c=Error(s(419)),c.stack="",c.digest=r,Ro({value:c,source:null,stack:null})),hc(t,n,C)}if(mn||Ds(t,n,C,!1),r=(C&t.childLanes)!==0,mn||r){if(Ka.current!==null)return hc(t,n,C);if(r=Je,r!==null&&(c=po(r,C),c!==0&&c!==g.retryLane))throw g.retryLane=c,As(t,c),Qn(r,t,c),$f;return eh(u)||Nc(),hc(t,n,C)}return eh(u)?(n.flags|=192,n.child=t.child,null):(t=g.treeContext,tn=Ei(u.nextSibling),En=n,Te=!0,ka=null,Mi=!1,t!==null&&Qm(n,t),n=ad(n,c.children),n.flags|=134221824,n)}function g0(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Wl(t.return,n,a)}function v0(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&tc(a)===null&&(n=t),t=t.sibling}return n}function pc(t,n,a,r,c,u){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:u}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=r,g.tail=a,g.tailMode=c,g.treeForkCount=u)}function sd(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function rd(t,n,a){var r=n.pendingProps,c=r.revealOrder,u=r.tail;r=r.children;var g=Dn.current;if(n.flags&128)return Po(n,g),null;var C=(g&2)!==0;if(C?(g=g&1|2,n.flags|=128):g&=1,Po(n,g),c==="backwards"&&t!==null?(sd(t),_n(t,n,r,a),sd(t)):_n(t,n,r,a),r=Te?Ao:0,!C&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&g0(t,a,n);else if(t.tag===19)g0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"backwards":a=v0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null,sd(n)),pc(n,!0,c,null,u,r);break;case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&tc(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}pc(n,!0,a,null,u,r);break;case"together":pc(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=v0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),pc(n,!1,c,a,u,r)}return n.child}function x0(t,n,a){var r=n.pendingProps;return Wa(n,n.type,r.value),_n(t,n,r.children,a),n.child}function ba(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ds(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=va(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=va(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function od(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&jl(t)))}function Ay(t,n,a){switch(n.tag){case 3:q(n,n.stateNode.containerInfo),Wa(n,hn,t.memoizedState.cache),Cs();break;case 27:case 5:Fe(n);break;case 4:q(n,n.stateNode.containerInfo);break;case 10:Wa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Uf(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return Qa(n),n.flags|=128,null;r=Ds(t,n,a,!1);var c=n.child.childLanes;return r||(a&c)!==0?m0(t,n,a):(Qa(n),t=ba(t,n,a),t!==null?t.sibling:null)}Qa(n);break;case 19:if(n.flags&128)return rd(t,n,a);if(c=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ds(t,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return rd(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Po(n,Dn.current),r)break;return null;case 22:return n.lanes=0,c0(t,n,a,n.pendingProps);case 24:Wa(n,hn,t.memoizedState.cache)}return ba(t,n,a)}function _0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)mn=!0;else{if(!od(t,a)&&(n.flags&128)===0)return mn=!1,Ay(t,n,a);mn=(t.flags&131072)!==0}else mn=!1,Te&&(n.flags&1048576)!==0&&Km(n,Ao,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=Os(n.elementType),n.type=t,typeof t=="function")pf(t)?(r=Bs(t,r),n.tag=1,n=h0(null,n,t,r,a)):(n.tag=0,n=td(null,n,t,r,a));else{if(t!=null){var c=t.$$typeof;if(c===z){n.tag=11,n=r0(null,n,t,r,a);break t}else if(c===j){n.tag=14,n=o0(null,n,t,r,a);break t}else if(c===Y){n.tag=10,n.type=t,n=x0(null,n,a);break t}}throw n=Ot(t)||t,Error(s(306,n,""))}}return n;case 0:return td(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=Bs(r,n.pendingProps),h0(t,n,r,c,a);case 3:t:{if(q(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var u=n.memoizedState;c=u.element,Rf(t,n),Oo(n,r,null,a);var g=n.memoizedState;if(r=g.cache,Wa(n,hn,r),r!==u.cache&&yf(n,[hn],a,!0),Lo(),r=g.element,u.isDehydrated)if(u={element:r,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=p0(t,n,r,a);break t}else if(r!==c){c=_i(Error(s(424)),n),Ro(c),n=p0(t,n,r,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(tn=Ei(t.firstChild),En=n,Te=!0,ka=null,Mi=!0,a=cg(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Cs(),r===c){n=ba(t,n,a);break t}_n(t,n,r,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=Xv(n.type,null,n.pendingProps,null))?n.memoizedState=a:Te||(n.stateNode=bv(n.type,n.pendingProps,_e.current,n)):n.memoizedState=Xv(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return Fe(n),t===null&&Te&&(r=n.stateNode=Hv(n.type,n.pendingProps,_e.current),En=n,Mi=!0,c=tn,rs(n.type)?(ih=c,tn=Ei(r.firstChild)):tn=c),_n(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Te&&((c=r=tn)&&(r=SM(r,n.type,n.pendingProps,Mi),r!==null?(n.stateNode=r,En=n,tn=Ei(r.firstChild),Mi=!1,c=!0):c=!1),c||Xa(n)),Fe(n),c=n.type,u=n.pendingProps,g=t!==null?t.memoizedProps:null,r=u.children,qd(c,u)?r=null:g!==null&&qd(c,g)&&(n.flags|=32),n.memoizedState!==null&&(c=Pf(t,n,my,null,null,a),Br._currentValue=c),Sr(t,n),_n(t,n,r,a),n.child;case 6:return t===null&&Te&&((t=a=tn)&&(a=yM(a,n.pendingProps,Mi),a!==null?(n.stateNode=a,En=n,tn=null,t=!0):t=!1),t||Xa(n)),null;case 13:return m0(t,n,a);case 4:return q(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Is(n,null,r,a):_n(t,n,r,a),n.child;case 11:return r0(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Sr(t,n),_n(t,n,r,a),n.child;case 8:return _n(t,n,n.pendingProps.children,a),n.child;case 12:return _n(t,n,n.pendingProps.children,a),n.child;case 10:return x0(t,n,a);case 9:return c=n.type._context,r=n.pendingProps.children,Ns(n),c=Cn(c),r=r(c),n.flags|=1,_n(t,n,r,a),n.child;case 14:return o0(t,n,n.type,n.pendingProps,a);case 15:return l0(t,n,n.type,n.pendingProps,a);case 19:return rd(t,n,a);case 31:return Ey(t,n,a);case 22:return c0(t,n,a,n.pendingProps);case 24:return Ns(n),r=Cn(hn),t===null?(c=Ef(),c===null&&(c=Je,u=Mf(),c.pooledCache=u,u.refCount++,u!==null&&(c.pooledCacheLanes|=a),c=u),n.memoizedState={parent:r,cache:c},Af(n),Wa(n,hn,c)):((t.lanes&a)!==0&&(Rf(t,n),Oo(n,null,null,a),Lo()),c=t.memoizedState,u=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Wa(n,hn,r)):(r=u.cache,Wa(n,hn,r),r!==c.cache&&yf(n,[hn],a,!0))),_n(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:Te&&kl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Sr(t,n),_n(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ea(t){t.flags|=4}function ld(t,n,a,r,c){var u;if((u=(t.mode&32)!==0)&&(u=a===null?qv(n,r):qv(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),u){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(tv())t.flags|=8192;else throw Ps=Kl,Tf}else t.flags&=-16777217}function S0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Zv(n))if(tv())t.flags|=8192;else throw Ps=Kl,Tf}function mc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?fo():536870912,t.lanes|=n,Tr|=n)}function Ho(t,n){if(!Te)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function en(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&1206910976,r|=c.flags&1206910976,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function Ry(t,n,a){var r=n.pendingProps;switch(vf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return en(n),null;case 1:return en(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Sa(hn),sn(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(hr(n)?Ea(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,_f())),en(n),null;case 26:var c=n.type,u=n.memoizedState;return t===null?(Ea(n),u!==null?(en(n),S0(n,u)):(en(n),ld(n,c,null,r,a))):u?u!==t.memoizedState?(Ea(n),en(n),S0(n,u)):(en(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&Ea(n),en(n),ld(n,c,t,r,a)),null;case 27:if(B(n),a=_e.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ea(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return en(n),n.subtreeFlags&=-33554433,null}t=Tt.current,hr(n)?Jm(n):(t=Hv(c,r,a),n.stateNode=t,Ea(n))}return en(n),n.subtreeFlags&=-33554433,null;case 5:if(B(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ea(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return en(n),n.subtreeFlags&=-33554433,null}if(u=Tt.current,hr(n))Jm(n);else{var g=Qo(_e.current);switch(u){case 1:u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":u=g.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof r.is=="string"?g.createElement("select",{is:r.is}):g.createElement("select"),r.multiple?u.multiple=!0:r.size&&(u.size=r.size);break;default:u=typeof r.is=="string"?g.createElement(c,{is:r.is}):g.createElement(c)}}u[A]=n,u[X]=r;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)u.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=u;t:switch(Un(u,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Ea(n)}}return en(n),n.subtreeFlags&=-33554433,ld(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Ea(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=_e.current,hr(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,c=En,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}t[A]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||_v(t.nodeValue,a)),t||Xa(n,!0)}else t=Qo(t).createTextNode(r),t[A]=n,n.stateNode=t}return en(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=hr(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[A]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;en(n),t=!1}else a=_f(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(si(n),n):(si(n),null);if((n.flags&128)!==0)throw Error(s(558))}return en(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=hr(n),r!==null&&r.dehydrated!==null){if(t===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[A]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;en(n),c=!1}else c=_f(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(si(n),n):(si(n),null)}return si(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),u=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==c&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),mc(n,n.updateQueue),en(n),null);case 4:return sn(),t===null&&kd(n.stateNode.containerInfo),n.flags|=67108864,en(n),null;case 10:return Sa(n.type),en(n),null;case 19:if(Lf(n),r=n.memoizedState,r===null)return en(n),null;if(c=(n.flags&128)!==0,u=r.rendering,u===null)if(c)Ho(r,!1);else{if(fn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(u=tc(t),u!==null){for(n.flags|=128,Ho(r,!1),t=u.updateQueue,n.updateQueue=t,mc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Ym(a,t),a=a.sibling;return Po(n,Dn.current&1|2),Te&&xa(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&Xt()>Rc&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304)}else{if(!c)if(t=tc(u),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,mc(n,t),Ho(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!u.alternate&&!Te)return en(n),null}else 2*Xt()-r.renderingStartTime>Rc&&a!==536870912&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304);r.isBackwards?(u.sibling=n.child,n.child=u):(t=r.last,t!==null?t.sibling=u:n.child=u,r.last=u)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=Xt(),t.sibling=null,u=Dn.current,u=c?u&1|2:u&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||Te?Po(n,u):(a=u,et(wn,n),et(Dn,a),Pn===null&&(Pn=n)),Te&&xa(n,r.treeForkCount),t}return en(n),null;case 22:case 23:return si(n),Nf(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(en(n),n.subtreeFlags&6&&(n.flags|=8192)):en(n),a=n.updateQueue,a!==null&&mc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&ee(Ls),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Sa(hn),en(n),null;case 25:return null;case 30:return n.flags|=33554432,en(n),null}throw Error(s(156,n.tag))}function Cy(t,n){switch(vf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Sa(hn),sn(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return B(n),null;case 31:if(n.memoizedState!==null){if(si(n),n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(si(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Lf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return sn(),null;case 10:return Sa(n.type),null;case 22:case 23:return si(n),Nf(),t!==null&&ee(Ls),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Sa(hn),null;case 25:return null;default:return null}}function y0(t,n){switch(vf(n),n.tag){case 3:Sa(hn),sn();break;case 26:case 27:case 5:B(n);break;case 4:sn();break;case 31:n.memoizedState!==null&&si(n);break;case 13:si(n);break;case 19:Lf(n);break;case 10:Sa(n.type);break;case 22:case 23:si(n),Nf(),t!==null&&ee(Ls);break;case 24:Sa(hn)}}function Go(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&t)===t){r=void 0;var u=a.create,g=a.inst;r=u(),g.destroy=r}a=a.next}while(a!==c)}}catch(C){je(n,n.return,C)}}function $a(t,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var u=c.next;r=u;do{if((r.tag&t)===t){var g=r.inst,C=g.destroy;if(C!==void 0){g.destroy=void 0,c=n;var F=a,nt=C;try{nt()}catch(dt){je(c,F,dt)}}}r=r.next}while(r!==u)}}catch(dt){je(n,n.return,dt)}}function M0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{fg(n,a)}catch(r){je(t,t.return,r)}}}function b0(t,n,a){a.props=Bs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){je(t,n,r)}}function qi(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var c=t.stateNode,u=ma(t.memoizedProps,c);(c.ref===null||c.ref.name!==u)&&(c.ref=Dv(u)),r=c.ref;break;case 7:if(t.stateNode===null){var g=new ui(t);y(t.child,!1,xM,g,void 0,void 0),t.stateNode=g}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(C){je(t,n,C)}}function Nn(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){je(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){je(t,n,c)}else a.current=null}function gc(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)Iv(t.stateNode,n[a])}function E0(t){for(var n=t.return;n!==null&&(ud(n)&&Iv(t.stateNode,n.stateNode),!cd(n));)n=n.return}function Vo(t){for(var n=t.return;n!==null&&(ud(n)&&_M(t.stateNode,n.stateNode),!cd(n));)n=n.return}function cd(t){return t.tag===5||t.tag===3||t.tag===27}function ud(t){return t&&t.tag===7&&t.stateNode!==null}function fd(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){je(t,t.return,c)}}function dd(t,n,a){try{var r=t.stateNode;tM(r,t.type,a,n),r[X]=n}catch(c){je(t,t.return,c)}}function T0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function hd(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||T0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function pd(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(c,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(c),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Wi)),gc(t,r),Ee=!0;else if(c!==4&&(c===27&&(gc(t,r),r=null,rs(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(pd(t,n,a,r),t=t.sibling;t!==null;)pd(t,n,a,r),t=t.sibling}function vc(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?a.insertBefore(c,n):a.appendChild(c),gc(t,r),Ee=!0;else if(c!==4&&(c===27&&(gc(t,r),r=null,rs(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(vc(t,n,a,r),t=t.sibling;t!==null;)vc(t,n,a,r),t=t.sibling}function A0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Un(n,r,a),n[A]=t,n[X]=a}catch(u){je(t,t.return,u)}}var xc=!1,ri=null;function R0(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(xc=!0)}var Zi=null;function C0(){var t=Zi;return Zi=null,t}var qn=0;function yr(t,n,a,r,c){return qn=0,w0(t.child,n,a,r,c)}function w0(t,n,a,r,c){for(var u=!1;t!==null;){if(t.tag===5){var g=t.stateNode;if(r!==null){var C=Qd(g);r.push(C),C.view&&(u=!0)}else u||Qd(g).view&&(u=!0);xc=!0,Cv(g,qn===0?n:n+"_"+qn,a),qn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&c||w0(t.child,n,a,r,c)&&(u=!0));t=t.sibling}return u}function Ki(t,n){for(;t!==null;)t.tag===5?wv(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Ki(t.child,n)),t=t.sibling}function _c(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(_c(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=ga(n.default,n.share),n!=="none"&&(yr(t,a,n,null,!1)||Ki(t.child,!1))}t=t.sibling}}function md(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,c=ma(r,a),u=ga(r.default,a.paired?r.share:r.enter);u!=="none"?yr(t,c,u,null,!1)?(_c(t),a.paired||n||wr(t,r.onEnter)):Ki(t.child,!1):_c(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)md(t,n),t=t.sibling;else _c(t)}function gd(t){if(ri!==null&&ri.size!==0){var n=ri;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var c=n.get(r);if(c!==void 0){var u=ga(a.default,a.share);if(u!=="none"&&(yr(t,r,u,null,!1)?(u=t.stateNode,c.paired=u,u.paired=c,wr(t,a.onShare)):Ki(t.child,!1)),n.delete(r),n.size===0)break}}}gd(t)}t=t.sibling}}}function vd(t){if(t.tag===30){var n=t.memoizedProps,a=ma(n,t.stateNode),r=ri!==null?ri.get(a):void 0,c=ga(n.default,r!==void 0?n.share:n.exit);c!=="none"&&(yr(t,a,c,null,!1)?r!==void 0?(c=t.stateNode,r.paired=c,c.paired=r,ri.delete(a),wr(t,n.onShare)):wr(t,n.onExit):Ki(t.child,!1)),ri!==null&&gd(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)vd(t),t=t.sibling;else ri!==null&&gd(t)}function D0(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=ma(n,t.stateNode);n=ga(n.default,n.update),t.flags&=-5,n!=="none"&&yr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&D0(t);t=t.sibling}}function xd(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Ki(t.child,!1))}xd(t)}t=t.sibling}}function Sc(t){if(t.tag===30)t.stateNode.paired=null,Ki(t.child,!1),xd(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Sc(t),t=t.sibling;else xd(t)}function N0(t){for(t=t.child;t!==null;)t.tag===30?Ki(t.child,!1):(t.subtreeFlags&33554432)!==0&&N0(t),t=t.sibling}function _d(t,n,a,r,c,u,g){for(var C=!1;n!==null;){if(n.tag===5){var F=n.stateNode;if(u!==null&&qn<u.length){var nt=u[qn],dt=Qd(F);(nt.view||dt.view)&&(C=!0);var _t;if(_t=(t.flags&4)===0)if(dt.clip)_t=!0;else{_t=nt.rect;var Q=dt.rect;_t=_t.y!==Q.y||_t.x!==Q.x||_t.height!==Q.height||_t.width!==Q.width}_t&&(t.flags|=4),dt.abs?dt=!nt.abs:(nt=nt.rect,dt=dt.rect,dt=nt.height!==dt.height||nt.width!==dt.width),dt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&Cv(F,qn===0?a:a+"_"+qn,c),C&&(t.flags&4)!==0||(Zi===null&&(Zi=[]),Zi.push(F,qn===0?r:r+"_"+qn,n.memoizedProps)),qn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&g?t.flags|=n.flags&32:_d(t,n.child,a,r,c,u,g)&&(C=!0));n=n.sibling}return C}function U0(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,c=ma(a,r),u=ga(a.default,a.update),g;g=t.memoizedState,t.memoizedState=null,r=t;var C=t.child;qn=0,c=_d(r,C,c,c,u,g,!1),(t.flags&4)!==0&&c&&wr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&U0(t);t=t.sibling}}var Tn=!1,Xe=!1,Qi=!1,Sd=!1,L0=typeof WeakSet=="function"?WeakSet:Set,An=null,Ji=!1,ko=!1,yc=!1,yd=!1;function wy(t,n,a){if(t=t.containerInfo,jd=Fr,t=zm(t),of(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var c=r.getSelection&&r.getSelection();if(c&&c.rangeCount!==0){r=c.anchorNode;var u=c.anchorOffset,g=c.focusNode;c=c.focusOffset;try{r.nodeType,g.nodeType}catch{r=null;break t}var C=0,F=-1,nt=-1,dt=0,_t=0,Q=t,ut=null;e:for(;;){for(var Lt;Q!==r||u!==0&&Q.nodeType!==3||(F=C+u),Q!==g||c!==0&&Q.nodeType!==3||(nt=C+c),Q.nodeType===3&&(C+=Q.nodeValue.length),(Lt=Q.firstChild)!==null;)ut=Q,Q=Lt;for(;;){if(Q===t)break e;if(ut===r&&++dt===u&&(F=C),ut===g&&++_t===c&&(nt=C),(Lt=Q.nextSibling)!==null)break;Q=ut,ut=Q.parentNode}Q=Lt}r=F===-1||nt===-1?null:{start:F,end:nt}}else r=null}r=r||{start:0,end:0}}else r=null;for(Yd={focusedElem:t,selectionRange:r},Fr=!1,a=(a&335544064)===a,An=n,n=a?9270:1024;An!==null;){if(t=An,a&&(r=t.deletions,r!==null))for(u=0;u<r.length;u++)a&&vd(r[u]);if(t.alternate===null&&(t.flags&2)!==0)a&&R0(t),Mc(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&vd(r),Mc(a);continue}else if(r!==null&&r.memoizedState!==null){a&&R0(t),Mc(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,An=r):(a&&D0(t),Mc(a))}}ri=null}function Mc(t){for(;An!==null;){var n=An,a=t,r=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((c&1024)!==0&&r!==null){a=void 0,c=r.memoizedProps,r=r.memoizedState;var u=n.stateNode;try{var g=Bs(n.type,c);a=u.getSnapshotBeforeUpdate(g,r),u.__reactInternalSnapshotBeforeUpdate=a}catch(C){je(n,n.return,C)}}break;case 3:if((c&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)th(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":th(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=ma(r.memoizedProps,r.stateNode),c=n.memoizedProps,c=ga(c.default,c.update),c!=="none"&&yr(r,a,c,r.memoizedState=[],!0));break;default:if((c&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,An=r;break}An=n.return}}function O0(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:$i(t,a),r&4&&Go(5,a);break;case 1:if($i(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){je(a,a.return,g)}else{var c=Bs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){je(a,a.return,g)}}r&64&&M0(a),r&512&&qi(a,a.return);break;case 3:if($i(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{fg(t,n)}catch(g){je(a,a.return,g)}}break;case 27:n===null&&r&4&&A0(a);case 26:case 5:$i(t,a),n===null&&r&4&&fd(a),r&512&&qi(a,a.return);break;case 12:$i(t,a);break;case 31:$i(t,a),r&4&&B0(t,a);break;case 13:$i(t,a),r&4&&F0(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=Gy.bind(null,a),MM(t,a))));break;case 22:if(r=a.memoizedState!==null||Tn,!r){var u=n!==null&&n.memoizedState!==null||Xe;n=Tn,c=Xe,Tn=r,(Xe=u)&&!c?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),Li(t,a,r)):$i(t,a),Tn=n,Xe=c}break;case 30:$i(t,a),r&512&&qi(a,a.return);break;case 7:r&512&&qi(a,a.return);default:$i(t,a)}}function Md(t,n){for(t=t.child;t!==null;)P0(t,n),t=t.sibling}function P0(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var c=t.stateNode,u=t.memoizedProps.style,g=u!=null&&u.hasOwnProperty("display")?u.display:null;c.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(F){je(t,t.return,F)}bd(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Ee=!0}catch(F){je(t,t.return,F)}break;case 18:try{var C=t.stateNode;n?Rv(C,!0):Rv(t.stateNode,!1)}catch(F){je(t,t.return,F)}break;case 22:case 23:t.memoizedState===null&&Md(t,n);break;default:Md(t,n)}}function bd(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:P0(a,r);break t;case 22:a.memoizedState===null&&bd(a,r);break t;default:bd(a,r)}}t=t.sibling}}function I0(t){var n=t.alternate;n!==null&&(t.alternate=null,I0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Zt(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var an=null,Zn=!1;function Ni(t,n,a){for(a=a.child;a!==null;)z0(t,n,a),a=a.sibling}function z0(t,n,a){if(Vt&&typeof Vt.onCommitFiberUnmount=="function")try{Vt.onCommitFiberUnmount(Qt,a)}catch{}switch(a.tag){case 26:Xe||Nn(a,n),Ni(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Xe&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xe||Nn(a,n),Vo(a);var r=an,c=Zn;rs(a.type)&&(an=a.stateNode,Zn=!1),Ni(t,n,a),Gv(a.stateNode,a.type,a.memoizedProps),an=r,Zn=c;break;case 5:Xe||Nn(a,n),Vo(a);case 6:if(a.tag===6&&Vo(a),r=an,c=Zn,an=null,Ni(t,n,a),an=r,Zn=c,an!==null)if(Zn)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(a.stateNode),Ee=!0}catch(u){je(a,n,u)}else try{an.removeChild(a.stateNode),Ee=!0}catch(u){je(a,n,u)}break;case 18:an!==null&&(Zn?(t=an,Av(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Hr(t)):Av(an,a.stateNode));break;case 4:r=an,c=Zn,an=a.stateNode.containerInfo,Zn=!0,Ni(t,n,a),an=r,Zn=c;break;case 0:case 11:case 14:case 15:$a(2,a,n),Xe||$a(4,a,n),Ni(t,n,a);break;case 1:Xe||(Nn(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&b0(a,n,r)),Ni(t,n,a);break;case 21:Ni(t,n,a);break;case 22:Xe=(r=Xe)||a.memoizedState!==null,Ni(t,n,a),Xe=r;break;case 30:Nn(a,n),Ni(t,n,a);break;case 7:Xe||Nn(a,n),Ni(t,n,a);break;default:Ni(t,n,a)}}function B0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Hr(t)}catch(a){je(n,n.return,a)}}}function F0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Hr(t)}catch(a){je(n,n.return,a)}}function Dy(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new L0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new L0),n;default:throw Error(s(435,t.tag))}}function bc(t,n){var a=Dy(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=Vy.bind(null,t,r);r.then(c,c)}})}function Vn(t,n,a){var r=n.deletions;if(r!==null)for(var c=0;c<r.length;c++){var u=r[c],g=t,C=n,F=C;t:for(;F!==null;){switch(F.tag){case 27:if(rs(F.type)){an=F.stateNode,Zn=!1;break t}break;case 5:an=F.stateNode,Zn=!1;break t;case 3:case 4:an=F.stateNode.containerInfo,Zn=!0;break t}F=F.return}if(an===null)throw Error(s(160));z0(g,C,u),an=null,Zn=!1,g=u.alternate,g!==null&&(g.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)H0(n,t,a),n=n.sibling}var Ui=null;function H0(t,n,a){var r=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(c&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var u=0;u<r.length;u++){var g=r[u];g.ref.impl=g.nextImpl}Vn(n,t,a),kn(t),c&4&&($a(3,t,t.return),Go(3,t),$a(5,t,t.return));break;case 1:Vn(n,t,a),kn(t),c&512&&(Xe||r===null||Nn(r,r.return)),c&64&&Tn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(u=Ui,Vn(n,t,a),kn(t),c&512&&(Xe||r===null||Nn(r,r.return)),c&4)if(c=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(Tn)t.stateNode=bv(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,c=u.ownerDocument||u;e:switch(n){case"title":r=c.getElementsByTagName("title")[0],(!r||r[Ut]||r[A]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=c.createElement(n),c.head.insertBefore(r,c.querySelector("head > title"))),Un(r,n,a),r[A]=t,be(r),n=r;break t;case"link":if(u=Yv("link","href",c).get(n+(a.href||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(g,1);break e}}r=c.createElement(n),Un(r,n,a),c.head.appendChild(r);break;case"meta":if(u=Yv("meta","content",c).get(n+(a.content||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(g,1);break e}}r=c.createElement(n),Un(r,n,a),c.head.appendChild(r);break;default:throw Error(s(468,n))}r[A]=t,be(r),n=r}t.stateNode=n}else Tn||oh(u,t.type,t.stateNode);else t.stateNode=jv(u,a,t.memoizedProps);else c!==a?(c===null?(n=r.stateNode,n===null||Xe||n.parentNode.removeChild(n)):c.count--,a===null?Tn||oh(u,t.type,t.stateNode):jv(u,a,t.memoizedProps)):a===null&&t.stateNode!==null&&dd(t,t.memoizedProps,r.memoizedProps);break;case 27:Vn(n,t,a),kn(t),c&512&&(Xe||r===null||Nn(r,r.return)),r!==null&&c&4&&dd(t,t.memoizedProps,r.memoizedProps);break;case 5:if(u=Qi,Qi=!1,Vn(n,t,a),Qi=u,kn(t),c&512&&(Xe||r===null||Nn(r,r.return)),t.flags&32){n=t.stateNode;try{ir(n,""),Ee=!0}catch(dt){je(t,t.return,dt)}}c&4&&t.stateNode!=null&&(n=t.memoizedProps,dd(t,n,r!==null?r.memoizedProps:n)),c&1024&&(Sd=!0);break;case 6:if(Vn(n,t,a),kn(t),c&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Ee=!0}catch(dt){je(t,t.return,dt)}}break;case 3:if(Ee=!1,Bc=null,u=Ui,Ui=Jo(n.containerInfo),Vn(n,t,a),Ui=u,kn(t),c&4&&r!==null&&r.memoizedState.isDehydrated)try{Hr(n.containerInfo)}catch(dt){je(t,t.return,dt)}Sd&&(Sd=!1,G0(t)),Ee=!1;break;case 4:c=Qi,Qi=Tn,r=Ge(),u=Ui,Ui=Jo(t.stateNode.containerInfo),Vn(n,t,a),kn(t),Ui=u,Ee&&ko&&(yc=!0),Ee=r,Qi=c;break;case 12:Vn(n,t,a),kn(t);break;case 31:Vn(n,t,a),kn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,bc(t,n)));break;case 13:Vn(n,t,a),kn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Ac=Xt()),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,bc(t,n)));break;case 22:u=t.memoizedState!==null,g=r!==null&&r.memoizedState!==null;var C=Tn,F=Xe,nt=Qi;Tn=C||u,Qi=nt||u,Xe=F||g,Vn(n,t,a),Xe=F,Qi=nt,Tn=C,kn(t),c&8192&&(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,!u||r===null||g||Tn||Xe||(n=g||Xe,a=Tn,r=Xe,Tn=u||Tn,Xe=n,ts(t,2),Tn=a,Xe=r),!u&&Qi||Md(t,u)),c&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,bc(t,a))));break;case 19:Vn(n,t,a),kn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,bc(t,n)));break;case 30:c&512&&(Xe||r===null||Nn(r,r.return)),c=Ge(),u=ko,g=(a&335544064)===a,C=t.memoizedProps,ko=g&&ga(C.default,C.update)!=="none",Vn(n,t,a),kn(t),g&&r!==null&&Ee&&(t.flags|=4),ko=u,Ee=c;break;case 21:break;case 7:c&512&&(Xe||r===null||Nn(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:Vn(n,t,a),kn(t)}}function kn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(T0(r)){a=r;break}r=r.return}r=null;for(var c=t.return;c!==null;){if(ud(c)){var u=c.stateNode;r===null?r=[u]:r.push(u)}if(cd(c))break;c=c.return}var g=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var C=a.stateNode,F=hd(t);vc(t,F,C,g);break;case 5:var nt=a.stateNode;a.flags&32&&(ir(nt,""),a.flags&=-33);var dt=hd(t);vc(t,dt,nt,g);break;case 3:case 4:var _t=a.stateNode.containerInfo,Q=hd(t);pd(t,Q,_t,g);break;default:throw Error(s(161))}}catch(ut){je(t,t.return,ut)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function G0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;G0(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Fr=!0,n.reset(),Fr=!1),t=t.sibling}}function Mr(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)V0(n,t),n=n.sibling;else U0(n)}function V0(t,n){var a=t.alternate;if(a===null)md(t,!1);else switch(t.tag){case 3:if(yd=Ji=!1,C0(),Mr(n,t),!Ji&&!yc){if(t=Zi,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var c=t[r+1];wv(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+c+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),yd=!0}Zi=null;break;case 5:Mr(n,t);break;case 4:r=Ji,Ji=!1,Mr(n,t),Ji&&(yc=!0),Ji=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?md(t,!1):Mr(n,t));break;case 30:r=Ji,c=C0(),Ji=!1,Mr(n,t),Ji&&(t.flags|=4);var u=t.memoizedProps,g=t.stateNode;n=ma(u,g),g=ma(a.memoizedProps,g);var C=ga(u.default,u.update);C==="none"?n=!1:(u=a.memoizedState,a.memoizedState=null,a=t.child,qn=0,n=_d(t,a,n,g,C,u,!0),qn!==(u===null?0:u.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(wr(t,t.memoizedProps.onUpdate),Zi=c):c!==null&&(c.push.apply(c,Zi),Zi=c),Ji=(t.flags&32)!==0?!0:r;break;default:Mr(n,t)}}function $i(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)O0(t,n.alternate,n),n=n.sibling}function ts(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:$a(4,a,a.return),ts(a,r);break;case 1:Nn(a,a.return);var c=a.stateNode;typeof c.componentWillUnmount=="function"&&b0(a,a.return,c),ts(a,r);break;case 27:(r&2)!==0&&Gv(a.stateNode,a.type,a.memoizedProps);case 5:Nn(a,a.return),a.tag!==5&&a.tag!==27||Vo(a),ts(a,r);break;case 6:Vo(a);break;case 26:Nn(a,a.return),c=a.stateNode,a.memoizedState!==null||c===null||Xe||c.parentNode.removeChild(c),ts(a,r);break;case 22:a.memoizedState===null&&ts(a,r);break;case 30:Nn(a,a.return),ts(a,r);break;case 7:Nn(a,a.return);default:ts(a,r)}t=t.sibling}}function Li(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,c=t,u=n,g=u.flags,C=(a&1)!==0;switch(u.tag){case 0:case 11:case 15:Li(c,u,a),Go(4,u);break;case 1:if(Li(c,u,a),r=u,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(dt){je(r,r.return,dt)}if(r=u,c=r.updateQueue,c!==null){var F=r.stateNode;try{var nt=c.shared.hiddenCallbacks;if(nt!==null)for(c.shared.hiddenCallbacks=null,c=0;c<nt.length;c++)ug(nt[c],F)}catch(dt){je(r,r.return,dt)}}C&&g&64&&M0(u),qi(u,u.return);break;case 27:(a&2)!==0&&A0(u);case 5:u.tag!==5&&u.tag!==27||E0(u),Li(c,u,a),C&&r===null&&g&4&&fd(u),qi(u,u.return);break;case 6:E0(u);break;case 26:F=u.stateNode,u.memoizedState!==null||F===null||Tn||oh(Jo(F.ownerDocument),u.type,F),Li(c,u,a),C&&r===null&&g&4&&fd(u),qi(u,u.return);break;case 12:Li(c,u,a);break;case 31:Li(c,u,a),C&&g&4&&B0(c,u);break;case 13:Li(c,u,a),C&&g&4&&F0(c,u);break;case 22:u.memoizedState===null&&Li(c,u,a),qi(u,u.return);break;case 30:Li(c,u,a),qi(u,u.return);break;case 7:qi(u,u.return);default:Li(c,u,a)}n=n.sibling}}function Ed(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Co(a))}function Td(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Co(t))}function bi(t,n,a,r){var c=(a&335544064)===a;if(n.subtreeFlags&(c?10262:10256))for(n=n.child;n!==null;)k0(t,n,a,r),n=n.sibling;else c&&N0(n)}function k0(t,n,a,r){var c=(a&335544064)===a;c&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Sc(n);var u=n.flags;switch(n.tag){case 0:case 11:case 15:bi(t,n,a,r),u&2048&&Go(9,n);break;case 1:bi(t,n,a,r);break;case 3:bi(t,n,a,r),c&&yd&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),u&2048&&(u=null,n.alternate!==null&&(u=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==u&&(n.refCount++,u!=null&&Co(u)));break;case 12:if(u&2048){bi(t,n,a,r),u=n.stateNode;try{var g=n.memoizedProps,C=g.id,F=g.onPostCommit;typeof F=="function"&&F(C,n.alternate===null?"mount":"update",u.passiveEffectDuration,-0)}catch(nt){je(n,n.return,nt)}}else bi(t,n,a,r);break;case 31:bi(t,n,a,r);break;case 13:bi(t,n,a,r);break;case 23:break;case 22:g=n.stateNode,C=n.alternate,n.memoizedState!==null?(c&&C!==null&&C.memoizedState===null&&Sc(C),g._visibility&2?bi(t,n,a,r):Xo(t,n)):(c&&C!==null&&C.memoizedState!==null&&Sc(n),g._visibility&2?bi(t,n,a,r):(g._visibility|=2,br(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),u&2048&&Ed(C,n);break;case 24:bi(t,n,a,r),u&2048&&Td(n.alternate,n);break;case 30:c&&(u=n.alternate,u!==null&&(Ki(u.child,!0),Ki(n.child,!0))),bi(t,n,a,r);break;default:bi(t,n,a,r)}}function br(t,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var u=t,g=n,C=a,F=r,nt=g.flags;switch(g.tag){case 0:case 11:case 15:br(u,g,C,F,c),Go(8,g);break;case 23:break;case 22:var dt=g.stateNode;g.memoizedState!==null?dt._visibility&2?br(u,g,C,F,c):Xo(u,g):(dt._visibility|=2,br(u,g,C,F,c)),c&&nt&2048&&Ed(g.alternate,g);break;case 24:br(u,g,C,F,c),c&&nt&2048&&Td(g.alternate,g);break;default:br(u,g,C,F,c)}n=n.sibling}}function Xo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,c=r.flags;switch(r.tag){case 22:Xo(a,r),c&2048&&Ed(r.alternate,r);break;case 24:Xo(a,r),c&2048&&Td(r.alternate,r);break;default:Xo(a,r)}n=n.sibling}}var Fs=8192;function Hs(t,n,a){if(t.subtreeFlags&Fs)for(t=t.child;t!==null;)X0(t,n,a),t=t.sibling}function X0(t,n,a){switch(t.tag){case 26:Hs(t,n,a),t.flags&Fs&&(t.memoizedState!==null?IM(a,Ui,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&Qv(a,t)));break;case 5:Hs(t,n,a),t.flags&Fs&&(t=t.stateNode,(n&335544128)===n&&Qv(a,t));break;case 3:case 4:var r=Ui;Ui=Jo(t.stateNode.containerInfo),Hs(t,n,a),Ui=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Fs,Fs=16777216,Hs(t,n,a),Fs=r):Hs(t,n,a));break;case 30:if((t.flags&Fs)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var c=t.stateNode;c.paired=null,ri===null&&(ri=new Map),ri.set(r,c)}Hs(t,n,a);break;default:Hs(t,n,a)}}function W0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Wo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,Y0(r,t)}W0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)j0(t),t=t.sibling}function j0(t){switch(t.tag){case 0:case 11:case 15:Wo(t),t.flags&2048&&$a(9,t,t.return);break;case 3:Wo(t);break;case 12:Wo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Ec(t)):Wo(t);break;default:Wo(t)}}function Ec(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,Y0(r,t)}W0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:$a(8,n,n.return),Ec(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Ec(n));break;default:Ec(n)}t=t.sibling}}function Y0(t,n){for(;An!==null;){var a=An;switch(a.tag){case 0:case 11:case 15:$a(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Co(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,An=r;else t:for(a=t;An!==null;){r=An;var c=r.sibling,u=r.return;if(I0(r),r===a){An=null;break t}if(c!==null){c.return=u,An=c;break t}An=u}}}var Ny={getCacheForType:function(t){var n=Cn(hn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return Cn(hn).controller.signal}},Uy=typeof WeakMap=="function"?WeakMap:Map,Ve=0,Je=null,Ce=null,Ue=0,We=0,oi=null,es=!1,Er=!1,Ad=!1,Ta=0,fn=0,ns=0,Gs=0,Tc=0,li=0,Tr=0,jo=null,Kn=null,Rd=!1,Ac=0,q0=0,Rc=1/0,Cc=null,is=null,rn=0,Oi=null,Vs=null,ta=0,Cd=0,wd=null,Z0=null,Ar=null,Rr=null,Cr=null,Yo=0,wc=null;function ci(){return(Ve&2)!==0&&Ue!==0?Ue&-Ue:Mt.T!==null?Fd():Rl()}function K0(){if(li===0)if((Ue&536870912)===0||Te){var t=ys;ys<<=1,(ys&3932160)===0&&(ys=262144),li=t}else li=536870912;return t=wn.current,t!==null&&(t.flags|=32),li}function wr(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=Dv(ma(t.memoizedProps,a))),Rr===null&&(Rr=[]),Rr.push(n.bind(null,r))}}function Qn(t,n,a){(t===Je&&(We===2||We===9)||t.cancelPendingCommit!==null)&&(Dr(t,0),as(t,Ue,li,!1)),ki(t,a),((Ve&2)===0||t!==Je)&&(t===Je&&((Ve&2)===0&&(Gs|=a),fn===4&&as(t,Ue,li,!1)),ea(t))}function Q0(t,n,a){if((Ve&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Fa(t,n),c=r?Py(t,n):Nd(t,n,!0),u=r;do{if(c===0){Er&&!r&&as(t,n,0,!1);break}else{if(a=t.current.alternate,u&&!Ly(a)){c=Nd(t,n,!1),u=!1;continue}if(c===2){if(u=n,t.errorRecoveryDisabledLanes&u)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var C=t;c=jo;var F=C.current.memoizedState.isDehydrated;if(F&&(Dr(C,g).flags|=256),g=Nd(C,g,!1),g!==2&&g!==6){if(Ad&&!F){C.errorRecoveryDisabledLanes|=u,Gs|=u,c=4;break t}u=Kn,Kn=c,u!==null&&(Kn===null?Kn=u:Kn.push.apply(Kn,u))}c=g}if(u=!1,c!==2)continue}}if(c===1){Dr(t,0),as(t,n,0,!0);break}t:{switch(r=t,u=c,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:as(r,n,li,!es);break t;case 2:Kn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=Ac+300-Xt(),10<c)){if(as(r,n,li,!es),Ms(r,0,!0)!==0)break t;ta=n,r.timeoutHandle=Kd(J0.bind(null,r,a,Kn,Cc,Rd,n,li,Gs,Tr,es,u,"Throttled",-0,0),c);break t}J0(r,a,Kn,Cc,Rd,n,li,Gs,Tr,es,u,null,-0,0)}}break}while(!0);ea(t)}function J0(t,n,a,r,c,u,g,C,F,nt,dt,_t,Q,ut){t.timeoutHandle=-1;var Lt=n.subtreeFlags,Kt=(u&335544064)===u;if(_t=null,(Kt||Lt&8192||(Lt&16785408)===16785408)&&(_t={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},ri=null,X0(n,u,_t),Kt&&(Lt=_t,Kt=t.containerInfo,Kt=(Kt.nodeType===9?Kt:Kt.ownerDocument).__reactViewTransition,Kt!=null&&(Lt.count++,Lt.waitingForViewTransition=!0,Lt=el.bind(Lt),Kt.finished.then(Lt,Lt))),Lt=(u&62914560)===u?Ac-Xt():(u&4194048)===u?q0-Xt():0,Lt=zM(_t,Lt),Lt!==null)){ta=u,t.cancelPendingCommit=Lt(rv.bind(null,t,n,u,a,r,c,g,C,F,nt,dt,_t,null,Q,ut)),as(t,u,g,!nt);return}rv(t,n,u,a,r,c,g,C,F,nt,dt,_t)}function Ly(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],u=c.getSnapshot;c=c.value;try{if(!ai(u(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function as(t,n,a,r){n=Vi(t,n),n&=~Tc,n&=~Gs,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var c=n;0<c;){var u=31-he(c),g=1<<u;r[u]=-1,c&=~g}a!==0&&bs(t,a,n)}function Dc(){return(Ve&6)===0?(qo(0),!1):!0}function Dd(){if(Ce!==null){if(We===0)var t=Ce.return;else t=Ce,_a=ws=null,Bf(t),gr=null,No=0,t=Ce;for(;t!==null;)y0(t.alternate,t),t=t.return;Ce=null}}function Dr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,iM(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ta=0,Dd(),Je=t,Ce=a=va(t.current,null),Ue=n,We=0,oi=null,es=!1,Er=Fa(t,n),Ad=!1,Tr=li=Tc=Gs=ns=fn=0,Kn=jo=null,Rd=!1,Ta=Vi(t,n),Bl(),a}function $0(t,n){Se=null,Mt.H=cc,n===mr||n===Zl?(n=rg(),We=3):n===Tf?(n=rg(),We=4):We=n===$f?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,oi=n,Ce===null&&(fn=1,uc(t,_i(n,t.current)))}function tv(){var t=wn.current;return t===null?!0:(Ue&4194048)===Ue?Pn===null:(Ue&62914560)===Ue||(Ue&536870912)!==0?t===Pn:!1}function ev(){var t=Mt.H;return Mt.H=cc,t===null?cc:t}function nv(){var t=Mt.A;return Mt.A=Ny,t}function Nc(){fn=4,es||(Ue&4194048)!==Ue&&wn.current!==null||(Er=!0),(ns&134217727)===0&&(Gs&134217727)===0||Je===null||as(Je,Ue,li,!1)}function Nd(t,n,a){var r=Ve;Ve|=2;var c=ev(),u=nv();(Je!==t||Ue!==n)&&(Cc=null,Dr(t,n)),n=!1;var g=fn;t:do try{if(We!==0&&Ce!==null){var C=Ce,F=oi;switch(We){case 8:Dd(),g=6;break t;case 3:case 2:case 9:case 6:wn.current===null&&(n=!0);var nt=We;if(We=0,oi=null,Nr(t,C,F,nt),a&&Er){g=0;break t}break;default:nt=We,We=0,oi=null,Nr(t,C,F,nt)}}Oy(),g=fn;break}catch(dt){$0(t,dt)}while(!0);return n&&t.shellSuspendCounter++,_a=ws=null,Ve=r,Mt.H=c,Mt.A=u,Ce===null&&(Je=null,Ue=0,Bl()),g}function Oy(){for(;Ce!==null;)iv(Ce)}function Py(t,n){var a=Ve;Ve|=2;var r=ev(),c=nv();Je!==t||Ue!==n?(Cc=null,Rc=Xt()+500,Dr(t,n)):Er=Fa(t,n);t:do try{if(We!==0&&Ce!==null){n=Ce;var u=oi;e:switch(We){case 1:We=0,oi=null,Nr(t,n,u,1);break;case 2:case 9:if(ag(u)){We=0,oi=null,av(n);break}n=function(){We!==2&&We!==9||Je!==t||(We=7),ea(t)},u.then(n,n);break t;case 3:We=7;break t;case 4:We=5;break t;case 7:ag(u)?(We=0,oi=null,av(n)):(We=0,oi=null,Nr(t,n,u,7));break;case 5:var g=null;switch(Ce.tag){case 26:g=Ce.memoizedState;case 5:case 27:var C=Ce;if(g?Zv(g):C.stateNode.complete){We=0,oi=null;var F=C.sibling;if(F!==null)Ce=F;else{var nt=C.return;nt!==null?(Ce=nt,Uc(nt)):Ce=null}break e}}We=0,oi=null,Nr(t,n,u,5);break;case 6:We=0,oi=null,Nr(t,n,u,6);break;case 8:Dd(),fn=6;break t;default:throw Error(s(462))}}Iy();break}catch(dt){$0(t,dt)}while(!0);return _a=ws=null,Mt.H=r,Mt.A=c,Ve=a,Ce!==null?0:(Je=null,Ue=0,Bl(),fn)}function Iy(){for(;Ce!==null&&!It();)iv(Ce)}function iv(t){var n=_0(t.alternate,t,Ta);t.memoizedProps=t.pendingProps,n===null?Uc(t):Ce=n}function av(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=d0(a,n,n.pendingProps,n.type,void 0,Ue);break;case 11:n=d0(a,n,n.pendingProps,n.type.render,n.ref,Ue);break;case 5:Bf(n);var r=n;r===En&&(Te?(Xl(r),r.tag===5&&r.stateNode!=null&&(tn=r.stateNode)):(Xl(r),Te=!0));default:y0(a,n),n=Ce=Ym(n,Ta),n=_0(a,n,Ta)}t.memoizedProps=t.pendingProps,n===null?Uc(t):Ce=n}function Nr(t,n,a,r){_a=ws=null,Bf(n),gr=null,No=0;var c=n.return;try{if(by(t,c,n,a,Ue)){fn=1,uc(t,_i(a,t.current)),Ce=null;return}}catch(u){if(c!==null)throw Ce=c,u;fn=1,uc(t,_i(a,t.current)),Ce=null;return}n.flags&32768?(Te||r===1?t=!0:Er||(Ue&536870912)!==0?t=!1:(es=t=!0,(r===2||r===9||r===3||r===6)&&(r=wn.current,r!==null&&r.tag===13&&(r.flags|=16384))),sv(n,t)):Uc(n)}function Uc(t){var n=t;do{if((n.flags&32768)!==0){sv(n,es);return}t=n.return;var a=Ry(n.alternate,n,Ta);if(a!==null){Ce=a;return}if(n=n.sibling,n!==null){Ce=n;return}Ce=n=t}while(n!==null);fn===0&&(fn=5)}function sv(t,n){do{var a=Cy(t.alternate,t);if(a!==null){a.flags&=32767,Ce=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Ce=t;return}Ce=t=a}while(t!==null);fn=6,Ce=null}function rv(t,n,a,r,c,u,g,C,F,nt,dt,_t){t.cancelPendingCommit=null;do Lc();while(rn!==0);if((Ve&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===Je&&(Ce=Je=null,Ue=0),Vs=n,Oi=t,ta=a,wd=c,Z0=r,zy(t,n,a,g,C,F,_t)}}function zy(t,n,a,r,c,u,g){var C=n.lanes|n.childLanes;if(Cd=C,C|=df,Al(t,a,C,r,c,u),Rr=null,(a&335544064)===a?(Cr=fy(t),r=10262):(Cr=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,ky(At,function(){return Pd(),null})):(t.callbackNode=null,t.callbackPriority=0),xc=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=Mt.T,Mt.T=null,c=Gt.p,Gt.p=2,u=Ve,Ve|=4;try{wy(t,n,a)}finally{Ve=u,Gt.p=c,Mt.T=r}}rn=1,xc?Ar=cM(g,t.containerInfo,Cr,Ud,Ld,Fy,Od,Pd,By):(Ud(),Ld(),Od())}function By(t){if(rn!==0){var n=Oi.onRecoverableError;n(t,{componentStack:null})}}function Fy(){rn===3&&(rn=0,V0(Vs,Oi),rn=4)}function Ud(){if(rn===1){rn=0;var t=Oi,n=Vs,a=ta,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=Mt.T,Mt.T=null;var c=Gt.p;Gt.p=2;var u=Ve;Ve|=4;try{ko=yc=!1,H0(n,t,a),a=Yd;var g=zm(t.containerInfo),C=a.focusedElem,F=a.selectionRange;if(g!==C&&C&&C.ownerDocument&&Im(C.ownerDocument.documentElement,C)){if(F!==null&&of(C)){var nt=F.start,dt=F.end;if(dt===void 0&&(dt=nt),"selectionStart"in C)C.selectionStart=nt,C.selectionEnd=Math.min(dt,C.value.length);else{var _t=C.ownerDocument||document,Q=_t&&_t.defaultView||window;if(Q.getSelection){var ut=Q.getSelection(),Lt=C.textContent.length,Kt=Math.min(F.start,Lt),ye=F.end===void 0?Kt:Math.min(F.end,Lt);!ut.extend&&Kt>ye&&(g=ye,ye=Kt,Kt=g);var tt=Pm(C,Kt),W=Pm(C,ye);if(tt&&W&&(ut.rangeCount!==1||ut.anchorNode!==tt.node||ut.anchorOffset!==tt.offset||ut.focusNode!==W.node||ut.focusOffset!==W.offset)){var rt=_t.createRange();rt.setStart(tt.node,tt.offset),ut.removeAllRanges(),Kt>ye?(ut.addRange(rt),ut.extend(W.node,W.offset)):(rt.setEnd(W.node,W.offset),ut.addRange(rt))}}}}for(_t=[],ut=C;ut=ut.parentNode;)ut.nodeType===1&&_t.push({element:ut,left:ut.scrollLeft,top:ut.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<_t.length;C++){var xt=_t[C];xt.element.scrollLeft=xt.left,xt.element.scrollTop=xt.top}}Fr=!!jd,Yd=jd=null}finally{Ve=u,Gt.p=c,Mt.T=r}}t.current=n,rn=2}}function Ld(){if(rn===2){rn=0;var t=Oi,n=Vs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=Mt.T,Mt.T=null;var r=Gt.p;Gt.p=2;var c=Ve;Ve|=4;try{O0(t,n.alternate,n)}finally{Ve=c,Gt.p=r,Mt.T=a}}rn=3}}function Od(){if(rn===4||rn===3){rn=0;var t=Ar;Ar=null,Pt();var n=Oi,a=Vs,r=ta,c=Z0,u=(r&335544064)===r?10262:10256;if((a.subtreeFlags&u)!==0||(a.flags&u)!==0?rn=5:(rn=0,Vs=Oi=null,ov(n,n.pendingLanes)),u=n.pendingLanes,u===0&&(is=null),go(r),a=a.stateNode,Vt&&typeof Vt.onCommitFiberRoot=="function")try{Vt.onCommitFiberRoot(Qt,a,void 0,(a.current.flags&128)===128)}catch{}if(c!==null){a=Mt.T,u=Gt.p,Gt.p=2,Mt.T=null;try{for(var g=n.onRecoverableError,C=0;C<c.length;C++){var F=c[C];g(F.value,{componentStack:F.stack})}}finally{Mt.T=a,Gt.p=u}}if(c=Rr,g=Cr,Cr=null,c!==null&&(Rr=null,g===null&&(g=[]),t!==null))for(F=0;F<c.length;F++)a=(0,c[F])(g),a!==void 0&&t.finished.finally(a);(ta&3)!==0&&Lc(),ea(n),u=n.pendingLanes,(r&261930)!==0&&(u&42)!==0?n===wc?Yo++:(Yo=0,wc=n):(Yo=0,wc=null),qo(0)}}function ov(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Co(n)))}function Lc(){return Ar!==null&&(Ar.skipTransition(),Ar=null),Ud(),Ld(),Od(),Pd()}function Pd(){if(rn!==5)return!1;var t=Oi,n=Cd;Cd=0;var a=go(ta),r=Mt.T,c=Gt.p;try{Gt.p=32>a?32:a,Mt.T=null,a=wd,wd=null;var u=Oi,g=ta;if(rn=0,Vs=Oi=null,ta=0,(Ve&6)!==0)throw Error(s(331));var C=Ve;if(Ve|=4,j0(u.current),k0(u,u.current,g,a),Ve=C,qo(0,!1),Vt&&typeof Vt.onPostCommitFiberRoot=="function")try{Vt.onPostCommitFiberRoot(Qt,u)}catch{}return!0}finally{Gt.p=c,Mt.T=r,ov(t,n)}}function lv(t,n,a){n=_i(a,n),n=Jf(t.stateNode,n,2),t=Za(t,n,2),t!==null&&(ki(t,2),ea(t))}function je(t,n,a){if(t.tag===3)lv(t,t,a);else for(;n!==null;){if(n.tag===3){lv(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(is===null||!is.has(r))){t=_i(a,t),a=a0(2),r=Za(n,a,2),r!==null&&(s0(a,r,n,t),ki(r,2),ea(r));break}}n=n.return}}function Id(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new Uy;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(Ad=!0,c.add(a),t=Hy.bind(null,t,n,a),n.then(t,t))}function Hy(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Je===t&&(Ue&a)===a&&((fn===4||fn===3&&(Ue&62914560)===Ue&&300>Xt()-Ac)&&(Ve&2)===0?Dr(t,0):Tc|=a,Tr===Ue&&(Tr=0)),ea(t)}function cv(t,n){n===0&&(n=fo()),t=As(t,n),t!==null&&(ki(t,n),ea(t))}function Gy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),cv(t,a)}function Vy(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),cv(t,a)}function ky(t,n){return Ct(t,n)}var Ur=null,Lr=null,zd=!1,Oc=!1,Bd=!1,ss=0;function ea(t){t!==Lr&&t.next===null&&(Lr===null?Ur=Lr=t:Lr=Lr.next=t),Oc=!0,zd||(zd=!0,Wy())}function qo(t,n){if(!Bd&&Oc){Bd=!0;do for(var a=!1,r=Ur;r!==null;){if(t!==0){var c=r.pendingLanes;if(c===0)var u=0;else{var g=r.suspendedLanes,C=r.pingedLanes;u=(1<<31-he(42|t)+1)-1,u&=c&~(g&~C),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,hv(r,u))}else u=Ue,u=Ms(r,r===Je?u:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(u&3)===0||Fa(r,u)||(a=!0,hv(r,u));r=r.next}while(a);Bd=!1}}function Xy(){uv()}function uv(){Oc=zd=!1;var t=0;ss!==0&&nM()&&(t=ss);for(var n=Xt(),a=null,r=Ur;r!==null;){var c=r.next,u=fv(r,n);u===0?(r.next=null,a===null?Ur=c:a.next=c,c===null&&(Lr=a)):(a=r,(t!==0||(u&3)!==0)&&(Oc=!0)),r=c}rn!==0&&rn!==5||qo(t),ss!==0&&(ss=0)}function fv(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,c=t.expirationTimes,u=t.pendingLanes&-62914561;0<u;){var g=31-he(u),C=1<<g,F=c[g];F===-1?((C&a)===0||(C&r)!==0)&&(c[g]=uo(C,n)):F<=n&&(t.expiredLanes|=C),u&=~C}if(n=Je,a=Ue,a=Ms(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(We===2||We===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&Jt(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Fa(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&Jt(r),go(a)){case 2:case 8:a=K;break;case 32:a=At;break;case 268435456:a=Nt;break;default:a=At}return r=dv.bind(null,t),a=Ct(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&Jt(r),t.callbackPriority=2,t.callbackNode=null,2}function dv(t,n){if(rn!==0&&rn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Lc()&&t.callbackNode!==a)return null;var r=Ue;return r=Ms(t,t===Je?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(Q0(t,r,n),fv(t,Xt()),t.callbackNode!=null&&t.callbackNode===a?dv.bind(null,t):null)}function hv(t,n){if(Lc())return null;Q0(t,n,!0)}function Wy(){aM(function(){(Ve&6)!==0?Ct(de,Xy):uv()})}function Fd(){if(ss===0){var t=Us;t===0&&(t=tr,tr<<=1,(tr&261888)===0&&(tr=256)),ss=t}return ss}function pv(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Dl(t)}function jy(t,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var u=pv((c[X]||null).action),g=r.submitter;g&&(n=(n=g[X]||null)?pv(n.formAction):g.getAttribute("formAction"),n!==null&&(u=n,g=null));var C=new Ol("action","action",null,r,c);t.push({event:C,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ss!==0){var F=new FormData(c,g);Yf(a,{pending:!0,data:F,method:c.method,action:u},null,F)}}else typeof u=="function"&&(C.preventDefault(),F=new FormData(c,g),Yf(a,{pending:!0,data:F,method:c.method,action:u},u,F))},currentTarget:c}]})}}for(var Hd=0;Hd<ff.length;Hd++){var Gd=ff[Hd],Yy=Gd.toLowerCase(),qy=Gd[0].toUpperCase()+Gd.slice(1);Di(Yy,"on"+qy)}Di(Hm,"onAnimationEnd"),Di(Gm,"onAnimationIteration"),Di(Vm,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(iy,"onTransitionRun"),Di(ay,"onTransitionStart"),Di(sy,"onTransitionCancel"),Di(km,"onTransitionEnd"),ln("onMouseEnter",["mouseout","mouseover"]),ln("onMouseLeave",["mouseout","mouseover"]),ln("onPointerEnter",["pointerout","pointerover"]),ln("onPointerLeave",["pointerout","pointerover"]),Ft("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ft("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ft("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ft("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ft("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Zy=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zo));function mv(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],c=r.event;r=r.listeners;t:{var u=void 0;if(n)for(var g=r.length-1;0<=g;g--){var C=r[g],F=C.instance,nt=C.currentTarget;if(C=C.listener,F!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=nt;try{u(c)}catch(dt){zl(dt)}c.currentTarget=null,u=F}else for(g=0;g<r.length;g++){if(C=r[g],F=C.instance,nt=C.currentTarget,C=C.listener,F!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=nt;try{u(c)}catch(dt){zl(dt)}c.currentTarget=null,u=F}}}}function we(t,n){var a=n[lt];a===void 0&&(a=n[lt]=new Set);var r=t+"__bubble";a.has(r)||(gv(n,t,2,!1),a.add(r))}function Vd(t,n,a){var r=0;n&&(r|=4),gv(a,t,r,n)}var Pc="_reactListening"+Math.random().toString(36).slice(2);function kd(t){if(!t[Pc]){t[Pc]=!0,ke.forEach(function(a){a!=="selectionchange"&&(Zy.has(a)||Vd(a,!1,t),Vd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Pc]||(n[Pc]=!0,Vd("selectionchange",!1,n))}}function gv(t,n,a,r){switch(sx(n)){case 2:var c=GM;break;case 8:c=VM;break;default:c=ch}a=c.bind(null,n,a,t),c=void 0,!Ku||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function Xd(t,n,a,r,c){var u=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var g=r.tag;if(g===3||g===4){var C=r.stateNode.containerInfo;if(C===c)break;if(g===4)for(g=r.return;g!==null;){var F=g.tag;if((F===3||F===4)&&g.stateNode.containerInfo===c)return;g=g.return}for(;C!==null;){if(g=le(C),g===null)return;if(F=g.tag,F===5||F===6||F===26||F===27){r=u=g;continue t}C=C.parentNode}}r=r.return}gm(function(){var nt=u,dt=qu(a),_t=[];t:{var Q=Xm.get(t);if(Q!==void 0){var ut=Ol,Lt=t;switch(t){case"keypress":if(Ul(a)===0)break t;case"keydown":case"keyup":ut=LS;break;case"focusin":Lt="focus",ut=tf;break;case"focusout":Lt="blur",ut=tf;break;case"beforeblur":case"afterblur":ut=tf;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ut=_m;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ut=yS;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ut=BS;break;case Hm:case Gm:case Vm:ut=ES;break;case km:ut=HS;break;case"scroll":case"scrollend":ut=_S;break;case"wheel":ut=VS;break;case"copy":case"cut":case"paste":ut=AS;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ut=ym;break;case"submit":ut=IS;break;case"toggle":case"beforetoggle":ut=XS}var Kt=(n&4)!==0,ye=!Kt&&(t==="scroll"||t==="scrollend"),tt=Kt?Q!==null?Q+"Capture":null:Q;Kt=[];for(var W=nt,rt;W!==null;){var xt=W;if(rt=xt.stateNode,xt=xt.tag,xt!==5&&xt!==26&&xt!==27||rt===null||tt===null||(xt=vo(W,tt),xt!=null&&Kt.push(Ko(W,xt,rt))),ye)break;W=W.return}0<Kt.length&&(Q=new ut(Q,Lt,null,a,dt),_t.push({event:Q,listeners:Kt}))}}if((n&7)===0){t:{if(ut=t==="mouseover"||t==="pointerover",Q=t==="mouseout"||t==="pointerout",ut&&a!==Yu&&(Lt=a.relatedTarget||a.fromElement)&&(le(Lt)||Lt[ht]))break t;(Q||ut)&&(Lt=dt.window===dt?dt:(ut=dt.ownerDocument)?ut.defaultView||ut.parentWindow:window,Q?(ut=a.relatedTarget||a.toElement,Q=nt,ut=ut?le(ut):null,ut!==null&&(ye=f(ut),Kt=ut.tag,ut!==ye||Kt!==5&&Kt!==27&&Kt!==6)&&(ut=null)):(Q=null,ut=nt),Q!==ut&&(Kt=_m,xt="onMouseLeave",tt="onMouseEnter",W="mouse",(t==="pointerout"||t==="pointerover")&&(Kt=ym,xt="onPointerLeave",tt="onPointerEnter",W="pointer"),ye=Q==null?Lt:jt(Q),rt=ut==null?Lt:jt(ut),Lt=new Kt(xt,W+"leave",Q,a,dt),Lt.target=ye,Lt.relatedTarget=rt,xt=null,le(dt)===nt&&(Kt=new Kt(tt,W+"enter",ut,a,dt),Kt.target=rt,Kt.relatedTarget=ye,xt=Kt),ye=xt,Kt=Q&&ut?w(Q,ut,Ky):null,Q!==null&&vv(_t,Lt,Q,Kt,!1),ut!==null&&ye!==null&&vv(_t,ye,ut,Kt,!0)))}t:{if(Q=nt?jt(nt):window,ut=Q.nodeName&&Q.nodeName.toLowerCase(),ut==="select"||ut==="input"&&Q.type==="file")var Yt=wm;else if(Rm(Q))if(Dm)Yt=ty;else{Yt=JS;var Le=QS}else ut=Q.nodeName,!ut||ut.toLowerCase()!=="input"||Q.type!=="checkbox"&&Q.type!=="radio"?nt&&ju(nt.elementType)&&(Yt=wm):Yt=$S;if(Yt&&(Yt=Yt(t,nt))){Cm(_t,Yt,a,dt);break t}Le&&Le(t,Q,nt)}switch(Le=nt?jt(nt):window,t){case"focusin":(Rm(Le)||Le.contentEditable==="true")&&(or=Le,lf=nt,To=null);break;case"focusout":To=lf=or=null;break;case"mousedown":cf=!0;break;case"contextmenu":case"mouseup":case"dragend":cf=!1,Bm(_t,a,dt);break;case"selectionchange":if(ny)break;case"keydown":case"keyup":Bm(_t,a,dt)}var ne;if(nf)t:{switch(t){case"compositionstart":var re="onCompositionStart";break t;case"compositionend":re="onCompositionEnd";break t;case"compositionupdate":re="onCompositionUpdate";break t}re=void 0}else rr?Tm(t,a)&&(re="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(re="onCompositionStart");re&&(Mm&&a.locale!=="ko"&&(rr||re!=="onCompositionStart"?re==="onCompositionEnd"&&rr&&(ne=vm()):(Ha=dt,Qu="value"in Ha?Ha.value:Ha.textContent,rr=!0)),Le=Ic(nt,re),0<Le.length&&(re=new Sm(re,t,null,a,dt),_t.push({event:re,listeners:Le}),ne?re.data=ne:(ne=Am(a),ne!==null&&(re.data=ne)))),(ne=jS?YS(t,a):qS(t,a))&&(re=Ic(nt,"onBeforeInput"),0<re.length&&(Le=new Sm("onBeforeInput","beforeinput",null,a,dt),_t.push({event:Le,listeners:re}),Le.data=ne)),jy(_t,t,nt,a,dt)}mv(_t,n)})}function Ko(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Ic(t,n){for(var a=n+"Capture",r=[];t!==null;){var c=t,u=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||u===null||(c=vo(t,a),c!=null&&r.unshift(Ko(t,c,u)),c=vo(t,n),c!=null&&r.push(Ko(t,c,u))),t.tag===3)return r;t=t.return}return[]}function Ky(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function vv(t,n,a,r,c){for(var u=n._reactName,g=[];a!==null&&a!==r;){var C=a,F=C.alternate,nt=C.stateNode;if(C=C.tag,F!==null&&F===r)break;C!==5&&C!==26&&C!==27||nt===null||(F=nt,c?(nt=vo(a,u),nt!=null&&g.unshift(Ko(a,nt,F))):c||(nt=vo(a,u),nt!=null&&g.push(Ko(a,nt,F)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var Qy=/\r\n?/g,Jy=/\u0000|\uFFFD/g;function xv(t){return(typeof t=="string"?t:""+t).replace(Qy,`
`).replace(Jy,"")}function _v(t,n){return n=xv(n),xv(t)===n}function Ye(t,n,a,r,c,u){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||ir(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&ir(t,""+r);else return;break;case"className":ii(t,"class",r);break;case"tabIndex":ii(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ii(t,a,r);break;case"style":pm(t,r,u);return;case"data":if(n!=="object"){ii(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Dl(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(n!=="input"&&Ye(t,n,"name",c.name,c,null),Ye(t,n,"formEncType",c.formEncType,c,null),Ye(t,n,"formMethod",c.formMethod,c,null),Ye(t,n,"formTarget",c.formTarget,c,null)):(Ye(t,n,"encType",c.encType,c,null),Ye(t,n,"method",c.method,c,null),Ye(t,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Dl(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=Wi);return;case"onScroll":r!=null&&we("scroll",t);return;case"onScrollEnd":r!=null&&we("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Dl(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":we("beforetoggle",t),we("toggle",t),$e(t,"popover",r);break;case"xlinkActuate":Ne(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Ne(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Ne(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Ne(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Ne(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Ne(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Ne(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Ne(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Ne(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":$e(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=vS.get(a)||a,$e(t,a,r);else return}Ee=!0}function Wd(t,n,a,r,c,u){switch(a){case"style":pm(t,r,u);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")ir(t,r);else if(typeof r=="number"||typeof r=="bigint")ir(t,""+r);else return;break;case"onScroll":r!=null&&we("scroll",t);return;case"onScrollEnd":r!=null&&we("scrollend",t);return;case"onClick":r!=null&&(t.onclick=Wi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!xn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),u=a.slice(2,c?a.length-7:void 0),n=t[X]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(u,n,c),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(u,r,c);break t}Ee=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):$e(t,a,r)}return}Ee=!0}function Un(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":we("error",t),we("load",t);var r=!1,c=!1,u;for(u in a)if(a.hasOwnProperty(u)){var g=a[u];if(g!=null)switch(u){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ye(t,n,u,g,a,null)}}c&&Ye(t,n,"srcSet",a.srcSet,a,null),r&&Ye(t,n,"src",a.src,a,null);return;case"input":we("invalid",t);var C=u=g=c=null,F=null,nt=null;for(r in a)if(a.hasOwnProperty(r)){var dt=a[r];if(dt!=null)switch(r){case"name":c=dt;break;case"type":g=dt;break;case"checked":F=dt;break;case"defaultChecked":nt=dt;break;case"value":u=dt;break;case"defaultValue":C=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,n));break;default:Ye(t,n,r,dt,a,null)}}um(t,u,C,F,nt,g,c,!1);return;case"select":we("invalid",t),r=g=u=null;for(c in a)if(a.hasOwnProperty(c)&&(C=a[c],C!=null))switch(c){case"value":u=C;break;case"defaultValue":g=C;break;case"multiple":r=C;default:Ye(t,n,c,C,a,null)}n=u,a=g,t.multiple=!!r,n!=null?nr(t,!!r,n,!1):a!=null&&nr(t,!!r,a,!0);return;case"textarea":we("invalid",t),u=c=r=null;for(g in a)if(a.hasOwnProperty(g)&&(C=a[g],C!=null))switch(g){case"value":r=C;break;case"defaultValue":c=C;break;case"children":u=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:Ye(t,n,g,C,a,null)}dm(t,r,c,u);return;case"option":for(F in a)if(a.hasOwnProperty(F)&&(r=a[F],r!=null))switch(F){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Ye(t,n,F,r,a,null)}return;case"dialog":we("beforetoggle",t),we("toggle",t),we("cancel",t),we("close",t);break;case"iframe":case"object":we("load",t);break;case"video":case"audio":for(r=0;r<Zo.length;r++)we(Zo[r],t);break;case"image":we("error",t),we("load",t);break;case"details":we("toggle",t);break;case"embed":case"source":case"link":we("error",t),we("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(nt in a)if(a.hasOwnProperty(nt)&&(r=a[nt],r!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ye(t,n,nt,r,a,null)}return;default:if(ju(n)){for(dt in a)a.hasOwnProperty(dt)&&(r=a[dt],r!==void 0&&Wd(t,n,dt,r,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(r=a[C],r!=null&&Ye(t,n,C,r,a,null))}var $y={};function tM(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,u=null,g=null,C=null,F=null,nt=null,dt=null;for(ut in a){var _t=a[ut];if(a.hasOwnProperty(ut)&&_t!=null)switch(ut){case"checked":break;case"value":break;case"defaultValue":F=_t;default:r.hasOwnProperty(ut)||Ye(t,n,ut,null,r,_t)}}for(var Q in r){var ut=r[Q];if(_t=a[Q],r.hasOwnProperty(Q)&&(ut!=null||_t!=null))switch(Q){case"type":ut!==_t&&(Ee=!0),u=ut;break;case"name":ut!==_t&&(Ee=!0),c=ut;break;case"checked":ut!==_t&&(Ee=!0),nt=ut;break;case"defaultChecked":ut!==_t&&(Ee=!0),dt=ut;break;case"value":ut!==_t&&(Ee=!0),g=ut;break;case"defaultValue":ut!==_t&&(Ee=!0),C=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:ut!==_t&&Ye(t,n,Q,ut,r,_t)}}Xu(t,g,C,F,nt,dt,u,c);return;case"select":ut=g=C=Q=null;for(u in a)if(F=a[u],a.hasOwnProperty(u)&&F!=null)switch(u){case"value":break;case"multiple":ut=F;default:r.hasOwnProperty(u)||Ye(t,n,u,null,r,F)}for(c in r)if(u=r[c],F=a[c],r.hasOwnProperty(c)&&(u!=null||F!=null))switch(c){case"value":u!==F&&(Ee=!0),Q=u;break;case"defaultValue":u!==F&&(Ee=!0),C=u;break;case"multiple":u!==F&&(Ee=!0),g=u;default:u!==F&&Ye(t,n,c,u,r,F)}n=C,a=g,r=ut,Q!=null?nr(t,!!a,Q,!1):!!r!=!!a&&(n!=null?nr(t,!!a,n,!0):nr(t,!!a,a?[]:"",!1));return;case"textarea":ut=Q=null;for(C in a)if(c=a[C],a.hasOwnProperty(C)&&c!=null&&!r.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Ye(t,n,C,null,r,c)}for(g in r)if(c=r[g],u=a[g],r.hasOwnProperty(g)&&(c!=null||u!=null))switch(g){case"value":c!==u&&(Ee=!0),Q=c;break;case"defaultValue":c!==u&&(Ee=!0),ut=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==u&&Ye(t,n,g,c,r,u)}fm(t,Q,ut);return;case"option":for(var Lt in a)if(Q=a[Lt],a.hasOwnProperty(Lt)&&Q!=null&&!r.hasOwnProperty(Lt))switch(Lt){case"selected":t.selected=!1;break;default:Ye(t,n,Lt,null,r,Q)}for(F in r)if(Q=r[F],ut=a[F],r.hasOwnProperty(F)&&Q!==ut&&(Q!=null||ut!=null))switch(F){case"selected":Q!==ut&&(Ee=!0),t.selected=Q&&typeof Q!="function"&&typeof Q!="symbol";break;default:Ye(t,n,F,Q,r,ut)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Kt in a)Q=a[Kt],a.hasOwnProperty(Kt)&&Q!=null&&!r.hasOwnProperty(Kt)&&Ye(t,n,Kt,null,r,Q);for(nt in r)if(Q=r[nt],ut=a[nt],r.hasOwnProperty(nt)&&Q!==ut&&(Q!=null||ut!=null))switch(nt){case"children":case"dangerouslySetInnerHTML":if(Q!=null)throw Error(s(137,n));break;default:Ye(t,n,nt,Q,r,ut)}return;default:if(ju(n)){for(var ye in a)Q=a[ye],a.hasOwnProperty(ye)&&Q!==void 0&&!r.hasOwnProperty(ye)&&Wd(t,n,ye,void 0,r,Q);for(dt in r)Q=r[dt],ut=a[dt],!r.hasOwnProperty(dt)||Q===ut||Q===void 0&&ut===void 0||Wd(t,n,dt,Q,r,ut);return}}for(var tt in a)Q=a[tt],a.hasOwnProperty(tt)&&Q!=null&&!r.hasOwnProperty(tt)&&Ye(t,n,tt,null,r,Q);for(_t in r)Q=r[_t],ut=a[_t],!r.hasOwnProperty(_t)||Q===ut||Q==null&&ut==null||Ye(t,n,_t,Q,r,ut)}function Sv(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function eM(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],u=c.transferSize,g=c.initiatorType,C=c.duration;if(u&&C&&Sv(g)){for(g=0,C=c.responseEnd,r+=1;r<a.length;r++){var F=a[r],nt=F.startTime;if(nt>C)break;var dt=F.transferSize,_t=F.initiatorType;dt&&Sv(_t)&&(F=F.responseEnd,g+=dt*(F<C?1:(C-nt)/(F-nt)))}if(--r,n+=8*(u+g)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var jd=null,Yd=null;function Qo(t){return t.nodeType===9?t:t.ownerDocument}function yv(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Mv(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function bv(t,n,a,r){return a=Qo(a).createElement(t),a[A]=r,a[X]=n,Un(a,t,n),be(a),a}function qd(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Zd=null;function nM(){var t=window.event;return t&&t.type==="popstate"?t===Zd?!1:(Zd=t,!0):(Zd=null,!1)}var Kd=typeof setTimeout=="function"?setTimeout:void 0,iM=typeof clearTimeout=="function"?clearTimeout:void 0,Ev=typeof Promise=="function"?Promise:void 0,Tv=typeof requestAnimationFrame=="function"?requestAnimationFrame:Kd,aM=typeof queueMicrotask=="function"?queueMicrotask:typeof Ev<"u"?function(t){return Ev.resolve(null).then(t).catch(sM)}:Kd;function sM(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function Av(t,n){var a=n,r=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(c),Hr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")ah(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,ah(a);for(var u=a.firstChild;u;){var g=u.nextSibling,C=u.nodeName;u[Ut]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=g}}else a==="body"&&ah(t.ownerDocument.body);a=c}while(a);Hr(n)}function Rv(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function Cv(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var c=r=0;c<n.length;c++){var u=n[c];0<u.width&&0<u.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function wv(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function rM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function Qd(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return rM(n,a,t)}function oM(t){return t.documentElement.clientHeight}function lM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function cM(t,n,a,r,c,u,g,C,F){var nt=n.nodeType===9?n:n.ownerDocument;try{var dt=nt.startViewTransition({update:function(){var Q=nt.defaultView,ut=Q.navigation&&Q.navigation.transition,Lt=nt.fonts.status;r();var Kt=[];if(Lt==="loaded"&&(oM(nt),nt.fonts.status==="loading"&&Kt.push(nt.fonts.ready)),Lt=Kt.length,t!==null)for(var ye=t.suspenseyImages,tt=0,W=0;W<ye.length;W++){var rt=ye[W];if(!rt.complete){var xt=rt.getBoundingClientRect();if(0<xt.bottom&&0<xt.right&&xt.top<Q.innerHeight&&xt.left<Q.innerWidth){if(tt+=Kv(rt),tt>Fc){Kt.length=Lt;break}rt=new Promise(lM.bind(rt)),Kt.push(rt)}}}if(0<Kt.length)return Q=Promise.race([Promise.all(Kt),new Promise(function(Yt){return setTimeout(Yt,500)})]).then(c,c),(ut?Promise.allSettled([ut.finished,Q]):Q).then(u,u);if(c(),ut)return ut.finished.then(u,u);u()},types:a});nt.__reactViewTransition=dt;var _t=[];return dt.ready.then(function(){for(var Q=nt.documentElement.getAnimations({subtree:!0}),ut=0;ut<Q.length;ut++){var Lt=Q[ut],Kt=Lt.effect,ye=Kt.pseudoElement;if(ye!=null&&ye.startsWith("::view-transition")){_t.push(Lt),Lt=Kt.getKeyframes();for(var tt=ye=void 0,W=!0,rt=0;rt<Lt.length;rt++){var xt=Lt[rt],Yt=xt.width;if(ye===void 0)ye=Yt;else if(ye!==Yt){W=!1;break}if(Yt=xt.height,tt===void 0)tt=Yt;else if(tt!==Yt){W=!1;break}delete xt.width,delete xt.height,xt.transform==="none"&&delete xt.transform}W&&ye!==void 0&&tt!==void 0&&(Kt.setKeyframes(Lt),W=getComputedStyle(Kt.target,Kt.pseudoElement),W.width!==ye||W.height!==tt)&&(W=Lt[0],W.width=ye,W.height=tt,W=Lt[Lt.length-1],W.width=ye,W.height=tt,Kt.setKeyframes(Lt))}}g()},function(Q){nt.__reactViewTransition===dt&&(nt.__reactViewTransition=null);try{if(typeof Q=="object"&&Q!==null)switch(Q.name){case"InvalidStateError":(Q.message==="View transition was skipped because document visibility state is hidden."||Q.message==="Skipping view transition because document visibility state has become hidden."||Q.message==="Skipping view transition because viewport size changed."||Q.message==="Transition was aborted because of invalid state")&&(Q=null)}Q!==null&&F(Q)}finally{r(),c(),g()}}),dt.finished.finally(function(){for(var Q=0;Q<_t.length;Q++)_t[Q].cancel();nt.__reactViewTransition===dt&&(nt.__reactViewTransition=null),C()}),dt}catch{return r(),c(),g(),null}}function ks(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}ks.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:I({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},ks.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],c=0;c<a.length;c++){var u=a[c].effect;u!==null&&u.target===t&&u.pseudoElement===n&&r.push(a[c])}return r},ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Dv(t){return{name:t,group:new ks("group",t),imagePair:new ks("image-pair",t),old:new ks("old",t),new:new ks("new",t)}}function ui(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ui.prototype.addEventListener=function(t,n,a){var r=null,c=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var u=this._eventListeners;if(Uv(u,t,n,a)===-1){var g=this,C=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(C=function(F){g.removeEventListener(t,n,a),typeof n=="function"?n.call(this,F):n.handleEvent(F)}),r!==null&&(c=g.removeEventListener.bind(g,t,n,a),r.addEventListener("abort",c,{once:!0}),c=r.removeEventListener.bind(r,"abort",c)),r=Or(a),u.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:C,cleanup:c}),y(this._fragmentFiber.child,!1,uM,t,C,r)}this._eventListeners=u}};function uM(t,n,a,r){return S(t).addEventListener(n,a,r),!1}ui.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=Uv(r,t,n,a),n!==-1)){var c=r[n];a=c.attachedListener;var u=c.cleanup;c=Or(c.optionsOrUseCapture),y(this._fragmentFiber.child,!1,fM,t,a,c),r.splice(n,1),u!==null&&u()}};function fM(t,n,a,r){return S(t).removeEventListener(n,a,r),!1}function Or(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function Nv(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function Uv(t,n,a,r){if(t.length===0)return-1;r=Nv(r);for(var c=0;c<t.length;c++){var u=t[c];if(u.type===n&&u.listener===a&&Nv(u.optionsOrUseCapture)===r)return c}return-1}ui.prototype.dispatchEvent=function(t){var n=v(this._fragmentFiber);if(n===null)return!0;n=S(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var c=0;c<a.length;c++){var u=a[c];r.addEventListener(u.type,u.attachedListener,Or(u.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(c=0;c<a.length;c++)u=a[c],r.removeEventListener(u.type,u.attachedListener,Or(u.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},ui.prototype.focus=function(t){y(this._fragmentFiber.child,!0,Lv,t,void 0,void 0)};function Lv(t,n){return t.tag===6?!1:(t=S(t),bM(t,n))}ui.prototype.focusLast=function(t){var n=[];y(this._fragmentFiber.child,!0,Jd,n,void 0,void 0);for(var a=n.length-1;0<=a&&!Lv(n[a],t);a--);};function Jd(t,n){return n.push(t),!1}ui.prototype.blur=function(){var t=v(this._fragmentFiber);t!==null&&(t=S(t),t=Qo(t).activeElement,t!==null&&y(this._fragmentFiber.child,!1,dM,t,void 0,void 0))};function dM(t,n){return t.tag===6?!1:(t=S(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ui.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),y(this._fragmentFiber.child,!1,hM,t,void 0,void 0)};function hM(t,n){return t.tag===6||(t=S(t),n.observe(t)),!1}ui.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),y(this._fragmentFiber.child,!1,pM,t,void 0,void 0);for(var a=n=0;a<Pi.length;a++){var r=Pi[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Pi[n++]=r}Pi.length=n}};function pM(t,n){return t.tag===6||(t=S(t),n.unobserve(t)),!1}var Pi=[],$d=!1;function mM(t,n,a){Pi.push({fragmentInstance:t,observer:n,instance:a}),$d||($d=!0,EM(function(){$d=!1;var r=Pi;Pi=[];for(var c=0;c<r.length;c++){var u=r[c];u.observer.unobserve(u.instance)}}))}ui.prototype.getClientRects=function(){var t=[];return y(this._fragmentFiber.child,!1,gM,t,void 0,void 0),t};function gM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=S(t),n.push.apply(n,t.getClientRects());return!1}ui.prototype.getRootNode=function(t){var n=v(this._fragmentFiber);return n===null?this:S(n).getRootNode(t)},ui.prototype.compareDocumentPosition=function(t){var n=v(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];y(this._fragmentFiber.child,!1,Jd,a,void 0,void 0);var r=S(n);if(a.length===0){if(a=r,b(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var c=r=a.compareDocumentPosition(t);return a===t?c=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=R(n)[1],a===null?c=Node.DOCUMENT_POSITION_PRECEDING:(t=S(a).compareDocumentPosition(t),c=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),c|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=S(a[0]),c=S(a[a.length-1]);var u=b(this._fragmentFiber)?n.parentElement:r;if(u==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=u.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,u=u.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY;var g=n.compareDocumentPosition(t),C=c.compareDocumentPosition(t),F=g&Node.DOCUMENT_POSITION_CONTAINED_BY||C&Node.DOCUMENT_POSITION_CONTAINED_BY;return C=r&&u&&g&Node.DOCUMENT_POSITION_FOLLOWING&&C&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||u&&c===t||F||C?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!u&&c===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:g,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||vM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function vM(t,n,a,r,c){var u=le(c);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!u)t:{for(;u!==null;){if(u.tag===7&&(u===n||u.alternate===n)){a=!0;break t}u=u.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(u===null)return u=c.ownerDocument,c===u||c===u.documentElement||c===u.body;t:{for(u=n,n=v(n);u!==null;){if(!(u.tag!==5&&u.tag!==3&&u.tag!==27||u!==n&&u.alternate!==n)){u=!0;break t}u=u.return}u=!1}return u}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!u)&&!(n=u===a)&&(n=w(a,u,N),n===null?n=!1:(y(n,!0,V,u,a),u=x,x=null,n=u!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!u)&&!(n=u===r)&&(n=w(r,u,N),n===null?n=!1:(y(n,!0,D,u,r),u=x,U=x=null,n=u!==null)),n):!1}function Ov(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ui.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];y(this._fragmentFiber.child,!1,Jd,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=R(this._fragmentFiber);if(r=a?r[1]||r[0]||v(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=S(r),Ov(t,a);return}if(r=S(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var c=n[r];c.tag===6?(c=S(c),Ov(c,a)):S(c).scrollIntoView(t),r+=a?-1:1}};function xM(t,n){return t=S(t),Pv(t,n),!1}function Pv(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function Iv(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.addEventListener(c.type,c.attachedListener,Or(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){for(var g=0,C=0;C<Pi.length;C++){var F=Pi[C];(F.fragmentInstance!==n||F.observer!==u||F.instance!==t)&&(Pi[g++]=F)}Pi.length=g,u.observe(t)}),Pv(t,n))}function _M(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.removeEventListener(c.type,c.attachedListener,Or(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){typeof u.rootMargin=="string"?mM(n,u,t):u.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function th(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":th(a),Zt(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function SM(t,n,a,r){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Ut])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(u=t.getAttribute("rel"),u==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(u!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(u=t.getAttribute("src"),(u!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&u&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var u=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===u)return t}else return t;if(t=Ei(t.nextSibling),t===null)break}return null}function yM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Ei(t.nextSibling),t===null))return null;return t}function zv(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ei(t.nextSibling),t===null))return null;return t}function eh(t){return t.data==="$?"||t.data==="$~"}function nh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function MM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function Ei(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var ih=null;function Bv(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Ei(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Fv(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function bM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function EM(t){Tv(function(){Tv(function(n){return t(n)})})}function Hv(t,n,a){switch(n=Qo(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Gv(t,n,a){for(var r in a){var c=a[r];a.hasOwnProperty(r)&&c!=null&&Ye(t,n,r,null,$y,c)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Wi&&(t.onclick=null),Zt(t)}function ah(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Zt(t)}var Ti=new Map,Vv=new Set;function Jo(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var Aa=Gt.d;Gt.d={f:TM,r:AM,D:RM,C:CM,L:wM,m:DM,X:UM,S:NM,M:LM};function TM(){var t=Aa.f(),n=Dc();return t||n}function AM(t){var n=pe(t);n!==null&&n.tag===5&&n.type==="form"?Xg(n):Aa.r(t)}var Pr=typeof document>"u"?null:document;function kv(t,n,a){var r=Pr;if(r&&typeof n=="string"&&n){var c=vi(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),Vv.has(c)||(Vv.add(c),t={rel:t,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),Un(n,"link",t),be(n),r.head.appendChild(n)))}}function RM(t){Aa.D(t),kv("dns-prefetch",t,null)}function CM(t,n){Aa.C(t,n),kv("preconnect",t,n)}function wM(t,n,a){Aa.L(t,n,a);var r=Pr;if(r&&t&&n){var c='link[rel="preload"][as="'+vi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+vi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+vi(a.imageSizes)+'"]')):c+='[href="'+vi(t)+'"]';var u=c;switch(n){case"style":u=Ir(t);break;case"script":u=zr(t)}if(!(Ti.has(u)||(t=I({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ti.set(u,t),r.querySelector(c)!==null||n==="style"&&r.querySelector($o(u))||n==="script"&&r.querySelector(tl(u))))){var g=r.createElement("link");Un(g,"link",t),n==="style"&&(g[qt]=!0,g.onload=g.onerror=function(){Ke(g)}),be(g),r.head.appendChild(g)}}}function DM(t,n){Aa.m(t,n);var a=Pr;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+vi(r)+'"][href="'+vi(t)+'"]',u=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=zr(t)}if(!Ti.has(u)&&(t=I({rel:"modulepreload",href:t},n),Ti.set(u,t),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(tl(u)))return}r=a.createElement("link"),Un(r,"link",t),be(r),a.head.appendChild(r)}}}function NM(t,n,a){Aa.S(t,n,a);var r=Pr;if(r&&t){var c=Re(r).hoistableStyles,u=Ir(t);n=n||"default";var g=c.get(u);if(!g){var C={loading:0,preload:null};if(g=r.querySelector($o(u)))C.loading=5;else{t=I({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ti.get(u))&&sh(t,a);var F=g=r.createElement("link");be(F),Un(F,"link",t),F._p=new Promise(function(nt,dt){F.onload=nt,F.onerror=dt}),F.addEventListener("load",function(){C.loading|=1}),F.addEventListener("error",function(){C.loading|=2}),C.loading|=4,zc(g,n,r)}g={type:"stylesheet",instance:g,count:1,state:C},c.set(u,g)}}}function UM(t,n){Aa.X(t,n);var a=Pr;if(a&&t){var r=Re(a).hoistableScripts,c=zr(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=I({src:t,async:!0},n),(n=Ti.get(c))&&rh(t,n),u=a.createElement("script"),be(u),Un(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function LM(t,n){Aa.M(t,n);var a=Pr;if(a&&t){var r=Re(a).hoistableScripts,c=zr(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=I({src:t,async:!0,type:"module"},n),(n=Ti.get(c))&&rh(t,n),u=a.createElement("script"),be(u),Un(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function Xv(t,n,a,r){var c=(c=_e.current)?Jo(c):null;if(!c)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=Ir(a.href),n=Re(c).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Ir(a.href);var u=Re(c).hoistableStyles,g=u.get(t);if(g||(c=c.ownerDocument||c,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(t,g),(u=c.querySelector($o(t)))?u._p||(g.instance=u,g.state.loading=5):(u=Ti.get(t),u||(u={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ti.set(t,u)),OM(c,t,u,g.state))),n&&r===null)throw Error(s(528,""));return g}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=zr(a),n=Re(c).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Ir(t){return'href="'+vi(t)+'"'}function $o(t){return'link[rel="stylesheet"]['+t+"]"}function Wv(t){return I({},t,{"data-precedence":t.precedence,precedence:null})}function OM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[qt]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[qt]=!0,n.onload=n.onerror=Ke.bind(null,n),Un(n,"link",a),be(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function zr(t){return'[src="'+vi(t)+'"]'}function tl(t){return"script[async]"+t}function jv(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+vi(a.href)+'"]');if(r)return n.instance=r,be(r),r;var c=I({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),be(r),Un(r,"style",c),zc(r,a.precedence,t),n.instance=r;case"stylesheet":c=Ir(a.href);var u=t.querySelector($o(c));if(u)return n.state.loading|=4,n.instance=u,be(u),u;r=Wv(a),(c=Ti.get(c))&&sh(r,c),u=(t.ownerDocument||t).createElement("link"),be(u);var g=u;return g._p=new Promise(function(C,F){g.onload=C,g.onerror=F}),Un(u,"link",r),n.state.loading|=4,zc(u,a.precedence,t),n.instance=u;case"script":return u=zr(a.src),(c=t.querySelector(tl(u)))?(n.instance=c,be(c),c):(r=a,(c=Ti.get(u))&&(r=I({},a),rh(r,c)),t=t.ownerDocument||t,c=t.createElement("script"),be(c),Un(c,"link",r),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,zc(r,a.precedence,t));return n.instance}function zc(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,u=c,g=0;g<r.length;g++){var C=r[g];if(C.dataset.precedence===n)u=C;else if(u!==c)break}u?u.parentNode.insertBefore(t,u.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function sh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function rh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Bc=null;function Yv(t,n,a){if(Bc===null){var r=new Map,c=Bc=new Map;c.set(a,r)}else c=Bc,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var u=a[c];if(!(u[Ut]||u[A]||t==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var g=u.getAttribute(n)||"";g=t+g;var C=r.get(g);C?C.push(u):r.set(g,[u])}}return r}function oh(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function PM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function qv(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function Zv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Kv(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function Qv(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=Kv(n),t.suspenseyImages.push(n)),t=BM.bind(t),n.decode().then(t,t))}function IM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=Ir(r.href),u=n.querySelector($o(c));if(u){n=u._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=el.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=u,be(u);return}u=n.ownerDocument||n,r=Wv(r),(c=Ti.get(c))&&sh(r,c),u=u.createElement("link"),be(u);var g=u;g._p=new Promise(function(C,F){g.onload=C,g.onerror=F}),Un(u,"link",r),a.instance=u}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=el.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Fc=0;function zM(t,n){return t.stylesheets&&t.count===0&&Gc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&Gc(t,t.stylesheets),t.unsuspend){var u=t.unsuspend;t.unsuspend=null,u()}},6e4+n);0<t.imgBytes&&Fc===0&&(Fc=62500*eM());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Gc(t,t.stylesheets),t.unsuspend)){var u=t.unsuspend;t.unsuspend=null,u()}},(t.imgBytes>Fc?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function Jv(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Gc(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function el(){this.count--,Jv(this)}function BM(){this.imgCount--,Jv(this)}var Hc=null;function Gc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Hc=new Map,n.forEach(FM,t),Hc=null,el.call(t))}function FM(t,n){if(!(n.state.loading&4)){var a=Hc.get(t);if(a)var r=a.get(null);else{a=new Map,Hc.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<c.length;u++){var g=c[u];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),r=g)}r&&a.set(null,r)}c=n.instance,g=c.getAttribute("data-precedence"),u=a.get(g)||r,u===r&&a.set(null,c),a.set(g,c),this.count++,r=el.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),u?u.parentNode.insertBefore(c,u.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var Br={$$typeof:Y,Provider:null,Consumer:null,_currentValue:ze,_currentValue2:ze,_threadCount:0};function HM(t,n,a,r,c,u,g,C,F){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=er(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=er(0),this.hiddenUpdates=er(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=u,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=F,this.transitionTypes=null,this.incompleteTransitions=new Map}function $v(t,n,a,r,c,u,g,C,F,nt,dt,_t){return t=new HM(t,n,a,g,F,nt,dt,_t,C),n=1,u===!0&&(n|=24),u=Yn(3,null,null,n),t.current=u,u.stateNode=t,n=Mf(),n.refCount++,t.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:a,cache:n},Af(u),t}function tx(t){return t?(t=ur,t):ur}function ex(t,n,a,r,c,u){c=tx(c),r.context===null?r.context=c:r.pendingContext=c,r=qa(n),r.payload={element:a},u=u===void 0?null:u,u!==null&&(r.callback=u),a=Za(t,r,n),a!==null&&(Qn(a,t,n),Uo(a,t,n))}function nx(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function lh(t,n){nx(t,n),(t=t.alternate)&&nx(t,n)}function ix(t){if(t.tag===13||t.tag===31){var n=As(t,67108864);n!==null&&Qn(n,t,67108864),lh(t,67108864)}}function ax(t){if(t.tag===13||t.tag===31){var n=ci();n=mo(n);var a=As(t,n);a!==null&&Qn(a,t,n),lh(t,n)}}var Fr=!0;function GM(t,n,a,r){var c=Mt.T;Mt.T=null;var u=Gt.p;try{Gt.p=2,ch(t,n,a,r)}finally{Gt.p=u,Mt.T=c}}function VM(t,n,a,r){var c=Mt.T;Mt.T=null;var u=Gt.p;try{Gt.p=8,ch(t,n,a,r)}finally{Gt.p=u,Mt.T=c}}function ch(t,n,a,r){if(Fr){var c=uh(r);if(c===null)Xd(t,n,r,Vc,a),rx(t,r);else if(XM(c,t,n,a,r))r.stopPropagation();else if(rx(t,r),n&4&&-1<kM.indexOf(t)){for(;c!==null;){var u=pe(c);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var g=da(u.pendingLanes);if(g!==0){var C=u;for(C.pendingLanes|=2,C.entangledLanes|=2;g;){var F=1<<31-he(g);C.entanglements[1]|=F,g&=~F}ea(u),(Ve&6)===0&&(Rc=Xt()+500,qo(0))}}break;case 31:case 13:C=As(u,2),C!==null&&Qn(C,u,2),Dc(),lh(u,2)}if(u=uh(r),u===null&&Xd(t,n,r,Vc,a),u===c)break;c=u}c!==null&&r.stopPropagation()}else Xd(t,n,r,null,a)}}function uh(t){return t=qu(t),fh(t)}var Vc=null;function fh(t){if(Vc=null,t=le(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Vc=t,null}function sx(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(ae()){case de:return 2;case K:return 8;case At:case St:return 32;case Nt:return 268435456;default:return 32}default:return 32}}var dh=!1,os=null,ls=null,cs=null,nl=new Map,il=new Map,us=[],kM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function rx(t,n){switch(t){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":cs=null;break;case"pointerover":case"pointerout":nl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":il.delete(n.pointerId)}}function al(t,n,a,r,c,u){return t===null||t.nativeEvent!==u?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:u,targetContainers:[c]},n!==null&&(n=pe(n),n!==null&&ix(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function XM(t,n,a,r,c){switch(n){case"focusin":return os=al(os,t,n,a,r,c),!0;case"dragenter":return ls=al(ls,t,n,a,r,c),!0;case"mouseover":return cs=al(cs,t,n,a,r,c),!0;case"pointerover":var u=c.pointerId;return nl.set(u,al(nl.get(u)||null,t,n,a,r,c)),!0;case"gotpointercapture":return u=c.pointerId,il.set(u,al(il.get(u)||null,t,n,a,r,c)),!0}return!1}function ox(t){var n=le(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,Cl(t.priority,function(){ax(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Cl(t.priority,function(){ax(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function kc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=uh(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Yu=r,a.target.dispatchEvent(r),Yu=null}else return n=pe(a),n!==null&&ix(n),t.blockedOn=a,!1;n.shift()}return!0}function lx(t,n,a){kc(t)&&a.delete(n)}function WM(){dh=!1,os!==null&&kc(os)&&(os=null),ls!==null&&kc(ls)&&(ls=null),cs!==null&&kc(cs)&&(cs=null),nl.forEach(lx),il.forEach(lx)}function Xc(t,n){t.blockedOn===n&&(t.blockedOn=null,dh||(dh=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,WM)))}var Wc=null;function cx(t){Wc!==t&&(Wc=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Wc===t&&(Wc=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],c=t[n+2];if(typeof r!="function"){if(fh(r||a)===null)continue;break}var u=pe(a);u!==null&&(t.splice(n,3),n-=3,Yf(u,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function Hr(t){function n(F){return Xc(F,t)}os!==null&&Xc(os,t),ls!==null&&Xc(ls,t),cs!==null&&Xc(cs,t),nl.forEach(n),il.forEach(n);for(var a=0;a<us.length;a++){var r=us[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<us.length&&(a=us[0],a.blockedOn===null);)ox(a),a.blockedOn===null&&us.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],u=a[r+1],g=c[X]||null;if(typeof u=="function")g||cx(a);else if(g){var C=null;if(u&&u.hasAttribute("formAction")){if(c=u,g=u[X]||null)C=g.formAction;else if(fh(c)!==null)continue}else C=g.action;typeof C=="function"?a[r+1]=C:(a.splice(r,3),r-=3),cx(a)}}}function ux(){function t(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(g){return c=g})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function hh(t){this._internalRoot=t}jc.prototype.render=hh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ci();ex(a,r,t,n,null,null)},jc.prototype.unmount=hh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;ex(t.current,2,null,t,null,null),Dc(),n[ht]=null}};function jc(t){this._internalRoot=t}jc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Rl();t={blockedOn:null,target:t,priority:n};for(var a=0;a<us.length&&n!==0&&n<us[a].priority;a++);us.splice(a,0,t),a===0&&ox(t)}};var fx=e.version;if(fx!=="19.3.1")throw Error(s(527,fx,"19.3.1"));Gt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var jM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:Mt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yc.isDisabled&&Yc.supportsFiber)try{Qt=Yc.inject(jM),Vt=Yc}catch{}}return rl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",c=t0,u=e0,g=n0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=$v(t,1,!1,null,null,a,r,null,c,u,g,ux),t[ht]=n.current,kd(t),new hh(n)},rl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,c="",u=t0,g=e0,C=n0,F=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(F=a.formState)),n=$v(t,1,!0,n,a??null,r,c,F,u,g,C,ux),n.context=tx(null),a=n.current,r=ci(),r=mo(r),c=qa(r),c.callback=null,Za(a,c,r),a=r,n.current.lanes=a,ki(n,a),ea(n),t[ht]=n.current,kd(t),new jc(n)},rl.version="19.3.1",rl}var _x;function mb(){if(_x)return mh.exports;_x=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),mh.exports=pb(),mh.exports}var gb=mb();const vb=ZM(gb);function xb(o={}){const[e,i]=Rt.useState("connecting"),[s,l]=Rt.useState(null),f=Rt.useRef(o);return f.current=o,Rt.useEffect(()=>{let d=null,h=null,p=!1;function m(){if(!p){i("connecting");try{d=new EventSource("/api/stream"),d.onopen=()=>{p||i("live")},d.onerror=()=>{p||(i("offline"),d?.close(),h=setTimeout(m,3e3))},["memory_created","memory_updated","trap_logged","conflict_detected","conflict_resolved","action_created","action_claimed","action_completed","action_updated","sync_complete"].forEach(y=>{d?.addEventListener(y,v=>{try{const b=JSON.parse(v.data);l(new Date().toLocaleTimeString()),f.current.onEvent?.(y,b)}catch{}})})}catch{i("offline"),h=setTimeout(m,3e3)}}}return m(),()=>{p=!0,h&&clearTimeout(h),d&&d.close()}},[]),{status:e,lastEventTime:s}}function _b(){const[o,e]=Rt.useState(null),[i,s]=Rt.useState(6),l=Rt.useRef(null),f=Rt.useRef(null),d=()=>{l.current&&clearTimeout(l.current),f.current&&clearInterval(f.current),l.current=null,f.current=null},h=Rt.useCallback((m,_,y)=>{o&&o.execute().catch(console.error),d();const v={id:Math.random().toString(36).substring(7),label:m,execute:_,rollback:y};e(v),s(6),f.current=setInterval(()=>{s(b=>Math.max(0,b-1))},1e3),l.current=setTimeout(async()=>{d(),e(null);try{await _()}catch(b){console.error("Failed to commit action:",b),y()}},6e3)},[o]),p=Rt.useCallback(()=>{o&&(d(),o.rollback(),e(null))},[o]);return Rt.useEffect(()=>{const m=_=>{(_.ctrlKey||_.metaKey)&&_.key.toLowerCase()==="z"&&o&&(_.preventDefault(),p())};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[o,p]),{pendingAction:o,countdown:i,enqueue:h,undo:p}}const Sb=({pendingAction:o,countdown:e,onUndo:i})=>o?M.jsxs("div",{className:"toast-slide",style:{position:"fixed",bottom:"24px",left:"50%",zIndex:9999,background:"var(--surface)",border:"1px solid var(--border-strong)",borderRadius:"12px",boxShadow:"0 12px 32px rgba(0,0,0,0.3)",padding:"12px 20px",display:"flex",alignItems:"center",gap:"16px",color:"var(--text)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"var(--accent)",animation:"pulse 1s infinite"}}),M.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:o.label})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)"},children:["Auto-committing in ",e,"s"]}),M.jsxs("button",{onClick:i,style:{background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",borderRadius:"6px",padding:"5px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.15s ease"},children:[M.jsx(Xp,{size:13}),"Undo (Ctrl+Z)"]})]})]}):null,yb=({actions:o,edges:e,onSelectAction:i,onSeed:s})=>{const l=Rt.useRef(null),[f,d]=Rt.useState(!0),[h,p]=Rt.useState("all"),[m,_]=Rt.useState(!0),y=Rt.useRef([]),v=Rt.useRef({x:0,y:0,k:1}),b=Rt.useRef({isDragging:!1,dragNode:null,startMouse:{x:0,y:0},startTransform:{x:0,y:0}}),R=Rt.useCallback(()=>{_(!0)},[]);Rt.useEffect(()=>{const N=l.current;if(!N)return;const w=N.getBoundingClientRect(),I=w.width/2,T=w.height/2,P=o.filter(L=>h==="all"?!0:h==="frontier"?L.isFrontier:L.status===h);y.current=P.map((L,G)=>{const Z=G/Math.max(1,P.length)*Math.PI*2,J=120+G%3*60;return{id:L.id,action:L,x:I+Math.cos(Z)*J,y:T+Math.sin(Z)*J,vx:0,vy:0,radius:L.isFrontier?20:16}}),R()},[o,h,R]),Rt.useEffect(()=>{const N=l.current;if(!N)return;const w=N.getContext("2d");if(!w)return;let I;const T=()=>{const L=N.parentElement?.getBoundingClientRect();if(!L)return;const G=window.devicePixelRatio||1;N.width=Math.round(L.width*G),N.height=Math.round(L.height*G),N.style.width=`${L.width}px`,N.style.height=`${L.height}px`,R()};T(),window.addEventListener("resize",T);const P=()=>{const L=y.current,G=v.current,Z=window.devicePixelRatio||1,J=N.width/Z,H=N.height/Z;let Y=0;if(f&&m){for(let z=0;z<L.length;z++)for(let k=z+1;k<L.length;k++){const $=L[k].x-L[z].x,j=L[k].y-L[z].y,at=Math.hypot($,j)||1;if(at<200){const ot=(200-at)/at*.4;L[z].vx-=$*ot*.05,L[z].vy-=j*ot*.05,L[k].vx+=$*ot*.05,L[k].vy+=j*ot*.05}}for(const z of e){const k=L.find(j=>j.id===z.source_action_id),$=L.find(j=>j.id===z.target_action_id);if(k&&$){const j=$.x-k.x,at=$.y-k.y,ot=z.edge_type==="conflicts_with"?.001:.0035;k.vx+=j*ot,k.vy+=at*ot,$.vx-=j*ot,$.vy-=at*ot}}for(const z of L)if(z!==b.current.dragNode){z.x+=z.vx,z.y+=z.vy,z.vx*=.85,z.vy*=.85;const k=Math.hypot(z.vx,z.vy);k>Y&&(Y=k)}Y<.04&&!b.current.isDragging&&_(!1)}w.save(),w.scale(Z,Z),w.clearRect(0,0,J,H),w.translate(G.x,G.y),w.scale(G.k,G.k);for(const z of e){const k=L.find(j=>j.id===z.source_action_id),$=L.find(j=>j.id===z.target_action_id);if(k&&$)if(w.beginPath(),z.edge_type==="conflicts_with")w.setLineDash([5,4]),w.strokeStyle="#f43f5e",w.lineWidth=2,w.moveTo(k.x,k.y),w.lineTo($.x,$.y),w.stroke(),w.setLineDash([]);else{w.setLineDash([]),w.strokeStyle="#38bdf8",w.lineWidth=1.8,w.moveTo(k.x,k.y),w.lineTo($.x,$.y),w.stroke();const j=Math.atan2(k.y-$.y,k.x-$.x),at=k.radius+3,ot=k.x-Math.cos(j)*at,zt=k.y-Math.sin(j)*at;w.beginPath(),w.moveTo(ot,zt),w.lineTo(ot-8*Math.cos(j-Math.PI/6),zt-8*Math.sin(j-Math.PI/6)),w.lineTo(ot-8*Math.cos(j+Math.PI/6),zt-8*Math.sin(j+Math.PI/6)),w.fillStyle="#38bdf8",w.fill()}}for(const z of L){const k=z.action;if(k.isFrontier){const at=(Math.sin(Date.now()/240)+1)*4;w.beginPath(),w.arc(z.x,z.y,z.radius+at+3,0,Math.PI*2),w.fillStyle="rgba(56, 189, 248, 0.22)",w.fill(),w.strokeStyle="#38bdf8",w.lineWidth=2,w.stroke()}w.beginPath(),w.arc(z.x,z.y,z.radius,0,Math.PI*2),k.isFrontier?w.fillStyle="#0284c7":k.status==="done"?w.fillStyle="#10b981":k.status==="active"?w.fillStyle="#3b82f6":k.status==="blocked"?w.fillStyle="#64748b":w.fillStyle="#8b5cf6",w.fill(),w.strokeStyle="#090d16",w.lineWidth=2.5,w.stroke(),w.fillStyle="#f8fafc",w.font='11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',w.textAlign="center";const $=`[P${k.priority}] ${k.title}`,j=$.length>20?$.slice(0,18)+"...":$;w.fillText(j,z.x,z.y+z.radius+14)}w.restore(),I=requestAnimationFrame(P)};return I=requestAnimationFrame(P),()=>{cancelAnimationFrame(I),window.removeEventListener("resize",T)}},[e,f,m,R]);const O=N=>{R();const w=l.current;if(!w)return;const I=w.getBoundingClientRect(),T=(N.clientX-I.left-v.current.x)/v.current.k,P=(N.clientY-I.top-v.current.y)/v.current.k,L=y.current.find(G=>Math.hypot(G.x-T,G.y-P)<G.radius+6);b.current={isDragging:!0,dragNode:L||null,startMouse:{x:N.clientX,y:N.clientY},startTransform:{...v.current}}},S=N=>{const{isDragging:w,dragNode:I,startMouse:T,startTransform:P}=b.current;if(w)if(R(),I){const L=l.current;if(!L)return;const G=L.getBoundingClientRect();I.x=(N.clientX-G.left-v.current.x)/v.current.k,I.y=(N.clientY-G.top-v.current.y)/v.current.k,I.vx=0,I.vy=0}else v.current.x=P.x+(N.clientX-T.x),v.current.y=P.y+(N.clientY-T.y)},x=N=>{const{dragNode:w,startMouse:I}=b.current,T=Math.hypot(N.clientX-I.x,N.clientY-I.y);w&&T<6&&i(w.action),b.current.isDragging=!1,b.current.dragNode=null},U=N=>{N.preventDefault(),R();const w=N.deltaY<0?1.15:.88;v.current.k=Math.max(.25,Math.min(3.5,v.current.k*w))},V=N=>{R(),v.current.k=Math.max(.25,Math.min(3.5,v.current.k*N))},D=()=>{R(),v.current={x:0,y:0,k:1}};return M.jsxs("div",{style:{position:"relative",width:"100%",height:"580px",background:"var(--surface)",borderRadius:"12px",border:"1px solid var(--border)",overflow:"hidden"},children:[M.jsxs("div",{style:{position:"absolute",top:"16px",left:"16px",right:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10,pointerEvents:"none"},children:[M.jsx("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:["all","frontier","active","blocked","done"].map(N=>M.jsxs("button",{onClick:()=>{p(N),R()},className:`btn btn-pill ${h===N?"btn-primary":""}`,style:{textTransform:"capitalize"},children:[N==="frontier"&&M.jsx(dx,{size:12}),N]},N))}),M.jsxs("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:[M.jsxs("button",{onClick:()=>{d(!f),R()},className:"btn",children:[f?M.jsx(R_,{size:14}):M.jsx(C_,{size:14}),f?"Pause":"Play"]}),M.jsx("button",{onClick:()=>V(1.2),className:"btn",title:"Zoom in",children:M.jsx(KM,{size:14})}),M.jsx("button",{onClick:()=>V(.8),className:"btn",title:"Zoom out",children:M.jsx(QM,{size:14})}),M.jsx("button",{onClick:D,className:"btn",title:"Reset view",children:M.jsx(Xp,{size:14})})]})]}),M.jsx("canvas",{ref:l,onMouseDown:O,onMouseMove:S,onMouseUp:x,onWheel:U,style:{width:"100%",height:"100%",cursor:"grab"}}),o.length===0&&M.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px",zIndex:5,background:"rgba(9, 9, 11, 0.85)",backdropFilter:"blur(6px)",textAlign:"center",padding:"24px"},children:[M.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"10px",background:"var(--accent-weak)",border:"1px solid rgba(56, 189, 248, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)",fontSize:"22px"},children:"⚡"}),M.jsxs("div",{children:[M.jsx("h3",{style:{fontSize:"16px",fontWeight:700,color:"var(--text)",letterSpacing:"-0.2px"},children:"Action DAG Queue Is Currently Empty"}),M.jsxs("p",{style:{fontSize:"13px",color:"var(--text-muted)",maxWidth:"460px",marginTop:"6px",lineHeight:"1.5"},children:["The Action DAG coordinates distributed autonomous multi-agent task dependencies with topological frontier scheduling. Agents claim and execute tasks via ",M.jsx("code",{children:"fastr_claim"})," and ",M.jsx("code",{children:"fastr_frontier"}),"."]})]}),s&&M.jsxs("button",{onClick:s,className:"btn btn-primary",style:{marginTop:"8px",padding:"7px 16px",fontSize:"12px"},children:[M.jsx(dx,{size:14})," Seed Example 3-Agent Workflow"]})]}),M.jsxs("div",{style:{position:"absolute",bottom:"14px",left:"16px",display:"flex",gap:"16px",fontSize:"11px",color:"var(--text-muted)",zIndex:10,background:"rgba(0,0,0,0.5)",padding:"6px 14px",borderRadius:"8px",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.08)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#0284c7",boxShadow:"0 0 8px #38bdf8"}}),M.jsx("span",{children:"Frontier (Unblocked)"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#3b82f6"}}),M.jsx("span",{children:"Active"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#64748b"}}),M.jsx("span",{children:"Blocked"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#10b981"}}),M.jsx("span",{children:"Done"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{color:"#f43f5e",fontWeight:"bold"},children:"- - -"}),M.jsx("span",{children:"Mutex Lock"})]})]})]})};function Sx(o,e,i,s,l){const f=o.length,d=[];if(!f)return d;let h=0;for(const y of o)h+=y;if(h<=0)return o.map(()=>({x:e,y:i,w:0,h:0}));const p=o.map(y=>y*(s*l)/h),m=(y,v,b,R)=>{const O=y*y,S=R*R;return Math.max(S*b/O,O/(S*v))};let _=0;for(;_<f;){const y=Math.min(s,l);if(y<=0){for(;_<f;_++)d.push({x:e,y:i,w:0,h:0});break}let v=p[_],b=p[_],R=p[_],O=m(v,b,R,y),S=_+1;for(;S<f;){const U=v+p[S],V=Math.min(b,p[S]),D=Math.max(R,p[S]),N=m(U,V,D,y);if(N>O)break;v=U,b=V,R=D,O=N,S++}const x=v/y;if(s>=l){let U=i;for(let V=_;V<S;V++){const D=p[V]/x;d.push({x:e,y:U,w:x,h:D}),U+=D}e+=x,s-=x}else{let U=e;for(let V=_;V<S;V++){const D=p[V]/x;d.push({x:U,y:i,w:D,h:x}),U+=D}i+=x,l-=x}_=S}return d}const pi=({text:o,label:e,className:i=""})=>{const[s,l]=Rt.useState(!1),f=async d=>{d.stopPropagation();try{await navigator.clipboard.writeText(o),l(!0),setTimeout(()=>l(!1),1800)}catch{const h=document.createElement("textarea");h.value=o,document.body.appendChild(h),h.select(),document.execCommand("copy"),document.body.removeChild(h),l(!0),setTimeout(()=>l(!1),1800)}};return M.jsxs("button",{onClick:f,title:"Copy to clipboard",className:`copy-btn ${i}`,style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:e?"3px 8px":"4px",fontSize:"11px",fontFamily:"var(--font-mono)",borderRadius:"4px",border:"1px solid var(--border)",background:s?"var(--success-weak)":"var(--surface)",color:s?"var(--success)":"var(--text-muted)",cursor:"pointer",transition:"all 0.15s ease"},children:[s?M.jsx(Jh,{size:12}):M.jsx(JM,{size:12}),e&&M.jsx("span",{children:s?"Copied!":e})]})},Mb=({memories:o,onSelectMemory:e})=>{const[i,s]=Rt.useState("treemap"),l=Rt.useRef(null),f=Rt.useRef(null),[d,h]=Rt.useState(null),[p,m]=Rt.useState(null),_=Rt.useRef([]),y=Rt.useRef([]),v=Rt.useMemo(()=>{const S=new Map;for(const x of o){const U=x.module||"general";S.has(U)||S.set(U,[]),S.get(U).push(x)}return Array.from(S.entries()).map(([x,U])=>({module:x,items:U,count:U.length})).sort((x,U)=>U.count-x.count)},[o]),b=Rt.useCallback(()=>{if(i!=="treemap")return;const S=f.current,x=l.current;if(!S||!x)return;const U=S.getContext("2d");if(!U)return;const V=x.clientWidth||800,D=500,N=window.devicePixelRatio||1;if(S.width=Math.round(V*N),S.height=Math.round(D*N),S.style.width=`${V}px`,S.style.height=`${D}px`,U.save(),U.scale(N,N),U.clearRect(0,0,V,D),v.length===0){U.fillStyle="#64748b",U.font="14px -apple-system, sans-serif",U.textAlign="center",U.fillText("No memory clusters indexed yet. Record a rule or run git-learn.",V/2,D/2),U.restore();return}const w=8,I=v.map(L=>Math.max(1,L.count)),T=Sx(I,w,w,V-2*w,D-2*w);_.current=v.map((L,G)=>({...T[G],module:L.module,items:L.items}));const P=[];for(const L of _.current){if(L.w<=4||L.h<=4)continue;const G=d?.module===L.module;U.save(),U.beginPath(),U.rect(L.x,L.y,L.w,L.h),U.clip(),U.fillStyle=G?"rgba(56, 189, 248, 0.08)":"rgba(255, 255, 255, 0.02)",U.fillRect(L.x,L.y,L.w,L.h),U.strokeStyle=G?"#38bdf8":"rgba(255, 255, 255, 0.1)",U.lineWidth=G?2:1,U.strokeRect(L.x,L.y,L.w,L.h);const Z=Math.min(26,Math.max(16,L.h*.22));if(U.fillStyle=G?"rgba(56, 189, 248, 0.18)":"rgba(255, 255, 255, 0.05)",U.fillRect(L.x,L.y,L.w,Z),U.fillStyle=G?"#38bdf8":"#e2e8f0",U.font="bold 11px -apple-system, sans-serif",U.textAlign="left",U.textBaseline="middle",L.w>40){const k=L.module.toUpperCase();U.fillText(`${k} (${L.items.length})`,L.x+8,L.y+Z/2)}const J=L.y+Z+4,H=L.h-Z-8,Y=L.w-8,z=L.x+4;if(H>10&&Y>10&&L.items.length>0){const k=L.items.map(j=>j.pinned?2:j.kind==="error_trap"?1.5:1),$=Sx(k,z,J,Y,H);L.items.forEach((j,at)=>{const ot=$[at];if(!ot||ot.w<=2||ot.h<=2)return;P.push({...ot,item:j,module:L.module});const zt=p?.item.id===j.id;let wt="#10b981";if(j.pinned?wt="#8b5cf6":j.kind==="error_trap"?wt="#f59e0b":j.reward_score>=.7?wt="#0284c7":j.reward_score<.3&&(wt="#64748b"),U.save(),U.beginPath(),U.rect(ot.x+1,ot.y+1,ot.w-2,ot.h-2),U.clip(),U.fillStyle=zt?wt:`${wt}33`,U.fillRect(ot.x+1,ot.y+1,ot.w-2,ot.h-2),U.strokeStyle=zt?"#ffffff":wt,U.lineWidth=zt?2:1,U.strokeRect(ot.x+1,ot.y+1,ot.w-2,ot.h-2),ot.w>65&&ot.h>24){U.fillStyle=zt?"#ffffff":"#f8fafc",U.font="500 10px -apple-system, sans-serif",U.textAlign="left",U.textBaseline="top";const se=j.kind==="error_trap"?`⚠️ ${j.title}`:j.title;U.fillText(se,ot.x+6,ot.y+6,ot.w-12)}U.restore()})}U.restore()}y.current=P,U.restore()},[i,v,d,p]);Rt.useEffect(()=>{b();const S=()=>b();return window.addEventListener("resize",S),()=>window.removeEventListener("resize",S)},[b]);const R=S=>{const x=f.current;if(!x)return;const U=x.getBoundingClientRect(),V=S.clientX-U.left,D=S.clientY-U.top,N=y.current.find(I=>V>=I.x&&V<=I.x+I.w&&D>=I.y&&D<=I.y+I.h);if(N){m(N);const I=_.current.find(T=>T.module===N.module);h(I||null);return}m(null);const w=_.current.find(I=>V>=I.x&&V<=I.x+I.w&&D>=I.y&&D<=I.y+I.h);h(w||null)},O=()=>{p?e(p.item):d&&d.items.length>0&&e(d.items[0])};return M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsxs("div",{children:[M.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(hx,{size:16,color:"var(--accent)"}),"Nested Cognitive Memory Treemap"]}),M.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Interactive nested squarified clusters: Pinned (violet), 2.0x Error Traps (amber), Strong (blue), Active (green), Fading (slate)."})]}),M.jsxs("div",{style:{display:"flex",gap:"8px"},children:[M.jsxs("button",{onClick:()=>s("treemap"),className:`btn btn-pill ${i==="treemap"?"btn-primary":""}`,children:[M.jsx(hx,{size:13})," Treemap Canvas"]}),M.jsxs("button",{onClick:()=>s("table"),className:`btn btn-pill ${i==="table"?"btn-primary":""}`,children:[M.jsx($M,{size:13})," Table Twin"]})]})]}),i==="treemap"?M.jsxs("div",{ref:l,style:{width:"100%",height:"520px",position:"relative",padding:"12px",boxSizing:"border-box"},children:[M.jsx("canvas",{ref:f,onMouseMove:R,onMouseLeave:()=>{h(null),m(null)},onClick:O,style:{width:"100%",height:"100%",display:"block",cursor:p||d?"pointer":"default"}}),(p||d)&&M.jsxs("div",{style:{position:"absolute",bottom:"20px",left:"20px",right:"20px",background:"rgba(15, 23, 42, 0.95)",border:"1px solid var(--accent)",borderRadius:"8px",padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 8px 24px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",zIndex:20},children:[M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--accent)",fontWeight:700,textTransform:"uppercase"},children:p?`${p.module} &bull; ${p.item.id}`:`${d?.module} Module`}),p?.item.kind==="error_trap"&&M.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0x TRAP"}),p?.item.pinned===1&&M.jsx("span",{className:"badge-tag",style:{background:"rgba(139, 92, 246, 0.15)",color:"#8b5cf6"},children:"PINNED"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginTop:"2px",color:"#fff"},children:p?p.item.title:`${d?.items.length} Memories Cluster`})]}),M.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Click to open inspector"}),p&&M.jsx(pi,{text:p.item.id,label:"Copy ID"})]})]})]}):M.jsx("div",{style:{overflowX:"auto"},children:M.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},"aria-rowcount":o.length,children:[M.jsx("thead",{children:M.jsxs("tr",{style:{background:"var(--bg-subtle)",textAlign:"left",borderBottom:"1px solid var(--border)"},children:[M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"ID"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Title"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Module"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Kind"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Score"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Actions"})]})}),M.jsx("tbody",{children:o.map((S,x)=>M.jsxs("tr",{onClick:()=>e(S),style:{borderBottom:"1px solid var(--border)",cursor:"pointer",background:x%2===0?"transparent":"var(--bg-subtle)"},children:[M.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)",fontSize:"12px"},children:S.id}),M.jsx("td",{style:{padding:"10px 16px",fontWeight:500},children:S.title}),M.jsx("td",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:S.module}),M.jsx("td",{style:{padding:"10px 16px"},children:M.jsx("span",{className:"badge-tag",style:{background:S.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:S.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:S.kind.toUpperCase()})}),M.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)"},children:S.reward_score}),M.jsx("td",{style:{padding:"10px 16px"},children:M.jsx(pi,{text:S.id,label:"ID"})})]},S.id))})]})})]})},bb=()=>{const[o,e]=Rt.useState("jwt expiration"),[i,s]=Rt.useState(!1),[l,f]=Rt.useState(null);return Rt.useEffect(()=>{if(!o.trim()){f(null);return}s(!0);const d=setTimeout(()=>{fetch(`/api/search/explain?q=${encodeURIComponent(o)}`).then(h=>h.json()).then(h=>{f(h),s(!1)}).catch(()=>s(!1))},200);return()=>clearTimeout(d)},[o]),M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)"},children:[M.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(tb,{size:16,color:"var(--accent)"}),"Live Triple-Stream RRF Search Diagnostic"]}),M.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Real backend query execution across FTS5 (BM25), Vector Cosine, and Spreading Activation graph with 2.0x trap boosting."}),M.jsxs("div",{style:{marginTop:"14px",position:"relative"},children:[M.jsx($h,{size:15,style:{position:"absolute",left:"12px",top:"10px",color:"var(--text-muted)"}}),M.jsx("input",{type:"text",value:o,onChange:d=>e(d.target.value),placeholder:"Type query to trigger live RRF multi-stream fusion...",style:{width:"100%",padding:"8px 12px 8px 36px",borderRadius:"8px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text)",fontSize:"13px",outline:"none"}})]})]}),M.jsxs("div",{style:{padding:"20px"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px",marginBottom:"20px"},children:[M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#38bdf8",fontWeight:600},children:[M.jsx($h,{size:14})," Stream A: FTS5 BM25"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.15,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"SQLite Full-Text Token Index"})]}),M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#a855f7",fontWeight:600},children:[M.jsx(eb,{size:14})," Stream B: Vector Cosine"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.45,l.totalTimeMs*.6).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Local In-Process Embeddings"})]}),M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#34d399",fontWeight:600},children:[M.jsx(nb,{size:14})," Stream C: Graph Spreading"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.2,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"2-Hop Causal Link Expansion"})]})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:"8px",background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",fontSize:"12px",fontFamily:"var(--font-mono)",marginBottom:"20px"},children:[M.jsxs("span",{children:["Total Pipeline Latency: ",M.jsx("b",{children:l?`${l.totalTimeMs} ms`:"—"})," (Budget: ",l?.totalTokens||0," tokens)"]}),M.jsx(pi,{text:`fastrmemory recall "${o}"`,label:"Copy Recall CLI"})]}),M.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:i?M.jsx("div",{className:"skeleton-box",style:{height:"120px"}}):!l||l.results.length===0?M.jsx("div",{style:{textAlign:"center",padding:"30px",color:"var(--text-muted)",fontSize:"13px"},children:"No memories matched this query in the live SQLite index."}):l.results.map((d,h)=>{const p=d.kind==="error_trap";return M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${p?"var(--trap)":"var(--accent)"}`},children:[M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:"var(--accent)"},children:["#",h+1]}),M.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:d.title}),p&&M.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0X TRAP BOOST"})]}),M.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:[M.jsx("code",{children:d.id})," • Module: ",M.jsx("b",{children:d.module})," • Ranks: [A: ",d.rankA??"—",", B: ",d.rankB??"—",", C: ",d.rankC??"—","]"]})]}),M.jsxs("div",{style:{textAlign:"right",display:"flex",alignItems:"center",gap:"14px"},children:[M.jsxs("div",{children:[M.jsx("div",{style:{fontSize:"13px",fontWeight:700,fontFamily:"var(--font-mono)"},children:d.score.toFixed(4)}),M.jsx("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:"Fused Score"})]}),M.jsx(pi,{text:d.id,label:"ID"})]})]},d.id)})})]})]})},Eb=({conflict:o,memoryA:e,memoryB:i,onResolve:s})=>{const l=Rt.useMemo(()=>{const f=(e?.content||"").split(`
`),d=(i?.content||"").split(`
`),h=[],p=Math.max(f.length,d.length);for(let m=0;m<p;m++){const _=f[m],y=d[m];_===y?_!==void 0&&h.push({type:"same",text:_}):(_!==void 0&&h.push({type:"removed",text:_}),y!==void 0&&h.push({type:"added",text:y}))}return h},[e,i]);return M.jsxs("div",{className:"card-panel",style:{padding:"18px",marginBottom:"14px",borderLeft:"4px solid var(--risk)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{className:"badge-tag",style:{background:"var(--risk-weak)",color:"var(--risk)"},children:[M.jsx(w_,{size:12})," CONFLICT #",o.id," (",(o.score*100).toFixed(0),"%)"]}),M.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:o.reason})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:o.created_at}),M.jsx(pi,{text:`# Conflict ${o.id}
Memory A: ${o.memory_a_id}
Memory B: ${o.memory_b_id}
Reason: ${o.reason}`,label:"Copy Report"})]})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"},children:[M.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--accent)"},children:["MEMORY A: ",M.jsx("code",{children:o.memory_a_id})]}),M.jsx(pi,{text:o.memory_a_id,label:"ID"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:e?.title||"Memory A"}),M.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:e?.content||"Loading content..."})]}),M.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--risk)"},children:["MEMORY B: ",M.jsx("code",{children:o.memory_b_id})]}),M.jsx(pi,{text:o.memory_b_id,label:"ID"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:i?.title||"Memory B"}),M.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:i?.content||"Loading content..."})]})]}),M.jsx("div",{style:{background:"var(--bg)",borderRadius:"8px",border:"1px solid var(--border)",padding:"10px",fontFamily:"var(--font-mono)",fontSize:"12px",marginBottom:"14px",maxHeight:"160px",overflowY:"auto"},children:l.map((f,d)=>M.jsxs("div",{style:{padding:"2px 8px",borderRadius:"2px",background:f.type==="added"?"rgba(34, 197, 94, 0.12)":f.type==="removed"?"rgba(244, 63, 94, 0.12)":"transparent",color:f.type==="added"?"#4ade80":f.type==="removed"?"#fb7185":"var(--text-muted)",display:"flex",gap:"8px"},children:[M.jsx("span",{style:{userSelect:"none",width:"16px",color:"var(--text-faint)"},children:f.type==="added"?"+":f.type==="removed"?"-":" "}),M.jsx("span",{children:f.text})]},d))}),M.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[M.jsxs("button",{onClick:()=>s(o.id,o.memory_a_id,!0),className:"btn btn-primary",children:[M.jsx(Jh,{size:14})," Keep A (",o.memory_a_id,")"]}),M.jsxs("button",{onClick:()=>s(o.id,o.memory_b_id,!0),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)"},children:[M.jsx(Jh,{size:14})," Keep B (",o.memory_b_id,")"]}),M.jsx("button",{onClick:()=>s(o.id,o.memory_a_id,!1),className:"btn",children:"Keep Both (Weaken B Score)"})]})]})},Tb=({content:o,className:e,style:i})=>{if(!o)return null;const s=o.split(`
`),l=[];let f=!1,d=[],h="";const p=m=>m.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((y,v)=>y.startsWith("`")&&y.endsWith("`")?M.jsx("code",{style:{background:"var(--bg-subtle)",padding:"2px 6px",borderRadius:"4px",fontFamily:"var(--font-mono)",fontSize:"0.9em",color:"var(--accent)",border:"1px solid var(--border)"},children:y.slice(1,-1)},v):y.startsWith("**")&&y.endsWith("**")?M.jsx("strong",{style:{color:"var(--text-strong)",fontWeight:600},children:y.slice(2,-2)},v):y.startsWith("*")&&y.endsWith("*")?M.jsx("em",{children:y.slice(1,-1)},v):y);for(let m=0;m<s.length;m++){const _=s[m];if(_.trim().startsWith("```")){if(f){const v=d.join(`
`);l.push(M.jsxs("div",{style:{position:"relative",margin:"10px 0",borderRadius:"8px",background:"var(--bg-code, #0b0f19)",border:"1px solid var(--border)",overflow:"hidden"},children:[h&&M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 12px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid var(--border)",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[M.jsx("span",{children:h}),M.jsx(pi,{text:v,label:"Copy"})]}),M.jsx("pre",{style:{margin:0,padding:"12px 14px",fontFamily:"var(--font-mono)",fontSize:"12px",lineHeight:1.5,color:"#e2e8f0",overflowX:"auto"},children:M.jsx("code",{children:v})})]},`code-${m}`)),d=[],h="",f=!1}else f=!0,h=_.trim().slice(3).trim();continue}if(f){d.push(_);continue}if(_.startsWith("### ")){l.push(M.jsx("h4",{style:{fontSize:"14px",fontWeight:700,margin:"14px 0 6px 0",color:"var(--text-strong)"},children:p(_.slice(4))},`h4-${m}`));continue}if(_.startsWith("## ")){l.push(M.jsx("h3",{style:{fontSize:"15px",fontWeight:700,margin:"16px 0 8px 0",color:"var(--text-strong)"},children:p(_.slice(3))},`h3-${m}`));continue}if(_.startsWith("# ")){l.push(M.jsx("h2",{style:{fontSize:"17px",fontWeight:800,margin:"18px 0 10px 0",color:"var(--text-strong)"},children:p(_.slice(2))},`h2-${m}`));continue}if(_.trim().startsWith("- ")||_.trim().startsWith("* ")){l.push(M.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[M.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"•"}),M.jsx("div",{children:p(_.trim().slice(2))})]},`li-${m}`));continue}const y=_.trim().match(/^(\d+)\.\s+(.*)$/);if(y){l.push(M.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[M.jsxs("span",{style:{color:"var(--accent)",fontWeight:600,fontFamily:"var(--font-mono)"},children:[y[1],"."]}),M.jsx("div",{children:p(y[2])})]},`ol-${m}`));continue}if(_.trim().startsWith("> ")){l.push(M.jsx("blockquote",{style:{margin:"8px 0",padding:"6px 12px",borderLeft:"3px solid var(--accent)",background:"var(--accent-weak)",borderRadius:"0 6px 6px 0",fontSize:"12px",color:"var(--text)"},children:p(_.trim().slice(2))},`quote-${m}`));continue}if(!_.trim()){l.push(M.jsx("div",{style:{height:"8px"}},`sp-${m}`));continue}l.push(M.jsx("p",{style:{margin:"4px 0",fontSize:"13px",lineHeight:1.55,color:"var(--text)"},children:p(_)},`p-${m}`))}return M.jsx("div",{className:e,style:{...i,wordBreak:"break-word"},children:l})},Ab=({memory:o,onClose:e,onTogglePin:i,onForget:s})=>(Rt.useEffect(()=>{const l=f=>{f.key==="Escape"&&e()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[e]),o?M.jsxs(M.Fragment,{children:[M.jsx("div",{className:"drawer-backdrop",onClick:e}),M.jsxs("div",{className:"drawer-panel",onClick:l=>l.stopPropagation(),children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[M.jsxs("div",{style:{flex:1,paddingRight:"12px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600},children:["[",o.id,"]"]}),M.jsx("span",{className:"badge-tag",style:{background:o.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:o.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:o.kind.toUpperCase()}),M.jsx("span",{className:"badge-tag",style:{background:"var(--bg-subtle)",color:"var(--text-muted)"},children:o.status.toUpperCase()})]}),M.jsx("h2",{style:{fontSize:"15px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:o.title})]}),M.jsx("button",{onClick:e,className:"btn",style:{padding:"4px 8px",color:"var(--text-muted)"},title:"Close (Esc)",children:"✕"})]}),M.jsxs("div",{style:{padding:"10px 20px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{color:"var(--text-muted)"},children:"Author:"}),M.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"var(--text)",fontWeight:600},children:["@",o.agent_id||"default"]})]}),o.provenance_hash?M.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},title:`SHA-256 Authentic Provenance: ${o.provenance_hash}`,children:["🔒 prov_",o.provenance_hash.slice(0,10)]}):M.jsx("span",{style:{color:"var(--text-faint)",fontSize:"10px"},children:"legacy unsigned"})]}),M.jsxs("div",{style:{padding:"20px",flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"16px"},children:[M.jsxs("div",{children:[M.jsx("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:"Memory Content"}),M.jsx("div",{style:{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"6px",padding:"14px"},children:M.jsx(Tb,{content:o.content})})]}),o.linked_files&&o.linked_files.length>0&&M.jsxs("div",{children:[M.jsxs("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:["Linked Files (",o.linked_files.length,")"]}),M.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:o.linked_files.map(l=>M.jsx("span",{className:"badge-tag",style:{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--text-muted)"},children:l},l))})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",borderTop:"1px solid var(--border)",paddingTop:"14px"},children:[M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"MODULE"}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px"},children:o.module})]}),M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"REWARD"}),M.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px",color:"var(--accent)"},children:[o.reward_score.toFixed(2),"x"]})]}),M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"CREATED"}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",marginTop:"2px",color:"var(--text-muted)"},children:new Date(o.created_at).toLocaleDateString()})]})]})]}),M.jsxs("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--border)",background:"var(--surface)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsxs("div",{style:{display:"flex",gap:"8px"},children:[M.jsx(pi,{text:o.content,label:"Copy Rule"}),M.jsx(pi,{text:`fastrmemory recall "${o.title}"`,label:"CLI"}),M.jsxs("button",{onClick:()=>i(o.id,o.pinned),className:"btn",style:{fontSize:"11.5px"},children:[M.jsx(D_,{size:12,color:o.pinned?"#8b5cf6":"var(--text-muted)"}),o.pinned?"Unpin":"Pin"]})]}),M.jsxs("button",{onClick:()=>s(o.id),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)",fontSize:"11.5px"},children:[M.jsx(ib,{size:12})," Forget"]})]})]})]}):null);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Wp="186",io={ROTATE:0,DOLLY:1,PAN:2},eo={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Rb=0,yx=1,Cb=2,Su=1,wb=2,ml=3,Qs=0,Wn=1,sa=2,Oa=0,vl=1,Mx=2,bx=3,Ex=4,Db=5,to=100,Nb=101,Ub=102,Lb=103,Ob=104,Pb=200,Ib=201,zb=202,Bb=203,N_=204,U_=205,Fb=206,Hb=207,Gb=208,Vb=209,kb=210,Xb=211,Wb=212,jb=213,Yb=214,tp=0,ep=1,np=2,xl=3,ip=4,ap=5,sp=6,rp=7,L_=0,qb=1,Zb=2,la=0,O_=1,P_=2,I_=3,jp=4,z_=5,B_=6,F_=7,H_=300,Js=301,ro=302,xh=303,_h=304,Iu=306,op=1e3,La=1001,lp=1002,Ln=1003,Kb=1004,qc=1005,Bn=1006,Sh=1007,Zs=1008,hi=1009,G_=1010,V_=1011,_l=1012,Yp=1013,ca=1014,ra=1015,ua=1016,qp=1017,Zp=1018,Sl=1020,k_=35902,X_=35899,W_=1021,j_=1022,Hi=1023,za=1026,Ks=1027,Y_=1028,Kp=1029,$s=1030,Qp=1031,Jp=1033,yu=33776,Mu=33777,bu=33778,Eu=33779,cp=35840,up=35841,fp=35842,dp=35843,hp=36196,pp=37492,mp=37496,gp=37488,vp=37489,Ru=37490,xp=37491,_p=37808,Sp=37809,yp=37810,Mp=37811,bp=37812,Ep=37813,Tp=37814,Ap=37815,Rp=37816,Cp=37817,wp=37818,Dp=37819,Np=37820,Up=37821,Lp=36492,Op=36494,Pp=36495,Ip=36283,zp=36284,Cu=36285,Bp=36286,Qb=3200,Fp=0,Jb=1,vs="",Ri="srgb",wu="srgb-linear",Du="linear",qe="srgb",yh=7680,$b=519,tE=512,eE=513,nE=514,$p=515,iE=516,aE=517,tm=518,sE=519,rE=35044,Tx="300 es",oa=2e3,yl=2001;function oE(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Nu(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function lE(){const o=Nu("canvas");return o.style.display="block",o}const Ax={};function Rx(...o){const e="THREE."+o.shift();console.log(e,...o)}function q_(o){const e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function ce(...o){o=q_(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...o)}}function He(...o){o=q_(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...o)}}function ao(...o){const e=o.join(" ");e in Ax||(Ax[e]=!0,ce(...o))}function cE(o,e,i){return new Promise(function(s,l){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}const uE={[tp]:ep,[np]:sp,[ip]:rp,[xl]:ap,[ep]:tp,[sp]:np,[rp]:ip,[ap]:xl};class Ss{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const f=l.indexOf(i);f!==-1&&l.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let f=0,d=l.length;f<d;f++)l[f].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tu=Math.PI/180,Hp=180/Math.PI;function bl(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[o&255]+In[o>>8&255]+In[o>>16&255]+In[o>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function De(o,e,i){return Math.max(e,Math.min(i,o))}function fE(o,e){return(o%e+e)%e}function Mh(o,e,i){return(1-i)*o+i*e}function ol(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Jn(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const dE={DEG2RAD:Tu};class ue{static{ue.prototype.isVector2=!0}constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=De(this.x,e.x,i.x),this.y=De(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=De(this.x,e,i),this.y=De(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(De(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),f=this.x-e.x,d=this.y-e.y;return this.x=f*s-d*l+e.x,this.y=f*l+d*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class xs{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,f,d,h){let p=s[l+0],m=s[l+1],_=s[l+2],y=s[l+3],v=f[d+0],b=f[d+1],R=f[d+2],O=f[d+3];if(y!==O||p!==v||m!==b||_!==R){let S=p*v+m*b+_*R+y*O;S<0&&(v=-v,b=-b,R=-R,O=-O,S=-S);let x=1-h;if(S<.9995){const U=Math.acos(S),V=Math.sin(U);x=Math.sin(x*U)/V,h=Math.sin(h*U)/V,p=p*x+v*h,m=m*x+b*h,_=_*x+R*h,y=y*x+O*h}else{p=p*x+v*h,m=m*x+b*h,_=_*x+R*h,y=y*x+O*h;const U=1/Math.sqrt(p*p+m*m+_*_+y*y);p*=U,m*=U,_*=U,y*=U}}e[i]=p,e[i+1]=m,e[i+2]=_,e[i+3]=y}static multiplyQuaternionsFlat(e,i,s,l,f,d){const h=s[l],p=s[l+1],m=s[l+2],_=s[l+3],y=f[d],v=f[d+1],b=f[d+2],R=f[d+3];return e[i]=h*R+_*y+p*b-m*v,e[i+1]=p*R+_*v+m*y-h*b,e[i+2]=m*R+_*b+h*v-p*y,e[i+3]=_*R-h*y-p*v-m*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,f=e._z,d=e._order,h=Math.cos,p=Math.sin,m=h(s/2),_=h(l/2),y=h(f/2),v=p(s/2),b=p(l/2),R=p(f/2);switch(d){case"XYZ":this._x=v*_*y+m*b*R,this._y=m*b*y-v*_*R,this._z=m*_*R+v*b*y,this._w=m*_*y-v*b*R;break;case"YXZ":this._x=v*_*y+m*b*R,this._y=m*b*y-v*_*R,this._z=m*_*R-v*b*y,this._w=m*_*y+v*b*R;break;case"ZXY":this._x=v*_*y-m*b*R,this._y=m*b*y+v*_*R,this._z=m*_*R+v*b*y,this._w=m*_*y-v*b*R;break;case"ZYX":this._x=v*_*y-m*b*R,this._y=m*b*y+v*_*R,this._z=m*_*R-v*b*y,this._w=m*_*y+v*b*R;break;case"YZX":this._x=v*_*y+m*b*R,this._y=m*b*y+v*_*R,this._z=m*_*R-v*b*y,this._w=m*_*y-v*b*R;break;case"XZY":this._x=v*_*y-m*b*R,this._y=m*b*y-v*_*R,this._z=m*_*R+v*b*y,this._w=m*_*y+v*b*R;break;default:ce("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],f=i[8],d=i[1],h=i[5],p=i[9],m=i[2],_=i[6],y=i[10],v=s+h+y;if(v>0){const b=.5/Math.sqrt(v+1);this._w=.25/b,this._x=(_-p)*b,this._y=(f-m)*b,this._z=(d-l)*b}else if(s>h&&s>y){const b=2*Math.sqrt(1+s-h-y);this._w=(_-p)/b,this._x=.25*b,this._y=(l+d)/b,this._z=(f+m)/b}else if(h>y){const b=2*Math.sqrt(1+h-s-y);this._w=(f-m)/b,this._x=(l+d)/b,this._y=.25*b,this._z=(p+_)/b}else{const b=2*Math.sqrt(1+y-s-h);this._w=(d-l)/b,this._x=(f+m)/b,this._y=(p+_)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(De(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,f=e._z,d=e._w,h=i._x,p=i._y,m=i._z,_=i._w;return this._x=s*_+d*h+l*m-f*p,this._y=l*_+d*p+f*h-s*m,this._z=f*_+d*m+s*p-l*h,this._w=d*_-s*h-l*p-f*m,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,f=e._z,d=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,f=-f,d=-d,h=-h);let p=1-i;if(h<.9995){const m=Math.acos(h),_=Math.sin(m);p=Math.sin(p*m)/_,i=Math.sin(i*m)/_,this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this._onChangeCallback()}else this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class st{static{st.prototype.isVector3=!0}constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Cx.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Cx.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*l,this.y=f[1]*i+f[4]*s+f[7]*l,this.z=f[2]*i+f[5]*s+f[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=e.elements,d=1/(f[3]*i+f[7]*s+f[11]*l+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*l+f[12])*d,this.y=(f[1]*i+f[5]*s+f[9]*l+f[13])*d,this.z=(f[2]*i+f[6]*s+f[10]*l+f[14])*d,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,f=e.x,d=e.y,h=e.z,p=e.w,m=2*(d*l-h*s),_=2*(h*i-f*l),y=2*(f*s-d*i);return this.x=i+p*m+d*y-h*_,this.y=s+p*_+h*m-f*y,this.z=l+p*y+f*_-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l,this.y=f[1]*i+f[5]*s+f[9]*l,this.z=f[2]*i+f[6]*s+f[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=De(this.x,e.x,i.x),this.y=De(this.y,e.y,i.y),this.z=De(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=De(this.x,e,i),this.y=De(this.y,e,i),this.z=De(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,f=e.z,d=i.x,h=i.y,p=i.z;return this.x=l*p-f*h,this.y=f*d-s*p,this.z=s*h-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return bh.copy(this).projectOnVector(e),this.sub(bh)}reflect(e){return this.sub(bh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(De(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const bh=new st,Cx=new xs;class me{static{me.prototype.isMatrix3=!0}constructor(e,i,s,l,f,d,h,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m)}set(e,i,s,l,f,d,h,p,m){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=f,_[5]=p,_[6]=s,_[7]=d,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[3],p=s[6],m=s[1],_=s[4],y=s[7],v=s[2],b=s[5],R=s[8],O=l[0],S=l[3],x=l[6],U=l[1],V=l[4],D=l[7],N=l[2],w=l[5],I=l[8];return f[0]=d*O+h*U+p*N,f[3]=d*S+h*V+p*w,f[6]=d*x+h*D+p*I,f[1]=m*O+_*U+y*N,f[4]=m*S+_*V+y*w,f[7]=m*x+_*D+y*I,f[2]=v*O+b*U+R*N,f[5]=v*S+b*V+R*w,f[8]=v*x+b*D+R*I,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8];return i*d*_-i*h*m-s*f*_+s*h*p+l*f*m-l*d*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],y=_*d-h*m,v=h*p-_*f,b=m*f-d*p,R=i*y+s*v+l*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0);const O=1/R;return e[0]=y*O,e[1]=(l*m-_*s)*O,e[2]=(h*s-l*d)*O,e[3]=v*O,e[4]=(_*i-l*p)*O,e[5]=(l*f-h*i)*O,e[6]=b*O,e[7]=(s*p-m*i)*O,e[8]=(d*i-s*f)*O,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,f,d,h){const p=Math.cos(f),m=Math.sin(f);return this.set(s*p,s*m,-s*(p*d+m*h)+d+e,-l*m,l*p,-l*(-m*d+p*h)+h+i,0,0,1),this}scale(e,i){return ao("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Eh.makeScale(e,i)),this}rotate(e){return ao("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Eh.makeRotation(-e)),this}translate(e,i){return ao("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Eh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Eh=new me,wx=new me().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dx=new me().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hE(){const o={enabled:!0,workingColorSpace:wu,spaces:{},convert:function(l,f,d){return this.enabled===!1||f===d||!f||!d||(this.spaces[f].transfer===qe&&(l.r=Pa(l.r),l.g=Pa(l.g),l.b=Pa(l.b)),this.spaces[f].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[f].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===qe&&(l.r=so(l.r),l.g=so(l.g),l.b=so(l.b))),l},workingToColorSpace:function(l,f){return this.convert(l,this.workingColorSpace,f)},colorSpaceToWorking:function(l,f){return this.convert(l,f,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===vs?Du:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,f=this.workingColorSpace){return l.fromArray(this.spaces[f].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,f,d){return l.copy(this.spaces[f].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,f){return ao("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,f)},toWorkingColorSpace:function(l,f){return ao("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[wu]:{primaries:e,whitePoint:s,transfer:Du,toXYZ:wx,fromXYZ:Dx,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ri},outputColorSpaceConfig:{drawingBufferColorSpace:Ri}},[Ri]:{primaries:e,whitePoint:s,transfer:qe,toXYZ:wx,fromXYZ:Dx,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ri}}}),o}const Ie=hE();function Pa(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function so(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Gr;class pE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Gr===void 0&&(Gr=Nu("canvas")),Gr.width=e.width,Gr.height=e.height;const l=Gr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Gr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Nu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),f=l.data;for(let d=0;d<f.length;d++)f[d]=Pa(f[d]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Pa(i[s]/255)*255):i[s]=Pa(i[s]);return{data:i,width:e.width,height:e.height}}else return ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let mE=0;class em{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:mE++}),this.uuid=bl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let f;if(Array.isArray(l)){f=[];for(let d=0,h=l.length;d<h;d++)l[d].isDataTexture?f.push(Th(l[d].image)):f.push(Th(l[d]))}else f=Th(l);s.url=f}return i||(e.images[this.uuid]=s),s}}function Th(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?pE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(ce("Texture: Unable to serialize Texture."),{})}let gE=0;const Ah=new st;class jn extends Ss{constructor(e=jn.DEFAULT_IMAGE,i=jn.DEFAULT_MAPPING,s=La,l=La,f=Bn,d=Zs,h=Hi,p=hi,m=jn.DEFAULT_ANISOTROPY,_=vs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gE++}),this.uuid=bl(),this.name="",this.source=new em(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=f,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new ue(0,0),this.repeat=new ue(1,1),this.center=new ue(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new me,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ah).x}get height(){return this.source.getSize(Ah).y}get depth(){return this.source.getSize(Ah).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){ce(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ce(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==H_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case op:e.x=e.x-Math.floor(e.x);break;case La:e.x=e.x<0?0:1;break;case lp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case op:e.y=e.y-Math.floor(e.y);break;case La:e.y=e.y<0?0:1;break;case lp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=H_;jn.DEFAULT_ANISOTROPY=1;class on{static{on.prototype.isVector4=!0}constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=this.w,d=e.elements;return this.x=d[0]*i+d[4]*s+d[8]*l+d[12]*f,this.y=d[1]*i+d[5]*s+d[9]*l+d[13]*f,this.z=d[2]*i+d[6]*s+d[10]*l+d[14]*f,this.w=d[3]*i+d[7]*s+d[11]*l+d[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,f;const p=e.elements,m=p[0],_=p[4],y=p[8],v=p[1],b=p[5],R=p[9],O=p[2],S=p[6],x=p[10];if(Math.abs(_-v)<.01&&Math.abs(y-O)<.01&&Math.abs(R-S)<.01){if(Math.abs(_+v)<.1&&Math.abs(y+O)<.1&&Math.abs(R+S)<.1&&Math.abs(m+b+x-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const V=(m+1)/2,D=(b+1)/2,N=(x+1)/2,w=(_+v)/4,I=(y+O)/4,T=(R+S)/4;return V>D&&V>N?V<.01?(s=0,l=.707106781,f=.707106781):(s=Math.sqrt(V),l=w/s,f=I/s):D>N?D<.01?(s=.707106781,l=0,f=.707106781):(l=Math.sqrt(D),s=w/l,f=T/l):N<.01?(s=.707106781,l=.707106781,f=0):(f=Math.sqrt(N),s=I/f,l=T/f),this.set(s,l,f,i),this}let U=Math.sqrt((S-R)*(S-R)+(y-O)*(y-O)+(v-_)*(v-_));return Math.abs(U)<.001&&(U=1),this.x=(S-R)/U,this.y=(y-O)/U,this.z=(v-_)/U,this.w=Math.acos((m+b+x-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=De(this.x,e.x,i.x),this.y=De(this.y,e.y,i.y),this.z=De(this.z,e.z,i.z),this.w=De(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=De(this.x,e,i),this.y=De(this.y,e,i),this.z=De(this.z,e,i),this.w=De(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(De(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class vE extends Ss{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new on(0,0,e,i),this.scissorTest=!1,this.viewport=new on(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},f=new jn(l),d=s.count;for(let h=0;h<d;h++)this.textures[h]=f.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,f=this.textures.length;l<f;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new em(l)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const i=e.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends vE{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class Z_ extends jn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class xE extends jn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Ln,this.minFilter=Ln,this.wrapR=La,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class nn{static{nn.prototype.isMatrix4=!0}constructor(e,i,s,l,f,d,h,p,m,_,y,v,b,R,O,S){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m,_,y,v,b,R,O,S)}set(e,i,s,l,f,d,h,p,m,_,y,v,b,R,O,S){const x=this.elements;return x[0]=e,x[4]=i,x[8]=s,x[12]=l,x[1]=f,x[5]=d,x[9]=h,x[13]=p,x[2]=m,x[6]=_,x[10]=y,x[14]=v,x[3]=b,x[7]=R,x[11]=O,x[15]=S,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,s=e.elements,l=1/Vr.setFromMatrixColumn(e,0).length(),f=1/Vr.setFromMatrixColumn(e,1).length(),d=1/Vr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*d,i[9]=s[9]*d,i[10]=s[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,f=e.z,d=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),_=Math.cos(f),y=Math.sin(f);if(e.order==="XYZ"){const v=d*_,b=d*y,R=h*_,O=h*y;i[0]=p*_,i[4]=-p*y,i[8]=m,i[1]=b+R*m,i[5]=v-O*m,i[9]=-h*p,i[2]=O-v*m,i[6]=R+b*m,i[10]=d*p}else if(e.order==="YXZ"){const v=p*_,b=p*y,R=m*_,O=m*y;i[0]=v+O*h,i[4]=R*h-b,i[8]=d*m,i[1]=d*y,i[5]=d*_,i[9]=-h,i[2]=b*h-R,i[6]=O+v*h,i[10]=d*p}else if(e.order==="ZXY"){const v=p*_,b=p*y,R=m*_,O=m*y;i[0]=v-O*h,i[4]=-d*y,i[8]=R+b*h,i[1]=b+R*h,i[5]=d*_,i[9]=O-v*h,i[2]=-d*m,i[6]=h,i[10]=d*p}else if(e.order==="ZYX"){const v=d*_,b=d*y,R=h*_,O=h*y;i[0]=p*_,i[4]=R*m-b,i[8]=v*m+O,i[1]=p*y,i[5]=O*m+v,i[9]=b*m-R,i[2]=-m,i[6]=h*p,i[10]=d*p}else if(e.order==="YZX"){const v=d*p,b=d*m,R=h*p,O=h*m;i[0]=p*_,i[4]=O-v*y,i[8]=R*y+b,i[1]=y,i[5]=d*_,i[9]=-h*_,i[2]=-m*_,i[6]=b*y+R,i[10]=v-O*y}else if(e.order==="XZY"){const v=d*p,b=d*m,R=h*p,O=h*m;i[0]=p*_,i[4]=-y,i[8]=m*_,i[1]=v*y+O,i[5]=d*_,i[9]=b*y-R,i[2]=R*y-b,i[6]=h*_,i[10]=O*y+v}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(_E,e,SE)}lookAt(e,i,s){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ds.crossVectors(s,fi),ds.lengthSq()===0&&(Math.abs(s.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ds.crossVectors(s,fi)),ds.normalize(),Zc.crossVectors(fi,ds),l[0]=ds.x,l[4]=Zc.x,l[8]=fi.x,l[1]=ds.y,l[5]=Zc.y,l[9]=fi.y,l[2]=ds.z,l[6]=Zc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[4],p=s[8],m=s[12],_=s[1],y=s[5],v=s[9],b=s[13],R=s[2],O=s[6],S=s[10],x=s[14],U=s[3],V=s[7],D=s[11],N=s[15],w=l[0],I=l[4],T=l[8],P=l[12],L=l[1],G=l[5],Z=l[9],J=l[13],H=l[2],Y=l[6],z=l[10],k=l[14],$=l[3],j=l[7],at=l[11],ot=l[15];return f[0]=d*w+h*L+p*H+m*$,f[4]=d*I+h*G+p*Y+m*j,f[8]=d*T+h*Z+p*z+m*at,f[12]=d*P+h*J+p*k+m*ot,f[1]=_*w+y*L+v*H+b*$,f[5]=_*I+y*G+v*Y+b*j,f[9]=_*T+y*Z+v*z+b*at,f[13]=_*P+y*J+v*k+b*ot,f[2]=R*w+O*L+S*H+x*$,f[6]=R*I+O*G+S*Y+x*j,f[10]=R*T+O*Z+S*z+x*at,f[14]=R*P+O*J+S*k+x*ot,f[3]=U*w+V*L+D*H+N*$,f[7]=U*I+V*G+D*Y+N*j,f[11]=U*T+V*Z+D*z+N*at,f[15]=U*P+V*J+D*k+N*ot,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[12],d=e[1],h=e[5],p=e[9],m=e[13],_=e[2],y=e[6],v=e[10],b=e[14],R=e[3],O=e[7],S=e[11],x=e[15],U=p*b-m*v,V=h*b-m*y,D=h*v-p*y,N=d*b-m*_,w=d*v-p*_,I=d*y-h*_;return i*(O*U-S*V+x*D)-s*(R*U-S*N+x*w)+l*(R*V-O*N+x*I)-f*(R*D-O*w+S*I)}determinantAffine(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[1],d=e[5],h=e[9],p=e[2],m=e[6],_=e[10];return i*(d*_-h*m)-s*(f*_-h*p)+l*(f*m-d*p)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],y=e[9],v=e[10],b=e[11],R=e[12],O=e[13],S=e[14],x=e[15],U=i*h-s*d,V=i*p-l*d,D=i*m-f*d,N=s*p-l*h,w=s*m-f*h,I=l*m-f*p,T=_*O-y*R,P=_*S-v*R,L=_*x-b*R,G=y*S-v*O,Z=y*x-b*O,J=v*x-b*S,H=U*J-V*Z+D*G+N*L-w*P+I*T;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Y=1/H;return e[0]=(h*J-p*Z+m*G)*Y,e[1]=(l*Z-s*J-f*G)*Y,e[2]=(O*I-S*w+x*N)*Y,e[3]=(v*w-y*I-b*N)*Y,e[4]=(p*L-d*J-m*P)*Y,e[5]=(i*J-l*L+f*P)*Y,e[6]=(S*D-R*I-x*V)*Y,e[7]=(_*I-v*D+b*V)*Y,e[8]=(d*Z-h*L+m*T)*Y,e[9]=(s*L-i*Z-f*T)*Y,e[10]=(R*w-O*D+x*U)*Y,e[11]=(y*D-_*w-b*U)*Y,e[12]=(h*P-d*G-p*T)*Y,e[13]=(i*G-s*P+l*T)*Y,e[14]=(O*V-R*N-S*U)*Y,e[15]=(_*N-y*V+v*U)*Y,this}scale(e){const i=this.elements,s=e.x,l=e.y,f=e.z;return i[0]*=s,i[4]*=l,i[8]*=f,i[1]*=s,i[5]*=l,i[9]*=f,i[2]*=s,i[6]*=l,i[10]*=f,i[3]*=s,i[7]*=l,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),f=1-s,d=e.x,h=e.y,p=e.z,m=f*d,_=f*h;return this.set(m*d+s,m*h-l*p,m*p+l*h,0,m*h+l*p,_*h+s,_*p-l*d,0,m*p-l*h,_*p+l*d,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,f,d){return this.set(1,s,f,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,f=i._x,d=i._y,h=i._z,p=i._w,m=f+f,_=d+d,y=h+h,v=f*m,b=f*_,R=f*y,O=d*_,S=d*y,x=h*y,U=p*m,V=p*_,D=p*y,N=s.x,w=s.y,I=s.z;return l[0]=(1-(O+x))*N,l[1]=(b+D)*N,l[2]=(R-V)*N,l[3]=0,l[4]=(b-D)*w,l[5]=(1-(v+x))*w,l[6]=(S+U)*w,l[7]=0,l[8]=(R+V)*I,l[9]=(S-U)*I,l[10]=(1-(v+O))*I,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const f=this.determinantAffine();if(f===0)return s.set(1,1,1),i.identity(),this;let d=Vr.set(l[0],l[1],l[2]).length();const h=Vr.set(l[4],l[5],l[6]).length(),p=Vr.set(l[8],l[9],l[10]).length();f<0&&(d=-d),Ii.copy(this);const m=1/d,_=1/h,y=1/p;return Ii.elements[0]*=m,Ii.elements[1]*=m,Ii.elements[2]*=m,Ii.elements[4]*=_,Ii.elements[5]*=_,Ii.elements[6]*=_,Ii.elements[8]*=y,Ii.elements[9]*=y,Ii.elements[10]*=y,i.setFromRotationMatrix(Ii),s.x=d,s.y=h,s.z=p,this}makePerspective(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,_=2*f/(i-e),y=2*f/(s-l),v=(i+e)/(i-e),b=(s+l)/(s-l);let R,O;if(p)R=f/(d-f),O=d*f/(d-f);else if(h===oa)R=-(d+f)/(d-f),O=-2*d*f/(d-f);else if(h===yl)R=-d/(d-f),O=-d*f/(d-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=_,m[4]=0,m[8]=v,m[12]=0,m[1]=0,m[5]=y,m[9]=b,m[13]=0,m[2]=0,m[6]=0,m[10]=R,m[14]=O,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,_=2/(i-e),y=2/(s-l),v=-(i+e)/(i-e),b=-(s+l)/(s-l);let R,O;if(p)R=1/(d-f),O=d/(d-f);else if(h===oa)R=-2/(d-f),O=-(d+f)/(d-f);else if(h===yl)R=-1/(d-f),O=-f/(d-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=_,m[4]=0,m[8]=0,m[12]=v,m[1]=0,m[5]=y,m[9]=0,m[13]=b,m[2]=0,m[6]=0,m[10]=R,m[14]=O,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const Vr=new st,Ii=new nn,_E=new st(0,0,0),SE=new st(1,1,1),ds=new st,Zc=new st,fi=new st,Nx=new nn,Ux=new xs;class _s{constructor(e=0,i=0,s=0,l=_s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,f=l[0],d=l[4],h=l[8],p=l[1],m=l[5],_=l[9],y=l[2],v=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(De(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,b),this._z=Math.atan2(-d,f)):(this._x=Math.atan2(v,m),this._z=0);break;case"YXZ":this._x=Math.asin(-De(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-y,f),this._z=0);break;case"ZXY":this._x=Math.asin(De(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(-y,b),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-De(y,-1,1)),Math.abs(y)<.9999999?(this._x=Math.atan2(v,b),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(De(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-y,f)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-De(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(v,m),this._y=Math.atan2(h,f)):(this._x=Math.atan2(-_,b),this._y=0);break;default:ce("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Nx.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nx,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Ux.setFromEuler(this),this.setFromQuaternion(Ux,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_s.DEFAULT_ORDER="XYZ";class nm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let yE=0;const Lx=new st,kr=new xs,Ra=new nn,Kc=new st,ll=new st,ME=new st,bE=new xs,Ox=new st(1,0,0),Px=new st(0,1,0),Ix=new st(0,0,1),zx={type:"added"},EE={type:"removed"},Xr={type:"childadded",child:null},Rh={type:"childremoved",child:null};class On extends Ss{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:yE++}),this.uuid=bl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=On.DEFAULT_UP.clone();const e=new st,i=new _s,s=new xs,l=new st(1,1,1);function f(){s.setFromEuler(i,!1)}function d(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new nn},normalMatrix:{value:new me}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=On.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return kr.setFromAxisAngle(e,i),this.quaternion.multiply(kr),this}rotateOnWorldAxis(e,i){return kr.setFromAxisAngle(e,i),this.quaternion.premultiply(kr),this}rotateX(e){return this.rotateOnAxis(Ox,e)}rotateY(e){return this.rotateOnAxis(Px,e)}rotateZ(e){return this.rotateOnAxis(Ix,e)}translateOnAxis(e,i){return Lx.copy(e).applyQuaternion(this.quaternion),this.position.add(Lx.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Ox,e)}translateY(e){return this.translateOnAxis(Px,e)}translateZ(e){return this.translateOnAxis(Ix,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ra.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Kc.copy(e):Kc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ra.lookAt(ll,Kc,this.up):Ra.lookAt(Kc,ll,this.up),this.quaternion.setFromRotationMatrix(Ra),l&&(Ra.extractRotation(l.matrixWorld),kr.setFromRotationMatrix(Ra),this.quaternion.premultiply(kr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zx),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(EE),Rh.child=e,this.dispatchEvent(Rh),Rh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ra.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ra.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ra),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zx),Xr.child=e,this.dispatchEvent(Xr),Xr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const d=this.children[s].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let f=0,d=l.length;f<d;f++)l[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,e,ME),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,bE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,f=this.matrix.elements;f[12]+=i-f[0]*i-f[4]*s-f[8]*l,f[13]+=s-f[1]*i-f[5]*s-f[9]*l,f[14]+=l-f[2]*i-f[6]*s-f[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i,s=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const f=this.children;for(let d=0,h=f.length;d<h;d++)f[d].updateWorldMatrix(!1,!0,s)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function f(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=f(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,_=p.length;m<_;m++){const y=p[m];f(e.shapes,y)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(f(e.materials,this.material[p]));l.material=h}else l.material=f(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(f(e.animations,p))}}if(i){const h=d(e.geometries),p=d(e.materials),m=d(e.textures),_=d(e.images),y=d(e.shapes),v=d(e.skeletons),b=d(e.animations),R=d(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),_.length>0&&(s.images=_),y.length>0&&(s.shapes=y),v.length>0&&(s.skeletons=v),b.length>0&&(s.animations=b),R.length>0&&(s.nodes=R)}return s.object=l,s;function d(h){const p=[];for(const m in h){const _=h[m];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}On.DEFAULT_UP=new st(0,1,0);On.DEFAULT_MATRIX_AUTO_UPDATE=!0;On.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Qc extends On{constructor(){super(),this.isGroup=!0,this.type="Group"}}const TE={type:"move"};class Ch{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new st,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new st),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new st,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new st,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,f=null,d=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const O of e.hand.values()){const S=i.getJointPose(O,s),x=this._getHandJoint(m,O);S!==null&&(x.matrix.fromArray(S.transform.matrix),x.matrix.decompose(x.position,x.rotation,x.scale),x.matrixWorldNeedsUpdate=!0,x.jointRadius=S.radius),x.visible=S!==null}const _=m.joints["index-finger-tip"],y=m.joints["thumb-tip"],v=_.position.distanceTo(y.position),b=.02,R=.005;m.inputState.pinching&&v>b+R?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&v<=b-R&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&f!==null&&(l=f),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(TE)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=f!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Qc;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const K_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},Jc={h:0,s:0,l:0};function wh(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Ae{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Ri){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ie.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Ie.workingColorSpace){return this.r=e,this.g=i,this.b=s,Ie.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Ie.workingColorSpace){if(e=fE(e,1),i=De(i,0,1),s=De(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,d=2*s-f;this.r=wh(d,f,e+1/3),this.g=wh(d,f,e),this.b=wh(d,f,e-1/3)}return Ie.colorSpaceToWorking(this,l),this}setStyle(e,i=Ri){function s(f){f!==void 0&&parseFloat(f)<1&&ce("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const d=l[1],h=l[2];switch(d){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:ce("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=l[1],d=f.length;if(d===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(f,16),i);ce("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Ri){const s=K_[e.toLowerCase()];return s!==void 0?this.setHex(s,i):ce("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pa(e.r),this.g=Pa(e.g),this.b=Pa(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ri){return Ie.workingToColorSpace(zn.copy(this),e),Math.round(De(zn.r*255,0,255))*65536+Math.round(De(zn.g*255,0,255))*256+Math.round(De(zn.b*255,0,255))}getHexString(e=Ri){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Ie.workingColorSpace){Ie.workingToColorSpace(zn.copy(this),i);const s=zn.r,l=zn.g,f=zn.b,d=Math.max(s,l,f),h=Math.min(s,l,f);let p,m;const _=(h+d)/2;if(h===d)p=0,m=0;else{const y=d-h;switch(m=_<=.5?y/(d+h):y/(2-d-h),d){case s:p=(l-f)/y+(l<f?6:0);break;case l:p=(f-s)/y+2;break;case f:p=(s-l)/y+4;break}p/=6}return e.h=p,e.s=m,e.l=_,e}getRGB(e,i=Ie.workingColorSpace){return Ie.workingToColorSpace(zn.copy(this),i),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=Ri){Ie.workingToColorSpace(zn.copy(this),e);const i=zn.r,s=zn.g,l=zn.b;return e!==Ri?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+i,hs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(hs),e.getHSL(Jc);const s=Mh(hs.h,Jc.h,i),l=Mh(hs.s,Jc.s,i),f=Mh(hs.l,Jc.l,i);return this.setHSL(s,l,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*l,this.g=f[1]*i+f[4]*s+f[7]*l,this.b=f[2]*i+f[5]*s+f[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new Ae;Ae.NAMES=K_;class im{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ae(e),this.density=i}clone(){return new im(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class AE extends On{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _s,this.environmentIntensity=1,this.environmentRotation=new _s,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zi=new st,Ca=new st,Dh=new st,wa=new st,Wr=new st,jr=new st,Bx=new st,Nh=new st,Uh=new st,Lh=new st,Oh=new on,Ph=new on,Ih=new on;class Fi{constructor(e=new st,i=new st,s=new st){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),zi.subVectors(e,i),l.cross(zi);const f=l.lengthSq();return f>0?l.multiplyScalar(1/Math.sqrt(f)):l.set(0,0,0)}static getBarycoord(e,i,s,l,f){zi.subVectors(l,i),Ca.subVectors(s,i),Dh.subVectors(e,i);const d=zi.dot(zi),h=zi.dot(Ca),p=zi.dot(Dh),m=Ca.dot(Ca),_=Ca.dot(Dh),y=d*m-h*h;if(y===0)return f.set(0,0,0),null;const v=1/y,b=(m*p-h*_)*v,R=(d*_-h*p)*v;return f.set(1-b-R,R,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,wa)===null?!1:wa.x>=0&&wa.y>=0&&wa.x+wa.y<=1}static getInterpolation(e,i,s,l,f,d,h,p){return this.getBarycoord(e,i,s,l,wa)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,wa.x),p.addScaledVector(d,wa.y),p.addScaledVector(h,wa.z),p)}static getInterpolatedAttribute(e,i,s,l,f,d){return Oh.setScalar(0),Ph.setScalar(0),Ih.setScalar(0),Oh.fromBufferAttribute(e,i),Ph.fromBufferAttribute(e,s),Ih.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Oh,f.x),d.addScaledVector(Ph,f.y),d.addScaledVector(Ih,f.z),d}static isFrontFacing(e,i,s,l){return zi.subVectors(s,i),Ca.subVectors(e,i),zi.cross(Ca).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),Ca.subVectors(this.a,this.b),zi.cross(Ca).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Fi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,f){return Fi.getInterpolation(e,this.a,this.b,this.c,i,s,l,f)}containsPoint(e){return Fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,f=this.c;let d,h;Wr.subVectors(l,s),jr.subVectors(f,s),Nh.subVectors(e,s);const p=Wr.dot(Nh),m=jr.dot(Nh);if(p<=0&&m<=0)return i.copy(s);Uh.subVectors(e,l);const _=Wr.dot(Uh),y=jr.dot(Uh);if(_>=0&&y<=_)return i.copy(l);const v=p*y-_*m;if(v<=0&&p>=0&&_<=0)return d=p/(p-_),i.copy(s).addScaledVector(Wr,d);Lh.subVectors(e,f);const b=Wr.dot(Lh),R=jr.dot(Lh);if(R>=0&&b<=R)return i.copy(f);const O=b*m-p*R;if(O<=0&&m>=0&&R<=0)return h=m/(m-R),i.copy(s).addScaledVector(jr,h);const S=_*R-b*y;if(S<=0&&y-_>=0&&b-R>=0)return Bx.subVectors(f,l),h=(y-_)/(y-_+(b-R)),i.copy(l).addScaledVector(Bx,h);const x=1/(S+O+v);return d=O*x,h=v*x,i.copy(s).addScaledVector(Wr,d).addScaledVector(jr,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class El{constructor(e=new st(1/0,1/0,1/0),i=new st(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Bi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Bi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Bi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=f.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,Bi):Bi.fromBufferAttribute(f,d),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),$c.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),$c.copy(s.boundingBox)),$c.applyMatrix4(e.matrixWorld),this.union($c)}const l=e.children;for(let f=0,d=l.length;f<d;f++)this.expandByObject(l[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),tu.subVectors(this.max,cl),Yr.subVectors(e.a,cl),qr.subVectors(e.b,cl),Zr.subVectors(e.c,cl),ps.subVectors(qr,Yr),ms.subVectors(Zr,qr),Xs.subVectors(Yr,Zr);let i=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Xs.z,Xs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Xs.z,0,-Xs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Xs.y,Xs.x,0];return!zh(i,Yr,qr,Zr,tu)||(i=[1,0,0,0,1,0,0,0,1],!zh(i,Yr,qr,Zr,tu))?!1:(eu.crossVectors(ps,ms),i=[eu.x,eu.y,eu.z],zh(i,Yr,qr,Zr,tu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Da[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Da[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Da[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Da[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Da[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Da[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Da[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Da[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Da),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Da=[new st,new st,new st,new st,new st,new st,new st,new st],Bi=new st,$c=new El,Yr=new st,qr=new st,Zr=new st,ps=new st,ms=new st,Xs=new st,cl=new st,tu=new st,eu=new st,Ws=new st;function zh(o,e,i,s,l){for(let f=0,d=o.length-3;f<=d;f+=3){Ws.fromArray(o,f);const h=l.x*Math.abs(Ws.x)+l.y*Math.abs(Ws.y)+l.z*Math.abs(Ws.z),p=e.dot(Ws),m=i.dot(Ws),_=s.dot(Ws);if(Math.max(-Math.max(p,m,_),Math.min(p,m,_))>h)return!1}return!0}const vn=new st,nu=new ue;let RE=0;class Ia extends Ss{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:RE++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=rE,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,f=this.itemSize;l<f;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)nu.fromBufferAttribute(this,i),nu.applyMatrix3(e),this.setXY(i,nu.x,nu.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyMatrix3(e),this.setXYZ(i,vn.x,vn.y,vn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyMatrix4(e),this.setXYZ(i,vn.x,vn.y,vn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.applyNormalMatrix(e),this.setXYZ(i,vn.x,vn.y,vn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)vn.fromBufferAttribute(this,i),vn.transformDirection(e),this.setXYZ(i,vn.x,vn.y,vn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=ol(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=Jn(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ol(i,this.array)),i}setX(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ol(i,this.array)),i}setY(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ol(i,this.array)),i}setZ(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ol(i,this.array)),i}setW(e,i){return this.normalized&&(i=Jn(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array),l=Jn(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,f){return e*=this.itemSize,this.normalized&&(i=Jn(i,this.array),s=Jn(s,this.array),l=Jn(l,this.array),f=Jn(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Q_ extends Ia{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class J_ extends Ia{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class yn extends Ia{constructor(e,i,s){super(new Float32Array(e),i,s)}}const CE=new El,ul=new st,Bh=new st;class zu{constructor(e=new st,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):CE.setFromPoints(e).getCenter(s);let l=0;for(let f=0,d=e.length;f<d;f++)l=Math.max(l,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ul.subVectors(e,this.center);const i=ul.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ul,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Bh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ul.copy(e.center).add(Bh)),this.expandByPoint(ul.copy(e.center).sub(Bh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let wE=0;const Ai=new nn,Fh=new On,Kr=new st,di=new El,fl=new El,Rn=new st;class ti extends Ss{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wE++}),this.uuid=bl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(oE(e)?J_:Q_)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new me().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ai.makeRotationFromQuaternion(e),this.applyMatrix4(Ai),this}rotateX(e){return Ai.makeRotationX(e),this.applyMatrix4(Ai),this}rotateY(e){return Ai.makeRotationY(e),this.applyMatrix4(Ai),this}rotateZ(e){return Ai.makeRotationZ(e),this.applyMatrix4(Ai),this}translate(e,i,s){return Ai.makeTranslation(e,i,s),this.applyMatrix4(Ai),this}scale(e,i,s){return Ai.makeScale(e,i,s),this.applyMatrix4(Ai),this}lookAt(e){return Fh.lookAt(e),Fh.updateMatrix(),this.applyMatrix4(Fh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Kr).negate(),this.translate(Kr.x,Kr.y,Kr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,f=e.length;l<f;l++){const d=e[l];s.push(d.x,d.y,d.z||0)}this.setAttribute("position",new yn(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const f=e[l];i.setXYZ(l,f.x,f.y,f.z||0)}e.length>i.count&&ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new El);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new st(-1/0,-1/0,-1/0),new st(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const f=i[s];di.setFromBufferAttribute(f),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new zu);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new st,1/0);return}if(e){const s=this.boundingSphere.center;if(di.setFromBufferAttribute(e),i)for(let f=0,d=i.length;f<d;f++){const h=i[f];fl.setFromBufferAttribute(h),this.morphTargetsRelative?(Rn.addVectors(di.min,fl.min),di.expandByPoint(Rn),Rn.addVectors(di.max,fl.max),di.expandByPoint(Rn)):(di.expandByPoint(fl.min),di.expandByPoint(fl.max))}di.getCenter(s);let l=0;for(let f=0,d=e.count;f<d;f++)Rn.fromBufferAttribute(e,f),l=Math.max(l,s.distanceToSquared(Rn));if(i)for(let f=0,d=i.length;f<d;f++){const h=i[f],p=this.morphTargetsRelative;for(let m=0,_=h.count;m<_;m++)Rn.fromBufferAttribute(h,m),p&&(Kr.fromBufferAttribute(e,m),Rn.add(Kr)),l=Math.max(l,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,f=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==s.count)&&(d=new Ia(new Float32Array(4*s.count),4),this.setAttribute("tangent",d));const h=[],p=[];for(let T=0;T<s.count;T++)h[T]=new st,p[T]=new st;const m=new st,_=new st,y=new st,v=new ue,b=new ue,R=new ue,O=new st,S=new st;function x(T,P,L){m.fromBufferAttribute(s,T),_.fromBufferAttribute(s,P),y.fromBufferAttribute(s,L),v.fromBufferAttribute(f,T),b.fromBufferAttribute(f,P),R.fromBufferAttribute(f,L),_.sub(m),y.sub(m),b.sub(v),R.sub(v);const G=1/(b.x*R.y-R.x*b.y);isFinite(G)&&(O.copy(_).multiplyScalar(R.y).addScaledVector(y,-b.y).multiplyScalar(G),S.copy(y).multiplyScalar(b.x).addScaledVector(_,-R.x).multiplyScalar(G),h[T].add(O),h[P].add(O),h[L].add(O),p[T].add(S),p[P].add(S),p[L].add(S))}let U=this.groups;U.length===0&&(U=[{start:0,count:e.count}]);for(let T=0,P=U.length;T<P;++T){const L=U[T],G=L.start,Z=L.count;for(let J=G,H=G+Z;J<H;J+=3)x(e.getX(J+0),e.getX(J+1),e.getX(J+2))}const V=new st,D=new st,N=new st,w=new st;function I(T){N.fromBufferAttribute(l,T),w.copy(N);const P=h[T];V.copy(P),V.sub(N.multiplyScalar(N.dot(P))).normalize(),D.crossVectors(w,P);const G=D.dot(p[T])<0?-1:1;d.setXYZW(T,V.x,V.y,V.z,G)}for(let T=0,P=U.length;T<P;++T){const L=U[T],G=L.start,Z=L.count;for(let J=G,H=G+Z;J<H;J+=3)I(e.getX(J+0)),I(e.getX(J+1)),I(e.getX(J+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new Ia(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let v=0,b=s.count;v<b;v++)s.setXYZ(v,0,0,0);const l=new st,f=new st,d=new st,h=new st,p=new st,m=new st,_=new st,y=new st;if(e)for(let v=0,b=e.count;v<b;v+=3){const R=e.getX(v+0),O=e.getX(v+1),S=e.getX(v+2);l.fromBufferAttribute(i,R),f.fromBufferAttribute(i,O),d.fromBufferAttribute(i,S),_.subVectors(d,f),y.subVectors(l,f),_.cross(y),h.fromBufferAttribute(s,R),p.fromBufferAttribute(s,O),m.fromBufferAttribute(s,S),h.add(_),p.add(_),m.add(_),s.setXYZ(R,h.x,h.y,h.z),s.setXYZ(O,p.x,p.y,p.z),s.setXYZ(S,m.x,m.y,m.z)}else for(let v=0,b=i.count;v<b;v+=3)l.fromBufferAttribute(i,v+0),f.fromBufferAttribute(i,v+1),d.fromBufferAttribute(i,v+2),_.subVectors(d,f),y.subVectors(l,f),_.cross(y),s.setXYZ(v+0,_.x,_.y,_.z),s.setXYZ(v+1,_.x,_.y,_.z),s.setXYZ(v+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(h,p){const m=h.array,_=h.itemSize,y=h.normalized,v=new m.constructor(p.length*_);let b=0,R=0;for(let O=0,S=p.length;O<S;O++){h.isInterleavedBufferAttribute?b=p[O]*h.data.stride+h.offset:b=p[O]*_;for(let x=0;x<_;x++)v[R++]=m[b++]}return new Ia(v,_,y)}if(this.index===null)return ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new ti,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const f=this.morphAttributes;for(const h in f){const p=[],m=f[h];for(let _=0,y=m.length;_<y;_++){const v=m[_],b=e(v,s);p.push(b)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,p=d.length;h<p;h++){const m=d[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let f=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],_=[];for(let y=0,v=m.length;y<v;y++){const b=m[y];_.push(b.toJSON(e.data))}_.length>0&&(l[p]=_,f=!0)}f&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const m in l){const _=l[m];this.setAttribute(m,_.clone(i))}const f=e.morphAttributes;for(const m in f){const _=[],y=f[m];for(let v=0,b=y.length;v<b;v++)_.push(y[v].clone(i));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,_=d.length;m<_;m++){const y=d[m];this.addGroup(y.start,y.count,y.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Hh=new st,DE=new st,NE=new me;class Ua{constructor(e=new st(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Hh.subVectors(s,i).cross(DE.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Hh),f=this.normal.dot(l);if(f===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/f;return s===!0&&(d<0||d>1)?null:i.copy(e.start).addScaledVector(l,d)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||NE.getNormalMatrix(e),l=this.coplanarPoint(Hh).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let UE=0;class lo extends Ss{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:UE++}),this.uuid=bl(),this.name="",this.type="Material",this.blending=vl,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=N_,this.blendDst=U_,this.blendEquation=to,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=xl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=$b,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yh,this.stencilZFail=yh,this.stencilZPass=yh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){ce(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){ce(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(f=>f.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(f){const d=[];for(const h in f){const p=f[h];delete p.metadata,d.push(p)}return d}if(i){const f=l(e.textures),d=l(e.images);f.length>0&&(s.textures=f),d.length>0&&(s.images=d)}return s}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ae().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new Ua().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new ue().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new ue().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let f=0;f!==l;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Na=new st,Gh=new st,iu=new st,au=new st;class Bu{constructor(e=new st,i=new st(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Na)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Na.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Na.copy(this.origin).addScaledVector(this.direction,i),Na.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Gh.copy(e).add(i).multiplyScalar(.5),iu.copy(i).sub(e).normalize(),au.copy(this.origin).sub(Gh);const f=e.distanceTo(i)*.5,d=-this.direction.dot(iu),h=au.dot(this.direction),p=-au.dot(iu),m=au.lengthSq(),_=Math.abs(1-d*d);let y,v,b,R;if(_>0)if(y=d*p-h,v=d*h-p,R=f*_,y>=0)if(v>=-R)if(v<=R){const O=1/_;y*=O,v*=O,b=y*(y+d*v+2*h)+v*(d*y+v+2*p)+m}else v=f,y=Math.max(0,-(d*v+h)),b=-y*y+v*(v+2*p)+m;else v=-f,y=Math.max(0,-(d*v+h)),b=-y*y+v*(v+2*p)+m;else v<=-R?(y=Math.max(0,-(-d*f+h)),v=y>0?-f:Math.min(Math.max(-f,-p),f),b=-y*y+v*(v+2*p)+m):v<=R?(y=0,v=Math.min(Math.max(-f,-p),f),b=v*(v+2*p)+m):(y=Math.max(0,-(d*f+h)),v=y>0?f:Math.min(Math.max(-f,-p),f),b=-y*y+v*(v+2*p)+m);else v=d>0?-f:f,y=Math.max(0,-(d*v+h)),b=-y*y+v*(v+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,y),l&&l.copy(Gh).addScaledVector(iu,v),b}intersectSphere(e,i){if(e.radius<0)return null;Na.subVectors(e.center,this.origin);const s=Na.dot(this.direction),l=Na.dot(Na)-s*s,f=e.radius*e.radius;if(l>f)return null;const d=Math.sqrt(f-l),h=s-d,p=s+d;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,f,d,h,p;const m=1/this.direction.x,_=1/this.direction.y,y=1/this.direction.z,v=this.origin;return m>=0?(s=(e.min.x-v.x)*m,l=(e.max.x-v.x)*m):(s=(e.max.x-v.x)*m,l=(e.min.x-v.x)*m),_>=0?(f=(e.min.y-v.y)*_,d=(e.max.y-v.y)*_):(f=(e.max.y-v.y)*_,d=(e.min.y-v.y)*_),s>d||f>l||((f>s||isNaN(s))&&(s=f),(d<l||isNaN(l))&&(l=d),y>=0?(h=(e.min.z-v.z)*y,p=(e.max.z-v.z)*y):(h=(e.max.z-v.z)*y,p=(e.min.z-v.z)*y),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,Na)!==null}intersectTriangle(e,i,s,l,f){const d=this.origin,h=this.direction,p=h.x,m=h.y,_=h.z,y=e.x-d.x,v=e.y-d.y,b=e.z-d.z,R=i.x-d.x,O=i.y-d.y,S=i.z-d.z,x=s.x-d.x,U=s.y-d.y,V=s.z-d.z,D=Math.abs(p),N=Math.abs(m),w=Math.abs(_);let I,T,P,L,G,Z,J,H,Y,z,k,$;if(D>=N&&D>=w?(P=p,Z=y,Y=R,$=x,p>=0?(I=m,T=_,L=v,G=b,J=O,H=S,z=U,k=V):(I=_,T=m,L=b,G=v,J=S,H=O,z=V,k=U)):N>=w?(P=m,Z=v,Y=O,$=U,m>=0?(I=_,T=p,L=b,G=y,J=S,H=R,z=V,k=x):(I=p,T=_,L=y,G=b,J=R,H=S,z=x,k=V)):(P=_,Z=b,Y=S,$=V,_>=0?(I=p,T=m,L=y,G=v,J=R,H=O,z=x,k=U):(I=m,T=p,L=v,G=y,J=O,H=R,z=U,k=x)),P===0)return null;const j=I/P,at=T/P,ot=1/P,zt=L-j*Z,wt=G-at*Z,se=J-j*Y,ie=H-at*Y,te=z-j*$,pt=k-at*$,mt=te*ie-pt*se,Ot=zt*pt-wt*te,$t=se*wt-ie*zt;if(l){if(mt<0||Ot<0||$t<0)return null}else if((mt<0||Ot<0||$t<0)&&(mt>0||Ot>0||$t>0))return null;const Mt=mt+Ot+$t;if(Mt===0)return null;const Gt=ot*(mt*Z+Ot*Y+$t*$);return(Mt>0?Gt<0:Gt>0)?null:this.at(Gt/Mt,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Uu extends lo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.combine=L_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Fx=new nn,js=new Bu,su=new zu,Hx=new st,ru=new st,ou=new st,lu=new st,Vh=new st,cu=new st,Gx=new st,uu=new st;class wi extends On{constructor(e=new ti,i=new Uu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,f=s.morphAttributes.position,d=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(f&&h){cu.set(0,0,0);for(let p=0,m=f.length;p<m;p++){const _=h[p],y=f[p];_!==0&&(Vh.fromBufferAttribute(y,e),d?cu.addScaledVector(Vh,_):cu.addScaledVector(Vh.sub(i),_))}i.add(cu)}return i}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.material,f=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),su.copy(s.boundingSphere),su.applyMatrix4(f),js.copy(e.ray).recast(e.near),!(su.containsPoint(js.origin)===!1&&(js.intersectSphere(su,Hx)===null||js.origin.distanceToSquared(Hx)>(e.far-e.near)**2))&&(Fx.copy(f).invert(),js.copy(e.ray).applyMatrix4(Fx),!(s.boundingBox!==null&&js.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,js)))}_computeIntersections(e,i,s){let l;const f=this.geometry,d=this.material,h=f.index,p=f.attributes.position,m=f.attributes.uv,_=f.attributes.uv1,y=f.attributes.normal,v=f.groups,b=f.drawRange;if(h!==null)if(Array.isArray(d))for(let R=0,O=v.length;R<O;R++){const S=v[R],x=d[S.materialIndex],U=Math.max(S.start,b.start),V=Math.min(h.count,Math.min(S.start+S.count,b.start+b.count));for(let D=U,N=V;D<N;D+=3){const w=h.getX(D),I=h.getX(D+1),T=h.getX(D+2);l=fu(this,x,e,s,m,_,y,w,I,T),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const R=Math.max(0,b.start),O=Math.min(h.count,b.start+b.count);for(let S=R,x=O;S<x;S+=3){const U=h.getX(S),V=h.getX(S+1),D=h.getX(S+2);l=fu(this,d,e,s,m,_,y,U,V,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(d))for(let R=0,O=v.length;R<O;R++){const S=v[R],x=d[S.materialIndex],U=Math.max(S.start,b.start),V=Math.min(p.count,Math.min(S.start+S.count,b.start+b.count));for(let D=U,N=V;D<N;D+=3){const w=D,I=D+1,T=D+2;l=fu(this,x,e,s,m,_,y,w,I,T),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=S.materialIndex,i.push(l))}}else{const R=Math.max(0,b.start),O=Math.min(p.count,b.start+b.count);for(let S=R,x=O;S<x;S+=3){const U=S,V=S+1,D=S+2;l=fu(this,d,e,s,m,_,y,U,V,D),l&&(l.faceIndex=Math.floor(S/3),i.push(l))}}}}function LE(o,e,i,s,l,f,d,h){let p;if(e.side===Wn?p=s.intersectTriangle(d,f,l,!0,h):p=s.intersectTriangle(l,f,d,e.side===Qs,h),p===null)return null;uu.copy(h),uu.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(uu);return m<i.near||m>i.far?null:{distance:m,point:uu.clone(),object:o}}function fu(o,e,i,s,l,f,d,h,p,m){o.getVertexPosition(h,ru),o.getVertexPosition(p,ou),o.getVertexPosition(m,lu);const _=LE(o,e,i,s,ru,ou,lu,Gx);if(_){const y=new st;Fi.getBarycoord(Gx,ru,ou,lu,y),l&&(_.uv=Fi.getInterpolatedAttribute(l,h,p,m,y,new ue)),f&&(_.uv1=Fi.getInterpolatedAttribute(f,h,p,m,y,new ue)),d&&(_.normal=Fi.getInterpolatedAttribute(d,h,p,m,y,new st),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const v={a:h,b:p,c:m,normal:new st,materialIndex:0};Fi.getNormal(ru,ou,lu,v.normal),_.face=v,_.barycoord=y}return _}class OE extends jn{constructor(e=null,i=1,s=1,l,f,d,h,p,m=Ln,_=Ln,y,v){super(null,d,h,p,m,_,l,f,y,v),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Ys=new zu,PE=new ue(.5,.5),du=new st;class am{constructor(e=new Ua,i=new Ua,s=new Ua,l=new Ua,f=new Ua,d=new Ua){this.planes=[e,i,s,l,f,d]}set(e,i,s,l,f,d){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(f),h[5].copy(d),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=oa,s=!1){const l=this.planes,f=e.elements,d=f[0],h=f[1],p=f[2],m=f[3],_=f[4],y=f[5],v=f[6],b=f[7],R=f[8],O=f[9],S=f[10],x=f[11],U=f[12],V=f[13],D=f[14],N=f[15];if(l[0].setComponents(m-d,b-_,x-R,N-U).normalize(),l[1].setComponents(m+d,b+_,x+R,N+U).normalize(),l[2].setComponents(m+h,b+y,x+O,N+V).normalize(),l[3].setComponents(m-h,b-y,x-O,N-V).normalize(),s)l[4].setComponents(p,v,S,D).normalize(),l[5].setComponents(m-p,b-v,x-S,N-D).normalize();else if(l[4].setComponents(m-p,b-v,x-S,N-D).normalize(),i===oa)l[5].setComponents(m+p,b+v,x+S,N+D).normalize();else if(i===yl)l[5].setComponents(p,v,S,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ys.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),Ys.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ys)}intersectsSprite(e){Ys.center.set(0,0,0);const i=PE.distanceTo(e.center);return Ys.radius=.7071067811865476+i,Ys.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ys)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(du.x=l.normal.x>0?e.max.x:e.min.x,du.y=l.normal.y>0?e.max.y:e.min.y,du.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(du)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class sm extends lo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Lu=new st,Ou=new st,Vx=new nn,dl=new Bu,hu=new zu,kh=new st,kx=new st;class IE extends On{constructor(e=new ti,i=new sm){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,f=i.count;l<f;l++)Lu.fromBufferAttribute(i,l-1),Ou.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Lu.distanceTo(Ou);e.setAttribute("lineDistance",new yn(s,1))}else ce("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.matrixWorld,f=e.params.Line.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),hu.copy(s.boundingSphere),hu.applyMatrix4(l),hu.radius+=f,e.ray.intersectsSphere(hu)===!1)return;Vx.copy(l).invert(),dl.copy(e.ray).applyMatrix4(Vx);const h=f/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,_=s.index,v=s.attributes.position;if(_!==null){const b=Math.max(0,d.start),R=Math.min(_.count,d.start+d.count);for(let O=b,S=R-1;O<S;O+=m){const x=_.getX(O),U=_.getX(O+1),V=pu(this,e,dl,p,x,U,O);V&&i.push(V)}if(this.isLineLoop){const O=_.getX(R-1),S=_.getX(b),x=pu(this,e,dl,p,O,S,R-1);x&&i.push(x)}}else{const b=Math.max(0,d.start),R=Math.min(v.count,d.start+d.count);for(let O=b,S=R-1;O<S;O+=m){const x=pu(this,e,dl,p,O,O+1,O);x&&i.push(x)}if(this.isLineLoop){const O=pu(this,e,dl,p,R-1,b,R-1);O&&i.push(O)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}}function pu(o,e,i,s,l,f,d){const h=o.geometry.attributes.position;if(Lu.fromBufferAttribute(h,l),Ou.fromBufferAttribute(h,f),i.distanceSqToSegment(Lu,Ou,kh,kx)>s)return;kh.applyMatrix4(o.matrixWorld);const m=e.ray.origin.distanceTo(kh);if(!(m<e.near||m>e.far))return{distance:m,point:kx.clone().applyMatrix4(o.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:o}}const Xx=new st,Wx=new st;class $_ extends IE{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,f=i.count;l<f;l+=2)Xx.fromBufferAttribute(i,l),Wx.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Xx.distanceTo(Wx);e.setAttribute("lineDistance",new yn(s,1))}else ce("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class tS extends jn{constructor(e=[],i=Js,s,l,f,d,h,p,m,_){super(e,i,s,l,f,d,h,p,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ml extends jn{constructor(e,i,s=ca,l,f,d,h=Ln,p=Ln,m,_=za,y=1){if(_!==za&&_!==Ks)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const v={width:e,height:i,depth:y};super(v,l,f,d,h,p,_,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new em(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return i.compareFunction=this.compareFunction,i}}class zE extends Ml{constructor(e,i=ca,s=Js,l,f,d=Ln,h=Ln,p,m=za){const _={width:e,height:e,depth:1},y=[_,_,_,_,_,_];super(e,e,i,s,l,f,d,h,p,m),this.image=y,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class eS extends jn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Tl extends ti{constructor(e=1,i=1,s=1,l=1,f=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:f,depthSegments:d};const h=this;l=Math.floor(l),f=Math.floor(f),d=Math.floor(d);const p=[],m=[],_=[],y=[];let v=0,b=0;R("z","y","x",-1,-1,s,i,e,d,f,0),R("z","y","x",1,-1,s,i,-e,d,f,1),R("x","z","y",1,1,e,s,i,l,d,2),R("x","z","y",1,-1,e,s,-i,l,d,3),R("x","y","z",1,-1,e,i,s,l,f,4),R("x","y","z",-1,-1,e,i,-s,l,f,5),this.setIndex(p),this.setAttribute("position",new yn(m,3)),this.setAttribute("normal",new yn(_,3)),this.setAttribute("uv",new yn(y,2));function R(O,S,x,U,V,D,N,w,I,T,P){const L=D/I,G=N/T,Z=D/2,J=N/2,H=w/2,Y=I+1,z=T+1;let k=0,$=0;const j=new st;for(let at=0;at<z;at++){const ot=at*G-J;for(let zt=0;zt<Y;zt++){const wt=zt*L-Z;j[O]=wt*U,j[S]=ot*V,j[x]=H,m.push(j.x,j.y,j.z),j[O]=0,j[S]=0,j[x]=w>0?1:-1,_.push(j.x,j.y,j.z),y.push(zt/I),y.push(1-at/T),k+=1}}for(let at=0;at<T;at++)for(let ot=0;ot<I;ot++){const zt=v+ot+Y*at,wt=v+ot+Y*(at+1),se=v+(ot+1)+Y*(at+1),ie=v+(ot+1)+Y*at;p.push(zt,wt,ie),p.push(wt,se,ie),$+=6}h.addGroup(b,$,P),b+=$,v+=k}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Tl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Fu extends ti{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const f=e/2,d=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,_=p+1,y=e/h,v=i/p,b=[],R=[],O=[],S=[];for(let x=0;x<_;x++){const U=x*v-d;for(let V=0;V<m;V++){const D=V*y-f;R.push(D,-U,0),O.push(0,0,1),S.push(V/h),S.push(1-x/p)}}for(let x=0;x<p;x++)for(let U=0;U<h;U++){const V=U+m*x,D=U+m*(x+1),N=U+1+m*(x+1),w=U+1+m*x;b.push(V,D,w),b.push(D,N,w)}this.setIndex(b),this.setAttribute("position",new yn(R,3)),this.setAttribute("normal",new yn(O,3)),this.setAttribute("uv",new yn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fu(e.width,e.height,e.widthSegments,e.heightSegments)}}class rm extends ti{constructor(e=.5,i=1,s=32,l=1,f=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:f,thetaLength:d},s=Math.max(3,s),l=Math.max(1,l);const h=[],p=[],m=[],_=[];let y=e;const v=(i-e)/l,b=new st,R=new ue;for(let O=0;O<=l;O++){for(let S=0;S<=s;S++){const x=f+S/s*d;b.x=y*Math.cos(x),b.y=y*Math.sin(x),p.push(b.x,b.y,b.z),m.push(0,0,1),R.x=(b.x/i+1)/2,R.y=(b.y/i+1)/2,_.push(R.x,R.y)}y+=v}for(let O=0;O<l;O++){const S=O*(s+1);for(let x=0;x<s;x++){const U=x+S,V=U,D=U+s+1,N=U+s+2,w=U+1;h.push(V,D,w),h.push(D,N,w)}}this.setIndex(h),this.setAttribute("position",new yn(p,3)),this.setAttribute("normal",new yn(m,3)),this.setAttribute("uv",new yn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rm(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Pu extends ti{constructor(e=1,i=32,s=16,l=0,f=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:f,thetaStart:d,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(d+h,Math.PI);let m=0;const _=[],y=new st,v=new st,b=[],R=[],O=[],S=[];for(let x=0;x<=s;x++){const U=[],V=x/s,D=d+V*h,N=e*Math.cos(D),w=Math.sqrt(e*e-N*N);let I=0;x===0&&d===0?I=.5/i:x===s&&p===Math.PI&&(I=-.5/i);for(let T=0;T<=i;T++){const P=T/i,L=l+P*f;y.x=-w*Math.cos(L),y.y=N,y.z=w*Math.sin(L),R.push(y.x,y.y,y.z),v.copy(y).normalize(),O.push(v.x,v.y,v.z),S.push(P+I,1-V),U.push(m++)}_.push(U)}for(let x=0;x<s;x++)for(let U=0;U<i;U++){const V=_[x][U+1],D=_[x][U],N=_[x+1][U],w=_[x+1][U+1];(x!==0||d>0)&&b.push(V,D,w),(x!==s-1||p<Math.PI)&&b.push(D,N,w)}this.setIndex(b),this.setAttribute("position",new yn(R,3)),this.setAttribute("normal",new yn(O,3)),this.setAttribute("uv",new yn(S,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function oo(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];if(jx(l))l.isRenderTargetTexture?(ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(jx(l[0])){const f=[];for(let d=0,h=l.length;d<h;d++)f[d]=l[d].clone();e[i][s]=f}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Xn(o){const e={};for(let i=0;i<o.length;i++){const s=oo(o[i]);for(const l in s)e[l]=s[l]}return e}function jx(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function BE(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function nS(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ie.workingColorSpace}const FE={clone:oo,merge:Xn};var HE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,GE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fa extends lo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=HE,this.fragmentShader=GE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=oo(e.uniforms),this.uniformsGroups=BE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const s in e.uniforms){const l=e.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Ae().setHex(l.value);break;case"v2":this.uniforms[s].value=new ue().fromArray(l.value);break;case"v3":this.uniforms[s].value=new st().fromArray(l.value);break;case"v4":this.uniforms[s].value=new on().fromArray(l.value);break;case"m3":this.uniforms[s].value=new me().fromArray(l.value);break;case"m4":this.uniforms[s].value=new nn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class VE extends fa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class kE extends lo{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Fp,this.normalScale=new ue(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class XE extends lo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qb,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class WE extends lo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class iS extends On{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=i}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const Xh=new nn,Yx=new st,qx=new st;class jE{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ue(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new nn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new am,this._frameExtents=new ue(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera;Yx.setFromMatrixPosition(e.matrixWorld),i.position.copy(Yx),qx.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(qx),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(e,i,s,l){Xh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s.setFromProjectionMatrix(Xh,e.coordinateSystem,e.reversedDepth);const f=this._frameExtents,d=l?l.z/f.x:1,h=l?l.w/f.y:1,p=l?l.x/f.x:0,m=l?l.y/f.y:0;e.coordinateSystem===yl||e.reversedDepth?i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,1,0,0,0,0,1):i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,.5,.5,0,0,0,1),i.multiply(Xh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const mu=new st,gu=new xs,na=new st;class aS extends On{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=oa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(mu,gu,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mu,gu,na.set(1,1,1)).invert()}updateWorldMatrix(e,i,s=!1){super.updateWorldMatrix(e,i,s),this.matrixWorld.decompose(mu,gu,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(mu,gu,na.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new st,Zx=new ue,Kx=new ue;class Ci extends aS{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Hp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Tu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hp*2*Math.atan(Math.tan(Tu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,i){return this.getViewBounds(e,Zx,Kx),i.subVectors(Kx,Zx)}setViewOffset(e,i,s,l,f,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Tu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,f=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const p=d.fullWidth,m=d.fullHeight;f+=d.offsetX*l/p,i-=d.offsetY*s/m,l*=d.width/p,s*=d.height/m}const h=this.filmOffset;h!==0&&(f+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class om extends aS{constructor(e=-1,i=1,s=1,l=-1,f=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=f,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,f,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let f=s-e,d=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=m*this.view.offsetX,d=f+m*this.view.width,h-=_*this.view.offsetY,p=h-_*this.view.height}this.projectionMatrix.makeOrthographic(f,d,h,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class YE extends jE{constructor(){super(new om(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Qx extends iS{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(On.DEFAULT_UP),this.updateMatrix(),this.target=new On,this.shadow=new YE}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class qE extends iS{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Qr=-90,Jr=1;class ZE extends On{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ci(Qr,Jr,e,i);l.layers=this.layers,this.add(l);const f=new Ci(Qr,Jr,e,i);f.layers=this.layers,this.add(f);const d=new Ci(Qr,Jr,e,i);d.layers=this.layers,this.add(d);const h=new Ci(Qr,Jr,e,i);h.layers=this.layers,this.add(h);const p=new Ci(Qr,Jr,e,i);p.layers=this.layers,this.add(p);const m=new Ci(Qr,Jr,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,f,d,h,p]=i;for(const m of i)this.remove(m);if(e===oa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===yl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,d,h,p,m,_]=this.children,y=e.getRenderTarget(),v=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),R=e.xr.enabled;e.xr.enabled=!1;const O=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let S=!1;e.isWebGLRenderer===!0?S=e.state.buffers.depth.getReversed():S=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,1,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(s,2,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,4,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),s.texture.generateMipmaps=O,e.setRenderTarget(s,5,l),S&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(y,v,b),e.xr.enabled=R,s.texture.needsPMREMUpdate=!0}}class KE extends Ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Jx=new nn;class $x{constructor(e,i,s=0,l=1/0){this.ray=new Bu(e,i),this.near=s,this.far=l,this.camera=null,this.layers=new nm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):He("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return Jx.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Jx),this}intersectObject(e,i=!0,s=[]){return Gp(e,this,s,i),s.sort(t_),s}intersectObjects(e,i=!0,s=[]){for(let l=0,f=e.length;l<f;l++)Gp(e[l],this,s,i);return s.sort(t_),s}}function t_(o,e){return o.distance-e.distance}function Gp(o,e,i,s){let l=!0;if(o.layers.test(e.layers)&&o.raycast(e,i)===!1&&(l=!1),l===!0&&s===!0){const f=o.children;for(let d=0,h=f.length;d<h;d++)Gp(f[d],e,i,!0)}}class e_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=De(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(De(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class sS{static{sS.prototype.isMatrix2=!0}constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const f=this.elements;return f[0]=e,f[2]=i,f[1]=s,f[3]=l,this}}class QE extends $_{constructor(e=10,i=10,s=4473924,l=8947848){s=new Ae(s),l=new Ae(l);const f=i/2,d=e/i,h=e/2,p=[],m=[];for(let v=0,b=0,R=-h;v<=i;v++,R+=d){p.push(-h,0,R,h,0,R),p.push(R,0,-h,R,0,h);const O=v===f?s:l;O.toArray(m,b),b+=3,O.toArray(m,b),b+=3,O.toArray(m,b),b+=3,O.toArray(m,b),b+=3}const _=new ti;_.setAttribute("position",new yn(p,3)),_.setAttribute("color",new yn(m,3));const y=new sm({vertexColors:!0,toneMapped:!1});super(_,y),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class JE extends Ss{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function n_(o,e,i,s){const l=$E(s);switch(i){case W_:return o*e;case Y_:return o*e/l.components*l.byteLength;case Kp:return o*e/l.components*l.byteLength;case $s:return o*e*2/l.components*l.byteLength;case Qp:return o*e*2/l.components*l.byteLength;case j_:return o*e*3/l.components*l.byteLength;case Hi:return o*e*4/l.components*l.byteLength;case Jp:return o*e*4/l.components*l.byteLength;case yu:case Mu:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case bu:case Eu:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case up:case dp:return Math.max(o,16)*Math.max(e,8)/4;case cp:case fp:return Math.max(o,8)*Math.max(e,8)/2;case hp:case pp:case gp:case vp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case mp:case Ru:case xp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case _p:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Sp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case yp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Mp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case bp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Ep:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Ap:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Rp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Cp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case wp:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Dp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Np:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Up:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Lp:case Op:case Pp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Ip:case zp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Cu:case Bp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function $E(o){switch(o){case hi:case G_:return{byteLength:1,components:1};case _l:case V_:case ua:return{byteLength:2,components:1};case qp:case Zp:return{byteLength:2,components:4};case ca:case Yp:case ra:return{byteLength:4,components:1};case k_:case X_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Wp}}));typeof window<"u"&&(window.__THREE__?ce("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Wp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function rS(){let o=null,e=!1,i=null,s=null;function l(f,d){s=o.requestAnimationFrame(l),i(f,d)}return{start:function(){e!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function t1(o){const e=new WeakMap;function i(h,p){const m=h.array,_=h.usage,y=m.byteLength,v=o.createBuffer();o.bindBuffer(p,v),o.bufferData(p,m,_),h.onUploadCallback();let b;if(m instanceof Float32Array)b=o.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)b=o.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?b=o.HALF_FLOAT:b=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)b=o.SHORT;else if(m instanceof Uint32Array)b=o.UNSIGNED_INT;else if(m instanceof Int32Array)b=o.INT;else if(m instanceof Int8Array)b=o.BYTE;else if(m instanceof Uint8Array)b=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)b=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:v,type:b,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:y}}function s(h,p,m){const _=p.array,y=p.updateRanges;if(o.bindBuffer(m,h),y.length===0)o.bufferSubData(m,0,_);else{y.sort((b,R)=>b.start-R.start);let v=0;for(let b=1;b<y.length;b++){const R=y[v],O=y[b];O.start<=R.start+R.count+1?R.count=Math.max(R.count,O.start+O.count-R.start):(++v,y[v]=O)}y.length=v+1;for(let b=0,R=y.length;b<R;b++){const O=y[b];o.bufferSubData(m,O.start*_.BYTES_PER_ELEMENT,_,O.start,O.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function f(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(o.deleteBuffer(p.buffer),e.delete(h))}function d(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:f,update:d}}var e1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n1=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,i1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,a1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,r1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,o1=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,l1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,c1=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,u1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,f1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,d1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,h1=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,p1=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,m1=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,g1=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,v1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,x1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,_1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,S1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,y1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,M1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,b1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,E1=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,T1=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,A1=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,R1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,C1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,w1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,D1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,N1="gl_FragColor = linearToOutputTexel( gl_FragColor );",U1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,L1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,O1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,P1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,I1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,B1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,F1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,H1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,G1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,V1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,k1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,W1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,j1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Y1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,q1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Z1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Q1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,J1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,$1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,tT=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,eT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,nT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,iT=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,aT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,sT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,rT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,oT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,lT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,cT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,uT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fT=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,hT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pT=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,mT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,gT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vT=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,xT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,_T=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ST=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,yT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,MT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,ET=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,TT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,AT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,RT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,CT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,wT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,DT=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,NT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,UT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,LT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,OT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,PT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,IT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,zT=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,BT=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,FT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,HT=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,GT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,VT=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,kT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,XT=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,WT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jT=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,YT=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qT=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ZT=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,KT=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,QT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,JT=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,$T=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const eA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,nA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,iA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,aA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,lA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,cA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,uA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,fA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,dA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,pA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,gA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_A=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,SA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,MA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,bA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,EA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,TA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,AA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,RA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,CA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,wA=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,DA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,NA=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,UA=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,LA=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OA=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Me={alphahash_fragment:e1,alphahash_pars_fragment:n1,alphamap_fragment:i1,alphamap_pars_fragment:a1,alphatest_fragment:s1,alphatest_pars_fragment:r1,aomap_fragment:o1,aomap_pars_fragment:l1,batching_pars_vertex:c1,batching_vertex:u1,begin_vertex:f1,beginnormal_vertex:d1,bsdfs:h1,iridescence_fragment:p1,bumpmap_pars_fragment:m1,clipping_planes_fragment:g1,clipping_planes_pars_fragment:v1,clipping_planes_pars_vertex:x1,clipping_planes_vertex:_1,color_fragment:S1,color_pars_fragment:y1,color_pars_vertex:M1,color_vertex:b1,common:E1,cube_uv_reflection_fragment:T1,defaultnormal_vertex:A1,displacementmap_pars_vertex:R1,displacementmap_vertex:C1,emissivemap_fragment:w1,emissivemap_pars_fragment:D1,colorspace_fragment:N1,colorspace_pars_fragment:U1,envmap_fragment:L1,envmap_common_pars_fragment:O1,envmap_pars_fragment:P1,envmap_pars_vertex:I1,envmap_physical_pars_fragment:Y1,envmap_vertex:z1,fog_vertex:B1,fog_pars_vertex:F1,fog_fragment:H1,fog_pars_fragment:G1,gradientmap_pars_fragment:V1,lightmap_pars_fragment:k1,lights_lambert_fragment:X1,lights_lambert_pars_fragment:W1,lights_pars_begin:j1,lights_toon_fragment:q1,lights_toon_pars_fragment:Z1,lights_phong_fragment:K1,lights_phong_pars_fragment:Q1,lights_physical_fragment:J1,lights_physical_pars_fragment:$1,lights_fragment_begin:tT,lights_fragment_maps:eT,lights_fragment_end:nT,lightprobes_pars_fragment:iT,logdepthbuf_fragment:aT,logdepthbuf_pars_fragment:sT,logdepthbuf_pars_vertex:rT,logdepthbuf_vertex:oT,map_fragment:lT,map_pars_fragment:cT,map_particle_fragment:uT,map_particle_pars_fragment:fT,metalnessmap_fragment:dT,metalnessmap_pars_fragment:hT,morphinstance_vertex:pT,morphcolor_vertex:mT,morphnormal_vertex:gT,morphtarget_pars_vertex:vT,morphtarget_vertex:xT,normal_fragment_begin:_T,normal_fragment_maps:ST,normal_pars_fragment:yT,normal_pars_vertex:MT,normal_vertex:bT,normalmap_pars_fragment:ET,clearcoat_normal_fragment_begin:TT,clearcoat_normal_fragment_maps:AT,clearcoat_pars_fragment:RT,iridescence_pars_fragment:CT,opaque_fragment:wT,packing:DT,premultiplied_alpha_fragment:NT,project_vertex:UT,dithering_fragment:LT,dithering_pars_fragment:OT,roughnessmap_fragment:PT,roughnessmap_pars_fragment:IT,shadowmap_pars_fragment:zT,shadowmap_pars_vertex:BT,shadowmap_vertex:FT,shadowmask_pars_fragment:HT,skinbase_vertex:GT,skinning_pars_vertex:VT,skinning_vertex:kT,skinnormal_vertex:XT,specularmap_fragment:WT,specularmap_pars_fragment:jT,tonemapping_fragment:YT,tonemapping_pars_fragment:qT,transmission_fragment:ZT,transmission_pars_fragment:KT,uv_pars_fragment:QT,uv_pars_vertex:JT,uv_vertex:$T,worldpos_vertex:tA,background_vert:eA,background_frag:nA,backgroundCube_vert:iA,backgroundCube_frag:aA,cube_vert:sA,cube_frag:rA,depth_vert:oA,depth_frag:lA,distance_vert:cA,distance_frag:uA,equirect_vert:fA,equirect_frag:dA,linedashed_vert:hA,linedashed_frag:pA,meshbasic_vert:mA,meshbasic_frag:gA,meshlambert_vert:vA,meshlambert_frag:xA,meshmatcap_vert:_A,meshmatcap_frag:SA,meshnormal_vert:yA,meshnormal_frag:MA,meshphong_vert:bA,meshphong_frag:EA,meshphysical_vert:TA,meshphysical_frag:AA,meshtoon_vert:RA,meshtoon_frag:CA,points_vert:wA,points_frag:DA,shadow_vert:NA,shadow_frag:UA,sprite_vert:LA,sprite_frag:OA},Ht={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new me}},envmap:{envMap:{value:null},envMapRotation:{value:new me},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new me}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new me}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new me},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new me},normalScale:{value:new ue(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new me},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new me}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new me}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new me}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new st},probesMax:{value:new st},probesResolution:{value:new st}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0},uvTransform:{value:new me}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new ue(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new me},alphaMap:{value:null},alphaMapTransform:{value:new me},alphaTest:{value:0}}},aa={basic:{uniforms:Xn([Ht.common,Ht.specularmap,Ht.envmap,Ht.aomap,Ht.lightmap,Ht.fog]),vertexShader:Me.meshbasic_vert,fragmentShader:Me.meshbasic_frag},lambert:{uniforms:Xn([Ht.common,Ht.specularmap,Ht.envmap,Ht.aomap,Ht.lightmap,Ht.emissivemap,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,Ht.fog,Ht.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:Me.meshlambert_vert,fragmentShader:Me.meshlambert_frag},phong:{uniforms:Xn([Ht.common,Ht.specularmap,Ht.envmap,Ht.aomap,Ht.lightmap,Ht.emissivemap,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,Ht.fog,Ht.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Me.meshphong_vert,fragmentShader:Me.meshphong_frag},standard:{uniforms:Xn([Ht.common,Ht.envmap,Ht.aomap,Ht.lightmap,Ht.emissivemap,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,Ht.roughnessmap,Ht.metalnessmap,Ht.fog,Ht.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag},toon:{uniforms:Xn([Ht.common,Ht.aomap,Ht.lightmap,Ht.emissivemap,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,Ht.gradientmap,Ht.fog,Ht.lights,{emissive:{value:new Ae(0)}}]),vertexShader:Me.meshtoon_vert,fragmentShader:Me.meshtoon_frag},matcap:{uniforms:Xn([Ht.common,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,Ht.fog,{matcap:{value:null}}]),vertexShader:Me.meshmatcap_vert,fragmentShader:Me.meshmatcap_frag},points:{uniforms:Xn([Ht.points,Ht.fog]),vertexShader:Me.points_vert,fragmentShader:Me.points_frag},dashed:{uniforms:Xn([Ht.common,Ht.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Me.linedashed_vert,fragmentShader:Me.linedashed_frag},depth:{uniforms:Xn([Ht.common,Ht.displacementmap]),vertexShader:Me.depth_vert,fragmentShader:Me.depth_frag},normal:{uniforms:Xn([Ht.common,Ht.bumpmap,Ht.normalmap,Ht.displacementmap,{opacity:{value:1}}]),vertexShader:Me.meshnormal_vert,fragmentShader:Me.meshnormal_frag},sprite:{uniforms:Xn([Ht.sprite,Ht.fog]),vertexShader:Me.sprite_vert,fragmentShader:Me.sprite_frag},background:{uniforms:{uvTransform:{value:new me},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Me.background_vert,fragmentShader:Me.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new me}},vertexShader:Me.backgroundCube_vert,fragmentShader:Me.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Me.cube_vert,fragmentShader:Me.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Me.equirect_vert,fragmentShader:Me.equirect_frag},distance:{uniforms:Xn([Ht.common,Ht.displacementmap,{referencePosition:{value:new st},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Me.distance_vert,fragmentShader:Me.distance_frag},shadow:{uniforms:Xn([Ht.lights,Ht.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:Me.shadow_vert,fragmentShader:Me.shadow_frag}};aa.physical={uniforms:Xn([aa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new me},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new me},clearcoatNormalScale:{value:new ue(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new me},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new me},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new me},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new me},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new me},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new me},transmissionSamplerSize:{value:new ue},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new me},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new me},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new me},anisotropyVector:{value:new ue},anisotropyMap:{value:null},anisotropyMapTransform:{value:new me}}]),vertexShader:Me.meshphysical_vert,fragmentShader:Me.meshphysical_frag};const vu={r:0,b:0,g:0},PA=new nn,oS=new me;oS.set(-1,0,0,0,1,0,0,0,1);function IA(o,e,i,s,l,f){const d=new Ae(0);let h=l===!0?0:1,p,m,_=null,y=0,v=null;function b(U){let V=U.isScene===!0?U.background:null;if(V&&V.isTexture){const D=U.backgroundBlurriness>0;V=e.get(V,D)}return V}function R(U){let V=!1;const D=b(U);D===null?S(d,h):D&&D.isColor&&(S(D,1),V=!0);const N=o.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,f):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(o.autoClear||V)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function O(U,V){const D=b(V);D&&(D.isCubeTexture||D.mapping===Iu)?(m===void 0&&(m=new wi(new Tl(1,1,1),new fa({name:"BackgroundCubeMaterial",uniforms:oo(aa.backgroundCube.uniforms),vertexShader:aa.backgroundCube.vertexShader,fragmentShader:aa.backgroundCube.fragmentShader,side:Wn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(N,w,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=D,m.material.uniforms.backgroundBlurriness.value=V.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(PA.makeRotationFromEuler(V.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(oS),m.material.toneMapped=Ie.getTransfer(D.colorSpace)!==qe,(_!==D||y!==D.version||v!==o.toneMapping)&&(m.material.needsUpdate=!0,_=D,y=D.version,v=o.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null)):D&&D.isTexture&&(p===void 0&&(p=new wi(new Fu(2,2),new fa({name:"BackgroundMaterial",uniforms:oo(aa.background.uniforms),vertexShader:aa.background.vertexShader,fragmentShader:aa.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=D,p.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,p.material.toneMapped=Ie.getTransfer(D.colorSpace)!==qe,D.matrixAutoUpdate===!0&&D.updateMatrix(),p.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||y!==D.version||v!==o.toneMapping)&&(p.material.needsUpdate=!0,_=D,y=D.version,v=o.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function S(U,V){U.getRGB(vu,nS(o)),i.buffers.color.setClear(vu.r,vu.g,vu.b,V,f)}function x(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,V=1){d.set(U),h=V,S(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(U){h=U,S(d,h)},render:R,addToRenderList:O,dispose:x}}function zA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=v(null);let f=l,d=!1;function h(G,Z,J,H,Y){let z=!1;const k=y(G,H,J,Z);f!==k&&(f=k,m(f.object)),z=b(G,H,J,Y),z&&R(G,H,J,Y),Y!==null&&e.update(Y,o.ELEMENT_ARRAY_BUFFER),(z||d)&&(d=!1,D(G,Z,J,H),Y!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(Y).buffer))}function p(){return o.createVertexArray()}function m(G){return o.bindVertexArray(G)}function _(G){return o.deleteVertexArray(G)}function y(G,Z,J,H){const Y=H.wireframe===!0;let z=s[Z.id];z===void 0&&(z={},s[Z.id]=z);const k=G.isInstancedMesh===!0?G.id:0;let $=z[k];$===void 0&&($={},z[k]=$);let j=$[J.id];j===void 0&&(j={},$[J.id]=j);let at=j[Y];return at===void 0&&(at=v(p()),j[Y]=at),at}function v(G){const Z=[],J=[],H=[];for(let Y=0;Y<i;Y++)Z[Y]=0,J[Y]=0,H[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Z,enabledAttributes:J,attributeDivisors:H,object:G,attributes:{},index:null}}function b(G,Z,J,H){const Y=f.attributes,z=Z.attributes;let k=0;const $=J.getAttributes();for(const j in $)if($[j].location>=0){const ot=Y[j];let zt=z[j];if(zt===void 0&&(j==="instanceMatrix"&&G.instanceMatrix&&(zt=G.instanceMatrix),j==="instanceColor"&&G.instanceColor&&(zt=G.instanceColor)),ot===void 0||ot.attribute!==zt||zt&&ot.data!==zt.data)return!0;k++}return f.attributesNum!==k||f.index!==H}function R(G,Z,J,H){const Y={},z=Z.attributes;let k=0;const $=J.getAttributes();for(const j in $)if($[j].location>=0){let ot=z[j];ot===void 0&&(j==="instanceMatrix"&&G.instanceMatrix&&(ot=G.instanceMatrix),j==="instanceColor"&&G.instanceColor&&(ot=G.instanceColor));const zt={};zt.attribute=ot,ot&&ot.data&&(zt.data=ot.data),Y[j]=zt,k++}f.attributes=Y,f.attributesNum=k,f.index=H}function O(){const G=f.newAttributes;for(let Z=0,J=G.length;Z<J;Z++)G[Z]=0}function S(G){x(G,0)}function x(G,Z){const J=f.newAttributes,H=f.enabledAttributes,Y=f.attributeDivisors;J[G]=1,H[G]===0&&(o.enableVertexAttribArray(G),H[G]=1),Y[G]!==Z&&(o.vertexAttribDivisor(G,Z),Y[G]=Z)}function U(){const G=f.newAttributes,Z=f.enabledAttributes;for(let J=0,H=Z.length;J<H;J++)Z[J]!==G[J]&&(o.disableVertexAttribArray(J),Z[J]=0)}function V(G,Z,J,H,Y,z,k){k===!0?o.vertexAttribIPointer(G,Z,J,Y,z):o.vertexAttribPointer(G,Z,J,H,Y,z)}function D(G,Z,J,H){O();const Y=H.attributes,z=J.getAttributes(),k=Z.defaultAttributeValues;for(const $ in z){const j=z[$];if(j.location>=0){let at=Y[$];if(at===void 0&&($==="instanceMatrix"&&G.instanceMatrix&&(at=G.instanceMatrix),$==="instanceColor"&&G.instanceColor&&(at=G.instanceColor)),at!==void 0){const ot=at.normalized,zt=at.itemSize,wt=e.get(at);if(wt===void 0)continue;const se=wt.buffer,ie=wt.type,te=wt.bytesPerElement,pt=ie===o.INT||ie===o.UNSIGNED_INT||at.gpuType===Yp;if(at.isInterleavedBufferAttribute){const mt=at.data,Ot=mt.stride,$t=at.offset;if(mt.isInstancedInterleavedBuffer){for(let Mt=0;Mt<j.locationSize;Mt++)x(j.location+Mt,mt.meshPerAttribute);G.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let Mt=0;Mt<j.locationSize;Mt++)S(j.location+Mt);o.bindBuffer(o.ARRAY_BUFFER,se);for(let Mt=0;Mt<j.locationSize;Mt++)V(j.location+Mt,zt/j.locationSize,ie,ot,Ot*te,($t+zt/j.locationSize*Mt)*te,pt)}else{if(at.isInstancedBufferAttribute){for(let mt=0;mt<j.locationSize;mt++)x(j.location+mt,at.meshPerAttribute);G.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let mt=0;mt<j.locationSize;mt++)S(j.location+mt);o.bindBuffer(o.ARRAY_BUFFER,se);for(let mt=0;mt<j.locationSize;mt++)V(j.location+mt,zt/j.locationSize,ie,ot,zt*te,zt/j.locationSize*mt*te,pt)}}else if(k!==void 0){const ot=k[$];if(ot!==void 0)switch(ot.length){case 2:o.vertexAttrib2fv(j.location,ot);break;case 3:o.vertexAttrib3fv(j.location,ot);break;case 4:o.vertexAttrib4fv(j.location,ot);break;default:o.vertexAttrib1fv(j.location,ot)}}}}U()}function N(){P();for(const G in s){const Z=s[G];for(const J in Z){const H=Z[J];for(const Y in H){const z=H[Y];for(const k in z)_(z[k].object),delete z[k];delete H[Y]}}delete s[G]}}function w(G){if(s[G.id]===void 0)return;const Z=s[G.id];for(const J in Z){const H=Z[J];for(const Y in H){const z=H[Y];for(const k in z)_(z[k].object),delete z[k];delete H[Y]}}delete s[G.id]}function I(G){for(const Z in s){const J=s[Z];for(const H in J){const Y=J[H];if(Y[G.id]===void 0)continue;const z=Y[G.id];for(const k in z)_(z[k].object),delete z[k];delete Y[G.id]}}}function T(G){for(const Z in s){const J=s[Z],H=G.isInstancedMesh===!0?G.id:0,Y=J[H];if(Y!==void 0){for(const z in Y){const k=Y[z];for(const $ in k)_(k[$].object),delete k[$];delete Y[z]}delete J[H],Object.keys(J).length===0&&delete s[Z]}}}function P(){L(),d=!0,f!==l&&(f=l,m(f.object))}function L(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:P,resetDefaultState:L,dispose:N,releaseStatesOfGeometry:w,releaseStatesOfObject:T,releaseStatesOfProgram:I,initAttributes:O,enableAttribute:S,disableUnusedAttributes:U}}function BA(o,e,i){let s;function l(p){s=p}function f(p,m){o.drawArrays(s,p,m),i.update(m,s,1)}function d(p,m,_){_!==0&&(o.drawArraysInstanced(s,p,m,_),i.update(m,s,_))}function h(p,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,m,0,_);let v=0;for(let b=0;b<_;b++)v+=m[b];i.update(v,s,1)}this.setMode=l,this.render=f,this.renderInstances=d,this.renderMultiDraw=h}function FA(o,e,i,s){let l;function f(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(I){return!(I!==Hi&&s.convert(I)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(I){const T=I===ua&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==hi&&I!==ra&&!T&&s.convert(I)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function p(I){if(I==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const _=p(m);_!==m&&(ce("WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const y=i.logarithmicDepthBuffer===!0,v=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&v===!1&&ce("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),R=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),O=o.getParameter(o.MAX_TEXTURE_SIZE),S=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),x=o.getParameter(o.MAX_VERTEX_ATTRIBS),U=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),V=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),N=o.getParameter(o.MAX_SAMPLES),w=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:y,reversedDepthBuffer:v,maxTextures:b,maxVertexTextures:R,maxTextureSize:O,maxCubemapSize:S,maxAttributes:x,maxVertexUniforms:U,maxVaryings:V,maxFragmentUniforms:D,maxSamples:N,samples:w}}function HA(o){const e=this;let i=null,s=0,l=!1,f=!1;const d=new Ua,h=new me,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(y,v){const b=y.length!==0||v||s!==0||l;return l=v,s=y.length,b},this.beginShadows=function(){f=!0,_(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(y,v){i=_(y,v,0)},this.setState=function(y,v,b){const R=y.clippingPlanes,O=y.clipIntersection,S=y.clipShadows,x=o.get(y);if(!l||R===null||R.length===0||f&&!S)f?_(null):m();else{const U=f?0:s,V=U*4;let D=x.clippingState||null;p.value=D,D=_(R,v,V,b);for(let N=0;N!==V;++N)D[N]=i[N];x.clippingState=D,this.numIntersection=O?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(y,v,b,R){const O=y!==null?y.length:0;let S=null;if(O!==0){if(S=p.value,R!==!0||S===null){const x=b+O*4,U=v.matrixWorldInverse;h.getNormalMatrix(U),(S===null||S.length<x)&&(S=new Float32Array(x));for(let V=0,D=b;V!==O;++V,D+=4)d.copy(y[V]).applyMatrix4(U,h),d.normal.toArray(S,D),S[D+3]=d.constant}p.value=S,p.needsUpdate=!0}return e.numPlanes=O,e.numIntersection=0,S}}const no=4,GA=6,VA=20,kA=256,hl=new om,i_=new Ae;let Wh=null,jh=0,Yh=0,qh=!1;const XA=new st,qs=new st;class a_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,f={}){const{size:d=256,position:h=XA}=f;Wh=this._renderer.getRenderTarget(),jh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,h),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=o_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=r_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Wh,jh,Yh),this._renderer.xr.enabled=qh,e.scissorTest=!1,$r(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Js||e.mapping===ro?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wh=this._renderer.getRenderTarget(),jh=this._renderer.getActiveCubeFace(),Yh=this._renderer.getActiveMipmapLevel(),qh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:ua,format:Hi,colorSpace:wu,depthBuffer:!1},l=s_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=s_(e,i,s);const{_lodMax:f}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=WA(f)),this._blurMaterial=YA(f,e,i),this._ggxMaterial=jA(f,e,i)}return l}_compileMaterial(e){const i=new wi(new ti,e);this._renderer.compile(i,hl)}_sceneToCubeUV(e,i,s,l,f){const p=new Ci(90,1,i,s),m=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],y=this._renderer,v=y.autoClear,b=y.toneMapping;y.getClearColor(i_),y.toneMapping=la,y.autoClear=!1,y.state.buffers.depth.getReversed()&&(y.setRenderTarget(l),y.clearDepth(),y.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wi(new Tl,new Uu({name:"PMREM.Background",side:Wn,depthWrite:!1,depthTest:!1})));const O=this._backgroundBox,S=O.material;let x=!1;const U=e.background;U?U.isColor&&(S.color.copy(U),e.background=null,x=!0):(S.color.copy(i_),x=!0);for(let V=0;V<6;V++){const D=V%3;D===0?(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+_[V],f.y,f.z)):D===1?(p.up.set(0,0,m[V]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+_[V],f.z)):(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+_[V]));const N=this._cubeSize;$r(l,D*N,V>2?N:0,N,N),y.setRenderTarget(l),x&&y.render(O,p),y.render(e,p)}y.toneMapping=b,y.autoClear=v,e.background=U}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Js||e.mapping===ro;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=o_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=r_());const f=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=f;const h=f.uniforms;h.envMap.value=e;const p=this._cubeSize;$r(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(d,hl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let f=1;f<l;f++)this._applyGGXFilter(e,f-1,f);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,f=this._pingPongRenderTarget,d=this._ggxMaterial,h=this._lodMeshes[s];h.material=d;const p=d.uniforms,m=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),y=Math.sqrt(m*m-_*_),v=m*1.25,b=y*v,{_lodMax:R}=this,O=this._sizeLods[s],S=3*O*(s>R-no?s-R+no:0),x=4*(this._cubeSize-O);p.envMap.value=e.texture,p.roughness.value=b,p.mipInt.value=R-i,$r(f,S,x,3*O,2*O),l.setRenderTarget(f),l.render(h,hl),p.envMap.value=f.texture,p.roughness.value=0,p.mipInt.value=R-s,$r(e,S,x,3*O,2*O),l.setRenderTarget(e),l.render(h,hl)}_blur(e,i,s,l){const f=this._pingPongRenderTarget,d=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(e,f,i,s,d),this._blurPass(f,e,s,s,d)}_blurPass(e,i,s,l,f){const d=this._renderer,h=this._blurMaterial,p=this._lodMeshes[l];p.material=h;const m=h.uniforms;m.envMap.value=e.texture,m.sigma.value=f,m.mipInt.value=this._lodMax-s;const _=this._sizeLods[l],y=3*_*(l>this._lodMax-no?l-this._lodMax+no:0),v=4*(this._cubeSize-_);$r(i,y,v,3*_,2*_),d.setRenderTarget(i),d.render(p,hl)}}function WA(o){const e=[],i=[];let s=o;const l=o-no+1+GA;for(let f=0;f<l;f++){const d=Math.pow(2,s);e.push(d);const h=1/(d-2),p=-h,m=1+h,_=[p,p,m,p,m,m,p,p,m,m,p,m],y=6,v=6,b=3,R=new Float32Array(b*v*y),O=new Float32Array(b*v*y);for(let x=0;x<y;x++){const U=x%3*2/3-1,V=x>2?0:-1,D=[U,V,0,U+2/3,V,0,U+2/3,V+1,0,U,V,0,U+2/3,V+1,0,U,V+1,0];R.set(D,b*v*x);for(let N=0;N<v;N++){const w=_[N*2]*2-1,I=_[N*2+1]*2-1;x===0?qs.set(1,I,w):x===1?qs.set(-w,1,-I):x===2?qs.set(-w,I,1):x===3?qs.set(-1,I,-w):x===4?qs.set(-w,-1,I):qs.set(w,I,-1),qs.toArray(O,(x*v+N)*b)}}const S=new ti;S.setAttribute("position",new Ia(R,b)),S.setAttribute("outputDirection",new Ia(O,b)),i.push(new wi(S,null)),s>no&&s--}return{lodMeshes:i,sizeLods:e}}function s_(o,e,i){const s=new Gi(o,e,i);return s.texture.mapping=Iu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function $r(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function jA(o,e,i){return new fa({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:kA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Hu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function YA(o,e,i){return new fa({name:"SphericalGaussianBlur",defines:{SAMPLES:VA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Hu(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function r_(){return new fa({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function o_(){return new fa({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Hu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oa,depthTest:!1,depthWrite:!1})}function Hu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class lS extends Gi{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new tS(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new Tl(5,5,5),f=new fa({name:"CubemapFromEquirect",uniforms:oo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Wn,blending:Oa});f.uniforms.tEquirect.value=i;const d=new wi(l,f),h=i.minFilter;return i.minFilter===Zs&&(i.minFilter=Bn),new ZE(1,10,this).update(e,d),i.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const f=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,s,l);e.setRenderTarget(f)}}function qA(o){let e=new WeakMap,i=new WeakMap,s=null;function l(v,b=!1){return v==null?null:b?d(v):f(v)}function f(v){if(v&&v.isTexture){const b=v.mapping;if(b===xh||b===_h)if(e.has(v)){const R=e.get(v).texture;return h(R,v.mapping)}else{const R=v.image;if(R&&R.height>0){const O=new lS(R.height);return O.fromEquirectangularTexture(o,v),e.set(v,O),v.addEventListener("dispose",m),h(O.texture,v.mapping)}else return null}}return v}function d(v){if(v&&v.isTexture){const b=v.mapping,R=b===xh||b===_h,O=b===Js||b===ro;if(R||O){let S=i.get(v);const x=S!==void 0?S.texture.pmremVersion:0;if(v.isRenderTargetTexture&&v.pmremVersion!==x)return s===null&&(s=new a_(o)),S=R?s.fromEquirectangular(v,S):s.fromCubemap(v,S),S.texture.pmremVersion=v.pmremVersion,i.set(v,S),S.texture;if(S!==void 0)return S.texture;{const U=v.image;return R&&U&&U.height>0||O&&U&&p(U)?(s===null&&(s=new a_(o)),S=R?s.fromEquirectangular(v):s.fromCubemap(v),S.texture.pmremVersion=v.pmremVersion,i.set(v,S),v.addEventListener("dispose",_),S.texture):null}}}return v}function h(v,b){return b===xh?v.mapping=Js:b===_h&&(v.mapping=ro),v}function p(v){let b=0;const R=6;for(let O=0;O<R;O++)v[O]!==void 0&&b++;return b===R}function m(v){const b=v.target;b.removeEventListener("dispose",m);const R=e.get(b);R!==void 0&&(e.delete(b),R.dispose())}function _(v){const b=v.target;b.removeEventListener("dispose",_);const R=i.get(b);R!==void 0&&(i.delete(b),R.dispose())}function y(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:y}}function ZA(o){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=o.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&ao("WebGLRenderer: "+s+" extension not supported."),l}}}function KA(o,e,i,s){const l={},f=new WeakMap;function d(y){const v=y.target;v.index!==null&&e.remove(v.index);for(const R in v.attributes)e.remove(v.attributes[R]);v.removeEventListener("dispose",d),delete l[v.id];const b=f.get(v);b&&(e.remove(b),f.delete(v)),s.releaseStatesOfGeometry(v),v.isInstancedBufferGeometry===!0&&delete v._maxInstanceCount,i.memory.geometries--}function h(y,v){return l[v.id]===!0||(v.addEventListener("dispose",d),l[v.id]=!0,i.memory.geometries++),v}function p(y){const v=y.attributes;for(const b in v)e.update(v[b],o.ARRAY_BUFFER)}function m(y){const v=[],b=y.index,R=y.attributes.position;let O=0;if(R===void 0)return;if(b!==null){const U=b.array;O=b.version;for(let V=0,D=U.length;V<D;V+=3){const N=U[V+0],w=U[V+1],I=U[V+2];v.push(N,w,w,I,I,N)}}else{const U=R.array;O=R.version;for(let V=0,D=U.length/3-1;V<D;V+=3){const N=V+0,w=V+1,I=V+2;v.push(N,w,w,I,I,N)}}const S=new(R.count>=65535?J_:Q_)(v,1);S.version=O;const x=f.get(y);x&&e.remove(x),f.set(y,S)}function _(y){const v=f.get(y);if(v){const b=y.index;b!==null&&v.version<b.version&&m(y)}else m(y);return f.get(y)}return{get:h,update:p,getWireframeAttribute:_}}function QA(o,e,i){let s;function l(y){s=y}let f,d;function h(y){f=y.type,d=y.bytesPerElement}function p(y,v){o.drawElements(s,v,f,y*d),i.update(v,s,1)}function m(y,v,b){b!==0&&(o.drawElementsInstanced(s,v,f,y*d,b),i.update(v,s,b))}function _(y,v,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,v,0,f,y,0,b);let O=0;for(let S=0;S<b;S++)O+=v[S];i.update(O,s,1)}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=_}function JA(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,d,h){switch(i.calls++,d){case o.TRIANGLES:i.triangles+=h*(f/3);break;case o.LINES:i.lines+=h*(f/2);break;case o.LINE_STRIP:i.lines+=h*(f-1);break;case o.LINE_LOOP:i.lines+=h*f;break;case o.POINTS:i.points+=h*f;break;default:He("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function $A(o,e,i){const s=new WeakMap,l=new on;function f(d,h,p){const m=d.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,y=_!==void 0?_.length:0;let v=s.get(h);if(v===void 0||v.count!==y){let P=function(){I.dispose(),s.delete(h),h.removeEventListener("dispose",P)};v!==void 0&&v.texture.dispose();const b=h.morphAttributes.position!==void 0,R=h.morphAttributes.normal!==void 0,O=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],x=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let V=0;b===!0&&(V=1),R===!0&&(V=2),O===!0&&(V=3);let D=h.attributes.position.count*V,N=1;D>e.maxTextureSize&&(N=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*N*4*y),I=new Z_(w,D,N,y);I.type=ra,I.needsUpdate=!0;const T=V*4;for(let L=0;L<y;L++){const G=S[L],Z=x[L],J=U[L],H=D*N*4*L;for(let Y=0;Y<G.count;Y++){const z=Y*T;b===!0&&(l.fromBufferAttribute(G,Y),w[H+z+0]=l.x,w[H+z+1]=l.y,w[H+z+2]=l.z,w[H+z+3]=0),R===!0&&(l.fromBufferAttribute(Z,Y),w[H+z+4]=l.x,w[H+z+5]=l.y,w[H+z+6]=l.z,w[H+z+7]=0),O===!0&&(l.fromBufferAttribute(J,Y),w[H+z+8]=l.x,w[H+z+9]=l.y,w[H+z+10]=l.z,w[H+z+11]=J.itemSize===4?l.w:1)}}v={count:y,texture:I,size:new ue(D,N)},s.set(h,v),h.addEventListener("dispose",P)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",d.morphTexture,i);else{let b=0;for(let O=0;O<m.length;O++)b+=m[O];const R=h.morphTargetsRelative?1:1-b;p.getUniforms().setValue(o,"morphTargetBaseInfluence",R),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",v.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",v.size)}return{update:f}}function tR(o,e,i,s,l){let f=new WeakMap;function d(m){const _=l.render.frame,y=m.geometry,v=e.get(m,y);if(f.get(v)!==_&&(e.update(v),f.set(v,_)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),f.get(m)!==_&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),f.set(m,_))),m.isSkinnedMesh){const b=m.skeleton;f.get(b)!==_&&(b.update(),f.set(b,_))}return v}function h(){f=new WeakMap}function p(m){const _=m.target;_.removeEventListener("dispose",p),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:d,dispose:h}}const eR={[O_]:"LINEAR_TONE_MAPPING",[P_]:"REINHARD_TONE_MAPPING",[I_]:"CINEON_TONE_MAPPING",[jp]:"ACES_FILMIC_TONE_MAPPING",[B_]:"AGX_TONE_MAPPING",[F_]:"NEUTRAL_TONE_MAPPING",[z_]:"CUSTOM_TONE_MAPPING"};function nR(o,e,i,s,l,f){const d=new Gi(e,i,{type:o,depthBuffer:l,stencilBuffer:f,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,p=null;const m=new ti;m.setAttribute("position",new yn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new yn([0,2,0,0,2,0],2));const _=new VE({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),y=new wi(m,_),v=new om(-1,1,1,-1,0,1);let b=null,R=null,O=!1,S,x=null,U=[],V=!1;this.setSize=function(D,N){d.setSize(D,N),h!==null&&h.setSize(D,N),p!==null&&p.setSize(D,N);for(let w=0;w<U.length;w++){const I=U[w];I.setSize&&I.setSize(D,N)}},this.setEffects=function(D){U=D,V=U.length>0&&U[0].isRenderPass===!0;const N=d.width,w=d.height;U.length>0&&h===null&&(h=new Gi(N,w,{type:ua,depthBuffer:!1,stencilBuffer:!1}),p=new Gi(N,w,{type:ua,depthBuffer:!1,stencilBuffer:!1}));for(let I=0;I<U.length;I++){const T=U[I];T.setSize&&T.setSize(N,w)}},this.begin=function(D,N){if(O||D.toneMapping===la&&U.length===0)return!1;if(x=N,N!==null){const w=N.width,I=N.height;(d.width!==w||d.height!==I)&&this.setSize(w,I)}return V===!1&&D.setRenderTarget(d),S=D.toneMapping,D.toneMapping=la,!0},this.hasRenderPass=function(){return V},this.end=function(D,N){D.toneMapping=S,O=!0;let w=d,I=h;for(let T=0;T<U.length;T++){const P=U[T];P.enabled!==!1&&(P.render(D,I,w,N),P.needsSwap!==!1&&(w=I,I=I===h?p:h))}if(b!==D.outputColorSpace||R!==D.toneMapping){b=D.outputColorSpace,R=D.toneMapping,_.defines={},Ie.getTransfer(b)===qe&&(_.defines.SRGB_TRANSFER="");const T=eR[R];T&&(_.defines[T]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=w.texture,D.setRenderTarget(x),D.render(y,v),x=null,O=!1},this.isCompositing=function(){return O},this.dispose=function(){d.dispose(),h!==null&&h.dispose(),p!==null&&p.dispose(),m.dispose(),_.dispose()}}const cS=new jn,Vp=new Ml(1,1),uS=new Z_,fS=new xE,dS=new tS,l_=[],c_=[],u_=new Float32Array(16),f_=new Float32Array(9),d_=new Float32Array(4);function co(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let f=l_[l];if(f===void 0&&(f=new Float32Array(l),l_[l]=f),e!==0){s.toArray(f,0);for(let d=1,h=0;d!==e;++d)h+=i,o[d].toArray(f,h)}return f}function Mn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function bn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function Gu(o,e){let i=c_[e];i===void 0&&(i=new Int32Array(e),c_[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function iR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function aR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2fv(this.addr,e),bn(i,e)}}function sR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Mn(i,e))return;o.uniform3fv(this.addr,e),bn(i,e)}}function rR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4fv(this.addr,e),bn(i,e)}}function oR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;d_.set(s),o.uniformMatrix2fv(this.addr,!1,d_),bn(i,s)}}function lR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;f_.set(s),o.uniformMatrix3fv(this.addr,!1,f_),bn(i,s)}}function cR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;u_.set(s),o.uniformMatrix4fv(this.addr,!1,u_),bn(i,s)}}function uR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function fR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2iv(this.addr,e),bn(i,e)}}function dR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3iv(this.addr,e),bn(i,e)}}function hR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4iv(this.addr,e),bn(i,e)}}function pR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function mR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2uiv(this.addr,e),bn(i,e)}}function gR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3uiv(this.addr,e),bn(i,e)}}function vR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4uiv(this.addr,e),bn(i,e)}}function xR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let f;this.type===o.SAMPLER_2D_SHADOW?(Vp.compareFunction=i.isReversedDepthBuffer()?tm:$p,f=Vp):f=cS,i.setTexture2D(e||f,l)}function _R(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||fS,l)}function SR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||dS,l)}function yR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||uS,l)}function MR(o){switch(o){case 5126:return iR;case 35664:return aR;case 35665:return sR;case 35666:return rR;case 35674:return oR;case 35675:return lR;case 35676:return cR;case 5124:case 35670:return uR;case 35667:case 35671:return fR;case 35668:case 35672:return dR;case 35669:case 35673:return hR;case 5125:return pR;case 36294:return mR;case 36295:return gR;case 36296:return vR;case 35678:case 36198:case 36298:case 36306:case 35682:return xR;case 35679:case 36299:case 36307:return _R;case 35680:case 36300:case 36308:case 36293:return SR;case 36289:case 36303:case 36311:case 36292:return yR}}function bR(o,e){o.uniform1fv(this.addr,e)}function ER(o,e){const i=co(e,this.size,2);o.uniform2fv(this.addr,i)}function TR(o,e){const i=co(e,this.size,3);o.uniform3fv(this.addr,i)}function AR(o,e){const i=co(e,this.size,4);o.uniform4fv(this.addr,i)}function RR(o,e){const i=co(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function CR(o,e){const i=co(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function wR(o,e){const i=co(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function DR(o,e){o.uniform1iv(this.addr,e)}function NR(o,e){o.uniform2iv(this.addr,e)}function UR(o,e){o.uniform3iv(this.addr,e)}function LR(o,e){o.uniform4iv(this.addr,e)}function OR(o,e){o.uniform1uiv(this.addr,e)}function PR(o,e){o.uniform2uiv(this.addr,e)}function IR(o,e){o.uniform3uiv(this.addr,e)}function zR(o,e){o.uniform4uiv(this.addr,e)}function BR(o,e,i){const s=this.cache,l=e.length,f=Gu(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));let d;this.type===o.SAMPLER_2D_SHADOW?d=Vp:d=cS;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||d,f[h])}function FR(o,e,i){const s=this.cache,l=e.length,f=Gu(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||fS,f[d])}function HR(o,e,i){const s=this.cache,l=e.length,f=Gu(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||dS,f[d])}function GR(o,e,i){const s=this.cache,l=e.length,f=Gu(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||uS,f[d])}function VR(o){switch(o){case 5126:return bR;case 35664:return ER;case 35665:return TR;case 35666:return AR;case 35674:return RR;case 35675:return CR;case 35676:return wR;case 5124:case 35670:return DR;case 35667:case 35671:return NR;case 35668:case 35672:return UR;case 35669:case 35673:return LR;case 5125:return OR;case 36294:return PR;case 36295:return IR;case 36296:return zR;case 35678:case 36198:case 36298:case 36306:case 35682:return BR;case 35679:case 36299:case 36307:return FR;case 35680:case 36300:case 36308:case 36293:return HR;case 36289:case 36303:case 36311:case 36292:return GR}}class kR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=MR(i.type)}}class XR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=VR(i.type)}}class WR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let f=0,d=l.length;f!==d;++f){const h=l[f];h.setValue(e,i[h.id],s)}}}const Zh=/(\w+)(\])?(\[|\.)?/g;function h_(o,e){o.seq.push(e),o.map[e.id]=e}function jR(o,e,i){const s=o.name,l=s.length;for(Zh.lastIndex=0;;){const f=Zh.exec(s),d=Zh.lastIndex;let h=f[1];const p=f[2]==="]",m=f[3];if(p&&(h=h|0),m===void 0||m==="["&&d+2===l){h_(i,m===void 0?new kR(h,o,e):new XR(h,o,e));break}else{let y=i.map[h];y===void 0&&(y=new WR(h),h_(i,y)),i=y}}}class Au{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let d=0;d<s;++d){const h=e.getActiveUniform(i,d),p=e.getUniformLocation(i,h.name);jR(h,p,this)}const l=[],f=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(d):f.push(d);l.length>0&&(this.seq=l.concat(f))}setValue(e,i,s,l){const f=this.map[i];f!==void 0&&f.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let f=0,d=i.length;f!==d;++f){const h=i[f],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,f=e.length;l!==f;++l){const d=e[l];d.id in i&&s.push(d)}return s}}function p_(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const YR=37297;let qR=0;function ZR(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let d=l;d<f;d++){const h=d+1;s.push(`${h===e?">":" "} ${h}: ${i[d]}`)}return s.join(`
`)}const m_=new me;function KR(o){Ie._getMatrix(m_,Ie.workingColorSpace,o);const e=`mat3( ${m_.elements.map(i=>i.toFixed(4))} )`;switch(Ie.getTransfer(o)){case Du:return[e,"LinearTransferOETF"];case qe:return[e,"sRGBTransferOETF"];default:return ce("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function g_(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(s&&f==="")return"";const d=/ERROR: 0:(\d+)/.exec(f);if(d){const h=parseInt(d[1]);return i.toUpperCase()+`

`+f+`

`+ZR(o.getShaderSource(e),h)}else return f}function QR(o,e){const i=KR(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const JR={[O_]:"Linear",[P_]:"Reinhard",[I_]:"Cineon",[jp]:"ACESFilmic",[B_]:"AgX",[F_]:"Neutral",[z_]:"Custom"};function $R(o,e){const i=JR[e];return i===void 0?(ce("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const xu=new st;function tC(){Ie.getLuminanceCoefficients(xu);const o=xu.x.toFixed(4),e=xu.y.toFixed(4),i=xu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function eC(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function nC(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function iC(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const f=o.getActiveAttrib(e,l),d=f.name;let h=1;f.type===o.FLOAT_MAT2&&(h=2),f.type===o.FLOAT_MAT3&&(h=3),f.type===o.FLOAT_MAT4&&(h=4),i[d]={type:f.type,location:o.getAttribLocation(e,d),locationSize:h}}return i}function gl(o){return o!==""}function v_(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function x_(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const aC=/^[ \t]*#include +<([\w\d./]+)>/gm;function kp(o){return o.replace(aC,rC)}const sC=new Map;function rC(o,e){let i=Me[e];if(i===void 0){const s=sC.get(e);if(s!==void 0)i=Me[s],ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return kp(i)}const oC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function __(o){return o.replace(oC,lC)}function lC(o,e,i,s){let l="";for(let f=parseInt(e);f<parseInt(i);f++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return l}function S_(o){let e=`precision ${o.precision} float;
	precision ${o.precision} int;
	precision ${o.precision} sampler2D;
	precision ${o.precision} samplerCube;
	precision ${o.precision} sampler3D;
	precision ${o.precision} sampler2DArray;
	precision ${o.precision} sampler2DShadow;
	precision ${o.precision} samplerCubeShadow;
	precision ${o.precision} sampler2DArrayShadow;
	precision ${o.precision} isampler2D;
	precision ${o.precision} isampler3D;
	precision ${o.precision} isamplerCube;
	precision ${o.precision} isampler2DArray;
	precision ${o.precision} usampler2D;
	precision ${o.precision} usampler3D;
	precision ${o.precision} usamplerCube;
	precision ${o.precision} usampler2DArray;
	`;return o.precision==="highp"?e+=`
#define HIGH_PRECISION`:o.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:o.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const cC={[Su]:"SHADOWMAP_TYPE_PCF",[ml]:"SHADOWMAP_TYPE_VSM"};function uC(o){return cC[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const fC={[Js]:"ENVMAP_TYPE_CUBE",[ro]:"ENVMAP_TYPE_CUBE",[Iu]:"ENVMAP_TYPE_CUBE_UV"};function dC(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":fC[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const hC={[ro]:"ENVMAP_MODE_REFRACTION"};function pC(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":hC[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const mC={[L_]:"ENVMAP_BLENDING_MULTIPLY",[qb]:"ENVMAP_BLENDING_MIX",[Zb]:"ENVMAP_BLENDING_ADD"};function gC(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":mC[o.combine]||"ENVMAP_BLENDING_NONE"}function vC(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function xC(o,e,i,s){const l=o.getContext(),f=i.defines;let d=i.vertexShader,h=i.fragmentShader;const p=uC(i),m=dC(i),_=pC(i),y=gC(i),v=vC(i),b=eC(i),R=nC(f),O=l.createProgram();let S,x,U=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(S=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(gl).join(`
`),S.length>0&&(S+=`
`),x=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R].filter(gl).join(`
`),x.length>0&&(x+=`
`)):(S=[S_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),x=[S_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,R,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+_:"",i.envMap?"#define "+y:"",v?"#define CUBEUV_TEXEL_WIDTH "+v.texelWidth:"",v?"#define CUBEUV_TEXEL_HEIGHT "+v.texelHeight:"",v?"#define CUBEUV_MAX_MIP "+v.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==la?"#define TONE_MAPPING":"",i.toneMapping!==la?Me.tonemapping_pars_fragment:"",i.toneMapping!==la?$R("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",Me.colorspace_pars_fragment,QR("linearToOutputTexel",i.outputColorSpace),tC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),d=kp(d),d=v_(d,i),d=x_(d,i),h=kp(h),h=v_(h,i),h=x_(h,i),d=__(d),h=__(h),i.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,S=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+S,x=["#define varying in",i.glslVersion===Tx?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Tx?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const V=U+S+d,D=U+x+h,N=p_(l,l.VERTEX_SHADER,V),w=p_(l,l.FRAGMENT_SHADER,D);l.attachShader(O,N),l.attachShader(O,w),i.index0AttributeName!==void 0?l.bindAttribLocation(O,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(O,0,"position"),l.linkProgram(O);function I(G){if(o.debug.checkShaderErrors){const Z=l.getProgramInfoLog(O)||"",J=l.getShaderInfoLog(N)||"",H=l.getShaderInfoLog(w)||"",Y=Z.trim(),z=J.trim(),k=H.trim();let $=!0,j=!0;if(l.getProgramParameter(O,l.LINK_STATUS)===!1)if($=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,O,N,w);else{const at=g_(l,N,"vertex"),ot=g_(l,w,"fragment");He("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(O,l.VALIDATE_STATUS)+`

Material Name: `+G.name+`
Material Type: `+G.type+`

Program Info Log: `+Y+`
`+at+`
`+ot)}else Y!==""?ce("WebGLProgram: Program Info Log:",Y):(z===""||k==="")&&(j=!1);j&&(G.diagnostics={runnable:$,programLog:Y,vertexShader:{log:z,prefix:S},fragmentShader:{log:k,prefix:x}})}l.deleteShader(N),l.deleteShader(w),T=new Au(l,O),P=iC(l,O)}let T;this.getUniforms=function(){return T===void 0&&I(this),T};let P;this.getAttributes=function(){return P===void 0&&I(this),P};let L=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=l.getProgramParameter(O,YR)),L},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(O),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=qR++,this.cacheKey=e,this.usedTimes=1,this.program=O,this.vertexShader=N,this.fragmentShader=w,this}let _C=0;class SC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,s){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new yC(e),i.set(e,s)),s}}class yC{constructor(e){this.id=_C++,this.code=e,this.usedTimes=0}}function MC(o){return o===$s||o===Ru||o===Cu}function bC(o,e,i,s,l,f){const d=new nm,h=new SC,p=new Set,m=[],_=new Map,y=s.logarithmicDepthBuffer;let v=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function R(T){return p.add(T),T===0?"uv":`uv${T}`}function O(T,P,L,G,Z,J){const H=G.fog,Y=Z.geometry,z=T.isMeshStandardMaterial||T.isMeshLambertMaterial||T.isMeshPhongMaterial?G.environment:null,k=T.isMeshStandardMaterial||T.isMeshLambertMaterial&&!T.envMap||T.isMeshPhongMaterial&&!T.envMap,$=e.get(T.envMap||z,k),j=$&&$.mapping===Iu?$.image.height:null,at=b[T.type];T.precision!==null&&(v=s.getMaxPrecision(T.precision),v!==T.precision&&ce("WebGLProgram.getParameters:",T.precision,"not supported, using",v,"instead."));const ot=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,zt=ot!==void 0?ot.length:0;let wt=0;Y.morphAttributes.position!==void 0&&(wt=1),Y.morphAttributes.normal!==void 0&&(wt=2),Y.morphAttributes.color!==void 0&&(wt=3);let se,ie,te,pt;if(at){const Oe=aa[at];se=Oe.vertexShader,ie=Oe.fragmentShader}else{se=T.vertexShader,ie=T.fragmentShader;const Oe=h.getVertexShaderStage(T),he=h.getFragmentShaderStage(T);h.update(T,Oe,he),te=Oe.id,pt=he.id}const mt=o.getRenderTarget(),Ot=o.state.buffers.depth.getReversed(),$t=Z.isInstancedMesh===!0,Mt=Z.isBatchedMesh===!0,Gt=!!T.map,ze=!!T.matcap,oe=!!$,ge=!!T.aoMap,ve=!!T.lightMap,ee=!!T.bumpMap&&T.wireframe===!1,et=!!T.normalMap,Tt=!!T.displacementMap,fe=!!T.emissiveMap,_e=!!T.metalnessMap,xe=!!T.roughnessMap,q=T.anisotropy>0,sn=T.clearcoat>0,Fe=T.dispersion>0,B=T.retroreflectivity>0,E=T.iridescence>0,it=T.sheen>0,ft=T.transmission>0,gt=q&&!!T.anisotropyMap,Et=sn&&!!T.clearcoatMap,Dt=sn&&!!T.clearcoatNormalMap,vt=sn&&!!T.clearcoatRoughnessMap,yt=E&&!!T.iridescenceMap,Ct=E&&!!T.iridescenceThicknessMap,Jt=it&&!!T.sheenColorMap,It=it&&!!T.sheenRoughnessMap,Pt=!!T.specularMap,Xt=!!T.specularColorMap,ae=!!T.specularIntensityMap,de=ft&&!!T.transmissionMap,K=ft&&!!T.thicknessMap,At=!!T.gradientMap,St=!!T.alphaMap,Nt=T.alphaTest>0,kt=!!T.alphaHash,bt=!!T.extensions;let Qt=la;T.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(Qt=o.toneMapping);const Vt={shaderID:at,shaderType:T.type,shaderName:T.name,vertexShader:se,fragmentShader:ie,defines:T.defines,customVertexShaderID:te,customFragmentShaderID:pt,isRawShaderMaterial:T.isRawShaderMaterial===!0,glslVersion:T.glslVersion,precision:v,batching:Mt,batchingColor:Mt&&Z._colorsTexture!==null,instancing:$t,instancingColor:$t&&Z.instanceColor!==null,instancingMorph:$t&&Z.morphTexture!==null,outputColorSpace:mt===null?o.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Ie.workingColorSpace,alphaToCoverage:!!T.alphaToCoverage,map:Gt,matcap:ze,envMap:oe,envMapMode:oe&&$.mapping,envMapCubeUVHeight:j,aoMap:ge,lightMap:ve,bumpMap:ee,normalMap:et,displacementMap:Tt,emissiveMap:fe,normalMapObjectSpace:et&&T.normalMapType===Jb,normalMapTangentSpace:et&&T.normalMapType===Fp,packedNormalMap:et&&T.normalMapType===Fp&&MC(T.normalMap.format),metalnessMap:_e,roughnessMap:xe,anisotropy:q,anisotropyMap:gt,clearcoat:sn,clearcoatMap:Et,clearcoatNormalMap:Dt,clearcoatRoughnessMap:vt,dispersion:Fe,retroreflection:B,iridescence:E,iridescenceMap:yt,iridescenceThicknessMap:Ct,sheen:it,sheenColorMap:Jt,sheenRoughnessMap:It,specularMap:Pt,specularColorMap:Xt,specularIntensityMap:ae,transmission:ft,transmissionMap:de,thicknessMap:K,gradientMap:At,opaque:T.transparent===!1&&T.blending===vl&&T.alphaToCoverage===!1,alphaMap:St,alphaTest:Nt,alphaHash:kt,combine:T.combine,mapUv:Gt&&R(T.map.channel),aoMapUv:ge&&R(T.aoMap.channel),lightMapUv:ve&&R(T.lightMap.channel),bumpMapUv:ee&&R(T.bumpMap.channel),normalMapUv:et&&R(T.normalMap.channel),displacementMapUv:Tt&&R(T.displacementMap.channel),emissiveMapUv:fe&&R(T.emissiveMap.channel),metalnessMapUv:_e&&R(T.metalnessMap.channel),roughnessMapUv:xe&&R(T.roughnessMap.channel),anisotropyMapUv:gt&&R(T.anisotropyMap.channel),clearcoatMapUv:Et&&R(T.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&R(T.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&R(T.clearcoatRoughnessMap.channel),iridescenceMapUv:yt&&R(T.iridescenceMap.channel),iridescenceThicknessMapUv:Ct&&R(T.iridescenceThicknessMap.channel),sheenColorMapUv:Jt&&R(T.sheenColorMap.channel),sheenRoughnessMapUv:It&&R(T.sheenRoughnessMap.channel),specularMapUv:Pt&&R(T.specularMap.channel),specularColorMapUv:Xt&&R(T.specularColorMap.channel),specularIntensityMapUv:ae&&R(T.specularIntensityMap.channel),transmissionMapUv:de&&R(T.transmissionMap.channel),thicknessMapUv:K&&R(T.thicknessMap.channel),alphaMapUv:St&&R(T.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(et||q),vertexNormals:!!Y.attributes.normal,vertexColors:T.vertexColors,vertexAlphas:T.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!Y.attributes.uv&&(Gt||St),fog:!!H,useFog:T.fog===!0,fogExp2:!!H&&H.isFogExp2,flatShading:T.wireframe===!1&&(T.flatShading===!0||Y.attributes.normal===void 0&&et===!1&&(T.isMeshLambertMaterial||T.isMeshPhongMaterial||T.isMeshStandardMaterial||T.isMeshPhysicalMaterial)),sizeAttenuation:T.sizeAttenuation===!0,logarithmicDepthBuffer:y,reversedDepthBuffer:Ot,skinning:Z.isSkinnedMesh===!0,hasPositionAttribute:Y.attributes.position!==void 0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:zt,morphTextureStride:wt,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:J.length,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:T.dithering,shadowMapEnabled:o.shadowMap.enabled&&L.length>0,shadowMapType:o.shadowMap.type,toneMapping:Qt,decodeVideoTexture:Gt&&T.map.isVideoTexture===!0&&Ie.getTransfer(T.map.colorSpace)===qe,decodeVideoTextureEmissive:fe&&T.emissiveMap.isVideoTexture===!0&&Ie.getTransfer(T.emissiveMap.colorSpace)===qe,premultipliedAlpha:T.premultipliedAlpha,doubleSided:T.side===sa,flipSided:T.side===Wn,useDepthPacking:T.depthPacking>=0,depthPacking:T.depthPacking||0,index0AttributeName:T.index0AttributeName,extensionClipCullDistance:bt&&T.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&T.extensions.multiDraw===!0||Mt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:T.customProgramCacheKey()};return Vt.vertexUv1s=p.has(1),Vt.vertexUv2s=p.has(2),Vt.vertexUv3s=p.has(3),p.clear(),Vt}function S(T){const P=[];if(T.shaderID?P.push(T.shaderID):(P.push(T.customVertexShaderID),P.push(T.customFragmentShaderID)),T.defines!==void 0)for(const L in T.defines)P.push(L),P.push(T.defines[L]);return T.isRawShaderMaterial===!1&&(x(P,T),U(P,T),P.push(o.outputColorSpace)),P.push(T.customProgramCacheKey),P.join()}function x(T,P){T.push(P.precision),T.push(P.outputColorSpace),T.push(P.envMapMode),T.push(P.envMapCubeUVHeight),T.push(P.mapUv),T.push(P.alphaMapUv),T.push(P.lightMapUv),T.push(P.aoMapUv),T.push(P.bumpMapUv),T.push(P.normalMapUv),T.push(P.displacementMapUv),T.push(P.emissiveMapUv),T.push(P.metalnessMapUv),T.push(P.roughnessMapUv),T.push(P.anisotropyMapUv),T.push(P.clearcoatMapUv),T.push(P.clearcoatNormalMapUv),T.push(P.clearcoatRoughnessMapUv),T.push(P.iridescenceMapUv),T.push(P.iridescenceThicknessMapUv),T.push(P.sheenColorMapUv),T.push(P.sheenRoughnessMapUv),T.push(P.specularMapUv),T.push(P.specularColorMapUv),T.push(P.specularIntensityMapUv),T.push(P.transmissionMapUv),T.push(P.thicknessMapUv),T.push(P.combine),T.push(P.fogExp2),T.push(P.sizeAttenuation),T.push(P.morphTargetsCount),T.push(P.morphAttributeCount),T.push(P.numSunLights),T.push(P.numDirLights),T.push(P.numPointLights),T.push(P.numSpotLights),T.push(P.numSpotLightMaps),T.push(P.numHemiLights),T.push(P.numRectAreaLights),T.push(P.numSunLightShadows),T.push(P.numDirLightShadows),T.push(P.numPointLightShadows),T.push(P.numSpotLightShadows),T.push(P.numSpotLightShadowsWithMaps),T.push(P.numLightProbes),T.push(P.shadowMapType),T.push(P.toneMapping),T.push(P.numClippingPlanes),T.push(P.numClipIntersection),T.push(P.depthPacking)}function U(T,P){d.disableAll(),P.instancing&&d.enable(0),P.instancingColor&&d.enable(1),P.instancingMorph&&d.enable(2),P.matcap&&d.enable(3),P.envMap&&d.enable(4),P.normalMapObjectSpace&&d.enable(5),P.normalMapTangentSpace&&d.enable(6),P.clearcoat&&d.enable(7),P.iridescence&&d.enable(8),P.alphaTest&&d.enable(9),P.vertexColors&&d.enable(10),P.vertexAlphas&&d.enable(11),P.vertexUv1s&&d.enable(12),P.vertexUv2s&&d.enable(13),P.vertexUv3s&&d.enable(14),P.vertexTangents&&d.enable(15),P.anisotropy&&d.enable(16),P.alphaHash&&d.enable(17),P.batching&&d.enable(18),P.dispersion&&d.enable(19),P.retroreflection&&d.enable(24),P.batchingColor&&d.enable(20),P.gradientMap&&d.enable(21),P.packedNormalMap&&d.enable(22),P.vertexNormals&&d.enable(23),T.push(d.mask),d.disableAll(),P.fog&&d.enable(0),P.useFog&&d.enable(1),P.flatShading&&d.enable(2),P.logarithmicDepthBuffer&&d.enable(3),P.reversedDepthBuffer&&d.enable(4),P.skinning&&d.enable(5),P.morphTargets&&d.enable(6),P.morphNormals&&d.enable(7),P.morphColors&&d.enable(8),P.premultipliedAlpha&&d.enable(9),P.shadowMapEnabled&&d.enable(10),P.doubleSided&&d.enable(11),P.flipSided&&d.enable(12),P.useDepthPacking&&d.enable(13),P.dithering&&d.enable(14),P.transmission&&d.enable(15),P.sheen&&d.enable(16),P.opaque&&d.enable(17),P.pointsUvs&&d.enable(18),P.decodeVideoTexture&&d.enable(19),P.decodeVideoTextureEmissive&&d.enable(20),P.alphaToCoverage&&d.enable(21),P.numLightProbeGrids>0&&d.enable(22),P.hasPositionAttribute&&d.enable(23),T.push(d.mask)}function V(T){const P=b[T.type];let L;if(P){const G=aa[P];L=FE.clone(G.uniforms)}else L=T.uniforms;return L}function D(T,P){let L=_.get(P);return L!==void 0?++L.usedTimes:(L=new xC(o,P,T,l),m.push(L),_.set(P,L)),L}function N(T){if(--T.usedTimes===0){const P=m.indexOf(T);m[P]=m[m.length-1],m.pop(),_.delete(T.cacheKey),T.destroy()}}function w(T){h.remove(T)}function I(){h.dispose()}return{getParameters:O,getProgramCacheKey:S,getUniforms:V,acquireProgram:D,releaseProgram:N,releaseShaderCache:w,programs:m,dispose:I}}function EC(){let o=new WeakMap;function e(d){return o.has(d)}function i(d){let h=o.get(d);return h===void 0&&(h={},o.set(d,h)),h}function s(d){o.delete(d)}function l(d,h,p){o.get(d)[h]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:f}}function TC(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.materialVariant!==e.materialVariant?o.materialVariant-e.materialVariant:o.z!==e.z?o.z-e.z:o.id-e.id}function y_(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function M_(){const o=[];let e=0;const i=[],s=[],l=[];function f(){e=0,i.length=0,s.length=0,l.length=0}function d(v){let b=0;return v.isInstancedMesh&&(b+=2),v.isSkinnedMesh&&(b+=1),b}function h(v,b,R,O,S,x){let U=o[e];return U===void 0?(U={id:v.id,object:v,geometry:b,material:R,materialVariant:d(v),groupOrder:O,renderOrder:v.renderOrder,z:S,group:x},o[e]=U):(U.id=v.id,U.object=v,U.geometry=b,U.material=R,U.materialVariant=d(v),U.groupOrder=O,U.renderOrder=v.renderOrder,U.z=S,U.group=x),e++,U}function p(v,b,R,O,S,x,U){U.reversedDepth===!0&&(S=-S);const V=h(v,b,R,O,S,x);R.transmission>0?s.push(V):R.transparent===!0?l.push(V):i.push(V)}function m(v,b,R,O,S,x){const U=h(v,b,R,O,S,x);R.transmission>0?s.unshift(U):R.transparent===!0?l.unshift(U):i.unshift(U)}function _(v,b){i.length>1&&i.sort(v||TC),s.length>1&&s.sort(b||y_),l.length>1&&l.sort(b||y_)}function y(){for(let v=e,b=o.length;v<b;v++){const R=o[v];if(R.id===null)break;R.id=null,R.object=null,R.geometry=null,R.material=null,R.group=null}}return{opaque:i,transmissive:s,transparent:l,init:f,push:p,unshift:m,finish:y,sort:_}}function AC(){let o=new WeakMap;function e(s,l){const f=o.get(s);let d;return f===void 0?(d=new M_,o.set(s,[d])):l>=f.length?(d=new M_,f.push(d)):d=f[l],d}function i(){o=new WeakMap}return{get:e,dispose:i}}function RC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={direction:new st,color:new Ae};break;case"SpotLight":i={position:new st,direction:new st,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new st,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":i={direction:new st,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":i={color:new Ae,position:new st,halfWidth:new st,halfHeight:new st};break}return o[e.id]=i,i}}}function CC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ue,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let wC=0;function DC(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function NC(o){const e=new RC,i=CC(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new st);const l=new st,f=new nn,d=new nn;function h(m){let _=0,y=0,v=0;for(let Z=0;Z<9;Z++)s.probe[Z].set(0,0,0);let b=0,R=0,O=0,S=0,x=0,U=0,V=0,D=0,N=0,w=0,I=0,T=0,P=0,L=0;m.sort(DC);for(let Z=0,J=m.length;Z<J;Z++){const H=m[Z],Y=H.color,z=H.intensity,k=H.distance;let $=null;if(H.shadow&&H.shadow.map&&(H.shadow.map.texture.format===$s?$=H.shadow.map.texture:$=H.shadow.map.depthTexture||H.shadow.map.texture),H.isAmbientLight)_+=Y.r*z,y+=Y.g*z,v+=Y.b*z;else if(H.isLightProbe){for(let j=0;j<9;j++)s.probe[j].addScaledVector(H.sh.coefficients[j],z);L++}else if(H.isSunLight){const j=e.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const at=H.shadow,ot=i.get(H);ot.shadowIntensity=at.intensity,ot.shadowBias=at.bias,ot.shadowNormalBias=at.normalBias,ot.shadowRadius=at.radius,ot.shadowMapSize.copy(at.mapSize).multiply(at.getFrameExtents()),s.sunShadow[R]=ot,s.sunShadowMap[R]=$;const zt=at.getViewportCount();for(let wt=0;wt<zt;wt++)s.sunShadowMatrix[O+wt]=at.getMatrix(wt),s.sunShadowCascade[O+wt]=at._cascadeData[wt];O+=zt,R++}s.sun[b]=j,b++}else if(H.isDirectionalLight){const j=e.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity),H.castShadow){const at=H.shadow,ot=i.get(H);ot.shadowIntensity=at.intensity,ot.shadowBias=at.bias,ot.shadowNormalBias=at.normalBias,ot.shadowRadius=at.radius,ot.shadowMapSize=at.mapSize,s.directionalShadow[S]=ot,s.directionalShadowMap[S]=$,s.directionalShadowMatrix[S]=H.shadow.matrix,N++}s.directional[S]=j,S++}else if(H.isSpotLight){const j=e.get(H);j.position.setFromMatrixPosition(H.matrixWorld),j.color.copy(Y).multiplyScalar(z),j.distance=k,j.coneCos=Math.cos(H.angle),j.penumbraCos=Math.cos(H.angle*(1-H.penumbra)),j.decay=H.decay,s.spot[U]=j;const at=H.shadow;if(H.map&&(s.spotLightMap[T]=H.map,T++,at.updateMatrices(H),H.castShadow&&P++),s.spotLightMatrix[U]=at.matrix,H.castShadow){const ot=i.get(H);ot.shadowIntensity=at.intensity,ot.shadowBias=at.bias,ot.shadowNormalBias=at.normalBias,ot.shadowRadius=at.radius,ot.shadowMapSize=at.mapSize,s.spotShadow[U]=ot,s.spotShadowMap[U]=$,I++}U++}else if(H.isRectAreaLight){const j=e.get(H);j.color.copy(Y).multiplyScalar(z),j.halfWidth.set(H.width*.5,0,0),j.halfHeight.set(0,H.height*.5,0),s.rectArea[V]=j,V++}else if(H.isPointLight){const j=e.get(H);if(j.color.copy(H.color).multiplyScalar(H.intensity),j.distance=H.distance,j.decay=H.decay,H.castShadow){const at=H.shadow,ot=i.get(H);ot.shadowIntensity=at.intensity,ot.shadowBias=at.bias,ot.shadowNormalBias=at.normalBias,ot.shadowRadius=at.radius,ot.shadowMapSize=at.mapSize,ot.shadowCameraNear=at.camera.near,ot.shadowCameraFar=at.camera.far,s.pointShadow[x]=ot,s.pointShadowMap[x]=$,s.pointShadowMatrix[x]=H.shadow.matrix,w++}s.point[x]=j,x++}else if(H.isHemisphereLight){const j=e.get(H);j.skyColor.copy(H.color).multiplyScalar(z),j.groundColor.copy(H.groundColor).multiplyScalar(z),s.hemi[D]=j,D++}}V>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Ht.LTC_FLOAT_1,s.rectAreaLTC2=Ht.LTC_FLOAT_2):(s.rectAreaLTC1=Ht.LTC_HALF_1,s.rectAreaLTC2=Ht.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=y,s.ambient[2]=v;const G=s.hash;(G.sunLength!==b||G.directionalLength!==S||G.pointLength!==x||G.spotLength!==U||G.rectAreaLength!==V||G.hemiLength!==D||G.numSunShadows!==R||G.numDirectionalShadows!==N||G.numPointShadows!==w||G.numSpotShadows!==I||G.numSpotMaps!==T||G.numLightProbes!==L)&&(s.sun.length=b,s.directional.length=S,s.spot.length=U,s.rectArea.length=V,s.point.length=x,s.hemi.length=D,s.sunShadow.length=R,s.sunShadowMap.length=R,s.sunShadowMatrix.length=O,s.sunShadowCascade.length=O,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.directionalShadowMatrix.length=N,s.pointShadow.length=w,s.pointShadowMap.length=w,s.pointShadowMatrix.length=w,s.spotShadow.length=I,s.spotShadowMap.length=I,s.spotLightMatrix.length=I+T-P,s.spotLightMap.length=T,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=L,G.sunLength=b,G.directionalLength=S,G.pointLength=x,G.spotLength=U,G.rectAreaLength=V,G.hemiLength=D,G.numSunShadows=R,G.numDirectionalShadows=N,G.numPointShadows=w,G.numSpotShadows=I,G.numSpotMaps=T,G.numLightProbes=L,s.version=wC++)}function p(m,_){let y=0,v=0,b=0,R=0,O=0,S=0;const x=_.matrixWorldInverse;for(let U=0,V=m.length;U<V;U++){const D=m[U];if(D.isSunLight){const N=s.sun[y];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(x),y++}else if(D.isDirectionalLight){const N=s.directional[v];N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),v++}else if(D.isSpotLight){const N=s.spot[R];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(x),N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(x),R++}else if(D.isRectAreaLight){const N=s.rectArea[O];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(x),d.identity(),f.copy(D.matrixWorld),f.premultiply(x),d.extractRotation(f),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),N.halfWidth.applyMatrix4(d),N.halfHeight.applyMatrix4(d),O++}else if(D.isPointLight){const N=s.point[b];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(x),b++}else if(D.isHemisphereLight){const N=s.hemi[S];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(x),S++}}}return{setup:h,setupView:p,state:s}}function b_(o){const e=new NC(o),i=[],s=[],l=[];function f(v){y.camera=v,i.length=0,s.length=0,l.length=0}function d(v){i.push(v)}function h(v){s.push(v)}function p(v){l.push(v)}function m(){e.setup(i)}function _(v){e.setupView(i,v)}const y={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:f,state:y,setupLights:m,setupLightsView:_,pushLight:d,pushShadow:h,pushLightProbeGrid:p}}function UC(o){let e=new WeakMap;function i(l,f=0){const d=e.get(l);let h;return d===void 0?(h=new b_(o),e.set(l,[h])):f>=d.length?(h=new b_(o),d.push(h)):h=d[f],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const LC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,OC=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,PC=[new st(1,0,0),new st(-1,0,0),new st(0,1,0),new st(0,-1,0),new st(0,0,1),new st(0,0,-1)],IC=[new st(0,-1,0),new st(0,-1,0),new st(0,0,1),new st(0,0,-1),new st(0,-1,0),new st(0,-1,0)],E_=new nn,pl=new st,Kh=new st;function zC(o,e,i){let s=new am;const l=new ue,f=new ue,d=new on,h=new XE,p=new WE,m={},_=i.maxTextureSize,y={[Qs]:Wn,[Wn]:Qs,[sa]:sa},v=new fa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ue},radius:{value:4}},vertexShader:LC,fragmentShader:OC}),b=v.clone();b.defines.HORIZONTAL_PASS=1;const R=new ti;R.setAttribute("position",new Ia(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const O=new wi(R,v),S=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Su;let x=this.type;this.render=function(w,I,T){if(S.enabled===!1||S.autoUpdate===!1&&S.needsUpdate===!1||w.length===0)return;this.type===wb&&(ce("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Su);const P=o.getRenderTarget(),L=o.getActiveCubeFace(),G=o.getActiveMipmapLevel(),Z=o.state;Z.setBlending(Oa),Z.buffers.depth.getReversed()===!0?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const J=x!==this.type;J&&I.traverse(function(H){H.material&&(Array.isArray(H.material)?H.material.forEach(Y=>Y.needsUpdate=!0):H.material.needsUpdate=!0)});for(let H=0,Y=w.length;H<Y;H++){const z=w[H],k=z.shadow;if(k===void 0){ce("WebGLShadowMap:",z,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;l.copy(k.mapSize);const $=k.getFrameExtents();l.multiply($),f.copy(k.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(f.x=Math.floor(_/$.x),l.x=f.x*$.x,k.mapSize.x=f.x),l.y>_&&(f.y=Math.floor(_/$.y),l.y=f.y*$.y,k.mapSize.y=f.y));const j=o.state.buffers.depth.getReversed();if(k.camera._reversedDepth=j,k.map===null||J===!0){if(k.map!==null&&(k.map.depthTexture!==null&&(k.map.depthTexture.dispose(),k.map.depthTexture=null),k.map.dispose()),this.type===ml){if(z.isPointLight){ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}k.map=new Gi(l.x,l.y,{format:$s,type:ua,minFilter:Bn,magFilter:Bn,generateMipmaps:!1}),k.map.texture.name=z.name+".shadowMap",k.map.depthTexture=new Ml(l.x,l.y,ra),k.map.depthTexture.name=z.name+".shadowMapDepth",k.map.depthTexture.format=za,k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ln,k.map.depthTexture.magFilter=Ln}else z.isPointLight?(k.map=new lS(l.x),k.map.depthTexture=new zE(l.x,ca)):(k.map=new Gi(l.x,l.y),k.map.depthTexture=new Ml(l.x,l.y,ca)),k.map.depthTexture.name=z.name+".shadowMap",k.map.depthTexture.format=za,this.type===Su?(k.map.depthTexture.compareFunction=j?tm:$p,k.map.depthTexture.minFilter=Bn,k.map.depthTexture.magFilter=Bn):(k.map.depthTexture.compareFunction=null,k.map.depthTexture.minFilter=Ln,k.map.depthTexture.magFilter=Ln);k.camera.updateProjectionMatrix()}k.map.isWebGLCubeRenderTarget!==!0&&(k.map.width!==l.x||k.map.height!==l.y)&&k.map.setSize(l.x,l.y);const at=k.map.isWebGLCubeRenderTarget?6:k.getViewportCount();z.isPointLight!==!0&&k.updateMatrices(z,T);for(let ot=0;ot<at;ot++){const zt=k.getCamera(ot);if(z.isPointLight){const wt=k.camera,se=k.matrix,ie=z.distance||wt.far;ie!==wt.far&&(wt.far=ie,wt.updateProjectionMatrix()),pl.setFromMatrixPosition(z.matrixWorld),wt.position.copy(pl),Kh.copy(wt.position),Kh.add(PC[ot]),wt.up.copy(IC[ot]),wt.lookAt(Kh),wt.updateMatrixWorld(),se.makeTranslation(-pl.x,-pl.y,-pl.z),E_.multiplyMatrices(wt.projectionMatrix,wt.matrixWorldInverse),k._frustum.setFromProjectionMatrix(E_,wt.coordinateSystem,wt.reversedDepth)}if(k.map.isWebGLCubeRenderTarget)o.setRenderTarget(k.map,ot),o.clear();else{ot===0&&(o.setRenderTarget(k.map),o.clear());const wt=k.getViewport(ot);d.set(f.x*wt.x,f.y*wt.y,f.x*wt.z,f.y*wt.w),Z.viewport(d)}s=k.getFrustum(ot),D(I,T,zt,z,this.type)}k.isPointLightShadow!==!0&&this.type===ml&&U(k,T),k.needsUpdate=!1}x=this.type,S.needsUpdate=!1,o.setRenderTarget(P,L,G)};function U(w,I){const T=e.update(O);v.defines.VSM_SAMPLES!==w.blurSamples&&(v.defines.VSM_SAMPLES=w.blurSamples,b.defines.VSM_SAMPLES=w.blurSamples,v.needsUpdate=!0,b.needsUpdate=!0),w.mapPass===null?w.mapPass=new Gi(l.x,l.y,{format:$s,type:ua}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),v.uniforms.shadow_pass.value=w.map.depthTexture,v.uniforms.resolution.value.set(w.map.width,w.map.height),v.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(I,null,T,v,O,null),b.uniforms.shadow_pass.value=w.mapPass.texture,b.uniforms.resolution.value.set(w.map.width,w.map.height),b.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(I,null,T,b,O,null)}function V(w,I,T,P){let L=null;const G=T.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(G!==void 0)L=G;else if(L=T.isPointLight===!0?p:h,o.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const Z=L.uuid,J=I.uuid;let H=m[Z];H===void 0&&(H={},m[Z]=H);let Y=H[J];Y===void 0&&(Y=L.clone(),H[J]=Y,I.addEventListener("dispose",N)),L=Y}if(L.visible=I.visible,L.wireframe=I.wireframe,P===ml?L.side=I.shadowSide!==null?I.shadowSide:I.side:L.side=I.shadowSide!==null?I.shadowSide:y[I.side],L.alphaMap=I.alphaMap,L.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,L.map=I.map,L.clipShadows=I.clipShadows,L.clippingPlanes=I.clippingPlanes,L.clipIntersection=I.clipIntersection,L.displacementMap=I.displacementMap,L.displacementScale=I.displacementScale,L.displacementBias=I.displacementBias,L.wireframeLinewidth=I.wireframeLinewidth,L.linewidth=I.linewidth,T.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const Z=o.properties.get(L);Z.light=T}return L}function D(w,I,T,P,L){if(w.visible===!1)return;if(w.layers.test(I.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&L===ml)&&(!w.frustumCulled||w.intersectsFrustum(s))){w.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,w.matrixWorld);const J=e.update(w),H=w.material;if(Array.isArray(H)){const Y=J.groups;for(let z=0,k=Y.length;z<k;z++){const $=Y[z],j=H[$.materialIndex];if(j&&j.visible){const at=V(w,j,P,L);w.onBeforeShadow(o,w,I,T,J,at,$),o.renderBufferDirect(T,null,J,at,w,$),w.onAfterShadow(o,w,I,T,J,at,$)}}}else if(H.visible){const Y=V(w,H,P,L);w.onBeforeShadow(o,w,I,T,J,Y,null),o.renderBufferDirect(T,null,J,Y,w,null),w.onAfterShadow(o,w,I,T,J,Y,null)}}const Z=w.children;for(let J=0,H=Z.length;J<H;J++)D(Z[J],I,T,P,L)}function N(w){w.target.removeEventListener("dispose",N);for(const T in m){const P=m[T],L=w.target.uuid;L in P&&(P[L].dispose(),delete P[L])}}}function BC(o,e){function i(){let K=!1;const At=new on;let St=null;const Nt=new on(0,0,0,0);return{setMask:function(kt){St!==kt&&!K&&(o.colorMask(kt,kt,kt,kt),St=kt)},setLocked:function(kt){K=kt},setClear:function(kt,bt,Qt,Vt,Oe){Oe===!0&&(kt*=Vt,bt*=Vt,Qt*=Vt),At.set(kt,bt,Qt,Vt),Nt.equals(At)===!1&&(o.clearColor(kt,bt,Qt,Vt),Nt.copy(At))},reset:function(){K=!1,St=null,Nt.set(-1,0,0,0)}}}function s(){let K=!1,At=!1,St=null,Nt=null,kt=null;return{setReversed:function(bt){if(At!==bt){const Qt=e.get("EXT_clip_control");bt?Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.ZERO_TO_ONE_EXT):Qt.clipControlEXT(Qt.LOWER_LEFT_EXT,Qt.NEGATIVE_ONE_TO_ONE_EXT),At=bt;const Vt=kt;kt=null,this.setClear(Vt)}},getReversed:function(){return At},setTest:function(bt){bt?mt(o.DEPTH_TEST):Ot(o.DEPTH_TEST)},setMask:function(bt){St!==bt&&!K&&(o.depthMask(bt),St=bt)},setFunc:function(bt){if(At&&(bt=uE[bt]),Nt!==bt){switch(bt){case tp:o.depthFunc(o.NEVER);break;case ep:o.depthFunc(o.ALWAYS);break;case np:o.depthFunc(o.LESS);break;case xl:o.depthFunc(o.LEQUAL);break;case ip:o.depthFunc(o.EQUAL);break;case ap:o.depthFunc(o.GEQUAL);break;case sp:o.depthFunc(o.GREATER);break;case rp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Nt=bt}},setLocked:function(bt){K=bt},setClear:function(bt){kt!==bt&&(kt=bt,At&&(bt=1-bt),o.clearDepth(bt))},reset:function(){K=!1,St=null,Nt=null,kt=null,At=!1}}}function l(){let K=!1,At=null,St=null,Nt=null,kt=null,bt=null,Qt=null,Vt=null,Oe=null;return{setTest:function(he){K||(he?mt(o.STENCIL_TEST):Ot(o.STENCIL_TEST))},setMask:function(he){At!==he&&!K&&(o.stencilMask(he),At=he)},setFunc:function(he,ei,mi){(St!==he||Nt!==ei||kt!==mi)&&(o.stencilFunc(he,ei,mi),St=he,Nt=ei,kt=mi)},setOp:function(he,ei,mi){(bt!==he||Qt!==ei||Vt!==mi)&&(o.stencilOp(he,ei,mi),bt=he,Qt=ei,Vt=mi)},setLocked:function(he){K=he},setClear:function(he){Oe!==he&&(o.clearStencil(he),Oe=he)},reset:function(){K=!1,At=null,St=null,Nt=null,kt=null,bt=null,Qt=null,Vt=null,Oe=null}}}const f=new i,d=new s,h=new l,p=new WeakMap,m=new WeakMap;let _={},y={},v={},b=new WeakMap,R=[],O=null,S=!1,x=null,U=null,V=null,D=null,N=null,w=null,I=null,T=new Ae(0,0,0),P=0,L=!1,G=null,Z=null,J=null,H=null,Y=null;const z=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,$=0;const j=o.getParameter(o.VERSION);j.indexOf("WebGL")!==-1?($=parseFloat(/^WebGL (\d)/.exec(j)[1]),k=$>=1):j.indexOf("OpenGL ES")!==-1&&($=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),k=$>=2);let at=null,ot={};const zt=o.getParameter(o.SCISSOR_BOX),wt=o.getParameter(o.VIEWPORT),se=new on().fromArray(zt),ie=new on().fromArray(wt);function te(K,At,St,Nt){const kt=new Uint8Array(4),bt=o.createTexture();o.bindTexture(K,bt),o.texParameteri(K,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(K,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Qt=0;Qt<St;Qt++)K===o.TEXTURE_3D||K===o.TEXTURE_2D_ARRAY?o.texImage3D(At,0,o.RGBA,1,1,Nt,0,o.RGBA,o.UNSIGNED_BYTE,kt):o.texImage2D(At+Qt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,kt);return bt}const pt={};pt[o.TEXTURE_2D]=te(o.TEXTURE_2D,o.TEXTURE_2D,1),pt[o.TEXTURE_CUBE_MAP]=te(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[o.TEXTURE_2D_ARRAY]=te(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),pt[o.TEXTURE_3D]=te(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),d.setClear(1),h.setClear(0),mt(o.DEPTH_TEST),d.setFunc(xl),ee(!1),et(yx),mt(o.CULL_FACE),ge(Oa);function mt(K){_[K]!==!0&&(o.enable(K),_[K]=!0)}function Ot(K){_[K]!==!1&&(o.disable(K),_[K]=!1)}function $t(K,At){return v[K]!==At?(o.bindFramebuffer(K,At),v[K]=At,K===o.DRAW_FRAMEBUFFER&&(v[o.FRAMEBUFFER]=At),K===o.FRAMEBUFFER&&(v[o.DRAW_FRAMEBUFFER]=At),!0):!1}function Mt(K,At){let St=R,Nt=!1;if(K){St=b.get(At),St===void 0&&(St=[],b.set(At,St));const kt=K.textures;if(St.length!==kt.length||St[0]!==o.COLOR_ATTACHMENT0){for(let bt=0,Qt=kt.length;bt<Qt;bt++)St[bt]=o.COLOR_ATTACHMENT0+bt;St.length=kt.length,Nt=!0}}else St[0]!==o.BACK&&(St[0]=o.BACK,Nt=!0);Nt&&o.drawBuffers(St)}function Gt(K){return O!==K?(o.useProgram(K),O=K,!0):!1}const ze={[to]:o.FUNC_ADD,[Nb]:o.FUNC_SUBTRACT,[Ub]:o.FUNC_REVERSE_SUBTRACT};ze[Lb]=o.MIN,ze[Ob]=o.MAX;const oe={[Pb]:o.ZERO,[Ib]:o.ONE,[zb]:o.SRC_COLOR,[N_]:o.SRC_ALPHA,[kb]:o.SRC_ALPHA_SATURATE,[Gb]:o.DST_COLOR,[Fb]:o.DST_ALPHA,[Bb]:o.ONE_MINUS_SRC_COLOR,[U_]:o.ONE_MINUS_SRC_ALPHA,[Vb]:o.ONE_MINUS_DST_COLOR,[Hb]:o.ONE_MINUS_DST_ALPHA,[Xb]:o.CONSTANT_COLOR,[Wb]:o.ONE_MINUS_CONSTANT_COLOR,[jb]:o.CONSTANT_ALPHA,[Yb]:o.ONE_MINUS_CONSTANT_ALPHA};function ge(K,At,St,Nt,kt,bt,Qt,Vt,Oe,he){if(K===Oa){S===!0&&(Ot(o.BLEND),S=!1);return}if(S===!1&&(mt(o.BLEND),S=!0),K!==Db){if(K!==x||he!==L){if((U!==to||N!==to)&&(o.blendEquation(o.FUNC_ADD),U=to,N=to),he)switch(K){case vl:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Mx:o.blendFunc(o.ONE,o.ONE);break;case bx:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Ex:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:He("WebGLState: Invalid blending: ",K);break}else switch(K){case vl:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Mx:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case bx:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ex:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",K);break}V=null,D=null,w=null,I=null,T.set(0,0,0),P=0,x=K,L=he}return}kt=kt||At,bt=bt||St,Qt=Qt||Nt,(At!==U||kt!==N)&&(o.blendEquationSeparate(ze[At],ze[kt]),U=At,N=kt),(St!==V||Nt!==D||bt!==w||Qt!==I)&&(o.blendFuncSeparate(oe[St],oe[Nt],oe[bt],oe[Qt]),V=St,D=Nt,w=bt,I=Qt),(Vt.equals(T)===!1||Oe!==P)&&(o.blendColor(Vt.r,Vt.g,Vt.b,Oe),T.copy(Vt),P=Oe),x=K,L=!1}function ve(K,At){K.side===sa?Ot(o.CULL_FACE):mt(o.CULL_FACE);let St=K.side===Wn;At&&(St=!St),ee(St),K.blending===vl&&K.transparent===!1?ge(Oa):ge(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),d.setFunc(K.depthFunc),d.setTest(K.depthTest),d.setMask(K.depthWrite),f.setMask(K.colorWrite);const Nt=K.stencilWrite;h.setTest(Nt),Nt&&(h.setMask(K.stencilWriteMask),h.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),h.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),fe(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?mt(o.SAMPLE_ALPHA_TO_COVERAGE):Ot(o.SAMPLE_ALPHA_TO_COVERAGE)}function ee(K){G!==K&&(K?o.frontFace(o.CW):o.frontFace(o.CCW),G=K)}function et(K){K!==Rb?(mt(o.CULL_FACE),K!==Z&&(K===yx?o.cullFace(o.BACK):K===Cb?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Ot(o.CULL_FACE),Z=K}function Tt(K){K!==J&&(k&&o.lineWidth(K),J=K)}function fe(K,At,St){K?(mt(o.POLYGON_OFFSET_FILL),(H!==At||Y!==St)&&(H=At,Y=St,d.getReversed()&&(At=-At),o.polygonOffset(At,St))):Ot(o.POLYGON_OFFSET_FILL)}function _e(K){K?mt(o.SCISSOR_TEST):Ot(o.SCISSOR_TEST)}function xe(K){K===void 0&&(K=o.TEXTURE0+z-1),at!==K&&(o.activeTexture(K),at=K)}function q(K,At,St){St===void 0&&(at===null?St=o.TEXTURE0+z-1:St=at);let Nt=ot[St];Nt===void 0&&(Nt={type:void 0,texture:void 0},ot[St]=Nt),(Nt.type!==K||Nt.texture!==At)&&(at!==St&&(o.activeTexture(St),at=St),o.bindTexture(K,At||pt[K]),Nt.type=K,Nt.texture=At)}function sn(){const K=ot[at];K!==void 0&&K.type!==void 0&&(o.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function Fe(){try{o.compressedTexImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function B(){try{o.compressedTexImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function E(){try{o.texSubImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function it(){try{o.texSubImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function ft(){try{o.compressedTexSubImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function gt(){try{o.compressedTexSubImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function Et(){try{o.texStorage2D(...arguments)}catch(K){He("WebGLState:",K)}}function Dt(){try{o.texStorage3D(...arguments)}catch(K){He("WebGLState:",K)}}function vt(){try{o.texImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function yt(){try{o.texImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function Ct(K){return y[K]!==void 0?y[K]:o.getParameter(K)}function Jt(K,At){y[K]!==At&&(o.pixelStorei(K,At),y[K]=At)}function It(K){se.equals(K)===!1&&(o.scissor(K.x,K.y,K.z,K.w),se.copy(K))}function Pt(K){ie.equals(K)===!1&&(o.viewport(K.x,K.y,K.z,K.w),ie.copy(K))}function Xt(K,At){let St=m.get(At);St===void 0&&(St=new WeakMap,m.set(At,St));let Nt=St.get(K);Nt===void 0&&(Nt=o.getUniformBlockIndex(At,K.name),St.set(K,Nt))}function ae(K,At){const Nt=m.get(At).get(K);p.get(At)!==Nt&&(o.uniformBlockBinding(At,Nt,K.__bindingPointIndex),p.set(At,Nt))}function de(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),d.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),_={},y={},at=null,ot={},v={},b=new WeakMap,R=[],O=null,S=!1,x=null,U=null,V=null,D=null,N=null,w=null,I=null,T=new Ae(0,0,0),P=0,L=!1,G=null,Z=null,J=null,H=null,Y=null,se.set(0,0,o.canvas.width,o.canvas.height),ie.set(0,0,o.canvas.width,o.canvas.height),f.reset(),d.reset(),h.reset()}return{buffers:{color:f,depth:d,stencil:h},enable:mt,disable:Ot,bindFramebuffer:$t,drawBuffers:Mt,useProgram:Gt,setBlending:ge,setMaterial:ve,setFlipSided:ee,setCullFace:et,setLineWidth:Tt,setPolygonOffset:fe,setScissorTest:_e,activeTexture:xe,bindTexture:q,unbindTexture:sn,compressedTexImage2D:Fe,compressedTexImage3D:B,texImage2D:vt,texImage3D:yt,pixelStorei:Jt,getParameter:Ct,updateUBOMapping:Xt,uniformBlockBinding:ae,texStorage2D:Et,texStorage3D:Dt,texSubImage2D:E,texSubImage3D:it,compressedTexSubImage2D:ft,compressedTexSubImage3D:gt,scissor:It,viewport:Pt,reset:de}}function FC(o,e,i,s,l,f,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new ue,_=new WeakMap,y=new Set;let v;const b=new WeakMap;let R=!1;try{R=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function O(B,E){return R?new OffscreenCanvas(B,E):Nu("canvas")}function S(B,E,it){let ft=1;const gt=Fe(B);if((gt.width>it||gt.height>it)&&(ft=it/Math.max(gt.width,gt.height)),ft<1)if(typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&B instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&B instanceof ImageBitmap||typeof VideoFrame<"u"&&B instanceof VideoFrame){const Et=Math.floor(ft*gt.width),Dt=Math.floor(ft*gt.height);v===void 0&&(v=O(Et,Dt));const vt=E?O(Et,Dt):v;return vt.width=Et,vt.height=Dt,vt.getContext("2d").drawImage(B,0,0,Et,Dt),ce("WebGLRenderer: Texture has been resized from ("+gt.width+"x"+gt.height+") to ("+Et+"x"+Dt+")."),vt}else return"data"in B&&ce("WebGLRenderer: Image in DataTexture is too big ("+gt.width+"x"+gt.height+")."),B;return B}function x(B){return B.generateMipmaps}function U(B){o.generateMipmap(B)}function V(B){return B.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:B.isWebGL3DRenderTarget?o.TEXTURE_3D:B.isWebGLArrayRenderTarget||B.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function D(B,E,it,ft,gt,Et=!1){if(B!==null){if(o[B]!==void 0)return o[B];ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+B+"'")}let Dt;ft&&(Dt=e.get("EXT_texture_norm16"),Dt||ce("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let vt=E;if(E===o.RED&&(it===o.FLOAT&&(vt=o.R32F),it===o.HALF_FLOAT&&(vt=o.R16F),it===o.UNSIGNED_BYTE&&(vt=o.R8),it===o.UNSIGNED_SHORT&&Dt&&(vt=Dt.R16_EXT),it===o.SHORT&&Dt&&(vt=Dt.R16_SNORM_EXT)),E===o.RED_INTEGER&&(it===o.UNSIGNED_BYTE&&(vt=o.R8UI),it===o.UNSIGNED_SHORT&&(vt=o.R16UI),it===o.UNSIGNED_INT&&(vt=o.R32UI),it===o.BYTE&&(vt=o.R8I),it===o.SHORT&&(vt=o.R16I),it===o.INT&&(vt=o.R32I)),E===o.RG&&(it===o.FLOAT&&(vt=o.RG32F),it===o.HALF_FLOAT&&(vt=o.RG16F),it===o.UNSIGNED_BYTE&&(vt=o.RG8),it===o.UNSIGNED_SHORT&&Dt&&(vt=Dt.RG16_EXT),it===o.SHORT&&Dt&&(vt=Dt.RG16_SNORM_EXT)),E===o.RG_INTEGER&&(it===o.UNSIGNED_BYTE&&(vt=o.RG8UI),it===o.UNSIGNED_SHORT&&(vt=o.RG16UI),it===o.UNSIGNED_INT&&(vt=o.RG32UI),it===o.BYTE&&(vt=o.RG8I),it===o.SHORT&&(vt=o.RG16I),it===o.INT&&(vt=o.RG32I)),E===o.RGB_INTEGER&&(it===o.UNSIGNED_BYTE&&(vt=o.RGB8UI),it===o.UNSIGNED_SHORT&&(vt=o.RGB16UI),it===o.UNSIGNED_INT&&(vt=o.RGB32UI),it===o.BYTE&&(vt=o.RGB8I),it===o.SHORT&&(vt=o.RGB16I),it===o.INT&&(vt=o.RGB32I)),E===o.RGBA_INTEGER&&(it===o.UNSIGNED_BYTE&&(vt=o.RGBA8UI),it===o.UNSIGNED_SHORT&&(vt=o.RGBA16UI),it===o.UNSIGNED_INT&&(vt=o.RGBA32UI),it===o.BYTE&&(vt=o.RGBA8I),it===o.SHORT&&(vt=o.RGBA16I),it===o.INT&&(vt=o.RGBA32I)),E===o.RGB&&(it===o.UNSIGNED_SHORT&&Dt&&(vt=Dt.RGB16_EXT),it===o.SHORT&&Dt&&(vt=Dt.RGB16_SNORM_EXT),it===o.UNSIGNED_INT_5_9_9_9_REV&&(vt=o.RGB9_E5),it===o.UNSIGNED_INT_10F_11F_11F_REV&&(vt=o.R11F_G11F_B10F)),E===o.RGBA){const yt=Et?Du:Ie.getTransfer(gt);it===o.FLOAT&&(vt=o.RGBA32F),it===o.HALF_FLOAT&&(vt=o.RGBA16F),it===o.UNSIGNED_BYTE&&(vt=yt===qe?o.SRGB8_ALPHA8:o.RGBA8),it===o.UNSIGNED_SHORT&&Dt&&(vt=Dt.RGBA16_EXT),it===o.SHORT&&Dt&&(vt=Dt.RGBA16_SNORM_EXT),it===o.UNSIGNED_SHORT_4_4_4_4&&(vt=o.RGBA4),it===o.UNSIGNED_SHORT_5_5_5_1&&(vt=o.RGB5_A1)}return(vt===o.R16F||vt===o.R32F||vt===o.RG16F||vt===o.RG32F||vt===o.RGBA16F||vt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),vt}function N(B,E){let it;return B?E===null||E===ca||E===Sl?it=o.DEPTH24_STENCIL8:E===ra?it=o.DEPTH32F_STENCIL8:E===_l&&(it=o.DEPTH24_STENCIL8,ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ca||E===Sl?it=o.DEPTH_COMPONENT24:E===ra?it=o.DEPTH_COMPONENT32F:E===_l&&(it=o.DEPTH_COMPONENT16),it}function w(B,E){return x(B)===!0||B.isFramebufferTexture&&B.minFilter!==Ln&&B.minFilter!==Bn?Math.log2(Math.max(E.width,E.height))+1:B.mipmaps!==void 0&&B.mipmaps.length>0?B.mipmaps.length:B.isCompressedTexture&&Array.isArray(B.image)?E.mipmaps.length:1}function I(B){const E=B.target;E.removeEventListener("dispose",I),P(E),E.isVideoTexture&&_.delete(E),E.isHTMLTexture&&y.delete(E)}function T(B){const E=B.target;E.removeEventListener("dispose",T),G(E)}function P(B){const E=s.get(B);if(E.__webglInit===void 0)return;const it=B.source,ft=b.get(it);if(ft){const gt=ft[E.__cacheKey];gt.usedTimes--,gt.usedTimes===0&&L(B),Object.keys(ft).length===0&&b.delete(it)}s.remove(B)}function L(B){const E=s.get(B);o.deleteTexture(E.__webglTexture);const it=B.source,ft=b.get(it);delete ft[E.__cacheKey],d.memory.textures--}function G(B){const E=s.get(B);if(B.depthTexture&&(B.depthTexture.dispose(),s.remove(B.depthTexture)),B.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(E.__webglFramebuffer[ft]))for(let gt=0;gt<E.__webglFramebuffer[ft].length;gt++)o.deleteFramebuffer(E.__webglFramebuffer[ft][gt]);else o.deleteFramebuffer(E.__webglFramebuffer[ft]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[ft])}else{if(Array.isArray(E.__webglFramebuffer))for(let ft=0;ft<E.__webglFramebuffer.length;ft++)o.deleteFramebuffer(E.__webglFramebuffer[ft]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ft=0;ft<E.__webglColorRenderbuffer.length;ft++)E.__webglColorRenderbuffer[ft]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[ft]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const it=B.textures;for(let ft=0,gt=it.length;ft<gt;ft++){const Et=s.get(it[ft]);Et.__webglTexture&&(o.deleteTexture(Et.__webglTexture),d.memory.textures--),s.remove(it[ft])}s.remove(B)}let Z=0;function J(){Z=0}function H(){return Z}function Y(B){Z=B}function z(){const B=Z;return B>=l.maxTextures&&ce("WebGLTextures: Trying to use "+(B+1)+" texture units while this GPU supports only "+l.maxTextures),Z+=1,B}function k(B){const E=[];return E.push(B.wrapS),E.push(B.wrapT),E.push(B.wrapR||0),E.push(B.magFilter),E.push(B.minFilter),E.push(B.anisotropy),E.push(B.internalFormat),E.push(B.format),E.push(B.type),E.push(B.generateMipmaps),E.push(B.premultiplyAlpha),E.push(B.flipY),E.push(B.unpackAlignment),E.push(B.colorSpace),E.join()}function $(B,E){const it=s.get(B);if(B.isVideoTexture&&q(B),B.isRenderTargetTexture===!1&&B.isExternalTexture!==!0&&B.version>0&&it.__version!==B.version){const ft=B.image;if(ft===null)ce("WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)ce("WebGLRenderer: Texture marked for update but image is incomplete");else{Ot(it,B,E);return}}else B.isExternalTexture&&(it.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,it.__webglTexture,o.TEXTURE0+E)}function j(B,E){const it=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&it.__version!==B.version){Ot(it,B,E);return}else B.isExternalTexture&&(it.__webglTexture=B.sourceTexture?B.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,it.__webglTexture,o.TEXTURE0+E)}function at(B,E){const it=s.get(B);if(B.isRenderTargetTexture===!1&&B.version>0&&it.__version!==B.version){Ot(it,B,E);return}i.bindTexture(o.TEXTURE_3D,it.__webglTexture,o.TEXTURE0+E)}function ot(B,E){const it=s.get(B);if(B.isCubeDepthTexture!==!0&&B.version>0&&it.__version!==B.version){$t(it,B,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,it.__webglTexture,o.TEXTURE0+E)}const zt={[op]:o.REPEAT,[La]:o.CLAMP_TO_EDGE,[lp]:o.MIRRORED_REPEAT},wt={[Ln]:o.NEAREST,[Kb]:o.NEAREST_MIPMAP_NEAREST,[qc]:o.NEAREST_MIPMAP_LINEAR,[Bn]:o.LINEAR,[Sh]:o.LINEAR_MIPMAP_NEAREST,[Zs]:o.LINEAR_MIPMAP_LINEAR},se={[tE]:o.NEVER,[sE]:o.ALWAYS,[eE]:o.LESS,[$p]:o.LEQUAL,[nE]:o.EQUAL,[tm]:o.GEQUAL,[iE]:o.GREATER,[aE]:o.NOTEQUAL};function ie(B,E){if(E.type===ra&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Bn||E.magFilter===Sh||E.magFilter===qc||E.magFilter===Zs||E.minFilter===Bn||E.minFilter===Sh||E.minFilter===qc||E.minFilter===Zs)&&ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(B,o.TEXTURE_WRAP_S,zt[E.wrapS]),o.texParameteri(B,o.TEXTURE_WRAP_T,zt[E.wrapT]),(B===o.TEXTURE_3D||B===o.TEXTURE_2D_ARRAY)&&o.texParameteri(B,o.TEXTURE_WRAP_R,zt[E.wrapR]),o.texParameteri(B,o.TEXTURE_MAG_FILTER,wt[E.magFilter]),o.texParameteri(B,o.TEXTURE_MIN_FILTER,wt[E.minFilter]),E.compareFunction&&(o.texParameteri(B,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(B,o.TEXTURE_COMPARE_FUNC,se[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===Ln||E.minFilter!==qc&&E.minFilter!==Zs||E.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const it=e.get("EXT_texture_filter_anisotropic");o.texParameterf(B,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function te(B,E){let it=!1;B.__webglInit===void 0&&(B.__webglInit=!0,E.addEventListener("dispose",I));const ft=E.source;let gt=b.get(ft);gt===void 0&&(gt={},b.set(ft,gt));const Et=k(E);if(Et!==B.__cacheKey){gt[Et]===void 0&&(gt[Et]={texture:o.createTexture(),usedTimes:0},d.memory.textures++,it=!0),gt[Et].usedTimes++;const Dt=gt[B.__cacheKey];Dt!==void 0&&(gt[B.__cacheKey].usedTimes--,Dt.usedTimes===0&&L(E)),B.__cacheKey=Et,B.__webglTexture=gt[Et].texture}return it}function pt(B,E,it){return Math.floor(Math.floor(B/it)/E)}function mt(B,E,it,ft){const Et=B.updateRanges;if(Et.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,E.width,E.height,it,ft,E.data);else{Et.sort((Jt,It)=>Jt.start-It.start);let Dt=0;for(let Jt=1;Jt<Et.length;Jt++){const It=Et[Dt],Pt=Et[Jt],Xt=It.start+It.count,ae=pt(Pt.start,E.width,4),de=pt(It.start,E.width,4);Pt.start<=Xt+1&&ae===de&&pt(Pt.start+Pt.count-1,E.width,4)===ae?It.count=Math.max(It.count,Pt.start+Pt.count-It.start):(++Dt,Et[Dt]=Pt)}Et.length=Dt+1;const vt=i.getParameter(o.UNPACK_ROW_LENGTH),yt=i.getParameter(o.UNPACK_SKIP_PIXELS),Ct=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,E.width);for(let Jt=0,It=Et.length;Jt<It;Jt++){const Pt=Et[Jt],Xt=Math.floor(Pt.start/4),ae=Math.ceil(Pt.count/4),de=Xt%E.width,K=Math.floor(Xt/E.width),At=ae,St=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,de),i.pixelStorei(o.UNPACK_SKIP_ROWS,K),i.texSubImage2D(o.TEXTURE_2D,0,de,K,At,St,it,ft,E.data)}B.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,vt),i.pixelStorei(o.UNPACK_SKIP_PIXELS,yt),i.pixelStorei(o.UNPACK_SKIP_ROWS,Ct)}}function Ot(B,E,it){let ft=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ft=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ft=o.TEXTURE_3D);const gt=te(B,E),Et=E.source;i.bindTexture(ft,B.__webglTexture,o.TEXTURE0+it);const Dt=s.get(Et);if(Et.version!==Dt.__version||gt===!0){if(i.activeTexture(o.TEXTURE0+it),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const St=Ie.getPrimaries(Ie.workingColorSpace),Nt=E.colorSpace===vs?null:Ie.getPrimaries(E.colorSpace),kt=E.colorSpace===vs||St===Nt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment);let yt=S(E.image,!1,l.maxTextureSize);yt=sn(E,yt);const Ct=f.convert(E.format,E.colorSpace),Jt=f.convert(E.type);let It=D(E.internalFormat,Ct,Jt,E.normalized,E.colorSpace,E.isVideoTexture);ie(ft,E);let Pt;const Xt=E.mipmaps,ae=E.isVideoTexture!==!0,de=Dt.__version===void 0||gt===!0,K=Et.dataReady,At=w(E,yt);if(E.isDepthTexture)It=N(E.format===Ks,E.type),de&&(ae?i.texStorage2D(o.TEXTURE_2D,1,It,yt.width,yt.height):i.texImage2D(o.TEXTURE_2D,0,It,yt.width,yt.height,0,Ct,Jt,null));else if(E.isDataTexture)if(Xt.length>0){ae&&de&&i.texStorage2D(o.TEXTURE_2D,At,It,Xt[0].width,Xt[0].height);for(let St=0,Nt=Xt.length;St<Nt;St++)Pt=Xt[St],ae?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Pt.width,Pt.height,Ct,Jt,Pt.data):i.texImage2D(o.TEXTURE_2D,St,It,Pt.width,Pt.height,0,Ct,Jt,Pt.data);E.generateMipmaps=!1}else ae?(de&&i.texStorage2D(o.TEXTURE_2D,At,It,yt.width,yt.height),K&&mt(E,yt,Ct,Jt)):i.texImage2D(o.TEXTURE_2D,0,It,yt.width,yt.height,0,Ct,Jt,yt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){ae&&de&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,It,Xt[0].width,Xt[0].height,yt.depth);for(let St=0,Nt=Xt.length;St<Nt;St++)if(Pt=Xt[St],E.format!==Hi)if(Ct!==null)if(ae){if(K)if(E.layerUpdates.size>0){const kt=n_(Pt.width,Pt.height,E.format,E.type);for(const bt of E.layerUpdates){const Qt=Pt.data.subarray(bt*kt/Pt.data.BYTES_PER_ELEMENT,(bt+1)*kt/Pt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,bt,Pt.width,Pt.height,1,Ct,Qt)}}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,Pt.width,Pt.height,yt.depth,Ct,Pt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,St,It,Pt.width,Pt.height,yt.depth,0,Pt.data,0,0);else ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ae?K&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,Pt.width,Pt.height,yt.depth,Ct,Jt,Pt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,St,It,Pt.width,Pt.height,yt.depth,0,Ct,Jt,Pt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{ae&&de&&i.texStorage2D(o.TEXTURE_2D,At,It,Xt[0].width,Xt[0].height);for(let St=0,Nt=Xt.length;St<Nt;St++)Pt=Xt[St],E.format!==Hi?Ct!==null?ae?K&&i.compressedTexSubImage2D(o.TEXTURE_2D,St,0,0,Pt.width,Pt.height,Ct,Pt.data):i.compressedTexImage2D(o.TEXTURE_2D,St,It,Pt.width,Pt.height,0,Pt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ae?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Pt.width,Pt.height,Ct,Jt,Pt.data):i.texImage2D(o.TEXTURE_2D,St,It,Pt.width,Pt.height,0,Ct,Jt,Pt.data)}else if(E.isDataArrayTexture)if(ae){if(de&&i.texStorage3D(o.TEXTURE_2D_ARRAY,At,It,yt.width,yt.height,yt.depth),K)if(E.layerUpdates.size>0){const St=n_(yt.width,yt.height,E.format,E.type);for(const Nt of E.layerUpdates){const kt=yt.data.subarray(Nt*St/yt.data.BYTES_PER_ELEMENT,(Nt+1)*St/yt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Nt,yt.width,yt.height,1,Ct,Jt,kt)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,yt.width,yt.height,yt.depth,Ct,Jt,yt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,It,yt.width,yt.height,yt.depth,0,Ct,Jt,yt.data);else if(E.isData3DTexture)ae?(de&&i.texStorage3D(o.TEXTURE_3D,At,It,yt.width,yt.height,yt.depth),K&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,yt.width,yt.height,yt.depth,Ct,Jt,yt.data)):i.texImage3D(o.TEXTURE_3D,0,It,yt.width,yt.height,yt.depth,0,Ct,Jt,yt.data);else if(E.isFramebufferTexture){if(de)if(ae)i.texStorage2D(o.TEXTURE_2D,At,It,yt.width,yt.height);else{let St=yt.width,Nt=yt.height;for(let kt=0;kt<At;kt++)i.texImage2D(o.TEXTURE_2D,kt,It,St,Nt,0,Ct,Jt,null),St>>=1,Nt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in o){const St=o.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),yt.parentNode!==St){St.appendChild(yt),y.add(E),St.onpaint=Nt=>{const kt=Nt.changedElements;for(const bt of y)kt.includes(bt.image)&&(bt.needsUpdate=!0)},St.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,yt);else{const kt=o.RGBA,bt=o.RGBA,Qt=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,kt,bt,Qt,yt)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(Xt.length>0){if(ae&&de){const St=Fe(Xt[0]);i.texStorage2D(o.TEXTURE_2D,At,It,St.width,St.height)}for(let St=0,Nt=Xt.length;St<Nt;St++)Pt=Xt[St],ae?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Ct,Jt,Pt):i.texImage2D(o.TEXTURE_2D,St,It,Ct,Jt,Pt);E.generateMipmaps=!1}else if(ae){if(de){const St=Fe(yt);i.texStorage2D(o.TEXTURE_2D,At,It,St.width,St.height)}K&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Ct,Jt,yt)}else i.texImage2D(o.TEXTURE_2D,0,It,Ct,Jt,yt);x(E)&&U(ft),Dt.__version=Et.version,E.onUpdate&&E.onUpdate(E)}B.__version=E.version}function $t(B,E,it){if(E.image.length!==6)return;const ft=te(B,E),gt=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,B.__webglTexture,o.TEXTURE0+it);const Et=s.get(gt);if(gt.version!==Et.__version||ft===!0){i.activeTexture(o.TEXTURE0+it);const Dt=Ie.getPrimaries(Ie.workingColorSpace),vt=E.colorSpace===vs?null:Ie.getPrimaries(E.colorSpace),yt=E.colorSpace===vs||Dt===vt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const Ct=E.isCompressedTexture||E.image[0].isCompressedTexture,Jt=E.image[0]&&E.image[0].isDataTexture,It=[];for(let bt=0;bt<6;bt++)!Ct&&!Jt?It[bt]=S(E.image[bt],!0,l.maxCubemapSize):It[bt]=Jt?E.image[bt].image:E.image[bt],It[bt]=sn(E,It[bt]);const Pt=It[0],Xt=f.convert(E.format,E.colorSpace),ae=f.convert(E.type),de=D(E.internalFormat,Xt,ae,E.normalized,E.colorSpace),K=E.isVideoTexture!==!0,At=Et.__version===void 0||ft===!0,St=gt.dataReady;let Nt=w(E,Pt);ie(o.TEXTURE_CUBE_MAP,E);let kt;if(Ct){K&&At&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Nt,de,Pt.width,Pt.height);for(let bt=0;bt<6;bt++){kt=It[bt].mipmaps;for(let Qt=0;Qt<kt.length;Qt++){const Vt=kt[Qt];E.format!==Hi?Xt!==null?K?St&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt,0,0,Vt.width,Vt.height,Xt,Vt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt,de,Vt.width,Vt.height,0,Vt.data):ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt,0,0,Vt.width,Vt.height,Xt,ae,Vt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt,de,Vt.width,Vt.height,0,Xt,ae,Vt.data)}}}else{if(kt=E.mipmaps,K&&At){kt.length>0&&Nt++;const bt=Fe(It[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Nt,de,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if(Jt){K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,It[bt].width,It[bt].height,Xt,ae,It[bt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,de,It[bt].width,It[bt].height,0,Xt,ae,It[bt].data);for(let Qt=0;Qt<kt.length;Qt++){const Oe=kt[Qt].image[bt].image;K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt+1,0,0,Oe.width,Oe.height,Xt,ae,Oe.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt+1,de,Oe.width,Oe.height,0,Xt,ae,Oe.data)}}else{K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Xt,ae,It[bt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,de,Xt,ae,It[bt]);for(let Qt=0;Qt<kt.length;Qt++){const Vt=kt[Qt];K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt+1,0,0,Xt,ae,Vt.image[bt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Qt+1,de,Xt,ae,Vt.image[bt])}}}x(E)&&U(o.TEXTURE_CUBE_MAP),Et.__version=gt.version,E.onUpdate&&E.onUpdate(E)}B.__version=E.version}function Mt(B,E,it,ft,gt,Et){const Dt=f.convert(it.format,it.colorSpace),vt=f.convert(it.type),yt=D(it.internalFormat,Dt,vt,it.normalized,it.colorSpace),Ct=s.get(E),Jt=s.get(it);if(Jt.__renderTarget=E,!Ct.__hasExternalTextures){const It=Math.max(1,E.width>>Et),Pt=Math.max(1,E.height>>Et);gt===o.TEXTURE_3D||gt===o.TEXTURE_2D_ARRAY?i.texImage3D(gt,Et,yt,It,Pt,E.depth,0,Dt,vt,null):i.texImage2D(gt,Et,yt,It,Pt,0,Dt,vt,null)}i.bindFramebuffer(o.FRAMEBUFFER,B),xe(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ft,gt,Jt.__webglTexture,0,_e(E)):(gt===o.TEXTURE_2D||gt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&gt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ft,gt,Jt.__webglTexture,Et),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Gt(B,E,it){if(o.bindRenderbuffer(o.RENDERBUFFER,B),E.depthBuffer){const ft=E.depthTexture,gt=ft&&ft.isDepthTexture?ft.type:null,Et=N(E.stencilBuffer,gt),Dt=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;xe(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,_e(E),Et,E.width,E.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,_e(E),Et,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Et,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Dt,o.RENDERBUFFER,B)}else{const ft=E.textures;for(let gt=0;gt<ft.length;gt++){const Et=ft[gt],Dt=f.convert(Et.format,Et.colorSpace),vt=f.convert(Et.type),yt=D(Et.internalFormat,Dt,vt,Et.normalized,Et.colorSpace);xe(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,_e(E),yt,E.width,E.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,_e(E),yt,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,yt,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function ze(B,E,it){const ft=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,B),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const gt=s.get(E.depthTexture);if(gt.__renderTarget=E,(!gt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ft){if(gt.__webglInit===void 0&&(gt.__webglInit=!0,E.depthTexture.addEventListener("dispose",I)),gt.__webglTexture===void 0){gt.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,gt.__webglTexture),ie(o.TEXTURE_CUBE_MAP,E.depthTexture);const Ct=f.convert(E.depthTexture.format),Jt=f.convert(E.depthTexture.type);let It;E.depthTexture.format===za?It=o.DEPTH_COMPONENT24:E.depthTexture.format===Ks&&(It=o.DEPTH24_STENCIL8);for(let Pt=0;Pt<6;Pt++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0,It,E.width,E.height,0,Ct,Jt,null)}}else $(E.depthTexture,0);const Et=gt.__webglTexture,Dt=_e(E),vt=ft?o.TEXTURE_CUBE_MAP_POSITIVE_X+it:o.TEXTURE_2D,yt=E.depthTexture.format===Ks?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(E.depthTexture.format===za)xe(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,yt,vt,Et,0,Dt):o.framebufferTexture2D(o.FRAMEBUFFER,yt,vt,Et,0);else if(E.depthTexture.format===Ks)xe(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,yt,vt,Et,0,Dt):o.framebufferTexture2D(o.FRAMEBUFFER,yt,vt,Et,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function oe(B){const E=s.get(B),it=B.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==B.depthTexture){const ft=B.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ft){const gt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ft.removeEventListener("dispose",gt)};ft.addEventListener("dispose",gt),E.__depthDisposeCallback=gt}E.__boundDepthTexture=ft}if(B.depthTexture&&!E.__autoAllocateDepthBuffer)if(it)for(let ft=0;ft<6;ft++)ze(E.__webglFramebuffer[ft],B,ft);else{const ft=B.texture.mipmaps;ft&&ft.length>0?ze(E.__webglFramebuffer[0],B,0):ze(E.__webglFramebuffer,B,0)}else if(it){E.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[ft]),E.__webglDepthbuffer[ft]===void 0)E.__webglDepthbuffer[ft]=o.createRenderbuffer(),Gt(E.__webglDepthbuffer[ft],B,!1);else{const gt=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Et=E.__webglDepthbuffer[ft];o.bindRenderbuffer(o.RENDERBUFFER,Et),o.framebufferRenderbuffer(o.FRAMEBUFFER,gt,o.RENDERBUFFER,Et)}}else{const ft=B.texture.mipmaps;if(ft&&ft.length>0?i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),Gt(E.__webglDepthbuffer,B,!1);else{const gt=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Et=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Et),o.framebufferRenderbuffer(o.FRAMEBUFFER,gt,o.RENDERBUFFER,Et)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function ge(B,E,it){const ft=s.get(B);E!==void 0&&Mt(ft.__webglFramebuffer,B,B.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),it!==void 0&&oe(B)}function ve(B){const E=B.texture,it=s.get(B),ft=s.get(E);B.addEventListener("dispose",T);const gt=B.textures,Et=B.isWebGLCubeRenderTarget===!0,Dt=gt.length>1;if(Dt||(ft.__webglTexture===void 0&&(ft.__webglTexture=o.createTexture()),ft.__version=E.version,d.memory.textures++),Et){it.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer[vt]=[];for(let yt=0;yt<E.mipmaps.length;yt++)it.__webglFramebuffer[vt][yt]=o.createFramebuffer()}else it.__webglFramebuffer[vt]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer=[];for(let vt=0;vt<E.mipmaps.length;vt++)it.__webglFramebuffer[vt]=o.createFramebuffer()}else it.__webglFramebuffer=o.createFramebuffer();if(Dt)for(let vt=0,yt=gt.length;vt<yt;vt++){const Ct=s.get(gt[vt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=o.createTexture(),d.memory.textures++)}if(B.samples>0&&xe(B)===!1){it.__webglMultisampledFramebuffer=o.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let vt=0;vt<gt.length;vt++){const yt=gt[vt];it.__webglColorRenderbuffer[vt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,it.__webglColorRenderbuffer[vt]);const Ct=f.convert(yt.format,yt.colorSpace),Jt=f.convert(yt.type),It=D(yt.internalFormat,Ct,Jt,yt.normalized,yt.colorSpace,B.isXRRenderTarget===!0),Pt=_e(B);o.renderbufferStorageMultisample(o.RENDERBUFFER,Pt,It,B.width,B.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.RENDERBUFFER,it.__webglColorRenderbuffer[vt])}o.bindRenderbuffer(o.RENDERBUFFER,null),B.depthBuffer&&(it.__webglDepthRenderbuffer=o.createRenderbuffer(),Gt(it.__webglDepthRenderbuffer,B,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Et){i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),ie(o.TEXTURE_CUBE_MAP,E);for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0)for(let yt=0;yt<E.mipmaps.length;yt++)Mt(it.__webglFramebuffer[vt][yt],B,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,yt);else Mt(it.__webglFramebuffer[vt],B,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);x(E)&&U(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Dt){for(let vt=0,yt=gt.length;vt<yt;vt++){const Ct=gt[vt],Jt=s.get(Ct);let It=o.TEXTURE_2D;(B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(It=B.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(It,Jt.__webglTexture),ie(It,Ct),Mt(it.__webglFramebuffer,B,Ct,o.COLOR_ATTACHMENT0+vt,It,0),x(Ct)&&U(It)}i.unbindTexture()}else{let vt=o.TEXTURE_2D;if((B.isWebGL3DRenderTarget||B.isWebGLArrayRenderTarget)&&(vt=B.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(vt,ft.__webglTexture),ie(vt,E),E.mipmaps&&E.mipmaps.length>0)for(let yt=0;yt<E.mipmaps.length;yt++)Mt(it.__webglFramebuffer[yt],B,E,o.COLOR_ATTACHMENT0,vt,yt);else Mt(it.__webglFramebuffer,B,E,o.COLOR_ATTACHMENT0,vt,0);x(E)&&U(vt),i.unbindTexture()}B.depthBuffer&&oe(B)}function ee(B){const E=B.textures;for(let it=0,ft=E.length;it<ft;it++){const gt=E[it];if(x(gt)){const Et=V(B),Dt=s.get(gt).__webglTexture;i.bindTexture(Et,Dt),U(Et),i.unbindTexture()}}}const et=[],Tt=[];function fe(B){if(B.samples>0){if(xe(B)===!1){const E=B.textures,it=B.width,ft=B.height;let gt=o.COLOR_BUFFER_BIT;const Et=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Dt=s.get(B),vt=E.length>1;if(vt)for(let Ct=0;Ct<E.length;Ct++)i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer);const yt=B.texture.mipmaps;yt&&yt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglFramebuffer);for(let Ct=0;Ct<E.length;Ct++){if(B.resolveDepthBuffer&&(B.depthBuffer&&(gt|=o.DEPTH_BUFFER_BIT),B.stencilBuffer&&B.resolveStencilBuffer&&(gt|=o.STENCIL_BUFFER_BIT)),vt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Dt.__webglColorRenderbuffer[Ct]);const Jt=s.get(E[Ct]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,Jt,0)}o.blitFramebuffer(0,0,it,ft,0,0,it,ft,gt,o.NEAREST),p===!0&&(et.length=0,Tt.length=0,et.push(o.COLOR_ATTACHMENT0+Ct),B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&(et.push(Et),Tt.push(Et),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Tt)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,et))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),vt)for(let Ct=0;Ct<E.length;Ct++){i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.RENDERBUFFER,Dt.__webglColorRenderbuffer[Ct]);const Jt=s.get(E[Ct]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Dt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ct,o.TEXTURE_2D,Jt,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Dt.__webglMultisampledFramebuffer)}else if(B.depthBuffer&&B.storeMultisampledDepthBuffer===!1&&p){const E=B.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function _e(B){return Math.min(l.maxSamples,B.samples)}function xe(B){const E=s.get(B);return B.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function q(B){const E=d.render.frame;_.get(B)!==E&&(_.set(B,E),B.update())}function sn(B,E){const it=B.colorSpace,ft=B.format,gt=B.type;return B.isCompressedTexture===!0||B.isVideoTexture===!0||it!==wu&&it!==vs&&(Ie.getTransfer(it)===qe?(ft!==Hi||gt!==hi)&&ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",it)),E}function Fe(B){return typeof HTMLImageElement<"u"&&B instanceof HTMLImageElement?(m.width=B.naturalWidth||B.width,m.height=B.naturalHeight||B.height):typeof VideoFrame<"u"&&B instanceof VideoFrame?(m.width=B.displayWidth,m.height=B.displayHeight):(m.width=B.width,m.height=B.height),m}this.allocateTextureUnit=z,this.resetTextureUnits=J,this.getTextureUnits=H,this.setTextureUnits=Y,this.setTexture2D=$,this.setTexture2DArray=j,this.setTexture3D=at,this.setTextureCube=ot,this.rebindTextures=ge,this.setupRenderTarget=ve,this.updateRenderTargetMipmap=ee,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=oe,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=xe,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function HC(o,e){function i(s,l=vs){let f;const d=Ie.getTransfer(l);if(s===hi)return o.UNSIGNED_BYTE;if(s===qp)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Zp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===k_)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===X_)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===G_)return o.BYTE;if(s===V_)return o.SHORT;if(s===_l)return o.UNSIGNED_SHORT;if(s===Yp)return o.INT;if(s===ca)return o.UNSIGNED_INT;if(s===ra)return o.FLOAT;if(s===ua)return o.HALF_FLOAT;if(s===W_)return o.ALPHA;if(s===j_)return o.RGB;if(s===Hi)return o.RGBA;if(s===za)return o.DEPTH_COMPONENT;if(s===Ks)return o.DEPTH_STENCIL;if(s===Y_)return o.RED;if(s===Kp)return o.RED_INTEGER;if(s===$s)return o.RG;if(s===Qp)return o.RG_INTEGER;if(s===Jp)return o.RGBA_INTEGER;if(s===yu||s===Mu||s===bu||s===Eu)if(d===qe)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===yu)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Mu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===bu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Eu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===yu)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Mu)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===bu)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Eu)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===cp||s===up||s===fp||s===dp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===cp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===up)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===fp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===dp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===hp||s===pp||s===mp||s===gp||s===vp||s===Ru||s===xp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===hp||s===pp)return d===qe?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===mp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC;if(s===gp)return f.COMPRESSED_R11_EAC;if(s===vp)return f.COMPRESSED_SIGNED_R11_EAC;if(s===Ru)return f.COMPRESSED_RG11_EAC;if(s===xp)return f.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===_p||s===Sp||s===yp||s===Mp||s===bp||s===Ep||s===Tp||s===Ap||s===Rp||s===Cp||s===wp||s===Dp||s===Np||s===Up)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===_p)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Sp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===yp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Mp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===bp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ep)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Tp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Ap)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Rp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Cp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===wp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Dp)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Np)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Up)return d===qe?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Lp||s===Op||s===Pp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Lp)return d===qe?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Op)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Pp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Ip||s===zp||s===Cu||s===Bp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===Ip)return f.COMPRESSED_RED_RGTC1_EXT;if(s===zp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Cu)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Bp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Sl?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const GC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,VC=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class kC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new eS(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new fa({vertexShader:GC,fragmentShader:VC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new wi(new Fu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class XC extends Ss{constructor(e,i){super();const s=this;let l=null,f=1,d=null,h="local-floor",p=1,m=null,_=null,y=null,v=null,b=null,R=null;const O=typeof XRWebGLBinding<"u",S=new kC,x={},U=i.getContextAttributes();let V=null,D=null;const N=[],w=[],I=new ue;let T=null,P=null;const L=new Ci;L.viewport=new on;const G=new Ci;G.viewport=new on;const Z=[L,G],J=new KE;let H=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(pt){let mt=N[pt];return mt===void 0&&(mt=new Ch,N[pt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(pt){let mt=N[pt];return mt===void 0&&(mt=new Ch,N[pt]=mt),mt.getGripSpace()},this.getHand=function(pt){let mt=N[pt];return mt===void 0&&(mt=new Ch,N[pt]=mt),mt.getHandSpace()};function z(pt){const mt=w.indexOf(pt.inputSource);if(mt===-1)return;const Ot=N[mt];Ot!==void 0&&(Ot.update(pt.inputSource,pt.frame,m||d),Ot.dispatchEvent({type:pt.type,data:pt.inputSource}))}function k(){l.removeEventListener("select",z),l.removeEventListener("selectstart",z),l.removeEventListener("selectend",z),l.removeEventListener("squeeze",z),l.removeEventListener("squeezestart",z),l.removeEventListener("squeezeend",z),l.removeEventListener("end",k),l.removeEventListener("inputsourceschange",$);for(let pt=0;pt<N.length;pt++){const mt=w[pt];mt!==null&&(w[pt]=null,N[pt].disconnect(mt))}H=null,Y=null,S.reset();for(const pt in x)delete x[pt];if(e.setRenderTarget(V),b=null,v=null,y=null,l=null,D=null,te.stop(),s.isPresenting=!1,e.setPixelRatio(T),e.setSize(I.width,I.height,!1),P!==null){const pt=P.camera;pt.fov=P.fov,pt.zoom=P.zoom,pt.updateProjectionMatrix(),P=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(pt){f=pt,s.isPresenting===!0&&ce("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(pt){h=pt,s.isPresenting===!0&&ce("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(pt){m=pt},this.getBaseLayer=function(){return v!==null?v:b},this.getBinding=function(){return y===null&&O&&(y=new XRWebGLBinding(l,i)),y},this.getFrame=function(){return R},this.getSession=function(){return l},this.setSession=async function(pt){if(l=pt,l!==null){if(V=e.getRenderTarget(),l.addEventListener("select",z),l.addEventListener("selectstart",z),l.addEventListener("selectend",z),l.addEventListener("squeeze",z),l.addEventListener("squeezestart",z),l.addEventListener("squeezeend",z),l.addEventListener("end",k),l.addEventListener("inputsourceschange",$),U.xrCompatible!==!0&&await i.makeXRCompatible(),T=e.getPixelRatio(),e.getSize(I),O&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ot=null,$t=null,Mt=null;U.depth&&(Mt=U.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Ot=U.stencil?Ks:za,$t=U.stencil?Sl:ca);const Gt={colorFormat:i.RGBA8,depthFormat:Mt,scaleFactor:f};y=this.getBinding(),v=y.createProjectionLayer(Gt),l.updateRenderState({layers:[v]}),e.setPixelRatio(1),e.setSize(v.textureWidth,v.textureHeight,!1),D=new Gi(v.textureWidth,v.textureHeight,{format:Hi,type:hi,depthTexture:new Ml(v.textureWidth,v.textureHeight,$t,void 0,void 0,void 0,void 0,void 0,void 0,Ot),stencilBuffer:U.stencil,colorSpace:e.outputColorSpace,samples:U.antialias?4:0,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1,storeMultisampledDepthBuffer:v.ignoreDepthValues===!1,storeMultisampledStencilBuffer:v.ignoreDepthValues===!1})}else{const Ot={antialias:U.antialias,alpha:!0,depth:U.depth,stencil:U.stencil,framebufferScaleFactor:f};b=new XRWebGLLayer(l,i,Ot),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),D=new Gi(b.framebufferWidth,b.framebufferHeight,{format:Hi,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:U.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1,storeMultisampledDepthBuffer:b.ignoreDepthValues===!1,storeMultisampledStencilBuffer:b.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(p),m=null,d=await l.requestReferenceSpace(h),te.setContext(l),te.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return S.getDepthTexture()};function $(pt){for(let mt=0;mt<pt.removed.length;mt++){const Ot=pt.removed[mt],$t=w.indexOf(Ot);$t>=0&&(w[$t]=null,N[$t].disconnect(Ot))}for(let mt=0;mt<pt.added.length;mt++){const Ot=pt.added[mt];let $t=w.indexOf(Ot);if($t===-1){for(let Gt=0;Gt<N.length;Gt++)if(Gt>=w.length){w.push(Ot),$t=Gt;break}else if(w[Gt]===null){w[Gt]=Ot,$t=Gt;break}if($t===-1)break}const Mt=N[$t];Mt&&Mt.connect(Ot)}}const j=new st,at=new st;function ot(pt,mt,Ot){j.setFromMatrixPosition(mt.matrixWorld),at.setFromMatrixPosition(Ot.matrixWorld);const $t=j.distanceTo(at),Mt=mt.projectionMatrix.elements,Gt=Ot.projectionMatrix.elements,ze=Mt[14]/(Mt[10]-1),oe=Mt[14]/(Mt[10]+1),ge=(Mt[9]+1)/Mt[5],ve=(Mt[9]-1)/Mt[5],ee=(Mt[8]-1)/Mt[0],et=(Gt[8]+1)/Gt[0],Tt=ze*ee,fe=ze*et,_e=$t/(-ee+et),xe=_e*-ee;if(mt.matrixWorld.decompose(pt.position,pt.quaternion,pt.scale),pt.translateX(xe),pt.translateZ(_e),pt.matrixWorld.compose(pt.position,pt.quaternion,pt.scale),pt.matrixWorldInverse.copy(pt.matrixWorld).invert(),Mt[10]===-1)pt.projectionMatrix.copy(mt.projectionMatrix),pt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const q=ze+_e,sn=oe+_e,Fe=Tt-xe,B=fe+($t-xe),E=ge*oe/sn*q,it=ve*oe/sn*q;pt.projectionMatrix.makePerspective(Fe,B,E,it,q,sn),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert()}}function zt(pt,mt){mt===null?pt.matrixWorld.copy(pt.matrix):pt.matrixWorld.multiplyMatrices(mt.matrixWorld,pt.matrix),pt.matrixWorldInverse.copy(pt.matrixWorld).invert()}this.updateCamera=function(pt){if(l===null)return;let mt=pt.near,Ot=pt.far;S.texture!==null&&(S.depthNear>0&&(mt=S.depthNear),S.depthFar>0&&(Ot=S.depthFar)),J.near=G.near=L.near=mt,J.far=G.far=L.far=Ot,(H!==J.near||Y!==J.far)&&(l.updateRenderState({depthNear:J.near,depthFar:J.far}),H=J.near,Y=J.far),J.layers.mask=pt.layers.mask|6,L.layers.mask=J.layers.mask&-5,G.layers.mask=J.layers.mask&-3;const $t=pt.parent,Mt=J.cameras;zt(J,$t);for(let Gt=0;Gt<Mt.length;Gt++)zt(Mt[Gt],$t);Mt.length===2?ot(J,L,G):J.projectionMatrix.copy(L.projectionMatrix),P===null&&pt.isPerspectiveCamera&&(P={camera:pt,fov:pt.fov,zoom:pt.zoom}),wt(pt,J,$t)};function wt(pt,mt,Ot){Ot===null?pt.matrix.copy(mt.matrixWorld):(pt.matrix.copy(Ot.matrixWorld),pt.matrix.invert(),pt.matrix.multiply(mt.matrixWorld)),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.updateMatrixWorld(!0),pt.projectionMatrix.copy(mt.projectionMatrix),pt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),pt.isPerspectiveCamera&&(pt.fov=Hp*2*Math.atan(1/pt.projectionMatrix.elements[5]),pt.zoom=1)}this.getCamera=function(){return J},this.getFoveation=function(){if(!(v===null&&b===null))return p},this.setFoveation=function(pt){p=pt,v!==null&&(v.fixedFoveation=pt),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=pt)},this.hasDepthSensing=function(){return S.texture!==null},this.getDepthSensingMesh=function(){return S.getMesh(J)},this.getCameraTexture=function(pt){return x[pt]};let se=null;function ie(pt,mt){if(_=mt.getViewerPose(m||d),R=mt,_!==null){const Ot=_.views;b!==null&&(e.setRenderTargetFramebuffer(D,b.framebuffer),e.setRenderTarget(D));let $t=!1;Ot.length!==J.cameras.length&&(J.cameras.length=0,$t=!0);for(let oe=0;oe<Ot.length;oe++){const ge=Ot[oe];let ve=null;if(b!==null)ve=b.getViewport(ge);else{const et=y.getViewSubImage(v,ge);ve=et.viewport,oe===0&&(e.setRenderTargetTextures(D,et.colorTexture,et.depthStencilTexture),e.setRenderTarget(D))}let ee=Z[oe];ee===void 0&&(ee=new Ci,ee.layers.enable(oe),ee.viewport=new on,Z[oe]=ee),ee.matrix.fromArray(ge.transform.matrix),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.projectionMatrix.fromArray(ge.projectionMatrix),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert(),ee.viewport.set(ve.x,ve.y,ve.width,ve.height),oe===0&&(J.matrix.copy(ee.matrix),J.matrix.decompose(J.position,J.quaternion,J.scale)),$t===!0&&J.cameras.push(ee)}const Mt=l.enabledFeatures;if(Mt&&Mt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&O){y=s.getBinding();const oe=y.getDepthInformation(Ot[0]);oe&&oe.isValid&&oe.texture&&S.init(oe,l.renderState)}if(Mt&&Mt.includes("camera-access")&&O){e.state.unbindTexture(),y=s.getBinding();for(let oe=0;oe<Ot.length;oe++){const ge=Ot[oe].camera;if(ge){let ve=x[ge];ve||(ve=new eS,x[ge]=ve);const ee=y.getCameraImage(ge);ve.sourceTexture=ee}}}}for(let Ot=0;Ot<N.length;Ot++){const $t=w[Ot],Mt=N[Ot];$t!==null&&Mt!==void 0&&Mt.update($t,mt,m||d)}se&&se(pt,mt),mt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:mt}),R=null}const te=new rS;te.setAnimationLoop(ie),this.setAnimationLoop=function(pt){se=pt},this.dispose=function(){}}}const WC=new nn,hS=new me;hS.set(-1,0,0,0,1,0,0,0,1);function jC(o,e){function i(S,x){S.matrixAutoUpdate===!0&&S.updateMatrix(),x.value.copy(S.matrix)}function s(S,x){x.color.getRGB(S.fogColor.value,nS(o)),x.isFog?(S.fogNear.value=x.near,S.fogFar.value=x.far):x.isFogExp2&&(S.fogDensity.value=x.density)}function l(S,x,U,V,D){x.isNodeMaterial?x.uniformsNeedUpdate=!1:x.isMeshBasicMaterial?f(S,x):x.isMeshLambertMaterial?(f(S,x),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)):x.isMeshToonMaterial?(f(S,x),y(S,x)):x.isMeshPhongMaterial?(f(S,x),_(S,x),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)):x.isMeshStandardMaterial?(f(S,x),v(S,x),x.isMeshPhysicalMaterial&&b(S,x,D)):x.isMeshMatcapMaterial?(f(S,x),R(S,x)):x.isMeshDepthMaterial?f(S,x):x.isMeshDistanceMaterial?(f(S,x),O(S,x)):x.isMeshNormalMaterial?f(S,x):x.isLineBasicMaterial?(d(S,x),x.isLineDashedMaterial&&h(S,x)):x.isPointsMaterial?p(S,x,U,V):x.isSpriteMaterial?m(S,x):x.isShadowMaterial?(S.color.value.copy(x.color),S.opacity.value=x.opacity):x.isShaderMaterial&&(x.uniformsNeedUpdate=!1)}function f(S,x){S.opacity.value=x.opacity,x.color&&S.diffuse.value.copy(x.color),x.emissive&&S.emissive.value.copy(x.emissive).multiplyScalar(x.emissiveIntensity),x.map&&(S.map.value=x.map,i(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,i(x.alphaMap,S.alphaMapTransform)),x.bumpMap&&(S.bumpMap.value=x.bumpMap,i(x.bumpMap,S.bumpMapTransform),S.bumpScale.value=x.bumpScale,x.side===Wn&&(S.bumpScale.value*=-1)),x.normalMap&&(S.normalMap.value=x.normalMap,i(x.normalMap,S.normalMapTransform),S.normalScale.value.copy(x.normalScale),x.side===Wn&&S.normalScale.value.negate()),x.displacementMap&&(S.displacementMap.value=x.displacementMap,i(x.displacementMap,S.displacementMapTransform),S.displacementScale.value=x.displacementScale,S.displacementBias.value=x.displacementBias),x.emissiveMap&&(S.emissiveMap.value=x.emissiveMap,i(x.emissiveMap,S.emissiveMapTransform)),x.specularMap&&(S.specularMap.value=x.specularMap,i(x.specularMap,S.specularMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest);const U=e.get(x),V=U.envMap,D=U.envMapRotation;V&&(S.envMap.value=V,S.envMapRotation.value.setFromMatrix4(WC.makeRotationFromEuler(D)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1&&S.envMapRotation.value.premultiply(hS),S.reflectivity.value=x.reflectivity,S.ior.value=x.ior,S.refractionRatio.value=x.refractionRatio),x.lightMap&&(S.lightMap.value=x.lightMap,S.lightMapIntensity.value=x.lightMapIntensity,i(x.lightMap,S.lightMapTransform)),x.aoMap&&(S.aoMap.value=x.aoMap,S.aoMapIntensity.value=x.aoMapIntensity,i(x.aoMap,S.aoMapTransform))}function d(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,x.map&&(S.map.value=x.map,i(x.map,S.mapTransform))}function h(S,x){S.dashSize.value=x.dashSize,S.totalSize.value=x.dashSize+x.gapSize,S.scale.value=x.scale}function p(S,x,U,V){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.size.value=x.size*U,S.scale.value=V*.5,x.map&&(S.map.value=x.map,i(x.map,S.uvTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,i(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function m(S,x){S.diffuse.value.copy(x.color),S.opacity.value=x.opacity,S.rotation.value=x.rotation,x.map&&(S.map.value=x.map,i(x.map,S.mapTransform)),x.alphaMap&&(S.alphaMap.value=x.alphaMap,i(x.alphaMap,S.alphaMapTransform)),x.alphaTest>0&&(S.alphaTest.value=x.alphaTest)}function _(S,x){S.specular.value.copy(x.specular),S.shininess.value=Math.max(x.shininess,1e-4)}function y(S,x){x.gradientMap&&(S.gradientMap.value=x.gradientMap)}function v(S,x){S.metalness.value=x.metalness,x.metalnessMap&&(S.metalnessMap.value=x.metalnessMap,i(x.metalnessMap,S.metalnessMapTransform)),S.roughness.value=x.roughness,x.roughnessMap&&(S.roughnessMap.value=x.roughnessMap,i(x.roughnessMap,S.roughnessMapTransform)),x.envMap&&(S.envMapIntensity.value=x.envMapIntensity)}function b(S,x,U){S.ior.value=x.ior,x.sheen>0&&(S.sheenColor.value.copy(x.sheenColor).multiplyScalar(x.sheen),S.sheenRoughness.value=x.sheenRoughness,x.sheenColorMap&&(S.sheenColorMap.value=x.sheenColorMap,i(x.sheenColorMap,S.sheenColorMapTransform)),x.sheenRoughnessMap&&(S.sheenRoughnessMap.value=x.sheenRoughnessMap,i(x.sheenRoughnessMap,S.sheenRoughnessMapTransform))),x.clearcoat>0&&(S.clearcoat.value=x.clearcoat,S.clearcoatRoughness.value=x.clearcoatRoughness,x.clearcoatMap&&(S.clearcoatMap.value=x.clearcoatMap,i(x.clearcoatMap,S.clearcoatMapTransform)),x.clearcoatRoughnessMap&&(S.clearcoatRoughnessMap.value=x.clearcoatRoughnessMap,i(x.clearcoatRoughnessMap,S.clearcoatRoughnessMapTransform)),x.clearcoatNormalMap&&(S.clearcoatNormalMap.value=x.clearcoatNormalMap,i(x.clearcoatNormalMap,S.clearcoatNormalMapTransform),S.clearcoatNormalScale.value.copy(x.clearcoatNormalScale),x.side===Wn&&S.clearcoatNormalScale.value.negate())),x.dispersion>0&&(S.dispersion.value=x.dispersion),x.retroreflectivity>0&&(S.retroreflectivity.value=x.retroreflectivity),x.iridescence>0&&(S.iridescence.value=x.iridescence,S.iridescenceIOR.value=x.iridescenceIOR,S.iridescenceThicknessMinimum.value=x.iridescenceThicknessRange[0],S.iridescenceThicknessMaximum.value=x.iridescenceThicknessRange[1],x.iridescenceMap&&(S.iridescenceMap.value=x.iridescenceMap,i(x.iridescenceMap,S.iridescenceMapTransform)),x.iridescenceThicknessMap&&(S.iridescenceThicknessMap.value=x.iridescenceThicknessMap,i(x.iridescenceThicknessMap,S.iridescenceThicknessMapTransform))),x.transmission>0&&(S.transmission.value=x.transmission,S.transmissionSamplerMap.value=U.texture,S.transmissionSamplerSize.value.set(U.width,U.height),x.transmissionMap&&(S.transmissionMap.value=x.transmissionMap,i(x.transmissionMap,S.transmissionMapTransform)),S.thickness.value=x.thickness,x.thicknessMap&&(S.thicknessMap.value=x.thicknessMap,i(x.thicknessMap,S.thicknessMapTransform)),S.attenuationDistance.value=x.attenuationDistance,S.attenuationColor.value.copy(x.attenuationColor)),x.anisotropy>0&&(S.anisotropyVector.value.set(x.anisotropy*Math.cos(x.anisotropyRotation),x.anisotropy*Math.sin(x.anisotropyRotation)),x.anisotropyMap&&(S.anisotropyMap.value=x.anisotropyMap,i(x.anisotropyMap,S.anisotropyMapTransform))),S.specularIntensity.value=x.specularIntensity,S.specularColor.value.copy(x.specularColor),x.specularColorMap&&(S.specularColorMap.value=x.specularColorMap,i(x.specularColorMap,S.specularColorMapTransform)),x.specularIntensityMap&&(S.specularIntensityMap.value=x.specularIntensityMap,i(x.specularIntensityMap,S.specularIntensityMapTransform))}function R(S,x){x.matcap&&(S.matcap.value=x.matcap)}function O(S,x){const U=e.get(x).light;S.referencePosition.value.setFromMatrixPosition(U.matrixWorld),S.nearDistance.value=U.shadow.camera.near,S.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function YC(o,e,i,s){let l={},f={},d=[];const h=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(D,N){const w=N.program;s.uniformBlockBinding(D,w)}function m(D,N){let w=l[D.id];w===void 0&&(S(D),w=_(D),l[D.id]=w,D.addEventListener("dispose",U));const I=N.program;s.updateUBOMapping(D,I);const T=e.render.frame;f[D.id]!==T&&(v(D),f[D.id]=T)}function _(D){const N=y();D.__bindingPointIndex=N;const w=o.createBuffer(),I=D.__size,T=D.usage;return o.bindBuffer(o.UNIFORM_BUFFER,w),o.bufferData(o.UNIFORM_BUFFER,I,T),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,N,w),w}function y(){for(let D=0;D<h;D++)if(d.indexOf(D)===-1)return d.push(D),D;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function v(D){const N=l[D.id],w=D.uniforms,I=D.__cache;o.bindBuffer(o.UNIFORM_BUFFER,N);for(let T=0,P=w.length;T<P;T++){const L=w[T];if(Array.isArray(L))for(let G=0,Z=L.length;G<Z;G++)b(L[G],T,G,I);else b(L,T,0,I)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function b(D,N,w,I){if(O(D,N,w,I)===!0){const T=D.__offset,P=D.value;if(Array.isArray(P)){let L=0;for(let G=0;G<P.length;G++){const Z=P[G],J=x(Z);R(Z,D.__data,L),typeof Z!="number"&&typeof Z!="boolean"&&!Z.isMatrix3&&!ArrayBuffer.isView(Z)&&(L+=J.storage/Float32Array.BYTES_PER_ELEMENT)}}else R(P,D.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,T,D.__data)}}function R(D,N,w){typeof D=="number"||typeof D=="boolean"?N[0]=D:D.isMatrix3?(N[0]=D.elements[0],N[1]=D.elements[1],N[2]=D.elements[2],N[3]=0,N[4]=D.elements[3],N[5]=D.elements[4],N[6]=D.elements[5],N[7]=0,N[8]=D.elements[6],N[9]=D.elements[7],N[10]=D.elements[8],N[11]=0):ArrayBuffer.isView(D)?N.set(new D.constructor(D.buffer,D.byteOffset,N.length)):D.toArray(N,w)}function O(D,N,w,I){const T=D.value,P=N+"_"+w;if(I[P]===void 0)return typeof T=="number"||typeof T=="boolean"?I[P]=T:ArrayBuffer.isView(T)?I[P]=T.slice():I[P]=T.clone(),!0;{const L=I[P];if(typeof T=="number"||typeof T=="boolean"){if(L!==T)return I[P]=T,!0}else{if(ArrayBuffer.isView(T))return!0;if(L.equals(T)===!1)return L.copy(T),!0}}return!1}function S(D){const N=D.uniforms;let w=0;const I=16;for(let P=0,L=N.length;P<L;P++){const G=Array.isArray(N[P])?N[P]:[N[P]];for(let Z=0,J=G.length;Z<J;Z++){const H=G[Z],Y=Array.isArray(H.value)?H.value:[H.value];for(let z=0,k=Y.length;z<k;z++){const $=Y[z],j=x($),at=w%I,ot=at%j.boundary,zt=at+ot;w+=ot,zt!==0&&I-zt<j.storage&&(w+=I-zt),H.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),H.__offset=w,w+=j.storage}}}const T=w%I;return T>0&&(w+=I-T),D.__size=w,D.__cache={},this}function x(D){const N={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(N.boundary=4,N.storage=4):D.isVector2?(N.boundary=8,N.storage=8):D.isVector3||D.isColor?(N.boundary=16,N.storage=12):D.isVector4?(N.boundary=16,N.storage=16):D.isMatrix3?(N.boundary=48,N.storage=48):D.isMatrix4?(N.boundary=64,N.storage=64):D.isTexture?ce("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(D)?(N.boundary=16,N.storage=D.byteLength):ce("WebGLRenderer: Unsupported uniform value type.",D),N}function U(D){const N=D.target;N.removeEventListener("dispose",U);const w=d.indexOf(N.__bindingPointIndex);d.splice(w,1),o.deleteBuffer(l[N.id]),delete l[N.id],delete f[N.id]}function V(){for(const D in l)o.deleteBuffer(l[D]);d=[],l={},f={}}return{bind:p,update:m,dispose:V}}const qC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ia=null;function ZC(){return ia===null&&(ia=new OE(qC,16,16,$s,ua),ia.name="DFG_LUT",ia.minFilter=Bn,ia.magFilter=Bn,ia.wrapS=La,ia.wrapT=La,ia.generateMipmaps=!1,ia.needsUpdate=!0),ia}class KC{constructor(e={}){const{canvas:i=lE(),context:s=null,depth:l=!0,stencil:f=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:y=!1,reversedDepthBuffer:v=!1,outputBufferType:b=hi}=e;this.isWebGLRenderer=!0;let R;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");R=s.getContextAttributes().alpha}else R=d;const O=b,S=new Set([Jp,Qp,Kp]),x=new Set([hi,ca,_l,Sl,qp,Zp]),U=new Uint32Array(4),V=new Int32Array(4),D=new st;let N=null,w=null;const I=[],T=[];let P=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let G=!1,Z=null,J=null,H=null,Y=null;this._outputColorSpace=Ri;let z=0,k=0,$=null,j=-1,at=null;const ot=new on,zt=new on;let wt=null;const se=new Ae(0);let ie=0,te=i.width,pt=i.height,mt=1,Ot=null,$t=null;const Mt=new on(0,0,te,pt),Gt=new on(0,0,te,pt);let ze=!1;const oe=new am;let ge=!1,ve=!1;const ee=new nn,et=new st,Tt=new on,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let _e=!1;function xe(){return $===null?mt:1}let q=s;function sn(A,X){return i.getContext(A,X)}let Fe,B,E,it,ft,gt,Et,Dt,vt,yt,Ct,Jt,It,Pt,Xt,ae,de,K,At,St,Nt,kt,bt;try{const A={alpha:!0,depth:l,stencil:f,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:y};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Wp}`),i.addEventListener("webglcontextlost",Oe,!1),i.addEventListener("webglcontextrestored",he,!1),i.addEventListener("webglcontextcreationerror",ei,!1),q===null){const X="webgl2";if(q=sn(X,A),q===null)throw sn(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Qt()}catch(A){throw i.removeEventListener("webglcontextlost",Oe,!1),i.removeEventListener("webglcontextrestored",he,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),He("WebGLRenderer: "+A.message),A}function Qt(){Fe=new ZA(q),Fe.init(),Nt=new HC(q,Fe),B=new FA(q,Fe,e,Nt),E=new BC(q,Fe),B.reversedDepthBuffer&&v&&E.buffers.depth.setReversed(!0),J=q.createFramebuffer(),H=q.createFramebuffer(),Y=q.createFramebuffer(),it=new JA(q),ft=new EC,gt=new FC(q,Fe,E,ft,B,Nt,it),Et=new qA(L),Dt=new t1(q),kt=new zA(q,Dt),vt=new KA(q,Dt,it,kt),yt=new tR(q,vt,Dt,kt,it),K=new $A(q,B,gt),Xt=new HA(ft),Ct=new bC(L,Et,Fe,B,kt,Xt),Jt=new jC(L,ft),It=new AC,Pt=new UC(Fe),de=new IA(L,Et,E,yt,R,p),ae=new zC(L,yt,B),bt=new YC(q,it,B,E),At=new BA(q,Fe,it),St=new QA(q,Fe,it),it.programs=Ct.programs,L.capabilities=B,L.extensions=Fe,L.properties=ft,L.renderLists=It,L.shadowMap=ae,L.state=E,L.info=it}O!==hi&&(P=new nR(O,i.width,i.height,h,l,f));const Vt=new XC(L,q);this.xr=Vt,this.getContext=function(){return q},this.getContextAttributes=function(){return q.getContextAttributes()},this.forceContextLoss=function(){const A=Fe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Fe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(A){A!==void 0&&(mt=A,this.setSize(te,pt,!1))},this.getSize=function(A){return A.set(te,pt)},this.setSize=function(A,X,ht=!0){if(Vt.isPresenting){ce("WebGLRenderer: Can't change size while VR device is presenting.");return}te=A,pt=X,i.width=Math.floor(A*mt),i.height=Math.floor(X*mt),ht===!0&&(i.style.width=A+"px",i.style.height=X+"px"),P!==null&&P.setSize(i.width,i.height),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(te*mt,pt*mt).floor()},this.setDrawingBufferSize=function(A,X,ht){te=A,pt=X,mt=ht,i.width=Math.floor(A*ht),i.height=Math.floor(X*ht),this.setViewport(0,0,A,X)},this.setEffects=function(A){if(O===hi){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let X=0;X<A.length;X++)if(A[X].isOutputPass===!0){ce("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(ot)},this.getViewport=function(A){return A.copy(Mt)},this.setViewport=function(A,X,ht,lt){A.isVector4?Mt.set(A.x,A.y,A.z,A.w):Mt.set(A,X,ht,lt),E.viewport(ot.copy(Mt).multiplyScalar(mt).round())},this.getScissor=function(A){return A.copy(Gt)},this.setScissor=function(A,X,ht,lt){A.isVector4?Gt.set(A.x,A.y,A.z,A.w):Gt.set(A,X,ht,lt),E.scissor(zt.copy(Gt).multiplyScalar(mt).round())},this.getScissorTest=function(){return ze},this.setScissorTest=function(A){E.setScissorTest(ze=A)},this.setOpaqueSort=function(A){Ot=A},this.setTransparentSort=function(A){$t=A},this.getClearColor=function(A){return A.copy(de.getClearColor())},this.setClearColor=function(){de.setClearColor(...arguments)},this.getClearAlpha=function(){return de.getClearAlpha()},this.setClearAlpha=function(){de.setClearAlpha(...arguments)},this.clear=function(A=!0,X=!0,ht=!0){let lt=0;if(A){let ct=!1;if($!==null){const Bt=$.texture.format;ct=S.has(Bt)}if(ct){const Bt=$.texture.type,Wt=x.has(Bt),Ut=de.getClearColor(),qt=de.getClearAlpha(),Zt=Ut.r,le=Ut.g,pe=Ut.b;Wt?(U[0]=Zt,U[1]=le,U[2]=pe,U[3]=qt,q.clearBufferuiv(q.COLOR,0,U)):(V[0]=Zt,V[1]=le,V[2]=pe,V[3]=qt,q.clearBufferiv(q.COLOR,0,V))}else lt|=q.COLOR_BUFFER_BIT}X&&(lt|=q.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ht&&(lt|=q.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),lt!==0&&q.clear(lt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),Z=A},this.dispose=function(){i.removeEventListener("webglcontextlost",Oe,!1),i.removeEventListener("webglcontextrestored",he,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),de.dispose(),It.dispose(),Pt.dispose(),ft.dispose(),Et.dispose(),yt.dispose(),kt.dispose(),bt.dispose(),Ct.dispose(),Vt.dispose(),Vt.removeEventListener("sessionstart",Ms),Vt.removeEventListener("sessionend",Fa),Vi.stop()};function Oe(A){A.preventDefault(),Rx("WebGLRenderer: Context Lost."),G=!0}function he(){Rx("WebGLRenderer: Context Restored."),G=!1;const A=it.autoReset,X=ae.enabled,ht=ae.autoUpdate,lt=ae.needsUpdate,ct=ae.type;Qt(),it.autoReset=A,ae.enabled=X,ae.autoUpdate=ht,ae.needsUpdate=lt,ae.type=ct}function ei(A){He("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function mi(A){const X=A.target;X.removeEventListener("dispose",mi),Vu(X)}function Vu(A){tr(A),ft.remove(A)}function tr(A){const X=ft.get(A).programs;X!==void 0&&(X.forEach(function(ht){Ct.releaseProgram(ht)}),A.isShaderMaterial&&Ct.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,ht,lt,ct,Bt){X===null&&(X=fe);const Wt=ct.isMesh&&ct.matrixWorld.determinantAffine()<0,Ut=go(A,X,ht,lt,ct);E.setMaterial(lt,Wt);let qt=ht.index,Zt=1;if(lt.wireframe===!0){if(qt=vt.getWireframeAttribute(ht),qt===void 0)return;Zt=2}const le=ht.drawRange,pe=ht.attributes.position;let jt=le.start*Zt,Re=(le.start+le.count)*Zt;Bt!==null&&(jt=Math.max(jt,Bt.start*Zt),Re=Math.min(Re,(Bt.start+Bt.count)*Zt)),qt!==null?(jt=Math.max(jt,0),Re=Math.min(Re,qt.count)):pe!=null&&(jt=Math.max(jt,0),Re=Math.min(Re,pe.count));const be=Re-jt;if(be<0||be===1/0)return;kt.setup(ct,lt,Ut,ht,qt);let Ke,ke=At;if(qt!==null&&(Ke=Dt.get(qt),ke=St,ke.setIndex(Ke)),ct.isMesh)lt.wireframe===!0?(E.setLineWidth(lt.wireframeLinewidth*xe()),ke.setMode(q.LINES)):ke.setMode(q.TRIANGLES);else if(ct.isLine){let xn=lt.linewidth;xn===void 0&&(xn=1),E.setLineWidth(xn*xe()),ct.isLineSegments?ke.setMode(q.LINES):ct.isLineLoop?ke.setMode(q.LINE_LOOP):ke.setMode(q.LINE_STRIP)}else ct.isPoints?ke.setMode(q.POINTS):ct.isSprite&&ke.setMode(q.TRIANGLES);if(ct.isBatchedMesh)if(Fe.get("WEBGL_multi_draw"))ke.renderMultiDraw(ct._multiDrawStarts,ct._multiDrawCounts,ct._multiDrawCount);else{const xn=ct._multiDrawStarts,Ft=ct._multiDrawCounts,ln=ct._multiDrawCount,Pe=qt?Dt.get(qt).bytesPerElement:1,Fn=ft.get(lt).currentProgram.getUniforms();for(let ni=0;ni<ln;ni++)Fn.setValue(q,"_gl_DrawID",ni),ke.render(xn[ni]/Pe,Ft[ni])}else if(ct.isInstancedMesh)ke.renderInstances(jt,be,ct.count);else if(ht.isInstancedBufferGeometry){const xn=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,Ft=Math.min(ht.instanceCount,xn);ke.renderInstances(jt,be,Ft)}else ke.render(jt,be)};function ys(A,X,ht,lt){Z!==null&&A.isNodeMaterial&&Z.setObject(lt,A),ge===!0&&Xt.setState(A,ht,!1),A.transparent===!0&&A.side===sa&&A.forceSinglePass===!1?(A.side=Wn,A.needsUpdate=!0,bs(A,X,lt),A.side=Qs,A.needsUpdate=!0,bs(A,X,lt),A.side=sa):bs(A,X,lt)}this.compile=function(A,X,ht=null){ht===null&&(ht=A),Z!==null&&Z.renderStart(A,X,ht),w=Pt.get(ht),w.init(X),T.push(w),ht.traverseVisible(function(ct){ct.isLight&&ct.layers.test(X.layers)&&(w.pushLight(ct),ct.castShadow&&w.pushShadow(ct))}),A!==ht&&A.traverseVisible(function(ct){ct.isLight&&ct.layers.test(X.layers)&&(w.pushLight(ct),ct.castShadow&&w.pushShadow(ct))}),w.setupLights(),Z!==null&&Z.updateLights(w.state.lightsArray),ve=this.localClippingEnabled,ge=Xt.init(this.clippingPlanes,ve),ge===!0&&Xt.setGlobalState(this.clippingPlanes,X),Z!==null&&ae.render(w.state.shadowsArray,ht,X);const lt=new Set;return A.traverse(function(ct){if(!(ct.isMesh||ct.isPoints||ct.isLine||ct.isSprite))return;const Bt=ct.material;if(Bt)if(Array.isArray(Bt))for(let Wt=0;Wt<Bt.length;Wt++){const Ut=Bt[Wt];ys(Ut,ht,X,ct),lt.add(Ut)}else ys(Bt,ht,X,ct),lt.add(Bt)}),w=T.pop(),Z!==null&&Z.renderEnd(),lt},this.compileAsync=function(A,X,ht=null){const lt=this.compile(A,X,ht);return new Promise(ct=>{function Bt(){if(lt.forEach(function(Wt){const qt=ft.get(Wt).currentProgram;(qt===void 0||qt.isReady())&&lt.delete(Wt)}),lt.size===0){ct(A);return}setTimeout(Bt,10)}Fe.get("KHR_parallel_shader_compile")!==null?Bt():setTimeout(Bt,10)})};let Ba=null;function da(A){Ba&&Ba(A)}function Ms(){Vi.stop()}function Fa(){Vi.start()}const Vi=new rS;Vi.setAnimationLoop(da),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(A){Ba=A,Vt.setAnimationLoop(A),A===null?Vi.stop():Vi.start()},Vt.addEventListener("sessionstart",Ms),Vt.addEventListener("sessionend",Fa),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(G===!0)return;Z!==null&&Z.renderStart(A,X);const ht=Vt.enabled===!0&&Vt.isPresenting===!0,lt=P!==null&&($===null||ht)&&P.begin(L,$);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Vt.enabled===!0&&Vt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Vt.cameraAutoUpdate===!0&&Vt.updateCamera(X),X=Vt.getCamera()),A.isScene===!0&&A.onBeforeRender(L,A,X,$),w=Pt.get(A,T.length),w.init(X),w.state.textureUnits=gt.getTextureUnits(),T.push(w),ee.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),oe.setFromProjectionMatrix(ee,oa,X.reversedDepth),ve=this.localClippingEnabled,ge=Xt.init(this.clippingPlanes,ve),N=It.get(A,I.length),N.init(),I.push(N),Vt.enabled===!0&&Vt.isPresenting===!0){const Wt=L.xr.getDepthSensingMesh();Wt!==null&&uo(Wt,X,-1/0,L.sortObjects)}uo(A,X,0,L.sortObjects),N.finish(),Z!==null&&Z.updateLights(w.state.lightsArray),L.sortObjects===!0&&N.sort(Ot,$t),_e=Vt.enabled===!1||Vt.isPresenting===!1||Vt.hasDepthSensing()===!1,_e&&de.addToRenderList(N,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ge===!0&&Xt.beginShadows();const ct=w.state.shadowsArray;if(ae.render(ct,A,X),ge===!0&&Xt.endShadows(),(lt&&P.hasRenderPass())===!1){const Wt=N.opaque,Ut=N.transmissive;if(w.setupLights(),X.isArrayCamera){const qt=X.cameras;if(Ut.length>0)for(let Zt=0,le=qt.length;Zt<le;Zt++){const pe=qt[Zt];er(Wt,Ut,A,pe)}_e&&de.render(A);for(let Zt=0,le=qt.length;Zt<le;Zt++){const pe=qt[Zt];fo(N,A,pe,pe.viewport)}}else Ut.length>0&&er(Wt,Ut,A,X),_e&&de.render(A),fo(N,A,X)}$!==null&&k===0&&(gt.updateMultisampleRenderTarget($),gt.updateRenderTargetMipmap($)),lt&&P.end(L),A.isScene===!0&&A.onAfterRender(L,A,X),kt.resetDefaultState(),j=-1,at=null,T.pop(),T.length>0?(w=T[T.length-1],gt.setTextureUnits(w.state.textureUnits),ge===!0&&Xt.setGlobalState(L.clippingPlanes,w.state.camera)):w=null,I.pop(),I.length>0?N=I[I.length-1]:N=null,Z!==null&&Z.renderEnd()};function uo(A,X,ht,lt){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)ht=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||A.intersectsFrustum(oe)){lt&&Tt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ee);const Wt=yt.update(A),Ut=A.material;Ut.visible&&N.push(A,Wt,Ut,ht,Tt.z,null,X)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||A.intersectsFrustum(oe))){const Wt=yt.update(A),Ut=A.material;if(lt&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Tt.copy(A.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),Tt.copy(Wt.boundingSphere.center)),Tt.applyMatrix4(A.matrixWorld).applyMatrix4(ee)),Array.isArray(Ut)){const qt=Wt.groups;for(let Zt=0,le=qt.length;Zt<le;Zt++){const pe=qt[Zt],jt=Ut[pe.materialIndex];jt&&jt.visible&&N.push(A,Wt,jt,ht,Tt.z,pe,X)}}else Ut.visible&&N.push(A,Wt,Ut,ht,Tt.z,null,X)}}const Bt=A.children;for(let Wt=0,Ut=Bt.length;Wt<Ut;Wt++)uo(Bt[Wt],X,ht,lt)}function fo(A,X,ht,lt){const{opaque:ct,transmissive:Bt,transparent:Wt}=A;w.setupLightsView(ht),ge===!0&&Xt.setGlobalState(L.clippingPlanes,ht),lt&&E.viewport(ot.copy(lt)),ct.length>0&&ki(ct,X,ht),Bt.length>0&&ki(Bt,X,ht),Wt.length>0&&ki(Wt,X,ht),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function er(A,X,ht,lt){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[lt.id]===void 0){const jt=Fe.has("EXT_color_buffer_half_float")||Fe.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[lt.id]=new Gi(1,1,{generateMipmaps:!0,type:jt?ua:hi,minFilter:Zs,samples:Math.max(4,B.samples),stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Ie.workingColorSpace})}const Bt=w.state.transmissionRenderTarget[lt.id],Wt=lt.viewport||ot;Bt.setSize(Wt.z*L.transmissionResolutionScale,Wt.w*L.transmissionResolutionScale);const Ut=L.getRenderTarget(),qt=L.getActiveCubeFace(),Zt=L.getActiveMipmapLevel();L.setRenderTarget(Bt),L.getClearColor(se),ie=L.getClearAlpha(),ie<1&&L.setClearColor(16777215,.5),L.clear(),_e&&de.render(ht);const le=L.toneMapping;L.toneMapping=la;const pe=lt.viewport;if(lt.viewport!==void 0&&(lt.viewport=void 0),w.setupLightsView(lt),ge===!0&&Xt.setGlobalState(L.clippingPlanes,lt),ki(A,ht,lt),gt.updateMultisampleRenderTarget(Bt),gt.updateRenderTargetMipmap(Bt),Fe.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Re=0,be=X.length;Re<be;Re++){const Ke=X[Re],{object:ke,geometry:xn,material:Ft,group:ln}=Ke;if(Ft.side===sa&&ke.layers.test(lt.layers)){const Pe=Ft.side;Ft.side=Wn,Ft.needsUpdate=!0,Al(ke,ht,lt,xn,Ft,ln),Ft.side=Pe,Ft.needsUpdate=!0,jt=!0}}jt===!0&&(gt.updateMultisampleRenderTarget(Bt),gt.updateRenderTargetMipmap(Bt))}L.setRenderTarget(Ut,qt,Zt),L.setClearColor(se,ie),pe!==void 0&&(lt.viewport=pe),L.toneMapping=le}function ki(A,X,ht){const lt=X.isScene===!0?X.overrideMaterial:null;for(let ct=0,Bt=A.length;ct<Bt;ct++){const Wt=A[ct],{object:Ut,geometry:qt,group:Zt}=Wt;let le=Wt.material;le.allowOverride===!0&&lt!==null&&(le=lt),Ut.layers.test(ht.layers)&&Al(Ut,X,ht,qt,le,Zt)}}function Al(A,X,ht,lt,ct,Bt){Z!==null&&ct.isNodeMaterial&&Z.setObject(A,ct),A.onBeforeRender(L,X,ht,lt,ct,Bt),A.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ct.onBeforeRender(L,X,ht,lt,A,Bt),ct.transparent===!0&&ct.side===sa&&ct.forceSinglePass===!1?(ct.side=Wn,ct.needsUpdate=!0,L.renderBufferDirect(ht,X,lt,ct,A,Bt),ct.side=Qs,ct.needsUpdate=!0,L.renderBufferDirect(ht,X,lt,ct,A,Bt),ct.side=sa):L.renderBufferDirect(ht,X,lt,ct,A,Bt),A.onAfterRender(L,X,ht,lt,ct,Bt)}function bs(A,X,ht){X.isScene!==!0&&(X=fe);const lt=ft.get(A),ct=w.state.lights,Bt=w.state.shadowsArray,Wt=ct.state.version,Ut=Ct.getParameters(A,ct.state,Bt,X,ht,w.state.lightProbeGridArray),qt=Ct.getProgramCacheKey(Ut);let Zt=lt.programs;lt.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,lt.fog=X.fog;const le=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;lt.envMap=Et.get(A.envMap||lt.environment,le),lt.envMapRotation=lt.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,Zt===void 0&&(A.addEventListener("dispose",mi),Zt=new Map,lt.programs=Zt);let pe=Zt.get(qt);if(pe!==void 0){if(lt.currentProgram===pe&&lt.lightsStateVersion===Wt)return po(A,Ut),pe}else Ut.uniforms=Ct.getUniforms(A),Z!==null&&A.isNodeMaterial&&Z.build(A,ht,Ut),A.onBeforeCompile(Ut,L),pe=Ct.acquireProgram(Ut,qt),Zt.set(qt,pe),lt.uniforms=Ut.uniforms;const jt=lt.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(jt.clippingPlanes=Xt.uniform),po(A,Ut),lt.needsLights=Cl(A),lt.lightsStateVersion=Wt,lt.needsLights&&(jt.ambientLightColor.value=ct.state.ambient,jt.lightProbe.value=ct.state.probe,jt.sunLights.value=ct.state.sun,jt.sunLightShadows.value=ct.state.sunShadow,jt.directionalLights.value=ct.state.directional,jt.directionalLightShadows.value=ct.state.directionalShadow,jt.spotLights.value=ct.state.spot,jt.spotLightShadows.value=ct.state.spotShadow,jt.rectAreaLights.value=ct.state.rectArea,jt.ltc_1.value=ct.state.rectAreaLTC1,jt.ltc_2.value=ct.state.rectAreaLTC2,jt.pointLights.value=ct.state.point,jt.pointLightShadows.value=ct.state.pointShadow,jt.hemisphereLights.value=ct.state.hemi,jt.sunShadowMatrix.value=ct.state.sunShadowMatrix,jt.sunShadowCascade.value=ct.state.sunShadowCascade,jt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,jt.spotLightMatrix.value=ct.state.spotLightMatrix,jt.spotLightMap.value=ct.state.spotLightMap,jt.pointShadowMatrix.value=ct.state.pointShadowMatrix),lt.lightProbeGrid=w.state.lightProbeGridArray.length>0,lt.currentProgram=pe,lt.uniformsList=null,pe}function ho(A){if(A.uniformsList===null){const X=A.currentProgram.getUniforms();A.uniformsList=Au.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function po(A,X){const ht=ft.get(A);ht.outputColorSpace=X.outputColorSpace,ht.batching=X.batching,ht.batchingColor=X.batchingColor,ht.instancing=X.instancing,ht.instancingColor=X.instancingColor,ht.instancingMorph=X.instancingMorph,ht.skinning=X.skinning,ht.morphTargets=X.morphTargets,ht.morphNormals=X.morphNormals,ht.morphColors=X.morphColors,ht.morphTargetsCount=X.morphTargetsCount,ht.numClippingPlanes=X.numClippingPlanes,ht.numIntersection=X.numClipIntersection,ht.vertexAlphas=X.vertexAlphas,ht.vertexTangents=X.vertexTangents,ht.toneMapping=X.toneMapping}function mo(A,X){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;D.setFromMatrixPosition(X.matrixWorld);for(let ht=0,lt=A.length;ht<lt;ht++){const ct=A[ht];if(ct.texture!==null&&ct.boundingBox.containsPoint(D))return ct}return null}function go(A,X,ht,lt,ct){X.isScene!==!0&&(X=fe),gt.resetTextureUnits();const Bt=X.fog,Wt=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial?X.environment:null,Ut=$===null?L.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ie.workingColorSpace,qt=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial&&!lt.envMap||lt.isMeshPhongMaterial&&!lt.envMap,Zt=Et.get(lt.envMap||Wt,qt),le=lt.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,pe=!!ht.attributes.tangent&&(!!lt.normalMap||lt.anisotropy>0),jt=!!ht.morphAttributes.position,Re=!!ht.morphAttributes.normal,be=!!ht.morphAttributes.color;let Ke=la;lt.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ke=L.toneMapping);const ke=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,xn=ke!==void 0?ke.length:0,Ft=ft.get(lt),ln=w.state.lights;if(ge===!0&&(ve===!0||A!==at)){const Ne=A===at&&lt.id===j;Xt.setState(lt,A,Ne)}let Pe=!1;lt.version===Ft.__version?(Ft.needsLights&&Ft.lightsStateVersion!==ln.state.version||Ft.outputColorSpace!==Ut||ct.isBatchedMesh&&Ft.batching===!1||!ct.isBatchedMesh&&Ft.batching===!0||ct.isBatchedMesh&&Ft.batchingColor===!0&&ct._colorsTexture===null||ct.isBatchedMesh&&Ft.batchingColor===!1&&ct._colorsTexture!==null||ct.isInstancedMesh&&Ft.instancing===!1||!ct.isInstancedMesh&&Ft.instancing===!0||ct.isSkinnedMesh&&Ft.skinning===!1||!ct.isSkinnedMesh&&Ft.skinning===!0||ct.isInstancedMesh&&Ft.instancingColor===!0&&ct.instanceColor===null||ct.isInstancedMesh&&Ft.instancingColor===!1&&ct.instanceColor!==null||ct.isInstancedMesh&&Ft.instancingMorph===!0&&ct.morphTexture===null||ct.isInstancedMesh&&Ft.instancingMorph===!1&&ct.morphTexture!==null||Ft.envMap!==Zt||lt.fog===!0&&Ft.fog!==Bt||Ft.numClippingPlanes!==void 0&&(Ft.numClippingPlanes!==Xt.numPlanes||Ft.numIntersection!==Xt.numIntersection)||Ft.vertexAlphas!==le||Ft.vertexTangents!==pe||Ft.morphTargets!==jt||Ft.morphNormals!==Re||Ft.morphColors!==be||Ft.toneMapping!==Ke||Ft.morphTargetsCount!==xn||!!Ft.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(Pe=!0):(Pe=!0,Ft.__version=lt.version);let Fn=Ft.currentProgram;Pe===!0&&(Fn=bs(lt,X,ct),Z&&lt.isNodeMaterial&&Z.onUpdateProgram(lt,Fn,Ft));let ni=!1,Xi=!1,Ee=!1;const Ge=Fn.getUniforms(),$e=Ft.uniforms;if(E.useProgram(Fn.program)&&(ni=!0,Xi=!0,Ee=!0),lt.id!==j&&(j=lt.id,Xi=!0),Ft.needsLights){const Ne=mo(w.state.lightProbeGridArray,ct);Ft.lightProbeGrid!==Ne&&(Ft.lightProbeGrid=Ne,Xi=!0)}if(ni||at!==A){E.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Ge.setValue(q,"projectionMatrix",A.projectionMatrix),Ge.setValue(q,"viewMatrix",A.matrixWorldInverse);const cn=Ge.map.cameraPosition;cn!==void 0&&cn.setValue(q,et.setFromMatrixPosition(A.matrixWorld)),B.logarithmicDepthBuffer&&Ge.setValue(q,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(lt.isMeshPhongMaterial||lt.isMeshToonMaterial||lt.isMeshLambertMaterial||lt.isMeshBasicMaterial||lt.isMeshStandardMaterial||lt.isShaderMaterial)&&Ge.setValue(q,"isOrthographic",A.isOrthographicCamera===!0),at!==A&&(at=A,Xi=!0,Ee=!0)}if(Ft.needsLights&&(ln.state.sunShadowMap.length>0&&Ge.setValue(q,"sunShadowMap",ln.state.sunShadowMap,gt),ln.state.directionalShadowMap.length>0&&Ge.setValue(q,"directionalShadowMap",ln.state.directionalShadowMap,gt),ln.state.spotShadowMap.length>0&&Ge.setValue(q,"spotShadowMap",ln.state.spotShadowMap,gt),ln.state.pointShadowMap.length>0&&Ge.setValue(q,"pointShadowMap",ln.state.pointShadowMap,gt)),ct.isSkinnedMesh){Ge.setOptional(q,ct,"bindMatrix"),Ge.setOptional(q,ct,"bindMatrixInverse");const Ne=ct.skeleton;Ne&&(Ne.boneTexture===null&&Ne.computeBoneTexture(),Ge.setValue(q,"boneTexture",Ne.boneTexture,gt))}ct.isBatchedMesh&&(Ge.setOptional(q,ct,"batchingTexture"),Ge.setValue(q,"batchingTexture",ct._matricesTexture,gt),Ge.setOptional(q,ct,"batchingIdTexture"),Ge.setValue(q,"batchingIdTexture",ct._indirectTexture,gt),Ge.setOptional(q,ct,"batchingColorTexture"),ct._colorsTexture!==null&&Ge.setValue(q,"batchingColorTexture",ct._colorsTexture,gt));const ii=ht.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&K.update(ct,ht,Fn),(Xi||Ft.receiveShadow!==ct.receiveShadow)&&(Ft.receiveShadow=ct.receiveShadow,Ge.setValue(q,"receiveShadow",ct.receiveShadow)),(lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial)&&lt.envMap===null&&X.environment!==null&&($e.envMapIntensity.value=X.environmentIntensity),$e.dfgLUT!==void 0&&($e.dfgLUT.value=ZC()),Xi){if(Ge.setValue(q,"toneMappingExposure",L.toneMappingExposure),Ft.needsLights&&Rl($e,Ee),Bt&&lt.fog===!0&&Jt.refreshFogUniforms($e,Bt),Jt.refreshMaterialUniforms($e,lt,mt,pt,w.state.transmissionRenderTarget[A.id]),Ft.needsLights&&Ft.lightProbeGrid){const Ne=Ft.lightProbeGrid;$e.probesSH.value=Ne.texture,$e.probesMin.value.copy(Ne.boundingBox.min),$e.probesMax.value.copy(Ne.boundingBox.max),$e.probesResolution.value.copy(Ne.resolution)}Au.upload(q,ho(Ft),$e,gt)}if(lt.isShaderMaterial&&lt.uniformsNeedUpdate===!0&&(Au.upload(q,ho(Ft),$e,gt),lt.uniformsNeedUpdate=!1),lt.isSpriteMaterial&&Ge.setValue(q,"center",ct.center),Ge.setValue(q,"modelViewMatrix",ct.modelViewMatrix),Ge.setValue(q,"normalMatrix",ct.normalMatrix),Ge.setValue(q,"modelMatrix",ct.matrixWorld),lt.uniformsGroups!==void 0){const Ne=lt.uniformsGroups;for(let cn=0,ha=Ne.length;cn<ha;cn++){const wl=Ne[cn];bt.update(wl,Fn),bt.bind(wl,Fn)}}return Fn}function Rl(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.sunLights.needsUpdate=X,A.sunLightShadows.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function Cl(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return z},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(A,X,ht){const lt=ft.get(A);lt.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,lt.__autoAllocateDepthBuffer===!1&&(lt.__useRenderToTexture=!1),ft.get(A.texture).__webglTexture=X,ft.get(A.depthTexture).__webglTexture=lt.__autoAllocateDepthBuffer?void 0:ht,lt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,X){const ht=ft.get(A);ht.__webglFramebuffer=X,ht.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,ht=0){$=A,z=X,k=ht;let lt=null,ct=!1,Bt=!1;if(A){const Ut=ft.get(A);if(Ut.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(q.FRAMEBUFFER,Ut.__webglFramebuffer),ot.copy(A.viewport),zt.copy(A.scissor),wt=A.scissorTest,E.viewport(ot),E.scissor(zt),E.setScissorTest(wt),j=-1;return}else if(Ut.__webglFramebuffer===void 0)gt.setupRenderTarget(A);else if(Ut.__hasExternalTextures)gt.rebindTextures(A,ft.get(A.texture).__webglTexture,ft.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const le=A.depthTexture;if(Ut.__boundDepthTexture!==le){if(le!==null&&ft.has(le)&&(A.width!==le.image.width||A.height!==le.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");gt.setupDepthRenderbuffer(A)}}const qt=A.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Bt=!0);const Zt=ft.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Zt[X])?lt=Zt[X][ht]:lt=Zt[X],ct=!0):A.samples>0&&gt.useMultisampledRTT(A)===!1?lt=ft.get(A).__webglMultisampledFramebuffer:Array.isArray(Zt)?lt=Zt[ht]:lt=Zt,ot.copy(A.viewport),zt.copy(A.scissor),wt=A.scissorTest}else ot.copy(Mt).multiplyScalar(mt).floor(),zt.copy(Gt).multiplyScalar(mt).floor(),wt=ze;if(ht!==0&&(lt=J),E.bindFramebuffer(q.FRAMEBUFFER,lt)&&E.drawBuffers(A,lt),E.viewport(ot),E.scissor(zt),E.setScissorTest(wt),ct){const Ut=ft.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_CUBE_MAP_POSITIVE_X+X,Ut.__webglTexture,ht)}else if(Bt){const Ut=X;for(let qt=0;qt<A.textures.length;qt++){const Zt=ft.get(A.textures[qt]);q.framebufferTextureLayer(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0+qt,Zt.__webglTexture,ht,Ut)}}else if(A!==null&&ht!==0){const Ut=ft.get(A.texture);q.framebufferTexture2D(q.FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,Ut.__webglTexture,ht)}j=-1};function gi(A){const X=ft.get(A);return(X.__readFormat!==A.format||X.__readType!==A.type)&&(X.__readFormat=A.format,X.__readType=A.type,X.__formatReadable=B.textureFormatReadable(A.format),X.__typeReadable=B.textureTypeReadable(A.type)),X}this.readRenderTargetPixels=function(A,X,ht,lt,ct,Bt,Wt,Ut=0){if(!(A&&A.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let qt=ft.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(qt=qt[Wt]),qt){E.bindFramebuffer(q.FRAMEBUFFER,qt);try{const Zt=A.textures[Ut],le=Zt.format,pe=Zt.type;A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ut);const jt=gi(Zt);if(jt.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(jt.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-lt&&ht>=0&&ht<=A.height-ct&&q.readPixels(X,ht,lt,ct,Nt.convert(le),Nt.convert(pe),Bt)}finally{const Zt=$!==null?ft.get($).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,Zt)}}},this.readRenderTargetPixelsAsync=async function(A,X,ht,lt,ct,Bt,Wt,Ut=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let qt=ft.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&Wt!==void 0&&(qt=qt[Wt]),qt)if(X>=0&&X<=A.width-lt&&ht>=0&&ht<=A.height-ct){E.bindFramebuffer(q.FRAMEBUFFER,qt);const Zt=A.textures[Ut],le=Zt.format,pe=Zt.type;A.textures.length>1&&q.readBuffer(q.COLOR_ATTACHMENT0+Ut);const jt=gi(Zt);if(jt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(jt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=q.createBuffer();q.bindBuffer(q.PIXEL_PACK_BUFFER,Re),q.bufferData(q.PIXEL_PACK_BUFFER,Bt.byteLength,q.STREAM_READ),q.readPixels(X,ht,lt,ct,Nt.convert(le),Nt.convert(pe),0),q.bindBuffer(q.PIXEL_PACK_BUFFER,null);const be=$!==null?ft.get($).__webglFramebuffer:null;E.bindFramebuffer(q.FRAMEBUFFER,be);const Ke=q.fenceSync(q.SYNC_GPU_COMMANDS_COMPLETE,0);return q.flush(),await cE(q,Ke,4),q.bindBuffer(q.PIXEL_PACK_BUFFER,Re),q.getBufferSubData(q.PIXEL_PACK_BUFFER,0,Bt),q.bindBuffer(q.PIXEL_PACK_BUFFER,null),q.deleteBuffer(Re),q.deleteSync(Ke),Bt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,X=null,ht=0){const lt=Math.pow(2,-ht),ct=Math.floor(A.image.width*lt),Bt=Math.floor(A.image.height*lt),Wt=X!==null?X.x:0,Ut=X!==null?X.y:0;gt.setTexture2D(A,0),q.copyTexSubImage2D(q.TEXTURE_2D,ht,0,0,Wt,Ut,ct,Bt),E.unbindTexture()},this.copyTextureToTexture=function(A,X,ht=null,lt=null,ct=0,Bt=0){let Wt,Ut,qt,Zt,le,pe,jt,Re,be;const Ke=A.isCompressedTexture?A.mipmaps[Bt]:A.image;if(ht!==null)Wt=ht.max.x-ht.min.x,Ut=ht.max.y-ht.min.y,qt=ht.isBox3?ht.max.z-ht.min.z:1,Zt=ht.min.x,le=ht.min.y,pe=ht.isBox3?ht.min.z:0;else{const $e=Math.pow(2,-ct);Wt=Math.floor(Ke.width*$e),Ut=Math.floor(Ke.height*$e),A.isDataArrayTexture?qt=Ke.depth:A.isData3DTexture?qt=Math.floor(Ke.depth*$e):qt=1,Zt=0,le=0,pe=0}lt!==null?(jt=lt.x,Re=lt.y,be=lt.z):(jt=0,Re=0,be=0);const ke=Nt.convert(X.format),xn=Nt.convert(X.type);let Ft;X.isData3DTexture?(gt.setTexture3D(X,0),Ft=q.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(gt.setTexture2DArray(X,0),Ft=q.TEXTURE_2D_ARRAY):(gt.setTexture2D(X,0),Ft=q.TEXTURE_2D),E.activeTexture(q.TEXTURE0),E.pixelStorei(q.UNPACK_FLIP_Y_WEBGL,X.flipY),E.pixelStorei(q.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),E.pixelStorei(q.UNPACK_ALIGNMENT,X.unpackAlignment);const ln=E.getParameter(q.UNPACK_ROW_LENGTH),Pe=E.getParameter(q.UNPACK_IMAGE_HEIGHT),Fn=E.getParameter(q.UNPACK_SKIP_PIXELS),ni=E.getParameter(q.UNPACK_SKIP_ROWS),Xi=E.getParameter(q.UNPACK_SKIP_IMAGES);E.pixelStorei(q.UNPACK_ROW_LENGTH,Ke.width),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Ke.height),E.pixelStorei(q.UNPACK_SKIP_PIXELS,Zt),E.pixelStorei(q.UNPACK_SKIP_ROWS,le),E.pixelStorei(q.UNPACK_SKIP_IMAGES,pe);const Ee=A.isDataArrayTexture||A.isData3DTexture,Ge=X.isDataArrayTexture||X.isData3DTexture;if(A.isDepthTexture){const $e=ft.get(A),ii=ft.get(X),Ne=ft.get($e.__renderTarget),cn=ft.get(ii.__renderTarget);E.bindFramebuffer(q.READ_FRAMEBUFFER,Ne.__webglFramebuffer),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,cn.__webglFramebuffer);for(let ha=0;ha<qt;ha++)Ee&&(q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,ft.get(A).__webglTexture,ct,pe+ha),q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,ft.get(X).__webglTexture,Bt,be+ha)),q.blitFramebuffer(Zt,le,Wt,Ut,jt,Re,Wt,Ut,q.DEPTH_BUFFER_BIT,q.NEAREST);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else if(ct!==0||A.isRenderTargetTexture||ft.has(A)){const $e=ft.get(A),ii=ft.get(X);E.bindFramebuffer(q.READ_FRAMEBUFFER,H),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,Y);for(let Ne=0;Ne<qt;Ne++)Ee?q.framebufferTextureLayer(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,$e.__webglTexture,ct,pe+Ne):q.framebufferTexture2D(q.READ_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,$e.__webglTexture,ct),Ge?q.framebufferTextureLayer(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,ii.__webglTexture,Bt,be+Ne):q.framebufferTexture2D(q.DRAW_FRAMEBUFFER,q.COLOR_ATTACHMENT0,q.TEXTURE_2D,ii.__webglTexture,Bt),ct!==0?q.blitFramebuffer(Zt,le,Wt,Ut,jt,Re,Wt,Ut,q.COLOR_BUFFER_BIT,q.NEAREST):Ge?q.copyTexSubImage3D(Ft,Bt,jt,Re,be+Ne,Zt,le,Wt,Ut):q.copyTexSubImage2D(Ft,Bt,jt,Re,Zt,le,Wt,Ut);E.bindFramebuffer(q.READ_FRAMEBUFFER,null),E.bindFramebuffer(q.DRAW_FRAMEBUFFER,null)}else Ge?A.isDataTexture||A.isData3DTexture?q.texSubImage3D(Ft,Bt,jt,Re,be,Wt,Ut,qt,ke,xn,Ke.data):X.isCompressedArrayTexture?q.compressedTexSubImage3D(Ft,Bt,jt,Re,be,Wt,Ut,qt,ke,Ke.data):q.texSubImage3D(Ft,Bt,jt,Re,be,Wt,Ut,qt,ke,xn,Ke):A.isDataTexture?q.texSubImage2D(q.TEXTURE_2D,Bt,jt,Re,Wt,Ut,ke,xn,Ke.data):A.isCompressedTexture?q.compressedTexSubImage2D(q.TEXTURE_2D,Bt,jt,Re,Ke.width,Ke.height,ke,Ke.data):q.texSubImage2D(q.TEXTURE_2D,Bt,jt,Re,Wt,Ut,ke,xn,Ke);E.pixelStorei(q.UNPACK_ROW_LENGTH,ln),E.pixelStorei(q.UNPACK_IMAGE_HEIGHT,Pe),E.pixelStorei(q.UNPACK_SKIP_PIXELS,Fn),E.pixelStorei(q.UNPACK_SKIP_ROWS,ni),E.pixelStorei(q.UNPACK_SKIP_IMAGES,Xi),Bt===0&&X.generateMipmaps&&q.generateMipmap(Ft),E.unbindTexture()},this.initRenderTarget=function(A){ft.get(A).__webglFramebuffer===void 0&&gt.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?gt.setTextureCube(A,0):A.isData3DTexture?gt.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?gt.setTexture2DArray(A,0):gt.setTexture2D(A,0),E.unbindTexture()},this.resetState=function(){z=0,k=0,$=null,E.reset(),kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Ie._getDrawingBufferColorSpace(e),i.unpackColorSpace=Ie._getUnpackColorSpace()}}const T_={type:"change"},lm={type:"start"},pS={type:"end"},_u=new Bu,A_=new Ua,QC=Math.cos(70*dE.DEG2RAD),Sn=new st,$n=2*Math.PI,Ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Qh=1e-6;class JC extends JE{constructor(e,i=null){super(e,i),this.state=Ze.NONE,this.target=new st,this.cursor=new st,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:io.ROTATE,MIDDLE:io.DOLLY,RIGHT:io.PAN},this.touches={ONE:eo.ROTATE,TWO:eo.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new st,this._lastQuaternion=new xs,this._lastTargetPosition=new st,this._quat=new xs().setFromUnitVectors(e.up,new st(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new e_,this._sphericalDelta=new e_,this._scale=1,this._panOffset=new st,this._rotateStart=new ue,this._rotateEnd=new ue,this._rotateDelta=new ue,this._panStart=new ue,this._panEnd=new ue,this._panDelta=new ue,this._dollyStart=new ue,this._dollyEnd=new ue,this._dollyDelta=new ue,this._dollyDirection=new st,this._mouse=new ue,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=tw.bind(this),this._onPointerDown=$C.bind(this),this._onPointerUp=ew.bind(this),this._onContextMenu=lw.bind(this),this._onMouseWheel=aw.bind(this),this._onKeyDown=sw.bind(this),this._onTouchStart=rw.bind(this),this._onTouchMove=ow.bind(this),this._onMouseDown=nw.bind(this),this._onMouseMove=iw.bind(this),this._interceptControlDown=cw.bind(this),this._interceptControlUp=uw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ze.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(T_),this.update(),this.state=Ze.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;Sn.copy(i).sub(this.target),Sn.applyQuaternion(this._quat),this._spherical.setFromVector3(Sn),this.autoRotate&&this.state===Ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=$n:s>Math.PI&&(s-=$n),l<-Math.PI?l+=$n:l>Math.PI&&(l-=$n),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=d!=this._spherical.radius}if(Sn.setFromSpherical(this._spherical),Sn.applyQuaternion(this._quatInverse),i.copy(this.target).add(Sn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const h=Sn.length();d=this._clampDistance(h*this._scale);const p=h-d;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const h=new st(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const m=new st(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),d=Sn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(_u.origin.copy(this.object.position),_u.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(_u.direction))<QC?this.object.lookAt(this.target):(A_.setFromNormalAndCoplanarPoint(this.object.up,this.target),_u.intersectPlane(A_,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>Qh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Qh||this._lastTargetPosition.distanceToSquared(this.target)>Qh?(this.dispatchEvent(T_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?$n/60*this.autoRotateSpeed*e:$n/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){Sn.setFromMatrixColumn(i,0),Sn.multiplyScalar(-e),this._panOffset.add(Sn)}_panUp(e,i){this.screenSpacePanning===!0?Sn.setFromMatrixColumn(i,1):(Sn.setFromMatrixColumn(i,0),Sn.crossVectors(this.object.up,Sn)),Sn.multiplyScalar(e),this._panOffset.add(Sn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;Sn.copy(l).sub(this.target);let f=Sn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,f=i-s.top,d=s.width,h=s.height;this._mouse.x=l/d*2-1,this._mouse.y=-(f/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft($n*this._rotateDelta.x/i.clientHeight),this._rotateUp($n*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp($n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-$n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft($n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-$n*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(l,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft($n*this._rotateDelta.x/i.clientHeight),this._rotateUp($n*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(d,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new ue,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function $C(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function tw(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function ew(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(pS),this.state=Ze.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function nw(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case io.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Ze.DOLLY;break;case io.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ze.ROTATE}break;case io.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ze.PAN}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(lm)}function iw(o){switch(this.state){case Ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function aw(o){this.enabled===!1||this.enableZoom===!1||this.state!==Ze.NONE||(o.preventDefault(),this.dispatchEvent(lm),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(pS))}function sw(o){this.enabled!==!1&&this._handleKeyDown(o)}function rw(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case eo.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Ze.TOUCH_ROTATE;break;case eo.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Ze.TOUCH_PAN;break;default:this.state=Ze.NONE}break;case 2:switch(this.touches.TWO){case eo.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Ze.TOUCH_DOLLY_PAN;break;case eo.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Ze.TOUCH_DOLLY_ROTATE;break;default:this.state=Ze.NONE}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(lm)}function ow(o){switch(this._trackPointer(o),this.state){case Ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Ze.NONE}}function lw(o){this.enabled!==!1&&o.preventDefault()}function cw(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function uw(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const fw=({memories:o,status:e,onSelectMemory:i})=>{const s=Rt.useRef(null),[l,f]=Rt.useState("all"),[d,h]=Rt.useState(!0),[p,m]=Rt.useState(null),[_,y]=Rt.useState({x:0,y:0}),[v,b]=Rt.useState([]),R=Rt.useRef(d);R.current=d;const O=Rt.useRef(l);O.current=l;const S=Rt.useRef(null),x=Rt.useRef(null),U=Rt.useRef(null),V=Rt.useRef(null),D=Rt.useRef([]),N=Rt.useRef(null),w=Rt.useMemo(()=>o.filter(L=>l==="rules"?L.kind==="rule":l==="traps"?L.kind==="error_trap":!0),[o,l]);Rt.useEffect(()=>{const L=s.current;if(!L)return;const G=L.clientWidth,Z=L.clientHeight||640,J=new AE;J.background=new Ae(592139),J.fog=new im(592139,.015),S.current=J;const H=new Ci(55,G/Z,.1,300);H.position.set(0,12,34),H.lookAt(0,0,0),x.current=H;const Y=new KC({antialias:!0,alpha:!1,powerPreference:"high-performance"});Y.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Y.setSize(G,Z),Y.toneMapping=jp,Y.toneMappingExposure=1.1,L.appendChild(Y.domElement),U.current=Y;const z=new JC(H,Y.domElement);z.enableDamping=!0,z.dampingFactor=.05,z.autoRotate=!0,z.autoRotateSpeed=.45,z.minDistance=6,z.maxDistance=90,z.maxPolarAngle=Math.PI*.85,V.current=z;const k=new qE(16777215,.7);J.add(k);const $=new Qx(3718648,1.2);$.position.set(10,20,15),J.add($);const j=new Qx(16498468,.8);j.position.set(-15,-10,-10),J.add(j);const at=new QE(60,30,2565930,1579035);at.position.y=-12,at.material.transparent=!0,at.material.opacity=.25,J.add(at);let ot;const zt=()=>{ot=requestAnimationFrame(zt),z.autoRotate=R.current,z.update();const se=L.clientWidth/2,ie=L.clientHeight/2,te=new st,pt=[];D.current.forEach((mt,Ot)=>{(mt.isTrap||Ot<5)&&(te.copy(mt.position),te.project(H),te.z<1&&te.x>=-.9&&te.x<=.9&&te.y>=-.9&&te.y<=.9&&pt.push({id:mt.id,title:mt.memory.title,isTrap:mt.isTrap,x:te.x*se+se,y:-(te.y*ie)+ie,visible:!0}))}),b(pt),Y.render(J,H)};zt();const wt=()=>{if(!L||!Y||!H)return;const se=L.clientWidth,ie=L.clientHeight||640;H.aspect=se/ie,H.updateProjectionMatrix(),Y.setSize(se,ie)};return window.addEventListener("resize",wt),()=>{cancelAnimationFrame(ot),window.removeEventListener("resize",wt),z.dispose(),Y.dispose(),Y.domElement&&L.contains(Y.domElement)&&L.removeChild(Y.domElement)}},[]),Rt.useEffect(()=>{const L=S.current;if(!L)return;D.current.forEach(H=>{L.remove(H.mesh),L.remove(H.halo),H.ring&&L.remove(H.ring),H.mesh.geometry.dispose(),H.halo.geometry.dispose(),H.ring&&H.ring.geometry.dispose()}),D.current=[],N.current&&(L.remove(N.current),N.current.geometry.dispose(),N.current=null);const G=w.length;if(G===0)return;const Z=[];w.forEach((H,Y)=>{const z=H.kind==="error_trap",k=Math.acos(-1+2*Y/Math.max(1,G)),$=Math.sqrt(G*Math.PI)*k,j=z?14+Y%3*2.5:10+Y%4*3,at=j*Math.cos($)*Math.sin(k),ot=z?4+Math.sin($)*3.5:Math.sin(k)*6-2,zt=j*Math.sin($)*Math.sin(k),wt=new st(at,ot,zt),ie=(z?.55:.42)+Math.min(.4,(H.reward_score-1)*.2),te=z?16498468:3718648,pt=z?14251782:165063,mt=new Pu(ie,24,24),Ot=new kE({color:te,emissive:pt,emissiveIntensity:z?.55:.35,roughness:.25,metalness:.1}),$t=new wi(mt,Ot);$t.position.copy(wt),$t.userData={memoryId:H.id,memory:H},L.add($t);const Mt=new Pu(ie*2.2,16,16),Gt=new Uu({color:te,transparent:!0,opacity:z?.14:.08,side:Wn}),ze=new wi(Mt,Gt);ze.position.copy(wt),L.add(ze);let oe;if(z){const ge=new rm(ie*1.5,ie*1.9,32),ve=new Uu({color:16498468,transparent:!0,opacity:.65,side:sa});oe=new wi(ge,ve),oe.position.copy(wt),oe.rotation.x=Math.PI/2,L.add(oe)}Z.push({id:H.id,memory:H,mesh:$t,halo:ze,ring:oe,position:wt,color:z?"#fbbf24":"#38bdf8",isTrap:z,screenPos:{x:0,y:0,visible:!1}})}),D.current=Z;const J=[];for(let H=0;H<Z.length;H++)for(let Y=H+1;Y<Z.length;Y++){const z=Z[H],k=Z[Y],$=z.memory.module.toLowerCase()===k.memory.module.toLowerCase(),j=z.memory.linked_files?.some(ot=>k.memory.linked_files?.includes(ot)),at=z.position.distanceTo(k.position);($||j)&&at<18&&J.push(z.position,k.position)}if(J.length>0){const H=new ti().setFromPoints(J),Y=new sm({color:3718648,transparent:!0,opacity:.12}),z=new $_(H,Y);L.add(z),N.current=z}},[w]);const I=Rt.useCallback(L=>{const G=s.current,Z=x.current;if(!G||!Z)return;const J=G.getBoundingClientRect(),H=(L.clientX-J.left)/J.width*2-1,Y=-((L.clientY-J.top)/J.height)*2+1,z=new $x;z.setFromCamera(new ue(H,Y),Z);const k=D.current.map(j=>j.mesh),$=z.intersectObjects(k);if($.length>0){const j=$[0].object,at=D.current.find(ot=>ot.mesh===j);if(at){m(at),y({x:L.clientX-J.left,y:L.clientY-J.top}),G.style.cursor="pointer";return}}m(null),G.style.cursor="grab"},[]),T=Rt.useCallback(L=>{const G=s.current,Z=x.current;if(!G||!Z)return;const J=G.getBoundingClientRect(),H=(L.clientX-J.left)/J.width*2-1,Y=-((L.clientY-J.top)/J.height)*2+1,z=new $x;z.setFromCamera(new ue(H,Y),Z);const k=D.current.map(j=>j.mesh),$=z.intersectObjects(k);if($.length>0){const j=$[0].object,at=D.current.find(ot=>ot.mesh===j);at&&i(at.memory)}},[i]),P=()=>{!x.current||!V.current||(x.current.position.set(0,12,34),x.current.lookAt(0,0,0),V.current.target.set(0,0,0),V.current.update())};return M.jsxs("div",{style:{position:"relative",width:"100%",height:"640px",background:"#09090b",border:"1px solid var(--border)",borderRadius:"6px",overflow:"hidden"},children:[M.jsx("div",{ref:s,onPointerMove:I,onClick:T,style:{width:"100%",height:"100%",cursor:"grab"}}),M.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"},children:v.map(L=>M.jsxs("div",{onClick:G=>{G.stopPropagation();const Z=o.find(J=>J.id===L.id);Z&&i(Z)},style:{position:"absolute",left:`${L.x}px`,top:`${L.y}px`,transform:"translate(10px, -50%)",pointerEvents:"auto",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",padding:"3px 8px",borderRadius:"12px",background:"rgba(20, 20, 23, 0.85)",border:`1px solid ${L.isTrap?"rgba(251, 191, 36, 0.4)":"rgba(56, 189, 248, 0.3)"}`,backdropFilter:"blur(8px)",fontSize:"11px",fontFamily:"var(--font-mono)",color:L.isTrap?"#fbbf24":"var(--text)",whiteSpace:"nowrap",maxWidth:"220px",overflow:"hidden",textOverflow:"ellipsis",boxShadow:"0 4px 12px rgba(0,0,0,0.5)",transition:"transform 0.1s ease, border-color 0.1s ease"},children:[M.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:L.isTrap?"#fbbf24":"var(--accent)",boxShadow:`0 0 6px ${L.isTrap?"#fbbf24":"var(--accent)"}`}}),M.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:L.title})]},L.id))}),M.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"6px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"10px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{fontSize:"13px"},children:"🌌"}),M.jsx("span",{style:{fontSize:"12px",fontWeight:700,fontFamily:"var(--font-mono)",letterSpacing:"0.04em"},children:"BRAIN OBSERVATORY"})]}),M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[w.length," orbital nodes • ",e?.graphNodesCount??41," knowledge entities"]})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",pointerEvents:"auto"},children:[M.jsxs("div",{style:{display:"flex",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",backdropFilter:"blur(8px)"},children:[M.jsxs("button",{onClick:()=>f("all"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="all"?"var(--accent-weak)":"transparent",color:l==="all"?"var(--accent)":"var(--text-muted)",border:"none"},children:["All (",o.length,")"]}),M.jsxs("button",{onClick:()=>f("rules"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="rules"?"var(--accent-weak)":"transparent",color:l==="rules"?"var(--accent)":"var(--text-muted)",border:"none"},children:["Rules (",o.filter(L=>L.kind==="rule").length,")"]}),M.jsxs("button",{onClick:()=>f("traps"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="traps"?"var(--trap-weak)":"transparent",color:l==="traps"?"var(--trap)":"var(--text-muted)",border:"none"},children:["2.0x Traps (",o.filter(L=>L.kind==="error_trap").length,")"]})]}),M.jsx("button",{onClick:()=>h(L=>!L),className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:d?"Pause rotation":"Resume rotation",children:d?M.jsx(R_,{size:13}):M.jsx(C_,{size:13})}),M.jsx("button",{onClick:P,className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:"Reset 3D camera angle",children:M.jsx(Xp,{size:13})})]})]}),p&&M.jsxs("div",{style:{position:"absolute",left:`${Math.min(_.x+16,1100)}px`,top:`${Math.min(_.y+16,520)}px`,pointerEvents:"none",background:"rgba(20, 20, 23, 0.95)",border:`1px solid ${p.isTrap?"var(--trap)":"var(--accent)"}`,borderRadius:"6px",padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.6)",zIndex:100,maxWidth:"300px",backdropFilter:"blur(12px)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"},children:[M.jsx("span",{className:"badge-tag",style:{background:p.isTrap?"var(--trap-weak)":"var(--accent-weak)",color:p.isTrap?"var(--trap)":"var(--accent)"},children:p.isTrap?"2.0X ERROR TRAP":"VERIFIED RULE"}),M.jsx("span",{style:{fontSize:"10.5px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:p.memory.module})]}),M.jsx("div",{style:{fontSize:"12.5px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:p.memory.title}),M.jsxs("div",{style:{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[M.jsxs("span",{children:["[",p.id,"]"]}),M.jsxs("span",{style:{color:p.isTrap?"var(--trap)":"var(--accent)",fontWeight:600},children:[p.memory.reward_score.toFixed(2),"x boost"]})]})]}),M.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"14px",fontSize:"11px",fontFamily:"var(--font-mono)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#fbbf24",boxShadow:"0 0 6px #fbbf24"}}),M.jsx("span",{style:{color:"#fbbf24"},children:"2.0X ERROR TRAP"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 6px #38bdf8"}}),M.jsx("span",{style:{color:"#38bdf8"},children:"VERIFIED RULE"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"rgba(56, 189, 248, 0.4)"}}),M.jsx("span",{style:{color:"var(--text-faint)"},children:"CONSTELLATION WIRE"})]})]}),M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)",display:"flex",gap:"12px"},children:[M.jsxs("span",{children:["Left-Drag: ",M.jsx("b",{children:"Orbit 3D"})]}),M.jsxs("span",{children:["Right-Drag: ",M.jsx("b",{children:"Pan"})]}),M.jsxs("span",{children:["Scroll: ",M.jsx("b",{children:"Zoom"})]}),M.jsxs("span",{children:["Click Node: ",M.jsx("b",{children:"Inspect Rule"})]})]})]})]})},dw=()=>{const[o,e]=Rt.useState(()=>{try{const et=localStorage.getItem("fastr-theme");return et==="light"||et==="dark"?et:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"dark"}}),[i,s]=Rt.useState("overview"),[l,f]=Rt.useState(!0),[d,h]=Rt.useState(null),[p,m]=Rt.useState([]),[_,y]=Rt.useState([]),[v,b]=Rt.useState([]),[R,O]=Rt.useState([]),[S,x]=Rt.useState(""),[U,V]=Rt.useState("all"),[D,N]=Rt.useState(null),[w,I]=Rt.useState(null),[T,P]=Rt.useState(!1),[L,G]=Rt.useState(null),[Z,J]=Rt.useState(""),[H,Y]=Rt.useState(""),[z,k]=Rt.useState("general"),[$,j]=Rt.useState("rule"),[at,ot]=Rt.useState(""),{pendingAction:zt,countdown:wt,enqueue:se,undo:ie}=_b(),te=Rt.useCallback(async()=>{try{const[et,Tt,fe,_e]=await Promise.all([fetch("/api/status").then(xe=>xe.json()),fetch("/api/memories").then(xe=>xe.json()),fetch("/api/actions").then(xe=>xe.json()),fetch("/api/conflicts").then(xe=>xe.json())]);h(et),m(Tt),y(fe.actions||[]),b(fe.edges||[]),O(_e||[]),f(!1)}catch(et){console.error("Failed to fetch FastrMemory snapshot:",et),f(!1)}},[]);Rt.useEffect(()=>{te()},[te]);const pt=async()=>{try{await fetch("/api/actions/seed",{method:"POST"}),te()}catch(et){console.error("Failed to seed actions:",et)}};Rt.useEffect(()=>{const et=()=>{const Tt=window.location.hash.replace(/^#\/?/,"");["overview","observatory","memories","traps","dag","treemap","rrf","conflicts"].includes(Tt)&&s(Tt)};return et(),window.addEventListener("hashchange",et),()=>window.removeEventListener("hashchange",et)},[]);const mt=et=>{s(et),window.location.hash=`#/${et}`},{status:Ot,lastEventTime:$t}=xb({onEvent:(et,Tt)=>{te(),et==="trap_logged"?G(`⚠️ Active Error Trap Logged: "${Tt?.title||"Unknown Trap"}"`):et==="action_claimed"?G(`⚡ Agent [${Tt?.claimedBy||"agent"}] claimed task: "${Tt?.title||Tt?.actionId}"`):et==="action_completed"&&G(`✅ Action completed: "${Tt?.title||Tt?.actionId}"`)}});Rt.useEffect(()=>{if(!L)return;const et=setTimeout(()=>G(null),4500);return()=>clearTimeout(et)},[L]);const Mt=()=>{const et=o==="dark"?"light":"dark";e(et);try{localStorage.setItem("fastr-theme",et)}catch{}document.documentElement.setAttribute("data-theme",et)};Rt.useEffect(()=>{document.documentElement.setAttribute("data-theme",o)},[o]),Rt.useEffect(()=>{const et=Tt=>{const fe=document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA";Tt.key==="/"&&!fe?(Tt.preventDefault(),document.getElementById("fastr-search-input")?.focus()):Tt.key==="Escape"?(N(null),I(null),P(!1)):fe||(Tt.key==="1"?mt("overview"):Tt.key==="2"||Tt.key.toLowerCase()==="o"?mt("observatory"):Tt.key==="3"?mt("memories"):Tt.key==="4"?mt("traps"):Tt.key==="5"?mt("dag"):Tt.key==="6"?mt("treemap"):Tt.key==="7"?mt("rrf"):Tt.key==="8"?mt("conflicts"):(Tt.key.toLowerCase()==="n"||Tt.key.toLowerCase()==="c")&&P(!0))};return window.addEventListener("keydown",et),()=>window.removeEventListener("keydown",et)},[]);const Gt=(et,Tt,fe)=>{const _e=[...R];O(xe=>xe.filter(q=>q.id!==et)),se(`Resolved conflict #${et} (Kept ${Tt})`,async()=>{await fetch("/api/conflicts/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conflictId:et,keepMemoryId:Tt,forgetLoser:fe,reason:"Resolved via Fastr Dashboard"})}),te()},()=>{O(_e)})},ze=(et,Tt)=>{const fe=Tt?0:1;m(_e=>_e.map(xe=>xe.id===et?{...xe,pinned:fe}:xe)),D&&D.id===et&&N({...D,pinned:fe}),se(`${fe?"Pinned":"Unpinned"} rule ${et}`,async()=>{await fetch("/api/memories/pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:et,pinned:!!fe})}),te()},()=>{m(_e=>_e.map(xe=>xe.id===et?{...xe,pinned:Tt}:xe)),D&&D.id===et&&N({...D,pinned:Tt})})},oe=et=>{const Tt=p.find(fe=>fe.id===et);Tt&&(m(fe=>fe.filter(_e=>_e.id!==et)),N(null),se(`Forgot memory [${et}]`,async()=>{await fetch("/api/memories/forget",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:et,reason:"User requested forget via Fastr Dashboard"})}),te()},()=>{m(fe=>[...fe,Tt])}))},ge=async et=>{if(et.preventDefault(),!(!Z.trim()||!H.trim()))try{(await fetch("/api/memories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:Z.trim(),content:H.trim(),module:z.trim()||"general",kind:$,files:at?at.split(",").map(fe=>fe.trim()).filter(Boolean):[]})})).ok&&(J(""),Y(""),ot(""),P(!1),te())}catch(Tt){console.error("Failed to create memory:",Tt)}},ve=p.filter(et=>{const Tt=U==="all"||et.module.toLowerCase()===U.toLowerCase(),fe=!S||et.title.toLowerCase().includes(S.toLowerCase())||et.content.toLowerCase().includes(S.toLowerCase())||et.id.toLowerCase().includes(S.toLowerCase());return Tt&&fe}),ee=p.filter(et=>et.kind==="error_trap");return M.jsxs("div",{style:{maxWidth:"1440px",margin:"0 auto",padding:"16px 20px",minHeight:"100vh",display:"flex",flexDirection:"column",gap:"16px"},children:[M.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"10px 16px",gap:"16px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[M.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px"},children:"⚡"}),M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{style:{fontSize:"14px",fontWeight:700,letterSpacing:"-0.2px",fontFamily:"var(--font-mono)"},children:["FASTR",M.jsx("span",{style:{color:"var(--accent)"},children:"MEMORY"})]}),M.jsx("span",{className:"badge-tag",style:{background:"var(--accent-weak)",color:"var(--accent)"},children:"NODE 24 WAL"})]}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)",marginTop:"1px"},children:d?.projectId||"loading..."})]})]}),M.jsxs("div",{style:{flex:1,maxWidth:"440px",position:"relative"},children:[M.jsx($h,{size:14,style:{position:"absolute",left:"10px",top:"8px",color:"var(--text-faint)"}}),M.jsx("input",{id:"fastr-search-input",type:"text",value:S,onChange:et=>x(et.target.value),placeholder:"Search rules, error traps, files (Press /)...",style:{width:"100%",padding:"6px 32px 6px 30px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",fontFamily:"var(--font-sans)"}}),M.jsx("kbd",{style:{position:"absolute",right:"8px",top:"6px",fontSize:"10px",fontFamily:"var(--font-mono)",background:"var(--surface)",border:"1px solid var(--border)",padding:"1px 5px",borderRadius:"3px",color:"var(--text-faint)"},children:"/"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("button",{onClick:()=>P(!0),className:"btn btn-primary",title:"Create new rule or error trap (Hotkey: N)",children:[M.jsx(ab,{size:13})," New Rule"]}),M.jsxs("div",{title:`Real-Time SSE: ${Ot} (Last event: ${$t||"none"})`,style:{display:"flex",alignItems:"center",gap:"6px",padding:"4px 9px",borderRadius:"4px",background:Ot==="live"?"var(--success-weak)":"var(--risk-weak)",border:`1px solid ${Ot==="live"?"rgba(52, 211, 153, 0.3)":"rgba(244, 63, 94, 0.3)"}`,color:Ot==="live"?"var(--success)":"var(--risk)",fontSize:"11px",fontWeight:600,fontFamily:"var(--font-mono)"},children:[M.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:Ot==="live"?"var(--success)":"var(--risk)"}}),M.jsx("span",{children:Ot==="live"?"LIVE SSE":"OFFLINE"})]}),M.jsx("button",{onClick:Mt,className:"btn",style:{padding:"5px 8px"},title:"Toggle light/dark theme",children:o==="dark"?M.jsx(sb,{size:13}):M.jsx(rb,{size:13})}),M.jsx("button",{onClick:te,className:"btn",style:{padding:"5px 8px"},title:"Refresh snapshot",children:M.jsx(ob,{size:13})})]})]}),M.jsxs("section",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"10px"},children:[M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"ACTIVE RULES"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.activeCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"2.0X ERROR TRAPS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--trap)",marginTop:"2px"},children:l?"—":d?.trapsCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"FRONTIER TASKS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--accent)",marginTop:"2px"},children:l?"—":d?.frontierCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"KNOWLEDGE NODES"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.graphNodesCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"CONTRADICTIONS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:(d?.conflictsCount??0)>0?"var(--risk)":"var(--text)",marginTop:"2px"},children:l?"—":d?.conflictsCount??0})]})]}),M.jsx("nav",{style:{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",overflowX:"auto"},children:[{id:"overview",label:"OVERVIEW",count:null},{id:"observatory",label:"3D OBSERVATORY",count:p.length},{id:"memories",label:"RULES & TRAPS",count:p.length},{id:"traps",label:"2.0X TRAPS",count:ee.length},{id:"dag",label:"ACTION DAG",count:_.length},{id:"treemap",label:"TREEMAP",count:null},{id:"rrf",label:"RRF TRACE",count:null},{id:"conflicts",label:"CONTRADICTIONS",count:R.length}].map(et=>{const Tt=i===et.id;return M.jsxs("button",{onClick:()=>mt(et.id),style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:600,letterSpacing:"0.04em",fontFamily:"var(--font-mono)",border:"none",background:Tt?"var(--accent-weak)":"transparent",color:Tt?"var(--accent)":"var(--text-muted)",cursor:"pointer",transition:"all 0.1s ease",whiteSpace:"nowrap"},children:[M.jsx("span",{children:et.label}),et.count!==null&&M.jsx("span",{style:{fontSize:"10px",padding:"1px 5px",borderRadius:"3px",background:Tt?"var(--accent)":"var(--bg-subtle)",color:Tt?"#fff":"var(--text-faint)"},children:et.count})]},et.id)})}),M.jsx("main",{style:{minHeight:"440px"},children:l?M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px"},children:[M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}})]}):M.jsxs(M.Fragment,{children:[i==="overview"&&M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[M.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[M.jsx("h2",{style:{fontSize:"16px",fontWeight:700,marginBottom:"6px"},children:"Sovereign Cognitive Agent Memory Engine"}),M.jsxs("p",{style:{color:"var(--text-muted)",fontSize:"13px",lineHeight:"1.5",marginBottom:"16px"},children:["FastrMemory operates inside Node 24 with ",M.jsx("b",{children:"zero external background daemons"}),". Rules, bug-fix traps, and architectural decisions are persisted via SQLite WAL mode, mirrored to ",M.jsx("code",{children:".fastr/pages/*.md"})," for Git pull requests, and fused via Triple-Stream RRF ($k=60$)."]}),M.jsxs("div",{style:{display:"flex",gap:"10px"},children:[M.jsx("button",{onClick:()=>mt("observatory"),className:"btn btn-primary",children:"🔭 3D Brain Observatory →"}),M.jsx("button",{onClick:()=>mt("traps"),className:"btn",children:"Inspect 2.0x Error Traps →"}),M.jsx("button",{onClick:()=>mt("dag"),className:"btn",children:"Open Action DAG →"})]})]}),M.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[M.jsx("h3",{style:{fontSize:"13px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.04em",marginBottom:"12px"},children:"CLI Shortcuts"}),M.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory status"}),M.jsx(pi,{text:"fastrmemory status"})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory bench"}),M.jsx(pi,{text:"fastrmemory bench"})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory sync"}),M.jsx(pi,{text:"fastrmemory sync"})]})]})]})]}),i==="observatory"&&M.jsx(fw,{memories:p,status:d,onSelectMemory:et=>N(et)}),i==="memories"&&M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"12px",alignItems:"center",flexWrap:"wrap"},children:[M.jsxs("div",{style:{display:"flex",gap:"4px",overflowX:"auto"},children:[M.jsxs("button",{onClick:()=>V("all"),className:`btn ${U==="all"?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:["All Modules (",p.length,")"]}),(d?.modules||[]).map(et=>M.jsx("button",{onClick:()=>V(et),className:`btn ${U===et?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:et},et))]}),M.jsxs("div",{style:{marginLeft:"auto",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:["Showing ",ve.length," item(s) • Click row to inspect"]})]}),ve.length===0?M.jsxs("div",{className:"card-panel",style:{padding:"48px 24px",textAlign:"center",color:"var(--text-muted)"},children:[M.jsx("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text)"},children:"No memories match criteria"}),M.jsx("p",{style:{fontSize:"12px",marginTop:"4px"},children:"Adjust search query or select another module."})]}):M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[M.jsx("div",{children:"ID"}),M.jsx("div",{children:"KIND"}),M.jsx("div",{children:"MODULE"}),M.jsx("div",{children:"TITLE"}),M.jsx("div",{children:"PROVENANCE"}),M.jsx("div",{children:"REWARD"}),M.jsx("div",{style:{textAlign:"right"},children:"PIN"})]}),M.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:ve.map(et=>{const Tt=D?.id===et.id;return M.jsxs("div",{onClick:()=>N(et),className:`instrument-row ${Tt?"active":""}`,style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:et.id,children:et.id}),M.jsx("div",{children:M.jsx("span",{className:"badge-tag",style:{background:et.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:et.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:et.kind==="error_trap"?"TRAP":et.kind.toUpperCase()})}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",fontSize:"11.5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:et.module,children:et.module}),M.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:et.title,children:et.title}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[et.provenance_hash?M.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},children:["🔒 prov_",et.provenance_hash.slice(0,6)]}):M.jsx("span",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"legacy"}),M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:["@",et.agent_id||"default"]})]}),M.jsxs("div",{style:{fontFamily:"var(--font-mono)",color:"var(--accent)",fontSize:"11.5px"},children:[et.reward_score.toFixed(2),"x"]}),M.jsx("div",{style:{textAlign:"right"},children:M.jsx("button",{onClick:fe=>{fe.stopPropagation(),ze(et.id,et.pinned)},className:"btn",style:{padding:"2px 6px",fontSize:"10px"},title:et.pinned?"Unpin":"Pin",children:M.jsx(D_,{size:11,color:et.pinned?"#8b5cf6":"var(--text-muted)"})})})]},et.id)})})]})]}),i==="traps"&&M.jsxs("div",{children:[M.jsxs("div",{style:{padding:"10px 14px",background:"var(--trap-weak)",border:"1px solid rgba(217, 119, 6, 0.3)",borderRadius:"6px",color:"var(--trap)",fontSize:"12px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(w_,{size:15}),M.jsxs("span",{children:["Error traps receive an automatic ",M.jsx("b",{children:"2.0x recall boost"})," to proactively prevent AI agents from repeating known bugs."]})]}),M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[M.jsx("div",{children:"TRAP ID"}),M.jsx("div",{children:"MODULE"}),M.jsx("div",{children:"WARNING HEADLINE"}),M.jsx("div",{children:"LINKED FILES"}),M.jsx("div",{style:{textAlign:"right"},children:"RECALL BOOST"})]}),M.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:ee.map(et=>M.jsxs("div",{onClick:()=>N(et),className:"instrument-row",style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--trap)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:et.id,children:et.id}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:et.module,children:et.module}),M.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:et.title,children:et.title}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},title:et.linked_files&&et.linked_files.length>0?et.linked_files.join(", "):"project-wide",children:et.linked_files&&et.linked_files.length>0?et.linked_files.join(", "):"project-wide"}),M.jsx("div",{style:{textAlign:"right",fontFamily:"var(--font-mono)",color:"var(--trap)",fontWeight:600},children:"2.0x BOOST"})]},et.id))})]})]}),i==="dag"&&M.jsx(yb,{actions:_,edges:v,onSelectAction:et=>I(et),onSeed:pt}),i==="treemap"&&M.jsx(Mb,{memories:p,onSelectMemory:et=>N(et)}),i==="rrf"&&M.jsx(bb,{memories:p}),i==="conflicts"&&M.jsxs("div",{children:[M.jsx("div",{style:{marginBottom:"12px",color:"var(--text-muted)",fontSize:"12px"},children:"Contradictions detected between active memories. Use 1-click resolution with optimistic 6-second rollback window."}),R.length===0?M.jsx("div",{className:"card-panel",style:{padding:"36px",textAlign:"center",color:"var(--success)"},children:"✨ Zero open contradictions detected. Knowledge base is 100% consistent!"}):R.map(et=>M.jsx(Eb,{conflict:et,memoryA:p.find(Tt=>Tt.id===et.memory_a_id),memoryB:p.find(Tt=>Tt.id===et.memory_b_id),onResolve:Gt},et.id))]})]})}),L&&M.jsxs("div",{className:"floating-alert",children:[M.jsx("span",{children:L}),M.jsx("button",{onClick:()=>G(null),style:{background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)"},children:"✕"})]}),M.jsx(Ab,{memory:D,onClose:()=>N(null),onTogglePin:ze,onForget:oe}),w&&M.jsx("div",{onClick:()=>I(null),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:M.jsxs("div",{onClick:et=>et.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"540px",padding:"20px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[M.jsxs("div",{children:[M.jsxs("span",{style:{fontSize:"11px",color:"var(--accent)",fontFamily:"var(--font-mono)"},children:["[",w.id,"] • P",w.priority]}),M.jsx("h3",{style:{fontSize:"15px",fontWeight:600,marginTop:"4px"},children:w.title})]}),M.jsx("button",{onClick:()=>I(null),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),M.jsx("div",{style:{marginTop:"14px",fontSize:"12.5px",lineHeight:"1.5",color:"var(--text-muted)"},children:w.description||"No detailed task description provided."}),M.jsxs("div",{style:{marginTop:"18px",borderTop:"1px solid var(--border)",paddingTop:"10px",display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:"var(--text-muted)"},children:[M.jsxs("span",{children:["Status: ",M.jsx("b",{style:{textTransform:"capitalize"},children:w.status})]}),M.jsxs("span",{children:["Assignee: ",M.jsx("b",{children:w.assigned_to||"Unassigned (Open)"})]})]})]})}),T&&M.jsx("div",{onClick:()=>P(!1),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:M.jsxs("form",{onSubmit:ge,onClick:et=>et.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"520px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsx("h3",{style:{fontSize:"15px",fontWeight:600},children:"Record Memory / Error Trap"}),M.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Title"}),M.jsx("input",{type:"text",required:!0,value:Z,onChange:et=>J(et.target.value),placeholder:"e.g. Always Use BigEndian for Binary Protocol",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Rule Content"}),M.jsx("textarea",{required:!0,rows:4,value:H,onChange:et=>Y(et.target.value),placeholder:"Explain the pattern, gotcha, or fix in detail...",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",resize:"vertical"}})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"},children:[M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Module"}),M.jsx("input",{type:"text",value:z,onChange:et=>k(et.target.value),placeholder:"e.g. auth, api, db",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Type"}),M.jsxs("select",{value:$,onChange:et=>j(et.target.value),style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"},children:[M.jsx("option",{value:"rule",children:"Rule (Verified)"}),M.jsx("option",{value:"error_trap",children:"Error Trap [2.0x Boost]"})]})]})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Linked Files (comma separated)"}),M.jsx("input",{type:"text",value:at,onChange:et=>ot(et.target.value),placeholder:"src/auth.ts, src/server.ts",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"6px"},children:[M.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",children:"Cancel"}),M.jsx("button",{type:"submit",className:"btn btn-primary",children:"Save Memory"})]})]})}),M.jsx(Sb,{pendingAction:zt,countdown:wt,onUndo:ie})]})};vb.createRoot(document.getElementById("root")).render(M.jsx(lb.StrictMode,{children:M.jsx(dw,{})}));
