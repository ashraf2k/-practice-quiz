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
const lesson = l => ({ id: l.id, code: l.code, title: l.title, video: l.video || null, concept: l.concept, example: l.example, checks: l.checks });
const mcq = (key, i) => { const q = E[key].questions[i]; if(!q || q.type !== "mcq") throw new Error("not an mcq: " + key + "#" + i); return { type: "mcq", q: q.q, options: q.options, correct: q.correct, explain: q.explain, topic: q.topic || "" }; };
// Structured sample questions are written for the sample itself (not copied from the question bank), so no
// past-paper text is shown to the public. Marking uses simple keyword groups, like the real iSolve.
const AS_Q = { type: "paper", topic: "Sound: sampling rate", marks: 3,
  prompt: "A sound is recorded digitally.\n(a) State what is meant by the sampling rate. [1]\n(b) State one effect of increasing the sampling rate on the quality of the recording and one effect on the file size. [2]",
  markPoints: [
    { text: "(a) The number of samples (measurements of the sound wave) taken per second", marks: 1, match: { type: "keywords", groups: [["sample", "measurement"], ["per second", "each second", "every second", "a second", "hertz", "hz"]], needCount: 2 } },
    { text: "(b) Higher quality: the recording is closer to / a more accurate copy of the original sound", marks: 1, match: { type: "keywords", groups: [["quality", "accurate", "accuracy", "closer", "faithful", "better"]], needCount: 1 } },
    { text: "(b) The file size increases (more data is stored)", marks: 1, match: { type: "keywords", groups: [["larger", "bigger", "more storage", "more memory", "more data", "file size increases", "increases the file", "increase in file size"]], needCount: 1 } } ],
  explanation: "A sample is one measurement of the sound wave. Taking more samples each second records the wave more accurately, but there is more data to store, so the file is larger." };
const A2_Q = { type: "paper", topic: "Symmetric and asymmetric encryption", marks: 3,
  prompt: "Describe how symmetric encryption differs from asymmetric encryption. [3]",
  markPoints: [
    { text: "Symmetric encryption uses the same key to encrypt and to decrypt", marks: 1, match: { type: "keywords", groups: [["same key", "single key", "one key", "identical key", "shared key", "shared secret"]], needCount: 1 } },
    { text: "Asymmetric encryption uses a pair of different keys: a public key and a private key", marks: 1, match: { type: "keywords", groups: [["public"], ["private"]], needCount: 2 } },
    { text: "The public key encrypts and only the matching private key can decrypt (so the decryption key is never shared)", marks: 1, match: { type: "keywords", groups: [["public key"], ["decrypt"], ["private key"]], needCount: 3 } } ],
  explanation: "Symmetric: one shared secret key does both jobs, so the key must be exchanged safely. Asymmetric: the public key can be given to anyone and used to encrypt; only the owner's private key can decrypt." };

const S = {
  igcse: { name: "IGCSE Computer Science", code: "0478 / 0984", lessonTotal: igL.length, questionTotal: cnt.igcse,
    lessons: [byId(igL, "1.1.1"), byId(igL, "2.1.1b"), byId(igL, "8.1.4a")].map(lesson),
    questions: [0, 1, 2, 3, 4].map(i => mcq("datarep", i)) },
  as: { name: "AS Level Computer Science", code: "9618", lessonTotal: asL.length, questionTotal: cnt.as,
    lessons: [byId(asL, "1.2.4a")].map(lesson),
    questions: [AS_Q] },
  a2: { name: "A Level (A2) Computer Science", code: "9618", lessonTotal: a2L.length, questionTotal: cnt.a2,
    lessons: [byId(a2L, "17.1a"), byId(a2L, "19.1g")].map(lesson),
    questions: [A2_Q] },
};
// ---- the 2% rule (hard stop if broken)
Object.keys(S).forEach(k => {
  const s = S[k], maxL = Math.floor(s.lessonTotal * 0.02), maxQ = Math.floor(s.questionTotal * 0.02);
  if(s.lessons.length > maxL) throw new Error(k + ": " + s.lessons.length + " lessons > 2% (" + maxL + " of " + s.lessonTotal + ")");
  if(s.questions.length > maxQ) throw new Error(k + ": " + s.questions.length + " questions > 2% (" + maxQ + " of " + s.questionTotal + ")");
  console.log(k, "lessons", s.lessons.length + "/" + s.lessonTotal, "(" + (100 * s.lessons.length / s.lessonTotal).toFixed(2) + "%)", "questions", s.questions.length + "/" + s.questionTotal, "(" + (100 * s.questions.length / s.questionTotal).toFixed(2) + "%)");
});
fs.writeFileSync(path.join(root, "sample-data.js"), "/* generated by tools/gen-sample.js - do not edit. At most 2% of each level's lessons and questions. */\nwindow.PQ_SAMPLE = " + JSON.stringify(S) + ";\n");
console.log("written", fs.statSync(path.join(root, "sample-data.js")).size, "bytes");
