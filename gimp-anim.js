/* Animated mini "GIMP window" demos for the GIMP tutorial. Every demo is drawn with SVG and runs on a time value f (0..1).
   window.GIMPANIM.mount(box, topic) builds the player; the steps list under the picture follows the animation. */
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", D = 14000;
  function E(tag, a, p, txt){ var e = document.createElementNS(NS, tag); if(a) for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; if(p) p.appendChild(e); return e; }
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ez(x){ x = cl(x); return x < .5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x); }
  function lp(a, b, t){ return a + (b - a) * t; }
  function sg(f, a, b){ return cl((f - a) / (b - a)); }
  var MENUS = { File: 36, Edit: 60, Select: 82, View: 112, Image: 136, Layer: 162, Colors: 190, Tools: 220, Filters: 246 };
  var CV = { x: 34, y: 34, w: 296, h: 186 };

  // ---------- the picture that every demo edits: a flower in a field ----------
  function scene(defs){
    var g = E("g", { id: "gm-scene" }, defs);
    E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "url(#gm-sky)" }, g);
    E("circle", { cx: 292, cy: 64, r: 14, fill: "#ffd23f" }, g);
    E("ellipse", { cx: 90, cy: 66, rx: 28, ry: 9, fill: "#fff", opacity: ".9" }, g); E("ellipse", { cx: 110, cy: 60, rx: 18, ry: 8, fill: "#fff", opacity: ".9" }, g);
    E("path", { d: "M34,142 Q110,128 190,138 T330,134 L330,220 L34,220 Z", fill: "#4fae55" }, g);
    E("path", { d: "M34,176 Q120,158 200,172 T330,168 L330,220 L34,220 Z", fill: "#3b9a49" }, g);
    var f = E("g", { id: "gm-flower" }, g);
    E("rect", { x: 180.5, y: 140, width: 3, height: 62, fill: "#2e8b3a" }, f);
    E("ellipse", { cx: 172, cy: 172, rx: 9, ry: 4, fill: "#2e8b3a", transform: "rotate(-25 172 172)" }, f); E("ellipse", { cx: 193, cy: 164, rx: 9, ry: 4, fill: "#2e8b3a", transform: "rotate(25 193 164)" }, f);
    for(var i = 0; i < 8; i++){ var a = i * Math.PI / 4; E("circle", { cx: (182 + Math.cos(a) * 14).toFixed(1), cy: (128 + Math.sin(a) * 14).toFixed(1), r: 9, fill: "#ff5c8a" }, f); }
    E("circle", { cx: 182, cy: 128, r: 8, fill: "#ffd23f" }, f);
    return g;
  }
  function use(p, a){ a = a || {}; a.href = "#gm-scene"; return E("use", a, p); }
  function mtx(m){ return m.join(" "); }

  // ---------- generic window ----------
  function build(box){
    var svg = E("svg", { viewBox: "0 0 340 230", class: "gm-svg", role: "img", "aria-label": "Animated demonstration of the steps" });
    var defs = E("defs", null, svg);
    var lg = E("linearGradient", { id: "gm-sky", x1: 0, y1: 0, x2: 0, y2: 1 }, defs); E("stop", { offset: 0, "stop-color": "#6fc3f0" }, lg); E("stop", { offset: 1, "stop-color": "#dff3ff" }, lg);
    var cp = E("clipPath", { id: "gm-cv" }, defs); E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h }, cp);
    var chk = E("pattern", { id: "gm-chk", width: 12, height: 12, patternUnits: "userSpaceOnUse" }, defs);
    E("rect", { width: 12, height: 12, fill: "#fff" }, chk); E("rect", { width: 6, height: 6, fill: "#cfd3d8" }, chk); E("rect", { x: 6, y: 6, width: 6, height: 6, fill: "#cfd3d8" }, chk);
    scene(defs);
    E("rect", { width: 340, height: 230, fill: "#2b2f36" }, svg);
    E("rect", { width: 340, height: 13, fill: "#1a1d22" }, svg); E("text", { x: 6, y: 9.5, fill: "#cfd6df", "font-size": 7.5, "font-family": "system-ui,sans-serif" }, svg, "GIMP");
    E("rect", { y: 13, width: 340, height: 15, fill: "#3a3f48" }, svg);
    var mh = E("rect", { y: 15, height: 11, rx: 2, fill: "#e8a33d", opacity: 0 }, svg);
    Object.keys(MENUS).forEach(function(k){ E("text", { x: MENUS[k], y: 23.5, fill: "#e6ebf2", "font-size": 8, "font-family": "system-ui,sans-serif" }, svg, k); });
    // toolbox
    var icons = [];
    for(var i = 0; i < 7; i++){ icons.push(E("rect", { x: 5, y: 36 + i * 24, width: 20, height: 20, rx: 4, fill: "#4a505b" }, svg)); E("circle", { cx: 15, cy: 46 + i * 24, r: 4.5, fill: "none", stroke: "#cfd6df", "stroke-width": 1.2 }, svg); }
    E("rect", { x: CV.x - 1, y: CV.y - 1, width: CV.w + 2, height: CV.h + 2, fill: "#fff", stroke: "#111" }, svg);
    var cvBg = E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "#fff" }, svg);
    var art = E("g", { "clip-path": "url(#gm-cv)" }, svg), fx = E("g", { "clip-path": "url(#gm-cv)" }, svg);
    var top = E("g", null, svg);
    var dd = E("g", { opacity: 0 }, top), ddr = E("rect", { y: 28, height: 14, rx: 2, fill: "#f5f7fa", stroke: "#222", "stroke-width": .6 }, dd), ddt = E("text", { y: 38, fill: "#111", "font-size": 8, "font-family": "system-ui,sans-serif" }, dd);
    var cur = E("polygon", { points: "0,0 0,13 3.6,10 6.2,15.5 8.4,14.5 5.9,9.2 10.5,9", fill: "#fff", stroke: "#000", "stroke-width": .9 }, top);
    var S = { svg: svg, defs: defs, art: art, fx: fx, top: top, cv: cvBg, cx: 300, cy: 200, icons: icons };
    S.cursor = function(x, y){ S.cx = x; S.cy = y; cur.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); };
    S.menu = function(name, label, on){      // highlight a menu title and show its drop-down item
      var x = MENUS[name]; mh.setAttribute("x", x - 3); mh.setAttribute("width", name.length * 4.6 + 6); mh.setAttribute("opacity", on ? .95 : 0);
      var w = label.length * 4.3 + 14; ddr.setAttribute("x", x - 3); ddr.setAttribute("width", w); ddt.setAttribute("x", x + 3); ddt.textContent = label; dd.setAttribute("opacity", on ? 1 : 0);
    };
    S.menuMove = function(p, name){ var x = MENUS[name]; S.cursor(lp(S.cx0 == null ? 300 : S.cx0, x + 8, ez(sg(p, 0, .55))), lp(S.cy0 == null ? 190 : S.cy0, 21, ez(sg(p, 0, .55))) + (p > .55 ? lp(0, 15, ez(sg(p, .55, 1))) : 0)); };
    S.cursor(300, 205);
    return S;
  }
  function tag(S, x, y, text, anchor){ return E("text", { x: x, y: y, fill: "#fff", "font-size": 9, "font-weight": 700, "font-family": "system-ui,sans-serif", "text-anchor": anchor || "start", "paint-order": "stroke", stroke: "#000", "stroke-width": 2.4 }, S.fx, text); }
  function dialog(S, x, y, w, title, rows){
    var g = E("g", { opacity: 0 }, S.fx), h = 16 + rows.length * 17;
    E("rect", { x: x, y: y, width: w, height: h, rx: 4, fill: "#f2f4f7", stroke: "#222", "stroke-width": .8 }, g);
    E("rect", { x: x, y: y, width: w, height: 12, rx: 4, fill: "#d3d9e2" }, g); E("text", { x: x + 5, y: y + 9, "font-size": 7.5, "font-weight": 700, fill: "#111", "font-family": "system-ui,sans-serif" }, g, title);
    var knobs = [];
    rows.forEach(function(r, i){ var ry = y + 24 + i * 17;
      E("text", { x: x + 5, y: ry, "font-size": 7, fill: "#222", "font-family": "system-ui,sans-serif" }, g, r);
      E("rect", { x: x + w * .5, y: ry - 3, width: w * .45, height: 2.4, rx: 1, fill: "#9aa3b0" }, g);
      knobs.push(E("circle", { cx: x + w * .5, cy: ry - 1.8, r: 3.6, fill: "#e8a33d", stroke: "#7a4c00", "stroke-width": .6 }, g)); });
    var ok = E("g", null, g); var okr = E("rect", { x: x + w - 34, y: y + h - 3, width: 28, height: 11, rx: 3, fill: "#e8a33d", stroke: "#7a4c00", "stroke-width": .7 }, ok); E("text", { x: x + w - 20, y: y + h + 5, "text-anchor": "middle", "font-size": 7.5, "font-weight": 700, fill: "#111", "font-family": "system-ui,sans-serif" }, ok, "OK");
    var D2 = { g: g, ok: okr, okx: x + w - 20, oky: y + h + 3, show: function(o){ g.setAttribute("opacity", o); },
      set: function(i, v){ knobs[i].setAttribute("cx", x + w * .5 + w * .45 * cl(v)); } };
    return D2;
  }
  function ants(el, f){ el.setAttribute("stroke-dashoffset", (-f * 90).toFixed(1)); }
  function ring(p, cx, cy, r){ var a = -Math.PI / 2 + p * Math.PI * 2; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; }
  function rnd(seed){ var s = seed; return function(){ s = (s * 9301 + 49297) % 233280; return s / 233280; }; }

  // ---------- the demos ----------
  var A = {};
  A.intro = function(S){
    var ph = use(S.art, { opacity: 0 }), ok = tag(S, 182, 212, "photo.png  ✓ saved", "middle"); ok.setAttribute("opacity", 0);
    return { marks: [.22, .45, .72, 1], frame: function(f){
      var a = sg(f, 0, .22); S.menu("File", "Open…", f < .22 && a > .35);
      S.cursor(f < .22 ? lp(300, 46, ez(a)) : f < .45 ? lp(46, 190, ez(sg(f, .22, .45))) : f < .72 ? 30 + 0 : 46, f < .22 ? lp(205, 22 + (a > .6 ? 15 : 0), ez(a)) : f < .45 ? lp(37, 120, ez(sg(f, .22, .45))) : f < .72 ? 36 : 22);
      ph.setAttribute("opacity", ez(sg(f, .22, .38)));
      if(f >= .45 && f < .72){ var k = Math.floor(sg(f, .45, .72) * 7); S.cursor(15 + 3, 46 + Math.min(6, k) * 24 + 10); S.icons.forEach(function(r, i){ r.setAttribute("fill", i === k ? "#e8a33d" : "#4a505b"); }); } else S.icons.forEach(function(r){ r.setAttribute("fill", "#4a505b"); });
      if(f >= .72){ S.menu("File", "Export As… (.png)", f < .9); S.cursor(lp(46, 50, 1), lp(22, 37, ez(sg(f, .72, .8)))); }
      ok.setAttribute("opacity", f > .9 ? 1 : 0);
    } };
  };
  function flowerBase(S, withUse){ var ph = use(S.art); return ph; }
  A.free = function(S){
    use(S.art);
    var pts = [[156,126],[160,110],[172,102],[190,102],[204,110],[208,126],[200,142],[188,150],[186,204],[178,204],[176,150],[164,142]];
    var line = E("polyline", { fill: "none", stroke: "#fff", "stroke-width": 1.6 }, S.fx), line2 = E("polyline", { fill: "none", stroke: "#000", "stroke-width": .8 }, S.fx);
    var dots = pts.map(function(p){ return E("rect", { x: p[0] - 2, y: p[1] - 2, width: 4, height: 4, fill: "#e8a33d", stroke: "#000", "stroke-width": .6, opacity: 0 }, S.fx); });
    var poly = E("polygon", { points: pts.join(" "), fill: "none", stroke: "#000", "stroke-width": 1.4, "stroke-dasharray": "4 3", opacity: 0 }, S.fx);
    var win = E("g", { opacity: 0 }, S.fx); E("rect", { x: 228, y: 38, width: 100, height: 116, fill: "#fff", stroke: "#111" }, win); E("rect", { x: 228, y: 38, width: 100, height: 10, fill: "#cfd6df" }, win); E("text", { x: 233, y: 46, "font-size": 7, fill: "#111", "font-family": "system-ui,sans-serif" }, win, "New file");
    var cp = use(S.fx, { opacity: 0 }); cp.setAttribute("href", "#gm-flower");
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.2, .62, .78, 1], frame: function(f){
      S.menu("Tools", "Selection Tools › Free Select", f < .2 && f > .06);
      if(f < .2){ S.cursor(lp(300, 232, ez(sg(f, 0, .1))), lp(205, 22, ez(sg(f, 0, .1))) + lp(0, 15, ez(sg(f, .1, .2)))); }
      var p = sg(f, .2, .62), k = Math.floor(p * pts.length + .0001), n = f >= .62 ? pts.length : Math.min(pts.length, k);
      var path = pts.slice(0, n).map(function(q){ return q.join(","); }).join(" "); line.setAttribute("points", path); line2.setAttribute("points", path);
      dots.forEach(function(d, i){ d.setAttribute("opacity", i < n && f < .78 ? 1 : 0); });
      if(f >= .2 && f < .62 && n > 0){ var q = pts[Math.min(n, pts.length) - 1]; S.cursor(q[0], q[1]); }
      poly.setAttribute("opacity", f >= .62 ? 1 : 0); ants(poly, f);
      if(f >= .62){ line.setAttribute("points", ""); line2.setAttribute("points", ""); }
      t1.textContent = f >= .62 && f < .78 ? "Enter" : f < .62 && f > .2 ? "click, click, click…" : f >= .78 ? "Ctrl+C  →  Ctrl+V" : "";
      var c = ez(sg(f, .78, .98)); win.setAttribute("opacity", f >= .78 ? 1 : 0); cp.setAttribute("opacity", f >= .8 ? 1 : 0);
      var s = lp(1, .8, c), tx = lp(0, 130.4, c), ty = lp(0, -30.8, c); cp.setAttribute("transform", "translate(" + tx + " " + ty + ") scale(" + s + ")");
      if(f >= .78) S.cursor(lp(190, 300, c), lp(140, 110, c));
    } };
  };
  A.scissors = function(S){
    use(S.art);
    var head = E("circle", { cx: 182, cy: 128, r: 26, fill: "none", stroke: "#000", "stroke-width": 1.6, "stroke-dasharray": "163", "stroke-dashoffset": 163, transform: "rotate(-90 182 128)" }, S.fx);
    var stem = E("rect", { x: 177, y: 152, width: 10, height: 52, fill: "none", stroke: "#000", "stroke-width": 1.4, "stroke-dasharray": "4 3", opacity: 0 }, S.fx);
    var ms = [0, .25, .5, .75].map(function(a){ var q = ring(a, 182, 128, 26); return E("rect", { x: q[0] - 2, y: q[1] - 2, width: 4, height: 4, fill: "#e8a33d", stroke: "#000", "stroke-width": .6, opacity: 0 }, S.fx); });
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.15, .35, .8, 1], frame: function(f){
      S.menu("Tools", "Selection Tools › Intelligent Scissors", f < .15 && f > .04);
      if(f < .15) S.cursor(lp(300, 222, ez(sg(f, 0, .08))), lp(205, 22, ez(sg(f, 0, .08))) + lp(0, 15, ez(sg(f, .08, .15))));
      var a = f < .35 ? 0 : sg(f, .35, .8) * 1; var start = f >= .15 ? 1 : 0;
      ms.forEach(function(m, i){ m.setAttribute("opacity", f >= .2 + i * .1 && f < .85 ? 1 : 0); });
      var p = f < .2 ? 0 : sg(f, .2, .8); head.setAttribute("stroke-dashoffset", (163 * (1 - p)).toFixed(1));
      if(f >= .2 && f < .8){ var q = ring(p, 182, 128, 26); S.cursor(q[0], q[1]); } else if(f >= .15 && f < .2){ var q0 = ring(0, 182, 128, 26); S.cursor(lp(222, q0[0], ez(sg(f, .15, .2))), lp(37, q0[1], ez(sg(f, .15, .2)))); }
      stem.setAttribute("opacity", f > .75 ? 1 : 0);
      if(f >= .85){ head.setAttribute("stroke-dasharray", "4 3"); ants(head, f); ants(stem, f); } else head.setAttribute("stroke-dasharray", "163");
      t1.textContent = f < .2 ? "" : f < .8 ? "the line snaps to the edge" : f < .88 ? "click the first point, press Enter" : "selected!";
    } };
  };
  A.foreground = function(S){
    use(S.art);
    var loop = E("ellipse", { cx: 182, cy: 150, rx: 46, ry: 70, fill: "none", stroke: "#3b82f6", "stroke-width": 1.6, "stroke-dasharray": "380", "stroke-dashoffset": 380 }, S.fx);
    var hole = "M" + CV.x + "," + CV.y + "H" + (CV.x + CV.w) + "V" + (CV.y + CV.h) + "H" + CV.x + "Z M182,100a28,28 0 1,0 .1,0Z M176,150h12v54h-12Z";
    var mask = E("path", { d: hole, "fill-rule": "evenodd", fill: "#a56bff", opacity: 0 }, S.fx), chk = E("path", { d: hole, "fill-rule": "evenodd", fill: "url(#gm-chk)", opacity: 0 }, S.fx);
    var pen = E("polyline", { points: "", fill: "none", stroke: "#2ee07a", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" }, S.fx);
    var t1 = tag(S, 182, 214, "", "middle");
    var line = [[182,112],[182,128],[168,126],[196,126],[182,128],[182,160],[182,196]];
    return { marks: [.25, .45, .75, 1], frame: function(f){
      S.menu("Tools", "Selection Tools › Foreground Select", f < .1 && f > .02);
      var p = sg(f, .08, .25); loop.setAttribute("stroke-dashoffset", (380 * (1 - ez(p))).toFixed(1));
      if(f < .08) S.cursor(lp(300, 232, ez(sg(f, 0, .05))), lp(205, 22, ez(sg(f, 0, .05))) + lp(0, 15, ez(sg(f, .05, .08))));
      else if(f < .25){ var q = ring(ez(p), 182, 150, 60); S.cursor(182 + (q[0] - 182) * .78, 150 + (q[1] - 150) * 1.17); }
      mask.setAttribute("opacity", f >= .25 ? (f < .75 ? .55 : lp(.55, 0, sg(f, .75, .85))) : 0);
      if(f >= .25 && f < .45) S.cursor(182, 140);
      var n = f < .45 ? 0 : Math.ceil(sg(f, .45, .75) * line.length); pen.setAttribute("points", line.slice(0, n).join(" "));
      if(n > 0 && f < .75) S.cursor(line[n - 1][0], line[n - 1][1]);
      chk.setAttribute("opacity", f >= .8 ? sg(f, .8, .9) : 0);
      if(f >= .75) S.cursor(lp(182, 296, ez(sg(f, .75, .9))), lp(196, 200, ez(sg(f, .75, .9))));
      t1.textContent = f < .25 ? "draw a rough loop" : f < .45 ? "purple = background" : f < .75 ? "paint over the flower" : "Select  →  Enter";
      loop.setAttribute("opacity", f < .25 ? 1 : f < .45 ? .4 : 0);
    } };
  };
  A.oldphoto = function(S){
    var fl = E("filter", { id: "gm-old", x: 0, y: 0, width: 1, height: 1 }, S.defs), fm = E("feColorMatrix", { type: "matrix" }, fl), fb = E("feGaussianBlur", { stdDeviation: 0 }, fl);
    use(S.art, { filter: "url(#gm-old)" });
    var r = rnd(7), spots = []; for(var i = 0; i < 26; i++) spots.push(E("circle", { cx: CV.x + r() * CV.w, cy: CV.y + r() * CV.h, r: .6 + r() * 1.8, fill: r() > .5 ? "#3b2a18" : "#f4e7cc", opacity: 0 }, S.fx));
    var vg = E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "none", stroke: "#4a3a24", "stroke-width": 0, opacity: .55 }, S.fx);
    var dg = dialog(S, 214, 40, 112, "Old Photo", ["Defocus", "Sepia", "Mottle"]);
    var t1 = tag(S, 182, 214, "", "middle");
    function setS(s, b){ var id = [1,0,0,0,0, 0,1,0,0,0, 0,0,1,0,0, 0,0,0,1,0], se = [.393,.769,.189,0,0, .349,.686,.168,0,0, .272,.534,.131,0,0, 0,0,0,1,0]; fm.setAttribute("values", id.map(function(v, i){ return lp(v, se[i], s).toFixed(3); }).join(" ")); fb.setAttribute("stdDeviation", b.toFixed(2)); }
    return { marks: [.2, .4, .8, 1], frame: function(f){
      S.menu("Filters", "Decor › Old Photo", f < .2 && f > .05);
      if(f < .2) S.cursor(lp(300, 252, ez(sg(f, 0, .1))), lp(205, 22, ez(sg(f, 0, .1))) + lp(0, 15, ez(sg(f, .1, .2))));
      dg.show(f >= .22 && f < .95 ? 1 : 0);
      var k = ez(sg(f, .4, .8)); dg.set(0, k * .45); dg.set(1, k * .9); dg.set(2, k * .55); setS(k * .95, k * 1.2);
      spots.forEach(function(s, i){ s.setAttribute("opacity", i / spots.length < k ? .6 : 0); }); vg.setAttribute("stroke-width", k * 8);
      if(f >= .2 && f < .4) S.cursor(lp(252, 250, 1), lp(37, 52, ez(sg(f, .2, .4)))); else if(f >= .4 && f < .8) S.cursor(lp(214 + 112 * .5, 214 + 112 * (.5 + .45 * k), 1), 52 + (f > .6 ? 17 : 0)); else if(f >= .8) S.cursor(lp(250, dg.okx, ez(sg(f, .8, .92))), lp(70, dg.oky, ez(sg(f, .8, .92))));
      t1.textContent = f >= .95 ? "a copy is made" : "";
    } };
  };
  A.newsprint = function(S){
    var bg = E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "#fff", opacity: 0 }, S.fx);
    var ph = use(S.art);
    function bright(x, y){ if(Math.hypot(x - 182, y - 128) < 24) return .62; if(Math.abs(x - 182) < 6 && y > 140 && y < 204) return .3; if(Math.hypot(x - 292, y - 64) < 15) return .98; if(y > 168) return .3; if(y > 134) return .42; return .9 - (y - 34) * .0015; }
    var g = E("g", null, S.fx), dots = []; for(var y = CV.y + 6; y < CV.y + CV.h; y += 10){ for(var x = CV.x + 6; x < CV.x + CV.w; x += 10){ dots.push({ e: E("circle", { cx: x, cy: y, r: 0, fill: "#1c1c1c" }, g), b: bright(x, y) }); } }
    var dg = dialog(S, 214, 40, 112, "Newsprint", ["Pattern: dots", "Angle"]);
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.2, .4, .7, 1], frame: function(f){
      S.menu("Filters", "Distorts › Newsprint", f < .2 && f > .05);
      if(f < .2) S.cursor(lp(300, 252, ez(sg(f, 0, .1))), lp(205, 22, ez(sg(f, 0, .1))) + lp(0, 15, ez(sg(f, .1, .2))));
      dg.show(f >= .22 && f < .9 ? 1 : 0); dg.set(0, .3); dg.set(1, f > .7 ? sg(f, .7, .95) * .4 : 0);
      var k = ez(sg(f, .4, .7)); bg.setAttribute("opacity", k); ph.setAttribute("opacity", 1 - k);
      dots.forEach(function(d){ d.e.setAttribute("r", ((1 - d.b) * 5.6 * k + .2 * k).toFixed(2)); });
      g.setAttribute("transform", "rotate(" + (f > .7 ? sg(f, .7, .95) * 12 : 0) + " 182 127)");
      if(f >= .2) S.cursor(lp(252, 270, 1), lp(37, 150, ez(sg(f, .2, .4))));
      t1.textContent = f > .4 ? "big dots = dark, small dots = light" : "";
    } };
  };
  A.artistic = function(S){
    var fl = E("filter", { id: "gm-oil", x: 0, y: 0, width: 1, height: 1 }, S.defs), fb = E("feGaussianBlur", { stdDeviation: 0 }, fl), ft = E("feComponentTransfer", null, fl);
    ["feFuncR", "feFuncG", "feFuncB"].forEach(function(n){ E(n, { type: "discrete", tableValues: "0 .2 .4 .6 .8 1" }, ft); });
    var pat = E("pattern", { id: "gm-cnv", width: 5, height: 5, patternUnits: "userSpaceOnUse" }, S.defs); E("path", { d: "M0,0H5M0,0V5", stroke: "#5b4a2c", "stroke-width": .7, opacity: .55 }, pat);
    var ph = use(S.art); var cnv = E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "url(#gm-cnv)", opacity: 0 }, S.fx);
    var r = rnd(11), st = []; function col(x, y){ if(Math.hypot(x - 182, y - 128) < 22) return "#ff5c8a"; if(Math.hypot(x - 292, y - 64) < 15) return "#ffd23f"; if(y > 168) return "#3b9a49"; if(y > 136) return "#4fae55"; return "#8fd0f4"; }
    for(var i = 0; i < 160; i++){ var x = CV.x + r() * CV.w, y = CV.y + r() * CV.h, a = r() * 6.28; st.push(E("line", { x1: x, y1: y, x2: x + Math.cos(a) * 9, y2: y + Math.sin(a) * 9, stroke: col(x, y), "stroke-width": 3.2, "stroke-linecap": "round", opacity: 0 }, S.fx)); }
    var t1 = tag(S, 40, 46, ""); t1.setAttribute("font-size", 11);
    return { marks: [.15, .4, .7, 1], frame: function(f){
      S.menu("Filters", "Artistic › …", f < .15 && f > .03);
      if(f < .15) S.cursor(lp(300, 252, ez(sg(f, 0, .08))), lp(205, 22, ez(sg(f, 0, .08))) + lp(0, 15, ez(sg(f, .08, .15))));
      var c = f >= .15 && f < .4 ? ez(sg(f, .15, .3)) : 0; cnv.setAttribute("opacity", c);
      var o = f >= .4 && f < .7 ? ez(sg(f, .4, .55)) : f >= .7 ? 1 : 0; fb.setAttribute("stdDeviation", (o * 1.3).toFixed(2));
      ph.setAttribute("filter", o > 0 ? "url(#gm-oil)" : "none");
      var g = f >= .7 ? sg(f, .7, .92) : 0; st.forEach(function(s, i){ s.setAttribute("opacity", i / st.length < g ? .95 : 0); });
      t1.textContent = f < .15 ? "" : f < .4 ? "Apply Canvas" : f < .7 ? "Oilify" : "GIMPressionist";
      if(f >= .15) S.cursor(lp(250, 150, ez(sg(f, .15, 1))), lp(40, 110, ez(sg(f, .15, 1))));
    } };
  };
  A.enhance = function(S){
    var fl = E("filter", { id: "gm-enh", x: 0, y: 0, width: 1, height: 1 }, S.defs), fm = E("feColorMatrix", { type: "saturate", values: ".4" }, fl);
    var fd = E("filter", { id: "gm-dull", x: 0, y: 0, width: 1, height: 1 }, S.defs); E("feColorMatrix", { type: "saturate", values: ".4" }, fd);
    var ph = use(S.art, { filter: "url(#gm-enh)" });
    var cp = E("clipPath", { id: "gm-half" }, S.defs), cr = E("rect", { x: CV.x, y: CV.y, width: 0, height: CV.h }, cp);
    var left = use(S.fx, { filter: "url(#gm-dull)", "clip-path": "url(#gm-half)", opacity: 0 });
    var dv = E("rect", { x: CV.x, y: CV.y, width: 2, height: CV.h, fill: "#fff", opacity: 0 }, S.fx);
    var tb = tag(S, 40, 46, "", "start"), ta = tag(S, 326, 46, "", "end"), t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.2, .4, .75, 1], frame: function(f){
      S.menu("Colors", "Auto › Color Enhance", f < .4 && f > .06);
      if(f < .2) S.cursor(lp(300, 200, ez(sg(f, 0, .1))), lp(205, 22, ez(sg(f, 0, .1))) + lp(0, 15, ez(sg(f, .1, .2))));
      var k = ez(sg(f, .4, .62)); fm.setAttribute("values", lp(.4, 1.35, k).toFixed(2)); ph.setAttribute("opacity", 1);
      var s = f < .75 ? 0 : sg(f, .75, .98); var x = lp(CV.x, CV.x + CV.w, ez(s)); cr.setAttribute("width", Math.max(0, x - CV.x)); left.setAttribute("opacity", f >= .75 ? 1 : 0); dv.setAttribute("x", x - 1); dv.setAttribute("opacity", f >= .75 ? 1 : 0);
      tb.textContent = f >= .75 && s < .85 ? "Before" : ""; ta.textContent = f >= .75 && s > .15 ? "After" : "";
      t1.textContent = f < .4 ? "dull colours" : f < .75 ? "colours become lively" : "";
      if(f >= .2 && f < .4) S.cursor(lp(200, 250, 1), lp(37, 150, ez(sg(f, .2, .4)))); else if(f >= .75) S.cursor(x, 150);
    } };
  };
  A.balance = function(S){
    var fl = E("filter", { id: "gm-bal", x: 0, y: 0, width: 1, height: 1, "color-interpolation-filters": "sRGB" }, S.defs), fm = E("feColorMatrix", { type: "matrix" }, fl);
    use(S.art, { filter: "url(#gm-bal)" });
    var dg = dialog(S, 200, 40, 128, "Color Balance", ["Cyan – Red", "Magenta – Green", "Yellow – Blue"]);
    var chips = E("g", { opacity: 0 }, S.fx); ["Shadows", "Midtones", "Highlights"].forEach(function(n, i){ E("rect", { x: 202 + i * 41, y: 112, width: 38, height: 10, rx: 3, fill: i === 1 ? "#e8a33d" : "#d3d9e2", stroke: "#222", "stroke-width": .5 }, chips); E("text", { x: 221 + i * 41, y: 119.5, "text-anchor": "middle", "font-size": 6.5, fill: "#111", "font-family": "system-ui,sans-serif" }, chips, n); });
    var t1 = tag(S, 182, 214, "", "middle");
    function set(k){ fm.setAttribute("values", [1,0,0,0,lp(-.1,0,k),  0,1,0,0,lp(0,0,k),  0,0,1,0,lp(.2,0,k),  0,0,0,1,0].join(" ")); }
    return { marks: [.2, .4, .8, 1], frame: function(f){
      S.menu("Colors", "Color Balance…", f < .2 && f > .05);
      if(f < .2) S.cursor(lp(300, 200, ez(sg(f, 0, .1))), lp(205, 22, ez(sg(f, 0, .1))) + lp(0, 15, ez(sg(f, .1, .2))));
      dg.show(f >= .2 ? 1 : 0); chips.setAttribute("opacity", f >= .2 && f < .9 ? 1 : 0);
      var k = ez(sg(f, .4, .8)); set(k); dg.set(0, lp(.3, .5, k)); dg.set(1, .5); dg.set(2, lp(.85, .5, k));
      if(f >= .2 && f < .4) S.cursor(lp(230, 262, ez(sg(f, .2, .4))), lp(40, 116, ez(sg(f, .2, .4)))); else if(f >= .4 && f < .8){ S.cursor(lp(240, 270, k), 82 + 0); }
      else if(f >= .8) S.cursor(lp(270, dg.okx, ez(sg(f, .8, .95))), lp(82, dg.oky, ez(sg(f, .8, .95))));
      t1.textContent = f < .4 ? "the picture looks too blue" : f < .8 ? "move the sliders" : "";
    } };
  };
  A.straighten = function(S){
    var g = E("g", null, S.art), ph = use(g, null);
    var guide = E("line", { x1: CV.x, y1: 138, x2: CV.x + CV.w, y2: 138, stroke: "#2fa4ff", "stroke-width": 1.2, "stroke-dasharray": "5 3", opacity: 0 }, S.fx);
    var rul = E("rect", { x: CV.x, y: CV.y - 6, width: CV.w, height: 5, fill: "#6a7280" }, S.top);
    var dg = dialog(S, 232, 40, 96, "Rotate", ["Angle"]);
    var t1 = tag(S, 182, 214, "", "middle"), val = tag(S, 326, 46, "", "end");
    return { marks: [.15, .4, .65, 1], frame: function(f){
      var ang = f < .65 ? -9 : lp(-9, 0, ez(sg(f, .65, .95))); g.setAttribute("transform", "rotate(" + ang.toFixed(2) + " 182 127) scale(1.12)"); g.setAttribute("transform", "translate(-22 -15) rotate(" + ang.toFixed(2) + " 204 142) scale(1.12)");
      guide.setAttribute("opacity", f >= .2 ? 1 : 0); var d = ez(sg(f, .2, .4)); guide.setAttribute("y1", lp(CV.y, 138, d)); guide.setAttribute("y2", lp(CV.y, 138, d));
      if(f >= .15 && f < .4) S.cursor(lp(120, 120, 1), lp(CV.y, 138, d));
      S.menu("Tools", "Transform Tools › Rotate", f >= .4 && f < .55);
      if(f >= .4 && f < .55) S.cursor(lp(120, 232, ez(sg(f, .4, .5))), lp(138, 22, ez(sg(f, .4, .5))) + lp(0, 15, ez(sg(f, .5, .55))));
      dg.show(f >= .55 ? 1 : 0); dg.set(0, .5 + ang / 40); val.textContent = f >= .55 ? "Angle: " + ang.toFixed(1) + "°" : "";
      if(f >= .55) S.cursor(lp(240, 296, ez(sg(f, .55, .95))), 150 - (ang * 2));
      t1.textContent = f < .15 ? "the horizon is crooked" : f < .4 ? "drag a guideline from the ruler" : f < .65 ? "" : f < .95 ? "turn until it lines up" : "straight!";
    } };
  };
  A.redeye = function(S){
    var bg = E("rect", { x: CV.x, y: CV.y, width: CV.w, height: CV.h, fill: "#c9b79c" }, S.art);
    E("circle", { cx: 182, cy: 128, r: 64, fill: "#f2c9a0" }, S.art); E("path", { d: "M118,118 Q182,40 246,118 Q220,80 182,80 Q144,80 118,118Z", fill: "#3a2a1c" }, S.art);
    E("path", { d: "M170,152 Q182,160 194,152", fill: "none", stroke: "#a4553a", "stroke-width": 2.2 }, S.art); E("path", { d: "M182,126 L178,146 L186,146", fill: "none", stroke: "#d9a77c", "stroke-width": 1.6 }, S.art);
    var pupils = [];
    [150, 214].forEach(function(x){ E("ellipse", { cx: x, cy: 114, rx: 17, ry: 10, fill: "#fff", stroke: "#8a6b52", "stroke-width": .8 }, S.art); pupils.push(E("circle", { cx: x, cy: 114, r: 7, fill: "#e0242a" }, S.art)); E("circle", { cx: x - 2.5, cy: 111.5, r: 1.8, fill: "#fff" }, S.art); });
    var sel = [150, 214].map(function(x){ return E("ellipse", { cx: x, cy: 114, rx: 21, ry: 14, fill: "none", stroke: "#000", "stroke-width": 1.3, "stroke-dasharray": "4 3", opacity: 0 }, S.fx); });
    var dg = dialog(S, 232, 150, 96, "Red Eye Removal", ["Threshold"]);
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.25, .45, .85, 1], frame: function(f){
      sel.forEach(function(s){ s.setAttribute("opacity", f >= .08 && f < .95 ? 1 : 0); ants(s, f); });
      if(f < .25) S.cursor(lp(300, 150, ez(sg(f, 0, .12))), lp(205, 114, ez(sg(f, 0, .12))));
      S.menu("Filters", "Enhance › Red Eye Removal", f >= .25 && f < .45);
      if(f >= .25 && f < .45) S.cursor(lp(150, 252, ez(sg(f, .25, .37))), lp(114, 22, ez(sg(f, .25, .37))) + lp(0, 15, ez(sg(f, .37, .45))));
      dg.show(f >= .45 ? 1 : 0); var k = ez(sg(f, .5, .85)); dg.set(0, k * .7);
      var c = [lp(224, 24, k), lp(36, 24, k), lp(42, 28, k)].map(function(v){ return Math.round(v); }).join(","); pupils.forEach(function(p){ p.setAttribute("fill", "rgb(" + c + ")"); });
      if(f >= .45 && f < .85) S.cursor(lp(250, 250 + 70 * .7 * k, 1), 172); else if(f >= .85) S.cursor(lp(280, dg.okx, ez(sg(f, .85, .95))), lp(172, dg.oky, ez(sg(f, .85, .95))));
      t1.textContent = f < .25 ? "select the eyes" : f > .9 ? "no more red eye" : "";
    } };
  };
  A.clone = function(S){
    use(S.art);
    var cp = E("clipPath", { id: "gm-rv" }, S.defs), cr = E("rect", { x: 236, y: CV.y, width: 0, height: CV.h }, cp);
    var cg = E("g", { "clip-path": "url(#gm-rv)" }, S.fx), cu = E("use", { href: "#gm-flower", transform: "translate(82 0)" }, cg);
    var src = E("g", null, S.fx); E("circle", { cx: 0, cy: 0, r: 6, fill: "none", stroke: "#e8a33d", "stroke-width": 1.5 }, src); E("path", { d: "M-9,0H9M0,-9V9", stroke: "#e8a33d", "stroke-width": 1.2 }, src);
    var brush = E("circle", { r: 9, fill: "none", stroke: "#000", "stroke-width": 1, "stroke-dasharray": "3 2" }, S.fx);
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.15, .4, .85, 1], frame: function(f){
      S.menu("Tools", "Paint Tools › Clone", f < .15 && f > .03);
      if(f < .15) S.cursor(lp(300, 222, ez(sg(f, 0, .08))), lp(205, 22, ez(sg(f, 0, .08))) + lp(0, 15, ez(sg(f, .08, .15))));
      var a = ez(sg(f, .15, .35)); var p = f < .4 ? 0 : sg(f, .4, .85); var cx = f < .15 ? 0 : f < .4 ? lp(222, 182, a) : lp(182, 182, 1), cy = f < .4 ? lp(37, 128, a) : 128;
      var dx = lp(236, 284, ez(p)), dy = lp(108, 190, ez(p));
      src.setAttribute("opacity", f >= .2 ? 1 : 0); brush.setAttribute("opacity", f >= .4 ? 1 : 0);
      if(f >= .15 && f < .4){ S.cursor(cx, cy); src.setAttribute("transform", "translate(182 128)"); }
      if(f >= .4){ S.cursor(dx, dy); brush.setAttribute("cx", dx); brush.setAttribute("cy", dy); src.setAttribute("transform", "translate(" + (dx - 82) + " " + dy + ")"); }
      cr.setAttribute("width", f < .4 ? 0 : (f >= .85 ? 60 : 60 * ez(p)));
      t1.textContent = f < .15 ? "" : f < .4 ? "Ctrl + click the source" : f < .85 ? "drag over the destination" : "copied!";
    } };
  };
  A.despeckle = function(S){
    use(S.art);
    var r = rnd(3), sp = [], i; for(i = 0; i < 34; i++){ var x = CV.x + 6 + r() * (CV.w - 12), y = CV.y + 6 + r() * (CV.h - 12); sp.push(E("circle", { cx: x, cy: y, r: .8 + r() * 1.6, fill: r() > .35 ? "#222" : "#fff" }, S.fx)); }
    for(i = 0; i < 4; i++){ var x2 = CV.x + 20 + r() * 250, y2 = CV.y + 10 + r() * 140; sp.push(E("line", { x1: x2, y1: y2, x2: x2 + 2 + r() * 4, y2: y2 + 14 + r() * 18, stroke: "#fff", "stroke-width": 1 }, S.fx)); }
    var dg = dialog(S, 214, 40, 112, "Despeckle", ["Radius", "Black level", "White level"]);
    var t1 = tag(S, 182, 214, "", "middle");
    return { marks: [.2, .4, .8, 1], frame: function(f){
      S.menu("Filters", "Enhance › Despeckle", f >= .2 && f < .4);
      if(f < .2) S.cursor(lp(300, 252, ez(sg(f, 0, .1))), 205 - 0);
      if(f >= .2 && f < .4) S.cursor(lp(252, 252, 1), lp(190, 37, ez(sg(f, .2, .3))));
      dg.show(f >= .4 && f < .95 ? 1 : 0); var k = ez(sg(f, .45, .75)); dg.set(0, .12); dg.set(1, k * .3); dg.set(2, 1 - k * .3);
      sp.forEach(function(s, i){ s.setAttribute("opacity", f < .45 ? 1 : Math.max(0, 1 - k * 1.6 + (i % 5) * 0.06 * (1 - k))); });
      if(f >= .4 && f < .8) S.cursor(lp(256, 266, k), lp(52, 70, k)); else if(f >= .8) S.cursor(lp(266, dg.okx, ez(sg(f, .8, .92))), lp(70, dg.oky, ez(sg(f, .8, .92))));
      t1.textContent = f < .4 ? "dust and small marks" : f > .9 ? "clean!" : "";
    } };
  };

  // ---------- player ----------
  var reduce = false; try{ reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
  var cur = null;
  function mount(box, topic){
    if(cur){ cur.dead = true; cur = null; }
    box.textContent = "";
    var wrap = document.createElement("div"); wrap.className = "gm-player"; box.appendChild(wrap);
    var path = document.createElement("div"); path.className = "gm-path"; path.textContent = topic.path; wrap.appendChild(path);
    var S = build(); wrap.appendChild(S.svg);
    var ctl = document.createElement("div"); ctl.className = "gm-ctl"; wrap.appendChild(ctl);
    var play = document.createElement("button"); play.type = "button"; play.className = "btn btn-secondary"; ctl.appendChild(play);
    var rep = document.createElement("button"); rep.type = "button"; rep.className = "btn btn-secondary"; rep.textContent = "↻ Replay"; ctl.appendChild(rep);
    var ol = document.createElement("ol"); ol.className = "gm-steps"; wrap.appendChild(ol);
    var anim = A[topic.anim](S), M = anim.marks, items = topic.steps.map(function(s, i){
      var li = document.createElement("li"), b = document.createElement("button"); b.type = "button"; b.textContent = s; li.appendChild(b); ol.appendChild(li);
      b.addEventListener("click", function(){ seek(i === 0 ? 0 : M[i - 1] + .002, true); }); return li; });
    var f = reduce ? .995 : 0, last = 0, paused = reduce, me = { dead: false }; cur = me;
    function draw(){ S.cursor(S.cx, S.cy); anim.frame(f); var k = 0; while(k < M.length - 1 && f >= M[k]) k++; items.forEach(function(li, i){ li.className = i === k ? "on" : i < k ? "past" : ""; }); }
    function seek(v, pause){ f = v; if(pause){ paused = true; play.textContent = "▶ Play"; } draw(); }
    function label(){ play.textContent = paused ? "▶ Play" : "⏸ Pause"; }
    play.addEventListener("click", function(){ paused = !paused; if(!paused && f > .99) f = 0; label(); });
    rep.addEventListener("click", function(){ f = 0; paused = false; label(); });
    label(); draw();
    function tick(ts){
      if(me.dead || !document.body.contains(box)) return; requestAnimationFrame(tick);
      var dt = last ? Math.min(100, ts - last) : 0; last = ts;
      if(paused) return; f += dt / D; if(f >= 1.12) f = 0; draw();   // short pause on the finished picture before it loops
      if(f > 1) f = 1;
    }
    requestAnimationFrame(tick);
  }
  window.GIMPANIM = { mount: mount, kinds: Object.keys(A) };
})();
