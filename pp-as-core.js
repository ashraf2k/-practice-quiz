/* 11BR (AS Level) past-paper helpers: Cambridge International AS & A Level Computer Science 9618 Paper 1 Theory Fundamentals (variants 12 and 13),
   May/June 2023 to May/June 2026. One set per iLearn objective (e.g. "1.1.1"): key pp11_1_1_1. Uses the helpers of pp-0478.js and the layout of pp-ui.js. */
(function(){
  var P = window.PPD, SER = { j: "May/June", n: "October/November" };
  function ctx(series, variant){   // ctx("j2024", 13)
    var s = SER[series.charAt(0)] + " " + series.slice(1), v = "9618/" + variant;
    return P.ctx("Cambridge International AS & A Level Computer Science " + v + " · Paper 1 Theory Fundamentals · " + s,
      "Cambridge International AS & A Level Computer Science " + v + " Mark Scheme, " + s + " (Cambridge University Press & Assessment)");
  }
  function paper(code, name, qs){
    var key = "pp11_" + code.replace(/\./g, "_"), total = qs.reduce(function(a, q){ return a + q.marks; }, 0);
    if(EXAM_PAPERS[key]) return;
    EXAM_PAPERS[key] = { key: key, code: code, title: code + " " + name + " — Past-paper question", subtitle: "Cambridge 9618 Paper 1 past paper · " + total + " marks · mark your own answer with the published mark scheme",
      classes: ["11BR"], totalMarks: total, questions: qs };
    var e = EXAM_PAPER_CHOICES_BY_CLASS.filter(function(x){ return x.test.test("11BR"); })[0], c = { key: key, label: code + " " + name + " — past-paper question" };
    if(e){ if(!e.choices.some(function(x){ return x.key === key; })) e.choices.push(c); }
    else EXAM_PAPER_CHOICES_BY_CLASS.push({ test: /^11br/i, choices: [c] });
  }
  window.PPAS = { ctx: ctx, paper: paper, Q: P.Q, kw: P.kw, val: P.val,
    re: function(s){ return "re:" + s; },
    // fixed-answer part: one value / any of several accepted values
    v: function(text, part, values, marks){ var o = P.val(text, part, values); if(marks) o.marks = marks; return o; } };
})();
