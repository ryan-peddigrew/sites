/* Chairlift concept-preview watermark and credit. (c) 2026 Chairlift. Not for reuse or distribution. */
(function(){
 var Q=new URLSearchParams(location.search);
 if(Q.has('embed')||window.top!==window)return;   /* frames inside a tour are covered by their parent page */
 var me=document.currentScript,FOR=me&&me.getAttribute('data-for')||'';
 var T='CONCEPT PREVIEW  ·  '+(FOR?'PREPARED FOR '+FOR.toUpperCase()+'  ·  ':'')+'CHAIRLIFT  ·  NOT FOR REUSE';
 var svg='<svg xmlns="http://www.w3.org/2000/svg" width="900" height="380"><text x="40" y="230" transform="rotate(-24 450 190)" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="13" letter-spacing="2" fill="#7a7a86" fill-opacity=".34">'+T+'</text></svg>';
 var css='#wm{position:fixed;inset:0;z-index:2147483000;pointer-events:none;user-select:none;-webkit-user-select:none;background:url("data:image/svg+xml,'+encodeURIComponent(svg)+'") 0 0/900px 380px repeat;opacity:.55}'+
 '#wmt{position:fixed;right:12px;bottom:12px;z-index:2147483001;pointer-events:none;user-select:none;-webkit-user-select:none;font:700 10.5px/1.3 Arial,Helvetica,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#fff;background:#141B2Aee;padding:7px 11px;max-width:calc(100vw - 24px)}'+
 '@media(max-width:760px){#wmt{bottom:78px;right:8px;font-size:9.5px}}'+
 '#pbc{display:block;text-align:center;background:#141B2A;color:#ffffffcc;font:500 13px/1.4 "Hanken Grotesk",Arial,Helvetica,sans-serif;padding:16px 16px;text-decoration:none;position:relative;z-index:5}'+
 '#pbc.fx{position:fixed;right:12px;bottom:44px;z-index:2147483001;padding:7px 11px;font-size:11px;background:#141B2Aee}@media(max-width:760px){#pbc.fx{bottom:108px;right:8px}}'+
 '#pbc b{font-weight:600;color:#fff}'+
 '@media print{#wm{opacity:1}}';
 function put(){
  var d=document;if(!d.body)return;
  if(!d.getElementById('wmcss')){var s=d.createElement('style');s.id='wmcss';s.textContent=css;d.head.appendChild(s)}
  if(!d.getElementById('wm')){var a=d.createElement('div');a.id='wm';a.setAttribute('aria-hidden','true');d.body.appendChild(a)}
  if(!d.getElementById('wmt')){var b=d.createElement('div');b.id='wmt';b.setAttribute('aria-hidden','true');b.textContent='Concept preview by Chairlift · © 2026 · not for reuse';d.body.appendChild(b)}
  if(!d.getElementById('pbc')&&getComputedStyle(d.body).overflow!=='hidden'&&!d.documentElement.classList.contains('app')){
   var c=d.createElement('a');c.id='pbc';c.href='https://usechairlift.com';c.target='_blank';c.rel='noopener';c.innerHTML='Powered by <b>Chairlift</b>';d.body.appendChild(c)}
  else if(!d.getElementById('pbc')){var f=d.createElement('a');f.id='pbc';f.className='fx';f.href='https://usechairlift.com';f.target='_blank';f.rel='noopener';f.innerHTML='Powered by <b>Chairlift</b>';d.body.appendChild(f)}
 }
 function boot(){put();new MutationObserver(put).observe(document.documentElement,{childList:true,subtree:true})}
 if(document.body)boot();else document.addEventListener('DOMContentLoaded',boot);
})();
