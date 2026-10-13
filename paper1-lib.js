/* Paper 1 mock exam: picks questions from the topic 1-6 exam banks, lays them out like a
   Cambridge IGCSE 0478 Paper 1 (75 marks) and builds an Answer / Marks / Guidance mark scheme. */
(function(root){
  "use strict";

  var TOPICS = [
    ["datarep_exam",   "Data representation",                 14],
    ["datatrans_exam", "Data transmission",                   11],
    ["hardware_exam",  "Hardware",                            14],
    ["software_exam",  "Software",                            13],
    ["internet_exam",  "The internet and its uses",           12],
    ["automated_exam", "Automated and emerging technologies", 11]
  ];
  var TOTAL = TOPICS.reduce(function(n, t){ return n + t[2]; }, 0);   // 75

  function esc(x){ return String(x == null ? "" : x).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function rng(seed){ var a = seed >>> 0; return function(){ a = (a + 0x6D2B79F5) >>> 0; var t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  function hash(s){ var h = 2166136261; for(var i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function shuffled(a, r){ r = r || Math.random; a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(r() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- choosing the questions ---------- */
  // Exactly `target` marks from one paper's bank, unseen questions first, one question per sub-topic where possible.
  function pickTopic(key, qs, target, seen){
    var items = qs.map(function(q){ return { id: key + ":" + q.id, q: q, unseen: seen.indexOf(key + ":" + q.id) === -1 }; });
    for(var attempt = 0; attempt < 400; attempt++){
      var order = shuffled(items.filter(function(i){ return i.unseen; })).concat(shuffled(items.filter(function(i){ return !i.unseen; })));
      var strict = attempt < 300, left = target, chosen = [], used = {};
      for(var k = 0; k < order.length && left > 0; k++){
        var it = order[k];
        if(it.q.marks > left) continue;
        if(strict && used[it.q.topic]) continue;
        chosen.push(it); used[it.q.topic] = 1; left -= it.q.marks;
      }
      if(left === 0) return chosen;
    }
    // fallback: exact subset by dynamic programming
    var best = {0: []};
    shuffled(items).forEach(function(it){
      Object.keys(best).map(Number).sort(function(a, b){ return b - a; }).forEach(function(s){
        var n = s + it.q.marks; if(n <= target && !best[n]) best[n] = best[s].concat([it]);
      });
    });
    return best[target] || [];
  }
  function compose(papers, seen){
    seen = seen || [];
    var ids = [];
    TOPICS.forEach(function(t){
      pickTopic(t[0], papers[t[0]].questions, t[2], seen).forEach(function(i){ ids.push(i.id); });
    });
    return { ids: ids };
  }

  /* ---------- laying out the paper ---------- */
  function cleanPrompt(p){ return String(p).replace(/\s*\[(\d+) marks?\]/g, " [$1]"); }
  function hasInnerParts(q){ return /(^|\n)\s*\([a-d]\)/.test(q.prompt) || /\[\d+ marks?\]/.test(q.prompt); }
  // Rebuilds the same paper from the same ids every time (so a refresh does not change it).
  function build(papers, ids){
    var byTopic = TOPICS.map(function(t){ return { key: t[0], name: t[1], list: [] }; });
    ids.forEach(function(id){
      var key = id.split(":")[0], qid = id.slice(key.length + 1), g = byTopic.filter(function(x){ return x.key === key; })[0];
      var q = papers[key].questions.filter(function(x){ return x.id === qid; })[0];
      if(g && q) g.list.push({ id: id, q: q });
    });
    var r = rng(hash(ids.join("|")));
    var blocks = [];
    byTopic.forEach(function(g){
      var simple = [], i;
      g.list.forEach(function(it){ if(hasInnerParts(it.q)) blocks.push({ group: g.name, topicKey: g.key, items: [it] }); else simple.push(it); });
      simple = shuffled(simple, r);
      var chunks = Math.ceil(simple.length / 5), sz;
      while(simple.length){
        sz = Math.ceil(simple.length / chunks); chunks--;
        blocks.push({ group: g.name, topicKey: g.key, items: simple.splice(0, sz) });
      }
    });
    blocks = shuffled(blocks, r);
    var first = blocks.map(function(b){ return b.topicKey; }).indexOf("datarep_exam");
    if(first > 0){ var b0 = blocks.splice(first, 1)[0]; blocks.unshift(b0); }
    var parts = [], questions = [];
    blocks.forEach(function(b, bi){
      var n = bi + 1, q = { n: n, group: b.group, parts: [] };
      b.items.forEach(function(it, pi){
        var letter = b.items.length > 1 ? "abcdef".charAt(pi) : "";
        var part = { key: n + (letter ? "(" + letter + ")" : ""), n: n, letter: letter, label: letter ? "(" + letter + ")" : "", id: it.id, q: it.q, group: b.group, marks: it.q.marks, prompt: cleanPrompt(it.q.prompt) };
        part.showMarks = !/\[\d+\]/.test(part.prompt);
        q.parts.push(part); parts.push(part);
      });
      questions.push(q);
    });
    return { questions: questions, parts: parts, max: parts.reduce(function(s, p){ return s + p.marks; }, 0) };
  }

  var INSTR = ["Answer <b>all</b> questions.", "Write your answer to each question in the space provided.", "Write in a clear and readable way: use the key terms you have learned.", "Calculators must <b>not</b> be used in this paper."];
  var INFO = ["The total mark for this paper is {max}.", "The number of marks for each question or part question is shown in brackets [ ].", "No marks will be awarded for using brand names of software packages or hardware."];

  function paperHtml(paper, user, answers, asText){
    var h = '<div class="pp-sheet pp-cover"><div class="pp-brand">iLearnCS practice paper · styled on the Cambridge IGCSE 0478 Paper 1 layout (not an official paper)</div>' +
      "<h1>IGCSE Computer Science</h1>" +
      '<table><tr><td style="width:150px">CANDIDATE NAME</td><td colspan="3"><div class="box">' + esc(user && user.name || "") + "</div></td></tr>" +
      "<tr><td>CLASS</td><td><div class='box'>" + esc(user && user.class || "") + "</div></td><td style='text-align:right'>DATE</td><td style='width:140px'><div class='box'>" + esc(new Date().toLocaleDateString()) + "</div></td></tr></table>" +
      '<hr class="pp-rule"><table><tr><td><b>COMPUTER SCIENCE</b><br>Paper 1 Computer Systems</td><td style="text-align:right"><b>Practice paper</b><br>1 hour 45 minutes</td></tr></table>' +
      '<p style="font-size:14px">You must answer on the question paper.<br>No additional materials are needed.</p><hr class="pp-rule">' +
      "<h3>INSTRUCTIONS</h3><ul>" + INSTR.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>" +
      "<h3>INFORMATION</h3><ul>" + INFO.map(function(x){ return "<li>" + x.replace("{max}", paper.max) + "</li>"; }).join("") + "</ul></div>";
    paper.questions.forEach(function(q){
      h += '<div class="pp-sheet pp-q" data-q="' + q.n + '"><div class="pp-qhead"><span class="n">' + q.n + "</span><span>" + esc(q.group) + "</span></div>";
      q.parts.forEach(function(p){
        var rows = p.marks >= 4 ? 7 : p.marks === 3 ? 5 : p.marks === 2 ? 3 : 2;
        var ans = (answers && answers[p.key]) || "";
        h += '<div class="pp-part" data-part="' + esc(p.key) + '"><div class="pp-row"><span class="l">' + esc(p.label) + '</span><span class="t">' + esc(p.prompt) + "</span>" + (p.showMarks ? '<span class="m">[' + p.marks + "]</span>" : "") + "</div>" +
          (asText ? '<div class="pp-ans" style="white-space:pre-wrap;min-height:' + rows * 26 + 'px">' + esc(ans) + "</div>"
                  : '<textarea class="pp-ans" data-k="' + esc(p.key) + '" rows="' + rows + '" aria-label="Answer to ' + esc(p.key) + '">' + esc(ans) + "</textarea>") + "</div>";
      });
      h += "</div>";
    });
    return h;
  }

  /* ---------- marking ---------- */
  function normalize(s){ return (s || "").toLowerCase(); }
  function tight(s){ return normalize(s).replace(/[\s,]+/g, ""); }
  function numericMatch(text, values){
    var t = tight(text);
    for(var i = 0; i < values.length; i++){
      var v = tight(values[i]); if(!v) continue;
      if(/^-?\d+(\.\d+)?$/.test(v)){ if(new RegExp("(^|[^0-9.])" + v.replace(/\./g, "\\.") + "($|[^0-9])").test(t)) return true; }
      else if(t.indexOf(v) !== -1) return true;
    }
    return false;
  }
  function grade(text, mp){
    if(!text || !text.trim()) return 0;
    var m = mp.match;
    if(m.type === "numeric") return numericMatch(text, m.values) ? mp.marks : 0;
    if(m.type === "rle") return m.tokens.every(function(tok){ return tight(text).indexOf(tight(tok)) !== -1; }) ? mp.marks : 0;
    if(m.type === "keywords"){
      var n = m.groups.filter(function(g){ return g.some(function(kw){ return normalize(text).indexOf(normalize(kw)) !== -1; }); }).length;
      if(m.marksPerGroup) return Math.min(n, m.needCount) * m.marksPerGroup;
      return n >= m.needCount ? mp.marks : 0;
    }
    return 0;
  }
  function guidance(mp){
    var m = mp.match;
    if(m.type === "numeric") return "Accept: " + m.values.map(esc).join(" // ") + ".<br>Ignore units.";
    if(m.type === "rle") return "The answer must show: " + m.tokens.map(esc).join(", ") + ".";
    var lead = m.marksPerGroup ? "One mark for each idea, up to " + m.needCount + ":" : (m.needCount > 1 ? "Award the mark for " + m.needCount + " of these ideas:" : "Award the mark for any of:");
    return lead + "<ul>" + m.groups.map(function(g){ return "<li>" + g.map(esc).join(" / ") + "</li>"; }).join("") + "</ul>";
  }
  function markSchemeHtml(paper, answers){
    var h = '<table class="pp-ms"><tr><th>Question</th><th>Answer</th><th>Marks</th><th>Guidance</th><th class="no-print">Your marks</th></tr>';
    paper.parts.forEach(function(p){
      var ans = (answers && answers[p.key]) || "";
      h += '<tr class="yours no-print"><td class="q">' + esc(p.key) + '</td><td colspan="4"><b>Your answer:</b> ' + (ans.trim() ? esc(ans).replace(/\n/g, "<br>") : "<i>(left blank)</i>") + "</td></tr>";
      p.q.markPoints.forEach(function(mp, i){
        var got = grade(ans, mp), ctl;
        if(mp.marks === 1) ctl = '<input type="checkbox" data-mp="' + esc(p.key) + "#" + i + '" data-max="1" data-topic="' + esc(p.group) + '"' + (got >= 1 ? " checked" : "") + ' aria-label="Mark awarded for ' + esc(p.key) + ' point ' + (i + 1) + '">';
        else { ctl = '<select data-mp="' + esc(p.key) + "#" + i + '" data-max="' + mp.marks + '" data-topic="' + esc(p.group) + '" aria-label="Marks awarded for ' + esc(p.key) + " point " + (i + 1) + '">'; for(var v = 0; v <= mp.marks; v++) ctl += '<option value="' + v + '"' + (v === got ? " selected" : "") + ">" + v + " / " + mp.marks + "</option>"; ctl += "</select>"; }
        h += "<tr>" + (i === 0 ? '<td class="q" rowspan="' + (p.q.markPoints.length + 1) + '">' + esc(p.key) + "</td>" : "") + "<td>" + esc(mp.text).replace(/\n/g, "<br>") + '</td><td class="mk">' + mp.marks + '</td><td class="g">' + guidance(mp) + '</td><td class="you no-print">' + ctl + "</td></tr>";
      });
      h += '<tr><td colspan="4" class="g"><i>Examiner note: ' + esc(p.q.explanation || "") + "</i></td></tr>";
    });
    return h + "</table>";
  }

  function band(pc){
    return pc >= 80 ? "Excellent. You are exam-ready on the Paper 1 topics." : pc >= 65 ? "Good. A few topics to polish." : pc >= 50 ? "Getting there. Revise the weaker topics first." : "Keep going. Revisit the lessons marked for review, then try again.";
  }
  function topicTable(byTopic){
    var rows = TOPICS.map(function(t){ var x = byTopic[t[1]]; return x ? { name: t[1], got: x.got, max: x.max } : null; }).filter(Boolean);
    var weakest = rows.slice().sort(function(a, b){ return a.got / a.max - b.got / b.max; })[0];
    var h = '<table class="pp-topic"><tr><th>Topic</th><th>Marks</th><th></th></tr>';
    rows.forEach(function(r){
      var pc = Math.round(100 * r.got / r.max);
      h += "<tr><td>" + esc(r.name) + (weakest && weakest.name === r.name && pc < 80 ? ' <b style="color:var(--incorrect)">· revise first</b>' : "") + "</td><td>" + r.got + " / " + r.max + ' (' + pc + '%)</td><td><div class="bar"><i style="width:' + pc + '%"></i></div></td></tr>';
    });
    return h + "</table>";
  }
  function mergeHist(a, b){
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function(x){ if(x && x.at && !seen[x.at]){ seen[x.at] = 1; out.push(x); } });
    return out.sort(function(x, y){ return x.at - y.at; }).slice(-30);
  }

  root.Paper1Lib = { TOPICS: TOPICS, TOTAL: TOTAL, esc: esc, compose: compose, build: build, paperHtml: paperHtml, markSchemeHtml: markSchemeHtml, grade: grade, band: band, topicTable: topicTable, mergeHist: mergeHist };
})(typeof window !== "undefined" ? window : this);
