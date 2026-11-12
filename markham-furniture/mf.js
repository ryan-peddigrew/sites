(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
var D=window.MF,IT=D.items,money=function(n){return '$'+Math.round(n).toLocaleString('en-CA')};
var img=function(i){return 'img/p-'+i.h+'.webp'};
var by=function(t){return IT.filter(function(i){return i.y===t})};
var SW={Birch:'#e8e1d3',Pewter:'#8d8f92',Nickel:'#b3b3b0',Zinc:'#6f7275',Denim:'#3c5273',Buff:'#d9c4a1',Sage:'#9aa58c',Platinum:'#d5d5d2',Midnight:'#1d2535',Fossil:'#a39a8b',Chocolate:'#4a3226',Fudge:'#5d4032',White:'#f7f7f4',Black:'#161616',Ivory:'#f1ead9',Shale:'#77736c',Beige:'#d8c9b0',Slate:'#565d66',Chestnut:'#7a4a2c'};
var COL=Object.keys(SW);
var qs=new URLSearchParams(location.search);

/* loader */
var tourWanted=qs.get('tour')==='1';
setTimeout(function(){$('#loader').classList.add('out');document.body.classList.remove('loading');document.body.classList.add('ready');if(tourWanted)setTimeout(startTour,1500);setTimeout(function(){$('#loader').style.display='none'},1500)},3300);
var hmk=$('.hero-mk');addEventListener('scroll',function(){var y=scrollY;if(y<innerHeight){hph.style.transform='translateY('+y*.25+'px) scale('+(1+y/3000)+')';hmk.style.transform='translateY('+y*-.15+'px) rotate('+y*.12+'deg)'}},{passive:true});

/* hero: blinds film from their own photos */
var HP=['room-blue','showroom-white','storefront'],N=6,hph=$('#heroPh'),words=['your size.','by hand.','to last.'],hi=-1;
HP.forEach(function(p){var d=document.createElement('div');d.className='sl';for(var k=0;k<N;k++){var st=document.createElement('i');st.style.cssText='left:'+(k*100/N)+'%;width:'+(100/N+.2)+'%;transition-delay:'+(k*90)+'ms';var im=document.createElement('b');im.style.cssText='background-image:url(img/'+p+'.webp);left:-'+(k*100)+'%;width:'+(N*100)+'%';st.appendChild(im);d.appendChild(st)}hph.appendChild(d)});
var SL=$$('.sl',hph);
function hnext(){var prev=SL[hi];hi=(hi+1)%SL.length;var c=SL[hi];SL.forEach(function(x){x.style.zIndex=x===c?2:x===prev?1:0});c.classList.remove('on');void c.offsetWidth;c.classList.add('on');
  if(prev)setTimeout(function(){prev.classList.remove('on')},1700);
  var r=$('#rot');r.textContent=words[hi];r.classList.remove('sw');void r.offsetWidth;r.classList.add('sw')}
setTimeout(function(){hnext();setInterval(hnext,4600)},3000);

/* collection */
function rail(f){$('#rail').innerHTML=by(f).map(function(i){return '<article class="pc" data-h="'+i.h+'"><img loading="lazy" src="'+img(i)+'" alt="'+i.t+' '+f+'"><i>STYLE '+i.n+'</i><b>'+i.t+'</b><p><span>From '+money(i.p)+'</span><u>Build this one</u></p></article>'}).join('')}
rail('Sofas');
$('#filt').onclick=function(e){var b=e.target.closest('button');if(!b)return;$$('#filt button').forEach(function(x){x.classList.toggle('on',x===b)});rail(b.dataset.f)};
$('#rail').onclick=function(e){var c=e.target.closest('.pc');if(!c)return;Q.h=c.dataset.h;open(1,true)};

/* reviews (from their site) */
var RV=[['I ordered a loveseat and a sofa and could not be happier with them. Excellent quality and love the fact that they are made here by a Canadian owned business.','AnneMarie Ryan'],['I am tall and so we made the sectional a bit higher with firmer seating. I really recommend this especially if you want a durable quality piece of furniture.','Scott Lazaruk'],['We are extremely satisfied with the quality, workmanship and their commitment to ensuring we were 100% happy with what we purchased.','Donalda McCabe'],['All our questions and concerns were answered followed by a tour out back, I knew this was the place! Thank you, we LOVE our new leather sofa.','Wendy Jordan']],ri=0;
function rv(){$('#rv').innerHTML='<blockquote>"'+RV[ri][0]+'"<cite>'+RV[ri][1]+'</cite></blockquote>';ri=(ri+1)%RV.length}rv();setInterval(rv,6000);

/* ---------- THE MENU ---------- */
var M=[
 ['Build your quote','Design it, see a price','More quote requests','A shopper builds their own piece and sends it to your showroom as a ready lead, with every choice already made.'],
 ['Live stock checker','What is on the floor, right now','Sells floor models faster','Reads your stock from Shopify, so shoppers see what they can take home this week and at which showroom.'],
 ['Track your order','From frame to front door','Fewer "where is it" calls','Clients follow their piece through the workshop, stage by stage. Your team updates it with one tap.'],
 ['Client dashboard','Orders, quotes, care, warranty','Repeat business','One place for a client to see everything they have with you, and to come back and order the matching chair.'],
 ['Book a showroom visit','Pick a showroom and a time','More booked visits','Shoppers reserve time with a design consultant at Castlefield or Denison. Their saved quote arrives with them.'],
 ['Swatches to your door','Choose five, see them at home','Captures every browser','The step before a big purchase. You get a name and address from people who are still deciding.'],
 ['Will it fit?','Check your wall and doorway','Removes the biggest doubt','Uses the real dimensions of each style. If it does not fit, it offers a custom size instead of losing the sale.'],
 ['Floor model outlet','Ready to take home','Clears the floor','Your floor models, each with a reserve button and a hold timer, so the sale happens before they walk in.'],
 ['Designer trade program','For interior designers','Recurring trade orders','Designers apply for a trade account, save client projects and reorder. One designer is many sofas.'],
 ['Reviews and referrals','After delivery, automatically','New clients from happy ones','A week after delivery the client gets a review ask and a referral link. Good reviews go to Google.']
];
var grid=$('#menuGrid');
grid.innerHTML=M.map(function(m,i){return '<button class="mi" data-i="'+(i+1)+'" type="button"><i>'+('0'+(i+1)).slice(-2)+'</i><span><b>'+m[0]+'</b><small>'+m[1]+'</small></span></button>'}).join('');
grid.onclick=function(e){var b=e.target.closest('.mi');if(b)open(+b.dataset.i,true)};
document.addEventListener('click',function(e){var a=e.target.closest('[data-open]');if(a){e.preventDefault();open(+a.dataset.open,true)}});
var cur=0;
function open(n,scroll){cur=n;var m=M[n-1];$$('.mi').forEach(function(b){b.classList.toggle('on',+b.dataset.i===n)});
  $('#stNo').textContent=('0'+n).slice(-2)+' / 10';$('#stTitle').textContent=m[0];$('#stWhy').innerHTML='<b>'+m[2]+'</b>'+m[3];
  var b=$('#stBody');b.style.animation='none';void b.offsetWidth;b.style.animation='';
  T[n](b);if(scroll)$('#stage').scrollIntoView({behavior:'smooth',block:'start'})}
function chips(name,arr,sel){return '<div class="chips" data-g="'+name+'">'+arr.map(function(a){return '<button type="button" class="chip'+(a===sel?' on':'')+'" data-v="'+a+'">'+a+'</button>'}).join('')+'</div>'}
function done(el,msg){var d=document.createElement('div');d.className='done-msg';d.textContent=msg;var o=$('.done-msg',el);if(o)o.remove();el.appendChild(d)}
var SAMPLE='Sample data for this demo. ';
function note(t){$('#stNote').textContent=t}

/* 1 quote */
var Q={h:'2071-olivia',cover:'Fabric',col:'Pewter',firm:'Medium',size:'Standard',feet:'Espresso'};
var T={};
T[1]=function(b){
  var it=IT.filter(function(i){return i.h===Q.h})[0]||by('Sofas')[0];
  var up=(Q.cover==='Italian leather'?.3:0)+(Q.size==='Custom size'?.1:0),p=it.p*(1+up);
  b.innerHTML='<div class="two"><div>'+
   '<div class="fld"><label>Style</label><select id="qS">'+['Sofas','Sectionals','Chairs & Accents'].map(function(t){return '<optgroup label="'+t+'">'+by(t).map(function(i){return '<option value="'+i.h+'"'+(i.h===it.h?' selected':'')+'>'+i.n+' '+i.t+'</option>'}).join('')+'</optgroup>'}).join('')+'</select></div>'+
   '<div class="fld"><span class="lab">Cover</span>'+chips('cover',['Fabric','Italian leather'],Q.cover)+'</div>'+
   '<div class="fld"><span class="lab">Colour: '+Q.col+'</span><div class="chips" data-g="col">'+COL.map(function(c){return '<button type="button" title="'+c+'" class="sw'+(c===Q.col?' on':'')+'" data-v="'+c+'" style="background:'+SW[c]+'"></button>'}).join('')+'</div></div>'+
   '<div class="fld"><span class="lab">Size</span>'+chips('size',['Standard','Custom size'],Q.size)+'</div>'+
   '<div class="fld"><span class="lab">Cushion firmness</span>'+chips('firm',['Soft','Medium','Firm'],Q.firm)+'</div>'+
   '<div class="fld"><span class="lab">Feet</span>'+chips('feet',['Espresso','Natural','Black'],Q.feet)+'</div>'+
   '</div><div class="card sum"><img src="'+img(it)+'" alt=""><span class="st-no">STYLE '+it.n+'</span><h4>'+it.t+'</h4>'+
   '<ul><li><span>Size</span><span>'+(Q.size==='Standard'?it.s.replace(/ \/ /g,' x '):'Made to your measurements')+'</span></li><li><span>Cover</span><span>'+Q.cover+', '+Q.col+'</span></li><li><span>Cushions</span><span>'+Q.firm+'</span></li><li><span>Feet</span><span>'+Q.feet+'</span></li></ul>'+
   '<div class="price">'+money(p)+'<small>Estimate before tax. Your consultant confirms the final price.</small></div>'+
   '<div class="acts"><button class="btn" id="qSend" type="button">Send to the showroom</button><button class="btn ghost" id="qSave" type="button">Save my quote</button></div></div></div>';
  note('Styles, sizes, colour names and base prices are from your current site. Leather and custom-size adjustments are sample rules; your real price list drops in.');
  $('#qS').onchange=function(){Q.h=this.value;T[1](b)};
  b.onclick=function(e){var c=e.target.closest('[data-v]');if(c){Q[c.parentNode.dataset.g]=c.dataset.v;T[1](b);return}
    if(e.target.id==='qSend')done($('.sum',b),'Sent. Your Castlefield showroom gets this as a ready quote request, with every choice attached.');
    if(e.target.id==='qSave')done($('.sum',b),'Saved to your client dashboard. Open it on any device.')};
};
/* 2 stock */
var STK=by('Sofas').slice(0,5).concat(by('Sectionals').slice(0,2),by('Chairs & Accents').slice(0,3)).map(function(i,k){return {i:i,c:COL[(k*3)%COL.length],t:k%3===0?0:(k%3===1?1:2),m:k%4?1:0}});
T[2]=function(b,f){f=f||'All';
  b.innerHTML='<div class="row" style="align-items:center;margin-bottom:14px"><span class="live">Live from inventory</span><div style="flex:2 1 260px">'+chips('loc',['All','Toronto, Castlefield','Markham, Denison'],f)+'</div></div><table><thead><tr><th></th><th>Style</th><th>Colour</th><th>Toronto</th><th>Markham</th><th></th></tr></thead><tbody>'+
  STK.filter(function(s){return f==='All'||(f[0]==='T'?s.t>0:s.m>0)}).map(function(s){return '<tr><td><img src="'+img(s.i)+'" alt=""></td><td><b>'+s.i.n+' '+s.i.t+'</b><br><small>'+s.i.y+'</small></td><td>'+s.c+'</td><td>'+(s.t?'<span class="tag f">'+s.t+' on floor</span>':'<span class="tag">Made to order</span>')+'</td><td>'+(s.m?'<span class="tag f">'+s.m+' on floor</span>':'<span class="tag">Made to order</span>')+'</td><td><button class="btn sm" type="button" data-r="'+s.i.t+'">Reserve</button></td></tr>'}).join('')+'</tbody></table>';
  note(SAMPLE+'Stock counts here are made up. Live, this reads straight from the inventory in your Shopify store through its API, so it is never out of date.');
  b.onclick=function(e){var c=e.target.closest('.chip');if(c){T[2](b,c.dataset.v);return}var r=e.target.closest('[data-r]');if(r){r.textContent='Held 48 hours';r.disabled=true}};
};
/* 3 track */
var ST=[['Order confirmed','Fabric and measurements signed off'],['Frame built','Kiln-dried Canadian hardwood'],['Springs hand-tied','Eight-way, by hand'],['Fabric cut and sewn','Your colour, your pattern match'],['Upholstery','On the bench now'],['Final inspection','Checked before it leaves'],['Delivery booked','We confirm a window with you']];
T[3]=function(b){
  b.innerHTML='<div class="two"><div><div class="fld"><label>Order number</label><div class="row"><input type="text" id="trN" value="MF-20714" style="flex:2 1 160px"><button class="btn" id="trGo" type="button">Track</button></div></div><div id="trOut"></div></div><div class="card sum"><img src="img/p-2071-olivia.webp" alt=""><span class="st-no">STYLE 2071</span><h4>Olivia sofa</h4><ul><li><span>Cover</span><span>Fabric, Pewter</span></li><li><span>Showroom</span><span>Toronto, Castlefield</span></li></ul><p style="font-size:14px">Text and email updates go out on their own at every stage.</p></div></div>';
  note(SAMPLE+'The order and stages are an example. Your workshop taps one button per stage on a phone or tablet.');
  function go(){var at=4;$('#trOut').innerHTML='<div class="big">Stage 5 of 7</div><div class="pbar"><i style="width:0"></i></div><ul class="steps">'+ST.map(function(s,k){return '<li class="'+(k<at?'done':k===at?'now':'')+'"><span>'+s[0]+'<br><small>'+s[1]+'</small></span><small>'+(k<at?'Done':k===at?'In progress':'')+'</small></li>'}).join('')+'</ul>';setTimeout(function(){var p=$('#trOut .pbar i');if(p)p.style.width='64%'},60)}
  $('#trGo').onclick=go;go();
};
/* 4 dashboard */
T[4]=function(b,tab){tab=tab||'My orders';var o=IT.filter(function(i){return i.h==='2071-olivia'})[0],c=by('Chairs & Accents')[3];
  var body={'My orders':'<div class="card"><div class="row" style="align-items:center"><img src="'+img(o)+'" alt="" style="flex:0 0 120px;width:120px"><div><span class="st-no">MF-20714</span><h4 style="font-size:22px">Olivia sofa</h4><p style="font-size:14px">Upholstery, stage 5 of 7</p><div class="pbar"><i style="width:64%"></i></div></div></div><button class="btn sm" type="button" data-open="3">Follow this order</button></div><div class="card" style="margin-top:12px"><span class="lab">Goes well with your sofa</span><div class="row" style="align-items:center"><img src="'+img(c)+'" alt="" style="flex:0 0 120px;width:120px"><div><h4 style="font-size:20px">'+c.t+' chair</h4><p style="font-size:14px">In your fabric, Pewter. From '+money(c.p)+'</p></div></div><button class="btn sm" type="button" data-open="1">Add to a quote</button></div>',
   'Saved quotes':'<table><thead><tr><th>Quote</th><th>Piece</th><th>Estimate</th><th></th></tr></thead><tbody><tr><td>Q-1182</td><td>2032 William sectional, Denim</td><td>'+money(7499)+'</td><td><button class="btn sm" type="button" data-open="1">Open</button></td></tr><tr><td>Q-1175</td><td>2009 Swivel Nest chair, Sage</td><td>'+money(2199)+'</td><td><button class="btn sm" type="button" data-open="1">Open</button></td></tr></tbody></table>',
   'My swatches':'<div class="chips">'+['Pewter','Denim','Sage','Ivory','Chestnut'].map(function(x){return '<span style="text-align:center;font-size:12px"><span class="sw" style="display:block;background:'+SW[x]+';width:72px;height:72px"></span>'+x+'</span>'}).join('')+'</div><p style="margin-top:14px;font-size:14px">Delivered. Tap a swatch to start a quote in that colour.</p>',
   'Care and warranty':'<div class="card"><h4 style="font-size:20px">Your care guide</h4><p style="font-size:14px;margin-top:6px">Cleaning steps for your exact fabric, your warranty papers and your receipt, all in one place.</p></div><div class="card" style="margin-top:12px"><h4 style="font-size:20px">Refresh service</h4><p style="font-size:14px;margin-top:6px">New cushion cores or a new cover for a piece you already own. One tap to ask.</p><button class="btn sm" type="button" style="margin-top:10px" id="rf">Ask about a refresh</button></div>'}[tab];
  b.innerHTML='<div class="dash"><div class="dnav">'+['My orders','Saved quotes','My swatches','Care and warranty'].map(function(t){return '<button type="button" class="'+(t===tab?'on':'')+'">'+t+'</button>'}).join('')+'</div><div><p class="lab">Welcome back, Sample Client</p>'+body+'</div></div>';
  note(SAMPLE+'The client, orders and quotes are examples. Refresh service is an idea to confirm with you.');
  b.onclick=function(e){var n=e.target.closest('.dnav button');if(n)T[4](b,n.textContent);if(e.target.id==='rf')done(e.target.parentNode,'Request sent to the workshop.')};
};
/* 5 booking */
T[5]=function(b){var days=[];var d=new Date();for(var k=1;days.length<5;k++){var x=new Date(d.getTime()+k*864e5);if(x.getDay()!==0)days.push(x.toLocaleDateString('en-CA',{weekday:'short',month:'short',day:'numeric'}))}
  var S={loc:'Toronto, Castlefield',day:days[0],time:''};
  function draw(){b.innerHTML='<div class="two"><div><div class="fld"><span class="lab">Showroom</span>'+chips('loc',['Toronto, Castlefield','Markham, Denison'],S.loc)+'</div><div class="fld"><span class="lab">Day</span>'+chips('day',days,S.day)+'</div><div class="fld"><span class="lab">Time</span>'+chips('time',['10:30 AM','11:30 AM','1:00 PM','2:30 PM','4:00 PM'],S.time)+'</div></div><div class="card ink"><p class="lab">Your visit</p><div class="big">'+S.loc.split(',')[0]+'</div><p style="margin:10px 0">'+(S.loc[0]==='T'?'1200 Castlefield Ave.':'1020 Denison St.')+'<br>'+S.day+(S.time?' at '+S.time:'')+'</p><p style="font-size:14px;color:#ccc">A design consultant will have your saved quote and swatches ready.</p><div class="row" style="margin-top:14px"><input type="text" placeholder="Your name"><input type="email" placeholder="Email"></div><button class="btn wh" id="bk" type="button" style="margin-top:12px;width:100%">Book my visit</button></div></div>';}
  draw();note(SAMPLE+'Times shown are examples. Live, this follows your real showroom hours and staff calendar.');
  b.onclick=function(e){var c=e.target.closest('.chip');if(c){S[c.parentNode.dataset.g]=c.dataset.v;draw();return}if(e.target.id==='bk')done($('.card',b),'Booked. A confirmation and a reminder go out on their own.')};
};
/* 6 swatches */
T[6]=function(b){var pick=T[6].p||(T[6].p=[]);
  function draw(){b.innerHTML='<div class="two"><div><span class="lab">Choose up to five ('+pick.length+' of 5)</span><div class="chips" style="gap:12px">'+COL.map(function(c){return '<button type="button" class="sw'+(pick.indexOf(c)>-1?' on':'')+'" data-c="'+c+'" title="'+c+'" style="background:'+SW[c]+';width:64px;height:64px"></button>'}).join('')+'</div></div><div class="card"><p class="lab">Your swatch pack</p><p class="big" style="font-size:22px;min-height:54px">'+(pick.join(', ')||'Tap a colour')+'</p><div class="fld" style="margin-top:12px"><input type="text" placeholder="Name"></div><div class="fld"><input type="text" placeholder="Mailing address"></div><button class="btn" id="swGo" type="button" style="width:100%">Mail my swatches</button></div></div>'}
  draw();note('Colour names are from your current site. Swatch colours on screen are approximate; real fabric photos would replace them.');
  b.onclick=function(e){var c=e.target.closest('[data-c]');if(c){var k=pick.indexOf(c.dataset.c);if(k>-1)pick.splice(k,1);else if(pick.length<5)pick.push(c.dataset.c);draw();return}if(e.target.id==='swGo')done($('.card',b),'On the way. Your showroom now has a new lead to follow up with.')};
};
/* 7 fit */
T[7]=function(b){var list=by('Sofas').concat(by('Sectionals')),S=T[7].s||(T[7].s={h:list[0].h,wall:96,door:32});
  function draw(){var it=list.filter(function(i){return i.h===S.h})[0],L=it.d[0][0],Dp=(it.d.filter(function(x){return x[1]==='D'})[0]||[0,36])[0],okW=L<=S.wall,okD=Dp<=S.door+4||true&&Dp<=S.door+6;
   var okDoor=Math.min(Dp,(it.d.filter(function(x){return x[1]==='H'})[0]||[36])[0])<=S.door;
   b.innerHTML='<div class="two"><div><div class="fld"><label>Style</label><select id="fS">'+list.map(function(i){return '<option value="'+i.h+'"'+(i.h===S.h?' selected':'')+'>'+i.n+' '+i.t+' ('+i.d[0][0]+'" long)</option>'}).join('')+'</select></div><div class="row"><div class="fld"><label>Your wall, inches</label><input type="number" id="fW" value="'+S.wall+'"></div><div class="fld"><label>Narrowest doorway, inches</label><input type="number" id="fD" value="'+S.door+'"></div></div>'+
   '<div class="card"><p class="big" style="font-size:24px">'+(okW&&okDoor?'It fits.':(!okW?'Too long for that wall.':'Tight through that doorway.'))+'</p><p style="font-size:14px;margin-top:8px">'+(okW&&okDoor?'You have '+(S.wall-L)+' inches to spare on the wall.':(!okW?'We can build the '+it.t+' at '+(S.wall-6)+' inches for you. Every piece is made to order.':'Our delivery team can advise, or we can adjust the depth for you.'))+'</p><button class="btn sm" type="button" data-open="1" style="margin-top:12px">'+(okW&&okDoor?'Build this quote':'Quote a custom size')+'</button></div></div>'+
   '<div class="room"><div class="wall"></div><div class="sofa'+(okW?'':' bad')+'" style="width:'+Math.min(96,L/S.wall*88)+'%">'+L+'"</div><div class="dim">Your wall: '+S.wall+'"</div></div></div>';
   $('#fS').onchange=function(){S.h=this.value;draw()};$('#fW').onchange=function(){S.wall=+this.value||96;draw()};$('#fD').onchange=function(){S.door=+this.value||32;draw()}}
  draw();T[7].draw=draw;note('Uses the real dimensions listed for each style on your current site.');b.onclick=null;
};
/* 8 outlet */
T[8]=function(b){var fl=by('Sofas').slice(5,8).concat(by('Chairs & Accents').slice(6,9));
  b.innerHTML='<div class="tiles">'+fl.map(function(i,k){return '<div class="tile"><img src="'+img(i)+'" alt=""><span class="st-no">STYLE '+i.n+'</span><b>'+i.t+'</b><p style="font-size:13px">'+(k%2?'Markham, Denison':'Toronto, Castlefield')+'</p><p><s>'+money(i.c||i.p)+'</s> <strong>'+money(i.p)+'</strong></p><button class="btn sm" type="button">Reserve for 48 hours</button></div>'}).join('')+'</div>';
  note(SAMPLE+'Which pieces are on the floor is made up. Prices are the regular and current prices on your site. Your team adds a floor model with one photo from a phone.');
  b.onclick=function(e){var x=e.target.closest('.btn');if(x){x.textContent='Reserved for you';x.disabled=true}};
};
/* 9 trade */
T[9]=function(b){b.innerHTML='<div class="two"><div><p class="big" style="font-size:28px">Built for designers since the Denison Street shop.</p><ul class="steps" style="margin-top:14px"><li class="done"><span>Trade account<br><small>Apply once, order for every client</small></span></li><li class="done"><span>Project folders<br><small>Save quotes, swatches and drawings by client</small></span></li><li class="done"><span>Your own fabric<br><small>Send your material, we build with it</small></span></li><li class="done"><span>Order tracking<br><small>Share a live link with your client</small></span></li></ul></div><div class="card"><p class="lab">Apply for a trade account</p><div class="fld"><input type="text" placeholder="Your name"></div><div class="fld"><input type="text" placeholder="Design firm"></div><div class="fld"><input type="email" placeholder="Email"></div><button class="btn" id="trd" type="button" style="width:100%">Apply</button></div></div>';
  note('A proposed program. Terms, and whether you accept a designer\'s own material, are yours to set.');
  b.onclick=function(e){if(e.target.id==='trd')done($('.card',b),'Application received. Your team approves it with one tap.')};
};
/* 10 reviews */
T[10]=function(b){b.innerHTML='<div class="two"><div class="card"><p class="lab">Sent one week after delivery</p><p class="big" style="font-size:26px">How is the new sofa?</p><div class="chips" style="margin:14px 0" id="stars">'+[1,2,3,4,5].map(function(n){return '<button type="button" class="chip" data-s="'+n+'">'+n+'</button>'}).join('')+'</div><div id="rvOut" style="font-size:14px">Tap a rating out of 5.</div></div><div class="card ink"><p class="lab">Refer a friend</p><p class="big" style="font-size:24px">Share your link.</p><p style="margin:10px 0;font-size:14px;color:#ccc">Your friend books a showroom visit with your name on it. You choose the thank-you.</p><input type="text" readonly value="markhamfurniture.com/r/sample-client"><button class="btn wh" id="cp" type="button" style="margin-top:12px;width:100%">Copy my link</button></div></div>';
  note('A proposed flow. Happy clients are pointed to Google; anything less comes to you first so you can make it right.');
  b.onclick=function(e){var s=e.target.closest('[data-s]');if(s){var n=+s.dataset.s;$$('#stars .chip').forEach(function(c){c.classList.toggle('on',+c.dataset.s<=n)});$('#rvOut').innerHTML=n>=4?'<b>Thank you.</b> Would you share that on Google? <button class="btn sm" type="button" style="margin-top:8px">Post my review</button>':'<b>Thank you for telling us.</b> This goes straight to the owner, not online, so we can make it right.'}if(e.target.id==='cp')e.target.textContent='Copied'};
};
open(1,false);

/* reveal */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
$$('.menu-hd,.made-tx,.story-tx,.visit-tx,.col-hd').forEach(function(e){e.classList.add('rev');io.observe(e)});

/* ---------- TOUR ---------- */
function clk(sel,i){var e=$$(sel)[i||0];if(e)e.click()}
var STOPS=[
 ['#hero','A new first impression','Same logo, same colours. Your own photos now fill the screen and the headline moves. This is what a shopper sees in the first three seconds.'],
 ['#menu','Ten things. Pick what you like.','This is the menu. Every item below is a working tool your site does not have today. Take one or take all ten.',function(){open(1,false)}],
 ['#stage','1. Build your quote','Watch: style, leather, colour. The price updates as they choose, and the showroom gets a ready lead.',function(){open(1,false);setTimeout(function(){clk('#stBody [data-g=cover] .chip',1)},1500);setTimeout(function(){clk('#stBody [data-g=col] .sw',16)},3000)}],
 ['#stage','2. Live stock checker','Shoppers see what is on the floor today at Castlefield and Denison. It reads from your Shopify inventory, so nobody updates it by hand.',function(){open(2,false);setTimeout(function(){clk('#stBody .chip',1)},2200)}],
 ['#stage','3. Track your order','Made-to-order means waiting. Clients follow their piece through your workshop, which means fewer calls asking where it is.',function(){open(3,false)}],
 ['#stage','4. Client dashboard','Orders, saved quotes, swatches, care and warranty in one place. It also suggests the matching chair.',function(){open(4,false);setTimeout(function(){clk('#stBody .dnav button',1)},2400)}],
 ['#stage','5. Book a showroom visit','A booked visit shows up. Their quote and swatches are waiting for your consultant when they walk in.',function(){open(5,false);setTimeout(function(){clk('#stBody [data-g=time] .chip',2)},1800)}],
 ['#stage','6. Swatches to your door','The step before a big purchase. You capture a name and address from people still deciding.',function(){open(6,false);[3,6,9].forEach(function(n,k){setTimeout(function(){clk('#stBody [data-c]',n)},1200+k*700)})}],
 ['#stage','7. Will it fit?','The number one doubt, answered with your real dimensions. If it does not fit, it offers a custom size.',function(){open(7,false);setTimeout(function(){T[7].s.wall=80;T[7].draw()},2400)}],
 ['#stage','8, 9 and 10. More revenue','A floor model outlet with reserve buttons, a trade program for designers, and reviews and referrals that run on their own after delivery.',function(){open(8,false);setTimeout(function(){open(9,false)},3000);setTimeout(function(){open(10,false)},6000)},9500],
 ['#appband','And an app with your name on it','Markham Furniture on your client\'s home screen. Design, track, reserve and try a sofa in their own room. Tap "Tour the app" after this.'],
 ['#collection','Your collection, easier to shop','Every style, photo and price from your current site, in a swipe row. Tap any piece and it opens in the quote builder.'],
 ['#made','Your craft, front and centre','Hardwood frames and hand-tied springs are why people pay more. Now it is the story, not a paragraph.'],
 ['#visit','Two ways in, on every screen','Build your quote, or get in touch. Both showrooms, always one tap away. That is the tour. Tell us which of the ten you want.']
];
var ti=-1,tT=null,tPaused=false,POS=['bl','tr','br','tl'],tour=$('#tour');
function startTour(){tour.hidden=false;tour.classList.add('off');ti=-1;tPaused=false;$('#tPause').textContent='Pause';go(0)}
function go(n){clearTimeout(tT);if(n<0)n=0;if(n>=STOPS.length){endTour();return}ti=n;var s=STOPS[n];
  tour.classList.add('off');
  setTimeout(function(){
    var small=innerWidth<700;tour.dataset.p=small?(n%2?'br':'bl'):POS[n%4];
    $('#tStep').textContent=(n+1)+' / '+STOPS.length;$('#tH').textContent=s[1];$('#tP').textContent=s[2];
    $$('.t-hl').forEach(function(e){e.classList.remove('t-hl')});
    if(s[3])s[3]();
    var el=$(s[0]);if(el){var y=el.getBoundingClientRect().top+scrollY-70;scrollTo({top:y,behavior:'smooth'})}
    void tour.offsetWidth;tour.classList.remove('off');
    var dur=s[4]||7500,pr=$('#tProg');pr.style.transition='none';pr.style.width='0';void pr.offsetWidth;
    if(!tPaused){pr.style.transition='width '+dur+'ms linear';pr.style.width='100%';tT=setTimeout(function(){go(ti+1)},dur)}
  },450);
}
function endTour(){clearTimeout(tT);tour.classList.add('off');setTimeout(function(){tour.hidden=true},500)}
$('#tNext').onclick=function(){go(ti+1)};$('#tPrev').onclick=function(){go(ti-1)};$('#tClose').onclick=endTour;
$('#tPause').onclick=function(){tPaused=!tPaused;this.textContent=tPaused?'Play':'Pause';if(tPaused){clearTimeout(tT);var p=$('#tProg');p.style.transition='none'}else go(ti)};
$('#tourBtn').onclick=startTour;
})();
