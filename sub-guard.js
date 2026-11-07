/* Subscription guard for student pages.
   - Reads the student's own users/{uid}.sub LIVE (so an admin change, or the expiry itself, takes effect without a re-login).
   - Uses SERVER time (the Date header of this site's own response), never only the device clock.
   - Expired / suspended -> subscription-expired.html. Trial or ending soon -> a slim bar with the time left.
   This is the convenience layer; the Firestore security rules are what really block expired accounts. */
(function(){
  "use strict";
  var EXPIRED_PAGE = "subscription-expired.html";
  var onExpiredPage = /subscription-expired\.html/.test(location.pathname);
  var offset = 0, sub = null, haveSub = false, timer = 0, unsub = null, curUid = "";

  function syncClock(){
    try{
      fetch(location.pathname || "/", { method: "HEAD", cache: "no-store" }).then(function(r){
        var d = Date.parse(r.headers.get("Date") || "");
        if(d) offset = d - Date.now();
      }).catch(function(){});
    }catch(e){}
  }
  function now(){ return Date.now() + offset; }

  function state(s){
    if(!s) return { ok: true, legacy: true };
    if(s.suspended) return { ok: false, why: "suspended" };
    var t = now();
    if(s.expiryMs > t) return { ok: true, left: s.expiryMs - t };
    if(s.graceMs && s.graceMs > t) return { ok: true, grace: true, left: s.graceMs - t };
    return { ok: false, why: "expired" };
  }
  function fmtLeft(ms){
    var m = Math.max(0, Math.floor(ms / 60000)), d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
    if(d >= 2) return d + " days";
    if(d === 1) return "1 day " + h + " h";
    if(h >= 1) return h + " h " + mm + " min";
    return mm + " min";
  }
  function fmtDate(ms){
    try{ return new Date(ms).toLocaleString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Riyadh" }) + " (Riyadh)"; }
    catch(e){ return new Date(ms).toString(); }
  }

  var bar = null;
  function css(){
    if(document.getElementById("pq-sub-css")) return;
    var st = document.createElement("style"); st.id = "pq-sub-css";
    st.textContent = "#pq-subbar{position:sticky;top:0;z-index:60;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;padding:7px 14px;font:600 13px/1.3 system-ui,sans-serif;background:var(--accent-tint,#e8f4f3);color:var(--ink,#142a2a);border-bottom:1.5px solid var(--accent,#146C6A);cursor:pointer}" +
      "#pq-subbar.warn{background:#fff4d6;border-color:#d99a00;color:#4a3500}" +
      "[data-theme=dark] #pq-subbar.warn{background:#3a2d06;color:#ffe29a;border-color:#b78400}" +
      "#pq-subbar b{font-weight:800}" +
      "#pq-subdlg{position:fixed;inset:0;z-index:80;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.5);padding:16px}" +
      "#pq-subdlg>div{max-width:420px;width:100%;background:var(--surface,#fff);color:var(--ink,#142a2a);border:1px solid var(--line,#ccc);border-radius:16px;padding:18px 20px;box-shadow:0 12px 40px rgba(0,0,0,.35)}" +
      "#pq-subdlg h3{margin:0 0 10px;font-size:18px}#pq-subdlg dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:6px 12px;font-size:14px}" +
      "#pq-subdlg dt{color:var(--muted,#5b6f6f)}#pq-subdlg dd{margin:0;font-weight:700}#pq-subdlg button{margin-top:14px;padding:9px 16px;border-radius:10px;border:1.5px solid var(--accent,#146C6A);background:var(--accent,#146C6A);color:#fff;font-weight:700;cursor:pointer}";
    document.head.appendChild(st);
  }
  function showDetails(){
    var s = sub, st = state(s); if(!s) return;
    var d = document.createElement("div"); d.id = "pq-subdlg"; d.setAttribute("role", "dialog");
    d.innerHTML = "<div><h3>My subscription</h3><dl><dt>Plan</dt><dd></dd><dt>Started</dt><dd></dd><dt>Expires</dt><dd></dd><dt>Time left</dt><dd></dd></dl><button type='button'>Close</button></div>";
    var dd = d.querySelectorAll("dd");
    dd[0].textContent = (s.label || s.plan) + (s.isTrial ? " (24 hours)" : "");
    dd[1].textContent = s.startMs ? fmtDate(s.startMs) : "-";
    dd[2].textContent = fmtDate(s.expiryMs) + (st.grace ? " - temporary access until " + fmtDate(s.graceMs) : "");
    dd[3].textContent = st.ok ? fmtLeft(st.left) : "Expired";
    d.addEventListener("click", function(e){ if(e.target === d || e.target.tagName === "BUTTON") d.remove(); });
    document.body.appendChild(d);
  }
  function render(){
    var st = state(sub);
    if(onExpiredPage) return;
    if(!st.ok){ location.replace(EXPIRED_PAGE); return; }
    var show = sub && (sub.isTrial || st.grace || st.left < 7 * 86400000);
    if(!show){ if(bar){ bar.remove(); bar = null; } return; }
    css();
    if(!bar){ bar = document.createElement("div"); bar.id = "pq-subbar"; bar.setAttribute("role", "button"); bar.title = "Tap for details"; bar.addEventListener("click", showDetails); document.body.insertBefore(bar, document.body.firstChild); }
    var warn = st.grace || st.left < 6 * 3600000 || (!sub.isTrial && st.left < 3 * 86400000);
    bar.className = warn ? "warn" : "";
    bar.textContent = "";
    var b = document.createElement("b");
    b.textContent = st.grace ? "Temporary access" : (sub.isTrial ? "Free trial" : (sub.label || "Subscription"));
    bar.appendChild(b);
    bar.appendChild(document.createTextNode(" - " + fmtLeft(st.left) + " remaining" + (sub.isTrial || st.grace ? " - contact your teacher to subscribe" : " - ends " + fmtDate(sub.expiryMs))));
  }
  function tick(){ clearTimeout(timer); render(); timer = setTimeout(tick, 20000); }

  function start(uid){
    if(uid === curUid) return;
    if(unsub){ try{ unsub(); }catch(e){} unsub = null; }
    curUid = uid;
    if(!uid){ sub = null; if(bar){ bar.remove(); bar = null; } clearTimeout(timer); return; }
    try{
      unsub = window.PQFirebase.watchMySubscription(uid, function(s, exists){
        if(s === undefined) return;              // offline / error: keep what we had, rules still protect the data
        sub = s; haveSub = true; tick();
      });
    }catch(e){}
  }
  function init(){
    var P = window.PQFirebase;
    if(!P || !P.onAuthChange || !P.watchMySubscription){ return setTimeout(init, 150); }
    syncClock(); setInterval(syncClock, 600000);
    P.onAuthChange(function(p){
      if(p && p.uid && (p.role || "student") === "student") start(p.uid); else start("");
    });
  }
  window.PQ_SUBGUARD = { state: function(){ return state(sub); }, sub: function(){ return sub; }, now: now };
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
