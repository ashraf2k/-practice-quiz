/* A Level iLearn visuals, part 1: data representation, files, networks, hardware and low-level programming. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  /* ---------- 13.3 floating point: set the bits, see the number ---------- */
  function fpBits(m, e){
    var mant = m[0] ? -1 : 0, i, ex = 0;
    for(i = 1; i < m.length; i++) if(m[i]) mant += Math.pow(2, -i);
    for(i = 0; i < e.length; i++) if(e[i]) ex += (i === 0 ? -1 : 1) * Math.pow(2, e.length - 1 - i);
    return { mant: mant, exp: ex, val: mant * Math.pow(2, ex) };
  }
  function shifted(m, ex){
    var s = m.join(""), p = 1 + ex, pad = m[0] ? "1" : "0", k;
    if(p <= 0){ for(k = 0; k < -p; k++) s = pad + s; p = 0; }
    else if(p > s.length){ for(k = s.length; k < p; k++) s += "0"; }
    return p >= s.length ? s : s.slice(0, p) + "." + s.slice(p);
  }
  V.reg("fp", function(box, o){
    var mL = o.m || 12, eL = o.e || 4, m = [], e = [], i;
    for(i = 0; i < mL; i++) m.push(0); for(i = 0; i < eL; i++) e.push(0);
    function load(ms, es){ for(var k = 0; k < mL; k++) m[k] = +ms[k] || 0; for(k = 0; k < eL; k++) e[k] = +es[k] || 0; draw(); }
    var bitsM = el("div", "vbits"), bitsE = el("div", "vbits"), out = el("div", "vres");
    function mk(arr, k, host, lab, sep){
      var col = el("div"); var b = el("button", "vbit" + (sep ? " sep" : ""), "0"); b.type = "button";
      b.addEventListener("click", function(){ arr[k] = arr[k] ? 0 : 1; draw(); });
      col.appendChild(b); col.appendChild(el("div", "vbitl", lab)); host.appendChild(col); return b;
    }
    var mb = [], eb = [];
    for(i = 0; i < mL; i++) mb.push(mk(m, i, bitsM, i === 0 ? "−1" : (i === 1 ? "½" : "1/" + Math.pow(2, i)), i === 1));
    for(i = 0; i < eL; i++) eb.push(mk(e, i, bitsE, i === 0 ? "−" + Math.pow(2, eL - 1) : String(Math.pow(2, eL - 1 - i)), false));
    function draw(){
      mb.forEach(function(b, k){ b.textContent = m[k]; b.className = "vbit" + (m[k] ? " one" : "") + (k === 1 ? " sep" : ""); });
      eb.forEach(function(b, k){ b.textContent = e[k]; b.className = "vbit" + (e[k] ? " one" : ""); });
      var r = fpBits(m, e), norm = m[0] !== m[1];
      var mantStr = m[0] + "." + m.slice(1).join("");
      out.innerHTML = "<div>Mantissa <span class='vmono'>" + mantStr + "</span> (two's complement, binary point after the sign bit) = <b>" + r.mant + "</b></div>" +
        "<div>Exponent <span class='vmono'>" + e.join("") + "</span> (two's complement) = <b>" + r.exp + "</b>, so the binary point moves <b>" + Math.abs(r.exp) + "</b> place" + (Math.abs(r.exp) === 1 ? "" : "s") + (r.exp >= 0 ? " to the right" : " to the left") + "</div>" +
        "<div>Number after moving the point: <span class='vmono'>" + shifted(m, r.exp) + "</span></div>" +
        "<div>Value = " + r.mant + " × 2<sup>" + r.exp + "</sup> = <b class='big'>" + r.val + "</b></div>" +
        "<div>" + (norm ? "<span class='vok'>✓ Normalised</span>: the first two mantissa bits are different (" + m[0] + m[1] + ")." : "<span class='vbad'>✗ Not normalised</span>: the first two mantissa bits are the same (" + m[0] + m[1] + "), so there is wasted precision; shift the mantissa left and lower the exponent.") + "</div>";
    }
    var pre = [];
    if(mL === 12 && eL === 4){
      pre = [["−37.8125 (Paper 32 Q3)", "101101000110", "0110"], ["6.5", "011010000000", "0011"], ["−18.5625 (Paper 33 Q5)", "101101011100", "0101"], ["Largest number", "011111111111", "0111"]];
    } else if(mL === 10 && eL === 6){
      pre = [["−94.25 (Paper 31 Q3)", "1010000111", "000111"], ["−10.8125 (Paper 31 Q3)", "1010100110", "000100"]];
    }
    var pr = row(); pre.forEach(function(p){ pr.appendChild(btn(p[0], function(){ load(p[1], p[2]); })); });
    pr.appendChild(btn("Clear", function(){ load("", ""); }));
    box.appendChild(el("p", null, "Click the bits to switch them between 0 and 1. The labels under the bits are their place values."));
    box.appendChild(el("div", null, "<b>Mantissa</b> (" + mL + " bits)")); box.appendChild(bitsM);
    box.appendChild(el("div", null, "<b>Exponent</b> (" + eL + " bits)")); box.appendChild(bitsE);
    box.appendChild(pr); box.appendChild(out); draw();
  });

  V.reg("fprange", function(box){
    var total = 16, sl = el("input"); sl.type = "range"; sl.min = 2; sl.max = 8; sl.value = 4; sl.setAttribute("aria-label", "Number of exponent bits");
    var out = el("div", "vres"), bar = el("div");
    function draw(){
      var eb = +sl.value, mb = total - eb, maxE = Math.pow(2, eb - 1) - 1, minE = -Math.pow(2, eb - 1);
      var maxV = (1 - Math.pow(2, -(mb - 1))) * Math.pow(2, maxE), minPos = 0.5 * Math.pow(2, minE), res = Math.pow(2, -(mb - 1));
      function f(x){ return x >= 1e6 || (x < 1e-4 && x > 0) ? x.toExponential(3) : String(+x.toPrecision(7)); }
      bar.innerHTML = '<div style="display:flex;height:34px;border-radius:8px;overflow:hidden;font-weight:700;color:#fff;font-size:13px"><div style="flex:' + mb + ';background:var(--diff-hard);display:flex;align-items:center;justify-content:center">mantissa: ' + mb + ' bits</div><div style="flex:' + eb + ';background:var(--diff-moderate);display:flex;align-items:center;justify-content:center">exponent: ' + eb + '</div></div>';
      out.innerHTML = "<div>Largest positive number: <b>" + f(maxV) + "</b> (mantissa 0111…1, exponent " + maxE + ")</div>" +
        "<div>Smallest positive normalised number: <b>" + f(minPos) + "</b> (mantissa 0100…0, exponent " + minE + ")</div>" +
        "<div>Most negative number: <b>" + f(-Math.pow(2, maxE)) + "</b></div>" +
        "<div>Smallest step in the mantissa: 2<sup>−" + (mb - 1) + "</sup> = <b>" + f(res) + "</b> (this sets the <b>accuracy</b>)</div>" +
        "<div class='vlog' style='margin-bottom:0'>" + (eb < 4 ? "Few exponent bits: a small <b>range</b> but very accurate numbers." : eb > 5 ? "Many exponent bits: a huge <b>range</b> but fewer mantissa bits, so the numbers are less <b>accurate</b>." : "A balance between range and accuracy.") + "</div>";
    }
    sl.addEventListener("input", draw);
    box.appendChild(el("p", null, "The format has a fixed total of <b>16 bits</b>. Drag to move bits between the exponent and the mantissa."));
    box.appendChild(row(el("label", null, "Exponent bits: "), sl)); box.appendChild(bar); box.appendChild(out); draw();
  });

  /* ---------- 13.2 hashing and file organisation ---------- */
  V.reg("hash", function(box){
    var N = 10, OV = 5, main = [], over = [], i;
    for(i = 0; i < N; i++) main.push(null); for(i = 0; i < OV; i++) over.push(null);
    var mode = "open", inp = el("input", "vin mono"); inp.type = "number"; inp.value = 13; inp.style.width = "90px"; inp.setAttribute("aria-label", "Key");
    var log = el("div", "vlog", "Hash function: <b>address = key MOD 10</b>. Insert some keys; try 13 then 23."), view = el("div");
    var bO = btn("Open hashing (next free location)", function(){ mode = "open"; sync(); }), bC = btn("Closed hashing (overflow area)", function(){ mode = "closed"; sync(); });
    function sync(){ bO.className = "vb" + (mode === "open" ? " on" : ""); bC.className = "vb" + (mode === "closed" ? " on" : ""); }
    function draw(hiM, hiO, kind){
      var h = '<div class="vcells">', k;
      for(k = 0; k < N; k++) h += '<div class="vcell' + (hiM === k ? " " + kind : "") + '"><small>' + k + "</small>" + (main[k] === null ? "&nbsp;" : main[k]) + "</div>";
      h += "</div>";
      if(mode === "closed"){ h += "<div>Overflow area</div><div class='vcells'>"; for(k = 0; k < OV; k++) h += '<div class="vcell' + (hiO === k ? " " + kind : "") + '"><small>o' + k + "</small>" + (over[k] === null ? "&nbsp;" : over[k]) + "</div>"; h += "</div>"; }
      view.innerHTML = h;
    }
    function insert(){
      var key = Math.floor(+inp.value); if(!(key >= 0)) return; var a = key % N, t = "Key " + key + " MOD 10 = <b>" + a + "</b>. ";
      if(main.indexOf(key) >= 0 || over.indexOf(key) >= 0){ log.innerHTML = t + "That key is already stored."; return; }
      if(main[a] === null){ main[a] = key; log.innerHTML = t + "Location " + a + " is free: stored there."; draw(a, -1, "ok"); return; }
      t += "Location " + a + " already holds " + main[a] + ": a <b>collision</b>. ";
      if(mode === "open"){
        for(var s = 1; s < N; s++){ var q = (a + s) % N; if(main[q] === null){ main[q] = key; log.innerHTML = t + "Open hashing looks at the next locations and stores the key at <b>" + q + "</b>."; draw(q, -1, "wa"); return; } }
        log.innerHTML = t + "The file is full."; draw(a, -1, "no");
      } else {
        for(var z = 0; z < OV; z++) if(over[z] === null){ over[z] = key; log.innerHTML = t + "Closed hashing stores the key in the next free place of the <b>overflow area</b> (o" + z + ")."; draw(-1, z, "wa"); return; }
        log.innerHTML = t + "The overflow area is full."; draw(a, -1, "no");
      }
    }
    function find(){
      var key = Math.floor(+inp.value), a = key % N, t = "Find " + key + ": address " + key + " MOD 10 = <b>" + a + "</b>. ";
      if(main[a] === key){ log.innerHTML = t + "The key at " + a + " matches: found in <b>1 read</b>."; draw(a, -1, "ok"); return; }
      t += (main[a] === null ? "Location " + a + " is empty, so the record is not in the file." : "Location " + a + " holds " + main[a] + " (no match). ");
      if(main[a] === null){ log.innerHTML = t; draw(a, -1, "no"); return; }
      if(mode === "open"){
        for(var s = 1; s < N; s++){ var q = (a + s) % N; if(main[q] === key){ log.innerHTML = t + "Moving on to the following locations finds it at <b>" + q + "</b> after " + (s + 1) + " reads."; draw(q, -1, "ok"); return; } if(main[q] === null) break; }
        log.innerHTML = t + "The following locations do not hold it: not found."; draw(a, -1, "no");
      } else {
        var z = over.indexOf(key); if(z >= 0){ log.innerHTML = t + "Searching the overflow area finds it at o" + z + "."; draw(-1, z, "ok"); return; }
        log.innerHTML = t + "Not in the overflow area either: not found."; draw(a, -1, "no");
      }
    }
    box.appendChild(row(bO, bC)); sync();
    box.appendChild(row(el("label", null, "Key: "), inp, btn("Insert", insert, "p"), btn("Find", find), btn("Clear", function(){ for(var k = 0; k < N; k++) main[k] = null; for(k = 0; k < OV; k++) over[k] = null; log.innerHTML = "File cleared."; draw(-1, -1); })));
    box.appendChild(view); box.appendChild(log); draw(-1, -1);
  });

  V.reg("fileorg", function(box){
    var serial = [205, 101, 340, 152, 487, 276, 393, 128], seq = serial.slice().sort(function(a, b){ return a - b; });
    var rnd = []; for(var i = 0; i < 10; i++) rnd.push(null); serial.forEach(function(k){ rnd[k % 10] = k; });
    var inp = el("input", "vin mono"); inp.type = "number"; inp.value = 276; inp.style.width = "90px"; inp.setAttribute("aria-label", "Key to find");
    var view = el("div");
    function strip(arr, cls){ return '<div class="vcells">' + arr.map(function(k, ix){ return '<div class="vcell ' + (cls[ix] || "") + '">' + (k === null ? "&nbsp;" : k) + "</div>"; }).join("") + "</div>"; }
    function go(){
      var key = Math.floor(+inp.value), c1 = [], r1 = 0, f1 = false, k;
      for(k = 0; k < serial.length; k++){ r1++; c1[k] = "hi"; if(serial[k] === key){ c1[k] = "ok"; f1 = true; break; } }
      var c2 = [], r2 = 0, f2 = false;
      for(k = 0; k < seq.length; k++){ r2++; c2[k] = "hi"; if(seq[k] === key){ c2[k] = "ok"; f2 = true; break; } if(seq[k] > key){ c2[k] = "no"; break; } }
      var a = key % 10, c3 = []; c3[a] = rnd[a] === key ? "ok" : "no"; var f3 = rnd[a] === key;
      view.innerHTML = "<p><b>Serial file</b> (records in the order they were added; sequential access, must read until found or the end)</p>" + strip(serial, c1) + "<div>" + (f1 ? "<span class='vok'>Found</span>" : "<span class='vbad'>Not found</span>") + " after <b>" + r1 + "</b> record" + (r1 === 1 ? "" : "s") + " read.</div>" +
        "<p><b>Sequential file</b> (records in key order; can stop once a bigger key is passed)</p>" + strip(seq, c2) + "<div>" + (f2 ? "<span class='vok'>Found</span>" : "<span class='vbad'>Not found</span>") + " after <b>" + r2 + "</b> record" + (r2 === 1 ? "" : "s") + " read.</div>" +
        "<p><b>Random file</b> (hash: address = key MOD 10; direct access to the location)</p>" + strip(rnd, c3) + "<div>Address " + key + " MOD 10 = " + a + ": " + (f3 ? "<span class='vok'>Found</span>" : "<span class='vbad'>Not found</span>") + " after <b>1</b> read.</div>";
    }
    box.appendChild(el("p", null, "Enter a key and compare how many records each file organisation has to read. Try 276, 101, 487, 300 (not in the file) and 10."));
    box.appendChild(row(el("label", null, "Key to find: "), inp, btn("Find", go, "p"))); box.appendChild(view); go();
  });

  /* ---------- 14.1 the TCP/IP stack: a message goes down, across and up ---------- */
  V.reg("tcp", function(box){
    var L = ["Application", "Transport", "Internet", "Link"];
    var S = [
      { s: 0, r: -1, hdr: [], t: "The <b>Application layer</b>: a web browser has a message (the data) to send. Programs and protocols such as HTTP, FTP and SMTP work here." },
      { s: 1, r: -1, hdr: ["TCP"], t: "The <b>Transport layer</b> splits the data into packets, adds the <b>port numbers</b> and a <b>sequence number</b> so the receiver can put them back in order and check none are missing." },
      { s: 2, r: -1, hdr: ["TCP", "IP"], t: "The <b>Internet layer</b> adds the <b>source and destination IP addresses</b> so that routers can find the intended network and host." },
      { s: 3, r: -1, hdr: ["TCP", "IP", "FRAME"], t: "The <b>Link layer</b> wraps the packet in a frame with the physical (MAC) addresses of the next node and sends it over the network as signals." },
      { s: -1, r: 3, hdr: ["TCP", "IP", "FRAME"], wire: true, t: "The frame travels across the physical network, passing through routers that read only the IP header." },
      { s: -1, r: 2, hdr: ["TCP", "IP"], t: "<b>Link layer</b> at the receiver: the frame is checked and its frame header and trailer are removed." },
      { s: -1, r: 1, hdr: ["TCP"], t: "<b>Internet layer</b>: the IP header is checked (is this packet for this host?) and removed." },
      { s: -1, r: 0, hdr: [], done: true, t: "<b>Transport layer</b> puts the packets in sequence, requests any that are missing, removes the TCP header and passes the data up to the <b>Application layer</b> — the message arrives." }
    ];
    var view = el("div"), log = el("div", "vlog");
    function render(i){
      var s = S[i], h = '<div class="vtwo" style="align-items:stretch"><div><b>Sender</b>';
      L.forEach(function(n, k){ h += '<div class="vcell' + (s.s === k ? " hi" : "") + '" style="margin:3px 0;text-align:left;font-family:inherit">' + (4 - k) + ". " + n + "</div>"; });
      h += '</div><div><b>Receiver</b>';
      L.forEach(function(n, k){ h += '<div class="vcell' + (s.r === k ? " hi" : "") + '" style="margin:3px 0;text-align:left;font-family:inherit">' + (4 - k) + ". " + n + "</div>"; });
      h += '</div></div><div style="text-align:center;margin-top:10px"><b>The packet at this step</b><div style="display:flex;justify-content:center;flex-wrap:wrap;margin:8px 0;font:700 12px ui-monospace,monospace">';
      if(s.hdr.indexOf("FRAME") >= 0) h += '<span style="background:var(--diff-hard-bg);border:1.5px solid var(--diff-hard);padding:8px 6px">FRAME hdr</span>';
      if(s.hdr.indexOf("IP") >= 0) h += '<span style="background:var(--diff-moderate-bg);border:1.5px solid var(--diff-moderate);padding:8px 6px">IP hdr</span>';
      if(s.hdr.indexOf("TCP") >= 0) h += '<span style="background:var(--correct-bg);border:1.5px solid var(--correct);padding:8px 6px">TCP hdr</span>';
      h += '<span style="background:var(--accent-tint);border:1.5px solid var(--accent);padding:8px 14px">DATA</span>';
      if(s.hdr.indexOf("FRAME") >= 0) h += '<span style="background:var(--diff-hard-bg);border:1.5px solid var(--diff-hard);padding:8px 6px">trailer</span>';
      h += "</div>" + (s.wire ? "<div>➜ ➜ ➜ across the physical network ➜ ➜ ➜</div>" : "") + "</div>";
      view.innerHTML = h; log.innerHTML = s.t;
    }
    var pl = V.player(box, { count: function(){ return S.length; }, show: render, reset: function(){ render(0); log.innerHTML = "Press <b>Step</b> or <b>Play</b> to send a message down the sender's stack, across the network and up the receiver's stack."; }, ms: 1700 });
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); render(0); log.innerHTML = "Press <b>Step</b> or <b>Play</b> to send a message down the sender's stack, across the network and up the receiver's stack.";
  });

  /* ---------- 14.2 circuit switching v packet switching ---------- */
  V.reg("switching", function(box){
    var P = { A: [45, 95], R1: [170, 95], R2: [300, 45], R3: [300, 150], R4: [430, 95], B: [550, 95] };
    var mode = "circuit", cols = ["#146C6A", "#B45309", "#7C3AED", "#C4423B"];
    var routes = { circuit: [["A","R1","R2","R4","B"], ["A","R1","R2","R4","B"], ["A","R1","R2","R4","B"], ["A","R1","R2","R4","B"]], packet: [["A","R1","R2","R4","B"], ["A","R1","R3","R4","B"], ["A","R1","R3","R3","R3","R4","B"], ["A","R1","R2","R4","B"]] };
    var host = el("div"), log = el("div", "vlog"), tickMax;
    function positionAt(route, release, t){ var k = t - release; if(k < 0) return null; if(k >= route.length) return "gone"; return route[k]; }
    function scene(t){
      var rt = routes[mode], h = "", names = Object.keys(P);
      var edges = [["A","R1"],["R1","R2"],["R1","R3"],["R2","R4"],["R3","R4"],["R4","B"],["R2","R3"]];
      edges.forEach(function(e){
        var onCircuit = mode === "circuit" && ((e[0] === "A" && e[1] === "R1") || (e[0] === "R1" && e[1] === "R2") || (e[0] === "R2" && e[1] === "R4") || (e[0] === "R4" && e[1] === "B"));
        h += '<line class="wr' + (onCircuit ? " hi" : "") + '" x1="' + P[e[0]][0] + '" y1="' + P[e[0]][1] + '" x2="' + P[e[1]][0] + '" y2="' + P[e[1]][1] + '"/>';
      });
      names.forEach(function(n){ var host_ = n === "A" || n === "B"; var hw = host_ ? 34 : 22; h += '<rect class="' + (host_ ? "ac" : "bx") + '" x="' + (P[n][0] - hw) + '" y="' + (P[n][1] - 16) + '" width="' + (hw * 2) + '" height="32" rx="8"/><text class="mid b" x="' + P[n][0] + '" y="' + (P[n][1] + 4) + '">' + (n === "A" ? "Sender" : n === "B" ? "Receiver" : n) + "</text>"; });
      var counts = {}, arrived = [];
      rt.forEach(function(r, i){
        var pos = positionAt(r, i, t); if(pos === null) return;
        if(pos === "gone" || (pos === "B")){ arrived.push({ i: i, at: i + r.length - 1 }); }
        if(pos === "gone") return;
        var c = counts[pos] = (counts[pos] || 0) + 1, tx_ = pos === "R2" ? P[pos][0] + 36 + (c - 1) * 21 : P[pos][0] - 14 + (c - 1) * 21, ty_ = pos === "R2" ? P[pos][1] : P[pos][1] + 30;
        h += '<circle cx="' + tx_ + '" cy="' + ty_ + '" r="9" fill="' + cols[i] + '"/><text class="mid w b sm" x="' + tx_ + '" y="' + (ty_ + 3.5) + '">' + (i + 1) + "</text>";
      });
      if(mode === "circuit") h += '<text x="40" y="200" class="b">Circuit set up first: one dedicated route (thick line) is reserved for the whole call.</text>';
      else h += '<text x="40" y="200" class="b">Each packet is routed separately; congestion at R3 delays packet 3.</text>';
      host.innerHTML = ""; host.appendChild(V.svg(600, 215, h));
      var arr = []; rt.forEach(function(r, i){ if(t >= i + r.length - 1) arr.push({ i: i + 1, at: i + r.length - 1 }); });
      arr.sort(function(a, b){ return a.at - b.at; });
      log.innerHTML = "Time " + t + ". Packets arrived at the receiver, in order of arrival: " + (arr.length ? "<b>" + arr.map(function(a){ return "packet " + a.i; }).join(", ") + "</b>" : "none yet") + "." +
        (arr.length === 4 ? (mode === "packet" ? " The packets arrived <b>out of order</b>; the receiver uses their sequence numbers to put them back together, so a packet can take any route." : " They arrived in order because they all used the same reserved route.") : "");
    }
    function maxT(){ var m = 0; routes[mode].forEach(function(r, i){ m = Math.max(m, i + r.length - 1); }); return m + 1; }
    var pl, bC, bP;
    function sync(){ bC.className = "vb" + (mode === "circuit" ? " on" : ""); bP.className = "vb" + (mode === "packet" ? " on" : ""); }
    bC = btn("Circuit switching", function(){ mode = "circuit"; sync(); pl.get && pl.halt(); pl.querySelector(".vb:last-child").click(); });
    bP = btn("Packet switching", function(){ mode = "packet"; sync(); pl.halt(); pl.querySelector(".vb:last-child").click(); });
    pl = V.player(box, { count: maxT, show: scene, reset: function(){ scene(0); }, ms: 900 });
    box.appendChild(row(bC, bP)); sync(); box.appendChild(pl); box.appendChild(host); box.appendChild(log); scene(0);
  });

  /* ---------- 15.1 pipelining ---------- */
  V.reg("pipeline", function(box){
    var ST = ["IF", "ID", "OF", "IE", "WB"], sl = el("input"); sl.type = "range"; sl.min = 1; sl.max = 8; sl.value = 6; sl.setAttribute("aria-label", "Number of instructions");
    var mode = "pipe", view = el("div"), bP, bN;
    var names = "ABCDEFGH";
    function draw(){
      var n = +sl.value, cyc = mode === "pipe" ? n + 4 : 5 * n, h = '<div class="vscroll"><table class="vt"><tr><th>Stage \\ cycle</th>', c, s, i;
      for(c = 1; c <= cyc; c++) h += "<th>" + c + "</th>"; h += "</tr>";
      for(s = 0; s < 5; s++){
        h += "<tr><th>" + ST[s] + "</th>";
        for(c = 1; c <= cyc; c++){
          var cell = "";
          for(i = 0; i < n; i++){ var start = mode === "pipe" ? i + 1 : 5 * i + 1; if(c === start + s) cell = names[i]; }
          h += cell ? "<td class='hi'>" + cell + "</td>" : "<td></td>";
        }
        h += "</tr>";
      }
      view.innerHTML = h + "</table></div><div class='vres'>" + n + " instruction" + (n === 1 ? "" : "s") + ", 5 stages, one clock cycle per stage: <b>" + (mode === "pipe" ? "with pipelining " + cyc + " cycles" : "without pipelining " + cyc + " cycles") + "</b>" + (mode === "pipe" ? " (a new instruction starts every cycle, so while one is being decoded the next is being fetched)" : " (each instruction must finish before the next starts)") + ". Without pipelining it would take " + 5 * n + "; with pipelining " + (n + 4) + ".</div>";
    }
    function sync(){ bP.className = "vb" + (mode === "pipe" ? " on" : ""); bN.className = "vb" + (mode === "seq" ? " on" : ""); }
    bP = btn("With pipelining", function(){ mode = "pipe"; sync(); draw(); }); bN = btn("Without pipelining", function(){ mode = "seq"; sync(); draw(); });
    sl.addEventListener("input", draw);
    box.appendChild(row(bP, bN, el("label", null, "Instructions: "), sl)); sync(); box.appendChild(view); draw();
  });

  /* ---------- 15.1 SISD, SIMD, MISD, MIMD ---------- */
  V.reg("arch", function(box){
    var K = { SISD: { i: 1, p: 1, d: 1 }, SIMD: { i: 1, p: 4, d: 4 }, MISD: { i: 4, p: 4, d: 1 }, MIMD: { i: 4, p: 4, d: 4 } };
    var T = {
      SISD: "<b>Single instruction, single data.</b> One processor follows one instruction stream on one data stream: a traditional single-core processor.",
      SIMD: "<b>Single instruction, multiple data.</b> The same instruction is carried out on many data items at once (for example adding the same value to every pixel). Used by array/vector processors and graphics processors.",
      MISD: "<b>Multiple instruction, single data.</b> Several different instructions work on the same data. Rare: used where a result must be checked several ways, for example fault-tolerant systems.",
      MIMD: "<b>Multiple instruction, multiple data.</b> Several processors each run their own instructions on their own data: multi-core processors and massively parallel computers."
    };
    var view = el("div"), txt = el("div", "vlog"), tabs = row();
    function draw(k){
      var a = K[k], h = "", i, ys = function(n, idx){ var gap = 200 / n; return 18 + gap * idx + gap / 2 - 14; };
      h += '<text class="b" x="30" y="14">Instructions</text><text class="b mid" x="300" y="14">Processing units</text><text class="b end" x="570" y="14">Data</text>';
      for(i = 0; i < a.i; i++) h += '<rect class="wa" x="30" y="' + ys(a.i, i) + '" width="80" height="28" rx="6"/><text class="mid sm b" x="70" y="' + (ys(a.i, i) + 18) + '">Instr ' + (i + 1) + "</text>";
      for(i = 0; i < a.p; i++) h += '<rect class="ac" x="255" y="' + ys(a.p, i) + '" width="90" height="28" rx="6"/><text class="mid sm b" x="300" y="' + (ys(a.p, i) + 18) + '">Processor ' + (i + 1) + "</text>";
      for(i = 0; i < a.d; i++) h += '<rect class="ok" x="490" y="' + ys(a.d, i) + '" width="80" height="28" rx="6"/><text class="mid sm b" x="530" y="' + (ys(a.d, i) + 18) + '">Data ' + (i + 1) + "</text>";
      function line(x1, y1, x2, y2){ h += '<line class="wr" x1="' + x1 + '" y1="' + (y1 + 14) + '" x2="' + x2 + '" y2="' + (y2 + 14) + '"/>'; }
      for(i = 0; i < a.p; i++){
        line(110, ys(a.i, a.i === 1 ? 0 : i), 255, ys(a.p, i));
        line(345, ys(a.p, i), 490, ys(a.d, a.d === 1 ? 0 : i));
      }
      view.innerHTML = ""; view.appendChild(V.svg(600, 230, h)); txt.innerHTML = T[k];
      Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.textContent === k ? " on" : ""); });
    }
    Object.keys(K).forEach(function(k){ tabs.appendChild(btn(k, function(){ draw(k); })); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(txt); draw("SIMD");
  });

  /* ---------- 15.1 virtual machines ---------- */
  V.reg("vm", function(box){
    var L = [
      ["Physical hardware", "The real processor, memory and storage. The <b>host machine</b> supplies all the physical resources."],
      ["Host operating system", "Controls the physical hardware of the host machine and shares it out."],
      ["Hypervisor", "Software that sits between the host and the guests: it <b>creates and runs the virtual machines</b> and allocates host resources (processor time, memory) to each."],
      ["Virtual machines", "Each virtual machine is a stand-alone environment that behaves like a complete computer with its own virtual hardware. Several can run on one host."],
      ["Guest OS + applications", "Each VM runs its own <b>guest operating system</b> (which can differ from the host's) and its own applications. If one VM crashes, the host and the other VMs are not affected."]
    ];
    var view = el("div"), txt = el("div", "vlog"), sel = 3;
    function draw(){
      var h = "", ys = [250, 205, 160, 100, 40], col = ["bx", "bx", "vi", "ac", "ok"];
      h += '<rect class="' + col[0] + (sel === 0 ? " " : "") + '" x="20" y="250" width="560" height="36" rx="8"/><text class="mid b" x="300" y="273">Physical hardware (processor, RAM, disk)</text>';
      h += '<rect class="bx" x="20" y="205" width="560" height="36" rx="8"/><text class="mid b" x="300" y="228">Host operating system</text>';
      h += '<rect class="vi" x="20" y="160" width="560" height="36" rx="8"/><text class="mid b" x="300" y="183">Hypervisor</text>';
      [0, 1, 2].forEach(function(i){ var x = 20 + i * 190; h += '<rect class="ac" x="' + x + '" y="40" width="180" height="110" rx="10"/><text class="mid b" x="' + (x + 90) + '" y="58">Virtual machine ' + (i + 1) + '</text><rect class="ok" x="' + (x + 12) + '" y="68" width="156" height="30" rx="6"/><text class="mid sm b" x="' + (x + 90) + '" y="87">Guest OS ' + (["(Windows)", "(Linux)", "(macOS)"][i]) + '</text><rect class="wa" x="' + (x + 12) + '" y="106" width="156" height="30" rx="6"/><text class="mid sm b" x="' + (x + 90) + '" y="125">Applications</text>'; });
      view.innerHTML = ""; view.appendChild(V.svg(600, 300, h));
      txt.innerHTML = L[sel][1];
      Array.prototype.forEach.call(tabs.children, function(b, k){ b.className = "vb" + (k === sel ? " on" : ""); });
    }
    var tabs = row(); L.forEach(function(l, k){ tabs.appendChild(btn(l[0], function(){ sel = k; draw(); })); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(txt); draw();
  });

  /* ---------- 20.1 addressing modes ---------- */
  V.reg("addr", function(box){
    var M = { 230: 231, 231: 5, 232: 7, 233: 9, 234: 11 }, ix = 2;
    var modes = [
      ["Immediate", "LDM #230", function(){ return { acc: 230, path: [], t: "The operand is the <b>number itself</b>: 230 is loaded straight into ACC." }; }],
      ["Direct", "LDD 230", function(){ return { acc: M[230], path: [230], t: "The operand is an <b>address</b>: the contents of location 230 (231) are loaded." }; }],
      ["Indirect", "LDI 230", function(){ return { acc: M[M[230]], path: [230, 231], t: "The address 230 holds <b>another address</b>: location 230 contains 231, and the contents of location 231 (5) are loaded." }; }],
      ["Indexed", "LDX 230", function(){ return { acc: M[230 + ix], path: [230 + ix], t: "The address is the operand <b>plus the contents of the index register IX</b>: 230 + " + ix + " = 232, so the contents of location 232 (7) are loaded." }; }]
    ];
    var view = el("div"), cur = 1, tabs = row();
    function draw(){
      var m = modes[cur], r = m[2](), h = "<div class='vres'>Instruction: <b class='vmono'>" + m[1] + "</b> &nbsp; IX = " + ix + "<br>" + r.t + "<br>ACC after the instruction = <b class='big'>" + r.acc + "</b></div><div class='vcells'>";
      Object.keys(M).forEach(function(a){ h += '<div class="vcell' + (r.path.indexOf(+a) >= 0 ? " hi" : "") + '"><small>' + a + "</small>" + M[a] + "</div>"; });
      view.innerHTML = h + "</div>";
      Array.prototype.forEach.call(tabs.children, function(b, k){ b.className = "vb" + (k === cur ? " on" : ""); });
    }
    modes.forEach(function(m, k){ tabs.appendChild(btn(m[0], function(){ cur = k; draw(); })); });
    box.appendChild(el("p", null, "Memory contents are shown below (address above, contents inside). Choose an addressing mode to see what is loaded into the accumulator."));
    box.appendChild(tabs); box.appendChild(view); draw();
  });

  /* ---------- 20.1 assembly stepper ---------- */
  function simAsm(prog, mem0){
    var by = {}, m = {}, k; prog.forEach(function(p){ by[p[0]] = p; }); for(k in mem0) m[k] = mem0[k];
    var rd = function(a){ return m[a] === undefined ? 0 : m[a]; }, imm = function(o){ return typeof o === "string" && o.charAt(0) === "#" ? parseInt(o.slice(1), 10) : null; };
    var acc = 0, ix = 0, flag = null, pc = prog[0][0], steps = [], g = 0;
    while(by[pc] && g++ < 200){
      var p = by[pc], op = p[1], o = p[2], nx = pc + 1, im = imm(o), changed = null;
      if(op === "LDM") acc = im; else if(op === "LDD") acc = rd(o); else if(op === "LDI") acc = rd(rd(o)); else if(op === "LDX") acc = rd(o + ix); else if(op === "LDR") ix = im;
      else if(op === "STO"){ m[o] = acc; changed = o; }
      else if(op === "ADD") acc += im !== null ? im : rd(o); else if(op === "SUB") acc -= im !== null ? im : rd(o);
      else if(op === "INC"){ if(o === "IX") ix++; else acc++; } else if(op === "DEC"){ if(o === "IX") ix--; else acc--; }
      else if(op === "CMP") flag = acc === (im !== null ? im : rd(o)); else if(op === "JMP") nx = o; else if(op === "JPE"){ if(flag) nx = o; } else if(op === "JPN"){ if(!flag) nx = o; }
      steps.push({ pc: pc, text: op + (o !== null && o !== undefined ? " " + o : ""), acc: acc, ix: ix, flag: flag, mem: JSON.parse(JSON.stringify(m)), changed: changed });
      if(op === "END") break; pc = nx;
    }
    return steps;
  }
  V.simAsm = simAsm;
  V.reg("asm", function(box, o){
    var PRESETS = {
      p33: { name: "Paper 33 Q11 program", prog: [[200, "LDM", "#325"], [201, "STO", "A"], [202, "LDD", 232], [203, "STO", "B"], [204, "SUB", "#50"], [205, "STO", 875], [206, "LDD", "A"], [207, "ADD", 580], [208, "SUB", 875], [209, "STO", "Final"], [210, "END", null]], mem: { 232: 120, 580: 26, A: 0, B: 0, 875: 0, Final: 0 }, keys: ["A", "B", 232, 580, 875, "Final"] },
      sum: { name: "Add up an array (index register)", prog: [[500, "LDM", "#0"], [501, "STO", 700], [502, "LDR", "#0"], [503, "LDX", 600], [504, "CMP", "#0"], [505, "JPE", 510], [506, "ADD", 700], [507, "STO", 700], [508, "INC", "IX"], [509, "JMP", 503], [510, "END", null]], mem: { 600: 4, 601: 9, 602: 2, 603: 0, 700: 0 }, keys: [600, 601, 602, 603, 700] }
    };
    var cur = o.preset || "p33", view = el("div"), cache, tabs = row(), pl;
    function load(){ var P = PRESETS[cur]; cache = simAsm(P.prog, P.mem); }
    function render(i){
      var P = PRESETS[cur], s = i < 0 ? null : cache[i], h = '<div class="vtwo"><div><div class="vscroll"><table class="vt"><tr><th>Address</th><th>Instruction</th></tr>';
      P.prog.forEach(function(p){ h += "<tr><td" + (s && s.pc === p[0] ? ' class="hi"' : "") + ">" + p[0] + "</td><td" + (s && s.pc === p[0] ? ' class="hi"' : "") + " style='text-align:left'><span class='vmono'>" + p[1] + (p[2] !== null ? " " + p[2] : "") + "</span></td></tr>"; });
      h += "</table></div></div><div><div class='vres'>ACC = <b>" + (s ? s.acc : 0) + "</b> &nbsp; IX = <b>" + (s ? s.ix : 0) + "</b>" + (s && s.flag !== null ? " &nbsp; compare flag = <b>" + s.flag + "</b>" : "") + "</div><div class='vcells'>";
      P.keys.forEach(function(k){ var v = s ? s.mem[k] : P.mem[k]; h += '<div class="vcell' + (s && s.changed === k ? " ok" : "") + '"><small>' + k + "</small>" + (v === undefined ? 0 : v) + "</div>"; });
      view.innerHTML = h + "</div></div></div>";
    }
    function build(){
      load();
      if(pl) pl.remove();
      pl = V.player(box, { count: function(){ return cache.length; }, show: render, reset: function(){ render(-1); }, ms: 800 });
      box.insertBefore(pl, view);
      Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === cur ? " on" : ""); });
    }
    Object.keys(PRESETS).forEach(function(k){ var b = btn(PRESETS[k].name, function(){ if(pl) pl.halt(); cur = k; build(); }); b.dataset.k = k; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(view); build();
  });

  /* ---------- 16.1 process states ---------- */
  V.reg("procstate", function(box){
    var ready, run, blocked, log = el("div", "vlog"), view = el("div");
    function reset(){ ready = ["P1", "P2", "P3", "P4"]; run = null; blocked = []; log.innerHTML = "Four processes are <b>ready</b>. Use the buttons to move them between the states, as the kernel and scheduler do."; draw(); }
    function chip(p, c){ return '<span class="vcell ' + (c || "") + '" style="display:inline-block;margin:3px;min-width:40px">' + p + "</span>"; }
    function draw(){
      view.innerHTML = '<div class="vtwo"><div class="vres"><b>READY queue</b><div>' + (ready.map(function(p, i){ return chip(p, i === 0 ? "hi" : ""); }).join("") || "<i>empty</i>") + '</div></div><div class="vres"><b>RUNNING (the CPU)</b><div>' + (run ? chip(run, "ok") : "<i>CPU idle</i>") + '</div></div><div class="vres"><b>BLOCKED (waiting for I/O)</b><div>' + (blocked.map(function(p){ return chip(p, "wa"); }).join("") || "<i>empty</i>") + "</div></div></div>";
      bD.disabled = !(ready.length && !run); bT.disabled = !run; bIO.disabled = !run; bDone.disabled = !blocked.length;
    }
    var bD = btn("Dispatch: ready → running", function(){ run = ready.shift(); log.innerHTML = "The scheduler gives <b>" + run + "</b> the CPU: <b>ready → running</b>."; draw(); }, "p");
    var bT = btn("Time slice ends: running → ready", function(){ var p = run; run = null; ready.push(p); log.innerHTML = "A timer interrupt: the kernel saves <b>" + p + "</b>'s registers in its process control block and moves it to the back of the ready queue: <b>running → ready</b>."; draw(); });
    var bIO = btn("Needs I/O: running → blocked", function(){ var p = run; run = null; blocked.push(p); log.innerHTML = "<b>" + p + "</b> asks for a disk read and cannot continue: <b>running → blocked</b>. The CPU is free for another process."; draw(); });
    var bDone = btn("I/O finishes: blocked → ready", function(){ var p = blocked.shift(); ready.push(p); log.innerHTML = "An interrupt signals that the I/O is complete: <b>" + p + " blocked → ready</b>. It goes back to the ready queue — <b>never straight to running</b>."; draw(); });
    box.appendChild(row(bD, bT, bIO, bDone, btn("Reset", reset))); box.appendChild(view); box.appendChild(log); reset();
  });
})(typeof window !== "undefined" ? window : this);
