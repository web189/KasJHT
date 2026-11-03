/* enhance.js — dok navigasi HP (tamu & admin) + garis progres scroll.
   ES5, tanpa dependensi, aman untuk Chrome 109 / Windows 7.
   Tidak mengubah data/logika: dok admin hanya mengklik tombol sidebar yang
   sudah ada ([data-sec]) dan tombol menu hamburger admin. */
(function(){
  "use strict";
  var NS="http://www.w3.org/2000/svg";
  var GUEST=[
    ["#/","Home","M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"],
    ["#/pengajuan","Ajukan","M12 5v14M5 12h14"],
    ["#/riwayat","Riwayat","M4 13l2-8h12l2 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5"],
    ["#/aset","Aset","M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5"]
  ];
  var ADMIN=[
    ["dashboard","Beranda","M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"],
    ["transaksi","Transaksi","M5 4h14v16H5zM5 9h14M10 9v11"],
    ["pengajuan","Pengajuan","M3 12h4.5l1.5 3h6l1.5-3H21M5.5 5h13l2.5 7v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"],
    ["anggota","Anggota","M9 11a3.2 3.2 0 100-6.4A3.2 3.2 0 009 11zM2.8 19c.7-3 3-5 6.2-5s5.5 2 6.2 5M17 8.5a2.6 2.6 0 010 5M19.8 19c-.4-2-1.4-3.4-3-4.3"],
    ["__menu","Menu","M4 7h16M4 12h16M4 17h16"]
  ];

  function svg(path){
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+path+'"/></svg>';
  }
  function mk(cls,label){
    var n=document.createElement("nav");
    n.className="tp-dock "+cls;n.setAttribute("aria-label",label);n.hidden=true;
    return n;
  }

  var guest=mk("tp-dock-guest","Navigasi cepat");
  var admin=mk("tp-dock-admin","Navigasi admin");

  (function build(){
    var h="",i;
    for(i=0;i<GUEST.length;i++){
      h+='<a href="'+GUEST[i][0]+'" data-r="'+GUEST[i][0].replace("#","")+'">'+svg(GUEST[i][2])+'<span>'+GUEST[i][1]+'</span></a>';
    }
    guest.innerHTML=h;
    h="";
    for(i=0;i<ADMIN.length;i++){
      h+='<button type="button" data-s="'+ADMIN[i][0]+'">'+svg(ADMIN[i][2])+'<span>'+ADMIN[i][1]+'</span></button>';
    }
    admin.innerHTML=h;
  })();

  function $(sel){return document.querySelector(sel);}
  function each(list,fn){for(var i=0;i<list.length;i++)fn(list[i],i);}
  function setOn(el,on){
    var c=(" "+el.className+" ").replace(/\son\s/g," ").replace(/^\s+|\s+$/g,"");
    el.className=on?(c?c+" on":"on"):c;
    if(on)el.setAttribute("aria-current","page");else el.removeAttribute("aria-current");
  }

  /* Dok admin: klik tombol sidebar yang sudah ada */
  admin.addEventListener("click",function(e){
    var t=e.target;
    while(t&&t!==admin&&t.tagName!=="BUTTON")t=t.parentNode;
    if(!t||t===admin)return;
    var s=t.getAttribute("data-s"),target;
    if(s==="__menu")target=$("#adminHamburgerBtn");
    else target=$('.sidebar .nav-item[data-sec="'+s+'"]');
    if(target)target.click();
  },false);

  function pendingBadge(){
    var b=$('.sidebar .nav-item[data-sec="pengajuan"] .mm-badge');
    var btn=admin.querySelector('[data-s="pengajuan"]');
    if(!btn)return;
    var dot=btn.querySelector(".tp-dot");
    var n=b?(b.textContent||"").replace(/\s/g,""):"";
    if(n){
      if(!dot){dot=document.createElement("span");dot.className="tp-dot";btn.appendChild(dot);}
      dot.textContent=n;
    }else if(dot){btn.removeChild(dot);}
  }

  function sync(){
    var isAdmin=!!$(".admin-shell");
    var route=(location.hash||"#/").replace("#","")||"/";
    var showGuest=!isAdmin&&route!=="/login";
    guest.hidden=!showGuest;
    admin.hidden=!isAdmin;
    if(showGuest){
      each(guest.getElementsByTagName("a"),function(a){setOn(a,a.getAttribute("data-r")===route);});
    }
    if(isAdmin){
      var act=$(".sidebar .nav-item.active[data-sec]");
      var cur=act?act.getAttribute("data-sec"):"dashboard";
      each(admin.getElementsByTagName("button"),function(b){setOn(b,b.getAttribute("data-s")===cur);});
      pendingBadge();
    }
    var open=!!document.querySelector(".mobile-menu-panel.open");
    var c=document.body.className.replace(/\s*tp-menu-open/,"");
    var n=open?(c+" tp-menu-open"):c;
    if(n!==document.body.className)document.body.className=n;
  }

  /* Garis progres scroll (rAF, pasif, sangat ringan) */
  var bar=document.createElement("div"),tick=false,raf=window.requestAnimationFrame||function(f){return setTimeout(f,16);};
  bar.className="tp-progress";bar.setAttribute("aria-hidden","true");
  function prog(){
    tick=false;
    var d=document.documentElement,max=d.scrollHeight-d.clientHeight;
    var v=max>0?(window.pageYOffset||d.scrollTop)/max:0;
    var t="scaleX("+(v>1?1:(v<0?0:v))+")";
    bar.style.webkitTransform=t;bar.style.transform=t;
  }
  function onScroll(){if(tick)return;tick=true;raf(prog);}

  var pending=false;
  function queueSync(){
    if(pending)return;pending=true;
    raf(function(){pending=false;sync();});
  }

  function start(){
    document.body.appendChild(guest);
    document.body.appendChild(admin);
    document.body.appendChild(bar);
    sync();prog();
    window.addEventListener("hashchange",queueSync,false);
    window.addEventListener("scroll",onScroll,false);
    window.addEventListener("resize",onScroll,false);
    if(window.MutationObserver){
      var app=document.getElementById("app");
      var mo=new MutationObserver(queueSync);
      if(app)mo.observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
      mo.observe(document.body,{attributes:true,attributeFilter:["class"]});
    }
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start,false);else start();
})();
