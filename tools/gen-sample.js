// Builds sample-data.js: the small free sample shown to visitors (sample.html).
// RULE: a visitor may see at most 2% of the lessons AND at most 2% of the practice questions of each level.
// The page loads ONLY this file (never the full lesson / question files). Run:  node tools/gen-sample.js
const vm = require("vm"), fs = require("fs"), path = require("path"), root = path.join(__dirname, "..");
const ctx = vm.createContext({ console, setTimeout, document: {}, navigator: {}, localStorage: { getItem(){ return null; } } }); ctx.window = ctx; ctx.self = ctx;
function load(f){ vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f }); }
const R = e => vm.runInContext(e, ctx);
const ls = d => fs.readdirSync(root).filter(f => d.test(f));
const numSort = (a, b) => parseInt(a.replace(/\D+/, ""), 10) - parseInt(b.replace(/\D+/, ""), 10);

function lessonsFor(files){ ctx.ILEARN_LESSONS = undefined; files.forEach(load); return R("ILEARN_LESSONS").slice(); }
// ---- IGCSE
const igL = lessonsFor(["learn-helpers.js", "learn-data.js"].concat(Array.from({ length: 10 }, (_, i) => "learn-t" + (i + 1) + ".js")));
// ---- AS
const asL = lessonsFor(["as-objectives.js", "learn-helpers.js", "as-author.js"].concat(ls(/^as-t\d+b?\.js$/).sort(numSort)));
// ---- A2
const a2L = lessonsFor(["alevel-objectives.js", "learn-helpers.js"].concat(ls(/^alevel-(t\d+|p\d)\.js$/).sort()));
// ---- practice questions
["quiz-data.js", "exam-data.js", "as-exam-core.js"].concat(ls(/^as-exam-t\d+\.js$/).sort(numSort), ["as-exam-register.js", "a2-exam.js", "pp-0478.js", "pp-0478-s24.js", "pp-0478-j12.js", "pp-9618.js", "pp-as-core.js"], ls(/^pp-as-t\d+\.js$/).sort(numSort)).forEach(load);
const E = R("EXAMS"), P = R("EXAM_PAPERS");
const cnt = { igcse: 0, as: 0, a2: 0 };
Object.keys(E).forEach(k => { const e = E[k], c = (e.classes || []).join(","), n = (e.questions || []).length; if(/10BR/.test(c)) cnt.igcse += n; else if(/11BR/.test(c)) cnt.as += n; else if(/12BR/.test(c)) cnt.a2 += n; });
Object.keys(P).forEach(k => { const p = P[k], c = (p.classes || []).join(","), n = (p.questions || []).length; if(/10BR/.test(c)) cnt.igcse += n; else if(/11BR/.test(c)) cnt.as += n; else if(/12BR/.test(c)) cnt.a2 += n; });

const byId = (arr, id) => { const l = arr.find(x => x.id === id); if(!l) throw new Error("lesson not found: " + id); return l; };
// Checks of type "pp" embed Cambridge past-paper questions, so they are left out of the public sample.
const lesson = l => ({ id: l.id, code: l.code, title: l.title, video: l.video || null, concept: l.concept, example: l.example, checks: (l.checks || []).filter(c => c.type !== "pp") });
const mcq = (key, i) => { const q = E[key].questions[i]; if(!q || q.type !== "mcq") throw new Error("not an mcq: " + key + "#" + i); return { type: "mcq", q: q.q, options: q.options, correct: q.correct, explain: q.explain, topic: q.topic || "" }; };
// Structured sample questions are written for the sample itself (not copied from the question bank), so no
// past-paper text is shown to the public. Marking uses simple keyword groups, like the real iSolve.
const AS_Q = { type: "paper", topic: "Compression", marks: 3,
  prompt: "A music file is compressed before it is uploaded.\n(a) State one benefit of compressing the file. [1]\n(b) The compression is lossy. Describe what happens to the data when lossy compression is used. [2]",
  markPoints: [
    { text: "(a) Smaller file / less storage space / faster to upload or download / less bandwidth", marks: 1, match: { type: "keywords", groups: [["smaller", "less storage", "less space", "faster", "quicker", "less bandwidth", "less data", "takes up less"]], needCount: 1 } },
    { text: "(b) Some data / detail is permanently removed", marks: 1, match: { type: "keywords", groups: [["remove", "removed", "discard", "discarded", "lost", "loses", "deleted", "permanent", "less important"]], needCount: 1 } },
    { text: "(b) The original file cannot be restored exactly / quality is reduced", marks: 1, match: { type: "keywords", groups: [["cannot be restored", "can't be restored", "cannot be recovered", "not be restored", "original cannot", "can not be", "lower quality", "quality is reduced", "quality decreases", "reduced quality", "worse quality", "not the same as the original", "irreversible"]], needCount: 1 } } ],
  explanation: "Compression makes the file smaller, so it needs less storage and uploads faster. Lossy compression permanently removes some data (usually the detail people notice least), so the original cannot be restored exactly." };
const A2_Q = { type: "paper", topic: "File organisation and access", marks: 3,
  prompt: "A bank stores customer records in a file.\n(a) Describe how records are stored in a serial file. [1]\n(b) Explain why a sequential file is quicker to search than a serial file when the records are in key order. [2]",
  markPoints: [
    { text: "(a) Records are stored one after another in the order they were added (no ordering by key)", marks: 1, match: { type: "keywords", groups: [["order they were added", "order added", "chronological", "added in order", "one after another", "no order", "unordered", "not in order", "as they are added", "time order", "order they are created", "order they were created"]], needCount: 1 } },
    { text: "(b) Sequential records are held in order of a key field", marks: 1, match: { type: "keywords", groups: [["key field", "key order", "sorted", "in order of", "ordered by", "order of the key", "ordered"]], needCount: 1 } },
    { text: "(b) So the search can stop once the key is passed / does not have to check every record", marks: 1, match: { type: "keywords", groups: [["stop", "passed", "bigger", "greater", "larger", "not have to", "does not need to", "doesn't need to", "fewer", "not every", "not all", "without checking"]], needCount: 1 } } ],
  explanation: "A serial file stores records in the order they were added, so a search may have to read every record. A sequential file is kept in key order, so a search can stop as soon as it reaches a key larger than the one wanted." };
const sect = (arr, pre) => arr.filter(l => l.id.indexOf(pre) === 0).map(lesson);
const igTopics = ["ASCII vs Unicode", "Sound Sampling", "Pixels & Colour Depth"];
const igQ = E.datarep.questions.filter(q => igTopics.indexOf(q.topic) > -1 && q.type === "mcq").map(q => ({ type: "mcq", q: q.q, options: q.options, correct: q.correct, explain: q.explain, topic: q.topic }));
const S = {
  igcse: { name: "IGCSE Computer Science", code: "0478 / 0984", section: "Section 1.2 - Data storage: text, sound and images",
    lessons: sect(igL, "1.2"), questions: igQ },
  as: { name: "AS Level Computer Science", code: "9618", section: "Section 1.3 - Compression",
    lessons: sect(asL, "1.3"), questions: [AS_Q] },
  a2: { name: "A Level (A2) Computer Science", code: "9618", section: "Section 13.2 - File organisation and access",
    lessons: sect(a2L, "13.2"), questions: [A2_Q] },
};
Object.keys(S).forEach(k => { const s = S[k]; console.log(k, s.lessons.map(l => l.id).join(" "), "q:", s.questions.length, "checks:", s.lessons.map(l => (l.checks||[]).map(c => c.type || "mcq").join("/")).join(" ; ")); });
fs.writeFileSync(path.join(root, "sample-data.js"), "/* generated by tools/gen-sample.js - do not edit. At most 2% of each level's lessons and questions. */\nwindow.PQ_SAMPLE = " + JSON.stringify(S) + ";\n");
console.log("written", fs.statSync(path.join(root, "sample-data.js")).size, "bytes");
