!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o={};function r(e,t){for(var n in t)e[n]=t[n];return e}function i(e,t){null!=e&&("function"==typeof e?e(t):e.current=t)}var a="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;var l=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,s=[];function p(e){!e._dirty&&(e._dirty=!0)&&1==s.push(e)&&(o.debounceRendering||a)(u)}function u(){for(var e;e=s.pop();)e._dirty&&M(e)}function c(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function f(e){var t=r({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function d(e){var t=e.parentNode;t&&t.removeChild(e)}function m(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)i(n,null),i(o,e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var a in n)a in o||(e.style[a]="");for(var a in o)e.style[a]="number"==typeof o[a]&&!1===l.test(a)?o[a]+"px":o[a]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var s=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,v,s):e.removeEventListener(t,v,s),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(e){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var p=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?p?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(p?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function v(e){return this._listeners[e.type](o.event&&o.event(e)||e)}var _=[],h=0,y=!1,b=!1;function g(){for(var e;e=_.shift();)o.afterMount&&o.afterMount(e),e.componentDidMount&&e.componentDidMount()}function x(e,t,n,o,r,i){h++||(y=null!=r&&void 0!==r.ownerSVGElement,b=null!=e&&!("__preactattr_"in e));var a=C(e,t,n,o,i);return r&&a.parentNode!==r&&r.appendChild(a),--h||(b=!1,i||g()),a}function C(e,t,n,o,r){var i=e,a=y;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0))),i.__preactattr_=!0,i;var l,s,p=t.nodeName;if("function"==typeof p)return function(e,t,n,o){var r=e&&e._component,i=r,a=e,l=r&&e._componentConstructor===t.nodeName,s=l,p=f(t);for(;r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;r&&s&&(!o||r._component)?(U(r,p,3,n,o),e=r.base):(i&&!l&&(T(i),e=a=null),r=k(t.nodeName,p,n),e&&!r.nextBase&&(r.nextBase=e,a=null),U(r,p,1,n,o),e=r.base,a&&e!==a&&(a._component=null,N(a,!1)));return e}(e,t,n,o);if(y="svg"===p||"foreignObject"!==p&&y,p=String(p),(!e||!c(e,p))&&(l=p,(s=y?document.createElementNS("http://www.w3.org/2000/svg",l):document.createElement(l)).normalizedNodeName=l,i=s,e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),N(e,!0)}var u=i.firstChild,v=i.__preactattr_,_=t.children;if(null==v){v=i.__preactattr_={};for(var h=i.attributes,g=h.length;g--;)v[h[g].name]=h[g].value}return!b&&_&&1===_.length&&"string"==typeof _[0]&&null!=u&&void 0!==u.splitText&&null==u.nextSibling?u.nodeValue!=_[0]&&(u.nodeValue=_[0]):(_&&_.length||null!=u)&&function(e,t,n,o,r){var i,a,l,s,p,u=e.childNodes,f=[],m={},v=0,_=0,h=u.length,y=0,b=t?t.length:0;if(0!==h)for(var g=0;g<h;g++){var x=u[g],S=x.__preactattr_,w=b&&S?x._component?x._component.__key:S.key:null;null!=w?(v++,m[w]=x):(S||(void 0!==x.splitText?!r||x.nodeValue.trim():r))&&(f[y++]=x)}if(0!==b)for(var g=0;g<b;g++){s=t[g],p=null;var w=s.key;if(null!=w)v&&void 0!==m[w]&&(p=m[w],m[w]=void 0,v--);else if(_<y)for(i=_;i<y;i++)if(void 0!==f[i]&&(k=a=f[i],U=r,"string"==typeof(P=s)||"number"==typeof P?void 0!==k.splitText:"string"==typeof P.nodeName?!k._componentConstructor&&c(k,P.nodeName):U||k._componentConstructor===P.nodeName)){p=a,f[i]=void 0,i===y-1&&y--,i===_&&_++;break}p=C(p,s,n,o),l=u[g],p&&p!==e&&p!==l&&(null==l?e.appendChild(p):p===l.nextSibling?d(l):e.insertBefore(p,l))}var k,P,U;if(v)for(var g in m)void 0!==m[g]&&N(m[g],!1);for(;_<=y;)void 0!==(p=f[y--])&&N(p,!1)}(i,_,n,o,b||null!=v.dangerouslySetInnerHTML),function(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||m(e,o,n[o],n[o]=void 0,y);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||m(e,o,n[o],n[o]=t[o],y)}(i,t.attributes,v),y=a,i}function N(e,t){var n=e._component;n?T(n):(null!=e.__preactattr_&&i(e.__preactattr_.ref,null),!1!==t&&null!=e.__preactattr_||d(e),S(e))}function S(e){for(e=e.lastChild;e;){var t=e.previousSibling;N(e,!0),e=t}}var w=[];function k(e,t,n){var o,r=w.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),B.call(o,t,n)):((o=new B(t,n)).constructor=e,o.render=P);r--;)if(w[r].constructor===e)return o.nextBase=w[r].nextBase,w.splice(r,1),o;return o}function P(e,t,n){return this.constructor(e,n)}function U(e,t,n,r,a){e._disable||(e._disable=!0,e.__ref=t.ref,e.__key=t.key,delete t.ref,delete t.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||a?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(t,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=t,e._disable=!1,0!==n&&(1!==n&&!1===o.syncComponentUpdates&&e.base?p(e):M(e,1,a)),i(e.__ref,e))}function M(e,t,n,i){if(!e._disable){var a,l,s,p=e.props,u=e.state,c=e.context,d=e.prevProps||p,m=e.prevState||u,v=e.prevContext||c,y=e.base,b=e.nextBase,C=y||b,S=e._component,w=!1,P=v;if(e.constructor.getDerivedStateFromProps&&(u=r(r({},u),e.constructor.getDerivedStateFromProps(p,u)),e.state=u),y&&(e.props=d,e.state=m,e.context=v,2!==t&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(p,u,c)?w=!0:e.componentWillUpdate&&e.componentWillUpdate(p,u,c),e.props=p,e.state=u,e.context=c),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!w){a=e.render(p,u,c),e.getChildContext&&(c=r(r({},c),e.getChildContext())),y&&e.getSnapshotBeforeUpdate&&(P=e.getSnapshotBeforeUpdate(d,m));var B,L,D=a&&a.nodeName;if("function"==typeof D){var j=f(a);(l=S)&&l.constructor===D&&j.key==l.__key?U(l,j,1,c,!1):(B=l,e._component=l=k(D,j,c),l.nextBase=l.nextBase||b,l._parentComponent=e,U(l,j,0,c,!1),M(l,1,n,!0)),L=l.base}else s=C,(B=S)&&(s=e._component=null),(C||1===t)&&(s&&(s._component=null),L=x(s,a,c,n||!y,C&&C.parentNode,!0));if(C&&L!==C&&l!==S){var W=C.parentNode;W&&L!==W&&(W.replaceChild(L,C),B||(C._component=null,N(C,!1)))}if(B&&T(B),e.base=L,L&&!i){for(var O=e,E=e;E=E._parentComponent;)(O=E).base=L;L._component=O,L._componentConstructor=O.constructor}}for(!y||n?_.push(e):w||(e.componentDidUpdate&&e.componentDidUpdate(d,m,P),o.afterUpdate&&o.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);h||i||g()}}function T(e){o.beforeUnmount&&o.beforeUnmount(e);var t=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var n=e._component;n?T(n):t&&(null!=t.__preactattr_&&i(t.__preactattr_.ref,null),e.nextBase=t,d(t),w.push(e),S(t)),i(e.__ref,null)}function B(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function L(e,t,n){return x(n,e,{},!1,t,!1)}r(B.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=r(r({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),p(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),M(this,2)},render:function(){}});L(React.createElement(class extends B{constructor(){super(),this.state={time:Date.now()}}componentDidMount(){this.timer=setInterval(()=>{this.setState({time:Date.now()})},1e3)}componentWillUnmount(){clearInterval(this.timer)}render(e,t){let n=new Date(t.time).toLocaleTimeString();return React.createElement("span",null,n)}},null),document.body)}]);