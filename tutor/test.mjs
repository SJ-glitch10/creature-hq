// Tutor Worker tests: a fake AI and KV, real RS256 tokens signed with a throwaway key. Run: node tutor/test.mjs
import assert from "node:assert/strict";
import worker, { describe, clean, textOf } from "./src/index.js";

let failed = 0;
const test = async (name, fn) => { try{ await fn(); console.log("  ok  ", name); }catch(e){ failed++; console.log("  FAIL", name, "\n       " + e.message.split("\n").join("\n       ")); } };

// a fake Google key set and a signer for Firebase-shaped ID tokens
const { publicKey, privateKey } = await crypto.subtle.generateKey({ name: "RSASSA-PKCS1-v1_5", modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: "SHA-256" }, true, ["sign", "verify"]);
const jwk = { ...(await crypto.subtle.exportKey("jwk", publicKey)), kid: "k1", alg: "RS256", use: "sig" };
globalThis.fetch = async url => { assert.match(String(url), /securetoken/); return new Response(JSON.stringify({ keys: [jwk] })); };
const b64u = x => Buffer.from(typeof x === "string" ? x : JSON.stringify(x)).toString("base64url");
async function token(claims = {}, kid = "k1"){
  const now = Math.floor(Date.now() / 1000);
  const body = b64u({ alg: "RS256", kid, typ: "JWT" }) + "." + b64u({ aud: "creature-hq", iss: "https://securetoken.google.com/creature-hq", sub: "student-1", iat: now, exp: now + 3600, ...claims });
  return body + "." + Buffer.from(await crypto.subtle.sign("RSASSA-PKCS1-v1_5", privateKey, new TextEncoder().encode(body))).toString("base64url");
}

function env(reply = { response: "ooh a `null` bug. check the id on line 3." }, extra = {}){
  const kv = new Map(), calls = [];
  return { calls, kv, FIREBASE_PROJECT_ID: "creature-hq",
    LIMITS: { get: async k => kv.get(k) ?? null, put: async (k, v) => { kv.set(k, v); } },
    AI: { run: async (model, input) => { calls.push({ model, input }); if(reply instanceof Error) throw reply; return reply; } }, ...extra };
}
const ask = (e, body = {}, headers = {}) => worker.fetch(new Request("https://tutor.test/hint", { method: "POST",
  headers: { origin: "http://127.0.0.1:5173", "content-type": "application/json", ...headers },
  body: JSON.stringify({ question: "why does my button do nothing?", level: 1, species: "goblin", kind: "web",
    quest: { title: "Make a button change text", phase: "JavaScript", stage: "Tiny Wins" },
    files: { "index.html": '<button id="change-btn">Go</button>', "script.js": 'const b = document.querySelector("#changeBtn");\nb.addEventListener("click", f);' },
    errors: [{ text: "TypeError: Cannot read properties of null (reading 'addEventListener')", file: "script.js", line: 2 }], ...body }) }), e);

console.log("tutor worker");
await test("a signed-in student gets a clue; the model sees rules, voice, level, files with line numbers and the error", async () => {
  const e = env(), r = await ask(e, {}, { authorization: "Bearer " + await token() });
  assert.equal(r.status, 200);
  const out = await r.json();
  assert.deepEqual(out, { answer: "ooh a `null` bug. check the id on line 3.", level: 1, left: 9 });
  assert.equal(r.headers.get("access-control-allow-origin"), "http://127.0.0.1:5173");
  const [sys, user] = e.calls[0].input.messages;
  assert.equal(e.calls[0].model, "@cf/openai/gpt-oss-120b");
  assert.match(sys.content, /Never write the solution/);
  assert.match(sys.content, /Gobbit the goblin/);
  assert.match(sys.content, /CLUE LEVEL 1/);
  assert.match(user.content, /QUEST: Make a button change text · JavaScript · Tiny Wins/);
  assert.match(user.content, /FILE script\.js \(with line numbers\):\n  1\| const b = document\.querySelector\("#changeBtn"\);/);
  assert.match(user.content, /TypeError: Cannot read properties of null \(reading 'addEventListener'\) \(script\.js:2\)/);
  assert.match(user.content, /STUDENT'S QUESTION:\nwhy does my button do nothing\?$/);
});
await test("level and creature voice follow the request (robot, level 3)", async () => {
  const e = env(); await ask(e, { species: "robot", level: 3 }, { authorization: "Bearer " + await token() });
  assert.match(e.calls[0].input.messages[0].content, /ALL CAPS/);
  assert.match(e.calls[0].input.messages[0].content, /CLUE LEVEL 3/);
});
await test("no token, a bad token, a wrong project or an expired token is refused", async () => {
  for(const t of [null, "nope", await token({ aud: "other-project" }), await token({ exp: 1 }), await token({}, "unknown-kid"),
    (await token()).replace(/.$/, c => c === "A" ? "B" : "A")]){
    const r = await ask(env(), {}, t ? { authorization: "Bearer " + t } : {});
    assert.equal(r.status, 401); assert.equal((await r.json()).code, "auth");
  }
});
await test("local test mode works without a token only when the dev server allows it", async () => {
  assert.equal((await ask(env(undefined, { ALLOW_NO_AUTH: "1" }))).status, 200);
});
await test("10 questions a day per student, then 429; the AI isn't called", async () => {
  const e = env(), t = await token();
  for(let i = 0; i < 10; i++) assert.equal((await ask(e, {}, { authorization: "Bearer " + t })).status, 200);
  const r = await ask(e, {}, { authorization: "Bearer " + t });
  assert.equal(r.status, 429); assert.equal((await r.json()).code, "limit");
  assert.equal(e.calls.length, 10);
  assert.equal((await ask(e, {}, { authorization: "Bearer " + await token({ sub: "student-2" }) })).status, 200);   // others still can
});
await test("AI failure (or the free daily allowance running out) is 503 busy and doesn't use up a question", async () => {
  const e = env(new Error("quota")), r = await ask(e, {}, { authorization: "Bearer " + await token() });
  assert.equal(r.status, 503); assert.equal((await r.json()).code, "busy"); assert.equal(e.kv.size, 0);
});
await test("other origins, methods and paths are refused; CORS preflight answers", async () => {
  assert.equal((await ask(env(), {}, { origin: "https://evil.example" })).status, 403);
  assert.equal((await worker.fetch(new Request("https://tutor.test/hint"), env())).status, 404);
  const pre = await worker.fetch(new Request("https://tutor.test/hint", { method: "OPTIONS", headers: { origin: "https://creature-hq.web.app" } }), env());
  assert.equal(pre.status, 204); assert.equal(pre.headers.get("access-control-allow-origin"), "https://creature-hq.web.app");
});
await test("an empty question or bad JSON is 400", async () => {
  const t = { authorization: "Bearer " + await token() };
  assert.equal((await ask(env(), { question: "   " }, t)).status, 400);
  assert.equal((await worker.fetch(new Request("https://tutor.test/hint", { method: "POST", headers: { origin: "http://127.0.0.1:5173", ...t }, body: "{" }), env())).status, 400);
});
await test("answers lose code blocks and stay bubble-sized", async () => {
  assert.equal(clean("look at line 3.\n```js\nconst b = document.querySelector('#change-btn');\n```\nsee?"), "look at line 3. see?");
  assert.equal(clean("## Hint\nhi"), "Hint hi");
  assert.equal(clean(Array(100).fill("word").join(" ")).split(" ").length, 80);
});
await test("model replies in any Workers AI shape are read", async () => {
  assert.equal(textOf({ response: "a" }), "a");
  assert.equal(textOf({ choices: [{ message: { content: "b" } }] }), "b");
  assert.equal(textOf({ output: [{ content: [{ type: "output_text", text: "c" }] }] }), "c");
  assert.equal(textOf(null), "");
});
await test("big files are cut to size and empty files skipped", async () => {
  const d = describe({ files: { "a.js": "x".repeat(20000), "b.css": "", "c.js": "y".repeat(20000) } });
  assert.ok(d.length < 13000);
  assert.match(d, /FILE a\.js[\s\S]*\[\.\.\. cut \.\.\.\]/);
  assert.doesNotMatch(d, /FILE b\.css/);
  assert.match(d, /CONSOLE ERRORS:\n\(none\)/);
});

console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
