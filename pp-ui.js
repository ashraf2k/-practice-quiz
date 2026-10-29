/* Past-paper question layout for exam-practice.html: a question with q.parts is shown like a Cambridge question paper
   (stem, lettered parts, tick boxes, ruled answer lines, working space, marks in square brackets) and, after marking,
   the published Cambridge mark scheme (q.ms) is shown as an Answer / Marks / Guidance table. Other questions are untouched. */
window.PP = (function(){
  var active = false, texts = {}, ticks = {};
  var css = document.createElement("style");
  css.textContent =
    ".pp-box{margin:12px 0;padding:16px 18px;border:1.5px solid var(--ink,#222);border-radius:6px;background:var(--surface,#fff);font-family:Georgia,'Times New Roman',serif;color:var(--ink,#111)}" +
    ".pp-head{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;font:700 12px system-ui,sans-serif;text-transform:uppercase;letter-spacing:.04em;color:var(--muted,#555);border-bottom:2px solid var(--ink,#222);padding-bottom:6px;margin-bottom:12px}" +
    ".pp-stem{font-size:16px;line-height:1.5;margin:0 0 12px;white-space:pre-wrap}" +
    ".pp-part{margin:14px 0 0}.pp-q{display:flex;gap:12px;font-size:16px;line-height:1.5}.pp-lab{min-width:44px;font-weight:700}.pp-t{flex:1;white-space:pre-wrap}.pp-mk{font-weight:700;white-space:nowrap}" +
    ".pp-ans{margin:6px 0 0 56px}.pp-lines{width:100%;box-sizing:border-box;border:0;outline:0;resize:vertical;background:transparent;color:inherit;font:15px/28px 'Courier New',monospace;padding:0 2px;" +
    "background-image:repeating-linear-gradient(transparent,transparent 26px,var(--muted,#777) 26px,var(--muted,#777) 27px);background-attachment:local}" +
    ".pp-lines:focus{background-color:var(--accent-tint,#eef4ff)}" +
    ".pp-work{margin:8px 0 0 56px;padding:6px 10px;border:1.5px dashed var(--line,#999);border-radius:6px;font-family:system-ui,sans-serif}.pp-work b{font-size:11.5px;color:var(--muted,#555);text-transform:uppercase;letter-spacing:.04em}" +
    ".pp-work textarea{width:100%;box-sizing:border-box;border:0;outline:0;resize:vertical;background:transparent;color:inherit;font:14px/24px 'Courier New',monospace}" +
    ".pp-opt{display:flex;gap:10px;align-items:center;margin:5px 0;padding:6px 10px;border:1.5px solid var(--ink,#222);border-radius:4px;cursor:pointer;font-size:15px;background:transparent;color:inherit;width:100%;text-align:left;font-family:inherit}" +
    ".pp-opt .bx{width:22px;height:22px;border:2px solid var(--ink,#222);display:inline-flex;align-items:center;justify-content:center;font:700 16px system-ui}.pp-opt.on{background:var(--accent-tint,#eef4ff);border-color:var(--accent,#2563eb)}" +
    ".pp-ms{margin:14px 0;overflow-x:auto;font-family:system-ui,sans-serif}.pp-ms h4{margin:0 0 6px}.pp-ms table{border-collapse:collapse;width:100%;font-size:13px}.pp-ms th,.pp-ms td{border:1px solid var(--line,#bbb);padding:6px 8px;vertical-align:top;text-align:left}.pp-ms th{background:var(--bg,#f3f4f6)}" +
    ".pp-ms ul{margin:3px 0;padding-left:18px}.pp-ms .src{font-size:11.5px;color:var(--muted,#555);margin-top:6px}";
  document.head.appendChild(css);
  function el(t, c, h){ var e = document.createElement(t); if(c) e.className = c; if(h != null) e.innerHTML = h; return e; }
  function esc(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function clearOld(){ var o = document.getElementById("pp-box"); if(o) o.remove(); var m = document.getElementById("pp-ms"); if(m) m.remove(); }

  function render(q, answerField, qPrompt, paper){
    clearOld(); active = !!q.parts; texts = {}; ticks = {};
    answerField.style.display = active ? "none" : "";
    if(!active) return;
    var box = el("div", "pp-box"); box.id = "pp-box";
    box.appendChild(el("div", "pp-head", "<span>" + esc(q.paperLabel || "Cambridge IGCSE Computer Science 0478") + "</span><span>Question " + esc(q.no || "") + " · [" + q.marks + " marks]</span>"));
    if(q.stem){ box.appendChild(el("p", "pp-stem", esc(q.stem))); }
    q.parts.forEach(function(p){
      var part = el("div", "pp-part"), row = el("div", "pp-q");
      row.appendChild(el("span", "pp-lab", esc(p.label || "")));
      row.appendChild(el("span", "pp-t", esc(p.text || "")));
      if(p.marks) row.appendChild(el("span", "pp-mk", "[" + p.marks + "]"));
      part.appendChild(row);
      if(p.options){
        var w = el("div", "pp-ans");
        p.options.forEach(function(o){
          var b = el("button", "pp-opt", '<span class="bx"></span><span><b>' + o[0] + "</b> &nbsp;" + esc(o[1]) + "</span>"); b.type = "button";
          b.addEventListener("click", function(){ Array.prototype.forEach.call(w.querySelectorAll(".pp-opt"), function(x){ x.classList.remove("on"); x.firstChild.textContent = ""; }); b.classList.add("on"); b.firstChild.textContent = "✓"; ticks[p.id] = o[0]; });
          w.appendChild(b);
        });
        part.appendChild(w);
      } else {
        if(p.work){ var wk = el("div", "pp-work", "<b>Working space</b>"); var wt = el("textarea"); wt.rows = p.work; wt.addEventListener("input", function(){ texts[p.id + "_w"] = wt.value; }); wt.setAttribute("aria-label", "Working space for " + (p.label || "")); wk.appendChild(wt); part.appendChild(wk); }
        var a = el("div", "pp-ans"), t = el("textarea", "pp-lines"); t.rows = p.lines || 2; t.setAttribute("aria-label", "Answer for " + (p.label || "")); t.setAttribute("data-pp", p.id);
        t.addEventListener("input", function(){ texts[p.id] = t.value; });
        a.appendChild(t); part.appendChild(a);
      }
      box.appendChild(part);
    });
    qPrompt.textContent = ""; qPrompt.style.display = "none"; qPrompt.parentNode.insertBefore(box, qPrompt.nextSibling);
  }
  function restore(){ document.getElementById("q-prompt").style.display = ""; }
  // join the part answers into the one text the keyword grader reads, and remember each part for part-specific mark points
  function collect(ta){
    var q = window.__ppQ, out = [];
    q.parts.forEach(function(p){ var v = p.options ? (ticks[p.id] || "") : (texts[p.id] || ""); out.push("answer_" + p.id + ": " + v + (texts[p.id + "_w"] ? "\nworking_" + p.id + ": " + texts[p.id + "_w"] : "")); });
    ta.value = out.join("\n");
    return /\S/.test(out.join("").replace(/(answer|working)_\w+:/g, "")) ? ta.value : "";
  }
  function part(id){ return p_text(id); }
  function p_text(id){ var q = window.__ppQ; if(!q) return ""; if(id.indexOf("|") > -1) return id.split("|").map(p_text).join("\n"); if(/\+$/.test(id)){ var b = id.slice(0, -1); return (p_text(b) + "\n" + (texts[b + "_w"] || "")).trim(); } var p = q.parts.filter(function(x){ return x.id === id; })[0]; return p ? (p.options ? (ticks[id] || "") : (texts[id] || "")) : ""; }
  function showScheme(q, after){
    var old = document.getElementById("pp-ms"); if(old) old.remove();
    if(!q.ms) return;
    var d = el("div", "pp-ms"); d.id = "pp-ms";
    var h = "<h4>Cambridge mark scheme</h4><table><tr><th>Question</th><th>Answer</th><th>Marks</th><th>Guidance</th></tr>";
    q.ms.forEach(function(r){
      h += "<tr><td>" + esc(r.q) + "</td><td>" + (r.lead ? "<div>" + esc(r.lead) + "</div>" : "") + (r.ans && r.ans.length ? "<ul>" + r.ans.map(function(x){ return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") + "</td><td>" + esc(r.marks) + "</td><td>" + (r.guide || []).map(function(x){ return "<div>" + esc(x) + "</div>"; }).join("") + "</td></tr>";
    });
    h += '</table><div class="src">Source: ' + esc(q.msSource || "Cambridge International Education mark scheme") + ". Abbreviations: / separates alternatives within a mark point; // separates alternative answers; BOD = benefit of the doubt; NE = not enough; TV = too vague. Mark your own answer against this scheme, then adjust the ticks above.</div>";
    d.innerHTML = h; after.parentNode.insertBefore(d, after);
  }
  return { render: render, restore: restore, collect: collect, part: part, showScheme: showScheme, active: function(){ return active; } };
})();
