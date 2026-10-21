// iSolve for 11BR (Cambridge AS Level Computer Science 9618): topical past-paper sets.
// Loaded AFTER exam-data.js. Each paper below is registered into EXAM_PAPERS and offered to class 11BR through
// EXAM_PAPER_CHOICES_BY_CLASS, so exam-practice.html, quiz.html and the admin Exam Practice tab work unchanged.
// Papers use strictMarks:true: marks come only from keyword matching against the published mark scheme.
//
//   ASEX.paper(key, topicNo, title, subtitle, [ question, ... ])
//   ASEX.q(id, difficulty, src, topic, prompt, [ point, ... ], explanation)
//   ASEX.k(text, marks, [[synonyms]...], need)   one keyword mark point: need = how many groups must match (default: all)
//   ASEX.any(text, max, [[theme words]...])  'any n of' mark points: one mark per different theme found
//   ASEX.n(text, marks, [accepted values])       exact-value mark point (number, binary pattern, hex): found as a separate token
var ASEX = (function(){
  var choices = [];
  function k(text, marks, groups, need){ return { text: text, marks: marks, match: { type: "keywords", groups: groups, needCount: need || groups.length } }; }
  // any(text, max, themes): up to `max` marks, one mark for each DIFFERENT theme found (a theme = a group of acceptable words)
  function any(text, max, themes){ return { text: text, marks: max, match: { type: "keywords", groups: themes, needCount: max, marksPerGroup: 1 } }; }
  // near(text, marks, [anchor words], [stop words], [[theme]...], need): keywords must appear after the anchor and before the next stop word
  function near(text, marks, anchor, stop, groups, need){ return { text: text, marks: marks, match: { type: "near", span: 400, anchor: anchor, stop: stop, groups: groups, needCount: need || groups.length } }; }
  function n(text, marks, values){ return { text: text, marks: marks, match: { type: "value", values: values } }; }
  function q(id, difficulty, src, topic, prompt, points, explanation, cap){
    var marks = cap || points.reduce(function(a, p){ return a + p.marks; }, 0);
    return { id: id, marks: marks, difficulty: difficulty, topic: topic,
      prompt: prompt + "\n\n[Cambridge " + src + "]", markPoints: points, explanation: explanation, calc: false };
  }
  function paper(key, topicNo, title, subtitle, questions){
    var total = questions.reduce(function(a, x){ return a + x.marks; }, 0);
    EXAM_PAPERS[key] = { key: key, title: title, subtitle: subtitle + " · " + total + " marks", classes: ["11BR"], totalMarks: total, strictMarks: true, questions: questions };
    choices.push({ key: key, label: "Topic " + topicNo + ": " + title.replace(/^Topic \d+: /, "") });
  }
  function register(){
    choices.sort(function(a, b){ return parseInt(a.label.slice(6), 10) - parseInt(b.label.slice(6), 10); });
    EXAM_PAPER_CHOICES_BY_CLASS.push({ test: /^11br/i, choices: choices });
  }
  return { k: k, near: near, any: any, n: n, q: q, paper: paper, register: register };
})();
