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

  // contact links with prefilled inquiry, like the source SPA
  function pageLang(){ var p=location.pathname; return p.indexOf('/en/')>=0?'en':p.indexOf('/de/')>=0?'de':'ru'; }
  function pageModel(){
    var h=document.querySelector('h1');
    if(!h) return null;
    var m=h.textContent.match(/\u00AB([A-Z0-9]+)\u00BB/);
    return m?m[1]:null;
  }
  var MSG={ru:'Интересует модель ',en:'Interested in model ',de:'Interessiert an Modell '};
  var SUBJ={ru:'Запрос о модели ',en:'Inquiry about model ',de:'Anfrage \u00FCber Modell '};
  function wireContacts(){
    var model=pageModel(); if(!model) return;
    var lang=pageLang();
    var text=MSG[lang]+model;
    var subj=SUBJ[lang]+model;
    document.querySelectorAll('.md-content a[href*="t.me/+"], .md-content a[href*="wa.me/"], .md-content a[href^="mailto:"]').forEach(function(a){
      var href=a.getAttribute('href');
      if(href.indexOf('t.me/')>=0){ a.href='https://t.me/+79276867402?text='+encodeURIComponent(text); }
      else if(href.indexOf('wa.me/')>=0){ a.href='https://wa.me/+79276867402?text='+encodeURIComponent(text); }
      else if(href.indexOf('mailto:')===0){ a.href='mailto:1@vodoplav.ru?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(text); }
    });
  }

  // Telegram private invites ignore ?text in mobile apps: copy the inquiry
  // to clipboard so the user just pastes it.
  document.querySelectorAll('.md-content a[href*="t.me/+"], .md-content a[href*="t.me/share"]').forEach(function(a){
    a.addEventListener('click', function(ev){
      var m=(a.getAttribute('href').match(/text=([^&]+)/)||[])[1];
      if(!m) return;
      var text=decodeURIComponent(m);
      ev.preventDefault();
      var done=function(){
        var note=document.createElement('div');
        note.textContent='\u2705 '+(pageLang()==='ru'?'Текст запроса скопирован — вставьте его в Telegram':
                          pageLang()==='de'?'Anfragetext kopiert \u2014 in Telegram einf\u00FCgen':
                          'Inquiry text copied \u2014 paste it in Telegram');
        note.style.cssText='padding:.6em 1em;margin:.5em 0;border-radius:6px;background:var(--md-primary-fg-color);color:var(--md-primary-bg-color);font-size:.85rem';
        a.parentNode.insertBefore(note,a.nextSibling);
        setTimeout(function(){note.remove()},6000);
      };
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(function(){ location.href=a.href; done(); },function(){ location.href=a.href; }); }
      else { location.href=a.href; }
    });
  });
  wireContacts();
})();
