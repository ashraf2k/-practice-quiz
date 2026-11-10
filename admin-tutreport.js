/* Admin: progress reports for the 10AM tutorials (Unit 1 Technology, IP and Security; Unit 2 GIMP; Unit 3 Web basics).
   One reusable report per tutorial: reads each 10AM student's progress record (practiceProgress, key per tutorial) and shows
   topics done, quiz scores, wrong answers and the written answers next to the model answer. */
(function(){
  "use strict";
function make(cfg){
  var rows = [], loaded = false, loading = false, filt = { q: "", cls: "all", sort: "name" }, host, body;
  var LANGS = function(){ return (window[cfg.data] && window[cfg.data].langs) || []; };
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }
  function fmt(ms){ return ms ? new Date(ms).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh" }) : "-"; }
  function is10AM(u){
    var c = String(u.className || ""); try{ if(window.PQ_LEGACY_CLASS) c = window.PQ_LEGACY_CLASS(c); }catch(e){}
    return /^10AM/i.test(c);
  }
  function stats(rec){
    var out = { done: 0, total: 0, right: 0, answered: 0, written: 0, byLang: {}, last: 0 };
    LANGS().forEach(function(L){
      var n = 0; out.byLang[L.id] = { done: 0, total: L.topics.length };
      L.topics.forEach(function(t){
        out.total++;
        var p = rec && rec.topics && rec.topics[t.id]; if(!p) return;
        var m = p.mcq || {}, k = Object.keys(m);
        k.forEach(function(q){ out.answered++; if(m[q] && m[q].ok) out.right++; });
        if(p.written && String(p.written).trim().length >= 15) out.written++;
        if(k.length >= 5 && p.seen){ out.done++; out.byLang[L.id].done++; }
        if(p.t > out.last) out.last = p.t;
      });
    });
    return out;
  }
  function css(){
    if(document.getElementById("wt-css")) return;
    var s = el("style"); s.id = "wt-css";
    s.textContent = ".wt-dlg{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.5);display:flex;justify-content:center;align-items:flex-start;padding:3vh 12px;overflow:auto}" +
      ".wt-box{width:100%;max-width:760px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:0 14px 44px rgba(0,0,0,.4)}" +
      ".wt-box h3{margin:0 0 4px}.wt-top{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;flex-wrap:wrap}" +
      ".wt-t{margin:12px 0;border:1px solid var(--line);border-radius:12px;padding:10px 12px}.wt-t>b:first-child{display:block;margin-bottom:4px}" +
      ".wt-ans{white-space:pre-wrap;margin:6px 0;padding:8px 10px;border-radius:8px;background:var(--bg);border:1px solid var(--line);font:13px/1.45 ui-monospace,Menlo,Consolas,monospace}" +
      ".wt-pill{display:inline-block;padding:1px 8px;border-radius:99px;font-size:12px;font-weight:800;margin-right:6px;background:var(--accent-tint);border:1px solid var(--line)}" +
      ".wt-bar{height:8px;border-radius:6px;background:var(--line);overflow:hidden;min-width:70px}.wt-bar i{display:block;height:100%;background:var(--accent)}";
    document.head.appendChild(s);
  }
  function build(){
    host = document.getElementById("panel-" + cfg.id); if(!host || host.__built) return; host.__built = true; css();
    var tb = el("div", "admin-toolbar no-print");
    var q = el("input"); q.type = "search"; q.placeholder = "Search name or email"; q.style.cssText = "min-width:220px;padding:8px 10px;border:1.5px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);font:inherit";
    q.addEventListener("input", function(){ filt.q = q.value; render(); });
    var cs = el("select"); cs.id = cfg.id + "-cls"; cs.addEventListener("change", function(){ filt.cls = cs.value; render(); });
    var so = el("select"); [["name", "Sort: name"], ["done", "Sort: most topics done"], ["last", "Sort: last active"], ["quiz", "Sort: quiz score"]].forEach(function(o){ var op = el("option", null, o[1]); op.value = o[0]; so.appendChild(op); });
    so.addEventListener("change", function(){ filt.sort = so.value; render(); });
    var rf = el("button", "btn btn-secondary", "Refresh"); rf.type = "button"; rf.addEventListener("click", function(){ load(true); });
    var ex = el("button", "btn btn-secondary", "Download CSV"); ex.type = "button"; ex.addEventListener("click", csv);
    [q, cs, so, rf, ex].forEach(function(n){ tb.appendChild(n); });
    var st = el("p", "admin-status"); st.id = cfg.id + "-status";
    body = el("div"); body.id = cfg.id + "-body";
    host.appendChild(tb); host.appendChild(st); host.appendChild(body);
  }
  function load(force){
    if(loading) return; loading = true;
    var st = document.getElementById(cfg.id + "-status"); st.textContent = "Loading 10AM students...";
    window.PQFirebase.listAllUsers().then(function(list){
      var users = list.filter(function(u){ return (u.role || "student") === "student" && is10AM(u); });
      var i = 0, got = 0;
      rows = users.map(function(u){ return { u: u, rec: null, st: stats(null) }; });
      function next(){
        var chunk = rows.slice(i, i + 6); i += 6;
        if(!chunk.length) return Promise.resolve();
        return Promise.all(chunk.map(function(r){
          return window.PQFirebase.getMyProgress(r.u.uid, cfg.key).then(function(rec){ r.rec = rec; r.st = stats(rec); }, function(){});
        })).then(function(){ got += chunk.length; st.textContent = "Loading progress " + Math.min(got, rows.length) + " / " + rows.length + "..."; return next(); });
      }
      return next().then(function(){
        loaded = true; loading = false;
        st.textContent = rows.length + " students in 10AM classes. " + rows.filter(function(r){ return r.st.last; }).length + " have started.";
        syncClasses(); render();
      });
    }, function(e){ loading = false; st.textContent = "Could not load students: " + ((e && e.message) || "error"); });
  }
  function syncClasses(){
    var s = document.getElementById(cfg.id + "-cls"), seen = {}; rows.forEach(function(r){ if(r.u.className) seen[r.u.className] = 1; });
    s.textContent = ""; var a = el("option", null, "All 10AM classes"); a.value = "all"; s.appendChild(a);
    Object.keys(seen).sort().forEach(function(n){ var o = el("option", null, n); o.value = n; s.appendChild(o); });
  }
  function visible(){
    var q = filt.q.toLowerCase();
    var out = rows.filter(function(r){ return (filt.cls === "all" || r.u.className === filt.cls) && (!q || (r.u.name + " " + r.u.email).toLowerCase().indexOf(q) >= 0); });
    out.sort(function(a, b){
      if(filt.sort === "done") return b.st.done - a.st.done || a.u.name.localeCompare(b.u.name);
      if(filt.sort === "last") return b.st.last - a.st.last;
      if(filt.sort === "quiz") return (b.st.answered ? b.st.right / b.st.answered : -1) - (a.st.answered ? a.st.right / a.st.answered : -1);
      return a.u.name.localeCompare(b.u.name);
    });
    return out;
  }
  function render(){
    if(!body) return; body.textContent = "";
    var list = visible(), started = list.filter(function(r){ return r.st.last; }).length, avg = 0, n = 0;
    list.forEach(function(r){ if(r.st.answered){ avg += r.st.right / r.st.answered; n++; } });
    var tiles = el("div", "kpi-row");
    [["Students shown", list.length, "in " + (filt.cls === "all" ? "all 10AM classes" : filt.cls)], ["Started", started, list.length ? Math.round(100 * started / list.length) + "% of students" : "-"], ["Not started", list.length - started, "no topics opened yet"], ["Average quiz score", n ? Math.round(100 * avg / n) + "%" : "-", "across students who answered"]].forEach(function(t){
      var d = el("div", "kpi"); d.appendChild(el("div", "k-label", t[0])); d.appendChild(el("div", "k-value", String(t[1]))); d.appendChild(el("div", "k-sub", t[2])); tiles.appendChild(d);
    });
    body.appendChild(tiles);
    var wrap = el("div", "table-scroll"), t = el("table", "admin-table"), th = el("thead"), hr = el("tr");
    var heads = ["Student", "Class", "Topics done"]; LANGS().forEach(function(L){ heads.push(L.title); }); heads = heads.concat(["Quiz score", "Rating", "Written answers", "Last active", ""]);
    heads.forEach(function(h){ hr.appendChild(el("th", null, h)); }); th.appendChild(hr); t.appendChild(th);
    var tbd = el("tbody");
    list.forEach(function(r){
      var tr = el("tr"); var s = r.st;
      var tn = el("td"); tn.appendChild(el("div", null, r.u.name || "(no name)")); var em = el("div", null, r.u.email); em.style.cssText = "font-size:11.5px;color:var(--muted)"; tn.appendChild(em); tr.appendChild(tn);
      tr.appendChild(el("td", null, r.u.className));
      var td = el("td"); td.appendChild(el("div", null, s.done + " / " + s.total)); var bar = el("div", "wt-bar"), i = el("i"); i.style.width = (s.total ? Math.round(100 * s.done / s.total) : 0) + "%"; bar.appendChild(i); td.appendChild(bar); tr.appendChild(td);
      LANGS().forEach(function(L){ var x = s.byLang[L.id]; tr.appendChild(el("td", null, x.done + " / " + x.total)); });
      tr.appendChild(el("td", null, s.answered ? s.right + " / " + s.answered + " (" + Math.round(100 * s.right / s.answered) + "%)" : "-"));
      var rt = el("td"), pc = s.answered ? Math.round(100 * s.right / s.answered) : null, rl = pc == null ? "Not started" : pc >= 90 ? "Excellent" : pc >= 80 ? "Secure" : pc >= 70 ? "Improving" : pc >= 50 ? "Developing" : "Struggling";
      var chip = el("span", null, rl); chip.style.cssText = "display:inline-block;padding:2px 9px;border-radius:999px;font-size:12px;font-weight:700;color:#fff;background:" + ({ Excellent: "#0f766e", Secure: "#16a34a", Improving: "#0ea5e9", Developing: "#f59e0b", Struggling: "#dc2626" }[rl] || "#94a3b8"); rt.appendChild(chip); tr.appendChild(rt);
      tr.appendChild(el("td", null, s.written + " / " + s.total));
      tr.appendChild(el("td", null, fmt(s.last)));
      var ta = el("td"), b = el("button", "btn btn-secondary", "View"); b.type = "button"; b.disabled = !s.last; b.addEventListener("click", function(){ detail(r); }); ta.appendChild(b); tr.appendChild(ta);
      tbd.appendChild(tr);
    });
    t.appendChild(tbd); wrap.appendChild(t); body.appendChild(wrap);
    if(!list.length) body.appendChild(el("p", "admin-status", loaded ? "No 10AM students match." : ""));
  }
  function detail(r){
    var old = document.getElementById(cfg.id + "-dlg"); if(old) old.remove();
    var dlg = el("div", "wt-dlg"); dlg.id = cfg.id + "-dlg"; var box = el("div", "wt-box"); dlg.appendChild(box);
    dlg.addEventListener("mousedown", function(e){ if(e.target === dlg) dlg.remove(); });
    var top = el("div", "wt-top"), h = el("div"); h.appendChild(el("h3", null, r.u.name)); h.appendChild(el("div", "admin-status", r.u.email + " - " + r.u.className + " - last active " + fmt(r.st.last)));
    var close = el("button", "btn btn-secondary", "Close"); close.type = "button"; close.addEventListener("click", function(){ dlg.remove(); });
    top.appendChild(h); top.appendChild(close); box.appendChild(top);
    box.appendChild(el("p", null, r.st.done + " of " + r.st.total + " topics done. Quiz: " + r.st.right + " / " + r.st.answered + " correct."));
    LANGS().forEach(function(L){
      box.appendChild(el("h4", null, L.title));
      L.topics.forEach(function(t){
        var p = r.rec && r.rec.topics && r.rec.topics[t.id], w = el("div", "wt-t");
        var m = (p && p.mcq) || {}, k = Object.keys(m), ok = k.filter(function(q){ return m[q].ok; }).length;
        var head = el("b", null, t.title); w.appendChild(head);
        if(!p || (!k.length && !p.written)){ w.appendChild(el("span", "admin-status", "Not started")); box.appendChild(w); return; }
        w.appendChild(el("span", "wt-pill", "Quiz " + ok + " / " + k.length + (k.length < 5 ? " (unfinished)" : "")));
        w.appendChild(el("span", "wt-pill", p.seen ? "Compared with model answer" : "Model answer not opened"));
        if(p.t) w.appendChild(el("span", "admin-status", fmt(p.t)));
        if(k.length){
          var wrong = k.filter(function(q){ return !m[q].ok; });
          if(wrong.length){
            var ul = el("div", "admin-status"); ul.textContent = "Wrong: " + wrong.map(function(q){ return "Q" + (Number(q) + 1) + " (chose: " + m[q].pick + ")"; }).join("; "); w.appendChild(ul);
          }
        }
        var qd = el("div"); qd.style.cssText = "font-size:13px;margin-top:6px"; var wq = el("div"); wq.textContent = "Written question: " + String(t.written.q).replace(/<[^>]+>/g, ""); wq.style.fontWeight = "600"; w.appendChild(wq);
        w.appendChild(el("div", "wt-ans", p.written ? p.written : "(no answer written)"));
        var dt = el("details"); dt.appendChild(el("summary", null, "Model answer")); dt.appendChild(el("div", "wt-ans", t.written.model)); w.appendChild(dt);
        box.appendChild(w);
      });
    });
    document.body.appendChild(dlg);
  }
  function csv(){
    var head = ["Name", "Email", "Class", "Topics done", "Topics total"];
    LANGS().forEach(function(L){ head.push(L.title + " done"); }); head = head.concat(["Quiz correct", "Quiz answered", "Quiz %", "Written answers", "Last active (Riyadh)"]);
    var lines = [head];
    visible().forEach(function(r){
      var s = r.st, line = [r.u.name, r.u.email, r.u.className, s.done, s.total];
      LANGS().forEach(function(L){ line.push(s.byLang[L.id].done); });
      line = line.concat([s.right, s.answered, s.answered ? Math.round(100 * s.right / s.answered) : "", s.written, s.last ? fmt(s.last) : ""]); lines.push(line);
    });
    var text = lines.map(function(l){ return l.map(function(v){ v = String(v == null ? "" : v); if(/^[=+\-@]/.test(v)) v = "'" + v; return '"' + v.replace(/"/g, '""') + '"'; }).join(","); }).join("\r\n");
    var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob(["﻿" + text], { type: "text/csv" })); a.download = cfg.csv; document.body.appendChild(a); a.click();
    setTimeout(function(){ URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  window[cfg.hook] = function(){ build(); if(!loaded) load(); else render(); };
}
make({ id: "unit1", key: "unit1", data: "UNIT1TUT", hook: "__unit1Opened", csv: "unit1-technology-ip-security-10AM.csv" });
make({ id: "gimp", key: "gimp", data: "GIMPTUT", hook: "__gimpOpened", csv: "unit2-gimp-10AM.csv" });
make({ id: "webtut", key: "webtut", data: "WEBTUT", hook: "__webtutOpened", csv: "unit3-web-basics-10AM.csv" });
})();
