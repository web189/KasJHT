/* enhance.js - bar navigasi bawah HP. ES5, tanpa dependensi. */
(function(){
  var items=[
    ["#/","Home","M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"],
    ["#/pengajuan","Ajukan","M12 5v14M5 12h14"],
    ["#/riwayat","Riwayat","M4 13l2-8h12l2 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5"],
    ["#/aset","Aset","M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5"]
  ];
  var nav=document.createElement("nav");
  nav.className="tp-bnav";nav.setAttribute("aria-label","Navigasi cepat");
  var h="";
  for(var i=0;i<items.length;i++){
    h+='<a href="'+items[i][0]+'" data-r="'+items[i][0].replace("#","")+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+items[i][2]+'"/></svg><span>'+items[i][1]+'</span></a>';
  }
  nav.innerHTML=h;
  function mark(){
    var r=(location.hash||"#/").replace("#","")||"/";
    var a=nav.getElementsByTagName("a");
    for(var j=0;j<a.length;j++){
      var on=a[j].getAttribute("data-r")===r;
      a[j].className=on?"on":"";
      if(on)a[j].setAttribute("aria-current","page");else a[j].removeAttribute("aria-current");
    }
  }
  function ready(){document.body.appendChild(nav);mark();start();}
  if(window.addEventListener){window.addEventListener("hashchange",mark,false);}
  /* Sembunyikan bar bawah saat menu geser terbuka */
  function menuState(){
    var open=!!document.querySelector(".mobile-menu-panel.open");
    var c=document.body.className.replace(/\s*tp-menu-open/,"");
    var n=open?(c+" tp-menu-open"):c;
    if(n!==document.body.className)document.body.className=n;
  }
  /* Garis progres scroll (rAF, pasif, sangat ringan) */
  var bar=document.createElement("div"),tick=false;
  bar.className="tp-progress";bar.setAttribute("aria-hidden","true");
  function prog(){
    tick=false;
    var d=document.documentElement,max=d.scrollHeight-d.clientHeight;
    var v=max>0?(window.pageYOffset||d.scrollTop)/max:0;
    var t="scaleX("+(v>1?1:v)+")";
    bar.style.webkitTransform=t;bar.style.transform=t;
  }
  function onScroll(){
    if(tick)return;tick=true;
    (window.requestAnimationFrame||function(f){setTimeout(f,16);})(prog);
  }
  function start(){
    document.body.appendChild(bar);prog();
    window.addEventListener("scroll",onScroll,false);
    window.addEventListener("resize",onScroll,false);
    if(window.MutationObserver){
      new MutationObserver(menuState).observe(document.body,{subtree:true,attributes:true,attributeFilter:["class"]});
    }
  }
  if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",ready,false);}else{ready();}
})();
