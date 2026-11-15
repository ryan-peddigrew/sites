/* Center Stage AV concept sub-pages. Prepared by Chairlift, (c) 2026. Not for reuse. */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
document.addEventListener('contextmenu',function(e){if(e.target.closest('img'))e.preventDefault()});
var menu=$('#menu');function mt(on){menu.classList.toggle('on',on);menu.setAttribute('aria-hidden',!on);document.body.style.overflow=on?'hidden':''}
if($('#burger')){$('#burger').onclick=function(){mt(true)};$('#mclose').onclick=function(){mt(false)}}
/* quote app */
var f=$('#qa');if(f){var st=$$('.qs',f),i=0,bk=$('#qaback'),nx=$('#qanext'),Q=new URLSearchParams(location.search);
 function v(n){var e=f.elements[n];return e?(e.value||'').trim():''}
 function sum(){var t=(f.querySelector('[name=type]:checked')||{}).value||'Not chosen';var s=$$('[name=svc]:checked',f).map(function(c){return c.value}).join(', ')||'Please recommend';
  return 'Event: '+t+'\nDate: '+(v('date')||'TBC')+' ('+v('days')+' day'+(v('days')==='1'?'':'s')+')'+(f.elements.flex.checked?', flexible':'')+'\nVenue or city: '+(v('venue')||'TBC')+'\nGuests: '+(v('guests')||'TBC')+'\nFormat: '+v('format')+(f.elements.visit.checked?'\nSite visit: yes please':'')+'\nNeeds: '+s+'\n\nName: '+v('name')+'\nCompany: '+v('company')+'\nEmail: '+v('email')+'\nPhone: '+v('phone')+(v('notes')?'\n\nNotes: '+v('notes'):'')}
 function go(n){i=n;st.forEach(function(s,j){s.classList.toggle('on',j===i)});$('#qabar').style.width=((i+1)/st.length*100)+'%';$('#qastep').textContent=(i+1)+' / '+st.length;bk.style.visibility=i?'visible':'hidden';nx.style.display=i===st.length-1?'none':'';nx.textContent=i===4?'Review':'Next';scrollTo({top:0,behavior:'smooth'})}
 nx.onclick=function(){if(i===4){var n=f.elements.name,e=f.elements.email;if(!n.value.trim()){n.reportValidity&&n.reportValidity();n.focus();return}if(!e.value.trim()||!e.checkValidity()){e.reportValidity&&e.reportValidity();e.focus();return}
  var s=sum();$('#qasum').textContent=s;$('#qasend').href='mailto:info@centerstageav.com?subject='+encodeURIComponent('Quote request: '+((f.querySelector('[name=type]:checked')||{}).value||'event'))+'&body='+encodeURIComponent(s)}go(i+1)};
 bk.onclick=function(){go(Math.max(0,i-1))};
 $$('[name=type]',f).forEach(function(r){r.addEventListener('change',function(){setTimeout(function(){if(i===0)go(1)},250)})});
 var qt=Q.get('type'),qs=Q.get('svc');if(qt){var r=$$('[name=type]',f).filter(function(x){return x.value===qt})[0];if(r)r.checked=true}
 if(qs){$$('[name=svc]',f).forEach(function(c){if(c.value.toLowerCase().indexOf(qs.toLowerCase().split(' ')[0])===0)c.checked=true})}
 go(qt?1:0)}
/* portal demo */
var d=$('#demo');if(d)d.onclick=function(){$('#dash').classList.add('on');$('#dash').scrollIntoView({behavior:'smooth'})};
var c=$('#count');if(c){var n=Math.ceil((new Date('2027-06-06T18:00:00-04:00')-new Date())/864e5);c.textContent=n.toLocaleString('en-CA')+' days to go'}
})();
