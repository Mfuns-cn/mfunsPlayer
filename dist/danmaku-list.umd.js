(function(H,g){typeof exports=="object"&&typeof module<"u"?module.exports=g():typeof define=="function"&&define.amd?define(g):(H=typeof globalThis<"u"?globalThis:H||self,H.danmakuList=g())})(this,function(){"use strict";const H=(n,t=!0)=>{if(n=n||0,n===0||n===1/0||n.toString()==="NaN")return"00:00";const e=o=>o<10?`0${o}`:`${o}`,i=Math.floor(n/3600),s=Math.floor((n-i*3600)/60),l=Math.floor(n-i*3600-s*60);return t?(i>0?[i,s,l]:[s,l]).map(e).join(":"):[i*60+s,l].map(e).join(":")},g={yyyy:n=>n.getFullYear().toString(),yy:n=>n.getFullYear().toString().slice(-2),MM:n=>(n.getMonth()+1).toString().padStart(2,"0"),dd:n=>n.getDate().toString().padStart(2,"0"),HH:n=>n.getHours().toString().padStart(2,"0"),mm:n=>n.getMinutes().toString().padStart(2,"0"),ss:n=>n.getSeconds().toString().padStart(2,"0")},Y=(n,t)=>t.replace(/yy|yyyy|MM|dd|HH|mm|ss/g,e=>{var i;return(i=g[e])==null?void 0:i.call(g,n)}),m="mfuns-player";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var I;const k=window,y=k.trustedTypes,V=y?y.createPolicy("lit-html",{createHTML:n=>n}):void 0,D="$lit$",p=`lit$${(Math.random()+"").slice(9)}$`,F="?"+p,G=`<${F}>`,f=document,w=()=>f.createComment(""),x=n=>n===null||typeof n!="object"&&typeof n!="function",U=Array.isArray,J=n=>U(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",L=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,P=/-->/g,R=/>/g,A=RegExp(`>|${L}(?:([^\\s"'>=/]+)(${L}*=${L}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,q=/"/g,O=/^(?:script|style|textarea|title)$/i,K=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),N=K(1),M=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),W=new WeakMap,_=f.createTreeWalker(f,129,null,!1);function z(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return V!==void 0?V.createHTML(t):t}const Q=(n,t)=>{const e=n.length-1,i=[];let s,l=t===2?"<svg>":"",o=E;for(let a=0;a<e;a++){const r=n[a];let h,d,c=-1,$=0;for(;$<r.length&&(o.lastIndex=$,d=o.exec(r),d!==null);)$=o.lastIndex,o===E?d[1]==="!--"?o=P:d[1]!==void 0?o=R:d[2]!==void 0?(O.test(d[2])&&(s=RegExp("</"+d[2],"g")),o=A):d[3]!==void 0&&(o=A):o===A?d[0]===">"?(o=s??E,c=-1):d[1]===void 0?c=-2:(c=o.lastIndex-d[2].length,h=d[1],o=d[3]===void 0?A:d[3]==='"'?q:j):o===q||o===j?o=A:o===P||o===R?o=E:(o=A,s=void 0);const v=o===A&&n[a+1].startsWith("/>")?" ":"";l+=o===E?r+G:c>=0?(i.push(h),r.slice(0,c)+D+r.slice(c)+p+v):r+p+(c===-2?(i.push(void 0),a):v)}return[z(n,l+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class T{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let l=0,o=0;const a=t.length-1,r=this.parts,[h,d]=Q(t,e);if(this.el=T.createElement(h,i),_.currentNode=this.el.content,e===2){const c=this.el.content,$=c.firstChild;$.remove(),c.append(...$.childNodes)}for(;(s=_.nextNode())!==null&&r.length<a;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const $ of s.getAttributeNames())if($.endsWith(D)||$.startsWith(p)){const v=d[o++];if(c.push($),v!==void 0){const ct=s.getAttribute(v.toLowerCase()+D).split(p),B=/([.?@])?(.*)/.exec(v);r.push({type:1,index:l,name:B[2],strings:ct,ctor:B[1]==="."?et:B[1]==="?"?st:B[1]==="@"?nt:b})}else r.push({type:6,index:l})}for(const $ of c)s.removeAttribute($)}if(O.test(s.tagName)){const c=s.textContent.split(p),$=c.length-1;if($>0){s.textContent=y?y.emptyScript:"";for(let v=0;v<$;v++)s.append(c[v],w()),_.nextNode(),r.push({type:2,index:++l});s.append(c[$],w())}}}else if(s.nodeType===8)if(s.data===F)r.push({type:2,index:l});else{let c=-1;for(;(c=s.data.indexOf(p,c+1))!==-1;)r.push({type:7,index:l}),c+=p.length-1}l++}}static createElement(t,e){const i=f.createElement("template");return i.innerHTML=t,i}}function S(n,t,e=n,i){var s,l,o,a;if(t===M)return t;let r=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const h=x(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==h&&((l=r==null?void 0:r._$AO)===null||l===void 0||l.call(r,!1),h===void 0?r=void 0:(r=new h(n),r._$AT(n,e,i)),i!==void 0?((o=(a=e)._$Co)!==null&&o!==void 0?o:a._$Co=[])[i]=r:e._$Cl=r),r!==void 0&&(t=S(n,r._$AS(n,t.values),r,i)),t}class tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,l=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:f).importNode(i,!0);_.currentNode=l;let o=_.nextNode(),a=0,r=0,h=s[0];for(;h!==void 0;){if(a===h.index){let d;h.type===2?d=new C(o,o.nextSibling,this,t):h.type===1?d=new h.ctor(o,h.name,h.strings,this,t):h.type===6&&(d=new ot(o,this,t)),this._$AV.push(d),h=s[++r]}a!==(h==null?void 0:h.index)&&(o=_.nextNode(),a++)}return _.currentNode=f,l}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class C{constructor(t,e,i,s){var l;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(l=s==null?void 0:s.isConnected)===null||l===void 0||l}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),x(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==M&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):J(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&x(this._$AH)?this._$AA.nextSibling.data=t:this.$(f.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,l=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(z(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===l)this._$AH.v(i);else{const o=new tt(l,this),a=o.u(this.options);o.v(i),this.$(a),this._$AH=o}}_$AC(t){let e=W.get(t.strings);return e===void 0&&W.set(t.strings,e=new T(t)),e}T(t){U(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const l of t)s===e.length?e.push(i=new C(this.k(w()),this.k(w()),this,this.options)):i=e[s],i._$AI(l),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class b{constructor(t,e,i,s,l){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=l,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const l=this.strings;let o=!1;if(l===void 0)t=S(this,t,e,0),o=!x(t)||t!==this._$AH&&t!==M,o&&(this._$AH=t);else{const a=t;let r,h;for(t=l[0],r=0;r<l.length-1;r++)h=S(this,a[i+r],e,r),h===M&&(h=this._$AH[r]),o||(o=!x(h)||h!==this._$AH[r]),h===u?t=u:t!==u&&(t+=(h??"")+l[r+1]),this._$AH[r]=h}o&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class et extends b{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const it=y?y.emptyScript:"";class st extends b{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,it):this.element.removeAttribute(this.name)}}class nt extends b{constructor(t,e,i,s,l){super(t,e,i,s,l),this.type=5}_$AI(t,e=this){var i;if((t=(i=S(this,t,e,0))!==null&&i!==void 0?i:u)===M)return;const s=this._$AH,l=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||l);l&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const Z=k.litHtmlPolyfillSupport;Z==null||Z(T,C),((I=k.litHtmlVersions)!==null&&I!==void 0?I:k.litHtmlVersions=[]).push("2.8.0");const X=(n,t,e)=>{var i,s;const l=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let o=l._$litPart$;if(o===void 0){const a=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;l._$litPart$=o=new C(t.insertBefore(w(),a),a,void 0,e??{})}return o._$AI(n),o};class lt{constructor({el:t,getData:e,itemHeight:i,createItem:s,overflow:l=0}){this.data=[],this.renderStart=-1,this.renderEnd=-1,this.viewStart=0,this.viewEnd=0,this.throttle=!1,this.cleared=!1,this.el=t,this.getData=e,this.itemHeight=i,this.createItem=s,this.overflow=l,this.renderStart=-1,this.renderEnd=-1,this.viewStart=0,this.viewEnd=0,this.throttle=!1,this.cleared=!1,this.el.classList.add("vlist-container"),this.$content=document.createElement("div"),this.$content.classList.add("vlist-content"),this.el.appendChild(this.$content),this.el.addEventListener("scroll",()=>{this.cleared||this.handleScroll()}),this.reload()}reload(){this.clear(),this.data=this.getData(),console.log(this.data),this.renderStart=-1,this.renderEnd=-1,this.viewStart=0,this.viewEnd=0,this.throttle=!1,this.handleScroll(),this.cleared=!1}update(){this.data=this.getData(),this.handleScroll()}handleScroll(){if(!this.throttle){const t=this.el.clientHeight,e=this.el.scrollTop;this.viewStart=this.getViewStart(e),this.viewEnd=this.getViewEnd(e,t),(this.viewStart<=this.renderStart||this.viewEnd>=this.renderEnd)&&this.render(t,e)}}render(t,e){const i=this.renderStart,s=this.renderEnd;if(this.renderStart=this.getViewStart(e)-this.overflow,this.renderEnd=this.getViewEnd(e,t)+this.overflow,this.renderStart<i){const l=document.createDocumentFragment(),o=Math.max(this.renderStart,0),a=Math.min(i-1,this.renderEnd,this.data.length-1);for(let r=o;r<=a;r++)l.appendChild(this.createItem(this.data[r],r,this.data));this.$content.insertBefore(l,this.$content.firstElementChild)}else{const l=Math.max(i,0),o=Math.min(this.renderStart-1,s);for(let a=l;a<=o;a++){const r=this.$content.firstElementChild;r&&this.$content.removeChild(r)}}if(this.renderEnd>s){const l=document.createDocumentFragment(),o=Math.max(s+1,this.renderStart),a=Math.min(this.renderEnd,this.data.length-1);for(let r=o;r<=a;r++)l.appendChild(this.createItem(this.data[r],r,this.data));this.$content.appendChild(l)}else{const l=Math.min(s,this.data.length-1),o=Math.max(this.renderEnd+1,i);for(let a=l;a>=o;a--){const r=this.$content.lastElementChild;r&&this.$content.removeChild(r)}}this.$content.style.paddingTop=`${this.renderStart>0?this.renderStart*this.itemHeight:0}px`,this.$content.style.paddingBottom=`${this.renderEnd<this.data.length-1?(this.data.length-this.renderEnd-1)*this.itemHeight:0}px`}getViewStart(t){return Math.floor(t/this.itemHeight)}getViewEnd(t,e){return Math.ceil((t+e)/this.itemHeight)-1}clear(){this.data=[],this.$content.innerHTML="",this.$content.style.paddingTop="0px",this.$content.style.paddingBottom="0px",this.cleared=!0}locateStart(t){this.el.scrollTo({top:t*this.itemHeight,behavior:"auto"})}locateEnd(t){this.el.scrollTo({top:t*this.itemHeight-this.el.clientHeight,behavior:"auto"})}}const rt=n=>N`
  <div class="${m}-side-panel ${m}-danmaku-list">
    <div class="${m}-danmaku-list-main">
      <div class="${m}-danmaku-list-head">
        <div class="list-column col-time" @click=${n.time}>时间</div>
        <div class="list-column col-content" @click=${n.content}>弹幕内容</div>
        <div class="list-column col-date" @click=${n.date}>发送时间</div>
      </div>
      <div class="${m}-danmaku-list-container">
        <div class="${m}-danmaku-list-list"></div>
      </div>
      <div class="${m}-danmaku-list-status">
        <div class="status-loading-text">弹幕列表装填中……</div>
        <div class="status-failed-text">弹幕加载失败 X_X</div>
        <div class="status-empty-text">还没有弹幕哦，快来发弹幕^_^</div>
      </div>
    </div>
    <div class="${m}-danmaku-auxiliary-foot"></div>
  </div>
`,at=(n,t,e)=>{const i=N`
    <div class="list-row" data-index="${t}" data-mode="${n.mode}">
      <div class="list-cell col-time">${H(n.time)}</div>
      <div class="list-cell col-content">${n.content}</div>
      <div class="list-cell col-date">
        ${n.date?Y(new Date(n.date*1e3),"yy-MM-dd HH:mm"):"-"}
      </div>
      ${e.length?N` <div class="list-operate">
            ${e(n).map(([l,o])=>N`<div
                class="list-operate-btn"
                @click=${()=>{o(n)}}
              >
                ${l}
              </div>`)}
          </div>`:""}
    </div>
  `,s=new DocumentFragment;return X(i,s),s.firstElementChild};class ht{constructor(t){this.data=[],this.sortedBy="time",this.sortOrder=-1,this.autoScroll=!0,this.mounted=!1,this.player=t;const e=new DocumentFragment;X(rt({time:()=>{},content:()=>{},date:()=>{}}),e),this.el=e.querySelector(`.${m}-danmaku-list`),this.$container=e.querySelector(`.${m}-danmaku-list-container`),this.$status=e.querySelector(`.${m}-danmaku-list-status`),this.$colTime=e.querySelector(".col-time"),this.$colDate=e.querySelector(".col-date"),this.$colContent=e.querySelector(".col-content"),this.$colTime.onclick=()=>{this.setAutoScroll(!1),this.sortedBy=="time"?this.sort("time",-this.sortOrder):this.sort("time",1)},this.$colDate.onclick=()=>{this.setAutoScroll(!1),this.sortedBy=="date"?this.sort("date",-this.sortOrder):this.sort("date",1)}}init(){const t=this.player.danmaku.api,e=this.player.danmaku.operate;this.list=new lt({el:this.$container,getData:()=>this.data,itemHeight:24,createItem:(i,s)=>at(i,s,l=>{const o=l.user==this.player.userId;return[["举报",a=>{e.report(a)},!o&&(t==null?void 0:t.report)],["屏蔽",a=>{e.blockUser(a.user,!0)},!o&&(t==null?void 0:t.blockUser)],["撤回",a=>{e.recall(a)},o&&(t==null?void 0:t.recall)]].filter(a=>a[2])}),overflow:5}),this.list.el.addEventListener("wheel",()=>{this.setAutoScroll(!1)}),this.list.el.addEventListener("mousedown",()=>{this.setAutoScroll(!1)}),this.setAutoScroll(this.autoScroll),this.player.on("part",()=>{this.clear()}),this.player.on("danmaku:load_end",i=>{this.fill(i)}),this.player.on("danmaku:load_addition_end",(i,s)=>{this.fill(s)}),this.player.on("timeupdate",i=>{this.autoScroll&&this.locateByTime(i)})}sort(t,e=1){this.sortedBy=t,this.sortOrder=e,this.data.sort((i,s)=>{const l=i[this.sortedBy],o=s[this.sortedBy];return l>o?e:l==o?0:-e}),this.list.reload()}fill(t){this.data=this.data.concat(t),this.data.length?(this.reload(),this.setStatus()):this.setStatus("empty")}add(t){this.data=this.data.concat(t),this.data.length?(this.list.update(),this.setStatus()):this.setStatus("empty")}reload(){this.sort(this.sortedBy,this.sortOrder),this.autoScroll&&this.locateByTime(this.player.time)}clear(){this.list.clear(),this.data=[],this.setStatus("loading")}setStatus(t=""){this.$status.dataset.status=t,console.log("弹幕加载状态"+t)}locateByTime(t){var i,s;let e=this.list.viewEnd;for(((i=this.data[e])==null?void 0:i.time)>t&&(e=0);((s=this.data[e+1])==null?void 0:s.time)<=t;)e++;this.list.locateEnd(e)}setAutoScroll(t){this.autoScroll=t,t&&(this.sort("time"),this.locateByTime(this.player.time))}}const dt="danmakuList";return()=>{let n;return{id:dt,create:(t,e)=>(n=new ht(t),{el:n.el}),init:(t,e)=>{n.init()},destroy:t=>{}}}});
//# sourceMappingURL=danmaku-list.umd.js.map