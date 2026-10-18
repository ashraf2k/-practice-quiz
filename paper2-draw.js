/* Paper 2 drawing support.
   1. P2Fig  - builds the static SVG figures printed in the paper and in the mark scheme
               (logic circuits, flowcharts, structure diagrams) with the Cambridge 0478 symbols.
   2. P2Draw - a drawing pad students can use to answer: pen, rub-out, lines/arrows, the
               flowchart shapes, text labels and the six logic-gate symbols. The drawing is only
               kept on this device (and shown next to the mark scheme); it is never uploaded. */
(function(root){
  "use strict";

  function esc(x){ return String(x == null ? "" : x).replace(/[&<>"']/g, function(c){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]; }); }

  /* ---------- logic gate geometry (local box 78 x 50; inputs on the left, output at (78,25)) ---------- */
  var AND_BODY = "M10 0 H35 A25 25 0 0 1 35 50 H10 Z";
  var OR_BODY = "M10 0 Q40 0 60 25 Q40 50 10 50 Q25 25 10 0 Z";
  var GATES = {
    AND:  { body: AND_BODY, extra: [], bubble: null, ins: [[0,15,10],[0,35,10]], outFrom: 60 },
    NAND: { body: AND_BODY, extra: [], bubble: [64,25,4], ins: [[0,15,10],[0,35,10]], outFrom: 68 },
    OR:   { body: OR_BODY, extra: [], bubble: null, ins: [[0,15,16.3],[0,35,16.3]], outFrom: 60 },
    NOR:  { body: OR_BODY, extra: [], bubble: [64,25,4], ins: [[0,15,16.3],[0,35,16.3]], outFrom: 68 },
    XOR:  { body: OR_BODY, extra: ["M4 0 Q19 25 4 50"], bubble: null, ins: [[0,15,10.3],[0,35,10.3]], outFrom: 60 },
    NOT:  { body: "M10 5 L10 45 L55 25 Z", extra: [], bubble: [59,25,4], ins: [[0,25,10]], outFrom: 63 }
  };
  var GATE_W = 78, GATE_H = 50;

  /* ---------- static SVG figures ---------- */
  var F = {};
  F.svg = function(w, h, inner, label){
    return '<svg class="p2-fig" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '" width="' + w + '" role="img" aria-label="' + esc(label || "diagram") + '" style="max-width:100%;height:auto;background:#fff">' +
      '<g fill="none" stroke="#111" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" font-family="Arial,Helvetica,sans-serif" font-size="15">' + inner + "</g></svg>";
  };
  F.text = function(x, y, s, anchor, size, bold){
    return '<text x="' + x + '" y="' + y + '" text-anchor="' + (anchor || "middle") + '" fill="#111" stroke="none" font-size="' + (size || 15) + '"' + (bold ? ' font-weight="700"' : "") + ">" + esc(s) + "</text>";
  };
  F.line = function(pts, arrow){
    var d = pts.map(function(p, i){ return (i ? "L" : "M") + p[0] + " " + p[1]; }).join(" ");
    var h = "";
    if(arrow){
      var a = pts[pts.length - 2], b = pts[pts.length - 1], ang = Math.atan2(b[1] - a[1], b[0] - a[0]), s = 9;
      h = '<path d="M' + (b[0] - s * Math.cos(ang - 0.45)).toFixed(1) + " " + (b[1] - s * Math.sin(ang - 0.45)).toFixed(1) + " L" + b[0] + " " + b[1] + " L" + (b[0] - s * Math.cos(ang + 0.45)).toFixed(1) + " " + (b[1] - s * Math.sin(ang + 0.45)).toFixed(1) + '" fill="#111"/>';
    }
    return '<path d="' + d + '"/>' + h;
  };
  // A gate drawn with its top-left corner at (x, y). Returns the SVG and, with F.pin(), the connection points.
  F.gate = function(kind, x, y){
    var g = GATES[kind], h = '<g transform="translate(' + x + " " + y + ')">';
    h += '<path d="' + g.body + '" fill="#fff"/>';
    g.extra.forEach(function(d){ h += '<path d="' + d + '"/>'; });
    if(g.bubble) h += '<circle cx="' + g.bubble[0] + '" cy="' + g.bubble[1] + '" r="' + g.bubble[2] + '" fill="#fff"/>';
    g.ins.forEach(function(s){ h += '<path d="M' + s[0] + " " + s[1] + " H" + s[2] + '"/>'; });
    h += '<path d="M' + g.outFrom + " 25 H" + GATE_W + '"/>';
    return h + "</g>";
  };
  F.pin = function(kind, x, y, which){          // which: 0/1 = input, "out" = output
    var g = GATES[kind];
    if(which === "out") return [x + GATE_W, y + 25];
    return [x, y + g.ins[which][1]];
  };
  F.dot = function(x, y){ return '<circle cx="' + x + '" cy="' + y + '" r="3.5" fill="#111"/>'; };
  // Flowchart / structure-diagram shapes, centred on (cx, cy)
  F.term = function(cx, cy, w, h, s){ return '<rect x="' + (cx - w / 2) + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '" fill="#fff"/>' + F.text(cx, cy + 5, s); };
  F.proc = function(cx, cy, w, h, s){ return '<rect x="' + (cx - w / 2) + '" y="' + (cy - h / 2) + '" width="' + w + '" height="' + h + '" fill="#fff"/>' + (Array.isArray(s) ? s.map(function(t, i){ return F.text(cx, cy + 5 + (i - (s.length - 1) / 2) * 18, t); }).join("") : F.text(cx, cy + 5, s)); };
  F.io = function(cx, cy, w, h, s){ var k = 16; return '<path d="M' + (cx - w / 2 + k) + " " + (cy - h / 2) + " H" + (cx + w / 2) + " L" + (cx + w / 2 - k) + " " + (cy + h / 2) + " H" + (cx - w / 2) + ' Z" fill="#fff"/>' + F.text(cx, cy + 5, s); };
  F.dec = function(cx, cy, w, h, s){ return '<path d="M' + cx + " " + (cy - h / 2) + " L" + (cx + w / 2) + " " + cy + " L" + cx + " " + (cy + h / 2) + " L" + (cx - w / 2) + " " + cy + ' Z" fill="#fff"/>' + F.text(cx, cy + 5, s); };

  /* ---------- the drawing pad ---------- */
  var CSS =
    ".p2d{ margin:10px 0 2px; border:1px dashed #889; border-radius:8px; padding:8px; background:#fbfcfd; }" +
    ".p2d-tools{ display:flex; flex-wrap:wrap; gap:5px; margin:0 0 8px; align-items:center; }" +
    ".p2d-tools button{ font:inherit; font-size:13px; cursor:pointer; padding:6px 10px; border-radius:6px; border:1px solid #b8c0cc; background:#fff; color:#111; min-height:36px; }" +
    ".p2d-tools button.on{ border-color:#0f7f72; outline:2px solid #0f7f72; background:#e9f7f4; }" +
    ".p2d-tools .sep{ width:1px; align-self:stretch; background:#cfd5de; margin:0 3px; }" +
    ".p2d-tools .gl{ padding:3px 6px; } .p2d-tools .gl svg{ display:block; }" +
    ".p2d-wrap{ position:relative; }" +
    ".p2d canvas{ display:block; width:100%; height:auto; border:1px solid #b8c0cc; border-radius:6px; background-color:#fff;" +
      " background-image:linear-gradient(to right, rgba(120,130,150,.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(120,130,150,.14) 1px, transparent 1px); background-size:2.222% 20px; touch-action:none; cursor:crosshair; }" +
    ".p2d input.p2d-t{ position:absolute; font:15px Arial,Helvetica,sans-serif; padding:2px 4px; border:1px solid #0f7f72; border-radius:4px; min-width:90px; z-index:3; }" +
    ".p2d-note{ margin:6px 0 0; font-size:12.5px; color:#5b6472; }" +
    "@media print{ .p2d-tools{ display:none !important; } .p2d{ border:0; padding:0; } }";
  function injectCss(){
    if(document.getElementById("p2d-css")) return;
    var s = document.createElement("style"); s.id = "p2d-css"; s.textContent = CSS; document.head.appendChild(s);
  }

  var CW = 900, GRID = 10;
  function snap(v){ return Math.round(v / GRID) * GRID; }
  var PATHS = {};                       // cached Path2D per gate piece
  function gatePath(kind){
    if(PATHS[kind]) return PATHS[kind];
    var g = GATES[kind], parts = { body: new Path2D(g.body), extra: g.extra.map(function(d){ return new Path2D(d); }), stubs: new Path2D() };
    g.ins.forEach(function(s){ parts.stubs.moveTo(s[0], s[1]); parts.stubs.lineTo(s[2], s[1]); });
    parts.stubs.moveTo(g.outFrom, 25); parts.stubs.lineTo(GATE_W, 25);
    return (PATHS[kind] = parts);
  }

  function drawOp(ctx, op){
    ctx.save();
    ctx.strokeStyle = "#111"; ctx.fillStyle = "#fff"; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.lineJoin = "round";
    if(op.t === "pen"){
      ctx.beginPath(); ctx.moveTo(op.p[0][0], op.p[0][1]);
      for(var i = 1; i < op.p.length; i++) ctx.lineTo(op.p[i][0], op.p[i][1]);
      if(op.p.length === 1) ctx.lineTo(op.p[0][0] + 0.1, op.p[0][1]);
      ctx.stroke();
    } else if(op.t === "line" || op.t === "arrow"){
      ctx.beginPath(); ctx.moveTo(op.a[0], op.a[1]); ctx.lineTo(op.b[0], op.b[1]); ctx.stroke();
      if(op.t === "arrow"){
        var ang = Math.atan2(op.b[1] - op.a[1], op.b[0] - op.a[0]), s = 11;
        ctx.beginPath(); ctx.moveTo(op.b[0], op.b[1]);
        ctx.lineTo(op.b[0] - s * Math.cos(ang - 0.45), op.b[1] - s * Math.sin(ang - 0.45));
        ctx.lineTo(op.b[0] - s * Math.cos(ang + 0.45), op.b[1] - s * Math.sin(ang + 0.45));
        ctx.closePath(); ctx.fillStyle = "#111"; ctx.fill();
      }
    } else if(op.t === "box" || op.t === "term" || op.t === "dec" || op.t === "io"){
      var x = Math.min(op.a[0], op.b[0]), y = Math.min(op.a[1], op.b[1]), w = Math.abs(op.b[0] - op.a[0]), h = Math.abs(op.b[1] - op.a[1]);
      ctx.beginPath();
      if(op.t === "box") ctx.rect(x, y, w, h);
      else if(op.t === "term"){ var r = Math.min(h / 2, w / 2); ctx.moveTo(x + r, y); ctx.lineTo(x + w - r, y); ctx.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2); ctx.lineTo(x + r, y + h); ctx.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5); ctx.closePath(); }
      else if(op.t === "dec"){ ctx.moveTo(x + w / 2, y); ctx.lineTo(x + w, y + h / 2); ctx.lineTo(x + w / 2, y + h); ctx.lineTo(x, y + h / 2); ctx.closePath(); }
      else { var k = Math.min(18, w / 4); ctx.moveTo(x + k, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w - k, y + h); ctx.lineTo(x, y + h); ctx.closePath(); }
      ctx.fill(); ctx.stroke();
    } else if(op.t === "text"){
      ctx.fillStyle = "#111"; ctx.font = "16px Arial, Helvetica, sans-serif"; ctx.textBaseline = "middle";
      ctx.fillText(op.s, op.x, op.y);
    } else if(op.t === "gate"){
      var gp = gatePath(op.k), g = GATES[op.k];
      ctx.translate(op.x, op.y);
      ctx.fill(gp.body); ctx.stroke(gp.body);
      gp.extra.forEach(function(p){ ctx.stroke(p); });
      if(g.bubble){ ctx.beginPath(); ctx.arc(g.bubble[0], g.bubble[1], g.bubble[2], 0, Math.PI * 2); ctx.fillStyle = "#fff"; ctx.fill(); ctx.stroke(); }
      ctx.stroke(gp.stubs);
    }
    ctx.restore();
  }
  function bbox(op){
    if(op.t === "pen"){ var xs = op.p.map(function(q){ return q[0]; }), ys = op.p.map(function(q){ return q[1]; }); return [Math.min.apply(null, xs), Math.min.apply(null, ys), Math.max.apply(null, xs), Math.max.apply(null, ys)]; }
    if(op.t === "text") return [op.x, op.y - 10, op.x + 9 * op.s.length, op.y + 10];
    if(op.t === "gate") return [op.x, op.y, op.x + GATE_W, op.y + GATE_H];
    return [Math.min(op.a[0], op.b[0]), Math.min(op.a[1], op.b[1]), Math.max(op.a[0], op.b[0]), Math.max(op.a[1], op.b[1])];
  }
  function distSeg(px, py, a, b){
    var dx = b[0] - a[0], dy = b[1] - a[1], l2 = dx * dx + dy * dy, t = l2 ? Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / l2)) : 0;
    return Math.hypot(px - (a[0] + t * dx), py - (a[1] + t * dy));
  }
  function hit(op, x, y){
    var r = 9;
    if(op.t === "pen"){ for(var i = 0; i < op.p.length; i++){ if(Math.hypot(op.p[i][0] - x, op.p[i][1] - y) < r + 4) return true; } return false; }
    if(op.t === "line" || op.t === "arrow") return distSeg(x, y, op.a, op.b) < r;
    var b = bbox(op);
    if(op.t === "gate" || op.t === "text") return x >= b[0] - 3 && x <= b[2] + 3 && y >= b[1] - 3 && y <= b[3] + 3;
    // closed shapes: hit the outline area (an edge band) so rubbing inside does not wipe the box
    var inside = x >= b[0] - r && x <= b[2] + r && y >= b[1] - r && y <= b[3] + r;
    var core = x > b[0] + r && x < b[2] - r && y > b[1] + r && y < b[3] - r;
    return inside && !core;
  }

  var TOOLSETS = {
    structure: ["pen", "box", "line", "text", "rub", "undo", "clear"],
    flow:      ["pen", "term", "box", "io", "dec", "arrow", "text", "rub", "undo", "clear"],
    logic:     ["pen", "line", "AND", "OR", "NOT", "NAND", "NOR", "XOR", "text", "rub", "undo", "clear"],
    all:       ["pen", "line", "arrow", "box", "term", "io", "dec", "AND", "OR", "NOT", "NAND", "NOR", "XOR", "text", "rub", "undo", "clear"]
  };
  var LABEL = { pen: "✏ Pen", line: "╱ Line", arrow: "→ Arrow", box: "▭ Box / process", term: "⬭ Start / Stop", io: "▱ Input / Output", dec: "◇ Decision", text: "T Text", rub: "⌫ Rub out", undo: "↶ Undo", clear: "Clear all" };
  var HELP = {
    structure: "Draw boxes with the Box tool (drag), join them with the Line tool, and type the names with the Text tool.",
    flow: "Use the standard flowchart symbols: Start / Stop, Input / Output, Process (box), Decision (diamond). Join them with arrows and write Yes / No on the decision lines.",
    logic: "Click where you want a gate to go, then join the gates and the inputs with the Line tool. Use the Text tool for A, B, C and X.",
    all: "Pick a tool, then draw. Use the Text tool for labels."
  };

  function mount(box, opt){
    injectCss();
    opt = opt || {};
    var kind = opt.kind || "all", tools = TOOLSETS[kind] || TOOLSETS.all;
    var ops = (opt.ops || []).slice(), tool = tools[0], drag = null, textIn = null;
    var wrap = document.createElement("div"); wrap.className = "p2d";
    var bar = document.createElement("div"); bar.className = "p2d-tools"; wrap.appendChild(bar);
    var cw = document.createElement("div"); cw.className = "p2d-wrap"; wrap.appendChild(cw);
    var H = opt.height || 420;
    var cv = document.createElement("canvas"); cv.width = CW; cv.height = H; cv.setAttribute("aria-label", "Drawing area. Draw your answer here with a pen, finger or mouse."); cw.appendChild(cv);
    var note = document.createElement("p"); note.className = "p2d-note"; note.textContent = HELP[kind] || HELP.all; wrap.appendChild(note);
    box.appendChild(wrap);
    var ctx = cv.getContext("2d"), buttons = {};

    function render(preview){
      ctx.clearRect(0, 0, CW, H);
      ops.forEach(function(o){ drawOp(ctx, o); });
      if(preview) drawOp(ctx, preview);
    }
    function changed(){ if(opt.onChange) opt.onChange(ops.slice()); }
    function setTool(t){ tool = t; Object.keys(buttons).forEach(function(k){ buttons[k].classList.toggle("on", k === t); }); }
    function addBtn(t){
      var b = document.createElement("button"); b.type = "button"; b.setAttribute("data-tool", t);
      if(GATES[t]){
        b.className = "gl"; b.title = t + " gate";
        b.innerHTML = '<svg width="62" height="34" viewBox="0 0 78 50" fill="none" stroke="#111" stroke-width="3">' + F.gate(t, 0, 0).replace(/<g transform[^>]*>/, "<g>") + "</svg><span style='font-size:11px;display:block;text-align:center'>" + t + "</span>";
        b.querySelector("svg").insertAdjacentHTML("beforeend", "");
      } else b.textContent = LABEL[t];
      b.addEventListener("click", function(){
        if(t === "undo"){ ops.pop(); render(); changed(); return; }
        if(t === "clear"){ if(!ops.length || window.confirm("Clear the whole drawing?")){ ops = []; render(); changed(); } return; }
        setTool(t);
      });
      if(t !== "undo" && t !== "clear") buttons[t] = b;
      bar.appendChild(b);
      return b;
    }
    tools.forEach(function(t, i){
      if(t === "undo"){ var s = document.createElement("span"); s.className = "sep"; bar.appendChild(s); }
      addBtn(t);
    });
    setTool(tool);

    function pos(e){
      var r = cv.getBoundingClientRect();
      return [(e.clientX - r.left) * CW / r.width, (e.clientY - r.top) * H / r.height];
    }
    function closeText(commit){
      if(!textIn) return;
      var el = textIn, v = el.value.trim(), x = el._x, y = el._y;
      textIn = null;                    // clear first: removing the input fires blur, which calls this again
      if(el.parentNode) el.parentNode.removeChild(el);
      if(commit && v){ ops.push({ t: "text", x: x, y: y, s: v.slice(0, 40) }); render(); changed(); }
    }
    function rubAt(p){
      var n = ops.length;
      for(var i = ops.length - 1; i >= 0; i--){ if(hit(ops[i], p[0], p[1])){ ops.splice(i, 1); } }
      if(ops.length !== n){ render(); changed(); }
    }
    cv.addEventListener("pointerdown", function(e){
      if(e.button > 0) return;
      e.preventDefault();
      var p = pos(e);
      closeText(true);
      try { cv.setPointerCapture(e.pointerId); } catch(x){}
      if(tool === "text"){
        var inp = document.createElement("input"); inp.className = "p2d-t"; inp.type = "text"; inp.maxLength = 40; inp.setAttribute("aria-label", "Label text");
        var r = cv.getBoundingClientRect();
        inp.style.left = (p[0] * r.width / CW) + "px"; inp.style.top = (p[1] * r.height / H - 12) + "px";
        inp._x = p[0]; inp._y = p[1];
        inp.addEventListener("keydown", function(k){ if(k.key === "Enter"){ closeText(true); } else if(k.key === "Escape"){ closeText(false); } });
        inp.addEventListener("blur", function(){ closeText(true); });
        cw.appendChild(inp); textIn = inp; inp.focus(); setTimeout(function(){ if(textIn === inp) inp.focus(); }, 0);
        return;
      }
      if(GATES[tool]){
        ops.push({ t: "gate", k: tool, x: snap(p[0] - GATE_W / 2), y: snap(p[1] - GATE_H / 2) });
        render(); changed(); return;
      }
      if(tool === "rub"){ drag = { t: "rub" }; rubAt(p); return; }
      if(tool === "pen"){ drag = { op: { t: "pen", p: [p] } }; render(drag.op); return; }
      var a = [snap(p[0]), snap(p[1])];
      drag = { op: { t: tool, a: a, b: a.slice() } };
    });
    cv.addEventListener("pointermove", function(e){
      if(!drag) return;
      var p = pos(e);
      if(drag.t === "rub"){ rubAt(p); return; }
      var op = drag.op;
      if(op.t === "pen"){ var lp = op.p[op.p.length - 1]; if(Math.hypot(p[0] - lp[0], p[1] - lp[1]) >= 2){ op.p.push([Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]); render(op); } return; }
      var b = [snap(p[0]), snap(p[1])];
      if(op.t === "line" || op.t === "arrow"){ if(Math.abs(b[0] - op.a[0]) < 14) b[0] = op.a[0]; if(Math.abs(b[1] - op.a[1]) < 14) b[1] = op.a[1]; }
      op.b = b; render(op);
    });
    function up(){
      if(!drag) return;
      var d = drag; drag = null;
      if(d.t === "rub") return;
      var op = d.op;
      if(op.t !== "pen"){ if(Math.abs(op.b[0] - op.a[0]) + Math.abs(op.b[1] - op.a[1]) < 8){ render(); return; } }
      ops.push(op); render(); changed();
    }
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    render();

    return {
      getOps: function(){ return ops.slice(); },
      isEmpty: function(){ return !ops.length; },
      setOps: function(o){ ops = (o || []).slice(); render(); },
      toDataURL: function(){ return toPng(ops, H); },
      destroy: function(){ closeText(false); wrap.remove(); }
    };
  }

  // A white-background PNG of a stored drawing (used on the results page and in print).
  function toPng(ops, H){
    var c = document.createElement("canvas"); c.width = CW; c.height = H || 420;
    var x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, c.width, c.height);
    (ops || []).forEach(function(o){ drawOp(x, o); });
    return c.toDataURL("image/png");
  }
  function isBlank(ops){ return !ops || !ops.length; }

  root.P2Fig = F;
  root.P2Draw = { mount: mount, toPng: toPng, isBlank: isBlank, GATES: GATES, TOOLSETS: TOOLSETS };
})(window);
