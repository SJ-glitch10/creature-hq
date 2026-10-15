// Builds the public, indexable pages (landing, privacy, 404) plus sitemap/robots/manifest.
// Creature art is rendered to static SVG with the game's own drawing code.
// Usage: node tools/build-site.mjs            (SITE defaults to https://creature-hq.web.app)
//        SITE=https://creaturehq.app node tools/build-site.mjs
import fs from "node:fs";
import vm from "node:vm";

const SITE = (process.env.SITE || "https://creature-hq.web.app").replace(/\/$/, "");
const V = "17";
const game = fs.readFileSync("public/assets/game.js", "utf8").replace(/\r\n/g, "\n");
const cut = (from, to) => { const a = game.indexOf(from), b = game.indexOf(to, a); if (a < 0 || b < 0) throw new Error("marker " + from); return game.slice(a, b); };

const ctx = {}; vm.createContext(ctx);
vm.runInContext([
  cut("const phases = [", "/* ========================================================="),
  cut("const EVO_LV", "const formFor"),
  cut("const SPECIES = {", "// first submission"),
].join("\n"), ctx);
// the art block runs from its first line to the end of creatureSVG()
const artStart = game.indexOf("let SVG_UID=0"), artEnd = game.indexOf("\n}\n", game.indexOf("function creatureSVG(")) + 3;
vm.runInContext(game.slice(artStart, artEnd) + `
globalThis.out = { phases, SPECIES, SPECIES_ORDER, EVO_LV, FORM_LABEL, creatureSVG };`, ctx);
const { phases, SPECIES, SPECIES_ORDER, EVO_LV, FORM_LABEL, creatureSVG } = ctx.out;

const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const art = (sp, form, cls = "") => creatureSVG(sp, form, cls, 'role="img" aria-label="' + esc(SPECIES[sp].forms[form]) + ', the ' + FORM_LABEL[form].toLowerCase() + ' ' + esc(SPECIES[sp].line.toLowerCase()) + '"');
const quests = phases.reduce((a, p) => a + p.stages.reduce((b, s) => b + s[1].length, 0), 0);
const MARK = '<svg class="mark" viewBox="0 0 32 32" aria-hidden="true"><rect class="mark-bg" width="32" height="32" rx="8"/><path d="M16 5c4.8 0 8.5 8 8.5 13.5A8.5 8.5 0 0 1 7.5 18.5C7.5 13 11.2 5 16 5z" fill="#F2A516"/><rect x="11.5" y="15" width="3" height="3" fill="#26282F"/><rect x="17.5" y="15" width="3" height="3" fill="#26282F"/></svg>';

const FAQ = [
  ["What is Creature HQ?", "Creature HQ is a free, self-paced roadmap for learning fullstack web development, from how the browser works to deploying a real app. You raise a creature companion as you go: passing checkpoint quizzes trains its stats, and shipping projects levels it up until it evolves."],
  ["Who is it for?", "Beginners who can already think a little like a programmer and want a structured path through HTML, CSS, JavaScript, React, Node.js, Express, SQL, authentication, TypeScript, testing and deployment, without collecting endless courses."],
  ["Does it cost anything?", "No. Creature HQ is free and has no ads. You only need an account so your progress is saved."],
  ["Where do I learn each topic?", "Anywhere you like. Every checkpoint names a topic and links to YouTube, Wikipedia and web searches for it. Then you prove it with a short five-question quiz."],
  ["How do projects work?", "Project checkpoints need real proof: a public GitHub repository and a deployed link anyone can open, plus a short write-up of what you built and learned. Only projects give XP, and XP is what makes your companion evolve."],
  ["Is my progress saved across devices?", "Yes. Sign in with Google or email and your companion, quests, quiz answers, notes and projects are saved to your account and load on any device."]
];

const STEPS = [
  ["Learn a checkpoint", "Each phase is broken into small checkpoints. Learn the topic from any source, then pass its five-question quiz."],
  ["Ship real projects", "Every phase ends in a project. Submit the GitHub repository and the live link to prove it runs."],
  ["Watch it evolve", "Quizzes train your companion's stats. Projects give XP, and XP levels it up through four forms."]
];
const FEATURES = [
  ["Focus timer", "15, 25 or 50 minute sessions. Finishing one trains FOCUS and restocks the snack pantry."],
  ["Notebook", "Notes for every checkpoint, searchable by topic or by anything you wrote."],
  ["Proof vault", "Every project you shipped, with its code, live link and write-up in one place."],
  ["Trophies", "Twenty-three to earn, from your first quest to clearing the whole roadmap."],
  ["Floating companion", "Pop your creature out on top of other tabs so it can keep an eye on you."],
  ["Workshop", "A code editor with a live preview, right next to each quest. Write HTML, CSS and JavaScript and watch it run."]
];

const head = ({ title, desc, path, extra = "", robots = "index,follow", ogType = "website" }) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<script>try{var t=localStorage.getItem("hqTheme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="${robots}">
<meta name="google-site-verification" content="KOCekW_lUe9m26zk-s75czzcg7uTrchy89wyJxkPKqI">
<link rel="canonical" href="${SITE}${path}">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Creature HQ">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${path}">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Creature HQ: eight pixel creatures lined up above the words Learn fullstack. Raise a creature.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${SITE}/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-48.png" type="image/png" sizes="48x48">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#26282F">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500;600&family=Pixelify+Sans:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/app.css?v=${V}">
<link rel="stylesheet" href="/assets/site.css?v=${V}">
${extra}</head>`;

const header = `<header class="site-head">
  <a class="brand" href="/" aria-label="Creature HQ home">${MARK}<div><b>Creature HQ</b><span>Fullstack roadmap</span></div></a>
  <nav class="site-nav" aria-label="Main">
    <a href="/#how">How it works</a><a href="/#roadmap">Roadmap</a><a href="/#companions">Companions</a><a href="/#faq">FAQ</a>
  </nav>
  <div class="site-cta"><a class="btn btn-ghost" href="/app">Sign in</a><a class="btn btn-primary" href="/app?mode=signup">Start free</a></div>
</header>`;
const footer = `<footer class="site-foot">
  <div class="brand">${MARK}<div><b>Creature HQ</b><span>Learn fullstack. Raise a creature.</span></div></div>
  <nav aria-label="Footer"><a href="/app">Sign in</a><a href="/app?mode=signup">Create account</a><a href="/privacy">Privacy</a></nav>
  <p>© ${new Date().getFullYear()} Creature HQ. Free, no ads.</p>
</footer>`;

/* ---------- landing page ---------- */
const jsonld = [
  { "@context": "https://schema.org", "@type": "WebSite", name: "Creature HQ", alternateName: ["CreatureHQ", "Creature HQ roadmap"], url: SITE + "/" },
  { "@context": "https://schema.org", "@type": "WebApplication", name: "Creature HQ", url: SITE + "/", image: SITE + "/og.png",
    applicationCategory: "EducationalApplication", operatingSystem: "Any (web browser)", isAccessibleForFree: true,
    description: "A free fullstack web development roadmap where passing quizzes and shipping projects grows your creature companion.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    teaches: ["HTML", "CSS", "JavaScript", "APIs and async JavaScript", "React", "Node.js", "Express", "SQL and PostgreSQL", "Authentication", "TypeScript", "Testing", "Deployment"] },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }
];
const index = head({
  title: "Creature HQ: learn fullstack web development and raise a creature",
  desc: `A free fullstack developer roadmap with ${phases.length} phases and ${quests} quests, from HTML to deployment. Pass quizzes and ship projects to grow and evolve your creature companion.`,
  path: "/",
  extra: `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>\n`
}) + `
<body class="site">
<a class="skip" href="#main">Skip to content</a>
${header}
<main id="main">
  <section class="hero" aria-labelledby="heroTitle">
    <p class="eyebrow">${phases.length} phases · ${quests} quests · free</p>
    <h1 id="heroTitle" class="hero-title">Creature HQ</h1>
    <p class="hero-lede">Learn fullstack web development, from how the browser works to deploying a real app. Raise a creature while you do it: quizzes train it, shipped projects make it evolve.</p>
    <div class="hero-cta"><a class="btn btn-primary btn-lg" href="/app?mode=signup">Start free</a><a class="btn btn-lg" href="/app">I have an account</a></div>
    <div class="device hero-device">
      <div class="device-top"><span class="led"></span><span class="name">8 creatures · 4 forms each</span><span class="device-lv">NEW</span></div>
      <div class="screen"><div class="title-stage lineup">${SPECIES_ORDER.map(k => art(k, 0, "bob")).join("")}</div>
      <p class="dialog">pick one of us. we grow when you ship projects.</p></div>
    </div>
  </section>

  <section id="how" class="band" aria-labelledby="howTitle">
    <h2 id="howTitle">How it works</h2>
    <ol class="steps">${STEPS.map(([h, p], i) => `<li><span class="step-n">${i + 1}</span><h3>${h}</h3><p>${p}</p></li>`).join("")}</ol>
  </section>

  <section id="roadmap" class="band" aria-labelledby="roadmapTitle">
    <h2 id="roadmapTitle">The fullstack roadmap</h2>
    <p class="band-lede">Twelve phases in order, about 45 weeks at a steady pace. Each one opens when the last is finished.</p>
    <ol class="phase-grid">${phases.map((p, i) => {
      const n = p.stages.reduce((a, s) => a + s[1].length, 0);
      return `<li><article><p class="eyebrow">${String(i).padStart(2, "0")} · ${esc(p.weeks)}</p><h3>${esc(p.title.split(": ").slice(1).join(": "))}</h3><p>${esc(p.note)}</p><p class="phase-meta">${n} quests · ${esc(p.tag)}</p></article></li>`;
    }).join("")}</ol>
  </section>

  <section id="companions" class="band" aria-labelledby="compTitle">
    <h2 id="compTitle">Choose your companion</h2>
    <p class="band-lede">Every creature hatches as a baby and evolves at levels ${EVO_LV.slice(1).join(", ")}. Its stats come from what you actually do: quizzes, focus sessions, snacks and shipped projects.</p>
    <ul class="comp-grid">${SPECIES_ORDER.map(k => { const s = SPECIES[k];
      return `<li style="--accent:${s.color}"><article><div class="screen">${art(k, 0, "")}</div><h3>${esc(s.line)} <span class="type">${esc(s.type)} type</span></h3><p>${esc(s.blurb)}</p><p class="forms">${s.forms.map(esc).join(" → ")}</p></article></li>`; }).join("")}</ul>
  </section>

  <section class="band" aria-labelledby="featTitle">
    <h2 id="featTitle">Built to keep you shipping</h2>
    <ul class="feat-grid">${FEATURES.map(([h, p]) => `<li><h3>${h}</h3><p>${p}</p></li>`).join("")}</ul>
  </section>

  <section id="faq" class="band" aria-labelledby="faqTitle">
    <h2 id="faqTitle">Questions</h2>
    <div class="faq">${FAQ.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("")}</div>
  </section>

  <section class="band final" aria-labelledby="finalTitle">
    <div class="final-art">${art("dragon", 3, "bob")}</div>
    <div><h2 id="finalTitle">Your companion is waiting</h2><p class="band-lede">Hatch it today. By the time you deploy your first fullstack app, it'll be a ${esc(SPECIES.dragon.forms[3])}.</p>
    <div class="hero-cta"><a class="btn btn-primary btn-lg" href="/app?mode=signup">Start free</a></div></div>
  </section>
</main>
${footer}
</body>
</html>
`;

/* ---------- privacy ---------- */
const privacy = head({ title: "Privacy · Creature HQ", desc: "What Creature HQ stores about you, why, and how to delete it.", path: "/privacy" }) + `
<body class="site">
<a class="skip" href="#main">Skip to content</a>
${header}
<main id="main" class="prose">
  <h1>Privacy</h1>
  <p class="band-lede">Last updated ${new Date().toISOString().slice(0, 10)}.</p>
  <h2>What we store</h2>
  <p>When you create an account we store your email address and, if you sign in with Google, your name and profile picture as provided by Google. Sign-in is handled by Google Firebase Authentication.</p>
  <p>Your game save is stored in Google Cloud Firestore under your account: quest progress, quiz answers, notes, project submissions (including the links and write-ups you enter), trophies, your companion, and the code you write in the Workshop.</p>
  <h2>Why</h2>
  <p>Only to run Creature HQ: to sign you in and to load your progress on any device. We don't sell your data, show ads, or share it with anyone except the providers that host the service.</p>
  <h2>On your device</h2>
  <p>The app keeps a copy of your save and your theme preference in your browser's local storage so it loads quickly and works briefly offline. Firebase also stores a sign-in token in your browser.</p>
  <h2>Deleting your data</h2>
  <p>Open the app, go to <b>Settings → Account → Delete account</b>. This permanently deletes your account and your save. You can export a backup first from <b>Settings → Backup</b>.</p>
</main>
${footer}
</body>
</html>
`;

/* ---------- 404 ---------- */
const notFound = head({ title: "Page not found · Creature HQ", desc: "This page doesn't exist.", path: "/404", robots: "noindex" }) + `
<body class="site">
${header}
<main id="main" class="nf">
  <div class="nf-art">${art("ghost", 1, "bob floaty")}</div>
  <p class="eyebrow">404</p>
  <h1>Nothing here but a ghost</h1>
  <p class="band-lede">The page you were looking for doesn't exist. It may have moved.</p>
  <div class="hero-cta"><a class="btn btn-primary" href="/">Go home</a><a class="btn" href="/app">Open the app</a></div>
</main>
</body>
</html>
`;

/* ---------- social card source (screenshotted to og.png) ---------- */
const og = `<!DOCTYPE html><html><head><meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@500&family=Pixelify+Sans:wght@700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/app.css"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#E3E2DE}
.og{width:1200px;height:630px;display:flex;flex-direction:column;justify-content:center;padding:0 80px;box-sizing:border-box}
.og h1{font:700 110px/1 "Dongle HQ",sans-serif;letter-spacing:-.04em;margin:0;color:#1E2025}
.og p{font:500 22px/1.4 "Martian Mono",monospace;color:#555961;margin:18px 0 34px}
.og .screen{border-radius:14px;border:10px solid #26282F;--accent:#8FD16A}
.og .lineup{min-height:190px}
.og .lineup .creature{max-width:130px}
</style></head><body><div class="og"><h1>Creature HQ</h1><p>Learn fullstack. Raise a creature.</p>
<div class="screen"><div class="title-stage lineup">${SPECIES_ORDER.map(k => creatureSVG(k, 0, "")).join("")}</div></div></div></body></html>`;

const icon = size => `<!DOCTYPE html><html><head><style>html,body{margin:0;background:transparent}svg{display:block;width:${size}px;height:${size}px}</style></head><body>${fs.readFileSync("public/favicon.svg", "utf8")}</body></html>`;

fs.writeFileSync("public/index.html", index);
fs.writeFileSync("public/privacy.html", privacy);
fs.writeFileSync("public/404.html", notFound);
fs.mkdirSync("tools/render", { recursive: true });
fs.writeFileSync("public/_og.html", og);           // screenshot it to og.png (see README), then delete; firebase.json never deploys it
fs.writeFileSync("tools/render/icon-180.html", icon(180));
fs.writeFileSync("tools/render/icon-48.html", icon(48));
fs.writeFileSync("tools/render/icon-512.html", icon(512));
fs.writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\nDisallow: /app\n\nSitemap: ${SITE}/sitemap.xml\n`);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync("public/sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${SITE}/</loc><lastmod>${today}</lastmod></url>
  <url><loc>${SITE}/privacy</loc><lastmod>${today}</lastmod></url>
</urlset>
`);
fs.writeFileSync("public/site.webmanifest", JSON.stringify({
  name: "Creature HQ", short_name: "Creature HQ", start_url: "/app", display: "standalone",
  background_color: "#E3E2DE", theme_color: "#26282F",
  icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }, { src: "/icon-512.png", sizes: "512x512", type: "image/png" }, { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
}, null, 2));
// app.html canonical follows SITE too
const appPath = "public/app.html";
fs.writeFileSync(appPath, fs.readFileSync(appPath, "utf8").replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE}/app">`));
console.log("built for", SITE, "·", quests, "quests");
