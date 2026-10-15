// Asset version check: browsers cache /assets/* and the runner by their ?v=N stamp, so a change that doesn't bump it
// can leave returning players on old files.
//   node tools/check-version.mjs          every ?v= stamp matches `const V` in tools/build-app.mjs and build-site.mjs
//   node tools/check-version.mjs <base>   also: if public/assets or public-run changed since <base> (a git ref), V changed too
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const versionIn = src => (/^const V = "(\d+)";/m.exec(src) || [])[1];
const problems = [];

const V = versionIn(read("tools/build-app.mjs"));
if(!V) problems.push('tools/build-app.mjs has no `const V = "N";`');
if(versionIn(read("tools/build-site.mjs")) !== V) problems.push(`tools/build-site.mjs: const V should be "${V}" like build-app.mjs`);

// every hand-written ?v= stamp (the minified editor bundle is generated and has none of ours)
const walk = d => fs.readdirSync(path.join(ROOT, d), { withFileTypes: true })
  .flatMap(e => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
for(const f of [...walk("public"), ...walk("public-run")]){
  if(!/\.(html|js)$/.test(f) || f.endsWith("editor.js")) continue;
  for(const m of read(f).matchAll(/\?v=(\d+)/g)) if(m[1] !== V) problems.push(`${f}: ?v=${m[1]} should be ?v=${V}`);
}

const base = process.argv[2];
if(base){
  const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8" });
  const changed = git("diff", "--name-only", base, "HEAD", "--", "public/assets", "public-run").trim();
  const baseV = versionIn(git("show", base + ":tools/build-app.mjs"));
  if(changed && baseV === V)
    problems.push(`these changed since ${base} but the asset version is still ${V}; bump it everywhere (see README):\n    ${changed.split("\n").join("\n    ")}`);
}

if(problems.length){ console.error("asset version:\n  " + problems.join("\n  ")); process.exit(1); }
console.log(`asset version ${V}: ok`);
