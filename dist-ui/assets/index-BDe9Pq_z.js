import{r as tb,g as eb,a as Ct,R as qp,S as mv,P as U_,b as L_,Z as nb,c as ib,C as tp,d as ab,L as gv,T as sb,A as rb,e as ep,f as ob,N as lb,h as O_,i as P_,j as cb,k as ub,l as fb,M as db,m as hb,n as pb}from"./lucide-3M5W1ITJ.js";import{r as mb}from"./react-DJFk45sp.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const d of f.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(l){if(l.ep)return;l.ep=!0;const f=i(l);fetch(l.href,f)}})();var gh={exports:{}},sl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var xv;function gb(){if(xv)return sl;xv=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,f){var d=null;if(f!==void 0&&(d=""+f),l.key!==void 0&&(d=""+l.key),"key"in l){f={};for(var h in l)h!=="key"&&(f[h]=l[h])}else f=l;return l=f.ref,{$$typeof:o,type:s,key:d,ref:l!==void 0?l:null,props:f}}return sl.Fragment=e,sl.jsx=i,sl.jsxs=i,sl}var vv;function xb(){return vv||(vv=1,gh.exports=gb()),gh.exports}var M=xb(),xh={exports:{}},rl={},vh={exports:{}},_h={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _v;function vb(){return _v||(_v=1,(function(o){function e(B,F){var Z=B.length;B.push(F);t:for(;0<Z;){var G=Z-1>>>1,at=B[G];if(0<l(at,F))B[G]=F,B[Z]=at,Z=G;else break t}}function i(B){return B.length===0?null:B[0]}function s(B){if(B.length===0)return null;var F=B[0],Z=B.pop();if(Z!==F){B[0]=Z;t:for(var G=0,at=B.length,rt=at>>>1;G<rt;){var Rt=2*(G+1)-1,Et=B[Rt],ae=Rt+1,ce=B[ae];if(0>l(Et,Z))ae<at&&0>l(ce,Et)?(B[G]=ce,B[ae]=Z,G=ae):(B[G]=Et,B[Rt]=Z,G=Rt);else if(ae<at&&0>l(ce,Z))B[G]=ce,B[ae]=Z,G=ae;else break t}}return F}function l(B,F){var Z=B.sortIndex-F.sortIndex;return Z!==0?Z:B.id-F.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var d=Date,h=d.now();o.unstable_now=function(){return d.now()-h}}var p=[],m=[],_=1,S=null,x=3,b=!1,T=!1,L=!1,y=!1,v=typeof setTimeout=="function"?setTimeout:null,U=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function D(B){for(var F=i(m);F!==null;){if(F.callback===null)s(m);else if(F.startTime<=B)s(m),F.sortIndex=F.expirationTime,e(p,F);else break;F=i(m)}}function N(B){if(L=!1,D(B),!T)if(i(p)!==null)T=!0,w||(w=!0,et());else{var F=i(m);F!==null&&Q(N,F.startTime-B)}}var w=!1,O=-1,A=5,P=-1;function I(){return y?!0:!(o.unstable_now()-P<A)}function X(){if(y=!1,w){var B=o.unstable_now();P=B;var F=!0;try{t:{T=!1,L&&(L=!1,U(O),O=-1),b=!0;var Z=x;try{e:{for(D(B),S=i(p);S!==null&&!(S.expirationTime>B&&I());){var G=S.callback;if(typeof G=="function"){S.callback=null,x=S.priorityLevel;var at=G(S.expirationTime<=B);if(B=o.unstable_now(),typeof at=="function"){S.callback=at,D(B),F=!0;break e}S===i(p)&&s(p),D(B)}else s(p);S=i(p)}if(S!==null)F=!0;else{var rt=i(m);rt!==null&&Q(N,rt.startTime-B),F=!1}}break t}finally{S=null,x=Z,b=!1}F=void 0}}finally{F?et():w=!1}}}var et;if(typeof V=="function")et=function(){V(X)};else if(typeof MessageChannel<"u"){var Y=new MessageChannel,j=Y.port2;Y.port1.onmessage=X,et=function(){j.postMessage(null)}}else et=function(){v(X,0)};function Q(B,F){O=v(function(){B(o.unstable_now())},F)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(B){B.callback=null},o.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<B?Math.floor(1e3/B):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(B){switch(x){case 1:case 2:case 3:var F=3;break;default:F=x}var Z=x;x=F;try{return B()}finally{x=Z}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(B,F){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var Z=x;x=B;try{return F()}finally{x=Z}},o.unstable_scheduleCallback=function(B,F,Z){var G=o.unstable_now();switch(typeof Z=="object"&&Z!==null?(Z=Z.delay,Z=typeof Z=="number"&&0<Z?G+Z:G):Z=G,B){case 1:var at=-1;break;case 2:at=250;break;case 5:at=1073741823;break;case 4:at=1e4;break;default:at=5e3}return at=Z+at,B={id:_++,callback:F,priorityLevel:B,startTime:Z,expirationTime:at,sortIndex:-1},Z>G?(B.sortIndex=Z,e(m,B),i(p)===null&&B===i(m)&&(L?(U(O),O=-1):L=!0,Q(N,Z-G))):(B.sortIndex=at,e(p,B),T||b||(T=!0,w||(w=!0,et()))),B},o.unstable_shouldYield=I,o.unstable_wrapCallback=function(B){var F=x;return function(){var Z=x;x=F;try{return B.apply(this,arguments)}finally{x=Z}}}})(_h)),_h}var yv;function _b(){return yv||(yv=1,vh.exports=vb()),vh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function yb(){if(Sv)return rl;Sv=1;var o=_b(),e=tb(),i=mb();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var c=a.return;if(c===null)break;var u=c.alternate;if(u===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===u.child){for(u=c.child;u;){if(u===a)return p(c),t;if(u===r)return p(c),n;u=u.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=u;else{for(var g=!1,C=c.child;C;){if(C===a){g=!0,a=c,r=u;break}if(C===r){g=!0,r=c,a=u;break}C=C.sibling}if(!g){for(C=u.child;C;){if(C===a){g=!0,a=u,r=c;break}if(C===r){g=!0,r=u,a=c;break}C=C.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}function S(t,n,a,r,c,u){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,c,u)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&S(t.child,n,a,r,c,u))return!0;t=t.sibling}return!1}function x(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function b(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function T(t){var n=[null,null],a=x(t);return a===null||L(n,t,a.child,{foundSelf:!1}),n}function L(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&L(t,n,a.child,r))return!0;a=a.sibling}return!1}function y(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var v=null,U=null;function V(t,n,a){return t===a?!0:t===n?(v=t,!0):!1}function D(t,n,a){return t===a?(U=t,!1):t===n?(U!==null&&(v=t),!0):!1}function N(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function w(t,n,a){for(var r=0,c=t;c;c=a(c))r++;c=0;for(var u=n;u;u=a(u))c++;for(;0<r-c;)t=a(t),r--;for(;0<c-r;)n=a(n),c--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var O=Object.assign,A=Symbol.for("react.element"),P=Symbol.for("react.transitional.element"),I=Symbol.for("react.portal"),X=Symbol.for("react.fragment"),et=Symbol.for("react.strict_mode"),Y=Symbol.for("react.profiler"),j=Symbol.for("react.consumer"),Q=Symbol.for("react.context"),B=Symbol.for("react.forward_ref"),F=Symbol.for("react.suspense"),Z=Symbol.for("react.suspense_list"),G=Symbol.for("react.memo"),at=Symbol.for("react.lazy"),rt=Symbol.for("react.activity"),Rt=Symbol.for("react.legacy_hidden"),Et=Symbol.for("react.memo_cache_sentinel"),ae=Symbol.for("react.view_transition"),ce=Symbol.for("react.recoverable"),he=Symbol.iterator;function pt(t){return t===null||typeof t!="object"?null:(t=he&&t[he]||t["@@iterator"],typeof t=="function"?t:null)}var vt=Symbol.for("react.client.reference");function Dt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===vt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case X:return"Fragment";case Y:return"Profiler";case et:return"StrictMode";case F:return"Suspense";case Z:return"SuspenseList";case rt:return"Activity";case ae:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case I:return"Portal";case Q:return t.displayName||"Context";case j:return(t._context.displayName||"Context")+".Consumer";case B:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case G:return n=t.displayName||null,n!==null?n:Dt(t.type)||"Memo";case at:n=t._payload,t=t._init;try{return Dt(t(n))}catch{}}return null}var te=Array.isArray,gt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Tt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Me={pending:!1,data:null,method:null,action:null},ie=[],pe=-1;function oe(t){return{current:t}}function Zt(t){0>pe||(t.current=ie[pe],ie[pe]=null,pe--)}function ne(t,n){pe++,ie[pe]=t.current,t.current=n}var Ue=oe(null),sn=oe(null),ot=oe(null),wt=oe(null);function k(t,n){switch(ne(ot,n),ne(sn,t),ne(Ue,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Ex(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Ex(n),t=Tx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Zt(Ue),ne(Ue,t)}function _e(){Zt(Ue),Zt(sn),Zt(ot)}function se(t){var n=t.memoizedState;n!==null&&(Fr._currentValue=n.memoizedState,ne(wt,t)),n=Ue.current;var a=Tx(n,t.type);n!==a&&(ne(sn,t),ne(Ue,a))}function z(t){sn.current===t&&(Zt(Ue),Zt(sn)),wt.current===t&&(Zt(wt),Fr._currentValue=Me)}var E,it;function ft(t){if(E===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);E=n&&n[1]||"",it=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+E+t+it}var mt=!1;function At(t,n){if(!t||mt)return"";mt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(It){var J=It}Reflect.construct(t,[],yt)}else{try{yt.call()}catch(It){J=It}yt=!1;try{var ut=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),yt=!0,new t}finally{yt&&(ut!==void 0?Object.defineProperty(t.prototype,"props",ut):delete t.prototype.props)}}}else{try{throw Error()}catch(It){J=It}(yt=t())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(It){if(It&&J&&typeof It.stack=="string")return[It.stack,J.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=r.DetermineComponentFrameRoot(),g=u[0],C=u[1];if(g&&C){var H=g.split(`
`),tt=C.split(`
`);for(c=r=0;r<H.length&&!H[r].includes("DetermineComponentFrameRoot");)r++;for(;c<tt.length&&!tt[c].includes("DetermineComponentFrameRoot");)c++;if(r===H.length||c===tt.length)for(r=H.length-1,c=tt.length-1;1<=r&&0<=c&&H[r]!==tt[c];)c--;for(;1<=r&&0<=c;r--,c--)if(H[r]!==tt[c]){if(r!==1||c!==1)do if(r--,c--,0>c||H[r]!==tt[c]){var dt=`
`+H[r].replace(" at new "," at ");return t.displayName&&dt.includes("<anonymous>")&&(dt=dt.replace("<anonymous>",t.displayName)),dt}while(1<=r&&0<=c);break}}}finally{mt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?ft(a):""}function Lt(t,n){switch(t.tag){case 26:case 27:case 5:return ft(t.type);case 16:return ft("Lazy");case 13:return t.child!==n&&n!==null?ft("Suspense Fallback"):ft("Suspense");case 19:return ft("SuspenseList");case 0:case 15:return At(t.type,!1);case 11:return At(t.type.render,!1);case 1:return At(t.type,!0);case 31:return ft("Activity");case 30:return ft("ViewTransition");default:return""}}function xt(t){try{var n="",a=null;do n+=Lt(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Mt=Object.prototype.hasOwnProperty,Ut=o.unstable_scheduleCallback,$t=o.unstable_cancelCallback,Bt=o.unstable_shouldYield,zt=o.unstable_requestPaint,Xt=o.unstable_now,re=o.unstable_getCurrentPriorityLevel,me=o.unstable_ImmediatePriority,K=o.unstable_UserBlockingPriority,Nt=o.unstable_NormalPriority,St=o.unstable_LowPriority,Ot=o.unstable_IdlePriority,kt=o.log,bt=o.unstable_setDisableYieldValue,Jt=null,Vt=null;function Ie(t){if(typeof kt=="function"&&bt(t),Vt&&typeof Vt.setStrictMode=="function")try{Vt.setStrictMode(Jt,t)}catch{}}var ge=Math.clz32?Math.clz32:Xu,ei=Math.log,mi=Math.LN2;function Xu(t){return t>>>=0,t===0?32:31-(ei(t)/mi|0)|0}var er=256,Ss=262144,Ba=4194304;function ha(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ms(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var c=0,u=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var C=r&134217727;return C!==0?(r=C&~u,r!==0?c=ha(r):(g&=C,g!==0?c=ha(g):a||(a=C&~t,a!==0&&(c=ha(a))))):(C=r&~u,C!==0?c=ha(C):g!==0?c=ha(g):a||(a=r&~t,a!==0&&(c=ha(a)))),c===0?0:n!==0&&n!==c&&(n&u)===0&&(u=c&-c,a=n&-n,u>=a||u===32&&(a&4194048)!==0)?n:c}function Fa(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function Vi(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-ge(a),c=1<<r;n|=t[r],a&=~c}return n}function uo(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fo(){var t=Ba;return Ba<<=1,(Ba&62914560)===0&&(Ba=4194304),t}function nr(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function ki(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Cl(t,n,a,r,c,u){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,H=t.expirationTimes,tt=t.hiddenUpdates;for(a=g&~a;0<a;){var dt=31-ge(a),yt=1<<dt;C[dt]=0,H[dt]=-1;var J=tt[dt];if(J!==null)for(tt[dt]=null,dt=0;dt<J.length;dt++){var ut=J[dt];ut!==null&&(ut.lane&=-536870913)}a&=~yt}r!==0&&bs(t,r,0),u!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=u&~(g&~n))}function bs(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-ge(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function ho(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-ge(a),c=1<<r;c&n|t[r]&n&&(t[r]|=n),a&=~c}}function po(t,n){var a=n&-n;return a=(a&42)!==0?1:mo(a),(a&(t.suspendedLanes|n))!==0?0:a}function mo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function go(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function wl(){var t=Tt.p;return t!==0?t:(t=window.event,t===void 0?32:lv(t.type))}function Dl(t,n){var a=Tt.p;try{return Tt.p=t,n()}finally{Tt.p=a}}var gi=Math.random().toString(36).slice(2),R="__reactFiber$"+gi,W="__reactProps$"+gi,ht="__reactContainer$"+gi,lt="__reactEvents$"+gi,ct="__reactListeners$"+gi,Ft="__reactHandles$"+gi,Wt="__reactResources$"+gi,Pt="__reactMarker$"+gi,Yt="__reactLoad$"+gi;function Kt(t){delete t[R],delete t[W],delete t[ct],delete t[Ft]}function ue(t){var n;if(n=t[R])return n;for(var a=t.parentNode;a;){if(n=a[ht]||a[R]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Vx(t);t!==null;){if(a=t[R])return a;t=Vx(t)}return n}t=a,a=t.parentNode}return null}function xe(t){if(t=t[R]||t[ht]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function jt(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ce(t){var n=t[Wt];return n||(n=t[Wt]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ee(t){t[Pt]=!0}function Ke(t){t[Yt]=void 0}var ke=new Set,vn={};function Ht(t,n){ln(t,n),ln(t+"Capture",n)}function ln(t,n){for(vn[t]=n,t=0;t<n.length;t++)ke.add(n[t])}var ze=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Hn={},ni={};function Xi(t){return Mt.call(ni,t)?!0:Mt.call(Hn,t)?!1:ze.test(t)?ni[t]=!0:(Hn[t]=!0,!1)}var Te=!1;function Ge(){var t=Te;return Te=!1,t}function $e(t,n,a){if(Xi(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function ii(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function Le(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function cn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pa(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Nl(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,u=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(g){a=""+g,u.call(this,g)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Wu(t){if(!t._valueTracker){var n=pa(t)?"checked":"value";t._valueTracker=Nl(t,n,""+t[n])}}function dm(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=pa(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var Sy=/[\n"\\]/g;function xi(t){return t.replace(Sy,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function ju(t,n,a,r,c,u,g,C){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+cn(n)):t.value!==""+cn(n)&&(t.value=""+cn(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?g==="number"&&t.value==n?qu(t,cn(t.value)):qu(t,cn(n)):a!=null?qu(t,cn(a)):r!=null&&t.removeAttribute("value"),c==null&&u!=null&&(t.defaultChecked=!!u),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+cn(C):t.removeAttribute("name")}function hm(t,n,a,r,c,u,g,C){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.type=u),n!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||n!=null)){Wu(t);return}a=a!=null?""+cn(a):"",n=n!=null?""+cn(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=C?t.checked:!!r,t.defaultChecked=!!r,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),Wu(t)}function qu(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function ir(t,n,a,r){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&r&&(t[a].defaultSelected=!0)}else{for(a=""+cn(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,r&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function pm(t,n,a){if(n!=null&&(n=""+cn(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+cn(a):""}function mm(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(te(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=cn(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),Wu(t)}function ar(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var My=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function gm(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||My.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function xm(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",Te=!0);for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&(gm(t,c,r),Te=!0)}else for(var u in n)n.hasOwnProperty(u)&&gm(t,u,n[u])}function Yu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var by=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ey=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ul(t){return Ey.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Wi(){}var Zu=null;function Ku(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var sr=null,rr=null;function vm(t){var n=xe(t);if(n&&(t=n.stateNode)){var a=t[W]||null;t:switch(t=n.stateNode,n.type){case"input":if(ju(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+xi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var c=r[W]||null;if(!c)throw Error(s(90));ju(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&dm(r)}break t;case"textarea":pm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&ir(t,!!a.multiple,n,!1)}}}var Qu=!1;function _m(t,n,a){if(Qu)return t(n,a);Qu=!0;try{var r=t(n);return r}finally{if(Qu=!1,(sr!==null||rr!==null)&&(Uc(),sr&&(n=sr,t=rr,rr=sr=null,vm(n),t)))for(n=0;n<t.length;n++)vm(t[n])}}function xo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[W]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ma=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ju=!1;if(ma)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){Ju=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{Ju=!1}var Ha=null,$u=null,Ll=null;function ym(){if(Ll)return Ll;var t,n=$u,a=n.length,r,c="value"in Ha?Ha.value:Ha.textContent,u=c.length;for(t=0;t<a&&n[t]===c[t];t++);var g=a-t;for(r=1;r<=g&&n[a-r]===c[u-r];r++);return Ll=c.slice(t,1<r?1-r:void 0)}function Ol(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Pl(){return!0}function Sm(){return!1}function Gn(t){function n(a,r,c,u,g){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=u,this.target=g,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(u):u[C]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Pl:Sm,this.isPropagationStopped=Sm,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Pl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Pl)},persist:function(){},isPersistent:Pl}),n}var Ga={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Il=Gn(Ga),_o=O({},Ga,{view:0,detail:0}),Ty=Gn(_o),tf,ef,yo,zl=O({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:af,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==yo&&(yo&&t.type==="mousemove"?(tf=t.screenX-yo.screenX,ef=t.screenY-yo.screenY):ef=tf=0,yo=t),tf)},movementY:function(t){return"movementY"in t?t.movementY:ef}}),Mm=Gn(zl),Ay=O({},zl,{dataTransfer:0}),Ry=Gn(Ay),Cy=O({},_o,{relatedTarget:0}),nf=Gn(Cy),wy=O({},Ga,{animationName:0,elapsedTime:0,pseudoElement:0}),Dy=Gn(wy),Ny=O({},Ga,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Uy=Gn(Ny),Ly=O({},Ga,{data:0}),bm=Gn(Ly),Oy={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Py={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Iy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function zy(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=Iy[t])?!!n[t]:!1}function af(){return zy}var By=O({},_o,{key:function(t){if(t.key){var n=Oy[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Ol(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Py[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:af,charCode:function(t){return t.type==="keypress"?Ol(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Ol(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Fy=Gn(By),Hy=O({},zl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Em=Gn(Hy),Gy=O({},Ga,{submitter:0}),Vy=Gn(Gy),ky=O({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:af}),Xy=Gn(ky),Wy=O({},Ga,{propertyName:0,elapsedTime:0,pseudoElement:0}),jy=Gn(Wy),qy=O({},zl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Yy=Gn(qy),Zy=O({},Ga,{newState:0,oldState:0,source:0}),Ky=Gn(Zy),Qy=[9,13,27,32],sf=ma&&"CompositionEvent"in window,So=null;ma&&"documentMode"in document&&(So=document.documentMode);var Jy=ma&&"TextEvent"in window&&!So,Tm=ma&&(!sf||So&&8<So&&11>=So),Am=" ",Rm=!1;function Cm(t,n){switch(t){case"keyup":return Qy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function wm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var or=!1;function $y(t,n){switch(t){case"compositionend":return wm(n);case"keypress":return n.which!==32?null:(Rm=!0,Am);case"textInput":return t=n.data,t===Am&&Rm?null:t;default:return null}}function tS(t,n){if(or)return t==="compositionend"||!sf&&Cm(t,n)?(t=ym(),Ll=$u=Ha=null,or=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Tm&&n.locale!=="ko"?null:n.data;default:return null}}var eS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Dm(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!eS[t.type]:n==="textarea"}function Nm(t,n,a,r){sr?rr?rr.push(r):rr=[r]:sr=r,n=Bc(n,"onChange"),0<n.length&&(a=new Il("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Mo=null,bo=null;function nS(t){vx(t,0)}function Bl(t){var n=jt(t);if(dm(n))return t}function Um(t,n){if(t==="change")return n}var Lm=!1;if(ma){var rf;if(ma){var of="oninput"in document;if(!of){var Om=document.createElement("div");Om.setAttribute("oninput","return;"),of=typeof Om.oninput=="function"}rf=of}else rf=!1;Lm=rf&&(!document.documentMode||9<document.documentMode)}function Pm(){Mo&&(Mo.detachEvent("onpropertychange",Im),bo=Mo=null)}function Im(t){if(t.propertyName==="value"&&Bl(bo)){var n=[];Nm(n,bo,t,Ku(t)),_m(nS,n)}}function iS(t,n,a){t==="focusin"?(Pm(),Mo=n,bo=a,Mo.attachEvent("onpropertychange",Im)):t==="focusout"&&Pm()}function aS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Bl(bo)}function sS(t,n){if(t==="click")return Bl(n)}function rS(t,n){if(t==="input"||t==="change")return Bl(n)}function oS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:oS;function Eo(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!Mt.call(n,c)||!ai(t[c],n[c]))return!1}return!0}function lf(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function zm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Bm(t,n){var a=zm(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=zm(a)}}function Fm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Fm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Hm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=lf(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=lf(t.document)}return n}function cf(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var lS=ma&&"documentMode"in document&&11>=document.documentMode,lr=null,uf=null,To=null,ff=!1;function Gm(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;ff||lr==null||lr!==lf(r)||(r=lr,"selectionStart"in r&&cf(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),To&&Eo(To,r)||(To=r,r=Bc(uf,"onSelect"),0<r.length&&(n=new Il("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=lr)))}function Es(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var cr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},df={},Vm={};ma&&(Vm=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);function Ts(t){if(df[t])return df[t];if(!cr[t])return t;var n=cr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Vm)return df[t]=n[a];return t}var km=Ts("animationend"),Xm=Ts("animationiteration"),Wm=Ts("animationstart"),cS=Ts("transitionrun"),uS=Ts("transitionstart"),fS=Ts("transitioncancel"),jm=Ts("transitionend"),qm=new Map,hf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");hf.push("scrollEnd");function Di(t,n){qm.set(t,n),Ht(n,[t])}var dS=0;function ga(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Oi.identifierPrefix;var a=dS++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Ym(t){if(t==null||typeof t=="string")return t;var n=null,a=wr;if(a!==null)for(var r=0;r<a.length;r++){var c=t[a[r]];if(c!=null){if(c==="none")return"none";n=n==null?c:n+(" "+c)}}return n??t.default}function xa(t,n){return t=Ym(t),n=Ym(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Fl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},vi=[],ur=0,pf=0;function Hl(){for(var t=ur,n=pf=ur=0;n<t;){var a=vi[n];vi[n++]=null;var r=vi[n];vi[n++]=null;var c=vi[n];vi[n++]=null;var u=vi[n];if(vi[n++]=null,r!==null&&c!==null){var g=r.pending;g===null?c.next=c:(c.next=g.next,g.next=c),r.pending=c}u!==0&&Zm(a,c,u)}}function Gl(t,n,a,r){vi[ur++]=t,vi[ur++]=n,vi[ur++]=a,vi[ur++]=r,pf|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function mf(t,n,a,r){return Gl(t,n,a,r),Vl(t)}function As(t,n){return Gl(t,null,null,n),Vl(t)}function Zm(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var c=!1,u=t.return;u!==null;)u.childLanes|=a,r=u.alternate,r!==null&&(r.childLanes|=a),u.tag===22&&(t=u.stateNode,t===null||t._visibility&1||(c=!0)),t=u,u=u.return;return t.tag===3?(u=t.stateNode,c&&n!==null&&(c=31-ge(a),t=u.hiddenUpdates,r=t[c],r===null?t[c]=[n]:r.push(n),n.lane=a|536870912),u):null}function Vl(t){if(50<qo)throw qo=0,Nc=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var fr={};function hS(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,n,a,r){return new hS(t,n,a,r)}function gf(t){return t=t.prototype,!(!t||!t.isReactComponent)}function va(t,n){var a=t.alternate;return a===null?(a=Yn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Km(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function kl(t,n,a,r,c,u){var g=0;if(r=t,typeof r=="function")gf(r)&&(g=1);else if(typeof r=="string")g=GM(t,a,Ue.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case rt:return t=Yn(31,a,n,c),t.elementType=rt,t.lanes=u,t;case X:return Rs(a.children,c,u,n);case et:g=8,c|=24;break;case Y:return t=Yn(12,a,n,c|2),t.elementType=Y,t.lanes=u,t;case F:return t=Yn(13,a,n,c),t.elementType=F,t.lanes=u,t;case Z:return t=Yn(19,a,n,c),t.elementType=Z,t.lanes=u,t;case Rt:case ae:return t=c|32,t=Yn(30,a,n,t),t.elementType=ae,t.lanes=u,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case Q:g=10;break t;case j:g=9;break t;case B:g=11;break t;case G:g=14;break t;case at:g=16,r=null;break t}g=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Yn(g,a,n,c),n.elementType=t,n.type=r,n.lanes=u,n}function Rs(t,n,a,r){return t=Yn(7,t,r,n),t.lanes=a,t}function xf(t,n,a){return t=Yn(6,t,null,n),t.lanes=a,t}function Qm(t){var n=Yn(18,null,null,0);return n.stateNode=t,n}function vf(t,n,a){return n=Yn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var Jm=new WeakMap;function _i(t,n){if(typeof t=="object"&&t!==null){var a=Jm.get(t);return a!==void 0?a:(n={value:t,source:n,stack:xt(n)},Jm.set(t,n),n)}return{value:t,source:n,stack:xt(n)}}var dr=[],hr=0,Xl=null,Ao=0,yi=[],Si=0,Va=null,ji=1,qi="";function _a(t,n){dr[hr++]=Ao,dr[hr++]=Xl,Xl=t,Ao=n}function $m(t,n,a){yi[Si++]=ji,yi[Si++]=qi,yi[Si++]=Va,Va=t;var r=ji;t=qi;var c=32-ge(r)-1;r&=~(1<<c),a+=1;var u=32-ge(n)+c;if(30<u){var g=c-c%5;u=(r&(1<<g)-1).toString(32),r>>=g,c-=g,ji=1<<32-ge(n)+c|a<<c|r,qi=u+t}else ji=1<<u|a<<c|r,qi=t}function Wl(t){t.return!==null&&(_a(t,1),$m(t,1,0))}function _f(t){for(;t===Xl;)Xl=dr[--hr],dr[hr]=null,Ao=dr[--hr],dr[hr]=null;for(;t===Va;)Va=yi[--Si],yi[Si]=null,qi=yi[--Si],yi[Si]=null,ji=yi[--Si],yi[Si]=null}function tg(t,n){yi[Si++]=ji,yi[Si++]=qi,yi[Si++]=Va,ji=n.id,qi=n.overflow,Va=t}var En=null,tn=null,Ae=!1,ka=null,Mi=!1,yf=Error(s(519));function Xa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ro(_i(n,t)),yf}function eg(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[R]=t,n[W]=r,a){case"dialog":De("cancel",n),De("close",n);break;case"iframe":case"object":case"embed":De("load",n);break;case"video":case"audio":for(a=0;a<Zo.length;a++)De(Zo[a],n);break;case"source":De("error",n);break;case"img":case"image":case"link":De("error",n),De("load",n);break;case"details":De("toggle",n);break;case"input":De("invalid",n),hm(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":De("invalid",n);break;case"textarea":De("invalid",n),mm(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||Mx(n.textContent,a)?(r.popover!=null&&(De("beforetoggle",n),De("toggle",n)),r.onScroll!=null&&De("scroll",n),r.onScrollEnd!=null&&De("scrollend",n),r.onClick!=null&&(n.onclick=Wi),n=!0):n=!1,n||Xa(t,!0)}function jl(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:En=En.return}}function pr(t){if(t!==En)return!1;if(!Ae)return jl(t),Ae=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||Kd(t.type,t.memoizedProps)),a=!a),a&&tn&&Xa(t),jl(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));tn=Gx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));tn=Gx(t)}else n===27?(n=tn,rs(t.type)?(t=sh,sh=null,tn=t):tn=n):tn=En?Ei(t.stateNode.nextSibling):null;return!0}function Cs(){tn=En=null,Ae=!1}function Sf(){var t=ka;return t!==null&&(Qn===null?Qn=t:Qn.push.apply(Qn,t),ka=null),t}function Ro(t){ka===null?ka=[t]:ka.push(t)}var Mf=oe(null),ws=null,ya=null;function Wa(t,n,a){ne(Mf,n._currentValue),n._currentValue=a}function Sa(t){t._currentValue=Mf.current,Zt(Mf)}function ql(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function bf(t,n,a,r){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var u=c.dependencies;if(u!==null){var g=c.child;u=u.firstContext;t:for(;u!==null;){var C=u;u=c;for(var H=0;H<n.length;H++)if(C.context===n[H]){u.lanes|=a,C=u.alternate,C!==null&&(C.lanes|=a),ql(u.return,a,t),r||(g=null);break t}u=C.next}}else if(c.tag===18){if(g=c.return,g===null)throw Error(s(341));g.lanes|=a,u=g.alternate,u!==null&&(u.lanes|=a),ql(g,a,t),g=null}else c.tag===13&&c.memoizedState!==null&&c.memoizedState.dehydrated===null?(c.lanes|=a,g=c.alternate,g!==null&&(g.lanes|=a),ql(c.return,a,t),g=c.child,g=g!==null?g.sibling:null):g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===t){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}}function Ds(t,n,a,r){t=null;for(var c=n,u=!1;c!==null;){if(!u){if((c.flags&524288)!==0)u=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var g=c.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var C=c.type;ai(c.pendingProps.value,g.value)||(t!==null?t.push(C):t=[C])}}else if(c===wt.current){if(g=c.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(Fr):t=[Fr])}c=c.return}return t!==null&&bf(n,t,a,r),n.flags|=262144,t!==null}function Yl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ns(t){ws=t,ya=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function wn(t){return ng(ws,t)}function Zl(t,n){return ws===null&&Ns(t),ng(t,n)}function ng(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ya===null){if(t===null)throw Error(s(308));ya=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ya=ya.next=n;return a}var pS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},mS=o.unstable_scheduleCallback,gS=o.unstable_NormalPriority,hn={$$typeof:Q,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ef(){return{controller:new pS,data:new Map,refCount:0}}function Co(t){t.refCount--,t.refCount===0&&mS(gS,function(){t.controller.abort()})}function ig(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var wo=null;function xS(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Do=null,Tf=0,Us=0,mr=null;function vS(t,n){if(Do===null){var a=Do=[];Tf=0,Us=Gd(),mr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Tf++,n.then(ag,ag),n}function ag(){if(--Tf===0&&(wo=null,Do!==null)){mr!==null&&(mr.status="fulfilled");var t=Do;Do=null,Us=0,mr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function _S(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var sg=gt.S;gt.S=function(t,n){if(Q0=Xt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&vS(t,n),wo!==null)for(var a=Lr;a!==null;)ig(a,wo),a=a.next;if(a=t.types,a!==null){for(var r=Lr;r!==null;)ig(r,a),r=r.next;if(Us!==0){r=wo,r===null&&(r=wo=[]);for(var c=0;c<a.length;c++){var u=a[c];r.indexOf(u)===-1&&r.push(u)}}}sg!==null&&sg(t,n)};var Ls=oe(null);function Af(){var t=Ls.current;return t!==null?t:Je.pooledCache}function Kl(t,n){n===null?ne(Ls,Ls.current):ne(Ls,n.pool)}function rg(){var t=Af();return t===null?null:{parent:hn._currentValue,pool:t}}var gr=Error(s(460)),Rf=Error(s(474)),Ql=Error(s(542)),Jl={then:function(){}};function og(t){return t=t.status,t==="fulfilled"||t==="rejected"}function lg(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(Wi,Wi),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ug(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(Wi,Wi);else{if(t=Je,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,ug(t),t}throw Ps=n,gr}}function Os(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ps=a,gr):a}}var Ps=null;function cg(){if(Ps===null)throw Error(s(459));var t=Ps;return Ps=null,t}function ug(t){if(t===gr||t===Ql)throw Error(s(483))}var xr=null,No=0;function $l(t){var n=No;return No+=1,xr===null&&(xr=[]),lg(xr,t,n)}function ja(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function tc(t,n){throw n.$$typeof===A?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function fg(t){function n($,q){if(t){var st=$.deletions;st===null?($.deletions=[q],$.flags|=16):st.push(q)}}function a($,q){if(!t)return null;for(;q!==null;)n($,q),q=q.sibling;return null}function r($){for(var q=new Map;$!==null;)$.key===null?q.set($.index,$):q.set($.key,$),$=$.sibling;return q}function c($,q){return $=va($,q),$.index=0,$.sibling=null,$}function u($,q,st){return $.index=st,t?(st=$.alternate,st!==null?(st=st.index,st<q?($.flags|=2,q):st):($.flags|=134217730,q)):($.flags|=1048576,q)}function g($){return t&&$.alternate===null&&($.flags|=134217730),$}function C($,q,st,_t){return q===null||q.tag!==6?(q=xf(st,$.mode,_t),q.return=$,q):(q=c(q,st),q.return=$,q)}function H($,q,st,_t){var qt=st.type;return qt===X?($=dt($,q,st.props.children,_t,st.key),ja($,st),$):q!==null&&(q.elementType===qt||typeof qt=="object"&&qt!==null&&qt.$$typeof===at&&Os(qt)===q.type)?(q=c(q,st.props),ja(q,st),q.return=$,q):(q=kl(st.type,st.key,st.props,null,$.mode,_t),ja(q,st),q.return=$,q)}function tt($,q,st,_t){return q===null||q.tag!==4||q.stateNode.containerInfo!==st.containerInfo||q.stateNode.implementation!==st.implementation?(q=vf(st,$.mode,_t),q.return=$,q):(q=c(q,st.children||[]),q.return=$,q)}function dt($,q,st,_t,qt){return q===null||q.tag!==7?(q=Rs(st,$.mode,_t,qt),q.return=$,q):(q=c(q,st),q.return=$,q)}function yt($,q,st){if(typeof q=="string"&&q!==""||typeof q=="number"||typeof q=="bigint")return q=xf(""+q,$.mode,st),q.return=$,q;if(typeof q=="object"&&q!==null){switch(q.$$typeof){case P:return st=kl(q.type,q.key,q.props,null,$.mode,st),ja(st,q),st.return=$,st;case I:return q=vf(q,$.mode,st),q.return=$,q;case at:return q=Os(q),yt($,q,st)}if(te(q)||pt(q))return q=Rs(q,$.mode,st,null),q.return=$,q;if(typeof q.then=="function")return yt($,$l(q),st);if(q.$$typeof===Q)return yt($,Zl($,q),st);tc($,q)}return null}function J($,q,st,_t){var qt=q!==null?q.key:null;if(typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint")return qt!==null?null:C($,q,""+st,_t);if(typeof st=="object"&&st!==null){switch(st.$$typeof){case P:return st.key===qt?H($,q,st,_t):null;case I:return st.key===qt?tt($,q,st,_t):null;case at:return st=Os(st),J($,q,st,_t)}if(te(st)||pt(st))return qt!==null?null:dt($,q,st,_t,null);if(typeof st.then=="function")return J($,q,$l(st),_t);if(st.$$typeof===Q)return J($,q,Zl($,st),_t);tc($,st)}return null}function ut($,q,st,_t,qt){if(typeof _t=="string"&&_t!==""||typeof _t=="number"||typeof _t=="bigint")return $=$.get(st)||null,C(q,$,""+_t,qt);if(typeof _t=="object"&&_t!==null){switch(_t.$$typeof){case P:return $=$.get(_t.key===null?st:_t.key)||null,H(q,$,_t,qt);case I:return $=$.get(_t.key===null?st:_t.key)||null,tt(q,$,_t,qt);case at:return _t=Os(_t),ut($,q,st,_t,qt)}if(te(_t)||pt(_t))return $=$.get(st)||null,dt(q,$,_t,qt,null);if(typeof _t.then=="function")return ut($,q,st,$l(_t),qt);if(_t.$$typeof===Q)return ut($,q,st,Zl(q,_t),qt);tc(q,_t)}return null}function It($,q,st,_t){for(var qt=null,Pe=null,ee=q,le=q=0,gn=null;ee!==null&&le<st.length;le++){ee.index>le?(gn=ee,ee=null):gn=ee.sibling;var Fe=J($,ee,st[le],_t);if(Fe===null){ee===null&&(ee=gn);break}t&&ee&&Fe.alternate===null&&n($,ee),q=u(Fe,q,le),Pe===null?qt=Fe:Pe.sibling=Fe,Pe=Fe,ee=gn}if(le===st.length)return a($,ee),Ae&&_a($,le),qt;if(ee===null){for(;le<st.length;le++)ee=yt($,st[le],_t),ee!==null&&(q=u(ee,q,le),Pe===null?qt=ee:Pe.sibling=ee,Pe=ee);return Ae&&_a($,le),qt}for(ee=r(ee);le<st.length;le++)gn=ut(ee,$,le,st[le],_t),gn!==null&&(t&&(Fe=gn.alternate,Fe!==null&&ee.delete(Fe.key===null?le:Fe.key)),q=u(gn,q,le),Pe===null?qt=gn:Pe.sibling=gn,Pe=gn);return t&&ee.forEach(function(fs){return n($,fs)}),Ae&&_a($,le),qt}function Qt($,q,st,_t){if(st==null)throw Error(s(151));for(var qt=null,Pe=null,ee=q,le=q=0,gn=null,Fe=st.next();ee!==null&&!Fe.done;le++,Fe=st.next()){ee.index>le?(gn=ee,ee=null):gn=ee.sibling;var fs=J($,ee,Fe.value,_t);if(fs===null){ee===null&&(ee=gn);break}t&&ee&&fs.alternate===null&&n($,ee),q=u(fs,q,le),Pe===null?qt=fs:Pe.sibling=fs,Pe=fs,ee=gn}if(Fe.done)return a($,ee),Ae&&_a($,le),qt;if(ee===null){for(;!Fe.done;le++,Fe=st.next())Fe=yt($,Fe.value,_t),Fe!==null&&(q=u(Fe,q,le),Pe===null?qt=Fe:Pe.sibling=Fe,Pe=Fe);return Ae&&_a($,le),qt}for(ee=r(ee);!Fe.done;le++,Fe=st.next())Fe=ut(ee,$,le,Fe.value,_t),Fe!==null&&(t&&(gn=Fe.alternate,gn!==null&&ee.delete(gn.key===null?le:gn.key)),q=u(Fe,q,le),Pe===null?qt=Fe:Pe.sibling=Fe,Pe=Fe);return t&&ee.forEach(function($M){return n($,$M)}),Ae&&_a($,le),qt}function Se($,q,st,_t){if(typeof st=="object"&&st!==null&&st.type===X&&st.key===null&&st.props.ref===void 0&&(st=st.props.children),typeof st=="object"&&st!==null){switch(st.$$typeof){case P:t:{for(var qt=st.key;q!==null;){if(q.key===qt){if(qt=st.type,qt===X){if(q.tag===7){a($,q.sibling),_t=c(q,st.props.children),ja(_t,st),_t.return=$,$=_t;break t}}else if(q.elementType===qt||typeof qt=="object"&&qt!==null&&qt.$$typeof===at&&Os(qt)===q.type){a($,q.sibling),_t=c(q,st.props),ja(_t,st),_t.return=$,$=_t;break t}a($,q);break}else n($,q);q=q.sibling}st.type===X?(_t=Rs(st.props.children,$.mode,_t,st.key),ja(_t,st),_t.return=$,$=_t):(_t=kl(st.type,st.key,st.props,null,$.mode,_t),ja(_t,st),_t.return=$,$=_t)}return g($);case I:t:{for(qt=st.key;q!==null;){if(q.key===qt)if(q.tag===4&&q.stateNode.containerInfo===st.containerInfo&&q.stateNode.implementation===st.implementation){a($,q.sibling),_t=c(q,st.children||[]),_t.return=$,$=_t;break t}else{a($,q);break}else n($,q);q=q.sibling}_t=vf(st,$.mode,_t),_t.return=$,$=_t}return g($);case at:return st=Os(st),Se($,q,st,_t)}if(te(st))return It($,q,st,_t);if(pt(st)){if(qt=pt(st),typeof qt!="function")throw Error(s(150));return st=qt.call(st),Qt($,q,st,_t)}if(typeof st.then=="function")return Se($,q,$l(st),_t);if(st.$$typeof===Q)return Se($,q,Zl($,st),_t);tc($,st)}return typeof st=="string"&&st!==""||typeof st=="number"||typeof st=="bigint"?(st=""+st,q!==null&&q.tag===6?(a($,q.sibling),_t=c(q,st),_t.return=$,$=_t):(a($,q),_t=xf(st,$.mode,_t),_t.return=$,$=_t),g($)):a($,q)}return function($,q,st,_t){try{No=0;var qt=Se($,q,st,_t);return xr=null,qt}catch(ee){if(ee===gr||ee===Ql)throw ee;var Pe=Yn(29,ee,null,$.mode);return Pe.lanes=_t,Pe.return=$,Pe}finally{}}}var Is=fg(!0),dg=fg(!1),qa=!1;function Cf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function wf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ya(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Za(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(Ve&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=Vl(t),Zm(t,null,a),n}return Gl(t,r,n,a),Vl(t)}function Uo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}function Df(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?c=u=g:u=u.next=g,a=a.next}while(a!==null);u===null?c=u=n:u=u.next=n}else c=u=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Nf=!1;function Lo(){if(Nf){var t=mr;if(t!==null)throw t}}function Oo(t,n,a,r){Nf=!1;var c=t.updateQueue;qa=!1;var u=c.firstBaseUpdate,g=c.lastBaseUpdate,C=c.shared.pending;if(C!==null){c.shared.pending=null;var H=C,tt=H.next;H.next=null,g===null?u=tt:g.next=tt,g=H;var dt=t.alternate;dt!==null&&(dt=dt.updateQueue,C=dt.lastBaseUpdate,C!==g&&(C===null?dt.firstBaseUpdate=tt:C.next=tt,dt.lastBaseUpdate=H))}if(u!==null){var yt=c.baseState;g=0,dt=tt=H=null,C=u;do{var J=C.lane&-536870913,ut=J!==C.lane;if(ut?(Oe&J)===J:(r&J)===J){J!==0&&J===Us&&(Nf=!0),dt!==null&&(dt=dt.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var It=t,Qt=C;J=n;var Se=a;switch(Qt.tag){case 1:if(It=Qt.payload,typeof It=="function"){yt=It.call(Se,yt,J);break t}yt=It;break t;case 3:It.flags=It.flags&-65537|128;case 0:if(It=Qt.payload,J=typeof It=="function"?It.call(Se,yt,J):It,J==null)break t;yt=O({},yt,J);break t;case 2:qa=!0}}J=C.callback,J!==null&&(t.flags|=64,ut&&(t.flags|=8192),ut=c.callbacks,ut===null?c.callbacks=[J]:ut.push(J))}else ut={lane:J,tag:C.tag,payload:C.payload,callback:C.callback,next:null},dt===null?(tt=dt=ut,H=yt):dt=dt.next=ut,g|=J;if(C=C.next,C===null){if(C=c.shared.pending,C===null)break;ut=C,C=ut.next,ut.next=null,c.lastBaseUpdate=ut,c.shared.pending=null}}while(!0);dt===null&&(H=yt),c.baseState=H,c.firstBaseUpdate=tt,c.lastBaseUpdate=dt,u===null&&(c.shared.lanes=0),ns|=g,t.lanes=g,t.memoizedState=yt}}function hg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function pg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)hg(a[t],n)}var Ka=oe(null),ec=oe(0);function mg(t,n){t=Aa,ne(ec,t),ne(Ka,n),Aa=t|n.baseLanes}function Uf(){ne(ec,Aa),ne(Ka,Ka.current)}function Lf(){Aa=ec.current,Zt(Ka),Zt(ec)}var Dn=oe(null),Pn=null;function Qa(t){var n=t.alternate;ne(Nn,Nn.current&1),ne(Dn,t),Pn===null&&(n===null||Ka.current!==null||n.memoizedState!==null)&&(Pn=t)}function Of(t){ne(Nn,Nn.current),ne(Dn,t),Pn===null&&(Pn=t)}function gg(t){t.tag===22?(ne(Nn,Nn.current),ne(Dn,t),Pn===null&&(Pn=t)):Ja()}function Ja(){ne(Nn,Nn.current),ne(Dn,Dn.current)}function si(t){Zt(Dn),Pn===t&&(Pn=null),Zt(Nn)}var Nn=oe(0);function Po(t,n){ne(Dn,Dn.current),ne(Nn,n)}function Pf(t){Zt(Nn),Zt(Dn),Pn===t&&(Pn=null)}function nc(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||ih(a)||ah(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ma=0,ye=null,Qe=null,pn=null,ic=!1,vr=!1,zs=!1,ac=0,Io=0,_r=null,yS=0;function un(){throw Error(s(321))}function If(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function zf(t,n,a,r,c,u){return Ma=u,ye=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,gt.H=t===null||t.memoizedState===null?$g:t0,zs=!1,u=a(r,c),zs=!1,vr&&(u=vg(n,a,r,c)),xg(t),u}function xg(t){gt.H=fc;var n=Qe!==null&&Qe.next!==null;if(Ma=0,pn=Qe=ye=null,ic=!1,Io=0,_r=null,n)throw Error(s(300));t===null||mn||(t=t.dependencies,t!==null&&Yl(t)&&(mn=!0))}function vg(t,n,a,r){ye=t;var c=0;do{if(vr&&(_r=null),Io=0,vr=!1,25<=c)throw Error(s(301));if(c+=1,pn=Qe=null,t.updateQueue!=null){var u=t.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}gt.H=CS,u=n(a,r)}while(vr);return u}function SS(){var t=gt.H,n=t.useState()[0];return n=typeof n.then=="function"?zo(n):n,t=t.useState()[0],(Qe!==null?Qe.memoizedState:null)!==t&&(ye.flags|=1024),n}function Bf(){var t=ac!==0;return ac=0,t}function Ff(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function Hf(t){if(ic){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ic=!1}Ma=0,pn=Qe=ye=null,vr=!1,Io=ac=0,_r=null}function Vn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?ye.memoizedState=pn=t:pn=pn.next=t,pn}function dn(){if(Qe===null){var t=ye.alternate;t=t!==null?t.memoizedState:null}else t=Qe.next;var n=pn===null?ye.memoizedState:pn.next;if(n!==null)pn=n,Qe=t;else{if(t===null)throw ye.alternate===null?Error(s(467)):Error(s(310));Qe=t,t={memoizedState:Qe.memoizedState,baseState:Qe.baseState,baseQueue:Qe.baseQueue,queue:Qe.queue,next:null},pn===null?ye.memoizedState=pn=t:pn=pn.next=t}return pn}function sc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function zo(t){var n=Io;return Io+=1,_r===null&&(_r=[]),t=lg(_r,t,n),n=ye,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,gt.H=n===null||n.memoizedState===null?$g:t0),t}function rc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return zo(t);if(t.$$typeof===ce)return;if(t.$$typeof===Q)return wn(t)}throw Error(s(438,String(t)))}function Gf(t){var n=null,a=ye.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=ye.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=sc(),ye.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=Et;return n.index++,a}function ba(t,n){return typeof n=="function"?n(t):n}function oc(t){var n=dn();return Vf(n,Qe,t)}function Vf(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=t.baseQueue,u=r.pending;if(u!==null){if(c!==null){var g=c.next;c.next=u.next,u.next=g}n.baseQueue=c=u,r.pending=null}if(u=t.baseState,c===null)t.memoizedState=u;else{n=c.next;var C=g=null,H=null,tt=n,dt=!1;do{var yt=tt.lane&-536870913;if(yt!==tt.lane?(Oe&yt)===yt:(Ma&yt)===yt){var J=tt.revertLane;if(J===0)H!==null&&(H=H.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),yt===Us&&(dt=!0);else if((Ma&J)===J){tt=tt.next,J===Us&&(dt=!0);continue}else yt={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},H===null?(C=H=yt,g=u):H=H.next=yt,ye.lanes|=J,ns|=J;yt=tt.action,zs&&a(u,yt),u=tt.hasEagerState?tt.eagerState:a(u,yt)}else J={lane:yt,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},H===null?(C=H=J,g=u):H=H.next=J,ye.lanes|=yt,ns|=yt;tt=tt.next}while(tt!==null&&tt!==n);if(H===null?g=u:H.next=C,!ai(u,t.memoizedState)&&(mn=!0,dt&&(a=mr,a!==null)))throw a;t.memoizedState=u,t.baseState=g,t.baseQueue=H,r.lastRenderedState=u}return c===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function kf(t){var n=dn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,c=a.pending,u=n.memoizedState;if(c!==null){a.pending=null;var g=c=c.next;do u=t(u,g.action),g=g.next;while(g!==c);ai(u,n.memoizedState)||(mn=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),a.lastRenderedState=u}return[u,r]}function _g(t,n,a){var r=ye,c=dn(),u=Ae;if(u){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!ai((Qe||c).memoizedState,a);if(g&&(c.memoizedState=a,mn=!0),c=c.queue,jf(Mg.bind(null,r,c,t),[t]),t=c.getSnapshot!==n||g||pn!==null&&(pn.memoizedState.tag&1)!==0,yr(t?9:8,{destroy:void 0},Sg.bind(null,r,c,a,n),null),t){if(r.flags|=2048,Je===null)throw Error(s(349));u||(Ma&127)!==0||yg(r,n,a)}return a}function yg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ye.updateQueue,n===null?(n=sc(),ye.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function Sg(t,n,a,r){n.value=a,n.getSnapshot=r,bg(n)&&Eg(t)}function Mg(t,n,a){return a(function(){bg(n)&&Eg(t)})}function bg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function Eg(t){var n=As(t,2);n!==null&&Jn(n,t,2)}function Xf(t){var n=Vn();if(typeof t=="function"){var a=t;if(t=a(),zs){Ie(!0);try{a()}finally{Ie(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:t},n}function Tg(t,n,a,r){return t.baseState=a,Vf(t,Qe,typeof r=="function"?r:ba)}function MS(t,n,a,r,c){if(uc(t))throw Error(s(485));if(t=n.action,t!==null){var u={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){u.listeners.push(g)}};gt.T!==null?a(!0):u.isTransition=!1,r(u),a=n.pending,a===null?(u.next=n.pending=u,Ag(n,u)):(u.next=a.next,n.pending=a.next=u)}}function Ag(t,n){var a=n.action,r=n.payload,c=t.state;if(n.isTransition){var u=gt.T,g={};g.types=u!==null?u.types:null,gt.T=g;try{var C=a(c,r),H=gt.S;H!==null&&H(g,C),Rg(t,n,C)}catch(tt){Wf(t,n,tt)}finally{u!==null&&g.types!==null&&(u.types=g.types),gt.T=u}}else try{u=a(c,r),Rg(t,n,u)}catch(tt){Wf(t,n,tt)}}function Rg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Cg(t,n,r)},function(r){return Wf(t,n,r)}):Cg(t,n,a)}function Cg(t,n,a){n.status="fulfilled",n.value=a,wg(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Ag(t,a)))}function Wf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,wg(n),n=n.next;while(n!==r)}t.action=null}function wg(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Dg(t,n){return n}function Ng(t,n){if(Ae){var a=Je.formState;if(a!==null){t:{var r=ye;if(Ae){if(tn){e:{for(var c=tn,u=Mi;c.nodeType!==8;){if(!u){c=null;break e}if(c=Ei(c.nextSibling),c===null){c=null;break e}}u=c.data,c=u==="F!"||u==="F"?c:null}if(c){tn=Ei(c.nextSibling),r=c.data==="F!";break t}}Xa(r)}r=!1}r&&(n=a[0])}}return a=Vn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Dg,lastRenderedState:n},a.queue=r,a=Kg.bind(null,ye,r),r.dispatch=a,r=Xf(!1),u=Qf.bind(null,ye,!1,r.queue),r=Vn(),c={state:n,dispatch:null,action:t,pending:null},r.queue=c,a=MS.bind(null,ye,c,u,a),c.dispatch=a,r.memoizedState=t,[n,a,!1]}function Ug(t){var n=dn();return Lg(n,Qe,t)}function Lg(t,n,a){if(n=Vf(t,n,Dg)[0],t=oc(ba)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=zo(n)}catch(g){throw g===gr?Ql:g}else r=n;n=dn();var c=n.queue,u=c.dispatch;return a!==n.memoizedState&&(ye.flags|=2048,yr(9,{destroy:void 0},bS.bind(null,c,a),null)),[r,u,t]}function bS(t,n){t.action=n}function Og(t){var n=dn(),a=Qe;if(a!==null)return Lg(n,a,t);dn(),n=n.memoizedState,a=dn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function yr(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=ye.updateQueue,n===null&&(n=sc(),ye.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function Pg(){return dn().memoizedState}function lc(t,n,a,r){var c=Vn();ye.flags|=t,c.memoizedState=yr(1|n,{destroy:void 0},a,r===void 0?null:r)}function cc(t,n,a,r){var c=dn();r=r===void 0?null:r;var u=c.memoizedState.inst;Qe!==null&&r!==null&&If(r,Qe.memoizedState.deps)?c.memoizedState=yr(n,u,a,r):(ye.flags|=t,c.memoizedState=yr(1|n,u,a,r))}function Ig(t,n){lc(8390656,8,t,n)}function jf(t,n){cc(2048,8,t,n)}function ES(t){ye.flags|=4;var n=ye.updateQueue;if(n===null)n=sc(),ye.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function zg(t){var n=dn().memoizedState;return ES({ref:n,nextImpl:t}),function(){if((Ve&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Bg(t,n){return cc(4,2,t,n)}function Fg(t,n){return cc(4,4,t,n)}function Hg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Gg(t,n,a){a=a!=null?a.concat([t]):null,cc(4,4,Hg.bind(null,n,t),a)}function qf(){}function Vg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&If(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function kg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&If(n,r[1]))return r[0];if(r=t(),zs){Ie(!0);try{t()}finally{Ie(!1)}}return a.memoizedState=[r,n],r}function Yf(t,n,a){return a===void 0||(Ma&1073741824)!==0&&(Oe&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=$0(),ye.lanes|=t,ns|=t,a)}function Xg(t,n,a,r){return ai(a,n)?a:Ka.current!==null?(t=Yf(t,a,r),ai(t,n)||(mn=!0),t):(Ma&106)===0||(Ma&1073741824)!==0&&(Oe&261930)===0?(mn=!0,t.memoizedState=a):(t=$0(),ye.lanes|=t,ns|=t,n)}function Wg(t,n,a,r,c){var u=Tt.p;Tt.p=u!==0&&8>u?u:8;var g=gt.T,C={};C.types=g!==null?g.types:null,gt.T=C,Qf(t,!1,n,a);try{var H=c(),tt=gt.S;if(tt!==null&&tt(C,H),H!==null&&typeof H=="object"&&typeof H.then=="function"){var dt=_S(H,r);Bo(t,n,dt,ci(t))}else Bo(t,n,r,ci(t))}catch(yt){Bo(t,n,{then:function(){},status:"rejected",reason:yt},ci())}finally{Tt.p=u,g!==null&&C.types!==null&&(g.types=C.types),gt.T=g}}function TS(){}function Zf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var c=jg(t).queue;Wg(t,c,n,Me,a===null?TS:function(){return qg(t),a(r)})}function jg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:Me,baseState:Me,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:Me},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function qg(t){var n=jg(t);n.next===null&&(n=t.alternate.memoizedState),Bo(t,n.next.queue,{},ci())}function Kf(){return wn(Fr)}function Yg(){return dn().memoizedState}function Zg(){return dn().memoizedState}function AS(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ci();t=Ya(a);var r=Za(n,t,a);r!==null&&(Jn(r,n,a),Uo(r,n,a)),n={cache:Ef()},t.payload=n;return}n=n.return}}function RS(t,n,a){var r=ci();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},uc(t)?Qg(n,a):(a=mf(t,n,a,r),a!==null&&(Jn(a,t,r),Jg(a,n,r)))}function Kg(t,n,a){var r=ci();Bo(t,n,a,r)}function Bo(t,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(uc(t))Qg(n,c);else{var u=t.alternate;if(t.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var g=n.lastRenderedState,C=u(g,a);if(c.hasEagerState=!0,c.eagerState=C,ai(C,g))return Gl(t,n,c,0),Je===null&&Hl(),!1}catch{}finally{}if(a=mf(t,n,c,r),a!==null)return Jn(a,t,r),Jg(a,n,r),!0}return!1}function Qf(t,n,a,r){if(r={lane:2,revertLane:Gd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},uc(t)){if(n)throw Error(s(479))}else n=mf(t,a,r,2),n!==null&&Jn(n,t,2)}function uc(t){var n=t.alternate;return t===ye||n!==null&&n===ye}function Qg(t,n){vr=ic=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function Jg(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}var fc={readContext:wn,use:rc,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un,useEffectEvent:un},$g={readContext:wn,use:rc,useCallback:function(t,n){return Vn().memoizedState=[t,n===void 0?null:n],t},useContext:wn,useEffect:Ig,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,lc(4194308,4,Hg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return lc(4194308,4,t,n)},useInsertionEffect:function(t,n){lc(4,2,t,n)},useMemo:function(t,n){var a=Vn();n=n===void 0?null:n;var r=t();if(zs){Ie(!0);try{t()}finally{Ie(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Vn();if(a!==void 0){var c=a(n);if(zs){Ie(!0);try{a(n)}finally{Ie(!1)}}}else c=n;return r.memoizedState=r.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},r.queue=t,t=t.dispatch=RS.bind(null,ye,t),[r.memoizedState,t]},useRef:function(t){var n=Vn();return t={current:t},n.memoizedState=t},useState:function(t){t=Xf(t);var n=t.queue,a=Kg.bind(null,ye,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:qf,useDeferredValue:function(t,n){var a=Vn();return Yf(a,t,n)},useTransition:function(){var t=Xf(!1);return t=Wg.bind(null,ye,t.queue,!0,!1),Vn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=ye,c=Vn();if(Ae){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Je===null)throw Error(s(349));(Oe&127)!==0||yg(r,n,a)}c.memoizedState=a;var u={value:a,getSnapshot:n};return c.queue=u,Ig(Mg.bind(null,r,u,t),[t]),r.flags|=2048,yr(9,{destroy:void 0},Sg.bind(null,r,u,a,n),null),a},useId:function(){var t=Vn(),n=Je.identifierPrefix;if(Ae){var a=qi,r=ji;a=(r&~(1<<32-ge(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=ac++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=yS++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:Kf,useFormState:Ng,useActionState:Ng,useOptimistic:function(t){var n=Vn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Qf.bind(null,ye,!0,a),a.dispatch=n,[t,n]},useMemoCache:Gf,useCacheRefresh:function(){return Vn().memoizedState=AS.bind(null,ye)},useEffectEvent:function(t){var n=Vn(),a={impl:t};return n.memoizedState=a,function(){if((Ve&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},t0={readContext:wn,use:rc,useCallback:Vg,useContext:wn,useEffect:jf,useImperativeHandle:Gg,useInsertionEffect:Bg,useLayoutEffect:Fg,useMemo:kg,useReducer:oc,useRef:Pg,useState:function(){return oc(ba)},useDebugValue:qf,useDeferredValue:function(t,n){var a=dn();return Xg(a,Qe.memoizedState,t,n)},useTransition:function(){var t=oc(ba)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:_g,useId:Yg,useHostTransitionStatus:Kf,useFormState:Ug,useActionState:Ug,useOptimistic:function(t,n){var a=dn();return Tg(a,Qe,t,n)},useMemoCache:Gf,useCacheRefresh:Zg,useEffectEvent:zg},CS={readContext:wn,use:rc,useCallback:Vg,useContext:wn,useEffect:jf,useImperativeHandle:Gg,useInsertionEffect:Bg,useLayoutEffect:Fg,useMemo:kg,useReducer:kf,useRef:Pg,useState:function(){return kf(ba)},useDebugValue:qf,useDeferredValue:function(t,n){var a=dn();return Qe===null?Yf(a,t,n):Xg(a,Qe.memoizedState,t,n)},useTransition:function(){var t=kf(ba)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:_g,useId:Yg,useHostTransitionStatus:Kf,useFormState:Og,useActionState:Og,useOptimistic:function(t,n){var a=dn();return Qe!==null?Tg(a,Qe,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Gf,useCacheRefresh:Zg,useEffectEvent:zg};function Jf(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:O({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var $f={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ci(),c=Ya(r);c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Jn(n,t,r),Uo(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ci(),c=Ya(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Jn(n,t,r),Uo(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ci(),r=Ya(a);r.tag=2,n!=null&&(r.callback=n),n=Za(t,r,a),n!==null&&(Jn(n,t,a),Uo(n,t,a))}};function e0(t,n,a,r,c,u,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,u,g):n.prototype&&n.prototype.isPureReactComponent?!Eo(a,r)||!Eo(c,u):!0}function n0(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&$f.enqueueReplaceState(n,n.state,null)}function Bs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=O({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function i0(t){Fl(t)}function a0(t){console.error(t)}function s0(t){Fl(t)}function dc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function r0(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function td(t,n,a){return a=Ya(a),a.tag=3,a.payload={element:null},a.callback=function(){dc(t,n)},a}function o0(t){return t=Ya(t),t.tag=3,t}function l0(t,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var u=r.value;t.payload=function(){return c(u)},t.callback=function(){r0(n,a,r)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){r0(n,a,r),typeof c!="function"&&(is===null?is=new Set([this]):is.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})})}function wS(t,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ds(n,a,c,!0),a=Dn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return Pn===null?Lc():a.alternate===null&&fn===0&&(fn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===Jl?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Bd(t,r,c)),!1;case 22:return a.flags|=65536,r===Jl?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Bd(t,r,c)),!1}throw Error(s(435,a.tag))}return Bd(t,r,c),Lc(),!1}if(Ae)return n=Dn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==yf&&(t=Error(s(422),{cause:r}),Ro(_i(t,a)))):(r!==yf&&(n=Error(s(423),{cause:r}),Ro(_i(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,r=_i(r,a),c=td(t.stateNode,r,c),Df(t,c),fn!==4&&(fn=2)),!1;var u=Error(s(520),{cause:r});if(u=_i(u,a),jo===null?jo=[u]:jo.push(u),fn!==4&&(fn=2),n===null)return!0;r=_i(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=td(a.stateNode,r,t),Df(a,t),!1;case 1:if(n=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(is===null||!is.has(u))))return a.flags|=65536,c&=-c,a.lanes|=c,c=o0(c),l0(c,t,a,r),Df(a,c),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var ed=Error(s(461)),mn=!1;function _n(t,n,a,r){n.child=t===null?dg(n,null,a,r):Is(n,t.child,a,r)}function c0(t,n,a,r,c){a=a.render;var u=n.ref;if("ref"in r){var g={};for(var C in r)C!=="ref"&&(g[C]=r[C])}else g=r;return Ns(n),r=zf(t,n,a,g,u,c),C=Bf(),t!==null&&!mn?(Ff(t,n,c),Ea(t,n,c)):(Ae&&C&&Wl(n),n.flags|=1,_n(t,n,r,c),n.child)}function u0(t,n,a,r,c){if(t===null){var u=a.type;return typeof u=="function"&&!gf(u)&&u.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=u,f0(t,n,u,r,c)):(t=kl(a.type,null,r,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(u=t.child,!cd(t,c)){var g=u.memoizedProps;if(a=a.compare,a=a!==null?a:Eo,a(g,r)&&t.ref===n.ref)return Ea(t,n,c)}return n.flags|=1,t=va(u,r),t.ref=n.ref,t.return=n,n.child=t}function f0(t,n,a,r,c){if(t!==null){var u=t.memoizedProps;if(Eo(u,r)&&t.ref===n.ref)if(mn=!1,n.pendingProps=r=u,cd(t,c))(t.flags&131072)!==0&&(mn=!0);else return n.lanes=t.lanes,Ea(t,n,c)}return nd(t,n,a,r,c)}function d0(t,n,a,r){var c=r.children,u=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,t!==null){for(r=n.child=t.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~u}else r=0,n.child=null;return h0(t,n,u,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Kl(n,u!==null?u.cachePool:null),u!==null?mg(n,u):Uf(),gg(n);else return r=n.lanes=536870912,h0(t,n,u!==null?u.baseLanes|a:a,a,r)}else u!==null?(Kl(n,u.cachePool),mg(n,u),Ja(),n.memoizedState=null):(t!==null&&Kl(n,null),Uf(),Ja());return _n(t,n,c,a),n.child}function Fo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function h0(t,n,a,r,c){var u=Af();return u=u===null?null:{parent:hn._currentValue,pool:u},n.memoizedState={baseLanes:a,cachePool:u},t!==null&&Kl(n,null),Uf(),gg(n),t!==null&&Ds(t,n,r,!0),n.childLanes=c,null}function hc(t,n){return n=pc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function p0(t,n,a){return Is(n,t.child,null,a),t=hc(n,n.pendingProps),t.flags|=2,si(n),n.memoizedState=null,t}function DS(t,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ae){if(r.mode==="hidden")return t=hc(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Fo(null,t);if(Of(n),(t=tn)?(t=Hx(t,Mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:ji,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},a=Qm(t),a.return=n,n.child=a,En=n,tn=null)):t=null,t===null)throw Xa(n);return n.lanes=536870912,null}return hc(n,r)}var u=t.memoizedState;if(u!==null){var g=u.dehydrated;if(Of(n),c)if(n.flags&256)n.flags&=-257,n=p0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||Ds(t,n,a,!1),c=(a&t.childLanes)!==0,mn||c){if(Ka.current===null){if(r=Je,r!==null&&(g=po(r,a),g!==0&&g!==u.retryLane))throw u.retryLane=g,As(t,g),Jn(r,t,g),ed;Lc()}n=p0(t,n,a)}else t=u.treeContext,tn=Ei(g.nextSibling),En=n,Ae=!0,ka=null,Mi=!1,t!==null&&tg(n,t),n=hc(n,r),n.flags|=134221824;return n}return t=va(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function nd(t,n,a,r,c){return Ns(n),a=zf(t,n,a,r,void 0,c),r=Bf(),t!==null&&!mn?(Ff(t,n,c),Ea(t,n,c)):(Ae&&r&&Wl(n),n.flags|=1,_n(t,n,a,c),n.child)}function m0(t,n,a,r,c,u){return Ns(n),n.updateQueue=null,a=vg(n,r,a,c),xg(t),r=Bf(),t!==null&&!mn?(Ff(t,n,u),Ea(t,n,u)):(Ae&&r&&Wl(n),n.flags|=1,_n(t,n,a,u),n.child)}function g0(t,n,a,r,c){if(Ns(n),n.stateNode===null){var u=fr,g=a.contextType;typeof g=="object"&&g!==null&&(u=wn(g)),u=new a(r,u),n.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=$f,n.stateNode=u,u._reactInternals=n,u=n.stateNode,u.props=r,u.state=n.memoizedState,u.refs={},Cf(n),g=a.contextType,u.context=typeof g=="object"&&g!==null?wn(g):fr,u.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(Jf(n,a,g,r),u.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(g=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),g!==u.state&&$f.enqueueReplaceState(u,u.state,null),Oo(n,r,u,c),Lo(),u.state=n.memoizedState),typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){u=n.stateNode;var C=n.memoizedProps,H=Bs(a,C);u.props=H;var tt=u.context,dt=a.contextType;g=fr,typeof dt=="object"&&dt!==null&&(g=wn(dt));var yt=a.getDerivedStateFromProps;dt=typeof yt=="function"||typeof u.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,dt||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(C||tt!==g)&&n0(n,u,r,g),qa=!1;var J=n.memoizedState;u.state=J,Oo(n,r,u,c),Lo(),tt=n.memoizedState,C||J!==tt||qa?(typeof yt=="function"&&(Jf(n,a,yt,r),tt=n.memoizedState),(H=qa||e0(n,a,H,r,J,tt,g))?(dt||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(n.flags|=4194308)):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=tt),u.props=r,u.state=tt,u.context=g,r=H):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,wf(t,n),g=n.memoizedProps,dt=Bs(a,g),u.props=dt,yt=n.pendingProps,J=u.context,tt=a.contextType,H=fr,typeof tt=="object"&&tt!==null&&(H=wn(tt)),C=a.getDerivedStateFromProps,(tt=typeof C=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(g!==yt||J!==H)&&n0(n,u,r,H),qa=!1,J=n.memoizedState,u.state=J,Oo(n,r,u,c),Lo();var ut=n.memoizedState;g!==yt||J!==ut||qa||t!==null&&t.dependencies!==null&&Yl(t.dependencies)?(typeof C=="function"&&(Jf(n,a,C,r),ut=n.memoizedState),(dt=qa||e0(n,a,dt,r,J,ut,H)||t!==null&&t.dependencies!==null&&Yl(t.dependencies))?(tt||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,ut,H),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,ut,H)),typeof u.componentDidUpdate=="function"&&(n.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&J===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&J===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=ut),u.props=r,u.state=ut,u.context=H,r=dt):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&J===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&J===t.memoizedState||(n.flags|=1024),r=!1)}return u=r,Sr(t,n),r=(n.flags&128)!==0,u||r?(u=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:u.render(),n.flags|=1,t!==null&&r?(n.child=Is(n,t.child,null,c),n.child=Is(n,null,a,c)):_n(t,n,a,c),n.memoizedState=u.state,t=n.child):t=Ea(t,n,c),t}function x0(t,n,a,r){return Cs(),n.flags|=256,_n(t,n,a,r),n.child}var id={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function ad(t){return{baseLanes:t,cachePool:rg()}}function sd(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=li),t}function v0(t,n,a){var r=n.pendingProps,c=!1,u=(n.flags&128)!==0,g;if((g=u)||(g=t!==null&&t.memoizedState===null?!1:(Nn.current&2)!==0),g&&(c=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ae){if(c?Qa(n):Ja(),(t=tn)?(t=Hx(t,Mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:ji,overflow:qi}:null,retryLane:536870912,hydrationErrors:null},a=Qm(t),a.return=n,n.child=a,En=n,tn=null)):t=null,t===null)throw Xa(n);return ah(t)?n.lanes=32:n.lanes=536870912,null}return u=r.children,r=r.fallback,c?(Ja(),c=n.mode,u=pc({mode:"hidden",children:u},c),r=Rs(r,c,a,null),u.return=n,r.return=n,u.sibling=r,n.child=u,r=n.child,r.memoizedState=ad(a),r.childLanes=sd(t,g,a),n.memoizedState=id,Fo(null,r)):(Qa(n),rd(n,u))}var C=t.memoizedState;if(C!==null){var H=C.dehydrated;if(H!==null)return NS(t,n,u,g,r,H,C,a)}return c?(Ja(),c=r.fallback,u=n.mode,C=t.child,H=C.sibling,r=va(C,{mode:"hidden",children:r.children}),r.subtreeFlags=C.subtreeFlags&1206910976,H!==null?c=va(H,c):(c=Rs(c,u,a,null),c.flags|=2),c.return=n,r.return=n,r.sibling=c,n.child=r,Fo(null,r),r=n.child,c=t.child.memoizedState,c===null?c=ad(a):(u=c.cachePool,u!==null?(C=hn._currentValue,u=u.parent!==C?{parent:C,pool:C}:u):u=rg(),c={baseLanes:c.baseLanes|a,cachePool:u}),r.memoizedState=c,r.childLanes=sd(t,g,a),n.memoizedState=id,Fo(t.child,r)):(Qa(n),a=t.child,t=a.sibling,a=va(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function rd(t,n){return n=pc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function pc(t,n){return t=Yn(22,t,null,n),t.lanes=0,t}function mc(t,n,a){return Is(n,t.child,null,a),t=rd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function NS(t,n,a,r,c,u,g,C){if(a)return n.flags&256?(Qa(n),n.flags&=-257,mc(t,n,C)):n.memoizedState!==null?(Ja(),n.child=t.child,n.flags|=128,null):(Ja(),u=c.fallback,g=n.mode,c=pc({mode:"visible",children:c.children},g),u=Rs(u,g,C,null),u.flags|=2,c.return=n,u.return=n,c.sibling=u,n.child=c,Is(n,t.child,null,C),c=n.child,c.memoizedState=ad(C),c.childLanes=sd(t,r,C),n.memoizedState=id,Fo(null,c));if(Qa(n),ah(u)){if(r=u.nextSibling&&u.nextSibling.dataset,r)var H=r.dgst;return r=H,r!==""&&(c=Error(s(419)),c.stack="",c.digest=r,Ro({value:c,source:null,stack:null})),mc(t,n,C)}if(mn||Ds(t,n,C,!1),r=(C&t.childLanes)!==0,mn||r){if(Ka.current!==null)return mc(t,n,C);if(r=Je,r!==null&&(c=po(r,C),c!==0&&c!==g.retryLane))throw g.retryLane=c,As(t,c),Jn(r,t,c),ed;return ih(u)||Lc(),mc(t,n,C)}return ih(u)?(n.flags|=192,n.child=t.child,null):(t=g.treeContext,tn=Ei(u.nextSibling),En=n,Ae=!0,ka=null,Mi=!1,t!==null&&tg(n,t),n=rd(n,c.children),n.flags|=134221824,n)}function _0(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),ql(t.return,n,a)}function y0(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&nc(a)===null&&(n=t),t=t.sibling}return n}function gc(t,n,a,r,c,u){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:u}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=r,g.tail=a,g.tailMode=c,g.treeForkCount=u)}function od(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function ld(t,n,a){var r=n.pendingProps,c=r.revealOrder,u=r.tail;r=r.children;var g=Nn.current;if(n.flags&128)return Po(n,g),null;var C=(g&2)!==0;if(C?(g=g&1|2,n.flags|=128):g&=1,Po(n,g),c==="backwards"&&t!==null?(od(t),_n(t,n,r,a),od(t)):_n(t,n,r,a),r=Ae?Ao:0,!C&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&_0(t,a,n);else if(t.tag===19)_0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"backwards":a=y0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null,od(n)),gc(n,!0,c,null,u,r);break;case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&nc(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}gc(n,!0,a,null,u,r);break;case"together":gc(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=y0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),gc(n,!1,c,a,u,r)}return n.child}function S0(t,n,a){var r=n.pendingProps;return Wa(n,n.type,r.value),_n(t,n,r.children,a),n.child}function Ea(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ds(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=va(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=va(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function cd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Yl(t)))}function US(t,n,a){switch(n.tag){case 3:k(n,n.stateNode.containerInfo),Wa(n,hn,t.memoizedState.cache),Cs();break;case 27:case 5:se(n);break;case 4:k(n,n.stateNode.containerInfo);break;case 10:Wa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,Of(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return Qa(n),n.flags|=128,null;r=Ds(t,n,a,!1);var c=n.child.childLanes;return r||(a&c)!==0?v0(t,n,a):(Qa(n),t=Ea(t,n,a),t!==null?t.sibling:null)}Qa(n);break;case 19:if(n.flags&128)return ld(t,n,a);if(c=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ds(t,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return ld(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Po(n,Nn.current),r)break;return null;case 22:return n.lanes=0,d0(t,n,a,n.pendingProps);case 24:Wa(n,hn,t.memoizedState.cache)}return Ea(t,n,a)}function M0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)mn=!0;else{if(!cd(t,a)&&(n.flags&128)===0)return mn=!1,US(t,n,a);mn=(t.flags&131072)!==0}else mn=!1,Ae&&(n.flags&1048576)!==0&&$m(n,Ao,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=Os(n.elementType),n.type=t,typeof t=="function")gf(t)?(r=Bs(t,r),n.tag=1,n=g0(null,n,t,r,a)):(n.tag=0,n=nd(null,n,t,r,a));else{if(t!=null){var c=t.$$typeof;if(c===B){n.tag=11,n=c0(null,n,t,r,a);break t}else if(c===G){n.tag=14,n=u0(null,n,t,r,a);break t}else if(c===Q){n.tag=10,n.type=t,n=S0(null,n,a);break t}}throw n=Dt(t)||t,Error(s(306,n,""))}}return n;case 0:return nd(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=Bs(r,n.pendingProps),g0(t,n,r,c,a);case 3:t:{if(k(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var u=n.memoizedState;c=u.element,wf(t,n),Oo(n,r,null,a);var g=n.memoizedState;if(r=g.cache,Wa(n,hn,r),r!==u.cache&&bf(n,[hn],a,!0),Lo(),r=g.element,u.isDehydrated)if(u={element:r,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=x0(t,n,r,a);break t}else if(r!==c){c=_i(Error(s(424)),n),Ro(c),n=x0(t,n,r,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(tn=Ei(t.firstChild),En=n,Ae=!0,ka=null,Mi=!0,a=dg(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Cs(),r===c){n=Ea(t,n,a);break t}_n(t,n,r,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=qx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ae||(n.stateNode=Ax(n.type,n.pendingProps,ot.current,n)):n.memoizedState=qx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return se(n),t===null&&Ae&&(r=n.stateNode=kx(n.type,n.pendingProps,ot.current),En=n,Mi=!0,c=tn,rs(n.type)?(sh=c,tn=Ei(r.firstChild)):tn=c),_n(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ae&&((c=r=tn)&&(r=AM(r,n.type,n.pendingProps,Mi),r!==null?(n.stateNode=r,En=n,tn=Ei(r.firstChild),Mi=!1,c=!0):c=!1),c||Xa(n)),se(n),c=n.type,u=n.pendingProps,g=t!==null?t.memoizedProps:null,r=u.children,Kd(c,u)?r=null:g!==null&&Kd(c,g)&&(n.flags|=32),n.memoizedState!==null&&(c=zf(t,n,SS,null,null,a),Fr._currentValue=c),Sr(t,n),_n(t,n,r,a),n.child;case 6:return t===null&&Ae&&((t=a=tn)&&(a=RM(a,n.pendingProps,Mi),a!==null?(n.stateNode=a,En=n,tn=null,t=!0):t=!1),t||Xa(n)),null;case 13:return v0(t,n,a);case 4:return k(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Is(n,null,r,a):_n(t,n,r,a),n.child;case 11:return c0(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Sr(t,n),_n(t,n,r,a),n.child;case 8:return _n(t,n,n.pendingProps.children,a),n.child;case 12:return _n(t,n,n.pendingProps.children,a),n.child;case 10:return S0(t,n,a);case 9:return c=n.type._context,r=n.pendingProps.children,Ns(n),c=wn(c),r=r(c),n.flags|=1,_n(t,n,r,a),n.child;case 14:return u0(t,n,n.type,n.pendingProps,a);case 15:return f0(t,n,n.type,n.pendingProps,a);case 19:return ld(t,n,a);case 31:return DS(t,n,a);case 22:return d0(t,n,a,n.pendingProps);case 24:return Ns(n),r=wn(hn),t===null?(c=Af(),c===null&&(c=Je,u=Ef(),c.pooledCache=u,u.refCount++,u!==null&&(c.pooledCacheLanes|=a),c=u),n.memoizedState={parent:r,cache:c},Cf(n),Wa(n,hn,c)):((t.lanes&a)!==0&&(wf(t,n),Oo(n,null,null,a),Lo()),c=t.memoizedState,u=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Wa(n,hn,r)):(r=u.cache,Wa(n,hn,r),r!==c.cache&&bf(n,[hn],a,!0))),_n(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:Ae&&Wl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Sr(t,n),_n(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ta(t){t.flags|=4}function ud(t,n,a,r,c){var u;if((u=(t.mode&32)!==0)&&(u=a===null?Qx(n,r):Qx(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),u){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(ix())t.flags|=8192;else throw Ps=Jl,Rf}else t.flags&=-16777217}function b0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!Jx(n))if(ix())t.flags|=8192;else throw Ps=Jl,Rf}function xc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?fo():536870912,t.lanes|=n,Ar|=n)}function Ho(t,n){if(!Ae)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function en(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&1206910976,r|=c.flags&1206910976,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function LS(t,n,a){var r=n.pendingProps;switch(_f(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return en(n),null;case 1:return en(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Sa(hn),_e(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(pr(n)?Ta(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Sf())),en(n),null;case 26:var c=n.type,u=n.memoizedState;return t===null?(Ta(n),u!==null?(en(n),b0(n,u)):(en(n),ud(n,c,null,r,a))):u?u!==t.memoizedState?(Ta(n),en(n),b0(n,u)):(en(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&Ta(n),en(n),ud(n,c,t,r,a)),null;case 27:if(z(n),a=ot.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return en(n),n.subtreeFlags&=-33554433,null}t=Ue.current,pr(n)?eg(n):(t=kx(c,r,a),n.stateNode=t,Ta(n))}return en(n),n.subtreeFlags&=-33554433,null;case 5:if(z(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return en(n),n.subtreeFlags&=-33554433,null}if(u=Ue.current,pr(n))eg(n);else{var g=Qo(ot.current);switch(u){case 1:u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":u=g.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof r.is=="string"?g.createElement("select",{is:r.is}):g.createElement("select"),r.multiple?u.multiple=!0:r.size&&(u.size=r.size);break;default:u=typeof r.is=="string"?g.createElement(c,{is:r.is}):g.createElement(c)}}u[R]=n,u[W]=r;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)u.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=u;t:switch(Ln(u,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Ta(n)}}return en(n),n.subtreeFlags&=-33554433,ud(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=ot.current,pr(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,c=En,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}t[R]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||Mx(t.nodeValue,a)),t||Xa(n,!0)}else t=Qo(t).createTextNode(r),t[R]=n,n.stateNode=t}return en(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=pr(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[R]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;en(n),t=!1}else a=Sf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(si(n),n):(si(n),null);if((n.flags&128)!==0)throw Error(s(558))}return en(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=pr(n),r!==null&&r.dehydrated!==null){if(t===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[R]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;en(n),c=!1}else c=Sf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(si(n),n):(si(n),null)}return si(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),u=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==c&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),xc(n,n.updateQueue),en(n),null);case 4:return _e(),t===null&&Wd(n.stateNode.containerInfo),n.flags|=67108864,en(n),null;case 10:return Sa(n.type),en(n),null;case 19:if(Pf(n),r=n.memoizedState,r===null)return en(n),null;if(c=(n.flags&128)!==0,u=r.rendering,u===null)if(c)Ho(r,!1);else{if(fn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(u=nc(t),u!==null){for(n.flags|=128,Ho(r,!1),t=u.updateQueue,n.updateQueue=t,xc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Km(a,t),a=a.sibling;return Po(n,Nn.current&1|2),Ae&&_a(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&Xt()>wc&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304)}else{if(!c)if(t=nc(u),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,xc(n,t),Ho(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!u.alternate&&!Ae)return en(n),null}else 2*Xt()-r.renderingStartTime>wc&&a!==536870912&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304);r.isBackwards?(u.sibling=n.child,n.child=u):(t=r.last,t!==null?t.sibling=u:n.child=u,r.last=u)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=Xt(),t.sibling=null,u=Nn.current,u=c?u&1|2:u&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||Ae?Po(n,u):(a=u,ne(Dn,n),ne(Nn,a),Pn===null&&(Pn=n)),Ae&&_a(n,r.treeForkCount),t}return en(n),null;case 22:case 23:return si(n),Lf(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(en(n),n.subtreeFlags&6&&(n.flags|=8192)):en(n),a=n.updateQueue,a!==null&&xc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&Zt(Ls),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Sa(hn),en(n),null;case 25:return null;case 30:return n.flags|=33554432,en(n),null}throw Error(s(156,n.tag))}function OS(t,n){switch(_f(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Sa(hn),_e(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return z(n),null;case 31:if(n.memoizedState!==null){if(si(n),n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(si(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Pf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return _e(),null;case 10:return Sa(n.type),null;case 22:case 23:return si(n),Lf(),t!==null&&Zt(Ls),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Sa(hn),null;case 25:return null;default:return null}}function E0(t,n){switch(_f(n),n.tag){case 3:Sa(hn),_e();break;case 26:case 27:case 5:z(n);break;case 4:_e();break;case 31:n.memoizedState!==null&&si(n);break;case 13:si(n);break;case 19:Pf(n);break;case 10:Sa(n.type);break;case 22:case 23:si(n),Lf(),t!==null&&Zt(Ls);break;case 24:Sa(hn)}}function Go(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&t)===t){r=void 0;var u=a.create,g=a.inst;r=u(),g.destroy=r}a=a.next}while(a!==c)}}catch(C){je(n,n.return,C)}}function $a(t,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var u=c.next;r=u;do{if((r.tag&t)===t){var g=r.inst,C=g.destroy;if(C!==void 0){g.destroy=void 0,c=n;var H=a,tt=C;try{tt()}catch(dt){je(c,H,dt)}}}r=r.next}while(r!==u)}}catch(dt){je(n,n.return,dt)}}function T0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{pg(n,a)}catch(r){je(t,t.return,r)}}}function A0(t,n,a){a.props=Bs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){je(t,n,r)}}function Yi(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var c=t.stateNode,u=ga(t.memoizedProps,c);(c.ref===null||c.ref.name!==u)&&(c.ref=Lx(u)),r=c.ref;break;case 7:if(t.stateNode===null){var g=new ui(t);S(t.child,!1,EM,g,void 0,void 0),t.stateNode=g}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(C){je(t,n,C)}}function Un(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){je(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){je(t,n,c)}else a.current=null}function vc(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)Fx(t.stateNode,n[a])}function R0(t){for(var n=t.return;n!==null&&(dd(n)&&Fx(t.stateNode,n.stateNode),!fd(n));)n=n.return}function Vo(t){for(var n=t.return;n!==null&&(dd(n)&&TM(t.stateNode,n.stateNode),!fd(n));)n=n.return}function fd(t){return t.tag===5||t.tag===3||t.tag===27}function dd(t){return t&&t.tag===7&&t.stateNode!==null}function hd(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){je(t,t.return,c)}}function pd(t,n,a){try{var r=t.stateNode;rM(r,t.type,a,n),r[W]=n}catch(c){je(t,t.return,c)}}function C0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function md(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||C0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function gd(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(c,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(c),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=Wi)),vc(t,r),Te=!0;else if(c!==4&&(c===27&&(vc(t,r),r=null,rs(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(gd(t,n,a,r),t=t.sibling;t!==null;)gd(t,n,a,r),t=t.sibling}function _c(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?a.insertBefore(c,n):a.appendChild(c),vc(t,r),Te=!0;else if(c!==4&&(c===27&&(vc(t,r),r=null,rs(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(_c(t,n,a,r),t=t.sibling;t!==null;)_c(t,n,a,r),t=t.sibling}function w0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Ln(n,r,a),n[R]=t,n[W]=a}catch(u){je(t,t.return,u)}}var yc=!1,ri=null;function D0(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(yc=!0)}var Zi=null;function N0(){var t=Zi;return Zi=null,t}var Zn=0;function Mr(t,n,a,r,c){return Zn=0,U0(t.child,n,a,r,c)}function U0(t,n,a,r,c){for(var u=!1;t!==null;){if(t.tag===5){var g=t.stateNode;if(r!==null){var C=$d(g);r.push(C),C.view&&(u=!0)}else u||$d(g).view&&(u=!0);yc=!0,Nx(g,Zn===0?n:n+"_"+Zn,a),Zn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&c||U0(t.child,n,a,r,c)&&(u=!0));t=t.sibling}return u}function Ki(t,n){for(;t!==null;)t.tag===5?Ux(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Ki(t.child,n)),t=t.sibling}function Sc(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Sc(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=xa(n.default,n.share),n!=="none"&&(Mr(t,a,n,null,!1)||Ki(t.child,!1))}t=t.sibling}}function xd(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,c=ga(r,a),u=xa(r.default,a.paired?r.share:r.enter);u!=="none"?Mr(t,c,u,null,!1)?(Sc(t),a.paired||n||Dr(t,r.onEnter)):Ki(t.child,!1):Sc(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)xd(t,n),t=t.sibling;else Sc(t)}function vd(t){if(ri!==null&&ri.size!==0){var n=ri;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var c=n.get(r);if(c!==void 0){var u=xa(a.default,a.share);if(u!=="none"&&(Mr(t,r,u,null,!1)?(u=t.stateNode,c.paired=u,u.paired=c,Dr(t,a.onShare)):Ki(t.child,!1)),n.delete(r),n.size===0)break}}}vd(t)}t=t.sibling}}}function _d(t){if(t.tag===30){var n=t.memoizedProps,a=ga(n,t.stateNode),r=ri!==null?ri.get(a):void 0,c=xa(n.default,r!==void 0?n.share:n.exit);c!=="none"&&(Mr(t,a,c,null,!1)?r!==void 0?(c=t.stateNode,r.paired=c,c.paired=r,ri.delete(a),Dr(t,n.onShare)):Dr(t,n.onExit):Ki(t.child,!1)),ri!==null&&vd(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)_d(t),t=t.sibling;else ri!==null&&vd(t)}function L0(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=ga(n,t.stateNode);n=xa(n.default,n.update),t.flags&=-5,n!=="none"&&Mr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&L0(t);t=t.sibling}}function yd(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Ki(t.child,!1))}yd(t)}t=t.sibling}}function Mc(t){if(t.tag===30)t.stateNode.paired=null,Ki(t.child,!1),yd(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Mc(t),t=t.sibling;else yd(t)}function O0(t){for(t=t.child;t!==null;)t.tag===30?Ki(t.child,!1):(t.subtreeFlags&33554432)!==0&&O0(t),t=t.sibling}function Sd(t,n,a,r,c,u,g){for(var C=!1;n!==null;){if(n.tag===5){var H=n.stateNode;if(u!==null&&Zn<u.length){var tt=u[Zn],dt=$d(H);(tt.view||dt.view)&&(C=!0);var yt;if(yt=(t.flags&4)===0)if(dt.clip)yt=!0;else{yt=tt.rect;var J=dt.rect;yt=yt.y!==J.y||yt.x!==J.x||yt.height!==J.height||yt.width!==J.width}yt&&(t.flags|=4),dt.abs?dt=!tt.abs:(tt=tt.rect,dt=dt.rect,dt=tt.height!==dt.height||tt.width!==dt.width),dt&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&Nx(H,Zn===0?a:a+"_"+Zn,c),C&&(t.flags&4)!==0||(Zi===null&&(Zi=[]),Zi.push(H,Zn===0?r:r+"_"+Zn,n.memoizedProps)),Zn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&g?t.flags|=n.flags&32:Sd(t,n.child,a,r,c,u,g)&&(C=!0));n=n.sibling}return C}function P0(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,c=ga(a,r),u=xa(a.default,a.update),g;g=t.memoizedState,t.memoizedState=null,r=t;var C=t.child;Zn=0,c=Sd(r,C,c,c,u,g,!1),(t.flags&4)!==0&&c&&Dr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&P0(t);t=t.sibling}}var Tn=!1,Xe=!1,Qi=!1,Md=!1,I0=typeof WeakSet=="function"?WeakSet:Set,An=null,Ji=!1,ko=!1,bc=!1,bd=!1;function PS(t,n,a){if(t=t.containerInfo,Yd=Hr,t=Hm(t),cf(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var c=r.getSelection&&r.getSelection();if(c&&c.rangeCount!==0){r=c.anchorNode;var u=c.anchorOffset,g=c.focusNode;c=c.focusOffset;try{r.nodeType,g.nodeType}catch{r=null;break t}var C=0,H=-1,tt=-1,dt=0,yt=0,J=t,ut=null;e:for(;;){for(var It;J!==r||u!==0&&J.nodeType!==3||(H=C+u),J!==g||c!==0&&J.nodeType!==3||(tt=C+c),J.nodeType===3&&(C+=J.nodeValue.length),(It=J.firstChild)!==null;)ut=J,J=It;for(;;){if(J===t)break e;if(ut===r&&++dt===u&&(H=C),ut===g&&++yt===c&&(tt=C),(It=J.nextSibling)!==null)break;J=ut,ut=J.parentNode}J=It}r=H===-1||tt===-1?null:{start:H,end:tt}}else r=null}r=r||{start:0,end:0}}else r=null;for(Zd={focusedElem:t,selectionRange:r},Hr=!1,a=(a&335544064)===a,An=n,n=a?9270:1024;An!==null;){if(t=An,a&&(r=t.deletions,r!==null))for(u=0;u<r.length;u++)a&&_d(r[u]);if(t.alternate===null&&(t.flags&2)!==0)a&&D0(t),Ec(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&_d(r),Ec(a);continue}else if(r!==null&&r.memoizedState!==null){a&&D0(t),Ec(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,An=r):(a&&L0(t),Ec(a))}}ri=null}function Ec(t){for(;An!==null;){var n=An,a=t,r=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((c&1024)!==0&&r!==null){a=void 0,c=r.memoizedProps,r=r.memoizedState;var u=n.stateNode;try{var g=Bs(n.type,c);a=u.getSnapshotBeforeUpdate(g,r),u.__reactInternalSnapshotBeforeUpdate=a}catch(C){je(n,n.return,C)}}break;case 3:if((c&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)nh(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":nh(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=ga(r.memoizedProps,r.stateNode),c=n.memoizedProps,c=xa(c.default,c.update),c!=="none"&&Mr(r,a,c,r.memoizedState=[],!0));break;default:if((c&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,An=r;break}An=n.return}}function z0(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:$i(t,a),r&4&&Go(5,a);break;case 1:if($i(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){je(a,a.return,g)}else{var c=Bs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){je(a,a.return,g)}}r&64&&T0(a),r&512&&Yi(a,a.return);break;case 3:if($i(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{pg(t,n)}catch(g){je(a,a.return,g)}}break;case 27:n===null&&r&4&&w0(a);case 26:case 5:$i(t,a),n===null&&r&4&&hd(a),r&512&&Yi(a,a.return);break;case 12:$i(t,a);break;case 31:$i(t,a),r&4&&G0(t,a);break;case 13:$i(t,a),r&4&&V0(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=qS.bind(null,a),CM(t,a))));break;case 22:if(r=a.memoizedState!==null||Tn,!r){var u=n!==null&&n.memoizedState!==null||Xe;n=Tn,c=Xe,Tn=r,(Xe=u)&&!c?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),Li(t,a,r)):$i(t,a),Tn=n,Xe=c}break;case 30:$i(t,a),r&512&&Yi(a,a.return);break;case 7:r&512&&Yi(a,a.return);default:$i(t,a)}}function Ed(t,n){for(t=t.child;t!==null;)B0(t,n),t=t.sibling}function B0(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var c=t.stateNode,u=t.memoizedProps.style,g=u!=null&&u.hasOwnProperty("display")?u.display:null;c.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(H){je(t,t.return,H)}Td(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Te=!0}catch(H){je(t,t.return,H)}break;case 18:try{var C=t.stateNode;n?Dx(C,!0):Dx(t.stateNode,!1)}catch(H){je(t,t.return,H)}break;case 22:case 23:t.memoizedState===null&&Ed(t,n);break;default:Ed(t,n)}}function Td(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:B0(a,r);break t;case 22:a.memoizedState===null&&Td(a,r);break t;default:Td(a,r)}}t=t.sibling}}function F0(t){var n=t.alternate;n!==null&&(t.alternate=null,F0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&Kt(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var an=null,Kn=!1;function Ni(t,n,a){for(a=a.child;a!==null;)H0(t,n,a),a=a.sibling}function H0(t,n,a){if(Vt&&typeof Vt.onCommitFiberUnmount=="function")try{Vt.onCommitFiberUnmount(Jt,a)}catch{}switch(a.tag){case 26:Xe||Un(a,n),Ni(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!Xe&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Xe||Un(a,n),Vo(a);var r=an,c=Kn;rs(a.type)&&(an=a.stateNode,Kn=!1),Ni(t,n,a),Xx(a.stateNode,a.type,a.memoizedProps),an=r,Kn=c;break;case 5:Xe||Un(a,n),Vo(a);case 6:if(a.tag===6&&Vo(a),r=an,c=Kn,an=null,Ni(t,n,a),an=r,Kn=c,an!==null)if(Kn)try{(an.nodeType===9?an.body:an.nodeName==="HTML"?an.ownerDocument.body:an).removeChild(a.stateNode),Te=!0}catch(u){je(a,n,u)}else try{an.removeChild(a.stateNode),Te=!0}catch(u){je(a,n,u)}break;case 18:an!==null&&(Kn?(t=an,wx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Gr(t)):wx(an,a.stateNode));break;case 4:r=an,c=Kn,an=a.stateNode.containerInfo,Kn=!0,Ni(t,n,a),an=r,Kn=c;break;case 0:case 11:case 14:case 15:$a(2,a,n),Xe||$a(4,a,n),Ni(t,n,a);break;case 1:Xe||(Un(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&A0(a,n,r)),Ni(t,n,a);break;case 21:Ni(t,n,a);break;case 22:Xe=(r=Xe)||a.memoizedState!==null,Ni(t,n,a),Xe=r;break;case 30:Un(a,n),Ni(t,n,a);break;case 7:Xe||Un(a,n),Ni(t,n,a);break;default:Ni(t,n,a)}}function G0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Gr(t)}catch(a){je(n,n.return,a)}}}function V0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Gr(t)}catch(a){je(n,n.return,a)}}function IS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new I0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new I0),n;default:throw Error(s(435,t.tag))}}function Tc(t,n){var a=IS(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=YS.bind(null,t,r);r.then(c,c)}})}function kn(t,n,a){var r=n.deletions;if(r!==null)for(var c=0;c<r.length;c++){var u=r[c],g=t,C=n,H=C;t:for(;H!==null;){switch(H.tag){case 27:if(rs(H.type)){an=H.stateNode,Kn=!1;break t}break;case 5:an=H.stateNode,Kn=!1;break t;case 3:case 4:an=H.stateNode.containerInfo,Kn=!0;break t}H=H.return}if(an===null)throw Error(s(160));H0(g,C,u),an=null,Kn=!1,g=u.alternate,g!==null&&(g.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)k0(n,t,a),n=n.sibling}var Ui=null;function k0(t,n,a){var r=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(c&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var u=0;u<r.length;u++){var g=r[u];g.ref.impl=g.nextImpl}kn(n,t,a),Xn(t),c&4&&($a(3,t,t.return),Go(3,t),$a(5,t,t.return));break;case 1:kn(n,t,a),Xn(t),c&512&&(Xe||r===null||Un(r,r.return)),c&64&&Tn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(u=Ui,kn(n,t,a),Xn(t),c&512&&(Xe||r===null||Un(r,r.return)),c&4)if(c=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(Tn)t.stateNode=Ax(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,c=u.ownerDocument||u;e:switch(n){case"title":r=c.getElementsByTagName("title")[0],(!r||r[Pt]||r[R]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=c.createElement(n),c.head.insertBefore(r,c.querySelector("head > title"))),Ln(r,n,a),r[R]=t,Ee(r),n=r;break t;case"link":if(u=Kx("link","href",c).get(n+(a.href||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(g,1);break e}}r=c.createElement(n),Ln(r,n,a),c.head.appendChild(r);break;case"meta":if(u=Kx("meta","content",c).get(n+(a.content||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(g,1);break e}}r=c.createElement(n),Ln(r,n,a),c.head.appendChild(r);break;default:throw Error(s(468,n))}r[R]=t,Ee(r),n=r}t.stateNode=n}else Tn||ch(u,t.type,t.stateNode);else t.stateNode=Zx(u,a,t.memoizedProps);else c!==a?(c===null?(n=r.stateNode,n===null||Xe||n.parentNode.removeChild(n)):c.count--,a===null?Tn||ch(u,t.type,t.stateNode):Zx(u,a,t.memoizedProps)):a===null&&t.stateNode!==null&&pd(t,t.memoizedProps,r.memoizedProps);break;case 27:kn(n,t,a),Xn(t),c&512&&(Xe||r===null||Un(r,r.return)),r!==null&&c&4&&pd(t,t.memoizedProps,r.memoizedProps);break;case 5:if(u=Qi,Qi=!1,kn(n,t,a),Qi=u,Xn(t),c&512&&(Xe||r===null||Un(r,r.return)),t.flags&32){n=t.stateNode;try{ar(n,""),Te=!0}catch(dt){je(t,t.return,dt)}}c&4&&t.stateNode!=null&&(n=t.memoizedProps,pd(t,n,r!==null?r.memoizedProps:n)),c&1024&&(Md=!0);break;case 6:if(kn(n,t,a),Xn(t),c&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Te=!0}catch(dt){je(t,t.return,dt)}}break;case 3:if(Te=!1,Hc=null,u=Ui,Ui=Jo(n.containerInfo),kn(n,t,a),Ui=u,Xn(t),c&4&&r!==null&&r.memoizedState.isDehydrated)try{Gr(n.containerInfo)}catch(dt){je(t,t.return,dt)}Md&&(Md=!1,X0(t)),Te=!1;break;case 4:c=Qi,Qi=Tn,r=Ge(),u=Ui,Ui=Jo(t.stateNode.containerInfo),kn(n,t,a),Xn(t),Ui=u,Te&&ko&&(bc=!0),Te=r,Qi=c;break;case 12:kn(n,t,a),Xn(t);break;case 31:kn(n,t,a),Xn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tc(t,n)));break;case 13:kn(n,t,a),Xn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(Cc=Xt()),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tc(t,n)));break;case 22:u=t.memoizedState!==null,g=r!==null&&r.memoizedState!==null;var C=Tn,H=Xe,tt=Qi;Tn=C||u,Qi=tt||u,Xe=H||g,kn(n,t,a),Xe=H,Qi=tt,Tn=C,Xn(t),c&8192&&(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,!u||r===null||g||Tn||Xe||(n=g||Xe,a=Tn,r=Xe,Tn=u||Tn,Xe=n,ts(t,2),Tn=a,Xe=r),!u&&Qi||Ed(t,u)),c&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Tc(t,a))));break;case 19:kn(n,t,a),Xn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Tc(t,n)));break;case 30:c&512&&(Xe||r===null||Un(r,r.return)),c=Ge(),u=ko,g=(a&335544064)===a,C=t.memoizedProps,ko=g&&xa(C.default,C.update)!=="none",kn(n,t,a),Xn(t),g&&r!==null&&Te&&(t.flags|=4),ko=u,Te=c;break;case 21:break;case 7:c&512&&(Xe||r===null||Un(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:kn(n,t,a),Xn(t)}}function Xn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(C0(r)){a=r;break}r=r.return}r=null;for(var c=t.return;c!==null;){if(dd(c)){var u=c.stateNode;r===null?r=[u]:r.push(u)}if(fd(c))break;c=c.return}var g=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var C=a.stateNode,H=md(t);_c(t,H,C,g);break;case 5:var tt=a.stateNode;a.flags&32&&(ar(tt,""),a.flags&=-33);var dt=md(t);_c(t,dt,tt,g);break;case 3:case 4:var yt=a.stateNode.containerInfo,J=md(t);gd(t,J,yt,g);break;default:throw Error(s(161))}}catch(ut){je(t,t.return,ut)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function X0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;X0(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Hr=!0,n.reset(),Hr=!1),t=t.sibling}}function br(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)W0(n,t),n=n.sibling;else P0(n)}function W0(t,n){var a=t.alternate;if(a===null)xd(t,!1);else switch(t.tag){case 3:if(bd=Ji=!1,N0(),br(n,t),!Ji&&!bc){if(t=Zi,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var c=t[r+1];Ux(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+c+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),bd=!0}Zi=null;break;case 5:br(n,t);break;case 4:r=Ji,Ji=!1,br(n,t),Ji&&(bc=!0),Ji=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?xd(t,!1):br(n,t));break;case 30:r=Ji,c=N0(),Ji=!1,br(n,t),Ji&&(t.flags|=4);var u=t.memoizedProps,g=t.stateNode;n=ga(u,g),g=ga(a.memoizedProps,g);var C=xa(u.default,u.update);C==="none"?n=!1:(u=a.memoizedState,a.memoizedState=null,a=t.child,Zn=0,n=Sd(t,a,n,g,C,u,!0),Zn!==(u===null?0:u.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Dr(t,t.memoizedProps.onUpdate),Zi=c):c!==null&&(c.push.apply(c,Zi),Zi=c),Ji=(t.flags&32)!==0?!0:r;break;default:br(n,t)}}function $i(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)z0(t,n.alternate,n),n=n.sibling}function ts(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:$a(4,a,a.return),ts(a,r);break;case 1:Un(a,a.return);var c=a.stateNode;typeof c.componentWillUnmount=="function"&&A0(a,a.return,c),ts(a,r);break;case 27:(r&2)!==0&&Xx(a.stateNode,a.type,a.memoizedProps);case 5:Un(a,a.return),a.tag!==5&&a.tag!==27||Vo(a),ts(a,r);break;case 6:Vo(a);break;case 26:Un(a,a.return),c=a.stateNode,a.memoizedState!==null||c===null||Xe||c.parentNode.removeChild(c),ts(a,r);break;case 22:a.memoizedState===null&&ts(a,r);break;case 30:Un(a,a.return),ts(a,r);break;case 7:Un(a,a.return);default:ts(a,r)}t=t.sibling}}function Li(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,c=t,u=n,g=u.flags,C=(a&1)!==0;switch(u.tag){case 0:case 11:case 15:Li(c,u,a),Go(4,u);break;case 1:if(Li(c,u,a),r=u,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(dt){je(r,r.return,dt)}if(r=u,c=r.updateQueue,c!==null){var H=r.stateNode;try{var tt=c.shared.hiddenCallbacks;if(tt!==null)for(c.shared.hiddenCallbacks=null,c=0;c<tt.length;c++)hg(tt[c],H)}catch(dt){je(r,r.return,dt)}}C&&g&64&&T0(u),Yi(u,u.return);break;case 27:(a&2)!==0&&w0(u);case 5:u.tag!==5&&u.tag!==27||R0(u),Li(c,u,a),C&&r===null&&g&4&&hd(u),Yi(u,u.return);break;case 6:R0(u);break;case 26:H=u.stateNode,u.memoizedState!==null||H===null||Tn||ch(Jo(H.ownerDocument),u.type,H),Li(c,u,a),C&&r===null&&g&4&&hd(u),Yi(u,u.return);break;case 12:Li(c,u,a);break;case 31:Li(c,u,a),C&&g&4&&G0(c,u);break;case 13:Li(c,u,a),C&&g&4&&V0(c,u);break;case 22:u.memoizedState===null&&Li(c,u,a),Yi(u,u.return);break;case 30:Li(c,u,a),Yi(u,u.return);break;case 7:Yi(u,u.return);default:Li(c,u,a)}n=n.sibling}}function Ad(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Co(a))}function Rd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Co(t))}function bi(t,n,a,r){var c=(a&335544064)===a;if(n.subtreeFlags&(c?10262:10256))for(n=n.child;n!==null;)j0(t,n,a,r),n=n.sibling;else c&&O0(n)}function j0(t,n,a,r){var c=(a&335544064)===a;c&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&Mc(n);var u=n.flags;switch(n.tag){case 0:case 11:case 15:bi(t,n,a,r),u&2048&&Go(9,n);break;case 1:bi(t,n,a,r);break;case 3:bi(t,n,a,r),c&&bd&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),u&2048&&(u=null,n.alternate!==null&&(u=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==u&&(n.refCount++,u!=null&&Co(u)));break;case 12:if(u&2048){bi(t,n,a,r),u=n.stateNode;try{var g=n.memoizedProps,C=g.id,H=g.onPostCommit;typeof H=="function"&&H(C,n.alternate===null?"mount":"update",u.passiveEffectDuration,-0)}catch(tt){je(n,n.return,tt)}}else bi(t,n,a,r);break;case 31:bi(t,n,a,r);break;case 13:bi(t,n,a,r);break;case 23:break;case 22:g=n.stateNode,C=n.alternate,n.memoizedState!==null?(c&&C!==null&&C.memoizedState===null&&Mc(C),g._visibility&2?bi(t,n,a,r):Xo(t,n)):(c&&C!==null&&C.memoizedState!==null&&Mc(n),g._visibility&2?bi(t,n,a,r):(g._visibility|=2,Er(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),u&2048&&Ad(C,n);break;case 24:bi(t,n,a,r),u&2048&&Rd(n.alternate,n);break;case 30:c&&(u=n.alternate,u!==null&&(Ki(u.child,!0),Ki(n.child,!0))),bi(t,n,a,r);break;default:bi(t,n,a,r)}}function Er(t,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var u=t,g=n,C=a,H=r,tt=g.flags;switch(g.tag){case 0:case 11:case 15:Er(u,g,C,H,c),Go(8,g);break;case 23:break;case 22:var dt=g.stateNode;g.memoizedState!==null?dt._visibility&2?Er(u,g,C,H,c):Xo(u,g):(dt._visibility|=2,Er(u,g,C,H,c)),c&&tt&2048&&Ad(g.alternate,g);break;case 24:Er(u,g,C,H,c),c&&tt&2048&&Rd(g.alternate,g);break;default:Er(u,g,C,H,c)}n=n.sibling}}function Xo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,c=r.flags;switch(r.tag){case 22:Xo(a,r),c&2048&&Ad(r.alternate,r);break;case 24:Xo(a,r),c&2048&&Rd(r.alternate,r);break;default:Xo(a,r)}n=n.sibling}}var Fs=8192;function Hs(t,n,a){if(t.subtreeFlags&Fs)for(t=t.child;t!==null;)q0(t,n,a),t=t.sibling}function q0(t,n,a){switch(t.tag){case 26:Hs(t,n,a),t.flags&Fs&&(t.memoizedState!==null?VM(a,Ui,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&tv(a,t)));break;case 5:Hs(t,n,a),t.flags&Fs&&(t=t.stateNode,(n&335544128)===n&&tv(a,t));break;case 3:case 4:var r=Ui;Ui=Jo(t.stateNode.containerInfo),Hs(t,n,a),Ui=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Fs,Fs=16777216,Hs(t,n,a),Fs=r):Hs(t,n,a));break;case 30:if((t.flags&Fs)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var c=t.stateNode;c.paired=null,ri===null&&(ri=new Map),ri.set(r,c)}Hs(t,n,a);break;default:Hs(t,n,a)}}function Y0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Wo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,K0(r,t)}Y0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Z0(t),t=t.sibling}function Z0(t){switch(t.tag){case 0:case 11:case 15:Wo(t),t.flags&2048&&$a(9,t,t.return);break;case 3:Wo(t);break;case 12:Wo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Ac(t)):Wo(t);break;default:Wo(t)}}function Ac(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,K0(r,t)}Y0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:$a(8,n,n.return),Ac(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Ac(n));break;default:Ac(n)}t=t.sibling}}function K0(t,n){for(;An!==null;){var a=An;switch(a.tag){case 0:case 11:case 15:$a(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Co(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,An=r;else t:for(a=t;An!==null;){r=An;var c=r.sibling,u=r.return;if(F0(r),r===a){An=null;break t}if(c!==null){c.return=u,An=c;break t}An=u}}}var zS={getCacheForType:function(t){var n=wn(hn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return wn(hn).controller.signal}},BS=typeof WeakMap=="function"?WeakMap:Map,Ve=0,Je=null,we=null,Oe=0,We=0,oi=null,es=!1,Tr=!1,Cd=!1,Aa=0,fn=0,ns=0,Gs=0,Rc=0,li=0,Ar=0,jo=null,Qn=null,wd=!1,Cc=0,Q0=0,wc=1/0,Dc=null,is=null,rn=0,Oi=null,Vs=null,ta=0,Dd=0,Nd=null,J0=null,Rr=null,Cr=null,wr=null,qo=0,Nc=null;function ci(){return(Ve&2)!==0&&Oe!==0?Oe&-Oe:gt.T!==null?Gd():wl()}function $0(){if(li===0)if((Oe&536870912)===0||Ae){var t=Ss;Ss<<=1,(Ss&3932160)===0&&(Ss=262144),li=t}else li=536870912;return t=Dn.current,t!==null&&(t.flags|=32),li}function Dr(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=Lx(ga(t.memoizedProps,a))),Cr===null&&(Cr=[]),Cr.push(n.bind(null,r))}}function Jn(t,n,a){(t===Je&&(We===2||We===9)||t.cancelPendingCommit!==null)&&(Nr(t,0),as(t,Oe,li,!1)),ki(t,a),((Ve&2)===0||t!==Je)&&(t===Je&&((Ve&2)===0&&(Gs|=a),fn===4&&as(t,Oe,li,!1)),ea(t))}function tx(t,n,a){if((Ve&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Fa(t,n),c=r?GS(t,n):Ld(t,n,!0),u=r;do{if(c===0){Tr&&!r&&as(t,n,0,!1);break}else{if(a=t.current.alternate,u&&!FS(a)){c=Ld(t,n,!1),u=!1;continue}if(c===2){if(u=n,t.errorRecoveryDisabledLanes&u)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var C=t;c=jo;var H=C.current.memoizedState.isDehydrated;if(H&&(Nr(C,g).flags|=256),g=Ld(C,g,!1),g!==2&&g!==6){if(Cd&&!H){C.errorRecoveryDisabledLanes|=u,Gs|=u,c=4;break t}u=Qn,Qn=c,u!==null&&(Qn===null?Qn=u:Qn.push.apply(Qn,u))}c=g}if(u=!1,c!==2)continue}}if(c===1){Nr(t,0),as(t,n,0,!0);break}t:{switch(r=t,u=c,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:as(r,n,li,!es);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=Cc+300-Xt(),10<c)){if(as(r,n,li,!es),Ms(r,0,!0)!==0)break t;ta=n,r.timeoutHandle=Jd(ex.bind(null,r,a,Qn,Dc,wd,n,li,Gs,Ar,es,u,"Throttled",-0,0),c);break t}ex(r,a,Qn,Dc,wd,n,li,Gs,Ar,es,u,null,-0,0)}}break}while(!0);ea(t)}function ex(t,n,a,r,c,u,g,C,H,tt,dt,yt,J,ut){t.timeoutHandle=-1;var It=n.subtreeFlags,Qt=(u&335544064)===u;if(yt=null,(Qt||It&8192||(It&16785408)===16785408)&&(yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Wi},ri=null,q0(n,u,yt),Qt&&(It=yt,Qt=t.containerInfo,Qt=(Qt.nodeType===9?Qt:Qt.ownerDocument).__reactViewTransition,Qt!=null&&(It.count++,It.waitingForViewTransition=!0,It=el.bind(It),Qt.finished.then(It,It))),It=(u&62914560)===u?Cc-Xt():(u&4194048)===u?Q0-Xt():0,It=kM(yt,It),It!==null)){ta=u,t.cancelPendingCommit=It(cx.bind(null,t,n,u,a,r,c,g,C,H,tt,dt,yt,null,J,ut)),as(t,u,g,!tt);return}cx(t,n,u,a,r,c,g,C,H,tt,dt,yt)}function FS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],u=c.getSnapshot;c=c.value;try{if(!ai(u(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function as(t,n,a,r){n=Vi(t,n),n&=~Rc,n&=~Gs,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var c=n;0<c;){var u=31-ge(c),g=1<<u;r[u]=-1,c&=~g}a!==0&&bs(t,a,n)}function Uc(){return(Ve&6)===0?(Yo(0),!1):!0}function Ud(){if(we!==null){if(We===0)var t=we.return;else t=we,ya=ws=null,Hf(t),xr=null,No=0,t=we;for(;t!==null;)E0(t.alternate,t),t=t.return;we=null}}function Nr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,cM(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ta=0,Ud(),Je=t,we=a=va(t.current,null),Oe=n,We=0,oi=null,es=!1,Tr=Fa(t,n),Cd=!1,Ar=li=Rc=Gs=ns=fn=0,Qn=jo=null,wd=!1,Aa=Vi(t,n),Hl(),a}function nx(t,n){ye=null,gt.H=fc,n===gr||n===Ql?(n=cg(),We=3):n===Rf?(n=cg(),We=4):We=n===ed?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,oi=n,we===null&&(fn=1,dc(t,_i(n,t.current)))}function ix(){var t=Dn.current;return t===null?!0:(Oe&4194048)===Oe?Pn===null:(Oe&62914560)===Oe||(Oe&536870912)!==0?t===Pn:!1}function ax(){var t=gt.H;return gt.H=fc,t===null?fc:t}function sx(){var t=gt.A;return gt.A=zS,t}function Lc(){fn=4,es||(Oe&4194048)!==Oe&&Dn.current!==null||(Tr=!0),(ns&134217727)===0&&(Gs&134217727)===0||Je===null||as(Je,Oe,li,!1)}function Ld(t,n,a){var r=Ve;Ve|=2;var c=ax(),u=sx();(Je!==t||Oe!==n)&&(Dc=null,Nr(t,n)),n=!1;var g=fn;t:do try{if(We!==0&&we!==null){var C=we,H=oi;switch(We){case 8:Ud(),g=6;break t;case 3:case 2:case 9:case 6:Dn.current===null&&(n=!0);var tt=We;if(We=0,oi=null,Ur(t,C,H,tt),a&&Tr){g=0;break t}break;default:tt=We,We=0,oi=null,Ur(t,C,H,tt)}}HS(),g=fn;break}catch(dt){nx(t,dt)}while(!0);return n&&t.shellSuspendCounter++,ya=ws=null,Ve=r,gt.H=c,gt.A=u,we===null&&(Je=null,Oe=0,Hl()),g}function HS(){for(;we!==null;)rx(we)}function GS(t,n){var a=Ve;Ve|=2;var r=ax(),c=sx();Je!==t||Oe!==n?(Dc=null,wc=Xt()+500,Nr(t,n)):Tr=Fa(t,n);t:do try{if(We!==0&&we!==null){n=we;var u=oi;e:switch(We){case 1:We=0,oi=null,Ur(t,n,u,1);break;case 2:case 9:if(og(u)){We=0,oi=null,ox(n);break}n=function(){We!==2&&We!==9||Je!==t||(We=7),ea(t)},u.then(n,n);break t;case 3:We=7;break t;case 4:We=5;break t;case 7:og(u)?(We=0,oi=null,ox(n)):(We=0,oi=null,Ur(t,n,u,7));break;case 5:var g=null;switch(we.tag){case 26:g=we.memoizedState;case 5:case 27:var C=we;if(g?Jx(g):C.stateNode.complete){We=0,oi=null;var H=C.sibling;if(H!==null)we=H;else{var tt=C.return;tt!==null?(we=tt,Oc(tt)):we=null}break e}}We=0,oi=null,Ur(t,n,u,5);break;case 6:We=0,oi=null,Ur(t,n,u,6);break;case 8:Ud(),fn=6;break t;default:throw Error(s(462))}}VS();break}catch(dt){nx(t,dt)}while(!0);return ya=ws=null,gt.H=r,gt.A=c,Ve=a,we!==null?0:(Je=null,Oe=0,Hl(),fn)}function VS(){for(;we!==null&&!Bt();)rx(we)}function rx(t){var n=M0(t.alternate,t,Aa);t.memoizedProps=t.pendingProps,n===null?Oc(t):we=n}function ox(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=m0(a,n,n.pendingProps,n.type,void 0,Oe);break;case 11:n=m0(a,n,n.pendingProps,n.type.render,n.ref,Oe);break;case 5:Hf(n);var r=n;r===En&&(Ae?(jl(r),r.tag===5&&r.stateNode!=null&&(tn=r.stateNode)):(jl(r),Ae=!0));default:E0(a,n),n=we=Km(n,Aa),n=M0(a,n,Aa)}t.memoizedProps=t.pendingProps,n===null?Oc(t):we=n}function Ur(t,n,a,r){ya=ws=null,Hf(n),xr=null,No=0;var c=n.return;try{if(wS(t,c,n,a,Oe)){fn=1,dc(t,_i(a,t.current)),we=null;return}}catch(u){if(c!==null)throw we=c,u;fn=1,dc(t,_i(a,t.current)),we=null;return}n.flags&32768?(Ae||r===1?t=!0:Tr||(Oe&536870912)!==0?t=!1:(es=t=!0,(r===2||r===9||r===3||r===6)&&(r=Dn.current,r!==null&&r.tag===13&&(r.flags|=16384))),lx(n,t)):Oc(n)}function Oc(t){var n=t;do{if((n.flags&32768)!==0){lx(n,es);return}t=n.return;var a=LS(n.alternate,n,Aa);if(a!==null){we=a;return}if(n=n.sibling,n!==null){we=n;return}we=n=t}while(n!==null);fn===0&&(fn=5)}function lx(t,n){do{var a=OS(t.alternate,t);if(a!==null){a.flags&=32767,we=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){we=t;return}we=t=a}while(t!==null);fn=6,we=null}function cx(t,n,a,r,c,u,g,C,H,tt,dt,yt){t.cancelPendingCommit=null;do Pc();while(rn!==0);if((Ve&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===Je&&(we=Je=null,Oe=0),Vs=n,Oi=t,ta=a,Nd=c,J0=r,kS(t,n,a,g,C,H,yt)}}function kS(t,n,a,r,c,u,g){var C=n.lanes|n.childLanes;if(Dd=C,C|=pf,Cl(t,a,C,r,c,u),Cr=null,(a&335544064)===a?(wr=xS(t),r=10262):(wr=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,ZS(Nt,function(){return zd(),null})):(t.callbackNode=null,t.callbackPriority=0),yc=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null,c=Tt.p,Tt.p=2,u=Ve,Ve|=4;try{PS(t,n,a)}finally{Ve=u,Tt.p=c,gt.T=r}}rn=1,yc?Rr=mM(g,t.containerInfo,wr,Od,Pd,WS,Id,zd,XS):(Od(),Pd(),Id())}function XS(t){if(rn!==0){var n=Oi.onRecoverableError;n(t,{componentStack:null})}}function WS(){rn===3&&(rn=0,W0(Vs,Oi),rn=4)}function Od(){if(rn===1){rn=0;var t=Oi,n=Vs,a=ta,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null;var c=Tt.p;Tt.p=2;var u=Ve;Ve|=4;try{ko=bc=!1,k0(n,t,a),a=Zd;var g=Hm(t.containerInfo),C=a.focusedElem,H=a.selectionRange;if(g!==C&&C&&C.ownerDocument&&Fm(C.ownerDocument.documentElement,C)){if(H!==null&&cf(C)){var tt=H.start,dt=H.end;if(dt===void 0&&(dt=tt),"selectionStart"in C)C.selectionStart=tt,C.selectionEnd=Math.min(dt,C.value.length);else{var yt=C.ownerDocument||document,J=yt&&yt.defaultView||window;if(J.getSelection){var ut=J.getSelection(),It=C.textContent.length,Qt=Math.min(H.start,It),Se=H.end===void 0?Qt:Math.min(H.end,It);!ut.extend&&Qt>Se&&(g=Se,Se=Qt,Qt=g);var $=Bm(C,Qt),q=Bm(C,Se);if($&&q&&(ut.rangeCount!==1||ut.anchorNode!==$.node||ut.anchorOffset!==$.offset||ut.focusNode!==q.node||ut.focusOffset!==q.offset)){var st=yt.createRange();st.setStart($.node,$.offset),ut.removeAllRanges(),Qt>Se?(ut.addRange(st),ut.extend(q.node,q.offset)):(st.setEnd(q.node,q.offset),ut.addRange(st))}}}}for(yt=[],ut=C;ut=ut.parentNode;)ut.nodeType===1&&yt.push({element:ut,left:ut.scrollLeft,top:ut.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<yt.length;C++){var _t=yt[C];_t.element.scrollLeft=_t.left,_t.element.scrollTop=_t.top}}Hr=!!Yd,Zd=Yd=null}finally{Ve=u,Tt.p=c,gt.T=r}}t.current=n,rn=2}}function Pd(){if(rn===2){rn=0;var t=Oi,n=Vs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=gt.T,gt.T=null;var r=Tt.p;Tt.p=2;var c=Ve;Ve|=4;try{z0(t,n.alternate,n)}finally{Ve=c,Tt.p=r,gt.T=a}}rn=3}}function Id(){if(rn===4||rn===3){rn=0;var t=Rr;Rr=null,zt();var n=Oi,a=Vs,r=ta,c=J0,u=(r&335544064)===r?10262:10256;if((a.subtreeFlags&u)!==0||(a.flags&u)!==0?rn=5:(rn=0,Vs=Oi=null,ux(n,n.pendingLanes)),u=n.pendingLanes,u===0&&(is=null),go(r),a=a.stateNode,Vt&&typeof Vt.onCommitFiberRoot=="function")try{Vt.onCommitFiberRoot(Jt,a,void 0,(a.current.flags&128)===128)}catch{}if(c!==null){a=gt.T,u=Tt.p,Tt.p=2,gt.T=null;try{for(var g=n.onRecoverableError,C=0;C<c.length;C++){var H=c[C];g(H.value,{componentStack:H.stack})}}finally{gt.T=a,Tt.p=u}}if(c=Cr,g=wr,wr=null,c!==null&&(Cr=null,g===null&&(g=[]),t!==null))for(H=0;H<c.length;H++)a=(0,c[H])(g),a!==void 0&&t.finished.finally(a);(ta&3)!==0&&Pc(),ea(n),u=n.pendingLanes,(r&261930)!==0&&(u&42)!==0?n===Nc?qo++:(qo=0,Nc=n):(qo=0,Nc=null),Yo(0)}}function ux(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Co(n)))}function Pc(){return Rr!==null&&(Rr.skipTransition(),Rr=null),Od(),Pd(),Id(),zd()}function zd(){if(rn!==5)return!1;var t=Oi,n=Dd;Dd=0;var a=go(ta),r=gt.T,c=Tt.p;try{Tt.p=32>a?32:a,gt.T=null,a=Nd,Nd=null;var u=Oi,g=ta;if(rn=0,Vs=Oi=null,ta=0,(Ve&6)!==0)throw Error(s(331));var C=Ve;if(Ve|=4,Z0(u.current),j0(u,u.current,g,a),Ve=C,Yo(0,!1),Vt&&typeof Vt.onPostCommitFiberRoot=="function")try{Vt.onPostCommitFiberRoot(Jt,u)}catch{}return!0}finally{Tt.p=c,gt.T=r,ux(t,n)}}function fx(t,n,a){n=_i(a,n),n=td(t.stateNode,n,2),t=Za(t,n,2),t!==null&&(ki(t,2),ea(t))}function je(t,n,a){if(t.tag===3)fx(t,t,a);else for(;n!==null;){if(n.tag===3){fx(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(is===null||!is.has(r))){t=_i(a,t),a=o0(2),r=Za(n,a,2),r!==null&&(l0(a,r,n,t),ki(r,2),ea(r));break}}n=n.return}}function Bd(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new BS;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(Cd=!0,c.add(a),t=jS.bind(null,t,n,a),n.then(t,t))}function jS(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Je===t&&(Oe&a)===a&&((fn===4||fn===3&&(Oe&62914560)===Oe&&300>Xt()-Cc)&&(Ve&2)===0?Nr(t,0):Rc|=a,Ar===Oe&&(Ar=0)),ea(t)}function dx(t,n){n===0&&(n=fo()),t=As(t,n),t!==null&&(ki(t,n),ea(t))}function qS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),dx(t,a)}function YS(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),dx(t,a)}function ZS(t,n){return Ut(t,n)}var Lr=null,Or=null,Fd=!1,Ic=!1,Hd=!1,ss=0;function ea(t){t!==Or&&t.next===null&&(Or===null?Lr=Or=t:Or=Or.next=t),Ic=!0,Fd||(Fd=!0,QS())}function Yo(t,n){if(!Hd&&Ic){Hd=!0;do for(var a=!1,r=Lr;r!==null;){if(t!==0){var c=r.pendingLanes;if(c===0)var u=0;else{var g=r.suspendedLanes,C=r.pingedLanes;u=(1<<31-ge(42|t)+1)-1,u&=c&~(g&~C),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,gx(r,u))}else u=Oe,u=Ms(r,r===Je?u:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(u&3)===0||Fa(r,u)||(a=!0,gx(r,u));r=r.next}while(a);Hd=!1}}function KS(){hx()}function hx(){Ic=Fd=!1;var t=0;ss!==0&&lM()&&(t=ss);for(var n=Xt(),a=null,r=Lr;r!==null;){var c=r.next,u=px(r,n);u===0?(r.next=null,a===null?Lr=c:a.next=c,c===null&&(Or=a)):(a=r,(t!==0||(u&3)!==0)&&(Ic=!0)),r=c}rn!==0&&rn!==5||Yo(t),ss!==0&&(ss=0)}function px(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,c=t.expirationTimes,u=t.pendingLanes&-62914561;0<u;){var g=31-ge(u),C=1<<g,H=c[g];H===-1?((C&a)===0||(C&r)!==0)&&(c[g]=uo(C,n)):H<=n&&(t.expiredLanes|=C),u&=~C}if(n=Je,a=Oe,a=Ms(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(We===2||We===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&$t(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Fa(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&$t(r),go(a)){case 2:case 8:a=K;break;case 32:a=Nt;break;case 268435456:a=Ot;break;default:a=Nt}return r=mx.bind(null,t),a=Ut(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&$t(r),t.callbackPriority=2,t.callbackNode=null,2}function mx(t,n){if(rn!==0&&rn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Pc()&&t.callbackNode!==a)return null;var r=Oe;return r=Ms(t,t===Je?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(tx(t,r,n),px(t,Xt()),t.callbackNode!=null&&t.callbackNode===a?mx.bind(null,t):null)}function gx(t,n){if(Pc())return null;tx(t,n,!0)}function QS(){uM(function(){(Ve&6)!==0?Ut(me,KS):hx()})}function Gd(){if(ss===0){var t=Us;t===0&&(t=er,er<<=1,(er&261888)===0&&(er=256)),ss=t}return ss}function xx(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ul(t)}function JS(t,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var u=xx((c[W]||null).action),g=r.submitter;g&&(n=(n=g[W]||null)?xx(n.formAction):g.getAttribute("formAction"),n!==null&&(u=n,g=null));var C=new Il("action","action",null,r,c);t.push({event:C,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ss!==0){var H=new FormData(c,g);Zf(a,{pending:!0,data:H,method:c.method,action:u},null,H)}}else typeof u=="function"&&(C.preventDefault(),H=new FormData(c,g),Zf(a,{pending:!0,data:H,method:c.method,action:u},u,H))},currentTarget:c}]})}}for(var Vd=0;Vd<hf.length;Vd++){var kd=hf[Vd],$S=kd.toLowerCase(),tM=kd[0].toUpperCase()+kd.slice(1);Di($S,"on"+tM)}Di(km,"onAnimationEnd"),Di(Xm,"onAnimationIteration"),Di(Wm,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(cS,"onTransitionRun"),Di(uS,"onTransitionStart"),Di(fS,"onTransitionCancel"),Di(jm,"onTransitionEnd"),ln("onMouseEnter",["mouseout","mouseover"]),ln("onMouseLeave",["mouseout","mouseover"]),ln("onPointerEnter",["pointerout","pointerover"]),ln("onPointerLeave",["pointerout","pointerover"]),Ht("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ht("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ht("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ht("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ht("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ht("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),eM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zo));function vx(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],c=r.event;r=r.listeners;t:{var u=void 0;if(n)for(var g=r.length-1;0<=g;g--){var C=r[g],H=C.instance,tt=C.currentTarget;if(C=C.listener,H!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=tt;try{u(c)}catch(dt){Fl(dt)}c.currentTarget=null,u=H}else for(g=0;g<r.length;g++){if(C=r[g],H=C.instance,tt=C.currentTarget,C=C.listener,H!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=tt;try{u(c)}catch(dt){Fl(dt)}c.currentTarget=null,u=H}}}}function De(t,n){var a=n[lt];a===void 0&&(a=n[lt]=new Set);var r=t+"__bubble";a.has(r)||(_x(n,t,2,!1),a.add(r))}function Xd(t,n,a){var r=0;n&&(r|=4),_x(a,t,r,n)}var zc="_reactListening"+Math.random().toString(36).slice(2);function Wd(t){if(!t[zc]){t[zc]=!0,ke.forEach(function(a){a!=="selectionchange"&&(eM.has(a)||Xd(a,!1,t),Xd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[zc]||(n[zc]=!0,Xd("selectionchange",!1,n))}}function _x(t,n,a,r){switch(lv(n)){case 2:var c=qM;break;case 8:c=YM;break;default:c=fh}a=c.bind(null,n,a,t),c=void 0,!Ju||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function jd(t,n,a,r,c){var u=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var g=r.tag;if(g===3||g===4){var C=r.stateNode.containerInfo;if(C===c)break;if(g===4)for(g=r.return;g!==null;){var H=g.tag;if((H===3||H===4)&&g.stateNode.containerInfo===c)return;g=g.return}for(;C!==null;){if(g=ue(C),g===null)return;if(H=g.tag,H===5||H===6||H===26||H===27){r=u=g;continue t}C=C.parentNode}}r=r.return}_m(function(){var tt=u,dt=Ku(a),yt=[];t:{var J=qm.get(t);if(J!==void 0){var ut=Il,It=t;switch(t){case"keypress":if(Ol(a)===0)break t;case"keydown":case"keyup":ut=Fy;break;case"focusin":It="focus",ut=nf;break;case"focusout":It="blur",ut=nf;break;case"beforeblur":case"afterblur":ut=nf;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":ut=Mm;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":ut=Ry;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":ut=Xy;break;case km:case Xm:case Wm:ut=Dy;break;case jm:ut=jy;break;case"scroll":case"scrollend":ut=Ty;break;case"wheel":ut=Yy;break;case"copy":case"cut":case"paste":ut=Uy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":ut=Em;break;case"submit":ut=Vy;break;case"toggle":case"beforetoggle":ut=Ky}var Qt=(n&4)!==0,Se=!Qt&&(t==="scroll"||t==="scrollend"),$=Qt?J!==null?J+"Capture":null:J;Qt=[];for(var q=tt,st;q!==null;){var _t=q;if(st=_t.stateNode,_t=_t.tag,_t!==5&&_t!==26&&_t!==27||st===null||$===null||(_t=xo(q,$),_t!=null&&Qt.push(Ko(q,_t,st))),Se)break;q=q.return}0<Qt.length&&(J=new ut(J,It,null,a,dt),yt.push({event:J,listeners:Qt}))}}if((n&7)===0){t:{if(ut=t==="mouseover"||t==="pointerover",J=t==="mouseout"||t==="pointerout",ut&&a!==Zu&&(It=a.relatedTarget||a.fromElement)&&(ue(It)||It[ht]))break t;(J||ut)&&(It=dt.window===dt?dt:(ut=dt.ownerDocument)?ut.defaultView||ut.parentWindow:window,J?(ut=a.relatedTarget||a.toElement,J=tt,ut=ut?ue(ut):null,ut!==null&&(Se=f(ut),Qt=ut.tag,ut!==Se||Qt!==5&&Qt!==27&&Qt!==6)&&(ut=null)):(J=null,ut=tt),J!==ut&&(Qt=Mm,_t="onMouseLeave",$="onMouseEnter",q="mouse",(t==="pointerout"||t==="pointerover")&&(Qt=Em,_t="onPointerLeave",$="onPointerEnter",q="pointer"),Se=J==null?It:jt(J),st=ut==null?It:jt(ut),It=new Qt(_t,q+"leave",J,a,dt),It.target=Se,It.relatedTarget=st,_t=null,ue(dt)===tt&&(Qt=new Qt($,q+"enter",ut,a,dt),Qt.target=st,Qt.relatedTarget=Se,_t=Qt),Se=_t,Qt=J&&ut?w(J,ut,nM):null,J!==null&&yx(yt,It,J,Qt,!1),ut!==null&&Se!==null&&yx(yt,Se,ut,Qt,!0)))}t:{if(J=tt?jt(tt):window,ut=J.nodeName&&J.nodeName.toLowerCase(),ut==="select"||ut==="input"&&J.type==="file")var qt=Um;else if(Dm(J))if(Lm)qt=rS;else{qt=aS;var Pe=iS}else ut=J.nodeName,!ut||ut.toLowerCase()!=="input"||J.type!=="checkbox"&&J.type!=="radio"?tt&&Yu(tt.elementType)&&(qt=Um):qt=sS;if(qt&&(qt=qt(t,tt))){Nm(yt,qt,a,dt);break t}Pe&&Pe(t,J,tt)}switch(Pe=tt?jt(tt):window,t){case"focusin":(Dm(Pe)||Pe.contentEditable==="true")&&(lr=Pe,uf=tt,To=null);break;case"focusout":To=uf=lr=null;break;case"mousedown":ff=!0;break;case"contextmenu":case"mouseup":case"dragend":ff=!1,Gm(yt,a,dt);break;case"selectionchange":if(lS)break;case"keydown":case"keyup":Gm(yt,a,dt)}var ee;if(sf)t:{switch(t){case"compositionstart":var le="onCompositionStart";break t;case"compositionend":le="onCompositionEnd";break t;case"compositionupdate":le="onCompositionUpdate";break t}le=void 0}else or?Cm(t,a)&&(le="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(le="onCompositionStart");le&&(Tm&&a.locale!=="ko"&&(or||le!=="onCompositionStart"?le==="onCompositionEnd"&&or&&(ee=ym()):(Ha=dt,$u="value"in Ha?Ha.value:Ha.textContent,or=!0)),Pe=Bc(tt,le),0<Pe.length&&(le=new bm(le,t,null,a,dt),yt.push({event:le,listeners:Pe}),ee?le.data=ee:(ee=wm(a),ee!==null&&(le.data=ee)))),(ee=Jy?$y(t,a):tS(t,a))&&(le=Bc(tt,"onBeforeInput"),0<le.length&&(Pe=new bm("onBeforeInput","beforeinput",null,a,dt),yt.push({event:Pe,listeners:le}),Pe.data=ee)),JS(yt,t,tt,a,dt)}vx(yt,n)})}function Ko(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Bc(t,n){for(var a=n+"Capture",r=[];t!==null;){var c=t,u=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||u===null||(c=xo(t,a),c!=null&&r.unshift(Ko(t,c,u)),c=xo(t,n),c!=null&&r.push(Ko(t,c,u))),t.tag===3)return r;t=t.return}return[]}function nM(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function yx(t,n,a,r,c){for(var u=n._reactName,g=[];a!==null&&a!==r;){var C=a,H=C.alternate,tt=C.stateNode;if(C=C.tag,H!==null&&H===r)break;C!==5&&C!==26&&C!==27||tt===null||(H=tt,c?(tt=xo(a,u),tt!=null&&g.unshift(Ko(a,tt,H))):c||(tt=xo(a,u),tt!=null&&g.push(Ko(a,tt,H)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var iM=/\r\n?/g,aM=/\u0000|\uFFFD/g;function Sx(t){return(typeof t=="string"?t:""+t).replace(iM,`
`).replace(aM,"")}function Mx(t,n){return n=Sx(n),Sx(t)===n}function qe(t,n,a,r,c,u){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||ar(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&ar(t,""+r);else return;break;case"className":ii(t,"class",r);break;case"tabIndex":ii(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ii(t,a,r);break;case"style":xm(t,r,u);return;case"data":if(n!=="object"){ii(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ul(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(n!=="input"&&qe(t,n,"name",c.name,c,null),qe(t,n,"formEncType",c.formEncType,c,null),qe(t,n,"formMethod",c.formMethod,c,null),qe(t,n,"formTarget",c.formTarget,c,null)):(qe(t,n,"encType",c.encType,c,null),qe(t,n,"method",c.method,c,null),qe(t,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ul(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=Wi);return;case"onScroll":r!=null&&De("scroll",t);return;case"onScrollEnd":r!=null&&De("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Ul(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":De("beforetoggle",t),De("toggle",t),$e(t,"popover",r);break;case"xlinkActuate":Le(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Le(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Le(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Le(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Le(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Le(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Le(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Le(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Le(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":$e(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=by.get(a)||a,$e(t,a,r);else return}Te=!0}function qd(t,n,a,r,c,u){switch(a){case"style":xm(t,r,u);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")ar(t,r);else if(typeof r=="number"||typeof r=="bigint")ar(t,""+r);else return;break;case"onScroll":r!=null&&De("scroll",t);return;case"onScrollEnd":r!=null&&De("scrollend",t);return;case"onClick":r!=null&&(t.onclick=Wi);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!vn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),u=a.slice(2,c?a.length-7:void 0),n=t[W]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(u,n,c),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(u,r,c);break t}Te=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):$e(t,a,r)}return}Te=!0}function Ln(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":De("error",t),De("load",t);var r=!1,c=!1,u;for(u in a)if(a.hasOwnProperty(u)){var g=a[u];if(g!=null)switch(u){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:qe(t,n,u,g,a,null)}}c&&qe(t,n,"srcSet",a.srcSet,a,null),r&&qe(t,n,"src",a.src,a,null);return;case"input":De("invalid",t);var C=u=g=c=null,H=null,tt=null;for(r in a)if(a.hasOwnProperty(r)){var dt=a[r];if(dt!=null)switch(r){case"name":c=dt;break;case"type":g=dt;break;case"checked":H=dt;break;case"defaultChecked":tt=dt;break;case"value":u=dt;break;case"defaultValue":C=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,n));break;default:qe(t,n,r,dt,a,null)}}hm(t,u,C,H,tt,g,c,!1);return;case"select":De("invalid",t),r=g=u=null;for(c in a)if(a.hasOwnProperty(c)&&(C=a[c],C!=null))switch(c){case"value":u=C;break;case"defaultValue":g=C;break;case"multiple":r=C;default:qe(t,n,c,C,a,null)}n=u,a=g,t.multiple=!!r,n!=null?ir(t,!!r,n,!1):a!=null&&ir(t,!!r,a,!0);return;case"textarea":De("invalid",t),u=c=r=null;for(g in a)if(a.hasOwnProperty(g)&&(C=a[g],C!=null))switch(g){case"value":r=C;break;case"defaultValue":c=C;break;case"children":u=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:qe(t,n,g,C,a,null)}mm(t,r,c,u);return;case"option":for(H in a)if(a.hasOwnProperty(H)&&(r=a[H],r!=null))switch(H){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:qe(t,n,H,r,a,null)}return;case"dialog":De("beforetoggle",t),De("toggle",t),De("cancel",t),De("close",t);break;case"iframe":case"object":De("load",t);break;case"video":case"audio":for(r=0;r<Zo.length;r++)De(Zo[r],t);break;case"image":De("error",t),De("load",t);break;case"details":De("toggle",t);break;case"embed":case"source":case"link":De("error",t),De("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(r=a[tt],r!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:qe(t,n,tt,r,a,null)}return;default:if(Yu(n)){for(dt in a)a.hasOwnProperty(dt)&&(r=a[dt],r!==void 0&&qd(t,n,dt,r,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(r=a[C],r!=null&&qe(t,n,C,r,a,null))}var sM={};function rM(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,u=null,g=null,C=null,H=null,tt=null,dt=null;for(ut in a){var yt=a[ut];if(a.hasOwnProperty(ut)&&yt!=null)switch(ut){case"checked":break;case"value":break;case"defaultValue":H=yt;default:r.hasOwnProperty(ut)||qe(t,n,ut,null,r,yt)}}for(var J in r){var ut=r[J];if(yt=a[J],r.hasOwnProperty(J)&&(ut!=null||yt!=null))switch(J){case"type":ut!==yt&&(Te=!0),u=ut;break;case"name":ut!==yt&&(Te=!0),c=ut;break;case"checked":ut!==yt&&(Te=!0),tt=ut;break;case"defaultChecked":ut!==yt&&(Te=!0),dt=ut;break;case"value":ut!==yt&&(Te=!0),g=ut;break;case"defaultValue":ut!==yt&&(Te=!0),C=ut;break;case"children":case"dangerouslySetInnerHTML":if(ut!=null)throw Error(s(137,n));break;default:ut!==yt&&qe(t,n,J,ut,r,yt)}}ju(t,g,C,H,tt,dt,u,c);return;case"select":ut=g=C=J=null;for(u in a)if(H=a[u],a.hasOwnProperty(u)&&H!=null)switch(u){case"value":break;case"multiple":ut=H;default:r.hasOwnProperty(u)||qe(t,n,u,null,r,H)}for(c in r)if(u=r[c],H=a[c],r.hasOwnProperty(c)&&(u!=null||H!=null))switch(c){case"value":u!==H&&(Te=!0),J=u;break;case"defaultValue":u!==H&&(Te=!0),C=u;break;case"multiple":u!==H&&(Te=!0),g=u;default:u!==H&&qe(t,n,c,u,r,H)}n=C,a=g,r=ut,J!=null?ir(t,!!a,J,!1):!!r!=!!a&&(n!=null?ir(t,!!a,n,!0):ir(t,!!a,a?[]:"",!1));return;case"textarea":ut=J=null;for(C in a)if(c=a[C],a.hasOwnProperty(C)&&c!=null&&!r.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:qe(t,n,C,null,r,c)}for(g in r)if(c=r[g],u=a[g],r.hasOwnProperty(g)&&(c!=null||u!=null))switch(g){case"value":c!==u&&(Te=!0),J=c;break;case"defaultValue":c!==u&&(Te=!0),ut=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==u&&qe(t,n,g,c,r,u)}pm(t,J,ut);return;case"option":for(var It in a)if(J=a[It],a.hasOwnProperty(It)&&J!=null&&!r.hasOwnProperty(It))switch(It){case"selected":t.selected=!1;break;default:qe(t,n,It,null,r,J)}for(H in r)if(J=r[H],ut=a[H],r.hasOwnProperty(H)&&J!==ut&&(J!=null||ut!=null))switch(H){case"selected":J!==ut&&(Te=!0),t.selected=J&&typeof J!="function"&&typeof J!="symbol";break;default:qe(t,n,H,J,r,ut)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Qt in a)J=a[Qt],a.hasOwnProperty(Qt)&&J!=null&&!r.hasOwnProperty(Qt)&&qe(t,n,Qt,null,r,J);for(tt in r)if(J=r[tt],ut=a[tt],r.hasOwnProperty(tt)&&J!==ut&&(J!=null||ut!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(J!=null)throw Error(s(137,n));break;default:qe(t,n,tt,J,r,ut)}return;default:if(Yu(n)){for(var Se in a)J=a[Se],a.hasOwnProperty(Se)&&J!==void 0&&!r.hasOwnProperty(Se)&&qd(t,n,Se,void 0,r,J);for(dt in r)J=r[dt],ut=a[dt],!r.hasOwnProperty(dt)||J===ut||J===void 0&&ut===void 0||qd(t,n,dt,J,r,ut);return}}for(var $ in a)J=a[$],a.hasOwnProperty($)&&J!=null&&!r.hasOwnProperty($)&&qe(t,n,$,null,r,J);for(yt in r)J=r[yt],ut=a[yt],!r.hasOwnProperty(yt)||J===ut||J==null&&ut==null||qe(t,n,yt,J,r,ut)}function bx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function oM(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],u=c.transferSize,g=c.initiatorType,C=c.duration;if(u&&C&&bx(g)){for(g=0,C=c.responseEnd,r+=1;r<a.length;r++){var H=a[r],tt=H.startTime;if(tt>C)break;var dt=H.transferSize,yt=H.initiatorType;dt&&bx(yt)&&(H=H.responseEnd,g+=dt*(H<C?1:(C-tt)/(H-tt)))}if(--r,n+=8*(u+g)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Yd=null,Zd=null;function Qo(t){return t.nodeType===9?t:t.ownerDocument}function Ex(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Tx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Ax(t,n,a,r){return a=Qo(a).createElement(t),a[R]=r,a[W]=n,Ln(a,t,n),Ee(a),a}function Kd(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var Qd=null;function lM(){var t=window.event;return t&&t.type==="popstate"?t===Qd?!1:(Qd=t,!0):(Qd=null,!1)}var Jd=typeof setTimeout=="function"?setTimeout:void 0,cM=typeof clearTimeout=="function"?clearTimeout:void 0,Rx=typeof Promise=="function"?Promise:void 0,Cx=typeof requestAnimationFrame=="function"?requestAnimationFrame:Jd,uM=typeof queueMicrotask=="function"?queueMicrotask:typeof Rx<"u"?function(t){return Rx.resolve(null).then(t).catch(fM)}:Jd;function fM(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function wx(t,n){var a=n,r=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(c),Gr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")rh(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,rh(a);for(var u=a.firstChild;u;){var g=u.nextSibling,C=u.nodeName;u[Pt]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=g}}else a==="body"&&rh(t.ownerDocument.body);a=c}while(a);Gr(n)}function Dx(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function Nx(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var c=r=0;c<n.length;c++){var u=n[c];0<u.width&&0<u.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function Ux(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function dM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function $d(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return dM(n,a,t)}function hM(t){return t.documentElement.clientHeight}function pM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function mM(t,n,a,r,c,u,g,C,H){var tt=n.nodeType===9?n:n.ownerDocument;try{var dt=tt.startViewTransition({update:function(){var J=tt.defaultView,ut=J.navigation&&J.navigation.transition,It=tt.fonts.status;r();var Qt=[];if(It==="loaded"&&(hM(tt),tt.fonts.status==="loading"&&Qt.push(tt.fonts.ready)),It=Qt.length,t!==null)for(var Se=t.suspenseyImages,$=0,q=0;q<Se.length;q++){var st=Se[q];if(!st.complete){var _t=st.getBoundingClientRect();if(0<_t.bottom&&0<_t.right&&_t.top<J.innerHeight&&_t.left<J.innerWidth){if($+=$x(st),$>Gc){Qt.length=It;break}st=new Promise(pM.bind(st)),Qt.push(st)}}}if(0<Qt.length)return J=Promise.race([Promise.all(Qt),new Promise(function(qt){return setTimeout(qt,500)})]).then(c,c),(ut?Promise.allSettled([ut.finished,J]):J).then(u,u);if(c(),ut)return ut.finished.then(u,u);u()},types:a});tt.__reactViewTransition=dt;var yt=[];return dt.ready.then(function(){for(var J=tt.documentElement.getAnimations({subtree:!0}),ut=0;ut<J.length;ut++){var It=J[ut],Qt=It.effect,Se=Qt.pseudoElement;if(Se!=null&&Se.startsWith("::view-transition")){yt.push(It),It=Qt.getKeyframes();for(var $=Se=void 0,q=!0,st=0;st<It.length;st++){var _t=It[st],qt=_t.width;if(Se===void 0)Se=qt;else if(Se!==qt){q=!1;break}if(qt=_t.height,$===void 0)$=qt;else if($!==qt){q=!1;break}delete _t.width,delete _t.height,_t.transform==="none"&&delete _t.transform}q&&Se!==void 0&&$!==void 0&&(Qt.setKeyframes(It),q=getComputedStyle(Qt.target,Qt.pseudoElement),q.width!==Se||q.height!==$)&&(q=It[0],q.width=Se,q.height=$,q=It[It.length-1],q.width=Se,q.height=$,Qt.setKeyframes(It))}}g()},function(J){tt.__reactViewTransition===dt&&(tt.__reactViewTransition=null);try{if(typeof J=="object"&&J!==null)switch(J.name){case"InvalidStateError":(J.message==="View transition was skipped because document visibility state is hidden."||J.message==="Skipping view transition because document visibility state has become hidden."||J.message==="Skipping view transition because viewport size changed."||J.message==="Transition was aborted because of invalid state")&&(J=null)}J!==null&&H(J)}finally{r(),c(),g()}}),dt.finished.finally(function(){for(var J=0;J<yt.length;J++)yt[J].cancel();tt.__reactViewTransition===dt&&(tt.__reactViewTransition=null),C()}),dt}catch{return r(),c(),g(),null}}function ks(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}ks.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:O({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},ks.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],c=0;c<a.length;c++){var u=a[c].effect;u!==null&&u.target===t&&u.pseudoElement===n&&r.push(a[c])}return r},ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Lx(t){return{name:t,group:new ks("group",t),imagePair:new ks("image-pair",t),old:new ks("old",t),new:new ks("new",t)}}function ui(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ui.prototype.addEventListener=function(t,n,a){var r=null,c=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var u=this._eventListeners;if(Px(u,t,n,a)===-1){var g=this,C=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(C=function(H){g.removeEventListener(t,n,a),typeof n=="function"?n.call(this,H):n.handleEvent(H)}),r!==null&&(c=g.removeEventListener.bind(g,t,n,a),r.addEventListener("abort",c,{once:!0}),c=r.removeEventListener.bind(r,"abort",c)),r=Pr(a),u.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:C,cleanup:c}),S(this._fragmentFiber.child,!1,gM,t,C,r)}this._eventListeners=u}};function gM(t,n,a,r){return y(t).addEventListener(n,a,r),!1}ui.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=Px(r,t,n,a),n!==-1)){var c=r[n];a=c.attachedListener;var u=c.cleanup;c=Pr(c.optionsOrUseCapture),S(this._fragmentFiber.child,!1,xM,t,a,c),r.splice(n,1),u!==null&&u()}};function xM(t,n,a,r){return y(t).removeEventListener(n,a,r),!1}function Pr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function Ox(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function Px(t,n,a,r){if(t.length===0)return-1;r=Ox(r);for(var c=0;c<t.length;c++){var u=t[c];if(u.type===n&&u.listener===a&&Ox(u.optionsOrUseCapture)===r)return c}return-1}ui.prototype.dispatchEvent=function(t){var n=x(this._fragmentFiber);if(n===null)return!0;n=y(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var c=0;c<a.length;c++){var u=a[c];r.addEventListener(u.type,u.attachedListener,Pr(u.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(c=0;c<a.length;c++)u=a[c],r.removeEventListener(u.type,u.attachedListener,Pr(u.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},ui.prototype.focus=function(t){S(this._fragmentFiber.child,!0,Ix,t,void 0,void 0)};function Ix(t,n){return t.tag===6?!1:(t=y(t),wM(t,n))}ui.prototype.focusLast=function(t){var n=[];S(this._fragmentFiber.child,!0,th,n,void 0,void 0);for(var a=n.length-1;0<=a&&!Ix(n[a],t);a--);};function th(t,n){return n.push(t),!1}ui.prototype.blur=function(){var t=x(this._fragmentFiber);t!==null&&(t=y(t),t=Qo(t).activeElement,t!==null&&S(this._fragmentFiber.child,!1,vM,t,void 0,void 0))};function vM(t,n){return t.tag===6?!1:(t=y(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ui.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),S(this._fragmentFiber.child,!1,_M,t,void 0,void 0)};function _M(t,n){return t.tag===6||(t=y(t),n.observe(t)),!1}ui.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),S(this._fragmentFiber.child,!1,yM,t,void 0,void 0);for(var a=n=0;a<Pi.length;a++){var r=Pi[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Pi[n++]=r}Pi.length=n}};function yM(t,n){return t.tag===6||(t=y(t),n.unobserve(t)),!1}var Pi=[],eh=!1;function SM(t,n,a){Pi.push({fragmentInstance:t,observer:n,instance:a}),eh||(eh=!0,DM(function(){eh=!1;var r=Pi;Pi=[];for(var c=0;c<r.length;c++){var u=r[c];u.observer.unobserve(u.instance)}}))}ui.prototype.getClientRects=function(){var t=[];return S(this._fragmentFiber.child,!1,MM,t,void 0,void 0),t};function MM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=y(t),n.push.apply(n,t.getClientRects());return!1}ui.prototype.getRootNode=function(t){var n=x(this._fragmentFiber);return n===null?this:y(n).getRootNode(t)},ui.prototype.compareDocumentPosition=function(t){var n=x(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];S(this._fragmentFiber.child,!1,th,a,void 0,void 0);var r=y(n);if(a.length===0){if(a=r,b(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var c=r=a.compareDocumentPosition(t);return a===t?c=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=T(n)[1],a===null?c=Node.DOCUMENT_POSITION_PRECEDING:(t=y(a).compareDocumentPosition(t),c=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),c|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=y(a[0]),c=y(a[a.length-1]);var u=b(this._fragmentFiber)?n.parentElement:r;if(u==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=u.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,u=u.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY;var g=n.compareDocumentPosition(t),C=c.compareDocumentPosition(t),H=g&Node.DOCUMENT_POSITION_CONTAINED_BY||C&Node.DOCUMENT_POSITION_CONTAINED_BY;return C=r&&u&&g&Node.DOCUMENT_POSITION_FOLLOWING&&C&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||u&&c===t||H||C?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!u&&c===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:g,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||bM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function bM(t,n,a,r,c){var u=ue(c);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!u)t:{for(;u!==null;){if(u.tag===7&&(u===n||u.alternate===n)){a=!0;break t}u=u.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(u===null)return u=c.ownerDocument,c===u||c===u.documentElement||c===u.body;t:{for(u=n,n=x(n);u!==null;){if(!(u.tag!==5&&u.tag!==3&&u.tag!==27||u!==n&&u.alternate!==n)){u=!0;break t}u=u.return}u=!1}return u}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!u)&&!(n=u===a)&&(n=w(a,u,N),n===null?n=!1:(S(n,!0,V,u,a),u=v,v=null,n=u!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!u)&&!(n=u===r)&&(n=w(r,u,N),n===null?n=!1:(S(n,!0,D,u,r),u=v,U=v=null,n=u!==null)),n):!1}function zx(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ui.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];S(this._fragmentFiber.child,!1,th,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=T(this._fragmentFiber);if(r=a?r[1]||r[0]||x(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=y(r),zx(t,a);return}if(r=y(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var c=n[r];c.tag===6?(c=y(c),zx(c,a)):y(c).scrollIntoView(t),r+=a?-1:1}};function EM(t,n){return t=y(t),Bx(t,n),!1}function Bx(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function Fx(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.addEventListener(c.type,c.attachedListener,Pr(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){for(var g=0,C=0;C<Pi.length;C++){var H=Pi[C];(H.fragmentInstance!==n||H.observer!==u||H.instance!==t)&&(Pi[g++]=H)}Pi.length=g,u.observe(t)}),Bx(t,n))}function TM(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.removeEventListener(c.type,c.attachedListener,Pr(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){typeof u.rootMargin=="string"?SM(n,u,t):u.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function nh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":nh(a),Kt(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function AM(t,n,a,r){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[Pt])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(u=t.getAttribute("rel"),u==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(u!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(u=t.getAttribute("src"),(u!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&u&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var u=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===u)return t}else return t;if(t=Ei(t.nextSibling),t===null)break}return null}function RM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Ei(t.nextSibling),t===null))return null;return t}function Hx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ei(t.nextSibling),t===null))return null;return t}function ih(t){return t.data==="$?"||t.data==="$~"}function ah(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function CM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function Ei(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var sh=null;function Gx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Ei(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Vx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function wM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function DM(t){Cx(function(){Cx(function(n){return t(n)})})}function kx(t,n,a){switch(n=Qo(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Xx(t,n,a){for(var r in a){var c=a[r];a.hasOwnProperty(r)&&c!=null&&qe(t,n,r,null,sM,c)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===Wi&&(t.onclick=null),Kt(t)}function rh(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);Kt(t)}var Ti=new Map,Wx=new Set;function Jo(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var Ra=Tt.d;Tt.d={f:NM,r:UM,D:LM,C:OM,L:PM,m:IM,X:BM,S:zM,M:FM};function NM(){var t=Ra.f(),n=Uc();return t||n}function UM(t){var n=xe(t);n!==null&&n.tag===5&&n.type==="form"?qg(n):Ra.r(t)}var Ir=typeof document>"u"?null:document;function jx(t,n,a){var r=Ir;if(r&&typeof n=="string"&&n){var c=xi(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),Wx.has(c)||(Wx.add(c),t={rel:t,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),Ln(n,"link",t),Ee(n),r.head.appendChild(n)))}}function LM(t){Ra.D(t),jx("dns-prefetch",t,null)}function OM(t,n){Ra.C(t,n),jx("preconnect",t,n)}function PM(t,n,a){Ra.L(t,n,a);var r=Ir;if(r&&t&&n){var c='link[rel="preload"][as="'+xi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+xi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+xi(a.imageSizes)+'"]')):c+='[href="'+xi(t)+'"]';var u=c;switch(n){case"style":u=zr(t);break;case"script":u=Br(t)}if(!(Ti.has(u)||(t=O({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ti.set(u,t),r.querySelector(c)!==null||n==="style"&&r.querySelector($o(u))||n==="script"&&r.querySelector(tl(u))))){var g=r.createElement("link");Ln(g,"link",t),n==="style"&&(g[Yt]=!0,g.onload=g.onerror=function(){Ke(g)}),Ee(g),r.head.appendChild(g)}}}function IM(t,n){Ra.m(t,n);var a=Ir;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+xi(r)+'"][href="'+xi(t)+'"]',u=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Br(t)}if(!Ti.has(u)&&(t=O({rel:"modulepreload",href:t},n),Ti.set(u,t),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(tl(u)))return}r=a.createElement("link"),Ln(r,"link",t),Ee(r),a.head.appendChild(r)}}}function zM(t,n,a){Ra.S(t,n,a);var r=Ir;if(r&&t){var c=Ce(r).hoistableStyles,u=zr(t);n=n||"default";var g=c.get(u);if(!g){var C={loading:0,preload:null};if(g=r.querySelector($o(u)))C.loading=5;else{t=O({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ti.get(u))&&oh(t,a);var H=g=r.createElement("link");Ee(H),Ln(H,"link",t),H._p=new Promise(function(tt,dt){H.onload=tt,H.onerror=dt}),H.addEventListener("load",function(){C.loading|=1}),H.addEventListener("error",function(){C.loading|=2}),C.loading|=4,Fc(g,n,r)}g={type:"stylesheet",instance:g,count:1,state:C},c.set(u,g)}}}function BM(t,n){Ra.X(t,n);var a=Ir;if(a&&t){var r=Ce(a).hoistableScripts,c=Br(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=O({src:t,async:!0},n),(n=Ti.get(c))&&lh(t,n),u=a.createElement("script"),Ee(u),Ln(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function FM(t,n){Ra.M(t,n);var a=Ir;if(a&&t){var r=Ce(a).hoistableScripts,c=Br(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=O({src:t,async:!0,type:"module"},n),(n=Ti.get(c))&&lh(t,n),u=a.createElement("script"),Ee(u),Ln(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function qx(t,n,a,r){var c=(c=ot.current)?Jo(c):null;if(!c)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=zr(a.href),n=Ce(c).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=zr(a.href);var u=Ce(c).hoistableStyles,g=u.get(t);if(g||(c=c.ownerDocument||c,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(t,g),(u=c.querySelector($o(t)))?u._p||(g.instance=u,g.state.loading=5):(u=Ti.get(t),u||(u={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ti.set(t,u)),HM(c,t,u,g.state))),n&&r===null)throw Error(s(528,""));return g}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Br(a),n=Ce(c).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function zr(t){return'href="'+xi(t)+'"'}function $o(t){return'link[rel="stylesheet"]['+t+"]"}function Yx(t){return O({},t,{"data-precedence":t.precedence,precedence:null})}function HM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Yt]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[Yt]=!0,n.onload=n.onerror=Ke.bind(null,n),Ln(n,"link",a),Ee(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function Br(t){return'[src="'+xi(t)+'"]'}function tl(t){return"script[async]"+t}function Zx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+xi(a.href)+'"]');if(r)return n.instance=r,Ee(r),r;var c=O({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),Ee(r),Ln(r,"style",c),Fc(r,a.precedence,t),n.instance=r;case"stylesheet":c=zr(a.href);var u=t.querySelector($o(c));if(u)return n.state.loading|=4,n.instance=u,Ee(u),u;r=Yx(a),(c=Ti.get(c))&&oh(r,c),u=(t.ownerDocument||t).createElement("link"),Ee(u);var g=u;return g._p=new Promise(function(C,H){g.onload=C,g.onerror=H}),Ln(u,"link",r),n.state.loading|=4,Fc(u,a.precedence,t),n.instance=u;case"script":return u=Br(a.src),(c=t.querySelector(tl(u)))?(n.instance=c,Ee(c),c):(r=a,(c=Ti.get(u))&&(r=O({},a),lh(r,c)),t=t.ownerDocument||t,c=t.createElement("script"),Ee(c),Ln(c,"link",r),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Fc(r,a.precedence,t));return n.instance}function Fc(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,u=c,g=0;g<r.length;g++){var C=r[g];if(C.dataset.precedence===n)u=C;else if(u!==c)break}u?u.parentNode.insertBefore(t,u.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function oh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function lh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Hc=null;function Kx(t,n,a){if(Hc===null){var r=new Map,c=Hc=new Map;c.set(a,r)}else c=Hc,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var u=a[c];if(!(u[Pt]||u[R]||t==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var g=u.getAttribute(n)||"";g=t+g;var C=r.get(g);C?C.push(u):r.set(g,[u])}}return r}function ch(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function GM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function Qx(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function Jx(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function $x(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function tv(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=$x(n),t.suspenseyImages.push(n)),t=XM.bind(t),n.decode().then(t,t))}function VM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=zr(r.href),u=n.querySelector($o(c));if(u){n=u._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=el.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=u,Ee(u);return}u=n.ownerDocument||n,r=Yx(r),(c=Ti.get(c))&&oh(r,c),u=u.createElement("link"),Ee(u);var g=u;g._p=new Promise(function(C,H){g.onload=C,g.onerror=H}),Ln(u,"link",r),a.instance=u}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=el.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Gc=0;function kM(t,n){return t.stylesheets&&t.count===0&&kc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&kc(t,t.stylesheets),t.unsuspend){var u=t.unsuspend;t.unsuspend=null,u()}},6e4+n);0<t.imgBytes&&Gc===0&&(Gc=62500*oM());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&kc(t,t.stylesheets),t.unsuspend)){var u=t.unsuspend;t.unsuspend=null,u()}},(t.imgBytes>Gc?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function ev(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)kc(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function el(){this.count--,ev(this)}function XM(){this.imgCount--,ev(this)}var Vc=null;function kc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Vc=new Map,n.forEach(WM,t),Vc=null,el.call(t))}function WM(t,n){if(!(n.state.loading&4)){var a=Vc.get(t);if(a)var r=a.get(null);else{a=new Map,Vc.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<c.length;u++){var g=c[u];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),r=g)}r&&a.set(null,r)}c=n.instance,g=c.getAttribute("data-precedence"),u=a.get(g)||r,u===r&&a.set(null,c),a.set(g,c),this.count++,r=el.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),u?u.parentNode.insertBefore(c,u.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var Fr={$$typeof:Q,Provider:null,Consumer:null,_currentValue:Me,_currentValue2:Me,_threadCount:0};function jM(t,n,a,r,c,u,g,C,H){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nr(0),this.hiddenUpdates=nr(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=u,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=H,this.transitionTypes=null,this.incompleteTransitions=new Map}function nv(t,n,a,r,c,u,g,C,H,tt,dt,yt){return t=new jM(t,n,a,g,H,tt,dt,yt,C),n=1,u===!0&&(n|=24),u=Yn(3,null,null,n),t.current=u,u.stateNode=t,n=Ef(),n.refCount++,t.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:a,cache:n},Cf(u),t}function iv(t){return t?(t=fr,t):fr}function av(t,n,a,r,c,u){c=iv(c),r.context===null?r.context=c:r.pendingContext=c,r=Ya(n),r.payload={element:a},u=u===void 0?null:u,u!==null&&(r.callback=u),a=Za(t,r,n),a!==null&&(Jn(a,t,n),Uo(a,t,n))}function sv(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function uh(t,n){sv(t,n),(t=t.alternate)&&sv(t,n)}function rv(t){if(t.tag===13||t.tag===31){var n=As(t,67108864);n!==null&&Jn(n,t,67108864),uh(t,67108864)}}function ov(t){if(t.tag===13||t.tag===31){var n=ci();n=mo(n);var a=As(t,n);a!==null&&Jn(a,t,n),uh(t,n)}}var Hr=!0;function qM(t,n,a,r){var c=gt.T;gt.T=null;var u=Tt.p;try{Tt.p=2,fh(t,n,a,r)}finally{Tt.p=u,gt.T=c}}function YM(t,n,a,r){var c=gt.T;gt.T=null;var u=Tt.p;try{Tt.p=8,fh(t,n,a,r)}finally{Tt.p=u,gt.T=c}}function fh(t,n,a,r){if(Hr){var c=dh(r);if(c===null)jd(t,n,r,Xc,a),cv(t,r);else if(KM(c,t,n,a,r))r.stopPropagation();else if(cv(t,r),n&4&&-1<ZM.indexOf(t)){for(;c!==null;){var u=xe(c);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var g=ha(u.pendingLanes);if(g!==0){var C=u;for(C.pendingLanes|=2,C.entangledLanes|=2;g;){var H=1<<31-ge(g);C.entanglements[1]|=H,g&=~H}ea(u),(Ve&6)===0&&(wc=Xt()+500,Yo(0))}}break;case 31:case 13:C=As(u,2),C!==null&&Jn(C,u,2),Uc(),uh(u,2)}if(u=dh(r),u===null&&jd(t,n,r,Xc,a),u===c)break;c=u}c!==null&&r.stopPropagation()}else jd(t,n,r,null,a)}}function dh(t){return t=Ku(t),hh(t)}var Xc=null;function hh(t){if(Xc=null,t=ue(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Xc=t,null}function lv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(re()){case me:return 2;case K:return 8;case Nt:case St:return 32;case Ot:return 268435456;default:return 32}default:return 32}}var ph=!1,os=null,ls=null,cs=null,nl=new Map,il=new Map,us=[],ZM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function cv(t,n){switch(t){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":cs=null;break;case"pointerover":case"pointerout":nl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":il.delete(n.pointerId)}}function al(t,n,a,r,c,u){return t===null||t.nativeEvent!==u?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:u,targetContainers:[c]},n!==null&&(n=xe(n),n!==null&&rv(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function KM(t,n,a,r,c){switch(n){case"focusin":return os=al(os,t,n,a,r,c),!0;case"dragenter":return ls=al(ls,t,n,a,r,c),!0;case"mouseover":return cs=al(cs,t,n,a,r,c),!0;case"pointerover":var u=c.pointerId;return nl.set(u,al(nl.get(u)||null,t,n,a,r,c)),!0;case"gotpointercapture":return u=c.pointerId,il.set(u,al(il.get(u)||null,t,n,a,r,c)),!0}return!1}function uv(t){var n=ue(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,Dl(t.priority,function(){ov(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Dl(t.priority,function(){ov(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Wc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=dh(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Zu=r,a.target.dispatchEvent(r),Zu=null}else return n=xe(a),n!==null&&rv(n),t.blockedOn=a,!1;n.shift()}return!0}function fv(t,n,a){Wc(t)&&a.delete(n)}function QM(){ph=!1,os!==null&&Wc(os)&&(os=null),ls!==null&&Wc(ls)&&(ls=null),cs!==null&&Wc(cs)&&(cs=null),nl.forEach(fv),il.forEach(fv)}function jc(t,n){t.blockedOn===n&&(t.blockedOn=null,ph||(ph=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,QM)))}var qc=null;function dv(t){qc!==t&&(qc=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){qc===t&&(qc=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],c=t[n+2];if(typeof r!="function"){if(hh(r||a)===null)continue;break}var u=xe(a);u!==null&&(t.splice(n,3),n-=3,Zf(u,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function Gr(t){function n(H){return jc(H,t)}os!==null&&jc(os,t),ls!==null&&jc(ls,t),cs!==null&&jc(cs,t),nl.forEach(n),il.forEach(n);for(var a=0;a<us.length;a++){var r=us[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<us.length&&(a=us[0],a.blockedOn===null);)uv(a),a.blockedOn===null&&us.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],u=a[r+1],g=c[W]||null;if(typeof u=="function")g||dv(a);else if(g){var C=null;if(u&&u.hasAttribute("formAction")){if(c=u,g=u[W]||null)C=g.formAction;else if(hh(c)!==null)continue}else C=g.action;typeof C=="function"?a[r+1]=C:(a.splice(r,3),r-=3),dv(a)}}}function hv(){function t(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(g){return c=g})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function mh(t){this._internalRoot=t}Yc.prototype.render=mh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ci();av(a,r,t,n,null,null)},Yc.prototype.unmount=mh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;av(t.current,2,null,t,null,null),Uc(),n[ht]=null}};function Yc(t){this._internalRoot=t}Yc.prototype.unstable_scheduleHydration=function(t){if(t){var n=wl();t={blockedOn:null,target:t,priority:n};for(var a=0;a<us.length&&n!==0&&n<us[a].priority;a++);us.splice(a,0,t),a===0&&uv(t)}};var pv=e.version;if(pv!=="19.3.1")throw Error(s(527,pv,"19.3.1"));Tt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var JM={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:gt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Zc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Zc.isDisabled&&Zc.supportsFiber)try{Jt=Zc.inject(JM),Vt=Zc}catch{}}return rl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",c=i0,u=a0,g=s0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=nv(t,1,!1,null,null,a,r,null,c,u,g,hv),t[ht]=n.current,Wd(t),new mh(n)},rl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,c="",u=i0,g=a0,C=s0,H=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(H=a.formState)),n=nv(t,1,!0,n,a??null,r,c,H,u,g,C,hv),n.context=iv(null),a=n.current,r=ci(),r=mo(r),c=Ya(r),c.callback=null,Za(a,c,r),a=r,n.current.lanes=a,ki(n,a),ea(n),t[ht]=n.current,Wd(t),new Yc(n)},rl.version="19.3.1",rl}var Mv;function Sb(){if(Mv)return xh.exports;Mv=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),xh.exports=yb(),xh.exports}var Mb=Sb();const bb=eb(Mb);function Eb(o={}){const[e,i]=Ct.useState("connecting"),[s,l]=Ct.useState(null),f=Ct.useRef(o);return f.current=o,Ct.useEffect(()=>{let d=null,h=null,p=!1;function m(){if(!p){i("connecting");try{d=new EventSource("/api/stream"),d.onopen=()=>{p||i("live")},d.onerror=()=>{p||(i("offline"),d?.close(),h=setTimeout(m,3e3))},["memory_created","memory_updated","trap_logged","conflict_detected","conflict_resolved","action_created","action_claimed","action_completed","action_updated","sync_complete"].forEach(S=>{d?.addEventListener(S,x=>{try{const b=JSON.parse(x.data);l(new Date().toLocaleTimeString()),f.current.onEvent?.(S,b)}catch{}})})}catch{i("offline"),h=setTimeout(m,3e3)}}}return m(),()=>{p=!0,h&&clearTimeout(h),d&&d.close()}},[]),{status:e,lastEventTime:s}}function Tb(){const[o,e]=Ct.useState(null),[i,s]=Ct.useState(6),l=Ct.useRef(null),f=Ct.useRef(null),d=()=>{l.current&&clearTimeout(l.current),f.current&&clearInterval(f.current),l.current=null,f.current=null},h=Ct.useCallback((m,_,S)=>{o&&o.execute().catch(console.error),d();const x={id:Math.random().toString(36).substring(7),label:m,execute:_,rollback:S};e(x),s(6),f.current=setInterval(()=>{s(b=>Math.max(0,b-1))},1e3),l.current=setTimeout(async()=>{d(),e(null);try{await _()}catch(b){console.error("Failed to commit action:",b),S()}},6e3)},[o]),p=Ct.useCallback(()=>{o&&(d(),o.rollback(),e(null))},[o]);return Ct.useEffect(()=>{const m=_=>{(_.ctrlKey||_.metaKey)&&_.key.toLowerCase()==="z"&&o&&(_.preventDefault(),p())};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[o,p]),{pendingAction:o,countdown:i,enqueue:h,undo:p}}const Ab=({pendingAction:o,countdown:e,onUndo:i})=>o?M.jsxs("div",{className:"toast-slide",style:{position:"fixed",bottom:"24px",left:"50%",zIndex:9999,background:"var(--surface)",border:"1px solid var(--border-strong)",borderRadius:"12px",boxShadow:"0 12px 32px rgba(0,0,0,0.3)",padding:"12px 20px",display:"flex",alignItems:"center",gap:"16px",color:"var(--text)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"var(--accent)",animation:"pulse 1s infinite"}}),M.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:o.label})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)"},children:["Auto-committing in ",e,"s"]}),M.jsxs("button",{onClick:i,style:{background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",borderRadius:"6px",padding:"5px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.15s ease"},children:[M.jsx(qp,{size:13}),"Undo (Ctrl+Z)"]})]})]}):null,Rb=({actions:o,edges:e,onSelectAction:i,onSeed:s})=>{const l=Ct.useRef(null),[f,d]=Ct.useState(!0),[h,p]=Ct.useState("all"),[m,_]=Ct.useState(!0),S=Ct.useRef([]),x=Ct.useRef({x:0,y:0,k:1}),b=Ct.useRef({isDragging:!1,dragNode:null,startMouse:{x:0,y:0},startTransform:{x:0,y:0}}),T=Ct.useCallback(()=>{_(!0)},[]);Ct.useEffect(()=>{const N=l.current;if(!N)return;const w=N.getBoundingClientRect(),O=w.width/2,A=w.height/2,P=o.filter(I=>h==="all"?!0:h==="frontier"?I.isFrontier:I.status===h);S.current=P.map((I,X)=>{const et=X/Math.max(1,P.length)*Math.PI*2,Y=120+X%3*60;return{id:I.id,action:I,x:O+Math.cos(et)*Y,y:A+Math.sin(et)*Y,vx:0,vy:0,radius:I.isFrontier?20:16}}),T()},[o,h,T]),Ct.useEffect(()=>{const N=l.current;if(!N)return;const w=N.getContext("2d");if(!w)return;let O;const A=()=>{const I=N.parentElement?.getBoundingClientRect();if(!I)return;const X=window.devicePixelRatio||1;N.width=Math.round(I.width*X),N.height=Math.round(I.height*X),N.style.width=`${I.width}px`,N.style.height=`${I.height}px`,T()};A(),window.addEventListener("resize",A);const P=()=>{const I=S.current,X=x.current,et=window.devicePixelRatio||1,Y=N.width/et,j=N.height/et;let Q=0;if(f&&m){for(let B=0;B<I.length;B++)for(let F=B+1;F<I.length;F++){const Z=I[F].x-I[B].x,G=I[F].y-I[B].y,at=Math.hypot(Z,G)||1;if(at<200){const rt=(200-at)/at*.4;I[B].vx-=Z*rt*.05,I[B].vy-=G*rt*.05,I[F].vx+=Z*rt*.05,I[F].vy+=G*rt*.05}}for(const B of e){const F=I.find(G=>G.id===B.source_action_id),Z=I.find(G=>G.id===B.target_action_id);if(F&&Z){const G=Z.x-F.x,at=Z.y-F.y,rt=B.edge_type==="conflicts_with"?.001:.0035;F.vx+=G*rt,F.vy+=at*rt,Z.vx-=G*rt,Z.vy-=at*rt}}for(const B of I)if(B!==b.current.dragNode){B.x+=B.vx,B.y+=B.vy,B.vx*=.85,B.vy*=.85;const F=Math.hypot(B.vx,B.vy);F>Q&&(Q=F)}Q<.04&&!b.current.isDragging&&_(!1)}w.save(),w.scale(et,et),w.clearRect(0,0,Y,j),w.translate(X.x,X.y),w.scale(X.k,X.k);for(const B of e){const F=I.find(G=>G.id===B.source_action_id),Z=I.find(G=>G.id===B.target_action_id);if(F&&Z)if(w.beginPath(),B.edge_type==="conflicts_with")w.setLineDash([5,4]),w.strokeStyle="#f43f5e",w.lineWidth=2,w.moveTo(F.x,F.y),w.lineTo(Z.x,Z.y),w.stroke(),w.setLineDash([]);else{w.setLineDash([]),w.strokeStyle="#38bdf8",w.lineWidth=1.8,w.moveTo(F.x,F.y),w.lineTo(Z.x,Z.y),w.stroke();const G=Math.atan2(F.y-Z.y,F.x-Z.x),at=F.radius+3,rt=F.x-Math.cos(G)*at,Rt=F.y-Math.sin(G)*at;w.beginPath(),w.moveTo(rt,Rt),w.lineTo(rt-8*Math.cos(G-Math.PI/6),Rt-8*Math.sin(G-Math.PI/6)),w.lineTo(rt-8*Math.cos(G+Math.PI/6),Rt-8*Math.sin(G+Math.PI/6)),w.fillStyle="#38bdf8",w.fill()}}for(const B of I){const F=B.action;if(F.isFrontier){const at=(Math.sin(Date.now()/240)+1)*4;w.beginPath(),w.arc(B.x,B.y,B.radius+at+3,0,Math.PI*2),w.fillStyle="rgba(56, 189, 248, 0.22)",w.fill(),w.strokeStyle="#38bdf8",w.lineWidth=2,w.stroke()}w.beginPath(),w.arc(B.x,B.y,B.radius,0,Math.PI*2),F.isFrontier?w.fillStyle="#0284c7":F.status==="done"?w.fillStyle="#10b981":F.status==="active"?w.fillStyle="#3b82f6":F.status==="blocked"?w.fillStyle="#64748b":w.fillStyle="#8b5cf6",w.fill(),w.strokeStyle="#090d16",w.lineWidth=2.5,w.stroke(),w.fillStyle="#f8fafc",w.font='11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',w.textAlign="center";const Z=`[P${F.priority}] ${F.title}`,G=Z.length>20?Z.slice(0,18)+"...":Z;w.fillText(G,B.x,B.y+B.radius+14)}w.restore(),O=requestAnimationFrame(P)};return O=requestAnimationFrame(P),()=>{cancelAnimationFrame(O),window.removeEventListener("resize",A)}},[e,f,m,T]);const L=N=>{T();const w=l.current;if(!w)return;const O=w.getBoundingClientRect(),A=(N.clientX-O.left-x.current.x)/x.current.k,P=(N.clientY-O.top-x.current.y)/x.current.k,I=S.current.find(X=>Math.hypot(X.x-A,X.y-P)<X.radius+6);b.current={isDragging:!0,dragNode:I||null,startMouse:{x:N.clientX,y:N.clientY},startTransform:{...x.current}}},y=N=>{const{isDragging:w,dragNode:O,startMouse:A,startTransform:P}=b.current;if(w)if(T(),O){const I=l.current;if(!I)return;const X=I.getBoundingClientRect();O.x=(N.clientX-X.left-x.current.x)/x.current.k,O.y=(N.clientY-X.top-x.current.y)/x.current.k,O.vx=0,O.vy=0}else x.current.x=P.x+(N.clientX-A.x),x.current.y=P.y+(N.clientY-A.y)},v=N=>{const{dragNode:w,startMouse:O}=b.current,A=Math.hypot(N.clientX-O.x,N.clientY-O.y);w&&A<6&&i(w.action),b.current.isDragging=!1,b.current.dragNode=null},U=N=>{N.preventDefault(),T();const w=N.deltaY<0?1.15:.88;x.current.k=Math.max(.25,Math.min(3.5,x.current.k*w))},V=N=>{T(),x.current.k=Math.max(.25,Math.min(3.5,x.current.k*N))},D=()=>{T(),x.current={x:0,y:0,k:1}};return M.jsxs("div",{style:{position:"relative",width:"100%",height:"580px",background:"var(--surface)",borderRadius:"12px",border:"1px solid var(--border)",overflow:"hidden"},children:[M.jsxs("div",{style:{position:"absolute",top:"16px",left:"16px",right:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10,pointerEvents:"none"},children:[M.jsx("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:["all","frontier","active","blocked","done"].map(N=>M.jsxs("button",{onClick:()=>{p(N),T()},className:`btn btn-pill ${h===N?"btn-primary":""}`,style:{textTransform:"capitalize"},children:[N==="frontier"&&M.jsx(mv,{size:12}),N]},N))}),M.jsxs("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:[M.jsxs("button",{onClick:()=>{d(!f),T()},className:"btn",children:[f?M.jsx(U_,{size:14}):M.jsx(L_,{size:14}),f?"Pause":"Play"]}),M.jsx("button",{onClick:()=>V(1.2),className:"btn",title:"Zoom in",children:M.jsx(nb,{size:14})}),M.jsx("button",{onClick:()=>V(.8),className:"btn",title:"Zoom out",children:M.jsx(ib,{size:14})}),M.jsx("button",{onClick:D,className:"btn",title:"Reset view",children:M.jsx(qp,{size:14})})]})]}),M.jsx("canvas",{ref:l,onMouseDown:L,onMouseMove:y,onMouseUp:v,onWheel:U,style:{width:"100%",height:"100%",cursor:"grab"}}),o.length===0&&M.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px",zIndex:5,background:"rgba(9, 9, 11, 0.85)",backdropFilter:"blur(6px)",textAlign:"center",padding:"24px"},children:[M.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"10px",background:"var(--accent-weak)",border:"1px solid rgba(56, 189, 248, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)",fontSize:"22px"},children:"⚡"}),M.jsxs("div",{children:[M.jsx("h3",{style:{fontSize:"16px",fontWeight:700,color:"var(--text)",letterSpacing:"-0.2px"},children:"Action DAG Queue Is Currently Empty"}),M.jsxs("p",{style:{fontSize:"13px",color:"var(--text-muted)",maxWidth:"460px",marginTop:"6px",lineHeight:"1.5"},children:["The Action DAG coordinates distributed autonomous multi-agent task dependencies with topological frontier scheduling. Agents claim and execute tasks via ",M.jsx("code",{children:"fastr_claim"})," and ",M.jsx("code",{children:"fastr_frontier"}),"."]})]}),s&&M.jsxs("button",{onClick:s,className:"btn btn-primary",style:{marginTop:"8px",padding:"7px 16px",fontSize:"12px"},children:[M.jsx(mv,{size:14})," Seed Example 3-Agent Workflow"]})]}),M.jsxs("div",{style:{position:"absolute",bottom:"14px",left:"16px",display:"flex",gap:"16px",fontSize:"11px",color:"var(--text-muted)",zIndex:10,background:"rgba(0,0,0,0.5)",padding:"6px 14px",borderRadius:"8px",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.08)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#0284c7",boxShadow:"0 0 8px #38bdf8"}}),M.jsx("span",{children:"Frontier (Unblocked)"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#3b82f6"}}),M.jsx("span",{children:"Active"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#64748b"}}),M.jsx("span",{children:"Blocked"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#10b981"}}),M.jsx("span",{children:"Done"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{color:"#f43f5e",fontWeight:"bold"},children:"- - -"}),M.jsx("span",{children:"Mutex Lock"})]})]})]})};function bv(o,e,i,s,l){const f=o.length,d=[];if(!f)return d;let h=0;for(const S of o)h+=S;if(h<=0)return o.map(()=>({x:e,y:i,w:0,h:0}));const p=o.map(S=>S*(s*l)/h),m=(S,x,b,T)=>{const L=S*S,y=T*T;return Math.max(y*b/L,L/(y*x))};let _=0;for(;_<f;){const S=Math.min(s,l);if(S<=0){for(;_<f;_++)d.push({x:e,y:i,w:0,h:0});break}let x=p[_],b=p[_],T=p[_],L=m(x,b,T,S),y=_+1;for(;y<f;){const U=x+p[y],V=Math.min(b,p[y]),D=Math.max(T,p[y]),N=m(U,V,D,S);if(N>L)break;x=U,b=V,T=D,L=N,y++}const v=x/S;if(s>=l){let U=i;for(let V=_;V<y;V++){const D=p[V]/v;d.push({x:e,y:U,w:v,h:D}),U+=D}e+=v,s-=v}else{let U=e;for(let V=_;V<y;V++){const D=p[V]/v;d.push({x:U,y:i,w:D,h:v}),U+=D}i+=v,l-=v}_=y}return d}const pi=({text:o,label:e,className:i=""})=>{const[s,l]=Ct.useState(!1),f=async d=>{d.stopPropagation();try{await navigator.clipboard.writeText(o),l(!0),setTimeout(()=>l(!1),1800)}catch{const h=document.createElement("textarea");h.value=o,document.body.appendChild(h),h.select(),document.execCommand("copy"),document.body.removeChild(h),l(!0),setTimeout(()=>l(!1),1800)}};return M.jsxs("button",{onClick:f,title:"Copy to clipboard",className:`copy-btn ${i}`,style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:e?"3px 8px":"4px",fontSize:"11px",fontFamily:"var(--font-mono)",borderRadius:"4px",border:"1px solid var(--border)",background:s?"var(--success-weak)":"var(--surface)",color:s?"var(--success)":"var(--text-muted)",cursor:"pointer",transition:"all 0.15s ease"},children:[s?M.jsx(tp,{size:12}):M.jsx(ab,{size:12}),e&&M.jsx("span",{children:s?"Copied!":e})]})},Cb=({memories:o,onSelectMemory:e})=>{const[i,s]=Ct.useState("treemap"),l=Ct.useRef(null),f=Ct.useRef(null),[d,h]=Ct.useState(null),[p,m]=Ct.useState(null),_=Ct.useRef([]),S=Ct.useRef([]),x=Ct.useMemo(()=>{const y=new Map;for(const v of o){const U=v.module||"general";y.has(U)||y.set(U,[]),y.get(U).push(v)}return Array.from(y.entries()).map(([v,U])=>({module:v,items:U,count:U.length})).sort((v,U)=>U.count-v.count)},[o]),b=Ct.useCallback(()=>{if(i!=="treemap")return;const y=f.current,v=l.current;if(!y||!v)return;const U=y.getContext("2d");if(!U)return;const V=v.clientWidth||800,D=500,N=window.devicePixelRatio||1;if(y.width=Math.round(V*N),y.height=Math.round(D*N),y.style.width=`${V}px`,y.style.height=`${D}px`,U.save(),U.scale(N,N),U.clearRect(0,0,V,D),x.length===0){U.fillStyle="#64748b",U.font="14px -apple-system, sans-serif",U.textAlign="center",U.fillText("No memory clusters indexed yet. Record a rule or run git-learn.",V/2,D/2),U.restore();return}const w=8,O=x.map(I=>Math.max(1,I.count)),A=bv(O,w,w,V-2*w,D-2*w);_.current=x.map((I,X)=>({...A[X],module:I.module,items:I.items}));const P=[];for(const I of _.current){if(I.w<=4||I.h<=4)continue;const X=d?.module===I.module;U.save(),U.beginPath(),U.rect(I.x,I.y,I.w,I.h),U.clip(),U.fillStyle=X?"rgba(56, 189, 248, 0.08)":"rgba(255, 255, 255, 0.02)",U.fillRect(I.x,I.y,I.w,I.h),U.strokeStyle=X?"#38bdf8":"rgba(255, 255, 255, 0.1)",U.lineWidth=X?2:1,U.strokeRect(I.x,I.y,I.w,I.h);const et=Math.min(26,Math.max(16,I.h*.22));if(U.fillStyle=X?"rgba(56, 189, 248, 0.18)":"rgba(255, 255, 255, 0.05)",U.fillRect(I.x,I.y,I.w,et),U.fillStyle=X?"#38bdf8":"#e2e8f0",U.font="bold 11px -apple-system, sans-serif",U.textAlign="left",U.textBaseline="middle",I.w>40){const F=I.module.toUpperCase();U.fillText(`${F} (${I.items.length})`,I.x+8,I.y+et/2)}const Y=I.y+et+4,j=I.h-et-8,Q=I.w-8,B=I.x+4;if(j>10&&Q>10&&I.items.length>0){const F=I.items.map(G=>G.pinned?2:G.kind==="error_trap"?1.5:1),Z=bv(F,B,Y,Q,j);I.items.forEach((G,at)=>{const rt=Z[at];if(!rt||rt.w<=2||rt.h<=2)return;P.push({...rt,item:G,module:I.module});const Rt=p?.item.id===G.id;let Et="#10b981";if(G.pinned?Et="#8b5cf6":G.kind==="error_trap"?Et="#f59e0b":G.reward_score>=.7?Et="#0284c7":G.reward_score<.3&&(Et="#64748b"),U.save(),U.beginPath(),U.rect(rt.x+1,rt.y+1,rt.w-2,rt.h-2),U.clip(),U.fillStyle=Rt?Et:`${Et}33`,U.fillRect(rt.x+1,rt.y+1,rt.w-2,rt.h-2),U.strokeStyle=Rt?"#ffffff":Et,U.lineWidth=Rt?2:1,U.strokeRect(rt.x+1,rt.y+1,rt.w-2,rt.h-2),rt.w>65&&rt.h>24){U.fillStyle=Rt?"#ffffff":"#f8fafc",U.font="500 10px -apple-system, sans-serif",U.textAlign="left",U.textBaseline="top";const ae=G.kind==="error_trap"?`⚠️ ${G.title}`:G.title;U.fillText(ae,rt.x+6,rt.y+6,rt.w-12)}U.restore()})}U.restore()}S.current=P,U.restore()},[i,x,d,p]);Ct.useEffect(()=>{b();const y=()=>b();return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[b]);const T=y=>{const v=f.current;if(!v)return;const U=v.getBoundingClientRect(),V=y.clientX-U.left,D=y.clientY-U.top,N=S.current.find(O=>V>=O.x&&V<=O.x+O.w&&D>=O.y&&D<=O.y+O.h);if(N){m(N);const O=_.current.find(A=>A.module===N.module);h(O||null);return}m(null);const w=_.current.find(O=>V>=O.x&&V<=O.x+O.w&&D>=O.y&&D<=O.y+O.h);h(w||null)},L=()=>{p?e(p.item):d&&d.items.length>0&&e(d.items[0])};return M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsxs("div",{children:[M.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(gv,{size:16,color:"var(--accent)"}),"Nested Cognitive Memory Treemap"]}),M.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Interactive nested squarified clusters: Pinned (violet), 2.0x Error Traps (amber), Strong (blue), Active (green), Fading (slate)."})]}),M.jsxs("div",{style:{display:"flex",gap:"8px"},children:[M.jsxs("button",{onClick:()=>s("treemap"),className:`btn btn-pill ${i==="treemap"?"btn-primary":""}`,children:[M.jsx(gv,{size:13})," Treemap Canvas"]}),M.jsxs("button",{onClick:()=>s("table"),className:`btn btn-pill ${i==="table"?"btn-primary":""}`,children:[M.jsx(sb,{size:13})," Table Twin"]})]})]}),i==="treemap"?M.jsxs("div",{ref:l,style:{width:"100%",height:"520px",position:"relative",padding:"12px",boxSizing:"border-box"},children:[M.jsx("canvas",{ref:f,onMouseMove:T,onMouseLeave:()=>{h(null),m(null)},onClick:L,style:{width:"100%",height:"100%",display:"block",cursor:p||d?"pointer":"default"}}),(p||d)&&M.jsxs("div",{style:{position:"absolute",bottom:"20px",left:"20px",right:"20px",background:"rgba(15, 23, 42, 0.95)",border:"1px solid var(--accent)",borderRadius:"8px",padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 8px 24px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",zIndex:20},children:[M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--accent)",fontWeight:700,textTransform:"uppercase"},children:p?`${p.module} &bull; ${p.item.id}`:`${d?.module} Module`}),p?.item.kind==="error_trap"&&M.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0x TRAP"}),p?.item.pinned===1&&M.jsx("span",{className:"badge-tag",style:{background:"rgba(139, 92, 246, 0.15)",color:"#8b5cf6"},children:"PINNED"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginTop:"2px",color:"#fff"},children:p?p.item.title:`${d?.items.length} Memories Cluster`})]}),M.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Click to open inspector"}),p&&M.jsx(pi,{text:p.item.id,label:"Copy ID"})]})]})]}):M.jsx("div",{style:{overflowX:"auto"},children:M.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},"aria-rowcount":o.length,children:[M.jsx("thead",{children:M.jsxs("tr",{style:{background:"var(--bg-subtle)",textAlign:"left",borderBottom:"1px solid var(--border)"},children:[M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"ID"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Title"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Module"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Kind"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Score"}),M.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Actions"})]})}),M.jsx("tbody",{children:o.map((y,v)=>M.jsxs("tr",{onClick:()=>e(y),style:{borderBottom:"1px solid var(--border)",cursor:"pointer",background:v%2===0?"transparent":"var(--bg-subtle)"},children:[M.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)",fontSize:"12px"},children:y.id}),M.jsx("td",{style:{padding:"10px 16px",fontWeight:500},children:y.title}),M.jsx("td",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:y.module}),M.jsx("td",{style:{padding:"10px 16px"},children:M.jsx("span",{className:"badge-tag",style:{background:y.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:y.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:y.kind.toUpperCase()})}),M.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)"},children:y.reward_score}),M.jsx("td",{style:{padding:"10px 16px"},children:M.jsx(pi,{text:y.id,label:"ID"})})]},y.id))})]})})]})},wb=()=>{const[o,e]=Ct.useState("jwt expiration"),[i,s]=Ct.useState(!1),[l,f]=Ct.useState(null);return Ct.useEffect(()=>{if(!o.trim()){f(null);return}s(!0);const d=setTimeout(()=>{fetch(`/api/search/explain?q=${encodeURIComponent(o)}`).then(h=>h.json()).then(h=>{f(h),s(!1)}).catch(()=>s(!1))},200);return()=>clearTimeout(d)},[o]),M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)"},children:[M.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(rb,{size:16,color:"var(--accent)"}),"Live Triple-Stream RRF Search Diagnostic"]}),M.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Real backend query execution across FTS5 (BM25), Vector Cosine, and Spreading Activation graph with 2.0x trap boosting."}),M.jsxs("div",{style:{marginTop:"14px",position:"relative"},children:[M.jsx(ep,{size:15,style:{position:"absolute",left:"12px",top:"10px",color:"var(--text-muted)"}}),M.jsx("input",{type:"text",value:o,onChange:d=>e(d.target.value),placeholder:"Type query to trigger live RRF multi-stream fusion...",style:{width:"100%",padding:"8px 12px 8px 36px",borderRadius:"8px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text)",fontSize:"13px",outline:"none"}})]})]}),M.jsxs("div",{style:{padding:"20px"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px",marginBottom:"20px"},children:[M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#38bdf8",fontWeight:600},children:[M.jsx(ep,{size:14})," Stream A: FTS5 BM25"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.15,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"SQLite Full-Text Token Index"})]}),M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#a855f7",fontWeight:600},children:[M.jsx(ob,{size:14})," Stream B: Vector Cosine"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.45,l.totalTimeMs*.6).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Local In-Process Embeddings"})]}),M.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#34d399",fontWeight:600},children:[M.jsx(lb,{size:14})," Stream C: Graph Spreading"]}),M.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.2,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"2-Hop Causal Link Expansion"})]})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:"8px",background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",fontSize:"12px",fontFamily:"var(--font-mono)",marginBottom:"20px"},children:[M.jsxs("span",{children:["Total Pipeline Latency: ",M.jsx("b",{children:l?`${l.totalTimeMs} ms`:"—"})," (Budget: ",l?.totalTokens||0," tokens)"]}),M.jsx(pi,{text:`fastrmemory recall "${o}"`,label:"Copy Recall CLI"})]}),M.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:i?M.jsx("div",{className:"skeleton-box",style:{height:"120px"}}):!l||l.results.length===0?M.jsx("div",{style:{textAlign:"center",padding:"30px",color:"var(--text-muted)",fontSize:"13px"},children:"No memories matched this query in the live SQLite index."}):l.results.map((d,h)=>{const p=d.kind==="error_trap";return M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${p?"var(--trap)":"var(--accent)"}`},children:[M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:"var(--accent)"},children:["#",h+1]}),M.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:d.title}),p&&M.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0X TRAP BOOST"})]}),M.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:[M.jsx("code",{children:d.id})," • Module: ",M.jsx("b",{children:d.module})," • Ranks: [A: ",d.rankA??"—",", B: ",d.rankB??"—",", C: ",d.rankC??"—","]"]})]}),M.jsxs("div",{style:{textAlign:"right",display:"flex",alignItems:"center",gap:"14px"},children:[M.jsxs("div",{children:[M.jsx("div",{style:{fontSize:"13px",fontWeight:700,fontFamily:"var(--font-mono)"},children:d.score.toFixed(4)}),M.jsx("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:"Fused Score"})]}),M.jsx(pi,{text:d.id,label:"ID"})]})]},d.id)})})]})]})},Db=({conflict:o,memoryA:e,memoryB:i,onResolve:s})=>{const l=Ct.useMemo(()=>{const f=(e?.content||"").split(`
`),d=(i?.content||"").split(`
`),h=[],p=Math.max(f.length,d.length);for(let m=0;m<p;m++){const _=f[m],S=d[m];_===S?_!==void 0&&h.push({type:"same",text:_}):(_!==void 0&&h.push({type:"removed",text:_}),S!==void 0&&h.push({type:"added",text:S}))}return h},[e,i]);return M.jsxs("div",{className:"card-panel",style:{padding:"18px",marginBottom:"14px",borderLeft:"4px solid var(--risk)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{className:"badge-tag",style:{background:"var(--risk-weak)",color:"var(--risk)"},children:[M.jsx(O_,{size:12})," CONFLICT #",o.id," (",(o.score*100).toFixed(0),"%)"]}),M.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:o.reason})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:o.created_at}),M.jsx(pi,{text:`# Conflict ${o.id}
Memory A: ${o.memory_a_id}
Memory B: ${o.memory_b_id}
Reason: ${o.reason}`,label:"Copy Report"})]})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"},children:[M.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--accent)"},children:["MEMORY A: ",M.jsx("code",{children:o.memory_a_id})]}),M.jsx(pi,{text:o.memory_a_id,label:"ID"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:e?.title||"Memory A"}),M.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:e?.content||"Loading content..."})]}),M.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--risk)"},children:["MEMORY B: ",M.jsx("code",{children:o.memory_b_id})]}),M.jsx(pi,{text:o.memory_b_id,label:"ID"})]}),M.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:i?.title||"Memory B"}),M.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:i?.content||"Loading content..."})]})]}),M.jsx("div",{style:{background:"var(--bg)",borderRadius:"8px",border:"1px solid var(--border)",padding:"10px",fontFamily:"var(--font-mono)",fontSize:"12px",marginBottom:"14px",maxHeight:"160px",overflowY:"auto"},children:l.map((f,d)=>M.jsxs("div",{style:{padding:"2px 8px",borderRadius:"2px",background:f.type==="added"?"rgba(34, 197, 94, 0.12)":f.type==="removed"?"rgba(244, 63, 94, 0.12)":"transparent",color:f.type==="added"?"#4ade80":f.type==="removed"?"#fb7185":"var(--text-muted)",display:"flex",gap:"8px"},children:[M.jsx("span",{style:{userSelect:"none",width:"16px",color:"var(--text-faint)"},children:f.type==="added"?"+":f.type==="removed"?"-":" "}),M.jsx("span",{children:f.text})]},d))}),M.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[M.jsxs("button",{onClick:()=>s(o.id,o.memory_a_id,!0),className:"btn btn-primary",children:[M.jsx(tp,{size:14})," Keep A (",o.memory_a_id,")"]}),M.jsxs("button",{onClick:()=>s(o.id,o.memory_b_id,!0),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)"},children:[M.jsx(tp,{size:14})," Keep B (",o.memory_b_id,")"]}),M.jsx("button",{onClick:()=>s(o.id,o.memory_a_id,!1),className:"btn",children:"Keep Both (Weaken B Score)"})]})]})},Nb=({content:o,className:e,style:i})=>{if(!o)return null;const s=o.split(`
`),l=[];let f=!1,d=[],h="";const p=m=>m.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((S,x)=>S.startsWith("`")&&S.endsWith("`")?M.jsx("code",{style:{background:"var(--bg-subtle)",padding:"2px 6px",borderRadius:"4px",fontFamily:"var(--font-mono)",fontSize:"0.9em",color:"var(--accent)",border:"1px solid var(--border)"},children:S.slice(1,-1)},x):S.startsWith("**")&&S.endsWith("**")?M.jsx("strong",{style:{color:"var(--text-strong)",fontWeight:600},children:S.slice(2,-2)},x):S.startsWith("*")&&S.endsWith("*")?M.jsx("em",{children:S.slice(1,-1)},x):S);for(let m=0;m<s.length;m++){const _=s[m];if(_.trim().startsWith("```")){if(f){const x=d.join(`
`);l.push(M.jsxs("div",{style:{position:"relative",margin:"10px 0",borderRadius:"8px",background:"var(--bg-code, #0b0f19)",border:"1px solid var(--border)",overflow:"hidden"},children:[h&&M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 12px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid var(--border)",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[M.jsx("span",{children:h}),M.jsx(pi,{text:x,label:"Copy"})]}),M.jsx("pre",{style:{margin:0,padding:"12px 14px",fontFamily:"var(--font-mono)",fontSize:"12px",lineHeight:1.5,color:"#e2e8f0",overflowX:"auto"},children:M.jsx("code",{children:x})})]},`code-${m}`)),d=[],h="",f=!1}else f=!0,h=_.trim().slice(3).trim();continue}if(f){d.push(_);continue}if(_.startsWith("### ")){l.push(M.jsx("h4",{style:{fontSize:"14px",fontWeight:700,margin:"14px 0 6px 0",color:"var(--text-strong)"},children:p(_.slice(4))},`h4-${m}`));continue}if(_.startsWith("## ")){l.push(M.jsx("h3",{style:{fontSize:"15px",fontWeight:700,margin:"16px 0 8px 0",color:"var(--text-strong)"},children:p(_.slice(3))},`h3-${m}`));continue}if(_.startsWith("# ")){l.push(M.jsx("h2",{style:{fontSize:"17px",fontWeight:800,margin:"18px 0 10px 0",color:"var(--text-strong)"},children:p(_.slice(2))},`h2-${m}`));continue}if(_.trim().startsWith("- ")||_.trim().startsWith("* ")){l.push(M.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[M.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"•"}),M.jsx("div",{children:p(_.trim().slice(2))})]},`li-${m}`));continue}const S=_.trim().match(/^(\d+)\.\s+(.*)$/);if(S){l.push(M.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[M.jsxs("span",{style:{color:"var(--accent)",fontWeight:600,fontFamily:"var(--font-mono)"},children:[S[1],"."]}),M.jsx("div",{children:p(S[2])})]},`ol-${m}`));continue}if(_.trim().startsWith("> ")){l.push(M.jsx("blockquote",{style:{margin:"8px 0",padding:"6px 12px",borderLeft:"3px solid var(--accent)",background:"var(--accent-weak)",borderRadius:"0 6px 6px 0",fontSize:"12px",color:"var(--text)"},children:p(_.trim().slice(2))},`quote-${m}`));continue}if(!_.trim()){l.push(M.jsx("div",{style:{height:"8px"}},`sp-${m}`));continue}l.push(M.jsx("p",{style:{margin:"4px 0",fontSize:"13px",lineHeight:1.55,color:"var(--text)"},children:p(_)},`p-${m}`))}return M.jsx("div",{className:e,style:{...i,wordBreak:"break-word"},children:l})},Ub=({memory:o,onClose:e,onTogglePin:i,onForget:s})=>(Ct.useEffect(()=>{const l=f=>{f.key==="Escape"&&e()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[e]),o?M.jsxs(M.Fragment,{children:[M.jsx("div",{className:"drawer-backdrop",onClick:e}),M.jsxs("div",{className:"drawer-panel",onClick:l=>l.stopPropagation(),children:[M.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[M.jsxs("div",{style:{flex:1,paddingRight:"12px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[M.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600},children:["[",o.id,"]"]}),M.jsx("span",{className:"badge-tag",style:{background:o.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:o.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:o.kind.toUpperCase()}),M.jsx("span",{className:"badge-tag",style:{background:"var(--bg-subtle)",color:"var(--text-muted)"},children:o.status.toUpperCase()})]}),M.jsx("h2",{style:{fontSize:"15px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:o.title})]}),M.jsx("button",{onClick:e,className:"btn",style:{padding:"4px 8px",color:"var(--text-muted)"},title:"Close (Esc)",children:"✕"})]}),M.jsxs("div",{style:{padding:"10px 20px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{color:"var(--text-muted)"},children:"Author:"}),M.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"var(--text)",fontWeight:600},children:["@",o.agent_id||"default"]})]}),o.provenance_hash?M.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},title:`SHA-256 Authentic Provenance: ${o.provenance_hash}`,children:["🔒 prov_",o.provenance_hash.slice(0,10)]}):M.jsx("span",{style:{color:"var(--text-faint)",fontSize:"10px"},children:"legacy unsigned"})]}),M.jsxs("div",{style:{padding:"20px",flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"16px"},children:[M.jsxs("div",{children:[M.jsx("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:"Memory Content"}),M.jsx("div",{style:{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"6px",padding:"14px"},children:M.jsx(Nb,{content:o.content})})]}),o.linked_files&&o.linked_files.length>0&&M.jsxs("div",{children:[M.jsxs("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:["Linked Files (",o.linked_files.length,")"]}),M.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:o.linked_files.map(l=>M.jsx("span",{className:"badge-tag",style:{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--text-muted)"},children:l},l))})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",borderTop:"1px solid var(--border)",paddingTop:"14px"},children:[M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"MODULE"}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px"},children:o.module})]}),M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"REWARD"}),M.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px",color:"var(--accent)"},children:[o.reward_score.toFixed(2),"x"]})]}),M.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"CREATED"}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",marginTop:"2px",color:"var(--text-muted)"},children:new Date(o.created_at).toLocaleDateString()})]})]})]}),M.jsxs("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--border)",background:"var(--surface)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsxs("div",{style:{display:"flex",gap:"8px"},children:[M.jsx(pi,{text:o.content,label:"Copy Rule"}),M.jsx(pi,{text:`fastrmemory recall "${o.title}"`,label:"CLI"}),M.jsxs("button",{onClick:()=>i(o.id,o.pinned),className:"btn",style:{fontSize:"11.5px"},children:[M.jsx(P_,{size:12,color:o.pinned?"#8b5cf6":"var(--text-muted)"}),o.pinned?"Unpin":"Pin"]})]}),M.jsxs("button",{onClick:()=>s(o.id),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)",fontSize:"11.5px"},children:[M.jsx(cb,{size:12})," Forget"]})]})]})]}):null);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Yp="186",ao={ROTATE:0,DOLLY:1,PAN:2},no={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Lb=0,Ev=1,Ob=2,Eu=1,Pb=2,ml=3,Qs=0,jn=1,sa=2,Pa=0,xl=1,Tv=2,Av=3,Rv=4,Ib=5,eo=100,zb=101,Bb=102,Fb=103,Hb=104,Gb=200,Vb=201,kb=202,Xb=203,I_=204,z_=205,Wb=206,jb=207,qb=208,Yb=209,Zb=210,Kb=211,Qb=212,Jb=213,$b=214,np=0,ip=1,ap=2,vl=3,sp=4,rp=5,op=6,lp=7,B_=0,tE=1,eE=2,la=0,F_=1,H_=2,G_=3,Zp=4,V_=5,k_=6,X_=7,W_=300,Js=301,oo=302,yh=303,Sh=304,Hu=306,cp=1e3,Oa=1001,up=1002,On=1003,nE=1004,Kc=1005,Bn=1006,Mh=1007,Zs=1008,hi=1009,j_=1010,q_=1011,_l=1012,Kp=1013,ua=1014,ra=1015,fa=1016,Qp=1017,Jp=1018,yl=1020,Y_=35902,Z_=35899,K_=1021,Q_=1022,Hi=1023,za=1026,Ks=1027,J_=1028,$p=1029,$s=1030,tm=1031,em=1033,Tu=33776,Au=33777,Ru=33778,Cu=33779,fp=35840,dp=35841,hp=35842,pp=35843,mp=36196,gp=37492,xp=37496,vp=37488,_p=37489,Nu=37490,yp=37491,Sp=37808,Mp=37809,bp=37810,Ep=37811,Tp=37812,Ap=37813,Rp=37814,Cp=37815,wp=37816,Dp=37817,Np=37818,Up=37819,Lp=37820,Op=37821,Pp=36492,Ip=36494,zp=36495,Bp=36283,Fp=36284,Uu=36285,Hp=36286,iE=3200,Gp=0,aE=1,xs="",Ri="srgb",Lu="srgb-linear",Ou="linear",Ye="srgb",bh=7680,sE=519,rE=512,oE=513,lE=514,nm=515,cE=516,uE=517,im=518,fE=519,dE=35044,Cv="300 es",oa=2e3,Sl=2001;function hE(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function Pu(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function pE(){const o=Pu("canvas");return o.style.display="block",o}const wv={};function Dv(...o){const e="THREE."+o.shift();console.log(e,...o)}function $_(o){const e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function fe(...o){o=$_(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...o)}}function He(...o){o=$_(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...o)}}function so(...o){const e=o.join(" ");e in wv||(wv[e]=!0,fe(...o))}function mE(o,e,i){return new Promise(function(s,l){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}const gE={[np]:ip,[ap]:op,[sp]:lp,[vl]:rp,[ip]:np,[op]:ap,[lp]:sp,[rp]:vl};class ys{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const f=l.indexOf(i);f!==-1&&l.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let f=0,d=l.length;f<d;f++)l[f].call(this,e);e.target=null}}}const In=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],wu=Math.PI/180,Vp=180/Math.PI;function bl(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(In[o&255]+In[o>>8&255]+In[o>>16&255]+In[o>>24&255]+"-"+In[e&255]+In[e>>8&255]+"-"+In[e>>16&15|64]+In[e>>24&255]+"-"+In[i&63|128]+In[i>>8&255]+"-"+In[i>>16&255]+In[i>>24&255]+In[s&255]+In[s>>8&255]+In[s>>16&255]+In[s>>24&255]).toLowerCase()}function Ne(o,e,i){return Math.max(e,Math.min(i,o))}function xE(o,e){return(o%e+e)%e}function Eh(o,e,i){return(1-i)*o+i*e}function ol(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $n(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const vE={DEG2RAD:wu};class de{static{de.prototype.isVector2=!0}constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ne(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),f=this.x-e.x,d=this.y-e.y;return this.x=f*s-d*l+e.x,this.y=f*l+d*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vs{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,f,d,h){let p=s[l+0],m=s[l+1],_=s[l+2],S=s[l+3],x=f[d+0],b=f[d+1],T=f[d+2],L=f[d+3];if(S!==L||p!==x||m!==b||_!==T){let y=p*x+m*b+_*T+S*L;y<0&&(x=-x,b=-b,T=-T,L=-L,y=-y);let v=1-h;if(y<.9995){const U=Math.acos(y),V=Math.sin(U);v=Math.sin(v*U)/V,h=Math.sin(h*U)/V,p=p*v+x*h,m=m*v+b*h,_=_*v+T*h,S=S*v+L*h}else{p=p*v+x*h,m=m*v+b*h,_=_*v+T*h,S=S*v+L*h;const U=1/Math.sqrt(p*p+m*m+_*_+S*S);p*=U,m*=U,_*=U,S*=U}}e[i]=p,e[i+1]=m,e[i+2]=_,e[i+3]=S}static multiplyQuaternionsFlat(e,i,s,l,f,d){const h=s[l],p=s[l+1],m=s[l+2],_=s[l+3],S=f[d],x=f[d+1],b=f[d+2],T=f[d+3];return e[i]=h*T+_*S+p*b-m*x,e[i+1]=p*T+_*x+m*S-h*b,e[i+2]=m*T+_*b+h*x-p*S,e[i+3]=_*T-h*S-p*x-m*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,f=e._z,d=e._order,h=Math.cos,p=Math.sin,m=h(s/2),_=h(l/2),S=h(f/2),x=p(s/2),b=p(l/2),T=p(f/2);switch(d){case"XYZ":this._x=x*_*S+m*b*T,this._y=m*b*S-x*_*T,this._z=m*_*T+x*b*S,this._w=m*_*S-x*b*T;break;case"YXZ":this._x=x*_*S+m*b*T,this._y=m*b*S-x*_*T,this._z=m*_*T-x*b*S,this._w=m*_*S+x*b*T;break;case"ZXY":this._x=x*_*S-m*b*T,this._y=m*b*S+x*_*T,this._z=m*_*T+x*b*S,this._w=m*_*S-x*b*T;break;case"ZYX":this._x=x*_*S-m*b*T,this._y=m*b*S+x*_*T,this._z=m*_*T-x*b*S,this._w=m*_*S+x*b*T;break;case"YZX":this._x=x*_*S+m*b*T,this._y=m*b*S+x*_*T,this._z=m*_*T-x*b*S,this._w=m*_*S-x*b*T;break;case"XZY":this._x=x*_*S-m*b*T,this._y=m*b*S-x*_*T,this._z=m*_*T+x*b*S,this._w=m*_*S+x*b*T;break;default:fe("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],f=i[8],d=i[1],h=i[5],p=i[9],m=i[2],_=i[6],S=i[10],x=s+h+S;if(x>0){const b=.5/Math.sqrt(x+1);this._w=.25/b,this._x=(_-p)*b,this._y=(f-m)*b,this._z=(d-l)*b}else if(s>h&&s>S){const b=2*Math.sqrt(1+s-h-S);this._w=(_-p)/b,this._x=.25*b,this._y=(l+d)/b,this._z=(f+m)/b}else if(h>S){const b=2*Math.sqrt(1+h-s-S);this._w=(f-m)/b,this._x=(l+d)/b,this._y=.25*b,this._z=(p+_)/b}else{const b=2*Math.sqrt(1+S-s-h);this._w=(d-l)/b,this._x=(f+m)/b,this._y=(p+_)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ne(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,f=e._z,d=e._w,h=i._x,p=i._y,m=i._z,_=i._w;return this._x=s*_+d*h+l*m-f*p,this._y=l*_+d*p+f*h-s*m,this._z=f*_+d*m+s*p-l*h,this._w=d*_-s*h-l*p-f*m,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,f=e._z,d=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,f=-f,d=-d,h=-h);let p=1-i;if(h<.9995){const m=Math.acos(h),_=Math.sin(m);p=Math.sin(p*m)/_,i=Math.sin(i*m)/_,this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this._onChangeCallback()}else this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{static{nt.prototype.isVector3=!0}constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Nv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Nv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*l,this.y=f[1]*i+f[4]*s+f[7]*l,this.z=f[2]*i+f[5]*s+f[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=e.elements,d=1/(f[3]*i+f[7]*s+f[11]*l+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*l+f[12])*d,this.y=(f[1]*i+f[5]*s+f[9]*l+f[13])*d,this.z=(f[2]*i+f[6]*s+f[10]*l+f[14])*d,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,f=e.x,d=e.y,h=e.z,p=e.w,m=2*(d*l-h*s),_=2*(h*i-f*l),S=2*(f*s-d*i);return this.x=i+p*m+d*S-h*_,this.y=s+p*_+h*m-f*S,this.z=l+p*S+f*_-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l,this.y=f[1]*i+f[5]*s+f[9]*l,this.z=f[2]*i+f[6]*s+f[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this.z=Ne(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this.z=Ne(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,f=e.z,d=i.x,h=i.y,p=i.z;return this.x=l*p-f*h,this.y=f*d-s*p,this.z=s*h-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Th.copy(this).projectOnVector(e),this.sub(Th)}reflect(e){return this.sub(Th.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ne(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Th=new nt,Nv=new vs;class ve{static{ve.prototype.isMatrix3=!0}constructor(e,i,s,l,f,d,h,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m)}set(e,i,s,l,f,d,h,p,m){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=f,_[5]=p,_[6]=s,_[7]=d,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[3],p=s[6],m=s[1],_=s[4],S=s[7],x=s[2],b=s[5],T=s[8],L=l[0],y=l[3],v=l[6],U=l[1],V=l[4],D=l[7],N=l[2],w=l[5],O=l[8];return f[0]=d*L+h*U+p*N,f[3]=d*y+h*V+p*w,f[6]=d*v+h*D+p*O,f[1]=m*L+_*U+S*N,f[4]=m*y+_*V+S*w,f[7]=m*v+_*D+S*O,f[2]=x*L+b*U+T*N,f[5]=x*y+b*V+T*w,f[8]=x*v+b*D+T*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8];return i*d*_-i*h*m-s*f*_+s*h*p+l*f*m-l*d*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],S=_*d-h*m,x=h*p-_*f,b=m*f-d*p,T=i*S+s*x+l*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const L=1/T;return e[0]=S*L,e[1]=(l*m-_*s)*L,e[2]=(h*s-l*d)*L,e[3]=x*L,e[4]=(_*i-l*p)*L,e[5]=(l*f-h*i)*L,e[6]=b*L,e[7]=(s*p-m*i)*L,e[8]=(d*i-s*f)*L,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,f,d,h){const p=Math.cos(f),m=Math.sin(f);return this.set(s*p,s*m,-s*(p*d+m*h)+d+e,-l*m,l*p,-l*(-m*d+p*h)+h+i,0,0,1),this}scale(e,i){return so("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ah.makeScale(e,i)),this}rotate(e){return so("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ah.makeRotation(-e)),this}translate(e,i){return so("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ah.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ah=new ve,Uv=new ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Lv=new ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function _E(){const o={enabled:!0,workingColorSpace:Lu,spaces:{},convert:function(l,f,d){return this.enabled===!1||f===d||!f||!d||(this.spaces[f].transfer===Ye&&(l.r=Ia(l.r),l.g=Ia(l.g),l.b=Ia(l.b)),this.spaces[f].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[f].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===Ye&&(l.r=ro(l.r),l.g=ro(l.g),l.b=ro(l.b))),l},workingToColorSpace:function(l,f){return this.convert(l,this.workingColorSpace,f)},colorSpaceToWorking:function(l,f){return this.convert(l,f,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===xs?Ou:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,f=this.workingColorSpace){return l.fromArray(this.spaces[f].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,f,d){return l.copy(this.spaces[f].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,f){return so("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,f)},toWorkingColorSpace:function(l,f){return so("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[Lu]:{primaries:e,whitePoint:s,transfer:Ou,toXYZ:Uv,fromXYZ:Lv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ri},outputColorSpaceConfig:{drawingBufferColorSpace:Ri}},[Ri]:{primaries:e,whitePoint:s,transfer:Ye,toXYZ:Uv,fromXYZ:Lv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ri}}}),o}const Be=_E();function Ia(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ro(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Vr;class yE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Vr===void 0&&(Vr=Pu("canvas")),Vr.width=e.width,Vr.height=e.height;const l=Vr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Vr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=Pu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),f=l.data;for(let d=0;d<f.length;d++)f[d]=Ia(f[d]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ia(i[s]/255)*255):i[s]=Ia(i[s]);return{data:i,width:e.width,height:e.height}}else return fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let SE=0;class am{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:SE++}),this.uuid=bl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let f;if(Array.isArray(l)){f=[];for(let d=0,h=l.length;d<h;d++)l[d].isDataTexture?f.push(Rh(l[d].image)):f.push(Rh(l[d]))}else f=Rh(l);s.url=f}return i||(e.images[this.uuid]=s),s}}function Rh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?yE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(fe("Texture: Unable to serialize Texture."),{})}let ME=0;const Ch=new nt;class qn extends ys{constructor(e=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,s=Oa,l=Oa,f=Bn,d=Zs,h=Hi,p=hi,m=qn.DEFAULT_ANISOTROPY,_=xs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ME++}),this.uuid=bl(),this.name="",this.source=new am(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=f,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new de(0,0),this.repeat=new de(1,1),this.center=new de(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ch).x}get height(){return this.source.getSize(Ch).y}get depth(){return this.source.getSize(Ch).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){fe(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){fe(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==W_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cp:e.x=e.x-Math.floor(e.x);break;case Oa:e.x=e.x<0?0:1;break;case up:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cp:e.y=e.y-Math.floor(e.y);break;case Oa:e.y=e.y<0?0:1;break;case up:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=W_;qn.DEFAULT_ANISOTROPY=1;class on{static{on.prototype.isVector4=!0}constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=this.w,d=e.elements;return this.x=d[0]*i+d[4]*s+d[8]*l+d[12]*f,this.y=d[1]*i+d[5]*s+d[9]*l+d[13]*f,this.z=d[2]*i+d[6]*s+d[10]*l+d[14]*f,this.w=d[3]*i+d[7]*s+d[11]*l+d[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,f;const p=e.elements,m=p[0],_=p[4],S=p[8],x=p[1],b=p[5],T=p[9],L=p[2],y=p[6],v=p[10];if(Math.abs(_-x)<.01&&Math.abs(S-L)<.01&&Math.abs(T-y)<.01){if(Math.abs(_+x)<.1&&Math.abs(S+L)<.1&&Math.abs(T+y)<.1&&Math.abs(m+b+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const V=(m+1)/2,D=(b+1)/2,N=(v+1)/2,w=(_+x)/4,O=(S+L)/4,A=(T+y)/4;return V>D&&V>N?V<.01?(s=0,l=.707106781,f=.707106781):(s=Math.sqrt(V),l=w/s,f=O/s):D>N?D<.01?(s=.707106781,l=0,f=.707106781):(l=Math.sqrt(D),s=w/l,f=A/l):N<.01?(s=.707106781,l=.707106781,f=0):(f=Math.sqrt(N),s=O/f,l=A/f),this.set(s,l,f,i),this}let U=Math.sqrt((y-T)*(y-T)+(S-L)*(S-L)+(x-_)*(x-_));return Math.abs(U)<.001&&(U=1),this.x=(y-T)/U,this.y=(S-L)/U,this.z=(x-_)/U,this.w=Math.acos((m+b+v-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this.z=Ne(this.z,e.z,i.z),this.w=Ne(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this.z=Ne(this.z,e,i),this.w=Ne(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bE extends ys{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new on(0,0,e,i),this.scissorTest=!1,this.viewport=new on(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},f=new qn(l),d=s.count;for(let h=0;h<d;h++)this.textures[h]=f.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Bn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,f=this.textures.length;l<f;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new am(l)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const i=e.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gi extends bE{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class ty extends qn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class EE extends qn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class nn{static{nn.prototype.isMatrix4=!0}constructor(e,i,s,l,f,d,h,p,m,_,S,x,b,T,L,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m,_,S,x,b,T,L,y)}set(e,i,s,l,f,d,h,p,m,_,S,x,b,T,L,y){const v=this.elements;return v[0]=e,v[4]=i,v[8]=s,v[12]=l,v[1]=f,v[5]=d,v[9]=h,v[13]=p,v[2]=m,v[6]=_,v[10]=S,v[14]=x,v[3]=b,v[7]=T,v[11]=L,v[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,s=e.elements,l=1/kr.setFromMatrixColumn(e,0).length(),f=1/kr.setFromMatrixColumn(e,1).length(),d=1/kr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*d,i[9]=s[9]*d,i[10]=s[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,f=e.z,d=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),_=Math.cos(f),S=Math.sin(f);if(e.order==="XYZ"){const x=d*_,b=d*S,T=h*_,L=h*S;i[0]=p*_,i[4]=-p*S,i[8]=m,i[1]=b+T*m,i[5]=x-L*m,i[9]=-h*p,i[2]=L-x*m,i[6]=T+b*m,i[10]=d*p}else if(e.order==="YXZ"){const x=p*_,b=p*S,T=m*_,L=m*S;i[0]=x+L*h,i[4]=T*h-b,i[8]=d*m,i[1]=d*S,i[5]=d*_,i[9]=-h,i[2]=b*h-T,i[6]=L+x*h,i[10]=d*p}else if(e.order==="ZXY"){const x=p*_,b=p*S,T=m*_,L=m*S;i[0]=x-L*h,i[4]=-d*S,i[8]=T+b*h,i[1]=b+T*h,i[5]=d*_,i[9]=L-x*h,i[2]=-d*m,i[6]=h,i[10]=d*p}else if(e.order==="ZYX"){const x=d*_,b=d*S,T=h*_,L=h*S;i[0]=p*_,i[4]=T*m-b,i[8]=x*m+L,i[1]=p*S,i[5]=L*m+x,i[9]=b*m-T,i[2]=-m,i[6]=h*p,i[10]=d*p}else if(e.order==="YZX"){const x=d*p,b=d*m,T=h*p,L=h*m;i[0]=p*_,i[4]=L-x*S,i[8]=T*S+b,i[1]=S,i[5]=d*_,i[9]=-h*_,i[2]=-m*_,i[6]=b*S+T,i[10]=x-L*S}else if(e.order==="XZY"){const x=d*p,b=d*m,T=h*p,L=h*m;i[0]=p*_,i[4]=-S,i[8]=m*_,i[1]=x*S+L,i[5]=d*_,i[9]=b*S-T,i[2]=T*S-b,i[6]=h*_,i[10]=L*S+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(TE,e,AE)}lookAt(e,i,s){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ds.crossVectors(s,fi),ds.lengthSq()===0&&(Math.abs(s.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ds.crossVectors(s,fi)),ds.normalize(),Qc.crossVectors(fi,ds),l[0]=ds.x,l[4]=Qc.x,l[8]=fi.x,l[1]=ds.y,l[5]=Qc.y,l[9]=fi.y,l[2]=ds.z,l[6]=Qc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[4],p=s[8],m=s[12],_=s[1],S=s[5],x=s[9],b=s[13],T=s[2],L=s[6],y=s[10],v=s[14],U=s[3],V=s[7],D=s[11],N=s[15],w=l[0],O=l[4],A=l[8],P=l[12],I=l[1],X=l[5],et=l[9],Y=l[13],j=l[2],Q=l[6],B=l[10],F=l[14],Z=l[3],G=l[7],at=l[11],rt=l[15];return f[0]=d*w+h*I+p*j+m*Z,f[4]=d*O+h*X+p*Q+m*G,f[8]=d*A+h*et+p*B+m*at,f[12]=d*P+h*Y+p*F+m*rt,f[1]=_*w+S*I+x*j+b*Z,f[5]=_*O+S*X+x*Q+b*G,f[9]=_*A+S*et+x*B+b*at,f[13]=_*P+S*Y+x*F+b*rt,f[2]=T*w+L*I+y*j+v*Z,f[6]=T*O+L*X+y*Q+v*G,f[10]=T*A+L*et+y*B+v*at,f[14]=T*P+L*Y+y*F+v*rt,f[3]=U*w+V*I+D*j+N*Z,f[7]=U*O+V*X+D*Q+N*G,f[11]=U*A+V*et+D*B+N*at,f[15]=U*P+V*Y+D*F+N*rt,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[12],d=e[1],h=e[5],p=e[9],m=e[13],_=e[2],S=e[6],x=e[10],b=e[14],T=e[3],L=e[7],y=e[11],v=e[15],U=p*b-m*x,V=h*b-m*S,D=h*x-p*S,N=d*b-m*_,w=d*x-p*_,O=d*S-h*_;return i*(L*U-y*V+v*D)-s*(T*U-y*N+v*w)+l*(T*V-L*N+v*O)-f*(T*D-L*w+y*O)}determinantAffine(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[1],d=e[5],h=e[9],p=e[2],m=e[6],_=e[10];return i*(d*_-h*m)-s*(f*_-h*p)+l*(f*m-d*p)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],S=e[9],x=e[10],b=e[11],T=e[12],L=e[13],y=e[14],v=e[15],U=i*h-s*d,V=i*p-l*d,D=i*m-f*d,N=s*p-l*h,w=s*m-f*h,O=l*m-f*p,A=_*L-S*T,P=_*y-x*T,I=_*v-b*T,X=S*y-x*L,et=S*v-b*L,Y=x*v-b*y,j=U*Y-V*et+D*X+N*I-w*P+O*A;if(j===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const Q=1/j;return e[0]=(h*Y-p*et+m*X)*Q,e[1]=(l*et-s*Y-f*X)*Q,e[2]=(L*O-y*w+v*N)*Q,e[3]=(x*w-S*O-b*N)*Q,e[4]=(p*I-d*Y-m*P)*Q,e[5]=(i*Y-l*I+f*P)*Q,e[6]=(y*D-T*O-v*V)*Q,e[7]=(_*O-x*D+b*V)*Q,e[8]=(d*et-h*I+m*A)*Q,e[9]=(s*I-i*et-f*A)*Q,e[10]=(T*w-L*D+v*U)*Q,e[11]=(S*D-_*w-b*U)*Q,e[12]=(h*P-d*X-p*A)*Q,e[13]=(i*X-s*P+l*A)*Q,e[14]=(L*V-T*N-y*U)*Q,e[15]=(_*N-S*V+x*U)*Q,this}scale(e){const i=this.elements,s=e.x,l=e.y,f=e.z;return i[0]*=s,i[4]*=l,i[8]*=f,i[1]*=s,i[5]*=l,i[9]*=f,i[2]*=s,i[6]*=l,i[10]*=f,i[3]*=s,i[7]*=l,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),f=1-s,d=e.x,h=e.y,p=e.z,m=f*d,_=f*h;return this.set(m*d+s,m*h-l*p,m*p+l*h,0,m*h+l*p,_*h+s,_*p-l*d,0,m*p-l*h,_*p+l*d,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,f,d){return this.set(1,s,f,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,f=i._x,d=i._y,h=i._z,p=i._w,m=f+f,_=d+d,S=h+h,x=f*m,b=f*_,T=f*S,L=d*_,y=d*S,v=h*S,U=p*m,V=p*_,D=p*S,N=s.x,w=s.y,O=s.z;return l[0]=(1-(L+v))*N,l[1]=(b+D)*N,l[2]=(T-V)*N,l[3]=0,l[4]=(b-D)*w,l[5]=(1-(x+v))*w,l[6]=(y+U)*w,l[7]=0,l[8]=(T+V)*O,l[9]=(y-U)*O,l[10]=(1-(x+L))*O,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const f=this.determinantAffine();if(f===0)return s.set(1,1,1),i.identity(),this;let d=kr.set(l[0],l[1],l[2]).length();const h=kr.set(l[4],l[5],l[6]).length(),p=kr.set(l[8],l[9],l[10]).length();f<0&&(d=-d),Ii.copy(this);const m=1/d,_=1/h,S=1/p;return Ii.elements[0]*=m,Ii.elements[1]*=m,Ii.elements[2]*=m,Ii.elements[4]*=_,Ii.elements[5]*=_,Ii.elements[6]*=_,Ii.elements[8]*=S,Ii.elements[9]*=S,Ii.elements[10]*=S,i.setFromRotationMatrix(Ii),s.x=d,s.y=h,s.z=p,this}makePerspective(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,_=2*f/(i-e),S=2*f/(s-l),x=(i+e)/(i-e),b=(s+l)/(s-l);let T,L;if(p)T=f/(d-f),L=d*f/(d-f);else if(h===oa)T=-(d+f)/(d-f),L=-2*d*f/(d-f);else if(h===Sl)T=-d/(d-f),L=-d*f/(d-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=_,m[4]=0,m[8]=x,m[12]=0,m[1]=0,m[5]=S,m[9]=b,m[13]=0,m[2]=0,m[6]=0,m[10]=T,m[14]=L,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,_=2/(i-e),S=2/(s-l),x=-(i+e)/(i-e),b=-(s+l)/(s-l);let T,L;if(p)T=1/(d-f),L=d/(d-f);else if(h===oa)T=-2/(d-f),L=-(d+f)/(d-f);else if(h===Sl)T=-1/(d-f),L=-f/(d-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=_,m[4]=0,m[8]=0,m[12]=x,m[1]=0,m[5]=S,m[9]=0,m[13]=b,m[2]=0,m[6]=0,m[10]=T,m[14]=L,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const kr=new nt,Ii=new nn,TE=new nt(0,0,0),AE=new nt(1,1,1),ds=new nt,Qc=new nt,fi=new nt,Ov=new nn,Pv=new vs;class _s{constructor(e=0,i=0,s=0,l=_s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,f=l[0],d=l[4],h=l[8],p=l[1],m=l[5],_=l[9],S=l[2],x=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Ne(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,b),this._z=Math.atan2(-d,f)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-S,f),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-S,b),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-Ne(S,-1,1)),Math.abs(S)<.9999999?(this._x=Math.atan2(x,b),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(Ne(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-S,f)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-Ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,f)):(this._x=Math.atan2(-_,b),this._y=0);break;default:fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Ov.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Ov,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return Pv.setFromEuler(this),this.setFromQuaternion(Pv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_s.DEFAULT_ORDER="XYZ";class sm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let RE=0;const Iv=new nt,Xr=new vs,Ca=new nn,Jc=new nt,ll=new nt,CE=new nt,wE=new vs,zv=new nt(1,0,0),Bv=new nt(0,1,0),Fv=new nt(0,0,1),Hv={type:"added"},DE={type:"removed"},Wr={type:"childadded",child:null},wh={type:"childremoved",child:null};class Cn extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:RE++}),this.uuid=bl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const e=new nt,i=new _s,s=new vs,l=new nt(1,1,1);function f(){s.setFromEuler(i,!1)}function d(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new nn},normalMatrix:{value:new ve}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Xr.setFromAxisAngle(e,i),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,i){return Xr.setFromAxisAngle(e,i),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(zv,e)}rotateY(e){return this.rotateOnAxis(Bv,e)}rotateZ(e){return this.rotateOnAxis(Fv,e)}translateOnAxis(e,i){return Iv.copy(e).applyQuaternion(this.quaternion),this.position.add(Iv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(zv,e)}translateY(e){return this.translateOnAxis(Bv,e)}translateZ(e){return this.translateOnAxis(Fv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ca.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Jc.copy(e):Jc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ca.lookAt(ll,Jc,this.up):Ca.lookAt(Jc,ll,this.up),this.quaternion.setFromRotationMatrix(Ca),l&&(Ca.extractRotation(l.matrixWorld),Xr.setFromRotationMatrix(Ca),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(DE),wh.child=e,this.dispatchEvent(wh),wh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ca.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ca.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ca),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const d=this.children[s].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let f=0,d=l.length;f<d;f++)l[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,e,CE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,wE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,f=this.matrix.elements;f[12]+=i-f[0]*i-f[4]*s-f[8]*l,f[13]+=s-f[1]*i-f[5]*s-f[9]*l,f[14]+=l-f[2]*i-f[6]*s-f[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i,s=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const f=this.children;for(let d=0,h=f.length;d<h;d++)f[d].updateWorldMatrix(!1,!0,s)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function f(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=f(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,_=p.length;m<_;m++){const S=p[m];f(e.shapes,S)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(f(e.materials,this.material[p]));l.material=h}else l.material=f(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(f(e.animations,p))}}if(i){const h=d(e.geometries),p=d(e.materials),m=d(e.textures),_=d(e.images),S=d(e.shapes),x=d(e.skeletons),b=d(e.animations),T=d(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),_.length>0&&(s.images=_),S.length>0&&(s.shapes=S),x.length>0&&(s.skeletons=x),b.length>0&&(s.animations=b),T.length>0&&(s.nodes=T)}return s.object=l,s;function d(h){const p=[];for(const m in h){const _=h[m];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new nt(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $c extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const NE={type:"move"};class Dh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $c,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $c,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $c,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,f=null,d=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const L of e.hand.values()){const y=i.getJointPose(L,s),v=this._getHandJoint(m,L);y!==null&&(v.matrix.fromArray(y.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=y.radius),v.visible=y!==null}const _=m.joints["index-finger-tip"],S=m.joints["thumb-tip"],x=_.position.distanceTo(S.position),b=.02,T=.005;m.inputState.pinching&&x>b+T?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=b-T&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&f!==null&&(l=f),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(NE)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=f!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new $c;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const ey={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},tu={h:0,s:0,l:0};function Nh(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Re{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Ri){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Be.workingColorSpace){return this.r=e,this.g=i,this.b=s,Be.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Be.workingColorSpace){if(e=xE(e,1),i=Ne(i,0,1),s=Ne(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,d=2*s-f;this.r=Nh(d,f,e+1/3),this.g=Nh(d,f,e),this.b=Nh(d,f,e-1/3)}return Be.colorSpaceToWorking(this,l),this}setStyle(e,i=Ri){function s(f){f!==void 0&&parseFloat(f)<1&&fe("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const d=l[1],h=l[2];switch(d){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:fe("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=l[1],d=f.length;if(d===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(f,16),i);fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Ri){const s=ey[e.toLowerCase()];return s!==void 0?this.setHex(s,i):fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}copyLinearToSRGB(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ri){return Be.workingToColorSpace(zn.copy(this),e),Math.round(Ne(zn.r*255,0,255))*65536+Math.round(Ne(zn.g*255,0,255))*256+Math.round(Ne(zn.b*255,0,255))}getHexString(e=Ri){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Be.workingColorSpace){Be.workingToColorSpace(zn.copy(this),i);const s=zn.r,l=zn.g,f=zn.b,d=Math.max(s,l,f),h=Math.min(s,l,f);let p,m;const _=(h+d)/2;if(h===d)p=0,m=0;else{const S=d-h;switch(m=_<=.5?S/(d+h):S/(2-d-h),d){case s:p=(l-f)/S+(l<f?6:0);break;case l:p=(f-s)/S+2;break;case f:p=(s-l)/S+4;break}p/=6}return e.h=p,e.s=m,e.l=_,e}getRGB(e,i=Be.workingColorSpace){return Be.workingToColorSpace(zn.copy(this),i),e.r=zn.r,e.g=zn.g,e.b=zn.b,e}getStyle(e=Ri){Be.workingToColorSpace(zn.copy(this),e);const i=zn.r,s=zn.g,l=zn.b;return e!==Ri?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+i,hs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(hs),e.getHSL(tu);const s=Eh(hs.h,tu.h,i),l=Eh(hs.s,tu.s,i),f=Eh(hs.l,tu.l,i);return this.setHSL(s,l,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*l,this.g=f[1]*i+f[4]*s+f[7]*l,this.b=f[2]*i+f[5]*s+f[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const zn=new Re;Re.NAMES=ey;class rm{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=i}clone(){return new rm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class UE extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _s,this.environmentIntensity=1,this.environmentRotation=new _s,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zi=new nt,wa=new nt,Uh=new nt,Da=new nt,jr=new nt,qr=new nt,Gv=new nt,Lh=new nt,Oh=new nt,Ph=new nt,Ih=new on,zh=new on,Bh=new on;class Fi{constructor(e=new nt,i=new nt,s=new nt){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),zi.subVectors(e,i),l.cross(zi);const f=l.lengthSq();return f>0?l.multiplyScalar(1/Math.sqrt(f)):l.set(0,0,0)}static getBarycoord(e,i,s,l,f){zi.subVectors(l,i),wa.subVectors(s,i),Uh.subVectors(e,i);const d=zi.dot(zi),h=zi.dot(wa),p=zi.dot(Uh),m=wa.dot(wa),_=wa.dot(Uh),S=d*m-h*h;if(S===0)return f.set(0,0,0),null;const x=1/S,b=(m*p-h*_)*x,T=(d*_-h*p)*x;return f.set(1-b-T,T,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Da)===null?!1:Da.x>=0&&Da.y>=0&&Da.x+Da.y<=1}static getInterpolation(e,i,s,l,f,d,h,p){return this.getBarycoord(e,i,s,l,Da)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,Da.x),p.addScaledVector(d,Da.y),p.addScaledVector(h,Da.z),p)}static getInterpolatedAttribute(e,i,s,l,f,d){return Ih.setScalar(0),zh.setScalar(0),Bh.setScalar(0),Ih.fromBufferAttribute(e,i),zh.fromBufferAttribute(e,s),Bh.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Ih,f.x),d.addScaledVector(zh,f.y),d.addScaledVector(Bh,f.z),d}static isFrontFacing(e,i,s,l){return zi.subVectors(s,i),wa.subVectors(e,i),zi.cross(wa).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),wa.subVectors(this.a,this.b),zi.cross(wa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Fi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Fi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,f){return Fi.getInterpolation(e,this.a,this.b,this.c,i,s,l,f)}containsPoint(e){return Fi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Fi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,f=this.c;let d,h;jr.subVectors(l,s),qr.subVectors(f,s),Lh.subVectors(e,s);const p=jr.dot(Lh),m=qr.dot(Lh);if(p<=0&&m<=0)return i.copy(s);Oh.subVectors(e,l);const _=jr.dot(Oh),S=qr.dot(Oh);if(_>=0&&S<=_)return i.copy(l);const x=p*S-_*m;if(x<=0&&p>=0&&_<=0)return d=p/(p-_),i.copy(s).addScaledVector(jr,d);Ph.subVectors(e,f);const b=jr.dot(Ph),T=qr.dot(Ph);if(T>=0&&b<=T)return i.copy(f);const L=b*m-p*T;if(L<=0&&m>=0&&T<=0)return h=m/(m-T),i.copy(s).addScaledVector(qr,h);const y=_*T-b*S;if(y<=0&&S-_>=0&&b-T>=0)return Gv.subVectors(f,l),h=(S-_)/(S-_+(b-T)),i.copy(l).addScaledVector(Gv,h);const v=1/(y+L+x);return d=L*v,h=x*v,i.copy(s).addScaledVector(jr,d).addScaledVector(qr,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class El{constructor(e=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Bi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Bi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Bi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=f.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,Bi):Bi.fromBufferAttribute(f,d),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),eu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),eu.copy(s.boundingBox)),eu.applyMatrix4(e.matrixWorld),this.union(eu)}const l=e.children;for(let f=0,d=l.length;f<d;f++)this.expandByObject(l[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),nu.subVectors(this.max,cl),Yr.subVectors(e.a,cl),Zr.subVectors(e.b,cl),Kr.subVectors(e.c,cl),ps.subVectors(Zr,Yr),ms.subVectors(Kr,Zr),Xs.subVectors(Yr,Kr);let i=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Xs.z,Xs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Xs.z,0,-Xs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Xs.y,Xs.x,0];return!Fh(i,Yr,Zr,Kr,nu)||(i=[1,0,0,0,1,0,0,0,1],!Fh(i,Yr,Zr,Kr,nu))?!1:(iu.crossVectors(ps,ms),i=[iu.x,iu.y,iu.z],Fh(i,Yr,Zr,Kr,nu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Na[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Na[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Na[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Na[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Na[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Na[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Na[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Na[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Na),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Na=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Bi=new nt,eu=new El,Yr=new nt,Zr=new nt,Kr=new nt,ps=new nt,ms=new nt,Xs=new nt,cl=new nt,nu=new nt,iu=new nt,Ws=new nt;function Fh(o,e,i,s,l){for(let f=0,d=o.length-3;f<=d;f+=3){Ws.fromArray(o,f);const h=l.x*Math.abs(Ws.x)+l.y*Math.abs(Ws.y)+l.z*Math.abs(Ws.z),p=e.dot(Ws),m=i.dot(Ws),_=s.dot(Ws);if(Math.max(-Math.max(p,m,_),Math.min(p,m,_))>h)return!1}return!0}const xn=new nt,au=new de;let LE=0;class ca extends ys{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:LE++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=dE,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,f=this.itemSize;l<f;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)au.fromBufferAttribute(this,i),au.applyMatrix3(e),this.setXY(i,au.x,au.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyMatrix3(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyMatrix4(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyNormalMatrix(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.transformDirection(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=ol(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=$n(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ol(i,this.array)),i}setX(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ol(i,this.array)),i}setY(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ol(i,this.array)),i}setZ(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ol(i,this.array)),i}setW(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,f){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array),f=$n(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ny extends ca{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class iy extends ca{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Sn extends ca{constructor(e,i,s){super(new Float32Array(e),i,s)}}const OE=new El,ul=new nt,Hh=new nt;class Tl{constructor(e=new nt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):OE.setFromPoints(e).getCenter(s);let l=0;for(let f=0,d=e.length;f<d;f++)l=Math.max(l,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ul.subVectors(e,this.center);const i=ul.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ul,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Hh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ul.copy(e.center).add(Hh)),this.expandByPoint(ul.copy(e.center).sub(Hh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let PE=0;const Ai=new nn,Gh=new Cn,Qr=new nt,di=new El,fl=new El,Rn=new nt;class Fn extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:PE++}),this.uuid=bl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hE(e)?iy:ny)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new ve().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ai.makeRotationFromQuaternion(e),this.applyMatrix4(Ai),this}rotateX(e){return Ai.makeRotationX(e),this.applyMatrix4(Ai),this}rotateY(e){return Ai.makeRotationY(e),this.applyMatrix4(Ai),this}rotateZ(e){return Ai.makeRotationZ(e),this.applyMatrix4(Ai),this}translate(e,i,s){return Ai.makeTranslation(e,i,s),this.applyMatrix4(Ai),this}scale(e,i,s){return Ai.makeScale(e,i,s),this.applyMatrix4(Ai),this}lookAt(e){return Gh.lookAt(e),Gh.updateMatrix(),this.applyMatrix4(Gh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,f=e.length;l<f;l++){const d=e[l];s.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Sn(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const f=e[l];i.setXYZ(l,f.x,f.y,f.z||0)}e.length>i.count&&fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new El);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const f=i[s];di.setFromBufferAttribute(f),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Tl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(e){const s=this.boundingSphere.center;if(di.setFromBufferAttribute(e),i)for(let f=0,d=i.length;f<d;f++){const h=i[f];fl.setFromBufferAttribute(h),this.morphTargetsRelative?(Rn.addVectors(di.min,fl.min),di.expandByPoint(Rn),Rn.addVectors(di.max,fl.max),di.expandByPoint(Rn)):(di.expandByPoint(fl.min),di.expandByPoint(fl.max))}di.getCenter(s);let l=0;for(let f=0,d=e.count;f<d;f++)Rn.fromBufferAttribute(e,f),l=Math.max(l,s.distanceToSquared(Rn));if(i)for(let f=0,d=i.length;f<d;f++){const h=i[f],p=this.morphTargetsRelative;for(let m=0,_=h.count;m<_;m++)Rn.fromBufferAttribute(h,m),p&&(Qr.fromBufferAttribute(e,m),Rn.add(Qr)),l=Math.max(l,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,f=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==s.count)&&(d=new ca(new Float32Array(4*s.count),4),this.setAttribute("tangent",d));const h=[],p=[];for(let A=0;A<s.count;A++)h[A]=new nt,p[A]=new nt;const m=new nt,_=new nt,S=new nt,x=new de,b=new de,T=new de,L=new nt,y=new nt;function v(A,P,I){m.fromBufferAttribute(s,A),_.fromBufferAttribute(s,P),S.fromBufferAttribute(s,I),x.fromBufferAttribute(f,A),b.fromBufferAttribute(f,P),T.fromBufferAttribute(f,I),_.sub(m),S.sub(m),b.sub(x),T.sub(x);const X=1/(b.x*T.y-T.x*b.y);isFinite(X)&&(L.copy(_).multiplyScalar(T.y).addScaledVector(S,-b.y).multiplyScalar(X),y.copy(S).multiplyScalar(b.x).addScaledVector(_,-T.x).multiplyScalar(X),h[A].add(L),h[P].add(L),h[I].add(L),p[A].add(y),p[P].add(y),p[I].add(y))}let U=this.groups;U.length===0&&(U=[{start:0,count:e.count}]);for(let A=0,P=U.length;A<P;++A){const I=U[A],X=I.start,et=I.count;for(let Y=X,j=X+et;Y<j;Y+=3)v(e.getX(Y+0),e.getX(Y+1),e.getX(Y+2))}const V=new nt,D=new nt,N=new nt,w=new nt;function O(A){N.fromBufferAttribute(l,A),w.copy(N);const P=h[A];V.copy(P),V.sub(N.multiplyScalar(N.dot(P))).normalize(),D.crossVectors(w,P);const X=D.dot(p[A])<0?-1:1;d.setXYZW(A,V.x,V.y,V.z,X)}for(let A=0,P=U.length;A<P;++A){const I=U[A],X=I.start,et=I.count;for(let Y=X,j=X+et;Y<j;Y+=3)O(e.getX(Y+0)),O(e.getX(Y+1)),O(e.getX(Y+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new ca(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,b=s.count;x<b;x++)s.setXYZ(x,0,0,0);const l=new nt,f=new nt,d=new nt,h=new nt,p=new nt,m=new nt,_=new nt,S=new nt;if(e)for(let x=0,b=e.count;x<b;x+=3){const T=e.getX(x+0),L=e.getX(x+1),y=e.getX(x+2);l.fromBufferAttribute(i,T),f.fromBufferAttribute(i,L),d.fromBufferAttribute(i,y),_.subVectors(d,f),S.subVectors(l,f),_.cross(S),h.fromBufferAttribute(s,T),p.fromBufferAttribute(s,L),m.fromBufferAttribute(s,y),h.add(_),p.add(_),m.add(_),s.setXYZ(T,h.x,h.y,h.z),s.setXYZ(L,p.x,p.y,p.z),s.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,b=i.count;x<b;x+=3)l.fromBufferAttribute(i,x+0),f.fromBufferAttribute(i,x+1),d.fromBufferAttribute(i,x+2),_.subVectors(d,f),S.subVectors(l,f),_.cross(S),s.setXYZ(x+0,_.x,_.y,_.z),s.setXYZ(x+1,_.x,_.y,_.z),s.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(h,p){const m=h.array,_=h.itemSize,S=h.normalized,x=new m.constructor(p.length*_);let b=0,T=0;for(let L=0,y=p.length;L<y;L++){h.isInterleavedBufferAttribute?b=p[L]*h.data.stride+h.offset:b=p[L]*_;for(let v=0;v<_;v++)x[T++]=m[b++]}return new ca(x,_,S)}if(this.index===null)return fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Fn,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const f=this.morphAttributes;for(const h in f){const p=[],m=f[h];for(let _=0,S=m.length;_<S;_++){const x=m[_],b=e(x,s);p.push(b)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,p=d.length;h<p;h++){const m=d[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let f=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],_=[];for(let S=0,x=m.length;S<x;S++){const b=m[S];_.push(b.toJSON(e.data))}_.length>0&&(l[p]=_,f=!0)}f&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const m in l){const _=l[m];this.setAttribute(m,_.clone(i))}const f=e.morphAttributes;for(const m in f){const _=[],S=f[m];for(let x=0,b=S.length;x<b;x++)_.push(S[x].clone(i));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,_=d.length;m<_;m++){const S=d[m];this.addGroup(S.start,S.count,S.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Vh=new nt,IE=new nt,zE=new ve;class La{constructor(e=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Vh.subVectors(s,i).cross(IE.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Vh),f=this.normal.dot(l);if(f===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/f;return s===!0&&(d<0||d>1)?null:i.copy(e.start).addScaledVector(l,d)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||zE.getNormalMatrix(e),l=this.coplanarPoint(Vh).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let BE=0;class tr extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:BE++}),this.uuid=bl(),this.name="",this.type="Material",this.blending=xl,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=I_,this.blendDst=z_,this.blendEquation=eo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=vl,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=sE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bh,this.stencilZFail=bh,this.stencilZPass=bh,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){fe(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){fe(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(f=>f.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(f){const d=[];for(const h in f){const p=f[h];delete p.metadata,d.push(p)}return d}if(i){const f=l(e.textures),d=l(e.images);f.length>0&&(s.textures=f),d.length>0&&(s.images=d)}return s}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new La().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new de().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new de().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let f=0;f!==l;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ua=new nt,kh=new nt,su=new nt,ru=new nt;class Al{constructor(e=new nt,i=new nt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ua)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ua.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ua.copy(this.origin).addScaledVector(this.direction,i),Ua.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){kh.copy(e).add(i).multiplyScalar(.5),su.copy(i).sub(e).normalize(),ru.copy(this.origin).sub(kh);const f=e.distanceTo(i)*.5,d=-this.direction.dot(su),h=ru.dot(this.direction),p=-ru.dot(su),m=ru.lengthSq(),_=Math.abs(1-d*d);let S,x,b,T;if(_>0)if(S=d*p-h,x=d*h-p,T=f*_,S>=0)if(x>=-T)if(x<=T){const L=1/_;S*=L,x*=L,b=S*(S+d*x+2*h)+x*(d*S+x+2*p)+m}else x=f,S=Math.max(0,-(d*x+h)),b=-S*S+x*(x+2*p)+m;else x=-f,S=Math.max(0,-(d*x+h)),b=-S*S+x*(x+2*p)+m;else x<=-T?(S=Math.max(0,-(-d*f+h)),x=S>0?-f:Math.min(Math.max(-f,-p),f),b=-S*S+x*(x+2*p)+m):x<=T?(S=0,x=Math.min(Math.max(-f,-p),f),b=x*(x+2*p)+m):(S=Math.max(0,-(d*f+h)),x=S>0?f:Math.min(Math.max(-f,-p),f),b=-S*S+x*(x+2*p)+m);else x=d>0?-f:f,S=Math.max(0,-(d*x+h)),b=-S*S+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,S),l&&l.copy(kh).addScaledVector(su,x),b}intersectSphere(e,i){if(e.radius<0)return null;Ua.subVectors(e.center,this.origin);const s=Ua.dot(this.direction),l=Ua.dot(Ua)-s*s,f=e.radius*e.radius;if(l>f)return null;const d=Math.sqrt(f-l),h=s-d,p=s+d;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,f,d,h,p;const m=1/this.direction.x,_=1/this.direction.y,S=1/this.direction.z,x=this.origin;return m>=0?(s=(e.min.x-x.x)*m,l=(e.max.x-x.x)*m):(s=(e.max.x-x.x)*m,l=(e.min.x-x.x)*m),_>=0?(f=(e.min.y-x.y)*_,d=(e.max.y-x.y)*_):(f=(e.max.y-x.y)*_,d=(e.min.y-x.y)*_),s>d||f>l||((f>s||isNaN(s))&&(s=f),(d<l||isNaN(l))&&(l=d),S>=0?(h=(e.min.z-x.z)*S,p=(e.max.z-x.z)*S):(h=(e.max.z-x.z)*S,p=(e.min.z-x.z)*S),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,Ua)!==null}intersectTriangle(e,i,s,l,f){const d=this.origin,h=this.direction,p=h.x,m=h.y,_=h.z,S=e.x-d.x,x=e.y-d.y,b=e.z-d.z,T=i.x-d.x,L=i.y-d.y,y=i.z-d.z,v=s.x-d.x,U=s.y-d.y,V=s.z-d.z,D=Math.abs(p),N=Math.abs(m),w=Math.abs(_);let O,A,P,I,X,et,Y,j,Q,B,F,Z;if(D>=N&&D>=w?(P=p,et=S,Q=T,Z=v,p>=0?(O=m,A=_,I=x,X=b,Y=L,j=y,B=U,F=V):(O=_,A=m,I=b,X=x,Y=y,j=L,B=V,F=U)):N>=w?(P=m,et=x,Q=L,Z=U,m>=0?(O=_,A=p,I=b,X=S,Y=y,j=T,B=V,F=v):(O=p,A=_,I=S,X=b,Y=T,j=y,B=v,F=V)):(P=_,et=b,Q=y,Z=V,_>=0?(O=p,A=m,I=S,X=x,Y=T,j=L,B=v,F=U):(O=m,A=p,I=x,X=S,Y=L,j=T,B=U,F=v)),P===0)return null;const G=O/P,at=A/P,rt=1/P,Rt=I-G*et,Et=X-at*et,ae=Y-G*Q,ce=j-at*Q,he=B-G*Z,pt=F-at*Z,vt=he*ce-pt*ae,Dt=Rt*pt-Et*he,te=ae*Et-ce*Rt;if(l){if(vt<0||Dt<0||te<0)return null}else if((vt<0||Dt<0||te<0)&&(vt>0||Dt>0||te>0))return null;const gt=vt+Dt+te;if(gt===0)return null;const Tt=rt*(vt*et+Dt*Q+te*Z);return(gt>0?Tt<0:Tt>0)?null:this.at(Tt/gt,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Iu extends tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.combine=B_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Vv=new nn,js=new Al,ou=new Tl,kv=new nt,lu=new nt,cu=new nt,uu=new nt,Xh=new nt,fu=new nt,Xv=new nt,du=new nt;class wi extends Cn{constructor(e=new Fn,i=new Iu){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,f=s.morphAttributes.position,d=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(f&&h){fu.set(0,0,0);for(let p=0,m=f.length;p<m;p++){const _=h[p],S=f[p];_!==0&&(Xh.fromBufferAttribute(S,e),d?fu.addScaledVector(Xh,_):fu.addScaledVector(Xh.sub(i),_))}i.add(fu)}return i}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.material,f=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),ou.copy(s.boundingSphere),ou.applyMatrix4(f),js.copy(e.ray).recast(e.near),!(ou.containsPoint(js.origin)===!1&&(js.intersectSphere(ou,kv)===null||js.origin.distanceToSquared(kv)>(e.far-e.near)**2))&&(Vv.copy(f).invert(),js.copy(e.ray).applyMatrix4(Vv),!(s.boundingBox!==null&&js.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,js)))}_computeIntersections(e,i,s){let l;const f=this.geometry,d=this.material,h=f.index,p=f.attributes.position,m=f.attributes.uv,_=f.attributes.uv1,S=f.attributes.normal,x=f.groups,b=f.drawRange;if(h!==null)if(Array.isArray(d))for(let T=0,L=x.length;T<L;T++){const y=x[T],v=d[y.materialIndex],U=Math.max(y.start,b.start),V=Math.min(h.count,Math.min(y.start+y.count,b.start+b.count));for(let D=U,N=V;D<N;D+=3){const w=h.getX(D),O=h.getX(D+1),A=h.getX(D+2);l=hu(this,v,e,s,m,_,S,w,O,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),L=Math.min(h.count,b.start+b.count);for(let y=T,v=L;y<v;y+=3){const U=h.getX(y),V=h.getX(y+1),D=h.getX(y+2);l=hu(this,d,e,s,m,_,S,U,V,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(d))for(let T=0,L=x.length;T<L;T++){const y=x[T],v=d[y.materialIndex],U=Math.max(y.start,b.start),V=Math.min(p.count,Math.min(y.start+y.count,b.start+b.count));for(let D=U,N=V;D<N;D+=3){const w=D,O=D+1,A=D+2;l=hu(this,v,e,s,m,_,S,w,O,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),L=Math.min(p.count,b.start+b.count);for(let y=T,v=L;y<v;y+=3){const U=y,V=y+1,D=y+2;l=hu(this,d,e,s,m,_,S,U,V,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function FE(o,e,i,s,l,f,d,h){let p;if(e.side===jn?p=s.intersectTriangle(d,f,l,!0,h):p=s.intersectTriangle(l,f,d,e.side===Qs,h),p===null)return null;du.copy(h),du.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(du);return m<i.near||m>i.far?null:{distance:m,point:du.clone(),object:o}}function hu(o,e,i,s,l,f,d,h,p,m){o.getVertexPosition(h,lu),o.getVertexPosition(p,cu),o.getVertexPosition(m,uu);const _=FE(o,e,i,s,lu,cu,uu,Xv);if(_){const S=new nt;Fi.getBarycoord(Xv,lu,cu,uu,S),l&&(_.uv=Fi.getInterpolatedAttribute(l,h,p,m,S,new de)),f&&(_.uv1=Fi.getInterpolatedAttribute(f,h,p,m,S,new de)),d&&(_.normal=Fi.getInterpolatedAttribute(d,h,p,m,S,new nt),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new nt,materialIndex:0};Fi.getNormal(lu,cu,uu,x.normal),_.face=x,_.barycoord=S}return _}class HE extends qn{constructor(e=null,i=1,s=1,l,f,d,h,p,m=On,_=On,S,x){super(null,d,h,p,m,_,l,f,S,x),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qs=new Tl,GE=new de(.5,.5),pu=new nt;class om{constructor(e=new La,i=new La,s=new La,l=new La,f=new La,d=new La){this.planes=[e,i,s,l,f,d]}set(e,i,s,l,f,d){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(f),h[5].copy(d),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=oa,s=!1){const l=this.planes,f=e.elements,d=f[0],h=f[1],p=f[2],m=f[3],_=f[4],S=f[5],x=f[6],b=f[7],T=f[8],L=f[9],y=f[10],v=f[11],U=f[12],V=f[13],D=f[14],N=f[15];if(l[0].setComponents(m-d,b-_,v-T,N-U).normalize(),l[1].setComponents(m+d,b+_,v+T,N+U).normalize(),l[2].setComponents(m+h,b+S,v+L,N+V).normalize(),l[3].setComponents(m-h,b-S,v-L,N-V).normalize(),s)l[4].setComponents(p,x,y,D).normalize(),l[5].setComponents(m-p,b-x,v-y,N-D).normalize();else if(l[4].setComponents(m-p,b-x,v-y,N-D).normalize(),i===oa)l[5].setComponents(m+p,b+x,v+y,N+D).normalize();else if(i===Sl)l[5].setComponents(p,x,y,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){qs.center.set(0,0,0);const i=GE.distanceTo(e.center);return qs.radius=.7071067811865476+i,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(pu.x=l.normal.x>0?e.max.x:e.min.x,pu.y=l.normal.y>0?e.max.y:e.min.y,pu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(pu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class lm extends tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const zu=new nt,Bu=new nt,Wv=new nn,dl=new Al,mu=new Tl,Wh=new nt,jv=new nt;class VE extends Cn{constructor(e=new Fn,i=new lm){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,f=i.count;l<f;l++)zu.fromBufferAttribute(i,l-1),Bu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=zu.distanceTo(Bu);e.setAttribute("lineDistance",new Sn(s,1))}else fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.matrixWorld,f=e.params.Line.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),mu.copy(s.boundingSphere),mu.applyMatrix4(l),mu.radius+=f,e.ray.intersectsSphere(mu)===!1)return;Wv.copy(l).invert(),dl.copy(e.ray).applyMatrix4(Wv);const h=f/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,_=s.index,x=s.attributes.position;if(_!==null){const b=Math.max(0,d.start),T=Math.min(_.count,d.start+d.count);for(let L=b,y=T-1;L<y;L+=m){const v=_.getX(L),U=_.getX(L+1),V=gu(this,e,dl,p,v,U,L);V&&i.push(V)}if(this.isLineLoop){const L=_.getX(T-1),y=_.getX(b),v=gu(this,e,dl,p,L,y,T-1);v&&i.push(v)}}else{const b=Math.max(0,d.start),T=Math.min(x.count,d.start+d.count);for(let L=b,y=T-1;L<y;L+=m){const v=gu(this,e,dl,p,L,L+1,L);v&&i.push(v)}if(this.isLineLoop){const L=gu(this,e,dl,p,T-1,b,T-1);L&&i.push(L)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}}function gu(o,e,i,s,l,f,d){const h=o.geometry.attributes.position;if(zu.fromBufferAttribute(h,l),Bu.fromBufferAttribute(h,f),i.distanceSqToSegment(zu,Bu,Wh,jv)>s)return;Wh.applyMatrix4(o.matrixWorld);const m=e.ray.origin.distanceTo(Wh);if(!(m<e.near||m>e.far))return{distance:m,point:jv.clone().applyMatrix4(o.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:o}}const qv=new nt,Yv=new nt;class ay extends VE{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,f=i.count;l<f;l+=2)qv.fromBufferAttribute(i,l),Yv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+qv.distanceTo(Yv);e.setAttribute("lineDistance",new Sn(s,1))}else fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sy extends tr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Zv=new nn,kp=new Al,xu=new Tl,vu=new nt;class kE extends Cn{constructor(e=new Fn,i=new sy){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.matrixWorld,f=e.params.Points.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),xu.copy(s.boundingSphere),xu.applyMatrix4(l),xu.radius+=f,e.ray.intersectsSphere(xu)===!1)return;Zv.copy(l).invert(),kp.copy(e.ray).applyMatrix4(Zv);const h=f/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=s.index,S=s.attributes.position;if(m!==null){const x=Math.max(0,d.start),b=Math.min(m.count,d.start+d.count);for(let T=x,L=b;T<L;T++){const y=m.getX(T);vu.fromBufferAttribute(S,y),Kv(vu,y,p,l,e,i,this)}}else{const x=Math.max(0,d.start),b=Math.min(S.count,d.start+d.count);for(let T=x,L=b;T<L;T++)vu.fromBufferAttribute(S,T),Kv(vu,T,p,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}}function Kv(o,e,i,s,l,f,d){const h=kp.distanceSqToPoint(o);if(h<i){const p=new nt;kp.closestPointToPoint(o,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;f.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:d})}}class ry extends qn{constructor(e=[],i=Js,s,l,f,d,h,p,m,_){super(e,i,s,l,f,d,h,p,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ml extends qn{constructor(e,i,s=ua,l,f,d,h=On,p=On,m,_=za,S=1){if(_!==za&&_!==Ks)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:i,depth:S};super(x,l,f,d,h,p,_,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new am(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return i.compareFunction=this.compareFunction,i}}class XE extends Ml{constructor(e,i=ua,s=Js,l,f,d=On,h=On,p,m=za){const _={width:e,height:e,depth:1},S=[_,_,_,_,_,_];super(e,e,i,s,l,f,d,h,p,m),this.image=S,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class oy extends qn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Rl extends Fn{constructor(e=1,i=1,s=1,l=1,f=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:f,depthSegments:d};const h=this;l=Math.floor(l),f=Math.floor(f),d=Math.floor(d);const p=[],m=[],_=[],S=[];let x=0,b=0;T("z","y","x",-1,-1,s,i,e,d,f,0),T("z","y","x",1,-1,s,i,-e,d,f,1),T("x","z","y",1,1,e,s,i,l,d,2),T("x","z","y",1,-1,e,s,-i,l,d,3),T("x","y","z",1,-1,e,i,s,l,f,4),T("x","y","z",-1,-1,e,i,-s,l,f,5),this.setIndex(p),this.setAttribute("position",new Sn(m,3)),this.setAttribute("normal",new Sn(_,3)),this.setAttribute("uv",new Sn(S,2));function T(L,y,v,U,V,D,N,w,O,A,P){const I=D/O,X=N/A,et=D/2,Y=N/2,j=w/2,Q=O+1,B=A+1;let F=0,Z=0;const G=new nt;for(let at=0;at<B;at++){const rt=at*X-Y;for(let Rt=0;Rt<Q;Rt++){const Et=Rt*I-et;G[L]=Et*U,G[y]=rt*V,G[v]=j,m.push(G.x,G.y,G.z),G[L]=0,G[y]=0,G[v]=w>0?1:-1,_.push(G.x,G.y,G.z),S.push(Rt/O),S.push(1-at/A),F+=1}}for(let at=0;at<A;at++)for(let rt=0;rt<O;rt++){const Rt=x+rt+Q*at,Et=x+rt+Q*(at+1),ae=x+(rt+1)+Q*(at+1),ce=x+(rt+1)+Q*at;p.push(Rt,Et,ce),p.push(Et,ae,ce),Z+=6}h.addGroup(b,Z,P),b+=Z,x+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Rl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Gu extends Fn{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const f=e/2,d=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,_=p+1,S=e/h,x=i/p,b=[],T=[],L=[],y=[];for(let v=0;v<_;v++){const U=v*x-d;for(let V=0;V<m;V++){const D=V*S-f;T.push(D,-U,0),L.push(0,0,1),y.push(V/h),y.push(1-v/p)}}for(let v=0;v<p;v++)for(let U=0;U<h;U++){const V=U+m*v,D=U+m*(v+1),N=U+1+m*(v+1),w=U+1+m*v;b.push(V,D,w),b.push(D,N,w)}this.setIndex(b),this.setAttribute("position",new Sn(T,3)),this.setAttribute("normal",new Sn(L,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gu(e.width,e.height,e.widthSegments,e.heightSegments)}}class cm extends Fn{constructor(e=.5,i=1,s=32,l=1,f=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:f,thetaLength:d},s=Math.max(3,s),l=Math.max(1,l);const h=[],p=[],m=[],_=[];let S=e;const x=(i-e)/l,b=new nt,T=new de;for(let L=0;L<=l;L++){for(let y=0;y<=s;y++){const v=f+y/s*d;b.x=S*Math.cos(v),b.y=S*Math.sin(v),p.push(b.x,b.y,b.z),m.push(0,0,1),T.x=(b.x/i+1)/2,T.y=(b.y/i+1)/2,_.push(T.x,T.y)}S+=x}for(let L=0;L<l;L++){const y=L*(s+1);for(let v=0;v<s;v++){const U=v+y,V=U,D=U+s+1,N=U+s+2,w=U+1;h.push(V,D,w),h.push(D,N,w)}}this.setIndex(h),this.setAttribute("position",new Sn(p,3)),this.setAttribute("normal",new Sn(m,3)),this.setAttribute("uv",new Sn(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new cm(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Fu extends Fn{constructor(e=1,i=32,s=16,l=0,f=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:f,thetaStart:d,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(d+h,Math.PI);let m=0;const _=[],S=new nt,x=new nt,b=[],T=[],L=[],y=[];for(let v=0;v<=s;v++){const U=[],V=v/s,D=d+V*h,N=e*Math.cos(D),w=Math.sqrt(e*e-N*N);let O=0;v===0&&d===0?O=.5/i:v===s&&p===Math.PI&&(O=-.5/i);for(let A=0;A<=i;A++){const P=A/i,I=l+P*f;S.x=-w*Math.cos(I),S.y=N,S.z=w*Math.sin(I),T.push(S.x,S.y,S.z),x.copy(S).normalize(),L.push(x.x,x.y,x.z),y.push(P+O,1-V),U.push(m++)}_.push(U)}for(let v=0;v<s;v++)for(let U=0;U<i;U++){const V=_[v][U+1],D=_[v][U],N=_[v+1][U],w=_[v+1][U+1];(v!==0||d>0)&&b.push(V,D,w),(v!==s-1||p<Math.PI)&&b.push(D,N,w)}this.setIndex(b),this.setAttribute("position",new Sn(T,3)),this.setAttribute("normal",new Sn(L,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Fu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function lo(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];if(Qv(l))l.isRenderTargetTexture?(fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if(Qv(l[0])){const f=[];for(let d=0,h=l.length;d<h;d++)f[d]=l[d].clone();e[i][s]=f}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Wn(o){const e={};for(let i=0;i<o.length;i++){const s=lo(o[i]);for(const l in s)e[l]=s[l]}return e}function Qv(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function WE(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function ly(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const jE={clone:lo,merge:Wn};var qE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,YE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class da extends tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qE,this.fragmentShader=YE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lo(e.uniforms),this.uniformsGroups=WE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const s in e.uniforms){const l=e.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Re().setHex(l.value);break;case"v2":this.uniforms[s].value=new de().fromArray(l.value);break;case"v3":this.uniforms[s].value=new nt().fromArray(l.value);break;case"v4":this.uniforms[s].value=new on().fromArray(l.value);break;case"m3":this.uniforms[s].value=new ve().fromArray(l.value);break;case"m4":this.uniforms[s].value=new nn().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ZE extends da{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class KE extends tr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Gp,this.normalScale=new de(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class QE extends tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=iE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class JE extends tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class cy extends Cn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=i}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const jh=new nn,Jv=new nt,$v=new nt;class $E{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new de(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new nn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new om,this._frameExtents=new de(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera;Jv.setFromMatrixPosition(e.matrixWorld),i.position.copy(Jv),$v.setFromMatrixPosition(e.target.matrixWorld),i.lookAt($v),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(e,i,s,l){jh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s.setFromProjectionMatrix(jh,e.coordinateSystem,e.reversedDepth);const f=this._frameExtents,d=l?l.z/f.x:1,h=l?l.w/f.y:1,p=l?l.x/f.x:0,m=l?l.y/f.y:0;e.coordinateSystem===Sl||e.reversedDepth?i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,1,0,0,0,0,1):i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,.5,.5,0,0,0,1),i.multiply(jh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const _u=new nt,yu=new vs,na=new nt;class uy extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=oa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_u,yu,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_u,yu,na.set(1,1,1)).invert()}updateWorldMatrix(e,i,s=!1){super.updateWorldMatrix(e,i,s),this.matrixWorld.decompose(_u,yu,na),na.x===1&&na.y===1&&na.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_u,yu,na.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new nt,t_=new de,e_=new de;class Ci extends uy{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Vp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(wu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Vp*2*Math.atan(Math.tan(wu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,i){return this.getViewBounds(e,t_,e_),i.subVectors(e_,t_)}setViewOffset(e,i,s,l,f,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(wu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,f=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const p=d.fullWidth,m=d.fullHeight;f+=d.offsetX*l/p,i-=d.offsetY*s/m,l*=d.width/p,s*=d.height/m}const h=this.filmOffset;h!==0&&(f+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class um extends uy{constructor(e=-1,i=1,s=1,l=-1,f=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=f,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,f,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let f=s-e,d=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=m*this.view.offsetX,d=f+m*this.view.width,h-=_*this.view.offsetY,p=h-_*this.view.height}this.projectionMatrix.makeOrthographic(f,d,h,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class t1 extends $E{constructor(){super(new um(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class n_ extends cy{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new t1}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class e1 extends cy{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Jr=-90,$r=1;class n1 extends Cn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Ci(Jr,$r,e,i);l.layers=this.layers,this.add(l);const f=new Ci(Jr,$r,e,i);f.layers=this.layers,this.add(f);const d=new Ci(Jr,$r,e,i);d.layers=this.layers,this.add(d);const h=new Ci(Jr,$r,e,i);h.layers=this.layers,this.add(h);const p=new Ci(Jr,$r,e,i);p.layers=this.layers,this.add(p);const m=new Ci(Jr,$r,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,f,d,h,p]=i;for(const m of i)this.remove(m);if(e===oa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Sl)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,d,h,p,m,_]=this.children,S=e.getRenderTarget(),x=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const L=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,1,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(s,2,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,4,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),s.texture.generateMipmaps=L,e.setRenderTarget(s,5,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,_),e.setRenderTarget(S,x,b),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class i1 extends Ci{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const i_=new nn;class a_{constructor(e,i,s=0,l=1/0){this.ray=new Al(e,i),this.near=s,this.far=l,this.camera=null,this.layers=new sm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):He("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return i_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(i_),this}intersectObject(e,i=!0,s=[]){return Xp(e,this,s,i),s.sort(s_),s}intersectObjects(e,i=!0,s=[]){for(let l=0,f=e.length;l<f;l++)Xp(e[l],this,s,i);return s.sort(s_),s}}function s_(o,e){return o.distance-e.distance}function Xp(o,e,i,s){let l=!0;if(o.layers.test(e.layers)&&o.raycast(e,i)===!1&&(l=!1),l===!0&&s===!0){const f=o.children;for(let d=0,h=f.length;d<h;d++)Xp(f[d],e,i,!0)}}class r_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Ne(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class fy{static{fy.prototype.isMatrix2=!0}constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const f=this.elements;return f[0]=e,f[2]=i,f[1]=s,f[3]=l,this}}class a1 extends ay{constructor(e=10,i=10,s=4473924,l=8947848){s=new Re(s),l=new Re(l);const f=i/2,d=e/i,h=e/2,p=[],m=[];for(let x=0,b=0,T=-h;x<=i;x++,T+=d){p.push(-h,0,T,h,0,T),p.push(T,0,-h,T,0,h);const L=x===f?s:l;L.toArray(m,b),b+=3,L.toArray(m,b),b+=3,L.toArray(m,b),b+=3,L.toArray(m,b),b+=3}const _=new Fn;_.setAttribute("position",new Sn(p,3)),_.setAttribute("color",new Sn(m,3));const S=new lm({vertexColors:!0,toneMapped:!1});super(_,S),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class s1 extends ys{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function o_(o,e,i,s){const l=r1(s);switch(i){case K_:return o*e;case J_:return o*e/l.components*l.byteLength;case $p:return o*e/l.components*l.byteLength;case $s:return o*e*2/l.components*l.byteLength;case tm:return o*e*2/l.components*l.byteLength;case Q_:return o*e*3/l.components*l.byteLength;case Hi:return o*e*4/l.components*l.byteLength;case em:return o*e*4/l.components*l.byteLength;case Tu:case Au:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Ru:case Cu:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case dp:case pp:return Math.max(o,16)*Math.max(e,8)/4;case fp:case hp:return Math.max(o,8)*Math.max(e,8)/2;case mp:case gp:case vp:case _p:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case xp:case Nu:case yp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Sp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Mp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case bp:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Ep:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Tp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case Ap:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Rp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Cp:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case wp:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Dp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Np:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Up:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Lp:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case Op:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Pp:case Ip:case zp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Bp:case Fp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Uu:case Hp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function r1(o){switch(o){case hi:case j_:return{byteLength:1,components:1};case _l:case q_:case fa:return{byteLength:2,components:1};case Qp:case Jp:return{byteLength:2,components:4};case ua:case Kp:case ra:return{byteLength:4,components:1};case Y_:case Z_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Yp}}));typeof window<"u"&&(window.__THREE__?fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Yp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function dy(){let o=null,e=!1,i=null,s=null;function l(f,d){s=o.requestAnimationFrame(l),i(f,d)}return{start:function(){e!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function o1(o){const e=new WeakMap;function i(h,p){const m=h.array,_=h.usage,S=m.byteLength,x=o.createBuffer();o.bindBuffer(p,x),o.bufferData(p,m,_),h.onUploadCallback();let b;if(m instanceof Float32Array)b=o.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)b=o.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?b=o.HALF_FLOAT:b=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)b=o.SHORT;else if(m instanceof Uint32Array)b=o.UNSIGNED_INT;else if(m instanceof Int32Array)b=o.INT;else if(m instanceof Int8Array)b=o.BYTE;else if(m instanceof Uint8Array)b=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)b=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:b,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:S}}function s(h,p,m){const _=p.array,S=p.updateRanges;if(o.bindBuffer(m,h),S.length===0)o.bufferSubData(m,0,_);else{S.sort((b,T)=>b.start-T.start);let x=0;for(let b=1;b<S.length;b++){const T=S[x],L=S[b];L.start<=T.start+T.count+1?T.count=Math.max(T.count,L.start+L.count-T.start):(++x,S[x]=L)}S.length=x+1;for(let b=0,T=S.length;b<T;b++){const L=S[b];o.bufferSubData(m,L.start*_.BYTES_PER_ELEMENT,_,L.start,L.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function f(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(o.deleteBuffer(p.buffer),e.delete(h))}function d(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:f,update:d}}var l1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,c1=`#ifdef USE_ALPHAHASH
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
#endif`,u1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,f1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,d1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,h1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,p1=`#ifdef USE_AOMAP
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
#endif`,m1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,g1=`#ifdef USE_BATCHING
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
#endif`,x1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,v1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,y1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,S1=`#ifdef USE_IRIDESCENCE
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
#endif`,M1=`#ifdef USE_BUMPMAP
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
#endif`,b1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,E1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,T1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,R1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,C1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,w1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,D1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,N1=`#define PI 3.141592653589793
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
} // validated`,U1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,L1=`vec3 transformedNormal = objectNormal;
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
#endif`,O1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,I1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,z1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,B1="gl_FragColor = linearToOutputTexel( gl_FragColor );",F1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,H1=`#ifdef USE_ENVMAP
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
#endif`,G1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,V1=`#ifdef USE_ENVMAP
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
#endif`,k1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,X1=`#ifdef USE_ENVMAP
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
#endif`,W1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,j1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,q1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Y1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Z1=`#ifdef USE_GRADIENTMAP
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
}`,K1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Q1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,J1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,$1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,tT=`#ifdef USE_ENVMAP
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
#endif`,eT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,nT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,iT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,aT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sT=`PhysicalMaterial material;
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
#endif`,rT=`uniform sampler2D dfgLUT;
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
}`,oT=`
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
#endif`,lT=`#if defined( RE_IndirectDiffuse )
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
#endif`,cT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,uT=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,fT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,dT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,mT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,gT=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,xT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,vT=`#if defined( USE_POINTS_UV )
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
#endif`,_T=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,yT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ST=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,MT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,bT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ET=`#ifdef USE_MORPHTARGETS
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
#endif`,TT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,AT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,RT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,CT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,NT=`#ifdef USE_NORMALMAP
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
#endif`,UT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,LT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,OT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,PT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,BT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,FT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,HT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,GT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,XT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,WT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,qT=`float getShadowMask() {
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
}`,YT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ZT=`#ifdef USE_SKINNING
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
#endif`,KT=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QT=`#ifdef USE_SKINNING
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
#endif`,JT=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,$T=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,eA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,nA=`#ifdef USE_TRANSMISSION
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
#endif`,iA=`#ifdef USE_TRANSMISSION
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
#endif`,aA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,rA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,oA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const lA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,cA=`uniform sampler2D t2D;
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
}`,uA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,fA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,dA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,hA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pA=`#include <common>
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
}`,mA=`#if DEPTH_PACKING == 3200
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
}`,gA=`#define DISTANCE
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
}`,xA=`#define DISTANCE
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
}`,vA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_A=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,yA=`uniform float scale;
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
}`,SA=`uniform vec3 diffuse;
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
}`,MA=`#include <common>
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
}`,bA=`uniform vec3 diffuse;
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
}`,EA=`#define LAMBERT
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
}`,TA=`#define LAMBERT
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
}`,AA=`#define MATCAP
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
}`,RA=`#define MATCAP
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
}`,CA=`#define NORMAL
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
}`,wA=`#define NORMAL
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
}`,DA=`#define PHONG
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
}`,NA=`#define PHONG
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
}`,UA=`#define STANDARD
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
}`,LA=`#define STANDARD
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
}`,OA=`#define TOON
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
}`,PA=`#define TOON
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
}`,IA=`uniform float size;
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
}`,zA=`uniform vec3 diffuse;
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
}`,BA=`#include <common>
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
}`,FA=`uniform vec3 color;
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
}`,HA=`uniform float rotation;
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
}`,GA=`uniform vec3 diffuse;
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
}`,be={alphahash_fragment:l1,alphahash_pars_fragment:c1,alphamap_fragment:u1,alphamap_pars_fragment:f1,alphatest_fragment:d1,alphatest_pars_fragment:h1,aomap_fragment:p1,aomap_pars_fragment:m1,batching_pars_vertex:g1,batching_vertex:x1,begin_vertex:v1,beginnormal_vertex:_1,bsdfs:y1,iridescence_fragment:S1,bumpmap_pars_fragment:M1,clipping_planes_fragment:b1,clipping_planes_pars_fragment:E1,clipping_planes_pars_vertex:T1,clipping_planes_vertex:A1,color_fragment:R1,color_pars_fragment:C1,color_pars_vertex:w1,color_vertex:D1,common:N1,cube_uv_reflection_fragment:U1,defaultnormal_vertex:L1,displacementmap_pars_vertex:O1,displacementmap_vertex:P1,emissivemap_fragment:I1,emissivemap_pars_fragment:z1,colorspace_fragment:B1,colorspace_pars_fragment:F1,envmap_fragment:H1,envmap_common_pars_fragment:G1,envmap_pars_fragment:V1,envmap_pars_vertex:k1,envmap_physical_pars_fragment:tT,envmap_vertex:X1,fog_vertex:W1,fog_pars_vertex:j1,fog_fragment:q1,fog_pars_fragment:Y1,gradientmap_pars_fragment:Z1,lightmap_pars_fragment:K1,lights_lambert_fragment:Q1,lights_lambert_pars_fragment:J1,lights_pars_begin:$1,lights_toon_fragment:eT,lights_toon_pars_fragment:nT,lights_phong_fragment:iT,lights_phong_pars_fragment:aT,lights_physical_fragment:sT,lights_physical_pars_fragment:rT,lights_fragment_begin:oT,lights_fragment_maps:lT,lights_fragment_end:cT,lightprobes_pars_fragment:uT,logdepthbuf_fragment:fT,logdepthbuf_pars_fragment:dT,logdepthbuf_pars_vertex:hT,logdepthbuf_vertex:pT,map_fragment:mT,map_pars_fragment:gT,map_particle_fragment:xT,map_particle_pars_fragment:vT,metalnessmap_fragment:_T,metalnessmap_pars_fragment:yT,morphinstance_vertex:ST,morphcolor_vertex:MT,morphnormal_vertex:bT,morphtarget_pars_vertex:ET,morphtarget_vertex:TT,normal_fragment_begin:AT,normal_fragment_maps:RT,normal_pars_fragment:CT,normal_pars_vertex:wT,normal_vertex:DT,normalmap_pars_fragment:NT,clearcoat_normal_fragment_begin:UT,clearcoat_normal_fragment_maps:LT,clearcoat_pars_fragment:OT,iridescence_pars_fragment:PT,opaque_fragment:IT,packing:zT,premultiplied_alpha_fragment:BT,project_vertex:FT,dithering_fragment:HT,dithering_pars_fragment:GT,roughnessmap_fragment:VT,roughnessmap_pars_fragment:kT,shadowmap_pars_fragment:XT,shadowmap_pars_vertex:WT,shadowmap_vertex:jT,shadowmask_pars_fragment:qT,skinbase_vertex:YT,skinning_pars_vertex:ZT,skinning_vertex:KT,skinnormal_vertex:QT,specularmap_fragment:JT,specularmap_pars_fragment:$T,tonemapping_fragment:tA,tonemapping_pars_fragment:eA,transmission_fragment:nA,transmission_pars_fragment:iA,uv_pars_fragment:aA,uv_pars_vertex:sA,uv_vertex:rA,worldpos_vertex:oA,background_vert:lA,background_frag:cA,backgroundCube_vert:uA,backgroundCube_frag:fA,cube_vert:dA,cube_frag:hA,depth_vert:pA,depth_frag:mA,distance_vert:gA,distance_frag:xA,equirect_vert:vA,equirect_frag:_A,linedashed_vert:yA,linedashed_frag:SA,meshbasic_vert:MA,meshbasic_frag:bA,meshlambert_vert:EA,meshlambert_frag:TA,meshmatcap_vert:AA,meshmatcap_frag:RA,meshnormal_vert:CA,meshnormal_frag:wA,meshphong_vert:DA,meshphong_frag:NA,meshphysical_vert:UA,meshphysical_frag:LA,meshtoon_vert:OA,meshtoon_frag:PA,points_vert:IA,points_frag:zA,shadow_vert:BA,shadow_frag:FA,sprite_vert:HA,sprite_frag:GA},Gt={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ve}},envmap:{envMap:{value:null},envMapRotation:{value:new ve},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ve},normalScale:{value:new de(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new nt},probesMax:{value:new nt},probesResolution:{value:new nt}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0},uvTransform:{value:new ve}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new de(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ve},alphaMap:{value:null},alphaMapTransform:{value:new ve},alphaTest:{value:0}}},aa={basic:{uniforms:Wn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.fog]),vertexShader:be.meshbasic_vert,fragmentShader:be.meshbasic_frag},lambert:{uniforms:Wn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:be.meshlambert_vert,fragmentShader:be.meshlambert_frag},phong:{uniforms:Wn([Gt.common,Gt.specularmap,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,Gt.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:be.meshphong_vert,fragmentShader:be.meshphong_frag},standard:{uniforms:Wn([Gt.common,Gt.envmap,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.roughnessmap,Gt.metalnessmap,Gt.fog,Gt.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag},toon:{uniforms:Wn([Gt.common,Gt.aomap,Gt.lightmap,Gt.emissivemap,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.gradientmap,Gt.fog,Gt.lights,{emissive:{value:new Re(0)}}]),vertexShader:be.meshtoon_vert,fragmentShader:be.meshtoon_frag},matcap:{uniforms:Wn([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,Gt.fog,{matcap:{value:null}}]),vertexShader:be.meshmatcap_vert,fragmentShader:be.meshmatcap_frag},points:{uniforms:Wn([Gt.points,Gt.fog]),vertexShader:be.points_vert,fragmentShader:be.points_frag},dashed:{uniforms:Wn([Gt.common,Gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:be.linedashed_vert,fragmentShader:be.linedashed_frag},depth:{uniforms:Wn([Gt.common,Gt.displacementmap]),vertexShader:be.depth_vert,fragmentShader:be.depth_frag},normal:{uniforms:Wn([Gt.common,Gt.bumpmap,Gt.normalmap,Gt.displacementmap,{opacity:{value:1}}]),vertexShader:be.meshnormal_vert,fragmentShader:be.meshnormal_frag},sprite:{uniforms:Wn([Gt.sprite,Gt.fog]),vertexShader:be.sprite_vert,fragmentShader:be.sprite_frag},background:{uniforms:{uvTransform:{value:new ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:be.background_vert,fragmentShader:be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ve}},vertexShader:be.backgroundCube_vert,fragmentShader:be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:be.cube_vert,fragmentShader:be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:be.equirect_vert,fragmentShader:be.equirect_frag},distance:{uniforms:Wn([Gt.common,Gt.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:be.distance_vert,fragmentShader:be.distance_frag},shadow:{uniforms:Wn([Gt.lights,Gt.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:be.shadow_vert,fragmentShader:be.shadow_frag}};aa.physical={uniforms:Wn([aa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ve},clearcoatNormalScale:{value:new de(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ve},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ve},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ve},transmissionSamplerSize:{value:new de},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ve},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ve},anisotropyVector:{value:new de},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ve}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag};const Su={r:0,b:0,g:0},VA=new nn,hy=new ve;hy.set(-1,0,0,0,1,0,0,0,1);function kA(o,e,i,s,l,f){const d=new Re(0);let h=l===!0?0:1,p,m,_=null,S=0,x=null;function b(U){let V=U.isScene===!0?U.background:null;if(V&&V.isTexture){const D=U.backgroundBlurriness>0;V=e.get(V,D)}return V}function T(U){let V=!1;const D=b(U);D===null?y(d,h):D&&D.isColor&&(y(D,1),V=!0);const N=o.xr.getEnvironmentBlendMode();N==="additive"?i.buffers.color.setClear(0,0,0,1,f):N==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(o.autoClear||V)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function L(U,V){const D=b(V);D&&(D.isCubeTexture||D.mapping===Hu)?(m===void 0&&(m=new wi(new Rl(1,1,1),new da({name:"BackgroundCubeMaterial",uniforms:lo(aa.backgroundCube.uniforms),vertexShader:aa.backgroundCube.vertexShader,fragmentShader:aa.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(N,w,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=D,m.material.uniforms.backgroundBlurriness.value=V.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(VA.makeRotationFromEuler(V.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(hy),m.material.toneMapped=Be.getTransfer(D.colorSpace)!==Ye,(_!==D||S!==D.version||x!==o.toneMapping)&&(m.material.needsUpdate=!0,_=D,S=D.version,x=o.toneMapping),m.layers.enableAll(),U.unshift(m,m.geometry,m.material,0,0,null)):D&&D.isTexture&&(p===void 0&&(p=new wi(new Gu(2,2),new da({name:"BackgroundMaterial",uniforms:lo(aa.background.uniforms),vertexShader:aa.background.vertexShader,fragmentShader:aa.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=D,p.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,p.material.toneMapped=Be.getTransfer(D.colorSpace)!==Ye,D.matrixAutoUpdate===!0&&D.updateMatrix(),p.material.uniforms.uvTransform.value.copy(D.matrix),(_!==D||S!==D.version||x!==o.toneMapping)&&(p.material.needsUpdate=!0,_=D,S=D.version,x=o.toneMapping),p.layers.enableAll(),U.unshift(p,p.geometry,p.material,0,0,null))}function y(U,V){U.getRGB(Su,ly(o)),i.buffers.color.setClear(Su.r,Su.g,Su.b,V,f)}function v(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(U,V=1){d.set(U),h=V,y(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(U){h=U,y(d,h)},render:T,addToRenderList:L,dispose:v}}function XA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=x(null);let f=l,d=!1;function h(X,et,Y,j,Q){let B=!1;const F=S(X,j,Y,et);f!==F&&(f=F,m(f.object)),B=b(X,j,Y,Q),B&&T(X,j,Y,Q),Q!==null&&e.update(Q,o.ELEMENT_ARRAY_BUFFER),(B||d)&&(d=!1,D(X,et,Y,j),Q!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(Q).buffer))}function p(){return o.createVertexArray()}function m(X){return o.bindVertexArray(X)}function _(X){return o.deleteVertexArray(X)}function S(X,et,Y,j){const Q=j.wireframe===!0;let B=s[et.id];B===void 0&&(B={},s[et.id]=B);const F=X.isInstancedMesh===!0?X.id:0;let Z=B[F];Z===void 0&&(Z={},B[F]=Z);let G=Z[Y.id];G===void 0&&(G={},Z[Y.id]=G);let at=G[Q];return at===void 0&&(at=x(p()),G[Q]=at),at}function x(X){const et=[],Y=[],j=[];for(let Q=0;Q<i;Q++)et[Q]=0,Y[Q]=0,j[Q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:et,enabledAttributes:Y,attributeDivisors:j,object:X,attributes:{},index:null}}function b(X,et,Y,j){const Q=f.attributes,B=et.attributes;let F=0;const Z=Y.getAttributes();for(const G in Z)if(Z[G].location>=0){const rt=Q[G];let Rt=B[G];if(Rt===void 0&&(G==="instanceMatrix"&&X.instanceMatrix&&(Rt=X.instanceMatrix),G==="instanceColor"&&X.instanceColor&&(Rt=X.instanceColor)),rt===void 0||rt.attribute!==Rt||Rt&&rt.data!==Rt.data)return!0;F++}return f.attributesNum!==F||f.index!==j}function T(X,et,Y,j){const Q={},B=et.attributes;let F=0;const Z=Y.getAttributes();for(const G in Z)if(Z[G].location>=0){let rt=B[G];rt===void 0&&(G==="instanceMatrix"&&X.instanceMatrix&&(rt=X.instanceMatrix),G==="instanceColor"&&X.instanceColor&&(rt=X.instanceColor));const Rt={};Rt.attribute=rt,rt&&rt.data&&(Rt.data=rt.data),Q[G]=Rt,F++}f.attributes=Q,f.attributesNum=F,f.index=j}function L(){const X=f.newAttributes;for(let et=0,Y=X.length;et<Y;et++)X[et]=0}function y(X){v(X,0)}function v(X,et){const Y=f.newAttributes,j=f.enabledAttributes,Q=f.attributeDivisors;Y[X]=1,j[X]===0&&(o.enableVertexAttribArray(X),j[X]=1),Q[X]!==et&&(o.vertexAttribDivisor(X,et),Q[X]=et)}function U(){const X=f.newAttributes,et=f.enabledAttributes;for(let Y=0,j=et.length;Y<j;Y++)et[Y]!==X[Y]&&(o.disableVertexAttribArray(Y),et[Y]=0)}function V(X,et,Y,j,Q,B,F){F===!0?o.vertexAttribIPointer(X,et,Y,Q,B):o.vertexAttribPointer(X,et,Y,j,Q,B)}function D(X,et,Y,j){L();const Q=j.attributes,B=Y.getAttributes(),F=et.defaultAttributeValues;for(const Z in B){const G=B[Z];if(G.location>=0){let at=Q[Z];if(at===void 0&&(Z==="instanceMatrix"&&X.instanceMatrix&&(at=X.instanceMatrix),Z==="instanceColor"&&X.instanceColor&&(at=X.instanceColor)),at!==void 0){const rt=at.normalized,Rt=at.itemSize,Et=e.get(at);if(Et===void 0)continue;const ae=Et.buffer,ce=Et.type,he=Et.bytesPerElement,pt=ce===o.INT||ce===o.UNSIGNED_INT||at.gpuType===Kp;if(at.isInterleavedBufferAttribute){const vt=at.data,Dt=vt.stride,te=at.offset;if(vt.isInstancedInterleavedBuffer){for(let gt=0;gt<G.locationSize;gt++)v(G.location+gt,vt.meshPerAttribute);X.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=vt.meshPerAttribute*vt.count)}else for(let gt=0;gt<G.locationSize;gt++)y(G.location+gt);o.bindBuffer(o.ARRAY_BUFFER,ae);for(let gt=0;gt<G.locationSize;gt++)V(G.location+gt,Rt/G.locationSize,ce,rt,Dt*he,(te+Rt/G.locationSize*gt)*he,pt)}else{if(at.isInstancedBufferAttribute){for(let vt=0;vt<G.locationSize;vt++)v(G.location+vt,at.meshPerAttribute);X.isInstancedMesh!==!0&&j._maxInstanceCount===void 0&&(j._maxInstanceCount=at.meshPerAttribute*at.count)}else for(let vt=0;vt<G.locationSize;vt++)y(G.location+vt);o.bindBuffer(o.ARRAY_BUFFER,ae);for(let vt=0;vt<G.locationSize;vt++)V(G.location+vt,Rt/G.locationSize,ce,rt,Rt*he,Rt/G.locationSize*vt*he,pt)}}else if(F!==void 0){const rt=F[Z];if(rt!==void 0)switch(rt.length){case 2:o.vertexAttrib2fv(G.location,rt);break;case 3:o.vertexAttrib3fv(G.location,rt);break;case 4:o.vertexAttrib4fv(G.location,rt);break;default:o.vertexAttrib1fv(G.location,rt)}}}}U()}function N(){P();for(const X in s){const et=s[X];for(const Y in et){const j=et[Y];for(const Q in j){const B=j[Q];for(const F in B)_(B[F].object),delete B[F];delete j[Q]}}delete s[X]}}function w(X){if(s[X.id]===void 0)return;const et=s[X.id];for(const Y in et){const j=et[Y];for(const Q in j){const B=j[Q];for(const F in B)_(B[F].object),delete B[F];delete j[Q]}}delete s[X.id]}function O(X){for(const et in s){const Y=s[et];for(const j in Y){const Q=Y[j];if(Q[X.id]===void 0)continue;const B=Q[X.id];for(const F in B)_(B[F].object),delete B[F];delete Q[X.id]}}}function A(X){for(const et in s){const Y=s[et],j=X.isInstancedMesh===!0?X.id:0,Q=Y[j];if(Q!==void 0){for(const B in Q){const F=Q[B];for(const Z in F)_(F[Z].object),delete F[Z];delete Q[B]}delete Y[j],Object.keys(Y).length===0&&delete s[et]}}}function P(){I(),d=!0,f!==l&&(f=l,m(f.object))}function I(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:P,resetDefaultState:I,dispose:N,releaseStatesOfGeometry:w,releaseStatesOfObject:A,releaseStatesOfProgram:O,initAttributes:L,enableAttribute:y,disableUnusedAttributes:U}}function WA(o,e,i){let s;function l(p){s=p}function f(p,m){o.drawArrays(s,p,m),i.update(m,s,1)}function d(p,m,_){_!==0&&(o.drawArraysInstanced(s,p,m,_),i.update(m,s,_))}function h(p,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,m,0,_);let x=0;for(let b=0;b<_;b++)x+=m[b];i.update(x,s,1)}this.setMode=l,this.render=f,this.renderInstances=d,this.renderMultiDraw=h}function jA(o,e,i,s){let l;function f(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(O){return!(O!==Hi&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(O){const A=O===fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==hi&&O!==ra&&!A&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function p(O){if(O==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const _=p(m);_!==m&&(fe("WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const S=i.logarithmicDepthBuffer===!0,x=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&x===!1&&fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),v=o.getParameter(o.MAX_VERTEX_ATTRIBS),U=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),V=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),N=o.getParameter(o.MAX_SAMPLES),w=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:S,reversedDepthBuffer:x,maxTextures:b,maxVertexTextures:T,maxTextureSize:L,maxCubemapSize:y,maxAttributes:v,maxVertexUniforms:U,maxVaryings:V,maxFragmentUniforms:D,maxSamples:N,samples:w}}function qA(o){const e=this;let i=null,s=0,l=!1,f=!1;const d=new La,h=new ve,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(S,x){const b=S.length!==0||x||s!==0||l;return l=x,s=S.length,b},this.beginShadows=function(){f=!0,_(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(S,x){i=_(S,x,0)},this.setState=function(S,x,b){const T=S.clippingPlanes,L=S.clipIntersection,y=S.clipShadows,v=o.get(S);if(!l||T===null||T.length===0||f&&!y)f?_(null):m();else{const U=f?0:s,V=U*4;let D=v.clippingState||null;p.value=D,D=_(T,x,V,b);for(let N=0;N!==V;++N)D[N]=i[N];v.clippingState=D,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=U}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(S,x,b,T){const L=S!==null?S.length:0;let y=null;if(L!==0){if(y=p.value,T!==!0||y===null){const v=b+L*4,U=x.matrixWorldInverse;h.getNormalMatrix(U),(y===null||y.length<v)&&(y=new Float32Array(v));for(let V=0,D=b;V!==L;++V,D+=4)d.copy(S[V]).applyMatrix4(U,h),d.normal.toArray(y,D),y[D+3]=d.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=L,e.numIntersection=0,y}}const io=4,YA=6,ZA=20,KA=256,hl=new um,l_=new Re;let qh=null,Yh=0,Zh=0,Kh=!1;const QA=new nt,Ys=new nt;class c_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,f={}){const{size:d=256,position:h=QA}=f;qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,h),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=d_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=f_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(qh,Yh,Zh),this._renderer.xr.enabled=Kh,e.scissorTest=!1,to(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Js||e.mapping===oo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),qh=this._renderer.getRenderTarget(),Yh=this._renderer.getActiveCubeFace(),Zh=this._renderer.getActiveMipmapLevel(),Kh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Bn,minFilter:Bn,generateMipmaps:!1,type:fa,format:Hi,colorSpace:Lu,depthBuffer:!1},l=u_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=u_(e,i,s);const{_lodMax:f}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=JA(f)),this._blurMaterial=tR(f,e,i),this._ggxMaterial=$A(f,e,i)}return l}_compileMaterial(e){const i=new wi(new Fn,e);this._renderer.compile(i,hl)}_sceneToCubeUV(e,i,s,l,f){const p=new Ci(90,1,i,s),m=[1,-1,1,1,1,1],_=[1,1,1,-1,-1,-1],S=this._renderer,x=S.autoClear,b=S.toneMapping;S.getClearColor(l_),S.toneMapping=la,S.autoClear=!1,S.state.buffers.depth.getReversed()&&(S.setRenderTarget(l),S.clearDepth(),S.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wi(new Rl,new Iu({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const L=this._backgroundBox,y=L.material;let v=!1;const U=e.background;U?U.isColor&&(y.color.copy(U),e.background=null,v=!0):(y.color.copy(l_),v=!0);for(let V=0;V<6;V++){const D=V%3;D===0?(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+_[V],f.y,f.z)):D===1?(p.up.set(0,0,m[V]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+_[V],f.z)):(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+_[V]));const N=this._cubeSize;to(l,D*N,V>2?N:0,N,N),S.setRenderTarget(l),v&&S.render(L,p),S.render(e,p)}S.toneMapping=b,S.autoClear=x,e.background=U}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Js||e.mapping===oo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=d_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=f_());const f=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=f;const h=f.uniforms;h.envMap.value=e;const p=this._cubeSize;to(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(d,hl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let f=1;f<l;f++)this._applyGGXFilter(e,f-1,f);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,f=this._pingPongRenderTarget,d=this._ggxMaterial,h=this._lodMeshes[s];h.material=d;const p=d.uniforms,m=s/(this._lodMeshes.length-1),_=i/(this._lodMeshes.length-1),S=Math.sqrt(m*m-_*_),x=m*1.25,b=S*x,{_lodMax:T}=this,L=this._sizeLods[s],y=3*L*(s>T-io?s-T+io:0),v=4*(this._cubeSize-L);p.envMap.value=e.texture,p.roughness.value=b,p.mipInt.value=T-i,to(f,y,v,3*L,2*L),l.setRenderTarget(f),l.render(h,hl),p.envMap.value=f.texture,p.roughness.value=0,p.mipInt.value=T-s,to(e,y,v,3*L,2*L),l.setRenderTarget(e),l.render(h,hl)}_blur(e,i,s,l){const f=this._pingPongRenderTarget,d=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(e,f,i,s,d),this._blurPass(f,e,s,s,d)}_blurPass(e,i,s,l,f){const d=this._renderer,h=this._blurMaterial,p=this._lodMeshes[l];p.material=h;const m=h.uniforms;m.envMap.value=e.texture,m.sigma.value=f,m.mipInt.value=this._lodMax-s;const _=this._sizeLods[l],S=3*_*(l>this._lodMax-io?l-this._lodMax+io:0),x=4*(this._cubeSize-_);to(i,S,x,3*_,2*_),d.setRenderTarget(i),d.render(p,hl)}}function JA(o){const e=[],i=[];let s=o;const l=o-io+1+YA;for(let f=0;f<l;f++){const d=Math.pow(2,s);e.push(d);const h=1/(d-2),p=-h,m=1+h,_=[p,p,m,p,m,m,p,p,m,m,p,m],S=6,x=6,b=3,T=new Float32Array(b*x*S),L=new Float32Array(b*x*S);for(let v=0;v<S;v++){const U=v%3*2/3-1,V=v>2?0:-1,D=[U,V,0,U+2/3,V,0,U+2/3,V+1,0,U,V,0,U+2/3,V+1,0,U,V+1,0];T.set(D,b*x*v);for(let N=0;N<x;N++){const w=_[N*2]*2-1,O=_[N*2+1]*2-1;v===0?Ys.set(1,O,w):v===1?Ys.set(-w,1,-O):v===2?Ys.set(-w,O,1):v===3?Ys.set(-1,O,-w):v===4?Ys.set(-w,-1,O):Ys.set(w,O,-1),Ys.toArray(L,(v*x+N)*b)}}const y=new Fn;y.setAttribute("position",new ca(T,b)),y.setAttribute("outputDirection",new ca(L,b)),i.push(new wi(y,null)),s>io&&s--}return{lodMeshes:i,sizeLods:e}}function u_(o,e,i){const s=new Gi(o,e,i);return s.texture.mapping=Hu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function to(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function $A(o,e,i){return new da({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:KA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Vu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function tR(o,e,i){return new da({name:"SphericalGaussianBlur",defines:{SAMPLES:ZA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Vu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function f_(){return new da({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Vu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function d_(){return new da({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Vu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function Vu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class py extends Gi{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new ry(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Rl(5,5,5),f=new da({name:"CubemapFromEquirect",uniforms:lo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:jn,blending:Pa});f.uniforms.tEquirect.value=i;const d=new wi(l,f),h=i.minFilter;return i.minFilter===Zs&&(i.minFilter=Bn),new n1(1,10,this).update(e,d),i.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const f=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,s,l);e.setRenderTarget(f)}}function eR(o){let e=new WeakMap,i=new WeakMap,s=null;function l(x,b=!1){return x==null?null:b?d(x):f(x)}function f(x){if(x&&x.isTexture){const b=x.mapping;if(b===yh||b===Sh)if(e.has(x)){const T=e.get(x).texture;return h(T,x.mapping)}else{const T=x.image;if(T&&T.height>0){const L=new py(T.height);return L.fromEquirectangularTexture(o,x),e.set(x,L),x.addEventListener("dispose",m),h(L.texture,x.mapping)}else return null}}return x}function d(x){if(x&&x.isTexture){const b=x.mapping,T=b===yh||b===Sh,L=b===Js||b===oo;if(T||L){let y=i.get(x);const v=y!==void 0?y.texture.pmremVersion:0;if(x.isRenderTargetTexture&&x.pmremVersion!==v)return s===null&&(s=new c_(o)),y=T?s.fromEquirectangular(x,y):s.fromCubemap(x,y),y.texture.pmremVersion=x.pmremVersion,i.set(x,y),y.texture;if(y!==void 0)return y.texture;{const U=x.image;return T&&U&&U.height>0||L&&U&&p(U)?(s===null&&(s=new c_(o)),y=T?s.fromEquirectangular(x):s.fromCubemap(x),y.texture.pmremVersion=x.pmremVersion,i.set(x,y),x.addEventListener("dispose",_),y.texture):null}}}return x}function h(x,b){return b===yh?x.mapping=Js:b===Sh&&(x.mapping=oo),x}function p(x){let b=0;const T=6;for(let L=0;L<T;L++)x[L]!==void 0&&b++;return b===T}function m(x){const b=x.target;b.removeEventListener("dispose",m);const T=e.get(b);T!==void 0&&(e.delete(b),T.dispose())}function _(x){const b=x.target;b.removeEventListener("dispose",_);const T=i.get(b);T!==void 0&&(i.delete(b),T.dispose())}function S(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:S}}function nR(o){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=o.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&so("WebGLRenderer: "+s+" extension not supported."),l}}}function iR(o,e,i,s){const l={},f=new WeakMap;function d(S){const x=S.target;x.index!==null&&e.remove(x.index);for(const T in x.attributes)e.remove(x.attributes[T]);x.removeEventListener("dispose",d),delete l[x.id];const b=f.get(x);b&&(e.remove(b),f.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function h(S,x){return l[x.id]===!0||(x.addEventListener("dispose",d),l[x.id]=!0,i.memory.geometries++),x}function p(S){const x=S.attributes;for(const b in x)e.update(x[b],o.ARRAY_BUFFER)}function m(S){const x=[],b=S.index,T=S.attributes.position;let L=0;if(T===void 0)return;if(b!==null){const U=b.array;L=b.version;for(let V=0,D=U.length;V<D;V+=3){const N=U[V+0],w=U[V+1],O=U[V+2];x.push(N,w,w,O,O,N)}}else{const U=T.array;L=T.version;for(let V=0,D=U.length/3-1;V<D;V+=3){const N=V+0,w=V+1,O=V+2;x.push(N,w,w,O,O,N)}}const y=new(T.count>=65535?iy:ny)(x,1);y.version=L;const v=f.get(S);v&&e.remove(v),f.set(S,y)}function _(S){const x=f.get(S);if(x){const b=S.index;b!==null&&x.version<b.version&&m(S)}else m(S);return f.get(S)}return{get:h,update:p,getWireframeAttribute:_}}function aR(o,e,i){let s;function l(S){s=S}let f,d;function h(S){f=S.type,d=S.bytesPerElement}function p(S,x){o.drawElements(s,x,f,S*d),i.update(x,s,1)}function m(S,x,b){b!==0&&(o.drawElementsInstanced(s,x,f,S*d,b),i.update(x,s,b))}function _(S,x,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,x,0,f,S,0,b);let L=0;for(let y=0;y<b;y++)L+=x[y];i.update(L,s,1)}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=_}function sR(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,d,h){switch(i.calls++,d){case o.TRIANGLES:i.triangles+=h*(f/3);break;case o.LINES:i.lines+=h*(f/2);break;case o.LINE_STRIP:i.lines+=h*(f-1);break;case o.LINE_LOOP:i.lines+=h*f;break;case o.POINTS:i.points+=h*f;break;default:He("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function rR(o,e,i){const s=new WeakMap,l=new on;function f(d,h,p){const m=d.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,S=_!==void 0?_.length:0;let x=s.get(h);if(x===void 0||x.count!==S){let P=function(){O.dispose(),s.delete(h),h.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();const b=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,y=h.morphAttributes.position||[],v=h.morphAttributes.normal||[],U=h.morphAttributes.color||[];let V=0;b===!0&&(V=1),T===!0&&(V=2),L===!0&&(V=3);let D=h.attributes.position.count*V,N=1;D>e.maxTextureSize&&(N=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*N*4*S),O=new ty(w,D,N,S);O.type=ra,O.needsUpdate=!0;const A=V*4;for(let I=0;I<S;I++){const X=y[I],et=v[I],Y=U[I],j=D*N*4*I;for(let Q=0;Q<X.count;Q++){const B=Q*A;b===!0&&(l.fromBufferAttribute(X,Q),w[j+B+0]=l.x,w[j+B+1]=l.y,w[j+B+2]=l.z,w[j+B+3]=0),T===!0&&(l.fromBufferAttribute(et,Q),w[j+B+4]=l.x,w[j+B+5]=l.y,w[j+B+6]=l.z,w[j+B+7]=0),L===!0&&(l.fromBufferAttribute(Y,Q),w[j+B+8]=l.x,w[j+B+9]=l.y,w[j+B+10]=l.z,w[j+B+11]=Y.itemSize===4?l.w:1)}}x={count:S,texture:O,size:new de(D,N)},s.set(h,x),h.addEventListener("dispose",P)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",d.morphTexture,i);else{let b=0;for(let L=0;L<m.length;L++)b+=m[L];const T=h.morphTargetsRelative?1:1-b;p.getUniforms().setValue(o,"morphTargetBaseInfluence",T),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:f}}function oR(o,e,i,s,l){let f=new WeakMap;function d(m){const _=l.render.frame,S=m.geometry,x=e.get(m,S);if(f.get(x)!==_&&(e.update(x),f.set(x,_)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),f.get(m)!==_&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),f.set(m,_))),m.isSkinnedMesh){const b=m.skeleton;f.get(b)!==_&&(b.update(),f.set(b,_))}return x}function h(){f=new WeakMap}function p(m){const _=m.target;_.removeEventListener("dispose",p),s.releaseStatesOfObject(_),i.remove(_.instanceMatrix),_.instanceColor!==null&&i.remove(_.instanceColor)}return{update:d,dispose:h}}const lR={[F_]:"LINEAR_TONE_MAPPING",[H_]:"REINHARD_TONE_MAPPING",[G_]:"CINEON_TONE_MAPPING",[Zp]:"ACES_FILMIC_TONE_MAPPING",[k_]:"AGX_TONE_MAPPING",[X_]:"NEUTRAL_TONE_MAPPING",[V_]:"CUSTOM_TONE_MAPPING"};function cR(o,e,i,s,l,f){const d=new Gi(e,i,{type:o,depthBuffer:l,stencilBuffer:f,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,p=null;const m=new Fn;m.setAttribute("position",new Sn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Sn([0,2,0,0,2,0],2));const _=new ZE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),S=new wi(m,_),x=new um(-1,1,1,-1,0,1);let b=null,T=null,L=!1,y,v=null,U=[],V=!1;this.setSize=function(D,N){d.setSize(D,N),h!==null&&h.setSize(D,N),p!==null&&p.setSize(D,N);for(let w=0;w<U.length;w++){const O=U[w];O.setSize&&O.setSize(D,N)}},this.setEffects=function(D){U=D,V=U.length>0&&U[0].isRenderPass===!0;const N=d.width,w=d.height;U.length>0&&h===null&&(h=new Gi(N,w,{type:fa,depthBuffer:!1,stencilBuffer:!1}),p=new Gi(N,w,{type:fa,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<U.length;O++){const A=U[O];A.setSize&&A.setSize(N,w)}},this.begin=function(D,N){if(L||D.toneMapping===la&&U.length===0)return!1;if(v=N,N!==null){const w=N.width,O=N.height;(d.width!==w||d.height!==O)&&this.setSize(w,O)}return V===!1&&D.setRenderTarget(d),y=D.toneMapping,D.toneMapping=la,!0},this.hasRenderPass=function(){return V},this.end=function(D,N){D.toneMapping=y,L=!0;let w=d,O=h;for(let A=0;A<U.length;A++){const P=U[A];P.enabled!==!1&&(P.render(D,O,w,N),P.needsSwap!==!1&&(w=O,O=O===h?p:h))}if(b!==D.outputColorSpace||T!==D.toneMapping){b=D.outputColorSpace,T=D.toneMapping,_.defines={},Be.getTransfer(b)===Ye&&(_.defines.SRGB_TRANSFER="");const A=lR[T];A&&(_.defines[A]=""),_.needsUpdate=!0}_.uniforms.tDiffuse.value=w.texture,D.setRenderTarget(v),D.render(S,x),v=null,L=!1},this.isCompositing=function(){return L},this.dispose=function(){d.dispose(),h!==null&&h.dispose(),p!==null&&p.dispose(),m.dispose(),_.dispose()}}const my=new qn,Wp=new Ml(1,1),gy=new ty,xy=new EE,vy=new ry,h_=[],p_=[],m_=new Float32Array(16),g_=new Float32Array(9),x_=new Float32Array(4);function co(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let f=h_[l];if(f===void 0&&(f=new Float32Array(l),h_[l]=f),e!==0){s.toArray(f,0);for(let d=1,h=0;d!==e;++d)h+=i,o[d].toArray(f,h)}return f}function Mn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function bn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function ku(o,e){let i=p_[e];i===void 0&&(i=new Int32Array(e),p_[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function uR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function fR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2fv(this.addr,e),bn(i,e)}}function dR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Mn(i,e))return;o.uniform3fv(this.addr,e),bn(i,e)}}function hR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4fv(this.addr,e),bn(i,e)}}function pR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;x_.set(s),o.uniformMatrix2fv(this.addr,!1,x_),bn(i,s)}}function mR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;g_.set(s),o.uniformMatrix3fv(this.addr,!1,g_),bn(i,s)}}function gR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;m_.set(s),o.uniformMatrix4fv(this.addr,!1,m_),bn(i,s)}}function xR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function vR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2iv(this.addr,e),bn(i,e)}}function _R(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3iv(this.addr,e),bn(i,e)}}function yR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4iv(this.addr,e),bn(i,e)}}function SR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function MR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2uiv(this.addr,e),bn(i,e)}}function bR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3uiv(this.addr,e),bn(i,e)}}function ER(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4uiv(this.addr,e),bn(i,e)}}function TR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let f;this.type===o.SAMPLER_2D_SHADOW?(Wp.compareFunction=i.isReversedDepthBuffer()?im:nm,f=Wp):f=my,i.setTexture2D(e||f,l)}function AR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||xy,l)}function RR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||vy,l)}function CR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||gy,l)}function wR(o){switch(o){case 5126:return uR;case 35664:return fR;case 35665:return dR;case 35666:return hR;case 35674:return pR;case 35675:return mR;case 35676:return gR;case 5124:case 35670:return xR;case 35667:case 35671:return vR;case 35668:case 35672:return _R;case 35669:case 35673:return yR;case 5125:return SR;case 36294:return MR;case 36295:return bR;case 36296:return ER;case 35678:case 36198:case 36298:case 36306:case 35682:return TR;case 35679:case 36299:case 36307:return AR;case 35680:case 36300:case 36308:case 36293:return RR;case 36289:case 36303:case 36311:case 36292:return CR}}function DR(o,e){o.uniform1fv(this.addr,e)}function NR(o,e){const i=co(e,this.size,2);o.uniform2fv(this.addr,i)}function UR(o,e){const i=co(e,this.size,3);o.uniform3fv(this.addr,i)}function LR(o,e){const i=co(e,this.size,4);o.uniform4fv(this.addr,i)}function OR(o,e){const i=co(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function PR(o,e){const i=co(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function IR(o,e){const i=co(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function zR(o,e){o.uniform1iv(this.addr,e)}function BR(o,e){o.uniform2iv(this.addr,e)}function FR(o,e){o.uniform3iv(this.addr,e)}function HR(o,e){o.uniform4iv(this.addr,e)}function GR(o,e){o.uniform1uiv(this.addr,e)}function VR(o,e){o.uniform2uiv(this.addr,e)}function kR(o,e){o.uniform3uiv(this.addr,e)}function XR(o,e){o.uniform4uiv(this.addr,e)}function WR(o,e,i){const s=this.cache,l=e.length,f=ku(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));let d;this.type===o.SAMPLER_2D_SHADOW?d=Wp:d=my;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||d,f[h])}function jR(o,e,i){const s=this.cache,l=e.length,f=ku(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||xy,f[d])}function qR(o,e,i){const s=this.cache,l=e.length,f=ku(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||vy,f[d])}function YR(o,e,i){const s=this.cache,l=e.length,f=ku(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||gy,f[d])}function ZR(o){switch(o){case 5126:return DR;case 35664:return NR;case 35665:return UR;case 35666:return LR;case 35674:return OR;case 35675:return PR;case 35676:return IR;case 5124:case 35670:return zR;case 35667:case 35671:return BR;case 35668:case 35672:return FR;case 35669:case 35673:return HR;case 5125:return GR;case 36294:return VR;case 36295:return kR;case 36296:return XR;case 35678:case 36198:case 36298:case 36306:case 35682:return WR;case 35679:case 36299:case 36307:return jR;case 35680:case 36300:case 36308:case 36293:return qR;case 36289:case 36303:case 36311:case 36292:return YR}}class KR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=wR(i.type)}}class QR{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=ZR(i.type)}}class JR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let f=0,d=l.length;f!==d;++f){const h=l[f];h.setValue(e,i[h.id],s)}}}const Qh=/(\w+)(\])?(\[|\.)?/g;function v_(o,e){o.seq.push(e),o.map[e.id]=e}function $R(o,e,i){const s=o.name,l=s.length;for(Qh.lastIndex=0;;){const f=Qh.exec(s),d=Qh.lastIndex;let h=f[1];const p=f[2]==="]",m=f[3];if(p&&(h=h|0),m===void 0||m==="["&&d+2===l){v_(i,m===void 0?new KR(h,o,e):new QR(h,o,e));break}else{let S=i.map[h];S===void 0&&(S=new JR(h),v_(i,S)),i=S}}}class Du{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let d=0;d<s;++d){const h=e.getActiveUniform(i,d),p=e.getUniformLocation(i,h.name);$R(h,p,this)}const l=[],f=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(d):f.push(d);l.length>0&&(this.seq=l.concat(f))}setValue(e,i,s,l){const f=this.map[i];f!==void 0&&f.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let f=0,d=i.length;f!==d;++f){const h=i[f],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,f=e.length;l!==f;++l){const d=e[l];d.id in i&&s.push(d)}return s}}function __(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const tC=37297;let eC=0;function nC(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let d=l;d<f;d++){const h=d+1;s.push(`${h===e?">":" "} ${h}: ${i[d]}`)}return s.join(`
`)}const y_=new ve;function iC(o){Be._getMatrix(y_,Be.workingColorSpace,o);const e=`mat3( ${y_.elements.map(i=>i.toFixed(4))} )`;switch(Be.getTransfer(o)){case Ou:return[e,"LinearTransferOETF"];case Ye:return[e,"sRGBTransferOETF"];default:return fe("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function S_(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(s&&f==="")return"";const d=/ERROR: 0:(\d+)/.exec(f);if(d){const h=parseInt(d[1]);return i.toUpperCase()+`

`+f+`

`+nC(o.getShaderSource(e),h)}else return f}function aC(o,e){const i=iC(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const sC={[F_]:"Linear",[H_]:"Reinhard",[G_]:"Cineon",[Zp]:"ACESFilmic",[k_]:"AgX",[X_]:"Neutral",[V_]:"Custom"};function rC(o,e){const i=sC[e];return i===void 0?(fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Mu=new nt;function oC(){Be.getLuminanceCoefficients(Mu);const o=Mu.x.toFixed(4),e=Mu.y.toFixed(4),i=Mu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function lC(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function cC(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function uC(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const f=o.getActiveAttrib(e,l),d=f.name;let h=1;f.type===o.FLOAT_MAT2&&(h=2),f.type===o.FLOAT_MAT3&&(h=3),f.type===o.FLOAT_MAT4&&(h=4),i[d]={type:f.type,location:o.getAttribLocation(e,d),locationSize:h}}return i}function gl(o){return o!==""}function M_(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function b_(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const fC=/^[ \t]*#include +<([\w\d./]+)>/gm;function jp(o){return o.replace(fC,hC)}const dC=new Map;function hC(o,e){let i=be[e];if(i===void 0){const s=dC.get(e);if(s!==void 0)i=be[s],fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return jp(i)}const pC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function E_(o){return o.replace(pC,mC)}function mC(o,e,i,s){let l="";for(let f=parseInt(e);f<parseInt(i);f++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return l}function T_(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}const gC={[Eu]:"SHADOWMAP_TYPE_PCF",[ml]:"SHADOWMAP_TYPE_VSM"};function xC(o){return gC[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const vC={[Js]:"ENVMAP_TYPE_CUBE",[oo]:"ENVMAP_TYPE_CUBE",[Hu]:"ENVMAP_TYPE_CUBE_UV"};function _C(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":vC[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const yC={[oo]:"ENVMAP_MODE_REFRACTION"};function SC(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":yC[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const MC={[B_]:"ENVMAP_BLENDING_MULTIPLY",[tE]:"ENVMAP_BLENDING_MIX",[eE]:"ENVMAP_BLENDING_ADD"};function bC(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":MC[o.combine]||"ENVMAP_BLENDING_NONE"}function EC(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function TC(o,e,i,s){const l=o.getContext(),f=i.defines;let d=i.vertexShader,h=i.fragmentShader;const p=xC(i),m=_C(i),_=SC(i),S=bC(i),x=EC(i),b=lC(i),T=cC(f),L=l.createProgram();let y,v,U=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),y.length>0&&(y+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),v.length>0&&(v+=`
`)):(y=[T_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),v=[T_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+_:"",i.envMap?"#define "+S:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==la?"#define TONE_MAPPING":"",i.toneMapping!==la?be.tonemapping_pars_fragment:"",i.toneMapping!==la?rC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",be.colorspace_pars_fragment,aC("linearToOutputTexel",i.outputColorSpace),oC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),d=jp(d),d=M_(d,i),d=b_(d,i),h=jp(h),h=M_(h,i),h=b_(h,i),d=E_(d),h=E_(h),i.isRawShaderMaterial!==!0&&(U=`#version 300 es
`,y=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,v=["#define varying in",i.glslVersion===Cv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Cv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const V=U+y+d,D=U+v+h,N=__(l,l.VERTEX_SHADER,V),w=__(l,l.FRAGMENT_SHADER,D);l.attachShader(L,N),l.attachShader(L,w),i.index0AttributeName!==void 0?l.bindAttribLocation(L,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(L,0,"position"),l.linkProgram(L);function O(X){if(o.debug.checkShaderErrors){const et=l.getProgramInfoLog(L)||"",Y=l.getShaderInfoLog(N)||"",j=l.getShaderInfoLog(w)||"",Q=et.trim(),B=Y.trim(),F=j.trim();let Z=!0,G=!0;if(l.getProgramParameter(L,l.LINK_STATUS)===!1)if(Z=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,L,N,w);else{const at=S_(l,N,"vertex"),rt=S_(l,w,"fragment");He("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(L,l.VALIDATE_STATUS)+`

Material Name: `+X.name+`
Material Type: `+X.type+`

Program Info Log: `+Q+`
`+at+`
`+rt)}else Q!==""?fe("WebGLProgram: Program Info Log:",Q):(B===""||F==="")&&(G=!1);G&&(X.diagnostics={runnable:Z,programLog:Q,vertexShader:{log:B,prefix:y},fragmentShader:{log:F,prefix:v}})}l.deleteShader(N),l.deleteShader(w),A=new Du(l,L),P=uC(l,L)}let A;this.getUniforms=function(){return A===void 0&&O(this),A};let P;this.getAttributes=function(){return P===void 0&&O(this),P};let I=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return I===!1&&(I=l.getProgramParameter(L,tC)),I},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(L),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=eC++,this.cacheKey=e,this.usedTimes=1,this.program=L,this.vertexShader=N,this.fragmentShader=w,this}let AC=0;class RC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,s){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new CC(e),i.set(e,s)),s}}class CC{constructor(e){this.id=AC++,this.code=e,this.usedTimes=0}}function wC(o){return o===$s||o===Nu||o===Uu}function DC(o,e,i,s,l,f){const d=new sm,h=new RC,p=new Set,m=[],_=new Map,S=s.logarithmicDepthBuffer;let x=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(A){return p.add(A),A===0?"uv":`uv${A}`}function L(A,P,I,X,et,Y){const j=X.fog,Q=et.geometry,B=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?X.environment:null,F=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,Z=e.get(A.envMap||B,F),G=Z&&Z.mapping===Hu?Z.image.height:null,at=b[A.type];A.precision!==null&&(x=s.getMaxPrecision(A.precision),x!==A.precision&&fe("WebGLProgram.getParameters:",A.precision,"not supported, using",x,"instead."));const rt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Rt=rt!==void 0?rt.length:0;let Et=0;Q.morphAttributes.position!==void 0&&(Et=1),Q.morphAttributes.normal!==void 0&&(Et=2),Q.morphAttributes.color!==void 0&&(Et=3);let ae,ce,he,pt;if(at){const Ie=aa[at];ae=Ie.vertexShader,ce=Ie.fragmentShader}else{ae=A.vertexShader,ce=A.fragmentShader;const Ie=h.getVertexShaderStage(A),ge=h.getFragmentShaderStage(A);h.update(A,Ie,ge),he=Ie.id,pt=ge.id}const vt=o.getRenderTarget(),Dt=o.state.buffers.depth.getReversed(),te=et.isInstancedMesh===!0,gt=et.isBatchedMesh===!0,Tt=!!A.map,Me=!!A.matcap,ie=!!Z,pe=!!A.aoMap,oe=!!A.lightMap,Zt=!!A.bumpMap&&A.wireframe===!1,ne=!!A.normalMap,Ue=!!A.displacementMap,sn=!!A.emissiveMap,ot=!!A.metalnessMap,wt=!!A.roughnessMap,k=A.anisotropy>0,_e=A.clearcoat>0,se=A.dispersion>0,z=A.retroreflectivity>0,E=A.iridescence>0,it=A.sheen>0,ft=A.transmission>0,mt=k&&!!A.anisotropyMap,At=_e&&!!A.clearcoatMap,Lt=_e&&!!A.clearcoatNormalMap,xt=_e&&!!A.clearcoatRoughnessMap,Mt=E&&!!A.iridescenceMap,Ut=E&&!!A.iridescenceThicknessMap,$t=it&&!!A.sheenColorMap,Bt=it&&!!A.sheenRoughnessMap,zt=!!A.specularMap,Xt=!!A.specularColorMap,re=!!A.specularIntensityMap,me=ft&&!!A.transmissionMap,K=ft&&!!A.thicknessMap,Nt=!!A.gradientMap,St=!!A.alphaMap,Ot=A.alphaTest>0,kt=!!A.alphaHash,bt=!!A.extensions;let Jt=la;A.toneMapped&&(vt===null||vt.isXRRenderTarget===!0)&&(Jt=o.toneMapping);const Vt={shaderID:at,shaderType:A.type,shaderName:A.name,vertexShader:ae,fragmentShader:ce,defines:A.defines,customVertexShaderID:he,customFragmentShaderID:pt,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:x,batching:gt,batchingColor:gt&&et._colorsTexture!==null,instancing:te,instancingColor:te&&et.instanceColor!==null,instancingMorph:te&&et.morphTexture!==null,outputColorSpace:vt===null?o.outputColorSpace:vt.isXRRenderTarget===!0?vt.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:Tt,matcap:Me,envMap:ie,envMapMode:ie&&Z.mapping,envMapCubeUVHeight:G,aoMap:pe,lightMap:oe,bumpMap:Zt,normalMap:ne,displacementMap:Ue,emissiveMap:sn,normalMapObjectSpace:ne&&A.normalMapType===aE,normalMapTangentSpace:ne&&A.normalMapType===Gp,packedNormalMap:ne&&A.normalMapType===Gp&&wC(A.normalMap.format),metalnessMap:ot,roughnessMap:wt,anisotropy:k,anisotropyMap:mt,clearcoat:_e,clearcoatMap:At,clearcoatNormalMap:Lt,clearcoatRoughnessMap:xt,dispersion:se,retroreflection:z,iridescence:E,iridescenceMap:Mt,iridescenceThicknessMap:Ut,sheen:it,sheenColorMap:$t,sheenRoughnessMap:Bt,specularMap:zt,specularColorMap:Xt,specularIntensityMap:re,transmission:ft,transmissionMap:me,thicknessMap:K,gradientMap:Nt,opaque:A.transparent===!1&&A.blending===xl&&A.alphaToCoverage===!1,alphaMap:St,alphaTest:Ot,alphaHash:kt,combine:A.combine,mapUv:Tt&&T(A.map.channel),aoMapUv:pe&&T(A.aoMap.channel),lightMapUv:oe&&T(A.lightMap.channel),bumpMapUv:Zt&&T(A.bumpMap.channel),normalMapUv:ne&&T(A.normalMap.channel),displacementMapUv:Ue&&T(A.displacementMap.channel),emissiveMapUv:sn&&T(A.emissiveMap.channel),metalnessMapUv:ot&&T(A.metalnessMap.channel),roughnessMapUv:wt&&T(A.roughnessMap.channel),anisotropyMapUv:mt&&T(A.anisotropyMap.channel),clearcoatMapUv:At&&T(A.clearcoatMap.channel),clearcoatNormalMapUv:Lt&&T(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&T(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&T(A.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&T(A.iridescenceThicknessMap.channel),sheenColorMapUv:$t&&T(A.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&T(A.sheenRoughnessMap.channel),specularMapUv:zt&&T(A.specularMap.channel),specularColorMapUv:Xt&&T(A.specularColorMap.channel),specularIntensityMapUv:re&&T(A.specularIntensityMap.channel),transmissionMapUv:me&&T(A.transmissionMap.channel),thicknessMapUv:K&&T(A.thicknessMap.channel),alphaMapUv:St&&T(A.alphaMap.channel),vertexTangents:!!Q.attributes.tangent&&(ne||k),vertexNormals:!!Q.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,pointsUvs:et.isPoints===!0&&!!Q.attributes.uv&&(Tt||St),fog:!!j,useFog:A.fog===!0,fogExp2:!!j&&j.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||Q.attributes.normal===void 0&&ne===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:S,reversedDepthBuffer:Dt,skinning:et.isSkinnedMesh===!0,hasPositionAttribute:Q.attributes.position!==void 0,morphTargets:Q.morphAttributes.position!==void 0,morphNormals:Q.morphAttributes.normal!==void 0,morphColors:Q.morphAttributes.color!==void 0,morphTargetsCount:Rt,morphTextureStride:Et,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:Y.length,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:A.dithering,shadowMapEnabled:o.shadowMap.enabled&&I.length>0,shadowMapType:o.shadowMap.type,toneMapping:Jt,decodeVideoTexture:Tt&&A.map.isVideoTexture===!0&&Be.getTransfer(A.map.colorSpace)===Ye,decodeVideoTextureEmissive:sn&&A.emissiveMap.isVideoTexture===!0&&Be.getTransfer(A.emissiveMap.colorSpace)===Ye,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===sa,flipSided:A.side===jn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:bt&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(bt&&A.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return Vt.vertexUv1s=p.has(1),Vt.vertexUv2s=p.has(2),Vt.vertexUv3s=p.has(3),p.clear(),Vt}function y(A){const P=[];if(A.shaderID?P.push(A.shaderID):(P.push(A.customVertexShaderID),P.push(A.customFragmentShaderID)),A.defines!==void 0)for(const I in A.defines)P.push(I),P.push(A.defines[I]);return A.isRawShaderMaterial===!1&&(v(P,A),U(P,A),P.push(o.outputColorSpace)),P.push(A.customProgramCacheKey),P.join()}function v(A,P){A.push(P.precision),A.push(P.outputColorSpace),A.push(P.envMapMode),A.push(P.envMapCubeUVHeight),A.push(P.mapUv),A.push(P.alphaMapUv),A.push(P.lightMapUv),A.push(P.aoMapUv),A.push(P.bumpMapUv),A.push(P.normalMapUv),A.push(P.displacementMapUv),A.push(P.emissiveMapUv),A.push(P.metalnessMapUv),A.push(P.roughnessMapUv),A.push(P.anisotropyMapUv),A.push(P.clearcoatMapUv),A.push(P.clearcoatNormalMapUv),A.push(P.clearcoatRoughnessMapUv),A.push(P.iridescenceMapUv),A.push(P.iridescenceThicknessMapUv),A.push(P.sheenColorMapUv),A.push(P.sheenRoughnessMapUv),A.push(P.specularMapUv),A.push(P.specularColorMapUv),A.push(P.specularIntensityMapUv),A.push(P.transmissionMapUv),A.push(P.thicknessMapUv),A.push(P.combine),A.push(P.fogExp2),A.push(P.sizeAttenuation),A.push(P.morphTargetsCount),A.push(P.morphAttributeCount),A.push(P.numSunLights),A.push(P.numDirLights),A.push(P.numPointLights),A.push(P.numSpotLights),A.push(P.numSpotLightMaps),A.push(P.numHemiLights),A.push(P.numRectAreaLights),A.push(P.numSunLightShadows),A.push(P.numDirLightShadows),A.push(P.numPointLightShadows),A.push(P.numSpotLightShadows),A.push(P.numSpotLightShadowsWithMaps),A.push(P.numLightProbes),A.push(P.shadowMapType),A.push(P.toneMapping),A.push(P.numClippingPlanes),A.push(P.numClipIntersection),A.push(P.depthPacking)}function U(A,P){d.disableAll(),P.instancing&&d.enable(0),P.instancingColor&&d.enable(1),P.instancingMorph&&d.enable(2),P.matcap&&d.enable(3),P.envMap&&d.enable(4),P.normalMapObjectSpace&&d.enable(5),P.normalMapTangentSpace&&d.enable(6),P.clearcoat&&d.enable(7),P.iridescence&&d.enable(8),P.alphaTest&&d.enable(9),P.vertexColors&&d.enable(10),P.vertexAlphas&&d.enable(11),P.vertexUv1s&&d.enable(12),P.vertexUv2s&&d.enable(13),P.vertexUv3s&&d.enable(14),P.vertexTangents&&d.enable(15),P.anisotropy&&d.enable(16),P.alphaHash&&d.enable(17),P.batching&&d.enable(18),P.dispersion&&d.enable(19),P.retroreflection&&d.enable(24),P.batchingColor&&d.enable(20),P.gradientMap&&d.enable(21),P.packedNormalMap&&d.enable(22),P.vertexNormals&&d.enable(23),A.push(d.mask),d.disableAll(),P.fog&&d.enable(0),P.useFog&&d.enable(1),P.flatShading&&d.enable(2),P.logarithmicDepthBuffer&&d.enable(3),P.reversedDepthBuffer&&d.enable(4),P.skinning&&d.enable(5),P.morphTargets&&d.enable(6),P.morphNormals&&d.enable(7),P.morphColors&&d.enable(8),P.premultipliedAlpha&&d.enable(9),P.shadowMapEnabled&&d.enable(10),P.doubleSided&&d.enable(11),P.flipSided&&d.enable(12),P.useDepthPacking&&d.enable(13),P.dithering&&d.enable(14),P.transmission&&d.enable(15),P.sheen&&d.enable(16),P.opaque&&d.enable(17),P.pointsUvs&&d.enable(18),P.decodeVideoTexture&&d.enable(19),P.decodeVideoTextureEmissive&&d.enable(20),P.alphaToCoverage&&d.enable(21),P.numLightProbeGrids>0&&d.enable(22),P.hasPositionAttribute&&d.enable(23),A.push(d.mask)}function V(A){const P=b[A.type];let I;if(P){const X=aa[P];I=jE.clone(X.uniforms)}else I=A.uniforms;return I}function D(A,P){let I=_.get(P);return I!==void 0?++I.usedTimes:(I=new TC(o,P,A,l),m.push(I),_.set(P,I)),I}function N(A){if(--A.usedTimes===0){const P=m.indexOf(A);m[P]=m[m.length-1],m.pop(),_.delete(A.cacheKey),A.destroy()}}function w(A){h.remove(A)}function O(){h.dispose()}return{getParameters:L,getProgramCacheKey:y,getUniforms:V,acquireProgram:D,releaseProgram:N,releaseShaderCache:w,programs:m,dispose:O}}function NC(){let o=new WeakMap;function e(d){return o.has(d)}function i(d){let h=o.get(d);return h===void 0&&(h={},o.set(d,h)),h}function s(d){o.delete(d)}function l(d,h,p){o.get(d)[h]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:f}}function UC(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.materialVariant!==e.materialVariant?o.materialVariant-e.materialVariant:o.z!==e.z?o.z-e.z:o.id-e.id}function A_(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function R_(){const o=[];let e=0;const i=[],s=[],l=[];function f(){e=0,i.length=0,s.length=0,l.length=0}function d(x){let b=0;return x.isInstancedMesh&&(b+=2),x.isSkinnedMesh&&(b+=1),b}function h(x,b,T,L,y,v){let U=o[e];return U===void 0?(U={id:x.id,object:x,geometry:b,material:T,materialVariant:d(x),groupOrder:L,renderOrder:x.renderOrder,z:y,group:v},o[e]=U):(U.id=x.id,U.object=x,U.geometry=b,U.material=T,U.materialVariant=d(x),U.groupOrder=L,U.renderOrder=x.renderOrder,U.z=y,U.group=v),e++,U}function p(x,b,T,L,y,v,U){U.reversedDepth===!0&&(y=-y);const V=h(x,b,T,L,y,v);T.transmission>0?s.push(V):T.transparent===!0?l.push(V):i.push(V)}function m(x,b,T,L,y,v){const U=h(x,b,T,L,y,v);T.transmission>0?s.unshift(U):T.transparent===!0?l.unshift(U):i.unshift(U)}function _(x,b){i.length>1&&i.sort(x||UC),s.length>1&&s.sort(b||A_),l.length>1&&l.sort(b||A_)}function S(){for(let x=e,b=o.length;x<b;x++){const T=o[x];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:f,push:p,unshift:m,finish:S,sort:_}}function LC(){let o=new WeakMap;function e(s,l){const f=o.get(s);let d;return f===void 0?(d=new R_,o.set(s,[d])):l>=f.length?(d=new R_,f.push(d)):d=f[l],d}function i(){o=new WeakMap}return{get:e,dispose:i}}function OC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={direction:new nt,color:new Re};break;case"SpotLight":i={position:new nt,direction:new nt,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new Re,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":i={color:new Re,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return o[e.id]=i,i}}}function PC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new de,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let IC=0;function zC(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function BC(o){const e=new OC,i=PC(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new nt);const l=new nt,f=new nn,d=new nn;function h(m){let _=0,S=0,x=0;for(let et=0;et<9;et++)s.probe[et].set(0,0,0);let b=0,T=0,L=0,y=0,v=0,U=0,V=0,D=0,N=0,w=0,O=0,A=0,P=0,I=0;m.sort(zC);for(let et=0,Y=m.length;et<Y;et++){const j=m[et],Q=j.color,B=j.intensity,F=j.distance;let Z=null;if(j.shadow&&j.shadow.map&&(j.shadow.map.texture.format===$s?Z=j.shadow.map.texture:Z=j.shadow.map.depthTexture||j.shadow.map.texture),j.isAmbientLight)_+=Q.r*B,S+=Q.g*B,x+=Q.b*B;else if(j.isLightProbe){for(let G=0;G<9;G++)s.probe[G].addScaledVector(j.sh.coefficients[G],B);I++}else if(j.isSunLight){const G=e.get(j);if(G.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){const at=j.shadow,rt=i.get(j);rt.shadowIntensity=at.intensity,rt.shadowBias=at.bias,rt.shadowNormalBias=at.normalBias,rt.shadowRadius=at.radius,rt.shadowMapSize.copy(at.mapSize).multiply(at.getFrameExtents()),s.sunShadow[T]=rt,s.sunShadowMap[T]=Z;const Rt=at.getViewportCount();for(let Et=0;Et<Rt;Et++)s.sunShadowMatrix[L+Et]=at.getMatrix(Et),s.sunShadowCascade[L+Et]=at._cascadeData[Et];L+=Rt,T++}s.sun[b]=G,b++}else if(j.isDirectionalLight){const G=e.get(j);if(G.color.copy(j.color).multiplyScalar(j.intensity),j.castShadow){const at=j.shadow,rt=i.get(j);rt.shadowIntensity=at.intensity,rt.shadowBias=at.bias,rt.shadowNormalBias=at.normalBias,rt.shadowRadius=at.radius,rt.shadowMapSize=at.mapSize,s.directionalShadow[y]=rt,s.directionalShadowMap[y]=Z,s.directionalShadowMatrix[y]=j.shadow.matrix,N++}s.directional[y]=G,y++}else if(j.isSpotLight){const G=e.get(j);G.position.setFromMatrixPosition(j.matrixWorld),G.color.copy(Q).multiplyScalar(B),G.distance=F,G.coneCos=Math.cos(j.angle),G.penumbraCos=Math.cos(j.angle*(1-j.penumbra)),G.decay=j.decay,s.spot[U]=G;const at=j.shadow;if(j.map&&(s.spotLightMap[A]=j.map,A++,at.updateMatrices(j),j.castShadow&&P++),s.spotLightMatrix[U]=at.matrix,j.castShadow){const rt=i.get(j);rt.shadowIntensity=at.intensity,rt.shadowBias=at.bias,rt.shadowNormalBias=at.normalBias,rt.shadowRadius=at.radius,rt.shadowMapSize=at.mapSize,s.spotShadow[U]=rt,s.spotShadowMap[U]=Z,O++}U++}else if(j.isRectAreaLight){const G=e.get(j);G.color.copy(Q).multiplyScalar(B),G.halfWidth.set(j.width*.5,0,0),G.halfHeight.set(0,j.height*.5,0),s.rectArea[V]=G,V++}else if(j.isPointLight){const G=e.get(j);if(G.color.copy(j.color).multiplyScalar(j.intensity),G.distance=j.distance,G.decay=j.decay,j.castShadow){const at=j.shadow,rt=i.get(j);rt.shadowIntensity=at.intensity,rt.shadowBias=at.bias,rt.shadowNormalBias=at.normalBias,rt.shadowRadius=at.radius,rt.shadowMapSize=at.mapSize,rt.shadowCameraNear=at.camera.near,rt.shadowCameraFar=at.camera.far,s.pointShadow[v]=rt,s.pointShadowMap[v]=Z,s.pointShadowMatrix[v]=j.shadow.matrix,w++}s.point[v]=G,v++}else if(j.isHemisphereLight){const G=e.get(j);G.skyColor.copy(j.color).multiplyScalar(B),G.groundColor.copy(j.groundColor).multiplyScalar(B),s.hemi[D]=G,D++}}V>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Gt.LTC_FLOAT_1,s.rectAreaLTC2=Gt.LTC_FLOAT_2):(s.rectAreaLTC1=Gt.LTC_HALF_1,s.rectAreaLTC2=Gt.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=S,s.ambient[2]=x;const X=s.hash;(X.sunLength!==b||X.directionalLength!==y||X.pointLength!==v||X.spotLength!==U||X.rectAreaLength!==V||X.hemiLength!==D||X.numSunShadows!==T||X.numDirectionalShadows!==N||X.numPointShadows!==w||X.numSpotShadows!==O||X.numSpotMaps!==A||X.numLightProbes!==I)&&(s.sun.length=b,s.directional.length=y,s.spot.length=U,s.rectArea.length=V,s.point.length=v,s.hemi.length=D,s.sunShadow.length=T,s.sunShadowMap.length=T,s.sunShadowMatrix.length=L,s.sunShadowCascade.length=L,s.directionalShadow.length=N,s.directionalShadowMap.length=N,s.directionalShadowMatrix.length=N,s.pointShadow.length=w,s.pointShadowMap.length=w,s.pointShadowMatrix.length=w,s.spotShadow.length=O,s.spotShadowMap.length=O,s.spotLightMatrix.length=O+A-P,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=I,X.sunLength=b,X.directionalLength=y,X.pointLength=v,X.spotLength=U,X.rectAreaLength=V,X.hemiLength=D,X.numSunShadows=T,X.numDirectionalShadows=N,X.numPointShadows=w,X.numSpotShadows=O,X.numSpotMaps=A,X.numLightProbes=I,s.version=IC++)}function p(m,_){let S=0,x=0,b=0,T=0,L=0,y=0;const v=_.matrixWorldInverse;for(let U=0,V=m.length;U<V;U++){const D=m[U];if(D.isSunLight){const N=s.sun[S];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(v),S++}else if(D.isDirectionalLight){const N=s.directional[x];N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(v),x++}else if(D.isSpotLight){const N=s.spot[T];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(v),N.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),N.direction.sub(l),N.direction.transformDirection(v),T++}else if(D.isRectAreaLight){const N=s.rectArea[L];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(v),d.identity(),f.copy(D.matrixWorld),f.premultiply(v),d.extractRotation(f),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),N.halfWidth.applyMatrix4(d),N.halfHeight.applyMatrix4(d),L++}else if(D.isPointLight){const N=s.point[b];N.position.setFromMatrixPosition(D.matrixWorld),N.position.applyMatrix4(v),b++}else if(D.isHemisphereLight){const N=s.hemi[y];N.direction.setFromMatrixPosition(D.matrixWorld),N.direction.transformDirection(v),y++}}}return{setup:h,setupView:p,state:s}}function C_(o){const e=new BC(o),i=[],s=[],l=[];function f(x){S.camera=x,i.length=0,s.length=0,l.length=0}function d(x){i.push(x)}function h(x){s.push(x)}function p(x){l.push(x)}function m(){e.setup(i)}function _(x){e.setupView(i,x)}const S={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:f,state:S,setupLights:m,setupLightsView:_,pushLight:d,pushShadow:h,pushLightProbeGrid:p}}function FC(o){let e=new WeakMap;function i(l,f=0){const d=e.get(l);let h;return d===void 0?(h=new C_(o),e.set(l,[h])):f>=d.length?(h=new C_(o),d.push(h)):h=d[f],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const HC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GC=`uniform sampler2D shadow_pass;
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
}`,VC=[new nt(1,0,0),new nt(-1,0,0),new nt(0,1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1)],kC=[new nt(0,-1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1),new nt(0,-1,0),new nt(0,-1,0)],w_=new nn,pl=new nt,Jh=new nt;function XC(o,e,i){let s=new om;const l=new de,f=new de,d=new on,h=new QE,p=new JE,m={},_=i.maxTextureSize,S={[Qs]:jn,[jn]:Qs,[sa]:sa},x=new da({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new de},radius:{value:4}},vertexShader:HC,fragmentShader:GC}),b=x.clone();b.defines.HORIZONTAL_PASS=1;const T=new Fn;T.setAttribute("position",new ca(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new wi(T,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Eu;let v=this.type;this.render=function(w,O,A){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||w.length===0)return;this.type===Pb&&(fe("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Eu);const P=o.getRenderTarget(),I=o.getActiveCubeFace(),X=o.getActiveMipmapLevel(),et=o.state;et.setBlending(Pa),et.buffers.depth.getReversed()===!0?et.buffers.color.setClear(0,0,0,0):et.buffers.color.setClear(1,1,1,1),et.buffers.depth.setTest(!0),et.setScissorTest(!1);const Y=v!==this.type;Y&&O.traverse(function(j){j.material&&(Array.isArray(j.material)?j.material.forEach(Q=>Q.needsUpdate=!0):j.material.needsUpdate=!0)});for(let j=0,Q=w.length;j<Q;j++){const B=w[j],F=B.shadow;if(F===void 0){fe("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;l.copy(F.mapSize);const Z=F.getFrameExtents();l.multiply(Z),f.copy(F.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(f.x=Math.floor(_/Z.x),l.x=f.x*Z.x,F.mapSize.x=f.x),l.y>_&&(f.y=Math.floor(_/Z.y),l.y=f.y*Z.y,F.mapSize.y=f.y));const G=o.state.buffers.depth.getReversed();if(F.camera._reversedDepth=G,F.map===null||Y===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===ml){if(B.isPointLight){fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Gi(l.x,l.y,{format:$s,type:fa,minFilter:Bn,magFilter:Bn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new Ml(l.x,l.y,ra),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=za,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=On,F.map.depthTexture.magFilter=On}else B.isPointLight?(F.map=new py(l.x),F.map.depthTexture=new XE(l.x,ua)):(F.map=new Gi(l.x,l.y),F.map.depthTexture=new Ml(l.x,l.y,ua)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=za,this.type===Eu?(F.map.depthTexture.compareFunction=G?im:nm,F.map.depthTexture.minFilter=Bn,F.map.depthTexture.magFilter=Bn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=On,F.map.depthTexture.magFilter=On);F.camera.updateProjectionMatrix()}F.map.isWebGLCubeRenderTarget!==!0&&(F.map.width!==l.x||F.map.height!==l.y)&&F.map.setSize(l.x,l.y);const at=F.map.isWebGLCubeRenderTarget?6:F.getViewportCount();B.isPointLight!==!0&&F.updateMatrices(B,A);for(let rt=0;rt<at;rt++){const Rt=F.getCamera(rt);if(B.isPointLight){const Et=F.camera,ae=F.matrix,ce=B.distance||Et.far;ce!==Et.far&&(Et.far=ce,Et.updateProjectionMatrix()),pl.setFromMatrixPosition(B.matrixWorld),Et.position.copy(pl),Jh.copy(Et.position),Jh.add(VC[rt]),Et.up.copy(kC[rt]),Et.lookAt(Jh),Et.updateMatrixWorld(),ae.makeTranslation(-pl.x,-pl.y,-pl.z),w_.multiplyMatrices(Et.projectionMatrix,Et.matrixWorldInverse),F._frustum.setFromProjectionMatrix(w_,Et.coordinateSystem,Et.reversedDepth)}if(F.map.isWebGLCubeRenderTarget)o.setRenderTarget(F.map,rt),o.clear();else{rt===0&&(o.setRenderTarget(F.map),o.clear());const Et=F.getViewport(rt);d.set(f.x*Et.x,f.y*Et.y,f.x*Et.z,f.y*Et.w),et.viewport(d)}s=F.getFrustum(rt),D(O,A,Rt,B,this.type)}F.isPointLightShadow!==!0&&this.type===ml&&U(F,A),F.needsUpdate=!1}v=this.type,y.needsUpdate=!1,o.setRenderTarget(P,I,X)};function U(w,O){const A=e.update(L);x.defines.VSM_SAMPLES!==w.blurSamples&&(x.defines.VSM_SAMPLES=w.blurSamples,b.defines.VSM_SAMPLES=w.blurSamples,x.needsUpdate=!0,b.needsUpdate=!0),w.mapPass===null?w.mapPass=new Gi(l.x,l.y,{format:$s,type:fa}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),x.uniforms.shadow_pass.value=w.map.depthTexture,x.uniforms.resolution.value.set(w.map.width,w.map.height),x.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(O,null,A,x,L,null),b.uniforms.shadow_pass.value=w.mapPass.texture,b.uniforms.resolution.value.set(w.map.width,w.map.height),b.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(O,null,A,b,L,null)}function V(w,O,A,P){let I=null;const X=A.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(X!==void 0)I=X;else if(I=A.isPointLight===!0?p:h,o.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const et=I.uuid,Y=O.uuid;let j=m[et];j===void 0&&(j={},m[et]=j);let Q=j[Y];Q===void 0&&(Q=I.clone(),j[Y]=Q,O.addEventListener("dispose",N)),I=Q}if(I.visible=O.visible,I.wireframe=O.wireframe,P===ml?I.side=O.shadowSide!==null?O.shadowSide:O.side:I.side=O.shadowSide!==null?O.shadowSide:S[O.side],I.alphaMap=O.alphaMap,I.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,I.map=O.map,I.clipShadows=O.clipShadows,I.clippingPlanes=O.clippingPlanes,I.clipIntersection=O.clipIntersection,I.displacementMap=O.displacementMap,I.displacementScale=O.displacementScale,I.displacementBias=O.displacementBias,I.wireframeLinewidth=O.wireframeLinewidth,I.linewidth=O.linewidth,A.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const et=o.properties.get(I);et.light=A}return I}function D(w,O,A,P,I){if(w.visible===!1)return;if(w.layers.test(O.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&I===ml)&&(!w.frustumCulled||w.intersectsFrustum(s))){w.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,w.matrixWorld);const Y=e.update(w),j=w.material;if(Array.isArray(j)){const Q=Y.groups;for(let B=0,F=Q.length;B<F;B++){const Z=Q[B],G=j[Z.materialIndex];if(G&&G.visible){const at=V(w,G,P,I);w.onBeforeShadow(o,w,O,A,Y,at,Z),o.renderBufferDirect(A,null,Y,at,w,Z),w.onAfterShadow(o,w,O,A,Y,at,Z)}}}else if(j.visible){const Q=V(w,j,P,I);w.onBeforeShadow(o,w,O,A,Y,Q,null),o.renderBufferDirect(A,null,Y,Q,w,null),w.onAfterShadow(o,w,O,A,Y,Q,null)}}const et=w.children;for(let Y=0,j=et.length;Y<j;Y++)D(et[Y],O,A,P,I)}function N(w){w.target.removeEventListener("dispose",N);for(const A in m){const P=m[A],I=w.target.uuid;I in P&&(P[I].dispose(),delete P[I])}}}function WC(o,e){function i(){let K=!1;const Nt=new on;let St=null;const Ot=new on(0,0,0,0);return{setMask:function(kt){St!==kt&&!K&&(o.colorMask(kt,kt,kt,kt),St=kt)},setLocked:function(kt){K=kt},setClear:function(kt,bt,Jt,Vt,Ie){Ie===!0&&(kt*=Vt,bt*=Vt,Jt*=Vt),Nt.set(kt,bt,Jt,Vt),Ot.equals(Nt)===!1&&(o.clearColor(kt,bt,Jt,Vt),Ot.copy(Nt))},reset:function(){K=!1,St=null,Ot.set(-1,0,0,0)}}}function s(){let K=!1,Nt=!1,St=null,Ot=null,kt=null;return{setReversed:function(bt){if(Nt!==bt){const Jt=e.get("EXT_clip_control");bt?Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.ZERO_TO_ONE_EXT):Jt.clipControlEXT(Jt.LOWER_LEFT_EXT,Jt.NEGATIVE_ONE_TO_ONE_EXT),Nt=bt;const Vt=kt;kt=null,this.setClear(Vt)}},getReversed:function(){return Nt},setTest:function(bt){bt?vt(o.DEPTH_TEST):Dt(o.DEPTH_TEST)},setMask:function(bt){St!==bt&&!K&&(o.depthMask(bt),St=bt)},setFunc:function(bt){if(Nt&&(bt=gE[bt]),Ot!==bt){switch(bt){case np:o.depthFunc(o.NEVER);break;case ip:o.depthFunc(o.ALWAYS);break;case ap:o.depthFunc(o.LESS);break;case vl:o.depthFunc(o.LEQUAL);break;case sp:o.depthFunc(o.EQUAL);break;case rp:o.depthFunc(o.GEQUAL);break;case op:o.depthFunc(o.GREATER);break;case lp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Ot=bt}},setLocked:function(bt){K=bt},setClear:function(bt){kt!==bt&&(kt=bt,Nt&&(bt=1-bt),o.clearDepth(bt))},reset:function(){K=!1,St=null,Ot=null,kt=null,Nt=!1}}}function l(){let K=!1,Nt=null,St=null,Ot=null,kt=null,bt=null,Jt=null,Vt=null,Ie=null;return{setTest:function(ge){K||(ge?vt(o.STENCIL_TEST):Dt(o.STENCIL_TEST))},setMask:function(ge){Nt!==ge&&!K&&(o.stencilMask(ge),Nt=ge)},setFunc:function(ge,ei,mi){(St!==ge||Ot!==ei||kt!==mi)&&(o.stencilFunc(ge,ei,mi),St=ge,Ot=ei,kt=mi)},setOp:function(ge,ei,mi){(bt!==ge||Jt!==ei||Vt!==mi)&&(o.stencilOp(ge,ei,mi),bt=ge,Jt=ei,Vt=mi)},setLocked:function(ge){K=ge},setClear:function(ge){Ie!==ge&&(o.clearStencil(ge),Ie=ge)},reset:function(){K=!1,Nt=null,St=null,Ot=null,kt=null,bt=null,Jt=null,Vt=null,Ie=null}}}const f=new i,d=new s,h=new l,p=new WeakMap,m=new WeakMap;let _={},S={},x={},b=new WeakMap,T=[],L=null,y=!1,v=null,U=null,V=null,D=null,N=null,w=null,O=null,A=new Re(0,0,0),P=0,I=!1,X=null,et=null,Y=null,j=null,Q=null;const B=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Z=0;const G=o.getParameter(o.VERSION);G.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=Z>=1):G.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=Z>=2);let at=null,rt={};const Rt=o.getParameter(o.SCISSOR_BOX),Et=o.getParameter(o.VIEWPORT),ae=new on().fromArray(Rt),ce=new on().fromArray(Et);function he(K,Nt,St,Ot){const kt=new Uint8Array(4),bt=o.createTexture();o.bindTexture(K,bt),o.texParameteri(K,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(K,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let Jt=0;Jt<St;Jt++)K===o.TEXTURE_3D||K===o.TEXTURE_2D_ARRAY?o.texImage3D(Nt,0,o.RGBA,1,1,Ot,0,o.RGBA,o.UNSIGNED_BYTE,kt):o.texImage2D(Nt+Jt,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,kt);return bt}const pt={};pt[o.TEXTURE_2D]=he(o.TEXTURE_2D,o.TEXTURE_2D,1),pt[o.TEXTURE_CUBE_MAP]=he(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),pt[o.TEXTURE_2D_ARRAY]=he(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),pt[o.TEXTURE_3D]=he(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),d.setClear(1),h.setClear(0),vt(o.DEPTH_TEST),d.setFunc(vl),Zt(!1),ne(Ev),vt(o.CULL_FACE),pe(Pa);function vt(K){_[K]!==!0&&(o.enable(K),_[K]=!0)}function Dt(K){_[K]!==!1&&(o.disable(K),_[K]=!1)}function te(K,Nt){return x[K]!==Nt?(o.bindFramebuffer(K,Nt),x[K]=Nt,K===o.DRAW_FRAMEBUFFER&&(x[o.FRAMEBUFFER]=Nt),K===o.FRAMEBUFFER&&(x[o.DRAW_FRAMEBUFFER]=Nt),!0):!1}function gt(K,Nt){let St=T,Ot=!1;if(K){St=b.get(Nt),St===void 0&&(St=[],b.set(Nt,St));const kt=K.textures;if(St.length!==kt.length||St[0]!==o.COLOR_ATTACHMENT0){for(let bt=0,Jt=kt.length;bt<Jt;bt++)St[bt]=o.COLOR_ATTACHMENT0+bt;St.length=kt.length,Ot=!0}}else St[0]!==o.BACK&&(St[0]=o.BACK,Ot=!0);Ot&&o.drawBuffers(St)}function Tt(K){return L!==K?(o.useProgram(K),L=K,!0):!1}const Me={[eo]:o.FUNC_ADD,[zb]:o.FUNC_SUBTRACT,[Bb]:o.FUNC_REVERSE_SUBTRACT};Me[Fb]=o.MIN,Me[Hb]=o.MAX;const ie={[Gb]:o.ZERO,[Vb]:o.ONE,[kb]:o.SRC_COLOR,[I_]:o.SRC_ALPHA,[Zb]:o.SRC_ALPHA_SATURATE,[qb]:o.DST_COLOR,[Wb]:o.DST_ALPHA,[Xb]:o.ONE_MINUS_SRC_COLOR,[z_]:o.ONE_MINUS_SRC_ALPHA,[Yb]:o.ONE_MINUS_DST_COLOR,[jb]:o.ONE_MINUS_DST_ALPHA,[Kb]:o.CONSTANT_COLOR,[Qb]:o.ONE_MINUS_CONSTANT_COLOR,[Jb]:o.CONSTANT_ALPHA,[$b]:o.ONE_MINUS_CONSTANT_ALPHA};function pe(K,Nt,St,Ot,kt,bt,Jt,Vt,Ie,ge){if(K===Pa){y===!0&&(Dt(o.BLEND),y=!1);return}if(y===!1&&(vt(o.BLEND),y=!0),K!==Ib){if(K!==v||ge!==I){if((U!==eo||N!==eo)&&(o.blendEquation(o.FUNC_ADD),U=eo,N=eo),ge)switch(K){case xl:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Tv:o.blendFunc(o.ONE,o.ONE);break;case Av:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case Rv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:He("WebGLState: Invalid blending: ",K);break}else switch(K){case xl:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Tv:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Av:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Rv:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",K);break}V=null,D=null,w=null,O=null,A.set(0,0,0),P=0,v=K,I=ge}return}kt=kt||Nt,bt=bt||St,Jt=Jt||Ot,(Nt!==U||kt!==N)&&(o.blendEquationSeparate(Me[Nt],Me[kt]),U=Nt,N=kt),(St!==V||Ot!==D||bt!==w||Jt!==O)&&(o.blendFuncSeparate(ie[St],ie[Ot],ie[bt],ie[Jt]),V=St,D=Ot,w=bt,O=Jt),(Vt.equals(A)===!1||Ie!==P)&&(o.blendColor(Vt.r,Vt.g,Vt.b,Ie),A.copy(Vt),P=Ie),v=K,I=!1}function oe(K,Nt){K.side===sa?Dt(o.CULL_FACE):vt(o.CULL_FACE);let St=K.side===jn;Nt&&(St=!St),Zt(St),K.blending===xl&&K.transparent===!1?pe(Pa):pe(K.blending,K.blendEquation,K.blendSrc,K.blendDst,K.blendEquationAlpha,K.blendSrcAlpha,K.blendDstAlpha,K.blendColor,K.blendAlpha,K.premultipliedAlpha),d.setFunc(K.depthFunc),d.setTest(K.depthTest),d.setMask(K.depthWrite),f.setMask(K.colorWrite);const Ot=K.stencilWrite;h.setTest(Ot),Ot&&(h.setMask(K.stencilWriteMask),h.setFunc(K.stencilFunc,K.stencilRef,K.stencilFuncMask),h.setOp(K.stencilFail,K.stencilZFail,K.stencilZPass)),sn(K.polygonOffset,K.polygonOffsetFactor,K.polygonOffsetUnits),K.alphaToCoverage===!0?vt(o.SAMPLE_ALPHA_TO_COVERAGE):Dt(o.SAMPLE_ALPHA_TO_COVERAGE)}function Zt(K){X!==K&&(K?o.frontFace(o.CW):o.frontFace(o.CCW),X=K)}function ne(K){K!==Lb?(vt(o.CULL_FACE),K!==et&&(K===Ev?o.cullFace(o.BACK):K===Ob?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):Dt(o.CULL_FACE),et=K}function Ue(K){K!==Y&&(F&&o.lineWidth(K),Y=K)}function sn(K,Nt,St){K?(vt(o.POLYGON_OFFSET_FILL),(j!==Nt||Q!==St)&&(j=Nt,Q=St,d.getReversed()&&(Nt=-Nt),o.polygonOffset(Nt,St))):Dt(o.POLYGON_OFFSET_FILL)}function ot(K){K?vt(o.SCISSOR_TEST):Dt(o.SCISSOR_TEST)}function wt(K){K===void 0&&(K=o.TEXTURE0+B-1),at!==K&&(o.activeTexture(K),at=K)}function k(K,Nt,St){St===void 0&&(at===null?St=o.TEXTURE0+B-1:St=at);let Ot=rt[St];Ot===void 0&&(Ot={type:void 0,texture:void 0},rt[St]=Ot),(Ot.type!==K||Ot.texture!==Nt)&&(at!==St&&(o.activeTexture(St),at=St),o.bindTexture(K,Nt||pt[K]),Ot.type=K,Ot.texture=Nt)}function _e(){const K=rt[at];K!==void 0&&K.type!==void 0&&(o.bindTexture(K.type,null),K.type=void 0,K.texture=void 0)}function se(){try{o.compressedTexImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function z(){try{o.compressedTexImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function E(){try{o.texSubImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function it(){try{o.texSubImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function ft(){try{o.compressedTexSubImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function mt(){try{o.compressedTexSubImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function At(){try{o.texStorage2D(...arguments)}catch(K){He("WebGLState:",K)}}function Lt(){try{o.texStorage3D(...arguments)}catch(K){He("WebGLState:",K)}}function xt(){try{o.texImage2D(...arguments)}catch(K){He("WebGLState:",K)}}function Mt(){try{o.texImage3D(...arguments)}catch(K){He("WebGLState:",K)}}function Ut(K){return S[K]!==void 0?S[K]:o.getParameter(K)}function $t(K,Nt){S[K]!==Nt&&(o.pixelStorei(K,Nt),S[K]=Nt)}function Bt(K){ae.equals(K)===!1&&(o.scissor(K.x,K.y,K.z,K.w),ae.copy(K))}function zt(K){ce.equals(K)===!1&&(o.viewport(K.x,K.y,K.z,K.w),ce.copy(K))}function Xt(K,Nt){let St=m.get(Nt);St===void 0&&(St=new WeakMap,m.set(Nt,St));let Ot=St.get(K);Ot===void 0&&(Ot=o.getUniformBlockIndex(Nt,K.name),St.set(K,Ot))}function re(K,Nt){const Ot=m.get(Nt).get(K);p.get(Nt)!==Ot&&(o.uniformBlockBinding(Nt,Ot,K.__bindingPointIndex),p.set(Nt,Ot))}function me(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),d.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),_={},S={},at=null,rt={},x={},b=new WeakMap,T=[],L=null,y=!1,v=null,U=null,V=null,D=null,N=null,w=null,O=null,A=new Re(0,0,0),P=0,I=!1,X=null,et=null,Y=null,j=null,Q=null,ae.set(0,0,o.canvas.width,o.canvas.height),ce.set(0,0,o.canvas.width,o.canvas.height),f.reset(),d.reset(),h.reset()}return{buffers:{color:f,depth:d,stencil:h},enable:vt,disable:Dt,bindFramebuffer:te,drawBuffers:gt,useProgram:Tt,setBlending:pe,setMaterial:oe,setFlipSided:Zt,setCullFace:ne,setLineWidth:Ue,setPolygonOffset:sn,setScissorTest:ot,activeTexture:wt,bindTexture:k,unbindTexture:_e,compressedTexImage2D:se,compressedTexImage3D:z,texImage2D:xt,texImage3D:Mt,pixelStorei:$t,getParameter:Ut,updateUBOMapping:Xt,uniformBlockBinding:re,texStorage2D:At,texStorage3D:Lt,texSubImage2D:E,texSubImage3D:it,compressedTexSubImage2D:ft,compressedTexSubImage3D:mt,scissor:Bt,viewport:zt,reset:me}}function jC(o,e,i,s,l,f,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new de,_=new WeakMap,S=new Set;let x;const b=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function L(z,E){return T?new OffscreenCanvas(z,E):Pu("canvas")}function y(z,E,it){let ft=1;const mt=se(z);if((mt.width>it||mt.height>it)&&(ft=it/Math.max(mt.width,mt.height)),ft<1)if(typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&z instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&z instanceof ImageBitmap||typeof VideoFrame<"u"&&z instanceof VideoFrame){const At=Math.floor(ft*mt.width),Lt=Math.floor(ft*mt.height);x===void 0&&(x=L(At,Lt));const xt=E?L(At,Lt):x;return xt.width=At,xt.height=Lt,xt.getContext("2d").drawImage(z,0,0,At,Lt),fe("WebGLRenderer: Texture has been resized from ("+mt.width+"x"+mt.height+") to ("+At+"x"+Lt+")."),xt}else return"data"in z&&fe("WebGLRenderer: Image in DataTexture is too big ("+mt.width+"x"+mt.height+")."),z;return z}function v(z){return z.generateMipmaps}function U(z){o.generateMipmap(z)}function V(z){return z.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:z.isWebGL3DRenderTarget?o.TEXTURE_3D:z.isWebGLArrayRenderTarget||z.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function D(z,E,it,ft,mt,At=!1){if(z!==null){if(o[z]!==void 0)return o[z];fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+z+"'")}let Lt;ft&&(Lt=e.get("EXT_texture_norm16"),Lt||fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let xt=E;if(E===o.RED&&(it===o.FLOAT&&(xt=o.R32F),it===o.HALF_FLOAT&&(xt=o.R16F),it===o.UNSIGNED_BYTE&&(xt=o.R8),it===o.UNSIGNED_SHORT&&Lt&&(xt=Lt.R16_EXT),it===o.SHORT&&Lt&&(xt=Lt.R16_SNORM_EXT)),E===o.RED_INTEGER&&(it===o.UNSIGNED_BYTE&&(xt=o.R8UI),it===o.UNSIGNED_SHORT&&(xt=o.R16UI),it===o.UNSIGNED_INT&&(xt=o.R32UI),it===o.BYTE&&(xt=o.R8I),it===o.SHORT&&(xt=o.R16I),it===o.INT&&(xt=o.R32I)),E===o.RG&&(it===o.FLOAT&&(xt=o.RG32F),it===o.HALF_FLOAT&&(xt=o.RG16F),it===o.UNSIGNED_BYTE&&(xt=o.RG8),it===o.UNSIGNED_SHORT&&Lt&&(xt=Lt.RG16_EXT),it===o.SHORT&&Lt&&(xt=Lt.RG16_SNORM_EXT)),E===o.RG_INTEGER&&(it===o.UNSIGNED_BYTE&&(xt=o.RG8UI),it===o.UNSIGNED_SHORT&&(xt=o.RG16UI),it===o.UNSIGNED_INT&&(xt=o.RG32UI),it===o.BYTE&&(xt=o.RG8I),it===o.SHORT&&(xt=o.RG16I),it===o.INT&&(xt=o.RG32I)),E===o.RGB_INTEGER&&(it===o.UNSIGNED_BYTE&&(xt=o.RGB8UI),it===o.UNSIGNED_SHORT&&(xt=o.RGB16UI),it===o.UNSIGNED_INT&&(xt=o.RGB32UI),it===o.BYTE&&(xt=o.RGB8I),it===o.SHORT&&(xt=o.RGB16I),it===o.INT&&(xt=o.RGB32I)),E===o.RGBA_INTEGER&&(it===o.UNSIGNED_BYTE&&(xt=o.RGBA8UI),it===o.UNSIGNED_SHORT&&(xt=o.RGBA16UI),it===o.UNSIGNED_INT&&(xt=o.RGBA32UI),it===o.BYTE&&(xt=o.RGBA8I),it===o.SHORT&&(xt=o.RGBA16I),it===o.INT&&(xt=o.RGBA32I)),E===o.RGB&&(it===o.UNSIGNED_SHORT&&Lt&&(xt=Lt.RGB16_EXT),it===o.SHORT&&Lt&&(xt=Lt.RGB16_SNORM_EXT),it===o.UNSIGNED_INT_5_9_9_9_REV&&(xt=o.RGB9_E5),it===o.UNSIGNED_INT_10F_11F_11F_REV&&(xt=o.R11F_G11F_B10F)),E===o.RGBA){const Mt=At?Ou:Be.getTransfer(mt);it===o.FLOAT&&(xt=o.RGBA32F),it===o.HALF_FLOAT&&(xt=o.RGBA16F),it===o.UNSIGNED_BYTE&&(xt=Mt===Ye?o.SRGB8_ALPHA8:o.RGBA8),it===o.UNSIGNED_SHORT&&Lt&&(xt=Lt.RGBA16_EXT),it===o.SHORT&&Lt&&(xt=Lt.RGBA16_SNORM_EXT),it===o.UNSIGNED_SHORT_4_4_4_4&&(xt=o.RGBA4),it===o.UNSIGNED_SHORT_5_5_5_1&&(xt=o.RGB5_A1)}return(xt===o.R16F||xt===o.R32F||xt===o.RG16F||xt===o.RG32F||xt===o.RGBA16F||xt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),xt}function N(z,E){let it;return z?E===null||E===ua||E===yl?it=o.DEPTH24_STENCIL8:E===ra?it=o.DEPTH32F_STENCIL8:E===_l&&(it=o.DEPTH24_STENCIL8,fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ua||E===yl?it=o.DEPTH_COMPONENT24:E===ra?it=o.DEPTH_COMPONENT32F:E===_l&&(it=o.DEPTH_COMPONENT16),it}function w(z,E){return v(z)===!0||z.isFramebufferTexture&&z.minFilter!==On&&z.minFilter!==Bn?Math.log2(Math.max(E.width,E.height))+1:z.mipmaps!==void 0&&z.mipmaps.length>0?z.mipmaps.length:z.isCompressedTexture&&Array.isArray(z.image)?E.mipmaps.length:1}function O(z){const E=z.target;E.removeEventListener("dispose",O),P(E),E.isVideoTexture&&_.delete(E),E.isHTMLTexture&&S.delete(E)}function A(z){const E=z.target;E.removeEventListener("dispose",A),X(E)}function P(z){const E=s.get(z);if(E.__webglInit===void 0)return;const it=z.source,ft=b.get(it);if(ft){const mt=ft[E.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&I(z),Object.keys(ft).length===0&&b.delete(it)}s.remove(z)}function I(z){const E=s.get(z);o.deleteTexture(E.__webglTexture);const it=z.source,ft=b.get(it);delete ft[E.__cacheKey],d.memory.textures--}function X(z){const E=s.get(z);if(z.depthTexture&&(z.depthTexture.dispose(),s.remove(z.depthTexture)),z.isWebGLCubeRenderTarget)for(let ft=0;ft<6;ft++){if(Array.isArray(E.__webglFramebuffer[ft]))for(let mt=0;mt<E.__webglFramebuffer[ft].length;mt++)o.deleteFramebuffer(E.__webglFramebuffer[ft][mt]);else o.deleteFramebuffer(E.__webglFramebuffer[ft]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[ft])}else{if(Array.isArray(E.__webglFramebuffer))for(let ft=0;ft<E.__webglFramebuffer.length;ft++)o.deleteFramebuffer(E.__webglFramebuffer[ft]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let ft=0;ft<E.__webglColorRenderbuffer.length;ft++)E.__webglColorRenderbuffer[ft]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[ft]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const it=z.textures;for(let ft=0,mt=it.length;ft<mt;ft++){const At=s.get(it[ft]);At.__webglTexture&&(o.deleteTexture(At.__webglTexture),d.memory.textures--),s.remove(it[ft])}s.remove(z)}let et=0;function Y(){et=0}function j(){return et}function Q(z){et=z}function B(){const z=et;return z>=l.maxTextures&&fe("WebGLTextures: Trying to use "+(z+1)+" texture units while this GPU supports only "+l.maxTextures),et+=1,z}function F(z){const E=[];return E.push(z.wrapS),E.push(z.wrapT),E.push(z.wrapR||0),E.push(z.magFilter),E.push(z.minFilter),E.push(z.anisotropy),E.push(z.internalFormat),E.push(z.format),E.push(z.type),E.push(z.generateMipmaps),E.push(z.premultiplyAlpha),E.push(z.flipY),E.push(z.unpackAlignment),E.push(z.colorSpace),E.join()}function Z(z,E){const it=s.get(z);if(z.isVideoTexture&&k(z),z.isRenderTargetTexture===!1&&z.isExternalTexture!==!0&&z.version>0&&it.__version!==z.version){const ft=z.image;if(ft===null)fe("WebGLRenderer: Texture marked for update but no image data found.");else if(ft.complete===!1)fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Dt(it,z,E);return}}else z.isExternalTexture&&(it.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,it.__webglTexture,o.TEXTURE0+E)}function G(z,E){const it=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&it.__version!==z.version){Dt(it,z,E);return}else z.isExternalTexture&&(it.__webglTexture=z.sourceTexture?z.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,it.__webglTexture,o.TEXTURE0+E)}function at(z,E){const it=s.get(z);if(z.isRenderTargetTexture===!1&&z.version>0&&it.__version!==z.version){Dt(it,z,E);return}i.bindTexture(o.TEXTURE_3D,it.__webglTexture,o.TEXTURE0+E)}function rt(z,E){const it=s.get(z);if(z.isCubeDepthTexture!==!0&&z.version>0&&it.__version!==z.version){te(it,z,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,it.__webglTexture,o.TEXTURE0+E)}const Rt={[cp]:o.REPEAT,[Oa]:o.CLAMP_TO_EDGE,[up]:o.MIRRORED_REPEAT},Et={[On]:o.NEAREST,[nE]:o.NEAREST_MIPMAP_NEAREST,[Kc]:o.NEAREST_MIPMAP_LINEAR,[Bn]:o.LINEAR,[Mh]:o.LINEAR_MIPMAP_NEAREST,[Zs]:o.LINEAR_MIPMAP_LINEAR},ae={[rE]:o.NEVER,[fE]:o.ALWAYS,[oE]:o.LESS,[nm]:o.LEQUAL,[lE]:o.EQUAL,[im]:o.GEQUAL,[cE]:o.GREATER,[uE]:o.NOTEQUAL};function ce(z,E){if(E.type===ra&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Bn||E.magFilter===Mh||E.magFilter===Kc||E.magFilter===Zs||E.minFilter===Bn||E.minFilter===Mh||E.minFilter===Kc||E.minFilter===Zs)&&fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(z,o.TEXTURE_WRAP_S,Rt[E.wrapS]),o.texParameteri(z,o.TEXTURE_WRAP_T,Rt[E.wrapT]),(z===o.TEXTURE_3D||z===o.TEXTURE_2D_ARRAY)&&o.texParameteri(z,o.TEXTURE_WRAP_R,Rt[E.wrapR]),o.texParameteri(z,o.TEXTURE_MAG_FILTER,Et[E.magFilter]),o.texParameteri(z,o.TEXTURE_MIN_FILTER,Et[E.minFilter]),E.compareFunction&&(o.texParameteri(z,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(z,o.TEXTURE_COMPARE_FUNC,ae[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===On||E.minFilter!==Kc&&E.minFilter!==Zs||E.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const it=e.get("EXT_texture_filter_anisotropic");o.texParameterf(z,it.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function he(z,E){let it=!1;z.__webglInit===void 0&&(z.__webglInit=!0,E.addEventListener("dispose",O));const ft=E.source;let mt=b.get(ft);mt===void 0&&(mt={},b.set(ft,mt));const At=F(E);if(At!==z.__cacheKey){mt[At]===void 0&&(mt[At]={texture:o.createTexture(),usedTimes:0},d.memory.textures++,it=!0),mt[At].usedTimes++;const Lt=mt[z.__cacheKey];Lt!==void 0&&(mt[z.__cacheKey].usedTimes--,Lt.usedTimes===0&&I(E)),z.__cacheKey=At,z.__webglTexture=mt[At].texture}return it}function pt(z,E,it){return Math.floor(Math.floor(z/it)/E)}function vt(z,E,it,ft){const At=z.updateRanges;if(At.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,E.width,E.height,it,ft,E.data);else{At.sort(($t,Bt)=>$t.start-Bt.start);let Lt=0;for(let $t=1;$t<At.length;$t++){const Bt=At[Lt],zt=At[$t],Xt=Bt.start+Bt.count,re=pt(zt.start,E.width,4),me=pt(Bt.start,E.width,4);zt.start<=Xt+1&&re===me&&pt(zt.start+zt.count-1,E.width,4)===re?Bt.count=Math.max(Bt.count,zt.start+zt.count-Bt.start):(++Lt,At[Lt]=zt)}At.length=Lt+1;const xt=i.getParameter(o.UNPACK_ROW_LENGTH),Mt=i.getParameter(o.UNPACK_SKIP_PIXELS),Ut=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,E.width);for(let $t=0,Bt=At.length;$t<Bt;$t++){const zt=At[$t],Xt=Math.floor(zt.start/4),re=Math.ceil(zt.count/4),me=Xt%E.width,K=Math.floor(Xt/E.width),Nt=re,St=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,me),i.pixelStorei(o.UNPACK_SKIP_ROWS,K),i.texSubImage2D(o.TEXTURE_2D,0,me,K,Nt,St,it,ft,E.data)}z.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,xt),i.pixelStorei(o.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(o.UNPACK_SKIP_ROWS,Ut)}}function Dt(z,E,it){let ft=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(ft=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(ft=o.TEXTURE_3D);const mt=he(z,E),At=E.source;i.bindTexture(ft,z.__webglTexture,o.TEXTURE0+it);const Lt=s.get(At);if(At.version!==Lt.__version||mt===!0){if(i.activeTexture(o.TEXTURE0+it),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const St=Be.getPrimaries(Be.workingColorSpace),Ot=E.colorSpace===xs?null:Be.getPrimaries(E.colorSpace),kt=E.colorSpace===xs||St===Ot?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,kt)}i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment);let Mt=y(E.image,!1,l.maxTextureSize);Mt=_e(E,Mt);const Ut=f.convert(E.format,E.colorSpace),$t=f.convert(E.type);let Bt=D(E.internalFormat,Ut,$t,E.normalized,E.colorSpace,E.isVideoTexture);ce(ft,E);let zt;const Xt=E.mipmaps,re=E.isVideoTexture!==!0,me=Lt.__version===void 0||mt===!0,K=At.dataReady,Nt=w(E,Mt);if(E.isDepthTexture)Bt=N(E.format===Ks,E.type),me&&(re?i.texStorage2D(o.TEXTURE_2D,1,Bt,Mt.width,Mt.height):i.texImage2D(o.TEXTURE_2D,0,Bt,Mt.width,Mt.height,0,Ut,$t,null));else if(E.isDataTexture)if(Xt.length>0){re&&me&&i.texStorage2D(o.TEXTURE_2D,Nt,Bt,Xt[0].width,Xt[0].height);for(let St=0,Ot=Xt.length;St<Ot;St++)zt=Xt[St],re?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,zt.width,zt.height,Ut,$t,zt.data):i.texImage2D(o.TEXTURE_2D,St,Bt,zt.width,zt.height,0,Ut,$t,zt.data);E.generateMipmaps=!1}else re?(me&&i.texStorage2D(o.TEXTURE_2D,Nt,Bt,Mt.width,Mt.height),K&&vt(E,Mt,Ut,$t)):i.texImage2D(o.TEXTURE_2D,0,Bt,Mt.width,Mt.height,0,Ut,$t,Mt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){re&&me&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Nt,Bt,Xt[0].width,Xt[0].height,Mt.depth);for(let St=0,Ot=Xt.length;St<Ot;St++)if(zt=Xt[St],E.format!==Hi)if(Ut!==null)if(re){if(K)if(E.layerUpdates.size>0){const kt=o_(zt.width,zt.height,E.format,E.type);for(const bt of E.layerUpdates){const Jt=zt.data.subarray(bt*kt/zt.data.BYTES_PER_ELEMENT,(bt+1)*kt/zt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,bt,zt.width,zt.height,1,Ut,Jt)}}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,zt.width,zt.height,Mt.depth,Ut,zt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,St,Bt,zt.width,zt.height,Mt.depth,0,zt.data,0,0);else fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else re?K&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,zt.width,zt.height,Mt.depth,Ut,$t,zt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,St,Bt,zt.width,zt.height,Mt.depth,0,Ut,$t,zt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{re&&me&&i.texStorage2D(o.TEXTURE_2D,Nt,Bt,Xt[0].width,Xt[0].height);for(let St=0,Ot=Xt.length;St<Ot;St++)zt=Xt[St],E.format!==Hi?Ut!==null?re?K&&i.compressedTexSubImage2D(o.TEXTURE_2D,St,0,0,zt.width,zt.height,Ut,zt.data):i.compressedTexImage2D(o.TEXTURE_2D,St,Bt,zt.width,zt.height,0,zt.data):fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,zt.width,zt.height,Ut,$t,zt.data):i.texImage2D(o.TEXTURE_2D,St,Bt,zt.width,zt.height,0,Ut,$t,zt.data)}else if(E.isDataArrayTexture)if(re){if(me&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Nt,Bt,Mt.width,Mt.height,Mt.depth),K)if(E.layerUpdates.size>0){const St=o_(Mt.width,Mt.height,E.format,E.type);for(const Ot of E.layerUpdates){const kt=Mt.data.subarray(Ot*St/Mt.data.BYTES_PER_ELEMENT,(Ot+1)*St/Mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Ot,Mt.width,Mt.height,1,Ut,$t,kt)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,Ut,$t,Mt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Bt,Mt.width,Mt.height,Mt.depth,0,Ut,$t,Mt.data);else if(E.isData3DTexture)re?(me&&i.texStorage3D(o.TEXTURE_3D,Nt,Bt,Mt.width,Mt.height,Mt.depth),K&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,Ut,$t,Mt.data)):i.texImage3D(o.TEXTURE_3D,0,Bt,Mt.width,Mt.height,Mt.depth,0,Ut,$t,Mt.data);else if(E.isFramebufferTexture){if(me)if(re)i.texStorage2D(o.TEXTURE_2D,Nt,Bt,Mt.width,Mt.height);else{let St=Mt.width,Ot=Mt.height;for(let kt=0;kt<Nt;kt++)i.texImage2D(o.TEXTURE_2D,kt,Bt,St,Ot,0,Ut,$t,null),St>>=1,Ot>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in o){const St=o.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),Mt.parentNode!==St){St.appendChild(Mt),S.add(E),St.onpaint=Ot=>{const kt=Ot.changedElements;for(const bt of S)kt.includes(bt.image)&&(bt.needsUpdate=!0)},St.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,Mt);else{const kt=o.RGBA,bt=o.RGBA,Jt=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,kt,bt,Jt,Mt)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(Xt.length>0){if(re&&me){const St=se(Xt[0]);i.texStorage2D(o.TEXTURE_2D,Nt,Bt,St.width,St.height)}for(let St=0,Ot=Xt.length;St<Ot;St++)zt=Xt[St],re?K&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Ut,$t,zt):i.texImage2D(o.TEXTURE_2D,St,Bt,Ut,$t,zt);E.generateMipmaps=!1}else if(re){if(me){const St=se(Mt);i.texStorage2D(o.TEXTURE_2D,Nt,Bt,St.width,St.height)}K&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Ut,$t,Mt)}else i.texImage2D(o.TEXTURE_2D,0,Bt,Ut,$t,Mt);v(E)&&U(ft),Lt.__version=At.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function te(z,E,it){if(E.image.length!==6)return;const ft=he(z,E),mt=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,z.__webglTexture,o.TEXTURE0+it);const At=s.get(mt);if(mt.version!==At.__version||ft===!0){i.activeTexture(o.TEXTURE0+it);const Lt=Be.getPrimaries(Be.workingColorSpace),xt=E.colorSpace===xs?null:Be.getPrimaries(E.colorSpace),Mt=E.colorSpace===xs||Lt===xt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Ut=E.isCompressedTexture||E.image[0].isCompressedTexture,$t=E.image[0]&&E.image[0].isDataTexture,Bt=[];for(let bt=0;bt<6;bt++)!Ut&&!$t?Bt[bt]=y(E.image[bt],!0,l.maxCubemapSize):Bt[bt]=$t?E.image[bt].image:E.image[bt],Bt[bt]=_e(E,Bt[bt]);const zt=Bt[0],Xt=f.convert(E.format,E.colorSpace),re=f.convert(E.type),me=D(E.internalFormat,Xt,re,E.normalized,E.colorSpace),K=E.isVideoTexture!==!0,Nt=At.__version===void 0||ft===!0,St=mt.dataReady;let Ot=w(E,zt);ce(o.TEXTURE_CUBE_MAP,E);let kt;if(Ut){K&&Nt&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,me,zt.width,zt.height);for(let bt=0;bt<6;bt++){kt=Bt[bt].mipmaps;for(let Jt=0;Jt<kt.length;Jt++){const Vt=kt[Jt];E.format!==Hi?Xt!==null?K?St&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt,0,0,Vt.width,Vt.height,Xt,Vt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt,me,Vt.width,Vt.height,0,Vt.data):fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt,0,0,Vt.width,Vt.height,Xt,re,Vt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt,me,Vt.width,Vt.height,0,Xt,re,Vt.data)}}}else{if(kt=E.mipmaps,K&&Nt){kt.length>0&&Ot++;const bt=se(Bt[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Ot,me,bt.width,bt.height)}for(let bt=0;bt<6;bt++)if($t){K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Bt[bt].width,Bt[bt].height,Xt,re,Bt[bt].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,me,Bt[bt].width,Bt[bt].height,0,Xt,re,Bt[bt].data);for(let Jt=0;Jt<kt.length;Jt++){const Ie=kt[Jt].image[bt].image;K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt+1,0,0,Ie.width,Ie.height,Xt,re,Ie.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt+1,me,Ie.width,Ie.height,0,Xt,re,Ie.data)}}else{K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,0,0,Xt,re,Bt[bt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,0,me,Xt,re,Bt[bt]);for(let Jt=0;Jt<kt.length;Jt++){const Vt=kt[Jt];K?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt+1,0,0,Xt,re,Vt.image[bt]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+bt,Jt+1,me,Xt,re,Vt.image[bt])}}}v(E)&&U(o.TEXTURE_CUBE_MAP),At.__version=mt.version,E.onUpdate&&E.onUpdate(E)}z.__version=E.version}function gt(z,E,it,ft,mt,At){const Lt=f.convert(it.format,it.colorSpace),xt=f.convert(it.type),Mt=D(it.internalFormat,Lt,xt,it.normalized,it.colorSpace),Ut=s.get(E),$t=s.get(it);if($t.__renderTarget=E,!Ut.__hasExternalTextures){const Bt=Math.max(1,E.width>>At),zt=Math.max(1,E.height>>At);mt===o.TEXTURE_3D||mt===o.TEXTURE_2D_ARRAY?i.texImage3D(mt,At,Mt,Bt,zt,E.depth,0,Lt,xt,null):i.texImage2D(mt,At,Mt,Bt,zt,0,Lt,xt,null)}i.bindFramebuffer(o.FRAMEBUFFER,z),wt(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,ft,mt,$t.__webglTexture,0,ot(E)):(mt===o.TEXTURE_2D||mt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,ft,mt,$t.__webglTexture,At),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Tt(z,E,it){if(o.bindRenderbuffer(o.RENDERBUFFER,z),E.depthBuffer){const ft=E.depthTexture,mt=ft&&ft.isDepthTexture?ft.type:null,At=N(E.stencilBuffer,mt),Lt=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;wt(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ot(E),At,E.width,E.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,ot(E),At,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,At,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Lt,o.RENDERBUFFER,z)}else{const ft=E.textures;for(let mt=0;mt<ft.length;mt++){const At=ft[mt],Lt=f.convert(At.format,At.colorSpace),xt=f.convert(At.type),Mt=D(At.internalFormat,Lt,xt,At.normalized,At.colorSpace);wt(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,ot(E),Mt,E.width,E.height):it?o.renderbufferStorageMultisample(o.RENDERBUFFER,ot(E),Mt,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Mt,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Me(z,E,it){const ft=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,z),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const mt=s.get(E.depthTexture);if(mt.__renderTarget=E,(!mt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),ft){if(mt.__webglInit===void 0&&(mt.__webglInit=!0,E.depthTexture.addEventListener("dispose",O)),mt.__webglTexture===void 0){mt.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,mt.__webglTexture),ce(o.TEXTURE_CUBE_MAP,E.depthTexture);const Ut=f.convert(E.depthTexture.format),$t=f.convert(E.depthTexture.type);let Bt;E.depthTexture.format===za?Bt=o.DEPTH_COMPONENT24:E.depthTexture.format===Ks&&(Bt=o.DEPTH24_STENCIL8);for(let zt=0;zt<6;zt++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+zt,0,Bt,E.width,E.height,0,Ut,$t,null)}}else Z(E.depthTexture,0);const At=mt.__webglTexture,Lt=ot(E),xt=ft?o.TEXTURE_CUBE_MAP_POSITIVE_X+it:o.TEXTURE_2D,Mt=E.depthTexture.format===Ks?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(E.depthTexture.format===za)wt(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Mt,xt,At,0,Lt):o.framebufferTexture2D(o.FRAMEBUFFER,Mt,xt,At,0);else if(E.depthTexture.format===Ks)wt(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Mt,xt,At,0,Lt):o.framebufferTexture2D(o.FRAMEBUFFER,Mt,xt,At,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ie(z){const E=s.get(z),it=z.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==z.depthTexture){const ft=z.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),ft){const mt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,ft.removeEventListener("dispose",mt)};ft.addEventListener("dispose",mt),E.__depthDisposeCallback=mt}E.__boundDepthTexture=ft}if(z.depthTexture&&!E.__autoAllocateDepthBuffer)if(it)for(let ft=0;ft<6;ft++)Me(E.__webglFramebuffer[ft],z,ft);else{const ft=z.texture.mipmaps;ft&&ft.length>0?Me(E.__webglFramebuffer[0],z,0):Me(E.__webglFramebuffer,z,0)}else if(it){E.__webglDepthbuffer=[];for(let ft=0;ft<6;ft++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[ft]),E.__webglDepthbuffer[ft]===void 0)E.__webglDepthbuffer[ft]=o.createRenderbuffer(),Tt(E.__webglDepthbuffer[ft],z,!1);else{const mt=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,At=E.__webglDepthbuffer[ft];o.bindRenderbuffer(o.RENDERBUFFER,At),o.framebufferRenderbuffer(o.FRAMEBUFFER,mt,o.RENDERBUFFER,At)}}else{const ft=z.texture.mipmaps;if(ft&&ft.length>0?i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),Tt(E.__webglDepthbuffer,z,!1);else{const mt=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,At=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,At),o.framebufferRenderbuffer(o.FRAMEBUFFER,mt,o.RENDERBUFFER,At)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function pe(z,E,it){const ft=s.get(z);E!==void 0&&gt(ft.__webglFramebuffer,z,z.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),it!==void 0&&ie(z)}function oe(z){const E=z.texture,it=s.get(z),ft=s.get(E);z.addEventListener("dispose",A);const mt=z.textures,At=z.isWebGLCubeRenderTarget===!0,Lt=mt.length>1;if(Lt||(ft.__webglTexture===void 0&&(ft.__webglTexture=o.createTexture()),ft.__version=E.version,d.memory.textures++),At){it.__webglFramebuffer=[];for(let xt=0;xt<6;xt++)if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer[xt]=[];for(let Mt=0;Mt<E.mipmaps.length;Mt++)it.__webglFramebuffer[xt][Mt]=o.createFramebuffer()}else it.__webglFramebuffer[xt]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){it.__webglFramebuffer=[];for(let xt=0;xt<E.mipmaps.length;xt++)it.__webglFramebuffer[xt]=o.createFramebuffer()}else it.__webglFramebuffer=o.createFramebuffer();if(Lt)for(let xt=0,Mt=mt.length;xt<Mt;xt++){const Ut=s.get(mt[xt]);Ut.__webglTexture===void 0&&(Ut.__webglTexture=o.createTexture(),d.memory.textures++)}if(z.samples>0&&wt(z)===!1){it.__webglMultisampledFramebuffer=o.createFramebuffer(),it.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,it.__webglMultisampledFramebuffer);for(let xt=0;xt<mt.length;xt++){const Mt=mt[xt];it.__webglColorRenderbuffer[xt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,it.__webglColorRenderbuffer[xt]);const Ut=f.convert(Mt.format,Mt.colorSpace),$t=f.convert(Mt.type),Bt=D(Mt.internalFormat,Ut,$t,Mt.normalized,Mt.colorSpace,z.isXRRenderTarget===!0),zt=ot(z);o.renderbufferStorageMultisample(o.RENDERBUFFER,zt,Bt,z.width,z.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+xt,o.RENDERBUFFER,it.__webglColorRenderbuffer[xt])}o.bindRenderbuffer(o.RENDERBUFFER,null),z.depthBuffer&&(it.__webglDepthRenderbuffer=o.createRenderbuffer(),Tt(it.__webglDepthRenderbuffer,z,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(At){i.bindTexture(o.TEXTURE_CUBE_MAP,ft.__webglTexture),ce(o.TEXTURE_CUBE_MAP,E);for(let xt=0;xt<6;xt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Mt=0;Mt<E.mipmaps.length;Mt++)gt(it.__webglFramebuffer[xt][Mt],z,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+xt,Mt);else gt(it.__webglFramebuffer[xt],z,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0);v(E)&&U(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Lt){for(let xt=0,Mt=mt.length;xt<Mt;xt++){const Ut=mt[xt],$t=s.get(Ut);let Bt=o.TEXTURE_2D;(z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(Bt=z.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Bt,$t.__webglTexture),ce(Bt,Ut),gt(it.__webglFramebuffer,z,Ut,o.COLOR_ATTACHMENT0+xt,Bt,0),v(Ut)&&U(Bt)}i.unbindTexture()}else{let xt=o.TEXTURE_2D;if((z.isWebGL3DRenderTarget||z.isWebGLArrayRenderTarget)&&(xt=z.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(xt,ft.__webglTexture),ce(xt,E),E.mipmaps&&E.mipmaps.length>0)for(let Mt=0;Mt<E.mipmaps.length;Mt++)gt(it.__webglFramebuffer[Mt],z,E,o.COLOR_ATTACHMENT0,xt,Mt);else gt(it.__webglFramebuffer,z,E,o.COLOR_ATTACHMENT0,xt,0);v(E)&&U(xt),i.unbindTexture()}z.depthBuffer&&ie(z)}function Zt(z){const E=z.textures;for(let it=0,ft=E.length;it<ft;it++){const mt=E[it];if(v(mt)){const At=V(z),Lt=s.get(mt).__webglTexture;i.bindTexture(At,Lt),U(At),i.unbindTexture()}}}const ne=[],Ue=[];function sn(z){if(z.samples>0){if(wt(z)===!1){const E=z.textures,it=z.width,ft=z.height;let mt=o.COLOR_BUFFER_BIT;const At=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Lt=s.get(z),xt=E.length>1;if(xt)for(let Ut=0;Ut<E.length;Ut++)i.bindFramebuffer(o.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ut,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Lt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ut,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer);const Mt=z.texture.mipmaps;Mt&&Mt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Lt.__webglFramebuffer);for(let Ut=0;Ut<E.length;Ut++){if(z.resolveDepthBuffer&&(z.depthBuffer&&(mt|=o.DEPTH_BUFFER_BIT),z.stencilBuffer&&z.resolveStencilBuffer&&(mt|=o.STENCIL_BUFFER_BIT)),xt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ut]);const $t=s.get(E[Ut]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,$t,0)}o.blitFramebuffer(0,0,it,ft,0,0,it,ft,mt,o.NEAREST),p===!0&&(ne.length=0,Ue.length=0,ne.push(o.COLOR_ATTACHMENT0+Ut),z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&(ne.push(At),Ue.push(At),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,Ue)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ne))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),xt)for(let Ut=0;Ut<E.length;Ut++){i.bindFramebuffer(o.FRAMEBUFFER,Lt.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ut,o.RENDERBUFFER,Lt.__webglColorRenderbuffer[Ut]);const $t=s.get(E[Ut]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Lt.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Ut,o.TEXTURE_2D,$t,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Lt.__webglMultisampledFramebuffer)}else if(z.depthBuffer&&z.storeMultisampledDepthBuffer===!1&&p){const E=z.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function ot(z){return Math.min(l.maxSamples,z.samples)}function wt(z){const E=s.get(z);return z.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function k(z){const E=d.render.frame;_.get(z)!==E&&(_.set(z,E),z.update())}function _e(z,E){const it=z.colorSpace,ft=z.format,mt=z.type;return z.isCompressedTexture===!0||z.isVideoTexture===!0||it!==Lu&&it!==xs&&(Be.getTransfer(it)===Ye?(ft!==Hi||mt!==hi)&&fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",it)),E}function se(z){return typeof HTMLImageElement<"u"&&z instanceof HTMLImageElement?(m.width=z.naturalWidth||z.width,m.height=z.naturalHeight||z.height):typeof VideoFrame<"u"&&z instanceof VideoFrame?(m.width=z.displayWidth,m.height=z.displayHeight):(m.width=z.width,m.height=z.height),m}this.allocateTextureUnit=B,this.resetTextureUnits=Y,this.getTextureUnits=j,this.setTextureUnits=Q,this.setTexture2D=Z,this.setTexture2DArray=G,this.setTexture3D=at,this.setTextureCube=rt,this.rebindTextures=pe,this.setupRenderTarget=oe,this.updateRenderTargetMipmap=Zt,this.updateMultisampleRenderTarget=sn,this.setupDepthRenderbuffer=ie,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=wt,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function qC(o,e){function i(s,l=xs){let f;const d=Be.getTransfer(l);if(s===hi)return o.UNSIGNED_BYTE;if(s===Qp)return o.UNSIGNED_SHORT_4_4_4_4;if(s===Jp)return o.UNSIGNED_SHORT_5_5_5_1;if(s===Y_)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===Z_)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===j_)return o.BYTE;if(s===q_)return o.SHORT;if(s===_l)return o.UNSIGNED_SHORT;if(s===Kp)return o.INT;if(s===ua)return o.UNSIGNED_INT;if(s===ra)return o.FLOAT;if(s===fa)return o.HALF_FLOAT;if(s===K_)return o.ALPHA;if(s===Q_)return o.RGB;if(s===Hi)return o.RGBA;if(s===za)return o.DEPTH_COMPONENT;if(s===Ks)return o.DEPTH_STENCIL;if(s===J_)return o.RED;if(s===$p)return o.RED_INTEGER;if(s===$s)return o.RG;if(s===tm)return o.RG_INTEGER;if(s===em)return o.RGBA_INTEGER;if(s===Tu||s===Au||s===Ru||s===Cu)if(d===Ye)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===Tu)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Au)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Ru)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===Cu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===Tu)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Au)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Ru)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===Cu)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===fp||s===dp||s===hp||s===pp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===fp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===dp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===hp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===pp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===mp||s===gp||s===xp||s===vp||s===_p||s===Nu||s===yp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===mp||s===gp)return d===Ye?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===xp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC;if(s===vp)return f.COMPRESSED_R11_EAC;if(s===_p)return f.COMPRESSED_SIGNED_R11_EAC;if(s===Nu)return f.COMPRESSED_RG11_EAC;if(s===yp)return f.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Sp||s===Mp||s===bp||s===Ep||s===Tp||s===Ap||s===Rp||s===Cp||s===wp||s===Dp||s===Np||s===Up||s===Lp||s===Op)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===Sp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Mp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===bp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Ep)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Tp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ap)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Rp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Cp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===wp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Dp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Np)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Up)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Lp)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Op)return d===Ye?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Pp||s===Ip||s===zp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Pp)return d===Ye?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Ip)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===zp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Bp||s===Fp||s===Uu||s===Hp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===Bp)return f.COMPRESSED_RED_RGTC1_EXT;if(s===Fp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Uu)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Hp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===yl?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const YC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ZC=`
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

}`;class KC{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new oy(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new da({vertexShader:YC,fragmentShader:ZC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new wi(new Gu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class QC extends ys{constructor(e,i){super();const s=this;let l=null,f=1,d=null,h="local-floor",p=1,m=null,_=null,S=null,x=null,b=null,T=null;const L=typeof XRWebGLBinding<"u",y=new KC,v={},U=i.getContextAttributes();let V=null,D=null;const N=[],w=[],O=new de;let A=null,P=null;const I=new Ci;I.viewport=new on;const X=new Ci;X.viewport=new on;const et=[I,X],Y=new i1;let j=null,Q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(pt){let vt=N[pt];return vt===void 0&&(vt=new Dh,N[pt]=vt),vt.getTargetRaySpace()},this.getControllerGrip=function(pt){let vt=N[pt];return vt===void 0&&(vt=new Dh,N[pt]=vt),vt.getGripSpace()},this.getHand=function(pt){let vt=N[pt];return vt===void 0&&(vt=new Dh,N[pt]=vt),vt.getHandSpace()};function B(pt){const vt=w.indexOf(pt.inputSource);if(vt===-1)return;const Dt=N[vt];Dt!==void 0&&(Dt.update(pt.inputSource,pt.frame,m||d),Dt.dispatchEvent({type:pt.type,data:pt.inputSource}))}function F(){l.removeEventListener("select",B),l.removeEventListener("selectstart",B),l.removeEventListener("selectend",B),l.removeEventListener("squeeze",B),l.removeEventListener("squeezestart",B),l.removeEventListener("squeezeend",B),l.removeEventListener("end",F),l.removeEventListener("inputsourceschange",Z);for(let pt=0;pt<N.length;pt++){const vt=w[pt];vt!==null&&(w[pt]=null,N[pt].disconnect(vt))}j=null,Q=null,y.reset();for(const pt in v)delete v[pt];if(e.setRenderTarget(V),b=null,x=null,S=null,l=null,D=null,he.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(O.width,O.height,!1),P!==null){const pt=P.camera;pt.fov=P.fov,pt.zoom=P.zoom,pt.updateProjectionMatrix(),P=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(pt){f=pt,s.isPresenting===!0&&fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(pt){h=pt,s.isPresenting===!0&&fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(pt){m=pt},this.getBaseLayer=function(){return x!==null?x:b},this.getBinding=function(){return S===null&&L&&(S=new XRWebGLBinding(l,i)),S},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(pt){if(l=pt,l!==null){if(V=e.getRenderTarget(),l.addEventListener("select",B),l.addEventListener("selectstart",B),l.addEventListener("selectend",B),l.addEventListener("squeeze",B),l.addEventListener("squeezestart",B),l.addEventListener("squeezeend",B),l.addEventListener("end",F),l.addEventListener("inputsourceschange",Z),U.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(O),L&&"createProjectionLayer"in XRWebGLBinding.prototype){let Dt=null,te=null,gt=null;U.depth&&(gt=U.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,Dt=U.stencil?Ks:za,te=U.stencil?yl:ua);const Tt={colorFormat:i.RGBA8,depthFormat:gt,scaleFactor:f};S=this.getBinding(),x=S.createProjectionLayer(Tt),l.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),D=new Gi(x.textureWidth,x.textureHeight,{format:Hi,type:hi,depthTexture:new Ml(x.textureWidth,x.textureHeight,te,void 0,void 0,void 0,void 0,void 0,void 0,Dt),stencilBuffer:U.stencil,colorSpace:e.outputColorSpace,samples:U.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}else{const Dt={antialias:U.antialias,alpha:!0,depth:U.depth,stencil:U.stencil,framebufferScaleFactor:f};b=new XRWebGLLayer(l,i,Dt),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),D=new Gi(b.framebufferWidth,b.framebufferHeight,{format:Hi,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:U.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1,storeMultisampledDepthBuffer:b.ignoreDepthValues===!1,storeMultisampledStencilBuffer:b.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(p),m=null,d=await l.requestReferenceSpace(h),he.setContext(l),he.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function Z(pt){for(let vt=0;vt<pt.removed.length;vt++){const Dt=pt.removed[vt],te=w.indexOf(Dt);te>=0&&(w[te]=null,N[te].disconnect(Dt))}for(let vt=0;vt<pt.added.length;vt++){const Dt=pt.added[vt];let te=w.indexOf(Dt);if(te===-1){for(let Tt=0;Tt<N.length;Tt++)if(Tt>=w.length){w.push(Dt),te=Tt;break}else if(w[Tt]===null){w[Tt]=Dt,te=Tt;break}if(te===-1)break}const gt=N[te];gt&&gt.connect(Dt)}}const G=new nt,at=new nt;function rt(pt,vt,Dt){G.setFromMatrixPosition(vt.matrixWorld),at.setFromMatrixPosition(Dt.matrixWorld);const te=G.distanceTo(at),gt=vt.projectionMatrix.elements,Tt=Dt.projectionMatrix.elements,Me=gt[14]/(gt[10]-1),ie=gt[14]/(gt[10]+1),pe=(gt[9]+1)/gt[5],oe=(gt[9]-1)/gt[5],Zt=(gt[8]-1)/gt[0],ne=(Tt[8]+1)/Tt[0],Ue=Me*Zt,sn=Me*ne,ot=te/(-Zt+ne),wt=ot*-Zt;if(vt.matrixWorld.decompose(pt.position,pt.quaternion,pt.scale),pt.translateX(wt),pt.translateZ(ot),pt.matrixWorld.compose(pt.position,pt.quaternion,pt.scale),pt.matrixWorldInverse.copy(pt.matrixWorld).invert(),gt[10]===-1)pt.projectionMatrix.copy(vt.projectionMatrix),pt.projectionMatrixInverse.copy(vt.projectionMatrixInverse);else{const k=Me+ot,_e=ie+ot,se=Ue-wt,z=sn+(te-wt),E=pe*ie/_e*k,it=oe*ie/_e*k;pt.projectionMatrix.makePerspective(se,z,E,it,k,_e),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert()}}function Rt(pt,vt){vt===null?pt.matrixWorld.copy(pt.matrix):pt.matrixWorld.multiplyMatrices(vt.matrixWorld,pt.matrix),pt.matrixWorldInverse.copy(pt.matrixWorld).invert()}this.updateCamera=function(pt){if(l===null)return;let vt=pt.near,Dt=pt.far;y.texture!==null&&(y.depthNear>0&&(vt=y.depthNear),y.depthFar>0&&(Dt=y.depthFar)),Y.near=X.near=I.near=vt,Y.far=X.far=I.far=Dt,(j!==Y.near||Q!==Y.far)&&(l.updateRenderState({depthNear:Y.near,depthFar:Y.far}),j=Y.near,Q=Y.far),Y.layers.mask=pt.layers.mask|6,I.layers.mask=Y.layers.mask&-5,X.layers.mask=Y.layers.mask&-3;const te=pt.parent,gt=Y.cameras;Rt(Y,te);for(let Tt=0;Tt<gt.length;Tt++)Rt(gt[Tt],te);gt.length===2?rt(Y,I,X):Y.projectionMatrix.copy(I.projectionMatrix),P===null&&pt.isPerspectiveCamera&&(P={camera:pt,fov:pt.fov,zoom:pt.zoom}),Et(pt,Y,te)};function Et(pt,vt,Dt){Dt===null?pt.matrix.copy(vt.matrixWorld):(pt.matrix.copy(Dt.matrixWorld),pt.matrix.invert(),pt.matrix.multiply(vt.matrixWorld)),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.updateMatrixWorld(!0),pt.projectionMatrix.copy(vt.projectionMatrix),pt.projectionMatrixInverse.copy(vt.projectionMatrixInverse),pt.isPerspectiveCamera&&(pt.fov=Vp*2*Math.atan(1/pt.projectionMatrix.elements[5]),pt.zoom=1)}this.getCamera=function(){return Y},this.getFoveation=function(){if(!(x===null&&b===null))return p},this.setFoveation=function(pt){p=pt,x!==null&&(x.fixedFoveation=pt),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=pt)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(Y)},this.getCameraTexture=function(pt){return v[pt]};let ae=null;function ce(pt,vt){if(_=vt.getViewerPose(m||d),T=vt,_!==null){const Dt=_.views;b!==null&&(e.setRenderTargetFramebuffer(D,b.framebuffer),e.setRenderTarget(D));let te=!1;Dt.length!==Y.cameras.length&&(Y.cameras.length=0,te=!0);for(let ie=0;ie<Dt.length;ie++){const pe=Dt[ie];let oe=null;if(b!==null)oe=b.getViewport(pe);else{const ne=S.getViewSubImage(x,pe);oe=ne.viewport,ie===0&&(e.setRenderTargetTextures(D,ne.colorTexture,ne.depthStencilTexture),e.setRenderTarget(D))}let Zt=et[ie];Zt===void 0&&(Zt=new Ci,Zt.layers.enable(ie),Zt.viewport=new on,et[ie]=Zt),Zt.matrix.fromArray(pe.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(pe.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(oe.x,oe.y,oe.width,oe.height),ie===0&&(Y.matrix.copy(Zt.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),te===!0&&Y.cameras.push(Zt)}const gt=l.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&L){S=s.getBinding();const ie=S.getDepthInformation(Dt[0]);ie&&ie.isValid&&ie.texture&&y.init(ie,l.renderState)}if(gt&&gt.includes("camera-access")&&L){e.state.unbindTexture(),S=s.getBinding();for(let ie=0;ie<Dt.length;ie++){const pe=Dt[ie].camera;if(pe){let oe=v[pe];oe||(oe=new oy,v[pe]=oe);const Zt=S.getCameraImage(pe);oe.sourceTexture=Zt}}}}for(let Dt=0;Dt<N.length;Dt++){const te=w[Dt],gt=N[Dt];te!==null&&gt!==void 0&&gt.update(te,vt,m||d)}ae&&ae(pt,vt),vt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:vt}),T=null}const he=new dy;he.setAnimationLoop(ce),this.setAnimationLoop=function(pt){ae=pt},this.dispose=function(){}}}const JC=new nn,_y=new ve;_y.set(-1,0,0,0,1,0,0,0,1);function $C(o,e){function i(y,v){y.matrixAutoUpdate===!0&&y.updateMatrix(),v.value.copy(y.matrix)}function s(y,v){v.color.getRGB(y.fogColor.value,ly(o)),v.isFog?(y.fogNear.value=v.near,y.fogFar.value=v.far):v.isFogExp2&&(y.fogDensity.value=v.density)}function l(y,v,U,V,D){v.isNodeMaterial?v.uniformsNeedUpdate=!1:v.isMeshBasicMaterial?f(y,v):v.isMeshLambertMaterial?(f(y,v),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)):v.isMeshToonMaterial?(f(y,v),S(y,v)):v.isMeshPhongMaterial?(f(y,v),_(y,v),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)):v.isMeshStandardMaterial?(f(y,v),x(y,v),v.isMeshPhysicalMaterial&&b(y,v,D)):v.isMeshMatcapMaterial?(f(y,v),T(y,v)):v.isMeshDepthMaterial?f(y,v):v.isMeshDistanceMaterial?(f(y,v),L(y,v)):v.isMeshNormalMaterial?f(y,v):v.isLineBasicMaterial?(d(y,v),v.isLineDashedMaterial&&h(y,v)):v.isPointsMaterial?p(y,v,U,V):v.isSpriteMaterial?m(y,v):v.isShadowMaterial?(y.color.value.copy(v.color),y.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function f(y,v){y.opacity.value=v.opacity,v.color&&y.diffuse.value.copy(v.color),v.emissive&&y.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.bumpMap&&(y.bumpMap.value=v.bumpMap,i(v.bumpMap,y.bumpMapTransform),y.bumpScale.value=v.bumpScale,v.side===jn&&(y.bumpScale.value*=-1)),v.normalMap&&(y.normalMap.value=v.normalMap,i(v.normalMap,y.normalMapTransform),y.normalScale.value.copy(v.normalScale),v.side===jn&&y.normalScale.value.negate()),v.displacementMap&&(y.displacementMap.value=v.displacementMap,i(v.displacementMap,y.displacementMapTransform),y.displacementScale.value=v.displacementScale,y.displacementBias.value=v.displacementBias),v.emissiveMap&&(y.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,y.emissiveMapTransform)),v.specularMap&&(y.specularMap.value=v.specularMap,i(v.specularMap,y.specularMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest);const U=e.get(v),V=U.envMap,D=U.envMapRotation;V&&(y.envMap.value=V,y.envMapRotation.value.setFromMatrix4(JC.makeRotationFromEuler(D)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(_y),y.reflectivity.value=v.reflectivity,y.ior.value=v.ior,y.refractionRatio.value=v.refractionRatio),v.lightMap&&(y.lightMap.value=v.lightMap,y.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,y.lightMapTransform)),v.aoMap&&(y.aoMap.value=v.aoMap,y.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,y.aoMapTransform))}function d(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform))}function h(y,v){y.dashSize.value=v.dashSize,y.totalSize.value=v.dashSize+v.gapSize,y.scale.value=v.scale}function p(y,v,U,V){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.size.value=v.size*U,y.scale.value=V*.5,v.map&&(y.map.value=v.map,i(v.map,y.uvTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function m(y,v){y.diffuse.value.copy(v.color),y.opacity.value=v.opacity,y.rotation.value=v.rotation,v.map&&(y.map.value=v.map,i(v.map,y.mapTransform)),v.alphaMap&&(y.alphaMap.value=v.alphaMap,i(v.alphaMap,y.alphaMapTransform)),v.alphaTest>0&&(y.alphaTest.value=v.alphaTest)}function _(y,v){y.specular.value.copy(v.specular),y.shininess.value=Math.max(v.shininess,1e-4)}function S(y,v){v.gradientMap&&(y.gradientMap.value=v.gradientMap)}function x(y,v){y.metalness.value=v.metalness,v.metalnessMap&&(y.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,y.metalnessMapTransform)),y.roughness.value=v.roughness,v.roughnessMap&&(y.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,y.roughnessMapTransform)),v.envMap&&(y.envMapIntensity.value=v.envMapIntensity)}function b(y,v,U){y.ior.value=v.ior,v.sheen>0&&(y.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),y.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(y.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,y.sheenColorMapTransform)),v.sheenRoughnessMap&&(y.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,y.sheenRoughnessMapTransform))),v.clearcoat>0&&(y.clearcoat.value=v.clearcoat,y.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(y.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,y.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(y.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===jn&&y.clearcoatNormalScale.value.negate())),v.dispersion>0&&(y.dispersion.value=v.dispersion),v.retroreflectivity>0&&(y.retroreflectivity.value=v.retroreflectivity),v.iridescence>0&&(y.iridescence.value=v.iridescence,y.iridescenceIOR.value=v.iridescenceIOR,y.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(y.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,y.iridescenceMapTransform)),v.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),v.transmission>0&&(y.transmission.value=v.transmission,y.transmissionSamplerMap.value=U.texture,y.transmissionSamplerSize.value.set(U.width,U.height),v.transmissionMap&&(y.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,y.transmissionMapTransform)),y.thickness.value=v.thickness,v.thicknessMap&&(y.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=v.attenuationDistance,y.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(y.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(y.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=v.specularIntensity,y.specularColor.value.copy(v.specularColor),v.specularColorMap&&(y.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,y.specularColorMapTransform)),v.specularIntensityMap&&(y.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,v){v.matcap&&(y.matcap.value=v.matcap)}function L(y,v){const U=e.get(v).light;y.referencePosition.value.setFromMatrixPosition(U.matrixWorld),y.nearDistance.value=U.shadow.camera.near,y.farDistance.value=U.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function tw(o,e,i,s){let l={},f={},d=[];const h=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(D,N){const w=N.program;s.uniformBlockBinding(D,w)}function m(D,N){let w=l[D.id];w===void 0&&(y(D),w=_(D),l[D.id]=w,D.addEventListener("dispose",U));const O=N.program;s.updateUBOMapping(D,O);const A=e.render.frame;f[D.id]!==A&&(x(D),f[D.id]=A)}function _(D){const N=S();D.__bindingPointIndex=N;const w=o.createBuffer(),O=D.__size,A=D.usage;return o.bindBuffer(o.UNIFORM_BUFFER,w),o.bufferData(o.UNIFORM_BUFFER,O,A),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,N,w),w}function S(){for(let D=0;D<h;D++)if(d.indexOf(D)===-1)return d.push(D),D;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(D){const N=l[D.id],w=D.uniforms,O=D.__cache;o.bindBuffer(o.UNIFORM_BUFFER,N);for(let A=0,P=w.length;A<P;A++){const I=w[A];if(Array.isArray(I))for(let X=0,et=I.length;X<et;X++)b(I[X],A,X,O);else b(I,A,0,O)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function b(D,N,w,O){if(L(D,N,w,O)===!0){const A=D.__offset,P=D.value;if(Array.isArray(P)){let I=0;for(let X=0;X<P.length;X++){const et=P[X],Y=v(et);T(et,D.__data,I),typeof et!="number"&&typeof et!="boolean"&&!et.isMatrix3&&!ArrayBuffer.isView(et)&&(I+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(P,D.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,A,D.__data)}}function T(D,N,w){typeof D=="number"||typeof D=="boolean"?N[0]=D:D.isMatrix3?(N[0]=D.elements[0],N[1]=D.elements[1],N[2]=D.elements[2],N[3]=0,N[4]=D.elements[3],N[5]=D.elements[4],N[6]=D.elements[5],N[7]=0,N[8]=D.elements[6],N[9]=D.elements[7],N[10]=D.elements[8],N[11]=0):ArrayBuffer.isView(D)?N.set(new D.constructor(D.buffer,D.byteOffset,N.length)):D.toArray(N,w)}function L(D,N,w,O){const A=D.value,P=N+"_"+w;if(O[P]===void 0)return typeof A=="number"||typeof A=="boolean"?O[P]=A:ArrayBuffer.isView(A)?O[P]=A.slice():O[P]=A.clone(),!0;{const I=O[P];if(typeof A=="number"||typeof A=="boolean"){if(I!==A)return O[P]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(I.equals(A)===!1)return I.copy(A),!0}}return!1}function y(D){const N=D.uniforms;let w=0;const O=16;for(let P=0,I=N.length;P<I;P++){const X=Array.isArray(N[P])?N[P]:[N[P]];for(let et=0,Y=X.length;et<Y;et++){const j=X[et],Q=Array.isArray(j.value)?j.value:[j.value];for(let B=0,F=Q.length;B<F;B++){const Z=Q[B],G=v(Z),at=w%O,rt=at%G.boundary,Rt=at+rt;w+=rt,Rt!==0&&O-Rt<G.storage&&(w+=O-Rt),j.__data=new Float32Array(G.storage/Float32Array.BYTES_PER_ELEMENT),j.__offset=w,w+=G.storage}}}const A=w%O;return A>0&&(w+=O-A),D.__size=w,D.__cache={},this}function v(D){const N={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(N.boundary=4,N.storage=4):D.isVector2?(N.boundary=8,N.storage=8):D.isVector3||D.isColor?(N.boundary=16,N.storage=12):D.isVector4?(N.boundary=16,N.storage=16):D.isMatrix3?(N.boundary=48,N.storage=48):D.isMatrix4?(N.boundary=64,N.storage=64):D.isTexture?fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(D)?(N.boundary=16,N.storage=D.byteLength):fe("WebGLRenderer: Unsupported uniform value type.",D),N}function U(D){const N=D.target;N.removeEventListener("dispose",U);const w=d.indexOf(N.__bindingPointIndex);d.splice(w,1),o.deleteBuffer(l[N.id]),delete l[N.id],delete f[N.id]}function V(){for(const D in l)o.deleteBuffer(l[D]);d=[],l={},f={}}return{bind:p,update:m,dispose:V}}const ew=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ia=null;function nw(){return ia===null&&(ia=new HE(ew,16,16,$s,fa),ia.name="DFG_LUT",ia.minFilter=Bn,ia.magFilter=Bn,ia.wrapS=Oa,ia.wrapT=Oa,ia.generateMipmaps=!1,ia.needsUpdate=!0),ia}class iw{constructor(e={}){const{canvas:i=pE(),context:s=null,depth:l=!0,stencil:f=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:S=!1,reversedDepthBuffer:x=!1,outputBufferType:b=hi}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=d;const L=b,y=new Set([em,tm,$p]),v=new Set([hi,ua,_l,yl,Qp,Jp]),U=new Uint32Array(4),V=new Int32Array(4),D=new nt;let N=null,w=null;const O=[],A=[];let P=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let X=!1,et=null,Y=null,j=null,Q=null;this._outputColorSpace=Ri;let B=0,F=0,Z=null,G=-1,at=null;const rt=new on,Rt=new on;let Et=null;const ae=new Re(0);let ce=0,he=i.width,pt=i.height,vt=1,Dt=null,te=null;const gt=new on(0,0,he,pt),Tt=new on(0,0,he,pt);let Me=!1;const ie=new om;let pe=!1,oe=!1;const Zt=new nn,ne=new nt,Ue=new on,sn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ot=!1;function wt(){return Z===null?vt:1}let k=s;function _e(R,W){return i.getContext(R,W)}let se,z,E,it,ft,mt,At,Lt,xt,Mt,Ut,$t,Bt,zt,Xt,re,me,K,Nt,St,Ot,kt,bt;try{const R={alpha:!0,depth:l,stencil:f,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:S};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Yp}`),i.addEventListener("webglcontextlost",Ie,!1),i.addEventListener("webglcontextrestored",ge,!1),i.addEventListener("webglcontextcreationerror",ei,!1),k===null){const W="webgl2";if(k=_e(W,R),k===null)throw _e(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Jt()}catch(R){throw i.removeEventListener("webglcontextlost",Ie,!1),i.removeEventListener("webglcontextrestored",ge,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),He("WebGLRenderer: "+R.message),R}function Jt(){se=new nR(k),se.init(),Ot=new qC(k,se),z=new jA(k,se,e,Ot),E=new WC(k,se),z.reversedDepthBuffer&&x&&E.buffers.depth.setReversed(!0),Y=k.createFramebuffer(),j=k.createFramebuffer(),Q=k.createFramebuffer(),it=new sR(k),ft=new NC,mt=new jC(k,se,E,ft,z,Ot,it),At=new eR(I),Lt=new o1(k),kt=new XA(k,Lt),xt=new iR(k,Lt,it,kt),Mt=new oR(k,xt,Lt,kt,it),K=new rR(k,z,mt),Xt=new qA(ft),Ut=new DC(I,At,se,z,kt,Xt),$t=new $C(I,ft),Bt=new LC,zt=new FC(se),me=new kA(I,At,E,Mt,T,p),re=new XC(I,Mt,z),bt=new tw(k,it,z,E),Nt=new WA(k,se,it),St=new aR(k,se,it),it.programs=Ut.programs,I.capabilities=z,I.extensions=se,I.properties=ft,I.renderLists=Bt,I.shadowMap=re,I.state=E,I.info=it}L!==hi&&(P=new cR(L,i.width,i.height,h,l,f));const Vt=new QC(I,k);this.xr=Vt,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const R=se.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=se.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return vt},this.setPixelRatio=function(R){R!==void 0&&(vt=R,this.setSize(he,pt,!1))},this.getSize=function(R){return R.set(he,pt)},this.setSize=function(R,W,ht=!0){if(Vt.isPresenting){fe("WebGLRenderer: Can't change size while VR device is presenting.");return}he=R,pt=W,i.width=Math.floor(R*vt),i.height=Math.floor(W*vt),ht===!0&&(i.style.width=R+"px",i.style.height=W+"px"),P!==null&&P.setSize(i.width,i.height),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(he*vt,pt*vt).floor()},this.setDrawingBufferSize=function(R,W,ht){he=R,pt=W,vt=ht,i.width=Math.floor(R*ht),i.height=Math.floor(W*ht),this.setViewport(0,0,R,W)},this.setEffects=function(R){if(L===hi){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let W=0;W<R.length;W++)if(R[W].isOutputPass===!0){fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(rt)},this.getViewport=function(R){return R.copy(gt)},this.setViewport=function(R,W,ht,lt){R.isVector4?gt.set(R.x,R.y,R.z,R.w):gt.set(R,W,ht,lt),E.viewport(rt.copy(gt).multiplyScalar(vt).round())},this.getScissor=function(R){return R.copy(Tt)},this.setScissor=function(R,W,ht,lt){R.isVector4?Tt.set(R.x,R.y,R.z,R.w):Tt.set(R,W,ht,lt),E.scissor(Rt.copy(Tt).multiplyScalar(vt).round())},this.getScissorTest=function(){return Me},this.setScissorTest=function(R){E.setScissorTest(Me=R)},this.setOpaqueSort=function(R){Dt=R},this.setTransparentSort=function(R){te=R},this.getClearColor=function(R){return R.copy(me.getClearColor())},this.setClearColor=function(){me.setClearColor(...arguments)},this.getClearAlpha=function(){return me.getClearAlpha()},this.setClearAlpha=function(){me.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,ht=!0){let lt=0;if(R){let ct=!1;if(Z!==null){const Ft=Z.texture.format;ct=y.has(Ft)}if(ct){const Ft=Z.texture.type,Wt=v.has(Ft),Pt=me.getClearColor(),Yt=me.getClearAlpha(),Kt=Pt.r,ue=Pt.g,xe=Pt.b;Wt?(U[0]=Kt,U[1]=ue,U[2]=xe,U[3]=Yt,k.clearBufferuiv(k.COLOR,0,U)):(V[0]=Kt,V[1]=ue,V[2]=xe,V[3]=Yt,k.clearBufferiv(k.COLOR,0,V))}else lt|=k.COLOR_BUFFER_BIT}W&&(lt|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ht&&(lt|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),lt!==0&&k.clear(lt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),et=R},this.dispose=function(){i.removeEventListener("webglcontextlost",Ie,!1),i.removeEventListener("webglcontextrestored",ge,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),me.dispose(),Bt.dispose(),zt.dispose(),ft.dispose(),At.dispose(),Mt.dispose(),kt.dispose(),bt.dispose(),Ut.dispose(),Vt.dispose(),Vt.removeEventListener("sessionstart",Ms),Vt.removeEventListener("sessionend",Fa),Vi.stop()};function Ie(R){R.preventDefault(),Dv("WebGLRenderer: Context Lost."),X=!0}function ge(){Dv("WebGLRenderer: Context Restored."),X=!1;const R=it.autoReset,W=re.enabled,ht=re.autoUpdate,lt=re.needsUpdate,ct=re.type;Jt(),it.autoReset=R,re.enabled=W,re.autoUpdate=ht,re.needsUpdate=lt,re.type=ct}function ei(R){He("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function mi(R){const W=R.target;W.removeEventListener("dispose",mi),Xu(W)}function Xu(R){er(R),ft.remove(R)}function er(R){const W=ft.get(R).programs;W!==void 0&&(W.forEach(function(ht){Ut.releaseProgram(ht)}),R.isShaderMaterial&&Ut.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,ht,lt,ct,Ft){W===null&&(W=sn);const Wt=ct.isMesh&&ct.matrixWorld.determinantAffine()<0,Pt=go(R,W,ht,lt,ct);E.setMaterial(lt,Wt);let Yt=ht.index,Kt=1;if(lt.wireframe===!0){if(Yt=xt.getWireframeAttribute(ht),Yt===void 0)return;Kt=2}const ue=ht.drawRange,xe=ht.attributes.position;let jt=ue.start*Kt,Ce=(ue.start+ue.count)*Kt;Ft!==null&&(jt=Math.max(jt,Ft.start*Kt),Ce=Math.min(Ce,(Ft.start+Ft.count)*Kt)),Yt!==null?(jt=Math.max(jt,0),Ce=Math.min(Ce,Yt.count)):xe!=null&&(jt=Math.max(jt,0),Ce=Math.min(Ce,xe.count));const Ee=Ce-jt;if(Ee<0||Ee===1/0)return;kt.setup(ct,lt,Pt,ht,Yt);let Ke,ke=Nt;if(Yt!==null&&(Ke=Lt.get(Yt),ke=St,ke.setIndex(Ke)),ct.isMesh)lt.wireframe===!0?(E.setLineWidth(lt.wireframeLinewidth*wt()),ke.setMode(k.LINES)):ke.setMode(k.TRIANGLES);else if(ct.isLine){let vn=lt.linewidth;vn===void 0&&(vn=1),E.setLineWidth(vn*wt()),ct.isLineSegments?ke.setMode(k.LINES):ct.isLineLoop?ke.setMode(k.LINE_LOOP):ke.setMode(k.LINE_STRIP)}else ct.isPoints?ke.setMode(k.POINTS):ct.isSprite&&ke.setMode(k.TRIANGLES);if(ct.isBatchedMesh)if(se.get("WEBGL_multi_draw"))ke.renderMultiDraw(ct._multiDrawStarts,ct._multiDrawCounts,ct._multiDrawCount);else{const vn=ct._multiDrawStarts,Ht=ct._multiDrawCounts,ln=ct._multiDrawCount,ze=Yt?Lt.get(Yt).bytesPerElement:1,Hn=ft.get(lt).currentProgram.getUniforms();for(let ni=0;ni<ln;ni++)Hn.setValue(k,"_gl_DrawID",ni),ke.render(vn[ni]/ze,Ht[ni])}else if(ct.isInstancedMesh)ke.renderInstances(jt,Ee,ct.count);else if(ht.isInstancedBufferGeometry){const vn=ht._maxInstanceCount!==void 0?ht._maxInstanceCount:1/0,Ht=Math.min(ht.instanceCount,vn);ke.renderInstances(jt,Ee,Ht)}else ke.render(jt,Ee)};function Ss(R,W,ht,lt){et!==null&&R.isNodeMaterial&&et.setObject(lt,R),pe===!0&&Xt.setState(R,ht,!1),R.transparent===!0&&R.side===sa&&R.forceSinglePass===!1?(R.side=jn,R.needsUpdate=!0,bs(R,W,lt),R.side=Qs,R.needsUpdate=!0,bs(R,W,lt),R.side=sa):bs(R,W,lt)}this.compile=function(R,W,ht=null){ht===null&&(ht=R),et!==null&&et.renderStart(R,W,ht),w=zt.get(ht),w.init(W),A.push(w),ht.traverseVisible(function(ct){ct.isLight&&ct.layers.test(W.layers)&&(w.pushLight(ct),ct.castShadow&&w.pushShadow(ct))}),R!==ht&&R.traverseVisible(function(ct){ct.isLight&&ct.layers.test(W.layers)&&(w.pushLight(ct),ct.castShadow&&w.pushShadow(ct))}),w.setupLights(),et!==null&&et.updateLights(w.state.lightsArray),oe=this.localClippingEnabled,pe=Xt.init(this.clippingPlanes,oe),pe===!0&&Xt.setGlobalState(this.clippingPlanes,W),et!==null&&re.render(w.state.shadowsArray,ht,W);const lt=new Set;return R.traverse(function(ct){if(!(ct.isMesh||ct.isPoints||ct.isLine||ct.isSprite))return;const Ft=ct.material;if(Ft)if(Array.isArray(Ft))for(let Wt=0;Wt<Ft.length;Wt++){const Pt=Ft[Wt];Ss(Pt,ht,W,ct),lt.add(Pt)}else Ss(Ft,ht,W,ct),lt.add(Ft)}),w=A.pop(),et!==null&&et.renderEnd(),lt},this.compileAsync=function(R,W,ht=null){const lt=this.compile(R,W,ht);return new Promise(ct=>{function Ft(){if(lt.forEach(function(Wt){const Yt=ft.get(Wt).currentProgram;(Yt===void 0||Yt.isReady())&&lt.delete(Wt)}),lt.size===0){ct(R);return}setTimeout(Ft,10)}se.get("KHR_parallel_shader_compile")!==null?Ft():setTimeout(Ft,10)})};let Ba=null;function ha(R){Ba&&Ba(R)}function Ms(){Vi.stop()}function Fa(){Vi.start()}const Vi=new dy;Vi.setAnimationLoop(ha),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(R){Ba=R,Vt.setAnimationLoop(R),R===null?Vi.stop():Vi.start()},Vt.addEventListener("sessionstart",Ms),Vt.addEventListener("sessionend",Fa),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(X===!0)return;et!==null&&et.renderStart(R,W);const ht=Vt.enabled===!0&&Vt.isPresenting===!0,lt=P!==null&&(Z===null||ht)&&P.begin(I,Z);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Vt.enabled===!0&&Vt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(Vt.cameraAutoUpdate===!0&&Vt.updateCamera(W),W=Vt.getCamera()),R.isScene===!0&&R.onBeforeRender(I,R,W,Z),w=zt.get(R,A.length),w.init(W),w.state.textureUnits=mt.getTextureUnits(),A.push(w),Zt.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),ie.setFromProjectionMatrix(Zt,oa,W.reversedDepth),oe=this.localClippingEnabled,pe=Xt.init(this.clippingPlanes,oe),N=Bt.get(R,O.length),N.init(),O.push(N),Vt.enabled===!0&&Vt.isPresenting===!0){const Wt=I.xr.getDepthSensingMesh();Wt!==null&&uo(Wt,W,-1/0,I.sortObjects)}uo(R,W,0,I.sortObjects),N.finish(),et!==null&&et.updateLights(w.state.lightsArray),I.sortObjects===!0&&N.sort(Dt,te),ot=Vt.enabled===!1||Vt.isPresenting===!1||Vt.hasDepthSensing()===!1,ot&&me.addToRenderList(N,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Xt.beginShadows();const ct=w.state.shadowsArray;if(re.render(ct,R,W),pe===!0&&Xt.endShadows(),(lt&&P.hasRenderPass())===!1){const Wt=N.opaque,Pt=N.transmissive;if(w.setupLights(),W.isArrayCamera){const Yt=W.cameras;if(Pt.length>0)for(let Kt=0,ue=Yt.length;Kt<ue;Kt++){const xe=Yt[Kt];nr(Wt,Pt,R,xe)}ot&&me.render(R);for(let Kt=0,ue=Yt.length;Kt<ue;Kt++){const xe=Yt[Kt];fo(N,R,xe,xe.viewport)}}else Pt.length>0&&nr(Wt,Pt,R,W),ot&&me.render(R),fo(N,R,W)}Z!==null&&F===0&&(mt.updateMultisampleRenderTarget(Z),mt.updateRenderTargetMipmap(Z)),lt&&P.end(I),R.isScene===!0&&R.onAfterRender(I,R,W),kt.resetDefaultState(),G=-1,at=null,A.pop(),A.length>0?(w=A[A.length-1],mt.setTextureUnits(w.state.textureUnits),pe===!0&&Xt.setGlobalState(I.clippingPlanes,w.state.camera)):w=null,O.pop(),O.length>0?N=O[O.length-1]:N=null,et!==null&&et.renderEnd()};function uo(R,W,ht,lt){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)ht=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLightProbeGrid)w.pushLightProbeGrid(R);else if(R.isLight)w.pushLight(R),R.castShadow&&w.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(ie)){lt&&Ue.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Zt);const Wt=Mt.update(R),Pt=R.material;Pt.visible&&N.push(R,Wt,Pt,ht,Ue.z,null,W)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(ie))){const Wt=Mt.update(R),Pt=R.material;if(lt&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Ue.copy(R.boundingSphere.center)):(Wt.boundingSphere===null&&Wt.computeBoundingSphere(),Ue.copy(Wt.boundingSphere.center)),Ue.applyMatrix4(R.matrixWorld).applyMatrix4(Zt)),Array.isArray(Pt)){const Yt=Wt.groups;for(let Kt=0,ue=Yt.length;Kt<ue;Kt++){const xe=Yt[Kt],jt=Pt[xe.materialIndex];jt&&jt.visible&&N.push(R,Wt,jt,ht,Ue.z,xe,W)}}else Pt.visible&&N.push(R,Wt,Pt,ht,Ue.z,null,W)}}const Ft=R.children;for(let Wt=0,Pt=Ft.length;Wt<Pt;Wt++)uo(Ft[Wt],W,ht,lt)}function fo(R,W,ht,lt){const{opaque:ct,transmissive:Ft,transparent:Wt}=R;w.setupLightsView(ht),pe===!0&&Xt.setGlobalState(I.clippingPlanes,ht),lt&&E.viewport(rt.copy(lt)),ct.length>0&&ki(ct,W,ht),Ft.length>0&&ki(Ft,W,ht),Wt.length>0&&ki(Wt,W,ht),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function nr(R,W,ht,lt){if((ht.isScene===!0?ht.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[lt.id]===void 0){const jt=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[lt.id]=new Gi(1,1,{generateMipmaps:!0,type:jt?fa:hi,minFilter:Zs,samples:Math.max(4,z.samples),stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Be.workingColorSpace})}const Ft=w.state.transmissionRenderTarget[lt.id],Wt=lt.viewport||rt;Ft.setSize(Wt.z*I.transmissionResolutionScale,Wt.w*I.transmissionResolutionScale);const Pt=I.getRenderTarget(),Yt=I.getActiveCubeFace(),Kt=I.getActiveMipmapLevel();I.setRenderTarget(Ft),I.getClearColor(ae),ce=I.getClearAlpha(),ce<1&&I.setClearColor(16777215,.5),I.clear(),ot&&me.render(ht);const ue=I.toneMapping;I.toneMapping=la;const xe=lt.viewport;if(lt.viewport!==void 0&&(lt.viewport=void 0),w.setupLightsView(lt),pe===!0&&Xt.setGlobalState(I.clippingPlanes,lt),ki(R,ht,lt),mt.updateMultisampleRenderTarget(Ft),mt.updateRenderTargetMipmap(Ft),se.has("WEBGL_multisampled_render_to_texture")===!1){let jt=!1;for(let Ce=0,Ee=W.length;Ce<Ee;Ce++){const Ke=W[Ce],{object:ke,geometry:vn,material:Ht,group:ln}=Ke;if(Ht.side===sa&&ke.layers.test(lt.layers)){const ze=Ht.side;Ht.side=jn,Ht.needsUpdate=!0,Cl(ke,ht,lt,vn,Ht,ln),Ht.side=ze,Ht.needsUpdate=!0,jt=!0}}jt===!0&&(mt.updateMultisampleRenderTarget(Ft),mt.updateRenderTargetMipmap(Ft))}I.setRenderTarget(Pt,Yt,Kt),I.setClearColor(ae,ce),xe!==void 0&&(lt.viewport=xe),I.toneMapping=ue}function ki(R,W,ht){const lt=W.isScene===!0?W.overrideMaterial:null;for(let ct=0,Ft=R.length;ct<Ft;ct++){const Wt=R[ct],{object:Pt,geometry:Yt,group:Kt}=Wt;let ue=Wt.material;ue.allowOverride===!0&&lt!==null&&(ue=lt),Pt.layers.test(ht.layers)&&Cl(Pt,W,ht,Yt,ue,Kt)}}function Cl(R,W,ht,lt,ct,Ft){et!==null&&ct.isNodeMaterial&&et.setObject(R,ct),R.onBeforeRender(I,W,ht,lt,ct,Ft),R.modelViewMatrix.multiplyMatrices(ht.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ct.onBeforeRender(I,W,ht,lt,R,Ft),ct.transparent===!0&&ct.side===sa&&ct.forceSinglePass===!1?(ct.side=jn,ct.needsUpdate=!0,I.renderBufferDirect(ht,W,lt,ct,R,Ft),ct.side=Qs,ct.needsUpdate=!0,I.renderBufferDirect(ht,W,lt,ct,R,Ft),ct.side=sa):I.renderBufferDirect(ht,W,lt,ct,R,Ft),R.onAfterRender(I,W,ht,lt,ct,Ft)}function bs(R,W,ht){W.isScene!==!0&&(W=sn);const lt=ft.get(R),ct=w.state.lights,Ft=w.state.shadowsArray,Wt=ct.state.version,Pt=Ut.getParameters(R,ct.state,Ft,W,ht,w.state.lightProbeGridArray),Yt=Ut.getProgramCacheKey(Pt);let Kt=lt.programs;lt.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?W.environment:null,lt.fog=W.fog;const ue=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;lt.envMap=At.get(R.envMap||lt.environment,ue),lt.envMapRotation=lt.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,Kt===void 0&&(R.addEventListener("dispose",mi),Kt=new Map,lt.programs=Kt);let xe=Kt.get(Yt);if(xe!==void 0){if(lt.currentProgram===xe&&lt.lightsStateVersion===Wt)return po(R,Pt),xe}else Pt.uniforms=Ut.getUniforms(R),et!==null&&R.isNodeMaterial&&et.build(R,ht,Pt),R.onBeforeCompile(Pt,I),xe=Ut.acquireProgram(Pt,Yt),Kt.set(Yt,xe),lt.uniforms=Pt.uniforms;const jt=lt.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(jt.clippingPlanes=Xt.uniform),po(R,Pt),lt.needsLights=Dl(R),lt.lightsStateVersion=Wt,lt.needsLights&&(jt.ambientLightColor.value=ct.state.ambient,jt.lightProbe.value=ct.state.probe,jt.sunLights.value=ct.state.sun,jt.sunLightShadows.value=ct.state.sunShadow,jt.directionalLights.value=ct.state.directional,jt.directionalLightShadows.value=ct.state.directionalShadow,jt.spotLights.value=ct.state.spot,jt.spotLightShadows.value=ct.state.spotShadow,jt.rectAreaLights.value=ct.state.rectArea,jt.ltc_1.value=ct.state.rectAreaLTC1,jt.ltc_2.value=ct.state.rectAreaLTC2,jt.pointLights.value=ct.state.point,jt.pointLightShadows.value=ct.state.pointShadow,jt.hemisphereLights.value=ct.state.hemi,jt.sunShadowMatrix.value=ct.state.sunShadowMatrix,jt.sunShadowCascade.value=ct.state.sunShadowCascade,jt.directionalShadowMatrix.value=ct.state.directionalShadowMatrix,jt.spotLightMatrix.value=ct.state.spotLightMatrix,jt.spotLightMap.value=ct.state.spotLightMap,jt.pointShadowMatrix.value=ct.state.pointShadowMatrix),lt.lightProbeGrid=w.state.lightProbeGridArray.length>0,lt.currentProgram=xe,lt.uniformsList=null,xe}function ho(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Du.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function po(R,W){const ht=ft.get(R);ht.outputColorSpace=W.outputColorSpace,ht.batching=W.batching,ht.batchingColor=W.batchingColor,ht.instancing=W.instancing,ht.instancingColor=W.instancingColor,ht.instancingMorph=W.instancingMorph,ht.skinning=W.skinning,ht.morphTargets=W.morphTargets,ht.morphNormals=W.morphNormals,ht.morphColors=W.morphColors,ht.morphTargetsCount=W.morphTargetsCount,ht.numClippingPlanes=W.numClippingPlanes,ht.numIntersection=W.numClipIntersection,ht.vertexAlphas=W.vertexAlphas,ht.vertexTangents=W.vertexTangents,ht.toneMapping=W.toneMapping}function mo(R,W){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;D.setFromMatrixPosition(W.matrixWorld);for(let ht=0,lt=R.length;ht<lt;ht++){const ct=R[ht];if(ct.texture!==null&&ct.boundingBox.containsPoint(D))return ct}return null}function go(R,W,ht,lt,ct){W.isScene!==!0&&(W=sn),mt.resetTextureUnits();const Ft=W.fog,Wt=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial?W.environment:null,Pt=Z===null?I.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Be.workingColorSpace,Yt=lt.isMeshStandardMaterial||lt.isMeshLambertMaterial&&!lt.envMap||lt.isMeshPhongMaterial&&!lt.envMap,Kt=At.get(lt.envMap||Wt,Yt),ue=lt.vertexColors===!0&&!!ht.attributes.color&&ht.attributes.color.itemSize===4,xe=!!ht.attributes.tangent&&(!!lt.normalMap||lt.anisotropy>0),jt=!!ht.morphAttributes.position,Ce=!!ht.morphAttributes.normal,Ee=!!ht.morphAttributes.color;let Ke=la;lt.toneMapped&&(Z===null||Z.isXRRenderTarget===!0)&&(Ke=I.toneMapping);const ke=ht.morphAttributes.position||ht.morphAttributes.normal||ht.morphAttributes.color,vn=ke!==void 0?ke.length:0,Ht=ft.get(lt),ln=w.state.lights;if(pe===!0&&(oe===!0||R!==at)){const Le=R===at&&lt.id===G;Xt.setState(lt,R,Le)}let ze=!1;lt.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==ln.state.version||Ht.outputColorSpace!==Pt||ct.isBatchedMesh&&Ht.batching===!1||!ct.isBatchedMesh&&Ht.batching===!0||ct.isBatchedMesh&&Ht.batchingColor===!0&&ct._colorsTexture===null||ct.isBatchedMesh&&Ht.batchingColor===!1&&ct._colorsTexture!==null||ct.isInstancedMesh&&Ht.instancing===!1||!ct.isInstancedMesh&&Ht.instancing===!0||ct.isSkinnedMesh&&Ht.skinning===!1||!ct.isSkinnedMesh&&Ht.skinning===!0||ct.isInstancedMesh&&Ht.instancingColor===!0&&ct.instanceColor===null||ct.isInstancedMesh&&Ht.instancingColor===!1&&ct.instanceColor!==null||ct.isInstancedMesh&&Ht.instancingMorph===!0&&ct.morphTexture===null||ct.isInstancedMesh&&Ht.instancingMorph===!1&&ct.morphTexture!==null||Ht.envMap!==Kt||lt.fog===!0&&Ht.fog!==Ft||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==Xt.numPlanes||Ht.numIntersection!==Xt.numIntersection)||Ht.vertexAlphas!==ue||Ht.vertexTangents!==xe||Ht.morphTargets!==jt||Ht.morphNormals!==Ce||Ht.morphColors!==Ee||Ht.toneMapping!==Ke||Ht.morphTargetsCount!==vn||!!Ht.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ze=!0):(ze=!0,Ht.__version=lt.version);let Hn=Ht.currentProgram;ze===!0&&(Hn=bs(lt,W,ct),et&&lt.isNodeMaterial&&et.onUpdateProgram(lt,Hn,Ht));let ni=!1,Xi=!1,Te=!1;const Ge=Hn.getUniforms(),$e=Ht.uniforms;if(E.useProgram(Hn.program)&&(ni=!0,Xi=!0,Te=!0),lt.id!==G&&(G=lt.id,Xi=!0),Ht.needsLights){const Le=mo(w.state.lightProbeGridArray,ct);Ht.lightProbeGrid!==Le&&(Ht.lightProbeGrid=Le,Xi=!0)}if(ni||at!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ge.setValue(k,"projectionMatrix",R.projectionMatrix),Ge.setValue(k,"viewMatrix",R.matrixWorldInverse);const cn=Ge.map.cameraPosition;cn!==void 0&&cn.setValue(k,ne.setFromMatrixPosition(R.matrixWorld)),z.logarithmicDepthBuffer&&Ge.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(lt.isMeshPhongMaterial||lt.isMeshToonMaterial||lt.isMeshLambertMaterial||lt.isMeshBasicMaterial||lt.isMeshStandardMaterial||lt.isShaderMaterial)&&Ge.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),at!==R&&(at=R,Xi=!0,Te=!0)}if(Ht.needsLights&&(ln.state.sunShadowMap.length>0&&Ge.setValue(k,"sunShadowMap",ln.state.sunShadowMap,mt),ln.state.directionalShadowMap.length>0&&Ge.setValue(k,"directionalShadowMap",ln.state.directionalShadowMap,mt),ln.state.spotShadowMap.length>0&&Ge.setValue(k,"spotShadowMap",ln.state.spotShadowMap,mt),ln.state.pointShadowMap.length>0&&Ge.setValue(k,"pointShadowMap",ln.state.pointShadowMap,mt)),ct.isSkinnedMesh){Ge.setOptional(k,ct,"bindMatrix"),Ge.setOptional(k,ct,"bindMatrixInverse");const Le=ct.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),Ge.setValue(k,"boneTexture",Le.boneTexture,mt))}ct.isBatchedMesh&&(Ge.setOptional(k,ct,"batchingTexture"),Ge.setValue(k,"batchingTexture",ct._matricesTexture,mt),Ge.setOptional(k,ct,"batchingIdTexture"),Ge.setValue(k,"batchingIdTexture",ct._indirectTexture,mt),Ge.setOptional(k,ct,"batchingColorTexture"),ct._colorsTexture!==null&&Ge.setValue(k,"batchingColorTexture",ct._colorsTexture,mt));const ii=ht.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&K.update(ct,ht,Hn),(Xi||Ht.receiveShadow!==ct.receiveShadow)&&(Ht.receiveShadow=ct.receiveShadow,Ge.setValue(k,"receiveShadow",ct.receiveShadow)),(lt.isMeshStandardMaterial||lt.isMeshLambertMaterial||lt.isMeshPhongMaterial)&&lt.envMap===null&&W.environment!==null&&($e.envMapIntensity.value=W.environmentIntensity),$e.dfgLUT!==void 0&&($e.dfgLUT.value=nw()),Xi){if(Ge.setValue(k,"toneMappingExposure",I.toneMappingExposure),Ht.needsLights&&wl($e,Te),Ft&&lt.fog===!0&&$t.refreshFogUniforms($e,Ft),$t.refreshMaterialUniforms($e,lt,vt,pt,w.state.transmissionRenderTarget[R.id]),Ht.needsLights&&Ht.lightProbeGrid){const Le=Ht.lightProbeGrid;$e.probesSH.value=Le.texture,$e.probesMin.value.copy(Le.boundingBox.min),$e.probesMax.value.copy(Le.boundingBox.max),$e.probesResolution.value.copy(Le.resolution)}Du.upload(k,ho(Ht),$e,mt)}if(lt.isShaderMaterial&&lt.uniformsNeedUpdate===!0&&(Du.upload(k,ho(Ht),$e,mt),lt.uniformsNeedUpdate=!1),lt.isSpriteMaterial&&Ge.setValue(k,"center",ct.center),Ge.setValue(k,"modelViewMatrix",ct.modelViewMatrix),Ge.setValue(k,"normalMatrix",ct.normalMatrix),Ge.setValue(k,"modelMatrix",ct.matrixWorld),lt.uniformsGroups!==void 0){const Le=lt.uniformsGroups;for(let cn=0,pa=Le.length;cn<pa;cn++){const Nl=Le[cn];bt.update(Nl,Hn),bt.bind(Nl,Hn)}}return Hn}function wl(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.sunLights.needsUpdate=W,R.sunLightShadows.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Dl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return Z},this.setRenderTargetTextures=function(R,W,ht){const lt=ft.get(R);lt.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,lt.__autoAllocateDepthBuffer===!1&&(lt.__useRenderToTexture=!1),ft.get(R.texture).__webglTexture=W,ft.get(R.depthTexture).__webglTexture=lt.__autoAllocateDepthBuffer?void 0:ht,lt.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const ht=ft.get(R);ht.__webglFramebuffer=W,ht.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,ht=0){Z=R,B=W,F=ht;let lt=null,ct=!1,Ft=!1;if(R){const Pt=ft.get(R);if(Pt.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(k.FRAMEBUFFER,Pt.__webglFramebuffer),rt.copy(R.viewport),Rt.copy(R.scissor),Et=R.scissorTest,E.viewport(rt),E.scissor(Rt),E.setScissorTest(Et),G=-1;return}else if(Pt.__webglFramebuffer===void 0)mt.setupRenderTarget(R);else if(Pt.__hasExternalTextures)mt.rebindTextures(R,ft.get(R.texture).__webglTexture,ft.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const ue=R.depthTexture;if(Pt.__boundDepthTexture!==ue){if(ue!==null&&ft.has(ue)&&(R.width!==ue.image.width||R.height!==ue.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");mt.setupDepthRenderbuffer(R)}}const Yt=R.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Ft=!0);const Kt=ft.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(Kt[W])?lt=Kt[W][ht]:lt=Kt[W],ct=!0):R.samples>0&&mt.useMultisampledRTT(R)===!1?lt=ft.get(R).__webglMultisampledFramebuffer:Array.isArray(Kt)?lt=Kt[ht]:lt=Kt,rt.copy(R.viewport),Rt.copy(R.scissor),Et=R.scissorTest}else rt.copy(gt).multiplyScalar(vt).floor(),Rt.copy(Tt).multiplyScalar(vt).floor(),Et=Me;if(ht!==0&&(lt=Y),E.bindFramebuffer(k.FRAMEBUFFER,lt)&&E.drawBuffers(R,lt),E.viewport(rt),E.scissor(Rt),E.setScissorTest(Et),ct){const Pt=ft.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+W,Pt.__webglTexture,ht)}else if(Ft){const Pt=W;for(let Yt=0;Yt<R.textures.length;Yt++){const Kt=ft.get(R.textures[Yt]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Yt,Kt.__webglTexture,ht,Pt)}}else if(R!==null&&ht!==0){const Pt=ft.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Pt.__webglTexture,ht)}G=-1};function gi(R){const W=ft.get(R);return(W.__readFormat!==R.format||W.__readType!==R.type)&&(W.__readFormat=R.format,W.__readType=R.type,W.__formatReadable=z.textureFormatReadable(R.format),W.__typeReadable=z.textureTypeReadable(R.type)),W}this.readRenderTargetPixels=function(R,W,ht,lt,ct,Ft,Wt,Pt=0){if(!(R&&R.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Yt=ft.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Wt!==void 0&&(Yt=Yt[Wt]),Yt){E.bindFramebuffer(k.FRAMEBUFFER,Yt);try{const Kt=R.textures[Pt],ue=Kt.format,xe=Kt.type;R.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Pt);const jt=gi(Kt);if(jt.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(jt.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-lt&&ht>=0&&ht<=R.height-ct&&k.readPixels(W,ht,lt,ct,Ot.convert(ue),Ot.convert(xe),Ft)}finally{const Kt=Z!==null?ft.get(Z).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,Kt)}}},this.readRenderTargetPixelsAsync=async function(R,W,ht,lt,ct,Ft,Wt,Pt=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Yt=ft.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Wt!==void 0&&(Yt=Yt[Wt]),Yt)if(W>=0&&W<=R.width-lt&&ht>=0&&ht<=R.height-ct){E.bindFramebuffer(k.FRAMEBUFFER,Yt);const Kt=R.textures[Pt],ue=Kt.format,xe=Kt.type;R.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Pt);const jt=gi(Kt);if(jt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(jt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,Ce),k.bufferData(k.PIXEL_PACK_BUFFER,Ft.byteLength,k.STREAM_READ),k.readPixels(W,ht,lt,ct,Ot.convert(ue),Ot.convert(xe),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);const Ee=Z!==null?ft.get(Z).__webglFramebuffer:null;E.bindFramebuffer(k.FRAMEBUFFER,Ee);const Ke=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await mE(k,Ke,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,Ce),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ft),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(Ce),k.deleteSync(Ke),Ft}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,ht=0){const lt=Math.pow(2,-ht),ct=Math.floor(R.image.width*lt),Ft=Math.floor(R.image.height*lt),Wt=W!==null?W.x:0,Pt=W!==null?W.y:0;mt.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,ht,0,0,Wt,Pt,ct,Ft),E.unbindTexture()},this.copyTextureToTexture=function(R,W,ht=null,lt=null,ct=0,Ft=0){let Wt,Pt,Yt,Kt,ue,xe,jt,Ce,Ee;const Ke=R.isCompressedTexture?R.mipmaps[Ft]:R.image;if(ht!==null)Wt=ht.max.x-ht.min.x,Pt=ht.max.y-ht.min.y,Yt=ht.isBox3?ht.max.z-ht.min.z:1,Kt=ht.min.x,ue=ht.min.y,xe=ht.isBox3?ht.min.z:0;else{const $e=Math.pow(2,-ct);Wt=Math.floor(Ke.width*$e),Pt=Math.floor(Ke.height*$e),R.isDataArrayTexture?Yt=Ke.depth:R.isData3DTexture?Yt=Math.floor(Ke.depth*$e):Yt=1,Kt=0,ue=0,xe=0}lt!==null?(jt=lt.x,Ce=lt.y,Ee=lt.z):(jt=0,Ce=0,Ee=0);const ke=Ot.convert(W.format),vn=Ot.convert(W.type);let Ht;W.isData3DTexture?(mt.setTexture3D(W,0),Ht=k.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(mt.setTexture2DArray(W,0),Ht=k.TEXTURE_2D_ARRAY):(mt.setTexture2D(W,0),Ht=k.TEXTURE_2D),E.activeTexture(k.TEXTURE0),E.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,W.flipY),E.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),E.pixelStorei(k.UNPACK_ALIGNMENT,W.unpackAlignment);const ln=E.getParameter(k.UNPACK_ROW_LENGTH),ze=E.getParameter(k.UNPACK_IMAGE_HEIGHT),Hn=E.getParameter(k.UNPACK_SKIP_PIXELS),ni=E.getParameter(k.UNPACK_SKIP_ROWS),Xi=E.getParameter(k.UNPACK_SKIP_IMAGES);E.pixelStorei(k.UNPACK_ROW_LENGTH,Ke.width),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ke.height),E.pixelStorei(k.UNPACK_SKIP_PIXELS,Kt),E.pixelStorei(k.UNPACK_SKIP_ROWS,ue),E.pixelStorei(k.UNPACK_SKIP_IMAGES,xe);const Te=R.isDataArrayTexture||R.isData3DTexture,Ge=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const $e=ft.get(R),ii=ft.get(W),Le=ft.get($e.__renderTarget),cn=ft.get(ii.__renderTarget);E.bindFramebuffer(k.READ_FRAMEBUFFER,Le.__webglFramebuffer),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,cn.__webglFramebuffer);for(let pa=0;pa<Yt;pa++)Te&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ft.get(R).__webglTexture,ct,xe+pa),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ft.get(W).__webglTexture,Ft,Ee+pa)),k.blitFramebuffer(Kt,ue,Wt,Pt,jt,Ce,Wt,Pt,k.DEPTH_BUFFER_BIT,k.NEAREST);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(ct!==0||R.isRenderTargetTexture||ft.has(R)){const $e=ft.get(R),ii=ft.get(W);E.bindFramebuffer(k.READ_FRAMEBUFFER,j),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,Q);for(let Le=0;Le<Yt;Le++)Te?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,$e.__webglTexture,ct,xe+Le):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,$e.__webglTexture,ct),Ge?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,ii.__webglTexture,Ft,Ee+Le):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,ii.__webglTexture,Ft),ct!==0?k.blitFramebuffer(Kt,ue,Wt,Pt,jt,Ce,Wt,Pt,k.COLOR_BUFFER_BIT,k.NEAREST):Ge?k.copyTexSubImage3D(Ht,Ft,jt,Ce,Ee+Le,Kt,ue,Wt,Pt):k.copyTexSubImage2D(Ht,Ft,jt,Ce,Kt,ue,Wt,Pt);E.bindFramebuffer(k.READ_FRAMEBUFFER,null),E.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Ge?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(Ht,Ft,jt,Ce,Ee,Wt,Pt,Yt,ke,vn,Ke.data):W.isCompressedArrayTexture?k.compressedTexSubImage3D(Ht,Ft,jt,Ce,Ee,Wt,Pt,Yt,ke,Ke.data):k.texSubImage3D(Ht,Ft,jt,Ce,Ee,Wt,Pt,Yt,ke,vn,Ke):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ft,jt,Ce,Wt,Pt,ke,vn,Ke.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ft,jt,Ce,Ke.width,Ke.height,ke,Ke.data):k.texSubImage2D(k.TEXTURE_2D,Ft,jt,Ce,Wt,Pt,ke,vn,Ke);E.pixelStorei(k.UNPACK_ROW_LENGTH,ln),E.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ze),E.pixelStorei(k.UNPACK_SKIP_PIXELS,Hn),E.pixelStorei(k.UNPACK_SKIP_ROWS,ni),E.pixelStorei(k.UNPACK_SKIP_IMAGES,Xi),Ft===0&&W.generateMipmaps&&k.generateMipmap(Ht),E.unbindTexture()},this.initRenderTarget=function(R){ft.get(R).__webglFramebuffer===void 0&&mt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?mt.setTextureCube(R,0):R.isData3DTexture?mt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?mt.setTexture2DArray(R,0):mt.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){B=0,F=0,Z=null,E.reset(),kt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),i.unpackColorSpace=Be._getUnpackColorSpace()}}const D_={type:"change"},fm={type:"start"},yy={type:"end"},bu=new Al,N_=new La,aw=Math.cos(70*vE.DEG2RAD),yn=new nt,ti=2*Math.PI,Ze={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},$h=1e-6;class sw extends s1{constructor(e,i=null){super(e,i),this.state=Ze.NONE,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ao.ROTATE,MIDDLE:ao.DOLLY,RIGHT:ao.PAN},this.touches={ONE:no.ROTATE,TWO:no.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new vs,this._lastTargetPosition=new nt,this._quat=new vs().setFromUnitVectors(e.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new r_,this._sphericalDelta=new r_,this._scale=1,this._panOffset=new nt,this._rotateStart=new de,this._rotateEnd=new de,this._rotateDelta=new de,this._panStart=new de,this._panEnd=new de,this._panDelta=new de,this._dollyStart=new de,this._dollyEnd=new de,this._dollyDelta=new de,this._dollyDirection=new nt,this._mouse=new de,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=ow.bind(this),this._onPointerDown=rw.bind(this),this._onPointerUp=lw.bind(this),this._onContextMenu=mw.bind(this),this._onMouseWheel=fw.bind(this),this._onKeyDown=dw.bind(this),this._onTouchStart=hw.bind(this),this._onTouchMove=pw.bind(this),this._onMouseDown=cw.bind(this),this._onMouseMove=uw.bind(this),this._interceptControlDown=gw.bind(this),this._interceptControlUp=xw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ze.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(D_),this.update(),this.state=Ze.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;yn.copy(i).sub(this.target),yn.applyQuaternion(this._quat),this._spherical.setFromVector3(yn),this.autoRotate&&this.state===Ze.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ti:s>Math.PI&&(s-=ti),l<-Math.PI?l+=ti:l>Math.PI&&(l-=ti),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=d!=this._spherical.radius}if(yn.setFromSpherical(this._spherical),yn.applyQuaternion(this._quatInverse),i.copy(this.target).add(yn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const h=yn.length();d=this._clampDistance(h*this._scale);const p=h-d;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const h=new nt(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const m=new nt(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),d=yn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(bu.origin.copy(this.object.position),bu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(bu.direction))<aw?this.object.lookAt(this.target):(N_.setFromNormalAndCoplanarPoint(this.object.up,this.target),bu.intersectPlane(N_,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>$h||8*(1-this._lastQuaternion.dot(this.object.quaternion))>$h||this._lastTargetPosition.distanceToSquared(this.target)>$h?(this.dispatchEvent(D_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ti/60*this.autoRotateSpeed*e:ti/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){yn.setFromMatrixColumn(i,0),yn.multiplyScalar(-e),this._panOffset.add(yn)}_panUp(e,i){this.screenSpacePanning===!0?yn.setFromMatrixColumn(i,1):(yn.setFromMatrixColumn(i,0),yn.crossVectors(this.object.up,yn)),yn.multiplyScalar(e),this._panOffset.add(yn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;yn.copy(l).sub(this.target);let f=yn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,f=i-s.top,d=s.width,h=s.height;this._mouse.x=l/d*2-1,this._mouse.y=-(f/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(l,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(d,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new de,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function rw(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function ow(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function lw(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(yy),this.state=Ze.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function cw(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ao.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Ze.DOLLY;break;case ao.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ze.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ze.ROTATE}break;case ao.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ze.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ze.PAN}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(fm)}function uw(o){switch(this.state){case Ze.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Ze.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Ze.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function fw(o){this.enabled===!1||this.enableZoom===!1||this.state!==Ze.NONE||(o.preventDefault(),this.dispatchEvent(fm),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(yy))}function dw(o){this.enabled!==!1&&this._handleKeyDown(o)}function hw(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case no.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Ze.TOUCH_ROTATE;break;case no.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Ze.TOUCH_PAN;break;default:this.state=Ze.NONE}break;case 2:switch(this.touches.TWO){case no.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Ze.TOUCH_DOLLY_PAN;break;case no.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Ze.TOUCH_DOLLY_ROTATE;break;default:this.state=Ze.NONE}break;default:this.state=Ze.NONE}this.state!==Ze.NONE&&this.dispatchEvent(fm)}function pw(o){switch(this._trackPointer(o),this.state){case Ze.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Ze.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Ze.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Ze.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Ze.NONE}}function mw(o){this.enabled!==!1&&o.preventDefault()}function gw(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function xw(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const vw=({memories:o,status:e,onSelectMemory:i})=>{const s=Ct.useRef(null),[l,f]=Ct.useState("all"),[d,h]=Ct.useState(!0),[p,m]=Ct.useState(null),[_,S]=Ct.useState({x:0,y:0}),[x,b]=Ct.useState([]),T=Ct.useRef(d);T.current=d;const L=Ct.useRef(l);L.current=l;const y=Ct.useRef(null),v=Ct.useRef(null),U=Ct.useRef(null),V=Ct.useRef(null),D=Ct.useRef([]),N=Ct.useRef(null),w=Ct.useRef(null),O=Ct.useRef(null),A=Ct.useRef(null),P=Ct.useMemo(()=>o.filter(Y=>l==="rules"?Y.kind==="rule":l==="traps"?Y.kind==="error_trap":!0),[o,l]);Ct.useEffect(()=>{const Y=s.current;if(!Y)return;const j=Y.clientWidth,Q=Y.clientHeight||640,B=new UE;B.background=new Re(592139),B.fog=new rm(592139,.015),y.current=B;const F=new Ci(55,j/Q,.1,300);F.position.set(0,12,34),F.lookAt(0,0,0),v.current=F;const Z=new iw({antialias:!0,alpha:!1,powerPreference:"high-performance"});Z.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Z.setSize(j,Q),Z.toneMapping=Zp,Z.toneMappingExposure=1.1,Y.appendChild(Z.domElement),U.current=Z;const G=new sw(F,Z.domElement);G.enableDamping=!0,G.dampingFactor=.05,G.autoRotate=!0,G.autoRotateSpeed=.45,G.minDistance=6,G.maxDistance=90,G.maxPolarAngle=Math.PI*.85,V.current=G;const at=new e1(16777215,.7);B.add(at);const rt=new n_(3718648,1.2);rt.position.set(10,20,15),B.add(rt);const Rt=new n_(16498468,.8);Rt.position.set(-15,-10,-10),B.add(Rt);const Et=new a1(60,30,2565930,1579035);Et.position.y=-12,Et.material.transparent=!0,Et.material.opacity=.25,B.add(Et);const ae=350,ce=new Fn,he=new Float32Array(ae*3);for(let Tt=0;Tt<ae*3;Tt+=3)he[Tt]=(Math.random()-.5)*90,he[Tt+1]=(Math.random()-.5)*60,he[Tt+2]=(Math.random()-.5)*90;ce.setAttribute("position",new ca(he,3));const pt=new sy({color:9741240,size:.18,transparent:!0,opacity:.45}),vt=new kE(ce,pt);B.add(vt),A.current=vt;let Dt;const te=()=>{Dt=requestAnimationFrame(te),A.current&&(A.current.rotation.y+=3e-4),w.current&&F&&(F.position.lerp(w.current,.06),F.position.distanceTo(w.current)<.04&&(w.current=null)),O.current&&G&&(G.target.lerp(O.current,.06),G.target.distanceTo(O.current)<.04&&(O.current=null)),G.autoRotate=T.current,G.update();const Tt=Y.clientWidth/2,Me=Y.clientHeight/2,ie=new nt,pe=[];D.current.forEach((oe,Zt)=>{(oe.isTrap||Zt<5)&&(ie.copy(oe.position),ie.project(F),ie.z<1&&ie.x>=-.9&&ie.x<=.9&&ie.y>=-.9&&ie.y<=.9&&pe.push({id:oe.id,title:oe.memory.title,isTrap:oe.isTrap,x:ie.x*Tt+Tt,y:-(ie.y*Me)+Me,visible:!0}))}),b(pe),Z.render(B,F)};te();const gt=()=>{if(!Y||!Z||!F)return;const Tt=Y.clientWidth,Me=Y.clientHeight||640;F.aspect=Tt/Me,F.updateProjectionMatrix(),Z.setSize(Tt,Me)};return window.addEventListener("resize",gt),()=>{cancelAnimationFrame(Dt),window.removeEventListener("resize",gt),G.dispose(),Z.dispose(),Z.domElement&&Y.contains(Z.domElement)&&Y.removeChild(Z.domElement)}},[]),Ct.useEffect(()=>{const Y=y.current;if(!Y)return;D.current.forEach(F=>{Y.remove(F.mesh),Y.remove(F.halo),F.ring&&Y.remove(F.ring),F.mesh.geometry.dispose(),F.halo.geometry.dispose(),F.ring&&F.ring.geometry.dispose()}),D.current=[],N.current&&(Y.remove(N.current),N.current.geometry.dispose(),N.current=null);const j=P.length;if(j===0)return;const Q=[];P.forEach((F,Z)=>{const G=F.kind==="error_trap",at=Math.acos(-1+2*Z/Math.max(1,j)),rt=Math.sqrt(j*Math.PI)*at,Rt=G?14+Z%3*2.5:10+Z%4*3,Et=Rt*Math.cos(rt)*Math.sin(at),ae=G?4+Math.sin(rt)*3.5:Math.sin(at)*6-2,ce=Rt*Math.sin(rt)*Math.sin(at),he=new nt(Et,ae,ce),vt=(G?.55:.42)+Math.min(.4,(F.reward_score-1)*.2),Dt=G?16498468:3718648,te=G?14251782:165063,gt=new Fu(vt,24,24),Tt=new KE({color:Dt,emissive:te,emissiveIntensity:G?.55:.35,roughness:.25,metalness:.1}),Me=new wi(gt,Tt);Me.position.copy(he),Me.userData={memoryId:F.id,memory:F},Y.add(Me);const ie=new Fu(vt*2.2,16,16),pe=new Iu({color:Dt,transparent:!0,opacity:G?.14:.08,side:jn}),oe=new wi(ie,pe);oe.position.copy(he),Y.add(oe);let Zt;if(G){const ne=new cm(vt*1.5,vt*1.9,32),Ue=new Iu({color:16498468,transparent:!0,opacity:.65,side:sa});Zt=new wi(ne,Ue),Zt.position.copy(he),Zt.rotation.x=Math.PI/2,Y.add(Zt)}Q.push({id:F.id,memory:F,mesh:Me,halo:oe,ring:Zt,position:he,color:G?"#fbbf24":"#38bdf8",isTrap:G,screenPos:{x:0,y:0,visible:!1}})}),D.current=Q;const B=[];for(let F=0;F<Q.length;F++)for(let Z=F+1;Z<Q.length;Z++){const G=Q[F],at=Q[Z],rt=G.memory.module.toLowerCase()===at.memory.module.toLowerCase(),Rt=G.memory.linked_files?.some(ae=>at.memory.linked_files?.includes(ae)),Et=G.position.distanceTo(at.position);(rt||Rt)&&Et<18&&B.push(G.position,at.position)}if(B.length>0){const F=new Fn().setFromPoints(B),Z=new lm({color:3718648,transparent:!0,opacity:.12}),G=new ay(F,Z);Y.add(G),N.current=G}},[P]);const I=Ct.useCallback(Y=>{const j=s.current,Q=v.current;if(!j||!Q)return;const B=j.getBoundingClientRect(),F=(Y.clientX-B.left)/B.width*2-1,Z=-((Y.clientY-B.top)/B.height)*2+1,G=new a_;G.setFromCamera(new de(F,Z),Q);const at=D.current.map(Rt=>Rt.mesh),rt=G.intersectObjects(at);if(rt.length>0){const Rt=rt[0].object,Et=D.current.find(ae=>ae.mesh===Rt);if(Et){m(Et),S({x:Y.clientX-B.left,y:Y.clientY-B.top}),j.style.cursor="pointer";return}}m(null),j.style.cursor="grab"},[]),X=Ct.useCallback(Y=>{const j=s.current,Q=v.current;if(!j||!Q)return;const B=j.getBoundingClientRect(),F=(Y.clientX-B.left)/B.width*2-1,Z=-((Y.clientY-B.top)/B.height)*2+1,G=new a_;G.setFromCamera(new de(F,Z),Q);const at=D.current.map(Rt=>Rt.mesh),rt=G.intersectObjects(at);if(rt.length>0){const Rt=rt[0].object,Et=D.current.find(ae=>ae.mesh===Rt);Et&&(i(Et.memory),w.current=Et.position.clone().add(new nt(0,1.8,6.5)),O.current=Et.position.clone())}},[i]),et=()=>{w.current=new nt(0,12,34),O.current=new nt(0,0,0)};return M.jsxs("div",{style:{position:"relative",width:"100%",height:"640px",background:"#09090b",border:"1px solid var(--border)",borderRadius:"6px",overflow:"hidden"},children:[M.jsx("div",{ref:s,onPointerMove:I,onClick:X,style:{width:"100%",height:"100%",cursor:"grab"}}),M.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"},children:x.map(Y=>M.jsxs("div",{onClick:j=>{j.stopPropagation();const Q=o.find(B=>B.id===Y.id);Q&&i(Q)},style:{position:"absolute",left:`${Y.x}px`,top:`${Y.y}px`,transform:"translate(10px, -50%)",pointerEvents:"auto",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",padding:"3px 8px",borderRadius:"12px",background:"rgba(20, 20, 23, 0.85)",border:`1px solid ${Y.isTrap?"rgba(251, 191, 36, 0.4)":"rgba(56, 189, 248, 0.3)"}`,backdropFilter:"blur(8px)",fontSize:"11px",fontFamily:"var(--font-mono)",color:Y.isTrap?"#fbbf24":"var(--text)",whiteSpace:"nowrap",maxWidth:"220px",overflow:"hidden",textOverflow:"ellipsis",boxShadow:"0 4px 12px rgba(0,0,0,0.5)",transition:"transform 0.1s ease, border-color 0.1s ease"},children:[M.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:Y.isTrap?"#fbbf24":"var(--accent)",boxShadow:`0 0 6px ${Y.isTrap?"#fbbf24":"var(--accent)"}`}}),M.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:Y.title})]},Y.id))}),M.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"6px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"10px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("span",{style:{fontSize:"13px"},children:"🌌"}),M.jsx("span",{style:{fontSize:"12px",fontWeight:700,fontFamily:"var(--font-mono)",letterSpacing:"0.04em"},children:"BRAIN OBSERVATORY"})]}),M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[P.length," orbital nodes • ",e?.graphNodesCount??41," knowledge entities"]})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",pointerEvents:"auto"},children:[M.jsxs("div",{style:{display:"flex",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",backdropFilter:"blur(8px)"},children:[M.jsxs("button",{onClick:()=>f("all"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="all"?"var(--accent-weak)":"transparent",color:l==="all"?"var(--accent)":"var(--text-muted)",border:"none"},children:["All (",o.length,")"]}),M.jsxs("button",{onClick:()=>f("rules"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="rules"?"var(--accent-weak)":"transparent",color:l==="rules"?"var(--accent)":"var(--text-muted)",border:"none"},children:["Rules (",o.filter(Y=>Y.kind==="rule").length,")"]}),M.jsxs("button",{onClick:()=>f("traps"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:l==="traps"?"var(--trap-weak)":"transparent",color:l==="traps"?"var(--trap)":"var(--text-muted)",border:"none"},children:["2.0x Traps (",o.filter(Y=>Y.kind==="error_trap").length,")"]})]}),M.jsx("button",{onClick:()=>h(Y=>!Y),className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:d?"Pause rotation":"Resume rotation",children:d?M.jsx(U_,{size:13}):M.jsx(L_,{size:13})}),M.jsx("button",{onClick:et,className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:"Reset 3D camera angle",children:M.jsx(qp,{size:13})})]})]}),p&&M.jsxs("div",{style:{position:"absolute",left:`${Math.min(_.x+16,1100)}px`,top:`${Math.min(_.y+16,520)}px`,pointerEvents:"none",background:"rgba(20, 20, 23, 0.95)",border:`1px solid ${p.isTrap?"var(--trap)":"var(--accent)"}`,borderRadius:"6px",padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.6)",zIndex:100,maxWidth:"300px",backdropFilter:"blur(12px)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"},children:[M.jsx("span",{className:"badge-tag",style:{background:p.isTrap?"var(--trap-weak)":"var(--accent-weak)",color:p.isTrap?"var(--trap)":"var(--accent)"},children:p.isTrap?"2.0X ERROR TRAP":"VERIFIED RULE"}),M.jsx("span",{style:{fontSize:"10.5px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:p.memory.module})]}),M.jsx("div",{style:{fontSize:"12.5px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:p.memory.title}),M.jsxs("div",{style:{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[M.jsxs("span",{children:["[",p.id,"]"]}),M.jsxs("span",{style:{color:p.isTrap?"var(--trap)":"var(--accent)",fontWeight:600},children:[p.memory.reward_score.toFixed(2),"x boost"]})]})]}),M.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"14px",fontSize:"11px",fontFamily:"var(--font-mono)"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#fbbf24",boxShadow:"0 0 6px #fbbf24"}}),M.jsx("span",{style:{color:"#fbbf24"},children:"2.0X ERROR TRAP"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 6px #38bdf8"}}),M.jsx("span",{style:{color:"#38bdf8"},children:"VERIFIED RULE"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[M.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"rgba(56, 189, 248, 0.4)"}}),M.jsx("span",{style:{color:"var(--text-faint)"},children:"CONSTELLATION WIRE"})]})]}),M.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)",display:"flex",gap:"12px"},children:[M.jsxs("span",{children:["Left-Drag: ",M.jsx("b",{children:"Orbit 3D"})]}),M.jsxs("span",{children:["Right-Drag: ",M.jsx("b",{children:"Pan"})]}),M.jsxs("span",{children:["Scroll: ",M.jsx("b",{children:"Zoom"})]}),M.jsxs("span",{children:["Click Node: ",M.jsx("b",{children:"Inspect Rule"})]})]})]})]})},_w=()=>{const[o,e]=Ct.useState(()=>{try{const ot=localStorage.getItem("fastr-theme");return ot==="light"||ot==="dark"?ot:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"dark"}}),[i,s]=Ct.useState("overview"),[l,f]=Ct.useState(!0),[d,h]=Ct.useState(null),[p,m]=Ct.useState([]),[_,S]=Ct.useState([]),[x,b]=Ct.useState([]),[T,L]=Ct.useState([]),[y,v]=Ct.useState(""),[U,V]=Ct.useState("all"),[D,N]=Ct.useState(null),[w,O]=Ct.useState(null),[A,P]=Ct.useState(!1),[I,X]=Ct.useState(null),[et,Y]=Ct.useState(0),j=Ct.useRef([]),[Q,B]=Ct.useState(""),[F,Z]=Ct.useState(""),[G,at]=Ct.useState("general"),[rt,Rt]=Ct.useState("rule"),[Et,ae]=Ct.useState(""),{pendingAction:ce,countdown:he,enqueue:pt,undo:vt}=Tb(),Dt=Ct.useCallback(async()=>{try{const[ot,wt,k,_e]=await Promise.all([fetch("/api/status").then(se=>se.json()),fetch("/api/memories").then(se=>se.json()),fetch("/api/actions").then(se=>se.json()),fetch("/api/conflicts").then(se=>se.json())]);h(ot),m(wt),S(k.actions||[]),b(k.edges||[]),L(_e||[]),f(!1)}catch(ot){console.error("Failed to fetch FastrMemory snapshot:",ot),f(!1)}},[]);Ct.useEffect(()=>{Dt()},[Dt]);const te=async()=>{try{await fetch("/api/actions/seed",{method:"POST"}),Dt()}catch(ot){console.error("Failed to seed actions:",ot)}};Ct.useEffect(()=>{const ot=()=>{const wt=window.location.hash.replace(/^#\/?/,"");["overview","observatory","memories","traps","dag","treemap","rrf","conflicts"].includes(wt)&&s(wt)};return ot(),window.addEventListener("hashchange",ot),()=>window.removeEventListener("hashchange",ot)},[]);const gt=ot=>{s(ot),window.location.hash=`#/${ot}`},{status:Tt,lastEventTime:Me}=Eb({onEvent:(ot,wt)=>{Dt(),ot==="trap_logged"?X(`⚠️ Active Error Trap Logged: "${wt?.title||"Unknown Trap"}"`):ot==="action_claimed"?X(`⚡ Agent [${wt?.claimedBy||"agent"}] claimed task: "${wt?.title||wt?.actionId}"`):ot==="action_completed"&&X(`✅ Action completed: "${wt?.title||wt?.actionId}"`)}});Ct.useEffect(()=>{if(!I)return;const ot=setTimeout(()=>X(null),4500);return()=>clearTimeout(ot)},[I]);const ie=()=>{const ot=o==="dark"?"light":"dark";e(ot);try{localStorage.setItem("fastr-theme",ot)}catch{}document.documentElement.setAttribute("data-theme",ot)};Ct.useEffect(()=>{document.documentElement.setAttribute("data-theme",o)},[o]),Ct.useEffect(()=>{const ot=wt=>{const k=document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA";wt.key==="/"&&!k?(wt.preventDefault(),document.getElementById("fastr-search-input")?.focus()):wt.key==="Escape"?(N(null),O(null),P(!1)):k||(wt.key==="j"||wt.key==="ArrowDown"?(wt.preventDefault(),Y(_e=>Math.min(_e+1,Math.max(0,j.current.length-1)))):wt.key==="k"||wt.key==="ArrowUp"?(wt.preventDefault(),Y(_e=>Math.max(0,_e-1))):wt.key==="Enter"?Y(_e=>{const se=j.current[_e];return se&&N(se),_e}):wt.key==="1"?gt("overview"):wt.key==="2"||wt.key.toLowerCase()==="o"?gt("observatory"):wt.key==="3"?gt("memories"):wt.key==="4"?gt("traps"):wt.key==="5"?gt("dag"):wt.key==="6"?gt("treemap"):wt.key==="7"?gt("rrf"):wt.key==="8"?gt("conflicts"):(wt.key.toLowerCase()==="n"||wt.key.toLowerCase()==="c")&&P(!0))};return window.addEventListener("keydown",ot),()=>window.removeEventListener("keydown",ot)},[]);const pe=(ot,wt,k)=>{const _e=[...T];L(se=>se.filter(z=>z.id!==ot)),pt(`Resolved conflict #${ot} (Kept ${wt})`,async()=>{await fetch("/api/conflicts/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conflictId:ot,keepMemoryId:wt,forgetLoser:k,reason:"Resolved via Fastr Dashboard"})}),Dt()},()=>{L(_e)})},oe=(ot,wt)=>{const k=wt?0:1;m(_e=>_e.map(se=>se.id===ot?{...se,pinned:k}:se)),D&&D.id===ot&&N({...D,pinned:k}),pt(`${k?"Pinned":"Unpinned"} rule ${ot}`,async()=>{await fetch("/api/memories/pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:ot,pinned:!!k})}),Dt()},()=>{m(_e=>_e.map(se=>se.id===ot?{...se,pinned:wt}:se)),D&&D.id===ot&&N({...D,pinned:wt})})},Zt=ot=>{const wt=p.find(k=>k.id===ot);wt&&(m(k=>k.filter(_e=>_e.id!==ot)),N(null),pt(`Forgot memory [${ot}]`,async()=>{await fetch("/api/memories/forget",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:ot,reason:"User requested forget via Fastr Dashboard"})}),Dt()},()=>{m(k=>[...k,wt])}))},ne=async ot=>{if(ot.preventDefault(),!(!Q.trim()||!F.trim()))try{(await fetch("/api/memories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:Q.trim(),content:F.trim(),module:G.trim()||"general",kind:rt,files:Et?Et.split(",").map(k=>k.trim()).filter(Boolean):[]})})).ok&&(B(""),Z(""),ae(""),P(!1),Dt())}catch(wt){console.error("Failed to create memory:",wt)}},Ue=p.filter(ot=>{const wt=U==="all"||ot.module.toLowerCase()===U.toLowerCase(),k=!y||ot.title.toLowerCase().includes(y.toLowerCase())||ot.content.toLowerCase().includes(y.toLowerCase())||ot.id.toLowerCase().includes(y.toLowerCase());return wt&&k});j.current=Ue;const sn=p.filter(ot=>ot.kind==="error_trap");return M.jsxs("div",{style:{maxWidth:"1440px",margin:"0 auto",padding:"16px 20px",minHeight:"100vh",display:"flex",flexDirection:"column",gap:"16px"},children:[M.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"10px 16px",gap:"16px"},children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[M.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px"},children:"⚡"}),M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("span",{style:{fontSize:"14px",fontWeight:700,letterSpacing:"-0.2px",fontFamily:"var(--font-mono)"},children:["FASTR",M.jsx("span",{style:{color:"var(--accent)"},children:"MEMORY"})]}),M.jsx("span",{className:"badge-tag",style:{background:"var(--accent-weak)",color:"var(--accent)"},children:"NODE 24 WAL"})]}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)",marginTop:"1px"},children:d?.projectId||"loading..."})]})]}),M.jsxs("div",{style:{flex:1,maxWidth:"440px",position:"relative"},children:[M.jsx(ep,{size:14,style:{position:"absolute",left:"10px",top:"8px",color:"var(--text-faint)"}}),M.jsx("input",{id:"fastr-search-input",type:"text",value:y,onChange:ot=>v(ot.target.value),placeholder:"Search rules, error traps, files (Press /)...",style:{width:"100%",padding:"6px 32px 6px 30px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",fontFamily:"var(--font-sans)"}}),M.jsx("kbd",{style:{position:"absolute",right:"8px",top:"6px",fontSize:"10px",fontFamily:"var(--font-mono)",background:"var(--surface)",border:"1px solid var(--border)",padding:"1px 5px",borderRadius:"3px",color:"var(--text-faint)"},children:"/"})]}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[M.jsxs("button",{onClick:()=>P(!0),className:"btn btn-primary",title:"Create new rule or error trap (Hotkey: N)",children:[M.jsx(ub,{size:13})," New Rule"]}),M.jsxs("div",{title:`Real-Time SSE: ${Tt} (Last event: ${Me||"none"})`,style:{display:"flex",alignItems:"center",gap:"6px",padding:"4px 9px",borderRadius:"4px",background:Tt==="live"?"var(--success-weak)":"var(--risk-weak)",border:`1px solid ${Tt==="live"?"rgba(52, 211, 153, 0.3)":"rgba(244, 63, 94, 0.3)"}`,color:Tt==="live"?"var(--success)":"var(--risk)",fontSize:"11px",fontWeight:600,fontFamily:"var(--font-mono)"},children:[M.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:Tt==="live"?"var(--success)":"var(--risk)"}}),M.jsx("span",{children:Tt==="live"?"LIVE SSE":"OFFLINE"})]}),M.jsx("button",{onClick:ie,className:"btn",style:{padding:"5px 8px"},title:"Toggle light/dark theme",children:o==="dark"?M.jsx(fb,{size:13}):M.jsx(db,{size:13})}),M.jsx("button",{onClick:Dt,className:"btn",style:{padding:"5px 8px"},title:"Refresh snapshot",children:M.jsx(hb,{size:13})})]})]}),M.jsxs("section",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"10px"},children:[M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"ACTIVE RULES"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.activeCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"2.0X ERROR TRAPS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--trap)",marginTop:"2px"},children:l?"—":d?.trapsCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"FRONTIER TASKS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--accent)",marginTop:"2px"},children:l?"—":d?.frontierCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"KNOWLEDGE NODES"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.graphNodesCount??0})]}),M.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[M.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"CONTRADICTIONS"}),M.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:(d?.conflictsCount??0)>0?"var(--risk)":"var(--text)",marginTop:"2px"},children:l?"—":d?.conflictsCount??0})]})]}),M.jsx("nav",{style:{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",overflowX:"auto"},children:[{id:"overview",label:"OVERVIEW",count:null},{id:"observatory",label:"3D OBSERVATORY",count:p.length},{id:"memories",label:"RULES & TRAPS",count:p.length},{id:"traps",label:"2.0X TRAPS",count:sn.length},{id:"dag",label:"ACTION DAG",count:_.length},{id:"treemap",label:"TREEMAP",count:null},{id:"rrf",label:"RRF TRACE",count:null},{id:"conflicts",label:"CONTRADICTIONS",count:T.length}].map(ot=>{const wt=i===ot.id;return M.jsxs("button",{onClick:()=>gt(ot.id),style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:600,letterSpacing:"0.04em",fontFamily:"var(--font-mono)",border:"none",background:wt?"var(--accent-weak)":"transparent",color:wt?"var(--accent)":"var(--text-muted)",cursor:"pointer",transition:"all 0.1s ease",whiteSpace:"nowrap"},children:[M.jsx("span",{children:ot.label}),ot.count!==null&&M.jsx("span",{style:{fontSize:"10px",padding:"1px 5px",borderRadius:"3px",background:wt?"var(--accent)":"var(--bg-subtle)",color:wt?"#fff":"var(--text-faint)"},children:ot.count})]},ot.id)})}),M.jsx("main",{style:{minHeight:"440px"},children:l?M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px"},children:[M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),M.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}})]}):M.jsxs(M.Fragment,{children:[i==="overview"&&M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[M.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[M.jsx("h2",{style:{fontSize:"16px",fontWeight:700,marginBottom:"6px"},children:"Sovereign Cognitive Agent Memory Engine"}),M.jsxs("p",{style:{color:"var(--text-muted)",fontSize:"13px",lineHeight:"1.5",marginBottom:"16px"},children:["FastrMemory operates inside Node 24 with ",M.jsx("b",{children:"zero external background daemons"}),". Rules, bug-fix traps, and architectural decisions are persisted via SQLite WAL mode, mirrored to ",M.jsx("code",{children:".fastr/pages/*.md"})," for Git pull requests, and fused via Triple-Stream RRF ($k=60$)."]}),M.jsxs("div",{style:{display:"flex",gap:"10px"},children:[M.jsx("button",{onClick:()=>gt("observatory"),className:"btn btn-primary",children:"🔭 3D Brain Observatory →"}),M.jsx("button",{onClick:()=>gt("traps"),className:"btn",children:"Inspect 2.0x Error Traps →"}),M.jsx("button",{onClick:()=>gt("dag"),className:"btn",children:"Open Action DAG →"})]})]}),M.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[M.jsx("h3",{style:{fontSize:"13px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.04em",marginBottom:"12px"},children:"CLI Shortcuts"}),M.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory status"}),M.jsx(pi,{text:"fastrmemory status"})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory bench"}),M.jsx(pi,{text:"fastrmemory bench"})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[M.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory sync"}),M.jsx(pi,{text:"fastrmemory sync"})]})]})]})]}),i==="observatory"&&M.jsx(vw,{memories:p,status:d,onSelectMemory:ot=>N(ot)}),i==="memories"&&M.jsxs("div",{children:[M.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"12px",alignItems:"center",flexWrap:"wrap"},children:[M.jsxs("div",{style:{display:"flex",gap:"4px",overflowX:"auto"},children:[M.jsxs("button",{onClick:()=>V("all"),className:`btn ${U==="all"?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:["All Modules (",p.length,")"]}),(d?.modules||[]).map(ot=>M.jsx("button",{onClick:()=>V(ot),className:`btn ${U===ot?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:ot},ot))]}),M.jsxs("div",{style:{marginLeft:"auto",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:["Showing ",Ue.length," item(s) • Click row to inspect"]})]}),Ue.length===0?M.jsxs("div",{className:"card-panel",style:{padding:"48px 24px",textAlign:"center",color:"var(--text-muted)"},children:[M.jsx("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text)"},children:"No memories match criteria"}),M.jsx("p",{style:{fontSize:"12px",marginTop:"4px"},children:"Adjust search query or select another module."})]}):M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[M.jsx("div",{children:"ID"}),M.jsx("div",{children:"KIND"}),M.jsx("div",{children:"MODULE"}),M.jsx("div",{children:"TITLE"}),M.jsx("div",{children:"PROVENANCE"}),M.jsx("div",{children:"REWARD"}),M.jsx("div",{style:{textAlign:"right"},children:"PIN"})]}),M.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:Ue.map((ot,wt)=>{const k=D?.id===ot.id||et===wt;return M.jsxs("div",{onClick:()=>{Y(wt),N(ot)},className:`instrument-row ${k?"active":""}`,style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:ot.id,children:ot.id}),M.jsx("div",{children:M.jsx("span",{className:"badge-tag",style:{background:ot.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:ot.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:ot.kind==="error_trap"?"TRAP":ot.kind.toUpperCase()})}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",fontSize:"11.5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:ot.module,children:ot.module}),M.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:ot.title,children:ot.title}),M.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[ot.provenance_hash?M.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},children:["🔒 prov_",ot.provenance_hash.slice(0,6)]}):M.jsx("span",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"legacy"}),M.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:["@",ot.agent_id||"default"]})]}),M.jsxs("div",{style:{fontFamily:"var(--font-mono)",color:"var(--accent)",fontSize:"11.5px"},children:[ot.reward_score.toFixed(2),"x"]}),M.jsx("div",{style:{textAlign:"right"},children:M.jsx("button",{onClick:_e=>{_e.stopPropagation(),oe(ot.id,ot.pinned)},className:"btn",style:{padding:"2px 6px",fontSize:"10px"},title:ot.pinned?"Unpin":"Pin",children:M.jsx(P_,{size:11,color:ot.pinned?"#8b5cf6":"var(--text-muted)"})})})]},ot.id)})})]})]}),i==="traps"&&M.jsxs("div",{children:[M.jsxs("div",{style:{padding:"10px 14px",background:"var(--trap-weak)",border:"1px solid rgba(217, 119, 6, 0.3)",borderRadius:"6px",color:"var(--trap)",fontSize:"12px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"},children:[M.jsx(O_,{size:15}),M.jsxs("span",{children:["Error traps receive an automatic ",M.jsx("b",{children:"2.0x recall boost"})," to proactively prevent AI agents from repeating known bugs."]})]}),M.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[M.jsx("div",{children:"TRAP ID"}),M.jsx("div",{children:"MODULE"}),M.jsx("div",{children:"WARNING HEADLINE"}),M.jsx("div",{children:"LINKED FILES"}),M.jsx("div",{style:{textAlign:"right"},children:"RECALL BOOST"})]}),M.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:sn.map(ot=>M.jsxs("div",{onClick:()=>N(ot),className:"instrument-row",style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[M.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--trap)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:ot.id,children:ot.id}),M.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:ot.module,children:ot.module}),M.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:ot.title,children:ot.title}),M.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},title:ot.linked_files&&ot.linked_files.length>0?ot.linked_files.join(", "):"project-wide",children:ot.linked_files&&ot.linked_files.length>0?ot.linked_files.join(", "):"project-wide"}),M.jsx("div",{style:{textAlign:"right",fontFamily:"var(--font-mono)",color:"var(--trap)",fontWeight:600},children:"2.0x BOOST"})]},ot.id))})]})]}),i==="dag"&&M.jsx(Rb,{actions:_,edges:x,onSelectAction:ot=>O(ot),onSeed:te}),i==="treemap"&&M.jsx(Cb,{memories:p,onSelectMemory:ot=>N(ot)}),i==="rrf"&&M.jsx(wb,{memories:p}),i==="conflicts"&&M.jsxs("div",{children:[M.jsx("div",{style:{marginBottom:"12px",color:"var(--text-muted)",fontSize:"12px"},children:"Contradictions detected between active memories. Use 1-click resolution with optimistic 6-second rollback window."}),T.length===0?M.jsx("div",{className:"card-panel",style:{padding:"36px",textAlign:"center",color:"var(--success)"},children:"✨ Zero open contradictions detected. Knowledge base is 100% consistent!"}):T.map(ot=>M.jsx(Db,{conflict:ot,memoryA:p.find(wt=>wt.id===ot.memory_a_id),memoryB:p.find(wt=>wt.id===ot.memory_b_id),onResolve:pe},ot.id))]})]})}),I&&M.jsxs("div",{className:"floating-alert",children:[M.jsx("span",{children:I}),M.jsx("button",{onClick:()=>X(null),style:{background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)"},children:"✕"})]}),M.jsx(Ub,{memory:D,onClose:()=>N(null),onTogglePin:oe,onForget:Zt}),w&&M.jsx("div",{onClick:()=>O(null),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:M.jsxs("div",{onClick:ot=>ot.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"540px",padding:"20px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[M.jsxs("div",{children:[M.jsxs("span",{style:{fontSize:"11px",color:"var(--accent)",fontFamily:"var(--font-mono)"},children:["[",w.id,"] • P",w.priority]}),M.jsx("h3",{style:{fontSize:"15px",fontWeight:600,marginTop:"4px"},children:w.title})]}),M.jsx("button",{onClick:()=>O(null),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),M.jsx("div",{style:{marginTop:"14px",fontSize:"12.5px",lineHeight:"1.5",color:"var(--text-muted)"},children:w.description||"No detailed task description provided."}),M.jsxs("div",{style:{marginTop:"18px",borderTop:"1px solid var(--border)",paddingTop:"10px",display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:"var(--text-muted)"},children:[M.jsxs("span",{children:["Status: ",M.jsx("b",{style:{textTransform:"capitalize"},children:w.status})]}),M.jsxs("span",{children:["Assignee: ",M.jsx("b",{children:w.assigned_to||"Unassigned (Open)"})]})]})]})}),A&&M.jsx("div",{onClick:()=>P(!1),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:M.jsxs("form",{onSubmit:ne,onClick:ot=>ot.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"520px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px"},children:[M.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[M.jsx("h3",{style:{fontSize:"15px",fontWeight:600},children:"Record Memory / Error Trap"}),M.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Title"}),M.jsx("input",{type:"text",required:!0,value:Q,onChange:ot=>B(ot.target.value),placeholder:"e.g. Always Use BigEndian for Binary Protocol",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Rule Content"}),M.jsx("textarea",{required:!0,rows:4,value:F,onChange:ot=>Z(ot.target.value),placeholder:"Explain the pattern, gotcha, or fix in detail...",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",resize:"vertical"}})]}),M.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"},children:[M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Module"}),M.jsx("input",{type:"text",value:G,onChange:ot=>at(ot.target.value),placeholder:"e.g. auth, api, db",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Type"}),M.jsxs("select",{value:rt,onChange:ot=>Rt(ot.target.value),style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"},children:[M.jsx("option",{value:"rule",children:"Rule (Verified)"}),M.jsx("option",{value:"error_trap",children:"Error Trap [2.0x Boost]"})]})]})]}),M.jsxs("div",{children:[M.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Linked Files (comma separated)"}),M.jsx("input",{type:"text",value:Et,onChange:ot=>ae(ot.target.value),placeholder:"src/auth.ts, src/server.ts",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),M.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"6px"},children:[M.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",children:"Cancel"}),M.jsx("button",{type:"submit",className:"btn btn-primary",children:"Save Memory"})]})]})}),M.jsx(Ab,{pendingAction:ce,countdown:he,onUndo:vt})]})};bb.createRoot(document.getElementById("root")).render(M.jsx(pb.StrictMode,{children:M.jsx(_w,{})}));
