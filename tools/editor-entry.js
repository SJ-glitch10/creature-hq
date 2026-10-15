// Bundled by `npm run build:editor` into public/assets/editor.js (loaded only when the Workshop opens).
// One editor view; each file keeps its own EditorState so undo history stays per file.
import { basicSetup } from "codemirror";
import { EditorView, keymap } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import { indentUnit, HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { tags as t } from "@lezer/highlight";

const LANGS = { html: () => html({ autoCloseTags: true }), css: () => css(), js: jsx => javascript({ jsx }) };

// colours come from CSS variables so the editor follows the app's light/dark theme
const highlight = HighlightStyle.define([
  { tag: [t.keyword, t.controlKeyword, t.moduleKeyword, t.operatorKeyword], color: "var(--syn-keyword)" },
  { tag: [t.string, t.special(t.string), t.regexp], color: "var(--syn-string)" },
  { tag: [t.number, t.bool, t.null, t.atom], color: "var(--syn-number)" },
  { tag: [t.comment, t.lineComment, t.blockComment], color: "var(--syn-comment)", fontStyle: "italic" },
  { tag: [t.tagName], color: "var(--syn-tag)" },
  { tag: [t.attributeName, t.propertyName], color: "var(--syn-attr)" },
  { tag: [t.attributeValue], color: "var(--syn-string)" },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: "var(--syn-fn)" },
  { tag: [t.className, t.typeName, t.definition(t.typeName)], color: "var(--syn-type)" },
  { tag: [t.variableName, t.definition(t.variableName)], color: "var(--syn-var)" },
  { tag: [t.angleBracket, t.bracket, t.punctuation, t.separator], color: "var(--syn-punct)" },
  { tag: [t.unit, t.color, t.constant(t.name)], color: "var(--syn-number)" },
  { tag: t.invalid, color: "var(--bad)" }
]);

const theme = EditorView.theme({
  "&": { height: "100%", fontSize: "13px", backgroundColor: "var(--code-bg)", color: "var(--ink)" },
  "&.cm-focused": { outline: "none" },
  ".cm-scroller": { fontFamily: "var(--mono)", lineHeight: "1.65" },
  ".cm-content": { padding: "12px 0", caretColor: "var(--amber)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--amber)", borderLeftWidth: "2px" },
  ".cm-gutters": { backgroundColor: "var(--code-bg)", color: "var(--ink-3)", border: "none", paddingLeft: "6px" },
  ".cm-activeLineGutter": { backgroundColor: "transparent", color: "var(--ink)" },
  ".cm-activeLine": { backgroundColor: "var(--code-line)" },
  "&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, ::selection": { backgroundColor: "var(--code-sel) !important" },
  ".cm-matchingBracket": { backgroundColor: "var(--code-sel)", outline: "1px solid var(--line-2)" },
  ".cm-foldPlaceholder": { backgroundColor: "var(--panel-2)", border: "1px solid var(--line)", color: "var(--ink-2)" },
  ".cm-tooltip": { backgroundColor: "var(--panel)", border: "1px solid var(--line-2)", borderRadius: "6px", overflow: "hidden" },
  ".cm-tooltip-autocomplete > ul > li": { fontFamily: "var(--mono)", fontSize: "12px", padding: "3px 8px" },
  ".cm-tooltip-autocomplete > ul > li[aria-selected]": { backgroundColor: "var(--strong)", color: "var(--on-strong)" },
  ".cm-panels": { backgroundColor: "var(--panel)", color: "var(--ink)", borderColor: "var(--line)" },
  ".cm-searchMatch": { backgroundColor: "var(--amber-soft)", outline: "1px solid var(--amber)" }
});

export function createEditor({ parent, files, active, jsx = false, onChange, onRun, onSave }) {
  const lang = new Compartment();
  const extensions = name => [
    basicSetup,
    keymap.of([
      { key: "Mod-Enter", run: () => { onRun && onRun(); return true; } },
      { key: "Mod-s", run: () => { onSave && onSave(); return true; } },
      indentWithTab
    ]),
    indentUnit.of("  "),
    EditorState.tabSize.of(2),
    lang.of(LANGS[name](jsx)),
    syntaxHighlighting(highlight),
    theme,
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ "aria-label": name.toUpperCase() + " code", spellcheck: "false", autocapitalize: "off" }),
    EditorView.updateListener.of(u => { if (u.docChanged && onChange) onChange(name, u.state.doc.toString()); })
  ];
  const states = {};
  for (const name of Object.keys(LANGS)) states[name] = EditorState.create({ doc: files[name] || "", extensions: extensions(name) });
  let current = active in states ? active : "html";
  const view = new EditorView({ state: states[current], parent });

  return {
    show(name) {
      if (name === current || !(name in states)) return;
      states[current] = view.state;
      current = name;
      view.setState(states[name]);
      view.focus();
    },
    // replace every file (another project was opened)
    load(newFiles, name = "html") {
      for (const n of Object.keys(LANGS)) states[n] = EditorState.create({ doc: newFiles[n] || "", extensions: extensions(n) });
      current = name in states ? name : "html";
      view.setState(states[current]);
    },
    value(name) { return name === current ? view.state.doc.toString() : states[name].doc.toString(); },
    // select a line (1-based), e.g. when an error in the console is clicked
    goto(name, line) {
      this.show(name);
      const doc = view.state.doc, l = doc.line(Math.max(1, Math.min(doc.lines, line)));
      view.dispatch({ selection: { anchor: l.from, head: l.to }, effects: EditorView.scrollIntoView(l.from, { y: "center" }) });
      view.focus();
    },
    get active() { return current; },
    focus() { view.focus(); },
    destroy() { view.destroy(); }
  };
}
