// Checks every AS iLearn lesson: structure, objective codes, multiple-choice shape, typed-answer keywords, and past-paper marking
// (a model answer built from the published mark scheme must score full marks; a junk answer must score 0).   Run: node tools/as-lesson-test.js
global.window = global; const fs = require("fs"), path = require("path"), root = path.join(__dirname, "..");
["as-objectives.js", "learn-helpers.js", "as-author.js"].forEach(f => require(path.join(root, f)));
fs.readdirSync(root).filter(f => /^as-t\d+b?\.js$/.test(f)).sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4))).forEach(f => require(path.join(root, f)));
require(path.join(root, "as-pp.js"));
const O = SYLLABUS_OBJECTIVES.OBJECTIVES, P = ASPP, norm = s => String(s || "").toLowerCase().replace(/[‘’]/g, "'").replace(/\s+/g, " ").trim();
let bad = 0, nPP = 0, nMC = 0, nTX = 0, ppMarks = 0; const ids = {}, byTopic = {};
const fail = (id, msg) => { bad++; console.log("✗", id, msg); };
const JUNK = "I do not know what to write here at all";
function stripHtml(s){ return String(s).replace(/<[^>]+>/g, " ").replace(/&[a-z]+;/g, " "); }
ILEARN_LESSONS.forEach(l => {
  const id = l.id; if(ids[id]) fail(id, "duplicate id"); ids[id] = 1; byTopic[parseInt(l.code, 10)] = (byTopic[parseInt(l.code, 10)] || 0) + 1;
  if(!O[l.code]) fail(id, "code " + l.code + " is not in as-objectives.js");
  ["title", "concept", "example"].forEach(k => { if(!l[k] || String(l[k]).length < (k === "title" ? 8 : 40)) fail(id, "missing/short " + k); });
  if(!Array.isArray(l.checks) || l.checks.length < 4) fail(id, "needs at least 4 checks");
  let hasPP = false;
  (l.checks || []).forEach((c, i) => {
    const w = id + " check " + (i + 1);
    if(c.type === "pp"){
      hasPP = true; nPP++;
      if(!c.src || !/^9618\/\d\d /.test(c.src)) fail(w, "pp src should start with the paper code, e.g. '9618/12 May/June 2025 · Question 3'");
      c.parts.forEach(p => {
        const pw = w + " " + p.label; ppMarks += p.marks;
        if(!p.scheme) fail(pw, "no published scheme text");
        if(p.kind === "text"){
          if(!p.points || !p.points.length) return fail(pw, "no mark points");
          const model = p.model || p.points.map(x => x.t).join(". "), r = P.markText(p, model), j = P.markText(p, JUNK);
          if(r.awarded !== p.marks) fail(pw, "model answer scores " + r.awarded + "/" + p.marks + "; missed: " + p.points.filter((x, k) => !r.hits[k]).map(x => x.t.slice(0, 50)).join(" | "));
          if(j.awarded !== 0) fail(pw, "junk scores " + j.awarded);
          if(p.points.length < p.marks) fail(pw, "fewer mark points than marks");
          const mm = P.markText(p, "yes"); if(mm.awarded) fail(pw, "'yes' scores " + mm.awarded);
        } else if(p.kind === "fields"){
          const ok = P.markFields(p, p.fields.map(f => f.ans[0])), jn = P.markFields(p, p.fields.map(() => JUNK));
          if(ok.awarded !== p.marks) fail(pw, "model fields score " + ok.awarded + "/" + p.marks);
          if(jn.awarded) fail(pw, "junk fields score " + jn.awarded);
          if(p.fields.reduce((a, f) => a + (f.marks || 1), 0) !== p.marks) fail(pw, "field marks do not add up to " + p.marks);
        } else if(p.kind === "table"){
          const st = {}; p.rows.forEach((r, ri) => r.forEach((c, ci) => { if(c.tick !== undefined) st[ri + "_" + ci] = !!c.tick; else if(c.in) st[ri + "_" + ci] = c.in[0]; }));
          const ok = P.markTable(p, st); if(ok.awarded !== p.marks) fail(pw, "model table scores " + ok.awarded + "/" + p.marks);
        } else fail(pw, "unknown kind " + p.kind);
      });
    } else if(c.type === "text"){
      nTX++; const t = norm(c.model); let m = 0;
      c.groups.forEach(g => { if(g.some(k => t.indexOf(String(k).toLowerCase()) !== -1)) m++; });
      if(m < (c.need || c.groups.length)) fail(w, "model answer fails its own keywords (" + m + "/" + (c.need || c.groups.length) + ")");
      const j = norm(JUNK); let jm = 0; c.groups.forEach(g => { if(g.some(k => j.indexOf(String(k).toLowerCase()) !== -1)) jm++; });
      if(jm >= (c.need || c.groups.length)) fail(w, "junk answer passes");
    } else if(c.type === "fill"){
    } else {
      nMC++;
      if(!c.options || c.options.length < 4) fail(w, "multiple choice needs 4 options");
      else { if(new Set(c.options.map(norm)).size !== c.options.length) fail(w, "duplicate options"); if(c.correct !== 0) fail(w, "correct must be 0"); }
      if(!c.explain) fail(w, "no explanation");
    }
  });
  if(!hasPP && !l.nopp) fail(id, "no past-paper question");
});
console.log("lessons", ILEARN_LESSONS.length, "| by topic", JSON.stringify(byTopic), "| pp questions", nPP, "marks", ppMarks, "| mc", nMC, "| typed", nTX);
console.log(bad ? "PROBLEMS " + bad : "ALL OK"); process.exit(bad ? 1 : 0);
