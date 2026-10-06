  function buildAnswerObjects(examKey, selectedIndices, hintFlags){
    var qs = examQuestions(examKey);
    return qs.map(function(q, i){
      var sel = selectedIndices[i];
      if(sel === undefined || sel === null || sel < 0) return null;
      return { selected: sel, correct: sel === q.correct, hintUsed: !!(hintFlags && hintFlags[i]) };
    });
  }

  // Most questions are worth 1 mark; a question flagged "hard" (currently
  // some igcse and algo questions) is worth 2, per the teacher's weighting.
  // Exams with no difficulty field at all (dp) get 1 for every question,
  // so their totals/scores are numerically identical to a plain question
  // count — this keeps those exams fully backward-compatible.
  function questionMarks(q){
    return (q && q.difficulty === "hard") ? 2 : 1;
  }

  function computeReport(ctx){
    var exam = EXAMS[ctx.examKey];
    var qs = exam.questions;
    var total = 0, aTotal = 0, bTotal = 0;
    var correctCount = 0, aCorrect = 0, bCorrect = 0;
    var statsMap = {}, order = [];

    qs.forEach(function(q, idx){
      var marks = questionMarks(q);
      var t = q.topic || "General";
      if(!statsMap[t]){ statsMap[t] = { topic: t, correct: 0, total: 0 }; order.push(t); }
      statsMap[t].total += marks;
      total += marks;
      if(idx < exam.sectionA.count) aTotal += marks; else bTotal += marks;

      var a = ctx.answers[idx];
      if(a && a.correct){
        // Using a hint on a hard question costs 1 of its marks. Wrong
        // answers always earn 0, whether or not a hint was used.
        var earned = Math.max(0, marks - (a.hintUsed ? 1 : 0));
        correctCount += earned;
        statsMap[t].correct += earned;
        if(idx < exam.sectionA.count) aCorrect += earned; else bCorrect += earned;
      }
    });

    var pct = total ? Math.round((correctCount / total) * 100) : 0;
    var topicStats = order.map(function(t){ return statsMap[t]; });

    return { exam: exam, total: total, aTotal: aTotal, bTotal: bTotal, correctCount: correctCount, aCorrect: aCorrect, bCorrect: bCorrect, pct: pct, topicStats: topicStats };
  }

  function joinList(arr){
    if(arr.length === 1) return arr[0];
    if(arr.length === 2) return arr[0] + " and " + arr[1];
    return arr.slice(0, -1).join(", ") + ", and " + arr[arr.length - 1];
  }

  // Indicative letter grade, only used when an exam opts in via hasGrade.
  function getGrade(pct){
    if(pct >= 80) return "A";
    if(pct >= 70) return "B";
    if(pct >= 60) return "C";
    if(pct >= 50) return "D";
    if(pct >= 40) return "E";
    return "U";
  }

  function buildTeacherFeedback(ctx, report){
    var rows = report.topicStats.map(function(r){
      return { topic: r.topic, correct: r.correct, total: r.total, pct: r.total ? (r.correct / r.total) : 0 };
    });
    var byStrength = rows.slice().sort(function(a, b){ return b.pct - a.pct || b.total - a.total; });

    var strengths = byStrength.filter(function(r){ return r.pct >= 0.75; });
    var weaknesses = byStrength.filter(function(r){ return r.pct < 0.6; }).sort(function(a, b){ return a.pct - b.pct; });

    if(strengths.length === 0 && byStrength.length){
      strengths = byStrength.slice(0, Math.min(2, byStrength.length)).filter(function(r){ return r.pct > 0; });
    }

    var name = ctx.name || "This student";
    var firstName = name.trim().split(/\s+/)[0];
    var exam = report.exam;

    var paragraphs = [];

    var band = report.pct >= 90 ? "excellent" : report.pct >= 75 ? "strong" : report.pct >= 60 ? "solid, developing" : report.pct >= 40 ? "emerging" : "early-stage";
    paragraphs.push(name + " scored " + report.correctCount + " out of " + report.total + " (" + report.pct + "%), showing " + band + " understanding of this content overall.");

    if(strengths.length){
      var strengthList = strengths.map(function(r){ return r.topic + " (" + r.correct + "/" + r.total + ")"; });
      paragraphs.push("Strengths: " + firstName + " performed well on " + joinList(strengthList) + ". This suggests a good grasp of " + (strengths.length > 1 ? "these areas" : "this area") + " and the ability to apply the concepts correctly.");
    }

    if(weaknesses.length){
      var weakList = weaknesses.map(function(r){ return r.topic + " (" + r.correct + "/" + r.total + ")"; });
      paragraphs.push("Areas to revisit: performance was weaker on " + joinList(weakList) + ". Going back over these sections — and re-attempting similar questions — should help close these gaps before the next assessment.");
    } else {
      paragraphs.push("No topic stood out as a clear weak point — performance was fairly consistent across the topics covered.");
    }

    var aPct = report.aTotal ? Math.round((report.aCorrect / report.aTotal) * 100) : 0;
    var bPct = report.bTotal ? Math.round((report.bCorrect / report.bTotal) * 100) : 0;
    if(Math.abs(aPct - bPct) >= 25){
      if(aPct > bPct){
        paragraphs.push("By section, " + firstName + " handled " + exam.sectionA.label + " (" + aPct + "%) noticeably better than " + exam.sectionB.label + " (" + bPct + "%) — it's worth spending extra revision time on " + exam.sectionB.label + ".");
      } else {
        paragraphs.push("By section, " + firstName + " handled " + exam.sectionB.label + " (" + bPct + "%) noticeably better than " + exam.sectionA.label + " (" + aPct + "%) — it's worth spending extra revision time on " + exam.sectionA.label + ".");
      }
    }

    // A single-attempt exam (exam.maxAttempts === 1, e.g. comm9618) has no
    // retake to suggest -- point at the next assessment instead.
    var canRetake = exam.maxAttempts !== 1;
    if(weaknesses.length){
      paragraphs.push(canRetake
        ? "Suggested next step: review the material covering " + weaknesses[0].topic.toLowerCase() + ", then retake this practice to check progress."
        : "Suggested next step: review the material covering " + weaknesses[0].topic.toLowerCase() + " ahead of the next assessment — this was a single-attempt exam, so there's no retake to check progress with here.");
    } else if(report.pct < 100){
      paragraphs.push(canRetake
        ? "Suggested next step: revisit the one or two missed questions above, then retake the practice for a perfect score."
        : "Suggested next step: revisit the one or two missed questions above ahead of the next assessment.");
    } else {
      paragraphs.push("Suggested next step: none — full marks. Ready to move on.");
    }

    return { paragraphs: paragraphs, strengths: strengths, weaknesses: weaknesses };
  }

  function escapeHtml(str){
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function fmtDate(iso){
    try{
      var d = new Date(iso);
      if(isNaN(d.getTime())) return String(iso || "");
      return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    } catch(e){ return String(iso || ""); }
  }

  // Date + time (viewer's local time zone) -- the report shows WHEN the
  // attempt was submitted, not just the day.
  function fmtDateTime(iso){
    try{
      var d = new Date(iso);
      if(isNaN(d.getTime())) return String(iso || "");
      return d.toLocaleString(undefined, { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit", timeZoneName: "short" });
    } catch(e){ return String(iso || ""); }
  }

  // ---------- Build the on-screen report (score, stats, teacher feedback, review) ----------
  function buildReportFragment(ctx){
    var report = computeReport(ctx);
    var exam = report.exam;
    var frag = document.createDocumentFragment();

    // Score block
    var scoreBlock = document.createElement("div");
    scoreBlock.className = "score-block";
    var scoreNum = document.createElement("div");
    scoreNum.className = "score-number";
    scoreNum.textContent = report.correctCount + "/" + report.total;
    var side = document.createElement("div");
    side.className = "score-side";
    var who = document.createElement("p");
    who.className = "who";
    who.textContent = ctx.name + " · " + ctx.cls;
    var dateP = document.createElement("p");
    dateP.textContent = fmtDateTime(ctx.completedAt);
    side.appendChild(who); side.appendChild(dateP);
    scoreBlock.appendChild(scoreNum); scoreBlock.appendChild(side);
    frag.appendChild(scoreBlock);

    // Stat row
    var statRow = document.createElement("div");
    statRow.className = "stat-row";
    function statBox(label, value){
      var box = document.createElement("div"); box.className = "stat-box";
      var l = document.createElement("div"); l.className = "label"; l.textContent = label;
      var v = document.createElement("div"); v.className = "value"; v.textContent = value;
      box.appendChild(l); box.appendChild(v);
      return box;
    }
    statRow.appendChild(statBox(exam.sectionA.label + " (" + exam.sectionA.count + ")", report.aCorrect + "/" + report.aTotal));
    statRow.appendChild(statBox(exam.sectionB.label + " (" + exam.sectionB.count + ")", report.bCorrect + "/" + report.bTotal));
    statRow.appendChild(statBox("Overall", report.pct + "%"));
    frag.appendChild(statRow);

    if(exam.hasGrade){
      var gradeP = document.createElement("p");
      gradeP.className = "grade-note";
      var grade = getGrade(report.pct);
      gradeP.innerHTML = "Indicative Cambridge grade: <strong>" + grade + "</strong> — for this practice only; Cambridge sets official grade boundaries per exam series, not as fixed percentages.";
      frag.appendChild(gradeP);
    }

    // Teacher's feedback
    var feedback = buildTeacherFeedback(ctx, report);
    var fbBlock = document.createElement("div");
    fbBlock.className = "feedback-block";
    var fbTitle = document.createElement("p"); fbTitle.className = "fb-title"; fbTitle.textContent = "Teacher's feedback";
    fbBlock.appendChild(fbTitle);

    var fbGroups = document.createElement("div"); fbGroups.className = "fb-groups";
    function fbGroup(label, items, chipClass, noneText){
      var group = document.createElement("div"); group.className = "fb-group";
      var lbl = document.createElement("div"); lbl.className = "fb-label"; lbl.textContent = label;
      group.appendChild(lbl);
      var chips = document.createElement("div"); chips.className = "fb-chips";
      if(items.length){
        items.forEach(function(r){
          var chip = document.createElement("span");
          chip.className = "chip " + chipClass;
          chip.textContent = r.topic + " " + r.correct + "/" + r.total;
          chips.appendChild(chip);
        });
      } else {
        var none = document.createElement("span"); none.className = "fb-none"; none.textContent = noneText;
        chips.appendChild(none);
      }
      group.appendChild(chips);
      return group;
    }
    fbGroups.appendChild(fbGroup("Strengths", feedback.strengths, "chip-good", "None yet identified"));
    fbGroups.appendChild(fbGroup("Areas to revisit", feedback.weaknesses, "chip-weak", "No notable weak areas"));
    fbBlock.appendChild(fbGroups);

    var fbParas = document.createElement("div"); fbParas.className = "fb-paragraphs";
    feedback.paragraphs.forEach(function(text){
      var p = document.createElement("p"); p.textContent = text; fbParas.appendChild(p);
    });
    fbBlock.appendChild(fbParas);
    frag.appendChild(fbBlock);

    // Review heading + list
    var heading = document.createElement("p"); heading.className = "review-heading"; heading.textContent = "Question-by-question review";
    frag.appendChild(heading);

    exam.questions.forEach(function(q, idx){
      var a = ctx.answers[idx];
      var item = document.createElement("div"); item.className = "review-item";

      var rq = document.createElement("p"); rq.className = "rq";
      var num = document.createElement("span"); num.className = "num"; num.textContent = (idx + 1) + ".";
      rq.appendChild(num);
      rq.appendChild(document.createTextNode(q.q));
      if(q.difficulty){
        var diffBadge = document.createElement("span");
        diffBadge.className = "diff-badge diff-" + q.difficulty;
        diffBadge.textContent = difficultyLabel(q.difficulty);
        rq.appendChild(diffBadge);
      }
      var badge = document.createElement("span");
      badge.className = "badge " + (a && a.correct ? "correct" : "wrong");
      badge.textContent = a && a.correct ? "Correct" : "Incorrect";
      rq.appendChild(badge);
      item.appendChild(rq);

      if(q.code){
        var pre = document.createElement("pre"); pre.className = "code-block"; pre.textContent = q.code;
        item.appendChild(pre);
      }

      var yourAnswer = document.createElement("p");
      yourAnswer.className = "review-line " + (a && a.correct ? "answer-correct" : "answer-wrong");
      var yourText = a ? q.options[a.selected] : "(no answer)";
      yourAnswer.innerHTML = "<span class=\"lbl\">Your answer: </span><span class=\"val\">" + escapeHtml(yourText) + "</span>";
      item.appendChild(yourAnswer);

      if(!a || !a.correct){
        var correctAnswer = document.createElement("p");
        correctAnswer.className = "review-line";
        correctAnswer.innerHTML = "<span class=\"lbl\">Correct answer: </span><span class=\"val\" style=\"color:var(--correct);font-weight:600\">" + escapeHtml(q.options[q.correct]) + "</span>";
        item.appendChild(correctAnswer);
      }

      if(a && a.hintUsed){
        var hintNote = document.createElement("p");
        hintNote.className = "review-line hint-used-note";
        hintNote.innerHTML = "<span class=\"lbl\">Hint used: </span><span class=\"val\">Yes — 1 mark deducted</span>";
        item.appendChild(hintNote);
      }

      var explainLabel = document.createElement("p"); explainLabel.className = "review-explain-label"; explainLabel.textContent = "Teacher's feedback";
      item.appendChild(explainLabel);
      var explain = document.createElement("p"); explain.className = "review-explain"; explain.textContent = q.explain;
      item.appendChild(explain);

      frag.appendChild(item);
    });

    return frag;
  }


  var PDF_INK = [0, 0, 0];
  var PDF_MUTED = [95, 95, 95];
  var PDF_LINE = [180, 180, 180];
  var PDF_CARD_LINE = [190, 190, 190];
  var PDF_HIGHLIGHT = [255, 231, 128]; // highlighter-marker yellow behind the student's name

  // Elegant, muted pastel pill colors for the per-question difficulty
  // badge in the PDF review cards — same palette family as the on-screen
  // --diff-easy/--diff-moderate/--diff-hard CSS variables (light theme).
  var PDF_DIFF_COLORS = {
    easy:     { text: [15, 138, 107],  bg: [225, 245, 238] },
    moderate: { text: [161, 98, 7],    bg: [253, 241, 214] },
    hard:     { text: [124, 58, 237],  bg: [238, 231, 252] }
  };

  function pdfColor(doc, rgb){ doc.setTextColor(rgb[0], rgb[1], rgb[2]); }
  function pdfDrawColor(doc, rgb){ doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }
  function pdfFillColor(doc, rgb){ doc.setFillColor(rgb[0], rgb[1], rgb[2]); }

  // "AK" from "Ahmed Khan" — used for the initials badge on the first page.
  function getInitials(name){
    var parts = String(name || "").trim().split(/\s+/).filter(Boolean);
    var initials = parts.map(function(p){ return p.charAt(0).toUpperCase(); }).join("");
    return initials || "ST";
  }

  // jsPDF's built-in fonts (helvetica/courier) only support the WinAnsi
  // (roughly Latin-1 + common typographic) character set. A handful of
  // characters used in the question content — the pseudocode assignment
  // arrow in particular — fall outside that set and render as garbled
  // glyphs if sent through unchanged, so swap them for safe equivalents
  // whenever text is placed into the PDF (the on-screen HTML view is
  // unaffected and keeps the nicer original characters).
  function pdfSafe(str){
    if(!str) return str;
    return String(str)
      .replace(/←/g, "<-")
      .replace(/→/g, "->")
      .replace(/[✓✗]/g, "");
  }

  function buildResultsPDF(ctx){
    if(!window.jspdf || !window.jspdf.jsPDF) return null;
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF({ unit: "pt", format: "a4" });

    var report = computeReport(ctx);
    var exam = report.exam;
    var feedback = buildTeacherFeedback(ctx, report);

    var PAGE_W = doc.internal.pageSize.getWidth();
    var PAGE_H = doc.internal.pageSize.getHeight();
    var MARGIN = 40;
    var BOTTOM = PAGE_H - MARGIN;
    var CONTENT_W = PAGE_W - MARGIN * 2;
    var y = MARGIN;
    var pageNum = 1;

    // Draws "<prefix><name highlighted><suffix>" on one line, so the
    // student's name stands out when flipping through a stack of printouts.
    function highlightedLine(prefix, name, suffix, x, baseline, opts){
      opts = opts || {};
      var size = opts.size || 8;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(size);
      pdfColor(doc, opts.color || PDF_MUTED);
      doc.text(prefix, x, baseline);
      x += doc.getTextWidth(prefix);

      doc.setFont("helvetica", "bold");
      var nameW = doc.getTextWidth(name);
      pdfFillColor(doc, PDF_HIGHLIGHT);
      doc.roundedRect(x - 2, baseline - size * 0.82, nameW + 4, size * 1.05, 1.5, 1.5, "F");
      pdfColor(doc, PDF_INK);
      doc.text(name, x, baseline);
      x += nameW;

      doc.setFont("helvetica", "normal");
      pdfColor(doc, opts.color || PDF_MUTED);
      doc.text(suffix, x, baseline);
    }

    function runningHeader(){
      highlightedLine(exam.title + " — ", ctx.name, " · " + ctx.cls, MARGIN, MARGIN - 12, { size: 8 });
    }

    function newPage(){
      doc.addPage();
      pageNum++;
      y = MARGIN;
      runningHeader();
      y += 10;
    }

    function measure(str, opts){
      opts = opts || {};
      var size = opts.size || 9;
      doc.setFont(opts.font || "helvetica", opts.bold ? "bold" : "normal");
      doc.setFontSize(size);
      var lines = str ? doc.splitTextToSize(pdfSafe(str), opts.width || CONTENT_W) : [];
      var lh = size * (opts.lineHeightFactor || 1.28);
      return { lines: lines, lh: lh, height: lines.length * lh };
    }

    function drawLines(lines, x, topY, lh, opts){
      opts = opts || {};
      doc.setFont(opts.font || "helvetica", opts.bold ? "bold" : "normal");
      doc.setFontSize(opts.size || 9);
      pdfColor(doc, opts.color || PDF_INK);
      var baseline = topY + lh * 0.8;
      lines.forEach(function(line){
        doc.text(line, x, baseline);
        baseline += lh;
      });
      return topY + lines.length * lh;
    }

    // Draws a single short line of text as a filled black pill with white
    // text — used for the per-question "Teacher's feedback" label in the
    // review cards, so it reads as a clear label rather than plain text.
    function drawHighlightBadge(text, x, topY, lh, opts){
      opts = opts || {};
      var size = opts.size || 8;
      doc.setFont("helvetica", opts.bold === false ? "normal" : "bold");
      doc.setFontSize(size);
      var baseline = topY + lh * 0.8;
      var tw = doc.getTextWidth(text);
      pdfFillColor(doc, opts.bg || PDF_INK);
      doc.roundedRect(x - 3, baseline - size * 0.82, tw + 6, size * 1.05, 2, 2, "F");
      pdfColor(doc, opts.textColor || [255, 255, 255]);
      doc.text(text, x, baseline);
      return topY + lh;
    }

    function writeText(str, opts){
      opts = opts || {};
      var m = measure(str, opts);
      if(y + m.height > BOTTOM){ newPage(); }
      y = drawLines(m.lines, MARGIN, y, m.lh, opts);
      if(opts.marginAfter) y += opts.marginAfter;
    }

    function box(x, boxY, w, h, opts){
      opts = opts || {};
      var radius = opts.radius != null ? opts.radius : 6;
      doc.setLineWidth(opts.lineWidth || 0.75);
      pdfDrawColor(doc, opts.stroke || PDF_LINE);
      if(opts.fill){
        pdfFillColor(doc, opts.fill);
        doc.roundedRect(x, boxY, w, h, radius, radius, "FD");
      } else {
        doc.roundedRect(x, boxY, w, h, radius, radius, "S");
      }
      if(opts.accentBar){
        pdfFillColor(doc, opts.accentBar);
        doc.roundedRect(x, boxY + 3, 4, h - 6, 2, 2, "F");
      }
    }

    // ---------- First-page badge: initials + time taken ----------
    var badgeText = getInitials(ctx.name);
    if(typeof ctx.minutesTaken === "number" && isFinite(ctx.minutesTaken) && ctx.minutesTaken > 0){
      badgeText += "  ·  " + ctx.minutesTaken;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    var badgePadX = 10;
    var badgeH = 18;
    var badgeW = doc.getTextWidth(badgeText) + badgePadX * 2;
    var badgeX = PAGE_W - MARGIN - badgeW;
    var badgeY = MARGIN - 26;
    box(badgeX, badgeY, badgeW, badgeH, { stroke: PDF_LINE, radius: 9, fill: [242, 242, 242] });
    pdfColor(doc, PDF_INK);
    doc.text(badgeText, badgeX + badgeW / 2, badgeY + badgeH / 2 + 3.2, { align: "center" });

    // ---------- Masthead ----------
    writeText(exam.title, { size: 16, bold: true, marginAfter: 2 });
    writeText(exam.subtitle, { size: 8.5, color: PDF_MUTED, marginAfter: 14 });

    // ---------- Student details + score panel ----------
    var completedDateText = fmtDateTime(ctx.completedAt);
    var panelH = exam.hasGrade ? 92 : 78;
    if(y + panelH > BOTTOM) newPage();
    var panelY = y;
    box(MARGIN, panelY, CONTENT_W, panelH, { stroke: PDF_LINE, radius: 8 });

    var padX = 18;
    var leftX = MARGIN + padX;
    var rightEdge = PAGE_W - MARGIN - padX;
    var rowY = panelY + 26;

    function field(label, value, valueOpts){
      valueOpts = valueOpts || {};
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      pdfColor(doc, PDF_MUTED);
      doc.text(label, leftX, rowY);

      var size = valueOpts.size || 11.5;
      var valueX = leftX + 52;
      doc.setFont("helvetica", valueOpts.bold === false ? "normal" : "bold");
      doc.setFontSize(size);

      if(valueOpts.highlight){
        var textW = doc.getTextWidth(value);
        pdfFillColor(doc, PDF_HIGHLIGHT);
        doc.roundedRect(valueX - 3, rowY - size * 0.8, textW + 6, size * 1.05, 2, 2, "F");
      }

      pdfColor(doc, PDF_INK);
      doc.text(value, valueX, rowY);
      rowY += 17;
    }

    field("STUDENT", ctx.name, { highlight: true });
    field("CLASS", ctx.cls);
    field("DATE & TIME", completedDateText, { bold: false, size: 10 });
    if(exam.hasGrade){
      field("GRADE", getGrade(report.pct) + "  (indicative, practice only)", { bold: true, size: 10.5 });
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    pdfColor(doc, PDF_INK);
    doc.text(report.correctCount + " / " + report.total, rightEdge, panelY + 34, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    pdfColor(doc, PDF_MUTED);
    doc.text(report.pct + "% overall", rightEdge, panelY + 50, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    pdfColor(doc, PDF_MUTED);
    doc.text(exam.sectionA.label + " " + report.aCorrect + "/" + report.aTotal + "   ·   " + exam.sectionB.label + " " + report.bCorrect + "/" + report.bTotal, rightEdge, panelY + 64, { align: "right" });

    y = panelY + panelH + 18;

    // ---------- Teacher's Feedback (boxed) ----------
    var fbPad = 14;
    var fbInnerW = CONTENT_W - fbPad * 2 - 6;
    var fbHeadingH = 15;
    var fbParaGap = 6;
    var fbMeasures = feedback.paragraphs.map(function(p){
      return measure(p, { size: 8.5, width: fbInnerW, lineHeightFactor: 1.34 });
    });
    var fbContentH = fbHeadingH + fbMeasures.reduce(function(sum, m){ return sum + m.height + fbParaGap; }, 0);
    var fbBoxH = fbContentH + fbPad * 2;

    if(y + fbBoxH > BOTTOM) newPage();
    var fbBoxY = y;
    box(MARGIN, fbBoxY, CONTENT_W, fbBoxH, { stroke: PDF_LINE, radius: 8, accentBar: PDF_INK });

    var fbX = MARGIN + fbPad + 6;
    var fbY = fbBoxY + fbPad;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    pdfColor(doc, PDF_INK);
    doc.text("Teacher's Feedback", fbX, fbY + 11);
    fbY += fbHeadingH;

    fbMeasures.forEach(function(m){
      fbY = drawLines(m.lines, fbX, fbY, m.lh, { size: 8.5, color: PDF_INK });
      fbY += fbParaGap;
    });

    y = fbBoxY + fbBoxH + 18;

    // ---------- Question-by-question review (two-column boxed cards) ----------
    writeText("Question-by-question review", { size: 11.5, bold: true, marginAfter: 8 });

    var colGap = 14;
    var colW = (CONTENT_W - colGap) / 2;
    var colX = [MARGIN, MARGIN + colW + colGap];
    var cardPad = 6;
    var innerW = colW - cardPad * 2;

    function cardLayout(q, num, a, isCorrect){
      var blocks = [];
      blocks.push({ text: measure(num + ". " + q.q, { size: 8.5, bold: true, width: innerW, lineHeightFactor: 1.22 }), size: 8.5, bold: true, color: PDF_INK, gapAfter: 2 });
      if(q.code){
        blocks.push({ text: measure(q.code, { size: 7, width: innerW, lineHeightFactor: 1.28, font: "courier" }), size: 7, font: "courier", color: PDF_INK, gapAfter: 3 });
      }
      if(q.difficulty){
        var diffColors = PDF_DIFF_COLORS[q.difficulty] || PDF_DIFF_COLORS.easy;
        var diffLabel = difficultyLabel(q.difficulty) + (q.difficulty === "hard" ? "  ·  2 marks" : "");
        blocks.push({ text: measure(diffLabel, { size: 7, bold: true, width: innerW, lineHeightFactor: 1.35 }), size: 7, bold: true, color: diffColors.text, bg: diffColors.bg, gapAfter: 3, highlightBg: true });
      }
      var yourAnswerText = (isCorrect ? "Correct — " : "Incorrect — ") + "Your answer: " + (a ? q.options[a.selected] : "(no answer)");
      blocks.push({ text: measure(yourAnswerText, { size: 8, bold: true, width: innerW, lineHeightFactor: 1.22 }), size: 8, bold: true, color: PDF_INK, gapAfter: isCorrect ? 3 : 1.5 });
      if(!isCorrect){
        blocks.push({ text: measure("Correct answer: " + q.options[q.correct], { size: 8, bold: true, width: innerW, lineHeightFactor: 1.22 }), size: 8, bold: true, color: PDF_INK, gapAfter: 3 });
      }
      if(a && a.hintUsed){
        var hintColors = PDF_DIFF_COLORS.hard;
        blocks.push({ text: measure("Hint used — 1 mark deducted", { size: 7.5, bold: true, width: innerW, lineHeightFactor: 1.24 }), size: 7.5, bold: true, color: hintColors.text, gapAfter: 3 });
      }
      blocks.push({ text: measure("Teacher's feedback", { size: 7, bold: true, width: innerW, lineHeightFactor: 1.35 }), size: 7, bold: true, color: [255, 255, 255], gapAfter: 2.5, highlightBg: true });
      blocks.push({ text: measure(q.explain, { size: 8, width: innerW, lineHeightFactor: 1.26 }), size: 8, color: PDF_MUTED, gapAfter: 0 });

      var h = cardPad * 2;
      blocks.forEach(function(b){ h += b.text.height + b.gapAfter; });
      return { blocks: blocks, height: h };
    }

    // Draws one review card's box and its content blocks at a given position.
    function drawCard(card, cx, cy){
      box(cx, cy, colW, card.height, { stroke: PDF_CARD_LINE, radius: 5, lineWidth: 0.6 });
      var innerY = cy + cardPad;
      var innerX = cx + cardPad;
      card.blocks.forEach(function(b){
        if(b.highlightBg){
          innerY = drawHighlightBadge(b.text.lines[0] || "", innerX, innerY, b.text.lh, { size: b.size, bold: b.bold, textColor: b.color, bg: b.bg });
        } else {
          innerY = drawLines(b.text.lines, innerX, innerY, b.text.lh, { size: b.size, bold: b.bold, color: b.color, font: b.font });
        }
        innerY += b.gapAfter;
      });
    }

    // Cards are laid out row by row (left card = question N, right card =
    // question N+1), rather than each column filling independently, so the
    // printed numbers always read in order — 1, 2 then 3, 4 — instead of
    // drifting out of sequence when neighbouring cards have different
    // heights. A row that doesn't fit on the current page moves to the
    // next page as a whole.
    for(var qi = 0; qi < exam.questions.length; qi += 2){
      var leftA = ctx.answers[qi];
      var leftCard = cardLayout(exam.questions[qi], qi + 1, leftA, !!(leftA && leftA.correct));

      var rightQ = exam.questions[qi + 1];
      var rightCard = null;
      if(rightQ){
        var rightA = ctx.answers[qi + 1];
        rightCard = cardLayout(rightQ, qi + 2, rightA, !!(rightA && rightA.correct));
      }

      var rowH = rightCard ? Math.max(leftCard.height, rightCard.height) : leftCard.height;
      if(y + rowH > BOTTOM){ newPage(); }

      drawCard(leftCard, colX[0], y);
      if(rightCard) drawCard(rightCard, colX[1], y);

      y += rowH + 7;
    }

    // ---------- Footer: page numbers ----------
    var totalPages = doc.internal.getNumberOfPages();
    for(var p = 1; p <= totalPages; p++){
      doc.setPage(p);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      pdfColor(doc, PDF_MUTED);
      doc.text("Page " + p + " of " + totalPages, PAGE_W - MARGIN, PAGE_H - 20, { align: "right" });
    }

    return doc.output("blob");
  }

  function pdfFilename(ctx){
    var exam = EXAMS[ctx.examKey];
    var safeName = (ctx.name || "student").trim().replace(/[^a-z0-9]+/gi, "-").replace(/^-+|-+$/g, "");
    var safeCls = (ctx.cls || "").replace(/[^a-z0-9]+/gi, "-");
    var safeExam = (exam && exam.key) || "results";
    return safeExam + "-results-" + (safeName || "student") + (safeCls ? "-" + safeCls : "") + ".pdf";
  }

  // A plain, dependency-free browser download: works in any ordinary tab
  // with zero Claude involvement.
  function fallbackBrowserDownload(filename, blob){
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 4000);
    return url;
  }

  // Tries Claude's "downloads" capability first (the sandbox-safe path
  // when this page is running inside a Claude artifact viewer), then
  // falls back to a plain browser download anywhere else.
  async function offerPdfDownload(filename, blob){
    if(window.claude && typeof window.claude.use === "function"){
      try{
        var downloads = await window.claude.use("downloads");
        if(downloads){
          await downloads.save({ filename: filename, data: blob });
          return "saved";
        }
      } catch(err){
        if(err && err.code === "declined") return "declined";
        // any other error: fall through to the plain download below
      }
    }

    fallbackBrowserDownload(filename, blob);
    return "fallback";
  }

  function wirePdfButton(btn, statusEl, getCtx){
    btn.addEventListener("click", function(){
      if(btn.disabled) return;
      btn.disabled = true;
      var originalLabel = btn.textContent;
      btn.textContent = "Preparing PDF…";
      if(statusEl) statusEl.textContent = "";

      setTimeout(async function(){
        try{
          var ctx = getCtx();
          if(!ctx){
            if(statusEl) statusEl.textContent = "Nothing to export yet.";
            return;
          }
          var blob = buildResultsPDF(ctx);
          if(!blob){
            if(statusEl) statusEl.textContent = "Couldn't generate the PDF in this browser. Try again.";
            return;
          }
          var result = await offerPdfDownload(pdfFilename(ctx), blob);
          if(statusEl){
            if(result === "declined") statusEl.textContent = "";
            else statusEl.textContent = "PDF ready — check your downloads.";
          }
        } catch(err){
          if(statusEl) statusEl.textContent = "Something went wrong generating the PDF. Please try again.";
        } finally {
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      }, 30);
    });
  }

  // ------------------------------------------------------------------
  // WhatsApp "send a copy" flow
  //
  // WhatsApp's click-to-chat link (wa.me) can only pre-fill a TEXT
  // message -- there is no way for a plain static website to attach a
  // file to it automatically (that needs the paid WhatsApp Business
  // API, which this site doesn't have). The best honest approximation:
  // download the same results PDF the "Download PDF" button produces,
  // then open a WhatsApp chat with the student's number and a message
  // already typed out, and tell the student to attach the file they
  // just downloaded themselves before hitting send in WhatsApp. This
  // is surfaced as normal status text, not hidden or glossed over.
  // ------------------------------------------------------------------

  // Accepts digits, spaces, dashes, parentheses, and an optional
  // leading "+" or "00" international prefix; returns a plain digit
  // string (what wa.me expects, country code + number, no "+") or null
  // if what's left doesn't look like a real phone number.
  function normalizeWhatsAppNumber(raw){
    var s = (raw || "").trim();
    if(s.indexOf("+") === 0) s = s.slice(1);
    else if(s.indexOf("00") === 0) s = s.slice(2);
    var digits = s.replace(/\D/g, "");
    if(digits.length < 8 || digits.length > 15) return null;
    return digits;
  }

  function buildWhatsAppMessage(ctx, report){
    var namePart = ctx.name ? ctx.name + " — " : "";
    return "Hi! Here's my practice quiz result for \"" + report.exam.title + "\": " +
      report.correctCount + "/" + report.total + " (" + report.pct + "%). " +
      "(" + namePart + (ctx.cls || "") + ") I've attached the PDF copy of my full results.";
  }

  function wireWhatsAppButton(btn, phoneInput, statusEl, getCtx){
    btn.addEventListener("click", function(){
      if(btn.disabled) return;
      if(statusEl) statusEl.textContent = "";

      var ctx = getCtx();
      if(!ctx){
        if(statusEl) statusEl.textContent = "Nothing to send yet.";
        return;
      }

      var digits = normalizeWhatsAppNumber(phoneInput ? phoneInput.value : "");
      if(!digits){
        if(statusEl) statusEl.textContent = "Enter a valid WhatsApp number with your country code (8–15 digits), e.g. 9665XXXXXXXX.";
        if(phoneInput) phoneInput.focus();
        return;
      }

      btn.disabled = true;
      var originalLabel = btn.textContent;
      btn.textContent = "Preparing…";

      setTimeout(async function(){
        try{
          var report = computeReport(ctx);
          var blob = buildResultsPDF(ctx);
          if(!blob){
            if(statusEl) statusEl.textContent = "Couldn't generate the PDF in this browser. Try again.";
            return;
          }
          await offerPdfDownload(pdfFilename(ctx), blob);
          var message = buildWhatsAppMessage(ctx, report);
          var waUrl = "https://wa.me/" + digits + "?text=" + encodeURIComponent(message);
          window.open(waUrl, "_blank", "noopener");
          if(statusEl){
            statusEl.textContent = "Your PDF downloaded, and WhatsApp is opening with a message ready — attach the downloaded PDF yourself before you hit send (WhatsApp doesn't let a website attach it for you).";
          }
        } catch(err){
          if(statusEl) statusEl.textContent = "Something went wrong. Please try again.";
        } finally {
          btn.disabled = false;
          btn.textContent = originalLabel;
        }
      }, 30);
    });
  }
