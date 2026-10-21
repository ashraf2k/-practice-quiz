/* iLearn (10BR) visuals, part 4: extra animations for topics 1 and 2 (data representation and data transmission). Original artwork built in code. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, svg = V.svg;
  var RM = false; try { RM = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch(e){}
  function pad(s, n){ s = String(s); while(s.length < n) s = "0" + s; return s; }
  function rnd(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function later(box, list, fn, ms){ var id = setTimeout(function(){ if(box.isConnected) fn(); }, RM ? Math.min(ms, 60) : ms); list.push(id); }
  function clear(list){ while(list.length) clearTimeout(list.pop()); }
  function charInput(def, onGo){
    var inp = el("input", "vin mono"); inp.type = "text"; inp.maxLength = 1; inp.value = def; inp.style.width = "46px"; inp.style.textAlign = "center"; inp.setAttribute("aria-label", "Type one character");
    function go(){ var c = inp.value.charAt(0); var k = c.charCodeAt(0); if(!c || k < 32 || k > 126){ inp.value = def; c = def; } onGo(c); }
    inp.addEventListener("change", go); return { inp: inp, go: go };
  }

  /* ---------- 1.1.1 why computers use binary: switches and lamps ---------- */
  V.reg("switches", function(box){
    var timers = [], X = 40, G = 68, h = "", i;
    for(i = 0; i < 8; i++){ var x = X + i * G;
      h += '<line class="wr" id="sw-w' + i + '" x1="' + x + '" y1="70" x2="' + x + '" y2="150"/>' +
        '<circle class="vlamp" id="sw-l' + i + '" cx="' + x + '" cy="48" r="20"/><path class="vray" id="sw-r' + i + '" d="M' + (x - 30) + ' 48h-8M' + (x + 30) + ' 48h8M' + x + ' 8v-8M' + (x - 24) + ' 22l-6 -6M' + (x + 24) + ' 22l6 -6"/>' +
        '<circle class="vcon" cx="' + x + '" cy="150" r="5"/><g class="vlever" id="sw-s' + i + '" style="transform-origin:' + x + 'px 210px"><line x1="' + x + '" y1="210" x2="' + x + '" y2="155" stroke="var(--ink)" stroke-width="5" stroke-linecap="round"/></g>' +
        '<circle cx="' + x + '" cy="210" r="6" fill="var(--ink)"/><text class="mid b mono" id="sw-t' + i + '" x="' + x + '" y="244" style="font-size:18px">0</text>'; }
    h += '<line class="wr" x1="' + (X - 16) + '" y1="210" x2="' + (X + 7 * G + 16) + '" y2="210" style="stroke-width:2"/><text class="mu sm" x="' + (X - 16) + '" y="268">power in</text>';
    var s = svg(40 + 7 * G + 40, 276, h), out = el("div", "vres"), seq = [];
    function set(k, on){ var q = function(id){ return s.querySelector("#" + id); };
      q("sw-s" + k).classList.toggle("closed", on); q("sw-l" + k).classList.toggle("on", on); q("sw-r" + k).classList.toggle("on", on); q("sw-w" + k).classList.toggle("live", on); q("sw-t" + k).textContent = on ? "1" : "0"; }
    function show(c){
      clear(timers); var code = c.charCodeAt(0), bin = pad(code.toString(2), 8), k;
      for(k = 0; k < 8; k++) set(k, false);
      out.innerHTML = "Switching on the pattern for <b class='vmono'>" + esc(c) + "</b> …";
      for(k = 0; k < 8; k++) (function(k){ later(box, timers, function(){ set(k, bin.charAt(k) === "1"); }, 350 + k * 230); })(k);
      later(box, timers, function(){ out.innerHTML = "ON = 1 and OFF = 0, so the switches read <b class='vmono'>" + bin.replace(/(....)/, "$1 ") + "</b>. That is the number <b class='big'>" + code + "</b>, which the computer treats as the character <b class='vmono'>“" + esc(c) + "”</b>."; }, 350 + 8 * 230 + 100);
    }
    var ci = charInput("A", show);
    box.appendChild(el("p", null, "A computer is made of billions of tiny <b>electronic switches</b>. Each one is either <b>ON (1)</b> or <b>OFF (0)</b>. Pick a character and watch the switches set themselves."));
    var r = row(); ["A", "a", "7", "?"].forEach(function(c){ r.appendChild(btn(c, function(){ ci.inp.value = c; show(c); })); });
    var lab = el("label", null, "or type your own: "); lab.appendChild(ci.inp); r.appendChild(lab); r.appendChild(btn("Show it", ci.go, "p"));
    box.appendChild(r); box.appendChild(s); box.appendChild(out); show("A");
  });

  /* ---------- 1.1.2b denary to binary: repeated division by 2 ---------- */
  V.reg("divtwo", function(box){
    var n = 156, steps, player, view = el("div"), log = el("div", "vlog"), inp = el("input", "vin mono");
    inp.type = "number"; inp.min = 1; inp.max = 255; inp.style.width = "80px"; inp.setAttribute("aria-label", "Denary number from 1 to 255");
    function calc(){ steps = []; var v = n; while(v > 0){ steps.push({ v: v, q: Math.floor(v / 2), r: v % 2 }); v = Math.floor(v / 2); } }
    function render(k){
      var shown = Math.min(k, steps.length), h = "<div class='dvwrap'><div class='dvcol'>", i, bits = [], w = [128, 64, 32, 16, 8, 4, 2, 1];
      for(i = 0; i < shown; i++){ var st = steps[i]; h += "<div class='dvrow" + (i === shown - 1 && k <= steps.length ? " new" : "") + "'><span class='vmono'>" + st.v + " ÷ 2 = " + st.q + "</span> <span class='dvrem r" + st.r + "'>remainder " + st.r + "</span></div>"; }
      if(!shown) h += "<div class='ln-muted'>Press Play or Step to start dividing.</div>";
      h += "</div><div class='dvbits'>";
      for(i = 0; i < 8; i++){ var idx = 7 - i, filled = idx < shown ? steps[idx] : null, val = filled ? filled.r : (k > steps.length && idx >= steps.length ? 0 : ""); bits.push(val);
        h += "<div class='dvslot'><div class='dvw'>" + w[i] + "</div><div class='dvb " + (val === "" ? "" : "f f" + val) + (filled && idx === shown - 1 && k <= steps.length ? " pop" : "") + "'>" + val + "</div></div>"; }
      h += "</div></div>";
      if(k > steps.length) h += "<div class='vres'>Reading the remainders from the <b>bottom up</b> and padding to 8 bits: <b class='big vmono'>" + pad(n.toString(2), 8) + "</b></div>";
      view.innerHTML = h;
      log.innerHTML = k === 0 ? "Keep dividing by <b>2</b> and write down each <b>remainder</b>. Stop when you reach 0." :
        k <= steps.length ? ("<b>" + steps[k - 1].v + " ÷ 2 = " + steps[k - 1].q + " remainder " + steps[k - 1].r + "</b>. The first remainder is the <b>right-most bit</b>; each new remainder goes one place to the left.") :
        "The remainders, read from the last to the first, are the binary number. Check it: add the place values that hold a 1 and you get <b>" + n + "</b> again.";
    }
    function start(){ n = Math.max(1, Math.min(255, parseInt(inp.value, 10) || 1)); inp.value = n; calc(); if(player) player.halt(); render(0); if(player) player.upd(); }
    inp.value = n; calc();
    player = V.player(box, { count: function(){ return steps.length + 1; }, show: function(i){ render(i + 1); }, reset: function(){ render(0); }, ms: 1100 });
    var go = el("label", null, "Number to convert (1–255): "); go.appendChild(inp);
    box.appendChild(el("p", null, "To turn a <b>denary</b> number into <b>binary</b>, divide by 2 again and again. Watch each remainder drop into its place."));
    box.appendChild(row(go, btn("Use this number", function(){ player.halt(); n = Math.max(1, Math.min(255, parseInt(inp.value, 10) || 1)); inp.value = n; calc(); render(0); player.upd(); }), btn("Random", function(){ player.halt(); n = rnd(20, 255); inp.value = n; calc(); render(0); player.upd(); })));
    box.appendChild(player); box.appendChild(view); box.appendChild(log); render(0);
  });

  /* ---------- 1.1.2d / 1.1.3 hexadecimal and the nibble ---------- */
  V.reg("nibble", function(box){
    var val = 0xB7, dir = "bh", player, view = el("div"), log = el("div", "vlog");
    function hx(v){ return v.toString(16).toUpperCase(); }
    function nb(v){ return pad(v.toString(2), 4); }
    function render(s){
      var hi = val >> 4, lo = val & 15, h = "<div class='nbwrap'>";
      if(dir === "bh"){
        h += "<div class='nbbyte" + (s >= 2 ? " apart" : "") + "'>" +
          "<div class='nbn a" + (s >= 1 ? " col" : "") + "'>" + nb(hi).split("").map(function(c){ return "<span class='nbit'>" + c + "</span>"; }).join("") + (s >= 2 ? "<div class='nbd'>= " + hi + "</div>" : "") + (s >= 3 ? "<div class='nbx'>" + hx(hi) + "</div>" : "") + "</div>" +
          "<div class='nbn b" + (s >= 1 ? " col" : "") + "'>" + nb(lo).split("").map(function(c){ return "<span class='nbit'>" + c + "</span>"; }).join("") + (s >= 2 ? "<div class='nbd'>= " + lo + "</div>" : "") + (s >= 3 ? "<div class='nbx'>" + hx(lo) + "</div>" : "") + "</div></div>";
        if(s >= 4) h += "<div class='vres'>8 binary digits <b class='vmono'>" + nb(hi) + nb(lo) + "</b> become just 2 hex digits: <b class='big vmono'>" + hx(hi) + hx(lo) + "</b></div>";
        log.innerHTML = ["Here is a byte: <b>" + nb(hi) + nb(lo) + "</b>. Hex works on <b>groups of four bits</b>.", "Step 1: split the byte into two <b>nibbles</b> (4 bits each).", "Step 2: work out the value of each nibble with the place values 8 4 2 1.", "Step 3: write each value as one hex digit (10 = A, 11 = B … 15 = F).", "Step 4: join the digits. Hex is shorter and easier to read, and it converts back instantly."][s];
      } else {
        h += "<div class='nbbyte" + (s >= 1 ? " apart" : "") + "'>" + [hi, lo].map(function(v, k){
          return "<div class='nbn " + (k ? "b" : "a") + " col'><div class='nbx big'>" + hx(v) + "</div>" + (s >= 1 ? "<div class='nbd'>8 4 2 1</div>" : "") + (s >= 2 ? "<div class='nbd'>= " + v + "</div><div>" + nb(v).split("").map(function(c){ return "<span class='nbit'>" + c + "</span>"; }).join("") + "</div>" : "") + "</div>"; }).join("") + "</div>";
        if(s >= 3) h += "<div class='vres'>Joining the nibbles: <b class='big vmono'>" + nb(hi) + nb(lo) + "</b></div>";
        log.innerHTML = ["Here is a hex number: <b>" + hx(hi) + hx(lo) + "</b>. Every hex digit stands for exactly <b>four bits</b>.", "Step 1: write the place values 8 4 2 1 over each hex digit.", "Step 2: change each digit to denary, then to a 4-bit nibble.", "Step 3: put the nibbles side by side. That is the byte."][s];
      }
      view.innerHTML = h + "</div>";
    }
    function top(){ return dir === "bh" ? 4 : 3; }
    function newval(v){ player.halt(); val = v; player.reset(); }
    player = V.player(box, { count: top, show: function(i){ render(i + 1); }, reset: function(){ render(0); }, ms: 1500 });
    var tabs = row(), b1 = btn("Binary → hex", function(){ dir = "bh"; b1.classList.add("on"); b2.classList.remove("on"); player.halt(); player.reset(); }, "on"), b2 = btn("Hex → binary", function(){ dir = "hb"; b2.classList.add("on"); b1.classList.remove("on"); player.halt(); player.reset(); });
    tabs.appendChild(b1); tabs.appendChild(b2); tabs.appendChild(btn("New random byte", function(){ newval(rnd(16, 255)); }));
    box.appendChild(el("p", null, "One hex digit is exactly one <b>nibble</b> (four bits). Choose a direction and press Play."));
    box.appendChild(tabs); box.appendChild(player); box.appendChild(view); box.appendChild(log); render(0);
  });

  /* ---------- 1.3.1 the ladder of storage units ---------- */
  V.reg("ladder", function(box){
    var U = [
      { n: "bit", s: "1 or 0", e: "one light switch", m: "" },
      { n: "nibble", s: "4 bits", e: "one hex digit", m: "× 4" },
      { n: "byte", s: "8 bits", e: "one character, such as the letter A", m: "× 2" },
      { n: "kibibyte (KiB)", s: "1024 bytes", e: "a short email or a paragraph of text", m: "× 1024" },
      { n: "mebibyte (MiB)", s: "1024 KiB", e: "a photograph or a minute of music", m: "× 1024" },
      { n: "gibibyte (GiB)", s: "1024 MiB", e: "a film in high definition", m: "× 1024" },
      { n: "tebibyte (TiB)", s: "1024 GiB", e: "a big hard drive: hundreds of films", m: "× 1024" }
    ], player, s, log = el("div", "vlog");
    var W = 700, H = 290, bw = 70, gx = 30, h = "", i;
    for(i = 0; i < U.length; i++){ var x = 10 + i * (bw + gx), hh = 40 + i * 30, y = H - 50 - hh;
      h += '<g class="lad" id="lad' + i + '"><rect class="ac" x="' + x + '" y="' + y + '" width="' + bw + '" height="' + hh + '" rx="8"/><text class="mid b" x="' + (x + bw / 2) + '" y="' + (y + 20) + '" style="font-size:12.5px">' + U[i].n.split(" ")[0] + '</text>' + (i > 2 ? '<text class="mid mu sm" x="' + (x + bw / 2) + '" y="' + (y + 36) + '">' + U[i].n.split(" ")[1] + '</text>' : '') +
        '<text class="mid sm" x="' + (x + bw / 2) + '" y="' + (H - 30) + '">' + U[i].s + '</text>' + (i ? '<text class="mid b" x="' + (x - gx / 2) + '" y="' + (y + hh - 8) + '" style="fill:var(--accent-dark);font-size:11px">' + U[i].m + '</text>' : '') + '</g>'; }
    var s2 = svg(W, H, h + '<text class="mu sm" x="10" y="' + (H - 6) + '">Not drawn to scale: each of the last four steps really is 1024 times bigger than the one before.</text>');
    function render(k){ for(i = 0; i < U.length; i++) s2.querySelector("#lad" + i).classList.toggle("show", i < k);
      log.innerHTML = k === 0 ? "The smallest unit of data is the <b>bit</b>. Press Play and climb the ladder." : "<b>" + U[k - 1].n + "</b> = " + U[k - 1].s + (k > 1 ? " (" + U[k - 1].m + ")" : "") + ". About the size of <b>" + U[k - 1].e + "</b>."; }
    player = V.player(box, { count: function(){ return U.length; }, show: function(i){ render(i + 1); }, reset: function(){ render(0); }, ms: 1500 });
    box.appendChild(el("p", null, "Each bigger unit is built from the one below. Watch the ladder grow, and notice that computer storage multiplies by <b>1024</b>, not 1000.")); box.appendChild(player); box.appendChild(s2); box.appendChild(log); render(0);
  });

  /* ---------- 1.3.4 lossless against lossy ---------- */
  V.reg("lossy", function(box){
    var N = 16, img = [], x, y;
    function mix(a, b, t){ return [0, 1, 2].map(function(k){ return Math.round(a[k] + (b[k] - a[k]) * t); }); }
    for(y = 0; y < N; y++){ img.push([]); for(x = 0; x < N; x++){
      var c = mix([110, 170, 230], [200, 230, 250], y / 11), d = Math.sqrt(Math.pow(x - 11.5, 2) + Math.pow(y - 4, 2)), ground = 11 + Math.round(Math.sin(x * 0.55) * 1.4);
      if(d < 2.7) c = [255, 214, 60]; else if(d < 3.6) c = mix(c, [255, 235, 150], 0.6);
      if(x === 3 && y >= 8 && y <= 11) c = [120, 80, 45];
      if(Math.pow(x - 3, 2) + Math.pow(y - 7, 2) < 6) c = [40, 120, 60];
      if(y >= ground) c = y >= 14 ? [50, 130, 70] : [80, 170, 90];
      img[y].push(c); } }
    var mode = "lossless", q = 1, view = el("div"), log = el("div", "vlog"), slider = el("input"), sl = el("label", null, "Compression level: "), cmpEl = null;
    slider.type = "range"; slider.min = 1; slider.max = 3; slider.value = 1; slider.setAttribute("aria-label", "How much to compress"); sl.appendChild(slider);
    function key(c){ return c.join(","); }
    function lossless(){ var runs = 0; for(var r = 0; r < N; r++){ var run = 1; for(var cI = 1; cI <= N; cI++){ if(cI < N && key(img[r][cI]) === key(img[r][cI - 1])) run++; else { runs++; run = 1; } } } return { runs: runs, bytes: runs * 4 }; }
    function lossy(){ var b = [1, 2, 4, 8][q], bits = [8, 5, 3, 2][q] , out = [], r, c, i, j; var levels = Math.pow(2, bits);
      for(r = 0; r < N; r++){ out.push([]); for(c = 0; c < N; c++){ var br = Math.floor(r / b) * b, bc = Math.floor(c / b) * b, sum = [0, 0, 0], cnt = 0;
        for(i = 0; i < b; i++) for(j = 0; j < b; j++){ var p = img[br + i][bc + j]; sum[0] += p[0]; sum[1] += p[1]; sum[2] += p[2]; cnt++; }
        out[r].push(sum.map(function(v){ var a = v / cnt, st = 255 / (levels - 1); return Math.round(Math.round(a / st) * st); })); } }
      var px = Math.pow(N / b, 2); return { img: out, bytes: Math.ceil(px * 3 * bits / 8), b: b, bits: bits }; }
    function grid(g, cls){ var h = "<div class='lgrid " + (cls || "") + "'>"; g.forEach(function(rw){ rw.forEach(function(c){ h += "<i style='background:rgb(" + c.join(",") + ")'></i>"; }); }); return h + "</div>"; }
    function draw(){
      var orig = N * N * 3, res, after = img, changed = 0, same = true;
      if(mode === "lossless"){ res = lossless(); } else { res = lossy(); after = res.img; }
      for(var r = 0; r < N; r++) for(var c = 0; c < N; c++) if(key(after[r][c]) !== key(img[r][c])){ changed++; same = false; }
      var pct = Math.round(res.bytes / orig * 100);
      view.innerHTML = "<div class='lwrap'><div><div class='lcap'>Original: " + orig + " bytes</div>" + grid(img) + "</div><div class='larr'>" + (mode === "lossless" ? "compress<br>➜<br>decompress" : "compress<br>➜<br>decompress") + "</div><div><div class='lcap'>After: " + (mode === "lossless" ? "rebuilt exactly" : "rebuilt, not exact") + "</div>" + grid(after, same ? "" : "worse") + "</div></div>" +
        "<div class='lbar'><span>Original</span><div><i style='width:100%'></i></div><b>" + orig + " B</b></div><div class='lbar'><span>Compressed</span><div><i class='" + (mode === "lossless" ? "g" : "w") + "' style='width:" + Math.min(100, pct) + "%'></i></div><b>" + res.bytes + " B (" + pct + "%)</b></div>" +
        (same ? "<div class='vres'>✅ <b>Lossless:</b> all 256 pixels are identical after decompression. The file is " + (100 - pct) + "% smaller and <b>nothing was lost</b>.</div>" :
        "<div class='vres'>⚠️ <b>Lossy:</b> " + changed + " of 256 pixels have changed. The file is " + (100 - pct) + "% smaller, but the lost detail <b>can never be got back</b>.</div>");
      log.innerHTML = mode === "lossless" ? "Lossless compression looks for patterns (here: runs of the same colour, like <b>run length encoding</b>) and stores them in a shorter way. It can be reversed exactly." :
        "Lossy compression <b>permanently removes</b> detail the viewer is unlikely to notice: here it merges pixels into blocks of " + res.b + "×" + res.b + " and uses fewer shades. Slide it up for smaller files and worse quality.";
      sl.style.display = mode === "lossy" ? "" : "none";
    }
    var bl = btn("Lossless", function(){ mode = "lossless"; bl.classList.add("on"); by.classList.remove("on"); draw(); }, "on"), by = btn("Lossy", function(){ mode = "lossy"; by.classList.add("on"); bl.classList.remove("on"); draw(); });
    slider.addEventListener("input", function(){ q = parseInt(slider.value, 10); draw(); });
    box.appendChild(el("p", null, "Compress the same little picture two ways, then decompress it. Compare the pictures and the file sizes."));
    box.appendChild(row(bl, by, sl)); box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 2.1.1b packets finding their own routes ---------- */
  V.reg("packetnet", function(box){
    var R = { R1: [190, 50], R2: [350, 50], R3: [270, 130], R4: [190, 210], R5: [350, 210] }, S = [60, 130], D = [540, 130], broken = {}, timers = [];
    var ROUTES = [{ name: "top", via: ["R1", "R2"] }, { name: "middle", via: ["R3"] }, { name: "bottom", via: ["R4", "R5"] }];
    var holder = el("div"), rec = el("div", "vres"), log = el("div", "vlog");
    function pts(rt){ return [[S[0] + 24, S[1]]].concat(rt.via.map(function(k){ return R[k]; }), [[D[0] - 24, D[1]]]); }
    function len(rt){ var p = pts(rt), t = 0, i; for(i = 1; i < p.length; i++) t += Math.hypot(p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]); return t; }
    function base(){
      var h = "";
      ROUTES.forEach(function(rt){ var p = pts(rt), ok = !rt.via.some(function(k){ return broken[k]; });
        h += '<polyline points="' + p.map(function(q){ return q.join(","); }).join(" ") + '" class="wr' + (ok ? "" : " dash") + '" style="opacity:' + (ok ? 1 : .35) + '"/>'; });
      Object.keys(R).forEach(function(k){ var p = R[k], b = broken[k];
        h += '<g class="vrouter' + (b ? " broken" : "") + '" data-r="' + k + '" tabindex="0" role="button" aria-label="Router ' + k + (b ? ", switched off" : ", working") + '"><rect class="' + (b ? "no" : "bx") + '" x="' + (p[0] - 22) + '" y="' + (p[1] - 16) + '" width="44" height="32" rx="7"/><text class="mid b sm" x="' + p[0] + '" y="' + (p[1] + 4) + '">' + (b ? "✕ " : "") + k + '</text></g>'; });
      h += '<rect class="ac" x="' + (S[0] - 40) + '" y="' + (S[1] - 24) + '" width="64" height="48" rx="8"/><text class="mid b sm" x="' + (S[0] - 8) + '" y="' + (S[1] + 4) + '">Sender</text>';
      h += '<rect class="ok" x="' + (D[0] - 24) + '" y="' + (D[1] - 24) + '" width="64" height="48" rx="8"/><text class="mid b sm" x="' + (D[0] + 8) + '" y="' + (D[1] + 4) + '">Receiver</text>';
      return h;
    }
    function colour(n){ return "hsl(" + (n * 62 + 20) + ",75%,70%)"; }
    function scene(packets){
      var h = base(), i;
      (packets || []).forEach(function(p){ var d = p.path.map(function(q, i){ return (i ? "L" : "M") + q.join(","); }).join(" ");
        h += '<g opacity="0"><rect x="-13" y="-13" width="26" height="26" rx="5" fill="' + colour(p.n) + '" stroke="var(--ink)" stroke-width="1.5"/><text class="mid b" y="5" style="fill:#111;font-size:14px">' + p.n + '</text>' +
          '<set attributeName="opacity" to="1" begin="' + p.t0.toFixed(2) + 's" fill="freeze"/><animateMotion path="' + d + '" dur="' + p.dur.toFixed(2) + 's" begin="' + p.t0.toFixed(2) + 's" fill="freeze" calcMode="linear"/></g>'; });
      var s = svg(600, 260, h); holder.innerHTML = ""; holder.appendChild(s);
      s.querySelectorAll(".vrouter").forEach(function(g){ function t(){ broken[g.getAttribute("data-r")] = !broken[g.getAttribute("data-r")]; clear(timers); scene(null); rec.innerHTML = "Router switched " + (broken[g.getAttribute("data-r")] ? "<b>off</b>" : "<b>on</b>") + ". Press Send again to see the packets avoid it."; log.innerHTML = ""; }
        g.addEventListener("click", t); g.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); t(); } }); });
      if(packets && s.setCurrentTime){ s.setCurrentTime(0); if(s.unpauseAnimations) s.unpauseAnimations(); }
    }
    function chips(order){ return order.map(function(n){ return "<span class='pkc' style='background:" + colour(n) + "'>" + n + "</span>"; }).join(""); }
    function send(){
      clear(timers); var avail = ROUTES.filter(function(rt){ return !rt.via.some(function(k){ return broken[k]; }); });
      if(!avail.length){ rec.innerHTML = "<b>Every route is switched off</b>, so nothing can get through. Switch a router back on."; scene(null); return; }
      var packets = [], i, last = 0;
      for(i = 1; i <= 5; i++){ var rt = avail[rnd(0, avail.length - 1)], speed = 0.9 + Math.random() * 1.1, d = RM ? 0.01 : len(rt) / 110 * speed; packets.push({ n: i, path: pts(rt), t0: RM ? 0 : (i - 1) * 0.45, dur: d, rt: rt.name }); }
      packets.forEach(function(p){ p.arr = p.t0 + p.dur; last = Math.max(last, p.arr); });
      scene(packets); rec.innerHTML = "Packets are on their way…"; log.innerHTML = "Each packet has its own header (destination and packet number), so each can take whichever route is free.";
      var order = packets.slice().sort(function(a, b){ return a.arr - b.arr; }).map(function(p){ return p.n; });
      later(box, timers, function(){ var inorder = order.every(function(n, k){ return n === k + 1; });
        rec.innerHTML = "Arrived in this order: <b>" + chips(order) + "</b>" + (inorder ? " <span class='ln-muted'>(lucky, they happened to arrive in order. Send again!)</span>" : "") ;
        log.innerHTML = "Routes used: " + packets.map(function(p){ return "packet " + p.n + " via the " + p.rt; }).join(", ") + ". The receiver now checks the <b>packet numbers</b>…"; }, (last + 0.4) * 1000);
      later(box, timers, function(){ rec.innerHTML = "Arrived: " + chips(order) + " &nbsp;➜&nbsp; <b>re-ordered by packet number:</b> " + chips([1, 2, 3, 4, 5]) + " &nbsp;✅ message complete"; }, (last + 2.2) * 1000);
    }
    box.appendChild(el("p", null, "In <b>packet switching</b> a message is split into numbered packets. Each one finds its own route through the routers. <b>Click a router to switch it off</b>, then press Send."));
    box.appendChild(row(btn("▶ Send 5 packets", send, "p"))); box.appendChild(holder); box.appendChild(rec); box.appendChild(log);
    scene(null); rec.innerHTML = "Press Send."; 
  });

  /* ---------- 2.1.3 the USB interface ---------- */
  V.reg("usb", function(box){
    var timers = [], flipped = false, state = "out", view = el("div"), log = el("div", "vlog");
    var h = '<rect class="bx" x="16" y="40" width="150" height="110" rx="10"/><rect class="ac" x="28" y="52" width="126" height="70" rx="5"/><text class="mid b sm" x="91" y="92">Computer</text><rect class="bx" x="6" y="152" width="170" height="14" rx="6"/>' +
      '<rect class="bx" x="166" y="86" width="18" height="30" rx="3"/><rect x="166" y="108" width="18" height="6" fill="var(--ink)"/>' +
      '<line class="wr" x1="250" y1="101" x2="470" y2="101" style="stroke-width:5"/><line class="wr hid" id="ub-power" x1="250" y1="112" x2="470" y2="112"/>' +
      '<g id="ub-plug" class="ubplug"><rect class="bx" x="186" y="90" width="64" height="22" rx="3" style="fill:var(--surface)"/><rect x="192" y="104" width="40" height="5" fill="var(--ink)" id="ub-pins"/></g>' +
      '<g id="ub-dots"></g>' +
      '<rect class="bx" x="470" y="40" width="96" height="160" rx="16"/><rect class="ac" x="480" y="56" width="76" height="110" rx="5"/><text class="mid b sm" x="518" y="108">Phone</text>' +
      '<rect x="478" y="176" width="80" height="16" rx="4" fill="none" stroke="var(--ink)" stroke-width="1.5"/><rect id="ub-bat" x="480" y="178" width="12" height="12" rx="2" fill="var(--correct)"/>' +
      '<text class="mu sm" x="16" y="196">The plug is a different shape on top and bottom, so it only fits one way.</text><text class="mid b" id="ub-msg" x="318" y="64" style="font-size:13px"></text>' +
      '<rect class="bx" x="250" y="128" width="190" height="10" rx="5"/><rect id="ub-prog" x="251" y="129" width="0" height="8" rx="4" fill="var(--accent)"/><text class="mid mu sm" x="345" y="154" id="ub-ptxt"></text>';
    var s = svg(580, 206, h), $ = function(i){ return s.querySelector("#" + i); }, plug = $("ub-plug");
    function place(x){ plug.style.transform = "translateX(" + x + "px) scaleY(" + (flipped ? -1 : 1) + ")"; plug.style.transformOrigin = "218px 101px"; }
    function msg(t, cls){ $("ub-msg").textContent = t; }
    function reset(){ clear(timers); state = "out"; place(-0); plug.style.transform = "translateX(70px) scaleY(" + (flipped ? -1 : 1) + ")"; plug.style.transformOrigin = "218px 101px"; plug.classList.remove("shake"); $("ub-dots").innerHTML = ""; $("ub-prog").setAttribute("width", 0); $("ub-ptxt").textContent = ""; $("ub-power").classList.add("hid"); $("ub-bat").setAttribute("width", 12); msg(""); log.innerHTML = "Try plugging the cable in. If it will not go in, flip it over."; }
    function plugin(){
      if(state !== "out") return; clear(timers); state = "busy";
      plug.style.transform = "translateX(0px) scaleY(" + (flipped ? -1 : 1) + ")";
      if(flipped){
        later(box, timers, function(){ plug.style.transform = "translateX(40px) scaleY(-1)"; plug.classList.add("shake"); msg("✗ Does not fit: try the other way round"); log.innerHTML = "The shaped plug <b>only fits one way</b>, which is why there are few connection errors with USB."; state = "out"; }, 650);
        return;
      }
      later(box, timers, function(){ msg("✓ Device detected"); log.innerHTML = "The computer <b>detects the device automatically</b>."; }, 700);
      later(box, timers, function(){ msg("Installing driver (first time only)…"); $("ub-prog").style.transition = RM ? "none" : "width 1.4s linear"; $("ub-prog").setAttribute("width", 188); $("ub-ptxt").textContent = "driver installing"; }, 1600);
      later(box, timers, function(){ msg("✓ Ready to use"); $("ub-ptxt").textContent = "driver installed"; $("ub-power").classList.remove("hid"); $("ub-power").style.stroke = "var(--diff-moderate)"; var d = "", i; for(i = 0; i < 7; i++) d += '<circle class="ubd" cx="250" cy="101" r="5" style="animation-delay:' + (i * .45) + 's"/>'; $("ub-dots").innerHTML = d;
        $("ub-bat").style.transition = RM ? "none" : "width 5s linear"; $("ub-bat").setAttribute("width", 76); log.innerHTML = "Data travels <b>one bit after another</b> along the wire (<b>serial</b> transmission) while a separate wire <b>charges</b> the phone."; state = "on"; }, 3200);
    }
    var rb = row(btn("↻ Flip the plug", function(){ if(state === "busy") return; flipped = !flipped; plug.classList.remove("shake"); if(state === "out") plug.style.transform = "translateX(70px) scaleY(" + (flipped ? -1 : 1) + ")"; msg(""); }), btn("🔌 Plug in", plugin, "p"), btn("⏏ Unplug", reset));
    box.appendChild(el("p", null, "A <b>USB</b> cable is a standard way to connect devices. Plug it in and see what happens, then try it upside down."));
    box.appendChild(rb); box.appendChild(s); box.appendChild(log); reset();
  });

  /* ---------- 2.2.1 why errors happen ---------- */
  V.reg("noise", function(box){
    var timers = [], mode = "changed", ch = "A", view = el("div", "nzwrap"), res = el("div", "vres"), log = el("div", "vlog");
    var track = el("div", "nztrack"); track.innerHTML = "<div class='nzend s'>Sender<br><span class='vmono nzs'></span></div><div class='nzwire'></div><div class='nzzap'>⚡<small>interference</small></div><div class='nzend r'>Receiver</div>";
    view.appendChild(track);
    var CW = 28, GAP = 4; function midX0(){ return Math.round((track.clientWidth || 560) * 0.34); }
    function code(c){ return pad(c.charCodeAt(0).toString(2), 8); }
    function decode(b){ var v = parseInt(b, 2); return v >= 32 && v < 127 ? String.fromCharCode(v) : "?"; }
    function send(){
      clear(timers); [].slice.call(track.querySelectorAll(".nzchip")).forEach(function(c){ c.remove(); }); res.innerHTML = "Sending…"; track.querySelector('.nzs').textContent = code(ch);
      var sent = code(ch), recv = sent.split(""), tr = [], i, W = track.clientWidth || 560, startX = 84, endX = Math.max(midX0() + 60, W - 70 - 8 * (CW + GAP));
      var midX = Math.round(W * 0.34);
      for(i = 0; i < 8; i++) tr.push({ b: sent[i], kind: "n", slot: i });
      if(mode === "changed"){ tr[5].kind = "c"; tr[5].b = sent[5] === "1" ? "0" : "1"; }
      if(mode === "lost"){ tr[6].kind = "l"; }
      if(mode === "gained"){ tr.splice(3, 0, { b: "1", kind: "g" }); }
      var slot = 0; tr.forEach(function(t){ if(t.kind !== "l") t.slot = slot++; });
      var received = tr.filter(function(t){ return t.kind !== "l"; }).map(function(t){ return t.b; }).join("");
      tr.forEach(function(t, k){
        var c = el("div", "nzchip " + (t.b === "1" ? "one" : "zero"), t.kind === "c" ? sent[5] : t.b); track.appendChild(c);
        var sx = startX + k * (CW + GAP) * 0 + (k % 9) * 2; c.style.left = (startX - 6) + "px"; c.style.opacity = t.kind === "g" ? 0 : 1; c.style.transitionDuration = RM ? "0s" : "1.8s";
        var dl = 150 + k * 170;
        later(box, timers, function(){ c.style.transform = "translateX(" + (midX - startX + 6) + "px)"; if(t.kind === "g"){ c.style.opacity = 1; c.classList.add("pop"); } }, dl);
        later(box, timers, function(){
          if(t.kind === "c"){ c.textContent = t.b; c.classList.remove("zero", "one"); c.classList.add(t.b === "1" ? "one" : "zero", "bad"); }
          if(t.kind === "l"){ c.classList.add("gone"); }
          else { c.style.transform = "translateX(" + (endX + t.slot * (CW + GAP) - startX + 6) + "px)"; }
        }, dl + (RM ? 40 : 1900));
      });
      later(box, timers, function(){
        var msg = received.length !== 8 ? "<span style='color:var(--incorrect)'><b>⚠ Only " + received.length + " bits arrived</b></span> (8 were sent), so the data cannot be understood." .replace("Only " + received.length, received.length > 8 ? "" + received.length : "Only " + received.length) :
          (received === sent ? "<span style='color:var(--correct)'><b>✓ No errors:</b></span> the byte arrived intact." : "<span style='color:var(--incorrect)'><b>⚠ Changed!</b></span> The receiver reads the letter <b>“" + esc(decode(received)) + "”</b> instead of “" + esc(ch) + "”, and nobody is warned.");
        if(received.length > 8) msg = "<span style='color:var(--incorrect)'><b>⚠ " + received.length + " bits arrived</b></span> (8 were sent): an extra bit has been <b>gained</b>.";
        res.innerHTML = "Sent <b class='vmono'>" + sent + "</b> (" + esc(ch) + ") → received <b class='vmono'>" + received + "</b><br>" + msg; }, 150 + tr.length * 170 + (RM ? 160 : 4200));
      log.innerHTML = { clean: "With no interference the byte arrives exactly as sent.", changed: "Interference <b>changes</b> a bit: a 0 becomes a 1 (or the other way round).", lost: "Interference makes a bit <b>disappear</b>: data is <b>lost</b>.", gained: "Interference adds an <b>extra</b> bit: data is <b>gained</b>." }[mode];
    }
    var modes = [["clean", "No interference"], ["changed", "Bit changed"], ["lost", "Bit lost"], ["gained", "Bit gained"]], rb = row(), btns = {};
    modes.forEach(function(m){ var b = btn(m[1], function(){ mode = m[0]; Object.keys(btns).forEach(function(k){ btns[k].classList.toggle("on", k === mode); }); }, mode === m[0] ? "on" : ""); btns[m[0]] = b; rb.appendChild(b); });
    var ci = charInput("A", function(c){ ch = c; }); var lab = el("label", null, "Letter: "); lab.appendChild(ci.inp);
    box.appendChild(el("p", null, "Choose what interference does to the byte, then press Send. Watch the receiver's answer."));
    box.appendChild(rb); box.appendChild(row(lab, btn("▶ Send the byte", function(){ ci.go(); send(); }, "p"))); box.appendChild(view); box.appendChild(res); box.appendChild(log);
    res.innerHTML = "Press Send."; log.innerHTML = "Interference (for example electromagnetic interference) can make data <b>lost, gained or changed</b>.";
  });

  /* ---------- 2.3.1 why data is encrypted ---------- */
  V.reg("encrypt", function(box){
    var timers = [], enc = true, msgs = ["PIN 4821", "Password: cat123", "Card 5412 7788"], mi = 0, SYM = "#@%&*!?xQkZ9$~^+=<>";
    var wrap = el("div", "enwrap"), res = el("div", "vres"), log = el("div", "vlog");
    wrap.innerHTML = "<div class='enbox s'><div class='enh'>Sender</div><div class='entx' id='en-s'>—</div></div><div class='entrack'><div class='enhack' id='en-h'>😈 Hacker<div class='entx sm' id='en-ht'></div></div><div class='enline'></div><div class='enpkt' id='en-p'></div></div><div class='enbox r'><div class='enh'>Receiver</div><div class='entx' id='en-r'>—</div></div>";
    var $ = function(i){ return wrap.querySelector("#" + i); };
    function cipher(t){ return t.split("").map(function(c, i){ return c === " " ? " " : SYM[(c.charCodeAt(0) * 7 + i * 3) % SYM.length]; }).join(""); }
    function scramble(node, from, to, ms, done){
      var n = Math.max(1, Math.round(ms / 70)), k = 0, t = setInterval(function(){ if(!node.isConnected){ clearInterval(t); return; } k++;
        node.textContent = to.split("").map(function(c, i){ return c === " " ? " " : (i < to.length * k / n ? c : SYM[rnd(0, SYM.length - 1)]); }).join("");
        if(k >= n){ clearInterval(t); node.textContent = to; if(done) done(); } }, 70); timers.push(t);
    }
    function send(){
      clear(timers); var m = msgs[mi], c = cipher(m), p = $("en-p"), ht = $("en-h");
      p.style.transition = "none"; p.style.transform = "translateX(0)"; p.classList.remove("hot"); ht.classList.remove("hot"); $("en-ht").textContent = ""; $("en-r").textContent = "—"; $("en-s").textContent = m; p.textContent = m; res.innerHTML = "Message ready: <b class='vmono'>" + esc(m) + "</b>";
      var tr = wrap.querySelector(".entrack").clientWidth - 130, T = RM ? 0.01 : 1.5;
      function travel(frac, cb, ms){ p.style.transition = "transform " + (RM ? 0.01 : ms / 1000) + "s linear"; p.style.transform = "translateX(" + (tr * frac) + "px)"; later(box, timers, cb, ms + 100); }
      function toHacker(){ log.innerHTML = "The packet passes a hacker who copies it…"; travel(.5, function(){
        ht.classList.add("hot"); $("en-ht").textContent = p.textContent;
        res.innerHTML = enc ? "😈 The hacker copied <b class='vmono'>" + esc(c) + "</b>. <b>It is meaningless without the key.</b>" : "😈 The hacker copied <b class='vmono'>" + esc(m) + "</b>. <b style='color:var(--incorrect)'>Plain text: they can read everything!</b>";
        later(box, timers, toReceiver, 1500); }, 1400); }
      function toReceiver(){ log.innerHTML = enc ? "The hacker still <b>has</b> the data: encryption does not stop theft, it makes the stolen data useless." : "Nothing protects the data."; travel(1, function(){
        if(enc){ log.innerHTML = "🔑 The receiver uses the <b>key</b> to decrypt the cipher text back to plain text."; scramble($("en-r"), c, m, 900, function(){ res.innerHTML += "<br>✅ Receiver reads <b class='vmono'>" + esc(m) + "</b>."; }); }
        else { $("en-r").textContent = m; res.innerHTML += "<br>Receiver reads <b class='vmono'>" + esc(m) + "</b>, and so did the hacker."; } }, 1400); }
      later(box, timers, function(){
        if(enc){ log.innerHTML = "🔒 Encrypting the <b>plain text</b> with a key to make <b>cipher text</b>…"; p.classList.add("hot"); scramble(p, m, c, 900, function(){ $("en-s").textContent = m; later(box, timers, toHacker, 300); }); }
        else toHacker(); }, 400);
    }
    var tg = btn("Encryption: ON", function(){ enc = !enc; tg.textContent = "Encryption: " + (enc ? "ON" : "OFF"); tg.classList.toggle("on", enc); clear(timers); res.innerHTML = "Press Send."; }, "on");
    var rb = row(tg, btn("Next message", function(){ mi = (mi + 1) % msgs.length; $("en-s").textContent = msgs[mi]; $("en-p").textContent = msgs[mi]; res.innerHTML = "Message ready: <b class='vmono'>" + esc(msgs[mi]) + "</b>"; }), btn("▶ Send it", send, "p"));
    box.appendChild(el("p", null, "Switch encryption on or off, send a message, and watch what the hacker in the middle gets."));
    box.appendChild(rb); box.appendChild(wrap); box.appendChild(res); box.appendChild(log);
    $("en-s").textContent = msgs[0]; $("en-p").textContent = msgs[0]; res.innerHTML = "Press Send.";
  });
})(typeof window !== "undefined" ? window : this);
