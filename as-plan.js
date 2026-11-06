/* Study-plan header for the AS Level course home: days to each paper, weeks left, and the topic due this week. */
(function(){
  "use strict";
  var P = window.PQ_ASPLAN, TZ = 3 * 3600000;
  if(!P) return;
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dn(iso){ return Math.round(Date.parse(iso + "T00:00:00Z") / 86400000); }
  function today(){ var d = new Date(Date.now() + TZ); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000); }
  function fmt(iso, wd){ var p = iso.split("-"); return new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).toLocaleDateString("en-GB", { weekday: wd === false ? undefined : "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); }
  function plural(n, w){ return n + " " + w + (n === 1 ? "" : "s"); }
  function build(){
    var t = today(), dow = new Date(t * 86400000).getUTCDay(), wkStart = t - dow, wkEnd = wkStart + 6;   // Saudi week: Sunday to Saturday
    var e1 = dn(P.exams[0].date), e2 = dn(P.exams[1].date), last = Math.max(e1, e2), nxEx = t <= e1 ? P.exams[0] : P.exams[1], left = dn(nxEx.date) - t;
    var tiles = P.exams.map(function(x){
      var d = dn(x.date) - t;
      return '<div class="asp-tile"><span class="asp-k">' + esc(x.paper) + "</span>" + (d > 0 ? '<div class="asp-sq">' : "") + "<b>" + (d > 0 ? d : d === 0 ? "Today" : "Done") + "</b><span>" + (d > 0 ? (d === 1 ? "day left" : "days left") : "") + "</span>" + (d > 0 ? "</div>" : "") + "<small>" + esc(fmt(x.date)) + "<br>" + esc(x.name) + "</small></div>";
    }).join("");
    var wl = left > 0 ? '<b>' + Math.floor(left / 7) + '</b><span>' + (Math.floor(left / 7) === 1 ? "week left" : "weeks left") + "</span><small>and " + plural(left % 7, "day") + " until " + esc(nxEx.paper) + "</small>" : "<b>-</b><span></span><small>Exams finished</small>";
    tiles += '<div class="asp-tile"><span class="asp-k">Time left</span>' + wl + "</div>";
    var done = P.topics.filter(function(x){ return dn(x.due) <= wkEnd; }), thisWeek = P.topics.filter(function(x){ var d = dn(x.due); return d >= wkStart && d <= wkEnd; }), next = P.topics.filter(function(x){ return dn(x.due) > wkEnd; })[0];
    var focus = "";
    if(t > last){ focus = "<h3>The exams are over</h3><p>Well done. Good luck with your results.</p>"; }
    else if(t > e1){ var x2 = P.exams[1]; focus = '<span class="asp-k">Next exam</span><h3>' + esc(x2.paper) + " \u00b7 " + esc(x2.name) + "</h3><p>" + esc(fmt(x2.date)) + ". Revise topics 9 to 12: algorithms, data structures, programming and software development.</p>"; }
    else if(!P.topics.length || (!next && t >= dn(P.phases[0].from) - 3)){
      var ph = P.phases.filter(function(x){ return t >= dn(x.from) - 2 && t <= dn(x.to) + 2; })[0] || P.phases[P.phases.length - 1];
      focus = '<span class="asp-k">This week</span><h3>All 12 topics should now be completed</h3><p><b>' + esc(ph.title) + "</b> (" + esc(fmt(ph.from, false)) + " to " + esc(fmt(ph.to, false)) + ").</p>";
    }
    else if(thisWeek.length){
      focus = '<span class="asp-k">Should be completed by the end of this week</span><h3>' + thisWeek.map(function(x){ return "Topic " + x.n + " · " + esc(x.title); }).join("<br>") + "</h3><p>Due " + esc(fmt(thisWeek[0].due)) + ".</p>";
    }
    else if(next){
      var wk = Math.ceil((dn(next.due) - wkEnd) / 7);
      focus = '<span class="asp-k">' + (done.length ? "This week you are working on" : t < dn(P.start) ? "Your course starts " + esc(fmt(P.start)) : "This week") + "</span><h3>Topic " + next.n + " · " + esc(next.title) + "</h3><p>To be completed by " + esc(fmt(next.due)) + (wk > 0 ? " (" + plural(wk, "week") + " from this week)" : "") + ".</p>";
    }
    if(done.length && t <= last && next) focus += '<p class="asp-done">By now you should have completed: <b>' + (done.length === 1 ? "Topic 1" : "Topics 1 to " + done[done.length - 1].n) + "</b>.</p>";
    var list = P.topics.map(function(x){ var isDone = dn(x.due) <= wkEnd; return "<li" + (isDone ? ' class="d"' : "") + "><span>Topic " + x.n + " · " + esc(x.title) + "</span><span>" + esc(fmt(x.due, false)) + "</span></li>"; }).join("") +
      P.phases.map(function(x){ return '<li class="r"><span>' + esc(x.title) + "</span><span>" + esc(fmt(x.from, false)) + " to " + esc(fmt(x.to, false)) + "</span></li>"; }).join("");
    return '<div class="asp"><div class="asp-head"><h2>' + esc(P.title) + '</h2><span class="asp-pill">Study plan</span></div><div class="asp-tiles">' + tiles + "</div>" + (focus ? '<div class="asp-focus">' + focus + "</div>" : "") +
      '<details class="asp-all"><summary>See the full study plan</summary><ul>' + list + '</ul><p class="asp-note">Plan: 2 live sessions of 1 hour a week, new content finished by early March, then revision. Dates can change; your teacher will tell you.</p></details></div>';
  }
  var css = ".asp{margin:0 0 16px;padding:16px;border-radius:18px;border:1.5px solid var(--line);background:linear-gradient(135deg,var(--accent-tint),var(--surface))}.asp-head{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:0 0 12px}.asp-head h2{margin:0;font-size:1.05rem;line-height:1.3}.asp-pill{padding:3px 11px;border-radius:99px;background:var(--accent);color:#fff;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase}" +
    ".asp-sq{display:inline-block;min-width:96px;padding:6px 14px 4px;margin:4px 0 2px;border:3px solid #facc15;border-radius:2px;background:rgba(250,204,21,.12);animation:aspBlink 1.1s ease-in-out infinite}.asp-sq b{display:block}@keyframes aspBlink{0%,100%{border-color:#facc15;box-shadow:0 0 0 0 rgba(250,204,21,.7)}50%{border-color:rgba(250,204,21,.25);box-shadow:0 0 10px 3px rgba(250,204,21,.55)}}@media (prefers-reduced-motion:reduce){.asp-sq{animation:aspBlinkRM 2s ease-in-out infinite}@keyframes aspBlinkRM{0%,100%{opacity:1}50%{opacity:.55}}}" +
    ".asp-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.asp-tile{padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--surface);text-align:center}.asp-tile b{display:block;font-size:2rem;line-height:1.05;color:var(--accent-dark);font-variant-numeric:tabular-nums}.asp-tile>span{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}.asp-tile small{display:block;margin-top:4px;color:var(--muted);font-size:.74rem;line-height:1.3}.asp-k{display:block;font-size:.75rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}" +
    ".asp-focus{margin:12px 0 0;padding:12px 14px;border-radius:14px;border:1.5px solid var(--accent);background:var(--surface)}.asp-focus h3{margin:4px 0;font-size:1.1rem}.asp-focus p{margin:2px 0;font-size:.9rem;color:var(--muted)}.asp-done{margin-top:6px!important;color:var(--ink)!important}" +
    ".asp-all{margin-top:10px}.asp-all summary{cursor:pointer;font-weight:700;color:var(--accent-dark);min-height:32px;display:flex;align-items:center}.asp-all ul{list-style:none;margin:8px 0;padding:0}.asp-all li{display:flex;justify-content:space-between;gap:10px;padding:6px 2px;border-bottom:1px solid var(--line);font-size:.88rem}.asp-all li.d{opacity:.6;text-decoration:line-through}.asp-all li.r{font-weight:700}.asp-note{font-size:.8rem;color:var(--muted);margin:4px 0 0}" +
    "@media (max-width:520px){.asp-tiles{grid-template-columns:1fr 1fr}.asp-tile:last-child{grid-column:1/-1}}";
  function mount(){
    var host = document.getElementById("view-journey"); if(!host) return;
    var el = document.getElementById("asp-host");
    if(!el){ var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); el = document.createElement("div"); el.id = "asp-host"; host.insertBefore(el, host.firstChild); }
    var h = build(); if(el.getAttribute("data-h") === h) return; var open = el.querySelector("details") && el.querySelector("details").open; el.innerHTML = h; el.setAttribute("data-h", h); if(open && el.querySelector("details")) el.querySelector("details").open = true;
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setInterval(function(){ if(!document.hidden) mount(); }, 600000);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) mount(); });
})();
