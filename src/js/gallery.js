var et=Object.defineProperty,kt=Object.defineProperties,Ut=Object.getOwnPropertyDescriptor,Ht=Object.getOwnPropertyDescriptors;var G=Object.getOwnPropertySymbols;var Mt=Object.prototype.hasOwnProperty,Rt=Object.prototype.propertyIsEnumerable;var tt=(o,t,e)=>t in o?et(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e,x=(o,t)=>{for(var e in t||(t={}))Mt.call(t,e)&&tt(o,e,t[e]);if(G)for(var e of G(t))Rt.call(t,e)&&tt(o,e,t[e]);return o},E=(o,t)=>kt(o,Ht(t));var f=(o,t,e,i)=>{for(var s=i>1?void 0:i?Ut(t,e):t,r=o.length-1,n;r>=0;r--)(n=o[r])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&et(t,e,s),s};var L=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),it=new Map,z=class{constructor(t,e){if(this._$cssResult$=!0,e!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=it.get(this.cssText);return L&&t===void 0&&(it.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}},st=o=>new z(typeof o=="string"?o:o+"",D),j=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new z(e,D)},B=(o,t)=>{L?o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{let i=document.createElement("style"),s=window.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)})},q=L?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return st(e)})(o):o;var K,ot=window.trustedTypes,Nt=ot?ot.emptyScript:"",rt=window.reactiveElementPolyfillSupport,W={toAttribute(o,t){switch(t){case Boolean:o=o?Nt:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch(i){e=null}}return e}},nt=(o,t)=>t!==o&&(t==t||o==o),V={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:nt},v=class extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();let t=[];return this.elementProperties.forEach((e,i)=>{let s=this._$Eh(i,e);s!==void 0&&(this._$Eu.set(s,i),t.push(s))}),t}static createProperty(t,e=V){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){let i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){let r=this[t];this[e]=s,this.requestUpdate(t,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||V}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;let t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){let e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(q(s))}else t!==void 0&&e.push(q(t));return e}static _$Eh(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ep=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Em(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$Eg)!==null&&e!==void 0?e:this._$Eg=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$Eg)===null||e===void 0||e.splice(this._$Eg.indexOf(t)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;let e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return B(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Eg)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ES(t,e,i=V){var s,r;let n=this.constructor._$Eh(t,i);if(n!==void 0&&i.reflect===!0){let d=((r=(s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==null&&r!==void 0?r:W.toAttribute)(e,i.type);this._$Ei=t,d==null?this.removeAttribute(n):this.setAttribute(n,d),this._$Ei=null}}_$AK(t,e){var i,s,r;let n=this.constructor,d=n._$Eu.get(t);if(d!==void 0&&this._$Ei!==d){let l=n.getPropertyOptions(d),a=l.converter,p=(r=(s=(i=a)===null||i===void 0?void 0:i.fromAttribute)!==null&&s!==void 0?s:typeof a=="function"?a:null)!==null&&r!==void 0?r:W.fromAttribute;this._$Ei=d,this[d]=p(e,l.type),this._$Ei=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||nt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Ei!==t&&(this._$E_===void 0&&(this._$E_=new Map),this._$E_.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((s,r)=>this[r]=s),this._$Et=void 0);let e=!1,i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$Eg)===null||t===void 0||t.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$Eg)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(t){return!0}update(t){this._$E_!==void 0&&(this._$E_.forEach((e,i)=>this._$ES(i,this[i],e)),this._$E_=void 0),this._$EU()}updated(t){}firstUpdated(t){}};v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},rt==null||rt({ReactiveElement:v}),((K=globalThis.reactiveElementVersions)!==null&&K!==void 0?K:globalThis.reactiveElementVersions=[]).push("1.2.2");var Z,w=globalThis.trustedTypes,lt=w?w.createPolicy("lit-html",{createHTML:o=>o}):void 0,$=`lit$${(Math.random()+"").slice(9)}$`,mt="?"+$,It=`<${mt}>`,C=document,H=(o="")=>C.createComment(o),M=o=>o===null||typeof o!="object"&&typeof o!="function",gt=Array.isArray,Ot=o=>{var t;return gt(o)||typeof((t=o)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,dt=/>/g,_=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,ht=/'/g,ct=/"/g,ft=/^(?:script|style|textarea|title)$/i,vt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),$t=vt(1),Zt=vt(2),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ut=new WeakMap,yt=(o,t,e)=>{var i,s;let r=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t,n=r._$litPart$;if(n===void 0){let d=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=n=new k(t.insertBefore(H(),d),d,void 0,e!=null?e:{})}return n._$AI(o),n},S=C.createTreeWalker(C,129,null,!1),Lt=(o,t)=>{let e=o.length-1,i=[],s,r=t===2?"<svg>":"",n=U;for(let l=0;l<e;l++){let a=o[l],p,h,c=-1,m=0;for(;m<a.length&&(n.lastIndex=m,h=n.exec(a),h!==null);)m=n.lastIndex,n===U?h[1]==="!--"?n=at:h[1]!==void 0?n=dt:h[2]!==void 0?(ft.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=_):h[3]!==void 0&&(n=_):n===_?h[0]===">"?(n=s!=null?s:U,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,p=h[1],n=h[3]===void 0?_:h[3]==='"'?ct:ht):n===ct||n===ht?n=_:n===at||n===dt?n=U:(n=_,s=void 0);let I=n===_&&o[l+1].startsWith("/>")?" ":"";r+=n===U?a+It:c>=0?(i.push(p),a.slice(0,c)+"$lit$"+a.slice(c)+$+I):a+$+(c===-2?(i.push(void 0),l):I)}let d=r+(o[e]||"<?>")+(t===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[lt!==void 0?lt.createHTML(d):d,i]},P=class{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,n=0,d=t.length-1,l=this.parts,[a,p]=Lt(t,e);if(this.el=P.createElement(a,i),S.currentNode=this.el.content,e===2){let h=this.el.content,c=h.firstChild;c.remove(),h.append(...c.childNodes)}for(;(s=S.nextNode())!==null&&l.length<d;){if(s.nodeType===1){if(s.hasAttributes()){let h=[];for(let c of s.getAttributeNames())if(c.endsWith("$lit$")||c.startsWith($)){let m=p[n++];if(h.push(c),m!==void 0){let I=s.getAttribute(m.toLowerCase()+"$lit$").split($),O=/([.?@])?(.*)/.exec(m);l.push({type:1,index:r,name:O[2],strings:I,ctor:O[1]==="."?bt:O[1]==="?"?At:O[1]==="@"?xt:R})}else l.push({type:6,index:r})}for(let c of h)s.removeAttribute(c)}if(ft.test(s.tagName)){let h=s.textContent.split($),c=h.length-1;if(c>0){s.textContent=w?w.emptyScript:"";for(let m=0;m<c;m++)s.append(h[m],H()),S.nextNode(),l.push({type:2,index:++r});s.append(h[c],H())}}}else if(s.nodeType===8)if(s.data===mt)l.push({type:2,index:r});else{let h=-1;for(;(h=s.data.indexOf($,h+1))!==-1;)l.push({type:7,index:r}),h+=$.length-1}r++}}static createElement(t,e){let i=C.createElement("template");return i.innerHTML=t,i}};function T(o,t,e=o,i){var s,r,n,d;if(t===b)return t;let l=i!==void 0?(s=e._$Cl)===null||s===void 0?void 0:s[i]:e._$Cu,a=M(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==a&&((r=l==null?void 0:l._$AO)===null||r===void 0||r.call(l,!1),a===void 0?l=void 0:(l=new a(o),l._$AT(o,e,i)),i!==void 0?((n=(d=e)._$Cl)!==null&&n!==void 0?n:d._$Cl=[])[i]=l:e._$Cu=l),l!==void 0&&(t=T(o,l._$AS(o,t.values),l,i)),t}var _t=class{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;let{el:{content:i},parts:s}=this._$AD,r=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:C).importNode(i,!0);S.currentNode=r;let n=S.nextNode(),d=0,l=0,a=s[0];for(;a!==void 0;){if(d===a.index){let p;a.type===2?p=new k(n,n.nextSibling,this,t):a.type===1?p=new a.ctor(n,a.name,a.strings,this,t):a.type===6&&(p=new Et(n,this,t)),this.v.push(p),a=s[++l]}d!==(a==null?void 0:a.index)&&(n=S.nextNode(),d++)}return r}m(t){let e=0;for(let i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},k=class{constructor(t,e,i,s){var r;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cg=(r=s==null?void 0:s.isConnected)===null||r===void 0||r}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=T(this,t,e),M(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.S(t):Ot(t)?this.A(t):this.$(t)}M(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.M(t))}$(t){this._$AH!==u&&M(this._$AH)?this._$AA.nextSibling.data=t:this.S(C.createTextNode(t)),this._$AH=t}T(t){var e;let{values:i,_$litType$:s}=t,r=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=P.createElement(s.h,this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===r)this._$AH.m(i);else{let n=new _t(r,this),d=n.p(this.options);n.m(i),this.S(d),this._$AH=n}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new P(t)),e}A(t){gt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new k(this.M(H()),this.M(H()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){let s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}},R=class{constructor(t,e,i,s,r){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){let r=this.strings,n=!1;if(r===void 0)t=T(this,t,e,0),n=!M(t)||t!==this._$AH&&t!==b,n&&(this._$AH=t);else{let d=t,l,a;for(t=r[0],l=0;l<r.length-1;l++)a=T(this,d[i+l],e,l),a===b&&(a=this._$AH[l]),n||(n=!M(a)||a!==this._$AH[l]),a===u?t=u:t!==u&&(t+=(a!=null?a:"")+r[l+1]),this._$AH[l]=a}n&&!s&&this.k(t)}k(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}},bt=class extends R{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===u?void 0:t}},zt=w?w.emptyScript:"",At=class extends R{constructor(){super(...arguments),this.type=4}k(t){t&&t!==u?this.element.setAttribute(this.name,zt):this.element.removeAttribute(this.name)}},xt=class extends R{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){var i;if((t=(i=T(this,t,e,0))!==null&&i!==void 0?i:u)===b)return;let s=this._$AH,r=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}},Et=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){T(this,t)}};var pt=window.litHtmlPolyfillSupport;pt==null||pt(P,k),((Z=globalThis.litHtmlVersions)!==null&&Z!==void 0?Z:globalThis.litHtmlVersions=[]).push("2.1.3");var J,F;var A=class extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;let i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=yt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return b}};A.finalized=!0,A._$litElement$=!0,(J=globalThis.litElementHydrateSupport)===null||J===void 0||J.call(globalThis,{LitElement:A});var St=globalThis.litElementPolyfillSupport;St==null||St({LitElement:A});((F=globalThis.litElementVersions)!==null&&F!==void 0?F:globalThis.litElementVersions=[]).push("3.1.2");var wt=o=>t=>typeof t=="function"?((e,i)=>(window.customElements.define(e,i),i))(o,t):((e,i)=>{let{kind:s,elements:r}=i;return{kind:s,elements:r,finisher(n){window.customElements.define(e,n)}}})(o,t);var qt=(o,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?E(x({},t),{finisher(e){e.createProperty(t.key,o)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,o)}};function N(o){return(t,e)=>e!==void 0?((i,s,r)=>{s.constructor.createProperty(r,i)})(o,t,e):qt(o,t)}function Q(o){return N(E(x({},o),{state:!0}))}var y=({finisher:o,descriptor:t})=>(e,i)=>{var s;if(i===void 0){let r=(s=e.originalKey)!==null&&s!==void 0?s:e.key,n=t!=null?{kind:"method",placement:"prototype",key:r,descriptor:t(e.key)}:E(x({},e),{key:r});return o!=null&&(n.finisher=function(d){o(d,r)}),n}{let r=e.constructor;t!==void 0&&Object.defineProperty(e,i,t(i)),o==null||o(r,i)}};function Ct(o,t){return y({descriptor:e=>{let i={get(){var s,r;return(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(o))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(t){let s=typeof e=="symbol"?Symbol():"__"+e;i.get=function(){var r,n;return this[s]===void 0&&(this[s]=(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&n!==void 0?n:null),this[s]}}return i}})}var X,Dt=((X=window.HTMLSlotElement)===null||X===void 0?void 0:X.prototype.assignedElements)!=null?(o,t)=>o.assignedElements(t):(o,t)=>o.assignedNodes(t).filter(e=>e.nodeType===Node.ELEMENT_NODE);function Y(o){let{slot:t,selector:e}=o!=null?o:{};return y({descriptor:i=>({get(){var s;let r="slot"+(t?`[name=${t}]`:":not([name])"),n=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r),d=n!=null?Dt(n,o):[];return e?d.filter(l=>l.matches(e)):d},enumerable:!0,configurable:!0})})}function Pt(o,t,e){return o<t?t:o>e?e:o}var Tt=j`.static{
  position:static;
}
.fixed{
  position:fixed;
}
.top-0{
  top:0px;
}
.bottom-0{
  bottom:0px;
}
.right-0{
  right:0px;
}
.left-0{
  left:0px;
}
.z-10{
  z-index:10;
}
.grid{
  display:grid;
}
.hidden{
  display:none;
}
.grid-cols-1{
  grid-template-columns:repeat(1, minmax(0, 1fr));
}
.gap-1{
  gap:0.25rem;
}
.bg-gray-700\\/75{
  background-color:rgb(55 65 81 / 0.75);
}
    .image-container{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  z-index:1;
}

.selected-image{
  width:1024px;
  height:768px;
  max-height:100vh;
  max-width:100vw;
  background-color:#ffffff;
  display:flex;
  justify-content:center;
  align-items:center;
}

.previous-btn,
.next-btn{
  background-color:#ffffff;
  padding:24px;
  font-size:24px;
  font-weight:600;
  cursor:pointer;
  border:none;
}

.previous-btn:hover,
.next-btn:hover{
  background-color:#eee;
}

.previous-btn:disabled,
.next-btn:disabled{
  display:none;
}

.previous-btn{
  border-top-left-radius:8px;
  border-bottom-left-radius:8px;
}

.next-btn{
  border-top-right-radius:8px;
  border-bottom-right-radius:8px;
}

figure{
  position:relative;
  margin:0;
  padding:0;
}

figcaption{
  position:absolute;
  text-align:center;
  padding:8px;
  background-color:#eee;
  bottom:0;
}

@media (min-width: 640px){
  .sm\\:grid-cols-2{
    grid-template-columns:repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px){
  .md\\:grid-cols-3{
    grid-template-columns:repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px){
  .lg\\:grid-cols-4{
    grid-template-columns:repeat(4, minmax(0, 1fr));
  }
}
;`;var g=class extends A{constructor(){super(...arguments);this.show=!1;this.replacements="";this.selectedIndex=0}firstUpdated(){this.images.forEach(t=>{t.tabIndex=1,t.style.cursor="pointer"})}setImage(){let t=this.images[this.selectedIndex].cloneNode();this.replacements.split(",").forEach(e=>{let i=e.split(":");t.src=t.src.replace(i[0],i[1])}),this.selectedImage=t}onClick(t){let e=t.target,i=this.images.findIndex(s=>s.src===e.src);this.goTo(i)}goTo(t){var e;this.selectedIndex=Pt(t,0,this.images.length-1),this.setImage(),document.body.style.overflow="hidden",document.body.style.margin="0",document.body.style.paddingRight="15px",document.body.style.height="100vh",this.show=!0,(e=this.figure)==null||e.focus()}onPrevious(t){t.stopPropagation(),this.goTo(this.selectedIndex-1)}onNext(t){t.stopPropagation(),this.goTo(this.selectedIndex+1)}onClose(){this.show=!1,document.body.style.overflow="inherit",document.body.style.margin="inherit",document.body.style.paddingRight="inherit",document.body.style.height="inherit",this.images[this.selectedIndex].focus()}onKeyPress(t){switch(t.key){case"ArrowLeft":return this.goTo(this.selectedIndex-1);case"ArrowRight":return this.goTo(this.selectedIndex+1);case"Escape":return this.onClose();case"Enter":let e=document.activeElement;if(e==null?void 0:e.src){let i=this.images.findIndex(s=>s.src===e.src);this.goTo(i)}break;default:break}}get nextDisabled(){return this.selectedIndex>=this.images.length-1}get previousDisabled(){return this.selectedIndex<1}render(){var t;return $t`<div
      @keydown=${this.onKeyPress}
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1"
    >
      <slot @click=${this.onClick}></slot>
      <div
        ?hidden=${!this.show}
        @click=${this.onClose}
        class="fixed top-0 bottom-0 right-0 left-0 bg-gray-700/75 z-10"
      >
        <div class="image-container">
          <button
            class="previous-btn"
            @click=${this.onPrevious}
            ?disabled=${this.previousDisabled}
          >
            &lt;
          </button>
          <figure class="selected-image">
            ${this.selectedImage}
            <figcaption>${(t=this.selectedImage)==null?void 0:t.alt}</figcaption>
          </figure>
          <button
            class="next-btn"
            @click=${this.onNext}
            ?disabled=${this.nextDisabled}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>`}};g.styles=Tt,f([N({type:Boolean})],g.prototype,"show",2),f([N({type:String})],g.prototype,"replacements",2),f([Q()],g.prototype,"selectedImage",2),f([Q()],g.prototype,"selectedIndex",2),f([Y({selector:"img"})],g.prototype,"images",2),f([Ct("figure")],g.prototype,"figure",2),g=f([wt("wb-gallery")],g);export{g as default};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
