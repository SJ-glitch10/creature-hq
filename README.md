# Creature HQ

**Live:** https://creature-hq.web.app

A fullstack developer roadmap where passing quizzes and shipping projects grows a creature companion.
Hosted on Firebase: sign-in with Firebase Auth (Google + email/password), one Firestore document per player.

## Layout

| Path | What it is |
| --- | --- |
| `public/index.html` | Landing page (indexed by search engines). Generated. |
| `public/app.html` | The game, served at `/app` (noindex). Generated. |
| `public/privacy.html`, `public/404.html` | Generated. |
| `public/assets/game.js` | Game code (was the inline scripts of v13). Edit this. |
| `public/assets/quiz.js` | Quiz bank, 5 questions × 177 checkpoints. |
| `public/assets/sync.js` | Sign-in screen + cloud save. Loads the save into localStorage, then starts the game. |
| `public/assets/firebase-config.js` | Public web config for the Firebase project. |
| `firestore.rules` | Only the signed-in owner can read/write `users/{uid}`; everything else is closed. |
| `tools/build-site.mjs` | Regenerates landing/privacy/404/sitemap/robots/manifest. |
| `tools/build-app.mjs` | Regenerates `app.html` from `tools/body.html`. |
| `tools/checkquiz.mjs` | Checks every checkpoint has 5 valid quiz questions. |
| `public/assets/workshop.js` | The Workshop: project gallery, editor, live preview and console. |
| `public/assets/editor.js` | CodeMirror 6, bundled from `tools/editor-entry.js` by `npm run build:editor`. |
| `public-run/index.html` | The preview runner, deployed to its own site (creature-hq-run.web.app). |

## The Workshop

An HTML/CSS/JavaScript editor with a live preview. Each project is its own Firestore document, `users/{uid}/projects/{id}`, holding three files of up to 100 KB each (enforced in `firestore.rules`).

Student code never runs on creature-hq.web.app. The preview is an iframe of **creature-hq-run.web.app**, a separate Firebase Hosting site. The app sends the files with `postMessage`, the runner writes them into a fresh page and reports `console` output and errors back, labelled `script.js:<line>`. Because it's a different site:

- the code can't read the app's sign-in token or saved data;
- it runs in its own browser process, so an endless loop can't freeze the app (the Workshop notices after a few seconds and pauses auto-run);
- `localStorage` and `fetch` work like on a real web page, which the roadmap's JavaScript and API quests need.

### Project kinds

Every project stores the same three slots (`html`, `css`, `js`), so `firestore.rules` and saved data have one shape. A project's `kind` decides what the slots are called, which editor language each tab uses, and how the runner treats them (`WS_KINDS` in `workshop.js`, `KINDS` in `public-run/index.html`). A quest's kind comes from `wsKindOfQuest`, and `wsQuestOk` decides which quests get a **Code it** button.

| Kind | Tabs (slot) | Quests | How it runs |
|---|---|---|---|
| `web` | index.html (html), style.css (css), script.js (js) | Phases 1–4 practice and projects | Files are joined into one page. |
| `react` | index.html, style.css, App.jsx (js) | Phase 5 | Babel compiles JSX and imports. React 18 and React Router 6 load from jsDelivr. |
| `sql` | query.sql (js) | Phase 8, first four practice quests | Each run starts a fresh PostgreSQL (PGlite, WASM, from jsDelivr). Statements run one by one and each result shows as a table. |
| `node` | server.js (js), module.js (css), .env (html) | Phase 6 and 7 practice (not the opening "sketch it" quests), Express project | See below. |

Older projects saved without `kind` get one from their quest, or `web` otherwise.

### Node and Express (`node` kind)

A browser can't run Node, so the runner provides small stand-ins for what the Node and Express quests use. It is **not** real Node.

- `server.js` and `module.js` run as CommonJS modules (`require`, `module.exports`, `exports`, `__dirname`). Each one is loaded as its own blob script, so errors point at the right file and line, including syntax errors.
- `.env` is loaded into `process.env` on every run, like `node --env-file=.env`. `require("dotenv").config()` also works. `process.exit()` stops the script.
- `require` can load `http`, `express`, `dotenv`, `./module.js` and `./server.js` (`node:` prefixes work). Any other module gives a "Cannot find module" error that lists what's available.
- `http.createServer` supports `writeHead`, `setHeader`, `write`, `end`, and body `data`/`end` events. Sending an object with `res.end()` is a TypeError, as it is in Node.
- `express` follows Express 5 behaviour. It supports `get`, `post`, `put`, `patch`, `delete`, `all`, `use`, `route`, `Router()`, `:params`, `req.query`, `express.json()` and `express.urlencoded()` (`req.body` stays `undefined` without them), and `status`, `json`, `send`, `sendStatus` and `redirect`. Middleware and four-argument error handlers work, and so do thrown and async errors. Unmatched routes get `Cannot GET /path`, and answering twice gives `ERR_HTTP_HEADERS_SENT`.
- Once a server calls `listen()`, the preview shows a request panel (method, path, JSON body). The first request goes to the app's first plain GET route, or `/`. The last request is saved per project in the runner's `localStorage` and replayed on every run, so a code change shows its new response straight away. A request with no answer after 5 seconds is reported. HTML responses render in a sandboxed frame with scripts disabled.
- Server state lives in memory and starts fresh on every run. Real npm packages, databases and the file system aren't available.

**Known issue:** after an endless loop, the Workshop marks the run as stuck and removes the preview, but the loop keeps the runner site's browser process busy. Any kind can hit this (`while (true)`, or a SQL query that never ends). The next run then reports stuck too. Seen in Chrome on 2026-10-14 and not yet fixed.

## How saving works

The game still reads and writes its own localStorage keys. `sync.js`:

1. Waits for sign-in, then reads `users/{uid}` and writes it into localStorage before loading `game.js`.
2. After every game `save()`, writes the whole save back (1.5 s debounce, flushed when the tab is hidden or closed).
3. Keeps a revision number. If this device has changes the server never got (closed while offline), they're pushed on the next load; if another device saved something newer, that wins.
4. If another tab or device saves while this one is open, this tab stops saving and asks you to reload, so older progress never overwrites newer progress.

## Continuous integration

`.github/workflows/test.yml` runs on every pull request and on pushes to `main`:

- `npm run check:quiz`: the quiz bank.
- `node tools/check-version.mjs <base>`: every `?v=` stamp matches `const V` in `tools/build-app.mjs` and `tools/build-site.mjs`. If a PR changes `public/assets` or `public-run` without bumping `V`, the check fails, because returning players would otherwise keep cached old files. Run `node tools/check-version.mjs origin/main` locally before pushing.
- `public/assets/editor.js` must match a fresh `npm run build:editor`.
- `npm test` (Workshop runner and app tests in the Chrome on GitHub's Ubuntu runners) and `npm run test:rules` (Firestore emulator), on branches that have them.

On a pull request, GitHub runs these checks on the PR **merged into the current `main`**, not on the branch alone.

### Protecting `main` (needs a repo admin, once)

`.github/ruleset-main.json` is a ruleset that blocks merging until it is safe:

- changes reach `main` only through a pull request: no direct pushes, force pushes or deleting `main`;
- the `test` and `rules` checks must pass;
- the PR must be up to date with `main` before merging ("strict"), so the merge that lands is the one CI tested. If `main` moved on, press **Update branch** and CI runs again.

Apply it with `gh api -X POST repos/SJ-glitch10/creature-hq/rulesets --input .github/ruleset-main.json`, or set the same rules in **Settings → Rules → Rulesets**. It needs no approving review, so a solo maintainer can still merge their own PRs. Raise `required_approving_review_count` to require one.

**Stacked PRs** (one branch built on another, like the Workshop series): merge them in order with **Create a merge commit** or **Rebase and merge**, not squash. Squashing the first PR gives `main` a commit the next branch doesn't share, so the next PR shows the first PR's changes again and can conflict.

## Commands

```bash
# rebuild pages after changing game data or copy (SITE = the public URL)
SITE=https://creature-hq.web.app node tools/build-site.mjs

# local preview in test mode (no sign-in) while firebase-config.js is blank
npx serve public

# local preview against emulators (needs Java): copy tools/demo-config.js over public/assets/firebase-config.js, then
npx firebase-tools emulators:start --only auth,firestore --project demo-creature-hq

# rebuild the editor bundle after changing tools/editor-entry.js
npm install && npm run build:editor

# local preview: app on 5173, runner on 5174 (open the app at http://127.0.0.1:5173)
npx serve public -l 5173
npx serve public-run -l 5174

# deploy (app, runner and database rules)
npx firebase-tools deploy --only hosting,firestore:rules --project creature-hq
```

Bump `?v=14` in `tools/build-app.mjs`, `tools/build-site.mjs` and `sync.js` when you change assets, so browsers fetch the new files.

## Bugs fixed from v13

- Importing a backup (or loading a save) with a damaged companion could crash the pantry and stats; companions are now repaired on load (`cleanPet`).
- The floating window's feed button crashed if the companion was deleted while it was open; resetting progress now also closes the floating window.
- Opening a project in the Proof vault whose checkpoint no longer exists crashed; now ignored.
- Typing ↑↑↑↓↓←→←→BA (an extra ↑) didn't trigger the cheat code.
- Notes typed right before closing the tab on mobile could be lost (`pagehide` now flushes them).
- Export didn't include sound and focus-length settings; import now restores them.

## Tests

```bash
npm test             # quiz bank check + Workshop runner/app tests in your installed Chrome (local test mode, no cloud)
npm run test:rules   # firestore.rules checks against the Firestore emulator (needs Java)
```
