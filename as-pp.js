/* as-pp.js -- real past-paper questions for the AS iLearn journey (as.html).
   A question is shown the way the paper shows it (question number, part labels, marks in [ ], answer lines or boxes). The student answers,
   the answer is marked strictly against the keywords of the published mark scheme, and then the mark scheme is shown in full.

   Question object:
   { type:"pp", src:"9618/12 May/June 2025 Question 2", intro:"<p>context (optional)</p>", explain:"key idea", parts:[ PART, ... ] }

   PART kinds
   { label:"(a)", q:"<p>question html</p>", marks:4, kind:"text", lines:6, code:false,
     points:[ { t:"mark point as written in the scheme", k:[ "keyword", ["both","words"], "re:regex" ] }, ... ], max:4,
     caps:[ { unless:["keyword"], max:2, why:"Max 2 if no mention of ..." } ],
     scheme:"<html of the published mark scheme>", note:"examiner report comment (optional)" }
   { label:"(b)", q:..., marks:2, kind:"fields", fields:[ { label:"Binary", ans:["001000101110"], cmp:"bin"|"text", marks:1, show:"0010 0010 1110" } ], scheme:"..." }
   { label:"(c)", q:..., marks:5, kind:"table", head:["Extract","Assignment","Selection","Iteration"],
     rows:[ [ {t:"Result <- CalculateTotal()"}, {tick:1}, {tick:0}, {tick:0} ], ... ], per:"row", scheme:"..." }
   table cells: {t:"fixed text"}, {tick:1|0} (a tick box; 1 = ticked in the scheme), {in:["accepted answer", ...], w:140} (a typing box).
   per:"row": one mark for each row that is completely right. per:"cell": one mark for each correct cell.
   Matching is case-insensitive; hyphens and punctuation are ignored; binary / hexadecimal answers ignore spaces. */
(function(root){
  "use strict";
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }
  function norm(s){ return " " + String(s || "").toLowerCase().replace(/[‘’]/g, "'").replace(/[-_]/g, " ").replace(/[^a-z0-9\s+\/.'<>=*#&:()\[\],]/g, " ").replace(/\s+/g, " ").trim() + " "; }
  function has(t, k){
    if(Array.isArray(k)) return k.every(function(x){ return has(t, x); });
    if(k.indexOf("re:") === 0){ try { return new RegExp(k.slice(3), "i").test(t); } catch(e){ return false; } }
    var kk = norm(k).trim();
    if(/^[a-z]{1,4}$/.test(kk)) return new RegExp("(^|[^a-z0-9])" + kk + "([^a-z0-9]|$)").test(t);   // short words (cir, isr, mdr, while ...) must match as whole words
    return t.indexOf(kk) !== -1;
  }
  function compact(s, cmp){ s = String(s || "").replace(/\s+/g, ""); return cmp === "bin" || cmp === "hex" ? s.toUpperCase() : s.toLowerCase(); }

  // ----- marking -----
  function markText(part, ans){
    var t = norm(ans), got = [], pts = part.points || [], n = 0;
    pts.forEach(function(p, i){
      var hit = (p.k || []).some(function(k){ return has(t, k); });
      got.push(hit); if(hit) n++;
    });
    var max = part.max || part.marks, why = "";
    (part.caps || []).forEach(function(c){
      var ok = (c.unless || []).some(function(k){ return has(t, k); });
      if(!ok && n > c.max){ n = c.max; why = c.why || ""; }
    });
    return { awarded: Math.min(n, max), max: part.marks, hits: got, why: why };
  }
  function markFields(part, vals){
    var n = 0, hits = [];
    part.fields.forEach(function(f, i){
      var v = compact(vals[i], f.cmp), ok = f.ans.some(function(a){ return compact(a, f.cmp) === v; });
      hits.push(ok); if(ok) n += (f.marks || 1);
    });
    return { awarded: n, max: part.marks, hits: hits };
  }
  function markTable(part, state){
    var n = 0, rowOk = [];
    part.rows.forEach(function(r, ri){
      var all = true, cellsOk = 0;
      r.forEach(function(c, ci){
        if(c.t != null) return;
        var v = state[ri + "_" + ci], ok;
        if(c.tick !== undefined) ok = (!!v) === !!c.tick;
        else ok = c.in.some(function(a){ return compact(v, "text") === compact(a, "text"); }) || (c.any && String(v || "").trim() !== "");
        if(ok) cellsOk++; else all = false;
        if(part.per === "cell" && ok) n++;
      });
      rowOk.push(all);
      if(part.per !== "cell" && all) n++;
    });
    return { awarded: Math.min(n, part.marks), max: part.marks, rowOk: rowOk };
  }

  // ----- rendering -----
  function render(host, q, done, opts){
    opts = opts || {};
    var inputs = [], results = [], finished = false;
    var h = '<div class="pp-paper"><div class="pp-src">Past paper question · ' + esc(q.src) + "</div>" + (q.intro ? '<div class="pp-intro">' + q.intro + "</div>" : "");
    q.parts.forEach(function(p, pi){
      h += '<div class="pp-part" data-p="' + pi + '"><div class="pp-row"><span class="pp-lab">' + esc(p.label || "") + '</span><div class="pp-body"><div class="pp-q">' + p.q + "</div>";
      if(p.kind === "text"){
        var lines = p.lines || Math.max(2, p.marks * 2);
        h += '<textarea class="pp-ans' + (p.code ? " pp-code" : "") + '" data-p="' + pi + '" rows="' + lines + '" spellcheck="false" aria-label="Your answer to ' + esc(p.label || "the question") + '"></textarea>';
      } else if(p.kind === "fields"){
        p.fields.forEach(function(f, fi){ h += '<div class="pp-field"><label>' + esc(f.label) + '</label><input class="pp-in" data-p="' + pi + '" data-f="' + fi + '" autocomplete="off" spellcheck="false" /></div>'; });
      } else if(p.kind === "table"){
        h += '<div class="pp-tw"><table class="pp-table"><thead><tr>' + p.head.map(function(c){ return "<th>" + c + "</th>"; }).join("") + "</tr></thead><tbody>";
        p.rows.forEach(function(r, ri){
          h += "<tr>" + r.map(function(c, ci){
            if(c.t != null) return '<td class="pp-fix">' + c.t + "</td>";
            if(c.tick !== undefined) return '<td class="pp-tk"><input type="checkbox" data-p="' + pi + '" data-c="' + ri + "_" + ci + '" aria-label="' + esc(p.head[ci]) + ", row " + (ri + 1) + '" /></td>';
            return '<td><input class="pp-in" data-p="' + pi + '" data-c="' + ri + "_" + ci + '" style="width:' + (c.w || 120) + 'px" autocomplete="off" spellcheck="false" aria-label="' + esc(p.head[ci]) + ", row " + (ri + 1) + '" /></td>';
          }).join("") + "</tr>";
        });
        h += "</tbody></table></div>";
      }
      h += '</div><span class="pp-marks">[' + p.marks + ']</span></div><div class="pp-res" id="ppres' + pi + '"></div></div>';
    });
    h += '<div class="ln-actions"><button class="btn btn-primary" id="pp-go" type="button">Mark my answer</button></div><div id="pp-fb"></div></div>';
    host.innerHTML = h;

    function collect(p, pi){
      if(p.kind === "text") return host.querySelector('.pp-ans[data-p="' + pi + '"]').value;
      if(p.kind === "fields") return p.fields.map(function(f, fi){ return host.querySelector('.pp-in[data-p="' + pi + '"][data-f="' + fi + '"]').value; });
      var st = {}; Array.prototype.forEach.call(host.querySelectorAll('[data-p="' + pi + '"][data-c]'), function(e){ st[e.getAttribute("data-c")] = e.type === "checkbox" ? e.checked : e.value; }); return st;
    }
    function empty(p, v){
      if(p.kind === "text") return !String(v).trim();
      if(p.kind === "fields") return v.every(function(x){ return !String(x).trim(); });
      return !Object.keys(v).some(function(k){ return v[k] === true || String(v[k] || "").trim(); });
    }
    function resHtml(p, r, v){
      var s = '<div class="pp-score ' + (r.awarded === r.max ? "full" : r.awarded ? "part" : "none") + '"><b>' + esc(p.label || "") + " " + r.awarded + " / " + r.max + (r.awarded === 1 && r.max === 1 ? " mark" : " marks") + "</b></div>";
      if(p.kind === "text"){
        s += '<ul class="pp-pts">' + p.points.map(function(pt, i){ return '<li class="' + (r.hits[i] ? "hit" : "miss") + '"><span class="pp-mk">' + (r.hits[i] ? "✓" : "✗") + "</span> " + pt.t + "</li>"; }).join("") + "</ul>";
        if(r.why) s += '<p class="pp-cap">' + esc(r.why) + "</p>";
        if(p.max && p.max < p.points.length) s += '<p class="pp-cap">Maximum ' + p.max + " marks.</p>";
      } else if(p.kind === "fields"){
        s += '<ul class="pp-pts">' + p.fields.map(function(f, i){ return '<li class="' + (r.hits[i] ? "hit" : "miss") + '"><span class="pp-mk">' + (r.hits[i] ? "✓" : "✗") + "</span> " + esc(f.label) + ": you wrote <code>" + esc(v[i] || "(blank)") + "</code>" + (r.hits[i] ? "" : "; the answer is <code>" + esc(f.show || f.ans[0]) + "</code>") + "</li>"; }).join("") + "</ul>";
      } else {
        s += '<p class="pp-cap">Rows marked ✗ have at least one wrong cell. The complete table is in the mark scheme below.</p>';
      }
      return s;
    }
    function lock(){
      Array.prototype.forEach.call(host.querySelectorAll("textarea,input"), function(e){ e.disabled = true; });
    }
    host.querySelector("#pp-go").addEventListener("click", function(){
      if(finished) return;
      var vals = q.parts.map(collect);
      if(vals.every(function(v, i){ return empty(q.parts[i], v); })){
        var first = host.querySelector("textarea,input"); if(first) first.focus(); return;
      }
      finished = true; lock(); host.querySelector("#pp-go").remove();
      var total = 0, max = 0;
      q.parts.forEach(function(p, pi){
        var r = p.kind === "text" ? markText(p, vals[pi]) : p.kind === "fields" ? markFields(p, vals[pi]) : markTable(p, vals[pi]);
        results.push(r); total += r.awarded; max += r.max;
        host.querySelector("#ppres" + pi).innerHTML = resHtml(p, r, vals[pi]);
        if(p.kind === "table"){
          Array.prototype.forEach.call(host.querySelectorAll('tr'), function(){});
          var trs = host.querySelectorAll('.pp-part[data-p="' + pi + '"] tbody tr');
          Array.prototype.forEach.call(trs, function(tr, ri){ tr.classList.add(r.rowOk[ri] ? "pp-rok" : "pp-rno"); });
        }
      });
      var pctv = max ? total / max : 0, ok = pctv >= 0.6;
      var fb = host.querySelector("#pp-fb");
      var sch = q.parts.map(function(p){ return '<div class="pp-sch-row"><div class="pp-sch-q">' + esc(p.label || "") + '</div><div class="pp-sch-a">' + (p.scheme || "") + (p.note ? '<p class="pp-note"><b>Examiner report:</b> ' + p.note + "</p>" : "") + '</div><div class="pp-sch-m">' + p.marks + "</div></div>"; }).join("");
      fb.innerHTML = '<div class="ln-fb ' + (ok ? "ok" : "no") + '"><b>' + total + " out of " + max + " marks.</b> " + (pctv === 1 ? "Full marks: examiner standard." : ok ? "Good, but check which mark points you missed." : "Study the mark scheme below, then compare with your answer.") + "</div>" +
        '<div class="pp-sch"><div class="pp-sch-h">Published mark scheme · ' + esc(q.src) + '</div><div class="pp-sch-head"><span>Question</span><span>Answer</span><span>Marks</span></div>' + sch + "</div>";
      done(true, fb, { awarded: total, max: max, ok: ok, matched: total, need: max, low: !ok });
    });
  }
  root.ASPP = { render: render, markText: markText, markFields: markFields, markTable: markTable };
})(typeof window !== "undefined" ? window : this);
