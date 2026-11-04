(function(){
  var path=location.pathname;
  // language switcher
  var m=path.match(/^(.*?\/(en|de))(\/|$)/);
  var base=m?m[1]:'';
  var cur=m?m[2]:'ru';
  var rest=path.slice(base.length);
  if(rest.charAt(rest.length-1)!=='/'&&rest.indexOf('.')<0)rest+='/';
  function href(l){ if(l===cur) return null; if(l==='ru') return path.replace(base,'')||'/'; var clean=path.replace(base,''); if(clean.charAt(0)!=='/')clean='/'+clean; return base.replace(/\/(en|de)$/,'/'+l)+clean; }
  var nav=document.createElement('div');
  nav.style.cssText='position:absolute;top:8px;right:60px;z-index:50;font-size:.8rem;';
  ['ru','en','de'].forEach(function(l){
    var a=document.createElement('a'); a.textContent=l.toUpperCase();
    var h=href(l); if(h){a.href=h;} else {a.style.fontWeight='700';a.style.opacity='.5';}
    a.style.marginLeft='8px'; nav.appendChild(a);
  });
  var header=document.querySelector('.md-header .md-header__inner');
  if(header) header.appendChild(nav);
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
