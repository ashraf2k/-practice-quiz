/* ============================================================
   syllabus-report.js
   Rendering (HTML) and PDF output for the admin "Syllabus report" tab.
   Depends on syllabus-data.js (SyllabusData) and jsPDF.
   ============================================================ */
(function(root){
  "use strict";
  var SD = root.SyllabusData;
  var COL = {
    secure:[34,139,84], developing:[214,150,30], needs:[196,60,60], limited:[130,138,150], none:[200,205,212]
  };
  var CSSCOL = {};
  Object.keys(COL).forEach(function(k){ CSSCOL[k] = "rgb(" + COL[k].join(",") + ")"; });

  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function fmtD(d){ return d.getDate() + " " + ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][d.getMonth()] + " " + d.getFullYear(); }
  function ascii(s){ return String(s == null ? "" : s).replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/→/g, "->").replace(/[^\x20-\x7E]/g, ""); }
  function pctTxt(p){ return p == null ? "-" : p + "%"; }

  // ---------- Styles (screen) ----------
  var styled = false;
  function ensureStyles(){
    if(styled) return; styled = true;
    var st = document.createElement("style");
    st.textContent =
      ".sy-chip{display:inline-block;padding:2px 9px;border-radius:999px;font-size:11.5px;font-weight:700;color:#fff;white-space:nowrap}" +
      ".sy-head{display:flex;flex-wrap:wrap;gap:6px 18px;align-items:baseline;margin-bottom:4px}" +
      ".sy-head h3{margin:0;font-size:20px}" +
      ".sy-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:14px 0}" +
      ".sy-stat{border:1px solid var(--line);border-radius:10px;padding:10px 12px;background:#fff}" +
      ".sy-stat b{display:block;font-size:22px}" +
      ".sy-stat span{font-size:12px;color:var(--muted)}" +
      ".sy-h{margin:22px 0 8px;font-size:15px}" +
      ".sy-sec td{background:#f3f5f8;font-weight:700}" +
      ".sy-bar{display:inline-block;height:8px;border-radius:4px;vertical-align:middle;margin-right:6px}" +
      ".sy-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}" +
      ".sy-card{border:1px solid var(--line);border-radius:10px;padding:12px 14px;background:#fff}" +
      ".sy-card h4{margin:0 0 6px;font-size:13.5px}" +
      ".sy-plan{border:1px solid var(--line);border-left:5px solid var(--accent);border-radius:10px;padding:12px 14px;margin:10px 0;background:#fff}" +
      ".sy-plan h4{margin:0 0 4px;font-size:14.5px}" +
      ".sy-plan ul{margin:4px 0 8px 18px;padding:0}" +
      ".sy-plan li{margin:2px 0}" +
      ".sy-note{font-size:12.5px;color:var(--muted)}" +
      ".sy-heat{border-collapse:collapse;font-size:12px}" +
      ".sy-heat th,.sy-heat td{border:1px solid #fff;padding:4px 6px;text-align:center;min-width:34px}" +
      ".sy-heat td.nm{text-align:left;background:#fff;border:1px solid var(--line);white-space:nowrap;min-width:150px}" +
      ".sy-heat td.c{color:#fff;font-weight:700}" +
      ".sy-leg{display:flex;flex-wrap:wrap;gap:8px 14px;margin:8px 0 12px;font-size:12.5px}";
    document.head.appendChild(st);
  }

  function chip(r){ return '<span class="sy-chip" style="background:' + CSSCOL[r] + '">' + SD.RATING_LABEL[r] + "</span>"; }

  // ---------- Class list + heat map ----------
  function renderClassList(container, students, onOpen){
    ensureStyles();
    if(!students.length){
      container.innerHTML = '<p class="empty-note">No 10BR students have completed a practice quiz or exam paper yet.</p>';
      return;
    }
    var assessed = SD.SUBTOPICS.filter(function(s){ return s.assessed !== false; });
    var h = '<div class="sy-leg">' + ["secure","developing","needs","limited"].map(function(r){ return chip(r); }).join("") +
      '<span class="sy-note">Secure &gt;= ' + SD.THRESH_SECURE + '% &middot; Developing ' + SD.THRESH_DEVELOPING + '-' + (SD.THRESH_SECURE - 1) + '% &middot; Needs work &lt; ' + SD.THRESH_DEVELOPING + '% &middot; Limited evidence = fewer than ' + SD.MIN_QUESTIONS + ' questions</span></div>';
    h += '<div class="table-scroll"><table class="admin-table" id="sy-list"><thead><tr><th>Name</th><th>Class</th><th>Quizzes</th><th>Papers</th><th>Overall</th><th>Secure</th><th>Developing</th><th>Needs work</th></tr></thead><tbody>';
    students.forEach(function(s, i){
      var c = { secure:0, developing:0, needs:0 };
      s.rows.forEach(function(r){ if(c[r.rating] != null) c[r.rating]++; });
      h += '<tr data-i="' + i + '"><td>' + esc(s.name) + "</td><td>" + esc(s.className) + "</td><td>" + s.quizzes.length + "</td><td>" + s.papers.length +
        "</td><td>" + s.overallPct + "%</td><td>" + c.secure + "</td><td>" + c.developing + "</td><td>" + c.needs + "</td></tr>";
    });
    h += "</tbody></table></div>";
    h += '<h3 class="sy-h">Class heat-map (sub-topics &times; students)</h3><div class="table-scroll"><table class="sy-heat" id="sy-heat"><thead><tr><th></th>' +
      assessed.map(function(a){ return '<th title="' + esc(a.title) + '">' + a.id + "</th>"; }).join("") + "</tr></thead><tbody>";
    students.forEach(function(s){
      h += '<tr><td class="nm">' + esc(s.name) + " (" + esc(s.className) + ")</td>";
      assessed.forEach(function(a){
        var r = s.rows.filter(function(x){ return x.id === a.id; })[0];
        h += '<td class="c" style="background:' + CSSCOL[r.rating] + '" title="' + esc(a.title + ": " + SD.RATING_LABEL[r.rating] + (r.pct != null ? " (" + r.pct + "%)" : "")) + '">' + (r.pct != null ? r.pct : "") + "</td>";
      });
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    var legend = assessed.map(function(a){ return a.id + " " + a.title; }).join(" &middot; ");
    h += '<p class="sy-note">' + legend + ". Not yet assessed (no quiz or paper): 5, 6, 9, 10.</p>";
    container.innerHTML = h;
    container.querySelectorAll("#sy-list tbody tr").forEach(function(tr){
      tr.addEventListener("click", function(){ onOpen(students[Number(tr.getAttribute("data-i"))]); });
    });
  }

  // ---------- Single student report (HTML) ----------
  function renderStudent(container, s){
    ensureStyles();
    var h = '<div class="sy-head"><h3>' + esc(s.name) + '</h3><span class="muted">' + esc(s.className) + '</span><span class="muted">IGCSE Computer Science 0478 syllabus report &middot; ' + fmtD(s.generated) + "</span></div>";
    h += '<div class="sy-grid">' +
      '<div class="sy-stat"><b>' + s.overallPct + '%</b><span>Overall (best attempts)</span></div>' +
      '<div class="sy-stat"><b>' + s.quizzes.length + '</b><span>Practice quizzes completed</span></div>' +
      '<div class="sy-stat"><b>' + s.papers.length + '</b><span>Exam papers completed</span></div>' +
      '<div class="sy-stat"><b>' + s.assessedCount + ' / ' + SD.SUBTOPICS.length + '</b><span>Syllabus areas assessed</span></div></div>';

    h += '<h3 class="sy-h">Syllabus coverage</h3><div class="table-scroll"><table class="admin-table"><thead><tr><th>Syllabus area</th><th>Quizzes</th><th>Exam papers</th><th>Combined</th><th>Rating</th></tr></thead><tbody>';
    var lastSec = null;
    s.rows.forEach(function(r){
      if(r.sec !== lastSec){ lastSec = r.sec; h += '<tr class="sy-sec"><td colspan="5">Section ' + r.sec + " &ndash; " + esc(r.secTitle) + "</td></tr>"; }
      h += "<tr><td>" + r.id + " " + esc(r.title) + "</td><td>" + pctTxt(r.qPct) + "</td><td>" + pctTxt(r.pPct) + "</td><td>" +
        (r.pct != null ? '<span class="sy-bar" style="width:' + Math.round(r.pct * 0.8) + "px;background:" + CSSCOL[r.rating] + '"></span>' + r.pct + "% (" + r.questions + " q)" : "-") +
        "</td><td>" + chip(r.rating) + "</td></tr>";
    });
    h += "</tbody></table></div>";

    h += '<div class="sy-two" style="margin-top:16px"><div class="sy-card"><h4>Strongest areas</h4>' +
      (s.strongest.length ? "<ul>" + s.strongest.map(function(r){ return "<li>" + r.id + " " + esc(r.title) + " &ndash; " + r.pct + "%</li>"; }).join("") + "</ul>" : '<p class="sy-note">None above the Developing level yet.</p>') +
      '</div><div class="sy-card"><h4>Weakest areas</h4>' +
      (s.weakest.length ? "<ul>" + s.weakest.map(function(r){ return "<li><b>" + r.id + " " + esc(r.title) + "</b> &ndash; " + r.pct + "%<br><span class=\"sy-note\">" + esc(SD.SUB_BY_ID[r.id].objective) + "</span></li>"; }).join("") + "</ul>" : '<p class="sy-note">No weak areas found.</p>') +
      "</div></div>";

    h += '<h3 class="sy-h">Exam technique</h3><div class="sy-card"><ul>' + s.technique.map(function(t){ return "<li>" + esc(t.text) + "</li>"; }).join("") + "</ul></div>";

    h += '<h3 class="sy-h">Action plan</h3>';
    if(!s.plan.length) h += '<p class="sy-note">No area is currently below the Secure level. Keep practising and attempt the papers not yet completed.</p>';
    s.plan.forEach(function(p){
      h += '<div class="sy-plan" style="border-left-color:' + CSSCOL[p.rating] + '"><h4>Priority ' + p.priority + ": " + p.id + " " + esc(p.title) + " &mdash; " + p.pct + "% " + chip(p.rating) + "</h4>" +
        '<div class="sy-note">Target: ' + p.target + "% or more &middot; Re-check by " + p.recheck + "</div>" +
        (p.weakTags.length ? "<div><b>Focus on:</b> " + p.weakTags.map(esc).join(", ") + "</div>" : "") +
        "<div><b>Revise (syllabus statements):</b></div><ul>" + p.revise.map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" +
        "<div><b>Redo:</b> " + p.redo.map(esc).join("; ") + "</div>" +
        "<div><b>Tip:</b> " + esc(p.tip) + "</div></div>";
    });
    if(s.extras.length || s.missing.length){
      h += '<div class="sy-card"><h4>Also</h4><ul>' + s.extras.map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") +
        (s.missing.length ? "<li>Not yet attempted: " + s.missing.map(esc).join("; ") + ".</li>" : "") + "</ul></div>";
    }
    h += '<p class="sy-note" style="margin-top:14px">Based on each student\'s best attempt at every quiz and paper. For a quiz that was retaken, the per-topic breakdown comes from the stored (latest) attempt while the headline score is the higher of the two. Sections 5, 6, 9 and 10 have no quizzes or papers yet, so they are shown as Not yet assessed rather than weak.</p>';
    container.innerHTML = h;
  }

  // ---------- PDF ----------
  function PDF(){
    var jsPDF = root.jspdf.jsPDF;
    this.doc = new jsPDF({ unit:"pt", format:"a4" });
    this.W = 595.28; this.H = 841.89; this.M = 40;
    this.y = this.M; this.page = 1; this.title = "";
  }
  PDF.prototype.setTitle = function(t){ this.title = ascii(t); };
  PDF.prototype.footer = function(){
    var d = this.doc; d.setFont("helvetica", "normal"); d.setFontSize(8); d.setTextColor(130, 138, 150);
    d.text("iLearnCS  |  IGCSE Computer Science 0478 syllabus report  |  " + this.title, this.M, this.H - 22);
    d.text("Page " + this.page, this.W - this.M, this.H - 22, { align:"right" });
  };
  PDF.prototype.newPage = function(){ this.footer(); this.doc.addPage(); this.page++; this.y = this.M; };
  PDF.prototype.need = function(h){ if(this.y + h > this.H - 46) this.newPage(); };
  PDF.prototype.text = function(str, o){
    o = o || {}; var d = this.doc, size = o.size || 10, x = (o.x == null ? this.M : o.x), w = o.w || (this.W - this.M - x);
    d.setFont("helvetica", o.bold ? "bold" : "normal"); d.setFontSize(size);
    var c = o.color || [30, 40, 55]; d.setTextColor(c[0], c[1], c[2]);
    var lines = d.splitTextToSize(ascii(str), w), lh = size * 1.32;
    for(var i = 0; i < lines.length; i++){ this.need(lh); d.text(lines[i], x, this.y + size); this.y += lh; }
    if(o.gap) this.y += o.gap;
  };
  PDF.prototype.chip = function(rating, x, y){
    var d = this.doc, t = SD.RATING_LABEL[rating], c = COL[rating];
    d.setFont("helvetica", "bold"); d.setFontSize(8);
    var w = d.getTextWidth(t) + 12;
    d.setFillColor(c[0], c[1], c[2]); d.roundedRect(x, y - 1, w, 13, 6, 6, "F");
    d.setTextColor(255, 255, 255); d.text(t, x + 6, y + 8.5);
    return w;
  };
  PDF.prototype.h2 = function(t){ this.need(34); this.y += 8; this.text(t, { size:13, bold:true, color:[15, 27, 45], gap:4 }); };

  function pdfStudent(p, s){
    var d = p.doc, M = p.M, W = p.W;
    p.setTitle(s.name + " (" + s.className + ")");
    // Header band
    d.setFillColor(15, 27, 45); d.rect(0, 0, W, 78, "F");
    d.setFont("helvetica", "bold"); d.setFontSize(18); d.setTextColor(255, 255, 255);
    d.text(ascii(s.name), M, 36);
    d.setFont("helvetica", "normal"); d.setFontSize(10); d.setTextColor(200, 214, 230);
    d.text(ascii(s.className + "   |   IGCSE Computer Science 0478 (2026-2028) syllabus report   |   " + fmtD(s.generated)), M, 56);
    p.y = 92;
    // Stats
    var stats = [[s.overallPct + "%", "Overall (best attempts)"], [String(s.quizzes.length), "Practice quizzes"], [String(s.papers.length), "Exam papers"], [s.assessedCount + "/" + SD.SUBTOPICS.length, "Syllabus areas assessed"]];
    var bw = (W - 2 * M - 3 * 8) / 4;
    stats.forEach(function(st, i){
      var x = M + i * (bw + 8);
      d.setDrawColor(215, 220, 228); d.roundedRect(x, p.y, bw, 46, 5, 5, "S");
      d.setFont("helvetica", "bold"); d.setFontSize(16); d.setTextColor(15, 27, 45); d.text(st[0], x + 8, p.y + 20);
      d.setFont("helvetica", "normal"); d.setFontSize(8); d.setTextColor(110, 120, 135); d.text(st[1], x + 8, p.y + 35);
    });
    p.y += 58;

    // Coverage table
    p.h2("Syllabus coverage");
    var cols = [{ t:"Syllabus area", x:M, w:210 }, { t:"Quizzes", x:M + 214, w:52 }, { t:"Papers", x:M + 270, w:52 }, { t:"Combined", x:M + 326, w:92 }, { t:"Rating", x:M + 422, w:90 }];
    function head(){
      d.setFillColor(238, 241, 246); d.rect(M, p.y, W - 2 * M, 16, "F");
      d.setFont("helvetica", "bold"); d.setFontSize(8.5); d.setTextColor(60, 70, 85);
      cols.forEach(function(c){ d.text(c.t, c.x + 3, p.y + 11); });
      p.y += 18;
    }
    p.need(60); head();
    var last = null;
    s.rows.forEach(function(r){
      if(r.sec !== last){
        p.need(36); last = r.sec;
        d.setFont("helvetica", "bold"); d.setFontSize(9); d.setTextColor(15, 27, 45);
        d.text(ascii("Section " + r.sec + " - " + r.secTitle), M + 3, p.y + 10); p.y += 15;
      }
      p.need(20);
      d.setFont("helvetica", "normal"); d.setFontSize(9); d.setTextColor(30, 40, 55);
      d.text(ascii(r.id + " " + r.title), cols[0].x + 3, p.y + 10, { maxWidth: cols[0].w });
      d.text(pctTxt(r.qPct), cols[1].x + 3, p.y + 10);
      d.text(pctTxt(r.pPct), cols[2].x + 3, p.y + 10);
      if(r.pct != null){
        var c = COL[r.rating];
        d.setFillColor(c[0], c[1], c[2]); d.rect(cols[3].x + 3, p.y + 3, Math.max(2, r.pct * 0.45), 7, "F");
        d.setTextColor(30, 40, 55); d.text(r.pct + "% (" + r.questions + "q)", cols[3].x + 52, p.y + 10);
      } else d.text("-", cols[3].x + 3, p.y + 10);
      p.chip(r.rating, cols[4].x + 3, p.y);
      d.setDrawColor(232, 236, 241); d.line(M, p.y + 16, W - M, p.y + 16);
      p.y += 18;
    });

    // Strengths / weaknesses
    p.h2("Strongest areas");
    if(s.strongest.length) s.strongest.forEach(function(r){ p.text("+  " + r.id + " " + r.title + " - " + r.pct + "%", { size:10, x:M + 6 }); });
    else p.text("None above the Developing level yet.", { size:10, color:[110, 120, 135] });
    p.h2("Weakest areas (with syllabus wording)");
    if(s.weakest.length) s.weakest.forEach(function(r){
      p.text(r.id + " " + r.title + " - " + r.pct + "%", { size:10, bold:true, x:M + 6 });
      p.text(SD.SUB_BY_ID[r.id].objective, { size:9, x:M + 14, color:[90, 100, 115], gap:3 });
    });
    else p.text("No weak areas found.", { size:10, color:[110, 120, 135] });

    // Technique
    p.h2("Exam technique");
    s.technique.forEach(function(t){ p.text("-  " + t.text, { size:9.5, x:M + 6, gap:2 }); });

    // Plan
    p.h2("Action plan");
    if(!s.plan.length) p.text("No area is currently below the Secure level. Keep practising and attempt the papers not yet completed.", { size:10 });
    s.plan.forEach(function(pl){
      p.need(110);
      var c = COL[pl.rating];
      var top = p.y;
      p.text("Priority " + pl.priority + ": " + pl.id + " " + pl.title + " - " + pl.pct + "% (" + SD.RATING_LABEL[pl.rating] + ")", { size:10.5, bold:true, x:M + 10 });
      p.text("Target " + pl.target + "% or more.  Re-check by " + pl.recheck + ".", { size:9, x:M + 10, color:[90, 100, 115], gap:2 });
      if(pl.weakTags.length) p.text("Focus on: " + pl.weakTags.join(", "), { size:9.5, x:M + 10, gap:2 });
      p.text("Revise (syllabus statements):", { size:9.5, bold:true, x:M + 10 });
      pl.revise.forEach(function(r){ p.text("-  " + r, { size:9, x:M + 16 }); });
      p.text("Redo: " + pl.redo.join("; "), { size:9.5, x:M + 10, gap:2 });
      p.text("Tip: " + pl.tip, { size:9.5, x:M + 10, gap:2 });
      // side bar (drawn on the page where the block ended; blocks rarely split)
      if(p.y > top){ d.setFillColor(c[0], c[1], c[2]); d.rect(M, top, 3, p.y - top, "F"); }
      p.y += 8;
    });
    if(s.extras.length || s.missing.length){
      p.h2("Also");
      s.extras.forEach(function(x){ p.text("-  " + x, { size:9.5, x:M + 6, gap:2 }); });
      if(s.missing.length) p.text("-  Not yet attempted: " + s.missing.join("; ") + ".", { size:9.5, x:M + 6, gap:2 });
    }
    p.y += 6;
    p.text("Based on each student's best attempt at every quiz and paper. For a retaken quiz the per-topic breakdown uses the stored (latest) attempt; the headline score is the higher of the two. Sections 5, 6, 9 and 10 have no quizzes or papers yet and are shown as Not yet assessed, not as weak. Ratings: Secure >= " + SD.THRESH_SECURE + "%, Developing " + SD.THRESH_DEVELOPING + "-" + (SD.THRESH_SECURE - 1) + "%, Needs work < " + SD.THRESH_DEVELOPING + "%, Limited evidence = fewer than " + SD.MIN_QUESTIONS + " questions.", { size:8, color:[130, 138, 150] });
  }

  function pdfClassSummary(p, students, label){
    var d = p.doc, M = p.M, W = p.W;
    p.setTitle("Class summary " + label);
    d.setFillColor(15, 27, 45); d.rect(0, 0, W, 78, "F");
    d.setFont("helvetica", "bold"); d.setFontSize(18); d.setTextColor(255, 255, 255);
    d.text(ascii("Class syllabus report: " + label), M, 36);
    d.setFont("helvetica", "normal"); d.setFontSize(10); d.setTextColor(200, 214, 230);
    d.text(ascii("IGCSE Computer Science 0478 (2026-2028)   |   " + students.length + " students   |   " + fmtD(students[0].generated)), M, 56);
    p.y = 96;
    p.h2("Heat-map: % by syllabus area (best attempts)");
    var assessed = SD.SUBTOPICS.filter(function(s){ return s.assessed !== false; });
    var nameW = 118, cw = (W - 2 * M - nameW - 30) / assessed.length;
    function head(){
      d.setFont("helvetica", "bold"); d.setFontSize(7.5); d.setTextColor(60, 70, 85);
      d.text("Student", M, p.y + 9);
      assessed.forEach(function(a, i){ d.text(a.id, M + nameW + i * cw + cw / 2, p.y + 9, { align:"center" }); });
      d.text("All", W - M - 14, p.y + 9, { align:"center" });
      p.y += 14;
    }
    head();
    students.forEach(function(s){
      if(p.y > p.H - 70){ p.newPage(); head(); }
      d.setFont("helvetica", "normal"); d.setFontSize(8); d.setTextColor(30, 40, 55);
      d.text(ascii(s.name + " (" + s.className + ")"), M, p.y + 9, { maxWidth: nameW - 4 });
      assessed.forEach(function(a, i){
        var r = s.rows.filter(function(x){ return x.id === a.id; })[0], c = COL[r.rating];
        d.setFillColor(c[0], c[1], c[2]); d.rect(M + nameW + i * cw + 0.5, p.y, cw - 1, 13, "F");
        if(r.pct != null){ d.setTextColor(255, 255, 255); d.setFontSize(6.5); d.setFont("helvetica", "bold"); d.text(String(r.pct), M + nameW + i * cw + cw / 2, p.y + 9, { align:"center" }); d.setFont("helvetica", "normal"); d.setFontSize(8); d.setTextColor(30, 40, 55); }
      });
      d.text(s.overallPct + "%", W - M - 14, p.y + 9, { align:"center" });
      p.y += 15;
    });
    p.y += 6;
    var x = M;
    ["secure", "developing", "needs", "limited", "none"].forEach(function(r){ x += p.chip(r, x, p.y) + 6; });
    p.y += 20;
    p.text(assessed.map(function(a){ return a.id + " " + a.title; }).join("  |  "), { size:7.5, color:[110, 120, 135], gap:4 });

    // Class-wide area summary
    p.h2("Class summary by syllabus area");
    var rowsOut = assessed.map(function(a){
      var c = { secure:0, developing:0, needs:0, limited:0, none:0 }, sum = 0, n = 0;
      students.forEach(function(s){ var r = s.rows.filter(function(x){ return x.id === a.id; })[0]; c[r.rating]++; if(r.pct != null){ sum += r.pct; n++; } });
      return { a:a, c:c, avg: n ? Math.round(sum / n) : null };
    });
    rowsOut.forEach(function(o){
      p.need(16);
      p.text(o.a.id + " " + o.a.title + "  -  class average " + pctTxt(o.avg) + "   (Secure " + o.c.secure + ", Developing " + o.c.developing + ", Needs work " + o.c.needs + ", Limited " + o.c.limited + ")", { size:9, x:M + 4 });
    });
    var weakAreas = rowsOut.filter(function(o){ var rated = o.c.secure + o.c.developing + o.c.needs; return rated >= 2 && (o.c.needs + o.c.developing) * 2 >= rated; }).map(function(o){ return o.a.id + " " + o.a.title; });
    if(weakAreas.length) p.text("Areas where half or more of the rated students are below Secure: " + weakAreas.join("; ") + ".", { size:9.5, bold:true, color:[160, 40, 40] });
  }

  function fileSafe(s){ return ascii(s).replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, ""); }
  function save(p, name){
    p.footer();
    p.doc.save(name);
  }
  function downloadStudent(s){
    if(!root.jspdf || !root.jspdf.jsPDF) throw new Error("jsPDF not loaded");
    var p = new PDF(); pdfStudent(p, s);
    save(p, "Syllabus_report_" + fileSafe(s.name) + "_" + fileSafe(s.className) + ".pdf");
  }
  function downloadClass(students, label){
    if(!root.jspdf || !root.jspdf.jsPDF) throw new Error("jsPDF not loaded");
    if(!students.length) return;
    var p = new PDF(); pdfClassSummary(p, students, label);
    students.forEach(function(s){ p.newPage(); pdfStudent(p, s); });
    save(p, "Syllabus_report_class_" + fileSafe(label) + ".pdf");
  }

  root.SyllabusReport = { renderClassList: renderClassList, renderStudent: renderStudent, downloadStudent: downloadStudent, downloadClass: downloadClass };
})(window);
