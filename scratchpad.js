// Scratch area for calculation questions (10BR quizzes and exam papers).
//
// A plain drawing canvas the student can work on with a pen/stylus (or a
// finger / mouse) while answering: binary conversions, additions, storage
// sizes, trace tables, parity counts and so on. It is ONLY working-out
// space: nothing is read, uploaded or saved, and it is wiped when the next
// question loads. A question opts in with `calc: true` in quiz-data.js /
// exam-data.js; for any other question the pad stays hidden.
//
// Usage:
//   var pad = ScratchPad.mount(parentEl, beforeEl);   // once per page
//   pad.show(true | false);   // per question: only calc questions
//   pad.reset();              // clears ink and closes the panel
(function(){
  "use strict";

  var CSS =
    ".sp-wrap{ margin: 12px 0 4px; }" +
    ".sp-toggle, .sp-tools button{ font: inherit; font-size: 14px; cursor: pointer;" +
      " padding: 8px 14px; border-radius: 7px; border: 1px solid var(--line, #cfd5de);" +
      " background: var(--input-bg, #fff); color: var(--ink, #111); min-height: 40px; }" +
    ".sp-toggle{ display: inline-flex; align-items: center; gap: 6px; }" +
    ".sp-tools{ display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0; }" +
    ".sp-tools button.on{ border-color: var(--accent, #0f7f72); outline: 1px solid var(--accent, #0f7f72); }" +
    ".sp-tools button.sp-close{ margin-left: auto; background: var(--accent, #0f7f72); color: #fff; border-color: var(--accent, #0f7f72); }" +
    ".sp-canvas{ display: block; width: 100%; height: 320px; border: 1px solid var(--line, #cfd5de);" +
      " border-radius: 7px; background-color: var(--input-bg, #fff);" +
      " background-image: linear-gradient(to right, rgba(120,130,150,.16) 1px, transparent 1px)," +
      " linear-gradient(to bottom, rgba(120,130,150,.16) 1px, transparent 1px);" +
      " background-size: 24px 24px; touch-action: none; cursor: crosshair; }" +
    ".sp-canvas.sp-tall{ height: 520px; }" +
    ".sp-note{ margin: 6px 0 0; font-size: 13px; line-height: 1.45; color: var(--muted, #5b6472); }" +
    ".sp-hidden{ display: none !important; }" +
    "@media print{ .sp-wrap{ display: none !important; } }";

  function injectCss(){
    if(document.getElementById("sp-css")) return;
    var st = document.createElement("style");
    st.id = "sp-css";
    st.textContent = CSS;
    document.head.appendChild(st);
  }

  function cssVar(n, d){
    var v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    return v || d;
  }

  function mount(parent, beforeEl){
    injectCss();
    var wrap = document.createElement("div");
    wrap.className = "sp-wrap sp-hidden";
    wrap.innerHTML =
      '<button type="button" class="sp-toggle" aria-expanded="false">✎ Scratch area</button>' +
      '<div class="sp-panel sp-hidden">' +
        '<div class="sp-tools" role="toolbar" aria-label="Scratch area tools">' +
          '<button type="button" data-t="pen" class="on">Pen</button>' +
          '<button type="button" data-t="eraser">Eraser</button>' +
          '<button type="button" data-t="undo">Undo</button>' +
          '<button type="button" data-t="clear">Clear</button>' +
          '<button type="button" data-t="size">Bigger</button>' +
          '<button type="button" data-t="close" class="sp-close">Hide</button>' +
        '</div>' +
        '<canvas class="sp-canvas" aria-label="Scratch area for your working out. Not marked or saved."></canvas>' +
        '<p class="sp-note">Working-out space only. It is not marked or saved, and it clears on the next question.</p>' +
      '</div>';
    parent.insertBefore(wrap, beforeEl || null);

    var toggle = wrap.querySelector(".sp-toggle");
    var panel = wrap.querySelector(".sp-panel");
    var cv = wrap.querySelector(".sp-canvas");
    var ctx = cv.getContext("2d");
    var strokes = [], cur = null, tool = "pen", penSeen = false;

    function size(){
      var r = cv.getBoundingClientRect();
      var dpr = window.devicePixelRatio || 1;
      if(!r.width) return;
      cv.width = Math.round(r.width * dpr);
      cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      redraw();
    }
    function drawStroke(s){
      if(!s.pts.length) return;
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      if(s.eraser){
        ctx.globalCompositeOperation = "destination-out";
        ctx.lineWidth = 24;
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = cssVar("--ink", "#111");
        ctx.lineWidth = s.w || 2.4;
      }
      ctx.beginPath();
      ctx.moveTo(s.pts[0][0], s.pts[0][1]);
      if(s.pts.length === 1) ctx.lineTo(s.pts[0][0] + 0.1, s.pts[0][1]);
      for(var i = 1; i < s.pts.length; i++) ctx.lineTo(s.pts[i][0], s.pts[i][1]);
      ctx.stroke();
      ctx.globalCompositeOperation = "source-over";
    }
    function redraw(){
      var r = cv.getBoundingClientRect();
      ctx.clearRect(0, 0, r.width, r.height);
      strokes.forEach(drawStroke);
    }
    function pos(e){ var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }

    cv.addEventListener("pointerdown", function(e){
      if(e.pointerType === "pen") penSeen = true;
      // Palm rejection: once a stylus has touched the pad, ignore fingers.
      if(e.pointerType === "touch" && penSeen) return;
      if(e.pointerType === "mouse" && e.button !== 0) return;
      e.preventDefault();
      try { cv.setPointerCapture(e.pointerId); } catch(err){}
      // Pressure-sensitive width for a stylus, steady width otherwise.
      var w = (e.pointerType === "pen" && e.pressure > 0) ? 1.6 + e.pressure * 2.2 : 2.4;
      cur = { eraser: tool === "eraser", pts: [pos(e)], id: e.pointerId, w: w };
      strokes.push(cur);
      drawStroke(cur);
    });
    cv.addEventListener("pointermove", function(e){
      if(!cur || e.pointerId !== cur.id) return;
      e.preventDefault();
      var evs = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
      if(!evs.length) evs = [e];
      evs.forEach(function(ev){ cur.pts.push(pos(ev)); });
      redraw();
    });
    function end(e){ if(cur && e.pointerId === cur.id) cur = null; }
    cv.addEventListener("pointerup", end);
    cv.addEventListener("pointercancel", end);
    cv.addEventListener("contextmenu", function(e){ e.preventDefault(); });

    function hasInk(){ return strokes.some(function(s){ return !s.eraser && s.pts.length; }); }
    function setOpen(open){
      panel.classList.toggle("sp-hidden", !open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "✎ Hide scratch area" : (hasInk() ? "✎ Show scratch area (your working is kept)" : "✎ Scratch area");
      if(open) size();
    }

    toggle.addEventListener("click", function(){ setOpen(panel.classList.contains("sp-hidden")); });
    wrap.querySelector(".sp-tools").addEventListener("click", function(e){
      var t = e.target.getAttribute && e.target.getAttribute("data-t");
      if(!t) return;
      if(t === "pen" || t === "eraser"){
        tool = t;
        [].forEach.call(wrap.querySelectorAll("[data-t=pen],[data-t=eraser]"), function(b){
          b.classList.toggle("on", b.getAttribute("data-t") === t);
        });
      } else if(t === "undo"){ strokes.pop(); redraw(); }
      else if(t === "clear"){ strokes = []; redraw(); }
      else if(t === "size"){
        var tall = cv.classList.toggle("sp-tall");
        e.target.textContent = tall ? "Smaller" : "Bigger";
        size();
      }
      else if(t === "close"){ setOpen(false); }
    });
    window.addEventListener("resize", function(){ if(!panel.classList.contains("sp-hidden")) size(); });

    function reset(){
      strokes = []; cur = null;
      cv.classList.remove("sp-tall");
      var sz = wrap.querySelector("[data-t=size]"); if(sz) sz.textContent = "Bigger";
      tool = "pen";
      [].forEach.call(wrap.querySelectorAll("[data-t=pen],[data-t=eraser]"), function(b){
        b.classList.toggle("on", b.getAttribute("data-t") === "pen");
      });
      setOpen(false);
      redraw();
    }

    return {
      el: wrap,
      reset: reset,
      hasInk: hasInk,
      // Shows the pad only for a calculation question; always starts closed
      // and empty so one question's working never carries into the next.
      show: function(on){ reset(); wrap.classList.toggle("sp-hidden", !on); },
      _strokes: function(){ return strokes; }
    };
  }

  window.ScratchPad = { mount: mount };
})();
