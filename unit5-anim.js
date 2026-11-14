/* Animated explainers for the Unit 5 tutorial (Excel data manipulation). Every scene is drawn in SVG and runs on a time value f (0..1).
   window.XLANIM.mount(box, topic) builds the player; the steps under the picture follow the animation. Same player chrome/classes as TECHANIM/GIMPANIM. */
(function(){
  "use strict";
  var NS = "http://www.w3.org/2000/svg", D = 15000;
  function E(tag, a, p, txt){ var e = document.createElementNS(NS, tag); if(a) for(var k in a) e.setAttribute(k, a[k]); if(txt != null) e.textContent = txt; if(p) p.appendChild(e); return e; }
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function ez(x){ x = cl(x); return x < .5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x); }
  function lp(a, b, t){ return a + (b - a) * t; }
  function sg(f, a, b){ return cl((f - a) / (b - a)); }
  var FONT = "system-ui,Segoe UI,Arial,sans-serif", MONO = "ui-monospace,Menlo,Consolas,monospace";
  var C = { bg: "#eef3f9", ink: "#1d2a3a", mute: "#6b7a8d", blue: "#2f7de1", green: "#1f9d55", red: "#d8382f", amber: "#e8a020", card: "#fff", line: "#b8c5d6", dark: "#33404f", hdr: "#dbe3ee" };
  function T(p, x, y, s, o){ o = o || {}; var a = { x: x, y: y, "font-size": o.s || 9, "font-family": o.mono ? MONO : FONT, fill: o.c || C.ink, "text-anchor": o.a || "middle", "font-weight": o.w || 700 }; if(o.o != null) a.opacity = o.o; return E("text", a, p, s); }
  function R(p, x, y, w, h, o){ o = o || {}; return E("rect", { x: x, y: y, width: w, height: h, rx: o.r == null ? 3 : o.r, fill: o.f || C.card, stroke: o.s || C.line, "stroke-width": o.sw == null ? 1 : o.sw, opacity: o.o == null ? 1 : o.o }, p); }
  function Cc(p, x, y, r, f, o){ o = o || {}; return E("circle", { cx: x, cy: y, r: r, fill: f, stroke: o.s || "none", "stroke-width": o.sw || 1, opacity: o.o == null ? 1 : o.o }, p); }
  function G(p, o){ return E("g", o || {}, p); }
  function at(g, x, y, s, op){ g.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ") scale(" + (s == null ? 1 : s) + ")"); if(op != null) g.setAttribute("opacity", op); }
  function line(p, x1, y1, x2, y2, col, w, dash){ var a = { x1: x1, y1: y1, x2: x2, y2: y2, stroke: col || C.line, "stroke-width": w || 1.5 }; if(dash) a["stroke-dasharray"] = dash; return E("line", a, p); }
  function mv(el, x, y){ el.setAttribute("transform", "translate(" + x.toFixed(1) + " " + y.toFixed(1) + ")"); }
  function vis(el, o){ el.setAttribute("opacity", o); }
  function tick(p, c){ return E("path", { d: "M-4,0 L-1,3 L5,-4", fill: "none", stroke: c || C.green, "stroke-width": 2.2, "stroke-linecap": "round", "stroke-linejoin": "round" }, p); }
  function cross(p, c){ return E("path", { d: "M-4,-4 L4,4 M4,-4 L-4,4", fill: "none", stroke: c || C.red, "stroke-width": 2.2, "stroke-linecap": "round" }, p); }

  // ---------- tiny spreadsheet grid helpers ----------
  // header(p, x, y, colW[], labels[]) draws one header row of cells
  function header(p, x, y, colW, labels){
    var g = G(p); at(g, x, y, 1); var cx = 0;
    labels.forEach(function(h, i){ R(g, cx, 0, colW[i] - 1, 15, { f: C.hdr, s: C.dark, sw: .8 }); T(g, cx + colW[i] / 2, 10.5, h, { s: 6.8, c: C.dark }); cx += colW[i]; });
    return g;
  }
  // row(p, x, y, colW[], values[]) draws one data row; returns {g, cells:[{r,t}]}
  function row(p, x, y, colW, values){
    var g = G(p); at(g, x, y, 1); var cx = 0, cells = [];
    values.forEach(function(v, i){ var r = R(g, cx, 0, colW[i] - 1, 15, { f: "#fff", sw: .8 }); var t = T(g, cx + colW[i] / 2, 10.5, String(v), { s: 6.8, c: C.ink, w: 500 }); cells.push({ r: r, t: t }); cx += colW[i]; });
    return { g: g, cells: cells };
  }
  function cellFill(cell, col){ cell.r.setAttribute("fill", col); }
  // formula bar: a strip with fx icon that "types" a formula string up to length n
  function fbar(p, x, y, w){
    var g = G(p); at(g, x, y, 1);
    R(g, 0, 0, 18, 14, { f: C.hdr, s: C.dark, sw: .8 }); T(g, 9, 10, "fx", { s: 7.5, c: C.dark, w: 800 });
    R(g, 20, 0, w - 20, 14, { f: "#fff", s: C.dark, sw: .8 });
    var txt = T(g, 26, 10, "", { s: 7.2, a: "start", c: C.blue, mono: true });
    return { g: g, set: function(s){ txt.textContent = s; } };
  }
  function typeIn(fb, full, t){ fb.set(full.slice(0, Math.round(cl(t) * full.length))); }

  var S = {};
  function base(){
    var svg = E("svg", { viewBox: "0 0 340 230", class: "gm-svg tk-svg", role: "img", "aria-label": "Animated explanation of the steps" });
    R(svg, 0, 0, 340, 230, { f: C.bg, s: "none", r: 0 });
    var layer = G(svg), cap = T(svg, 170, 222, "", { s: 10, c: C.ink }); cap.setAttribute("paint-order", "stroke"); cap.setAttribute("stroke", C.bg); cap.setAttribute("stroke-width", 3);
    return { svg: svg, g: layer, cap: cap };
  }

  // ===== 1. COUNTIF =====
  S.countif = function(B){
    var g = B.g, colW = [54, 40];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Brand (C)", "Count"]);
    var brands = ["Apple", "Sony", "Apple", "Sony", "Apple", "Sony"];
    var rows = brands.map(function(b, i){ return row(g, 14, 52 + i * 17, colW, [b, ""]); });
    var crit = G(g); at(crit, 230, 36, 1); R(crit, 0, 0, 96, 15, { f: C.hdr, s: C.dark, sw: .8 }); T(crit, 48, 10.5, "Criteria: A2", { s: 7, c: C.dark });
    var critBox = G(g); at(critBox, 230, 52, 1); R(critBox, 0, 0, 96, 15, { f: "#fff", s: C.blue, sw: 1.4 }); var critTxt = T(critBox, 48, 10.5, "Apple", { s: 7.5, c: C.blue, w: 800 });
    var resBox = G(g); at(resBox, 230, 76, 1); R(resBox, 0, 0, 96, 24, { f: "#fff", s: C.green, sw: 1.6 }); T(resBox, 48, 10.5, "Orders for Apple", { s: 6.8, c: C.mute }); var resTxt = T(resBox, 48, 21, "", { s: 11, c: C.green });
    var formula = "=COUNTIF($C$2:$C$1001,$A2)";
    return { marks: [.22, .5, .78, 1], frame: function(f){
      typeIn(fb, formula, sg(f, .02, .22));
      var scanT = sg(f, .24, .78), k = Math.min(rows.length - 1, Math.floor(scanT * rows.length));
      var cnt = 0;
      rows.forEach(function(r, i){
        var on = f >= .24 && i <= k;
        var match = brands[i] === "Apple";
        cellFill(r.cells[0], on ? (match ? "#dff3e6" : "#fde8e5") : "#fff");
        r.cells[0].r.setAttribute("stroke", i === k && f < .78 ? C.blue : C.line);
        r.cells[0].r.setAttribute("stroke-width", i === k && f < .78 ? 2 : .8);
        if(on && match) cnt++;
      });
      resTxt.textContent = f >= .78 ? "2" : (f >= .24 ? String(cnt) : "");
      B.cap.textContent = f < .22 ? "Type the formula" : f < .78 ? "Scan down the brand column, counting matches" : "Result: 2 orders for Apple";
    } };
  };

  // ===== 2. FILTER nested in COUNTA =====
  S.filtercount = function(B){
    var g = B.g, colW = [54];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Brand (C)"]);
    var brands = ["Apple", "Sony", "Apple", "Sony", "Apple", "Sony"];
    var rows = brands.map(function(b, i){ return row(g, 14, 52 + i * 17, colW, [b]); });
    var arrow = G(g); line(arrow, 0, 0, 30, 0, C.mute, 1.6); E("path", { d: "M26,-4 L34,0 L26,4Z", fill: C.mute }, arrow); at(arrow, 76, 96, 1);
    var filterLbl = T(g, 91, 88, "FILTER", { s: 7.5, c: C.blue });
    var box = G(g); at(box, 150, 48, 1); R(box, 0, 0, 70, 95, { f: "#fff", s: C.blue, sw: 1.4, r: 6 }); T(box, 35, -6, "Filtered list", { s: 7.2, c: C.blue });
    var slots = [0, 1, 2].map(function(i){ var t = T(box, 35, 18 + i * 20, "", { s: 8, c: C.ink, o: 0 }); return t; });
    var arrow2 = G(g); line(arrow2, 0, 0, 24, 0, C.mute, 1.6); E("path", { d: "M20,-4 L28,0 L20,4Z", fill: C.mute }, arrow2); at(arrow2, 228, 96, 1);
    var countaLbl = T(g, 240, 88, "COUNTA", { s: 7.5, c: C.green });
    var resBox = G(g); at(resBox, 262, 48, 1); R(resBox, 0, 0, 64, 40, { f: "#fff", s: C.green, sw: 1.6, r: 6 }); T(resBox, 32, 14, "Count", { s: 7.2, c: C.mute }); var resTxt = T(resBox, 32, 30, "", { s: 13, c: C.green });
    return { marks: [.2, .46, .72, 1], frame: function(f){
      typeIn(fb, "=COUNTA(FILTER($C$2:$C$1001,", sg(f, .02, .2));
      var matches = [];
      rows.forEach(function(r, i){ var match = brands[i] === "Apple"; var on = f >= .22; cellFill(r.cells[0], on ? (match ? "#dff3e6" : "#fde8e5") : "#fff"); if(match) matches.push(i); });
      var slotT = sg(f, .3, .58);
      slots.forEach(function(s, i){ vis(s, slotT > (i / matches.length) ? 1 : 0); s.textContent = f >= .3 ? "Apple" : ""; });
      vis(countaLbl, sg(f, .6, .68)); vis(arrow2, sg(f, .6, .68));
      resTxt.textContent = f >= .72 ? "3" : "";
      B.cap.textContent = f < .2 ? "COUNT would return 0 on text, so COUNTA is used" : f < .58 ? "FILTER pulls out only the matching rows" : f < .72 ? "COUNTA then counts the filtered list" : "Result: 3 orders for Apple";
    } };
  };

  // ===== 3. SUMIFS =====
  S.sumifs = function(B){
    var g = B.g, colW = [42, 34];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Brand", "Qty"]);
    var data = [["Apple", 3], ["Sony", 5], ["Apple", 2], ["Sony", 4], ["Apple", 6]];
    var rows = data.map(function(d, i){ return row(g, 14, 52 + i * 17, colW, d); });
    var meter = G(g); at(meter, 150, 60, 1); R(meter, 0, 0, 14, 100, { f: "#fff", s: C.line, sw: 1 }); var fill = R(meter, 0, 100, 14, 0, { f: C.green, s: "none" });
    T(meter, 7, -8, "Running total", { s: 6.8, c: C.mute });
    var resBox = G(g); at(resBox, 200, 60, 1); R(resBox, 0, 0, 120, 44, { f: "#fff", s: C.green, sw: 1.6, r: 6 });
    T(resBox, 60, 15, "Total quantity for Apple", { s: 6.8, c: C.mute }); var resTxt = T(resBox, 60, 34, "", { s: 15, c: C.green });
    var MAX = 20;
    return { marks: [.22, .75, .9, 1], frame: function(f){
      typeIn(fb, "=SUMIFS($D$2:$D$1001,$C$2:$C$1001,$A2)", sg(f, .02, .22));
      var scanT = sg(f, .24, .78), k = Math.min(rows.length - 1, Math.floor(scanT * rows.length));
      var total = 0;
      rows.forEach(function(r, i){ var on = f >= .24 && i <= k; var match = data[i][0] === "Apple"; cellFill(r.cells[0], on ? (match ? "#dff3e6" : "#fde8e5") : "#fff"); cellFill(r.cells[1], on && match ? "#dff3e6" : "#fff"); if(on && match) total += data[i][1]; });
      var h = Math.min(100, (total / MAX) * 100); fill.setAttribute("height", h); fill.setAttribute("y", 100 - h);
      resTxt.textContent = f >= .24 ? String(total) : "";
      B.cap.textContent = f < .22 ? "Type the formula" : f < .78 ? "Add up the quantity wherever the brand matches" : "Result: total quantity for Apple";
    } };
  };

  // ===== 4. FILTER =====
  S.filter = function(B){
    var g = B.g, colW = [40, 40, 40];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Date", "Year", "Brand"]);
    var data = [["12/3/20", 2020, "Apple"], ["5/7/19", 2019, "Sony"], ["9/1/20", 2020, "Apple"], ["2/2/20", 2020, "Sony"], ["7/8/19", 2019, "Apple"]];
    var rows = data.map(function(d, i){ return row(g, 14, 52 + i * 17, colW, [d[0], "", d[2]]); });
    var crit = G(g); at(crit, 190, 36, 1); R(crit, 0, 0, 60, 15, { f: C.hdr, s: C.dark, sw: .8 }); T(crit, 30, 10.5, "Year = 2020", { s: 6.8, c: C.dark });
    var yChecks = [0, 1, 2, 3, 4].map(function(i){ var c = G(g); at(c, 205, 60 + i * 17, 1); return c; });
    var box = G(g); at(box, 258, 48, 1); R(box, 0, 0, 68, 75, { f: "#fff", s: C.blue, sw: 1.4, r: 6 }); T(box, 34, -6, "Filtered rows", { s: 7, c: C.blue });
    var slots = [0, 1, 2].map(function(i){ var t = T(box, 34, 18 + i * 20, "", { s: 7.5, c: C.ink, o: 0 }); return t; });
    return { marks: [.22, .55, .8, 1], frame: function(f){
      typeIn(fb, "=FILTER(A2:C6,YEAR(..)=2020)", sg(f, .02, .22));
      var revealT = sg(f, .25, .5), yK = Math.min(rows.length - 1, Math.floor(revealT * rows.length));
      rows.forEach(function(r, i){ var show = f >= .25 && i <= yK; r.cells[1].t.textContent = show ? String(data[i][1]) : ""; });
      yChecks.forEach(function(c, i){ var show = f >= .3 + i * .02 && f < .55; c.textContent = ""; c.innerHTML = ""; if(show){ var match = data[i][1] === 2020; if(match) tick(c, C.green); else cross(c, C.red); } });
      var matches = [];
      rows.forEach(function(r, i){ var match = data[i][1] === 2020; var on = f >= .5; cellFill(r.cells[2], on ? (match ? "#dff3e6" : "#fde8e5") : "#fff"); if(match) matches.push(data[i][2]); });
      var slotT = sg(f, .58, .78);
      slots.forEach(function(s, i){ vis(s, slotT > (i / 3) ? 1 : 0); s.textContent = matches[i] || ""; });
      B.cap.textContent = f < .22 ? "Extract the year with YEAR()" : f < .5 ? "Check each row: is the year 2020?" : f < .78 ? "Rows matching are filtered through" : "FILTER returns only the 2020 orders";
    } };
  };

  // ===== 5. Master Challenge 1: monthly summary =====
  S.challenge1 = function(B){
    var g = B.g, colW = [48, 60];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Month (A)", "Total spent (B)"]);
    var months = ["Jan", "Feb", "Mar", "Apr"], totals = [1240, 980, 1510, 860];
    var rows = months.map(function(m, i){ return row(g, 14, 52 + i * 17, colW, [m, ""]); });
    var uniqLbl = T(g, 220, 44, "UNIQUE(Expenses!A2:A121)", { s: 7, c: C.blue, o: 0 });
    var sumLbl = T(g, 220, 60, "SUMIFS(...)", { s: 7, c: C.green, o: 0 });
    return { marks: [.18, .5, .85, 1], frame: function(f){
      typeIn(fb, "=UNIQUE(Expenses!A2:A121)", sg(f, .02, .18));
      vis(uniqLbl, sg(f, .18, .26));
      var spillT = sg(f, .2, .45), k = Math.min(rows.length - 1, Math.floor(spillT * rows.length));
      rows.forEach(function(r, i){ var show = f >= .2 && i <= k; cellFill(r.cells[0], show ? "#dbe9ff" : "#fff"); });
      vis(sumLbl, sg(f, .5, .58));
      var fillT = sg(f, .55, .85), k2 = Math.min(rows.length - 1, Math.floor(fillT * rows.length));
      rows.forEach(function(r, i){ var show = f >= .55 && i <= k2; cellFill(r.cells[1], show ? "#dff3e6" : "#fff"); r.cells[1].t.textContent = show ? String(totals[i]) : ""; });
      B.cap.textContent = f < .18 ? "List the unique months" : f < .5 ? "UNIQUE spills one month per row" : f < .85 ? "SUMIFS totals the spending for each month" : "A complete monthly summary";
    } };
  };

  // ===== 6. Master Challenge 2: over-budget filter =====
  S.challenge2 = function(B){
    var g = B.g, colW = [42, 42, 42];
    var fb = fbar(g, 14, 14, 300);
    header(g, 14, 36, colW, ["Month", "Spent", "Budget"]);
    var data = [["Jan", 1240, 1000], ["Feb", 800, 900], ["Mar", 1510, 1200], ["Apr", 700, 850], ["May", 990, 800]];
    var rows = data.map(function(d, i){ return row(g, 14, 52 + i * 17, colW, d); });
    var box = G(g); at(box, 200, 48, 1); R(box, 0, 0, 120, 75, { f: "#fff", s: C.red, sw: 1.4, r: 6 }); T(box, 60, -6, "Over budget", { s: 7, c: C.red });
    var slots = [0, 1, 2].map(function(i){ var t = T(box, 60, 18 + i * 20, "", { s: 7.5, c: C.ink, o: 0 }); return t; });
    var cnt = T(g, 260, 140, "", { s: 9.5, c: C.red });
    return { marks: [.2, .6, .82, 1], frame: function(f){
      typeIn(fb, "=FILTER(A2:C6,B2:B6>C2:C6,...)", sg(f, .02, .2));
      var matches = [];
      var scanT = sg(f, .22, .55), k = Math.min(rows.length - 1, Math.floor(scanT * rows.length));
      rows.forEach(function(r, i){ var over = data[i][1] > data[i][2]; var on = f >= .22 && i <= k; cellFill(r.cells[1], on ? (over ? "#fde8e5" : "#fff") : "#fff"); cellFill(r.cells[2], on ? (over ? "#fde8e5" : "#fff") : "#fff"); if(on && over) matches.push(data[i][0]); });
      var slotT = sg(f, .58, .78);
      slots.forEach(function(s, i){ vis(s, slotT > (i / 3) ? 1 : 0); s.textContent = matches[i] || ""; });
      cnt.textContent = f >= .82 ? "Records found: 3" : "";
      B.cap.textContent = f < .2 ? "Compare spent to budget, row by row" : f < .58 ? "Keep only rows where spent > budget" : f < .82 ? "Those months are filtered through" : "COUNTA counts the matches";
    } };
  };

  // ===== 7. Master Challenge 3: three-criteria dynamic filter =====
  S.challenge3 = function(B){
    var g = B.g;
    var boxes = [["Month", "Mar"], ["Category", ""], ["Amount >", ""]];
    var inputs = boxes.map(function(b, i){ var y = 20 + i * 26, w = G(g); at(w, 14, y, 1); T(w, 0, 10, b[0], { s: 8, a: "start", c: C.mute }); var box = R(w, 70, 0, 60, 16, { f: "#fff", s: C.line, sw: 1.2 }); var val = T(w, 100, 11.5, b[1], { s: 8, c: C.blue, w: 800 }); var tag = T(w, 140, 11.5, "", { s: 7, c: C.green }); return { box: box, val: val, tag: tag, filled: !!b[1] }; });
    var mult = T(g, 170, 100, "", { s: 10, c: C.dark });
    var colW = [40, 50, 40];
    header(g, 170, 120, colW, ["Month", "Category", "Spent"]);
    var data = [["Jan", "Food", 120], ["Mar", "Travel", 300], ["Mar", "Food", 90], ["Feb", "Food", 60], ["Mar", "Bills", 200]];
    var rows = data.map(function(d, i){ return row(g, 170, 136 + i * 17, colW, d); });
    var cnt = T(g, 170, 14, "", { s: 8.5, c: C.green });
    return { marks: [.25, .55, .8, 1], frame: function(f){
      inputs.forEach(function(inp, i){ var on = f >= .05 + i * .05; vis(inp.tag, on ? 1 : 0); inp.tag.textContent = inp.filled ? "match only" : "IF blank = TRUE"; inp.box.setAttribute("stroke", inp.filled ? C.blue : C.line); });
      mult.setAttribute("opacity", sg(f, .22, .3)); mult.textContent = f >= .22 ? "IF × IF × IF  (AND)" : "";
      var scanT = sg(f, .35, .72), k = Math.min(rows.length - 1, Math.floor(scanT * rows.length));
      rows.forEach(function(r, i){ var match = data[i][0] === "Mar"; var on = f >= .35 && i <= k; cellFill(r.cells[0], on ? (match ? "#dff3e6" : "#fde8e5") : "#fff"); r.g.setAttribute("opacity", on && !match ? .4 : 1); });
      cnt.textContent = f >= .82 ? "Records found: 3" : "";
      B.cap.textContent = f < .3 ? "Month is set; Category and Amount are blank" : f < .72 ? "Blank boxes match every row; Month still filters" : f < .82 ? "Only the March rows survive" : "The dynamic filter adapts to any combination";
    } };
  };

  // ---------- player (same markup and classes as the TECHANIM/GIMPANIM player) ----------
  var reduce = false; try{ reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }catch(e){}
  var cur = null;
  function mount(box, topic){
    if(cur){ cur.dead = true; cur = null; }
    box.textContent = "";
    var wrap = document.createElement("div"); wrap.className = "gm-player"; box.appendChild(wrap);
    var path = document.createElement("div"); path.className = "gm-path"; path.textContent = topic.path; wrap.appendChild(path);
    var B = base(); wrap.appendChild(B.svg);
    var ctl = document.createElement("div"); ctl.className = "gm-ctl"; wrap.appendChild(ctl);
    var play = document.createElement("button"); play.type = "button"; play.className = "btn btn-secondary"; ctl.appendChild(play);
    var rep = document.createElement("button"); rep.type = "button"; rep.className = "btn btn-secondary"; rep.textContent = "↻ Replay"; ctl.appendChild(rep);
    var ol = document.createElement("ol"); ol.className = "gm-steps"; wrap.appendChild(ol);
    var anim = S[topic.anim](B), M = anim.marks, items = topic.steps.map(function(s, i){
      var li = document.createElement("li"), b = document.createElement("button"); b.type = "button"; b.textContent = s; li.appendChild(b); ol.appendChild(li);
      b.addEventListener("click", function(){ seek(i === 0 ? 0 : M[i - 1] + .002, true); }); return li; });
    var f = reduce ? .995 : 0, last = 0, paused = reduce, me = { dead: false }; cur = me;
    function draw(){ anim.frame(f); var k = 0; while(k < M.length - 1 && f >= M[k]) k++; items.forEach(function(li, i){ li.className = i === k ? "on" : i < k ? "past" : ""; }); }
    function seek(v, pause){ f = v; if(pause){ paused = true; label(); } draw(); }
    function label(){ play.textContent = paused ? "▶ Play" : "⏸ Pause"; }
    play.addEventListener("click", function(){ paused = !paused; if(!paused && f > .99) f = 0; label(); });
    rep.addEventListener("click", function(){ f = 0; paused = false; label(); });
    label(); draw();
    function tick2(ts){
      if(me.dead || !document.body.contains(box)) return; requestAnimationFrame(tick2);
      var dt = last ? Math.min(100, ts - last) : 0; last = ts;
      if(paused) return; f += dt / D; if(f >= 1.12) f = 0; draw();
      if(f > 1) f = 1;
    }
    requestAnimationFrame(tick2);
  }
  window.XLANIM = { mount: mount, kinds: Object.keys(S) };
})();
