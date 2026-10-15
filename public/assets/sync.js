/* =========================================================
   ACCOUNT + CLOUD SAVE
   Signs the player in, loads their save from Firestore into
   localStorage (the game's own storage), then starts the game.
   Every game save() calls HQSync.changed(), which writes the
   whole save back to users/{uid} a moment later.
   ========================================================= */
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import {
  getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification,
  signOut, deleteUser, reauthenticateWithPopup, reauthenticateWithCredential, EmailAuthProvider, connectAuthEmulator
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import {
  getFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot, serverTimestamp, Timestamp, connectFirestoreEmulator,
  collection, getDocs, query, orderBy, limit
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js?v=17";

// workshop.js before game.js: the game draws its first screen as soon as it loads
const GAME_SCRIPTS = ["/assets/quiz.js?v=17", "/assets/workshop.js?v=17", "/assets/game.js?v=17"];
const MAX_SAVE_CHARS = 900000;          // Firestore documents top out at 1 MiB
const WRITE_DELAY = 1500;

/* ---------- the game's localStorage keys, and how each maps into the saved document ---------- */
const KEYS = {
  done:["goblinDone","json"], streak:["goblinStreak","num"], lastDate:["goblinLastDate","str"],
  extra:["goblinExtra","json"], subs:["hqSubs","json"], notes:["hqNotes","json"], quiz:["hqQuiz","json"],
  pet:["hqCreature","json"], rulesSeen:["hqRulesSeen","flag"], dataVersion:["hqDataVersion","num"]
};
const DEVICE_KEYS = ["hqView"];          // per-device UI state, cleared when the account on this device changes
const OWNER = "hqOwner", DIRTY = "hqDirty", BASE = "hqBaseRev";

const ls = {
  get(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } },
  set(k,v){ try{ localStorage.setItem(k,v); }catch(e){} },
  del(...ks){ try{ ks.forEach(k=>localStorage.removeItem(k)); }catch(e){} }
};
function readLocal(){
  const out = {};
  for(const [field,[key,kind]] of Object.entries(KEYS)){
    const raw = ls.get(key); if(raw===null) continue;
    if(kind==="json"){ try{ const v=JSON.parse(raw); if(v!==null&&v!==undefined) out[field]=v; }catch(e){} }
    else if(kind==="num"){ const n=Number(raw); if(Number.isFinite(n)) out[field]=n; }
    else if(kind==="flag") out[field] = raw==="1";
    else out[field] = raw;
  }
  return out;
}
function clearLocal(){ ls.del(...Object.values(KEYS).map(k=>k[0]), ...DEVICE_KEYS); }
function writeLocal(save){
  clearLocal();
  for(const [field,[key,kind]] of Object.entries(KEYS)){
    const v = save[field]; if(v===null||v===undefined) continue;
    if(kind==="json") ls.set(key, JSON.stringify(v));
    else if(kind==="num"){ if(Number.isFinite(Number(v))) ls.set(key, String(Number(v))); }
    else if(kind==="flag"){ if(v) ls.set(key,"1"); }
    else ls.set(key, String(v));
  }
}

/* ---------- boot screen + small helpers ---------- */
const $ = id => document.getElementById(id);
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function boot(note, pct){
  const b=$("boot"); if(!b) return;
  b.hidden=false;
  if(note) $("bootNote").textContent=note;
  if(pct!==undefined) $("bootBar").style.width=pct+"%";
}
function bootError(msg, retry){
  boot();
  $("bootNote").innerHTML=esc(msg)+(retry?' <button type="button" class="btn btn-sm" id="bootRetry" style="margin-left:6px">Try again</button>':'');
  if(retry) $("bootRetry").addEventListener("click",()=>location.reload());
}
const notes=[];
function note(msg, icon="warn"){ notes.push([msg,icon]); }
function flushNotes(){
  // wait for the game's toast() and the title screen
  setTimeout(()=>notes.splice(0).forEach(([m,i],k)=>setTimeout(()=>window.toast&&window.toast(m,"",i),k*3000)),1600);
}
function loadGame(){
  boot("Loading", 30);
  for(const src of GAME_SCRIPTS){
    const s=document.createElement("script"); s.src=src; s.async=false;
    s.onerror=()=>bootError("Couldn't load the game files. Check your connection.", true);
    document.body.appendChild(s);
  }
  flushNotes();
}

/* ---------- Workshop projects: one document each, users/{uid}/projects/{id} ---------- */
const PROJECT_LIMIT = 100;
function localProjects(){
  const KEY="hqProjects";
  const all=()=>{ try{ return JSON.parse(ls.get(KEY)||"{}")||{}; }catch(e){ return {}; } };
  return {
    async list(){ return Object.entries(all()).map(([id,p])=>({id,...p})).sort((a,b)=>b.updatedAt-a.updatedAt); },
    async save(id,p){ const a=all(); a[id]={name:p.name,files:p.files,questId:p.questId||null,kind:p.kind||"web",createdAt:(a[id]&&a[id].createdAt)||Date.now(),updatedAt:Date.now()}; ls.set(KEY,JSON.stringify(a)); },
    async remove(id){ const a=all(); delete a[id]; ls.set(KEY,JSON.stringify(a)); }
  };
}

/* ---------- no config: local-only test mode on localhost ---------- */
const configured = !!(firebaseConfig.apiKey && firebaseConfig.projectId);
if(!configured){
  if(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
    window.HQSync = { local:true, user:{email:"Local test mode", name:"", provider:"local", verified:true},
      changed(){}, lastSaved:0, async signOut(){ clearLocal(); location.href="/"; return {ok:true}; },
      async deleteAccount(){ clearLocal(); location.href="/"; return {ok:true}; },
      projects: localProjects() };
    note("Local test mode: sign-in is off and progress stays in this browser.");
    loadGame();
  }else{
    bootError("Sign-in isn't set up yet. Please check back soon.");
  }
}else{
  start();
}

function start(){
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  if(firebaseConfig.projectId.startsWith("demo-") && /^(localhost|127\.0\.0\.1)$/.test(location.hostname)){
    // local emulators (firebase emulators:start --project demo-creature-hq)
    connectAuthEmulator(auth, "http://127.0.0.1:9099", {disableWarnings:true});
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
  const sid = Math.random().toString(36).slice(2)+Date.now().toString(36);   // this tab's id, to recognise our own writes
  let started=false, leaving=false, ref=null, serverRev=0, createdAt=null, stale=false;
  let timer=null, writing=null, again=false, unsub=null, failNoted=false, sizeNoted=false;

  let authErrorAfterRedirect="", loadRev=0, loadSession=null;
  getRedirectResult(auth).catch(e=>{ authErrorAfterRedirect=friendly(e); if(!started) showAuth(authErrorAfterRedirect); });

  onAuthStateChanged(auth, user=>{
    if(started){ if(!user && !leaving) location.reload(); return; }   // signed out in another tab
    if(user){ started=true; begin(user); }
    else showAuth(authErrorAfterRedirect);
  });

  /* ---------- load the save, then start the game ---------- */
  async function begin(user){
    hideAuth(); boot("Loading your save", 15);
    ref = doc(db, "users", user.uid);
    let snap=null;
    try{ snap = await getDoc(ref); }
    catch(e){ console.warn("Loading save failed:", e); }
    const owner = ls.get(OWNER);
    if(owner && owner!==user.uid){ clearLocal(); ls.del(DIRTY, BASE); }   // someone else was signed in on this device
    let push=false;
    if(!snap){
      if(owner!==user.uid){ bootError("Couldn't reach the server to load your save.", true); return; }
      note("You're offline. Progress is saved on this device and syncs when you reconnect.");
      serverRev = loadRev = Math.max(0, Number(ls.get(BASE))||0);
      push = ls.get(DIRTY)==="1";
    }else if(snap.exists()){
      const d = snap.data(), base = Number(ls.get(BASE));
      serverRev = loadRev = Number(d.rev)||0; createdAt = d.createdAt||null; loadSession = d.session||null;
      if(owner===user.uid && ls.get(DIRTY)==="1" && Number.isFinite(base) && serverRev<=base){
        push = true;   // this device has changes the server never received
      }else{
        if(owner===user.uid && ls.get(DIRTY)==="1") note("Newer progress from another device was loaded.","refresh");
        writeLocal(d.save||{}); ls.del(DIRTY); ls.set(BASE, String(serverRev));
      }
    }else{
      if(owner!==user.uid) clearLocal();   // brand-new account starts empty
      push = true;
    }
    ls.set(OWNER, user.uid);

    window.HQSync = {
      local:false,
      user:{ email:user.email||"", name:user.displayName||"", verified:user.emailVerified,
             provider:(user.providerData[0]&&user.providerData[0].providerId)||"password" },
      changed, flush:writeNow, lastSaved:0,
      signOut:signOutFlow, deleteAccount,
      projects: cloudProjects(user.uid)
    };
    if(push) writeNow();
    watch();
    loadGame();
  }

  function cloudProjects(uid){
    const col = collection(db, "users", uid, "projects"), created = {};
    const ms = t => t && typeof t.toMillis==="function" ? t.toMillis() : Date.now();
    return {
      async list(){
        const snap = await getDocs(query(col, orderBy("updatedAt","desc"), limit(PROJECT_LIMIT)));
        return snap.docs.map(d=>{ const x=d.data(); created[d.id]=x.createdAt; return {id:d.id, name:x.name, files:x.files||{}, questId:x.questId||null, kind:x.kind||null, createdAt:ms(x.createdAt), updatedAt:ms(x.updatedAt)}; });
      },
      async save(id, p){
        if(!created[id]) created[id]=Timestamp.now();
        await setDoc(doc(col, id), { name:String(p.name).slice(0,60), questId:p.questId||null, kind:p.kind||"web",
          files:{ html:p.files.html||"", css:p.files.css||"", js:p.files.js||"" },
          createdAt:created[id], updatedAt:serverTimestamp() });
      },
      async remove(id){ await deleteDoc(doc(col, id)); delete created[id]; },
      async removeAll(){ const snap=await getDocs(col); await Promise.all(snap.docs.map(d=>deleteDoc(d.ref))); }
    };
  }

  /* ---------- writes ---------- */
  function changed(){
    if(stale||!ref) return;
    ls.set(DIRTY,"1");
    clearTimeout(timer); timer=setTimeout(writeNow, WRITE_DELAY);
  }
  function writeNow(){
    clearTimeout(timer); timer=null;
    if(stale||!ref) return Promise.resolve();
    if(writing){ again=true; return writing; }
    const save = readLocal(), size = JSON.stringify(save).length;
    if(size>MAX_SAVE_CHARS){
      if(!sizeNoted){ sizeNoted=true; window.toast&&window.toast("Your notes are too large to sync. Shorten some notes to keep saving to your account.","","warn"); }
      return Promise.resolve();
    }
    const rev = ++serverRev;
    ls.set(BASE, String(rev));
    if(!createdAt) createdAt = Timestamp.now();
    writing = setDoc(ref, { schema:1, rev, session:sid, save, createdAt, updatedAt:serverTimestamp() })
      .then(()=>{
        failNoted=false; window.HQSync.lastSaved=Date.now();
        if(!timer && !again) ls.del(DIRTY);
      })
      .catch(e=>{
        console.error("Saving to your account failed:", e);
        if(!failNoted){ failNoted=true; window.toast&&window.toast("Couldn't save to your account. Progress is kept on this device and retried.","","warn"); }
        if(!timer) timer=setTimeout(writeNow, 15000);
      })
      .finally(()=>{ writing=null; if(again){ again=false; writeNow(); } });
    return writing;
  }
  function flushSoon(){
    if(typeof window.flushNote==="function") window.flushNote();
    if(timer) writeNow();
  }
  document.addEventListener("visibilitychange",()=>{ if(document.hidden) flushSoon(); });
  addEventListener("pagehide", flushSoon);
  addEventListener("online", ()=>{ if(ls.get(DIRTY)==="1") writeNow(); });

  /* ---------- another tab or device changed the save: stop writing, ask to reload ---------- */
  function watch(){
    let first=true;
    unsub = onSnapshot(ref, snap=>{
      if(snap.metadata.hasPendingWrites || snap.metadata.fromCache) return;
      const d = snap.exists()?snap.data():null;
      const rev = d?Number(d.rev)||0:0;
      if(first){ first=false; if(d && rev<=serverRev) return; }
      if(d && d.session===sid) return;
      if(d && rev===loadRev && d.session===loadSession) return;   // a rejected write rolled back to what we loaded
      goStale(d?"Your progress changed on another device or tab.":"This save was deleted from another device.");
    }, e=>console.warn("Live sync stopped:", e));
  }
  function goStale(msg){
    if(stale) return;
    stale=true; clearTimeout(timer); timer=null;
    if(window.HQSync) window.HQSync.stale=true;   // the game stops writing its local copy too
    // if this tab made the last write on this device, the next load should take the server copy;
    // if another tab here wrote since, that tab owns these markers
    if(ls.get(BASE)===String(serverRev)){ ls.del(DIRTY); ls.set(BASE,"-1"); }
    const b=$("syncBanner");
    b.innerHTML='<span>'+esc(msg)+' Reload to continue with the latest save. Changes made here from now on won\'t be kept.</span><button type="button" class="btn btn-sm btn-primary" id="syncReload">Reload</button>';
    b.hidden=false;
    $("syncReload").addEventListener("click",()=>location.reload());
  }

  /* ---------- sign out / delete account ---------- */
  async function signOutFlow(force){
    if(typeof window.flushNote==="function") window.flushNote();
    if(!stale && (timer || writing || ls.get(DIRTY)==="1")){
      const w = writeNow();
      await Promise.race([w, new Promise(r=>setTimeout(r,5000))]);
      if(ls.get(DIRTY)==="1" && !force) return {ok:false, unsynced:true};
    }
    leaving=true; if(unsub) unsub();
    clearLocal(); ls.del(OWNER, DIRTY, BASE);
    await signOut(auth);
    location.href="/";
    return {ok:true};
  }
  async function deleteAccount(password){
    const user = auth.currentUser; if(!user) return {ok:false, error:"You're not signed in."};
    try{
      if(window.HQSync.user.provider==="google.com") await reauthenticateWithPopup(user, new GoogleAuthProvider());
      else await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password||""));
    }catch(e){ return {ok:false, error:friendly(e)}; }
    leaving=true; stale=true; clearTimeout(timer); if(unsub) unsub();
    try{
      await window.HQSync.projects.removeAll();   // deleting the save document doesn't delete its projects
      await deleteDoc(ref);
      await deleteUser(user);
    }catch(e){ leaving=false; return {ok:false, error:friendly(e)}; }
    clearLocal(); ls.del(OWNER, DIRTY, BASE);
    location.href="/?account=deleted";
    return {ok:true};
  }

  /* ---------- sign-in screen ---------- */
  let mode = new URLSearchParams(location.search).get("mode")==="signup" ? "signup" : "signin";
  function showAuth(err){
    $("boot").hidden=true;
    const root=$("authRoot"), signup=mode==="signup";
    root.innerHTML=
      '<div class="auth" role="main">'+
        '<header class="title-top"><a class="brand auth-home" href="/" aria-label="Creature HQ home">'+
          '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><rect class="mark-bg" width="32" height="32" rx="8"/><path d="M16 5c4.8 0 8.5 8 8.5 13.5A8.5 8.5 0 0 1 7.5 18.5C7.5 13 11.2 5 16 5z" fill="#F2A516"/><rect x="11.5" y="15" width="3" height="3" fill="#26282F"/><rect x="17.5" y="15" width="3" height="3" fill="#26282F"/></svg>'+
          '<div><b>Creature HQ</b><span>Fullstack roadmap</span></div></a></header>'+
        '<section class="auth-card" aria-labelledby="authTitle">'+
          '<h1 id="authTitle">'+(signup?'Create your account':'Sign in')+'</h1>'+
          '<p class="auth-lede">'+(signup?'Your companion, quests and notes are saved to your account, so they follow you to any device.':'Welcome back. Your companion has been waiting.')+'</p>'+
          '<button type="button" class="btn auth-google" id="authGoogle">'+
            '<svg viewBox="0 0 48 48" aria-hidden="true" width="18" height="18"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.5z"/></svg>'+
            'Continue with Google</button>'+
          '<div class="auth-or"><span>or use email</span></div>'+
          '<form id="authForm" novalidate>'+
            '<label class="field"><span class="field-label">Email</span><input class="input" type="email" name="email" autocomplete="email" inputmode="email" required></label>'+
            '<label class="field"><span class="field-label">Password'+(signup?'<small>At least 8 characters</small>':'')+'</span>'+
              '<span class="auth-pw"><input class="input" type="password" name="password" autocomplete="'+(signup?'new-password':'current-password')+'" minlength="'+(signup?8:1)+'" required>'+
              '<button type="button" class="btn btn-ghost btn-sm" id="authShow" aria-pressed="false">Show</button></span></label>'+
            '<div class="form-error" id="authErr" role="alert">'+esc(err||"")+'</div>'+
            '<button type="submit" class="btn btn-primary auth-submit" id="authSubmit">'+(signup?'Create account':'Sign in')+'</button>'+
          '</form>'+
          '<div class="auth-links">'+
            (signup?'<span>Already have an account? <button type="button" class="linkish" id="authSwap">Sign in</button></span>'
                   :'<button type="button" class="linkish" id="authReset">Forgot password?</button><span>New here? <button type="button" class="linkish" id="authSwap">Create an account</button></span>')+
          '</div>'+
        '</section>'+
        '<footer class="title-foot"><span><a href="/">Home</a> · <a href="/privacy">Privacy</a></span><span>Free. No ads.</span></footer>'+
      '</div>';
    const form=$("authForm"), errEl=$("authErr"), submit=$("authSubmit");
    const fail = msg => { errEl.textContent=msg; busy(false); };
    const busy = on => { root.querySelectorAll("button,input").forEach(x=>x.disabled=on); };
    $("authSwap").addEventListener("click",()=>{ mode=signup?"signin":"signup"; showAuth(); $("authRoot").querySelector('input[name=email]').focus(); });
    $("authShow").addEventListener("click",e=>{
      const pw=form.password, show=pw.type==="password";
      pw.type=show?"text":"password"; e.currentTarget.textContent=show?"Hide":"Show"; e.currentTarget.setAttribute("aria-pressed",String(show));
    });
    $("authGoogle").addEventListener("click", async ()=>{
      errEl.textContent=""; busy(true);
      const provider=new GoogleAuthProvider(); provider.setCustomParameters({prompt:"select_account"});
      try{ await signInWithPopup(auth, provider); }
      catch(e){
        if(e.code==="auth/popup-blocked"||e.code==="auth/operation-not-supported-in-this-environment"){ try{ await signInWithRedirect(auth, provider); return; }catch(e2){ return fail(friendly(e2)); } }
        fail(friendly(e));
      }
    });
    const reset=$("authReset");
    if(reset) reset.addEventListener("click", async ()=>{
      const email=form.email.value.trim();
      if(!/^\S+@\S+\.\S+$/.test(email)){ form.email.setAttribute("aria-invalid","true"); form.email.focus(); errEl.textContent="Enter your email above, then press Forgot password again."; return; }
      busy(true);
      try{ await sendPasswordResetEmail(auth, email); busy(false); errEl.textContent=""; errEl.insertAdjacentHTML("beforeend",'<span class="auth-ok">If there\'s an account for '+esc(email)+', a reset link is on its way. Check your inbox and spam folder.</span>'); }
      catch(e){ fail(friendly(e)); }
    });
    form.addEventListener("input",e=>e.target.removeAttribute("aria-invalid"));
    form.addEventListener("submit", async e=>{
      e.preventDefault();
      const email=form.email.value.trim(), password=form.password.value;
      if(!/^\S+@\S+\.\S+$/.test(email)){ form.email.setAttribute("aria-invalid","true"); form.email.focus(); errEl.textContent="Enter a valid email address."; return; }
      if(signup&&password.length<8){ form.password.setAttribute("aria-invalid","true"); form.password.focus(); errEl.textContent="Use at least 8 characters for your password."; return; }
      if(!password){ form.password.setAttribute("aria-invalid","true"); form.password.focus(); errEl.textContent="Enter your password."; return; }
      errEl.textContent=""; busy(true); submit.textContent=signup?"Creating account":"Signing in";
      try{
        if(signup){
          const cred=await createUserWithEmailAndPassword(auth, email, password);
          sendEmailVerification(cred.user).then(()=>note("We sent a link to "+email+" to confirm your email.","check")).catch(()=>{});
        }else await signInWithEmailAndPassword(auth, email, password);
      }catch(e2){ submit.textContent=signup?"Create account":"Sign in"; fail(friendly(e2)); }
    });
    (form.email).focus({preventScroll:true});
  }
  function hideAuth(){ $("authRoot").innerHTML=""; }
}

function friendly(e){
  const code=(e&&e.code)||"";
  const map={
    "auth/invalid-credential":"That email and password don't match. Try again or reset your password.",
    "auth/wrong-password":"That email and password don't match. Try again or reset your password.",
    "auth/user-not-found":"That email and password don't match. Try again or reset your password.",
    "auth/invalid-login-credentials":"That email and password don't match. Try again or reset your password.",
    "auth/email-already-in-use":"There's already an account with this email. Sign in instead.",
    "auth/weak-password":"Use at least 8 characters for your password.",
    "auth/invalid-email":"That email address doesn't look right.",
    "auth/missing-password":"Enter your password.",
    "auth/too-many-requests":"Too many attempts. Wait a few minutes and try again.",
    "auth/network-request-failed":"Can't reach the server. Check your connection and try again.",
    "auth/account-exists-with-different-credential":"This email already signs in with a password. Use email and password instead.",
    "auth/operation-not-allowed":"This sign-in method isn't turned on yet.",
    "auth/unauthorized-domain":"Sign-in isn't allowed on this web address yet.",
    "auth/user-disabled":"This account has been disabled.",
    "auth/user-mismatch":"That's a different account. Sign in with the account you're deleting.",
    "auth/requires-recent-login":"For safety, sign out and back in, then try again.",
    "auth/popup-closed-by-user":"", "auth/cancelled-popup-request":"", "auth/user-cancelled":""
  };
  if(code in map) return map[code];
  console.error(e);
  return "Something went wrong"+(code?" ("+code.replace("auth/","")+")":"")+". Please try again.";
}
