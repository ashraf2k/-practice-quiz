/* Paper 2 mock exam engine: lays a paper out like a Cambridge IGCSE 0478 Paper 2 question paper, marks the
   parts that can be marked automatically, and builds an Answer / Marks / Guidance mark scheme the student
   uses to confirm every mark. Works with paper2-data.js (the papers) and paper2-draw.js (diagrams). */
(function(root){
  "use strict";

  var TOPIC_NAMES = { "7": "Topic 7 · Algorithm design and problem-solving", "8": "Topic 8 · Programming", "9": "Topic 9 · Databases", "10": "Topic 10 · Boolean logic" };
  var TOPIC_ORDER = ["7", "8", "9", "10"];

  function esc(x){ return String(x == null ? "" : x).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function norm(s){ return String(s == null ? "" : s).toLowerCase(); }
  function tight(s){ return norm(s).replace(/\s+/g, "").replace(/[“”]/g, '"').replace(/[‘’]/g, "'"); }

  /* ---------- the paper ---------- */
  function get(id){ var p = root.PAPER2 && root.PAPER2[id]; if(!p) return null; return decorate(p); }
  function list(){ return Object.keys(root.PAPER2 || {}).map(function(k){ return root.PAPER2[k]; }); }
  function decorate(p){
    if(p._d) return p;
    var parts = [], max = 0;
    p.questions.forEach(function(q){ q.parts.forEach(function(pt){ pt.q = q; parts.push(pt); max += pt.marks; }); });
    p.parts = parts; p.max = max; p._d = true;
    return p;
  }

  /* ---------- answering state ---------- */
  function emptyAnswer(pt){
    if(pt.type === "choice" || pt.type === "fields") return pt.items.map(function(){ return ""; });
    if(pt.type === "fill") return pt.gaps.map(function(){ return ""; });
    if(pt.type === "table") return pt.rows.map(function(r){ return r.map(function(){ return ""; }); });
    if(pt.type === "draw") return { ops: [] };
    return "";
  }
  function isAnswered(pt, a){
    if(a == null) return false;
    if(pt.type === "draw") return !!(a.ops && a.ops.length);
    if(pt.type === "table") return a.some(function(r){ return r.some(function(c){ return String(c).trim(); }); });
    if(Array.isArray(a)) return a.some(function(c){ return String(c).trim(); });
    return String(a).trim() !== "";
  }

  /* ---------- laying out the question paper ---------- */
  function codeHtml(code, pt, answers, asText){
    var h = esc(code);
    if(pt && pt.type === "fill"){
      var sel = (answers && answers[pt.key]) || [];
      h = h.replace(/\{(\d+)\}/g, function(m, n){
        var i = Number(n) - 1, g = pt.gaps[i], cur = sel[i] || "";
        if(asText) return '<span class="p2-gapv">' + (cur ? esc(cur) : "…………") + "</span>";
        return '<select class="p2-gap" data-k="' + esc(pt.key) + '" data-i="' + i + '" aria-label="Gap ' + n + '"><option value="">(choose)</option>' +
          g.options.map(function(o){ return '<option value="' + esc(o) + '"' + (o === cur ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>";
      });
    }
    return '<pre class="p2-code">' + h + "</pre>";
  }
  function partHtml(pt, answers, asText){
    var a = answers && answers[pt.key];
    var h = '<div class="pp-part p2-part" data-part="' + esc(pt.key) + '"><div class="pp-row"><span class="l">' + esc(pt.label) + '</span><span class="t">' + esc(pt.prompt) + '</span><span class="m">[' + pt.marks + "]</span></div>";
    if(pt.code && pt.type !== "fill") h += codeHtml(pt.code);
    if(pt.type === "fill") h += codeHtml(pt.code, pt, answers, asText);
    if(pt.type === "text" || pt.type === "code"){
      var rows = pt.tall ? 30 : pt.marks >= 4 ? 7 : pt.marks === 3 ? 5 : pt.marks === 2 ? 3 : 2;
      var cls = "pp-ans" + (pt.type === "code" ? " p2-mono" : "");
      if(asText) h += '<div class="' + cls + '" style="white-space:pre-wrap;min-height:' + rows * 26 + 'px">' + esc(a || "") + "</div>";
      else h += '<textarea class="' + cls + '" data-k="' + esc(pt.key) + '" rows="' + rows + '" spellcheck="false" aria-label="Answer to ' + esc(pt.key) + '">' + esc(a || "") + "</textarea>";
    } else if(pt.type === "choice"){
      h += '<div class="p2-items">';
      pt.items.forEach(function(it, i){
        var cur = (a && a[i]) || "";
        h += '<div class="p2-item"><span>' + esc(it.label) + "</span>" + (asText ? '<b class="p2-val">' + (cur ? esc(cur) : "…………") + "</b>" :
          '<select class="p2-sel" data-k="' + esc(pt.key) + '" data-i="' + i + '" aria-label="' + esc(it.label) + '"><option value="">(choose)</option>' + it.options.map(function(o){ return '<option value="' + esc(o) + '"' + (o === cur ? " selected" : "") + ">" + esc(o) + "</option>"; }).join("") + "</select>") + "</div>";
      });
      h += "</div>";
    } else if(pt.type === "fields"){
      h += '<div class="p2-items">';
      pt.items.forEach(function(it, i){
        var cur = (a && a[i]) || "";
        h += '<div class="p2-item"><span>' + esc(it.label) + "</span>" + (asText ? '<b class="p2-val">' + (cur ? esc(cur) : "…………") + "</b>" :
          '<input class="p2-fld" type="text" data-k="' + esc(pt.key) + '" data-i="' + i + '" value="' + esc(cur) + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="' + esc(it.label) + '">') + "</div>";
      });
      h += "</div>";
    } else if(pt.type === "table"){
      h += tableHtml(pt, a, asText);
    } else if(pt.type === "draw"){
      if(asText){
        var ops = a && a.ops;
        h += ops && ops.length && root.P2Draw ? '<img class="p2-drawimg" alt="Your drawing" src="' + root.P2Draw.toPng(ops) + '">' : '<div class="pp-ans" style="min-height:160px"></div>';
      } else h += '<div class="p2-drawbox" data-k="' + esc(pt.key) + '" data-kind="' + esc(pt.kind || "all") + '"></div>';
    }
    if(!asText && pt.type !== "draw") h += '<div class="p2-padrow no-print"><button type="button" class="p2-padbtn" data-k="' + esc(pt.key) + '">✏ Drawing / working area</button></div><div class="p2-padbox" data-k="' + esc(pt.key) + '"></div>';
    if(asText && answers && answers["pad:" + pt.key] && answers["pad:" + pt.key].ops && answers["pad:" + pt.key].ops.length && root.P2Draw) h += '<img class="p2-drawimg" alt="Your working" src="' + root.P2Draw.toPng(answers["pad:" + pt.key].ops) + '">';
    return h + "</div>";
  }
  function tableHtml(pt, a, asText, forMs){
    var h = '<div class="p2-tw"><table class="p2-grid"><thead><tr>' + pt.headers.map(function(c){ return "<th>" + esc(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
    pt.rows.forEach(function(r, ri){
      h += "<tr>" + r.map(function(c, ci){
        if(typeof c === "string") return "<td class='g'>" + esc(c) + "</td>";
        var cur = (a && a[ri] && a[ri][ci]) || "";
        if(forMs === "model") return "<td class='m'>" + esc(c.a || "") + "</td>";
        if(asText || forMs) return "<td>" + (cur ? esc(cur) : "") + "</td>";
        return '<td><input class="p2-cell" type="text" data-k="' + esc(pt.key) + '" data-r="' + ri + '" data-c="' + ci + '" value="' + esc(cur) + '" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Row ' + (ri + 1) + ", " + esc(pt.headers[ci]) + '"></td>';
      }).join("") + "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  var INSTR = ["Answer <b>all</b> questions.", "Answer in the spaces provided. Use the drawing pad for diagrams, and the optional working area whenever you want to sketch something.", "In pseudocode answers the logic matters more than exact syntax. Use the pseudocode style from the syllabus.", "Calculators must <b>not</b> be used in this paper."];
  var INFO = ["The total mark for this paper is {max}.", "The number of marks for each question or part question is shown in brackets [ ].", "The last question is a 15-mark scenario question. You should spend about 30 minutes on it. You may answer it in pseudocode, Python, Visual Basic or Java.", "No marks will be awarded for using brand names of software packages or hardware."];

  function paperHtml(paper, user, answers, asText){
    var h = '<div class="pp-sheet pp-cover"><div class="pp-brand">iLearnCS practice paper · styled on the Cambridge IGCSE 0478 Paper 2 layout (not an official paper)</div>' +
      "<h1>IGCSE Computer Science</h1>" +
      '<table><tr><td style="width:150px">CANDIDATE NAME</td><td colspan="3"><div class="box">' + esc(user && user.name || "") + "</div></td></tr>" +
      "<tr><td>CLASS</td><td><div class='box'>" + esc(user && user.class || "") + "</div></td><td style='text-align:right'>DATE</td><td style='width:140px'><div class='box'>" + esc(new Date().toLocaleDateString()) + "</div></td></tr></table>" +
      '<hr class="pp-rule"><table><tr><td><b>COMPUTER SCIENCE</b><br>Paper 2 Algorithms, Programming and Logic</td><td style="text-align:right"><b>Practice paper</b><br>1 hour 45 minutes</td></tr></table>' +
      '<p style="font-size:14px">You must answer on the question paper.<br>No additional materials are needed.</p><hr class="pp-rule">' +
      "<h3>INSTRUCTIONS</h3><ul>" + INSTR.map(function(x){ return "<li>" + x + "</li>"; }).join("") + "</ul>" +
      "<h3>INFORMATION</h3><ul>" + INFO.map(function(x){ return "<li>" + x.replace("{max}", paper.max) + "</li>"; }).join("") + "</ul></div>";
    paper.questions.forEach(function(q){
      h += '<div class="pp-sheet pp-q" data-q="' + q.n + '"><div class="pp-qhead"><span class="n">' + q.n + "</span><span class=\"t p2-intro\">" + esc(q.intro || "") + "</span></div>";
      if(q.code) h += '<div class="pp-part">' + codeHtml(q.code) + "</div>";
      if(q.figure) h += '<div class="pp-part p2-figure">' + q.figure + "</div>";
      q.parts.forEach(function(pt){
        if(pt.figure){ h += '<div class="pp-part p2-figure">' + pt.figure + "</div>"; }
        h += partHtml(pt, answers, asText);
      });
      h += "</div>";
    });
    return h;
  }

  /* ---------- marking ---------- */
  function numbersIn(text){ var out = [], m, re = /(^|[^0-9.])(\d+)(?![0-9.])/g; text = String(text || ""); while((m = re.exec(text))) out.push(parseInt(m[2], 10)); return out; }
  function gradeKw(text, mp){
    if(!text || !String(text).trim()) return 0;
    var m = mp.match;
    if(!m) return 0;
    if(m.type === "nums"){ var have = numbersIn(text); return m.values.every(function(v){ return have.indexOf(v) !== -1; }) ? mp.marks : 0; }
    if(m.type === "keywords"){
      var hay = m.tight ? tight(text) : norm(text);
      var n = m.groups.filter(function(g){ return g.some(function(k){ return hay.indexOf(m.tight ? tight(k) : norm(k)) !== -1; }); }).length;
      return n >= m.needCount ? mp.marks : 0;
    }
    return 0;
  }
  function sameVal(a, b){
    a = tight(a); b = tight(b);
    if(a === b) return true;
    if(/^-?\d+(\.\d+)?$/.test(a) && /^-?\d+(\.\d+)?$/.test(b)) return parseFloat(a) === parseFloat(b);
    return false;
  }
  function cellOk(c, v){
    v = String(v == null ? "" : v);
    if(typeof c === "string") return true;
    if(c.re && new RegExp(c.re, "i").test(v)) return true;
    if(sameVal(c.a || "", v)) return true;
    return (c.alt || []).some(function(x){ return sameVal(x, v); });
  }
  // The rows of the mark scheme for one part: [{text, marks, got, auto, guide}]
  function rowsFor(pt, a){
    var out = [];
    if(pt.type === "choice"){
      pt.items.forEach(function(it, i){ out.push({ text: it.label + ": " + it.answer, marks: 1, got: a && a[i] === it.answer ? 1 : 0, auto: true, guide: "Accept only the answer shown." }); });
    } else if(pt.type === "fields"){
      pt.items.forEach(function(it, i){ out.push({ text: it.label + ": " + it.answer, marks: it.marks || 1, got: a && a[i] && it.check(String(a[i])) ? (it.marks || 1) : 0, auto: true, guide: "" }); });
    } else if(pt.type === "fill"){
      pt.gaps.forEach(function(g, i){ out.push({ text: "Gap " + (i + 1) + ": " + g.answer, marks: 1, got: a && a[i] === g.answer ? 1 : 0, auto: true, guide: "" }); });
    } else if(pt.type === "table"){
      pt.groups.forEach(function(g){
        var ok = g.cells.every(function(rc){ var c = pt.rows[rc[0]][rc[1]]; return cellOk(c, a && a[rc[0]] && a[rc[0]][rc[1]]); });
        var any = g.cells.some(function(rc){ return a && a[rc[0]] && String(a[rc[0]][rc[1]] || "").trim(); });
        out.push({ text: g.text, marks: g.marks, got: ok && any ? g.marks : 0, auto: true, guide: "All the cells for this mark must be correct." });
      });
    } else {
      pt.markPoints.forEach(function(mp){
        var got = pt.type === "draw" ? 0 : gradeKw(a, mp);
        out.push({ text: mp.text, marks: mp.marks, got: got, auto: !!mp.match && pt.type !== "draw", guide: mp.match ? guidance(mp) : "Check your drawing against the model diagram.", topic: mp.topic });
      });
    }
    return out;
  }
  function guidance(mp){
    var m = mp.match;
    if(!m) return "";
    if(m.type === "nums") return "The answer must give line " + m.values.join(", ") + ".";
    var shown = m.groups.map(function(g){ return g.slice(0, 6); });
    return (m.needCount > 1 ? "Award the mark when all of these ideas are present:" : "Award the mark for any of:") + "<ul>" + shown.map(function(g){ return "<li>" + g.map(esc).join(" / ") + "</li>"; }).join("") + "</ul>";
  }

  /* ---------- mark scheme and results ---------- */
  function answerSummary(pt, a, img){
    if(pt.type === "draw"){
      var ops = a && a.ops, h = ops && ops.length && root.P2Draw ? '<img class="p2-drawimg" alt="Your drawing" src="' + root.P2Draw.toPng(ops) + '">' : "<i>(nothing drawn)</i>";
      return h;
    }
    if(!isAnswered(pt, a)) return "<i>(left blank)</i>";
    if(pt.type === "table") return tableHtml(pt, a, true, "you");
    if(pt.type === "choice" || pt.type === "fields") return pt.items.map(function(it, i){ return esc(it.label) + ": <b>" + esc((a && a[i]) || "–") + "</b>"; }).join("<br>");
    if(pt.type === "fill") return pt.gaps.map(function(g, i){ return "Gap " + (i + 1) + ": <b>" + esc((a && a[i]) || "–") + "</b>"; }).join("<br>");
    return esc(a).replace(/\n/g, "<br>");
  }
  function modelHtml(pt){
    if(pt.type === "draw") return pt.model;
    if(pt.type === "table") return tableHtml(pt, null, false, "model");
    if(pt.type === "code" && pt.model) return '<pre class="p2-code">' + esc(pt.model) + "</pre>";
    if(pt.type === "text" && pt.model) return esc(pt.model);
    return "";
  }
  function markSchemeHtml(paper, answers){
    var h = '<table class="pp-ms"><tr><th>Question</th><th>Answer</th><th>Marks</th><th>Guidance</th><th class="no-print">Your marks</th></tr>';
    paper.parts.forEach(function(pt){
      var a = answers && answers[pt.key];
      var rows = rowsFor(pt, a);
      h += '<tr class="yours no-print"><td class="q">' + esc(pt.key) + '</td><td colspan="4"><b>Your answer:</b><div class="p2-yours">' + answerSummary(pt, a) + "</div>" +
        (answers && answers["pad:" + pt.key] && answers["pad:" + pt.key].ops && answers["pad:" + pt.key].ops.length && root.P2Draw ? '<div class="p2-yours"><b>Your working:</b><br><img class="p2-drawimg" alt="Your working" src="' + root.P2Draw.toPng(answers["pad:" + pt.key].ops) + '"></div>' : "") + "</td></tr>";
      var model = modelHtml(pt);
      rows.forEach(function(r, i){
        var topic = TOPIC_NAMES[r.topic || pt.topic] || "";
        var ctl, key = pt.key + "#" + i;
        if(r.marks === 1) ctl = '<input type="checkbox" data-mp="' + esc(key) + '" data-max="1" data-topic="' + esc(r.topic || pt.topic) + '"' + (r.got >= 1 ? " checked" : "") + ' aria-label="Mark awarded for ' + esc(pt.key) + " point " + (i + 1) + '">';
        else { ctl = '<select data-mp="' + esc(key) + '" data-max="' + r.marks + '" data-topic="' + esc(r.topic || pt.topic) + '" aria-label="Marks for ' + esc(pt.key) + " point " + (i + 1) + '">'; for(var v = 0; v <= r.marks; v++) ctl += '<option value="' + v + '"' + (v === r.got ? " selected" : "") + ">" + v + " / " + r.marks + "</option>"; ctl += "</select>"; }
        h += "<tr>" + (i === 0 ? '<td class="q" rowspan="' + (rows.length + (model ? 2 : 1)) + '">' + esc(pt.key) + "</td>" : "") + "<td>" + esc(r.text).replace(/\n/g, "<br>") + '</td><td class="mk">' + r.marks + '</td><td class="g">' + (r.guide || "") + '</td><td class="you no-print">' + ctl + "</td></tr>";
      });
      if(model) h += '<tr><td colspan="4" class="p2-model"><b>' + (pt.type === "draw" ? "Model diagram" : pt.type === "table" ? "Completed table" : "Model answer") + "</b><br>" + model + "</td></tr>";
      h += '<tr><td colspan="4" class="g"><i>Examiner note: ' + esc(pt.note || "") + "</i></td></tr>";
    });
    return h + "</table>";
  }

  function band(pc){
    return pc >= 80 ? "Excellent. You are exam-ready on the Paper 2 topics." : pc >= 65 ? "Good. A few topics to polish." : pc >= 50 ? "Getting there. Revise the weaker topics first." : "Keep going. Revisit the lessons marked for review, then try again.";
  }
  function topicTable(byTopic){
    var rows = TOPIC_ORDER.map(function(t){ var x = byTopic[t]; return x ? { name: TOPIC_NAMES[t], got: x.got, max: x.max } : null; }).filter(Boolean);
    var weakest = rows.slice().sort(function(a, b){ return a.got / a.max - b.got / b.max; })[0];
    var h = '<table class="pp-topic"><tr><th>Topic</th><th>Marks</th><th></th></tr>';
    rows.forEach(function(r){
      var pc = Math.round(100 * r.got / r.max);
      h += "<tr><td>" + esc(r.name) + (weakest && weakest.name === r.name && pc < 80 ? ' <b style="color:var(--incorrect)">· revise first</b>' : "") + "</td><td>" + r.got + " / " + r.max + " (" + pc + '%)</td><td><div class="bar"><i style="width:' + pc + '%"></i></div></td></tr>';
    });
    return h + "</table>";
  }
  function mergeHist(a, b){
    var seen = {}, out = [];
    (a || []).concat(b || []).forEach(function(x){ if(x && x.at && !seen[x.at]){ seen[x.at] = 1; out.push(x); } });
    return out.sort(function(x, y){ return x.at - y.at; }).slice(-30);
  }

  root.Paper2Lib = { TOPIC_NAMES: TOPIC_NAMES, TOPIC_ORDER: TOPIC_ORDER, esc: esc, get: get, list: list, emptyAnswer: emptyAnswer, isAnswered: isAnswered,
    paperHtml: paperHtml, markSchemeHtml: markSchemeHtml, rowsFor: rowsFor, band: band, topicTable: topicTable, mergeHist: mergeHist, cellOk: cellOk, gradeKw: gradeKw };
})(window);
