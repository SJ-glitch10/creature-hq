// Builds public/app.html from the original body markup.
import fs from "node:fs";
const body = fs.readFileSync("tools/body.html","utf8");
const V = "17";
const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="color-scheme" content="light dark">
<script>try{var t=localStorage.getItem("hqTheme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}</script>
<title>Your companion · Creature HQ</title>
<meta name="description" content="Sign in to Creature HQ to continue your fullstack roadmap and look after your companion.">
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#26282F">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@400;500;600&family=Pixelify+Sans:wght@500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/app.css?v=${V}">
<link rel="modulepreload" href="https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js">
<link rel="modulepreload" href="https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js">
<link rel="modulepreload" href="https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js">
<script type="module" src="/assets/sync.js?v=${V}"></script>
</head>
<body>
${body.replace('id="bootNote">Loading<','id="bootNote">Signing in<')}<div id="authRoot"></div>
<div id="syncBanner" class="sync-banner" role="alert" hidden></div>
<noscript><p class="noscript">Creature HQ needs JavaScript turned on.</p></noscript>
</body>
</html>
`;
fs.writeFileSync("public/app.html", html);
console.log("app.html", html.length);
