/* =========================================================
   DATA (order matters: quest ids are phase-stage-quest indexes,
   identical to v1 so old saves keep working)
   ========================================================= */
const phases = [
  {title:"Phase 0: Meet The Web", short:"Meet the Web", icon:"web", weeks:"Week 1", tag:"Orientation",
   note:"You don't build anything yet. First learn what the browser is actually doing.",
   stages:[
    ["Learn",["Understand browser vs server","Understand URLs, HTTP, requests and responses","Understand HTML, CSS and JavaScript roles","Install / verify VS Code and browser DevTools"]],
    ["Tiny Wins",["Open DevTools and inspect a real website","Identify one GET request in the Network tab","Create a folder called fullstack-journey"]],
    ["Unlock",["Explain: browser → request → server → response → page"]]]},
  {title:"Phase 1: HTML", short:"HTML", icon:"html", weeks:"Weeks 2–3", tag:"Structure",
   note:"Learn HTML before being asked to magically build a website.",
   stages:[
    ["Learn",["HTML document structure","Headings, paragraphs, links and images","Lists, tables and buttons","Semantic HTML: header, nav, main, section, article, footer","Forms, inputs and labels","Basic accessibility"]],
    ["Tiny Wins",["Make a page with headings and paragraphs","Add links, an image and a list","Build a simple contact form","Recreate a small article page from scratch"]],
    ["Project",["Build your first Developer Homepage"]]]},
  {title:"Phase 2: CSS", short:"CSS", icon:"css", weeks:"Weeks 3–5", tag:"Make it pretty",
   note:"Now make the ugly HTML thing actually look intentional.",
   stages:[
    ["Learn",["Selectors and the cascade","Box model","Units, colors and typography","Display and positioning","Flexbox","CSS Grid","Responsive design and media queries"]],
    ["Tiny Wins",["Style your Developer Homepage","Make a two-column Flexbox layout","Make a card grid with CSS Grid","Make a page responsive at phone width"]],
    ["Projects",["Build a movie landing page","Turn your Developer Homepage into your first portfolio"]]]},
  {title:"Phase 3: JavaScript Foundations", short:"JavaScript", icon:"js", weeks:"Weeks 6–9", tag:"Make it think",
   note:"You already know programming. This is JavaScript-for-the-browser, not a loop tutorial.",
   stages:[
    ["Learn",["JavaScript variables, functions and scope","Objects and arrays","Array methods: map, filter, find, reduce","DOM selection and manipulation","Events and event handlers","Forms and user input","Modules and basic error handling"]],
    ["Tiny Wins",["Make a button change text","Build a counter","Build a character counter for an input","Render an array of objects into HTML","Build a small filterable list"]],
    ["Project",["Build Todo App v1","Add edit / complete / delete","Add filters","Add LocalStorage"]]]},
  {title:"Phase 4: APIs + Async JavaScript", short:"APIs + Async", icon:"api", weeks:"Weeks 10–12", tag:"Talk to the internet",
   note:"Now your frontend can ask other computers for data.",
   stages:[
    ["Learn",["What an API is","JSON","fetch()","Promises","async / await","Loading and error states","Basic API request debugging"]],
    ["Tiny Wins",["Fetch JSON and print it to the console","Render API data into cards","Show a loading message","Show a useful error message"]],
    ["Projects",["Build Weather App","Build Movie Search App"]]]},
  {title:"Phase 5: React", short:"React", icon:"react", weeks:"Weeks 13–18", tag:"Think in components",
   note:"React comes after the browser + JavaScript mental model exists in your head.",
   stages:[
    ["Learn",["Why React exists","Components","JSX","Props","State","useState","Events in React","Conditional rendering","Lists and keys","useEffect","Forms","React Router"]],
    ["Tiny Wins",["Build a component with props","Build a counter with useState","Build a searchable list","Fetch API data into a React component","Create two routes"]],
    ["Projects",["Rebuild Movie Search App in React","Build Expense Tracker","Add filtering and charts"]]]},
  {title:"Phase 6: Node.js + HTTP", short:"Node + HTTP", icon:"node", weeks:"Weeks 19–21", tag:"Server goblin",
   note:"Backend starts here. You know how the browser asks a server for things. Now you become the thing being asked.",
   stages:[
    ["Learn",["What Node.js is","npm and package.json","Modules","Environment variables","Node event loop at a practical level","HTTP requests and responses in Node","Node's built-in http module"]],
    ["Tiny Wins",["Sketch how a request travels: browser → server → response","Run a Node script","Create and import a module","Read an environment variable","Create a tiny raw HTTP server","Return different responses for different URLs"]],
    ["Unlock",["Explain browser → HTTP request → Node server → HTTP response"]]]},
  {title:"Phase 7: Express + REST APIs", short:"Express", icon:"express", weeks:"Weeks 22–25", tag:"Backend",
   note:"Express is now an abstraction you understand instead of magic, because you already built the raw version.",
   stages:[
    ["Learn",["Express setup","Routes","Request and response objects","HTTP status codes","Middleware","Error handling","REST API design","Controllers and basic project structure"]],
    ["Tiny Wins",["Sketch the routes your API will need before writing any code","Create GET /tasks","Create POST /tasks","Create PUT /tasks/:id","Create DELETE /tasks/:id","Add logging middleware","Add validation and error middleware"]],
    ["Project",["Build Task Management REST API"]]]},
  {title:"Phase 8: SQL + PostgreSQL", short:"SQL", icon:"sql", weeks:"Weeks 26–29", tag:"Database",
   note:"Learn databases clearly enough that the data layer isn't black magic.",
   stages:[
    ["Learn",["Tables, rows and columns","Primary keys","Foreign keys","Relationships","SELECT, INSERT, UPDATE, DELETE","WHERE, ORDER BY and JOIN","Indexes and transactions at a basic level"]],
    ["Tiny Wins",["Create a users table","Insert and query rows","Create two related tables","Write a JOIN query","Connect Node to PostgreSQL"]],
    ["Upgrade",["Move Task API data from memory to PostgreSQL"]]]},
  {title:"Phase 9: Authentication + Real Full Stack", short:"Auth", icon:"auth", weeks:"Weeks 30–35", tag:"Real app",
   note:"Frontend + backend + database finally become one application.",
   stages:[
    ["Learn",["Authentication vs authorization","Password hashing","Sessions vs token-based authentication","Cookies","Protected routes","User ownership and authorization"]],
    ["Tiny Wins",["Diagram how a login request flows: form → API → hash check → token → protected route","Create a user table","Hash a password before storing it","Create login","Protect one API route","Show authenticated state in React"]],
    ["Project",["Build Study Tracker","Users → subjects → study sessions → dashboard","Deploy a working v1"]]]},
  {title:"Phase 10: TypeScript + Testing + Deployment", short:"TS + Tests", icon:"ts", weeks:"Weeks 36–44", tag:"Production",
   note:"Make an existing app safer and more professional. For testing: write the test first, watch it fail red, then make it pass green. That flip is the whole payoff.",
   stages:[
    ["Learn",["TypeScript basics","Types and interfaces","Unions and type narrowing","Typed functions","Unit testing","API integration testing","Production environment variables","Deployment basics","Basic CI/CD"]],
    ["Tiny Wins",["Type a small React component","Type one API response","Write a test for a function that doesn't exist yet and watch it fail","Write the function until that test goes green","Write an API integration test","Deploy a frontend and backend separately"]],
    ["Upgrade",["Convert Study Tracker to TypeScript","Add meaningful tests","Deploy production version"]]]},
  {title:"Phase 11: Portfolio Boss Fight", short:"Boss Fight", icon:"boss", weeks:"Weeks 45+", tag:"Build for real",
   note:"No more course collecting. Build something people could actually use.",
   stages:[
    ["Plan",["Pick a real problem","Write the MVP features","Sketch the architecture","Design the database","Create a GitHub repository"]],
    ["Build",["Build backend","Build frontend","Add authentication if needed","Add database","Test critical paths","Deploy v1"]],
    ["Polish",["Get someone to use it","Fix real bugs","Improve UX","Write a strong README","Write a portfolio case study","Add the project to your developer portfolio"]],
    ["Optional Deep Dive",["Build Your Own HTTP Server","Build Your Own Express","Explore Build Your Own X / CodeCrafters"]]]}
];

/* =========================================================
   PROGRESSION RULES
   Checkmark stages TRAIN stats (EVs). Submission stages give XP.
   XP is the only thing that raises level. Level drives evolution.
   ========================================================= */
const SUBMIT_W = {"Unlock":.6,"Project":1,"Projects":1,"Upgrade":1,"Build":.5,"Polish":.4,"Optional Deep Dive":.8};
const TRAIN = {"Learn":{log:4},"Tiny Wins":{atk:5,spd:3},"Plan":{foc:8}};
const isSubStage = name => name in SUBMIT_W;
const subKind = name => (name==="Unlock"||name==="Polish") ? "write" : "ship";
const subBaseXP = (pi,si) => Math.round(50*Math.pow(1.3,pi)*SUBMIT_W[phases[pi].stages[si][0]]);

const MAX_LV = 60;
const levelFloor = L => Math.round(Math.pow(L-1,2.2)*2);
function levelFor(xp){ let L=1; while(L<MAX_LV && levelFloor(L+1)<=xp) L++; return L; }
const EVO_LV = [1,16,32,50];
const FORM_MULT = [.7,.85,1,1.2];
const FORM_LABEL = ["Baby","Rookie","Adult","Mythic"];
const formFor = L => L>=EVO_LV[3]?3:L>=EVO_LV[2]?2:L>=EVO_LV[1]?1:0;

const STATS = [
  {k:"hp", n:"HP",    c:"#e0645a"},
  {k:"atk",n:"ATK",   c:"#f2b84b"},
  {k:"def",n:"DEF",   c:"#c9a26b"},
  {k:"log",n:"LOGIC", c:"#8ff7ff"},
  {k:"foc",n:"FOCUS", c:"#e58fb0"},
  {k:"spd",n:"SPD",   c:"#8fbf5a"}
];
const NATURES = [
  {n:"Caffeinated",   up:"spd",down:"foc"},
  {n:"Stubborn",      up:"def",down:"spd"},
  {n:"Galaxy-brained",up:"log",down:"atk"},
  {n:"Feral",         up:"atk",down:"log"},
  {n:"Zen",           up:"foc",down:"atk"},
  {n:"Chaotic",       up:"atk",down:"def"},
  {n:"Overthinking",  up:"log",down:"spd"},
  {n:"Deploys-on-Friday",up:"spd",down:"def"},
  {n:"Cozy",          up:"def",down:"atk"},
  {n:"Tabs-not-spaces",up:null,down:null}
];

const SPECIES = {
  goblin:{line:"Goblin", type:"Swamp", color:"#8FD16A", forms:["Gobbit","Grubnik","Hobgrunt","Gobzilla"],
    base:{hp:70,atk:85,def:60,log:75,foc:60,spd:90}, cry:"*goblin noises*", fav:"bug",
    sig:{name:"Gremlin Scramble",pow:40,desc:"Attacks from three directions. Two of them are wrong."},
    blurb:"Chaotic little menace. Eats bugs. Literally.",
    poke:["that's my face.","i bite. mostly bugs.","personal space is a web standard"],
    idle:["fun fact: goblins invented the semicolon. source: me","hydrate. goblins are 70% swamp water."]},
  dragon:{line:"Dragon", type:"Fire", color:"#FF8A5B", forms:["Embit","Scorchling","Pyrowyrm","Infernodrake"],
    base:{hp:78,atk:95,def:70,log:70,foc:55,spd:82}, cry:"*smoke puff*", fav:"coffee",
    sig:{name:"Ember Commit",pow:45,desc:"Force-pushes fire. Rewrites history."},
    blurb:"Hatches warm. Stays hot. Hoards commits like gold.",
    poke:["careful. i'm flammable. and so are you.","*sneezes a small fire*","the hoard is NOT for touching"],
    idle:["i sat on your repo to keep it warm.","someday i'll burn down a legacy codebase. someday."]},
  slime:{line:"Slime", type:"Ooze", color:"#6FE3D0", forms:["Blip","Gloopy","Slimeon","Omniooze"],
    base:{hp:110,atk:55,def:90,log:60,foc:85,spd:50}, cry:"*blorp*", fav:"cookie",
    sig:{name:"Gloop Merge",pow:40,desc:"Absorbs the merge conflict. Resolves nothing."},
    blurb:"Absorbs knowledge. And keys. And one semicolon it won't give back.",
    poke:["*jiggles aggressively*","you're sticky now. sorry.","boop absorbed."],
    idle:["i ate a div. it was centered.","everything is jelly if you believe."]},
  ghost:{line:"Ghost", type:"Spirit", color:"#B9AEE8", forms:["Boolet","Haunty","Spectrix","Voidwraith"], float:true,
    base:{hp:55,atk:60,def:55,log:100,foc:85,spd:95}, cry:"*ooOOoo*", fav:"coffee",
    sig:{name:"Phantom Bug",pow:45,desc:"Only appears in production."},
    blurb:"Haunts your 3am debugging sessions. Supportively.",
    poke:["your hand went through me. rude.","boo. i mean. ow.","i'm haunting your git log for that"],
    idle:["i'm the reason your tests are flaky. sorry.","the undefined... it whispers..."]},
  robot:{line:"Robot", type:"Circuit", color:"#9EC3E6", forms:["Bolty","Cogling","Mechanaut","Titan.exe"],
    base:{hp:80,atk:70,def:105,log:90,foc:60,spd:45}, cry:"*beep boop*", fav:"cookie",
    sig:{name:"Overclock",pow:50,desc:"Doubles SPD. Voids warranty."},
    blurb:"Runs on logic. Refuses to parse HTML with regex.",
    poke:["INPUT RECEIVED. EMOTION: ANNOYED.","fingerprint logged.","ERR_TOO_MANY_POKES"],
    idle:["01101000 01101001","these are browser cookies, right? *crunch*"]},
  kraken:{line:"Kraken", type:"Abyss", color:"#FF8FB1", forms:["Squib","Inklet","Krakode","Leviathan"],
    base:{hp:95,atk:88,def:72,log:80,foc:70,spd:45}, cry:"*bloop bloop*", fav:"bug",
    sig:{name:"Ink Injection",pow:50,desc:"Obscures everything. Like minified JS."},
    blurb:"Eight arms, eight open tabs. Types 300 WPM.",
    poke:["*inks a little*","i have 8 arms and all of them want you to code","sucker punch incoming (literally)"],
    idle:["i can type with all tentacles. you have excuses.","the deep web is just my house."]},
  glitch:{line:"Glitchcat", type:"Glitch", color:"#FF6FB5", forms:["Pixit","Bytecat","Glitchpaw","Nyan.null"],
    base:{hp:55,atk:80,def:50,log:85,foc:60,spd:120}, cry:"*mrrp.exe*", fav:"bug",
    sig:{name:"Glitch Pounce",pow:45,desc:"Hits before the page renders."},
    blurb:"Knocks your coffee off the desk. And your prod database.",
    poke:["*hisses in binary*","i will sit on your keyboard for that","mrrrp. [object Object]"],
    idle:["pushing things off tables is just DELETE with style.","i saw a bug. i must hunt."]},
  shroom:{line:"Shroom", type:"Spore", color:"#FFC14D", forms:["Sporelet","Shroomkin","Mycelord","Fungaia"],
    base:{hp:90,atk:60,def:80,log:70,foc:100,spd:50}, cry:"*squish*", fav:"cookie",
    sig:{name:"Spore Cloud",pow:40,desc:"Spreads calm. And mild hallucinations."},
    blurb:"Grows slowly. Networks with everything. Basically a microservice.",
    poke:["*puff* oops, spores.","i'm a fun guy. stop poking.","my mycelium felt that"],
    idle:["slow growth is still growth. i would know.","underground, i'm connected to every tree. and your wifi."]}
};
const SPECIES_ORDER = ["goblin","dragon","slime","ghost","robot","kraken","glitch","shroom"];

// first submission in a phase teaches the creature that phase's move
const MOVES = [
  {name:"Ping",           pow:30, desc:"Sends a request. Waits. Waits some more."},
  {name:"Semantic Slam",  pow:45, desc:"A <main> hit. Accessible damage."},
  {name:"Flexbox Flurry", pow:55, desc:"Hits everything. Perfectly centered."},
  {name:"Closure Clamp",  pow:65, desc:"Traps the target in outer scope forever."},
  {name:"Promise Barrage",pow:70, desc:"Hits 1–5 times. Eventually. Maybe."},
  {name:"Hook Shot",      pow:80, desc:"Re-renders the enemy until they give up."},
  {name:"Event Loop",     pow:85, desc:"Never blocks. Always comes back around."},
  {name:"Middleware Maul",pow:90, desc:"Intercepts the attack, then calls next()."},
  {name:"JOIN Crush",     pow:95, desc:"INNER JOIN on the opponent's face."},
  {name:"Hash Guard",     pow:60, desc:"Salted, peppered, unbreakable defence."},
  {name:"Type Shield",    pow:100,desc:"Blocks anything that isn't the right shape."},
  {name:"Ship It",        pow:140,desc:"The ultimate move. Deploys directly to prod."}
];

const SNACKS = [
  {id:"bug",   icon:"bug", name:"Bug",    full:22, line:"crunchy. just like your code."},
  {id:"cookie",icon:"cookie", name:"Cookie", full:28, line:"a cookie! (not the tracking kind.)"},
  {id:"coffee",icon:"coffee", name:"Coffee", full:12, line:"C A F F E I N E  A C Q U I R E D"}
];

const trophyDefs = [
  {id:"hatch",  icon:"egg", name:"Egg-cellent",     desc:"Hatch your companion"},
  {id:"first",  icon:"drop", name:"First Blood",     desc:"Clear your first quest"},
  {id:"ship",   icon:"box", name:"Shipped It",      desc:"Submit your first project"},
  {id:"ten",    icon:"coin", name:"Pocket Change",   desc:"Clear 10 quests"},
  {id:"phase",  icon:"castle", name:"Chamber Cleared", desc:"Finish a whole phase"},
  {id:"evo",    icon:"spiral", name:"What?!",          desc:"Your companion evolves"},
  {id:"live",   icon:"web", name:"It's Alive",      desc:"5 projects with live links"},
  {id:"half",   icon:"compass", name:"Halfway Hole",    desc:"Explore 50% of the warren"},
  {id:"streak3",icon:"flame", name:"Kindling",        desc:"3-day streak"},
  {id:"streak7",icon:"volcano", name:"Week of Fire",    desc:"7-day streak"},
  {id:"focus1", icon:"mushroom", name:"Mushroom Mind",   desc:"Finish a focus spell"},
  {id:"focus10",icon:"hourglass", name:"Deep Cave",       desc:"Finish 10 focus spells"},
  {id:"fed",    icon:"cookie", name:"Snack Dealer",    desc:"Feed your companion 20 times"},
  {id:"pet",    icon:"hand", name:"Head Pats",       desc:"Pet your companion 30 times"},
  {id:"bff",    icon:"hearts", name:"Best Friends",    desc:"Max out your bond"},
  {id:"night",  icon:"moon", name:"Night Owl",       desc:"Clear a quest after midnight"},
  {id:"early",  icon:"sunrise", name:"Dawn Raider",     desc:"Clear a quest before 7am"},
  {id:"poke",   icon:"pointer", name:"Creature Botherer",desc:"Poke your companion 25 times"},
  {id:"oi",     icon:"megaphone", name:"Self-Aware",      desc:"Get yelled at 10 times"},
  {id:"dice",   icon:"dice", name:"Indecisive",      desc:"Roll 20 quests"},
  {id:"mythic", icon:"sparkle", name:"Final Form",      desc:"Reach Mythic form"},
  {id:"konami", icon:"gamepad", name:"Cheat Codes",     desc:"↑↑↓↓←→←→BA"},
  {id:"king",   icon:"crown", name:"Final Boss",      desc:"Clear the whole roadmap"}
];

/* =========================================================
   STATE (v1/v2 keys preserved; creature + submissions are new)
   ========================================================= */
function load(key, fallback){ try{ const v=localStorage.getItem(key); return v===null?fallback:v; }catch(e){ return fallback; } }
function store(key, val){ try{ localStorage.setItem(key,val); }catch(e){} }
function unstore(key){ try{ localStorage.removeItem(key); }catch(e){} }
function loadJSON(key){ try{ return JSON.parse(load(key,"null")); }catch(e){ return null; } }

/* Saved progress lives only in this browser's localStorage, so an update must never wipe it.
   To change the saved format, bump DATA_VERSION and add a step that rewrites the old keys. */
const DATA_VERSION = 1;
const MIGRATIONS = {
  // 0 -> 1: drop the marker left by the one-off development reset; no progress data changes
  1(){ localStorage.removeItem("hqResetMarker"); }
};
try{
  let v=Number(localStorage.getItem("hqDataVersion"))||0;
  while(v<DATA_VERSION){ v++; MIGRATIONS[v](); localStorage.setItem("hqDataVersion",String(v)); }
}catch(e){}
const extraRaw = loadJSON("goblinExtra") || {};
const state = {
  done: loadJSON("goblinDone") || {},
  streak: Number(load("goblinStreak",0)) || 0,
  lastDate: load("goblinLastDate", null),
  trophies: extraRaw.trophies || {},
  pokes: Number(extraRaw.pokes) || 0,
  ois: Number(extraRaw.ois) || 0,
  rolls: Number(extraRaw.rolls) || 0,
  focusDone: Number(extraRaw.focusDone) || 0,
  bestStreak: Number(extraRaw.bestStreak) || Number(load("goblinStreak",0)) || 0,
  sound: extraRaw.sound !== false,
  focusMin: Number(extraRaw.focusMin) || 25,
  subs: loadJSON("hqSubs") || {},
  notes: loadJSON("hqNotes") || {},
  quiz: loadJSON("hqQuiz") || {},
  pet: cleanPet(loadJSON("hqCreature"))   // null until the player picks a starter
};

// a save from an old version, another device or an imported file may be missing companion fields
function cleanPet(p){
  if(!p||typeof p!=="object"||!SPECIES[p.species]) return null;
  const num=(v,d)=>Number.isFinite(Number(v))?Number(v):d;
  const ivs={}; STATS.forEach(s=>ivs[s.k]=Math.max(0,Math.min(31,Math.floor(num(p.ivs&&p.ivs[s.k],15)))));
  const snacks={}; SNACKS.forEach(s=>snacks[s.id]=Math.max(0,Math.min(9,Math.floor(num(p.snacks&&p.snacks[s.id],0)))));
  return {...p, nick:String(p.nick||SPECIES[p.species].forms[0]).slice(0,18), ivs, snacks,
    nature:NATURES[p.nature]?p.nature:NATURES.length-1, bond:Math.max(0,Math.min(255,num(p.bond,20))),
    full:Math.max(0,Math.min(100,num(p.full,70))), fullAt:num(p.fullAt,Date.now()), feeds:num(p.feeds,0), pets:num(p.pets,0),
    formSeen:num(p.formSeen,0), levelSeen:num(p.levelSeen,1),
    hatched:/^\d{4}-\d{2}-\d{2}$/.test(p.hatched)?p.hatched:today(), rewarded:p.rewarded&&typeof p.rewarded==="object"?p.rewarded:{}};
}

function newCreature(species, nick){
  const ivs={}; STATS.forEach(s=>ivs[s.k]=Math.floor(Math.random()*32));
  return {species, nick:nick||SPECIES[species].forms[0], ivs, nature:Math.floor(Math.random()*NATURES.length),
    hatched:today(), bond:20, full:70, fullAt:Date.now(), snacks:{bug:2,cookie:2,coffee:1}, feeds:0, pets:0,
    formSeen:formFor(level()), levelSeen:level()};
}

const subXP = () => Object.values(state.subs).reduce((a,s)=>a+(Number(s.xp)||0),0);
const level = () => levelFor(subXP());

function save(){
  if(window.HQSync&&HQSync.stale) return;   // a newer save exists elsewhere; don't overwrite this device's copy
  store("goblinDone", JSON.stringify(state.done));
  store("goblinStreak", String(state.streak));
  if(state.lastDate) store("goblinLastDate", state.lastDate); else unstore("goblinLastDate");
  store("goblinExtra", JSON.stringify({trophies:state.trophies,pokes:state.pokes,ois:state.ois,rolls:state.rolls,
    focusDone:state.focusDone,bestStreak:state.bestStreak,sound:state.sound,focusMin:state.focusMin}));
  store("hqSubs", JSON.stringify(state.subs));
  store("hqNotes", JSON.stringify(state.notes));
  store("hqQuiz", JSON.stringify(state.quiz));
  if(state.pet) store("hqCreature", JSON.stringify(state.pet)); else unstore("hqCreature");
  if(window.HQSync) HQSync.changed();
}

function today(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }
function updateStreak(){
  const t=today();
  if(state.lastDate===t) return;
  if(!state.lastDate) state.streak=1;
  else{
    const diff=Math.round((new Date(t+"T00:00:00Z")-new Date(state.lastDate+"T00:00:00Z"))/86400000);
    state.streak = diff===1 ? state.streak+1 : 1;
  }
  state.lastDate=t; state.bestStreak=Math.max(state.bestStreak,state.streak);
}
function liveStreak(){
  if(!state.lastDate) return 0;
  const diff=Math.round((new Date(today()+"T00:00:00Z")-new Date(state.lastDate+"T00:00:00Z"))/86400000);
  return diff<=1 ? state.streak : 0;
}

/* ---------- progression helpers ---------- */
const qid = (pi,si,qi) => pi+"-"+si+"-"+qi;
const stageComplete = (pi,si) => phases[pi].stages[si][1].every((q,qi)=>state.done[qid(pi,si,qi)]);
const phaseComplete = pi => phases[pi].stages.every((s,si)=>stageComplete(pi,si));
const phaseAvailable = pi => pi===0 || phaseComplete(pi-1);
function stageAvailable(pi,si){
  if(!phaseAvailable(pi)) return false;
  for(let i=0;i<si;i++) if(!stageComplete(pi,i)) return false;
  return true;
}
function currentPhase(){
  const i=phases.findIndex((p,pi)=>phaseAvailable(pi)&&!phaseComplete(pi));
  return i===-1 ? phases.length-1 : i;
}
function phaseProgress(pi){
  let t=0,d=0;
  phases[pi].stages.forEach((s,si)=>s[1].forEach((q,qi)=>{ t++; if(state.done[qid(pi,si,qi)]) d++; }));
  return {t,d,pct:t?d/t:0};
}
function allCounts(){
  let t=0,d=0;
  phases.forEach((p,pi)=>{ const pr=phaseProgress(pi); t+=pr.t; d+=pr.d; });
  return {t,d};
}
const quizPass = id => { const r=state.quiz[id]; return r&&Array.isArray(r.p)?r.p.filter(Boolean).length:0; };
const hasNote = id => !!(state.notes[id]&&String(state.notes[id].text||"").trim());
// a checkpoint is finished once its quiz is fully passed; project steps also need proof
const questComplete = (pi,si,qi) => { const id=qid(pi,si,qi); return quizPass(id)===5&&(!isSubStage(phases[pi].stages[si][0])||!!state.subs[id]); };
// quizzes became mandatory in v7: reopen anything that was ticked without passing its quiz
function reopenUnquizzed(){
  let n=0;
  Object.keys(state.done).forEach(id=>{
    const [pi,si,qi]=id.split("-").map(Number), ok=phases[pi]&&phases[pi].stages[si]&&phases[pi].stages[si][1][qi]!==undefined;
    if(!ok||!questComplete(pi,si,qi)){ delete state.done[id]; n++; }
  });
  return n;
}
const quizMigrated=reopenUnquizzed();
if(quizMigrated) save();
const rand = arr => arr[Math.floor(Math.random()*arr.length)];
// the companion device can live in a floating Picture-in-Picture window, so lookups fall back to it
let pipWin=null;
const $ = id => document.getElementById(id) || (pipWin ? pipWin.document.getElementById(id) : null);
// timers that animate the companion run on the floating window's clock when it is open (background tabs get throttled)
const later = (fn,ms) => { const w=pipWin||window; return {w,id:w.setTimeout(fn,ms)}; };
const cancel = t => { if(t) t.w.clearTimeout(t.id); };
const esc = s => String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const ic = (name, cls="") => '<svg class="ic'+(cls?" "+cls:"")+'" aria-hidden="true"><use href="#i-'+name+'"/></svg>';
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- stats: Pokémon-style formula, fed by level + form + IVs + EVs + nature ---------- */
function computeEVs(){
  const e={hp:0,atk:0,def:0,log:0,foc:0,spd:0};
  phases.forEach((p,pi)=>p.stages.forEach((s,si)=>{
    const tr=TRAIN[s[0]]; if(!tr) return;
    s[1].forEach((q,qi)=>{ if(state.done[qid(pi,si,qi)]) for(const k in tr) e[k]+=tr[k]; });
  }));
  const nSubs=Object.keys(state.subs).length;
  STATS.forEach(s=>e[s.k]+=nSubs*4);
  e.foc+=state.focusDone*10;
  e.hp+=state.bestStreak*6;
  e.def+=Math.min(state.pokes,60);
  if(state.pet){ e.hp+=state.pet.feeds*4; e.spd+=Math.min(state.pet.pets,40); }
  STATS.forEach(s=>e[s.k]=Math.min(252,e[s.k]));
  return e;
}
function computeStats(L, form, pet){
  pet=pet||state.pet; if(!pet) return null;
  const sp=SPECIES[pet.species], nat=NATURES[pet.nature]||NATURES[9], ev=computeEVs(), out={};
  STATS.forEach(({k})=>{
    const b=sp.base[k]*FORM_MULT[form], core=Math.floor((2*b + pet.ivs[k] + Math.floor(ev[k]/4))*L/100);
    if(k==="hp") out[k]=core+L+10;
    else out[k]=Math.floor((core+5)*(nat.up===k?1.1:nat.down===k?0.9:1));
  });
  return out;
}
const statsNow = () => { const L=level(); return computeStats(L, formFor(L)); };
function learnedMoves(){
  const sp=state.pet?SPECIES[state.pet.species]:null, out=[];
  if(sp) out.push({...sp.sig, sig:true});
  MOVES.forEach((m,pi)=>{ if(Object.keys(state.subs).some(id=>+id.split("-")[0]===pi)) out.push({...m, pi}); });
  return out;
}

/* =========================================================
   SOUND: tiny WebAudio chiptune, no files
   ========================================================= */
let actx=null;
function tone(freq, dur=.09, type="square", vol=.05, delay=0, slide=0){
  if(!state.sound) return;
  try{
    actx = actx || new (window.AudioContext||window.webkitAudioContext)();
    const t=actx.currentTime+delay, o=actx.createOscillator(), g=actx.createGain();
    o.type=type; o.frequency.setValueAtTime(freq,t);
    if(slide) o.frequency.exponentialRampToValueAtTime(slide,t+dur);
    g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    o.connect(g).connect(actx.destination); o.start(t); o.stop(t+dur+.02);
  }catch(e){}
}
const sfx = {
  check(){ tone(660,.07); tone(990,.12,"square",.05,.07); },
  uncheck(){ tone(440,.1,"triangle",.06,0,220); },
  coin(){ tone(988,.06,"square",.04); tone(1319,.18,"square",.04,.06); },
  level(){ [523,659,784,1047,1319].forEach((f,i)=>tone(f,.14,"square",.05,i*.09)); },
  poke(){ tone(300+Math.random()*300,.12,"sawtooth",.04,0,900); },
  angry(){ tone(140,.25,"sawtooth",.06,0,90); },
  oi(){ tone(220,.12,"sawtooth",.07); tone(180,.2,"sawtooth",.07,.12); },
  roll(){ tone(500+Math.random()*500,.03,"triangle",.03); },
  land(){ tone(784,.08,"triangle",.06); tone(1175,.2,"triangle",.06,.08); },
  done(){ [784,659,784,1047].forEach((f,i)=>tone(f,.2,"triangle",.07,i*.16)); },
  trophy(){ [1047,1319,1568,2093].forEach((f,i)=>tone(f,.1,"square",.035,i*.06)); },
  chomp(){ [0,.12,.24].forEach(d=>tone(180+Math.random()*60,.07,"square",.05,d,90)); },
  purr(){ tone(70,.35,"sawtooth",.025,0,60); },
  scan(){ tone(1400+Math.random()*600,.03,"sine",.02); },
  crack(){ tone(900,.05,"square",.05,0,300); },
  hatch(){ [392,523,659,784,1047].forEach((f,i)=>tone(f,.18,"triangle",.07,i*.08)); },
  evoTick(n){ tone(300+n*40,.06,"square",.035); },
  evolve(){ [523,659,784,1047,784,1047,1319,1568].forEach((f,i)=>tone(f,.22,"square",.05,i*.11)); tone(2093,.8,"triangle",.05,.9); }
};
/* =========================================================
   CREATURE ART: 8 species x 4 forms, sticker style.
   Thick navy outlines, flat fills, cel shading clipped inside each part.
   Hooks kept for animation: .c-body, .pupil/.shine (eye tracking),
   .eye-lid (blink), .brow, .blush, .mouth/.fang (moods), .acc (hats).
   All shapes are absolute-coordinate paths so mir() can mirror them.
   ========================================================= */
let SVG_UID=0, CLIP_N=0;
const OL="#2E2A40", SW=5;
const MOUTHS={
  idle:  "M-14 -3 Q0 12 14 -3 Q0 1 -14 -3 Z",
  happy: "M-20 -6 Q0 22 20 -6 Q0 -1 -20 -6 Z",
  shock: "M-8 2 Q0 -12 8 2 Q0 14 -8 2 Z",
  angry: "M-16 5 Q-8 -4 0 3 Q8 -4 16 5 Q0 1 -16 5 Z",
  focus: "M-10 0 Q0 4 10 0 Q0 1.5 -10 0 Z",
  sleepy:"M-6 0 Q0 5 6 0 Q0 2 -6 0 Z"
};
const r1 = v => +v.toFixed(1);
// ellipse as four cubic curves (no arcs, so it mirrors cleanly)
const E=(cx,cy,rx,ry=rx)=>{
  const kx=rx*.5523, ky=ry*.5523, f=r1;
  return `M${f(cx-rx)} ${f(cy)}C${f(cx-rx)} ${f(cy-ky)} ${f(cx-kx)} ${f(cy-ry)} ${f(cx)} ${f(cy-ry)}C${f(cx+kx)} ${f(cy-ry)} ${f(cx+rx)} ${f(cy-ky)} ${f(cx+rx)} ${f(cy)}C${f(cx+rx)} ${f(cy+ky)} ${f(cx+kx)} ${f(cy+ry)} ${f(cx)} ${f(cy+ry)}C${f(cx-kx)} ${f(cy+ry)} ${f(cx-rx)} ${f(cy+ky)} ${f(cx-rx)} ${f(cy)}Z`;
};
const RR=(x,y,w,h,r)=>`M${x+r} ${y}L${x+w-r} ${y}Q${x+w} ${y} ${x+w} ${y+r}L${x+w} ${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}L${x+r} ${y+h}Q${x} ${y+h} ${x} ${y+h-r}L${x} ${y+r}Q${x} ${y} ${x+r} ${y}Z`;
const ST4=(x,y,s)=>`M${x} ${y-s}Q${r1(x+s*.18)} ${r1(y-s*.18)} ${x+s} ${y}Q${r1(x+s*.18)} ${r1(y+s*.18)} ${x} ${y+s}Q${r1(x-s*.18)} ${r1(y+s*.18)} ${x-s} ${y}Q${r1(x-s*.18)} ${r1(y-s*.18)} ${x} ${y-s}Z`;
const mir = d => d.replace(/(-?\d+\.?\d*) (-?\d+\.?\d*)/g,(m,x,y)=>r1(200-parseFloat(x))+" "+y);
const sh = (d,c,op) => `<path d="${d}" fill="${c}"${op?` opacity="${op}"`:""}/>`;
const ln = (d,w=3.5,c=OL) => `<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const tube = (d,w,c) => ln(d,w+SW*2,OL)+ln(d,w,c);
// fill, clipped inner shading, then the outline on top
function part(d, fill, inner="", sw=SW){
  const id="cp"+(++CLIP_N);
  return `<path d="${d}" fill="${fill}"/>`+
    (inner?`<clipPath id="${id}"><path d="${d}"/></clipPath><g clip-path="url(#${id})">${inner}</g>`:"")+
    `<path d="${d}" fill="none" stroke="${OL}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
}
const twin = (d,fill,inner="",sw) => part(d,fill,inner,sw)+part(mir(d),fill,mir(inner),sw);
function eyes(pts,o){
  return pts.map(([cx,cy])=>{
    const r=o.r, m=o.m||r1(r*.35);
    return `<g><ellipse class="pupil" data-cx="${cx}" data-cy="${cy}" data-m="${m}" cx="${cx}" cy="${cy}" rx="${r1(r*.8)}" ry="${r}" fill="${o.color||OL}"/>`+
      `<circle class="shine" data-ox="${r1(r*.28)}" data-oy="${r1(-r*.38)}" cx="${r1(cx+r*.28)}" cy="${r1(cy-r*.38)}" r="${r1(r*.3)}" fill="#fff"/>`+
      `<ellipse class="eye-lid" cx="${cx}" cy="${cy}" rx="${r1(r*1.05)}" ry="${r1(r*1.2)}" fill="${o.skin}" stroke="${OL}" stroke-width="3"/></g>`;
  }).join("");
}
const blush=(a,b,y,rx,c="#FF9FB5")=>`<ellipse class="blush" cx="${a}" cy="${y}" rx="${rx}" ry="${r1(rx*.62)}" fill="${c}"/><ellipse class="blush" cx="${b}" cy="${y}" rx="${rx}" ry="${r1(rx*.62)}" fill="${c}"/>`;
const brows=(l,r,h=4)=>`<rect class="brow brow-l" x="${l[0]}" y="${l[1]}" width="${l[2]}" height="${h}" rx="${h/2}" fill="${OL}"/><rect class="brow brow-r" x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${h}" rx="${h/2}" fill="${OL}"/>`;
const mouth=(x,y,s,o={})=>`<g transform="translate(${x} ${y}) scale(${s})"><path class="mouth" d="${MOUTHS.idle}" fill="${o.fill||"#7A2E45"}" stroke="${o.stroke||OL}" stroke-width="${r1(3.5/s)}" stroke-linejoin="round"/>${o.fang?`<path class="fang" d="M-11 -2 L-8 5 L-4 -1 Z" fill="#fff" stroke="${OL}" stroke-width="${r1(2/s)}" stroke-linejoin="round"/>`:""}</g>`;
const acc=(x,y,s,noCrown)=>`<g transform="translate(${x} ${y}) scale(${s})">`+
  `<g class="acc acc-band">${part("M-50 34Q0 16 50 34L50 45Q0 27 -50 45Z","#FF6B6B","",4)}${part("M46 38L66 30L62 44L72 50L48 47Z","#FF6B6B","",4)}</g>`+
  `<g class="acc acc-hat">${part("M-16 6L10 -40L26 8Z","#FF8FB8",sh("M-10 -8L22 -18L24 -8L-12 2Z","#FFD166"),4)}${part(E(10,-42,6),"#FFD166","",3.5)}</g>`+
  (noCrown?"":`<g class="acc acc-crown">${part("M-28 8L-24 -20L-10 -4L0 -26L10 -4L24 -20L28 8Z","#FFD166",sh("M-30 0L30 0L30 10L-30 10Z","#F4B740"),4)}${part(E(0,-6,4),"#FF6B8A","",3)}</g>`)+`</g>`;
const star=(x,y,s,c,delay)=>`<g transform="translate(${x} ${y}) scale(${s})"><path class="spk" style="animation-delay:${delay}s" d="M0 -8Q1.5 -1.5 8 0Q1.5 1.5 0 8Q-1.5 1.5 -8 0Q-1.5 -1.5 0 -8Z" fill="${c}" stroke="${OL}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
const sparkles=c=>[[22,44,1.1],[178,52,1],[14,122,.8],[188,128,1.2],[58,14,.7],[150,14,.85]].map((p,i)=>star(p[0],p[1],p[2],c,i*.3)).join("");
const mythicFX=c=>`<circle cx="100" cy="100" r="94" fill="${c}" opacity=".35"/><circle class="rays" cx="100" cy="100" r="86" fill="none" stroke="${c}" stroke-width="5" stroke-dasharray="1 13" stroke-linecap="round"/>`;
const HL="#fff";

/* ---------------- GOBLIN ---------------- */
function drawGoblin(f){
  const G=f===3?"#9BE06E":"#8FD16A", Gs="#6DB44F", H="#4E8F3A", EAR="#FFB3C1", TUN="#F2A65A", TUNs="#DC8840", BR="#8A5A3C", BRs="#6E4630";
  if(f===0) return `
    ${twin("M58 100C44 96 26 86 14 72C18 94 32 112 60 120Z",G,sh("M8 80C24 98 40 110 64 114L64 130L4 130Z",Gs))}
    ${sh("M52 104C42 100 32 94 24 86C30 100 40 108 54 112Z",EAR)}${sh(mir("M52 104C42 100 32 94 24 86C30 100 40 108 54 112Z"),EAR)}
    ${part(E(84,183,12,7),G)}${part(E(116,183,12,7),G)}
    ${part("M70 150C68 176 80 187 100 187C120 187 132 176 130 150Z",TUN,sh("M112 146L140 146L140 192L106 192Z",TUNs))}
    ${part(E(100,170,4.5),"#FFD166","",3)}
    ${part(E(70,160,9),G)}${part(E(130,160,9),G,sh(E(136,166,9),Gs))}
    ${part(E(100,110,52,44),G,sh(E(124,134,54,40),Gs)+sh(E(76,86,14,8),HL,".45"))}
    ${ln("M100 66Q98 58 102 52",4.5,H)}${part("M102 54C108 42 124 42 128 48C120 58 108 58 102 54Z","#B9EB8A","",4)}
    ${blush(66,134,126,9)}
    ${eyes([[80,112],[120,112]],{r:10,skin:G})}
    ${brows([68,92,16],[116,92,16])}
    ${mouth(100,134,.8,{fang:1})}
    ${acc(100,68,.85)}`;
  if(f===1) return `
    ${twin("M56 80C40 74 20 60 8 42C12 70 28 94 58 102Z",G,sh("M2 52C20 72 36 86 60 92L60 110L0 110Z",Gs))}
    ${sh("M50 84C40 78 28 68 20 58C26 76 36 88 52 94Z",EAR)}${sh(mir("M50 84C40 78 28 68 20 58C26 76 36 88 52 94Z"),EAR)}
    ${twin("M84 158L82 180C82 186 96 186 96 180L96 158Z",G,sh("M90 156L100 156L100 190L90 190Z",Gs))}
    ${part(E(87,184,13,7),BR)}${part(E(113,184,13,7),BR,sh(E(120,188,13,6),BRs))}
    ${part("M66 168C62 138 78 122 100 122C122 122 138 138 134 168C124 174 76 174 66 168Z",TUN,sh("M114 118L150 118L150 180L110 180Z",TUNs))}
    ${part("M68 150L132 150L133 160L67 160Z",BR,"",4)}${part("M94 147L106 147L106 163L94 163Z","#FFD166","",3.5)}
    ${part("M70 134C56 132 46 122 42 110C40 102 50 98 54 106C58 116 66 120 76 122Z",G)}
    ${part("M130 132C142 138 148 150 146 160C144 168 134 166 134 158C134 150 128 144 124 140Z",G,sh("M140 128L160 128L160 172L136 172Z",Gs))}
    ${part("M84 48L90 28L100 44L110 26L116 46C106 42 94 42 84 48Z",H,"",4)}
    ${part(E(100,86,52,44),G,sh(E(124,110,54,40),Gs)+sh(E(76,62,14,8),HL,".45"))}
    ${blush(64,136,106,10)}
    ${eyes([[80,88],[120,88]],{r:11,skin:G})}
    ${brows([66,66,18],[116,66,18])}
    ${part(E(100,101,5,4),Gs,"",3)}
    ${mouth(100,113,.9,{fang:1})}
    ${acc(100,44,1)}`;
  const M=f===3, body=M?"#FFD166":TUN, bodyS=M?"#F4B740":TUNs, pad=M?"#FFD166":"#C9D4E3", padS=M?"#F4B740":"#9FAEC4";
  return `
    ${M?mythicFX("#D8F7B0"):""}
    ${M?part("M40 186C34 150 44 116 72 108L128 108C156 116 166 150 160 186Z","#FF6B6B",sh("M128 100L172 100L172 192L124 192Z","#E04F57")):""}
    ${M?`<circle class="glow" cx="180" cy="60" r="22" fill="#D8FF9E" opacity=".6"/>`+tube("M170 188L178 74",7,BR)+part(E(180,60,13),"#B9F27C",sh(E(185,65,13),"#8FD16A")+sh(E(176,55,4),HL,".8"))
       :part("M152 186C146 158 146 124 158 106C168 94 186 102 182 118C176 138 170 160 166 186Z",BR,sh("M170 96L192 96L192 192L164 192Z",BRs)+sh(E(162,126,3),BRs)+sh(E(168,146,3),BRs))}
    ${twin("M60 60C40 50 18 32 4 12C8 44 26 76 58 86Z",G,sh("M0 26C18 50 36 66 62 74L62 92L0 92Z",Gs))}
    ${sh("M54 64C40 56 26 44 16 30C22 50 36 66 56 74Z",EAR)}${sh(mir("M54 64C40 56 26 44 16 30C22 50 36 66 56 74Z"),EAR)}
    ${twin("M76 166L74 182C74 190 96 190 96 182L96 166Z",G,sh("M88 162L100 162L100 194L88 194Z",Gs))}
    ${part(E(84,186,15,7),BR)}${part(E(116,186,15,7),BR,sh(E(124,190,15,6),BRs))}
    ${part("M50 176C46 132 68 104 100 104C132 104 154 132 150 176C130 184 70 184 50 176Z",body,sh("M118 98L162 98L162 190L112 190Z",bodyS))}
    ${part("M52 150L148 150L149 162L51 162Z",BR,"",4)}${part(E(100,156,9,8),M?"#B9F27C":"#FFD166","",3.5)}
    ${twin("M52 120C36 132 30 156 36 172C40 182 54 180 54 170C54 156 58 140 66 130Z",G,sh("M26 152L60 152L60 192L26 192Z",Gs))}
    ${part(E(44,176,11),G)}${part(E(156,176,11),G,sh(E(162,182,11),Gs))}
    ${twin("M36 124C36 104 52 96 70 100C76 112 70 128 56 134C46 136 38 132 36 124Z",pad,sh("M58 92L82 92L82 142L54 142Z",padS))}
    ${twin("M46 104L42 88L56 100Z","#F5F7FB","",3.5)}
    ${M?"":part("M92 30C88 18 96 8 104 10C112 12 112 24 106 30Z",H,"",4)+part("M89 28L111 28L111 34L89 34Z","#FF6B6B","",3.5)}
    ${part(E(100,62,44,38),G,sh(E(122,84,46,34),Gs)+sh(E(80,42,12,7),HL,".45"))}
    ${M?part("M66 34L70 8L84 24L100 2L116 24L130 8L134 34Z","#FFD166",sh("M60 26L140 26L140 40L60 40Z","#F4B740"))+part(E(100,22,5),"#FF6B8A","",3)+part(E(80,28,3),"#8FF0FF","",2.5)+part(E(120,28,3),"#8FF0FF","",2.5):""}
    ${ln("M124 44L132 58",3.5,"#4E8F3A")}
    ${blush(68,132,80,8)}
    ${eyes([[82,62],[118,62]],{r:9,skin:G})}
    ${ln("M68 46L90 51",5.5)}${ln("M132 46L110 51",5.5)}
    ${brows([70,44,14],[116,44,14])}
    ${part(E(100,75,7,6),Gs,"",3.5)}
    ${mouth(100,88,.9)}
    ${part("M84 93L86 80L92 90Z","#fff","",3)}${part("M116 93L114 80L108 90Z","#fff","",3)}
    ${M?`<g class="glow">${ln("M62 138L70 144L62 150",3.5,"#B9F27C")}${ln("M138 138L130 144L138 150",3.5,"#B9F27C")}</g>`:""}
    ${acc(100,26,1,M)}
    ${M?sparkles("#FFD166"):""}`;
}

/* ---------------- DRAGON ---------------- */
function drawDragon(f){
  const D="#FF8A5B", Ds="#E96A45", Bl="#FFD98A", Bls="#F7C063", HO="#FFF1D6", HOs="#F2D9AE", WG="#FFB86B", WGs="#F59A4A";
  if(f===0) return `
    <circle class="drift" cx="128" cy="70" r="5" fill="#fff" stroke="${OL}" stroke-width="2.5"/><circle class="drift" style="animation-delay:1.3s" cx="138" cy="58" r="3.5" fill="#fff" stroke="${OL}" stroke-width="2.5"/>
    ${twin("M62 110C46 96 30 98 28 112C38 110 40 120 48 124C52 118 58 118 64 124Z",WG,sh("M24 116L70 116L70 132L24 132Z",WGs))}
    ${twin("M76 86C70 76 70 66 76 58C82 66 88 74 90 82Z",HO,sh("M82 56L98 56L98 92L86 92Z",HOs),4)}
    ${part(E(100,122,46,42),D,sh(E(124,142,48,38),Ds)+sh(E(78,98,12,7),HL,".45"))}
    ${blush(66,134,128,8)}
    ${eyes([[82,116],[118,116]],{r:9,skin:D})}
    ${brows([70,98,15],[115,98,15])}
    ${sh(E(95,130,1.8),OL)}${sh(E(105,130,1.8),OL)}
    ${mouth(100,139,.55,{fang:1})}
    ${part("M50 152L62 140L74 152L86 140L100 152L114 140L126 152L138 140L150 152C152 178 130 192 100 192C70 192 48 178 50 152Z","#FFF8EC",sh("M122 140L160 140L160 196L116 196Z","#EDE2CC")+sh(E(72,172,6),"#F9CBB0")+sh(E(128,178,7),"#F9CBB0"))}
    ${acc(100,80,.75)}`;
  if(f===1) return `
    ${tube("M122 170C150 176 168 164 170 140C171 128 166 120 160 116",12,D)}
    <g class="flame">${part("M160 118C148 106 152 90 162 82C164 94 172 92 176 100C182 112 174 122 160 118Z","#FFD166",sh("M160 112C156 104 160 96 164 92C166 100 170 102 170 108C170 114 164 116 160 112Z","#FF8A5B"),4)}</g>
    ${twin("M70 132C50 110 28 112 24 128C36 126 38 138 48 142C54 134 60 136 68 144Z",WG,sh("M20 134L76 134L76 152L20 152Z",WGs))}
    ${twin("M84 166L82 180C82 188 98 188 98 180L98 166Z",D,sh("M90 164L102 164L102 192L90 192Z",Ds))}
    ${part(E(100,148,34,32),D,sh(E(118,166,36,30),Ds))}
    ${part(E(100,158,20,18),Bl,sh(E(108,166,20,16),Bls),4)}
    ${twin("M72 142C62 146 58 156 62 162C66 166 72 160 76 156Z",D)}
    ${twin("M72 56C62 44 60 30 66 22C74 34 84 42 88 50Z",HO,sh("M76 20L96 20L96 58L82 58Z",HOs),4)}
    ${part("M86 50L94 36L100 48L106 36L114 50Z",Ds,"",4)}
    ${part(E(100,86,48,40),D,sh(E(124,108,50,36),Ds)+sh(E(78,62,13,7),HL,".45"))}
    ${blush(62,138,98,9)}
    ${eyes([[80,82],[120,82]],{r:11,skin:D})}
    ${brows([66,62,18],[116,62,18])}
    ${part(E(100,106,24,14),"#FFA27A",sh(E(108,112,24,12),"#F58860"),4)}
    ${sh(E(93,103,2.2),OL)}${sh(E(107,103,2.2),OL)}
    ${mouth(100,114,.55,{fang:1})}
    ${acc(100,48,.95)}`;
  const M=f===3, b=M?"#FF6F5E":D, bs=M?"#E5533F":Ds, wing=M?"#FFC76B":WG, wingS=M?"#FFA94D":WGs, horn=M?"#FFD166":HO, hornS=M?"#F4B740":HOs;
  return `
    ${M?mythicFX("#FFD9A8"):""}
    ${twin("M64 110C40 60 10 50 4 72C16 74 14 92 24 98C12 108 18 122 32 122C26 134 36 146 48 140C54 132 60 128 70 132Z",wing,sh("M0 104L76 104L76 152L0 152Z",wingS))}
    ${ln("M64 110L12 70M64 112L22 100M66 118L34 124",3.5)}${ln(mir("M64 110L12 70M64 112L22 100M66 118L34 124"),3.5)}
    ${tube("M130 176C164 182 182 168 184 142C185 128 180 118 174 114",14,b)}
    <g class="flame">${part("M174 116C160 102 164 82 176 72C178 86 188 84 192 94C198 108 190 120 174 116Z",M?"#8FF0FF":"#FFD166",sh("M174 110C170 100 174 90 178 86C180 94 186 96 186 102C186 110 178 112 174 110Z",M?"#4FD6E8":"#FF8A5B"),4)}</g>
    ${twin("M72 162L68 182C68 190 92 190 92 182L92 162Z",b,sh("M82 158L96 158L96 196L82 196Z",bs))}
    ${part("M56 176C50 132 70 108 100 108C130 108 150 132 144 176C128 186 72 186 56 176Z",b,sh("M118 102L160 102L160 192L112 192Z",bs))}
    ${part(E(100,152,24,27),M?"#FFE29A":Bl,sh(E(110,162,24,24),Bls)+ln("M80 146L120 146M80 160L120 160",4,Bls))}
    ${M?`<circle class="glow" cx="100" cy="150" r="17" fill="#9FF3FF" opacity=".55"/>`+part(E(100,150,9),"#6FE3F2",sh(E(97,147,3),HL),4):""}
    ${twin("M64 130C48 138 42 156 48 166C54 172 62 164 64 156C66 148 70 144 76 140Z",b,sh("M40 150L72 150L72 176L40 176Z",bs))}
    ${twin("M74 56C60 42 56 28 62 20C70 32 82 40 90 48Z",horn,sh("M72 18L96 18L96 54L80 54Z",hornS),4)}
    ${part("M86 44L94 32L100 42L106 32L114 44Z",bs,"",4)}
    ${part(E(100,76,42,34),b,sh(E(120,94,44,30),bs)+sh(E(80,56,11,6),HL,".45"))}
    ${M?`<g class="flame">${part("M72 48C66 34 72 22 80 18C80 28 86 30 90 26C92 36 98 36 100 24C104 36 110 36 110 26C116 30 120 28 120 18C128 22 134 34 128 48C110 42 90 42 72 48Z","#FFD166",sh("M80 48C78 38 84 32 88 32C92 38 108 38 112 32C118 34 122 40 120 48Z","#FF8A5B"),4)}</g>`:""}
    ${blush(68,132,86,8)}
    ${eyes([[82,72],[118,72]],{r:9,skin:b})}
    ${brows([70,54,14],[116,54,14])}
    ${part(E(100,96,22,13),M?"#FF8A78":"#FFA27A",sh(E(108,102,22,11),M?"#F0665A":"#F58860"),4)}
    ${sh(E(94,93,2),OL)}${sh(E(106,93,2),OL)}
    ${mouth(100,104,.55,{fang:1})}
    ${acc(100,44,.9,M)}
    ${M?sparkles("#FFD166"):""}`;
}

/* ---------------- SLIME ---------------- */
function drawSlime(f){
  const S="#6FE3D0", Ss="#45C7B4", Sd="#2FA898", Sl="#B9F5EA";
  if(f===0) return `
    <g class="drift">${part(E(146,118,4,5),S,"",2.5)}</g>
    ${part("M100 104C116 124 138 140 138 162C138 182 122 190 100 190C78 190 62 182 62 162C62 140 84 124 100 104Z",S,sh(E(124,178,34,26),Ss)+sh("M76 152C78 138 86 128 94 120C90 134 84 144 80 158Z",HL,".75"))}
    ${blush(76,124,172,5)}
    ${eyes([[88,160],[112,160]],{r:7,skin:S})}
    ${brows([82,146,10],[108,146,10],3)}
    ${mouth(100,174,.4)}
    ${acc(100,110,.45)}`;
  if(f===1) return `
    ${tube("M100 96Q96 80 102 68",5,Ss)}${part(E(102,64,9),Sl,sh(E(106,68,9),S),4)}
    ${part("M100 90C142 90 166 124 166 158C166 178 156 188 140 188C134 188 130 182 124 184C116 190 108 186 100 188C92 190 84 184 76 188C58 190 34 184 34 160C34 124 58 90 100 90Z",S,sh(E(134,170,52,40),Ss)+sh("M50 136C52 114 64 100 80 94C72 110 64 124 58 142Z",HL,".75")+sh(E(140,150,6),HL,".55")+sh(E(148,164,3),HL,".55"))}
    ${blush(60,140,154,9)}
    ${eyes([[80,136],[120,136]],{r:11,skin:S})}
    ${brows([68,116,18],[114,116,18])}
    ${mouth(100,158,.7)}
    ${acc(100,90,.95)}`;
  const M=f===3, b=M?"#7DEBD6":S, bs=M?"#52D2BE":Ss;
  const inner=M?[[52,150,5],[150,162,4],[70,76,3.5],[140,86,4.5],[40,112,3],[160,124,3],[100,178,4]].map(p=>sh(ST4(p[0],p[1],p[2]),HL)).join("")
    :sh(E(146,122,5),Sd,".55")+sh("M142 136C148 136 150 144 142 150Z",Sd,".55")+sh(E(46,160,7),HL,".45")+sh(E(58,176,4),HL,".45");
  return `
    ${M?mythicFX("#C8F7EF"):""}
    ${M?ln("M66 24C66 16 134 16 134 24C134 32 66 32 66 24Z",11,OL)+`<g class="glow">${ln("M66 24C66 16 134 16 134 24C134 32 66 32 66 24Z",6,"#FFD166")}</g>`:""}
    ${twin("M22 136C8 134 4 146 12 152C18 156 24 150 28 146Z",b)}
    ${part("M100 44C112 44 118 30 128 28C136 30 134 44 142 52C168 70 186 110 186 150C186 176 170 190 146 188C134 194 120 186 110 190C94 194 80 186 66 190C36 192 14 176 14 150C14 110 34 70 60 52C68 44 64 30 72 28C82 30 88 44 100 44Z",b,sh(E(142,164,72,50),bs)+sh("M34 122C36 92 50 72 70 60C60 82 50 102 46 126Z",HL,".75")+inner)}
    ${blush(50,150,128,11)}
    ${eyes([[76,106],[124,106]],{r:13,skin:b})}
    ${brows([60,82,24],[116,82,24])}
    ${mouth(100,136,.9)}
    ${M?`<g class="orbit" style="transform-origin:100px 116px">${part(E(100,4,9),"#FFB3D1","",3.5)}${part(E(194,150,8),"#FFD166","",3.5)}${part(E(8,158,8),"#9FDFFF","",3.5)}</g>`:""}
    ${acc(100,44,1.1)}
    ${M?sparkles("#FFD166"):""}`;
}

/* ---------------- GHOST ---------------- */
function drawGhost(f){
  const W="#FFFFFF", Gh="#E4DEF7";
  if(f===0) return `
    ${twin("M60 136C48 136 44 146 50 152C56 154 60 148 64 146Z",W,sh("M42 147L68 147L68 158L42 158Z",Gh))}
    ${part("M100 92C128 92 144 112 144 140L144 172C138 180 130 168 122 174C116 180 108 168 100 176C92 184 84 168 78 174C70 180 62 168 56 172L56 140C56 112 72 92 100 92Z",W,sh("M122 88C152 100 156 140 152 184L118 184C132 150 136 116 122 88Z",Gh))}
    ${blush(72,128,146,6)}
    ${eyes([[86,132],[114,132]],{r:8,skin:W})}
    ${brows([79,118,13],[108,118,13],3)}
    ${mouth(100,150,.45)}
    ${acc(100,94,.6)}`;
  if(f===1) return `
    ${twin("M50 124C32 118 24 132 32 140C40 146 48 138 54 134Z",W,sh("M22 135L58 135L58 150L22 150Z",Gh))}
    ${part("M100 58C142 58 160 90 160 128L160 176C150 188 140 170 130 180C122 190 110 172 100 184C90 196 78 172 70 180C60 190 50 170 40 178L40 128C40 90 58 58 100 58Z",W,sh("M130 54C172 70 174 130 170 194L126 194C148 150 150 90 130 54Z",Gh))}
    ${part("M100 58C92 44 74 42 72 54C72 64 88 66 100 60C112 66 128 64 128 54C126 42 108 44 100 58Z","#FF8FB8",sh("M100 50L132 50L132 70L100 70Z","#F06A9A"),4)}${part(E(100,58,6),"#FF6B9A","",3.5)}
    ${blush(62,138,130,9)}
    ${eyes([[80,110],[120,110]],{r:11,skin:W})}
    ${brows([66,90,18],[116,90,18])}
    ${mouth(100,136,.7)}
    ${acc(100,62,1)}`;
  const M=f===3, cloak=M?"#3D4470":"#C9BFEE", cloakS=M?"#2E3458":"#B2A5E6", glowC=M?"#8FF3FF":"#FFE38A";
  const stars=M?[[60,160,3],[140,150,3.5],[48,120,2.5],[152,108,3],[96,176,3],[76,140,2],[124,170,2.5]].map(p=>sh(ST4(p[0],p[1],p[2]),"#fff")).join(""):"";
  return `
    ${M?mythicFX("#BFE9FF")+`<g class="orbit" style="transform-origin:100px 100px">${part(E(100,6,7),"#8FF3FF","",3)}${part(E(12,150,6),"#C9F7FF","",3)}${part(E(190,140,6),"#8FF3FF","",3)}</g>`:""}
    ${part("M100 22C150 22 168 70 166 116L176 184C160 172 148 190 132 180C120 192 108 176 96 190C82 176 70 190 58 180C46 188 34 174 24 184L34 116C32 70 50 22 100 22Z",cloak,sh("M130 18C176 40 184 120 186 194L140 194C156 140 158 70 130 18Z",cloakS)+stars)}
    ${tube("M150 118C170 122 178 136 176 146",10,cloak)}
    ${ln("M176 146L176 154",4)}
    <circle class="glow" cx="176" cy="167" r="17" fill="${glowC}" opacity=".5"/>
    ${part("M166 154L186 154L188 180L164 180Z","#5B5470",sh(RR(169,158,14,18,3),glowC),4)}
    ${part("M100 44C132 44 144 72 142 100C140 128 122 142 100 142C78 142 60 128 58 100C56 72 68 44 100 44Z",OL,sh(E(116,122,40,24),"#231F33"),4)}
    ${eyes([[82,94],[118,94]],{r:10,color:glowC,skin:OL})}
    ${mouth(100,120,.55,{fill:"#1E1A2C",stroke:glowC})}
    ${M?`<g class="flame">${part("M72 26C66 14 72 4 78 0C80 10 86 10 90 6C92 16 98 16 100 2C104 16 110 16 110 6C116 10 120 10 122 0C128 4 134 14 128 26C110 22 90 22 72 26Z","#8FF3FF",sh("M80 26C80 18 86 14 90 14C94 20 106 20 110 14C116 16 120 20 120 26Z","#4FD6E8"),4)}</g>`:""}
    ${acc(100,24,1,M)}
    ${M?sparkles("#8FF3FF"):""}`;
}
/* ---------------- ROBOT ---------------- */
function drawRobot(f){
  const St="#C8DAEB", Sts="#9FBAD3", Std="#7C9AB8", Scr="#2E3A55", Gw="#7CF3E6", Am="#FFC857";
  if(f===0) return `
    ${ln("M100 86L100 68",4.5)}<g class="bulb">${part(E(100,62,8),Am,sh(E(104,66,8),"#F4AE3A"),4)}</g>
    ${part(E(100,178,13),"#5B6478",sh(E(105,182,13),"#454D5F"))}${part(E(100,178,5),St,"",3.5)}
    ${part("M78 150L122 150L118 170L82 170Z",Sts,"",4.5)}
    ${part(E(50,120,8),Am,"",4)}${part(E(150,120,8),Am,"",4)}
    ${part(RR(50,84,100,72,18),St,sh("M122 80L160 80L160 160L114 160Z",Sts)+sh(RR(60,90,26,6,3),HL,".6"))}
    ${part(RR(62,98,76,44,9),Scr,"",4)}
    ${blush(74,126,133,4,"#FF8FB8")}
    ${eyes([[86,116],[114,116]],{r:7,color:Gw,skin:Scr})}
    ${brows([79,102,14],[107,102,14],3)}
    ${mouth(100,131,.36,{fill:Gw,stroke:Gw})}
    ${acc(100,84,.8)}`;
  if(f===1) return `
    ${ln("M78 54L68 34",4)}<g class="bulb">${part(E(66,30,6),Am,"",3.5)}</g>
    ${ln("M122 54L132 34",4)}<g class="bulb" style="animation-delay:.45s">${part(E(134,30,6),"#FF6B6B","",3.5)}</g>
    ${twin("M80 166L78 180L94 180L94 166Z",Sts,"",4.5)}
    ${twin("M70 180L98 180C100 190 68 190 70 180Z","#5B6478")}
    ${tube("M62 138C48 144 42 156 42 164",9,Sts)}${tube(mir("M62 138C48 144 42 156 42 164"),9,Sts)}
    ${part(E(42,170,8),Am,"",4)}${part(E(158,170,8),Am,"",4)}
    ${part(RR(58,126,84,48,12),St,sh("M122 120L150 120L150 180L116 180Z",Sts))}
    ${part(RR(80,136,40,26,5),Scr,"",4)}
    ${sh(RR(86,150,5,8,1),Gw)}${sh(RR(95,144,5,14,1),Gw)}${sh(RR(104,147,5,11,1),Am)}${sh(RR(113,141,4,17,1),Gw)}
    ${part(RR(92,116,16,12,3),Std,"",4)}
    ${part(RR(56,52,88,72,18),St,sh("M122 48L152 48L152 128L116 128Z",Sts)+sh(RR(66,58,24,6,3),HL,".6"))}
    ${part(RR(66,64,68,48,11),Scr,"",4)}
    ${blush(76,124,103,5,"#FF8FB8")}
    ${eyes([[86,86],[114,86]],{r:8,color:Gw,skin:Scr})}
    ${brows([78,70,16],[106,70,16],3)}
    ${mouth(100,102,.42,{fill:Gw,stroke:Gw})}
    ${acc(100,52,.95)}`;
  const M=f===3, s=M?"#3C4A6E":St, ss=M?"#2E3A58":Sts, trim=M?"#FFD166":Std, trimS=M?"#F4B740":"#627F9C";
  return `
    ${M?mythicFX("#BFE3FF"):""}
    ${M?`<g class="flame">${part("M64 178C64 196 74 202 78 190C82 202 90 196 88 178Z","#8FF3FF",sh("M72 178C72 188 76 192 78 186C80 192 84 188 82 178Z",HL),4)}</g><g class="flame" style="animation-delay:.15s">${part(mir("M64 178C64 196 74 202 78 190C82 202 90 196 88 178Z"),"#8FF3FF",sh(mir("M72 178C72 188 76 192 78 186C80 192 84 188 82 178Z"),HL),4)}</g>`:""}
    ${twin("M66 158L62 184L92 184L90 158Z",trim,sh("M80 154L96 154L96 190L80 190Z",trimS))}
    ${twin("M42 118C28 128 22 150 26 168C28 178 44 178 46 168C48 152 52 138 60 130Z",s,sh("M36 140L62 140L62 182L36 182Z",ss))}
    ${part(E(34,174,13),trim,sh(E(40,180,13),trimS))}${part(E(166,174,13),trim,sh(E(172,180,13),trimS))}
    ${part("M46 118C46 106 56 100 68 100L132 100C144 100 154 106 154 118L148 166C146 176 138 180 128 180L72 180C62 180 54 176 52 166Z",s,sh("M122 96L160 96L160 186L116 186Z",ss))}
    ${twin("M24 104C24 88 38 80 56 84C64 96 60 116 44 122C32 124 24 116 24 104Z",trim,sh("M42 78L68 78L68 126L40 126Z",trimS))}
    ${part(E(100,140,20),Scr,"",4.5)}<circle class="glow" cx="100" cy="140" r="12" fill="${Gw}"/>${part(E(100,140,6),"#DFFFFB","",3)}
    ${part("M100 30L92 10L108 10Z",M?"#FFD166":Am,"",4)}
    ${part(RR(62,28,76,66,16),s,sh("M118 24L144 24L144 98L112 98Z",ss)+sh(RR(70,34,20,5,2.5),HL,".5"))}
    ${part(RR(70,40,60,40,10),Scr,"",4)}
    ${part(E(60,60,6),trim,"",3.5)}${part(E(140,60,6),trim,"",3.5)}
    ${eyes([[88,58],[112,58]],{r:7,color:Gw,skin:Scr})}
    ${brows([80,44,16],[104,44,16],3)}
    ${mouth(100,72,.34,{fill:Gw,stroke:Gw})}
    ${M?`<g class="glow">${ln("M28 60C28 46 172 46 172 60C172 74 28 74 28 60Z",3,"#8FF3FF")}</g><g class="orbit" style="transform-origin:100px 110px">${part("M100 -4L108 1L108 10L100 15L92 10L92 1Z","#FFD166","",3)}${part("M8 170L16 175L16 184L8 189L0 184L0 175Z","#8FF3FF","",3)}${part("M192 170L200 175L200 184L192 189L184 184L184 175Z","#8FF3FF","",3)}</g>`:""}
    ${acc(100,30,.85)}
    ${M?sparkles("#FFD166"):""}`;
}

/* ---------------- KRAKEN ---------------- */
function drawKraken(f){
  const K="#FF8FB1", Ks="#EE6E97", Kl="#FFD1DE";
  const spots=list=>list.map(p=>sh(E(p[0],p[1],p[2]),Kl)).join("");
  if(f===0){
    const T=["M84 160Q80 176 70 180","M95 162Q94 180 88 186"];
    return `
    <circle class="drift" cx="142" cy="104" r="5" fill="#DFF8FF" stroke="${OL}" stroke-width="2.5"/><circle class="drift" style="animation-delay:1s" cx="152" cy="118" r="3.5" fill="#DFF8FF" stroke="${OL}" stroke-width="2.5"/>
    ${T.map(d=>tube(d,9,K)+tube(mir(d),9,K)).join("")}
    ${twin("M64 118C48 110 46 96 50 90C60 96 68 104 72 112Z",K,"",4.5)}
    ${part("M100 84C126 84 140 110 140 136C140 158 124 170 100 170C76 170 60 158 60 136C60 110 74 84 100 84Z",K,sh(E(124,152,36,30),Ks)+sh(E(82,104,9,6),HL,".5")+spots([[88,96,4],[116,98,3],[102,90,2.5]]))}
    ${blush(72,128,150,6)}
    ${eyes([[86,134],[114,134]],{r:9,skin:K})}
    ${brows([78,118,13],[109,118,13],3)}
    ${mouth(100,152,.4)}
    ${acc(100,86,.7)}`;
  }
  if(f===1){
    const T=["M70 150C44 152 34 170 44 182C50 188 58 182 54 176","M84 164C72 180 76 194 88 194","M96 168C96 184 100 192 108 190"];
    return `
    ${T.map(d=>tube(d,12,K)+tube(mir(d),12,K)).join("")}
    ${sh(E(52,180,2.5),Kl)}${sh(E(148,180,2.5),Kl)}
    ${part(E(100,110,56,52),K,sh(E(126,134,58,48),Ks)+sh(E(76,80,14,8),HL,".5")+spots([[70,90,6],[132,84,4],[104,70,3.5],[146,110,3]]))}
    ${blush(60,140,132,10)}
    ${eyes([[80,112],[120,112]],{r:12,skin:K})}
    ${brows([66,90,18],[116,90,18])}
    ${mouth(100,138,.7)}
    ${acc(100,58,1)}`;
  }
  const M=f===3, b=M?"#FF7AA8":K, bs=M?"#E85C8E":Ks, sk=M?"#8FF3FF":Kl;
  const T=["M56 130C18 124 8 158 24 176C34 186 46 178 40 168","M66 150C40 170 44 192 60 194","M82 162C70 184 76 198 90 196","M94 168C94 188 98 198 106 196"];
  return `
    ${M?mythicFX("#FFD2E2"):""}
    ${M?tube("M172 192L178 42",6,"#FFD166")+part("M162 56C158 34 162 18 168 14L172 44L178 10L184 44L188 14C194 18 198 34 194 56Z","#FFD166",sh("M178 30L200 30L200 60L178 60Z","#F4B740"),4)
       :""}
    ${T.map(d=>tube(d,15,b)+tube(mir(d),15,b)).join("")}
    ${[[24,176],[176,176],[60,192],[140,192]].map(p=>M?`<circle class="glow" cx="${p[0]}" cy="${p[1]}" r="3.5" fill="${sk}"/>`:sh(E(p[0],p[1],3),sk)).join("")}
    ${part("M100 18C152 18 170 62 168 102C166 142 138 164 100 164C62 164 34 142 32 102C30 62 48 18 100 18Z",b,sh(E(132,120,62,52),bs)+sh(E(70,48,14,8),HL,".5")+spots([[62,60,7],[140,52,5],[46,90,4],[154,84,4]]))}
    ${M?"":tube("M156 122C180 110 186 90 180 72",12,b)+part(RR(152,36,46,32,5),"#2E3A55","",4)+`<text x="175" y="57" text-anchor="middle" font-family="JetBrains Mono,Martian Mono,monospace" font-size="13" font-weight="800" fill="#7CF3E6">&lt;/&gt;</text>`}
    ${M?`<g class="glow">${ln("M58 124L64 118L70 124",3,"#8FF3FF")}${ln("M130 124L136 118L142 124",3,"#8FF3FF")}</g>`:""}
    ${blush(52,148,122,11)}
    ${eyes([[76,98],[124,98]],{r:13,skin:b})}
    ${brows([60,74,24],[116,74,24])}
    ${mouth(100,132,.9)}
    ${M?part("M70 28L74 6L88 20L100 2L112 20L126 6L130 28Z","#FFD166",sh("M64 22L136 22L136 32L64 32Z","#F4B740"))+part(E(100,16,4.5),"#8FF3FF","",3):""}
    ${acc(100,20,1.1,M)}
    ${M?sparkles("#8FF3FF"):""}`;
}

/* ---------------- GLITCHCAT ---------------- */
function drawGlitch(f){
  const C="#5E6488", Cs="#4A4F70", Cm="#FFFFFF", Ci="#FF8FC4", Cy="#5EE7F2", Mg="#FF6FB5";
  const ghost=d=>`<g class="gl-a" opacity=".55"><path d="${d}" fill="${Cy}"/></g><g class="gl-b" opacity=".55"><path d="${d}" fill="${Mg}"/></g>`;
  const whisk=y=>ln(`M60 ${y}L40 ${y-5}M60 ${y+6}L42 ${y+9}`,3)+ln(mir(`M60 ${y}L40 ${y-5}M60 ${y+6}L42 ${y+9}`),3);
  if(f===0){
    const head=E(100,132,50,42);
    return `
    <rect class="drift" x="34" y="98" width="7" height="7" fill="${Cy}" stroke="${OL}" stroke-width="2"/><rect class="drift" style="animation-delay:1.4s" x="158" y="90" width="6" height="6" fill="${Mg}" stroke="${OL}" stroke-width="2"/>
    ${tube("M126 176C146 178 150 160 142 150",7,C)}
    ${part(E(100,172,30,16),C,sh(E(114,178,30,14),Cs))}
    ${part(E(86,183,9,6),Cm,"",4)}${part(E(114,183,9,6),Cm,"",4)}
    ${ghost(head)}
    ${twin("M62 116L56 76L94 98Z",C,sh("M62 108L60 86L84 100Z",Ci))}
    ${part(head,C,sh(E(122,152,52,36),Cs)+sh(E(100,154,24,14),Cm))}
    ${blush(68,132,146,7)}
    ${eyes([[82,128],[118,128]],{r:10,skin:C})}
    ${brows([74,112,14],[112,112,14],3)}
    ${part("M95 145L105 145L100 151Z",Mg,"",2.5)}
    ${whisk(148)}
    ${mouth(100,157,.35,{fill:Mg})}
    ${acc(100,92,.8)}`;
  }
  if(f===1){
    const head=E(100,96,50,42);
    return `
    ${tube("M128 178C174 182 176 132 158 120",10,C)}${tube("M160 124C158 120 157 118 157 118",10,Mg)}
    ${part("M66 184C62 150 76 128 100 128C124 128 138 150 134 184Z",C,sh("M114 124L146 124L146 190L110 190Z",Cs)+sh(E(100,168,18,22),Cm))}
    ${part("M74 134C90 142 110 142 126 134L124 144C110 150 90 150 76 144Z",Mg,"",4)}${part(RR(94,144,12,12,3),Cy,"",3)}
    ${part(E(86,184,11,7),Cm)}${part(E(114,184,11,7),Cm)}
    ${ghost(head)}
    ${twin("M58 90L52 40L94 68Z",C,sh("M60 82L58 52L84 70Z",Ci))}
    ${part(head,C,sh(E(122,116,52,36),Cs)+sh(E(100,118,26,16),Cm))}
    ${blush(62,138,112,9)}
    ${eyes([[80,92],[120,92]],{r:11,skin:C})}
    ${brows([68,72,18],[114,72,18])}
    ${part("M94 110L106 110L100 117Z",Mg,"",2.5)}
    ${whisk(112)}
    ${mouth(100,123,.45,{fill:Mg})}
    ${acc(100,58,.95)}`;
  }
  const M=f===3, fur=M?"#3E4263":C, furS=M?"#30344F":Cs, head=E(100,78,48,40);
  let tails=""; const n=M?5:2;
  for(let i=0;i<n;i++){ const a=M?-70+i*24:-40+i*34, tip=M?(i%2?Mg:Cy):Mg;
    tails+=`<g transform="rotate(${a} 130 176)">${tube("M130 176C176 178 184 132 170 112",10,fur)}${tube("M171 116C170 113 170 112 170 112",10,tip)}</g>`; }
  let px=""; [[18,72,10],[34,88,8],[12,104,11],[40,112,7],[24,128,9],[46,74,6]].forEach((p,i)=>{
    px+=`<rect x="${p[0]}" y="${p[1]}" width="${p[2]}" height="${p[2]}" fill="${i%2?Mg:Cy}" stroke="${OL}" stroke-width="2"/><rect x="${200-p[0]-p[2]}" y="${p[1]}" width="${p[2]}" height="${p[2]}" fill="${i%2?Cy:Mg}" stroke="${OL}" stroke-width="2"/>`; });
  return `
    ${M?mythicFX("#FFC4E2"):""}
    <g class="${M?"":"gl-a"}">${px}</g>
    ${tails}
    ${part("M56 190C50 140 70 110 100 110C130 110 150 140 144 190Z",fur,sh("M116 106L156 106L156 194L110 194Z",furS)+sh(E(100,154,20,26),Cm))}
    <g class="glow">${ln("M62 150L74 150L74 162L84 162",3.5,Cy)}${ln(mir("M62 150L74 150L74 162L84 162"),3.5,Cy)}</g>
    ${part(E(82,188,13,7),Cm)}${part(E(118,188,13,7),Cm)}
    ${ghost(head)}
    ${twin("M56 70L46 12L96 46Z",fur,sh("M58 60L52 24L84 48Z",Ci))}
    ${part(head,fur,sh(E(120,98,50,34),furS)+sh(E(100,100,26,16),Cm))}
    ${blush(62,138,96,9)}
    ${eyes([[80,74],[120,74]],{r:11,skin:fur,color:M?Mg:OL})}
    ${brows([66,54,20],[114,54,20])}
    ${part("M94 92L106 92L100 99Z",Mg,"",2.5)}
    ${whisk(94)}
    ${mouth(100,105,.45,{fill:Mg,fang:1})}
    ${M?`<text x="100" y="17" text-anchor="middle" font-family="JetBrains Mono,Martian Mono,monospace" font-size="13" font-weight="800" fill="${Cy}" stroke="${OL}" stroke-width="3" paint-order="stroke" class="gl-a">null</text>`:""}
    ${acc(100,38,1,M)}
    ${M?sparkles(Cy):""}`;
}

/* ---------------- SHROOM ---------------- */
function drawShroom(f){
  const Cap="#FFC14D", Caps="#F29E2E", Sp="#FFF6DD", Stem="#FFF1D8", Stems="#EAD8B6", Gill="#E8C98E", Leaf="#8FD16A";
  const dots=(list,c)=>list.map(p=>sh(E(p[0],p[1],p[2],p[3]||p[2]),c)).join("");
  if(f===0) return `
    ${part("M72 124C68 160 76 184 100 186C124 184 132 160 128 124Z",Stem,sh(E(128,162,26,42),Stems))}
    ${part("M52 126C52 92 74 72 100 72C126 72 148 92 148 126C130 134 70 134 52 126Z",Cap,sh(E(130,120,42,26),Caps)+dots([[78,96,9,7],[114,86,6,5],[132,106,7,6],[64,116,4]],Sp))}
    ${ln("M100 72Q98 62 104 56",4.5,"#6DB44F")}${part("M104 58C110 46 124 48 126 54C118 62 110 62 104 58Z",Leaf,"",4)}
    ${blush(76,124,164,6)}
    ${eyes([[88,150],[112,150]],{r:8,skin:Stem})}
    ${brows([81,136,12],[107,136,12],3)}
    ${mouth(100,165,.42)}
    ${acc(100,74,.7)}`;
  if(f===1) return `
    ${tube("M72 138C56 144 50 156 52 166",8,Stem)}${tube(mir("M72 138C56 144 50 156 52 166"),8,Stem)}
    ${twin("M84 172L82 188L96 188L96 172Z",Stems,"",4.5)}
    ${part("M68 110C62 150 70 180 100 182C130 180 138 150 132 110Z",Stem,sh(E(132,150,26,44),Stems))}
    ${part("M40 110C60 122 140 122 160 110L158 118C140 128 60 128 42 118Z",Gill,"",4)}
    ${part("M28 110C30 58 62 30 100 30C138 30 170 58 172 110C140 124 60 124 28 110Z",Cap,sh(E(144,98,58,36),Caps)+dots([[70,60,10,8],[112,48,7,6],[142,76,9,7],[48,92,5],[98,84,6,5]],Sp))}
    ${blush(70,130,156,8)}
    ${eyes([[84,140],[116,140]],{r:10,skin:Stem})}
    ${brows([74,122,16],[110,122,16])}
    ${mouth(100,160,.6)}
    ${acc(100,32,1)}`;
  const M=f===3, cap=M?"#6FE3D0":Cap, capS=M?"#45C7B4":Caps, sp=M?"#E9FFFB":Sp, st=M?"#EAF4FF":Stem, stS=M?"#CBDDF0":Stems;
  return `
    ${M?mythicFX("#C8F7EF"):""}
    ${M?`<g class="glow">${ln("M60 190Q40 196 20 190M140 190Q160 196 182 190M82 192Q72 200 58 198M118 192Q128 200 144 198",3.5,"#45C7B4")}</g>`:tube("M34 190L26 124",6,"#A8754E")+part(E(26,118,8),Leaf,"",4)}
    ${tube("M60 136C40 146 32 164 34 178",10,st)}${tube(mir("M60 136C40 146 32 164 34 178"),10,st)}
    ${twin("M76 176L72 190L96 190L96 176Z",stS,"",4.5)}
    ${part("M58 104C50 150 60 184 100 186C140 184 150 150 142 104Z",st,sh(E(144,150,32,48),stS))}
    ${part("M66 180C76 170 90 178 100 174C110 178 124 170 134 180L134 190L66 190Z",Leaf,sh("M100 170L140 170L140 194L100 194Z","#6DB44F"),4)}
    ${part("M156 190L158 176L166 176L168 190Z",Stem,"",3.5)}${part("M150 178C150 166 156 160 162 160C168 160 174 166 174 178Z",M?"#FFD166":"#FF7A6B",sh(E(162,168,3),"#fff"),3.5)}
    ${part("M18 96C50 112 150 112 182 96L180 106C150 120 50 120 20 106Z",Gill,"",4)}
    ${part("M8 96C10 36 52 6 100 6C148 6 190 36 192 96C150 116 50 116 8 96Z",cap,sh(E(150,82,68,42),capS)+dots([[50,48,13,10],[100,28,9,7],[150,52,12,9],[26,80,6],[176,80,7],[80,72,8,6],[124,76,7,6]],sp))}
    ${M?[[40,150],[160,140],[60,40],[140,26],[176,110],[24,120]].map((p,i)=>`<circle class="drift" style="animation-delay:${i*.5}s" cx="${p[0]}" cy="${p[1]}" r="3" fill="#E9FFFB" stroke="${OL}" stroke-width="1.5"/>`).join(""):""}
    ${blush(62,138,148,9)}
    ${eyes([[80,130],[120,130]],{r:11,skin:st})}
    ${brows([66,110,20],[114,110,20])}
    ${mouth(100,156,.7)}
    ${acc(100,8,1.2,M)}
    ${M?sparkles("#FFD166"):""}`;
}

const DRAW = {goblin:drawGoblin,dragon:drawDragon,slime:drawSlime,ghost:drawGhost,robot:drawRobot,kraken:drawKraken,glitch:drawGlitch,shroom:drawShroom};
const SHADOW_RX = [38,50,62,72];
function creatureSVG(species, form, cls="", attrs=""){
  const u=++SVG_UID, sp=SPECIES[species];
  return `<svg class="creature ${sp.float?"floaty ":""}${cls}" viewBox="0 0 200 200" ${attrs}>`+
    `<ellipse cx="100" cy="192" rx="${SHADOW_RX[form]}" ry="6" fill="rgba(46,42,64,.16)"/>`+
    `<g class="c-body">${DRAW[species](form,u)}</g></svg>`;
}
/* =========================================================
   FX: small pixel bursts, toasts, floaters
   ========================================================= */
const fxCv=$("fx"), fctx=fxCv.getContext("2d");
let FW=0, FH=0, bits=[], fxRunning=false;
function sizeFx(){ const d=Math.min(window.devicePixelRatio||1,2); FW=innerWidth; FH=innerHeight; fxCv.width=FW*d; fxCv.height=FH*d; fctx.setTransform(d,0,0,d,0,0); }
sizeFx(); addEventListener("resize",sizeFx);
const cssVar = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
function burst(x,y,n=14,power=5,colors){
  if(reduceMotion) return;
  colors=colors||[cssVar("--accent")||"#F2A516","#F2A516",cssVar("--ink")];
  for(let i=0;i<n;i++){
    const a=Math.random()*Math.PI*2, s=power*(.35+Math.random()*.8);
    bits.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-power*.5,life:34+Math.random()*22,t:0,s:3+Math.floor(Math.random()*3),c:colors[i%colors.length]});
  }
  if(!fxRunning){ fxRunning=true; requestAnimationFrame(fxFrame); }
}
function rain(n=120){ if(!gob) return; const r=gob.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height*.45,Math.min(36,Math.round(n/6)),7); }
function fxFrame(){
  fctx.clearRect(0,0,FW,FH);
  bits=bits.filter(b=>b.t<b.life);
  for(const b of bits){
    b.t++; b.vy+=.28; b.vx*=.98; b.x+=b.vx; b.y+=b.vy;
    fctx.globalAlpha=Math.min(1,(b.life-b.t)/12); fctx.fillStyle=b.c;
    fctx.fillRect(Math.round(b.x),Math.round(b.y),b.s,b.s);
  }
  fctx.globalAlpha=1;
  if(bits.length) requestAnimationFrame(fxFrame); else { fctx.clearRect(0,0,FW,FH); fxRunning=false; }
}
function toast(msg, kind="", icon){
  const el=document.createElement("div");
  el.className="toast "+kind; el.setAttribute("role","status");
  el.innerHTML=(icon?ic(icon):"")+"<span>"+esc(msg)+"</span>";
  $("toasts").appendChild(el);
  setTimeout(()=>{ el.classList.add("out"); setTimeout(()=>el.remove(),220); },2800);
}
function floater(x,y,text){
  const el=document.createElement("div"); el.className="floater"; el.textContent=text;
  el.style.left=x+"px"; el.style.top=y+"px"; document.body.appendChild(el); setTimeout(()=>el.remove(),1150);
}
function heartPop(x,y,html){
  const doc=gob?gob.ownerDocument:document, el=doc.createElement("div"); el.className="heart-pop"; el.innerHTML=html;
  el.style.left=x+"px"; el.style.top=y+"px"; doc.body.appendChild(el); setTimeout(()=>el.remove(),1150);
}

/* =========================================================
   MODALS: queued, focus-trapped, custom buttons
   ========================================================= */
let modalQueue=[], modalOpen=false, modalClose=null;
function modal(html, opts){
  if(typeof opts==="function") opts={onClose:opts};
  modalQueue.push({html,opts:opts||{}}); if(!modalOpen) nextModal();
}
function nextModal(){
  const m=modalQueue.shift();
  if(!m){ modalOpen=false; modalClose=null; if(gob) setMood(baseMood()); return; }
  modalOpen=true;
  const o=m.opts, root=$("modalRoot"), back=document.activeElement;
  const btns=o.buttons||[{label:"Continue",cls:"btn-primary"}];
  root.innerHTML='<div class="modal" role="dialog" aria-modal="true"><div class="modal-card'+(o.wide?" wide":"")+(o.center?" modal-center":"")+'">'+m.html+
    '<div class="modal-actions">'+btns.map((b,i)=>'<button type="button" class="btn '+(b.cls||"")+'" data-b="'+i+'">'+b.label+'</button>').join("")+'</div></div></div>';
  let closed=false;
  const close=()=>{
    if(closed) return; closed=true; root.innerHTML=""; o.onClose&&o.onClose();
    if(back&&back.focus&&document.contains(back)) back.focus({preventScroll:true});
    setTimeout(nextModal,100);
  };
  modalClose=close;
  const overlay=root.querySelector(".modal");
  root.querySelectorAll("[data-b]").forEach(el=>el.addEventListener("click",()=>{
    const b=btns[+el.dataset.b];
    if(b.onClick && b.onClick(close,root)===false) return;
    close();
  }));
  overlay.addEventListener("click",e=>{ if(e.target===overlay && !o.sticky) close(); });
  overlay.addEventListener("keydown",e=>{
    if(e.key!=="Tab") return;
    const f=[...overlay.querySelectorAll("button,input,textarea,a[href]")].filter(x=>!x.disabled&&x.offsetParent!==null);
    if(!f.length) return;
    const a=f[0], z=f[f.length-1];
    if(e.shiftKey&&document.activeElement===a){ e.preventDefault(); z.focus(); }
    else if(!e.shiftKey&&document.activeElement===z){ e.preventDefault(); a.focus(); }
  });
  const first=root.querySelector("input:not([type=checkbox]),textarea")||root.querySelector(".modal-actions .btn:last-child");
  if(first) first.focus({preventScroll:true});
  o.onMount&&o.onMount(root,close);
}
function closeModal(){ if(modalOpen&&modalClose) modalClose(); }
function confirmModal(title, body, yesLabel, onYes, danger=true){
  modal('<h2>'+title+'</h2><p>'+body+'</p>',{buttons:[{label:"Cancel"},{label:yesLabel,cls:danger?"btn-danger":"btn-primary",onClick(){ setTimeout(onYes,0); }}]});
}

/* =========================================================
   THE COMPANION: mount, moods, eyes, poke, pet, feed, sleep
   ========================================================= */
const bubbleEl=$("bubble");
let gob=null, pupils=[], curMood="idle", moodTimer=null, party=false, asleep=false, baseTitle="Creature HQ";
let lastTalk=Date.now(), lastInteract=Date.now();

function mountCreature(){
  const p=state.pet;
  if(!p){ $("creatureStage").innerHTML=""; gob=null; return; }
  const sp=SPECIES[p.species], form=shownForm();
  $("creatureStage").innerHTML=creatureSVG(p.species, form, "bob", 'id="creature" role="button" tabindex="0" aria-label="Poke '+esc(p.nick)+'"');
  gob=$("creature"); pupils=[...gob.querySelectorAll(".pupil")];
  $("screen").querySelectorAll(".zzz").forEach(z=>z.remove());
  if(asleep) addZzz();
  document.documentElement.style.setProperty("--accent",sp.color);
  syncPipTheme();
  setMood(curMood);
  gob.addEventListener("mousedown",e=>e.preventDefault());
  gob.addEventListener("click",poke);
  gob.addEventListener("keydown",e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); poke(); } });
}
function addZzz(){ const z=document.createElement("div"); z.className="zzz"; z.setAttribute("aria-hidden","true"); z.textContent="z z"; $("screen").appendChild(z); }

const MOOD_MOUTH={idle:"idle",happy:"happy",party:"happy",king:"happy",shock:"shock",angry:"angry",focus:"focus",sleepy:"sleepy"};
function baseMood(){
  if(party) return "party";
  if(typeof timer!=="undefined" && timer.running) return "focus";
  if(asleep) return "sleepy";
  const {t,d}=allCounts(); if(t && d===t) return "king";
  const h=new Date().getHours(); if(h>=1&&h<5) return "sleepy";
  return "idle";
}
function setMood(m, ms){
  curMood=m; cancel(moodTimer);
  if(gob){
    gob.classList.remove("m-idle","m-happy","m-shock","m-angry","m-focus","m-sleepy","m-party","m-king");
    gob.classList.add("m-"+m);
    gob.querySelectorAll(".mouth").forEach(el=>el.setAttribute("d",MOUTHS[MOOD_MOUTH[m]]));
    gob.querySelectorAll(".fang").forEach(el=>el.style.opacity=(m==="shock"||m==="sleepy")?0:1);
  }
  if(ms) moodTimer=later(()=>setMood(baseMood()),ms);
}
function anim(cls){
  if(!gob) return;
  gob.classList.remove("squish","shake","hop"); void gob.getBoundingClientRect(); gob.classList.add(cls);
  const g=gob; later(()=>g.classList.remove(cls),650);
}
let typeTimer=null, typeWin=null;
function say(text, yell=false){
  (typeWin||window).clearInterval(typeTimer);
  bubbleEl.classList.toggle("yell",yell);
  lastTalk=Date.now();
  // no letter-by-letter typing in the floating window: it repaints the dialog ~50 times a second
  if(reduceMotion||pipWin){ bubbleEl.textContent=text; return; }
  let i=0; bubbleEl.textContent="";
  // type on the floating window's clock when it is open; background tabs throttle their own timers
  const w=typeWin=pipWin||window;
  typeTimer=w.setInterval(()=>{ i+=2; bubbleEl.textContent=text.slice(0,i); if(i>=text.length) w.clearInterval(typeTimer); },20);
}

function look(px,py){
  if(!gob||asleep) return;
  const r=gob.getBoundingClientRect(); if(!r.width) return;
  const k=200/r.width;
  pupils.forEach(p=>{
    const cx=+p.dataset.cx, cy=+p.dataset.cy, m=+p.dataset.m;
    let dx=(px-(r.left+cx/k))*k, dy=(py-(r.top+cy/k))*k; const d=Math.hypot(dx,dy)||1, mm=Math.min(m,d/12);
    dx=dx/d*mm; dy=dy/d*mm;
    p.setAttribute("cx",cx+dx); p.setAttribute("cy",cy+dy);
    const s=p.parentNode.querySelector(".shine");
    if(s){ s.setAttribute("cx",cx+dx+(+s.dataset.ox)); s.setAttribute("cy",cy+dy+(+s.dataset.oy)); }
  });
}
addEventListener("pointermove",e=>{ if(!pipWin) look(e.clientX,e.clientY); },{passive:true});
(function blinkLoop(){
  later(()=>{
    const g=gob;
    // no idle blinking in a calm floating window
    if(g && !asleep && !(pipWin && !pipHover)){ g.classList.add("blink"); later(()=>g.classList.remove("blink"),130);
      if(Math.random()<.25) later(()=>{ g.classList.add("blink"); later(()=>g.classList.remove("blink"),110); },260); }
    blinkLoop();
  }, 2200+Math.random()*4200);
})();

function touch(){
  lastInteract=Date.now();
  if(asleep){
    asleep=false; $("screen").querySelectorAll(".zzz").forEach(z=>z.remove()); $("led").classList.remove("off");
    setMood("shock",1400); anim("hop");
    say(rand(["huh? i was not sleeping. i was compiling.","i'm up. i'm up. what year is it?","i dreamt of a codebase with no bugs. it was terrifying."]));
    return true;
  }
  return false;
}
function fallAsleep(){
  if(asleep||!gob) return;
  asleep=true; setMood("sleepy"); addZzz(); $("led").classList.add("off");
  say("zzz. poke me when you're ready to code.");
}

const POKE_LINES=["hey.","HEY.","boop acknowledged.","you could be coding right now.","ow. filing a bug report.",
  "do that again and i'm deprecating you.","poke count logged. forever.","careful, i'm load-bearing."];
const ANGRY_LINES=["THAT'S IT. I'M OPENING A GITHUB ISSUE ABOUT YOU.","STOP POKING. GO SHIP A PROJECT.","i will delete your streak. (i won't.) (maybe.)"];
let pokeBurst=0, pokeReset=null;
function poke(){
  if(!gob||!state.pet) return;
  if(touch()) return;
  const sp=SPECIES[state.pet.species];
  state.pokes++; pokeBurst++;
  clearTimeout(pokeReset); pokeReset=setTimeout(()=>pokeBurst=0,2500);
  if(pokeBurst>=7){ pokeBurst=0; setMood("angry",2600); anim("shake"); sfx.angry(); addBond(-2); say(rand(ANGRY_LINES),true); }
  else{ setMood(pokeBurst>3?"shock":"happy",1200); anim("squish"); sfx.poke(); say(Math.random()<.2?sp.cry:rand([...POKE_LINES,...sp.poke])); }
  const r=gob.getBoundingClientRect(); burst(r.left+r.width/2,r.top+r.height*.35,6,3,[sp.color,"#FFFFFF"]);
  if(state.pokes>=25) unlock("poke");
  save(); renderCare();
}

const PET_LINES=["ooh. right there.","okay fine. you can stay.","purr.exe running","this is my favourite api call",
  "head pats beat coffee.","bond increased. tell no one.","10 out of 10, would be petted again."];
const petTrack={lastX:null,dir:0,flips:[],lastPet:0,lastCount:0};
$("creatureStage").addEventListener("pointermove",e=>{
  if(!gob||dragSnack) return;
  const x=e.clientX;
  if(petTrack.lastX===null){ petTrack.lastX=x; return; }
  const dx=x-petTrack.lastX; if(Math.abs(dx)<6) return;
  petTrack.lastX=x;
  const dir=Math.sign(dx);
  if(dir!==petTrack.dir){
    petTrack.dir=dir; const now=Date.now();
    petTrack.flips=petTrack.flips.filter(t=>now-t<900); petTrack.flips.push(now);
    if(petTrack.flips.length>=5){ petTrack.flips=[]; pet(e.clientX,e.clientY); }
  }
});
$("creatureStage").addEventListener("pointerleave",()=>{ petTrack.lastX=null; });
function pet(x,y){
  const now=Date.now(); if(now-petTrack.lastPet<1200||!state.pet) return;
  petTrack.lastPet=now;
  if(touch()) return;
  const g=gob; g.classList.add("purr"); setTimeout(()=>g.classList.remove("purr"),1300);
  setMood("happy",1600); sfx.purr();
  for(let i=0;i<3;i++) setTimeout(()=>heartPop(x+(Math.random()-.5)*60,y-10,ic("heart")),i*120);
  if(now-petTrack.lastCount>4000){ petTrack.lastCount=now; state.pet.pets++; addBond(1); }
  say(rand(PET_LINES));
  if(state.pet.pets>=30) unlock("pet");
  save(); renderCare();
}

const bondLabel = b => b>=255?"Soulbound":b>=180?"Devoted":b>=100?"Loyal":b>=40?"Friendly":"Wary";
function addBond(n){
  const p=state.pet; if(!p) return;
  p.bond=Math.max(0,Math.min(255,p.bond+n));
  if(p.bond>=255) unlock("bff");
}
function fullNow(){
  const p=state.pet; if(!p) return 0;
  return Math.max(0, p.full - (Date.now()-p.fullAt)/3600000*4);
}
function giveSnack(id,n=1){ const p=state.pet; if(p) p.snacks[id]=Math.min(9,(p.snacks[id]||0)+n); }
let pantryCache="";
function renderCare(){
  const p=state.pet;
  if(!p){ $("pantry").innerHTML=""; pantryCache=""; $("bondTxt").textContent=""; $("fullTxt").textContent=""; $("bondBar").style.width="0"; $("fullBar").style.width="0"; return; }
  const sp=SPECIES[p.species], f=Math.round(fullNow());
  const html=SNACKS.map(s=>{ const n=p.snacks[s.id]||0, fav=sp.fav===s.id;
    return '<button type="button" class="snack'+(fav?" fav":"")+(n?"":" empty")+'" data-snack="'+s.id+'" aria-label="Feed '+s.name.toLowerCase()+', '+n+' left'+(fav?', favourite':'')+'" title="'+s.name+(fav?" (favourite)":"")+'">'+ic(s.icon)+'<span>'+n+'</span></button>'; }).join("");
  if(html!==pantryCache){ $("pantry").innerHTML=html; pantryCache=html; }
  $("fullBar").style.width=f+"%"; $("fullBar").style.background=f<20?"var(--bad)":f<45?"var(--amber)":"var(--ok)";
  $("fullTxt").textContent=f+"%";
  $("bondBar").style.width=(p.bond/255*100)+"%"; $("bondTxt").textContent=bondLabel(p.bond);
}

let dragSnack=null;
const overStage = e => { const r=$("creatureStage").getBoundingClientRect(); return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top-10&&e.clientY<=r.bottom; };
$("pantry").addEventListener("pointerdown",e=>{
  const b=e.target.closest(".snack"); if(!b||e.button>0) return;
  e.preventDefault(); dragSnack={id:b.dataset.snack,x0:e.clientX,y0:e.clientY,ghost:null};
});
$("pantry").addEventListener("click",e=>{ const b=e.target.closest(".snack"); if(b&&e.detail===0) feed(b.dataset.snack); });
addEventListener("pointermove",e=>{
  if(!dragSnack) return;
  if(!dragSnack.ghost && Math.hypot(e.clientX-dragSnack.x0,e.clientY-dragSnack.y0)>6){
    const g=document.createElement("div"); g.className="drag-ghost"; g.innerHTML=ic(SNACKS.find(s=>s.id===dragSnack.id).icon);
    document.body.appendChild(g); dragSnack.ghost=g;
    if(!touch()) say(rand(["is that for me?","gimme gimme gimme.","*drools on the keyboard*"]));
  }
  if(dragSnack.ghost){
    dragSnack.ghost.style.left=e.clientX+"px"; dragSnack.ghost.style.top=e.clientY+"px";
    const over=overStage(e); $("creatureStage").classList.toggle("drop-ready",over);
    if(over&&curMood!=="shock") setMood("shock"); else if(!over&&curMood==="shock") setMood(baseMood());
  }
});
addEventListener("pointerup",e=>{
  if(!dragSnack) return;
  const d=dragSnack; dragSnack=null; $("creatureStage").classList.remove("drop-ready");
  if(d.ghost){ d.ghost.remove(); if(overStage(e)) feed(d.id); else { setMood(baseMood()); say("hey. bring that back."); } }
  else feed(d.id);
});
function feed(id){
  const p=state.pet; if(!p||!gob) return;
  const s=SNACKS.find(x=>x.id===id), sp=SPECIES[p.species];
  touch();
  if(!(p.snacks[id]>0)){ sfx.uncheck(); anim("shake"); say("no "+s.name.toLowerCase()+"s left. finish quests to restock the pantry."); return; }
  const f=fullNow();
  if(f>=96 && id!=="coffee"){ setMood("shock",1200); anim("shake"); say("i'm stuffed. one more bite and i become a monolith."); return; }
  p.snacks[id]--; p.full=Math.min(100,f+s.full); p.fullAt=Date.now(); p.feeds++;
  const fav=sp.fav===id; addBond(fav?6:3);
  const g=gob; g.classList.remove("chomp"); void g.getBoundingClientRect(); g.classList.add("chomp"); setTimeout(()=>g.classList.remove("chomp"),600);
  sfx.chomp(); setMood("happy",1800);
  const r=g.getBoundingClientRect();
  burst(r.left+r.width/2,r.top+r.height*.55,10,3,["#C98500","#F2A516","#6B4A2C"]);
  if(fav) for(let i=0;i<3;i++) setTimeout(()=>heartPop(r.left+r.width*(.3+Math.random()*.4),r.top+r.height*.3,ic("heart")),i*110);
  say(fav?"my favourite! "+s.line+" "+sp.cry:s.line);
  if(id==="coffee"){ g.classList.add("hyper"); setTimeout(()=>{ g.classList.remove("hyper"); if(g===gob) say("crash incoming. worth it."); },5000); }
  if(p.feeds>=20) unlock("fed");
  save(); renderCare();
}

const IDLE_LINES=["one small quest?","i believe in you. mildly. reasonably.","the Network tab misses you.",
  "consistency beats intensity.","ever notice how 'localhost' sounds cozy?","you're doing better than you think.",
  "console.log('hi')","projects are my protein. just saying.","i can feel an evolution coming. ship something?"];
setInterval(()=>{
  if(pipWin || document.hidden || !state.pet || modalOpen || (typeof timer!=="undefined"&&timer.running)) return;
  if(!asleep && Date.now()-lastInteract>150000){ fallAsleep(); return; }
  if(!asleep && Date.now()-lastTalk>45000){
    const sp=SPECIES[state.pet.species];
    say(fullNow()<20?rand(["so hungry. drag a snack onto me?","i could eat a whole node_modules folder.","my stomach just returned a 404."]):rand([...IDLE_LINES,...sp.idle]));
    anim("hop");
  }
  renderCare();
},5000);
addEventListener("keydown",()=>{ lastInteract=Date.now(); });

function greeting(){
  const h=new Date().getHours(), {t,d}=allCounts(), p=state.pet, sp=SPECIES[p.species];
  if(d===0) return "hi, i'm "+p.nick+". "+sp.cry+" finish your first quest. ship a project and i grow.";
  if(fullNow()<20) return "welcome back. also i'm starving. snack first, then code.";
  if(h<5) return "it's "+h+"am. respect. but sleep is a feature, not a bug.";
  if(h<12) return "morning. "+(liveStreak()?"streak is at "+liveStreak()+". let's keep it.":"let's get one quest done.");
  if(h<18) return "afternoon. "+(t-d)+" quests left on the roadmap. we only need one.";
  return "evening shift. one quest, then rest. deal?";
}
/* =========================================================
   VIEWS: tabs, side panel, Today, Roadmap, Companion, Vault,
   Trophies, Settings
   ========================================================= */
const VIEWS=["today","roadmap","workshop","notebook","companion","vault","trophies","settings"];
const VIEW_NAMES={today:"Today",roadmap:"Roadmap",workshop:"Workshop",notebook:"Notebook",companion:"Companion",vault:"Proof vault",trophies:"Trophies",settings:"Settings"};
let view="today";
try{ const v=localStorage.getItem("hqView"); if(VIEWS.includes(v)) view=v; }catch(e){}
let roadmapPhase=currentPhase(), pickedId=null;

const phaseName = ph => ph.title.split(": ").slice(1).join(": ");
const phaseNum = ph => ph.title.split(": ")[0];
const fmtN = n => Number(n||0).toLocaleString("en-US");
const fmtDate = t => new Date(t).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"});
const trainText = tr => Object.entries(tr||{}).map(([k,v])=>"+"+v+" "+STATS.find(s=>s.k===k).n).join(" ");
const plural = (n,w) => n+" "+w+(n===1?"":"s");

function go(v, focusQuestId){
  if(!VIEWS.includes(v)) return;
  view=v; try{ localStorage.setItem("hqView",v); }catch(e){}
  VIEWS.forEach(x=>{ $("view-"+x).hidden = x!==v; });
  renderTabs(); renderView();
  const tb=document.querySelector(".topbar"), top=tb.getBoundingClientRect().top+scrollY;
  if(scrollY>top) scrollTo(0,top);
  if(focusQuestId){
    const row=$("q-"+focusQuestId);
    if(row){ row.scrollIntoView({block:"center"}); row.classList.remove("flash"); void row.offsetWidth; row.classList.add("flash"); }
  }
}
function renderTabs(){
  const got=trophyDefs.filter(t=>state.trophies[t.id]).length;
  const counts={notebook:Object.keys(state.notes).filter(hasNote).length||undefined,vault:Object.keys(state.subs).length, trophies:got+"/"+trophyDefs.length};
  $("tabs").innerHTML=VIEWS.map(v=>'<button type="button" class="tab" role="tab" id="tab-'+v+'" aria-controls="view-'+v+'" aria-selected="'+(v===view)+'" data-act="tab" data-view="'+v+'">'+VIEW_NAMES[v]+(counts[v]!==undefined?'<span class="count">'+counts[v]+'</span>':"")+'</button>').join("");
}
function renderView(){ ({today:renderToday,roadmap:renderRoadmap,workshop:renderWorkshop,notebook:renderNotebook,companion:renderCompanion,vault:renderVault,trophies:renderTrophies,settings:renderSettings})[view](); }
function renderAll(){ renderSide(); renderTabs(); renderView(); }

function renderSide(){
  const p=state.pet, xp=subXP(), L=levelFor(xp), lo=levelFloor(L), hi=levelFloor(L+1), frac=L>=MAX_LV?1:(xp-lo)/(hi-lo);
  $("devLv").textContent="LV "+L;
  $("xpBar").style.width=(frac*100)+"%";
  $("devXp").innerHTML=L>=MAX_LV?"<b>Max level</b>":"<b>"+fmtN(xp-lo)+"</b> / "+fmtN(hi-lo)+" xp";
  if(p){
    const sp=SPECIES[p.species], f=shownForm();
    $("devName").textContent=p.nick+" · "+sp.forms[f];
    $("devForm").textContent=FORM_LABEL[f]+" form";
    baseTitle=p.nick+" · Creature HQ";
  }else{
    $("devName").textContent="No companion"; $("devForm").textContent="Not hatched"; baseTitle="Creature HQ";
  }
  if(!(typeof timer!=="undefined"&&timer.running)) document.title=baseTitle;
  $("led").classList.toggle("off",asleep||!p);
  $("streak").textContent=liveStreak();
  $("soundBtn").innerHTML=ic(state.sound?"sound":"mute");
  $("soundBtn").setAttribute("aria-label",state.sound?"Mute sound":"Turn sound on");
  renderThemeBtn(); renderPopBtn();
  renderCare();
}

/* ---------- quest helpers ---------- */
function availableQuests(){
  const out=[];
  phases.forEach((p,pi)=>p.stages.forEach((s,si)=>{ if(stageAvailable(pi,si)) s[1].forEach((q,qi)=>{ if(!state.done[qid(pi,si,qi)]) out.push({pi,si,qi,q}); }); }));
  return out;
}
function upNext(){
  if(pickedId && !state.done[pickedId]){
    const [pi,si,qi]=pickedId.split("-").map(Number);
    if(phases[pi]&&stageAvailable(pi,si)) return {pi,si,qi,q:phases[pi].stages[si][1][qi]};
  }
  pickedId=null;
  for(let pi=0;pi<phases.length;pi++) for(let si=0;si<phases[pi].stages.length;si++){
    if(!stageAvailable(pi,si)) continue;
    const s=phases[pi].stages[si];
    for(let qi=0;qi<s[1].length;qi++) if(!state.done[qid(pi,si,qi)]) return {pi,si,qi,q:s[1][qi]};
  }
  return null;
}
function firstProject(){
  for(let pi=0;pi<phases.length;pi++) for(let si=0;si<phases[pi].stages.length;si++){
    if(!isSubStage(phases[pi].stages[si][0])) continue;
    const s=phases[pi].stages[si];
    for(let qi=0;qi<s[1].length;qi++) if(!state.subs[qid(pi,si,qi)]) return {pi,si,qi,q:s[1][qi]};
  }
  return null;
}
function shuffle(){
  const pool=availableQuests().filter(c=>qid(c.pi,c.si,c.qi)!==(upNext()?qid(upNext().pi,upNext().si,upNext().qi):""));
  if(!pool.length){ toast("There is only one quest available right now.","","dice"); return; }
  const c=rand(pool); pickedId=qid(c.pi,c.si,c.qi);
  state.rolls++; save(); sfx.land();
  if(view==="today") renderToday();
  say(rand(["fate has spoken.","the dice say this one.","good roll.","i'd do this one. if i had thumbs."]));
  if(state.rolls>=20) unlock("dice");
}

/* ---------- Today ---------- */
function renderToday(){
  const el=$("view-today"), p=state.pet, cur=currentPhase(), ph=phases[cur], n=upNext(), {t,d}=allCounts();
  const xp=subXP(), L=levelFor(xp);
  const subs=Object.entries(state.subs).sort((a,b)=>(b[1].at||0)-(a[1].at||0));

  const head='<header class="view-head"><div><p class="eyebrow">'+esc(phaseNum(ph))+' · '+esc(ph.weeks)+' · '+esc(ph.tag)+'</p><h1>'+esc(phaseName(ph))+'</h1><p class="lede">'+esc(ph.note)+'</p></div></header>';

  let next;
  if(!n){
    next='<p class="next-quest">Every quest on the roadmap is done.</p><p class="next-meta">Pick a real problem and build something people can use.</p>';
  }else{
    const st=phases[n.pi].stages[n.si][0], sub=isSubStage(st), id=qid(n.pi,n.si,n.qi);
    next='<p class="next-quest">'+esc(n.q)+'</p><div class="next-meta"><span>'+esc(phases[n.pi].short)+' · '+esc(st)+'</span><span>Quiz '+quizPass(id)+'/5</span>'+
      (sub?'<span class="tag-xp">'+ic("doc")+'Proof required · '+fmtN(subBaseXP(n.pi,n.si))+' xp</span>':'<span class="mono" style="font-size:12px">Trains '+trainText(TRAIN[st])+'</span>')+'</div>'+
      '<div class="actions">'+(sub&&!state.subs[id]&&quizPass(id)===5?'<button type="button" class="btn btn-primary" data-act="submit" data-id="'+id+'">'+ic("doc")+'Submit proof</button>'
        :'<button type="button" class="btn btn-primary" data-act="quiz" data-id="'+id+'">'+ic("check")+(quizPass(id)?'Continue quiz':'Take quiz')+'</button>'+(sub&&!state.subs[id]?'<button type="button" class="btn" data-act="submit" data-id="'+id+'">'+ic("doc")+'Submit proof</button>':''))+
      (typeof wsQuestOk==="function"&&wsQuestOk(n.pi,n.si,n.qi)?'<button type="button" class="btn" data-act="ws-quest" data-id="'+id+'">'+ic("html")+'Code it</button>':'')+
      '<button type="button" class="btn" data-act="notes" data-id="'+id+'">'+ic("pencil")+'Notes</button>'+
      '<button type="button" class="btn" data-act="open-phase" data-pi="'+n.pi+'" data-id="'+id+'">Show in roadmap</button>'+
      '<button type="button" class="btn btn-ghost" data-act="shuffle">'+ic("dice")+'Pick another</button></div>';
  }
  const nextCard='<article class="card"><div class="card-head"><h2 class="card-title">Up next</h2><span class="muted">'+(pickedId?"Picked at random":"Next in order")+'</span></div>'+next+'</article>';

  const run=timer.running;
  const timerCard='<article class="card"><div class="card-head"><h2 class="card-title">Focus timer</h2><span class="muted">'+(state.focusDone?plural(state.focusDone,"session")+" finished":"")+'</span></div>'+
    '<div class="timer-face"><span class="timer-time" id="timerTime">'+fmt(run?timer.left:state.focusMin*60)+'</span><span class="muted" id="timerQuip">'+(run?(timer.paused?"Paused":esc(timer.quip)):"Ready")+'</span></div>'+
    '<div class="timer-bar"><i id="timerFill" style="width:'+(run?(1-timer.left/timer.total)*100:0)+'%"></i></div>'+
    (run?'<div class="timer-controls"><button type="button" class="btn" data-act="focus-pause">'+ic(timer.paused?"play":"pause")+(timer.paused?"Resume":"Pause")+'</button><button type="button" class="btn btn-ghost" data-act="focus-stop">'+ic("stop")+'Stop</button></div>'
      :'<div class="timer-controls"><div class="seg" role="group" aria-label="Session length">'+[15,25,50].map(m=>'<button type="button" data-act="focus-len" data-min="'+m+'" aria-pressed="'+(state.focusMin===m)+'">'+m+'m</button>').join("")+'</div><button type="button" class="btn btn-primary" data-act="focus-start" style="margin-left:auto">'+ic("play")+'Start</button></div>')+
    '<p class="fine">A finished session trains FOCUS and adds a coffee to the pantry.</p></article>';

  const cells=phases.map((ph2,pi)=>{
    const pp=phaseProgress(pi), locked=!phaseAvailable(pi), cleared=phaseComplete(pi), cls=cleared?"cleared":locked?"locked":pi===cur?"current":"";
    return '<button type="button" class="cell '+cls+'" data-act="open-phase" data-pi="'+pi+'" title="'+esc(ph2.title)+'" aria-label="'+esc(ph2.title)+', '+(cleared?"complete":locked?"locked":Math.round(pp.pct*100)+"% done")+'"><span class="cell-box"><i style="width:'+(pp.pct*100)+'%"></i></span><span class="cell-label">'+pi+'</span></button>';
  }).join("");
  const progressCard='<article class="card span-all"><div class="card-head"><h2 class="card-title">Roadmap</h2><span class="muted">'+d+' of '+t+' quests done</span></div><div class="strip">'+cells+'</div>'+
    '<dl class="facts-row"><div><dt>Current phase</dt><dd>'+esc(ph.short)+'</dd></div><div><dt>Projects shipped</dt><dd>'+subs.length+'</dd></div><div><dt>Project XP</dt><dd>'+fmtN(xp)+'</dd></div><div><dt>Best streak</dt><dd>'+plural(state.bestStreak,"day")+'</dd></div></dl></article>';

  const np=firstProject();
  const recentCard='<article class="card"><div class="card-head"><h2 class="card-title">Recently shipped</h2>'+(subs.length?'<button type="button" class="btn btn-sm btn-ghost" data-act="tab" data-view="vault">View all</button>':'')+'</div>'+
    (subs.length?'<ul class="list">'+subs.slice(0,3).map(([id,s])=>{ const [pi,si,qi]=id.split("-").map(Number), q=phases[pi]&&phases[pi].stages[si]?phases[pi].stages[si][1][qi]:"Project";
        return '<li><span class="grow"><b>'+esc(q)+'</b><span class="muted">'+esc(phases[pi]?phases[pi].short:"")+' · '+fmtDate(s.at)+'</span></span><span class="q-xp">+'+fmtN(s.xp)+' xp</span></li>'; }).join("")+'</ul>'
      :'<p class="muted">Nothing shipped yet.'+(np?' Your first project is <b style="color:var(--ink)">'+esc(np.q)+'</b> in '+esc(phases[np.pi].short)+'.':'')+'</p>')+'</article>';

  let evoCard='';
  if(p){
    const sp=SPECIES[p.species], f=shownForm();
    if(f<3){
      const nextLv=EVO_LV[f+1], gap=Math.max(0,nextLv-L), a=levelFloor(EVO_LV[f]), b=levelFloor(nextLv), pct=Math.max(0,Math.min(100,(xp-a)/(b-a)*100));
      evoCard='<article class="card"><div class="card-head"><h2 class="card-title">Next evolution</h2><span class="muted">Lv '+L+'</span></div>'+
        '<div class="evo-mini">'+creatureSVG(p.species,f,"")+'<span aria-hidden="true">→</span>'+creatureSVG(p.species,f+1,"sil-dark")+'</div>'+
        '<p>'+esc(sp.forms[f])+(gap?' evolves at <b>Lv '+nextLv+'</b>, '+plural(gap,"level")+' away.':' is ready to evolve.')+'</p>'+
        '<div class="bar"><i style="width:'+pct+'%;background:var(--amber)"></i></div><p class="fine">Only submitted projects give XP.</p></article>';
    }else{
      evoCard='<article class="card"><div class="card-head"><h2 class="card-title">Evolution</h2><span class="muted">Lv '+L+'</span></div><div class="evo-mini">'+creatureSVG(p.species,3,"")+'</div><p>'+esc(sp.forms[3])+' has reached its final form.</p></article>';
    }
  }

  const distractCard='<article class="card span-all distract"><div><h2>Drifted off to YouTube again?</h2><p class="muted">Press the button and '+(p?esc(p.nick):"your companion")+' will tell you to get back to work.'+(state.ois?' Used '+plural(state.ois,"time")+'.':'')+'</p></div><button type="button" class="btn btn-danger" data-act="oi">'+ic("megaphone")+'Yell at me</button></article>';

  el.innerHTML=head+'<div class="grid g-today">'+nextCard+timerCard+progressCard+recentCard+evoCard+distractCard+'</div>';
}
/* ---------- Roadmap ---------- */
function renderRoadmap(){
  const el=$("view-roadmap"), cur=currentPhase(), {t,d}=allCounts();
  const pi=Math.max(0,Math.min(phases.length-1,roadmapPhase)), ph=phases[pi], pr=phaseProgress(pi), locked=!phaseAvailable(pi), cleared=phaseComplete(pi);

  const head='<header class="view-head"><div><p class="eyebrow">'+d+' of '+t+' quests done</p><h1>Roadmap</h1><p class="lede">Twelve phases, in order. Learn the concept, practise with small exercises, then prove it with a project.</p></div></header>';

  const list='<ol class="phase-list" aria-label="Phases">'+phases.map((p,i)=>{
    const pp=phaseProgress(i), lk=!phaseAvailable(i), cl=phaseComplete(i), cls=cl?"cleared":lk?"locked":i===cur?"current":"";
    return '<li><button type="button" class="phase-item '+cls+'" data-act="select-phase" data-pi="'+i+'" aria-current="'+(i===pi)+'">'+
      '<span class="pi-num">'+String(i).padStart(2,"0")+'</span><span class="pi-name">'+esc(p.short)+'</span>'+
      '<span class="pi-state">'+(cl?ic("check"):lk?ic("lock"):pp.d+"/"+pp.t)+'</span>'+
      '<span></span><span class="pi-bar"><i style="width:'+(pp.pct*100)+'%"></i></span></button></li>';
  }).join("")+'</ol>';

  const how='<div class="card how"><h2 class="card-title" style="margin-bottom:10px">How progress works</h2><ol>'+
    '<li>Phases open in order. Finish one to unlock the next.</li>'+
    '<li>Every checkpoint has a 5-question quiz. It is finished once all 5 are correct.</li>'+
    '<li>Skip what you don\'t know yet. Learn it, then come back.</li>'+
    '<li>Projects also need a GitHub repository and a deployed link. Only projects give XP.</li>'+
    '<li>Stuck for 15 minutes? Ask for a hint, not the finished answer.</li></ol>'+
    '<button type="button" class="btn btn-sm" data-act="rules" style="margin-top:12px">'+ic("book")+'Read all rules</button></div>';

  let stages="";
  ph.stages.forEach((stage,si)=>{
    const avail=stageAvailable(pi,si), sub=isSubStage(stage[0]), tr=TRAIN[stage[0]];
    const dc=stage[1].filter((q,qi)=>state.done[qid(pi,si,qi)]).length;
    const rows=stage[1].map((q,qi)=>{
      const id=qid(pi,si,qi), done=!!state.done[id], passed=quizPass(id), s=sub?state.subs[id]:null, noted=hasNote(id);
      const meta=[passed===5?'<span class="ok">Quiz passed</span>':'<span'+(avail&&passed?' class="todo"':'')+'>Quiz '+passed+'/5</span>'];
      if(sub) meta.push(s?'<span class="ok">Proof sent · +'+fmtN(s.xp)+' xp</span>':'<span>Proof needed · '+fmtN(subBaseXP(pi,si))+' xp</span>');
      else meta.push('<span>'+trainText(tr)+'</span>');
      const quizBtn=avail?'<button type="button" class="btn btn-sm'+(passed<5&&(!sub||s)?' btn-primary':'')+'" data-act="quiz" data-id="'+id+'">'+(passed===5?'Review quiz':passed?'Continue quiz':'Take quiz')+'</button>':'';
      const proofBtn=!sub||!avail?'':s?'<button type="button" class="btn btn-sm" data-act="view-sub" data-id="'+id+'">Proof</button>'
        :'<button type="button" class="btn btn-sm'+(passed===5?' btn-primary':'')+'" data-act="submit" data-id="'+id+'">Submit proof</button>';
      return '<div class="q'+(done?' done':'')+(avail?'':' disabled')+'" id="q-'+id+'">'+
        '<span class="q-state'+(!done&&passed?' part':'')+'" style="--p:'+(passed*20)+'%" aria-hidden="true">'+(done?ic("check"):'')+'</span>'+
        '<span class="q-main"><span class="q-text">'+esc(q)+'</span><span class="q-meta">'+meta.join("")+'</span></span>'+
        '<span class="q-actions"><button type="button" class="btn btn-sm btn-icon btn-ghost note-btn'+(noted?' has':'')+'" data-act="notes" data-id="'+id+'" aria-label="'+(noted?'Open notes':'Add notes')+' for '+esc(q)+'" title="Notes">'+ic("pencil")+'</button>'+
          (avail&&typeof wsQuestOk==="function"&&wsQuestOk(pi,si,qi)?'<button type="button" class="btn btn-sm" data-act="ws-quest" data-id="'+id+'" title="Build it in the Workshop">'+ic("html")+'Code it</button>':'')+proofBtn+quizBtn+'</span></div>';
    }).join("");
    stages+='<section class="stage"><header class="stage-head"><h3>'+esc(stage[0])+'</h3><span class="muted">'+dc+'/'+stage[1].length+'</span>'+
      '<span class="stage-rule'+(sub?' proof':'')+'">'+(sub?ic("doc")+'Quiz and proof · gives XP':'Quiz · trains '+trainText(tr))+'</span></header>'+
      (!avail&&!locked?'<p class="stage-lock">'+ic("lock")+'Finish the stages above to unlock these.</p>':'')+rows+'</section>';
  });

  const detail='<article class="card phase-detail"><p class="eyebrow">'+esc(phaseNum(ph))+' · '+esc(ph.weeks)+' · '+esc(ph.tag)+'</p><h2>'+esc(phaseName(ph))+'</h2><p class="note">'+esc(ph.note)+'</p>'+
    '<div class="progress-line"><div class="bar"><i style="width:'+(pr.pct*100)+'%'+(cleared?';background:var(--ok)':'')+'"></i></div><span class="mono muted" style="font-size:12px">'+pr.d+' of '+pr.t+'</span></div>'+
    (locked?'<div class="notice">'+ic("lock")+'<span>Locked. Finish <b>'+esc(phases[pi-1].short)+'</b> to open this phase. You can read ahead below.</span></div>':'')+
    (cleared?'<div class="notice ok">'+ic("check")+'<span>Phase complete.</span></div>':'')+
    stages+'</article>';

  el.innerHTML=head+'<div class="grid g-roadmap"><div class="phase-nav">'+list+how+'</div>'+detail+'</div>';
}

/* ---------- Companion ---------- */
function renderCompanion(){
  const el=$("view-companion"), p=state.pet;
  if(!p){ el.innerHTML='<div class="card empty"><h2>No companion yet</h2><p>Hatch one to start training.</p><button type="button" class="btn btn-primary" data-act="swap">Choose a companion</button></div>'; return; }
  const L=level(), f=shownForm(), sp=SPECIES[p.species], st=computeStats(L,f), ev=computeEVs(), nat=NATURES[p.nature]||NATURES[9];
  const SN=Object.fromEntries(STATS.map(s=>[s.k,s.n]));
  const ivSum=STATS.reduce((a,s)=>a+p.ivs[s.k],0), grade=ivSum>140?"S":ivSum>95?"A":ivSum>50?"B":"C";
  const fav=SNACKS.find(s=>s.id===sp.fav);

  const head='<header class="view-head"><div><p class="eyebrow">'+esc(sp.forms[f])+' · '+FORM_LABEL[f]+' form · '+esc(sp.type)+' type</p><h1 class="pixel-name">'+esc(p.nick)+'</h1></div>'+
    '<div class="actions"><button type="button" class="btn" data-act="rename">'+ic("pencil")+'Rename</button><button type="button" class="btn" data-act="swap">'+ic("egg")+'Swap companion</button></div></header>';

  const facts=[["Level",L>=MAX_LV?L+" (max)":String(L)],["Species",sp.line],["Form",sp.forms[f]+" ("+FORM_LABEL[f]+")"],
    ["Nature",nat.n+(nat.up?" (+"+SN[nat.up]+", −"+SN[nat.down]+")":" (neutral)")],["Genes",grade+" · IV total "+ivSum+" of 186"],
    ["Bond",bondLabel(p.bond)+" · "+p.bond+" of 255"],["Favourite snack",fav.name],["Fed",plural(p.feeds,"time")],["Hatched",fmtDate(p.hatched+"T12:00:00")]];
  const specimen='<article class="card specimen"><div class="screen">'+creatureSVG(p.species,f,"bob")+'</div><dl class="dl">'+facts.map(([k,v])=>'<dt>'+k+'</dt><dd>'+esc(v)+'</dd>').join("")+'</dl></article>';

  const stats='<article class="card"><div class="card-head"><h2 class="card-title">Stats</h2><span class="muted">at Lv '+L+'</span></div>'+
    STATS.map(s=>{ const mark=nat.up===s.k?' <span class="up" title="Boosted by nature">+</span>':nat.down===s.k?' <span class="down" title="Lowered by nature">−</span>':'';
      return '<div class="stat"><span class="stat-name">'+s.n+mark+'</span><span class="stat-bars"><span class="v"><i style="width:'+Math.min(100,st[s.k]/3)+'%"></i></span><span class="e" title="Training '+ev[s.k]+' of 252"><i style="width:'+(ev[s.k]/252*100)+'%"></i></span></span><span class="stat-val">'+st[s.k]+'</span></div>'; }).join("")+
    '<div class="legend"><span><i class="swatch"></i>Stat value</span><span><i class="swatch e"></i>Training from checkmarks, focus sessions and snacks</span></div></article>';

  const evo='<article class="card"><div class="card-head"><h2 class="card-title">Evolution line</h2><span class="muted">Projects give XP, XP gives levels</span></div><div class="evo-line">'+
    [0,1,2,3].map(i=>{ const seen=i<=f; return '<div class="evo-step'+(i===f?' now':'')+'">'+creatureSVG(p.species,i,seen?'':'sil-dark')+'<b>'+(seen?esc(sp.forms[i]):'Unknown')+'</b><small>'+(i===0?'Hatch':'Lv '+EVO_LV[i])+'</small></div>'; }).join("")+'</div></article>';

  const ms=learnedMoves(), nextPi=MOVES.findIndex((m,i)=>!ms.some(x=>x.pi===i));
  const moves='<article class="card"><div class="card-head"><h2 class="card-title">Moves</h2><span class="muted">'+ms.length+' of '+(MOVES.length+1)+' learned</span></div><div>'+
    ms.map(m=>'<div class="move"><b>'+(m.sig?ic("star"):'')+esc(m.name)+'</b><span class="pow">Power '+m.pow+'</span><span class="desc">'+esc(m.desc)+(m.sig?' Signature move.':'')+'</span></div>').join("")+
    (nextPi>=0?'<div class="move locked"><b>'+ic("lock")+'Not learned yet</b><span class="pow">Power ?</span><span class="desc">Ship a '+esc(phases[nextPi].short)+' project to learn the next move.</span></div>':'')+'</div></article>';

  const arena='<article class="card"><div class="card-head"><h2 class="card-title">Arena</h2><span class="muted">Planned</span></div><p class="muted">Battles between companions, fought by writing code. Stats and moves above will carry over.</p></article>';

  el.innerHTML=head+'<div class="grid g-comp">'+specimen+'<div class="stack">'+stats+evo+moves+arena+'</div></div>';
}

/* ---------- Proof vault ---------- */
function renderVault(){
  const el=$("view-vault"), ids=Object.keys(state.subs).sort((a,b)=>(state.subs[b].at||0)-(state.subs[a].at||0));
  const head='<header class="view-head"><div><p class="eyebrow">'+plural(ids.length,"project")+' · '+fmtN(subXP())+' xp</p><h1>Proof vault</h1><p class="lede">Every project you submitted, with its links and write-up. Retracting a submission removes its XP.</p></div></header>';
  if(!ids.length){
    const np=firstProject();
    el.innerHTML=head+'<div class="card empty"><h2>No projects yet</h2><p>'+(np?'Your first one is '+esc(np.q)+' in '+esc(phases[np.pi].short)+'. Submit it to earn your first XP.':'')+'</p>'+
      (np?'<button type="button" class="btn btn-primary" data-act="open-phase" data-pi="'+np.pi+'" data-id="'+qid(np.pi,np.si,np.qi)+'">Go to project</button>':'')+'</div>';
    return;
  }
  const link=(u,l)=>URL_OK(u)?'<a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+l+ic("external")+'</a>':'';
  const rows=ids.map(id=>{
    const s=state.subs[id], [pi,si,qi]=id.split("-").map(Number), ph=phases[pi], q=ph&&ph.stages[si]?ph.stages[si][1][qi]:"Unknown project";
    const links=link(s.repo,"Code")+link(s.live,"Live");
    return '<tr><td><b>'+esc(q)+'</b></td><td>'+(ph?esc(ph.short):'')+'</td><td>'+fmtDate(s.at)+'</td><td>'+(links||'<span class="muted">None</span>')+'</td><td class="num">'+(s.pain||1)+'/5</td><td class="num">+'+fmtN(s.xp)+'</td><td class="num"><button type="button" class="btn btn-sm" data-act="view-sub" data-id="'+id+'">View</button></td></tr>';
  }).join("");
  el.innerHTML=head+'<div class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Project</th><th>Phase</th><th>Submitted</th><th>Links</th><th class="num">Difficulty</th><th class="num">XP</th><th><span class="sr">Actions</span></th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
}

/* ---------- Trophies ---------- */
function renderTrophies(fresh){
  const el=$("view-trophies"), got=trophyDefs.filter(t=>state.trophies[t.id]).length;
  el.innerHTML='<header class="view-head"><div><p class="eyebrow">'+got+' of '+trophyDefs.length+' earned</p><h1>Trophies</h1><p class="lede">Each trophy adds 5 bond with your companion.</p></div></header><div class="grid g-trophies">'+
    trophyDefs.map(t=>{
      const has=state.trophies[t.id], secret=t.id==="konami"&&!has, dated=typeof has==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(has);
      return '<article class="card trophy'+(has?' got':'')+(fresh===t.id?' flash':'')+'"><span class="t-ico">'+ic(secret?"lock":t.icon)+'</span><div><b>'+(secret?'Hidden':esc(t.name))+'</b><span class="desc">'+(secret?'Try an old cheat code.':esc(t.desc))+'</span>'+
        (has?'<small>Earned'+(dated?' '+fmtDate(has+"T12:00:00"):'')+'</small>':'')+'</div></article>';
    }).join("")+'</div>';
}

/* ---------- Settings ---------- */
function accountCard(){
  const S=window.HQSync; if(!S) return "";
  const u=S.user, via=u.provider==="google.com"?"Google":u.provider==="local"?"nothing (test mode)":"email and password";
  return '<article class="card"><h2 class="card-title" style="margin-bottom:12px">Account</h2>'+
    '<div class="setting-row"><div><b>'+esc(u.email||u.name||"Signed in")+'</b><span class="desc" style="display:block">Signed in with '+via+'.'+(u.provider==="password"&&!u.verified?' Email not confirmed yet.':'')+'</span></div><button type="button" class="btn" data-act="sign-out">Sign out</button></div>'+
    '<div class="setting-row"><div><b>Delete account</b><span class="desc" style="display:block">Permanently deletes your account and everything saved to it.</span></div><button type="button" class="btn btn-danger" data-act="delete-account">Delete</button></div></article>';
}
const SHORTCUTS=[["1–8","Switch section"],["Ctrl+Enter","Run code in the Workshop"],["/","Search your notebook"],["R","Pick another quest"],["F","Start or pause the focus timer"],["G","Poke your companion"],["E","Feed its favourite snack"],["O","Get yelled at"],["M","Mute or unmute"],["P","Float your companion over other tabs"],["D","Switch light or dark mode"],["?","Show shortcuts"]];
function renderSettings(){
  $("view-settings").innerHTML='<header class="view-head"><div><h1>Settings</h1><p class="lede">'+(window.HQSync&&!HQSync.local?'Your progress is saved to your account and follows you to any device you sign in on.':'Progress is saved in this browser only. Export a backup before clearing browser data.')+'</p></div></header><div class="grid g-settings">'+accountCard()+
    '<article class="card"><h2 class="card-title" style="margin-bottom:12px">Preferences</h2>'+
      '<div class="setting-row"><div><b>Appearance</b><span class="desc" style="display:block">'+(getThemePref()==="system"?"Follows your device setting.":"Set manually.")+'</span></div><div class="seg" role="group" aria-label="Appearance">'+[["system","System"],["light","Light"],["dark","Dark"]].map(([k,l])=>'<button type="button" data-act="theme-set" data-theme="'+k+'" aria-pressed="'+(getThemePref()===k)+'">'+l+'</button>').join("")+'</div></div>'+
      '<div class="setting-row"><div><b>Rules</b><span class="desc" style="display:block">How quizzes, proof and progress work.</span></div><button type="button" class="btn" data-act="rules">'+ic("book")+'Read</button></div>'+
      '<div class="setting-row"><div><b>Floating companion</b><span class="desc" style="display:block">'+(pipSupported?'Keeps your companion on top of other tabs and apps while you work.':'Needs Chrome or Edge, version 116 or newer.')+'</span></div><button type="button" class="btn" data-act="pip"'+(pipSupported&&state.pet?'':' disabled')+'>'+ic("popout")+(pipWin?'Floating':'Float')+'</button></div>'+
      '<div class="setting-row"><div><b>Sound effects</b><span class="desc" style="display:block">Short blips for quests, level ups and evolutions.</span></div><button type="button" class="btn" data-act="sound" aria-pressed="'+state.sound+'">'+ic(state.sound?"sound":"mute")+(state.sound?"On":"Off")+'</button></div>'+
      '<div class="setting-row"><div><b>Companion</b><span class="desc" style="display:block">Swap for a different creature. Projects, level and trophies stay.</span></div><button type="button" class="btn" data-act="swap">'+ic("egg")+'Swap</button></div></article>'+
    '<article class="card"><h2 class="card-title" style="margin-bottom:12px">Backup</h2>'+
      '<div class="setting-row"><div><b>Export progress</b><span class="desc" style="display:block">Download a file with your quests, quiz answers, notes, projects and companion.</span></div><button type="button" class="btn" data-act="export">'+ic("download")+'Export</button></div>'+
      '<div class="setting-row"><div><b>Import progress</b><span class="desc" style="display:block">Replace everything here with an exported file.</span></div><button type="button" class="btn" data-act="import">'+ic("upload")+'Import</button></div></article>'+
    '<article class="card"><h2 class="card-title" style="margin-bottom:12px">Keyboard shortcuts</h2><dl class="kbd-list">'+SHORTCUTS.map(([k,v])=>'<dt><kbd>'+k+'</kbd></dt><dd>'+v+'</dd>').join("")+'</dl></article>'+
    '<article class="card danger-zone"><h2 class="card-title" style="margin-bottom:12px;color:var(--bad)">Reset</h2>'+
      '<div class="setting-row"><div><b>Delete all progress</b><span class="desc" style="display:block">Removes quests, quiz answers, notes, projects, trophies and your companion'+(window.HQSync&&!HQSync.local?' from your account':' from this browser')+'. This cannot be undone.</span></div><button type="button" class="btn btn-danger" data-act="reset">Delete</button></div></article>'+
  '</div>';
}
/* =========================================================
   PROGRESSION: checkmarks, submissions, levels, evolution
   ========================================================= */
const WIN_LINES=["tiny win, big brain.","witnessed. logged. respected.","learned it and used it. suspicious.",
  "one less mystery between you and shipping.","very respectable behaviour.","stats trained. my brain feels wrinklier.","nice. keep going."];
const STAGE_LINES={"Learn":"theory done. the exercises are unlocked.","Tiny Wins":"exercises done. the project is open, and this time i need proof.","Plan":"plan done. now we build."};
const SHIP_LINES=["proof accepted. i can feel myself growing.","that's real software on the real internet. by you.","project xp absorbed. my bones are rearranging. in a good way."];

function shownForm(){ const p=state.pet; return p?Math.min(formFor(level()),p.formSeen||0):0; }

function unlock(id){
  if(state.trophies[id]) return;
  const tr=trophyDefs.find(t=>t.id===id); if(!tr) return;
  state.trophies[id]=today(); addBond(5); save();
  setTimeout(()=>{ sfx.trophy(); toast("Trophy earned: "+tr.name,"","trophy"); },350);
  renderTabs(); if(view==="trophies") renderTrophies(id);
}
function checkTrophies(){
  const {t,d}=allCounts(), subs=Object.values(state.subs), f=shownForm();
  if(state.pet) unlock("hatch");
  if(d>=1) unlock("first");
  if(d>=10) unlock("ten");
  if(subs.length) unlock("ship");
  if(subs.filter(s=>URL_OK(s.live)).length>=5) unlock("live");
  if(phases.some((p,pi)=>phaseComplete(pi))) unlock("phase");
  if(t&&d/t>=.5) unlock("half");
  if(liveStreak()>=3) unlock("streak3");
  if(liveStreak()>=7) unlock("streak7");
  if(f>=1) unlock("evo");
  if(f>=3) unlock("mythic");
  if(t&&d===t) unlock("king");
}

function phaseClearedFx(pi){
  const next=phases[pi+1];
  sfx.done(); rain(200); anim("hop");
  if(next) roadmapPhase=pi+1;
  say(next?"phase cleared. "+next.short+" is open. i packed snacks.":"you finished the whole roadmap. i'm emotional. go build something real.");
  modal('<div class="modal-icon">'+ic(phases[pi].icon)+'</div><p class="eyebrow">Phase complete</p><h2>'+esc(phaseName(phases[pi]))+'</h2><p>'+
    (next?'Next up is <b>'+esc(next.title)+'</b>.':'Every phase is complete. Pick a real problem and build something people can use.')+'</p>',
    {center:true,buttons:next?[{label:"Stay here"},{label:"Open "+esc(next.short),cls:"btn-primary",onClick(){ roadmapPhase=pi+1; setTimeout(()=>go("roadmap"),0); }}]:undefined});
}

/* ---------- checkpoint completion: quiz passed, plus proof for project steps ---------- */
function syncQuest(pi,si,qi,srcEl){
  const id=qid(pi,si,qi), was=!!state.done[id], now=questComplete(pi,si,qi);
  if(was===now) return false;
  const wasStage=stageComplete(pi,si), wasPhase=phaseComplete(pi), stage=phases[pi].stages[si][0], tr=TRAIN[stage], p=state.pet;
  let snack=null;
  if(now){
    state.done[id]=true; updateStreak(); touch();
    if(p){ addBond(1); p.rewarded=p.rewarded||{}; if(!p.rewarded[id]){ p.rewarded[id]=1; snack=rand(SNACKS); giveSnack(snack.id); } }
  }else delete state.done[id];
  if(pickedId===id) pickedId=null;
  save(); renderSide(); renderTabs(); renderView();
  if(!now) return true;
  const src=srcEl&&document.contains(srcEl)?srcEl:$("q-"+id), r=src?src.getBoundingClientRect():null;
  const x=r?r.left+r.width/2:innerWidth/2, y=r?r.top:innerHeight/2;
  sfx.check(); if(tr) floater(x,y-6,trainText(tr)); burst(x,y,10,4);
  setMood("happy",1800); anim("squish");
  if(snack&&gob){ const g=gob.getBoundingClientRect(); setTimeout(()=>heartPop(g.left+g.width*.78,g.top+g.height*.2,'<span class="snack-pop">'+ic(snack.icon)+'+1</span>'),350); }
  const h=new Date().getHours();
  if(h<5) unlock("night"); else if(h<7) unlock("early");
  if(phaseComplete(pi)&&!wasPhase) phaseClearedFx(pi);
  else if(stageComplete(pi,si)&&!wasStage){ sfx.coin(); say(STAGE_LINES[stage]||"stage cleared. onwards."); }
  else say(rand(WIN_LINES));
  checkTrophies();
  return true;
}

/* ---------- submission form ---------- */
const URL_OK = u => /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]{2,}/i.test(u||"");
function calcXP(base, f){
  const bonus=[];
  if(URL_OK(f.live)) bonus.push(["live demo",.2]);
  if((f.bug||"").trim().length>=30) bonus.push(["bug story",.15]);
  if((f.what||"").trim().length>=250) bonus.push(["detailed write-up",.15]);
  return {total:Math.round(base*(1+bonus.reduce((a,b)=>a+b[1],0))), bonus};
}
function openSubmit(pi,si,qi){
  if(!state.pet) return;
  touch();
  const id=qid(pi,si,qi), stage=phases[pi].stages[si][0], kind=subKind(stage), base=subBaseXP(pi,si);
  const q=phases[pi].stages[si][1][qi], p=state.pet, prev=state.subs[id]||{}, minText=kind==="write"?120:40;
  let pain=prev.pain||2, busy=false;
  setMood("focus"); say(kind==="write"?"explain it like i'm a "+SPECIES[p.species].line.toLowerCase()+". (i am.)":"a submission. show me the code.");
  const html='<p class="eyebrow">'+esc(phases[pi].short)+' · '+esc(stage)+'</p><h2>'+esc(q)+'</h2>'+
    '<p>'+(kind==="write"?'Explain it in your own words. A link is optional.':'Link the public GitHub repository and the deployed site, then describe what you built.')+'</p>'+
    '<form id="subForm" novalidate>'+
      '<label class="field"><span class="field-label">'+(kind==="ship"?'GitHub repository':'Link')+'<small>'+(kind==="ship"?'Required':'Optional')+'</small></span><input class="input" type="url" name="repo" inputmode="url" placeholder="https://github.com/you/project" value="'+esc(prev.repo||"")+'"></label>'+
      '<label class="field"><span class="field-label">'+(kind==="ship"?'Deployed link<small>Required · +20% XP':'Live demo<small>Optional · +20% XP')+'</small></span><input class="input" type="url" name="live" inputmode="url" placeholder="https://your-project.netlify.app" value="'+esc(prev.live||"")+'"></label>'+
      '<label class="field"><span class="field-label">'+(kind==="write"?'Your explanation':'What you built and learned')+'<small>At least '+minText+' characters</small></span><textarea class="input" name="what" rows="4" placeholder="'+(kind==="write"?'The browser sends a request to...':'I built... The tricky part was... I learned...')+'">'+esc(prev.what||"")+'</textarea><div class="count" id="whatCount"></div></label>'+
      '<label class="field"><span class="field-label">Hardest bug you fixed<small>Optional · +15% XP</small></span><textarea class="input" name="bug" rows="2" placeholder="It kept returning undefined because...">'+esc(prev.bug||"")+'</textarea></label>'+
      '<div class="field"><span class="field-label">Difficulty<small>1 easy, 5 brutal</small></span><div class="seg" role="group" aria-label="Difficulty">'+[1,2,3,4,5].map(n=>'<button type="button" data-pain="'+n+'" aria-pressed="'+(pain===n)+'">'+n+'</button>').join("")+'</div></div>'+
      '<label class="check"><input type="checkbox" name="runs"'+(prev.at?' checked':'')+'> '+(kind==="write"?'This explanation is in my own words.':'It runs, and I have run it myself.')+'</label>'+
      '<label class="check"><input type="checkbox" name="mine"'+(prev.at?' checked':'')+'> I wrote it myself. AI gave hints, not the answer.</label>'+
    '</form><div class="xp-preview" id="xpPrev"></div><div class="scan" id="scanBar" hidden><i></i></div><div class="scan-log" id="scanLog" aria-live="polite"></div><div class="form-error" id="formErr" role="alert"></div>';

  const read=root=>{ const f=root.querySelector("#subForm"); return {repo:f.repo.value.trim(),live:f.live.value.trim(),what:f.what.value.trim(),bug:f.bug.value.trim(),runs:f.runs.checked,mine:f.mine.checked,pain}; };
  const refresh=root=>{
    const f=read(root), x=calcXP(base,f), c=root.querySelector("#whatCount");
    c.textContent=f.what.length+" / "+minText; c.classList.toggle("ok",f.what.length>=minText);
    root.querySelector("#xpPrev").innerHTML='Base '+fmtN(base)+' xp'+x.bonus.map(b=>' <span class="bonus">+'+Math.round(b[1]*100)+'% '+b[0]+'</span>').join("")+' = <b>'+fmtN(x.total)+' xp</b>'+
      (prev.xp?' <span class="muted">(currently '+fmtN(prev.xp)+')</span>':'')+
      (x.bonus.length?'':'<br><span class="muted">A live link, a bug story or a write-up over 250 characters each add XP.</span>');
  };
  modal(html,{wide:true,sticky:true,
    onMount(root){
      refresh(root);
      const form=root.querySelector("#subForm");
      form.addEventListener("input",e=>{ e.target.removeAttribute("aria-invalid"); refresh(root); });
      form.addEventListener("submit",e=>{ e.preventDefault(); root.querySelector('[data-b="1"]').click(); });
      root.querySelectorAll("[data-pain]").forEach(b=>b.addEventListener("click",()=>{
        pain=+b.dataset.pain; sfx.roll();
        root.querySelectorAll("[data-pain]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));
        if(pain===5){ setMood("shock",1500); say("difficulty 5? who hurt you. (it was CSS, wasn't it.)"); }
      }));
    },
    onClose(){ if(!busy) setMood(baseMood()); },
    buttons:[
      {label:"Cancel"},
      {label:prev.at?"Update proof":"Submit proof",cls:"btn-primary",onClick(close,root){
        if(busy) return false;
        const f=read(root), err=root.querySelector("#formErr"), form=root.querySelector("#subForm");
        const fail=(msg,name)=>{ err.textContent=msg; sfx.uncheck(); if(name&&form[name]){ form[name].setAttribute("aria-invalid","true"); form[name].focus(); } return false; };
        if(kind==="ship"&&!/^https:\/\/(www\.)?github\.com\/[\w.-]+\/[\w.-]+/i.test(f.repo)) return fail("Add your public GitHub repository link, like https://github.com/you/project.","repo");
        if(kind==="ship"&&!URL_OK(f.live)) return fail("Add the deployed link where the project is live.","live");
        if(kind==="write"&&f.repo&&!URL_OK(f.repo)) return fail("That link doesn't look like a web address. Leave it empty if you don't have one.","repo");
        if(f.live&&!URL_OK(f.live)) return fail("The live demo link doesn't look like a web address.","live");
        if(f.what.length<minText) return fail("Write at least "+minText+" characters. Explaining it is half of learning it.","what");
        if(!f.runs||!f.mine) return fail("Tick both confirmation boxes to submit.",!f.runs?"runs":"mine");
        busy=true; err.textContent="";
        root.querySelectorAll("button,input,textarea").forEach(b=>b.disabled=true);
        root.querySelector("#scanBar").hidden=false;
        const log=root.querySelector("#scanLog"), lines=kind==="ship"?["Reading the link","Checking the write-up","Counting semicolons","Approved"]:["Reading your explanation","Checking it makes sense","Approved"];
        const step=reduceMotion?60:420;
        lines.forEach((l,i)=>setTimeout(()=>{ log.textContent=l; sfx.scan(); },i*step));
        setTimeout(()=>{
          busy=false; close();
          finalizeSubmission(pi,si,qi,{repo:f.repo,live:f.live,what:f.what,bug:f.bug,pain:f.pain,xp:calcXP(base,f).total});
        },lines.length*step+200);
        return false;
      }}
    ]});
}

function finalizeSubmission(pi,si,qi,data){
  const id=qid(pi,si,qi), p=state.pet, wasPhase=phaseComplete(pi), prevL=level(), prevStats=statsNow();
  const resub=!!state.subs[id], hadMove=learnedMoves().some(m=>m.pi===pi), gained=data.xp-(resub?state.subs[id].xp||0:0);
  const srcRow=$("q-"+id), rr=srcRow?srcRow.getBoundingClientRect():null;
  state.subs[id]={...data, at:resub?state.subs[id].at:Date.now()};
  if(questComplete(pi,si,qi)) state.done[id]=true;
  updateStreak();
  if(!resub){ addBond(10); SNACKS.forEach(s=>giveSnack(s.id,1)); }
  if(pickedId===id) pickedId=null;
  save(); renderTabs(); renderView(); renderCare();
  const sx=rr?rr.right-80:innerWidth/2, sy=rr?rr.top+rr.height/2:innerHeight/2;
  flyOrbs(sx,sy,()=>{
    renderSide(); if(view==="companion"||view==="today") renderView();
    if(gob){ const g=gob.getBoundingClientRect(); floater(g.left+g.width/2,g.top+18,(gained>=0?"+":"")+fmtN(gained)+" xp"); burst(g.left+g.width/2,g.top+g.height/2,24,6); }
    sfx.coin(); setMood("happy",2500); anim("hop");
    toast(resub?"Proof updated":"Proof submitted: +"+fmtN(gained)+" xp","","check");
    if(quizPass(id)<5) setTimeout(()=>toast("Pass the quiz to finish this checkpoint.","","doc"),900);
    say(resub?"submission updated. i read it again. still proud.":rand(SHIP_LINES));
    if(!hadMove&&MOVES[pi]) setTimeout(()=>{ toast(p.nick+" learned "+MOVES[pi].name,"","star"); sfx.trophy(); },700);
    if(phaseComplete(pi)&&!wasPhase) phaseClearedFx(pi);
    checkTrophies();
    levelFlow(prevL, prevStats);
  });
}

function flyOrbs(x,y,cb){
  if(!gob||reduceMotion){ cb(); return; }
  const r=gob.getBoundingClientRect();
  if(r.bottom<0||r.top>innerHeight){ cb(); return; }
  const tx=r.left+r.width/2, ty=r.top+r.height/2;
  for(let i=0;i<12;i++){
    const o=document.createElement("div"), d=.65+i*.035;
    o.style.cssText="position:fixed;z-index:147;left:"+x+"px;top:"+y+"px;width:7px;height:7px;background:#F2A516;pointer-events:none;transition:transform "+d+"s cubic-bezier(.5,-0.4,.6,1),opacity .2s "+(d-.1)+"s";
    document.body.appendChild(o);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ o.style.transform="translate("+(tx-x+(Math.random()-.5)*36)+"px,"+(ty-y+(Math.random()-.5)*36)+"px)"; o.style.opacity="0"; }));
    setTimeout(()=>{ o.remove(); if(i%3===0) sfx.roll(); },d*1000+40);
  }
  setTimeout(cb,1150);
}

/* ---------- level up, then maybe evolve ---------- */
function levelFlow(prevL, prevStats){
  const L=level(), p=state.pet; if(!p||L<=prevL) return;
  const sp=SPECIES[p.species], oldForm=shownForm(), newForm=formFor(L), mid=computeStats(L,oldForm);
  sfx.level(); rain(140); setMood("happy",3000); anim("hop");
  p.levelSeen=L; save();
  modal(creatureSVG(p.species,oldForm,"bob m-happy")+'<p class="eyebrow">Level up</p><div class="big-num">Lv '+prevL+' → '+L+'</div>'+
    '<p>'+esc(p.nick)+' got stronger.'+(newForm>oldForm?' <b style="color:var(--ink)">Something is happening.</b>':'')+'</p>'+
    '<div class="levels">'+STATS.map(s=>'<span>'+s.n+'</span><span class="o">'+prevStats[s.k]+' → <b>'+mid[s.k]+'</b></span><span class="d">+'+(mid[s.k]-prevStats[s.k])+'</span>').join("")+'</div>',
    {center:true,buttons:[{label:newForm>oldForm?"Watch it evolve":"Continue",cls:"btn-primary"}],
     onClose(){ if(newForm>(p.formSeen||0)) setTimeout(()=>evolve(p.formSeen||0,newForm),200); }});
}
function evolve(from,to){
  const p=state.pet, root=$("evoRoot");
  if(!p||to<=from) return;
  const sp=SPECIES[p.species];
  const finish=()=>{
    root.innerHTML=""; p.formSeen=to; save();
    mountCreature(); renderAll(); rain(220); anim("hop"); setMood("happy",3500);
    say("i'm "+sp.forms[to]+" now. look at me. "+sp.cry);
    unlock("evo"); if(to>=3) unlock("mythic");
  };
  if(reduceMotion){
    finish();
    modal(creatureSVG(p.species,to,"m-happy")+'<p class="eyebrow">Evolution</p><h2>'+esc(p.nick)+' evolved into '+esc(sp.forms[to])+'</h2><p>'+FORM_LABEL[to]+' form unlocked.</p>',{center:true});
    return;
  }
  setMood("shock");
  root.innerHTML='<div class="evo" role="dialog" aria-modal="true" aria-label="Evolution"><div class="evo-stage"><div id="evoA">'+creatureSVG(p.species,from,"bob m-shock")+'</div><div id="evoB" style="opacity:0">'+creatureSVG(p.species,to,"sil-white m-happy")+'</div></div>'+
    '<div class="evo-text"><h2 id="evoH">'+esc(p.nick)+' is evolving</h2><p id="evoP">Something is changing.</p></div><div class="evo-flash" id="evoFlash"></div></div>';
  const evoEl=root.querySelector(".evo"), A=root.querySelector("#evoA"), B=root.querySelector("#evoB");
  const orbTimer=setInterval(()=>{
    const o=document.createElement("div"); o.className="px";
    const a=Math.random()*6.283, R=220+Math.random()*200, cx=innerWidth/2, cy=innerHeight*.42;
    o.style.left=(cx+Math.cos(a)*R)+"px"; o.style.top=(cy+Math.sin(a)*R)+"px"; o.style.transition="transform .9s ease-in,opacity .9s ease-in";
    evoEl.appendChild(o);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{ o.style.transform="translate("+(-Math.cos(a)*R)+"px,"+(-Math.sin(a)*R)+"px)"; o.style.opacity=".1"; }));
    setTimeout(()=>o.remove(),950);
  },90);
  setTimeout(()=>{ A.querySelector("svg").classList.add("sil-white"); sfx.evoTick(0); },1000);
  let n=0, gap=520;
  const flick=()=>{
    n++; const showB=n%2===1;
    B.style.opacity=showB?1:0; A.style.opacity=showB?0:1;
    sfx.evoTick(n); gap=Math.max(45,gap*.85);
    if(n<28) setTimeout(flick,gap); else finale();
  };
  setTimeout(flick,1900);
  function finale(){
    clearInterval(orbTimer); $("evoFlash").classList.add("go");
    setTimeout(()=>{
      A.style.opacity=0; B.style.opacity=1;
      const s=B.querySelector("svg"); s.classList.remove("sil-white"); s.classList.add("bob");
      sfx.evolve();
      $("evoH").textContent=p.nick+" evolved into "+sp.forms[to];
      $("evoP").innerHTML=esc(FORM_LABEL[to])+' form · base stats ×'+(FORM_MULT[to]/FORM_MULT[from]).toFixed(2)+'<br><button type="button" class="btn btn-amber" id="evoGo" style="margin-top:18px">Continue</button>';
      const go2=$("evoGo"); go2.focus(); go2.addEventListener("click",finish);
    },300);
  }
}

/* ---------- view, edit, retract ---------- */
function viewSubmission(id){
  const s=state.subs[id], t=questOf(id); if(!s||!t) return;
  const {pi,si,qi,q}=t;
  const link=(u,l)=>URL_OK(u)?'<a class="btn btn-sm" href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+l+ic("external")+'</a>':'';
  const links=link(s.repo,"Open code")+link(s.live,"Open live demo");
  modal('<p class="eyebrow">'+esc(phases[pi].short)+' · Submitted '+fmtDate(s.at)+'</p><h2>'+esc(q)+'</h2>'+
    (links?'<div class="actions" style="margin-top:14px">'+links+'</div>':'')+
    '<div class="field"><span class="field-label">What you built and learned</span><p style="white-space:pre-wrap">'+esc(s.what)+'</p></div>'+
    (s.bug?'<div class="field"><span class="field-label">Hardest bug</span><p style="white-space:pre-wrap">'+esc(s.bug)+'</p></div>':'')+
    '<p class="muted" style="margin-top:16px">Difficulty '+(s.pain||1)+'/5 · +'+fmtN(s.xp)+' xp</p>',
    {wide:true,buttons:[
      {label:"Retract",cls:"btn-danger",onClick(){ setTimeout(()=>retract(id),150); }},
      {label:"Edit",onClick(){ setTimeout(()=>openSubmit(pi,si,qi),150); }},
      {label:"Close",cls:"btn-primary"}
    ]});
}
function retract(id){
  confirmModal("Retract this submission?","You lose its XP, your companion may drop back a form, and phases that depend on it lock again.","Retract",()=>{
    delete state.subs[id]; delete state.done[id];
    const p=state.pet; if(p) p.formSeen=Math.min(p.formSeen||0,formFor(level()));
    save(); mountCreature(); renderAll();
    sfx.uncheck(); setMood("shock",1600); anim("shake");
    toast("Submission retracted","","trash");
    say("retracted. i feel smaller. emotionally and physically.");
  });
}
/* =========================================================
   QUIZZES, NOTES AND RULES
   A checkpoint is finished when its 5-question quiz is passed
   (and, for project steps, proof is submitted).
   ========================================================= */
const questOf = id => {
  const [pi,si,qi]=String(id).split("-").map(Number), st=phases[pi]&&phases[pi].stages[si];
  return st&&st[1][qi]!==undefined?{id,pi,si,qi,q:st[1][qi],stage:st[0]}:null;
};
function shuffleIdx(n){ const a=[...Array(n).keys()]; for(let i=n-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function learnLinks(t){
  const q=encodeURIComponent(t.q+" "+phases[t.pi].short), ext=ic("external");
  return '<span class="learn-links"><span>Learn it:</span>'+
    '<a href="https://www.youtube.com/results?search_query='+q+'" target="_blank" rel="noopener noreferrer">YouTube'+ext+'</a>'+
    '<a href="https://en.wikipedia.org/w/index.php?search='+q+'" target="_blank" rel="noopener noreferrer">Wikipedia'+ext+'</a>'+
    '<a href="https://www.google.com/search?q='+q+'" target="_blank" rel="noopener noreferrer">Web'+ext+'</a></span>';
}

/* ---------- quiz ---------- */
let quizSession=null;
function openQuiz(id, srcEl){
  const t=questOf(id), bank=QUIZ[id];
  if(!t||!bank) return;
  if(!stageAvailable(t.pi,t.si)){ toast("Finish the earlier checkpoints to unlock this quiz.","","lock"); return; }
  flushNote(); touch();
  const rec=state.quiz[id]&&Array.isArray(state.quiz[id].p)?{...state.quiz[id],p:[...state.quiz[id].p]}:{p:[0,0,0,0,0],t:0};
  const review=rec.p.every(Boolean);
  const queue=bank.map((_,i)=>i).filter(i=>review||!rec.p[i]);
  quizSession={id,t,bank,rec,queue,pos:0,review,results:{},order:{},picked:null,checked:false,done:false,srcEl};
  setMood("focus");
  if(!review) say(rand(["quiz time. no peeking at other tabs.","five questions. skip what you don't know yet.","show me what you learned."]));
  modal('<div id="quizRoot"></div>',{wide:true,buttons:[],
    onMount(root){
      renderQuiz();
      const box=$("quizRoot");
      box.addEventListener("click",quizClick);
      root.querySelector(".modal").addEventListener("keydown",quizKeys);
    },
    onClose(){ const s=quizSession; quizSession=null; if(s) afterQuiz(s); }});
}
function renderQuiz(){
  const s=quizSession, box=$("quizRoot");
  if(!s||!box) return;
  const {t,bank,rec}=s, cur=s.done?-1:s.queue[s.pos];
  const steps=bank.map((_,i)=>'<i class="'+(rec.p[i]?'pass':s.results[i]==="miss"?'miss':i===cur?'now':'')+'"></i>').join("");
  const head='<p class="eyebrow">'+esc(phases[t.pi].short)+' · '+esc(t.stage)+' · Quiz</p><h2>'+esc(t.q)+'</h2>'+
    '<div class="quiz-top"><div class="quiz-steps" aria-hidden="true">'+steps+'</div>'+learnLinks(t)+'</div>';
  if(s.done){ box.innerHTML=head+quizSummary(s); const b=box.querySelector('.quiz-bar .btn-primary'); if(b) b.focus({preventScroll:true}); return; }

  const item=bank[cur];
  if(!s.order[cur]) s.order[cur]=shuffleIdx(item.o.length);
  const opts=s.order[cur].map((oi,k)=>{
    const [txt,isCode]=item.o[oi];
    let cls="";
    if(s.review&&oi===item.a) cls=" right";
    else if(s.checked&&oi===s.picked) cls=oi===item.a?" right":" wrong";
    const on=s.review?oi===item.a:s.picked===oi;
    return '<button type="button" class="opt'+cls+'" role="radio" aria-checked="'+on+'" data-opt="'+oi+'"><span class="k">'+"ABCD"[k]+'</span>'+
      (isCode?'<pre class="code">'+esc(txt)+'</pre>':'<span>'+esc(txt)+'</span>')+'</button>';
  }).join("");
  const verdict=!s.checked?'':s.picked===item.a
    ?'<div class="verdict ok" role="status">'+ic("check")+'<span>Correct. This one is locked in.</span></div>'
    :'<div class="verdict bad" role="status">'+ic("warn")+'<span>Not quite. This question stays open. Read up on it and try again later.</span></div>';
  const last=s.pos>=s.queue.length-1;
  const bar=s.review
    ?'<div class="quiz-bar"><span class="hint muted">You passed this quiz. Showing the correct answers.</span><div class="actions">'+(s.pos>0?'<button type="button" class="btn" data-q="prev">Previous</button>':'')+'<button type="button" class="btn btn-primary" data-q="'+(last?'close':'next')+'">'+(last?'Done':'Next')+'</button></div></div>'
    :s.checked
      ?'<div class="quiz-bar"><span></span><button type="button" class="btn btn-primary" data-q="next">'+(last?'See results':'Next question')+'</button></div>'
      :'<div class="quiz-bar"><button type="button" class="btn btn-ghost" data-q="skip">Skip for now</button><button type="button" class="btn btn-primary" data-q="check"'+(s.picked===null?' disabled':'')+'>Check answer</button></div>';
  box.innerHTML=head+'<div class="quiz-q"><p class="num">Question '+(cur+1)+' of 5'+(!s.review&&s.queue.length<5?' · '+s.queue.length+' left to answer':'')+'</p>'+
    '<h3>'+esc(item.q)+'</h3>'+(item.c?'<pre class="code">'+esc(item.c)+'</pre>':'')+
    '<div class="opts'+(s.checked||s.review?' locked':'')+'" role="radiogroup" aria-label="Answers">'+opts+'</div>'+verdict+'</div>'+bar;
}
function quizFocus(sel){ const el=$("quizRoot")&&$("quizRoot").querySelector(sel); if(el) el.focus({preventScroll:true}); }
function quizClick(e){
  const s=quizSession; if(!s) return;
  const o=e.target.closest("[data-opt]");
  if(o){
    if(s.checked||s.review) return;
    s.picked=+o.dataset.opt; sfx.roll(); renderQuiz(); quizFocus('[data-opt="'+s.picked+'"]');
    return;
  }
  const b=e.target.closest("[data-q]"); if(!b||b.disabled) return;
  switch(b.dataset.q){
    case "check": checkAnswer(); break;
    case "skip": s.results[s.queue[s.pos]]="skip"; advanceQuiz(); break;
    case "next": advanceQuiz(); break;
    case "prev": s.pos--; renderQuiz(); quizFocus('.quiz-bar .btn-primary'); break;
    case "close": closeModal(); break;
    case "notes": { const id=s.id; closeModal(); setTimeout(()=>openNote(id),150); } break;
    case "proof": { const {pi,si,qi}=s.t; closeModal(); setTimeout(()=>openSubmit(pi,si,qi),150); } break;
  }
}
function quizKeys(e){
  const s=quizSession;
  if(!s||s.done||s.review||e.ctrlKey||e.metaKey||e.altKey) return;
  const k=(e.key||"").toLowerCase(), n="1234".indexOf(k)>=0?"1234".indexOf(k):"abcd".indexOf(k);
  if(k.length===1&&n>=0&&!s.checked){
    const cur=s.queue[s.pos];
    if(!s.order[cur]||n>=s.order[cur].length) return;
    e.preventDefault(); s.picked=s.order[cur][n]; sfx.roll(); renderQuiz(); quizFocus('[data-opt="'+s.picked+'"]');
  }else if(k==="enter"&&document.activeElement&&document.activeElement.matches(".opt")&&s.picked!==null&&!s.checked){
    e.preventDefault(); checkAnswer();
  }
}
function checkAnswer(){
  const s=quizSession; if(!s||s.picked===null||s.checked) return;
  const cur=s.queue[s.pos], item=s.bank[cur];
  s.checked=true; s.rec.t=(s.rec.t||0)+1; s.rec.at=Date.now();
  if(s.picked===item.a){ s.rec.p[cur]=1; s.results[cur]="pass"; sfx.check(); }
  else{ s.results[cur]="miss"; sfx.uncheck(); }
  state.quiz[s.id]=s.rec; save();
  renderQuiz(); quizFocus('.quiz-bar .btn-primary');
}
function advanceQuiz(){
  const s=quizSession; if(!s) return;
  if(s.pos>=s.queue.length-1) s.done=true; else s.pos++;
  s.picked=null; s.checked=false;
  renderQuiz();
  if(!s.done) quizFocus(s.review?'.quiz-bar .btn-primary':'.opt');
}
function quizSummary(s){
  const n=s.rec.p.filter(Boolean).length, sub=isSubStage(s.t.stage), proof=!!state.subs[s.id], open=5-n;
  const msg=n===5
    ?(sub&&!proof?"All 5 correct. Submit your GitHub repository and deployed link to finish this checkpoint.":"All 5 correct. Checkpoint finished.")
    :plural(open,"question")+" still open. Learn the topic, then come back and finish "+(open>1?"them":"it")+".";
  const rows=s.bank.map((q,i)=>'<li>'+(s.rec.p[i]?'<span class="pass" title="Correct">'+ic("check")+'</span>':'<span class="open" title="'+(s.results[i]==="miss"?"Incorrect":"Not answered")+'">'+ic(s.results[i]==="miss"?"warn":"refresh")+'</span>')+'<span>'+esc(q.q)+'</span></li>').join("");
  return '<div class="quiz-q"><p class="quiz-score">'+n+' / 5</p><p class="muted" style="margin-top:4px">'+msg+'</p><ul class="list quiz-sum">'+rows+'</ul></div>'+
    '<div class="quiz-bar"><button type="button" class="btn" data-q="notes">'+ic("pencil")+'Open notes</button>'+
    (n===5&&sub&&!proof?'<button type="button" class="btn btn-primary" data-q="proof">Submit proof</button>':'<button type="button" class="btn btn-primary" data-q="close">'+(n===5?'Done':'Close')+'</button>')+'</div>';
}
function afterQuiz(s){
  const {pi,si,qi}=s.t;
  setMood(baseMood());
  if(!syncQuest(pi,si,qi,s.srcEl)){ renderSide(); renderTabs(); renderView(); }
}

/* ---------- notes ---------- */
let notePending=null, noteTimer=null;
const fmtWhen = t => new Date(t).toLocaleString(undefined,{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});
function noteLinksHTML(text){
  const urls=[...new Set(String(text||"").match(/https?:\/\/[^\s<>"'`)\]]+/g)||[])].slice(0,12);
  if(!urls.length) return "";
  return '<h3 class="card-title">Links in this note</h3><ul>'+urls.map(u=>'<li><a href="'+esc(u)+'" target="_blank" rel="noopener noreferrer">'+ic("external")+esc(u)+'</a></li>').join("")+'</ul>';
}
function noteEditorHTML(id){
  const t=questOf(id), n=state.notes[id]||{}, passed=quizPass(id), done=!!state.done[id];
  return '<p class="eyebrow">'+esc(phases[t.pi].short)+' · '+esc(t.stage)+' · '+(done?'Finished':'Quiz '+passed+'/5')+'</p><h2>'+esc(t.q)+'</h2>'+
    '<div style="margin-top:8px">'+learnLinks(t)+'</div>'+
    '<textarea class="input note-area" data-note="'+id+'" aria-label="Notes for '+esc(t.q)+'" placeholder="Write or paste notes here. Key ideas, code snippets, and links to the video or article you learned from.">'+esc(n.text||"")+'</textarea>'+
    '<div class="editor-foot"><span data-note-saved>'+(n.at?'Saved '+fmtWhen(n.at):'Saves automatically')+'</span><span data-note-count>'+(n.text||"").length+' characters</span></div>'+
    '<div class="note-links" data-note-links>'+noteLinksHTML(n.text)+'</div>';
}
function saveNote(id,text){
  if(String(text).trim()) state.notes[id]={text:String(text),at:Date.now()};
  else delete state.notes[id];
  save();
  document.querySelectorAll('[data-note-saved]').forEach(el=>el.textContent=state.notes[id]?'Saved '+fmtWhen(state.notes[id].at):'Saves automatically');
  document.querySelectorAll('[data-note-links]').forEach(el=>el.innerHTML=noteLinksHTML(text));
  renderTabs();
  if(view==="notebook") renderNbList();
}
function flushNote(){
  if(!notePending) return;
  clearTimeout(noteTimer);
  const {id,text}=notePending; notePending=null; saveNote(id,text);
}
document.addEventListener("input",e=>{
  const ta=e.target.closest&&e.target.closest("textarea[data-note]"); if(!ta) return;
  notePending={id:ta.dataset.note,text:ta.value};
  document.querySelectorAll('[data-note-count]').forEach(el=>el.textContent=ta.value.length+' characters');
  document.querySelectorAll('[data-note-saved]').forEach(el=>el.textContent='Saving');
  clearTimeout(noteTimer); noteTimer=setTimeout(flushNote,400);
});
addEventListener("beforeunload",flushNote);
addEventListener("pagehide",flushNote);
function openNote(id){
  if(!questOf(id)) return;
  flushNote();
  modal(noteEditorHTML(id),{wide:true,
    buttons:[{label:"Open in notebook",onClick(){ setTimeout(()=>{ nbSelected=id; go("notebook"); },0); }},{label:"Done",cls:"btn-primary"}],
    onMount(root){ const ta=root.querySelector("textarea"); ta.focus({preventScroll:true}); ta.setSelectionRange(ta.value.length,ta.value.length); },
    onClose(){ flushNote(); if(view==="roadmap"||view==="today") renderView(); }});
}

/* ---------- notebook view ---------- */
let nbQuery="", nbFilter="finished", nbSelected=null;
function notebookItems(){
  const q=nbQuery.trim().toLowerCase(), out=[];
  phases.forEach((p,pi)=>p.stages.forEach((st,si)=>st[1].forEach((title,qi)=>{
    const id=qid(pi,si,qi), done=!!state.done[id], note=hasNote(id)?state.notes[id].text:"";
    if(nbFilter==="finished"&&!done) return;
    if(nbFilter==="notes"&&!note) return;
    if(q&&!(title.toLowerCase().includes(q)||p.short.toLowerCase().includes(q)||st[0].toLowerCase().includes(q)||note.toLowerCase().includes(q))) return;
    out.push({id,pi,title,stage:st[0],done,note});
  })));
  return out;
}
function markMatch(text,q){
  const s=String(text||"");
  if(!q) return esc(s);
  const lo=s.toLowerCase(), ql=q.toLowerCase();
  let out="", i=0, j;
  while((j=lo.indexOf(ql,i))>=0){ out+=esc(s.slice(i,j))+'<mark>'+esc(s.slice(j,j+q.length))+'</mark>'; i=j+q.length; }
  return out+esc(s.slice(i));
}
function noteSnippet(note,q){
  const flat=String(note).replace(/\s+/g," ").trim();
  const at=q?flat.toLowerCase().indexOf(q.toLowerCase()):-1;
  const start=at>40?at-40:0, piece=flat.slice(start,start+140);
  return (start?"...":"")+markMatch(piece,q)+(start+140<flat.length?"...":"");
}
function renderNotebook(){
  const el=$("view-notebook"), {d}=allCounts(), notesN=Object.keys(state.notes).filter(hasNote).length;
  el.innerHTML='<header class="view-head"><div><p class="eyebrow">'+plural(d,"finished checkpoint")+' · '+plural(notesN,"note")+'</p><h1>Notebook</h1>'+
    '<p class="lede">Notes for every checkpoint. Search what you have finished by topic or by anything you wrote.</p></div></header>'+
    '<div class="grid g-notebook"><div>'+
      '<div class="search">'+ic("search")+'<input class="input" type="search" id="nbSearch" placeholder="Search checkpoints and notes" autocomplete="off" aria-label="Search checkpoints and notes" value="'+esc(nbQuery)+'"><kbd aria-hidden="true">/</kbd></div>'+
      '<div class="nb-filter"><div class="seg" role="group" aria-label="Show">'+[["finished","Finished"],["notes","With notes"],["all","All"]].map(([k,l])=>'<button type="button" data-act="nb-filter" data-f="'+k+'" aria-pressed="'+(nbFilter===k)+'">'+l+'</button>').join("")+'</div><span class="muted" id="nbCount"></span></div>'+
      '<ul class="nb-list" id="nbList"></ul>'+
    '</div><article class="card editor" id="nbEditor"></article></div>';
  $("nbSearch").addEventListener("input",e=>{ nbQuery=e.target.value; renderNbList(); });
  renderNbList(); renderNbEditor();
}
function renderNbList(){
  const list=$("nbList"); if(!list) return;
  const items=notebookItems(), q=nbQuery.trim();
  document.querySelectorAll('[data-act="nb-filter"]').forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.f===nbFilter)));
  $("nbCount").textContent=plural(items.length,"result");
  if(!items.length){
    list.innerHTML='<li class="nb-empty">'+(q?'Nothing matches "'+esc(q)+'".':nbFilter==="finished"?'No finished checkpoints yet. Pass a quiz to finish one.':nbFilter==="notes"?'No notes yet. Open any checkpoint and start writing.':'')+'</li>';
    return;
  }
  list.innerHTML=items.slice(0,250).map(x=>'<li><button type="button" class="nb-item" data-act="note-select" data-id="'+x.id+'" aria-current="'+(x.id===nbSelected)+'">'+
    '<b>'+markMatch(x.title,q)+'</b><small>'+esc(phases[x.pi].short)+' · '+esc(x.stage)+(x.done?' · Finished':'')+'</small>'+
    (x.note?'<span class="snip">'+noteSnippet(x.note,q)+'</span>':'')+'</button></li>').join("");
}
function renderNbEditor(){
  const ed=$("nbEditor"); if(!ed) return;
  if(!nbSelected||!questOf(nbSelected)){ const first=notebookItems()[0]; nbSelected=first?first.id:null; }
  if(!nbSelected){
    ed.innerHTML='<div class="empty"><h2>Nothing here yet</h2><p>Finished checkpoints show up here with their notes. You can write notes for any checkpoint from the Roadmap.</p><button type="button" class="btn btn-primary" data-act="tab" data-view="roadmap">Open roadmap</button></div>';
    return;
  }
  const t=questOf(nbSelected), passed=quizPass(nbSelected);
  ed.innerHTML=noteEditorHTML(nbSelected)+'<div class="actions" style="margin-top:16px">'+
    '<button type="button" class="btn" data-act="open-phase" data-pi="'+t.pi+'" data-id="'+nbSelected+'">Show in roadmap</button>'+
    (stageAvailable(t.pi,t.si)?'<button type="button" class="btn" data-act="quiz" data-id="'+nbSelected+'">'+(passed===5?'Review quiz':passed?'Continue quiz':'Take quiz')+'</button>':'')+'</div>';
}
function selectNote(id){
  flushNote(); nbSelected=id; renderNbList(); renderNbEditor();
  if(matchMedia("(max-width:900px)").matches) $("nbEditor").scrollIntoView({block:"start"});
}

/* ---------- rules (shown once, before the first companion) ---------- */
const RULES=[
  ["web","Learn from anywhere","Each checkpoint names a topic, not a lesson. Learn it however you like: a short YouTube video, a Wikipedia page, MDN or any educational site.",false],
  ["check","The quiz is mandatory","Every checkpoint has a 5-question quiz. It only counts as finished when all 5 answers are correct.",true],
  ["refresh","Skip what you don't know","You can skip any question, but a skipped question isn't marked correct. Learn the topic, come back and finish it.",false],
  ["git","Projects need real proof","Every project is submitted as a public GitHub repository and a deployed link that anyone can open.",true],
  ["warn","No fake submissions","Fake or copied submissions are not allowed. If one is found, you can be banned.",true],
  ["spiral","Go down rabbit holes","Curious about something beyond the checkpoint? Follow it. The detours are where real understanding comes from.",false]
];
const rulesSeen = () => { try{ return localStorage.getItem("hqRulesSeen")==="1"; }catch(e){ return true; } };
function showRules(first){
  const root=$("rulesRoot");
  root.innerHTML='<div class="rules" role="dialog" aria-modal="true" aria-labelledby="rulesTitle"><div class="rules-inner">'+
    '<header class="title-top" style="padding:0"><div class="brand">'+BRAND_MARK+'<div><b>Creature HQ</b><span>Fullstack roadmap</span></div></div>'+(first?'':'<button type="button" class="btn" id="rulesClose">Close</button>')+'</header>'+
    '<div class="rules-head"><p class="eyebrow">'+(first?'Before you start':'Rules')+'</p><h1 id="rulesTitle">How Creature HQ works</h1>'+
      '<p>Six rules. They keep every checkmark honest, so your creature only grows from things you really learned and built.</p></div>'+
    '<ol class="rule-list">'+RULES.map(([icn,h,p,strong])=>'<li class="rule'+(strong?' strong':'')+'"><span class="t-ico">'+ic(icn)+'</span><div><b>'+h+'</b><p>'+p+'</p></div></li>').join("")+'</ol>'+
    '<div class="rules-foot">'+(first
      ?'<label class="check"><input type="checkbox" id="rulesAgree"> I have read the rules and will follow them.</label><button type="button" class="btn btn-primary btn-lg" id="rulesGo" disabled>Continue</button>'
      :'<span class="muted">You can open these again from Settings.</span><button type="button" class="btn btn-primary" id="rulesDone">Got it</button>')+'</div>'+
    '</div></div>';
  if(first){
    const agree=$("rulesAgree"), goBtn=$("rulesGo");
    agree.addEventListener("change",()=>{ goBtn.disabled=!agree.checked; });
    goBtn.addEventListener("click",()=>{
      try{ localStorage.setItem("hqRulesSeen","1"); }catch(e){}
      if(window.HQSync) HQSync.changed();
      root.innerHTML=""; sfx.coin(); enterApp();
    });
    agree.focus({preventScroll:true});
  }else{
    const close=()=>{ root.innerHTML=""; };
    $("rulesClose").addEventListener("click",close);
    $("rulesDone").addEventListener("click",close);
    $("rulesDone").focus({preventScroll:true});
  }
}
/* =========================================================
   FLOATING COMPANION
   Document Picture-in-Picture keeps the device on top of other
   tabs and apps. The live #device node moves into the floating
   window (listeners come with it) and moves back when it closes.
   Pages can't see other sites, so "watching" means reacting to
   leaving this tab, time away, and the focus timer.
   ========================================================= */
const pipSupported = "documentPictureInPicture" in window;
const NUDGE_MS = 5*60*1000;
const AWAY_LINES = ["i'll keep an eye on things from here.","off you go. i'm watching.","go on. i'll be right here."];
const AWAY_NUDGES = ["you've been away {m}. still research?","{m} away from HQ. one quest when you're back?","if that's a tutorial, take notes. if it isn't: OI.","i can't evolve on videos. i need commits.","quick check: learning, building, or scrolling?"];
const FOCUS_NUDGES = ["still focusing? good. i'm guarding the tabs.","keep going. the timer is on your side.","no new tabs. i saw that thought."];
let pipTimer=null, pipHover=false, awaySince=0, nextNudge=0;

function syncPipTheme(){
  if(!pipWin) return;
  const root=pipWin.document.documentElement, t=document.documentElement.getAttribute("data-theme");
  if(t) root.setAttribute("data-theme",t); else root.removeAttribute("data-theme");
  root.style.setProperty("--accent",getComputedStyle(document.documentElement).getPropertyValue("--accent").trim());
}
function renderPopBtn(){
  const b=$("pipBtn"); if(!b) return;
  b.hidden=!pipSupported||!state.pet||!!pipWin;
}
async function openFloating(){
  if(!state.pet) return;
  if(!pipSupported){ toast("The floating companion needs Chrome or Edge, version 116 or newer.","","warn"); return; }
  if(pipWin) return;
  let w;
  try{ w=await documentPictureInPicture.requestWindow({width:240,height:330}); }
  catch(e){
    console.warn("Floating companion:",e);
    toast(e&&e.name==="NotAllowedError"?"Click the Float button to open the floating window. Browsers only allow it after a click.":"The floating window couldn't open in this browser.","","warn");
    return;
  }
  pipWin=w;
  const d=w.document;
  // copy every stylesheet; links get absolute URLs because the floating document has no base URL of its own
  document.querySelectorAll('head link[rel="stylesheet"],head style').forEach(n=>{ const c=n.cloneNode(true); if(n.href) c.href=n.href; d.head.appendChild(c); });
  d.body.className="pip";
  d.body.appendChild(document.querySelector('body > svg[width="0"]').cloneNode(true));
  d.body.insertAdjacentHTML("beforeend",'<div id="pipSlot"></div><div class="pip-bar">'+
    '<div><span class="pip-time" id="pipTime"></span><span class="pip-quip" id="pipQuip"></span></div>'+
    '<div class="pip-actions"><button type="button" class="btn btn-sm btn-icon" id="pipFocus" data-act="pip-focus"></button>'+
    '<button type="button" class="btn btn-sm btn-icon" id="pipStop" data-act="focus-stop" aria-label="Stop focus session" title="Stop">'+ic("stop")+'</button>'+
    '<button type="button" class="btn btn-sm btn-icon" id="pipFeed" data-act="pip-feed"></button>'+
    '<button type="button" class="btn btn-sm btn-icon btn-danger" data-act="oi" aria-label="Yell at me" title="Yell at me">'+ic("megaphone")+'</button></div></div>');
  const device=$("device");
  device.insertAdjacentHTML("afterend",'<div class="device-away" id="deviceAway">'+BRAND_MARK+'<b>'+esc(state.pet.nick)+' is floating</b><span>It stays on top of other tabs and apps while you work.</span><button type="button" class="btn btn-sm" data-act="pip-close">Bring back</button></div>');
  d.getElementById("pipSlot").appendChild(device);
  syncPipTheme();
  d.addEventListener("click",onAction);
  let lookQueued=false;
  w.addEventListener("pointermove",e=>{
    if(lookQueued) return;
    lookQueued=true;
    w.requestAnimationFrame(()=>{ lookQueued=false; look(e.clientX,e.clientY); });
  },{passive:true});
  // calm by default: the window only animates while the pointer is over it
  d.documentElement.addEventListener("pointerenter",()=>{ pipHover=true; d.body.classList.add("awake"); renderPipBar(); });
  d.documentElement.addEventListener("pointerleave",()=>{ pipHover=false; d.body.classList.remove("awake"); restEyes(); renderPipBar(); });
  w.addEventListener("pagehide",returnDevice);
  pipTimer=w.setInterval(pipTick,1000);
  if(document.hidden){ awaySince=Date.now(); nextNudge=awaySince+NUDGE_MS; }
  pipBarKey=""; restEyes(); renderPipBar(); renderPopBtn();
  sfx.coin(); anim("hop"); setMood("happy",1500);
  say("i'm floating now. i'll stay on top of everything and keep an eye on you.");
}
function closeFloating(){ if(pipWin) pipWin.close(); }
function returnDevice(){
  if(!pipWin) return;
  const dev=pipWin.document.getElementById("device"), away=document.getElementById("deviceAway");
  if(dev&&away){ away.replaceWith(dev); }
  else if(dev){ document.querySelector(".side .care").before(dev); }
  pipWin=null; pipTimer=null; pipHover=false; awaySince=0;
  renderPopBtn();
  if(gob){ lastInteract=Date.now(); say("back on the desk. still watching."); }
}
let pipBarKey="";
// eyes settle on the viewer and stay there, so a still window really is still
function restEyes(){
  if(!gob) return;
  gob.querySelectorAll(".pupil").forEach(p=>{
    p.setAttribute("cx",p.dataset.cx); p.setAttribute("cy",p.dataset.cy);
    const s=p.parentNode.querySelector(".shine");
    if(s){ s.setAttribute("cx",+p.dataset.cx+(+s.dataset.ox)); s.setAttribute("cy",+p.dataset.cy+(+s.dataset.oy)); }
  });
}
function renderPipBar(){
  if(!pipWin||!state.pet) return;
  const d=pipWin.document, time=d.getElementById("pipTime"); if(!time) return;
  const run=timer.running, fav=SNACKS.find(s=>s.id===SPECIES[state.pet.species].fav), left=state.pet.snacks[fav.id]||0;
  // minute precision while calm so the text changes once a minute, not every second
  const clock=run?(pipHover?fmt(timer.left):Math.max(1,Math.ceil(timer.left/60))+" min"):state.focusMin+" min", quip=run?(timer.paused?"Paused":timer.quip):"Focus";
  const title=state.pet.nick+(run?" · "+clock:" is watching"), quipEl=d.getElementById("pipQuip");
  if(time.textContent!==clock) time.textContent=clock;
  if(quipEl.textContent!==quip) quipEl.textContent=quip;
  if(d.title!==title) d.title=title;
  // the buttons only change with the timer state or snack count; rebuilding them every tick forces extra paints
  const key=[run,timer.paused,fav.id,left].join("|");
  if(key===pipBarKey) return;
  pipBarKey=key;
  const fb=d.getElementById("pipFocus"), label=run?(timer.paused?"Resume focus session":"Pause focus session"):"Start focus session";
  fb.innerHTML=ic(run&&!timer.paused?"pause":"play"); fb.setAttribute("aria-label",label); fb.title=label;
  d.getElementById("pipStop").hidden=!run;
  const feedBtn=d.getElementById("pipFeed"), feedLabel="Feed "+fav.name.toLowerCase()+" ("+left+" left)";
  feedBtn.innerHTML=ic(fav.icon); feedBtn.setAttribute("aria-label",feedLabel); feedBtn.title=feedLabel; feedBtn.disabled=!left;
}
function pipTick(){
  if(!pipWin||!state.pet) return;
  if(timer.running&&!timer.paused) tickTimer(); else renderPipBar();
  if(document.hidden&&awaySince&&Date.now()>=nextNudge&&!modalOpen){
    const m=plural(Math.max(1,Math.round((Date.now()-awaySince)/60000)),"minute");
    say(timer.running&&!timer.paused?rand(FOCUS_NUDGES):rand(AWAY_NUDGES).replace("{m}",m));
    anim("hop"); nextNudge=Date.now()+NUDGE_MS;
  }
}
document.addEventListener("visibilitychange",()=>{
  if(!pipWin||!state.pet) return;
  if(document.hidden){
    awaySince=Date.now(); nextNudge=awaySince+NUDGE_MS;
    setMood("focus",2500); say(rand(AWAY_LINES));
  }else if(awaySince){
    const mins=Math.round((Date.now()-awaySince)/60000); awaySince=0;
    say(mins>=2?"welcome back. you were gone "+plural(mins,"minute")+".":"that was quick. welcome back.");
    anim("hop");
  }
});
/* =========================================================
   THEME: system by default, manual light or dark override
   ========================================================= */
const themeQuery=matchMedia("(prefers-color-scheme: dark)");
function getThemePref(){ try{ const t=localStorage.getItem("hqTheme"); return t==="light"||t==="dark"?t:"system"; }catch(e){ return "system"; } }
function resolvedTheme(){ const p=getThemePref(); return p==="system"?(themeQuery.matches?"dark":"light"):p; }
function renderThemeBtn(){
  syncPipTheme();
  const dark=resolvedTheme()==="dark", label=dark?"Switch to light mode":"Switch to dark mode";
  ["themeBtn","titleTheme"].forEach(id=>{ const b=$(id); if(b){ b.innerHTML=ic(dark?"sun":"moon"); b.setAttribute("aria-label",label); b.title=label; } });
}
function setTheme(pref){
  try{ if(pref==="light"||pref==="dark") localStorage.setItem("hqTheme",pref); else localStorage.removeItem("hqTheme"); }catch(e){}
  if(pref==="light"||pref==="dark") document.documentElement.setAttribute("data-theme",pref);
  else document.documentElement.removeAttribute("data-theme");
  renderThemeBtn();
  if(view==="settings") renderSettings();
}
function toggleTheme(){ setTheme(resolvedTheme()==="dark"?"light":"dark"); sfx.roll(); }
themeQuery.addEventListener("change",()=>{ renderThemeBtn(); if(view==="settings") renderSettings(); });

/* =========================================================
   LOADING SCREEN: waits for the real fonts, then shows the title
   ========================================================= */
function setBoot(pct,note){
  const b=$("bootBar"), n=$("bootNote");
  if(b) b.style.width=pct+"%";
  if(n&&note) n.textContent=note;
}
function bootApp(){
  const t0=performance.now();
  setBoot(45,"Loading fonts");
  const faces=['400 14px "Dongle HQ"','700 14px "Dongle HQ"','500 12px "Martian Mono"','700 16px "Pixelify Sans"'];
  const fonts=document.fonts&&document.fonts.load?Promise.all(faces.map(f=>document.fonts.load(f).catch(()=>null))):Promise.resolve();
  let finished=false;
  const ready=()=>{
    if(finished) return; finished=true;
    setBoot(80,"Setting up");
    if(state.pet) mountCreature();
    renderAll();
    setBoot(100,"Ready");
    const wait=Math.max(0,(reduceMotion?100:800)-(performance.now()-t0));
    setTimeout(()=>{
      showTitle();
      const b=$("boot"); b.classList.add("done"); setTimeout(()=>b.remove(),450);
    },wait+180);
  };
  fonts.then(ready);
  setTimeout(ready,3000);
}

/* =========================================================
   TITLE SCREEN
   ========================================================= */
let titleOpen=false;
function showTitle(){
  const p=state.pet, root=$("titleRoot"), {t}=allCounts();
  titleOpen=true;
  const sp=p?SPECIES[p.species]:null, f=p?shownForm():0, L=level(), nSubs=Object.keys(state.subs).length;
  const top=p
    ?'<span class="led"></span><span class="name">'+esc(p.nick)+' · '+esc(sp.forms[f])+'</span><span class="device-lv">LV '+L+'</span>'
    :'<span class="led"></span><span class="name">8 creatures · 4 forms each</span><span class="device-lv">NEW</span>';
  const stage=p
    ?'<div class="title-stage solo">'+creatureSVG(p.species,f,"bob m-happy")+'</div><div class="dialog">welcome back. i missed you. ready when you are.</div>'
    :'<div class="title-stage lineup">'+SPECIES_ORDER.map(k=>creatureSVG(k,0,"bob")).join("")+'</div><div class="dialog">pick one of us. we grow when you ship projects.</div>';
  root.innerHTML='<div class="title" role="dialog" aria-modal="true" aria-labelledby="titleName">'+
    '<header class="title-top"><div class="brand">'+BRAND_MARK+'<div><b>Creature HQ</b><span>Fullstack roadmap</span></div></div>'+
      '<button type="button" class="btn btn-icon btn-ghost" id="titleTheme" data-act="theme"></button></header>'+
    '<div class="title-main">'+
      '<p class="eyebrow">'+phases.length+' phases · '+t+' quests</p>'+
      '<h1 class="title-name" id="titleName">Creature HQ</h1>'+
      '<p class="title-lede">A fullstack developer roadmap with a creature that grows as you learn. Checkmarks train it. Shipped projects make it evolve.</p>'+
      '<div class="device title-device"><div class="device-top">'+top+'</div><div class="screen title-screen">'+stage+'</div></div>'+
      '<div class="title-actions"><button type="button" class="btn btn-primary btn-lg" id="titleGo">'+(p?'Continue':'Start')+'</button></div>'+
      '<p class="title-hint">or press <kbd>Enter</kbd></p>'+
    '</div>'+
    '<footer class="title-foot"><span>'+accountLine()+'</span><span>'+(p?'Lv '+L+' · '+plural(nSubs,"project")+' shipped':'New save')+'</span></footer></div>';
  renderThemeBtn();
  const goBtn=$("titleGo");
  goBtn.addEventListener("click",leaveTitle);
  goBtn.focus({preventScroll:true});
}
function accountLine(){
  const u=window.HQSync&&HQSync.user;
  if(!u||HQSync.local) return "Progress is saved in this browser only.";
  return "Saved to your account · "+esc(u.email||u.name||"signed in");
}
function leaveTitle(){
  if(!titleOpen) return;
  titleOpen=false; sfx.coin();
  const el=document.querySelector(".title");
  const done=()=>{ $("titleRoot").innerHTML=""; if(rulesSeen()) enterApp(); else showRules(true); };
  if(reduceMotion||!el){ done(); return; }
  el.classList.add("leaving");
  setTimeout(done,260);
}
function enterApp(){
  if(!state.pet){ showStarter(false); return; }
  setMood(baseMood()); say(greeting()); checkTrophies();
  const f=formFor(level());
  if(f>(state.pet.formSeen||0)) setTimeout(()=>evolve(state.pet.formSeen||0,f),600);
  if(quizMigrated) setTimeout(()=>toast("Quizzes are now required. "+plural(quizMigrated,"checkpoint")+" reopened until "+(quizMigrated>1?"their quizzes are":"its quiz is")+" passed.","","doc"),900);
}
/* =========================================================
   FOCUS TIMER
   ========================================================= */
const timer={running:false,paused:false,total:1500,left:1500,endAt:0,iv:null,quip:"Focusing"};
const TIMER_QUIPS=["Focusing","No new tabs","Phone face down","One line at a time","Still going","Nearly there"];
function fmt(s){ return String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0"); }
function drawTimer(){
  const t=$("timerTime"), f=$("timerFill"), q=$("timerQuip");
  if(t) t.textContent=fmt(timer.running?timer.left:state.focusMin*60);
  if(f) f.style.width=(timer.running?(1-timer.left/timer.total)*100:0)+"%";
  if(q&&timer.running) q.textContent=timer.paused?"Paused":timer.quip;
  // while floating and away from this tab, the tab title changes once a minute instead of every second
  const away=pipWin&&document.hidden;
  document.title=timer.running?(timer.paused?"Paused ":"")+(away?Math.max(1,Math.ceil(timer.left/60))+" min":fmt(timer.left))+" · "+baseTitle:baseTitle;
  renderPipBar();
}
function startFocus(){
  touch();
  timer.total=state.focusMin*60; timer.left=timer.total; timer.running=true; timer.paused=false; timer.quip=TIMER_QUIPS[0];
  timer.endAt=Date.now()+timer.left*1000;
  setMood("focus"); say("focus session started. "+state.focusMin+" minutes. i'll guard the tabs."); sfx.coin();
  clearInterval(timer.iv); timer.iv=setInterval(tickTimer,250);
  if(view==="today") renderToday();
  drawTimer();
}
function tickTimer(){
  if(timer.paused) return;
  timer.left=Math.max(0,Math.round((timer.endAt-Date.now())/1000));
  if(timer.left%60===0&&timer.left>0&&timer.left<timer.total) timer.quip=rand(TIMER_QUIPS);
  drawTimer();
  if(timer.left<=0) finishFocus();
}
function stopFocus(){
  clearInterval(timer.iv); timer.running=false; timer.paused=false;
  if(view==="today") renderToday();
  drawTimer(); setMood(baseMood());
}
function finishFocus(){
  stopFocus(); state.focusDone++;
  if(state.pet){ addBond(5); giveSnack("coffee"); }
  save(); renderSide(); renderView();
  sfx.done(); rain(150); setMood("happy",3000); anim("hop");
  say("session done. take five. you earned it.");
  modal('<div class="modal-icon">'+ic("hourglass")+'</div><h2>Session complete</h2><p>'+state.focusMin+' minutes of focus. FOCUS trained, and a coffee was added to the pantry.</p>',{center:true});
  unlock("focus1"); if(state.focusDone>=10) unlock("focus10");
}
function togglePause(){
  if(!timer.running) return;
  timer.paused=!timer.paused;
  if(!timer.paused) timer.endAt=Date.now()+timer.left*1000;
  say(timer.paused?"paused. i'll wait. impatiently.":"back to it.");
  if(view==="today") renderToday();
  drawTimer();
}

/* =========================================================
   STARTER PICKER + HATCHING
   ========================================================= */
const BRAND_MARK=document.querySelector(".brand .mark").outerHTML;
function showStarter(swap){
  let pick=null;
  const root=$("starterRoot");
  root.innerHTML='<div class="starter" role="dialog" aria-modal="true" aria-labelledby="starterTitle"><div class="starter-inner">'+
    '<div class="starter-top"><div class="brand">'+BRAND_MARK+'<div><b>Creature HQ</b><span>Fullstack roadmap</span></div></div>'+(swap?'<button type="button" class="btn" id="starterClose">Keep current companion</button>':'')+'</div>'+
    '<h1 id="starterTitle">'+(swap?'Choose a new companion':'Choose your companion')+'</h1>'+
    '<p class="lede">'+(swap?'Your projects, level and trophies carry over. The new creature starts at your current level.':'It hatches today and grows only when you submit projects. Every creature starts as a baby and can evolve three times.')+'</p>'+
    '<div class="species-grid">'+SPECIES_ORDER.map(k=>{ const s=SPECIES[k];
      return '<button type="button" class="species" data-sp="'+k+'" aria-pressed="false" style="--accent:'+s.color+'"><span class="screen">'+creatureSVG(k,0,"")+'</span><span class="species-body"><b>'+s.line+'</b><span class="type">'+s.type+'</span><span class="desc">'+esc(s.blurb)+'</span></span></button>'; }).join("")+'</div>'+
    '<div class="card pick" id="pickPanel" hidden></div></div></div>';
  if(swap) $("starterClose").addEventListener("click",()=>{ root.innerHTML=""; });
  root.querySelectorAll(".species").forEach(c=>c.addEventListener("click",()=>{
    pick=c.dataset.sp; sfx.coin();
    root.querySelectorAll(".species").forEach(x=>x.setAttribute("aria-pressed",String(x===c)));
    fill(); $("pickPanel").scrollIntoView({behavior:reduceMotion?"auto":"smooth",block:"nearest"});
  }));
  (root.querySelector(".species")||root).focus();
  function fill(){
    const s=SPECIES[pick], pp=$("pickPanel");
    pp.hidden=false; pp.style.setProperty("--accent",s.color);
    pp.innerHTML='<div><p class="eyebrow">'+s.type+' type</p><h2>'+s.line+'</h2><p class="muted" style="margin-top:6px">'+esc(s.blurb)+'</p>'+
      '<div class="evo-line" style="margin-top:18px">'+[0,1,2,3].map(f=>'<div class="evo-step'+(f===0?' now':'')+'">'+creatureSVG(pick,f,f===0?"bob":"sil-dark")+'<b>'+(f===0?s.forms[0]:'Unknown')+'</b><small>'+(f===0?'Hatch':'Lv '+EVO_LV[f])+'</small></div>').join("")+'</div>'+
      '<div class="move" style="margin-top:18px;padding:0;border:0"><b>'+ic("star")+esc(s.sig.name)+'</b><span class="pow">Power '+s.sig.pow+'</span><span class="desc">'+esc(s.sig.desc)+' Signature move.</span></div></div>'+
      '<div><h3 class="card-title" style="margin-bottom:8px">Base stats</h3>'+STATS.map(st=>'<div class="stat"><span class="stat-name">'+st.n+'</span><span class="stat-bars"><span class="v"><i style="width:'+(s.base[st.k]/130*100)+'%"></i></span></span><span class="stat-val">'+s.base[st.k]+'</span></div>').join("")+
      '<label class="field"><span class="field-label">Nickname<small>Optional</small></span><input class="input" type="text" id="nickIn" maxlength="18" autocomplete="off" placeholder="'+s.forms[0]+'"></label>'+
      '<button type="button" class="btn btn-primary" id="hatchBtn" style="width:100%;height:42px;margin-top:14px">'+ic("egg")+'Hatch '+s.line+'</button></div>';
    $("hatchBtn").addEventListener("click",()=>hatch(pick,($("nickIn").value||"").trim()||s.forms[0],swap));
    $("nickIn").addEventListener("keydown",e=>{ if(e.key==="Enter") $("hatchBtn").click(); });
  }
}
function hatch(species,nick,swap){
  const s=SPECIES[species], root=$("starterRoot"), old=state.pet;
  root.innerHTML='<div class="hatch" role="dialog" aria-modal="true" aria-label="Hatching"><div><svg class="hatch-egg wobble" viewBox="0 0 200 220" aria-hidden="true"><ellipse cx="100" cy="210" rx="60" ry="8" fill="rgba(0,0,0,.4)"/>'+
    '<path d="M100 10 C150 10 176 100 176 140 C176 186 142 206 100 206 C58 206 24 186 24 140 C24 100 50 10 100 10Z" fill="#F4F2EC"/>'+
    '<circle cx="70" cy="90" r="12" fill="'+s.color+'"/><circle cx="130" cy="130" r="16" fill="'+s.color+'"/><circle cx="88" cy="172" r="9" fill="'+s.color+'"/>'+
    '<path id="crack" d="" fill="none" stroke="#26282F" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/></svg><p id="hatchTxt">Something is moving</p></div></div>';
  const cracks=["M100 56 L90 78","M100 56 L90 78 L108 94 L94 112","M100 56 L90 78 L108 94 L94 112 L114 128 L72 142","M100 56 L90 78 L108 94 L94 112 L114 128 L72 142 M114 128 L152 118 M72 142 L48 132"];
  const txt=["Something is moving","Tap tap","It's hatching","Here it comes"];
  let i=0;
  const tick=()=>{ $("crack").setAttribute("d",cracks[i]); $("hatchTxt").textContent=txt[i]; sfx.crack(); i++; if(i<cracks.length) setTimeout(tick,600); else setTimeout(pop,650); };
  setTimeout(tick,reduceMotion?0:700);
  function pop(){
    state.pet=newCreature(species,nick);
    if(swap&&old){ state.pet.snacks=old.snacks; state.pet.rewarded=old.rewarded; }
    save(); sfx.hatch();
    root.innerHTML=""; asleep=false; mountCreature(); renderAll(); rain(160); anim("hop"); setMood("happy",3000);
    say(greeting()); checkTrophies();
    const L=level();
    modal(creatureSVG(species,formFor(L),"bob m-happy")+'<p class="eyebrow">'+s.type+' type · '+NATURES[state.pet.nature].n+' nature</p><h2>'+esc(nick)+' hatched</h2>'+
      '<p>'+(L>1?'It absorbed your past projects and starts at Lv '+L+'.':'Checkmarks train its stats. Submitted projects level it up. Feed it, pet it, and try not to poke it too much.')+'</p>',
      {center:true,buttons:[{label:"Start",cls:"btn-primary"}]});
  }
}

/* =========================================================
   SMALL ACTIONS
   ========================================================= */
const OI_LINES=["OI. CLOSE THE TAB. BACK TO YOUR EDITOR.","YOU DON'T NEED ANOTHER PRODUCTIVITY SYSTEM. WRITE THE CODE.",
  "THE TUTORIAL WILL NOT BUILD YOUR PORTFOLIO FOR YOU.","ONE QUEST. 25 MINUTES. THEN YOU CAN SCROLL.",
  "FUTURE YOU SAW THAT. FUTURE YOU IS NOT IMPRESSED.","I CANNOT EVOLVE ON YOUTUBE VIDEOS. I NEED COMMITS.","PUT. THE. REDDIT. DOWN."];
function oi(){
  touch(); state.ois++; save();
  const line=rand(OI_LINES);
  sfx.oi(); setMood("shock",2400); anim("shake"); say(line,true);
  const d=$("device"); if(!reduceMotion){ d.classList.remove("quake"); void d.offsetWidth; d.classList.add("quake"); }
  if(d.getBoundingClientRect().bottom<0) toast(line.charAt(0)+line.slice(1).toLowerCase(),"","megaphone");
  if(view==="today") renderToday();
  if(state.ois>=10) unlock("oi");
}
function partyMode(){
  party=!party; setMood(baseMood());
  if(party){ rain(240); sfx.level(); say("cheat code accepted. party mode on. enter it again to stop."); toast("Party mode on","","gamepad"); unlock("konami"); }
  else say("party's over. back to work.");
}
function renameCreature(){
  const p=state.pet; if(!p) return;
  modal('<h2>Rename '+esc(p.nick)+'</h2><label class="field"><span class="field-label">Nickname<small>Up to 18 characters</small></span><input class="input" type="text" id="renameIn" maxlength="18" autocomplete="off" value="'+esc(p.nick)+'"></label>',
    {buttons:[{label:"Cancel"},{label:"Save name",cls:"btn-primary",onClick(close,root){
      const v=root.querySelector("#renameIn").value.trim(); if(!v){ root.querySelector("#renameIn").setAttribute("aria-invalid","true"); return false; }
      p.nick=v; save(); mountCreature(); renderAll(); say("i'm "+v+" now? i love it. "+SPECIES[p.species].cry); return true;
    }}],
    onMount(root){ const i=root.querySelector("#renameIn"); i.select(); i.addEventListener("keydown",e=>{ if(e.key==="Enter") root.querySelector('[data-b="1"]').click(); }); }});
}
function showHelp(){
  modal('<h2>Keyboard shortcuts</h2><dl class="kbd-list" style="margin-top:16px">'+SHORTCUTS.map(([k,v])=>'<dt><kbd>'+k+'</kbd></dt><dd>'+v+'</dd>').join("")+'</dl><p class="muted" style="margin-top:16px">Move your cursor back and forth over your companion to pet it.</p>');
}
function toggleSound(){ state.sound=!state.sound; save(); renderSide(); if(view==="settings") renderSettings(); if(state.sound) sfx.coin(); toast(state.sound?"Sound on":"Sound off","",state.sound?"sound":"mute"); }
function exportData(){
  const payload=JSON.stringify({version:8,done:state.done,streak:state.streak,lastDate:state.lastDate,subs:state.subs,quiz:state.quiz,notes:state.notes,pet:state.pet,
    extra:{trophies:state.trophies,pokes:state.pokes,ois:state.ois,rolls:state.rolls,focusDone:state.focusDone,bestStreak:state.bestStreak,sound:state.sound,focusMin:state.focusMin},
    exportedAt:new Date().toISOString()},null,2);
  const url=URL.createObjectURL(new Blob([payload],{type:"application/json"}));
  const a=document.createElement("a"); a.href=url; a.download="creature-hq-"+today()+".json";
  document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  toast("Progress exported","","download");
}
$("importFile").addEventListener("change",e=>{
  const file=e.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=()=>{
    let data;
    try{ data=JSON.parse(reader.result); if(typeof data.done!=="object"||data.done===null) throw new Error("bad file"); }
    catch(err){ toast("That file isn't a Creature HQ backup. Export one from Settings first.","","warn"); e.target.value=""; return; }
    e.target.value="";
    confirmModal("Import this backup?","It replaces all progress"+(window.HQSync&&!HQSync.local?" in your account":" in this browser")+", including your companion if the file has one.","Import",()=>{
      const x=data.extra||{}, pet=cleanPet(data.pet);
      Object.assign(state,{done:data.done,streak:Number(data.streak)||0,lastDate:data.lastDate||null,
        trophies:x.trophies||{},pokes:Number(x.pokes)||0,ois:Number(x.ois)||0,rolls:Number(x.rolls)||0,
        focusDone:Number(x.focusDone)||0,bestStreak:Number(x.bestStreak)||Number(data.streak)||0,
        sound:x.sound!==undefined?x.sound!==false:state.sound,focusMin:[15,25,50].includes(Number(x.focusMin))?Number(x.focusMin):state.focusMin,
        subs:(data.subs&&typeof data.subs==="object")?data.subs:{},
        quiz:(data.quiz&&typeof data.quiz==="object")?data.quiz:{}, notes:(data.notes&&typeof data.notes==="object")?data.notes:{}, pet:pet||state.pet});
      reopenUnquizzed();
      save(); roadmapPhase=currentPhase(); pickedId=null;
      mountCreature(); renderAll();
      if(state.pet) say("ah, i remember you now. welcome back."); else showStarter(false);
      toast("Progress imported","","upload");
    },false);
  };
  reader.readAsText(file);
});
async function signOutFlow(force){
  if(!window.HQSync) return;
  if(timer.running) stopFocus();
  const r=await HQSync.signOut(force);
  if(r&&r.unsynced) confirmModal("Sign out anyway?","Some recent progress hasn't reached your account yet, usually because you're offline. Signing out now loses it.","Sign out anyway",()=>signOutFlow(true));
}
function deleteAccountFlow(){
  const S=window.HQSync; if(!S) return;
  const pw=S.user.provider==="password";
  modal('<h2>Delete your account?</h2><p>This permanently deletes your account, your companion and all progress. It cannot be undone. Export a backup first if you might want it later.</p>'+
    (pw?'<label class="field"><span class="field-label">Confirm with your password</span><input class="input" type="password" id="delPw" autocomplete="current-password"></label>':'<p class="muted" style="margin-top:8px">'+(S.user.provider==="google.com"?"You'll be asked to confirm with Google.":"")+'</p>')+
    '<div class="form-error" id="delErr" role="alert"></div>',
    {buttons:[{label:"Cancel"},{label:"Delete account",cls:"btn-danger",onClick(close,root){
      const err=root.querySelector("#delErr"), ctrls=root.querySelectorAll("button,input");
      const password=pw?root.querySelector("#delPw").value:"";
      if(pw&&!password){ err.textContent="Enter your password."; return false; }
      ctrls.forEach(b=>b.disabled=true); err.textContent="";
      S.deleteAccount(password).then(r=>{ if(r&&!r.ok){ ctrls.forEach(b=>b.disabled=false); err.textContent=r.error||"Couldn't delete the account."; } });
      return false;
    }}]});
}
function swapCompanion(){
  if(!state.pet){ showStarter(false); return; }
  confirmModal("Swap companions?","Your projects, level and trophies stay. "+esc(state.pet.nick)+" leaves, and the new creature starts at your current level.","Choose new companion",()=>showStarter(true),false);
}
function resetAll(){
  confirmModal("Delete all progress?","This removes every quest, quiz answer, note, project, trophy and your companion"+(window.HQSync&&!HQSync.local?" from your account":" from this browser")+". It cannot be undone.","Delete everything",()=>{
    if(timer.running) stopFocus();
    closeFloating();
    Object.assign(state,{done:{},streak:0,lastDate:null,trophies:{},pokes:0,ois:0,rolls:0,focusDone:0,bestStreak:0,subs:{},quiz:{},notes:{},pet:null});
    save(); asleep=false; pickedId=null; roadmapPhase=0; mountCreature(); go("today");
    renderSide(); bubbleEl.textContent=""; toast("All progress deleted","","trash");
    showStarter(false);
  });
}

/* =========================================================
   EVENT WIRING
   ========================================================= */
function onAction(e){
  const el=e.target.closest("[data-act]"); if(!el) return;
  const a=el.dataset.act, id=el.dataset.id, pi=el.dataset.pi!==undefined?+el.dataset.pi:null;
  switch(a){
    case "tab": go(el.dataset.view); { const t=$("tab-"+el.dataset.view); if(t&&el.classList.contains("tab")) t.focus({preventScroll:true}); } break;
    case "quiz": openQuiz(id,el); break;
    case "notes": openNote(id); break;
    case "note-select": selectNote(id); break;
    case "nb-filter": nbFilter=el.dataset.f; renderNbList(); break;
    case "rules": showRules(false); break;
    case "submit": { const [p,s,q]=id.split("-").map(Number); openSubmit(p,s,q); } break;
    case "view-sub": viewSubmission(id); break;
    case "open-phase": roadmapPhase=pi; go("roadmap",id); break;
    case "select-phase": roadmapPhase=pi; renderRoadmap(); { const b=document.querySelector('.phase-item[data-pi="'+pi+'"]'); if(b) b.focus({preventScroll:true}); } break;
    case "shuffle": shuffle(); break;
    case "focus-len": state.focusMin=+el.dataset.min; save(); sfx.roll(); renderToday(); break;
    case "focus-start": startFocus(); break;
    case "focus-pause": togglePause(); break;
    case "focus-stop": stopFocus(); sfx.uncheck(); say("session stopped. that's fine. rest counts too."); break;
    case "oi": oi(); break;
    case "rename": renameCreature(); break;
    case "swap": swapCompanion(); break;
    case "export": exportData(); break;
    case "import": $("importFile").click(); break;
    case "reset": resetAll(); break;
    case "sign-out": signOutFlow(); break;
    case "delete-account": deleteAccountFlow(); break;
    case "sound": toggleSound(); break;
    case "help": showHelp(); break;
    case "theme": toggleTheme(); break;
    case "theme-set": setTheme(el.dataset.theme); break;
    case "pip": openFloating(); break;
    case "pip-close": closeFloating(); break;
    case "pip-focus": timer.running?togglePause():startFocus(); break;
    case "pip-feed": if(state.pet){ feed(SPECIES[state.pet.species].fav); renderPipBar(); } break;
    default: if(a.startsWith("ws-")&&typeof wsAction==="function") wsAction(a,el);
  }
}
document.addEventListener("click",onAction);

const KONAMI=["arrowup","arrowup","arrowdown","arrowdown","arrowleft","arrowright","arrowleft","arrowright","b","a"];
let kIdx=0;
addEventListener("keydown",e=>{
  const k=(e.key||"").toLowerCase();
  if(e.key==="Escape"){
    if($("rulesRoot").innerHTML){ if($("rulesClose")) $("rulesRoot").innerHTML=""; return; }
    if($("starterRoot").innerHTML&&state.pet&&$("starterClose")){ $("starterRoot").innerHTML=""; return; }
    closeModal(); return;
  }
  if(view==="workshop"&&typeof ws!=="undefined"&&ws.cur&&(e.ctrlKey||e.metaKey)&&!e.altKey){
    if(k==="s"){ e.preventDefault(); wsSaveNow(); return; }
    if(k==="enter"){ e.preventDefault(); wsRun(true); return; }
  }
  if(e.ctrlKey||e.metaKey||e.altKey) return;
  // typing in the code editor must never trigger single-key shortcuts
  if(e.target.closest&&e.target.closest(".cm-editor,[contenteditable=true]")) return;
  if($("titleRoot").innerHTML){
    if(e.key==="Enter"&&document.activeElement.tagName!=="BUTTON"){ e.preventDefault(); const g=$("titleGo"); if(g) g.click(); }
    else if(k==="d"&&!/input|textarea/i.test(e.target.tagName)) toggleTheme();
    return;
  }
  if(/input|textarea|select/i.test(e.target.tagName)&&e.target.type!=="checkbox") return;
  if(!state.pet||$("evoRoot").innerHTML||$("starterRoot").innerHTML||$("rulesRoot").innerHTML) return;
  // a third up-arrow keeps the last two as the start of the code
  kIdx=(k===KONAMI[kIdx])?kIdx+1:(k===KONAMI[0]?(kIdx===2?2:1):0);
  if(kIdx===KONAMI.length){ kIdx=0; partyMode(); return; }
  if(modalOpen) return;
  if(/^[1-8]$/.test(k)) go(VIEWS[+k-1]);
  else if(k==="/"){ e.preventDefault(); go("notebook"); const sb=$("nbSearch"); if(sb) sb.focus(); }
  else if(k==="r") shuffle();
  else if(k==="f") timer.running?togglePause():startFocus();
  else if(k==="g") poke();
  else if(k==="e") feed(SPECIES[state.pet.species].fav);
  else if(k==="o") oi();
  else if(k==="m") toggleSound();
  else if(k==="p") openFloating();
  else if(k==="d") toggleTheme();
  else if(k==="?") showHelp();
});

/* =========================================================
   BOOT
   ========================================================= */
VIEWS.forEach(x=>{ $("view-"+x).hidden = x!==view; });
if(!state.pet) bubbleEl.textContent="Choose a companion to get started.";
bootApp();
