/* Parent report builder (admin dashboard). ParentReport.build(data) returns a DOM element ready to show / print.
   data = { name, className, syllabus, date,
            ilearn:{ done,total,mastery,lastActive, topics:[{num,name,done,total,mastery,pp,test,score}] },
            isolve:{ papers:[{title,earned,total,pct,date}], notTried:[title], available },
            quizzes:[{label,pct}], objectives:[{label,group,pct}] } */
(function(root){
  "use strict";
  function rating(p){ return p == null ? "" : p >= 90 ? "Excellent" : p >= 80 ? "Secure" : p >= 70 ? "Improving" : p >= 50 ? "Developing" : "Struggling"; }
  var COL = { Excellent:"#0f766e", Secure:"#16a34a", Improving:"#0ea5e9", Developing:"#f59e0b", Struggling:"#dc2626" };
  function mk(tag, cls, text){ var e = document.createElement(tag); if(cls) e.className = cls; if(text != null) e.textContent = text; return e; }
  function avg(a){ a = a.filter(function(x){ return x != null; }); return a.length ? Math.round(a.reduce(function(s, x){ return s + x; }, 0) / a.length) : null; }
  function chip(p){ var r = rating(p); var c = mk("span", "pr-chip", r || "Not yet assessed"); c.style.background = r ? COL[r] : "#94a3b8"; return c; }
  function bar(p, neutral){ var b = mk("span", "pr-bar"), i = document.createElement("i"); i.style.width = (p || 0) + "%"; i.style.background = neutral ? "#2563eb" : (COL[rating(p)] || "#94a3b8"); b.appendChild(i); return b; }
  function h(t){ return mk("h3", "pr-h", t); }
  function table(heads, rows){
    var t = mk("table", "pr-table"), th = mk("thead"), tr = mk("tr");
    heads.forEach(function(x){ tr.appendChild(mk("th", null, x)); }); th.appendChild(tr); t.appendChild(th);
    var tb = mk("tbody"); rows.forEach(function(r){ var row = mk("tr"); r.forEach(function(c){ var td = mk("td"); if(c && c.nodeType) td.appendChild(c); else td.textContent = c == null ? "" : String(c); row.appendChild(td); }); tb.appendChild(row); });
    t.appendChild(tb); return t;
  }
  function pctTxt(p){ return p == null ? "-" : Math.round(p) + "%"; }
  function list(items, empty){ var ul = mk("ul", "pr-list"); if(!items.length){ ul.appendChild(mk("li", null, empty)); } items.forEach(function(t){ ul.appendChild(mk("li", null, t)); }); return ul; }

  function analyse(d){
    var il = d.ilearn || { topics: [] }, so = d.isolve || { papers: [] };
    var topics = il.topics || [];
    var isoAvg = so.papers.length ? avg(so.papers.map(function(p){ return p.pct; })) : null;
    var ilPct = il.mastery;
    var overall = avg([ilPct, isoAvg]);
    var objs = (d.objectives || []).filter(function(o){ return o.pct != null; });
    var strong = objs.filter(function(o){ return o.pct >= 80; }).sort(function(a, b){ return b.pct - a.pct; });
    var weak = objs.filter(function(o){ return o.pct < 70; }).sort(function(a, b){ return a.pct - b.pct; });
    var tStrong = topics.filter(function(t){ return t.score != null && t.score >= 80; }), tWeak = topics.filter(function(t){ return t.score != null && t.score < 70; }).sort(function(a, b){ return a.score - b.score; });
    var covered = il.total ? Math.round(100 * il.done / il.total) : 0;
    var pap = so.papers.slice().sort(function(a, b){ return a.pct - b.pct; });
    return { ilPct: ilPct, isoAvg: isoAvg, overall: overall, strong: strong, weak: weak, tStrong: tStrong, tWeak: tWeak, covered: covered, papWeak: pap.filter(function(p){ return p.pct < 70; }), papStrong: pap.filter(function(p){ return p.pct >= 80; }).reverse() };
  }

  function advice(d, a){
    var out = [], first = (d.name || "Your child").split(/\s+/)[0], il = d.ilearn || {}, so = d.isolve || { papers: [] };
    if(a.overall == null) out.push(first + " has not completed enough work yet for a rating. A short, regular routine (20-30 minutes, 4-5 days a week) in iLearn is the best way to start.");
    else if(a.overall >= 80) out.push("Excellent work. To keep progressing, " + first + " should attempt iSolve papers under timed conditions and aim to write complete answers that match the marks available.");
    else if(a.overall >= 50) out.push(first + " is making steady progress. The biggest gains will come from restudying the topics listed above and re-attempting the questions that lost marks.");
    else out.push(first + " needs extra support. Please agree a fixed weekly study time and ask " + first + " to start with the weakest topics, working through each lesson slowly before the practice question.");
    if(a.covered < 40) out.push("Only " + a.covered + "% of the iLearn lessons are complete. Completing the remaining lessons before the exam will give far better coverage of the syllabus.");
    if(!so.papers.length) out.push(first + " has not yet tried any iSolve exam-style practice. These real-style questions train the skill of answering in the way examiners expect, so they are an important next step.");
    else if(a.isoAvg != null && a.isoAvg < 50) out.push("iSolve results are below 50%. Encourage " + first + " to read how many marks each question carries and to give that many distinct, specific points, using the key words from the lesson.");
    if(a.ilPct != null && a.isoAvg != null && a.ilPct - a.isoAvg >= 20) out.push("Lessons are going better than exam-style questions. More iSolve practice, and checking answers against the mark scheme, will close this gap.");
    if(a.isoAvg != null && a.ilPct != null && a.isoAvg - a.ilPct >= 20) out.push("Exam-style answers are stronger than lesson results; reviewing the lessons that were not mastered first time will secure the underlying knowledge.");
    if(il.lastActive){ var days = Math.floor((Date.now() - il.lastActive) / 86400000); if(days >= 14) out.push("The last iLearn activity was " + days + " days ago. A regular routine matters more than long occasional sessions, so please check what is getting in the way."); }
    out.push("Useful habits: write pseudocode and trace tables by hand, learn the key terms in the glossary, and re-do any question that lost marks a few days later to check it has stuck.");
    return out;
  }

  function build(d){
    var a = analyse(d), root_ = mk("div", "pr-doc"), il = d.ilearn || { topics: [] }, so = d.isolve || { papers: [] };
    var head = mk("div", "pr-head");
    var lt = mk("div"); lt.appendChild(mk("div", "pr-brand", "iLearnCS")); lt.appendChild(mk("h2", "pr-title", "Student progress report")); head.appendChild(lt);
    var rt = mk("div", "pr-meta"); rt.appendChild(mk("div", "pr-name", d.name)); rt.appendChild(mk("div", null, d.className + " · " + d.syllabus)); rt.appendChild(mk("div", null, "Report date: " + d.date)); head.appendChild(rt);
    root_.appendChild(head);

    var tiles = mk("div", "pr-tiles");
    function tile(label, val, sub, p){ var t = mk("div", "pr-tile"); t.appendChild(mk("div", "pr-tl", label)); t.appendChild(mk("div", "pr-tv", val)); if(p !== undefined && p !== null){ t.appendChild(bar(p)); } if(sub) t.appendChild(mk("div", "pr-ts", sub)); return t; }
    var ov = tile("Overall performance", pctTxt(a.overall), rating(a.overall) || "Not yet rated", a.overall); ov.querySelector(".pr-ts").style.color = COL[rating(a.overall)] || "#64748b"; ov.querySelector(".pr-ts").style.fontWeight = "700";
    tiles.appendChild(ov);
    tiles.appendChild(tile("iLearn (lessons)", pctTxt(a.ilPct), il.done + " of " + il.total + " lessons done (" + a.covered + "% of syllabus)", a.ilPct));
    tiles.appendChild(tile("iSolve (exam practice)", pctTxt(a.isoAvg), so.papers.length + " of " + (so.available || so.papers.length) + " topics/exams completed", a.isoAvg));
    root_.appendChild(tiles);
    root_.appendChild(mk("p", "pr-note", "Ratings: Struggling under 50% · Developing 50-69% · Improving 70-79% · Secure 80-89% · Excellent 90-100%. Overall = average of iLearn and iSolve."));

    var s1 = mk("section", "pr-sec"); s1.appendChild(h("1. iLearn learning journey - topics"));
    var done = il.topics.filter(function(t){ return t.total && t.done === t.total; });
    s1.appendChild(mk("p", null, done.length ? "Completed topics (" + done.length + " of " + il.topics.length + "): " + done.map(function(t){ return t.name; }).join("; ") + "." : "No topic has been fully completed yet."));
    s1.appendChild(table(["Topic", "Lessons done", "Progress", "Mastered first time", "Past-paper marks", "Topic test", "Status"], il.topics.map(function(t){
      var st = t.done === 0 ? "Not started" : t.done === t.total ? "Completed" : "In progress";
      return [t.num + ". " + t.name, t.done + " / " + t.total, bar(t.total ? Math.round(100 * t.done / t.total) : 0, true), pctTxt(t.mastery), pctTxt(t.pp), pctTxt(t.test), st];
    })));
    root_.appendChild(s1);

    var s2 = mk("section", "pr-sec"); s2.appendChild(h("2. iSolve - exam-style practice topics and exams"));
    if(so.papers.length){ s2.appendChild(table(["Topic / exam", "Marks", "Score", "Rating", "Date"], so.papers.map(function(p){ return [p.title, p.earned + " / " + p.total, pctTxt(p.pct), chip(p.pct), p.date || ""]; }))); }
    else s2.appendChild(mk("p", null, "No iSolve topic or exam has been completed yet."));
    if(so.notTried && so.notTried.length) s2.appendChild(mk("p", "pr-note", "Not attempted yet (" + so.notTried.length + "): " + so.notTried.join("; ") + "."));
    if(d.quizzes && d.quizzes.length){ s2.appendChild(mk("p", "pr-sub", "Practice quizzes (best result)")); s2.appendChild(table(["Quiz", "Best score", "Rating"], d.quizzes.map(function(q){ return [q.label, pctTxt(q.pct), chip(q.pct)]; }))); }
    root_.appendChild(s2);

    var s3 = mk("section", "pr-sec"); s3.appendChild(h("3. Performance against the syllabus objectives"));
    var objs = (d.objectives || []);
    if(objs.length){
      s3.appendChild(mk("p", "pr-note", "Each line is a syllabus objective area. The percentage combines the student's lesson results, past-paper marks and quiz/exam results for that area."));
      s3.appendChild(table(["Syllabus area", "Performance", "", "Rating"], objs.map(function(o){ return [(o.group ? o.group + " - " : "") + o.label, pctTxt(o.pct), o.pct == null ? "" : bar(o.pct), o.pct == null ? "Not yet assessed" : chip(o.pct)]; })));
    } else s3.appendChild(mk("p", null, "Not enough results yet to measure performance against the syllabus objectives."));
    root_.appendChild(s3);

    var s4 = mk("section", "pr-sec"); s4.appendChild(h("4. Strong points"));
    var sp = []; a.tStrong.forEach(function(t){ sp.push("Topic " + t.num + " " + t.name + " (" + t.score + "%)"); }); a.strong.slice(0, 8).forEach(function(o){ sp.push((o.group ? o.group + " - " : "") + o.label + " (" + Math.round(o.pct) + "%)"); }); a.papStrong.slice(0, 4).forEach(function(p){ sp.push("iSolve: " + p.title + " (" + p.pct + "%)"); });
    s4.appendChild(list(sp, "Strong points will appear here as results build up."));
    root_.appendChild(s4);

    var s5 = mk("section", "pr-sec"); s5.appendChild(h("5. Topics to restudy"));
    var wk = []; a.tWeak.forEach(function(t){ wk.push("Topic " + t.num + " " + t.name + " (" + t.score + "%): redo the lessons not mastered first time, then re-attempt the past-paper question."); });
    a.weak.slice(0, 8).forEach(function(o){ wk.push((o.group ? o.group + " - " : "") + o.label + " (" + Math.round(o.pct) + "%)"); }); a.papWeak.slice(0, 4).forEach(function(p){ wk.push("iSolve: " + p.title + " (" + p.pct + "%): review the mark scheme and retry."); });
    var ns = il.topics.filter(function(t){ return t.done === 0; }); if(ns.length) wk.push("Not started yet: " + ns.map(function(t){ return t.num + ". " + t.name; }).join("; ") + ".");
    s5.appendChild(list(wk, "No weak areas identified so far."));
    root_.appendChild(s5);

    var s6 = mk("section", "pr-sec"); s6.appendChild(h("6. Advice for the coming weeks")); s6.appendChild(list(advice(d, a), ""));
    root_.appendChild(s6);

    var s7 = mk("section", "pr-sec"); s7.appendChild(h("7. Teacher's comment"));
    var tc = mk("div", "pr-comment"); tc.contentEditable = "true"; tc.setAttribute("data-ph", "Click here to type a personal comment for the parents (it prints with the report)."); s7.appendChild(tc);
    root_.appendChild(s7);
    root_.appendChild(mk("p", "pr-foot", "Generated by iLearnCS on " + d.date + ". Percentages are based on the student's best results recorded on the platform."));
    root_.__analysis = a; root_.__advice = advice(d, a);
    return root_;
  }

  function text(d){
    var a = analyse(d), L = [];
    L.push("Student progress report - " + d.name + " (" + d.className + ")", d.syllabus + " - " + d.date, "");
    L.push("Overall: " + pctTxt(a.overall) + " " + (rating(a.overall) || ""), "iLearn: " + pctTxt(a.ilPct) + " (" + d.ilearn.done + "/" + d.ilearn.total + " lessons)", "iSolve: " + pctTxt(a.isoAvg) + " (" + d.isolve.papers.length + " completed)", "");
    if(a.tWeak.length || a.weak.length){ L.push("To restudy:"); a.tWeak.forEach(function(t){ L.push("- Topic " + t.num + " " + t.name + " (" + t.score + "%)"); }); a.weak.slice(0, 5).forEach(function(o){ L.push("- " + o.label + " (" + Math.round(o.pct) + "%)"); }); L.push(""); }
    if(a.tStrong.length){ L.push("Strong:"); a.tStrong.forEach(function(t){ L.push("- Topic " + t.num + " " + t.name + " (" + t.score + "%)"); }); L.push(""); }
    L.push("Advice:"); advice(d, a).forEach(function(x){ L.push("- " + x); });
    return L.join("\n");
  }

  var CSS = ".pr-doc{font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;background:#fff;max-width:860px;margin:0 auto;padding:22px 26px;border:1px solid #e2e8f0;border-radius:14px;font-size:13.5px;line-height:1.45}" +
    ".pr-head{display:flex;justify-content:space-between;gap:16px;border-bottom:3px solid #2563eb;padding-bottom:10px;margin-bottom:14px}.pr-brand{font-weight:800;color:#2563eb;font-size:15px}.pr-title{margin:2px 0 0;font-size:22px}.pr-meta{text-align:right;color:#475569}.pr-name{font-size:18px;font-weight:800;color:#0f172a}" +
    ".pr-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:8px 0}.pr-tile{border:1px solid #e2e8f0;border-radius:12px;padding:10px 12px;background:#f8fafc}.pr-tl{font-size:12px;color:#64748b;font-weight:700}.pr-tv{font-size:28px;font-weight:800;line-height:1.1}.pr-ts{font-size:11.5px;color:#64748b;margin-top:3px}" +
    ".pr-note{font-size:11.5px;color:#64748b;margin:6px 0}.pr-sub{font-weight:700;margin:10px 0 4px}.pr-h{margin:0 0 6px;font-size:15px;color:#1e3a8a}.pr-sec{margin-top:16px;break-inside:avoid-page}" +
    ".pr-table{width:100%;border-collapse:collapse;font-size:12.5px}.pr-table th{text-align:left;background:#eff6ff;color:#1e3a8a;padding:5px 7px;border-bottom:1px solid #cbd5e1}.pr-table td{padding:5px 7px;border-bottom:1px solid #e2e8f0;vertical-align:middle}.pr-table tr{break-inside:avoid}" +
    ".pr-bar{display:inline-block;width:90px;height:8px;border-radius:6px;background:#e2e8f0;vertical-align:middle;overflow:hidden}.pr-tile .pr-bar{width:100%;margin-top:6px;display:block}.pr-bar i{display:block;height:100%}" +
    ".pr-chip{display:inline-block;padding:1px 9px;border-radius:999px;font-size:11.5px;font-weight:700;color:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}.pr-list{margin:4px 0 0;padding-left:20px}.pr-list li{margin:3px 0}" +
    ".pr-comment{min-height:70px;border:1px dashed #94a3b8;border-radius:10px;padding:8px 10px;white-space:pre-wrap}.pr-comment:empty:before{content:attr(data-ph);color:#94a3b8}.pr-foot{margin-top:14px;font-size:11px;color:#94a3b8;text-align:center}" +
    "@media print{.pr-doc{border:0;padding:0;max-width:none}.pr-comment{border:0}.pr-comment:empty{display:none}.pr-bar,.pr-bar i{-webkit-print-color-adjust:exact;print-color-adjust:exact}}" +
    "@media(max-width:640px){.pr-tiles{grid-template-columns:1fr}.pr-head{flex-direction:column}.pr-meta{text-align:left}}";
  var st = document.createElement("style"); st.textContent = CSS; document.head.appendChild(st);
  root.ParentReport = { build: build, text: text, analyse: analyse, rating: rating };
})(window);
