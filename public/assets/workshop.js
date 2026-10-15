/* =========================================================
   WORKSHOP: an HTML/CSS/JavaScript editor with a live preview.
   - Projects save to users/{uid}/projects/{id} through HQSync.projects.
   - Code runs on a separate origin (the runner site) inside an iframe,
     so it can never read this page's sign-in token or save.
   - The editor (CodeMirror) is loaded on first open from /assets/editor.js.
   ========================================================= */
// locally the runner uses the *other* loopback name, so it is a different site (own process) just like in production
const RUN_ORIGIN = location.hostname==="localhost" ? "http://127.0.0.1:5174" : location.hostname==="127.0.0.1" ? "http://localhost:5174" : "https://creature-hq-run.web.app";
// a project's kind decides how the runner treats its three files and what the tabs are called
const WS_KINDS = {
  web:  { files:[["html","index.html"],["css","style.css"],["js","script.js"]] },
  react:{ files:[["html","index.html"],["css","style.css"],["js","App.jsx"]] }
};
const wsKindOfPhase = pi => pi===5 ? "react" : "web";
const wsKind = p => { if(p&&WS_KINDS[p.kind]) return p.kind; const q=p&&p.questId?questOf(p.questId):null; return q?wsKindOfPhase(q.pi):"web"; };
const wsFiles = p => WS_KINDS[wsKind(p)].files;
const wsJsName = p => wsFiles(p)[2][1];
const WS_MAX = 100000;                 // characters per file (matches firestore.rules)
const WS_SAVE_IDLE = 2000, WS_SAVE_MAX = 10000, WS_RUN_DELAY = 700, WS_STUCK_MS = 3500;
// quests you can build in the browser: HTML, CSS, JavaScript, API and React phases, practice and project stages
const wsQuestOk = (pi,si) => pi>=1 && pi<=5 && ["Tiny Wins","Project","Projects"].includes(phases[pi].stages[si][0]);

const ws = { list:null, loading:false, error:"", cur:null, editor:null, editorLoading:null,
  dirty:false, saving:false, saveIdle:null, saveMax:null, lastSaveErr:false,
  runId:0, runTimer:null, stuckTimer:null, frame:null, tabWin:null, paused:false, auto:true,
  logs:[], runState:"idle", device:"full", mobilePane:"code", lastErrCount:0, lastQuip:0 };
try{ ws.auto = localStorage.getItem("hqWsAuto")!=="0"; ws.device = localStorage.getItem("hqWsDevice")||"full"; }catch(e){}

const wsId = () => Array.from(crypto.getRandomValues(new Uint8Array(12)),b=>"abcdefghijklmnopqrstuvwxyz0123456789"[b%36]).join("");
const wsAgo = t => { const s=Math.max(0,(Date.now()-t)/1000);
  return s<60?"just now":s<3600?Math.floor(s/60)+" min ago":s<86400?plural(Math.floor(s/3600),"hour")+" ago":fmtDate(t); };
const wsLines = s => s ? s.split("\n").length : 0;

/* ---------- starter files ---------- */
function wsPage(title, body, extra="", js="script.js"){
  return '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>'+title+'</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n'+body+'\n  <script src="'+js+'"></script>\n</body>\n</html>\n'+extra;
}
const WS_TEMPLATES = {
  blank:{ name:"Untitled project", files:{ html:wsPage("My page","  "), css:"", js:"" } },
  starter:{ name:"Hello, creature", files:{
    html:wsPage("Hello, creature",'  <main class="card">\n    <h1>Hello, creature</h1>\n    <p>You have clicked <strong id="count">0</strong> times.</p>\n    <button id="poke">Poke</button>\n  </main>'),
    css:'body {\n  margin: 0;\n  min-height: 100vh;\n  display: grid;\n  place-items: center;\n  font-family: system-ui, sans-serif;\n  background: #f2f3ef;\n}\n\n.card {\n  padding: 32px 40px;\n  border: 2px solid #26282f;\n  border-radius: 12px;\n  background: white;\n  text-align: center;\n}\n\nbutton {\n  padding: 10px 20px;\n  border: 0;\n  border-radius: 8px;\n  background: #f2a516;\n  font: inherit;\n  font-weight: 700;\n  cursor: pointer;\n}\n',
    js:'// Runs after the page loads. Try changing what the button does.\nconst button = document.querySelector("#poke");\nconst count = document.querySelector("#count");\nlet clicks = 0;\n\nbutton.addEventListener("click", () => {\n  clicks = clicks + 1;\n  count.textContent = clicks;\n  console.log("poked", clicks, "times");\n});\n' } }
};
function wsQuestTemplate(t){
  const kind=wsKindOfPhase(t.pi);
  if(kind==="react") return { name:t.q.slice(0,60), questId:t.id, kind, files:{
    html:wsPage(esc(t.q),'  <!-- Quest: '+t.q.replace(/--/g,"-")+' -->\n  <!-- React renders into #root. Write your components in App.jsx. -->\n  <div id="root"></div>',"","App.jsx"),
    css:"/* Styles for this page */\n",
    js:'// Quest: '+t.q+'\n// You can import from "react", "react-dom/client" and "react-router-dom".\nimport { useState } from "react";\nimport { createRoot } from "react-dom/client";\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return (\n    <main>\n      <h1>Hello, React</h1>\n      <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>\n    </main>\n  );\n}\n\ncreateRoot(document.getElementById("root")).render(<App />);\n' } };
  return { name:t.q.slice(0,60), questId:t.id, kind, files:{
    html:wsPage(esc(t.q),'  <!-- Quest: '+t.q.replace(/--/g,"-")+' -->\n  <!-- '+phases[t.pi].short+' · '+t.stage+'. Build it here; the preview updates as you type. -->\n  '),
    css:"/* Styles for this page */\n", js:"// JavaScript for this page\n" } };
}

/* ---------- loading ---------- */
async function wsLoadList(force){
  if(!window.HQSync||!HQSync.projects){ ws.error="Projects aren't available right now."; return; }
  if(ws.list&&!force) return;
  ws.loading=true; ws.error="";
  try{ ws.list=await HQSync.projects.list(); }
  catch(e){ console.error("Loading projects failed:",e); ws.error="Couldn't load your projects. Check your connection and try again."; }
  ws.loading=false;
}
function wsEditorModule(){
  return ws.editorLoading || (ws.editorLoading = import("/assets/editor.js?v=17").catch(e=>{ ws.editorLoading=null; throw e; }));
}

/* ---------- view ---------- */
function renderWorkshop(){
  const el=$("view-workshop");
  document.body.classList.toggle("ws-open", !!ws.cur);
  if(ws.cur){
    // the editor keeps its own DOM; only build it once per opened project
    if(!el.querySelector(".ws")) wsMountEditor(el);
    else wsRenderBar();
    return;
  }
  wsRenderGallery(el);
}

function wsRenderGallery(el){
  const head='<header class="view-head"><div><p class="eyebrow">'+(ws.list?plural(ws.list.length,"project"):"Projects")+' · HTML, CSS and JavaScript</p><h1>Workshop</h1>'+
    '<p class="lede">Write code and watch it run as you type. Every project saves to your account.</p></div>'+
    '<div class="actions"><button type="button" class="btn btn-primary" data-act="ws-new" data-tpl="blank">'+ic("pencil")+'New project</button></div></header>';
  if(!ws.list){
    el.innerHTML=head+(ws.error?'<div class="card empty"><h2>Projects didn\'t load</h2><p>'+esc(ws.error)+'</p><button type="button" class="btn" data-act="ws-retry">'+ic("refresh")+'Try again</button></div>'
      :'<div class="ws-skeleton" aria-busy="true"><div></div><div></div><div></div></div>');
    if(!ws.loading&&!ws.error) wsLoadList().then(()=>{ if(view==="workshop"&&!ws.cur) renderWorkshop(); });
    return;
  }
  const n=upNext(), nq=n&&wsQuestOk(n.pi,n.si)?questOf(qid(n.pi,n.si,n.qi)):null;
  const linked=nq&&ws.list.find(p=>p.questId===nq.id);
  const starts=[
    nq?'<button type="button" class="ws-start quest" data-act="ws-quest" data-id="'+nq.id+'"><span class="ws-start-ico">'+ic(phases[nq.pi].icon)+'</span><span><small>'+(linked?'Continue your quest':'Your next quest')+' · '+esc(phases[nq.pi].short)+'</small><b>'+esc(nq.q)+'</b></span></button>':'',
    '<button type="button" class="ws-start" data-act="ws-new" data-tpl="starter"><span class="ws-start-ico">'+ic("sparkle")+'</span><span><small>Example</small><b>A page with a button that counts</b></span></button>',
    '<button type="button" class="ws-start" data-act="ws-new" data-tpl="blank"><span class="ws-start-ico">'+ic("doc")+'</span><span><small>Empty</small><b>Blank page</b></span></button>'
  ].join("");
  const cards=ws.list.map(p=>{
    const q=p.questId?questOf(p.questId):null, f=p.files||{};
    return '<li><article class="ws-card"><button type="button" class="ws-card-open" data-act="ws-open" data-id="'+p.id+'" aria-label="Open '+esc(p.name)+'">'+
      '<span class="ws-card-top"><b>'+esc(p.name)+'</b><small>Edited '+wsAgo(p.updatedAt)+'</small></span>'+
      (q?'<span class="ws-card-quest">'+ic(phases[q.pi].icon)+esc(phases[q.pi].short)+' · '+esc(q.stage)+'</span>':'')+
      '<span class="ws-card-files">'+wsFiles(p).map(([k,n2])=>'<span class="f-'+k+'"><i></i>'+n2+' <em>'+wsLines(f[k]||"")+'</em></span>').join("")+'</span></button>'+
      '<div class="ws-card-actions"><button type="button" class="btn btn-sm btn-ghost" data-act="ws-dup" data-id="'+p.id+'">Duplicate</button><button type="button" class="btn btn-sm btn-ghost btn-danger" data-act="ws-del" data-id="'+p.id+'">Delete</button></div></article></li>';
  }).join("");
  el.innerHTML=head+'<h2 class="ws-section">Start something</h2><div class="ws-starts">'+starts+'</div>'+
    '<h2 class="ws-section">Your projects</h2>'+(ws.list.length?'<ul class="ws-grid">'+cards+'</ul>'
      :'<div class="card empty ws-empty"><h2>No projects yet</h2><p>Pick one of the starts above. Your projects will appear here.</p></div>');
}

function wsMountEditor(el){
  const p=ws.cur;
  el.innerHTML='<div class="ws" data-pane="'+ws.mobilePane+'">'+
    '<header class="ws-bar">'+
      '<button type="button" class="btn btn-sm btn-ghost" data-act="ws-back" aria-label="Back to projects">'+ic("map")+'<span class="ws-hide-sm">Projects</span></button>'+
      '<input class="ws-name" id="wsName" value="'+esc(p.name)+'" maxlength="60" aria-label="Project name" spellcheck="false">'+
      '<span class="ws-quest" id="wsQuest"></span>'+
      '<span class="ws-status" id="wsStatus" role="status"></span>'+
      '<span class="ws-bar-gap"></span>'+
      '<div class="seg ws-panes" role="group" aria-label="Show"><button type="button" data-act="ws-pane" data-pane="code">Code</button><button type="button" data-act="ws-pane" data-pane="preview">Preview</button></div>'+
      '<label class="ws-auto" title="Run automatically as you type"><input type="checkbox" id="wsAuto"'+(ws.auto?" checked":"")+'> Auto-run</label>'+
      '<button type="button" class="btn btn-sm btn-primary" data-act="ws-run" title="Run (Ctrl+Enter)">'+ic("play")+'Run</button>'+
    '</header>'+
    '<div class="ws-body" id="wsBody">'+
      '<section class="ws-code" aria-label="Code">'+
        '<div class="ws-files" role="tablist" aria-label="Files">'+wsFiles(p).map(([k,n2])=>'<button type="button" role="tab" class="ws-file f-'+k+'" data-act="ws-file" data-file="'+k+'" aria-selected="false"><i></i>'+n2+'</button>').join("")+
          '<span class="ws-files-hint ws-hide-sm"><kbd>Ctrl</kbd>+<kbd>Enter</kbd> run · <kbd>Ctrl</kbd>+<kbd>S</kbd> save</span></div>'+
        '<div class="ws-editor" id="wsEditor"><p class="ws-editor-wait">Loading editor</p></div>'+
      '</section>'+
      '<div class="ws-split" id="wsSplit" role="separator" aria-orientation="vertical" aria-label="Resize code and preview" tabindex="0"></div>'+
      '<section class="ws-preview device" aria-label="Preview">'+
        '<div class="device-top"><span class="led off" id="wsLed"></span><span class="name">Preview</span>'+
          '<div class="seg ws-device" role="group" aria-label="Preview width">'+[["phone","Phone"],["tablet","Tablet"],["full","Full"]].map(([k,l])=>'<button type="button" data-act="ws-device" data-device="'+k+'" aria-pressed="'+(ws.device===k)+'">'+l+'</button>').join("")+'</div>'+
          '<button type="button" class="ws-icon-btn" data-act="ws-run" aria-label="Reload preview" title="Reload">'+ic("refresh")+'</button>'+
          '<button type="button" class="ws-icon-btn" data-act="ws-tab" aria-label="Open preview in a new tab" title="Open in new tab">'+ic("external")+'</button></div>'+
        '<div class="ws-stage screen" id="wsStage" data-device="'+ws.device+'"><div class="ws-frame-wrap" id="wsFrameWrap"></div>'+
          '<div class="ws-stuck" id="wsStuck" hidden><b>The preview stopped responding</b><span>An endless loop, like <code>while (true)</code>, is the usual cause. Auto-run is paused. Fix the loop, then press Run.</span></div></div>'+
        '<div class="ws-console" id="wsConsole"><div class="ws-console-head"><button type="button" class="ws-console-toggle" data-act="ws-console" aria-expanded="true">'+ic("keyboard")+'Console<span class="ws-counts" id="wsCounts"></span></button>'+
          '<button type="button" class="ws-icon-btn" data-act="ws-clear" aria-label="Clear console" title="Clear">'+ic("trash")+'</button></div>'+
          '<ol class="ws-logs" id="wsLogs" aria-live="polite"></ol></div>'+
      '</section>'+
    '</div></div>';
  wsSplitSetup();
  $("wsName").addEventListener("input",e=>{ ws.cur.name=e.target.value.trim()||"Untitled project"; wsChanged(false); });
  $("wsName").addEventListener("keydown",e=>{ if(e.key==="Enter"){ e.preventDefault(); e.target.blur(); } });
  $("wsAuto").addEventListener("change",e=>{ ws.auto=e.target.checked; try{ localStorage.setItem("hqWsAuto",ws.auto?"1":"0"); }catch(x){} if(ws.auto){ ws.paused=false; wsRun(); } });
  wsRenderBar(); wsRenderLogs();
  wsEditorModule().then(mod=>{
    if(!ws.cur||!$("wsEditor")) return;
    $("wsEditor").innerHTML="";
    ws.editor=mod.createEditor({ parent:$("wsEditor"), files:ws.cur.files, active:ws.cur.file||"html", jsx:wsKind(ws.cur)==="react",
      onChange:(name,val)=>{ ws.cur.files[name]=val; wsChanged(true); },
      onRun:()=>wsRun(true), onSave:()=>wsSaveNow() });
    wsRenderBar();
    ws.editor.focus();
  }).catch(e=>{
    console.error(e);
    $("wsEditor").innerHTML='<p class="ws-editor-wait">The editor couldn\'t load. Check your connection. <button type="button" class="btn btn-sm" data-act="ws-reload-editor">Try again</button></p>';
  });
  wsRun(true);
}

function wsRenderBar(){
  const p=ws.cur; if(!p||!$("wsStatus")) return;
  const q=p.questId?questOf(p.questId):null;
  $("wsQuest").innerHTML=q?'<button type="button" class="ws-quest-chip" data-act="open-phase" data-pi="'+q.pi+'" data-id="'+q.id+'" title="Show this quest in the roadmap">'+ic(phases[q.pi].icon)+'<span>'+esc(q.q)+'</span></button>':'';
  const big=wsFiles(p).find(([k])=>(p.files[k]||"").length>WS_MAX);
  $("wsStatus").textContent=big?big[1]+" is over 100 KB and can't be saved":ws.saving?"Saving":ws.dirty?"Unsaved changes":ws.lastSaveErr?"Not saved yet · retrying":"Saved";
  $("wsStatus").className="ws-status"+(big||ws.lastSaveErr?" bad":ws.dirty||ws.saving?" busy":"");
  const active=ws.editor?ws.editor.active:(p.file||"html");
  document.querySelectorAll(".ws-file").forEach(b=>b.setAttribute("aria-selected",String(b.dataset.file===active)));
  document.querySelectorAll('[data-act="ws-pane"]').forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.pane===ws.mobilePane)));
  const w=document.querySelector(".ws"); if(w) w.dataset.pane=ws.mobilePane;
}

/* ---------- open / create / delete ---------- */
async function wsOpen(p){
  await wsFlush();
  ws.cur={id:p.id,name:p.name,questId:p.questId||null,kind:wsKind(p),files:{html:p.files.html||"",css:p.files.css||"",js:p.files.js||""},file:"html"};
  ws.logs=[]; ws.paused=false; ws.dirty=false; ws.lastSaveErr=false; ws.lastErrCount=0;
  if(ws.editor){ ws.editor.destroy(); ws.editor=null; }
  const el=$("view-workshop"); el.innerHTML="";
  if(view!=="workshop") go("workshop"); else renderWorkshop();
  scrollTo(0,0);
}
async function wsCreate(tpl){
  await wsLoadList();
  if(!ws.list) return toast(ws.error||"Projects aren't available right now.","","warn");
  if(ws.list.length>=100) return toast("You have 100 projects. Delete one to make room.","","warn");
  const p={id:wsId(), name:tpl.name, questId:tpl.questId||null, kind:tpl.kind||"web", files:{...tpl.files}, updatedAt:Date.now()};
  ws.list.unshift(p);
  await wsOpen(p);
  await wsSaveNow();   // save straight away so a new project exists even if nothing is typed
  sfx.coin();
  if(state.pet) say(tpl.questId?"new quest, new file. i'll watch the console for you.":"fresh project. type something and watch it appear.");
}
async function wsQuest(id){
  const t=questOf(id); if(!t) return;
  await wsLoadList();
  const found=ws.list&&ws.list.find(p=>p.questId===id);
  if(found) wsOpen(found); else wsCreate(wsQuestTemplate(t));
}
function wsDelete(id){
  const p=ws.list&&ws.list.find(x=>x.id===id); if(!p) return;
  confirmModal("Delete "+esc(p.name)+"?","Its three files are deleted from your account. This can't be undone.","Delete project",async()=>{
    try{ await HQSync.projects.remove(id); ws.list=ws.list.filter(x=>x.id!==id); if(ws.cur&&ws.cur.id===id) ws.cur=null; renderWorkshop(); toast("Project deleted","","trash"); }
    catch(e){ console.error(e); toast("Couldn't delete it. Try again.","","warn"); }
  });
}
function wsDuplicate(id){
  const p=ws.list&&ws.list.find(x=>x.id===id); if(!p) return;
  return wsCreate({name:(p.name+" copy").slice(0,60), kind:wsKind(p), files:{...p.files}});
}
async function wsBack(){
  await wsFlush();
  if(ws.editor){ ws.editor.destroy(); ws.editor=null; }
  wsKillFrame(); ws.cur=null;
  renderWorkshop();
}

/* ---------- saving: after a pause in typing, and at least every 10 s while typing ---------- */
function wsChanged(code){
  ws.dirty=true;
  const li=ws.list&&ws.list.find(x=>x.id===ws.cur.id);
  if(li){ li.name=ws.cur.name; li.files={...ws.cur.files}; li.updatedAt=Date.now(); }
  clearTimeout(ws.saveIdle); ws.saveIdle=setTimeout(wsSaveNow,WS_SAVE_IDLE);
  if(!ws.saveMax) ws.saveMax=setTimeout(wsSaveNow,WS_SAVE_MAX);
  wsRenderBar();
  if(code&&ws.auto&&!ws.paused){ clearTimeout(ws.runTimer); ws.runTimer=setTimeout(()=>wsRun(false),WS_RUN_DELAY); }
}
async function wsSaveNow(){
  clearTimeout(ws.saveIdle); clearTimeout(ws.saveMax); ws.saveIdle=ws.saveMax=null;
  const p=ws.cur; if(!p||!HQSync.projects) return;
  if(wsFiles(p).some(([k])=>(p.files[k]||"").length>WS_MAX)){ wsRenderBar(); return; }
  if(ws.saving){ ws.saveAgain=true; return; }
  ws.saving=true; ws.dirty=false; wsRenderBar();
  const snapshot={name:p.name,questId:p.questId,kind:p.kind,files:{...p.files}};
  // Firestore waits (rather than failing) while offline; say so instead of spinning forever
  const slow=setTimeout(()=>{ if(ws.saving&&$("wsStatus")){ $("wsStatus").textContent="Offline · will save when you reconnect"; } },6000);
  try{ await HQSync.projects.save(p.id,snapshot); ws.lastSaveErr=false; }
  catch(e){ console.error("Saving project failed:",e); ws.lastSaveErr=true; ws.dirty=true; ws.saveIdle=setTimeout(wsSaveNow,15000); }
  clearTimeout(slow); ws.saving=false;
  if(ws.saveAgain){ ws.saveAgain=false; if(ws.dirty) return wsSaveNow(); }
  wsRenderBar();
}
async function wsFlush(){ if(ws.cur&&(ws.dirty||ws.saveIdle)) await wsSaveNow(); }
addEventListener("pagehide",()=>{ if(ws.cur&&ws.dirty) wsSaveNow(); });
document.addEventListener("visibilitychange",()=>{ if(document.hidden&&ws.cur&&ws.dirty) wsSaveNow(); });

/* ---------- running ---------- */
function wsKillFrame(){ clearTimeout(ws.stuckTimer); if(ws.frame){ ws.frame.remove(); ws.frame=null; } }
function wsRun(manual){
  clearTimeout(ws.runTimer);
  if(!ws.cur||!$("wsFrameWrap")) return;
  if(manual){ ws.paused=false; }
  if(ws.paused) return;
  wsKillFrame();
  ws.runId++; ws.logs=[]; ws.runState="loading"; wsRenderLogs(); wsLed();
  $("wsStuck").hidden=true;
  const f=document.createElement("iframe");
  f.title="Preview of "+ws.cur.name;
  // the runner is another origin, so allow-same-origin gives it that origin (working localStorage/fetch), never ours
  f.setAttribute("sandbox","allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox");
  f.setAttribute("allow","clipboard-write");
  f.src=RUN_ORIGIN+"/?v=17";
  $("wsFrameWrap").appendChild(f); ws.frame=f;
  ws.stuckTimer=setTimeout(wsStuck,WS_STUCK_MS+2000);   // generous first timer covers loading the runner page
}
function wsSend(win){
  const c=ws.cur; if(!c||!win) return;
  win.postMessage({type:"hq-run",runId:ws.runId,kind:c.kind,html:c.files.html,css:c.files.css,js:c.files.js},RUN_ORIGIN);
}
function wsStuck(){
  if(!ws.cur||ws.runState!=="loading") return;
  ws.runState="stuck"; ws.paused=true; wsKillFrame(); wsLed(); wsRenderLogs();
  const s=$("wsStuck"); if(s) s.hidden=false;
  if(state.pet) wsQuip("my screen froze. endless loop? check your while and for conditions.",true);
}
addEventListener("message",e=>{
  if(e.origin!==RUN_ORIGIN) return;
  const m=e.data||{};
  if(m.type==="hq-ready"){
    if(ws.frame&&e.source===ws.frame.contentWindow){ wsSend(e.source); clearTimeout(ws.stuckTimer); ws.stuckTimer=setTimeout(wsStuck,WS_STUCK_MS); }
    else if(ws.tabWin&&e.source===ws.tabWin){ wsSend(ws.tabWin); ws.tabWin=null; }
    return;
  }
  if(!ws.frame||e.source!==ws.frame.contentWindow||m.runId!==ws.runId) return;
  if(m.type==="hq-wait"){   // the runner is downloading libraries (e.g. the React compiler); give it longer before calling it stuck
    clearTimeout(ws.stuckTimer); ws.stuckTimer=setTimeout(wsStuck,Math.min(60000,+m.ms||WS_STUCK_MS));
  }else if(m.type==="hq-console"){
    if(ws.logs.length<500) ws.logs.push({level:m.level,text:String(m.text||""),line:+m.line||0});
    else if(ws.logs.length===500) ws.logs.push({level:"warn",text:"Too many messages. Only the first 500 are shown.",line:0});
    wsRenderLogs(); wsLed();
  }else if(m.type==="hq-loaded"){
    clearTimeout(ws.stuckTimer); ws.runState="ok"; wsLed(); wsRenderLogs(); wsReact();
  }
});
function wsLed(){
  const l=$("wsLed"); if(!l) return;
  const errs=ws.logs.filter(x=>x.level==="error").length;
  l.className="led"+(ws.runState==="loading"?" busy":ws.runState==="stuck"||errs?" bad":ws.runState==="ok"?" ok":" off");
  l.title=ws.runState==="stuck"?"Not responding":errs?plural(errs,"error"):ws.runState==="ok"?"Running":"Loading";
}
function wsRenderLogs(){
  const ol=$("wsLogs"); if(!ol) return;
  const errs=ws.logs.filter(x=>x.level==="error").length, warns=ws.logs.filter(x=>x.level==="warn").length;
  $("wsCounts").innerHTML=(errs?'<span class="c-err">'+errs+'</span>':'')+(warns?'<span class="c-warn">'+warns+'</span>':'');
  ol.innerHTML=ws.logs.length?ws.logs.map(x=>'<li class="lv-'+x.level+'">'+(x.level==="error"?ic("warn"):x.level==="warn"?ic("warn"):'<span class="ws-caret" aria-hidden="true">›</span>')+
      '<span class="ws-log-text">'+esc(x.text)+'</span>'+(x.line?'<button type="button" class="ws-line" data-act="ws-goto" data-line="'+x.line+'" title="Show this line">'+esc(wsJsName(ws.cur))+':'+x.line+'</button>':'')+'</li>').join("")
    :'<li class="ws-log-empty">'+(ws.runState==="loading"?"Running":ws.runState==="stuck"?"Stopped. The page never finished loading.":"Nothing logged. Use console.log() in "+esc(wsJsName(ws.cur))+" to print here.")+'</li>';
  ol.scrollTop=ol.scrollHeight;
}
// the companion notices errors and fixes, without nagging
function wsReact(){
  if(!state.pet) return;
  const errs=ws.logs.filter(x=>x.level==="error").length;
  if(errs&&!ws.lastErrCount) wsQuip(rand(["red text in the console. read it top to bottom, it names the line.","an error! that's the computer explaining itself. click the line number.","something broke. the console knows where."]));
  else if(!errs&&ws.lastErrCount) wsQuip(rand(["errors gone. nice fix.","clean console. i felt that.","fixed it. debugging is the real skill."]),false,true);
  ws.lastErrCount=errs;
}
function wsQuip(text,angry,happy){
  if(Date.now()-ws.lastQuip<15000) return;
  ws.lastQuip=Date.now(); say(text); setMood(angry?"shock":happy?"happy":"focus",2200);
}

/* ---------- open the preview in its own tab ---------- */
function wsTab(){
  if(!ws.cur) return;
  const w=window.open(RUN_ORIGIN+"/?tab=1","_blank");   // no noopener: the runner needs this window to ask for the code, then cuts the link
  if(!w){ toast("Your browser blocked the new tab. Allow pop-ups for this site and try again.","","warn"); return; }
  ws.tabWin=w;
}

/* ---------- resizable split, remembered per device ---------- */
function wsSplitSetup(){
  const body=$("wsBody"), bar=$("wsSplit"); if(!body||!bar) return;
  let pct=50; try{ pct=Math.min(75,Math.max(25,Number(localStorage.getItem("hqWsSplit"))||50)); }catch(e){}
  const set=v=>{ pct=Math.min(75,Math.max(25,v)); body.style.setProperty("--ws-left",pct+"%"); };
  set(pct);
  const keep=()=>{ try{ localStorage.setItem("hqWsSplit",String(Math.round(pct))); }catch(e){} };
  bar.addEventListener("pointerdown",e=>{
    e.preventDefault(); bar.setPointerCapture(e.pointerId); body.classList.add("dragging");
    const r=body.getBoundingClientRect();
    const move=ev=>set((ev.clientX-r.left)/r.width*100);
    const up=()=>{ bar.removeEventListener("pointermove",move); bar.removeEventListener("pointerup",up); body.classList.remove("dragging"); keep(); };
    bar.addEventListener("pointermove",move); bar.addEventListener("pointerup",up);
  });
  bar.addEventListener("keydown",e=>{ if(e.key==="ArrowLeft"||e.key==="ArrowRight"){ e.preventDefault(); set(pct+(e.key==="ArrowLeft"?-5:5)); keep(); } });
}

/* ---------- actions (called from the app's click handler) ---------- */
function wsAction(a, el){
  switch(a){
    case "ws-new": wsCreate(WS_TEMPLATES[el.dataset.tpl]||WS_TEMPLATES.blank); break;
    case "ws-quest": wsQuest(el.dataset.id); break;
    case "ws-open": { const p=ws.list&&ws.list.find(x=>x.id===el.dataset.id); if(p) wsOpen(p); } break;
    case "ws-del": wsDelete(el.dataset.id); break;
    case "ws-dup": wsDuplicate(el.dataset.id); break;
    case "ws-retry": ws.error=""; ws.list=null; renderWorkshop(); break;
    case "ws-back": wsBack(); break;
    case "ws-file": if(ws.editor){ ws.editor.show(el.dataset.file); ws.cur.file=el.dataset.file; wsRenderBar(); } break;
    case "ws-run": wsRun(true); break;
    case "ws-tab": wsTab(); break;
    case "ws-clear": ws.logs=[]; wsRenderLogs(); wsLed(); break;
    case "ws-console": { const c=$("wsConsole"), open=!c.classList.toggle("closed"); el.setAttribute("aria-expanded",String(open)); } break;
    case "ws-device": ws.device=el.dataset.device; try{ localStorage.setItem("hqWsDevice",ws.device); }catch(e){}
      $("wsStage").dataset.device=ws.device; document.querySelectorAll('[data-act="ws-device"]').forEach(b=>b.setAttribute("aria-pressed",String(b===el))); break;
    case "ws-pane": ws.mobilePane=el.dataset.pane; wsRenderBar(); break;
    case "ws-goto": if(ws.editor){ ws.mobilePane="code"; ws.editor.goto("js",+el.dataset.line); ws.cur.file="js"; wsRenderBar(); } break;
    case "ws-reload-editor": ws.editorLoading=null; $("view-workshop").innerHTML=""; renderWorkshop(); break;
    default: return false;
  }
  return true;
}
