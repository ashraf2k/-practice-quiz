/* Round glowing crystal button: announces the IGCSE Zone 3 May/June 2027 exam timetable and countdown. */
(function(){
  "use strict";
  if(document.getElementById("pq-crystal")) return;
  var css = ".pqc{position:fixed;left:14px;top:78px;z-index:60;display:flex;align-items:center;gap:12px;max-width:calc(100vw - 28px);text-decoration:none;color:inherit;-webkit-tap-highlight-color:transparent}" +
    ".pqc-gem{position:relative;flex:0 0 auto;width:88px;height:88px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#a5f3fc,#22d3ee 38%,#2563eb 78%,#1e1b4b);box-shadow:0 0 0 2px rgba(255,255,255,.55) inset,0 6px 18px rgba(14,116,144,.55),0 0 28px 6px rgba(34,211,238,.55);animation:pqcglow 2.2s ease-in-out infinite}" +
    ".pqc-gem::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(34,211,238,.7);animation:pqcring 2.2s ease-out infinite}" +
    ".pqc-gem svg{width:50px;height:50px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.35));animation:pqcspin 6s ease-in-out infinite}" +
    ".pqc-tip{padding:10px 14px;border-radius:16px;background:var(--surface,#fff);color:var(--ink,#16213b);border:1.5px solid #22d3ee;box-shadow:0 8px 24px rgba(0,0,0,.2);font-size:14px;line-height:1.35;font-weight:600;transition:opacity .35s,transform .35s}" +
    ".pqc-tip b{display:block;font-size:14px;color:var(--accent-dark,#0e4f4d)}" +
    ".pqc.min .pqc-tip{opacity:0;transform:translateX(-8px);pointer-events:none;position:absolute;left:104px;top:12px;width:max-content;max-width:min(300px,calc(100vw - 130px))}" +
    ".pqc.min:hover .pqc-tip,.pqc.min:focus-visible .pqc-tip{opacity:1;transform:none}" +
    ".pqc:focus-visible .pqc-gem{outline:3px solid var(--accent-dark,#0e4f4d);outline-offset:3px}" +
    "@keyframes pqcglow{0%,100%{box-shadow:0 0 0 2px rgba(255,255,255,.55) inset,0 6px 18px rgba(14,116,144,.55),0 0 18px 2px rgba(34,211,238,.45)}50%{box-shadow:0 0 0 2px rgba(255,255,255,.7) inset,0 6px 18px rgba(14,116,144,.55),0 0 36px 12px rgba(34,211,238,.8)}}" +
    "@keyframes pqcring{0%{transform:scale(.92);opacity:.9}100%{transform:scale(1.5);opacity:0}}@keyframes pqcspin{0%,100%{transform:rotate(-8deg) scale(1)}50%{transform:rotate(8deg) scale(1.1)}}" +
    "@media (prefers-reduced-motion:reduce){.pqc-gem::after,.pqc-gem svg{animation:none}.pqc-gem::after{opacity:0}.pqc-gem{animation:pqcfade 1.8s ease-in-out infinite}@keyframes pqcfade{50%{opacity:.7}}}" +
    "@media print{.pqc{display:none}}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var a = document.createElement("a"); a.id = "pq-crystal"; a.className = "pqc"; a.href = "exam-timetable.html";
  a.setAttribute("aria-label", "IGCSE Zone 3 May/June 2027 exam timetable is available now. Build your countdown exam timer.");
  a.innerHTML = '<span class="pqc-gem" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M16 3l10 6-10 20L6 9z" fill="#ecfeff" fill-opacity=".92"/><path d="M6 9l10 3 10-3M16 12v17" stroke="#0e7490" stroke-width="1.2" stroke-linejoin="round"/><path d="M6 9l4-5h12l4 5" stroke="#0e7490" stroke-width="1.2" stroke-linejoin="round" fill="#a5f3fc" fill-opacity=".9"/><path d="M16 12L6 9l10 20z" fill="#67e8f9" fill-opacity=".55"/></svg></span>' +
    '<span class="pqc-tip"><b>IGCSE Zone 3 \u00b7 May/June 2027</b>Exam timetable is available now. Build your countdown exam timer!</span>';
  document.body.appendChild(a);
  setTimeout(function(){ a.classList.add("min"); }, 9000);
  a.addEventListener("touchstart", function(){ a.classList.remove("min"); }, { passive: true });
})();
