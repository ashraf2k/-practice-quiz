/* "Book a live session" banner for logged-in students (iLearn journeys and the student home). */
(function(){
  "use strict";
  var TARGETS = ["screen-hub", "screen-start", "view-journey"];
  var css =
    /* tokens: light themes */
    ".pq-live{--lv-bg:#fff;--lv-bg2:#f0faf4;--lv-line:#bfe3cc;--lv-ink:#10231a;--lv-mut:#4b6357;--lv-acc:#15803d;--lv-acc2:#166534;--lv-glow:rgba(22,163,74,.35);--lv-chip:#dcfce7;--lv-chip-ink:#14532d;--lv-btn-ink:#fff;--lv-ic:#ecfdf3}" +
    /* tokens: dark themes (explicit dark/blue, or the device is dark and no theme is chosen) */
    ":root[data-theme=dark] .pq-live,:root[data-theme=blue] .pq-live{--lv-bg:#0d1f19;--lv-bg2:#12302a;--lv-line:#1f5a45;--lv-ink:#ecfdf5;--lv-mut:#a7c4b6;--lv-acc:#4ade80;--lv-acc2:#86efac;--lv-glow:rgba(74,222,128,.38);--lv-chip:rgba(74,222,128,.14);--lv-chip-ink:#86efac;--lv-btn-ink:#052e16;--lv-ic:#0a1914}" +
    "@media (prefers-color-scheme:dark){:root:not([data-theme]) .pq-live{--lv-bg:#0d1f19;--lv-bg2:#12302a;--lv-line:#1f5a45;--lv-ink:#ecfdf5;--lv-mut:#a7c4b6;--lv-acc:#4ade80;--lv-acc2:#86efac;--lv-glow:rgba(74,222,128,.38);--lv-chip:rgba(74,222,128,.14);--lv-chip-ink:#86efac;--lv-btn-ink:#052e16;--lv-ic:#0a1914}}" +
    ".pq-live{position:relative;display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin:0 0 14px;padding:14px 16px;border-radius:16px;border:1px solid var(--lv-line);background:linear-gradient(120deg,var(--lv-bg),var(--lv-bg2));color:var(--lv-ink);box-shadow:inset 0 1px 0 rgba(255,255,255,.06)}" +
    ".pq-live:not(.mine){animation:pqglow 2.4s ease-in-out infinite}@keyframes pqglow{0%,100%{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 0 0 0 var(--lv-glow);border-color:var(--lv-line)}50%{box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 0 18px 2px var(--lv-glow);border-color:var(--lv-acc)}}" +
    ".pq-live .ic{flex:0 0 auto;width:48px;height:48px;border-radius:14px;background:var(--lv-ic);border:1px solid var(--lv-line);color:var(--lv-acc);display:flex;align-items:center;justify-content:center}" +
    ".pq-live .t{display:grid;gap:3px;min-width:200px;flex:1 1 260px}" +
    ".pq-live .eb{display:inline-flex;align-items:center;gap:6px;justify-self:start;padding:2px 9px;border-radius:99px;background:var(--lv-chip);color:var(--lv-chip-ink);font-size:.7rem;font-weight:800;letter-spacing:.06em;text-transform:uppercase}" +
    ".pq-live .eb i{width:7px;height:7px;border-radius:50%;background:var(--lv-acc);animation:pqlive 1.1s ease-in-out infinite}" +
    ".pq-live b{font-size:1.1rem;line-height:1.25;color:var(--lv-ink)}.pq-live .d{font-size:.88rem;line-height:1.4;color:var(--lv-mut)}" +
    ".pq-live .go{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 20px;border-radius:12px;background:var(--lv-acc);color:var(--lv-btn-ink);font-weight:800;text-decoration:none;white-space:nowrap}" +
    ".pq-live .go:hover{background:var(--lv-acc2)}.pq-live .go:focus-visible{outline:3px solid var(--lv-acc2);outline-offset:3px}" +
    ".pq-live.bottom{margin:16px 0 0}.pq-live.mine .go{background:transparent;color:var(--lv-acc);border:1.5px solid var(--lv-acc)}.pq-live.mine .go:hover{background:var(--lv-chip)}" +
    ".pq-live-dot{animation:pqlive 1.1s ease-in-out infinite}@keyframes pqlive{50%{opacity:.2}}" +
    ".pq-live-ring{transform-box:fill-box;transform-origin:center;animation:pqring 1.6s ease-out infinite}@keyframes pqring{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.6);opacity:0}}" +
    ".pq-live-cam{transform-box:fill-box;transform-origin:center;animation:pqcam 2.4s ease-in-out infinite}@keyframes pqcam{0%,100%{transform:scale(1) rotate(0)}25%{transform:scale(1.08) rotate(-4deg)}75%{transform:scale(1.08) rotate(4deg)}}" +
    "@media (prefers-reduced-motion:reduce){.pq-live-ring{animation:none!important;opacity:0}.pq-live-cam{animation:pqfade 1.6s ease-in-out infinite!important}}@keyframes pqfade{50%{opacity:.45}}" +
    "@media (max-width:520px){.pq-live .go{width:100%}}";
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"]/g, function(c){ return { "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]; }); }
  function html(L, mine, cls){
    var t = mine ? '<span class="eb">Booked</span><b>Your live session: ' + esc(L.label(mine.slotKey)) + '</b><span class="d">' + esc(L.tzName) + " · " + esc(L.course) + " · " + esc(L.session) + " · maximum " + L.capacity + " students</span>"
      : '<span class="eb"><i></i>Live · first session free</span><b>Book a live session</b><span class="d">' + esc(L.course) + " · " + esc(L.session) + " · very small groups, maximum " + L.capacity + " students</span>";
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
