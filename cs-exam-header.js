/* 10BR (IGCSE Computer Science 0478/0984) home: days and weeks to Paper 1 and Paper 2, May/June 2027. Dates come from exam-timetable-data.js. */
(function(){
  "use strict";
  var D = window.PQ_TIMETABLE, TZ = 3 * 3600000;
  if(!D) return;
  var cs = D.subjects.filter(function(s){ return s.qual === "IG" && s.base === "0478"; })[0]; if(!cs) return;
  var NAMES = { "11": "Computer Systems", "21": "Algorithms, Programming and Logic" };
  var exams = ["11", "21"].map(function(c, i){ var p = cs.papers.filter(function(x){ return x[0] === c; })[0]; return { paper: "Paper " + (i + 1), name: NAMES[c], iso: D.year + "-" + p[3], session: p[4], mins: p[5] }; });
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g, function(c){ return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function dn(iso){ return Math.round(Date.parse(iso + "T00:00:00Z") / 86400000); }
  function today(){ var d = new Date(Date.now() + TZ); return Math.floor(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) / 86400000); }
  function fmt(iso){ var p = iso.split("-"); return new Date(Date.UTC(+p[0], p[1] - 1, +p[2])).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }); }
  function dur(m){ var h = Math.floor(m / 60), r = m % 60; return (h ? h + "h" : "") + (h && r ? " " : "") + (r ? r + "m" : ""); }
  function plural(n, w){ return n + " " + w + (n === 1 ? "" : "s"); }
  function build(){
    var t = today(), tiles = exams.map(function(x){
      var d = dn(x.iso) - t;
      return '<div class="asp-tile"><span class="asp-k">' + esc(x.paper) + "</span><b>" + (d > 0 ? d : d === 0 ? "Today" : "Done") + "</b><span>" + (d > 0 ? (d === 1 ? "day left" : "days left") : "") + "</span><small>" + esc(fmt(x.iso)) + " \u00b7 " + esc(x.session) + " \u00b7 " + dur(x.mins) + "<br>" + esc(x.name) + "</small></div>";
    }).join("");
    var nx = t <= dn(exams[0].iso) ? exams[0] : exams[1], left = dn(nx.iso) - t, w = Math.floor(left / 7);
    tiles += '<div class="asp-tile"><span class="asp-k">Time left</span>' + (left > 0 ? "<b>" + w + "</b><span>" + (w === 1 ? "week left" : "weeks left") + "</span><small>and " + plural(left % 7, "day") + " until " + esc(nx.paper) + "</small>" : "<b>-</b><span></span><small>Exams finished</small>") + "</div>";
    return '<div class="asp"><div class="asp-head"><h2>IGCSE Computer Science 0478/0984 \u00b7 May/June 2027</h2><span class="asp-pill">Exam days</span></div><div class="asp-tiles">' + tiles + '</div><p class="asp-note">Dates are from the Cambridge June 2027 timetable for Zone 3. Check your start time with your school exam officer. <a href="exam-timetable.html">Build my full exam timetable</a></p></div>';
  }
  var css = ".asp{margin:0 0 16px;padding:16px;border-radius:18px;border:1.5px solid var(--line);background:linear-gradient(135deg,var(--accent-tint),var(--surface))}.asp-head{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin:0 0 12px}.asp-head h2{margin:0;font-size:1.05rem;line-height:1.3}.asp-pill{padding:3px 11px;border-radius:99px;background:var(--accent);color:#fff;font-size:.72rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase}" +
    ".asp-tiles{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.asp-tile{padding:10px;border-radius:14px;border:1px solid var(--line);background:var(--surface);text-align:center}.asp-tile b{display:block;font-size:2rem;line-height:1.05;color:var(--accent-dark);font-variant-numeric:tabular-nums}.asp-tile>span{font-size:.78rem;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:var(--muted)}.asp-tile small{display:block;margin-top:4px;color:var(--muted);font-size:.74rem;line-height:1.3}.asp-k{display:block;font-size:.75rem;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}" +
    ".asp-focus{margin:12px 0 0;padding:12px 14px;border-radius:14px;border:1.5px solid var(--accent);background:var(--surface)}.asp-focus h3{margin:4px 0;font-size:1.1rem}.asp-focus p{margin:2px 0;font-size:.9rem;color:var(--muted)}.asp-done{margin-top:6px!important;color:var(--ink)!important}" +
    ".asp-all{margin-top:10px}.asp-all summary{cursor:pointer;font-weight:700;color:var(--accent-dark);min-height:32px;display:flex;align-items:center}.asp-all ul{list-style:none;margin:8px 0;padding:0}.asp-all li{display:flex;justify-content:space-between;gap:10px;padding:6px 2px;border-bottom:1px solid var(--line);font-size:.88rem}.asp-all li.d{opacity:.6;text-decoration:line-through}.asp-all li.r{font-weight:700}.asp-note{font-size:.8rem;color:var(--muted);margin:10px 0 0}.asp-note a{color:var(--accent-dark);font-weight:700}" +
    "@media (max-width:520px){.asp-tiles{grid-template-columns:1fr 1fr}.asp-tile:last-child{grid-column:1/-1}}";
  function mount(){
    var host = document.getElementById("view-journey"); if(!host) return;
    var el = document.getElementById("asp-host");
    if(!el){ var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); el = document.createElement("div"); el.id = "asp-host"; host.insertBefore(el, host.firstChild); }
    var h = build(); if(el.getAttribute("data-h") !== h){ el.innerHTML = h; el.setAttribute("data-h", h); }
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
  setInterval(function(){ if(!document.hidden) mount(); }, 600000);
  document.addEventListener("visibilitychange", function(){ if(!document.hidden) mount(); });
})();
