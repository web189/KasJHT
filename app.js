const MEMBER_COLORS={KARTIKA:"#6B7280",RIKI:"#3B82F6",KAMIL:"#E4574C",DAUD:"#7A2E2E",RANDHIKA:"#2E8B57",BUDI:"#8B5FBF",TAHIR:"#14919B",RIAN:"#F0A93A"},COLOR_CHOICES=["#3B82F6","#E4574C","#7A2E2E","#2E8B57","#8B5FBF","#14919B","#F0A93A","#6B7280","#D9534F","#0EA5A5"],RIBA_COLOR="#9CA3AF",SEED_MEMBERS=[{id:"KARTIKA",nama:"Kartika",color:MEMBER_COLORS.KARTIKA,status:"off",sejak:"2025-09-11",offSejak:"2025-10-09",catatan:"Nonaktif \u2014 terakhir tercatat kasbon Jul 2026"},{id:"RIKI",nama:"Riki",color:MEMBER_COLORS.RIKI,status:"active",sejak:"2025-09-11"},{id:"KAMIL",nama:"Kamil",color:MEMBER_COLORS.KAMIL,status:"active",sejak:"2025-09-14"},{id:"DAUD",nama:"Daud",color:MEMBER_COLORS.DAUD,status:"active",sejak:"2025-09-15"},{id:"RANDHIKA",nama:"Randhika",color:MEMBER_COLORS.RANDHIKA,status:"active",sejak:"2025-09-16"},{id:"BUDI",nama:"Budi",color:MEMBER_COLORS.BUDI,status:"active",sejak:"2025-11-20"},{id:"TAHIR",nama:"Tahir",color:MEMBER_COLORS.TAHIR,status:"active",sejak:"2025-10-02"},{id:"RIAN",nama:"Rian",color:MEMBER_COLORS.RIAN,status:"active",sejak:"2026-08-27"},{id:"UANG RIBA",nama:"Uang Riba",color:RIBA_COLOR,status:"active",sejak:"2025-11-05"}],RAW_TX=[["2025-09-11","KARTIKA","Shift 1",1e4,0,"4 Box Pulpen Biru"],["2025-09-11","RIKI","Shift 1",1e4,0,"4 Box Pulpen Belang"],["2025-09-14","KARTIKA","Shift 1",5e3,0,"Sapu + kain pel + tempat sampah"],["2025-09-14","RIKI","Shift 1",5e3,0,"Kantong plastik paket PO"],["2025-09-14","KAMIL","Shift 2",2e4,0,"Staples Niceso"],["2025-09-14","RIKI","Shift 2",2e4,0,"Plastik paket PO + lakban"],["2025-09-15","DAUD","Shift 3",2e4,0,"Karet gelang + tip x"],["2025-09-15","KARTIKA","Shift 1",5e3,0,"Colokan listrik"],["2025-09-15","RIKI","Shift 1",5e3,0,""],["2025-09-16","KARTIKA","Shift 1",2500,0,""],["2025-09-16","RANDHIKA","Shift 1",2500,0,""],["2025-09-18","KARTIKA","Shift 1",5e3,0,""],["2025-09-18","RIKI","Shift 1",5e3,0,""],["2025-09-19","DAUD","Shift 3",5e3,0,""],["2025-09-19","RANDHIKA","Shift 1",5e3,0,""],["2025-09-19","KARTIKA","Shift 1",5e3,0,""],["2025-09-20","RANDHIKA","Shift 1",2500,0,""],["2025-09-20","KARTIKA","Shift 1",2500,0,""],["2025-09-22","RANDHIKA","Shift 1",5e3,0,""],["2025-09-22","KARTIKA","Shift 1",5e3,0,""],["2025-09-26","KARTIKA","Shift 1",5e3,0,""],["2025-09-26","KAMIL","Shift 1",5e3,0,""],["2025-09-29","KARTIKA","Shift 1",5e3,0,""],["2025-09-29","KAMIL","Shift 1",5e3,0,""],["2025-09-29","RIKI","Shift 2",2500,0,""],["2025-09-29","DAUD","Shift 2",2500,0,""],["2025-09-30","KARTIKA","Shift 1",7500,0,""],["2025-09-30","KAMIL","Shift 1",7500,0,""],["2025-09-30","RIKI","Shift 2",2e3,0,""],["2025-09-30","DAUD","Shift 2",2e3,0,""],["2025-10-01","RIKI","Shift 2",1e3,0,""],["2025-10-01","DAUD","Shift 2",1e3,0,""],["2025-10-02","TAHIR","Shift 1",7500,0,""],["2025-10-02","KARTIKA","Shift 1",7500,0,""],["2025-10-03","RIKI","Shift 2",5e3,0,""],["2025-10-05","DAUD","Shift 2",2e3,0,""],["2025-10-09","KARTIKA","Shift 1",2500,0,""],["2025-10-09","DAUD","Shift 1",2500,0,""],["2025-10-27","DAUD","Shift 2",5e3,0,""],["2025-10-29","DAUD","Shift 2",5e3,0,""],["2025-11-05","RANDHIKA","Shift 1",2500,0,""],["2025-11-05","TAHIR","Shift 1",2500,0,""],["2025-11-05","UANG RIBA",null,1e4,0,""],["2025-11-20","RIKI","Shift 1",2500,0,""],["2025-11-20","BUDI","Shift 1",2500,0,""],["2025-11-21","RIKI","Shift 1",2500,0,""],["2025-11-21","BUDI","Shift 1",2500,0,""],["2025-11-22","RIKI","Shift 1",2500,0,""],["2025-11-22","BUDI","Shift 1",2500,0,""],["2025-11-23","RIKI","Shift 1",2500,0,""],["2025-11-23","BUDI","Shift 1",2500,0,""],["2025-11-24","RIKI","Shift 1",2500,0,""],["2025-11-24","BUDI","Shift 1",2500,0,""],["2025-11-25","RIKI","Shift 1",2500,0,""],["2025-11-25","DAUD","Shift 1",2500,0,""],["2025-12-05","UANG RIBA",null,1e4,0,""],["2025-12-18","RIKI",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-18","TAHIR",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-18","KAMIL",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-18","RANDHIKA",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-18","DAUD",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-18","BUDI",null,0,1e4,"Patungan kado nikah (dari saldo kas masing2)"],["2025-12-27","RIKI","Shift 1",5e3,0,""],["2025-12-27","BUDI","Shift 1",5e3,0,""],["2026-01-05","UANG RIBA",null,2e4,0,"Setoran uang riba"],["2026-01-19","BUDI","Shift 3",18e3,0,""],["2026-01-21","BUDI","Shift 3",25e3,0,""],["2026-01-24","DAUD","Shift 1",2500,0,""],["2026-01-24","TAHIR","Shift 1",2500,0,""],["2026-02-05","UANG RIBA",null,1e4,0,""],["2026-02-06","RIKI","Shift 1",2500,0,""],["2026-02-06","KAMIL","Shift 1",2500,0,""],["2026-02-11","DAUD","Shift 3",5e3,0,""],["2026-02-12","DAUD","Shift 3",5e3,0,""],["2025-02-20","BUDI","Shift 1",2e4,0,""],["2025-02-20","DAUD","Shift 2",5e3,0,""],["2026-02-23","BUDI","Shift 1",1e4,0,""],["2026-03-25","BUDI","Shift 1",9e3,0,""],["2026-03-05","UANG RIBA",null,1e4,0,""],["2026-03-07","DAUD","Shift 1",2500,0,""],["2026-03-07","TAHIR","Shift 1",2500,0,""],["2026-03-11","BUDI",null,0,8e4,"Isi steples + bantal"],["2026-03-30","DAUD",null,0,35e3,"Colokan listrik"],["2026-05-14","RANDHIKA","Shift 1",5e3,0,""],["2026-05-15","RANDHIKA","Shift 1",5e3,0,""],["2026-05-16","RANDHIKA","Shift 1",5e3,0,""],["2026-05-21","BUDI","Shift 3",3e4,0,""],["2026-05-23","TAHIR","Shift 1",5e3,0,""],["2026-06-16","BUDI","Shift 1",5e3,0,""],["2026-06-16","KAMIL","Shift 1",5e3,0,""],["2026-06-23","BUDI",null,0,3e4,"Mouse pad"],["2026-06-29","RIKI",null,0,1e4,"Pulpen 6 box"],["2026-06-29","TAHIR",null,0,1e4,"Pulpen 6 box"],["2026-06-29","RANDHIKA",null,0,1e4,"Pulpen 6 box"],["2026-06-29","BUDI",null,0,1e4,"Pulpen 6 box"],["2026-06-29","KAMIL",null,0,1e4,"Pulpen 6 box"],["2026-06-29","DAUD",null,0,1e4,"Pulpen 6 box"],["2026-06-30","RIKI","Shift 1",7500,0,""],["2026-06-30","BUDI","Shift 1",7500,0,""],["2026-07-01","RIKI","Shift 1",5e3,0,""],["2026-07-01","BUDI","Shift 1",5e3,0,""],["2026-07-05","KARTIKA",null,0,67500,"Kasbon 150k"],["2026-07-11","KAMIL",null,0,1e4,"Kipas CPU 2pcs"],["2026-07-11","RANDHIKA",null,0,1e4,"Kipas CPU 2pcs"],["2026-07-11","RIKI",null,0,1e4,"Kipas CPU 2pcs"],["2026-07-11","BUDI",null,0,1e4,"Kipas CPU 2pcs"],["2026-07-11","DAUD",null,0,1e4,"Kipas CPU 2pcs"],["2026-07-11","UANG RIBA",null,0,5e4,"Kasur Palembang"],["2026-07-11","KAMIL",null,0,1e4,"Kunci gembok 2pcs"],["2026-07-12","KAMIL","Shift 2",1e4,0,""],["2026-07-13","BUDI","Shift 2",24e3,0,""],["2026-07-20","KAMIL","Shift 1",3500,0,""],["2026-07-20","BUDI","Shift 1",3500,0,""],["2026-07-30","BUDI","Shift 1",1e4,0,""],["2026-07-31","BUDI","Shift 1",5e3,0,""],["2026-08-01","RIKI",null,0,6400,"Plastik ripack tisu"],["2026-08-01","BUDI",null,0,6400,"Plastik ripack tisu"],["2026-08-01","DAUD",null,0,6400,"Plastik ripack tisu"],["2026-08-01","KAMIL",null,0,6400,"Plastik ripack tisu"],["2026-08-01","RANDHIKA",null,0,6400,"Plastik ripack tisu"],["2026-08-01","BUDI","Shift 1",1e4,0,""],["2026-08-06","RANDHIKA","Shift 3",1e4,0,""],["2026-08-18","BUDI","Shift 2",25e3,0,""],["2026-08-20","BUDI","Shift 2",8e3,0,""],["2026-08-20","BUDI","Shift 2",8e3,0,""],["2026-08-25","RIKI","Shift 2",7500,0,""],["2026-08-25","BUDI","Shift 2",7500,0,""]];function buildSeedTransactions(){return RAW_TX.map((a,e)=>{const[t,n,s,i,r,o]=a,l=r>0?"pinjaman":"kas";return{id:"tx"+(e+1),tgl:t,admin:n,shift:s||"Non Shift",btb:i,bkb:r,ket:o,kat:l}})}const LS_KEYS={theme:"jht_theme"};function titleCaseName(a){return a&&(a==="UANG RIBA"?"Uang Riba":a.charAt(0)+a.slice(1).toLowerCase())}const RAW_ASET=[["2025-09-11",["RIKI"],"solo",0,"4Box Pulpel Biru","barang"],["2025-09-11",["RIKI"],"solo",0,"4Box Pulpen Belang","barang"],["2025-09-14",["RIKI"],"solo",0,"Sapu, Kain pel, Tempat sampah","barang"],["2025-09-14",["RIKI"],"solo",0,"Kanton plastik Paket PO","barang"],["2025-09-14",["RIKI"],"solo",0,"Staples Niceso","barang"],["2025-09-14",["RIKI"],"solo",0,"Plastik Paket+Lakban","barang"],["2025-09-15",["RIKI"],"solo",0,"Karet Gelang+Tip X","barang"],["2025-09-15",["RIKI"],"solo",0,"Colokan Listrik","barang"],["2025-12-18",["RIKI","TAHIR","KAMIL","RANDHIKA","DAUD","BUDI"],"patungan",6e4,"Kado Teten Kawin","barang"],["2026-03-11",["BUDI"],"solo",8e4,"Isi Steples + Bantal","barang"],["2026-03-30",["DAUD"],"solo",35e3,"Colokan Listrik","barang"],["2026-06-23",["BUDI"],"solo",3e4,"Mouse Pad","barang"],["2026-06-29",["RIKI","TAHIR","RANDHIKA","BUDI","KAMIL","DAUD"],"patungan",6e4,"Pulpen 6 Box","barang"],["2026-07-05",["KARTIKA"],"solo",67500,"Kasbon 150k","jasa"],["2026-07-11",["KAMIL","RANDHIKA","RIKI","BUDI","DAUD"],"patungan",5e4,"Kipas CPU 2pcs","barang"],["2026-07-11",["UANG RIBA"],"solo",5e4,"Kasur Palembang","barang"],["2026-07-11",["KAMIL"],"solo",1e4,"Kunci Gembok 2pcs","barang"],["2026-08-01",["RIKI","BUDI","DAUD","KAMIL","RANDHIKA"],"patungan",32e3,"Plastik Ripack Tisu","barang"]];function buildSeedRequestsFromAset(a){return a.map((e,t)=>{const[n,s,i,r,o,l]=e;return{id:"req_seed"+(t+1),tgl:n,keterangan:o,nominal:r,mode:i,admins:[...s],pemohon:titleCaseName(s[0]),status:"approved",decidedAt:n,jenis:l||"barang"}})}const SEED_REQUESTS=buildSeedRequestsFromAset(RAW_ASET),SEED_ARISAN=[{id:"arisan_seed1",nama:"Arisan Tanteh Susi \u2014 Batch Oktober 2026",biaya:15e4,kuota:0,tglMulai:"2026-10-05",status:"pendaftaran",currentRound:0,createdAt:"2026-08-20",members:[{id:"am1",nama:"Riki",hp:"",status:"approved",daftarAt:"2026-08-20",sudahMenang:!1,menangRound:null,menangTgl:null},{id:"am2",nama:"Budiansyah",hp:"",status:"approved",daftarAt:"2026-08-21",sudahMenang:!1,menangRound:null,menangTgl:null},{id:"am3",nama:"Daud",hp:"",status:"approved",daftarAt:"2026-08-24",sudahMenang:!1,menangRound:null,menangTgl:null},{id:"am4",nama:"Rian",hp:"",status:"pending",daftarAt:"2026-08-27",sudahMenang:!1,menangRound:null,menangTgl:null}],drawHistory:[]}];function saveMembers(a){FJHT.saveMembers(a).catch(e=>toast("Gagal menyimpan anggota: "+e.message))}function saveTx(a){FJHT.saveTx(a).catch(e=>toast("Gagal menyimpan transaksi: "+e.message))}function saveRequests(a){FJHT.saveRequests(a).catch(e=>toast("Gagal menyimpan pengajuan: "+e.message))}function saveArisan(a){FJHT.saveArisan(a).catch(e=>toast("Gagal menyimpan data arisan: "+e.message))}function isAuthed(){return FJHT.isAdmin()}let DB={members:[],tx:[],requests:[],arisan:[]},DB_READY=!1;async function bootFromFirebase(){try{await FJHT.waitForAuthReady(),DB=await FJHT.migrateSeedIfEmpty(SEED_MEMBERS,buildSeedTransactions(),SEED_REQUESTS.map(l=>({...l})),SEED_ARISAN.map(l=>({...l,members:l.members.map(u=>({...u})),drawHistory:l.drawHistory.map(u=>({...u}))}))),DB.arisan||(DB.arisan=[]);let e=!1;DB.arisan.forEach(l=>{l.kuota&&(l.kuota=0,e=!0)}),e&&saveArisanList();const t=l=>[l.tgl,l.admin,l.shift||"",l.btb,l.bkb,l.ket||""].join("|"),n=l=>[l.tgl,(l.admins||[]).join(","),l.mode,l.nominal,l.keterangan||"",l.jenis||""].join("|"),s=(l,u,d)=>{const p=new Set(l.map(d)),f=new Set(l.map(S=>S.id)),k=[];return u.forEach(S=>{if(p.has(d(S)))return;let B=S.id,T=2;for(;f.has(B);)B=`${S.id}_${T++}`;f.add(B),k.push({...S,id:B})}),{merged:k.length?[...l,...k]:l,changed:k.length>0}},i=s(DB.members,SEED_MEMBERS,l=>l.id),r=s(DB.tx,buildSeedTransactions(),t),o=s(DB.requests,SEED_REQUESTS,n);if(i.changed&&(DB.members=i.merged),r.changed&&(DB.tx=r.merged),o.changed&&(DB.requests=o.merged),isAuthed())try{i.changed&&await FJHT.saveMembers(DB.members),r.changed&&await FJHT.saveTx(DB.tx),o.changed&&await FJHT.saveRequests(DB.requests)}catch(l){console.warn("Gagal menyimpan hasil merge seed:",l)}DB_READY=!0,render(),FJHT.subscribe(l=>{DB=l,render()})}catch(a){DB_READY=!0;const e=navigator.onLine===!1;document.getElementById("app").innerHTML=`<div style="padding:32px;text-align:center;">
         <p><b>${e?"Anda sedang offline.":"Gagal terhubung ke database."}</b></p>
         <p style="opacity:.7;font-size:13px;">${e?"Data belum pernah tersimpan di perangkat ini. Sambungkan internet sekali \u2014 setelah itu aplikasi bisa dibuka tanpa internet. Halaman akan dimuat ulang otomatis begitu tersambung.":a&&a.message||a}</p>
         <button onclick="location.reload()" style="margin-top:12px;padding:10px 22px;border:0;border-radius:12px;font-weight:700;cursor:pointer;background:#F2B84B;color:#2B1700">Coba lagi</button>
       </div>`,window.addEventListener("online",()=>location.reload(),{once:!0})}}const state={route:location.hash.replace("#","")||"/",guestTxFilter:"all",adminSection:"dashboard",filterText:"",filterAdmin:"",filterMonth:"",adminTxFilter:"all",viewRows:(window.innerWidth>=1280?15:window.innerWidth>=1100?10:5),visibleRows:10,editingTxId:null,editingMemberId:null,mobileMenuOpen:!1,guestFilterOpen:!1,moneyRevealed:!1,pengajuan:{mode:"solo",soloAdmin:"",patunganSet:null,ket:"",nominal:"",pemohon:"",editingReqId:null},arisanReg:{nama:"",hp:""}};function rupiah(a){return a=Number(a)||0,"Rp"+a.toLocaleString("id-ID")}function maskedRupiah(a){return rupiah(a).replace(/[0-9]/g,"x")}function moneyDual(a,e){return e=e||"",`<span class="money-real">${e}${rupiah(a)}</span><span class="money-masked">${e}${maskedRupiah(a)}</span>`}function fmtDate(a){return new Date(a+"T00:00:00").toLocaleDateString("id-ID",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})}function fmtDateShort(a){return new Date(a+"T00:00:00").toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric"})}function fmtMonthKey(a){return a.slice(0,7)}function monthLabel(a){const[e,t]=a.split("-");return["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"][parseInt(t,10)-1]+" "+e.slice(2)}function memberById(a){return DB.members.find(e=>e.id===a)}function colorOf(a){if(a==="UANG RIBA")return RIBA_COLOR;const e=memberById(a);return e?e.color:"#999"}function nameOf(a){if(a==="UANG RIBA")return"Uang Riba";const e=memberById(a);return e?e.nama:a}function uid(a){return a+Math.random().toString(36).slice(2,9)}function isDesktopWidth(){return window.innerWidth>760}function initials(a){const e=String(a).trim().split(/\s+/).filter(Boolean);if(e.length>=2)return(e[0][0]+e[1][0]).toUpperCase();const t=e[0]||"";return t.length>=2?(t[0]+t[t.length-1]).toUpperCase():t.toUpperCase()}function shadeColor(a,e){a=String(a).replace("#",""),a.length===3&&(a=a.split("").map(r=>r+r).join(""));const t=parseInt(a,16);let n=(t>>16)+e,s=(t>>8&255)+e,i=(t&255)+e;return n=Math.max(Math.min(255,n),0),s=Math.max(Math.min(255,s),0),i=Math.max(Math.min(255,i),0),"#"+(16777216+n*65536+s*256+Math.round(i)).toString(16).slice(1)}function avatarBg(a){return`linear-gradient(135deg, ${a} 0%, ${shadeColor(a,-32)} 100%)`}function avatarHtml(a,e){return`<span class="${e==="sm"?"avatar sm":"avatar"}" style="background:${avatarBg(colorOf(a))}">${initials(nameOf(a))}</span>`}function escapeHtml(a){return String(a??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function totals(a){const e=a.reduce((n,s)=>n+Number(s.btb||0),0),t=a.reduce((n,s)=>n+Number(s.bkb||0),0);return{masuk:e,keluar:t,saldo:e-t}}function activeMembers(){return DB.members.filter(a=>a.status==="active")}function splitAmount(a,e){const t=Math.floor(a/e),n=a-t*e;return Array.from({length:e},(s,i)=>t+(i<n?1:0))}function requestStatusMeta(a){return a==="approved"?{label:"Disetujui",cls:"approved"}:a==="rejected"?{label:"Ditolak",cls:"rejected"}:{label:"Menunggu",cls:"pending"}}function memberSaldo(a){let e=0;return DB.tx.forEach(t=>{t.admin===a&&(e+=Number(t.btb||0)-Number(t.bkb||0))}),e}function memberPendingHold(a,e){let t=0;return DB.requests.forEach(n=>{if(n.status!=="pending"||e&&n.id===e)return;const s=n.admins.indexOf(a);s!==-1&&(t+=splitAmount(n.nominal,n.admins.length)[s])}),t}function memberAvailableSaldo(a,e){return memberSaldo(a)-memberPendingHold(a,e)}const ANGKA_KATA_ID=["nol","satu","dua","tiga","empat","lima","enam","tujuh","delapan","sembilan","sepuluh"];function terbilangID(a){return ANGKA_KATA_ID[a]||String(a)}function joinNamesID(a){return a.length===0?"":a.length===1?a[0]:a.length===2?`${a[0]} dan ${a[1]}`:`${a.slice(0,-1).join(", ")}, dan ${a[a.length-1]}`}function computeSoloValidation(){const a=state.pengajuan,e=Number(a.nominal)||0;if(!a.soloAdmin||e<=0)return{ok:!0,note:null};const t=memberById(a.soloAdmin),n=t?t.nama:"Admin ini",s=memberAvailableSaldo(a.soloAdmin,a.editingReqId);return s<e?{ok:!1,note:`Saldo ${n} tidak cukup (tersedia ${rupiah(s)}, dibutuhkan ${rupiah(e)}). Pilih admin lain atau minta ${n} setor kas dahulu.`}:{ok:!0,note:null}}function computePatunganValidation(){const a=state.pengajuan,e=Number(a.nominal)||0,t=activeMembers(),n=a.patunganSet||new Set(t.map(o=>o.id)),s=t.filter(o=>n.has(o.id)).map(o=>o.id);if(s.length===0||e<=0)return{ok:!0,note:null};const i=splitAmount(e,s.length),r=[];if(s.forEach((o,l)=>{const u=memberAvailableSaldo(o,a.editingReqId);u<i[l]&&r.push({id:o,nama:nameOf(o),available:u})}),r.length>0){const o=r.map(d=>`${d.nama} ${rupiah(d.available)}`).join(", "),l=joinNamesID(r.map(d=>d.nama));return{ok:!1,note:`Saldo ${r.length===1?"1 orang admin":`${terbilangID(r.length)} (${r.length}) orang admin`} ${o} tidak cukup untuk melakukan patungan ini. Hubungi ${l} untuk setoran kas segera.`}}return{ok:!0,note:null}}function computePengajuanValidation(){return state.pengajuan.mode==="solo"?computeSoloValidation():computePatunganValidation()}function updatePengajuanValidation(){const a=computePengajuanValidation(),e=document.getElementById("pgSaldoNote"),t=document.getElementById("pgSubmit");return e&&(a.note?(e.innerHTML=`${icon("alert")}<span>${escapeHtml(a.note)}</span>`,e.classList.add("show")):(e.innerHTML="",e.classList.remove("show"))),t&&(t.disabled=!a.ok),a}function pendingRequestCount(){return DB.requests.filter(a=>a.status==="pending").length}function approveRequest(a){const e=DB.requests.find(s=>s.id===a);if(!e||e.status!=="pending")return;const t=splitAmount(e.nominal,e.admins.length),n=new Date().toISOString().slice(0,10);e.admins.forEach((s,i)=>{DB.tx.push({id:uid("tx"),tgl:n,admin:s,shift:"Non Shift",btb:0,bkb:t[i],ket:`Pengajuan disetujui: ${e.keterangan}${e.admins.length>1?" (patungan)":""}`,kat:"pinjaman",createdAt:Date.now()+i})}),saveTx(DB.tx),e.status="approved",e.decidedAt=n,saveRequests(DB.requests),toast("Pengajuan disetujui & tercatat di kas keluar")}function rejectRequest(a){const e=DB.requests.find(n=>n.id===a);if(!e||e.status!=="pending")return;const t=window.prompt("Alasan penolakan (opsional):","")||"";e.status="rejected",e.decidedAt=new Date().toISOString().slice(0,10),e.catatan=t,saveRequests(DB.requests),toast("Pengajuan ditolak")}function addMonthsISO(a,e){const[t,n,s]=a.split("-").map(Number),i=new Date(t,n-1+e,s);return`${i.getFullYear()}-${String(i.getMonth()+1).padStart(2,"0")}-${String(i.getDate()).padStart(2,"0")}`}function activeArisanBatch(){const e=(DB.arisan||[]).filter(t=>t.status!=="selesai");return e.length?[...e].sort((t,n)=>n.createdAt.localeCompare(t.createdAt))[0]:null}function finishedArisanBatches(){return(DB.arisan||[]).filter(a=>a.status==="selesai").sort((a,e)=>e.createdAt.localeCompare(a.createdAt))}function arisanApprovedMembers(a){return(a.members||[]).filter(e=>e.status==="approved")}function arisanPendingMembers(a){return(a.members||[]).filter(e=>e.status==="pending")}function arisanEligibleMembers(a){return arisanApprovedMembers(a).filter(e=>!e.sudahMenang)}function checkArisanAutoDraw(){if(!DB_READY||!isAuthed())return;const a=activeArisanBatch();if(!a||a.status!=="berjalan"||a.liveDraw&&a.liveDraw.active||!arisanEligibleMembers(a).length)return;const t=new Date(arisanNextDrawDate(a)+"T00:00:00").getTime();Date.now()<t||(startArisanDraw(a),state.adminSection="arisan",location.hash.replace(/^#/,"")==="/admin"?(refreshAdminContent(),syncNavActive?.()):goto("/admin"),toast(`\u23F0 Waktunya kocok arisan "${a.nama}"! Mesin slot otomatis mulai berputar.`))}setInterval(checkArisanAutoDraw,8e3);function arisanLiveDrawInfo(a){const e=a.liveDraw;if(!e||!e.active||!e.startedAt)return null;const t=Date.now()-e.startedAt;return t>e.durationMs+45e3?null:{...e,elapsed:Math.max(0,t)}}function arisanNextDrawDate(a){return addMonthsISO(a.tglMulai,a.currentRound)}function arisanQuotaTaken(a){return(a.members||[]).filter(e=>e.status!=="rejected").length}function arisanQuotaFull(a){return!!a.kuota&&arisanQuotaTaken(a)>=a.kuota}function computeCountdown(a){const e=new Date(a+"T00:00:00").getTime(),t=Math.max(0,e-Date.now());return{d:Math.floor(t/864e5),h:Math.floor(t%864e5/36e5),m:Math.floor(t%36e5/6e4),s:Math.floor(t%6e4/1e3),done:t<=0}}function saveArisanList(){saveArisan(DB.arisan)}function _hashStr(a){let e=0;for(let t=0;t<a.length;t++)e=e*31+a.charCodeAt(t)>>>0;return e}function arisanColorFor(a){return COLOR_CHOICES[_hashStr(String(a||"?"))%COLOR_CHOICES.length]}function arisanAvatarHtml(a,e){return`<span class="${e==="sm"?"avatar sm":"avatar"}" style="background:${avatarBg(arisanColorFor(a))}">${initials(a)}</span>`}function arisanShortName(a){const e=String(a||"?").trim().split(/\s+/)[0]||"?";return e.length>10?e.slice(0,9)+"\u2026":e}function arisanPendingCount(){const a=activeArisanBatch();return a?arisanPendingMembers(a).length:0}function arisanMenuBadge(){const a=activeArisanBatch();return a?a.status==="pendaftaran"?'<span class="mm-badge mm-badge-pink">Buka</span>':a.status==="berjalan"?'<span class="mm-badge mm-badge-pink">Live</span>':"":""}function depositRanking(){const a={};DB.tx.forEach(t=>{a[t.admin]||(a[t.admin]={total:0,keluar:0,count:0}),a[t.admin].total+=Number(t.btb||0),a[t.admin].keluar+=Number(t.bkb||0),t.btb>0&&(a[t.admin].count+=1)});const e=Object.values(a).reduce((t,n)=>t+n.total,0)||1;return DB.members.filter(t=>a[t.id]).map(t=>({id:t.id,total:a[t.id].total,keluar:a[t.id].keluar,saldo:a[t.id].total-a[t.id].keluar,count:a[t.id].count,pct:a[t.id].total/e*100})).sort((t,n)=>n.total-t.total)}function rankBreakdownHtml(a,e){const t=a.saldo<0,n=`
    <div class="rb-chip rb-saldo ${t?"is-neg":"is-pos"}">
      <span class="rb-chip-label">Sisa Saldo</span>
      <span class="rb-chip-val mono money-blur">${moneyDual(Math.abs(a.saldo),t?"-":"")}</span>
    </div>`;return e?`<div class="rank-breakdown compact">${n}</div>`:`
    <div class="rank-breakdown">
      <div class="rb-chip rb-in">
        <span class="rb-chip-label">Setor</span>
        <span class="rb-chip-val mono money-blur">${moneyDual(a.total)}</span>
      </div>
      <span class="rb-op">&minus;</span>
      <div class="rb-chip rb-out">
        <span class="rb-chip-label">Keluar</span>
        <span class="rb-chip-val mono money-blur">${moneyDual(a.keluar)}</span>
      </div>
      <span class="rb-op">=</span>
      ${n}
    </div>`}function exportRowsPlain(a){return a.map((e,t)=>{const n=e.btb>0;return{No:t+1,Tanggal:fmtDate(e.tgl),Nama:nameOf(e.admin),Shift:e.shift||"Non Shift",Jenis:n?"Kas Masuk":"Kas Keluar",Jumlah:n?e.btb:e.bkb,Keterangan:e.ket||""}})}const _libCache={};function _loadScriptOnce(a){return _libCache[a]||(_libCache[a]=new Promise((e,t)=>{const n=document.createElement("script");n.src=a,n.onload=()=>e(),n.onerror=()=>{delete _libCache[a],t(new Error("load fail: "+a))},document.body.appendChild(n)})),_libCache[a]}async function ensureXlsxLib(){window.XLSX||await _loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js")}async function ensurePdfLib(){window.jspdf||await _loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"),window.jspdf&&!window.jspdf.jsPDF.API.autoTable&&await _loadScriptOnce("https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.8.2/jspdf.plugin.autotable.min.js")}async function exportExcel(a){try{toast("Menyiapkan Excel\u2026"),await ensureXlsxLib()}catch{toast("Gagal memuat pustaka Excel, cek koneksi internet","err");return}const e=exportRowsPlain(a),t=XLSX.utils.json_to_sheet(e);t["!cols"]=[{wch:5},{wch:16},{wch:14},{wch:11},{wch:11},{wch:13},{wch:32}];const n=XLSX.utils.book_new();XLSX.utils.book_append_sheet(n,t,"Transaksi Kas"),XLSX.writeFile(n,`JHT-KAS-Transaksi-${new Date().toISOString().slice(0,10)}.xlsx`),toast("Excel berhasil diunduh")}async function exportPdf(a){try{toast("Menyiapkan PDF\u2026"),await ensurePdfLib()}catch{toast("Gagal memuat pustaka PDF, cek koneksi internet","err");return}const{jsPDF:e}=window.jspdf,t=new e({orientation:"landscape"});t.setFontSize(14),t.text("JHT KAS Adm PRG \u2014 Tabel Transaksi",14,16),t.setFontSize(9),t.text(`Diunduh: ${new Date().toLocaleString("id-ID")}`,14,22);const n=exportRowsPlain(a);t.autoTable({startY:27,head:[["No","Tanggal","Nama","Shift","Jenis","Jumlah","Keterangan"]],body:n.map(s=>[s.No,s.Tanggal,s.Nama,s.Shift,s.Jenis,rupiah(s.Jumlah),s.Keterangan]),styles:{fontSize:8,cellPadding:2.5},headStyles:{fillColor:[240,169,58],textColor:[36,26,6]},alternateRowStyles:{fillColor:[245,245,242]}}),t.save(`JHT-KAS-Transaksi-${new Date().toISOString().slice(0,10)}.pdf`),toast("PDF berhasil diunduh")}function toast(a,e){let t=document.querySelector(".toast-stack");t||(t=document.createElement("div"),t.className="toast-stack",document.body.appendChild(t));const n=document.createElement("div");n.className="toast"+(e?" err":""),n.textContent=a,t.appendChild(n),setTimeout(()=>{n.style.transition="opacity .3s,transform .3s",n.style.opacity="0",n.style.transform="translateX(20px)",setTimeout(()=>n.remove(),300)},2600)}function applyTheme(){const a=localStorage.getItem(LS_KEYS.theme)||"dark";document.documentElement.setAttribute("data-theme",a)}function toggleTheme(){const e=document.documentElement.getAttribute("data-theme")==="dark"?"light":"dark";localStorage.setItem(LS_KEYS.theme,e),document.documentElement.setAttribute("data-theme",e)}function icon(a,e){return`<svg width="16" height="16" class="${e||""}"><use href="#ic-${a}"/></svg>`}window.addEventListener("hashchange",()=>{state.route=location.hash.replace("#","")||"/",render()});function goto(a){location.hash=a}function render(){document.body.classList.toggle("money-revealed",!!state.moneyRevealed);const a=document.getElementById("app");if(!DB_READY){a.innerHTML='<div style="padding:60px 20px;text-align:center;opacity:.7;">Memuat data\u2026</div>';return}if(state.route==="/admin"){if(!isAuthed()){goto("/login");return}a.innerHTML=renderAdmin(),bindAdmin()}else if(state.route==="/login"){if(isAuthed()){goto("/admin");return}a.innerHTML=renderLogin(),bindLogin()}else state.route==="/pengajuan"?(a.innerHTML=renderPengajuanPage(),bindPengajuanPage()):state.route==="/riwayat"?(a.innerHTML=renderRiwayatPage(),bindSimplePage()):state.route==="/aset"?(a.innerHTML=renderAsetPage(),bindSimplePage()):state.route==="/arisan"?(a.innerHTML=renderArisanPage(),bindArisanPage()):(a.innerHTML=renderGuest(),bindGuest())}function topbar(){const a=document.documentElement.getAttribute("data-theme")||"dark",e=pendingRequestCount();return`
  <div class="topbar">
    <div class="topbar-inner">
      <a class="brand" href="#/">
        <div class="brand-mark"><img src="assets/piggy-sm.webp" alt="Logo"></div>
        <div class="brand-text"><b>JHT KAS Adm PRG</b><span>Buku kas admin gudang</span></div>
      </a>
      <div class="topbar-actions">
        <button class="icon-btn" id="themeBtn" title="Ganti tema">${icon(a==="dark"?"sun":"moon")}</button>
        <button class="btn btn-primary" id="loginBtn">${icon("lock")}<span>Masuk Admin</span></button>
      </div>
      <button class="icon-btn hamburger-btn" id="hamburgerBtn" title="Menu">${icon("menu")}${e>0?'<span class="menu-dot"></span>':""}</button>
    </div>

    <!-- ======= NAV DESKTOP (>760px): baris menu kedua yang SELALU
         terlihat langsung, TANPA ikon hamburger \u2014 sesuai permintaan.
         Dropdown dipakai hanya buat mengelompokkan item sekunder
         (unduh/tautan/game) supaya baris menu tidak penuh sesak. Murni
         CSS+JS ringan, tanpa library, dan disembunyikan total di layar
         mobile (digantikan hamburger + panel seperti sebelumnya). ---- -->
    <nav class="desktop-nav" id="desktopNav">
      <div class="desktop-nav-inner">
        <a class="dnav-link ${state.route==="/"?"active":""}" href="#/" id="dnHome">${icon("home")}<span>Home</span></a>
        <button class="dnav-link ${state.route==="/pengajuan"?"active":""}" id="dnPengajuan">${icon("plus-circle")}<span>Ajukan Pembelian</span></button>
        <button class="dnav-link ${state.route==="/riwayat"?"active":""}" id="dnRiwayat">${icon("inbox")}<span>Riwayat Pengajuan</span>${e>0?`<span class="dnav-badge">${e}</span>`:""}</button>
        <button class="dnav-link ${state.route==="/aset"?"active":""}" id="dnAset">${icon("box")}<span>Aset</span></button>
        <button class="dnav-link dnav-arisan" id="dnArisan">${icon("gift")}<span>Arisan Tanteh Susi</span>${arisanMenuBadge()}</button>
        <div class="dnav-dropdown" id="dnDownloadWrap">
          <button class="dnav-link dnav-trigger" id="dnDownloadToggle">${icon("download")}<span>Unduh Data</span>${icon("down")}</button>
          <div class="dnav-menu" id="dnDownloadMenu">
            <button class="dnav-menu-item" id="dnExportExcel">${icon("file-excel")}<span>Unduh Excel</span></button>
            <button class="dnav-menu-item" id="dnExportPdf">${icon("file-pdf")}<span>Unduh PDF</span></button>
          </div>
        </div>
        <div class="dnav-dropdown" id="dnLinksWrap">
          <button class="dnav-link dnav-trigger" id="dnLinksToggle">${icon("external")}<span>Tautan</span>${icon("down")}</button>
          <div class="dnav-menu" id="dnLinksMenu">
            <button class="dnav-menu-item" id="dnJadwal">${icon("calendar")}<span>Jadwal Admin GDNG PRG</span></button>
            <button class="dnav-menu-item" id="dnRekapLama">${icon("sheet")}<span>Data Rekap Lama (Spreadsheet)</span></button>
            <button class="dnav-menu-item" id="dnRitase">${icon("report")}<span>Uang Ritase TUA</span></button>
          </div>
        </div>
        <div class="dnav-dropdown" id="dnGameWrap">
          <button class="dnav-link dnav-trigger" id="dnGameToggle">${icon("gamepad")}<span>Game</span>${icon("down")}</button>
          <div class="dnav-menu" id="dnGameMenu">
            <button class="dnav-menu-item" data-game="catur">${icon("chess")}<span>Catur</span></button>
            <button class="dnav-menu-item" data-game="ular">${icon("ladder")}<span>Ular Tangga</span></button>
            <button class="dnav-menu-item" data-game="monopoli">${icon("dice")}<span>Monopoly</span></button>
          </div>
        </div>
      </div>
    </nav>

    <div class="mobile-menu-panel" id="mobileMenuPanel">
      <div class="mm-panel-head"><span class="mm-panel-head-icon">${icon("menu")}</span><span>Menu Navigasi</span></div>
      <button class="mm-item" id="mmHome"><span class="mm-ico-wrap">${icon("home")}</span><span>Home</span></button>
      <button class="mm-item" id="themeBtnMob"><span class="mm-ico-wrap">${icon(a==="dark"?"sun":"moon")}</span><span>Ganti Tema</span></button>
      <button class="mm-item" id="loginBtnMob"><span class="mm-ico-wrap">${icon("lock")}</span><span>Masuk Admin</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:var(--forest);">Pengajuan Pembelian</div>
      <button class="mm-item" id="mmPengajuan" data-tone="action"><span class="mm-ico-wrap">${icon("plus-circle")}</span><span>Ajukan Pembelian</span></button>
      <button class="mm-item" id="mmRiwayat" data-tone="action"><span class="mm-ico-wrap">${icon("inbox")}</span><span>Riwayat Pengajuan</span>${e>0?`<span class="mm-badge">${e}</span>`:""}</button>
      <button class="mm-item" id="mmAset" data-tone="action"><span class="mm-ico-wrap">${icon("box")}</span><span>Aset Barang/Jasa Milik Pribadi Admin</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:#D6488E;">Arisan</div>
      <button class="mm-item mm-arisan-item" id="mmArisan" data-tone="arisan"><span class="mm-ico-wrap">${icon("gift")}</span><span>Arisan Tanteh Susi</span>${arisanMenuBadge()}</button>
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:var(--amber);">Unduh Data</div>
      <button class="mm-item" id="mmExportExcel" data-tone="download"><span class="mm-ico-wrap">${icon("file-excel")}</span><span>Unduh Excel</span></button>
      <button class="mm-item" id="mmExportPdf" data-tone="download"><span class="mm-ico-wrap">${icon("file-pdf")}</span><span>Unduh PDF</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:var(--blue);">Tautan Cepat</div>
      <button class="mm-item" id="mmJadwal" data-tone="info"><span class="mm-ico-wrap">${icon("calendar")}</span><span>Jadwal Admin GDNG PRG</span><span class="mm-ext">${icon("external")}</span></button>
      <button class="mm-item" id="mmRekapLama" data-tone="info"><span class="mm-ico-wrap">${icon("sheet")}</span><span>Data Rekap Lama (Spreadsheet)</span><span class="mm-ext">${icon("external")}</span></button>
      <button class="mm-item" id="mmRitase" data-tone="info"><span class="mm-ico-wrap">${icon("report")}</span><span>Uang Ritase TUA</span><span class="mm-ext">${icon("external")}</span></button>
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:#8B5CF6;">Hiburan</div>
      <button class="mm-item mm-expandable" id="mmGameToggle" data-tone="fun" aria-expanded="false"><span class="mm-ico-wrap">${icon("gamepad")}</span><span>Game</span><span class="mm-chev">${icon("chevron-right")}</span></button>
      <div class="mm-submenu" id="mmGameSubmenu">
        <button class="mm-item" data-game="catur" data-tone="fun"><span class="mm-ico-wrap">${icon("chess")}</span><span>Catur</span></button>
        <button class="mm-item" data-game="ular" data-tone="fun"><span class="mm-ico-wrap">${icon("ladder")}</span><span>Ular Tangga</span></button>
        <button class="mm-item" data-game="monopoli" data-tone="fun"><span class="mm-ico-wrap">${icon("dice")}</span><span>Monopoly</span></button>
      </div>
      <div class="mm-footer">Website Developer <a href="https://benyoriki.com/" target="_blank" rel="noopener">benyoriki.com</a></div>
    </div>
  </div>`}let heroChartData=null,heroChartTimer=null;function genCandle(a){const e=a*(.006+Math.random()*.01),t=a,n=Math.random()>.46?1:-1,s=Math.max(1,t+n*e*(.4+Math.random()*.9)),i=Math.max(t,s)+e*Math.random()*.5,r=Math.max(.5,Math.min(t,s)-e*Math.random()*.5);return{open:t,close:s,high:i,low:r}}let heroChartN=36;function initHeroChartData(){const a=heroChartN;let e=100;const t=[];for(let n=0;n<a;n++){const s=genCandle(e);t.push(s),e=s.close}return t}function initHeroChart(){const a=document.getElementById("heroChartSvg");a&&(heroChartTimer&&(clearInterval(heroChartTimer),heroChartTimer=null),heroChartN=Math.max(26,Math.min(64,Math.round((a.clientWidth||600)/20))),heroChartData=initHeroChartData(),drawHeroChart(),heroChartTimer=setInterval(()=>{if(!document.getElementById("heroChartSvg")){clearInterval(heroChartTimer),heroChartTimer=null;return}const e=heroChartData[heroChartData.length-1];heroChartData.push(genCandle(e.close)),heroChartData.length>heroChartN&&heroChartData.shift(),drawHeroChart()},1500))}function drawHeroChart(){const a=document.getElementById("heroChartSvg");if(!a||!heroChartData)return;const e=Math.round(a.clientWidth||600),t=Math.round(a.clientHeight||130);a.setAttribute("viewBox",`0 0 ${e} ${t}`);const n=e<520,s=n?66:t>150?50:14,i=n?36:t>150?34:14,r=heroChartData.length,l=(n?e-16:e-138)/r,u=heroChartData.map(x=>x.high),d=heroChartData.map(x=>x.low),p=Math.max(...u),f=Math.min(...d),k=(p-f)*.1||1,S=p+k,B=f-k,T=x=>s+(1-(x-B)/(S-B))*(t-s-i);let w="";heroChartData.forEach((x,N)=>{const O=N*l,m=x.close>=x.open?"var(--forest)":"var(--rust)",h=T(Math.max(x.open,x.close)),$=T(Math.min(x.open,x.close)),H=Math.max($-h,1.4),U=O+l/2;w+=`<line x1="${U.toFixed(2)}" y1="${T(x.high).toFixed(2)}" x2="${U.toFixed(2)}" y2="${T(x.low).toFixed(2)}" stroke="${m}" stroke-width="1" opacity=".8"/>`,w+=`<rect x="${(O+l*.18).toFixed(2)}" y="${h.toFixed(2)}" width="${(l*.64).toFixed(2)}" height="${H.toFixed(2)}" fill="${m}" rx="1"/>`});const E=heroChartData.map((x,N)=>`${(N*l+l/2).toFixed(2)},${T(x.close).toFixed(2)}`),C=(r-1)*l+l/2,b=T(heroChartData[r-1].close),v=`${(l/2).toFixed(2)},${t-i+6} ${E.join(" ")} ${C.toFixed(2)},${t-i+6}`;a.innerHTML=`
    <defs>
      <linearGradient id="heroAreaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="var(--amber)" stop-opacity=".28"/>
        <stop offset="100%" stop-color="var(--amber)" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <line x1="0" y1="${(t*.25).toFixed(1)}" x2="${e}" y2="${(t*.25).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <line x1="0" y1="${(t*.5).toFixed(1)}" x2="${e}" y2="${(t*.5).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <line x1="0" y1="${(t*.75).toFixed(1)}" x2="${e}" y2="${(t*.75).toFixed(1)}" stroke="var(--border)" stroke-width="1" stroke-dasharray="3,4"/>
    <polygon points="${v}" fill="url(#heroAreaGrad)" stroke="none"/>
    <polyline points="${E.join(" ")}" fill="none" stroke="var(--amber)" stroke-width="1.3" opacity=".6"/>
    ${w}
    <circle class="hero-live-ring" cx="${C.toFixed(2)}" cy="${b.toFixed(2)}" r="7" fill="none" stroke="var(--amber)" stroke-width="1.5"/>
    <circle cx="${C.toFixed(2)}" cy="${b.toFixed(2)}" r="3" fill="var(--amber)"/>
  `;const g=heroChartData[heroChartData.length-1],A=heroChartData[heroChartData.length-2]||g,P=g.close>=A.close,K=A.close?(g.close-A.close)/A.close*100:0,R=document.getElementById("heroChartVal"),j=document.getElementById("heroChartChg");R&&(R.textContent=g.close.toFixed(2),R.style.color=P?"var(--forest)":"var(--rust)"),j&&(j.textContent=`${P?"\u25B2":"\u25BC"} ${Math.abs(K).toFixed(2)}%`,j.style.color=P?"var(--forest)":"var(--rust)");const M=document.getElementById("heroChartHi"),q=document.getElementById("heroChartLo");M&&(M.textContent=p.toFixed(2)),q&&(q.textContent=f.toFixed(2))}function renderGuest(){const a=totals(DB.tx),e=depositRanking(),t=Math.max(...e.map(n=>n.total),1);return`
  ${topbar()}
  <div class="container">
    <div class="hero">
      <div class="hero-top">
        <div class="hero-head">
          <div class="hero-eyebrow">Transparansi kas dan anggaran pembelian barang dan jasa</div>
          <h1>Rekap Kas Admin <span class="h1-br">GDNG 2026</span></h1>
        </div>
        <div class="hero-stamp"><span class="hs-dot"></span>Terbuka untuk semua</div>
      </div>

      <div class="hero-grid">
      <div class="hero-chart" id="heroChart">
        <svg class="hero-chart-svg" id="heroChartSvg" viewBox="0 0 600 130" preserveAspectRatio="none"></svg>
        <div class="hero-chart-tag">
          <span class="hct-dot"></span><span>KAS-IDX</span>
        </div>
        <div class="hero-chart-price" id="heroChartPrice">
          <span class="hcp-val mono" id="heroChartVal">0</span>
          <span class="hcp-chg mono" id="heroChartChg">+0.00%</span>
        </div>
        <div class="hero-chart-range">
          <span>H <b class="mono" id="heroChartHi">0</b></span>
          <span>L <b class="mono" id="heroChartLo">0</b></span>
        </div>
      </div>

      <div class="saldo-strip reveal">
        <div class="saldo-col in">
          <span class="saldo-label">Kas masuk</span>
          <span class="saldo-fig mono money-blur">${moneyDual(a.masuk)}</span>
        </div>
        <span class="saldo-op">\u2212</span>
        <div class="saldo-col out">
          <span class="saldo-label">Kas keluar</span>
          <span class="saldo-fig mono money-blur">${moneyDual(a.keluar)}</span>
        </div>
        <span class="saldo-op">=</span>
        <div class="saldo-col final">
          <span class="saldo-label">Saldo akhir</span>
          <span class="saldo-fig mono money-blur">${moneyDual(a.saldo)}</span>
        </div>
      </div>
      </div>
      <button class="money-toggle-btn" id="moneyToggleBtn">
        ${icon(state.moneyRevealed?"eye-off":"eye")}
        <span>${state.moneyRevealed?"Sembunyikan Semua Nominal":"Tampilkan Semua Nominal"}</span>
      </button>

      ${excelPanelHtml(!1)}

      <div class="panel" style="margin-top:16px;">
        <div class="panel-head"><h3>${icon("trophy")}Peringkat Setoran Anggota</h3><span class="hint">urut dari yang paling rajin setor</span></div>
        <div class="rank-list">
          ${e.length?e.map((n,s)=>{const i=memberById(n.id),r=Math.max(4,n.total/t*100),o=i&&i.status==="off";return`
            <div class="rank-row ${o?"off-member":""} ${s<3?"podium podium-"+(s+1):""}" data-member="${n.id}" style="--i:${s};--m-color:${colorOf(n.id)};--target-width:${r}%;">
              <span class="rank-no ${s<3?"top"+(s+1):""}">${s+1}</span>
              ${avatarHtml(n.id)}
              <span class="rank-name"><span class="rank-name-text">${nameOf(n.id)}</span>${o?'<span class="off-tag">nonaktif</span>':""}</span>
              <div class="rank-figures">
                <span class="rank-amt money-blur">${moneyDual(n.total)}</span>
                <span class="rank-pct">${n.pct.toFixed(1)}% dari total</span>
              </div>
              ${rankBreakdownHtml(n,!1)}
              <div class="rank-bar-track"><div class="rank-bar-fill"></div></div>
            </div>
          `}).join(""):'<div class="empty-row">Belum ada setoran tercatat.</div>'}
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">Website dan sistem developer <a href="https://benyoriki.com" target="_blank" rel="noopener noreferrer">benyoriki.com</a></footer>
  `}function getFilteredTxList(a){const e=a?state.adminTxFilter:state.guestTxFilter;let t=[...DB.tx].sort((n,s)=>n.tgl.localeCompare(s.tgl)||(n.createdAt||0)-(s.createdAt||0)||n.id.localeCompare(s.id));return e==="masuk"?t=t.filter(n=>n.btb>0):e==="keluar"&&(t=t.filter(n=>n.bkb>0)),filterList(t)}function excelPanelHtml(a){const e=getFilteredTxList(a),t=a?state.adminTxFilter:state.guestTxFilter,n=a?"a":"g",s=!a&&window.innerWidth<=640,i=s?87:56,r=s?0:48,o=state.viewRows==="all"?null:r+Number(state.viewRows)*i,l=!a,u=!l||state.guestFilterOpen,d=`
      <div class="sheet-tabs" id="${n}TypeFilter" style="margin-bottom:10px;">
        <button class="sheet-tab ${t==="all"?"active":""}" data-type="all">Semua</button>
        <button class="sheet-tab ${t==="masuk"?"active":""}" data-type="masuk">Kas Masuk</button>
        <button class="sheet-tab ${t==="keluar"?"active":""}" data-type="keluar">Kas Keluar</button>
      </div>
      <div class="filters">
        <div class="search-wrap">${icon("search")}<input type="text" id="${n}Text" placeholder="Cari keterangan / admin..." value="${escapeHtml(state.filterText)}"></div>
        <select id="${n}Admin"><option value="">Semua admin</option>${adminOptions()}</select>
        <select id="${n}Month"><option value="">Semua bulan</option>${monthOptions()}</select>
      </div>
      <div class="rows-toggle" id="${n}RowsFilter">
        <span class="rows-toggle-label">Tampilkan:</span>
        <button class="sheet-tab ${String(state.viewRows)==="5"?"active":""}" data-rows="5">5 Data</button>
        <button class="sheet-tab ${String(state.viewRows)==="10"?"active":""}" data-rows="10">10 Data</button>
        <button class="sheet-tab ${String(state.viewRows)==="15"?"active":""}" data-rows="15">15 Data</button>
        <button class="sheet-tab ${state.viewRows==="all"?"active":""}" data-rows="all">Semua</button>
      </div>
  `;return`
    <div class="panel panel-ledger">
      <div class="panel-head ${l?"panel-head-toggle":""}" ${l?`id="ledgerToggle" role="button" tabindex="0" aria-expanded="${u}"`:""}>
        <h3>${icon("sheet")}Tabel Excel Real Time</h3>
        ${l?`<span class="panel-head-hint">${u?"Sembunyikan filter":"Tampilkan filter"}<span class="panel-head-chev">${icon("chevron-right")}</span></span>`:""}
      </div>
      ${isDesktopWidth()?`
      <div class="export-row">
        <button class="btn btn-sm export-btn" id="${n}ExportExcel">${icon("file-excel")}<span>Excel</span></button>
        <button class="btn btn-sm export-btn" id="${n}ExportPdf">${icon("file-pdf")}<span>PDF</span></button>
      </div>`:""}
      ${l?`<div class="ledger-filter-collapse ${u?"open":""}" id="ledgerFilterCollapse">${d}</div>`:d}
      ${excelTableHtml(e,a,o)}
    </div>
  `}function excelTableHtml(a,e,t){return a.length?`
  <div class="excel-wrap" style="${t===void 0?"":t===null?"max-height:none;":`max-height:${t}px;`}">
    <table class="excel${e?"":" excel-cards"}">
      <thead>
        <tr>
          <th class="col-no">No</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Shift</th>
          <th style="text-align:right;">Kas Masuk / Keluar</th>
          <th>Keterangan</th>
          ${e?'<th class="col-no">Aksi</th>':""}
        </tr>
      </thead>
      <tbody>
        ${a.map((s,i)=>{const r=s.btb>0,o=r?s.btb:s.bkb;return`
          <tr>
            <td class="col-no" style="border-left:3px solid ${colorOf(s.admin)};">${i+1}</td>
            <td>${fmtDateShort(s.tgl)}</td>
            <td class="col-name"><span class="avatar-mini" style="background:${avatarBg(colorOf(s.admin))}">${initials(nameOf(s.admin))}</span>${nameOf(s.admin)}</td>
            <td><span class="tx-shift-chip">${s.shift||"Non Shift"}</span></td>
            <td class="col-amt"><span class="amt-pill ${r?"in":"out"} ${e?"":"money-blur"}">${r?"\u2191":"\u2193"} ${moneyDual(o)}</span></td>
            <td class="col-ket${s.ket?"":" is-empty"}">${escapeHtml(s.ket)||"\u2014"}</td>
            ${e?`<td class="col-no"><button class="icon-btn sm" data-edit="${s.id}" title="Ubah">${icon("edit")}</button><button class="icon-btn sm" style="color:var(--rust);" data-del="${s.id}" title="Hapus">${icon("trash")}</button></td>`:""}
          </tr>`}).join("")}
      </tbody>
    </table>
  </div>`:'<div class="empty-row">Belum ada transaksi yang cocok.</div>'}function adminOptions(){return DB.members.map(e=>e.id).map(e=>`<option value="${e}">${nameOf(e)}</option>`).join("")}function monthOptions(){return[...new Set(DB.tx.map(e=>fmtMonthKey(e.tgl)))].sort().map(e=>`<option value="${e}">${monthLabel(e)}</option>`).join("")}function filterList(a){return a.filter(e=>{if(state.filterAdmin&&e.admin!==state.filterAdmin||state.filterMonth&&fmtMonthKey(e.tgl)!==state.filterMonth)return!1;if(state.filterText){const t=state.filterText.toLowerCase();if(!(e.ket||"").toLowerCase().includes(t)&&!nameOf(e.admin).toLowerCase().includes(t))return!1}return!0})}function closeMobileMenu(){document.getElementById("mobileMenuPanel")?.classList.remove("open")}function bindTopbarCommon(){document.getElementById("themeBtn")?.addEventListener("click",()=>{toggleTheme(),render()}),document.getElementById("loginBtn")?.addEventListener("click",()=>goto("/login")),document.getElementById("themeBtnMob")?.addEventListener("click",()=>{toggleTheme(),render()}),document.getElementById("loginBtnMob")?.addEventListener("click",()=>goto("/login")),document.getElementById("mmHome")?.addEventListener("click",()=>{closeMobileMenu(),goto("/")}),document.getElementById("mmJadwal")?.addEventListener("click",()=>{closeMobileMenu(),window.open("https://web189.github.io/Jadwal-Admin/","_blank","noopener")}),document.getElementById("mmRekapLama")?.addEventListener("click",()=>{closeMobileMenu(),window.open("https://docs.google.com/spreadsheets/d/18V_4io2MWv-dRpOp44gwLrfl_ZzLAoKbpB5OPECaA0c/edit?usp=drivesdk","_blank","noopener")}),document.getElementById("mmRitase")?.addEventListener("click",()=>{closeMobileMenu(),window.open("https://web189.github.io/UangRitase/","_blank","noopener")}),document.getElementById("mmExportExcel")?.addEventListener("click",()=>{exportExcel(getFilteredTxList(!1)),closeMobileMenu()}),document.getElementById("mmExportPdf")?.addEventListener("click",()=>{exportPdf(getFilteredTxList(!1)),closeMobileMenu()}),document.getElementById("mmPengajuan")?.addEventListener("click",()=>{closeMobileMenu(),goto("/pengajuan")}),document.getElementById("mmRiwayat")?.addEventListener("click",()=>{closeMobileMenu(),goto("/riwayat")}),document.getElementById("mmAset")?.addEventListener("click",()=>{closeMobileMenu(),goto("/aset")}),document.getElementById("mmArisan")?.addEventListener("click",()=>{closeMobileMenu(),window.open("https://arisan69.netlify.app/","_blank","noopener")}),document.getElementById("mmGameToggle")?.addEventListener("click",a=>{a.stopPropagation();const e=document.getElementById("mmGameSubmenu"),t=document.getElementById("mmGameToggle"),n=e.classList.toggle("open");t.setAttribute("aria-expanded",n?"true":"false")}),document.querySelectorAll("#mmGameSubmenu [data-game]").forEach(a=>{a.addEventListener("click",()=>{closeMobileMenu(),openGameCenter(a.dataset.game)})}),document.getElementById("hamburgerBtn")?.addEventListener("click",a=>{a.stopPropagation(),document.getElementById("mobileMenuPanel")?.classList.toggle("open")}),document.getElementById("dnHome")?.addEventListener("click",a=>{a.preventDefault(),goto("/")}),document.getElementById("dnPengajuan")?.addEventListener("click",()=>goto("/pengajuan")),document.getElementById("dnRiwayat")?.addEventListener("click",()=>goto("/riwayat")),document.getElementById("dnAset")?.addEventListener("click",()=>goto("/aset")),document.getElementById("dnArisan")?.addEventListener("click",()=>window.open("https://arisan69.netlify.app/","_blank","noopener")),document.getElementById("dnExportExcel")?.addEventListener("click",()=>{exportExcel(getFilteredTxList(!1)),closeDesktopDropdowns()}),document.getElementById("dnExportPdf")?.addEventListener("click",()=>{exportPdf(getFilteredTxList(!1)),closeDesktopDropdowns()}),document.getElementById("dnJadwal")?.addEventListener("click",()=>{closeDesktopDropdowns(),window.open("https://web189.github.io/Jadwal-Admin/","_blank","noopener")}),document.getElementById("dnRekapLama")?.addEventListener("click",()=>{closeDesktopDropdowns(),window.open("https://docs.google.com/spreadsheets/d/18V_4io2MWv-dRpOp44gwLrfl_ZzLAoKbpB5OPECaA0c/edit?usp=drivesdk","_blank","noopener")}),document.getElementById("dnRitase")?.addEventListener("click",()=>{closeDesktopDropdowns(),window.open("https://web189.github.io/UangRitase/","_blank","noopener")}),document.querySelectorAll("#dnGameMenu [data-game]").forEach(a=>{a.addEventListener("click",()=>{closeDesktopDropdowns(),openGameCenter(a.dataset.game)})}),[["dnDownloadToggle","dnDownloadWrap"],["dnLinksToggle","dnLinksWrap"],["dnGameToggle","dnGameWrap"]].forEach(([a,e])=>{document.getElementById(a)?.addEventListener("click",t=>{t.stopPropagation();const n=document.getElementById(e),s=!n.classList.contains("open");closeDesktopDropdowns(),s&&n.classList.add("open")})})}function closeDesktopDropdowns(){document.querySelectorAll(".dnav-dropdown.open").forEach(a=>a.classList.remove("open"))}document.addEventListener("click",a=>{a.target.closest(".dnav-dropdown")||closeDesktopDropdowns()}),document.addEventListener("click",a=>{const e=document.getElementById("mobileMenuPanel");e&&e.classList.contains("open")&&!e.contains(a.target)&&a.target.id!=="hamburgerBtn"&&!a.target.closest("#hamburgerBtn")&&closeMobileMenu()});function bindMoneyToggle(){document.getElementById("moneyToggleBtn")?.addEventListener("click",()=>{state.moneyRevealed=!state.moneyRevealed,render()})}function bindGuest(){bindTopbarCommon(),initHeroChart(),bindMoneyToggle(),document.getElementById("ledgerToggle")?.addEventListener("click",()=>{state.guestFilterOpen=!state.guestFilterOpen,render()}),document.getElementById("ledgerToggle")?.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),state.guestFilterOpen=!state.guestFilterOpen,render())}),document.querySelectorAll("#gTypeFilter .sheet-tab").forEach(a=>{a.addEventListener("click",()=>{state.guestTxFilter=a.dataset.type,render()})}),document.getElementById("gText")?.addEventListener("input",a=>{state.filterText=a.target.value,render()}),document.getElementById("gAdmin")?.addEventListener("change",a=>{state.filterAdmin=a.target.value,render()}),document.getElementById("gMonth")?.addEventListener("change",a=>{state.filterMonth=a.target.value,render()}),document.querySelectorAll("#gRowsFilter [data-rows]").forEach(a=>{a.addEventListener("click",()=>{state.viewRows=a.dataset.rows==="all"?"all":Number(a.dataset.rows),render()})}),document.getElementById("gExportExcel")?.addEventListener("click",()=>exportExcel(getFilteredTxList(!1))),document.getElementById("gExportPdf")?.addEventListener("click",()=>exportPdf(getFilteredTxList(!1))),document.querySelectorAll("[data-member]").forEach(a=>{a.addEventListener("click",()=>{state.filterAdmin=a.dataset.member,state.guestTxFilter="masuk",render(),setTimeout(()=>document.querySelector(".panel-ledger")?.scrollIntoView({behavior:"smooth",block:"start"}),60)})}),scrollExcelTablesToLatest()}function scrollExcelTablesToLatest(){requestAnimationFrame(()=>{document.querySelectorAll(".excel-wrap").forEach(a=>{a.scrollTop=a.scrollHeight})})}function arisanStatusMeta(a){return a==="berjalan"?{label:"Sedang Berjalan",cls:"berjalan"}:a==="selesai"?{label:"Selesai",cls:"selesai"}:{label:"Pendaftaran Dibuka",cls:"pendaftaran"}}function arisanCountdownHtml(a,e,t){const n=computeCountdown(a);return`
  <div class="arisan-countdown">
    <div class="arisan-countdown-caption">${t} <b class="mono">${fmtDate(a)}</b></div>
    <div class="cd-grid" id="${e}Grid" data-target="${a}">
      <div class="cd-box"><span class="cd-num mono" id="${e}Day">${String(n.d).padStart(2,"0")}</span><span class="cd-label">Hari</span></div>
      <span class="cd-colon">:</span>
      <div class="cd-box"><span class="cd-num mono" id="${e}Hour">${String(n.h).padStart(2,"0")}</span><span class="cd-label">Jam</span></div>
      <span class="cd-colon">:</span>
      <div class="cd-box"><span class="cd-num mono" id="${e}Min">${String(n.m).padStart(2,"0")}</span><span class="cd-label">Menit</span></div>
      <span class="cd-colon">:</span>
      <div class="cd-box"><span class="cd-num mono" id="${e}Sec">${String(n.s).padStart(2,"0")}</span><span class="cd-label">Detik</span></div>
    </div>
  </div>`}function arisanMemberRowHtml(a,e){return e==="pending"?`<div class="arisan-mem-row is-pending">${arisanAvatarHtml(a.nama,"sm")}<span class="am-name">${escapeHtml(a.nama)}</span><span class="am-badge am-badge-pending">${icon("history")}<span>Menunggu ACC</span></span></div>`:a.sudahMenang?`<div class="arisan-mem-row is-winner"><span class="am-trophy">${icon("trophy")}</span><span class="am-name">${escapeHtml(a.nama)}</span><span class="am-badge am-badge-winner">Menang ronde ${a.menangRound}</span></div>`:`<div class="arisan-mem-row is-eligible">${arisanAvatarHtml(a.nama,"sm")}<span class="am-name">${escapeHtml(a.nama)}</span><span class="am-badge am-badge-eligible">${icon("check")}<span>Aktif</span></span></div>`}function arisanBatchHtml(a){const e=arisanStatusMeta(a.status),t=arisanApprovedMembers(a),n=arisanPendingMembers(a),s=arisanQuotaTaken(a),i=arisanQuotaFull(a),r=a.kuota?Math.min(100,s/a.kuota*100):0,o=arisanNextDrawDate(a),l=[...a.drawHistory||[]].sort((p,f)=>f.round-p.round),u=arisanLiveDrawInfo(a),d=a.status==="pendaftaran"&&!i?`
    <div class="arisan-reg-card">
      <div class="pg-card-head">
        <span class="pg-card-head-icon">${icon("gift")}</span>
        <div>
          <div class="pg-card-head-title">Daftar Arisan Ini</div>
          <div class="pg-card-head-sub">Iuran ${rupiah(a.biaya)}/bulan \u2014 kirim data diri, tunggu di-ACC admin.</div>
        </div>
      </div>
      <div class="field"><label>${icon("edit")} Nama Lengkap</label><input type="text" id="arNama" placeholder="Nama kamu" value="${escapeHtml(state.arisanReg.nama)}"></div>
      <div class="field"><label>${icon("edit")} No. WhatsApp <span style="font-weight:400;color:var(--ink-faint);">(opsional)</span></label><input type="text" id="arHp" placeholder="0812xxxxxxx" value="${escapeHtml(state.arisanReg.hp)}"></div>
      <div class="modal-actions pg-actions">
        <button class="btn btn-primary" id="arSubmit">${icon("gift")}<span>Daftar Sekarang</span></button>
      </div>
    </div>
  `:a.status==="pendaftaran"?`<div class="arisan-full-note">${icon("alert")}<span>Kuota pendaftaran sudah penuh (${s}/${a.kuota}). Nantikan batch arisan berikutnya!</span></div>`:"";return`
  <div class="panel arisan-panel reveal" style="margin-top:16px;">
    <div class="arisan-panel-head">
      <div>
        <div class="arisan-batch-name">${escapeHtml(a.nama)}</div>
        <span class="arisan-status-badge ${e.cls}">${e.label}</span>
      </div>
      <div class="arisan-fee-chip"><span class="label">Iuran / bulan</span><span class="val mono">${rupiah(a.biaya)}</span></div>
    </div>

    ${a.kuota?`
    <div class="arisan-quota-wrap">
      <div class="arisan-quota-label"><span>Slot Anggota</span><span class="mono">${s}/${a.kuota}</span></div>
      <div class="arisan-quota-track"><div class="arisan-quota-fill" style="width:${r}%;"></div></div>
    </div>`:`
    <div class="arisan-quota-wrap">
      <div class="arisan-quota-label"><span>Slot Anggota</span><span class="mono">${s} orang \xB7 Kuota bebas berapa saja</span></div>
    </div>`}

    ${arisanCountdownHtml(o,"arCd",a.status==="berjalan"?"Kocokan berikutnya:":"Kocokan pertama dijadwalkan:")}

    ${!u&&a.status==="berjalan"?arisanIdleSlotHtml(arisanEligibleMembers(a)):""}

    ${u?`
    <div class="arisan-live-card" id="arLiveCard">
      <div class="arisan-live-badge"><span class="dot"></span>LIVE \u2014 Kocokan Sedang Berlangsung</div>
      <div class="wheel-status-label" id="arLiveStatus">\u25CF LIVE \u2014 reel sedang berputar\u2026</div>
      ${slotMachineMarkup("arLive")}
      <div class="draw-result" id="arLiveResult" style="display:none;">
        <div class="draw-confetti" id="arLiveConfetti"></div>
        <div class="draw-winner-trophy">${icon("trophy")}</div>
        <div class="draw-winner-label">Selamat kepada</div>
        <div class="draw-winner-name" id="arLiveWinnerName"></div>
      </div>
    </div>`:""}

    ${d}

    <div class="arisan-members-block">
      ${t.length?`
      <div class="arisan-mem-group-label">Anggota Aktif (${t.length})</div>
      <div class="arisan-mem-list">${t.map(p=>arisanMemberRowHtml(p,"approved")).join("")}</div>`:""}
      ${n.length?`
      <div class="arisan-mem-group-label">Menunggu Persetujuan Admin (${n.length})</div>
      <div class="arisan-mem-list">${n.map(p=>arisanMemberRowHtml(p,"pending")).join("")}</div>`:""}
      ${!t.length&&!n.length?'<div class="empty-row">Belum ada yang mendaftar. Jadilah yang pertama!</div>':""}
    </div>

    ${l.length?`
    <div class="arisan-mem-group-label">${icon("trophy")}Riwayat Kocokan</div>
    <div class="arisan-history-list">
      ${l.map(p=>`
        <div class="arisan-history-item">
          <span class="ahi-round">Ronde ${p.round}</span>
          <span class="ahi-winner">${arisanAvatarHtml(p.winnerNama,"sm")}${escapeHtml(p.winnerNama)}</span>
          <span class="ahi-date mono">${fmtDateShort(p.tgl)}</span>
        </div>
      `).join("")}
    </div>`:""}

    ${isAuthed()?`<div style="margin-top:14px;"><button class="btn btn-sm" id="arGoAdminManage">${icon("shield")}<span>Kelola Arisan di Dashboard Admin</span></button></div>`:""}
  </div>`}function arisanEmptyHtml(){return`
  <div class="panel arisan-panel reveal" style="margin-top:16px;">
    <div class="empty-row" style="padding:36px 12px;">${icon("gift")}<div style="margin-top:8px;">Belum ada arisan yang dibuka saat ini. Nantikan pengumuman dari admin ya!</div></div>
    ${isAuthed()?`<div style="text-align:center;margin-top:6px;"><button class="btn btn-primary btn-sm" id="arGoAdminManage">${icon("plus-circle")}<span>Buka Pendaftaran Arisan</span></button></div>`:""}
  </div>`}function arisanHistoryHtml(a){return`
  <div class="panel" style="margin-top:16px;">
    <div class="panel-head"><h3>${icon("history")}Riwayat Batch Arisan Selesai</h3></div>
    <div class="arisan-mem-list">
      ${a.map(e=>`
        <div class="arisan-mem-row is-eligible">
          <span class="am-name">${escapeHtml(e.nama)}</span>
          <span class="am-badge am-badge-eligible">${e.drawHistory.length} ronde \xB7 ${rupiah(e.biaya)}/orang</span>
        </div>
      `).join("")}
    </div>
  </div>`}function renderArisanPage(){const a=activeArisanBatch(),e=finishedArisanBatches();return`
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">${icon("gift")}Kocok Tiap Tanggal 05 \xB7 Transparan &amp; Seru</div>
      <h1>Arisan Tanteh Susi</h1>
      <p class="hero-sub">Ikut arisan bulanan, iuran ringan, dikocok terbuka di depan semua anggota. Daftar, tunggu di-ACC admin, lalu nantikan giliranmu menang!</p>
      ${a?arisanBatchHtml(a):arisanEmptyHtml()}
      ${e.length?arisanHistoryHtml(e):""}
    </div>
  </div>
  <footer class="site-footer">Website dan sistem developer <a href="https://benyoriki.com" target="_blank" rel="noopener noreferrer">benyoriki.com</a></footer>
  `}const _arisanCountdownTimers={};function startCountdownTicker(a){_arisanCountdownTimers[a]&&clearInterval(_arisanCountdownTimers[a]),_arisanCountdownTimers[a]=setInterval(()=>{const e=document.getElementById(a+"Grid");if(!e){clearInterval(_arisanCountdownTimers[a]),delete _arisanCountdownTimers[a];return}const t=computeCountdown(e.dataset.target);document.getElementById(a+"Day").textContent=String(t.d).padStart(2,"0"),document.getElementById(a+"Hour").textContent=String(t.h).padStart(2,"0"),document.getElementById(a+"Min").textContent=String(t.m).padStart(2,"0"),document.getElementById(a+"Sec").textContent=String(t.s).padStart(2,"0")},1e3)}function bindArisanPage(){bindTopbarCommon(),document.getElementById("backHome2")?.addEventListener("click",()=>goto("/")),document.getElementById("arGoAdminManage")?.addEventListener("click",()=>{state.adminSection="arisan",goto("/admin")}),document.getElementById("arNama")?.addEventListener("input",a=>state.arisanReg.nama=a.target.value),document.getElementById("arHp")?.addEventListener("input",a=>state.arisanReg.hp=a.target.value),document.getElementById("arSubmit")?.addEventListener("click",()=>{const a=activeArisanBatch();if(!a||a.status!=="pendaftaran"){toast("Pendaftaran sudah ditutup","err");return}if(arisanQuotaFull(a)){toast("Kuota sudah penuh","err");return}const e=(document.getElementById("arNama").value||"").trim(),t=(document.getElementById("arHp").value||"").trim();if(!e){toast("Nama wajib diisi","err");return}a.members.push({id:uid("am"),nama:e,hp:t,status:"pending",daftarAt:new Date().toISOString().slice(0,10),sudahMenang:!1,menangRound:null,menangTgl:null}),saveArisanList(),state.arisanReg={nama:"",hp:""},toast("Pendaftaran terkirim, menunggu ACC admin"),render()}),startCountdownTicker("arCd"),bindArisanLiveWidget()}function bindArisanLiveWidget(){if(!document.getElementById("arLiveCard"))return;const e=activeArisanBatch(),t=e?arisanLiveDrawInfo(e):null;if(!t)return;const n=arisanEligibleMembers(e);if(!n.length)return;const s=n.find(o=>o.id===t.winnerId)||{id:t.winnerId,nama:t.winnerNama},i=document.getElementById("arLiveStatus"),r=document.getElementById("arLiveMachine");if(t.elapsed>=t.durationMs){r?.classList.add("is-jackpot"),i&&(i.textContent=`Pemenangnya adalah ${s.nama}!`),document.getElementById("arLiveResult").style.display="flex",document.getElementById("arLiveWinnerName").textContent=s.nama;const o=document.getElementById("arLiveProgress");o&&(o.style.transition="none",o.style.width="100%"),SLOT_REEL_TIMING.forEach((l,u)=>{const d=document.getElementById("arLiveReel"+u);if(!d)return;const{html:p,targetIndex:f}=_buildSlotReelHtml(n,s,l.laps);d.innerHTML=p,d.style.transition="none",d.style.transform=`translateY(${-(f-1)*SLOT_CELL}px)`,d.closest(".slot-reel-window")?.classList.add("is-settled")});return}r?.classList.add("is-spinning"),_startSlotProgress("arLive",t.elapsed),runSlotMachineSpin("arLive",n,s,t.elapsed,()=>{r?.classList.remove("is-spinning"),r?.classList.add("is-jackpot"),i&&(i.textContent=`Pemenangnya adalah ${s.nama}!`),document.getElementById("arLiveResult").style.display="flex",document.getElementById("arLiveWinnerName").textContent=s.nama,spawnConfetti(document.getElementById("arLiveConfetti"))},(o,l)=>{!i||o>=l||(i.textContent=o===l-1?"\u25CF LIVE \u2014 reel terakhir masih berputar\u2026 tahan napas!":`\u25CF LIVE \u2014 reel ${o}/${l} berhenti\u2026`)})}function renderPengajuanPage(){const a=state.pengajuan,e=activeMembers(),t=a.patunganSet||new Set(e.map(s=>s.id)),n=computePengajuanValidation();return`
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Formulir Terbuka \xB7 Bisa Diisi Siapa Saja</div>
      <h1>Ajukan Pembelian Barang/Jasa</h1>
      <p class="hero-sub">Isi kebutuhan barang/jasa yang mau dibeli pakai kas. Pengajuan akan masuk ke dashboard admin untuk disetujui atau ditolak.</p>

      <div class="pg-card">
        <div class="pg-card-head">
          <span class="pg-card-head-icon">${icon("plus-circle")}</span>
          <div>
            <div class="pg-card-head-title">Detail Pengajuan</div>
            <div class="pg-card-head-sub">Lengkapi data di bawah, admin akan meninjau pengajuanmu.</div>
          </div>
        </div>

        <div class="field">
          <label><span class="field-ico">${icon("edit")}</span>Keterangan Barang/Jasa</label>
          <textarea id="pgKet" rows="3" placeholder="mis. Beli tinta printer 1 botol">${escapeHtml(a.ket)}</textarea>
        </div>
        <div class="field">
          <label><span class="field-ico">${icon("sheet")}</span>Nominal</label>
          <div class="field-money">
            <span class="field-money-prefix">Rp</span>
            <input type="number" inputmode="numeric" id="pgNominal" value="${a.nominal||""}" placeholder="25.000">
          </div>
        </div>

        <div class="field">
          <label><span class="field-ico">${icon("users")}</span>Sumber Dana</label>
          <div class="sheet-tabs pg-mode-tabs" id="pgModeTabs" style="width:100%;">
            <button class="sheet-tab ${a.mode==="solo"?"active":""}" data-mode="solo" style="flex:1;">${icon("lock")}<span>Solo (1 Admin)</span></button>
            <button class="sheet-tab ${a.mode==="patungan"?"active":""}" data-mode="patungan" style="flex:1;">${icon("users")}<span>Patungan</span></button>
          </div>
        </div>

        ${a.mode==="solo"?`
        <div class="field">
          <label><span class="field-ico">${icon("lock")}</span>Pilih Admin (saldo orang tsb harus mencukupi)</label>
          <select id="pgSoloAdmin">
            <option value="">\u2014 pilih admin \u2014</option>
            ${e.map(s=>`<option value="${s.id}" ${a.soloAdmin===s.id?"selected":""}>${s.nama} \u2014 saldo ${rupiah(memberAvailableSaldo(s.id))}</option>`).join("")}
          </select>
        </div>
        `:`
        <div class="field">
          <label><span class="field-ico">${icon("users")}</span>Pilih Admin yang Patungan</label>
          <div class="check-list">
            ${e.map(s=>`
              <label class="check-row">
                <input type="checkbox" data-patungan="${s.id}" ${t.has(s.id)?"checked":""}>
                ${avatarHtml(s.id,"sm")}<span>${s.nama}</span>
                <span class="check-row-saldo mono">${rupiah(memberAvailableSaldo(s.id))}</span>
              </label>
            `).join("")}
          </div>
          <p class="field-hint">Nominal akan dibagi rata ke semua admin yang dicentang.</p>
        </div>
        `}

        <div class="field">
          <label><span class="field-ico">${icon("edit")}</span>Nama Pemohon <span style="font-weight:400;color:var(--ink-faint);">(opsional)</span></label>
          <input type="text" id="pgPemohon" value="${escapeHtml(a.pemohon)}" placeholder="Nama kamu">
        </div>

        <div class="pg-saldo-note ${n.note?"show":""}" id="pgSaldoNote">${n.note?`${icon("alert")}<span>${escapeHtml(n.note)}</span>`:""}</div>

        <div class="modal-actions pg-actions">
          <button class="btn btn-primary" id="pgSubmit" ${n.ok?"":"disabled"}>${icon("plus-circle")}<span>Kirim Pengajuan</span></button>
          <button class="btn" id="pgCancel">Batal</button>
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">Website dan sistem developer <a href="https://benyoriki.com" target="_blank" rel="noopener noreferrer">benyoriki.com</a></footer>
  `}function resetPengajuanDraft(){state.pengajuan={mode:"solo",soloAdmin:"",patunganSet:null,ket:"",nominal:"",pemohon:"",editingReqId:null}}function bindPengajuanPage(){bindTopbarCommon(),document.getElementById("backHome2")?.addEventListener("click",()=>goto("/")),document.getElementById("pgKet")?.addEventListener("input",a=>state.pengajuan.ket=a.target.value),document.getElementById("pgNominal")?.addEventListener("input",a=>{state.pengajuan.nominal=a.target.value,updatePengajuanValidation()}),document.getElementById("pgPemohon")?.addEventListener("input",a=>state.pengajuan.pemohon=a.target.value),document.getElementById("pgSoloAdmin")?.addEventListener("change",a=>{state.pengajuan.soloAdmin=a.target.value,updatePengajuanValidation()}),document.querySelectorAll("#pgModeTabs [data-mode]").forEach(a=>{a.addEventListener("click",()=>{state.pengajuan.mode=a.dataset.mode,render()})}),document.querySelectorAll("[data-patungan]").forEach(a=>{a.addEventListener("change",()=>{state.pengajuan.patunganSet||(state.pengajuan.patunganSet=new Set(activeMembers().map(t=>t.id)));const e=a.dataset.patungan;a.checked?state.pengajuan.patunganSet.add(e):state.pengajuan.patunganSet.delete(e),updatePengajuanValidation()})}),document.getElementById("pgCancel")?.addEventListener("click",()=>{resetPengajuanDraft(),goto("/")}),document.getElementById("pgSubmit")?.addEventListener("click",()=>{const a=state.pengajuan,e=(document.getElementById("pgKet").value||"").trim(),t=Number(document.getElementById("pgNominal").value)||0;if(!e){toast("Keterangan barang/jasa wajib diisi","err");return}if(t<=0){toast("Nominal harus lebih dari 0","err");return}let n=[];if(a.mode==="solo"){if(!a.soloAdmin){toast("Pilih admin untuk sumber dana","err");return}n=[a.soloAdmin]}else{const i=a.patunganSet||new Set(activeMembers().map(r=>r.id));if(n=activeMembers().filter(r=>i.has(r.id)).map(r=>r.id),n.length===0){toast("Pilih minimal 1 admin untuk patungan","err");return}}const s=computePengajuanValidation();if(!s.ok){toast(s.note||"Saldo tidak cukup untuk pengajuan ini","err"),updatePengajuanValidation();return}DB.requests.push({id:uid("req"),tgl:new Date().toISOString().slice(0,10),keterangan:e,nominal:t,mode:a.mode,admins:n,pemohon:(document.getElementById("pgPemohon").value||"").trim()||"Tamu",status:"pending",decidedAt:null}),saveRequests(DB.requests),resetPengajuanDraft(),toast("Pengajuan terkirim, menunggu persetujuan admin"),goto("/riwayat")}),updatePengajuanValidation()}function renderRiwayatPage(){const a=[...DB.requests].sort((s,i)=>i.tgl.localeCompare(s.tgl)||i.id.localeCompare(s.id)),e=a.filter(s=>s.status==="pending").length,t=a.filter(s=>s.status==="approved").length,n=a.filter(s=>s.status==="rejected").length;return`
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Transparansi Pengajuan</div>
      <h1>Riwayat Pengajuan Pembelian</h1>
      <p class="hero-sub">Semua pengajuan pembelian\u2014baik yang disetujui, ditolak, maupun masih menunggu\u2014tercatat terbuka di sini.</p>
      ${isAuthed()?"":`<button class="money-toggle-btn" id="moneyToggleBtn" style="margin-bottom:16px;">${icon(state.moneyRevealed?"eye-off":"eye")}<span>${state.moneyRevealed?"Sembunyikan Semua Nominal":"Tampilkan Semua Nominal"}</span></button>`}

      ${a.length?`
      <div class="req-summary reveal">
        <div class="rq-stat rq-stat-pending"><span class="rq-num mono">${e}</span><span class="rq-label">Menunggu</span></div>
        <div class="rq-stat rq-stat-approved"><span class="rq-num mono">${t}</span><span class="rq-label">Disetujui</span></div>
        <div class="rq-stat rq-stat-rejected"><span class="rq-num mono">${n}</span><span class="rq-label">Ditolak</span></div>
      </div>`:""}

      <div class="panel">
        <div class="req-list">
          ${a.length?a.map(s=>reqCardHtml(s)).join(""):'<div class="empty-row">Belum ada pengajuan.</div>'}
        </div>
      </div>
      <div style="margin-top:16px;">
        <button class="btn btn-primary" id="goPengajuanBtn">${icon("plus-circle")}<span>Ajukan Pembelian Baru</span></button>
      </div>
    </div>
  </div>
  <footer class="site-footer">Website dan sistem developer <a href="https://benyoriki.com" target="_blank" rel="noopener noreferrer">benyoriki.com</a></footer>
  `}function reqCardHtml(a,e){const t=requestStatusMeta(a.status),n=a.admins.map(nameOf).join(", "),s=isAuthed()?"":"money-blur",i=a.admins.slice(0,5),r=a.admins.length-i.length;return`
    <div class="req-card">
      <div class="req-top">
        <span class="stamp ${t.cls}">${t.label}</span>
        <span class="req-amt mono ${s}">${moneyDual(a.nominal)}</span>
      </div>
      <div class="req-ket">${escapeHtml(a.keterangan)}</div>
      <div class="req-meta-row">
        <span class="asset-meta-chip">${icon("calendar")}<span>Diajukan ${fmtDateShort(a.tgl)}</span></span>
        <span class="asset-meta-chip">${avatarHtml(a.pemohon||"Tamu","sm")}<span>${escapeHtml(a.pemohon||"Tamu")}</span></span>
      </div>
      <div class="asset-funding">
        <div class="asset-avatars">
          ${i.map(o=>avatarHtml(o,"sm")).join("")}
          ${r>0?`<span class="asset-avatar-more">+${r}</span>`:""}
        </div>
        <span class="asset-funding-label" title="${escapeHtml(n)}">${a.mode==="solo"?"Solo":"Patungan"}: ${n}</span>
      </div>
      ${a.status!=="pending"?`
        <div class="req-decision ${t.cls}">
          ${icon(a.status==="approved"?"check":"close")}
          <span>Diputuskan ${a.decidedAt?fmtDateShort(a.decidedAt):""}${a.catatan?` \u2014 "${escapeHtml(a.catatan)}"`:""}</span>
        </div>`:""}
      ${e?`
        <div class="req-actions">
          ${a.status==="pending"?`
          <button class="btn btn-sm" style="color:var(--forest);border-color:var(--forest);" data-acc="${a.id}">${icon("check")}<span>ACC</span></button>
          <button class="btn btn-sm btn-danger" data-tolak="${a.id}">${icon("close")}<span>Tolak</span></button>
          <button class="btn btn-sm" data-edit-req="${a.id}">${icon("edit")}<span>Edit</span></button>
          `:""}
          <button class="btn btn-sm btn-danger" data-del-req="${a.id}" title="Hapus pengajuan">${icon("trash")}</button>
        </div>`:""}
    </div>
  `}function renderAsetPage(){const a=DB.requests.filter(s=>s.status==="approved").sort((s,i)=>i.decidedAt.localeCompare(s.decidedAt)),e=a.reduce((s,i)=>s+i.nominal,0),t=a.filter(s=>s.jenis!=="jasa").length,n=a.filter(s=>s.jenis==="jasa").length;return`
  ${topbar()}
  <div class="container">
    <div class="hero">
      <button class="back-link" id="backHome2">&larr; Kembali ke beranda</button>
      <div class="hero-eyebrow">Hasil Pengeluaran Kas</div>
      <h1>Aset Barang/Jasa Milik Pribadi Admin</h1>
      <p class="hero-sub">Daftar barang/jasa yang sudah dibeli menggunakan saldo kas pribadi admin, hasil dari pengajuan yang disetujui.</p>
      ${isAuthed()?"":`<button class="money-toggle-btn" id="moneyToggleBtn" style="margin-bottom:16px;">${icon(state.moneyRevealed?"eye-off":"eye")}<span>${state.moneyRevealed?"Sembunyikan Semua Nominal":"Tampilkan Semua Nominal"}</span></button>`}

      <div class="asset-summary reveal">
        <div class="asset-summary-main">
          <div class="asset-summary-icon">${icon("box")}</div>
          <div>
            <div class="label">Total Nilai Aset</div>
            <div class="value mono money-blur">${moneyDual(e)}</div>
          </div>
        </div>
        <div class="asset-summary-stats">
          <div class="asu-stat"><span class="asu-num mono">${a.length}</span><span class="asu-label">Total Item</span></div>
          <div class="asu-stat"><span class="asu-num mono">${t}</span><span class="asu-label">Barang</span></div>
          <div class="asu-stat"><span class="asu-num mono">${n}</span><span class="asu-label">Jasa</span></div>
        </div>
      </div>

      <div class="panel">
        <div class="asset-list">
          ${a.length?a.map((s,i)=>{const r=s.jenis==="jasa",o=s.admins.map(nameOf).join(", "),l=s.admins.slice(0,5),u=s.admins.length-l.length;return`
            <div class="asset-card" style="--i:${i};">
              <div class="asset-card-top">
                <span class="asset-type-badge ${r?"jasa":"barang"}">${icon(r?"report":"box")}<span>${r?"Jasa":"Barang"}</span></span>
                <span class="asset-amt mono money-blur">${moneyDual(s.nominal)}</span>
              </div>
              <div class="asset-ket">${escapeHtml(s.keterangan)}</div>
              <div class="asset-meta-row">
                <span class="asset-meta-chip">${icon("calendar")}<span>Disetujui ${fmtDateShort(s.decidedAt)}</span></span>
              </div>
              <div class="asset-funding">
                <div class="asset-avatars">
                  ${l.map(d=>avatarHtml(d,"sm")).join("")}
                  ${u>0?`<span class="asset-avatar-more">+${u}</span>`:""}
                </div>
                <span class="asset-funding-label" title="${escapeHtml(o)}">${s.mode==="solo"?"Dana dari":"Patungan"}: ${o}</span>
              </div>
            </div>
          `}).join(""):'<div class="empty-row">Belum ada aset tercatat.</div>'}
        </div>
      </div>
    </div>
  </div>
  <footer class="site-footer">Website dan sistem developer <a href="https://benyoriki.com" target="_blank" rel="noopener noreferrer">benyoriki.com</a></footer>
  `}function bindSimplePage(){bindTopbarCommon(),document.getElementById("backHome2")?.addEventListener("click",()=>goto("/")),document.getElementById("goPengajuanBtn")?.addEventListener("click",()=>goto("/pengajuan")),bindMoneyToggle()}function renderLogin(){return`
  <div class="login-screen">
    <div class="login-card">
      <button class="back-link" id="backHome">&larr; Kembali ke tampilan tamu</button>
      <div class="login-brand">
        <div class="brand-mark" style="width:46px;height:46px;"><img src="assets/piggy-sm.webp" alt="Logo"></div>
        <h2 style="font-size:17px;">Masuk sebagai Admin</h2>
        <span class="stamp active" style="font-size:9px;">Akses Terbatas</span>
      </div>
      <div class="field">
        <label>Username / Email</label>
        <input type="text" id="loginUser" placeholder="admin" autocomplete="username">
      </div>
      <div class="field">
        <label>Password</label>
        <input type="password" id="loginPass" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" autocomplete="current-password">
      </div>
      <div class="login-error" id="loginErr"></div>
      <button class="btn btn-primary" id="loginSubmit" style="width:100%;justify-content:center;">${icon("shield")}<span>Masuk</span></button>
      <p class="login-hint">Login dengan username <b>admin</b> (atau email langsung) \u2014 akun dikelola lewat Firebase Authentication.</p>
    </div>
  </div>`}function bindLogin(){document.getElementById("backHome").addEventListener("click",()=>goto("/"));const a=async()=>{const e=document.getElementById("loginUser").value.trim(),t=document.getElementById("loginPass").value,n=document.getElementById("loginSubmit"),s=document.getElementById("loginErr");s.textContent="",n.disabled=!0;try{await FJHT.signInAdmin(e,t),goto("/admin")}catch{s.textContent="Username atau password salah."}finally{n.disabled=!1}};document.getElementById("loginSubmit").addEventListener("click",a),document.getElementById("loginPass").addEventListener("keydown",e=>{e.key==="Enter"&&a()})}const ADMIN_NAV=[{id:"dashboard",label:"Dashboard",icon:"grid"},{id:"transaksi",label:"Transaksi",icon:"book"},{id:"pengajuan",label:"Pengajuan",icon:"inbox"},{id:"anggota",label:"Anggota",icon:"users"},{id:"arisan",label:"Arisan",icon:"gift"},{id:"histori",label:"Histori",icon:"history"},{id:"laporan",label:"Laporan",icon:"report"}];function renderAdmin(){const a=document.documentElement.getAttribute("data-theme")||"dark",e=pendingRequestCount();return`
  <div class="admin-topbar-mobile">
    <div class="brand-mark" style="width:32px;height:32px;"><img src="assets/piggy-sm.webp" alt="Logo"></div>
    <div class="brand-text"><b>JHT KAS Adm</b></div>
    <button class="icon-btn hamburger-btn" id="adminHamburgerBtn" style="margin-left:auto;" title="Menu">${icon("menu")}${e>0?'<span class="menu-dot"></span>':""}</button>
    <div class="mobile-menu-panel" id="adminMobileMenuPanel">
      <div class="mm-panel-head"><span class="mm-panel-head-icon">${icon("menu")}</span><span>Menu Navigasi</span></div>
      <div class="mm-label" style="--tone:var(--blue);">Navigasi</div>
      ${ADMIN_NAV.map(t=>`
        <button class="mm-item ${state.adminSection===t.id?"active":""}" data-sec="${t.id}" data-tone="info"><span class="mm-ico-wrap">${icon(t.icon)}</span><span>${t.label}</span>${t.id==="pengajuan"&&e>0?`<span class="mm-badge">${e}</span>`:""}${t.id==="arisan"&&arisanPendingCount()>0?`<span class="mm-badge">${arisanPendingCount()}</span>`:""}</button>
      `).join("")}
      <div class="mm-sep"></div>
      <div class="mm-label" style="--tone:var(--amber);">Unduh Data</div>
      <button class="mm-item" id="mAdminExportExcel" data-tone="download"><span class="mm-ico-wrap">${icon("file-excel")}</span><span>Unduh Excel</span></button>
      <button class="mm-item" id="mAdminExportPdf" data-tone="download"><span class="mm-ico-wrap">${icon("file-pdf")}</span><span>Unduh PDF</span></button>
      <div class="mm-sep"></div>
      <button class="mm-item" id="themeBtnM"><span class="mm-ico-wrap">${icon(a==="dark"?"sun":"moon")}</span><span>Ganti Tema</span></button>
      <button class="mm-item" id="viewGuestBtnM"><span class="mm-ico-wrap">${icon("grid")}</span><span>Lihat Tampilan Tamu</span></button>
      <button class="mm-item" id="logoutBtnM" style="color:var(--rust);"><span class="mm-ico-wrap">${icon("logout")}</span><span>Keluar</span></button>
    </div>
  </div>
  <div class="admin-shell">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <div class="brand-mark"><img src="assets/piggy-sm.webp" alt="Logo"></div>
        <div class="brand-text"><b>JHT KAS</b><span>Admin</span></div>
      </div>
      ${ADMIN_NAV.map(t=>`
        <button class="nav-item ${state.adminSection===t.id?"active":""}" data-sec="${t.id}">
          ${icon(t.icon)}<span>${t.label}</span>${t.id==="pengajuan"&&e>0?`<span class="mm-badge">${e}</span>`:""}${t.id==="arisan"&&arisanPendingCount()>0?`<span class="mm-badge">${arisanPendingCount()}</span>`:""}
        </button>
      `).join("")}
      <div class="nav-sep"></div>
      <div class="nav-foot">
        <button class="icon-btn" id="themeBtnA" title="Ganti tema">${icon(a==="dark"?"sun":"moon")}</button>
        <button class="nav-item" id="viewGuestBtn">${icon("grid")}<span>Lihat Tampilan Tamu</span></button>
        <button class="nav-item" id="logoutBtn" style="color:var(--rust);">${icon("logout")}<span>Keluar</span></button>
      </div>
    </aside>
    <main class="admin-main">
      <div id="adminContent"></div>
    </main>
  </div>
  <div class="modal-overlay" id="modalOverlay"><div class="modal" id="modalBody"></div></div>
  `}function adminContentHtml(){switch(state.adminSection){case"transaksi":return secTransaksi();case"pengajuan":return secPengajuan();case"anggota":return secAnggota();case"arisan":return secArisan();case"histori":return secHistori();case"laporan":return secLaporan();default:return secDashboard()}}function secPengajuan(){const a=[...DB.requests].sort((n,s)=>s.tgl.localeCompare(n.tgl)||s.id.localeCompare(n.id)),e=a.filter(n=>n.status==="pending"),t=a.filter(n=>n.status!=="pending");return`
    <div class="admin-topline">
      <div><h2>Pengajuan Pembelian</h2><div class="sub">${e.length} menunggu persetujuan \xB7 ${t.length} sudah diputuskan</div></div>
    </div>
    <div class="panel" style="margin-bottom:16px;">
      <div class="panel-head"><h3>\u23F3 Menunggu Persetujuan</h3></div>
      <div class="req-list">
        ${e.length?e.map(n=>reqCardHtml(n,!0)).join(""):'<div class="empty-row">Tidak ada pengajuan yang menunggu.</div>'}
      </div>
    </div>
    <div class="panel">
      <div class="panel-head"><h3>Riwayat Keputusan</h3></div>
      <div class="req-list">
        ${t.length?t.map(n=>reqCardHtml(n,!0)).join(""):'<div class="empty-row">Belum ada riwayat.</div>'}
      </div>
    </div>
  `}function secArisan(){const a=activeArisanBatch(),e=finishedArisanBatches();return`
    <div class="admin-topline">
      <div><h2>${icon("gift")}Arisan Tanteh Susi</h2><div class="sub">Buka pendaftaran, ACC anggota, dan kocok pemenang tiap bulan</div></div>
      ${a?"":`<button class="btn btn-primary" id="arisanNewBatchBtn">${icon("plus-circle")}<span>Buka Pendaftaran Baru</span></button>`}
    </div>

    ${a?secArisanBatchHtml(a):'<div class="panel"><div class="empty-row" style="padding:30px;">Belum ada batch arisan yang dibuka.</div></div>'}

    ${e.length?`
    <div class="panel" style="margin-top:16px;">
      <div class="panel-head"><h3>${icon("history")}Riwayat Batch Selesai</h3></div>
      <div class="arisan-mem-list">
        ${e.map(t=>`
          <div class="arisan-mem-row is-eligible">
            <span class="am-name">${escapeHtml(t.nama)}</span>
            <span class="am-badge am-badge-eligible">${t.drawHistory.length} ronde selesai \xB7 ${rupiah(t.biaya)}/orang</span>
            <button class="icon-btn sm" style="color:var(--rust);" data-del-arisan-batch="${t.id}" title="Hapus riwayat">${icon("trash")}</button>
          </div>
        `).join("")}
      </div>
    </div>`:""}
  `}function secArisanBatchHtml(a){const e=arisanStatusMeta(a.status),t=arisanApprovedMembers(a),n=arisanPendingMembers(a),s=arisanEligibleMembers(a),i=arisanQuotaTaken(a),r=arisanNextDrawDate(a),o=[...a.drawHistory||[]].sort((l,u)=>u.round-l.round);return`
  <div class="panel arisan-panel" style="margin-bottom:16px;">
    <div class="arisan-panel-head">
      <div>
        <div class="arisan-batch-name">${escapeHtml(a.nama)}</div>
        <span class="arisan-status-badge ${e.cls}">${e.label}</span>
      </div>
      <div class="arisan-fee-chip">
        <span class="label">Iuran / bulan</span>
        <span class="val mono">${rupiah(a.biaya)}</span>
        <button class="arisan-fee-edit-btn" id="arisanEditFeeBtn" title="Ubah nominal iuran">${icon("edit")}<span>Ubah</span></button>
      </div>
    </div>
    <div class="hint" style="margin-bottom:10px;">Kuota: ${a.kuota?`${i}/${a.kuota} (dibatasi)`:`${i} orang terdaftar \xB7 Kuota bebas berapa saja selama pendaftaran belum ditutup`} \xB7 Mulai kocok: ${fmtDateShort(a.tglMulai)} \xB7 Ronde berjalan: ${a.currentRound}</div>

    <div class="arisan-control-card">
      <div class="arisan-toggle-row">
        <div class="arisan-toggle-text">
          <div class="arisan-toggle-title">${icon("gift")}<span>Pendaftaran Anggota</span></div>
          <div class="arisan-toggle-sub">${a.status==="pendaftaran"?"Terbuka \u2014 siapa saja boleh mendaftar sekarang.":arisanLiveDrawInfo(a)?"Ditutup \u2014 tidak bisa dibuka selama kocokan sedang live.":"Ditutup \u2014 arisan sedang berjalan, kocokan bulanan aktif."}</div>
        </div>
        <button class="arisan-switch ${a.status==="pendaftaran"?"is-on":""}" id="arisanRegToggle" role="switch" aria-checked="${a.status==="pendaftaran"}" ${arisanLiveDrawInfo(a)?"disabled":""} title="${a.status==="pendaftaran"?"Klik untuk menutup pendaftaran":"Klik untuk membuka pendaftaran"}">
          <span class="arisan-switch-knob"></span>
        </button>
      </div>
    </div>

    ${arisanCountdownHtml(r,"adCd",a.status==="berjalan"?"Kocokan berikutnya:":"Kocokan pertama dijadwalkan:")}

    <!-- Mesin slot ditempel LANGSUNG di bawah hitung mundur (bukan pop-up
         modal terpisah lagi). Saat belum waktunya kocok, tampilkan pratinjau
         statis (idle) di posisi yang sama supaya tidak ada "lubang" kosong;
         begitu live, digantikan versi yang benar-benar berputar \u2014 lihat
         bindArisanAdminLiveWidget. -->
    ${!arisanLiveDrawInfo(a)&&a.status==="berjalan"?arisanIdleSlotHtml(s):""}

    ${arisanLiveDrawInfo(a)?`
    <div class="arisan-live-card" id="adDrawCard">
      <div class="arisan-live-badge"><span class="dot"></span>LIVE \u2014 Kocokan Sedang Berlangsung</div>
      <div class="wheel-status-label" id="adWheelStatus">\u25CF LIVE \u2014 reel sedang berputar\u2026</div>
      ${slotMachineMarkup("adDraw")}
      <div class="draw-result" id="adDrawResult" style="display:none;">
        <div class="draw-confetti" id="adDrawConfetti"></div>
        <div class="draw-winner-trophy">${icon("trophy")}</div>
        <div class="draw-winner-label">Selamat kepada</div>
        <div class="draw-winner-name" id="adDrawWinnerName"></div>
        <div class="draw-confirm-question">Sah sebagai pemenang ronde ini?</div>
      </div>
      <div class="modal-actions" id="adDrawActions" style="visibility:hidden;">
        <button class="btn" id="adDrawCancel">${icon("dice")}<span>Tidak Sah \u2014 Putar Ulang</span></button>
        <button class="btn btn-primary" id="adDrawConfirm">${icon("check")}<span>Ya, Sah \u2014 Simpan</span></button>
      </div>
    </div>`:""}

    <div class="admin-arisan-actions">
      ${a.status==="berjalan"&&!arisanLiveDrawInfo(a)&&s.length>0?`<button class="btn btn-sm" id="arisanEditOrderBtn">${icon("edit")}<span>Atur Urutan Pemenang</span></button>`:""}
      ${a.status==="berjalan"&&!arisanLiveDrawInfo(a)?`<button class="btn btn-primary btn-sm" id="arisanDrawBtn" ${s.length===0?"disabled":""}>${icon("dice")}<span>Kocok Sekarang!</span></button>`:""}
      <button class="btn btn-sm btn-danger" id="arisanDeleteBatchBtn">${icon("trash")}<span>Hapus Batch</span></button>
    </div>
    ${a.status==="pendaftaran"&&s.length===0?`<p class="field-hint" style="margin:-4px 0 14px;">${icon("alert")} ACC minimal satu anggota dulu supaya tombol pendaftaran bisa ditutup.</p>`:""}

    ${n.length?`
    <div class="arisan-mem-group-label">\u23F3 Menunggu Persetujuan (${n.length})</div>
    <div class="arisan-mem-list">
      ${n.map(l=>`
        <div class="arisan-mem-row is-pending">
          ${arisanAvatarHtml(l.nama,"sm")}<span class="am-name">${escapeHtml(l.nama)}${l.hp?` \xB7 ${escapeHtml(l.hp)}`:""}</span>
          <div class="req-actions" style="margin-left:auto;">
            <button class="btn btn-sm" style="color:var(--forest);border-color:var(--forest);" data-arisan-acc="${a.id}|${l.id}">${icon("check")}<span>ACC</span></button>
            <button class="btn btn-sm btn-danger" data-arisan-tolak="${a.id}|${l.id}">${icon("close")}<span>Tolak</span></button>
          </div>
        </div>
      `).join("")}
    </div>`:""}

    <div class="arisan-mem-group-label">${icon("users")}Anggota Aktif (${t.length})</div>
    <div class="arisan-mem-list">
      ${t.length?t.map(l=>`
        <div class="arisan-mem-row ${l.sudahMenang?"is-winner":"is-eligible"}">
          ${l.sudahMenang?`<span class="am-trophy">${icon("trophy")}</span>`:arisanAvatarHtml(l.nama,"sm")}
          <span class="am-name">${escapeHtml(l.nama)}</span>
          <span class="am-badge ${l.sudahMenang?"am-badge-winner":"am-badge-eligible"}">${l.sudahMenang?`Menang ronde ${l.menangRound}`:"Aktif"}</span>
          ${a.status==="pendaftaran"?`<button class="icon-btn sm" style="color:var(--rust);margin-left:auto;" data-arisan-remove="${a.id}|${l.id}" title="Keluarkan">${icon("trash")}</button>`:""}
        </div>
      `).join(""):'<div class="empty-row">Belum ada anggota disetujui.</div>'}
    </div>

    ${o.length?`
    <div class="arisan-mem-group-label">${icon("trophy")}Riwayat Kocokan</div>
    <div class="arisan-history-list">
      ${o.map(l=>`
        <div class="arisan-history-item">
          <span class="ahi-round">Ronde ${l.round}</span>
          <span class="ahi-winner">${arisanAvatarHtml(l.winnerNama,"sm")}${escapeHtml(l.winnerNama)}</span>
          <span class="ahi-date mono">${fmtDateShort(l.tgl)}</span>
        </div>
      `).join("")}
    </div>`:""}
  </div>`}function arisanBatchFormModal(){const a=(()=>{const e=new Date;return e.setMonth(e.getMonth()+1),`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-05`})();return`
    <div class="modal-head"><h3>${icon("gift")}Buka Pendaftaran Arisan</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Nama Batch</label><input type="text" id="abNama" placeholder="mis. Arisan Tanteh Susi \u2014 Batch Oktober 2026" value="Arisan Tanteh Susi \u2014 Batch ${monthLabel(a.slice(0,7))}"></div>
    <div class="field"><label>Iuran / bulan (Rp)</label><input type="number" id="abBiaya" value="150000"></div>
    <div class="field"><label>Tanggal Kocokan Pertama</label><input type="date" id="abTgl" value="${a}"></div>
    <p class="field-hint">Kuota anggota bebas berapa saja \u2014 siapa pun boleh daftar selama status masih "Pendaftaran Dibuka". Pendaftaran hanya berhenti saat admin menekan tombol "Tutup Pendaftaran &amp; Mulai". Kocokan berikutnya otomatis dijadwalkan tiap tanggal yang sama setiap bulan.</p>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="abSave">${icon("gift")}<span>Buka Pendaftaran</span></button>
    </div>
  `}function bindArisanBatchForm(){document.getElementById("modalClose").addEventListener("click",closeModal),document.getElementById("modalClose2").addEventListener("click",closeModal),document.getElementById("abSave").addEventListener("click",()=>{const a=(document.getElementById("abNama").value||"").trim(),e=Number(document.getElementById("abBiaya").value)||0,t=document.getElementById("abTgl").value;if(!a){toast("Nama batch wajib diisi","err");return}if(e<=0){toast("Iuran harus lebih dari 0","err");return}if(!t){toast("Tanggal kocokan pertama wajib diisi","err");return}DB.arisan.push({id:uid("arisan"),nama:a,biaya:e,kuota:0,tglMulai:t,status:"pendaftaran",currentRound:0,createdAt:new Date().toISOString().slice(0,10),members:[],drawHistory:[]}),saveArisanList(),toast("Pendaftaran arisan dibuka!"),closeModal(),refreshAdminContent()})}function arisanEditFeeModal(a){return`
    <div class="modal-head"><h3>${icon("edit")} Ubah Iuran / Bulan</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <p class="field-hint">Nominal ini dipakai untuk tampilan &amp; tagihan mulai bulan berjalan. Contoh: dari Rp150.000 diubah jadi Rp200.000.</p>
    <div class="field"><label>${icon("edit")} Iuran / bulan (Rp)</label><input type="number" id="abEditBiaya" min="1000" step="1000" value="${a.biaya}"></div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="abEditFeeSave">${icon("check")}<span>Simpan Perubahan</span></button>
    </div>
  `}function bindArisanEditFeeForm(a){document.getElementById("modalClose").addEventListener("click",closeModal),document.getElementById("modalClose2").addEventListener("click",closeModal),document.getElementById("abEditFeeSave").addEventListener("click",()=>{const e=Number(document.getElementById("abEditBiaya").value)||0;if(e<=0){toast("Iuran harus lebih dari 0","err");return}const t=a.biaya;a.biaya=e,saveArisanList(),closeModal(),toast(t===e?"Iuran disimpan":`Iuran diubah dari ${rupiah(t)} jadi ${rupiah(e)}`),refreshAdminContent()})}function arisanWinnerOrderModal(a,e,t){t=t||{};const n=t.mode==="edit",s=t.roundOffset||0,i=a.map((r,o)=>{const l=addMonthsISO(e,o);return`
    <div class="field arisan-order-row">
      <label>${icon("calendar")} Ronde ${s+o+1} \u2014 ${monthLabel(l.slice(0,7))}</label>
      <select class="arisan-order-select" data-idx="${o}">
        <option value="">Pilih anggota\u2026</option>
        ${a.map(u=>`<option value="${u.id}">${escapeHtml(u.nama)}</option>`).join("")}
      </select>
    </div>`}).join("");return`
    <div class="modal-head"><h3>${icon("trophy")}${n?"Atur Ulang Urutan Pemenang":"Tentukan Urutan Pemenang"}</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <p class="field-hint">${n?"Susun ulang giliran menang untuk anggota yang belum pernah dapat arisan. Mesin slot tetap tampil tiap kocokan supaya seru, tapi hasilnya akan selalu mengikuti urutan yang kamu atur di sini \u2014 bukan diundi acak.":"Sebelum arisan dimulai, tentukan dulu siapa dapat arisan di bulan apa untuk semua anggota yang sudah di-ACC. Mesin slot nanti tetap tampil berputar tiap bulan biar seru, tapi hasilnya sudah pasti mengikuti urutan yang kamu atur di sini."}</p>
    <div id="arisanOrderRows">${i}</div>
    <p class="field-hint" id="arisanOrderWarn" style="display:none;color:var(--rust);"></p>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="arisanOrderSave">${icon("check")}<span>${n?"Simpan Urutan":"Mulai Arisan"}</span></button>
    </div>
  `}function bindArisanWinnerOrderForm(a,e){document.getElementById("modalClose").addEventListener("click",closeModal),document.getElementById("modalClose2").addEventListener("click",closeModal);const t=Array.from(document.querySelectorAll(".arisan-order-select"));a.length===1&&t[0]&&(t[0].value=a[0].id,t[0].disabled=!0);function n(){const s=t.map(i=>i.value).filter(Boolean);t.forEach(i=>{const r=i.value;Array.from(i.options).forEach(o=>{o.value&&(o.disabled=s.includes(o.value)&&o.value!==r)})})}t.forEach(s=>s.addEventListener("change",n)),n(),document.getElementById("arisanOrderSave").addEventListener("click",()=>{const s=document.getElementById("arisanOrderWarn"),i=t.map(r=>r.value);if(i.some(r=>!r)){s.textContent="Semua ronde wajib diisi \u2014 pilih satu anggota untuk tiap bulan.",s.style.display="block";return}if(new Set(i).size!==a.length){s.textContent="Tiap anggota cuma boleh menang sekali \u2014 pastikan tidak ada nama yang dobel.",s.style.display="block";return}e(i)})}const SLOT_CELL=72,SLOT_TOTAL_MS=5e4,SLOT_REEL_TIMING=[{totalSec:19,slowPortion:.2,laps:25,ease:"cubic-bezier(.12,.84,.18,1)"},{totalSec:33,slowPortion:.26,laps:43,ease:"cubic-bezier(.08,.87,.13,1)"},{totalSec:50,slowPortion:.38,laps:65,ease:"cubic-bezier(.05,.92,.08,1)"}];function _shuffleCopy(a){const e=a.slice();for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1)),s=e[t];e[t]=e[n],e[n]=s}return e}function _slotCellHtml(a){return`<div class="slot-cell"><span class="slot-avatar" style="background:${avatarBg(arisanColorFor(a.nama))}">${initials(a.nama)}</span><span class="slot-name">${escapeHtml(arisanShortName(a.nama))}</span></div>`}function _buildSlotReelHtml(a,e,t){let n=[];for(let i=0;i<t;i++)n.push(..._shuffleCopy(a));const s=n.length;return n.push(e),n.push(..._shuffleCopy(a).slice(0,2)),{html:n.map(_slotCellHtml).join(""),targetIndex:s}}function slotMachineMarkup(a){const e=n=>Array.from({length:n}).map((s,i)=>`<span class="slot-bulb" style="--i:${i}"></span>`).join(""),t=SLOT_REEL_TIMING.map((n,s)=>`
    <div class="slot-reel-window"><div class="slot-reel-strip" id="${a}Reel${s}"></div></div>
  `).join("");return`
    <div class="slot-machine" id="${a}Machine">
      <div class="slot-inner">
        <div class="slot-marquee">${e(14)}</div>
        <div class="slot-reels-row">
          ${t}
          <div class="slot-payline"><span class="pl-arrow left"></span><span class="pl-arrow right"></span></div>
        </div>
        <div class="slot-progress-track"><div class="slot-progress-fill" id="${a}Progress"></div></div>
        <div class="slot-marquee bottom">${e(14)}</div>
      </div>
    </div>`}function arisanIdleSlotHtml(a){const e=i=>Array.from({length:i}).map((r,o)=>`<span class="slot-bulb" style="--i:${o}"></span>`).join(""),t=i=>a&&a.length?a[i%a.length]:null,n=i=>i?`<div class="slot-cell"><span class="slot-avatar" style="background:${avatarBg(arisanColorFor(i.nama))}">${initials(i.nama)}</span></div>`:'<div class="slot-cell"><span class="slot-avatar" style="background:var(--bg-elev);color:var(--ink-faint);">?</span></div>',s=[0,1,2].map(i=>`<div class="slot-reel-window is-idle"><div class="slot-reel-strip is-idle">${n(t(i))}</div></div>`).join("");return`
  <div class="arisan-live-card arisan-idle-card">
    <div class="wheel-status-label">Mesin kocok siap \u2014 menanti jadwal kocokan berikutnya</div>
    <div class="slot-machine">
      <div class="slot-inner">
        <div class="slot-marquee">${e(14)}</div>
        <div class="slot-reels-row">
          ${s}
          <div class="slot-payline"><span class="pl-arrow left"></span><span class="pl-arrow right"></span></div>
        </div>
        <div class="slot-marquee bottom">${e(14)}</div>
      </div>
    </div>
  </div>`}function _startSlotProgress(a,e){const t=document.getElementById(a+"Progress");if(!t)return;const n=Math.max(0,SLOT_TOTAL_MS-e),s=Math.min(100,e/SLOT_TOTAL_MS*100);t.style.transition="none",t.style.width=s+"%",requestAnimationFrame(()=>requestAnimationFrame(()=>{t.style.transition=`width ${n/1e3}s linear`,t.style.width="100%"}))}function _runReelSync(a,e,t,n,s){const i=t.totalSec*1e3;if(n>=i){a.style.transition="none",a.style.transform=`translateY(${e}px)`,s();return}const r=i*(1-t.slowPortion),o=i-r,l=e*(1-t.slowPortion*.55),u=()=>{requestAnimationFrame(()=>{a.style.transition=`transform ${o/1e3}s ${t.ease}`,a.style.transform=`translateY(${e}px)`}),a.addEventListener("transitionend",function d(p){p.propertyName==="transform"&&(a.removeEventListener("transitionend",d),s())})};if(n<r){const d=n>0?l*(n/r):0;a.style.transition="none",a.style.transform=`translateY(${d}px)`,requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=`transform ${(r-n)/1e3}s linear`,a.style.transform=`translateY(${l}px)`})),a.addEventListener("transitionend",function p(f){f.propertyName==="transform"&&(a.removeEventListener("transitionend",p),u())})}else{const d=i-n;a.style.transition="none",a.style.transform=`translateY(${l}px)`,requestAnimationFrame(()=>requestAnimationFrame(()=>{a.style.transition=`transform ${d/1e3}s ${t.ease}`,a.style.transform=`translateY(${e}px)`})),a.addEventListener("transitionend",function p(f){f.propertyName==="transform"&&(a.removeEventListener("transitionend",p),s())})}}function runSlotMachineSpin(a,e,t,n,s,i){let r=0;SLOT_REEL_TIMING.forEach((o,l)=>{const u=document.getElementById(a+"Reel"+l);if(!u)return;const{html:d,targetIndex:p}=_buildSlotReelHtml(e,t,o.laps);u.innerHTML=d;const f=-(p-1)*SLOT_CELL;_runReelSync(u,f,o,n,()=>{u.closest(".slot-reel-window")?.classList.add("is-settled"),r++,i&&i(r,SLOT_REEL_TIMING.length),r===SLOT_REEL_TIMING.length&&s&&s()})})}function startArisanDraw(a){const e=arisanEligibleMembers(a);if(!e.length){toast("Tidak ada anggota yang eligible untuk dikocok","err");return}let t=null;Array.isArray(a.winnerOrder)&&a.winnerOrder.length&&(t=e.find(n=>n.id===a.winnerOrder[0])||null),t||(t=e[Math.floor(Math.random()*e.length)]),a.liveDraw={active:!0,winnerId:t.id,winnerNama:t.nama,round:a.currentRound+1,startedAt:Date.now(),durationMs:SLOT_TOTAL_MS},saveArisanList()}function bindArisanAdminLiveWidget(a){if(!document.getElementById("adDrawCard"))return;const t=arisanLiveDrawInfo(a);if(!t)return;const n=arisanEligibleMembers(a),s=n.find(d=>d.id===t.winnerId)||{id:t.winnerId,nama:t.winnerNama},i=document.getElementById("adWheelStatus"),r=document.getElementById("adDrawMachine"),o=document.getElementById("adDrawResult"),l=document.getElementById("adDrawActions");function u(){r?.classList.remove("is-spinning"),r?.classList.add("is-jackpot"),i&&(i.textContent=`Pemenangnya adalah ${s.nama}!`),o.style.display="flex",document.getElementById("adDrawWinnerName").textContent=s.nama,spawnConfetti(document.getElementById("adDrawConfetti")),l.style.visibility="visible"}if(t.elapsed>=t.durationMs){SLOT_REEL_TIMING.forEach((p,f)=>{const k=document.getElementById("adDrawReel"+f);if(!k)return;const{html:S,targetIndex:B}=_buildSlotReelHtml(n,s,p.laps);k.innerHTML=S,k.style.transition="none",k.style.transform=`translateY(${-(B-1)*SLOT_CELL}px)`,k.closest(".slot-reel-window")?.classList.add("is-settled")});const d=document.getElementById("adDrawProgress");d&&(d.style.transition="none",d.style.width="100%"),u()}else r?.classList.add("is-spinning"),i&&(i.textContent=`\u25CF LIVE \u2014 mengocok ${n.length} peserta\u2026`),_startSlotProgress("adDraw",t.elapsed),runSlotMachineSpin("adDraw",n,s,t.elapsed,u,(d,p)=>{!i||d>=p||(i.textContent=d===p-1?"\u25CF LIVE \u2014 reel terakhir masih berputar\u2026 tahan napas!":`\u25CF LIVE \u2014 reel ${d}/${p} berhenti\u2026`)});document.getElementById("adDrawCancel")?.addEventListener("click",()=>{toast("Animasi diulang \u2014 pemenang tetap sesuai urutan yang sudah ditentukan"),startArisanDraw(a),refreshAdminContent()}),document.getElementById("adDrawConfirm")?.addEventListener("click",()=>{const d=new Date().toISOString().slice(0,10),p=a.members.find(k=>k.id===s.id);p.sudahMenang=!0,p.menangRound=a.currentRound+1,p.menangTgl=d,a.drawHistory.push({round:a.currentRound+1,tgl:d,winnerId:s.id,winnerNama:s.nama}),a.currentRound+=1,Array.isArray(a.winnerOrder)&&(a.winnerOrder=a.winnerOrder.filter(k=>k!==s.id)),arisanEligibleMembers(a).length===0&&(a.status="selesai"),a.liveDraw={active:!1},saveArisanList(),toast(`${s.nama} menang ronde ${p.menangRound}! Tersimpan ke riwayat.`),refreshAdminContent()})}function spawnConfetti(a){if(!a)return;const e=["#F0A93A","#3D7A5D","#B34632","#2C5A88","#D6488E"];let t="";for(let n=0;n<36;n++){const s=Math.random()*100,i=(Math.random()*.4).toFixed(2),r=(1.4+Math.random()*.9).toFixed(2),o=e[n%e.length],l=Math.floor(Math.random()*360);t+=`<span class="confetti-piece" style="left:${s}%;background:${o};animation-delay:${i}s;animation-duration:${r}s;--rot:${l}deg;"></span>`}a.innerHTML=t}function secDashboard(){const a=totals(DB.tx),e=DB.members.filter(o=>o.status==="active").length,t=[...DB.tx].sort((o,l)=>l.tgl.localeCompare(o.tgl)||(l.createdAt||0)-(o.createdAt||0)).slice(0,6),n=depositRanking().slice(0,5),i=[...new Set(DB.tx.map(o=>fmtMonthKey(o.tgl)))].sort().slice(-6).map(o=>{const l=DB.tx.filter(u=>fmtMonthKey(u.tgl)===o);return{k:o,...totals(l)}}),r=Math.max(...i.map(o=>Math.max(o.masuk,o.keluar)),1);return`
    <div class="admin-topline">
      <div><h2>Dashboard</h2><div class="sub">Ringkasan kondisi kas hari ini</div></div>
      <button class="btn btn-primary" id="quickAddBtn">${icon("plus")}<span>Tambah Transaksi</span></button>
    </div>
    ${pendingRequestCount()>0?`
    <div class="alert-banner" id="goPengajuanAlertBtn">
      ${icon("inbox")}
      <span><b>${pendingRequestCount()} pengajuan pembelian</b> menunggu persetujuan kamu.</span>
      <span class="alert-cta">Lihat &rarr;</span>
    </div>`:""}
    <div class="stat-grid">
      <div class="stat-card accent reveal"><div class="stat-card-top"><span class="stat-card-icon">${icon("sheet")}</span><div class="label">Saldo Kas</div></div><div class="value mono">${rupiah(a.saldo)}</div></div>
      <div class="stat-card tone-forest reveal"><div class="stat-card-top"><span class="stat-card-icon">${icon("up")}</span><div class="label">Total Masuk</div></div><div class="value mono">${rupiah(a.masuk)}</div></div>
      <div class="stat-card tone-rust reveal"><div class="stat-card-top"><span class="stat-card-icon">${icon("down")}</span><div class="label">Total Keluar</div></div><div class="value mono">${rupiah(a.keluar)}</div></div>
      <div class="stat-card tone-blue reveal"><div class="stat-card-top"><span class="stat-card-icon">${icon("users")}</span><div class="label">Anggota Aktif</div></div><div class="value mono">${e}/${DB.members.length}</div></div>
    </div>
    <div class="split">
      <div class="panel">
        <div class="panel-head"><h3>Arus Kas 6 Bulan Terakhir</h3><span class="hint"><span style="color:var(--forest);">\u25CF</span> Masuk &nbsp; <span style="color:var(--rust);">\u25CF</span> Keluar</span></div>
        <div class="mini-bar-wrap">
          ${i.map(o=>`
            <div style="flex:1;display:flex;gap:3px;align-items:flex-end;height:100%;">
              <div class="mini-bar" title="Masuk ${rupiah(o.masuk)}" style="height:${Math.max(2,o.masuk/r*100)}%;background:var(--forest);"></div>
              <div class="mini-bar" title="Keluar ${rupiah(o.keluar)}" style="height:${Math.max(2,o.keluar/r*100)}%;background:var(--rust);"></div>
            </div>
          `).join("")}
        </div>
        <div class="mini-bar-labels">${i.map(o=>`<span>${monthLabel(o.k)}</span>`).join("")}</div>
      </div>
      <div class="panel">
        <div class="panel-head"><h3>${icon("trophy")}Peringkat Setoran</h3><span class="hint"><a href="javascript:void(0)" id="goAnggotaBtn" style="color:var(--ink-soft);text-decoration:underline;">lihat semua</a></span></div>
        <div class="rank-list">
          ${n.map((o,l)=>{const u=memberById(o.id),d=u&&u.status==="off";return`
            <div class="rank-row ${d?"off-member":""} ${l<3?"podium podium-"+(l+1):""}" style="cursor:default;">
              <span class="rank-no ${l<3?"top"+(l+1):""}">${l+1}</span>
              ${avatarHtml(o.id)}
              <span class="rank-name"><span class="rank-name-text">${nameOf(o.id)}</span>${d?'<span class="off-tag">nonaktif</span>':""}</span>
              <div class="rank-figures">
                <span class="rank-amt">${rupiah(o.total)}</span>
                <span class="rank-pct">${o.pct.toFixed(1)}%</span>
              </div>
              ${rankBreakdownHtml(o,!0)}
            </div>
          `}).join("")||'<div class="empty-row">Belum ada data.</div>'}
        </div>
      </div>
    </div>
    <div class="panel" style="margin-top:14px;">
        <div class="panel-head"><h3>Aktivitas Terbaru</h3></div>
        ${excelTableHtml(t,!1)}
    </div>
  `}function secTransaksi(){return`
    <div class="admin-topline">
      <div><h2>Transaksi</h2><div class="sub">Kelola semua data kas masuk &amp; keluar</div></div>
      <button class="btn btn-primary" id="addTxBtn">${icon("plus")}<span>Tambah Transaksi</span></button>
    </div>
    ${excelPanelHtml(!0)}
  `}function secAnggota(){return`
    <div class="admin-topline">
      <div><h2>Anggota</h2><div class="sub">${DB.members.length} anggota terdaftar</div></div>
      <button class="btn btn-primary" id="addMemberBtn">${icon("plus")}<span>Tambah Anggota</span></button>
    </div>
    <div class="card-grid">
      ${DB.members.map((a,e)=>{const t=DB.tx.filter(s=>s.admin===a.id),n=totals(t);return`
        <div class="member-card" style="--m-color:${a.color};--i:${e};">
          <div class="member-head">
            ${avatarHtml(a.id)}
            <div class="member-head-text">
              <span class="mname">${a.nama}</span>
              <span class="mrole">Sejak ${fmtDate(a.sejak)}</span>
            </div>
          </div>
          <div class="mtotal mono">${rupiah(n.saldo)}</div>
          <div class="mlabel">sisa saldo kas pribadi</div>
          <div class="rank-breakdown compact" style="margin:6px 0 10px;">
            <div class="rb-chip rb-in"><span class="rb-chip-label">Setor</span><span class="rb-chip-val mono">${rupiah(n.masuk)}</span></div>
            <span class="rb-op">&minus;</span>
            <div class="rb-chip rb-out"><span class="rb-chip-label">Keluar</span><span class="rb-chip-val mono">${rupiah(n.keluar)}</span></div>
          </div>
          <span class="stamp ${a.status}">${a.status==="active"?"Aktif":"Nonaktif"}</span>
          <div class="member-actions">
            <button class="btn btn-sm" data-edit-member="${a.id}">${icon("edit")}Edit</button>
            <button class="btn btn-sm ${a.status==="active"?"btn-danger":""}" data-toggle-status="${a.id}">${a.status==="active"?"Nonaktifkan":"Aktifkan"}</button>
            <button class="btn btn-sm btn-danger" data-del-member="${a.id}" title="Hapus anggota">${icon("trash")}</button>
          </div>
        </div>`}).join("")}
    </div>
  `}function secHistori(){const a=DB.members.filter(e=>e.status==="off");return`
    <div class="admin-topline">
      <div><h2>Histori Anggota Nonaktif</h2><div class="sub">Data tetap tersimpan walau anggota sudah off</div></div>
    </div>
    ${a.length===0?'<div class="panel"><p style="color:var(--ink-soft);">Belum ada anggota yang dinonaktifkan.</p></div>':a.map(e=>{const t=DB.tx.filter(s=>s.admin===e.id).sort((s,i)=>i.tgl.localeCompare(s.tgl)||(i.createdAt||0)-(s.createdAt||0)),n=totals(t);return`
      <div class="panel" style="margin-bottom:16px;">
        <div class="panel-head">
          <h3><span class="avatar-mini" style="background:${avatarBg(colorOf(e.id))};width:26px;height:26px;line-height:26px;font-size:11px;">${initials(e.nama)}</span>${e.nama} <span class="stamp off" style="font-size:9px;">Nonaktif sejak ${e.offSejak?fmtDate(e.offSejak):"-"}</span></h3>
          <span class="hint mono">Total masuk ${rupiah(n.masuk)} \xB7 keluar ${rupiah(n.keluar)}</span>
        </div>
        ${e.catatan?`<p style="font-size:12.5px;color:var(--ink-soft);margin-bottom:12px;">${escapeHtml(e.catatan)}</p>`:""}
        ${excelTableHtml(t,!1)}
      </div>`}).join("")}
  `}function secLaporan(){return`
    <div class="admin-topline"><div><h2>Laporan Bulanan</h2><div class="sub">Rekap masuk/keluar per bulan</div></div></div>
    <div class="panel">
      <div style="overflow-x:auto;">
      <table class="ledger">
        <thead><tr><th>Bulan</th><th>Masuk</th><th>Keluar</th><th>Saldo Bulan</th></tr></thead>
        <tbody>${[...new Set(DB.tx.map(t=>fmtMonthKey(t.tgl)))].sort().map(t=>{const n=DB.tx.filter(s=>fmtMonthKey(s.tgl)===t);return{k:t,...totals(n)}}).map(t=>`
          <tr><td data-label="Bulan">${monthLabel(t.k)}</td>
          <td data-label="Masuk" class="mono">${rupiah(t.masuk)}</td>
          <td data-label="Keluar" class="mono">${rupiah(t.keluar)}</td>
          <td data-label="Saldo" class="mono" style="font-weight:700;">${rupiah(t.saldo)}</td></tr>
        `).join("")}</tbody>
      </table>
      </div>
    </div>
  `}function openModal(a){document.getElementById("modalBody").innerHTML=a,document.getElementById("modalOverlay").classList.add("open")}function closeModal(){document.getElementById("modalOverlay").classList.remove("open")}function txFormModal(a){const e=!!a,t=DB.members.map(i=>i.id),n=a&&a.bkb>0?"keluar":"masuk",s=a?a.bkb>0?a.bkb:a.btb:0;return`
    <div class="modal-head"><h3>${e?"Ubah":"Tambah"} Transaksi</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Tanggal</label><input type="date" id="txTgl" value="${a?.tgl||new Date().toISOString().slice(0,10)}"></div>
    <div class="form-row2">
      <div class="field"><label>Admin</label><select id="txAdmin">${t.map(i=>`<option value="${i}" ${a?.admin===i?"selected":""}>${nameOf(i)}</option>`).join("")}</select></div>
      <div class="field"><label>Shift</label><select id="txShift">${["Non Shift","Shift 1","Shift 2","Shift 3"].map(i=>`<option ${(a?.shift||"Non Shift")===i?"selected":""}>${i}</option>`).join("")}</select></div>
    </div>
    <div class="form-row2">
      <div class="field"><label>Jenis</label><select id="txJenis">
        <option value="masuk" ${n==="masuk"?"selected":""}>Kas Masuk</option>
        <option value="keluar" ${n==="keluar"?"selected":""}>Kas Keluar</option>
      </select></div>
      <div class="field"><label>Jumlah (Rp)</label><input type="number" id="txJumlah" value="${s||0}"></div>
    </div>
    <div class="field"><label>Keterangan</label><input type="text" id="txKet" placeholder="mis. Beli pulpen 4 box (kosongkan jika tidak ada)" value="${a?escapeHtml(a.ket):""}"></div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="txSave">${icon("plus")}<span>${e?"Simpan Perubahan":"Simpan Transaksi"}</span></button>
    </div>
  `}function memberFormModal(a){const e=!!a;return`
    <div class="modal-head"><h3>${e?"Ubah":"Tambah"} Anggota</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Nama</label><input type="text" id="mNama" value="${a?escapeHtml(a.nama):""}" placeholder="mis. Sinta"></div>
    <div class="field"><label>Warna Tab</label>
      <div class="color-picker" id="colorPicker">
        ${COLOR_CHOICES.map(t=>`<div class="color-swatch ${a?.color===t?"selected":""}" style="background:${t}" data-color="${t}"></div>`).join("")}
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="memberSave">${icon("plus")}<span>${e?"Simpan Perubahan":"Simpan Anggota"}</span></button>
    </div>
  `}function reqFormModal(a){const e=activeMembers(),t=new Set(a.admins);return`
    <div class="modal-head"><h3>Ubah Pengajuan Pembelian</h3><button class="icon-btn" id="modalClose">&times;</button></div>
    <div class="field"><label>Keterangan Barang/Jasa</label><textarea id="reqKet" rows="2">${escapeHtml(a.keterangan)}</textarea></div>
    <div class="form-row2">
      <div class="field"><label>Nominal (Rp)</label><input type="number" id="reqNominal" value="${a.nominal}"></div>
      <div class="field"><label>Tanggal</label><input type="date" id="reqTgl" value="${a.tgl}"></div>
    </div>
    <div class="field">
      <label>Sumber Dana</label>
      <div class="sheet-tabs" id="reqModeTabs" style="width:100%;">
        <button class="sheet-tab ${a.mode==="solo"?"active":""}" data-mode="solo" style="flex:1;">Solo (1 Admin)</button>
        <button class="sheet-tab ${a.mode==="patungan"?"active":""}" data-mode="patungan" style="flex:1;">Patungan</button>
      </div>
    </div>
    <div class="field" id="reqAdminWrap">
      ${a.mode==="solo"?`
        <label>Admin</label>
        <select id="reqSoloAdmin">${e.map(n=>`<option value="${n.id}" ${a.admins[0]===n.id?"selected":""}>${n.nama}</option>`).join("")}</select>
      `:`
        <label>Admin Patungan</label>
        <div class="check-list">
          ${e.map(n=>`
            <label class="check-row">
              <input type="checkbox" data-req-patungan="${n.id}" ${t.has(n.id)?"checked":""}>
              ${avatarHtml(n.id,"sm")}<span>${n.nama}</span>
            </label>
          `).join("")}
        </div>
      `}
    </div>
    <div class="field"><label>Nama Pemohon</label><input type="text" id="reqPemohon" value="${escapeHtml(a.pemohon||"")}"></div>
    <div class="modal-actions">
      <button class="btn" id="modalClose2">Batal</button>
      <button class="btn btn-primary" id="reqSave">${icon("plus")}<span>Simpan Perubahan</span></button>
    </div>
  `}function bindReqForm(a){document.getElementById("modalClose").addEventListener("click",closeModal),document.getElementById("modalClose2").addEventListener("click",closeModal);let e=a.mode,t=new Set(a.admins);function n(){const i=activeMembers(),r=document.getElementById("reqAdminWrap");e==="solo"?r.innerHTML=`
        <label>Admin</label>
        <select id="reqSoloAdmin">${i.map(o=>`<option value="${o.id}" ${a.admins[0]===o.id?"selected":""}>${o.nama}</option>`).join("")}</select>
      `:(r.innerHTML=`
        <label>Admin Patungan</label>
        <div class="check-list">
          ${i.map(o=>`
            <label class="check-row">
              <input type="checkbox" data-req-patungan="${o.id}" ${t.has(o.id)?"checked":""}>
              ${avatarHtml(o.id,"sm")}<span>${o.nama}</span>
            </label>
          `).join("")}
        </div>
      `,s())}function s(){document.querySelectorAll("[data-req-patungan]").forEach(i=>{i.addEventListener("change",()=>{i.checked?t.add(i.dataset.reqPatungan):t.delete(i.dataset.reqPatungan)})})}e==="patungan"&&s(),document.querySelectorAll("#reqModeTabs [data-mode]").forEach(i=>{i.addEventListener("click",()=>{e=i.dataset.mode,document.querySelectorAll("#reqModeTabs [data-mode]").forEach(r=>r.classList.toggle("active",r===i)),n()})}),document.getElementById("reqSave").addEventListener("click",()=>{const i=document.getElementById("reqKet").value.trim(),r=Number(document.getElementById("reqNominal").value)||0,o=document.getElementById("reqTgl").value,l=document.getElementById("reqPemohon").value.trim();if(!i){toast("Keterangan wajib diisi","err");return}if(r<=0){toast("Nominal harus lebih dari 0","err");return}let u=[];if(e==="solo"){const d=document.getElementById("reqSoloAdmin").value;if(!d){toast("Pilih admin","err");return}u=[d]}else if(u=[...t],u.length===0){toast("Pilih minimal 1 admin untuk patungan","err");return}a.keterangan=i,a.nominal=r,a.tgl=o||a.tgl,a.pemohon=l||"Tamu",a.mode=e,a.admins=u,saveRequests(DB.requests),toast("Pengajuan diperbarui"),closeModal(),refreshAdminContent()})}function refreshAdminContent(){if(document.getElementById("adminContent").innerHTML=adminContentHtml(),bindAdminContentEvents(),state.adminSection==="arisan"){startCountdownTicker("adCd");const a=activeArisanBatch();a&&bindArisanAdminLiveWidget(a)}}function bindAdmin(){document.getElementById("themeBtnA").addEventListener("click",()=>{toggleTheme(),render()}),document.getElementById("viewGuestBtn").addEventListener("click",()=>goto("/")),document.getElementById("themeBtnM")?.addEventListener("click",()=>{toggleTheme(),render()}),document.getElementById("mAdminExportExcel")?.addEventListener("click",()=>{exportExcel(getFilteredTxList(!0)),closeAdminMobileMenu()}),document.getElementById("mAdminExportPdf")?.addEventListener("click",()=>{exportPdf(getFilteredTxList(!0)),closeAdminMobileMenu()}),document.getElementById("viewGuestBtnM")?.addEventListener("click",()=>goto("/"));const a=async()=>{await FJHT.signOutAdmin(),toast("Berhasil keluar"),goto("/")};document.getElementById("logoutBtn").addEventListener("click",a),document.getElementById("logoutBtnM")?.addEventListener("click",a),document.getElementById("adminHamburgerBtn")?.addEventListener("click",e=>{e.stopPropagation(),document.getElementById("adminMobileMenuPanel")?.classList.toggle("open")}),document.querySelectorAll("[data-sec]").forEach(e=>{e.addEventListener("click",()=>{state.adminSection=e.dataset.sec,state.filterText="",state.filterAdmin="",state.filterMonth="",refreshAdminContent(),syncNavActive(),closeAdminMobileMenu()})}),document.getElementById("modalOverlay").addEventListener("click",e=>{e.target.id==="modalOverlay"&&closeModal()}),refreshAdminContent()}function closeAdminMobileMenu(){document.getElementById("adminMobileMenuPanel")?.classList.remove("open")}document.addEventListener("click",a=>{const e=document.getElementById("adminMobileMenuPanel");e&&e.classList.contains("open")&&!e.contains(a.target)&&!a.target.closest("#adminHamburgerBtn")&&closeAdminMobileMenu()});function syncNavActive(){document.querySelectorAll("[data-sec]").forEach(a=>a.classList.toggle("active",a.dataset.sec===state.adminSection))}function bindAdminContentEvents(){document.getElementById("quickAddBtn")?.addEventListener("click",()=>{openModal(txFormModal(null)),bindTxForm(null)}),document.getElementById("goPengajuanAlertBtn")?.addEventListener("click",()=>{state.adminSection="pengajuan",refreshAdminContent(),syncNavActive()}),document.getElementById("goAnggotaBtn")?.addEventListener("click",()=>{state.adminSection="anggota",refreshAdminContent(),syncNavActive()}),document.getElementById("addTxBtn")?.addEventListener("click",()=>{openModal(txFormModal(null)),bindTxForm(null)}),document.getElementById("addMemberBtn")?.addEventListener("click",()=>{openModal(memberFormModal(null)),bindMemberForm(null)}),document.querySelectorAll("[data-acc]").forEach(a=>{a.addEventListener("click",()=>{confirm("Setujui pengajuan ini? Nominal akan otomatis tercatat sebagai kas keluar.")&&(approveRequest(a.dataset.acc),refreshAdminContent())})}),document.querySelectorAll("[data-tolak]").forEach(a=>{a.addEventListener("click",()=>{rejectRequest(a.dataset.tolak),refreshAdminContent()})}),document.getElementById("arisanNewBatchBtn")?.addEventListener("click",()=>{openModal(arisanBatchFormModal()),bindArisanBatchForm()}),document.getElementById("arisanRegToggle")?.addEventListener("click",()=>{const a=activeArisanBatch();if(a){if(arisanLiveDrawInfo(a)){toast("Tidak bisa mengubah status pendaftaran saat kocokan sedang live","err");return}if(a.status==="pendaftaran"){const e=arisanApprovedMembers(a).filter(t=>!t.sudahMenang);if(!e.length){toast("Belum ada anggota yang di-ACC","err");return}if(!confirm("Tutup pendaftaran & mulai arisan? Anggota yang masih menunggu ACC akan otomatis ditolak. Selanjutnya kamu akan diminta menentukan siapa dapat arisan di bulan apa."))return;openModal(arisanWinnerOrderModal(e,a.tglMulai,{mode:"start"})),bindArisanWinnerOrderForm(e,t=>{a.members.forEach(n=>{n.status==="pending"&&(n.status="rejected")}),a.status="berjalan",a.winnerOrder=t,saveArisanList(),closeModal(),toast("Arisan dimulai! Urutan pemenang tiap bulan sudah tersimpan."),refreshAdminContent()})}else{const e=a.currentRound>0?" Kocokan sudah pernah berjalan \u2014 pendaftar baru tetap ikut mulai ronde berikutnya, dan kamu akan diminta atur ulang urutan pemenang saat pendaftaran ditutup lagi.":"";confirm("Buka kembali pendaftaran untuk batch ini?"+e)&&(a.status="pendaftaran",saveArisanList(),toast("Pendaftaran dibuka kembali. Anggota baru bisa mendaftar lagi."),refreshAdminContent())}}}),document.getElementById("arisanEditFeeBtn")?.addEventListener("click",()=>{const a=activeArisanBatch();a&&(openModal(arisanEditFeeModal(a)),bindArisanEditFeeForm(a))}),document.getElementById("arisanEditOrderBtn")?.addEventListener("click",()=>{const a=activeArisanBatch();if(!a)return;const e=arisanEligibleMembers(a);e.length&&(openModal(arisanWinnerOrderModal(e,arisanNextDrawDate(a),{mode:"edit",roundOffset:a.currentRound})),bindArisanWinnerOrderForm(e,t=>{a.winnerOrder=t,saveArisanList(),closeModal(),toast("Urutan pemenang berhasil diperbarui."),refreshAdminContent()}))}),document.getElementById("arisanDrawBtn")?.addEventListener("click",()=>{const a=activeArisanBatch();a&&(startArisanDraw(a),refreshAdminContent())}),document.getElementById("arisanDeleteBatchBtn")?.addEventListener("click",()=>{const a=activeArisanBatch();a&&confirm(`Hapus batch "${a.nama}"? Semua data pendaftar & riwayat kocokan batch ini ikut terhapus.`)&&(DB.arisan=DB.arisan.filter(e=>e.id!==a.id),saveArisanList(),toast("Batch arisan dihapus"),refreshAdminContent())}),document.querySelectorAll("[data-arisan-acc]").forEach(a=>{a.addEventListener("click",()=>{const[e,t]=a.dataset.arisanAcc.split("|"),s=DB.arisan.find(i=>i.id===e)?.members.find(i=>i.id===t);s&&(s.status="approved",saveArisanList(),toast(`${s.nama} disetujui ikut arisan`),refreshAdminContent())})}),document.querySelectorAll("[data-arisan-tolak]").forEach(a=>{a.addEventListener("click",()=>{const[e,t]=a.dataset.arisanTolak.split("|"),s=DB.arisan.find(i=>i.id===e)?.members.find(i=>i.id===t);s&&(s.status="rejected",saveArisanList(),toast(`Pendaftaran ${s.nama} ditolak`),refreshAdminContent())})}),document.querySelectorAll("[data-arisan-remove]").forEach(a=>{a.addEventListener("click",()=>{const[e,t]=a.dataset.arisanRemove.split("|"),n=DB.arisan.find(i=>i.id===e);if(!n)return;const s=n.members.find(i=>i.id===t);s&&confirm(`Keluarkan ${s.nama} dari arisan ini?`)&&(n.members=n.members.filter(i=>i.id!==t),saveArisanList(),toast(`${s.nama} dikeluarkan dari arisan`),refreshAdminContent())})}),document.querySelectorAll("[data-del-arisan-batch]").forEach(a=>{a.addEventListener("click",()=>{confirm("Hapus riwayat batch arisan ini secara permanen?")&&(DB.arisan=DB.arisan.filter(e=>e.id!==a.dataset.delArisanBatch),saveArisanList(),toast("Riwayat batch dihapus"),refreshAdminContent())})}),document.getElementById("aText")?.addEventListener("input",a=>{state.filterText=a.target.value,refreshAdminContent()}),document.getElementById("aAdmin")?.addEventListener("change",a=>{state.filterAdmin=a.target.value,refreshAdminContent()}),document.getElementById("aMonth")?.addEventListener("change",a=>{state.filterMonth=a.target.value,refreshAdminContent()}),document.querySelectorAll("#aTypeFilter .sheet-tab").forEach(a=>{a.addEventListener("click",()=>{state.adminTxFilter=a.dataset.type,refreshAdminContent()})}),document.querySelectorAll("#aRowsFilter [data-rows]").forEach(a=>{a.addEventListener("click",()=>{state.viewRows=a.dataset.rows==="all"?"all":Number(a.dataset.rows),refreshAdminContent()})}),document.getElementById("aExportExcel")?.addEventListener("click",()=>exportExcel(getFilteredTxList(!0))),document.getElementById("aExportPdf")?.addEventListener("click",()=>exportPdf(getFilteredTxList(!0))),scrollExcelTablesToLatest(),document.querySelectorAll("[data-edit]").forEach(a=>{a.addEventListener("click",()=>{const e=DB.tx.find(t=>t.id===a.dataset.edit);openModal(txFormModal(e)),bindTxForm(e)})}),document.querySelectorAll("[data-del]").forEach(a=>{a.addEventListener("click",()=>{confirm("Hapus transaksi ini?")&&(DB.tx=DB.tx.filter(e=>e.id!==a.dataset.del),saveTx(DB.tx),toast("Transaksi dihapus"),refreshAdminContent())})}),document.querySelectorAll("[data-edit-member]").forEach(a=>{a.addEventListener("click",()=>{const e=memberById(a.dataset.editMember);openModal(memberFormModal(e)),bindMemberForm(e)})}),document.querySelectorAll("[data-toggle-status]").forEach(a=>{a.addEventListener("click",()=>{const e=memberById(a.dataset.toggleStatus);e.status==="active"?confirm(`Nonaktifkan ${e.nama}? Histori transaksi tetap tersimpan.`)&&(e.status="off",e.offSejak=new Date().toISOString().slice(0,10),saveMembers(DB.members),toast(`${e.nama} dinonaktifkan`),refreshAdminContent()):(e.status="active",delete e.offSejak,saveMembers(DB.members),toast(`${e.nama} diaktifkan kembali`),refreshAdminContent())})}),document.querySelectorAll("[data-del-member]").forEach(a=>{a.addEventListener("click",()=>{const e=memberById(a.dataset.delMember);if(!e)return;const n=DB.tx.some(s=>s.admin===e.id)?`${e.nama} masih punya histori transaksi. Menghapus anggota ini TIDAK menghapus histori transaksinya, tapi namanya tidak akan bisa dipilih lagi untuk transaksi baru. Lanjutkan hapus?`:`Hapus anggota ${e.nama}? Tindakan ini tidak bisa dibatalkan.`;confirm(n)&&(DB.members=DB.members.filter(s=>s.id!==e.id),saveMembers(DB.members),toast(`${e.nama} dihapus dari daftar anggota`),refreshAdminContent())})}),document.querySelectorAll("[data-edit-req]").forEach(a=>{a.addEventListener("click",()=>{const e=DB.requests.find(t=>t.id===a.dataset.editReq);e&&(openModal(reqFormModal(e)),bindReqForm(e))})}),document.querySelectorAll("[data-del-req]").forEach(a=>{a.addEventListener("click",()=>{confirm("Hapus pengajuan ini? Tindakan ini tidak bisa dibatalkan.")&&(DB.requests=DB.requests.filter(e=>e.id!==a.dataset.delReq),saveRequests(DB.requests),toast("Pengajuan dihapus"),refreshAdminContent())})})}function bindTxForm(a){const e=()=>closeModal();document.getElementById("modalClose").addEventListener("click",e),document.getElementById("modalClose2").addEventListener("click",e),document.getElementById("txSave").addEventListener("click",()=>{const t=document.getElementById("txTgl").value,n=document.getElementById("txAdmin").value,s=document.getElementById("txShift").value,i=document.getElementById("txJenis").value,r=Number(document.getElementById("txJumlah").value)||0,o=document.getElementById("txKet").value.trim();if(!t){toast("Tanggal wajib diisi","err");return}if(r<=0){toast("Jumlah harus lebih dari 0","err");return}const l=i==="masuk"?r:0,u=i==="keluar"?r:0,d=i==="keluar"?"pinjaman":"kas";a?(Object.assign(a,{tgl:t,admin:n,shift:s,btb:l,bkb:u,ket:o,kat:d}),toast("Transaksi diperbarui")):(DB.tx.push({id:uid("tx"),tgl:t,admin:n,shift:s,btb:l,bkb:u,ket:o,kat:d,createdAt:Date.now()}),toast("Transaksi ditambahkan")),saveTx(DB.tx),closeModal(),refreshAdminContent()})}function bindMemberForm(a){let e=a?.color||COLOR_CHOICES[0];const t=()=>closeModal();document.getElementById("modalClose").addEventListener("click",t),document.getElementById("modalClose2").addEventListener("click",t),document.querySelectorAll("#colorPicker .color-swatch").forEach(n=>{n.addEventListener("click",()=>{e=n.dataset.color,document.querySelectorAll("#colorPicker .color-swatch").forEach(s=>s.classList.remove("selected")),n.classList.add("selected")})}),document.getElementById("memberSave").addEventListener("click",()=>{const n=document.getElementById("mNama").value.trim();if(!n){toast("Nama wajib diisi","err");return}if(a)a.nama=n,a.color=e,toast("Anggota diperbarui");else{const s=n.toUpperCase().replace(/\s+/g,"_");if(DB.members.some(i=>i.id===s)){toast("Anggota dengan nama itu sudah ada","err");return}DB.members.push({id:s,nama:n,color:e,status:"active",sejak:new Date().toISOString().slice(0,10)}),toast("Anggota ditambahkan")}saveMembers(DB.members),closeModal(),refreshAdminContent()})}const GAME_COLORS=["#B34632","#2C5A88","#3D7A5D","#F0A93A"];function showGameOverlay(){document.getElementById("gameModalOverlay")?.classList.add("open")}function closeGameModal(){document.getElementById("gameModalOverlay")?.classList.remove("open")}function bindGameClose(){document.getElementById("gameCloseBtn")?.addEventListener("click",closeGameModal)}document.getElementById("gameModalOverlay")?.addEventListener("click",a=>{a.target.id==="gameModalOverlay"&&closeGameModal()}),document.addEventListener("keydown",a=>{a.key==="Escape"&&closeGameModal()});function openGameCenter(a){a==="catur"?openChess():a==="ular"?openLadder():a==="monopoli"&&openMonopoly()}const DICE_PATTERNS={1:[4],2:[0,8],3:[0,4,8],4:[0,2,6,8],5:[0,2,4,6,8],6:[0,2,3,5,6,8]};function diceDots(a){const e=new Set(DICE_PATTERNS[a]||[4]);let t="";for(let n=0;n<9;n++)t+=`<i class="${e.has(n)?"on":""}"></i>`;return t}function playerSetupRowHtml(a){return`<div class="player-setup-row"><span class="player-dot" style="background:${GAME_COLORS[a]}"></span><input type="text" placeholder="Nama pemain ${a+1}" maxlength="14"></div>`}function renderPlayerSetup({title:a,emoji:e,sub:t,onStart:n}){document.getElementById("gameModalBody").innerHTML=`
    <div class="game-head"><h3>${e} ${a}</h3><button class="icon-btn" id="gameCloseBtn">${icon("close")}</button></div>
    <div class="game-sub">${t}</div>
    <div id="playerSetupRows">${[0,1].map(i=>playerSetupRowHtml(i)).join("")}</div>
    <button class="btn btn-sm" id="addPlayerBtn" style="margin-bottom:14px;">${icon("plus")}<span>Tambah Pemain</span></button>
    <button class="btn btn-primary" id="startGameBtn" style="width:100%;justify-content:center;">${icon("check")}<span>Mulai Main</span></button>
  `,bindGameClose();const s=()=>document.getElementById("playerSetupRows");document.getElementById("addPlayerBtn").addEventListener("click",()=>{s().children.length>=4||(s().insertAdjacentHTML("beforeend",playerSetupRowHtml(s().children.length)),s().children.length>=4&&document.getElementById("addPlayerBtn").classList.add("hidden"))}),document.getElementById("startGameBtn").addEventListener("click",()=>{const i=[...s().querySelectorAll("input")].map((r,o)=>r.value.trim()||`Pemain ${o+1}`);n(i.map((r,o)=>({name:r,color:GAME_COLORS[o]})))})}let chessBoard=null,chessSel=null,chessTurn="w";const CHESS_UNICODE={w:{K:"\u2654",Q:"\u2655",R:"\u2656",B:"\u2657",N:"\u2658",P:"\u2659"},b:{K:"\u265A",Q:"\u265B",R:"\u265C",B:"\u265D",N:"\u265E",P:"\u265F"}};function initChessBoard(){const a=["R","N","B","Q","K","B","N","R"],e=Array.from({length:8},()=>Array(8).fill(null));for(let t=0;t<8;t++)e[0][t]={t:a[t],color:"b"},e[1][t]={t:"P",color:"b"},e[6][t]={t:"P",color:"w"},e[7][t]={t:a[t],color:"w"};return e}function openChess(){chessBoard=initChessBoard(),chessSel=null,chessTurn="w",showGameOverlay(),renderChessModal()}function renderChessModal(){document.getElementById("gameModalBody").innerHTML=`
    <div class="game-head"><h3>${icon("chess")}Catur</h3><button class="icon-btn" id="gameCloseBtn">${icon("close")}</button></div>
    <div class="game-sub">Mode bebas \u2014 pilih bidak lalu ketuk kotak tujuan. Cocok untuk main santai berdua di satu perangkat.</div>
    <div class="game-toolbar">
      <span class="game-turn-badge"><span class="game-turn-dot" style="background:${chessTurn==="w"?"#f4f4f4":"#222"};border:1px solid var(--border);"></span>Giliran: ${chessTurn==="w"?"Putih":"Hitam"}</span>
      <button class="btn btn-sm" id="chessResetBtn">${icon("history")}<span>Ulang</span></button>
    </div>
    <div class="chess-board" id="chessBoardEl"></div>
  `,bindGameClose();const a=document.getElementById("chessBoardEl");a.innerHTML=chessBoard.map((e,t)=>e.map((n,s)=>{const i=(t+s)%2===0,r=chessSel&&chessSel.r===t&&chessSel.c===s,o=n?CHESS_UNICODE[n.color][n.t]:"";return`<div class="chess-cell ${i?"light":"dark"} ${r?"sel":""}" data-r="${t}" data-c="${s}">${o}</div>`}).join("")).join(""),a.querySelectorAll(".chess-cell").forEach(e=>{e.addEventListener("click",()=>{const t=+e.dataset.r,n=+e.dataset.c,s=chessBoard[t][n];if(chessSel){const i=chessBoard[chessSel.r][chessSel.c];i&&!(chessSel.r===t&&chessSel.c===n)&&(chessBoard[t][n]=i,chessBoard[chessSel.r][chessSel.c]=null,chessTurn=chessTurn==="w"?"b":"w"),chessSel=null}else s&&(chessSel={r:t,c:n});renderChessModal()})}),document.getElementById("chessResetBtn").addEventListener("click",openChess)}let ladderPlayers=null,ladderTurnIdx=0,ladderWinner=null,ladderLastRoll=1;const LADDER_LADDERS={4:14,9:31,20:38,28:84,40:59,51:67,63:81,71:91},LADDER_SNAKES={17:7,54:34,62:19,64:60,87:24,93:73,95:75,99:78};function openLadder(){showGameOverlay(),renderPlayerSetup({title:"Ular Tangga",emoji:"\u{1F40D}",sub:"Atur nama pemain (2\u20134 orang), lalu lempar dadu bergantian sampai ada yang tiba di kotak 100.",onStart:a=>{ladderPlayers=a.map(e=>({...e,pos:1})),ladderTurnIdx=0,ladderWinner=null,ladderLastRoll=1,renderLadderBoard()}})}function ladderCellNumber(a,e){const t=10-a;return t%2===1?(t-1)*10+e+1:(t-1)*10+(10-e)}function renderLadderBoard(){let a="";for(let t=0;t<10;t++)for(let n=0;n<10;n++){const s=ladderCellNumber(t,n);let i="",r="";LADDER_LADDERS[s]&&(i="ladder",r=`\u2191${LADDER_LADDERS[s]}`),LADDER_SNAKES[s]&&(i="snake",r=`\u2193${LADDER_SNAKES[s]}`);const o=ladderPlayers.filter(l=>l.pos===s).map(l=>`<span class="game-token" style="background:${l.color}"></span>`).join("");a+=`<div class="ladder-cell ${i}"><span>${s}</span>${r?`<span class="lc-tag">${r}</span>`:""}<span class="ladder-tokens">${o}</span></div>`}const e=ladderPlayers[ladderTurnIdx];document.getElementById("gameModalBody").innerHTML=`
    <div class="game-head"><h3>${icon("ladder")}Ular Tangga</h3><button class="icon-btn" id="gameCloseBtn">${icon("close")}</button></div>
    <div class="game-toolbar">
      ${ladderWinner?`<span class="game-turn-badge"><span class="game-turn-dot" style="background:${ladderWinner.color}"></span>${ladderWinner.name} menang!</span>`:`<span class="game-turn-badge"><span class="game-turn-dot" style="background:${e.color}"></span>Giliran: ${e.name}</span>`}
      <button class="btn btn-sm" id="ladderResetBtn">${icon("history")}<span>Main Ulang</span></button>
    </div>
    <div class="ladder-board" id="ladderBoardEl">${a}</div>
    <div style="display:flex;align-items:center;gap:14px;margin-top:14px;">
      <div class="dice-face" id="ladderDiceFace">${diceDots(ladderLastRoll)}</div>
      <button class="btn btn-primary" id="ladderRollBtn" ${ladderWinner?"disabled":""} style="flex:1;justify-content:center;">${icon("dice")}<span>Lempar Dadu</span></button>
    </div>
    <div class="game-legend">
      <span>${icon("ladder")}Tangga = naik</span>
      <span>Ular = turun</span>
    </div>
  `,bindGameClose(),document.getElementById("ladderResetBtn").addEventListener("click",openLadder),document.getElementById("ladderRollBtn")?.addEventListener("click",rollLadderDice)}function rollLadderDice(){const a=document.getElementById("ladderRollBtn"),e=document.getElementById("ladderDiceFace");a.disabled=!0,e.classList.add("rolling");let t=0;const n=setInterval(()=>{if(e.innerHTML=diceDots(1+Math.floor(Math.random()*6)),t++,t>6){clearInterval(n);const s=1+Math.floor(Math.random()*6);ladderLastRoll=s,applyLadderMove(s)}},90)}function applyLadderMove(a){const e=ladderPlayers[ladderTurnIdx];let t=e.pos+a;t>100?t=e.pos:LADDER_LADDERS[t]?t=LADDER_LADDERS[t]:LADDER_SNAKES[t]&&(t=LADDER_SNAKES[t]),e.pos=t,e.pos>=100?(e.pos=100,ladderWinner=e):ladderTurnIdx=(ladderTurnIdx+1)%ladderPlayers.length,renderLadderBoard()}let monoPlayers=null,monoTurnIdx=0,monoLastRoll=1,monoLanded=null;const MONO_NAMES=["MULAI","Jl. Melati","Kotak Dana Umum","Jl. Mawar","Pajak Penghasilan","Stasiun Gambir","Jl. Kenanga","PARKIR BEBAS","Jl. Anggrek","Kesempatan","Jl. Tulip","Jl. Kamboja","Stasiun Senen","Jl. Cempaka","MASUK PENJARA","Jl. Dahlia","Kotak Dana Umum","Jl. Flamboyan","Jl. Teratai","Stasiun Kota","Jl. Sakura","PENJARA / KUNJUNGAN","Jl. Lily","Kesempatan","Jl. Bougenville","Pajak Mewah","Jl. Aster","Jl. Edelweiss"];function openMonopoly(){showGameOverlay(),renderPlayerSetup({title:"Monopoly",emoji:"\u{1F3B2}",sub:"Versi ringkas: jalan keliling papan, lempar dadu bergantian, lihat properti yang disinggahi.",onStart:a=>{monoPlayers=a.map(e=>({...e,pos:0})),monoTurnIdx=0,monoLastRoll=1,monoLanded=null,renderMonoBoard()}})}function monoCellPos(a){return a<=7?{row:8,col:a+1}:a<=14?{row:8-(a-7),col:8}:a<=21?{row:1,col:8-(a-14)}:{row:a-22+2,col:1}}function renderMonoBoard(){let a="";for(let t=0;t<28;t++){const{row:n,col:s}=monoCellPos(t),i=[0,7,14,21].includes(t),r=monoPlayers.filter(o=>o.pos===t).map(o=>`<span class="game-token" style="background:${o.color}"></span>`).join("");a+=`<div class="mono-cell ${i?"corner":""}" style="grid-row:${n};grid-column:${s};"><span>${MONO_NAMES[t]}</span><span class="ladder-tokens" style="position:absolute;bottom:1px;left:1px;">${r}</span></div>`}const e=monoPlayers[monoTurnIdx];document.getElementById("gameModalBody").innerHTML=`
    <div class="game-head"><h3>${icon("dice")}Monopoly</h3><button class="icon-btn" id="gameCloseBtn">${icon("close")}</button></div>
    <div class="game-toolbar">
      <span class="game-turn-badge"><span class="game-turn-dot" style="background:${e.color}"></span>Giliran: ${e.name}</span>
      <button class="btn btn-sm" id="monoResetBtn">${icon("history")}<span>Main Ulang</span></button>
    </div>
    <div class="mono-board" id="monoBoardEl">
      ${a}
      <div class="mono-center">
        <b>MONOPOLY</b>
        <div class="dice-face" id="monoDiceFace">${diceDots(monoLastRoll)}</div>
        <button class="btn btn-primary btn-sm" id="monoRollBtn">${icon("dice")}<span>Lempar Dadu</span></button>
        ${monoLanded?`<div style="font-size:11.5px;text-align:center;color:var(--ink-soft);max-width:150px;">${monoLanded}</div>`:""}
      </div>
    </div>
  `,bindGameClose(),document.getElementById("monoResetBtn").addEventListener("click",openMonopoly),document.getElementById("monoRollBtn").addEventListener("click",rollMonoDice)}function rollMonoDice(){const a=document.getElementById("monoRollBtn"),e=document.getElementById("monoDiceFace");a.disabled=!0,e.classList.add("rolling");let t=0;const n=setInterval(()=>{if(e.innerHTML=diceDots(1+Math.floor(Math.random()*6)),t++,t>6){clearInterval(n);const s=1+Math.floor(Math.random()*6);monoLastRoll=s;const i=monoPlayers[monoTurnIdx];i.pos=(i.pos+s)%28,monoLanded=`${i.name} mendarat di "${MONO_NAMES[i.pos]}"`,monoTurnIdx=(monoTurnIdx+1)%monoPlayers.length,renderMonoBoard()}},90)}const BOOT_PHRASES=["Semar membuka mata\u2026","Menghitung setiap koin\u2026","Tidak ada rupiah yang luput\u2026","Buku kas siap dibuka."];function runBootLoader(){const a=document.getElementById("bootLoader");if(!a)return;const e=4e3,t=document.getElementById("bootProgressFill"),n=document.getElementById("bootPercent"),s=document.getElementById("bootPhrase"),i=performance.now();let r=0,o=!1;function l(f){s&&(s.style.animation="none",s.offsetWidth,s.style.animation="",s.textContent=BOOT_PHRASES[f%BOOT_PHRASES.length])}l(0);const u=setInterval(()=>{r++,l(r)},1e3);function d(){o||(o=!0,clearInterval(u),t&&(t.style.width="100%"),n&&(n.textContent="100%"),a.classList.add("hide"),setTimeout(()=>{a.remove()},500))}a.addEventListener("click",function(f){for(var k=f.target;k&&k!==a;){if(k.tagName==="A")return;k=k.parentNode}d()}),a.title="Klik untuk lewati",a.style.cursor="pointer";function p(f){if(o)return;const k=f-i,S=Math.min(100,Math.round(k/e*100));t&&(t.style.width=S+"%"),n&&(n.textContent=S+"%"),k<e?requestAnimationFrame(p):d()}requestAnimationFrame(p)}applyTheme(),render(),runBootLoader(),bootFromFirebase();let _resizeTimer=null,_lastWidth=window.innerWidth;window.addEventListener("resize",()=>{clearTimeout(_resizeTimer),_resizeTimer=setTimeout(()=>{const a=window.innerWidth;if(a===_lastWidth)return;_lastWidth=a;const e=document.activeElement;e&&["INPUT","TEXTAREA","SELECT"].includes(e.tagName)||render()},200)}),(function(){"use strict";var a="http://www.w3.org/2000/svg",e=[["#/","Home","M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"],["#/pengajuan","Ajukan","M12 5v14M5 12h14"],["#/riwayat","Riwayat","M4 13l2-8h12l2 8M4 13v6h16v-6M4 13h5l1 2h4l1-2h5"],["#/aset","Aset","M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zM12 12l8-4.5M12 12v9M12 12L4 7.5"]],t=[["dashboard","Beranda","M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"],["transaksi","Transaksi","M5 4h14v16H5zM5 9h14M10 9v11"],["pengajuan","Pengajuan","M3 12h4.5l1.5 3h6l1.5-3H21M5.5 5h13l2.5 7v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z"],["anggota","Anggota","M9 11a3.2 3.2 0 100-6.4A3.2 3.2 0 009 11zM2.8 19c.7-3 3-5 6.2-5s5.5 2 6.2 5M17 8.5a2.6 2.6 0 010 5M19.8 19c-.4-2-1.4-3.4-3-4.3"],["__menu","Menu","M4 7h16M4 12h16M4 17h16"]];function n(b){return'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="'+b+'"/></svg>'}function s(b,v){var g=document.createElement("nav");return g.className="tp-dock "+b,g.setAttribute("aria-label",v),g.hidden=!0,g}var i=s("tp-dock-guest","Navigasi cepat"),r=s("tp-dock-admin","Navigasi admin");(function(){var v="",g;for(g=0;g<e.length;g++)v+='<a href="'+e[g][0]+'" data-r="'+e[g][0].replace("#","")+'">'+n(e[g][2])+"<span>"+e[g][1]+"</span></a>";for(i.innerHTML=v,v="",g=0;g<t.length;g++)v+='<button type="button" data-s="'+t[g][0]+'">'+n(t[g][2])+"<span>"+t[g][1]+"</span></button>";r.innerHTML=v})();function o(b){return document.querySelector(b)}function l(b,v){for(var g=0;g<b.length;g++)v(b[g],g)}function u(b,v){var g=(" "+b.className+" ").replace(/\son\s/g," ").replace(/^\s+|\s+$/g,"");b.className=v?g?g+" on":"on":g,v?b.setAttribute("aria-current","page"):b.removeAttribute("aria-current")}r.addEventListener("click",function(b){for(var v=b.target;v&&v!==r&&v.tagName!=="BUTTON";)v=v.parentNode;if(!(!v||v===r)){var g=v.getAttribute("data-s"),A;g==="__menu"?A=o("#adminHamburgerBtn"):A=o('.sidebar .nav-item[data-sec="'+g+'"]'),A&&A.click()}},!1);function d(){var b=o('.sidebar .nav-item[data-sec="pengajuan"] .mm-badge'),v=r.querySelector('[data-s="pengajuan"]');if(v){var g=v.querySelector(".tp-dot"),A=b?(b.textContent||"").replace(/\s/g,""):"";A?(g||(g=document.createElement("span"),g.className="tp-dot",v.appendChild(g)),g.textContent=A):g&&v.removeChild(g)}}function p(){var b=!!o(".admin-shell"),v=(location.hash||"#/").replace("#","")||"/",g=!b&&v!=="/login";if(i.hidden=!g,r.hidden=!b,g&&l(i.getElementsByTagName("a"),function(M){u(M,M.getAttribute("data-r")===v)}),b){var A=o(".sidebar .nav-item.active[data-sec]"),P=A?A.getAttribute("data-sec"):"dashboard";l(r.getElementsByTagName("button"),function(M){u(M,M.getAttribute("data-s")===P)}),d()}var K=!!document.querySelector(".mobile-menu-panel.open"),R=document.body.className.replace(/\s*tp-menu-open/,""),j=K?R+" tp-menu-open":R;j!==document.body.className&&(document.body.className=j)}var f=document.createElement("div"),k=!1,S=window.requestAnimationFrame||function(b){return setTimeout(b,16)};f.className="tp-progress",f.setAttribute("aria-hidden","true");function B(){k=!1;var b=document.documentElement,v=b.scrollHeight-b.clientHeight,g=v>0?(window.pageYOffset||b.scrollTop)/v:0,A="scaleX("+(g>1?1:g<0?0:g)+")";f.style.webkitTransform=A,f.style.transform=A}function T(){k||(k=!0,S(B))}var w=!1;function E(){w||(w=!0,S(function(){w=!1,p()}))}function C(){if(document.body.appendChild(i),document.body.appendChild(r),document.body.appendChild(f),p(),B(),window.addEventListener("hashchange",E,!1),window.addEventListener("scroll",T,!1),window.addEventListener("resize",T,!1),window.MutationObserver){var b=document.getElementById("app"),v=new MutationObserver(E);b&&v.observe(b,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}),v.observe(document.body,{attributes:!0,attributeFilter:["class"]})}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",C,!1):C()})(),(function(a,e,t){"use strict";function n(){return a.PWA_CFG||{}}var s=e.documentElement,i=a.__bip||null,r=!!a.__pwaInstalled;a.__bip=null;var o=null,l=!!(t.serviceWorker&&t.serviceWorker.controller),u=!1,d=null,p=!1,f=0,k=location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1";function S(){}function B(m,h){try{var $;typeof a.CustomEvent=="function"?$=new a.CustomEvent(m,{detail:h}):($=e.createEvent("CustomEvent"),$.initCustomEvent(m,!1,!1,h)),a.dispatchEvent($)}catch{}}function T(m,h){try{if(h===void 0)return sessionStorage.getItem(m);sessionStorage.setItem(m,h)}catch{}return null}function w(){try{return a.matchMedia&&(a.matchMedia("(display-mode: standalone)").matches||a.matchMedia("(display-mode: minimal-ui)").matches||a.matchMedia("(display-mode: window-controls-overlay)").matches)||t.standalone===!0}catch{return!1}}var E=null,C=null;function b(){if(!e.getElementById("pwCoreCss")){var m=e.createElement("style");m.id="pwCoreCss";var h=n().accent||"#2f7dff";m.textContent=".pw-toast,.pw-upd{position:fixed;left:50%;bottom:calc(18px + env(safe-area-inset-bottom,0px));z-index:2147483000;max-width:calc(100vw - 24px);display:flex;align-items:center;gap:12px;padding:10px 16px;border-radius:14px;font:600 13px/1.35 'Segoe UI',Arial,sans-serif;color:#eef3ff;background:#101a2e;border:1px solid rgba(255,255,255,.16);box-shadow:0 8px 24px rgba(0,0,0,.45);-webkit-transform:translate(-50%,16px);transform:translate(-50%,16px);opacity:0;pointer-events:none;transition:opacity .25s,transform .25s}.pw-toast.show,.pw-upd.show{opacity:1;-webkit-transform:translate(-50%,0);transform:translate(-50%,0);pointer-events:auto}.pw-upd small{display:block;font-weight:500;opacity:.75;font-size:12px}.pw-upd button{border:0;border-radius:9px;padding:7px 14px;font:700 12.5px 'Segoe UI',Arial,sans-serif;cursor:pointer;background:"+h+";color:#04101f}.pw-spin{width:14px;height:14px;border-radius:50%;border:2px solid rgba(255,255,255,.25);border-top-color:"+h+";animation:pwspin .8s linear infinite;flex:none}@keyframes pwspin{to{transform:rotate(360deg)}}",e.head.appendChild(m)}}function v(m,h,$){try{if(typeof n().toast=="function"){n().toast(m,h||"info",$||3400);return}}catch{}e.body&&(b(),E||(E=e.createElement("div"),E.className="pw-toast",E.setAttribute("role","status"),e.body.appendChild(E)),E.textContent=m,E.className="pw-toast",E.offsetWidth,E.className="pw-toast show",clearTimeout(C),C=setTimeout(function(){E.className="pw-toast"},$||3400))}function g(m){m&&m.preventDefault&&m.preventDefault(),i=m||i,s.classList.add("can-install"),B("pwa-installable")}function A(){return!!i}function P(){return w()||r}function K(){if(!i)return!1;var m=i;i=null,s.classList.remove("can-install");try{var h=m.prompt();h&&typeof h.catch=="function"&&h.catch(S)}catch{return!1}return m.userChoice&&m.userChoice.then&&m.userChoice.then(function($){$&&$.outcome==="accepted"?B("pwa-accepted"):B("pwa-dismissed")}).catch(S),!0}function R(m){return K()?Promise.resolve(!0):new Promise(function(h){var $=!1,H;function U(L){$||($=!0,a.removeEventListener("pwa-installable",G),clearTimeout(H),h(L))}function G(){U(K())}H=setTimeout(function(){U(!1)},m||2500),a.addEventListener("pwa-installable",G)})}i&&(s.classList.add("can-install"),setTimeout(function(){B("pwa-installable")},0)),a.addEventListener("beforeinstallprompt",g),a.addEventListener("appinstalled",function(){r=!0,i=null,s.classList.remove("can-install"),s.classList.add("is-installed"),B("pwa-installed"),v("Aplikasi berhasil dipasang \u2713","success",3800)}),w()&&s.classList.add("is-installed"),a.pwaInstall=K,a.pwaCanInstall=A,a.pwaIsInstalled=P,a.pwaInstallWait=R;function j(){try{if(typeof n().busy=="function"&&n().busy())return!0}catch{}var m=e.activeElement;return!!m&&(/^(INPUT|TEXTAREA|SELECT)$/.test(m.tagName)||m.isContentEditable)}function M(){var m=parseInt(T("pwa_reload_at")||"0",10);Date.now()-m<2e4||(T("pwa_reload_at",String(Date.now())),a.location.reload())}function q(){if(!u){if(u=!0,typeof n().onUpdate=="function")try{n().onUpdate(M,j);return}catch{}if(!e.body){setTimeout(M,800);return}b();var m=e.createElement("div");m.className="pw-upd",m.setAttribute("role","status"),m.innerHTML='<span class="pw-spin"></span><div>Versi terbaru ditemukan<small>Memperbarui otomatis\u2026</small></div><button type="button">Perbarui</button>',e.body.appendChild(m),m.offsetWidth,m.className="pw-upd show",m.getElementsByTagName("button")[0].onclick=M,(function h(){if(j()){m.getElementsByTagName("small")[0].textContent="Anda sedang mengisi data \u2014 tekan Perbarui bila sudah selesai.",setTimeout(h,2e3);return}setTimeout(M,2800)})()}}function x(){var m=n().watch||["index.html"];return Promise.all(m.map(function(h){return fetch(h,{method:"HEAD",cache:"no-store"}).then(function($){return $.ok?$.headers.get("etag")||$.headers.get("last-modified")||$.headers.get("content-length")||"":"?"})})).then(function(h){return h.join("|")}).catch(function(){return null})}function N(m){if(!(t.onLine===!1||u||location.protocol==="file:")){var h=Date.now();if(!(!m&&h-f<45e3)){if(f=h,o&&o.update)try{o.update().catch(S)}catch{}p||(p=!0,x().then(function($){if(p=!1,!!$){if(d===null){d=$;return}$!==d&&(d=$,q())}}))}}}function O(){if(!(!("serviceWorker"in t)||!k)){t.serviceWorker.addEventListener("controllerchange",function(){l&&q(),l=!0}),t.serviceWorker.addEventListener("message",function(m){var h=m.data||{};h.type==="CACHE_DONE"&&B("pwa-offline-ready",h)}),t.serviceWorker.register(n().sw||"sw.js",{updateViaCache:"none"}).then(function(m){return o=m,t.serviceWorker.ready}).then(function(m){if(t.onLine!==!1&&m&&m.active)try{m.active.postMessage({type:"CACHE_ALL"})}catch{}}).catch(function(m){a.console&&console.warn("[PWA] service worker gagal didaftarkan:",m)});try{t.storage&&t.storage.persist&&t.storage.persist().catch(S)}catch{}}}function _(){O(),a.addEventListener("load",function(){setTimeout(function(){N(!0)},6e3)}),e.addEventListener("visibilitychange",function(){e.hidden||N(!1)}),a.addEventListener("online",function(){setTimeout(function(){N(!0)},1200)}),setInterval(function(){e.hidden||N(!1)},600*1e3)}e.readyState==="loading"?e.addEventListener("DOMContentLoaded",_):_(),a.PWA={install:K,canInstall:A,isInstalled:P,installWait:R,checkUpdate:N,reload:M,toast:v,standalone:w,busy:j}})(window,document,navigator),(function(){"use strict";var a="Kas JHT",e="#c62828",t="pwaInstallDismissed:"+location.pathname,n=10080*60*1e3,s="kasjht:ver",i="kasjht:reloadAt",r="kasjht:offlineReady",o="kasjht:lastsync",l=null,u=0,d=!1,p=0;function f(c,y){try{localStorage.setItem(c,y)}catch{}}function k(c){try{return localStorage.getItem(c)}catch{return null}}function S(c,y){try{sessionStorage.setItem(c,y)}catch{}}function B(c){try{return sessionStorage.getItem(c)}catch{return null}}function T(){if(!document.getElementById("pwaNetCss")){var c=document.createElement("style");c.id="pwaNetCss",c.textContent='.pwa-pill{position:fixed;left:50%;top:calc(10px + env(safe-area-inset-top,0px));z-index:2147483000;max-width:calc(100vw - 24px);display:flex;align-items:center;gap:10px;padding:9px 16px;border-radius:999px;font:600 13px/1.3 "Figtree","Segoe UI",Arial,sans-serif;color:#F8F0E8;background:#291A1F;border:1px solid #3B262C;box-shadow:0 14px 30px -12px rgba(0,0,0,.8);-webkit-transform:translateX(-50%);transform:translateX(-50%)}.pwa-pill i{width:9px;height:9px;border-radius:50%;background:#F2B84B;flex:none}.pwa-pill.on i{background:#5BD9A4}.pwa-pill.off i{background:#FF8070}.pwa-pill.busy i{animation:pwaPulse 1s ease-in-out infinite}@keyframes pwaPulse{0%,100%{opacity:1}50%{opacity:.25}}.pwa-pill button{border:0;border-radius:999px;padding:6px 13px;font:700 12.5px "Figtree","Segoe UI",Arial,sans-serif;cursor:pointer;background:#F2B84B;color:#2B1700}',document.head.appendChild(c)}}var w=null,E=null;function C(){E&&(clearTimeout(E),E=null),w&&w.parentNode&&w.parentNode.removeChild(w),w=null}function b(c,y,I,D){if(T(),E&&(clearTimeout(E),E=null),w||(w=document.createElement("div"),w.setAttribute("role","status"),w.setAttribute("aria-live","polite"),document.body.appendChild(w)),w.className="pwa-pill "+c,w.innerHTML="<i></i><span></span>",w.lastChild.textContent=y,I){var F=document.createElement("button");F.type="button",F.textContent=I.label,F.onclick=I.fn,w.appendChild(F)}D&&(E=setTimeout(function(){C(),g()},D))}function v(c,y,I){d||b(c,y,null,I)}function g(){if(!d)if(p>0){var c=navigator.onLine===!1;b(c?"off busy":"busy",c?"Offline \u2014 perubahan akan dikirim otomatis saat tersambung":"Menyinkronkan perubahan\u2026",null,0)}else w&&!E&&C()}function A(){var c=window.FJHT&&window.FJHT.lastSync||parseInt(k(o)||"0",10);if(!c)return"";try{return" (data per "+new Date(c).toLocaleString("id-ID",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+")"}catch{return""}}function P(){var c=document.activeElement,y=c&&c.tagName;if(y==="INPUT"||y==="TEXTAREA"||y==="SELECT"||document.querySelector(".modal-overlay.open"))return!0;for(var I=document.querySelectorAll("#app input:not([type=checkbox]):not([type=radio]):not([type=hidden]), #app textarea"),D=0;D<I.length;D++)if(I[D].value&&I[D].offsetParent!==null)return!0;return!1}function K(){window.PWA?window.PWA.reload():location.reload()}var R=!1;function j(){if(!R){if(P()){d=!0,b("","Versi baru siap",{label:"Perbarui",fn:K},0);return}if(R=!0,d=!0,document.hidden){K();return}b("busy","Versi baru ditemukan \u2014 memperbarui\u2026",null,0),setTimeout(K,1200)}}setInterval(function(){d&&!R&&!P()&&(d=!1,j())},2e4),window.addEventListener("kas-sync",function(c){var y=p;p=c.detail&&c.detail.pending||0,y>0&&p===0?v("on","Semua perubahan sudah tersinkron \u2713",3e3):g()});function M(){var c=window.FJHT;if(!(!c||!c.flushed)){var y=setTimeout(function(){p||(p=1,g())},1500);c.flushed().then(function(){clearTimeout(y),p===1&&(p=0,v("on","Semua perubahan sudah tersinkron \u2713",3e3))},function(){clearTimeout(y)})}}window.addEventListener("online",function(){v("on","Tersambung kembali \u2014 memeriksa pembaruan\u2026",2600),setTimeout(function(){window.PWA&&window.PWA.checkUpdate(!0)},600),M()}),window.addEventListener("offline",function(){v("off","Mode offline \u2014 memakai data tersimpan"+A(),4500)}),window.addEventListener("load",function(){navigator.onLine===!1&&setTimeout(function(){v("off","Mode offline \u2014 memakai data tersimpan"+A(),4500)},1200),setTimeout(M,2500)});function q(){try{return window.matchMedia&&window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0}catch{return!1}}function x(){try{var c=parseInt(localStorage.getItem(t)||"0",10);return c&&Date.now()-c<n}catch{return!1}}function N(){try{localStorage.setItem(t,String(Date.now()))}catch{}}function O(c){var y=/^#?([0-9a-f]{6})$/i.exec(c);if(!y)return"#fff";var I=parseInt(y[1],16),D=I>>16&255,F=I>>8&255,z=I&255;return .299*D+.587*F+.114*z>150?"#06121f":"#ffffff"}var _='<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5v11"/><path d="M7.5 10.5l4.5 4.5 4.5-4.5"/><path d="M5 15.5v1.5a3 3 0 003 3h8a3 3 0 003-3v-1.5"/></svg>',m=navigator.userAgent||"",h=/iphone|ipad|ipod/i.test(m)&&!window.MSStream,$=/android/i.test(m);function H(){if(!document.getElementById("pwaFabCss")){var c=document.createElement("style");c.id="pwaFabCss",c.textContent='.pwa-dl{flex:none;display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;margin-left:auto;margin-right:2px;padding:0;cursor:pointer;border-radius:14px;color:#F2B84B;background:rgba(242,184,75,.14);border:1.5px solid rgba(242,184,75,.65);-webkit-tap-highlight-color:transparent}.pwa-dl:hover{background:rgba(242,184,75,.26)}.pwa-dl:active{transform:scale(.94)}:root[data-theme="light"] .pwa-dl{color:#8A5500;background:rgba(224,160,34,.16);border-color:rgba(138,85,0,.55)}.pwa-dl svg{display:block}@media (min-width:761px){.pwa-dl{width:auto;padding:0 16px 0 13px;gap:8px;font:700 13.5px "Figtree","Segoe UI",Arial,sans-serif;margin-right:0}}.pwa-dl span{display:none}@media (min-width:761px){.pwa-dl span{display:inline}}.pwa-ov{position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483001;display:flex;align-items:flex-end;justify-content:center;background:rgba(10,4,6,.72)}@media (min-width:761px){.pwa-ov{align-items:center}}.pwa-sheet{width:100%;max-width:440px;box-sizing:border-box;padding:22px 20px calc(22px + env(safe-area-inset-bottom,0px));border-radius:26px 26px 0 0;background:#1E1417;color:#F8F0E8;border:1px solid #3B262C;font:500 14.5px/1.55 "Figtree","Segoe UI",Arial,sans-serif;box-shadow:0 -20px 50px -20px rgba(0,0,0,.8)}@media (min-width:761px){.pwa-sheet{border-radius:26px}}.pwa-sheet h3{margin:0 0 4px;font:800 21px/1.2 "Bricolage Grotesque","Segoe UI",Arial,sans-serif;letter-spacing:-.02em}.pwa-sheet p{margin:0 0 12px;color:#CFC0B7}.pwa-sheet ol{margin:0 0 14px;padding-left:22px}.pwa-sheet li{margin:6px 0}.pwa-sheet .pwa-note{padding:10px 12px;border-radius:12px;background:rgba(242,184,75,.12);border:1px solid rgba(242,184,75,.35);color:#FFD98A;font-size:13px;margin-bottom:14px}.pwa-sheet button{width:100%;border:0;border-radius:14px;padding:13px;font:700 15px "Figtree","Segoe UI",Arial,sans-serif;cursor:pointer;background:linear-gradient(180deg,#F8C866,#E8A52B);color:#2B1700}',document.head.appendChild(c)}}function U(){return h?["Buka situs ini di <b>Safari</b>.","Ketuk tombol <b>Bagikan</b> (kotak dengan panah ke atas).","Pilih <b>Tambah ke Layar Utama</b>, lalu ketuk <b>Tambah</b>."]:$?["Buka situs ini di <b>Chrome</b>.","Ketuk menu <b>\u22EE</b> di pojok kanan atas.","Pilih <b>Pasang aplikasi</b> (atau <b>Tambahkan ke layar utama</b>)."]:["Buka situs ini di <b>Chrome</b> atau <b>Edge</b>.","Klik ikon <b>Pasang</b> (monitor dengan panah) di ujung kanan kolom alamat.","Atau buka menu <b>\u22EE</b> lalu pilih <b>Pasang Kas JHT</b>."]}function G(){if(document.querySelector(".pwa-ov"))return;H();var c=document.createElement("div");c.className="pwa-ov",c.setAttribute("role","dialog"),c.setAttribute("aria-label","Pasang aplikasi");for(var y=U(),I="",D=0;D<y.length;D++)I+="<li>"+y[D]+"</li>";c.innerHTML='<div class="pwa-sheet"><h3>Pasang '+a+"</h3><p>Buka seperti aplikasi, lebih cepat, dan tetap bisa dipakai saat offline.</p><ol>"+I+'</ol><div class="pwa-note">Jika Anda membuka dari editor atau aplikasi lain, salin alamat situs lalu buka di Chrome/Edge agar tombol pasang aktif.</div><button type="button">Mengerti</button></div>';function F(){c.parentNode&&c.parentNode.removeChild(c)}c.onclick=function(z){z.target===c&&F()},c.getElementsByTagName("button")[0].onclick=F,document.body.appendChild(c)}var L=null;function Q(){window.pwaInstall()||G()}function V(){if(q()){Y();return}var c=document.getElementById("hamburgerBtn")||document.getElementById("adminHamburgerBtn");if(!(!c||!c.parentNode)){var y=c.parentNode,I=y.querySelector(".topbar-actions"),D=window.matchMedia&&window.matchMedia("(min-width:761px)").matches&&I?I:c;L&&L.parentNode===y&&L.nextSibling===D||(L||(H(),L=document.createElement("button"),L.type="button",L.className="pwa-dl",L.setAttribute("aria-label","Pasang aplikasi "+a),L.title="Pasang aplikasi",L.innerHTML=_+"<span>Pasang Aplikasi</span>",L.onclick=Q),y.insertBefore(L,D))}}function Y(){L&&L.parentNode&&L.parentNode.removeChild(L),L=null}var W=!1;function J(){W||(W=!0,(window.requestAnimationFrame||setTimeout)(function(){W=!1,V()}))}function X(){V();var c=document.getElementById("app");window.MutationObserver&&c&&new MutationObserver(J).observe(c,{childList:!0,subtree:!0}),window.addEventListener("resize",J),window.addEventListener("hashchange",J)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",X):X(),window.PWA_CFG={sw:"sw.js",accent:e,watch:["index.html","app.js","fb.js","app.css"],busy:P,toast:function(c,y,I){v(y==="success"?"on":y==="warn"?"off":"",c,I)},onUpdate:function(){j()}},window.addEventListener("pwa-installable",J),window.addEventListener("pwa-installed",Y),window.addEventListener("pwa-offline-ready",function(){k(r)||(f(r,"1"),v("on","Aplikasi tersimpan \u2014 siap dipakai tanpa internet",4e3))})})();
