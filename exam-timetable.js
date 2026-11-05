(function(){
  "use strict";
  var D = window.PQ_TIMETABLE, LS = "pq_exam_plan_v1", MAXSUB = 14, TZ = 3 * 3600000;
  var GROUPS = ["Sciences", "Mathematics", "Computing", "Languages", "Humanities and business"];
  var QUICK = { "91": ["Biology", "Chemistry", "Physics", "Mathematics", "First Language English", "Computer Science"], "IG": ["Biology", "Chemistry", "Physics", "Mathematics (without coursework)", "First Language English", "Computer Science"] };
  var state = { qual: "91", tier: "E", subs: [], prac: {}, keyAM: "08:00", keyPM: "13:30", view: "list", showDone: false };
  var user = null, saveTimer = 0, saveMsg = "";
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function gcls(g){ return "g-" + String(g).split(" ")[0]; }
  function dur(m){ var h = Math.floor(m / 60), r = m % 60; return (h ? h + "h" : "") + (h && r ? " " : "") + (r ? r + "m" : ""); }
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function hhmm(ms){ var d = new Date(ms + TZ); return pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()); }
  function dayNum(ms){ var d = new Date(ms + TZ); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000); }
  function dateLong(iso){ var p = iso.split("-"); return new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }); }
  function dateShort(iso){ var p = iso.split("-"); return new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }); }
  function parseKey(v, def){ var m = /^(\d{1,2}):(\d{2})$/.exec(v || ""); return m && +m[1] < 24 && +m[2] < 60 ? [+m[1], +m[2]] : def; }
  function paperLabel(c){ return c.charAt(0) === "0" ? "Paper " + c.charAt(1) : "Paper " + c.charAt(0) + " · Variant " + c.charAt(1); }
  function subjectsFor(q){ return D.subjects.filter(function(s){ return s.qual === q; }); }
  function hasPractical(s){ return s.papers.some(function(p){ return p[1] === "Practical"; }); }
  function hasTests(s){ return s.papers.some(function(p){ return p[1] === "Practical test"; }); }
  function testOpts(s, d, cur){ return s.papers.filter(function(p){ return p[1] === "Practical test" && p[0].charAt(0) === d; }).map(function(p){ var m = p[3].split("-"); return '<option value="' + p[0].charAt(1) + '"' + (cur === p[0].charAt(1) ? " selected" : "") + ">Variant " + p[0].charAt(1) + " (" + dshort2(p[3]) + ")</option>"; }).join(""); }
  function dshort2(md){ var m = md.split("-"); return new Date(Date.UTC(D.year, m[0] - 1, +m[1])).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" }); }
  function tiered(s){ return s.papers.some(function(p){ return p[2] !== "A"; }); }

  // ---------- store ----------
  function toItems(){ return state.subs.map(function(n){ return state.qual + "|" + state.tier + "|" + n + "|" + (state.prac[n] || ""); }); }
  function fromItems(items, keyAM, keyPM){
    var subs = [], prac = {}, qual = state.qual, tier = state.tier;
    (items || []).forEach(function(it, i){ var p = String(it).split("|"); if(p.length < 3) return; if(i === 0){ qual = p[0] === "IG" ? "IG" : "91"; tier = p[1] === "C" ? "C" : "E"; } if(subs.indexOf(p[2]) < 0) subs.push(p[2]); if(/^([56]|[12]{2})$/.test(p[3])) prac[p[2]] = p[3]; });
    state.qual = qual; state.tier = tier; state.subs = subs; state.prac = prac;
    if(parseKey(keyAM, null)) state.keyAM = keyAM; if(parseKey(keyPM, null)) state.keyPM = keyPM;
  }
  function cleanSubs(){ var ok = subjectsFor(state.qual).map(function(s){ return s.name; }); state.subs = state.subs.filter(function(n){ return ok.indexOf(n) > -1; }); }
  function save(){
    try { localStorage.setItem(LS, JSON.stringify({ items: toItems(), keyAM: state.keyAM, keyPM: state.keyPM, view: state.view })); } catch(e){}
    clearTimeout(saveTimer);
    if(user && window.PQFirebase && PQFirebase.saveExamPlan){
      saveMsg = "Saving…"; paintSave();
      saveTimer = setTimeout(function(){ PQFirebase.saveExamPlan(user.uid, { items: toItems(), keyAM: state.keyAM, keyPM: state.keyPM }).then(function(r){ saveMsg = r.ok ? "Saved to your account." : "Saved on this device only (account save failed: " + esc(r.code) + ")."; paintSave(); }); }, 900);
    } else { saveMsg = "Saved on this device. <a href=\"quiz.html\">Log in</a> to keep it on every device."; paintSave(); }
  }
  function paintSave(){ var e = $("tt-save"); if(e) e.innerHTML = saveMsg; }
  function load(){ try { var j = JSON.parse(localStorage.getItem(LS) || "null"); if(j){ fromItems(j.items, j.keyAM, j.keyPM); if(j.view === "cal") state.view = "cal"; } } catch(e){} }

  // ---------- papers ----------
  function papers(){
    var out = [], aM = parseKey(state.keyAM, [8, 0]), pM = parseKey(state.keyPM, [13, 30]);
    D.subjects.forEach(function(s){
      if(s.qual !== state.qual || state.subs.indexOf(s.name) < 0) return;
      s.papers.forEach(function(p){
        if(!D.pick(p, state.tier, state.prac[s.name])) return;
        var m = p[3].split("-"), t = p[4] === "PM" ? pM : aM, start = Date.UTC(D.year, m[0] - 1, +m[1], t[0] - 3, t[1]);
        out.push({ subject: s.name, group: s.group, code: s.base + "/" + p[0], paper: paperLabel(p[0]), type: p[1], tier: p[2] === "C" ? "Core" : p[2] === "E" ? "Extended" : "", session: p[4], iso: D.year + "-" + m[0] + "-" + m[1], mins: p[5], start: start, end: start + p[5] * 60000 });
      });
    });
    return out.sort(function(a, b){ return a.start - b.start || a.subject.localeCompare(b.subject); });
  }

  // ---------- setup ----------
  function paintSetup(){
    var h = '<h2 class="step-title">Build your timetable</h2><div class="tt-lab" style="margin-top:4px">1 &middot; Qualification</div><div class="tt-seg">' +
      [["91", "IGCSE (9–1)"], ["IG", "IGCSE (A*–G)"]].map(function(x){ return '<button type="button" data-q="' + x[0] + '" aria-pressed="' + (state.qual === x[0]) + '">' + x[1] + "</button>"; }).join("") + "</div>" +
      '<div class="tt-lab">2 &middot; Tier</div><div class="tt-seg">' + [["E", "Extended"], ["C", "Core"]].map(function(x){ return '<button type="button" data-t="' + x[0] + '" aria-pressed="' + (state.tier === x[0]) + '">' + x[1] + "</button>"; }).join("") + '</div><p class="tt-hint">Sciences, Mathematics and English (as an Additional Language) have Core and Extended papers.</p>' +
      '<div class="tt-lab">3 &middot; Your subjects <span style="text-transform:none;letter-spacing:0;font-weight:600">(' + state.subs.length + " chosen, up to " + MAXSUB + ')</span></div>' +
      '<div class="tt-seg"><button type="button" data-quick="1">Quick start: sciences + maths + English + computer science</button>' + (state.subs.length ? '<button type="button" data-clear="1">Clear all</button>' : "") + "</div>";
    if(state.subs.length){
      h += '<div class="tt-chips" aria-label="Your chosen subjects">' + state.subs.map(function(n){ return '<span class="tt-chip">' + esc(n) + '<button type="button" data-rm="' + esc(n) + '" aria-label="Remove ' + esc(n) + '">\u2715</button></span>'; }).join("") + "</div>";
    }
    var pool = subjectsFor(state.qual).filter(function(s){ return state.subs.indexOf(s.name) < 0; });
    h += '<div class="tt-more"><label for="more-sel"><b>Add any other subject from the timetable</b></label><select id="more-sel" aria-label="Add another subject"><option value="">Choose a subject\u2026</option>' +
      GROUPS.map(function(g){ var l = pool.filter(function(s){ return s.group === g; }).sort(function(a, b){ return a.name.localeCompare(b.name); }); return l.length ? '<optgroup label="' + esc(g) + '">' + l.map(function(s){ return '<option value="' + esc(s.name) + '">' + esc(s.name) + " (" + esc(s.base) + ")</option>"; }).join("") + "</optgroup>" : ""; }).join("") + "</select></div>";
    GROUPS.forEach(function(g){
      var list = subjectsFor(state.qual).filter(function(s){ return s.group === g && !s.more; }); if(!list.length) return;
      h += '<div class="tt-lab">' + esc(g) + '</div><div class="tt-grid">' + list.map(function(s){
        var on = state.subs.indexOf(s.name) > -1;
        return "<div><button type=\"button\" class=\"tt-sub " + gcls(g) + '" data-sub="' + esc(s.name) + '" aria-pressed="' + on + '"><b>' + esc(s.name) + "</b><small>" + esc(s.base) + (tiered(s) ? " · Core/Extended" : "") + "</small></button>" +
          (on && hasTests(s) ? '<div class="tt-prac"><label for="t2-' + esc(s.base) + '">Paper 2 (practical):</label><select id="t2-' + esc(s.base) + '" data-test="' + esc(s.name) + '|0">' + testOpts(s, "2", (state.prac[s.name] || "11").charAt(0)) + '</select></div><div class="tt-prac"><label for="t3-' + esc(s.base) + '">Paper 3 (practical):</label><select id="t3-' + esc(s.base) + '" data-test="' + esc(s.name) + '|1">' + testOpts(s, "3", (state.prac[s.name] || "11").charAt(1)) + '</select></div><p class="tt-hint" style="margin:4px 0 0 5px">Ask your teacher which variant your school sits.</p>' : "") + (on && hasPractical(s) ? '<div class="tt-prac"><label for="pr-' + esc(s.base) + '">Practical paper:</label><select id="pr-' + esc(s.base) + '" data-prac="' + esc(s.name) + '"><option value="5"' + ((state.prac[s.name] || "5") === "5" ? " selected" : "") + '>Practical (Paper 5)</option><option value="6"' + (state.prac[s.name] === "6" ? " selected" : "") + ">Alternative to Practical (Paper 6)</option></select></div>" : "") + "</div>";
      }).join("") + "</div>";
    });
    h += '<div class="tt-lab">4 &middot; Your centre\'s start times <span style="text-transform:none;letter-spacing:0;font-weight:600">(optional, Saudi Arabia time)</span></div><div class="tt-keys"><label>Morning (AM) papers<input type="time" id="k-am" value="' + esc(state.keyAM) + '"></label><label>Afternoon (PM) papers<input type="time" id="k-pm" value="' + esc(state.keyPM) + '"></label></div>' +
      '<p class="tt-hint">Cambridge publishes only the session (AM or PM). Until you enter the real start time from your school, the countdown uses 08:00 and 13:30 as an estimate.</p><p class="tt-save" id="tt-save">' + saveMsg + "</p>";
    $("tt-setup").innerHTML = h;
  }

  // ---------- output ----------
  function plural(n, w){ return n + " " + w + (n === 1 ? "" : "s"); }
  function paintOut(){
    var ps = papers(), now = Date.now(), box = $("tt-out");
    if(!ps.length){ box.innerHTML = '<div class="tt-empty"><b>Choose your subjects above</b><br>Your personal timetable and the countdown to your first exam appear here.</div>'; return; }
    var today = dayNum(now), first = ps[0], last = ps[ps.length - 1], nxt = ps.filter(function(p){ return p.end > now; })[0];
    var days = Math.round(Date.parse(first.iso + "T00:00:00Z") / 86400000) - today, h = "";
    var bigN, bigU, bigP;
    if(days > 0){ bigN = days; bigU = days === 1 ? "day to go" : "days to go"; bigP = "until your first exam: <b>" + esc(first.subject) + "</b> " + esc(first.paper) + ", " + esc(dateLong(first.iso)); }
    else if(nxt){ bigN = Math.max(0, Math.round(Date.parse(nxt.iso + "T00:00:00Z") / 86400000) - today); bigU = bigN === 0 ? "exam today" : "days to next exam"; bigP = "<b>" + esc(nxt.subject) + "</b> " + esc(nxt.paper) + ", " + esc(dateLong(nxt.iso)); }
    else { bigN = "✓"; bigU = "all exams finished"; bigP = "Well done. Good luck with your results."; }
    h += '<div class="tt-hero"><div class="tt-big"><span class="n">' + bigN + '</span><span class="u">' + bigU + "</span><p>" + bigP + "</p></div>";
    if(nxt){
      var ms = Math.max(0, nxt.start - now), d = Math.floor(ms / 86400000), hr = Math.floor(ms % 86400000 / 3600000), mi = Math.floor(ms % 3600000 / 60000), started = nxt.start <= now;
      h += '<div class="tt-next"><h3>Next paper</h3><b style="font-size:17px">' + esc(nxt.subject) + '</b><div class="tt-hint" style="margin:0"><span class="tt-code">' + esc(nxt.code) + "</span> &middot; " + esc(nxt.paper) + (nxt.tier ? " &middot; " + nxt.tier : "") + " &middot; " + esc(nxt.session) + " &middot; " + dur(nxt.mins) + "</div>" +
        (started ? '<p style="margin:10px 0 0;font-weight:800;color:var(--accent-dark)">In progress now</p>' : '<div class="tt-clock" role="timer"><div><b>' + d + "</b><span>days</span></div><div><b>" + pad(hr) + "</b><span>hours</span></div><div><b>" + pad(mi) + "</b><span>minutes</span></div></div>") + "</div>";
    }
    h += "</div>";
    // stats and clashes
    var dayset = {}, slot = {}; ps.forEach(function(p){ dayset[p.iso] = 1; (slot[p.iso + p.session] = slot[p.iso + p.session] || []).push(p); });
    var dl = Object.keys(dayset).sort(), gap = 0, gapFrom = "", gapTo = "";
    for(var i = 1; i < dl.length; i++){ var g = Math.round((Date.parse(dl[i] + "T00:00:00Z") - Date.parse(dl[i - 1] + "T00:00:00Z")) / 86400000) - 1; if(g > gap){ gap = g; gapFrom = dl[i - 1]; gapTo = dl[i]; } }
    var clashes = Object.keys(slot).filter(function(k){ return slot[k].length > 1; });
    h += '<div class="tt-stats"><div class="tt-stat"><b>' + ps.length + "</b><span>papers</span></div><div class=\"tt-stat\"><b>" + dl.length + "</b><span>exam days</span></div><div class=\"tt-stat\"><b>" + esc(dateShort(last.iso)) + "</b><span>last paper</span></div><div class=\"tt-stat\"><b>" + (gap > 0 ? plural(gap, "day") : "-") + "</b><span>longest revision gap" + (gap > 0 ? " (" + esc(gapFrom.slice(5)) + " to " + esc(gapTo.slice(5)) + ")" : "") + "</span></div></div>";
    if(clashes.length) h += '<div class="tt-warn" role="alert"><b>Timetable clash:</b> ' + clashes.map(function(k){ var a = slot[k]; return esc(dateShort(a[0].iso)) + " " + a[0].session + " (" + a.map(function(p){ return esc(p.subject) + " " + esc(p.code); }).join(" and ") + ")"; }).join("; ") + ". Two papers in the same session: ask your exam officer about a timetable deviation. If a clash only appears because you picked Core and Extended papers together, check your tier.</div>";
    h += '<div class="tt-bar tt-no-print"><div class="tt-seg" style="margin:0"><button type="button" data-view="list" aria-pressed="' + (state.view === "list") + '">List</button><button type="button" data-view="cal" aria-pressed="' + (state.view === "cal") + '">Calendar</button></div><div class="tt-seg" style="margin:0"><button type="button" data-ics="all">Add all to calendar (.ics)</button><button type="button" data-print="1">Print</button>' + doneBtn(ps, now) + '</div></div>';
    h += state.view === "cal" ? calendar(ps) : list(ps, now, today, slot);
    box.innerHTML = h;
  }
  function doneBtn(ps, now){
    var n = ps.filter(function(p){ return p.end <= now; }).length;
    return n ? '<button type="button" data-done="1">' + (state.showDone ? "Hide finished exams" : "Show finished exams (" + n + ")") + "</button>" : "";
  }
  function badge(p, now, today){
    if(p.end <= now) return '<span class="tt-pill">done</span>';
    var dd = Math.round(Date.parse(p.iso + "T00:00:00Z") / 86400000) - today;
    return '<span class="tt-pill cd">' + (dd <= 0 ? (p.start <= now ? "in progress" : "today") : dd === 1 ? "tomorrow" : "in " + dd + " days") + "</span>";
  }
  function list(ps, now, today, slot){
    var h = "", cur = "", perDay = {}; ps.forEach(function(p){ if(p.end > now || state.showDone) perDay[p.iso] = (perDay[p.iso] || 0) + 1; });
    ps.forEach(function(p, i){
      if(p.end <= now && !state.showDone) return;
      if(p.iso !== cur){ cur = p.iso; var dd = Math.round(Date.parse(p.iso + "T00:00:00Z") / 86400000) - today; h += '<div class="tt-day"><h3>' + esc(dateLong(p.iso)) + "</h3><span>" + (dd < 0 ? "" : dd === 0 ? "today" : dd === 1 ? "tomorrow" : "in " + dd + " days") + (perDay[p.iso] > 1 ? " &middot; " + perDay[p.iso] + " papers" : "") + "</span></div>"; }
      var clash = slot[p.iso + p.session].length > 1;
      h += '<div class="tt-row ' + gcls(p.group) + (p.end <= now ? " done" : "") + (clash ? " clash" : "") + '"><div class="a"><b>' + esc(p.subject) + '</b><small><span class="tt-code">' + esc(p.code) + "</span> &middot; " + esc(p.paper) + " &middot; " + esc(p.type) + (p.tier ? " &middot; " + p.tier : "") + '</small></div><div class="b"><span class="tt-pill ' + (p.session === "PM" ? "pm" : "am") + '">' + (p.session === "DAY" ? "TEST DAY" : p.session) + "</span><span>" + (p.session === "DAY" ? "date set by Cambridge, your school sets the time" : hhmm(p.start) + "\u2013" + hhmm(p.end)) + " <small style=\"color:var(--muted)\">(" + dur(p.mins) + ")</small></span>" + (clash ? '<span class="tt-pill warn">clash</span>' : "") + badge(p, now, today) + '<button class="btn btn-secondary sm tt-no-print" type="button" data-ics="' + i + '" aria-label="Add ' + esc(p.subject) + " " + esc(p.code) + ' to calendar">+ Calendar</button></div></div>';
    });
    return h;
  }
  function calendar(ps){
    var by = {}; ps.forEach(function(p){ (by[p.iso] = by[p.iso] || []).push(p); });
    var out = '<div class="tt-months">';
    [[3, "April"], [4, "May"], [5, "June"]].forEach(function(m){
      var first = new Date(Date.UTC(D.year, m[0], 1)), lead = first.getUTCDay(), n = new Date(Date.UTC(D.year, m[0] + 1, 0)).getUTCDate();
      out += '<div class="tt-month"><h3>' + m[1] + " " + D.year + '</h3><div class="tt-cal">' + ["S", "M", "T", "W", "T", "F", "S"].map(function(x){ return '<div class="h">' + x + "</div>"; }).join("");
      for(var i = 0; i < lead; i++) out += '<div class="c off"></div>';
      for(var d = 1; d <= n; d++){
        var iso = D.year + "-" + pad(m[0] + 1) + "-" + pad(d), a = by[iso] || [];
        out += '<div class="c' + (a.length ? " has" : "") + '"' + (a.length ? ' title="' + esc(a.map(function(p){ return p.subject + " " + p.code + " " + p.session; }).join(", ")) + '"' : "") + "><i>" + d + "</i>" + a.slice(0, 3).map(function(p){ return '<u class="' + gcls(p.group) + '">' + esc(p.code.slice(0, 4) + " " + p.session) + "</u>"; }).join("") + (a.length > 3 ? "<u>+" + (a.length - 3) + "</u>" : "") + "</div>";
      }
      out += "</div></div>";
    });
    return out + "</div>";
  }

  // ---------- calendar export ----------
  function z(ms){ return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, ""); }
  function ics(list){
    var L = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//iLearnCS//Exam timetable//EN", "CALSCALE:GREGORIAN"];
    list.forEach(function(p){ L.push("BEGIN:VEVENT", "UID:" + p.code.replace("/", "-") + "-" + p.iso + "@ilearncs", "DTSTAMP:" + z(Date.now()), "DTSTART:" + z(p.start), "DTEND:" + z(p.end), "SUMMARY:" + (p.subject + " " + p.code + " " + p.paper).replace(/[,;]/g, " "), "DESCRIPTION:Cambridge IGCSE " + p.session + " session. Duration " + dur(p.mins) + ". Start time may differ at your centre.", "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:Exam tomorrow", "END:VALARM", "END:VEVENT"); });
    L.push("END:VCALENDAR"); return L.join("\r\n");
  }
  function download(name, text){ var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([text], { type: "text/calendar" })); a.download = name; document.body.appendChild(a); a.click(); a.remove(); }

  // ---------- events ----------
  function change(){ cleanSubs(); save(); paintSetup(); paintOut(); }
  document.addEventListener("click", function(e){
    var b = e.target.closest("button"); if(!b) return;
    if(b.hasAttribute("data-q")){ if(state.qual !== b.getAttribute("data-q")){ state.qual = b.getAttribute("data-q"); state.subs = []; state.prac = {}; } change(); }
    else if(b.hasAttribute("data-t")){ state.tier = b.getAttribute("data-t"); change(); }
    else if(b.hasAttribute("data-sub")){ var n = b.getAttribute("data-sub"), i = state.subs.indexOf(n); if(i > -1) state.subs.splice(i, 1); else if(state.subs.length < MAXSUB) state.subs.push(n); else { saveMsg = "You can choose up to " + MAXSUB + " subjects."; } change(); }
    else if(b.hasAttribute("data-rm")){ var rn = b.getAttribute("data-rm"), ri = state.subs.indexOf(rn); if(ri > -1) state.subs.splice(ri, 1); change(); }
    else if(b.hasAttribute("data-quick")){ QUICK[state.qual].forEach(function(n){ if(state.subs.indexOf(n) < 0 && state.subs.length < MAXSUB) state.subs.push(n); }); change(); }
    else if(b.hasAttribute("data-clear")){ state.subs = []; state.prac = {}; change(); }
    else if(b.hasAttribute("data-view")){ state.view = b.getAttribute("data-view"); save(); paintOut(); }
    else if(b.hasAttribute("data-print")){ window.print(); }
    else if(b.hasAttribute("data-done")){ state.showDone = !state.showDone; paintOut(); }
    else if(b.hasAttribute("data-ics")){ var ps = papers(), k = b.getAttribute("data-ics"); if(k === "all") download("my-exam-timetable-2027.ics", ics(ps)); else if(ps[+k]) download(ps[+k].code.replace("/", "-") + ".ics", ics([ps[+k]])); }
  });
  document.addEventListener("change", function(e){
    var t = e.target;
    if(t.id === "more-sel"){ if(t.value && state.subs.length < MAXSUB && state.subs.indexOf(t.value) < 0){ state.subs.push(t.value); change(); } else if(t.value){ saveMsg = "You can choose up to " + MAXSUB + " subjects."; paintSetup(); } }
    else if(t.hasAttribute && t.hasAttribute("data-test")){ var tp = t.getAttribute("data-test").split("|"), cur = (state.prac[tp[0]] || "11").split(""); cur[+tp[1]] = t.value; state.prac[tp[0]] = cur.join(""); save(); paintOut(); }
    else if(t.hasAttribute && t.hasAttribute("data-prac")){ state.prac[t.getAttribute("data-prac")] = t.value; save(); paintOut(); }
    else if(t.id === "k-am" || t.id === "k-pm"){ if(parseKey(t.value, null)){ state[t.id === "k-am" ? "keyAM" : "keyPM"] = t.value; save(); paintOut(); } }
  });

  // ---------- Add to Home screen (Android / Chrome prompt, iPhone / iPad instructions) ----------
  var deferred = null, standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /android/i.test(navigator.userAgent), touchy = isIOS || isAndroid;
  function showSteps(list){ var o = $("tt-steps"); o.innerHTML = list.map(function(x){ return "<li>" + x + "</li>"; }).join(""); o.classList.remove("hidden"); }
  window.addEventListener("beforeinstallprompt", function(e){ e.preventDefault(); deferred = e; });
  window.addEventListener("appinstalled", function(){ $("tt-install").classList.add("hidden"); $("tt-steps").classList.add("hidden"); });
  if(!standalone) $("tt-install").classList.remove("hidden");
  $("btn-install").addEventListener("click", function(){
    if(deferred){ deferred.prompt(); deferred.userChoice.then(function(){ deferred = null; }); return; }
    if(isIOS) showSteps(["Open this page in <b>Safari</b> (it does not work from inside other apps).", "Tap the <b>Share</b> button (the square with an arrow, at the bottom or top of Safari).", "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. The <b>Exam timetable</b> icon now appears on your Home screen."]);
    else if(isAndroid) showSteps(["Open this page in <b>Chrome</b>.", "Tap the <b>\u22ee</b> menu (top right).", "Tap <b>Add to Home screen</b> (or <b>Install app</b>).", "Tap <b>Add</b>. The <b>Exam timetable</b> icon now appears on your Home screen."]);
    else showSteps(["Open this page <b>on your phone</b>: <a href=\"#\" id=\"cp-link\">copy the link</a> and send it to yourself (WhatsApp or email).", "<b>iPhone:</b> open it in Safari, tap <b>Share</b>, then <b>Add to Home Screen</b>.", "<b>Android:</b> open it in Chrome, tap the <b>\u22ee</b> menu, then <b>Add to Home screen</b>.", "On a computer with Chrome or Edge you can also use the install icon at the right end of the address bar."]);
    var cp = $("cp-link"); if(cp) cp.addEventListener("click", function(ev){ ev.preventDefault(); var u = location.href.split("#")[0]; (navigator.clipboard ? navigator.clipboard.writeText(u) : Promise.reject()).then(function(){ cp.textContent = "link copied"; }, function(){ window.prompt("Copy this link:", u); }); });
  });
  if("serviceWorker" in navigator) window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });

  // ---------- log in on this page (so the Home-screen app works on its own) ----------
  function doLogin(){
    var st = $("tl-st"), em = $("tl-email").value.trim(), pw = $("tl-pass").value;
    if(!em || !pw){ st.textContent = "Enter your email and password."; return; }
    if(!window.PQFirebase || !PQFirebase.logIn){ st.textContent = "Please wait a moment and try again."; return; }
    $("tl-go").disabled = true; st.textContent = "Logging in\u2026";
    PQFirebase.logIn(em, pw, true).then(function(r){ st.textContent = r && r.needsVerification ? "Please verify your email first (check your inbox), then log in." : ""; }).catch(function(err){ st.textContent = err.message || "Could not log in."; }).then(function(){ $("tl-go").disabled = false; });
  }
  $("tl-go").addEventListener("click", doLogin); $("tl-pass").addEventListener("keydown", function(e){ if(e.key === "Enter") doLogin(); });

  // ---------- boot ----------
  $("tt-ver").textContent = D.version;
  load(); cleanSubs(); paintSetup(); paintOut();
  setInterval(function(){ if(!document.hidden) paintOut(); }, 30000);
  (function boot(n){
    if(!window.PQFirebase || !PQFirebase.onAuthChange){ if(n < 40) setTimeout(function(){ boot(n + 1); }, 150); return; }
    PQFirebase.onAuthChange(function(u){
      user = u || null; $("tt-login").classList.toggle("hidden", !!user); if(!user){ saveMsg = "Saved on this device. <a href=\"quiz.html\">Log in</a> to keep it on every device."; paintSave(); return; }
      if(!PQFirebase.getExamPlan) return;
      PQFirebase.getExamPlan(user.uid).then(function(p){
        if(p && p.items && p.items.length){ fromItems(p.items, p.keyAM, p.keyPM); cleanSubs(); try { localStorage.setItem(LS, JSON.stringify({ items: toItems(), keyAM: state.keyAM, keyPM: state.keyPM, view: state.view })); } catch(e){} saveMsg = "Saved to your account."; paintSetup(); paintOut(); }
        else if(state.subs.length) save();
        else { saveMsg = "Your plan will be saved to your account."; paintSave(); }
      });
    });
  })(0);
})();
