(function(){
  "use strict";
  var D = window.PQ_TIMETABLE, LS = "pq_exam_plan_v1", TZ = 3 * 3600000, SHOW = 6, expanded = false;
  var plan = null, user = null;
  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function key(v, def){ var m = /^(\d{1,2}):(\d{2})$/.exec(v || ""); return m && +m[1] < 24 && +m[2] < 60 ? [+m[1], +m[2]] : def; }
  function dayNum(ms){ var d = new Date(ms + TZ); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000); }
  function dshort(iso){ var p = iso.split("-"); return new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" }); }
  function papers(){
    var out = [];
    if(!plan || !plan.items || !plan.items.length) return out;
    var aM = key(plan.keyAM, [8, 0]), pM = key(plan.keyPM, [13, 30]);
    plan.items.forEach(function(it){
      var x = String(it).split("|"), s = D.subjects.filter(function(o){ return o.qual === x[0] && o.name === x[2]; })[0]; if(!s) return;
      s.papers.forEach(function(p){
        if(p[2] !== "A" && p[2] !== x[1]) return;
        if((p[1] === "Practical" || p[1] === "Alternative to Practical") && p[0].charAt(0) !== (x[3] || "5")) return;
        var m = p[3].split("-"), t = p[4] === "AM" ? aM : pM, start = Date.UTC(D.year, m[0] - 1, +m[1], t[0] - 3, t[1]);
        out.push({ subject: s.name, group: s.group, code: s.base + "/" + p[0], session: p[4], iso: D.year + "-" + p[3], start: start, end: start + p[5] * 60000 });
      });
    });
    return out.sort(function(a, b){ return a.start - b.start || a.subject.localeCompare(b.subject); });
  }
  function paint(){
    var box = $("cd-out"), all = papers(), now = Date.now(), today = dayNum(now);
    if(!all.length){ box.innerHTML = '<div class="cd-empty"><b>No timetable yet</b><br>Choose your subjects first, then your countdown appears here.<br><br><a class="btn btn-primary" href="exam-timetable.html">Build my timetable</a></div>'; return; }
    var up = all.filter(function(p){ return p.end > now; });   // finished exams are removed here
    if(!up.length){ box.innerHTML = '<div class="cd-hero"><div class="n">\u2713</div><div class="u">All exams finished</div><p>Well done. Good luck with your results.</p></div>'; return; }
    var nx = up[0], days = Math.round(Date.parse(nx.iso + "T00:00:00Z") / 86400000) - today, ms = Math.max(0, nx.start - now), started = nx.start <= now;
    var h = '<div class="cd-hero"><div class="n">' + Math.max(days, 0) + '</div><div class="u">' + (days === 0 ? "exam today" : days === 1 ? "day to next exam" : "days to next exam") + "</div><p><b>" + esc(nx.subject) + "</b> \u00b7 " + esc(nx.code) + " \u00b7 " + esc(dshort(nx.iso)) + " " + nx.session + "</p>" +
      (started ? '<p><b style="color:var(--accent-dark)">In progress now</b></p>' : '<div class="cd-clock" role="timer"><div><b>' + Math.floor(ms / 86400000) + "</b><span>days</span></div><div><b>" + pad(Math.floor(ms % 86400000 / 3600000)) + "</b><span>hours</span></div><div><b>" + pad(Math.floor(ms % 3600000 / 60000)) + "</b><span>min</span></div></div>") + "</div>";
    var rest = up.slice(1), shown = expanded ? rest : rest.slice(0, SHOW);
    shown.forEach(function(p){
      var d = Math.round(Date.parse(p.iso + "T00:00:00Z") / 86400000) - today;
      h += '<div class="cd-row g-' + esc(p.group.split(" ")[0]) + (d <= 0 ? " today" : "") + '"><div><b>' + esc(p.subject) + "</b><small>" + esc(p.code) + " \u00b7 " + esc(dshort(p.iso)) + " \u00b7 " + p.session + '</small></div><div class="d"><i>' + Math.max(d, 0) + "</i><span>" + (d === 1 ? "day" : "days") + "</span></div></div>";
    });
    if(rest.length > SHOW) h += '<button class="btn btn-secondary cd-more" id="cd-more" type="button">' + (expanded ? "Show fewer" : "Show all " + rest.length + " upcoming") + "</button>";
    box.innerHTML = h;
    var mb = $("cd-more"); if(mb) mb.addEventListener("click", function(){ expanded = !expanded; paint(); });
  }
  function loadLocal(){ try { var j = JSON.parse(localStorage.getItem(LS) || "null"); if(j && j.items && j.items.length) plan = j; } catch(e){} }

  // Add to Home screen
  var deferred = null, standalone = (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || window.navigator.standalone === true;
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1), touchy = isIOS || /android/i.test(navigator.userAgent);
  window.addEventListener("beforeinstallprompt", function(e){ e.preventDefault(); deferred = e; });
  window.addEventListener("appinstalled", function(){ $("cd-install").classList.add("hidden"); $("cd-steps").classList.add("hidden"); });
  if(!standalone && touchy) $("cd-install").classList.remove("hidden");
  $("btn-install").addEventListener("click", function(){
    if(deferred){ deferred.prompt(); deferred.userChoice.then(function(){ deferred = null; }); return; }
    var steps = isIOS ? ["Open this page in <b>Safari</b>.", "Tap the <b>Share</b> button (square with an arrow).", "Scroll down and tap <b>Add to Home Screen</b>.", "Tap <b>Add</b>. The <b>Exam countdown</b> icon appears on your Home screen."]
      : ["Open this page in <b>Chrome</b>.", "Tap the <b>\u22ee</b> menu (top right).", "Tap <b>Add to Home screen</b> (or <b>Install app</b>).", "Tap <b>Add</b>. The <b>Exam countdown</b> icon appears on your Home screen."];
    var o = $("cd-steps"); o.innerHTML = steps.map(function(x){ return "<li>" + x + "</li>"; }).join(""); o.classList.remove("hidden");
  });
  if("serviceWorker" in navigator) window.addEventListener("load", function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });

  // Login (the Home-screen app does not share the browser's login)
  function doLogin(){
    var st = $("cl-st"), em = $("cl-email").value.trim(), pw = $("cl-pass").value;
    if(!em || !pw){ st.textContent = "Enter your email and password."; return; }
    if(!window.PQFirebase || !PQFirebase.logIn){ st.textContent = "Please wait a moment and try again."; return; }
    $("cl-go").disabled = true; st.textContent = "Logging in\u2026";
    PQFirebase.logIn(em, pw, true).then(function(r){ st.textContent = r && r.needsVerification ? "Please verify your email first, then log in." : ""; }).catch(function(err){ st.textContent = err.message || "Could not log in."; }).then(function(){ $("cl-go").disabled = false; });
  }
  $("cl-go").addEventListener("click", doLogin); $("cl-pass").addEventListener("keydown", function(e){ if(e.key === "Enter") doLogin(); });

  loadLocal(); paint();
  setInterval(function(){ if(!document.hidden) paint(); }, 30000);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) paint(); });
  (function boot(n){
    if(!window.PQFirebase || !PQFirebase.onAuthChange){ if(n < 40) setTimeout(function(){ boot(n + 1); }, 150); return; }
    PQFirebase.onAuthChange(function(u){
      user = u || null; $("cd-login").classList.toggle("hidden", !!user || !!plan);
      if(!user || !PQFirebase.getExamPlan) return;
      PQFirebase.getExamPlan(user.uid).then(function(p){ if(p && p.items && p.items.length){ plan = p; try { localStorage.setItem(LS, JSON.stringify({ items: p.items, keyAM: p.keyAM, keyPM: p.keyPM })); } catch(e){} paint(); } });
    });
  })(0);
})();
