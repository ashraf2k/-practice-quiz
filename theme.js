/* Appearance settings for every page: colour theme (Auto, Light, Dark, Blue), text size and font.
   Runs first in <head> so the saved choice is applied before the page paints. Stored on this device only. */
(function(){
  "use strict";
  var KEY = "pq_appearance_v1", D = { theme: "auto", size: "md", font: "std" };
  var THEMES = [["auto", "Auto", "Follows your device"], ["light", "Light", "Bright and clean"], ["dark", "Dark", "Easy on the eyes at night"], ["blue", "Dark blue", "Deep navy with blue accents"], ["comfort", "Eye comfort", "Soft, low glare, calm"], ["kindle", "Kindle", "Paper-style reading"]];
  var FLAGS = [["sa", "Saudi Arabia", "Green and white"], ["pk", "Pakistan", "Dark green and white"], ["eg", "Egypt", "Red, white and black"], ["in", "India", "Saffron, white, green, navy"], ["jo", "Jordan", "Black, white, green, red"], ["sy", "Syria", "Green, white, black, red stars"], ["lb", "Lebanon", "Red, white and cedar green"]];
  var SIZES = [["sm", "Small", 13], ["md", "Normal", 16], ["lg", "Large", 19], ["xl", "Extra large", 22]];
  var FONTS = [["std", "Standard"], ["easy", "Easy-read"]];
  var META = { light: "#146C6A", dark: "#0D1420", blue: "#0A1630", sa: "#006C35", pk: "#04301B", eg: "#B3141F", "in": "#1A237E", jo: "#006B35", sy: "#0E4D2C", lb: "#A3121B", comfort: "#E6E9DC", kindle: "#F3E9D2" };
  var prefs = load(), root = document.documentElement;
  function load(){ var p = {}, k; try { p = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch(e){} for(k in D) if(typeof p[k] !== "string") p[k] = D[k]; if(!THEMES.concat(FLAGS).some(function(t){ return t[0] === p.theme; })) p.theme = D.theme; if(!SIZES.some(function(t){ return t[0] === p.size; })) p.size = D.size; if(!FONTS.some(function(t){ return t[0] === p.font; })) p.font = D.font; return p; }
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(prefs)); } catch(e){} }
  function effective(){ if(prefs.theme !== "auto") return prefs.theme; return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"; }
  function apply(){
    if(prefs.theme === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", prefs.theme);
    root.setAttribute("data-size", prefs.size); root.setAttribute("data-font", prefs.font);
    var m = document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute("content", META[effective()]);
  }
  apply();
  if(window.matchMedia){ try { window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", apply); } catch(e){} }
  window.addEventListener("storage", function(e){ if(e.key === KEY){ prefs = load(); apply(); if(panel) fill(); if(fpanel) ffill(); } });
  window.PQTheme = { get: function(){ return JSON.parse(JSON.stringify(prefs)); }, set: function(k, v){ prefs[k] = v; save(); apply(); if(panel) fill(); if(fpanel) ffill(); }, reset: function(){ prefs = JSON.parse(JSON.stringify(D)); save(); apply(); if(panel) fill(); if(fpanel) ffill(); } };

  /* ---- the settings button and panel ---- */
  var btn, panel, fbtn, fpanel, built = false;
  function el(t, c, h){ var e = document.createElement(t); if(c) e.className = c; if(h != null) e.innerHTML = h; return e; }
  function fill(){
    var h = '<div class="ap-h"><b>Appearance</b><button type="button" class="ap-x" aria-label="Close appearance settings">✕</button></div>';
    h += '<div class="ap-s">Colour theme</div><div class="ap-grid" role="radiogroup" aria-label="Colour theme">' + THEMES.map(function(t){ return '<button type="button" role="radio" aria-checked="' + (prefs.theme === t[0]) + '" class="ap-opt ap-th' + (prefs.theme === t[0] ? " on" : "") + '" data-k="theme" data-v="' + t[0] + '"><span class="ap-sw ap-sw-' + t[0] + '"><i></i><i></i></span><b>' + t[1] + "</b><small>" + t[2] + "</small></button>"; }).join("") + "</div>";
    h += '<div class="ap-s">Text size</div><div class="ap-row" role="radiogroup" aria-label="Text size">' + SIZES.map(function(t){ return '<button type="button" role="radio" aria-checked="' + (prefs.size === t[0]) + '" class="ap-opt ap-sz' + (prefs.size === t[0] ? " on" : "") + '" data-k="size" data-v="' + t[0] + '"><span style="font-size:' + t[2] + 'px;line-height:1;font-weight:800">A</span><small>' + t[1] + "</small></button>"; }).join("") + "</div>";
    h += '<div class="ap-s">Font</div><div class="ap-row" role="radiogroup" aria-label="Font">' + FONTS.map(function(t){ return '<button type="button" role="radio" aria-checked="' + (prefs.font === t[0]) + '" class="ap-opt ap-fn' + (prefs.font === t[0] ? " on" : "") + '" data-k="font" data-v="' + t[0] + '" data-f="' + t[0] + '"><span class="ap-ab">Abc 123</span><small>' + t[1] + "</small></button>"; }).join("") + "</div>";
    h += '<div class="ap-prev"><b>Preview</b><p>Computer science is the study of how computers work. <span class="ap-pa">Accent colour</span> <span class="ap-pm">Muted text</span></p><button type="button" class="ap-pbtn" tabindex="-1">A button</button></div>';
    h += '<div class="ap-f"><button type="button" class="ap-reset">Reset to default</button><span>Saved on this device</span></div>';
    panel.innerHTML = h;
    Array.prototype.forEach.call(panel.querySelectorAll(".ap-opt"), function(b){ b.addEventListener("click", function(){ window.PQTheme.set(b.getAttribute("data-k"), b.getAttribute("data-v")); var again = panel.querySelector('.ap-opt[data-k="' + b.getAttribute("data-k") + '"][data-v="' + b.getAttribute("data-v") + '"]'); if(again) again.focus(); }); });
    panel.querySelector(".ap-x").addEventListener("click", close); panel.querySelector(".ap-reset").addEventListener("click", function(){ window.PQTheme.reset(); });
  }
  function open(){ if(!panel){ panel = el("div", "ap-panel"); panel.setAttribute("role", "dialog"); panel.setAttribute("aria-label", "Appearance settings"); document.body.appendChild(panel); fill(); }
    if(fpanel) fpanel.classList.remove("open"); if(fbtn) fbtn.setAttribute("aria-expanded", "false");
    panel.classList.add("open"); btn.setAttribute("aria-expanded", "true"); var f = panel.querySelector(".ap-opt.on"); if(f) f.focus(); }
  function close(){ if(panel) panel.classList.remove("open"); if(btn){ btn.setAttribute("aria-expanded", "false"); btn.focus(); } }
  function ffill(){
    var h = '<div class="ap-h"><b>Country Flag</b><button type="button" class="ap-x" aria-label="Close country flag themes">✕</button></div>';
    h += '<div class="ap-s">Pick a flag theme</div><div class="ap-grid" role="radiogroup" aria-label="Country flag theme">' + FLAGS.map(function(t){ return '<button type="button" role="radio" aria-checked="' + (prefs.theme === t[0]) + '" class="ap-opt ap-th' + (prefs.theme === t[0] ? " on" : "") + '" data-v="' + t[0] + '"><span class="ap-sw ap-flag ap-sw-' + t[0] + '"><i></i></span><b>' + t[1] + "</b><small>" + t[2] + "</small></button>"; }).join("") + "</div>";
    h += '<div class="ap-f"><button type="button" class="ap-reset">Back to Auto theme</button><span>Saved on this device</span></div>';
    fpanel.innerHTML = h;
    Array.prototype.forEach.call(fpanel.querySelectorAll(".ap-opt"), function(b){ b.addEventListener("click", function(){ window.PQTheme.set("theme", b.getAttribute("data-v")); var again = fpanel.querySelector('.ap-opt[data-v="' + b.getAttribute("data-v") + '"]'); if(again) again.focus(); }); });
    fpanel.querySelector(".ap-x").addEventListener("click", fclose); fpanel.querySelector(".ap-reset").addEventListener("click", function(){ window.PQTheme.set("theme", "auto"); });
  }
  function fopen(){ if(!fpanel){ fpanel = el("div", "ap-panel"); fpanel.setAttribute("role", "dialog"); fpanel.setAttribute("aria-label", "Country flag themes"); document.body.appendChild(fpanel); ffill(); }
    if(panel) panel.classList.remove("open"); if(btn) btn.setAttribute("aria-expanded", "false");
    fpanel.classList.add("open"); fbtn.setAttribute("aria-expanded", "true"); var f = fpanel.querySelector(".ap-opt.on") || fpanel.querySelector(".ap-opt"); if(f) f.focus(); }
  function fclose(){ if(fpanel) fpanel.classList.remove("open"); if(fbtn){ fbtn.setAttribute("aria-expanded", "false"); fbtn.focus(); } }
  function build(){
    if(built || !document.body) return; built = true;
    btn = el("button", "ap-btn", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg><span>Appearance</span>');
    btn.type = "button"; btn.setAttribute("aria-haspopup", "dialog"); btn.setAttribute("aria-expanded", "false"); btn.title = "Change colours, text size and font";
    fbtn = el("button", "ap-btn ap-fbtn", '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 21V4"/><path d="M5 4h12l-2 4 2 4H5" fill="currentColor"/></svg><span>Country Flag</span>');
    fbtn.type = "button"; fbtn.setAttribute("aria-haspopup", "dialog"); fbtn.setAttribute("aria-expanded", "false"); fbtn.title = "Choose a country flag colour theme";
    var host = document.querySelector("header.top");
    if(host && getComputedStyle(host).display === "flex"){ btn.classList.add("in-header"); host.appendChild(btn); host.appendChild(fbtn); } else { var fl = el("div", "ap-float"); fl.appendChild(btn); fl.appendChild(fbtn); document.body.appendChild(fl); }
    fbtn.addEventListener("click", function(){ if(fpanel && fpanel.classList.contains("open")) fclose(); else fopen(); });
    btn.addEventListener("click", function(){ if(panel && panel.classList.contains("open")) close(); else open(); });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape"){ if(panel && panel.classList.contains("open")) close(); else if(fpanel && fpanel.classList.contains("open")) fclose(); } });
    document.addEventListener("mousedown", function(e){ if(fpanel && fpanel.classList.contains("open") && !fpanel.contains(e.target) && !fbtn.contains(e.target)) fpanel.classList.remove("open"), fbtn.setAttribute("aria-expanded", "false"); if(panel && panel.classList.contains("open") && !panel.contains(e.target) && !btn.contains(e.target)) panel.classList.remove("open"), btn.setAttribute("aria-expanded", "false"); });
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", build); else build();
})();
