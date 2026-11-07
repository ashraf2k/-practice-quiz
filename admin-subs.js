/* Admin: Subscription Management tab (individual + bulk). Talks to the real back end through PQFirebase:
   listAllUsers (reads users/{uid}.sub), assignSubscriptions (admin-only writes + audit log), subHistoryList.
   All dates are shown and entered in Riyadh time (UTC+3, no daylight saving). */
(function(){
  "use strict";
  var RY = 3 * 3600000, DAY = 86400000, SOON = 7 * DAY;
  var PLAN_LABEL = { trial: "Free trial (24 h)", monthly: "Monthly", quarterly: "3-Month", biannual: "6-Month", exams: "Until exams", custom: "Custom" };
  var rows = [], loaded = false, filt = { q: "", status: "all", plan: "all", cls: "all", sort: "expiry" }, picked = {};
  var host, body;

  function ctx(){ return (window.__adminCtx && window.__adminCtx()) || { uid: "", name: "", role: "" }; }
  function isAdmin(){ return ctx().role === "admin"; }
  function el(tag, cls, txt){ var e = document.createElement(tag); if(cls) e.className = cls; if(txt != null) e.textContent = txt; return e; }
  function fmt(ms){
    if(!ms) return "-";
    return new Date(ms).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh" });
  }
  function left(ms){
    var d = ms - Date.now(), a = Math.abs(d), m = Math.floor(a / 60000), days = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    var t = days >= 2 ? days + " days" : (days === 1 ? "1 day " + h + " h" : (h >= 1 ? h + " h " + mm + " min" : mm + " min"));
    return d >= 0 ? t : t + " ago";
  }
  function toInput(ms){ return new Date(ms + RY).toISOString().slice(0, 16); }
  function fromInput(s){ var t = Date.parse(s + ":00+03:00"); return isNaN(t) ? 0 : t; }
  function addMonths(ms, n){
    var d = new Date(ms + RY), y = d.getUTCFullYear(), m = d.getUTCMonth() + n, day = d.getUTCDate();
    var last = new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
    return Date.UTC(y, m, Math.min(day, last), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds()) - RY;
  }
  function planEnd(plan, startMs, dateMs){
    if(plan === "trial") return startMs + DAY;
    if(plan === "monthly") return addMonths(startMs, 1);
    if(plan === "quarterly") return addMonths(startMs, 3);
    if(plan === "biannual") return addMonths(startMs, 6);
    return dateMs || 0;                              // exams / custom: an admin-chosen date
  }

  // ---- status, from the real dates and the suspended flag ----
  function statusOf(u){
    var s = u.sub, t = Date.now();
    if(!s) return "none";
    if(s.suspended) return "suspended";
    if(s.expiryMs > t) return s.isTrial ? "trial" : (s.expiryMs - t <= SOON ? "soon" : "active");
    if(s.graceMs && s.graceMs > t) return "grace";
    return "expired";
  }
  var ST = { active: ["Active", "#1f8a4c"], trial: ["Trial", "#2563c9"], soon: ["Expiring soon", "#c77700"], expired: ["Expired", "#c0392b"],
             suspended: ["Suspended", "#6b3fa0"], none: ["Not subscribed", "#6b7b7b"], grace: ["Grace period", "#b8860b"] };

  function css(){
    if(document.getElementById("subs-css")) return;
    var s = el("style"); s.id = "subs-css";
    s.textContent = ".sb-tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin:0 0 14px}" +
      ".sb-tile{cursor:pointer;text-align:left;font:inherit;color:inherit;background:var(--bg);border:1.5px solid var(--line);border-radius:14px;padding:12px 14px}" +
      ".sb-tile:hover{border-color:var(--accent)}.sb-tile.on{border-color:var(--accent);background:var(--accent-tint)}" +
      ".sb-tile b{display:block;font-size:26px;letter-spacing:-.02em;line-height:1.1}.sb-tile span{font-size:12px;color:var(--muted);font-weight:600}" +
      ".sb-badge{display:inline-block;padding:2px 9px;border-radius:99px;font-size:11.5px;font-weight:800;color:#fff;white-space:nowrap}" +
      ".sb-bulk{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:9px 12px;margin:0 0 10px;border-radius:12px;background:var(--accent-tint);border:1px solid var(--accent)}" +
      ".sb-dlg{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.5);display:flex;align-items:flex-start;justify-content:center;padding:4vh 12px;overflow:auto}" +
      ".sb-box{width:100%;max-width:640px;background:var(--surface);color:var(--ink);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:0 14px 44px rgba(0,0,0,.4)}" +
      ".sb-box h3{margin:0 0 4px;font-size:19px}.sb-box h4{margin:16px 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}" +
      ".sb-grid{display:grid;grid-template-columns:150px 1fr;gap:8px 12px;align-items:center;margin:8px 0}" +
      ".sb-grid label{font-size:13px;font-weight:700}.sb-grid input,.sb-grid select{width:100%;box-sizing:border-box}" +
      ".sb-cmp{width:100%;border-collapse:collapse;font-size:13.5px;margin:6px 0}.sb-cmp th,.sb-cmp td{padding:6px 8px;border-bottom:1px solid var(--line);text-align:left}" +
      ".sb-actions{display:flex;gap:8px;justify-content:flex-end;margin-top:16px;flex-wrap:wrap}" +
      ".sb-note{margin:8px 0;padding:8px 10px;border-radius:10px;background:var(--bg);border:1px solid var(--line);font-size:13px}.sb-bad{color:#c0392b;font-weight:700}.sb-good{color:#1f8a4c;font-weight:700}" +
      ".sb-hist td,.sb-hist th{font-size:12.5px;padding:5px 6px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}" +
      "@media(max-width:560px){.sb-grid{grid-template-columns:1fr}}";
    document.head.appendChild(s);
  }

  // ---- data ----
  function load(){
    var st = document.getElementById("subs-status");
    st.textContent = "Loading students...";
    return window.PQFirebase.listAllUsers().then(function(list){
      rows = list.filter(function(u){ return (u.role || "student") === "student"; });
      loaded = true; st.textContent = rows.length + " student accounts."; render();
    }, function(e){ st.textContent = "Could not load students: " + ((e && e.message) || "error"); });
  }
  function counts(){
    var c = { all: rows.length, active: 0, trial: 0, soon: 0, expired: 0, suspended: 0, none: 0, grace: 0 };
    rows.forEach(function(u){ c[statusOf(u)]++; });
    return c;
  }
  function visible(){
    var q = filt.q.toLowerCase();
    var out = rows.filter(function(u){
      var s = statusOf(u);
      if(filt.status === "valid"){ if(["active", "soon"].indexOf(s) < 0) return false; }
      else if(filt.status !== "all" && s !== filt.status) return false;
      if(filt.plan !== "all" && (!u.sub || u.sub.plan !== filt.plan)) return false;
      if(filt.cls !== "all" && u.className !== filt.cls) return false;
      if(q && (u.name + " " + u.email + " " + u.uid).toLowerCase().indexOf(q) < 0) return false;
      return true;
    });
    out.sort(function(a, b){
      if(filt.sort === "name") return a.name.localeCompare(b.name);
      if(filt.sort === "created") return b.createdMs - a.createdMs;
      var ea = a.sub ? a.sub.expiryMs : Infinity, eb = b.sub ? b.sub.expiryMs : Infinity;
      return ea - eb;
    });
    return out;
  }

  // ---- page ----
  function build(){
    host = document.getElementById("panel-subs"); if(!host || host.__built) return; host.__built = true; css();
    var tb = el("div", "admin-toolbar no-print");
    var q = el("input"); q.type = "search"; q.placeholder = "Search name, email or account ID"; q.style.minWidth = "240px";
    q.addEventListener("input", function(){ filt.q = q.value; render(); });
    function sel(id, opts, key){
      var s = el("select"); s.id = id; opts.forEach(function(o){ var op = el("option", null, o[1]); op.value = o[0]; s.appendChild(op); });
      s.addEventListener("change", function(){ filt[key] = s.value; render(); }); return s;
    }
    var fs = sel("sb-status", [["all", "All statuses"], ["valid", "Active (incl. expiring soon)"], ["trial", "Free trial"], ["soon", "Expiring within 7 days"], ["expired", "Expired"], ["suspended", "Suspended"], ["grace", "Grace period"], ["none", "Not subscribed"]], "status");
    var fp = sel("sb-plan", [["all", "All plans"], ["trial", "Free trial"], ["monthly", "Monthly"], ["quarterly", "3-Month"], ["biannual", "6-Month"], ["exams", "Until exams"], ["custom", "Custom"]], "plan");
    var fc = sel("sb-cls", [["all", "All classes"]], "cls");
    var so = sel("sb-sort", [["expiry", "Sort: expiry (soonest)"], ["name", "Sort: name"], ["created", "Sort: newest accounts"]], "sort");
    var rf = el("button", "btn btn-secondary", "Refresh"); rf.type = "button"; rf.addEventListener("click", function(){ load(); });
    [q, fs, fp, fc, so, rf].forEach(function(n){ tb.appendChild(n); });
    var st = el("p", "admin-status"); st.id = "subs-status";
    body = el("div"); body.id = "subs-body";
    host.appendChild(tb); host.appendChild(st); host.appendChild(body);
  }
  function syncClassOptions(){
    var s = document.getElementById("sb-cls"); if(!s) return;
    var seen = {}; rows.forEach(function(u){ if(u.className) seen[u.className] = 1; });
    var cur = s.value, names = Object.keys(seen).sort();
    s.textContent = ""; var a = el("option", null, "All classes"); a.value = "all"; s.appendChild(a);
    names.forEach(function(n){ var o = el("option", null, n); o.value = n; s.appendChild(o); });
    s.value = names.indexOf(cur) >= 0 ? cur : "all";
  }
  function render(){
    if(!body) return; syncClassOptions();
    body.textContent = "";
    var c = counts(), tiles = el("div", "sb-tiles");
    [["valid", "Active subscriptions", c.active + c.soon], ["trial", "Free trials", c.trial], ["soon", "Expiring within 7 days", c.soon], ["expired", "Expired", c.expired],
     ["suspended", "Suspended", c.suspended], ["none", "Not subscribed", c.none], ["grace", "In grace period", c.grace]].forEach(function(t){
      var b = el("button", "sb-tile" + (filt.status === t[0] ? " on" : "")); b.type = "button";
      b.appendChild(el("b", null, String(t[2]))); b.appendChild(el("span", null, t[1]));
      b.addEventListener("click", function(){ filt.status = filt.status === t[0] ? "all" : t[0]; document.getElementById("sb-status").value = filt.status; render(); });
      tiles.appendChild(b);
    });
    body.appendChild(tiles);
    var note = el("p", "sb-note", "Accounts shown as Not subscribed are existing students from before this feature: they keep full access until you assign a plan. New accounts start a 24-hour free trial automatically.");
    body.appendChild(note);

    var list = visible(), ids = list.map(function(u){ return u.uid; });
    var nPicked = ids.filter(function(i){ return picked[i]; }).length;
    if(isAdmin()){
      var bar = el("div", "sb-bulk no-print");
      var all = el("input"); all.type = "checkbox"; all.checked = ids.length > 0 && nPicked === ids.length; all.title = "Select all shown";
      all.addEventListener("change", function(){ ids.forEach(function(i){ if(all.checked) picked[i] = 1; else delete picked[i]; }); render(); });
      bar.appendChild(all); bar.appendChild(el("span", null, nPicked + " selected of " + list.length + " shown"));
      var bb = el("button", "btn", "Assign subscription to selected"); bb.type = "button"; bb.disabled = nPicked === 0;
      bb.addEventListener("click", function(){ openDialog(list.filter(function(u){ return picked[u.uid]; }), true); });
      bar.appendChild(bb); body.appendChild(bar);
    }
    var wrap = el("div", "table-scroll"), t = el("table", "admin-table"), th = el("thead"), hr = el("tr");
    (isAdmin() ? [""] : []).concat(["Student", "Class", "Plan", "Status", "Started", "Expires", "Remaining", "Grace until", "Account created", "Last change", "Changed by", ""]).forEach(function(h){ hr.appendChild(el("th", null, h)); });
    th.appendChild(hr); t.appendChild(th);
    var tbd = el("tbody");
    list.forEach(function(u){
      var s = u.sub, stt = statusOf(u), tr = el("tr"); tr.style.cursor = "default";
      if(isAdmin()){
        var td0 = el("td"), cb = el("input"); cb.type = "checkbox"; cb.checked = !!picked[u.uid];
        cb.addEventListener("change", function(){ if(cb.checked) picked[u.uid] = 1; else delete picked[u.uid]; render(); });
        td0.appendChild(cb); tr.appendChild(td0);
      }
      var tn = el("td", "wrap-cell"); tn.appendChild(el("div", null, u.name || "(no name)")); var em = el("div", null, u.email); em.style.cssText = "font-size:11.5px;color:var(--muted)"; tn.appendChild(em); tr.appendChild(tn);
      tr.appendChild(el("td", null, u.className));
      tr.appendChild(el("td", null, s ? (s.plan === "trial" ? "Free trial" : (PLAN_LABEL[s.plan] || s.plan)) : "-"));
      var ts = el("td"), bd = el("span", "sb-badge", ST[stt][0]); bd.style.background = ST[stt][1]; ts.appendChild(bd); tr.appendChild(ts);
      tr.appendChild(el("td", null, s ? fmt(s.startMs) : "-"));
      tr.appendChild(el("td", null, s ? fmt(s.expiryMs) : "-"));
      tr.appendChild(el("td", null, s ? (s.suspended ? "paused" : left(s.expiryMs)) : "-"));
      tr.appendChild(el("td", null, s && s.graceMs ? fmt(s.graceMs) : "-"));
      tr.appendChild(el("td", null, fmt(u.createdMs)));
      tr.appendChild(el("td", null, s && s.modifiedMs ? fmt(s.modifiedMs) : "-"));
      tr.appendChild(el("td", null, s && s.by ? s.by : (s ? "Automatic trial" : "-")));
      var ta = el("td"), mb = el("button", "btn btn-secondary", isAdmin() ? "Manage" : "History"); mb.type = "button";
      mb.addEventListener("click", function(){ openDialog([u], false); }); ta.appendChild(mb); tr.appendChild(ta);
      tbd.appendChild(tr);
    });
    t.appendChild(tbd); wrap.appendChild(t); body.appendChild(wrap);
    if(!list.length) body.appendChild(el("p", "admin-status", "No students match these filters."));
  }

  // ---- dialog: choose -> review -> result ----
  function closeDlg(){ var d = document.getElementById("sb-dlg"); if(d) d.remove(); }
  function field(grid, label, node){ var l = el("label", null, label); grid.appendChild(l); grid.appendChild(node); return node; }
  function mkSel(opts){ var s = el("select"); opts.forEach(function(o){ var op = el("option", null, o[1]); op.value = o[0]; s.appendChild(op); }); return s; }

  function openDialog(targets, bulk){
    closeDlg();
    var dlg = el("div", "sb-dlg"); dlg.id = "sb-dlg";
    var box = el("div", "sb-box"); dlg.appendChild(box); document.body.appendChild(dlg);
    dlg.addEventListener("mousedown", function(e){ if(e.target === dlg) closeDlg(); });
    var one = bulk ? null : targets[0];
    box.appendChild(el("h3", null, bulk ? "Assign subscription to " + targets.length + " students" : one.name));
    var sub = el("div", "admin-status", bulk ? "Every selected account gets the plan you choose below." : one.email + (one.className ? " - " + one.className : ""));
    box.appendChild(sub);
    var form = el("div"); box.appendChild(form);
    var cur = one && one.sub;
    var g = el("div", "sb-grid"); form.appendChild(g);

    var actions = bulk ? [["assign", "Assign plan"]] :
      [["assign", "Assign / change plan"], ["extend", "Extend"], ["expiry", "Set expiry date"], ["suspend", "Suspend access"], ["reactivate", "Reactivate"], ["grace", "Grace period"]];
    var act = field(g, "Action", mkSel(actions));
    var plan = field(g, "Plan", mkSel([["monthly", "Monthly (1 calendar month)"], ["quarterly", "3-Month"], ["biannual", "6-Month"], ["exams", "Until exams"], ["custom", "Custom dates"], ["trial", "Free trial (24 hours)"]]));
    var startIn = el("input"); startIn.type = "datetime-local"; startIn.value = toInput(Date.now()); var startRow = field(g, "Starts", startIn);
    var endIn = el("input"); endIn.type = "datetime-local"; var endRow = field(g, "Expires", endIn);
    var preset = mkSel([["", "Pick a date by hand"]]); var presetRow = field(g, "Exam date preset", preset);
    var modeSel = mkSel([["A", "A: extend from the current expiry date"], ["B", "B: start immediately (replace the current period)"]]); var modeRow = field(g, "Extension", modeSel);
    var graceSel = mkSel([["24", "24 hours"], ["48", "48 hours"], ["custom", "Custom hours"], ["off", "Remove grace period"]]); var graceRow = field(g, "Grace", graceSel);
    var graceH = el("input"); graceH.type = "number"; graceH.min = "1"; graceH.max = "720"; graceH.value = "72"; var graceHRow = field(g, "Custom hours", graceH);
    var reason = el("input"); reason.type = "text"; reason.maxLength = 200; reason.placeholder = "Optional note for the history"; field(g, "Reason", reason);

    // predefined exam dates from the timetable data when available (end of the last paper of the series)
    try{
      var T = window.PQ_TIMETABLE, last = {};
      if(T && T.subjects) T.subjects.forEach(function(sj){ sj.papers.forEach(function(p){ var d = T.year + "-" + p[3]; if(!last[sj.qual] || d > last[sj.qual]) last[sj.qual] = d; }); });
      var P = []; if(last.IG) P.push(["IGCSE series ends (last paper) - " + last.IG, last.IG]); if(last["91"]) P.push(["9-1 series ends (last paper) - " + last["91"], last["91"]]);
      P.push(["AS 9618 Paper 22 - 2027-05-13", "2027-05-13"], ["A2 9618 Paper 32 - 2027-05-21", "2027-05-21"]);
      P.forEach(function(x){ var o = el("option", null, x[0] + " (23:59)"); o.value = x[1] + "T23:59"; preset.appendChild(o); });
    }catch(e){}
    preset.addEventListener("change", function(){ if(preset.value) endIn.value = preset.value; });

    var errBox = el("p", "sb-bad"); form.appendChild(errBox);
    function vis(n, on){ var i = Array.prototype.indexOf.call(g.children, n); if(i < 0) return; g.children[i].style.display = on ? "" : "none"; g.children[i - 1].style.display = on ? "" : "none"; }
    function sync(){
      var a = act.value, p = plan.value;
      var usesPlan = a === "assign" || a === "extend";
      vis(plan, usesPlan);
      vis(startIn, a === "assign");
      vis(endIn, (usesPlan && (p === "exams" || p === "custom")) || a === "expiry");
      vis(preset, (usesPlan && p === "exams") || a === "expiry");
      vis(modeSel, a === "extend");
      vis(graceSel, a === "grace"); vis(graceH, a === "grace" && graceSel.value === "custom");
      var noSub = !bulk && !cur;
      errBox.textContent = (noSub && ["extend", "expiry", "suspend", "reactivate"].indexOf(a) >= 0) ? "This is an existing student with no subscription yet. Use Assign / change plan first." : "";
    }
    [act, plan, graceSel].forEach(function(n){ n.addEventListener("change", sync); }); sync();

    // history (single)
    var histBox = el("div");
    if(!bulk){
      histBox.appendChild(el("h4", null, "Subscription history"));
      var hl = el("p", "admin-status", "Loading history..."); histBox.appendChild(hl);
      window.PQFirebase.subHistoryList(one.uid).then(function(list){
        histBox.removeChild(hl);
        var tbl = el("table", "sb-hist"); tbl.style.width = "100%";
        var hh = el("tr"); ["When", "Action", "Plan", "Previous expiry", "New expiry", "By", "Reason"].forEach(function(x){ hh.appendChild(el("th", null, x)); }); tbl.appendChild(hh);
        var any = false;
        list.forEach(function(x){ any = true; var r = el("tr");
          [fmt(x.atMs), x.action, PLAN_LABEL[x.plan] || x.plan, x.prevExpiryMs ? fmt(x.prevExpiryMs) : "-", x.newExpiryMs ? fmt(x.newExpiryMs) : "-", x.by, x.reason || ""].forEach(function(v){ r.appendChild(el("td", null, v)); });
          tbl.appendChild(r); });
        if(one.sub && one.sub.isTrial === true && !list.some(function(x){ return x.action === "trial"; }) && one.createdMs){
          var r2 = el("tr"); [fmt(one.createdMs), "trial", "Free trial (24 h)", "-", fmt(one.createdMs + DAY), "Automatic", "Account created"].forEach(function(v){ r2.appendChild(el("td", null, v)); }); tbl.appendChild(r2); any = true; }
        histBox.appendChild(any ? tbl : el("p", "admin-status", "No changes recorded yet."));
      }, function(){ hl.textContent = "Could not load history."; });
    }
    box.appendChild(histBox);

    var btns = el("div", "sb-actions");
    var cancel = el("button", "btn btn-secondary", "Close"); cancel.type = "button"; cancel.addEventListener("click", closeDlg);
    var next = el("button", "btn", "Review changes"); next.type = "button";
    btns.appendChild(cancel); if(isAdmin()) btns.appendChild(next); else { form.style.display = "none"; }
    box.appendChild(btns);

    // compute the item for one student
    function itemFor(u){
      var a = act.value, now = Date.now(), s = u.sub, p = plan.value;
      var it = { uid: u.uid, action: a, reason: reason.value.trim(), prevPlan: s ? s.plan : "", prevExpiryMs: s ? s.expiryMs : 0 };
      var endMs = endIn.value ? fromInput(endIn.value) : 0;
      if(a === "assign"){
        var st0 = fromInput(startIn.value) || now, ex = planEnd(p, st0, endMs);
        if(!ex || ex <= st0) throw new Error("Choose an expiry date after the start date.");
        it.action = s ? "change" : "assign"; it.plan = p; it.startMs = st0; it.expiryMs = ex; it.suspended = false; it.graceMs = 0;
      } else if(a === "extend"){
        var base = (modeSel.value === "A" && s && s.expiryMs > now) ? s.expiryMs : now;
        var ex2 = planEnd(p, base, endMs);
        if(!ex2 || ex2 <= base) throw new Error("Choose an expiry date after the start date.");
        it.action = "extend"; it.plan = p === "trial" ? (s ? s.plan : "custom") : p;
        it.startMs = modeSel.value === "A" && s && s.startMs ? s.startMs : now; it.expiryMs = ex2; it.suspended = false; it.graceMs = 0;
      } else if(a === "expiry"){
        if(!s) throw new Error("Assign a plan first."); if(!endMs) throw new Error("Choose the new expiry date.");
        it.action = "expiry-date"; it.plan = s.plan; it.startMs = s.startMs || now; it.expiryMs = endMs; it.suspended = s.suspended; it.graceMs = s.graceMs || 0;
      } else if(a === "suspend" || a === "reactivate"){
        if(!s) throw new Error("Assign a plan first.");
        it.plan = s.plan; it.startMs = s.startMs || now; it.expiryMs = s.expiryMs; it.suspended = a === "suspend"; it.graceMs = s.graceMs || 0;
      } else if(a === "grace"){
        if(!s) throw new Error("Assign a plan first.");
        var h = graceSel.value === "off" ? 0 : (graceSel.value === "custom" ? Number(graceH.value) : Number(graceSel.value));
        if(graceSel.value !== "off" && !(h >= 1 && h <= 720)) throw new Error("Enter grace hours between 1 and 720.");
        it.plan = s.plan; it.startMs = s.startMs || now; it.expiryMs = s.expiryMs; it.suspended = s.suspended; it.graceMs = h ? now + h * 3600000 : 0;
        if(!h) it.reason = it.reason || "Grace period removed";
      }
      it.expectExpiryMs = s ? s.expiryMs : 0;
      return it;
    }
    next.addEventListener("click", function(){
      var items;
      try{ items = targets.map(itemFor); }catch(e){ errBox.textContent = e.message; return; }
      if(errBox.textContent) return;
      review(items);
    });

    function review(items){
      form.style.display = "none"; histBox.style.display = "none"; btns.textContent = "";
      var rv = el("div"); box.insertBefore(rv, btns);
      rv.appendChild(el("h4", null, "Review before saving"));
      var one1 = items[0], a0 = one1.action, lab = { assign: "Assign plan", change: "Change plan", extend: "Extend", "expiry-date": "Set expiry date", suspend: "Suspend access", reactivate: "Reactivate", grace: "Grace period" };
      rv.appendChild(el("p", null, (lab[a0] || a0) + (bulk ? " for " + items.length + " students" : "")));
      var t = el("table", "sb-cmp"); var h1 = el("tr"); ["", "Current", "New"].forEach(function(x){ h1.appendChild(el("th", null, x)); }); t.appendChild(h1);
      function row(l, a, b){ var r = el("tr"); r.appendChild(el("th", null, l)); r.appendChild(el("td", null, a)); r.appendChild(el("td", null, b)); t.appendChild(r); }
      if(bulk){
        row("Plan", "(varies)", PLAN_LABEL[one1.plan] || one1.plan);
        row("Starts", "-", fmt(one1.startMs));
        row("Expires", "(varies)", fmt(one1.expiryMs));
        var ex = el("p", "sb-note", "Students affected: " + items.length + ". Plan: " + (PLAN_LABEL[one1.plan] || one1.plan) + ". Start/expiry are the same for everyone; a calendar-month plan is worked out from each start date."); rv.appendChild(t); rv.appendChild(ex);
      } else {
        row("Plan", cur ? (PLAN_LABEL[cur.plan] || cur.plan) : "Not subscribed", PLAN_LABEL[one1.plan] || one1.plan);
        row("Expires", cur ? fmt(cur.expiryMs) : "-", fmt(one1.expiryMs));
        row("Access", cur && cur.suspended ? "Suspended" : "Allowed", one1.suspended ? "Suspended" : "Allowed");
        row("Grace until", cur && cur.graceMs ? fmt(cur.graceMs) : "-", one1.graceMs ? fmt(one1.graceMs) : "-");
        rv.appendChild(t);
      }
      var back = el("button", "btn btn-secondary", "Back"); back.type = "button";
      var go = el("button", "btn", bulk ? "Confirm and apply to " + items.length : "Confirm and save"); go.type = "button";
      btns.appendChild(back); btns.appendChild(go);
      back.addEventListener("click", function(){ rv.remove(); form.style.display = ""; histBox.style.display = ""; btns.textContent = ""; btns.appendChild(cancel); btns.appendChild(next); });
      go.addEventListener("click", function(){
        go.disabled = true; back.disabled = true; go.textContent = "Saving...";
        var c = ctx();
        window.PQFirebase.assignSubscriptions(items, c.name, c.uid).then(function(res){
          rv.textContent = "";
          var okN = res.ok.length, bad = res.failed;
          rv.appendChild(el("h4", null, "Result"));
          rv.appendChild(el("p", okN && !bad.length ? "sb-good" : "sb-bad", okN + " of " + items.length + " account" + (items.length === 1 ? "" : "s") + " updated" + (bad.length ? ", " + bad.length + " failed." : ".")));
          if(bad.length){
            var names = {}; rows.forEach(function(u){ names[u.uid] = u.name || u.email; });
            var ul = el("ul"); bad.forEach(function(f){ ul.appendChild(el("li", null, (names[f.uid] || f.uid) + ": " + f.error)); }); rv.appendChild(ul);
          }
          btns.textContent = ""; var done = el("button", "btn", "Done"); done.type = "button";
          done.addEventListener("click", function(){ closeDlg(); picked = {}; load(); }); btns.appendChild(done);
        });
      });
    }
  }

  window.__subsOpened = function(){ build(); if(!loaded) load(); else render(); };
})();
