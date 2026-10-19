/* Illustrations and interactive animations for the A Level iLearn lessons.
   Core: widget registry, DOM helpers and the lesson mapping. The widgets themselves are in alevel-viz-1.js (data, networks, hardware),
   alevel-viz-2.js (logic, operating systems, translation, security) and alevel-viz-3.js (algorithms, data structures, programming).
   Every diagram is original artwork produced in code from the 9618 syllabus content, not a copy of any textbook figure. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ = { W: {}, MAP: {}, reg: function(name, fn){ V.W[name] = fn; } };
  var NS = "http://www.w3.org/2000/svg";
  V.el = function(tag, cls, html){ var e = document.createElement(tag); if(cls) e.className = cls; if(html != null) e.innerHTML = html; return e; };
  V.esc = function(s){ return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); };
  V.btn = function(label, fn, cls){ var b = V.el("button", "vb" + (cls ? " " + cls : ""), label); b.type = "button"; b.addEventListener("click", fn); return b; };
  V.row = function(){ var r = V.el("div", "vrow"); for(var i = 0; i < arguments.length; i++) if(arguments[i]) r.appendChild(arguments[i]); return r; };
  V.svg = function(w, h, inner){ var d = V.el("div"); d.innerHTML = '<svg class="vsvg" viewBox="0 0 ' + w + " " + h + '" role="img" xmlns="' + NS + '">' + inner + "</svg>"; return d.firstChild; };
  V.ov = function(s){ return '<span class="vov">' + s + "</span>"; };
  V.table = function(heads, rows, cls){
    return '<div class="vscroll"><table class="vt">' + (heads ? "<tr>" + heads.map(function(h){ return "<th>" + h + "</th>"; }).join("") + "</tr>" : "") +
      rows.map(function(r){ return "<tr>" + r.map(function(c){ return c && c.t !== undefined ? '<td class="' + (c.c || "") + '">' + c.t + "</td>" : "<td>" + c + "</td>"; }).join("") + "</tr>"; }).join("") + "</table></div>";
  };
  // A repeating timer that stops itself once its widget has left the page.
  V.timer = function(box, fn, ms){
    var id = setInterval(function(){ if(!box.isConnected){ clearInterval(id); return; } if(fn() === false) clearInterval(id); }, ms);
    return function(){ clearInterval(id); };
  };
  // A play / pause / step / reset controller for stepped animations: steps is a function(i) returning false when finished.
  V.player = function(box, opts){
    var i = 0, stop = null, bPlay, bStep, bReset;
    function upd(){ bPlay.textContent = stop ? "⏸ Pause" : "▶ Play"; bStep.disabled = !!stop || i >= opts.count(); }
    function halt(){ if(stop){ stop(); stop = null; } upd(); }
    function step(){ if(i >= opts.count()){ halt(); return false; } opts.show(i); i++; upd(); if(i >= opts.count()){ halt(); return false; } return true; }
    bPlay = V.btn("▶ Play", function(){ if(stop){ halt(); return; } if(i >= opts.count()){ i = 0; opts.reset(); } stop = V.timer(box, step, opts.ms || 900); upd(); }, "p");
    bStep = V.btn("Step ›", function(){ if(i >= opts.count()){ i = 0; opts.reset(); } step(); });
    bReset = V.btn("↺ Reset", function(){ halt(); i = 0; opts.reset(); upd(); });
    opts.reset(); upd();
    var r = V.row(bPlay, bStep, bReset); r.get = function(){ return i; }; r.halt = halt; r.upd = upd; return r;
  };
  V.mount = function(host, lesson, step){
    var specs = V.MAP[lesson.id]; if(!specs) return;
    var olds = host.querySelectorAll(".viz"); for(var k = 0; k < olds.length; k++) olds[k].remove();
    var anchor = step === 0 ? host.querySelector(".ln-body") : host.querySelector(".ln-box");
    if(!anchor) return;
    var after = anchor;
    specs.forEach(function(sp){
      if((sp.at || 0) !== step) return;
      var fn = V.W[sp.w]; if(!fn) return;
      var wrap = V.el("div", "viz"), body = V.el("div", "viz-b");
      wrap.appendChild(V.el("div", "viz-h", "🎬 Try it: " + V.esc(sp.title)));
      wrap.appendChild(body);
      try { fn(body, sp.o || {}); } catch(e){ if(root.console) console.error("viz " + sp.w, e); return; }
      if(sp.note) wrap.appendChild(V.el("div", "viz-note", sp.note));
      after.parentNode.insertBefore(wrap, after.nextSibling); after = wrap;
    });
  };
})(typeof window !== "undefined" ? window : this);
