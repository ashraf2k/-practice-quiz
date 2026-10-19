/* iLearn (10BR) visuals, part 1: data representation, data transmission, hardware. Original artwork and interactive models built from the 0478 lessons. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, svg = V.svg;
  function pad(s, n){ s = String(s); while(s.length < n) s = "0" + s; return s; }
  function num(v, d){ v = parseInt(v, 10); return isNaN(v) ? d : v; }
  function bitsRow(n, get, flip, labels){
    var wrap = el("div"), r = el("div", "vbits"), i;
    for(i = 0; i < n; i++){ (function(i){
      var col = el("div"), lab = el("div", "vbitl", labels ? labels[i] : ""), b = el("button", "vbit" + (get(i) ? " one" : "") + (i === 4 && n === 8 ? " sep" : ""), get(i) ? "1" : "0");
      b.type = "button"; b.setAttribute("aria-label", "bit " + (n - i)); b.addEventListener("click", function(){ flip(i); });
      col.appendChild(lab); col.appendChild(b); r.appendChild(col); })(i); }
    wrap.appendChild(r); return wrap;
  }

  /* ---------- 1.1 binary, denary and hexadecimal ---------- */
  V.reg("bits", function(box, o){
    var n = o.n || 8, b = [], i, view = el("div"), out = el("div", "vres"), w = [];
    for(i = 0; i < n; i++){ b.push(0); w.push(Math.pow(2, n - 1 - i)); }
    function val(){ var v = 0; b.forEach(function(x, k){ v += x * w[k]; }); return v; }
    function draw(){
      view.innerHTML = ""; view.appendChild(bitsRow(n, function(k){ return b[k]; }, function(k){ b[k] ^= 1; draw(); }, w));
      var v = val(), hex = v.toString(16).toUpperCase(), parts = [];
      b.forEach(function(x, k){ if(x) parts.push(w[k]); });
      out.innerHTML = "Binary <b class='vmono'>" + b.join("").replace(/(....)(?=.)/g, "$1 ") + "</b><br>Denary: " + (parts.length ? parts.join(" + ") + " = " : "") + "<b class='big'>" + v + "</b><br>Hexadecimal: <b class='big vmono'>" + (n === 8 ? pad(hex, 2) : hex) + "</b>" +
        (n === 8 ? "<br><span class='ln-muted'>Each group of four bits (a nibble) is one hex digit: " + b.slice(0, 4).join("") + " = " + (v >> 4).toString(16).toUpperCase() + ", " + b.slice(4).join("") + " = " + (v & 15).toString(16).toUpperCase() + ".</span>" : "");
    }
    box.appendChild(el("p", null, "Click the bits to switch them between 0 and 1. The number above each bit is its <b>place value</b>; add up the columns that hold a 1."));
    box.appendChild(row(btn("Clear", function(){ b = b.map(function(){ return 0; }); draw(); }), btn("All ones", function(){ b = b.map(function(){ return 1; }); draw(); })));
    box.appendChild(view); box.appendChild(out); draw();
  });

  /* ---------- 1.1.4 binary addition and overflow ---------- */
  V.reg("binadd", function(box){
    var a = el("input", "vin mono"), c = el("input", "vin mono"), out = el("div"), res = el("div", "vres");
    a.type = c.type = "number"; a.min = c.min = 0; a.max = c.max = 255; a.value = 200; c.value = 100; a.style.width = c.style.width = "80px";
    a.setAttribute("aria-label", "First number"); c.setAttribute("aria-label", "Second number");
    function draw(){
      var x = Math.max(0, Math.min(255, num(a.value, 0))), y = Math.max(0, Math.min(255, num(c.value, 0))), xb = pad(x.toString(2), 8), yb = pad(y.toString(2), 8), carry = 0, sum = [], car = [], k;
      for(k = 7; k >= 0; k--){ var t = +xb[k] + +yb[k] + carry; sum[k] = t & 1; carry = t >> 1; car[k] = carry; }
      var rowC = "<tr><td class='ln-muted'>carry</td>" + [0, 1, 2, 3, 4, 5, 6, 7].map(function(i){ return "<td class='" + (car[i] ? "wa" : "") + "'>" + (car[i] ? 1 : "") + "</td>"; }).join("") + "<td></td></tr>";
      var rowA = "<tr><td>" + x + "</td>" + xb.split("").map(function(d){ return "<td>" + d + "</td>"; }).join("") + "<td></td></tr>";
      var rowB = "<tr><td>+ " + y + "</td>" + yb.split("").map(function(d){ return "<td>" + d + "</td>"; }).join("") + "<td></td></tr>";
      var rowS = "<tr><td><b>= " + (x + y) + "</b></td>" + sum.map(function(d, i){ return "<td class='hi'>" + d + "</td>"; }).join("") + "<td class='" + (carry ? "no" : "") + "'>" + (carry ? "1 ← 9th bit!" : "") + "</td></tr>";
      out.innerHTML = '<div class="vscroll"><table class="vt">' + rowC + rowA + rowB + rowS + "</table></div>";
      res.innerHTML = carry ? "<span class='vbad'>Overflow error.</span> " + x + " + " + y + " = " + (x + y) + ", which needs <b>9 bits</b>. An 8-bit register can only hold up to 255, so the extra left-most bit is lost and the register would hold " + parseInt(sum.join(""), 2) + " instead." : "<span class='vok'>No overflow.</span> The answer " + (x + y) + " fits in 8 bits (maximum 255).";
    }
    a.addEventListener("input", draw); c.addEventListener("input", draw);
    box.appendChild(el("p", null, "Add two 8-bit numbers column by column (the orange cells show a carry). Try 200 + 100, then 100 + 50."));
    box.appendChild(row(el("label", null, "First "), a, el("label", null, "Second "), c)); box.appendChild(out); box.appendChild(res); draw();
  });

  /* ---------- 1.1.5 logical shifts ---------- */
  V.reg("shift", function(box){
    var v = 13, lost = "", view = el("div"), log = el("div", "vlog"), inp = el("input", "vin mono");
    inp.type = "number"; inp.min = 0; inp.max = 255; inp.value = 13; inp.style.width = "80px"; inp.setAttribute("aria-label", "Start value");
    function draw(msg){
      var s = pad(v.toString(2), 8), h = '<div class="vbits">' + s.split("").map(function(d, i){ return '<div><div class="vbitl">' + (128 >> i) + '</div><div class="vbit' + (d === "1" ? " one" : "") + '" style="display:flex;align-items:center;justify-content:center">' + d + "</div></div>"; }).join("") + "</div>";
      view.innerHTML = h + "<div>Value: <b class='big'>" + v + "</b></div>"; log.innerHTML = msg || "Press a shift button. Zeros are added at the opposite end.";
    }
    function sh(dir){
      var s = pad(v.toString(2), 8), gone = dir < 0 ? s[0] : s[7], nv = dir < 0 ? (v << 1) & 255 : v >> 1, before = v;
      v = nv; draw("Shifted " + (dir < 0 ? "<b>left</b>" : "<b>right</b>") + " one place. The bit that fell off the " + (dir < 0 ? "left" : "right") + " end was <b>" + gone + "</b>. " + (gone === "1" ? "<span class='vbad'>A 1 was lost, so the value is not " + (dir < 0 ? "doubled" : "halved exactly") + ".</span>" : (dir < 0 ? "The value doubled: " + before + " × 2 = " + v + "." : "The value halved: " + before + " ÷ 2 = " + v + ".")));
    }
    inp.addEventListener("input", function(){ v = Math.max(0, Math.min(255, num(inp.value, 0))); draw(); });
    box.appendChild(row(el("label", null, "Start value "), inp, btn("◀ Shift left", function(){ sh(-1); }, "p"), btn("Shift right ▶", function(){ sh(1); }, "p")));
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 1.1.6 two's complement ---------- */
  V.reg("twos", function(box){
    var b = [0, 0, 1, 0, 1, 0, 1, 0], w = [-128, 64, 32, 16, 8, 4, 2, 1], view = el("div"), out = el("div", "vres"), log = el("div", "vlog");
    function val(){ var v = 0; b.forEach(function(x, k){ v += x * w[k]; }); return v; }
    function draw(){
      view.innerHTML = ""; view.appendChild(bitsRow(8, function(k){ return b[k]; }, function(k){ b[k] ^= 1; draw(); }, w));
      var v = val(), p = []; b.forEach(function(x, k){ if(x) p.push(w[k]); });
      out.innerHTML = "Add the columns: " + (p.length ? p.join(" + ").replace(/\+ -/g, "− ") : "0") + " = <b class='big'>" + v + "</b>  <span class='ln-muted'>(range −128 to +127)</span>";
    }
    function neg(){
      var v = val(); if(v === -128){ log.innerHTML = "−128 cannot be made positive in 8 bits: the range only goes up to +127."; return; }
      var before = b.join(""), inv = b.map(function(x){ return x ? 0 : 1; }), n = (parseInt(inv.join(""), 2) + 1) & 255;
      b = pad(n.toString(2), 8).split("").map(Number);
      log.innerHTML = "To change the sign: <b>" + before + "</b> → invert every bit → <b>" + inv.join("") + "</b> → add 1 → <b>" + b.join("") + "</b>."; draw();
    }
    box.appendChild(el("p", null, "The left-most column is worth <b>−128</b>. Click bits to build a number, or press the button to change its sign by <b>inverting and adding 1</b>."));
    box.appendChild(row(btn("Make the opposite sign (invert, then add 1)", neg, "p"), btn("−42 example", function(){ b = [1, 1, 0, 1, 0, 1, 1, 0]; log.innerHTML = "11010110 is −42: −128 + 64 + 16 + 4 + 2 = −42."; draw(); })));
    box.appendChild(view); box.appendChild(out); box.appendChild(log); draw();
  });

  /* ---------- 1.2.1 text ---------- */
  V.reg("ascii", function(box){
    var inp = el("input", "vin"), out = el("div"), note = el("div", "vlog");
    inp.value = "Hi!"; inp.maxLength = 8; inp.style.width = "140px"; inp.setAttribute("aria-label", "Text to encode");
    function draw(){
      var t = inp.value, rows = [], bad = false;
      t.split("").forEach(function(ch){ var c = ch.charCodeAt(0); if(c > 127){ bad = true; rows.push([ch, "?", "not in ASCII", "needs Unicode"]); } else rows.push([ch === " " ? "(space)" : esc(ch), c, pad(c.toString(2), 7), pad(c.toString(2), 8)]); });
      out.innerHTML = V.table(["Character", "ASCII code (denary)", "7-bit binary", "stored in one byte"], rows);
      note.innerHTML = (bad ? "<span class='vwarn'>That character is outside the 128 ASCII codes.</span> Unicode uses more bits per character so it can store other languages, symbols and emojis. " : "") + "ASCII uses <b>7 bits</b> per character (128 characters). Capital letters follow in order from A = 65; lower case starts at a = 97.";
    }
    inp.addEventListener("input", draw);
    box.appendChild(row(el("label", null, "Type up to 8 characters: "), inp)); box.appendChild(out); box.appendChild(note); draw();
  });

  /* ---------- 1.2.2 sound ---------- */
  V.reg("sound", function(box){
    var sr = el("input"), res = el("input"), view = el("div"), log = el("div", "vlog");
    sr.type = res.type = "range"; sr.min = 2; sr.max = 40; sr.value = 12; res.min = 1; res.max = 4; res.value = 3; res.type = "range";
    sr.setAttribute("aria-label", "Sample rate"); res.setAttribute("aria-label", "Sample resolution");
    function draw(){
      var n = +sr.value, bitsN = +res.value, lv = Math.pow(2, bitsN), h = "", k, X = function(t){ return 30 + t * 380; }, Y = function(a){ return 110 - a * 80; }, d = "M" + X(0) + " " + Y(0);
      for(k = 1; k <= 200; k++){ var t = k / 200; d += " L" + X(t) + " " + Y(Math.sin(t * 2 * Math.PI * 2) * 0.95 * Math.sin(t * Math.PI * 0.6 + 0.9)); }
      var f = function(t){ return Math.sin(t * 2 * Math.PI * 2) * 0.95 * Math.sin(t * Math.PI * 0.6 + 0.9); };
      h += '<line class="wr" x1="30" y1="110" x2="410" y2="110"/><path d="' + d + '" fill="none" stroke="var(--muted)" stroke-width="1.5" stroke-dasharray="4 3"/>';
      var pts = [];
      for(k = 0; k <= n; k++){ var t2 = k / n, a = f(t2), q = Math.round((a + 1) / 2 * (lv - 1)) / (lv - 1) * 2 - 1; pts.push([X(t2), Y(q)]); h += '<line stroke="var(--line)" x1="' + X(t2) + '" y1="110" x2="' + X(t2) + '" y2="' + Y(q) + '"/><circle cx="' + X(t2) + '" cy="' + Y(q) + '" r="3.6" fill="var(--accent)"/>'; }
      h += '<polyline fill="none" stroke="var(--accent)" stroke-width="2" points="' + pts.map(function(p){ return p.join(","); }).join(" ") + '"/>';
      view.innerHTML = ""; view.appendChild(svg(440, 200, h + '<text class="sm mu" x="30" y="195">one second of sound (dashed = the real wave; dots = what is stored)</text>'));
      log.innerHTML = "Sample rate: <b>" + n + " samples per second</b> · sample resolution: <b>" + bitsN + " bits</b> (" + lv + " possible heights).<br>File size for 1 second = " + n + " × " + bitsN + " = <b>" + n * bitsN + " bits</b>. More samples or more bits gives a closer copy of the wave but a <b>bigger file</b>.";
    }
    sr.addEventListener("input", draw); res.addEventListener("input", draw);
    box.appendChild(row(el("label", null, "Sample rate "), sr, el("label", null, "Sample resolution (bits) "), res)); box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 1.2.3 images ---------- */
  V.reg("pixels", function(box){
    var N = 8, depth = 1, g = [], i, j, view = el("div"), info = el("div", "vres"), pal = ["#ffffff", "#146C6A", "#B45309", "#7C3AED"];
    for(i = 0; i < N; i++){ g.push([]); for(j = 0; j < N; j++) g[i].push(0); }
    var smile = ["00000000", "01100110", "01100110", "00000000", "10000001", "01000010", "00111100", "00000000"];
    function load(){ for(i = 0; i < N; i++) for(j = 0; j < N; j++) g[i][j] = +smile[i][j]; }
    function draw(){
      var h = '<table style="border-collapse:collapse;margin:4px 0">', cols = Math.pow(2, depth);
      for(i = 0; i < N; i++){ h += "<tr>"; for(j = 0; j < N; j++) h += '<td data-i="' + i + '" data-j="' + j + '" style="width:30px;height:30px;border:1px solid var(--line);background:' + (depth === 1 ? (g[i][j] ? "var(--ink)" : "var(--surface)") : pal[g[i][j] % cols]) + ';cursor:pointer"></td>'; h += '<td class="vmono" style="padding-left:12px;font-size:13px">' + g[i].map(function(c){ return pad(c.toString(2), depth); }).join(" ") + "</td></tr>"; }
      view.innerHTML = h + "</table>";
      Array.prototype.forEach.call(view.querySelectorAll("td[data-i]"), function(td){ td.addEventListener("click", function(){ var a = +td.dataset.i, b = +td.dataset.j; g[a][b] = (g[a][b] + 1) % cols; draw(); }); });
      var bitsT = N * N * depth;
      info.innerHTML = "Resolution <b>" + N + " × " + N + " = " + N * N + " pixels</b> · colour depth <b>" + depth + " bit" + (depth > 1 ? "s" : "") + "</b> → <b>" + cols + " colours</b> (2<sup>" + depth + "</sup>).<br>File size = pixels × colour depth = " + N * N + " × " + depth + " = <b>" + bitsT + " bits</b> = " + bitsT / 8 + " bytes.";
    }
    box.appendChild(el("p", null, "Click a pixel to change its colour. The binary numbers on the right are what the computer actually stores, one code per pixel."));
    box.appendChild(row(btn("1-bit colour (2 colours)", function(){ depth = 1; g = g.map(function(r){ return r.map(function(c){ return c % 2; }); }); draw(); }), btn("2-bit colour (4 colours)", function(){ depth = 2; draw(); }), btn("Draw a smiley", function(){ load(); draw(); }), btn("Clear", function(){ g = g.map(function(r){ return r.map(function(){ return 0; }); }); draw(); })));
    box.appendChild(view); box.appendChild(info); load(); draw();
  });

  /* ---------- 1.3.1 / 1.3.2 units and file sizes ---------- */
  V.reg("units", function(box){
    var U = ["bit", "nibble", "byte", "kibibyte (KiB)", "mebibyte (MiB)", "gibibyte (GiB)", "tebibyte (TiB)", "pebibyte (PiB)", "exbibyte (EiB)"], inp = el("input", "vin mono"), sel = el("select", "vin"), out = el("div");
    var bitsPer = [1, 4, 8, 8192, 8192 * 1024, 8192 * 1048576, 8192 * 1073741824, 8192 * 1099511627776, 8192 * 1125899906842624];
    U.forEach(function(u, i){ var o = el("option", null, u); o.value = i; sel.appendChild(o); });
    inp.type = "number"; inp.value = 3; inp.min = 0; inp.style.width = "90px"; sel.value = 4;
    function fmt(x){ return x >= 1e15 || (x < 1e-3 && x > 0) ? x.toExponential(3) : String(Math.round(x * 1e6) / 1e6); }
    function draw(){
      var v = parseFloat(inp.value) || 0, bits = v * bitsPer[+sel.value], h = "";
      out.innerHTML = V.table(["Unit", "Amount", "How it is built"], U.map(function(u, i){ return [{ t: u, c: i === +sel.value ? "hi" : "" }, { t: fmt(bits / bitsPer[i]), c: i === +sel.value ? "hi" : "" }, i < 3 ? ["1 bit", "4 bits", "8 bits"][i] : "1024 × " + U[i - 1].split(" ")[0]]; }));
    }
    inp.addEventListener("input", draw); sel.addEventListener("change", draw);
    box.appendChild(el("p", null, "Each unit is <b>1024</b> times the one below it (not 1000). Enter an amount and see it in every unit."));
    box.appendChild(row(inp, sel)); box.appendChild(out); draw();
  });
  V.reg("fsize", function(box, o){
    var kind = o.kind || "image", view = el("div"), tabs = row(), vals = { w: 64, h: 64, d: 8, sr: 8000, res: 16, t: 4 };
    function f(k, lab, min){ var i = el("input", "vin mono"); i.type = "number"; i.min = min || 1; i.value = vals[k]; i.style.width = "90px"; i.setAttribute("aria-label", lab); i.addEventListener("input", function(){ vals[k] = Math.max(1, parseFloat(i.value) || 1); calc(); }); return row(el("label", null, lab + " "), i); }
    function calc(){
      var bits, steps;
      if(kind === "image"){ var px = vals.w * vals.h; bits = px * vals.d; steps = ["Pixels = " + vals.w + " × " + vals.h + " = <b>" + px + "</b>", "Bits = pixels × colour depth = " + px + " × " + vals.d + " = <b>" + bits + "</b> bits"]; }
      else { bits = vals.sr * vals.res * vals.t; steps = ["Bits = sample rate × sample resolution × seconds", "= " + vals.sr + " × " + vals.res + " × " + vals.t + " = <b>" + bits + "</b> bits"]; }
      var bytes = bits / 8, kib = bytes / 1024, mib = kib / 1024;
      steps.push("÷ 8 = <b>" + bytes + "</b> bytes", "÷ 1024 = <b>" + (Math.round(kib * 1000) / 1000) + " KiB</b>", "÷ 1024 = " + (Math.round(mib * 100000) / 100000) + " MiB");
      view.lastChild.innerHTML = steps.map(function(s, i){ return "<div>" + (i + 1) + ". " + s + "</div>"; }).join("");
    }
    function build(){
      view.innerHTML = ""; var ctl = el("div");
      if(kind === "image"){ ctl.appendChild(row(f("w", "Width (pixels)"), f("h", "Height (pixels)"), f("d", "Colour depth (bits)"))); } else { ctl.appendChild(row(f("sr", "Sample rate (Hz)"), f("res", "Sample resolution (bits)"), f("t", "Length (seconds)"))); }
      view.appendChild(ctl); view.appendChild(el("div", "vres")); calc();
      Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === kind ? " on" : ""); });
    }
    [["image", "Image"], ["sound", "Sound"]].forEach(function(k){ var b = btn(k[1] + " file", function(){ kind = k[0]; build(); }); b.dataset.k = k[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); build();
  });

  /* ---------- 1.3.3 / 1.3.4 compression ---------- */
  V.reg("rle", function(box){
    var inp = el("input", "vin mono"), out = el("div"), tabs = row(), mode = "lossless", sl = el("input"), view = el("div");
    inp.value = "AAAABBBCC"; inp.maxLength = 24; inp.style.width = "220px"; inp.setAttribute("aria-label", "Text to compress");
    sl.type = "range"; sl.min = 1; sl.max = 5; sl.value = 5; sl.setAttribute("aria-label", "Sample resolution");
    function drawL(){
      var t = inp.value.toUpperCase(), runs = [], i;
      for(i = 0; i < t.length; i++){ if(runs.length && runs[runs.length - 1][0] === t[i]) runs[runs.length - 1][1]++; else runs.push([t[i], 1]); }
      var enc = runs.map(function(r){ return r[1] + r[0]; }).join("");
      out.innerHTML = '<div class="vcells">' + t.split("").map(function(c){ return '<div class="vcell">' + esc(c) + "</div>"; }).join("") + "</div>" +
        "<div class='vres'>Runs: " + runs.map(function(r){ return "<b>" + r[1] + "</b> × " + esc(r[0]); }).join(", ") + "<br>Compressed (count then item): <b class='vmono'>" + esc(enc) + "</b><br>" + t.length + " characters → " + enc.length + " characters." + (enc.length >= t.length ? " <span class='vwarn'>No saving: neighbouring items are all different, so RLE does not help.</span>" : " <span class='vok'>Lossless: the original can be rebuilt exactly.</span>") + "</div>";
    }
    function drawY(){
      var bitsN = +sl.value, lv = Math.pow(2, bitsN), h = "", k, f = function(t){ return Math.sin(t * 2 * Math.PI * 1.5) * 0.9; }, X = function(t){ return 20 + t * 400; }, Y = function(a){ return 80 - a * 60; }, d = "M" + X(0) + " " + Y(0), pts = "";
      for(k = 1; k <= 160; k++) d += " L" + X(k / 160) + " " + Y(f(k / 160));
      for(k = 0; k <= 160; k++){ var a = f(k / 160), q = Math.round((a + 1) / 2 * (lv - 1)) / (lv - 1) * 2 - 1; pts += X(k / 160) + "," + Y(q) + " "; }
      h = '<path d="' + d + '" fill="none" stroke="var(--muted)" stroke-dasharray="4 3"/><polyline fill="none" stroke="var(--accent)" stroke-width="2.5" points="' + pts + '"/>';
      view.innerHTML = ""; view.appendChild(svg(440, 160, h));
      var p = document.createElement("div"); p.className = "vres"; p.innerHTML = "Sample resolution: <b>" + bitsN + " bits</b> (" + lv + " levels). The file is <b>" + Math.round(bitsN / 5 * 100) + "%</b> of the original size. Lowering the resolution <b>permanently removes</b> detail (the stepped line): the lost data cannot be restored. That is <b>lossy</b> compression."; view.appendChild(p);
    }
    function build(){
      box.querySelector(".vbody").innerHTML = "";
      var b = box.querySelector(".vbody");
      if(mode === "lossless"){ b.appendChild(el("p", null, "<b>Run length encoding (RLE)</b> replaces each run of identical items with a count and the item. Type your own text (try AAAABBBCC, then ABCDE).")); b.appendChild(row(el("label", null, "Text "), inp)); b.appendChild(out); drawL(); }
      else { b.appendChild(el("p", null, "Drag the slider to reduce the sample resolution of a sound (the dashed line is the original).")); b.appendChild(row(el("label", null, "Resolution "), sl)); b.appendChild(view); drawY(); }
      Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.k === mode ? " on" : ""); });
    }
    [["lossless", "Lossless (RLE)"], ["lossy", "Lossy"]].forEach(function(k){ var b = btn(k[1], function(){ mode = k[0]; build(); }); b.dataset.k = k[0]; tabs.appendChild(b); });
    inp.addEventListener("input", drawL); sl.addEventListener("input", drawY);
    box.appendChild(tabs); box.appendChild(el("div", "vbody")); build();
  });

  /* ---------- 2.1.1 packets ---------- */
  V.reg("packet", function(box){
    var msg = "HELLO WORLD!!", size = 3, packets = [], order = [], view = el("div"), log = el("div", "vlog"), stage = 0, i;
    for(i = 0; i < msg.length; i += size) packets.push(msg.substr(i, size));
    function card(k, big){
      return '<div style="display:inline-block;border:2px solid var(--accent);border-radius:8px;margin:4px;overflow:hidden;font-size:11.5px;vertical-align:top;background:var(--surface)"><div style="background:var(--accent-tint);padding:3px 6px"><b>Header</b><br>to 192.168.1.20<br><b>packet ' + (k + 1) + '</b> of ' + packets.length + "<br>from 192.168.1.5</div><div style='padding:5px 6px;text-align:center;font:700 15px ui-monospace,monospace'>" + esc(packets[k]).replace(/ /g, "␣") + "</div><div style='background:var(--bg);padding:3px 6px'><b>Trailer</b><br>end + error check</div></div>";
    }
    function draw(){
      var seq = stage === 0 ? packets.map(function(p, k){ return k; }) : order;
      var h = stage === 0 ? "<b>The file is split into packets</b>" : (stage === 1 ? "<b>Packets arrive in a different order</b> (they may take different routes)" : "<b>The receiver sorts them by packet number</b>");
      view.innerHTML = "<div>" + h + "</div><div>" + seq.map(function(k){ return card(k); }).join("") + "</div>" + (stage === 2 ? "<div class='vres'>Rebuilt message: <b class='vmono'>" + esc(msg) + "</b></div>" : "");
      log.innerHTML = ["The message “" + esc(msg) + "” is too big to send at once, so it is broken into <b>" + packets.length + " packets</b>. Each has a <b>header</b> (destination address, packet number, sender's address), a <b>payload</b> (a piece of the data) and a <b>trailer</b> (end marker and error-checking data).", "Press <b>Send</b> again: the network delivers the packets in a mixed-up order.", "The packet numbers in the headers let the receiving device put the packets back in order and rebuild the file."][stage];
    }
    order = packets.map(function(p, k){ return k; }).reverse(); order = [2, 0, 4, 1, 3];
    box.appendChild(row(btn("Next ›", function(){ stage = (stage + 1) % 3; draw(); }, "p"), btn("↺ Reset", function(){ stage = 0; draw(); })));
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 2.1.2a serial and parallel ---------- */
  V.reg("serpar", function(box){
    var byte = "10110010", mode = "serial", skew = false, t = 0, stop = null, view = el("div"), log = el("div", "vlog"), tabs = row();
    function scene(){
      var h = "", k, W = 470;
      if(mode === "serial"){
        h += '<rect class="bx" x="20" y="60" width="70" height="60" rx="8"/><text class="mid b" x="55" y="95">Sender</text><rect class="bx" x="390" y="60" width="70" height="60" rx="8"/><text class="mid b" x="425" y="95">Receiver</text><line class="wr" x1="90" y1="90" x2="390" y2="90"/><text class="sm mu mid" x="240" y="112">ONE wire</text>';
        for(k = 0; k < 8; k++){ var pos = t - k; if(pos >= 0 && pos <= 10){ var x = 90 + pos * 30; h += '<rect class="' + (byte[k] === "1" ? "ac" : "bx") + '" x="' + (x - 11) + '" y="78" width="22" height="22" rx="5"/><text class="mid b" x="' + x + '" y="94">' + byte[k] + "</text>"; } }
      } else {
        h += '<rect class="bx" x="20" y="10" width="70" height="170" rx="8"/><text class="mid b" x="55" y="100">Sender</text><rect class="bx" x="390" y="10" width="70" height="170" rx="8"/><text class="mid b" x="425" y="100">Receiver</text>';
        for(k = 0; k < 8; k++){ var y = 24 + k * 20, delay = skew && (k === 2 || k === 5) ? 2 : 0, pos2 = t - delay; h += '<line class="wr" x1="90" y1="' + y + '" x2="390" y2="' + y + '"/>'; if(pos2 >= 0 && pos2 <= 10){ var x2 = 90 + pos2 * 30; h += '<rect class="' + (delay ? "no" : (byte[k] === "1" ? "ac" : "bx")) + '" x="' + (x2 - 9) + '" y="' + (y - 8) + '" width="18" height="16" rx="4"/><text class="mid b sm" x="' + x2 + '" y="' + (y + 4) + '">' + byte[k] + "</text>"; } }
      }
      view.innerHTML = ""; view.appendChild(svg(480, mode === "serial" ? 140 : 195, h));
      log.innerHTML = mode === "serial" ? "<b>Serial:</b> one wire, one bit at a time, so eight bits take eight steps. The bits arrive in order, so there is little skew and less chance of interference. Cheaper cable and good for longer distances." : "<b>Parallel:</b> several wires, so <b>all eight bits travel at the same time</b>: faster. " + (skew ? "<span class='vbad'>Skew: the red bits arrived late and out of step.</span>" : "Over a long cable the bits can drift out of step (<b>skew</b>), so it is best for short distances (about 5 m) and costs more.");
    }
    function run(){ if(stop) stop(); t = 0; scene(); stop = V.timer(box, function(){ t++; scene(); if(t > 11){ stop = null; return false; } }, 380); }
    [["serial", "Serial"], ["parallel", "Parallel"]].forEach(function(m){ var b = btn(m[1], function(){ mode = m[0]; Array.prototype.forEach.call(tabs.querySelectorAll("[data-m]"), function(x){ x.className = "vb" + (x.dataset.m === mode ? " on" : ""); }); run(); }); b.dataset.m = m[0]; tabs.appendChild(b); });
    tabs.appendChild(btn("▶ Send the byte 10110010", run, "p")); tabs.appendChild(btn("Toggle skew (parallel)", function(){ skew = !skew; run(); }));
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); tabs.firstChild.className = "vb on"; scene();
  });

  /* ---------- 2.1.2b simplex, half and full duplex ---------- */
  V.reg("duplex", function(box){
    var mode = "simplex", t = 0, view = el("div"), log = el("div", "vlog"), tabs = row();
    var info = { simplex: ["Simplex", "Data travels in <b>one direction only</b>. Example: a keyboard sending key presses to a computer."], half: ["Half-duplex", "Data can travel in <b>both directions, but only one direction at a time</b>. Example: walkie-talkies, or a Wi-Fi connection."], full: ["Full-duplex", "Data travels in <b>both directions at the same time</b>. Example: a telephone call."] };
    function scene(){
      var fwd = mode !== "half" || t % 2 === 0, back = mode === "full" || (mode === "half" && t % 2 === 1), x1 = 120 + (t % 5) * 60, x2 = 420 - (t % 5) * 60, h = '<rect class="bx" x="20" y="35" width="90" height="70" rx="8"/><text class="mid b" x="65" y="75">Device A</text><rect class="bx" x="430" y="35" width="90" height="70" rx="8"/><text class="mid b" x="475" y="75">Device B</text><line class="wr" x1="110" y1="55" x2="430" y2="55"/><line class="wr" x1="110" y1="85" x2="430" y2="85"/>';
      if(fwd) h += '<rect class="ac" x="' + (x1 - 12) + '" y="46" width="30" height="18" rx="5"/><text class="mid b sm" x="' + (x1 + 3) + '" y="59">A ➜ B</text>';
      if(back) h += '<rect class="wa" x="' + (x2 - 12) + '" y="76" width="30" height="18" rx="5"/><text class="mid b sm" x="' + (x2 + 3) + '" y="89">B ➜ A</text>';
      if(mode === "simplex" ) h += '<text class="sm mu mid" x="270" y="120">no data can come back</text>';
      if(mode === "half") h += '<text class="sm mu mid" x="270" y="120">' + (fwd ? "A is sending; B must wait" : "B is sending; A must wait") + "</text>";
      view.innerHTML = ""; view.appendChild(svg(540, 135, h)); log.innerHTML = "<b>" + info[mode][0] + ":</b> " + info[mode][1];
    }
    ["simplex", "half", "full"].forEach(function(m){ var b = btn(info[m][0], function(){ mode = m; t = 0; Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.m === mode ? " on" : ""); }); scene(); }); b.dataset.m = m; tabs.appendChild(b); });
    tabs.firstChild.className = "vb on"; box.appendChild(tabs); box.appendChild(view); box.appendChild(log); scene(); V.timer(box, function(){ t++; scene(); }, 900);
  });

  /* ---------- 2.2.2a parity ---------- */
  V.reg("parity", function(box){
    var par = "even", d = [1, 1, 0, 1, 0, 0, 1], flips = {}, view = el("div"), res = el("div", "vres"), tabs = row();
    function sent(){ var ones = d.reduce(function(a, b){ return a + b; }, 0), p = par === "even" ? ones % 2 : 1 - ones % 2; return [p].concat(d); }
    function draw(){
      var s = sent(), r = s.map(function(b, k){ return flips[k] ? 1 - b : b; }), ones = r.reduce(function(a, b){ return a + b; }, 0), nf = Object.keys(flips).filter(function(k){ return flips[k]; }).length, okp = par === "even" ? ones % 2 === 0 : ones % 2 === 1;
      view.innerHTML = "<div><b>1. Data bits (click to change)</b></div>";
      view.appendChild(bitsRow(7, function(k){ return d[k]; }, function(k){ d[k] ^= 1; flips = {}; draw(); }));
      var wrapS = el("div", null, "<div><b>2. Byte sent</b> (parity bit first)</div><div class='vcells'>" + s.map(function(b, k){ return "<div class='vcell " + (k === 0 ? "hi" : "") + "'>" + b + (k === 0 ? "<small>parity</small>" : "") + "</div>"; }).join("") + "</div>");
      var wrapR = el("div", null, "<div><b>3. Byte received</b> (click a bit to damage it in transit)</div>"), rr = el("div", "vcells");
      r.forEach(function(b, k){ var c = el("button", "vcell " + (flips[k] ? "no" : ""), b + (k === 0 ? "<small>parity</small>" : "")); c.type = "button"; c.style.cursor = "pointer"; c.addEventListener("click", function(){ flips[k] = !flips[k]; draw(); }); rr.appendChild(c); });
      wrapR.appendChild(rr); view.appendChild(wrapS); view.appendChild(wrapR);
      res.innerHTML = "Number of 1s in the sent byte: <b>" + s.reduce(function(a, b){ return a + b; }, 0) + "</b> (" + par + " ✓). Received byte has <b>" + ones + "</b> ones, which is " + (ones % 2 ? "odd" : "even") + ".<br>" + (okp ? (nf ? "<span class='vwarn'>The count still looks right, so the receiver does NOT notice " + nf + " damaged bits: a parity check cannot detect two bits changing.</span>" : "<span class='vok'>The count matches: no error detected.</span>") : "<span class='vbad'>Wrong count: an error is detected.</span> But the receiver cannot tell which bit is wrong.");
      Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.p === par ? " on" : ""); });
    }
    ["even", "odd"].forEach(function(p){ var b = btn(p[0].toUpperCase() + p.slice(1) + " parity", function(){ par = p; flips = {}; draw(); }); b.dataset.p = p; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(res); draw();
  });

  /* ---------- 2.2.2b echo check ---------- */
  V.reg("echo", function(box){
    var dmg = 0, view = el("div"), log = el("div", "vlog"), pl, tabs = row();
    function show(i){
      var h = '<rect class="bx" x="20" y="40" width="110" height="70" rx="8"/><text class="mid b" x="75" y="70">Sender</text><text class="mid sm mu" x="75" y="90">sends “CAT”</text><rect class="bx" x="410" y="40" width="110" height="70" rx="8"/><text class="mid b" x="465" y="70">Receiver</text><line class="wr" x1="130" y1="60" x2="410" y2="60"/><line class="wr" x1="130" y1="92" x2="410" y2="92"/>';
      var got = dmg === 1 ? "CAP" : "CAT", back = dmg === 2 ? "CAP" : got, msg;
      if(i === 0){ h += '<rect class="ac" x="220" y="50" width="60" height="20" rx="5"/><text class="mid b sm" x="250" y="64">CAT ➜</text>'; msg = "The sender transmits the data."; }
      if(i === 1){ h += '<text class="mid b" x="465" y="102">received “' + got + '”</text><rect class="' + (dmg === 1 ? "no" : "ac") + '" x="220" y="50" width="60" height="20" rx="5"/><text class="mid b sm" x="250" y="64">' + got + "</text>"; msg = "The receiver gets " + (dmg === 1 ? "<b>damaged</b> data (“CAP”)" : "the data") + " and sends a <b>copy of what it received back</b>."; }
      if(i === 2){ h += '<rect class="' + (back !== "CAT" ? "no" : "ok") + '" x="220" y="82" width="60" height="20" rx="5"/><text class="mid b sm" x="250" y="96">⬅ ' + back + "</text>"; msg = "The copy travels back to the sender" + (dmg === 2 ? " (and is <b>damaged on the way back</b>)." : "."); }
      if(i === 3){ var same = back === "CAT"; h += '<text class="mid b" x="75" y="130">' + (same ? "✓ match" : "✗ no match") + "</text>"; msg = same ? "<span class='vok'>The returned copy matches the original: no error detected.</span>" : "<span class='vbad'>The copy does not match: an error is reported.</span>" + (dmg === 2 ? " <b>But the data actually arrived correctly</b>: the error happened on the way back. That is the weakness of an echo check." : " The data really was damaged on the way there."); }
      view.innerHTML = ""; view.appendChild(svg(540, 145, h)); log.innerHTML = msg;
    }
    function build(){ if(pl) pl.remove(); pl = V.player(box, { count: function(){ return 4; }, show: show, reset: function(){ view.innerHTML = ""; view.appendChild(svg(540, 145, "")); log.innerHTML = "Press <b>Step</b> to follow an echo check."; }, ms: 1700 }); box.insertBefore(pl, view); Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (+b.dataset.d === dmg ? " on" : ""); }); }
    [[0, "No error"], [1, "Damaged on the way there"], [2, "Damaged on the way back"]].forEach(function(m){ var b = btn(m[1], function(){ dmg = m[0]; if(pl) pl.halt(); build(); }); b.dataset.d = m[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 2.2.3 check digit (EAN-13 barcode example) ---------- */
  V.reg("checkdigit", function(box){
    var inp = el("input", "vin mono"), out = el("div", "vres");
    inp.value = "5901234123457"; inp.maxLength = 13; inp.style.width = "190px"; inp.setAttribute("aria-label", "13-digit barcode number");
    V.eanCheck = function(s12){ var sum = 0, k; for(k = 0; k < 12; k++) sum += +s12[k] * (k % 2 ? 3 : 1); return (10 - sum % 10) % 10; };
    function draw(){
      var s = inp.value.replace(/\D/g, ""); if(s.length < 13){ out.innerHTML = "Enter all 13 digits (the last digit is the check digit)."; return; }
      var terms = [], sum = 0, k; for(k = 0; k < 12; k++){ var w = k % 2 ? 3 : 1; terms.push(s[k] + "×" + w); sum += +s[k] * w; }
      var chk = V.eanCheck(s), ok = chk === +s[12];
      out.innerHTML = "The scanner recalculates the check digit from the first 12 digits (one example method, the barcode rule: multiply alternate digits by 1 and 3, add up, then find what must be added to reach a multiple of 10).<br><span class='vmono'>" + terms.join(" + ") + " = " + sum + "</span><br>Calculated check digit: <b>" + chk + "</b> · printed check digit: <b>" + s[12] + "</b><br>" + (ok ? "<span class='vok'>They match: the number was probably read correctly.</span>" : "<span class='vbad'>They do NOT match: the digits were entered or scanned wrongly. The till refuses it and asks for another scan.</span>");
    }
    inp.addEventListener("input", draw);
    box.appendChild(el("p", null, "Change one digit of this barcode number (try 5901234123457 → 5901234128457) and watch the check digit catch the mistake. A check digit checks data <b>entry</b>; a checksum checks data <b>transmission</b>."));
    box.appendChild(row(el("label", null, "Barcode "), inp)); box.appendChild(out); draw();
  });

  /* ---------- 2.2.4 automatic repeat request ---------- */
  V.reg("arq", function(box){
    var lose = false, view = el("div"), log = el("div", "vlog"), pl, tabs = row();
    function steps(){ var s = [], k; for(k = 1; k <= 3; k++){
      s.push({ n: k, ph: "send", t: "Sender sends <b>packet " + k + "</b> and starts the timeout." });
      if(lose && k === 2){ s.push({ n: k, ph: "recv", t: "Receiver gets packet 2 with no errors and sends an acknowledgement…" }); s.push({ n: k, ph: "lost", t: "…but the <b>acknowledgement is lost</b>. The timeout runs out, so the sender <b>resends packet 2</b>." }); s.push({ n: k, ph: "send2", t: "Packet 2 is sent again." }); s.push({ n: k, ph: "ack", t: "This time the positive acknowledgement arrives, so the sender moves on." }); }
      else { s.push({ n: k, ph: "recv", t: "Receiver checks packet " + k + ": no errors, so it sends a <b>positive acknowledgement</b>." }); s.push({ n: k, ph: "ack", t: "The acknowledgement arrives before the timeout. Sender sends the next packet." }); } }
      s.push({ n: 0, ph: "done", t: "All three packets delivered." }); return s; }
    function show(i){
      var s = steps()[i], h = '<rect class="bx" x="20" y="25" width="100" height="75" rx="8"/><text class="mid b" x="70" y="68">Sender</text><rect class="bx" x="420" y="25" width="100" height="75" rx="8"/><text class="mid b" x="470" y="68">Receiver</text><line class="wr" x1="120" y1="48" x2="420" y2="48"/><line class="wr dash" x1="120" y1="80" x2="420" y2="80"/>';
      if(s.ph === "send" || s.ph === "send2") h += '<rect class="ac" x="230" y="38" width="80" height="20" rx="5"/><text class="mid b sm" x="270" y="52">packet ' + s.n + " ➜</text>";
      if(s.ph === "recv") h += '<text class="mid b" x="470" y="118">✓ packet ' + s.n + "</text>";
      if(s.ph === "ack") h += '<rect class="ok" x="230" y="70" width="80" height="20" rx="5"/><text class="mid b sm" x="270" y="84">⬅ ACK ' + s.n + "</text>";
      if(s.ph === "lost") h += '<rect class="no" x="230" y="70" width="80" height="20" rx="5"/><text class="mid b sm" x="270" y="84">✗ ACK lost</text><text class="mid b" x="70" y="118">⏱ timeout!</text>';
      view.innerHTML = ""; view.appendChild(svg(540, 130, h)); log.innerHTML = s.t;
    }
    function build(){ if(pl) pl.remove(); var n = steps().length; pl = V.player(box, { count: function(){ return steps().length; }, show: show, reset: function(){ view.innerHTML = ""; view.appendChild(svg(540, 130, "")); log.innerHTML = "Press <b>Step</b> to send three packets with positive acknowledgement."; }, ms: 1700 }); box.insertBefore(pl, view); Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + ((b.dataset.l === "1") === lose ? " on" : ""); }); }
    [[0, "Everything works"], [1, "An acknowledgement is lost"]].forEach(function(m){ var b = btn(m[1], function(){ lose = !!m[0]; if(pl) pl.halt(); build(); }); b.dataset.l = m[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 3.1.2 the fetch-decode-execute cycle ---------- */
  V.reg("fde", function(box){
    var prog = { 100: "ADD 5", 101: "ADD 3", 102: "ADD 2" }, st, view = el("div"), log = el("div", "vlog"), pl;
    function init(){ st = { pc: 100, mar: "", mdr: "", cir: "", acc: 0, hi: [], bus: "", msg: "", cyc: 0 }; }
    var STEPS = [
      function(){ st.mar = st.pc; st.hi = ["PC", "MAR"]; st.bus = "addr"; st.msg = "<b>Fetch 1.</b> The address in the <b>PC</b> (" + st.pc + ") is copied to the <b>MAR</b> using the address bus."; },
      function(){ st.hi = ["MAR", "RAM"]; st.bus = "addr"; st.msg = "<b>Fetch 2.</b> The MAR sends the address to <b>RAM</b> (address bus) to find the instruction."; },
      function(){ st.mdr = prog[st.mar]; st.hi = ["RAM", "MDR"]; st.bus = "data"; st.msg = "<b>Fetch 3.</b> The instruction <b>" + st.mdr + "</b> is sent from RAM to the <b>MDR</b> using the data bus."; },
      function(){ st.cir = st.mdr; st.hi = ["MDR", "CIR"]; st.bus = ""; st.msg = "<b>Fetch 4.</b> The instruction is copied from the MDR to the <b>CIR</b>."; },
      function(){ st.pc++; st.hi = ["PC"]; st.bus = ""; st.msg = "<b>Fetch 5.</b> The <b>PC is incremented</b> so it points at the next instruction (" + st.pc + ")."; },
      function(){ st.hi = ["CU", "CIR"]; st.bus = ""; st.msg = "<b>Decode.</b> The <b>control unit</b> decodes “" + st.cir + "” using the instruction set: add " + st.cir.split(" ")[1] + " to the value in the accumulator."; },
      function(){ var n = +st.cir.split(" ")[1]; st.acc += n; st.hi = ["ALU", "ACC"]; st.bus = "ctrl"; st.cyc++; st.msg = "<b>Execute.</b> The <b>ALU</b> adds " + n + " and the new total, <b>" + st.acc + "</b>, is stored in the <b>ACC</b>. The control bus carries the CU's signals. Then the cycle starts again."; }
    ];
    function box_(id, x, y, w, h, label, val){ var on = st.hi.indexOf(id) >= 0; return '<rect class="' + (on ? "ac" : "bx") + '" x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="6"/><text class="b sm" x="' + (x + 6) + '" y="' + (y + 14) + '">' + label + '</text><text class="mid b" x="' + (x + w / 2) + '" y="' + (y + h - 7) + '">' + esc(String(val)) + "</text>"; }
    function draw(){
      var h = '<rect fill="none" stroke="var(--muted)" stroke-width="2" stroke-dasharray="6 4" x="10" y="8" width="350" height="205" rx="12"/><text class="b mu" x="20" y="26">CPU</text>';
      h += box_("PC", 24, 36, 90, 46, "PC", st.pc) + box_("MAR", 130, 36, 90, 46, "MAR", st.mar) + box_("MDR", 236, 36, 90, 46, "MDR", st.mdr);
      h += box_("CIR", 24, 98, 90, 46, "CIR", st.cir) + box_("CU", 130, 98, 90, 46, "Control unit", st.hi.indexOf("CU") >= 0 ? "decoding" : "") + box_("ALU", 236, 98, 90, 46, "ALU", st.hi.indexOf("ALU") >= 0 ? "adds" : "");
      h += box_("ACC", 236, 158, 90, 46, "ACC (accumulator)", st.acc);
      h += '<rect class="' + (st.hi.indexOf("RAM") >= 0 ? "ac" : "bx") + '" x="400" y="8" width="120" height="205" rx="8"/><text class="b mid" x="460" y="28">RAM</text>';
      [100, 101, 102].forEach(function(a, k){ var cur = st.mar === a && st.hi.indexOf("RAM") >= 0; h += '<rect class="' + (cur ? "ac" : "bx") + '" x="410" y="' + (42 + k * 36) + '" width="100" height="30" rx="4"/><text class="sm mu" x="414" y="' + (60 + k * 36) + '">' + a + '</text><text class="b" x="446" y="' + (60 + k * 36) + '">' + prog[a] + "</text>"; });
      h += '<line class="wr' + (st.bus === "addr" ? " hi" : "") + '" x1="360" y1="48" x2="400" y2="48"/><line class="wr' + (st.bus === "data" ? " hi" : "") + '" x1="360" y1="70" x2="400" y2="70"/><text class="sm mu" x="364" y="40">address</text><text class="sm mu" x="368" y="86">data</text><text class="sm mu" x="364" y="150">control bus</text><line class="wr' + (st.bus === "ctrl" ? " hi" : "") + '" x1="360" y1="158" x2="400" y2="158"/>';
      view.innerHTML = ""; view.appendChild(svg(540, 225, h)); log.innerHTML = st.msg || "Program in RAM: <b>ADD 5</b>, <b>ADD 3</b>, <b>ADD 2</b>. Press <b>Step</b> to follow one fetch-decode-execute cycle at a time.";
    }
    pl = V.player(box, { count: function(){ return 21; }, show: function(i){ STEPS[i % 7](); draw(); }, reset: function(){ init(); draw(); }, ms: 1700 });
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); init(); draw();
  });

  /* ---------- 3.3.4 virtual memory ---------- */
  V.reg("vmem", function(box){
    var CAP = 4, ram = [], disk = [], progs = ["Game", "Browser", "Editor", "Music"], n = 0, view = el("div"), log = el("div", "vlog"), tabs = row(), t = 0;
    function chip(p, c){ return '<span style="display:inline-block;padding:5px 9px;margin:3px;border-radius:7px;border:1.5px solid var(--' + (c || "accent") + ');background:var(--' + (c === "line" ? "bg" : "accent-tint") + ');font-weight:700">' + esc(p) + "</span>"; }
    function draw(msg){
      view.innerHTML = '<div class="vtwo"><div><b>RAM</b> (' + ram.length + " of " + CAP + " pages used)<div style='min-height:52px;border:2px solid var(--accent);border-radius:8px;padding:4px;margin-top:4px'>" + ram.map(function(p){ return chip(p); }).join("") + (ram.length < CAP ? "<span class='ln-muted'>" + (CAP - ram.length) + " free</span>" : "<span class='vwarn'> RAM is full</span>") + "</div></div><div><b>Virtual memory</b> (on the hard drive or SSD)<div style='min-height:52px;border:2px dashed var(--muted);border-radius:8px;padding:4px;margin-top:4px'>" + (disk.length ? disk.map(function(p){ return chip(p, "line"); }).join("") : "<span class='ln-muted'>empty</span>") + "</div></div></div>";
      log.innerHTML = msg || "Open programs. Each one needs a page of RAM. When RAM is full, pages not needed straight away move out to virtual memory.";
      Array.prototype.forEach.call(view.querySelectorAll("div[style*=dashed] span"), function(s, k){ s.style.cursor = "pointer"; s.title = "Click to bring this page back into RAM"; s.addEventListener("click", function(){ bring(disk[k]); }); });
    }
    function need(){ if(ram.length >= CAP){ var out = ram.shift(); disk.push(out); return out; } return null; }
    function open(){ n++; var name = "Program " + n + " page"; var moved = need(); ram.push(name); draw(moved ? "RAM was full, so “" + moved + "” (not needed straight away) was moved to <b>virtual memory</b>. Now there is room." : "“" + name + "” was loaded into RAM."); }
    function bring(p){ var i = disk.indexOf(p); if(i < 0) return; disk.splice(i, 1); var moved = need(); ram.push(p); draw("“" + p + "” was needed again, so it was <b>copied back into RAM</b>" + (moved ? " and “" + moved + "” was moved out to make room" : "") + ". Reading from the disk is much slower than RAM: if this happens a lot, the computer <b>slows down</b>."); }
    box.appendChild(row(btn("Open another program ＋", open, "p"), btn("Reset", function(){ ram = []; disk = []; n = 0; draw(); }))); box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 3.4 MAC, IPv4 and IPv6 addresses ---------- */
  V.reg("netaddr", function(box, o){
    var kind = o.k || "mac", tabs = row(), inp = el("input", "vin mono"), out = el("div", "vres"), defs = { mac: "34:4D:EA:89:75:B2", ipv4: "192.168.1.23", ipv6: "2001:0db8:0000:0000:0000:ff00:0042:7879" };
    function draw(){
      var s = inp.value.trim(), h = "";
      if(kind === "mac"){ var m = /^([0-9A-Fa-f]{2})[:-]([0-9A-Fa-f]{2})[:-]([0-9A-Fa-f]{2})[:-]([0-9A-Fa-f]{2})[:-]([0-9A-Fa-f]{2})[:-]([0-9A-Fa-f]{2})$/.exec(s);
        h = m ? "<span class='vok'>Valid MAC address format.</span><br><span class='vmono'><b style='color:var(--accent)'>" + m.slice(1, 4).join(":").toUpperCase() + "</b> : <b style='color:var(--diff-moderate)'>" + m.slice(4).join(":").toUpperCase() + "</b></span><br>The first half identifies the <b>manufacturer</b>; the second half is the <b>serial (device) ID</b>. Six pairs of hex digits, 48 bits. Given to the NIC by the manufacturer and not normally changed." : "<span class='vbad'>Not a MAC address.</span> It needs six pairs of hex digits (0-9, A-F) separated by colons or dashes."; }
      if(kind === "ipv4"){ var p = s.split("."), good = p.length === 4 && p.every(function(x){ return /^\d{1,3}$/.test(x) && +x <= 255; });
        h = good ? "<span class='vok'>Valid IPv4 address.</span><br><span class='vmono'>" + p.map(function(x){ return pad((+x).toString(2), 8); }).join(" . ") + "</span><br>Four numbers from 0 to 255 (32 bits in total). It is given to the device by the network (often the router), so it can change." : "<span class='vbad'>Not a valid IPv4 address.</span> It needs four numbers, each 0 to 255, separated by full stops." + (p.some(function(x){ return +x > 255; }) ? " A number above 255 cannot fit in 8 bits." : ""); }
      if(kind === "ipv6"){ var g = s.split(":"), good6 = g.length === 8 && g.every(function(x){ return /^[0-9A-Fa-f]{1,4}$/.test(x); });
        h = good6 ? "<span class='vok'>Valid IPv6 address.</span><br>Eight groups of hexadecimal separated by colons: 8 × 16 = <b>128 bits</b>, so vastly more addresses than IPv4's 32 bits (about 4.3 billion)." : "<span class='vbad'>Not a (full) IPv6 address.</span> It needs eight groups of up to four hex digits separated by colons."; }
      out.innerHTML = h;
    }
    [["mac", "MAC address"], ["ipv4", "IPv4"], ["ipv6", "IPv6"]].forEach(function(k){ var b = btn(k[1], function(){ kind = k[0]; inp.value = defs[kind]; Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.k === kind ? " on" : ""); }); draw(); }); b.dataset.k = k[0]; tabs.appendChild(b); });
    inp.style.width = "100%"; inp.style.maxWidth = "420px"; inp.value = defs[kind]; inp.setAttribute("aria-label", "Address to check"); inp.addEventListener("input", draw);
    Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.k === kind ? " on" : ""); }); box.appendChild(el("p", null, "Edit the address to see whether it is valid, and what its parts mean."));
    box.appendChild(tabs); box.appendChild(inp); box.appendChild(out); draw();
  });
})(typeof window !== "undefined" ? window : this);
