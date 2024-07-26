/*
* HSCore
* @version: 2.0.0 (27 April, 2021)
* @author: HtmlStream
* @event-namespace: .HSCore
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/
"use strict";const HSCore={init:()=>{[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map((function(e){return new bootstrap.Tooltip(e)})),[].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map((function(e){return new bootstrap.Popover(e)}))},components:{}};HSCore.init();const validators={"data-hs-validation-equal-field":e=>{document.querySelector(e.getAttribute("data-hs-validation-equal-field"))}},HSBsValidation={init(e,t){var i=document.querySelectorAll(e);return Array.prototype.slice.call(i).forEach((e=>{for(const t in validators)Array.prototype.slice.call(e.querySelectorAll(`[${t}]`)).forEach(validators[t]);e.addEventListener("submit",(i=>{e.checkValidity()?this.onSubmit({event:i,form:e,options:t}):(i.preventDefault(),i.stopPropagation()),e.classList.add("was-validated")}),!1)})),this},onSubmit:e=>!(!e.options||"function"!=typeof e.options.onSubmit)&&e.options.onSubmit(e)}
/*
* Leaflet wrapper
* @version: 2.0.0 (Sat, 22 May 2021)
* @requires: Leafletjs v1.6.0
* @author: HtmlStream
* @event-namespace: .HSCore.components.HSLeaflet
* @license: Htmlstream Libraries (https://htmlstream.com/licenses)
* Copyright 2021 Htmlstream
*/;function isObject(e){return e&&"object"==typeof e&&!Array.isArray(e)}function mergeDeep(e,...t){if(!t.length)return e;const i=t.shift();if(isObject(e)&&isObject(i))for(const t in i)isObject(i[t])?(e[t]||Object.assign(e,{[t]:{}}),mergeDeep(e[t],i[t])):Object.assign(e,{[t]:i[t]});return mergeDeep(e,...t)}HSCore.components.HSLeaflet={init:function(e,t){if(this.$el="string"==typeof e?document.querySelector(e):e,this.$el){this.defaults={map:{coords:[51.505,-.09],zoom:13},layer:{token:"https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",id:"mapbox/streets-v11",maxZoom:18},marker:null};var i=this.$el.hasAttribute("data-hs-leaflet-options")?JSON.parse(this.$el.getAttribute("data-hs-leaflet-options")):{};this.settings=mergeDeep(this.defaults,{...t,...i});var l=L.map(this.$el,this.settings.map);if(l.setView(this.settings.map.coords,this.settings.map.zoom),L.tileLayer(this.settings.layer.token,this.settings.layer).addTo(l),this.settings.marker)for(var s=0;s<this.settings.marker.length;s++){this.settings.marker[s].icon=L.icon(this.settings.marker[s].icon);let e=L.marker(this.settings.marker[s].coords,this.settings.marker[s]).addTo(l);this.settings.marker[s].popup&&e.bindPopup(this.settings.marker[s].popup.text)}return l}}},HSCore.components.HSList={dataAttributeName:"data-hs-list-options",defaults:{searchMenu:!1,searchMenuDelay:300,searchMenuOutsideClose:!0,searchMenuInsideClose:!0,clearSearchInput:!0,keyboard:!1,empty:!1},collection:[],init:function(e,t,i){const l=this;let s;s=e instanceof HTMLElement?[e]:e instanceof Object?e:document.querySelectorAll(e);for(let e=0;e<s.length;e+=1)l.addToCollection(s[e],t,i||s[e].id);return!!l.collection.length&&(l._init(),this)},initializeHover:function(e,t,i){const l=this;var s=e.querySelector(`.${i.searchClass}`),o=!1;s.addEventListener("keydown",(n=>{if(40===n.which)n.preventDefault(),l.searchMenuShow(e,t,i),(a=i.list.querySelector(".active"))?a.nextElementSibling&&((r=a.nextElementSibling).classList.add("active"),o.classList.remove("active"),o=r,i.list.offsetHeight<r.getBoundingClientRect().top&&(i.list.scrollTop=r.getBoundingClientRect().top+i.list.scrollTop)):(o=i.list.firstChild).classList.add("active");else if(38===n.which){var a,r;if(n.preventDefault(),a=i.list.querySelector(".active")){if(a.previousElementSibling)(r=a.previousElementSibling).classList.add("active"),o.classList.remove("active"),o=r,0>r.getBoundingClientRect().top&&(i.list.scrollTop=r.getBoundingClientRect().top+i.list.scrollTop-i.list.offsetHeight)}else(o=i.list.firstChild.parentNode).classList.add("active")}else if(13==n.which&&s.value.length>0){n.preventDefault();const e=o.querySelector("a").getAttribute("href");e&&(window.location=e)}}))},searchMenu:function(e,t,i){const l=this;if(0===e.querySelector(`.${i.searchClass}`).value.length||0===i.visibleItems.length&&!t.empty)return l.helpers.fadeOut(i.list,t.searchMenuDelay),l.helpers.hide(t.empty);l.searchMenuShow(e,t,i)},searchMenuShow:function(e,t,i){const l=this;if(l.helpers.fadeIn(i.list,t.searchMenuDelay),!i.visibleItems.length){var s=l.helpers.show(document.querySelector(t.empty).cloneNode(!0));i.list.innerHTML=s.outerHTML}},searchMenuHide:function(e,t,i){const l=this;var s=e.querySelector(`.${i.searchClass}`);t.searchMenuOutsideClose&&document.addEventListener("click",(()=>{l.helpers.fadeOut(i.list,t.searchMenuDelay),t.clearSearchInput&&(s.value="")})),t.searchMenuInsideClose||i.list.addEventListener("click",(e=>{e.stopPropagation(),t.clearSearchInput&&s.val("")}))},emptyBlock:function(e,t,i){const l=this;if(0===e.querySelector(`.${i.searchClass}`).value.length||0===i.visibleItems.length&&!t.empty)l.helpers.hide(t.empty);else if(l.helpers.fadeIn(i.list,t.searchMenuDelay),!i.visibleItems.length){var s=document.querySelector(t.empty).clone();l.helpers.show(s),i.list.innerHTML=s.outerHTML}},helpers:{fadeIn:(e,t)=>{if(!e||null!==e.offsetParent)return e;e.style.opacity=0,e.style.display="block";var i=+new Date,l=function(){e.style.opacity=+e.style.opacity+(new Date-i)/t,i=+new Date,+e.style.opacity<1&&(window.requestAnimationFrame&&requestAnimationFrame(l)||setTimeout(l,16))};l()},fadeOut:(e,t)=>{if(!e||null===e.offsetParent)return e;if(!t)return e.style.display="none";var i=setInterval((function(){e.style.opacity||(e.style.opacity=1),e.style.opacity>0?e.style.opacity-=.1:(clearInterval(i),e.style.display="none")}),t/10)},hide:e=>((e="object"==typeof e?e:document.querySelector(e))&&(e.style.display="none"),e),show:e=>((e="object"==typeof e?e:document.querySelector(e))&&(e.style.display="block"),e)},addToCollection(e,t,i){const l=this;this.collection.push({$el:e,id:i||null,options:Object.assign({},l.defaults,e.hasAttribute(l.dataAttributeName)?JSON.parse(e.getAttribute(l.dataAttributeName)):{},t)})},_init(){const e=this;for(let t=0;t<e.collection.length;t+=1){let i,l;e.collection[t].hasOwnProperty("$initializedEl")||(i=e.collection[t].$el,l=e.collection[t].options,e.collection[t].$initializedEl=new List(i,l,l.values),l.searchMenu&&e.helpers.hide(e.collection[t].$initializedEl.list),e.collection[t].$initializedEl.on("searchComplete",(()=>{l.searchMenu&&(e.searchMenu(i,l,e.collection[t].$initializedEl),e.searchMenuHide(i,l,e.collection[t].$initializedEl)),!l.searchMenu&&l.empty&&e.emptyBlock(i,l,e.collection[t].$initializedEl)})),l.searchMenu&&l.keyboard&&e.initializeHover(i,l,e.collection[t].$initializedEl))}},getItem(e){return"number"==typeof e?this.collection[e].$initializedEl:this.collection.find((t=>t.id===e)).$initializedEl}},HSCore.components.HSTyped={collection:[],dataAttributeName:"data-hs-typed-options",defaults:{},init(e,t,i){const l=this;let s;s=e instanceof HTMLElement?[e]:e instanceof Object?e:document.querySelectorAll(e);for(let e=0;e<s.length;e+=1)l.addToCollection(s[e],t,i||s[e].id);if(!l.collection.length)return!1;l._init()},addToCollection(e,t,i){const l=this;this.collection.push({$el:e,id:i||null,options:Object.assign({},l.defaults,e.hasAttribute(l.dataAttributeName)?JSON.parse(e.getAttribute(l.dataAttributeName)):{},t)})},_init:function(){const e=this;for(let t=0;t<e.collection.length;t+=1){let i,l;e.collection[t].hasOwnProperty("$initializedEl")||(i=e.collection[t].$el,l=e.collection[t].options,e.collection[t].$initializedEl=new Typed(i,l))}}};

