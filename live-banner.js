/* "Book a live session" banner for logged-in students (iLearn journeys and the student home). */
(function(){
  "use strict";
  var TARGETS = ["screen-hub", "screen-start", "view-journey"];
  var css = ".pq-live{display:flex;gap:14px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:0 0 14px;padding:14px 16px;border-radius:14px;border:1.5px solid var(--accent,#146c6a);background:linear-gradient(135deg,var(--accent-tint,#e6f4f3),var(--surface,#fff));color:var(--ink,#14213d)}" +
    ".pq-live .t{display:grid;gap:2px;min-width:200px;flex:1 1 260px}.pq-live b{font-size:1.05rem}.pq-live span{font-size:.9rem;color:var(--muted,#5b6478)}" +
    ".pq-live .go{display:inline-block;padding:10px 18px;border-radius:10px;background:var(--accent,#146c6a);color:#fff;font-weight:800;text-decoration:none;white-space:nowrap}" +
    ".pq-live .ic{flex:0 0 auto;width:46px;height:46px;border-radius:12px;background:var(--surface,#fff);border:1.5px solid var(--accent,#146c6a);color:var(--accent,#146c6a);display:flex;align-items:center;justify-content:center}" +
    ".pq-live .pq-live-dot{animation:pqlive 1.4s ease-in-out infinite}@keyframes pqlive{50%{opacity:.25}}@media (prefers-reduced-motion:reduce){.pq-live .pq-live-dot{animation:none}}" +
    ".pq-live .tag{display:inline-block;margin-left:6px;padding:1px 8px;border-radius:99px;background:#e11d48;color:#fff;font-size:.68rem;font-weight:800;letter-spacing:.05em;vertical-align:2px}" +
    ".pq-live .go:hover{background:var(--accent-dark,#0f524f)}.pq-live.bottom{margin:16px 0 0}.pq-live.mine{border-color:var(--correct,#2e7d32)}";
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }
  function html(L, mine, cls){
    var t = mine ? "<b>Your live session: " + esc(L.label(mine.slotKey)) + "</b><span>" + esc(L.tzName) + " · " + esc(L.session) + " · groups of maximum " + L.capacity + " students</span>"
      : "<b>Book a live session</b><span>For " + esc(L.session) + " · very small groups: maximum " + L.capacity + " students · weekly online session with your teacher</span>";
    return '<div class="pq-live ' + (mine ? "mine " : "") + (cls || "") + '" data-pq-live><span class="ic">' + L.icon(28) + '</span><div class="t">' + t + '</div><a class="go" href="live-session.html">' + (mine ? "View my session" : "Book a live session") + "</a></div>";
  }
  function mount(mine){
    var L = window.PQ_LIVE; if(!L) return;
    if(!document.getElementById("pq-live-css")){ var st = document.createElement("style"); st.id = "pq-live-css"; st.textContent = css; document.head.appendChild(st); }
    TARGETS.forEach(function(id){
      var host = document.getElementById(id); if(!host) return;
      Array.prototype.forEach.call(host.querySelectorAll(":scope > [data-pq-live]"), function(n){ n.remove(); });
      host.insertAdjacentHTML("afterbegin", html(L, mine, ""));
      if(id === "view-journey") host.insertAdjacentHTML("beforeend", html(L, mine, "bottom"));
    });
  }
  function boot(){
    if(!window.PQFirebase || !PQFirebase.onAuthChange || !window.PQ_LIVE){ setTimeout(boot, 150); return; }
    PQFirebase.onAuthChange(function(u){
      if(!u || (u.role && u.role !== "student" && u.role !== "admin")){ return; }
      var go = function(mine){ mount(mine); /* the page re-renders its sections: put the banner back */ setTimeout(function(){ mount(mine); }, 1500); };
      if(typeof PQFirebase.liveLoad !== "function"){ go(null); return; }
      PQFirebase.liveLoad(u.uid).then(function(d){ go(d.mine); }, function(){ go(null); });
    });
  }
  boot();
})();
