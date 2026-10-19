import{r as eb,g as nb,a as wt,R as Qp,S as xv,P as O_,b as P_,Z as ib,c as ab,C as ip,d as sb,L as vv,T as rb,A as ob,e as ap,f as lb,N as cb,h as Uu,i as I_,j as ub,k as fb,l as db,X as hb,m as pb,n as mb,M as gb,o as xb,p as vb}from"./lucide-kupuKQYy.js";import{r as _b}from"./react-BtN6GaCc.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const f of l)if(f.type==="childList")for(const d of f.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const f={};return l.integrity&&(f.integrity=l.integrity),l.referrerPolicy&&(f.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?f.credentials="include":l.crossOrigin==="anonymous"?f.credentials="omit":f.credentials="same-origin",f}function s(l){if(l.ep)return;l.ep=!0;const f=i(l);fetch(l.href,f)}})();var _h={exports:{}},sl={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _v;function yb(){if(_v)return sl;_v=1;var o=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,f){var d=null;if(f!==void 0&&(d=""+f),l.key!==void 0&&(d=""+l.key),"key"in l){f={};for(var h in l)h!=="key"&&(f[h]=l[h])}else f=l;return l=f.ref,{$$typeof:o,type:s,key:d,ref:l!==void 0?l:null,props:f}}return sl.Fragment=e,sl.jsx=i,sl.jsxs=i,sl}var yv;function Sb(){return yv||(yv=1,_h.exports=yb()),_h.exports}var S=Sb(),yh={exports:{}},rl={},Sh={exports:{}},Mh={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sv;function Mb(){return Sv||(Sv=1,(function(o){function e(F,X){var st=F.length;F.push(X);t:for(;0<st;){var Y=st-1>>>1,H=F[Y];if(0<l(H,X))F[Y]=X,F[st]=H,st=Y;else break t}}function i(F){return F.length===0?null:F[0]}function s(F){if(F.length===0)return null;var X=F[0],st=F.pop();if(st!==X){F[0]=st;t:for(var Y=0,H=F.length,J=H>>>1;Y<J;){var Tt=2*(Y+1)-1,bt=F[Tt],Zt=Tt+1,Rt=F[Zt];if(0>l(bt,st))Zt<H&&0>l(Rt,bt)?(F[Y]=Rt,F[Zt]=st,Y=Zt):(F[Y]=bt,F[Tt]=st,Y=Tt);else if(Zt<H&&0>l(Rt,st))F[Y]=Rt,F[Zt]=st,Y=Zt;else break t}}return X}function l(F,X){var st=F.sortIndex-X.sortIndex;return st!==0?st:F.id-X.id}if(o.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var f=performance;o.unstable_now=function(){return f.now()}}else{var d=Date,h=d.now();o.unstable_now=function(){return d.now()-h}}var p=[],m=[],v=1,M=null,x=3,b=!1,T=!1,L=!1,y=!1,_=typeof setTimeout=="function"?setTimeout:null,N=typeof clearTimeout=="function"?clearTimeout:null,V=typeof setImmediate<"u"?setImmediate:null;function D(F){for(var X=i(m);X!==null;){if(X.callback===null)s(m);else if(X.startTime<=F)s(m),X.sortIndex=X.expirationTime,e(p,X);else break;X=i(m)}}function U(F){if(L=!1,D(F),!T)if(i(p)!==null)T=!0,w||(w=!0,Q());else{var X=i(m);X!==null&&it(U,X.startTime-F)}}var w=!1,O=-1,A=5,P=-1;function z(){return y?!0:!(o.unstable_now()-P<A)}function k(){if(y=!1,w){var F=o.unstable_now();P=F;var X=!0;try{t:{T=!1,L&&(L=!1,N(O),O=-1),b=!0;var st=x;try{e:{for(D(F),M=i(p);M!==null&&!(M.expirationTime>F&&z());){var Y=M.callback;if(typeof Y=="function"){M.callback=null,x=M.priorityLevel;var H=Y(M.expirationTime<=F);if(F=o.unstable_now(),typeof H=="function"){M.callback=H,D(F),X=!0;break e}M===i(p)&&s(p),D(F)}else s(p);M=i(p)}if(M!==null)X=!0;else{var J=i(m);J!==null&&it(U,J.startTime-F),X=!1}}break t}finally{M=null,x=st,b=!1}X=void 0}}finally{X?Q():w=!1}}}var Q;if(typeof V=="function")Q=function(){V(k)};else if(typeof MessageChannel<"u"){var ct=new MessageChannel,q=ct.port2;ct.port1.onmessage=k,Q=function(){q.postMessage(null)}}else Q=function(){_(k,0)};function it(F,X){O=_(function(){F(o.unstable_now())},X)}o.unstable_IdlePriority=5,o.unstable_ImmediatePriority=1,o.unstable_LowPriority=4,o.unstable_NormalPriority=3,o.unstable_Profiling=null,o.unstable_UserBlockingPriority=2,o.unstable_cancelCallback=function(F){F.callback=null},o.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<F?Math.floor(1e3/F):5},o.unstable_getCurrentPriorityLevel=function(){return x},o.unstable_next=function(F){switch(x){case 1:case 2:case 3:var X=3;break;default:X=x}var st=x;x=X;try{return F()}finally{x=st}},o.unstable_requestPaint=function(){y=!0},o.unstable_runWithPriority=function(F,X){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var st=x;x=F;try{return X()}finally{x=st}},o.unstable_scheduleCallback=function(F,X,st){var Y=o.unstable_now();switch(typeof st=="object"&&st!==null?(st=st.delay,st=typeof st=="number"&&0<st?Y+st:Y):st=Y,F){case 1:var H=-1;break;case 2:H=250;break;case 5:H=1073741823;break;case 4:H=1e4;break;default:H=5e3}return H=st+H,F={id:v++,callback:X,priorityLevel:F,startTime:st,expirationTime:H,sortIndex:-1},st>Y?(F.sortIndex=st,e(m,F),i(p)===null&&F===i(m)&&(L?(N(O),O=-1):L=!0,it(U,st-Y))):(F.sortIndex=H,e(p,F),T||b||(T=!0,w||(w=!0,Q()))),F},o.unstable_shouldYield=z,o.unstable_wrapCallback=function(F){var X=x;return function(){var st=x;x=X;try{return F.apply(this,arguments)}finally{x=st}}}})(Mh)),Mh}var Mv;function bb(){return Mv||(Mv=1,Sh.exports=Mb()),Sh.exports}/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bv;function Eb(){if(bv)return rl;bv=1;var o=bb(),e=eb(),i=_b();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function f(t){for(var n=t,a=n;a&&!a.alternate;)n=a,(n.flags&4098)!==0&&(t=n.return),a=n.return;for(;n.return;)n=n.return;return n.tag===3?t:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(f(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=f(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,r=n;;){var c=a.return;if(c===null)break;var u=c.alternate;if(u===null){if(r=c.return,r!==null){a=r;continue}break}if(c.child===u.child){for(u=c.child;u;){if(u===a)return p(c),t;if(u===r)return p(c),n;u=u.sibling}throw Error(s(188))}if(a.return!==r.return)a=c,r=u;else{for(var g=!1,C=c.child;C;){if(C===a){g=!0,a=c,r=u;break}if(C===r){g=!0,r=c,a=u;break}C=C.sibling}if(!g){for(C=u.child;C;){if(C===a){g=!0,a=u,r=c;break}if(C===r){g=!0,r=u,a=c;break}C=C.sibling}if(!g)throw Error(s(189))}}if(a.alternate!==r)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function v(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=v(t),n!==null)return n;t=t.sibling}return null}function M(t,n,a,r,c,u){for(;t!==null;){if((t.tag===5||t.tag===27||t.tag===6)&&a(t,r,c,u)||(t.tag!==22||t.memoizedState===null)&&(n||t.tag!==5&&t.tag!==27)&&M(t.child,n,a,r,c,u))return!0;t=t.sibling}return!1}function x(t){for(t=t.return;t!==null;){if(t.tag===3||t.tag===5||t.tag===27)return t;t=t.return}return null}function b(t){var n=!1;for(t=t.return;t!==null&&(t.tag===4&&(n=!0),!(t.tag===3||t.tag===5||t.tag===27));)t=t.return;return n}function T(t){var n=[null,null],a=x(t);return a===null||L(n,t,a.child,{foundSelf:!1}),n}function L(t,n,a,r){for(;a!==null;){if(a===n)r.foundSelf=!0;else if(a.tag===5||a.tag===27||a.tag===6){if(r.foundSelf)return t[1]=a,!0;t[0]=a}else if((a.tag!==22||a.memoizedState===null)&&L(t,n,a.child,r))return!0;a=a.sibling}return!1}function y(t){switch(t.tag){case 5:case 27:case 6:return t.stateNode;case 3:return t.stateNode.containerInfo;default:throw Error(s(559))}}var _=null,N=null;function V(t,n,a){return t===a?!0:t===n?(_=t,!0):!1}function D(t,n,a){return t===a?(N=t,!1):t===n?(N!==null&&(_=t),!0):!1}function U(t){if(t===null)return null;do t=t===null?null:t.return;while(t&&t.tag!==5&&t.tag!==27&&t.tag!==3);return t||null}function w(t,n,a){for(var r=0,c=t;c;c=a(c))r++;c=0;for(var u=n;u;u=a(u))c++;for(;0<r-c;)t=a(t),r--;for(;0<c-r;)n=a(n),c--;for(;r--;){if(t===n||n!==null&&t===n.alternate)return t;t=a(t),n=a(n)}return null}var O=Object.assign,A=Symbol.for("react.element"),P=Symbol.for("react.transitional.element"),z=Symbol.for("react.portal"),k=Symbol.for("react.fragment"),Q=Symbol.for("react.strict_mode"),ct=Symbol.for("react.profiler"),q=Symbol.for("react.consumer"),it=Symbol.for("react.context"),F=Symbol.for("react.forward_ref"),X=Symbol.for("react.suspense"),st=Symbol.for("react.suspense_list"),Y=Symbol.for("react.memo"),H=Symbol.for("react.lazy"),J=Symbol.for("react.activity"),Tt=Symbol.for("react.legacy_hidden"),bt=Symbol.for("react.memo_cache_sentinel"),Zt=Symbol.for("react.view_transition"),Rt=Symbol.for("react.recoverable"),Xt=Symbol.iterator;function rt(t){return t===null||typeof t!="object"?null:(t=Xt&&t[Xt]||t["@@iterator"],typeof t=="function"?t:null)}var mt=Symbol.for("react.client.reference");function At(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===mt?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case k:return"Fragment";case ct:return"Profiler";case Q:return"StrictMode";case X:return"Suspense";case st:return"SuspenseList";case J:return"Activity";case Zt:return"ViewTransition"}if(typeof t=="object")switch(t.$$typeof){case z:return"Portal";case it:return t.displayName||"Context";case q:return(t._context.displayName||"Context")+".Consumer";case F:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Y:return n=t.displayName||null,n!==null?n:At(t.type)||"Memo";case H:n=t._payload,t=t._init;try{return At(t(n))}catch{}}return null}var Wt=Array.isArray,gt=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Nt=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ue={pending:!1,data:null,method:null,action:null},pe=[],le=-1;function xe(t){return{current:t}}function $t(t){0>le||(t.current=pe[le],pe[le]=null,le--)}function ae(t,n){le++,pe[le]=t.current,t.current=n}var ue=xe(null),Ge=xe(null),at=xe(null),Ct=xe(null);function G(t,n){switch(ae(at,n),ae(Ge,t),ae(ue,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?Ax(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=Ax(n),t=Rx(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}$t(ue),ae(ue,t)}function me(){$t(ue),$t(Ge),$t(at)}function se(t){var n=t.memoizedState;n!==null&&(Fr._currentValue=n.memoizedState,ae(Ct,t)),n=ue.current;var a=Rx(n,t.type);n!==a&&(ae(Ge,t),ae(ue,a))}function I(t){Ge.current===t&&($t(ue),$t(Ge)),Ct.current===t&&($t(Ct),Fr._currentValue=Ue)}var E,et;function lt(t){if(E===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);E=n&&n[1]||"",et=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+E+t+et}var xt=!1;function Dt(t,n){if(!t||xt)return"";xt=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(n){var yt=function(){throw Error()};if(Object.defineProperty(yt.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(yt,[])}catch(zt){var K=zt}Reflect.construct(t,[],yt)}else{try{yt.call()}catch(zt){K=zt}yt=!1;try{var dt=Object.getOwnPropertyDescriptor(t.prototype,"props");Object.defineProperty(t.prototype,"props",{configurable:!0,set:function(){throw Error()}}),yt=!0,new t}finally{yt&&(dt!==void 0?Object.defineProperty(t.prototype,"props",dt):delete t.prototype.props)}}}else{try{throw Error()}catch(zt){K=zt}(yt=t())&&typeof yt.catch=="function"&&yt.catch(function(){})}}catch(zt){if(zt&&K&&typeof zt.stack=="string")return[zt.stack,K.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var c=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,"name");c&&c.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var u=r.DetermineComponentFrameRoot(),g=u[0],C=u[1];if(g&&C){var B=g.split(`
`),tt=C.split(`
`);for(c=r=0;r<B.length&&!B[r].includes("DetermineComponentFrameRoot");)r++;for(;c<tt.length&&!tt[c].includes("DetermineComponentFrameRoot");)c++;if(r===B.length||c===tt.length)for(r=B.length-1,c=tt.length-1;1<=r&&0<=c&&B[r]!==tt[c];)c--;for(;1<=r&&0<=c;r--,c--)if(B[r]!==tt[c]){if(r!==1||c!==1)do if(r--,c--,0>c||B[r]!==tt[c]){var ht=`
`+B[r].replace(" at new "," at ");return t.displayName&&ht.includes("<anonymous>")&&(ht=ht.replace("<anonymous>",t.displayName)),ht}while(1<=r&&0<=c);break}}}finally{xt=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?lt(a):""}function Ot(t,n){switch(t.tag){case 26:case 27:case 5:return lt(t.type);case 16:return lt("Lazy");case 13:return t.child!==n&&n!==null?lt("Suspense Fallback"):lt("Suspense");case 19:return lt("SuspenseList");case 0:case 15:return Dt(t.type,!1);case 11:return Dt(t.type.render,!1);case 1:return Dt(t.type,!0);case 31:return lt("Activity");case 30:return lt("ViewTransition");default:return""}}function vt(t){try{var n="",a=null;do n+=Ot(t,a),a=t,t=t.return;while(t);return n}catch(r){return`
Error generating stack: `+r.message+`
`+r.stack}}var Mt=Object.prototype.hasOwnProperty,Lt=o.unstable_scheduleCallback,ie=o.unstable_cancelCallback,Ft=o.unstable_shouldYield,Bt=o.unstable_requestPaint,qt=o.unstable_now,oe=o.unstable_getCurrentPriorityLevel,ge=o.unstable_ImmediatePriority,Z=o.unstable_UserBlockingPriority,Ut=o.unstable_NormalPriority,St=o.unstable_LowPriority,Pt=o.unstable_IdlePriority,jt=o.log,Et=o.unstable_setDisableYieldValue,ne=null,kt=null;function Ie(t){if(typeof jt=="function"&&Et(t),kt&&typeof kt.setStrictMode=="function")try{kt.setStrictMode(ne,t)}catch{}}var ve=Math.clz32?Math.clz32:qu,ei=Math.log,gi=Math.LN2;function qu(t){return t>>>=0,t===0?32:31-(ei(t)/gi|0)|0}var er=256,Ss=262144,Ba=4194304;function ha(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&-t;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function Ms(t,n,a){var r=t.pendingLanes;if(r===0)return 0;var c=0,u=t.suspendedLanes,g=t.pingedLanes;t=t.warmLanes;var C=r&134217727;return C!==0?(r=C&~u,r!==0?c=ha(r):(g&=C,g!==0?c=ha(g):a||(a=C&~t,a!==0&&(c=ha(a))))):(C=r&~u,C!==0?c=ha(C):g!==0?c=ha(g):a||(a=r&~t,a!==0&&(c=ha(a)))),c===0?0:n!==0&&n!==c&&(n&u)===0&&(u=c&-c,a=n&-n,u>=a||u===32&&(a&4194048)!==0)?n:c}function Fa(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function ki(t,n){(n&8)!==0&&(n|=n&32);var a=t.entangledLanes;if(a!==0)for(t=t.entanglements,a&=n;0<a;){var r=31-ve(a),c=1<<r;n|=t[r],a&=~c}return n}function uo(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fo(){var t=Ba;return Ba<<=1,(Ba&62914560)===0&&(Ba=4194304),t}function nr(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Xi(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function wl(t,n,a,r,c,u){var g=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var C=t.entanglements,B=t.expirationTimes,tt=t.hiddenUpdates;for(a=g&~a;0<a;){var ht=31-ve(a),yt=1<<ht;C[ht]=0,B[ht]=-1;var K=tt[ht];if(K!==null)for(tt[ht]=null,ht=0;ht<K.length;ht++){var dt=K[ht];dt!==null&&(dt.lane&=-536870913)}a&=~yt}r!==0&&bs(t,r,0),u!==0&&c===0&&t.tag!==0&&(t.suspendedLanes|=u&~(g&~n))}function bs(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var r=31-ve(n);t.entangledLanes|=n,t.entanglements[r]=t.entanglements[r]|1073741824|a&261930}function ho(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var r=31-ve(a),c=1<<r;c&n|t[r]&n&&(t[r]|=n),a&=~c}}function po(t,n){var a=n&-n;return a=(a&42)!==0?1:mo(a),(a&(t.suspendedLanes|n))!==0?0:a}function mo(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function go(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function Dl(){var t=Nt.p;return t!==0?t:(t=window.event,t===void 0?32:uv(t.type))}function Nl(t,n){var a=Nt.p;try{return Nt.p=t,n()}finally{Nt.p=a}}var xi=Math.random().toString(36).slice(2),R="__reactFiber$"+xi,W="__reactProps$"+xi,pt="__reactContainer$"+xi,ut="__reactEvents$"+xi,ft="__reactListeners$"+xi,Ht="__reactHandles$"+xi,Yt="__reactResources$"+xi,It="__reactMarker$"+xi,Jt="__reactLoad$"+xi;function te(t){delete t[R],delete t[W],delete t[ft],delete t[Ht]}function fe(t){var n;if(n=t[R])return n;for(var a=t.parentNode;a;){if(n=a[pt]||a[R]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=Xx(t);t!==null;){if(a=t[R])return a;t=Xx(t)}return n}t=a,a=t.parentNode}return null}function _e(t){if(t=t[R]||t[pt]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Kt(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function Ce(t){var n=t[Yt];return n||(n=t[Yt]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function Ee(t){t[It]=!0}function Qe(t){t[Jt]=void 0}var Xe=new Set,vn={};function Gt(t,n){ln(t,n),ln(t+"Capture",n)}function ln(t,n){for(vn[t]=n,t=0;t<n.length;t++)Xe.add(n[t])}var ze=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Hn={},ni={};function Wi(t){return Mt.call(ni,t)?!0:Mt.call(Hn,t)?!1:ze.test(t)?ni[t]=!0:(Hn[t]=!0,!1)}var Te=!1;function Ve(){var t=Te;return Te=!1,t}function tn(t,n,a){if(Wi(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var r=n.toLowerCase().slice(0,5);if(r!=="data-"&&r!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,a)}}function ii(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,a)}}function Le(t,n,a,r){if(r===null)t.removeAttribute(a);else{switch(typeof r){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,r)}}function cn(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pa(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function Ul(t,n,a){var r=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var c=r.get,u=r.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return c.call(this)},set:function(g){a=""+g,u.call(this,g)}}),Object.defineProperty(t,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(g){a=""+g},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Yu(t){if(!t._valueTracker){var n=pa(t)?"checked":"value";t._valueTracker=Ul(t,n,""+t[n])}}function pm(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),r="";return t&&(r=pa(t)?t.checked?"true":"false":t.value),t=r,t!==a?(n.setValue(t),!0):!1}var My=/[\n"\\]/g;function vi(t){return t.replace(My,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Zu(t,n,a,r,c,u,g,C){t.name="",g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"?t.type=g:t.removeAttribute("type"),n!=null?g==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+cn(n)):t.value!==""+cn(n)&&(t.value=""+cn(n)):g!=="submit"&&g!=="reset"||t.removeAttribute("value"),n!=null?g==="number"&&t.value==n?Ku(t,cn(t.value)):Ku(t,cn(n)):a!=null?Ku(t,cn(a)):r!=null&&t.removeAttribute("value"),c==null&&u!=null&&(t.defaultChecked=!!u),c!=null&&(t.checked=c&&typeof c!="function"&&typeof c!="symbol"),C!=null&&typeof C!="function"&&typeof C!="symbol"&&typeof C!="boolean"?t.name=""+cn(C):t.removeAttribute("name")}function mm(t,n,a,r,c,u,g,C){if(u!=null&&typeof u!="function"&&typeof u!="symbol"&&typeof u!="boolean"&&(t.type=u),n!=null||a!=null){if(!(u!=="submit"&&u!=="reset"||n!=null)){Yu(t);return}a=a!=null?""+cn(a):"",n=n!=null?""+cn(n):a,C||n===t.value||(t.value=n),t.defaultValue=n}r=r??c,r=typeof r!="function"&&typeof r!="symbol"&&!!r,t.checked=C?t.checked:!!r,t.defaultChecked=!!r,g!=null&&typeof g!="function"&&typeof g!="symbol"&&typeof g!="boolean"&&(t.name=g),Yu(t)}function Ku(t,n){t.defaultValue!==""+n&&(t.defaultValue=""+n)}function ir(t,n,a,r){if(t=t.options,n){n={};for(var c=0;c<a.length;c++)n["$"+a[c]]=!0;for(a=0;a<t.length;a++)c=n.hasOwnProperty("$"+t[a].value),t[a].selected!==c&&(t[a].selected=c),c&&r&&(t[a].defaultSelected=!0)}else{for(a=""+cn(a),n=null,c=0;c<t.length;c++){if(t[c].value===a){t[c].selected=!0,r&&(t[c].defaultSelected=!0);return}n!==null||t[c].disabled||(n=t[c])}n!==null&&(n.selected=!0)}}function gm(t,n,a){if(n!=null&&(n=""+cn(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+cn(a):""}function xm(t,n,a,r){if(n==null){if(r!=null){if(a!=null)throw Error(s(92));if(Wt(r)){if(1<r.length)throw Error(s(93));r=r[0]}a=r}a==null&&(a=""),n=a}a=cn(n),t.defaultValue=a,r=t.textContent,r===a&&r!==""&&r!==null&&(t.value=r),Yu(t)}function ar(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var by=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function vm(t,n,a){var r=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?r?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":r?t.setProperty(n,a):typeof a!="number"||a===0||by.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function _m(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var r in a)!a.hasOwnProperty(r)||n!=null&&n.hasOwnProperty(r)||(r.indexOf("--")===0?t.setProperty(r,""):r==="float"?t.cssFloat="":t[r]="",Te=!0);for(var c in n)r=n[c],n.hasOwnProperty(c)&&a[c]!==r&&(vm(t,c,r),Te=!0)}else for(var u in n)n.hasOwnProperty(u)&&vm(t,u,n[u])}function Qu(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ey=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["maskType","mask-type"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),Ty=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Ll(t){return Ty.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ji(){}var Ju=null;function $u(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var sr=null,rr=null;function ym(t){var n=_e(t);if(n&&(t=n.stateNode)){var a=t[W]||null;t:switch(t=n.stateNode,n.type){case"input":if(Zu(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+vi(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var r=a[n];if(r!==t&&r.form===t.form){var c=r[W]||null;if(!c)throw Error(s(90));Zu(r,c.value,c.defaultValue,c.defaultValue,c.checked,c.defaultChecked,c.type,c.name)}}for(n=0;n<a.length;n++)r=a[n],r.form===t.form&&pm(r)}break t;case"textarea":gm(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&ir(t,!!a.multiple,n,!1)}}}var tf=!1;function Sm(t,n,a){if(tf)return t(n,a);tf=!0;try{var r=t(n);return r}finally{if(tf=!1,(sr!==null||rr!==null)&&(Lc(),sr&&(n=sr,t=rr,rr=sr=null,ym(n),t)))for(n=0;n<t.length;n++)ym(t[n])}}function xo(t,n){var a=t.stateNode;if(a===null)return null;var r=a[W]||null;if(r===null)return null;a=r[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var ma=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ef=!1;if(ma)try{var vo={};Object.defineProperty(vo,"passive",{get:function(){ef=!0}}),window.addEventListener("test",vo,vo),window.removeEventListener("test",vo,vo)}catch{ef=!1}var Ha=null,nf=null,Ol=null;function Mm(){if(Ol)return Ol;var t,n=nf,a=n.length,r,c="value"in Ha?Ha.value:Ha.textContent,u=c.length;for(t=0;t<a&&n[t]===c[t];t++);var g=a-t;for(r=1;r<=g&&n[a-r]===c[u-r];r++);return Ol=c.slice(t,1<r?1-r:void 0)}function Pl(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function Il(){return!0}function bm(){return!1}function Gn(t){function n(a,r,c,u,g){this._reactName=a,this._targetInst=c,this.type=r,this.nativeEvent=u,this.target=g,this.currentTarget=null;for(var C in t)t.hasOwnProperty(C)&&(a=t[C],this[C]=a?a(u):u[C]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Il:bm,this.isPropagationStopped=bm,this}return O(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=Il)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=Il)},persist:function(){},isPersistent:Il}),n}var Ga={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},zl=Gn(Ga),_o=O({},Ga,{view:0,detail:0}),Ay=Gn(_o),af,sf,yo,Bl=O({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:of,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==yo&&(yo&&t.type==="mousemove"?(af=t.screenX-yo.screenX,sf=t.screenY-yo.screenY):sf=af=0,yo=t),af)},movementY:function(t){return"movementY"in t?t.movementY:sf}}),Em=Gn(Bl),Ry=O({},Bl,{dataTransfer:0}),Cy=Gn(Ry),wy=O({},_o,{relatedTarget:0}),rf=Gn(wy),Dy=O({},Ga,{animationName:0,elapsedTime:0,pseudoElement:0}),Ny=Gn(Dy),Uy=O({},Ga,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Ly=Gn(Uy),Oy=O({},Ga,{data:0}),Tm=Gn(Oy),Py={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Iy={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},zy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function By(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=zy[t])?!!n[t]:!1}function of(){return By}var Fy=O({},_o,{key:function(t){if(t.key){var n=Py[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=Pl(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Iy[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:of,charCode:function(t){return t.type==="keypress"?Pl(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Pl(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Hy=Gn(Fy),Gy=O({},Bl,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Am=Gn(Gy),Vy=O({},Ga,{submitter:0}),ky=Gn(Vy),Xy=O({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:of}),Wy=Gn(Xy),jy=O({},Ga,{propertyName:0,elapsedTime:0,pseudoElement:0}),qy=Gn(jy),Yy=O({},Bl,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Zy=Gn(Yy),Ky=O({},Ga,{newState:0,oldState:0,source:0}),Qy=Gn(Ky),Jy=[9,13,27,32],lf=ma&&"CompositionEvent"in window,So=null;ma&&"documentMode"in document&&(So=document.documentMode);var $y=ma&&"TextEvent"in window&&!So,Rm=ma&&(!lf||So&&8<So&&11>=So),Cm=" ",wm=!1;function Dm(t,n){switch(t){case"keyup":return Jy.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Nm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var or=!1;function tS(t,n){switch(t){case"compositionend":return Nm(n);case"keypress":return n.which!==32?null:(wm=!0,Cm);case"textInput":return t=n.data,t===Cm&&wm?null:t;default:return null}}function eS(t,n){if(or)return t==="compositionend"||!lf&&Dm(t,n)?(t=Mm(),Ol=nf=Ha=null,or=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return Rm&&n.locale!=="ko"?null:n.data;default:return null}}var nS={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Um(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!nS[t.type]:n==="textarea"}function Lm(t,n,a,r){sr?rr?rr.push(r):rr=[r]:sr=r,n=Fc(n,"onChange"),0<n.length&&(a=new zl("onChange","change",null,a,r),t.push({event:a,listeners:n}))}var Mo=null,bo=null;function iS(t){yx(t,0)}function Fl(t){var n=Kt(t);if(pm(n))return t}function Om(t,n){if(t==="change")return n}var Pm=!1;if(ma){var cf;if(ma){var uf="oninput"in document;if(!uf){var Im=document.createElement("div");Im.setAttribute("oninput","return;"),uf=typeof Im.oninput=="function"}cf=uf}else cf=!1;Pm=cf&&(!document.documentMode||9<document.documentMode)}function zm(){Mo&&(Mo.detachEvent("onpropertychange",Bm),bo=Mo=null)}function Bm(t){if(t.propertyName==="value"&&Fl(bo)){var n=[];Lm(n,bo,t,$u(t)),Sm(iS,n)}}function aS(t,n,a){t==="focusin"?(zm(),Mo=n,bo=a,Mo.attachEvent("onpropertychange",Bm)):t==="focusout"&&zm()}function sS(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Fl(bo)}function rS(t,n){if(t==="click")return Fl(n)}function oS(t,n){if(t==="input"||t==="change")return Fl(n)}function lS(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var ai=typeof Object.is=="function"?Object.is:lS;function Eo(t,n){if(ai(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),r=Object.keys(n);if(a.length!==r.length)return!1;for(r=0;r<a.length;r++){var c=a[r];if(!Mt.call(n,c)||!ai(t[c],n[c]))return!1}return!0}function ff(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Fm(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Hm(t,n){var a=Fm(t);t=0;for(var r;a;){if(a.nodeType===3){if(r=t+a.textContent.length,t<=n&&r>=n)return{node:a,offset:n-t};t=r}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=Fm(a)}}function Gm(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Gm(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Vm(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=ff(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=ff(t.document)}return n}function df(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var cS=ma&&"documentMode"in document&&11>=document.documentMode,lr=null,hf=null,To=null,pf=!1;function km(t,n,a){var r=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;pf||lr==null||lr!==ff(r)||(r=lr,"selectionStart"in r&&df(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),To&&Eo(To,r)||(To=r,r=Fc(hf,"onSelect"),0<r.length&&(n=new zl("onSelect","select",null,n,a),t.push({event:n,listeners:r}),n.target=lr)))}function Es(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var cr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},mf={},Xm={};ma&&(Xm=document.createElement("div").style,"AnimationEvent"in window||(delete cr.animationend.animation,delete cr.animationiteration.animation,delete cr.animationstart.animation),"TransitionEvent"in window||delete cr.transitionend.transition);function Ts(t){if(mf[t])return mf[t];if(!cr[t])return t;var n=cr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Xm)return mf[t]=n[a];return t}var Wm=Ts("animationend"),jm=Ts("animationiteration"),qm=Ts("animationstart"),uS=Ts("transitionrun"),fS=Ts("transitionstart"),dS=Ts("transitioncancel"),Ym=Ts("transitionend"),Zm=new Map,gf="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");gf.push("scrollEnd");function Di(t,n){Zm.set(t,n),Gt(n,[t])}var hS=0;function ga(t,n){if(t.name!=null&&t.name!=="auto")return t.name;if(n.autoName!==null)return n.autoName;t=Oi.identifierPrefix;var a=hS++;return t="_"+t+"t_"+a.toString(32)+"_",n.autoName=t}function Km(t){if(t==null||typeof t=="string")return t;var n=null,a=wr;if(a!==null)for(var r=0;r<a.length;r++){var c=t[a[r]];if(c!=null){if(c==="none")return"none";n=n==null?c:n+(" "+c)}}return n??t.default}function xa(t,n){return t=Km(t),n=Km(n),n==null?t==="auto"?null:t:n==="auto"?null:n}var Hl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},_i=[],ur=0,xf=0;function Gl(){for(var t=ur,n=xf=ur=0;n<t;){var a=_i[n];_i[n++]=null;var r=_i[n];_i[n++]=null;var c=_i[n];_i[n++]=null;var u=_i[n];if(_i[n++]=null,r!==null&&c!==null){var g=r.pending;g===null?c.next=c:(c.next=g.next,g.next=c),r.pending=c}u!==0&&Qm(a,c,u)}}function Vl(t,n,a,r){_i[ur++]=t,_i[ur++]=n,_i[ur++]=a,_i[ur++]=r,xf|=r,t.lanes|=r,t=t.alternate,t!==null&&(t.lanes|=r)}function vf(t,n,a,r){return Vl(t,n,a,r),kl(t)}function As(t,n){return Vl(t,null,null,n),kl(t)}function Qm(t,n,a){t.lanes|=a;var r=t.alternate;r!==null&&(r.lanes|=a);for(var c=!1,u=t.return;u!==null;)u.childLanes|=a,r=u.alternate,r!==null&&(r.childLanes|=a),u.tag===22&&(t=u.stateNode,t===null||t._visibility&1||(c=!0)),t=u,u=u.return;return t.tag===3?(u=t.stateNode,c&&n!==null&&(c=31-ve(a),t=u.hiddenUpdates,r=t[c],r===null?t[c]=[n]:r.push(n),n.lane=a|536870912),u):null}function kl(t){if(50<qo)throw qo=0,Uc=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var fr={};function pS(t,n,a,r){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Yn(t,n,a,r){return new pS(t,n,a,r)}function _f(t){return t=t.prototype,!(!t||!t.isReactComponent)}function va(t,n){var a=t.alternate;return a===null?(a=Yn(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&1206910976,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Jm(t,n){t.flags&=1206910978;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Xl(t,n,a,r,c,u){var g=0;if(r=t,typeof r=="function")_f(r)&&(g=1);else if(typeof r=="string")g=VM(t,a,ue.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(r){case J:return t=Yn(31,a,n,c),t.elementType=J,t.lanes=u,t;case k:return Rs(a.children,c,u,n);case Q:g=8,c|=24;break;case ct:return t=Yn(12,a,n,c|2),t.elementType=ct,t.lanes=u,t;case X:return t=Yn(13,a,n,c),t.elementType=X,t.lanes=u,t;case st:return t=Yn(19,a,n,c),t.elementType=st,t.lanes=u,t;case Tt:case Zt:return t=c|32,t=Yn(30,a,n,t),t.elementType=Zt,t.lanes=u,t.stateNode={autoName:null,paired:null,clones:null,ref:null},t;default:if(typeof r=="object"&&r!==null)switch(r.$$typeof){case it:g=10;break t;case q:g=9;break t;case F:g=11;break t;case Y:g=14;break t;case H:g=16,r=null;break t}g=29,a=Error(s(130,t===null?"null":typeof t,"")),r=null}return n=Yn(g,a,n,c),n.elementType=t,n.type=r,n.lanes=u,n}function Rs(t,n,a,r){return t=Yn(7,t,r,n),t.lanes=a,t}function yf(t,n,a){return t=Yn(6,t,null,n),t.lanes=a,t}function $m(t){var n=Yn(18,null,null,0);return n.stateNode=t,n}function Sf(t,n,a){return n=Yn(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var tg=new WeakMap;function yi(t,n){if(typeof t=="object"&&t!==null){var a=tg.get(t);return a!==void 0?a:(n={value:t,source:n,stack:vt(n)},tg.set(t,n),n)}return{value:t,source:n,stack:vt(n)}}var dr=[],hr=0,Wl=null,Ao=0,Si=[],Mi=0,Va=null,qi=1,Yi="";function _a(t,n){dr[hr++]=Ao,dr[hr++]=Wl,Wl=t,Ao=n}function eg(t,n,a){Si[Mi++]=qi,Si[Mi++]=Yi,Si[Mi++]=Va,Va=t;var r=qi;t=Yi;var c=32-ve(r)-1;r&=~(1<<c),a+=1;var u=32-ve(n)+c;if(30<u){var g=c-c%5;u=(r&(1<<g)-1).toString(32),r>>=g,c-=g,qi=1<<32-ve(n)+c|a<<c|r,Yi=u+t}else qi=1<<u|a<<c|r,Yi=t}function jl(t){t.return!==null&&(_a(t,1),eg(t,1,0))}function Mf(t){for(;t===Wl;)Wl=dr[--hr],dr[hr]=null,Ao=dr[--hr],dr[hr]=null;for(;t===Va;)Va=Si[--Mi],Si[Mi]=null,Yi=Si[--Mi],Si[Mi]=null,qi=Si[--Mi],Si[Mi]=null}function ng(t,n){Si[Mi++]=qi,Si[Mi++]=Yi,Si[Mi++]=Va,qi=n.id,Yi=n.overflow,Va=t}var En=null,en=null,Ae=!1,ka=null,bi=!1,bf=Error(s(519));function Xa(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ro(yi(n,t)),bf}function ig(t){var n=t.stateNode,a=t.type,r=t.memoizedProps;switch(n[R]=t,n[W]=r,a){case"dialog":De("cancel",n),De("close",n);break;case"iframe":case"object":case"embed":De("load",n);break;case"video":case"audio":for(a=0;a<Zo.length;a++)De(Zo[a],n);break;case"source":De("error",n);break;case"img":case"image":case"link":De("error",n),De("load",n);break;case"details":De("toggle",n);break;case"input":De("invalid",n),mm(n,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case"select":De("invalid",n);break;case"textarea":De("invalid",n),xm(n,r.value,r.defaultValue,r.children)}a=r.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||r.suppressHydrationWarning===!0||Ex(n.textContent,a)?(r.popover!=null&&(De("beforetoggle",n),De("toggle",n)),r.onScroll!=null&&De("scroll",n),r.onScrollEnd!=null&&De("scrollend",n),r.onClick!=null&&(n.onclick=ji),n=!0):n=!1,n||Xa(t,!0)}function ql(t){for(En=t.return;En;)switch(En.tag){case 5:case 31:case 13:bi=!1;return;case 27:case 3:bi=!0;return;default:En=En.return}}function pr(t){if(t!==En)return!1;if(!Ae)return ql(t),Ae=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||$d(t.type,t.memoizedProps)),a=!a),a&&en&&Xa(t),ql(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));en=kx(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));en=kx(t)}else n===27?(n=en,rs(t.type)?(t=lh,lh=null,en=t):en=n):en=En?Ti(t.stateNode.nextSibling):null;return!0}function Cs(){en=En=null,Ae=!1}function Ef(){var t=ka;return t!==null&&(Qn===null?Qn=t:Qn.push.apply(Qn,t),ka=null),t}function Ro(t){ka===null?ka=[t]:ka.push(t)}var Tf=xe(null),ws=null,ya=null;function Wa(t,n,a){ae(Tf,n._currentValue),n._currentValue=a}function Sa(t){t._currentValue=Tf.current,$t(Tf)}function Yl(t,n,a){for(;t!==null;){var r=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,r!==null&&(r.childLanes|=n)):r!==null&&(r.childLanes&n)!==n&&(r.childLanes|=n),t===a)break;t=t.return}}function Af(t,n,a,r){var c=t.child;for(c!==null&&(c.return=t);c!==null;){var u=c.dependencies;if(u!==null){var g=c.child;u=u.firstContext;t:for(;u!==null;){var C=u;u=c;for(var B=0;B<n.length;B++)if(C.context===n[B]){u.lanes|=a,C=u.alternate,C!==null&&(C.lanes|=a),Yl(u.return,a,t),r||(g=null);break t}u=C.next}}else if(c.tag===18){if(g=c.return,g===null)throw Error(s(341));g.lanes|=a,u=g.alternate,u!==null&&(u.lanes|=a),Yl(g,a,t),g=null}else c.tag===13&&c.memoizedState!==null&&c.memoizedState.dehydrated===null?(c.lanes|=a,g=c.alternate,g!==null&&(g.lanes|=a),Yl(c.return,a,t),g=c.child,g=g!==null?g.sibling:null):g=c.child;if(g!==null)g.return=c;else for(g=c;g!==null;){if(g===t){g=null;break}if(c=g.sibling,c!==null){c.return=g.return,g=c;break}g=g.return}c=g}}function Ds(t,n,a,r){t=null;for(var c=n,u=!1;c!==null;){if(!u){if((c.flags&524288)!==0)u=!0;else if((c.flags&262144)!==0)break}if(c.tag===10){var g=c.alternate;if(g===null)throw Error(s(387));if(g=g.memoizedProps,g!==null){var C=c.type;ai(c.pendingProps.value,g.value)||(t!==null?t.push(C):t=[C])}}else if(c===Ct.current){if(g=c.alternate,g===null)throw Error(s(387));g.memoizedState.memoizedState!==c.memoizedState.memoizedState&&(t!==null?t.push(Fr):t=[Fr])}c=c.return}return t!==null&&Af(n,t,a,r),n.flags|=262144,t!==null}function Zl(t){for(t=t.firstContext;t!==null;){if(!ai(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ns(t){ws=t,ya=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function wn(t){return ag(ws,t)}function Kl(t,n){return ws===null&&Ns(t),ag(t,n)}function ag(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},ya===null){if(t===null)throw Error(s(308));ya=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else ya=ya.next=n;return a}var mS=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,r){t.push(r)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},gS=o.unstable_scheduleCallback,xS=o.unstable_NormalPriority,hn={$$typeof:it,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Rf(){return{controller:new mS,data:new Map,refCount:0}}function Co(t){t.refCount--,t.refCount===0&&gS(xS,function(){t.controller.abort()})}function sg(t,n){if((t.pendingLanes&4194048)!==0){var a=t.transitionTypes;for(a===null&&(a=t.transitionTypes=[]),t=0;t<n.length;t++){var r=n[t];a.indexOf(r)===-1&&a.push(r)}}}var wo=null;function vS(t){var n=t.transitionTypes;return t.transitionTypes=null,n}var Do=null,Cf=0,Us=0,mr=null;function _S(t,n){if(Do===null){var a=Do=[];Cf=0,Us=Xd(),mr={status:"pending",value:void 0,then:function(r){a.push(r)}}}return Cf++,n.then(rg,rg),n}function rg(){if(--Cf===0&&(wo=null,Do!==null)){mr!==null&&(mr.status="fulfilled");var t=Do;Do=null,Us=0,mr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function yS(t,n){var a=[],r={status:"pending",value:null,reason:null,then:function(c){a.push(c)}};return t.then(function(){r.status="fulfilled",r.value=n;for(var c=0;c<a.length;c++)(0,a[c])(n)},function(c){for(r.status="rejected",r.reason=c,c=0;c<a.length;c++)(0,a[c])(void 0)}),r}var og=gt.S;gt.S=function(t,n){if($0=qt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&_S(t,n),wo!==null)for(var a=Lr;a!==null;)sg(a,wo),a=a.next;if(a=t.types,a!==null){for(var r=Lr;r!==null;)sg(r,a),r=r.next;if(Us!==0){r=wo,r===null&&(r=wo=[]);for(var c=0;c<a.length;c++){var u=a[c];r.indexOf(u)===-1&&r.push(u)}}}og!==null&&og(t,n)};var Ls=xe(null);function wf(){var t=Ls.current;return t!==null?t:$e.pooledCache}function Ql(t,n){n===null?ae(Ls,Ls.current):ae(Ls,n.pool)}function lg(){var t=wf();return t===null?null:{parent:hn._currentValue,pool:t}}var gr=Error(s(460)),Df=Error(s(474)),Jl=Error(s(542)),$l={then:function(){}};function cg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ug(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(ji,ji),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,dg(t),t===void 0&&!("reason"in n)?Error(s(600)):t;default:if(typeof n.status=="string")n.then(ji,ji);else{if(t=$e,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(r){if(n.status==="pending"){var c=n;c.status="fulfilled",c.value=r}},function(r){if(n.status==="pending"){var c=n;c.status="rejected",c.reason=r}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,dg(t),t}throw Ps=n,gr}}function Os(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Ps=a,gr):a}}var Ps=null;function fg(){if(Ps===null)throw Error(s(459));var t=Ps;return Ps=null,t}function dg(t){if(t===gr||t===Jl)throw Error(s(483))}var xr=null,No=0;function tc(t){var n=No;return No+=1,xr===null&&(xr=[]),ug(xr,t,n)}function ja(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function ec(t,n){throw n.$$typeof===A?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function hg(t){function n($,j){if(t){var ot=$.deletions;ot===null?($.deletions=[j],$.flags|=16):ot.push(j)}}function a($,j){if(!t)return null;for(;j!==null;)n($,j),j=j.sibling;return null}function r($){for(var j=new Map;$!==null;)$.key===null?j.set($.index,$):j.set($.key,$),$=$.sibling;return j}function c($,j){return $=va($,j),$.index=0,$.sibling=null,$}function u($,j,ot){return $.index=ot,t?(ot=$.alternate,ot!==null?(ot=ot.index,ot<j?($.flags|=2,j):ot):($.flags|=134217730,j)):($.flags|=1048576,j)}function g($){return t&&$.alternate===null&&($.flags|=134217730),$}function C($,j,ot,_t){return j===null||j.tag!==6?(j=yf(ot,$.mode,_t),j.return=$,j):(j=c(j,ot),j.return=$,j)}function B($,j,ot,_t){var Qt=ot.type;return Qt===k?($=ht($,j,ot.props.children,_t,ot.key),ja($,ot),$):j!==null&&(j.elementType===Qt||typeof Qt=="object"&&Qt!==null&&Qt.$$typeof===H&&Os(Qt)===j.type)?(j=c(j,ot.props),ja(j,ot),j.return=$,j):(j=Xl(ot.type,ot.key,ot.props,null,$.mode,_t),ja(j,ot),j.return=$,j)}function tt($,j,ot,_t){return j===null||j.tag!==4||j.stateNode.containerInfo!==ot.containerInfo||j.stateNode.implementation!==ot.implementation?(j=Sf(ot,$.mode,_t),j.return=$,j):(j=c(j,ot.children||[]),j.return=$,j)}function ht($,j,ot,_t,Qt){return j===null||j.tag!==7?(j=Rs(ot,$.mode,_t,Qt),j.return=$,j):(j=c(j,ot),j.return=$,j)}function yt($,j,ot){if(typeof j=="string"&&j!==""||typeof j=="number"||typeof j=="bigint")return j=yf(""+j,$.mode,ot),j.return=$,j;if(typeof j=="object"&&j!==null){switch(j.$$typeof){case P:return ot=Xl(j.type,j.key,j.props,null,$.mode,ot),ja(ot,j),ot.return=$,ot;case z:return j=Sf(j,$.mode,ot),j.return=$,j;case H:return j=Os(j),yt($,j,ot)}if(Wt(j)||rt(j))return j=Rs(j,$.mode,ot,null),j.return=$,j;if(typeof j.then=="function")return yt($,tc(j),ot);if(j.$$typeof===it)return yt($,Kl($,j),ot);ec($,j)}return null}function K($,j,ot,_t){var Qt=j!==null?j.key:null;if(typeof ot=="string"&&ot!==""||typeof ot=="number"||typeof ot=="bigint")return Qt!==null?null:C($,j,""+ot,_t);if(typeof ot=="object"&&ot!==null){switch(ot.$$typeof){case P:return ot.key===Qt?B($,j,ot,_t):null;case z:return ot.key===Qt?tt($,j,ot,_t):null;case H:return ot=Os(ot),K($,j,ot,_t)}if(Wt(ot)||rt(ot))return Qt!==null?null:ht($,j,ot,_t,null);if(typeof ot.then=="function")return K($,j,tc(ot),_t);if(ot.$$typeof===it)return K($,j,Kl($,ot),_t);ec($,ot)}return null}function dt($,j,ot,_t,Qt){if(typeof _t=="string"&&_t!==""||typeof _t=="number"||typeof _t=="bigint")return $=$.get(ot)||null,C(j,$,""+_t,Qt);if(typeof _t=="object"&&_t!==null){switch(_t.$$typeof){case P:return $=$.get(_t.key===null?ot:_t.key)||null,B(j,$,_t,Qt);case z:return $=$.get(_t.key===null?ot:_t.key)||null,tt(j,$,_t,Qt);case H:return _t=Os(_t),dt($,j,ot,_t,Qt)}if(Wt(_t)||rt(_t))return $=$.get(ot)||null,ht(j,$,_t,Qt,null);if(typeof _t.then=="function")return dt($,j,ot,tc(_t),Qt);if(_t.$$typeof===it)return dt($,j,ot,Kl(j,_t),Qt);ec(j,_t)}return null}function zt($,j,ot,_t){for(var Qt=null,Pe=null,re=j,ce=j=0,gn=null;re!==null&&ce<ot.length;ce++){re.index>ce?(gn=re,re=null):gn=re.sibling;var Fe=K($,re,ot[ce],_t);if(Fe===null){re===null&&(re=gn);break}t&&re&&Fe.alternate===null&&n($,re),j=u(Fe,j,ce),Pe===null?Qt=Fe:Pe.sibling=Fe,Pe=Fe,re=gn}if(ce===ot.length)return a($,re),Ae&&_a($,ce),Qt;if(re===null){for(;ce<ot.length;ce++)re=yt($,ot[ce],_t),re!==null&&(j=u(re,j,ce),Pe===null?Qt=re:Pe.sibling=re,Pe=re);return Ae&&_a($,ce),Qt}for(re=r(re);ce<ot.length;ce++)gn=dt(re,$,ce,ot[ce],_t),gn!==null&&(t&&(Fe=gn.alternate,Fe!==null&&re.delete(Fe.key===null?ce:Fe.key)),j=u(gn,j,ce),Pe===null?Qt=gn:Pe.sibling=gn,Pe=gn);return t&&re.forEach(function(fs){return n($,fs)}),Ae&&_a($,ce),Qt}function ee($,j,ot,_t){if(ot==null)throw Error(s(151));for(var Qt=null,Pe=null,re=j,ce=j=0,gn=null,Fe=ot.next();re!==null&&!Fe.done;ce++,Fe=ot.next()){re.index>ce?(gn=re,re=null):gn=re.sibling;var fs=K($,re,Fe.value,_t);if(fs===null){re===null&&(re=gn);break}t&&re&&fs.alternate===null&&n($,re),j=u(fs,j,ce),Pe===null?Qt=fs:Pe.sibling=fs,Pe=fs,re=gn}if(Fe.done)return a($,re),Ae&&_a($,ce),Qt;if(re===null){for(;!Fe.done;ce++,Fe=ot.next())Fe=yt($,Fe.value,_t),Fe!==null&&(j=u(Fe,j,ce),Pe===null?Qt=Fe:Pe.sibling=Fe,Pe=Fe);return Ae&&_a($,ce),Qt}for(re=r(re);!Fe.done;ce++,Fe=ot.next())Fe=dt(re,$,ce,Fe.value,_t),Fe!==null&&(t&&(gn=Fe.alternate,gn!==null&&re.delete(gn.key===null?ce:gn.key)),j=u(Fe,j,ce),Pe===null?Qt=Fe:Pe.sibling=Fe,Pe=Fe);return t&&re.forEach(function(tb){return n($,tb)}),Ae&&_a($,ce),Qt}function Me($,j,ot,_t){if(typeof ot=="object"&&ot!==null&&ot.type===k&&ot.key===null&&ot.props.ref===void 0&&(ot=ot.props.children),typeof ot=="object"&&ot!==null){switch(ot.$$typeof){case P:t:{for(var Qt=ot.key;j!==null;){if(j.key===Qt){if(Qt=ot.type,Qt===k){if(j.tag===7){a($,j.sibling),_t=c(j,ot.props.children),ja(_t,ot),_t.return=$,$=_t;break t}}else if(j.elementType===Qt||typeof Qt=="object"&&Qt!==null&&Qt.$$typeof===H&&Os(Qt)===j.type){a($,j.sibling),_t=c(j,ot.props),ja(_t,ot),_t.return=$,$=_t;break t}a($,j);break}else n($,j);j=j.sibling}ot.type===k?(_t=Rs(ot.props.children,$.mode,_t,ot.key),ja(_t,ot),_t.return=$,$=_t):(_t=Xl(ot.type,ot.key,ot.props,null,$.mode,_t),ja(_t,ot),_t.return=$,$=_t)}return g($);case z:t:{for(Qt=ot.key;j!==null;){if(j.key===Qt)if(j.tag===4&&j.stateNode.containerInfo===ot.containerInfo&&j.stateNode.implementation===ot.implementation){a($,j.sibling),_t=c(j,ot.children||[]),_t.return=$,$=_t;break t}else{a($,j);break}else n($,j);j=j.sibling}_t=Sf(ot,$.mode,_t),_t.return=$,$=_t}return g($);case H:return ot=Os(ot),Me($,j,ot,_t)}if(Wt(ot))return zt($,j,ot,_t);if(rt(ot)){if(Qt=rt(ot),typeof Qt!="function")throw Error(s(150));return ot=Qt.call(ot),ee($,j,ot,_t)}if(typeof ot.then=="function")return Me($,j,tc(ot),_t);if(ot.$$typeof===it)return Me($,j,Kl($,ot),_t);ec($,ot)}return typeof ot=="string"&&ot!==""||typeof ot=="number"||typeof ot=="bigint"?(ot=""+ot,j!==null&&j.tag===6?(a($,j.sibling),_t=c(j,ot),_t.return=$,$=_t):(a($,j),_t=yf(ot,$.mode,_t),_t.return=$,$=_t),g($)):a($,j)}return function($,j,ot,_t){try{No=0;var Qt=Me($,j,ot,_t);return xr=null,Qt}catch(re){if(re===gr||re===Jl)throw re;var Pe=Yn(29,re,null,$.mode);return Pe.lanes=_t,Pe.return=$,Pe}finally{}}}var Is=hg(!0),pg=hg(!1),qa=!1;function Nf(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function Uf(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function Ya(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function Za(t,n,a){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,(ke&2)!==0){var c=r.pending;return c===null?n.next=n:(n.next=c.next,c.next=n),r.pending=n,n=kl(t),Qm(t,null,a),n}return Vl(t,r,n,a),kl(t)}function Uo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}function Lf(t,n){var a=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,a===r)){var c=null,u=null;if(a=a.firstBaseUpdate,a!==null){do{var g={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};u===null?c=u=g:u=u.next=g,a=a.next}while(a!==null);u===null?c=u=n:u=u.next=n}else c=u=n;a={baseState:r.baseState,firstBaseUpdate:c,lastBaseUpdate:u,shared:r.shared,callbacks:r.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var Of=!1;function Lo(){if(Of){var t=mr;if(t!==null)throw t}}function Oo(t,n,a,r){Of=!1;var c=t.updateQueue;qa=!1;var u=c.firstBaseUpdate,g=c.lastBaseUpdate,C=c.shared.pending;if(C!==null){c.shared.pending=null;var B=C,tt=B.next;B.next=null,g===null?u=tt:g.next=tt,g=B;var ht=t.alternate;ht!==null&&(ht=ht.updateQueue,C=ht.lastBaseUpdate,C!==g&&(C===null?ht.firstBaseUpdate=tt:C.next=tt,ht.lastBaseUpdate=B))}if(u!==null){var yt=c.baseState;g=0,ht=tt=B=null,C=u;do{var K=C.lane&-536870913,dt=K!==C.lane;if(dt?(Oe&K)===K:(r&K)===K){K!==0&&K===Us&&(Of=!0),ht!==null&&(ht=ht.next={lane:0,tag:C.tag,payload:C.payload,callback:null,next:null});t:{var zt=t,ee=C;K=n;var Me=a;switch(ee.tag){case 1:if(zt=ee.payload,typeof zt=="function"){yt=zt.call(Me,yt,K);break t}yt=zt;break t;case 3:zt.flags=zt.flags&-65537|128;case 0:if(zt=ee.payload,K=typeof zt=="function"?zt.call(Me,yt,K):zt,K==null)break t;yt=O({},yt,K);break t;case 2:qa=!0}}K=C.callback,K!==null&&(t.flags|=64,dt&&(t.flags|=8192),dt=c.callbacks,dt===null?c.callbacks=[K]:dt.push(K))}else dt={lane:K,tag:C.tag,payload:C.payload,callback:C.callback,next:null},ht===null?(tt=ht=dt,B=yt):ht=ht.next=dt,g|=K;if(C=C.next,C===null){if(C=c.shared.pending,C===null)break;dt=C,C=dt.next,dt.next=null,c.lastBaseUpdate=dt,c.shared.pending=null}}while(!0);ht===null&&(B=yt),c.baseState=B,c.firstBaseUpdate=tt,c.lastBaseUpdate=ht,u===null&&(c.shared.lanes=0),ns|=g,t.lanes=g,t.memoizedState=yt}}function mg(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function gg(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)mg(a[t],n)}var Ka=xe(null),nc=xe(0);function xg(t,n){t=Aa,ae(nc,t),ae(Ka,n),Aa=t|n.baseLanes}function Pf(){ae(nc,Aa),ae(Ka,Ka.current)}function If(){Aa=nc.current,$t(Ka),$t(nc)}var Dn=xe(null),In=null;function Qa(t){var n=t.alternate;ae(Nn,Nn.current&1),ae(Dn,t),In===null&&(n===null||Ka.current!==null||n.memoizedState!==null)&&(In=t)}function zf(t){ae(Nn,Nn.current),ae(Dn,t),In===null&&(In=t)}function vg(t){t.tag===22?(ae(Nn,Nn.current),ae(Dn,t),In===null&&(In=t)):Ja()}function Ja(){ae(Nn,Nn.current),ae(Dn,Dn.current)}function si(t){$t(Dn),In===t&&(In=null),$t(Nn)}var Nn=xe(0);function Po(t,n){ae(Dn,Dn.current),ae(Nn,n)}function Bf(t){$t(Nn),$t(Dn),In===t&&(In=null)}function ic(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||rh(a)||oh(a)))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!=="independent"){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ma=0,Se=null,Je=null,pn=null,ac=!1,vr=!1,zs=!1,sc=0,Io=0,_r=null,SS=0;function un(){throw Error(s(321))}function Ff(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!ai(t[a],n[a]))return!1;return!0}function Hf(t,n,a,r,c,u){return Ma=u,Se=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,gt.H=t===null||t.memoizedState===null?e0:n0,zs=!1,u=a(r,c),zs=!1,vr&&(u=yg(n,a,r,c)),_g(t),u}function _g(t){gt.H=dc;var n=Je!==null&&Je.next!==null;if(Ma=0,pn=Je=Se=null,ac=!1,Io=0,_r=null,n)throw Error(s(300));t===null||mn||(t=t.dependencies,t!==null&&Zl(t)&&(mn=!0))}function yg(t,n,a,r){Se=t;var c=0;do{if(vr&&(_r=null),Io=0,vr=!1,25<=c)throw Error(s(301));if(c+=1,pn=Je=null,t.updateQueue!=null){var u=t.updateQueue;u.lastEffect=null,u.events=null,u.stores=null,u.memoCache!=null&&(u.memoCache.index=0)}gt.H=wS,u=n(a,r)}while(vr);return u}function MS(){var t=gt.H,n=t.useState()[0];return n=typeof n.then=="function"?zo(n):n,t=t.useState()[0],(Je!==null?Je.memoizedState:null)!==t&&(Se.flags|=1024),n}function Gf(){var t=sc!==0;return sc=0,t}function Vf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function kf(t){if(ac){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}ac=!1}Ma=0,pn=Je=Se=null,vr=!1,Io=sc=0,_r=null}function Vn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return pn===null?Se.memoizedState=pn=t:pn=pn.next=t,pn}function dn(){if(Je===null){var t=Se.alternate;t=t!==null?t.memoizedState:null}else t=Je.next;var n=pn===null?Se.memoizedState:pn.next;if(n!==null)pn=n,Je=t;else{if(t===null)throw Se.alternate===null?Error(s(467)):Error(s(310));Je=t,t={memoizedState:Je.memoizedState,baseState:Je.baseState,baseQueue:Je.baseQueue,queue:Je.queue,next:null},pn===null?Se.memoizedState=pn=t:pn=pn.next=t}return pn}function rc(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function zo(t){var n=Io;return Io+=1,_r===null&&(_r=[]),t=ug(_r,t,n),n=Se,(pn===null?n.memoizedState:pn.next)===null&&(n=n.alternate,gt.H=n===null||n.memoizedState===null?e0:n0),t}function oc(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return zo(t);if(t.$$typeof===Rt)return;if(t.$$typeof===it)return wn(t)}throw Error(s(438,String(t)))}function Xf(t){var n=null,a=Se.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var r=Se.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(n={data:r.data.map(function(c){return c.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=rc(),Se.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),r=0;r<t;r++)a[r]=bt;return n.index++,a}function ba(t,n){return typeof n=="function"?n(t):n}function lc(t){var n=dn();return Wf(n,Je,t)}function Wf(t,n,a){var r=t.queue;if(r===null)throw Error(s(311));r.lastRenderedReducer=a;var c=t.baseQueue,u=r.pending;if(u!==null){if(c!==null){var g=c.next;c.next=u.next,u.next=g}n.baseQueue=c=u,r.pending=null}if(u=t.baseState,c===null)t.memoizedState=u;else{n=c.next;var C=g=null,B=null,tt=n,ht=!1;do{var yt=tt.lane&-536870913;if(yt!==tt.lane?(Oe&yt)===yt:(Ma&yt)===yt){var K=tt.revertLane;if(K===0)B!==null&&(B=B.next={lane:0,revertLane:0,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null}),yt===Us&&(ht=!0);else if((Ma&K)===K){tt=tt.next,K===Us&&(ht=!0);continue}else yt={lane:0,revertLane:tt.revertLane,gesture:null,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(C=B=yt,g=u):B=B.next=yt,Se.lanes|=K,ns|=K;yt=tt.action,zs&&a(u,yt),u=tt.hasEagerState?tt.eagerState:a(u,yt)}else K={lane:yt,revertLane:tt.revertLane,gesture:tt.gesture,action:tt.action,hasEagerState:tt.hasEagerState,eagerState:tt.eagerState,next:null},B===null?(C=B=K,g=u):B=B.next=K,Se.lanes|=yt,ns|=yt;tt=tt.next}while(tt!==null&&tt!==n);if(B===null?g=u:B.next=C,!ai(u,t.memoizedState)&&(mn=!0,ht&&(a=mr,a!==null)))throw a;t.memoizedState=u,t.baseState=g,t.baseQueue=B,r.lastRenderedState=u}return c===null&&(r.lanes=0),[t.memoizedState,r.dispatch]}function jf(t){var n=dn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var r=a.dispatch,c=a.pending,u=n.memoizedState;if(c!==null){a.pending=null;var g=c=c.next;do u=t(u,g.action),g=g.next;while(g!==c);ai(u,n.memoizedState)||(mn=!0),n.memoizedState=u,n.baseQueue===null&&(n.baseState=u),a.lastRenderedState=u}return[u,r]}function Sg(t,n,a){var r=Se,c=dn(),u=Ae;if(u){if(a===void 0)throw Error(s(407));a=a()}else a=n();var g=!ai((Je||c).memoizedState,a);if(g&&(c.memoizedState=a,mn=!0),c=c.queue,Zf(Eg.bind(null,r,c,t),[t]),t=c.getSnapshot!==n||g||pn!==null&&(pn.memoizedState.tag&1)!==0,yr(t?9:8,{destroy:void 0},bg.bind(null,r,c,a,n),null),t){if(r.flags|=2048,$e===null)throw Error(s(349));u||(Ma&127)!==0||Mg(r,n,a)}return a}function Mg(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=Se.updateQueue,n===null?(n=rc(),Se.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function bg(t,n,a,r){n.value=a,n.getSnapshot=r,Tg(n)&&Ag(t)}function Eg(t,n,a){return a(function(){Tg(n)&&Ag(t)})}function Tg(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!ai(t,a)}catch{return!0}}function Ag(t){var n=As(t,2);n!==null&&Jn(n,t,2)}function qf(t){var n=Vn();if(typeof t=="function"){var a=t;if(t=a(),zs){Ie(!0);try{a()}finally{Ie(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:t},n}function Rg(t,n,a,r){return t.baseState=a,Wf(t,Je,typeof r=="function"?r:ba)}function bS(t,n,a,r,c){if(fc(t))throw Error(s(485));if(t=n.action,t!==null){var u={payload:c,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(g){u.listeners.push(g)}};gt.T!==null?a(!0):u.isTransition=!1,r(u),a=n.pending,a===null?(u.next=n.pending=u,Cg(n,u)):(u.next=a.next,n.pending=a.next=u)}}function Cg(t,n){var a=n.action,r=n.payload,c=t.state;if(n.isTransition){var u=gt.T,g={};g.types=u!==null?u.types:null,gt.T=g;try{var C=a(c,r),B=gt.S;B!==null&&B(g,C),wg(t,n,C)}catch(tt){Yf(t,n,tt)}finally{u!==null&&g.types!==null&&(u.types=g.types),gt.T=u}}else try{u=a(c,r),wg(t,n,u)}catch(tt){Yf(t,n,tt)}}function wg(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(r){Dg(t,n,r)},function(r){return Yf(t,n,r)}):Dg(t,n,a)}function Dg(t,n,a){n.status="fulfilled",n.value=a,Ng(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,Cg(t,a)))}function Yf(t,n,a){var r=t.pending;if(t.pending=null,r!==null){r=r.next;do n.status="rejected",n.reason=a,Ng(n),n=n.next;while(n!==r)}t.action=null}function Ng(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Ug(t,n){return n}function Lg(t,n){if(Ae){var a=$e.formState;if(a!==null){t:{var r=Se;if(Ae){if(en){e:{for(var c=en,u=bi;c.nodeType!==8;){if(!u){c=null;break e}if(c=Ti(c.nextSibling),c===null){c=null;break e}}u=c.data,c=u==="F!"||u==="F"?c:null}if(c){en=Ti(c.nextSibling),r=c.data==="F!";break t}}Xa(r)}r=!1}r&&(n=a[0])}}return a=Vn(),a.memoizedState=a.baseState=n,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ug,lastRenderedState:n},a.queue=r,a=Jg.bind(null,Se,r),r.dispatch=a,r=qf(!1),u=td.bind(null,Se,!1,r.queue),r=Vn(),c={state:n,dispatch:null,action:t,pending:null},r.queue=c,a=bS.bind(null,Se,c,u,a),c.dispatch=a,r.memoizedState=t,[n,a,!1]}function Og(t){var n=dn();return Pg(n,Je,t)}function Pg(t,n,a){if(n=Wf(t,n,Ug)[0],t=lc(ba)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var r=zo(n)}catch(g){throw g===gr?Jl:g}else r=n;n=dn();var c=n.queue,u=c.dispatch;return a!==n.memoizedState&&(Se.flags|=2048,yr(9,{destroy:void 0},ES.bind(null,c,a),null)),[r,u,t]}function ES(t,n){t.action=n}function Ig(t){var n=dn(),a=Je;if(a!==null)return Pg(n,a,t);dn(),n=n.memoizedState,a=dn();var r=a.queue.dispatch;return a.memoizedState=t,[n,r,!1]}function yr(t,n,a,r){return t={tag:t,create:a,deps:r,inst:n,next:null},n=Se.updateQueue,n===null&&(n=rc(),Se.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(r=a.next,a.next=t,t.next=r,n.lastEffect=t),t}function zg(){return dn().memoizedState}function cc(t,n,a,r){var c=Vn();Se.flags|=t,c.memoizedState=yr(1|n,{destroy:void 0},a,r===void 0?null:r)}function uc(t,n,a,r){var c=dn();r=r===void 0?null:r;var u=c.memoizedState.inst;Je!==null&&r!==null&&Ff(r,Je.memoizedState.deps)?c.memoizedState=yr(n,u,a,r):(Se.flags|=t,c.memoizedState=yr(1|n,u,a,r))}function Bg(t,n){cc(8390656,8,t,n)}function Zf(t,n){uc(2048,8,t,n)}function TS(t){Se.flags|=4;var n=Se.updateQueue;if(n===null)n=rc(),Se.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Fg(t){var n=dn().memoizedState;return TS({ref:n,nextImpl:t}),function(){if((ke&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function Hg(t,n){return uc(4,2,t,n)}function Gg(t,n){return uc(4,4,t,n)}function Vg(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function kg(t,n,a){a=a!=null?a.concat([t]):null,uc(4,4,Vg.bind(null,n,t),a)}function Kf(){}function Xg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;return n!==null&&Ff(n,r[1])?r[0]:(a.memoizedState=[t,n],t)}function Wg(t,n){var a=dn();n=n===void 0?null:n;var r=a.memoizedState;if(n!==null&&Ff(n,r[1]))return r[0];if(r=t(),zs){Ie(!0);try{t()}finally{Ie(!1)}}return a.memoizedState=[r,n],r}function Qf(t,n,a){return a===void 0||(Ma&1073741824)!==0&&(Oe&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=ex(),Se.lanes|=t,ns|=t,a)}function jg(t,n,a,r){return ai(a,n)?a:Ka.current!==null?(t=Qf(t,a,r),ai(t,n)||(mn=!0),t):(Ma&106)===0||(Ma&1073741824)!==0&&(Oe&261930)===0?(mn=!0,t.memoizedState=a):(t=ex(),Se.lanes|=t,ns|=t,n)}function qg(t,n,a,r,c){var u=Nt.p;Nt.p=u!==0&&8>u?u:8;var g=gt.T,C={};C.types=g!==null?g.types:null,gt.T=C,td(t,!1,n,a);try{var B=c(),tt=gt.S;if(tt!==null&&tt(C,B),B!==null&&typeof B=="object"&&typeof B.then=="function"){var ht=yS(B,r);Bo(t,n,ht,ci(t))}else Bo(t,n,r,ci(t))}catch(yt){Bo(t,n,{then:function(){},status:"rejected",reason:yt},ci())}finally{Nt.p=u,g!==null&&C.types!==null&&(g.types=C.types),gt.T=g}}function AS(){}function Jf(t,n,a,r){if(t.tag!==5)throw Error(s(476));var c=Yg(t).queue;qg(t,c,n,Ue,a===null?AS:function(){return Zg(t),a(r)})}function Yg(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:Ue,baseState:Ue,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:Ue},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Zg(t){var n=Yg(t);n.next===null&&(n=t.alternate.memoizedState),Bo(t,n.next.queue,{},ci())}function $f(){return wn(Fr)}function Kg(){return dn().memoizedState}function Qg(){return dn().memoizedState}function RS(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=ci();t=Ya(a);var r=Za(n,t,a);r!==null&&(Jn(r,n,a),Uo(r,n,a)),n={cache:Rf()},t.payload=n;return}n=n.return}}function CS(t,n,a){var r=ci();a={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},fc(t)?$g(n,a):(a=vf(t,n,a,r),a!==null&&(Jn(a,t,r),t0(a,n,r)))}function Jg(t,n,a){var r=ci();Bo(t,n,a,r)}function Bo(t,n,a,r){var c={lane:r,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(fc(t))$g(n,c);else{var u=t.alternate;if(t.lanes===0&&(u===null||u.lanes===0)&&(u=n.lastRenderedReducer,u!==null))try{var g=n.lastRenderedState,C=u(g,a);if(c.hasEagerState=!0,c.eagerState=C,ai(C,g))return Vl(t,n,c,0),$e===null&&Gl(),!1}catch{}finally{}if(a=vf(t,n,c,r),a!==null)return Jn(a,t,r),t0(a,n,r),!0}return!1}function td(t,n,a,r){if(r={lane:2,revertLane:Xd(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},fc(t)){if(n)throw Error(s(479))}else n=vf(t,a,r,2),n!==null&&Jn(n,t,2)}function fc(t){var n=t.alternate;return t===Se||n!==null&&n===Se}function $g(t,n){vr=ac=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function t0(t,n,a){if((a&4194048)!==0){var r=n.lanes;r&=t.pendingLanes,a|=r,n.lanes=a,ho(t,a)}}var dc={readContext:wn,use:oc,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un,useEffectEvent:un},e0={readContext:wn,use:oc,useCallback:function(t,n){return Vn().memoizedState=[t,n===void 0?null:n],t},useContext:wn,useEffect:Bg,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,cc(4194308,4,Vg.bind(null,n,t),a)},useLayoutEffect:function(t,n){return cc(4194308,4,t,n)},useInsertionEffect:function(t,n){cc(4,2,t,n)},useMemo:function(t,n){var a=Vn();n=n===void 0?null:n;var r=t();if(zs){Ie(!0);try{t()}finally{Ie(!1)}}return a.memoizedState=[r,n],r},useReducer:function(t,n,a){var r=Vn();if(a!==void 0){var c=a(n);if(zs){Ie(!0);try{a(n)}finally{Ie(!1)}}}else c=n;return r.memoizedState=r.baseState=c,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:c},r.queue=t,t=t.dispatch=CS.bind(null,Se,t),[r.memoizedState,t]},useRef:function(t){var n=Vn();return t={current:t},n.memoizedState=t},useState:function(t){t=qf(t);var n=t.queue,a=Jg.bind(null,Se,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:Kf,useDeferredValue:function(t,n){var a=Vn();return Qf(a,t,n)},useTransition:function(){var t=qf(!1);return t=qg.bind(null,Se,t.queue,!0,!1),Vn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var r=Se,c=Vn();if(Ae){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),$e===null)throw Error(s(349));(Oe&127)!==0||Mg(r,n,a)}c.memoizedState=a;var u={value:a,getSnapshot:n};return c.queue=u,Bg(Eg.bind(null,r,u,t),[t]),r.flags|=2048,yr(9,{destroy:void 0},bg.bind(null,r,u,a,n),null),a},useId:function(){var t=Vn(),n=$e.identifierPrefix;if(Ae){var a=Yi,r=qi;a=(r&~(1<<32-ve(r)-1)).toString(32)+a,n="_"+n+"R_"+a,a=sc++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=SS++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:$f,useFormState:Lg,useActionState:Lg,useOptimistic:function(t){var n=Vn();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=td.bind(null,Se,!0,a),a.dispatch=n,[t,n]},useMemoCache:Xf,useCacheRefresh:function(){return Vn().memoizedState=RS.bind(null,Se)},useEffectEvent:function(t){var n=Vn(),a={impl:t};return n.memoizedState=a,function(){if((ke&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},n0={readContext:wn,use:oc,useCallback:Xg,useContext:wn,useEffect:Zf,useImperativeHandle:kg,useInsertionEffect:Hg,useLayoutEffect:Gg,useMemo:Wg,useReducer:lc,useRef:zg,useState:function(){return lc(ba)},useDebugValue:Kf,useDeferredValue:function(t,n){var a=dn();return jg(a,Je.memoizedState,t,n)},useTransition:function(){var t=lc(ba)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:Sg,useId:Kg,useHostTransitionStatus:$f,useFormState:Og,useActionState:Og,useOptimistic:function(t,n){var a=dn();return Rg(a,Je,t,n)},useMemoCache:Xf,useCacheRefresh:Qg,useEffectEvent:Fg},wS={readContext:wn,use:oc,useCallback:Xg,useContext:wn,useEffect:Zf,useImperativeHandle:kg,useInsertionEffect:Hg,useLayoutEffect:Gg,useMemo:Wg,useReducer:jf,useRef:zg,useState:function(){return jf(ba)},useDebugValue:Kf,useDeferredValue:function(t,n){var a=dn();return Je===null?Qf(a,t,n):jg(a,Je.memoizedState,t,n)},useTransition:function(){var t=jf(ba)[0],n=dn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:Sg,useId:Kg,useHostTransitionStatus:$f,useFormState:Ig,useActionState:Ig,useOptimistic:function(t,n){var a=dn();return Je!==null?Rg(a,Je,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:Xf,useCacheRefresh:Qg,useEffectEvent:Fg};function ed(t,n,a,r){n=t.memoizedState,a=a(r,n),a=a==null?n:O({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var nd={enqueueSetState:function(t,n,a){t=t._reactInternals;var r=ci(),c=Ya(r);c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Jn(n,t,r),Uo(n,t,r))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var r=ci(),c=Ya(r);c.tag=1,c.payload=n,a!=null&&(c.callback=a),n=Za(t,c,r),n!==null&&(Jn(n,t,r),Uo(n,t,r))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=ci(),r=Ya(a);r.tag=2,n!=null&&(r.callback=n),n=Za(t,r,a),n!==null&&(Jn(n,t,a),Uo(n,t,a))}};function i0(t,n,a,r,c,u,g){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,u,g):n.prototype&&n.prototype.isPureReactComponent?!Eo(a,r)||!Eo(c,u):!0}function a0(t,n,a,r){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,r),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,r),n.state!==t&&nd.enqueueReplaceState(n,n.state,null)}function Bs(t,n){var a=n;if("ref"in n){a={};for(var r in n)r!=="ref"&&(a[r]=n[r])}if(t=t.defaultProps){a===n&&(a=O({},a));for(var c in t)a[c]===void 0&&(a[c]=t[c])}return a}function s0(t){Hl(t)}function r0(t){console.error(t)}function o0(t){Hl(t)}function hc(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(r){setTimeout(function(){throw r})}}function l0(t,n,a){try{var r=t.onCaughtError;r(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(c){setTimeout(function(){throw c})}}function id(t,n,a){return a=Ya(a),a.tag=3,a.payload={element:null},a.callback=function(){hc(t,n)},a}function c0(t){return t=Ya(t),t.tag=3,t}function u0(t,n,a,r){var c=a.type.getDerivedStateFromError;if(typeof c=="function"){var u=r.value;t.payload=function(){return c(u)},t.callback=function(){l0(n,a,r)}}var g=a.stateNode;g!==null&&typeof g.componentDidCatch=="function"&&(t.callback=function(){l0(n,a,r),typeof c!="function"&&(is===null?is=new Set([this]):is.add(this));var C=r.stack;this.componentDidCatch(r.value,{componentStack:C!==null?C:""})})}function DS(t,n,a,r,c){if(a.flags|=32768,r!==null&&typeof r=="object"&&typeof r.then=="function"){if(n=a.alternate,n!==null&&Ds(n,a,c,!0),a=Dn.current,a!==null){switch(a.tag){case 31:case 13:case 19:return In===null?Oc():a.alternate===null&&fn===0&&(fn=3),a.flags&=-257,a.flags|=65536,a.lanes=c,r===$l?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([r]):n.add(r),Gd(t,r,c)),!1;case 22:return a.flags|=65536,r===$l?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([r])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([r]):a.add(r)),Gd(t,r,c)),!1}throw Error(s(435,a.tag))}return Gd(t,r,c),Oc(),!1}if(Ae)return n=Dn.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=c,r!==bf&&(t=Error(s(422),{cause:r}),Ro(yi(t,a)))):(r!==bf&&(n=Error(s(423),{cause:r}),Ro(yi(n,a))),t=t.current.alternate,t.flags|=65536,c&=-c,t.lanes|=c,r=yi(r,a),c=id(t.stateNode,r,c),Lf(t,c),fn!==4&&(fn=2)),!1;var u=Error(s(520),{cause:r});if(u=yi(u,a),jo===null?jo=[u]:jo.push(u),fn!==4&&(fn=2),n===null)return!0;r=yi(r,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=c&-c,a.lanes|=t,t=id(a.stateNode,r,t),Lf(a,t),!1;case 1:if(n=a.type,u=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||u!==null&&typeof u.componentDidCatch=="function"&&(is===null||!is.has(u))))return a.flags|=65536,c&=-c,a.lanes|=c,c=c0(c),u0(c,t,a,r),Lf(a,c),!1;break;case 22:if(a.memoizedState!==null)return a.flags|=65536,!1}a=a.return}while(a!==null);return!1}var ad=Error(s(461)),mn=!1;function _n(t,n,a,r){n.child=t===null?pg(n,null,a,r):Is(n,t.child,a,r)}function f0(t,n,a,r,c){a=a.render;var u=n.ref;if("ref"in r){var g={};for(var C in r)C!=="ref"&&(g[C]=r[C])}else g=r;return Ns(n),r=Hf(t,n,a,g,u,c),C=Gf(),t!==null&&!mn?(Vf(t,n,c),Ea(t,n,c)):(Ae&&C&&jl(n),n.flags|=1,_n(t,n,r,c),n.child)}function d0(t,n,a,r,c){if(t===null){var u=a.type;return typeof u=="function"&&!_f(u)&&u.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=u,h0(t,n,u,r,c)):(t=Xl(a.type,null,r,n,n.mode,c),t.ref=n.ref,t.return=n,n.child=t)}if(u=t.child,!dd(t,c)){var g=u.memoizedProps;if(a=a.compare,a=a!==null?a:Eo,a(g,r)&&t.ref===n.ref)return Ea(t,n,c)}return n.flags|=1,t=va(u,r),t.ref=n.ref,t.return=n,n.child=t}function h0(t,n,a,r,c){if(t!==null){var u=t.memoizedProps;if(Eo(u,r)&&t.ref===n.ref)if(mn=!1,n.pendingProps=r=u,dd(t,c))(t.flags&131072)!==0&&(mn=!0);else return n.lanes=t.lanes,Ea(t,n,c)}return sd(t,n,a,r,c)}function p0(t,n,a,r){var c=r.children,u=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode==="hidden"){if((n.flags&128)!==0){if(u=u!==null?u.baseLanes|a:a,t!==null){for(r=n.child=t.child,c=0;r!==null;)c=c|r.lanes|r.childLanes,r=r.sibling;r=c&~u}else r=0,n.child=null;return m0(t,n,u,a,r)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Ql(n,u!==null?u.cachePool:null),u!==null?xg(n,u):Pf(),vg(n);else return r=n.lanes=536870912,m0(t,n,u!==null?u.baseLanes|a:a,a,r)}else u!==null?(Ql(n,u.cachePool),xg(n,u),Ja(),n.memoizedState=null):(t!==null&&Ql(n,null),Pf(),Ja());return _n(t,n,c,a),n.child}function Fo(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function m0(t,n,a,r,c){var u=wf();return u=u===null?null:{parent:hn._currentValue,pool:u},n.memoizedState={baseLanes:a,cachePool:u},t!==null&&Ql(n,null),Pf(),vg(n),t!==null&&Ds(t,n,r,!0),n.childLanes=c,null}function pc(t,n){return n=mc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function g0(t,n,a){return Is(n,t.child,null,a),t=pc(n,n.pendingProps),t.flags|=2,si(n),n.memoizedState=null,t}function NS(t,n,a){var r=n.pendingProps,c=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(Ae){if(r.mode==="hidden")return t=pc(n,r),n.lanes=536870912,t.memoizedState={baseLanes:0,cachePool:null},Fo(null,t);if(zf(n),(t=en)?(t=Vx(t,bi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},a=$m(t),a.return=n,n.child=a,En=n,en=null)):t=null,t===null)throw Xa(n);return n.lanes=536870912,null}return pc(n,r)}var u=t.memoizedState;if(u!==null){var g=u.dehydrated;if(zf(n),c)if(n.flags&256)n.flags&=-257,n=g0(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(mn||Ds(t,n,a,!1),c=(a&t.childLanes)!==0,mn||c){if(Ka.current===null){if(r=$e,r!==null&&(g=po(r,a),g!==0&&g!==u.retryLane))throw u.retryLane=g,As(t,g),Jn(r,t,g),ad;Oc()}n=g0(t,n,a)}else t=u.treeContext,en=Ti(g.nextSibling),En=n,Ae=!0,ka=null,bi=!1,t!==null&&ng(n,t),n=pc(n,r),n.flags|=134221824;return n}return t=va(t.child,{mode:r.mode,children:r.children}),t.ref=n.ref,n.child=t,t.return=n,t}function Sr(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function sd(t,n,a,r,c){return Ns(n),a=Hf(t,n,a,r,void 0,c),r=Gf(),t!==null&&!mn?(Vf(t,n,c),Ea(t,n,c)):(Ae&&r&&jl(n),n.flags|=1,_n(t,n,a,c),n.child)}function x0(t,n,a,r,c,u){return Ns(n),n.updateQueue=null,a=yg(n,r,a,c),_g(t),r=Gf(),t!==null&&!mn?(Vf(t,n,u),Ea(t,n,u)):(Ae&&r&&jl(n),n.flags|=1,_n(t,n,a,u),n.child)}function v0(t,n,a,r,c){if(Ns(n),n.stateNode===null){var u=fr,g=a.contextType;typeof g=="object"&&g!==null&&(u=wn(g)),u=new a(r,u),n.memoizedState=u.state!==null&&u.state!==void 0?u.state:null,u.updater=nd,n.stateNode=u,u._reactInternals=n,u=n.stateNode,u.props=r,u.state=n.memoizedState,u.refs={},Nf(n),g=a.contextType,u.context=typeof g=="object"&&g!==null?wn(g):fr,u.state=n.memoizedState,g=a.getDerivedStateFromProps,typeof g=="function"&&(ed(n,a,g,r),u.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof u.getSnapshotBeforeUpdate=="function"||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(g=u.state,typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount(),g!==u.state&&nd.enqueueReplaceState(u,u.state,null),Oo(n,r,u,c),Lo(),u.state=n.memoizedState),typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!0}else if(t===null){u=n.stateNode;var C=n.memoizedProps,B=Bs(a,C);u.props=B;var tt=u.context,ht=a.contextType;g=fr,typeof ht=="object"&&ht!==null&&(g=wn(ht));var yt=a.getDerivedStateFromProps;ht=typeof yt=="function"||typeof u.getSnapshotBeforeUpdate=="function",C=n.pendingProps!==C,ht||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(C||tt!==g)&&a0(n,u,r,g),qa=!1;var K=n.memoizedState;u.state=K,Oo(n,r,u,c),Lo(),tt=n.memoizedState,C||K!==tt||qa?(typeof yt=="function"&&(ed(n,a,yt,r),tt=n.memoizedState),(B=qa||i0(n,a,B,r,K,tt,g))?(ht||typeof u.UNSAFE_componentWillMount!="function"&&typeof u.componentWillMount!="function"||(typeof u.componentWillMount=="function"&&u.componentWillMount(),typeof u.UNSAFE_componentWillMount=="function"&&u.UNSAFE_componentWillMount()),typeof u.componentDidMount=="function"&&(n.flags|=4194308)):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=r,n.memoizedState=tt),u.props=r,u.state=tt,u.context=g,r=B):(typeof u.componentDidMount=="function"&&(n.flags|=4194308),r=!1)}else{u=n.stateNode,Uf(t,n),g=n.memoizedProps,ht=Bs(a,g),u.props=ht,yt=n.pendingProps,K=u.context,tt=a.contextType,B=fr,typeof tt=="object"&&tt!==null&&(B=wn(tt)),C=a.getDerivedStateFromProps,(tt=typeof C=="function"||typeof u.getSnapshotBeforeUpdate=="function")||typeof u.UNSAFE_componentWillReceiveProps!="function"&&typeof u.componentWillReceiveProps!="function"||(g!==yt||K!==B)&&a0(n,u,r,B),qa=!1,K=n.memoizedState,u.state=K,Oo(n,r,u,c),Lo();var dt=n.memoizedState;g!==yt||K!==dt||qa||t!==null&&t.dependencies!==null&&Zl(t.dependencies)?(typeof C=="function"&&(ed(n,a,C,r),dt=n.memoizedState),(ht=qa||i0(n,a,ht,r,K,dt,B)||t!==null&&t.dependencies!==null&&Zl(t.dependencies))?(tt||typeof u.UNSAFE_componentWillUpdate!="function"&&typeof u.componentWillUpdate!="function"||(typeof u.componentWillUpdate=="function"&&u.componentWillUpdate(r,dt,B),typeof u.UNSAFE_componentWillUpdate=="function"&&u.UNSAFE_componentWillUpdate(r,dt,B)),typeof u.componentDidUpdate=="function"&&(n.flags|=4),typeof u.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&K===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&K===t.memoizedState||(n.flags|=1024),n.memoizedProps=r,n.memoizedState=dt),u.props=r,u.state=dt,u.context=B,r=ht):(typeof u.componentDidUpdate!="function"||g===t.memoizedProps&&K===t.memoizedState||(n.flags|=4),typeof u.getSnapshotBeforeUpdate!="function"||g===t.memoizedProps&&K===t.memoizedState||(n.flags|=1024),r=!1)}return u=r,Sr(t,n),r=(n.flags&128)!==0,u||r?(u=n.stateNode,a=r&&typeof a.getDerivedStateFromError!="function"?null:u.render(),n.flags|=1,t!==null&&r?(n.child=Is(n,t.child,null,c),n.child=Is(n,null,a,c)):_n(t,n,a,c),n.memoizedState=u.state,t=n.child):t=Ea(t,n,c),t}function _0(t,n,a,r){return Cs(),n.flags|=256,_n(t,n,a,r),n.child}var rd={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function od(t){return{baseLanes:t,cachePool:lg()}}function ld(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=li),t}function y0(t,n,a){var r=n.pendingProps,c=!1,u=(n.flags&128)!==0,g;if((g=u)||(g=t!==null&&t.memoizedState===null?!1:(Nn.current&2)!==0),g&&(c=!0,n.flags&=-129),g=(n.flags&32)!==0,n.flags&=-33,t===null){if(Ae){if(c?Qa(n):Ja(),(t=en)?(t=Vx(t,bi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Va!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},a=$m(t),a.return=n,n.child=a,En=n,en=null)):t=null,t===null)throw Xa(n);return oh(t)?n.lanes=32:n.lanes=536870912,null}return u=r.children,r=r.fallback,c?(Ja(),c=n.mode,u=mc({mode:"hidden",children:u},c),r=Rs(r,c,a,null),u.return=n,r.return=n,u.sibling=r,n.child=u,r=n.child,r.memoizedState=od(a),r.childLanes=ld(t,g,a),n.memoizedState=rd,Fo(null,r)):(Qa(n),cd(n,u))}var C=t.memoizedState;if(C!==null){var B=C.dehydrated;if(B!==null)return US(t,n,u,g,r,B,C,a)}return c?(Ja(),c=r.fallback,u=n.mode,C=t.child,B=C.sibling,r=va(C,{mode:"hidden",children:r.children}),r.subtreeFlags=C.subtreeFlags&1206910976,B!==null?c=va(B,c):(c=Rs(c,u,a,null),c.flags|=2),c.return=n,r.return=n,r.sibling=c,n.child=r,Fo(null,r),r=n.child,c=t.child.memoizedState,c===null?c=od(a):(u=c.cachePool,u!==null?(C=hn._currentValue,u=u.parent!==C?{parent:C,pool:C}:u):u=lg(),c={baseLanes:c.baseLanes|a,cachePool:u}),r.memoizedState=c,r.childLanes=ld(t,g,a),n.memoizedState=rd,Fo(t.child,r)):(Qa(n),a=t.child,t=a.sibling,a=va(a,{mode:"visible",children:r.children}),a.return=n,a.sibling=null,t!==null&&(g=n.deletions,g===null?(n.deletions=[t],n.flags|=16):g.push(t)),n.child=a,n.memoizedState=null,a)}function cd(t,n){return n=mc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function mc(t,n){return t=Yn(22,t,null,n),t.lanes=0,t}function gc(t,n,a){return Is(n,t.child,null,a),t=cd(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function US(t,n,a,r,c,u,g,C){if(a)return n.flags&256?(Qa(n),n.flags&=-257,gc(t,n,C)):n.memoizedState!==null?(Ja(),n.child=t.child,n.flags|=128,null):(Ja(),u=c.fallback,g=n.mode,c=mc({mode:"visible",children:c.children},g),u=Rs(u,g,C,null),u.flags|=2,c.return=n,u.return=n,c.sibling=u,n.child=c,Is(n,t.child,null,C),c=n.child,c.memoizedState=od(C),c.childLanes=ld(t,r,C),n.memoizedState=rd,Fo(null,c));if(Qa(n),oh(u)){if(r=u.nextSibling&&u.nextSibling.dataset,r)var B=r.dgst;return r=B,r!==""&&(c=Error(s(419)),c.stack="",c.digest=r,Ro({value:c,source:null,stack:null})),gc(t,n,C)}if(mn||Ds(t,n,C,!1),r=(C&t.childLanes)!==0,mn||r){if(Ka.current!==null)return gc(t,n,C);if(r=$e,r!==null&&(c=po(r,C),c!==0&&c!==g.retryLane))throw g.retryLane=c,As(t,c),Jn(r,t,c),ad;return rh(u)||Oc(),gc(t,n,C)}return rh(u)?(n.flags|=192,n.child=t.child,null):(t=g.treeContext,en=Ti(u.nextSibling),En=n,Ae=!0,ka=null,bi=!1,t!==null&&ng(n,t),n=cd(n,c.children),n.flags|=134221824,n)}function S0(t,n,a){t.lanes|=n;var r=t.alternate;r!==null&&(r.lanes|=n),Yl(t.return,n,a)}function M0(t){for(var n=null;t!==null;){var a=t.alternate;a!==null&&ic(a)===null&&(n=t),t=t.sibling}return n}function xc(t,n,a,r,c,u){var g=t.memoizedState;g===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:r,tail:a,tailMode:c,treeForkCount:u}:(g.isBackwards=n,g.rendering=null,g.renderingStartTime=0,g.last=r,g.tail=a,g.tailMode=c,g.treeForkCount=u)}function ud(t){var n=t.child;for(t.child=null;n!==null;){var a=n.sibling;n.sibling=t.child,t.child=n,n=a}}function fd(t,n,a){var r=n.pendingProps,c=r.revealOrder,u=r.tail;r=r.children;var g=Nn.current;if(n.flags&128)return Po(n,g),null;var C=(g&2)!==0;if(C?(g=g&1|2,n.flags|=128):g&=1,Po(n,g),c==="backwards"&&t!==null?(ud(t),_n(t,n,r,a),ud(t)):_n(t,n,r,a),r=Ae?Ao:0,!C&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&S0(t,a,n);else if(t.tag===19)S0(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(c){case"backwards":a=M0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null,ud(n)),xc(n,!0,c,null,u,r);break;case"unstable_legacy-backwards":for(a=null,c=n.child,n.child=null;c!==null;){if(t=c.alternate,t!==null&&ic(t)===null){n.child=c;break}t=c.sibling,c.sibling=a,a=c,c=t}xc(n,!0,a,null,u,r);break;case"together":xc(n,!1,null,null,void 0,r);break;case"independent":n.memoizedState=null;break;default:a=M0(n.child),a===null?(c=n.child,n.child=null):(c=a.sibling,a.sibling=null),xc(n,!1,c,a,u,r)}return n.child}function b0(t,n,a){var r=n.pendingProps;return Wa(n,n.type,r.value),_n(t,n,r.children,a),n.child}function Ea(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ns|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(Ds(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=va(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=va(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function dd(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Zl(t)))}function LS(t,n,a){switch(n.tag){case 3:G(n,n.stateNode.containerInfo),Wa(n,hn,t.memoizedState.cache),Cs();break;case 27:case 5:se(n);break;case 4:G(n,n.stateNode.containerInfo);break;case 10:Wa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,zf(n),null;break;case 13:var r=n.memoizedState;if(r!==null){if(r.dehydrated!==null)return Qa(n),n.flags|=128,null;r=Ds(t,n,a,!1);var c=n.child.childLanes;return r||(a&c)!==0?y0(t,n,a):(Qa(n),t=Ea(t,n,a),t!==null?t.sibling:null)}Qa(n);break;case 19:if(n.flags&128)return fd(t,n,a);if(c=(t.flags&128)!==0,r=(a&n.childLanes)!==0,r||(Ds(t,n,a,!1),r=(a&n.childLanes)!==0),c){if(r)return fd(t,n,a);n.flags|=128}if(c=n.memoizedState,c!==null&&(c.rendering=null,c.tail=null,c.lastEffect=null),Po(n,Nn.current),r)break;return null;case 22:return n.lanes=0,p0(t,n,a,n.pendingProps);case 24:Wa(n,hn,t.memoizedState.cache)}return Ea(t,n,a)}function E0(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)mn=!0;else{if(!dd(t,a)&&(n.flags&128)===0)return mn=!1,LS(t,n,a);mn=(t.flags&131072)!==0}else mn=!1,Ae&&(n.flags&1048576)!==0&&eg(n,Ao,n.index);switch(n.lanes=0,n.tag){case 16:t:{var r=n.pendingProps;if(t=Os(n.elementType),n.type=t,typeof t=="function")_f(t)?(r=Bs(t,r),n.tag=1,n=v0(null,n,t,r,a)):(n.tag=0,n=sd(null,n,t,r,a));else{if(t!=null){var c=t.$$typeof;if(c===F){n.tag=11,n=f0(null,n,t,r,a);break t}else if(c===Y){n.tag=14,n=d0(null,n,t,r,a);break t}else if(c===it){n.tag=10,n.type=t,n=b0(null,n,a);break t}}throw n=At(t)||t,Error(s(306,n,""))}}return n;case 0:return sd(t,n,n.type,n.pendingProps,a);case 1:return r=n.type,c=Bs(r,n.pendingProps),v0(t,n,r,c,a);case 3:t:{if(G(n,n.stateNode.containerInfo),t===null)throw Error(s(387));r=n.pendingProps;var u=n.memoizedState;c=u.element,Uf(t,n),Oo(n,r,null,a);var g=n.memoizedState;if(r=g.cache,Wa(n,hn,r),r!==u.cache&&Af(n,[hn],a,!0),Lo(),r=g.element,u.isDehydrated)if(u={element:r,isDehydrated:!1,cache:g.cache},n.updateQueue.baseState=u,n.memoizedState=u,n.flags&256){n=_0(t,n,r,a);break t}else if(r!==c){c=yi(Error(s(424)),n),Ro(c),n=_0(t,n,r,a);break t}else{switch(t=n.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(en=Ti(t.firstChild),En=n,Ae=!0,ka=null,bi=!0,a=pg(n,null,r,a),n.child=a;a;)a.flags=a.flags&-3|134221824,a=a.sibling}else{if(Cs(),r===c){n=Ea(t,n,a);break t}_n(t,n,r,a)}n=n.child}return n;case 26:return Sr(t,n),t===null?(a=Zx(n.type,null,n.pendingProps,null))?n.memoizedState=a:Ae||(n.stateNode=Cx(n.type,n.pendingProps,at.current,n)):n.memoizedState=Zx(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return se(n),t===null&&Ae&&(r=n.stateNode=Wx(n.type,n.pendingProps,at.current),En=n,bi=!0,c=en,rs(n.type)?(lh=c,en=Ti(r.firstChild)):en=c),_n(t,n,n.pendingProps.children,a),Sr(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&Ae&&((c=r=en)&&(r=RM(r,n.type,n.pendingProps,bi),r!==null?(n.stateNode=r,En=n,en=Ti(r.firstChild),bi=!1,c=!0):c=!1),c||Xa(n)),se(n),c=n.type,u=n.pendingProps,g=t!==null?t.memoizedProps:null,r=u.children,$d(c,u)?r=null:g!==null&&$d(c,g)&&(n.flags|=32),n.memoizedState!==null&&(c=Hf(t,n,MS,null,null,a),Fr._currentValue=c),Sr(t,n),_n(t,n,r,a),n.child;case 6:return t===null&&Ae&&((t=a=en)&&(a=CM(a,n.pendingProps,bi),a!==null?(n.stateNode=a,En=n,en=null,t=!0):t=!1),t||Xa(n)),null;case 13:return y0(t,n,a);case 4:return G(n,n.stateNode.containerInfo),r=n.pendingProps,t===null?n.child=Is(n,null,r,a):_n(t,n,r,a),n.child;case 11:return f0(t,n,n.type,n.pendingProps,a);case 7:return r=n.pendingProps,Sr(t,n),_n(t,n,r,a),n.child;case 8:return _n(t,n,n.pendingProps.children,a),n.child;case 12:return _n(t,n,n.pendingProps.children,a),n.child;case 10:return b0(t,n,a);case 9:return c=n.type._context,r=n.pendingProps.children,Ns(n),c=wn(c),r=r(c),n.flags|=1,_n(t,n,r,a),n.child;case 14:return d0(t,n,n.type,n.pendingProps,a);case 15:return h0(t,n,n.type,n.pendingProps,a);case 19:return fd(t,n,a);case 31:return NS(t,n,a);case 22:return p0(t,n,a,n.pendingProps);case 24:return Ns(n),r=wn(hn),t===null?(c=wf(),c===null&&(c=$e,u=Rf(),c.pooledCache=u,u.refCount++,u!==null&&(c.pooledCacheLanes|=a),c=u),n.memoizedState={parent:r,cache:c},Nf(n),Wa(n,hn,c)):((t.lanes&a)!==0&&(Uf(t,n),Oo(n,null,null,a),Lo()),c=t.memoizedState,u=n.memoizedState,c.parent!==r?(c={parent:r,cache:r},n.memoizedState=c,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=c),Wa(n,hn,r)):(r=u.cache,Wa(n,hn,r),r!==c.cache&&Af(n,[hn],a,!0))),_n(t,n,n.pendingProps.children,a),n.child;case 30:return n.stateNode===null&&(n.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=n.pendingProps,r.name!=null&&r.name!=="auto"?n.flags|=t===null?18882560:18874368:Ae&&jl(n),t!==null&&t.memoizedProps.name!==r.name?n.flags|=4194816:Sr(t,n),_n(t,n,r.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Ta(t){t.flags|=4}function hd(t,n,a,r,c){var u;if((u=(t.mode&32)!==0)&&(u=a===null?$x(n,r):$x(n,r)&&(r.src!==a.src||r.srcSet!==a.srcSet)),u){if(t.flags|=16777216,(c&335544128)===c)if(t.stateNode.complete)t.flags|=8192;else if(sx())t.flags|=8192;else throw Ps=$l,Df}else t.flags&=-16777217}function T0(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!tv(n))if(sx())t.flags|=8192;else throw Ps=$l,Df}function vc(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?fo():536870912,t.lanes|=n,Ar|=n)}function Ho(t,n){if(!Ae)switch(t.tailMode){case"visible":break;case"collapsed":for(var a=t.tail,r=null;a!==null;)a.alternate!==null&&(r=a),a=a.sibling;r===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null;break;default:for(n=t.tail,a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null}}function nn(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,r=0;if(n)for(var c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags&1206910976,r|=c.flags&1206910976,c.return=t,c=c.sibling;else for(c=t.child;c!==null;)a|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,c.return=t,c=c.sibling;return t.subtreeFlags|=r,t.childLanes=a,n}function OS(t,n,a){var r=n.pendingProps;switch(Mf(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return nn(n),null;case 1:return nn(n),null;case 3:return a=n.stateNode,r=null,t!==null&&(r=t.memoizedState.cache),n.memoizedState.cache!==r&&(n.flags|=2048),Sa(hn),me(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(pr(n)?Ta(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Ef())),nn(n),null;case 26:var c=n.type,u=n.memoizedState;return t===null?(Ta(n),u!==null?(nn(n),T0(n,u)):(nn(n),hd(n,c,null,r,a))):u?u!==t.memoizedState?(Ta(n),nn(n),T0(n,u)):(nn(n),n.flags&=-16777217):(t=t.memoizedProps,t!==r&&Ta(n),nn(n),hd(n,c,t,r,a)),null;case 27:if(I(n),a=at.current,c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return nn(n),n.subtreeFlags&=-33554433,null}t=ue.current,pr(n)?ig(n):(t=Wx(c,r,a),n.stateNode=t,Ta(n))}return nn(n),n.subtreeFlags&=-33554433,null;case 5:if(I(n),c=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(!r){if(n.stateNode===null)throw Error(s(166));return nn(n),n.subtreeFlags&=-33554433,null}if(u=ue.current,pr(n))ig(n);else{var g=Qo(at.current);switch(u){case 1:u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case 2:u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;default:switch(c){case"svg":u=g.createElementNS("http://www.w3.org/2000/svg",c);break;case"math":u=g.createElementNS("http://www.w3.org/1998/Math/MathML",c);break;case"script":u=g.createElement("div"),u.innerHTML="<script><\/script>",u=u.removeChild(u.firstChild);break;case"select":u=typeof r.is=="string"?g.createElement("select",{is:r.is}):g.createElement("select"),r.multiple?u.multiple=!0:r.size&&(u.size=r.size);break;default:u=typeof r.is=="string"?g.createElement(c,{is:r.is}):g.createElement(c)}}u[R]=n,u[W]=r;t:for(g=n.child;g!==null;){if(g.tag===5||g.tag===6)u.appendChild(g.stateNode);else if(g.tag!==4&&g.tag!==27&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===n)break t;for(;g.sibling===null;){if(g.return===null||g.return===n)break t;g=g.return}g.sibling.return=g.return,g=g.sibling}n.stateNode=u;t:switch(Ln(u,c,r),c){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break t;case"img":r=!0;break t;default:r=!1}r&&Ta(n)}}return nn(n),n.subtreeFlags&=-33554433,hd(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==r&&Ta(n);else{if(typeof r!="string"&&n.stateNode===null)throw Error(s(166));if(t=at.current,pr(n)){if(t=n.stateNode,a=n.memoizedProps,r=null,c=En,c!==null)switch(c.tag){case 27:case 5:r=c.memoizedProps}t[R]=n,t=!!(t.nodeValue===a||r!==null&&r.suppressHydrationWarning===!0||Ex(t.nodeValue,a)),t||Xa(n,!0)}else t=Qo(t).createTextNode(r),t[R]=n,n.stateNode=t}return nn(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(r=pr(n),a!==null){if(t===null){if(!r)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[R]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;nn(n),t=!1}else a=Ef(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(si(n),n):(si(n),null);if((n.flags&128)!==0)throw Error(s(558))}return nn(n),null;case 13:if(r=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(c=pr(n),r!==null&&r.dehydrated!==null){if(t===null){if(!c)throw Error(s(318));if(c=n.memoizedState,c=c!==null?c.dehydrated:null,!c)throw Error(s(317));c[R]=n}else Cs(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;nn(n),c=!1}else c=Ef(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=c),c=!0;if(!c)return n.flags&256?(si(n),n):(si(n),null)}return si(n),(n.flags&128)!==0?(n.lanes=a,n):(a=r!==null,t=t!==null&&t.memoizedState!==null,a&&(r=n.child,c=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(c=r.alternate.memoizedState.cachePool.pool),u=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(u=r.memoizedState.cachePool.pool),u!==c&&(r.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),vc(n,n.updateQueue),nn(n),null);case 4:return me(),t===null&&Yd(n.stateNode.containerInfo),n.flags|=67108864,nn(n),null;case 10:return Sa(n.type),nn(n),null;case 19:if(Bf(n),r=n.memoizedState,r===null)return nn(n),null;if(c=(n.flags&128)!==0,u=r.rendering,u===null)if(c)Ho(r,!1);else{if(fn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(u=ic(t),u!==null){for(n.flags|=128,Ho(r,!1),t=u.updateQueue,n.updateQueue=t,vc(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Jm(a,t),a=a.sibling;return Po(n,Nn.current&1|2),Ae&&_a(n,r.treeForkCount),n.child}t=t.sibling}r.tail!==null&&qt()>Dc&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304)}else{if(!c)if(t=ic(u),t!==null){if(n.flags|=128,c=!0,t=t.updateQueue,n.updateQueue=t,vc(n,t),Ho(r,!0),r.tail===null&&r.tailMode!=="collapsed"&&r.tailMode!=="visible"&&!u.alternate&&!Ae)return nn(n),null}else 2*qt()-r.renderingStartTime>Dc&&a!==536870912&&(n.flags|=128,c=!0,Ho(r,!1),n.lanes=4194304);r.isBackwards?(u.sibling=n.child,n.child=u):(t=r.last,t!==null?t.sibling=u:n.child=u,r.last=u)}if(r.tail!==null){t=r.tail;t:{for(a=t;a!==null;){if(a.alternate!==null){a=!1;break t}a=a.sibling}a=!0}return r.rendering=t,r.tail=t.sibling,r.renderingStartTime=qt(),t.sibling=null,u=Nn.current,u=c?u&1|2:u&1,r.tailMode==="visible"||r.tailMode==="collapsed"||!a||Ae?Po(n,u):(a=u,ae(Dn,n),ae(Nn,a),In===null&&(In=n)),Ae&&_a(n,r.treeForkCount),t}return nn(n),null;case 22:case 23:return si(n),If(),r=n.memoizedState!==null,t!==null?t.memoizedState!==null!==r&&(n.flags|=8192):r&&(n.flags|=8192),r?(a&536870912)!==0&&(n.flags&128)===0&&(nn(n),n.subtreeFlags&6&&(n.flags|=8192)):nn(n),a=n.updateQueue,a!==null&&vc(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),r=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(r=n.memoizedState.cachePool.pool),r!==a&&(n.flags|=2048),t!==null&&$t(Ls),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Sa(hn),nn(n),null;case 25:return null;case 30:return n.flags|=33554432,nn(n),null}throw Error(s(156,n.tag))}function PS(t,n){switch(Mf(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Sa(hn),me(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return I(n),null;case 31:if(n.memoizedState!==null){if(si(n),n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(si(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Cs()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return Bf(n),t=n.flags,t&65536?(n.flags=t&-65537|128,t=n.memoizedState,t!==null&&(t.rendering=null,t.tail=null),n.flags|=4,n):null;case 4:return me(),null;case 10:return Sa(n.type),null;case 22:case 23:return si(n),If(),t!==null&&$t(Ls),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Sa(hn),null;case 25:return null;default:return null}}function A0(t,n){switch(Mf(n),n.tag){case 3:Sa(hn),me();break;case 26:case 27:case 5:I(n);break;case 4:me();break;case 31:n.memoizedState!==null&&si(n);break;case 13:si(n);break;case 19:Bf(n);break;case 10:Sa(n.type);break;case 22:case 23:si(n),If(),t!==null&&$t(Ls);break;case 24:Sa(hn)}}function Go(t,n){try{var a=n.updateQueue,r=a!==null?a.lastEffect:null;if(r!==null){var c=r.next;a=c;do{if((a.tag&t)===t){r=void 0;var u=a.create,g=a.inst;r=u(),g.destroy=r}a=a.next}while(a!==c)}}catch(C){qe(n,n.return,C)}}function $a(t,n,a){try{var r=n.updateQueue,c=r!==null?r.lastEffect:null;if(c!==null){var u=c.next;r=u;do{if((r.tag&t)===t){var g=r.inst,C=g.destroy;if(C!==void 0){g.destroy=void 0,c=n;var B=a,tt=C;try{tt()}catch(ht){qe(c,B,ht)}}}r=r.next}while(r!==u)}}catch(ht){qe(n,n.return,ht)}}function R0(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{gg(n,a)}catch(r){qe(t,t.return,r)}}}function C0(t,n,a){a.props=Bs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(r){qe(t,n,r)}}function Zi(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var r=t.stateNode;break;case 30:var c=t.stateNode,u=ga(t.memoizedProps,c);(c.ref===null||c.ref.name!==u)&&(c.ref=Px(u)),r=c.ref;break;case 7:if(t.stateNode===null){var g=new ui(t);M(t.child,!1,TM,g,void 0,void 0),t.stateNode=g}r=t.stateNode;break;default:r=t.stateNode}typeof a=="function"?t.refCleanup=a(r):a.current=r}}catch(C){qe(t,n,C)}}function Un(t,n){var a=t.ref,r=t.refCleanup;if(a!==null)if(typeof r=="function")try{r()}catch(c){qe(t,n,c)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(c){qe(t,n,c)}else a.current=null}function _c(t,n){if((t.tag===5||t.tag===27||t.tag===6)&&t.alternate===null&&n!==null)for(var a=0;a<n.length;a++)Gx(t.stateNode,n[a])}function w0(t){for(var n=t.return;n!==null&&(md(n)&&Gx(t.stateNode,n.stateNode),!pd(n));)n=n.return}function Vo(t){for(var n=t.return;n!==null&&(md(n)&&AM(t.stateNode,n.stateNode),!pd(n));)n=n.return}function pd(t){return t.tag===5||t.tag===3||t.tag===27}function md(t){return t&&t.tag===7&&t.stateNode!==null}function gd(t){var n=t.type,a=t.memoizedProps,r=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&r.focus();break t;case"img":a.src?r.src=a.src:a.srcSet&&(r.srcset=a.srcSet)}}catch(c){qe(t,t.return,c)}}function xd(t,n,a){try{var r=t.stateNode;oM(r,t.type,a,n),r[W]=n}catch(c){qe(t,t.return,c)}}function D0(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&rs(t.type)||t.tag===4}function vd(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||D0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&rs(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function _d(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(c,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(c),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=ji)),_c(t,r),Te=!0;else if(c!==4&&(c===27&&(_c(t,r),r=null,rs(t.type)&&(a=t.stateNode,n=null)),t=t.child,t!==null))for(_d(t,n,a,r),t=t.sibling;t!==null;)_d(t,n,a,r),t=t.sibling}function yc(t,n,a,r){var c=t.tag;if(c===5||c===6)c=t.stateNode,n?a.insertBefore(c,n):a.appendChild(c),_c(t,r),Te=!0;else if(c!==4&&(c===27&&(_c(t,r),r=null,rs(t.type)&&(a=t.stateNode)),t=t.child,t!==null))for(yc(t,n,a,r),t=t.sibling;t!==null;)yc(t,n,a,r),t=t.sibling}function N0(t){var n=t.stateNode,a=t.memoizedProps;try{for(var r=t.type,c=n.attributes;c.length;)n.removeAttributeNode(c[0]);Ln(n,r,a),n[R]=t,n[W]=a}catch(u){qe(t,t.return,u)}}var Sc=!1,ri=null;function U0(t){(t.tag===30||(t.subtreeFlags&33554432)!==0)&&(Sc=!0)}var Ki=null;function L0(){var t=Ki;return Ki=null,t}var Zn=0;function Mr(t,n,a,r,c){return Zn=0,O0(t.child,n,a,r,c)}function O0(t,n,a,r,c){for(var u=!1;t!==null;){if(t.tag===5){var g=t.stateNode;if(r!==null){var C=nh(g);r.push(C),C.view&&(u=!0)}else u||nh(g).view&&(u=!0);Sc=!0,Lx(g,Zn===0?n:n+"_"+Zn,a),Zn++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&c||O0(t.child,n,a,r,c)&&(u=!0));t=t.sibling}return u}function Qi(t,n){for(;t!==null;)t.tag===5?Ox(t.stateNode,t.memoizedProps):(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&n||Qi(t.child,n)),t=t.sibling}function Mc(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if((t.tag!==22||t.memoizedState===null)&&(Mc(t),t.tag===30&&(t.flags&18874368)!==0&&t.stateNode.paired)){var n=t.memoizedProps;if(n.name==null||n.name==="auto")throw Error(s(544));var a=n.name;n=xa(n.default,n.share),n!=="none"&&(Mr(t,a,n,null,!1)||Qi(t.child,!1))}t=t.sibling}}function yd(t,n){if(t.tag===30){var a=t.stateNode,r=t.memoizedProps,c=ga(r,a),u=xa(r.default,a.paired?r.share:r.enter);u!=="none"?Mr(t,c,u,null,!1)?(Mc(t),a.paired||n||Dr(t,r.onEnter)):Qi(t.child,!1):Mc(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)yd(t,n),t=t.sibling;else Mc(t)}function Sd(t){if(ri!==null&&ri.size!==0){var n=ri;if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var a=t.memoizedProps,r=a.name;if(r!=null&&r!=="auto"){var c=n.get(r);if(c!==void 0){var u=xa(a.default,a.share);if(u!=="none"&&(Mr(t,r,u,null,!1)?(u=t.stateNode,c.paired=u,u.paired=c,Dr(t,a.onShare)):Qi(t.child,!1)),n.delete(r),n.size===0)break}}}Sd(t)}t=t.sibling}}}function Md(t){if(t.tag===30){var n=t.memoizedProps,a=ga(n,t.stateNode),r=ri!==null?ri.get(a):void 0,c=xa(n.default,r!==void 0?n.share:n.exit);c!=="none"&&(Mr(t,a,c,null,!1)?r!==void 0?(c=t.stateNode,r.paired=c,c.paired=r,ri.delete(a),Dr(t,n.onShare)):Dr(t,n.onExit):Qi(t.child,!1)),ri!==null&&Sd(t)}else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)Md(t),t=t.sibling;else ri!==null&&Sd(t)}function P0(t){for(t=t.child;t!==null;){if(t.tag===30){var n=t.memoizedProps,a=ga(n,t.stateNode);n=xa(n.default,n.update),t.flags&=-5,n!=="none"&&Mr(t,a,n,t.memoizedState=[],!1)}else(t.subtreeFlags&33554432)!==0&&P0(t);t=t.sibling}}function bd(t){if((t.subtreeFlags&18874368)!==0)for(t=t.child;t!==null;){if(t.tag!==22||t.memoizedState===null){if(t.tag===30&&(t.flags&18874368)!==0){var n=t.stateNode;n.paired!==null&&(n.paired=null,Qi(t.child,!1))}bd(t)}t=t.sibling}}function bc(t){if(t.tag===30)t.stateNode.paired=null,Qi(t.child,!1),bd(t);else if((t.subtreeFlags&33554432)!==0)for(t=t.child;t!==null;)bc(t),t=t.sibling;else bd(t)}function I0(t){for(t=t.child;t!==null;)t.tag===30?Qi(t.child,!1):(t.subtreeFlags&33554432)!==0&&I0(t),t=t.sibling}function Ed(t,n,a,r,c,u,g){for(var C=!1;n!==null;){if(n.tag===5){var B=n.stateNode;if(u!==null&&Zn<u.length){var tt=u[Zn],ht=nh(B);(tt.view||ht.view)&&(C=!0);var yt;if(yt=(t.flags&4)===0)if(ht.clip)yt=!0;else{yt=tt.rect;var K=ht.rect;yt=yt.y!==K.y||yt.x!==K.x||yt.height!==K.height||yt.width!==K.width}yt&&(t.flags|=4),ht.abs?ht=!tt.abs:(tt=tt.rect,ht=ht.rect,ht=tt.height!==ht.height||tt.width!==ht.width),ht&&(t.flags|=32)}else t.flags|=32;(t.flags&4)!==0&&Lx(B,Zn===0?a:a+"_"+Zn,c),C&&(t.flags&4)!==0||(Ki===null&&(Ki=[]),Ki.push(B,Zn===0?r:r+"_"+Zn,n.memoizedProps)),Zn++}else(n.tag!==22||n.memoizedState===null)&&(n.tag===30&&g?t.flags|=n.flags&32:Ed(t,n.child,a,r,c,u,g)&&(C=!0));n=n.sibling}return C}function z0(t,n){for(t=t.child;t!==null;){if(t.tag===30){var a=t.memoizedProps,r=t.stateNode,c=ga(a,r),u=xa(a.default,a.update),g;g=t.memoizedState,t.memoizedState=null,r=t;var C=t.child;Zn=0,c=Ed(r,C,c,c,u,g,!1),(t.flags&4)!==0&&c&&Dr(t,a.onUpdate)}else(t.subtreeFlags&33554432)!==0&&z0(t);t=t.sibling}}var Tn=!1,We=!1,Ji=!1,Td=!1,B0=typeof WeakSet=="function"?WeakSet:Set,An=null,$i=!1,ko=!1,Ec=!1,Ad=!1;function IS(t,n,a){if(t=t.containerInfo,Qd=Hr,t=Vm(t),df(t)){if("selectionStart"in t)var r={start:t.selectionStart,end:t.selectionEnd};else t:{r=(r=t.ownerDocument)&&r.defaultView||window;var c=r.getSelection&&r.getSelection();if(c&&c.rangeCount!==0){r=c.anchorNode;var u=c.anchorOffset,g=c.focusNode;c=c.focusOffset;try{r.nodeType,g.nodeType}catch{r=null;break t}var C=0,B=-1,tt=-1,ht=0,yt=0,K=t,dt=null;e:for(;;){for(var zt;K!==r||u!==0&&K.nodeType!==3||(B=C+u),K!==g||c!==0&&K.nodeType!==3||(tt=C+c),K.nodeType===3&&(C+=K.nodeValue.length),(zt=K.firstChild)!==null;)dt=K,K=zt;for(;;){if(K===t)break e;if(dt===r&&++ht===u&&(B=C),dt===g&&++yt===c&&(tt=C),(zt=K.nextSibling)!==null)break;K=dt,dt=K.parentNode}K=zt}r=B===-1||tt===-1?null:{start:B,end:tt}}else r=null}r=r||{start:0,end:0}}else r=null;for(Jd={focusedElem:t,selectionRange:r},Hr=!1,a=(a&335544064)===a,An=n,n=a?9270:1024;An!==null;){if(t=An,a&&(r=t.deletions,r!==null))for(u=0;u<r.length;u++)a&&Md(r[u]);if(t.alternate===null&&(t.flags&2)!==0)a&&U0(t),Tc(a);else{if(t.tag===22){if(r=t.alternate,t.memoizedState!==null){r!==null&&r.memoizedState===null&&a&&Md(r),Tc(a);continue}else if(r!==null&&r.memoizedState!==null){a&&U0(t),Tc(a);continue}}r=t.child,(t.subtreeFlags&n)!==0&&r!==null?(r.return=t,An=r):(a&&P0(t),Tc(a))}}ri=null}function Tc(t){for(;An!==null;){var n=An,a=t,r=n.alternate,c=n.flags;switch(n.tag){case 0:case 11:case 15:break;case 1:if((c&1024)!==0&&r!==null){a=void 0,c=r.memoizedProps,r=r.memoizedState;var u=n.stateNode;try{var g=Bs(n.type,c);a=u.getSnapshotBeforeUpdate(g,r),u.__reactInternalSnapshotBeforeUpdate=a}catch(C){qe(n,n.return,C)}}break;case 3:if((c&1024)!==0){if(r=n.stateNode.containerInfo,a=r.nodeType,a===9)sh(r);else if(a===1)switch(r.nodeName){case"HEAD":case"HTML":case"BODY":sh(r);break;default:r.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:a&&r!==null&&(a=ga(r.memoizedProps,r.stateNode),c=n.memoizedProps,c=xa(c.default,c.update),c!=="none"&&Mr(r,a,c,r.memoizedState=[],!0));break;default:if((c&1024)!==0)throw Error(s(163))}if(r=n.sibling,r!==null){r.return=n.return,An=r;break}An=n.return}}function F0(t,n,a){var r=a.flags;switch(a.tag){case 0:case 11:case 15:ta(t,a),r&4&&Go(5,a);break;case 1:if(ta(t,a),r&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(g){qe(a,a.return,g)}else{var c=Bs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(c,n,t.__reactInternalSnapshotBeforeUpdate)}catch(g){qe(a,a.return,g)}}r&64&&R0(a),r&512&&Zi(a,a.return);break;case 3:if(ta(t,a),r&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{gg(t,n)}catch(g){qe(a,a.return,g)}}break;case 27:n===null&&r&4&&N0(a);case 26:case 5:ta(t,a),n===null&&r&4&&gd(a),r&512&&Zi(a,a.return);break;case 12:ta(t,a);break;case 31:ta(t,a),r&4&&k0(t,a);break;case 13:ta(t,a),r&4&&X0(t,a),r&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=YS.bind(null,a),wM(t,a))));break;case 22:if(r=a.memoizedState!==null||Tn,!r){var u=n!==null&&n.memoizedState!==null||We;n=Tn,c=We,Tn=r,(We=u)&&!c?(r=2,(a.subtreeFlags&8772)!==0&&(r|=1),Li(t,a,r)):ta(t,a),Tn=n,We=c}break;case 30:ta(t,a),r&512&&Zi(a,a.return);break;case 7:r&512&&Zi(a,a.return);default:ta(t,a)}}function Rd(t,n){for(t=t.child;t!==null;)H0(t,n),t=t.sibling}function H0(t,n){switch(t.tag){case 5:case 26:try{var a=t.stateNode;if(n){var r=a.style;typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none"}else{var c=t.stateNode,u=t.memoizedProps.style,g=u!=null&&u.hasOwnProperty("display")?u.display:null;c.style.display=g==null||typeof g=="boolean"?"":(""+g).trim()}}catch(B){qe(t,t.return,B)}Cd(t,n);break;case 6:try{t.stateNode.nodeValue=n?"":t.memoizedProps,Te=!0}catch(B){qe(t,t.return,B)}break;case 18:try{var C=t.stateNode;n?Ux(C,!0):Ux(t.stateNode,!1)}catch(B){qe(t,t.return,B)}break;case 22:case 23:t.memoizedState===null&&Rd(t,n);break;default:Rd(t,n)}}function Cd(t,n){if(t.subtreeFlags&67108864)for(t=t.child;t!==null;){t:{var a=t,r=n;switch(a.tag){case 4:H0(a,r);break t;case 22:a.memoizedState===null&&Cd(a,r);break t;default:Cd(a,r)}}t=t.sibling}}function G0(t){var n=t.alternate;n!==null&&(t.alternate=null,G0(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&te(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var sn=null,Kn=!1;function Ni(t,n,a){for(a=a.child;a!==null;)V0(t,n,a),a=a.sibling}function V0(t,n,a){if(kt&&typeof kt.onCommitFiberUnmount=="function")try{kt.onCommitFiberUnmount(ne,a)}catch{}switch(a.tag){case 26:We||Un(a,n),Ni(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&!We&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:We||Un(a,n),Vo(a);var r=sn,c=Kn;rs(a.type)&&(sn=a.stateNode,Kn=!1),Ni(t,n,a),jx(a.stateNode,a.type,a.memoizedProps),sn=r,Kn=c;break;case 5:We||Un(a,n),Vo(a);case 6:if(a.tag===6&&Vo(a),r=sn,c=Kn,sn=null,Ni(t,n,a),sn=r,Kn=c,sn!==null)if(Kn)try{(sn.nodeType===9?sn.body:sn.nodeName==="HTML"?sn.ownerDocument.body:sn).removeChild(a.stateNode),Te=!0}catch(u){qe(a,n,u)}else try{sn.removeChild(a.stateNode),Te=!0}catch(u){qe(a,n,u)}break;case 18:sn!==null&&(Kn?(t=sn,Nx(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Gr(t)):Nx(sn,a.stateNode));break;case 4:r=sn,c=Kn,sn=a.stateNode.containerInfo,Kn=!0,Ni(t,n,a),sn=r,Kn=c;break;case 0:case 11:case 14:case 15:$a(2,a,n),We||$a(4,a,n),Ni(t,n,a);break;case 1:We||(Un(a,n),r=a.stateNode,typeof r.componentWillUnmount=="function"&&C0(a,n,r)),Ni(t,n,a);break;case 21:Ni(t,n,a);break;case 22:We=(r=We)||a.memoizedState!==null,Ni(t,n,a),We=r;break;case 30:Un(a,n),Ni(t,n,a);break;case 7:We||Un(a,n),Ni(t,n,a);break;default:Ni(t,n,a)}}function k0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Gr(t)}catch(a){qe(n,n.return,a)}}}function X0(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Gr(t)}catch(a){qe(n,n.return,a)}}function zS(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new B0),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new B0),n;default:throw Error(s(435,t.tag))}}function Ac(t,n){var a=zS(t);n.forEach(function(r){if(!a.has(r)){a.add(r);var c=ZS.bind(null,t,r);r.then(c,c)}})}function kn(t,n,a){var r=n.deletions;if(r!==null)for(var c=0;c<r.length;c++){var u=r[c],g=t,C=n,B=C;t:for(;B!==null;){switch(B.tag){case 27:if(rs(B.type)){sn=B.stateNode,Kn=!1;break t}break;case 5:sn=B.stateNode,Kn=!1;break t;case 3:case 4:sn=B.stateNode.containerInfo,Kn=!0;break t}B=B.return}if(sn===null)throw Error(s(160));V0(g,C,u),sn=null,Kn=!1,g=u.alternate,g!==null&&(g.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)W0(n,t,a),n=n.sibling}var Ui=null;function W0(t,n,a){var r=t.alternate,c=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(c&4&&(r=t.updateQueue,r=r!==null?r.events:null,r!==null))for(var u=0;u<r.length;u++){var g=r[u];g.ref.impl=g.nextImpl}kn(n,t,a),Xn(t),c&4&&($a(3,t,t.return),Go(3,t),$a(5,t,t.return));break;case 1:kn(n,t,a),Xn(t),c&512&&(We||r===null||Un(r,r.return)),c&64&&Tn&&(t=t.updateQueue,t!==null&&(n=t.callbacks,n!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?n:a.concat(n))));break;case 26:if(u=Ui,kn(n,t,a),Xn(t),c&512&&(We||r===null||Un(r,r.return)),c&4)if(c=r!==null?r.memoizedState:null,a=t.memoizedState,r===null)if(a===null)if(t.stateNode===null)if(Tn)t.stateNode=Cx(t.type,t.memoizedProps,n.containerInfo,t);else{t:{n=t.type,a=t.memoizedProps,c=u.ownerDocument||u;e:switch(n){case"title":r=c.getElementsByTagName("title")[0],(!r||r[It]||r[R]||r.namespaceURI==="http://www.w3.org/2000/svg"||r.hasAttribute("itemprop"))&&(r=c.createElement(n),c.head.insertBefore(r,c.querySelector("head > title"))),Ln(r,n,a),r[R]=t,Ee(r),n=r;break t;case"link":if(u=Jx("link","href",c).get(n+(a.href||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&r.getAttribute("rel")===(a.rel==null?null:a.rel)&&r.getAttribute("title")===(a.title==null?null:a.title)&&r.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){u.splice(g,1);break e}}r=c.createElement(n),Ln(r,n,a),c.head.appendChild(r);break;case"meta":if(u=Jx("meta","content",c).get(n+(a.content||""))){for(g=0;g<u.length;g++)if(r=u[g],r.getAttribute("content")===(a.content==null?null:""+a.content)&&r.getAttribute("name")===(a.name==null?null:a.name)&&r.getAttribute("property")===(a.property==null?null:a.property)&&r.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&r.getAttribute("charset")===(a.charSet==null?null:a.charSet)){u.splice(g,1);break e}}r=c.createElement(n),Ln(r,n,a),c.head.appendChild(r);break;default:throw Error(s(468,n))}r[R]=t,Ee(r),n=r}t.stateNode=n}else Tn||dh(u,t.type,t.stateNode);else t.stateNode=Qx(u,a,t.memoizedProps);else c!==a?(c===null?(n=r.stateNode,n===null||We||n.parentNode.removeChild(n)):c.count--,a===null?Tn||dh(u,t.type,t.stateNode):Qx(u,a,t.memoizedProps)):a===null&&t.stateNode!==null&&xd(t,t.memoizedProps,r.memoizedProps);break;case 27:kn(n,t,a),Xn(t),c&512&&(We||r===null||Un(r,r.return)),r!==null&&c&4&&xd(t,t.memoizedProps,r.memoizedProps);break;case 5:if(u=Ji,Ji=!1,kn(n,t,a),Ji=u,Xn(t),c&512&&(We||r===null||Un(r,r.return)),t.flags&32){n=t.stateNode;try{ar(n,""),Te=!0}catch(ht){qe(t,t.return,ht)}}c&4&&t.stateNode!=null&&(n=t.memoizedProps,xd(t,n,r!==null?r.memoizedProps:n)),c&1024&&(Td=!0);break;case 6:if(kn(n,t,a),Xn(t),c&4){if(t.stateNode===null)throw Error(s(162));n=t.memoizedProps,a=t.stateNode;try{a.nodeValue=n,Te=!0}catch(ht){qe(t,t.return,ht)}}break;case 3:if(Te=!1,Gc=null,u=Ui,Ui=Jo(n.containerInfo),kn(n,t,a),Ui=u,Xn(t),c&4&&r!==null&&r.memoizedState.isDehydrated)try{Gr(n.containerInfo)}catch(ht){qe(t,t.return,ht)}Td&&(Td=!1,j0(t)),Te=!1;break;case 4:c=Ji,Ji=Tn,r=Ve(),u=Ui,Ui=Jo(t.stateNode.containerInfo),kn(n,t,a),Xn(t),Ui=u,Te&&ko&&(Ec=!0),Te=r,Ji=c;break;case 12:kn(n,t,a),Xn(t);break;case 31:kn(n,t,a),Xn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ac(t,n)));break;case 13:kn(n,t,a),Xn(t),t.child.flags&8192&&t.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(wc=qt()),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ac(t,n)));break;case 22:u=t.memoizedState!==null,g=r!==null&&r.memoizedState!==null;var C=Tn,B=We,tt=Ji;Tn=C||u,Ji=tt||u,We=B||g,kn(n,t,a),We=B,Ji=tt,Tn=C,Xn(t),c&8192&&(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,!u||r===null||g||Tn||We||(n=g||We,a=Tn,r=We,Tn=u||Tn,We=n,ts(t,2),Tn=a,We=r),!u&&Ji||Rd(t,u)),c&4&&(n=t.updateQueue,n!==null&&(a=n.retryQueue,a!==null&&(n.retryQueue=null,Ac(t,a))));break;case 19:kn(n,t,a),Xn(t),c&4&&(n=t.updateQueue,n!==null&&(t.updateQueue=null,Ac(t,n)));break;case 30:c&512&&(We||r===null||Un(r,r.return)),c=Ve(),u=ko,g=(a&335544064)===a,C=t.memoizedProps,ko=g&&xa(C.default,C.update)!=="none",kn(n,t,a),Xn(t),g&&r!==null&&Te&&(t.flags|=4),ko=u,Te=c;break;case 21:break;case 7:c&512&&(We||r===null||Un(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=t);default:kn(n,t,a),Xn(t)}}function Xn(t){var n=t.flags;if(n&2){try{for(var a,r=t.return;r!==null;){if(D0(r)){a=r;break}r=r.return}r=null;for(var c=t.return;c!==null;){if(md(c)){var u=c.stateNode;r===null?r=[u]:r.push(u)}if(pd(c))break;c=c.return}var g=r;if(a==null)throw Error(s(160));switch(a.tag){case 27:var C=a.stateNode,B=vd(t);yc(t,B,C,g);break;case 5:var tt=a.stateNode;a.flags&32&&(ar(tt,""),a.flags&=-33);var ht=vd(t);yc(t,ht,tt,g);break;case 3:case 4:var yt=a.stateNode.containerInfo,K=vd(t);_d(t,K,yt,g);break;default:throw Error(s(161))}}catch(dt){qe(t,t.return,dt)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function j0(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;j0(n),n.tag===5&&n.flags&1024&&(n=n.stateNode,Hr=!0,n.reset(),Hr=!1),t=t.sibling}}function br(t,n){if(n.subtreeFlags&9270)for(n=n.child;n!==null;)q0(n,t),n=n.sibling;else z0(n)}function q0(t,n){var a=t.alternate;if(a===null)yd(t,!1);else switch(t.tag){case 3:if(Ad=$i=!1,L0(),br(n,t),!$i&&!Ec){if(t=Ki,t!==null)for(var r=0;r<t.length;r+=3){a=t[r];var c=t[r+1];Ox(a,t[r+2]),a=a.ownerDocument.documentElement,a!==null&&a.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group("+c+")"})}t=n.containerInfo,t=t.nodeType===9?t.documentElement:t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName===""&&(t.style.viewTransitionName="none",t.animate({opacity:[0,0],pointerEvents:["none","none"]},{duration:0,fill:"forwards",pseudoElement:"::view-transition-group(root)"}),t.animate({width:[0,0],height:[0,0]},{duration:0,fill:"forwards",pseudoElement:"::view-transition"})),Ad=!0}Ki=null;break;case 5:br(n,t);break;case 4:r=$i,$i=!1,br(n,t),$i&&(Ec=!0),$i=r;break;case 22:t.memoizedState===null&&(a.memoizedState!==null?yd(t,!1):br(n,t));break;case 30:r=$i,c=L0(),$i=!1,br(n,t),$i&&(t.flags|=4);var u=t.memoizedProps,g=t.stateNode;n=ga(u,g),g=ga(a.memoizedProps,g);var C=xa(u.default,u.update);C==="none"?n=!1:(u=a.memoizedState,a.memoizedState=null,a=t.child,Zn=0,n=Ed(t,a,n,g,C,u,!0),Zn!==(u===null?0:u.length)&&(t.flags|=32)),(t.flags&4)!==0&&n?(Dr(t,t.memoizedProps.onUpdate),Ki=c):c!==null&&(c.push.apply(c,Ki),Ki=c),$i=(t.flags&32)!==0?!0:r;break;default:br(n,t)}}function ta(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)F0(t,n.alternate,n),n=n.sibling}function ts(t,n){for(t=t.child;t!==null;){var a=t,r=n;switch(a.tag){case 0:case 11:case 14:case 15:$a(4,a,a.return),ts(a,r);break;case 1:Un(a,a.return);var c=a.stateNode;typeof c.componentWillUnmount=="function"&&C0(a,a.return,c),ts(a,r);break;case 27:(r&2)!==0&&jx(a.stateNode,a.type,a.memoizedProps);case 5:Un(a,a.return),a.tag!==5&&a.tag!==27||Vo(a),ts(a,r);break;case 6:Vo(a);break;case 26:Un(a,a.return),c=a.stateNode,a.memoizedState!==null||c===null||We||c.parentNode.removeChild(c),ts(a,r);break;case 22:a.memoizedState===null&&ts(a,r);break;case 30:Un(a,a.return),ts(a,r);break;case 7:Un(a,a.return);default:ts(a,r)}t=t.sibling}}function Li(t,n,a){for(a=(n.subtreeFlags&8772)!==0?a:a&-2,n=n.child;n!==null;){var r=n.alternate,c=t,u=n,g=u.flags,C=(a&1)!==0;switch(u.tag){case 0:case 11:case 15:Li(c,u,a),Go(4,u);break;case 1:if(Li(c,u,a),r=u,c=r.stateNode,typeof c.componentDidMount=="function")try{c.componentDidMount()}catch(ht){qe(r,r.return,ht)}if(r=u,c=r.updateQueue,c!==null){var B=r.stateNode;try{var tt=c.shared.hiddenCallbacks;if(tt!==null)for(c.shared.hiddenCallbacks=null,c=0;c<tt.length;c++)mg(tt[c],B)}catch(ht){qe(r,r.return,ht)}}C&&g&64&&R0(u),Zi(u,u.return);break;case 27:(a&2)!==0&&N0(u);case 5:u.tag!==5&&u.tag!==27||w0(u),Li(c,u,a),C&&r===null&&g&4&&gd(u),Zi(u,u.return);break;case 6:w0(u);break;case 26:B=u.stateNode,u.memoizedState!==null||B===null||Tn||dh(Jo(B.ownerDocument),u.type,B),Li(c,u,a),C&&r===null&&g&4&&gd(u),Zi(u,u.return);break;case 12:Li(c,u,a);break;case 31:Li(c,u,a),C&&g&4&&k0(c,u);break;case 13:Li(c,u,a),C&&g&4&&X0(c,u);break;case 22:u.memoizedState===null&&Li(c,u,a),Zi(u,u.return);break;case 30:Li(c,u,a),Zi(u,u.return);break;case 7:Zi(u,u.return);default:Li(c,u,a)}n=n.sibling}}function wd(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Co(a))}function Dd(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Co(t))}function Ei(t,n,a,r){var c=(a&335544064)===a;if(n.subtreeFlags&(c?10262:10256))for(n=n.child;n!==null;)Y0(t,n,a,r),n=n.sibling;else c&&I0(n)}function Y0(t,n,a,r){var c=(a&335544064)===a;c&&n.alternate===null&&n.return!==null&&n.return.alternate!==null&&bc(n);var u=n.flags;switch(n.tag){case 0:case 11:case 15:Ei(t,n,a,r),u&2048&&Go(9,n);break;case 1:Ei(t,n,a,r);break;case 3:Ei(t,n,a,r),c&&Ad&&(t=t.containerInfo,t=t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,t.style.viewTransitionName==="root"&&(t.style.viewTransitionName=""),t=t.ownerDocument.documentElement,t!==null&&t.style.viewTransitionName==="none"&&(t.style.viewTransitionName="")),u&2048&&(u=null,n.alternate!==null&&(u=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==u&&(n.refCount++,u!=null&&Co(u)));break;case 12:if(u&2048){Ei(t,n,a,r),u=n.stateNode;try{var g=n.memoizedProps,C=g.id,B=g.onPostCommit;typeof B=="function"&&B(C,n.alternate===null?"mount":"update",u.passiveEffectDuration,-0)}catch(tt){qe(n,n.return,tt)}}else Ei(t,n,a,r);break;case 31:Ei(t,n,a,r);break;case 13:Ei(t,n,a,r);break;case 23:break;case 22:g=n.stateNode,C=n.alternate,n.memoizedState!==null?(c&&C!==null&&C.memoizedState===null&&bc(C),g._visibility&2?Ei(t,n,a,r):Xo(t,n)):(c&&C!==null&&C.memoizedState!==null&&bc(n),g._visibility&2?Ei(t,n,a,r):(g._visibility|=2,Er(t,n,a,r,(n.subtreeFlags&10256)!==0||!1))),u&2048&&wd(C,n);break;case 24:Ei(t,n,a,r),u&2048&&Dd(n.alternate,n);break;case 30:c&&(u=n.alternate,u!==null&&(Qi(u.child,!0),Qi(n.child,!0))),Ei(t,n,a,r);break;default:Ei(t,n,a,r)}}function Er(t,n,a,r,c){for(c=c&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var u=t,g=n,C=a,B=r,tt=g.flags;switch(g.tag){case 0:case 11:case 15:Er(u,g,C,B,c),Go(8,g);break;case 23:break;case 22:var ht=g.stateNode;g.memoizedState!==null?ht._visibility&2?Er(u,g,C,B,c):Xo(u,g):(ht._visibility|=2,Er(u,g,C,B,c)),c&&tt&2048&&wd(g.alternate,g);break;case 24:Er(u,g,C,B,c),c&&tt&2048&&Dd(g.alternate,g);break;default:Er(u,g,C,B,c)}n=n.sibling}}function Xo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,r=n,c=r.flags;switch(r.tag){case 22:Xo(a,r),c&2048&&wd(r.alternate,r);break;case 24:Xo(a,r),c&2048&&Dd(r.alternate,r);break;default:Xo(a,r)}n=n.sibling}}var Fs=8192;function Hs(t,n,a){if(t.subtreeFlags&Fs)for(t=t.child;t!==null;)Z0(t,n,a),t=t.sibling}function Z0(t,n,a){switch(t.tag){case 26:Hs(t,n,a),t.flags&Fs&&(t.memoizedState!==null?kM(a,Ui,t.memoizedState,t.memoizedProps):(t=t.stateNode,(n&335544128)===n&&nv(a,t)));break;case 5:Hs(t,n,a),t.flags&Fs&&(t=t.stateNode,(n&335544128)===n&&nv(a,t));break;case 3:case 4:var r=Ui;Ui=Jo(t.stateNode.containerInfo),Hs(t,n,a),Ui=r;break;case 22:t.memoizedState===null&&(r=t.alternate,r!==null&&r.memoizedState!==null?(r=Fs,Fs=16777216,Hs(t,n,a),Fs=r):Hs(t,n,a));break;case 30:if((t.flags&Fs)!==0&&(r=t.memoizedProps.name,r!=null&&r!=="auto")){var c=t.stateNode;c.paired=null,ri===null&&(ri=new Map),ri.set(r,c)}Hs(t,n,a);break;default:Hs(t,n,a)}}function K0(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Wo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,J0(r,t)}K0(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Q0(t),t=t.sibling}function Q0(t){switch(t.tag){case 0:case 11:case 15:Wo(t),t.flags&2048&&$a(9,t,t.return);break;case 3:Wo(t);break;case 12:Wo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,Rc(t)):Wo(t);break;default:Wo(t)}}function Rc(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var r=n[a];An=r,J0(r,t)}K0(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:$a(8,n,n.return),Rc(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,Rc(n));break;default:Rc(n)}t=t.sibling}}function J0(t,n){for(;An!==null;){var a=An;switch(a.tag){case 0:case 11:case 15:$a(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var r=a.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Co(a.memoizedState.cache)}if(r=a.child,r!==null)r.return=a,An=r;else t:for(a=t;An!==null;){r=An;var c=r.sibling,u=r.return;if(G0(r),r===a){An=null;break t}if(c!==null){c.return=u,An=c;break t}An=u}}}var BS={getCacheForType:function(t){var n=wn(hn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return wn(hn).controller.signal}},FS=typeof WeakMap=="function"?WeakMap:Map,ke=0,$e=null,we=null,Oe=0,je=0,oi=null,es=!1,Tr=!1,Nd=!1,Aa=0,fn=0,ns=0,Gs=0,Cc=0,li=0,Ar=0,jo=null,Qn=null,Ud=!1,wc=0,$0=0,Dc=1/0,Nc=null,is=null,rn=0,Oi=null,Vs=null,ea=0,Ld=0,Od=null,tx=null,Rr=null,Cr=null,wr=null,qo=0,Uc=null;function ci(){return(ke&2)!==0&&Oe!==0?Oe&-Oe:gt.T!==null?Xd():Dl()}function ex(){if(li===0)if((Oe&536870912)===0||Ae){var t=Ss;Ss<<=1,(Ss&3932160)===0&&(Ss=262144),li=t}else li=536870912;return t=Dn.current,t!==null&&(t.flags|=32),li}function Dr(t,n){if(n!=null){var a=t.stateNode,r=a.ref;r===null&&(r=a.ref=Px(ga(t.memoizedProps,a))),Cr===null&&(Cr=[]),Cr.push(n.bind(null,r))}}function Jn(t,n,a){(t===$e&&(je===2||je===9)||t.cancelPendingCommit!==null)&&(Nr(t,0),as(t,Oe,li,!1)),Xi(t,a),((ke&2)===0||t!==$e)&&(t===$e&&((ke&2)===0&&(Gs|=a),fn===4&&as(t,Oe,li,!1)),na(t))}function nx(t,n,a){if((ke&6)!==0)throw Error(s(327));var r=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Fa(t,n),c=r?VS(t,n):Id(t,n,!0),u=r;do{if(c===0){Tr&&!r&&as(t,n,0,!1);break}else{if(a=t.current.alternate,u&&!HS(a)){c=Id(t,n,!1),u=!1;continue}if(c===2){if(u=n,t.errorRecoveryDisabledLanes&u)var g=0;else g=t.pendingLanes&-536870913,g=g!==0?g:g&536870912?536870912:0;if(g!==0){n=g;t:{var C=t;c=jo;var B=C.current.memoizedState.isDehydrated;if(B&&(Nr(C,g).flags|=256),g=Id(C,g,!1),g!==2&&g!==6){if(Nd&&!B){C.errorRecoveryDisabledLanes|=u,Gs|=u,c=4;break t}u=Qn,Qn=c,u!==null&&(Qn===null?Qn=u:Qn.push.apply(Qn,u))}c=g}if(u=!1,c!==2)continue}}if(c===1){Nr(t,0),as(t,n,0,!0);break}t:{switch(r=t,u=c,u){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n&&(n&62914560)!==n)break;case 6:as(r,n,li,!es);break t;case 2:Qn=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(c=wc+300-qt(),10<c)){if(as(r,n,li,!es),Ms(r,0,!0)!==0)break t;ea=n,r.timeoutHandle=eh(ix.bind(null,r,a,Qn,Nc,Ud,n,li,Gs,Ar,es,u,"Throttled",-0,0),c);break t}ix(r,a,Qn,Nc,Ud,n,li,Gs,Ar,es,u,null,-0,0)}}break}while(!0);na(t)}function ix(t,n,a,r,c,u,g,C,B,tt,ht,yt,K,dt){t.timeoutHandle=-1;var zt=n.subtreeFlags,ee=(u&335544064)===u;if(yt=null,(ee||zt&8192||(zt&16785408)===16785408)&&(yt={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ji},ri=null,Z0(n,u,yt),ee&&(zt=yt,ee=t.containerInfo,ee=(ee.nodeType===9?ee:ee.ownerDocument).__reactViewTransition,ee!=null&&(zt.count++,zt.waitingForViewTransition=!0,zt=el.bind(zt),ee.finished.then(zt,zt))),zt=(u&62914560)===u?wc-qt():(u&4194048)===u?$0-qt():0,zt=XM(yt,zt),zt!==null)){ea=u,t.cancelPendingCommit=zt(fx.bind(null,t,n,u,a,r,c,g,C,B,tt,ht,yt,null,K,dt)),as(t,u,g,!tt);return}fx(t,n,u,a,r,c,g,C,B,tt,ht,yt)}function HS(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var r=0;r<a.length;r++){var c=a[r],u=c.getSnapshot;c=c.value;try{if(!ai(u(),c))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function as(t,n,a,r){n=ki(t,n),n&=~Cc,n&=~Gs,t.suspendedLanes|=n,t.pingedLanes&=~n,r&&(t.warmLanes|=n),r=t.expirationTimes;for(var c=n;0<c;){var u=31-ve(c),g=1<<u;r[u]=-1,c&=~g}a!==0&&bs(t,a,n)}function Lc(){return(ke&6)===0?(Yo(0),!1):!0}function Pd(){if(we!==null){if(je===0)var t=we.return;else t=we,ya=ws=null,kf(t),xr=null,No=0,t=we;for(;t!==null;)A0(t.alternate,t),t=t.return;we=null}}function Nr(t,n){var a=t.timeoutHandle;return a!==-1&&(t.timeoutHandle=-1,uM(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),ea=0,Pd(),$e=t,we=a=va(t.current,null),Oe=n,je=0,oi=null,es=!1,Tr=Fa(t,n),Nd=!1,Ar=li=Cc=Gs=ns=fn=0,Qn=jo=null,Ud=!1,Aa=ki(t,n),Gl(),a}function ax(t,n){Se=null,gt.H=dc,n===gr||n===Jl?(n=fg(),je=3):n===Df?(n=fg(),je=4):je=n===ad?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,oi=n,we===null&&(fn=1,hc(t,yi(n,t.current)))}function sx(){var t=Dn.current;return t===null?!0:(Oe&4194048)===Oe?In===null:(Oe&62914560)===Oe||(Oe&536870912)!==0?t===In:!1}function rx(){var t=gt.H;return gt.H=dc,t===null?dc:t}function ox(){var t=gt.A;return gt.A=BS,t}function Oc(){fn=4,es||(Oe&4194048)!==Oe&&Dn.current!==null||(Tr=!0),(ns&134217727)===0&&(Gs&134217727)===0||$e===null||as($e,Oe,li,!1)}function Id(t,n,a){var r=ke;ke|=2;var c=rx(),u=ox();($e!==t||Oe!==n)&&(Nc=null,Nr(t,n)),n=!1;var g=fn;t:do try{if(je!==0&&we!==null){var C=we,B=oi;switch(je){case 8:Pd(),g=6;break t;case 3:case 2:case 9:case 6:Dn.current===null&&(n=!0);var tt=je;if(je=0,oi=null,Ur(t,C,B,tt),a&&Tr){g=0;break t}break;default:tt=je,je=0,oi=null,Ur(t,C,B,tt)}}GS(),g=fn;break}catch(ht){ax(t,ht)}while(!0);return n&&t.shellSuspendCounter++,ya=ws=null,ke=r,gt.H=c,gt.A=u,we===null&&($e=null,Oe=0,Gl()),g}function GS(){for(;we!==null;)lx(we)}function VS(t,n){var a=ke;ke|=2;var r=rx(),c=ox();$e!==t||Oe!==n?(Nc=null,Dc=qt()+500,Nr(t,n)):Tr=Fa(t,n);t:do try{if(je!==0&&we!==null){n=we;var u=oi;e:switch(je){case 1:je=0,oi=null,Ur(t,n,u,1);break;case 2:case 9:if(cg(u)){je=0,oi=null,cx(n);break}n=function(){je!==2&&je!==9||$e!==t||(je=7),na(t)},u.then(n,n);break t;case 3:je=7;break t;case 4:je=5;break t;case 7:cg(u)?(je=0,oi=null,cx(n)):(je=0,oi=null,Ur(t,n,u,7));break;case 5:var g=null;switch(we.tag){case 26:g=we.memoizedState;case 5:case 27:var C=we;if(g?tv(g):C.stateNode.complete){je=0,oi=null;var B=C.sibling;if(B!==null)we=B;else{var tt=C.return;tt!==null?(we=tt,Pc(tt)):we=null}break e}}je=0,oi=null,Ur(t,n,u,5);break;case 6:je=0,oi=null,Ur(t,n,u,6);break;case 8:Pd(),fn=6;break t;default:throw Error(s(462))}}kS();break}catch(ht){ax(t,ht)}while(!0);return ya=ws=null,gt.H=r,gt.A=c,ke=a,we!==null?0:($e=null,Oe=0,Gl(),fn)}function kS(){for(;we!==null&&!Ft();)lx(we)}function lx(t){var n=E0(t.alternate,t,Aa);t.memoizedProps=t.pendingProps,n===null?Pc(t):we=n}function cx(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=x0(a,n,n.pendingProps,n.type,void 0,Oe);break;case 11:n=x0(a,n,n.pendingProps,n.type.render,n.ref,Oe);break;case 5:kf(n);var r=n;r===En&&(Ae?(ql(r),r.tag===5&&r.stateNode!=null&&(en=r.stateNode)):(ql(r),Ae=!0));default:A0(a,n),n=we=Jm(n,Aa),n=E0(a,n,Aa)}t.memoizedProps=t.pendingProps,n===null?Pc(t):we=n}function Ur(t,n,a,r){ya=ws=null,kf(n),xr=null,No=0;var c=n.return;try{if(DS(t,c,n,a,Oe)){fn=1,hc(t,yi(a,t.current)),we=null;return}}catch(u){if(c!==null)throw we=c,u;fn=1,hc(t,yi(a,t.current)),we=null;return}n.flags&32768?(Ae||r===1?t=!0:Tr||(Oe&536870912)!==0?t=!1:(es=t=!0,(r===2||r===9||r===3||r===6)&&(r=Dn.current,r!==null&&r.tag===13&&(r.flags|=16384))),ux(n,t)):Pc(n)}function Pc(t){var n=t;do{if((n.flags&32768)!==0){ux(n,es);return}t=n.return;var a=OS(n.alternate,n,Aa);if(a!==null){we=a;return}if(n=n.sibling,n!==null){we=n;return}we=n=t}while(n!==null);fn===0&&(fn=5)}function ux(t,n){do{var a=PS(t.alternate,t);if(a!==null){a.flags&=32767,we=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){we=t;return}we=t=a}while(t!==null);fn=6,we=null}function fx(t,n,a,r,c,u,g,C,B,tt,ht,yt){t.cancelPendingCommit=null;do Ic();while(rn!==0);if((ke&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));t===$e&&(we=$e=null,Oe=0),Vs=n,Oi=t,ea=a,Od=c,tx=r,XS(t,n,a,g,C,B,yt)}}function XS(t,n,a,r,c,u,g){var C=n.lanes|n.childLanes;if(Ld=C,C|=xf,wl(t,a,C,r,c,u),Cr=null,(a&335544064)===a?(wr=vS(t),r=10262):(wr=null,r=10256),(n.subtreeFlags&r)!==0||(n.flags&r)!==0?(t.callbackNode=null,t.callbackPriority=0,KS(Ut,function(){return Hd(),null})):(t.callbackNode=null,t.callbackPriority=0),Sc=!1,r=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null,c=Nt.p,Nt.p=2,u=ke,ke|=4;try{IS(t,n,a)}finally{ke=u,Nt.p=c,gt.T=r}}rn=1,Sc?Rr=gM(g,t.containerInfo,wr,zd,Bd,jS,Fd,Hd,WS):(zd(),Bd(),Fd())}function WS(t){if(rn!==0){var n=Oi.onRecoverableError;n(t,{componentStack:null})}}function jS(){rn===3&&(rn=0,q0(Vs,Oi),rn=4)}function zd(){if(rn===1){rn=0;var t=Oi,n=Vs,a=ea,r=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||r){r=gt.T,gt.T=null;var c=Nt.p;Nt.p=2;var u=ke;ke|=4;try{ko=Ec=!1,W0(n,t,a),a=Jd;var g=Vm(t.containerInfo),C=a.focusedElem,B=a.selectionRange;if(g!==C&&C&&C.ownerDocument&&Gm(C.ownerDocument.documentElement,C)){if(B!==null&&df(C)){var tt=B.start,ht=B.end;if(ht===void 0&&(ht=tt),"selectionStart"in C)C.selectionStart=tt,C.selectionEnd=Math.min(ht,C.value.length);else{var yt=C.ownerDocument||document,K=yt&&yt.defaultView||window;if(K.getSelection){var dt=K.getSelection(),zt=C.textContent.length,ee=Math.min(B.start,zt),Me=B.end===void 0?ee:Math.min(B.end,zt);!dt.extend&&ee>Me&&(g=Me,Me=ee,ee=g);var $=Hm(C,ee),j=Hm(C,Me);if($&&j&&(dt.rangeCount!==1||dt.anchorNode!==$.node||dt.anchorOffset!==$.offset||dt.focusNode!==j.node||dt.focusOffset!==j.offset)){var ot=yt.createRange();ot.setStart($.node,$.offset),dt.removeAllRanges(),ee>Me?(dt.addRange(ot),dt.extend(j.node,j.offset)):(ot.setEnd(j.node,j.offset),dt.addRange(ot))}}}}for(yt=[],dt=C;dt=dt.parentNode;)dt.nodeType===1&&yt.push({element:dt,left:dt.scrollLeft,top:dt.scrollTop});for(typeof C.focus=="function"&&C.focus(),C=0;C<yt.length;C++){var _t=yt[C];_t.element.scrollLeft=_t.left,_t.element.scrollTop=_t.top}}Hr=!!Qd,Jd=Qd=null}finally{ke=u,Nt.p=c,gt.T=r}}t.current=n,rn=2}}function Bd(){if(rn===2){rn=0;var t=Oi,n=Vs,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=gt.T,gt.T=null;var r=Nt.p;Nt.p=2;var c=ke;ke|=4;try{F0(t,n.alternate,n)}finally{ke=c,Nt.p=r,gt.T=a}}rn=3}}function Fd(){if(rn===4||rn===3){rn=0;var t=Rr;Rr=null,Bt();var n=Oi,a=Vs,r=ea,c=tx,u=(r&335544064)===r?10262:10256;if((a.subtreeFlags&u)!==0||(a.flags&u)!==0?rn=5:(rn=0,Vs=Oi=null,dx(n,n.pendingLanes)),u=n.pendingLanes,u===0&&(is=null),go(r),a=a.stateNode,kt&&typeof kt.onCommitFiberRoot=="function")try{kt.onCommitFiberRoot(ne,a,void 0,(a.current.flags&128)===128)}catch{}if(c!==null){a=gt.T,u=Nt.p,Nt.p=2,gt.T=null;try{for(var g=n.onRecoverableError,C=0;C<c.length;C++){var B=c[C];g(B.value,{componentStack:B.stack})}}finally{gt.T=a,Nt.p=u}}if(c=Cr,g=wr,wr=null,c!==null&&(Cr=null,g===null&&(g=[]),t!==null))for(B=0;B<c.length;B++)a=(0,c[B])(g),a!==void 0&&t.finished.finally(a);(ea&3)!==0&&Ic(),na(n),u=n.pendingLanes,(r&261930)!==0&&(u&42)!==0?n===Uc?qo++:(qo=0,Uc=n):(qo=0,Uc=null),Yo(0)}}function dx(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Co(n)))}function Ic(){return Rr!==null&&(Rr.skipTransition(),Rr=null),zd(),Bd(),Fd(),Hd()}function Hd(){if(rn!==5)return!1;var t=Oi,n=Ld;Ld=0;var a=go(ea),r=gt.T,c=Nt.p;try{Nt.p=32>a?32:a,gt.T=null,a=Od,Od=null;var u=Oi,g=ea;if(rn=0,Vs=Oi=null,ea=0,(ke&6)!==0)throw Error(s(331));var C=ke;if(ke|=4,Q0(u.current),Y0(u,u.current,g,a),ke=C,Yo(0,!1),kt&&typeof kt.onPostCommitFiberRoot=="function")try{kt.onPostCommitFiberRoot(ne,u)}catch{}return!0}finally{Nt.p=c,gt.T=r,dx(t,n)}}function hx(t,n,a){n=yi(a,n),n=id(t.stateNode,n,2),t=Za(t,n,2),t!==null&&(Xi(t,2),na(t))}function qe(t,n,a){if(t.tag===3)hx(t,t,a);else for(;n!==null;){if(n.tag===3){hx(n,t,a);break}else if(n.tag===1){var r=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(is===null||!is.has(r))){t=yi(a,t),a=c0(2),r=Za(n,a,2),r!==null&&(u0(a,r,n,t),Xi(r,2),na(r));break}}n=n.return}}function Gd(t,n,a){var r=t.pingCache;if(r===null){r=t.pingCache=new FS;var c=new Set;r.set(n,c)}else c=r.get(n),c===void 0&&(c=new Set,r.set(n,c));c.has(a)||(Nd=!0,c.add(a),t=qS.bind(null,t,n,a),n.then(t,t))}function qS(t,n,a){var r=t.pingCache;r!==null&&r.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,$e===t&&(Oe&a)===a&&((fn===4||fn===3&&(Oe&62914560)===Oe&&300>qt()-wc)&&(ke&2)===0?Nr(t,0):Cc|=a,Ar===Oe&&(Ar=0)),na(t)}function px(t,n){n===0&&(n=fo()),t=As(t,n),t!==null&&(Xi(t,n),na(t))}function YS(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),px(t,a)}function ZS(t,n){var a=0;switch(t.tag){case 31:case 13:var r=t.stateNode,c=t.memoizedState;c!==null&&(a=c.retryLane);break;case 19:r=t.stateNode;break;case 22:r=t.stateNode._retryCache;break;default:throw Error(s(314))}r!==null&&r.delete(n),px(t,a)}function KS(t,n){return Lt(t,n)}var Lr=null,Or=null,Vd=!1,zc=!1,kd=!1,ss=0;function na(t){t!==Or&&t.next===null&&(Or===null?Lr=Or=t:Or=Or.next=t),zc=!0,Vd||(Vd=!0,JS())}function Yo(t,n){if(!kd&&zc){kd=!0;do for(var a=!1,r=Lr;r!==null;){if(t!==0){var c=r.pendingLanes;if(c===0)var u=0;else{var g=r.suspendedLanes,C=r.pingedLanes;u=(1<<31-ve(42|t)+1)-1,u&=c&~(g&~C),u=u&201326741?u&201326741|1:u?u|2:0}u!==0&&(a=!0,vx(r,u))}else u=Oe,u=Ms(r,r===$e?u:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),(u&3)===0||Fa(r,u)||(a=!0,vx(r,u));r=r.next}while(a);kd=!1}}function QS(){mx()}function mx(){zc=Vd=!1;var t=0;ss!==0&&cM()&&(t=ss);for(var n=qt(),a=null,r=Lr;r!==null;){var c=r.next,u=gx(r,n);u===0?(r.next=null,a===null?Lr=c:a.next=c,c===null&&(Or=a)):(a=r,(t!==0||(u&3)!==0)&&(zc=!0)),r=c}rn!==0&&rn!==5||Yo(t),ss!==0&&(ss=0)}function gx(t,n){for(var a=t.suspendedLanes,r=t.pingedLanes,c=t.expirationTimes,u=t.pendingLanes&-62914561;0<u;){var g=31-ve(u),C=1<<g,B=c[g];B===-1?((C&a)===0||(C&r)!==0)&&(c[g]=uo(C,n)):B<=n&&(t.expiredLanes|=C),u&=~C}if(n=$e,a=Oe,a=Ms(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r=t.callbackNode,a===0||t===n&&(je===2||je===9)||t.cancelPendingCommit!==null)return r!==null&&r!==null&&ie(r),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Fa(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(r!==null&&ie(r),go(a)){case 2:case 8:a=Z;break;case 32:a=Ut;break;case 268435456:a=Pt;break;default:a=Ut}return r=xx.bind(null,t),a=Lt(a,r),t.callbackPriority=n,t.callbackNode=a,n}return r!==null&&r!==null&&ie(r),t.callbackPriority=2,t.callbackNode=null,2}function xx(t,n){if(rn!==0&&rn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(Ic()&&t.callbackNode!==a)return null;var r=Oe;return r=Ms(t,t===$e?r:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),r===0?null:(nx(t,r,n),gx(t,qt()),t.callbackNode!=null&&t.callbackNode===a?xx.bind(null,t):null)}function vx(t,n){if(Ic())return null;nx(t,n,!0)}function JS(){fM(function(){(ke&6)!==0?Lt(ge,QS):mx()})}function Xd(){if(ss===0){var t=Us;t===0&&(t=er,er<<=1,(er&261888)===0&&(er=256)),ss=t}return ss}function _x(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Ll(t)}function $S(t,n,a,r,c){if(n==="submit"&&a&&a.stateNode===c){var u=_x((c[W]||null).action),g=r.submitter;g&&(n=(n=g[W]||null)?_x(n.formAction):g.getAttribute("formAction"),n!==null&&(u=n,g=null));var C=new zl("action","action",null,r,c);t.push({event:C,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(ss!==0){var B=new FormData(c,g);Jf(a,{pending:!0,data:B,method:c.method,action:u},null,B)}}else typeof u=="function"&&(C.preventDefault(),B=new FormData(c,g),Jf(a,{pending:!0,data:B,method:c.method,action:u},u,B))},currentTarget:c}]})}}for(var Wd=0;Wd<gf.length;Wd++){var jd=gf[Wd],tM=jd.toLowerCase(),eM=jd[0].toUpperCase()+jd.slice(1);Di(tM,"on"+eM)}Di(Wm,"onAnimationEnd"),Di(jm,"onAnimationIteration"),Di(qm,"onAnimationStart"),Di("dblclick","onDoubleClick"),Di("focusin","onFocus"),Di("focusout","onBlur"),Di(uS,"onTransitionRun"),Di(fS,"onTransitionStart"),Di(dS,"onTransitionCancel"),Di(Ym,"onTransitionEnd"),ln("onMouseEnter",["mouseout","mouseover"]),ln("onMouseLeave",["mouseout","mouseover"]),ln("onPointerEnter",["pointerout","pointerover"]),ln("onPointerLeave",["pointerout","pointerover"]),Gt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Gt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Gt("onBeforeInput",["compositionend","keypress","textInput","paste"]),Gt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Gt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Gt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Zo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),nM=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zo));function yx(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var r=t[a],c=r.event;r=r.listeners;t:{var u=void 0;if(n)for(var g=r.length-1;0<=g;g--){var C=r[g],B=C.instance,tt=C.currentTarget;if(C=C.listener,B!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=tt;try{u(c)}catch(ht){Hl(ht)}c.currentTarget=null,u=B}else for(g=0;g<r.length;g++){if(C=r[g],B=C.instance,tt=C.currentTarget,C=C.listener,B!==u&&c.isPropagationStopped())break t;u=C,c.currentTarget=tt;try{u(c)}catch(ht){Hl(ht)}c.currentTarget=null,u=B}}}}function De(t,n){var a=n[ut];a===void 0&&(a=n[ut]=new Set);var r=t+"__bubble";a.has(r)||(Sx(n,t,2,!1),a.add(r))}function qd(t,n,a){var r=0;n&&(r|=4),Sx(a,t,r,n)}var Bc="_reactListening"+Math.random().toString(36).slice(2);function Yd(t){if(!t[Bc]){t[Bc]=!0,Xe.forEach(function(a){a!=="selectionchange"&&(nM.has(a)||qd(a,!1,t),qd(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[Bc]||(n[Bc]=!0,qd("selectionchange",!1,n))}}function Sx(t,n,a,r){switch(uv(n)){case 2:var c=YM;break;case 8:c=ZM;break;default:c=ph}a=c.bind(null,n,a,t),c=void 0,!ef||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(c=!0),r?c!==void 0?t.addEventListener(n,a,{capture:!0,passive:c}):t.addEventListener(n,a,!0):c!==void 0?t.addEventListener(n,a,{passive:c}):t.addEventListener(n,a,!1)}function Zd(t,n,a,r,c){var u=r;if((n&1)===0&&(n&2)===0&&r!==null)t:for(;;){if(r===null)return;var g=r.tag;if(g===3||g===4){var C=r.stateNode.containerInfo;if(C===c)break;if(g===4)for(g=r.return;g!==null;){var B=g.tag;if((B===3||B===4)&&g.stateNode.containerInfo===c)return;g=g.return}for(;C!==null;){if(g=fe(C),g===null)return;if(B=g.tag,B===5||B===6||B===26||B===27){r=u=g;continue t}C=C.parentNode}}r=r.return}Sm(function(){var tt=u,ht=$u(a),yt=[];t:{var K=Zm.get(t);if(K!==void 0){var dt=zl,zt=t;switch(t){case"keypress":if(Pl(a)===0)break t;case"keydown":case"keyup":dt=Hy;break;case"focusin":zt="focus",dt=rf;break;case"focusout":zt="blur",dt=rf;break;case"beforeblur":case"afterblur":dt=rf;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":dt=Em;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":dt=Cy;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":dt=Wy;break;case Wm:case jm:case qm:dt=Ny;break;case Ym:dt=qy;break;case"scroll":case"scrollend":dt=Ay;break;case"wheel":dt=Zy;break;case"copy":case"cut":case"paste":dt=Ly;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":dt=Am;break;case"submit":dt=ky;break;case"toggle":case"beforetoggle":dt=Qy}var ee=(n&4)!==0,Me=!ee&&(t==="scroll"||t==="scrollend"),$=ee?K!==null?K+"Capture":null:K;ee=[];for(var j=tt,ot;j!==null;){var _t=j;if(ot=_t.stateNode,_t=_t.tag,_t!==5&&_t!==26&&_t!==27||ot===null||$===null||(_t=xo(j,$),_t!=null&&ee.push(Ko(j,_t,ot))),Me)break;j=j.return}0<ee.length&&(K=new dt(K,zt,null,a,ht),yt.push({event:K,listeners:ee}))}}if((n&7)===0){t:{if(dt=t==="mouseover"||t==="pointerover",K=t==="mouseout"||t==="pointerout",dt&&a!==Ju&&(zt=a.relatedTarget||a.fromElement)&&(fe(zt)||zt[pt]))break t;(K||dt)&&(zt=ht.window===ht?ht:(dt=ht.ownerDocument)?dt.defaultView||dt.parentWindow:window,K?(dt=a.relatedTarget||a.toElement,K=tt,dt=dt?fe(dt):null,dt!==null&&(Me=f(dt),ee=dt.tag,dt!==Me||ee!==5&&ee!==27&&ee!==6)&&(dt=null)):(K=null,dt=tt),K!==dt&&(ee=Em,_t="onMouseLeave",$="onMouseEnter",j="mouse",(t==="pointerout"||t==="pointerover")&&(ee=Am,_t="onPointerLeave",$="onPointerEnter",j="pointer"),Me=K==null?zt:Kt(K),ot=dt==null?zt:Kt(dt),zt=new ee(_t,j+"leave",K,a,ht),zt.target=Me,zt.relatedTarget=ot,_t=null,fe(ht)===tt&&(ee=new ee($,j+"enter",dt,a,ht),ee.target=ot,ee.relatedTarget=Me,_t=ee),Me=_t,ee=K&&dt?w(K,dt,iM):null,K!==null&&Mx(yt,zt,K,ee,!1),dt!==null&&Me!==null&&Mx(yt,Me,dt,ee,!0)))}t:{if(K=tt?Kt(tt):window,dt=K.nodeName&&K.nodeName.toLowerCase(),dt==="select"||dt==="input"&&K.type==="file")var Qt=Om;else if(Um(K))if(Pm)Qt=oS;else{Qt=sS;var Pe=aS}else dt=K.nodeName,!dt||dt.toLowerCase()!=="input"||K.type!=="checkbox"&&K.type!=="radio"?tt&&Qu(tt.elementType)&&(Qt=Om):Qt=rS;if(Qt&&(Qt=Qt(t,tt))){Lm(yt,Qt,a,ht);break t}Pe&&Pe(t,K,tt)}switch(Pe=tt?Kt(tt):window,t){case"focusin":(Um(Pe)||Pe.contentEditable==="true")&&(lr=Pe,hf=tt,To=null);break;case"focusout":To=hf=lr=null;break;case"mousedown":pf=!0;break;case"contextmenu":case"mouseup":case"dragend":pf=!1,km(yt,a,ht);break;case"selectionchange":if(cS)break;case"keydown":case"keyup":km(yt,a,ht)}var re;if(lf)t:{switch(t){case"compositionstart":var ce="onCompositionStart";break t;case"compositionend":ce="onCompositionEnd";break t;case"compositionupdate":ce="onCompositionUpdate";break t}ce=void 0}else or?Dm(t,a)&&(ce="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(ce="onCompositionStart");ce&&(Rm&&a.locale!=="ko"&&(or||ce!=="onCompositionStart"?ce==="onCompositionEnd"&&or&&(re=Mm()):(Ha=ht,nf="value"in Ha?Ha.value:Ha.textContent,or=!0)),Pe=Fc(tt,ce),0<Pe.length&&(ce=new Tm(ce,t,null,a,ht),yt.push({event:ce,listeners:Pe}),re?ce.data=re:(re=Nm(a),re!==null&&(ce.data=re)))),(re=$y?tS(t,a):eS(t,a))&&(ce=Fc(tt,"onBeforeInput"),0<ce.length&&(Pe=new Tm("onBeforeInput","beforeinput",null,a,ht),yt.push({event:Pe,listeners:ce}),Pe.data=re)),$S(yt,t,tt,a,ht)}yx(yt,n)})}function Ko(t,n,a){return{instance:t,listener:n,currentTarget:a}}function Fc(t,n){for(var a=n+"Capture",r=[];t!==null;){var c=t,u=c.stateNode;if(c=c.tag,c!==5&&c!==26&&c!==27||u===null||(c=xo(t,a),c!=null&&r.unshift(Ko(t,c,u)),c=xo(t,n),c!=null&&r.push(Ko(t,c,u))),t.tag===3)return r;t=t.return}return[]}function iM(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function Mx(t,n,a,r,c){for(var u=n._reactName,g=[];a!==null&&a!==r;){var C=a,B=C.alternate,tt=C.stateNode;if(C=C.tag,B!==null&&B===r)break;C!==5&&C!==26&&C!==27||tt===null||(B=tt,c?(tt=xo(a,u),tt!=null&&g.unshift(Ko(a,tt,B))):c||(tt=xo(a,u),tt!=null&&g.push(Ko(a,tt,B)))),a=a.return}g.length!==0&&t.push({event:n,listeners:g})}var aM=/\r\n?/g,sM=/\u0000|\uFFFD/g;function bx(t){return(typeof t=="string"?t:""+t).replace(aM,`
`).replace(sM,"")}function Ex(t,n){return n=bx(n),bx(t)===n}function Ye(t,n,a,r,c,u){switch(a){case"children":if(typeof r=="string")n==="body"||n==="textarea"&&r===""||ar(t,r);else if(typeof r=="number"||typeof r=="bigint")n!=="body"&&ar(t,""+r);else return;break;case"className":ii(t,"class",r);break;case"tabIndex":ii(t,"tabindex",r);break;case"dir":case"role":case"viewBox":case"width":case"height":ii(t,a,r);break;case"style":_m(t,r,u);return;case"data":if(n!=="object"){ii(t,"data",r);break}case"src":case"href":if(r===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(r==null||typeof r=="function"||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ll(r),t.setAttribute(a,r);break;case"action":case"formAction":if(typeof r=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof u=="function"&&(a==="formAction"?(n!=="input"&&Ye(t,n,"name",c.name,c,null),Ye(t,n,"formEncType",c.formEncType,c,null),Ye(t,n,"formMethod",c.formMethod,c,null),Ye(t,n,"formTarget",c.formTarget,c,null)):(Ye(t,n,"encType",c.encType,c,null),Ye(t,n,"method",c.method,c,null),Ye(t,n,"target",c.target,c,null)));if(r==null||typeof r=="symbol"||typeof r=="boolean"){t.removeAttribute(a);break}r=Ll(r),t.setAttribute(a,r);break;case"onClick":r!=null&&(t.onclick=ji);return;case"onScroll":r!=null&&De("scroll",t);return;case"onScrollEnd":r!=null&&De("scrollend",t);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"multiple":t.multiple=r&&typeof r!="function"&&typeof r!="symbol";break;case"muted":t.muted=r&&typeof r!="function"&&typeof r!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(r==null||typeof r=="function"||typeof r=="boolean"||typeof r=="symbol"){t.removeAttribute("xlink:href");break}a=Ll(r),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"credentialless":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":r&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":r===!0?t.setAttribute(a,""):r!==!1&&r!=null&&typeof r!="function"&&typeof r!="symbol"?t.setAttribute(a,r):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":r!=null&&typeof r!="function"&&typeof r!="symbol"&&!isNaN(r)&&1<=r?t.setAttribute(a,r):t.removeAttribute(a);break;case"rowSpan":case"start":r==null||typeof r=="function"||typeof r=="symbol"||isNaN(r)?t.removeAttribute(a):t.setAttribute(a,r);break;case"popover":De("beforetoggle",t),De("toggle",t),tn(t,"popover",r);break;case"xlinkActuate":Le(t,"http://www.w3.org/1999/xlink","xlink:actuate",r);break;case"xlinkArcrole":Le(t,"http://www.w3.org/1999/xlink","xlink:arcrole",r);break;case"xlinkRole":Le(t,"http://www.w3.org/1999/xlink","xlink:role",r);break;case"xlinkShow":Le(t,"http://www.w3.org/1999/xlink","xlink:show",r);break;case"xlinkTitle":Le(t,"http://www.w3.org/1999/xlink","xlink:title",r);break;case"xlinkType":Le(t,"http://www.w3.org/1999/xlink","xlink:type",r);break;case"xmlBase":Le(t,"http://www.w3.org/XML/1998/namespace","xml:base",r);break;case"xmlLang":Le(t,"http://www.w3.org/XML/1998/namespace","xml:lang",r);break;case"xmlSpace":Le(t,"http://www.w3.org/XML/1998/namespace","xml:space",r);break;case"is":tn(t,"is",r);break;case"innerText":case"textContent":return;default:if(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")a=Ey.get(a)||a,tn(t,a,r);else return}Te=!0}function Kd(t,n,a,r,c,u){switch(a){case"style":_m(t,r,u);return;case"dangerouslySetInnerHTML":if(r!=null){if(typeof r!="object"||!("__html"in r))throw Error(s(61));if(a=r.__html,a!=null){if(c.children!=null)throw Error(s(60));u?.__html!==a&&(t.innerHTML=a)}}break;case"children":if(typeof r=="string")ar(t,r);else if(typeof r=="number"||typeof r=="bigint")ar(t,""+r);else return;break;case"onScroll":r!=null&&De("scroll",t);return;case"onScrollEnd":r!=null&&De("scrollend",t);return;case"onClick":r!=null&&(t.onclick=ji);return;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":return;case"innerText":case"textContent":return;default:if(!vn.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(c=a.endsWith("Capture"),u=a.slice(2,c?a.length-7:void 0),n=t[W]||null,n=n!=null?n[a]:null,typeof n=="function"&&t.removeEventListener(u,n,c),typeof r=="function")){typeof n!="function"&&n!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(u,r,c);break t}Te=!0,a in t?t[a]=r:r===!0?t.setAttribute(a,""):tn(t,a,r)}return}Te=!0}function Ln(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":De("error",t),De("load",t);var r=!1,c=!1,u;for(u in a)if(a.hasOwnProperty(u)){var g=a[u];if(g!=null)switch(u){case"src":r=!0;break;case"srcSet":c=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ye(t,n,u,g,a,null)}}c&&Ye(t,n,"srcSet",a.srcSet,a,null),r&&Ye(t,n,"src",a.src,a,null);return;case"input":De("invalid",t);var C=u=g=c=null,B=null,tt=null;for(r in a)if(a.hasOwnProperty(r)){var ht=a[r];if(ht!=null)switch(r){case"name":c=ht;break;case"type":g=ht;break;case"checked":B=ht;break;case"defaultChecked":tt=ht;break;case"value":u=ht;break;case"defaultValue":C=ht;break;case"children":case"dangerouslySetInnerHTML":if(ht!=null)throw Error(s(137,n));break;default:Ye(t,n,r,ht,a,null)}}mm(t,u,C,B,tt,g,c,!1);return;case"select":De("invalid",t),r=g=u=null;for(c in a)if(a.hasOwnProperty(c)&&(C=a[c],C!=null))switch(c){case"value":u=C;break;case"defaultValue":g=C;break;case"multiple":r=C;default:Ye(t,n,c,C,a,null)}n=u,a=g,t.multiple=!!r,n!=null?ir(t,!!r,n,!1):a!=null&&ir(t,!!r,a,!0);return;case"textarea":De("invalid",t),u=c=r=null;for(g in a)if(a.hasOwnProperty(g)&&(C=a[g],C!=null))switch(g){case"value":r=C;break;case"defaultValue":c=C;break;case"children":u=C;break;case"dangerouslySetInnerHTML":if(C!=null)throw Error(s(91));break;default:Ye(t,n,g,C,a,null)}xm(t,r,c,u);return;case"option":for(B in a)if(a.hasOwnProperty(B)&&(r=a[B],r!=null))switch(B){case"selected":t.selected=r&&typeof r!="function"&&typeof r!="symbol";break;default:Ye(t,n,B,r,a,null)}return;case"dialog":De("beforetoggle",t),De("toggle",t),De("cancel",t),De("close",t);break;case"iframe":case"object":De("load",t);break;case"video":case"audio":for(r=0;r<Zo.length;r++)De(Zo[r],t);break;case"image":De("error",t),De("load",t);break;case"details":De("toggle",t);break;case"embed":case"source":case"link":De("error",t),De("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(tt in a)if(a.hasOwnProperty(tt)&&(r=a[tt],r!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Ye(t,n,tt,r,a,null)}return;default:if(Qu(n)){for(ht in a)a.hasOwnProperty(ht)&&(r=a[ht],r!==void 0&&Kd(t,n,ht,r,a,void 0));return}}for(C in a)a.hasOwnProperty(C)&&(r=a[C],r!=null&&Ye(t,n,C,r,a,null))}var rM={};function oM(t,n,a,r){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var c=null,u=null,g=null,C=null,B=null,tt=null,ht=null;for(dt in a){var yt=a[dt];if(a.hasOwnProperty(dt)&&yt!=null)switch(dt){case"checked":break;case"value":break;case"defaultValue":B=yt;default:r.hasOwnProperty(dt)||Ye(t,n,dt,null,r,yt)}}for(var K in r){var dt=r[K];if(yt=a[K],r.hasOwnProperty(K)&&(dt!=null||yt!=null))switch(K){case"type":dt!==yt&&(Te=!0),u=dt;break;case"name":dt!==yt&&(Te=!0),c=dt;break;case"checked":dt!==yt&&(Te=!0),tt=dt;break;case"defaultChecked":dt!==yt&&(Te=!0),ht=dt;break;case"value":dt!==yt&&(Te=!0),g=dt;break;case"defaultValue":dt!==yt&&(Te=!0),C=dt;break;case"children":case"dangerouslySetInnerHTML":if(dt!=null)throw Error(s(137,n));break;default:dt!==yt&&Ye(t,n,K,dt,r,yt)}}Zu(t,g,C,B,tt,ht,u,c);return;case"select":dt=g=C=K=null;for(u in a)if(B=a[u],a.hasOwnProperty(u)&&B!=null)switch(u){case"value":break;case"multiple":dt=B;default:r.hasOwnProperty(u)||Ye(t,n,u,null,r,B)}for(c in r)if(u=r[c],B=a[c],r.hasOwnProperty(c)&&(u!=null||B!=null))switch(c){case"value":u!==B&&(Te=!0),K=u;break;case"defaultValue":u!==B&&(Te=!0),C=u;break;case"multiple":u!==B&&(Te=!0),g=u;default:u!==B&&Ye(t,n,c,u,r,B)}n=C,a=g,r=dt,K!=null?ir(t,!!a,K,!1):!!r!=!!a&&(n!=null?ir(t,!!a,n,!0):ir(t,!!a,a?[]:"",!1));return;case"textarea":dt=K=null;for(C in a)if(c=a[C],a.hasOwnProperty(C)&&c!=null&&!r.hasOwnProperty(C))switch(C){case"value":break;case"children":break;default:Ye(t,n,C,null,r,c)}for(g in r)if(c=r[g],u=a[g],r.hasOwnProperty(g)&&(c!=null||u!=null))switch(g){case"value":c!==u&&(Te=!0),K=c;break;case"defaultValue":c!==u&&(Te=!0),dt=c;break;case"children":break;case"dangerouslySetInnerHTML":if(c!=null)throw Error(s(91));break;default:c!==u&&Ye(t,n,g,c,r,u)}gm(t,K,dt);return;case"option":for(var zt in a)if(K=a[zt],a.hasOwnProperty(zt)&&K!=null&&!r.hasOwnProperty(zt))switch(zt){case"selected":t.selected=!1;break;default:Ye(t,n,zt,null,r,K)}for(B in r)if(K=r[B],dt=a[B],r.hasOwnProperty(B)&&K!==dt&&(K!=null||dt!=null))switch(B){case"selected":K!==dt&&(Te=!0),t.selected=K&&typeof K!="function"&&typeof K!="symbol";break;default:Ye(t,n,B,K,r,dt)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var ee in a)K=a[ee],a.hasOwnProperty(ee)&&K!=null&&!r.hasOwnProperty(ee)&&Ye(t,n,ee,null,r,K);for(tt in r)if(K=r[tt],dt=a[tt],r.hasOwnProperty(tt)&&K!==dt&&(K!=null||dt!=null))switch(tt){case"children":case"dangerouslySetInnerHTML":if(K!=null)throw Error(s(137,n));break;default:Ye(t,n,tt,K,r,dt)}return;default:if(Qu(n)){for(var Me in a)K=a[Me],a.hasOwnProperty(Me)&&K!==void 0&&!r.hasOwnProperty(Me)&&Kd(t,n,Me,void 0,r,K);for(ht in r)K=r[ht],dt=a[ht],!r.hasOwnProperty(ht)||K===dt||K===void 0&&dt===void 0||Kd(t,n,ht,K,r,dt);return}}for(var $ in a)K=a[$],a.hasOwnProperty($)&&K!=null&&!r.hasOwnProperty($)&&Ye(t,n,$,null,r,K);for(yt in r)K=r[yt],dt=a[yt],!r.hasOwnProperty(yt)||K===dt||K==null&&dt==null||Ye(t,n,yt,K,r,dt)}function Tx(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function lM(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),r=0;r<a.length;r++){var c=a[r],u=c.transferSize,g=c.initiatorType,C=c.duration;if(u&&C&&Tx(g)){for(g=0,C=c.responseEnd,r+=1;r<a.length;r++){var B=a[r],tt=B.startTime;if(tt>C)break;var ht=B.transferSize,yt=B.initiatorType;ht&&Tx(yt)&&(B=B.responseEnd,g+=ht*(B<C?1:(C-tt)/(B-tt)))}if(--r,n+=8*(u+g)/(c.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Qd=null,Jd=null;function Qo(t){return t.nodeType===9?t:t.ownerDocument}function Ax(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Rx(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function Cx(t,n,a,r){return a=Qo(a).createElement(t),a[R]=r,a[W]=n,Ln(a,t,n),Ee(a),a}function $d(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var th=null;function cM(){var t=window.event;return t&&t.type==="popstate"?t===th?!1:(th=t,!0):(th=null,!1)}var eh=typeof setTimeout=="function"?setTimeout:void 0,uM=typeof clearTimeout=="function"?clearTimeout:void 0,wx=typeof Promise=="function"?Promise:void 0,Dx=typeof requestAnimationFrame=="function"?requestAnimationFrame:eh,fM=typeof queueMicrotask=="function"?queueMicrotask:typeof wx<"u"?function(t){return wx.resolve(null).then(t).catch(dM)}:eh;function dM(t){setTimeout(function(){throw t})}function rs(t){return t==="head"}function Nx(t,n){var a=n,r=0;do{var c=a.nextSibling;if(t.removeChild(a),c&&c.nodeType===8)if(a=c.data,a==="/$"||a==="/&"){if(r===0){t.removeChild(c),Gr(n);return}r--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")r++;else if(a==="html")ch(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,ch(a);for(var u=a.firstChild;u;){var g=u.nextSibling,C=u.nodeName;u[It]||C==="SCRIPT"||C==="STYLE"||C==="LINK"&&u.rel.toLowerCase()==="stylesheet"||a.removeChild(u),u=g}}else a==="body"&&ch(t.ownerDocument.body);a=c}while(a);Gr(n)}function Ux(t,n){var a=t;t=0;do{var r=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),r&&r.nodeType===8)if(a=r.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=r}while(a)}function Lx(t,n,a){if(n=CSS.escape(n)!==n?"r-"+btoa(n).replace(/=/g,""):n,t.style.viewTransitionName=n,a!=null&&(t.style.viewTransitionClass=a),a=getComputedStyle(t),a.display==="inline"){if(n=t.getClientRects(),n.length===1)var r=1;else for(var c=r=0;c<n.length;c++){var u=n[c];0<u.width&&0<u.height&&r++}r===1&&(t=t.style,t.display=n.length===1?"inline-block":"block",t.marginTop="-"+a.paddingTop,t.marginBottom="-"+a.paddingBottom)}}function Ox(t,n){t=t.style,n=n.style;var a=n!=null?n.hasOwnProperty("viewTransitionName")?n.viewTransitionName:n.hasOwnProperty("view-transition-name")?n["view-transition-name"]:null:null;t.viewTransitionName=a==null||typeof a=="boolean"?"":(""+a).trim(),a=n!=null?n.hasOwnProperty("viewTransitionClass")?n.viewTransitionClass:n.hasOwnProperty("view-transition-class")?n["view-transition-class"]:null:null,t.viewTransitionClass=a==null||typeof a=="boolean"?"":(""+a).trim(),t.display==="inline-block"&&(n==null?t.display=t.margin="":(a=n.display,t.display=a==null||typeof a=="boolean"?"":a,a=n.margin,a!=null?t.margin=a:(a=n.hasOwnProperty("marginTop")?n.marginTop:n["margin-top"],t.marginTop=a==null||typeof a=="boolean"?"":a,n=n.hasOwnProperty("marginBottom")?n.marginBottom:n["margin-bottom"],t.marginBottom=n==null||typeof n=="boolean"?"":n)))}function hM(t,n,a){return a=a.ownerDocument.defaultView,{rect:t,abs:n.position==="absolute"||n.position==="fixed",clip:n.clipPath!=="none"||n.overflow!=="visible"||n.filter!=="none"||n.mask!=="none"||n.mask!=="none"||n.borderRadius!=="0px",view:0<=t.bottom&&0<=t.right&&t.top<=a.innerHeight&&t.left<=a.innerWidth}}function nh(t){var n=t.getBoundingClientRect(),a=getComputedStyle(t);return hM(n,a,t)}function pM(t){return t.documentElement.clientHeight}function mM(t){this.addEventListener("load",t),this.addEventListener("error",t)}function gM(t,n,a,r,c,u,g,C,B){var tt=n.nodeType===9?n:n.ownerDocument;try{var ht=tt.startViewTransition({update:function(){var K=tt.defaultView,dt=K.navigation&&K.navigation.transition,zt=tt.fonts.status;r();var ee=[];if(zt==="loaded"&&(pM(tt),tt.fonts.status==="loading"&&ee.push(tt.fonts.ready)),zt=ee.length,t!==null)for(var Me=t.suspenseyImages,$=0,j=0;j<Me.length;j++){var ot=Me[j];if(!ot.complete){var _t=ot.getBoundingClientRect();if(0<_t.bottom&&0<_t.right&&_t.top<K.innerHeight&&_t.left<K.innerWidth){if($+=ev(ot),$>Vc){ee.length=zt;break}ot=new Promise(mM.bind(ot)),ee.push(ot)}}}if(0<ee.length)return K=Promise.race([Promise.all(ee),new Promise(function(Qt){return setTimeout(Qt,500)})]).then(c,c),(dt?Promise.allSettled([dt.finished,K]):K).then(u,u);if(c(),dt)return dt.finished.then(u,u);u()},types:a});tt.__reactViewTransition=ht;var yt=[];return ht.ready.then(function(){for(var K=tt.documentElement.getAnimations({subtree:!0}),dt=0;dt<K.length;dt++){var zt=K[dt],ee=zt.effect,Me=ee.pseudoElement;if(Me!=null&&Me.startsWith("::view-transition")){yt.push(zt),zt=ee.getKeyframes();for(var $=Me=void 0,j=!0,ot=0;ot<zt.length;ot++){var _t=zt[ot],Qt=_t.width;if(Me===void 0)Me=Qt;else if(Me!==Qt){j=!1;break}if(Qt=_t.height,$===void 0)$=Qt;else if($!==Qt){j=!1;break}delete _t.width,delete _t.height,_t.transform==="none"&&delete _t.transform}j&&Me!==void 0&&$!==void 0&&(ee.setKeyframes(zt),j=getComputedStyle(ee.target,ee.pseudoElement),j.width!==Me||j.height!==$)&&(j=zt[0],j.width=Me,j.height=$,j=zt[zt.length-1],j.width=Me,j.height=$,ee.setKeyframes(zt))}}g()},function(K){tt.__reactViewTransition===ht&&(tt.__reactViewTransition=null);try{if(typeof K=="object"&&K!==null)switch(K.name){case"InvalidStateError":(K.message==="View transition was skipped because document visibility state is hidden."||K.message==="Skipping view transition because document visibility state has become hidden."||K.message==="Skipping view transition because viewport size changed."||K.message==="Transition was aborted because of invalid state")&&(K=null)}K!==null&&B(K)}finally{r(),c(),g()}}),ht.finished.finally(function(){for(var K=0;K<yt.length;K++)yt[K].cancel();tt.__reactViewTransition===ht&&(tt.__reactViewTransition=null),C()}),ht}catch{return r(),c(),g(),null}}function ks(t,n){this._scope=document.documentElement,this._selector="::view-transition-"+t+"("+n+")"}ks.prototype.animate=function(t,n){return n=typeof n=="number"?{duration:n}:O({},n),n.pseudoElement=this._selector,this._scope.animate(t,n)},ks.prototype.getAnimations=function(){for(var t=this._scope,n=this._selector,a=t.getAnimations({subtree:!0}),r=[],c=0;c<a.length;c++){var u=a[c].effect;u!==null&&u.target===t&&u.pseudoElement===n&&r.push(a[c])}return r},ks.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Px(t){return{name:t,group:new ks("group",t),imagePair:new ks("image-pair",t),old:new ks("old",t),new:new ks("new",t)}}function ui(t){this._fragmentFiber=t,this._observers=this._eventListeners=null}ui.prototype.addEventListener=function(t,n,a){var r=null,c=null;if(!(a!=null&&typeof a!="boolean"&&(r=a.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var u=this._eventListeners;if(zx(u,t,n,a)===-1){var g=this,C=n;a!=null&&typeof a!="boolean"&&a.once===!0&&(C=function(B){g.removeEventListener(t,n,a),typeof n=="function"?n.call(this,B):n.handleEvent(B)}),r!==null&&(c=g.removeEventListener.bind(g,t,n,a),r.addEventListener("abort",c,{once:!0}),c=r.removeEventListener.bind(r,"abort",c)),r=Pr(a),u.push({type:t,listener:n,optionsOrUseCapture:a,attachedListener:C,cleanup:c}),M(this._fragmentFiber.child,!1,xM,t,C,r)}this._eventListeners=u}};function xM(t,n,a,r){return y(t).addEventListener(n,a,r),!1}ui.prototype.removeEventListener=function(t,n,a){var r=this._eventListeners;if(r!==null&&(n=zx(r,t,n,a),n!==-1)){var c=r[n];a=c.attachedListener;var u=c.cleanup;c=Pr(c.optionsOrUseCapture),M(this._fragmentFiber.child,!1,vM,t,a,c),r.splice(n,1),u!==null&&u()}};function vM(t,n,a,r){return y(t).removeEventListener(n,a,r),!1}function Pr(t){return t!=null&&typeof t!="boolean"&&(t.once===!0||t.signal instanceof AbortSignal)?{capture:t.capture,passive:t.passive}:t}function Ix(t){return t==null?"c=0":typeof t=="boolean"?"c="+(t?"1":"0"):"c="+(t.capture?"1":"0")}function zx(t,n,a,r){if(t.length===0)return-1;r=Ix(r);for(var c=0;c<t.length;c++){var u=t[c];if(u.type===n&&u.listener===a&&Ix(u.optionsOrUseCapture)===r)return c}return-1}ui.prototype.dispatchEvent=function(t){var n=x(this._fragmentFiber);if(n===null)return!0;n=y(n);var a=this._eventListeners;if(a!==null&&0<a.length||!t.bubbles){var r=n.nodeType===9?n.createComment(""):document.createTextNode("");if(a)for(var c=0;c<a.length;c++){var u=a[c];r.addEventListener(u.type,u.attachedListener,Pr(u.optionsOrUseCapture))}if(n.appendChild(r),t=r.dispatchEvent(t),a)for(c=0;c<a.length;c++)u=a[c],r.removeEventListener(u.type,u.attachedListener,Pr(u.optionsOrUseCapture));return n.removeChild(r),t}return n.dispatchEvent(t)},ui.prototype.focus=function(t){M(this._fragmentFiber.child,!0,Bx,t,void 0,void 0)};function Bx(t,n){return t.tag===6?!1:(t=y(t),DM(t,n))}ui.prototype.focusLast=function(t){var n=[];M(this._fragmentFiber.child,!0,ih,n,void 0,void 0);for(var a=n.length-1;0<=a&&!Bx(n[a],t);a--);};function ih(t,n){return n.push(t),!1}ui.prototype.blur=function(){var t=x(this._fragmentFiber);t!==null&&(t=y(t),t=Qo(t).activeElement,t!==null&&M(this._fragmentFiber.child,!1,_M,t,void 0,void 0))};function _M(t,n){return t.tag===6?!1:(t=y(t),t===n||t.contains(n)?(n.blur(),!0):!1)}ui.prototype.observeUsing=function(t){this._observers===null&&(this._observers=new Set),this._observers.add(t),M(this._fragmentFiber.child,!1,yM,t,void 0,void 0)};function yM(t,n){return t.tag===6||(t=y(t),n.observe(t)),!1}ui.prototype.unobserveUsing=function(t){var n=this._observers;if(n!==null&&n.has(t)){n.delete(t),M(this._fragmentFiber.child,!1,SM,t,void 0,void 0);for(var a=n=0;a<Pi.length;a++){var r=Pi[a];r.fragmentInstance===this&&r.observer===t?t.unobserve(r.instance):Pi[n++]=r}Pi.length=n}};function SM(t,n){return t.tag===6||(t=y(t),n.unobserve(t)),!1}var Pi=[],ah=!1;function MM(t,n,a){Pi.push({fragmentInstance:t,observer:n,instance:a}),ah||(ah=!0,NM(function(){ah=!1;var r=Pi;Pi=[];for(var c=0;c<r.length;c++){var u=r[c];u.observer.unobserve(u.instance)}}))}ui.prototype.getClientRects=function(){var t=[];return M(this._fragmentFiber.child,!1,bM,t,void 0,void 0),t};function bM(t,n){if(t.tag===6){t=t.stateNode;var a=t.ownerDocument.createRange();a.selectNodeContents(t),n.push.apply(n,a.getClientRects())}else t=y(t),n.push.apply(n,t.getClientRects());return!1}ui.prototype.getRootNode=function(t){var n=x(this._fragmentFiber);return n===null?this:y(n).getRootNode(t)},ui.prototype.compareDocumentPosition=function(t){var n=x(this._fragmentFiber);if(n===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var a=[];M(this._fragmentFiber.child,!1,ih,a,void 0,void 0);var r=y(n);if(a.length===0){if(a=r,b(this._fragmentFiber)){t:{for(n=this._fragmentFiber.return;n!==null;){if(n.tag===4){n=n.stateNode.containerInfo;break t}if(n.tag===3||n.tag===5||n.tag===27)break;n=n.return}n=null}n!=null&&(a=n)}n=this._fragmentFiber;var c=r=a.compareDocumentPosition(t);return a===t?c=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(a=T(n)[1],a===null?c=Node.DOCUMENT_POSITION_PRECEDING:(t=y(a).compareDocumentPosition(t),c=t===0||t&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),c|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}n=y(a[0]),c=y(a[a.length-1]);var u=b(this._fragmentFiber)?n.parentElement:r;if(u==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=u.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY,u=u.compareDocumentPosition(c)&Node.DOCUMENT_POSITION_CONTAINED_BY;var g=n.compareDocumentPosition(t),C=c.compareDocumentPosition(t),B=g&Node.DOCUMENT_POSITION_CONTAINED_BY||C&Node.DOCUMENT_POSITION_CONTAINED_BY;return C=r&&u&&g&Node.DOCUMENT_POSITION_FOLLOWING&&C&Node.DOCUMENT_POSITION_PRECEDING,n=r&&n===t||u&&c===t||B||C?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&n===t||!u&&c===t?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:g,n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||EM(n,this._fragmentFiber,a[0],a[a.length-1],t)?n:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function EM(t,n,a,r,c){var u=fe(c);if(t&Node.DOCUMENT_POSITION_CONTAINED_BY){if(a=!!u)t:{for(;u!==null;){if(u.tag===7&&(u===n||u.alternate===n)){a=!0;break t}u=u.return}a=!1}return a}if(t&Node.DOCUMENT_POSITION_CONTAINS){if(u===null)return u=c.ownerDocument,c===u||c===u.documentElement||c===u.body;t:{for(u=n,n=x(n);u!==null;){if(!(u.tag!==5&&u.tag!==3&&u.tag!==27||u!==n&&u.alternate!==n)){u=!0;break t}u=u.return}u=!1}return u}return t&Node.DOCUMENT_POSITION_PRECEDING?((n=!!u)&&!(n=u===a)&&(n=w(a,u,U),n===null?n=!1:(M(n,!0,V,u,a),u=_,_=null,n=u!==null)),n):t&Node.DOCUMENT_POSITION_FOLLOWING?((n=!!u)&&!(n=u===r)&&(n=w(r,u,U),n===null?n=!1:(M(n,!0,D,u,r),u=_,N=_=null,n=u!==null)),n):!1}function Fx(t,n){var a=t.ownerDocument.createRange();a.selectNodeContents(t),t=a.getBoundingClientRect(),window.scrollTo(window.scrollX+t.left,n?window.scrollY+t.top:window.scrollY+t.bottom-window.innerHeight)}ui.prototype.scrollIntoView=function(t){if(typeof t=="object")throw Error(s(566));var n=[];M(this._fragmentFiber.child,!1,ih,n,void 0,void 0);var a=t!==!1;if(n.length===0){var r=T(this._fragmentFiber);if(r=a?r[1]||r[0]||x(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){t=y(r),Fx(t,a);return}if(r=y(r),r.nodeType!==9){if(r.nodeType===11){a="host"in r?r.host:null,a!==null&&a.scrollIntoView(t);return}r.scrollIntoView(t)}}for(r=a?n.length-1:0;r!==(a?-1:n.length);){var c=n[r];c.tag===6?(c=y(c),Fx(c,a)):y(c).scrollIntoView(t),r+=a?-1:1}};function TM(t,n){return t=y(t),Hx(t,n),!1}function Hx(t,n){t.reactFragments==null&&(t.reactFragments=new Set),t.reactFragments.add(n)}function Gx(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.addEventListener(c.type,c.attachedListener,Pr(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){for(var g=0,C=0;C<Pi.length;C++){var B=Pi[C];(B.fragmentInstance!==n||B.observer!==u||B.instance!==t)&&(Pi[g++]=B)}Pi.length=g,u.observe(t)}),Hx(t,n))}function AM(t,n){var a=n._eventListeners;if(a!==null)for(var r=0;r<a.length;r++){var c=a[r];t.removeEventListener(c.type,c.attachedListener,Pr(c.optionsOrUseCapture))}t.nodeType!==3&&(a=n._observers,a!==null&&a.forEach(function(u){typeof u.rootMargin=="string"?MM(n,u,t):u.unobserve(t)}),t.reactFragments!=null&&t.reactFragments.delete(n))}function sh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":sh(a),te(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function RM(t,n,a,r){for(;t.nodeType===1;){var c=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!r&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(r){if(!t[It])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(u=t.getAttribute("rel"),u==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(u!==c.rel||t.getAttribute("href")!==(c.href==null||c.href===""?null:c.href)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin)||t.getAttribute("title")!==(c.title==null?null:c.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(u=t.getAttribute("src"),(u!==(c.src==null?null:c.src)||t.getAttribute("type")!==(c.type==null?null:c.type)||t.getAttribute("crossorigin")!==(c.crossOrigin==null?null:c.crossOrigin))&&u&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var u=c.name==null?null:""+c.name;if(c.type==="hidden"&&t.getAttribute("name")===u)return t}else return t;if(t=Ti(t.nextSibling),t===null)break}return null}function CM(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=Ti(t.nextSibling),t===null))return null;return t}function Vx(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ti(t.nextSibling),t===null))return null;return t}function rh(t){return t.data==="$?"||t.data==="$~"}function oh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function wM(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var r=function(){n(),a.removeEventListener("DOMContentLoaded",r)};a.addEventListener("DOMContentLoaded",r),t._reactRetry=r}}function Ti(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var lh=null;function kx(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return Ti(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function Xx(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function DM(t,n){function a(){r=!0}if(t.ownerDocument.activeElement===t)return!0;var r=!1;try{t.ownerDocument.addEventListener("focus",a,!0),(t.focus||HTMLElement.prototype.focus).call(t,n)}finally{t.ownerDocument.removeEventListener("focus",a,!0)}return r}function NM(t){Dx(function(){Dx(function(n){return t(n)})})}function Wx(t,n,a){switch(n=Qo(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function jx(t,n,a){for(var r in a){var c=a[r];a.hasOwnProperty(r)&&c!=null&&Ye(t,n,r,null,rM,c)}a.dangerouslySetInnerHTML!=null&&(t.textContent=""),t.onclick===ji&&(t.onclick=null),te(t)}function ch(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);te(t)}var Ai=new Map,qx=new Set;function Jo(t){if(typeof t.getRootNode=="function"){var n=t.getRootNode();if(n.nodeType===9||n.nodeType===11)return n}return t.nodeType===9?t:t.ownerDocument}var Ra=Nt.d;Nt.d={f:UM,r:LM,D:OM,C:PM,L:IM,m:zM,X:FM,S:BM,M:HM};function UM(){var t=Ra.f(),n=Lc();return t||n}function LM(t){var n=_e(t);n!==null&&n.tag===5&&n.type==="form"?Zg(n):Ra.r(t)}var Ir=typeof document>"u"?null:document;function Yx(t,n,a){var r=Ir;if(r&&typeof n=="string"&&n){var c=vi(n);c='link[rel="'+t+'"][href="'+c+'"]',typeof a=="string"&&(c+='[crossorigin="'+a+'"]'),qx.has(c)||(qx.add(c),t={rel:t,crossOrigin:a,href:n},r.querySelector(c)===null&&(n=r.createElement("link"),Ln(n,"link",t),Ee(n),r.head.appendChild(n)))}}function OM(t){Ra.D(t),Yx("dns-prefetch",t,null)}function PM(t,n){Ra.C(t,n),Yx("preconnect",t,n)}function IM(t,n,a){Ra.L(t,n,a);var r=Ir;if(r&&t&&n){var c='link[rel="preload"][as="'+vi(n)+'"]';n==="image"&&a&&a.imageSrcSet?(c+='[imagesrcset="'+vi(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(c+='[imagesizes="'+vi(a.imageSizes)+'"]')):c+='[href="'+vi(t)+'"]';var u=c;switch(n){case"style":u=zr(t);break;case"script":u=Br(t)}if(!(Ai.has(u)||(t=O({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Ai.set(u,t),r.querySelector(c)!==null||n==="style"&&r.querySelector($o(u))||n==="script"&&r.querySelector(tl(u))))){var g=r.createElement("link");Ln(g,"link",t),n==="style"&&(g[Jt]=!0,g.onload=g.onerror=function(){Qe(g)}),Ee(g),r.head.appendChild(g)}}}function zM(t,n){Ra.m(t,n);var a=Ir;if(a&&t){var r=n&&typeof n.as=="string"?n.as:"script",c='link[rel="modulepreload"][as="'+vi(r)+'"][href="'+vi(t)+'"]',u=c;switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":u=Br(t)}if(!Ai.has(u)&&(t=O({rel:"modulepreload",href:t},n),Ai.set(u,t),a.querySelector(c)===null)){switch(r){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(tl(u)))return}r=a.createElement("link"),Ln(r,"link",t),Ee(r),a.head.appendChild(r)}}}function BM(t,n,a){Ra.S(t,n,a);var r=Ir;if(r&&t){var c=Ce(r).hoistableStyles,u=zr(t);n=n||"default";var g=c.get(u);if(!g){var C={loading:0,preload:null};if(g=r.querySelector($o(u)))C.loading=5;else{t=O({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Ai.get(u))&&uh(t,a);var B=g=r.createElement("link");Ee(B),Ln(B,"link",t),B._p=new Promise(function(tt,ht){B.onload=tt,B.onerror=ht}),B.addEventListener("load",function(){C.loading|=1}),B.addEventListener("error",function(){C.loading|=2}),C.loading|=4,Hc(g,n,r)}g={type:"stylesheet",instance:g,count:1,state:C},c.set(u,g)}}}function FM(t,n){Ra.X(t,n);var a=Ir;if(a&&t){var r=Ce(a).hoistableScripts,c=Br(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=O({src:t,async:!0},n),(n=Ai.get(c))&&fh(t,n),u=a.createElement("script"),Ee(u),Ln(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function HM(t,n){Ra.M(t,n);var a=Ir;if(a&&t){var r=Ce(a).hoistableScripts,c=Br(t),u=r.get(c);u||(u=a.querySelector(tl(c)),u||(t=O({src:t,async:!0,type:"module"},n),(n=Ai.get(c))&&fh(t,n),u=a.createElement("script"),Ee(u),Ln(u,"link",t),a.head.appendChild(u)),u={type:"script",instance:u,count:1,state:null},r.set(c,u))}}function Zx(t,n,a,r){var c=(c=at.current)?Jo(c):null;if(!c)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(a=zr(a.href),n=Ce(c).hoistableStyles,r=n.get(a),r||(r={type:"style",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=zr(a.href);var u=Ce(c).hoistableStyles,g=u.get(t);if(g||(c=c.ownerDocument||c,g={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},u.set(t,g),(u=c.querySelector($o(t)))?u._p||(g.instance=u,g.state.loading=5):(u=Ai.get(t),u||(u={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Ai.set(t,u)),GM(c,t,u,g.state))),n&&r===null)throw Error(s(528,""));return g}if(n&&r!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(a=Br(a),n=Ce(c).hoistableScripts,r=n.get(a),r||(r={type:"script",instance:null,count:0,state:null},n.set(a,r)),r):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function zr(t){return'href="'+vi(t)+'"'}function $o(t){return'link[rel="stylesheet"]['+t+"]"}function Kx(t){return O({},t,{"data-precedence":t.precedence,precedence:null})}function GM(t,n,a,r){if(n=t.querySelector('link[rel="preload"][as="style"]['+n+"]")){if(n[Jt]!==!0){r.loading=1;return}}else n=t.createElement("link"),n[Jt]=!0,n.onload=n.onerror=Qe.bind(null,n),Ln(n,"link",a),Ee(n),t.head.appendChild(n);r.preload=n,n.addEventListener("load",function(){return r.loading|=1}),n.addEventListener("error",function(){return r.loading|=2})}function Br(t){return'[src="'+vi(t)+'"]'}function tl(t){return"script[async]"+t}function Qx(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var r=t.querySelector('style[data-href~="'+vi(a.href)+'"]');if(r)return n.instance=r,Ee(r),r;var c=O({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return r=(t.ownerDocument||t).createElement("style"),Ee(r),Ln(r,"style",c),Hc(r,a.precedence,t),n.instance=r;case"stylesheet":c=zr(a.href);var u=t.querySelector($o(c));if(u)return n.state.loading|=4,n.instance=u,Ee(u),u;r=Kx(a),(c=Ai.get(c))&&uh(r,c),u=(t.ownerDocument||t).createElement("link"),Ee(u);var g=u;return g._p=new Promise(function(C,B){g.onload=C,g.onerror=B}),Ln(u,"link",r),n.state.loading|=4,Hc(u,a.precedence,t),n.instance=u;case"script":return u=Br(a.src),(c=t.querySelector(tl(u)))?(n.instance=c,Ee(c),c):(r=a,(c=Ai.get(u))&&(r=O({},a),fh(r,c)),t=t.ownerDocument||t,c=t.createElement("script"),Ee(c),Ln(c,"link",r),t.head.appendChild(c),n.instance=c);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(r=n.instance,n.state.loading|=4,Hc(r,a.precedence,t));return n.instance}function Hc(t,n,a){for(var r=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),c=r.length?r[r.length-1]:null,u=c,g=0;g<r.length;g++){var C=r[g];if(C.dataset.precedence===n)u=C;else if(u!==c)break}u?u.parentNode.insertBefore(t,u.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function uh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function fh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var Gc=null;function Jx(t,n,a){if(Gc===null){var r=new Map,c=Gc=new Map;c.set(a,r)}else c=Gc,r=c.get(a),r||(r=new Map,c.set(a,r));if(r.has(t))return r;for(r.set(t,null),a=a.getElementsByTagName(t),c=0;c<a.length;c++){var u=a[c];if(!(u[It]||u[R]||t==="link"&&u.getAttribute("rel")==="stylesheet")&&u.namespaceURI!=="http://www.w3.org/2000/svg"){var g=u.getAttribute(n)||"";g=t+g;var C=r.get(g);C?C.push(u):r.set(g,[u])}}return r}function dh(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function VM(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;switch(n.rel){case"stylesheet":return t=n.disabled,typeof n.precedence=="string"&&t==null;default:return!0}case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function $x(t,n){return t==="img"&&n.src!=null&&n.src!==""&&n.onLoad==null&&n.loading!=="lazy"}function tv(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function ev(t){return(t.width||100)*(t.height||100)*(typeof devicePixelRatio=="number"?devicePixelRatio:1)*.25}function nv(t,n){typeof n.decode=="function"&&(t.imgCount++,n.complete||(t.imgBytes+=ev(n),t.suspenseyImages.push(n)),t=WM.bind(t),n.decode().then(t,t))}function kM(t,n,a,r){if(a.type==="stylesheet"&&(typeof r.media!="string"||matchMedia(r.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var c=zr(r.href),u=n.querySelector($o(c));if(u){n=u._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=el.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=u,Ee(u);return}u=n.ownerDocument||n,r=Kx(r),(c=Ai.get(c))&&uh(r,c),u=u.createElement("link"),Ee(u);var g=u;g._p=new Promise(function(C,B){g.onload=C,g.onerror=B}),Ln(u,"link",r),a.instance=u}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=el.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var Vc=0;function XM(t,n){return t.stylesheets&&t.count===0&&Xc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var r=setTimeout(function(){if(t.stylesheets&&Xc(t,t.stylesheets),t.unsuspend){var u=t.unsuspend;t.unsuspend=null,u()}},6e4+n);0<t.imgBytes&&Vc===0&&(Vc=62500*lM());var c=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Xc(t,t.stylesheets),t.unsuspend)){var u=t.unsuspend;t.unsuspend=null,u()}},(t.imgBytes>Vc?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(r),clearTimeout(c)}}:null}function iv(t){if(t.count===0&&(t.imgCount===0||!t.waitingForImages)){if(t.stylesheets)Xc(t,t.stylesheets);else if(t.unsuspend){var n=t.unsuspend;t.unsuspend=null,n()}}}function el(){this.count--,iv(this)}function WM(){this.imgCount--,iv(this)}var kc=null;function Xc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,kc=new Map,n.forEach(jM,t),kc=null,el.call(t))}function jM(t,n){if(!(n.state.loading&4)){var a=kc.get(t);if(a)var r=a.get(null);else{a=new Map,kc.set(t,a);for(var c=t.querySelectorAll("link[data-precedence],style[data-precedence]"),u=0;u<c.length;u++){var g=c[u];(g.nodeName==="LINK"||g.getAttribute("media")!=="not all")&&(a.set(g.dataset.precedence,g),r=g)}r&&a.set(null,r)}c=n.instance,g=c.getAttribute("data-precedence"),u=a.get(g)||r,u===r&&a.set(null,c),a.set(g,c),this.count++,r=el.bind(this),c.addEventListener("load",r),c.addEventListener("error",r),u?u.parentNode.insertBefore(c,u.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(c,t.firstChild)),n.state.loading|=4}}var Fr={$$typeof:it,Provider:null,Consumer:null,_currentValue:Ue,_currentValue2:Ue,_threadCount:0};function qM(t,n,a,r,c,u,g,C,B){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=nr(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nr(0),this.hiddenUpdates=nr(null),this.identifierPrefix=r,this.onUncaughtError=c,this.onCaughtError=u,this.onRecoverableError=g,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=B,this.transitionTypes=null,this.incompleteTransitions=new Map}function av(t,n,a,r,c,u,g,C,B,tt,ht,yt){return t=new qM(t,n,a,g,B,tt,ht,yt,C),n=1,u===!0&&(n|=24),u=Yn(3,null,null,n),t.current=u,u.stateNode=t,n=Rf(),n.refCount++,t.pooledCache=n,n.refCount++,u.memoizedState={element:r,isDehydrated:a,cache:n},Nf(u),t}function sv(t){return t?(t=fr,t):fr}function rv(t,n,a,r,c,u){c=sv(c),r.context===null?r.context=c:r.pendingContext=c,r=Ya(n),r.payload={element:a},u=u===void 0?null:u,u!==null&&(r.callback=u),a=Za(t,r,n),a!==null&&(Jn(a,t,n),Uo(a,t,n))}function ov(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function hh(t,n){ov(t,n),(t=t.alternate)&&ov(t,n)}function lv(t){if(t.tag===13||t.tag===31){var n=As(t,67108864);n!==null&&Jn(n,t,67108864),hh(t,67108864)}}function cv(t){if(t.tag===13||t.tag===31){var n=ci();n=mo(n);var a=As(t,n);a!==null&&Jn(a,t,n),hh(t,n)}}var Hr=!0;function YM(t,n,a,r){var c=gt.T;gt.T=null;var u=Nt.p;try{Nt.p=2,ph(t,n,a,r)}finally{Nt.p=u,gt.T=c}}function ZM(t,n,a,r){var c=gt.T;gt.T=null;var u=Nt.p;try{Nt.p=8,ph(t,n,a,r)}finally{Nt.p=u,gt.T=c}}function ph(t,n,a,r){if(Hr){var c=mh(r);if(c===null)Zd(t,n,r,Wc,a),fv(t,r);else if(QM(c,t,n,a,r))r.stopPropagation();else if(fv(t,r),n&4&&-1<KM.indexOf(t)){for(;c!==null;){var u=_e(c);if(u!==null)switch(u.tag){case 3:if(u=u.stateNode,u.current.memoizedState.isDehydrated){var g=ha(u.pendingLanes);if(g!==0){var C=u;for(C.pendingLanes|=2,C.entangledLanes|=2;g;){var B=1<<31-ve(g);C.entanglements[1]|=B,g&=~B}na(u),(ke&6)===0&&(Dc=qt()+500,Yo(0))}}break;case 31:case 13:C=As(u,2),C!==null&&Jn(C,u,2),Lc(),hh(u,2)}if(u=mh(r),u===null&&Zd(t,n,r,Wc,a),u===c)break;c=u}c!==null&&r.stopPropagation()}else Zd(t,n,r,null,a)}}function mh(t){return t=$u(t),gh(t)}var Wc=null;function gh(t){if(Wc=null,t=fe(t),t!==null){var n=f(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return Wc=t,null}function uv(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"fullscreenerror":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"resize":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(oe()){case ge:return 2;case Z:return 8;case Ut:case St:return 32;case Pt:return 268435456;default:return 32}default:return 32}}var xh=!1,os=null,ls=null,cs=null,nl=new Map,il=new Map,us=[],KM="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function fv(t,n){switch(t){case"focusin":case"focusout":os=null;break;case"dragenter":case"dragleave":ls=null;break;case"mouseover":case"mouseout":cs=null;break;case"pointerover":case"pointerout":nl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":il.delete(n.pointerId)}}function al(t,n,a,r,c,u){return t===null||t.nativeEvent!==u?(t={blockedOn:n,domEventName:a,eventSystemFlags:r,nativeEvent:u,targetContainers:[c]},n!==null&&(n=_e(n),n!==null&&lv(n)),t):(t.eventSystemFlags|=r,n=t.targetContainers,c!==null&&n.indexOf(c)===-1&&n.push(c),t)}function QM(t,n,a,r,c){switch(n){case"focusin":return os=al(os,t,n,a,r,c),!0;case"dragenter":return ls=al(ls,t,n,a,r,c),!0;case"mouseover":return cs=al(cs,t,n,a,r,c),!0;case"pointerover":var u=c.pointerId;return nl.set(u,al(nl.get(u)||null,t,n,a,r,c)),!0;case"gotpointercapture":return u=c.pointerId,il.set(u,al(il.get(u)||null,t,n,a,r,c)),!0}return!1}function dv(t){var n=fe(t.target);if(n!==null){var a=f(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,Nl(t.priority,function(){cv(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Nl(t.priority,function(){cv(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function jc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=mh(t.nativeEvent);if(a===null){a=t.nativeEvent;var r=new a.constructor(a.type,a);Ju=r,a.target.dispatchEvent(r),Ju=null}else return n=_e(a),n!==null&&lv(n),t.blockedOn=a,!1;n.shift()}return!0}function hv(t,n,a){jc(t)&&a.delete(n)}function JM(){xh=!1,os!==null&&jc(os)&&(os=null),ls!==null&&jc(ls)&&(ls=null),cs!==null&&jc(cs)&&(cs=null),nl.forEach(hv),il.forEach(hv)}function qc(t,n){t.blockedOn===n&&(t.blockedOn=null,xh||(xh=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,JM)))}var Yc=null;function pv(t){Yc!==t&&(Yc=t,o.unstable_scheduleCallback(o.unstable_NormalPriority,function(){Yc===t&&(Yc=null);for(var n=0;n<t.length;n+=3){var a=t[n],r=t[n+1],c=t[n+2];if(typeof r!="function"){if(gh(r||a)===null)continue;break}var u=_e(a);u!==null&&(t.splice(n,3),n-=3,Jf(u,{pending:!0,data:c,method:a.method,action:r},r,c))}}))}function Gr(t){function n(B){return qc(B,t)}os!==null&&qc(os,t),ls!==null&&qc(ls,t),cs!==null&&qc(cs,t),nl.forEach(n),il.forEach(n);for(var a=0;a<us.length;a++){var r=us[a];r.blockedOn===t&&(r.blockedOn=null)}for(;0<us.length&&(a=us[0],a.blockedOn===null);)dv(a),a.blockedOn===null&&us.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(r=0;r<a.length;r+=3){var c=a[r],u=a[r+1],g=c[W]||null;if(typeof u=="function")g||pv(a);else if(g){var C=null;if(u&&u.hasAttribute("formAction")){if(c=u,g=u[W]||null)C=g.formAction;else if(gh(c)!==null)continue}else C=g.action;typeof C=="function"?a[r+1]=C:(a.splice(r,3),r-=3),pv(a)}}}function mv(){function t(u){u.canIntercept&&u.info==="react-transition"&&u.intercept({handler:function(){return new Promise(function(g){return c=g})},focusReset:"manual",scroll:"manual"})}function n(){c!==null&&(c(),c=null),r||setTimeout(a,20)}function a(){if(!r&&!navigation.transition){var u=navigation.currentEntry;u&&u.url!=null&&navigation.navigate(u.url,{state:u.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var r=!1,c=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){r=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),c!==null&&(c(),c=null)}}}function vh(t){this._internalRoot=t}Zc.prototype.render=vh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,r=ci();rv(a,r,t,n,null,null)},Zc.prototype.unmount=vh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;rv(t.current,2,null,t,null,null),Lc(),n[pt]=null}};function Zc(t){this._internalRoot=t}Zc.prototype.unstable_scheduleHydration=function(t){if(t){var n=Dl();t={blockedOn:null,target:t,priority:n};for(var a=0;a<us.length&&n!==0&&n<us[a].priority;a++);us.splice(a,0,t),a===0&&dv(t)}};var gv=e.version;if(gv!=="19.3.1")throw Error(s(527,gv,"19.3.1"));Nt.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?v(t):null,t=t===null?null:t.stateNode,t};var $M={bundleType:0,version:"19.3.1",rendererPackageName:"react-dom",currentDispatcherRef:gt,reconcilerVersion:"19.3.1"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Kc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Kc.isDisabled&&Kc.supportsFiber)try{ne=Kc.inject($M),kt=Kc}catch{}}return rl.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,r="",c=s0,u=r0,g=o0;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(r=n.identifierPrefix),n.onUncaughtError!==void 0&&(c=n.onUncaughtError),n.onCaughtError!==void 0&&(u=n.onCaughtError),n.onRecoverableError!==void 0&&(g=n.onRecoverableError)),n=av(t,1,!1,null,null,a,r,null,c,u,g,mv),t[pt]=n.current,Yd(t),new vh(n)},rl.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var r=!1,c="",u=s0,g=r0,C=o0,B=null;return a!=null&&(a.unstable_strictMode===!0&&(r=!0),a.identifierPrefix!==void 0&&(c=a.identifierPrefix),a.onUncaughtError!==void 0&&(u=a.onUncaughtError),a.onCaughtError!==void 0&&(g=a.onCaughtError),a.onRecoverableError!==void 0&&(C=a.onRecoverableError),a.formState!==void 0&&(B=a.formState)),n=av(t,1,!0,n,a??null,r,c,B,u,g,C,mv),n.context=sv(null),a=n.current,r=ci(),r=mo(r),c=Ya(r),c.callback=null,Za(a,c,r),a=r,n.current.lanes=a,Xi(n,a),na(n),t[pt]=n.current,Yd(t),new Zc(n)},rl.version="19.3.1",rl}var Ev;function Tb(){if(Ev)return yh.exports;Ev=1;function o(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(o)}catch(e){console.error(e)}}return o(),yh.exports=Eb(),yh.exports}var Ab=Tb();const Rb=nb(Ab);function Cb(o={}){const[e,i]=wt.useState("connecting"),[s,l]=wt.useState(null),f=wt.useRef(o);return f.current=o,wt.useEffect(()=>{let d=null,h=null,p=!1;function m(){if(!p){i("connecting");try{d=new EventSource("/api/stream"),d.onopen=()=>{p||i("live")},d.onerror=()=>{p||(i("offline"),d?.close(),h=setTimeout(m,3e3))},["memory_created","memory_updated","trap_logged","conflict_detected","conflict_resolved","action_created","action_claimed","action_completed","action_updated","sync_complete"].forEach(M=>{d?.addEventListener(M,x=>{try{const b=JSON.parse(x.data);l(new Date().toLocaleTimeString()),f.current.onEvent?.(M,b)}catch{}})})}catch{i("offline"),h=setTimeout(m,3e3)}}}return m(),()=>{p=!0,h&&clearTimeout(h),d&&d.close()}},[]),{status:e,lastEventTime:s}}function wb(){const[o,e]=wt.useState(null),[i,s]=wt.useState(6),l=wt.useRef(null),f=wt.useRef(null),d=()=>{l.current&&clearTimeout(l.current),f.current&&clearInterval(f.current),l.current=null,f.current=null},h=wt.useCallback((m,v,M)=>{o&&o.execute().catch(console.error),d();const x={id:Math.random().toString(36).substring(7),label:m,execute:v,rollback:M};e(x),s(6),f.current=setInterval(()=>{s(b=>Math.max(0,b-1))},1e3),l.current=setTimeout(async()=>{d(),e(null);try{await v()}catch(b){console.error("Failed to commit action:",b),M()}},6e3)},[o]),p=wt.useCallback(()=>{o&&(d(),o.rollback(),e(null))},[o]);return wt.useEffect(()=>{const m=v=>{(v.ctrlKey||v.metaKey)&&v.key.toLowerCase()==="z"&&o&&(v.preventDefault(),p())};return window.addEventListener("keydown",m),()=>window.removeEventListener("keydown",m)},[o,p]),{pendingAction:o,countdown:i,enqueue:h,undo:p}}const Db=({pendingAction:o,countdown:e,onUndo:i})=>o?S.jsxs("div",{className:"toast-slide",style:{position:"fixed",bottom:"24px",left:"50%",zIndex:9999,background:"var(--surface)",border:"1px solid var(--border-strong)",borderRadius:"12px",boxShadow:"0 12px 32px rgba(0,0,0,0.3)",padding:"12px 20px",display:"flex",alignItems:"center",gap:"16px",color:"var(--text)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"var(--accent)",animation:"pulse 1s infinite"}}),S.jsx("span",{style:{fontSize:"13px",fontWeight:500},children:o.label})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[S.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)"},children:["Auto-committing in ",e,"s"]}),S.jsxs("button",{onClick:i,style:{background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",borderRadius:"6px",padding:"5px 12px",fontSize:"12px",fontWeight:600,cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.15s ease"},children:[S.jsx(Qp,{size:13}),"Undo (Ctrl+Z)"]})]})]}):null,Nb=({actions:o,edges:e,onSelectAction:i,onSeed:s})=>{const l=wt.useRef(null),[f,d]=wt.useState(!0),[h,p]=wt.useState("all"),[m,v]=wt.useState(!0),M=wt.useRef([]),x=wt.useRef({x:0,y:0,k:1}),b=wt.useRef({isDragging:!1,dragNode:null,startMouse:{x:0,y:0},startTransform:{x:0,y:0}}),T=wt.useCallback(()=>{v(!0)},[]);wt.useEffect(()=>{const U=l.current;if(!U)return;const w=U.getBoundingClientRect(),O=w.width/2,A=w.height/2,P=o.filter(z=>h==="all"?!0:h==="frontier"?z.isFrontier:z.status===h);M.current=P.map((z,k)=>{const Q=k/Math.max(1,P.length)*Math.PI*2,ct=120+k%3*60;return{id:z.id,action:z,x:O+Math.cos(Q)*ct,y:A+Math.sin(Q)*ct,vx:0,vy:0,radius:z.isFrontier?20:16}}),T()},[o,h,T]),wt.useEffect(()=>{const U=l.current;if(!U)return;const w=U.getContext("2d");if(!w)return;let O;const A=()=>{const z=U.parentElement?.getBoundingClientRect();if(!z)return;const k=window.devicePixelRatio||1;U.width=Math.round(z.width*k),U.height=Math.round(z.height*k),U.style.width=`${z.width}px`,U.style.height=`${z.height}px`,T()};A(),window.addEventListener("resize",A);const P=()=>{const z=M.current,k=x.current,Q=window.devicePixelRatio||1,ct=U.width/Q,q=U.height/Q;let it=0;if(f&&m){for(let F=0;F<z.length;F++)for(let X=F+1;X<z.length;X++){const st=z[X].x-z[F].x,Y=z[X].y-z[F].y,H=Math.hypot(st,Y)||1;if(H<200){const J=(200-H)/H*.4;z[F].vx-=st*J*.05,z[F].vy-=Y*J*.05,z[X].vx+=st*J*.05,z[X].vy+=Y*J*.05}}for(const F of e){const X=z.find(Y=>Y.id===F.source_action_id),st=z.find(Y=>Y.id===F.target_action_id);if(X&&st){const Y=st.x-X.x,H=st.y-X.y,J=F.edge_type==="conflicts_with"?.001:.0035;X.vx+=Y*J,X.vy+=H*J,st.vx-=Y*J,st.vy-=H*J}}for(const F of z)if(F!==b.current.dragNode){F.x+=F.vx,F.y+=F.vy,F.vx*=.85,F.vy*=.85;const X=Math.hypot(F.vx,F.vy);X>it&&(it=X)}it<.04&&!b.current.isDragging&&v(!1)}w.save(),w.scale(Q,Q),w.clearRect(0,0,ct,q),w.translate(k.x,k.y),w.scale(k.k,k.k);for(const F of e){const X=z.find(Y=>Y.id===F.source_action_id),st=z.find(Y=>Y.id===F.target_action_id);if(X&&st)if(w.beginPath(),F.edge_type==="conflicts_with")w.setLineDash([5,4]),w.strokeStyle="#f43f5e",w.lineWidth=2,w.moveTo(X.x,X.y),w.lineTo(st.x,st.y),w.stroke(),w.setLineDash([]);else{w.setLineDash([]),w.strokeStyle="#38bdf8",w.lineWidth=1.8,w.moveTo(X.x,X.y),w.lineTo(st.x,st.y),w.stroke();const Y=Math.atan2(X.y-st.y,X.x-st.x),H=X.radius+3,J=X.x-Math.cos(Y)*H,Tt=X.y-Math.sin(Y)*H;w.beginPath(),w.moveTo(J,Tt),w.lineTo(J-8*Math.cos(Y-Math.PI/6),Tt-8*Math.sin(Y-Math.PI/6)),w.lineTo(J-8*Math.cos(Y+Math.PI/6),Tt-8*Math.sin(Y+Math.PI/6)),w.fillStyle="#38bdf8",w.fill()}}for(const F of z){const X=F.action;if(X.isFrontier){const H=(Math.sin(Date.now()/240)+1)*4;w.beginPath(),w.arc(F.x,F.y,F.radius+H+3,0,Math.PI*2),w.fillStyle="rgba(56, 189, 248, 0.22)",w.fill(),w.strokeStyle="#38bdf8",w.lineWidth=2,w.stroke()}w.beginPath(),w.arc(F.x,F.y,F.radius,0,Math.PI*2),X.isFrontier?w.fillStyle="#0284c7":X.status==="done"?w.fillStyle="#10b981":X.status==="active"?w.fillStyle="#3b82f6":X.status==="blocked"?w.fillStyle="#64748b":w.fillStyle="#8b5cf6",w.fill(),w.strokeStyle="#090d16",w.lineWidth=2.5,w.stroke(),w.fillStyle="#f8fafc",w.font='11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',w.textAlign="center";const st=`[P${X.priority}] ${X.title}`,Y=st.length>20?st.slice(0,18)+"...":st;w.fillText(Y,F.x,F.y+F.radius+14)}w.restore(),O=requestAnimationFrame(P)};return O=requestAnimationFrame(P),()=>{cancelAnimationFrame(O),window.removeEventListener("resize",A)}},[e,f,m,T]);const L=U=>{T();const w=l.current;if(!w)return;const O=w.getBoundingClientRect(),A=(U.clientX-O.left-x.current.x)/x.current.k,P=(U.clientY-O.top-x.current.y)/x.current.k,z=M.current.find(k=>Math.hypot(k.x-A,k.y-P)<k.radius+6);b.current={isDragging:!0,dragNode:z||null,startMouse:{x:U.clientX,y:U.clientY},startTransform:{...x.current}}},y=U=>{const{isDragging:w,dragNode:O,startMouse:A,startTransform:P}=b.current;if(w)if(T(),O){const z=l.current;if(!z)return;const k=z.getBoundingClientRect();O.x=(U.clientX-k.left-x.current.x)/x.current.k,O.y=(U.clientY-k.top-x.current.y)/x.current.k,O.vx=0,O.vy=0}else x.current.x=P.x+(U.clientX-A.x),x.current.y=P.y+(U.clientY-A.y)},_=U=>{const{dragNode:w,startMouse:O}=b.current,A=Math.hypot(U.clientX-O.x,U.clientY-O.y);w&&A<6&&i(w.action),b.current.isDragging=!1,b.current.dragNode=null},N=U=>{U.preventDefault(),T();const w=U.deltaY<0?1.15:.88;x.current.k=Math.max(.25,Math.min(3.5,x.current.k*w))},V=U=>{T(),x.current.k=Math.max(.25,Math.min(3.5,x.current.k*U))},D=()=>{T(),x.current={x:0,y:0,k:1}};return S.jsxs("div",{style:{position:"relative",width:"100%",height:"580px",background:"var(--surface)",borderRadius:"12px",border:"1px solid var(--border)",overflow:"hidden"},children:[S.jsxs("div",{style:{position:"absolute",top:"16px",left:"16px",right:"16px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:10,pointerEvents:"none"},children:[S.jsx("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:["all","frontier","active","blocked","done"].map(U=>S.jsxs("button",{onClick:()=>{p(U),T()},className:`btn btn-pill ${h===U?"btn-primary":""}`,style:{textTransform:"capitalize"},children:[U==="frontier"&&S.jsx(xv,{size:12}),U]},U))}),S.jsxs("div",{style:{display:"flex",gap:"8px",pointerEvents:"auto"},children:[S.jsxs("button",{onClick:()=>{d(!f),T()},className:"btn",children:[f?S.jsx(O_,{size:14}):S.jsx(P_,{size:14}),f?"Pause":"Play"]}),S.jsx("button",{onClick:()=>V(1.2),className:"btn",title:"Zoom in",children:S.jsx(ib,{size:14})}),S.jsx("button",{onClick:()=>V(.8),className:"btn",title:"Zoom out",children:S.jsx(ab,{size:14})}),S.jsx("button",{onClick:D,className:"btn",title:"Reset view",children:S.jsx(Qp,{size:14})})]})]}),S.jsx("canvas",{ref:l,onMouseDown:L,onMouseMove:y,onMouseUp:_,onWheel:N,style:{width:"100%",height:"100%",cursor:"grab"}}),o.length===0&&S.jsxs("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"14px",zIndex:5,background:"rgba(9, 9, 11, 0.85)",backdropFilter:"blur(6px)",textAlign:"center",padding:"24px"},children:[S.jsx("div",{style:{width:"44px",height:"44px",borderRadius:"10px",background:"var(--accent-weak)",border:"1px solid rgba(56, 189, 248, 0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--accent)",fontSize:"22px"},children:"⚡"}),S.jsxs("div",{children:[S.jsx("h3",{style:{fontSize:"16px",fontWeight:700,color:"var(--text)",letterSpacing:"-0.2px"},children:"Action DAG Queue Is Currently Empty"}),S.jsxs("p",{style:{fontSize:"13px",color:"var(--text-muted)",maxWidth:"460px",marginTop:"6px",lineHeight:"1.5"},children:["The Action DAG coordinates distributed autonomous multi-agent task dependencies with topological frontier scheduling. Agents claim and execute tasks via ",S.jsx("code",{children:"fastr_claim"})," and ",S.jsx("code",{children:"fastr_frontier"}),"."]})]}),s&&S.jsxs("button",{onClick:s,className:"btn btn-primary",style:{marginTop:"8px",padding:"7px 16px",fontSize:"12px"},children:[S.jsx(xv,{size:14})," Seed Example 3-Agent Workflow"]})]}),S.jsxs("div",{style:{position:"absolute",bottom:"14px",left:"16px",display:"flex",gap:"16px",fontSize:"11px",color:"var(--text-muted)",zIndex:10,background:"rgba(0,0,0,0.5)",padding:"6px 14px",borderRadius:"8px",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.08)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#0284c7",boxShadow:"0 0 8px #38bdf8"}}),S.jsx("span",{children:"Frontier (Unblocked)"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#3b82f6"}}),S.jsx("span",{children:"Active"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#64748b"}}),S.jsx("span",{children:"Blocked"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"10px",height:"10px",borderRadius:"50%",background:"#10b981"}}),S.jsx("span",{children:"Done"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("span",{style:{color:"#f43f5e",fontWeight:"bold"},children:"- - -"}),S.jsx("span",{children:"Mutex Lock"})]})]})]})};function Tv(o,e,i,s,l){const f=o.length,d=[];if(!f)return d;let h=0;for(const M of o)h+=M;if(h<=0)return o.map(()=>({x:e,y:i,w:0,h:0}));const p=o.map(M=>M*(s*l)/h),m=(M,x,b,T)=>{const L=M*M,y=T*T;return Math.max(y*b/L,L/(y*x))};let v=0;for(;v<f;){const M=Math.min(s,l);if(M<=0){for(;v<f;v++)d.push({x:e,y:i,w:0,h:0});break}let x=p[v],b=p[v],T=p[v],L=m(x,b,T,M),y=v+1;for(;y<f;){const N=x+p[y],V=Math.min(b,p[y]),D=Math.max(T,p[y]),U=m(N,V,D,M);if(U>L)break;x=N,b=V,T=D,L=U,y++}const _=x/M;if(s>=l){let N=i;for(let V=v;V<y;V++){const D=p[V]/_;d.push({x:e,y:N,w:_,h:D}),N+=D}e+=_,s-=_}else{let N=e;for(let V=v;V<y;V++){const D=p[V]/_;d.push({x:N,y:i,w:D,h:_}),N+=D}i+=_,l-=_}v=y}return d}const mi=({text:o,label:e,className:i=""})=>{const[s,l]=wt.useState(!1),f=async d=>{d.stopPropagation();try{await navigator.clipboard.writeText(o),l(!0),setTimeout(()=>l(!1),1800)}catch{const h=document.createElement("textarea");h.value=o,document.body.appendChild(h),h.select(),document.execCommand("copy"),document.body.removeChild(h),l(!0),setTimeout(()=>l(!1),1800)}};return S.jsxs("button",{onClick:f,title:"Copy to clipboard",className:`copy-btn ${i}`,style:{display:"inline-flex",alignItems:"center",gap:"4px",padding:e?"3px 8px":"4px",fontSize:"11px",fontFamily:"var(--font-mono)",borderRadius:"4px",border:"1px solid var(--border)",background:s?"var(--success-weak)":"var(--surface)",color:s?"var(--success)":"var(--text-muted)",cursor:"pointer",transition:"all 0.15s ease"},children:[s?S.jsx(ip,{size:12}):S.jsx(sb,{size:12}),e&&S.jsx("span",{children:s?"Copied!":e})]})},Ub=({memories:o,onSelectMemory:e})=>{const[i,s]=wt.useState("treemap"),l=wt.useRef(null),f=wt.useRef(null),[d,h]=wt.useState(null),[p,m]=wt.useState(null),v=wt.useRef([]),M=wt.useRef([]),x=wt.useMemo(()=>{const y=new Map;for(const _ of o){const N=_.module||"general";y.has(N)||y.set(N,[]),y.get(N).push(_)}return Array.from(y.entries()).map(([_,N])=>({module:_,items:N,count:N.length})).sort((_,N)=>N.count-_.count)},[o]),b=wt.useCallback(()=>{if(i!=="treemap")return;const y=f.current,_=l.current;if(!y||!_)return;const N=y.getContext("2d");if(!N)return;const V=_.clientWidth||800,D=500,U=window.devicePixelRatio||1;if(y.width=Math.round(V*U),y.height=Math.round(D*U),y.style.width=`${V}px`,y.style.height=`${D}px`,N.save(),N.scale(U,U),N.clearRect(0,0,V,D),x.length===0){N.fillStyle="#64748b",N.font="14px -apple-system, sans-serif",N.textAlign="center",N.fillText("No memory clusters indexed yet. Record a rule or run git-learn.",V/2,D/2),N.restore();return}const w=8,O=x.map(z=>Math.max(1,z.count)),A=Tv(O,w,w,V-2*w,D-2*w);v.current=x.map((z,k)=>({...A[k],module:z.module,items:z.items}));const P=[];for(const z of v.current){if(z.w<=4||z.h<=4)continue;const k=d?.module===z.module;N.save(),N.beginPath(),N.rect(z.x,z.y,z.w,z.h),N.clip(),N.fillStyle=k?"rgba(56, 189, 248, 0.08)":"rgba(255, 255, 255, 0.02)",N.fillRect(z.x,z.y,z.w,z.h),N.strokeStyle=k?"#38bdf8":"rgba(255, 255, 255, 0.1)",N.lineWidth=k?2:1,N.strokeRect(z.x,z.y,z.w,z.h);const Q=Math.min(26,Math.max(16,z.h*.22));if(N.fillStyle=k?"rgba(56, 189, 248, 0.18)":"rgba(255, 255, 255, 0.05)",N.fillRect(z.x,z.y,z.w,Q),N.fillStyle=k?"#38bdf8":"#e2e8f0",N.font="bold 11px -apple-system, sans-serif",N.textAlign="left",N.textBaseline="middle",z.w>40){const X=z.module.toUpperCase();N.fillText(`${X} (${z.items.length})`,z.x+8,z.y+Q/2)}const ct=z.y+Q+4,q=z.h-Q-8,it=z.w-8,F=z.x+4;if(q>10&&it>10&&z.items.length>0){const X=z.items.map(Y=>Y.pinned?2:Y.kind==="error_trap"?1.5:1),st=Tv(X,F,ct,it,q);z.items.forEach((Y,H)=>{const J=st[H];if(!J||J.w<=2||J.h<=2)return;P.push({...J,item:Y,module:z.module});const Tt=p?.item.id===Y.id;let bt="#10b981";if(Y.pinned?bt="#8b5cf6":Y.kind==="error_trap"?bt="#f59e0b":Y.reward_score>=.7?bt="#0284c7":Y.reward_score<.3&&(bt="#64748b"),N.save(),N.beginPath(),N.rect(J.x+1,J.y+1,J.w-2,J.h-2),N.clip(),N.fillStyle=Tt?bt:`${bt}33`,N.fillRect(J.x+1,J.y+1,J.w-2,J.h-2),N.strokeStyle=Tt?"#ffffff":bt,N.lineWidth=Tt?2:1,N.strokeRect(J.x+1,J.y+1,J.w-2,J.h-2),J.w>65&&J.h>24){N.fillStyle=Tt?"#ffffff":"#f8fafc",N.font="500 10px -apple-system, sans-serif",N.textAlign="left",N.textBaseline="top";const Zt=Y.kind==="error_trap"?`⚠️ ${Y.title}`:Y.title;N.fillText(Zt,J.x+6,J.y+6,J.w-12)}N.restore()})}N.restore()}M.current=P,N.restore()},[i,x,d,p]);wt.useEffect(()=>{b();const y=()=>b();return window.addEventListener("resize",y),()=>window.removeEventListener("resize",y)},[b]);const T=y=>{const _=f.current;if(!_)return;const N=_.getBoundingClientRect(),V=y.clientX-N.left,D=y.clientY-N.top,U=M.current.find(O=>V>=O.x&&V<=O.x+O.w&&D>=O.y&&D<=O.y+O.h);if(U){m(U);const O=v.current.find(A=>A.module===U.module);h(O||null);return}m(null);const w=v.current.find(O=>V>=O.x&&V<=O.x+O.w&&D>=O.y&&D<=O.y+O.h);h(w||null)},L=()=>{p?e(p.item):d&&d.items.length>0&&e(d.items[0])};return S.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[S.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[S.jsxs("div",{children:[S.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx(vv,{size:16,color:"var(--accent)"}),"Nested Cognitive Memory Treemap"]}),S.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Interactive nested squarified clusters: Pinned (violet), 2.0x Error Traps (amber), Strong (blue), Active (green), Fading (slate)."})]}),S.jsxs("div",{style:{display:"flex",gap:"8px"},children:[S.jsxs("button",{onClick:()=>s("treemap"),className:`btn btn-pill ${i==="treemap"?"btn-primary":""}`,children:[S.jsx(vv,{size:13})," Treemap Canvas"]}),S.jsxs("button",{onClick:()=>s("table"),className:`btn btn-pill ${i==="table"?"btn-primary":""}`,children:[S.jsx(rb,{size:13})," Table Twin"]})]})]}),i==="treemap"?S.jsxs("div",{ref:l,style:{width:"100%",height:"520px",position:"relative",padding:"12px",boxSizing:"border-box"},children:[S.jsx("canvas",{ref:f,onMouseMove:T,onMouseLeave:()=>{h(null),m(null)},onClick:L,style:{width:"100%",height:"100%",display:"block",cursor:p||d?"pointer":"default"}}),(p||d)&&S.jsxs("div",{style:{position:"absolute",bottom:"20px",left:"20px",right:"20px",background:"rgba(15, 23, 42, 0.95)",border:"1px solid var(--accent)",borderRadius:"8px",padding:"12px 18px",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 8px 24px rgba(0,0,0,0.5)",backdropFilter:"blur(8px)",zIndex:20},children:[S.jsxs("div",{children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx("span",{style:{fontSize:"11px",color:"var(--accent)",fontWeight:700,textTransform:"uppercase"},children:p?`${p.module} &bull; ${p.item.id}`:`${d?.module} Module`}),p?.item.kind==="error_trap"&&S.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0x TRAP"}),p?.item.pinned===1&&S.jsx("span",{className:"badge-tag",style:{background:"rgba(139, 92, 246, 0.15)",color:"#8b5cf6"},children:"PINNED"})]}),S.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginTop:"2px",color:"#fff"},children:p?p.item.title:`${d?.items.length} Memories Cluster`})]}),S.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[S.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Click to open inspector"}),p&&S.jsx(mi,{text:p.item.id,label:"Copy ID"})]})]})]}):S.jsx("div",{style:{overflowX:"auto"},children:S.jsxs("table",{style:{width:"100%",borderCollapse:"collapse",fontSize:"13px"},"aria-rowcount":o.length,children:[S.jsx("thead",{children:S.jsxs("tr",{style:{background:"var(--bg-subtle)",textAlign:"left",borderBottom:"1px solid var(--border)"},children:[S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"ID"}),S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Title"}),S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Module"}),S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Kind"}),S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Score"}),S.jsx("th",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:"Actions"})]})}),S.jsx("tbody",{children:o.map((y,_)=>S.jsxs("tr",{onClick:()=>e(y),style:{borderBottom:"1px solid var(--border)",cursor:"pointer",background:_%2===0?"transparent":"var(--bg-subtle)"},children:[S.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)",fontSize:"12px"},children:y.id}),S.jsx("td",{style:{padding:"10px 16px",fontWeight:500},children:y.title}),S.jsx("td",{style:{padding:"10px 16px",color:"var(--text-muted)"},children:y.module}),S.jsx("td",{style:{padding:"10px 16px"},children:S.jsx("span",{className:"badge-tag",style:{background:y.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:y.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:y.kind.toUpperCase()})}),S.jsx("td",{style:{padding:"10px 16px",fontFamily:"var(--font-mono)"},children:y.reward_score}),S.jsx("td",{style:{padding:"10px 16px"},children:S.jsx(mi,{text:y.id,label:"ID"})})]},y.id))})]})})]})},Lb=()=>{const[o,e]=wt.useState("jwt expiration"),[i,s]=wt.useState(!1),[l,f]=wt.useState(null);return wt.useEffect(()=>{if(!o.trim()){f(null);return}s(!0);const d=setTimeout(()=>{fetch(`/api/search/explain?q=${encodeURIComponent(o)}`).then(h=>h.json()).then(h=>{f(h),s(!1)}).catch(()=>s(!1))},200);return()=>clearTimeout(d)},[o]),S.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[S.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)"},children:[S.jsxs("h3",{style:{fontSize:"15px",fontWeight:600,display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx(ob,{size:16,color:"var(--accent)"}),"Live Triple-Stream RRF Search Diagnostic"]}),S.jsx("p",{style:{fontSize:"12px",color:"var(--text-muted)",marginTop:"2px"},children:"Real backend query execution across FTS5 (BM25), Vector Cosine, and Spreading Activation graph with 2.0x trap boosting."}),S.jsxs("div",{style:{marginTop:"14px",position:"relative"},children:[S.jsx(ap,{size:15,style:{position:"absolute",left:"12px",top:"10px",color:"var(--text-muted)"}}),S.jsx("input",{type:"text",value:o,onChange:d=>e(d.target.value),placeholder:"Type query to trigger live RRF multi-stream fusion...",style:{width:"100%",padding:"8px 12px 8px 36px",borderRadius:"8px",border:"1px solid var(--border)",background:"var(--bg-subtle)",color:"var(--text)",fontSize:"13px",outline:"none"}})]})]}),S.jsxs("div",{style:{padding:"20px"},children:[S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px",marginBottom:"20px"},children:[S.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#38bdf8",fontWeight:600},children:[S.jsx(ap,{size:14})," Stream A: FTS5 BM25"]}),S.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.15,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),S.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"SQLite Full-Text Token Index"})]}),S.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#a855f7",fontWeight:600},children:[S.jsx(lb,{size:14})," Stream B: Vector Cosine"]}),S.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.45,l.totalTimeMs*.6).toFixed(2)} ms`:"—"}),S.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"Local In-Process Embeddings"})]}),S.jsxs("div",{style:{padding:"12px 14px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"12px",color:"#34d399",fontWeight:600},children:[S.jsx(cb,{size:14})," Stream C: Graph Spreading"]}),S.jsx("div",{style:{fontSize:"18px",fontWeight:700,marginTop:"6px"},children:l?`${Math.max(.2,l.totalTimeMs*.2).toFixed(2)} ms`:"—"}),S.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)"},children:"2-Hop Causal Link Expansion"})]})]}),S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",borderRadius:"8px",background:"var(--accent-weak)",border:"1px solid var(--accent)",color:"var(--accent)",fontSize:"12px",fontFamily:"var(--font-mono)",marginBottom:"20px"},children:[S.jsxs("span",{children:["Total Pipeline Latency: ",S.jsx("b",{children:l?`${l.totalTimeMs} ms`:"—"})," (Budget: ",l?.totalTokens||0," tokens)"]}),S.jsx(mi,{text:`fastrmemory recall "${o}"`,label:"Copy Recall CLI"})]}),S.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:i?S.jsx("div",{className:"skeleton-box",style:{height:"120px"}}):!l||l.results.length===0?S.jsx("div",{style:{textAlign:"center",padding:"30px",color:"var(--text-muted)",fontSize:"13px"},children:"No memories matched this query in the live SQLite index."}):l.results.map((d,h)=>{const p=d.kind==="error_trap";return S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",borderLeft:`4px solid ${p?"var(--trap)":"var(--accent)"}`},children:[S.jsxs("div",{children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsxs("span",{style:{fontSize:"12px",fontWeight:700,color:"var(--accent)"},children:["#",h+1]}),S.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:d.title}),p&&S.jsx("span",{className:"badge-tag",style:{background:"var(--trap-weak)",color:"var(--trap)"},children:"2.0X TRAP BOOST"})]}),S.jsxs("div",{style:{fontSize:"11px",color:"var(--text-muted)",marginTop:"4px"},children:[S.jsx("code",{children:d.id})," • Module: ",S.jsx("b",{children:d.module})," • Ranks: [A: ",d.rankA??"—",", B: ",d.rankB??"—",", C: ",d.rankC??"—","]"]})]}),S.jsxs("div",{style:{textAlign:"right",display:"flex",alignItems:"center",gap:"14px"},children:[S.jsxs("div",{children:[S.jsx("div",{style:{fontSize:"13px",fontWeight:700,fontFamily:"var(--font-mono)"},children:d.score.toFixed(4)}),S.jsx("div",{style:{fontSize:"10px",color:"var(--text-muted)"},children:"Fused Score"})]}),S.jsx(mi,{text:d.id,label:"ID"})]})]},d.id)})})]})]})},z_=({conflict:o,memoryA:e,memoryB:i,onResolve:s})=>{const l=wt.useMemo(()=>{const f=(e?.content||"").split(`
`),d=(i?.content||"").split(`
`),h=[],p=Math.max(f.length,d.length);for(let m=0;m<p;m++){const v=f[m],M=d[m];v===M?v!==void 0&&h.push({type:"same",text:v}):(v!==void 0&&h.push({type:"removed",text:v}),M!==void 0&&h.push({type:"added",text:M}))}return h},[e,i]);return S.jsxs("div",{className:"card-panel",style:{padding:"18px",marginBottom:"14px",borderLeft:"4px solid var(--risk)"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsxs("span",{className:"badge-tag",style:{background:"var(--risk-weak)",color:"var(--risk)"},children:[S.jsx(Uu,{size:12})," CONFLICT #",o.id," (",(o.score*100).toFixed(0),"%)"]}),S.jsx("span",{style:{fontSize:"13px",fontWeight:600},children:o.reason})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:o.created_at}),S.jsx(mi,{text:`# Conflict ${o.id}
Memory A: ${o.memory_a_id}
Memory B: ${o.memory_b_id}
Reason: ${o.reason}`,label:"Copy Report"})]})]}),S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px",marginBottom:"14px"},children:[S.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[S.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--accent)"},children:["MEMORY A: ",S.jsx("code",{children:o.memory_a_id})]}),S.jsx(mi,{text:o.memory_a_id,label:"ID"})]}),S.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:e?.title||"Memory A"}),S.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:e?.content||"Loading content..."})]}),S.jsxs("div",{style:{padding:"12px",borderRadius:"8px",background:"var(--bg-subtle)",border:"1px solid var(--border)"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"6px"},children:[S.jsxs("span",{style:{fontSize:"11px",fontWeight:600,color:"var(--risk)"},children:["MEMORY B: ",S.jsx("code",{children:o.memory_b_id})]}),S.jsx(mi,{text:o.memory_b_id,label:"ID"})]}),S.jsx("div",{style:{fontSize:"13px",fontWeight:600,marginBottom:"4px"},children:i?.title||"Memory B"}),S.jsx("div",{style:{fontSize:"12px",color:"var(--text-muted)",lineHeight:"1.5"},children:i?.content||"Loading content..."})]})]}),S.jsx("div",{style:{background:"var(--bg)",borderRadius:"8px",border:"1px solid var(--border)",padding:"10px",fontFamily:"var(--font-mono)",fontSize:"12px",marginBottom:"14px",maxHeight:"160px",overflowY:"auto"},children:l.map((f,d)=>S.jsxs("div",{style:{padding:"2px 8px",borderRadius:"2px",background:f.type==="added"?"rgba(34, 197, 94, 0.12)":f.type==="removed"?"rgba(244, 63, 94, 0.12)":"transparent",color:f.type==="added"?"#4ade80":f.type==="removed"?"#fb7185":"var(--text-muted)",display:"flex",gap:"8px"},children:[S.jsx("span",{style:{userSelect:"none",width:"16px",color:"var(--text-faint)"},children:f.type==="added"?"+":f.type==="removed"?"-":" "}),S.jsx("span",{children:f.text})]},d))}),S.jsxs("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"},children:[S.jsxs("button",{onClick:()=>s(o.id,o.memory_a_id,!0),className:"btn btn-primary",children:[S.jsx(ip,{size:14})," Keep A (",o.memory_a_id,")"]}),S.jsxs("button",{onClick:()=>s(o.id,o.memory_b_id,!0),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)"},children:[S.jsx(ip,{size:14})," Keep B (",o.memory_b_id,")"]}),S.jsx("button",{onClick:()=>s(o.id,o.memory_a_id,!1),className:"btn",children:"Keep Both (Weaken B Score)"})]})]})},Ob=({content:o,className:e,style:i})=>{if(!o)return null;const s=o.split(`
`),l=[];let f=!1,d=[],h="";const p=m=>m.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g).map((M,x)=>M.startsWith("`")&&M.endsWith("`")?S.jsx("code",{style:{background:"var(--bg-subtle)",padding:"2px 6px",borderRadius:"4px",fontFamily:"var(--font-mono)",fontSize:"0.9em",color:"var(--accent)",border:"1px solid var(--border)"},children:M.slice(1,-1)},x):M.startsWith("**")&&M.endsWith("**")?S.jsx("strong",{style:{color:"var(--text-strong)",fontWeight:600},children:M.slice(2,-2)},x):M.startsWith("*")&&M.endsWith("*")?S.jsx("em",{children:M.slice(1,-1)},x):M);for(let m=0;m<s.length;m++){const v=s[m];if(v.trim().startsWith("```")){if(f){const x=d.join(`
`);l.push(S.jsxs("div",{style:{position:"relative",margin:"10px 0",borderRadius:"8px",background:"var(--bg-code, #0b0f19)",border:"1px solid var(--border)",overflow:"hidden"},children:[h&&S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 12px",background:"rgba(255,255,255,0.03)",borderBottom:"1px solid var(--border)",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[S.jsx("span",{children:h}),S.jsx(mi,{text:x,label:"Copy"})]}),S.jsx("pre",{style:{margin:0,padding:"12px 14px",fontFamily:"var(--font-mono)",fontSize:"12px",lineHeight:1.5,color:"#e2e8f0",overflowX:"auto"},children:S.jsx("code",{children:x})})]},`code-${m}`)),d=[],h="",f=!1}else f=!0,h=v.trim().slice(3).trim();continue}if(f){d.push(v);continue}if(v.startsWith("### ")){l.push(S.jsx("h4",{style:{fontSize:"14px",fontWeight:700,margin:"14px 0 6px 0",color:"var(--text-strong)"},children:p(v.slice(4))},`h4-${m}`));continue}if(v.startsWith("## ")){l.push(S.jsx("h3",{style:{fontSize:"15px",fontWeight:700,margin:"16px 0 8px 0",color:"var(--text-strong)"},children:p(v.slice(3))},`h3-${m}`));continue}if(v.startsWith("# ")){l.push(S.jsx("h2",{style:{fontSize:"17px",fontWeight:800,margin:"18px 0 10px 0",color:"var(--text-strong)"},children:p(v.slice(2))},`h2-${m}`));continue}if(v.trim().startsWith("- ")||v.trim().startsWith("* ")){l.push(S.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[S.jsx("span",{style:{color:"var(--accent)",fontWeight:700},children:"•"}),S.jsx("div",{children:p(v.trim().slice(2))})]},`li-${m}`));continue}const M=v.trim().match(/^(\d+)\.\s+(.*)$/);if(M){l.push(S.jsxs("div",{style:{display:"flex",alignItems:"flex-start",gap:"8px",margin:"4px 0",fontSize:"13px",lineHeight:1.5},children:[S.jsxs("span",{style:{color:"var(--accent)",fontWeight:600,fontFamily:"var(--font-mono)"},children:[M[1],"."]}),S.jsx("div",{children:p(M[2])})]},`ol-${m}`));continue}if(v.trim().startsWith("> ")){l.push(S.jsx("blockquote",{style:{margin:"8px 0",padding:"6px 12px",borderLeft:"3px solid var(--accent)",background:"var(--accent-weak)",borderRadius:"0 6px 6px 0",fontSize:"12px",color:"var(--text)"},children:p(v.trim().slice(2))},`quote-${m}`));continue}if(!v.trim()){l.push(S.jsx("div",{style:{height:"8px"}},`sp-${m}`));continue}l.push(S.jsx("p",{style:{margin:"4px 0",fontSize:"13px",lineHeight:1.55,color:"var(--text)"},children:p(v)},`p-${m}`))}return S.jsx("div",{className:e,style:{...i,wordBreak:"break-word"},children:l})},Pb=({memory:o,onClose:e,onTogglePin:i,onForget:s})=>(wt.useEffect(()=>{const l=f=>{f.key==="Escape"&&e()};return window.addEventListener("keydown",l),()=>window.removeEventListener("keydown",l)},[e]),o?S.jsxs(S.Fragment,{children:[S.jsx("div",{className:"drawer-backdrop",onClick:e}),S.jsxs("div",{className:"drawer-panel",onClick:l=>l.stopPropagation(),children:[S.jsxs("div",{style:{padding:"16px 20px",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[S.jsxs("div",{style:{flex:1,paddingRight:"12px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},children:[S.jsxs("span",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600},children:["[",o.id,"]"]}),S.jsx("span",{className:"badge-tag",style:{background:o.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:o.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:o.kind.toUpperCase()}),S.jsx("span",{className:"badge-tag",style:{background:"var(--bg-subtle)",color:"var(--text-muted)"},children:o.status.toUpperCase()})]}),S.jsx("h2",{style:{fontSize:"15px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:o.title})]}),S.jsx("button",{onClick:e,className:"btn",style:{padding:"4px 8px",color:"var(--text-muted)"},title:"Close (Esc)",children:"✕"})]}),S.jsxs("div",{style:{padding:"10px 20px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("span",{style:{color:"var(--text-muted)"},children:"Author:"}),S.jsxs("span",{style:{fontFamily:"var(--font-mono)",color:"var(--text)",fontWeight:600},children:["@",o.agent_id||"default"]})]}),o.provenance_hash?S.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},title:`SHA-256 Authentic Provenance: ${o.provenance_hash}`,children:["🔒 prov_",o.provenance_hash.slice(0,10)]}):S.jsx("span",{style:{color:"var(--text-faint)",fontSize:"10px"},children:"legacy unsigned"})]}),S.jsxs("div",{style:{padding:"20px",flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:"16px"},children:[S.jsxs("div",{children:[S.jsx("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:"Memory Content"}),S.jsx("div",{style:{background:"var(--bg)",border:"1px solid var(--border)",borderRadius:"6px",padding:"14px"},children:S.jsx(Ob,{content:o.content})})]}),o.linked_files&&o.linked_files.length>0&&S.jsxs("div",{children:[S.jsxs("div",{style:{fontSize:"11px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.05em",marginBottom:"8px"},children:["Linked Files (",o.linked_files.length,")"]}),S.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"},children:o.linked_files.map(l=>S.jsx("span",{className:"badge-tag",style:{background:"var(--bg)",border:"1px solid var(--border)",color:"var(--text-muted)"},children:l},l))})]}),S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"8px",borderTop:"1px solid var(--border)",paddingTop:"14px"},children:[S.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"MODULE"}),S.jsx("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px"},children:o.module})]}),S.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"REWARD"}),S.jsxs("div",{style:{fontFamily:"var(--font-mono)",fontWeight:600,fontSize:"12px",marginTop:"2px",color:"var(--accent)"},children:[o.reward_score.toFixed(2),"x"]})]}),S.jsxs("div",{style:{background:"var(--bg)",padding:"8px 10px",borderRadius:"4px",border:"1px solid var(--border)"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"CREATED"}),S.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",marginTop:"2px",color:"var(--text-muted)"},children:new Date(o.created_at).toLocaleDateString()})]})]})]}),S.jsxs("div",{style:{padding:"12px 20px",borderTop:"1px solid var(--border)",background:"var(--surface)",display:"flex",justifyContent:"space-between",alignItems:"center"},children:[S.jsxs("div",{style:{display:"flex",gap:"8px"},children:[S.jsx(mi,{text:o.content,label:"Copy Rule"}),S.jsx(mi,{text:`fastrmemory recall "${o.title}"`,label:"CLI"}),S.jsxs("button",{onClick:()=>i(o.id,o.pinned),className:"btn",style:{fontSize:"11.5px"},children:[S.jsx(I_,{size:12,color:o.pinned?"#8b5cf6":"var(--text-muted)"}),o.pinned?"Unpin":"Pin"]})]}),S.jsxs("button",{onClick:()=>s(o.id),className:"btn",style:{borderColor:"var(--risk)",color:"var(--risk)",fontSize:"11.5px"},children:[S.jsx(ub,{size:12})," Forget"]})]})]})]}):null);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Jp="186",ao={ROTATE:0,DOLLY:1,PAN:2},no={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Ib=0,Av=1,zb=2,Tu=1,Bb=2,ml=3,Qs=0,jn=1,Fi=2,Pa=0,xl=1,Rv=2,Cv=3,wv=4,Fb=5,eo=100,Hb=101,Gb=102,Vb=103,kb=104,Xb=200,Wb=201,jb=202,qb=203,B_=204,F_=205,Yb=206,Zb=207,Kb=208,Qb=209,Jb=210,$b=211,tE=212,eE=213,nE=214,sp=0,rp=1,op=2,_l=3,lp=4,cp=5,up=6,fp=7,H_=0,iE=1,aE=2,la=0,G_=1,V_=2,k_=3,$p=4,X_=5,W_=6,j_=7,q_=300,Js=301,oo=302,bh=303,Eh=304,ku=306,dp=1e3,Oa=1001,hp=1002,On=1003,sE=1004,Qc=1005,Fn=1006,Th=1007,Zs=1008,hi=1009,Y_=1010,Z_=1011,yl=1012,tm=1013,ua=1014,ra=1015,fa=1016,em=1017,nm=1018,Sl=1020,K_=35902,Q_=35899,J_=1021,$_=1022,Gi=1023,za=1026,Ks=1027,ty=1028,im=1029,$s=1030,am=1031,sm=1033,Au=33776,Ru=33777,Cu=33778,wu=33779,pp=35840,mp=35841,gp=35842,xp=35843,vp=36196,_p=37492,yp=37496,Sp=37488,Mp=37489,Lu=37490,bp=37491,Ep=37808,Tp=37809,Ap=37810,Rp=37811,Cp=37812,wp=37813,Dp=37814,Np=37815,Up=37816,Lp=37817,Op=37818,Pp=37819,Ip=37820,zp=37821,Bp=36492,Fp=36494,Hp=36495,Gp=36283,Vp=36284,Ou=36285,kp=36286,rE=3200,Xp=0,oE=1,xs="",Ci="srgb",Pu="srgb-linear",Iu="linear",Ze="srgb",Ah=7680,lE=519,cE=512,uE=513,fE=514,rm=515,dE=516,hE=517,om=518,pE=519,mE=35044,Dv="300 es",oa=2e3,Ml=2001;function gE(o){for(let e=o.length-1;e>=0;--e)if(o[e]>=65535)return!0;return!1}function zu(o){return document.createElementNS("http://www.w3.org/1999/xhtml",o)}function xE(){const o=zu("canvas");return o.style.display="block",o}const Nv={};function Uv(...o){const e="THREE."+o.shift();console.log(e,...o)}function ey(o){const e=o[0];if(typeof e=="string"&&e.startsWith("TSL:")){const i=o[1];i&&i.isStackTrace?o[0]+=" "+i.getLocation():o[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return o}function de(...o){o=ey(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.warn(i.getError(e)):console.warn(e,...o)}}function He(...o){o=ey(o);const e="THREE."+o.shift();{const i=o[0];i&&i.isStackTrace?console.error(i.getError(e)):console.error(e,...o)}}function so(...o){const e=o.join(" ");e in Nv||(Nv[e]=!0,de(...o))}function vE(o,e,i){return new Promise(function(s,l){function f(){switch(o.clientWaitSync(e,o.SYNC_FLUSH_COMMANDS_BIT,0)){case o.WAIT_FAILED:l();break;case o.TIMEOUT_EXPIRED:setTimeout(f,i);break;default:s()}}setTimeout(f,i)})}const _E={[sp]:rp,[op]:up,[lp]:fp,[_l]:cp,[rp]:sp,[up]:op,[fp]:lp,[cp]:_l};class ys{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){const s=this._listeners;return s===void 0?!1:s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){const s=this._listeners;if(s===void 0)return;const l=s[e];if(l!==void 0){const f=l.indexOf(i);f!==-1&&l.splice(f,1)}}dispatchEvent(e){const i=this._listeners;if(i===void 0)return;const s=i[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let f=0,d=l.length;f<d;f++)l[f].call(this,e);e.target=null}}}const zn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Du=Math.PI/180,Wp=180/Math.PI;function El(){const o=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(zn[o&255]+zn[o>>8&255]+zn[o>>16&255]+zn[o>>24&255]+"-"+zn[e&255]+zn[e>>8&255]+"-"+zn[e>>16&15|64]+zn[e>>24&255]+"-"+zn[i&63|128]+zn[i>>8&255]+"-"+zn[i>>16&255]+zn[i>>24&255]+zn[s&255]+zn[s>>8&255]+zn[s>>16&255]+zn[s>>24&255]).toLowerCase()}function Ne(o,e,i){return Math.max(e,Math.min(i,o))}function yE(o,e){return(o%e+e)%e}function Rh(o,e,i){return(1-i)*o+i*e}function ol(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return o/4294967295;case Uint16Array:return o/65535;case Uint8Array:case Uint8ClampedArray:return o/255;case Int32Array:return Math.max(o/2147483647,-1);case Int16Array:return Math.max(o/32767,-1);case Int8Array:return Math.max(o/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function $n(o,e){switch(e.constructor){case Float32Array:return o;case Uint32Array:return Math.round(o*4294967295);case Uint16Array:return Math.round(o*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(o*255);case Int32Array:return Math.round(o*2147483647);case Int16Array:return Math.round(o*32767);case Int8Array:return Math.round(o*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const SE={DEG2RAD:Du};class he{static{he.prototype.isVector2=!0}constructor(e=0,i=0){this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ne(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),f=this.x-e.x,d=this.y-e.y;return this.x=f*s-d*l+e.x,this.y=f*l+d*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class vs{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,f,d,h){let p=s[l+0],m=s[l+1],v=s[l+2],M=s[l+3],x=f[d+0],b=f[d+1],T=f[d+2],L=f[d+3];if(M!==L||p!==x||m!==b||v!==T){let y=p*x+m*b+v*T+M*L;y<0&&(x=-x,b=-b,T=-T,L=-L,y=-y);let _=1-h;if(y<.9995){const N=Math.acos(y),V=Math.sin(N);_=Math.sin(_*N)/V,h=Math.sin(h*N)/V,p=p*_+x*h,m=m*_+b*h,v=v*_+T*h,M=M*_+L*h}else{p=p*_+x*h,m=m*_+b*h,v=v*_+T*h,M=M*_+L*h;const N=1/Math.sqrt(p*p+m*m+v*v+M*M);p*=N,m*=N,v*=N,M*=N}}e[i]=p,e[i+1]=m,e[i+2]=v,e[i+3]=M}static multiplyQuaternionsFlat(e,i,s,l,f,d){const h=s[l],p=s[l+1],m=s[l+2],v=s[l+3],M=f[d],x=f[d+1],b=f[d+2],T=f[d+3];return e[i]=h*T+v*M+p*b-m*x,e[i+1]=p*T+v*x+m*M-h*b,e[i+2]=m*T+v*b+h*x-p*M,e[i+3]=v*T-h*M-p*x-m*b,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,f=e._z,d=e._order,h=Math.cos,p=Math.sin,m=h(s/2),v=h(l/2),M=h(f/2),x=p(s/2),b=p(l/2),T=p(f/2);switch(d){case"XYZ":this._x=x*v*M+m*b*T,this._y=m*b*M-x*v*T,this._z=m*v*T+x*b*M,this._w=m*v*M-x*b*T;break;case"YXZ":this._x=x*v*M+m*b*T,this._y=m*b*M-x*v*T,this._z=m*v*T-x*b*M,this._w=m*v*M+x*b*T;break;case"ZXY":this._x=x*v*M-m*b*T,this._y=m*b*M+x*v*T,this._z=m*v*T+x*b*M,this._w=m*v*M-x*b*T;break;case"ZYX":this._x=x*v*M-m*b*T,this._y=m*b*M+x*v*T,this._z=m*v*T-x*b*M,this._w=m*v*M+x*b*T;break;case"YZX":this._x=x*v*M+m*b*T,this._y=m*b*M+x*v*T,this._z=m*v*T-x*b*M,this._w=m*v*M-x*b*T;break;case"XZY":this._x=x*v*M-m*b*T,this._y=m*b*M-x*v*T,this._z=m*v*T+x*b*M,this._w=m*v*M+x*b*T;break;default:de("Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],f=i[8],d=i[1],h=i[5],p=i[9],m=i[2],v=i[6],M=i[10],x=s+h+M;if(x>0){const b=.5/Math.sqrt(x+1);this._w=.25/b,this._x=(v-p)*b,this._y=(f-m)*b,this._z=(d-l)*b}else if(s>h&&s>M){const b=2*Math.sqrt(1+s-h-M);this._w=(v-p)/b,this._x=.25*b,this._y=(l+d)/b,this._z=(f+m)/b}else if(h>M){const b=2*Math.sqrt(1+h-s-M);this._w=(f-m)/b,this._x=(l+d)/b,this._y=.25*b,this._z=(p+v)/b}else{const b=2*Math.sqrt(1+M-s-h);this._w=(d-l)/b,this._x=(f+m)/b,this._y=(p+v)/b,this._z=.25*b}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<1e-8?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ne(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,f=e._z,d=e._w,h=i._x,p=i._y,m=i._z,v=i._w;return this._x=s*v+d*h+l*m-f*p,this._y=l*v+d*p+f*h-s*m,this._z=f*v+d*m+s*p-l*h,this._w=d*v-s*h-l*p-f*m,this._onChangeCallback(),this}slerp(e,i){let s=e._x,l=e._y,f=e._z,d=e._w,h=this.dot(e);h<0&&(s=-s,l=-l,f=-f,d=-d,h=-h);let p=1-i;if(h<.9995){const m=Math.acos(h),v=Math.sin(m);p=Math.sin(p*m)/v,i=Math.sin(i*m)/v,this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this._onChangeCallback()}else this._x=this._x*p+s*i,this._y=this._y*p+l*i,this._z=this._z*p+f*i,this._w=this._w*p+d*i,this.normalize();return this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),f=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),f*Math.sin(i),f*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class nt{static{nt.prototype.isVector3=!0}constructor(e=0,i=0,s=0){this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(Lv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(Lv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[3]*s+f[6]*l,this.y=f[1]*i+f[4]*s+f[7]*l,this.z=f[2]*i+f[5]*s+f[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=e.elements,d=1/(f[3]*i+f[7]*s+f[11]*l+f[15]);return this.x=(f[0]*i+f[4]*s+f[8]*l+f[12])*d,this.y=(f[1]*i+f[5]*s+f[9]*l+f[13])*d,this.z=(f[2]*i+f[6]*s+f[10]*l+f[14])*d,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,f=e.x,d=e.y,h=e.z,p=e.w,m=2*(d*l-h*s),v=2*(h*i-f*l),M=2*(f*s-d*i);return this.x=i+p*m+d*M-h*v,this.y=s+p*v+h*m-f*M,this.z=l+p*M+f*v-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,f=e.elements;return this.x=f[0]*i+f[4]*s+f[8]*l,this.y=f[1]*i+f[5]*s+f[9]*l,this.z=f[2]*i+f[6]*s+f[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this.z=Ne(this.z,e.z,i.z),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this.z=Ne(this.z,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,f=e.z,d=i.x,h=i.y,p=i.z;return this.x=l*p-f*h,this.y=f*d-s*p,this.z=s*h-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Ch.copy(this).projectOnVector(e),this.sub(Ch)}reflect(e){return this.sub(Ch.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ne(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ch=new nt,Lv=new vs;class ye{static{ye.prototype.isMatrix3=!0}constructor(e,i,s,l,f,d,h,p,m){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m)}set(e,i,s,l,f,d,h,p,m){const v=this.elements;return v[0]=e,v[1]=l,v[2]=h,v[3]=i,v[4]=f,v[5]=p,v[6]=s,v[7]=d,v[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[3],p=s[6],m=s[1],v=s[4],M=s[7],x=s[2],b=s[5],T=s[8],L=l[0],y=l[3],_=l[6],N=l[1],V=l[4],D=l[7],U=l[2],w=l[5],O=l[8];return f[0]=d*L+h*N+p*U,f[3]=d*y+h*V+p*w,f[6]=d*_+h*D+p*O,f[1]=m*L+v*N+M*U,f[4]=m*y+v*V+M*w,f[7]=m*_+v*D+M*O,f[2]=x*L+b*N+T*U,f[5]=x*y+b*V+T*w,f[8]=x*_+b*D+T*O,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],v=e[8];return i*d*v-i*h*m-s*f*v+s*h*p+l*f*m-l*d*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],v=e[8],M=v*d-h*m,x=h*p-v*f,b=m*f-d*p,T=i*M+s*x+l*b;if(T===0)return this.set(0,0,0,0,0,0,0,0,0);const L=1/T;return e[0]=M*L,e[1]=(l*m-v*s)*L,e[2]=(h*s-l*d)*L,e[3]=x*L,e[4]=(v*i-l*p)*L,e[5]=(l*f-h*i)*L,e[6]=b*L,e[7]=(s*p-m*i)*L,e[8]=(d*i-s*f)*L,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,f,d,h){const p=Math.cos(f),m=Math.sin(f);return this.set(s*p,s*m,-s*(p*d+m*h)+d+e,-l*m,l*p,-l*(-m*d+p*h)+h+i,0,0,1),this}scale(e,i){return so("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(wh.makeScale(e,i)),this}rotate(e){return so("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(wh.makeRotation(-e)),this}translate(e,i){return so("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(wh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const wh=new ye,Ov=new ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pv=new ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ME(){const o={enabled:!0,workingColorSpace:Pu,spaces:{},convert:function(l,f,d){return this.enabled===!1||f===d||!f||!d||(this.spaces[f].transfer===Ze&&(l.r=Ia(l.r),l.g=Ia(l.g),l.b=Ia(l.b)),this.spaces[f].primaries!==this.spaces[d].primaries&&(l.applyMatrix3(this.spaces[f].toXYZ),l.applyMatrix3(this.spaces[d].fromXYZ)),this.spaces[d].transfer===Ze&&(l.r=ro(l.r),l.g=ro(l.g),l.b=ro(l.b))),l},workingToColorSpace:function(l,f){return this.convert(l,this.workingColorSpace,f)},colorSpaceToWorking:function(l,f){return this.convert(l,f,this.workingColorSpace)},getPrimaries:function(l){return this.spaces[l].primaries},getTransfer:function(l){return l===xs?Iu:this.spaces[l].transfer},getToneMappingMode:function(l){return this.spaces[l].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(l,f=this.workingColorSpace){return l.fromArray(this.spaces[f].luminanceCoefficients)},define:function(l){Object.assign(this.spaces,l)},_getMatrix:function(l,f,d){return l.copy(this.spaces[f].toXYZ).multiply(this.spaces[d].fromXYZ)},_getDrawingBufferColorSpace:function(l){return this.spaces[l].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(l=this.workingColorSpace){return this.spaces[l].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(l,f){return so("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),o.workingToColorSpace(l,f)},toWorkingColorSpace:function(l,f){return so("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),o.colorSpaceToWorking(l,f)}},e=[.64,.33,.3,.6,.15,.06],i=[.2126,.7152,.0722],s=[.3127,.329];return o.define({[Pu]:{primaries:e,whitePoint:s,transfer:Iu,toXYZ:Ov,fromXYZ:Pv,luminanceCoefficients:i,workingColorSpaceConfig:{unpackColorSpace:Ci},outputColorSpaceConfig:{drawingBufferColorSpace:Ci}},[Ci]:{primaries:e,whitePoint:s,transfer:Ze,toXYZ:Ov,fromXYZ:Pv,luminanceCoefficients:i,outputColorSpaceConfig:{drawingBufferColorSpace:Ci}}}),o}const Be=ME();function Ia(o){return o<.04045?o*.0773993808:Math.pow(o*.9478672986+.0521327014,2.4)}function ro(o){return o<.0031308?o*12.92:1.055*Math.pow(o,.41666)-.055}let Vr;class bE{static getDataURL(e,i="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let s;if(e instanceof HTMLCanvasElement)s=e;else{Vr===void 0&&(Vr=zu("canvas")),Vr.width=e.width,Vr.height=e.height;const l=Vr.getContext("2d");e instanceof ImageData?l.putImageData(e,0,0):l.drawImage(e,0,0,e.width,e.height),s=Vr}return s.toDataURL(i)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=zu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),f=l.data;for(let d=0;d<f.length;d++)f[d]=Ia(f[d]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(Ia(i[s]/255)*255):i[s]=Ia(i[s]);return{data:i,width:e.width,height:e.height}}else return de("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let EE=0;class lm{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:EE++}),this.uuid=El(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const i=this.data;return typeof HTMLVideoElement<"u"&&i instanceof HTMLVideoElement?e.set(i.videoWidth,i.videoHeight,0):typeof VideoFrame<"u"&&i instanceof VideoFrame?e.set(i.displayWidth,i.displayHeight,0):i!==null?e.set(i.width,i.height,i.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let f;if(Array.isArray(l)){f=[];for(let d=0,h=l.length;d<h;d++)l[d].isDataTexture?f.push(Dh(l[d].image)):f.push(Dh(l[d]))}else f=Dh(l);s.url=f}return i||(e.images[this.uuid]=s),s}}function Dh(o){return typeof HTMLImageElement<"u"&&o instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&o instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&o instanceof ImageBitmap?bE.getDataURL(o):o.data?{data:Array.from(o.data),width:o.width,height:o.height,type:o.data.constructor.name}:(de("Texture: Unable to serialize Texture."),{})}let TE=0;const Nh=new nt;class qn extends ys{constructor(e=qn.DEFAULT_IMAGE,i=qn.DEFAULT_MAPPING,s=Oa,l=Oa,f=Fn,d=Zs,h=Gi,p=hi,m=qn.DEFAULT_ANISOTROPY,v=xs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:TE++}),this.uuid=El(),this.name="",this.source=new lm(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=f,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=v,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Nh).x}get height(){return this.source.getSize(Nh).y}get depth(){return this.source.getSize(Nh).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const i in e){const s=e[i];if(s===void 0){de(`Texture.setValues(): parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){de(`Texture.setValues(): property '${i}' does not exist.`);continue}l&&s&&l.isVector2&&s.isVector2||l&&s&&l.isVector3&&s.isVector3||l&&s&&l.isMatrix3&&s.isMatrix3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==q_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dp:e.x=e.x-Math.floor(e.x);break;case Oa:e.x=e.x<0?0:1;break;case hp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dp:e.y=e.y-Math.floor(e.y);break;case Oa:e.y=e.y<0?0:1;break;case hp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}qn.DEFAULT_IMAGE=null;qn.DEFAULT_MAPPING=q_;qn.DEFAULT_ANISOTROPY=1;class on{static{on.prototype.isVector4=!0}constructor(e=0,i=0,s=0,l=1){this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,f=this.w,d=e.elements;return this.x=d[0]*i+d[4]*s+d[8]*l+d[12]*f,this.y=d[1]*i+d[5]*s+d[9]*l+d[13]*f,this.z=d[2]*i+d[6]*s+d[10]*l+d[14]*f,this.w=d[3]*i+d[7]*s+d[11]*l+d[15]*f,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,f;const p=e.elements,m=p[0],v=p[4],M=p[8],x=p[1],b=p[5],T=p[9],L=p[2],y=p[6],_=p[10];if(Math.abs(v-x)<.01&&Math.abs(M-L)<.01&&Math.abs(T-y)<.01){if(Math.abs(v+x)<.1&&Math.abs(M+L)<.1&&Math.abs(T+y)<.1&&Math.abs(m+b+_-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const V=(m+1)/2,D=(b+1)/2,U=(_+1)/2,w=(v+x)/4,O=(M+L)/4,A=(T+y)/4;return V>D&&V>U?V<.01?(s=0,l=.707106781,f=.707106781):(s=Math.sqrt(V),l=w/s,f=O/s):D>U?D<.01?(s=.707106781,l=0,f=.707106781):(l=Math.sqrt(D),s=w/l,f=A/l):U<.01?(s=.707106781,l=.707106781,f=0):(f=Math.sqrt(U),s=O/f,l=A/f),this.set(s,l,f,i),this}let N=Math.sqrt((y-T)*(y-T)+(M-L)*(M-L)+(x-v)*(x-v));return Math.abs(N)<.001&&(N=1),this.x=(y-T)/N,this.y=(M-L)/N,this.z=(x-v)/N,this.w=Math.acos((m+b+_-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Ne(this.x,e.x,i.x),this.y=Ne(this.y,e.y,i.y),this.z=Ne(this.z,e.z,i.z),this.w=Ne(this.w,e.w,i.w),this}clampScalar(e,i){return this.x=Ne(this.x,e,i),this.y=Ne(this.y,e,i),this.z=Ne(this.z,e,i),this.w=Ne(this.w,e,i),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Ne(s,e,i))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class AE extends ys{constructor(e=1,i=1,s={}){super(),s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},s),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=s.depth,this.scissor=new on(0,0,e,i),this.scissorTest=!1,this.viewport=new on(0,0,e,i),this.textures=[];const l={width:e,height:i,depth:s.depth},f=new qn(l),d=s.count;for(let h=0;h<d;h++)this.textures[h]=f.clone(),this.textures[h].isRenderTargetTexture=!0,this.textures[h].renderTarget=this;this._setTextureOptions(s),this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveColorBuffer=s.resolveColorBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.storeMultisampledColorBuffer=s.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=s.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=s.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=s.depthTexture,this.samples=s.samples,this.multiview=s.multiview,this.useArrayDepthTexture=s.useArrayDepthTexture}_setTextureOptions(e={}){const i={minFilter:Fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(i.mapping=e.mapping),e.wrapS!==void 0&&(i.wrapS=e.wrapS),e.wrapT!==void 0&&(i.wrapT=e.wrapT),e.wrapR!==void 0&&(i.wrapR=e.wrapR),e.magFilter!==void 0&&(i.magFilter=e.magFilter),e.minFilter!==void 0&&(i.minFilter=e.minFilter),e.format!==void 0&&(i.format=e.format),e.type!==void 0&&(i.type=e.type),e.anisotropy!==void 0&&(i.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(i.colorSpace=e.colorSpace),e.flipY!==void 0&&(i.flipY=e.flipY),e.generateMipmaps!==void 0&&(i.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(i.internalFormat=e.internalFormat);for(let s=0;s<this.textures.length;s++)this.textures[s].setValues(i)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,f=this.textures.length;l<f;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s,this.textures[l].isData3DTexture!==!0&&(this.textures[l].isArrayTexture=this.textures[l].image.depth>1);this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let i=0,s=e.textures.length;i<s;i++){this.textures[i]=e.textures[i].clone(),this.textures[i].isRenderTargetTexture=!0,this.textures[i].renderTarget=this;const l=Object.assign({},e.textures[i].image);this.textures[i].source=new lm(l)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const i=e.depthTexture.clone();i.renderTarget=null,this.depthTexture=i}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Vi extends AE{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class ny extends qn{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class RE extends qn{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=On,this.minFilter=On,this.wrapR=Oa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}class an{static{an.prototype.isMatrix4=!0}constructor(e,i,s,l,f,d,h,p,m,v,M,x,b,T,L,y){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,f,d,h,p,m,v,M,x,b,T,L,y)}set(e,i,s,l,f,d,h,p,m,v,M,x,b,T,L,y){const _=this.elements;return _[0]=e,_[4]=i,_[8]=s,_[12]=l,_[1]=f,_[5]=d,_[9]=h,_[13]=p,_[2]=m,_[6]=v,_[10]=M,_[14]=x,_[3]=b,_[7]=T,_[11]=L,_[15]=y,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new an().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return this.determinantAffine()===0?(e.set(1,0,0),i.set(0,1,0),s.set(0,0,1),this):(e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this)}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const i=this.elements,s=e.elements,l=1/kr.setFromMatrixColumn(e,0).length(),f=1/kr.setFromMatrixColumn(e,1).length(),d=1/kr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*f,i[5]=s[5]*f,i[6]=s[6]*f,i[7]=0,i[8]=s[8]*d,i[9]=s[9]*d,i[10]=s[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,f=e.z,d=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),v=Math.cos(f),M=Math.sin(f);if(e.order==="XYZ"){const x=d*v,b=d*M,T=h*v,L=h*M;i[0]=p*v,i[4]=-p*M,i[8]=m,i[1]=b+T*m,i[5]=x-L*m,i[9]=-h*p,i[2]=L-x*m,i[6]=T+b*m,i[10]=d*p}else if(e.order==="YXZ"){const x=p*v,b=p*M,T=m*v,L=m*M;i[0]=x+L*h,i[4]=T*h-b,i[8]=d*m,i[1]=d*M,i[5]=d*v,i[9]=-h,i[2]=b*h-T,i[6]=L+x*h,i[10]=d*p}else if(e.order==="ZXY"){const x=p*v,b=p*M,T=m*v,L=m*M;i[0]=x-L*h,i[4]=-d*M,i[8]=T+b*h,i[1]=b+T*h,i[5]=d*v,i[9]=L-x*h,i[2]=-d*m,i[6]=h,i[10]=d*p}else if(e.order==="ZYX"){const x=d*v,b=d*M,T=h*v,L=h*M;i[0]=p*v,i[4]=T*m-b,i[8]=x*m+L,i[1]=p*M,i[5]=L*m+x,i[9]=b*m-T,i[2]=-m,i[6]=h*p,i[10]=d*p}else if(e.order==="YZX"){const x=d*p,b=d*m,T=h*p,L=h*m;i[0]=p*v,i[4]=L-x*M,i[8]=T*M+b,i[1]=M,i[5]=d*v,i[9]=-h*v,i[2]=-m*v,i[6]=b*M+T,i[10]=x-L*M}else if(e.order==="XZY"){const x=d*p,b=d*m,T=h*p,L=h*m;i[0]=p*v,i[4]=-M,i[8]=m*v,i[1]=x*M+L,i[5]=d*v,i[9]=b*M-T,i[2]=T*M-b,i[6]=h*v,i[10]=L*M+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(CE,e,wE)}lookAt(e,i,s){const l=this.elements;return fi.subVectors(e,i),fi.lengthSq()===0&&(fi.z=1),fi.normalize(),ds.crossVectors(s,fi),ds.lengthSq()===0&&(Math.abs(s.z)===1?fi.x+=1e-4:fi.z+=1e-4,fi.normalize(),ds.crossVectors(s,fi)),ds.normalize(),Jc.crossVectors(fi,ds),l[0]=ds.x,l[4]=Jc.x,l[8]=fi.x,l[1]=ds.y,l[5]=Jc.y,l[9]=fi.y,l[2]=ds.z,l[6]=Jc.z,l[10]=fi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,f=this.elements,d=s[0],h=s[4],p=s[8],m=s[12],v=s[1],M=s[5],x=s[9],b=s[13],T=s[2],L=s[6],y=s[10],_=s[14],N=s[3],V=s[7],D=s[11],U=s[15],w=l[0],O=l[4],A=l[8],P=l[12],z=l[1],k=l[5],Q=l[9],ct=l[13],q=l[2],it=l[6],F=l[10],X=l[14],st=l[3],Y=l[7],H=l[11],J=l[15];return f[0]=d*w+h*z+p*q+m*st,f[4]=d*O+h*k+p*it+m*Y,f[8]=d*A+h*Q+p*F+m*H,f[12]=d*P+h*ct+p*X+m*J,f[1]=v*w+M*z+x*q+b*st,f[5]=v*O+M*k+x*it+b*Y,f[9]=v*A+M*Q+x*F+b*H,f[13]=v*P+M*ct+x*X+b*J,f[2]=T*w+L*z+y*q+_*st,f[6]=T*O+L*k+y*it+_*Y,f[10]=T*A+L*Q+y*F+_*H,f[14]=T*P+L*ct+y*X+_*J,f[3]=N*w+V*z+D*q+U*st,f[7]=N*O+V*k+D*it+U*Y,f[11]=N*A+V*Q+D*F+U*H,f[15]=N*P+V*ct+D*X+U*J,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[12],d=e[1],h=e[5],p=e[9],m=e[13],v=e[2],M=e[6],x=e[10],b=e[14],T=e[3],L=e[7],y=e[11],_=e[15],N=p*b-m*x,V=h*b-m*M,D=h*x-p*M,U=d*b-m*v,w=d*x-p*v,O=d*M-h*v;return i*(L*N-y*V+_*D)-s*(T*N-y*U+_*w)+l*(T*V-L*U+_*O)-f*(T*D-L*w+y*O)}determinantAffine(){const e=this.elements,i=e[0],s=e[4],l=e[8],f=e[1],d=e[5],h=e[9],p=e[2],m=e[6],v=e[10];return i*(d*v-h*m)-s*(f*v-h*p)+l*(f*m-d*p)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],f=e[3],d=e[4],h=e[5],p=e[6],m=e[7],v=e[8],M=e[9],x=e[10],b=e[11],T=e[12],L=e[13],y=e[14],_=e[15],N=i*h-s*d,V=i*p-l*d,D=i*m-f*d,U=s*p-l*h,w=s*m-f*h,O=l*m-f*p,A=v*L-M*T,P=v*y-x*T,z=v*_-b*T,k=M*y-x*L,Q=M*_-b*L,ct=x*_-b*y,q=N*ct-V*Q+D*k+U*z-w*P+O*A;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const it=1/q;return e[0]=(h*ct-p*Q+m*k)*it,e[1]=(l*Q-s*ct-f*k)*it,e[2]=(L*O-y*w+_*U)*it,e[3]=(x*w-M*O-b*U)*it,e[4]=(p*z-d*ct-m*P)*it,e[5]=(i*ct-l*z+f*P)*it,e[6]=(y*D-T*O-_*V)*it,e[7]=(v*O-x*D+b*V)*it,e[8]=(d*Q-h*z+m*A)*it,e[9]=(s*z-i*Q-f*A)*it,e[10]=(T*w-L*D+_*N)*it,e[11]=(M*D-v*w-b*N)*it,e[12]=(h*P-d*k-p*A)*it,e[13]=(i*k-s*P+l*A)*it,e[14]=(L*V-T*U-y*N)*it,e[15]=(v*U-M*V+x*N)*it,this}scale(e){const i=this.elements,s=e.x,l=e.y,f=e.z;return i[0]*=s,i[4]*=l,i[8]*=f,i[1]*=s,i[5]*=l,i[9]*=f,i[2]*=s,i[6]*=l,i[10]*=f,i[3]*=s,i[7]*=l,i[11]*=f,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),f=1-s,d=e.x,h=e.y,p=e.z,m=f*d,v=f*h;return this.set(m*d+s,m*h-l*p,m*p+l*h,0,m*h+l*p,v*h+s,v*p-l*d,0,m*p-l*h,v*p+l*d,f*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,f,d){return this.set(1,s,f,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,f=i._x,d=i._y,h=i._z,p=i._w,m=f+f,v=d+d,M=h+h,x=f*m,b=f*v,T=f*M,L=d*v,y=d*M,_=h*M,N=p*m,V=p*v,D=p*M,U=s.x,w=s.y,O=s.z;return l[0]=(1-(L+_))*U,l[1]=(b+D)*U,l[2]=(T-V)*U,l[3]=0,l[4]=(b-D)*w,l[5]=(1-(x+_))*w,l[6]=(y+N)*w,l[7]=0,l[8]=(T+V)*O,l[9]=(y-N)*O,l[10]=(1-(x+L))*O,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;e.x=l[12],e.y=l[13],e.z=l[14];const f=this.determinantAffine();if(f===0)return s.set(1,1,1),i.identity(),this;let d=kr.set(l[0],l[1],l[2]).length();const h=kr.set(l[4],l[5],l[6]).length(),p=kr.set(l[8],l[9],l[10]).length();f<0&&(d=-d),Ii.copy(this);const m=1/d,v=1/h,M=1/p;return Ii.elements[0]*=m,Ii.elements[1]*=m,Ii.elements[2]*=m,Ii.elements[4]*=v,Ii.elements[5]*=v,Ii.elements[6]*=v,Ii.elements[8]*=M,Ii.elements[9]*=M,Ii.elements[10]*=M,i.setFromRotationMatrix(Ii),s.x=d,s.y=h,s.z=p,this}makePerspective(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,v=2*f/(i-e),M=2*f/(s-l),x=(i+e)/(i-e),b=(s+l)/(s-l);let T,L;if(p)T=f/(d-f),L=d*f/(d-f);else if(h===oa)T=-(d+f)/(d-f),L=-2*d*f/(d-f);else if(h===Ml)T=-d/(d-f),L=-d*f/(d-f);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return m[0]=v,m[4]=0,m[8]=x,m[12]=0,m[1]=0,m[5]=M,m[9]=b,m[13]=0,m[2]=0,m[6]=0,m[10]=T,m[14]=L,m[3]=0,m[7]=0,m[11]=-1,m[15]=0,this}makeOrthographic(e,i,s,l,f,d,h=oa,p=!1){const m=this.elements,v=2/(i-e),M=2/(s-l),x=-(i+e)/(i-e),b=-(s+l)/(s-l);let T,L;if(p)T=1/(d-f),L=d/(d-f);else if(h===oa)T=-2/(d-f),L=-(d+f)/(d-f);else if(h===Ml)T=-1/(d-f),L=-f/(d-f);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return m[0]=v,m[4]=0,m[8]=0,m[12]=x,m[1]=0,m[5]=M,m[9]=0,m[13]=b,m[2]=0,m[6]=0,m[10]=T,m[14]=L,m[3]=0,m[7]=0,m[11]=0,m[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const kr=new nt,Ii=new an,CE=new nt(0,0,0),wE=new nt(1,1,1),ds=new nt,Jc=new nt,fi=new nt,Iv=new an,zv=new vs;class _s{constructor(e=0,i=0,s=0,l=_s.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,f=l[0],d=l[4],h=l[8],p=l[1],m=l[5],v=l[9],M=l[2],x=l[6],b=l[10];switch(i){case"XYZ":this._y=Math.asin(Ne(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-v,b),this._z=Math.atan2(-d,f)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Ne(v,-1,1)),Math.abs(v)<.9999999?(this._y=Math.atan2(h,b),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-M,f),this._z=0);break;case"ZXY":this._x=Math.asin(Ne(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-M,b),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(p,f));break;case"ZYX":this._y=Math.asin(-Ne(M,-1,1)),Math.abs(M)<.9999999?(this._x=Math.atan2(x,b),this._z=Math.atan2(p,f)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(Ne(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-v,m),this._y=Math.atan2(-M,f)):(this._x=0,this._y=Math.atan2(h,b));break;case"XZY":this._z=Math.asin(-Ne(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,f)):(this._x=Math.atan2(-v,b),this._y=0);break;default:de("Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return Iv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Iv,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return zv.setFromEuler(this),this.setFromQuaternion(zv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}_s.DEFAULT_ORDER="XYZ";class cm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let DE=0;const Bv=new nt,Xr=new vs,Ca=new an,$c=new nt,ll=new nt,NE=new nt,UE=new vs,Fv=new nt(1,0,0),Hv=new nt(0,1,0),Gv=new nt(0,0,1),Vv={type:"added"},LE={type:"removed"},Wr={type:"childadded",child:null},Uh={type:"childremoved",child:null};class Cn extends ys{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:DE++}),this.uuid=El(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Cn.DEFAULT_UP.clone();const e=new nt,i=new _s,s=new vs,l=new nt(1,1,1);function f(){s.setFromEuler(i,!1)}function d(){i.setFromQuaternion(s,void 0,!1)}i._onChange(f),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new an},normalMatrix:{value:new ye}}),this.matrix=new an,this.matrixWorld=new an,this.matrixAutoUpdate=Cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return Xr.setFromAxisAngle(e,i),this.quaternion.multiply(Xr),this}rotateOnWorldAxis(e,i){return Xr.setFromAxisAngle(e,i),this.quaternion.premultiply(Xr),this}rotateX(e){return this.rotateOnAxis(Fv,e)}rotateY(e){return this.rotateOnAxis(Hv,e)}rotateZ(e){return this.rotateOnAxis(Gv,e)}translateOnAxis(e,i){return Bv.copy(e).applyQuaternion(this.quaternion),this.position.add(Bv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(Fv,e)}translateY(e){return this.translateOnAxis(Hv,e)}translateZ(e){return this.translateOnAxis(Gv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ca.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?$c.copy(e):$c.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ca.lookAt(ll,$c,this.up):Ca.lookAt($c,ll,this.up),this.quaternion.setFromRotationMatrix(Ca),l&&(Ca.extractRotation(l.matrixWorld),Xr.setFromRotationMatrix(Ca),this.quaternion.premultiply(Xr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(He("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):He("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(LE),Uh.child=e,this.dispatchEvent(Uh),Uh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ca.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ca.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ca),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const d=this.children[s].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let f=0,d=l.length;f<d;f++)l[f].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,e,NE),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,UE,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const i=e.x,s=e.y,l=e.z,f=this.matrix.elements;f[12]+=i-f[0]*i-f[4]*s-f[8]*l,f[13]+=s-f[1]*i-f[5]*s-f[9]*l,f[14]+=l-f[2]*i-f[6]*s-f[10]*l}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i,s=!1){const l=this.parent;if(e===!0&&l!==null&&l.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||s)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,s=!0),i===!0){const f=this.children;for(let d=0,h=f.length;d<h;d++)f[d].updateWorldMatrix(!1,!0,s)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,l.name=this.name,l.castShadow=this.castShadow,l.receiveShadow=this.receiveShadow,l.visible=this.visible,l.frustumCulled=this.frustumCulled,l.renderOrder=this.renderOrder,l.static=this.static,l.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.pivot!==null&&(l.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(l.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(l.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.geometryInfo=this._geometryInfo.map(h=>({...h,boundingBox:h.boundingBox?h.boundingBox.toJSON():void 0,boundingSphere:h.boundingSphere?h.boundingSphere.toJSON():void 0})),l.instanceInfo=this._instanceInfo.map(h=>({...h})),l.availableInstanceIds=this._availableInstanceIds.slice(),l.availableGeometryIds=this._availableGeometryIds.slice(),l.nextIndexStart=this._nextIndexStart,l.nextVertexStart=this._nextVertexStart,l.geometryCount=this._geometryCount,l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.matricesTexture=this._matricesTexture.toJSON(e),l.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(l.boundingBox=this.boundingBox.toJSON()));function f(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=f(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,v=p.length;m<v;m++){const M=p[m];f(e.shapes,M)}else f(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(f(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(f(e.materials,this.material[p]));l.material=h}else l.material=f(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(f(e.animations,p))}}if(i){const h=d(e.geometries),p=d(e.materials),m=d(e.textures),v=d(e.images),M=d(e.shapes),x=d(e.skeletons),b=d(e.animations),T=d(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),v.length>0&&(s.images=v),M.length>0&&(s.shapes=M),x.length>0&&(s.skeletons=x),b.length>0&&(s.animations=b),T.length>0&&(s.nodes=T)}return s.object=l,s;function d(h){const p=[];for(const m in h){const v=h[m];delete v.metadata,p.push(v)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Cn.DEFAULT_UP=new nt(0,1,0);Cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class tu extends Cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const OE={type:"move"};class Lh{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new tu,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new tu,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new nt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new nt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new tu,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new nt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new nt,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,f=null,d=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const L of e.hand.values()){const y=i.getJointPose(L,s),_=this._getHandJoint(m,L);y!==null&&(_.matrix.fromArray(y.transform.matrix),_.matrix.decompose(_.position,_.rotation,_.scale),_.matrixWorldNeedsUpdate=!0,_.jointRadius=y.radius),_.visible=y!==null}const v=m.joints["index-finger-tip"],M=m.joints["thumb-tip"],x=v.position.distanceTo(M.position),b=.02,T=.005;m.inputState.pinching&&x>b+T?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=b-T&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(f=i.getPose(e.gripSpace,s),f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,f.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(f.linearVelocity)):p.hasLinearVelocity=!1,f.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(f.angularVelocity)):p.hasAngularVelocity=!1,p.eventsEnabled&&p.dispatchEvent({type:"gripUpdated",data:e,target:this})));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&f!==null&&(l=f),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent(OE)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=f!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new tu;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const iy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},hs={h:0,s:0,l:0},eu={h:0,s:0,l:0};function Oh(o,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?o+(e-o)*6*i:i<1/2?e:i<2/3?o+(e-o)*6*(2/3-i):o}class Re{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Ci){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Be.colorSpaceToWorking(this,i),this}setRGB(e,i,s,l=Be.workingColorSpace){return this.r=e,this.g=i,this.b=s,Be.colorSpaceToWorking(this,l),this}setHSL(e,i,s,l=Be.workingColorSpace){if(e=yE(e,1),i=Ne(i,0,1),s=Ne(s,0,1),i===0)this.r=this.g=this.b=s;else{const f=s<=.5?s*(1+i):s+i-s*i,d=2*s-f;this.r=Oh(d,f,e+1/3),this.g=Oh(d,f,e),this.b=Oh(d,f,e-1/3)}return Be.colorSpaceToWorking(this,l),this}setStyle(e,i=Ci){function s(f){f!==void 0&&parseFloat(f)<1&&de("Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let f;const d=l[1],h=l[2];switch(d){case"rgb":case"rgba":if(f=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(255,parseInt(f[1],10))/255,Math.min(255,parseInt(f[2],10))/255,Math.min(255,parseInt(f[3],10))/255,i);if(f=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setRGB(Math.min(100,parseInt(f[1],10))/100,Math.min(100,parseInt(f[2],10))/100,Math.min(100,parseInt(f[3],10))/100,i);break;case"hsl":case"hsla":if(f=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(f[4]),this.setHSL(parseFloat(f[1])/360,parseFloat(f[2])/100,parseFloat(f[3])/100,i);break;default:de("Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const f=l[1],d=f.length;if(d===3)return this.setRGB(parseInt(f.charAt(0),16)/15,parseInt(f.charAt(1),16)/15,parseInt(f.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(f,16),i);de("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Ci){const s=iy[e.toLowerCase()];return s!==void 0?this.setHex(s,i):de("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}copyLinearToSRGB(e){return this.r=ro(e.r),this.g=ro(e.g),this.b=ro(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ci){return Be.workingToColorSpace(Bn.copy(this),e),Math.round(Ne(Bn.r*255,0,255))*65536+Math.round(Ne(Bn.g*255,0,255))*256+Math.round(Ne(Bn.b*255,0,255))}getHexString(e=Ci){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=Be.workingColorSpace){Be.workingToColorSpace(Bn.copy(this),i);const s=Bn.r,l=Bn.g,f=Bn.b,d=Math.max(s,l,f),h=Math.min(s,l,f);let p,m;const v=(h+d)/2;if(h===d)p=0,m=0;else{const M=d-h;switch(m=v<=.5?M/(d+h):M/(2-d-h),d){case s:p=(l-f)/M+(l<f?6:0);break;case l:p=(f-s)/M+2;break;case f:p=(s-l)/M+4;break}p/=6}return e.h=p,e.s=m,e.l=v,e}getRGB(e,i=Be.workingColorSpace){return Be.workingToColorSpace(Bn.copy(this),i),e.r=Bn.r,e.g=Bn.g,e.b=Bn.b,e}getStyle(e=Ci){Be.workingToColorSpace(Bn.copy(this),e);const i=Bn.r,s=Bn.g,l=Bn.b;return e!==Ci?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(hs),this.setHSL(hs.h+e,hs.s+i,hs.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(hs),e.getHSL(eu);const s=Rh(hs.h,eu.h,i),l=Rh(hs.s,eu.s,i),f=Rh(hs.l,eu.l,i);return this.setHSL(s,l,f),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,f=e.elements;return this.r=f[0]*i+f[3]*s+f[6]*l,this.g=f[1]*i+f[4]*s+f[7]*l,this.b=f[2]*i+f[5]*s+f[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bn=new Re;Re.NAMES=iy;class um{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new Re(e),this.density=i}clone(){return new um(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class PE extends Cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new _s,this.environmentIntensity=1,this.environmentRotation=new _s,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),i.object.backgroundBlurriness=this.backgroundBlurriness,i.object.backgroundIntensity=this.backgroundIntensity,i.object.backgroundRotation=this.backgroundRotation.toArray(),i.object.environmentIntensity=this.environmentIntensity,i.object.environmentRotation=this.environmentRotation.toArray(),i}}const zi=new nt,wa=new nt,Ph=new nt,Da=new nt,jr=new nt,qr=new nt,kv=new nt,Ih=new nt,zh=new nt,Bh=new nt,Fh=new on,Hh=new on,Gh=new on;class Hi{constructor(e=new nt,i=new nt,s=new nt){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),zi.subVectors(e,i),l.cross(zi);const f=l.lengthSq();return f>0?l.multiplyScalar(1/Math.sqrt(f)):l.set(0,0,0)}static getBarycoord(e,i,s,l,f){zi.subVectors(l,i),wa.subVectors(s,i),Ph.subVectors(e,i);const d=zi.dot(zi),h=zi.dot(wa),p=zi.dot(Ph),m=wa.dot(wa),v=wa.dot(Ph),M=d*m-h*h;if(M===0)return f.set(0,0,0),null;const x=1/M,b=(m*p-h*v)*x,T=(d*v-h*p)*x;return f.set(1-b-T,T,b)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Da)===null?!1:Da.x>=0&&Da.y>=0&&Da.x+Da.y<=1}static getInterpolation(e,i,s,l,f,d,h,p){return this.getBarycoord(e,i,s,l,Da)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(f,Da.x),p.addScaledVector(d,Da.y),p.addScaledVector(h,Da.z),p)}static getInterpolatedAttribute(e,i,s,l,f,d){return Fh.setScalar(0),Hh.setScalar(0),Gh.setScalar(0),Fh.fromBufferAttribute(e,i),Hh.fromBufferAttribute(e,s),Gh.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Fh,f.x),d.addScaledVector(Hh,f.y),d.addScaledVector(Gh,f.z),d}static isFrontFacing(e,i,s,l){return zi.subVectors(s,i),wa.subVectors(e,i),zi.cross(wa).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return zi.subVectors(this.c,this.b),wa.subVectors(this.a,this.b),zi.cross(wa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Hi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Hi.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,f){return Hi.getInterpolation(e,this.a,this.b,this.c,i,s,l,f)}containsPoint(e){return Hi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Hi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,f=this.c;let d,h;jr.subVectors(l,s),qr.subVectors(f,s),Ih.subVectors(e,s);const p=jr.dot(Ih),m=qr.dot(Ih);if(p<=0&&m<=0)return i.copy(s);zh.subVectors(e,l);const v=jr.dot(zh),M=qr.dot(zh);if(v>=0&&M<=v)return i.copy(l);const x=p*M-v*m;if(x<=0&&p>=0&&v<=0)return d=p/(p-v),i.copy(s).addScaledVector(jr,d);Bh.subVectors(e,f);const b=jr.dot(Bh),T=qr.dot(Bh);if(T>=0&&b<=T)return i.copy(f);const L=b*m-p*T;if(L<=0&&m>=0&&T<=0)return h=m/(m-T),i.copy(s).addScaledVector(qr,h);const y=v*T-b*M;if(y<=0&&M-v>=0&&b-T>=0)return kv.subVectors(f,l),h=(M-v)/(M-v+(b-T)),i.copy(l).addScaledVector(kv,h);const _=1/(y+L+x);return d=L*_,h=x*_,i.copy(s).addScaledVector(jr,d).addScaledVector(qr,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Tl{constructor(e=new nt(1/0,1/0,1/0),i=new nt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(Bi.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(Bi.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=Bi.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const f=s.getAttribute("position");if(i===!0&&f!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=f.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,Bi):Bi.fromBufferAttribute(f,d),Bi.applyMatrix4(e.matrixWorld),this.expandByPoint(Bi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),nu.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),nu.copy(s.boundingBox)),nu.applyMatrix4(e.matrixWorld),this.union(nu)}const l=e.children;for(let f=0,d=l.length;f<d;f++)this.expandByObject(l[f],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Bi),Bi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(cl),iu.subVectors(this.max,cl),Yr.subVectors(e.a,cl),Zr.subVectors(e.b,cl),Kr.subVectors(e.c,cl),ps.subVectors(Zr,Yr),ms.subVectors(Kr,Zr),Xs.subVectors(Yr,Kr);let i=[0,-ps.z,ps.y,0,-ms.z,ms.y,0,-Xs.z,Xs.y,ps.z,0,-ps.x,ms.z,0,-ms.x,Xs.z,0,-Xs.x,-ps.y,ps.x,0,-ms.y,ms.x,0,-Xs.y,Xs.x,0];return!Vh(i,Yr,Zr,Kr,iu)||(i=[1,0,0,0,1,0,0,0,1],!Vh(i,Yr,Zr,Kr,iu))?!1:(au.crossVectors(ps,ms),i=[au.x,au.y,au.z],Vh(i,Yr,Zr,Kr,iu))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Bi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Bi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Na[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Na[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Na[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Na[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Na[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Na[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Na[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Na[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Na),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Na=[new nt,new nt,new nt,new nt,new nt,new nt,new nt,new nt],Bi=new nt,nu=new Tl,Yr=new nt,Zr=new nt,Kr=new nt,ps=new nt,ms=new nt,Xs=new nt,cl=new nt,iu=new nt,au=new nt,Ws=new nt;function Vh(o,e,i,s,l){for(let f=0,d=o.length-3;f<=d;f+=3){Ws.fromArray(o,f);const h=l.x*Math.abs(Ws.x)+l.y*Math.abs(Ws.y)+l.z*Math.abs(Ws.z),p=e.dot(Ws),m=i.dot(Ws),v=s.dot(Ws);if(Math.max(-Math.max(p,m,v),Math.min(p,m,v))>h)return!1}return!0}const xn=new nt,su=new he;let IE=0;class ca extends ys{constructor(e,i,s=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:IE++}),this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=mE,this.updateRanges=[],this.gpuType=ra,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,f=this.itemSize;l<f;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)su.fromBufferAttribute(this,i),su.applyMatrix3(e),this.setXY(i,su.x,su.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyMatrix3(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyMatrix4(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.applyNormalMatrix(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)xn.fromBufferAttribute(this,i),xn.transformDirection(e),this.setXYZ(i,xn.x,xn.y,xn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=ol(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=$n(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=ol(i,this.array)),i}setX(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=ol(i,this.array)),i}setY(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=ol(i,this.array)),i}setZ(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=ol(i,this.array)),i}setW(e,i){return this.normalized&&(i=$n(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,f){return e*=this.itemSize,this.normalized&&(i=$n(i,this.array),s=$n(s,this.array),l=$n(l,this.array),f=$n(f,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=f,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class ay extends ca{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class sy extends ca{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class Sn extends ca{constructor(e,i,s){super(new Float32Array(e),i,s)}}const zE=new Tl,ul=new nt,kh=new nt;class Al{constructor(e=new nt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):zE.setFromPoints(e).getCenter(s);let l=0;for(let f=0,d=e.length;f<d;f++)l=Math.max(l,s.distanceToSquared(e[f]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ul.subVectors(e,this.center);const i=ul.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ul,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(kh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ul.copy(e.center).add(kh)),this.expandByPoint(ul.copy(e.center).sub(kh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let BE=0;const Ri=new an,Xh=new Cn,Qr=new nt,di=new Tl,fl=new Tl,Rn=new nt;class Pn extends ys{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:BE++}),this.uuid=El(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gE(e)?sy:ay)(e,1):this.index=e,this}setIndirect(e,i=0){return this.indirect=e,this.indirectOffset=i,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const f=new ye().getNormalMatrix(e);s.applyNormalMatrix(f),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ri.makeRotationFromQuaternion(e),this.applyMatrix4(Ri),this}rotateX(e){return Ri.makeRotationX(e),this.applyMatrix4(Ri),this}rotateY(e){return Ri.makeRotationY(e),this.applyMatrix4(Ri),this}rotateZ(e){return Ri.makeRotationZ(e),this.applyMatrix4(Ri),this}translate(e,i,s){return Ri.makeTranslation(e,i,s),this.applyMatrix4(Ri),this}scale(e,i,s){return Ri.makeScale(e,i,s),this.applyMatrix4(Ri),this}lookAt(e){return Xh.lookAt(e),Xh.updateMatrix(),this.applyMatrix4(Xh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,f=e.length;l<f;l++){const d=e[l];s.push(d.x,d.y,d.z||0)}this.setAttribute("position",new Sn(s,3))}else{const s=Math.min(e.length,i.count);for(let l=0;l<s;l++){const f=e[l];i.setXYZ(l,f.x,f.y,f.z||0)}e.length>i.count&&de("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Tl);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new nt(-1/0,-1/0,-1/0),new nt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const f=i[s];di.setFromBufferAttribute(f),this.morphTargetsRelative?(Rn.addVectors(this.boundingBox.min,di.min),this.boundingBox.expandByPoint(Rn),Rn.addVectors(this.boundingBox.max,di.max),this.boundingBox.expandByPoint(Rn)):(this.boundingBox.expandByPoint(di.min),this.boundingBox.expandByPoint(di.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&He('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Al);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){He("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new nt,1/0);return}if(e){const s=this.boundingSphere.center;if(di.setFromBufferAttribute(e),i)for(let f=0,d=i.length;f<d;f++){const h=i[f];fl.setFromBufferAttribute(h),this.morphTargetsRelative?(Rn.addVectors(di.min,fl.min),di.expandByPoint(Rn),Rn.addVectors(di.max,fl.max),di.expandByPoint(Rn)):(di.expandByPoint(fl.min),di.expandByPoint(fl.max))}di.getCenter(s);let l=0;for(let f=0,d=e.count;f<d;f++)Rn.fromBufferAttribute(e,f),l=Math.max(l,s.distanceToSquared(Rn));if(i)for(let f=0,d=i.length;f<d;f++){const h=i[f],p=this.morphTargetsRelative;for(let m=0,v=h.count;m<v;m++)Rn.fromBufferAttribute(h,m),p&&(Qr.fromBufferAttribute(e,m),Rn.add(Qr)),l=Math.max(l,s.distanceToSquared(Rn))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&He('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){He("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,f=i.uv;let d=this.getAttribute("tangent");(d===void 0||d.count!==s.count)&&(d=new ca(new Float32Array(4*s.count),4),this.setAttribute("tangent",d));const h=[],p=[];for(let A=0;A<s.count;A++)h[A]=new nt,p[A]=new nt;const m=new nt,v=new nt,M=new nt,x=new he,b=new he,T=new he,L=new nt,y=new nt;function _(A,P,z){m.fromBufferAttribute(s,A),v.fromBufferAttribute(s,P),M.fromBufferAttribute(s,z),x.fromBufferAttribute(f,A),b.fromBufferAttribute(f,P),T.fromBufferAttribute(f,z),v.sub(m),M.sub(m),b.sub(x),T.sub(x);const k=1/(b.x*T.y-T.x*b.y);isFinite(k)&&(L.copy(v).multiplyScalar(T.y).addScaledVector(M,-b.y).multiplyScalar(k),y.copy(M).multiplyScalar(b.x).addScaledVector(v,-T.x).multiplyScalar(k),h[A].add(L),h[P].add(L),h[z].add(L),p[A].add(y),p[P].add(y),p[z].add(y))}let N=this.groups;N.length===0&&(N=[{start:0,count:e.count}]);for(let A=0,P=N.length;A<P;++A){const z=N[A],k=z.start,Q=z.count;for(let ct=k,q=k+Q;ct<q;ct+=3)_(e.getX(ct+0),e.getX(ct+1),e.getX(ct+2))}const V=new nt,D=new nt,U=new nt,w=new nt;function O(A){U.fromBufferAttribute(l,A),w.copy(U);const P=h[A];V.copy(P),V.sub(U.multiplyScalar(U.dot(P))).normalize(),D.crossVectors(w,P);const k=D.dot(p[A])<0?-1:1;d.setXYZW(A,V.x,V.y,V.z,k)}for(let A=0,P=N.length;A<P;++A){const z=N[A],k=z.start,Q=z.count;for(let ct=k,q=k+Q;ct<q;ct+=3)O(e.getX(ct+0)),O(e.getX(ct+1)),O(e.getX(ct+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0||s.count!==i.count)s=new ca(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,b=s.count;x<b;x++)s.setXYZ(x,0,0,0);const l=new nt,f=new nt,d=new nt,h=new nt,p=new nt,m=new nt,v=new nt,M=new nt;if(e)for(let x=0,b=e.count;x<b;x+=3){const T=e.getX(x+0),L=e.getX(x+1),y=e.getX(x+2);l.fromBufferAttribute(i,T),f.fromBufferAttribute(i,L),d.fromBufferAttribute(i,y),v.subVectors(d,f),M.subVectors(l,f),v.cross(M),h.fromBufferAttribute(s,T),p.fromBufferAttribute(s,L),m.fromBufferAttribute(s,y),h.add(v),p.add(v),m.add(v),s.setXYZ(T,h.x,h.y,h.z),s.setXYZ(L,p.x,p.y,p.z),s.setXYZ(y,m.x,m.y,m.z)}else for(let x=0,b=i.count;x<b;x+=3)l.fromBufferAttribute(i,x+0),f.fromBufferAttribute(i,x+1),d.fromBufferAttribute(i,x+2),v.subVectors(d,f),M.subVectors(l,f),v.cross(M),s.setXYZ(x+0,v.x,v.y,v.z),s.setXYZ(x+1,v.x,v.y,v.z),s.setXYZ(x+2,v.x,v.y,v.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)Rn.fromBufferAttribute(e,i),Rn.normalize(),e.setXYZ(i,Rn.x,Rn.y,Rn.z)}toNonIndexed(){function e(h,p){const m=h.array,v=h.itemSize,M=h.normalized,x=new m.constructor(p.length*v);let b=0,T=0;for(let L=0,y=p.length;L<y;L++){h.isInterleavedBufferAttribute?b=p[L]*h.data.stride+h.offset:b=p[L]*v;for(let _=0;_<v;_++)x[T++]=m[b++]}return new ca(x,v,M)}if(this.index===null)return de("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Pn,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const f=this.morphAttributes;for(const h in f){const p=[],m=f[h];for(let v=0,M=m.length;v<M;v++){const x=m[v],b=e(x,s);p.push(b)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,p=d.length;h<p;h++){const m=d[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let f=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],v=[];for(let M=0,x=m.length;M<x;M++){const b=m[M];v.push(b.toJSON(e.data))}v.length>0&&(l[p]=v,f=!0)}f&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere=h.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone());const l=e.attributes;for(const m in l){const v=l[m];this.setAttribute(m,v.clone(i))}const f=e.morphAttributes;for(const m in f){const v=[],M=f[m];for(let x=0,b=M.length;x<b;x++)v.push(M[x].clone(i));this.morphAttributes[m]=v}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,v=d.length;m<v;m++){const M=d[m];this.addGroup(M.start,M.count,M.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Wh=new nt,FE=new nt,HE=new ye;class La{constructor(e=new nt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Wh.subVectors(s,i).cross(FE.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i,s=!0){const l=e.delta(Wh),f=this.normal.dot(l);if(f===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const d=-(e.start.dot(this.normal)+this.constant)/f;return s===!0&&(d<0||d>1)?null:i.copy(e.start).addScaledVector(l,d)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||HE.getNormalMatrix(e),l=this.coplanarPoint(Wh).applyMatrix4(e),f=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(f),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let GE=0;class tr extends ys{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:GE++}),this.uuid=El(),this.name="",this.type="Material",this.blending=xl,this.side=Qs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=B_,this.blendDst=F_,this.blendEquation=eo,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Re(0,0,0),this.blendAlpha=0,this.depthFunc=_l,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=lE,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ah,this.stencilZFail=Ah,this.stencilZPass=Ah,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){de(`Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){de(`Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector2&&s&&s.isVector2||l&&l.isEuler&&s&&s.isEuler||l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,s.blending=this.blending,s.side=this.side,s.shadowSide=this.shadowSide,s.vertexColors=this.vertexColors,s.opacity=this.opacity,s.transparent=this.transparent,s.blendSrc=this.blendSrc,s.blendDst=this.blendDst,s.blendEquation=this.blendEquation,s.blendSrcAlpha=this.blendSrcAlpha,s.blendDstAlpha=this.blendDstAlpha,s.blendEquationAlpha=this.blendEquationAlpha,s.blendColor=this.blendColor.getHex(),s.blendAlpha=this.blendAlpha,s.depthFunc=this.depthFunc,s.depthTest=this.depthTest,s.depthWrite=this.depthWrite,s.colorWrite=this.colorWrite,s.clipIntersection=this.clipIntersection,s.clipShadows=this.clipShadows,s.stencilWriteMask=this.stencilWriteMask,s.stencilFunc=this.stencilFunc,s.stencilRef=this.stencilRef,s.stencilFuncMask=this.stencilFuncMask,s.stencilFail=this.stencilFail,s.stencilZFail=this.stencilZFail,s.stencilZPass=this.stencilZPass,s.stencilWrite=this.stencilWrite,s.polygonOffset=this.polygonOffset,s.polygonOffsetFactor=this.polygonOffsetFactor,s.polygonOffsetUnits=this.polygonOffsetUnits,s.dithering=this.dithering,s.alphaTest=this.alphaTest,s.alphaHash=this.alphaHash,s.alphaToCoverage=this.alphaToCoverage,s.premultipliedAlpha=this.premultipliedAlpha,s.forceSinglePass=this.forceSinglePass,s.allowOverride=this.allowOverride,s.visible=this.visible,s.toneMapped=this.toneMapped,s.name=this.name,this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(s.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(s.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(s.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(s.clippingPlanes=this.clippingPlanes.map(f=>f.toJSON())),this.rotation!==void 0&&(s.rotation=this.rotation),this.depthPacking!==void 0&&(s.depthPacking=this.depthPacking),this.linewidth!==void 0&&(s.linewidth=this.linewidth),this.linecap!==void 0&&(s.linecap=this.linecap),this.linejoin!==void 0&&(s.linejoin=this.linejoin),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.wireframe!==void 0&&(s.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(s.flatShading=this.flatShading),this.fog!==void 0&&(s.fog=this.fog),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(f){const d=[];for(const h in f){const p=f[h];delete p.metadata,d.push(p)}return d}if(i){const f=l(e.textures),d=l(e.images);f.length>0&&(s.textures=f),d.length>0&&(s.images=d)}return s}fromJSON(e,i){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Re().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(s=>new La().fromJSON(s))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=i[e.map]||null),e.matcap!==void 0&&(this.matcap=i[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=i[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=i[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=i[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let s=e.normalScale;Array.isArray(s)===!1&&(s=[s,s]),this.normalScale=new he().fromArray(s)}return e.displacementMap!==void 0&&(this.displacementMap=i[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=i[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=i[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=i[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=i[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=i[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=i[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=i[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=i[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=i[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=i[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=i[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=i[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=i[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new he().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=i[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=i[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=i[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=i[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=i[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=i[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=i[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let f=0;f!==l;++f)s[f]=i[f].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ua=new nt,jh=new nt,ru=new nt,ou=new nt;class Rl{constructor(e=new nt,i=new nt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ua)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=Ua.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(Ua.copy(this.origin).addScaledVector(this.direction,i),Ua.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){jh.copy(e).add(i).multiplyScalar(.5),ru.copy(i).sub(e).normalize(),ou.copy(this.origin).sub(jh);const f=e.distanceTo(i)*.5,d=-this.direction.dot(ru),h=ou.dot(this.direction),p=-ou.dot(ru),m=ou.lengthSq(),v=Math.abs(1-d*d);let M,x,b,T;if(v>0)if(M=d*p-h,x=d*h-p,T=f*v,M>=0)if(x>=-T)if(x<=T){const L=1/v;M*=L,x*=L,b=M*(M+d*x+2*h)+x*(d*M+x+2*p)+m}else x=f,M=Math.max(0,-(d*x+h)),b=-M*M+x*(x+2*p)+m;else x=-f,M=Math.max(0,-(d*x+h)),b=-M*M+x*(x+2*p)+m;else x<=-T?(M=Math.max(0,-(-d*f+h)),x=M>0?-f:Math.min(Math.max(-f,-p),f),b=-M*M+x*(x+2*p)+m):x<=T?(M=0,x=Math.min(Math.max(-f,-p),f),b=x*(x+2*p)+m):(M=Math.max(0,-(d*f+h)),x=M>0?f:Math.min(Math.max(-f,-p),f),b=-M*M+x*(x+2*p)+m);else x=d>0?-f:f,M=Math.max(0,-(d*x+h)),b=-M*M+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,M),l&&l.copy(jh).addScaledVector(ru,x),b}intersectSphere(e,i){if(e.radius<0)return null;Ua.subVectors(e.center,this.origin);const s=Ua.dot(this.direction),l=Ua.dot(Ua)-s*s,f=e.radius*e.radius;if(l>f)return null;const d=Math.sqrt(f-l),h=s-d,p=s+d;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,f,d,h,p;const m=1/this.direction.x,v=1/this.direction.y,M=1/this.direction.z,x=this.origin;return m>=0?(s=(e.min.x-x.x)*m,l=(e.max.x-x.x)*m):(s=(e.max.x-x.x)*m,l=(e.min.x-x.x)*m),v>=0?(f=(e.min.y-x.y)*v,d=(e.max.y-x.y)*v):(f=(e.max.y-x.y)*v,d=(e.min.y-x.y)*v),s>d||f>l||((f>s||isNaN(s))&&(s=f),(d<l||isNaN(l))&&(l=d),M>=0?(h=(e.min.z-x.z)*M,p=(e.max.z-x.z)*M):(h=(e.max.z-x.z)*M,p=(e.min.z-x.z)*M),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,Ua)!==null}intersectTriangle(e,i,s,l,f){const d=this.origin,h=this.direction,p=h.x,m=h.y,v=h.z,M=e.x-d.x,x=e.y-d.y,b=e.z-d.z,T=i.x-d.x,L=i.y-d.y,y=i.z-d.z,_=s.x-d.x,N=s.y-d.y,V=s.z-d.z,D=Math.abs(p),U=Math.abs(m),w=Math.abs(v);let O,A,P,z,k,Q,ct,q,it,F,X,st;if(D>=U&&D>=w?(P=p,Q=M,it=T,st=_,p>=0?(O=m,A=v,z=x,k=b,ct=L,q=y,F=N,X=V):(O=v,A=m,z=b,k=x,ct=y,q=L,F=V,X=N)):U>=w?(P=m,Q=x,it=L,st=N,m>=0?(O=v,A=p,z=b,k=M,ct=y,q=T,F=V,X=_):(O=p,A=v,z=M,k=b,ct=T,q=y,F=_,X=V)):(P=v,Q=b,it=y,st=V,v>=0?(O=p,A=m,z=M,k=x,ct=T,q=L,F=_,X=N):(O=m,A=p,z=x,k=M,ct=L,q=T,F=N,X=_)),P===0)return null;const Y=O/P,H=A/P,J=1/P,Tt=z-Y*Q,bt=k-H*Q,Zt=ct-Y*it,Rt=q-H*it,Xt=F-Y*st,rt=X-H*st,mt=Xt*Rt-rt*Zt,At=Tt*rt-bt*Xt,Wt=Zt*bt-Rt*Tt;if(l){if(mt<0||At<0||Wt<0)return null}else if((mt<0||At<0||Wt<0)&&(mt>0||At>0||Wt>0))return null;const gt=mt+At+Wt;if(gt===0)return null;const Nt=J*(mt*Q+At*it+Wt*st);return(gt>0?Nt<0:Nt>0)?null:this.at(Nt/gt,f)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class vl extends tr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.combine=H_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Xv=new an,js=new Rl,lu=new Al,Wv=new nt,cu=new nt,uu=new nt,fu=new nt,qh=new nt,du=new nt,jv=new nt,hu=new nt;class pi extends Cn{constructor(e=new Pn,i=new vl){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,f=s.morphAttributes.position,d=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(f&&h){du.set(0,0,0);for(let p=0,m=f.length;p<m;p++){const v=h[p],M=f[p];v!==0&&(qh.fromBufferAttribute(M,e),d?du.addScaledVector(qh,v):du.addScaledVector(qh.sub(i),v))}i.add(du)}return i}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.material,f=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),lu.copy(s.boundingSphere),lu.applyMatrix4(f),js.copy(e.ray).recast(e.near),!(lu.containsPoint(js.origin)===!1&&(js.intersectSphere(lu,Wv)===null||js.origin.distanceToSquared(Wv)>(e.far-e.near)**2))&&(Xv.copy(f).invert(),js.copy(e.ray).applyMatrix4(Xv),!(s.boundingBox!==null&&js.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,js)))}_computeIntersections(e,i,s){let l;const f=this.geometry,d=this.material,h=f.index,p=f.attributes.position,m=f.attributes.uv,v=f.attributes.uv1,M=f.attributes.normal,x=f.groups,b=f.drawRange;if(h!==null)if(Array.isArray(d))for(let T=0,L=x.length;T<L;T++){const y=x[T],_=d[y.materialIndex],N=Math.max(y.start,b.start),V=Math.min(h.count,Math.min(y.start+y.count,b.start+b.count));for(let D=N,U=V;D<U;D+=3){const w=h.getX(D),O=h.getX(D+1),A=h.getX(D+2);l=pu(this,_,e,s,m,v,M,w,O,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),L=Math.min(h.count,b.start+b.count);for(let y=T,_=L;y<_;y+=3){const N=h.getX(y),V=h.getX(y+1),D=h.getX(y+2);l=pu(this,d,e,s,m,v,M,N,V,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(d))for(let T=0,L=x.length;T<L;T++){const y=x[T],_=d[y.materialIndex],N=Math.max(y.start,b.start),V=Math.min(p.count,Math.min(y.start+y.count,b.start+b.count));for(let D=N,U=V;D<U;D+=3){const w=D,O=D+1,A=D+2;l=pu(this,_,e,s,m,v,M,w,O,A),l&&(l.faceIndex=Math.floor(D/3),l.face.materialIndex=y.materialIndex,i.push(l))}}else{const T=Math.max(0,b.start),L=Math.min(p.count,b.start+b.count);for(let y=T,_=L;y<_;y+=3){const N=y,V=y+1,D=y+2;l=pu(this,d,e,s,m,v,M,N,V,D),l&&(l.faceIndex=Math.floor(y/3),i.push(l))}}}}function VE(o,e,i,s,l,f,d,h){let p;if(e.side===jn?p=s.intersectTriangle(d,f,l,!0,h):p=s.intersectTriangle(l,f,d,e.side===Qs,h),p===null)return null;hu.copy(h),hu.applyMatrix4(o.matrixWorld);const m=i.ray.origin.distanceTo(hu);return m<i.near||m>i.far?null:{distance:m,point:hu.clone(),object:o}}function pu(o,e,i,s,l,f,d,h,p,m){o.getVertexPosition(h,cu),o.getVertexPosition(p,uu),o.getVertexPosition(m,fu);const v=VE(o,e,i,s,cu,uu,fu,jv);if(v){const M=new nt;Hi.getBarycoord(jv,cu,uu,fu,M),l&&(v.uv=Hi.getInterpolatedAttribute(l,h,p,m,M,new he)),f&&(v.uv1=Hi.getInterpolatedAttribute(f,h,p,m,M,new he)),d&&(v.normal=Hi.getInterpolatedAttribute(d,h,p,m,M,new nt),v.normal.dot(s.direction)>0&&v.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new nt,materialIndex:0};Hi.getNormal(cu,uu,fu,x.normal),v.face=x,v.barycoord=M}return v}class kE extends qn{constructor(e=null,i=1,s=1,l,f,d,h,p,m=On,v=On,M,x){super(null,d,h,p,m,v,l,f,M,x),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const qs=new Al,XE=new he(.5,.5),mu=new nt;class fm{constructor(e=new La,i=new La,s=new La,l=new La,f=new La,d=new La){this.planes=[e,i,s,l,f,d]}set(e,i,s,l,f,d){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(f),h[5].copy(d),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=oa,s=!1){const l=this.planes,f=e.elements,d=f[0],h=f[1],p=f[2],m=f[3],v=f[4],M=f[5],x=f[6],b=f[7],T=f[8],L=f[9],y=f[10],_=f[11],N=f[12],V=f[13],D=f[14],U=f[15];if(l[0].setComponents(m-d,b-v,_-T,U-N).normalize(),l[1].setComponents(m+d,b+v,_+T,U+N).normalize(),l[2].setComponents(m+h,b+M,_+L,U+V).normalize(),l[3].setComponents(m-h,b-M,_-L,U-V).normalize(),s)l[4].setComponents(p,x,y,D).normalize(),l[5].setComponents(m-p,b-x,_-y,U-D).normalize();else if(l[4].setComponents(m-p,b-x,_-y,U-D).normalize(),i===oa)l[5].setComponents(m+p,b+x,_+y,U+D).normalize();else if(i===Ml)l[5].setComponents(p,x,y,D).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),qs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(qs)}intersectsSprite(e){qs.center.set(0,0,0);const i=XE.distanceTo(e.center);return qs.radius=.7071067811865476+i,qs.applyMatrix4(e.matrixWorld),this.intersectsSphere(qs)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let f=0;f<6;f++)if(i[f].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(mu.x=l.normal.x>0?e.max.x:e.min.x,mu.y=l.normal.y>0?e.max.y:e.min.y,mu.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(mu)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bu extends tr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Fu=new nt,Hu=new nt,qv=new an,dl=new Rl,gu=new Al,Yh=new nt,Yv=new nt;class WE extends Cn{constructor(e=new Pn,i=new Bu){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,f=i.count;l<f;l++)Fu.fromBufferAttribute(i,l-1),Hu.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=Fu.distanceTo(Hu);e.setAttribute("lineDistance",new Sn(s,1))}else de("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.matrixWorld,f=e.params.Line.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),gu.copy(s.boundingSphere),gu.applyMatrix4(l),gu.radius+=f,e.ray.intersectsSphere(gu)===!1)return;qv.copy(l).invert(),dl.copy(e.ray).applyMatrix4(qv);const h=f/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,v=s.index,x=s.attributes.position;if(v!==null){const b=Math.max(0,d.start),T=Math.min(v.count,d.start+d.count);for(let L=b,y=T-1;L<y;L+=m){const _=v.getX(L),N=v.getX(L+1),V=xu(this,e,dl,p,_,N,L);V&&i.push(V)}if(this.isLineLoop){const L=v.getX(T-1),y=v.getX(b),_=xu(this,e,dl,p,L,y,T-1);_&&i.push(_)}}else{const b=Math.max(0,d.start),T=Math.min(x.count,d.start+d.count);for(let L=b,y=T-1;L<y;L+=m){const _=xu(this,e,dl,p,L,L+1,L);_&&i.push(_)}if(this.isLineLoop){const L=xu(this,e,dl,p,T-1,b,T-1);L&&i.push(L)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}}function xu(o,e,i,s,l,f,d){const h=o.geometry.attributes.position;if(Fu.fromBufferAttribute(h,l),Hu.fromBufferAttribute(h,f),i.distanceSqToSegment(Fu,Hu,Yh,Yv)>s)return;Yh.applyMatrix4(o.matrixWorld);const m=e.ray.origin.distanceTo(Yh);if(!(m<e.near||m>e.far))return{distance:m,point:Yv.clone().applyMatrix4(o.matrixWorld),index:d,face:null,faceIndex:null,barycoord:null,object:o}}const Zv=new nt,Kv=new nt;class jp extends WE{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,f=i.count;l<f;l+=2)Zv.fromBufferAttribute(i,l),Kv.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+Zv.distanceTo(Kv);e.setAttribute("lineDistance",new Sn(s,1))}else de("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ry extends tr{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Qv=new an,qp=new Rl,vu=new Al,_u=new nt;class jE extends Cn{constructor(e=new Pn,i=new ry){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,i){const s=this.geometry,l=this.matrixWorld,f=e.params.Points.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),vu.copy(s.boundingSphere),vu.applyMatrix4(l),vu.radius+=f,e.ray.intersectsSphere(vu)===!1)return;Qv.copy(l).invert(),qp.copy(e.ray).applyMatrix4(Qv);const h=f/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=s.index,M=s.attributes.position;if(m!==null){const x=Math.max(0,d.start),b=Math.min(m.count,d.start+d.count);for(let T=x,L=b;T<L;T++){const y=m.getX(T);_u.fromBufferAttribute(M,y),Jv(_u,y,p,l,e,i,this)}}else{const x=Math.max(0,d.start),b=Math.min(M.count,d.start+d.count);for(let T=x,L=b;T<L;T++)_u.fromBufferAttribute(M,T),Jv(_u,T,p,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let f=0,d=l.length;f<d;f++){const h=l[f].name||String(f);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=f}}}}}function Jv(o,e,i,s,l,f,d){const h=qp.distanceSqToPoint(o);if(h<i){const p=new nt;qp.closestPointToPoint(o,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;f.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:d})}}class oy extends qn{constructor(e=[],i=Js,s,l,f,d,h,p,m,v){super(e,i,s,l,f,d,h,p,m,v),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class bl extends qn{constructor(e,i,s=ua,l,f,d,h=On,p=On,m,v=za,M=1){if(v!==za&&v!==Ks)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const x={width:e,height:i,depth:M};super(x,l,f,d,h,p,v,s,m),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new lm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return i.compareFunction=this.compareFunction,i}}class qE extends bl{constructor(e,i=ua,s=Js,l,f,d=On,h=On,p,m=za){const v={width:e,height:e,depth:1},M=[v,v,v,v,v,v];super(e,e,i,s,l,f,d,h,p,m),this.image=M,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ly extends qn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Cl extends Pn{constructor(e=1,i=1,s=1,l=1,f=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:f,depthSegments:d};const h=this;l=Math.floor(l),f=Math.floor(f),d=Math.floor(d);const p=[],m=[],v=[],M=[];let x=0,b=0;T("z","y","x",-1,-1,s,i,e,d,f,0),T("z","y","x",1,-1,s,i,-e,d,f,1),T("x","z","y",1,1,e,s,i,l,d,2),T("x","z","y",1,-1,e,s,-i,l,d,3),T("x","y","z",1,-1,e,i,s,l,f,4),T("x","y","z",-1,-1,e,i,-s,l,f,5),this.setIndex(p),this.setAttribute("position",new Sn(m,3)),this.setAttribute("normal",new Sn(v,3)),this.setAttribute("uv",new Sn(M,2));function T(L,y,_,N,V,D,U,w,O,A,P){const z=D/O,k=U/A,Q=D/2,ct=U/2,q=w/2,it=O+1,F=A+1;let X=0,st=0;const Y=new nt;for(let H=0;H<F;H++){const J=H*k-ct;for(let Tt=0;Tt<it;Tt++){const bt=Tt*z-Q;Y[L]=bt*N,Y[y]=J*V,Y[_]=q,m.push(Y.x,Y.y,Y.z),Y[L]=0,Y[y]=0,Y[_]=w>0?1:-1,v.push(Y.x,Y.y,Y.z),M.push(Tt/O),M.push(1-H/A),X+=1}}for(let H=0;H<A;H++)for(let J=0;J<O;J++){const Tt=x+J+it*H,bt=x+J+it*(H+1),Zt=x+(J+1)+it*(H+1),Rt=x+(J+1)+it*H;p.push(Tt,bt,Rt),p.push(bt,Zt,Rt),st+=6}h.addGroup(b,st,P),b+=st,x+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Cl(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Xu extends Pn{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const f=e/2,d=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,v=p+1,M=e/h,x=i/p,b=[],T=[],L=[],y=[];for(let _=0;_<v;_++){const N=_*x-d;for(let V=0;V<m;V++){const D=V*M-f;T.push(D,-N,0),L.push(0,0,1),y.push(V/h),y.push(1-_/p)}}for(let _=0;_<p;_++)for(let N=0;N<h;N++){const V=N+m*_,D=N+m*(_+1),U=N+1+m*(_+1),w=N+1+m*_;b.push(V,D,w),b.push(D,U,w)}this.setIndex(b),this.setAttribute("position",new Sn(T,3)),this.setAttribute("normal",new Sn(L,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xu(e.width,e.height,e.widthSegments,e.heightSegments)}}class Gu extends Pn{constructor(e=.5,i=1,s=32,l=1,f=0,d=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:i,thetaSegments:s,phiSegments:l,thetaStart:f,thetaLength:d},s=Math.max(3,s),l=Math.max(1,l);const h=[],p=[],m=[],v=[];let M=e;const x=(i-e)/l,b=new nt,T=new he;for(let L=0;L<=l;L++){for(let y=0;y<=s;y++){const _=f+y/s*d;b.x=M*Math.cos(_),b.y=M*Math.sin(_),p.push(b.x,b.y,b.z),m.push(0,0,1),T.x=(b.x/i+1)/2,T.y=(b.y/i+1)/2,v.push(T.x,T.y)}M+=x}for(let L=0;L<l;L++){const y=L*(s+1);for(let _=0;_<s;_++){const N=_+y,V=N,D=N+s+1,U=N+s+2,w=N+1;h.push(V,D,w),h.push(D,U,w)}}this.setIndex(h),this.setAttribute("position",new Sn(p,3)),this.setAttribute("normal",new Sn(m,3)),this.setAttribute("uv",new Sn(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gu(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Vu extends Pn{constructor(e=1,i=32,s=16,l=0,f=Math.PI*2,d=0,h=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:i,heightSegments:s,phiStart:l,phiLength:f,thetaStart:d,thetaLength:h},i=Math.max(3,Math.floor(i)),s=Math.max(2,Math.floor(s));const p=Math.min(d+h,Math.PI);let m=0;const v=[],M=new nt,x=new nt,b=[],T=[],L=[],y=[];for(let _=0;_<=s;_++){const N=[],V=_/s,D=d+V*h,U=e*Math.cos(D),w=Math.sqrt(e*e-U*U);let O=0;_===0&&d===0?O=.5/i:_===s&&p===Math.PI&&(O=-.5/i);for(let A=0;A<=i;A++){const P=A/i,z=l+P*f;M.x=-w*Math.cos(z),M.y=U,M.z=w*Math.sin(z),T.push(M.x,M.y,M.z),x.copy(M).normalize(),L.push(x.x,x.y,x.z),y.push(P+O,1-V),N.push(m++)}v.push(N)}for(let _=0;_<s;_++)for(let N=0;N<i;N++){const V=v[_][N+1],D=v[_][N],U=v[_+1][N],w=v[_+1][N+1];(_!==0||d>0)&&b.push(V,D,w),(_!==s-1||p<Math.PI)&&b.push(D,U,w)}this.setIndex(b),this.setAttribute("position",new Sn(T,3)),this.setAttribute("normal",new Sn(L,3)),this.setAttribute("uv",new Sn(y,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function lo(o){const e={};for(const i in o){e[i]={};for(const s in o[i]){const l=o[i][s];if($v(l))l.isRenderTargetTexture?(de("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone();else if(Array.isArray(l))if($v(l[0])){const f=[];for(let d=0,h=l.length;d<h;d++)f[d]=l[d].clone();e[i][s]=f}else e[i][s]=l.slice();else e[i][s]=l}}return e}function Wn(o){const e={};for(let i=0;i<o.length;i++){const s=lo(o[i]);for(const l in s)e[l]=s[l]}return e}function $v(o){return o&&(o.isColor||o.isMatrix3||o.isMatrix4||o.isVector2||o.isVector3||o.isVector4||o.isTexture||o.isQuaternion)}function YE(o){const e=[];for(let i=0;i<o.length;i++)e.push(o[i].clone());return e}function cy(o){const e=o.getRenderTarget();return e===null?o.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Be.workingColorSpace}const ZE={clone:lo,merge:Wn};var KE=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,QE=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class da extends tr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=KE,this.fragmentShader=QE,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lo(e.uniforms),this.uniformsGroups=YE(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}fromJSON(e,i){if(super.fromJSON(e,i),e.uniforms!==void 0)for(const s in e.uniforms){const l=e.uniforms[s];switch(this.uniforms[s]={},l.type){case"t":this.uniforms[s].value=i[l.value]||null;break;case"c":this.uniforms[s].value=new Re().setHex(l.value);break;case"v2":this.uniforms[s].value=new he().fromArray(l.value);break;case"v3":this.uniforms[s].value=new nt().fromArray(l.value);break;case"v4":this.uniforms[s].value=new on().fromArray(l.value);break;case"m3":this.uniforms[s].value=new ye().fromArray(l.value);break;case"m4":this.uniforms[s].value=new an().fromArray(l.value);break;default:this.uniforms[s].value=l.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const s in e.extensions)this.extensions[s]=e.extensions[s];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class JE extends da{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class $E extends tr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Re(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Re(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xp,this.normalScale=new he(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new _s,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class t1 extends tr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=rE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class e1 extends tr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class uy extends Cn{constructor(e,i=1){super(),this.isLight=!0,this.type="Light",this.color=new Re(e),this.intensity=i}copy(e,i){return super.copy(e,i),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const i=super.toJSON(e);return i.object.color=this.color.getHex(),i.object.intensity=this.intensity,i}}const Zh=new an,t_=new nt,e_=new nt;class n1{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new he(512,512),this.mapType=hi,this.map=null,this.mapPass=null,this.matrix=new an,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fm,this._frameExtents=new he(1,1),this._viewportCount=1,this._viewports=[new on(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const i=this.camera;t_.setFromMatrixPosition(e.matrixWorld),i.position.copy(t_),e_.setFromMatrixPosition(e.target.matrixWorld),i.lookAt(e_),i.updateMatrixWorld(),this._updateMatrix(i,this.matrix,this._frustum)}_updateMatrix(e,i,s,l){Zh.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),s.setFromProjectionMatrix(Zh,e.coordinateSystem,e.reversedDepth);const f=this._frameExtents,d=l?l.z/f.x:1,h=l?l.w/f.y:1,p=l?l.x/f.x:0,m=l?l.y/f.y:0;e.coordinateSystem===Ml||e.reversedDepth?i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,1,0,0,0,0,1):i.set(.5*d,0,0,.5*d+p,0,.5*h,0,.5*h+m,0,0,.5,.5,0,0,0,1),i.multiply(Zh)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const yu=new nt,Su=new vs,ia=new nt;class fy extends Cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new an,this.projectionMatrix=new an,this.projectionMatrixInverse=new an,this.coordinateSystem=oa,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(yu,Su,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yu,Su,ia.set(1,1,1)).invert()}updateWorldMatrix(e,i,s=!1){super.updateWorldMatrix(e,i,s),this.matrixWorld.decompose(yu,Su,ia),ia.x===1&&ia.y===1&&ia.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(yu,Su,ia.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const gs=new nt,n_=new he,i_=new he;class wi extends fy{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=Wp*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Wp*2*Math.atan(Math.tan(Du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){gs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(gs.x,gs.y).multiplyScalar(-e/gs.z),gs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(gs.x,gs.y).multiplyScalar(-e/gs.z)}getViewSize(e,i){return this.getViewBounds(e,n_,i_),i.subVectors(i_,n_)}setViewOffset(e,i,s,l,f,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(Du*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,f=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const p=d.fullWidth,m=d.fullHeight;f+=d.offsetX*l/p,i-=d.offsetY*s/m,l*=d.width/p,s*=d.height/m}const h=this.filmOffset;h!==0&&(f+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(f,f+l,i,i-s,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}class dm extends fy{constructor(e=-1,i=1,s=1,l=-1,f=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=f,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,f,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=f,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let f=s-e,d=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,v=(this.top-this.bottom)/this.view.fullHeight/this.zoom;f+=m*this.view.offsetX,d=f+m*this.view.width,h-=v*this.view.offsetY,p=h-v*this.view.height}this.projectionMatrix.makeOrthographic(f,d,h,p,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}class i1 extends n1{constructor(){super(new dm(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class a_ extends uy{constructor(e,i){super(e,i),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Cn.DEFAULT_UP),this.updateMatrix(),this.target=new Cn,this.shadow=new i1}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const i=super.toJSON(e);return i.object.shadow=this.shadow.toJSON(),i.object.target=this.target.uuid,i}}class a1 extends uy{constructor(e,i){super(e,i),this.isAmbientLight=!0,this.type="AmbientLight"}}const Jr=-90,$r=1;class s1 extends Cn{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new wi(Jr,$r,e,i);l.layers=this.layers,this.add(l);const f=new wi(Jr,$r,e,i);f.layers=this.layers,this.add(f);const d=new wi(Jr,$r,e,i);d.layers=this.layers,this.add(d);const h=new wi(Jr,$r,e,i);h.layers=this.layers,this.add(h);const p=new wi(Jr,$r,e,i);p.layers=this.layers,this.add(p);const m=new wi(Jr,$r,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,f,d,h,p]=i;for(const m of i)this.remove(m);if(e===oa)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),f.up.set(0,0,-1),f.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===Ml)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),f.up.set(0,0,1),f.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[f,d,h,p,m,v]=this.children,M=e.getRenderTarget(),x=e.getActiveCubeFace(),b=e.getActiveMipmapLevel(),T=e.xr.enabled;e.xr.enabled=!1;const L=s.texture.generateMipmaps;s.texture.generateMipmaps=!1;let y=!1;e.isWebGLRenderer===!0?y=e.state.buffers.depth.getReversed():y=e.reversedDepthBuffer,e.setRenderTarget(s,0,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,f),e.setRenderTarget(s,1,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,d),e.setRenderTarget(s,2,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,h),e.setRenderTarget(s,3,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,p),e.setRenderTarget(s,4,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,m),s.texture.generateMipmaps=L,e.setRenderTarget(s,5,l),y&&e.autoClear===!1&&e.clearDepth(),e.render(i,v),e.setRenderTarget(M,x,b),e.xr.enabled=T,s.texture.needsPMREMUpdate=!0}}class r1 extends wi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const s_=new an;class r_{constructor(e,i,s=0,l=1/0){this.ray=new Rl(e,i),this.near=s,this.far=l,this.camera=null,this.layers=new cm,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,i){this.ray.set(e,i)}setFromCamera(e,i){i.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(i.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(i).sub(this.ray.origin).normalize(),this.camera=i):i.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,i.projectionMatrix.elements[14]).unproject(i),this.ray.direction.set(0,0,-1).transformDirection(i.matrixWorld),this.camera=i):He("Raycaster: Unsupported camera type: "+i.type)}setFromXRController(e){return s_.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(s_),this}intersectObject(e,i=!0,s=[]){return Yp(e,this,s,i),s.sort(o_),s}intersectObjects(e,i=!0,s=[]){for(let l=0,f=e.length;l<f;l++)Yp(e[l],this,s,i);return s.sort(o_),s}}function o_(o,e){return o.distance-e.distance}function Yp(o,e,i,s){let l=!0;if(o.layers.test(e.layers)&&o.raycast(e,i)===!1&&(l=!1),l===!0&&s===!0){const f=o.children;for(let d=0,h=f.length;d<h;d++)Yp(f[d],e,i,!0)}}class l_{constructor(e=1,i=0,s=0){this.radius=e,this.phi=i,this.theta=s}set(e,i,s){return this.radius=e,this.phi=i,this.theta=s,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ne(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,i,s){return this.radius=Math.sqrt(e*e+i*i+s*s),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,s),this.phi=Math.acos(Ne(i/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class dy{static{dy.prototype.isMatrix2=!0}constructor(e,i,s,l){this.elements=[1,0,0,1],e!==void 0&&this.set(e,i,s,l)}identity(){return this.set(1,0,0,1),this}fromArray(e,i=0){for(let s=0;s<4;s++)this.elements[s]=e[s+i];return this}set(e,i,s,l){const f=this.elements;return f[0]=e,f[2]=i,f[1]=s,f[3]=l,this}}class o1 extends jp{constructor(e=10,i=10,s=4473924,l=8947848){s=new Re(s),l=new Re(l);const f=i/2,d=e/i,h=e/2,p=[],m=[];for(let x=0,b=0,T=-h;x<=i;x++,T+=d){p.push(-h,0,T,h,0,T),p.push(T,0,-h,T,0,h);const L=x===f?s:l;L.toArray(m,b),b+=3,L.toArray(m,b),b+=3,L.toArray(m,b),b+=3,L.toArray(m,b),b+=3}const v=new Pn;v.setAttribute("position",new Sn(p,3)),v.setAttribute("color",new Sn(m,3));const M=new Bu({vertexColors:!0,toneMapped:!1});super(v,M),this.type="GridHelper"}dispose(){super.dispose(),this.geometry.dispose(),this.material.dispose()}}class l1 extends ys{constructor(e,i=null){super(),this.object=e,this.domElement=i,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function c_(o,e,i,s){const l=c1(s);switch(i){case J_:return o*e;case ty:return o*e/l.components*l.byteLength;case im:return o*e/l.components*l.byteLength;case $s:return o*e*2/l.components*l.byteLength;case am:return o*e*2/l.components*l.byteLength;case $_:return o*e*3/l.components*l.byteLength;case Gi:return o*e*4/l.components*l.byteLength;case sm:return o*e*4/l.components*l.byteLength;case Au:case Ru:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case Cu:case wu:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case mp:case xp:return Math.max(o,16)*Math.max(e,8)/4;case pp:case gp:return Math.max(o,8)*Math.max(e,8)/2;case vp:case _p:case Sp:case Mp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*8;case yp:case Lu:case bp:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Ep:return Math.floor((o+3)/4)*Math.floor((e+3)/4)*16;case Tp:return Math.floor((o+4)/5)*Math.floor((e+3)/4)*16;case Ap:return Math.floor((o+4)/5)*Math.floor((e+4)/5)*16;case Rp:return Math.floor((o+5)/6)*Math.floor((e+4)/5)*16;case Cp:return Math.floor((o+5)/6)*Math.floor((e+5)/6)*16;case wp:return Math.floor((o+7)/8)*Math.floor((e+4)/5)*16;case Dp:return Math.floor((o+7)/8)*Math.floor((e+5)/6)*16;case Np:return Math.floor((o+7)/8)*Math.floor((e+7)/8)*16;case Up:return Math.floor((o+9)/10)*Math.floor((e+4)/5)*16;case Lp:return Math.floor((o+9)/10)*Math.floor((e+5)/6)*16;case Op:return Math.floor((o+9)/10)*Math.floor((e+7)/8)*16;case Pp:return Math.floor((o+9)/10)*Math.floor((e+9)/10)*16;case Ip:return Math.floor((o+11)/12)*Math.floor((e+9)/10)*16;case zp:return Math.floor((o+11)/12)*Math.floor((e+11)/12)*16;case Bp:case Fp:case Hp:return Math.ceil(o/4)*Math.ceil(e/4)*16;case Gp:case Vp:return Math.ceil(o/4)*Math.ceil(e/4)*8;case Ou:case kp:return Math.ceil(o/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function c1(o){switch(o){case hi:case Y_:return{byteLength:1,components:1};case yl:case Z_:case fa:return{byteLength:2,components:1};case em:case nm:return{byteLength:2,components:4};case ua:case tm:case ra:return{byteLength:4,components:1};case K_:case Q_:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${o}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Jp}}));typeof window<"u"&&(window.__THREE__?de("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Jp);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function hy(){let o=null,e=!1,i=null,s=null;function l(f,d){s=o.requestAnimationFrame(l),i(f,d)}return{start:function(){e!==!0&&i!==null&&o!==null&&(s=o.requestAnimationFrame(l),e=!0)},stop:function(){o!==null&&o.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(f){i=f},setContext:function(f){o=f}}}function u1(o){const e=new WeakMap;function i(h,p){const m=h.array,v=h.usage,M=m.byteLength,x=o.createBuffer();o.bindBuffer(p,x),o.bufferData(p,m,v),h.onUploadCallback();let b;if(m instanceof Float32Array)b=o.FLOAT;else if(typeof Float16Array<"u"&&m instanceof Float16Array)b=o.HALF_FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?b=o.HALF_FLOAT:b=o.UNSIGNED_SHORT;else if(m instanceof Int16Array)b=o.SHORT;else if(m instanceof Uint32Array)b=o.UNSIGNED_INT;else if(m instanceof Int32Array)b=o.INT;else if(m instanceof Int8Array)b=o.BYTE;else if(m instanceof Uint8Array)b=o.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)b=o.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:b,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:M}}function s(h,p,m){const v=p.array,M=p.updateRanges;if(o.bindBuffer(m,h),M.length===0)o.bufferSubData(m,0,v);else{M.sort((b,T)=>b.start-T.start);let x=0;for(let b=1;b<M.length;b++){const T=M[x],L=M[b];L.start<=T.start+T.count+1?T.count=Math.max(T.count,L.start+L.count-T.start):(++x,M[x]=L)}M.length=x+1;for(let b=0,T=M.length;b<T;b++){const L=M[b];o.bufferSubData(m,L.start*v.BYTES_PER_ELEMENT,v,L.start,L.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function f(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(o.deleteBuffer(p.buffer),e.delete(h))}function d(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const v=e.get(h);(!v||v.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:f,update:d}}var f1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,d1=`#ifdef USE_ALPHAHASH
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
#endif`,h1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,p1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,m1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,g1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,x1=`#ifdef USE_AOMAP
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
#endif`,v1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,_1=`#ifdef USE_BATCHING
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
#endif`,y1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,S1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,M1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,b1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,E1=`#ifdef USE_IRIDESCENCE
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
#endif`,T1=`#ifdef USE_BUMPMAP
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
#endif`,A1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,R1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,C1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,w1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,D1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,N1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,U1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,L1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,O1=`#define PI 3.141592653589793
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
} // validated`,P1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,I1=`vec3 transformedNormal = objectNormal;
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
#endif`,z1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,B1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,F1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,H1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,G1="gl_FragColor = linearToOutputTexel( gl_FragColor );",V1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,k1=`#ifdef USE_ENVMAP
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
#endif`,X1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,W1=`#ifdef USE_ENVMAP
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
#endif`,j1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,q1=`#ifdef USE_ENVMAP
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
#endif`,Y1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Z1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,K1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Q1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,J1=`#ifdef USE_GRADIENTMAP
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
}`,$1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,tT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,eT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,nT=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,iT=`#ifdef USE_ENVMAP
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
#endif`,aT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,sT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,rT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,oT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lT=`PhysicalMaterial material;
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
#endif`,cT=`uniform sampler2D dfgLUT;
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
}`,uT=`
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
#endif`,fT=`#if defined( RE_IndirectDiffuse )
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
#endif`,dT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,hT=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,pT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,mT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xT=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,vT=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,_T=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yT=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,ST=`#if defined( USE_POINTS_UV )
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
#endif`,MT=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bT=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ET=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,TT=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,AT=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,RT=`#ifdef USE_MORPHTARGETS
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
#endif`,CT=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wT=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,DT=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,NT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,UT=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,LT=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,OT=`#ifdef USE_NORMALMAP
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
#endif`,PT=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,IT=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,zT=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,BT=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,FT=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,HT=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,GT=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,VT=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,kT=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,XT=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,WT=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,jT=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,qT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,YT=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ZT=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,KT=`float getShadowMask() {
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
}`,QT=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,JT=`#ifdef USE_SKINNING
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
#endif`,$T=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,tA=`#ifdef USE_SKINNING
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
#endif`,eA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,nA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,aA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,sA=`#ifdef USE_TRANSMISSION
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
#endif`,rA=`#ifdef USE_TRANSMISSION
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
#endif`,oA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,cA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const fA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,dA=`uniform sampler2D t2D;
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
}`,hA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,pA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,mA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xA=`#include <common>
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
}`,vA=`#if DEPTH_PACKING == 3200
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
}`,_A=`#define DISTANCE
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
}`,yA=`#define DISTANCE
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
}`,SA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,MA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bA=`uniform float scale;
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
}`,EA=`uniform vec3 diffuse;
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
}`,TA=`#include <common>
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
}`,AA=`uniform vec3 diffuse;
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
}`,RA=`#define LAMBERT
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
}`,CA=`#define LAMBERT
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
}`,wA=`#define MATCAP
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
}`,DA=`#define MATCAP
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
}`,NA=`#define NORMAL
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
}`,UA=`#define NORMAL
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
}`,LA=`#define PHONG
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
}`,OA=`#define PHONG
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
}`,PA=`#define STANDARD
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
}`,IA=`#define STANDARD
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
}`,zA=`#define TOON
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
}`,BA=`#define TOON
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
}`,FA=`uniform float size;
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
}`,HA=`uniform vec3 diffuse;
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
}`,GA=`#include <common>
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
}`,VA=`uniform vec3 color;
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
}`,kA=`uniform float rotation;
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
}`,XA=`uniform vec3 diffuse;
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
}`,be={alphahash_fragment:f1,alphahash_pars_fragment:d1,alphamap_fragment:h1,alphamap_pars_fragment:p1,alphatest_fragment:m1,alphatest_pars_fragment:g1,aomap_fragment:x1,aomap_pars_fragment:v1,batching_pars_vertex:_1,batching_vertex:y1,begin_vertex:S1,beginnormal_vertex:M1,bsdfs:b1,iridescence_fragment:E1,bumpmap_pars_fragment:T1,clipping_planes_fragment:A1,clipping_planes_pars_fragment:R1,clipping_planes_pars_vertex:C1,clipping_planes_vertex:w1,color_fragment:D1,color_pars_fragment:N1,color_pars_vertex:U1,color_vertex:L1,common:O1,cube_uv_reflection_fragment:P1,defaultnormal_vertex:I1,displacementmap_pars_vertex:z1,displacementmap_vertex:B1,emissivemap_fragment:F1,emissivemap_pars_fragment:H1,colorspace_fragment:G1,colorspace_pars_fragment:V1,envmap_fragment:k1,envmap_common_pars_fragment:X1,envmap_pars_fragment:W1,envmap_pars_vertex:j1,envmap_physical_pars_fragment:iT,envmap_vertex:q1,fog_vertex:Y1,fog_pars_vertex:Z1,fog_fragment:K1,fog_pars_fragment:Q1,gradientmap_pars_fragment:J1,lightmap_pars_fragment:$1,lights_lambert_fragment:tT,lights_lambert_pars_fragment:eT,lights_pars_begin:nT,lights_toon_fragment:aT,lights_toon_pars_fragment:sT,lights_phong_fragment:rT,lights_phong_pars_fragment:oT,lights_physical_fragment:lT,lights_physical_pars_fragment:cT,lights_fragment_begin:uT,lights_fragment_maps:fT,lights_fragment_end:dT,lightprobes_pars_fragment:hT,logdepthbuf_fragment:pT,logdepthbuf_pars_fragment:mT,logdepthbuf_pars_vertex:gT,logdepthbuf_vertex:xT,map_fragment:vT,map_pars_fragment:_T,map_particle_fragment:yT,map_particle_pars_fragment:ST,metalnessmap_fragment:MT,metalnessmap_pars_fragment:bT,morphinstance_vertex:ET,morphcolor_vertex:TT,morphnormal_vertex:AT,morphtarget_pars_vertex:RT,morphtarget_vertex:CT,normal_fragment_begin:wT,normal_fragment_maps:DT,normal_pars_fragment:NT,normal_pars_vertex:UT,normal_vertex:LT,normalmap_pars_fragment:OT,clearcoat_normal_fragment_begin:PT,clearcoat_normal_fragment_maps:IT,clearcoat_pars_fragment:zT,iridescence_pars_fragment:BT,opaque_fragment:FT,packing:HT,premultiplied_alpha_fragment:GT,project_vertex:VT,dithering_fragment:kT,dithering_pars_fragment:XT,roughnessmap_fragment:WT,roughnessmap_pars_fragment:jT,shadowmap_pars_fragment:qT,shadowmap_pars_vertex:YT,shadowmap_vertex:ZT,shadowmask_pars_fragment:KT,skinbase_vertex:QT,skinning_pars_vertex:JT,skinning_vertex:$T,skinnormal_vertex:tA,specularmap_fragment:eA,specularmap_pars_fragment:nA,tonemapping_fragment:iA,tonemapping_pars_fragment:aA,transmission_fragment:sA,transmission_pars_fragment:rA,uv_pars_fragment:oA,uv_pars_vertex:lA,uv_vertex:cA,worldpos_vertex:uA,background_vert:fA,background_frag:dA,backgroundCube_vert:hA,backgroundCube_frag:pA,cube_vert:mA,cube_frag:gA,depth_vert:xA,depth_frag:vA,distance_vert:_A,distance_frag:yA,equirect_vert:SA,equirect_frag:MA,linedashed_vert:bA,linedashed_frag:EA,meshbasic_vert:TA,meshbasic_frag:AA,meshlambert_vert:RA,meshlambert_frag:CA,meshmatcap_vert:wA,meshmatcap_frag:DA,meshnormal_vert:NA,meshnormal_frag:UA,meshphong_vert:LA,meshphong_frag:OA,meshphysical_vert:PA,meshphysical_frag:IA,meshtoon_vert:zA,meshtoon_frag:BA,points_vert:FA,points_frag:HA,shadow_vert:GA,shadow_frag:VA,sprite_vert:kA,sprite_frag:XA},Vt={common:{diffuse:{value:new Re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ye}},envmap:{envMap:{value:null},envMapRotation:{value:new ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ye},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new nt},probesMax:{value:new nt},probesResolution:{value:new nt}},points:{diffuse:{value:new Re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0},uvTransform:{value:new ye}},sprite:{diffuse:{value:new Re(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ye},alphaMap:{value:null},alphaMapTransform:{value:new ye},alphaTest:{value:0}}},sa={basic:{uniforms:Wn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.fog]),vertexShader:be.meshbasic_vert,fragmentShader:be.meshbasic_frag},lambert:{uniforms:Wn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new Re(0)},envMapIntensity:{value:1}}]),vertexShader:be.meshlambert_vert,fragmentShader:be.meshlambert_frag},phong:{uniforms:Wn([Vt.common,Vt.specularmap,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,Vt.lights,{emissive:{value:new Re(0)},specular:{value:new Re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:be.meshphong_vert,fragmentShader:be.meshphong_frag},standard:{uniforms:Wn([Vt.common,Vt.envmap,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.roughnessmap,Vt.metalnessmap,Vt.fog,Vt.lights,{emissive:{value:new Re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag},toon:{uniforms:Wn([Vt.common,Vt.aomap,Vt.lightmap,Vt.emissivemap,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.gradientmap,Vt.fog,Vt.lights,{emissive:{value:new Re(0)}}]),vertexShader:be.meshtoon_vert,fragmentShader:be.meshtoon_frag},matcap:{uniforms:Wn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,Vt.fog,{matcap:{value:null}}]),vertexShader:be.meshmatcap_vert,fragmentShader:be.meshmatcap_frag},points:{uniforms:Wn([Vt.points,Vt.fog]),vertexShader:be.points_vert,fragmentShader:be.points_frag},dashed:{uniforms:Wn([Vt.common,Vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:be.linedashed_vert,fragmentShader:be.linedashed_frag},depth:{uniforms:Wn([Vt.common,Vt.displacementmap]),vertexShader:be.depth_vert,fragmentShader:be.depth_frag},normal:{uniforms:Wn([Vt.common,Vt.bumpmap,Vt.normalmap,Vt.displacementmap,{opacity:{value:1}}]),vertexShader:be.meshnormal_vert,fragmentShader:be.meshnormal_frag},sprite:{uniforms:Wn([Vt.sprite,Vt.fog]),vertexShader:be.sprite_vert,fragmentShader:be.sprite_frag},background:{uniforms:{uvTransform:{value:new ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:be.background_vert,fragmentShader:be.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ye}},vertexShader:be.backgroundCube_vert,fragmentShader:be.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:be.cube_vert,fragmentShader:be.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:be.equirect_vert,fragmentShader:be.equirect_frag},distance:{uniforms:Wn([Vt.common,Vt.displacementmap,{referencePosition:{value:new nt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:be.distance_vert,fragmentShader:be.distance_frag},shadow:{uniforms:Wn([Vt.lights,Vt.fog,{color:{value:new Re(0)},opacity:{value:1}}]),vertexShader:be.shadow_vert,fragmentShader:be.shadow_frag}};sa.physical={uniforms:Wn([sa.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ye},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ye},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ye},sheen:{value:0},sheenColor:{value:new Re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ye},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ye},attenuationDistance:{value:0},attenuationColor:{value:new Re(0)},specularColor:{value:new Re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ye},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ye}}]),vertexShader:be.meshphysical_vert,fragmentShader:be.meshphysical_frag};const Mu={r:0,b:0,g:0},WA=new an,py=new ye;py.set(-1,0,0,0,1,0,0,0,1);function jA(o,e,i,s,l,f){const d=new Re(0);let h=l===!0?0:1,p,m,v=null,M=0,x=null;function b(N){let V=N.isScene===!0?N.background:null;if(V&&V.isTexture){const D=N.backgroundBlurriness>0;V=e.get(V,D)}return V}function T(N){let V=!1;const D=b(N);D===null?y(d,h):D&&D.isColor&&(y(D,1),V=!0);const U=o.xr.getEnvironmentBlendMode();U==="additive"?i.buffers.color.setClear(0,0,0,1,f):U==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,f),(o.autoClear||V)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),o.clear(o.autoClearColor,o.autoClearDepth,o.autoClearStencil))}function L(N,V){const D=b(V);D&&(D.isCubeTexture||D.mapping===ku)?(m===void 0&&(m=new pi(new Cl(1,1,1),new da({name:"BackgroundCubeMaterial",uniforms:lo(sa.backgroundCube.uniforms),vertexShader:sa.backgroundCube.vertexShader,fragmentShader:sa.backgroundCube.fragmentShader,side:jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),m.geometry.deleteAttribute("normal"),m.geometry.deleteAttribute("uv"),m.onBeforeRender=function(U,w,O){this.matrixWorld.copyPosition(O.matrixWorld)},Object.defineProperty(m.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(m)),m.material.uniforms.envMap.value=D,m.material.uniforms.backgroundBlurriness.value=V.backgroundBlurriness,m.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,m.material.uniforms.backgroundRotation.value.setFromMatrix4(WA.makeRotationFromEuler(V.backgroundRotation)).transpose(),D.isCubeTexture&&D.isRenderTargetTexture===!1&&m.material.uniforms.backgroundRotation.value.premultiply(py),m.material.toneMapped=Be.getTransfer(D.colorSpace)!==Ze,(v!==D||M!==D.version||x!==o.toneMapping)&&(m.material.needsUpdate=!0,v=D,M=D.version,x=o.toneMapping),m.layers.enableAll(),N.unshift(m,m.geometry,m.material,0,0,null)):D&&D.isTexture&&(p===void 0&&(p=new pi(new Xu(2,2),new da({name:"BackgroundMaterial",uniforms:lo(sa.background.uniforms),vertexShader:sa.background.vertexShader,fragmentShader:sa.background.fragmentShader,side:Qs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),p.geometry.deleteAttribute("normal"),Object.defineProperty(p.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(p)),p.material.uniforms.t2D.value=D,p.material.uniforms.backgroundIntensity.value=V.backgroundIntensity,p.material.toneMapped=Be.getTransfer(D.colorSpace)!==Ze,D.matrixAutoUpdate===!0&&D.updateMatrix(),p.material.uniforms.uvTransform.value.copy(D.matrix),(v!==D||M!==D.version||x!==o.toneMapping)&&(p.material.needsUpdate=!0,v=D,M=D.version,x=o.toneMapping),p.layers.enableAll(),N.unshift(p,p.geometry,p.material,0,0,null))}function y(N,V){N.getRGB(Mu,cy(o)),i.buffers.color.setClear(Mu.r,Mu.g,Mu.b,V,f)}function _(){m!==void 0&&(m.geometry.dispose(),m.material.dispose(),m=void 0),p!==void 0&&(p.geometry.dispose(),p.material.dispose(),p=void 0)}return{getClearColor:function(){return d},setClearColor:function(N,V=1){d.set(N),h=V,y(d,h)},getClearAlpha:function(){return h},setClearAlpha:function(N){h=N,y(d,h)},render:T,addToRenderList:L,dispose:_}}function qA(o,e){const i=o.getParameter(o.MAX_VERTEX_ATTRIBS),s={},l=x(null);let f=l,d=!1;function h(k,Q,ct,q,it){let F=!1;const X=M(k,q,ct,Q);f!==X&&(f=X,m(f.object)),F=b(k,q,ct,it),F&&T(k,q,ct,it),it!==null&&e.update(it,o.ELEMENT_ARRAY_BUFFER),(F||d)&&(d=!1,D(k,Q,ct,q),it!==null&&o.bindBuffer(o.ELEMENT_ARRAY_BUFFER,e.get(it).buffer))}function p(){return o.createVertexArray()}function m(k){return o.bindVertexArray(k)}function v(k){return o.deleteVertexArray(k)}function M(k,Q,ct,q){const it=q.wireframe===!0;let F=s[Q.id];F===void 0&&(F={},s[Q.id]=F);const X=k.isInstancedMesh===!0?k.id:0;let st=F[X];st===void 0&&(st={},F[X]=st);let Y=st[ct.id];Y===void 0&&(Y={},st[ct.id]=Y);let H=Y[it];return H===void 0&&(H=x(p()),Y[it]=H),H}function x(k){const Q=[],ct=[],q=[];for(let it=0;it<i;it++)Q[it]=0,ct[it]=0,q[it]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:Q,enabledAttributes:ct,attributeDivisors:q,object:k,attributes:{},index:null}}function b(k,Q,ct,q){const it=f.attributes,F=Q.attributes;let X=0;const st=ct.getAttributes();for(const Y in st)if(st[Y].location>=0){const J=it[Y];let Tt=F[Y];if(Tt===void 0&&(Y==="instanceMatrix"&&k.instanceMatrix&&(Tt=k.instanceMatrix),Y==="instanceColor"&&k.instanceColor&&(Tt=k.instanceColor)),J===void 0||J.attribute!==Tt||Tt&&J.data!==Tt.data)return!0;X++}return f.attributesNum!==X||f.index!==q}function T(k,Q,ct,q){const it={},F=Q.attributes;let X=0;const st=ct.getAttributes();for(const Y in st)if(st[Y].location>=0){let J=F[Y];J===void 0&&(Y==="instanceMatrix"&&k.instanceMatrix&&(J=k.instanceMatrix),Y==="instanceColor"&&k.instanceColor&&(J=k.instanceColor));const Tt={};Tt.attribute=J,J&&J.data&&(Tt.data=J.data),it[Y]=Tt,X++}f.attributes=it,f.attributesNum=X,f.index=q}function L(){const k=f.newAttributes;for(let Q=0,ct=k.length;Q<ct;Q++)k[Q]=0}function y(k){_(k,0)}function _(k,Q){const ct=f.newAttributes,q=f.enabledAttributes,it=f.attributeDivisors;ct[k]=1,q[k]===0&&(o.enableVertexAttribArray(k),q[k]=1),it[k]!==Q&&(o.vertexAttribDivisor(k,Q),it[k]=Q)}function N(){const k=f.newAttributes,Q=f.enabledAttributes;for(let ct=0,q=Q.length;ct<q;ct++)Q[ct]!==k[ct]&&(o.disableVertexAttribArray(ct),Q[ct]=0)}function V(k,Q,ct,q,it,F,X){X===!0?o.vertexAttribIPointer(k,Q,ct,it,F):o.vertexAttribPointer(k,Q,ct,q,it,F)}function D(k,Q,ct,q){L();const it=q.attributes,F=ct.getAttributes(),X=Q.defaultAttributeValues;for(const st in F){const Y=F[st];if(Y.location>=0){let H=it[st];if(H===void 0&&(st==="instanceMatrix"&&k.instanceMatrix&&(H=k.instanceMatrix),st==="instanceColor"&&k.instanceColor&&(H=k.instanceColor)),H!==void 0){const J=H.normalized,Tt=H.itemSize,bt=e.get(H);if(bt===void 0)continue;const Zt=bt.buffer,Rt=bt.type,Xt=bt.bytesPerElement,rt=Rt===o.INT||Rt===o.UNSIGNED_INT||H.gpuType===tm;if(H.isInterleavedBufferAttribute){const mt=H.data,At=mt.stride,Wt=H.offset;if(mt.isInstancedInterleavedBuffer){for(let gt=0;gt<Y.locationSize;gt++)_(Y.location+gt,mt.meshPerAttribute);k.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let gt=0;gt<Y.locationSize;gt++)y(Y.location+gt);o.bindBuffer(o.ARRAY_BUFFER,Zt);for(let gt=0;gt<Y.locationSize;gt++)V(Y.location+gt,Tt/Y.locationSize,Rt,J,At*Xt,(Wt+Tt/Y.locationSize*gt)*Xt,rt)}else{if(H.isInstancedBufferAttribute){for(let mt=0;mt<Y.locationSize;mt++)_(Y.location+mt,H.meshPerAttribute);k.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=H.meshPerAttribute*H.count)}else for(let mt=0;mt<Y.locationSize;mt++)y(Y.location+mt);o.bindBuffer(o.ARRAY_BUFFER,Zt);for(let mt=0;mt<Y.locationSize;mt++)V(Y.location+mt,Tt/Y.locationSize,Rt,J,Tt*Xt,Tt/Y.locationSize*mt*Xt,rt)}}else if(X!==void 0){const J=X[st];if(J!==void 0)switch(J.length){case 2:o.vertexAttrib2fv(Y.location,J);break;case 3:o.vertexAttrib3fv(Y.location,J);break;case 4:o.vertexAttrib4fv(Y.location,J);break;default:o.vertexAttrib1fv(Y.location,J)}}}}N()}function U(){P();for(const k in s){const Q=s[k];for(const ct in Q){const q=Q[ct];for(const it in q){const F=q[it];for(const X in F)v(F[X].object),delete F[X];delete q[it]}}delete s[k]}}function w(k){if(s[k.id]===void 0)return;const Q=s[k.id];for(const ct in Q){const q=Q[ct];for(const it in q){const F=q[it];for(const X in F)v(F[X].object),delete F[X];delete q[it]}}delete s[k.id]}function O(k){for(const Q in s){const ct=s[Q];for(const q in ct){const it=ct[q];if(it[k.id]===void 0)continue;const F=it[k.id];for(const X in F)v(F[X].object),delete F[X];delete it[k.id]}}}function A(k){for(const Q in s){const ct=s[Q],q=k.isInstancedMesh===!0?k.id:0,it=ct[q];if(it!==void 0){for(const F in it){const X=it[F];for(const st in X)v(X[st].object),delete X[st];delete it[F]}delete ct[q],Object.keys(ct).length===0&&delete s[Q]}}}function P(){z(),d=!0,f!==l&&(f=l,m(f.object))}function z(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:P,resetDefaultState:z,dispose:U,releaseStatesOfGeometry:w,releaseStatesOfObject:A,releaseStatesOfProgram:O,initAttributes:L,enableAttribute:y,disableUnusedAttributes:N}}function YA(o,e,i){let s;function l(p){s=p}function f(p,m){o.drawArrays(s,p,m),i.update(m,s,1)}function d(p,m,v){v!==0&&(o.drawArraysInstanced(s,p,m,v),i.update(m,s,v))}function h(p,m,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,p,0,m,0,v);let x=0;for(let b=0;b<v;b++)x+=m[b];i.update(x,s,1)}this.setMode=l,this.render=f,this.renderInstances=d,this.renderMultiDraw=h}function ZA(o,e,i,s){let l;function f(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const O=e.get("EXT_texture_filter_anisotropic");l=o.getParameter(O.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(O){return!(O!==Gi&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(O){const A=O===fa&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(O!==hi&&O!==ra&&!A&&s.convert(O)!==o.getParameter(o.IMPLEMENTATION_COLOR_READ_TYPE))}function p(O){if(O==="highp"){if(o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.HIGH_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.HIGH_FLOAT).precision>0)return"highp";O="mediump"}return O==="mediump"&&o.getShaderPrecisionFormat(o.VERTEX_SHADER,o.MEDIUM_FLOAT).precision>0&&o.getShaderPrecisionFormat(o.FRAGMENT_SHADER,o.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const v=p(m);v!==m&&(de("WebGLRenderer:",m,"not supported, using",v,"instead."),m=v);const M=i.logarithmicDepthBuffer===!0,x=i.reversedDepthBuffer===!0&&e.has("EXT_clip_control");i.reversedDepthBuffer===!0&&x===!1&&de("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const b=o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS),T=o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS),L=o.getParameter(o.MAX_TEXTURE_SIZE),y=o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE),_=o.getParameter(o.MAX_VERTEX_ATTRIBS),N=o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS),V=o.getParameter(o.MAX_VARYING_VECTORS),D=o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS),U=o.getParameter(o.MAX_SAMPLES),w=o.getParameter(o.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:f,getMaxPrecision:p,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:M,reversedDepthBuffer:x,maxTextures:b,maxVertexTextures:T,maxTextureSize:L,maxCubemapSize:y,maxAttributes:_,maxVertexUniforms:N,maxVaryings:V,maxFragmentUniforms:D,maxSamples:U,samples:w}}function KA(o){const e=this;let i=null,s=0,l=!1,f=!1;const d=new La,h=new ye,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(M,x){const b=M.length!==0||x||s!==0||l;return l=x,s=M.length,b},this.beginShadows=function(){f=!0,v(null)},this.endShadows=function(){f=!1},this.setGlobalState=function(M,x){i=v(M,x,0)},this.setState=function(M,x,b){const T=M.clippingPlanes,L=M.clipIntersection,y=M.clipShadows,_=o.get(M);if(!l||T===null||T.length===0||f&&!y)f?v(null):m();else{const N=f?0:s,V=N*4;let D=_.clippingState||null;p.value=D,D=v(T,x,V,b);for(let U=0;U!==V;++U)D[U]=i[U];_.clippingState=D,this.numIntersection=L?this.numPlanes:0,this.numPlanes+=N}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function v(M,x,b,T){const L=M!==null?M.length:0;let y=null;if(L!==0){if(y=p.value,T!==!0||y===null){const _=b+L*4,N=x.matrixWorldInverse;h.getNormalMatrix(N),(y===null||y.length<_)&&(y=new Float32Array(_));for(let V=0,D=b;V!==L;++V,D+=4)d.copy(M[V]).applyMatrix4(N,h),d.normal.toArray(y,D),y[D+3]=d.constant}p.value=y,p.needsUpdate=!0}return e.numPlanes=L,e.numIntersection=0,y}}const io=4,QA=6,JA=20,$A=256,hl=new dm,u_=new Re;let Kh=null,Qh=0,Jh=0,$h=!1;const tR=new nt,Ys=new nt;class f_{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,i=0,s=.1,l=100,f={}){const{size:d=256,position:h=tR}=f;Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),Jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(d);const p=this._allocateTargets();return p.depthBuffer=!0,this._sceneToCubeUV(e,s,l,p,h),i>0&&this._blur(p,0,0,i),this._applyPMREM(p),this._cleanup(p),p}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=p_(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=h_(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Kh,Qh,Jh),this._renderer.xr.enabled=$h,e.scissorTest=!1,to(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===Js||e.mapping===oo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Kh=this._renderer.getRenderTarget(),Qh=this._renderer.getActiveCubeFace(),Jh=this._renderer.getActiveMipmapLevel(),$h=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:Fn,minFilter:Fn,generateMipmaps:!1,type:fa,format:Gi,colorSpace:Pu,depthBuffer:!1},l=d_(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=d_(e,i,s);const{_lodMax:f}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=eR(f)),this._blurMaterial=iR(f,e,i),this._ggxMaterial=nR(f,e,i)}return l}_compileMaterial(e){const i=new pi(new Pn,e);this._renderer.compile(i,hl)}_sceneToCubeUV(e,i,s,l,f){const p=new wi(90,1,i,s),m=[1,-1,1,1,1,1],v=[1,1,1,-1,-1,-1],M=this._renderer,x=M.autoClear,b=M.toneMapping;M.getClearColor(u_),M.toneMapping=la,M.autoClear=!1,M.state.buffers.depth.getReversed()&&(M.setRenderTarget(l),M.clearDepth(),M.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pi(new Cl,new vl({name:"PMREM.Background",side:jn,depthWrite:!1,depthTest:!1})));const L=this._backgroundBox,y=L.material;let _=!1;const N=e.background;N?N.isColor&&(y.color.copy(N),e.background=null,_=!0):(y.color.copy(u_),_=!0);for(let V=0;V<6;V++){const D=V%3;D===0?(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x+v[V],f.y,f.z)):D===1?(p.up.set(0,0,m[V]),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y+v[V],f.z)):(p.up.set(0,m[V],0),p.position.set(f.x,f.y,f.z),p.lookAt(f.x,f.y,f.z+v[V]));const U=this._cubeSize;to(l,D*U,V>2?U:0,U,U),M.setRenderTarget(l),_&&M.render(L,p),M.render(e,p)}M.toneMapping=b,M.autoClear=x,e.background=N}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===Js||e.mapping===oo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=p_()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=h_());const f=l?this._cubemapMaterial:this._equirectMaterial,d=this._lodMeshes[0];d.material=f;const h=f.uniforms;h.envMap.value=e;const p=this._cubeSize;to(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(d,hl)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodMeshes.length;for(let f=1;f<l;f++)this._applyGGXFilter(e,f-1,f);i.autoClear=s}_applyGGXFilter(e,i,s){const l=this._renderer,f=this._pingPongRenderTarget,d=this._ggxMaterial,h=this._lodMeshes[s];h.material=d;const p=d.uniforms,m=s/(this._lodMeshes.length-1),v=i/(this._lodMeshes.length-1),M=Math.sqrt(m*m-v*v),x=m*1.25,b=M*x,{_lodMax:T}=this,L=this._sizeLods[s],y=3*L*(s>T-io?s-T+io:0),_=4*(this._cubeSize-L);p.envMap.value=e.texture,p.roughness.value=b,p.mipInt.value=T-i,to(f,y,_,3*L,2*L),l.setRenderTarget(f),l.render(h,hl),p.envMap.value=f.texture,p.roughness.value=0,p.mipInt.value=T-s,to(e,y,_,3*L,2*L),l.setRenderTarget(e),l.render(h,hl)}_blur(e,i,s,l){const f=this._pingPongRenderTarget,d=Math.min(l,Math.PI)/Math.SQRT2;this._blurPass(e,f,i,s,d),this._blurPass(f,e,s,s,d)}_blurPass(e,i,s,l,f){const d=this._renderer,h=this._blurMaterial,p=this._lodMeshes[l];p.material=h;const m=h.uniforms;m.envMap.value=e.texture,m.sigma.value=f,m.mipInt.value=this._lodMax-s;const v=this._sizeLods[l],M=3*v*(l>this._lodMax-io?l-this._lodMax+io:0),x=4*(this._cubeSize-v);to(i,M,x,3*v,2*v),d.setRenderTarget(i),d.render(p,hl)}}function eR(o){const e=[],i=[];let s=o;const l=o-io+1+QA;for(let f=0;f<l;f++){const d=Math.pow(2,s);e.push(d);const h=1/(d-2),p=-h,m=1+h,v=[p,p,m,p,m,m,p,p,m,m,p,m],M=6,x=6,b=3,T=new Float32Array(b*x*M),L=new Float32Array(b*x*M);for(let _=0;_<M;_++){const N=_%3*2/3-1,V=_>2?0:-1,D=[N,V,0,N+2/3,V,0,N+2/3,V+1,0,N,V,0,N+2/3,V+1,0,N,V+1,0];T.set(D,b*x*_);for(let U=0;U<x;U++){const w=v[U*2]*2-1,O=v[U*2+1]*2-1;_===0?Ys.set(1,O,w):_===1?Ys.set(-w,1,-O):_===2?Ys.set(-w,O,1):_===3?Ys.set(-1,O,-w):_===4?Ys.set(-w,-1,O):Ys.set(w,O,-1),Ys.toArray(L,(_*x+U)*b)}}const y=new Pn;y.setAttribute("position",new ca(T,b)),y.setAttribute("outputDirection",new ca(L,b)),i.push(new pi(y,null)),s>io&&s--}return{lodMeshes:i,sizeLods:e}}function d_(o,e,i){const s=new Vi(o,e,i);return s.texture.mapping=ku,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function to(o,e,i,s,l){o.viewport.set(e,i,s,l),o.scissor.set(e,i,s,l)}function nR(o,e,i){return new da({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$A,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Wu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function iR(o,e,i){return new da({name:"SphericalGaussianBlur",defines:{SAMPLES:JA,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Wu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function h_(){return new da({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Wu(),fragmentShader:`

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
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function p_(){return new da({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Wu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Pa,depthTest:!1,depthWrite:!1})}function Wu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class my extends Vi{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new oy(l),this._setTextureOptions(i),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},l=new Cl(5,5,5),f=new da({name:"CubemapFromEquirect",uniforms:lo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:jn,blending:Pa});f.uniforms.tEquirect.value=i;const d=new pi(l,f),h=i.minFilter;return i.minFilter===Zs&&(i.minFilter=Fn),new s1(1,10,this).update(e,d),i.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,i=!0,s=!0,l=!0){const f=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,s,l);e.setRenderTarget(f)}}function aR(o){let e=new WeakMap,i=new WeakMap,s=null;function l(x,b=!1){return x==null?null:b?d(x):f(x)}function f(x){if(x&&x.isTexture){const b=x.mapping;if(b===bh||b===Eh)if(e.has(x)){const T=e.get(x).texture;return h(T,x.mapping)}else{const T=x.image;if(T&&T.height>0){const L=new my(T.height);return L.fromEquirectangularTexture(o,x),e.set(x,L),x.addEventListener("dispose",m),h(L.texture,x.mapping)}else return null}}return x}function d(x){if(x&&x.isTexture){const b=x.mapping,T=b===bh||b===Eh,L=b===Js||b===oo;if(T||L){let y=i.get(x);const _=y!==void 0?y.texture.pmremVersion:0;if(x.isRenderTargetTexture&&x.pmremVersion!==_)return s===null&&(s=new f_(o)),y=T?s.fromEquirectangular(x,y):s.fromCubemap(x,y),y.texture.pmremVersion=x.pmremVersion,i.set(x,y),y.texture;if(y!==void 0)return y.texture;{const N=x.image;return T&&N&&N.height>0||L&&N&&p(N)?(s===null&&(s=new f_(o)),y=T?s.fromEquirectangular(x):s.fromCubemap(x),y.texture.pmremVersion=x.pmremVersion,i.set(x,y),x.addEventListener("dispose",v),y.texture):null}}}return x}function h(x,b){return b===bh?x.mapping=Js:b===Eh&&(x.mapping=oo),x}function p(x){let b=0;const T=6;for(let L=0;L<T;L++)x[L]!==void 0&&b++;return b===T}function m(x){const b=x.target;b.removeEventListener("dispose",m);const T=e.get(b);T!==void 0&&(e.delete(b),T.dispose())}function v(x){const b=x.target;b.removeEventListener("dispose",v);const T=i.get(b);T!==void 0&&(i.delete(b),T.dispose())}function M(){e=new WeakMap,i=new WeakMap,s!==null&&(s.dispose(),s=null)}return{get:l,dispose:M}}function sR(o){const e={};function i(s){if(e[s]!==void 0)return e[s];const l=o.getExtension(s);return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&so("WebGLRenderer: "+s+" extension not supported."),l}}}function rR(o,e,i,s){const l={},f=new WeakMap;function d(M){const x=M.target;x.index!==null&&e.remove(x.index);for(const T in x.attributes)e.remove(x.attributes[T]);x.removeEventListener("dispose",d),delete l[x.id];const b=f.get(x);b&&(e.remove(b),f.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function h(M,x){return l[x.id]===!0||(x.addEventListener("dispose",d),l[x.id]=!0,i.memory.geometries++),x}function p(M){const x=M.attributes;for(const b in x)e.update(x[b],o.ARRAY_BUFFER)}function m(M){const x=[],b=M.index,T=M.attributes.position;let L=0;if(T===void 0)return;if(b!==null){const N=b.array;L=b.version;for(let V=0,D=N.length;V<D;V+=3){const U=N[V+0],w=N[V+1],O=N[V+2];x.push(U,w,w,O,O,U)}}else{const N=T.array;L=T.version;for(let V=0,D=N.length/3-1;V<D;V+=3){const U=V+0,w=V+1,O=V+2;x.push(U,w,w,O,O,U)}}const y=new(T.count>=65535?sy:ay)(x,1);y.version=L;const _=f.get(M);_&&e.remove(_),f.set(M,y)}function v(M){const x=f.get(M);if(x){const b=M.index;b!==null&&x.version<b.version&&m(M)}else m(M);return f.get(M)}return{get:h,update:p,getWireframeAttribute:v}}function oR(o,e,i){let s;function l(M){s=M}let f,d;function h(M){f=M.type,d=M.bytesPerElement}function p(M,x){o.drawElements(s,x,f,M*d),i.update(x,s,1)}function m(M,x,b){b!==0&&(o.drawElementsInstanced(s,x,f,M*d,b),i.update(x,s,b))}function v(M,x,b){if(b===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,x,0,f,M,0,b);let L=0;for(let y=0;y<b;y++)L+=x[y];i.update(L,s,1)}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=v}function lR(o){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(f,d,h){switch(i.calls++,d){case o.TRIANGLES:i.triangles+=h*(f/3);break;case o.LINES:i.lines+=h*(f/2);break;case o.LINE_STRIP:i.lines+=h*(f-1);break;case o.LINE_LOOP:i.lines+=h*f;break;case o.POINTS:i.points+=h*f;break;default:He("WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function cR(o,e,i){const s=new WeakMap,l=new on;function f(d,h,p){const m=d.morphTargetInfluences,v=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,M=v!==void 0?v.length:0;let x=s.get(h);if(x===void 0||x.count!==M){let P=function(){O.dispose(),s.delete(h),h.removeEventListener("dispose",P)};x!==void 0&&x.texture.dispose();const b=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,L=h.morphAttributes.color!==void 0,y=h.morphAttributes.position||[],_=h.morphAttributes.normal||[],N=h.morphAttributes.color||[];let V=0;b===!0&&(V=1),T===!0&&(V=2),L===!0&&(V=3);let D=h.attributes.position.count*V,U=1;D>e.maxTextureSize&&(U=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const w=new Float32Array(D*U*4*M),O=new ny(w,D,U,M);O.type=ra,O.needsUpdate=!0;const A=V*4;for(let z=0;z<M;z++){const k=y[z],Q=_[z],ct=N[z],q=D*U*4*z;for(let it=0;it<k.count;it++){const F=it*A;b===!0&&(l.fromBufferAttribute(k,it),w[q+F+0]=l.x,w[q+F+1]=l.y,w[q+F+2]=l.z,w[q+F+3]=0),T===!0&&(l.fromBufferAttribute(Q,it),w[q+F+4]=l.x,w[q+F+5]=l.y,w[q+F+6]=l.z,w[q+F+7]=0),L===!0&&(l.fromBufferAttribute(ct,it),w[q+F+8]=l.x,w[q+F+9]=l.y,w[q+F+10]=l.z,w[q+F+11]=ct.itemSize===4?l.w:1)}}x={count:M,texture:O,size:new he(D,U)},s.set(h,x),h.addEventListener("dispose",P)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)p.getUniforms().setValue(o,"morphTexture",d.morphTexture,i);else{let b=0;for(let L=0;L<m.length;L++)b+=m[L];const T=h.morphTargetsRelative?1:1-b;p.getUniforms().setValue(o,"morphTargetBaseInfluence",T),p.getUniforms().setValue(o,"morphTargetInfluences",m)}p.getUniforms().setValue(o,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(o,"morphTargetsTextureSize",x.size)}return{update:f}}function uR(o,e,i,s,l){let f=new WeakMap;function d(m){const v=l.render.frame,M=m.geometry,x=e.get(m,M);if(f.get(x)!==v&&(e.update(x),f.set(x,v)),m.isInstancedMesh&&(m.hasEventListener("dispose",p)===!1&&m.addEventListener("dispose",p),f.get(m)!==v&&(i.update(m.instanceMatrix,o.ARRAY_BUFFER),m.instanceColor!==null&&i.update(m.instanceColor,o.ARRAY_BUFFER),f.set(m,v))),m.isSkinnedMesh){const b=m.skeleton;f.get(b)!==v&&(b.update(),f.set(b,v))}return x}function h(){f=new WeakMap}function p(m){const v=m.target;v.removeEventListener("dispose",p),s.releaseStatesOfObject(v),i.remove(v.instanceMatrix),v.instanceColor!==null&&i.remove(v.instanceColor)}return{update:d,dispose:h}}const fR={[G_]:"LINEAR_TONE_MAPPING",[V_]:"REINHARD_TONE_MAPPING",[k_]:"CINEON_TONE_MAPPING",[$p]:"ACES_FILMIC_TONE_MAPPING",[W_]:"AGX_TONE_MAPPING",[j_]:"NEUTRAL_TONE_MAPPING",[X_]:"CUSTOM_TONE_MAPPING"};function dR(o,e,i,s,l,f){const d=new Vi(e,i,{type:o,depthBuffer:l,stencilBuffer:f,samples:s?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let h=null,p=null;const m=new Pn;m.setAttribute("position",new Sn([-1,3,0,-1,-1,0,3,-1,0],3)),m.setAttribute("uv",new Sn([0,2,0,0,2,0],2));const v=new JE({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),M=new pi(m,v),x=new dm(-1,1,1,-1,0,1);let b=null,T=null,L=!1,y,_=null,N=[],V=!1;this.setSize=function(D,U){d.setSize(D,U),h!==null&&h.setSize(D,U),p!==null&&p.setSize(D,U);for(let w=0;w<N.length;w++){const O=N[w];O.setSize&&O.setSize(D,U)}},this.setEffects=function(D){N=D,V=N.length>0&&N[0].isRenderPass===!0;const U=d.width,w=d.height;N.length>0&&h===null&&(h=new Vi(U,w,{type:fa,depthBuffer:!1,stencilBuffer:!1}),p=new Vi(U,w,{type:fa,depthBuffer:!1,stencilBuffer:!1}));for(let O=0;O<N.length;O++){const A=N[O];A.setSize&&A.setSize(U,w)}},this.begin=function(D,U){if(L||D.toneMapping===la&&N.length===0)return!1;if(_=U,U!==null){const w=U.width,O=U.height;(d.width!==w||d.height!==O)&&this.setSize(w,O)}return V===!1&&D.setRenderTarget(d),y=D.toneMapping,D.toneMapping=la,!0},this.hasRenderPass=function(){return V},this.end=function(D,U){D.toneMapping=y,L=!0;let w=d,O=h;for(let A=0;A<N.length;A++){const P=N[A];P.enabled!==!1&&(P.render(D,O,w,U),P.needsSwap!==!1&&(w=O,O=O===h?p:h))}if(b!==D.outputColorSpace||T!==D.toneMapping){b=D.outputColorSpace,T=D.toneMapping,v.defines={},Be.getTransfer(b)===Ze&&(v.defines.SRGB_TRANSFER="");const A=fR[T];A&&(v.defines[A]=""),v.needsUpdate=!0}v.uniforms.tDiffuse.value=w.texture,D.setRenderTarget(_),D.render(M,x),_=null,L=!1},this.isCompositing=function(){return L},this.dispose=function(){d.dispose(),h!==null&&h.dispose(),p!==null&&p.dispose(),m.dispose(),v.dispose()}}const gy=new qn,Zp=new bl(1,1),xy=new ny,vy=new RE,_y=new oy,m_=[],g_=[],x_=new Float32Array(16),v_=new Float32Array(9),__=new Float32Array(4);function co(o,e,i){const s=o[0];if(s<=0||s>0)return o;const l=e*i;let f=m_[l];if(f===void 0&&(f=new Float32Array(l),m_[l]=f),e!==0){s.toArray(f,0);for(let d=1,h=0;d!==e;++d)h+=i,o[d].toArray(f,h)}return f}function Mn(o,e){if(o.length!==e.length)return!1;for(let i=0,s=o.length;i<s;i++)if(o[i]!==e[i])return!1;return!0}function bn(o,e){for(let i=0,s=e.length;i<s;i++)o[i]=e[i]}function ju(o,e){let i=g_[e];i===void 0&&(i=new Int32Array(e),g_[e]=i);for(let s=0;s!==e;++s)i[s]=o.allocateTextureUnit();return i}function hR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1f(this.addr,e),i[0]=e)}function pR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2fv(this.addr,e),bn(i,e)}}function mR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(o.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Mn(i,e))return;o.uniform3fv(this.addr,e),bn(i,e)}}function gR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4fv(this.addr,e),bn(i,e)}}function xR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix2fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;__.set(s),o.uniformMatrix2fv(this.addr,!1,__),bn(i,s)}}function vR(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix3fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;v_.set(s),o.uniformMatrix3fv(this.addr,!1,v_),bn(i,s)}}function _R(o,e){const i=this.cache,s=e.elements;if(s===void 0){if(Mn(i,e))return;o.uniformMatrix4fv(this.addr,!1,e),bn(i,e)}else{if(Mn(i,s))return;x_.set(s),o.uniformMatrix4fv(this.addr,!1,x_),bn(i,s)}}function yR(o,e){const i=this.cache;i[0]!==e&&(o.uniform1i(this.addr,e),i[0]=e)}function SR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2iv(this.addr,e),bn(i,e)}}function MR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3iv(this.addr,e),bn(i,e)}}function bR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4iv(this.addr,e),bn(i,e)}}function ER(o,e){const i=this.cache;i[0]!==e&&(o.uniform1ui(this.addr,e),i[0]=e)}function TR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(o.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Mn(i,e))return;o.uniform2uiv(this.addr,e),bn(i,e)}}function AR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(o.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Mn(i,e))return;o.uniform3uiv(this.addr,e),bn(i,e)}}function RR(o,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(o.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Mn(i,e))return;o.uniform4uiv(this.addr,e),bn(i,e)}}function CR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l);let f;this.type===o.SAMPLER_2D_SHADOW?(Zp.compareFunction=i.isReversedDepthBuffer()?om:rm,f=Zp):f=gy,i.setTexture2D(e||f,l)}function wR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||vy,l)}function DR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||_y,l)}function NR(o,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(o.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||xy,l)}function UR(o){switch(o){case 5126:return hR;case 35664:return pR;case 35665:return mR;case 35666:return gR;case 35674:return xR;case 35675:return vR;case 35676:return _R;case 5124:case 35670:return yR;case 35667:case 35671:return SR;case 35668:case 35672:return MR;case 35669:case 35673:return bR;case 5125:return ER;case 36294:return TR;case 36295:return AR;case 36296:return RR;case 35678:case 36198:case 36298:case 36306:case 35682:return CR;case 35679:case 36299:case 36307:return wR;case 35680:case 36300:case 36308:case 36293:return DR;case 36289:case 36303:case 36311:case 36292:return NR}}function LR(o,e){o.uniform1fv(this.addr,e)}function OR(o,e){const i=co(e,this.size,2);o.uniform2fv(this.addr,i)}function PR(o,e){const i=co(e,this.size,3);o.uniform3fv(this.addr,i)}function IR(o,e){const i=co(e,this.size,4);o.uniform4fv(this.addr,i)}function zR(o,e){const i=co(e,this.size,4);o.uniformMatrix2fv(this.addr,!1,i)}function BR(o,e){const i=co(e,this.size,9);o.uniformMatrix3fv(this.addr,!1,i)}function FR(o,e){const i=co(e,this.size,16);o.uniformMatrix4fv(this.addr,!1,i)}function HR(o,e){o.uniform1iv(this.addr,e)}function GR(o,e){o.uniform2iv(this.addr,e)}function VR(o,e){o.uniform3iv(this.addr,e)}function kR(o,e){o.uniform4iv(this.addr,e)}function XR(o,e){o.uniform1uiv(this.addr,e)}function WR(o,e){o.uniform2uiv(this.addr,e)}function jR(o,e){o.uniform3uiv(this.addr,e)}function qR(o,e){o.uniform4uiv(this.addr,e)}function YR(o,e,i){const s=this.cache,l=e.length,f=ju(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));let d;this.type===o.SAMPLER_2D_SHADOW?d=Zp:d=gy;for(let h=0;h!==l;++h)i.setTexture2D(e[h]||d,f[h])}function ZR(o,e,i){const s=this.cache,l=e.length,f=ju(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||vy,f[d])}function KR(o,e,i){const s=this.cache,l=e.length,f=ju(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||_y,f[d])}function QR(o,e,i){const s=this.cache,l=e.length,f=ju(i,l);Mn(s,f)||(o.uniform1iv(this.addr,f),bn(s,f));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||xy,f[d])}function JR(o){switch(o){case 5126:return LR;case 35664:return OR;case 35665:return PR;case 35666:return IR;case 35674:return zR;case 35675:return BR;case 35676:return FR;case 5124:case 35670:return HR;case 35667:case 35671:return GR;case 35668:case 35672:return VR;case 35669:case 35673:return kR;case 5125:return XR;case 36294:return WR;case 36295:return jR;case 36296:return qR;case 35678:case 36198:case 36298:case 36306:case 35682:return YR;case 35679:case 36299:case 36307:return ZR;case 35680:case 36300:case 36308:case 36293:return KR;case 36289:case 36303:case 36311:case 36292:return QR}}class $R{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=UR(i.type)}}class tC{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=JR(i.type)}}class eC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let f=0,d=l.length;f!==d;++f){const h=l[f];h.setValue(e,i[h.id],s)}}}const tp=/(\w+)(\])?(\[|\.)?/g;function y_(o,e){o.seq.push(e),o.map[e.id]=e}function nC(o,e,i){const s=o.name,l=s.length;for(tp.lastIndex=0;;){const f=tp.exec(s),d=tp.lastIndex;let h=f[1];const p=f[2]==="]",m=f[3];if(p&&(h=h|0),m===void 0||m==="["&&d+2===l){y_(i,m===void 0?new $R(h,o,e):new tC(h,o,e));break}else{let M=i.map[h];M===void 0&&(M=new eC(h),y_(i,M)),i=M}}}class Nu{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let d=0;d<s;++d){const h=e.getActiveUniform(i,d),p=e.getUniformLocation(i,h.name);nC(h,p,this)}const l=[],f=[];for(const d of this.seq)d.type===e.SAMPLER_2D_SHADOW||d.type===e.SAMPLER_CUBE_SHADOW||d.type===e.SAMPLER_2D_ARRAY_SHADOW?l.push(d):f.push(d);l.length>0&&(this.seq=l.concat(f))}setValue(e,i,s,l){const f=this.map[i];f!==void 0&&f.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let f=0,d=i.length;f!==d;++f){const h=i[f],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,f=e.length;l!==f;++l){const d=e[l];d.id in i&&s.push(d)}return s}}function S_(o,e,i){const s=o.createShader(e);return o.shaderSource(s,i),o.compileShader(s),s}const iC=37297;let aC=0;function sC(o,e){const i=o.split(`
`),s=[],l=Math.max(e-6,0),f=Math.min(e+6,i.length);for(let d=l;d<f;d++){const h=d+1;s.push(`${h===e?">":" "} ${h}: ${i[d]}`)}return s.join(`
`)}const M_=new ye;function rC(o){Be._getMatrix(M_,Be.workingColorSpace,o);const e=`mat3( ${M_.elements.map(i=>i.toFixed(4))} )`;switch(Be.getTransfer(o)){case Iu:return[e,"LinearTransferOETF"];case Ze:return[e,"sRGBTransferOETF"];default:return de("WebGLProgram: Unsupported color space: ",o),[e,"LinearTransferOETF"]}}function b_(o,e,i){const s=o.getShaderParameter(e,o.COMPILE_STATUS),f=(o.getShaderInfoLog(e)||"").trim();if(s&&f==="")return"";const d=/ERROR: 0:(\d+)/.exec(f);if(d){const h=parseInt(d[1]);return i.toUpperCase()+`

`+f+`

`+sC(o.getShaderSource(e),h)}else return f}function oC(o,e){const i=rC(e);return[`vec4 ${o}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}const lC={[G_]:"Linear",[V_]:"Reinhard",[k_]:"Cineon",[$p]:"ACESFilmic",[W_]:"AgX",[j_]:"Neutral",[X_]:"Custom"};function cC(o,e){const i=lC[e];return i===void 0?(de("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+o+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+o+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const bu=new nt;function uC(){Be.getLuminanceCoefficients(bu);const o=bu.x.toFixed(4),e=bu.y.toFixed(4),i=bu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${o}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fC(o){return[o.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",o.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function dC(o){const e=[];for(const i in o){const s=o[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function hC(o,e){const i={},s=o.getProgramParameter(e,o.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const f=o.getActiveAttrib(e,l),d=f.name;let h=1;f.type===o.FLOAT_MAT2&&(h=2),f.type===o.FLOAT_MAT3&&(h=3),f.type===o.FLOAT_MAT4&&(h=4),i[d]={type:f.type,location:o.getAttribLocation(e,d),locationSize:h}}return i}function gl(o){return o!==""}function E_(o,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return o.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function T_(o,e){return o.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Kp(o){return o.replace(pC,gC)}const mC=new Map;function gC(o,e){let i=be[e];if(i===void 0){const s=mC.get(e);if(s!==void 0)i=be[s],de('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Kp(i)}const xC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function A_(o){return o.replace(xC,vC)}function vC(o,e,i,s){let l="";for(let f=parseInt(e);f<parseInt(i);f++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+f+" ]").replace(/UNROLLED_LOOP_INDEX/g,f);return l}function R_(o){let e=`precision ${o.precision} float;
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
#define LOW_PRECISION`),e}const _C={[Tu]:"SHADOWMAP_TYPE_PCF",[ml]:"SHADOWMAP_TYPE_VSM"};function yC(o){return _C[o.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const SC={[Js]:"ENVMAP_TYPE_CUBE",[oo]:"ENVMAP_TYPE_CUBE",[ku]:"ENVMAP_TYPE_CUBE_UV"};function MC(o){return o.envMap===!1?"ENVMAP_TYPE_CUBE":SC[o.envMapMode]||"ENVMAP_TYPE_CUBE"}const bC={[oo]:"ENVMAP_MODE_REFRACTION"};function EC(o){return o.envMap===!1?"ENVMAP_MODE_REFLECTION":bC[o.envMapMode]||"ENVMAP_MODE_REFLECTION"}const TC={[H_]:"ENVMAP_BLENDING_MULTIPLY",[iE]:"ENVMAP_BLENDING_MIX",[aE]:"ENVMAP_BLENDING_ADD"};function AC(o){return o.envMap===!1?"ENVMAP_BLENDING_NONE":TC[o.combine]||"ENVMAP_BLENDING_NONE"}function RC(o){const e=o.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function CC(o,e,i,s){const l=o.getContext(),f=i.defines;let d=i.vertexShader,h=i.fragmentShader;const p=yC(i),m=MC(i),v=EC(i),M=AC(i),x=RC(i),b=fC(i),T=dC(f),L=l.createProgram();let y,_,N=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(y=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),y.length>0&&(y+=`
`),_=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T].filter(gl).join(`
`),_.length>0&&(_+=`
`)):(y=[R_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+v:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexNormals?"#define HAS_NORMAL":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),_=[R_(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,T,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+v:"",i.envMap?"#define "+M:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.retroreflection?"#define USE_RETROREFLECTION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor?"#define USE_COLOR":"",i.vertexAlphas||i.batchingColor?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",i.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==la?"#define TONE_MAPPING":"",i.toneMapping!==la?be.tonemapping_pars_fragment:"",i.toneMapping!==la?cC("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",be.colorspace_pars_fragment,oC("linearToOutputTexel",i.outputColorSpace),uC(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),d=Kp(d),d=E_(d,i),d=T_(d,i),h=Kp(h),h=E_(h,i),h=T_(h,i),d=A_(d),h=A_(h),i.isRawShaderMaterial!==!0&&(N=`#version 300 es
`,y=[b,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,_=["#define varying in",i.glslVersion===Dv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===Dv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);const V=N+y+d,D=N+_+h,U=S_(l,l.VERTEX_SHADER,V),w=S_(l,l.FRAGMENT_SHADER,D);l.attachShader(L,U),l.attachShader(L,w),i.index0AttributeName!==void 0?l.bindAttribLocation(L,0,i.index0AttributeName):i.hasPositionAttribute===!0&&l.bindAttribLocation(L,0,"position"),l.linkProgram(L);function O(k){if(o.debug.checkShaderErrors){const Q=l.getProgramInfoLog(L)||"",ct=l.getShaderInfoLog(U)||"",q=l.getShaderInfoLog(w)||"",it=Q.trim(),F=ct.trim(),X=q.trim();let st=!0,Y=!0;if(l.getProgramParameter(L,l.LINK_STATUS)===!1)if(st=!1,typeof o.debug.onShaderError=="function")o.debug.onShaderError(l,L,U,w);else{const H=b_(l,U,"vertex"),J=b_(l,w,"fragment");He("WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(L,l.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+it+`
`+H+`
`+J)}else it!==""?de("WebGLProgram: Program Info Log:",it):(F===""||X==="")&&(Y=!1);Y&&(k.diagnostics={runnable:st,programLog:it,vertexShader:{log:F,prefix:y},fragmentShader:{log:X,prefix:_}})}l.deleteShader(U),l.deleteShader(w),A=new Nu(l,L),P=hC(l,L)}let A;this.getUniforms=function(){return A===void 0&&O(this),A};let P;this.getAttributes=function(){return P===void 0&&O(this),P};let z=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=l.getProgramParameter(L,iC)),z},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(L),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=aC++,this.cacheKey=e,this.usedTimes=1,this.program=L,this.vertexShader=U,this.fragmentShader=w,this}let wC=0;class DC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,i,s){const l=this._getShaderCacheForMaterial(e);return l.has(i)===!1&&(l.add(i),i.usedTimes++),l.has(s)===!1&&(l.add(s),s.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new NC(e),i.set(e,s)),s}}class NC{constructor(e){this.id=wC++,this.code=e,this.usedTimes=0}}function UC(o){return o===$s||o===Lu||o===Ou}function LC(o,e,i,s,l,f){const d=new cm,h=new DC,p=new Set,m=[],v=new Map,M=s.logarithmicDepthBuffer;let x=s.precision;const b={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(A){return p.add(A),A===0?"uv":`uv${A}`}function L(A,P,z,k,Q,ct){const q=k.fog,it=Q.geometry,F=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?k.environment:null,X=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap,st=e.get(A.envMap||F,X),Y=st&&st.mapping===ku?st.image.height:null,H=b[A.type];A.precision!==null&&(x=s.getMaxPrecision(A.precision),x!==A.precision&&de("WebGLProgram.getParameters:",A.precision,"not supported, using",x,"instead."));const J=it.morphAttributes.position||it.morphAttributes.normal||it.morphAttributes.color,Tt=J!==void 0?J.length:0;let bt=0;it.morphAttributes.position!==void 0&&(bt=1),it.morphAttributes.normal!==void 0&&(bt=2),it.morphAttributes.color!==void 0&&(bt=3);let Zt,Rt,Xt,rt;if(H){const Ie=sa[H];Zt=Ie.vertexShader,Rt=Ie.fragmentShader}else{Zt=A.vertexShader,Rt=A.fragmentShader;const Ie=h.getVertexShaderStage(A),ve=h.getFragmentShaderStage(A);h.update(A,Ie,ve),Xt=Ie.id,rt=ve.id}const mt=o.getRenderTarget(),At=o.state.buffers.depth.getReversed(),Wt=Q.isInstancedMesh===!0,gt=Q.isBatchedMesh===!0,Nt=!!A.map,Ue=!!A.matcap,pe=!!st,le=!!A.aoMap,xe=!!A.lightMap,$t=!!A.bumpMap&&A.wireframe===!1,ae=!!A.normalMap,ue=!!A.displacementMap,Ge=!!A.emissiveMap,at=!!A.metalnessMap,Ct=!!A.roughnessMap,G=A.anisotropy>0,me=A.clearcoat>0,se=A.dispersion>0,I=A.retroreflectivity>0,E=A.iridescence>0,et=A.sheen>0,lt=A.transmission>0,xt=G&&!!A.anisotropyMap,Dt=me&&!!A.clearcoatMap,Ot=me&&!!A.clearcoatNormalMap,vt=me&&!!A.clearcoatRoughnessMap,Mt=E&&!!A.iridescenceMap,Lt=E&&!!A.iridescenceThicknessMap,ie=et&&!!A.sheenColorMap,Ft=et&&!!A.sheenRoughnessMap,Bt=!!A.specularMap,qt=!!A.specularColorMap,oe=!!A.specularIntensityMap,ge=lt&&!!A.transmissionMap,Z=lt&&!!A.thicknessMap,Ut=!!A.gradientMap,St=!!A.alphaMap,Pt=A.alphaTest>0,jt=!!A.alphaHash,Et=!!A.extensions;let ne=la;A.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(ne=o.toneMapping);const kt={shaderID:H,shaderType:A.type,shaderName:A.name,vertexShader:Zt,fragmentShader:Rt,defines:A.defines,customVertexShaderID:Xt,customFragmentShaderID:rt,isRawShaderMaterial:A.isRawShaderMaterial===!0,glslVersion:A.glslVersion,precision:x,batching:gt,batchingColor:gt&&Q._colorsTexture!==null,instancing:Wt,instancingColor:Wt&&Q.instanceColor!==null,instancingMorph:Wt&&Q.morphTexture!==null,outputColorSpace:mt===null?o.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Be.workingColorSpace,alphaToCoverage:!!A.alphaToCoverage,map:Nt,matcap:Ue,envMap:pe,envMapMode:pe&&st.mapping,envMapCubeUVHeight:Y,aoMap:le,lightMap:xe,bumpMap:$t,normalMap:ae,displacementMap:ue,emissiveMap:Ge,normalMapObjectSpace:ae&&A.normalMapType===oE,normalMapTangentSpace:ae&&A.normalMapType===Xp,packedNormalMap:ae&&A.normalMapType===Xp&&UC(A.normalMap.format),metalnessMap:at,roughnessMap:Ct,anisotropy:G,anisotropyMap:xt,clearcoat:me,clearcoatMap:Dt,clearcoatNormalMap:Ot,clearcoatRoughnessMap:vt,dispersion:se,retroreflection:I,iridescence:E,iridescenceMap:Mt,iridescenceThicknessMap:Lt,sheen:et,sheenColorMap:ie,sheenRoughnessMap:Ft,specularMap:Bt,specularColorMap:qt,specularIntensityMap:oe,transmission:lt,transmissionMap:ge,thicknessMap:Z,gradientMap:Ut,opaque:A.transparent===!1&&A.blending===xl&&A.alphaToCoverage===!1,alphaMap:St,alphaTest:Pt,alphaHash:jt,combine:A.combine,mapUv:Nt&&T(A.map.channel),aoMapUv:le&&T(A.aoMap.channel),lightMapUv:xe&&T(A.lightMap.channel),bumpMapUv:$t&&T(A.bumpMap.channel),normalMapUv:ae&&T(A.normalMap.channel),displacementMapUv:ue&&T(A.displacementMap.channel),emissiveMapUv:Ge&&T(A.emissiveMap.channel),metalnessMapUv:at&&T(A.metalnessMap.channel),roughnessMapUv:Ct&&T(A.roughnessMap.channel),anisotropyMapUv:xt&&T(A.anisotropyMap.channel),clearcoatMapUv:Dt&&T(A.clearcoatMap.channel),clearcoatNormalMapUv:Ot&&T(A.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:vt&&T(A.clearcoatRoughnessMap.channel),iridescenceMapUv:Mt&&T(A.iridescenceMap.channel),iridescenceThicknessMapUv:Lt&&T(A.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&T(A.sheenColorMap.channel),sheenRoughnessMapUv:Ft&&T(A.sheenRoughnessMap.channel),specularMapUv:Bt&&T(A.specularMap.channel),specularColorMapUv:qt&&T(A.specularColorMap.channel),specularIntensityMapUv:oe&&T(A.specularIntensityMap.channel),transmissionMapUv:ge&&T(A.transmissionMap.channel),thicknessMapUv:Z&&T(A.thicknessMap.channel),alphaMapUv:St&&T(A.alphaMap.channel),vertexTangents:!!it.attributes.tangent&&(ae||G),vertexNormals:!!it.attributes.normal,vertexColors:A.vertexColors,vertexAlphas:A.vertexColors===!0&&!!it.attributes.color&&it.attributes.color.itemSize===4,pointsUvs:Q.isPoints===!0&&!!it.attributes.uv&&(Nt||St),fog:!!q,useFog:A.fog===!0,fogExp2:!!q&&q.isFogExp2,flatShading:A.wireframe===!1&&(A.flatShading===!0||it.attributes.normal===void 0&&ae===!1&&(A.isMeshLambertMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isMeshPhysicalMaterial)),sizeAttenuation:A.sizeAttenuation===!0,logarithmicDepthBuffer:M,reversedDepthBuffer:At,skinning:Q.isSkinnedMesh===!0,hasPositionAttribute:it.attributes.position!==void 0,morphTargets:it.morphAttributes.position!==void 0,morphNormals:it.morphAttributes.normal!==void 0,morphColors:it.morphAttributes.color!==void 0,morphTargetsCount:Tt,morphTextureStride:bt,numSunLights:P.sun.length,numDirLights:P.directional.length,numPointLights:P.point.length,numSpotLights:P.spot.length,numSpotLightMaps:P.spotLightMap.length,numRectAreaLights:P.rectArea.length,numHemiLights:P.hemi.length,numSunLightShadows:P.sunShadowMap.length,numDirLightShadows:P.directionalShadowMap.length,numPointLightShadows:P.pointShadowMap.length,numSpotLightShadows:P.spotShadowMap.length,numSpotLightShadowsWithMaps:P.numSpotLightShadowsWithMaps,numLightProbes:P.numLightProbes,numLightProbeGrids:ct.length,numClippingPlanes:f.numPlanes,numClipIntersection:f.numIntersection,dithering:A.dithering,shadowMapEnabled:o.shadowMap.enabled&&z.length>0,shadowMapType:o.shadowMap.type,toneMapping:ne,decodeVideoTexture:Nt&&A.map.isVideoTexture===!0&&Be.getTransfer(A.map.colorSpace)===Ze,decodeVideoTextureEmissive:Ge&&A.emissiveMap.isVideoTexture===!0&&Be.getTransfer(A.emissiveMap.colorSpace)===Ze,premultipliedAlpha:A.premultipliedAlpha,doubleSided:A.side===Fi,flipSided:A.side===jn,useDepthPacking:A.depthPacking>=0,depthPacking:A.depthPacking||0,index0AttributeName:A.index0AttributeName,extensionClipCullDistance:Et&&A.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Et&&A.extensions.multiDraw===!0||gt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:A.customProgramCacheKey()};return kt.vertexUv1s=p.has(1),kt.vertexUv2s=p.has(2),kt.vertexUv3s=p.has(3),p.clear(),kt}function y(A){const P=[];if(A.shaderID?P.push(A.shaderID):(P.push(A.customVertexShaderID),P.push(A.customFragmentShaderID)),A.defines!==void 0)for(const z in A.defines)P.push(z),P.push(A.defines[z]);return A.isRawShaderMaterial===!1&&(_(P,A),N(P,A),P.push(o.outputColorSpace)),P.push(A.customProgramCacheKey),P.join()}function _(A,P){A.push(P.precision),A.push(P.outputColorSpace),A.push(P.envMapMode),A.push(P.envMapCubeUVHeight),A.push(P.mapUv),A.push(P.alphaMapUv),A.push(P.lightMapUv),A.push(P.aoMapUv),A.push(P.bumpMapUv),A.push(P.normalMapUv),A.push(P.displacementMapUv),A.push(P.emissiveMapUv),A.push(P.metalnessMapUv),A.push(P.roughnessMapUv),A.push(P.anisotropyMapUv),A.push(P.clearcoatMapUv),A.push(P.clearcoatNormalMapUv),A.push(P.clearcoatRoughnessMapUv),A.push(P.iridescenceMapUv),A.push(P.iridescenceThicknessMapUv),A.push(P.sheenColorMapUv),A.push(P.sheenRoughnessMapUv),A.push(P.specularMapUv),A.push(P.specularColorMapUv),A.push(P.specularIntensityMapUv),A.push(P.transmissionMapUv),A.push(P.thicknessMapUv),A.push(P.combine),A.push(P.fogExp2),A.push(P.sizeAttenuation),A.push(P.morphTargetsCount),A.push(P.morphAttributeCount),A.push(P.numSunLights),A.push(P.numDirLights),A.push(P.numPointLights),A.push(P.numSpotLights),A.push(P.numSpotLightMaps),A.push(P.numHemiLights),A.push(P.numRectAreaLights),A.push(P.numSunLightShadows),A.push(P.numDirLightShadows),A.push(P.numPointLightShadows),A.push(P.numSpotLightShadows),A.push(P.numSpotLightShadowsWithMaps),A.push(P.numLightProbes),A.push(P.shadowMapType),A.push(P.toneMapping),A.push(P.numClippingPlanes),A.push(P.numClipIntersection),A.push(P.depthPacking)}function N(A,P){d.disableAll(),P.instancing&&d.enable(0),P.instancingColor&&d.enable(1),P.instancingMorph&&d.enable(2),P.matcap&&d.enable(3),P.envMap&&d.enable(4),P.normalMapObjectSpace&&d.enable(5),P.normalMapTangentSpace&&d.enable(6),P.clearcoat&&d.enable(7),P.iridescence&&d.enable(8),P.alphaTest&&d.enable(9),P.vertexColors&&d.enable(10),P.vertexAlphas&&d.enable(11),P.vertexUv1s&&d.enable(12),P.vertexUv2s&&d.enable(13),P.vertexUv3s&&d.enable(14),P.vertexTangents&&d.enable(15),P.anisotropy&&d.enable(16),P.alphaHash&&d.enable(17),P.batching&&d.enable(18),P.dispersion&&d.enable(19),P.retroreflection&&d.enable(24),P.batchingColor&&d.enable(20),P.gradientMap&&d.enable(21),P.packedNormalMap&&d.enable(22),P.vertexNormals&&d.enable(23),A.push(d.mask),d.disableAll(),P.fog&&d.enable(0),P.useFog&&d.enable(1),P.flatShading&&d.enable(2),P.logarithmicDepthBuffer&&d.enable(3),P.reversedDepthBuffer&&d.enable(4),P.skinning&&d.enable(5),P.morphTargets&&d.enable(6),P.morphNormals&&d.enable(7),P.morphColors&&d.enable(8),P.premultipliedAlpha&&d.enable(9),P.shadowMapEnabled&&d.enable(10),P.doubleSided&&d.enable(11),P.flipSided&&d.enable(12),P.useDepthPacking&&d.enable(13),P.dithering&&d.enable(14),P.transmission&&d.enable(15),P.sheen&&d.enable(16),P.opaque&&d.enable(17),P.pointsUvs&&d.enable(18),P.decodeVideoTexture&&d.enable(19),P.decodeVideoTextureEmissive&&d.enable(20),P.alphaToCoverage&&d.enable(21),P.numLightProbeGrids>0&&d.enable(22),P.hasPositionAttribute&&d.enable(23),A.push(d.mask)}function V(A){const P=b[A.type];let z;if(P){const k=sa[P];z=ZE.clone(k.uniforms)}else z=A.uniforms;return z}function D(A,P){let z=v.get(P);return z!==void 0?++z.usedTimes:(z=new CC(o,P,A,l),m.push(z),v.set(P,z)),z}function U(A){if(--A.usedTimes===0){const P=m.indexOf(A);m[P]=m[m.length-1],m.pop(),v.delete(A.cacheKey),A.destroy()}}function w(A){h.remove(A)}function O(){h.dispose()}return{getParameters:L,getProgramCacheKey:y,getUniforms:V,acquireProgram:D,releaseProgram:U,releaseShaderCache:w,programs:m,dispose:O}}function OC(){let o=new WeakMap;function e(d){return o.has(d)}function i(d){let h=o.get(d);return h===void 0&&(h={},o.set(d,h)),h}function s(d){o.delete(d)}function l(d,h,p){o.get(d)[h]=p}function f(){o=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:f}}function PC(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.material.id!==e.material.id?o.material.id-e.material.id:o.materialVariant!==e.materialVariant?o.materialVariant-e.materialVariant:o.z!==e.z?o.z-e.z:o.id-e.id}function C_(o,e){return o.groupOrder!==e.groupOrder?o.groupOrder-e.groupOrder:o.renderOrder!==e.renderOrder?o.renderOrder-e.renderOrder:o.z!==e.z?e.z-o.z:o.id-e.id}function w_(){const o=[];let e=0;const i=[],s=[],l=[];function f(){e=0,i.length=0,s.length=0,l.length=0}function d(x){let b=0;return x.isInstancedMesh&&(b+=2),x.isSkinnedMesh&&(b+=1),b}function h(x,b,T,L,y,_){let N=o[e];return N===void 0?(N={id:x.id,object:x,geometry:b,material:T,materialVariant:d(x),groupOrder:L,renderOrder:x.renderOrder,z:y,group:_},o[e]=N):(N.id=x.id,N.object=x,N.geometry=b,N.material=T,N.materialVariant=d(x),N.groupOrder=L,N.renderOrder=x.renderOrder,N.z=y,N.group=_),e++,N}function p(x,b,T,L,y,_,N){N.reversedDepth===!0&&(y=-y);const V=h(x,b,T,L,y,_);T.transmission>0?s.push(V):T.transparent===!0?l.push(V):i.push(V)}function m(x,b,T,L,y,_){const N=h(x,b,T,L,y,_);T.transmission>0?s.unshift(N):T.transparent===!0?l.unshift(N):i.unshift(N)}function v(x,b){i.length>1&&i.sort(x||PC),s.length>1&&s.sort(b||C_),l.length>1&&l.sort(b||C_)}function M(){for(let x=e,b=o.length;x<b;x++){const T=o[x];if(T.id===null)break;T.id=null,T.object=null,T.geometry=null,T.material=null,T.group=null}}return{opaque:i,transmissive:s,transparent:l,init:f,push:p,unshift:m,finish:M,sort:v}}function IC(){let o=new WeakMap;function e(s,l){const f=o.get(s);let d;return f===void 0?(d=new w_,o.set(s,[d])):l>=f.length?(d=new w_,f.push(d)):d=f[l],d}function i(){o=new WeakMap}return{get:e,dispose:i}}function zC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={direction:new nt,color:new Re};break;case"SpotLight":i={position:new nt,direction:new nt,color:new Re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new nt,color:new Re,distance:0,decay:0};break;case"HemisphereLight":i={direction:new nt,skyColor:new Re,groundColor:new Re};break;case"RectAreaLight":i={color:new Re,position:new nt,halfWidth:new nt,halfHeight:new nt};break}return o[e.id]=i,i}}}function BC(){const o={};return{get:function(e){if(o[e.id]!==void 0)return o[e.id];let i;switch(e.type){case"SunLight":case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return o[e.id]=i,i}}}let FC=0;function HC(o,e){return(e.castShadow?2:0)-(o.castShadow?2:0)+(e.map?1:0)-(o.map?1:0)}function GC(o){const e=new zC,i=BC(),s={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new nt);const l=new nt,f=new an,d=new an;function h(m){let v=0,M=0,x=0;for(let Q=0;Q<9;Q++)s.probe[Q].set(0,0,0);let b=0,T=0,L=0,y=0,_=0,N=0,V=0,D=0,U=0,w=0,O=0,A=0,P=0,z=0;m.sort(HC);for(let Q=0,ct=m.length;Q<ct;Q++){const q=m[Q],it=q.color,F=q.intensity,X=q.distance;let st=null;if(q.shadow&&q.shadow.map&&(q.shadow.map.texture.format===$s?st=q.shadow.map.texture:st=q.shadow.map.depthTexture||q.shadow.map.texture),q.isAmbientLight)v+=it.r*F,M+=it.g*F,x+=it.b*F;else if(q.isLightProbe){for(let Y=0;Y<9;Y++)s.probe[Y].addScaledVector(q.sh.coefficients[Y],F);z++}else if(q.isSunLight){const Y=e.get(q);if(Y.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){const H=q.shadow,J=i.get(q);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize.copy(H.mapSize).multiply(H.getFrameExtents()),s.sunShadow[T]=J,s.sunShadowMap[T]=st;const Tt=H.getViewportCount();for(let bt=0;bt<Tt;bt++)s.sunShadowMatrix[L+bt]=H.getMatrix(bt),s.sunShadowCascade[L+bt]=H._cascadeData[bt];L+=Tt,T++}s.sun[b]=Y,b++}else if(q.isDirectionalLight){const Y=e.get(q);if(Y.color.copy(q.color).multiplyScalar(q.intensity),q.castShadow){const H=q.shadow,J=i.get(q);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,s.directionalShadow[y]=J,s.directionalShadowMap[y]=st,s.directionalShadowMatrix[y]=q.shadow.matrix,U++}s.directional[y]=Y,y++}else if(q.isSpotLight){const Y=e.get(q);Y.position.setFromMatrixPosition(q.matrixWorld),Y.color.copy(it).multiplyScalar(F),Y.distance=X,Y.coneCos=Math.cos(q.angle),Y.penumbraCos=Math.cos(q.angle*(1-q.penumbra)),Y.decay=q.decay,s.spot[N]=Y;const H=q.shadow;if(q.map&&(s.spotLightMap[A]=q.map,A++,H.updateMatrices(q),q.castShadow&&P++),s.spotLightMatrix[N]=H.matrix,q.castShadow){const J=i.get(q);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,s.spotShadow[N]=J,s.spotShadowMap[N]=st,O++}N++}else if(q.isRectAreaLight){const Y=e.get(q);Y.color.copy(it).multiplyScalar(F),Y.halfWidth.set(q.width*.5,0,0),Y.halfHeight.set(0,q.height*.5,0),s.rectArea[V]=Y,V++}else if(q.isPointLight){const Y=e.get(q);if(Y.color.copy(q.color).multiplyScalar(q.intensity),Y.distance=q.distance,Y.decay=q.decay,q.castShadow){const H=q.shadow,J=i.get(q);J.shadowIntensity=H.intensity,J.shadowBias=H.bias,J.shadowNormalBias=H.normalBias,J.shadowRadius=H.radius,J.shadowMapSize=H.mapSize,J.shadowCameraNear=H.camera.near,J.shadowCameraFar=H.camera.far,s.pointShadow[_]=J,s.pointShadowMap[_]=st,s.pointShadowMatrix[_]=q.shadow.matrix,w++}s.point[_]=Y,_++}else if(q.isHemisphereLight){const Y=e.get(q);Y.skyColor.copy(q.color).multiplyScalar(F),Y.groundColor.copy(q.groundColor).multiplyScalar(F),s.hemi[D]=Y,D++}}V>0&&(o.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Vt.LTC_FLOAT_1,s.rectAreaLTC2=Vt.LTC_FLOAT_2):(s.rectAreaLTC1=Vt.LTC_HALF_1,s.rectAreaLTC2=Vt.LTC_HALF_2)),s.ambient[0]=v,s.ambient[1]=M,s.ambient[2]=x;const k=s.hash;(k.sunLength!==b||k.directionalLength!==y||k.pointLength!==_||k.spotLength!==N||k.rectAreaLength!==V||k.hemiLength!==D||k.numSunShadows!==T||k.numDirectionalShadows!==U||k.numPointShadows!==w||k.numSpotShadows!==O||k.numSpotMaps!==A||k.numLightProbes!==z)&&(s.sun.length=b,s.directional.length=y,s.spot.length=N,s.rectArea.length=V,s.point.length=_,s.hemi.length=D,s.sunShadow.length=T,s.sunShadowMap.length=T,s.sunShadowMatrix.length=L,s.sunShadowCascade.length=L,s.directionalShadow.length=U,s.directionalShadowMap.length=U,s.directionalShadowMatrix.length=U,s.pointShadow.length=w,s.pointShadowMap.length=w,s.pointShadowMatrix.length=w,s.spotShadow.length=O,s.spotShadowMap.length=O,s.spotLightMatrix.length=O+A-P,s.spotLightMap.length=A,s.numSpotLightShadowsWithMaps=P,s.numLightProbes=z,k.sunLength=b,k.directionalLength=y,k.pointLength=_,k.spotLength=N,k.rectAreaLength=V,k.hemiLength=D,k.numSunShadows=T,k.numDirectionalShadows=U,k.numPointShadows=w,k.numSpotShadows=O,k.numSpotMaps=A,k.numLightProbes=z,s.version=FC++)}function p(m,v){let M=0,x=0,b=0,T=0,L=0,y=0;const _=v.matrixWorldInverse;for(let N=0,V=m.length;N<V;N++){const D=m[N];if(D.isSunLight){const U=s.sun[M];U.direction.setFromMatrixPosition(D.matrixWorld),U.direction.transformDirection(_),M++}else if(D.isDirectionalLight){const U=s.directional[x];U.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(_),x++}else if(D.isSpotLight){const U=s.spot[T];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(_),U.direction.setFromMatrixPosition(D.matrixWorld),l.setFromMatrixPosition(D.target.matrixWorld),U.direction.sub(l),U.direction.transformDirection(_),T++}else if(D.isRectAreaLight){const U=s.rectArea[L];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(_),d.identity(),f.copy(D.matrixWorld),f.premultiply(_),d.extractRotation(f),U.halfWidth.set(D.width*.5,0,0),U.halfHeight.set(0,D.height*.5,0),U.halfWidth.applyMatrix4(d),U.halfHeight.applyMatrix4(d),L++}else if(D.isPointLight){const U=s.point[b];U.position.setFromMatrixPosition(D.matrixWorld),U.position.applyMatrix4(_),b++}else if(D.isHemisphereLight){const U=s.hemi[y];U.direction.setFromMatrixPosition(D.matrixWorld),U.direction.transformDirection(_),y++}}}return{setup:h,setupView:p,state:s}}function D_(o){const e=new GC(o),i=[],s=[],l=[];function f(x){M.camera=x,i.length=0,s.length=0,l.length=0}function d(x){i.push(x)}function h(x){s.push(x)}function p(x){l.push(x)}function m(){e.setup(i)}function v(x){e.setupView(i,x)}const M={lightsArray:i,shadowsArray:s,lightProbeGridArray:l,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:f,state:M,setupLights:m,setupLightsView:v,pushLight:d,pushShadow:h,pushLightProbeGrid:p}}function VC(o){let e=new WeakMap;function i(l,f=0){const d=e.get(l);let h;return d===void 0?(h=new D_(o),e.set(l,[h])):f>=d.length?(h=new D_(o),d.push(h)):h=d[f],h}function s(){e=new WeakMap}return{get:i,dispose:s}}const kC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XC=`uniform sampler2D shadow_pass;
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
}`,WC=[new nt(1,0,0),new nt(-1,0,0),new nt(0,1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1)],jC=[new nt(0,-1,0),new nt(0,-1,0),new nt(0,0,1),new nt(0,0,-1),new nt(0,-1,0),new nt(0,-1,0)],N_=new an,pl=new nt,ep=new nt;function qC(o,e,i){let s=new fm;const l=new he,f=new he,d=new on,h=new t1,p=new e1,m={},v=i.maxTextureSize,M={[Qs]:jn,[jn]:Qs,[Fi]:Fi},x=new da({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:kC,fragmentShader:XC}),b=x.clone();b.defines.HORIZONTAL_PASS=1;const T=new Pn;T.setAttribute("position",new ca(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const L=new pi(T,x),y=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Tu;let _=this.type;this.render=function(w,O,A){if(y.enabled===!1||y.autoUpdate===!1&&y.needsUpdate===!1||w.length===0)return;this.type===Bb&&(de("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Tu);const P=o.getRenderTarget(),z=o.getActiveCubeFace(),k=o.getActiveMipmapLevel(),Q=o.state;Q.setBlending(Pa),Q.buffers.depth.getReversed()===!0?Q.buffers.color.setClear(0,0,0,0):Q.buffers.color.setClear(1,1,1,1),Q.buffers.depth.setTest(!0),Q.setScissorTest(!1);const ct=_!==this.type;ct&&O.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(it=>it.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,it=w.length;q<it;q++){const F=w[q],X=F.shadow;if(X===void 0){de("WebGLShadowMap:",F,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;l.copy(X.mapSize);const st=X.getFrameExtents();l.multiply(st),f.copy(X.mapSize),(l.x>v||l.y>v)&&(l.x>v&&(f.x=Math.floor(v/st.x),l.x=f.x*st.x,X.mapSize.x=f.x),l.y>v&&(f.y=Math.floor(v/st.y),l.y=f.y*st.y,X.mapSize.y=f.y));const Y=o.state.buffers.depth.getReversed();if(X.camera._reversedDepth=Y,X.map===null||ct===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===ml){if(F.isPointLight){de("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new Vi(l.x,l.y,{format:$s,type:fa,minFilter:Fn,magFilter:Fn,generateMipmaps:!1}),X.map.texture.name=F.name+".shadowMap",X.map.depthTexture=new bl(l.x,l.y,ra),X.map.depthTexture.name=F.name+".shadowMapDepth",X.map.depthTexture.format=za,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On}else F.isPointLight?(X.map=new my(l.x),X.map.depthTexture=new qE(l.x,ua)):(X.map=new Vi(l.x,l.y),X.map.depthTexture=new bl(l.x,l.y,ua)),X.map.depthTexture.name=F.name+".shadowMap",X.map.depthTexture.format=za,this.type===Tu?(X.map.depthTexture.compareFunction=Y?om:rm,X.map.depthTexture.minFilter=Fn,X.map.depthTexture.magFilter=Fn):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=On,X.map.depthTexture.magFilter=On);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==l.x||X.map.height!==l.y)&&X.map.setSize(l.x,l.y);const H=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();F.isPointLight!==!0&&X.updateMatrices(F,A);for(let J=0;J<H;J++){const Tt=X.getCamera(J);if(F.isPointLight){const bt=X.camera,Zt=X.matrix,Rt=F.distance||bt.far;Rt!==bt.far&&(bt.far=Rt,bt.updateProjectionMatrix()),pl.setFromMatrixPosition(F.matrixWorld),bt.position.copy(pl),ep.copy(bt.position),ep.add(WC[J]),bt.up.copy(jC[J]),bt.lookAt(ep),bt.updateMatrixWorld(),Zt.makeTranslation(-pl.x,-pl.y,-pl.z),N_.multiplyMatrices(bt.projectionMatrix,bt.matrixWorldInverse),X._frustum.setFromProjectionMatrix(N_,bt.coordinateSystem,bt.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)o.setRenderTarget(X.map,J),o.clear();else{J===0&&(o.setRenderTarget(X.map),o.clear());const bt=X.getViewport(J);d.set(f.x*bt.x,f.y*bt.y,f.x*bt.z,f.y*bt.w),Q.viewport(d)}s=X.getFrustum(J),D(O,A,Tt,F,this.type)}X.isPointLightShadow!==!0&&this.type===ml&&N(X,A),X.needsUpdate=!1}_=this.type,y.needsUpdate=!1,o.setRenderTarget(P,z,k)};function N(w,O){const A=e.update(L);x.defines.VSM_SAMPLES!==w.blurSamples&&(x.defines.VSM_SAMPLES=w.blurSamples,b.defines.VSM_SAMPLES=w.blurSamples,x.needsUpdate=!0,b.needsUpdate=!0),w.mapPass===null?w.mapPass=new Vi(l.x,l.y,{format:$s,type:fa}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),x.uniforms.shadow_pass.value=w.map.depthTexture,x.uniforms.resolution.value.set(w.map.width,w.map.height),x.uniforms.radius.value=w.radius,o.setRenderTarget(w.mapPass),o.clear(),o.renderBufferDirect(O,null,A,x,L,null),b.uniforms.shadow_pass.value=w.mapPass.texture,b.uniforms.resolution.value.set(w.map.width,w.map.height),b.uniforms.radius.value=w.radius,o.setRenderTarget(w.map),o.clear(),o.renderBufferDirect(O,null,A,b,L,null)}function V(w,O,A,P){let z=null;const k=A.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(k!==void 0)z=k;else if(z=A.isPointLight===!0?p:h,o.localClippingEnabled&&O.clipShadows===!0&&Array.isArray(O.clippingPlanes)&&O.clippingPlanes.length!==0||O.displacementMap&&O.displacementScale!==0||O.alphaMap&&O.alphaTest>0||O.map&&O.alphaTest>0||O.alphaToCoverage===!0){const Q=z.uuid,ct=O.uuid;let q=m[Q];q===void 0&&(q={},m[Q]=q);let it=q[ct];it===void 0&&(it=z.clone(),q[ct]=it,O.addEventListener("dispose",U)),z=it}if(z.visible=O.visible,z.wireframe=O.wireframe,P===ml?z.side=O.shadowSide!==null?O.shadowSide:O.side:z.side=O.shadowSide!==null?O.shadowSide:M[O.side],z.alphaMap=O.alphaMap,z.alphaTest=O.alphaToCoverage===!0?.5:O.alphaTest,z.map=O.map,z.clipShadows=O.clipShadows,z.clippingPlanes=O.clippingPlanes,z.clipIntersection=O.clipIntersection,z.displacementMap=O.displacementMap,z.displacementScale=O.displacementScale,z.displacementBias=O.displacementBias,z.wireframeLinewidth=O.wireframeLinewidth,z.linewidth=O.linewidth,A.isPointLight===!0&&z.isMeshDistanceMaterial===!0){const Q=o.properties.get(z);Q.light=A}return z}function D(w,O,A,P,z){if(w.visible===!1)return;if(w.layers.test(O.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&z===ml)&&(!w.frustumCulled||w.intersectsFrustum(s))){w.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,w.matrixWorld);const ct=e.update(w),q=w.material;if(Array.isArray(q)){const it=ct.groups;for(let F=0,X=it.length;F<X;F++){const st=it[F],Y=q[st.materialIndex];if(Y&&Y.visible){const H=V(w,Y,P,z);w.onBeforeShadow(o,w,O,A,ct,H,st),o.renderBufferDirect(A,null,ct,H,w,st),w.onAfterShadow(o,w,O,A,ct,H,st)}}}else if(q.visible){const it=V(w,q,P,z);w.onBeforeShadow(o,w,O,A,ct,it,null),o.renderBufferDirect(A,null,ct,it,w,null),w.onAfterShadow(o,w,O,A,ct,it,null)}}const Q=w.children;for(let ct=0,q=Q.length;ct<q;ct++)D(Q[ct],O,A,P,z)}function U(w){w.target.removeEventListener("dispose",U);for(const A in m){const P=m[A],z=w.target.uuid;z in P&&(P[z].dispose(),delete P[z])}}}function YC(o,e){function i(){let Z=!1;const Ut=new on;let St=null;const Pt=new on(0,0,0,0);return{setMask:function(jt){St!==jt&&!Z&&(o.colorMask(jt,jt,jt,jt),St=jt)},setLocked:function(jt){Z=jt},setClear:function(jt,Et,ne,kt,Ie){Ie===!0&&(jt*=kt,Et*=kt,ne*=kt),Ut.set(jt,Et,ne,kt),Pt.equals(Ut)===!1&&(o.clearColor(jt,Et,ne,kt),Pt.copy(Ut))},reset:function(){Z=!1,St=null,Pt.set(-1,0,0,0)}}}function s(){let Z=!1,Ut=!1,St=null,Pt=null,jt=null;return{setReversed:function(Et){if(Ut!==Et){const ne=e.get("EXT_clip_control");Et?ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.ZERO_TO_ONE_EXT):ne.clipControlEXT(ne.LOWER_LEFT_EXT,ne.NEGATIVE_ONE_TO_ONE_EXT),Ut=Et;const kt=jt;jt=null,this.setClear(kt)}},getReversed:function(){return Ut},setTest:function(Et){Et?mt(o.DEPTH_TEST):At(o.DEPTH_TEST)},setMask:function(Et){St!==Et&&!Z&&(o.depthMask(Et),St=Et)},setFunc:function(Et){if(Ut&&(Et=_E[Et]),Pt!==Et){switch(Et){case sp:o.depthFunc(o.NEVER);break;case rp:o.depthFunc(o.ALWAYS);break;case op:o.depthFunc(o.LESS);break;case _l:o.depthFunc(o.LEQUAL);break;case lp:o.depthFunc(o.EQUAL);break;case cp:o.depthFunc(o.GEQUAL);break;case up:o.depthFunc(o.GREATER);break;case fp:o.depthFunc(o.NOTEQUAL);break;default:o.depthFunc(o.LEQUAL)}Pt=Et}},setLocked:function(Et){Z=Et},setClear:function(Et){jt!==Et&&(jt=Et,Ut&&(Et=1-Et),o.clearDepth(Et))},reset:function(){Z=!1,St=null,Pt=null,jt=null,Ut=!1}}}function l(){let Z=!1,Ut=null,St=null,Pt=null,jt=null,Et=null,ne=null,kt=null,Ie=null;return{setTest:function(ve){Z||(ve?mt(o.STENCIL_TEST):At(o.STENCIL_TEST))},setMask:function(ve){Ut!==ve&&!Z&&(o.stencilMask(ve),Ut=ve)},setFunc:function(ve,ei,gi){(St!==ve||Pt!==ei||jt!==gi)&&(o.stencilFunc(ve,ei,gi),St=ve,Pt=ei,jt=gi)},setOp:function(ve,ei,gi){(Et!==ve||ne!==ei||kt!==gi)&&(o.stencilOp(ve,ei,gi),Et=ve,ne=ei,kt=gi)},setLocked:function(ve){Z=ve},setClear:function(ve){Ie!==ve&&(o.clearStencil(ve),Ie=ve)},reset:function(){Z=!1,Ut=null,St=null,Pt=null,jt=null,Et=null,ne=null,kt=null,Ie=null}}}const f=new i,d=new s,h=new l,p=new WeakMap,m=new WeakMap;let v={},M={},x={},b=new WeakMap,T=[],L=null,y=!1,_=null,N=null,V=null,D=null,U=null,w=null,O=null,A=new Re(0,0,0),P=0,z=!1,k=null,Q=null,ct=null,q=null,it=null;const F=o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,st=0;const Y=o.getParameter(o.VERSION);Y.indexOf("WebGL")!==-1?(st=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=st>=1):Y.indexOf("OpenGL ES")!==-1&&(st=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=st>=2);let H=null,J={};const Tt=o.getParameter(o.SCISSOR_BOX),bt=o.getParameter(o.VIEWPORT),Zt=new on().fromArray(Tt),Rt=new on().fromArray(bt);function Xt(Z,Ut,St,Pt){const jt=new Uint8Array(4),Et=o.createTexture();o.bindTexture(Z,Et),o.texParameteri(Z,o.TEXTURE_MIN_FILTER,o.NEAREST),o.texParameteri(Z,o.TEXTURE_MAG_FILTER,o.NEAREST);for(let ne=0;ne<St;ne++)Z===o.TEXTURE_3D||Z===o.TEXTURE_2D_ARRAY?o.texImage3D(Ut,0,o.RGBA,1,1,Pt,0,o.RGBA,o.UNSIGNED_BYTE,jt):o.texImage2D(Ut+ne,0,o.RGBA,1,1,0,o.RGBA,o.UNSIGNED_BYTE,jt);return Et}const rt={};rt[o.TEXTURE_2D]=Xt(o.TEXTURE_2D,o.TEXTURE_2D,1),rt[o.TEXTURE_CUBE_MAP]=Xt(o.TEXTURE_CUBE_MAP,o.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[o.TEXTURE_2D_ARRAY]=Xt(o.TEXTURE_2D_ARRAY,o.TEXTURE_2D_ARRAY,1,1),rt[o.TEXTURE_3D]=Xt(o.TEXTURE_3D,o.TEXTURE_3D,1,1),f.setClear(0,0,0,1),d.setClear(1),h.setClear(0),mt(o.DEPTH_TEST),d.setFunc(_l),$t(!1),ae(Av),mt(o.CULL_FACE),le(Pa);function mt(Z){v[Z]!==!0&&(o.enable(Z),v[Z]=!0)}function At(Z){v[Z]!==!1&&(o.disable(Z),v[Z]=!1)}function Wt(Z,Ut){return x[Z]!==Ut?(o.bindFramebuffer(Z,Ut),x[Z]=Ut,Z===o.DRAW_FRAMEBUFFER&&(x[o.FRAMEBUFFER]=Ut),Z===o.FRAMEBUFFER&&(x[o.DRAW_FRAMEBUFFER]=Ut),!0):!1}function gt(Z,Ut){let St=T,Pt=!1;if(Z){St=b.get(Ut),St===void 0&&(St=[],b.set(Ut,St));const jt=Z.textures;if(St.length!==jt.length||St[0]!==o.COLOR_ATTACHMENT0){for(let Et=0,ne=jt.length;Et<ne;Et++)St[Et]=o.COLOR_ATTACHMENT0+Et;St.length=jt.length,Pt=!0}}else St[0]!==o.BACK&&(St[0]=o.BACK,Pt=!0);Pt&&o.drawBuffers(St)}function Nt(Z){return L!==Z?(o.useProgram(Z),L=Z,!0):!1}const Ue={[eo]:o.FUNC_ADD,[Hb]:o.FUNC_SUBTRACT,[Gb]:o.FUNC_REVERSE_SUBTRACT};Ue[Vb]=o.MIN,Ue[kb]=o.MAX;const pe={[Xb]:o.ZERO,[Wb]:o.ONE,[jb]:o.SRC_COLOR,[B_]:o.SRC_ALPHA,[Jb]:o.SRC_ALPHA_SATURATE,[Kb]:o.DST_COLOR,[Yb]:o.DST_ALPHA,[qb]:o.ONE_MINUS_SRC_COLOR,[F_]:o.ONE_MINUS_SRC_ALPHA,[Qb]:o.ONE_MINUS_DST_COLOR,[Zb]:o.ONE_MINUS_DST_ALPHA,[$b]:o.CONSTANT_COLOR,[tE]:o.ONE_MINUS_CONSTANT_COLOR,[eE]:o.CONSTANT_ALPHA,[nE]:o.ONE_MINUS_CONSTANT_ALPHA};function le(Z,Ut,St,Pt,jt,Et,ne,kt,Ie,ve){if(Z===Pa){y===!0&&(At(o.BLEND),y=!1);return}if(y===!1&&(mt(o.BLEND),y=!0),Z!==Fb){if(Z!==_||ve!==z){if((N!==eo||U!==eo)&&(o.blendEquation(o.FUNC_ADD),N=eo,U=eo),ve)switch(Z){case xl:o.blendFuncSeparate(o.ONE,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Rv:o.blendFunc(o.ONE,o.ONE);break;case Cv:o.blendFuncSeparate(o.ZERO,o.ONE_MINUS_SRC_COLOR,o.ZERO,o.ONE);break;case wv:o.blendFuncSeparate(o.DST_COLOR,o.ONE_MINUS_SRC_ALPHA,o.ZERO,o.ONE);break;default:He("WebGLState: Invalid blending: ",Z);break}else switch(Z){case xl:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE_MINUS_SRC_ALPHA,o.ONE,o.ONE_MINUS_SRC_ALPHA);break;case Rv:o.blendFuncSeparate(o.SRC_ALPHA,o.ONE,o.ONE,o.ONE);break;case Cv:He("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wv:He("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:He("WebGLState: Invalid blending: ",Z);break}V=null,D=null,w=null,O=null,A.set(0,0,0),P=0,_=Z,z=ve}return}jt=jt||Ut,Et=Et||St,ne=ne||Pt,(Ut!==N||jt!==U)&&(o.blendEquationSeparate(Ue[Ut],Ue[jt]),N=Ut,U=jt),(St!==V||Pt!==D||Et!==w||ne!==O)&&(o.blendFuncSeparate(pe[St],pe[Pt],pe[Et],pe[ne]),V=St,D=Pt,w=Et,O=ne),(kt.equals(A)===!1||Ie!==P)&&(o.blendColor(kt.r,kt.g,kt.b,Ie),A.copy(kt),P=Ie),_=Z,z=!1}function xe(Z,Ut){Z.side===Fi?At(o.CULL_FACE):mt(o.CULL_FACE);let St=Z.side===jn;Ut&&(St=!St),$t(St),Z.blending===xl&&Z.transparent===!1?le(Pa):le(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),d.setFunc(Z.depthFunc),d.setTest(Z.depthTest),d.setMask(Z.depthWrite),f.setMask(Z.colorWrite);const Pt=Z.stencilWrite;h.setTest(Pt),Pt&&(h.setMask(Z.stencilWriteMask),h.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),h.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),Ge(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?mt(o.SAMPLE_ALPHA_TO_COVERAGE):At(o.SAMPLE_ALPHA_TO_COVERAGE)}function $t(Z){k!==Z&&(Z?o.frontFace(o.CW):o.frontFace(o.CCW),k=Z)}function ae(Z){Z!==Ib?(mt(o.CULL_FACE),Z!==Q&&(Z===Av?o.cullFace(o.BACK):Z===zb?o.cullFace(o.FRONT):o.cullFace(o.FRONT_AND_BACK))):At(o.CULL_FACE),Q=Z}function ue(Z){Z!==ct&&(X&&o.lineWidth(Z),ct=Z)}function Ge(Z,Ut,St){Z?(mt(o.POLYGON_OFFSET_FILL),(q!==Ut||it!==St)&&(q=Ut,it=St,d.getReversed()&&(Ut=-Ut),o.polygonOffset(Ut,St))):At(o.POLYGON_OFFSET_FILL)}function at(Z){Z?mt(o.SCISSOR_TEST):At(o.SCISSOR_TEST)}function Ct(Z){Z===void 0&&(Z=o.TEXTURE0+F-1),H!==Z&&(o.activeTexture(Z),H=Z)}function G(Z,Ut,St){St===void 0&&(H===null?St=o.TEXTURE0+F-1:St=H);let Pt=J[St];Pt===void 0&&(Pt={type:void 0,texture:void 0},J[St]=Pt),(Pt.type!==Z||Pt.texture!==Ut)&&(H!==St&&(o.activeTexture(St),H=St),o.bindTexture(Z,Ut||rt[Z]),Pt.type=Z,Pt.texture=Ut)}function me(){const Z=J[H];Z!==void 0&&Z.type!==void 0&&(o.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function se(){try{o.compressedTexImage2D(...arguments)}catch(Z){He("WebGLState:",Z)}}function I(){try{o.compressedTexImage3D(...arguments)}catch(Z){He("WebGLState:",Z)}}function E(){try{o.texSubImage2D(...arguments)}catch(Z){He("WebGLState:",Z)}}function et(){try{o.texSubImage3D(...arguments)}catch(Z){He("WebGLState:",Z)}}function lt(){try{o.compressedTexSubImage2D(...arguments)}catch(Z){He("WebGLState:",Z)}}function xt(){try{o.compressedTexSubImage3D(...arguments)}catch(Z){He("WebGLState:",Z)}}function Dt(){try{o.texStorage2D(...arguments)}catch(Z){He("WebGLState:",Z)}}function Ot(){try{o.texStorage3D(...arguments)}catch(Z){He("WebGLState:",Z)}}function vt(){try{o.texImage2D(...arguments)}catch(Z){He("WebGLState:",Z)}}function Mt(){try{o.texImage3D(...arguments)}catch(Z){He("WebGLState:",Z)}}function Lt(Z){return M[Z]!==void 0?M[Z]:o.getParameter(Z)}function ie(Z,Ut){M[Z]!==Ut&&(o.pixelStorei(Z,Ut),M[Z]=Ut)}function Ft(Z){Zt.equals(Z)===!1&&(o.scissor(Z.x,Z.y,Z.z,Z.w),Zt.copy(Z))}function Bt(Z){Rt.equals(Z)===!1&&(o.viewport(Z.x,Z.y,Z.z,Z.w),Rt.copy(Z))}function qt(Z,Ut){let St=m.get(Ut);St===void 0&&(St=new WeakMap,m.set(Ut,St));let Pt=St.get(Z);Pt===void 0&&(Pt=o.getUniformBlockIndex(Ut,Z.name),St.set(Z,Pt))}function oe(Z,Ut){const Pt=m.get(Ut).get(Z);p.get(Ut)!==Pt&&(o.uniformBlockBinding(Ut,Pt,Z.__bindingPointIndex),p.set(Ut,Pt))}function ge(){o.disable(o.BLEND),o.disable(o.CULL_FACE),o.disable(o.DEPTH_TEST),o.disable(o.POLYGON_OFFSET_FILL),o.disable(o.SCISSOR_TEST),o.disable(o.STENCIL_TEST),o.disable(o.SAMPLE_ALPHA_TO_COVERAGE),o.blendEquation(o.FUNC_ADD),o.blendFunc(o.ONE,o.ZERO),o.blendFuncSeparate(o.ONE,o.ZERO,o.ONE,o.ZERO),o.blendColor(0,0,0,0),o.colorMask(!0,!0,!0,!0),o.clearColor(0,0,0,0),o.depthMask(!0),o.depthFunc(o.LESS),d.setReversed(!1),o.clearDepth(1),o.stencilMask(4294967295),o.stencilFunc(o.ALWAYS,0,4294967295),o.stencilOp(o.KEEP,o.KEEP,o.KEEP),o.clearStencil(0),o.cullFace(o.BACK),o.frontFace(o.CCW),o.polygonOffset(0,0),o.activeTexture(o.TEXTURE0),o.bindFramebuffer(o.FRAMEBUFFER,null),o.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),o.bindFramebuffer(o.READ_FRAMEBUFFER,null),o.useProgram(null),o.lineWidth(1),o.scissor(0,0,o.canvas.width,o.canvas.height),o.viewport(0,0,o.canvas.width,o.canvas.height),o.pixelStorei(o.PACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_ALIGNMENT,4),o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,!1),o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,o.BROWSER_DEFAULT_WEBGL),o.pixelStorei(o.PACK_ROW_LENGTH,0),o.pixelStorei(o.PACK_SKIP_PIXELS,0),o.pixelStorei(o.PACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_ROW_LENGTH,0),o.pixelStorei(o.UNPACK_IMAGE_HEIGHT,0),o.pixelStorei(o.UNPACK_SKIP_PIXELS,0),o.pixelStorei(o.UNPACK_SKIP_ROWS,0),o.pixelStorei(o.UNPACK_SKIP_IMAGES,0),v={},M={},H=null,J={},x={},b=new WeakMap,T=[],L=null,y=!1,_=null,N=null,V=null,D=null,U=null,w=null,O=null,A=new Re(0,0,0),P=0,z=!1,k=null,Q=null,ct=null,q=null,it=null,Zt.set(0,0,o.canvas.width,o.canvas.height),Rt.set(0,0,o.canvas.width,o.canvas.height),f.reset(),d.reset(),h.reset()}return{buffers:{color:f,depth:d,stencil:h},enable:mt,disable:At,bindFramebuffer:Wt,drawBuffers:gt,useProgram:Nt,setBlending:le,setMaterial:xe,setFlipSided:$t,setCullFace:ae,setLineWidth:ue,setPolygonOffset:Ge,setScissorTest:at,activeTexture:Ct,bindTexture:G,unbindTexture:me,compressedTexImage2D:se,compressedTexImage3D:I,texImage2D:vt,texImage3D:Mt,pixelStorei:ie,getParameter:Lt,updateUBOMapping:qt,uniformBlockBinding:oe,texStorage2D:Dt,texStorage3D:Ot,texSubImage2D:E,texSubImage3D:et,compressedTexSubImage2D:lt,compressedTexSubImage3D:xt,scissor:Ft,viewport:Bt,reset:ge}}function ZC(o,e,i,s,l,f,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new he,v=new WeakMap,M=new Set;let x;const b=new WeakMap;let T=!1;try{T=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function L(I,E){return T?new OffscreenCanvas(I,E):zu("canvas")}function y(I,E,et){let lt=1;const xt=se(I);if((xt.width>et||xt.height>et)&&(lt=et/Math.max(xt.width,xt.height)),lt<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){const Dt=Math.floor(lt*xt.width),Ot=Math.floor(lt*xt.height);x===void 0&&(x=L(Dt,Ot));const vt=E?L(Dt,Ot):x;return vt.width=Dt,vt.height=Ot,vt.getContext("2d").drawImage(I,0,0,Dt,Ot),de("WebGLRenderer: Texture has been resized from ("+xt.width+"x"+xt.height+") to ("+Dt+"x"+Ot+")."),vt}else return"data"in I&&de("WebGLRenderer: Image in DataTexture is too big ("+xt.width+"x"+xt.height+")."),I;return I}function _(I){return I.generateMipmaps}function N(I){o.generateMipmap(I)}function V(I){return I.isWebGLCubeRenderTarget?o.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?o.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?o.TEXTURE_2D_ARRAY:o.TEXTURE_2D}function D(I,E,et,lt,xt,Dt=!1){if(I!==null){if(o[I]!==void 0)return o[I];de("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let Ot;lt&&(Ot=e.get("EXT_texture_norm16"),Ot||de("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let vt=E;if(E===o.RED&&(et===o.FLOAT&&(vt=o.R32F),et===o.HALF_FLOAT&&(vt=o.R16F),et===o.UNSIGNED_BYTE&&(vt=o.R8),et===o.UNSIGNED_SHORT&&Ot&&(vt=Ot.R16_EXT),et===o.SHORT&&Ot&&(vt=Ot.R16_SNORM_EXT)),E===o.RED_INTEGER&&(et===o.UNSIGNED_BYTE&&(vt=o.R8UI),et===o.UNSIGNED_SHORT&&(vt=o.R16UI),et===o.UNSIGNED_INT&&(vt=o.R32UI),et===o.BYTE&&(vt=o.R8I),et===o.SHORT&&(vt=o.R16I),et===o.INT&&(vt=o.R32I)),E===o.RG&&(et===o.FLOAT&&(vt=o.RG32F),et===o.HALF_FLOAT&&(vt=o.RG16F),et===o.UNSIGNED_BYTE&&(vt=o.RG8),et===o.UNSIGNED_SHORT&&Ot&&(vt=Ot.RG16_EXT),et===o.SHORT&&Ot&&(vt=Ot.RG16_SNORM_EXT)),E===o.RG_INTEGER&&(et===o.UNSIGNED_BYTE&&(vt=o.RG8UI),et===o.UNSIGNED_SHORT&&(vt=o.RG16UI),et===o.UNSIGNED_INT&&(vt=o.RG32UI),et===o.BYTE&&(vt=o.RG8I),et===o.SHORT&&(vt=o.RG16I),et===o.INT&&(vt=o.RG32I)),E===o.RGB_INTEGER&&(et===o.UNSIGNED_BYTE&&(vt=o.RGB8UI),et===o.UNSIGNED_SHORT&&(vt=o.RGB16UI),et===o.UNSIGNED_INT&&(vt=o.RGB32UI),et===o.BYTE&&(vt=o.RGB8I),et===o.SHORT&&(vt=o.RGB16I),et===o.INT&&(vt=o.RGB32I)),E===o.RGBA_INTEGER&&(et===o.UNSIGNED_BYTE&&(vt=o.RGBA8UI),et===o.UNSIGNED_SHORT&&(vt=o.RGBA16UI),et===o.UNSIGNED_INT&&(vt=o.RGBA32UI),et===o.BYTE&&(vt=o.RGBA8I),et===o.SHORT&&(vt=o.RGBA16I),et===o.INT&&(vt=o.RGBA32I)),E===o.RGB&&(et===o.UNSIGNED_SHORT&&Ot&&(vt=Ot.RGB16_EXT),et===o.SHORT&&Ot&&(vt=Ot.RGB16_SNORM_EXT),et===o.UNSIGNED_INT_5_9_9_9_REV&&(vt=o.RGB9_E5),et===o.UNSIGNED_INT_10F_11F_11F_REV&&(vt=o.R11F_G11F_B10F)),E===o.RGBA){const Mt=Dt?Iu:Be.getTransfer(xt);et===o.FLOAT&&(vt=o.RGBA32F),et===o.HALF_FLOAT&&(vt=o.RGBA16F),et===o.UNSIGNED_BYTE&&(vt=Mt===Ze?o.SRGB8_ALPHA8:o.RGBA8),et===o.UNSIGNED_SHORT&&Ot&&(vt=Ot.RGBA16_EXT),et===o.SHORT&&Ot&&(vt=Ot.RGBA16_SNORM_EXT),et===o.UNSIGNED_SHORT_4_4_4_4&&(vt=o.RGBA4),et===o.UNSIGNED_SHORT_5_5_5_1&&(vt=o.RGB5_A1)}return(vt===o.R16F||vt===o.R32F||vt===o.RG16F||vt===o.RG32F||vt===o.RGBA16F||vt===o.RGBA32F)&&e.get("EXT_color_buffer_float"),vt}function U(I,E){let et;return I?E===null||E===ua||E===Sl?et=o.DEPTH24_STENCIL8:E===ra?et=o.DEPTH32F_STENCIL8:E===yl&&(et=o.DEPTH24_STENCIL8,de("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):E===null||E===ua||E===Sl?et=o.DEPTH_COMPONENT24:E===ra?et=o.DEPTH_COMPONENT32F:E===yl&&(et=o.DEPTH_COMPONENT16),et}function w(I,E){return _(I)===!0||I.isFramebufferTexture&&I.minFilter!==On&&I.minFilter!==Fn?Math.log2(Math.max(E.width,E.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?E.mipmaps.length:1}function O(I){const E=I.target;E.removeEventListener("dispose",O),P(E),E.isVideoTexture&&v.delete(E),E.isHTMLTexture&&M.delete(E)}function A(I){const E=I.target;E.removeEventListener("dispose",A),k(E)}function P(I){const E=s.get(I);if(E.__webglInit===void 0)return;const et=I.source,lt=b.get(et);if(lt){const xt=lt[E.__cacheKey];xt.usedTimes--,xt.usedTimes===0&&z(I),Object.keys(lt).length===0&&b.delete(et)}s.remove(I)}function z(I){const E=s.get(I);o.deleteTexture(E.__webglTexture);const et=I.source,lt=b.get(et);delete lt[E.__cacheKey],d.memory.textures--}function k(I){const E=s.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),s.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let lt=0;lt<6;lt++){if(Array.isArray(E.__webglFramebuffer[lt]))for(let xt=0;xt<E.__webglFramebuffer[lt].length;xt++)o.deleteFramebuffer(E.__webglFramebuffer[lt][xt]);else o.deleteFramebuffer(E.__webglFramebuffer[lt]);E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer[lt])}else{if(Array.isArray(E.__webglFramebuffer))for(let lt=0;lt<E.__webglFramebuffer.length;lt++)o.deleteFramebuffer(E.__webglFramebuffer[lt]);else o.deleteFramebuffer(E.__webglFramebuffer);if(E.__webglDepthbuffer&&o.deleteRenderbuffer(E.__webglDepthbuffer),E.__webglMultisampledFramebuffer&&o.deleteFramebuffer(E.__webglMultisampledFramebuffer),E.__webglColorRenderbuffer)for(let lt=0;lt<E.__webglColorRenderbuffer.length;lt++)E.__webglColorRenderbuffer[lt]&&o.deleteRenderbuffer(E.__webglColorRenderbuffer[lt]);E.__webglDepthRenderbuffer&&o.deleteRenderbuffer(E.__webglDepthRenderbuffer)}const et=I.textures;for(let lt=0,xt=et.length;lt<xt;lt++){const Dt=s.get(et[lt]);Dt.__webglTexture&&(o.deleteTexture(Dt.__webglTexture),d.memory.textures--),s.remove(et[lt])}s.remove(I)}let Q=0;function ct(){Q=0}function q(){return Q}function it(I){Q=I}function F(){const I=Q;return I>=l.maxTextures&&de("WebGLTextures: Trying to use "+(I+1)+" texture units while this GPU supports only "+l.maxTextures),Q+=1,I}function X(I){const E=[];return E.push(I.wrapS),E.push(I.wrapT),E.push(I.wrapR||0),E.push(I.magFilter),E.push(I.minFilter),E.push(I.anisotropy),E.push(I.internalFormat),E.push(I.format),E.push(I.type),E.push(I.generateMipmaps),E.push(I.premultiplyAlpha),E.push(I.flipY),E.push(I.unpackAlignment),E.push(I.colorSpace),E.join()}function st(I,E){const et=s.get(I);if(I.isVideoTexture&&G(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&et.__version!==I.version){const lt=I.image;if(lt===null)de("WebGLRenderer: Texture marked for update but no image data found.");else if(lt.complete===!1)de("WebGLRenderer: Texture marked for update but image is incomplete");else{At(et,I,E);return}}else I.isExternalTexture&&(et.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(o.TEXTURE_2D,et.__webglTexture,o.TEXTURE0+E)}function Y(I,E){const et=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&et.__version!==I.version){At(et,I,E);return}else I.isExternalTexture&&(et.__webglTexture=I.sourceTexture?I.sourceTexture:null);i.bindTexture(o.TEXTURE_2D_ARRAY,et.__webglTexture,o.TEXTURE0+E)}function H(I,E){const et=s.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&et.__version!==I.version){At(et,I,E);return}i.bindTexture(o.TEXTURE_3D,et.__webglTexture,o.TEXTURE0+E)}function J(I,E){const et=s.get(I);if(I.isCubeDepthTexture!==!0&&I.version>0&&et.__version!==I.version){Wt(et,I,E);return}i.bindTexture(o.TEXTURE_CUBE_MAP,et.__webglTexture,o.TEXTURE0+E)}const Tt={[dp]:o.REPEAT,[Oa]:o.CLAMP_TO_EDGE,[hp]:o.MIRRORED_REPEAT},bt={[On]:o.NEAREST,[sE]:o.NEAREST_MIPMAP_NEAREST,[Qc]:o.NEAREST_MIPMAP_LINEAR,[Fn]:o.LINEAR,[Th]:o.LINEAR_MIPMAP_NEAREST,[Zs]:o.LINEAR_MIPMAP_LINEAR},Zt={[cE]:o.NEVER,[pE]:o.ALWAYS,[uE]:o.LESS,[rm]:o.LEQUAL,[fE]:o.EQUAL,[om]:o.GEQUAL,[dE]:o.GREATER,[hE]:o.NOTEQUAL};function Rt(I,E){if(E.type===ra&&e.has("OES_texture_float_linear")===!1&&(E.magFilter===Fn||E.magFilter===Th||E.magFilter===Qc||E.magFilter===Zs||E.minFilter===Fn||E.minFilter===Th||E.minFilter===Qc||E.minFilter===Zs)&&de("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),o.texParameteri(I,o.TEXTURE_WRAP_S,Tt[E.wrapS]),o.texParameteri(I,o.TEXTURE_WRAP_T,Tt[E.wrapT]),(I===o.TEXTURE_3D||I===o.TEXTURE_2D_ARRAY)&&o.texParameteri(I,o.TEXTURE_WRAP_R,Tt[E.wrapR]),o.texParameteri(I,o.TEXTURE_MAG_FILTER,bt[E.magFilter]),o.texParameteri(I,o.TEXTURE_MIN_FILTER,bt[E.minFilter]),E.compareFunction&&(o.texParameteri(I,o.TEXTURE_COMPARE_MODE,o.COMPARE_REF_TO_TEXTURE),o.texParameteri(I,o.TEXTURE_COMPARE_FUNC,Zt[E.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(E.magFilter===On||E.minFilter!==Qc&&E.minFilter!==Zs||E.type===ra&&e.has("OES_texture_float_linear")===!1)return;if(E.anisotropy>1||s.get(E).__currentAnisotropy){const et=e.get("EXT_texture_filter_anisotropic");o.texParameterf(I,et.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(E.anisotropy,l.getMaxAnisotropy())),s.get(E).__currentAnisotropy=E.anisotropy}}}function Xt(I,E){let et=!1;I.__webglInit===void 0&&(I.__webglInit=!0,E.addEventListener("dispose",O));const lt=E.source;let xt=b.get(lt);xt===void 0&&(xt={},b.set(lt,xt));const Dt=X(E);if(Dt!==I.__cacheKey){xt[Dt]===void 0&&(xt[Dt]={texture:o.createTexture(),usedTimes:0},d.memory.textures++,et=!0),xt[Dt].usedTimes++;const Ot=xt[I.__cacheKey];Ot!==void 0&&(xt[I.__cacheKey].usedTimes--,Ot.usedTimes===0&&z(E)),I.__cacheKey=Dt,I.__webglTexture=xt[Dt].texture}return et}function rt(I,E,et){return Math.floor(Math.floor(I/et)/E)}function mt(I,E,et,lt){const Dt=I.updateRanges;if(Dt.length===0)i.texSubImage2D(o.TEXTURE_2D,0,0,0,E.width,E.height,et,lt,E.data);else{Dt.sort((ie,Ft)=>ie.start-Ft.start);let Ot=0;for(let ie=1;ie<Dt.length;ie++){const Ft=Dt[Ot],Bt=Dt[ie],qt=Ft.start+Ft.count,oe=rt(Bt.start,E.width,4),ge=rt(Ft.start,E.width,4);Bt.start<=qt+1&&oe===ge&&rt(Bt.start+Bt.count-1,E.width,4)===oe?Ft.count=Math.max(Ft.count,Bt.start+Bt.count-Ft.start):(++Ot,Dt[Ot]=Bt)}Dt.length=Ot+1;const vt=i.getParameter(o.UNPACK_ROW_LENGTH),Mt=i.getParameter(o.UNPACK_SKIP_PIXELS),Lt=i.getParameter(o.UNPACK_SKIP_ROWS);i.pixelStorei(o.UNPACK_ROW_LENGTH,E.width);for(let ie=0,Ft=Dt.length;ie<Ft;ie++){const Bt=Dt[ie],qt=Math.floor(Bt.start/4),oe=Math.ceil(Bt.count/4),ge=qt%E.width,Z=Math.floor(qt/E.width),Ut=oe,St=1;i.pixelStorei(o.UNPACK_SKIP_PIXELS,ge),i.pixelStorei(o.UNPACK_SKIP_ROWS,Z),i.texSubImage2D(o.TEXTURE_2D,0,ge,Z,Ut,St,et,lt,E.data)}I.clearUpdateRanges(),i.pixelStorei(o.UNPACK_ROW_LENGTH,vt),i.pixelStorei(o.UNPACK_SKIP_PIXELS,Mt),i.pixelStorei(o.UNPACK_SKIP_ROWS,Lt)}}function At(I,E,et){let lt=o.TEXTURE_2D;(E.isDataArrayTexture||E.isCompressedArrayTexture)&&(lt=o.TEXTURE_2D_ARRAY),E.isData3DTexture&&(lt=o.TEXTURE_3D);const xt=Xt(I,E),Dt=E.source;i.bindTexture(lt,I.__webglTexture,o.TEXTURE0+et);const Ot=s.get(Dt);if(Dt.version!==Ot.__version||xt===!0){if(i.activeTexture(o.TEXTURE0+et),(typeof ImageBitmap<"u"&&E.image instanceof ImageBitmap)===!1){const St=Be.getPrimaries(Be.workingColorSpace),Pt=E.colorSpace===xs?null:Be.getPrimaries(E.colorSpace),jt=E.colorSpace===xs||St===Pt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,jt)}i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment);let Mt=y(E.image,!1,l.maxTextureSize);Mt=me(E,Mt);const Lt=f.convert(E.format,E.colorSpace),ie=f.convert(E.type);let Ft=D(E.internalFormat,Lt,ie,E.normalized,E.colorSpace,E.isVideoTexture);Rt(lt,E);let Bt;const qt=E.mipmaps,oe=E.isVideoTexture!==!0,ge=Ot.__version===void 0||xt===!0,Z=Dt.dataReady,Ut=w(E,Mt);if(E.isDepthTexture)Ft=U(E.format===Ks,E.type),ge&&(oe?i.texStorage2D(o.TEXTURE_2D,1,Ft,Mt.width,Mt.height):i.texImage2D(o.TEXTURE_2D,0,Ft,Mt.width,Mt.height,0,Lt,ie,null));else if(E.isDataTexture)if(qt.length>0){oe&&ge&&i.texStorage2D(o.TEXTURE_2D,Ut,Ft,qt[0].width,qt[0].height);for(let St=0,Pt=qt.length;St<Pt;St++)Bt=qt[St],oe?Z&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Bt.width,Bt.height,Lt,ie,Bt.data):i.texImage2D(o.TEXTURE_2D,St,Ft,Bt.width,Bt.height,0,Lt,ie,Bt.data);E.generateMipmaps=!1}else oe?(ge&&i.texStorage2D(o.TEXTURE_2D,Ut,Ft,Mt.width,Mt.height),Z&&mt(E,Mt,Lt,ie)):i.texImage2D(o.TEXTURE_2D,0,Ft,Mt.width,Mt.height,0,Lt,ie,Mt.data);else if(E.isCompressedTexture)if(E.isCompressedArrayTexture){oe&&ge&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ut,Ft,qt[0].width,qt[0].height,Mt.depth);for(let St=0,Pt=qt.length;St<Pt;St++)if(Bt=qt[St],E.format!==Gi)if(Lt!==null)if(oe){if(Z)if(E.layerUpdates.size>0){const jt=c_(Bt.width,Bt.height,E.format,E.type);for(const Et of E.layerUpdates){const ne=Bt.data.subarray(Et*jt/Bt.data.BYTES_PER_ELEMENT,(Et+1)*jt/Bt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,Et,Bt.width,Bt.height,1,Lt,ne)}}else i.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,Bt.width,Bt.height,Mt.depth,Lt,Bt.data)}else i.compressedTexImage3D(o.TEXTURE_2D_ARRAY,St,Ft,Bt.width,Bt.height,Mt.depth,0,Bt.data,0,0);else de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else oe?Z&&i.texSubImage3D(o.TEXTURE_2D_ARRAY,St,0,0,0,Bt.width,Bt.height,Mt.depth,Lt,ie,Bt.data):i.texImage3D(o.TEXTURE_2D_ARRAY,St,Ft,Bt.width,Bt.height,Mt.depth,0,Lt,ie,Bt.data);E.layerUpdates.size>0&&E.clearLayerUpdates()}else{oe&&ge&&i.texStorage2D(o.TEXTURE_2D,Ut,Ft,qt[0].width,qt[0].height);for(let St=0,Pt=qt.length;St<Pt;St++)Bt=qt[St],E.format!==Gi?Lt!==null?oe?Z&&i.compressedTexSubImage2D(o.TEXTURE_2D,St,0,0,Bt.width,Bt.height,Lt,Bt.data):i.compressedTexImage2D(o.TEXTURE_2D,St,Ft,Bt.width,Bt.height,0,Bt.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):oe?Z&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Bt.width,Bt.height,Lt,ie,Bt.data):i.texImage2D(o.TEXTURE_2D,St,Ft,Bt.width,Bt.height,0,Lt,ie,Bt.data)}else if(E.isDataArrayTexture)if(oe){if(ge&&i.texStorage3D(o.TEXTURE_2D_ARRAY,Ut,Ft,Mt.width,Mt.height,Mt.depth),Z)if(E.layerUpdates.size>0){const St=c_(Mt.width,Mt.height,E.format,E.type);for(const Pt of E.layerUpdates){const jt=Mt.data.subarray(Pt*St/Mt.data.BYTES_PER_ELEMENT,(Pt+1)*St/Mt.data.BYTES_PER_ELEMENT);i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,Pt,Mt.width,Mt.height,1,Lt,ie,jt)}E.clearLayerUpdates()}else i.texSubImage3D(o.TEXTURE_2D_ARRAY,0,0,0,0,Mt.width,Mt.height,Mt.depth,Lt,ie,Mt.data)}else i.texImage3D(o.TEXTURE_2D_ARRAY,0,Ft,Mt.width,Mt.height,Mt.depth,0,Lt,ie,Mt.data);else if(E.isData3DTexture)oe?(ge&&i.texStorage3D(o.TEXTURE_3D,Ut,Ft,Mt.width,Mt.height,Mt.depth),Z&&i.texSubImage3D(o.TEXTURE_3D,0,0,0,0,Mt.width,Mt.height,Mt.depth,Lt,ie,Mt.data)):i.texImage3D(o.TEXTURE_3D,0,Ft,Mt.width,Mt.height,Mt.depth,0,Lt,ie,Mt.data);else if(E.isFramebufferTexture){if(ge)if(oe)i.texStorage2D(o.TEXTURE_2D,Ut,Ft,Mt.width,Mt.height);else{let St=Mt.width,Pt=Mt.height;for(let jt=0;jt<Ut;jt++)i.texImage2D(o.TEXTURE_2D,jt,Ft,St,Pt,0,Lt,ie,null),St>>=1,Pt>>=1}}else if(E.isHTMLTexture){if("texElementImage2D"in o){const St=o.canvas;if(St.hasAttribute("layoutsubtree")||St.setAttribute("layoutsubtree","true"),Mt.parentNode!==St){St.appendChild(Mt),M.add(E),St.onpaint=Pt=>{const jt=Pt.changedElements;for(const Et of M)jt.includes(Et.image)&&(Et.needsUpdate=!0)},St.requestPaint();return}if(o.texElementImage2D.length===3)o.texElementImage2D(o.TEXTURE_2D,o.RGBA8,Mt);else{const jt=o.RGBA,Et=o.RGBA,ne=o.UNSIGNED_BYTE;o.texElementImage2D(o.TEXTURE_2D,0,jt,Et,ne,Mt)}o.texParameteri(o.TEXTURE_2D,o.TEXTURE_MIN_FILTER,o.LINEAR),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_S,o.CLAMP_TO_EDGE),o.texParameteri(o.TEXTURE_2D,o.TEXTURE_WRAP_T,o.CLAMP_TO_EDGE)}}else if(qt.length>0){if(oe&&ge){const St=se(qt[0]);i.texStorage2D(o.TEXTURE_2D,Ut,Ft,St.width,St.height)}for(let St=0,Pt=qt.length;St<Pt;St++)Bt=qt[St],oe?Z&&i.texSubImage2D(o.TEXTURE_2D,St,0,0,Lt,ie,Bt):i.texImage2D(o.TEXTURE_2D,St,Ft,Lt,ie,Bt);E.generateMipmaps=!1}else if(oe){if(ge){const St=se(Mt);i.texStorage2D(o.TEXTURE_2D,Ut,Ft,St.width,St.height)}Z&&i.texSubImage2D(o.TEXTURE_2D,0,0,0,Lt,ie,Mt)}else i.texImage2D(o.TEXTURE_2D,0,Ft,Lt,ie,Mt);_(E)&&N(lt),Ot.__version=Dt.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function Wt(I,E,et){if(E.image.length!==6)return;const lt=Xt(I,E),xt=E.source;i.bindTexture(o.TEXTURE_CUBE_MAP,I.__webglTexture,o.TEXTURE0+et);const Dt=s.get(xt);if(xt.version!==Dt.__version||lt===!0){i.activeTexture(o.TEXTURE0+et);const Ot=Be.getPrimaries(Be.workingColorSpace),vt=E.colorSpace===xs?null:Be.getPrimaries(E.colorSpace),Mt=E.colorSpace===xs||Ot===vt?o.NONE:o.BROWSER_DEFAULT_WEBGL;i.pixelStorei(o.UNPACK_FLIP_Y_WEBGL,E.flipY),i.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),i.pixelStorei(o.UNPACK_ALIGNMENT,E.unpackAlignment),i.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL,Mt);const Lt=E.isCompressedTexture||E.image[0].isCompressedTexture,ie=E.image[0]&&E.image[0].isDataTexture,Ft=[];for(let Et=0;Et<6;Et++)!Lt&&!ie?Ft[Et]=y(E.image[Et],!0,l.maxCubemapSize):Ft[Et]=ie?E.image[Et].image:E.image[Et],Ft[Et]=me(E,Ft[Et]);const Bt=Ft[0],qt=f.convert(E.format,E.colorSpace),oe=f.convert(E.type),ge=D(E.internalFormat,qt,oe,E.normalized,E.colorSpace),Z=E.isVideoTexture!==!0,Ut=Dt.__version===void 0||lt===!0,St=xt.dataReady;let Pt=w(E,Bt);Rt(o.TEXTURE_CUBE_MAP,E);let jt;if(Lt){Z&&Ut&&i.texStorage2D(o.TEXTURE_CUBE_MAP,Pt,ge,Bt.width,Bt.height);for(let Et=0;Et<6;Et++){jt=Ft[Et].mipmaps;for(let ne=0;ne<jt.length;ne++){const kt=jt[ne];E.format!==Gi?qt!==null?Z?St&&i.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne,0,0,kt.width,kt.height,qt,kt.data):i.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne,ge,kt.width,kt.height,0,kt.data):de("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Z?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne,0,0,kt.width,kt.height,qt,oe,kt.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne,ge,kt.width,kt.height,0,qt,oe,kt.data)}}}else{if(jt=E.mipmaps,Z&&Ut){jt.length>0&&Pt++;const Et=se(Ft[0]);i.texStorage2D(o.TEXTURE_CUBE_MAP,Pt,ge,Et.width,Et.height)}for(let Et=0;Et<6;Et++)if(ie){Z?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,Ft[Et].width,Ft[Et].height,qt,oe,Ft[Et].data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,ge,Ft[Et].width,Ft[Et].height,0,qt,oe,Ft[Et].data);for(let ne=0;ne<jt.length;ne++){const Ie=jt[ne].image[Et].image;Z?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne+1,0,0,Ie.width,Ie.height,qt,oe,Ie.data):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne+1,ge,Ie.width,Ie.height,0,qt,oe,Ie.data)}}else{Z?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,0,0,qt,oe,Ft[Et]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,0,ge,qt,oe,Ft[Et]);for(let ne=0;ne<jt.length;ne++){const kt=jt[ne];Z?St&&i.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne+1,0,0,qt,oe,kt.image[Et]):i.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Et,ne+1,ge,qt,oe,kt.image[Et])}}}_(E)&&N(o.TEXTURE_CUBE_MAP),Dt.__version=xt.version,E.onUpdate&&E.onUpdate(E)}I.__version=E.version}function gt(I,E,et,lt,xt,Dt){const Ot=f.convert(et.format,et.colorSpace),vt=f.convert(et.type),Mt=D(et.internalFormat,Ot,vt,et.normalized,et.colorSpace),Lt=s.get(E),ie=s.get(et);if(ie.__renderTarget=E,!Lt.__hasExternalTextures){const Ft=Math.max(1,E.width>>Dt),Bt=Math.max(1,E.height>>Dt);xt===o.TEXTURE_3D||xt===o.TEXTURE_2D_ARRAY?i.texImage3D(xt,Dt,Mt,Ft,Bt,E.depth,0,Ot,vt,null):i.texImage2D(xt,Dt,Mt,Ft,Bt,0,Ot,vt,null)}i.bindFramebuffer(o.FRAMEBUFFER,I),Ct(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,lt,xt,ie.__webglTexture,0,at(E)):(xt===o.TEXTURE_2D||xt>=o.TEXTURE_CUBE_MAP_POSITIVE_X&&xt<=o.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&o.framebufferTexture2D(o.FRAMEBUFFER,lt,xt,ie.__webglTexture,Dt),i.bindFramebuffer(o.FRAMEBUFFER,null)}function Nt(I,E,et){if(o.bindRenderbuffer(o.RENDERBUFFER,I),E.depthBuffer){const lt=E.depthTexture,xt=lt&&lt.isDepthTexture?lt.type:null,Dt=U(E.stencilBuffer,xt),Ot=E.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;Ct(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,at(E),Dt,E.width,E.height):et?o.renderbufferStorageMultisample(o.RENDERBUFFER,at(E),Dt,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Dt,E.width,E.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,Ot,o.RENDERBUFFER,I)}else{const lt=E.textures;for(let xt=0;xt<lt.length;xt++){const Dt=lt[xt],Ot=f.convert(Dt.format,Dt.colorSpace),vt=f.convert(Dt.type),Mt=D(Dt.internalFormat,Ot,vt,Dt.normalized,Dt.colorSpace);Ct(E)?h.renderbufferStorageMultisampleEXT(o.RENDERBUFFER,at(E),Mt,E.width,E.height):et?o.renderbufferStorageMultisample(o.RENDERBUFFER,at(E),Mt,E.width,E.height):o.renderbufferStorage(o.RENDERBUFFER,Mt,E.width,E.height)}}o.bindRenderbuffer(o.RENDERBUFFER,null)}function Ue(I,E,et){const lt=E.isWebGLCubeRenderTarget===!0;if(i.bindFramebuffer(o.FRAMEBUFFER,I),!(E.depthTexture&&E.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const xt=s.get(E.depthTexture);if(xt.__renderTarget=E,(!xt.__webglTexture||E.depthTexture.image.width!==E.width||E.depthTexture.image.height!==E.height)&&(E.depthTexture.image.width=E.width,E.depthTexture.image.height=E.height,E.depthTexture.needsUpdate=!0),lt){if(xt.__webglInit===void 0&&(xt.__webglInit=!0,E.depthTexture.addEventListener("dispose",O)),xt.__webglTexture===void 0){xt.__webglTexture=o.createTexture(),i.bindTexture(o.TEXTURE_CUBE_MAP,xt.__webglTexture),Rt(o.TEXTURE_CUBE_MAP,E.depthTexture);const Lt=f.convert(E.depthTexture.format),ie=f.convert(E.depthTexture.type);let Ft;E.depthTexture.format===za?Ft=o.DEPTH_COMPONENT24:E.depthTexture.format===Ks&&(Ft=o.DEPTH24_STENCIL8);for(let Bt=0;Bt<6;Bt++)o.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X+Bt,0,Ft,E.width,E.height,0,Lt,ie,null)}}else st(E.depthTexture,0);const Dt=xt.__webglTexture,Ot=at(E),vt=lt?o.TEXTURE_CUBE_MAP_POSITIVE_X+et:o.TEXTURE_2D,Mt=E.depthTexture.format===Ks?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;if(E.depthTexture.format===za)Ct(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Mt,vt,Dt,0,Ot):o.framebufferTexture2D(o.FRAMEBUFFER,Mt,vt,Dt,0);else if(E.depthTexture.format===Ks)Ct(E)?h.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER,Mt,vt,Dt,0,Ot):o.framebufferTexture2D(o.FRAMEBUFFER,Mt,vt,Dt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function pe(I){const E=s.get(I),et=I.isWebGLCubeRenderTarget===!0;if(E.__boundDepthTexture!==I.depthTexture){const lt=I.depthTexture;if(E.__depthDisposeCallback&&E.__depthDisposeCallback(),lt){const xt=()=>{delete E.__boundDepthTexture,delete E.__depthDisposeCallback,lt.removeEventListener("dispose",xt)};lt.addEventListener("dispose",xt),E.__depthDisposeCallback=xt}E.__boundDepthTexture=lt}if(I.depthTexture&&!E.__autoAllocateDepthBuffer)if(et)for(let lt=0;lt<6;lt++)Ue(E.__webglFramebuffer[lt],I,lt);else{const lt=I.texture.mipmaps;lt&&lt.length>0?Ue(E.__webglFramebuffer[0],I,0):Ue(E.__webglFramebuffer,I,0)}else if(et){E.__webglDepthbuffer=[];for(let lt=0;lt<6;lt++)if(i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[lt]),E.__webglDepthbuffer[lt]===void 0)E.__webglDepthbuffer[lt]=o.createRenderbuffer(),Nt(E.__webglDepthbuffer[lt],I,!1);else{const xt=I.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Dt=E.__webglDepthbuffer[lt];o.bindRenderbuffer(o.RENDERBUFFER,Dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,xt,o.RENDERBUFFER,Dt)}}else{const lt=I.texture.mipmaps;if(lt&&lt.length>0?i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer[0]):i.bindFramebuffer(o.FRAMEBUFFER,E.__webglFramebuffer),E.__webglDepthbuffer===void 0)E.__webglDepthbuffer=o.createRenderbuffer(),Nt(E.__webglDepthbuffer,I,!1);else{const xt=I.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Dt=E.__webglDepthbuffer;o.bindRenderbuffer(o.RENDERBUFFER,Dt),o.framebufferRenderbuffer(o.FRAMEBUFFER,xt,o.RENDERBUFFER,Dt)}}i.bindFramebuffer(o.FRAMEBUFFER,null)}function le(I,E,et){const lt=s.get(I);E!==void 0&&gt(lt.__webglFramebuffer,I,I.texture,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,0),et!==void 0&&pe(I)}function xe(I){const E=I.texture,et=s.get(I),lt=s.get(E);I.addEventListener("dispose",A);const xt=I.textures,Dt=I.isWebGLCubeRenderTarget===!0,Ot=xt.length>1;if(Ot||(lt.__webglTexture===void 0&&(lt.__webglTexture=o.createTexture()),lt.__version=E.version,d.memory.textures++),Dt){et.__webglFramebuffer=[];for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0){et.__webglFramebuffer[vt]=[];for(let Mt=0;Mt<E.mipmaps.length;Mt++)et.__webglFramebuffer[vt][Mt]=o.createFramebuffer()}else et.__webglFramebuffer[vt]=o.createFramebuffer()}else{if(E.mipmaps&&E.mipmaps.length>0){et.__webglFramebuffer=[];for(let vt=0;vt<E.mipmaps.length;vt++)et.__webglFramebuffer[vt]=o.createFramebuffer()}else et.__webglFramebuffer=o.createFramebuffer();if(Ot)for(let vt=0,Mt=xt.length;vt<Mt;vt++){const Lt=s.get(xt[vt]);Lt.__webglTexture===void 0&&(Lt.__webglTexture=o.createTexture(),d.memory.textures++)}if(I.samples>0&&Ct(I)===!1){et.__webglMultisampledFramebuffer=o.createFramebuffer(),et.__webglColorRenderbuffer=[],i.bindFramebuffer(o.FRAMEBUFFER,et.__webglMultisampledFramebuffer);for(let vt=0;vt<xt.length;vt++){const Mt=xt[vt];et.__webglColorRenderbuffer[vt]=o.createRenderbuffer(),o.bindRenderbuffer(o.RENDERBUFFER,et.__webglColorRenderbuffer[vt]);const Lt=f.convert(Mt.format,Mt.colorSpace),ie=f.convert(Mt.type),Ft=D(Mt.internalFormat,Lt,ie,Mt.normalized,Mt.colorSpace,I.isXRRenderTarget===!0),Bt=at(I);o.renderbufferStorageMultisample(o.RENDERBUFFER,Bt,Ft,I.width,I.height),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+vt,o.RENDERBUFFER,et.__webglColorRenderbuffer[vt])}o.bindRenderbuffer(o.RENDERBUFFER,null),I.depthBuffer&&(et.__webglDepthRenderbuffer=o.createRenderbuffer(),Nt(et.__webglDepthRenderbuffer,I,!0)),i.bindFramebuffer(o.FRAMEBUFFER,null)}}if(Dt){i.bindTexture(o.TEXTURE_CUBE_MAP,lt.__webglTexture),Rt(o.TEXTURE_CUBE_MAP,E);for(let vt=0;vt<6;vt++)if(E.mipmaps&&E.mipmaps.length>0)for(let Mt=0;Mt<E.mipmaps.length;Mt++)gt(et.__webglFramebuffer[vt][Mt],I,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Mt);else gt(et.__webglFramebuffer[vt],I,E,o.COLOR_ATTACHMENT0,o.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0);_(E)&&N(o.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(Ot){for(let vt=0,Mt=xt.length;vt<Mt;vt++){const Lt=xt[vt],ie=s.get(Lt);let Ft=o.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(Ft=I.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(Ft,ie.__webglTexture),Rt(Ft,Lt),gt(et.__webglFramebuffer,I,Lt,o.COLOR_ATTACHMENT0+vt,Ft,0),_(Lt)&&N(Ft)}i.unbindTexture()}else{let vt=o.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(vt=I.isWebGL3DRenderTarget?o.TEXTURE_3D:o.TEXTURE_2D_ARRAY),i.bindTexture(vt,lt.__webglTexture),Rt(vt,E),E.mipmaps&&E.mipmaps.length>0)for(let Mt=0;Mt<E.mipmaps.length;Mt++)gt(et.__webglFramebuffer[Mt],I,E,o.COLOR_ATTACHMENT0,vt,Mt);else gt(et.__webglFramebuffer,I,E,o.COLOR_ATTACHMENT0,vt,0);_(E)&&N(vt),i.unbindTexture()}I.depthBuffer&&pe(I)}function $t(I){const E=I.textures;for(let et=0,lt=E.length;et<lt;et++){const xt=E[et];if(_(xt)){const Dt=V(I),Ot=s.get(xt).__webglTexture;i.bindTexture(Dt,Ot),N(Dt),i.unbindTexture()}}}const ae=[],ue=[];function Ge(I){if(I.samples>0){if(Ct(I)===!1){const E=I.textures,et=I.width,lt=I.height;let xt=o.COLOR_BUFFER_BIT;const Dt=I.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT,Ot=s.get(I),vt=E.length>1;if(vt)for(let Lt=0;Lt<E.length;Lt++)i.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.RENDERBUFFER,null),i.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.TEXTURE_2D,null,0);i.bindFramebuffer(o.READ_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer);const Mt=I.texture.mipmaps;Mt&&Mt.length>0?i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ot.__webglFramebuffer[0]):i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ot.__webglFramebuffer);for(let Lt=0;Lt<E.length;Lt++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(xt|=o.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(xt|=o.STENCIL_BUFFER_BIT)),vt){o.framebufferRenderbuffer(o.READ_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.RENDERBUFFER,Ot.__webglColorRenderbuffer[Lt]);const ie=s.get(E[Lt]).__webglTexture;o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0,o.TEXTURE_2D,ie,0)}o.blitFramebuffer(0,0,et,lt,0,0,et,lt,xt,o.NEAREST),p===!0&&(ae.length=0,ue.length=0,ae.push(o.COLOR_ATTACHMENT0+Lt),I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&(ae.push(Dt),ue.push(Dt),o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,ue)),o.invalidateFramebuffer(o.READ_FRAMEBUFFER,ae))}if(i.bindFramebuffer(o.READ_FRAMEBUFFER,null),i.bindFramebuffer(o.DRAW_FRAMEBUFFER,null),vt)for(let Lt=0;Lt<E.length;Lt++){i.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglMultisampledFramebuffer),o.framebufferRenderbuffer(o.FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.RENDERBUFFER,Ot.__webglColorRenderbuffer[Lt]);const ie=s.get(E[Lt]).__webglTexture;i.bindFramebuffer(o.FRAMEBUFFER,Ot.__webglFramebuffer),o.framebufferTexture2D(o.DRAW_FRAMEBUFFER,o.COLOR_ATTACHMENT0+Lt,o.TEXTURE_2D,ie,0)}i.bindFramebuffer(o.DRAW_FRAMEBUFFER,Ot.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.storeMultisampledDepthBuffer===!1&&p){const E=I.stencilBuffer?o.DEPTH_STENCIL_ATTACHMENT:o.DEPTH_ATTACHMENT;o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER,[E])}}}function at(I){return Math.min(l.maxSamples,I.samples)}function Ct(I){const E=s.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&E.__useRenderToTexture!==!1}function G(I){const E=d.render.frame;v.get(I)!==E&&(v.set(I,E),I.update())}function me(I,E){const et=I.colorSpace,lt=I.format,xt=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||et!==Pu&&et!==xs&&(Be.getTransfer(et)===Ze?(lt!==Gi||xt!==hi)&&de("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):He("WebGLTextures: Unsupported texture color space:",et)),E}function se(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(m.width=I.naturalWidth||I.width,m.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(m.width=I.displayWidth,m.height=I.displayHeight):(m.width=I.width,m.height=I.height),m}this.allocateTextureUnit=F,this.resetTextureUnits=ct,this.getTextureUnits=q,this.setTextureUnits=it,this.setTexture2D=st,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=J,this.rebindTextures=le,this.setupRenderTarget=xe,this.updateRenderTargetMipmap=$t,this.updateMultisampleRenderTarget=Ge,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Ct,this.isReversedDepthBuffer=function(){return i.buffers.depth.getReversed()}}function KC(o,e){function i(s,l=xs){let f;const d=Be.getTransfer(l);if(s===hi)return o.UNSIGNED_BYTE;if(s===em)return o.UNSIGNED_SHORT_4_4_4_4;if(s===nm)return o.UNSIGNED_SHORT_5_5_5_1;if(s===K_)return o.UNSIGNED_INT_5_9_9_9_REV;if(s===Q_)return o.UNSIGNED_INT_10F_11F_11F_REV;if(s===Y_)return o.BYTE;if(s===Z_)return o.SHORT;if(s===yl)return o.UNSIGNED_SHORT;if(s===tm)return o.INT;if(s===ua)return o.UNSIGNED_INT;if(s===ra)return o.FLOAT;if(s===fa)return o.HALF_FLOAT;if(s===J_)return o.ALPHA;if(s===$_)return o.RGB;if(s===Gi)return o.RGBA;if(s===za)return o.DEPTH_COMPONENT;if(s===Ks)return o.DEPTH_STENCIL;if(s===ty)return o.RED;if(s===im)return o.RED_INTEGER;if(s===$s)return o.RG;if(s===am)return o.RG_INTEGER;if(s===sm)return o.RGBA_INTEGER;if(s===Au||s===Ru||s===Cu||s===wu)if(d===Ze)if(f=e.get("WEBGL_compressed_texture_s3tc_srgb"),f!==null){if(s===Au)return f.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===Ru)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===Cu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===wu)return f.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(f=e.get("WEBGL_compressed_texture_s3tc"),f!==null){if(s===Au)return f.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===Ru)return f.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===Cu)return f.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===wu)return f.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===pp||s===mp||s===gp||s===xp)if(f=e.get("WEBGL_compressed_texture_pvrtc"),f!==null){if(s===pp)return f.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===mp)return f.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===gp)return f.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===xp)return f.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===vp||s===_p||s===yp||s===Sp||s===Mp||s===Lu||s===bp)if(f=e.get("WEBGL_compressed_texture_etc"),f!==null){if(s===vp||s===_p)return d===Ze?f.COMPRESSED_SRGB8_ETC2:f.COMPRESSED_RGB8_ETC2;if(s===yp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:f.COMPRESSED_RGBA8_ETC2_EAC;if(s===Sp)return f.COMPRESSED_R11_EAC;if(s===Mp)return f.COMPRESSED_SIGNED_R11_EAC;if(s===Lu)return f.COMPRESSED_RG11_EAC;if(s===bp)return f.COMPRESSED_SIGNED_RG11_EAC}else return null;if(s===Ep||s===Tp||s===Ap||s===Rp||s===Cp||s===wp||s===Dp||s===Np||s===Up||s===Lp||s===Op||s===Pp||s===Ip||s===zp)if(f=e.get("WEBGL_compressed_texture_astc"),f!==null){if(s===Ep)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:f.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Tp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:f.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Ap)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:f.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===Rp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:f.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Cp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:f.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===wp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:f.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Dp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:f.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Np)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:f.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Up)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:f.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===Lp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:f.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Op)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:f.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Pp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:f.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Ip)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:f.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===zp)return d===Ze?f.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:f.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===Bp||s===Fp||s===Hp)if(f=e.get("EXT_texture_compression_bptc"),f!==null){if(s===Bp)return d===Ze?f.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:f.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Fp)return f.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Hp)return f.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===Gp||s===Vp||s===Ou||s===kp)if(f=e.get("EXT_texture_compression_rgtc"),f!==null){if(s===Gp)return f.COMPRESSED_RED_RGTC1_EXT;if(s===Vp)return f.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===Ou)return f.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===kp)return f.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===Sl?o.UNSIGNED_INT_24_8:o[s]!==void 0?o[s]:null}return{convert:i}}const QC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JC=`
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

}`;class $C{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i){if(this.texture===null){const s=new ly(e.texture);(e.depthNear!==i.depthNear||e.depthFar!==i.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new da({vertexShader:QC,fragmentShader:JC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new pi(new Xu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class tw extends ys{constructor(e,i){super();const s=this;let l=null,f=1,d=null,h="local-floor",p=1,m=null,v=null,M=null,x=null,b=null,T=null;const L=typeof XRWebGLBinding<"u",y=new $C,_={},N=i.getContextAttributes();let V=null,D=null;const U=[],w=[],O=new he;let A=null,P=null;const z=new wi;z.viewport=new on;const k=new wi;k.viewport=new on;const Q=[z,k],ct=new r1;let q=null,it=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(rt){let mt=U[rt];return mt===void 0&&(mt=new Lh,U[rt]=mt),mt.getTargetRaySpace()},this.getControllerGrip=function(rt){let mt=U[rt];return mt===void 0&&(mt=new Lh,U[rt]=mt),mt.getGripSpace()},this.getHand=function(rt){let mt=U[rt];return mt===void 0&&(mt=new Lh,U[rt]=mt),mt.getHandSpace()};function F(rt){const mt=w.indexOf(rt.inputSource);if(mt===-1)return;const At=U[mt];At!==void 0&&(At.update(rt.inputSource,rt.frame,m||d),At.dispatchEvent({type:rt.type,data:rt.inputSource}))}function X(){l.removeEventListener("select",F),l.removeEventListener("selectstart",F),l.removeEventListener("selectend",F),l.removeEventListener("squeeze",F),l.removeEventListener("squeezestart",F),l.removeEventListener("squeezeend",F),l.removeEventListener("end",X),l.removeEventListener("inputsourceschange",st);for(let rt=0;rt<U.length;rt++){const mt=w[rt];mt!==null&&(w[rt]=null,U[rt].disconnect(mt))}q=null,it=null,y.reset();for(const rt in _)delete _[rt];if(e.setRenderTarget(V),b=null,x=null,M=null,l=null,D=null,Xt.stop(),s.isPresenting=!1,e.setPixelRatio(A),e.setSize(O.width,O.height,!1),P!==null){const rt=P.camera;rt.fov=P.fov,rt.zoom=P.zoom,rt.updateProjectionMatrix(),P=null}s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(rt){f=rt,s.isPresenting===!0&&de("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(rt){h=rt,s.isPresenting===!0&&de("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(rt){m=rt},this.getBaseLayer=function(){return x!==null?x:b},this.getBinding=function(){return M===null&&L&&(M=new XRWebGLBinding(l,i)),M},this.getFrame=function(){return T},this.getSession=function(){return l},this.setSession=async function(rt){if(l=rt,l!==null){if(V=e.getRenderTarget(),l.addEventListener("select",F),l.addEventListener("selectstart",F),l.addEventListener("selectend",F),l.addEventListener("squeeze",F),l.addEventListener("squeezestart",F),l.addEventListener("squeezeend",F),l.addEventListener("end",X),l.addEventListener("inputsourceschange",st),N.xrCompatible!==!0&&await i.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(O),L&&"createProjectionLayer"in XRWebGLBinding.prototype){let At=null,Wt=null,gt=null;N.depth&&(gt=N.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,At=N.stencil?Ks:za,Wt=N.stencil?Sl:ua);const Nt={colorFormat:i.RGBA8,depthFormat:gt,scaleFactor:f};M=this.getBinding(),x=M.createProjectionLayer(Nt),l.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),D=new Vi(x.textureWidth,x.textureHeight,{format:Gi,type:hi,depthTexture:new bl(x.textureWidth,x.textureHeight,Wt,void 0,void 0,void 0,void 0,void 0,void 0,At),stencilBuffer:N.stencil,colorSpace:e.outputColorSpace,samples:N.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1,resolveStencilBuffer:x.ignoreDepthValues===!1,storeMultisampledDepthBuffer:x.ignoreDepthValues===!1,storeMultisampledStencilBuffer:x.ignoreDepthValues===!1})}else{const At={antialias:N.antialias,alpha:!0,depth:N.depth,stencil:N.stencil,framebufferScaleFactor:f};b=new XRWebGLLayer(l,i,At),l.updateRenderState({baseLayer:b}),e.setPixelRatio(1),e.setSize(b.framebufferWidth,b.framebufferHeight,!1),D=new Vi(b.framebufferWidth,b.framebufferHeight,{format:Gi,type:hi,colorSpace:e.outputColorSpace,stencilBuffer:N.stencil,resolveDepthBuffer:b.ignoreDepthValues===!1,resolveStencilBuffer:b.ignoreDepthValues===!1,storeMultisampledDepthBuffer:b.ignoreDepthValues===!1,storeMultisampledStencilBuffer:b.ignoreDepthValues===!1})}D.isXRRenderTarget=!0,this.setFoveation(p),m=null,d=await l.requestReferenceSpace(h),Xt.setContext(l),Xt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return y.getDepthTexture()};function st(rt){for(let mt=0;mt<rt.removed.length;mt++){const At=rt.removed[mt],Wt=w.indexOf(At);Wt>=0&&(w[Wt]=null,U[Wt].disconnect(At))}for(let mt=0;mt<rt.added.length;mt++){const At=rt.added[mt];let Wt=w.indexOf(At);if(Wt===-1){for(let Nt=0;Nt<U.length;Nt++)if(Nt>=w.length){w.push(At),Wt=Nt;break}else if(w[Nt]===null){w[Nt]=At,Wt=Nt;break}if(Wt===-1)break}const gt=U[Wt];gt&&gt.connect(At)}}const Y=new nt,H=new nt;function J(rt,mt,At){Y.setFromMatrixPosition(mt.matrixWorld),H.setFromMatrixPosition(At.matrixWorld);const Wt=Y.distanceTo(H),gt=mt.projectionMatrix.elements,Nt=At.projectionMatrix.elements,Ue=gt[14]/(gt[10]-1),pe=gt[14]/(gt[10]+1),le=(gt[9]+1)/gt[5],xe=(gt[9]-1)/gt[5],$t=(gt[8]-1)/gt[0],ae=(Nt[8]+1)/Nt[0],ue=Ue*$t,Ge=Ue*ae,at=Wt/(-$t+ae),Ct=at*-$t;if(mt.matrixWorld.decompose(rt.position,rt.quaternion,rt.scale),rt.translateX(Ct),rt.translateZ(at),rt.matrixWorld.compose(rt.position,rt.quaternion,rt.scale),rt.matrixWorldInverse.copy(rt.matrixWorld).invert(),gt[10]===-1)rt.projectionMatrix.copy(mt.projectionMatrix),rt.projectionMatrixInverse.copy(mt.projectionMatrixInverse);else{const G=Ue+at,me=pe+at,se=ue-Ct,I=Ge+(Wt-Ct),E=le*pe/me*G,et=xe*pe/me*G;rt.projectionMatrix.makePerspective(se,I,E,et,G,me),rt.projectionMatrixInverse.copy(rt.projectionMatrix).invert()}}function Tt(rt,mt){mt===null?rt.matrixWorld.copy(rt.matrix):rt.matrixWorld.multiplyMatrices(mt.matrixWorld,rt.matrix),rt.matrixWorldInverse.copy(rt.matrixWorld).invert()}this.updateCamera=function(rt){if(l===null)return;let mt=rt.near,At=rt.far;y.texture!==null&&(y.depthNear>0&&(mt=y.depthNear),y.depthFar>0&&(At=y.depthFar)),ct.near=k.near=z.near=mt,ct.far=k.far=z.far=At,(q!==ct.near||it!==ct.far)&&(l.updateRenderState({depthNear:ct.near,depthFar:ct.far}),q=ct.near,it=ct.far),ct.layers.mask=rt.layers.mask|6,z.layers.mask=ct.layers.mask&-5,k.layers.mask=ct.layers.mask&-3;const Wt=rt.parent,gt=ct.cameras;Tt(ct,Wt);for(let Nt=0;Nt<gt.length;Nt++)Tt(gt[Nt],Wt);gt.length===2?J(ct,z,k):ct.projectionMatrix.copy(z.projectionMatrix),P===null&&rt.isPerspectiveCamera&&(P={camera:rt,fov:rt.fov,zoom:rt.zoom}),bt(rt,ct,Wt)};function bt(rt,mt,At){At===null?rt.matrix.copy(mt.matrixWorld):(rt.matrix.copy(At.matrixWorld),rt.matrix.invert(),rt.matrix.multiply(mt.matrixWorld)),rt.matrix.decompose(rt.position,rt.quaternion,rt.scale),rt.updateMatrixWorld(!0),rt.projectionMatrix.copy(mt.projectionMatrix),rt.projectionMatrixInverse.copy(mt.projectionMatrixInverse),rt.isPerspectiveCamera&&(rt.fov=Wp*2*Math.atan(1/rt.projectionMatrix.elements[5]),rt.zoom=1)}this.getCamera=function(){return ct},this.getFoveation=function(){if(!(x===null&&b===null))return p},this.setFoveation=function(rt){p=rt,x!==null&&(x.fixedFoveation=rt),b!==null&&b.fixedFoveation!==void 0&&(b.fixedFoveation=rt)},this.hasDepthSensing=function(){return y.texture!==null},this.getDepthSensingMesh=function(){return y.getMesh(ct)},this.getCameraTexture=function(rt){return _[rt]};let Zt=null;function Rt(rt,mt){if(v=mt.getViewerPose(m||d),T=mt,v!==null){const At=v.views;b!==null&&(e.setRenderTargetFramebuffer(D,b.framebuffer),e.setRenderTarget(D));let Wt=!1;At.length!==ct.cameras.length&&(ct.cameras.length=0,Wt=!0);for(let pe=0;pe<At.length;pe++){const le=At[pe];let xe=null;if(b!==null)xe=b.getViewport(le);else{const ae=M.getViewSubImage(x,le);xe=ae.viewport,pe===0&&(e.setRenderTargetTextures(D,ae.colorTexture,ae.depthStencilTexture),e.setRenderTarget(D))}let $t=Q[pe];$t===void 0&&($t=new wi,$t.layers.enable(pe),$t.viewport=new on,Q[pe]=$t),$t.matrix.fromArray(le.transform.matrix),$t.matrix.decompose($t.position,$t.quaternion,$t.scale),$t.projectionMatrix.fromArray(le.projectionMatrix),$t.projectionMatrixInverse.copy($t.projectionMatrix).invert(),$t.viewport.set(xe.x,xe.y,xe.width,xe.height),pe===0&&(ct.matrix.copy($t.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale)),Wt===!0&&ct.cameras.push($t)}const gt=l.enabledFeatures;if(gt&&gt.includes("depth-sensing")&&l.depthUsage=="gpu-optimized"&&L){M=s.getBinding();const pe=M.getDepthInformation(At[0]);pe&&pe.isValid&&pe.texture&&y.init(pe,l.renderState)}if(gt&&gt.includes("camera-access")&&L){e.state.unbindTexture(),M=s.getBinding();for(let pe=0;pe<At.length;pe++){const le=At[pe].camera;if(le){let xe=_[le];xe||(xe=new ly,_[le]=xe);const $t=M.getCameraImage(le);xe.sourceTexture=$t}}}}for(let At=0;At<U.length;At++){const Wt=w[At],gt=U[At];Wt!==null&&gt!==void 0&&gt.update(Wt,mt,m||d)}Zt&&Zt(rt,mt),mt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:mt}),T=null}const Xt=new hy;Xt.setAnimationLoop(Rt),this.setAnimationLoop=function(rt){Zt=rt},this.dispose=function(){}}}const ew=new an,yy=new ye;yy.set(-1,0,0,0,1,0,0,0,1);function nw(o,e){function i(y,_){y.matrixAutoUpdate===!0&&y.updateMatrix(),_.value.copy(y.matrix)}function s(y,_){_.color.getRGB(y.fogColor.value,cy(o)),_.isFog?(y.fogNear.value=_.near,y.fogFar.value=_.far):_.isFogExp2&&(y.fogDensity.value=_.density)}function l(y,_,N,V,D){_.isNodeMaterial?_.uniformsNeedUpdate=!1:_.isMeshBasicMaterial?f(y,_):_.isMeshLambertMaterial?(f(y,_),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)):_.isMeshToonMaterial?(f(y,_),M(y,_)):_.isMeshPhongMaterial?(f(y,_),v(y,_),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)):_.isMeshStandardMaterial?(f(y,_),x(y,_),_.isMeshPhysicalMaterial&&b(y,_,D)):_.isMeshMatcapMaterial?(f(y,_),T(y,_)):_.isMeshDepthMaterial?f(y,_):_.isMeshDistanceMaterial?(f(y,_),L(y,_)):_.isMeshNormalMaterial?f(y,_):_.isLineBasicMaterial?(d(y,_),_.isLineDashedMaterial&&h(y,_)):_.isPointsMaterial?p(y,_,N,V):_.isSpriteMaterial?m(y,_):_.isShadowMaterial?(y.color.value.copy(_.color),y.opacity.value=_.opacity):_.isShaderMaterial&&(_.uniformsNeedUpdate=!1)}function f(y,_){y.opacity.value=_.opacity,_.color&&y.diffuse.value.copy(_.color),_.emissive&&y.emissive.value.copy(_.emissive).multiplyScalar(_.emissiveIntensity),_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.bumpMap&&(y.bumpMap.value=_.bumpMap,i(_.bumpMap,y.bumpMapTransform),y.bumpScale.value=_.bumpScale,_.side===jn&&(y.bumpScale.value*=-1)),_.normalMap&&(y.normalMap.value=_.normalMap,i(_.normalMap,y.normalMapTransform),y.normalScale.value.copy(_.normalScale),_.side===jn&&y.normalScale.value.negate()),_.displacementMap&&(y.displacementMap.value=_.displacementMap,i(_.displacementMap,y.displacementMapTransform),y.displacementScale.value=_.displacementScale,y.displacementBias.value=_.displacementBias),_.emissiveMap&&(y.emissiveMap.value=_.emissiveMap,i(_.emissiveMap,y.emissiveMapTransform)),_.specularMap&&(y.specularMap.value=_.specularMap,i(_.specularMap,y.specularMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest);const N=e.get(_),V=N.envMap,D=N.envMapRotation;V&&(y.envMap.value=V,y.envMapRotation.value.setFromMatrix4(ew.makeRotationFromEuler(D)).transpose(),V.isCubeTexture&&V.isRenderTargetTexture===!1&&y.envMapRotation.value.premultiply(yy),y.reflectivity.value=_.reflectivity,y.ior.value=_.ior,y.refractionRatio.value=_.refractionRatio),_.lightMap&&(y.lightMap.value=_.lightMap,y.lightMapIntensity.value=_.lightMapIntensity,i(_.lightMap,y.lightMapTransform)),_.aoMap&&(y.aoMap.value=_.aoMap,y.aoMapIntensity.value=_.aoMapIntensity,i(_.aoMap,y.aoMapTransform))}function d(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform))}function h(y,_){y.dashSize.value=_.dashSize,y.totalSize.value=_.dashSize+_.gapSize,y.scale.value=_.scale}function p(y,_,N,V){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.size.value=_.size*N,y.scale.value=V*.5,_.map&&(y.map.value=_.map,i(_.map,y.uvTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function m(y,_){y.diffuse.value.copy(_.color),y.opacity.value=_.opacity,y.rotation.value=_.rotation,_.map&&(y.map.value=_.map,i(_.map,y.mapTransform)),_.alphaMap&&(y.alphaMap.value=_.alphaMap,i(_.alphaMap,y.alphaMapTransform)),_.alphaTest>0&&(y.alphaTest.value=_.alphaTest)}function v(y,_){y.specular.value.copy(_.specular),y.shininess.value=Math.max(_.shininess,1e-4)}function M(y,_){_.gradientMap&&(y.gradientMap.value=_.gradientMap)}function x(y,_){y.metalness.value=_.metalness,_.metalnessMap&&(y.metalnessMap.value=_.metalnessMap,i(_.metalnessMap,y.metalnessMapTransform)),y.roughness.value=_.roughness,_.roughnessMap&&(y.roughnessMap.value=_.roughnessMap,i(_.roughnessMap,y.roughnessMapTransform)),_.envMap&&(y.envMapIntensity.value=_.envMapIntensity)}function b(y,_,N){y.ior.value=_.ior,_.sheen>0&&(y.sheenColor.value.copy(_.sheenColor).multiplyScalar(_.sheen),y.sheenRoughness.value=_.sheenRoughness,_.sheenColorMap&&(y.sheenColorMap.value=_.sheenColorMap,i(_.sheenColorMap,y.sheenColorMapTransform)),_.sheenRoughnessMap&&(y.sheenRoughnessMap.value=_.sheenRoughnessMap,i(_.sheenRoughnessMap,y.sheenRoughnessMapTransform))),_.clearcoat>0&&(y.clearcoat.value=_.clearcoat,y.clearcoatRoughness.value=_.clearcoatRoughness,_.clearcoatMap&&(y.clearcoatMap.value=_.clearcoatMap,i(_.clearcoatMap,y.clearcoatMapTransform)),_.clearcoatRoughnessMap&&(y.clearcoatRoughnessMap.value=_.clearcoatRoughnessMap,i(_.clearcoatRoughnessMap,y.clearcoatRoughnessMapTransform)),_.clearcoatNormalMap&&(y.clearcoatNormalMap.value=_.clearcoatNormalMap,i(_.clearcoatNormalMap,y.clearcoatNormalMapTransform),y.clearcoatNormalScale.value.copy(_.clearcoatNormalScale),_.side===jn&&y.clearcoatNormalScale.value.negate())),_.dispersion>0&&(y.dispersion.value=_.dispersion),_.retroreflectivity>0&&(y.retroreflectivity.value=_.retroreflectivity),_.iridescence>0&&(y.iridescence.value=_.iridescence,y.iridescenceIOR.value=_.iridescenceIOR,y.iridescenceThicknessMinimum.value=_.iridescenceThicknessRange[0],y.iridescenceThicknessMaximum.value=_.iridescenceThicknessRange[1],_.iridescenceMap&&(y.iridescenceMap.value=_.iridescenceMap,i(_.iridescenceMap,y.iridescenceMapTransform)),_.iridescenceThicknessMap&&(y.iridescenceThicknessMap.value=_.iridescenceThicknessMap,i(_.iridescenceThicknessMap,y.iridescenceThicknessMapTransform))),_.transmission>0&&(y.transmission.value=_.transmission,y.transmissionSamplerMap.value=N.texture,y.transmissionSamplerSize.value.set(N.width,N.height),_.transmissionMap&&(y.transmissionMap.value=_.transmissionMap,i(_.transmissionMap,y.transmissionMapTransform)),y.thickness.value=_.thickness,_.thicknessMap&&(y.thicknessMap.value=_.thicknessMap,i(_.thicknessMap,y.thicknessMapTransform)),y.attenuationDistance.value=_.attenuationDistance,y.attenuationColor.value.copy(_.attenuationColor)),_.anisotropy>0&&(y.anisotropyVector.value.set(_.anisotropy*Math.cos(_.anisotropyRotation),_.anisotropy*Math.sin(_.anisotropyRotation)),_.anisotropyMap&&(y.anisotropyMap.value=_.anisotropyMap,i(_.anisotropyMap,y.anisotropyMapTransform))),y.specularIntensity.value=_.specularIntensity,y.specularColor.value.copy(_.specularColor),_.specularColorMap&&(y.specularColorMap.value=_.specularColorMap,i(_.specularColorMap,y.specularColorMapTransform)),_.specularIntensityMap&&(y.specularIntensityMap.value=_.specularIntensityMap,i(_.specularIntensityMap,y.specularIntensityMapTransform))}function T(y,_){_.matcap&&(y.matcap.value=_.matcap)}function L(y,_){const N=e.get(_).light;y.referencePosition.value.setFromMatrixPosition(N.matrixWorld),y.nearDistance.value=N.shadow.camera.near,y.farDistance.value=N.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function iw(o,e,i,s){let l={},f={},d=[];const h=o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS);function p(D,U){const w=U.program;s.uniformBlockBinding(D,w)}function m(D,U){let w=l[D.id];w===void 0&&(y(D),w=v(D),l[D.id]=w,D.addEventListener("dispose",N));const O=U.program;s.updateUBOMapping(D,O);const A=e.render.frame;f[D.id]!==A&&(x(D),f[D.id]=A)}function v(D){const U=M();D.__bindingPointIndex=U;const w=o.createBuffer(),O=D.__size,A=D.usage;return o.bindBuffer(o.UNIFORM_BUFFER,w),o.bufferData(o.UNIFORM_BUFFER,O,A),o.bindBuffer(o.UNIFORM_BUFFER,null),o.bindBufferBase(o.UNIFORM_BUFFER,U,w),w}function M(){for(let D=0;D<h;D++)if(d.indexOf(D)===-1)return d.push(D),D;return He("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(D){const U=l[D.id],w=D.uniforms,O=D.__cache;o.bindBuffer(o.UNIFORM_BUFFER,U);for(let A=0,P=w.length;A<P;A++){const z=w[A];if(Array.isArray(z))for(let k=0,Q=z.length;k<Q;k++)b(z[k],A,k,O);else b(z,A,0,O)}o.bindBuffer(o.UNIFORM_BUFFER,null)}function b(D,U,w,O){if(L(D,U,w,O)===!0){const A=D.__offset,P=D.value;if(Array.isArray(P)){let z=0;for(let k=0;k<P.length;k++){const Q=P[k],ct=_(Q);T(Q,D.__data,z),typeof Q!="number"&&typeof Q!="boolean"&&!Q.isMatrix3&&!ArrayBuffer.isView(Q)&&(z+=ct.storage/Float32Array.BYTES_PER_ELEMENT)}}else T(P,D.__data,0);o.bufferSubData(o.UNIFORM_BUFFER,A,D.__data)}}function T(D,U,w){typeof D=="number"||typeof D=="boolean"?U[0]=D:D.isMatrix3?(U[0]=D.elements[0],U[1]=D.elements[1],U[2]=D.elements[2],U[3]=0,U[4]=D.elements[3],U[5]=D.elements[4],U[6]=D.elements[5],U[7]=0,U[8]=D.elements[6],U[9]=D.elements[7],U[10]=D.elements[8],U[11]=0):ArrayBuffer.isView(D)?U.set(new D.constructor(D.buffer,D.byteOffset,U.length)):D.toArray(U,w)}function L(D,U,w,O){const A=D.value,P=U+"_"+w;if(O[P]===void 0)return typeof A=="number"||typeof A=="boolean"?O[P]=A:ArrayBuffer.isView(A)?O[P]=A.slice():O[P]=A.clone(),!0;{const z=O[P];if(typeof A=="number"||typeof A=="boolean"){if(z!==A)return O[P]=A,!0}else{if(ArrayBuffer.isView(A))return!0;if(z.equals(A)===!1)return z.copy(A),!0}}return!1}function y(D){const U=D.uniforms;let w=0;const O=16;for(let P=0,z=U.length;P<z;P++){const k=Array.isArray(U[P])?U[P]:[U[P]];for(let Q=0,ct=k.length;Q<ct;Q++){const q=k[Q],it=Array.isArray(q.value)?q.value:[q.value];for(let F=0,X=it.length;F<X;F++){const st=it[F],Y=_(st),H=w%O,J=H%Y.boundary,Tt=H+J;w+=J,Tt!==0&&O-Tt<Y.storage&&(w+=O-Tt),q.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),q.__offset=w,w+=Y.storage}}}const A=w%O;return A>0&&(w+=O-A),D.__size=w,D.__cache={},this}function _(D){const U={boundary:0,storage:0};return typeof D=="number"||typeof D=="boolean"?(U.boundary=4,U.storage=4):D.isVector2?(U.boundary=8,U.storage=8):D.isVector3||D.isColor?(U.boundary=16,U.storage=12):D.isVector4?(U.boundary=16,U.storage=16):D.isMatrix3?(U.boundary=48,U.storage=48):D.isMatrix4?(U.boundary=64,U.storage=64):D.isTexture?de("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(D)?(U.boundary=16,U.storage=D.byteLength):de("WebGLRenderer: Unsupported uniform value type.",D),U}function N(D){const U=D.target;U.removeEventListener("dispose",N);const w=d.indexOf(U.__bindingPointIndex);d.splice(w,1),o.deleteBuffer(l[U.id]),delete l[U.id],delete f[U.id]}function V(){for(const D in l)o.deleteBuffer(l[D]);d=[],l={},f={}}return{bind:p,update:m,dispose:V}}const aw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let aa=null;function sw(){return aa===null&&(aa=new kE(aw,16,16,$s,fa),aa.name="DFG_LUT",aa.minFilter=Fn,aa.magFilter=Fn,aa.wrapS=Oa,aa.wrapT=Oa,aa.generateMipmaps=!1,aa.needsUpdate=!0),aa}class rw{constructor(e={}){const{canvas:i=xE(),context:s=null,depth:l=!0,stencil:f=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:v="default",failIfMajorPerformanceCaveat:M=!1,reversedDepthBuffer:x=!1,outputBufferType:b=hi}=e;this.isWebGLRenderer=!0;let T;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");T=s.getContextAttributes().alpha}else T=d;const L=b,y=new Set([sm,am,im]),_=new Set([hi,ua,yl,Sl,em,nm]),N=new Uint32Array(4),V=new Int32Array(4),D=new nt;let U=null,w=null;const O=[],A=[];let P=null;this.domElement=i,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const z=this;let k=!1,Q=null,ct=null,q=null,it=null;this._outputColorSpace=Ci;let F=0,X=0,st=null,Y=-1,H=null;const J=new on,Tt=new on;let bt=null;const Zt=new Re(0);let Rt=0,Xt=i.width,rt=i.height,mt=1,At=null,Wt=null;const gt=new on(0,0,Xt,rt),Nt=new on(0,0,Xt,rt);let Ue=!1;const pe=new fm;let le=!1,xe=!1;const $t=new an,ae=new nt,ue=new on,Ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let at=!1;function Ct(){return st===null?mt:1}let G=s;function me(R,W){return i.getContext(R,W)}let se,I,E,et,lt,xt,Dt,Ot,vt,Mt,Lt,ie,Ft,Bt,qt,oe,ge,Z,Ut,St,Pt,jt,Et;try{const R={alpha:!0,depth:l,stencil:f,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:v,failIfMajorPerformanceCaveat:M};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${Jp}`),i.addEventListener("webglcontextlost",Ie,!1),i.addEventListener("webglcontextrestored",ve,!1),i.addEventListener("webglcontextcreationerror",ei,!1),G===null){const W="webgl2";if(G=me(W,R),G===null)throw me(W)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ne()}catch(R){throw i.removeEventListener("webglcontextlost",Ie,!1),i.removeEventListener("webglcontextrestored",ve,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),He("WebGLRenderer: "+R.message),R}function ne(){se=new sR(G),se.init(),Pt=new KC(G,se),I=new ZA(G,se,e,Pt),E=new YC(G,se),I.reversedDepthBuffer&&x&&E.buffers.depth.setReversed(!0),ct=G.createFramebuffer(),q=G.createFramebuffer(),it=G.createFramebuffer(),et=new lR(G),lt=new OC,xt=new ZC(G,se,E,lt,I,Pt,et),Dt=new aR(z),Ot=new u1(G),jt=new qA(G,Ot),vt=new rR(G,Ot,et,jt),Mt=new uR(G,vt,Ot,jt,et),Z=new cR(G,I,xt),qt=new KA(lt),Lt=new LC(z,Dt,se,I,jt,qt),ie=new nw(z,lt),Ft=new IC,Bt=new VC(se),ge=new jA(z,Dt,E,Mt,T,p),oe=new qC(z,Mt,I),Et=new iw(G,et,I,E),Ut=new YA(G,se,et),St=new oR(G,se,et),et.programs=Lt.programs,z.capabilities=I,z.extensions=se,z.properties=lt,z.renderLists=Ft,z.shadowMap=oe,z.state=E,z.info=et}L!==hi&&(P=new dR(L,i.width,i.height,h,l,f));const kt=new tw(z,G);this.xr=kt,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const R=se.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=se.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(R){R!==void 0&&(mt=R,this.setSize(Xt,rt,!1))},this.getSize=function(R){return R.set(Xt,rt)},this.setSize=function(R,W,pt=!0){if(kt.isPresenting){de("WebGLRenderer: Can't change size while VR device is presenting.");return}Xt=R,rt=W,i.width=Math.floor(R*mt),i.height=Math.floor(W*mt),pt===!0&&(i.style.width=R+"px",i.style.height=W+"px"),P!==null&&P.setSize(i.width,i.height),this.setViewport(0,0,R,W)},this.getDrawingBufferSize=function(R){return R.set(Xt*mt,rt*mt).floor()},this.setDrawingBufferSize=function(R,W,pt){Xt=R,rt=W,mt=pt,i.width=Math.floor(R*pt),i.height=Math.floor(W*pt),this.setViewport(0,0,R,W)},this.setEffects=function(R){if(L===hi){He("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let W=0;W<R.length;W++)if(R[W].isOutputPass===!0){de("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(J)},this.getViewport=function(R){return R.copy(gt)},this.setViewport=function(R,W,pt,ut){R.isVector4?gt.set(R.x,R.y,R.z,R.w):gt.set(R,W,pt,ut),E.viewport(J.copy(gt).multiplyScalar(mt).round())},this.getScissor=function(R){return R.copy(Nt)},this.setScissor=function(R,W,pt,ut){R.isVector4?Nt.set(R.x,R.y,R.z,R.w):Nt.set(R,W,pt,ut),E.scissor(Tt.copy(Nt).multiplyScalar(mt).round())},this.getScissorTest=function(){return Ue},this.setScissorTest=function(R){E.setScissorTest(Ue=R)},this.setOpaqueSort=function(R){At=R},this.setTransparentSort=function(R){Wt=R},this.getClearColor=function(R){return R.copy(ge.getClearColor())},this.setClearColor=function(){ge.setClearColor(...arguments)},this.getClearAlpha=function(){return ge.getClearAlpha()},this.setClearAlpha=function(){ge.setClearAlpha(...arguments)},this.clear=function(R=!0,W=!0,pt=!0){let ut=0;if(R){let ft=!1;if(st!==null){const Ht=st.texture.format;ft=y.has(Ht)}if(ft){const Ht=st.texture.type,Yt=_.has(Ht),It=ge.getClearColor(),Jt=ge.getClearAlpha(),te=It.r,fe=It.g,_e=It.b;Yt?(N[0]=te,N[1]=fe,N[2]=_e,N[3]=Jt,G.clearBufferuiv(G.COLOR,0,N)):(V[0]=te,V[1]=fe,V[2]=_e,V[3]=Jt,G.clearBufferiv(G.COLOR,0,V))}else ut|=G.COLOR_BUFFER_BIT}W&&(ut|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),pt&&(ut|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),ut!==0&&G.clear(ut)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),Q=R},this.dispose=function(){i.removeEventListener("webglcontextlost",Ie,!1),i.removeEventListener("webglcontextrestored",ve,!1),i.removeEventListener("webglcontextcreationerror",ei,!1),ge.dispose(),Ft.dispose(),Bt.dispose(),lt.dispose(),Dt.dispose(),Mt.dispose(),jt.dispose(),Et.dispose(),Lt.dispose(),kt.dispose(),kt.removeEventListener("sessionstart",Ms),kt.removeEventListener("sessionend",Fa),ki.stop()};function Ie(R){R.preventDefault(),Uv("WebGLRenderer: Context Lost."),k=!0}function ve(){Uv("WebGLRenderer: Context Restored."),k=!1;const R=et.autoReset,W=oe.enabled,pt=oe.autoUpdate,ut=oe.needsUpdate,ft=oe.type;ne(),et.autoReset=R,oe.enabled=W,oe.autoUpdate=pt,oe.needsUpdate=ut,oe.type=ft}function ei(R){He("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function gi(R){const W=R.target;W.removeEventListener("dispose",gi),qu(W)}function qu(R){er(R),lt.remove(R)}function er(R){const W=lt.get(R).programs;W!==void 0&&(W.forEach(function(pt){Lt.releaseProgram(pt)}),R.isShaderMaterial&&Lt.releaseShaderCache(R))}this.renderBufferDirect=function(R,W,pt,ut,ft,Ht){W===null&&(W=Ge);const Yt=ft.isMesh&&ft.matrixWorld.determinantAffine()<0,It=go(R,W,pt,ut,ft);E.setMaterial(ut,Yt);let Jt=pt.index,te=1;if(ut.wireframe===!0){if(Jt=vt.getWireframeAttribute(pt),Jt===void 0)return;te=2}const fe=pt.drawRange,_e=pt.attributes.position;let Kt=fe.start*te,Ce=(fe.start+fe.count)*te;Ht!==null&&(Kt=Math.max(Kt,Ht.start*te),Ce=Math.min(Ce,(Ht.start+Ht.count)*te)),Jt!==null?(Kt=Math.max(Kt,0),Ce=Math.min(Ce,Jt.count)):_e!=null&&(Kt=Math.max(Kt,0),Ce=Math.min(Ce,_e.count));const Ee=Ce-Kt;if(Ee<0||Ee===1/0)return;jt.setup(ft,ut,It,pt,Jt);let Qe,Xe=Ut;if(Jt!==null&&(Qe=Ot.get(Jt),Xe=St,Xe.setIndex(Qe)),ft.isMesh)ut.wireframe===!0?(E.setLineWidth(ut.wireframeLinewidth*Ct()),Xe.setMode(G.LINES)):Xe.setMode(G.TRIANGLES);else if(ft.isLine){let vn=ut.linewidth;vn===void 0&&(vn=1),E.setLineWidth(vn*Ct()),ft.isLineSegments?Xe.setMode(G.LINES):ft.isLineLoop?Xe.setMode(G.LINE_LOOP):Xe.setMode(G.LINE_STRIP)}else ft.isPoints?Xe.setMode(G.POINTS):ft.isSprite&&Xe.setMode(G.TRIANGLES);if(ft.isBatchedMesh)if(se.get("WEBGL_multi_draw"))Xe.renderMultiDraw(ft._multiDrawStarts,ft._multiDrawCounts,ft._multiDrawCount);else{const vn=ft._multiDrawStarts,Gt=ft._multiDrawCounts,ln=ft._multiDrawCount,ze=Jt?Ot.get(Jt).bytesPerElement:1,Hn=lt.get(ut).currentProgram.getUniforms();for(let ni=0;ni<ln;ni++)Hn.setValue(G,"_gl_DrawID",ni),Xe.render(vn[ni]/ze,Gt[ni])}else if(ft.isInstancedMesh)Xe.renderInstances(Kt,Ee,ft.count);else if(pt.isInstancedBufferGeometry){const vn=pt._maxInstanceCount!==void 0?pt._maxInstanceCount:1/0,Gt=Math.min(pt.instanceCount,vn);Xe.renderInstances(Kt,Ee,Gt)}else Xe.render(Kt,Ee)};function Ss(R,W,pt,ut){Q!==null&&R.isNodeMaterial&&Q.setObject(ut,R),le===!0&&qt.setState(R,pt,!1),R.transparent===!0&&R.side===Fi&&R.forceSinglePass===!1?(R.side=jn,R.needsUpdate=!0,bs(R,W,ut),R.side=Qs,R.needsUpdate=!0,bs(R,W,ut),R.side=Fi):bs(R,W,ut)}this.compile=function(R,W,pt=null){pt===null&&(pt=R),Q!==null&&Q.renderStart(R,W,pt),w=Bt.get(pt),w.init(W),A.push(w),pt.traverseVisible(function(ft){ft.isLight&&ft.layers.test(W.layers)&&(w.pushLight(ft),ft.castShadow&&w.pushShadow(ft))}),R!==pt&&R.traverseVisible(function(ft){ft.isLight&&ft.layers.test(W.layers)&&(w.pushLight(ft),ft.castShadow&&w.pushShadow(ft))}),w.setupLights(),Q!==null&&Q.updateLights(w.state.lightsArray),xe=this.localClippingEnabled,le=qt.init(this.clippingPlanes,xe),le===!0&&qt.setGlobalState(this.clippingPlanes,W),Q!==null&&oe.render(w.state.shadowsArray,pt,W);const ut=new Set;return R.traverse(function(ft){if(!(ft.isMesh||ft.isPoints||ft.isLine||ft.isSprite))return;const Ht=ft.material;if(Ht)if(Array.isArray(Ht))for(let Yt=0;Yt<Ht.length;Yt++){const It=Ht[Yt];Ss(It,pt,W,ft),ut.add(It)}else Ss(Ht,pt,W,ft),ut.add(Ht)}),w=A.pop(),Q!==null&&Q.renderEnd(),ut},this.compileAsync=function(R,W,pt=null){const ut=this.compile(R,W,pt);return new Promise(ft=>{function Ht(){if(ut.forEach(function(Yt){const Jt=lt.get(Yt).currentProgram;(Jt===void 0||Jt.isReady())&&ut.delete(Yt)}),ut.size===0){ft(R);return}setTimeout(Ht,10)}se.get("KHR_parallel_shader_compile")!==null?Ht():setTimeout(Ht,10)})};let Ba=null;function ha(R){Ba&&Ba(R)}function Ms(){ki.stop()}function Fa(){ki.start()}const ki=new hy;ki.setAnimationLoop(ha),typeof self<"u"&&ki.setContext(self),this.setAnimationLoop=function(R){Ba=R,kt.setAnimationLoop(R),R===null?ki.stop():ki.start()},kt.addEventListener("sessionstart",Ms),kt.addEventListener("sessionend",Fa),this.render=function(R,W){if(W!==void 0&&W.isCamera!==!0){He("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;Q!==null&&Q.renderStart(R,W);const pt=kt.enabled===!0&&kt.isPresenting===!0,ut=P!==null&&(st===null||pt)&&P.begin(z,st);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),kt.enabled===!0&&kt.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(kt.cameraAutoUpdate===!0&&kt.updateCamera(W),W=kt.getCamera()),R.isScene===!0&&R.onBeforeRender(z,R,W,st),w=Bt.get(R,A.length),w.init(W),w.state.textureUnits=xt.getTextureUnits(),A.push(w),$t.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),pe.setFromProjectionMatrix($t,oa,W.reversedDepth),xe=this.localClippingEnabled,le=qt.init(this.clippingPlanes,xe),U=Ft.get(R,O.length),U.init(),O.push(U),kt.enabled===!0&&kt.isPresenting===!0){const Yt=z.xr.getDepthSensingMesh();Yt!==null&&uo(Yt,W,-1/0,z.sortObjects)}uo(R,W,0,z.sortObjects),U.finish(),Q!==null&&Q.updateLights(w.state.lightsArray),z.sortObjects===!0&&U.sort(At,Wt),at=kt.enabled===!1||kt.isPresenting===!1||kt.hasDepthSensing()===!1,at&&ge.addToRenderList(U,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),le===!0&&qt.beginShadows();const ft=w.state.shadowsArray;if(oe.render(ft,R,W),le===!0&&qt.endShadows(),(ut&&P.hasRenderPass())===!1){const Yt=U.opaque,It=U.transmissive;if(w.setupLights(),W.isArrayCamera){const Jt=W.cameras;if(It.length>0)for(let te=0,fe=Jt.length;te<fe;te++){const _e=Jt[te];nr(Yt,It,R,_e)}at&&ge.render(R);for(let te=0,fe=Jt.length;te<fe;te++){const _e=Jt[te];fo(U,R,_e,_e.viewport)}}else It.length>0&&nr(Yt,It,R,W),at&&ge.render(R),fo(U,R,W)}st!==null&&X===0&&(xt.updateMultisampleRenderTarget(st),xt.updateRenderTargetMipmap(st)),ut&&P.end(z),R.isScene===!0&&R.onAfterRender(z,R,W),jt.resetDefaultState(),Y=-1,H=null,A.pop(),A.length>0?(w=A[A.length-1],xt.setTextureUnits(w.state.textureUnits),le===!0&&qt.setGlobalState(z.clippingPlanes,w.state.camera)):w=null,O.pop(),O.length>0?U=O[O.length-1]:U=null,Q!==null&&Q.renderEnd()};function uo(R,W,pt,ut){if(R.visible===!1)return;if(R.layers.test(W.layers)){if(R.isGroup)pt=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(W);else if(R.isLightProbeGrid)w.pushLightProbeGrid(R);else if(R.isLight)w.pushLight(R),R.castShadow&&w.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||R.intersectsFrustum(pe)){ut&&ue.setFromMatrixPosition(R.matrixWorld).applyMatrix4($t);const Yt=Mt.update(R),It=R.material;It.visible&&U.push(R,Yt,It,pt,ue.z,null,W)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||R.intersectsFrustum(pe))){const Yt=Mt.update(R),It=R.material;if(ut&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),ue.copy(R.boundingSphere.center)):(Yt.boundingSphere===null&&Yt.computeBoundingSphere(),ue.copy(Yt.boundingSphere.center)),ue.applyMatrix4(R.matrixWorld).applyMatrix4($t)),Array.isArray(It)){const Jt=Yt.groups;for(let te=0,fe=Jt.length;te<fe;te++){const _e=Jt[te],Kt=It[_e.materialIndex];Kt&&Kt.visible&&U.push(R,Yt,Kt,pt,ue.z,_e,W)}}else It.visible&&U.push(R,Yt,It,pt,ue.z,null,W)}}const Ht=R.children;for(let Yt=0,It=Ht.length;Yt<It;Yt++)uo(Ht[Yt],W,pt,ut)}function fo(R,W,pt,ut){const{opaque:ft,transmissive:Ht,transparent:Yt}=R;w.setupLightsView(pt),le===!0&&qt.setGlobalState(z.clippingPlanes,pt),ut&&E.viewport(J.copy(ut)),ft.length>0&&Xi(ft,W,pt),Ht.length>0&&Xi(Ht,W,pt),Yt.length>0&&Xi(Yt,W,pt),E.buffers.depth.setTest(!0),E.buffers.depth.setMask(!0),E.buffers.color.setMask(!0),E.setPolygonOffset(!1)}function nr(R,W,pt,ut){if((pt.isScene===!0?pt.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[ut.id]===void 0){const Kt=se.has("EXT_color_buffer_half_float")||se.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[ut.id]=new Vi(1,1,{generateMipmaps:!0,type:Kt?fa:hi,minFilter:Zs,samples:Math.max(4,I.samples),stencilBuffer:f,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Be.workingColorSpace})}const Ht=w.state.transmissionRenderTarget[ut.id],Yt=ut.viewport||J;Ht.setSize(Yt.z*z.transmissionResolutionScale,Yt.w*z.transmissionResolutionScale);const It=z.getRenderTarget(),Jt=z.getActiveCubeFace(),te=z.getActiveMipmapLevel();z.setRenderTarget(Ht),z.getClearColor(Zt),Rt=z.getClearAlpha(),Rt<1&&z.setClearColor(16777215,.5),z.clear(),at&&ge.render(pt);const fe=z.toneMapping;z.toneMapping=la;const _e=ut.viewport;if(ut.viewport!==void 0&&(ut.viewport=void 0),w.setupLightsView(ut),le===!0&&qt.setGlobalState(z.clippingPlanes,ut),Xi(R,pt,ut),xt.updateMultisampleRenderTarget(Ht),xt.updateRenderTargetMipmap(Ht),se.has("WEBGL_multisampled_render_to_texture")===!1){let Kt=!1;for(let Ce=0,Ee=W.length;Ce<Ee;Ce++){const Qe=W[Ce],{object:Xe,geometry:vn,material:Gt,group:ln}=Qe;if(Gt.side===Fi&&Xe.layers.test(ut.layers)){const ze=Gt.side;Gt.side=jn,Gt.needsUpdate=!0,wl(Xe,pt,ut,vn,Gt,ln),Gt.side=ze,Gt.needsUpdate=!0,Kt=!0}}Kt===!0&&(xt.updateMultisampleRenderTarget(Ht),xt.updateRenderTargetMipmap(Ht))}z.setRenderTarget(It,Jt,te),z.setClearColor(Zt,Rt),_e!==void 0&&(ut.viewport=_e),z.toneMapping=fe}function Xi(R,W,pt){const ut=W.isScene===!0?W.overrideMaterial:null;for(let ft=0,Ht=R.length;ft<Ht;ft++){const Yt=R[ft],{object:It,geometry:Jt,group:te}=Yt;let fe=Yt.material;fe.allowOverride===!0&&ut!==null&&(fe=ut),It.layers.test(pt.layers)&&wl(It,W,pt,Jt,fe,te)}}function wl(R,W,pt,ut,ft,Ht){Q!==null&&ft.isNodeMaterial&&Q.setObject(R,ft),R.onBeforeRender(z,W,pt,ut,ft,Ht),R.modelViewMatrix.multiplyMatrices(pt.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),ft.onBeforeRender(z,W,pt,ut,R,Ht),ft.transparent===!0&&ft.side===Fi&&ft.forceSinglePass===!1?(ft.side=jn,ft.needsUpdate=!0,z.renderBufferDirect(pt,W,ut,ft,R,Ht),ft.side=Qs,ft.needsUpdate=!0,z.renderBufferDirect(pt,W,ut,ft,R,Ht),ft.side=Fi):z.renderBufferDirect(pt,W,ut,ft,R,Ht),R.onAfterRender(z,W,pt,ut,ft,Ht)}function bs(R,W,pt){W.isScene!==!0&&(W=Ge);const ut=lt.get(R),ft=w.state.lights,Ht=w.state.shadowsArray,Yt=ft.state.version,It=Lt.getParameters(R,ft.state,Ht,W,pt,w.state.lightProbeGridArray),Jt=Lt.getProgramCacheKey(It);let te=ut.programs;ut.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?W.environment:null,ut.fog=W.fog;const fe=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;ut.envMap=Dt.get(R.envMap||ut.environment,fe),ut.envMapRotation=ut.environment!==null&&R.envMap===null?W.environmentRotation:R.envMapRotation,te===void 0&&(R.addEventListener("dispose",gi),te=new Map,ut.programs=te);let _e=te.get(Jt);if(_e!==void 0){if(ut.currentProgram===_e&&ut.lightsStateVersion===Yt)return po(R,It),_e}else It.uniforms=Lt.getUniforms(R),Q!==null&&R.isNodeMaterial&&Q.build(R,pt,It),R.onBeforeCompile(It,z),_e=Lt.acquireProgram(It,Jt),te.set(Jt,_e),ut.uniforms=It.uniforms;const Kt=ut.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(Kt.clippingPlanes=qt.uniform),po(R,It),ut.needsLights=Nl(R),ut.lightsStateVersion=Yt,ut.needsLights&&(Kt.ambientLightColor.value=ft.state.ambient,Kt.lightProbe.value=ft.state.probe,Kt.sunLights.value=ft.state.sun,Kt.sunLightShadows.value=ft.state.sunShadow,Kt.directionalLights.value=ft.state.directional,Kt.directionalLightShadows.value=ft.state.directionalShadow,Kt.spotLights.value=ft.state.spot,Kt.spotLightShadows.value=ft.state.spotShadow,Kt.rectAreaLights.value=ft.state.rectArea,Kt.ltc_1.value=ft.state.rectAreaLTC1,Kt.ltc_2.value=ft.state.rectAreaLTC2,Kt.pointLights.value=ft.state.point,Kt.pointLightShadows.value=ft.state.pointShadow,Kt.hemisphereLights.value=ft.state.hemi,Kt.sunShadowMatrix.value=ft.state.sunShadowMatrix,Kt.sunShadowCascade.value=ft.state.sunShadowCascade,Kt.directionalShadowMatrix.value=ft.state.directionalShadowMatrix,Kt.spotLightMatrix.value=ft.state.spotLightMatrix,Kt.spotLightMap.value=ft.state.spotLightMap,Kt.pointShadowMatrix.value=ft.state.pointShadowMatrix),ut.lightProbeGrid=w.state.lightProbeGridArray.length>0,ut.currentProgram=_e,ut.uniformsList=null,_e}function ho(R){if(R.uniformsList===null){const W=R.currentProgram.getUniforms();R.uniformsList=Nu.seqWithValue(W.seq,R.uniforms)}return R.uniformsList}function po(R,W){const pt=lt.get(R);pt.outputColorSpace=W.outputColorSpace,pt.batching=W.batching,pt.batchingColor=W.batchingColor,pt.instancing=W.instancing,pt.instancingColor=W.instancingColor,pt.instancingMorph=W.instancingMorph,pt.skinning=W.skinning,pt.morphTargets=W.morphTargets,pt.morphNormals=W.morphNormals,pt.morphColors=W.morphColors,pt.morphTargetsCount=W.morphTargetsCount,pt.numClippingPlanes=W.numClippingPlanes,pt.numIntersection=W.numClipIntersection,pt.vertexAlphas=W.vertexAlphas,pt.vertexTangents=W.vertexTangents,pt.toneMapping=W.toneMapping}function mo(R,W){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;D.setFromMatrixPosition(W.matrixWorld);for(let pt=0,ut=R.length;pt<ut;pt++){const ft=R[pt];if(ft.texture!==null&&ft.boundingBox.containsPoint(D))return ft}return null}function go(R,W,pt,ut,ft){W.isScene!==!0&&(W=Ge),xt.resetTextureUnits();const Ht=W.fog,Yt=ut.isMeshStandardMaterial||ut.isMeshLambertMaterial||ut.isMeshPhongMaterial?W.environment:null,It=st===null?z.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:Be.workingColorSpace,Jt=ut.isMeshStandardMaterial||ut.isMeshLambertMaterial&&!ut.envMap||ut.isMeshPhongMaterial&&!ut.envMap,te=Dt.get(ut.envMap||Yt,Jt),fe=ut.vertexColors===!0&&!!pt.attributes.color&&pt.attributes.color.itemSize===4,_e=!!pt.attributes.tangent&&(!!ut.normalMap||ut.anisotropy>0),Kt=!!pt.morphAttributes.position,Ce=!!pt.morphAttributes.normal,Ee=!!pt.morphAttributes.color;let Qe=la;ut.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(Qe=z.toneMapping);const Xe=pt.morphAttributes.position||pt.morphAttributes.normal||pt.morphAttributes.color,vn=Xe!==void 0?Xe.length:0,Gt=lt.get(ut),ln=w.state.lights;if(le===!0&&(xe===!0||R!==H)){const Le=R===H&&ut.id===Y;qt.setState(ut,R,Le)}let ze=!1;ut.version===Gt.__version?(Gt.needsLights&&Gt.lightsStateVersion!==ln.state.version||Gt.outputColorSpace!==It||ft.isBatchedMesh&&Gt.batching===!1||!ft.isBatchedMesh&&Gt.batching===!0||ft.isBatchedMesh&&Gt.batchingColor===!0&&ft._colorsTexture===null||ft.isBatchedMesh&&Gt.batchingColor===!1&&ft._colorsTexture!==null||ft.isInstancedMesh&&Gt.instancing===!1||!ft.isInstancedMesh&&Gt.instancing===!0||ft.isSkinnedMesh&&Gt.skinning===!1||!ft.isSkinnedMesh&&Gt.skinning===!0||ft.isInstancedMesh&&Gt.instancingColor===!0&&ft.instanceColor===null||ft.isInstancedMesh&&Gt.instancingColor===!1&&ft.instanceColor!==null||ft.isInstancedMesh&&Gt.instancingMorph===!0&&ft.morphTexture===null||ft.isInstancedMesh&&Gt.instancingMorph===!1&&ft.morphTexture!==null||Gt.envMap!==te||ut.fog===!0&&Gt.fog!==Ht||Gt.numClippingPlanes!==void 0&&(Gt.numClippingPlanes!==qt.numPlanes||Gt.numIntersection!==qt.numIntersection)||Gt.vertexAlphas!==fe||Gt.vertexTangents!==_e||Gt.morphTargets!==Kt||Gt.morphNormals!==Ce||Gt.morphColors!==Ee||Gt.toneMapping!==Qe||Gt.morphTargetsCount!==vn||!!Gt.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(ze=!0):(ze=!0,Gt.__version=ut.version);let Hn=Gt.currentProgram;ze===!0&&(Hn=bs(ut,W,ft),Q&&ut.isNodeMaterial&&Q.onUpdateProgram(ut,Hn,Gt));let ni=!1,Wi=!1,Te=!1;const Ve=Hn.getUniforms(),tn=Gt.uniforms;if(E.useProgram(Hn.program)&&(ni=!0,Wi=!0,Te=!0),ut.id!==Y&&(Y=ut.id,Wi=!0),Gt.needsLights){const Le=mo(w.state.lightProbeGridArray,ft);Gt.lightProbeGrid!==Le&&(Gt.lightProbeGrid=Le,Wi=!0)}if(ni||H!==R){E.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),Ve.setValue(G,"projectionMatrix",R.projectionMatrix),Ve.setValue(G,"viewMatrix",R.matrixWorldInverse);const cn=Ve.map.cameraPosition;cn!==void 0&&cn.setValue(G,ae.setFromMatrixPosition(R.matrixWorld)),I.logarithmicDepthBuffer&&Ve.setValue(G,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),(ut.isMeshPhongMaterial||ut.isMeshToonMaterial||ut.isMeshLambertMaterial||ut.isMeshBasicMaterial||ut.isMeshStandardMaterial||ut.isShaderMaterial)&&Ve.setValue(G,"isOrthographic",R.isOrthographicCamera===!0),H!==R&&(H=R,Wi=!0,Te=!0)}if(Gt.needsLights&&(ln.state.sunShadowMap.length>0&&Ve.setValue(G,"sunShadowMap",ln.state.sunShadowMap,xt),ln.state.directionalShadowMap.length>0&&Ve.setValue(G,"directionalShadowMap",ln.state.directionalShadowMap,xt),ln.state.spotShadowMap.length>0&&Ve.setValue(G,"spotShadowMap",ln.state.spotShadowMap,xt),ln.state.pointShadowMap.length>0&&Ve.setValue(G,"pointShadowMap",ln.state.pointShadowMap,xt)),ft.isSkinnedMesh){Ve.setOptional(G,ft,"bindMatrix"),Ve.setOptional(G,ft,"bindMatrixInverse");const Le=ft.skeleton;Le&&(Le.boneTexture===null&&Le.computeBoneTexture(),Ve.setValue(G,"boneTexture",Le.boneTexture,xt))}ft.isBatchedMesh&&(Ve.setOptional(G,ft,"batchingTexture"),Ve.setValue(G,"batchingTexture",ft._matricesTexture,xt),Ve.setOptional(G,ft,"batchingIdTexture"),Ve.setValue(G,"batchingIdTexture",ft._indirectTexture,xt),Ve.setOptional(G,ft,"batchingColorTexture"),ft._colorsTexture!==null&&Ve.setValue(G,"batchingColorTexture",ft._colorsTexture,xt));const ii=pt.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&Z.update(ft,pt,Hn),(Wi||Gt.receiveShadow!==ft.receiveShadow)&&(Gt.receiveShadow=ft.receiveShadow,Ve.setValue(G,"receiveShadow",ft.receiveShadow)),(ut.isMeshStandardMaterial||ut.isMeshLambertMaterial||ut.isMeshPhongMaterial)&&ut.envMap===null&&W.environment!==null&&(tn.envMapIntensity.value=W.environmentIntensity),tn.dfgLUT!==void 0&&(tn.dfgLUT.value=sw()),Wi){if(Ve.setValue(G,"toneMappingExposure",z.toneMappingExposure),Gt.needsLights&&Dl(tn,Te),Ht&&ut.fog===!0&&ie.refreshFogUniforms(tn,Ht),ie.refreshMaterialUniforms(tn,ut,mt,rt,w.state.transmissionRenderTarget[R.id]),Gt.needsLights&&Gt.lightProbeGrid){const Le=Gt.lightProbeGrid;tn.probesSH.value=Le.texture,tn.probesMin.value.copy(Le.boundingBox.min),tn.probesMax.value.copy(Le.boundingBox.max),tn.probesResolution.value.copy(Le.resolution)}Nu.upload(G,ho(Gt),tn,xt)}if(ut.isShaderMaterial&&ut.uniformsNeedUpdate===!0&&(Nu.upload(G,ho(Gt),tn,xt),ut.uniformsNeedUpdate=!1),ut.isSpriteMaterial&&Ve.setValue(G,"center",ft.center),Ve.setValue(G,"modelViewMatrix",ft.modelViewMatrix),Ve.setValue(G,"normalMatrix",ft.normalMatrix),Ve.setValue(G,"modelMatrix",ft.matrixWorld),ut.uniformsGroups!==void 0){const Le=ut.uniformsGroups;for(let cn=0,pa=Le.length;cn<pa;cn++){const Ul=Le[cn];Et.update(Ul,Hn),Et.bind(Ul,Hn)}}return Hn}function Dl(R,W){R.ambientLightColor.needsUpdate=W,R.lightProbe.needsUpdate=W,R.sunLights.needsUpdate=W,R.sunLightShadows.needsUpdate=W,R.directionalLights.needsUpdate=W,R.directionalLightShadows.needsUpdate=W,R.pointLights.needsUpdate=W,R.pointLightShadows.needsUpdate=W,R.spotLights.needsUpdate=W,R.spotLightShadows.needsUpdate=W,R.rectAreaLights.needsUpdate=W,R.hemisphereLights.needsUpdate=W}function Nl(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return st},this.setRenderTargetTextures=function(R,W,pt){const ut=lt.get(R);ut.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,ut.__autoAllocateDepthBuffer===!1&&(ut.__useRenderToTexture=!1),lt.get(R.texture).__webglTexture=W,lt.get(R.depthTexture).__webglTexture=ut.__autoAllocateDepthBuffer?void 0:pt,ut.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,W){const pt=lt.get(R);pt.__webglFramebuffer=W,pt.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(R,W=0,pt=0){st=R,F=W,X=pt;let ut=null,ft=!1,Ht=!1;if(R){const It=lt.get(R);if(It.__useDefaultFramebuffer!==void 0){E.bindFramebuffer(G.FRAMEBUFFER,It.__webglFramebuffer),J.copy(R.viewport),Tt.copy(R.scissor),bt=R.scissorTest,E.viewport(J),E.scissor(Tt),E.setScissorTest(bt),Y=-1;return}else if(It.__webglFramebuffer===void 0)xt.setupRenderTarget(R);else if(It.__hasExternalTextures)xt.rebindTextures(R,lt.get(R.texture).__webglTexture,lt.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const fe=R.depthTexture;if(It.__boundDepthTexture!==fe){if(fe!==null&&lt.has(fe)&&(R.width!==fe.image.width||R.height!==fe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");xt.setupDepthRenderbuffer(R)}}const Jt=R.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Ht=!0);const te=lt.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(te[W])?ut=te[W][pt]:ut=te[W],ft=!0):R.samples>0&&xt.useMultisampledRTT(R)===!1?ut=lt.get(R).__webglMultisampledFramebuffer:Array.isArray(te)?ut=te[pt]:ut=te,J.copy(R.viewport),Tt.copy(R.scissor),bt=R.scissorTest}else J.copy(gt).multiplyScalar(mt).floor(),Tt.copy(Nt).multiplyScalar(mt).floor(),bt=Ue;if(pt!==0&&(ut=ct),E.bindFramebuffer(G.FRAMEBUFFER,ut)&&E.drawBuffers(R,ut),E.viewport(J),E.scissor(Tt),E.setScissorTest(bt),ft){const It=lt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+W,It.__webglTexture,pt)}else if(Ht){const It=W;for(let Jt=0;Jt<R.textures.length;Jt++){const te=lt.get(R.textures[Jt]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Jt,te.__webglTexture,pt,It)}}else if(R!==null&&pt!==0){const It=lt.get(R.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,It.__webglTexture,pt)}Y=-1};function xi(R){const W=lt.get(R);return(W.__readFormat!==R.format||W.__readType!==R.type)&&(W.__readFormat=R.format,W.__readType=R.type,W.__formatReadable=I.textureFormatReadable(R.format),W.__typeReadable=I.textureTypeReadable(R.type)),W}this.readRenderTargetPixels=function(R,W,pt,ut,ft,Ht,Yt,It=0){if(!(R&&R.isWebGLRenderTarget)){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Jt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Yt!==void 0&&(Jt=Jt[Yt]),Jt){E.bindFramebuffer(G.FRAMEBUFFER,Jt);try{const te=R.textures[It],fe=te.format,_e=te.type;R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+It);const Kt=xi(te);if(Kt.__formatReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Kt.__typeReadable===!1){He("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=R.width-ut&&pt>=0&&pt<=R.height-ft&&G.readPixels(W,pt,ut,ft,Pt.convert(fe),Pt.convert(_e),Ht)}finally{const te=st!==null?lt.get(st).__webglFramebuffer:null;E.bindFramebuffer(G.FRAMEBUFFER,te)}}},this.readRenderTargetPixelsAsync=async function(R,W,pt,ut,ft,Ht,Yt,It=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Jt=lt.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&Yt!==void 0&&(Jt=Jt[Yt]),Jt)if(W>=0&&W<=R.width-ut&&pt>=0&&pt<=R.height-ft){E.bindFramebuffer(G.FRAMEBUFFER,Jt);const te=R.textures[It],fe=te.format,_e=te.type;R.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+It);const Kt=xi(te);if(Kt.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Kt.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ce=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,Ce),G.bufferData(G.PIXEL_PACK_BUFFER,Ht.byteLength,G.STREAM_READ),G.readPixels(W,pt,ut,ft,Pt.convert(fe),Pt.convert(_e),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Ee=st!==null?lt.get(st).__webglFramebuffer:null;E.bindFramebuffer(G.FRAMEBUFFER,Ee);const Qe=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await vE(G,Qe,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,Ce),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Ht),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(Ce),G.deleteSync(Qe),Ht}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,W=null,pt=0){const ut=Math.pow(2,-pt),ft=Math.floor(R.image.width*ut),Ht=Math.floor(R.image.height*ut),Yt=W!==null?W.x:0,It=W!==null?W.y:0;xt.setTexture2D(R,0),G.copyTexSubImage2D(G.TEXTURE_2D,pt,0,0,Yt,It,ft,Ht),E.unbindTexture()},this.copyTextureToTexture=function(R,W,pt=null,ut=null,ft=0,Ht=0){let Yt,It,Jt,te,fe,_e,Kt,Ce,Ee;const Qe=R.isCompressedTexture?R.mipmaps[Ht]:R.image;if(pt!==null)Yt=pt.max.x-pt.min.x,It=pt.max.y-pt.min.y,Jt=pt.isBox3?pt.max.z-pt.min.z:1,te=pt.min.x,fe=pt.min.y,_e=pt.isBox3?pt.min.z:0;else{const tn=Math.pow(2,-ft);Yt=Math.floor(Qe.width*tn),It=Math.floor(Qe.height*tn),R.isDataArrayTexture?Jt=Qe.depth:R.isData3DTexture?Jt=Math.floor(Qe.depth*tn):Jt=1,te=0,fe=0,_e=0}ut!==null?(Kt=ut.x,Ce=ut.y,Ee=ut.z):(Kt=0,Ce=0,Ee=0);const Xe=Pt.convert(W.format),vn=Pt.convert(W.type);let Gt;W.isData3DTexture?(xt.setTexture3D(W,0),Gt=G.TEXTURE_3D):W.isDataArrayTexture||W.isCompressedArrayTexture?(xt.setTexture2DArray(W,0),Gt=G.TEXTURE_2D_ARRAY):(xt.setTexture2D(W,0),Gt=G.TEXTURE_2D),E.activeTexture(G.TEXTURE0),E.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,W.flipY),E.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,W.premultiplyAlpha),E.pixelStorei(G.UNPACK_ALIGNMENT,W.unpackAlignment);const ln=E.getParameter(G.UNPACK_ROW_LENGTH),ze=E.getParameter(G.UNPACK_IMAGE_HEIGHT),Hn=E.getParameter(G.UNPACK_SKIP_PIXELS),ni=E.getParameter(G.UNPACK_SKIP_ROWS),Wi=E.getParameter(G.UNPACK_SKIP_IMAGES);E.pixelStorei(G.UNPACK_ROW_LENGTH,Qe.width),E.pixelStorei(G.UNPACK_IMAGE_HEIGHT,Qe.height),E.pixelStorei(G.UNPACK_SKIP_PIXELS,te),E.pixelStorei(G.UNPACK_SKIP_ROWS,fe),E.pixelStorei(G.UNPACK_SKIP_IMAGES,_e);const Te=R.isDataArrayTexture||R.isData3DTexture,Ve=W.isDataArrayTexture||W.isData3DTexture;if(R.isDepthTexture){const tn=lt.get(R),ii=lt.get(W),Le=lt.get(tn.__renderTarget),cn=lt.get(ii.__renderTarget);E.bindFramebuffer(G.READ_FRAMEBUFFER,Le.__webglFramebuffer),E.bindFramebuffer(G.DRAW_FRAMEBUFFER,cn.__webglFramebuffer);for(let pa=0;pa<Jt;pa++)Te&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,lt.get(R).__webglTexture,ft,_e+pa),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,lt.get(W).__webglTexture,Ht,Ee+pa)),G.blitFramebuffer(te,fe,Yt,It,Kt,Ce,Yt,It,G.DEPTH_BUFFER_BIT,G.NEAREST);E.bindFramebuffer(G.READ_FRAMEBUFFER,null),E.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(ft!==0||R.isRenderTargetTexture||lt.has(R)){const tn=lt.get(R),ii=lt.get(W);E.bindFramebuffer(G.READ_FRAMEBUFFER,q),E.bindFramebuffer(G.DRAW_FRAMEBUFFER,it);for(let Le=0;Le<Jt;Le++)Te?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,tn.__webglTexture,ft,_e+Le):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,tn.__webglTexture,ft),Ve?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ii.__webglTexture,Ht,Ee+Le):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ii.__webglTexture,Ht),ft!==0?G.blitFramebuffer(te,fe,Yt,It,Kt,Ce,Yt,It,G.COLOR_BUFFER_BIT,G.NEAREST):Ve?G.copyTexSubImage3D(Gt,Ht,Kt,Ce,Ee+Le,te,fe,Yt,It):G.copyTexSubImage2D(Gt,Ht,Kt,Ce,te,fe,Yt,It);E.bindFramebuffer(G.READ_FRAMEBUFFER,null),E.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Ve?R.isDataTexture||R.isData3DTexture?G.texSubImage3D(Gt,Ht,Kt,Ce,Ee,Yt,It,Jt,Xe,vn,Qe.data):W.isCompressedArrayTexture?G.compressedTexSubImage3D(Gt,Ht,Kt,Ce,Ee,Yt,It,Jt,Xe,Qe.data):G.texSubImage3D(Gt,Ht,Kt,Ce,Ee,Yt,It,Jt,Xe,vn,Qe):R.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Ht,Kt,Ce,Yt,It,Xe,vn,Qe.data):R.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Ht,Kt,Ce,Qe.width,Qe.height,Xe,Qe.data):G.texSubImage2D(G.TEXTURE_2D,Ht,Kt,Ce,Yt,It,Xe,vn,Qe);E.pixelStorei(G.UNPACK_ROW_LENGTH,ln),E.pixelStorei(G.UNPACK_IMAGE_HEIGHT,ze),E.pixelStorei(G.UNPACK_SKIP_PIXELS,Hn),E.pixelStorei(G.UNPACK_SKIP_ROWS,ni),E.pixelStorei(G.UNPACK_SKIP_IMAGES,Wi),Ht===0&&W.generateMipmaps&&G.generateMipmap(Gt),E.unbindTexture()},this.initRenderTarget=function(R){lt.get(R).__webglFramebuffer===void 0&&xt.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?xt.setTextureCube(R,0):R.isData3DTexture?xt.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?xt.setTexture2DArray(R,0):xt.setTexture2D(R,0),E.unbindTexture()},this.resetState=function(){F=0,X=0,st=null,E.reset(),jt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return oa}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorSpace=Be._getDrawingBufferColorSpace(e),i.unpackColorSpace=Be._getUnpackColorSpace()}}const U_={type:"change"},hm={type:"start"},Sy={type:"end"},Eu=new Rl,L_=new La,ow=Math.cos(70*SE.DEG2RAD),yn=new nt,ti=2*Math.PI,Ke={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},np=1e-6;class lw extends l1{constructor(e,i=null){super(e,i),this.state=Ke.NONE,this.target=new nt,this.cursor=new nt,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:ao.ROTATE,MIDDLE:ao.DOLLY,RIGHT:ao.PAN},this.touches={ONE:no.ROTATE,TWO:no.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._cursorStyle="auto",this._domElementKeyEvents=null,this._lastPosition=new nt,this._lastQuaternion=new vs,this._lastTargetPosition=new nt,this._quat=new vs().setFromUnitVectors(e.up,new nt(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new l_,this._sphericalDelta=new l_,this._scale=1,this._panOffset=new nt,this._rotateStart=new he,this._rotateEnd=new he,this._rotateDelta=new he,this._panStart=new he,this._panEnd=new he,this._panDelta=new he,this._dollyStart=new he,this._dollyEnd=new he,this._dollyDelta=new he,this._dollyDirection=new nt,this._mouse=new he,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=uw.bind(this),this._onPointerDown=cw.bind(this),this._onPointerUp=fw.bind(this),this._onContextMenu=vw.bind(this),this._onMouseWheel=pw.bind(this),this._onKeyDown=mw.bind(this),this._onTouchStart=gw.bind(this),this._onTouchMove=xw.bind(this),this._onMouseDown=dw.bind(this),this._onMouseMove=hw.bind(this),this._interceptControlDown=_w.bind(this),this._interceptControlUp=yw.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}set cursorStyle(e){this._cursorStyle=e,e==="grab"?this.domElement.style.cursor="grab":this.domElement.style.cursor="auto"}get cursorStyle(){return this._cursorStyle}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.state=Ke.NONE,this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents();const e=this.domElement.getRootNode();e.removeEventListener("keydown",this._interceptControlDown,{capture:!0}),e.removeEventListener("keyup",this._interceptControlUp,{capture:!0}),this._controlActive=!1,this._pointers.length=0,this._pointerPositions={},this.domElement.style.touchAction="",this.domElement.style.cursor="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(U_),this.update(),this.state=Ke.NONE}pan(e,i){this._pan(e,i),this.update()}dollyIn(e){this._dollyIn(e),this.update()}dollyOut(e){this._dollyOut(e),this.update()}rotateLeft(e){this._rotateLeft(e),this.update()}rotateUp(e){this._rotateUp(e),this.update()}update(e=null){const i=this.object.position;yn.copy(i).sub(this.target),yn.applyQuaternion(this._quat),this._spherical.setFromVector3(yn),this.autoRotate&&this.state===Ke.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let s=this.minAzimuthAngle,l=this.maxAzimuthAngle;isFinite(s)&&isFinite(l)&&(s<-Math.PI?s+=ti:s>Math.PI&&(s-=ti),l<-Math.PI?l+=ti:l>Math.PI&&(l-=ti),s<=l?this._spherical.theta=Math.max(s,Math.min(l,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(s+l)/2?Math.max(s,this._spherical.theta):Math.min(l,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let f=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const d=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),f=d!=this._spherical.radius}if(yn.setFromSpherical(this._spherical),yn.applyQuaternion(this._quatInverse),i.copy(this.target).add(yn),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let d=null;if(this.object.isPerspectiveCamera){const h=yn.length();d=this._clampDistance(h*this._scale);const p=h-d;this.object.position.addScaledVector(this._dollyDirection,p),this.object.updateMatrixWorld(),f=!!p}else if(this.object.isOrthographicCamera){const h=new nt(this._mouse.x,this._mouse.y,0);h.unproject(this.object);const p=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),f=p!==this.object.zoom;const m=new nt(this._mouse.x,this._mouse.y,0);m.unproject(this.object),this.object.position.sub(m).add(h),this.object.updateMatrixWorld(),d=yn.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;d!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(d).add(this.object.position):(Eu.origin.copy(this.object.position),Eu.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Eu.direction))<ow?this.object.lookAt(this.target):(L_.setFromNormalAndCoplanarPoint(this.object.up,this.target),Eu.intersectPlane(L_,this.target))))}else if(this.object.isOrthographicCamera){const d=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),d!==this.object.zoom&&(this.object.updateProjectionMatrix(),f=!0)}return this._scale=1,this._performCursorZoom=!1,f||this._lastPosition.distanceToSquared(this.object.position)>np||8*(1-this._lastQuaternion.dot(this.object.quaternion))>np||this._lastTargetPosition.distanceToSquared(this.target)>np?(this.dispatchEvent(U_),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?ti/60*this.autoRotateSpeed*e:ti/60/60*this.autoRotateSpeed}_getZoomScale(e){const i=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*i)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,i){yn.setFromMatrixColumn(i,0),yn.multiplyScalar(-e),this._panOffset.add(yn)}_panUp(e,i){this.screenSpacePanning===!0?yn.setFromMatrixColumn(i,1):(yn.setFromMatrixColumn(i,0),yn.crossVectors(this.object.up,yn)),yn.multiplyScalar(e),this._panOffset.add(yn)}_pan(e,i){const s=this.domElement;if(this.object.isPerspectiveCamera){const l=this.object.position;yn.copy(l).sub(this.target);let f=yn.length();f*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*f/s.clientHeight,this.object.matrix),this._panUp(2*i*f/s.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/s.clientWidth,this.object.matrix),this._panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/s.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,i){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const s=this.domElement.getBoundingClientRect(),l=e-s.left,f=i-s.top,d=s.width,h=s.height;this._mouse.x=l/d*2-1,this._mouse.y=-(f/h)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let i=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),i=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),i=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),i=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-ti*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),i=!0;break}i&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._rotateStart.set(s,l)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panStart.set(s,l)}}_handleTouchStartDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyStart.set(0,f)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const s=this._getSecondPointerPosition(e),l=.5*(e.pageX+s.x),f=.5*(e.pageY+s.y);this._rotateEnd.set(l,f)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const i=this.domElement;this._rotateLeft(ti*this._rotateDelta.x/i.clientHeight),this._rotateUp(ti*this._rotateDelta.y/i.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),l=.5*(e.pageY+i.y);this._panEnd.set(s,l)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const i=this._getSecondPointerPosition(e),s=e.pageX-i.x,l=e.pageY-i.y,f=Math.sqrt(s*s+l*l);this._dollyEnd.set(0,f),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const d=(e.pageX+i.x)*.5,h=(e.pageY+i.y)*.5;this._updateZoomParameters(d,h)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId){this._pointers.splice(i,1);return}}_isTrackingPointer(e){for(let i=0;i<this._pointers.length;i++)if(this._pointers[i]==e.pointerId)return!0;return!1}_trackPointer(e){let i=this._pointerPositions[e.pointerId];i===void 0&&(i=new he,this._pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const i=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[i]}_customWheelEvent(e){const i=e.deltaMode,s={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(i){case 1:s.deltaY*=16;break;case 2:s.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(s.deltaY*=10),s}}function cw(o){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(o.pointerId),this.domElement.ownerDocument.addEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(o)&&(this._addPointer(o),o.pointerType==="touch"?this._onTouchStart(o):this._onMouseDown(o),this._cursorStyle==="grab"&&(this.domElement.style.cursor="grabbing")))}function uw(o){this.enabled!==!1&&(o.pointerType==="touch"?this._onTouchMove(o):this._onMouseMove(o))}function fw(o){switch(this._removePointer(o),this._pointers.length){case 0:this.domElement.releasePointerCapture(o.pointerId),this.domElement.ownerDocument.removeEventListener("pointermove",this._onPointerMove),this.domElement.ownerDocument.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Sy),this.state=Ke.NONE,this._cursorStyle==="grab"&&(this.domElement.style.cursor="grab");break;case 1:const e=this._pointers[0],i=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:i.x,pageY:i.y});break}}function dw(o){let e;switch(o.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case ao.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(o),this.state=Ke.DOLLY;break;case ao.ROTATE:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ke.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ke.ROTATE}break;case ao.PAN:if(o.ctrlKey||o.metaKey||o.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(o),this.state=Ke.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(o),this.state=Ke.PAN}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(hm)}function hw(o){switch(this.state){case Ke.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(o);break;case Ke.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(o);break;case Ke.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(o);break}}function pw(o){this.enabled===!1||this.enableZoom===!1||this.state!==Ke.NONE||(o.preventDefault(),this.dispatchEvent(hm),this._handleMouseWheel(this._customWheelEvent(o)),this.dispatchEvent(Sy))}function mw(o){this.enabled!==!1&&this._handleKeyDown(o)}function gw(o){switch(this._trackPointer(o),this._pointers.length){case 1:switch(this.touches.ONE){case no.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(o),this.state=Ke.TOUCH_ROTATE;break;case no.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(o),this.state=Ke.TOUCH_PAN;break;default:this.state=Ke.NONE}break;case 2:switch(this.touches.TWO){case no.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(o),this.state=Ke.TOUCH_DOLLY_PAN;break;case no.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(o),this.state=Ke.TOUCH_DOLLY_ROTATE;break;default:this.state=Ke.NONE}break;default:this.state=Ke.NONE}this.state!==Ke.NONE&&this.dispatchEvent(hm)}function xw(o){switch(this._trackPointer(o),this.state){case Ke.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(o),this.update();break;case Ke.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(o),this.update();break;case Ke.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(o),this.update();break;case Ke.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(o),this.update();break;default:this.state=Ke.NONE}}function vw(o){this.enabled!==!1&&o.preventDefault()}function _w(o){o.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function yw(o){o.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Sw=({memories:o,status:e,conflicts:i=[],onSelectMemory:s,onResolveConflict:l})=>{const f=wt.useRef(null),[d,h]=wt.useState("all"),[p,m]=wt.useState(!0),[v,M]=wt.useState(null),[x,b]=wt.useState({x:0,y:0}),[T,L]=wt.useState([]),[y,_]=wt.useState(null),N=wt.useRef(p);N.current=p;const V=wt.useRef(null),D=wt.useRef(null),U=wt.useRef(null),w=wt.useRef(null),O=wt.useRef([]),A=wt.useRef(null),P=wt.useRef(null),z=wt.useRef(null),k=wt.useRef(null),Q=wt.useRef(null),ct=wt.useRef(null),q=wt.useMemo(()=>{const H=new Set;return i.forEach(J=>{H.add(J.memory_a_id),H.add(J.memory_b_id)}),H},[i]),it=wt.useMemo(()=>o.filter(H=>d==="rules"?H.kind==="rule":d==="traps"?H.kind==="error_trap":d==="conflicts"?q.has(H.id):!0),[o,d,q]);wt.useEffect(()=>{const H=f.current;if(!H)return;const J=H.clientWidth,Tt=H.clientHeight||640,bt=new PE;bt.background=new Re(592139),bt.fog=new um(592139,.015),V.current=bt;const Zt=new wi(55,J/Tt,.1,300);Zt.position.set(0,12,34),Zt.lookAt(0,0,0),D.current=Zt;const Rt=new rw({antialias:!0,alpha:!1,powerPreference:"high-performance"});Rt.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),Rt.setSize(J,Tt),Rt.toneMapping=$p,Rt.toneMappingExposure=1.1,H.appendChild(Rt.domElement),U.current=Rt;const Xt=new lw(Zt,Rt.domElement);Xt.enableDamping=!0,Xt.dampingFactor=.05,Xt.autoRotate=!0,Xt.autoRotateSpeed=.45,Xt.minDistance=6,Xt.maxDistance=90,Xt.maxPolarAngle=Math.PI*.85,w.current=Xt;const rt=new a1(16777215,.7);bt.add(rt);const mt=new a_(3718648,1.2);mt.position.set(10,20,15),bt.add(mt);const At=new a_(16498468,.8);At.position.set(-15,-10,-10),bt.add(At);const Wt=new o1(60,30,2565930,1579035);Wt.position.y=-12,Wt.material.transparent=!0,Wt.material.opacity=.25,bt.add(Wt);const gt=350,Nt=new Pn,Ue=new Float32Array(gt*3);for(let ue=0;ue<gt*3;ue+=3)Ue[ue]=(Math.random()-.5)*90,Ue[ue+1]=(Math.random()-.5)*60,Ue[ue+2]=(Math.random()-.5)*90;Nt.setAttribute("position",new ca(Ue,3));const pe=new ry({color:9741240,size:.18,transparent:!0,opacity:.45}),le=new jE(Nt,pe);bt.add(le),ct.current=le;let xe;const $t=()=>{if(xe=requestAnimationFrame($t),ct.current&&(ct.current.rotation.y+=3e-4),z.current){const G=(Math.sin(Date.now()*.007)+1)*.5;z.current.opacity=.4+.6*G}k.current&&Zt&&(Zt.position.lerp(k.current,.06),Zt.position.distanceTo(k.current)<.04&&(k.current=null)),Q.current&&Xt&&(Xt.target.lerp(Q.current,.06),Xt.target.distanceTo(Q.current)<.04&&(Q.current=null)),Xt.autoRotate=N.current,Xt.update();const ue=H.clientWidth/2,Ge=H.clientHeight/2,at=new nt,Ct=[];O.current.forEach((G,me)=>{(G.isConflicted||G.isTrap||me<5)&&(at.copy(G.position),at.project(Zt),at.z<1&&at.x>=-.9&&at.x<=.9&&at.y>=-.9&&at.y<=.9&&Ct.push({id:G.id,title:G.memory.title,isTrap:G.isTrap,isConflicted:G.isConflicted,x:at.x*ue+ue,y:-(at.y*Ge)+Ge,visible:!0}))}),L(Ct),Rt.render(bt,Zt)};$t();const ae=()=>{if(!H||!Rt||!Zt)return;const ue=H.clientWidth,Ge=H.clientHeight||640;Zt.aspect=ue/Ge,Zt.updateProjectionMatrix(),Rt.setSize(ue,Ge)};return window.addEventListener("resize",ae),()=>{cancelAnimationFrame(xe),window.removeEventListener("resize",ae),Xt.dispose(),Rt.dispose(),Rt.domElement&&H.contains(Rt.domElement)&&H.removeChild(Rt.domElement)}},[]),wt.useEffect(()=>{const H=V.current;if(!H)return;O.current.forEach(Rt=>{H.remove(Rt.mesh),H.remove(Rt.halo),Rt.ring&&H.remove(Rt.ring),Rt.conflictRing&&H.remove(Rt.conflictRing),Rt.mesh.geometry.dispose(),Rt.halo.geometry.dispose(),Rt.ring&&Rt.ring.geometry.dispose(),Rt.conflictRing&&Rt.conflictRing.geometry.dispose()}),O.current=[],A.current&&(H.remove(A.current),A.current.geometry.dispose(),A.current=null),P.current&&(H.remove(P.current),P.current.geometry.dispose(),P.current=null,z.current=null);const J=it.length;if(J===0)return;const Tt=[];it.forEach((Rt,Xt)=>{const rt=Rt.kind==="error_trap",mt=q.has(Rt.id),At=Math.acos(-1+2*Xt/Math.max(1,J)),Wt=Math.sqrt(J*Math.PI)*At,gt=rt?14+Xt%3*2.5:10+Xt%4*3,Nt=gt*Math.cos(Wt)*Math.sin(At),Ue=rt?4+Math.sin(Wt)*3.5:Math.sin(At)*6-2,pe=gt*Math.sin(Wt)*Math.sin(At),le=new nt(Nt,Ue,pe),$t=(rt?.55:.42)+Math.min(.4,(Rt.reward_score-1)*.2),ae=mt?16007006:rt?16498468:3718648,ue=mt?12456508:rt?14251782:165063,Ge=new Vu($t,24,24),at=new $E({color:ae,emissive:ue,emissiveIntensity:mt?.75:rt?.55:.35,roughness:.25,metalness:.1}),Ct=new pi(Ge,at);Ct.position.copy(le),Ct.userData={memoryId:Rt.id,memory:Rt,isConflicted:mt},H.add(Ct);const G=new Vu($t*2.2,16,16),me=new vl({color:ae,transparent:!0,opacity:mt?.22:rt?.14:.08,side:jn}),se=new pi(G,me);se.position.copy(le),H.add(se);let I;if(rt){const et=new Gu($t*1.5,$t*1.9,32),lt=new vl({color:16498468,transparent:!0,opacity:.65,side:Fi});I=new pi(et,lt),I.position.copy(le),I.rotation.x=Math.PI/2,H.add(I)}let E;if(mt){const et=new Gu($t*2.1,$t*2.6,32),lt=new vl({color:16007006,transparent:!0,opacity:.85,side:Fi});E=new pi(et,lt),E.position.copy(le),E.rotation.x=Math.PI/2,H.add(E)}Tt.push({id:Rt.id,memory:Rt,mesh:Ct,halo:se,ring:I,conflictRing:E,position:le,color:mt?"#f43f5e":rt?"#fbbf24":"#38bdf8",isTrap:rt,isConflicted:mt,screenPos:{x:0,y:0,visible:!1}})}),O.current=Tt;const bt=[];for(let Rt=0;Rt<Tt.length;Rt++)for(let Xt=Rt+1;Xt<Tt.length;Xt++){const rt=Tt[Rt],mt=Tt[Xt],At=rt.memory.module.toLowerCase()===mt.memory.module.toLowerCase(),Wt=rt.memory.linked_files?.some(Nt=>mt.memory.linked_files?.includes(Nt)),gt=rt.position.distanceTo(mt.position);(At||Wt)&&gt<18&&bt.push(rt.position,mt.position)}if(bt.length>0){const Rt=new Pn().setFromPoints(bt),Xt=new Bu({color:3718648,transparent:!0,opacity:.12}),rt=new jp(Rt,Xt);H.add(rt),A.current=rt}const Zt=[];if(i&&i.length>0&&i.forEach(Rt=>{const Xt=Tt.find(mt=>mt.id===Rt.memory_a_id),rt=Tt.find(mt=>mt.id===Rt.memory_b_id);Xt&&rt&&Zt.push(Xt.position,rt.position)}),Zt.length>0){const Rt=new Pn().setFromPoints(Zt),Xt=new Bu({color:16007006,transparent:!0,opacity:.85});z.current=Xt;const rt=new jp(Rt,Xt);H.add(rt),P.current=rt}},[it,i,q]);const F=wt.useCallback(H=>{_(H);const J=O.current.find(bt=>bt.id===H.memory_a_id),Tt=O.current.find(bt=>bt.id===H.memory_b_id);if(J&&Tt){const bt=J.position.clone().add(Tt.position).multiplyScalar(.5);k.current=bt.clone().add(new nt(0,4,12)),Q.current=bt.clone()}else J&&(k.current=J.position.clone().add(new nt(0,2,8)),Q.current=J.position.clone())},[]),X=wt.useCallback(H=>{const J=f.current,Tt=D.current;if(!J||!Tt)return;const bt=J.getBoundingClientRect(),Zt=(H.clientX-bt.left)/bt.width*2-1,Rt=-((H.clientY-bt.top)/bt.height)*2+1,Xt=new r_;Xt.setFromCamera(new he(Zt,Rt),Tt);const rt=O.current.map(At=>At.mesh),mt=Xt.intersectObjects(rt);if(mt.length>0){const At=mt[0].object,Wt=O.current.find(gt=>gt.mesh===At);if(Wt){M(Wt),b({x:H.clientX-bt.left,y:H.clientY-bt.top}),J.style.cursor="pointer";return}}M(null),J.style.cursor="grab"},[]),st=wt.useCallback(H=>{const J=f.current,Tt=D.current;if(!J||!Tt)return;const bt=J.getBoundingClientRect(),Zt=(H.clientX-bt.left)/bt.width*2-1,Rt=-((H.clientY-bt.top)/bt.height)*2+1,Xt=new r_;Xt.setFromCamera(new he(Zt,Rt),Tt);const rt=O.current.map(At=>At.mesh),mt=Xt.intersectObjects(rt);if(mt.length>0){const At=mt[0].object,Wt=O.current.find(gt=>gt.mesh===At);if(Wt){const gt=i.find(Nt=>Nt.memory_a_id===Wt.id||Nt.memory_b_id===Wt.id);gt?F(gt):(s(Wt.memory),k.current=Wt.position.clone().add(new nt(0,1.8,6.5)),Q.current=Wt.position.clone())}}},[s,i,F]),Y=()=>{k.current=new nt(0,12,34),Q.current=new nt(0,0,0)};return S.jsxs("div",{style:{position:"relative",width:"100%",height:"660px",background:"#09090b",border:"1px solid var(--border)",borderRadius:"8px",overflow:"hidden"},children:[S.jsx("div",{ref:f,onPointerMove:X,onClick:st,style:{width:"100%",height:"100%",cursor:"grab"}}),S.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"},children:T.map(H=>S.jsxs("div",{onClick:J=>{J.stopPropagation();const Tt=i.find(bt=>bt.memory_a_id===H.id||bt.memory_b_id===H.id);if(Tt)F(Tt);else{const bt=o.find(Zt=>Zt.id===H.id);bt&&s(bt)}},style:{position:"absolute",left:`${H.x}px`,top:`${H.y}px`,transform:"translate(10px, -50%)",pointerEvents:"auto",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",padding:"3px 8px",borderRadius:"12px",background:"rgba(20, 20, 23, 0.85)",border:`1px solid ${H.isConflicted?"rgba(244, 63, 94, 0.7)":H.isTrap?"rgba(251, 191, 36, 0.5)":"rgba(56, 189, 248, 0.3)"}`,backdropFilter:"blur(8px)",fontSize:"11px",fontFamily:"var(--font-mono)",color:H.isConflicted?"#fb7185":H.isTrap?"#fbbf24":"var(--text)",whiteSpace:"nowrap",maxWidth:"220px",overflow:"hidden",textOverflow:"ellipsis",boxShadow:"0 4px 12px rgba(0,0,0,0.5)",transition:"transform 0.1s ease, border-color 0.1s ease"},children:[S.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:H.isConflicted?"#f43f5e":H.isTrap?"#fbbf24":"var(--accent)",boxShadow:`0 0 6px ${H.isConflicted?"#f43f5e":H.isTrap?"#fbbf24":"var(--accent)"}`}}),S.jsx("span",{style:{overflow:"hidden",textOverflow:"ellipsis"},children:H.title})]},H.id))}),S.jsxs("div",{style:{position:"absolute",top:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[S.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"6px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"10px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("span",{style:{fontSize:"13px"},children:"🌌"}),S.jsx("span",{style:{fontSize:"12px",fontWeight:700,fontFamily:"var(--font-mono)",letterSpacing:"0.04em"},children:"BRAIN OBSERVATORY"})]}),S.jsxs("span",{style:{fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[it.length," orbital nodes • ",e?.graphNodesCount??41," knowledge entities"]})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",pointerEvents:"auto"},children:[i&&i.length>0&&S.jsxs("button",{onClick:()=>{y?_(null):F(i[0])},className:"btn",style:{padding:"4px 10px",fontSize:"11px",background:y?"var(--risk)":"var(--risk-weak)",color:y?"#ffffff":"var(--risk)",border:"1px solid var(--risk)",display:"flex",alignItems:"center",gap:"6px",fontWeight:600,boxShadow:"0 0 12px rgba(244, 63, 94, 0.3)"},children:[S.jsx(Uu,{size:12}),S.jsxs("span",{children:[i.length," Conflict",i.length>1?"s":""]})]}),S.jsxs("div",{style:{display:"flex",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",backdropFilter:"blur(8px)"},children:[S.jsxs("button",{onClick:()=>h("all"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:d==="all"?"var(--accent-weak)":"transparent",color:d==="all"?"var(--accent)":"var(--text-muted)",border:"none"},children:["All (",o.length,")"]}),S.jsxs("button",{onClick:()=>h("rules"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:d==="rules"?"var(--accent-weak)":"transparent",color:d==="rules"?"var(--accent)":"var(--text-muted)",border:"none"},children:["Rules (",o.filter(H=>H.kind==="rule").length,")"]}),S.jsxs("button",{onClick:()=>h("traps"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:d==="traps"?"var(--trap-weak)":"transparent",color:d==="traps"?"var(--trap)":"var(--text-muted)",border:"none"},children:["2.0x Traps (",o.filter(H=>H.kind==="error_trap").length,")"]}),i.length>0&&S.jsxs("button",{onClick:()=>h("conflicts"),className:"btn",style:{padding:"3px 8px",fontSize:"11px",background:d==="conflicts"?"var(--risk-weak)":"transparent",color:d==="conflicts"?"var(--risk)":"var(--text-muted)",border:"none"},children:["Conflicts (",i.length,")"]})]}),S.jsx("button",{onClick:()=>m(H=>!H),className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:p?"Pause rotation":"Resume rotation",children:p?S.jsx(O_,{size:13}):S.jsx(P_,{size:13})}),S.jsx("button",{onClick:Y,className:"btn",style:{padding:"6px 9px",background:"rgba(20, 20, 23, 0.85)",backdropFilter:"blur(8px)"},title:"Reset 3D camera angle",children:S.jsx(Qp,{size:13})})]})]}),y&&S.jsxs("div",{style:{position:"absolute",top:"56px",right:"16px",width:"590px",maxWidth:"calc(100% - 32px)",maxHeight:"calc(100% - 76px)",overflowY:"auto",zIndex:250,background:"rgba(15, 15, 18, 0.94)",backdropFilter:"blur(16px)",border:"1px solid var(--risk)",borderRadius:"8px",boxShadow:"0 16px 40px rgba(0, 0, 0, 0.85), 0 0 24px rgba(244, 63, 94, 0.3)",padding:"16px"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsxs("span",{className:"badge-tag",style:{background:"var(--risk-weak)",color:"var(--risk)",display:"flex",alignItems:"center",gap:"4px"},children:[S.jsx(Uu,{size:12}),"CONTRADICTION DETECTED"]}),i.length>1&&S.jsxs("span",{style:{fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:["(",i.findIndex(H=>H.id===y.id)+1," of ",i.length,")"]})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[i.length>1&&S.jsxs(S.Fragment,{children:[S.jsx("button",{onClick:()=>{const H=i.findIndex(Tt=>Tt.id===y.id),J=i[(H-1+i.length)%i.length];F(J)},className:"btn",style:{padding:"3px 6px",fontSize:"11px"},title:"Previous conflict",children:S.jsx(fb,{size:13})}),S.jsx("button",{onClick:()=>{const H=i.findIndex(Tt=>Tt.id===y.id),J=i[(H+1)%i.length];F(J)},className:"btn",style:{padding:"3px 6px",fontSize:"11px"},title:"Next conflict",children:S.jsx(db,{size:13})})]}),S.jsx("button",{onClick:()=>_(null),className:"btn",style:{padding:"3px 6px",fontSize:"11px"},title:"Dismiss overlay",children:S.jsx(hb,{size:13})})]})]}),S.jsx(z_,{conflict:y,memoryA:o.find(H=>H.id===y.memory_a_id),memoryB:o.find(H=>H.id===y.memory_b_id),onResolve:(H,J,Tt)=>{l?.(H,J,Tt);const bt=i.filter(Zt=>Zt.id!==H);bt.length>0?F(bt[0]):_(null)}})]}),v&&!y&&S.jsxs("div",{style:{position:"absolute",left:`${Math.min(x.x+16,1100)}px`,top:`${Math.min(x.y+16,520)}px`,pointerEvents:"none",background:"rgba(20, 20, 23, 0.95)",border:`1px solid ${v.isConflicted?"var(--risk)":v.isTrap?"var(--trap)":"var(--accent)"}`,borderRadius:"6px",padding:"10px 14px",boxShadow:"0 8px 24px rgba(0,0,0,0.6)",zIndex:100,maxWidth:"300px",backdropFilter:"blur(12px)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",marginBottom:"4px"},children:[S.jsx("span",{className:"badge-tag",style:{background:v.isConflicted?"var(--risk-weak)":v.isTrap?"var(--trap-weak)":"var(--accent-weak)",color:v.isConflicted?"var(--risk)":v.isTrap?"var(--trap)":"var(--accent)"},children:v.isConflicted?"⚠️ CONTRADICTION":v.isTrap?"2.0X ERROR TRAP":"VERIFIED RULE"}),S.jsx("span",{style:{fontSize:"10.5px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:v.memory.module})]}),S.jsx("div",{style:{fontSize:"12.5px",fontWeight:600,color:"var(--text)",lineHeight:"1.4"},children:v.memory.title}),S.jsxs("div",{style:{marginTop:"6px",paddingTop:"6px",borderTop:"1px solid var(--border)",display:"flex",justifyContent:"space-between",fontSize:"11px",fontFamily:"var(--font-mono)",color:"var(--text-muted)"},children:[S.jsxs("span",{children:["[",v.id,"]"]}),S.jsx("span",{style:{color:v.isConflicted?"var(--risk)":v.isTrap?"var(--trap)":"var(--accent)",fontWeight:600},children:v.isConflicted?"Click to resolve":`${v.memory.reward_score.toFixed(2)}x boost`})]})]}),S.jsxs("div",{style:{position:"absolute",bottom:"12px",left:"14px",right:"14px",display:"flex",justifyContent:"space-between",alignItems:"center",pointerEvents:"none"},children:[S.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",gap:"14px",fontSize:"11px",fontFamily:"var(--font-mono)"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#fbbf24",boxShadow:"0 0 6px #fbbf24"}}),S.jsx("span",{style:{color:"#fbbf24"},children:"2.0X ERROR TRAP"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#38bdf8",boxShadow:"0 0 6px #38bdf8"}}),S.jsx("span",{style:{color:"#38bdf8"},children:"VERIFIED RULE"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#f43f5e",boxShadow:"0 0 6px #f43f5e"}}),S.jsx("span",{style:{color:"#fb7185"},children:"CONTRADICTION"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[S.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"rgba(244, 63, 94, 0.6)"}}),S.jsx("span",{style:{color:"#fb7185"},children:"TENSION WIRE"})]})]}),S.jsxs("div",{style:{pointerEvents:"auto",background:"rgba(20, 20, 23, 0.85)",border:"1px solid var(--border)",borderRadius:"6px",padding:"5px 12px",backdropFilter:"blur(8px)",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)",display:"flex",gap:"12px"},children:[S.jsxs("span",{children:["Left-Drag: ",S.jsx("b",{children:"Orbit 3D"})]}),S.jsxs("span",{children:["Right-Drag: ",S.jsx("b",{children:"Pan"})]}),S.jsxs("span",{children:["Scroll: ",S.jsx("b",{children:"Zoom"})]}),S.jsxs("span",{children:["Click Node: ",S.jsx("b",{children:"Inspect / Resolve"})]})]})]})]})},Mw=()=>{const[o,e]=wt.useState(()=>{try{const at=localStorage.getItem("fastr-theme");return at==="light"||at==="dark"?at:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch{return"dark"}}),[i,s]=wt.useState("overview"),[l,f]=wt.useState(!0),[d,h]=wt.useState(null),[p,m]=wt.useState([]),[v,M]=wt.useState([]),[x,b]=wt.useState([]),[T,L]=wt.useState([]),[y,_]=wt.useState(""),[N,V]=wt.useState("all"),[D,U]=wt.useState(null),[w,O]=wt.useState(null),[A,P]=wt.useState(!1),[z,k]=wt.useState(null),[Q,ct]=wt.useState(0),q=wt.useRef([]),[it,F]=wt.useState(""),[X,st]=wt.useState(""),[Y,H]=wt.useState("general"),[J,Tt]=wt.useState("rule"),[bt,Zt]=wt.useState(""),{pendingAction:Rt,countdown:Xt,enqueue:rt,undo:mt}=wb(),At=wt.useCallback(async()=>{try{const[at,Ct,G,me]=await Promise.all([fetch("/api/status").then(se=>se.json()),fetch("/api/memories").then(se=>se.json()),fetch("/api/actions").then(se=>se.json()),fetch("/api/conflicts").then(se=>se.json())]);h(at),m(Ct),M(G.actions||[]),b(G.edges||[]),L(me||[]),f(!1)}catch(at){console.error("Failed to fetch FastrMemory snapshot:",at),f(!1)}},[]);wt.useEffect(()=>{At()},[At]);const Wt=async()=>{try{await fetch("/api/actions/seed",{method:"POST"}),At()}catch(at){console.error("Failed to seed actions:",at)}};wt.useEffect(()=>{const at=()=>{const Ct=window.location.hash.replace(/^#\/?/,"");["overview","observatory","memories","traps","dag","treemap","rrf","conflicts"].includes(Ct)&&s(Ct)};return at(),window.addEventListener("hashchange",at),()=>window.removeEventListener("hashchange",at)},[]);const gt=at=>{s(at),window.location.hash=`#/${at}`},{status:Nt,lastEventTime:Ue}=Cb({onEvent:(at,Ct)=>{At(),at==="trap_logged"?k(`⚠️ Active Error Trap Logged: "${Ct?.title||"Unknown Trap"}"`):at==="action_claimed"?k(`⚡ Agent [${Ct?.claimedBy||"agent"}] claimed task: "${Ct?.title||Ct?.actionId}"`):at==="action_completed"&&k(`✅ Action completed: "${Ct?.title||Ct?.actionId}"`)}});wt.useEffect(()=>{if(!z)return;const at=setTimeout(()=>k(null),4500);return()=>clearTimeout(at)},[z]);const pe=()=>{const at=o==="dark"?"light":"dark";e(at);try{localStorage.setItem("fastr-theme",at)}catch{}document.documentElement.setAttribute("data-theme",at)};wt.useEffect(()=>{document.documentElement.setAttribute("data-theme",o)},[o]),wt.useEffect(()=>{const at=Ct=>{const G=document.activeElement?.tagName==="INPUT"||document.activeElement?.tagName==="TEXTAREA";Ct.key==="/"&&!G?(Ct.preventDefault(),document.getElementById("fastr-search-input")?.focus()):Ct.key==="Escape"?(U(null),O(null),P(!1)):G||(Ct.key==="j"||Ct.key==="ArrowDown"?(Ct.preventDefault(),ct(me=>Math.min(me+1,Math.max(0,q.current.length-1)))):Ct.key==="k"||Ct.key==="ArrowUp"?(Ct.preventDefault(),ct(me=>Math.max(0,me-1))):Ct.key==="Enter"?ct(me=>{const se=q.current[me];return se&&U(se),me}):Ct.key==="1"?gt("overview"):Ct.key==="2"||Ct.key.toLowerCase()==="o"?gt("observatory"):Ct.key==="3"?gt("memories"):Ct.key==="4"?gt("traps"):Ct.key==="5"?gt("dag"):Ct.key==="6"?gt("treemap"):Ct.key==="7"?gt("rrf"):Ct.key==="8"?gt("conflicts"):(Ct.key.toLowerCase()==="n"||Ct.key.toLowerCase()==="c")&&P(!0))};return window.addEventListener("keydown",at),()=>window.removeEventListener("keydown",at)},[]);const le=(at,Ct,G)=>{const me=[...T];L(se=>se.filter(I=>I.id!==at)),rt(`Resolved conflict #${at} (Kept ${Ct})`,async()=>{await fetch("/api/conflicts/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conflictId:at,keepMemoryId:Ct,forgetLoser:G,reason:"Resolved via Fastr Dashboard"})}),At()},()=>{L(me)})},xe=(at,Ct)=>{const G=Ct?0:1;m(me=>me.map(se=>se.id===at?{...se,pinned:G}:se)),D&&D.id===at&&U({...D,pinned:G}),rt(`${G?"Pinned":"Unpinned"} rule ${at}`,async()=>{await fetch("/api/memories/pin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:at,pinned:!!G})}),At()},()=>{m(me=>me.map(se=>se.id===at?{...se,pinned:Ct}:se)),D&&D.id===at&&U({...D,pinned:Ct})})},$t=at=>{const Ct=p.find(G=>G.id===at);Ct&&(m(G=>G.filter(me=>me.id!==at)),U(null),rt(`Forgot memory [${at}]`,async()=>{await fetch("/api/memories/forget",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({memoryId:at,reason:"User requested forget via Fastr Dashboard"})}),At()},()=>{m(G=>[...G,Ct])}))},ae=async at=>{if(at.preventDefault(),!(!it.trim()||!X.trim()))try{(await fetch("/api/memories",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:it.trim(),content:X.trim(),module:Y.trim()||"general",kind:J,files:bt?bt.split(",").map(G=>G.trim()).filter(Boolean):[]})})).ok&&(F(""),st(""),Zt(""),P(!1),At())}catch(Ct){console.error("Failed to create memory:",Ct)}},ue=p.filter(at=>{const Ct=N==="all"||at.module.toLowerCase()===N.toLowerCase(),G=!y||at.title.toLowerCase().includes(y.toLowerCase())||at.content.toLowerCase().includes(y.toLowerCase())||at.id.toLowerCase().includes(y.toLowerCase());return Ct&&G});q.current=ue;const Ge=p.filter(at=>at.kind==="error_trap");return S.jsxs("div",{style:{maxWidth:"1440px",margin:"0 auto",padding:"16px 20px",minHeight:"100vh",display:"flex",flexDirection:"column",gap:"16px"},children:[S.jsxs("header",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"10px 16px",gap:"16px"},children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[S.jsx("div",{style:{width:"28px",height:"28px",borderRadius:"4px",background:"var(--accent)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:"14px"},children:"⚡"}),S.jsxs("div",{children:[S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsxs("span",{style:{fontSize:"14px",fontWeight:700,letterSpacing:"-0.2px",fontFamily:"var(--font-mono)"},children:["FASTR",S.jsx("span",{style:{color:"var(--accent)"},children:"MEMORY"})]}),S.jsx("span",{className:"badge-tag",style:{background:"var(--accent-weak)",color:"var(--accent)"},children:"NODE 24 WAL"})]}),S.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",fontFamily:"var(--font-mono)",marginTop:"1px"},children:d?.projectId||"loading..."})]})]}),S.jsxs("div",{style:{flex:1,maxWidth:"440px",position:"relative"},children:[S.jsx(ap,{size:14,style:{position:"absolute",left:"10px",top:"8px",color:"var(--text-faint)"}}),S.jsx("input",{id:"fastr-search-input",type:"text",value:y,onChange:at=>_(at.target.value),placeholder:"Search rules, error traps, files (Press /)...",style:{width:"100%",padding:"6px 32px 6px 30px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",fontFamily:"var(--font-sans)"}}),S.jsx("kbd",{style:{position:"absolute",right:"8px",top:"6px",fontSize:"10px",fontFamily:"var(--font-mono)",background:"var(--surface)",border:"1px solid var(--border)",padding:"1px 5px",borderRadius:"3px",color:"var(--text-faint)"},children:"/"})]}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[S.jsxs("button",{onClick:()=>P(!0),className:"btn btn-primary",title:"Create new rule or error trap (Hotkey: N)",children:[S.jsx(pb,{size:13})," New Rule"]}),S.jsxs("div",{title:`Real-Time SSE: ${Nt} (Last event: ${Ue||"none"})`,style:{display:"flex",alignItems:"center",gap:"6px",padding:"4px 9px",borderRadius:"4px",background:Nt==="live"?"var(--success-weak)":"var(--risk-weak)",border:`1px solid ${Nt==="live"?"rgba(52, 211, 153, 0.3)":"rgba(244, 63, 94, 0.3)"}`,color:Nt==="live"?"var(--success)":"var(--risk)",fontSize:"11px",fontWeight:600,fontFamily:"var(--font-mono)"},children:[S.jsx("div",{style:{width:"6px",height:"6px",borderRadius:"50%",background:Nt==="live"?"var(--success)":"var(--risk)"}}),S.jsx("span",{children:Nt==="live"?"LIVE SSE":"OFFLINE"})]}),S.jsx("button",{onClick:pe,className:"btn",style:{padding:"5px 8px"},title:"Toggle light/dark theme",children:o==="dark"?S.jsx(mb,{size:13}):S.jsx(gb,{size:13})}),S.jsx("button",{onClick:At,className:"btn",style:{padding:"5px 8px"},title:"Refresh snapshot",children:S.jsx(xb,{size:13})})]})]}),S.jsxs("section",{style:{display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gap:"10px"},children:[S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"ACTIVE RULES"}),S.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.activeCount??0})]}),S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"2.0X ERROR TRAPS"}),S.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--trap)",marginTop:"2px"},children:l?"—":d?.trapsCount??0})]}),S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"FRONTIER TASKS"}),S.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:"var(--accent)",marginTop:"2px"},children:l?"—":d?.frontierCount??0})]}),S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"KNOWLEDGE NODES"}),S.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",marginTop:"2px",color:"var(--text)"},children:l?"—":d?.graphNodesCount??0})]}),S.jsxs("div",{className:"card-panel",style:{padding:"12px 16px"},children:[S.jsx("div",{style:{fontSize:"10px",color:"var(--text-faint)",fontWeight:600,letterSpacing:"0.05em"},children:"CONTRADICTIONS"}),S.jsx("div",{style:{fontSize:"20px",fontWeight:700,fontFamily:"var(--font-mono)",color:(d?.conflictsCount??0)>0?"var(--risk)":"var(--text)",marginTop:"2px"},children:l?"—":d?.conflictsCount??0})]})]}),S.jsx("nav",{style:{display:"flex",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"6px",padding:"3px",gap:"4px",overflowX:"auto"},children:[{id:"overview",label:"OVERVIEW",count:null},{id:"observatory",label:"3D OBSERVATORY",count:p.length},{id:"memories",label:"RULES & TRAPS",count:p.length},{id:"traps",label:"2.0X TRAPS",count:Ge.length},{id:"dag",label:"ACTION DAG",count:v.length},{id:"treemap",label:"TREEMAP",count:null},{id:"rrf",label:"RRF TRACE",count:null},{id:"conflicts",label:"CONTRADICTIONS",count:T.length}].map(at=>{const Ct=i===at.id;return S.jsxs("button",{onClick:()=>gt(at.id),style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"6px 12px",borderRadius:"4px",fontSize:"11px",fontWeight:600,letterSpacing:"0.04em",fontFamily:"var(--font-mono)",border:"none",background:Ct?"var(--accent-weak)":"transparent",color:Ct?"var(--accent)":"var(--text-muted)",cursor:"pointer",transition:"all 0.1s ease",whiteSpace:"nowrap"},children:[S.jsx("span",{children:at.label}),at.count!==null&&S.jsx("span",{style:{fontSize:"10px",padding:"1px 5px",borderRadius:"3px",background:Ct?"var(--accent)":"var(--bg-subtle)",color:Ct?"#fff":"var(--text-faint)"},children:at.count})]},at.id)})}),S.jsx("main",{style:{minHeight:"440px"},children:l?S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"12px"},children:[S.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),S.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}}),S.jsx("div",{className:"card-panel",style:{height:"140px",background:"var(--surface)"}})]}):S.jsxs(S.Fragment,{children:[i==="overview"&&S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"2fr 1fr",gap:"16px"},children:[S.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[S.jsx("h2",{style:{fontSize:"16px",fontWeight:700,marginBottom:"6px"},children:"Sovereign Cognitive Agent Memory Engine"}),S.jsxs("p",{style:{color:"var(--text-muted)",fontSize:"13px",lineHeight:"1.5",marginBottom:"16px"},children:["FastrMemory operates inside Node 24 with ",S.jsx("b",{children:"zero external background daemons"}),". Rules, bug-fix traps, and architectural decisions are persisted via SQLite WAL mode, mirrored to ",S.jsx("code",{children:".fastr/pages/*.md"})," for Git pull requests, and fused via Triple-Stream RRF ($k=60$)."]}),S.jsxs("div",{style:{display:"flex",gap:"10px"},children:[S.jsx("button",{onClick:()=>gt("observatory"),className:"btn btn-primary",children:"🔭 3D Brain Observatory →"}),S.jsx("button",{onClick:()=>gt("traps"),className:"btn",children:"Inspect 2.0x Error Traps →"}),S.jsx("button",{onClick:()=>gt("dag"),className:"btn",children:"Open Action DAG →"})]})]}),S.jsxs("div",{className:"card-panel",style:{padding:"20px"},children:[S.jsx("h3",{style:{fontSize:"13px",fontWeight:600,textTransform:"uppercase",color:"var(--text-faint)",letterSpacing:"0.04em",marginBottom:"12px"},children:"CLI Shortcuts"}),S.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[S.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory status"}),S.jsx(mi,{text:"fastrmemory status"})]}),S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[S.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory bench"}),S.jsx(mi,{text:"fastrmemory bench"})]}),S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"12px"},children:[S.jsx("code",{style:{color:"var(--accent)"},children:"fastrmemory sync"}),S.jsx(mi,{text:"fastrmemory sync"})]})]})]})]}),i==="observatory"&&S.jsx(Sw,{memories:p,status:d,conflicts:T,onSelectMemory:at=>U(at),onResolveConflict:le}),i==="memories"&&S.jsxs("div",{children:[S.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"12px",alignItems:"center",flexWrap:"wrap"},children:[S.jsxs("div",{style:{display:"flex",gap:"4px",overflowX:"auto"},children:[S.jsxs("button",{onClick:()=>V("all"),className:`btn ${N==="all"?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:["All Modules (",p.length,")"]}),(d?.modules||[]).map(at=>S.jsx("button",{onClick:()=>V(at),className:`btn ${N===at?"btn-primary":""}`,style:{padding:"4px 10px",fontSize:"11px"},children:at},at))]}),S.jsxs("div",{style:{marginLeft:"auto",fontSize:"11px",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:["Showing ",ue.length," item(s) • Click row to inspect"]})]}),ue.length===0?S.jsxs("div",{className:"card-panel",style:{padding:"48px 24px",textAlign:"center",color:"var(--text-muted)"},children:[S.jsx("div",{style:{fontSize:"14px",fontWeight:600,color:"var(--text)"},children:"No memories match criteria"}),S.jsx("p",{style:{fontSize:"12px",marginTop:"4px"},children:"Adjust search query or select another module."})]}):S.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[S.jsx("div",{children:"ID"}),S.jsx("div",{children:"KIND"}),S.jsx("div",{children:"MODULE"}),S.jsx("div",{children:"TITLE"}),S.jsx("div",{children:"PROVENANCE"}),S.jsx("div",{children:"REWARD"}),S.jsx("div",{style:{textAlign:"right"},children:"PIN"})]}),S.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:ue.map((at,Ct)=>{const G=D?.id===at.id||Q===Ct;return S.jsxs("div",{onClick:()=>{ct(Ct),U(at)},className:`instrument-row ${G?"active":""}`,style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 85px 105px 2fr 160px 75px 50px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[S.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--accent)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:at.id,children:at.id}),S.jsx("div",{children:S.jsx("span",{className:"badge-tag",style:{background:at.kind==="error_trap"?"var(--trap-weak)":"var(--accent-weak)",color:at.kind==="error_trap"?"var(--trap)":"var(--accent)"},children:at.kind==="error_trap"?"TRAP":at.kind.toUpperCase()})}),S.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",fontSize:"11.5px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:at.module,children:at.module}),S.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:at.title,children:at.title}),S.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:[at.provenance_hash?S.jsxs("span",{className:"badge-tag",style:{background:"rgba(52, 211, 153, 0.15)",color:"var(--success)"},children:["🔒 prov_",at.provenance_hash.slice(0,6)]}):S.jsx("span",{style:{fontSize:"10px",color:"var(--text-faint)"},children:"legacy"}),S.jsxs("span",{style:{fontSize:"11px",color:"var(--text-muted)"},children:["@",at.agent_id||"default"]})]}),S.jsxs("div",{style:{fontFamily:"var(--font-mono)",color:"var(--accent)",fontSize:"11.5px"},children:[at.reward_score.toFixed(2),"x"]}),S.jsx("div",{style:{textAlign:"right"},children:S.jsx("button",{onClick:me=>{me.stopPropagation(),xe(at.id,at.pinned)},className:"btn",style:{padding:"2px 6px",fontSize:"10px"},title:at.pinned?"Unpin":"Pin",children:S.jsx(I_,{size:11,color:at.pinned?"#8b5cf6":"var(--text-muted)"})})})]},at.id)})})]})]}),i==="traps"&&S.jsxs("div",{children:[S.jsxs("div",{style:{padding:"10px 14px",background:"var(--trap-weak)",border:"1px solid rgba(217, 119, 6, 0.3)",borderRadius:"6px",color:"var(--trap)",fontSize:"12px",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"},children:[S.jsx(Uu,{size:15}),S.jsxs("span",{children:["Error traps receive an automatic ",S.jsx("b",{children:"2.0x recall boost"})," to proactively prevent AI agents from repeating known bugs."]})]}),S.jsxs("div",{className:"card-panel",style:{overflow:"hidden"},children:[S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",padding:"8px 14px",background:"var(--bg-subtle)",borderBottom:"1px solid var(--border)",fontSize:"10.5px",fontWeight:600,letterSpacing:"0.05em",color:"var(--text-faint)",fontFamily:"var(--font-mono)"},children:[S.jsx("div",{children:"TRAP ID"}),S.jsx("div",{children:"MODULE"}),S.jsx("div",{children:"WARNING HEADLINE"}),S.jsx("div",{children:"LINKED FILES"}),S.jsx("div",{style:{textAlign:"right"},children:"RECALL BOOST"})]}),S.jsx("div",{style:{maxHeight:"640px",overflowY:"auto"},children:Ge.map(at=>S.jsxs("div",{onClick:()=>U(at),className:"instrument-row",style:{display:"grid",gridTemplateColumns:"minmax(160px, 1.2fr) 120px 2fr 160px 100px",columnGap:"12px",alignItems:"center",fontSize:"12px"},children:[S.jsx("div",{style:{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--trap)",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:at.id,children:at.id}),S.jsx("div",{style:{fontFamily:"var(--font-mono)",color:"var(--text-muted)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},title:at.module,children:at.module}),S.jsx("div",{style:{fontWeight:600,color:"var(--text)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",paddingRight:"6px"},title:at.title,children:at.title}),S.jsx("div",{style:{fontSize:"11px",color:"var(--text-muted)",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},title:at.linked_files&&at.linked_files.length>0?at.linked_files.join(", "):"project-wide",children:at.linked_files&&at.linked_files.length>0?at.linked_files.join(", "):"project-wide"}),S.jsx("div",{style:{textAlign:"right",fontFamily:"var(--font-mono)",color:"var(--trap)",fontWeight:600},children:"2.0x BOOST"})]},at.id))})]})]}),i==="dag"&&S.jsx(Nb,{actions:v,edges:x,onSelectAction:at=>O(at),onSeed:Wt}),i==="treemap"&&S.jsx(Ub,{memories:p,onSelectMemory:at=>U(at)}),i==="rrf"&&S.jsx(Lb,{memories:p}),i==="conflicts"&&S.jsxs("div",{children:[S.jsx("div",{style:{marginBottom:"12px",color:"var(--text-muted)",fontSize:"12px"},children:"Contradictions detected between active memories. Use 1-click resolution with optimistic 6-second rollback window."}),T.length===0?S.jsx("div",{className:"card-panel",style:{padding:"36px",textAlign:"center",color:"var(--success)"},children:"✨ Zero open contradictions detected. Knowledge base is 100% consistent!"}):T.map(at=>S.jsx(z_,{conflict:at,memoryA:p.find(Ct=>Ct.id===at.memory_a_id),memoryB:p.find(Ct=>Ct.id===at.memory_b_id),onResolve:le},at.id))]})]})}),z&&S.jsxs("div",{className:"floating-alert",children:[S.jsx("span",{children:z}),S.jsx("button",{onClick:()=>k(null),style:{background:"none",border:"none",cursor:"pointer",color:"var(--text-muted)"},children:"✕"})]}),S.jsx(Pb,{memory:D,onClose:()=>U(null),onTogglePin:xe,onForget:$t}),w&&S.jsx("div",{onClick:()=>O(null),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:S.jsxs("div",{onClick:at=>at.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"540px",padding:"20px"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start"},children:[S.jsxs("div",{children:[S.jsxs("span",{style:{fontSize:"11px",color:"var(--accent)",fontFamily:"var(--font-mono)"},children:["[",w.id,"] • P",w.priority]}),S.jsx("h3",{style:{fontSize:"15px",fontWeight:600,marginTop:"4px"},children:w.title})]}),S.jsx("button",{onClick:()=>O(null),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),S.jsx("div",{style:{marginTop:"14px",fontSize:"12.5px",lineHeight:"1.5",color:"var(--text-muted)"},children:w.description||"No detailed task description provided."}),S.jsxs("div",{style:{marginTop:"18px",borderTop:"1px solid var(--border)",paddingTop:"10px",display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:"var(--text-muted)"},children:[S.jsxs("span",{children:["Status: ",S.jsx("b",{style:{textTransform:"capitalize"},children:w.status})]}),S.jsxs("span",{children:["Assignee: ",S.jsx("b",{children:w.assigned_to||"Unassigned (Open)"})]})]})]})}),A&&S.jsx("div",{onClick:()=>P(!1),style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:9e3},children:S.jsxs("form",{onSubmit:ae,onClick:at=>at.stopPropagation(),className:"card-panel",style:{width:"90%",maxWidth:"520px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px"},children:[S.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[S.jsx("h3",{style:{fontSize:"15px",fontWeight:600},children:"Record Memory / Error Trap"}),S.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",style:{padding:"3px 7px"},children:"✕"})]}),S.jsxs("div",{children:[S.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Title"}),S.jsx("input",{type:"text",required:!0,value:it,onChange:at=>F(at.target.value),placeholder:"e.g. Always Use BigEndian for Binary Protocol",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),S.jsxs("div",{children:[S.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Rule Content"}),S.jsx("textarea",{required:!0,rows:4,value:X,onChange:at=>st(at.target.value),placeholder:"Explain the pattern, gotcha, or fix in detail...",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none",resize:"vertical"}})]}),S.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"10px"},children:[S.jsxs("div",{children:[S.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Module"}),S.jsx("input",{type:"text",value:Y,onChange:at=>H(at.target.value),placeholder:"e.g. auth, api, db",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),S.jsxs("div",{children:[S.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Type"}),S.jsxs("select",{value:J,onChange:at=>Tt(at.target.value),style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"},children:[S.jsx("option",{value:"rule",children:"Rule (Verified)"}),S.jsx("option",{value:"error_trap",children:"Error Trap [2.0x Boost]"})]})]})]}),S.jsxs("div",{children:[S.jsx("label",{style:{fontSize:"11.5px",fontWeight:600,display:"block",marginBottom:"3px",color:"var(--text-muted)"},children:"Linked Files (comma separated)"}),S.jsx("input",{type:"text",value:bt,onChange:at=>Zt(at.target.value),placeholder:"src/auth.ts, src/server.ts",style:{width:"100%",padding:"7px 10px",borderRadius:"4px",border:"1px solid var(--border)",background:"var(--bg)",color:"var(--text)",fontSize:"12px",outline:"none"}})]}),S.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"6px"},children:[S.jsx("button",{type:"button",onClick:()=>P(!1),className:"btn",children:"Cancel"}),S.jsx("button",{type:"submit",className:"btn btn-primary",children:"Save Memory"})]})]})}),S.jsx(Db,{pendingAction:Rt,countdown:Xt,onUndo:mt})]})};Rb.createRoot(document.getElementById("root")).render(S.jsx(vb.StrictMode,{children:S.jsx(Mw,{})}));
