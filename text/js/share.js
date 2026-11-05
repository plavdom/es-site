(function(){
  function langPath(l){
    var p=location.pathname;
    var base=p.indexOf('/es-site/')===0?'/es-site':'';
    var rest=base?p.slice(base.length):p;
    rest=rest.replace(/^\/(en|de)(?=\/)/,'');
    if(rest.charAt(rest.length-1)!=='/'&&rest.indexOf('.')<0)rest+='/';
    return base+(l==='ru'?rest:'/'+l+rest);
  }
  var path=location.pathname;
  var cur=path.indexOf('/en/')>=0?'en':path.indexOf('/de/')>=0?'de':'ru';
  document.querySelectorAll('a[hreflang], .md-select__link').forEach(function(a){
    var l=a.getAttribute('hreflang')||a.getAttribute('lang');
    if(!l||l===cur) return;
    a.href=langPath(l);
  });

  // turn [Video](*.mp4) links into inline players
  document.querySelectorAll('.md-content a[href$=".mp4"]').forEach(function(a){
    var v=document.createElement('video');
    v.controls=true; v.preload='metadata'; v.style.maxWidth='100%';
    v.src=a.getAttribute('href');
    a.replaceWith(v);
  });

  // scheme hotspots: build absolute product URLs from language root (404-proof)
  function prodUrl(m){
    var p=location.pathname;
    var base=p.indexOf('/es-site/')===0?'/es-site':'';
    var rest=base?p.slice(base.length):p;
    rest=rest.replace(/^\/(en|de)(?=\/)/,'');
    rest=rest.replace(/scheme\/?$/,'');
    return base+rest+'products/'+m+'/';
  }
  document.querySelectorAll('.scheme a[data-model]').forEach(function(a){
    a.href=prodUrl(a.getAttribute('data-model'));
  });
  // share buttons on product pages
  var isProduct=/products\/[A-Z]+/.test(path);
  if(!isProduct) return;
  var url=location.href.split('?')[0].split('#')[0];
  var title=document.querySelector('h1'); title=title?title.textContent.trim():document.title;
  var bar=document.createElement('div');
  bar.style.cssText='margin:1em 0;display:flex;gap:.5em;flex-wrap:wrap;';
  function btn(label,bg,link){
    var a=document.createElement('a'); a.textContent=label;
    a.href=link; a.target='_blank'; a.rel='noopener';
    a.style.cssText='display:inline-block;padding:.4em .9em;border-radius:6px;color:#fff;font-size:.85rem;text-decoration:none;background:'+bg;
    bar.appendChild(a);
  }
  var text=title+' — ES VodoplaV';
  btn('Telegram','#2AABEE','https://t.me/share/url?url='+encodeURIComponent(url)+'&text='+encodeURIComponent(text));
  btn('WhatsApp','#25D366','https://wa.me/?text='+encodeURIComponent(text+' '+url));
  var cp=document.createElement('button'); cp.textContent='🔗'; cp.title='Copy link';
  cp.style.cssText='padding:.4em .8em;border-radius:6px;border:1px solid #888;background:transparent;cursor:pointer';
  cp.onclick=function(){navigator.clipboard.writeText(url).then(function(){cp.textContent='✓';setTimeout(function(){cp.textContent='🔗'},1500);});};
  bar.appendChild(cp);
  var art=document.querySelector('.md-content__inner');
  if(art) art.insertBefore(bar, art.firstChild.nextSibling||art.firstChild);
})();
