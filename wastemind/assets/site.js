(function(){
  // mobile menu
  var b=document.querySelector('.burger'),n=document.getElementById('primary');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''});
    n.addEventListener('click',function(e){if(e.target.closest('a')&&n.classList.contains('open')){n.classList.remove('open');b.setAttribute('aria-expanded','false');document.body.style.overflow=''}})}
  // reveal on scroll
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.06});
    els.forEach(function(el,i){el.style.transitionDelay=((i%3)*70)+'ms';io.observe(el)});
  } else els.forEach(function(el){el.classList.add('in')});
  // before/after slider
  document.querySelectorAll('[data-ba]').forEach(function(w){
    var f=w.querySelector('.ba-frame'),r=w.querySelector('.ba-range');
    function s(){f.style.setProperty('--p',r.value+'%')}
    r.addEventListener('input',s);s();
  });
})();
