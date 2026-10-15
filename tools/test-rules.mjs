// Checks firestore.rules for Workshop projects against the Firestore emulator (needs Java). Run with `npm run test:rules`.
import assert from "node:assert/strict";

const HOST = process.env.FIRESTORE_EMULATOR_HOST || "127.0.0.1:8080", PROJECT = "demo-creature-hq";
const DB = `http://${HOST}/v1/projects/${PROJECT}/databases/(default)/documents`;
// the emulator accepts unsigned tokens
const b64 = o => Buffer.from(JSON.stringify(o)).toString("base64url");
const token = uid => b64({ alg:"none", typ:"JWT" }) + "." + b64({ sub:uid, user_id:uid, aud:PROJECT, iss:"https://securetoken.google.com/" + PROJECT,
  iat:Math.floor(Date.now()/1000), exp:Math.floor(Date.now()/1000)+3600, auth_time:Math.floor(Date.now()/1000), firebase:{ sign_in_provider:"password" } }) + ".";

const str = s => ({ stringValue:s });
const project = extra => ({ name:str("Counter"), questId:str("5-1-1"), createdAt:{ timestampValue:new Date().toISOString() },
  files:{ mapValue:{ fields:{ html:str("<div id=root></div>"), css:str(""), js:str("x") } } }, ...extra });

// one write with updatedAt = server time, like setDoc(..., { updatedAt: serverTimestamp() })
async function write(uid, path, fields){
  const r = await fetch(DB.replace(/\/documents$/, "/documents:commit"), { method:"POST",
    headers:{ "content-type":"application/json", authorization:"Bearer " + token(uid) },
    body:JSON.stringify({ writes:[{ update:{ name:`projects/${PROJECT}/databases/(default)/documents/${path}`, fields },
      updateTransforms:[{ fieldPath:"updatedAt", setToServerValue:"REQUEST_TIME" }] }] }) });
  return r.status;
}

let failed = 0;
async function test(name, fn){
  try{ await fn(); console.log("  ok  ", name); }
  catch(e){ failed++; console.log("  FAIL", name, "\n       " + e.message.split("\n").join("\n       ")); }
}
console.log("firestore.rules: projects");
await test("project without kind (older app) is allowed", async () => assert.equal(await write("u1", "users/u1/projects/a", project()), 200));
for(const k of ["web", "react"])
  await test(`kind "${k}" is allowed`, async () => assert.equal(await write("u1", "users/u1/projects/k" + k, project({ kind:str(k) })), 200));
await test("unknown kind is rejected", async () => assert.equal(await write("u1", "users/u1/projects/b", project({ kind:str("php") })), 403));
await test("non-string kind is rejected", async () => assert.equal(await write("u1", "users/u1/projects/c", project({ kind:{ integerValue:"1" } })), 403));
await test("extra fields are still rejected", async () => assert.equal(await write("u1", "users/u1/projects/d", project({ evil:str("x") })), 403));
await test("another user's projects are still closed", async () => assert.equal(await write("u2", "users/u1/projects/e", project({ kind:str("react") })), 403));
await test("files over 100 KB are still rejected", async () => assert.equal(await write("u1", "users/u1/projects/f",
  project({ files:{ mapValue:{ fields:{ html:str(""), css:str(""), js:str("x".repeat(100001)) } } } })), 403));
console.log(failed ? `\n${failed} failed` : "\nall passed");
process.exit(failed ? 1 : 0);
