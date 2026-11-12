(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var IT=window.MF.items,money=function(n){return '$'+Math.round(n).toLocaleString('en-CA')},img=function(i){return '../img/p-'+i.h+'.webp'};
var by=function(t){return IT.filter(function(i){return i.y===t})};
var SW={Birch:'#e8e1d3',Pewter:'#8d8f92',Nickel:'#b3b3b0',Zinc:'#6f7275',Denim:'#3c5273',Buff:'#d9c4a1',Sage:'#9aa58c',Platinum:'#d5d5d2',Midnight:'#1d2535',Fossil:'#a39a8b',Chocolate:'#4a3226',Ivory:'#f1ead9',Slate:'#565d66',Chestnut:'#7a4a2c'},COL=Object.keys(SW);
if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(function(){});
var qs=new URLSearchParams(location.search);

function go(v){$$('.view').forEach(function(x){x.classList.toggle('on',x.id==='v-'+v)});$$('#tabs button').forEach(function(b){b.classList.toggle('on',b.dataset.go===v)});scrollTo(0,0);if(v==='track')track();if(v==='home')setTimeout(function(){$('#hp').style.width='64%'},80)}
document.addEventListener('click',function(e){var g=e.target.closest('[data-go]');if(g)go(g.dataset.go)});
setTimeout(function(){$('#hp').style.width='64%'},400);
function done(el,msg){var o=$('.done-msg',el);if(o)o.remove();var d=document.createElement('div');d.className='done-msg';d.textContent=msg;el.appendChild(d)}

/* design */
var Q={h:'2071-olivia',cover:'Fabric',col:'Pewter'};
function design(){var it=IT.filter(function(i){return i.h===Q.h})[0],p=it.p*(Q.cover==='Italian leather'?1.3:1),z=$('#dz');
 z.innerHTML='<div class="card sum"><img src="'+img(it)+'" alt=""><span class="st-no">STYLE '+it.n+'</span><h4>'+it.t+'</h4><div class="price" style="margin-top:8px">'+money(p)+'<small>Estimate before tax. Your consultant confirms the final price.</small></div></div>'+
 '<div class="fld" style="margin-top:16px"><label>Style</label><select id="dS">'+['Sofas','Sectionals','Chairs & Accents'].map(function(t){return '<optgroup label="'+t+'">'+by(t).map(function(i){return '<option value="'+i.h+'"'+(i.h===it.h?' selected':'')+'>'+i.n+' '+i.t+'</option>'}).join('')+'</optgroup>'}).join('')+'</select></div>'+
 '<div class="fld"><span class="lab">Cover</span><div class="chips" data-g="cover">'+['Fabric','Italian leather'].map(function(a){return '<button type="button" class="chip'+(a===Q.cover?' on':'')+'" data-v="'+a+'">'+a+'</button>'}).join('')+'</div></div>'+
 '<div class="fld"><span class="lab">Colour: '+Q.col+'</span><div class="chips" data-g="col">'+COL.map(function(c){return '<button type="button" class="sw'+(c===Q.col?' on':'')+'" data-v="'+c+'" style="background:'+SW[c]+'"></button>'}).join('')+'</div></div>'+
 '<button class="btn" id="dSend" type="button" style="width:100%">Send to my showroom</button><p class="note dark">Styles and base prices are from your current site. The leather adjustment is a sample rule.</p>';
 $('#dS').onchange=function(){Q.h=this.value;design()}}
$('#dz').onclick=function(e){var c=e.target.closest('[data-v]');if(c){Q[c.parentNode.dataset.g]=c.dataset.v;design();return}if(e.target.id==='dSend')done($('#dz'),'Sent. Your showroom has your design and will be in touch.')};
design();

/* track */
var ST=['Order confirmed','Frame built','Springs hand-tied','Fabric cut and sewn','Upholstery','Final inspection','Delivery booked'];
function track(){$('#tz').innerHTML='<div class="big">Stage 5 of 7</div><div class="pbar"><i style="width:0"></i></div><ul class="steps">'+ST.map(function(s,k){return '<li class="'+(k<4?'done':k===4?'now':'')+'"><span>'+s+'</span><small>'+(k<4?'Done':k===4?'In progress':'')+'</small></li>'}).join('')+'</ul>';setTimeout(function(){var p=$('#tz .pbar i');if(p)p.style.width='64%'},80)}

/* floor */
$('#fz').innerHTML=by('Sofas').slice(5,9).concat(by('Chairs & Accents').slice(6,8)).map(function(i,k){return '<div class="tile"><img src="'+img(i)+'" alt=""><span class="st-no">STYLE '+i.n+'</span><b>'+i.t+'</b><p style="font-size:12px">'+(k%2?'Markham':'Toronto')+'</p><p><s>'+money(i.c||i.p)+'</s> <strong>'+money(i.p)+'</strong></p><button class="btn sm" type="button">Reserve</button></div>'}).join('');
$('#fz').onclick=function(e){var b=e.target.closest('.btn');if(b){b.textContent='Reserved';b.disabled=true}};

/* room */
var RS=by('Sofas').slice(0,5);
$('#rz').innerHTML=RS.map(function(i,k){return '<button type="button" class="chip'+(k?'':' on')+'" data-h="'+i.h+'">'+i.t+'</button>'}).join('');
function place(h){var c=$('.cam'),o=$('.cam img.pc');if(!o){o=document.createElement('img');o.className='pc';c.appendChild(o)}o.src='../img/p-'+h+'.webp';$$('#rz .chip').forEach(function(b){b.classList.toggle('on',b.dataset.h===h)})}
$('#rz').onclick=function(e){var b=e.target.closest('.chip');if(b)place(b.dataset.h)};
$('#snap').onclick=function(){$('#snapf').click()};
$('#snapf').onchange=function(){var f=this.files[0];if(f){$('.cam img.bg').src=URL.createObjectURL(f);if(!$('.cam img.pc'))place(RS[0].h)}};

/* visit */
(function(){var days=[],d=new Date();for(var k=1;days.length<4;k++){var x=new Date(d.getTime()+k*864e5);if(x.getDay()!==0)days.push(x.toLocaleDateString('en-CA',{weekday:'short',month:'short',day:'numeric'}))}
 var S={loc:'Toronto, Castlefield',day:days[0],time:''};
 function ch(g,a){return '<div class="chips" data-g="'+g+'">'+a.map(function(v){return '<button type="button" class="chip'+(S[g]===v?' on':'')+'" data-v="'+v+'">'+v+'</button>'}).join('')+'</div>'}
 function draw(){$('#vz').innerHTML='<div class="fld"><span class="lab">Showroom</span>'+ch('loc',['Toronto, Castlefield','Markham, Denison'])+'</div><div class="card" style="margin-bottom:16px"><b>'+(S.loc[0]==='T'?'1200 Castlefield Ave.':'1020 Denison St.')+'</b><br><span style="font-size:14px">'+(S.loc[0]==='T'?'416-640-0220':'905-947-9575')+'</span></div><div class="fld"><span class="lab">Day</span>'+ch('day',days)+'</div><div class="fld"><span class="lab">Time</span>'+ch('time',['10:30 AM','1:00 PM','2:30 PM','4:00 PM'])+'</div><button class="btn" id="vB" type="button" style="width:100%">Book my visit</button><p class="note dark">Sample times. Live, this follows your real showroom hours.</p>'}
 draw();$('#vz').onclick=function(e){var c=e.target.closest('.chip');if(c){S[c.parentNode.dataset.g]=c.dataset.v;draw();return}if(e.target.id==='vB')done($('#vz'),'Booked. A reminder lands on your phone the day before.')};
 window._pick=function(){S.time='1:00 PM';draw()};
})();

/* install sheet */
$('#inst').onclick=function(){$('#sheet').classList.add('on')};$('#shx').onclick=function(){$('#sheet').classList.remove('on')};
if(qs.get('install')==='1')$('#sheet').classList.add('on');

/* tour */
var STOPS=[
 ['home','An app with your name on it','Markham Furniture on your client\'s home screen, beside their banking app. No app store needed. It installs from a link.'],
 ['home','Their order, front and centre','The first thing they see is their own piece and where it is in your workshop.'],
 ['design','Design a piece on the couch','Style, cover, colour, price. It goes to your showroom as a ready quote.',function(){setTimeout(function(){Q.cover='Italian leather';Q.col='Chestnut';design()},1800)}],
 ['track','Order tracking with notifications','Each stage sends a notification to their phone. Fewer calls asking where it is.'],
 ['floor','Floor models, reserved from the phone','Reads your stock. A client reserves a floor model before they even drive over.',function(){setTimeout(function(){var b=$('#fz .btn');if(b)b.click()},2200)}],
 ['room','See it in their own room','They take a photo of their living room and try your styles in it. This is the one people show their friends.',function(){place(RS[0].h);setTimeout(function(){place(RS[2].h)},2200);setTimeout(function(){place(RS[3].h)},4200)}],
 ['visit','Book the showroom','Pick Castlefield or Denison, pick a time. Their design is waiting when they arrive.',function(){setTimeout(window._pick,1800)}]
];
var ti=-1,tT,paused=false,tour=$('#tour');
function start(){tour.hidden=false;paused=false;$('#tPause').textContent='Pause';step(0)}
function step(n){clearTimeout(tT);if(n<0)n=0;if(n>=STOPS.length){end();return}ti=n;var s=STOPS[n];tour.classList.add('off');
 setTimeout(function(){tour.dataset.p=n%2?'br':'bl';go(s[0]);$('#tStep').textContent=(n+1)+' / '+STOPS.length;$('#tH').textContent=s[1];$('#tP').textContent=s[2];if(s[3])s[3]();void tour.offsetWidth;tour.classList.remove('off');
  var p=$('#tProg');p.style.transition='none';p.style.width='0';void p.offsetWidth;if(!paused){p.style.transition='width 7000ms linear';p.style.width='100%';tT=setTimeout(function(){step(ti+1)},7000)}},420)}
function end(){clearTimeout(tT);tour.classList.add('off');setTimeout(function(){tour.hidden=true;go('home')},450)}
$('#tNext').onclick=function(){step(ti+1)};$('#tPrev').onclick=function(){step(ti-1)};$('#tClose').onclick=end;
$('#tPause').onclick=function(){paused=!paused;this.textContent=paused?'Play':'Pause';if(paused){clearTimeout(tT);$('#tProg').style.transition='none'}else step(ti)};
if(qs.get('tour')==='1')setTimeout(start,700);
})();
