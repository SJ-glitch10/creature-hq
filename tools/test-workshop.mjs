// Workshop regression tests in a real browser (the Chrome installed on this machine, via playwright-core).
// Serves public/ on 127.0.0.1:5173 in local test mode (blank Firebase config, nothing touches the cloud)
// and public-run/ on localhost:5174, exactly like the README's local preview. Run with `npm test`.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { chromium } from "playwright-core";

const TYPES = { ".html":"text/html", ".js":"text/javascript", ".mjs":"text/javascript", ".css":"text/css", ".svg":"image/svg+xml", ".png":"image/png", ".json":"application/json", ".webmanifest":"application/manifest+json" };
const HARNESS = `<!DOCTYPE html><body><script>
window.runCase = msg => new Promise(res => {
  const f = document.createElement("iframe"); f.src = "http://localhost:5174/"; document.body.appendChild(f);
  const out = [], runId = Math.random();
  const done = () => { removeEventListener("message", h); f.remove(); res(out); };
  const t = setTimeout(() => { out.push(["TIMEOUT"]); done(); }, 30000);
  const h = e => { if(e.source !== f.contentWindow) return; const m = e.data;
    if(m.type === "hq-ready") return f.contentWindow.postMessage({ type:"hq-run", runId, ...msg }, "http://localhost:5174");
    if(m.runId !== runId) return out.push(["WRONG RUN ID"]);
    out.push(m.type === "hq-console" ? [m.level, m.text, m.line] : [m.type]);
    if(m.type === "hq-loaded"){ clearTimeout(t); setTimeout(done, 1200); }   // late logs (effects, timers) still arrive
  };
  addEventListener("message", h);
});
</script>`;

function serve(root, host, port, overrides = {}){
  const server = http.createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if(p in overrides){ const [type, body] = overrides[p]; res.writeHead(200, { "content-type": type }); return res.end(body); }
    if(p.endsWith("/")) p += "index.html";
    let file = path.join(root, p);
    if(!file.startsWith(root)) { res.writeHead(403); return res.end(); }
    if(!fs.existsSync(file) && fs.existsSync(file + ".html")) file += ".html";   // cleanUrls, like Firebase Hosting
    fs.readFile(file, (err, data) => {
      if(err){ res.writeHead(404); return res.end("not found"); }
      res.writeHead(200, { "content-type": TYPES[path.extname(file)] || "application/octet-stream" }); res.end(data);
    });
  });
  return new Promise(r => server.listen(port, host, () => r(server)));
}

const ROOT = path.resolve(import.meta.dirname, "..");
const servers = [
  await serve(path.join(ROOT, "public"), "127.0.0.1", 5173, {
    "/assets/firebase-config.js": ["text/javascript", fs.readFileSync(path.join(ROOT, "tools/blank-config.js"))],
    "/__harness": ["text/html", HARNESS]
  }),
  await serve(path.join(ROOT, "public-run"), "localhost", 5174)
];
const browser = await chromium.launch({ channel: "chrome", headless: true });
let failed = 0;
async function test(name, fn){
  try{ await fn(); console.log("  ok  ", name); }
  catch(e){ failed++; console.log("  FAIL", name, "\n       " + String(e.message).split("\n").join("\n       ")); }
}
const errorsOf = logs => logs.filter(l => l[0] === "error");

/* ---------- the runner on its own ---------- */
console.log("runner");
const page = await browser.newPage();
await page.goto("http://127.0.0.1:5173/__harness");
const run = msg => page.evaluate(m => runCase(m), msg);
const reactPage = (js, body = '<div id="root"></div>\n<script src="App.jsx"></script>') =>
  ({ kind:"react", html:"<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n" + body + "\n</body>\n</html>", css:"", js });
const MOUNT = 'import { createRoot } from "react-dom/client";\n';

await test("web: logs, errors with script.js line numbers, loaded", async () => {
  const out = await run({ kind:"web", html:'<p>hi</p><script src="script.js"></script>', css:"p{color:red}", js:'console.log("web ok")\nnope()' });
  assert.deepEqual(out.filter(x=>x[0]!=="hq-wait"), [["log","web ok",0], ["error","ReferenceError: nope is not defined",2], ["hq-loaded"]]);
});
await test("web: no kind field (old app version) still runs as web", async () => {
  const out = await run({ html:"<p>x</p>", css:"", js:"console.log(1+1)" });
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","2",0]]);
});
await test("web: unknown kind falls back to web", async () => {
  const out = await run({ kind:"cobol", html:"", css:"", js:"console.log('fallback')" });
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","fallback",0]]);
});
await test("web: JSX in a web project is a syntax error, not compiled", async () => {
  const out = await run({ kind:"web", html:"", css:"", js:"const a = <div/>;" });
  assert.equal(errorsOf(out).length, 1);
  assert.match(errorsOf(out)[0][1], /SyntaxError/);
});
await test("console: %s / %d placeholders are filled, %c dropped, %% kept", async () => {
  const out = await run({ kind:"web", html:"", css:"", js:'console.log("%s has %d items, 100%%", "list", 3.7)\nconsole.log("%cstyled", "color:red")\nconsole.log("%s")\nconsole.log("50%", 1)' });
  assert.deepEqual(out.filter(x=>x[0]==="log").map(x=>x[1]), ["list has 3 items, 100%", "styled", "%s", "50% 1"]);
});
await test("react: JSX, hooks, imports and CSS import render", async () => {
  const out = await run(reactPage('import { useState, useEffect } from "react";\n' + MOUNT + 'import "./style.css";\nfunction App(){ const [n, setN] = useState(1); useEffect(() => { console.log("effect", n); }, [n]);\n  return <ul>{[1,2].map(x => <li key={x}>{x * n}</li>)}</ul>; }\ncreateRoot(document.getElementById("root")).render(<App />);\n'));
  assert.deepEqual(errorsOf(out), []);
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","effect 1",0]]);
  assert.ok(out.some(x=>x[0]==="hq-loaded"));
});
await test("react: missing key warning is readable (no raw %s)", async () => {
  const out = await run(reactPage(MOUNT + 'createRoot(document.getElementById("root")).render(<ul>{[1,2].map(x => <li>{x}</li>)}</ul>);\n'));
  const w = errorsOf(out).map(x=>x[1]).join("\n");
  assert.match(w, /unique "key" prop/);
  assert.doesNotMatch(w, /%s/);
});
await test("react: syntax error reports the JSX line", async () => {
  const out = await run(reactPage('const a = 1;\n\nfunction App() {\n  return <div>\n}\n'));
  assert.equal(errorsOf(out).length, 1);
  assert.match(errorsOf(out)[0][1], /^SyntaxError: /);
  assert.equal(errorsOf(out)[0][2], 4);
  assert.ok(out.some(x=>x[0]==="hq-loaded"), "page still finishes loading");
});
await test("react: runtime error keeps its App.jsx line", async () => {
  const out = await run(reactPage('import React from "react";\n\n\nundefinedFn();\n'));
  assert.deepEqual(errorsOf(out), [["error","ReferenceError: undefinedFn is not defined",4]]);
});
await test("react: importing a package we don't ship explains what is allowed", async () => {
  const out = await run(reactPage('import axios from "axios";\n'));
  assert.match(errorsOf(out)[0][1], /Can't import 'axios'/);
});
await test("react: export default / named exports don't crash", async () => {
  const out = await run(reactPage(MOUNT + 'export default function App(){ return <p>hi</p>; }\nexport const x = 1;\ncreateRoot(document.getElementById("root")).render(<App />);\nconsole.log("done");\n'));
  assert.deepEqual(errorsOf(out), []);
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","done",0]]);
});
await test("react: React Router works and its v7 future-flag warnings are hidden", async () => {
  const out = await run(reactPage(MOUNT + 'import { BrowserRouter, Routes, Route, Link } from "react-router-dom";\nfunction App(){ return <BrowserRouter><Link to="/a">a</Link><Routes><Route path="/" element={<p>home</p>} /></Routes></BrowserRouter>; }\ncreateRoot(document.getElementById("root")).render(<App />);\nsetTimeout(() => console.log(document.body.innerText.replace(/\\s+/g, " ").trim()), 300);\n'));
  assert.deepEqual(errorsOf(out), []);
  assert.deepEqual(out.filter(x=>x[0]==="warn"), []);
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","a home",0]]);
});
await test("react: script type=module and a page without a script tag both run", async () => {
  for(const body of ['<div id="root"></div>\n<script type="module" src="./App.jsx"></script>', '<div id="root"></div>']){
    const out = await run(reactPage(MOUNT + 'createRoot(document.getElementById("root")).render(<b>x</b>);\nconsole.log("ran");\n', body));
    assert.deepEqual(errorsOf(out), [], body);
    assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","ran",0]], body);
  }
});
await test("react: </script> inside App.jsx doesn't break the page", async () => {
  const out = await run(reactPage('console.log("</script><b>")\n'));
  assert.deepEqual(out.filter(x=>x[0]==="log"), [["log","</script><b>",0]]);
});
await test("react: empty App.jsx loads with no errors", async () => {
  const out = await run(reactPage(""));
  assert.deepEqual(errorsOf(out), []);
  assert.ok(out.some(x=>x[0]==="hq-loaded"));
});
// SQL: results are rendered into the preview, so read them from the runner frame
const runSql = async js => {
  const [out, html] = await page.evaluate(js => new Promise(res => {
    const f = document.createElement("iframe"); f.src = "http://localhost:5174/"; document.body.appendChild(f);
    const out = [], runId = Math.random(), t = setTimeout(() => { out.push(["TIMEOUT"]); res([out, ""]); }, 45000);
    addEventListener("message", function h(e){ if(e.source !== f.contentWindow) return; const m = e.data;
      if(m.type === "hq-ready") return f.contentWindow.postMessage({ type:"hq-run", runId, kind:"sql", html:"", css:"", js }, "http://localhost:5174");
      out.push(m.type === "hq-console" ? [m.level, m.text, m.line] : [m.type]);
      if(m.type === "hq-loaded"){ clearTimeout(t); removeEventListener("message", h); f.dataset.done = "1"; res([out, ""]); }
    });
  }), js);
  const frame = page.frames().find(f => f.url().startsWith("http://localhost:5174") && f.parentFrame());
  const text = frame ? await frame.evaluate(() => document.body.innerText) : "";
  await page.evaluate(() => document.querySelectorAll("iframe").forEach(f => f.remove()));
  return { out, text, errors: errorsOf(out) };
};
await test("sql: create, insert, select render a result table", async () => {
  const r = await runSql("CREATE TABLE c (id SERIAL PRIMARY KEY, name TEXT);\nINSERT INTO c (name) VALUES ('Gobbit'), ('Blip');\nSELECT * FROM c ORDER BY id;\n");
  assert.deepEqual(r.errors, []);
  assert.ok(r.out.some(x => x[0] === "hq-loaded"));
  assert.match(r.text, /✓ CREATE TABLE/);
  assert.match(r.text, /✓ INSERT · 2 rows/);
  assert.match(r.text, /id\s+name\s+1\s+Gobbit\s+2\s+Blip\s+2 rows/);
});
await test("sql: error points at the right line and stops the run", async () => {
  const r = await runSql("-- header\nCREATE TABLE t (a INT);\n\nSELECT a,\n  nope\nFROM t;\nSELECT 1;\n");
  assert.deepEqual(r.errors.map(e => [e[1].split("\n")[0], e[2]]), [["ERROR: column \"nope\" does not exist", 5]]);
  assert.match(r.text, /stopped here, 1 more statement not run/);
});
await test("sql: semicolons inside strings, quoted names, comments and $$ bodies don't split", async () => {
  const r = await runSql("CREATE TABLE \"we;ird\" (v TEXT);\nINSERT INTO \"we;ird\" VALUES ('a;b'), ('it''s;');\n-- a comment; with semicolons\n/* block; comment */\nDO $$ BEGIN PERFORM 1; END $$;\nDO $fn$ BEGIN PERFORM 2; END $fn$;\nSELECT v FROM \"we;ird\" ORDER BY v\n");
  assert.deepEqual(r.errors, []);
  assert.match(r.text, /a;b\s+it's;\s+2 rows/);
  assert.equal((r.text.match(/✓/g) || []).length, 4);
});
await test("sql: constraint errors include Postgres' detail", async () => {
  const r = await runSql("CREATE TABLE u (email TEXT UNIQUE);\nINSERT INTO u VALUES ('a@x');\nINSERT INTO u VALUES ('a@x');\n");
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0][1], /duplicate key value violates unique constraint[\s\S]*Key \(email\)=\(a@x\) already exists/);
  assert.equal(r.errors[0][2], 3);
});
await test("sql: every run starts from an empty database", async () => {
  for(let k = 0; k < 2; k++) assert.deepEqual((await runSql("CREATE TABLE once (a INT);")).errors, []);
});
await test("sql: NULL, booleans, JSON, dates, numbers and joins display", async () => {
  const r = await runSql("CREATE TABLE a (id INT PRIMARY KEY, n TEXT);\nCREATE TABLE b (a_id INT REFERENCES a(id), x NUMERIC);\nINSERT INTO a VALUES (1, 'one'), (2, NULL);\nINSERT INTO b VALUES (1, 2.50);\n" +
    "SELECT a.n, b.x, true AS t, '{\"k\":1}'::json AS j, DATE '2026-01-02' AS d FROM a LEFT JOIN b ON b.a_id = a.id ORDER BY a.id;");
  assert.deepEqual(r.errors, []);
  assert.match(r.text, /one\s+2.50\s+true\s+\{"k":1\}\s+2026-01-02/);
  assert.match(r.text, /NULL\s+NULL\s+true/);
});
await test("sql: empty file and comment-only file load with a hint, no errors", async () => {
  for(const js of ["", "-- nothing yet\n/* still nothing; */\n"]){
    const r = await runSql(js);
    assert.deepEqual(r.errors, []);
    assert.match(r.text, /Nothing to run yet/);
  }
});
await test("sql: unterminated string is a Postgres error, not a runner crash", async () => {
  const r = await runSql("SELECT 'oops;\nSELECT 1;");
  assert.equal(r.errors.length, 1);
  assert.match(r.errors[0][1], /unterminated quoted string/);
  assert.ok(r.out.some(x => x[0] === "hq-loaded"));
});
await test("sql: HTML in results is shown as text", async () => {
  const r = await runSql("SELECT '<img src=x onerror=alert(1)>' AS v;");
  assert.match(r.text, /<img src=x onerror=alert\(1\)>/);
});
await test("sql: more than 200 rows shows the first 200", async () => {
  const r = await runSql("SELECT g FROM generate_series(1, 250) g;");
  assert.match(r.text, /250 rows, first 200 shown/);
});
// Node: server.js (js slot), module.js (css slot) and .env (html slot); the preview holds a request panel
const runNode = async ({ server = "", mod = "", env = "", id = "t" + Math.random() }) => {
  await page.evaluate(([js, css, html, id]) => new Promise(res => {
    document.querySelectorAll("iframe").forEach(f => f.remove());
    const f = document.createElement("iframe"); f.src = "http://localhost:5174/"; document.body.appendChild(f);
    const runId = Math.random(), t = setTimeout(() => { window.__nlog.push(["TIMEOUT"]); res(); }, 20000);
    window.__nlog = [];
    removeEventListener("message", window.__nh || (() => {}));
    addEventListener("message", window.__nh = e => { if(e.source !== f.contentWindow) return; const m = e.data;
      if(m.type === "hq-ready") return f.contentWindow.postMessage({ type:"hq-run", runId, id, kind:"node", html, css, js }, "http://localhost:5174");
      window.__nlog.push(m.type === "hq-console" ? [m.level, m.text, m.line, m.file] : [m.type]);
      if(m.type === "hq-loaded"){ clearTimeout(t); res(); }
    });
  }), [server, mod, env, id]);
  await page.waitForTimeout(150);   // listen callbacks and the first request
  const frame = page.frames().find(f => f.url().startsWith("http://localhost:5174") && f.parentFrame());
  const logs = () => page.evaluate(() => window.__nlog);
  return { frame, id, logs, errors: async () => errorsOf(await logs()),
    status: () => frame.evaluate(() => document.getElementById("st").textContent),
    last: () => frame.evaluate(() => { const s = document.querySelector("#out section"); return s ? s.innerText : ""; }),
    send: async (method, url, body = "") => {
      const n = await frame.evaluate(() => document.querySelectorAll("#out section").length);
      await frame.evaluate(([m, u, b]) => { const el = document.getElementById("m"); el.value = m; el.dispatchEvent(new Event("change"));
        document.getElementById("u").value = u; document.getElementById("b").value = b; document.getElementById("rq").requestSubmit(); }, [method, url, body]);
      await frame.waitForFunction(n => document.querySelectorAll("#out section").length > n || n === 20, n, { timeout: 8000 });
      return frame.evaluate(() => document.querySelector("#out section").innerText);
    } };
};
const HTTP = 'const http = require("http");\nconst { greet } = require("./module.js");\nconst server = http.createServer((req, res) => {\n  console.log(req.method, req.url);\n' +
  '  if (req.url === "/") { res.writeHead(200, { "Content-Type": "text/plain" }); res.end(greet("creature")); }\n  else { res.writeHead(404, { "Content-Type": "text/plain" }); res.end("Not found"); }\n});\n' +
  'server.listen(process.env.PORT || 3000, () => console.log("listening", process.env.PORT));\n';
const GREET = 'module.exports = { greet: name => `Hello, ${name}!` };\n';
await test("node: raw http server answers the first request; .env is in process.env", async () => {
  const r = await runNode({ server: HTTP, mod: GREET, env: "# port\nPORT=4000\nNAME=\"Gob bit\" # comment\n" });
  assert.deepEqual(await r.errors(), []);
  assert.match(await r.status(), /Listening on port 4000/);
  assert.match(await r.last(), /GET \/\s+200 OK · text\/plain[\s\S]*Hello, creature!/);
  assert.deepEqual((await r.logs()).filter(l => l[0] === "log").map(l => l[1]), ["listening 4000", "GET /"]);
  assert.match(await r.send("GET", "/nope"), /404 Not Found[\s\S]*Not found/);
});
await test("node: a script without a server just runs; require('./module') works without .js", async () => {
  const r = await runNode({ server: 'const { greet } = require("./module");\nconsole.log(greet("you"));\n', mod: GREET });
  assert.deepEqual((await r.logs()).filter(l => l[0] === "log").map(l => l[1]), ["Hello, you!"]);
  assert.match(await r.status(), /Script finished/);
});
await test("node: errors name the right file and line", async () => {
  let r = await runNode({ server: '\nrequire("mongoose");\n' });
  assert.deepEqual((await r.errors()).map(e => [e[1].split(".")[0], e[2], e[3]]), [["Error: Cannot find module 'mongoose'", 2, "js"]]);
  assert.match(await r.status(), /Crashed while starting/);
  r = await runNode({ server: 'require("./module.js");\n', mod: '// line 1\n\nundefinedThing();\n' });
  assert.deepEqual((await r.errors()).map(e => [e[1], e[2], e[3]]), [["ReferenceError: undefinedThing is not defined", 3, "css"]]);
  r = await runNode({ server: 'const a = 1;\nconst b = ;\n' });
  assert.deepEqual((await r.errors()).map(e => [e[2], e[3]]), [[2, "js"]]);
  assert.match(await r.status(), /Didn't start/);
});
await test("node: process.exit stops the script", async () => {
  const r = await runNode({ server: 'if (!process.env.API_KEY) {\n  console.error("Missing API_KEY");\n  process.exit(1);\n}\nconsole.log("not reached");\n' });
  assert.deepEqual((await r.logs()).filter(l => l[0] === "error" || l[0] === "log").map(l => l[1]), ["Missing API_KEY"]);
  assert.match(await r.status(), /exited with code 1/);
});
await test("node: res.end(object), no answer and a crash in a handler are explained", async () => {
  let r = await runNode({ server: 'require("http").createServer((req, res) => {\n  res.end({ ok: true });\n}).listen(3000);\n' });
  assert.match(await r.last(), /server crashed/);
  assert.deepEqual((await r.errors()).map(e => [e[1].split(".")[0], e[2]]), [['TypeError: The "chunk" argument must be of type string or an instance of Buffer or Uint8Array', 2]]);
  r = await runNode({ server: 'require("http").createServer((req, res) => {\n  console.log("got it");\n}).listen(3000);\n' });
  await r.frame.waitForFunction(() => /No response after 5 seconds/.test(document.body.innerText), null, { timeout: 8000 });
});
const API = 'const express = require("express");\nconst app = express();\nconst tasks = [{ id: 1, title: "Feed" }];\napp.use(express.json());\n' +
  'app.use((req, res, next) => { console.log(req.method, req.path); next(); });\n' +
  'app.get("/tasks", (req, res) => res.json(tasks));\n' +
  'app.post("/tasks", (req, res) => {\n  if (!req.body || !req.body.title) return res.status(400).json({ error: "title is required" });\n  const t = { id: tasks.length + 1, title: req.body.title };\n  tasks.push(t);\n  res.status(201).json(t);\n});\n' +
  'app.put("/tasks/:id", (req, res) => {\n  const t = tasks.find(x => x.id === Number(req.params.id));\n  if (!t) return res.sendStatus(404);\n  Object.assign(t, req.body);\n  res.json(t);\n});\n' +
  'app.delete("/tasks/:id", (req, res) => res.status(204).end());\n' +
  'app.get("/boom", (req, res) => {\n  throw new Error("kaboom");\n});\n' +
  'app.get("/async", async (req, res) => {\n  await null;\n  throw new Error("later");\n});\n' +
  'const api = express.Router();\napi.get("/hello/:name", (req, res) => res.send(`hi ${req.params.name} ${req.query.x}`));\napp.use("/api", api);\n' +
  'app.use((err, req, res, next) => {\n  res.status(err.status || 500).json({ error: err.message });\n});\n' +
  'app.listen(3000);\n';
await test("express: CRUD on /tasks with JSON bodies, params and status codes", async () => {
  const r = await runNode({ server: API });
  assert.match(await r.last(), /GET \/tasks\s+200 OK · application\/json[\s\S]*"title": "Feed"/);   // first GET route is requested on start
  assert.match(await r.send("POST", "/tasks", '{"title":"Ship"}'), /201 Created[\s\S]*"id": 2,\s+"title": "Ship"/);
  assert.match(await r.send("POST", "/tasks", '{}'), /400 Bad Request[\s\S]*title is required/);
  assert.match(await r.send("PUT", "/tasks/2", '{"title":"Shipped"}'), /200 OK[\s\S]*"title": "Shipped"/);
  assert.match(await r.send("PUT", "/tasks/9", '{"title":"x"}'), /404 Not Found[\s\S]*Not Found/);
  assert.match(await r.send("DELETE", "/tasks/2"), /204 No Content[\s\S]*Empty body/);
  assert.match(await r.send("GET", "/missing"), /404 Not Found[\s\S]*Cannot GET \/missing/);
  assert.match(await r.send("GET", "/api/hello/Gob%20bit?x=1"), /200 OK · text\/html[\s\S]*hi Gob bit 1/);
  assert.deepEqual(await r.errors(), []);
  assert.ok((await r.logs()).some(l => l[0] === "log" && l[1] === "POST /tasks"));
});
await test("express: thrown and async errors reach the error middleware; bad JSON is a 400", async () => {
  const r = await runNode({ server: API });
  assert.match(await r.send("GET", "/boom"), /500 Internal Server Error[\s\S]*kaboom/);
  assert.match(await r.send("GET", "/async"), /500 Internal Server Error[\s\S]*later/);
  assert.match(await r.send("POST", "/tasks", '{"title":'), /400 Bad Request/);
  assert.deepEqual(await r.errors(), []);   // the student's error middleware handled them
});
await test("express: unhandled errors log with a line; answering twice is ERR_HTTP_HEADERS_SENT", async () => {
  const r = await runNode({ server: 'const app = require("express")();\napp.get("/", (req, res) => {\n  res.send("one");\n  res.send("two");\n});\napp.get("/x", (req, res) => {\n  null.y;\n});\napp.listen(3000);\n' });
  assert.match(await r.last(), /200 OK[\s\S]*one/);
  assert.match(await r.send("GET", "/x"), /500 Internal Server Error[\s\S]*Internal Server Error/);
  assert.deepEqual((await r.errors()).map(e => [e[1], e[2]]), [["Error: Cannot set headers after they are sent to the client", 4], ["TypeError: Cannot read properties of null (reading 'y')", 7]]);
});
await test("express: without express.json() req.body is undefined", async () => {
  const r = await runNode({ server: 'const app = require("express")();\napp.post("/", (req, res) => res.json({ body: String(req.body) }));\napp.listen(3000);\n' });
  assert.match(await r.send("POST", "/", '{"a":1}'), /"body": "undefined"/);
});
await test("node: the last request is replayed on the next run of the same project", async () => {
  let r = await runNode({ server: API, id: "replay" });
  await r.send("POST", "/tasks", '{"title":"Again"}');
  r = await runNode({ server: API, id: "replay" });
  assert.match(await r.last(), /POST \/tasks\s+201 Created[\s\S]*"title": "Again"/);
});
await test("node: HTML responses render in a sandboxed frame", async () => {
  const r = await runNode({ server: 'require("express")().get("/", (req, res) => res.send("<h1>hi</h1><script>parent.hacked=1</script>")).listen(3000);\n' });
  assert.equal(await r.frame.evaluate(() => document.querySelector("#out iframe").getAttribute("sandbox")), "");
  assert.equal(await r.frame.evaluate(() => window.hacked), undefined);
});
await page.evaluate(() => document.querySelectorAll("iframe").forEach(f => f.remove()));
await test("runner ignores messages from origins that aren't the app", async () => {
  const p2 = await browser.newPage();
  await p2.goto("http://localhost:5174/");   // same-origin parent that isn't allowed: opened directly, no host
  assert.match(await p2.textContent("body"), /shows previews from the Creature HQ Workshop/);
  await p2.close();
});

/* ---------- the Workshop inside the app (local test mode) ---------- */
console.log("workshop in the app");
const app = await browser.newPage();
// uncaught errors in the app itself (not the student's code in the preview frame)
await app.addInitScript(() => { if(location.port === "5173") addEventListener("error", e => (window.__errs ||= []).push(e.message)); });
await app.goto("http://127.0.0.1:5173/app");
await app.evaluate(() => { localStorage.clear(); localStorage.setItem("hqRulesSeen", "1"); });
await app.reload();
await app.waitForFunction(() => typeof wsQuestOk === "function" && typeof go === "function" && !document.getElementById("boot"), null, { timeout: 15000 });
// the title screen covers the app until clicked through; the Workshop doesn't depend on it
await app.evaluate(() => { document.getElementById("titleRoot").innerHTML = ""; titleOpen = false; });
const W = (fn, arg) => app.evaluate(fn, arg);
const waitRun = () => app.waitForFunction(() => ws.runState === "ok" || ws.runState === "stuck", null, { timeout: 40000 });

await test("wsQuestOk: phases 1-5 practice/project stages, Node/Express practice and project, SQL practice quests", async () => {
  assert.deepEqual(await W(() => [wsQuestOk(1,1,0), wsQuestOk(4,2,1), wsQuestOk(5,1,0), wsQuestOk(5,2,0), wsQuestOk(5,0,0), wsQuestOk(0,1,0), wsQuestOk(6,1,0),
    wsQuestOk(8,1,0), wsQuestOk(8,1,3), wsQuestOk(8,1,4), wsQuestOk(8,0,0), wsQuestOk(8,2,0)]),
    [true, true, true, true, false, false, false, true, true, false, false, false]);
  // Node/Express: practice quests after the opening "sketch it" one, and the Express project; not the Learn stages
  assert.deepEqual(await W(() => [wsQuestOk(6,1,1), wsQuestOk(6,1,5), wsQuestOk(6,0,0), wsQuestOk(6,2,0), wsQuestOk(7,1,0), wsQuestOk(7,1,1), wsQuestOk(7,1,6), wsQuestOk(7,2,0), wsQuestOk(7,0,0)]),
    [true, true, false, false, false, true, true, true, false]);
  assert.deepEqual(await W(() => [phases[6].stages[1][1][0], phases[7].stages[1][1][0], phases[7].stages[2][1][0]]),
    ["Sketch how a request travels: browser → server → response", "Sketch the routes your API will need before writing any code", "Build Task Management REST API"]);
  assert.deepEqual(await W(() => phases[8].stages[1][1].slice(0, 5)), ["Create a users table","Insert and query rows","Create two related tables","Write a JOIN query","Connect Node to PostgreSQL"]);
});
await test("wsKind: stored kind wins, else from the quest, else web", async () => {
  assert.deepEqual(await W(() => [wsKind({}), wsKind({questId:"1-1-0"}), wsKind({questId:"5-1-0"}), wsKind({kind:"web",questId:"5-1-0"}),
    wsKind({kind:"bogus",questId:"5-1-0"}), wsKind({questId:"99-0-0"}), wsKind(null), wsKind({questId:"8-1-2"}), wsKind({questId:"8-1-4"})]),
    ["web","web","react","web","react","web","web","sql","web"]);
});
await test("web starter project: runs, logs nothing bad, saves kind web", async () => {
  await W(() => { go("workshop"); return wsCreate(WS_TEMPLATES.starter); });
  await waitRun();
  assert.equal(await W(() => ws.runState), "ok");
  assert.deepEqual(await W(() => ws.logs.filter(l => l.level === "error")), []);
  assert.deepEqual(await W(() => [...document.querySelectorAll(".ws-file")].map(b => b.textContent)), ["index.html","style.css","script.js"]);
  const saved = await W(() => Object.values(JSON.parse(localStorage.getItem("hqProjects"))));
  assert.equal(saved.length, 1); assert.equal(saved[0].kind, "web");
});
await test("React quest: App.jsx tab, template renders, no console errors, kind saved", async () => {
  await W(() => wsBack());
  await W(() => wsQuest("5-1-1"));
  await waitRun();
  assert.equal(await W(() => ws.runState), "ok");
  assert.deepEqual(await W(() => ws.logs.filter(l => l.level !== "log")), []);
  assert.deepEqual(await W(() => [...document.querySelectorAll(".ws-file")].map(b => b.textContent)), ["index.html","style.css","App.jsx"]);
  const frame = app.frames().find(f => f.url().startsWith("http://localhost:5174"));
  await frame.waitForSelector("button");
  assert.match(await frame.textContent("button"), /Clicked 0 times/);
  await frame.click("button");
  assert.match(await frame.textContent("button"), /Clicked 1 times/);
  const p = await W(() => Object.values(JSON.parse(localStorage.getItem("hqProjects"))).find(x => x.questId === "5-1-1"));
  assert.equal(p.kind, "react");
});
await test("React: editing to an error shows App.jsx:<line> in the console", async () => {
  await W(() => { ws.cur.files.js = "const x = 1;\nboom();\n"; wsRun(true); });
  await waitRun();
  await app.waitForFunction(() => ws.logs.some(l => l.level === "error"));
  assert.deepEqual(await W(() => ws.logs.filter(l => l.level === "error").map(l => [l.text, l.line])), [["ReferenceError: boom is not defined", 2]]);
  assert.equal(await W(() => document.querySelector(".ws-line").textContent), "App.jsx:2");
});
await test("React: open preview in a new tab compiles and renders too", async () => {
  await W(() => { ws.cur.files.js = 'import { createRoot } from "react-dom/client";\ncreateRoot(document.getElementById("root")).render(<h2>in a tab</h2>);\n'; });
  const [tab] = await Promise.all([app.waitForEvent("popup"), W(() => wsTab())]);
  await tab.waitForSelector("h2", { timeout: 40000 });
  assert.equal(await tab.textContent("h2"), "in a tab");
  assert.equal(await tab.evaluate(() => window.opener), null, "the preview tab can't reach the app");
  await tab.close();
});
await test("opening the same quest again reuses the project", async () => {
  await W(() => wsBack());
  await W(() => wsQuest("5-1-1"));
  assert.equal(await W(() => ws.list.filter(p => p.questId === "5-1-1").length), 1);
});
await test("duplicate keeps the React kind; gallery shows App.jsx", async () => {
  await W(() => wsBack());
  const id = await W(() => ws.list.find(p => p.questId === "5-1-1").id);
  await W(id => wsDuplicate(id), id);
  assert.equal(await W(() => ws.cur.kind), "react");
  await W(() => wsBack());
  assert.ok(await W(() => [...document.querySelectorAll(".ws-card-files")].some(e => e.textContent.includes("App.jsx"))));
});
await test("an old project saved without kind opens with the right kind", async () => {
  await W(() => wsBack());
  await W(() => {
    const all = JSON.parse(localStorage.getItem("hqProjects"));
    all.oldweb = { name:"old", files:{ html:"<p>old</p>", css:"", js:"console.log('legacy')" }, questId:null, createdAt:1, updatedAt:2 };
    all.oldreact = { name:"old react", files:{ html:"<div id=root></div>", css:"", js:"console.log(<b/> ? 'jsx' : '')" }, questId:"5-2-0", createdAt:1, updatedAt:3 };
    localStorage.setItem("hqProjects", JSON.stringify(all)); ws.list = null;
  });
  await W(() => wsLoadList(true));
  for(const [id, kind, log] of [["oldweb","web","legacy"], ["oldreact","react","jsx"]]){
    await W(id => wsOpen(ws.list.find(p => p.id === id)), id);
    await waitRun();
    assert.equal(await W(() => ws.cur.kind), kind);
    await app.waitForFunction(() => ws.logs.length > 0);
    assert.deepEqual(await W(() => ws.logs.map(l => l.text)), [log]);
    await W(() => wsBack());
  }
});
await test("SQL quest: one query.sql tab, template runs, error line links to query.sql, kind saved", async () => {
  await W(() => wsQuest("8-1-0"));
  await waitRun();
  assert.equal(await W(() => ws.runState), "ok");
  assert.deepEqual(await W(() => ws.logs), []);
  assert.deepEqual(await W(() => [...document.querySelectorAll(".ws-file")].map(b => b.textContent)), ["query.sql"]);
  assert.equal(await W(() => ws.editor.active), "js");
  const frame = app.frames().find(f => f.url().startsWith("http://localhost:5174"));
  assert.match(await frame.evaluate(() => document.body.innerText), /Blip\s+7[\s\S]*Gobbit\s+3/);
  await W(() => { ws.cur.files.js = "SELECT 1;\nSELECT nope;\n"; wsRun(true); });
  await waitRun();
  await app.waitForFunction(() => ws.logs.some(l => l.level === "error"));
  assert.equal(await W(() => document.querySelector(".ws-line").textContent), "query.sql:2");
  const p = await W(() => Object.values(JSON.parse(localStorage.getItem("hqProjects"))).find(x => x.questId === "8-1-0"));
  assert.equal(p.kind, "sql");
  await W(() => wsBack());
});
await test("Node quest: server.js, module.js and .env tabs, template answers GET /, module errors link to module.js, kind saved", async () => {
  await W(() => wsQuest("6-1-1"));
  await app.waitForFunction(() => ws.cur && ws.cur.questId === "6-1-1" && ws.runState === "ok" && ws.frame, null, { timeout: 20000 });
  assert.deepEqual(await W(() => [...document.querySelectorAll(".ws-file")].map(b => b.textContent)), ["server.js", "module.js", ".env"]);
  assert.equal(await W(() => ws.editor.active), "js");
  const frame = app.frames().find(f => f.url().startsWith("http://localhost:5174"));
  await frame.waitForFunction(() => /Hello, creature!/.test(document.body.innerText));
  assert.match(await frame.evaluate(() => document.getElementById("st").textContent), /Listening on port 3000/);
  await app.waitForFunction(() => ws.logs.some(l => l.text === "GET /"));
  assert.deepEqual(await W(() => ws.logs.filter(l => l.level === "error")), []);
  await W(() => { ws.cur.files.css = "// fine\nnope();\n"; wsRun(true); });
  await waitRun();
  await app.waitForFunction(() => ws.logs.some(l => l.level === "error"));
  assert.equal(await W(() => document.querySelector(".ws-line").textContent), "module.js:2");
  await W(() => document.querySelector(".ws-line").click());
  assert.equal(await W(() => ws.editor.active), "css");
  const p = await W(() => Object.values(JSON.parse(localStorage.getItem("hqProjects"))).find(x => x.questId === "6-1-1"));
  assert.equal(p.kind, "node");
  await W(() => wsBack());
});
await test("Express project: template serves GET /tasks from module.js", async () => {
  await W(() => wsQuest("7-2-0"));
  await app.waitForFunction(() => ws.cur && ws.cur.questId === "7-2-0" && ws.runState === "ok" && ws.frame, null, { timeout: 20000 });
  const frame = app.frames().find(f => f.url().startsWith("http://localhost:5174"));
  await frame.waitForFunction(() => /GET \/tasks[\s\S]*200 OK[\s\S]*Feed the creature/.test(document.body.innerText));
  assert.deepEqual(await W(() => ws.logs.filter(l => l.level === "error")), []);
  await W(() => wsBack());
});
await test("SQL: a query that never finishes is reported as stuck", async () => {
  await W(() => wsQuest("8-1-0"));
  await W(() => { ws.cur.files.js = "SELECT count(*) FROM generate_series(1, 1000000000000);"; wsRun(true); });
  await app.waitForFunction(() => ws.runState === "stuck", null, { timeout: 90000 });
  assert.equal(await W(() => document.getElementById("wsStuck").hidden), false);
  await W(() => wsBack());
});
await test("no uncaught errors in the app page", async () => {
  assert.deepEqual(await W(() => window.__errs || []), []);
});

await browser.close();
servers.forEach(s => s.close());
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
