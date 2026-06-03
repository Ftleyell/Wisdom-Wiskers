(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))o(i);new MutationObserver(i=>{for(const t of i)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function a(i){const t={};return i.integrity&&(t.integrity=i.integrity),i.referrerPolicy&&(t.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?t.credentials="include":i.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(i){if(i.ep)return;i.ep=!0;const t=a(i);fetch(i.href,t)}})();class La{constructor(){this.audioCtx=null,this.isInitialized=!1,this.masterGainNode=null,this.isCurrentlyMuted=!1,this.volumeBeforeMute=1,console.log("AudioManager Creado (sin inicializar)")}_updateMuteStateBasedOnCurrentGain(){this.masterGainNode&&(this.isCurrentlyMuted=this.masterGainNode.gain.value<=1e-5)}init(){if(!this.isInitialized)try{this.audioCtx=new(window.AudioContext||window.webkitAudioContext),this.masterGainNode=this.audioCtx.createGain(),this.masterGainNode.connect(this.audioCtx.destination),this.isCurrentlyMuted?this.masterGainNode.gain.setValueAtTime(1e-5,this.audioCtx.currentTime):this.masterGainNode.gain.setValueAtTime(this.volumeBeforeMute,this.audioCtx.currentTime),this._updateMuteStateBasedOnCurrentGain(),this.audioCtx.state==="suspended"?this.audioCtx.resume().then(()=>{console.log("AudioManager: AudioContext reanudado exitosamente."),this.isInitialized=!0,this._updateMuteStateBasedOnCurrentGain()}).catch(e=>{console.error("AudioManager: Error al reanudar AudioContext:",e),this.isInitialized=!1}):this.audioCtx.state==="running"?this.isInitialized=!0:(console.warn('AudioManager: AudioContext state no es "suspended" ni "running", es:',this.audioCtx.state),this.isInitialized=!1)}catch(e){console.error("AudioManager: Error al crear AudioContext:",e),this.audioCtx=null,this.masterGainNode=null,this.isInitialized=!1}}playSound(e){var a;if(!this.isReady()){console.warn(`AudioManager: Not ready to play sound '${e}'. State: ${(a=this.audioCtx)==null?void 0:a.state}, Initialized: ${this.isInitialized}`);return}if(!(!this.audioCtx||!this.masterGainNode))try{const o=this.audioCtx.createOscillator(),i=this.audioCtx.createGain();switch(o.connect(i),i.connect(this.masterGainNode),e){case"correct":o.type="sine",o.frequency.setValueAtTime(660,this.audioCtx.currentTime),i.gain.setValueAtTime(.3,this.audioCtx.currentTime),i.gain.exponentialRampToValueAtTime(1e-4,this.audioCtx.currentTime+.3),o.start(this.audioCtx.currentTime),o.stop(this.audioCtx.currentTime+.3);break;case"incorrect":o.type="square",o.frequency.setValueAtTime(220,this.audioCtx.currentTime),i.gain.setValueAtTime(.3,this.audioCtx.currentTime),i.gain.exponentialRampToValueAtTime(1e-4,this.audioCtx.currentTime+.4),o.start(this.audioCtx.currentTime),o.stop(this.audioCtx.currentTime+.4);break;case"ui_confirm":case"purchase":o.type="triangle",o.frequency.setValueAtTime(880,this.audioCtx.currentTime),i.gain.setValueAtTime(.25,this.audioCtx.currentTime),i.gain.exponentialRampToValueAtTime(1e-4,this.audioCtx.currentTime+.2),o.start(this.audioCtx.currentTime),o.stop(this.audioCtx.currentTime+.2);break;default:return}o.onended=()=>{i.disconnect(),o.disconnect()}}catch(o){console.error(`AudioManager: Error al intentar reproducir sonido '${e}':`,o)}}setVolume(e){const a=Math.max(0,Math.min(1,e));if(!this.isInitialized||!this.audioCtx||!this.masterGainNode){this.volumeBeforeMute=a,this.isCurrentlyMuted=a<=1e-5;return}this.masterGainNode.gain.setValueAtTime(a,this.audioCtx.currentTime),a>1e-5&&this.isCurrentlyMuted?this.isCurrentlyMuted=!1:a<=1e-5&&(this.isCurrentlyMuted,this.isCurrentlyMuted=!0)}getVolume(){return!this.isInitialized||!this.masterGainNode?this.volumeBeforeMute:this.masterGainNode.gain.value}toggleMute(e){if(!this.isInitialized||!this.audioCtx||!this.masterGainNode){typeof e=="boolean"?(this.isCurrentlyMuted=e,this.isCurrentlyMuted&&this.volumeBeforeMute<=1e-5?this.volumeBeforeMute=.5:!this.isCurrentlyMuted&&this.volumeBeforeMute<=1e-5&&(this.volumeBeforeMute=.5)):(this.isCurrentlyMuted=!this.isCurrentlyMuted,this.isCurrentlyMuted&&this.volumeBeforeMute<=1e-5&&(this.volumeBeforeMute=.5));return}const a=1e-5,o=this.masterGainNode.gain.value,i=o<=a;let t;if(typeof e=="boolean"?t=e:t=!i,t)i?this.volumeBeforeMute<=a&&(this.volumeBeforeMute=.5):this.volumeBeforeMute=o,this.masterGainNode.gain.setValueAtTime(a,this.audioCtx.currentTime),this.isCurrentlyMuted=!0;else{const n=this.volumeBeforeMute<=a?.5:this.volumeBeforeMute;this.masterGainNode.gain.setValueAtTime(n,this.audioCtx.currentTime),this.isCurrentlyMuted=!1}}async tryResumeContext(){const e=this.audioCtx;if(e&&e.state==="suspended")try{await e.resume(),console.log("AudioManager: AudioContext resumed successfully.")}catch(a){console.error("AudioManager: Failed to resume AudioContext:",a)}}isMuted(){return!this.isInitialized||!this.masterGainNode?this.isCurrentlyMuted:this.isCurrentlyMuted||this.masterGainNode.gain.value<=1e-5}isReady(){return this.isInitialized&&this.audioCtx!==null&&this.audioCtx.state==="running"}}var Wt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function _a(h){return h&&h.__esModule&&Object.prototype.hasOwnProperty.call(h,"default")?h.default:h}var dt={exports:{}};/*!
 * matter-js 0.20.0 by @liabru
 * http://brm.io/matter-js/
 * License MIT
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) Liam Brummitt and contributors.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */var Oa=dt.exports,jt;function $a(){return jt||(jt=1,function(h,e){(function(o,i){h.exports=i()})(Oa,function(){return function(a){var o={};function i(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return a[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=a,i.c=o,i.d=function(t,n,c){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:c})},i.r=function(t){typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(n&1&&(t=i(t)),n&8||n&4&&typeof t=="object"&&t&&t.__esModule)return t;var c=Object.create(null);if(i.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:t}),n&2&&typeof t!="string")for(var r in t)i.d(c,r,(function(m){return t[m]}).bind(null,r));return c},i.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="",i(i.s=20)}([function(a,o){var i={};a.exports=i,function(){i._baseDelta=1e3/60,i._nextId=0,i._seed=0,i._nowStartTime=+new Date,i._warnedOnce={},i._decomp=null,i.extend=function(n,c){var r,m;typeof c=="boolean"?(r=2,m=c):(r=1,m=!0);for(var l=r;l<arguments.length;l++){var g=arguments[l];if(g)for(var p in g)m&&g[p]&&g[p].constructor===Object&&(!n[p]||n[p].constructor===Object)?(n[p]=n[p]||{},i.extend(n[p],m,g[p])):n[p]=g[p]}return n},i.clone=function(n,c){return i.extend({},c,n)},i.keys=function(n){if(Object.keys)return Object.keys(n);var c=[];for(var r in n)c.push(r);return c},i.values=function(n){var c=[];if(Object.keys){for(var r=Object.keys(n),m=0;m<r.length;m++)c.push(n[r[m]]);return c}for(var l in n)c.push(n[l]);return c},i.get=function(n,c,r,m){c=c.split(".").slice(r,m);for(var l=0;l<c.length;l+=1)n=n[c[l]];return n},i.set=function(n,c,r,m,l){var g=c.split(".").slice(m,l);return i.get(n,c,0,-1)[g[g.length-1]]=r,r},i.shuffle=function(n){for(var c=n.length-1;c>0;c--){var r=Math.floor(i.random()*(c+1)),m=n[c];n[c]=n[r],n[r]=m}return n},i.choose=function(n){return n[Math.floor(i.random()*n.length)]},i.isElement=function(n){return typeof HTMLElement<"u"?n instanceof HTMLElement:!!(n&&n.nodeType&&n.nodeName)},i.isArray=function(n){return Object.prototype.toString.call(n)==="[object Array]"},i.isFunction=function(n){return typeof n=="function"},i.isPlainObject=function(n){return typeof n=="object"&&n.constructor===Object},i.isString=function(n){return toString.call(n)==="[object String]"},i.clamp=function(n,c,r){return n<c?c:n>r?r:n},i.sign=function(n){return n<0?-1:1},i.now=function(){if(typeof window<"u"&&window.performance){if(window.performance.now)return window.performance.now();if(window.performance.webkitNow)return window.performance.webkitNow()}return Date.now?Date.now():new Date-i._nowStartTime},i.random=function(n,c){return n=typeof n<"u"?n:0,c=typeof c<"u"?c:1,n+t()*(c-n)};var t=function(){return i._seed=(i._seed*9301+49297)%233280,i._seed/233280};i.colorToNumber=function(n){return n=n.replace("#",""),n.length==3&&(n=n.charAt(0)+n.charAt(0)+n.charAt(1)+n.charAt(1)+n.charAt(2)+n.charAt(2)),parseInt(n,16)},i.logLevel=1,i.log=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.log.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.info=function(){console&&i.logLevel>0&&i.logLevel<=2&&console.info.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warn=function(){console&&i.logLevel>0&&i.logLevel<=3&&console.warn.apply(console,["matter-js:"].concat(Array.prototype.slice.call(arguments)))},i.warnOnce=function(){var n=Array.prototype.slice.call(arguments).join(" ");i._warnedOnce[n]||(i.warn(n),i._warnedOnce[n]=!0)},i.deprecated=function(n,c,r){n[c]=i.chain(function(){i.warnOnce("🔅 deprecated 🔅",r)},n[c])},i.nextId=function(){return i._nextId++},i.indexOf=function(n,c){if(n.indexOf)return n.indexOf(c);for(var r=0;r<n.length;r++)if(n[r]===c)return r;return-1},i.map=function(n,c){if(n.map)return n.map(c);for(var r=[],m=0;m<n.length;m+=1)r.push(c(n[m]));return r},i.topologicalSort=function(n){var c=[],r=[],m=[];for(var l in n)!r[l]&&!m[l]&&i._topologicalSort(l,r,m,n,c);return c},i._topologicalSort=function(n,c,r,m,l){var g=m[n]||[];r[n]=!0;for(var p=0;p<g.length;p+=1){var s=g[p];r[s]||c[s]||i._topologicalSort(s,c,r,m,l)}r[n]=!1,c[n]=!0,l.push(n)},i.chain=function(){for(var n=[],c=0;c<arguments.length;c+=1){var r=arguments[c];r._chained?n.push.apply(n,r._chained):n.push(r)}var m=function(){for(var l,g=new Array(arguments.length),p=0,s=arguments.length;p<s;p++)g[p]=arguments[p];for(p=0;p<n.length;p+=1){var d=n[p].apply(l,g);typeof d<"u"&&(l=d)}return l};return m._chained=n,m},i.chainPathBefore=function(n,c,r){return i.set(n,c,i.chain(r,i.get(n,c)))},i.chainPathAfter=function(n,c,r){return i.set(n,c,i.chain(i.get(n,c),r))},i.setDecomp=function(n){i._decomp=n},i.getDecomp=function(){var n=i._decomp;try{!n&&typeof window<"u"&&(n=window.decomp),!n&&typeof Wt<"u"&&(n=Wt.decomp)}catch{n=null}return n}}()},function(a,o){var i={};a.exports=i,function(){i.create=function(t){var n={min:{x:0,y:0},max:{x:0,y:0}};return t&&i.update(n,t),n},i.update=function(t,n,c){t.min.x=1/0,t.max.x=-1/0,t.min.y=1/0,t.max.y=-1/0;for(var r=0;r<n.length;r++){var m=n[r];m.x>t.max.x&&(t.max.x=m.x),m.x<t.min.x&&(t.min.x=m.x),m.y>t.max.y&&(t.max.y=m.y),m.y<t.min.y&&(t.min.y=m.y)}c&&(c.x>0?t.max.x+=c.x:t.min.x+=c.x,c.y>0?t.max.y+=c.y:t.min.y+=c.y)},i.contains=function(t,n){return n.x>=t.min.x&&n.x<=t.max.x&&n.y>=t.min.y&&n.y<=t.max.y},i.overlaps=function(t,n){return t.min.x<=n.max.x&&t.max.x>=n.min.x&&t.max.y>=n.min.y&&t.min.y<=n.max.y},i.translate=function(t,n){t.min.x+=n.x,t.max.x+=n.x,t.min.y+=n.y,t.max.y+=n.y},i.shift=function(t,n){var c=t.max.x-t.min.x,r=t.max.y-t.min.y;t.min.x=n.x,t.max.x=n.x+c,t.min.y=n.y,t.max.y=n.y+r}}()},function(a,o){var i={};a.exports=i,function(){i.create=function(t,n){return{x:t||0,y:n||0}},i.clone=function(t){return{x:t.x,y:t.y}},i.magnitude=function(t){return Math.sqrt(t.x*t.x+t.y*t.y)},i.magnitudeSquared=function(t){return t.x*t.x+t.y*t.y},i.rotate=function(t,n,c){var r=Math.cos(n),m=Math.sin(n);c||(c={});var l=t.x*r-t.y*m;return c.y=t.x*m+t.y*r,c.x=l,c},i.rotateAbout=function(t,n,c,r){var m=Math.cos(n),l=Math.sin(n);r||(r={});var g=c.x+((t.x-c.x)*m-(t.y-c.y)*l);return r.y=c.y+((t.x-c.x)*l+(t.y-c.y)*m),r.x=g,r},i.normalise=function(t){var n=i.magnitude(t);return n===0?{x:0,y:0}:{x:t.x/n,y:t.y/n}},i.dot=function(t,n){return t.x*n.x+t.y*n.y},i.cross=function(t,n){return t.x*n.y-t.y*n.x},i.cross3=function(t,n,c){return(n.x-t.x)*(c.y-t.y)-(n.y-t.y)*(c.x-t.x)},i.add=function(t,n,c){return c||(c={}),c.x=t.x+n.x,c.y=t.y+n.y,c},i.sub=function(t,n,c){return c||(c={}),c.x=t.x-n.x,c.y=t.y-n.y,c},i.mult=function(t,n){return{x:t.x*n,y:t.y*n}},i.div=function(t,n){return{x:t.x/n,y:t.y/n}},i.perp=function(t,n){return n=n===!0?-1:1,{x:n*-t.y,y:n*t.x}},i.neg=function(t){return{x:-t.x,y:-t.y}},i.angle=function(t,n){return Math.atan2(n.y-t.y,n.x-t.x)},i._temp=[i.create(),i.create(),i.create(),i.create(),i.create(),i.create()]}()},function(a,o,i){var t={};a.exports=t;var n=i(2),c=i(0);(function(){t.create=function(r,m){for(var l=[],g=0;g<r.length;g++){var p=r[g],s={x:p.x,y:p.y,index:g,body:m,isInternal:!1};l.push(s)}return l},t.fromPath=function(r,m){var l=/L?\s*([-\d.e]+)[\s,]*([-\d.e]+)*/ig,g=[];return r.replace(l,function(p,s,d){g.push({x:parseFloat(s),y:parseFloat(d)})}),t.create(g,m)},t.centre=function(r){for(var m=t.area(r,!0),l={x:0,y:0},g,p,s,d=0;d<r.length;d++)s=(d+1)%r.length,g=n.cross(r[d],r[s]),p=n.mult(n.add(r[d],r[s]),g),l=n.add(l,p);return n.div(l,6*m)},t.mean=function(r){for(var m={x:0,y:0},l=0;l<r.length;l++)m.x+=r[l].x,m.y+=r[l].y;return n.div(m,r.length)},t.area=function(r,m){for(var l=0,g=r.length-1,p=0;p<r.length;p++)l+=(r[g].x-r[p].x)*(r[g].y+r[p].y),g=p;return m?l/2:Math.abs(l)/2},t.inertia=function(r,m){for(var l=0,g=0,p=r,s,d,u=0;u<p.length;u++)d=(u+1)%p.length,s=Math.abs(n.cross(p[d],p[u])),l+=s*(n.dot(p[d],p[d])+n.dot(p[d],p[u])+n.dot(p[u],p[u])),g+=s;return m/6*(l/g)},t.translate=function(r,m,l){l=typeof l<"u"?l:1;var g=r.length,p=m.x*l,s=m.y*l,d;for(d=0;d<g;d++)r[d].x+=p,r[d].y+=s;return r},t.rotate=function(r,m,l){if(m!==0){var g=Math.cos(m),p=Math.sin(m),s=l.x,d=l.y,u=r.length,f,b,w,E;for(E=0;E<u;E++)f=r[E],b=f.x-s,w=f.y-d,f.x=s+(b*g-w*p),f.y=d+(b*p+w*g);return r}},t.contains=function(r,m){for(var l=m.x,g=m.y,p=r.length,s=r[p-1],d,u=0;u<p;u++){if(d=r[u],(l-s.x)*(d.y-s.y)+(g-s.y)*(s.x-d.x)>0)return!1;s=d}return!0},t.scale=function(r,m,l,g){if(m===1&&l===1)return r;g=g||t.centre(r);for(var p,s,d=0;d<r.length;d++)p=r[d],s=n.sub(p,g),r[d].x=g.x+s.x*m,r[d].y=g.y+s.y*l;return r},t.chamfer=function(r,m,l,g,p){typeof m=="number"?m=[m]:m=m||[8],l=typeof l<"u"?l:-1,g=g||2,p=p||14;for(var s=[],d=0;d<r.length;d++){var u=r[d-1>=0?d-1:r.length-1],f=r[d],b=r[(d+1)%r.length],w=m[d<m.length?d:m.length-1];if(w===0){s.push(f);continue}var E=n.normalise({x:f.y-u.y,y:u.x-f.x}),I=n.normalise({x:b.y-f.y,y:f.x-b.x}),v=Math.sqrt(2*Math.pow(w,2)),x=n.mult(c.clone(E),w),C=n.normalise(n.mult(n.add(E,I),.5)),y=n.sub(f,n.mult(C,v)),S=l;l===-1&&(S=Math.pow(w,.32)*1.75),S=c.clamp(S,g,p),S%2===1&&(S+=1);for(var M=Math.acos(n.dot(E,I)),A=M/S,q=0;q<S;q++)s.push(n.add(n.rotate(x,A*q),y))}return s},t.clockwiseSort=function(r){var m=t.mean(r);return r.sort(function(l,g){return n.angle(m,l)-n.angle(m,g)}),r},t.isConvex=function(r){var m=0,l=r.length,g,p,s,d;if(l<3)return null;for(g=0;g<l;g++)if(p=(g+1)%l,s=(g+2)%l,d=(r[p].x-r[g].x)*(r[s].y-r[p].y),d-=(r[p].y-r[g].y)*(r[s].x-r[p].x),d<0?m|=1:d>0&&(m|=2),m===3)return!1;return m!==0?!0:null},t.hull=function(r){var m=[],l=[],g,p;for(r=r.slice(0),r.sort(function(s,d){var u=s.x-d.x;return u!==0?u:s.y-d.y}),p=0;p<r.length;p+=1){for(g=r[p];l.length>=2&&n.cross3(l[l.length-2],l[l.length-1],g)<=0;)l.pop();l.push(g)}for(p=r.length-1;p>=0;p-=1){for(g=r[p];m.length>=2&&n.cross3(m[m.length-2],m[m.length-1],g)<=0;)m.pop();m.push(g)}return m.pop(),l.pop(),m.concat(l)}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(2),r=i(7),m=i(0),l=i(1),g=i(11);(function(){t._timeCorrection=!0,t._inertiaScale=4,t._nextCollidingGroupId=1,t._nextNonCollidingGroupId=-1,t._nextCategory=1,t._baseDelta=1e3/60,t.create=function(s){var d={id:m.nextId(),type:"body",label:"Body",parts:[],plugin:{},angle:0,vertices:n.fromPath("L 0 0 L 40 0 L 40 40 L 0 40"),position:{x:0,y:0},force:{x:0,y:0},torque:0,positionImpulse:{x:0,y:0},constraintImpulse:{x:0,y:0,angle:0},totalContacts:0,speed:0,angularSpeed:0,velocity:{x:0,y:0},angularVelocity:0,isSensor:!1,isStatic:!1,isSleeping:!1,motion:0,sleepThreshold:60,density:.001,restitution:0,friction:.1,frictionStatic:.5,frictionAir:.01,collisionFilter:{category:1,mask:4294967295,group:0},slop:.05,timeScale:1,render:{visible:!0,opacity:1,strokeStyle:null,fillStyle:null,lineWidth:null,sprite:{xScale:1,yScale:1,xOffset:0,yOffset:0}},events:null,bounds:null,chamfer:null,circleRadius:0,positionPrev:null,anglePrev:0,parent:null,axes:null,area:0,mass:0,inertia:0,deltaTime:16.666666666666668,_original:null},u=m.extend(d,s);return p(u,s),u},t.nextGroup=function(s){return s?t._nextNonCollidingGroupId--:t._nextCollidingGroupId++},t.nextCategory=function(){return t._nextCategory=t._nextCategory<<1,t._nextCategory};var p=function(s,d){d=d||{},t.set(s,{bounds:s.bounds||l.create(s.vertices),positionPrev:s.positionPrev||c.clone(s.position),anglePrev:s.anglePrev||s.angle,vertices:s.vertices,parts:s.parts||[s],isStatic:s.isStatic,isSleeping:s.isSleeping,parent:s.parent||s}),n.rotate(s.vertices,s.angle,s.position),g.rotate(s.axes,s.angle),l.update(s.bounds,s.vertices,s.velocity),t.set(s,{axes:d.axes||s.axes,area:d.area||s.area,mass:d.mass||s.mass,inertia:d.inertia||s.inertia});var u=s.isStatic?"#14151f":m.choose(["#f19648","#f5d259","#f55a3c","#063e7b","#ececd1"]),f=s.isStatic?"#555":"#ccc",b=s.isStatic&&s.render.fillStyle===null?1:0;s.render.fillStyle=s.render.fillStyle||u,s.render.strokeStyle=s.render.strokeStyle||f,s.render.lineWidth=s.render.lineWidth||b,s.render.sprite.xOffset+=-(s.bounds.min.x-s.position.x)/(s.bounds.max.x-s.bounds.min.x),s.render.sprite.yOffset+=-(s.bounds.min.y-s.position.y)/(s.bounds.max.y-s.bounds.min.y)};t.set=function(s,d,u){var f;typeof d=="string"&&(f=d,d={},d[f]=u);for(f in d)if(Object.prototype.hasOwnProperty.call(d,f))switch(u=d[f],f){case"isStatic":t.setStatic(s,u);break;case"isSleeping":r.set(s,u);break;case"mass":t.setMass(s,u);break;case"density":t.setDensity(s,u);break;case"inertia":t.setInertia(s,u);break;case"vertices":t.setVertices(s,u);break;case"position":t.setPosition(s,u);break;case"angle":t.setAngle(s,u);break;case"velocity":t.setVelocity(s,u);break;case"angularVelocity":t.setAngularVelocity(s,u);break;case"speed":t.setSpeed(s,u);break;case"angularSpeed":t.setAngularSpeed(s,u);break;case"parts":t.setParts(s,u);break;case"centre":t.setCentre(s,u);break;default:s[f]=u}},t.setStatic=function(s,d){for(var u=0;u<s.parts.length;u++){var f=s.parts[u];d?(f.isStatic||(f._original={restitution:f.restitution,friction:f.friction,mass:f.mass,inertia:f.inertia,density:f.density,inverseMass:f.inverseMass,inverseInertia:f.inverseInertia}),f.restitution=0,f.friction=1,f.mass=f.inertia=f.density=1/0,f.inverseMass=f.inverseInertia=0,f.positionPrev.x=f.position.x,f.positionPrev.y=f.position.y,f.anglePrev=f.angle,f.angularVelocity=0,f.speed=0,f.angularSpeed=0,f.motion=0):f._original&&(f.restitution=f._original.restitution,f.friction=f._original.friction,f.mass=f._original.mass,f.inertia=f._original.inertia,f.density=f._original.density,f.inverseMass=f._original.inverseMass,f.inverseInertia=f._original.inverseInertia,f._original=null),f.isStatic=d}},t.setMass=function(s,d){var u=s.inertia/(s.mass/6);s.inertia=u*(d/6),s.inverseInertia=1/s.inertia,s.mass=d,s.inverseMass=1/s.mass,s.density=s.mass/s.area},t.setDensity=function(s,d){t.setMass(s,d*s.area),s.density=d},t.setInertia=function(s,d){s.inertia=d,s.inverseInertia=1/s.inertia},t.setVertices=function(s,d){d[0].body===s?s.vertices=d:s.vertices=n.create(d,s),s.axes=g.fromVertices(s.vertices),s.area=n.area(s.vertices),t.setMass(s,s.density*s.area);var u=n.centre(s.vertices);n.translate(s.vertices,u,-1),t.setInertia(s,t._inertiaScale*n.inertia(s.vertices,s.mass)),n.translate(s.vertices,s.position),l.update(s.bounds,s.vertices,s.velocity)},t.setParts=function(s,d,u){var f;for(d=d.slice(0),s.parts.length=0,s.parts.push(s),s.parent=s,f=0;f<d.length;f++){var b=d[f];b!==s&&(b.parent=s,s.parts.push(b))}if(s.parts.length!==1){if(u=typeof u<"u"?u:!0,u){var w=[];for(f=0;f<d.length;f++)w=w.concat(d[f].vertices);n.clockwiseSort(w);var E=n.hull(w),I=n.centre(E);t.setVertices(s,E),n.translate(s.vertices,I)}var v=t._totalProperties(s);s.area=v.area,s.parent=s,s.position.x=v.centre.x,s.position.y=v.centre.y,s.positionPrev.x=v.centre.x,s.positionPrev.y=v.centre.y,t.setMass(s,v.mass),t.setInertia(s,v.inertia),t.setPosition(s,v.centre)}},t.setCentre=function(s,d,u){u?(s.positionPrev.x+=d.x,s.positionPrev.y+=d.y,s.position.x+=d.x,s.position.y+=d.y):(s.positionPrev.x=d.x-(s.position.x-s.positionPrev.x),s.positionPrev.y=d.y-(s.position.y-s.positionPrev.y),s.position.x=d.x,s.position.y=d.y)},t.setPosition=function(s,d,u){var f=c.sub(d,s.position);u?(s.positionPrev.x=s.position.x,s.positionPrev.y=s.position.y,s.velocity.x=f.x,s.velocity.y=f.y,s.speed=c.magnitude(f)):(s.positionPrev.x+=f.x,s.positionPrev.y+=f.y);for(var b=0;b<s.parts.length;b++){var w=s.parts[b];w.position.x+=f.x,w.position.y+=f.y,n.translate(w.vertices,f),l.update(w.bounds,w.vertices,s.velocity)}},t.setAngle=function(s,d,u){var f=d-s.angle;u?(s.anglePrev=s.angle,s.angularVelocity=f,s.angularSpeed=Math.abs(f)):s.anglePrev+=f;for(var b=0;b<s.parts.length;b++){var w=s.parts[b];w.angle+=f,n.rotate(w.vertices,f,s.position),g.rotate(w.axes,f),l.update(w.bounds,w.vertices,s.velocity),b>0&&c.rotateAbout(w.position,f,s.position,w.position)}},t.setVelocity=function(s,d){var u=s.deltaTime/t._baseDelta;s.positionPrev.x=s.position.x-d.x*u,s.positionPrev.y=s.position.y-d.y*u,s.velocity.x=(s.position.x-s.positionPrev.x)/u,s.velocity.y=(s.position.y-s.positionPrev.y)/u,s.speed=c.magnitude(s.velocity)},t.getVelocity=function(s){var d=t._baseDelta/s.deltaTime;return{x:(s.position.x-s.positionPrev.x)*d,y:(s.position.y-s.positionPrev.y)*d}},t.getSpeed=function(s){return c.magnitude(t.getVelocity(s))},t.setSpeed=function(s,d){t.setVelocity(s,c.mult(c.normalise(t.getVelocity(s)),d))},t.setAngularVelocity=function(s,d){var u=s.deltaTime/t._baseDelta;s.anglePrev=s.angle-d*u,s.angularVelocity=(s.angle-s.anglePrev)/u,s.angularSpeed=Math.abs(s.angularVelocity)},t.getAngularVelocity=function(s){return(s.angle-s.anglePrev)*t._baseDelta/s.deltaTime},t.getAngularSpeed=function(s){return Math.abs(t.getAngularVelocity(s))},t.setAngularSpeed=function(s,d){t.setAngularVelocity(s,m.sign(t.getAngularVelocity(s))*d)},t.translate=function(s,d,u){t.setPosition(s,c.add(s.position,d),u)},t.rotate=function(s,d,u,f){if(!u)t.setAngle(s,s.angle+d,f);else{var b=Math.cos(d),w=Math.sin(d),E=s.position.x-u.x,I=s.position.y-u.y;t.setPosition(s,{x:u.x+(E*b-I*w),y:u.y+(E*w+I*b)},f),t.setAngle(s,s.angle+d,f)}},t.scale=function(s,d,u,f){var b=0,w=0;f=f||s.position;for(var E=0;E<s.parts.length;E++){var I=s.parts[E];n.scale(I.vertices,d,u,f),I.axes=g.fromVertices(I.vertices),I.area=n.area(I.vertices),t.setMass(I,s.density*I.area),n.translate(I.vertices,{x:-I.position.x,y:-I.position.y}),t.setInertia(I,t._inertiaScale*n.inertia(I.vertices,I.mass)),n.translate(I.vertices,{x:I.position.x,y:I.position.y}),E>0&&(b+=I.area,w+=I.inertia),I.position.x=f.x+(I.position.x-f.x)*d,I.position.y=f.y+(I.position.y-f.y)*u,l.update(I.bounds,I.vertices,s.velocity)}s.parts.length>1&&(s.area=b,s.isStatic||(t.setMass(s,s.density*b),t.setInertia(s,w))),s.circleRadius&&(d===u?s.circleRadius*=d:s.circleRadius=null)},t.update=function(s,d){d=(typeof d<"u"?d:1e3/60)*s.timeScale;var u=d*d,f=t._timeCorrection?d/(s.deltaTime||d):1,b=1-s.frictionAir*(d/m._baseDelta),w=(s.position.x-s.positionPrev.x)*f,E=(s.position.y-s.positionPrev.y)*f;s.velocity.x=w*b+s.force.x/s.mass*u,s.velocity.y=E*b+s.force.y/s.mass*u,s.positionPrev.x=s.position.x,s.positionPrev.y=s.position.y,s.position.x+=s.velocity.x,s.position.y+=s.velocity.y,s.deltaTime=d,s.angularVelocity=(s.angle-s.anglePrev)*b*f+s.torque/s.inertia*u,s.anglePrev=s.angle,s.angle+=s.angularVelocity;for(var I=0;I<s.parts.length;I++){var v=s.parts[I];n.translate(v.vertices,s.velocity),I>0&&(v.position.x+=s.velocity.x,v.position.y+=s.velocity.y),s.angularVelocity!==0&&(n.rotate(v.vertices,s.angularVelocity,s.position),g.rotate(v.axes,s.angularVelocity),I>0&&c.rotateAbout(v.position,s.angularVelocity,s.position,v.position)),l.update(v.bounds,v.vertices,s.velocity)}},t.updateVelocities=function(s){var d=t._baseDelta/s.deltaTime,u=s.velocity;u.x=(s.position.x-s.positionPrev.x)*d,u.y=(s.position.y-s.positionPrev.y)*d,s.speed=Math.sqrt(u.x*u.x+u.y*u.y),s.angularVelocity=(s.angle-s.anglePrev)*d,s.angularSpeed=Math.abs(s.angularVelocity)},t.applyForce=function(s,d,u){var f={x:d.x-s.position.x,y:d.y-s.position.y};s.force.x+=u.x,s.force.y+=u.y,s.torque+=f.x*u.y-f.y*u.x},t._totalProperties=function(s){for(var d={mass:0,area:0,inertia:0,centre:{x:0,y:0}},u=s.parts.length===1?0:1;u<s.parts.length;u++){var f=s.parts[u],b=f.mass!==1/0?f.mass:1;d.mass+=b,d.area+=f.area,d.inertia+=f.inertia,d.centre=c.add(d.centre,c.mult(f.position,b))}return d.centre=c.div(d.centre,d.mass),d}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t.on=function(c,r,m){for(var l=r.split(" "),g,p=0;p<l.length;p++)g=l[p],c.events=c.events||{},c.events[g]=c.events[g]||[],c.events[g].push(m);return m},t.off=function(c,r,m){if(!r){c.events={};return}typeof r=="function"&&(m=r,r=n.keys(c.events).join(" "));for(var l=r.split(" "),g=0;g<l.length;g++){var p=c.events[l[g]],s=[];if(m&&p)for(var d=0;d<p.length;d++)p[d]!==m&&s.push(p[d]);c.events[l[g]]=s}},t.trigger=function(c,r,m){var l,g,p,s,d=c.events;if(d&&n.keys(d).length>0){m||(m={}),l=r.split(" ");for(var u=0;u<l.length;u++)if(g=l[u],p=d[g],p){s=n.clone(m,!1),s.name=g,s.source=c;for(var f=0;f<p.length;f++)p[f].apply(c,[s])}}}})()},function(a,o,i){var t={};a.exports=t;var n=i(5),c=i(0),r=i(1),m=i(4);(function(){t.create=function(l){return c.extend({id:c.nextId(),type:"composite",parent:null,isModified:!1,bodies:[],constraints:[],composites:[],label:"Composite",plugin:{},cache:{allBodies:null,allConstraints:null,allComposites:null}},l)},t.setModified=function(l,g,p,s){if(l.isModified=g,g&&l.cache&&(l.cache.allBodies=null,l.cache.allConstraints=null,l.cache.allComposites=null),p&&l.parent&&t.setModified(l.parent,g,p,s),s)for(var d=0;d<l.composites.length;d++){var u=l.composites[d];t.setModified(u,g,p,s)}},t.add=function(l,g){var p=[].concat(g);n.trigger(l,"beforeAdd",{object:g});for(var s=0;s<p.length;s++){var d=p[s];switch(d.type){case"body":if(d.parent!==d){c.warn("Composite.add: skipped adding a compound body part (you must add its parent instead)");break}t.addBody(l,d);break;case"constraint":t.addConstraint(l,d);break;case"composite":t.addComposite(l,d);break;case"mouseConstraint":t.addConstraint(l,d.constraint);break}}return n.trigger(l,"afterAdd",{object:g}),l},t.remove=function(l,g,p){var s=[].concat(g);n.trigger(l,"beforeRemove",{object:g});for(var d=0;d<s.length;d++){var u=s[d];switch(u.type){case"body":t.removeBody(l,u,p);break;case"constraint":t.removeConstraint(l,u,p);break;case"composite":t.removeComposite(l,u,p);break;case"mouseConstraint":t.removeConstraint(l,u.constraint);break}}return n.trigger(l,"afterRemove",{object:g}),l},t.addComposite=function(l,g){return l.composites.push(g),g.parent=l,t.setModified(l,!0,!0,!1),l},t.removeComposite=function(l,g,p){var s=c.indexOf(l.composites,g);if(s!==-1){var d=t.allBodies(g);t.removeCompositeAt(l,s);for(var u=0;u<d.length;u++)d[u].sleepCounter=0}if(p)for(var u=0;u<l.composites.length;u++)t.removeComposite(l.composites[u],g,!0);return l},t.removeCompositeAt=function(l,g){return l.composites.splice(g,1),t.setModified(l,!0,!0,!1),l},t.addBody=function(l,g){return l.bodies.push(g),t.setModified(l,!0,!0,!1),l},t.removeBody=function(l,g,p){var s=c.indexOf(l.bodies,g);if(s!==-1&&(t.removeBodyAt(l,s),g.sleepCounter=0),p)for(var d=0;d<l.composites.length;d++)t.removeBody(l.composites[d],g,!0);return l},t.removeBodyAt=function(l,g){return l.bodies.splice(g,1),t.setModified(l,!0,!0,!1),l},t.addConstraint=function(l,g){return l.constraints.push(g),t.setModified(l,!0,!0,!1),l},t.removeConstraint=function(l,g,p){var s=c.indexOf(l.constraints,g);if(s!==-1&&t.removeConstraintAt(l,s),p)for(var d=0;d<l.composites.length;d++)t.removeConstraint(l.composites[d],g,!0);return l},t.removeConstraintAt=function(l,g){return l.constraints.splice(g,1),t.setModified(l,!0,!0,!1),l},t.clear=function(l,g,p){if(p)for(var s=0;s<l.composites.length;s++)t.clear(l.composites[s],g,!0);return g?l.bodies=l.bodies.filter(function(d){return d.isStatic}):l.bodies.length=0,l.constraints.length=0,l.composites.length=0,t.setModified(l,!0,!0,!1),l},t.allBodies=function(l){if(l.cache&&l.cache.allBodies)return l.cache.allBodies;for(var g=[].concat(l.bodies),p=0;p<l.composites.length;p++)g=g.concat(t.allBodies(l.composites[p]));return l.cache&&(l.cache.allBodies=g),g},t.allConstraints=function(l){if(l.cache&&l.cache.allConstraints)return l.cache.allConstraints;for(var g=[].concat(l.constraints),p=0;p<l.composites.length;p++)g=g.concat(t.allConstraints(l.composites[p]));return l.cache&&(l.cache.allConstraints=g),g},t.allComposites=function(l){if(l.cache&&l.cache.allComposites)return l.cache.allComposites;for(var g=[].concat(l.composites),p=0;p<l.composites.length;p++)g=g.concat(t.allComposites(l.composites[p]));return l.cache&&(l.cache.allComposites=g),g},t.get=function(l,g,p){var s,d;switch(p){case"body":s=t.allBodies(l);break;case"constraint":s=t.allConstraints(l);break;case"composite":s=t.allComposites(l).concat(l);break}return s?(d=s.filter(function(u){return u.id.toString()===g.toString()}),d.length===0?null:d[0]):null},t.move=function(l,g,p){return t.remove(l,g),t.add(p,g),l},t.rebase=function(l){for(var g=t.allBodies(l).concat(t.allConstraints(l)).concat(t.allComposites(l)),p=0;p<g.length;p++)g[p].id=c.nextId();return l},t.translate=function(l,g,p){for(var s=p?t.allBodies(l):l.bodies,d=0;d<s.length;d++)m.translate(s[d],g);return l},t.rotate=function(l,g,p,s){for(var d=Math.cos(g),u=Math.sin(g),f=s?t.allBodies(l):l.bodies,b=0;b<f.length;b++){var w=f[b],E=w.position.x-p.x,I=w.position.y-p.y;m.setPosition(w,{x:p.x+(E*d-I*u),y:p.y+(E*u+I*d)}),m.rotate(w,g)}return l},t.scale=function(l,g,p,s,d){for(var u=d?t.allBodies(l):l.bodies,f=0;f<u.length;f++){var b=u[f],w=b.position.x-s.x,E=b.position.y-s.y;m.setPosition(b,{x:s.x+w*g,y:s.y+E*p}),m.scale(b,g,p)}return l},t.bounds=function(l){for(var g=t.allBodies(l),p=[],s=0;s<g.length;s+=1){var d=g[s];p.push(d.bounds.min,d.bounds.max)}return r.create(p)}})()},function(a,o,i){var t={};a.exports=t;var n=i(4),c=i(5),r=i(0);(function(){t._motionWakeThreshold=.18,t._motionSleepThreshold=.08,t._minBias=.9,t.update=function(m,l){for(var g=l/r._baseDelta,p=t._motionSleepThreshold,s=0;s<m.length;s++){var d=m[s],u=n.getSpeed(d),f=n.getAngularSpeed(d),b=u*u+f*f;if(d.force.x!==0||d.force.y!==0){t.set(d,!1);continue}var w=Math.min(d.motion,b),E=Math.max(d.motion,b);d.motion=t._minBias*w+(1-t._minBias)*E,d.sleepThreshold>0&&d.motion<p?(d.sleepCounter+=1,d.sleepCounter>=d.sleepThreshold/g&&t.set(d,!0)):d.sleepCounter>0&&(d.sleepCounter-=1)}},t.afterCollisions=function(m){for(var l=t._motionSleepThreshold,g=0;g<m.length;g++){var p=m[g];if(p.isActive){var s=p.collision,d=s.bodyA.parent,u=s.bodyB.parent;if(!(d.isSleeping&&u.isSleeping||d.isStatic||u.isStatic)&&(d.isSleeping||u.isSleeping)){var f=d.isSleeping&&!d.isStatic?d:u,b=f===d?u:d;!f.isStatic&&b.motion>l&&t.set(f,!1)}}}},t.set=function(m,l){var g=m.isSleeping;l?(m.isSleeping=!0,m.sleepCounter=m.sleepThreshold,m.positionImpulse.x=0,m.positionImpulse.y=0,m.positionPrev.x=m.position.x,m.positionPrev.y=m.position.y,m.anglePrev=m.angle,m.speed=0,m.angularSpeed=0,m.motion=0,g||c.trigger(m,"sleepStart")):(m.isSleeping=!1,m.sleepCounter=0,g&&c.trigger(m,"sleepEnd"))}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(9);(function(){var r=[],m={overlap:0,axis:null},l={overlap:0,axis:null};t.create=function(g,p){return{pair:null,collided:!1,bodyA:g,bodyB:p,parentA:g.parent,parentB:p.parent,depth:0,normal:{x:0,y:0},tangent:{x:0,y:0},penetration:{x:0,y:0},supports:[null,null],supportCount:0}},t.collides=function(g,p,s){if(t._overlapAxes(m,g.vertices,p.vertices,g.axes),m.overlap<=0||(t._overlapAxes(l,p.vertices,g.vertices,p.axes),l.overlap<=0))return null;var d=s&&s.table[c.id(g,p)],u;d?u=d.collision:(u=t.create(g,p),u.collided=!0,u.bodyA=g.id<p.id?g:p,u.bodyB=g.id<p.id?p:g,u.parentA=u.bodyA.parent,u.parentB=u.bodyB.parent),g=u.bodyA,p=u.bodyB;var f;m.overlap<l.overlap?f=m:f=l;var b=u.normal,w=u.tangent,E=u.penetration,I=u.supports,v=f.overlap,x=f.axis,C=x.x,y=x.y,S=p.position.x-g.position.x,M=p.position.y-g.position.y;C*S+y*M>=0&&(C=-C,y=-y),b.x=C,b.y=y,w.x=-y,w.y=C,E.x=C*v,E.y=y*v,u.depth=v;var A=t._findSupports(g,p,b,1),q=0;if(n.contains(g.vertices,A[0])&&(I[q++]=A[0]),n.contains(g.vertices,A[1])&&(I[q++]=A[1]),q<2){var k=t._findSupports(p,g,b,-1);n.contains(p.vertices,k[0])&&(I[q++]=k[0]),q<2&&n.contains(p.vertices,k[1])&&(I[q++]=k[1])}return q===0&&(I[q++]=A[0]),u.supportCount=q,u},t._overlapAxes=function(g,p,s,d){var u=p.length,f=s.length,b=p[0].x,w=p[0].y,E=s[0].x,I=s[0].y,v=d.length,x=Number.MAX_VALUE,C=0,y,S,M,A,q,k;for(q=0;q<v;q++){var D=d[q],T=D.x,_=D.y,z=b*T+w*_,O=E*T+I*_,F=z,G=O;for(k=1;k<u;k+=1)A=p[k].x*T+p[k].y*_,A>F?F=A:A<z&&(z=A);for(k=1;k<f;k+=1)A=s[k].x*T+s[k].y*_,A>G?G=A:A<O&&(O=A);if(S=F-O,M=G-z,y=S<M?S:M,y<x&&(x=y,C=q,y<=0))break}g.axis=d[C],g.overlap=x},t._findSupports=function(g,p,s,d){var u=p.vertices,f=u.length,b=g.position.x,w=g.position.y,E=s.x*d,I=s.y*d,v=u[0],x=v,C=E*(b-x.x)+I*(w-x.y),y,S,M;for(M=1;M<f;M+=1)x=u[M],S=E*(b-x.x)+I*(w-x.y),S<C&&(C=S,v=x);return y=u[(f+v.index-1)%f],C=E*(b-y.x)+I*(w-y.y),x=u[(v.index+1)%f],E*(b-x.x)+I*(w-x.y)<C?(r[0]=v,r[1]=x,r):(r[0]=v,r[1]=y,r)}})()},function(a,o,i){var t={};a.exports=t;var n=i(16);(function(){t.create=function(c,r){var m=c.bodyA,l=c.bodyB,g={id:t.id(m,l),bodyA:m,bodyB:l,collision:c,contacts:[n.create(),n.create()],contactCount:0,separation:0,isActive:!0,isSensor:m.isSensor||l.isSensor,timeCreated:r,timeUpdated:r,inverseMass:0,friction:0,frictionStatic:0,restitution:0,slop:0};return t.update(g,c,r),g},t.update=function(c,r,m){var l=r.supports,g=r.supportCount,p=c.contacts,s=r.parentA,d=r.parentB;c.isActive=!0,c.timeUpdated=m,c.collision=r,c.separation=r.depth,c.inverseMass=s.inverseMass+d.inverseMass,c.friction=s.friction<d.friction?s.friction:d.friction,c.frictionStatic=s.frictionStatic>d.frictionStatic?s.frictionStatic:d.frictionStatic,c.restitution=s.restitution>d.restitution?s.restitution:d.restitution,c.slop=s.slop>d.slop?s.slop:d.slop,c.contactCount=g,r.pair=c;var u=l[0],f=p[0],b=l[1],w=p[1];(w.vertex===u||f.vertex===b)&&(p[1]=f,p[0]=f=w,w=p[1]),f.vertex=u,w.vertex=b},t.setActive=function(c,r,m){r?(c.isActive=!0,c.timeUpdated=m):(c.isActive=!1,c.contactCount=0)},t.id=function(c,r){return c.id<r.id?c.id.toString(36)+":"+r.id.toString(36):r.id.toString(36)+":"+c.id.toString(36)}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(2),r=i(7),m=i(1),l=i(11),g=i(0);(function(){t._warming=.4,t._torqueDampen=1,t._minLength=1e-6,t.create=function(p){var s=p;s.bodyA&&!s.pointA&&(s.pointA={x:0,y:0}),s.bodyB&&!s.pointB&&(s.pointB={x:0,y:0});var d=s.bodyA?c.add(s.bodyA.position,s.pointA):s.pointA,u=s.bodyB?c.add(s.bodyB.position,s.pointB):s.pointB,f=c.magnitude(c.sub(d,u));s.length=typeof s.length<"u"?s.length:f,s.id=s.id||g.nextId(),s.label=s.label||"Constraint",s.type="constraint",s.stiffness=s.stiffness||(s.length>0?1:.7),s.damping=s.damping||0,s.angularStiffness=s.angularStiffness||0,s.angleA=s.bodyA?s.bodyA.angle:s.angleA,s.angleB=s.bodyB?s.bodyB.angle:s.angleB,s.plugin={};var b={visible:!0,lineWidth:2,strokeStyle:"#ffffff",type:"line",anchors:!0};return s.length===0&&s.stiffness>.1?(b.type="pin",b.anchors=!1):s.stiffness<.9&&(b.type="spring"),s.render=g.extend(b,s.render),s},t.preSolveAll=function(p){for(var s=0;s<p.length;s+=1){var d=p[s],u=d.constraintImpulse;d.isStatic||u.x===0&&u.y===0&&u.angle===0||(d.position.x+=u.x,d.position.y+=u.y,d.angle+=u.angle)}},t.solveAll=function(p,s){for(var d=g.clamp(s/g._baseDelta,0,1),u=0;u<p.length;u+=1){var f=p[u],b=!f.bodyA||f.bodyA&&f.bodyA.isStatic,w=!f.bodyB||f.bodyB&&f.bodyB.isStatic;(b||w)&&t.solve(p[u],d)}for(u=0;u<p.length;u+=1)f=p[u],b=!f.bodyA||f.bodyA&&f.bodyA.isStatic,w=!f.bodyB||f.bodyB&&f.bodyB.isStatic,!b&&!w&&t.solve(p[u],d)},t.solve=function(p,s){var d=p.bodyA,u=p.bodyB,f=p.pointA,b=p.pointB;if(!(!d&&!u)){d&&!d.isStatic&&(c.rotate(f,d.angle-p.angleA,f),p.angleA=d.angle),u&&!u.isStatic&&(c.rotate(b,u.angle-p.angleB,b),p.angleB=u.angle);var w=f,E=b;if(d&&(w=c.add(d.position,f)),u&&(E=c.add(u.position,b)),!(!w||!E)){var I=c.sub(w,E),v=c.magnitude(I);v<t._minLength&&(v=t._minLength);var x=(v-p.length)/v,C=p.stiffness>=1||p.length===0,y=C?p.stiffness*s:p.stiffness*s*s,S=p.damping*s,M=c.mult(I,x*y),A=(d?d.inverseMass:0)+(u?u.inverseMass:0),q=(d?d.inverseInertia:0)+(u?u.inverseInertia:0),k=A+q,D,T,_,z,O;if(S>0){var F=c.create();_=c.div(I,v),O=c.sub(u&&c.sub(u.position,u.positionPrev)||F,d&&c.sub(d.position,d.positionPrev)||F),z=c.dot(_,O)}d&&!d.isStatic&&(T=d.inverseMass/A,d.constraintImpulse.x-=M.x*T,d.constraintImpulse.y-=M.y*T,d.position.x-=M.x*T,d.position.y-=M.y*T,S>0&&(d.positionPrev.x-=S*_.x*z*T,d.positionPrev.y-=S*_.y*z*T),D=c.cross(f,M)/k*t._torqueDampen*d.inverseInertia*(1-p.angularStiffness),d.constraintImpulse.angle-=D,d.angle-=D),u&&!u.isStatic&&(T=u.inverseMass/A,u.constraintImpulse.x+=M.x*T,u.constraintImpulse.y+=M.y*T,u.position.x+=M.x*T,u.position.y+=M.y*T,S>0&&(u.positionPrev.x+=S*_.x*z*T,u.positionPrev.y+=S*_.y*z*T),D=c.cross(b,M)/k*t._torqueDampen*u.inverseInertia*(1-p.angularStiffness),u.constraintImpulse.angle+=D,u.angle+=D)}}},t.postSolveAll=function(p){for(var s=0;s<p.length;s++){var d=p[s],u=d.constraintImpulse;if(!(d.isStatic||u.x===0&&u.y===0&&u.angle===0)){r.set(d,!1);for(var f=0;f<d.parts.length;f++){var b=d.parts[f];n.translate(b.vertices,u),f>0&&(b.position.x+=u.x,b.position.y+=u.y),u.angle!==0&&(n.rotate(b.vertices,u.angle,d.position),l.rotate(b.axes,u.angle),f>0&&c.rotateAbout(b.position,u.angle,d.position,b.position)),m.update(b.bounds,b.vertices,d.velocity)}u.angle*=t._warming,u.x*=t._warming,u.y*=t._warming}}},t.pointAWorld=function(p){return{x:(p.bodyA?p.bodyA.position.x:0)+(p.pointA?p.pointA.x:0),y:(p.bodyA?p.bodyA.position.y:0)+(p.pointA?p.pointA.y:0)}},t.pointBWorld=function(p){return{x:(p.bodyB?p.bodyB.position.x:0)+(p.pointB?p.pointB.x:0),y:(p.bodyB?p.bodyB.position.y:0)+(p.pointB?p.pointB.y:0)}},t.currentLength=function(p){var s=(p.bodyA?p.bodyA.position.x:0)+(p.pointA?p.pointA.x:0),d=(p.bodyA?p.bodyA.position.y:0)+(p.pointA?p.pointA.y:0),u=(p.bodyB?p.bodyB.position.x:0)+(p.pointB?p.pointB.x:0),f=(p.bodyB?p.bodyB.position.y:0)+(p.pointB?p.pointB.y:0),b=s-u,w=d-f;return Math.sqrt(b*b+w*w)}})()},function(a,o,i){var t={};a.exports=t;var n=i(2),c=i(0);(function(){t.fromVertices=function(r){for(var m={},l=0;l<r.length;l++){var g=(l+1)%r.length,p=n.normalise({x:r[g].y-r[l].y,y:r[l].x-r[g].x}),s=p.y===0?1/0:p.x/p.y;s=s.toFixed(3).toString(),m[s]=p}return c.values(m)},t.rotate=function(r,m){if(m!==0)for(var l=Math.cos(m),g=Math.sin(m),p=0;p<r.length;p++){var s=r[p],d;d=s.x*l-s.y*g,s.y=s.x*g+s.y*l,s.x=d}}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(0),r=i(4),m=i(1),l=i(2);(function(){t.rectangle=function(g,p,s,d,u){u=u||{};var f={label:"Rectangle Body",position:{x:g,y:p},vertices:n.fromPath("L 0 0 L "+s+" 0 L "+s+" "+d+" L 0 "+d)};if(u.chamfer){var b=u.chamfer;f.vertices=n.chamfer(f.vertices,b.radius,b.quality,b.qualityMin,b.qualityMax),delete u.chamfer}return r.create(c.extend({},f,u))},t.trapezoid=function(g,p,s,d,u,f){f=f||{},u>=1&&c.warn("Bodies.trapezoid: slope parameter must be < 1."),u*=.5;var b=(1-u*2)*s,w=s*u,E=w+b,I=E+w,v;u<.5?v="L 0 0 L "+w+" "+-d+" L "+E+" "+-d+" L "+I+" 0":v="L 0 0 L "+E+" "+-d+" L "+I+" 0";var x={label:"Trapezoid Body",position:{x:g,y:p},vertices:n.fromPath(v)};if(f.chamfer){var C=f.chamfer;x.vertices=n.chamfer(x.vertices,C.radius,C.quality,C.qualityMin,C.qualityMax),delete f.chamfer}return r.create(c.extend({},x,f))},t.circle=function(g,p,s,d,u){d=d||{};var f={label:"Circle Body",circleRadius:s};u=u||25;var b=Math.ceil(Math.max(10,Math.min(u,s)));return b%2===1&&(b+=1),t.polygon(g,p,b,s,c.extend({},f,d))},t.polygon=function(g,p,s,d,u){if(u=u||{},s<3)return t.circle(g,p,d,u);for(var f=2*Math.PI/s,b="",w=f*.5,E=0;E<s;E+=1){var I=w+E*f,v=Math.cos(I)*d,x=Math.sin(I)*d;b+="L "+v.toFixed(3)+" "+x.toFixed(3)+" "}var C={label:"Polygon Body",position:{x:g,y:p},vertices:n.fromPath(b)};if(u.chamfer){var y=u.chamfer;C.vertices=n.chamfer(C.vertices,y.radius,y.quality,y.qualityMin,y.qualityMax),delete u.chamfer}return r.create(c.extend({},C,u))},t.fromVertices=function(g,p,s,d,u,f,b,w){var E=c.getDecomp(),I,v,x,C,y,S,M,A,q,k,D;for(I=!!(E&&E.quickDecomp),d=d||{},x=[],u=typeof u<"u"?u:!1,f=typeof f<"u"?f:.01,b=typeof b<"u"?b:10,w=typeof w<"u"?w:.01,c.isArray(s[0])||(s=[s]),k=0;k<s.length;k+=1)if(S=s[k],C=n.isConvex(S),y=!C,y&&!I&&c.warnOnce("Bodies.fromVertices: Install the 'poly-decomp' library and use Common.setDecomp or provide 'decomp' as a global to decompose concave vertices."),C||!I)C?S=n.clockwiseSort(S):S=n.hull(S),x.push({position:{x:g,y:p},vertices:S});else{var T=S.map(function(U){return[U.x,U.y]});E.makeCCW(T),f!==!1&&E.removeCollinearPoints(T,f),w!==!1&&E.removeDuplicatePoints&&E.removeDuplicatePoints(T,w);var _=E.quickDecomp(T);for(M=0;M<_.length;M++){var z=_[M],O=z.map(function(U){return{x:U[0],y:U[1]}});b>0&&n.area(O)<b||x.push({position:n.centre(O),vertices:O})}}for(M=0;M<x.length;M++)x[M]=r.create(c.extend(x[M],d));if(u){var F=5;for(M=0;M<x.length;M++){var G=x[M];for(A=M+1;A<x.length;A++){var H=x[A];if(m.overlaps(G.bounds,H.bounds)){var W=G.vertices,X=H.vertices;for(q=0;q<G.vertices.length;q++)for(D=0;D<H.vertices.length;D++){var fe=l.magnitudeSquared(l.sub(W[(q+1)%W.length],X[D])),ne=l.magnitudeSquared(l.sub(W[q],X[(D+1)%X.length]));fe<F&&ne<F&&(W[q].isInternal=!0,X[D].isInternal=!0)}}}}}return x.length>1?(v=r.create(c.extend({parts:x.slice(0)},d)),r.setPosition(v,{x:g,y:p}),v):x[0]}})()},function(a,o,i){var t={};a.exports=t;var n=i(0),c=i(8);(function(){t.create=function(r){var m={bodies:[],collisions:[],pairs:null};return n.extend(m,r)},t.setBodies=function(r,m){r.bodies=m.slice(0)},t.clear=function(r){r.bodies=[],r.collisions=[]},t.collisions=function(r){var m=r.pairs,l=r.bodies,g=l.length,p=t.canCollide,s=c.collides,d=r.collisions,u=0,f,b;for(l.sort(t._compareBoundsX),f=0;f<g;f++){var w=l[f],E=w.bounds,I=w.bounds.max.x,v=w.bounds.max.y,x=w.bounds.min.y,C=w.isStatic||w.isSleeping,y=w.parts.length,S=y===1;for(b=f+1;b<g;b++){var M=l[b],A=M.bounds;if(A.min.x>I)break;if(!(v<A.min.y||x>A.max.y)&&!(C&&(M.isStatic||M.isSleeping))&&p(w.collisionFilter,M.collisionFilter)){var q=M.parts.length;if(S&&q===1){var k=s(w,M,m);k&&(d[u++]=k)}else for(var D=y>1?1:0,T=q>1?1:0,_=D;_<y;_++)for(var z=w.parts[_],E=z.bounds,O=T;O<q;O++){var F=M.parts[O],A=F.bounds;if(!(E.min.x>A.max.x||E.max.x<A.min.x||E.max.y<A.min.y||E.min.y>A.max.y)){var k=s(z,F,m);k&&(d[u++]=k)}}}}}return d.length!==u&&(d.length=u),d},t.canCollide=function(r,m){return r.group===m.group&&r.group!==0?r.group>0:(r.mask&m.category)!==0&&(m.mask&r.category)!==0},t._compareBoundsX=function(r,m){return r.bounds.min.x-m.bounds.min.x}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t.create=function(c){var r={};return c||n.log("Mouse.create: element was undefined, defaulting to document.body","warn"),r.element=c||document.body,r.absolute={x:0,y:0},r.position={x:0,y:0},r.mousedownPosition={x:0,y:0},r.mouseupPosition={x:0,y:0},r.offset={x:0,y:0},r.scale={x:1,y:1},r.wheelDelta=0,r.button=-1,r.pixelRatio=parseInt(r.element.getAttribute("data-pixel-ratio"),10)||1,r.sourceEvents={mousemove:null,mousedown:null,mouseup:null,mousewheel:null},r.mousemove=function(m){var l=t._getRelativeMousePosition(m,r.element,r.pixelRatio),g=m.changedTouches;g&&(r.button=0,m.preventDefault()),r.absolute.x=l.x,r.absolute.y=l.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.sourceEvents.mousemove=m},r.mousedown=function(m){var l=t._getRelativeMousePosition(m,r.element,r.pixelRatio),g=m.changedTouches;g?(r.button=0,m.preventDefault()):r.button=m.button,r.absolute.x=l.x,r.absolute.y=l.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mousedownPosition.x=r.position.x,r.mousedownPosition.y=r.position.y,r.sourceEvents.mousedown=m},r.mouseup=function(m){var l=t._getRelativeMousePosition(m,r.element,r.pixelRatio),g=m.changedTouches;g&&m.preventDefault(),r.button=-1,r.absolute.x=l.x,r.absolute.y=l.y,r.position.x=r.absolute.x*r.scale.x+r.offset.x,r.position.y=r.absolute.y*r.scale.y+r.offset.y,r.mouseupPosition.x=r.position.x,r.mouseupPosition.y=r.position.y,r.sourceEvents.mouseup=m},r.mousewheel=function(m){r.wheelDelta=Math.max(-1,Math.min(1,m.wheelDelta||-m.detail)),m.preventDefault(),r.sourceEvents.mousewheel=m},t.setElement(r,r.element),r},t.setElement=function(c,r){c.element=r,r.addEventListener("mousemove",c.mousemove,{passive:!0}),r.addEventListener("mousedown",c.mousedown,{passive:!0}),r.addEventListener("mouseup",c.mouseup,{passive:!0}),r.addEventListener("wheel",c.mousewheel,{passive:!1}),r.addEventListener("touchmove",c.mousemove,{passive:!1}),r.addEventListener("touchstart",c.mousedown,{passive:!1}),r.addEventListener("touchend",c.mouseup,{passive:!1})},t.clearSourceEvents=function(c){c.sourceEvents.mousemove=null,c.sourceEvents.mousedown=null,c.sourceEvents.mouseup=null,c.sourceEvents.mousewheel=null,c.wheelDelta=0},t.setOffset=function(c,r){c.offset.x=r.x,c.offset.y=r.y,c.position.x=c.absolute.x*c.scale.x+c.offset.x,c.position.y=c.absolute.y*c.scale.y+c.offset.y},t.setScale=function(c,r){c.scale.x=r.x,c.scale.y=r.y,c.position.x=c.absolute.x*c.scale.x+c.offset.x,c.position.y=c.absolute.y*c.scale.y+c.offset.y},t._getRelativeMousePosition=function(c,r,m){var l=r.getBoundingClientRect(),g=document.documentElement||document.body.parentNode||document.body,p=window.pageXOffset!==void 0?window.pageXOffset:g.scrollLeft,s=window.pageYOffset!==void 0?window.pageYOffset:g.scrollTop,d=c.changedTouches,u,f;return d?(u=d[0].pageX-l.left-p,f=d[0].pageY-l.top-s):(u=c.pageX-l.left-p,f=c.pageY-l.top-s),{x:u/(r.clientWidth/(r.width||r.clientWidth)*m),y:f/(r.clientHeight/(r.height||r.clientHeight)*m)}}})()},function(a,o,i){var t={};a.exports=t;var n=i(0);(function(){t._registry={},t.register=function(c){if(t.isPlugin(c)||n.warn("Plugin.register:",t.toString(c),"does not implement all required fields."),c.name in t._registry){var r=t._registry[c.name],m=t.versionParse(c.version).number,l=t.versionParse(r.version).number;m>l?(n.warn("Plugin.register:",t.toString(r),"was upgraded to",t.toString(c)),t._registry[c.name]=c):m<l?n.warn("Plugin.register:",t.toString(r),"can not be downgraded to",t.toString(c)):c!==r&&n.warn("Plugin.register:",t.toString(c),"is already registered to different plugin object")}else t._registry[c.name]=c;return c},t.resolve=function(c){return t._registry[t.dependencyParse(c).name]},t.toString=function(c){return typeof c=="string"?c:(c.name||"anonymous")+"@"+(c.version||c.range||"0.0.0")},t.isPlugin=function(c){return c&&c.name&&c.version&&c.install},t.isUsed=function(c,r){return c.used.indexOf(r)>-1},t.isFor=function(c,r){var m=c.for&&t.dependencyParse(c.for);return!c.for||r.name===m.name&&t.versionSatisfies(r.version,m.range)},t.use=function(c,r){if(c.uses=(c.uses||[]).concat(r||[]),c.uses.length===0){n.warn("Plugin.use:",t.toString(c),"does not specify any dependencies to install.");return}for(var m=t.dependencies(c),l=n.topologicalSort(m),g=[],p=0;p<l.length;p+=1)if(l[p]!==c.name){var s=t.resolve(l[p]);if(!s){g.push("❌ "+l[p]);continue}t.isUsed(c,s.name)||(t.isFor(s,c)||(n.warn("Plugin.use:",t.toString(s),"is for",s.for,"but installed on",t.toString(c)+"."),s._warned=!0),s.install?s.install(c):(n.warn("Plugin.use:",t.toString(s),"does not specify an install function."),s._warned=!0),s._warned?(g.push("🔶 "+t.toString(s)),delete s._warned):g.push("✅ "+t.toString(s)),c.used.push(s.name))}g.length>0&&n.info(g.join("  "))},t.dependencies=function(c,r){var m=t.dependencyParse(c),l=m.name;if(r=r||{},!(l in r)){c=t.resolve(c)||c,r[l]=n.map(c.uses||[],function(p){t.isPlugin(p)&&t.register(p);var s=t.dependencyParse(p),d=t.resolve(p);return d&&!t.versionSatisfies(d.version,s.range)?(n.warn("Plugin.dependencies:",t.toString(d),"does not satisfy",t.toString(s),"used by",t.toString(m)+"."),d._warned=!0,c._warned=!0):d||(n.warn("Plugin.dependencies:",t.toString(p),"used by",t.toString(m),"could not be resolved."),c._warned=!0),s.name});for(var g=0;g<r[l].length;g+=1)t.dependencies(r[l][g],r);return r}},t.dependencyParse=function(c){if(n.isString(c)){var r=/^[\w-]+(@(\*|[\^~]?\d+\.\d+\.\d+(-[0-9A-Za-z-+]+)?))?$/;return r.test(c)||n.warn("Plugin.dependencyParse:",c,"is not a valid dependency string."),{name:c.split("@")[0],range:c.split("@")[1]||"*"}}return{name:c.name,range:c.range||c.version}},t.versionParse=function(c){var r=/^(\*)|(\^|~|>=|>)?\s*((\d+)\.(\d+)\.(\d+))(-[0-9A-Za-z-+]+)?$/;r.test(c)||n.warn("Plugin.versionParse:",c,"is not a valid version or range.");var m=r.exec(c),l=Number(m[4]),g=Number(m[5]),p=Number(m[6]);return{isRange:!!(m[1]||m[2]),version:m[3],range:c,operator:m[1]||m[2]||"",major:l,minor:g,patch:p,parts:[l,g,p],prerelease:m[7],number:l*1e8+g*1e4+p}},t.versionSatisfies=function(c,r){r=r||"*";var m=t.versionParse(r),l=t.versionParse(c);if(m.isRange){if(m.operator==="*"||c==="*")return!0;if(m.operator===">")return l.number>m.number;if(m.operator===">=")return l.number>=m.number;if(m.operator==="~")return l.major===m.major&&l.minor===m.minor&&l.patch>=m.patch;if(m.operator==="^")return m.major>0?l.major===m.major&&l.number>=m.number:m.minor>0?l.minor===m.minor&&l.patch>=m.patch:l.patch===m.patch}return c===r||c==="*"}})()},function(a,o){var i={};a.exports=i,function(){i.create=function(t){return{vertex:t,normalImpulse:0,tangentImpulse:0}}}()},function(a,o,i){var t={};a.exports=t;var n=i(7),c=i(18),r=i(13),m=i(19),l=i(5),g=i(6),p=i(10),s=i(0),d=i(4);(function(){t._deltaMax=1e3/60,t.create=function(u){u=u||{};var f={positionIterations:6,velocityIterations:4,constraintIterations:2,enableSleeping:!1,events:[],plugin:{},gravity:{x:0,y:1,scale:.001},timing:{timestamp:0,timeScale:1,lastDelta:0,lastElapsed:0,lastUpdatesPerFrame:0}},b=s.extend(f,u);return b.world=u.world||g.create({label:"World"}),b.pairs=u.pairs||m.create(),b.detector=u.detector||r.create(),b.detector.pairs=b.pairs,b.grid={buckets:[]},b.world.gravity=b.gravity,b.broadphase=b.grid,b.metrics={},b},t.update=function(u,f){var b=s.now(),w=u.world,E=u.detector,I=u.pairs,v=u.timing,x=v.timestamp,C;f>t._deltaMax&&s.warnOnce("Matter.Engine.update: delta argument is recommended to be less than or equal to",t._deltaMax.toFixed(3),"ms."),f=typeof f<"u"?f:s._baseDelta,f*=v.timeScale,v.timestamp+=f,v.lastDelta=f;var y={timestamp:v.timestamp,delta:f};l.trigger(u,"beforeUpdate",y);var S=g.allBodies(w),M=g.allConstraints(w);for(w.isModified&&(r.setBodies(E,S),g.setModified(w,!1,!1,!0)),u.enableSleeping&&n.update(S,f),t._bodiesApplyGravity(S,u.gravity),f>0&&t._bodiesUpdate(S,f),l.trigger(u,"beforeSolve",y),p.preSolveAll(S),C=0;C<u.constraintIterations;C++)p.solveAll(M,f);p.postSolveAll(S);var A=r.collisions(E);m.update(I,A,x),u.enableSleeping&&n.afterCollisions(I.list),I.collisionStart.length>0&&l.trigger(u,"collisionStart",{pairs:I.collisionStart,timestamp:v.timestamp,delta:f});var q=s.clamp(20/u.positionIterations,0,1);for(c.preSolvePosition(I.list),C=0;C<u.positionIterations;C++)c.solvePosition(I.list,f,q);for(c.postSolvePosition(S),p.preSolveAll(S),C=0;C<u.constraintIterations;C++)p.solveAll(M,f);for(p.postSolveAll(S),c.preSolveVelocity(I.list),C=0;C<u.velocityIterations;C++)c.solveVelocity(I.list,f);return t._bodiesUpdateVelocities(S),I.collisionActive.length>0&&l.trigger(u,"collisionActive",{pairs:I.collisionActive,timestamp:v.timestamp,delta:f}),I.collisionEnd.length>0&&l.trigger(u,"collisionEnd",{pairs:I.collisionEnd,timestamp:v.timestamp,delta:f}),t._bodiesClearForces(S),l.trigger(u,"afterUpdate",y),u.timing.lastElapsed=s.now()-b,u},t.merge=function(u,f){if(s.extend(u,f),f.world){u.world=f.world,t.clear(u);for(var b=g.allBodies(u.world),w=0;w<b.length;w++){var E=b[w];n.set(E,!1),E.id=s.nextId()}}},t.clear=function(u){m.clear(u.pairs),r.clear(u.detector)},t._bodiesClearForces=function(u){for(var f=u.length,b=0;b<f;b++){var w=u[b];w.force.x=0,w.force.y=0,w.torque=0}},t._bodiesApplyGravity=function(u,f){var b=typeof f.scale<"u"?f.scale:.001,w=u.length;if(!(f.x===0&&f.y===0||b===0))for(var E=0;E<w;E++){var I=u[E];I.isStatic||I.isSleeping||(I.force.y+=I.mass*f.y*b,I.force.x+=I.mass*f.x*b)}},t._bodiesUpdate=function(u,f){for(var b=u.length,w=0;w<b;w++){var E=u[w];E.isStatic||E.isSleeping||d.update(E,f)}},t._bodiesUpdateVelocities=function(u){for(var f=u.length,b=0;b<f;b++)d.updateVelocities(u[b])}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(0),r=i(1);(function(){t._restingThresh=2,t._restingThreshTangent=Math.sqrt(6),t._positionDampen=.9,t._positionWarming=.8,t._frictionNormalMultiplier=5,t._frictionMaxStatic=Number.MAX_VALUE,t.preSolvePosition=function(m){var l,g,p,s=m.length;for(l=0;l<s;l++)g=m[l],g.isActive&&(p=g.contactCount,g.collision.parentA.totalContacts+=p,g.collision.parentB.totalContacts+=p)},t.solvePosition=function(m,l,g){var p,s,d,u,f,b,w,E,I=t._positionDampen*(g||1),v=c.clamp(l/c._baseDelta,0,1),x=m.length;for(p=0;p<x;p++)s=m[p],!(!s.isActive||s.isSensor)&&(d=s.collision,u=d.parentA,f=d.parentB,b=d.normal,s.separation=d.depth+b.x*(f.positionImpulse.x-u.positionImpulse.x)+b.y*(f.positionImpulse.y-u.positionImpulse.y));for(p=0;p<x;p++)s=m[p],!(!s.isActive||s.isSensor)&&(d=s.collision,u=d.parentA,f=d.parentB,b=d.normal,E=s.separation-s.slop*v,(u.isStatic||f.isStatic)&&(E*=2),u.isStatic||u.isSleeping||(w=I/u.totalContacts,u.positionImpulse.x+=b.x*E*w,u.positionImpulse.y+=b.y*E*w),f.isStatic||f.isSleeping||(w=I/f.totalContacts,f.positionImpulse.x-=b.x*E*w,f.positionImpulse.y-=b.y*E*w))},t.postSolvePosition=function(m){for(var l=t._positionWarming,g=m.length,p=n.translate,s=r.update,d=0;d<g;d++){var u=m[d],f=u.positionImpulse,b=f.x,w=f.y,E=u.velocity;if(u.totalContacts=0,b!==0||w!==0){for(var I=0;I<u.parts.length;I++){var v=u.parts[I];p(v.vertices,f),s(v.bounds,v.vertices,E),v.position.x+=b,v.position.y+=w}u.positionPrev.x+=b,u.positionPrev.y+=w,b*E.x+w*E.y<0?(f.x=0,f.y=0):(f.x*=l,f.y*=l)}}},t.preSolveVelocity=function(m){var l=m.length,g,p;for(g=0;g<l;g++){var s=m[g];if(!(!s.isActive||s.isSensor)){var d=s.contacts,u=s.contactCount,f=s.collision,b=f.parentA,w=f.parentB,E=f.normal,I=f.tangent;for(p=0;p<u;p++){var v=d[p],x=v.vertex,C=v.normalImpulse,y=v.tangentImpulse;if(C!==0||y!==0){var S=E.x*C+I.x*y,M=E.y*C+I.y*y;b.isStatic||b.isSleeping||(b.positionPrev.x+=S*b.inverseMass,b.positionPrev.y+=M*b.inverseMass,b.anglePrev+=b.inverseInertia*((x.x-b.position.x)*M-(x.y-b.position.y)*S)),w.isStatic||w.isSleeping||(w.positionPrev.x-=S*w.inverseMass,w.positionPrev.y-=M*w.inverseMass,w.anglePrev-=w.inverseInertia*((x.x-w.position.x)*M-(x.y-w.position.y)*S))}}}}},t.solveVelocity=function(m,l){var g=l/c._baseDelta,p=g*g,s=p*g,d=-t._restingThresh*g,u=t._restingThreshTangent,f=t._frictionNormalMultiplier*g,b=t._frictionMaxStatic,w=m.length,E,I,v,x;for(v=0;v<w;v++){var C=m[v];if(!(!C.isActive||C.isSensor)){var y=C.collision,S=y.parentA,M=y.parentB,A=y.normal.x,q=y.normal.y,k=y.tangent.x,D=y.tangent.y,T=C.inverseMass,_=C.friction*C.frictionStatic*f,z=C.contacts,O=C.contactCount,F=1/O,G=S.position.x-S.positionPrev.x,H=S.position.y-S.positionPrev.y,W=S.angle-S.anglePrev,X=M.position.x-M.positionPrev.x,fe=M.position.y-M.positionPrev.y,ne=M.angle-M.anglePrev;for(x=0;x<O;x++){var U=z[x],se=U.vertex,K=se.x-S.position.x,Re=se.y-S.position.y,le=se.x-M.position.x,ce=se.y-M.position.y,Z=G-Re*W,ka=H+K*W,Ta=X-ce*ne,Da=fe+le*ne,Rt=Z-Ta,Ft=ka-Da,Ct=A*Rt+q*Ft,pe=k*Rt+D*Ft,Nt=C.separation+Ct,Mt=Math.min(Nt,1);Mt=Nt<0?0:Mt;var Qt=Mt*_;pe<-Qt||pe>Qt?(I=pe>0?pe:-pe,E=C.friction*(pe>0?1:-1)*s,E<-I?E=-I:E>I&&(E=I)):(E=pe,I=b);var Vt=K*q-Re*A,Gt=le*q-ce*A,Ht=F/(T+S.inverseInertia*Vt*Vt+M.inverseInertia*Gt*Gt),it=(1+C.restitution)*Ct*Ht;if(E*=Ht,Ct<d)U.normalImpulse=0;else{var Pa=U.normalImpulse;U.normalImpulse+=it,U.normalImpulse>0&&(U.normalImpulse=0),it=U.normalImpulse-Pa}if(pe<-u||pe>u)U.tangentImpulse=0;else{var za=U.tangentImpulse;U.tangentImpulse+=E,U.tangentImpulse<-I&&(U.tangentImpulse=-I),U.tangentImpulse>I&&(U.tangentImpulse=I),E=U.tangentImpulse-za}var ot=A*it+k*E,nt=q*it+D*E;S.isStatic||S.isSleeping||(S.positionPrev.x+=ot*S.inverseMass,S.positionPrev.y+=nt*S.inverseMass,S.anglePrev+=(K*nt-Re*ot)*S.inverseInertia),M.isStatic||M.isSleeping||(M.positionPrev.x-=ot*M.inverseMass,M.positionPrev.y-=nt*M.inverseMass,M.anglePrev-=(le*nt-ce*ot)*M.inverseInertia)}}}}})()},function(a,o,i){var t={};a.exports=t;var n=i(9),c=i(0);(function(){t.create=function(r){return c.extend({table:{},list:[],collisionStart:[],collisionActive:[],collisionEnd:[]},r)},t.update=function(r,m,l){var g=n.update,p=n.create,s=n.setActive,d=r.table,u=r.list,f=u.length,b=f,w=r.collisionStart,E=r.collisionEnd,I=r.collisionActive,v=m.length,x=0,C=0,y=0,S,M,A;for(A=0;A<v;A++)S=m[A],M=S.pair,M?(M.isActive&&(I[y++]=M),g(M,S,l)):(M=p(S,l),d[M.id]=M,w[x++]=M,u[b++]=M);for(b=0,f=u.length,A=0;A<f;A++)M=u[A],M.timeUpdated>=l?u[b++]=M:(s(M,!1,l),M.collision.bodyA.sleepCounter>0&&M.collision.bodyB.sleepCounter>0?u[b++]=M:(E[C++]=M,delete d[M.id]));u.length!==b&&(u.length=b),w.length!==x&&(w.length=x),E.length!==C&&(E.length=C),I.length!==y&&(I.length=y)},t.clear=function(r){return r.table={},r.list.length=0,r.collisionStart.length=0,r.collisionActive.length=0,r.collisionEnd.length=0,r}})()},function(a,o,i){var t=a.exports=i(21);t.Axes=i(11),t.Bodies=i(12),t.Body=i(4),t.Bounds=i(1),t.Collision=i(8),t.Common=i(0),t.Composite=i(6),t.Composites=i(22),t.Constraint=i(10),t.Contact=i(16),t.Detector=i(13),t.Engine=i(17),t.Events=i(5),t.Grid=i(23),t.Mouse=i(14),t.MouseConstraint=i(24),t.Pair=i(9),t.Pairs=i(19),t.Plugin=i(15),t.Query=i(25),t.Render=i(26),t.Resolver=i(18),t.Runner=i(27),t.SAT=i(28),t.Sleeping=i(7),t.Svg=i(29),t.Vector=i(2),t.Vertices=i(3),t.World=i(30),t.Engine.run=t.Runner.run,t.Common.deprecated(t.Engine,"run","Engine.run ➤ use Matter.Runner.run(engine) instead")},function(a,o,i){var t={};a.exports=t;var n=i(15),c=i(0);(function(){t.name="matter-js",t.version="0.20.0",t.uses=[],t.used=[],t.use=function(){n.use(t,Array.prototype.slice.call(arguments))},t.before=function(r,m){return r=r.replace(/^Matter./,""),c.chainPathBefore(t,r,m)},t.after=function(r,m){return r=r.replace(/^Matter./,""),c.chainPathAfter(t,r,m)}})()},function(a,o,i){var t={};a.exports=t;var n=i(6),c=i(10),r=i(0),m=i(4),l=i(12),g=r.deprecated;(function(){t.stack=function(p,s,d,u,f,b,w){for(var E=n.create({label:"Stack"}),I=p,v=s,x,C=0,y=0;y<u;y++){for(var S=0,M=0;M<d;M++){var A=w(I,v,M,y,x,C);if(A){var q=A.bounds.max.y-A.bounds.min.y,k=A.bounds.max.x-A.bounds.min.x;q>S&&(S=q),m.translate(A,{x:k*.5,y:q*.5}),I=A.bounds.max.x+f,n.addBody(E,A),x=A,C+=1}else I+=f}v+=S+b,I=p}return E},t.chain=function(p,s,d,u,f,b){for(var w=p.bodies,E=1;E<w.length;E++){var I=w[E-1],v=w[E],x=I.bounds.max.y-I.bounds.min.y,C=I.bounds.max.x-I.bounds.min.x,y=v.bounds.max.y-v.bounds.min.y,S=v.bounds.max.x-v.bounds.min.x,M={bodyA:I,pointA:{x:C*s,y:x*d},bodyB:v,pointB:{x:S*u,y:y*f}},A=r.extend(M,b);n.addConstraint(p,c.create(A))}return p.label+=" Chain",p},t.mesh=function(p,s,d,u,f){var b=p.bodies,w,E,I,v,x;for(w=0;w<d;w++){for(E=1;E<s;E++)I=b[E-1+w*s],v=b[E+w*s],n.addConstraint(p,c.create(r.extend({bodyA:I,bodyB:v},f)));if(w>0)for(E=0;E<s;E++)I=b[E+(w-1)*s],v=b[E+w*s],n.addConstraint(p,c.create(r.extend({bodyA:I,bodyB:v},f))),u&&E>0&&(x=b[E-1+(w-1)*s],n.addConstraint(p,c.create(r.extend({bodyA:x,bodyB:v},f)))),u&&E<s-1&&(x=b[E+1+(w-1)*s],n.addConstraint(p,c.create(r.extend({bodyA:x,bodyB:v},f))))}return p.label+=" Mesh",p},t.pyramid=function(p,s,d,u,f,b,w){return t.stack(p,s,d,u,f,b,function(E,I,v,x,C,y){var S=Math.min(u,Math.ceil(d/2)),M=C?C.bounds.max.x-C.bounds.min.x:0;if(!(x>S)){x=S-x;var A=x,q=d-1-x;if(!(v<A||v>q)){y===1&&m.translate(C,{x:(v+(d%2===1?1:-1))*M,y:0});var k=C?v*M:0;return w(p+k+v*f,I,v,x,C,y)}}})},t.newtonsCradle=function(p,s,d,u,f){for(var b=n.create({label:"Newtons Cradle"}),w=0;w<d;w++){var E=1.9,I=l.circle(p+w*(u*E),s+f,u,{inertia:1/0,restitution:1,friction:0,frictionAir:1e-4,slop:1}),v=c.create({pointA:{x:p+w*(u*E),y:s},bodyB:I});n.addBody(b,I),n.addConstraint(b,v)}return b},g(t,"newtonsCradle","Composites.newtonsCradle ➤ moved to newtonsCradle example"),t.car=function(p,s,d,u,f){var b=m.nextGroup(!0),w=20,E=-d*.5+w,I=d*.5-w,v=0,x=n.create({label:"Car"}),C=l.rectangle(p,s,d,u,{collisionFilter:{group:b},chamfer:{radius:u*.5},density:2e-4}),y=l.circle(p+E,s+v,f,{collisionFilter:{group:b},friction:.8}),S=l.circle(p+I,s+v,f,{collisionFilter:{group:b},friction:.8}),M=c.create({bodyB:C,pointB:{x:E,y:v},bodyA:y,stiffness:1,length:0}),A=c.create({bodyB:C,pointB:{x:I,y:v},bodyA:S,stiffness:1,length:0});return n.addBody(x,C),n.addBody(x,y),n.addBody(x,S),n.addConstraint(x,M),n.addConstraint(x,A),x},g(t,"car","Composites.car ➤ moved to car example"),t.softBody=function(p,s,d,u,f,b,w,E,I,v){I=r.extend({inertia:1/0},I),v=r.extend({stiffness:.2,render:{type:"line",anchors:!1}},v);var x=t.stack(p,s,d,u,f,b,function(C,y){return l.circle(C,y,E,I)});return t.mesh(x,d,u,w,v),x.label="Soft Body",x},g(t,"softBody","Composites.softBody ➤ moved to softBody and cloth examples")})()},function(a,o,i){var t={};a.exports=t;var n=i(9),c=i(0),r=c.deprecated;(function(){t.create=function(m){var l={buckets:{},pairs:{},pairsList:[],bucketWidth:48,bucketHeight:48};return c.extend(l,m)},t.update=function(m,l,g,p){var s,d,u,f=g.world,b=m.buckets,w,E,I=!1;for(s=0;s<l.length;s++){var v=l[s];if(!(v.isSleeping&&!p)&&!(f.bounds&&(v.bounds.max.x<f.bounds.min.x||v.bounds.min.x>f.bounds.max.x||v.bounds.max.y<f.bounds.min.y||v.bounds.min.y>f.bounds.max.y))){var x=t._getRegion(m,v);if(!v.region||x.id!==v.region.id||p){(!v.region||p)&&(v.region=x);var C=t._regionUnion(x,v.region);for(d=C.startCol;d<=C.endCol;d++)for(u=C.startRow;u<=C.endRow;u++){E=t._getBucketId(d,u),w=b[E];var y=d>=x.startCol&&d<=x.endCol&&u>=x.startRow&&u<=x.endRow,S=d>=v.region.startCol&&d<=v.region.endCol&&u>=v.region.startRow&&u<=v.region.endRow;!y&&S&&S&&w&&t._bucketRemoveBody(m,w,v),(v.region===x||y&&!S||p)&&(w||(w=t._createBucket(b,E)),t._bucketAddBody(m,w,v))}v.region=x,I=!0}}}I&&(m.pairsList=t._createActivePairsList(m))},r(t,"update","Grid.update ➤ replaced by Matter.Detector"),t.clear=function(m){m.buckets={},m.pairs={},m.pairsList=[]},r(t,"clear","Grid.clear ➤ replaced by Matter.Detector"),t._regionUnion=function(m,l){var g=Math.min(m.startCol,l.startCol),p=Math.max(m.endCol,l.endCol),s=Math.min(m.startRow,l.startRow),d=Math.max(m.endRow,l.endRow);return t._createRegion(g,p,s,d)},t._getRegion=function(m,l){var g=l.bounds,p=Math.floor(g.min.x/m.bucketWidth),s=Math.floor(g.max.x/m.bucketWidth),d=Math.floor(g.min.y/m.bucketHeight),u=Math.floor(g.max.y/m.bucketHeight);return t._createRegion(p,s,d,u)},t._createRegion=function(m,l,g,p){return{id:m+","+l+","+g+","+p,startCol:m,endCol:l,startRow:g,endRow:p}},t._getBucketId=function(m,l){return"C"+m+"R"+l},t._createBucket=function(m,l){var g=m[l]=[];return g},t._bucketAddBody=function(m,l,g){var p=m.pairs,s=n.id,d=l.length,u;for(u=0;u<d;u++){var f=l[u];if(!(g.id===f.id||g.isStatic&&f.isStatic)){var b=s(g,f),w=p[b];w?w[2]+=1:p[b]=[g,f,1]}}l.push(g)},t._bucketRemoveBody=function(m,l,g){var p=m.pairs,s=n.id,d;l.splice(c.indexOf(l,g),1);var u=l.length;for(d=0;d<u;d++){var f=p[s(g,l[d])];f&&(f[2]-=1)}},t._createActivePairsList=function(m){var l,g=m.pairs,p=c.keys(g),s=p.length,d=[],u;for(u=0;u<s;u++)l=g[p[u]],l[2]>0?d.push(l):delete g[p[u]];return d}})()},function(a,o,i){var t={};a.exports=t;var n=i(3),c=i(7),r=i(14),m=i(5),l=i(13),g=i(10),p=i(6),s=i(0),d=i(1);(function(){t.create=function(u,f){var b=(u?u.mouse:null)||(f?f.mouse:null);b||(u&&u.render&&u.render.canvas?b=r.create(u.render.canvas):f&&f.element?b=r.create(f.element):(b=r.create(),s.warn("MouseConstraint.create: options.mouse was undefined, options.element was undefined, may not function as expected")));var w=g.create({label:"Mouse Constraint",pointA:b.position,pointB:{x:0,y:0},length:.01,stiffness:.1,angularStiffness:1,render:{strokeStyle:"#90EE90",lineWidth:3}}),E={type:"mouseConstraint",mouse:b,element:null,body:null,constraint:w,collisionFilter:{category:1,mask:4294967295,group:0}},I=s.extend(E,f);return m.on(u,"beforeUpdate",function(){var v=p.allBodies(u.world);t.update(I,v),t._triggerEvents(I)}),I},t.update=function(u,f){var b=u.mouse,w=u.constraint,E=u.body;if(b.button===0){if(w.bodyB)c.set(w.bodyB,!1),w.pointA=b.position;else for(var I=0;I<f.length;I++)if(E=f[I],d.contains(E.bounds,b.position)&&l.canCollide(E.collisionFilter,u.collisionFilter))for(var v=E.parts.length>1?1:0;v<E.parts.length;v++){var x=E.parts[v];if(n.contains(x.vertices,b.position)){w.pointA=b.position,w.bodyB=u.body=E,w.pointB={x:b.position.x-E.position.x,y:b.position.y-E.position.y},w.angleB=E.angle,c.set(E,!1),m.trigger(u,"startdrag",{mouse:b,body:E});break}}}else w.bodyB=u.body=null,w.pointB=null,E&&m.trigger(u,"enddrag",{mouse:b,body:E})},t._triggerEvents=function(u){var f=u.mouse,b=f.sourceEvents;b.mousemove&&m.trigger(u,"mousemove",{mouse:f}),b.mousedown&&m.trigger(u,"mousedown",{mouse:f}),b.mouseup&&m.trigger(u,"mouseup",{mouse:f}),r.clearSourceEvents(f)}})()},function(a,o,i){var t={};a.exports=t;var n=i(2),c=i(8),r=i(1),m=i(12),l=i(3);(function(){t.collides=function(g,p){for(var s=[],d=p.length,u=g.bounds,f=c.collides,b=r.overlaps,w=0;w<d;w++){var E=p[w],I=E.parts.length,v=I===1?0:1;if(b(E.bounds,u))for(var x=v;x<I;x++){var C=E.parts[x];if(b(C.bounds,u)){var y=f(C,g);if(y){s.push(y);break}}}}return s},t.ray=function(g,p,s,d){d=d||1e-100;for(var u=n.angle(p,s),f=n.magnitude(n.sub(p,s)),b=(s.x+p.x)*.5,w=(s.y+p.y)*.5,E=m.rectangle(b,w,f,d,{angle:u}),I=t.collides(E,g),v=0;v<I.length;v+=1){var x=I[v];x.body=x.bodyB=x.bodyA}return I},t.region=function(g,p,s){for(var d=[],u=0;u<g.length;u++){var f=g[u],b=r.overlaps(f.bounds,p);(b&&!s||!b&&s)&&d.push(f)}return d},t.point=function(g,p){for(var s=[],d=0;d<g.length;d++){var u=g[d];if(r.contains(u.bounds,p))for(var f=u.parts.length===1?0:1;f<u.parts.length;f++){var b=u.parts[f];if(r.contains(b.bounds,p)&&l.contains(b.vertices,p)){s.push(u);break}}}return s}})()},function(a,o,i){var t={};a.exports=t;var n=i(4),c=i(0),r=i(6),m=i(1),l=i(5),g=i(2),p=i(14);(function(){var s,d;typeof window<"u"&&(s=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||function(v){window.setTimeout(function(){v(c.now())},1e3/60)},d=window.cancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelAnimationFrame||window.msCancelAnimationFrame),t._goodFps=30,t._goodDelta=1e3/60,t.create=function(v){var x={engine:null,element:null,canvas:null,mouse:null,frameRequestId:null,timing:{historySize:60,delta:0,deltaHistory:[],lastTime:0,lastTimestamp:0,lastElapsed:0,timestampElapsed:0,timestampElapsedHistory:[],engineDeltaHistory:[],engineElapsedHistory:[],engineUpdatesHistory:[],elapsedHistory:[]},options:{width:800,height:600,pixelRatio:1,background:"#14151f",wireframeBackground:"#14151f",wireframeStrokeStyle:"#bbb",hasBounds:!!v.bounds,enabled:!0,wireframes:!0,showSleeping:!0,showDebug:!1,showStats:!1,showPerformance:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}},C=c.extend(x,v);return C.canvas&&(C.canvas.width=C.options.width||C.canvas.width,C.canvas.height=C.options.height||C.canvas.height),C.mouse=v.mouse,C.engine=v.engine,C.canvas=C.canvas||b(C.options.width,C.options.height),C.context=C.canvas.getContext("2d"),C.textures={},C.bounds=C.bounds||{min:{x:0,y:0},max:{x:C.canvas.width,y:C.canvas.height}},C.controller=t,C.options.showBroadphase=!1,C.options.pixelRatio!==1&&t.setPixelRatio(C,C.options.pixelRatio),c.isElement(C.element)&&C.element.appendChild(C.canvas),C},t.run=function(v){(function x(C){v.frameRequestId=s(x),u(v,C),t.world(v,C),v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0),(v.options.showStats||v.options.showDebug)&&t.stats(v,v.context,C),(v.options.showPerformance||v.options.showDebug)&&t.performance(v,v.context,C),v.context.setTransform(1,0,0,1,0,0)})()},t.stop=function(v){d(v.frameRequestId)},t.setPixelRatio=function(v,x){var C=v.options,y=v.canvas;x==="auto"&&(x=w(y)),C.pixelRatio=x,y.setAttribute("data-pixel-ratio",x),y.width=C.width*x,y.height=C.height*x,y.style.width=C.width+"px",y.style.height=C.height+"px"},t.setSize=function(v,x,C){v.options.width=x,v.options.height=C,v.bounds.max.x=v.bounds.min.x+x,v.bounds.max.y=v.bounds.min.y+C,v.options.pixelRatio!==1?t.setPixelRatio(v,v.options.pixelRatio):(v.canvas.width=x,v.canvas.height=C)},t.lookAt=function(v,x,C,y){y=typeof y<"u"?y:!0,x=c.isArray(x)?x:[x],C=C||{x:0,y:0};for(var S={min:{x:1/0,y:1/0},max:{x:-1/0,y:-1/0}},M=0;M<x.length;M+=1){var A=x[M],q=A.bounds?A.bounds.min:A.min||A.position||A,k=A.bounds?A.bounds.max:A.max||A.position||A;q&&k&&(q.x<S.min.x&&(S.min.x=q.x),k.x>S.max.x&&(S.max.x=k.x),q.y<S.min.y&&(S.min.y=q.y),k.y>S.max.y&&(S.max.y=k.y))}var D=S.max.x-S.min.x+2*C.x,T=S.max.y-S.min.y+2*C.y,_=v.canvas.height,z=v.canvas.width,O=z/_,F=D/T,G=1,H=1;F>O?H=F/O:G=O/F,v.options.hasBounds=!0,v.bounds.min.x=S.min.x,v.bounds.max.x=S.min.x+D*G,v.bounds.min.y=S.min.y,v.bounds.max.y=S.min.y+T*H,y&&(v.bounds.min.x+=D*.5-D*G*.5,v.bounds.max.x+=D*.5-D*G*.5,v.bounds.min.y+=T*.5-T*H*.5,v.bounds.max.y+=T*.5-T*H*.5),v.bounds.min.x-=C.x,v.bounds.max.x-=C.x,v.bounds.min.y-=C.y,v.bounds.max.y-=C.y,v.mouse&&(p.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.canvas.width,y:(v.bounds.max.y-v.bounds.min.y)/v.canvas.height}),p.setOffset(v.mouse,v.bounds.min))},t.startViewTransform=function(v){var x=v.bounds.max.x-v.bounds.min.x,C=v.bounds.max.y-v.bounds.min.y,y=x/v.options.width,S=C/v.options.height;v.context.setTransform(v.options.pixelRatio/y,0,0,v.options.pixelRatio/S,0,0),v.context.translate(-v.bounds.min.x,-v.bounds.min.y)},t.endViewTransform=function(v){v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0)},t.world=function(v,x){var C=c.now(),y=v.engine,S=y.world,M=v.canvas,A=v.context,q=v.options,k=v.timing,D=r.allBodies(S),T=r.allConstraints(S),_=q.wireframes?q.wireframeBackground:q.background,z=[],O=[],F,G={timestamp:y.timing.timestamp};if(l.trigger(v,"beforeRender",G),v.currentBackground!==_&&I(v,_),A.globalCompositeOperation="source-in",A.fillStyle="transparent",A.fillRect(0,0,M.width,M.height),A.globalCompositeOperation="source-over",q.hasBounds){for(F=0;F<D.length;F++){var H=D[F];m.overlaps(H.bounds,v.bounds)&&z.push(H)}for(F=0;F<T.length;F++){var W=T[F],X=W.bodyA,fe=W.bodyB,ne=W.pointA,U=W.pointB;X&&(ne=g.add(X.position,W.pointA)),fe&&(U=g.add(fe.position,W.pointB)),!(!ne||!U)&&(m.contains(v.bounds,ne)||m.contains(v.bounds,U))&&O.push(W)}t.startViewTransform(v),v.mouse&&(p.setScale(v.mouse,{x:(v.bounds.max.x-v.bounds.min.x)/v.options.width,y:(v.bounds.max.y-v.bounds.min.y)/v.options.height}),p.setOffset(v.mouse,v.bounds.min))}else O=T,z=D,v.options.pixelRatio!==1&&v.context.setTransform(v.options.pixelRatio,0,0,v.options.pixelRatio,0,0);!q.wireframes||y.enableSleeping&&q.showSleeping?t.bodies(v,z,A):(q.showConvexHulls&&t.bodyConvexHulls(v,z,A),t.bodyWireframes(v,z,A)),q.showBounds&&t.bodyBounds(v,z,A),(q.showAxes||q.showAngleIndicator)&&t.bodyAxes(v,z,A),q.showPositions&&t.bodyPositions(v,z,A),q.showVelocity&&t.bodyVelocity(v,z,A),q.showIds&&t.bodyIds(v,z,A),q.showSeparations&&t.separations(v,y.pairs.list,A),q.showCollisions&&t.collisions(v,y.pairs.list,A),q.showVertexNumbers&&t.vertexNumbers(v,z,A),q.showMousePosition&&t.mousePosition(v,v.mouse,A),t.constraints(O,A),q.hasBounds&&t.endViewTransform(v),l.trigger(v,"afterRender",G),k.lastElapsed=c.now()-C},t.stats=function(v,x,C){for(var y=v.engine,S=y.world,M=r.allBodies(S),A=0,q=55,k=44,D=0,T=0,_=0;_<M.length;_+=1)A+=M[_].parts.length;var z={Part:A,Body:M.length,Cons:r.allConstraints(S).length,Comp:r.allComposites(S).length,Pair:y.pairs.list.length};x.fillStyle="#0e0f19",x.fillRect(D,T,q*5.5,k),x.font="12px Arial",x.textBaseline="top",x.textAlign="right";for(var O in z){var F=z[O];x.fillStyle="#aaa",x.fillText(O,D+q,T+8),x.fillStyle="#eee",x.fillText(F,D+q,T+26),D+=q}},t.performance=function(v,x){var C=v.engine,y=v.timing,S=y.deltaHistory,M=y.elapsedHistory,A=y.timestampElapsedHistory,q=y.engineDeltaHistory,k=y.engineUpdatesHistory,D=y.engineElapsedHistory,T=C.timing.lastUpdatesPerFrame,_=C.timing.lastDelta,z=f(S),O=f(M),F=f(q),G=f(k),H=f(D),W=f(A),X=W/z||0,fe=Math.round(z/_),ne=1e3/z||0,U=4,se=12,K=60,Re=34,le=10,ce=69;x.fillStyle="#0e0f19",x.fillRect(0,50,se*5+K*6+22,Re),t.status(x,le,ce,K,U,S.length,Math.round(ne)+" fps",ne/t._goodFps,function(Z){return S[Z]/z-1}),t.status(x,le+se+K,ce,K,U,q.length,_.toFixed(2)+" dt",t._goodDelta/_,function(Z){return q[Z]/F-1}),t.status(x,le+(se+K)*2,ce,K,U,k.length,T+" upf",Math.pow(c.clamp(G/fe||1,0,1),4),function(Z){return k[Z]/G-1}),t.status(x,le+(se+K)*3,ce,K,U,D.length,H.toFixed(2)+" ut",1-T*H/t._goodFps,function(Z){return D[Z]/H-1}),t.status(x,le+(se+K)*4,ce,K,U,M.length,O.toFixed(2)+" rt",1-O/t._goodFps,function(Z){return M[Z]/O-1}),t.status(x,le+(se+K)*5,ce,K,U,A.length,X.toFixed(2)+" x",X*X*X,function(Z){return(A[Z]/S[Z]/X||0)-1})},t.status=function(v,x,C,y,S,M,A,q,k){v.strokeStyle="#888",v.fillStyle="#444",v.lineWidth=1,v.fillRect(x,C+7,y,1),v.beginPath(),v.moveTo(x,C+7-S*c.clamp(.4*k(0),-2,2));for(var D=0;D<y;D+=1)v.lineTo(x+D,C+7-(D<M?S*c.clamp(.4*k(D),-2,2):0));v.stroke(),v.fillStyle="hsl("+c.clamp(25+95*q,0,120)+",100%,60%)",v.fillRect(x,C-7,4,4),v.font="12px Arial",v.textBaseline="middle",v.textAlign="right",v.fillStyle="#eee",v.fillText(A,x+y,C-5)},t.constraints=function(v,x){for(var C=x,y=0;y<v.length;y++){var S=v[y];if(!(!S.render.visible||!S.pointA||!S.pointB)){var M=S.bodyA,A=S.bodyB,q,k;if(M?q=g.add(M.position,S.pointA):q=S.pointA,S.render.type==="pin")C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.closePath();else{if(A?k=g.add(A.position,S.pointB):k=S.pointB,C.beginPath(),C.moveTo(q.x,q.y),S.render.type==="spring")for(var D=g.sub(k,q),T=g.perp(g.normalise(D)),_=Math.ceil(c.clamp(S.length/5,12,20)),z,O=1;O<_;O+=1)z=O%2===0?1:-1,C.lineTo(q.x+D.x*(O/_)+T.x*z*4,q.y+D.y*(O/_)+T.y*z*4);C.lineTo(k.x,k.y)}S.render.lineWidth&&(C.lineWidth=S.render.lineWidth,C.strokeStyle=S.render.strokeStyle,C.stroke()),S.render.anchors&&(C.fillStyle=S.render.strokeStyle,C.beginPath(),C.arc(q.x,q.y,3,0,2*Math.PI),C.arc(k.x,k.y,3,0,2*Math.PI),C.closePath(),C.fill())}}},t.bodies=function(v,x,C){var y=C;v.engine;var S=v.options,M=S.showInternalEdges||!S.wireframes,A,q,k,D;for(k=0;k<x.length;k++)if(A=x[k],!!A.render.visible){for(D=A.parts.length>1?1:0;D<A.parts.length;D++)if(q=A.parts[D],!!q.render.visible){if(S.showSleeping&&A.isSleeping?y.globalAlpha=.5*q.render.opacity:q.render.opacity!==1&&(y.globalAlpha=q.render.opacity),q.render.sprite&&q.render.sprite.texture&&!S.wireframes){var T=q.render.sprite,_=E(v,T.texture);y.translate(q.position.x,q.position.y),y.rotate(q.angle),y.drawImage(_,_.width*-T.xOffset*T.xScale,_.height*-T.yOffset*T.yScale,_.width*T.xScale,_.height*T.yScale),y.rotate(-q.angle),y.translate(-q.position.x,-q.position.y)}else{if(q.circleRadius)y.beginPath(),y.arc(q.position.x,q.position.y,q.circleRadius,0,2*Math.PI);else{y.beginPath(),y.moveTo(q.vertices[0].x,q.vertices[0].y);for(var z=1;z<q.vertices.length;z++)!q.vertices[z-1].isInternal||M?y.lineTo(q.vertices[z].x,q.vertices[z].y):y.moveTo(q.vertices[z].x,q.vertices[z].y),q.vertices[z].isInternal&&!M&&y.moveTo(q.vertices[(z+1)%q.vertices.length].x,q.vertices[(z+1)%q.vertices.length].y);y.lineTo(q.vertices[0].x,q.vertices[0].y),y.closePath()}S.wireframes?(y.lineWidth=1,y.strokeStyle=v.options.wireframeStrokeStyle,y.stroke()):(y.fillStyle=q.render.fillStyle,q.render.lineWidth&&(y.lineWidth=q.render.lineWidth,y.strokeStyle=q.render.strokeStyle,y.stroke()),y.fill())}y.globalAlpha=1}}},t.bodyWireframes=function(v,x,C){var y=C,S=v.options.showInternalEdges,M,A,q,k,D;for(y.beginPath(),q=0;q<x.length;q++)if(M=x[q],!!M.render.visible)for(D=M.parts.length>1?1:0;D<M.parts.length;D++){for(A=M.parts[D],y.moveTo(A.vertices[0].x,A.vertices[0].y),k=1;k<A.vertices.length;k++)!A.vertices[k-1].isInternal||S?y.lineTo(A.vertices[k].x,A.vertices[k].y):y.moveTo(A.vertices[k].x,A.vertices[k].y),A.vertices[k].isInternal&&!S&&y.moveTo(A.vertices[(k+1)%A.vertices.length].x,A.vertices[(k+1)%A.vertices.length].y);y.lineTo(A.vertices[0].x,A.vertices[0].y)}y.lineWidth=1,y.strokeStyle=v.options.wireframeStrokeStyle,y.stroke()},t.bodyConvexHulls=function(v,x,C){var y=C,S,M,A;for(y.beginPath(),M=0;M<x.length;M++)if(S=x[M],!(!S.render.visible||S.parts.length===1)){for(y.moveTo(S.vertices[0].x,S.vertices[0].y),A=1;A<S.vertices.length;A++)y.lineTo(S.vertices[A].x,S.vertices[A].y);y.lineTo(S.vertices[0].x,S.vertices[0].y)}y.lineWidth=1,y.strokeStyle="rgba(255,255,255,0.2)",y.stroke()},t.vertexNumbers=function(v,x,C){var y=C,S,M,A;for(S=0;S<x.length;S++){var q=x[S].parts;for(A=q.length>1?1:0;A<q.length;A++){var k=q[A];for(M=0;M<k.vertices.length;M++)y.fillStyle="rgba(255,255,255,0.2)",y.fillText(S+"_"+M,k.position.x+(k.vertices[M].x-k.position.x)*.8,k.position.y+(k.vertices[M].y-k.position.y)*.8)}}},t.mousePosition=function(v,x,C){var y=C;y.fillStyle="rgba(255,255,255,0.8)",y.fillText(x.position.x+"  "+x.position.y,x.position.x+5,x.position.y-5)},t.bodyBounds=function(v,x,C){var y=C;v.engine;var S=v.options;y.beginPath();for(var M=0;M<x.length;M++){var A=x[M];if(A.render.visible)for(var q=x[M].parts,k=q.length>1?1:0;k<q.length;k++){var D=q[k];y.rect(D.bounds.min.x,D.bounds.min.y,D.bounds.max.x-D.bounds.min.x,D.bounds.max.y-D.bounds.min.y)}}S.wireframes?y.strokeStyle="rgba(255,255,255,0.08)":y.strokeStyle="rgba(0,0,0,0.1)",y.lineWidth=1,y.stroke()},t.bodyAxes=function(v,x,C){var y=C;v.engine;var S=v.options,M,A,q,k;for(y.beginPath(),A=0;A<x.length;A++){var D=x[A],T=D.parts;if(D.render.visible)if(S.showAxes)for(q=T.length>1?1:0;q<T.length;q++)for(M=T[q],k=0;k<M.axes.length;k++){var _=M.axes[k];y.moveTo(M.position.x,M.position.y),y.lineTo(M.position.x+_.x*20,M.position.y+_.y*20)}else for(q=T.length>1?1:0;q<T.length;q++)for(M=T[q],k=0;k<M.axes.length;k++)y.moveTo(M.position.x,M.position.y),y.lineTo((M.vertices[0].x+M.vertices[M.vertices.length-1].x)/2,(M.vertices[0].y+M.vertices[M.vertices.length-1].y)/2)}S.wireframes?(y.strokeStyle="indianred",y.lineWidth=1):(y.strokeStyle="rgba(255, 255, 255, 0.4)",y.globalCompositeOperation="overlay",y.lineWidth=2),y.stroke(),y.globalCompositeOperation="source-over"},t.bodyPositions=function(v,x,C){var y=C;v.engine;var S=v.options,M,A,q,k;for(y.beginPath(),q=0;q<x.length;q++)if(M=x[q],!!M.render.visible)for(k=0;k<M.parts.length;k++)A=M.parts[k],y.arc(A.position.x,A.position.y,3,0,2*Math.PI,!1),y.closePath();for(S.wireframes?y.fillStyle="indianred":y.fillStyle="rgba(0,0,0,0.5)",y.fill(),y.beginPath(),q=0;q<x.length;q++)M=x[q],M.render.visible&&(y.arc(M.positionPrev.x,M.positionPrev.y,2,0,2*Math.PI,!1),y.closePath());y.fillStyle="rgba(255,165,0,0.8)",y.fill()},t.bodyVelocity=function(v,x,C){var y=C;y.beginPath();for(var S=0;S<x.length;S++){var M=x[S];if(M.render.visible){var A=n.getVelocity(M);y.moveTo(M.position.x,M.position.y),y.lineTo(M.position.x+A.x,M.position.y+A.y)}}y.lineWidth=3,y.strokeStyle="cornflowerblue",y.stroke()},t.bodyIds=function(v,x,C){var y=C,S,M;for(S=0;S<x.length;S++)if(x[S].render.visible){var A=x[S].parts;for(M=A.length>1?1:0;M<A.length;M++){var q=A[M];y.font="12px Arial",y.fillStyle="rgba(255,255,255,0.5)",y.fillText(q.id,q.position.x+10,q.position.y-10)}}},t.collisions=function(v,x,C){var y=C,S=v.options,M,A,q,k;for(y.beginPath(),q=0;q<x.length;q++)if(M=x[q],!!M.isActive)for(A=M.collision,k=0;k<M.contactCount;k++){var D=M.contacts[k],T=D.vertex;y.rect(T.x-1.5,T.y-1.5,3.5,3.5)}for(S.wireframes?y.fillStyle="rgba(255,255,255,0.7)":y.fillStyle="orange",y.fill(),y.beginPath(),q=0;q<x.length;q++)if(M=x[q],!!M.isActive&&(A=M.collision,M.contactCount>0)){var _=M.contacts[0].vertex.x,z=M.contacts[0].vertex.y;M.contactCount===2&&(_=(M.contacts[0].vertex.x+M.contacts[1].vertex.x)/2,z=(M.contacts[0].vertex.y+M.contacts[1].vertex.y)/2),A.bodyB===A.supports[0].body||A.bodyA.isStatic===!0?y.moveTo(_-A.normal.x*8,z-A.normal.y*8):y.moveTo(_+A.normal.x*8,z+A.normal.y*8),y.lineTo(_,z)}S.wireframes?y.strokeStyle="rgba(255,165,0,0.7)":y.strokeStyle="orange",y.lineWidth=1,y.stroke()},t.separations=function(v,x,C){var y=C,S=v.options,M,A,q,k,D;for(y.beginPath(),D=0;D<x.length;D++)if(M=x[D],!!M.isActive){A=M.collision,q=A.bodyA,k=A.bodyB;var T=1;!k.isStatic&&!q.isStatic&&(T=.5),k.isStatic&&(T=0),y.moveTo(k.position.x,k.position.y),y.lineTo(k.position.x-A.penetration.x*T,k.position.y-A.penetration.y*T),T=1,!k.isStatic&&!q.isStatic&&(T=.5),q.isStatic&&(T=0),y.moveTo(q.position.x,q.position.y),y.lineTo(q.position.x+A.penetration.x*T,q.position.y+A.penetration.y*T)}S.wireframes?y.strokeStyle="rgba(255,165,0,0.5)":y.strokeStyle="orange",y.stroke()},t.inspector=function(v,x){v.engine;var C=v.selected,y=v.render,S=y.options,M;if(S.hasBounds){var A=y.bounds.max.x-y.bounds.min.x,q=y.bounds.max.y-y.bounds.min.y,k=A/y.options.width,D=q/y.options.height;x.scale(1/k,1/D),x.translate(-y.bounds.min.x,-y.bounds.min.y)}for(var T=0;T<C.length;T++){var _=C[T].data;switch(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.9)",x.setLineDash([1,2]),_.type){case"body":M=_.bounds,x.beginPath(),x.rect(Math.floor(M.min.x-3),Math.floor(M.min.y-3),Math.floor(M.max.x-M.min.x+6),Math.floor(M.max.y-M.min.y+6)),x.closePath(),x.stroke();break;case"constraint":var z=_.pointA;_.bodyA&&(z=_.pointB),x.beginPath(),x.arc(z.x,z.y,10,0,2*Math.PI),x.closePath(),x.stroke();break}x.setLineDash([]),x.translate(-.5,-.5)}v.selectStart!==null&&(x.translate(.5,.5),x.lineWidth=1,x.strokeStyle="rgba(255,165,0,0.6)",x.fillStyle="rgba(255,165,0,0.1)",M=v.selectBounds,x.beginPath(),x.rect(Math.floor(M.min.x),Math.floor(M.min.y),Math.floor(M.max.x-M.min.x),Math.floor(M.max.y-M.min.y)),x.closePath(),x.stroke(),x.fill(),x.translate(-.5,-.5)),S.hasBounds&&x.setTransform(1,0,0,1,0,0)};var u=function(v,x){var C=v.engine,y=v.timing,S=y.historySize,M=C.timing.timestamp;y.delta=x-y.lastTime||t._goodDelta,y.lastTime=x,y.timestampElapsed=M-y.lastTimestamp||0,y.lastTimestamp=M,y.deltaHistory.unshift(y.delta),y.deltaHistory.length=Math.min(y.deltaHistory.length,S),y.engineDeltaHistory.unshift(C.timing.lastDelta),y.engineDeltaHistory.length=Math.min(y.engineDeltaHistory.length,S),y.timestampElapsedHistory.unshift(y.timestampElapsed),y.timestampElapsedHistory.length=Math.min(y.timestampElapsedHistory.length,S),y.engineUpdatesHistory.unshift(C.timing.lastUpdatesPerFrame),y.engineUpdatesHistory.length=Math.min(y.engineUpdatesHistory.length,S),y.engineElapsedHistory.unshift(C.timing.lastElapsed),y.engineElapsedHistory.length=Math.min(y.engineElapsedHistory.length,S),y.elapsedHistory.unshift(y.lastElapsed),y.elapsedHistory.length=Math.min(y.elapsedHistory.length,S)},f=function(v){for(var x=0,C=0;C<v.length;C+=1)x+=v[C];return x/v.length||0},b=function(v,x){var C=document.createElement("canvas");return C.width=v,C.height=x,C.oncontextmenu=function(){return!1},C.onselectstart=function(){return!1},C},w=function(v){var x=v.getContext("2d"),C=window.devicePixelRatio||1,y=x.webkitBackingStorePixelRatio||x.mozBackingStorePixelRatio||x.msBackingStorePixelRatio||x.oBackingStorePixelRatio||x.backingStorePixelRatio||1;return C/y},E=function(v,x){var C=v.textures[x];return C||(C=v.textures[x]=new Image,C.src=x,C)},I=function(v,x){var C=x;/(jpg|gif|png)$/.test(x)&&(C="url("+x+")"),v.canvas.style.background=C,v.canvas.style.backgroundSize="contain",v.currentBackground=x}})()},function(a,o,i){var t={};a.exports=t;var n=i(5),c=i(17),r=i(0);(function(){t._maxFrameDelta=1e3/15,t._frameDeltaFallback=1e3/60,t._timeBufferMargin=1.5,t._elapsedNextEstimate=1,t._smoothingLowerBound=.1,t._smoothingUpperBound=.9,t.create=function(l){var g={delta:16.666666666666668,frameDelta:null,frameDeltaSmoothing:!0,frameDeltaSnapping:!0,frameDeltaHistory:[],frameDeltaHistorySize:100,frameRequestId:null,timeBuffer:0,timeLastTick:null,maxUpdates:null,maxFrameTime:33.333333333333336,lastUpdatesDeferred:0,enabled:!0},p=r.extend(g,l);return p.fps=0,p},t.run=function(l,g){return l.timeBuffer=t._frameDeltaFallback,function p(s){l.frameRequestId=t._onNextFrame(l,p),s&&l.enabled&&t.tick(l,g,s)}(),l},t.tick=function(l,g,p){var s=r.now(),d=l.delta,u=0,f=p-l.timeLastTick;if((!f||!l.timeLastTick||f>Math.max(t._maxFrameDelta,l.maxFrameTime))&&(f=l.frameDelta||t._frameDeltaFallback),l.frameDeltaSmoothing){l.frameDeltaHistory.push(f),l.frameDeltaHistory=l.frameDeltaHistory.slice(-l.frameDeltaHistorySize);var b=l.frameDeltaHistory.slice(0).sort(),w=l.frameDeltaHistory.slice(b.length*t._smoothingLowerBound,b.length*t._smoothingUpperBound),E=m(w);f=E||f}l.frameDeltaSnapping&&(f=1e3/Math.round(1e3/f)),l.frameDelta=f,l.timeLastTick=p,l.timeBuffer+=l.frameDelta,l.timeBuffer=r.clamp(l.timeBuffer,0,l.frameDelta+d*t._timeBufferMargin),l.lastUpdatesDeferred=0;var I=l.maxUpdates||Math.ceil(l.maxFrameTime/d),v={timestamp:g.timing.timestamp};n.trigger(l,"beforeTick",v),n.trigger(l,"tick",v);for(var x=r.now();d>0&&l.timeBuffer>=d*t._timeBufferMargin;){n.trigger(l,"beforeUpdate",v),c.update(g,d),n.trigger(l,"afterUpdate",v),l.timeBuffer-=d,u+=1;var C=r.now()-s,y=r.now()-x,S=C+t._elapsedNextEstimate*y/u;if(u>=I||S>l.maxFrameTime){l.lastUpdatesDeferred=Math.round(Math.max(0,l.timeBuffer/d-t._timeBufferMargin));break}}g.timing.lastUpdatesPerFrame=u,n.trigger(l,"afterTick",v),l.frameDeltaHistory.length>=100&&(l.lastUpdatesDeferred&&Math.round(l.frameDelta/d)>I?r.warnOnce("Matter.Runner: runner reached runner.maxUpdates, see docs."):l.lastUpdatesDeferred&&r.warnOnce("Matter.Runner: runner reached runner.maxFrameTime, see docs."),typeof l.isFixed<"u"&&r.warnOnce("Matter.Runner: runner.isFixed is now redundant, see docs."),(l.deltaMin||l.deltaMax)&&r.warnOnce("Matter.Runner: runner.deltaMin and runner.deltaMax were removed, see docs."),l.fps!==0&&r.warnOnce("Matter.Runner: runner.fps was replaced by runner.delta, see docs."))},t.stop=function(l){t._cancelNextFrame(l)},t._onNextFrame=function(l,g){if(typeof window<"u"&&window.requestAnimationFrame)l.frameRequestId=window.requestAnimationFrame(g);else throw new Error("Matter.Runner: missing required global window.requestAnimationFrame.");return l.frameRequestId},t._cancelNextFrame=function(l){if(typeof window<"u"&&window.cancelAnimationFrame)window.cancelAnimationFrame(l.frameRequestId);else throw new Error("Matter.Runner: missing required global window.cancelAnimationFrame.")};var m=function(l){for(var g=0,p=l.length,s=0;s<p;s+=1)g+=l[s];return g/p||0}})()},function(a,o,i){var t={};a.exports=t;var n=i(8),c=i(0),r=c.deprecated;(function(){t.collides=function(m,l){return n.collides(m,l)},r(t,"collides","SAT.collides ➤ replaced by Collision.collides")})()},function(a,o,i){var t={};a.exports=t,i(1);var n=i(0);(function(){t.pathToVertices=function(c,r){typeof window<"u"&&!("SVGPathSeg"in window)&&n.warn("Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.");var m,l,g,p,s,d,u,f,b,w,E=[],I,v,x=0,C=0,y=0;r=r||15;var S=function(A,q,k){var D=k%2===1&&k>1;if(!b||A!=b.x||q!=b.y){b&&D?(I=b.x,v=b.y):(I=0,v=0);var T={x:I+A,y:v+q};(D||!b)&&(b=T),E.push(T),C=I+A,y=v+q}},M=function(A){var q=A.pathSegTypeAsLetter.toUpperCase();if(q!=="Z"){switch(q){case"M":case"L":case"T":case"C":case"S":case"Q":C=A.x,y=A.y;break;case"H":C=A.x;break;case"V":y=A.y;break}S(C,y,A.pathSegType)}};for(t._svgPathToAbsolute(c),g=c.getTotalLength(),d=[],m=0;m<c.pathSegList.numberOfItems;m+=1)d.push(c.pathSegList.getItem(m));for(u=d.concat();x<g;){if(w=c.getPathSegAtLength(x),s=d[w],s!=f){for(;u.length&&u[0]!=s;)M(u.shift());f=s}switch(s.pathSegTypeAsLetter.toUpperCase()){case"C":case"T":case"S":case"Q":case"A":p=c.getPointAtLength(x),S(p.x,p.y,0);break}x+=r}for(m=0,l=u.length;m<l;++m)M(u[m]);return E},t._svgPathToAbsolute=function(c){for(var r,m,l,g,p,s,d=c.pathSegList,u=0,f=0,b=d.numberOfItems,w=0;w<b;++w){var E=d.getItem(w),I=E.pathSegTypeAsLetter;if(/[MLHVCSQTA]/.test(I))"x"in E&&(u=E.x),"y"in E&&(f=E.y);else switch("x1"in E&&(l=u+E.x1),"x2"in E&&(p=u+E.x2),"y1"in E&&(g=f+E.y1),"y2"in E&&(s=f+E.y2),"x"in E&&(u+=E.x),"y"in E&&(f+=E.y),I){case"m":d.replaceItem(c.createSVGPathSegMovetoAbs(u,f),w);break;case"l":d.replaceItem(c.createSVGPathSegLinetoAbs(u,f),w);break;case"h":d.replaceItem(c.createSVGPathSegLinetoHorizontalAbs(u),w);break;case"v":d.replaceItem(c.createSVGPathSegLinetoVerticalAbs(f),w);break;case"c":d.replaceItem(c.createSVGPathSegCurvetoCubicAbs(u,f,l,g,p,s),w);break;case"s":d.replaceItem(c.createSVGPathSegCurvetoCubicSmoothAbs(u,f,p,s),w);break;case"q":d.replaceItem(c.createSVGPathSegCurvetoQuadraticAbs(u,f,l,g),w);break;case"t":d.replaceItem(c.createSVGPathSegCurvetoQuadraticSmoothAbs(u,f),w);break;case"a":d.replaceItem(c.createSVGPathSegArcAbs(u,f,E.r1,E.r2,E.angle,E.largeArcFlag,E.sweepFlag),w);break;case"z":case"Z":u=r,f=m;break}(I=="M"||I=="m")&&(r=u,m=f)}}})()},function(a,o,i){var t={};a.exports=t;var n=i(6);i(0),function(){t.create=n.create,t.add=n.add,t.remove=n.remove,t.clear=n.clear,t.addComposite=n.addComposite,t.addBody=n.addBody,t.addConstraint=n.addConstraint}()}])})}(dt)),dt.exports}var Ba=$a();const P=_a(Ba),st=1,Ua=2,Y=60,Kt=70;class Ra{constructor(e,a,o){console.log("PhysicsManager Creado"),this.catManager=e,this.catFoodManager=a,this.gameManager=o,this.resizeListener=this.handleResize.bind(this),this.collisionHandler=this.handleCollisions.bind(this),this.speedLimitHandler=this.limitAllCatSpeeds.bind(this)}init(e){if(console.log("PhysicsManager: init"),!e)throw console.error("PhysicsManager CRITICAL: catDisplayAreaElement es nulo en init()."),new Error("PhysicsManager requiere un catDisplayAreaElement para inicializar.");this.catDisplayAreaElement=e,this.engine=P.Engine.create(),this.world=this.engine.world,this.runner=P.Runner.create(),this.engine.gravity.y=.8,this.engine.gravity.x=0,this.engine.enableSleeping=!0,console.log("Matter.js Engine, World, Runner creados."),this.createWalls(),this.setupMouseConstraint(this.catDisplayAreaElement),console.log("PhysicsManager: Añadiendo listeners de eventos del motor..."),P.Events.on(this.engine,"collisionStart",this.collisionHandler),P.Events.on(this.engine,"beforeUpdate",this.speedLimitHandler),window.addEventListener("resize",this.resizeListener),console.log("PhysicsManager: init completado.")}createWalls(){const e=window.innerWidth,a=window.innerHeight;this.ground=P.Bodies.rectangle(e/2,a+Y/2,e,Y,{isStatic:!0,label:"ground",collisionFilter:{category:st}}),this.leftWall=P.Bodies.rectangle(-60/2,a/2,Y,a,{isStatic:!0,label:"leftWall",collisionFilter:{category:st}}),this.rightWall=P.Bodies.rectangle(e+Y/2,a/2,Y,a,{isStatic:!0,label:"rightWall",collisionFilter:{category:st}}),this.topWall=P.Bodies.rectangle(e/2,-60/2,e,Y,{isStatic:!0,label:"topWall",collisionFilter:{category:st}}),P.World.add(this.world,[this.ground,this.leftWall,this.rightWall,this.topWall]),console.log("PhysicsManager: Paredes creadas.")}setupMouseConstraint(e){const a=P.Mouse.create(e);this.mouseConstraint=P.MouseConstraint.create(this.engine,{mouse:a,constraint:{stiffness:.1,render:{visible:!1}}}),this.mouseConstraint.collisionFilter.mask=Ua,P.World.add(this.world,this.mouseConstraint),this.updateMouseConstraintOffset(),console.log("PhysicsManager: MouseConstraint configurado sobre",e),P.Events.on(this.mouseConstraint,"startdrag",o=>{const i=o.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag started"),this.gameManager.setCatDragState(!0))}),P.Events.on(this.mouseConstraint,"enddrag",o=>{const i=o.body;i&&i.label==="cat"&&(console.log("PhysicsManager: Cat drag ended"),this.gameManager.setCatDragState(!1))})}updateMouseConstraintOffset(){if(this.mouseConstraint&&this.mouseConstraint.mouse.element){const e=this.mouseConstraint.mouse.element.getBoundingClientRect();P.Mouse.setOffset(this.mouseConstraint.mouse,{x:-e.left,y:-e.top})}}handleCollisions(e){var o,i;const a=e.pairs;for(let t=0;t<a.length;t++){const n=a[t],c=n.bodyA,r=n.bodyB,m=c==null?void 0:c.label,l=r==null?void 0:r.label;if(m==="cat"&&l==="cat"){const g=((o=this.mouseConstraint)==null?void 0:o.body)===c,p=((i=this.mouseConstraint)==null?void 0:i.body)===r;if(g!==p)if(typeof c.id<"u"&&typeof r.id<"u"){const s=g?c.id:r.id;this.catManager.processPlayerInitiatedCollision(c.id,r.id,s)}else console.error("Error: IDs indefinidos en colisión gato-gato.")}else if(m==="cat"&&l==="foodPellet"||m==="foodPellet"&&l==="cat"){const g=m==="cat"?c:r,p=m==="foodPellet"?c:r;typeof g.id<"u"&&p?this.catFoodManager.processCatFoodCollision(g.id,p):console.warn("Colisión Gato-Comida detectada pero falta ID de gato o cuerpo de comida.")}}}limitAllCatSpeeds(){if(!this.world)return;const e=P.Composite.allBodies(this.world);for(let a=0;a<e.length;a++){const o=e[a];if(!o.isStatic&&o.label==="cat"&&P.Vector.magnitude(o.velocity)>Kt){const t=P.Vector.normalise(o.velocity),n=P.Vector.mult(t,Kt);P.Body.setVelocity(o,n)}}}handleResize(){if(!this.ground||!this.leftWall||!this.rightWall||!this.topWall||!this.catDisplayAreaElement)return;const e=window.innerWidth,a=window.innerHeight;P.Body.setPosition(this.ground,{x:e/2,y:a+Y/2}),P.Body.setVertices(this.ground,P.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${Y} L 0 ${Y}`,this.ground)),P.Body.setPosition(this.leftWall,{x:-60/2,y:a/2}),P.Body.setVertices(this.leftWall,P.Vertices.fromPath(`L 0 0 L ${Y} 0 L ${Y} ${a} L 0 ${a}`,this.leftWall)),P.Body.setPosition(this.rightWall,{x:e+Y/2,y:a/2}),P.Body.setVertices(this.rightWall,P.Vertices.fromPath(`L 0 0 L ${Y} 0 L ${Y} ${a} L 0 ${a}`,this.rightWall)),P.Body.setPosition(this.topWall,{x:e/2,y:-60/2}),P.Body.setVertices(this.topWall,P.Vertices.fromPath(`L 0 0 L ${e} 0 L ${e} ${Y} L 0 ${Y}`,this.topWall)),this.updateMouseConstraintOffset(),console.log("PhysicsManager: Límites y mouse constraint actualizados en resize.")}start(){if(!this.engine||!this.runner){console.error("PhysicsManager: init() debe ser llamado antes de start().");return}P.Runner.run(this.runner,this.engine),console.log("PhysicsManager: Runner iniciado.")}stop(){if(!this.runner){console.warn("PhysicsManager: Runner no inicializado.");return}P.Runner.stop(this.runner),console.log("PhysicsManager: Runner detenido.")}shutdown(){console.log("PhysicsManager: shutdown"),this.stop(),this.engine?(P.Events.off(this.engine,"collisionStart",this.collisionHandler),P.Events.off(this.engine,"beforeUpdate",this.speedLimitHandler),this.mouseConstraint&&(P.Events.off(this.mouseConstraint,"startdrag"),P.Events.off(this.mouseConstraint,"enddrag")),P.World.clear(this.world,!1),P.Engine.clear(this.engine),console.log("PhysicsManager: Listeners de engine removidos y mundo limpiado.")):console.warn("PhysicsManager shutdown: Engine no encontrado."),window.removeEventListener("resize",this.resizeListener),this.mouseConstraint=void 0,console.log("PhysicsManager: shutdown completo.")}getEngine(){if(!this.engine)throw new Error("PhysicsManager no inicializado.");return this.engine}getWorld(){if(!this.world)throw new Error("PhysicsManager no inicializado.");return this.world}}class Fa{constructor(e="body"){this.themes=[],this.activeThemeIndex=0,this.defaultThemeId="default-clean",this.isLoading=!1,this.lastError=null,this.rootElement=document.body,this.masterCssVariableList=[],console.log("ThemeManager Creado.");const a=document.querySelector(e);a instanceof HTMLElement?this.rootElement=a:(console.warn(`ThemeManager: Elemento raíz '${e}' no encontrado, usando document.body.`),this.rootElement=document.body)}async loadThemesData(e){if(this.isLoading)return console.warn("ThemeManager: Ya hay una carga en progreso."),!1;console.log("ThemeManager: Procesando datos de temas pre-cargados..."),this.isLoading=!0,this.lastError=null,this.themes=[];try{if(!Array.isArray(e)||e.length===0)throw new Error("Los datos de temas proporcionados no son un array válido o están vacíos.");for(const o of e){if(!o.id||!o.name||!o.cssVariables||typeof o.cssVariables!="object"){console.warn("ThemeManager: Tema inválido o sin cssVariables, omitiendo:",o);continue}this.themes.push(o)}if(this.themes.length===0)throw new Error("No se cargaron temas válidos (todos carecían de cssVariables).");const a=this.themes.find(o=>o.id===this.defaultThemeId)||this.themes[0];return a!=null&&a.cssVariables?(this.masterCssVariableList=Object.keys(a.cssVariables),console.log(`ThemeManager: Lista maestra de ${this.masterCssVariableList.length} variables CSS generada desde el tema '${a.id}'.`)):console.warn("ThemeManager: No se pudo generar la lista maestra de variables CSS (primer tema válido sin cssVariables)."),this.activeThemeIndex=Math.max(0,this.themes.findIndex(o=>o.id===this.defaultThemeId)),this.themes.findIndex(o=>o.id===this.defaultThemeId)===-1&&this.themes.length>0&&(console.warn(`ThemeManager: Tema por defecto '${this.defaultThemeId}' no encontrado. Usando el primer tema de la lista.`),this.activeThemeIndex=0),console.log(`ThemeManager: ${this.themes.length} temas procesados exitosamente.`),this.isLoading=!1,this.applyActiveTheme(),!0}catch(a){return console.error("ThemeManager: Error al procesar los datos de temas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.themes=[],this.activeThemeIndex=0,!1}}applyActiveTheme(){const e=this.getActiveTheme();this._applyThemeCssVariables(e),this._applyRootThemeClass(e),this._dispatchThemeChangedEvent(e)}_applyThemeCssVariables(e){for(const a of this.masterCssVariableList)this.rootElement.style.removeProperty(a);if(e!=null&&e.cssVariables){console.log(`ThemeManager: Aplicando ${Object.keys(e.cssVariables).length} variables CSS para el tema '${e.id}'.`);for(const[a,o]of Object.entries(e.cssVariables))this.rootElement.style.setProperty(a,o)}else console.log("ThemeManager: No hay variables CSS para aplicar (tema null o sin cssVariables), se usarán fallbacks de componentes.")}_applyRootThemeClass(e){var o,i;this.rootElement.className.split(" ").forEach(t=>{t.startsWith("theme-id-")&&this.rootElement.classList.remove(t)});const a=(i=(o=e==null?void 0:e.elements)==null?void 0:o.quizWrapper)==null?void 0:i.themeClass;a&&(this.rootElement.classList.add(a),console.log(`ThemeManager: Clase de tema global '${a}' aplicada a ${this.rootElement.tagName}.`))}_dispatchThemeChangedEvent(e){const a=new CustomEvent("theme-changed",{detail:{themeId:e==null?void 0:e.id,theme:e},bubbles:!0,composed:!0});document.dispatchEvent(a),console.log(`ThemeManager: Evento 'theme-changed' despachado para el tema '${(e==null?void 0:e.id)??"null"}'.`)}getActiveTheme(){return this.themes.length===0?null:this.themes[this.activeThemeIndex]??null}getActiveThemeId(){var e;return((e=this.getActiveTheme())==null?void 0:e.id)??null}cycleTheme(){if(this.themes.length<=1)return;this.activeThemeIndex=(this.activeThemeIndex+1)%this.themes.length,this.applyActiveTheme();const e=this.getActiveTheme();console.log(`ThemeManager: Tema ciclado a '${(e==null?void 0:e.name)??"N/A"}' (ID: ${(e==null?void 0:e.id)??"N/A"})`)}setActiveTheme(e){var o;const a=this.themes.findIndex(i=>i.id===e);return a!==-1?(this.activeThemeIndex===a||(this.activeThemeIndex=a,this.applyActiveTheme(),console.log(`ThemeManager: Tema establecido a '${(o=this.getActiveTheme())==null?void 0:o.name}' (ID: ${e})`)),!0):(console.warn(`ThemeManager: No se encontró el tema con ID '${e}'.`),!1)}getThemes(){return[...this.themes]}getLastError(){return this.lastError}isLoadingThemes(){return this.isLoading}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ut=globalThis,Dt=ut.ShadowRoot&&(ut.ShadyCSS===void 0||ut.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pt=Symbol(),Yt=new WeakMap;let va=class{constructor(e,a,o){if(this._$cssResult$=!0,o!==Pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(Dt&&e===void 0){const o=a!==void 0&&a.length===1;o&&(e=Yt.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),o&&Yt.set(a,e))}return e}toString(){return this.cssText}};const Na=h=>new va(typeof h=="string"?h:h+"",void 0,Pt),Q=(h,...e)=>{const a=h.length===1?h[0]:e.reduce((o,i,t)=>o+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+h[t+1],h[0]);return new va(a,h,Pt)},Qa=(h,e)=>{if(Dt)h.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet);else for(const a of e){const o=document.createElement("style"),i=ut.litNonce;i!==void 0&&o.setAttribute("nonce",i),o.textContent=a.cssText,h.appendChild(o)}},Xt=Dt?h=>h:h=>h instanceof CSSStyleSheet?(e=>{let a="";for(const o of e.cssRules)a+=o.cssText;return Na(a)})(h):h;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Va,defineProperty:Ga,getOwnPropertyDescriptor:Ha,getOwnPropertyNames:Wa,getOwnPropertySymbols:ja,getPrototypeOf:Ka}=Object,be=globalThis,Zt=be.trustedTypes,Ya=Zt?Zt.emptyScript:"",wt=be.reactiveElementPolyfillSupport,Ne=(h,e)=>h,pt={toAttribute(h,e){switch(e){case Boolean:h=h?Ya:null;break;case Object:case Array:h=h==null?h:JSON.stringify(h)}return h},fromAttribute(h,e){let a=h;switch(e){case Boolean:a=h!==null;break;case Number:a=h===null?null:Number(h);break;case Object:case Array:try{a=JSON.parse(h)}catch{a=null}}return a}},zt=(h,e)=>!Va(h,e),Jt={attribute:!0,type:String,converter:pt,reflect:!1,useDefault:!1,hasChanged:zt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),be.litPropertyMetadata??(be.litPropertyMetadata=new WeakMap);let Le=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,a=Jt){if(a.state&&(a.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((a=Object.create(a)).wrapped=!0),this.elementProperties.set(e,a),!a.noAccessor){const o=Symbol(),i=this.getPropertyDescriptor(e,o,a);i!==void 0&&Ga(this.prototype,e,i)}}static getPropertyDescriptor(e,a,o){const{get:i,set:t}=Ha(this.prototype,e)??{get(){return this[a]},set(n){this[a]=n}};return{get:i,set(n){const c=i==null?void 0:i.call(this);t==null||t.call(this,n),this.requestUpdate(e,c,o)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Jt}static _$Ei(){if(this.hasOwnProperty(Ne("elementProperties")))return;const e=Ka(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(Ne("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(Ne("properties"))){const a=this.properties,o=[...Wa(a),...ja(a)];for(const i of o)this.createProperty(i,a[i])}const e=this[Symbol.metadata];if(e!==null){const a=litPropertyMetadata.get(e);if(a!==void 0)for(const[o,i]of a)this.elementProperties.set(o,i)}this._$Eh=new Map;for(const[a,o]of this.elementProperties){const i=this._$Eu(a,o);i!==void 0&&this._$Eh.set(i,a)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const o=new Set(e.flat(1/0).reverse());for(const i of o)a.unshift(Xt(i))}else e!==void 0&&a.push(Xt(e));return a}static _$Eu(e,a){const o=a.attribute;return o===!1?void 0:typeof o=="string"?o:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(a=>a(this))}addController(e){var a;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((a=e.hostConnected)==null||a.call(e))}removeController(e){var a;(a=this._$EO)==null||a.delete(e)}_$E_(){const e=new Map,a=this.constructor.elementProperties;for(const o of a.keys())this.hasOwnProperty(o)&&(e.set(o,this[o]),delete this[o]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qa(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostConnected)==null?void 0:o.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(a=>{var o;return(o=a.hostDisconnected)==null?void 0:o.call(a)})}attributeChangedCallback(e,a,o){this._$AK(e,o)}_$ET(e,a){var t;const o=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,o);if(i!==void 0&&o.reflect===!0){const n=(((t=o.converter)==null?void 0:t.toAttribute)!==void 0?o.converter:pt).toAttribute(a,o.type);this._$Em=e,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(e,a){var t,n;const o=this.constructor,i=o._$Eh.get(e);if(i!==void 0&&this._$Em!==i){const c=o.getPropertyOptions(i),r=typeof c.converter=="function"?{fromAttribute:c.converter}:((t=c.converter)==null?void 0:t.fromAttribute)!==void 0?c.converter:pt;this._$Em=i,this[i]=r.fromAttribute(a,c.type)??((n=this._$Ej)==null?void 0:n.get(i))??null,this._$Em=null}}requestUpdate(e,a,o){var i;if(e!==void 0){const t=this.constructor,n=this[e];if(o??(o=t.getPropertyOptions(e)),!((o.hasChanged??zt)(n,a)||o.useDefault&&o.reflect&&n===((i=this._$Ej)==null?void 0:i.get(e))&&!this.hasAttribute(t._$Eu(e,o))))return;this.C(e,a,o)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,a,{useDefault:o,reflect:i,wrapped:t},n){o&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,n??a??this[e]),t!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||o||(a=void 0),this._$AL.set(e,a)),i===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var o;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[t,n]of this._$Ep)this[t]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[t,n]of i){const{wrapped:c}=n,r=this[t];c!==!0||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1;const a=this._$AL;try{e=this.shouldUpdate(a),e?(this.willUpdate(a),(o=this._$EO)==null||o.forEach(i=>{var t;return(t=i.hostUpdate)==null?void 0:t.call(i)}),this.update(a)):this._$EM()}catch(i){throw e=!1,this._$EM(),i}e&&this._$AE(a)}willUpdate(e){}_$AE(e){var a;(a=this._$EO)==null||a.forEach(o=>{var i;return(i=o.hostUpdated)==null?void 0:i.call(o)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(a=>this._$ET(a,this[a]))),this._$EM()}updated(e){}firstUpdated(e){}};Le.elementStyles=[],Le.shadowRootOptions={mode:"open"},Le[Ne("elementProperties")]=new Map,Le[Ne("finalized")]=new Map,wt==null||wt({ReactiveElement:Le}),(be.reactiveElementVersions??(be.reactiveElementVersions=[])).push("2.1.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=globalThis,ht=Qe.trustedTypes,ea=ht?ht.createPolicy("lit-html",{createHTML:h=>h}):void 0,ba="$lit$",ve=`lit$${Math.random().toFixed(9).slice(2)}$`,ya="?"+ve,Xa=`<${ya}>`,Se=document,Ve=()=>Se.createComment(""),Ge=h=>h===null||typeof h!="object"&&typeof h!="function",Lt=Array.isArray,Za=h=>Lt(h)||typeof(h==null?void 0:h[Symbol.iterator])=="function",St=`[ 	
\f\r]`,Fe=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ta=/-->/g,aa=/>/g,Ce=RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ia=/'/g,oa=/"/g,xa=/^(?:script|style|textarea|title)$/i,Ca=h=>(e,...a)=>({_$litType$:h,strings:e,values:a}),$=Ca(1),Ja=Ca(2),Ee=Symbol.for("lit-noChange"),N=Symbol.for("lit-nothing"),na=new WeakMap,Me=Se.createTreeWalker(Se,129);function Ma(h,e){if(!Lt(h)||!h.hasOwnProperty("raw"))throw Error("invalid template strings array");return ea!==void 0?ea.createHTML(e):e}const ei=(h,e)=>{const a=h.length-1,o=[];let i,t=e===2?"<svg>":e===3?"<math>":"",n=Fe;for(let c=0;c<a;c++){const r=h[c];let m,l,g=-1,p=0;for(;p<r.length&&(n.lastIndex=p,l=n.exec(r),l!==null);)p=n.lastIndex,n===Fe?l[1]==="!--"?n=ta:l[1]!==void 0?n=aa:l[2]!==void 0?(xa.test(l[2])&&(i=RegExp("</"+l[2],"g")),n=Ce):l[3]!==void 0&&(n=Ce):n===Ce?l[0]===">"?(n=i??Fe,g=-1):l[1]===void 0?g=-2:(g=n.lastIndex-l[2].length,m=l[1],n=l[3]===void 0?Ce:l[3]==='"'?oa:ia):n===oa||n===ia?n=Ce:n===ta||n===aa?n=Fe:(n=Ce,i=void 0);const s=n===Ce&&h[c+1].startsWith("/>")?" ":"";t+=n===Fe?r+Xa:g>=0?(o.push(m),r.slice(0,g)+ba+r.slice(g)+ve+s):r+ve+(g===-2?c:s)}return[Ma(h,t+(h[a]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),o]};class He{constructor({strings:e,_$litType$:a},o){let i;this.parts=[];let t=0,n=0;const c=e.length-1,r=this.parts,[m,l]=ei(e,a);if(this.el=He.createElement(m,o),Me.currentNode=this.el.content,a===2||a===3){const g=this.el.content.firstChild;g.replaceWith(...g.childNodes)}for(;(i=Me.nextNode())!==null&&r.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const g of i.getAttributeNames())if(g.endsWith(ba)){const p=l[n++],s=i.getAttribute(g).split(ve),d=/([.?@])?(.*)/.exec(p);r.push({type:1,index:t,name:d[2],strings:s,ctor:d[1]==="."?ai:d[1]==="?"?ii:d[1]==="@"?oi:vt}),i.removeAttribute(g)}else g.startsWith(ve)&&(r.push({type:6,index:t}),i.removeAttribute(g));if(xa.test(i.tagName)){const g=i.textContent.split(ve),p=g.length-1;if(p>0){i.textContent=ht?ht.emptyScript:"";for(let s=0;s<p;s++)i.append(g[s],Ve()),Me.nextNode(),r.push({type:2,index:++t});i.append(g[p],Ve())}}}else if(i.nodeType===8)if(i.data===ya)r.push({type:2,index:t});else{let g=-1;for(;(g=i.data.indexOf(ve,g+1))!==-1;)r.push({type:7,index:t}),g+=ve.length-1}t++}}static createElement(e,a){const o=Se.createElement("template");return o.innerHTML=e,o}}function _e(h,e,a=h,o){var n,c;if(e===Ee)return e;let i=o!==void 0?(n=a._$Co)==null?void 0:n[o]:a._$Cl;const t=Ge(e)?void 0:e._$litDirective$;return(i==null?void 0:i.constructor)!==t&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),t===void 0?i=void 0:(i=new t(h),i._$AT(h,a,o)),o!==void 0?(a._$Co??(a._$Co=[]))[o]=i:a._$Cl=i),i!==void 0&&(e=_e(h,i._$AS(h,e.values),i,o)),e}class ti{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:a},parts:o}=this._$AD,i=((e==null?void 0:e.creationScope)??Se).importNode(a,!0);Me.currentNode=i;let t=Me.nextNode(),n=0,c=0,r=o[0];for(;r!==void 0;){if(n===r.index){let m;r.type===2?m=new Xe(t,t.nextSibling,this,e):r.type===1?m=new r.ctor(t,r.name,r.strings,this,e):r.type===6&&(m=new ni(t,this,e)),this._$AV.push(m),r=o[++c]}n!==(r==null?void 0:r.index)&&(t=Me.nextNode(),n++)}return Me.currentNode=Se,i}p(e){let a=0;for(const o of this._$AV)o!==void 0&&(o.strings!==void 0?(o._$AI(e,o,a),a+=o.strings.length-2):o._$AI(e[a])),a++}}class Xe{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,a,o,i){this.type=2,this._$AH=N,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=o,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=_e(this,e,a),Ge(e)?e===N||e==null||e===""?(this._$AH!==N&&this._$AR(),this._$AH=N):e!==this._$AH&&e!==Ee&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Za(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==N&&Ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(Se.createTextNode(e)),this._$AH=e}$(e){var t;const{values:a,_$litType$:o}=e,i=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=He.createElement(Ma(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)==null?void 0:t._$AD)===i)this._$AH.p(a);else{const n=new ti(i,this),c=n.u(this.options);n.p(a),this.T(c),this._$AH=n}}_$AC(e){let a=na.get(e.strings);return a===void 0&&na.set(e.strings,a=new He(e)),a}k(e){Lt(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let o,i=0;for(const t of e)i===a.length?a.push(o=new Xe(this.O(Ve()),this.O(Ve()),this,this.options)):o=a[i],o._$AI(t),i++;i<a.length&&(this._$AR(o&&o._$AB.nextSibling,i),a.length=i)}_$AR(e=this._$AA.nextSibling,a){var o;for((o=this._$AP)==null?void 0:o.call(this,!1,!0,a);e&&e!==this._$AB;){const i=e.nextSibling;e.remove(),e=i}}setConnected(e){var a;this._$AM===void 0&&(this._$Cv=e,(a=this._$AP)==null||a.call(this,e))}}class vt{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,a,o,i,t){this.type=1,this._$AH=N,this._$AN=void 0,this.element=e,this.name=a,this._$AM=i,this.options=t,o.length>2||o[0]!==""||o[1]!==""?(this._$AH=Array(o.length-1).fill(new String),this.strings=o):this._$AH=N}_$AI(e,a=this,o,i){const t=this.strings;let n=!1;if(t===void 0)e=_e(this,e,a,0),n=!Ge(e)||e!==this._$AH&&e!==Ee,n&&(this._$AH=e);else{const c=e;let r,m;for(e=t[0],r=0;r<t.length-1;r++)m=_e(this,c[o+r],a,r),m===Ee&&(m=this._$AH[r]),n||(n=!Ge(m)||m!==this._$AH[r]),m===N?e=N:e!==N&&(e+=(m??"")+t[r+1]),this._$AH[r]=m}n&&!i&&this.j(e)}j(e){e===N?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ai extends vt{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===N?void 0:e}}class ii extends vt{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==N)}}class oi extends vt{constructor(e,a,o,i,t){super(e,a,o,i,t),this.type=5}_$AI(e,a=this){if((e=_e(this,e,a,0)??N)===Ee)return;const o=this._$AH,i=e===N&&o!==N||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,t=e!==N&&(o===N||i);i&&this.element.removeEventListener(this.name,this,o),t&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a;typeof this._$AH=="function"?this._$AH.call(((a=this.options)==null?void 0:a.host)??this.element,e):this._$AH.handleEvent(e)}}class ni{constructor(e,a,o){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=o}get _$AU(){return this._$AM._$AU}_$AI(e){_e(this,e)}}const Et=Qe.litHtmlPolyfillSupport;Et==null||Et(He,Xe),(Qe.litHtmlVersions??(Qe.litHtmlVersions=[])).push("3.3.0");const si=(h,e,a)=>{const o=(a==null?void 0:a.renderBefore)??e;let i=o._$litPart$;if(i===void 0){const t=(a==null?void 0:a.renderBefore)??null;o._$litPart$=i=new Xe(e.insertBefore(Ve(),t),t,void 0,a??{})}return i._$AI(h),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const we=globalThis;let B=class extends Le{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var a;const e=super.createRenderRoot();return(a=this.renderOptions).renderBefore??(a.renderBefore=e.firstChild),e}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=si(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Ee}};var fa;B._$litElement$=!0,B.finalized=!0,(fa=we.litElementHydrateSupport)==null||fa.call(we,{LitElement:B});const It=we.litElementPolyfillSupport;It==null||It({LitElement:B});(we.litElementVersions??(we.litElementVersions=[])).push("4.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V=h=>(e,a)=>{a!==void 0?a.addInitializer(()=>{customElements.define(h,e)}):customElements.define(h,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ri={attribute:!0,type:String,converter:pt,reflect:!1,hasChanged:zt},li=(h=ri,e,a)=>{const{kind:o,metadata:i}=a;let t=globalThis.litPropertyMetadata.get(i);if(t===void 0&&globalThis.litPropertyMetadata.set(i,t=new Map),o==="setter"&&((h=Object.create(h)).wrapped=!0),t.set(a.name,h),o==="accessor"){const{name:n}=a;return{set(c){const r=e.get.call(this);e.set.call(this,c),this.requestUpdate(n,r,h)},init(c){return c!==void 0&&this.C(n,void 0,h,c),c}}}if(o==="setter"){const{name:n}=a;return function(c){const r=this[n];e.call(this,c),this.requestUpdate(n,r,h)}}throw Error("Unsupported decorator location: "+o)};function L(h){return(e,a)=>typeof a=="object"?li(h,e,a):((o,i,t)=>{const n=i.hasOwnProperty(t);return i.constructor.createProperty(t,o),n?Object.getOwnPropertyDescriptor(i,t):void 0})(h,e,a)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function R(h){return L({...h,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ci=(h,e,a)=>(a.configurable=!0,a.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(h,e,a),a);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function j(h,e){return(a,o,i)=>{const t=n=>{var c;return((c=n.renderRoot)==null?void 0:c.querySelector(h))??null};return ci(a,o,{get(){return t(this)}})}}var di=Object.getOwnPropertyDescriptor,ui=(h,e,a,o)=>{for(var i=o>1?void 0:o?di(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=n(i)||i);return i};let Tt=class extends B{render(){return $``}};Tt.styles=Q`
    :host {
      display: block; 
      position: absolute; 
      width: var(--gq-food-pellet-size, 8px);
      height: var(--gq-food-pellet-size, 8px);
      background-color: var(--gq-food-pellet-bg-color, #A0522D); 
      border-radius: 50%;
      z-index: var(--gq-food-pellet-z-index, 12);
      pointer-events: none; 
      box-shadow: var(--gq-food-pellet-shadow, 0px 1px 2px rgba(0, 0, 0, 0.5));
      will-change: transform, opacity; /* Añadido opacity */

      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.3) translate(-166%, -166%); /* Moverlo fuera de la vista inicial y escalado pequeño */
                                                     /* El translate es -100% / 0.3 (escala) para compensar */
      transition: opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    /* Estado cuando el pellet ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición se aplicará directamente en el style por CatFoodManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }

    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta (aplicada por style.transform) */
        transform: scale(0.3); 
    }
  `;Tt=ui([V("food-pellet-display")],Tt);const sa=8,pi=3500,hi=8,gi=2,mi=4e-4,fi=500*500,vi=1,bi=300;class yi{constructor(e){this.isInitializedSuccessfully=!1,this.isEnabled=!1,this.isActive=!1,this.activePellets=new Map,this.nextPelletId=0,this.clickListener=null,this.gameManager=e}setCatDisplayArea(e){if(!e)throw console.error("CatFoodManager CRITICAL: Se intentó setear un CatDisplayArea nulo."),new Error("CatDisplayArea es nulo y es requerido por CatFoodManager.");this.catDisplayArea=e}init(){this.isInitializedSuccessfully=!1;try{if(this.physicsManager=this.gameManager.getPhysicsManager(),this.playerData=this.gameManager.getPlayerData(),this.catManager=this.gameManager.getCatManager(),this.audioManager=this.gameManager.getAudioManager(),!this.catDisplayArea)throw new Error("CatDisplayArea no ha sido seteado en CatFoodManager.");if(!this.physicsManager)throw new Error("PhysicsManager no disponible en CatFoodManager.");if(!this.playerData)throw new Error("PlayerData no disponible en CatFoodManager.");if(!this.catManager)throw new Error("CatManager no disponible en CatFoodManager.");if(!this.audioManager)throw new Error("AudioManager no disponible en CatFoodManager.");this.isInitializedSuccessfully=!0}catch(e){console.error("CatFoodManager: Error CRÍTICO durante la inicialización de dependencias:",e),this.isEnabled=!1}}enable(){if(!this.isInitializedSuccessfully){console.error("CatFoodManager: No se puede habilitar, la inicialización falló.");return}this.isEnabled||(this.isEnabled=!0,console.log("CatFoodManager: Funcionalidad de comida para gatos habilitada."))}toggleActive(e){if(!this.isEnabled||!this.isInitializedSuccessfully||!this.playerData)return;const a=e!==void 0?e:!this.isActive;a!==this.isActive&&(this.isActive=a,this.gameManager.getGlobalUIManager().setModuleUIsFaded(this.isActive),this.updateListenerAndCursor())}updateListenerAndCursor(){this.catDisplayArea&&(this.catDisplayArea.style.cursor=this.isActive?"copy":""),this.isActive?this.addClickListener():this.removeClickListener()}addClickListener(){if(this.clickListener||!this.isInitializedSuccessfully||!this.catDisplayArea)return;const e=this.catDisplayArea;this.clickListener=a=>{if(!this.isActive||!this.isEnabled||!this.playerData)return;const o=this.catDisplayArea.getInternalContainer();if(!(a.target!==e&&a.target!==o))if(a.preventDefault(),this.playerData.currentCatFood>0){const i=this.getClickPosition(a,e);this.spawnFoodPellet(i),this.applyAttractionForce(i),this.playerData.spendCatFoodUnit()?this.gameManager.updateCatFoodUI():this.toggleActive(!1)}else this.toggleActive(!1)},e.addEventListener("mousedown",this.clickListener),e.addEventListener("touchstart",this.clickListener,{passive:!1})}removeClickListener(){if(!this.clickListener||!this.catDisplayArea)return;const e=this.catDisplayArea;e.removeEventListener("mousedown",this.clickListener),e.removeEventListener("touchstart",this.clickListener),this.clickListener=null,e.style.cursor=""}getClickPosition(e,a){const o=a.getBoundingClientRect();let i=0,t=0;return e instanceof MouseEvent?(i=e.clientX,t=e.clientY):e.touches&&e.touches.length>0?(i=e.touches[0].clientX,t=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(i=e.changedTouches[0].clientX,t=e.changedTouches[0].clientY),{x:i-o.left,y:t-o.top}}applyAttractionForce(e){var i;if(!this.catManager||!((i=this.physicsManager)!=null&&i.getWorld))return;const a=this.catManager.getAllCats(),o=this.physicsManager.getWorld();a.forEach(t=>{if(t.physics.body&&!t.physics.body.isStatic&&P.Composite.get(o,t.physics.body.id,"body")){const n=t.physics.body,c=P.Vector.sub(e,n.position),r=P.Vector.magnitudeSquared(c);if(r>1&&r<fi){const m=Math.sqrt(r),l=mi*n.mass/(m*.1+1),g=P.Vector.mult(P.Vector.normalise(c),l);try{P.Body.applyForce(n,n.position,g)}catch{}}}})}spawnFoodPellet(e){var c,r;if(!this.isInitializedSuccessfully||!((c=this.physicsManager)!=null&&c.getWorld)||!this.catDisplayArea||!this.playerData){console.warn("CatFoodManager: No se puede crear pellet, no inicializado o faltan dependencias.");return}const a=`food_pellet_entity_${this.nextPelletId++}`,o=parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||sa,i=P.Bodies.circle(e.x,e.y,o/2,{label:"foodPellet",isSensor:!0,density:1e-4,frictionAir:.02,collisionFilter:{category:hi,mask:gi},plugin:{pelletId:a}});try{P.World.add(this.physicsManager.getWorld(),i)}catch(m){console.error("CatFoodManager: Error añadiendo pellet al mundo físico:",m);return}const t=document.createElement("food-pellet-display");t.id=a;const n=o/2;t.style.transform=`translate(${e.x-n}px, ${e.y-n}px)`,t.classList.add("appearing");try{this.catDisplayArea.addEntityElement(t),t.offsetWidth,requestAnimationFrame(()=>{t.classList.remove("appearing"),t.classList.add("spawned")})}catch(m){console.error("CatFoodManager: Error añadiendo pellet visual a catDisplayArea:",m);try{P.World.remove(this.physicsManager.getWorld(),i)}catch{}return}this.activePellets.set(a,{body:i,element:t,creationTime:performance.now(),id:a}),(r=this.audioManager)==null||r.playSound("draw_end")}update(e){if(!this.isEnabled||!this.isInitializedSuccessfully||this.activePellets.size===0)return;const a=performance.now(),o=[];this.activePellets.forEach(i=>{if(a-i.creationTime>pi)o.push(i.id);else if(i.element&&i.body&&i.element.classList.contains("spawned")){const n=(i.element.offsetWidth||parseInt(getComputedStyle(document.documentElement).getPropertyValue("--gq-food-pellet-size").trim())||sa)/2;i.element.style.transform=`translate(${i.body.position.x-n}px, ${i.body.position.y-n}px)`}}),o.forEach(i=>this.removeFoodPellet(i))}removeFoodPellet(e,a=!1){var i;const o=this.activePellets.get(e);if(o){if((i=this.physicsManager)!=null&&i.getWorld&&o.body)try{P.Composite.get(this.physicsManager.getWorld(),o.body.id,"body")&&P.World.remove(this.physicsManager.getWorld(),o.body)}catch{}this.catDisplayArea&&o.element&&this.catDisplayArea.removeEntityElement(o.element),this.activePellets.delete(e)}}processCatFoodCollision(e,a){var g,p,s;const o=(g=a.plugin)==null?void 0:g.pelletId;if(!o||!this.activePellets.has(o)||!this.catManager||!this.playerData||!this.audioManager||!((p=this.physicsManager)!=null&&p.getWorld))return;const i=this.catManager.bodyIdToEntityIdMap.get(e);if(!i)return;const t=this.catManager.getCat(i);if(!(t!=null&&t.value)||!t.physics.body||!(((s=t.render)==null?void 0:s.element)instanceof B))return;const n=t.render.element,c=t.value.currentSize,r=this.playerData.getCurrentMaxSizeLimit();let m=Math.min(r,bi,c+vi);const l=m/c;if(l>1.0001){t.value.currentSize=m;try{if(P.Composite.get(this.physicsManager.getWorld(),t.physics.body.id,"body"))P.Body.scale(t.physics.body,l,l),t.physics.body.plugin&&(t.physics.body.plugin.currentSize=m);else throw new Error("Cuerpo del gato no encontrado en el mundo para escalar");n&&typeof n.size=="number"&&(n.size=m)}catch(d){console.error("CatFoodManager: Error al escalar gato después de comer:",d),t.value.currentSize=c,t.physics.body.plugin&&(t.physics.body.plugin.currentSize=c)}}this.audioManager.playSound("eat"),this.removeFoodPellet(o,!0)}destroy(){this.removeClickListener(),Array.from(this.activePellets.keys()).forEach(a=>this.removeFoodPellet(a)),this.activePellets.clear(),this.isEnabled=!1,this.isActive=!1,this.isInitializedSuccessfully=!1,this.catDisplayArea&&(this.catDisplayArea.style.cursor="")}}class wa{constructor(e){this.type="PhysicsComponent",this.body=null,this.body=e??null}}class Sa{constructor(e){this.type="RenderComponent",this.element=null,this.isVisible=!0,this.element=e??null}}class Ea{constructor(e=0,a=0,o=0,i=0){this.type="ValueComponent",this.rarity=0,this.scoreValue=0,this.currentSize=0,this.growthLevel=0,this.rarity=e,this.scoreValue=a,this.currentSize=o,this.growthLevel=i}}class xi{constructor(e,a,o,i){this.id=e,this.physics=a,this.render=o,this.value=i}getComponent(e){if(e===this.physics.type&&this.physics instanceof wa)return this.physics;if(e===this.render.type&&this.render instanceof Sa)return this.render;if(e===this.value.type&&this.value instanceof Ea)return this.value}}var Ci=Object.defineProperty,Mi=Object.getOwnPropertyDescriptor,Ze=(h,e,a,o)=>{for(var i=o>1?void 0:o?Mi(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ci(e,a,i),i};let Ie=class extends B{constructor(){super(...arguments),this.size=50,this.imageUrl="",this.backgroundColorFallback="var(--gq-cat-fallback-bg, #ccc)",this.glowClass=""}updated(h){if(super.updated(h),h.has("glowClass")){const e=h.get("glowClass");e&&e!==this.glowClass&&this.classList.remove(e),this.glowClass&&this.classList.add(this.glowClass)}}render(){return this.style.width=`${this.size}px`,this.style.height=`${this.size}px`,this.style.backgroundImage=this.imageUrl?`url('${this.imageUrl}')`:"none",this.style.backgroundColor=this.imageUrl?"transparent":this.backgroundColorFallback,$``}};Ie.styles=Q`
    :host {
      display: block; 
      position: absolute; 
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      cursor: grab;
      pointer-events: auto; 
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      will-change: transform, width, height, box-shadow, opacity; /* Añadido opacity */
      box-shadow: var(--gq-cat-base-shadow, inset -2px -2px 5px rgba(0,0,0,0.3));
      /* Estilos iniciales para animación de aparición */
      opacity: 0;
      transform: scale(0.5) translate(-100%, -100%); /* Moverlo fuera de la vista inicial y escalado */
      transition: opacity 0.3s ease-out, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                  box-shadow 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out;
    }

    /* Estado cuando el gato ha aparecido */
    :host(.spawned) {
      opacity: 1;
      /* El transform de posición y rotación se aplicará directamente en el style por CatManager */
      /* Solo necesitamos resetear la escala de la animación de aparición */
      transform: scale(1); 
    }
    
    /* Clase intermedia para asegurar que la posición se aplique antes de la animación */
    :host(.appearing) {
        opacity: 0;
        /* Mantenemos la escala pequeña, pero la posición ya estará correcta */
        transform: scale(0.5); 
    }


    /* Estilos de Brillo (Glow) */
    :host(.glow-gray) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-gray-blur, 10px) var(--gq-cat-glow-gray-spread, 4px) var(--gq-cat-glow-gray-color, rgba(180, 180, 180, 0.7));
    }
    :host(.glow-green) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-green-blur, 12px) var(--gq-cat-glow-green-spread, 5px) var(--gq-cat-glow-green-color, rgba(0, 255, 0, 0.7));
    }
    :host(.glow-blue) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-blue-blur, 12px) var(--gq-cat-glow-blue-spread, 5px) var(--gq-cat-glow-blue-color, rgba(0, 150, 255, 0.7));
    }
    :host(.glow-violet) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-violet-blur, 14px) var(--gq-cat-glow-violet-spread, 6px) var(--gq-cat-glow-violet-color, rgba(180, 0, 255, 0.65));
    }
    :host(.glow-orange) {
      box-shadow: var(--gq-cat-base-shadow, inset -3px -3px 8px rgba(0,0,0,0.4)),
                  var(--gq-cat-outline-shadow, 1px 1px 3px rgba(0,0,0,0.2)),
                  0 0 var(--gq-cat-glow-orange-blur, 15px) var(--gq-cat-glow-orange-spread, 7px) var(--gq-cat-glow-orange-color, rgba(255, 140, 0, 0.7));
    }
  `;Ze([L({type:Number})],Ie.prototype,"size",2);Ze([L({type:String,attribute:"image-url"})],Ie.prototype,"imageUrl",2);Ze([L({type:String,attribute:"background-color-fallback"})],Ie.prototype,"backgroundColorFallback",2);Ze([L({type:String,attribute:"glow-class"})],Ie.prototype,"glowClass",2);Ie=Ze([V("cat-entity-display")],Ie);const wi=1,ra=2,Si=4,Ei=8,Ii=1.15,la=300,Ai=1.02,ca={0:null,1:"glow-gray",2:"glow-green",3:"glow-blue",4:"glow-violet",5:"glow-orange"},qi=10;class ki{constructor(e,a){this.cats=new Map,this.bodyIdToEntityIdMap=new Map,this.nextCatIdCounter=0,this.templates=new Map,this.audioManager=e,this.gameManager=a,console.log("CatManager Creado (esperando CatDisplayArea y PhysicsManager).")}setPhysicsManager(e){this.physicsManager=e,console.log("CatManager: PhysicsManager seteado.")}setCatDisplayArea(e){e instanceof B&&typeof e.clearAllEntityElements=="function"?(this.catDisplayArea=e,console.log("CatManager: CatDisplayArea seteado correctamente y es una instancia válida de CatDisplayArea (LitElement con clearAllEntityElements).",this.catDisplayArea)):(console.error("CatManager CRITICAL: Se intentó setear un CatDisplayArea inválido o nulo.",e),!this.catDisplayArea&&e===null||(e?console.error("CatManager: displayArea NO es una instancia válida de CatDisplayArea o no tiene clearAllEntityElements. Tipo recibido:",typeof e,"Tiene clearAllEntityElements:",typeof e.clearAllEntityElements):console.error("CatManager: displayArea es null/undefined.")))}loadTemplates(e){if(this.templates.clear(),!Array.isArray(e)){console.error("CatManager: Formato inválido de plantillas.");return}e.forEach(a=>{a!=null&&a.id?((typeof a.spawnWeight!="number"||a.spawnWeight<=0)&&(a.spawnWeight=1),this.templates.set(a.id,a)):console.warn("CatManager: Plantilla inválida o sin ID.",a)}),console.log(`CatManager: ${this.templates.size} plantillas cargadas.`)}getSpawnableTemplatesWeighted(){const e=[];return this.templates.forEach(a=>{const o=a.spawnWeight&&a.spawnWeight>0?a.spawnWeight:1;e.push({id:a.id,weight:o})}),e}addCat(e,a){if(!this.gameManager)return console.error("CatManager: GameManager no disponible."),null;if(!this.catDisplayArea)return console.error("CatManager: CatDisplayArea no está seteado o es inválido. No se puede añadir gato."),null;if(typeof this.catDisplayArea.addEntityElement!="function")return console.error("CatManager: this.catDisplayArea no tiene el método addEntityElement. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea),null;const o=this.cats.size,i=this.gameManager.getPlayerData().getMaxCatsAllowed();if(o>=i)return null;if(!this.physicsManager)return console.error("CatManager: PhysicsManager no está seteado."),null;const t=this.templates.get(e);if(!t)return console.error(`CatManager: Plantilla '${e}' no encontrada.`),null;const n=`cat_entity_${this.nextCatIdCounter++}`,c=t.initialSize,r=t.rarity,m=t.scoreValue??0,l=c/2+5,g=(a==null?void 0:a.x)??Math.random()*(window.innerWidth-c-l*2)+l,p=(a==null?void 0:a.y)??Math.max(l,Math.min(window.innerHeight-l,qi+c/2)),d={...{restitution:.6,friction:.1,frictionAir:.01,density:.005,slop:.01},...t.physicsOptions??{},label:"cat",collisionFilter:{category:ra,mask:wi|ra|Si|Ei},plugin:{entityId:n,rarity:r,currentSize:c}},u=P.Bodies.circle(g,p,c/2,d);P.Body.setAngularVelocity(u,(Math.random()-.5)*.2);const f=new wa(u);this.bodyIdToEntityIdMap.set(u.id,n);const b=document.createElement("cat-entity-display");b.id=n,b.size=c,b.classList.add("appearing");const w=t.renderOptions??{},E=w.backgroundColor??"var(--gq-cat-fallback-bg, #ccc)";let I=w.imageUrl;if(!I){const S=Number.isFinite(c)&&c>0?Math.round(c):50;I=`https://cataas.com/cat/says/Miaw!_${n.slice(-2)}?${Date.now()}&width=${S}&height=${S}&type=square`}b.imageUrl=I,b.backgroundColorFallback=E,b.glowClass=w.glowClass??ca[r]??"";const v=new Image;v.onload=()=>{},v.onerror=()=>{console.warn(`CatManager: Falló la carga de la imagen del gato: ${I}. Usando color de fallback.`),b&&(b.imageUrl="")},I&&(v.src=I);try{this.catDisplayArea.addEntityElement(b),b.offsetWidth,requestAnimationFrame(()=>{b.classList.remove("appearing"),b.classList.add("spawned")})}catch(S){return console.error("CatManager: Error añadiendo catDisplayElement a catDisplayArea:",S),this.bodyIdToEntityIdMap.delete(u.id),null}const x=new Sa(b),C=new Ea(r,m,c,0),y=new xi(n,f,x,C);try{if(!this.physicsManager.getWorld())throw new Error("PhysicsManager world no disponible al añadir gato.");P.World.add(this.physicsManager.getWorld(),u)}catch(S){return console.error(`CatManager: Error añadiendo cuerpo físico ${n} al mundo:`,S),this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"&&this.catDisplayArea.removeEntityElement(b),this.bodyIdToEntityIdMap.delete(u.id),null}return this.cats.set(n,y),y}removeCat(e){var i;const a=String(e),o=this.cats.get(a);if(o){const t=o.physics.body;if(t){this.bodyIdToEntityIdMap.delete(t.id);try{(i=this.physicsManager)!=null&&i.getWorld&&P.Composite.get(this.physicsManager.getWorld(),t.id,"body")&&P.World.remove(this.physicsManager.getWorld(),t)}catch(n){console.warn(`Error eliminando cuerpo físico gato ${a}:`,n)}}o.render.element&&(this.catDisplayArea&&typeof this.catDisplayArea.removeEntityElement=="function"?this.catDisplayArea.removeEntityElement(o.render.element):(console.warn("CatManager: catDisplayArea no disponible o sin removeEntityElement al intentar remover gato del DOM."),o.render.element.parentNode&&o.render.element.parentNode.removeChild(o.render.element))),this.cats.delete(a)}}processPlayerInitiatedCollision(e,a,o){const i=this.bodyIdToEntityIdMap.get(e),t=this.bodyIdToEntityIdMap.get(a);if(i&&t){const n=this.cats.get(i),c=this.cats.get(t);if(n&&c){const r=e===o?n:c,m=e===o?c:n;r&&m?this.handleCatVsCatCollision(r,m):console.error("Error: No se pudo determinar dragger/target cat en colisión.")}}}handleCatVsCatCollision(e,a){if(!e.physics.body||!e.value||!a.physics.body||!a.value||!this.gameManager){console.warn("handleCatVsCatCollision: Faltan componentes necesarios en dragger o target.");return}if(e.id===a.id)return;const o=e.value.currentSize,i=e.value.rarity,t=a.value.currentSize,n=a.value.rarity,c=this.gameManager.getPlayerData().getCurrentMaxSizeLimit(),r=o>=c;let m=!1,l=!1,g=!1;o>t*Ai&&(r?i<n&&(m=!0,g=!1,l=!0):(m=!0,g=!0,l=i<n)),m&&this.performEat(e,a,l,g)}performEat(e,a,o,i){if(!e.physics.body||!e.value||!(e.render.element instanceof B)||!a.value||!this.gameManager){console.warn("performEat: Faltan componentes o el elemento de render no es CatEntityDisplay.");return}const t=e.render.element,n=a.id,c=a.value.rarity;if(this.removeCat(n),i){const r=e.value.currentSize,m=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let l=Math.min(m,la,r*Ii);const g=l/r;if(g>1.001){e.value.currentSize=l;try{if(this.physicsManager.getWorld&&P.Composite.get(this.physicsManager.getWorld(),e.physics.body.id,"body"))P.Body.scale(e.physics.body,g,g),e.physics.body.plugin&&(e.physics.body.plugin.currentSize=l);else throw new Error("Body not found in world during scaling")}catch(p){console.error(`Error scaling body ${e.id}:`,p),e.value.currentSize=r,e.physics.body.plugin&&(e.physics.body.plugin.currentSize=r)}t.size=l}}o&&c>e.value.rarity&&(e.value.rarity=c,e.physics.body.plugin&&(e.physics.body.plugin.rarity=c),t.glowClass=ca[c]??"");try{this.audioManager.playSound("eat")}catch(r){console.error("Error playing 'eat' sound:",r)}}updateCats(e){this.cats.forEach(a=>{const o=a.physics.body,i=a.render.element,t=a.value;if(!o||!i||!(i instanceof B)||!t)return;const n=i,c=t.currentSize;if(a.render.isVisible){n.style.display==="none"&&(n.style.display="");const r=c/2;n.style.transform=`translate(${o.position.x-r}px, ${o.position.y-r}px) rotate(${o.angle}rad)`,n.size!==c&&(n.size=c)}else n.style.display!=="none"&&(n.style.display="none")})}getCat(e){return this.cats.get(e)}getAllCats(){return Array.from(this.cats.values())}removeAllCats(){var a;console.log(`CatManager: Intentando remover todos los ${this.cats.size} gatos...`),this.catDisplayArea&&typeof this.catDisplayArea.clearAllEntityElements=="function"?this.catDisplayArea.clearAllEntityElements():console.error("CatManager: catDisplayArea no está disponible o no es una instancia válida de CatDisplayArea con clearAllEntityElements al intentar removeAllCats. Tipo actual:",typeof this.catDisplayArea,this.catDisplayArea);const e=(a=this.physicsManager)==null?void 0:a.getWorld();if(e){const o=Array.from(this.cats.values()).map(i=>i.physics.body).filter(i=>i&&P.Composite.get(e,i.id,"body"));if(o.length>0)try{P.World.remove(e,o)}catch(i){console.warn("CatManager: Error removiendo algunos cuerpos de gatos del mundo físico:",i)}}else console.warn("CatManager: PhysicsManager world no disponible durante removeAllCats.");this.cats.clear(),this.bodyIdToEntityIdMap.clear(),this.nextCatIdCounter=0,console.log("CatManager: Lógica interna de gatos y mapeos limpiados.")}growExistingCats(e,a){let o=0;this.cats.forEach(i=>{if(!i.value||!i.physics.body||!(i.render.element instanceof B)||!this.physicsManager||!this.gameManager||i.value.rarity!==0)return;const t=i.render.element;if(i.value.growthLevel<a){const n=i.value.currentSize,c=this.gameManager.getPlayerData().getCurrentMaxSizeLimit();let r=Math.min(c,la,n+e);const m=r/n;if(m>1.0001){i.value.growthLevel++,i.value.currentSize=r;try{const l=i.physics.body;if(this.physicsManager.getWorld&&P.Composite.get(this.physicsManager.getWorld(),l.id,"body"))P.Body.scale(l,m,m),l.plugin&&(l.plugin.currentSize=r),o++;else throw new Error("Body not found in world for growth scaling")}catch(l){console.error(` -> Error escalando gato común ${i.id} (crecimiento por acierto):`,l),i.value.growthLevel--,i.value.currentSize=n,i.physics.body.plugin&&(i.physics.body.plugin.currentSize=n)}t.size=r}}})}}var Ti=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,bt=(h,e,a,o)=>{for(var i=o>1?void 0:o?Di(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ti(e,a,i),i};let Oe=class extends B{constructor(){super(),this._canvasContext=null,this.isActive=!1,this.isPointerLockdown=!1,console.log("DrawingCanvasLayer: Constructor - Elemento creado pero aún no en DOM o actualizado.")}connectedCallback(){super.connectedCallback(),console.log("DrawingCanvasLayer: connectedCallback - Elemento conectado al DOM.")}firstUpdated(){console.log("DrawingCanvasLayer: firstUpdated INICIADO."),this._canvasElement?(console.log("DrawingCanvasLayer: _canvasElement ENCONTRADO en firstUpdated:",this._canvasElement),this._canvasContext=this._canvasElement.getContext("2d"),this._canvasContext?console.log("DrawingCanvasLayer: Contexto 2D OBTENIDO exitosamente."):console.error("DrawingCanvasLayer: No se pudo obtener el contexto 2D del _canvasElement."),this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0})),console.log('DrawingCanvasLayer: Evento "canvas-ready" EMITIDO.')):(console.error('DrawingCanvasLayer: _canvasElement es null/undefined en firstUpdated. @query("canvas") pudo haber fallado o el canvas no está en el template en este punto.'),this.dispatchEvent(new CustomEvent("canvas-ready",{bubbles:!0,composed:!0})),console.warn('DrawingCanvasLayer: Evento "canvas-ready" EMITIDO a pesar de no encontrar _canvasElement (para depuración).')),this.resizeCanvas(),console.log("DrawingCanvasLayer: firstUpdated FINALIZADO.")}getCanvasElement(){return this._canvasElement??null}getContext(){return this._canvasContext??null}resizeCanvas(){this._canvasElement&&(this._canvasElement.width=window.innerWidth,this._canvasElement.height=window.innerHeight,this.dispatchEvent(new CustomEvent("canvas-resized",{bubbles:!0,composed:!0})))}render(){return $`<canvas></canvas>`}};Oe.styles=Q`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none; /* Por defecto, no interactivo */
      z-index: var(--gq-drawing-canvas-z-default, 15); 
      background-color: transparent;
    }

    /* Cuando el pincel está activo Y no hay un bloqueo de puntero */
    :host([isActive]:not([isPointerLockdown])) {
      pointer-events: auto;
      cursor: var(--gq-drawing-canvas-cursor-active, crosshair);
      z-index: var(--gq-drawing-canvas-z-active, 25); 
    }

    /* Cuando hay un bloqueo de puntero (ej. arrastrando un gato), siempre no interactivo */
    :host([isPointerLockdown]) {
      pointer-events: none !important; 
      cursor: default; 
    }

    canvas {
      width: 100%;
      height: 100%;
      display: block; 
    }
  `;bt([j("canvas")],Oe.prototype,"_canvasElement",2);bt([L({type:Boolean,reflect:!0})],Oe.prototype,"isActive",2);bt([L({type:Boolean,reflect:!0})],Oe.prototype,"isPointerLockdown",2);Oe=bt([V("drawing-canvas-layer")],Oe);const da=25,ua=8,Pi=150,zi=4,Li=2,_i=Li;class Oi{constructor(e){this.drawingCanvasLayer=null,this.actualCanvasElement=null,this.drawingCtx=null,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.lastPoint=null,this.drawnPaths=[],this.isInitialized=!1,this.generalListeners=[],this.gameManager=e;try{this.playerData=e.getPlayerData()}catch(a){console.error("InkManager: Error en constructor al obtener PlayerData.",a)}}setPhysicsManager(e){this.physicsManager=e}async init(){if(this.isInitialized){this.updateInkRelatedUI();return}console.log("InkManager: init() INICIADO.");try{if(!this.physicsManager&&(this.physicsManager=this.gameManager.getPhysicsManager(),!this.physicsManager))throw new Error("PhysicsManager no disponible para InkManager.");if(!this.playerData&&(this.playerData=this.gameManager.getPlayerData(),!this.playerData))throw new Error("PlayerData no disponible para InkManager.");const e=document.getElementById("drawing-canvas-layer-main");if(console.log("InkManager init: Buscando <drawing-canvas-layer id='drawing-canvas-layer-main'>..."),!e)throw new Error("<drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado en el DOM.");if(console.log("InkManager init: canvasLayerElement encontrado:",e,"Conectado:",e.isConnected),console.log("InkManager init: Esperando a que 'drawing-canvas-layer' sea definido..."),await customElements.whenDefined("drawing-canvas-layer"),this.drawingCanvasLayer=e,console.log("InkManager init: 'drawing-canvas-layer' DEFINIDO. drawingCanvasLayer:",this.drawingCanvasLayer),console.log("InkManager init: Esperando a drawingCanvasLayer.updateComplete..."),await this.drawingCanvasLayer.updateComplete,console.log("InkManager init: drawingCanvasLayer.updateComplete RESUELTO."),this.drawingCanvasLayer.getContext()?console.log("InkManager: Contexto de drawing-canvas-layer ya estaba disponible DESPUÉS de updateComplete (antes de la espera del evento)."):(console.log("InkManager: Contexto no disponible después de updateComplete. Esperando evento 'canvas-ready' de drawingCanvasLayer..."),await new Promise((a,o)=>{const t=setTimeout(()=>{console.error("InkManager: Timeout (3000ms) esperando 'canvas-ready'. El componente drawing-canvas-layer puede no estar inicializando su contexto correctamente."),o(new Error("Timeout esperando 'canvas-ready' desde drawing-canvas-layer"))},3e3),n=()=>{clearTimeout(t),this.drawingCanvasLayer.removeEventListener("canvas-ready",n),console.log("InkManager: Evento 'canvas-ready' RECIBIDO de drawing-canvas-layer."),a()};if(this.drawingCanvasLayer.getContext()){console.log("InkManager: Contexto de drawing-canvas-layer ya estaba disponible al intentar añadir listener de 'canvas-ready'."),clearTimeout(t),a();return}console.log("InkManager: Añadiendo listener para 'canvas-ready' en drawingCanvasLayer."),this.drawingCanvasLayer.addEventListener("canvas-ready",n)})),this.actualCanvasElement=this.drawingCanvasLayer.getCanvasElement(),this.drawingCtx=this.drawingCanvasLayer.getContext(),console.log("InkManager init: actualCanvasElement:",this.actualCanvasElement,"drawingCtx:",this.drawingCtx),!this.actualCanvasElement||!this.drawingCtx)throw new Error("No se pudo obtener el canvas o el contexto 2D desde drawing-canvas-layer DESPUÉS de las esperas (whenDefined, updateComplete, canvas-ready).");this.setupDrawingCanvas(),this.initDrawingListeners(),this.isInitialized=!0,this.updateInkRelatedUI(),console.log("InkManager: Inicializado correctamente.")}catch(e){console.error("InkManager: Error CRÍTICO en inicialización:",e),this.isInitialized=!1}}addListener(e,a,o,i){e.addEventListener(a,o,i),this.generalListeners.push({element:e,type:a,handler:o,options:i})}initDrawingListeners(){if(this.removeDrawingListeners(),this.actualCanvasElement){const e=this.startDrawing.bind(this),a=this.draw.bind(this),o=this.stopDrawing.bind(this);this.addListener(this.actualCanvasElement,"mousedown",e),this.addListener(this.actualCanvasElement,"mousemove",a),this.addListener(this.actualCanvasElement,"mouseup",o),this.addListener(this.actualCanvasElement,"mouseleave",o),this.addListener(this.actualCanvasElement,"touchstart",e,{passive:!1}),this.addListener(this.actualCanvasElement,"touchmove",a,{passive:!1}),this.addListener(this.actualCanvasElement,"touchend",o),this.addListener(this.actualCanvasElement,"touchcancel",o)}this.addListener(window,"resize",this.handleResize.bind(this))}removeDrawingListeners(){this.generalListeners.forEach(({element:e,type:a,handler:o,options:i})=>{try{e.removeEventListener(a,o,i)}catch{}}),this.generalListeners=[]}setupDrawingCanvas(){this.drawingCtx&&this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.applyContextStyles(),this.clearCanvas(),this.redrawPaths())}applyContextStyles(){if(!this.drawingCtx)return;const e=getComputedStyle(document.documentElement).getPropertyValue("--gq-ink-line-color").trim()||"#E5E7EB";this.drawingCtx.strokeStyle=e,this.drawingCtx.lineWidth=ua,this.drawingCtx.lineCap="round",this.drawingCtx.lineJoin="round"}handleResize(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.resizeCanvas(),this.drawingCtx=this.drawingCanvasLayer.getContext(),this.drawingCtx&&(this.applyContextStyles(),this.redrawPaths()))}clearCanvas(){this.drawingCtx&&this.actualCanvasElement&&this.drawingCtx.clearRect(0,0,this.actualCanvasElement.width,this.actualCanvasElement.height)}redrawPaths(){this.clearCanvas(),this.drawingCtx&&this.drawnPaths.forEach(e=>{this.drawPathPoints(e.points)})}drawPathPoints(e){if(!(!this.drawingCtx||e.length<2)){this.drawingCtx.beginPath(),this.drawingCtx.moveTo(e[0].x,e[0].y);for(let a=1;a<e.length;a++)this.drawingCtx.lineTo(e[a].x,e[a].y);this.drawingCtx.stroke()}}updateInkRelatedUI(){!this.isInitialized||!this.playerData||(this.gameManager.updateInkUI(),this.playerData.currentInk<=0&&this.isBrushActive&&this.toggleBrush(!1))}toggleBrush(e){if(!this.isInitialized){console.warn("InkManager: Intento de toggleBrush antes de inicializar.");return}const a=e!==void 0?e:!this.isBrushActive;a!==this.isBrushActive&&(this.isBrushActive=a,!this.isBrushActive&&this.isDrawing&&this.stopDrawing(null),this.gameManager.getGlobalUIManager().setModuleUIsFaded(this.isBrushActive),this.updateCanvasActiveState())}updateCanvasActiveState(){this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=this.isBrushActive)}clearInkLines(){var a;if(!this.isInitialized||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0)return;const e=this.drawnPaths.flatMap(o=>o.bodies);if((a=this.physicsManager)!=null&&a.getWorld&&e.length>0)try{const o=this.physicsManager.getWorld(),i=e.filter(t=>P.Composite.get(o,t.id,"body"));i.length>0&&P.World.remove(o,i)}catch(o){console.error("InkManager: Error removiendo cuerpos de tinta del mundo físico:",o)}this.drawnPaths=[],this.clearCanvas(),this.playerData.recoverSpentInk(),this.updateInkRelatedUI(),this.gameManager.getAudioManager().playSound("clear_ink")}gainInkOnCorrectAnswer(){!this.isInitialized||!this.playerData.isDrawingUnlocked||(this.playerData.gainInk(Pi),this.updateInkRelatedUI())}destroy(){this.removeDrawingListeners(),this.isInitialized=!1,this.isBrushActive=!1,this.isDrawing=!1,this.currentPath=[],this.drawnPaths=[],this.clearCanvas(),this.drawingCanvasLayer&&(this.drawingCanvasLayer.isActive=!1,this.drawingCanvasLayer.isPointerLockdown=!1),this.drawingCtx=null,this.actualCanvasElement=null,this.drawingCanvasLayer=null,console.log("InkManager: Destruido y recursos liberados.")}startDrawing(e){if(!this.isInitialized||!this.isBrushActive||!this.drawingCtx||!this.actualCanvasElement||this.playerData.currentInk<=0)return;e.preventDefault(),this.isDrawing=!0;const a=this.getMousePos(e);this.currentPath=[a],this.lastPoint=a,this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.gameManager.getAudioManager().playSound("draw_start")}draw(e){if(!this.isDrawing||!this.isBrushActive||!this.drawingCtx)return;e.preventDefault();const a=this.getMousePos(e),o=this.lastPoint?this.distanceSq(this.lastPoint,a):da;if(o>=da){const t=Math.sqrt(o)*this.playerData.getCurrentInkCostPerPixel();this.playerData.spendInk(t)?(this.currentPath.push(a),this.drawingCtx.lineTo(a.x,a.y),this.drawingCtx.stroke(),this.drawingCtx.beginPath(),this.drawingCtx.moveTo(a.x,a.y),this.lastPoint=a,this.updateInkRelatedUI()):(this.stopDrawing(e),this.playerData.currentInk<=0&&this.toggleBrush(!1))}}stopDrawing(e){var a;if(this.isDrawing){if(e==null||e.preventDefault(),this.isDrawing=!1,this.gameManager.getAudioManager().playSound("draw_end"),this.currentPath.length>1){const o=this.createInkBodySegments(this.currentPath);if(o.length>0&&((a=this.physicsManager)!=null&&a.getWorld))try{P.World.add(this.physicsManager.getWorld(),o),this.drawnPaths.push({points:[...this.currentPath],bodies:o})}catch(i){console.error("InkManager: Error añadiendo cuerpos:",i)}else this.physicsManager||console.error("InkManager: PhysicsManager no disponible.")}this.currentPath=[],this.lastPoint=null}}getMousePos(e){if(!this.actualCanvasElement)return{x:0,y:0};const a=this.actualCanvasElement.getBoundingClientRect();let o=0,i=0;return e instanceof MouseEvent?(o=e.clientX,i=e.clientY):e.touches&&e.touches.length>0?(o=e.touches[0].clientX,i=e.touches[0].clientY):e.changedTouches&&e.changedTouches.length>0&&(o=e.changedTouches[0].clientX,i=e.changedTouches[0].clientY),{x:o-a.left,y:i-a.top}}distanceSq(e,a){const o=e.x-a.x,i=e.y-a.y;return o*o+i*i}createInkBodySegments(e){const a=[];if(e.length<2||!this.physicsManager)return a;for(let o=1;o<e.length;o++){const i=e[o-1],t=e[o],n=t.x-i.x,c=t.y-i.y,r=n*n+c*c;if(r<1)continue;const m=Math.sqrt(r),l=Math.atan2(c,n),g=i.x+n/2,p=i.y+c/2;try{const s=P.Bodies.rectangle(g,p,m,ua,{isStatic:!0,angle:l,label:"inkLine",friction:.5,restitution:.1,collisionFilter:{category:zi,mask:_i},render:{visible:!1}});s&&a.push(s)}catch(s){console.error("InkManager: Error creando cuerpo:",s)}}return a}}var $i=Object.defineProperty,Bi=Object.getOwnPropertyDescriptor,De=(h,e,a,o)=>{for(var i=o>1?void 0:o?Bi(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&$i(e,a,i),i};let he=class extends B{constructor(){super(),this.itemId="",this.icon="❓",this.isDisabled=!1,this.isPurchased=!1,this.isMaxLevel=!1,this.isSelected=!1,this.addEventListener("click",this._handleClick),this.addEventListener("touchstart",this._handleClick,{passive:!1})}render(){return $`
      <span class="shop-item-icon" part="icon">${this.icon}</span>
    `}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleClick),this.removeEventListener("touchstart",this._handleClick)}_handleClick(h){h.stopPropagation(),h.type==="touchstart"&&h.preventDefault(),this.isDisabled||this.isPurchased||this.isMaxLevel||this.dispatchEvent(new CustomEvent("item-selected",{detail:{itemId:this.itemId},bubbles:!0,composed:!0}))}};he.styles=Q`
    :host {
      display: flex; 
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
      width: 100%;
      max-width: var(--gq-shop-card-max-width, 6rem); /* Puede ser variable */
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      border-radius: var(--gq-shop-card-border-radius, 0.75rem);
      background-color: var(--gq-shop-card-bg, rgba(55, 65, 81, 0.7));
      border: var(--gq-shop-card-border, 2px solid #4b5563);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
      transition: transform 0.2s ease, background-color 0.2s ease,
                  border-color 0.2s ease, box-shadow 0.2s ease,
                  opacity 0.2s ease;
      -webkit-tap-highlight-color: transparent;
      overflow: hidden;
    }

    .shop-item-icon {
      font-size: var(--gq-shop-card-icon-font-size, clamp(1.2rem, 5vmin, 1.8rem));
      line-height: 1;
      user-select: none;
      color: var(--gq-shop-card-icon-color, inherit); /* Permite tematizar color del icono */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):hover) {
      background-color: var(--gq-shop-card-hover-bg, rgba(75, 85, 99, 0.8));
      border-color: var(--gq-shop-card-hover-border-color, var(--gq-shop-card-border-color, #60a5fa)); /* Ejemplo de un color de borde en hover */
    }

    :host(:not([isDisabled]):not([isPurchased]):not([isMaxLevel]):not([isSelected]):active) {
      transform: scale(0.95);
      background-color: var(--gq-shop-card-active-bg, rgba(75, 85, 99, 0.9));
    }

    :host([isDisabled]) {
      opacity: var(--gq-shop-card-disabled-opacity, 0.5);
      cursor: default;
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg)); /* Mantener bg o cambiarlo */
    }
    :host([isDisabled]:active), :host([isDisabled]:hover) {
      transform: none;
      background-color: var(--gq-shop-card-disabled-bg, var(--gq-shop-card-bg));
      border-color: var(--gq-shop-card-disabled-border-color, #374151);
      box-shadow: var(--gq-shop-card-box-shadow, 0 0.125rem 0.25rem rgba(0,0,0,0.3));
    }

    :host([isPurchased]) {
      opacity: var(--gq-shop-card-purchased-opacity, 0.7);
      cursor: default;
      border-color: var(--gq-shop-card-purchased-border-color, #f59e0b);
    }
    /* ... (estados :active y :hover para [isPurchased] y [isMaxLevel] de forma similar a [isDisabled]) ... */

    :host([isMaxLevel]) {
      opacity: var(--gq-shop-card-maxlevel-opacity, 0.8);
      cursor: default;
      border-color: var(--gq-shop-card-maxlevel-border-color, #34d399);
    }
    
    :host([isDisabled]:not([isPurchased]):not([isMaxLevel])) {
       border-color: var(--gq-shop-card-disabled-nootherstate-border-color, #374151);
       opacity: var(--gq-shop-card-disabled-nootherstate-opacity, 0.5);
    }

    :host([isSelected]) {
      border-color: var(--gq-shop-card-selected-border-color, #facc15);
      box-shadow: var(--gq-shop-card-selected-box-shadow, 0 0 0.5rem rgba(250, 204, 21, 0.6), 0 0.25rem 0.5rem rgba(0,0,0,0.4));
      transform: scale(1.05);
      background-color: var(--gq-shop-card-selected-bg, var(--gq-shop-card-hover-bg)); /* Un fondo ligeramente diferente para seleccionado */
    }
     :host([isSelected]:active) {
       transform: scale(1.02);
     }

     @media (max-width: 480px) {
        :host {
            border-radius: var(--gq-shop-card-mobile-border-radius, 0.5rem);
        }
        .shop-item-icon {
            font-size: var(--gq-shop-card-mobile-icon-font-size, clamp(1rem, 4.5vmin, 1.5rem));
        }
     }
  `;De([L({type:String})],he.prototype,"itemId",2);De([L({type:String})],he.prototype,"icon",2);De([L({type:Boolean,reflect:!0})],he.prototype,"isDisabled",2);De([L({type:Boolean,reflect:!0})],he.prototype,"isPurchased",2);De([L({type:Boolean,reflect:!0})],he.prototype,"isMaxLevel",2);De([L({type:Boolean,reflect:!0})],he.prototype,"isSelected",2);he=De([V("shop-item-card")],he);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ui={ATTRIBUTE:1},Ri=h=>(...e)=>({_$litDirective$:h,values:e});class Fi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,a,o){this._$Ct=e,this._$AM=a,this._$Ci=o}_$AS(e,a){return this.update(e,a)}update(e,a){return this.render(...a)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=Ri(class extends Fi{constructor(h){var e;if(super(h),h.type!==Ui.ATTRIBUTE||h.name!=="class"||((e=h.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(h){return" "+Object.keys(h).filter(e=>h[e]).join(" ")+" "}update(h,[e]){var o,i;if(this.st===void 0){this.st=new Set,h.strings!==void 0&&(this.nt=new Set(h.strings.join(" ").split(/\s/).filter(t=>t!=="")));for(const t in e)e[t]&&!((o=this.nt)!=null&&o.has(t))&&this.st.add(t);return this.render(e)}const a=h.element.classList;for(const t of this.st)t in e||(a.remove(t),this.st.delete(t));for(const t in e){const n=!!e[t];n===this.st.has(t)||(i=this.nt)!=null&&i.has(t)||(n?(a.add(t),this.st.add(t)):(a.remove(t),this.st.delete(t)))}return Ee}});var Ni=Object.defineProperty,Qi=Object.getOwnPropertyDescriptor,ie=(h,e,a,o)=>{for(var i=o>1?void 0:o?Qi(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ni(e,a,i),i};const pa="Selecciona un ítem para ver sus detalles.";let J=class extends B{constructor(){super(...arguments),this.itemData=null,this.playerDataSnapshot=null,this._itemName="...",this._itemLevelText="",this._itemEffectText=pa,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonIcon="💰",this._isEmpty=!0,this._buyButtonState="empty"}connectedCallback(){super.connectedCallback(),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty)}updated(h){var a;super.updated(h);let e=!1;if(console.log("%c[ShopTooltip DEBUG] updated()","color: orange; font-weight: bold;","Cambios:",Array.from(h.keys())),h.has("playerDataSnapshot")){const o=h.get("playerDataSnapshot"),i=this.playerDataSnapshot,t=(o==null?void 0:o.comboMultiplierLevel)??"N/A",n=(i==null?void 0:i.comboMultiplierLevel)??"N/A";console.log(`%c[ShopTooltip DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${t}, Nuevo: ${n}. Llamando a _updateInternalState...`,"color: orange;"),e=!0}h.has("itemData")&&(console.log(`%c[ShopTooltip DEBUG]   > itemData cambió a ID: ${((a=this.itemData)==null?void 0:a.id)??"null"}. Llamando a _updateInternalState...`,"color: orange;"),e=!0),e&&(this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty))}forceRefresh(){console.log("%c[ShopTooltip DEBUG] forceRefresh() llamado.","color: orange; font-weight: bold;"),this._updateInternalState(),this.toggleAttribute("empty",this._isEmpty),this.requestUpdate()}_updateInternalState(){var e,a,o;const h=(e=this.itemData)!=null&&e.levelRef&&this.playerDataSnapshot?this.playerDataSnapshot[this.itemData.levelRef]:"N/A";if(console.log(`%c[ShopTooltip DEBUG internalState] INICIO _updateInternalState. Item ID: ${((a=this.itemData)==null?void 0:a.id)??"null"}, Snapshot Nivel (${((o=this.itemData)==null?void 0:o.levelRef)??"?"}): ${h}`,"color: purple;"),this._isEmpty=!this.itemData,this._isEmpty||!this.playerDataSnapshot)this._itemName="Tienda",this._itemLevelText="",this._itemEffectText=pa,this._itemCostText="",this._itemStatusText="",this._isBuyButtonDisabled=!0,this._buyButtonState="empty",this._buyButtonIcon="🐈",console.log("%c[ShopTooltip DEBUG internalState] FIN Estado Vacío aplicado.","color: purple;");else{const i=this.itemData,t=this.playerDataSnapshot,n=this._calculateItemCost(i,t),c=t.score>=n,r=this._checkItemIsPurchased(i,t),m=this._checkItemCanPurchase(i,t),l=this._getItemLevel(i,t),g=i.isLeveled&&typeof i.maxLevel=="number"&&l>=i.maxLevel,p=!g&&!(r&&!i.isLeveled)&&m&&c;this._isBuyButtonDisabled=!p,g||r&&!i.isLeveled||!m?this._buyButtonState="disabled":c?this._buyButtonState="affordable":this._buyButtonState="unaffordable",this._itemName=i.name,this._itemEffectText=this._formatEffectText(i,t),this._itemLevelText=i.isLeveled&&l>=0?`Nivel: ${l}`:"",this._itemCostText=g?"Nivel Máximo":`Costo: ${n}`;let s="";g?s="Nivel Máximo Alcanzado":r&&!i.isLeveled?s="Ya comprado / Activo":!m&&!g&&(s="No disponible"),this._itemStatusText=s,this._buyButtonIcon=g||r&&!i.isLeveled?"✔️":"💰",console.log(`%c[ShopTooltip DEBUG internalState] FIN Calculado: Nivel Txt='${this._itemLevelText}', Costo Txt='${this._itemCostText}', Btn Func Disabled=${this._isBuyButtonDisabled}, Btn Visual State='${this._buyButtonState}'`,"color: purple;")}}_calculateItemCost(h,e){const a=h.cost;let o=a.base;if(h.isLeveled){const i=h.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?o=a.base*Math.pow(a.multiplier,t):o=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;o=a.base+a.perLevel*i}return Math.round(o)}_formatEffectText(h,e){var o,i,t;let a=h.effectTemplate;if(a=a.replace("{lives}",e.lives.toString()),a.includes("{isActive}")){const n=(o=h.isPurchasedCheck)==null?void 0:o.valueRef,c=n?!!e[n]:!1;a=a.replace("{isActive}",c?"(Activo)":"")}if(a.includes("{isUnlocked}")){const n=(i=h.isPurchasedCheck)==null?void 0:i.valueRef,c=n?!!e[n]:!1;a=a.replace("{isUnlocked}",c?"(Desbloqueado)":"")}if(a.includes("{charges}")){const n=(t=h.isPurchasedCheck)==null?void 0:t.valueRef,c=n?e[n]??0:0;a=a.replace("{charges}",c>0?`(Cargas: ${c})`:"")}if(a.includes("{currentValue}")){let n="?";h.id==="comboMultiplier"?n=e.getCurrentComboMultiplier().toFixed(1):h.id==="inkCostReduction"?n=e.getCurrentInkCostPerPixel().toFixed(2):h.id==="extraCat"?n=e.getCatsPerCorrectAnswer():h.id==="maxCats"?n=e.getMaxCatsAllowed():h.id==="maxCatSize"?n=e.getCurrentMaxSizeLimit():h.id==="refillCatFood"&&(n=e.currentCatFood),a=a.replace("{currentValue}",n.toString())}return a}_checkItemIsPurchased(h,e){if(!h.isPurchasedCheck)return!1;const a=h.isPurchasedCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(h,e){if(!h.purchaseCheck)return!0;const a=h.purchaseCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(h,e){return!h.isLeveled||!h.levelRef?-1:e[h.levelRef]??0}_handleBuyClick(h){h.stopPropagation(),h.type==="touchstart"&&h.preventDefault(),!(this._isBuyButtonDisabled||this._isEmpty||!this.itemData)&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:this.itemData.id},bubbles:!0,composed:!0}))}render(){const h=$`<span class="tooltip-item-level" part="level">${this._itemLevelText}</span>`,e=$`<span class="tooltip-item-cost" part="cost">${this._itemCostText}</span>`,a=$`<span class="tooltip-item-status" part="status">${this._itemStatusText}</span>`,o={"tooltip-buy-btn":!0,affordable:this._buyButtonState==="affordable",unaffordable:this._buyButtonState==="unaffordable","disabled-state":this._buyButtonState==="disabled","empty-state":this._buyButtonState==="empty"};return $`
      <div part="content-area">
        <span class="tooltip-item-name" part="name">${this._itemName}</span>
        ${this._itemLevelText?h:N}
        <span class="tooltip-item-effect" part="effect">${this._itemEffectText}</span>
        ${this._itemCostText?e:N}
        ${this._itemStatusText?a:N}
      </div>
      <button
        class=${_t(o)} /* Aplicar clases dinámicas */
        part="buy-button"
        ?disabled=${this._isBuyButtonDisabled||this._isEmpty} /* Controla si se puede hacer clic */
        @click=${this._handleBuyClick}
        @touchstart=${this._handleBuyClick}
        aria-label="Comprar ${this._itemName||"ítem"}"
      >
        ${this._buyButtonIcon}
      </button>
    `}};J.styles=Q`
    :host {
      /* ... (Estilos :host y estado [empty] sin cambios) ... */
      display: block; position: relative;
      background-color: var(--gq-shop-tooltip-bg, rgba(31, 41, 55, 0.98));
      border: var(--gq-shop-tooltip-border, 1px solid #6b7280);
      border-radius: var(--gq-shop-tooltip-border-radius, 0.85rem);
      color: var(--gq-shop-tooltip-text-color, #d1d5db);
      font-family: var(--gq-shop-tooltip-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-shop-tooltip-font-size, 0.60rem);
      text-align: left;
      box-shadow: var(--gq-shop-tooltip-box-shadow, 0 -0.3125rem 0.625rem rgba(0,0,0,0.2));
      box-sizing: border-box;
      padding: var(--gq-shop-tooltip-padding-y, 0.6rem) var(--gq-shop-tooltip-padding-x, 0.8rem);
      padding-right: calc(var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem) + var(--gq-shop-tooltip-padding-x, 1rem));
      pointer-events: auto;
      min-height: 8rem;

    }
    :host([empty]) .tooltip-item-name { /* ... */ color: var(--gq-shop-tooltip-empty-name-color, var(--gq-shop-tooltip-name-text-color, #ababab)); font-style: italic; }
    :host([empty]) .tooltip-item-effect { /* ... */ color: var(--gq-shop-tooltip-empty-effect-color, var(--gq-shop-tooltip-text-color, #9ca3af)); font-style: italic; text-align: center; margin-top: 0.5rem; }
    :host([empty]) .tooltip-item-level, :host([empty]) .tooltip-item-cost, :host([empty]) .tooltip-item-status { display: none; }
    :host([empty]) .tooltip-buy-btn { opacity: 0.3; cursor: default; pointer-events: none; }

    /* Estilos internos (name, level, effect, cost, status - sin cambios) */
    .tooltip-item-name { /* ... */ font-size: var(--gq-shop-tooltip-name-font-size, 0.9rem); font-weight: var(--gq-shop-tooltip-name-font-weight, 600); color: var(--gq-shop-tooltip-name-text-color, #f9fafb); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level { /* ... */ font-size: var(--gq-shop-tooltip-level-font-size, 0.7rem); font-weight: var(--gq-shop-tooltip-level-font-weight, 700); color: var(--gq-shop-tooltip-level-text-color, #6ee7b7); margin-bottom: 0.15rem; display: block; }
    .tooltip-item-level[hidden] { display: none; }
    .tooltip-item-effect { /* ... */ font-size: var(--gq-shop-tooltip-effect-font-size, 0.7rem); margin-bottom: 0.3rem; display: block; line-height: 1.3; }
    .tooltip-item-cost { /* ... */ font-size: var(--gq-shop-tooltip-cost-font-size, 0.8rem); font-weight: var(--gq-shop-tooltip-cost-font-weight, 600); color: var(--gq-shop-tooltip-cost-text-color, #facc15); display: block; }
    .tooltip-item-status { /* ... */ font-size: var(--gq-shop-tooltip-status-font-size, 0.75rem); font-style: italic; color: var(--gq-shop-tooltip-status-text-color, #fca5a5); margin-top: 0.3rem; display: block; }
    .tooltip-item-status[hidden] { display: none; }

    /* --- Estilos Botón de Compra MODIFICADOS --- */
    .tooltip-buy-btn {
      /* Estilos base (posición, tamaño, fuente, etc. - sin cambios) */
      position: absolute; top: 0; right: 0; bottom: 0;
      min-width: var(--gq-shop-tooltip-buy-btn-min-width, 5.5rem);
      width: auto; height: 100%;
      margin: 0; transform: none; display: flex;
      justify-content: center; align-items: center;
      border: none;
      border-left: var(--gq-shop-tooltip-buy-btn-border-left, 1px solid rgba(107, 114, 128, 0.7));
      border-radius: 0 var(--gq-shop-tooltip-border-radius, 0.85rem) var(--gq-shop-tooltip-border-radius, 0.85rem) 0;
      box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2));
      cursor: pointer;
      transition: background-color 0.2s ease, color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
      font-size: var(--gq-shop-tooltip-buy-btn-icon-size, 3.4rem);
      font-weight: bold; line-height: 1;
      -webkit-tap-highlight-color: transparent;
      z-index: 1; opacity: 1;
      appearance: none; -webkit-appearance: none;

      /* Color de fondo y de icono por defecto (cuando no aplica ninguno de los estados) */
      background-color: var(--gq-shop-tooltip-buy-btn-bg, #4b5563);
      color: var(--gq-shop-tooltip-buy-btn-icon-color, #facc15);
    }

    /* Estado: Comprable (Affordable) */
    .tooltip-buy-btn.affordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-affordable, #10B981);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF);
      cursor: pointer; /* Asegurar cursor pointer */
    }
    .tooltip-buy-btn.affordable:hover {
      background-color: var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669);
      /* color: var(--gq-shop-tooltip-buy-btn-hover-icon-color-affordable, var(--gq-shop-tooltip-buy-btn-icon-color-affordable, #FFFFFF)); */
      box-shadow: var(--gq-shop-tooltip-buy-btn-hover-box-shadow, inset 1px 0 3px rgba(0,0,0,0.3));
    }
    .tooltip-buy-btn.affordable:active {
      background-color: var(--gq-shop-tooltip-buy-btn-active-bg, var(--gq-shop-tooltip-buy-btn-hover-bg-affordable, #059669)); /* Reutilizar hover o definir active específico */
      box-shadow: var(--gq-shop-tooltip-buy-btn-active-box-shadow, inset 1px 0 2px rgba(0,0,0,0.3));
    }

    /* Estado: No Comprable por Puntos (Unaffordable) */
    .tooltip-buy-btn.unaffordable {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444);
      color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
      cursor: not-allowed; /* Cursor indica no comprable */
      opacity: 0.8; /* Ligeramente más tenue que affordable */
    }
    /* Evitar cambios de hover/active si no es comprable */
    .tooltip-buy-btn.unaffordable:hover,
    .tooltip-buy-btn.unaffordable:active {
        background-color: var(--gq-shop-tooltip-buy-btn-bg-unaffordable, #EF4444); /* Mantiene color rojo */
        color: var(--gq-shop-tooltip-buy-btn-icon-color-unaffordable, #FFFFFF);
        box-shadow: var(--gq-shop-tooltip-buy-btn-box-shadow, inset 1px 0 2px rgba(0,0,0,0.2)); /* Sombra base */
        transform: none; /* Sin efecto de escala/movimiento */
    }


    /* Estado: Deshabilitado por otras razones (MaxLevel, Purchased, ReqNotMet) */
    /* Usamos la clase 'disabled-state' para el estilo visual, */
    /* mientras que el atributo 'disabled' maneja la funcionalidad */
    .tooltip-buy-btn.disabled-state {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      cursor: not-allowed;
      opacity: 0.6; /* Opacidad de deshabilitado */
      box-shadow: none;
      border-left-color: var(--gq-shop-tooltip-buy-btn-disabled-border-left, rgba(75, 85, 99, 0.5));
    }
    .tooltip-buy-btn.disabled-state:hover,
    .tooltip-buy-btn.disabled-state:active {
      background-color: var(--gq-shop-tooltip-buy-btn-bg-disabled, rgba(55, 65, 81, 0.6));
      color: var(--gq-shop-tooltip-buy-btn-disabled-icon-color, #6b7280);
      transform: none;
      box-shadow: none;
    }
    /* --- FIN Estilos Botón de Compra MODIFICADOS --- */
  `;ie([L({type:Object})],J.prototype,"itemData",2);ie([L({type:Object})],J.prototype,"playerDataSnapshot",2);ie([R()],J.prototype,"_itemName",2);ie([R()],J.prototype,"_itemLevelText",2);ie([R()],J.prototype,"_itemEffectText",2);ie([R()],J.prototype,"_itemCostText",2);ie([R()],J.prototype,"_itemStatusText",2);ie([R()],J.prototype,"_isBuyButtonDisabled",2);ie([R()],J.prototype,"_buyButtonIcon",2);ie([R()],J.prototype,"_isEmpty",2);ie([R()],J.prototype,"_buyButtonState",2);J=ie([V("shop-tooltip")],J);var Vi=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,ue=(h,e,a,o)=>{for(var i=o>1?void 0:o?Gi(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Vi(e,a,i),i};const Hi=["consumable","unlockable","upgradeable","general"],Wi={consumable:"Consumibles",unlockable:"Desbloqueables",upgradeable:"Mejorables",general:"General"};let ae=class extends B{constructor(){super(...arguments),this.items=[],this.playerDataSnapshot=null,this.isVisible=!1,this.updateTrigger=0,this._selectedItemId=null,this._itemsByCategory={},this._selectedItemData=null}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}updated(h){super.updated(h);let e=!1;if(console.log("%c[ShopPopup DEBUG] updated()","color: blue; font-weight: bold;","Cambios:",Array.from(h.keys())),h.has("playerDataSnapshot")){const a=h.get("playerDataSnapshot"),o=this.playerDataSnapshot,i=(a==null?void 0:a.comboMultiplierLevel)??"N/A",t=(o==null?void 0:o.comboMultiplierLevel)??"N/A";console.log(`%c[ShopPopup DEBUG]   > playerDataSnapshot cambió. Nivel Combo Anterior: ${i}, Nuevo: ${t}`,"color: blue;"),e=!0}h.has("updateTrigger")&&(console.log(`%c[ShopPopup DEBUG]   > updateTrigger cambió a: ${this.updateTrigger}`,"color: blue;"),e=!0),h.has("isVisible")&&console.log(`%c[ShopPopup DEBUG]   > isVisible cambió a: ${this.isVisible}`,"color: blue;"),h.has("items")&&(console.log("%c[ShopPopup DEBUG]   > items cambió.","color: blue;"),this._groupItemsByCategory(),e=!0),h.has("_selectedItemId")&&(console.log(`%c[ShopPopup DEBUG]   > _selectedItemId cambió a: ${this._selectedItemId}`,"color: blue;"),this._updateTooltipData(),e=!0),e&&this._tooltipElement&&typeof this._tooltipElement.forceRefresh=="function"&&(console.log("%c[ShopPopup DEBUG]   Forzando refresh del tooltip...","color: blue;"),this._tooltipElement.forceRefresh())}_groupItemsByCategory(){const h={};this.items.forEach(e=>{const a=e.category||"general";h[a]||(h[a]=[]),h[a].push(e)});for(const e in h)h[e].sort((a,o)=>a.name.localeCompare(o.name));this._itemsByCategory=h}_updateTooltipData(){this._selectedItemData=this._selectedItemId?this.items.find(h=>h.id===this._selectedItemId)??null:null}_handleItemSelection(h){var a;const e=(a=h.detail)==null?void 0:a.itemId;console.log(`[ShopPopup DEBUG] _handleItemSelection: Ítem seleccionado/deseleccionado: ${e}`),this._selectedItemId===e?this._selectedItemId=null:this._selectedItemId=e}_handleBuyRequest(h){var a;const e=(a=h.detail)==null?void 0:a.itemId;console.log(`[ShopPopup DEBUG] _handleBuyRequest: Recibido buy request para: ${e}`),e&&this.dispatchEvent(new CustomEvent("buy-item-requested",{detail:{itemId:e},bubbles:!0,composed:!0}))}_handleCloseClick(){console.log("[ShopPopup DEBUG] Botón X clickeado, emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0}))}_handleHostClick(h){h.target===this&&(console.log("[ShopPopup DEBUG] Clic en host (fondo), emitiendo close-requested."),this.dispatchEvent(new CustomEvent("close-requested",{bubbles:!0,composed:!0})))}render(){var h;return console.log(`%c[ShopPopup DEBUG] render() ejecutado. Item seleccionado: ${this._selectedItemId}`,"color: green;"),$`
      <div class="shop-content-box">
        <button class="shop-close-btn" @click=${this._handleCloseClick} title="Cerrar Tienda (Esc)">&times;</button>
        <h2 class="shop-title-text">Tienda de Mejoras</h2>
        <p class="shop-score-text">Puntos: ${((h=this.playerDataSnapshot)==null?void 0:h.score)??0}</p>

        <div class="shop-items-container">
          ${Hi.map(e=>this._itemsByCategory[e]?$`
            <h3 class="shop-section-title">${Wi[e]||e}</h3>
            <div class="shop-section-items">
              ${this._itemsByCategory[e].map(a=>{const o=this.playerDataSnapshot?this._checkItemIsPurchased(a,this.playerDataSnapshot):!1,i=this.playerDataSnapshot?this._checkItemCanPurchase(a,this.playerDataSnapshot):!0,t=this.playerDataSnapshot?this._getItemLevel(a,this.playerDataSnapshot):-1,n=a.isLeveled&&typeof a.maxLevel=="number"&&t>=a.maxLevel,c=n||o&&!a.isLeveled||!i;return $`
                  <shop-item-card
                    .itemId=${a.id}
                    .icon=${a.icon||"❓"}
                    ?isDisabled=${c} /* Usar la nueva variable */
                    ?isPurchased=${o&&!a.isLeveled} /* Solo para estilo visual */
                    ?isMaxLevel=${n} /* Solo para estilo visual */
                    ?isSelected=${this._selectedItemId===a.id}
                    @item-selected=${this._handleItemSelection}
                  ></shop-item-card>
                `})}
            </div>
          `:N)}
        </div>

        <shop-tooltip
          .itemData=${this._selectedItemData}
          .playerDataSnapshot=${this.playerDataSnapshot} /* Pasa el snapshot */
          @buy-item-requested=${this._handleBuyRequest}
          id="internal-tooltip"
        ></shop-tooltip>
      </div>
    `}_calculateItemCost(h,e){const a=h.cost;let o=a.base;if(h.isLeveled){const i=h.levelRef,t=i?e[i]??0:0;a.type==="exponential"&&typeof a.multiplier=="number"?o=a.base*Math.pow(a.multiplier,t):o=a.base+(a.perLevel??0)*t}else if(a.levelRef&&typeof a.perLevel=="number"){const i=e[a.levelRef]??0;o=a.base+a.perLevel*i}return Math.round(o)}_checkItemIsPurchased(h,e){if(!h.isPurchasedCheck)return!1;const a=h.isPurchasedCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"isTrue":return i===!0;case"isFalse":return i===!1;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;default:return!1}}_checkItemCanPurchase(h,e){if(!h.purchaseCheck)return!0;const a=h.purchaseCheck,o=a.valueRef,i=e[o];if(typeof i>"u")return!1;switch(a.condition){case"lessThan":return typeof i=="number"&&typeof a.limit=="number"&&i<a.limit;case"lessThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i<=a.limit;case"isFalse":return i===!1;case"isTrue":return i===!0;case"greaterThan":return typeof i=="number"&&typeof a.limit=="number"&&i>a.limit;case"greaterThanOrEqual":return typeof i=="number"&&typeof a.limit=="number"&&i>=a.limit;default:return!1}}_getItemLevel(h,e){return!h.isLeveled||!h.levelRef?-1:e[h.levelRef]??0}};ae.styles=Q`
    :host {
      /* El :host es el overlay que ocupa toda la pantalla */
      display: none;
      opacity: 0;
      visibility: hidden;
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      justify-content: center; /* Centra .shop-content-box horizontalmente */
      align-items: center; /* Centra .shop-content-box verticalmente */
      text-align: center;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ajuste en transition */
      z-index: 101; /* Debe estar por encima del backdrop */
      padding: 1rem; /* Espacio para que el contenido no toque los bordes */
      box-sizing: border-box;
      pointer-events: none; /* Por defecto, no intercepta clics */
      overflow-y: auto; /* Permite scroll si el contenido es muy alto */
      font-family: var(--gq-shop-popup-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* El backdrop se maneja globalmente por GameManager/UIManager */
    }

    :host([visible]) {
      display: flex; /* Cambiado a flex para que align-items y justify-content funcionen */
      opacity: 1;
      visibility: visible;
      pointer-events: auto; /* Cuando está visible, el :host puede interceptar clics */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Ajuste en transition */
    }

    .shop-content-box {
      /* Estilos del contenido de la tienda */
      background-color: var(--gq-shop-popup-bg, rgba(17, 24, 39, 0.97));
      border-radius: var(--gq-shop-popup-border-radius, 1rem);
      border: var(--gq-shop-popup-border, 1px solid #4b5563);
      box-shadow: var(--gq-shop-popup-box-shadow, 0 0.625rem 1.875rem rgba(0, 0, 0, 0.6));
      width: 90%;
      max-width: var(--gq-shop-popup-max-width, 30.125rem);
      position: relative; /* Para el botón de cierre absoluto */
      color: var(--gq-shop-popup-text-color, #e5e7eb);
      max-height: 85vh; /* Limitar altura máxima */
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      overflow: hidden; /* El scroll interno lo maneja .shop-items-container */
      margin: auto; /* Asegura centrado si el host es flex */
      pointer-events: auto; /* Asegurar que el contenido también reciba eventos */
    }
    .shop-close-btn {
      position: absolute;
      top: var(--gq-shop-popup-close-btn-top, 0.25rem);
      right: var(--gq-shop-popup-close-btn-right, 0.5rem);
      background: none; border: none;
      color: var(--gq-shop-popup-close-btn-text-color, #9ca3af);
      font-size: var(--gq-shop-popup-close-btn-font-size, 2rem);
      line-height: 1; cursor: pointer;
      transition: color 0.2s ease, transform 0.1s ease;
      padding: 0.25rem; z-index: 10;
      -webkit-tap-highlight-color: transparent;
    }
    .shop-close-btn:hover {
      color: var(--gq-shop-popup-close-btn-hover-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
      transform: scale(1.1);
    }
    .shop-close-btn:active { transform: scale(0.95); }

    .shop-title-text, .shop-score-text, .shop-section-title {
      text-align: center; flex-shrink: 0;
      padding-left: 1rem; padding-right: 1rem; box-sizing: border-box;
    }
    .shop-title-text {
      font-family: var(--gq-shop-popup-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-shop-popup-title-font-weight, 700);
      margin-top: 0.8rem;
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-title-text-color, var(--gq-shop-popup-text-color, #e5e7eb));
    }
    .shop-score-text {
      font-family: var(--gq-shop-popup-score-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-score-font-size, 0.9rem);
      font-weight: var(--gq-shop-popup-score-font-weight, 600);
      margin-bottom: 0.4rem;
      color: var(--gq-shop-popup-score-text-color, #a5b4fc);
    }
    .shop-items-container {
      overflow-y: auto; flex-grow: 1; display: flex; flex-direction: column;
      gap: 0.4rem; padding: 0 0.5rem 0.5rem 0.5rem; box-sizing: border-box;
      margin-bottom: 0; scrollbar-width: none; -ms-overflow-style: none;
    }
    .shop-items-container::-webkit-scrollbar { display: none; }
    .shop-section-title {
      font-family: var(--gq-shop-popup-section-title-font-family, var(--gq-shop-popup-font-family));
      font-size: var(--gq-shop-popup-section-title-font-size, 1rem);
      font-weight: var(--gq-shop-popup-section-title-font-weight, 600);
      color: var(--gq-shop-popup-section-title-color, #9ca3af);
      text-transform: uppercase;
      letter-spacing: 0.05em; margin-top: 0.5rem; margin-bottom: calc(0.4rem * 1.5);
      padding-bottom: 0.25rem;
      border-bottom: var(--gq-shop-popup-section-title-border-bottom, 1px solid #4b5563);
      padding-left: 0.5rem; padding-right: 0.5rem;
    }
    .shop-section-title:first-of-type { margin-top: 0; }
    .shop-section-items {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(4.5rem, 1fr));
      gap: 0.5rem; align-items: center; justify-items: center; padding: 0 0.3rem;
    }
    shop-tooltip {
      margin: var(--gq-shop-popup-tooltip-margin, 0.5rem);
      flex-shrink: 0;
    }
    @media (max-width: 768px) { /* Ajustado para tablets y móviles */
       :host { padding: 2vh 0.5rem; align-items: center; /* Mantener centrado vertical */ }
       .shop-content-box { max-height: 90vh; }
       .shop-section-items { grid-template-columns: repeat(auto-fill, minmax(4rem, 1fr)); gap: 0.4rem; }
       shop-tooltip { margin: var(--gq-shop-popup-tooltip-tablet-margin, var(--gq-shop-popup-tooltip-margin, 0.4rem)); }
    }
  `;ue([L({type:Array})],ae.prototype,"items",2);ue([L({type:Object})],ae.prototype,"playerDataSnapshot",2);ue([L({type:Boolean,reflect:!0,attribute:"visible"})],ae.prototype,"isVisible",2);ue([L({type:Number})],ae.prototype,"updateTrigger",2);ue([R()],ae.prototype,"_selectedItemId",2);ue([R()],ae.prototype,"_itemsByCategory",2);ue([R()],ae.prototype,"_selectedItemData",2);ue([j(".shop-content-box")],ae.prototype,"_shopContentBox",2);ue([j("shop-tooltip")],ae.prototype,"_tooltipElement",2);ae=ue([V("shop-popup")],ae);const ji="shop-popup";class Ki{constructor(e,a){this.items=new Map,this.shopPopupElement=null,this.buyRequestListener=o=>this.handleBuyRequest(o),this.closeRequestListener=()=>{this.gameManager.handleShopCloseRequest()},this.handleBuyRequest=o=>{var n;const t=(n=o.detail)==null?void 0:n.itemId;console.log(`[ShopManager handleBuyRequest] Solicitud de compra recibida para item ID: ${t}`),t?this.executePurchaseAction(t):console.warn("ShopManager: Evento 'buy-item-requested' capturado sin itemId.")},this.playerData=e,this.gameManager=a,console.log("[ShopManager CONSTRUCTOR] Instanciado.")}init(e){if(console.log("[ShopManager INIT] Iniciando ShopManager..."),this.items.clear(),!Array.isArray(e)){console.error("ShopManager: Datos de ítems de tienda inválidos.");return}e.forEach(a=>{a!=null&&a.id&&typeof a.id=="string"?this.items.set(a.id,a):console.warn("ShopManager: Ítem inválido o sin ID.",a)}),console.log(`[ShopManager INIT] ${this.items.size} ítems cargados.`)}getShopPopupElement(){return(!this.shopPopupElement||!document.body.contains(this.shopPopupElement))&&(this.shopPopupElement=document.getElementById(ji),this.shopPopupElement?(this.shopPopupElement.removeEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.removeEventListener("buy-item-requested",this.buyRequestListener),this.shopPopupElement.addEventListener("close-requested",this.closeRequestListener),this.shopPopupElement.addEventListener("buy-item-requested",this.buyRequestListener)):console.error("ShopManager CRITICAL: Componente <shop-popup> con ID 'shop-popup' NO encontrado en el DOM.")),this.shopPopupElement}isShopOpen(){const e=this.getShopPopupElement();return(e==null?void 0:e.isVisible)||!1}openShop(){console.log("[ShopManager openShop] Solicitud para abrir tienda.");const e=this.getShopPopupElement();if(!e){console.error("ShopManager: No se pudo abrir la tienda, el elemento popup no existe.");return}console.log("[ShopManager openShop] Elemento popup obtenido.");try{e.items=Array.from(this.items.values()),e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,e.isVisible=!0,console.log(`[ShopManager openShop] Tienda configurada y visible. Trigger: ${e.updateTrigger}`),this.gameManager.updateBackdropAndFadeState()}catch(a){console.error("[ShopManager] Error estableciendo props o visibilidad en <shop-popup>:",a),e&&(e.isVisible=!1),this.gameManager.updateBackdropAndFadeState()}}closeShop(){console.log("[ShopManager closeShop] Solicitud para cerrar tienda.");const e=this.getShopPopupElement();if(!e||!e.isVisible){console.log("[ShopManager closeShop] Tienda ya cerrada o popup no existe.");return}e.isVisible=!1,console.log("[ShopManager closeShop] Tienda marcada como no visible."),this.gameManager.updateBackdropAndFadeState()}updateShopUI(){if(!this.playerData){console.warn("[ShopManager] updateShopUI llamado sin playerData.");return}const e=this.getShopPopupElement();e&&e.isVisible&&(this.playerData.comboMultiplierLevel,e.playerDataSnapshot=this.playerData,e.updateTrigger=(e.updateTrigger||0)+1,queueMicrotask(()=>{var o;const a=(o=e.shadowRoot)==null?void 0:o.querySelector("shop-tooltip");a&&typeof a.forceRefresh=="function"?a.forceRefresh():a?a.requestUpdate():e.requestUpdate()}))}executePurchaseAction(e){const a=this.items.get(e);if(!a)return console.error(`ShopManager: Ítem con ID '${e}' no encontrado.`),!1;const o=a.levelRef,i=o?this.playerData[o]:"N/A";console.log(`[ShopManager EXEC_PURCHASE] === INICIO COMPRA ===
  Item: '${e}' (${a.name})
  Nivel ANTES: ${i}
  Puntos ANTES: ${this.playerData.score}`);const t=this._calculateItemCost(a,this.playerData),n=this.playerData.score>=t,c=this._checkItemCanPurchase(a,this.playerData),r=this._getItemLevel(a,this.playerData),m=a.isLeveled&&typeof a.maxLevel=="number"&&r>=a.maxLevel,l=this._checkItemIsPurchased(a,this.playerData)&&!a.isLeveled;if(console.log(`[ShopManager EXEC_PURCHASE] Chequeos Pre-Compra:
    Costo: ${t}, Puntos: ${this.playerData.score}, Puede Pagar: ${n}
    Pasa Requisitos: ${c}
    Es Max Nivel: ${m}
    Ya Comprado (no mejorable): ${l}`),m||l||!c||!n)return console.warn(`[ShopManager EXEC_PURCHASE] Compra RECHAZADA para '${e}'.`),this.updateShopUI(),this.gameManager.getAudioManager().playSound("incorrect"),!1;this.playerData.score-=t,this.gameManager.updateExternalScoreUI(),console.log(`[ShopManager EXEC_PURCHASE] Costo ${t} deducido. Puntos restantes: ${this.playerData.score}`);let g=!1;const p=a.actionId;console.log(`[ShopManager EXEC_PURCHASE] Ejecutando ActionID: '${p}' para item '${e}'`);try{switch(p){case"purchaseLife":g=this.purchaseLifeAction();break;case"purchaseShield":g=this.purchaseShieldAction();break;case"purchaseHint":g=this.purchaseHintAction();break;case"purchaseUnlockDrawing":g=this.purchaseUnlockDrawingAction();break;case"purchaseUnlockCatFood":g=this.purchaseUnlockCatFoodAction();break;case"purchaseRefillCatFood":g=this.purchaseRefillCatFoodAction();break;case"purchaseComboMultiplier":g=this.purchaseComboMultiplierAction();break;case"purchaseInkCostReduction":g=this.purchaseInkCostReductionAction();break;case"purchaseExtraCatSpawn":g=this.purchaseExtraCatSpawnAction();break;case"purchaseMaxCatsIncrease":g=this.purchaseMaxCatsIncreaseAction();break;case"purchaseMaxCatSize":g=this.purchaseMaxCatSizeAction();break;default:console.error(`ShopManager: Acción desconocida: ${p}`),g=!1}const s=o&&g?this.playerData[o]:o?this.playerData[o]:"N/A";console.log(`[ShopManager EXEC_PURCHASE] Acción '${p}' ejecutada. Resultado Éxito: ${g}. Nivel DESPUÉS: ${s}`)}catch(s){console.error(`ShopManager: Error CRÍTICO ejecutando acción ${p}:`,s),g=!1}return g?(console.log(`[ShopManager EXEC_PURCHASE] Compra EXITOSA de '${e}'.`),this.gameManager.getAudioManager().playSound("purchase")):(this.playerData.score+=t,this.gameManager.updateExternalScoreUI(),console.warn(`[ShopManager EXEC_PURCHASE] Acción '${p}' falló o no aplicó. Costo ${t} REVERTIDO. Puntos ahora: ${this.playerData.score}`),this.gameManager.getAudioManager().playSound("incorrect")),console.log(`[ShopManager EXEC_PURCHASE] === FIN COMPRA === Item '${e}'. Llamando a updateShopUI.`),this.updateShopUI(),g}purchaseLifeAction(){return this.playerData.lives++,this.gameManager.updateExternalLivesUI(),!0}purchaseShieldAction(){return this.playerData.hasShield?!1:(this.playerData.hasShield=!0,this.gameManager.updateExternalShieldUI(!0),!0)}purchaseHintAction(){return this.playerData.hintCharges++,this.gameManager.updateExternalHintUI(this.playerData.hintCharges),!0}purchaseUnlockDrawingAction(){if(console.log("[ShopManager purchaseUnlockDrawingAction] Iniciando acción."),this.playerData.isDrawingUnlocked)return console.log("[ShopManager purchaseUnlockDrawingAction] Dibujo ya desbloqueado, retornando false."),!1;this.playerData.isDrawingUnlocked=!0,console.log(`[ShopManager purchaseUnlockDrawingAction] PlayerData.isDrawingUnlocked establecido a: ${this.playerData.isDrawingUnlocked}`);let e=!1;try{console.log("[ShopManager purchaseUnlockDrawingAction] Llamando a gameManager.enableDrawingFeature()."),e=this.gameManager.enableDrawingFeature(),console.log(`[ShopManager purchaseUnlockDrawingAction] gameManager.enableDrawingFeature() devolvió: ${e}`)}catch(a){console.error("[ShopManager purchaseUnlockDrawingAction] Error capturado llamando a gameManager.enableDrawingFeature():",a),e=!1}return e?(console.log("[ShopManager purchaseUnlockDrawingAction] Activación exitosa, retornando true."),!0):(console.warn("[ShopManager purchaseUnlockDrawingAction] Activación NO exitosa. Revirtiendo isDrawingUnlocked."),this.playerData.isDrawingUnlocked=!1,console.log(`[ShopManager purchaseUnlockDrawingAction] PlayerData.isDrawingUnlocked REVERTIDO a: ${this.playerData.isDrawingUnlocked}`),!1)}purchaseComboMultiplierAction(){return this.playerData.comboMultiplierLevel++,!0}purchaseInkCostReductionAction(){return this.playerData.inkCostReductionLevel++,this.gameManager.updateInkUI(),!0}purchaseExtraCatSpawnAction(){return this.playerData.extraCatSpawnLevel++,!0}purchaseMaxCatsIncreaseAction(){return this.playerData.maxCatsLevel++,!0}purchaseMaxCatSizeAction(){return this.playerData.maxCatSizeLevel++,!0}purchaseUnlockCatFoodAction(){if(console.log("[ShopManager purchaseUnlockCatFoodAction] Iniciando acción."),this.playerData.isCatFoodUnlocked)return console.log("[ShopManager purchaseUnlockCatFoodAction] Comida ya desbloqueada, retornando false."),!1;this.playerData.isCatFoodUnlocked=!0,console.log(`[ShopManager purchaseUnlockCatFoodAction] PlayerData.isCatFoodUnlocked establecido a: ${this.playerData.isCatFoodUnlocked}`),this.playerData.refillCatFood(),console.log("[ShopManager purchaseUnlockCatFoodAction] Comida rellenada.");try{console.log("[ShopManager purchaseUnlockCatFoodAction] Llamando a gameManager.enableCatFoodFeature()."),this.gameManager.enableCatFoodFeature(),console.log("[ShopManager purchaseUnlockCatFoodAction] gameManager.enableCatFoodFeature() llamado.")}catch(e){console.error("[ShopManager purchaseUnlockCatFoodAction] Error capturado llamando a gameManager.enableCatFoodFeature():",e)}return console.log("[ShopManager purchaseUnlockCatFoodAction] Retornando true."),!0}purchaseRefillCatFoodAction(){return this.playerData.currentCatFood>=this.playerData.getMaxCatFood()?!1:(this.playerData.refillCatFood(),this.gameManager.updateCatFoodUI(),!0)}_calculateItemCost(e,a){const o=e.cost;let i=o.base;if(e.isLeveled){const t=e.levelRef,n=t?a[t]??0:0;o.type==="exponential"&&typeof o.multiplier=="number"?i=o.base*Math.pow(o.multiplier,n):i=o.base+(o.perLevel??0)*n}else if(o.levelRef&&typeof o.perLevel=="number"){const t=a[o.levelRef]??0;i=o.base+o.perLevel*t}return Math.round(i)}_checkItemIsPurchased(e,a){if(!e.isPurchasedCheck)return!1;const o=e.isPurchasedCheck,i=o.valueRef,t=a[i];if(typeof t>"u")return!1;switch(o.condition){case"isTrue":return t===!0;case"isFalse":return t===!1;case"greaterThan":return typeof t=="number"&&typeof o.limit=="number"&&t>o.limit;default:return!1}}_checkItemCanPurchase(e,a){if(!e.purchaseCheck)return!0;const o=e.purchaseCheck,i=o.valueRef,t=a[i];if(typeof t>"u")return!1;switch(o.condition){case"lessThan":return typeof t=="number"&&typeof o.limit=="number"&&t<o.limit;case"lessThanOrEqual":return typeof t=="number"&&typeof o.limit=="number"&&t<=o.limit;case"isFalse":return t===!1;case"isTrue":return t===!0;case"greaterThan":return typeof t=="number"&&typeof o.limit=="number"&&t>o.limit;case"greaterThanOrEqual":return typeof t=="number"&&typeof o.limit=="number"&&t>=o.limit;default:return!1}}_getItemLevel(e,a){return!e.isLeveled||!e.levelRef?-1:a[e.levelRef]??0}destroy(){const e=this.getShopPopupElement();e&&(e.removeEventListener("close-requested",this.closeRequestListener),e.removeEventListener("buy-item-requested",this.buyRequestListener)),this.items.clear(),this.shopPopupElement=null,console.log("[ShopManager DESTROY] Listeners removidos, ítems limpiados y elemento del popup desreferenciado.")}}class Yi{constructor(e){this.controlsContainer=null,this.drawingButtonsContainer=null,this.catFoodUiContainer=null,this.brushToolButton=null,this.clearInkToolButton=null,this.catFoodToolButton=null,this._lastToolToggleTime=0,this.TOOL_TOGGLE_DEBOUNCE_MS=300,this.gameManager=e,this.controlsContainer=document.getElementById("right-controls"),this.drawingButtonsContainer=document.getElementById("drawing-buttons-container"),this.catFoodUiContainer=document.getElementById("cat-food-ui-container"),this.brushToolButton=document.querySelector('tool-button[toolId="brush"]'),this.clearInkToolButton=document.querySelector('tool-button[toolId="clear-ink"]'),this.catFoodToolButton=document.querySelector('tool-button[toolId="cat-food"]'),this.setupToolButtonListeners(),console.log("ToolManager Creado.")}setManagers(e,a,o){this.inkManager=e,this.catFoodManager=a,this.playerData=o,console.log("ToolManager: Managers dependientes (Ink, CatFood, PlayerData) establecidos.")}setupToolButtonListeners(){var e,a,o;(e=this.brushToolButton)==null||e.addEventListener("tool-activated",()=>this.activateBrush()),(a=this.clearInkToolButton)==null||a.addEventListener("tool-activated",()=>{var i,t;(i=this.playerData)!=null&&i.isDrawingUnlocked&&((t=this.playerData)==null?void 0:t.inkSpentSinceLastClear)>0&&this.inkManager&&this.inkManager.clearInkLines()}),(o=this.catFoodToolButton)==null||o.addEventListener("tool-activated",()=>this.activateCatFood())}showToolControls(e){this.controlsContainer&&(this.controlsContainer.classList.toggle("hidden",!e),e&&this.updateControlVisibilityBasedOnUnlocks())}updateControlVisibilityBasedOnUnlocks(){if(!this.playerData)return;const e=this.playerData.isDrawingUnlocked,a=this.playerData.isCatFoodUnlocked;this.drawingButtonsContainer&&this.drawingButtonsContainer.classList.toggle("hidden",!e),this.catFoodUiContainer&&this.catFoodUiContainer.classList.toggle("hidden",!a),this.updateToolButtonActiveStates()}activateBrush(){const e=Date.now();if(!(e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS)){if(this._lastToolToggleTime=e,!this.playerData||!this.inkManager||!this.catFoodManager){console.warn("ToolManager: No se puede activar el pincel, faltan dependencias (PlayerData, InkManager o CatFoodManager).");return}this.playerData.isDrawingUnlocked&&(this.catFoodManager.isActive&&this.catFoodManager.toggleActive(!1),this.inkManager.toggleBrush(),this.updateToolButtonActiveStates(),this.gameManager.getAudioManager().playSound("ui_select"))}}activateCatFood(){const e=Date.now();if(!(e-this._lastToolToggleTime<this.TOOL_TOGGLE_DEBOUNCE_MS)){if(this._lastToolToggleTime=e,!this.playerData||!this.inkManager||!this.catFoodManager){console.warn("ToolManager: No se puede activar la comida, faltan dependencias (PlayerData, InkManager o CatFoodManager).");return}this.playerData.isCatFoodUnlocked&&(this.inkManager.isBrushActive&&this.inkManager.toggleBrush(!1),this.catFoodManager.toggleActive(),this.updateToolButtonActiveStates(),this.gameManager.getAudioManager().playSound("ui_select"))}}updateToolButtonActiveStates(){if(!this.playerData||!this.inkManager||!this.catFoodManager||!this.gameManager)return;const e=this.gameManager.getShopManager().isShopOpen()||this.gameManager.getGlobalUIManager().isOptionsMenuOpen(),a=this.gameManager.isGamePausedForOverlay(),o=e||a;if(this.brushToolButton&&(this.brushToolButton.active=this.inkManager.isBrushActive,this.brushToolButton.disabled=o||!this.playerData.isDrawingUnlocked||this.playerData.currentInk<=0&&!this.inkManager.isBrushActive),this.clearInkToolButton&&(this.clearInkToolButton.disabled=o||!this.playerData.isDrawingUnlocked||this.playerData.inkSpentSinceLastClear<=0),this.catFoodToolButton){this.catFoodToolButton.active=this.catFoodManager.isActive,this.catFoodToolButton.disabled=o||!this.playerData.isCatFoodUnlocked||this.playerData.currentCatFood<=0&&!this.catFoodManager.isActive;const i=this.playerData.getMaxCatFood()>0?Math.max(0,Math.min(100,this.playerData.currentCatFood/this.playerData.getMaxCatFood()*100)):0;this.catFoodToolButton.progressPercentage=i}}disableAllToolButtons(e){[this.brushToolButton,this.clearInkToolButton,this.catFoodToolButton].forEach(o=>{o&&(o.disabled=e)})}updateCatFoodUIToolButton(){if(this.catFoodToolButton&&this.playerData){const e=this.playerData.getMaxCatFood()>0?Math.max(0,Math.min(100,this.playerData.currentCatFood/this.playerData.getMaxCatFood()*100)):0;this.catFoodToolButton.progressPercentage=e}}}var Xi=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,Je=(h,e,a,o)=>{for(var i=o>1?void 0:o?Zi(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Xi(e,a,i),i};const rt={1:{name:"COMÚN",classSuffix:"1"},2:{name:"POCO COMÚN",classSuffix:"2"},3:{name:"RARA",classSuffix:"3"},4:{name:"ÉPICA",classSuffix:"4"},5:{name:"LEGENDARIA",classSuffix:"5"},easy:{name:"FÁCIL",classSuffix:"easy"},medium:{name:"MEDIO",classSuffix:"medium"},hard:{name:"DIFÍCIL",classSuffix:"hard"}};let Ae=class extends B{constructor(){super(...arguments),this.difficulty="1",this.questionText="Cargando pregunta...",this._difficultyName=rt[1].name,this._difficultyClassSuffix=rt[1].classSuffix}updated(h){super.updated(h),h.has("difficulty")&&this._updateDifficultyDisplayData()}_updateDifficultyDisplayData(){const h=rt[this.difficulty]||rt[1];this._difficultyName=h.name,this._difficultyClassSuffix=h.classSuffix}render(){const h=`difficulty-level-${this._difficultyClassSuffix}`;return $`
          <div class="question-box-internal">
            <div class="card__content">
              <span
                class="difficulty-label ${h}"
                part="difficulty"
              >
                Pregunta: ${this._difficultyName}
              </span>
              <p class="question-text" part="text">
                ${this.questionText}
              </p>
            </div>
          </div>
        `}};Ae.styles=Q`
        :host {
          display: block;
          width: 100%;
          margin-bottom: var(--gq-qbox-margin-bottom, 1.5rem);
          box-sizing: border-box;
        }
    
        .question-box-internal {
          width: 100%;
          min-height: var(--gq-qbox-min-height, 5em);
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: var(--gq-qbox-border-radius, 0.75rem);
          padding: var(--gq-qbox-padding, 1rem);
          gap: var(--gq-qbox-gap, 0.4rem);
          box-sizing: border-box;
          background-color: var(--gq-qbox-bg, rgba(17, 24, 39, 0.85));
          border: var(--gq-qbox-border, 1px solid rgba(75, 85, 99, 0.5));
          box-shadow: var(--gq-qbox-inset-shadow, inset 0 1px 2px rgba(0,0,0,0.2)),
                      0 0 var(--gq-element-glow-blur-radius, calc(var(--element-glow-intensity, 0) * 18px)) var(--gq-element-glow-spread-radius, calc(var(--element-glow-intensity, 0) * 4px)) var(--gq-element-glow-color, hsla(50, 100%, 60%, calc(var(--element-glow-intensity, 0) * 0.6)));
          transition: box-shadow 0.5s ease-out, background-color 0.3s ease, border 0.3s ease;
          overflow: visible; 
          position: relative; 
        }
        
        .card__content {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: inherit;
          position: relative; 
          z-index: 2; 
        }
    
        .difficulty-label {
          text-align: center;
          display: block;
          margin-left: auto;
          margin-right: auto;
          width: fit-content;
          font-family: var(--gq-qbox-diff-label-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-diff-label-font-size, 0.65rem);
          font-weight: var(--gq-qbox-diff-label-font-weight, 700);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: var(--gq-qbox-diff-label-padding, 0.1rem 0.4rem);
          border-radius: var(--gq-qbox-diff-label-border-radius, 0.25rem);
          line-height: 1.2;
          transition: color 0.3s ease, background-color 0.3s ease, text-shadow 0.3s ease;
          text-shadow: 0 0 var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent)), /* Usar variables globales o locales */
                       0 0 calc(var(--gq-difficulty-label-glow-blur, var(--difficulty-glow-blur, 0px)) * 1.5) var(--gq-difficulty-label-glow-color, var(--difficulty-glow-color, transparent));
          flex-shrink: 0;
          margin-bottom: var(--gq-qbox-diff-label-margin-bottom, 0.3rem);
          /* Considerar una animación de pulso si es necesario */
          /* animation: var(--gq-qbox-diff-label-animation, none); */
        }
    
        /* Animación de pulso (si un tema lo define mediante variables o si se activa por clase) */
        @keyframes difficultyPulse { /* Movida aquí */
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.9; }
        }
        /* .difficulty-label.pulse-animation { animation: difficultyPulse 1.2s infinite ease-in-out; } */
    
        .difficulty-level-1 { color: var(--gq-qbox-diff-1-text-color, #9ca3af); background-color: var(--gq-qbox-diff-1-bg-color, rgba(107, 114, 128, 0.2)); }
        .difficulty-level-2 { color: var(--gq-qbox-diff-2-text-color, #34d399); background-color: var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2)); }
        .difficulty-level-3 { color: var(--gq-qbox-diff-3-text-color, #60a5fa); background-color: var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2)); }
        .difficulty-level-4 { color: var(--gq-qbox-diff-4-text-color, #c4b5fd); background-color: var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2)); }
        .difficulty-level-5 { color: var(--gq-qbox-diff-5-text-color, #fbbf24); background-color: var(--gq-qbox-diff-5-bg-color, rgba(245, 158, 11, 0.2)); }
        .difficulty-level-easy { color: var(--gq-qbox-diff-easy-text-color, var(--gq-qbox-diff-2-text-color, #34d399)); background-color: var(--gq-qbox-diff-easy-bg-color, var(--gq-qbox-diff-2-bg-color, rgba(16, 185, 129, 0.2))); }
        .difficulty-level-medium { color: var(--gq-qbox-diff-medium-text-color, var(--gq-qbox-diff-3-text-color, #60a5fa)); background-color: var(--gq-qbox-diff-medium-bg-color, var(--gq-qbox-diff-3-bg-color, rgba(59, 130, 246, 0.2))); }
        .difficulty-level-hard { color: var(--gq-qbox-diff-hard-text-color, var(--gq-qbox-diff-4-text-color, #c4b5fd)); background-color: var(--gq-qbox-diff-hard-bg-color, var(--gq-qbox-diff-4-bg-color, rgba(167, 139, 250, 0.2))); }
            
        .question-text {
          font-family: var(--gq-qbox-text-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
          font-size: var(--gq-qbox-text-font-size, 1.1rem);
          font-weight: var(--gq-qbox-text-font-weight, 600);
          line-height: var(--gq-qbox-text-line-height, 1.5);
          color: var(--gq-qbox-text-color, #e5e7eb);
          text-align: center;
          width: 100%;
          word-break: break-word;
          hyphens: auto;
          flex-grow: 1;
        }
    
        @media (max-width: 768px) {
          .question-box-internal { 
            padding: var(--gq-qbox-tablet-padding, var(--gq-qbox-padding, 0.8rem));
            min-height: var(--gq-qbox-tablet-min-height, var(--gq-qbox-min-height, 4.5em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-tablet-font-size, var(--gq-qbox-diff-label-font-size, 0.6rem));
            padding: var(--gq-qbox-diff-label-tablet-padding, var(--gq-qbox-diff-label-padding, 0.1rem 0.35rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-tablet-font-size, var(--gq-qbox-text-font-size, 1rem));
            line-height: var(--gq-qbox-text-tablet-line-height, var(--gq-qbox-text-line-height, 1.4));
          }
        }
         @media (max-width: 480px) {
          .question-box-internal { 
            padding: var(--gq-qbox-mobile-padding, var(--gq-qbox-tablet-padding, 0.6rem));
            min-height: var(--gq-qbox-mobile-min-height, var(--gq-qbox-tablet-min-height, 4em));
          }
          .difficulty-label { 
            font-size: var(--gq-qbox-diff-label-mobile-font-size, var(--gq-qbox-diff-label-tablet-font-size, 0.55rem));
          }
          .question-text { 
            font-size: var(--gq-qbox-text-mobile-font-size, var(--gq-qbox-text-tablet-font-size, 0.9rem));
          }
        }
      `;Je([L({type:String})],Ae.prototype,"difficulty",2);Je([L({type:String})],Ae.prototype,"questionText",2);Je([R()],Ae.prototype,"_difficultyName",2);Je([R()],Ae.prototype,"_difficultyClassSuffix",2);Ae=Je([V("quiz-question-display")],Ae);var Ji=Object.defineProperty,eo=Object.getOwnPropertyDescriptor,et=(h,e,a,o)=>{for(var i=o>1?void 0:o?eo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ji(e,a,i),i};let qe=class extends B{constructor(){super(...arguments),this.optionKey="",this.optionText="Opción",this.disabled=!1,this.hinted=!1}render(){return $`
      <button
        class="option-button-internal" 
        ?disabled=${this.disabled||this.hinted}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
      >
        ${this.optionText}
      </button>
    `}_handleClick(h){h.type==="touchstart"&&h.preventDefault(),!(this.disabled||this.hinted)&&this.dispatchEvent(new CustomEvent("option-selected",{detail:{key:this.optionKey},bubbles:!0,composed:!0}))}};qe.styles=Q`
    :host {
      display: block;
      width: 100%;
      outline: none;
      -webkit-tap-highlight-color: transparent;
    }

    .option-button-internal {
      /* Layout y Alineación */
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      min-height: var(--gq-opt-btn-min-height, 3rem);
      height: auto;
      padding: var(--gq-opt-btn-padding, 0.8rem 0.8rem);
      box-sizing: border-box;

      /* Texto */
      text-align: center;
      white-space: normal;
      word-wrap: break-word;
      word-break: break-word;
      line-height: var(--gq-opt-btn-line-height, 1.3);
      font-family: var(--gq-opt-btn-font-family, 'Poppins', sans-serif);
      font-weight: var(--gq-opt-btn-font-weight, 600);
      font-size: var(--gq-opt-btn-font-size, 0.95rem);
      color: var(--gq-opt-btn-text-color, #FFFFFF);

      /* Apariencia Base */
      border: var(--gq-opt-btn-border, none);
      border-radius: var(--gq-opt-btn-border-radius, 0.6rem);
      cursor: pointer;
      background: var(--gq-opt-btn-bg, linear-gradient(to right, #3b82f6, #2563eb));
      box-shadow: var(--gq-opt-btn-box-shadow, 0 4px 10px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.1));

      /* Transiciones */
      transition: background-image 0.3s ease, background-color 0.3s ease,
                  color 0.3s ease, border 0.3s ease, box-shadow 0.3s ease,
                  transform 0.15s ease, opacity 0.2s ease;
      opacity: 1;
    }

    /* Hover (no deshabilitado, no hinted) */
    /* Usamos :host para los estados reflejados */
    :host(:not([disabled]):not([hinted])) .option-button-internal:hover {
      background: var(--gq-opt-btn-hover-bg, linear-gradient(to right, #60a5fa, #3b82f6));
      transform: var(--gq-opt-btn-hover-transform, translateY(-2px));
      box-shadow: var(--gq-opt-btn-hover-box-shadow, 0 6px 15px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.1));
      color: var(--gq-opt-btn-hover-text-color, var(--gq-opt-btn-text-color, #FFFFFF)); /* Permite sobreescribir color de texto en hover */
    }

    /* Active (no deshabilitado, no hinted) */
    :host(:not([disabled]):not([hinted])) .option-button-internal:active {
      background: var(--gq-opt-btn-active-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #2563eb, #1d4ed8))); /* Fallback a bg normal si active-bg no está */
      transform: var(--gq-opt-btn-active-transform, translateY(0px) scale(0.98));
      box-shadow: var(--gq-opt-btn-active-box-shadow, 0 2px 5px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(0, 0, 0, 0.1));
    }

    /* Estado Deshabilitado */
    :host([disabled]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-disabled-opacity, 0.6) !important;
      transform: none !important;
      background: var(--gq-opt-btn-disabled-bg, linear-gradient(to right, #9ca3af, #6b7280));
      box-shadow: var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1));
      color: var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      border: var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none));
    }

    /* Estado Hinted */
    :host([hinted]) .option-button-internal {
      cursor: not-allowed;
      opacity: var(--gq-opt-btn-hinted-opacity, 0.45) !important;
      transform: none !important;
      background: var(--gq-opt-btn-hinted-bg, linear-gradient(to right, #6b7280, #4b5563));
      box-shadow: var(--gq-opt-btn-hinted-box-shadow, var(--gq-opt-btn-disabled-box-shadow, 0 2px 4px rgba(0, 0, 0, 0.1)));
      color: var(--gq-opt-btn-hinted-text-color, var(--gq-opt-btn-disabled-text-color, var(--gq-opt-btn-text-color, #FFFFFF)));
      border: var(--gq-opt-btn-hinted-border, var(--gq-opt-btn-disabled-border, var(--gq-opt-btn-border, none)));
    }

    /* Media Queries para Desktop (usando variables específicas si existen) */
    @media (min-width: 768px) {
      .option-button-internal {
        padding: var(--gq-opt-btn-desktop-padding, var(--gq-opt-btn-padding, 0.9rem 1rem));
        min-height: var(--gq-opt-btn-desktop-min-height, var(--gq-opt-btn-min-height, 3.5rem));
        font-size: var(--gq-opt-btn-desktop-font-size, var(--gq-opt-btn-font-size, 1rem));
        border-radius: var(--gq-opt-btn-desktop-border-radius, var(--gq-opt-btn-border-radius, 0.75rem));
      }
    }
  `;et([L({type:String})],qe.prototype,"optionKey",2);et([L({type:String})],qe.prototype,"optionText",2);et([L({type:Boolean,reflect:!0})],qe.prototype,"disabled",2);et([L({type:Boolean,reflect:!0})],qe.prototype,"hinted",2);qe=et([V("quiz-option-button")],qe);var to=Object.defineProperty,ao=Object.getOwnPropertyDescriptor,Ot=(h,e,a,o)=>{for(var i=o>1?void 0:o?ao(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&to(e,a,i),i};let We=class extends B{constructor(){super(...arguments),this.message="",this.type=null}render(){const h={"feedback-text":!0,correct:this.type==="correct",incorrect:this.type==="incorrect",shield:this.type==="shield",info:this.type==="info"};return $`
      <div class=${_t(h)} part="text">
        ${this.message||""}
      </div>
    `}};We.styles=Q`
    :host {
      display: block;
      margin-top: var(--gq-feedback-margin-top, 1rem);
      height: var(--gq-feedback-height, 2rem);
      box-sizing: border-box;
      transition: opacity 0.3s ease-out;
      opacity: 1;
    }

    :host(:empty) .feedback-text { /* Ocultar si el mensaje está vacío */
        opacity: 0;
    }
    :host([message=""]) .feedback-text { /* Alternativa si :empty no funciona bien con slots/propiedades */
        opacity: 0;
    }


    .feedback-text {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family: var(--gq-feedback-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-feedback-font-size, 1.125rem);
      font-weight: var(--gq-feedback-font-weight, 700);
      text-align: center;
      line-height: 1;
      transition: color 0.3s ease, opacity 0.3s ease; /* Añadido opacity */
      opacity: 1; /* Visible por defecto si tiene mensaje */
    }

    /* Aplicar color basado en el tipo usando una clase o directamente la variable */
    .feedback-text.correct { color: var(--gq-feedback-text-color-correct, #4ade80); }
    .feedback-text.incorrect { color: var(--gq-feedback-text-color-incorrect, #f87171); }
    .feedback-text.shield { color: var(--gq-feedback-text-color-shield, #60a5fa); }
    .feedback-text.info { color: var(--gq-feedback-text-color-info, #9ca3af); }
    .feedback-text:not(.correct):not(.incorrect):not(.shield):not(.info) {
        color: var(--gq-feedback-text-color-default, var(--gq-body-text-color, #e5e7eb)); /* Un color por defecto */
    }


    @media (max-width: 768px) {
        .feedback-text {
            font-size: var(--gq-feedback-desktop-font-size, var(--gq-feedback-font-size, 1rem));
        }
    }
  `;Ot([L({type:String})],We.prototype,"message",2);Ot([L({type:String})],We.prototype,"type",2);We=Ot([V("feedback-area")],We);var io=Object.defineProperty,oo=Object.getOwnPropertyDescriptor,tt=(h,e,a,o)=>{for(var i=o>1?void 0:o?oo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&io(e,a,i),i};let ke=class extends B{constructor(){super(...arguments),this.currentInk=0,this.maxInkPerBar=1e3,this._fullBarsCompleted=0,this._currentBarPercentage=0}updated(h){super.updated(h),(h.has("currentInk")||h.has("maxInkPerBar"))&&(this._calculateBarState(),this.requestUpdate())}_getRainbowColor(h,e){return getComputedStyle(this).getPropertyValue(`--gq-inkbar-rainbow-color-${h+1}`).trim()||e}_calculateBarState(){const h=Math.max(0,this.currentInk),e=this.maxInkPerBar>0?this.maxInkPerBar:1e3;this._fullBarsCompleted=Math.floor(h/e);const a=h%e;h===0?(this._currentBarPercentage=0,this._fullBarsCompleted=0):a===0?(this._currentBarPercentage=100,this._fullBarsCompleted=Math.max(0,Math.floor(h/e)-1)):this._currentBarPercentage=a/e*100}render(){const h=getComputedStyle(this).getPropertyValue("--gq-inkbar-bg-default").trim()||"#374151",e=getComputedStyle(this).getPropertyValue("--gq-inkbar-rainbow-color-1").trim()||"#a78bfa",a=7,o=this._fullBarsCompleted>0?this._getRainbowColor((this._fullBarsCompleted-1)%a,h):h,i=this._getRainbowColor(this._fullBarsCompleted%a,e);return $`
      <style>
        :host {
          /* Estas variables son locales al shadow DOM y se usan por los estilos estáticos */
          --final-container-bg-color: ${o};
          --final-segment-bg-color: ${i};
        }
      </style>
      <div
        class="ink-bar-segment"
        part="segment"
        style="width: ${this._currentBarPercentage}%;"
      ></div>
    `}};ke.styles=Q`
    :host {
      display: block;
      width: var(--gq-inkbar-width, 120px);
      height: var(--gq-inkbar-height, 12px);
      border-radius: var(--gq-inkbar-border-radius, 6px);
      overflow: hidden;
      position: relative;
      border: var(--gq-inkbar-border, 1px solid #4b5563);
      /* background-color se establece dinámicamente a través de --final-container-bg-color */
      transition: background-color 0.3s ease-out;
      box-sizing: border-box;
      background-color: var(--final-container-bg-color); /* Variable que se actualizará en render */
    }

    .ink-bar-segment {
      position: absolute;
      top: 0; left: 0;
      height: 100%;
      border-radius: inherit;
      /* background-color se establece dinámicamente a través de --final-segment-bg-color */
      width: 0%; /* Se actualiza con style property */
      transition: width 0.3s ease-out, background-color 0.3s ease-out;
      background-color: var(--final-segment-bg-color); /* Variable que se actualizará en render */
    }
  `;tt([L({type:Number})],ke.prototype,"currentInk",2);tt([L({type:Number})],ke.prototype,"maxInkPerBar",2);tt([R()],ke.prototype,"_fullBarsCompleted",2);tt([R()],ke.prototype,"_currentBarPercentage",2);ke=tt([V("ink-bar")],ke);var no=Object.defineProperty,so=Object.getOwnPropertyDescriptor,oe=(h,e,a,o)=>{for(var i=o>1?void 0:o?so(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&no(e,a,i),i};const At=1,ro=10,lo=50,co=200,uo=1e3,po=5e3,ho=5,go=10,mo=20,fo=50,vo=100;let ee=class extends B{constructor(){super(),this.score=0,this.combo=0,this._flareIntensity=0,this._shouldPulse=!1,this._scoreColor="var(--gq-scoredisp-text-color-base, #f3f4f6)",this._scoreWeight=800,this._displayScore=0,this._targetScore=0,this._isAnimatingScore=!1,this._scoreAnimationId=null}connectedCallback(){super.connectedCallback(),this.score!==void 0&&!this._isAnimatingScore&&this._displayScore!==this.score&&(this._displayScore=this.score,this._targetScore=this.score)}updated(h){if(super.updated(h),h.has("combo")&&this._calculateEffects(),h.has("score")){const e=h.get("score"),a=this.score;e===void 0&&a!==void 0?(this._displayScore=a,this._targetScore=a,this._isAnimatingScore=!1,this._scoreAnimationId&&(cancelAnimationFrame(this._scoreAnimationId),this._scoreAnimationId=null),a!==0&&this._animateScoreUpdate(0,a)):a!==e&&this._animateScoreUpdate(this._displayScore,a)}}_calculateEffects(){this._flareIntensity=this.combo<At?0:Math.min((this.combo-At+1)/(ro-At+1),1),this._shouldPulse=this._flareIntensity>.3;const h=Math.min(this.combo/10,1),e=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-base").trim()||"700"),a=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-increment").trim()||"100"),o=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-font-weight-max-steps").trim()||"2");this._scoreWeight=e+Math.floor(h*o)*a;const i=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-base").trim()||"#f3f4f6",t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-hue-offset").trim()||"180"),n=getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-saturation").trim()||"80%",c=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-base").trim()||"90"),r=parseFloat(getComputedStyle(this).getPropertyValue("--gq-scoredisp-text-color-combo-lightness-factor").trim()||"10"),m=parseFloat(getComputedStyle(this).getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),l=c+h*r,p=((m+this.combo*parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"))%360+t)%360;this._scoreColor=this.combo<2?i:`hsl(${p}, ${n}, ${l}%)`}_animateScoreUpdate(h,e){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._displayScore=h,this._targetScore=e,this._isAnimatingScore=!0;const a=()=>{if(this._targetScore!==this.score){this._scoreAnimationId&&cancelAnimationFrame(this._scoreAnimationId),this._animateScoreUpdate(this._displayScore,this.score);return}const o=this._targetScore-this._displayScore;if(o===0){this._isAnimatingScore=!1,this._scoreAnimationId=null,this.requestUpdate();return}let i=1;const t=Math.abs(o);t>po?i=Math.floor(t/vo):t>uo?i=Math.floor(t/fo):t>co?i=Math.floor(t/mo):t>lo?i=Math.floor(t/go):t>10&&(i=Math.max(1,Math.floor(t/ho))),i=Math.max(1,i),o<0&&(i=-i),Math.abs(i)>t&&(i=o),this._displayScore+=i,this._triggerPerStepEffects(),this.requestUpdate(),this._scoreAnimationId=requestAnimationFrame(a)};this._scoreAnimationId=requestAnimationFrame(a)}_triggerPerStepEffects(){this._scoreTextElement&&(this._scoreTextElement.classList.remove("score-increment-jolt"),this._scoreTextElement.offsetWidth,this._scoreTextElement.classList.add("score-increment-jolt")),this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing-step"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing-step"))}_triggerPulseAnimation(){this._scorePulseElement&&(this._scorePulseElement.classList.remove("pulsing"),this._scorePulseElement.offsetWidth,this._scorePulseElement.classList.add("pulsing"))}render(){return $`
      <style>
        :host {
          /* Inyectar las variables finales para la animación del texto (flare) */
          --final-flare-shadow: ${this._flareIntensity>0?`
      0 0 5px var(--gq-score-flare-color-1, transparent),
      0 0 10px var(--gq-score-flare-color-2, transparent),
      0 0 15px var(--gq-score-flare-color-3, transparent),
      0 0 20px var(--gq-score-flare-color-4, transparent)
    `:"none"};
          --final-flare-shadow-pulse: ${this._flareIntensity>0?`
      0 0 5px var(--gq-score-flare-pulse-color-1, transparent),
      0 0 12px var(--gq-score-flare-pulse-color-2, transparent),
      0 0 18px var(--gq-score-flare-pulse-color-3, transparent),
      0 0 24px var(--gq-score-flare-pulse-color-4, transparent)
    `:"none"};
        }
        #score-text-internal {
          font-weight: ${this._scoreWeight};
          color: ${this._scoreColor};
          text-shadow: var(--final-flare-shadow);
        }
      </style>
      <span class="score-emoji" part="emoji" aria-hidden="true">⭐</span>
      <span
        id="score-text-internal"
        part="text"
        class="${this._shouldPulse?"score-pulsing":""} ${this._isAnimatingScore&&this._displayScore!==this._targetScore,""}"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        ${Math.round(this._displayScore)}
      </span>
      <div id="score-pulse-internal" part="pulse-effect" aria-hidden="true"></div>
    `}};ee.styles=Q`
    :host {
      display: inline-flex;
      align-items: center;
      position: relative;
      font-family: var(--gq-scoredisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      /* Variable para el color del pulso pequeño */
      --gq-scoredisp-pulse-step-color: var(--gq-scoredisp-pulse-step-color-override, rgba(255, 220, 100, 0.6));
    }

    .score-emoji {
      font-size: var(--gq-scoredisp-emoji-size, 1.5rem);
      line-height: 1;
      margin-right: var(--gq-scoredisp-emoji-margin-right, 0.3rem);
      user-select: none;
    }

    #score-text-internal {
      transition: color 0.5s ease, font-weight 0.5s ease, text-shadow 0.6s ease-out;
      font-size: var(--gq-scoredisp-text-font-size, var(--score-font-size, 2rem));
      line-height: var(--gq-scoredisp-text-line-height, var(--score-line-height, 1.1));
      text-align: center;
      min-width: 1ch;
      user-select: none;
      /* font-weight y color se aplican dinámicamente */
      /* text-shadow se aplica dinámicamente mediante variables CSS inyectadas en render() */
    }

    /* Animación de pulso de texto original (basada en combo) */
    @keyframes pulseFlareInternal {
      0%, 100% { text-shadow: var(--final-flare-shadow); opacity: 1; }
      50% { text-shadow: var(--final-flare-shadow-pulse); opacity: 0.85; }
    }

    #score-text-internal.score-pulsing {
      animation: pulseFlareInternal 1.5s infinite ease-in-out;
    }

    /* Efecto de "sacudida" para cada incremento de puntuación */
    @keyframes scoreJolt {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(-1px, -1px) scale(1.03); } /* Ligera sacudida y aumento */
      50% { transform: translate(1px, 1px) scale(0.97); }  /* Sacudida en otra dirección y encogimiento */
      75% { transform: translate(1px, -1px) scale(1.02); }
    }
    #score-text-internal.score-increment-jolt {
      animation: scoreJolt 0.07s ease-in-out; /* Duración muy corta */
    }


    #score-pulse-internal {
      position: absolute;
      left: 50%; top: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 1px; height: 1px; /* El tamaño se controla con scale */
      border-radius: 50%;
      background-color: var(--gq-scoredisp-pulse-effect-bg, rgba(255, 255, 255, 0.7));
      opacity: 0;
      z-index: -1;
      pointer-events: none;
    }

    /* Animación de pulso grande original (al cambiar score, ahora opcional o para fin de animación) */
    @keyframes scorePulseAnimInternal {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.7; }
      100% { transform: translate(-50%, -50%) scale(200); opacity: 0; }
    }
    #score-pulse-internal.pulsing {
        animation: scorePulseAnimInternal 0.6s ease-out forwards;
    }

    /* Animación de pulso PEQUEÑO para cada paso de la animación del score */
    @keyframes scoreStepPulseAnim {
      0% { transform: translate(-50%, -50%) scale(0); opacity: 0.5; }
      100% { transform: translate(-50%, -50%) scale(60); opacity: 0; } /* Escala más pequeña y rápida */
    }
    #score-pulse-internal.pulsing-step {
      background-color: var(--gq-scoredisp-pulse-step-color); /* Color diferente para el pulso pequeño */
      animation: scoreStepPulseAnim 0.25s ease-out forwards; /* Animación más rápida */
    }

    @media (max-width: 768px) {
      .score-emoji { font-size: var(--gq-scoredisp-emoji-tablet-size, var(--gq-scoredisp-emoji-size, 1.3rem)); }
      #score-text-internal { font-size: var(--gq-scoredisp-text-tablet-font-size, var(--gq-scoredisp-text-font-size, 1.8rem)); }
    }
    @media (max-width: 480px) {
      .score-emoji { 
        font-size: var(--gq-scoredisp-emoji-mobile-size, var(--gq-scoredisp-emoji-tablet-size, 1.2rem));
        margin-right: var(--gq-scoredisp-emoji-mobile-margin-right, var(--gq-scoredisp-emoji-margin-right, 0.2rem));
      }
      #score-text-internal { font-size: var(--gq-scoredisp-text-mobile-font-size, var(--gq-scoredisp-text-tablet-font-size, 1.6rem)); }
    }
  `;oe([L({type:Number})],ee.prototype,"score",2);oe([L({type:Number})],ee.prototype,"combo",2);oe([R()],ee.prototype,"_flareIntensity",2);oe([R()],ee.prototype,"_shouldPulse",2);oe([R()],ee.prototype,"_scoreColor",2);oe([R()],ee.prototype,"_scoreWeight",2);oe([R()],ee.prototype,"_displayScore",2);oe([R()],ee.prototype,"_targetScore",2);oe([R()],ee.prototype,"_isAnimatingScore",2);oe([j("#score-text-internal")],ee.prototype,"_scoreTextElement",2);oe([j("#score-pulse-internal")],ee.prototype,"_scorePulseElement",2);ee=oe([V("score-display")],ee);var bo=Object.defineProperty,yo=Object.getOwnPropertyDescriptor,yt=(h,e,a,o)=>{for(var i=o>1?void 0:o?yo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&bo(e,a,i),i};let $e=class extends B{constructor(){super(...arguments),this.lives=3,this.hasShield=!1,this.hintCharges=0}render(){const h=this.hintCharges>0;return $`
      <div class="lives-stack" part="lives-stack">
        <span class="life-emoji" part="heart-icon">❤️</span>
        <span id="lives-count-internal" part="count">${this.lives}</span>
      </div>
      <span
        class="status-icon shield-icon"
        part="shield-icon"
        ?hidden=${!this.hasShield}
        title="Escudo Activo"
      >🛡️</span>
      <span
        class="status-icon hint-icon"
        part="hint-icon"
        ?hidden=${!h}
        title="Pista Disponible"
      >💡</span>
    `}};$e.styles=Q`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--gq-livesdisp-gap, 0.5rem);
      font-family: var(--gq-livesdisp-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      color: var(--gq-livesdisp-text-color, #f3f4f6);
      user-select: none;
    }

    .lives-stack {
      position: relative; /* Contenedor para posicionar el número absolutamente */
      display: inline-flex; /* Para que el tamaño se ajuste al contenido (el corazón) */
      justify-content: center;
      align-items: center;
      /* El tamaño del stack será dictado por el tamaño del corazón */
      width: var(--gq-livesdisp-icon-size, 1.8rem);
      height: var(--gq-livesdisp-icon-size, 1.8rem);
    }

    #lives-count-internal {
      position: absolute; /* Posicionar sobre el corazón */
      top: 56%;
      left: 50%;
      transform: translate(-50%, -50%); /* Centrar exactamente sobre el corazón */
      font-size: var(--gq-livesdisp-count-font-size, var(--gq-livesdisp-icon-size, 1.8rem));
      font-weight: var(--gq-livesdisp-count-font-weight, 700);
      color: var(--gq-livesdisp-text-color, #f3f4f6); /* Asegurar que el color del texto sea visible */
      z-index: 1; /* Asegurar que esté por encima del corazón */
      line-height: 1; /* Para un centrado vertical más predecible del texto */
      text-align: center;
      /* Opcional: añadir una pequeña sombra al texto para mejorar la legibilidad sobre el corazón */
      text-shadow:
                -2px -2px 0 #000,
                2px -2px 0 #000,
                -2px 2px 0 #000,
                2px 2px 0 #000,
                -3px 0px 0 #000,
                3px 0px 0 #000,
                0px -3px 0 #000,
                0px 3px 0 #000;
    }

    .life-emoji {
      font-size: 2.6rem; /* Tamaño base del corazón */
      line-height: 1;
      color: var(--gq-livesdisp-heart-color, #f43f5e);
      animation: pulseHeart 1.5s infinite ease-in-out;
      user-select: none;
      /* Asegurar que el emoji en sí esté centrado si tiene espaciado interno */
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes pulseHeart {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.15); }
    }

    .status-icon {
      font-size: var(--gq-livesdisp-icon-size, 1.8rem); /* Los iconos de estado también usan esta variable */
      line-height: 1;
      margin-left: var(--gq-livesdisp-status-icon-margin-left, 0.2rem);
      display: inline-block;
      user-select: none;
    }

    .shield-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-shield-icon-shadow-color, rgba(59, 130, 246, 0.7)));
      animation: shieldPulse 2s infinite ease-in-out;
    }

    .hint-icon {
      filter: drop-shadow(0 0 3px var(--gq-livesdisp-hint-icon-shadow-color, rgba(250, 204, 21, 0.7)));
      animation: hintPulse 1.8s infinite ease-in-out;
    }

    @keyframes shieldPulse {
      0%, 100% { transform: scale(1); opacity: 0.9; }
      50% { transform: scale(1.1); opacity: 1; }
    }
    @keyframes hintPulse {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
      50% { transform: scale(1.08) rotate(5deg); opacity: 1; }
    }

    [hidden] { display: none !important; }
`;yt([L({type:Number})],$e.prototype,"lives",2);yt([L({type:Boolean})],$e.prototype,"hasShield",2);yt([L({type:Number})],$e.prototype,"hintCharges",2);$e=yt([V("lives-display")],$e);const ha=1,xo=5;class Co{constructor(e,a,o){this.currentUIElements={},this.isFullyInitialized=!1,this.optionClickCallbackForModule=null,this.explanationConfirmListener=null,this.externalConfirmCallbackForModule=null,this.lastShownResultTypeForModule=null,this.module=e,this.engineServices=a,this.uiHostElement=o,console.log("QuizUIManager: Constructor llamado. uiHostElement:",this.uiHostElement?this.uiHostElement.tagName:"null")}async performFullInitialization(){if(this.isFullyInitialized){console.log("QuizUIManager: performFullInitialization llamado pero ya está inicializado.");return}if(console.log("QuizUIManager: performFullInitialization() INICIADO."),!(this.uiHostElement instanceof HTMLElement&&this.uiHostElement.updateComplete!==void 0)){console.error("QuizUIManager CRITICAL: uiHostElement no es un LitElement válido o falta updateComplete."),this.isFullyInitialized=!1;return}console.log("QuizUIManager: Esperando a uiHostElement.updateComplete...");try{await this.uiHostElement.updateComplete,console.log("QuizUIManager: uiHostElement.updateComplete RESUELTO.")}catch(e){console.error("QuizUIManager: Error esperando uiHostElement.updateComplete:",e),this.isFullyInitialized=!1;return}this.initializeUIReferences(),this.isFullyInitialized=!0,console.log("QuizUIManager: performFullInitialization() FINALIZADO.")}initializeUIReferences(){console.log("QuizUIManager: initializeUIReferences() INICIADO."),this.currentUIElements.quizUiContainer=this.uiHostElement;const e=this.uiHostElement.shadowRoot;if(!e){console.error("QuizUIManager CRITICAL: uiHostElement.shadowRoot NO ENCONTRADO.");return}console.log("QuizUIManager: ShadowRoot del uiHostElement ENCONTRADO."),this.currentUIElements.optionsContainer=e.querySelector('[part="options-container"]'),console.log("QuizUIManager: optionsContainer (buscando part='options-container' en shadowRoot) encontrado:",this.currentUIElements.optionsContainer),this.currentUIElements.optionsContainer||console.error("QuizUIManager CRITICAL: No se encontró el div con part='options-container' DENTRO DEL SHADOW DOM de quiz-ui-container."),this.currentUIElements.explanationOverlayComponent=document.getElementById("explanation-overlay-component"),console.log("QuizUIManager: ExplanationOverlayComponent global:",this.currentUIElements.explanationOverlayComponent?"ENCONTRADO":"NO ENCONTRADO"),this.currentUIElements.optionButtons=[],console.log("QuizUIManager: initializeUIReferences() FINALIZADO (elementos de slot se crearán/asignarán en buildQuizInterface).")}async buildQuizInterface(e,a,o){var d;if(console.log("QuizUIManager: buildQuizInterface() INICIADO. Pregunta ID:",e==null?void 0:e.id),!this.isFullyInitialized&&(console.log("QuizUIManager: buildQuizInterface esperando a performFullInitialization..."),await this.performFullInitialization(),!this.isFullyInitialized)){console.error("QuizUIManager CRITICAL: Falló performFullInitialization en buildQuizInterface.");return}if(!e){console.error("QuizUIManager CRITICAL: buildQuizInterface llamado SIN PREGUNTA."),this.clearQuizInterfaceContent();return}if(!this.uiHostElement){console.error("QuizUIManager CRITICAL: uiHostElement (quizUiContainer) no está disponible.");return}this.optionClickCallbackForModule=a;const i=this.engineServices.playerData;let t=this.uiHostElement.querySelector('[slot="score-display"]');t||(console.log("QuizUIManager: Creando ScoreDisplay (porque no existe en el slot)."),t=document.createElement("score-display"),t.slot="score-display",this.uiHostElement.appendChild(t)),this.currentUIElements.scoreDisplay=t,this.updateScoreInQuizUI(i.score,o);let n=this.uiHostElement.querySelector('[slot="lives-display"]');n||(console.log("QuizUIManager: Creando LivesDisplay (porque no existe en el slot)."),n=document.createElement("lives-display"),n.slot="lives-display",this.uiHostElement.appendChild(n)),this.currentUIElements.livesDisplay=n,this.updateLivesInQuizUI(i.lives,i.hasShield,i.hintCharges);let c=this.uiHostElement.querySelector('[slot="ink-label"]');c||(console.log("QuizUIManager: Creando inkLabel (porque no existe en el slot)."),c=document.createElement("div"),c.id="quiz-module-ink-label-dynamic",c.slot="ink-label",this.uiHostElement.appendChild(c)),this.currentUIElements.inkLabel=c,this.currentUIElements.inkLabel.className="ink-label-base",this.currentUIElements.inkLabel.textContent="Tinta";let r=this.uiHostElement.querySelector('[slot="ink-bar"]');r||(console.log("QuizUIManager: Creando inkBarContainer (porque no existe en el slot)."),r=document.createElement("ink-bar"),r.slot="ink-bar",this.uiHostElement.appendChild(r)),this.currentUIElements.inkBarContainer=r,this.updateInkBar(),this.updateInkVisibility(i.isDrawingUnlocked);let m=this.uiHostElement.querySelector('[slot="question-display"]');m||(console.log("QuizUIManager: Creando questionBox (porque no existe en el slot)."),m=document.createElement("quiz-question-display"),m.slot="question-display",this.uiHostElement.appendChild(m)),this.currentUIElements.questionBox=m,console.log(`QuizUIManager: Asignando a questionBox - Dificultad: ${e.difficulty}, Texto: "${e.text.substring(0,30)}..."`),this.currentUIElements.questionBox.difficulty=e.difficulty,this.currentUIElements.questionBox.questionText=e.text;const l=this.currentUIElements.optionsContainer;if(!l){console.error("QuizUIManager CRITICAL: El optionsContainer (div con part='options-container') NO FUE ENCONTRADO. No se pueden crear botones de opción.");return}console.log("QuizUIManager: Limpiando opciones anteriores de optionsHost:",l.tagName,l.className),l.innerHTML="",this.currentUIElements.optionButtons=[],[...e.options].sort(()=>.5-Math.random()).forEach(u=>{if(!(u!=null&&u.key)||typeof u.text>"u"){console.warn("QuizUIManager: Opción inválida o sin datos, omitiendo:",u);return}const f=document.createElement("quiz-option-button");f.optionKey=u.key,f.optionText=u.text,f.disabled=!1,f.hinted=!1,f.addEventListener("option-selected",b=>{var E;const w=b;this.optionClickCallbackForModule&&((E=w.detail)!=null&&E.key)&&this.optionClickCallbackForModule(w.detail.key)}),l.appendChild(f),this.currentUIElements.optionButtons.push(f)}),console.log(`QuizUIManager: ${((d=this.currentUIElements.optionButtons)==null?void 0:d.length)||0} botones de opción creados y añadidos a optionsHost.`);let p=this.uiHostElement.querySelector('[slot="feedback-area"]');p||(console.log("QuizUIManager: Creando feedbackArea (porque no existe en el slot)."),p=document.createElement("feedback-area"),p.slot="feedback-area",this.uiHostElement.appendChild(p)),this.currentUIElements.feedbackArea=p,this.updateFeedback("",null),this.updateComboBodyBackground(o);const s=this.engineServices.themeManager.getActiveTheme();this.applyThemeStylesToQuizElements(s?s.elements:null),console.log("QuizUIManager: buildQuizInterface() FINALIZADO.")}updateScoreInQuizUI(e,a){this.currentUIElements.scoreDisplay?(this.currentUIElements.scoreDisplay.score=e,this.currentUIElements.scoreDisplay.combo=a):console.warn("QuizUIManager: Intento de actualizar score, pero scoreDisplay no está referenciado."),this.engineServices.globalUI.updateScoreDisplay(e,a)}updateLivesInQuizUI(e,a,o){this.currentUIElements.livesDisplay?(this.currentUIElements.livesDisplay.lives=e,this.currentUIElements.livesDisplay.hasShield=a,this.currentUIElements.livesDisplay.hintCharges=o):console.warn("QuizUIManager: Intento de actualizar vidas, pero livesDisplay no está referenciado.")}applyThemeStylesToQuizElements(e){const a=this.currentUIElements.inkLabel;if(a&&(e!=null&&e.inkLabel)){const o=e.inkLabel,i=["ink-label-base"];a.classList.contains("hidden")&&i.push("hidden"),a.className="",i.forEach(t=>a.classList.add(t)),o.themeClass&&o.themeClass.split(" ").filter(Boolean).forEach(t=>a.classList.add(t)),o.text!==void 0&&(a.textContent=o.text)}}updateInkBar(){const e=this.currentUIElements.inkBarContainer;e&&this.engineServices.playerData&&(e.currentInk=this.engineServices.playerData.currentInk,e.maxInkPerBar=this.engineServices.playerData.INK_BAR_CAPACITY)}updateInkVisibility(e){var a,o;(a=this.currentUIElements.inkLabel)==null||a.classList.toggle("hidden",!e),(o=this.currentUIElements.inkBarContainer)==null||o.classList.toggle("hidden",!e)}updateFeedback(e,a){const o=this.currentUIElements.feedbackArea;o&&(o.message=e,o.type=a),this.lastShownResultTypeForModule=a}disableOptions(){var e;(e=this.currentUIElements.optionButtons)==null||e.forEach(a=>{a&&(a.disabled=!0)})}applyHintVisuals(e){let a=0;const o=1,i=this.currentUIElements.optionButtons;if(!i||i.length<=1)return;[...i].sort(()=>.5-Math.random()).forEach(n=>{a>=o||n&&n.optionKey!==e&&!n.hinted&&(n.hinted=!0,a++)})}showExplanation(e,a,o){console.log(`QuizUIManager: showExplanation. Tipo resultado: ${o}, Explicación: "${e.substring(0,50)}..."`);const i=this.currentUIElements.explanationOverlayComponent;if(i){this.externalConfirmCallbackForModule=a;const t=o==="info"||o===void 0?null:o;i.explanationText=e,i.resultType=t,i.isVisible=!0,this.addExplanationListener(i),this.engineServices.globalUI.updateBackdropVisibility(),this.engineServices.globalUI.setModuleUIsFaded(!0),console.log("QuizUIManager: Overlay de explicación configurado y visible.")}else console.warn("QuizUIManager: ExplanationOverlayComponent no encontrado, confirmando directamente."),a()}hideExplanation(){console.log("QuizUIManager: hideExplanation llamado."),this.removeExplanationListener();const e=this.currentUIElements.explanationOverlayComponent;e&&(e.isVisible=!1,console.log("QuizUIManager: Overlay de explicación ocultado.")),this.engineServices.globalUI.updateBackdropVisibility(),this.engineServices.globalUI.setModuleUIsFaded(!1)}addExplanationListener(e){this.removeExplanationListener(),!(!e||!this.externalConfirmCallbackForModule)&&(console.log("QuizUIManager: Añadiendo listener 'confirm-clicked' al overlay de explicación."),this.explanationConfirmListener=()=>{if(console.log("QuizUIManager: Evento 'confirm-clicked' del overlay de explicación CAPTURADO."),this.externalConfirmCallbackForModule)try{this.externalConfirmCallbackForModule()}catch(a){console.error("QuizUIManager: Error en callback onConfirm de explicación:",a)}this.hideExplanation()},e.addEventListener("confirm-clicked",this.explanationConfirmListener))}removeExplanationListener(){const e=this.currentUIElements.explanationOverlayComponent;e&&this.explanationConfirmListener&&(console.log("QuizUIManager: Removiendo listener 'confirm-clicked' del overlay de explicación."),e.removeEventListener("confirm-clicked",this.explanationConfirmListener)),this.explanationConfirmListener=null}isExplanationVisible(){var a;return((a=this.currentUIElements.explanationOverlayComponent)==null?void 0:a.isVisible)??!1}updateComboBodyBackground(e){const a=document.documentElement,o=getComputedStyle(a),i=parseFloat(o.getPropertyValue("--gq-body-bg-combo-hue-base").trim()||"220"),t=parseFloat(o.getPropertyValue("--gq-body-bg-combo-saturation-base").trim()||"30"),n=parseFloat(o.getPropertyValue("--gq-body-bg-combo-saturation-factor").trim()||"50"),c=parseFloat(o.getPropertyValue("--gq-body-bg-combo-lightness-base").trim()||"10"),r=parseFloat(o.getPropertyValue("--gq-body-bg-combo-lightness-factor").trim()||"15"),m=parseFloat(o.getPropertyValue("--gq-combo-color-hue-increment").trim()||"10"),l=Math.min(Math.max(0,e-ha)/(xo-ha),1),g=l*l,p=(i+e*m)%360,s=Math.min(100,t+g*n),d=Math.min(100,c+g*r);document.body.style.backgroundColor=`hsl(${p.toFixed(0)}, ${s.toFixed(0)}%, ${d.toFixed(0)}%)`}clearQuizInterfaceContent(){console.log("QuizUIManager: clearQuizInterfaceContent() llamado para limpiar UI del quiz.");const{scoreDisplay:e,livesDisplay:a,questionBox:o,optionsContainer:i,feedbackArea:t,inkLabel:n,inkBarContainer:c}=this.currentUIElements;e&&e.remove(),a&&a.remove(),o&&o.remove(),i&&(i.innerHTML=""),this.currentUIElements.optionButtons=[],t&&t.remove(),n&&n.remove(),c&&c.remove(),this.currentUIElements.scoreDisplay=null,this.currentUIElements.livesDisplay=null,this.currentUIElements.questionBox=null,this.currentUIElements.feedbackArea=null,this.currentUIElements.inkLabel=null,this.currentUIElements.inkBarContainer=null}destroy(){console.log("QuizUIManager: destroy() llamado."),this.clearQuizInterfaceContent(),this.removeExplanationListener(),this.optionClickCallbackForModule=null,this.externalConfirmCallbackForModule=null,this.currentUIElements={},this.isFullyInitialized=!1,console.log("QuizUIManager: Destruido.")}}class Mo{constructor(){this.currentQuestion=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.nextQuestionTimeoutId=null,this.isModuleActive=!1,this.BASE_POINTS_PER_CORRECT=15,this.DIFFICULTY_BONUS={easy:10,1:10,2:20,medium:30,3:30,hard:45,4:45,5:65},this.SIZE_INCREMENT_PER_CORRECT=1,this.MAX_CORRECT_ANSWER_GROWTH=4,this.questionsAnsweredCorrectly=0,this.questionsAttemptedInModule=0,console.log("QuizGameModule: Constructor llamado.")}getName(){return"GatoQuizModule"}async loadData(e){console.log("QuizGameModule: loadData() llamado. Datos recibidos:",e)}async initialize(e,a){if(console.log("QuizGameModule: initialize() INICIADO. uiHostElement recibido:",a,"EngineServices:",e),this.engineServices=e,this.uiHostElement=a,!this.engineServices.quizSystem)throw console.error("QuizGameModule CRITICAL: QuizSystem no fue provisto por EngineServices."),new Error("QuizGameModule: QuizSystem no fue provisto por EngineServices.");if(this.quizSystem=this.engineServices.quizSystem,console.log("QuizGameModule: QuizSystem obtenido:",this.quizSystem),!this.engineServices.playerData)throw console.error("QuizGameModule CRITICAL: PlayerData no fue provisto por EngineServices."),new Error("QuizGameModule: PlayerData no fue provisto por EngineServices.");this.playerData=this.engineServices.playerData,console.log("QuizGameModule: PlayerData obtenido:",this.playerData);try{this.quizUIManager=new Co(this,this.engineServices,this.uiHostElement),console.log("QuizGameModule: QuizUIManager instanciado:",this.quizUIManager?"OK":"FALLO")}catch(o){throw console.error("QuizGameModule CRITICAL: Error instanciando QuizUIManager:",o),o}this.consecutiveCorrectAnswers=0,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.lastAnswerResultType=null,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null),this.isModuleActive=!1,this.questionsAnsweredCorrectly=0,this.questionsAttemptedInModule=0,console.log("QuizGameModule: initialize() FINALIZADO.")}start(){if(console.log("QuizGameModule: start() INICIADO."),!this.quizSystem||!this.quizUIManager||!this.playerData){console.error("QuizGameModule: No se puede iniciar, dependencias no listas (QuizSystem, QuizUIManager, o PlayerData).");return}this.isModuleActive=!0,console.log("QuizGameModule: Llamando a quizSystem.resetAvailableQuestions()."),this.quizSystem.resetAvailableQuestions(),console.log("QuizGameModule: Llamando a displayNextQuestion() desde start()."),this.displayNextQuestion(),console.log("QuizGameModule: Actualizando UI global desde start()."),this.engineServices.globalUI.updateScoreDisplay(this.playerData.score,this.consecutiveCorrectAnswers),this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,this.playerData.hasShield,this.playerData.hintCharges),this.engineServices.toolManager.updateControlVisibilityBasedOnUnlocks(),this.engineServices.toolManager.updateToolButtonActiveStates(),this.quizUIManager.updateInkBar(),this.quizUIManager.updateInkVisibility(this.playerData.isDrawingUnlocked),console.log("QuizGameModule: start() FINALIZADO.")}update(e){this.isModuleActive}async end(){console.log("QuizGameModule: end() llamado. Preparando resultados del módulo..."),this.isModuleActive=!1,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null);const e={score:this.playerData.score,correctAnswersCount:this.questionsAnsweredCorrectly,totalQuestionsAttempted:this.questionsAttemptedInModule};return console.log("QuizGameModule: Resultados finales del módulo:",e),e}destroy(){console.log("QuizGameModule: destroy() INICIADO."),this.isModuleActive=!1,this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null),this.quizUIManager&&(console.log("QuizGameModule: Llamando a quizUIManager.destroy()."),this.quizUIManager.destroy()),console.log("QuizGameModule: destroy() FINALIZADO.")}displayNextQuestion(){if(console.log("QuizGameModule: displayNextQuestion() INICIADO."),!this.isModuleActive){console.log("QuizGameModule: displayNextQuestion() abortado, módulo no activo.");return}if(console.log("QuizGameModule: Intentando seleccionar siguiente pregunta desde QuizSystem..."),this.currentQuestion=this.quizSystem.selectNextQuestion(),console.log("QuizGameModule: Pregunta seleccionada:",this.currentQuestion?JSON.stringify(this.currentQuestion.id):null),!this.currentQuestion){console.warn("QuizGameModule: No hay más preguntas disponibles. Módulo finalizando."),this.isModuleActive=!1,this.engineServices.audioManager.playSound("level_complete");const e=this.engineServices.gameManager.getPlayerData(),a=e.score>e.highScore;console.log("QuizGameModule: Llamando a gameManager.moduleFinished() por falta de preguntas."),this.engineServices.gameManager.moduleFinished({score:e.score,correct:this.questionsAnsweredCorrectly,total:this.questionsAttemptedInModule,isNewHighScore:a});return}this.questionsAttemptedInModule++,this.hintAppliedToQuestionId=null,this.isWaitingForExplanationConfirm=!1,this.quizUIManager?(console.log(`QuizGameModule: PREGUNTA OBTENIDA (ID: ${this.currentQuestion.id}). Llamando a quizUIManager.buildQuizInterface...`),this.quizUIManager.buildQuizInterface(this.currentQuestion,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers),this.playerData.hintCharges>0&&this.currentQuestion&&(console.log("QuizGameModule: Aplicando visuales de pista."),this.quizUIManager.applyHintVisuals(this.currentQuestion.correctAnswerKey),this.hintAppliedToQuestionId=this.currentQuestion.id),console.log("QuizGameModule: Actualizando UI global desde displayNextQuestion()."),this.engineServices.globalUI.updateScoreDisplay(this.playerData.score,this.consecutiveCorrectAnswers),this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,this.playerData.hasShield,this.playerData.hintCharges)):console.error("QuizGameModule CRITICAL: quizUIManager no disponible para displayNextQuestion."),console.log("QuizGameModule: displayNextQuestion() FINALIZADO.")}handleOptionClick(e){var o;if(console.log(`QuizGameModule: handleOptionClick llamado con key: '${e}'. currentQuestion: ${(o=this.currentQuestion)==null?void 0:o.id}, isModuleActive: ${this.isModuleActive}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}, nextQuestionTimeoutId: ${this.nextQuestionTimeoutId}`),!this.currentQuestion||!this.isModuleActive||this.isWaitingForExplanationConfirm||this.nextQuestionTimeoutId!==null){console.log("QuizGameModule: handleOptionClick ignorado (condiciones no cumplidas).");return}console.log("QuizGameModule: Deshabilitando opciones..."),this.quizUIManager.disableOptions();const a=this.quizSystem.validateAnswer(this.currentQuestion.id,e);console.log(`QuizGameModule: Respuesta validada para pregunta ${this.currentQuestion.id}. Es correcta: ${a}`),this.hintAppliedToQuestionId===this.currentQuestion.id&&(this.playerData.hintCharges>0&&(this.playerData.hintCharges--,console.log(`QuizGameModule: Carga de pista consumida. Restantes: ${this.playerData.hintCharges}`),this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,this.playerData.hasShield,this.playerData.hintCharges)),this.hintAppliedToQuestionId=null),a?(console.log("QuizGameModule: Llamando a handleCorrectAnswer."),this.handleCorrectAnswer(this.currentQuestion.difficulty)):(console.log("QuizGameModule: Llamando a handleIncorrectAnswer."),this.handleIncorrectAnswer())}calculateScore(e,a){const o=a+1,i=this.BASE_POINTS_PER_CORRECT*o,t=this.DIFFICULTY_BONUS[e]??this.DIFFICULTY_BONUS[1]??0,n=this.playerData.getCurrentComboMultiplier(),c=Math.max(0,(i+t)*(n-1));return{totalPoints:Math.round(i+t+c),basePoints:i,difficultyBonus:t,comboBonus:Math.round(c)}}handleCorrectAnswer(e){this.lastAnswerResultType="correct",this.questionsAnsweredCorrectly++;const a=this.calculateScore(e,this.consecutiveCorrectAnswers);this.consecutiveCorrectAnswers++,this.playerData.score+=a.totalPoints,console.log(`QuizGameModule: Respuesta CORRECTA. Puntos ganados: ${a.totalPoints}. Score total: ${this.playerData.score}. Racha: ${this.consecutiveCorrectAnswers}`),this.engineServices.inkManager.gainInkOnCorrectAnswer(),this.engineServices.globalUI.updateScoreDisplay(this.playerData.score,this.consecutiveCorrectAnswers),this.quizUIManager.updateInkBar();let o=`¡+${a.totalPoints} Pts!`,i=`(Base: ${a.basePoints}, Dif: +${a.difficultyBonus}`;const t=this.playerData.getCurrentComboMultiplier();a.comboBonus>0&&(i+=`, Combo x${t.toFixed(1)}: +${a.comboBonus}`),i+=")",o+=` ${i}`,this.quizUIManager.updateFeedback(o,"correct"),this.engineServices.audioManager.playSound("correct"),this.engineServices.catManager.growExistingCats(this.SIZE_INCREMENT_PER_CORRECT,this.MAX_CORRECT_ANSWER_GROWTH);const n=this.playerData.getCatsPerCorrectAnswer(),r=this.engineServices.catManager.getSpawnableTemplatesWeighted();let m="common_cat";if(r.length>0){const l=r.reduce((g,p)=>g+p.weight,0);if(l>0){let g=Math.random()*l;for(const p of r)if(g-=p.weight,g<=0){m=p.id;break}}else r.length>0&&(m=r[0].id)}for(let l=0;l<n;l++)this.engineServices.catManager.addCat(m);this.proceedToNextStep()}handleIncorrectAnswer(){this.lastAnswerResultType="incorrect";let e=!1;console.log("QuizGameModule: Respuesta INCORRECTA."),this.playerData.hasShield?(this.playerData.hasShield=!1,this.quizUIManager.updateFeedback("¡Escudo Roto!","shield"),this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,!1,this.playerData.hintCharges),this.engineServices.audioManager.playSound("shield_break"),this.lastAnswerResultType="shield",console.log("QuizGameModule: Escudo utilizado.")):(this.consecutiveCorrectAnswers=0,this.playerData.lives--,console.log(`QuizGameModule: Vida perdida. Vidas restantes: ${this.playerData.lives}. Racha reseteada.`),this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,!1,this.playerData.hintCharges),this.engineServices.globalUI.updateScoreDisplay(this.playerData.score,0),this.engineServices.audioManager.playSound("incorrect"),this.playerData.hintCharges>0&&(this.playerData.hintCharges=0,this.engineServices.globalUI.updateLivesDisplay(this.playerData.lives,this.playerData.hasShield,0),console.log("QuizGameModule: Pistas perdidas por respuesta incorrecta.")),this.playerData.lives<=0&&(e=!0,console.log("QuizGameModule: GAME OVER."))),this.hintAppliedToQuestionId=null,e?(this.isModuleActive=!1,this.quizUIManager.updateFeedback("¡Has perdido!","incorrect"),this.nextQuestionTimeoutId&&(clearTimeout(this.nextQuestionTimeoutId),this.nextQuestionTimeoutId=null),setTimeout(()=>{if(this.isModuleActive)return;console.log("QuizGameModule: Llamando a gameManager.moduleFinished() por GAME OVER.");const a=this.engineServices.gameManager.getPlayerData(),o=a.score>a.highScore;this.engineServices.gameManager.moduleFinished({gameOver:!0,score:a.score,correct:this.questionsAnsweredCorrectly,total:this.questionsAttemptedInModule,isNewHighScore:o})},1500)):this.proceedToNextStep()}proceedToNextStep(){var o;if(console.log(`QuizGameModule: proceedToNextStep. isModuleActive: ${this.isModuleActive}, isWaitingForExplanationConfirm: ${this.isWaitingForExplanationConfirm}`),!this.isModuleActive||this.isWaitingForExplanationConfirm)return;const e=(o=this.currentQuestion)==null?void 0:o.explanation,a=()=>{this.lastAnswerResultType=null;const i=e&&this.isWaitingForExplanationConfirm?500:1500;console.log(`QuizGameModule: Programando siguiente pregunta con delay de ${i}ms.`),this.scheduleNextQuestion(i)};e?(console.log(`QuizGameModule: Mostrando explicación: "${e}"`),this.isWaitingForExplanationConfirm=!0,this.quizUIManager.showExplanation(e,()=>{if(console.log("QuizGameModule: Confirmación de explicación recibida."),!this.isModuleActive){console.log("QuizGameModule: Confirmación de explicación recibida pero módulo ya no está activo. No se programará siguiente pregunta.");return}this.isWaitingForExplanationConfirm=!1,a()},this.lastAnswerResultType)):(console.log("QuizGameModule: No hay explicación, procediendo directamente a programar siguiente pregunta."),a())}scheduleNextQuestion(e){if(!this.isModuleActive){console.log("QuizGameModule: scheduleNextQuestion abortado, módulo no activo.");return}this.nextQuestionTimeoutId&&clearTimeout(this.nextQuestionTimeoutId),console.log(`QuizGameModule: Siguiente pregunta se mostrará en ${e}ms.`),this.nextQuestionTimeoutId=window.setTimeout(()=>{this.nextQuestionTimeoutId=null,this.isModuleActive?requestAnimationFrame(()=>{this.isModuleActive?(console.log("QuizGameModule: Timeout completado, llamando a displayNextQuestion() vía rAF."),this.displayNextQuestion()):console.log("QuizGameModule: Timeout completado, pero módulo ya no activo en rAF. No se llama a displayNextQuestion().")}):console.log("QuizGameModule: Timeout completado, pero módulo ya no activo. No se llama a displayNextQuestion().")},e)}handleEscapeKey(){return this.isModuleActive&&this.isWaitingForExplanationConfirm&&this.quizUIManager.isExplanationVisible()?(console.log("QuizGameModule: Escape presionado, cerrando explicación."),this.quizUIManager.hideExplanation(),!0):!1}rebuildUI(){if(console.log("QuizGameModule: rebuildUI() llamado (ej. por cambio de tema)."),this.isModuleActive&&this.quizUIManager&&this.currentQuestion){this.quizUIManager.buildQuizInterface(this.currentQuestion,this.handleOptionClick.bind(this),this.consecutiveCorrectAnswers);const e=this.engineServices.playerData;if(this.hintAppliedToQuestionId===this.currentQuestion.id&&e.hintCharges>0&&(console.log("QuizGameModule rebuildUI: Re-aplicando visuales de pista."),this.quizUIManager.applyHintVisuals(this.currentQuestion.correctAnswerKey)),this.isWaitingForExplanationConfirm&&this.currentQuestion.explanation){console.log("QuizGameModule rebuildUI: Re-mostrando explicación.");const a=()=>{this.isModuleActive&&(this.isWaitingForExplanationConfirm=!1,this.proceedToNextStep())};this.quizUIManager.showExplanation(this.currentQuestion.explanation,a,this.lastAnswerResultType)}}else console.warn("QuizGameModule rebuildUI: No se puede reconstruir UI, módulo no activo, UIManager no disponible o sin pregunta actual.")}}class wo{constructor(){this.allQuestions=[],this.availableQuestions=[],this.currentQuestion=null,this.isLoading=!1,this.lastError=null}async loadQuestionsData(e){if(this.isLoading)return console.warn("QuizSystem: Ya hay una carga en progreso."),!1;this.isLoading=!0,this.lastError=null,this.allQuestions=[];try{if(!Array.isArray(e))throw new Error("Los datos de preguntas proporcionados no son un array válido.");return this.allQuestions=e,this.resetAvailableQuestions(),console.log(`QuizSystem: ${this.allQuestions.length} preguntas procesadas exitosamente desde datos pre-cargados.`),this.isLoading=!1,!0}catch(a){return console.error("QuizSystem: Error al procesar los datos de preguntas:",a),this.lastError=a instanceof Error?a.message:String(a),this.isLoading=!1,this.allQuestions=[],this.availableQuestions=[],!1}}selectNextQuestion(e){if(this.allQuestions.length===0&&!this.isLoading)return console.error("QuizSystem: No hay preguntas cargadas o procesadas."),null;if(this.isLoading)return console.warn("QuizSystem: Las preguntas aún se están procesando."),null;let a=this.availableQuestions;if(e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0&&(console.warn("QuizSystem: No quedan preguntas disponibles"+(e?` con dificultad '${e}'.`:".")+" Reseteando lista..."),this.resetAvailableQuestions(),a=this.availableQuestions,e&&(a=a.filter(i=>String(i.difficulty)===String(e))),a.length===0))return console.error(`QuizSystem: No se encontraron preguntas con dificultad '${e}' incluso después de resetear.`),null;const o=Math.floor(Math.random()*a.length);return this.currentQuestion=a[o],this.availableQuestions=this.availableQuestions.filter(i=>{var t;return i.id!==((t=this.currentQuestion)==null?void 0:t.id)}),this.currentQuestion}validateAnswer(e,a){const o=this.allQuestions.find(t=>t.id===e);return o?a===null?!1:o.correctAnswerKey===a:(console.error(`QuizSystem: No se encontró la pregunta con ID '${e}' para validar.`),null)}getCurrentQuestion(){return this.currentQuestion}resetAvailableQuestions(){this.availableQuestions=[...this.allQuestions],this.currentQuestion=null}getLastError(){return this.lastError}isLoadingQuestions(){return this.isLoading}getTotalQuestionsCount(){return this.allQuestions.length}getAvailableQuestionsCount(){return this.availableQuestions.length}}class So{constructor(e){this.scoreDisplay=null,this.livesDisplay=null,this.shopButton=null,this.optionsButton=null,this.optionsMenu=null,this.blurBackdrop=null,this.diagonalWipe=null,this.comboCounter=null,this.gameManager=e,this.scoreDisplay=document.querySelector("score-display:not([slot])"),this.livesDisplay=document.querySelector("lives-display:not([slot])"),this.shopButton=document.getElementById("shop-button-global"),this.optionsButton=document.getElementById("settings-options-button-global"),this.optionsMenu=document.getElementById("options-menu-popup-global"),this.blurBackdrop=document.getElementById("blur-backdrop"),this.diagonalWipe=document.getElementById("diagonal-wipe-transition-element"),this.comboCounter=document.querySelector("combo-counter"),this.shopButton||console.warn("GlobalUIManager Constructor: shop-button-global no encontrado."),this.optionsButton||console.warn("GlobalUIManager Constructor: settings-options-button-global no encontrado."),this.optionsMenu||console.warn("GlobalUIManager Constructor: options-menu-popup-global no encontrado."),this.blurBackdrop||console.warn("GlobalUIManager Constructor: blur-backdrop no encontrado."),this.diagonalWipe||console.warn("GlobalUIManager Constructor: diagonal-wipe-transition-element no encontrado."),this.comboCounter||console.warn("GlobalUIManager Constructor: combo-counter no encontrado.")}getOptionsMenuVisibleStateForDebug(){var e;return(e=this.optionsMenu)==null?void 0:e.isVisible}updateScoreDisplay(e,a){this.comboCounter&&(this.comboCounter.combo=a);const o=document.documentElement,i=1,t=10,n=2,c=10,r=a<i?0:Math.min((a-i+1)/(t-i+1),1);o.style.setProperty("--flare-intensity",r.toFixed(3));const m=a<n?0:Math.min((a-n+1)/(c-n+1),1);o.style.setProperty("--element-glow-intensity",m.toFixed(3))}updateLivesDisplay(e,a,o){this.livesDisplay&&(this.livesDisplay.lives=e,this.livesDisplay.hasShield=a,this.livesDisplay.hintCharges=o)}updateShieldIcon(e){this.livesDisplay&&(this.livesDisplay.hasShield=e)}updateHintIcon(e){this.livesDisplay&&(this.livesDisplay.hintCharges=e)}showShopButton(e){this.shopButton&&this.shopButton.classList.toggle("hidden",!e)}setShopButtonDisabled(e){this.shopButton&&(this.shopButton.disabled=e)}showOptionsButton(e){this.optionsButton&&this.optionsButton.classList.toggle("hidden",!e)}setOptionsButtonDisabled(e){this.optionsButton&&(this.optionsButton.disabled=e)}toggleOptionsMenu(e){var a;if(console.log(`[GlobalUIManager DEBUG] toggleOptionsMenu LLAMADO. Solicitado: ${e}. Estado actual optionsMenu.isVisible: ${(a=this.optionsMenu)==null?void 0:a.isVisible}`),this.optionsMenu){if(this.optionsMenu.isVisible===e){console.log("[GlobalUIManager DEBUG] toggleOptionsMenu: Sin cambio en la visibilidad del menú de opciones.");return}if(this.optionsMenu.isVisible=e,console.log(`[GlobalUIManager DEBUG] toggleOptionsMenu: optionsMenu.isVisible establecido a ${e}.`),e){const o=this.gameManager.getAudioManager();this.optionsMenu.initialVolume=o.getVolume(),this.optionsMenu.initiallyMuted=o.isMuted(),this.optionsMenu.audioManagerInstance=o,this.optionsMenu.themeManagerInstance=this.gameManager.getThemeManager(),this.optionsMenu.gameManagerInstance=this.gameManager,console.log("[GlobalUIManager DEBUG] toggleOptionsMenu: Instancias pasadas a optionsMenu.")}}else console.warn("GlobalUIManager: Intento de alternar optionsMenu, pero no se encontró.")}isOptionsMenuOpen(){var a;return((a=this.optionsMenu)==null?void 0:a.isVisible)??!1}updateBackdropVisibility(){var i,t,n;const e=((i=this.gameManager.getShopManager())==null?void 0:i.isShopOpen())??!1,a=this.isOptionsMenuOpen(),o=e||a;console.log(`[GlobalUIManager DEBUG] updateBackdropVisibility:
          Shop Open: ${e} (Popup visible: ${(t=this.gameManager.getShopManager().getShopPopupElement())==null?void 0:t.isVisible})
          Options Open: ${a} (Popup visible: ${(n=this.optionsMenu)==null?void 0:n.isVisible})
          => Decisión: isAnyEnginePopupOpen = ${o}`),this.blurBackdrop?this.blurBackdrop.visible!==o&&(console.log(`[GlobalUIManager DEBUG] Estableciendo blurBackdrop.visible = ${o} (antes era ${this.blurBackdrop.visible})`),this.blurBackdrop.visible=o):console.warn("[GlobalUIManager] updateBackdropVisibility: blurBackdrop no encontrado.")}playWipeIn(){return this.diagonalWipe?this.diagonalWipe.playIn():(console.warn("GlobalUIManager: diagonalWipe no encontrado para playIn()."),Promise.resolve())}playWipeOut(){return this.diagonalWipe?this.diagonalWipe.playOut():(console.warn("GlobalUIManager: diagonalWipe no encontrado para playOut()."),Promise.resolve())}resetWipe(){var e;(e=this.diagonalWipe)==null||e.reset()}setModuleUIsFaded(e){const a=this.gameManager.getContainerElement().querySelector("quiz-ui-container");a&&a.isFaded!==e&&(a.isFaded=e)}}class Eo{constructor(){this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.INK_BAR_CAPACITY=1e3,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.MAX_CAT_FOOD=25,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0,this.BASE_MAX_CAT_SIZE_LIMIT=150,this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL=25,console.log("PlayerData Instanciado.")}getCurrentComboMultiplier(){return 1+this.comboMultiplierLevel*.15}getCurrentInkCostPerPixel(){return .4*Math.pow(.9,this.inkCostReductionLevel)}getCatsPerCorrectAnswer(){return 1+this.extraCatSpawnLevel*1}getMaxCatsAllowed(){return 50+this.maxCatsLevel*25}getCurrentMaxSizeLimit(){return this.BASE_MAX_CAT_SIZE_LIMIT+this.maxCatSizeLevel*this.MAX_CAT_SIZE_INCREMENT_PER_LEVEL}spendInk(e){return this.currentInk>=e?(this.currentInk-=e,this.inkSpentSinceLastClear+=e,!0):!1}gainInk(e){this.currentInk+=e}recoverSpentInk(){console.log(`[PlayerData] Recovering ${this.inkSpentSinceLastClear.toFixed(0)} ink.`),this.gainInk(this.inkSpentSinceLastClear),this.inkSpentSinceLastClear=0}getMaxCatFood(){return this.MAX_CAT_FOOD}spendCatFoodUnit(){return this.isCatFoodUnlocked&&this.currentCatFood>0?(this.currentCatFood--,!0):!1}refillCatFood(){this.isCatFoodUnlocked&&(this.currentCatFood=this.getMaxCatFood())}reset(){console.log("PlayerData: Reseteando datos..."),this.score=0,this.lives=3,this.isDrawingUnlocked=!1,this.isCatFoodUnlocked=!1,this.hasShield=!1,this.hintCharges=0,this.currentInk=0,this.inkSpentSinceLastClear=0,this.currentCatFood=0,this.comboMultiplierLevel=0,this.inkCostReductionLevel=0,this.extraCatSpawnLevel=0,this.maxCatsLevel=0,this.maxCatSizeLevel=0}}class Io{constructor(){this.states=new Map,this.currentState=null,this.currentStateName=null,this.isTransitioning=!1,this.animationContainer=null,this.wipeComponent=null}setAnimationContainer(e){this.animationContainer=e}setWipeComponent(e){var a;this.wipeComponent=e,console.log("[StateMachine] Wipe component seteado:",e?e.tagName:"null"),(a=this.wipeComponent)==null||a.reset()}addState(e,a){this.states.has(e)&&console.warn(`[StateMachine] El estado '${e}' ya existe. Sobrescribiendo.`),this.states.set(e,a)}async changeState(e,a,o,i){var l,g,p,s;if(console.log(`[StateMachine] Solicitud para cambiar a estado '${e}'. Estado actual: '${this.currentStateName||"ninguno"}', isTransitioning: ${this.isTransitioning}`),this.isTransitioning){console.warn(`[StateMachine] Transición a '${e}' ignorada, otra transición ya está en progreso.`);return}const t=this.states.get(e);if(!t){console.error(`[StateMachine] Estado '${e}' no existe. Estados disponibles:`,Array.from(this.states.keys()));return}if(this.currentStateName===e&&!o&&!i){console.warn(`[StateMachine] Ya en estado '${e}' y sin forzar animación. No se realiza la transición.`);return}this.isTransitioning=!0;const n=this.currentState,c=this.currentStateName;console.log(`[StateMachine] INICIO TRANSICIÓN: de '${c||"ninguno"}' a '${e}'. isTransitioning = true.`);const r=o||((l=n==null?void 0:n.getPreferredExitAnimation)==null?void 0:l.call(n))||"gq-fade-out",m=i||((g=t==null?void 0:t.getPreferredEnterAnimation)==null?void 0:g.call(t))||"gq-fade-in";console.log(`[StateMachine] Animaciones seleccionadas: Salida='${r}', Entrada='${m}'`);try{if(this.wipeComponent&&(r==="gq-wipe-transition"||m==="gq-wipe-transition")){if(console.log(`[StateMachine] Usando BARRIDO (WIPE) de '${c||"ninguno"}' a '${e}'.`),this.wipeComponent.visible&&this.wipeComponent.classList.contains("animate-in")&&(console.log("[StateMachine] Wipe ya estaba en 'animate-in', reseteando antes de nuevo playIn."),this.wipeComponent.reset(),await new Promise(d=>setTimeout(d,50))),console.log("[StateMachine]   BARRIDO: Llamando wipeComponent.playIn() para cubrir pantalla..."),await this.wipeComponent.playIn(),console.log("[StateMachine]   BARRIDO: wipeComponent.playIn() COMPLETADO."),n!=null&&n.exit&&(console.log(`[StateMachine]   BARRIDO: Llamando oldState.exit() para '${c}'.`),n.exit()),this.animationContainer&&(console.log("[StateMachine]   BARRIDO: Limpiando animationContainer (innerHTML = '')."),this.animationContainer.innerHTML=""),this.currentState=t,this.currentStateName=e,(p=this.currentState)!=null&&p.enter){console.log(`[StateMachine]   BARRIDO: Llamando currentState.enter() para '${this.currentStateName}'. Params:`,a);const d=this.currentState.enter(a);d instanceof Promise?(console.log(`[StateMachine]   BARRIDO: currentState.enter() para '${this.currentStateName}' es async, esperando...`),await d,console.log(`[StateMachine]   BARRIDO: currentState.enter() async para '${this.currentStateName}' COMPLETADO.`)):console.log(`[StateMachine]   BARRIDO: currentState.enter() sync para '${this.currentStateName}' COMPLETADO.`)}console.log(`[StateMachine]   BARRIDO: Llamando wipeComponent.playOut() para revelar '${this.currentStateName}'...`),await this.wipeComponent.playOut(),console.log("[StateMachine]   BARRIDO: wipeComponent.playOut() COMPLETADO."),console.log(`[StateMachine] Transición de BARRIDO a '${this.currentStateName}' finalizada exitosamente.`)}else{console.log(`[StateMachine] Usando animación ESTÁNDAR ('${r}' -> '${m}') de '${c||"ninguno"}' a '${e}'.`);const d=this.animationContainer||document.getElementById("app");if(!d){console.error("[StateMachine] Contenedor de animación estándar no encontrado. Realizando cambio directo."),n!=null&&n.exit&&n.exit(),this.currentState=t,this.currentStateName=e;const u=this.currentState.enter(a);u instanceof Promise&&await u,console.log(`[StateMachine] Cambio directo a '${e}' completado (sin contenedor de animación).`);return}await new Promise(u=>{const f=async()=>{var x;if(d.removeEventListener("animationend",w),b&&clearTimeout(b),b=void 0,d.classList.remove("gq-state-is-exiting",...qt(d)),console.log(`[StateMachine]   ESTÁNDAR: Animación de salida '${r}' para '${c}' finalizada.`),n!=null&&n.exit&&(console.log(`[StateMachine]   ESTÁNDAR: Llamando oldState.exit() para '${c}'.`),n.exit()),(r.includes("fade")||r.includes("slide"))&&(console.log("[StateMachine]   ESTÁNDAR: Limpiando container.innerHTML por animación fade/slide."),d.innerHTML=""),this.currentState=t,this.currentStateName=e,(x=this.currentState)!=null&&x.enter){console.log(`[StateMachine]   ESTÁNDAR: Llamando currentState.enter() para '${this.currentStateName}'. Params:`,a);const C=this.currentState.enter(a);C instanceof Promise?(console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() para '${this.currentStateName}' es async, esperando...`),await C,console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() async para '${this.currentStateName}' COMPLETADO.`)):console.log(`[StateMachine]   ESTÁNDAR: currentState.enter() sync para '${this.currentStateName}' COMPLETADO.`)}console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de entrada '${m}' para '${this.currentStateName}'.`),d.classList.add("gq-state-is-entering",m);const E=ga(d,m);let I=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback por TIMEOUT para animationend de entrada en '${this.currentStateName}' (anim: ${m}).`),d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...qt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (fallback por timeout).`),u()},E+200);const v=C=>{C.target===d&&C.animationName===lt(m)?(I&&clearTimeout(I),I=void 0,d.removeEventListener("animationend",v),d.classList.remove("gq-state-is-entering",...qt(d)),console.log(`[StateMachine] Transición ESTÁNDAR a '${this.currentStateName}' completada (evento animationend).`),u()):C.target===d&&console.log(`[StateMachine]   ESTÁNDAR: evento animationend capturado para '${C.animationName}', esperando '${lt(m)}'.`)};d.addEventListener("animationend",v)};let b,w;if(n){console.log(`[StateMachine]   ESTÁNDAR: Aplicando animación de salida '${r}' a '${c}'.`),d.classList.add("gq-state-is-exiting",r);const E=ga(d,r);console.log(`[StateMachine]   ESTÁNDAR: Duración calculada para salida '${r}': ${E}ms.`),b=window.setTimeout(()=>{console.warn(`[StateMachine]   ESTÁNDAR: Fallback por TIMEOUT para animationend de salida en '${c}' (anim: ${r}).`),f()},E+200),w=I=>{I.target===d&&I.animationName===lt(r)?(console.log(`[StateMachine]   ESTÁNDAR: Evento animationend de SALIDA capturado para '${I.animationName}'.`),f()):I.target===d&&console.log(`[StateMachine]   ESTÁNDAR: evento animationend de SALIDA capturado para '${I.animationName}', esperando '${lt(r)}'.`)},d.addEventListener("animationend",w)}else console.log("[StateMachine]   ESTÁNDAR: No hay estado antiguo (oldState es null), procediendo directamente a la lógica de entrada."),f()})}}catch(d){console.error(`[StateMachine] ERROR CRÍTICO durante la transición de '${c||"ninguno"}' a '${e}':`,d),(s=this.wipeComponent)==null||s.reset()}finally{this.isTransitioning=!1,console.log(`[StateMachine] FIN TRANSICIÓN: a '${e}'. isTransitioning = false. Estado final actual: '${this.currentStateName}'.`)}}update(e){var a;if(!this.isTransitioning&&((a=this.currentState)!=null&&a.update))try{this.currentState.update(e)}catch(o){console.error(`[StateMachine] Error en update() de '${this.currentStateName}':`,o)}}getCurrentStateName(){return this.currentStateName}getCurrentState(){return this.currentState}}function ga(h,e){h.className;let a=!1;h.classList.contains(e)||(h.classList.add(e),a=!0);const o=getComputedStyle(h).animationDuration||"0s";a&&h.classList.remove(e);const i=parseFloat(o);return o.toLowerCase().includes("ms")?i:i*1e3}function lt(h){if(h.startsWith("anim-"))return h;const e=h.split("-");return e.length>1&&e[0]==="gq"?`anim-${e.slice(1).join("-")}`:h}function qt(h){const e=["gq-fade","gq-slide","gq-wipe","anim-"];return Array.from(h.classList).filter(a=>e.some(o=>a.startsWith(o)))}var Ao=Object.defineProperty,qo=Object.getOwnPropertyDescriptor,$t=(h,e,a,o)=>{for(var i=o>1?void 0:o?qo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ao(e,a,i),i};let je=class extends B{constructor(){super(...arguments),this.finalScore=0,this.isNewHighScore=!1}_handleRestartClick(){this.dispatchEvent(new CustomEvent("restart-game-requested",{bubbles:!0,composed:!0}))}_handleMenuClick(){this.dispatchEvent(new CustomEvent("main-menu-requested",{bubbles:!0,composed:!0}))}render(){return $`
      <h1 class="game-over-title">¡Fin del Juego!</h1>
      <div class="score-container">
        <span class="final-score-label">Puntaje Final</span>
        <span class="final-score-value">${this.finalScore}</span>
        ${this.isNewHighScore?$`
          <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
        `:""}
      </div>
      <div class="button-container">
        <button class="action-button restart-button" @click=${this._handleRestartClick}>
          Reiniciar Juego
        </button>
        </div>
    `}};je.styles=Q`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      box-sizing: border-box;
      text-align: center;
      background-color: var(--gq-gameover-bg, rgba(17, 24, 39, 0.9));
      color: var(--gq-gameover-text-color, #e5e7eb);
      font-family: var(--gq-gameover-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
      pointer-events: auto; /* <-- AÑADIR ESTA LÍNEA */
    }

    .game-over-title {
      font-family: var(--gq-gameover-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(3rem, 15vmin, 6rem);
      color: var(--gq-gameover-title-color, #f87171);
      text-shadow: var(--gq-gameover-title-shadow, 2px 2px 5px rgba(0,0,0,0.5));
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .score-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }

    .final-score-label {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--gq-gameover-score-label-color, #9ca3af);
    }

    .final-score-value {
      font-size: clamp(2.5rem, 10vmin, 4rem);
      font-weight: 700;
      color: var(--gq-gameover-score-value-color, #facc15);
      line-height: 1;
    }

    .new-highscore-indicator {
      font-size: 1rem;
      font-weight: 700;
      color: var(--gq-gameover-highscore-text-color, #4ade80);
      background-color: var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2));
      padding: 0.3rem 0.8rem;
      border-radius: 0.5rem;
      border: var(--gq-gameover-highscore-border, 1px solid #34d399);
      margin-top: 0.5rem;
      animation: pulseGreen 1.8s infinite ease-in-out;
    }

    @keyframes pulseGreen { /* Se puede mantener local o globalizar si se usa en más sitios */
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5)); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8)); }
    }

    .button-container {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
             pointer-events: auto;
    }

    .action-button {
      font-family: var(--gq-gameover-button-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-gameover-button-font-size, 1rem);
      font-weight: var(--gq-gameover-button-font-weight, 600);
      padding: var(--gq-gameover-button-padding, 0.8rem 1.5rem);
      border-radius: var(--gq-gameover-button-border-radius, 0.5rem);
      border: none;
      cursor: pointer;
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-gameover-button-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      -webkit-tap-highlight-color: transparent;
             pointer-events: auto;

    }
    .action-button:hover {
       transform: var(--gq-gameover-button-hover-transform, translateY(-2px));
       box-shadow: var(--gq-gameover-button-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
    }
     .action-button:active {
       transform: var(--gq-gameover-button-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-gameover-button-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

    .restart-button {
      background-color: var(--gq-gameover-restart-btn-bg, #34d399);
      color: var(--gq-gameover-restart-btn-text-color, #064e3b);
    }
    .restart-button:hover { background-color: var(--gq-gameover-restart-btn-hover-bg, #6ee7b7); }

    .menu-button {
      background-color: var(--gq-gameover-menu-btn-bg, #60a5fa);
      color: var(--gq-gameover-menu-btn-text-color, #1e3a8a);
    }
     .menu-button:hover { background-color: var(--gq-gameover-menu-btn-hover-bg, #93c5fd); }

     @media (max-width: 480px) {
        /* Las media queries pueden ajustar fallbacks o usar variables específicas para móvil */
        :host { gap: 1rem; padding: 1rem; }
        .game-over-title { font-size: clamp(2.5rem, 13vmin, 5rem); }
        .final-score-label { font-size: 1rem; }
        .final-score-value { font-size: clamp(2rem, 9vmin, 3.5rem); }
        .new-highscore-indicator { font-size: 0.9rem; }
        .button-container { flex-direction: column; width: 80%; }
        .action-button { 
            width: 100%; 
            font-size: var(--gq-gameover-button-mobile-font-size, 0.9rem);
            padding: var(--gq-gameover-button-mobile-padding, 0.7rem 1rem);
        }
     }
  `;$t([L({type:Number})],je.prototype,"finalScore",2);$t([L({type:Boolean})],je.prototype,"isNewHighScore",2);je=$t([V("game-over-screen")],je);class ko{constructor(e){this.finalScore=0,this.isNewHighScore=!1,this.gameOverScreenElement=null,this.restartHandler=null,this.gameManager=e}enter(e){console.log("GameOverState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("gameover");const a=this.gameManager.getContainerElement();if(!a){console.error("GameOverState: Contenedor principal no encontrado.");return}a.innerHTML="",this.gameOverScreenElement=document.createElement("game-over-screen"),this.gameOverScreenElement.finalScore=this.finalScore,this.gameOverScreenElement.isNewHighScore=this.isNewHighScore,this.restartHandler=()=>{console.log("GameOverState: Evento 'restart-game-requested' recibido."),this.gameManager.getAudioManager().playSound("ui_confirm"),window.location.reload()},this.gameOverScreenElement.addEventListener("restart-game-requested",this.restartHandler),a.appendChild(this.gameOverScreenElement),this.gameManager.getAudioManager().playSound("game_over")}exit(){console.log("GameOverState: exit"),this.gameOverScreenElement&&this.restartHandler&&this.gameOverScreenElement.removeEventListener("restart-game-requested",this.restartHandler),this.gameOverScreenElement=null,this.restartHandler=null}update(e){}}class To{constructor(e){this.gameManager=e}enter(e){console.log("LoadingState: enter",e),this.gameManager.setBodyStateClass("loading")}exit(){console.log("LoadingState: exit")}update(e){}}var Do=Object.defineProperty,Po=Object.getOwnPropertyDescriptor,re=(h,e,a,o)=>{for(var i=o>1?void 0:o?Po(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Do(e,a,i),i};let te=class extends B{constructor(){super(...arguments),this.gameData={title:"GatoQuiz Interactivo",version:"1.0.0",highScore:0,lastScore:0},this.loadingMessages=["Desenredando la diversión...","Preparando las croquetas virtuales...","Afilando las garras para el quiz..."],this._isLoading=!1,this._contentFadingOut=!1,this._currentLoadingMessage="Cargando...",this.sparkleIntervalId=null,this.hasStarted=!1}firstUpdated(h){super.firstUpdated(h),this.shadowRoot&&this.startSparkleEffect(),this.ensureFontsLoaded()}connectedCallback(){if(super.connectedCallback(),typeof CSS<"u"&&CSS.registerProperty)try{CSS.registerProperty({name:"--hue1",syntax:"<angle>",initialValue:"0deg",inherits:!1}),CSS.registerProperty({name:"--hue2",syntax:"<angle>",initialValue:"300deg",inherits:!1})}catch(h){console.warn(" mainMenuScreen: Error registrando @property CSS:",h)}this._selectRandomLoadingMessage()}disconnectedCallback(){super.disconnectedCallback(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null)}_selectRandomLoadingMessage(){if(this.loadingMessages&&this.loadingMessages.length>0){const h=Math.floor(Math.random()*this.loadingMessages.length);this._currentLoadingMessage=this.loadingMessages[h]}else this._currentLoadingMessage="Cargando..."}async _handleScreenClick(h){if(this.hasStarted)return;this.hasStarted=!0,h.type==="touchstart"&&h.preventDefault(),console.log("MainMenuScreen: Click/Tap detectado. Iniciando secuencia de carga..."),this._selectRandomLoadingMessage(),this.sparkleIntervalId&&(clearTimeout(this.sparkleIntervalId),this.sparkleIntervalId=null),this._sparkleContainer&&(this._sparkleContainer.innerHTML=""),this._pawWrapper&&this._pawWrapper.classList.add("content-hidden"),this._titleAmpersand&&this._titleAmpersand.classList.add("content-hidden");const e=500;await new Promise(o=>setTimeout(o,e)),this._loadingMessageContainer&&this._loadingMessageContainer.classList.add("visible"),console.log("MainMenuScreen: Contenido principal oculto, mostrando spinner.");const a=2500;await new Promise(o=>setTimeout(o,a)),console.log("MainMenuScreen: Duración de carga artificial completada. Solicitando inicio del juego."),this.dispatchEvent(new CustomEvent("start-game-requested",{bubbles:!0,composed:!0}))}startSparkleEffect(){const h=()=>{if(!this._sparkleContainer||!this._sparkleSvgTemplate)return;const a=this._sparkleSvgTemplate.cloneNode(!0);a.removeAttribute("id"),a.style.display="block",a.classList.add("sparkle-instance");const o=this.getBoundingClientRect(),i=o.width,t=o.height,n=this._sparkleContainer.appendChild(a.cloneNode(!0)),c=getComputedStyle(n),r=parseFloat(c.width),m=parseFloat(c.height);this._sparkleContainer.removeChild(n);const l=Math.random()*(t-m),g=Math.random()*(i-r);a.style.position="absolute",a.style.top=`${l}px`,a.style.left=`${g}px`,this._sparkleContainer.appendChild(a),setTimeout(()=>{a.parentNode===this._sparkleContainer&&this._sparkleContainer.removeChild(a)},500)},e=()=>{if(!this.isConnected)return;h();const a=Math.random()*150+50;this.sparkleIntervalId=window.setTimeout(e,a)};this.sparkleIntervalId&&clearTimeout(this.sparkleIntervalId),e()}ensureFontsLoaded(){document.fonts&&Promise.all([document.fonts.load("1em Pacifico"),document.fonts.load("1em Geist"),document.fonts.load("1em Poppins")]).then(()=>{}).catch(h=>{console.warn("MainMenuScreen: Error esperando fuentes:",h)})}render(){const h=Ja`
      <svg id="sparkle-svg-template-internal" style="display: none;" width="50px" height="50px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <defs><style>.cls-sparkle-internal{fill:none;stroke-miterlimit:10; stroke: #fff845; stroke-width: 2px;}</style></defs>
        <line class="cls-sparkle-internal" x1="12" y1="0.5" x2="12" y2="5.29"></line>
        <line class="cls-sparkle-internal" x1="12" y1="18.71" x2="12" y2="23.5"></line>
        <line class="cls-sparkle-internal" x1="23.5" y1="12" x2="18.71" y2="12"></line>
        <line class="cls-sparkle-internal" x1="5.29" y1="12" x2="0.5" y2="12"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="3.87" x2="16.74" y2="7.26"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="16.74" x2="3.87" y2="20.13"></line>
        <line class="cls-sparkle-internal" x1="20.13" y1="20.13" x2="16.74" y2="16.74"></line>
        <line class="cls-sparkle-internal" x1="7.26" y1="7.26" x2="3.87" y2="3.87"></line>
      </svg>
    `;return $`
      <div class="paw-wrapper" @click=${this._handleScreenClick} @touchstart=${this._handleScreenClick}>
        <div class="rainbow-circle">
          <div class="circle-content"></div>
        </div>
        <div class="container-invisible">
          <div class="title-container">
            <h1 class="title-shadow">Whiskers</h1>
            <h1 class="title-shadow">Wisdom</h1>
            <span class="animate-paw-wiggle paw-1">🐾</span>
            <span class="animate-paw-wiggle paw-2">🐾</span>
          </div>
          <div class="fading-click-text"> &lt;HAZ CLICK O TOCA&gt;</div>
        </div>
        <div id="sparkle-container-internal"></div>
        ${h}
      </div>

      <div class="loading-message-container">
          <div class="yarn-spinner"></div>
          <span class="loading-text">${this._currentLoadingMessage}</span>
      </div>

      <span class="title-ampersand">&</span>
    `}};te.styles=Q`
    :host {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      overflow: hidden;
      cursor: pointer;
      font-family: "Geist", sans-serif;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      pointer-events: auto;
      z-index: 10;
      --hue1: 0deg;
      --hue2: 300deg;
      background-image:
        linear-gradient(
          in oklch longer hue to right,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        ),
        linear-gradient(
          in oklch longer hue to bottom,
          oklch(0.93 0.08 var(--hue1) / 50%),
          oklch(0.93 0.08 var(--hue2) / 50%)
        );
      background-size: 100% 100%;
      animation-name: anim_bg_host;
      animation-duration: 5s;
      animation-timing-function: linear;
      animation-iteration-count: infinite;
      text-align: center;
      padding: 0.5rem;
      box-sizing: border-box;
    }

    :host::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M64.6 15.4c-1.1-1.1-2.9-1.1-4 0L50 26.1 39.4 15.4c-1.1-1.1-2.9-1.1-4 0-1.1 1.1-1.1 2.9 0 4L46.1 30 35.4 40.6c-1.1 1.1-1.1 2.9 0 4 0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8L50 33.9l10.6 10.6c0.5 0.5 1.2 0.8 2 0.8s1.5-0.3 2-0.8c1.1-1.1 1.1-2.9 0-4L53.9 30 64.6 19.4C65.7 18.3 65.7 16.5 64.6 15.4z M24 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S28.4 40 24 40z M40 56c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S44.4 56 40 56z M56 40c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8S60.4 40 56 40z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
      background-size: 120px 120px;
      animation: fallingPaws_host 20s linear infinite;
      z-index: -2;
      opacity: 0.5;
      pointer-events: none;
    }
    :host::after {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Cdefs%3E%3Cmask id='pawMaskHost'%3E%3Crect width='100%25' height='100%25' fill='white'/%3E%3Cg fill='black' transform='translate(75 75) scale(0.15)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3Cg fill='black' transform='translate(25 30) scale(0.09) rotate(-20)'%3E%3Cpath d='M205.116,153.078c31.534,11.546,69.397-12.726,84.58-54.209c15.174-41.484,1.915-84.462-29.614-96.001 c-31.541-11.53-69.4,12.735-84.582,54.218C160.325,98.57,173.584,141.548,205.116,153.078z'/%3E%3Cpath d='M85.296,219.239c32.987-2.86,56.678-40.344,52.929-83.75c-3.757-43.391-33.545-76.253-66.532-73.409 c-32.984,2.869-56.674,40.36-52.921,83.759C22.53,189.23,52.313,222.091,85.296,219.239z'/%3E%3Cpath d='M342.196,217.768c28.952,17.017,70.552-0.073,92.926-38.154c22.374-38.106,17.041-82.758-11.915-99.774 c-28.951-17.001-70.56,0.097-92.93,38.178C307.905,156.117,313.245,200.768,342.196,217.768z'/%3E%3Cpath d='M497.259,262.912c-18.771-27.271-63.07-29.379-98.954-4.694c-35.892,24.701-49.762,66.822-30.996,94.101 c18.766,27.27,63.069,29.38,98.954,4.686C502.143,332.312,516.021,290.191,497.259,262.912z'/%3E%3Cpath d='M304.511,268.059c-3.58-24.773-18.766-47.366-43.039-58.824c-24.268-11.45-51.365-8.807-72.758,4.169 c-23.646,14.35-38.772,33.096-59.138,41.29c-20.363,8.193-77.4-16.209-112.912,48.278c-25.081,45.548-2.057,103.128,44.962,125.315 c35.738,16.864,64.023,14.981,84.788,24.774c20.762,9.793,37.29,32.83,73.025,49.692c47.018,22.188,106.1,3.362,125.315-44.957 c27.206-68.407-27.897-96.922-34.522-117.85C303.613,319.021,308.47,295.426,304.511,268.059z'/%3E%3C/g%3E%3C/mask%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='white' mask='url(%23pawMaskHost)'/%3E%3C/svg%3E");
      background-size: 150px 150px;
      animation: scrollPawTemplate_host 15s linear infinite;
      z-index: -1;
      pointer-events: none;
    }

    @keyframes anim_bg_host {
      0% { --hue1: 0deg; --hue2: 300deg; }
      100% { --hue1: 360deg; --hue2: 660deg; }
    }
    @keyframes fallingPaws_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 0px 600px; }
    }
    @keyframes scrollPawTemplate_host {
        0% { background-position: 0px 0px; }
        100% { background-position: 300px 300px; }
    }
    @keyframes rainbowRotate {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes pawWiggleAbsolute {
      0%, 100% { transform: translate(-50%, -50%) rotate(-5deg) scale(1); }
      50% { transform: translate(-50%, -50%) rotate(5deg) scale(1.05); }
    }
    @keyframes fadeInOut {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 1; }
    }
    @keyframes spin-yarn {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    @keyframes clickSparkle {
      0% { opacity: 0; transform: scale(0); }
      50% { opacity: 1; transform: scale(1.2); }
      100% { opacity: 0; transform: scale(0.8); }
    }

    .paw-wrapper {
      position: relative;
      width: 100%;
      max-width: 45rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      z-index: 1;
      box-sizing: border-box;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .paw-wrapper.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .rainbow-circle {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 80vmin;
      height: 80vmin;
      max-width: 90vw;
      max-height: 90vh;
      z-index: -1;
      border-radius: 50%;
      padding: 6px;
      overflow: hidden;
    }
    .rainbow-circle::before {
      content: '';
      display: block;
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: conic-gradient(from 0deg at 50% 50%, transparent 50%, #fff845, #1cc98c, #24cbde, #57a9f7, #bd52f9, #ebb347);
      animation: rainbowRotate 4s linear infinite;
      z-index: -1;
    }
    .circle-content {
      width: 100%;
      height: 100%;
      background: #fffefa;
      border-radius: 50%;
      position: relative;
      z-index: 1;
      box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.1);
    }

    .container-invisible {
      background: transparent;
      position: relative;
      z-index: 1;
      width: 100%;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: auto;
      box-sizing: border-box;
    }

    .title-container {
      position: relative;
      display: block;
      width: 100%;
      z-index: 1;
      margin-bottom: 0;
      text-align: center;
      line-height: 0.9;
    }
    .title-shadow {
      font-family: 'Pacifico', cursive;
      text-shadow: 2px 2px 0px rgba(255, 255, 255, 0.8), 4px 4px 6px rgba(0, 0, 0, 0.1);
      font-size: clamp(3rem, 16vmin, 11rem);
      position: relative;
      z-index: 1;
      margin: 0;
      color: #ea580c;
      display: block;
      word-break: break-word;
      overflow-wrap: break-word;
      hyphens: auto;
    }

    .title-ampersand {
      font-family: 'Pacifico', cursive;
      font-size: clamp(1.8rem, 11vmin, 5.4rem);
      color: #000000;
      position: fixed;
      top: 48.6%;
      left: 50%;
      transform-origin: center center;
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      z-index: 3;
      pointer-events: none;
      transition: opacity 0.5s ease-out, visibility 0s linear 0.5s;
      opacity: 1;
      visibility: visible;
    }
    .title-ampersand.content-hidden {
      opacity: 0;
      visibility: hidden;
    }

    .animate-paw-wiggle {
      animation: pawWiggleAbsolute 1.5s ease-in-out infinite;
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: center center;
      font-size: clamp(15rem, 60vmin, 30rem);
      line-height: 1;
      z-index: 0;
      pointer-events: none;
    }
    .animate-paw-wiggle.paw-1 {
      color: #ffffff;
      text-shadow: 0 0 15px #fb7185, 0 0 25px #fb7185, 0 0 40px #f472b6;
      transform: translate(-50%, -50%) rotate(-10deg) scale(1);
    }
    .animate-paw-wiggle.paw-2 {
      color: #fb7185;
      opacity: 0.5;
      text-shadow: none;
      transform: translate(-50%, -50%) rotate(15deg) scale(0.95);
      animation-delay: 0.3s;
    }

    .fading-click-text {
      font-family: 'Poppins', sans-serif;
      font-size: clamp(1rem, 4vmin, 1.8rem);
      font-weight: 700;
      color: #000000;
      text-transform: uppercase;
      margin-top: 1.5rem;
      animation: fadeInOut 2.5s infinite ease-in-out;
      position: relative;
      z-index: 1;
    }

    .loading-message-container {
      display: none;
      opacity: 0;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 5;
      transition: opacity 0.3s ease-in;
    }
    .loading-message-container.visible {
      display: flex;
      opacity: 1;
    }

    .yarn-spinner {
      width: clamp(25px, 8vmin, 40px);
      height: clamp(25px, 8vmin, 40px);
      border: clamp(3px, 1.5vmin, 6px) dotted #f97316;
      border-radius: 50%;
      display: inline-block;
      animation: spin-yarn 1.3s linear infinite;
      margin-bottom: 0.5rem;
    }
    .loading-text {
      font-family: "Geist", sans-serif;
      font-size: clamp(1rem, 4vmin, 1.5rem);
      font-weight: 600;
      color: #c2410c;
    }

    #sparkle-container-internal {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 2;
      overflow: hidden;
    }
    .sparkle-instance {
      position: absolute;
      width: clamp(25px, 10vmin, 50px);
      height: clamp(25px, 10vmin, 50px);
      opacity: 0;
      transform: scale(0);
      pointer-events: none;
      z-index: inherit;
      transition: none;
      animation: clickSparkle 0.5s ease-out forwards;
    }

    @media (max-width: 480px) {
      .animate-paw-wiggle.paw-2 {
        display: none;
      }
      :host::before {
        background-size: 90px 90px;
        opacity: 0.3;
      }
      :host::after {
        background-size: 100px 100px;
      }
    }
  `;re([L({type:Object})],te.prototype,"gameData",2);re([L({type:Array})],te.prototype,"loadingMessages",2);re([R()],te.prototype,"_isLoading",2);re([R()],te.prototype,"_contentFadingOut",2);re([R()],te.prototype,"_currentLoadingMessage",2);re([j("#sparkle-container-internal")],te.prototype,"_sparkleContainer",2);re([j("#sparkle-svg-template-internal")],te.prototype,"_sparkleSvgTemplate",2);re([j(".paw-wrapper")],te.prototype,"_pawWrapper",2);re([j(".title-ampersand")],te.prototype,"_titleAmpersand",2);re([j(".loading-message-container")],te.prototype,"_loadingMessageContainer",2);te=re([V("main-menu-screen")],te);class ma{constructor(e){this.startListener=null,this.containerElement=null,this.gameManager=e}enter(e){if(console.log("MainMenuState: enter",e),this.gameManager.setBodyStateClass("mainmenu-whiskers"),this.containerElement=this.gameManager.getContainerElement(),!this.containerElement){console.error("MainMenuState: Contenedor principal #app no encontrado.");return}this.containerElement.innerHTML="";const a=document.createElement("main-menu-screen");a.loadingMessages=this.gameManager.getLoadingMessages(),this.containerElement.appendChild(a),this.startListener=async()=>{var o;console.log("MainMenuState: Evento 'start-game-requested' recibido desde <main-menu-screen>.");try{this.gameManager.getAudioManager()?(await this.gameManager.getAudioManager().tryResumeContext(),console.log("MainMenuState: Intento de reanudación del AudioContext completado.")):console.warn("MainMenuState: AudioManager no está disponible para reanudar el contexto.")}catch(i){console.error("MainMenuState: Error al intentar reanudar el AudioContext:",i)}this.gameManager.getAudioManager().playSound("ui_confirm"),this.removeStartListeners(),this.gameManager.start(),this.gameManager.getStateMachine().changeState("QuizGameplay",void 0,((o=this.getPreferredExitAnimation)==null?void 0:o.call(this))??"default-animation")},a.addEventListener("start-game-requested",this.startListener,{once:!0}),console.log("MainMenuState: Listener 'start-game-requested' (async) añadido a <main-menu-screen>.")}removeStartListeners(){var a;const e=(a=this.containerElement)==null?void 0:a.querySelector("main-menu-screen");e&&this.startListener&&e.removeEventListener("start-game-requested",this.startListener),this.startListener=null}exit(){console.log("MainMenuState: exit"),this.removeStartListeners()}update(e){}getPreferredExitAnimation(){return"gq-wipe-transition"}getPreferredEnterAnimation(){return"gq-wipe-transition"}}var zo=Object.defineProperty,Lo=Object.getOwnPropertyDescriptor,Pe=(h,e,a,o)=>{for(var i=o>1?void 0:o?Lo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&zo(e,a,i),i};let ge=class extends B{constructor(){super(),this.isFaded=!1,console.log("QuizUiContainer: Constructor - Elemento creado pero aún no en DOM o actualizado.")}connectedCallback(){super.connectedCallback(),console.log("QuizUiContainer: connectedCallback - Elemento conectado al DOM.")}firstUpdated(){console.log("QuizUiContainer: firstUpdated INICIADO."),console.log("QuizUiContainer: Elementos internos post-@query:"),console.log("  _topUiContainer:",this._topUiContainer),console.log("  _statusRow (dentro de topUiContainer):",this._statusRow),console.log("  _inkArea (dentro de topUiContainer):",this._inkArea),console.log("  _quizContentWrapper:",this._quizContentWrapper),console.log("  _optionsContainer (dentro de quizContentWrapper y quizScrollableContent):",this._optionsContainer),console.log("QuizUiContainer: firstUpdated FINALIZADO.")}render(){return console.log("QuizUiContainer: render() llamado."),$`
      <div class="top-ui-container-internal" part="top-ui-container">
        <div class="status-row-internal" part="status-row">
            <slot name="lives-display"></slot>
            <slot name="score-display"></slot>
        </div>
        <div class="ink-area-internal" part="ink-area">
            <slot name="ink-label"></slot>
            <slot name="ink-bar"></slot>
        </div>
      </div>

      <div class="quiz-content-wrapper-internal" part="quiz-content-wrapper">
        <div class="quiz-scrollable-content-internal" part="quiz-scrollable-content">
          <slot name="question-display"></slot>
          <div class="options-container-internal" part="options-container">
            <slot name="options"></slot> 
            </div>
          <slot name="feedback-area"></slot>
        </div>
      </div>
    `}};ge.styles=Q`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: fixed; 
      top: 7vh; 
      left: 50%; 
      transform: translateX(-50%); 
      width: 90%;
      max-width: 600px;
      box-sizing: border-box;
      padding: 0 1rem;
      background-color: transparent; /* El fondo real lo dará el tema o los elementos internos */
      transition: opacity 0.25s ease-in-out;
      pointer-events: auto;
      z-index: 20; 
    }

    :host([isFaded]) {
      opacity: 0.3;
      pointer-events: none;
    }

    .top-ui-container-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 1rem; /* Espacio antes del contenido principal del quiz */
      flex-shrink: 0; /* Evitar que este contenedor se encoja */
    }

    .status-row-internal {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 0;
        gap: 0.5rem;
    }
    
    .ink-area-internal {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.2rem;
        margin-top: 0.5rem;
        min-height: 2rem; /* Espacio reservado para etiqueta de tinta y barra */
    }

    .quiz-content-wrapper-internal {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto; /* Permitir scroll si el contenido de la pregunta+opciones es muy largo */
      /* max-height calculado para permitir scroll sin que el contenedor entero se mueva */
      /* (95vh total viewport - 7vh (top de :host) - 1rem (padding :host) - X (espacio para top-ui) - Y (espacio para feedback)) */
      /* Es un cálculo aproximado, ajustar X e Y según sea necesario. */
      /* Podríamos usar flex-grow: 1 en este wrapper y overflow en el :host si fuera más simple */
      max-height: calc(93vh - 7vh - 2rem - 5rem); /* Ejemplo: 93vh - top - padding - (altura aprox top-ui + feedback) */
      scrollbar-width: thin; 
      scrollbar-color: rgba(150,150,150,0.5) transparent; 
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar {
        width: 8px;
    }
    .quiz-content-wrapper-internal::-webkit-scrollbar-thumb {
        background-color: rgba(150,150,150,0.5);
        border-radius: 4px;
    }
     .quiz-content-wrapper-internal::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Este es el contenedor real donde QuizUIManager pondrá el question-display y options-container */
    .quiz-scrollable-content-internal {
      width: 100%;
      padding: var(--gq-scrollable-content-glow-padding, 5px); 
      box-sizing: border-box;
      display: flex; /* Para permitir que question-display y options-container se apilen verticalmente */
      flex-direction: column;
      align-items: center;
    }

    /* Este div .options-container-internal es el que QuizUIManager busca por clase */
    .options-container-internal {
      display: flex;
      flex-direction: column;
      gap: var(--gq-options-gap, 0.75rem);
      width: 100%;
      margin-top: var(--gq-options-margin-top, 1rem);
      margin-bottom: var(--gq-options-margin-bottom, 1rem);
    }

    @media (max-width: 768px) {
      :host {
        padding: 0 0.5rem;
        width: calc(100% - 1rem); 
      }
       .quiz-content-wrapper-internal {
         max-height: calc(93vh - 7vh - 1rem - 5rem); /* Ajustar padding para tablet */
       }
    }
     @media (max-width: 480px) {
       .quiz-content-wrapper-internal {
         max-height: calc(95vh - 7vh - 1rem - 4rem); /* Ajustar para móvil, quizá menos espacio para top-ui */
       }
     }
  `;Pe([L({type:Boolean,reflect:!0})],ge.prototype,"isFaded",2);Pe([j(".top-ui-container-internal")],ge.prototype,"_topUiContainer",2);Pe([j(".status-row-internal")],ge.prototype,"_statusRow",2);Pe([j(".ink-area-internal")],ge.prototype,"_inkArea",2);Pe([j(".quiz-content-wrapper-internal")],ge.prototype,"_quizContentWrapper",2);Pe([j(".options-container-internal")],ge.prototype,"_optionsContainer",2);ge=Pe([V("quiz-ui-container")],ge);class kt{constructor(e){this.quizModule=null,this.uiHostElement=null,this.gameManager=e,console.log("[QuizGameplayState] Constructor llamado.")}async enter(e){console.log("[QuizGameplayState] enter() INICIADO. Params:",e),this.gameManager.setBodyStateClass("quizgameplay");const a=this.gameManager.getContainerElement();if(!a){console.error("[QuizGameplayState] CRÍTICO: No se pudo obtener el contenedor principal #app de GameManager. Transicionando a MainMenu."),this.gameManager.getStateMachine().changeState("MainMenu");return}console.log("[QuizGameplayState] Contenedor principal #app obtenido:",a),a.innerHTML="",console.log("[QuizGameplayState] Contenido de #app limpiado.");try{console.log("[QuizGameplayState] Creando elemento <quiz-ui-container>..."),this.uiHostElement=document.createElement("quiz-ui-container"),console.log("[QuizGameplayState] uiHostElement CREADO:",this.uiHostElement)}catch(o){console.error("[QuizGameplayState] CRÍTICO: Error al crear el elemento <quiz-ui-container>.",o),this.gameManager.getStateMachine().changeState("MainMenu");return}a.appendChild(this.uiHostElement),console.log("[QuizGameplayState] uiHostElement AÑADIDO a mainAppContainer (#app)."),this.quizModule=new Mo,console.log("[QuizGameplayState] Instancia de QuizGameModule creada.");try{const o=this.gameManager.getEngineServices();if(!o)throw new Error("EngineServices no están disponibles desde GameManager en QuizGameplayState.");console.log("[QuizGameplayState] EngineServices obtenidos."),console.log("[QuizGameplayState] Llamando a quizModule.loadData()..."),await this.quizModule.loadData(null),console.log("[QuizGameplayState] quizModule.loadData() completado."),console.log("[QuizGameplayState] Llamando a quizModule.initialize(). uiHostElement pasado:",this.uiHostElement),await this.quizModule.initialize(o,this.uiHostElement),console.log("[QuizGameplayState] quizModule.initialize() completado."),console.log("[QuizGameplayState] Llamando a quizModule.start()."),this.quizModule.start(),console.log("[QuizGameplayState] quizModule.start() llamado.")}catch(o){console.error("[QuizGameplayState] CRÍTICO: Error inicializando o iniciando QuizGameModule:",o),this.uiHostElement&&a.contains(this.uiHostElement)&&(a.removeChild(this.uiHostElement),console.log("[QuizGameplayState] uiHostElement removido de #app debido a error.")),this.uiHostElement=null,this.gameManager.getStateMachine().changeState("MainMenu");return}console.log("[QuizGameplayState] enter() FINALIZADO exitosamente.")}exit(){var e;console.log("[QuizGameplayState] exit() INICIADO."),this.quizModule&&(console.log("[QuizGameplayState] Llamando a quizModule.destroy()."),this.quizModule.destroy(),this.quizModule=null,console.log("[QuizGameplayState] quizModule destruido y seteado a null.")),this.uiHostElement&&console.log("[QuizGameplayState] uiHostElement existe en exit. Será manejado por StateMachine/transición."),this.uiHostElement=null,(e=this.gameManager.getGlobalUIManager())==null||e.setModuleUIsFaded(!1),console.log("[QuizGameplayState] exit() FINALIZADO.")}update(e){this.quizModule&&this.quizModule.update(e)}rebuildInterface(){if(console.log("[QuizGameplayState] rebuildInterface() llamado."),this.quizModule&&typeof this.quizModule.rebuildUI=="function")console.log("[QuizGameplayState] Llamando a quizModule.rebuildUI()."),this.quizModule.rebuildUI();else if(this.quizModule&&this.quizModule.quizUIManager&&typeof this.quizModule.quizUIManager.buildQuizInterface=="function"){console.warn("[QuizGameplayState] rebuildInterface: Módulo no tiene rebuildUI, intentando llamar a quizUIManager.buildQuizInterface.");const e=this.quizModule;if(e.currentQuestion&&this.uiHostElement){console.log(`[QuizGameplayState]   Reconstruyendo UI con pregunta actual: ${e.currentQuestion.id}`),e.quizUIManager.buildQuizInterface(e.currentQuestion,e.handleOptionClick.bind(e),e.consecutiveCorrectAnswers);const a=this.gameManager.getPlayerData();e.hintAppliedToQuestionId===e.currentQuestion.id&&a.hintCharges>0&&(console.log("[QuizGameplayState]   Re-aplicando visuales de pista."),e.quizUIManager.applyHintVisuals(e.currentQuestion.correctAnswerKey)),e.isWaitingForExplanationConfirm&&e.currentQuestion.explanation&&(console.log("[QuizGameplayState]   Re-mostrando explicación."),e.quizUIManager.showExplanation(e.currentQuestion.explanation,()=>{e.proceedToNextStep()},e.lastAnswerResultType))}else console.warn("[QuizGameplayState]   No se pudo reconstruir: falta currentQuestion o uiHostElement.")}else console.warn("[QuizGameplayState] No se puede reconstruir, módulo de quiz o su UIManager no está configurado correctamente para ello.")}getPreferredEnterAnimation(){return"gq-wipe-transition"}getPreferredExitAnimation(){return"gq-wipe-transition"}}var _o=Object.defineProperty,Oo=Object.getOwnPropertyDescriptor,at=(h,e,a,o)=>{for(var i=o>1?void 0:o?Oo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&_o(e,a,i),i};let Te=class extends B{constructor(){super(...arguments),this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1}_handleContinueClick(){this.dispatchEvent(new CustomEvent("continue-requested",{bubbles:!0,composed:!0}))}render(){const h=this.totalQuestions>0?(this.correctAnswers/this.totalQuestions*100).toFixed(0):0;return $`
      <h1 class="results-title">Resultados</h1>
      <div class="stats-container">
        <div class="stat-item">
          <span class="stat-label">Puntaje Final</span>
          <span class="stat-value score">${this.finalScore}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Precisión</span>
          <span class="stat-value accuracy">${h}%</span>
          <span class="stat-label" style="font-size: 0.8rem; color: #6b7280;">(${this.correctAnswers} / ${this.totalQuestions})</span>
        </div>
      </div>
      ${this.isNewHighScore?$`
        <span class="new-highscore-indicator">¡Nuevo Récord! 🏆</span>
      `:""}
      <button class="action-button continue-button" @click=${this._handleContinueClick}>
        Continuar
      </button>
    `}};Te.styles=Q`
    :host {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      position: relative;
      padding: 2rem;
      box-sizing: border-box;
      text-align: center;
      background-color: var(--gq-results-bg, rgba(31, 41, 55, 0.95));
      color: var(--gq-results-text-color, #e5e7eb);
      font-family: var(--gq-results-font-primary, var(--gq-font-primary, 'Poppins', sans-serif));
      gap: 1.5rem;
      -webkit-tap-highlight-color: transparent;
    }

    .results-title {
      font-family: var(--gq-results-font-display, var(--gq-font-display, 'Pacifico', cursive));
      font-size: clamp(2.8rem, 14vmin, 5.5rem);
      color: var(--gq-results-title-color, #6ee7b7);
      text-shadow: 1px 1px 4px rgba(0,0,0,0.4); /* Podría ser variable: --gq-results-title-shadow */
      margin-bottom: 0.5rem;
      line-height: 1.1;
    }

    .stats-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      background-color: var(--gq-results-stats-bg, rgba(17, 24, 39, 0.6));
      padding: 1.5rem 2rem;
      border-radius: 0.75rem; /* Variable: --gq-results-stats-border-radius */
      border: var(--gq-results-stats-border, 1px solid #4b5563);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.2rem;
    }

    .stat-label {
      font-size: 1rem;
      font-weight: 600;
      color: var(--gq-results-stat-label-color, #9ca3af);
    }

    .stat-value {
      font-size: clamp(1.8rem, 7vmin, 2.8rem);
      font-weight: 700;
      line-height: 1;
    }

    .stat-value.score { color: var(--gq-results-stat-value-score-color, #facc15); }
    .stat-value.accuracy { color: var(--gq-results-stat-value-accuracy-color, #6ee7b7); }

    .new-highscore-indicator {
      font-size: 1rem; font-weight: 700;
      color: var(--gq-results-highscore-text-color, var(--gq-gameover-highscore-text-color, #4ade80));
      background-color: var(--gq-results-highscore-bg, var(--gq-gameover-highscore-bg, rgba(16, 185, 129, 0.2)));
      padding: 0.3rem 0.8rem; border-radius: 0.5rem;
      border: var(--gq-results-highscore-border, var(--gq-gameover-highscore-border, 1px solid #34d399));
      margin-top: 1rem;
      animation: pulseGreenResults 1.8s infinite ease-in-out; /* Podría usar la misma anim de gameover */
    }

    @keyframes pulseGreenResults {
      0%, 100% { transform: scale(1); box-shadow: 0 0 5px var(--gq-results-highscore-glow-color, var(--gq-gameover-highscore-glow-color, rgba(74, 222, 128, 0.5))); }
      50% { transform: scale(1.05); box-shadow: 0 0 10px var(--gq-results-highscore-glow-color-pulse, var(--gq-gameover-highscore-glow-color-pulse, rgba(74, 222, 128, 0.8))); }
    }
    
    .continue-button {
      font-family: var(--gq-results-continue-btn-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-size: var(--gq-results-continue-btn-font-size, 1.1rem);
      font-weight: var(--gq-results-continue-btn-font-weight, 600);
      padding: var(--gq-results-continue-btn-padding, 0.9rem 2rem);
      border-radius: var(--gq-results-continue-btn-border-radius, 0.5rem);
      border: none;
      cursor: pointer; 
      transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
      box-shadow: var(--gq-results-continue-btn-box-shadow, 0 3px 6px rgba(0,0,0,0.2));
      background-color: var(--gq-results-continue-btn-bg, #60a5fa);
      color: var(--gq-results-continue-btn-text-color, #1e3a8a);
      margin-top: 1rem;
      -webkit-tap-highlight-color: transparent;
    }
    .continue-button:hover {
       transform: var(--gq-results-continue-btn-hover-transform, translateY(-2px));
       box-shadow: var(--gq-results-continue-btn-hover-box-shadow, 0 5px 10px rgba(0,0,0,0.3));
       background-color: var(--gq-results-continue-btn-hover-bg, #93c5fd);
    }
     .continue-button:active {
       transform: var(--gq-results-continue-btn-active-transform, translateY(0px) scale(0.98));
       box-shadow: var(--gq-results-continue-btn-active-box-shadow, 0 2px 4px rgba(0,0,0,0.2));
    }

     @media (max-width: 480px) {
        :host { gap: 1rem; padding: 1.5rem 1rem; }
        .results-title { font-size: clamp(2.2rem, 12vmin, 4.5rem); }
        .stats-container { padding: 1rem 1.5rem; gap: 0.8rem; }
        .stat-label { font-size: 0.9rem; }
        .stat-value { font-size: clamp(1.5rem, 6vmin, 2.2rem); }
        .new-highscore-indicator { font-size: 0.9rem; margin-top: 0.8rem; }
        .continue-button { 
            width: 80%; 
            font-size: var(--gq-results-continue-btn-mobile-font-size, 1rem);
            padding: var(--gq-results-continue-btn-mobile-padding, 0.8rem 1.5rem);
        }
     }
  `;at([L({type:Number})],Te.prototype,"finalScore",2);at([L({type:Number})],Te.prototype,"correctAnswers",2);at([L({type:Number})],Te.prototype,"totalQuestions",2);at([L({type:Boolean})],Te.prototype,"isNewHighScore",2);Te=at([V("results-screen")],Te);class $o{constructor(e){this.finalScore=0,this.correctAnswers=0,this.totalQuestions=0,this.isNewHighScore=!1,this.resultsScreenElement=null,this.continueHandler=null,this.gameManager=e}enter(e){console.log("ResultsState: enter",e),this.finalScore=(e==null?void 0:e.score)??0,this.correctAnswers=(e==null?void 0:e.correct)??0,this.totalQuestions=(e==null?void 0:e.total)??0,this.isNewHighScore=(e==null?void 0:e.isNewHighScore)??!1,this.gameManager.setBodyStateClass("results");const a=this.gameManager.getContainerElement();if(!a){console.error("ResultsState: Contenedor principal no encontrado.");return}a.innerHTML="",this.resultsScreenElement=document.createElement("results-screen"),this.resultsScreenElement.finalScore=this.finalScore,this.resultsScreenElement.correctAnswers=this.correctAnswers,this.resultsScreenElement.totalQuestions=this.totalQuestions,this.resultsScreenElement.isNewHighScore=this.isNewHighScore,this.continueHandler=()=>{console.log("ResultsState: Evento 'continue-requested' recibido."),this.gameManager.getAudioManager().playSound("ui_confirm"),this.gameManager.getStateMachine().changeState("MainMenu",void 0,"gq-wipe-transition")},this.resultsScreenElement.addEventListener("continue-requested",this.continueHandler),a.appendChild(this.resultsScreenElement),this.gameManager.getAudioManager().playSound("level_complete")}exit(){console.log("ResultsState: exit"),this.resultsScreenElement&&this.continueHandler&&this.resultsScreenElement.removeEventListener("continue-requested",this.continueHandler),this.resultsScreenElement=null,this.continueHandler=null}update(e){}}var Bo=Object.defineProperty,Uo=Object.getOwnPropertyDescriptor,Ia=(h,e,a,o)=>{for(var i=o>1?void 0:o?Uo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Bo(e,a,i),i};let gt=class extends B{firstUpdated(){this._internalContainer||console.error("CatDisplayArea: El contenedor interno '.entities-host-container' no fue encontrado en el shadow DOM después del primer renderizado.")}addEntityElement(h){this._internalContainer?this._internalContainer.appendChild(h):console.error("CatDisplayArea: _internalContainer no está disponible. No se pudo añadir el elemento:",h)}removeEntityElement(h){var e;this._internalContainer&&this._internalContainer.contains(h)?this._internalContainer.removeChild(h):(e=this.shadowRoot)!=null&&e.contains(h)&&(console.warn("CatDisplayArea: Elemento no encontrado en _internalContainer, intentando remover del shadowRoot."),this.shadowRoot.removeChild(h))}clearAllEntityElements(){this._internalContainer?(this._internalContainer.innerHTML="",console.log("CatDisplayArea: Todos los elementos de entidad han sido limpiados.")):console.warn("CatDisplayArea: _internalContainer no disponible al intentar clearAllEntityElements.")}getInternalContainer(){return this._internalContainer||null}render(){return $`
      <div class="entities-host-container">
        </div>
    `}};gt.styles=Q`
    :host {
      display: block;
      position: fixed; /* Ocupa toda la pantalla y está detrás de otros elementos UI */
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /* Permite eventos de puntero por defecto. 
        Esto es importante para que Matter.js MouseConstraint funcione si se adjunta aquí,
        o para que los eventos de clic para soltar comida (si se manejan aquí) funcionen.
        Los elementos individuales de gato (cat-entity-display) tendrán su propio pointer-events: auto.
      */
      pointer-events: auto; 
      z-index: var(--gq-cat-display-z-index, 10); /* Ajusta según sea necesario, debe estar detrás de la UI principal */
      overflow: hidden; /* Evita barras de scroll si los gatos se salen un poco */
    }

    .entities-host-container {
      width: 100%;
      height: 100%;
      position: relative; /* Necesario para posicionar los gatos absolutamente dentro */
      /* Si este contenedor necesita ser clickeable (ej. para soltar comida), 
        asegúrate que no esté cubierto por otros elementos transparentes
        que bloqueen los clics.
      */
    }
  `;Ia([j(".entities-host-container")],gt.prototype,"_internalContainer",2);gt=Ia([V("cat-display-area")],gt);var Ro=Object.defineProperty,Fo=Object.getOwnPropertyDescriptor,Bt=(h,e,a,o)=>{for(var i=o>1?void 0:o?Fo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ro(e,a,i),i};let Ke=class extends B{constructor(){super(...arguments),this.titleText="Abrir Tienda (S)",this.disabled=!1}render(){return $`
      <button
        class="shop-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        </button>
    `}_handleClick(h){h.type==="touchstart"&&h.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("shop-button-interaction",{bubbles:!0,composed:!0}))}};Ke.styles=Q`
    :host {
      /* --- INICIO: Posicionamiento Fijo (Se mantiene) --- */
      position: fixed;
      top: var(--gq-shopbtn-pos-top, 0.8rem); /* Ajustado para estar más arriba */
      right: var(--gq-shopbtn-pos-right, 0.8rem); /* Ajustado */
      z-index: var(--gq-shopbtn-z-index, 31);
      pointer-events: auto;
      /* --- FIN: Posicionamiento Fijo --- */

      display: inline-flex;
      justify-content: center;
      align-items: center;
      /* --- INICIO: Estilos de Apariencia (Usando vars --gq-toolbtn como fallback/base) --- */
      width: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem)); /* Usa var de toolbtn como fallback */
      height: var(--gq-shopbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-shopbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      color: var(--gq-shopbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-shopbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-shopbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-shopbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-shopbtn-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
      /* --- FIN: Estilos de Apariencia --- */
    }

    .shop-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Contenido del icono (se mantiene igual) */
    .shop-button-internal::before {
      content: var(--gq-shop-button-icon-content, '🛒'); /* Icono por defecto */
      font-family: var(--gq-shop-button-font-family, inherit);
    }

    /* Hover (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-shopbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-shopbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280)));
      /* Opcional: Añadir un ligero scale en hover si se desea */
      /* transform: scale(1.05); */
    }

    /* Active (presionado) (usando vars de toolbtn como fallback) */
    :host(:not([disabled]):active) {
      transform: scale(0.95); /* Similar a tool-button */
      background-color: var(--gq-shopbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars de toolbtn como fallback) */
    :host([disabled]) {
      opacity: var(--gq-shopbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))));
      border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border, 2px solid #4b5563)));
      box-shadow: var(--gq-shopbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-shopbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-shopbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- INICIO: Media Queries (Adaptado de tool-button) --- */
    /* Desktop/Tablet (usando vars desktop de toolbtn como fallback) */
    @media (min-width: 769px) { /* Umbral mayor para asegurar que no choque con los controles centrales en tablet */
      :host {
        width: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-shopbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-shopbtn-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-shopbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
         /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-desktop, var(--gq-shopbtn-pos-top, 0.8rem));
        right: var(--gq-shopbtn-pos-right-desktop, var(--gq-shopbtn-pos-right, 0.8rem));
      }
    }

    /* Tablet (puede heredar de base o usar vars específicas si existen) */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir --gq-shopbtn-size-tablet, etc. si es necesario */
            /* Mantener posición fija */
            top: var(--gq-shopbtn-pos-top-tablet, var(--gq-shopbtn-pos-top, 0.6rem));
            right: var(--gq-shopbtn-pos-right-tablet, var(--gq-shopbtn-pos-right, 0.6rem));
        }
     }

    /* Móvil (usando vars mobile de toolbtn como fallback) */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        height: var(--gq-shopbtn-size-mobile, var(--gq-toolbtn-size, 3rem));
        font-size: var(--gq-shopbtn-font-size-mobile, var(--gq-toolbtn-font-size, 1.1rem));
        padding: var(--gq-shopbtn-padding-mobile, var(--gq-toolbtn-padding, 0.5rem));
        /* Mantener posición fija */
        top: var(--gq-shopbtn-pos-top-mobile, 0.1rem);
        right: var(--gq-shopbtn-pos-right-mobile, 0.1rem);
      }
    }
    /* --- FIN: Media Queries --- */
  `;Bt([L({type:String})],Ke.prototype,"titleText",2);Bt([L({type:Boolean,reflect:!0})],Ke.prototype,"disabled",2);Ke=Bt([V("shop-button-component")],Ke);var No=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,xt=(h,e,a,o)=>{for(var i=o>1?void 0:o?Qo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&No(e,a,i),i};let Be=class extends B{constructor(){super(...arguments),this.titleText="Abrir Opciones (O)",this.disabled=!1,this.icon="⚙️"}render(){return $`
      <button
        class="options-button-internal"
        title=${this.titleText}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText}
        tabindex="0"
      >
        ${this.icon}
      </button>
    `}_handleClick(h){h.type==="touchstart"&&h.preventDefault(),!this.disabled&&this.dispatchEvent(new CustomEvent("options-button-clicked",{bubbles:!0,composed:!0}))}};Be.styles=Q`
    :host {
      position: fixed; /* Posicionamiento fijo */
      /* Por defecto: Esquina superior izquierda */
      top: var(--gq-optionsbtn-pos-top, 0.8rem);
      left: var(--gq-optionsbtn-pos-left, 0.8rem);
      /* Si quisieras que por defecto sea bottom-left, cambiarías 'top' por 'bottom' */
      /* bottom: var(--gq-optionsbtn-pos-bottom, 0.8rem); */
      /* left: var(--gq-optionsbtn-pos-left, 0.8rem); */

      z-index: var(--gq-optionsbtn-z-index, 31); /* Similar a shop-button */
      pointer-events: auto;

      /* Estilos base tomados de tool-button/shop-button */
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      height: var(--gq-optionsbtn-size, var(--gq-toolbtn-size, 3rem));
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-optionsbtn-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8))); /* Variable específica con fallback a toolbtn */
      color: var(--gq-optionsbtn-text-color, var(--gq-toolbtn-text-color, #e5e7eb));
      border: var(--gq-optionsbtn-border, var(--gq-toolbtn-border, 2px solid #4b5563));
      border-radius: var(--gq-optionsbtn-border-radius, var(--gq-toolbtn-border-radius, 0.5rem));
      padding: var(--gq-optionsbtn-padding, var(--gq-toolbtn-padding, 0.5rem));
      font-size: var(--gq-optionsbtn-icon-font-size, var(--gq-toolbtn-font-size, 1.1rem));
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-optionsbtn-box-shadow, var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3)));
    }

    .options-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
    }

    /* Hover (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):hover) {
      background-color: var(--gq-optionsbtn-hover-bg, var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9)));
      border-color: var(--gq-optionsbtn-hover-border-color, var(--gq-toolbtn-hover-border-color, #6b7280));
    }

    /* Active (presionado) (usando vars específicas con fallback a toolbtn) */
    :host(:not([disabled]):active) {
      transform: scale(0.95);
      background-color: var(--gq-optionsbtn-pressed-bg, var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9)));
    }

    /* Estado deshabilitado (usando vars específicas con fallback a toolbtn) */
    :host([disabled]) {
      opacity: var(--gq-optionsbtn-disabled-opacity, var(--gq-toolbtn-disabled-opacity, 0.5));
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
      border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border)));
    }
     :host([disabled]:hover) {
       background-color: var(--gq-optionsbtn-disabled-bg, var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg)));
       border-color: var(--gq-optionsbtn-disabled-border-color, var(--gq-toolbtn-disabled-border-color));
     }

    /* --- Media Queries para Posicionamiento y Tamaño --- */
    /* Desktop (769px en adelante) - Esquina Superior Izquierda por defecto */
    @media (min-width: 769px) {
      :host {
        width: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        height: var(--gq-optionsbtn-desktop-size, var(--gq-toolbtn-desktop-size, 3.5rem));
        font-size: var(--gq-optionsbtn-icon-desktop-font-size, var(--gq-toolbtn-desktop-font-size, 1.2rem));
        padding: var(--gq-optionsbtn-desktop-padding, var(--gq-toolbtn-desktop-padding, 0.6rem));
        
        /* Replicar valores de shopbtn-pos-top-desktop y shopbtn-pos-right-desktop pero para top y left */
        top: var(--gq-optionsbtn-pos-top-desktop, var(--gq-shopbtn-pos-top-desktop, 0.8rem));
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem)); /* Usa el valor de 'right' del shop button para 'left' */
        /* Si necesitas que esté en otra esquina, ajusta top/left/bottom/right aquí */
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-desktop, var(--gq-shopbtn-pos-bottom-desktop, 0.8rem)); 
        left: var(--gq-optionsbtn-pos-left-desktop, var(--gq-shopbtn-pos-right-desktop, 0.8rem));
        top: auto; right: auto; 
        */
      }
    }

    /* Tablet (481px a 768px) - Esquina Superior Izquierda por defecto */
     @media (min-width: 481px) and (max-width: 768px) {
        :host {
            /* Usar valores base o definir vars específicas para tablet */
            width: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            height: var(--gq-optionsbtn-tablet-size, var(--gq-toolbtn-size, 3rem));
            font-size: var(--gq-optionsbtn-icon-tablet-font-size, var(--gq-toolbtn-font-size, 1.1rem));
            padding: var(--gq-optionsbtn-tablet-padding, var(--gq-toolbtn-padding, 0.5rem));

            /* Replicar valores de shopbtn-pos-top-tablet y shopbtn-pos-right-tablet pero para top y left */
            top: var(--gq-optionsbtn-pos-top-tablet, var(--gq-shopbtn-pos-top-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            /* Ejemplo para bottom-left:
            bottom: var(--gq-optionsbtn-pos-bottom-tablet, var(--gq-shopbtn-pos-bottom-tablet, 0.6rem));
            left: var(--gq-optionsbtn-pos-left-tablet, var(--gq-shopbtn-pos-right-tablet, 0.6rem));
            top: auto; right: auto;
            */
        }
     }

    /* Móvil (hasta 480px) - Esquina Superior Izquierda por defecto */
    @media (max-width: 480px) {
      :host {
        width: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem)); /* Ajustado para coincidir con shop-button */
        height: var(--gq-optionsbtn-mobile-size, var(--gq-toolbtn-size-mobile, 3rem));
        font-size: var(--gq-optionsbtn-icon-mobile-font-size, var(--gq-toolbtn-font-size-mobile, 1.1rem));
        padding: var(--gq-optionsbtn-mobile-padding, var(--gq-toolbtn-padding-mobile, 0.5rem));

        /* Replicar valores de shopbtn-pos-top-mobile y shopbtn-pos-right-mobile pero para top y left */
        top: var(--gq-optionsbtn-pos-top-mobile, var(--gq-shopbtn-pos-top-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        /* Ejemplo para bottom-left:
        bottom: var(--gq-optionsbtn-pos-bottom-mobile, var(--gq-shopbtn-pos-bottom-mobile, 0.1rem));
        left: var(--gq-optionsbtn-pos-left-mobile, var(--gq-shopbtn-pos-right-mobile, 0.1rem));
        top: auto; right: auto;
        */
      }
    }
  `;xt([L({type:String})],Be.prototype,"titleText",2);xt([L({type:Boolean,reflect:!0})],Be.prototype,"disabled",2);xt([L({type:String})],Be.prototype,"icon",2);Be=xt([V("options-button-component")],Be);var Vo=Object.defineProperty,Go=Object.getOwnPropertyDescriptor,Ue=(h,e,a,o)=>{for(var i=o>1?void 0:o?Go(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Vo(e,a,i),i};let ye=class extends B{constructor(){super(...arguments),this.isVisible=!1,this.initialVolume=1,this.initiallyMuted=!1,this._currentVolume=1,this._isMuted=!1}updated(h){super.updated(h),h.has("initialVolume")&&(this._currentVolume=this.initialVolume),h.has("initiallyMuted")&&(this._isMuted=this.initiallyMuted)}connectedCallback(){super.connectedCallback(),this.addEventListener("click",this._handleHostClick)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("click",this._handleHostClick)}_handleHostClick(h){h.target===this&&this._closePopup()}_handleVolumeChange(h){var a;const e=h.target;this._currentVolume=parseFloat(e.value),(a=this.audioManagerInstance)==null||a.setVolume(this._currentVolume),this._isMuted&&this._currentVolume>1e-5?this._isMuted=!1:!this._isMuted&&this._currentVolume<=1e-5&&(this._isMuted=!0),this.requestUpdate()}_toggleMute(){if(!this.audioManagerInstance)return;const h=!this._isMuted;this.audioManagerInstance.toggleMute(h),this._isMuted=this.audioManagerInstance.isMuted(),this._isMuted||(this._currentVolume=this.audioManagerInstance.getVolume(),this._currentVolume<=1e-5&&(this.audioManagerInstance.setVolume(.5),this._currentVolume=.5)),this.requestUpdate()}_changeTheme(){var h,e,a;(h=this.themeManagerInstance)==null||h.cycleTheme(),(a=(e=this.gameManagerInstance)==null?void 0:e.getAudioManager())==null||a.playSound("ui_confirm")}_closePopup(){var h,e;this.isVisible&&(this.isVisible=!1,this.dispatchEvent(new CustomEvent("options-close-requested",{bubbles:!0,composed:!0})),(e=(h=this.gameManagerInstance)==null?void 0:h.getAudioManager())==null||e.playSound("ui_cancel"))}render(){return this.isVisible?$`
      <div class="options-popup-content" @click=${h=>h.stopPropagation()}>
        <button class="options-popup-close-btn" @click=${this._closePopup} title="Cerrar Opciones (Esc)" aria-label="Cerrar Opciones">&times;</button>
        <h2 class="options-popup-title">Opciones</h2>

        <div class="option-item">
          <label for="volume-slider">Volumen: ${this._isMuted?"Silenciado":Math.round(this._currentVolume*100)+"%"}</label>
          <input
            type="range"
            id="volume-slider"
            min="0"
            max="1"
            step="0.01"
            .value="${this._isMuted?"0":this._currentVolume.toString()}"
            ?disabled="${this._isMuted}"
            @input="${this._handleVolumeChange}"
            aria-label="Control de volumen"
          />
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._toggleMute}" aria-pressed="${this._isMuted}">
            ${this._isMuted?"Activar Sonido":"Silenciar"}
          </button>
        </div>

        <div class="option-item">
          <button class="options-button" @click="${this._changeTheme}">
            Cambiar Tema
          </button>
        </div>
      </div>
    `:N}};ye.styles=Q`
    :host {
      display: none; /* Oculto por defecto */
      position: fixed;
      inset: 0; /* Cubre toda la pantalla */
      justify-content: center;
      align-items: center;
      z-index: 101; /* Encima del backdrop, similar a shop-popup */
      pointer-events: none; /* El host no intercepta por defecto, el contenido sí */
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([isVisible]) {
      display: flex;
      pointer-events: auto; /* Cuando es visible, el host puede interceptar para cerrar al hacer clic fuera */
    }

    .options-popup-content {
      /* Variables de tema con fallbacks a las de shop-popup o valores genéricos */
      background-color: var(--gq-options-popup-bg, var(--gq-shop-popup-bg, rgba(30, 40, 55, 0.97)));
      border-radius: var(--gq-options-popup-border-radius, var(--gq-shop-popup-border-radius, 1rem));
      border: var(--gq-options-popup-border, var(--gq-shop-popup-border, 1px solid #5a6b80));
      box-shadow: var(--gq-options-popup-box-shadow, var(--gq-shop-popup-box-shadow, 0 0.5rem 1.5rem rgba(0, 0, 0, 0.5)));
      color: var(--gq-options-popup-text-color, var(--gq-shop-popup-text-color, #dde1e7));
      
      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.2rem; /* Espacio entre elementos del menú */
      min-width: 280px;
      max-width: calc(100% - 2rem); /* Evita que toque los bordes en pantallas pequeñas */
      pointer-events: auto; /* El contenido sí es interactivo */
      position: relative; /* Para el botón de cierre absoluto */
      box-sizing: border-box;
    }

    .options-popup-title {
      font-size: var(--gq-options-popup-title-font-size, 1.4rem);
      font-weight: var(--gq-options-popup-title-font-weight, 700);
      text-align: center;
      margin: 0 0 0.5rem 0;
      color: var(--gq-options-popup-title-text-color, var(--gq-shop-popup-title-text-color, inherit));
    }

    .options-popup-close-btn {
      position: absolute;
      top: var(--gq-options-popup-close-btn-top, 0.3rem);
      right: var(--gq-options-popup-close-btn-right, 0.6rem);
      background: none;
      border: none;
      color: var(--gq-options-popup-close-btn-text-color, var(--gq-shop-popup-close-btn-text-color, #a0aec0));
      font-size: var(--gq-options-popup-close-btn-font-size, 2.2rem);
      line-height: 1;
      cursor: pointer;
      padding: 0.25rem;
      transition: color 0.2s ease;
    }
    .options-popup-close-btn:hover {
      color: var(--gq-options-popup-close-btn-hover-text-color, var(--gq-shop-popup-close-btn-hover-text-color, #e2e8f0));
    }

    .option-item {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .option-item label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--gq-options-popup-label-color, inherit);
    }

    input[type="range"] {
      width: 100%;
      cursor: pointer;
      accent-color: var(--gq-slider-thumb-color, #fb923c); /* Color principal del slider */
      background: transparent; /* Para mejor control de track en algunos navegadores */
    }

    /* Estilos para el track del slider */
    input[type="range"]::-webkit-slider-runnable-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }
    input[type="range"]::-moz-range-track {
      width: 100%;
      height: 0.5rem;
      cursor: pointer;
      background: var(--gq-slider-track-color, #374151);
      border-radius: 0.25rem;
      border: 1px solid var(--gq-slider-track-border-color, #4b5563);
    }

    /* Estilos para el thumb (la bolita) del slider */
    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 1.2rem;
      height: 1.2rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      margin-top: -0.375rem; /* Ajustar verticalmente: (track_height - thumb_height) / 2  (considerando borde) */
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]::-moz-range-thumb {
      width: 1.1rem; /* Ajustar para Firefox si es necesario */
      height: 1.1rem;
      background: var(--gq-slider-thumb-color, #fb923c);
      border-radius: 50%;
      cursor: pointer;
      border: 2px solid var(--gq-slider-thumb-border-color, #f9fafb);
      box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
    input[type="range"]:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }
    input[type="range"]:focus::-moz-range-thumb {
        box-shadow: 0 0 0 3px var(--gq-slider-focus-ring-color, rgba(251, 146, 60, 0.5));
    }


    .options-button {
      padding: 0.7rem 1.2rem;
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--gq-options-button-border-radius, var(--gq-opt-btn-border-radius, 0.6rem));
      border: var(--gq-options-button-border, var(--gq-opt-btn-border, none));
      background: var(--gq-options-button-bg, var(--gq-opt-btn-bg, linear-gradient(to right, #4f46e5, #7c3aed)));
      color: var(--gq-options-button-text-color, var(--gq-opt-btn-text-color, #FFFFFF));
      cursor: pointer;
      transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
      text-align: center;
      box-shadow: var(--gq-options-button-box-shadow, var(--gq-opt-btn-box-shadow, 0 3px 7px rgba(0,0,0,0.2)));
    }
    .options-button:hover {
      background: var(--gq-options-button-hover-bg, var(--gq-opt-btn-hover-bg, linear-gradient(to right, #6366f1, #8b5cf6)));
      box-shadow: var(--gq-options-button-hover-box-shadow, 0 4px 10px rgba(0,0,0,0.25));
      transform: translateY(-1px);
    }
    .options-button:active {
      transform: translateY(0px) scale(0.98);
      box-shadow: var(--gq-options-button-active-box-shadow, 0 1px 3px rgba(0,0,0,0.2));
    }

    @media (max-width: 480px) {
        .options-popup-content {
            padding: 1rem;
            gap: 1rem;
            min-width: calc(100% - 2rem);
        }
        .options-popup-title {
            font-size: 1.2rem;
        }
        .option-item label {
            font-size: 0.85rem;
        }
        .options-button {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
        }
    }
  `;Ue([L({type:Boolean,reflect:!0})],ye.prototype,"isVisible",2);Ue([L({type:Number})],ye.prototype,"initialVolume",2);Ue([L({type:Boolean})],ye.prototype,"initiallyMuted",2);Ue([R()],ye.prototype,"_currentVolume",2);Ue([R()],ye.prototype,"_isMuted",2);ye=Ue([V("options-menu-popup")],ye);var Ho=Object.defineProperty,Wo=Object.getOwnPropertyDescriptor,Aa=(h,e,a,o)=>{for(var i=o>1?void 0:o?Wo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Ho(e,a,i),i};const jo="sweep-in-tl-to-br",Ko="sweep-out-towards-br";let mt=class extends B{constructor(){super(...arguments),this.visible=!1}async playIn(){return console.log("[DiagonalWipe] playIn() INICIADO."),new Promise(h=>{this.classList.remove("animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!0,this.offsetWidth;const e=a=>{a.animationName===jo?(this.removeEventListener("animationend",e),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",console.log("[DiagonalWipe] playIn() FINALIZADO - Promesa resuelta."),h()):console.log(`[DiagonalWipe] playIn() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-in"),console.log('[DiagonalWipe] Clase "animate-in" añadida.')})}async playOut(){return console.log("[DiagonalWipe] playOut() INICIADO."),new Promise(h=>{if(!this.visible){console.log("[DiagonalWipe] playOut() llamado pero no visible, resolviendo inmediatamente."),h();return}this.classList.remove("animate-in"),this.style.clipPath="polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",this.offsetWidth;const e=a=>{a.animationName===Ko?(this.removeEventListener("animationend",e),this.reset(),console.log("[DiagonalWipe] playOut() FINALIZADO - Promesa resuelta."),h()):console.log(`[DiagonalWipe] playOut() animationend para OTRA animación: ${a.animationName}`)};this.addEventListener("animationend",e),this.classList.add("animate-out"),console.log('[DiagonalWipe] Clase "animate-out" añadida.')})}reset(){console.log("[DiagonalWipe] reset() llamado."),this.classList.remove("animate-in","animate-out"),this.style.clipPath="polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",this.visible=!1}render(){return $``}};mt.styles=Q`

  /* --- INCLUIR KEYFRAMES AQUÍ ADENTRO --- */
    @keyframes sweep-in-tl-to-br {
        0% { clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%); }
        10% { clip-path: polygon(0% 0%, 20% 0%, 0% 20%); }
        20% { clip-path: polygon(0% 0%, 40% 0%, 0% 40%); }
        30% { clip-path: polygon(0% 0%, 60% 0%, 0% 60%); }
        40% { clip-path: polygon(0% 0%, 80% 0%, 0% 80%); }
        50% { clip-path: polygon(0% 0%, 100% 0%, 0% 100%); }
        60% { clip-path: polygon(0% 0%, 100% 0%, 100% 20%, 20% 100%, 0% 100%); }
        70% { clip-path: polygon(0% 0%, 100% 0%, 100% 40%, 40% 100%, 0% 100%); }
        80% { clip-path: polygon(0% 0%, 100% 0%, 100% 60%, 60% 100%, 0% 100%); }
        90% { clip-path: polygon(0% 0%, 100% 0%, 100% 80%, 80% 100%, 0% 100%); }
        100% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
    }

    @keyframes sweep-out-towards-br {
        0% { clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%); }
        10% { clip-path: polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 20%); }
        20% { clip-path: polygon(40% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 40%); }
        30% { clip-path: polygon(60% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 60%); }
        40% { clip-path: polygon(80% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 80%); }
        50% { clip-path: polygon(100% 0%, 100% 100%, 0% 100%); }
        60% { clip-path: polygon(100% 20%, 100% 100%, 20% 100%); }
        70% { clip-path: polygon(100% 40%, 100% 100%, 40% 100%); }
        80% { clip-path: polygon(100% 60%, 100% 100%, 60% 100%); }
        90% { clip-path: polygon(100% 80%, 100% 100%, 80% 100%); }
        100% { clip-path: polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%); }
    }
        
    :host {
      display: block; 
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: var(--gq-wipe-color, #2c3e50); 
      z-index: var(--gq-wipe-z-index, 1000); 
      pointer-events: none; 
      clip-path: polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%);
      visibility: hidden; 
    }

    :host([visible]) {
      visibility: visible; 
    }

    :host(.animate-in) {
      animation-name: sweep-in-tl-to-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-in-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }

    :host(.animate-out) {
      animation-name: sweep-out-towards-br; /* Nombre literal de la animación */
      animation-duration: var(--gq-wipe-out-duration, 0.6s);
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    }
  `;Aa([L({type:Boolean,reflect:!0})],mt.prototype,"visible",2);mt=Aa([V("diagonal-wipe")],mt);var Yo=Object.defineProperty,Xo=Object.getOwnPropertyDescriptor,Ut=(h,e,a,o)=>{for(var i=o>1?void 0:o?Xo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Yo(e,a,i),i};let Ye=class extends B{constructor(){super(...arguments),this.combo=0,this._isVisible=!1}updated(h){super.updated(h),h.has("combo")&&this._updateVisuals()}_updateVisuals(){this._isVisible=this.combo>0,this.toggleAttribute("visible",this._isVisible);let h=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0"),e="transparent";if(this._isVisible){const o=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-increment").trim()||"0.5"),i=Math.min(Math.max(0,this.combo-1),10);h=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-font-size-base").trim()||"3.0")+i*o;const t=parseFloat(getComputedStyle(this).getPropertyValue("--gq-combo-color-hue-increment").trim()||"35"),n=getComputedStyle(this).getPropertyValue("--gq-combo-color-saturation").trim()||"100%",c=getComputedStyle(this).getPropertyValue("--gq-combo-color-lightness").trim()||"65%";e=`hsl(${this.combo*t%360}, ${n}, ${c})`}this.style.fontSize=`${h}rem`,this.style.color=e}render(){return $`${this._isVisible?`x${this.combo}`:""}`}};Ye.styles=Q`
    :host {
      position: fixed;
      bottom: var(--gq-combo-position-bottom, 0.5rem);
      left: var(--gq-combo-position-left, 0.5rem);
      z-index: 2;
      pointer-events: none;
      transition: font-size 0.4s cubic-bezier(0.22, 1, 0.36, 1),
                  color 0.4s ease-out,
                  opacity 0.3s ease-out,
                  transform 0.3s ease-out;
      font-family: var(--gq-combo-font-family, var(--gq-font-primary, 'Poppins', sans-serif));
      font-weight: var(--gq-combo-font-weight, 900);
      text-shadow: var(--gq-combo-text-shadow, 1px 1px 5px rgba(0,0,0,0.5));
      white-space: nowrap;
      opacity: 0;
      transform: scale(0.8) translateY(10px);
      will-change: transform, opacity, font-size, color;
      /* font-size y color se aplican en _updateVisuals */
    }

    :host([visible]) {
      opacity: 1;
      transform: scale(1) translateY(0);
    }

    @media (min-width: 768px) {
       :host {
         bottom: var(--gq-combo-desktop-position-bottom, var(--gq-combo-position-bottom, 1rem));
         left: var(--gq-combo-desktop-position-left, var(--gq-combo-position-left, 1rem));
       }
    }
  `;Ut([L({type:Number})],Ye.prototype,"combo",2);Ut([R()],Ye.prototype,"_isVisible",2);Ye=Ut([V("combo-counter")],Ye);var Zo=Object.defineProperty,Jo=Object.getOwnPropertyDescriptor,xe=(h,e,a,o)=>{for(var i=o>1?void 0:o?Jo(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&Zo(e,a,i),i};let de=class extends B{constructor(){super(...arguments),this.explanationText="",this.resultType=null,this.isVisible=!1,this._statusText="",this._statusIcon="",this._statusClass="",this._handleConfirm=h=>{if(!this.isVisible)return;const e=(h instanceof MouseEvent||h instanceof TouchEvent)&&h.target===this,a=h instanceof KeyboardEvent;if(!(!a&&!e)){if(a){const o=h.key;if(o!=="Enter"&&o!==" "&&o!=="Escape")return}h.stopPropagation(),(h.type==="touchstart"||h.type==="click")&&h.preventDefault(),this.dispatchEvent(new CustomEvent("confirm-clicked",{bubbles:!0,composed:!0}))}}}updated(h){super.updated(h),h.has("resultType")&&this._updateStatusContent(),h.has("isVisible")&&(h.get("isVisible"),this.isVisible?this.setAttribute("visible",""):this.removeAttribute("visible"),this._handleVisibilityChange())}_updateStatusContent(){switch(this.resultType){case"correct":this._statusText="¡Respuesta Correcta!",this._statusIcon="✅",this._statusClass="status-correct";break;case"incorrect":this._statusText="Respuesta Incorrecta",this._statusIcon="❌",this._statusClass="status-incorrect";break;case"shield":this._statusText="¡Escudo Activado!",this._statusIcon="🛡️",this._statusClass="status-shield";break;default:this._statusText="",this._statusIcon="",this._statusClass=""}}_handleVisibilityChange(){const h=this._handleConfirm,e=window,a=this;this.isVisible?this.hasAttribute("listeners-added")||(a.addEventListener("click",h),a.addEventListener("touchstart",h,{passive:!1}),e.addEventListener("keydown",h),this.setAttribute("listeners-added","")):this.hasAttribute("listeners-added")&&(a.removeEventListener("click",h),a.removeEventListener("touchstart",h),e.removeEventListener("keydown",h),this.removeAttribute("listeners-added"))}disconnectedCallback(){if(super.disconnectedCallback(),this.hasAttribute("listeners-added")){const h=this._handleConfirm;this.removeEventListener("click",h),this.removeEventListener("touchstart",h),window.removeEventListener("keydown",h),this.removeAttribute("listeners-added")}}render(){const h={"explanation-status-base":!0,[this._statusClass]:!!this._statusClass};return $`
      <div class="overlay-content-wrapper" part="wrapper">
        ${this._statusText?$`
          <p class=${_t(h)} part="status">
            ${this._statusIcon} ${this._statusText}
          </p>
        `:N}
        <div class="explanation-text" part="text" tabindex="0"> ${this.explanationText}
        </div>
        <p class="continue-prompt" part="prompt">(Toca para continuar ...)</p> </div>
    `}};de.styles=Q`
    :host {
      /* El host cubre toda la pantalla dinámica y tiene padding */
      display: flex; position: fixed; inset: 0; width: 100%; height: 100dvh;
      justify-content: center; align-items: center; text-align: center;
      z-index: 101; padding: 1rem; box-sizing: border-box;
      opacity: 0; visibility: hidden; pointer-events: none;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s;
      font-family: var(--gq-font-primary, 'Poppins', sans-serif);
    }
    :host([visible]) {
      opacity: 1; visibility: visible; pointer-events: auto;
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s;
    }

    /* --- INICIO CAMBIOS CSS --- */
    .overlay-content-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 90%;
      max-width: 650px;
      /* Cambiamos max-height a porcentaje relativo al host (que tiene padding) */
      max-height: 90%;
      /* min-height: 150px; /* Quitamos min-height para simplificar */
      box-sizing: border-box;
      pointer-events: auto;
      background-color: var(--gq-expl-bg, rgba(17, 24, 39, 0.85));
      border: var(--gq-expl-border, 1px solid rgba(75, 85, 99, 0.5));
      padding: clamp(1rem, 3vh, 1.5rem) clamp(1rem, 4vw, 2rem);
      border-radius: var(--gq-expl-border-radius, 0.75rem);
      /* overflow: hidden; /* Quitamos esto */
    }

    .explanation-status-base {
      flex-shrink: 0; /* Evita que el estado se encoja */
      width: auto;
      max-width: 100%;
      box-sizing: border-box;
      font-size: clamp(1.1rem, 3vw + 0.5rem, 1.4rem); font-weight: 800; margin-bottom: clamp(0.6rem, 2.5vh, 0.8rem);
      padding: 0.3rem 0.8rem; border-radius: 0.5rem; display: inline-block;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5); line-height: 1.3;
      color: var(--gq-expl-text-color, white); position: relative; z-index: 1;
    }
    /* ... Clases status-correct, status-incorrect, status-shield ... */
    .status-correct { background-color: var(--gq-expl-status-correct-bg, rgba(16, 185, 129, 0.8)); border: var(--gq-expl-status-correct-border, 1px solid #34d399); }
    .status-incorrect { background-color: var(--gq-expl-status-incorrect-bg, rgba(239, 68, 68, 0.8)); border: var(--gq-expl-status-incorrect-border, 1px solid #f87171); }
    .status-shield { background-color: var(--gq-expl-status-shield-bg, rgba(59, 130, 246, 0.8)); border: var(--gq-expl-status-shield-border, 1px solid #93c5fd); }


    .explanation-text {
      flex-grow: 1; /* Debe crecer */
      flex-shrink: 1; /* Debe poder encogerse */
      min-height: 0;  /* Fundamental para que flex-shrink funcione */
      overflow-y: auto; /* Scroll interno vertical */
      width: 100%;
      box-sizing: border-box;
      position: relative; z-index: 1;
      pointer-events: auto;
      color: var(--gq-expl-text-color, white); font-size: clamp(0.9rem, 2.5vw + 0.4rem, 1.1rem);
      line-height: 1.5; font-weight: 600; text-shadow: var(--gq-expl-text-shadow, 1px 1px 3px rgba(0,0,0,0.7));
      background-color: transparent; border: none;
      padding-top: 0.5rem; padding-bottom: 0.5rem; /* Padding interno para el scroll */
      scrollbar-width: thin;
      scrollbar-color: rgba(150,150,150,0.5) transparent;
    }
    .explanation-text::-webkit-scrollbar { width: 6px; }
    .explanation-text::-webkit-scrollbar-thumb { background-color: rgba(150,150,150,0.5); border-radius: 3px; }
    .explanation-text::-webkit-scrollbar-track { background: transparent; }

    .continue-prompt {
      flex-shrink: 0; /* Evita que el prompt se encoja */
      margin-top: clamp(0.8rem, 3vh, 1.2rem); font-size: clamp(0.7rem, 1.5vw + 0.3rem, 0.85rem);
      color: var(--gq-expl-prompt-text-color, rgba(229, 231, 235, 0.7)); font-weight: 400;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5); animation: fadeInOut 2s infinite ease-in-out;
      position: relative; z-index: 1;
      pointer-events: none;
    }
    /* --- FIN CAMBIOS CSS --- */

    @keyframes fadeInOut { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
  `;xe([L({type:String})],de.prototype,"explanationText",2);xe([L({type:String})],de.prototype,"resultType",2);xe([L({type:Boolean})],de.prototype,"isVisible",2);xe([R()],de.prototype,"_statusText",2);xe([R()],de.prototype,"_statusIcon",2);xe([R()],de.prototype,"_statusClass",2);xe([j(".overlay-content-wrapper")],de.prototype,"_contentWrapper",2);de=xe([V("explanation-overlay-component")],de);var en=Object.defineProperty,tn=Object.getOwnPropertyDescriptor,qa=(h,e,a,o)=>{for(var i=o>1?void 0:o?tn(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&en(e,a,i),i};let ft=class extends B{constructor(){super(...arguments),this.visible=!1}render(){return $``}};ft.styles=Q`
    :host {
      display: block; /* Cambiado de none para que la transición funcione */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--gq-backdrop-bg-color, rgba(17, 24, 39, 0.5)); /* Themed */
      backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px)); /* Themed */
      -webkit-backdrop-filter: blur(var(--gq-backdrop-blur-radius, 5px));
      opacity: 0;
      visibility: hidden; /* Oculto por defecto */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0.4s; /* Ocultar visibility después de opacidad */
      pointer-events: none;
      z-index: 100; /* Mantenemos el z-index original */
      will-change: opacity; /* Optimización para la transición */
    }

    :host([visible]) {
      opacity: 1;
      visibility: visible; /* Visible cuando el atributo está presente */
      transition: opacity 0.4s ease-in-out, visibility 0s linear 0s; /* Mostrar visibility inmediatamente */
      /* Mantenemos pointer-events: none; el backdrop nunca debe ser interactivo */
    }
  `;qa([L({type:Boolean,reflect:!0})],ft.prototype,"visible",2);ft=qa([V("blur-backdrop-component")],ft);var an=Object.defineProperty,on=Object.getOwnPropertyDescriptor,ze=(h,e,a,o)=>{for(var i=o>1?void 0:o?on(e,a):e,t=h.length-1,n;t>=0;t--)(n=h[t])&&(i=(o?n(e,a,i):n(i))||i);return o&&i&&an(e,a,i),i};let me=class extends B{constructor(){super(),this.toolId="",this.icon="❓",this.titleText="",this.disabled=!1,this.active=!1,this.progressPercentage=0,this._isProcessingInteraction=!1}render(){const h=this.toolId==="cat-food"&&!this.disabled?$`
          <div class="cat-food-bar-container" part="cat-food-bar-container">
            <div
              class="cat-food-bar-fill"
              part="cat-food-bar-fill"
              style="width: ${this.progressPercentage}%;"
            ></div>
          </div>
        `:N;return $`
      <button
        class="tool-button-internal"
        title=${this.titleText||this.toolId}
        ?disabled=${this.disabled}
        @click=${this._handleClick}
        @touchstart=${this._handleClick}
        part="button"
        aria-label=${this.titleText||this.toolId}
        tabindex="-1"
      >
        ${this.icon}
      </button>
      ${h}
    `}_handleClick(h){h.type==="touchstart"&&h.preventDefault(),!(this._isProcessingInteraction||this.disabled)&&(this._isProcessingInteraction=!0,this.dispatchEvent(new CustomEvent("tool-activated",{detail:{toolId:this.toolId},bubbles:!0,composed:!0})),requestAnimationFrame(()=>{this._isProcessingInteraction=!1}))}};me.styles=Q`
    :host {
      display: inline-flex; justify-content: center; align-items: center;
      width: var(--gq-toolbtn-size, 3rem);
      height: var(--gq-toolbtn-size, 3rem);
      box-sizing: border-box;
      -webkit-tap-highlight-color: transparent;
      cursor: pointer;
      background-color: var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8));
      color: var(--gq-toolbtn-text-color, #e5e7eb);
      border: var(--gq-toolbtn-border, 2px solid #4b5563);
      border-radius: var(--gq-toolbtn-border-radius, 0.5rem);
      padding: var(--gq-toolbtn-padding, 0.5rem);
      font-size: var(--gq-toolbtn-font-size, 1.1rem);
      line-height: 1;
      transition: background-color 0.2s ease, border-color 0.2s ease,
                  box-shadow 0.2s ease, transform 0.1s ease,
                  opacity 0.2s ease;
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
      position: relative; /* Necesario para la barra de progreso interna */
      overflow: hidden; /* Para que la barra no se salga del borde redondeado */
    }

    .tool-button-internal {
      appearance: none; -webkit-appearance: none; -moz-appearance: none;
      background: transparent; border: none; padding: 0; margin: 0;
      font: inherit; color: inherit; cursor: inherit; outline: none;
      width: 100%; height: 100%; display: flex;
      justify-content: center; align-items: center;
      position: relative; /* Para que el icono esté sobre la barra */
      z-index: 1; /* Icono encima de la barra */
    }

    /* Hover general */
    :host(:not([disabled]):not([active]):hover) {
      background-color: var(--gq-toolbtn-hover-bg, rgba(31, 41, 55, 0.9));
      border-color: var(--gq-toolbtn-hover-border-color, #6b7280);
    }

    /* Active general (presionado, no el estado "activo" de la herramienta) */
    :host(:not([disabled]):active) { /* Se aplica si no está deshabilitado, incluso si está "active" */
      transform: scale(0.95);
      background-color: var(--gq-toolbtn-pressed-bg, rgba(55, 65, 81, 0.9));
    }

    /* Estado deshabilitado */
    :host([disabled]) {
      opacity: var(--gq-toolbtn-disabled-opacity, 0.5);
      cursor: not-allowed;
      transform: none !important;
      background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
      border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
      box-shadow: var(--gq-toolbtn-box-shadow, 0 2px 4px rgba(0,0,0,0.3));
    }
     :host([disabled]:hover) { /* Evitar cambios en hover si está deshabilitado */
       background-color: var(--gq-toolbtn-disabled-bg, var(--gq-toolbtn-bg, rgba(17, 24, 39, 0.8)));
       border-color: var(--gq-toolbtn-disabled-border-color, var(--gq-toolbtn-border-color, #4b5563));
     }

    /* --- ESTILOS DE ESTADO ACTIVO (Herramienta seleccionada) --- */
    :host([active]) {
      border-color: var(--gq-toolbtn-active-border-color, #a78bfa);
      box-shadow: var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5));
      background-color: var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3));
    }

    /* Pincel Activo */
    :host([toolId="brush"][active]) {
        border-color: var(--gq-toolbtn-brush-active-border-color, var(--gq-toolbtn-active-border-color, #a78bfa));
        box-shadow: var(--gq-toolbtn-brush-active-box-shadow, var(--gq-toolbtn-active-box-shadow, 0 0 8px rgba(167, 139, 250, 0.5)));
        background-color: var(--gq-toolbtn-brush-active-bg-color, var(--gq-toolbtn-active-bg-color, rgba(167, 139, 250, 0.3)));
    }

     /* Comida Activa */
     :host([toolId="cat-food"][active]) {
        border-color: var(--gq-toolbtn-catfood-active-border-color, rgb(245, 99, 31));
        background-color: var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8));
        box-shadow: var(--gq-toolbtn-catfood-active-box-shadow, 0 0 8px rgba(223, 167, 12, 0.5));
     }

    /* Estilos para estado presionado MIENTRAS está activo (toolId genérico) */
     :host([active]:active) {
       background-color: var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5));
     }
      /* Comida Activa y Presionada */
      :host([toolId="cat-food"][active]:active) {
        background-color: var(--gq-toolbtn-catfood-active-pressed-bg, var(--gq-toolbtn-catfood-active-bg-color, rgba(245, 136, 63, 0.8)));
      }
      /* Pincel Activo y Presionado */
      :host([toolId="brush"][active]:active) {
        background-color: var(--gq-toolbtn-brush-active-pressed-bg, var(--gq-toolbtn-active-pressed-bg, rgba(140, 110, 240, 0.5)));
      }

    /* --- INICIO: Estilos de cat_food.css integrados para la barra --- */
    .cat-food-bar-container {
      position: absolute;
      /* Ajustar estos valores según sea necesario o hacerlos variables CSS */
      bottom: var(--gq-catfood-bar-bottom-offset, 0.2rem); /* Reducido para mejor ajuste */
      left: var(--gq-catfood-bar-left-offset, 0.25rem);   /* Reducido para mejor ajuste */
      right: var(--gq-catfood-bar-right-offset, 0.25rem);  /* Reducido para mejor ajuste */
      height: var(--gq-catfood-bar-height, 0.5rem);    /* Reducido para mejor ajuste */
      background-color: var(--gq-catfood-bar-bg, #374151);
      /* Usar el mismo borde que el botón padre, o uno específico */
      border: var(--gq-catfood-bar-border, 1px solid #4b5563);
      border-radius: var(--gq-catfood-bar-border-radius, 0.25rem); /* Un poco menos redondeado que el botón */
      overflow: hidden;
      pointer-events: none; /* Para que no interfiera con el click del botón */
      z-index: 0; /* Detrás del contenido del botón (.tool-button-internal) */
    }

    .cat-food-bar-fill {
      height: 100%;
      background: var(--gq-catfood-bar-fill-bg, linear-gradient(to right, #f97316, #fcd34d));
      border-radius: inherit; /* Heredar el redondeo del contenedor de la barra */
      transition: width 0.3s ease-out;
    }
    /* --- FIN: Estilos de cat_food.css integrados --- */

    @media (min-width: 768px) {
      :host {
        width: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        height: var(--gq-toolbtn-desktop-size, var(--gq-toolbtn-size, 3.5rem));
        font-size: var(--gq-toolbtn-desktop-font-size, var(--gq-toolbtn-font-size, 1.2rem));
        padding: var(--gq-toolbtn-desktop-padding, var(--gq-toolbtn-padding, 0.6rem));
      }
       /* Los estilos para :active y :hover ya están definidos globalmente */
    }
  `;ze([L({type:String})],me.prototype,"toolId",2);ze([L({type:String})],me.prototype,"icon",2);ze([L({type:String})],me.prototype,"titleText",2);ze([L({type:Boolean,reflect:!0})],me.prototype,"disabled",2);ze([L({type:Boolean,reflect:!0})],me.prototype,"active",2);ze([L({type:Number,attribute:"progress-percentage"})],me.prototype,"progressPercentage",2);me=ze([V("tool-button")],me);console.log("ToolButton component defined");class nn{constructor(e){this.drawingCanvasLayerElement=null,this.diagonalWipeElement=null,this.lastTimestamp=0,this.isRunning=!1,this.isCatBeingDragged=!1,this.keydownListener=null,this.themeChangeListener=null,this.shopButtonInteractionListener=null,this.optionsButtonClickListener=null,this.optionsPopupCloseListener=null,this.loadingMessages=["Desenredando la diversión..."],this.containerElement=e,console.log("GameManager: Constructor iniciado."),this.playerData=new Eo,this.audioManager=new La,this.quizSystem=new wo,this.themeManager=new Fa("body"),this.globalUIManager=new So(this),this.toolManager=new Yi(this),this.catManager=new ki(this.audioManager,this),this.shopManager=new Ki(this.playerData,this),this.inkManager=new Oi(this),this.catFoodManager=new yi(this),this.physicsManager=new Ra(this.catManager,this.catFoodManager,this),this.toolManager.setManagers(this.inkManager,this.catFoodManager,this.playerData),this.catManager.setPhysicsManager(this.physicsManager),this.inkManager.setPhysicsManager(this.physicsManager),this.stateMachine=new Io,this.stateMachine.setAnimationContainer(this.containerElement),this.diagonalWipeElement=document.getElementById("diagonal-wipe-transition-element"),this.diagonalWipeElement||console.warn("GameManager: Componente <diagonal-wipe> no encontrado en el DOM."),this.stateMachine.setWipeComponent(this.diagonalWipeElement);const a=document.getElementById("cat-display-area-main");if(!a)throw new Error("GameManager CRITICAL: <cat-display-area id='cat-display-area-main'> no encontrado.");this.catDisplayAreaElement=a,this.catManager.setCatDisplayArea(this.catDisplayAreaElement),this.catFoodManager.setCatDisplayArea(this.catDisplayAreaElement),this.drawingCanvasLayerElement=document.getElementById("drawing-canvas-layer-main"),this.drawingCanvasLayerElement||console.warn("GameManager: <drawing-canvas-layer id='drawing-canvas-layer-main'> no encontrado."),this.setupStates(),console.log("GameManager: Constructor finalizado.")}getEngineServices(){return{playerData:this.playerData,audioManager:this.audioManager,catManager:this.catManager,physicsManager:this.physicsManager,themeManager:this.themeManager,shopManager:this.shopManager,inkManager:this.inkManager,catFoodManager:this.catFoodManager,globalUI:this.globalUIManager,toolManager:this.toolManager,quizSystem:this.quizSystem,gameManager:this}}setBodyStateClass(e){const a=document.body;a.className.split(" ").forEach(o=>{o.startsWith("state-")&&a.classList.remove(o)}),e&&a.classList.add(`state-${e.toLowerCase()}`)}async init(){console.log("GameManager: init() llamado."),this.audioManager.init(),console.log("GameManager: AudioManager.init() llamado."),this.playerData.reset(),this.physicsManager.init(this.catDisplayAreaElement),await this.inkManager.init(),this.catFoodManager.init(),this.toolManager.showToolControls(!1),this.globalUIManager.showShopButton(!1),this.globalUIManager.showOptionsButton(!1),this.globalUIManager.updateBackdropVisibility(),this.addThemeChangeListener(),await this.preload(),this.addKeyboardListener(),this.setupGlobalUICListeners(),console.log("GameManager: init() completado.")}create(){console.log("GameManager: create() llamado (transicionando a MainMenu)."),this.quizSystem.resetAvailableQuestions(),this.catManager.removeAllCats(),this.shopManager.isShopOpen()&&this.handleShopCloseRequest(),this.globalUIManager.isOptionsMenuOpen()&&this.closeOptionsMenu(),this.stateMachine.changeState("MainMenu",void 0,"gq-wipe-transition")}setupStates(){console.log("GameManager: setupStates() iniciando.");const e=new To(this),a=new ma(this),o=new kt(this),i=new $o(this),t=new ko(this),n=(r,m,l,g)=>{const p=r.enter.bind(r);return async s=>{try{const d=p(s);d instanceof Promise&&await d}catch(d){console.error(`GameManager: Error en enter() para ${r.constructor.name}:`,d)}if(r instanceof ma){const d=this.containerElement.querySelector("main-menu-screen");d&&(d.loadingMessages=this.getLoadingMessages())}this.getGlobalUIManager().showShopButton(m),this.getGlobalUIManager().showOptionsButton(g),this.getToolManager().showToolControls(l),l&&r instanceof kt&&(this.getToolManager().updateControlVisibilityBasedOnUnlocks(),this.getToolManager().updateCatFoodUIToolButton()),this.getToolManager().updateToolButtonActiveStates(),this.getGlobalUIManager().updateBackdropVisibility()}},c=r=>{const m=r.exit.bind(r);return()=>{try{m()}catch(l){console.error(`GameManager: Error en exit() para ${r.constructor.name}:`,l)}}};e.enter=n(e,!1,!1,!1),e.exit=c(e),a.enter=n(a,!1,!1,!1),a.exit=c(a),o.enter=n(o,!0,!0,!0),o.exit=c(o),i.enter=n(i,!1,!1,!1),i.exit=c(i),t.enter=n(t,!1,!1,!1),t.exit=c(t),this.stateMachine.addState("Loading",e),this.stateMachine.addState("MainMenu",a),this.stateMachine.addState("QuizGameplay",o),this.stateMachine.addState("Results",i),this.stateMachine.addState("GameOver",t),this.stateMachine.addState("__shutdown__",{enter:()=>{this.toolManager.showToolControls(!1),this.globalUIManager.showShopButton(!1),this.globalUIManager.showOptionsButton(!1)},exit:()=>{},update:()=>{}}),console.log("GameManager: setupStates() completado.")}async preload(){console.log("GameManager: preload() iniciando.");const e="/Wisdom-Wiskers/",a=e.endsWith("/")?e.slice(0,-1):e,o={questions:`${a}/data/questions.json`,templates:`${a}/data/cat_templates.json`,shopItems:`${a}/data/shop_items.json`,themes:`${a}/data/themes.json`,loadingMessages:`${a}/data/loading_messages.json`};try{const i=await Promise.all(Object.values(o).map(l=>fetch(l)));i.forEach((l,g)=>{if(!l.ok)throw new Error(`HTTP ${l.status} cargando ${Object.values(o)[g]}`)});const[t,n,c,r,m]=await Promise.all(i.map(l=>l.json()));if(!Array.isArray(t)||!Array.isArray(n)||!Array.isArray(c)||!Array.isArray(r)||!Array.isArray(m))throw new Error("Formato de datos JSON inválido en uno o más archivos.");if(!await this.quizSystem.loadQuestionsData(t))throw new Error("Fallo al procesar preguntas.");if(this.catManager.loadTemplates(n),this.shopManager.init(c),!await this.themeManager.loadThemesData(r))throw new Error("Fallo al procesar temas.");this.loadingMessages=m,this.loadingMessages.length===0&&(this.loadingMessages=["Cargando michi-diversión..."]),console.log("GameManager: preload() de datos JSON completado exitosamente.")}catch(i){throw console.error("GameManager: Error CRÍTICO durante preload:",i),this.containerElement.innerHTML=`Error cargando assets: ${i.message}. Revisa la consola.`,i}}start(){this.isRunning||(console.log("GameManager: start() - Iniciando bucle de juego y físicas."),this.isRunning=!0,this.lastTimestamp=performance.now(),this.physicsManager.start(),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this)))}stop(){this.isRunning&&(console.log("GameManager: stop() - Deteniendo bucle de juego y físicas."),this.isRunning=!1,this.gameLoopRequestId&&cancelAnimationFrame(this.gameLoopRequestId),this.gameLoopRequestId=void 0,this.physicsManager.stop())}gameLoop(e){if(!this.isRunning)return;const a=(e-this.lastTimestamp)/1e3;this.lastTimestamp=e;const o=Math.min(a,.1);this.update(o),this.gameLoopRequestId=requestAnimationFrame(this.gameLoop.bind(this))}update(e){try{this.stateMachine.update(e),this.catManager.updateCats(e),this.catFoodManager.update(e)}catch(a){console.error("GameManager: Error en gameLoop update:",a),this.stop()}}shutdown(){var a,o;console.log("GameManager: shutdown() iniciando."),this.stop(),this.toolManager.showToolControls(!1),this.globalUIManager.showShopButton(!1),this.globalUIManager.showOptionsButton(!1),this.removeKeyboardListener(),this.removeThemeChangeListener(),this.removeGlobalUICListeners(),this.physicsManager.shutdown();const e=this.stateMachine.getCurrentStateName();if(e&&e!=="__shutdown__")try{(a=this.stateMachine.getCurrentState())==null||a.exit()}catch(i){console.warn("GameManager: Error en exit() del estado durante shutdown:",i)}this.stateMachine.changeState("__shutdown__"),this.catManager.removeAllCats(),this.inkManager.destroy(),this.shopManager.destroy(),this.catFoodManager.destroy(),this.containerElement.innerHTML="",this.setBodyStateClass(null),(o=document.querySelector("combo-counter"))==null||o.remove(),this.globalUIManager.resetWipe(),console.log("GameManager: shutdown() completado.")}getGlobalUIManager(){return this.globalUIManager}getToolManager(){return this.toolManager}getQuizSystem(){return this.quizSystem}getPhysicsManager(){return this.physicsManager}getStateMachine(){return this.stateMachine}getAudioManager(){return this.audioManager}getCatManager(){return this.catManager}getShopManager(){return this.shopManager}getPlayerData(){return this.playerData}getInkManager(){return this.inkManager}getThemeManager(){return this.themeManager}getCatFoodManager(){return this.catFoodManager}getContainerElement(){return this.containerElement}getCurrentState(){return this.stateMachine.getCurrentState()}getCatDisplayArea(){return this.catDisplayAreaElement}getDrawingCanvasLayer(){return this.drawingCanvasLayerElement}getLoadingMessages(){return this.loadingMessages.length>0?this.loadingMessages:["Cargando..."]}isGamePausedForOverlay(){const e=this.stateMachine.getCurrentState(),a=e==null?void 0:e.quizUIManager;return a&&typeof a.isExplanationVisible=="function"?a.isExplanationVisible():!1}updateBackdropAndFadeState(){this.globalUIManager.updateBackdropVisibility();const e=this.shopManager.isShopOpen(),a=this.globalUIManager.isOptionsMenuOpen(),o=this.isGamePausedForOverlay(),i=this.isACatBeingDragged(),t=e||a||o||i;this.globalUIManager.setModuleUIsFaded(t),this.updateGlobalButtonsState()}async toggleOptionsMenu(){const e=this.globalUIManager.isOptionsMenuOpen();e||await this.audioManager.tryResumeContext(),this.globalUIManager.toggleOptionsMenu(!e),this.audioManager.playSound(e?"ui_cancel":"ui_confirm"),this.updateBackdropAndFadeState()}async closeOptionsMenu(){this.globalUIManager.isOptionsMenuOpen()?(this.globalUIManager.toggleOptionsMenu(!1),this.updateBackdropAndFadeState()):this.updateBackdropAndFadeState()}async handleShopButtonInteraction(){await this.audioManager.tryResumeContext(),this.shopManager.isShopOpen()||(this.shopManager.openShop(),this.audioManager.playSound("ui_confirm"),this.updateBackdropAndFadeState())}async handleShopCloseRequest(){this.shopManager.isShopOpen()&&(this.shopManager.closeShop(),this.audioManager.playSound("ui_cancel"),this.updateBackdropAndFadeState())}async openShop(){await this.audioManager.tryResumeContext(),this.shopManager&&!this.shopManager.isShopOpen()&&(this.shopManager.openShop(),this.audioManager.playSound("ui_confirm"),this.updateBackdropAndFadeState())}updateGlobalButtonsState(){const e=this.shopManager.isShopOpen(),a=this.globalUIManager.isOptionsMenuOpen(),o=this.isGamePausedForOverlay(),i=e||a||o||this.isCatBeingDragged,n=this.stateMachine.getCurrentStateName()==="QuizGameplay";this.globalUIManager.setShopButtonDisabled(i||!n),this.globalUIManager.showShopButton(n),this.globalUIManager.setOptionsButtonDisabled(i||!n),this.globalUIManager.showOptionsButton(n),this.toolManager.updateToolButtonActiveStates()}addThemeChangeListener(){this.removeThemeChangeListener(),this.themeChangeListener=e=>{const a=this.stateMachine.getCurrentState();a&&typeof a.rebuildInterface=="function"?a.rebuildInterface():a!=null&&a.quizModule&&typeof a.quizModule.rebuildUI=="function"&&a.quizModule.rebuildUI(),this.shopManager.isShopOpen()&&this.shopManager.updateShopUI();const o=document.getElementById("options-menu-popup-global");o!=null&&o.isVisible&&o.requestUpdate()},document.addEventListener("theme-changed",this.themeChangeListener)}removeThemeChangeListener(){this.themeChangeListener&&(document.removeEventListener("theme-changed",this.themeChangeListener),this.themeChangeListener=null)}addKeyboardListener(){this.removeKeyboardListener(),this.keydownListener=async e=>{if(e.key==="Escape"){if(this.globalUIManager.isOptionsMenuOpen()){await this.closeOptionsMenu();return}if(this.shopManager.isShopOpen()){await this.handleShopCloseRequest();return}const i=this.stateMachine.getCurrentState(),t=i==null?void 0:i.quizModule;if(t&&typeof t.handleEscapeKey=="function"&&t.handleEscapeKey()){this.updateBackdropAndFadeState();return}}if(this.shopManager.isShopOpen()||this.globalUIManager.isOptionsMenuOpen()||this.isGamePausedForOverlay()||this.isCatBeingDragged)return;const o=this.stateMachine.getCurrentStateName();if(o==="QuizGameplay")switch(e.key.toLowerCase()){case"b":this.toolManager.activateBrush();break;case"c":this.playerData.isDrawingUnlocked&&this.playerData.inkSpentSinceLastClear>0&&this.inkManager.clearInkLines();break;case"f":this.toolManager.activateCatFood();break;case"s":const i=document.getElementById("shop-button-global");i&&!i.disabled&&await this.handleShopButtonInteraction();break;case"o":const t=document.getElementById("settings-options-button-global");t&&!t.disabled&&await this.toggleOptionsMenu();break;case"t":await this.audioManager.tryResumeContext(),this.themeManager.cycleTheme(),this.audioManager.playSound("ui_select");break}else["MainMenu","GameOver","Results"].includes(o||"")&&e.key.toLowerCase()==="t"&&(await this.audioManager.tryResumeContext(),this.themeManager.cycleTheme(),this.audioManager.playSound("ui_select"))},window.addEventListener("keydown",this.keydownListener)}removeKeyboardListener(){this.keydownListener&&(window.removeEventListener("keydown",this.keydownListener),this.keydownListener=null)}setupGlobalUICListeners(){this.removeGlobalUICListeners();const e=document.getElementById("shop-button-global");e&&(this.shopButtonInteractionListener=()=>this.handleShopButtonInteraction(),e.addEventListener("shop-button-interaction",this.shopButtonInteractionListener));const a=document.getElementById("settings-options-button-global");a&&(this.optionsButtonClickListener=()=>this.toggleOptionsMenu(),a.addEventListener("options-button-clicked",this.optionsButtonClickListener));const o=document.getElementById("options-menu-popup-global");o&&(this.optionsPopupCloseListener=()=>this.closeOptionsMenu(),o.addEventListener("options-close-requested",this.optionsPopupCloseListener))}removeGlobalUICListeners(){const e=document.getElementById("shop-button-global");e&&this.shopButtonInteractionListener&&e.removeEventListener("shop-button-interaction",this.shopButtonInteractionListener),this.shopButtonInteractionListener=null;const a=document.getElementById("settings-options-button-global");a&&this.optionsButtonClickListener&&a.removeEventListener("options-button-clicked",this.optionsButtonClickListener),this.optionsButtonClickListener=null;const o=document.getElementById("options-menu-popup-global");o&&this.optionsPopupCloseListener&&o.removeEventListener("options-close-requested",this.optionsPopupCloseListener),this.optionsPopupCloseListener=null}updateInkUI(){var o;this.toolManager.updateToolButtonActiveStates(),this.getContainerElement().querySelector("quiz-ui-container");const e=(o=this.stateMachine.getCurrentState())==null?void 0:o.quizModule,a=e==null?void 0:e.quizUIManager;a&&typeof a.updateInkBar=="function"&&(a.updateInkBar(),a.updateInkVisibility(this.playerData.isDrawingUnlocked))}updateExternalLivesUI(){var o;const e=(o=this.stateMachine.getCurrentState())==null?void 0:o.quizModule,a=e==null?void 0:e.quizUIManager;a&&typeof a.updateLivesInQuizUI=="function"&&a.updateLivesInQuizUI(this.playerData.lives,this.playerData.hasShield,this.playerData.hintCharges),this.globalUIManager.updateLivesDisplay(this.playerData.lives,this.playerData.hasShield,this.playerData.hintCharges)}updateExternalShieldUI(e){var i;const a=(i=this.stateMachine.getCurrentState())==null?void 0:i.quizModule,o=a==null?void 0:a.quizUIManager;o&&typeof o.updateLivesInQuizUI=="function"&&o.updateLivesInQuizUI(this.playerData.lives,e,this.playerData.hintCharges),this.globalUIManager.updateShieldIcon(e)}updateExternalHintUI(e){var i;const a=(i=this.stateMachine.getCurrentState())==null?void 0:i.quizModule,o=a==null?void 0:a.quizUIManager;o&&typeof o.updateLivesInQuizUI=="function"&&o.updateLivesInQuizUI(this.playerData.lives,this.playerData.hasShield,e),this.globalUIManager.updateHintIcon(e)}updateExternalScoreUI(){var i;const e=this.stateMachine.getCurrentState();let a=0;e instanceof kt&&e.quizModule&&(a=e.quizModule.consecutiveCorrectAnswers||0),this.globalUIManager.updateScoreDisplay(this.playerData.score,a);const o=(i=e==null?void 0:e.quizModule)==null?void 0:i.quizUIManager;o&&typeof o.updateScoreInQuizUI=="function"&&o.updateScoreInQuizUI(this.playerData.score,a)}updateCatFoodUI(){this.toolManager.updateCatFoodUIToolButton(),this.toolManager.updateToolButtonActiveStates()}setCatDragState(e){this.isCatBeingDragged=e,this.drawingCanvasLayerElement&&(this.drawingCanvasLayerElement.isPointerLockdown=e),this.updateBackdropAndFadeState()}isACatBeingDragged(){return this.isCatBeingDragged}getLives(){return this.playerData.lives}decrementLives(){this.playerData.lives>0&&(this.playerData.lives--,this.updateExternalLivesUI())}incrementLives(){this.playerData.lives++,this.updateExternalLivesUI()}enableDrawingFeature(){try{return this.toolManager.updateControlVisibilityBasedOnUnlocks(),this.toolManager.updateToolButtonActiveStates(),this.updateInkUI(),!0}catch(e){return console.error("GameManager: Error habilitando la función de dibujo:",e),!1}}enableCatFoodFeature(){try{this.catFoodManager.enable(),this.toolManager.updateControlVisibilityBasedOnUnlocks(),this.toolManager.updateToolButtonActiveStates(),this.updateCatFoodUI()}catch(e){console.error("GameManager: Error habilitando la función de comida para gatos:",e)}}moduleFinished(e){console.log("[GameManager] moduleFinished llamado con resultado:",e);const a=(e==null?void 0:e.score)!==void 0?e.score:this.playerData.score;let o=!1;(e==null?void 0:e.isNewHighScore)!==void 0&&(o=e.isNewHighScore),e!=null&&e.gameOver?this.stateMachine.changeState("GameOver",{score:a,isNewHighScore:o},"gq-wipe-transition"):this.stateMachine.changeState("Results",{score:a,correct:(e==null?void 0:e.correct)??0,total:(e==null?void 0:e.total)??0,isNewHighScore:o},"gq-wipe-transition")}}console.log("DOM Cargado. Iniciando W&W");const ct=document.getElementById("app");if(!ct)console.error("Error: Elemento #app no encontrado en el DOM.");else{ct.innerHTML="",console.log("Preparado para inicializar GameManager.");const h=new nn(ct);window.gameManager=h,console.log("GameManager expuesto como window.gameManager para depuración.");const e=()=>{const a=async()=>{const o=h.getAudioManager();o?(console.log("User interaction detected (post gameManager.init), attempting to resume audio context..."),await o.tryResumeContext()):console.warn("AudioManager not available at the time of user interaction for resume (post gameManager.init)."),document.body.removeEventListener("click",a,{capture:!0}),document.body.removeEventListener("touchstart",a,{capture:!0}),console.log("One-time audio resume listeners removed (post gameManager.init).")};console.log("Adding one-time listeners for audio context resume (post gameManager.init)..."),document.body.addEventListener("click",a,{once:!0,capture:!0}),document.body.addEventListener("touchstart",a,{once:!0,capture:!0,passive:!0})};h.init().then(()=>{h.create(),console.log("GameManager inicializado y UI creada. El juego comenzará desde MainMenuState."),e()}).catch(a=>{console.error("Error durante la inicialización del juego:",a),ct.innerHTML=`Error al cargar el juego: ${a.message}. Revisa la consola.`})}
