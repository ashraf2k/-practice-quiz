/* A Level iLearn visuals, part 2: logic circuits, Karnaugh maps, operating systems, translation software and security. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, ov = V.ov;

  /* ---------- 15.2 half adder and full adder with switches ---------- */
  V.reg("adder", function(box, o){
    var full = o.kind === "full", inV = { A: 0, B: 0, Cin: 0 }, view = el("div"), tt = el("div");
    function calc(){
      var A = inV.A, B = inV.B, C = full ? inV.Cin : 0, S1 = A ^ B, C1 = A & B;
      if(!full) return { A: A, B: B, S1: S1, C1: C1, Sum: S1, Carry: C1 };
      var Sum = S1 ^ C, C2 = S1 & C, Cout = C1 | C2; return { A: A, B: B, Cin: C, S1: S1, C1: C1, Sum: Sum, C2: C2, Cout: Cout };
    }
    function gate(x, y, name, cls){ return { x: x, y: y, in1: [x, y + 14], in2: [x, y + 34], out: [x + 70, y + 24], svg: '<rect class="' + cls + '" x="' + x + '" y="' + y + '" width="70" height="48" rx="9"/><text class="mid b" x="' + (x + 35) + '" y="' + (y + 29) + '">' + name + "</text>" }; }
    function wire(p, q, v, m){ var mx = m || (p[0] + q[0]) / 2; return '<polyline class="wr' + (v ? " v1" : "") + '" points="' + p[0] + "," + p[1] + " " + mx + "," + p[1] + " " + mx + "," + q[1] + " " + q[0] + "," + q[1] + '"/>'; }
    function label(p, t, v, right){ return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="12" class="' + (v ? "ok" : "bx") + '"/><text class="mid b" x="' + p[0] + '" y="' + (p[1] + 4) + '">' + v + '</text><text class="' + (right ? "" : "end ") + 'b" x="' + (p[0] + (right ? 18 : -18)) + '" y="' + (p[1] + 4) + '">' + t + "</text>"; }
    function draw(){
      var r = calc(), h = "";
      if(!full){
        var g1 = gate(190, 20, "XOR", "ac"), g2 = gate(190, 100, "AND", "wa"), a = [70, 40], b = [70, 120];
        h += wire(a, g1.in1, r.A) + wire(a, g2.in1, r.A) + wire(b, g1.in2, r.B) + wire(b, g2.in2, r.B) + wire(g1.out, [350, 44], r.Sum) + wire(g2.out, [350, 124], r.Carry);
        h += g1.svg + g2.svg + label(a, "A", r.A, false) + label(b, "B", r.B, false) + label([350, 44], "Sum", r.Sum, true) + label([350, 124], "Carry", r.Carry, true);
        view.innerHTML = ""; view.appendChild(V.svg(460, 175, h));
      } else {
        var g1_ = gate(150, 10, "XOR", "ac"), g2_ = gate(150, 90, "AND", "wa"), g3 = gate(310, 10, "XOR", "ac"), g4 = gate(310, 150, "AND", "wa"), g5 = gate(450, 105, "OR", "vi");
        var A = [60, 30], B = [60, 110], Cin = [60, 200];
        h += wire(A, g1_.in1, r.A, 90) + wire(A, g2_.in1, r.A, 100) + wire(B, g1_.in2, r.B, 115) + wire(B, g2_.in2, r.B, 125) + wire(Cin, g3.in2, r.Cin, 270) + wire(Cin, g4.in2, r.Cin, 285) +
          wire(g1_.out, g3.in1, r.S1, 250) + wire(g1_.out, g4.in1, r.S1, 240) + wire(g2_.out, g5.in1, r.C1, 420) + wire(g4.out, g5.in2, r.C2, 415) + wire(g3.out, [570, 34], r.Sum) + wire(g5.out, [570, 129], r.Cout);
        h += [g1_, g2_, g3, g4, g5].map(function(g){ return g.svg; }).join("") + label(A, "A", r.A, false) + label(B, "B", r.B, false) + label(Cin, "Cin", r.Cin, false) + label([570, 34], "Sum", r.Sum, true) + label([570, 129], "Cout", r.Cout, true);
        h += '<text class="mu sm" x="60" y="228">First XOR + first AND = half adder 1; second XOR + second AND = half adder 2; the OR gate combines the two carries.</text>';
        view.innerHTML = ""; view.appendChild(V.svg(660, 240, h));
      }
      var rows = [], i, n = full ? 8 : 4;
      for(i = 0; i < n; i++){
        var a1 = full ? (i >> 2) & 1 : (i >> 1) & 1, b1 = full ? (i >> 1) & 1 : i & 1, c1 = full ? i & 1 : 0, s, c;
        if(full){ var t = a1 + b1 + c1; s = t & 1; c = t >> 1; } else { s = a1 ^ b1; c = a1 & b1; }
        var cur = a1 === r.A && b1 === r.B && (!full || c1 === r.Cin), k = cur ? "hi" : "";
        rows.push(full ? [{ t: a1, c: k }, { t: b1, c: k }, { t: c1, c: k }, { t: s, c: k }, { t: c, c: k }] : [{ t: a1, c: k }, { t: b1, c: k }, { t: s, c: k }, { t: c, c: k }]);
      }
      tt.innerHTML = V.table(full ? ["A", "B", "Cin", "Sum", "Cout"] : ["A", "B", "Sum", "Carry"], rows);
    }
    function sw(name){
      var s = el("span", "vsw"), b = el("button", "", "0"); b.type = "button"; b.setAttribute("aria-label", "Input " + name);
      b.addEventListener("click", function(){ inV[name] ^= 1; b.textContent = inV[name]; b.className = inV[name] ? "one" : ""; draw(); });
      s.appendChild(document.createTextNode(name + " ")); s.appendChild(b); return s;
    }
    box.appendChild(el("p", null, "Click the switches to change the inputs. Green wires carry 1. The row of the truth table that matches your inputs is highlighted."));
    box.appendChild(row.apply(null, ["A", "B"].concat(full ? ["Cin"] : []).map(sw)));
    box.appendChild(view); box.appendChild(tt); draw();
  });

  /* ---------- 15.2 SR and JK flip-flops ---------- */
  V.reg("flipflop", function(box, o){
    var jk = o.kind === "jk", Q = 0, a = 0, b = 0, last = -1, msg = el("div", "vlog"), view = el("div"), tt = el("div");
    function apply(){
      var n = a ? (b ? 3 : 1) : (b ? 2 : 0); last = n;
      if(!jk){ if(a && b){ msg.innerHTML = "<span class='vbad'>S = 1 and R = 1 is the invalid state</span>: Q and ‾Q should be opposites, and when both inputs return to 0 the result is unpredictable. Avoid it."; return false; }
        if(a) Q = 1; else if(b) Q = 0; msg.innerHTML = a ? "<b>Set</b>: Q becomes 1 and stays 1 when S returns to 0 — the circuit remembers." : b ? "<b>Reset</b>: Q becomes 0." : "<b>Hold</b>: neither input is active, so Q keeps its previous value."; return true; }
      if(a && b){ Q ^= 1; msg.innerHTML = "J = 1, K = 1: <b>toggle</b>, Q changes to the opposite value."; } else if(a){ Q = 1; msg.innerHTML = "J = 1, K = 0: <b>set</b>, Q becomes 1."; } else if(b){ Q = 0; msg.innerHTML = "J = 0, K = 1: <b>reset</b>, Q becomes 0."; } else msg.innerHTML = "J = 0, K = 0: <b>no change</b>.";
      return true;
    }
    function draw(){
      var S = jk ? "J" : "S", R = jk ? "K" : "R";
      view.innerHTML = '<div class="vres" style="display:flex;gap:26px;align-items:center;flex-wrap:wrap"><div>Q<div class="vbit ' + (Q ? "one" : "") + '" style="display:flex;align-items:center;justify-content:center;cursor:default;width:56px;height:56px;font-size:24px">' + Q + '</div></div><div>‾Q<div class="vbit ' + (!Q ? "one" : "") + '" style="display:flex;align-items:center;justify-content:center;cursor:default;width:56px;height:56px;font-size:24px">' + (1 - Q) + "</div></div><div>" + S + " = <b>" + a + "</b> &nbsp; " + R + " = <b>" + b + "</b></div></div>";
      var rows = jk ? [[0, 0, "No change"], [1, 0, "Q = 1 (set)"], [0, 1, "Q = 0 (reset)"], [1, 1, "Toggle"]] : [[0, 0, "No change (hold)"], [1, 0, "Q = 1 (set)"], [0, 1, "Q = 0 (reset)"], [1, 1, "Invalid"]];
      tt.innerHTML = V.table([S, R, jk ? "Q after the clock pulse" : "Effect"], rows.map(function(r, i){ var c = last === i ? "hi" : ""; return [{ t: r[0], c: c }, { t: r[1], c: c }, { t: r[2], c: c }]; }));
    }
    function sw(name, which){
      var s = el("span", "vsw"), bt = el("button", "", "0"); bt.type = "button";
      bt.addEventListener("click", function(){ if(which === 0) a ^= 1; else b ^= 1; bt.textContent = which === 0 ? a : b; bt.className = (which === 0 ? a : b) ? "one" : ""; if(!jk) { apply(); } draw(); });
      s.appendChild(document.createTextNode(name + " ")); s.appendChild(bt); return s;
    }
    box.appendChild(el("p", null, jk ? "Set J and K, then press <b>Clock pulse</b>. The JK flip-flop only changes at the clock pulse, and 1,1 makes Q toggle instead of being invalid." : "An SR flip-flop (two cross-coupled NOR gates) responds as soon as S or R changes. Switch S and R on and off, in this order: S on, S off, R on, R off, and watch Q remember."));
    var ctl = row(sw(jk ? "J" : "S", 0), sw(jk ? "K" : "R", 1));
    if(jk) ctl.appendChild(btn("⏱ Clock pulse", function(){ apply(); draw(); }, "p"));
    ctl.appendChild(btn("Reset Q", function(){ Q = 0; last = -1; msg.innerHTML = "Q set to 0."; draw(); }));
    box.appendChild(ctl); box.appendChild(view); box.appendChild(msg); box.appendChild(tt);
    msg.innerHTML = "Waiting for an input."; draw();
  });

  /* ---------- 15.2 Karnaugh map explorer (Quine-McCluskey does the grouping) ---------- */
  function simplify(n, mins){
    if(!mins.length) return { terms: [], pis: [] }; if(mins.length === (1 << n)) return { terms: [{ bits: new Array(n + 1).join("-"), cells: mins.slice() }], pis: [] };
    var cur = mins.map(function(m){ var s = m.toString(2); while(s.length < n) s = "0" + s; return { bits: s, cells: [m], used: false }; }), primes = [];
    while(cur.length){
      var next = {}, i, j;
      for(i = 0; i < cur.length; i++) for(j = i + 1; j < cur.length; j++){
        var a = cur[i].bits, b = cur[j].bits, d = -1, c = 0, k;
        for(k = 0; k < n; k++) if(a[k] !== b[k]){ c++; d = k; }
        if(c === 1 && a[d] !== "-" && b[d] !== "-"){
          var nb = a.slice(0, d) + "-" + a.slice(d + 1);
          if(!next[nb]) next[nb] = { bits: nb, cells: [], used: false };
          cur[i].used = cur[j].used = true;
          cur[i].cells.concat(cur[j].cells).forEach(function(x){ if(next[nb].cells.indexOf(x) < 0) next[nb].cells.push(x); });
        }
      }
      cur.forEach(function(t){ if(!t.used) primes.push(t); });
      cur = Object.keys(next).map(function(k2){ return next[k2]; });
    }
    var chosen = [], left = mins.slice();
    function cover(p){ chosen.push(p); left = left.filter(function(m){ return p.cells.indexOf(m) < 0; }); }
    mins.forEach(function(m){ var ps = primes.filter(function(p){ return p.cells.indexOf(m) >= 0; }); if(ps.length === 1 && chosen.indexOf(ps[0]) < 0) cover(ps[0]); });
    while(left.length){
      var best = null, bc = -1; primes.forEach(function(p){ if(chosen.indexOf(p) >= 0) return; var c2 = p.cells.filter(function(m){ return left.indexOf(m) >= 0; }).length; if(c2 > bc){ bc = c2; best = p; } });
      cover(best);
    }
    return { terms: chosen, pis: primes };
  }
  V.simplify = simplify;
  function termHtml(bits, names, plain){
    var out = [], i; for(i = 0; i < bits.length; i++){ if(bits[i] === "1") out.push(names[i]); else if(bits[i] === "0") out.push(plain ? names[i] + "'" : ov(names[i])); }
    return out.length ? out.join(".") : "1";
  }
  V.termHtml = termHtml;
  var KP = {
    "Paper 31 Q6(c)": [[0,0,1,0],[0,1,1,0],[1,1,1,1],[0,0,1,0]],
    "Paper 32 Q7(a)": [[0,1,1,0],[1,1,1,1],[0,1,1,0],[0,1,1,0]],
    "Paper 33 Q6(a)": [[0,1,1,0],[0,1,0,0],[0,1,0,0],[0,1,1,0]],
    "X = A.B + C.D": [[0,0,1,0],[0,0,1,0],[1,1,1,1],[0,0,1,0]]
  };
  var COLS = ["#146C6A", "#B45309", "#7C3AED", "#C4423B", "#1D4ED8", "#0F8A6B"];
  V.reg("kmap", function(box, o){
    var n = o.vars || 4, names = ["A", "B", "C", "D"].slice(0, n), gray = [0, 1, 3, 2];
    var cols = n === 4 ? gray : gray, rowsIdx = n === 4 ? gray : [0, 1];
    var cell = {}, view = el("div"), res = el("div", "vres");
    function idx(ci, ri){ var ab = cols[ci]; return n === 4 ? (ab << 2) | rowsIdx[ri] : (ab << 1) | rowsIdx[ri]; }
    function draw(){
      var mins = [], k; for(k = 0; k < (1 << n); k++) if(cell[k]) mins.push(k);
      var r = simplify(n, mins), t = '<div class="vscroll"><table class="vt vkm"><tr><th>' + (n === 4 ? "CD \\ AB" : "C \\ AB") + "</th>";
      cols.forEach(function(c){ t += "<th>" + (c >> 1) + (c & 1) + "</th>"; }); t += "</tr>";
      rowsIdx.forEach(function(rr, ri){
        t += "<tr><th>" + (n === 4 ? (rr >> 1) + "" + (rr & 1) : rr) + "</th>";
        cols.forEach(function(c, ci){
          var m = idx(ci, ri), dots = "";
          r.terms.forEach(function(g, gi){ if(g.cells.indexOf(m) >= 0) dots += '<span style="display:inline-block;width:9px;height:9px;border-radius:50%;margin:0 1px;background:' + COLS[gi % COLS.length] + '"></span>'; });
          t += '<td data-m="' + m + '" class="' + (cell[m] ? "one" : "") + '" tabindex="0" role="button" aria-label="Cell ' + m + '">' + (cell[m] ? 1 : 0) + "<div style='line-height:9px;min-height:9px'>" + dots + "</div></td>";
        });
        t += "</tr>";
      });
      view.innerHTML = t + "</table></div>";
      Array.prototype.forEach.call(view.querySelectorAll("td[data-m]"), function(td){
        function tog(){ var m = +td.dataset.m; cell[m] = cell[m] ? 0 : 1; draw(); }
        td.addEventListener("click", tog); td.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); tog(); } });
      });
      if(!mins.length) res.innerHTML = "Output X = <b>0</b> (no 1s on the map).";
      else if(mins.length === (1 << n)) res.innerHTML = "Output X = <b>1</b> (every cell is 1: one group of " + (1 << n) + ").";
      else res.innerHTML = "<div>" + r.terms.length + " group" + (r.terms.length === 1 ? "" : "s") + " (largest possible, the map wraps round the edges):</div><div>" + r.terms.map(function(g, gi){ return '<span style="display:inline-block;width:11px;height:11px;border-radius:50%;margin-right:5px;background:' + COLS[gi % COLS.length] + '"></span>' + termHtml(g.bits, names) + " <small>(" + g.cells.length + " cell" + (g.cells.length === 1 ? "" : "s") + ")</small>"; }).join("<br>") + "</div><div style='margin-top:6px'>Simplified expression: <b class='big'>X = " + r.terms.map(function(g){ return termHtml(g.bits, names); }).join(" + ") + "</b></div>";
    }
    function load(m){ for(var k = 0; k < (1 << n); k++) cell[k] = 0; for(var ri = 0; ri < rowsIdx.length; ri++) for(var ci = 0; ci < 4; ci++) if(m[ri][ci]) cell[idx(ci, ri)] = 1; draw(); }
    var pr = row(); if(n === 4) Object.keys(KP).forEach(function(k){ pr.appendChild(btn(k, function(){ load(KP[k]); })); });
    else pr.appendChild(btn("X = at least two inputs are 1", function(){ load([[0,0,1,0],[0,1,1,1]]); }));
    pr.appendChild(btn("Clear", function(){ load(n === 4 ? [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]] : [[0,0,0,0],[0,0,0,0]]); }));
    box.appendChild(el("p", null, "Click cells to switch them between 0 and 1 and watch the groups and the simplified expression appear. The coloured dots show which group(s) each 1 belongs to."));
    box.appendChild(pr); box.appendChild(view); box.appendChild(res); load(n === 4 ? [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]] : [[0,0,0,0],[0,0,0,0]]);
  });

  /* ---------- 16.1 CPU scheduling ---------- */
  function schedule(procs, algo, q){
    var P = procs.map(function(p){ return { n: p[0], arr: p[1], burst: p[2], rem: p[2], added: false, fin: 0 }; }), t = 0, done = 0, ready = [], cur = null, used = 0, tl = [], g = 0;
    while(done < P.length && g++ < 2000){
      P.forEach(function(p){ if(!p.added && p.arr <= t){ ready.push(p); p.added = true; } });
      if(cur && algo === "RR" && used >= q){ ready.push(cur); cur = null; }
      if(cur && algo === "SRTF"){ var s = ready.filter(function(p){ return p.rem < cur.rem; }); if(s.length){ ready.push(cur); cur = null; } }
      if(!cur && ready.length){
        var pick = 0;
        if(algo === "SJF" || algo === "SRTF"){ ready.forEach(function(p, i){ var key = algo === "SJF" ? p.burst : p.rem, bk = algo === "SJF" ? ready[pick].burst : ready[pick].rem; if(key < bk) pick = i; }); }
        cur = ready.splice(pick, 1)[0]; used = 0;
      }
      if(!cur){ tl.push("idle"); t++; continue; }
      tl.push(cur.n); cur.rem--; used++; t++;
      if(cur.rem === 0){ cur.fin = t; done++; cur = null; }
    }
    var seg = [], i; for(i = 0; i < tl.length; i++){ if(seg.length && seg[seg.length - 1].n === tl[i]) seg[seg.length - 1].len++; else seg.push({ n: tl[i], start: i, len: 1 }); }
    var tot = 0, rows = P.map(function(p){ var w = p.fin - p.arr - p.burst; tot += w; return { n: p.n, arr: p.arr, burst: p.burst, fin: p.fin, wait: w }; });
    return { seg: seg, rows: rows, avg: tot / P.length, end: tl.length };
  }
  V.schedule = schedule;
  V.reg("sched", function(box){
    var SETS = { "All arrive at 0 (lesson example)": [["P1", 0, 23], ["P2", 0, 4], ["P3", 0, 9], ["P4", 0, 3]], "Different arrival times": [["P1", 0, 7], ["P2", 2, 4], ["P3", 4, 1], ["P4", 5, 4]] };
    var setName = Object.keys(SETS)[0], algo = "FCFS", q = el("input", "vin mono"), view = el("div"), tabs = row(), sets = row();
    q.type = "number"; q.min = 1; q.value = 5; q.style.width = "64px"; q.setAttribute("aria-label", "Time slice (quantum)");
    var colors = ["var(--accent)", "var(--diff-moderate)", "var(--diff-hard)", "var(--incorrect)"];
    function draw(){
      var procs = SETS[setName], r = schedule(procs, algo, Math.max(1, +q.value || 1)), h = '<div style="display:flex;border-radius:8px;overflow:hidden;margin:10px 0 0">';
      r.seg.forEach(function(s){ var ci = procs.map(function(p){ return p[0]; }).indexOf(s.n); h += '<div style="flex:' + s.len + ';min-width:22px;background:' + (s.n === "idle" ? "var(--line)" : colors[ci % 4]) + ';color:#fff;text-align:center;padding:9px 0;font-weight:700;font-size:12.5px">' + (s.n === "idle" ? "" : s.n) + "</div>"; });
      h += '</div><div style="display:flex;margin-bottom:8px;font:11px ui-monospace,monospace">';
      r.seg.forEach(function(s){ h += '<div style="flex:' + s.len + ';min-width:22px">' + s.start + "</div>"; }); h += '<div style="width:0;position:relative"><span style="position:absolute;left:-2px">' + r.end + "</span></div></div>";
      h += V.table(["Process", "Arrives", "Burst", "Finishes", "Waiting time = finish − arrival − burst"], r.rows.map(function(x){ return [x.n, x.arr, x.burst, x.fin, x.wait]; }));
      view.innerHTML = h + "<div class='vres'>Average waiting time = <b class='big'>" + (Math.round(r.avg * 100) / 100) + " ms</b></div>";
      Array.prototype.forEach.call(tabs.querySelectorAll("button"), function(b){ b.className = "vb" + (b.dataset.a === algo ? " on" : ""); });
      Array.prototype.forEach.call(sets.querySelectorAll("button"), function(b){ b.className = "vb" + (b.dataset.s === setName ? " on" : ""); });
    }
    [["FCFS", "First come first served"], ["SJF", "Shortest job first"], ["SRTF", "Shortest remaining time"], ["RR", "Round robin"]].forEach(function(a){ var b = btn(a[1], function(){ algo = a[0]; draw(); }); b.dataset.a = a[0]; tabs.appendChild(b); });
    Object.keys(SETS).forEach(function(s){ var b = btn(s, function(){ setName = s; draw(); }); b.dataset.s = s; sets.appendChild(b); });
    q.addEventListener("input", draw);
    box.appendChild(sets); box.appendChild(tabs); box.appendChild(row(el("label", null, "Round robin time slice: "), q, document.createTextNode(" ms"))); box.appendChild(view); draw();
  });

  /* ---------- 16.1 page replacement ---------- */
  function paging(ref, frames, algo){
    var mem = [], faults = 0, cols = [], loadT = [];
    ref.forEach(function(pg, i){
      var hit = mem.indexOf(pg) >= 0, victim = null;
      if(!hit){
        faults++;
        if(mem.length < frames) mem.push(pg);
        else {
          var vi = 0;
          if(algo === "FIFO"){ vi = 0; }
          else if(algo === "LRU"){ var best = Infinity; mem.forEach(function(m, k){ var last = ref.slice(0, i).lastIndexOf(m); if(last < best){ best = last; vi = k; } }); }
          else { var far = -1; mem.forEach(function(m, k){ var nx = ref.indexOf(m, i + 1); if(nx < 0) nx = Infinity; if(nx > far){ far = nx; vi = k; } }); }
          victim = mem[vi];
          if(algo === "FIFO"){ mem.shift(); mem.push(pg); } else mem[vi] = pg;
        }
      }
      cols.push({ pg: pg, mem: mem.slice(), hit: hit, victim: victim });
    });
    return { faults: faults, cols: cols };
  }
  V.paging = paging;
  V.reg("paging", function(box){
    var algo = "FIFO", inp = el("input", "vin mono"), fr = el("input"), view = el("div"), tabs = row();
    inp.value = "7,0,1,2,0,3,0,4,2,3,0,3,2"; inp.style.width = "min(100%,340px)"; inp.setAttribute("aria-label", "Page reference string");
    fr.type = "range"; fr.min = 1; fr.max = 6; fr.value = 3; fr.setAttribute("aria-label", "Number of frames");
    function draw(){
      var ref = inp.value.split(/[ ,]+/).filter(Boolean).map(Number).filter(function(x){ return !isNaN(x); }).slice(0, 24), f = +fr.value;
      if(!ref.length){ view.innerHTML = "<p>Enter some page numbers.</p>"; return; }
      var r = paging(ref, f, algo), h = '<div class="vscroll"><table class="vt"><tr><th>Request</th>' + r.cols.map(function(c){ return "<td class='" + (c.hit ? "ok" : "no") + "'><b>" + c.pg + "</b></td>"; }).join("") + "</tr>";
      for(var k = 0; k < f; k++) h += "<tr><th>Frame " + (k + 1) + "</th>" + r.cols.map(function(c){ return "<td>" + (c.mem[k] === undefined ? "" : c.mem[k]) + "</td>"; }).join("") + "</tr>";
      h += "<tr><th>Result</th>" + r.cols.map(function(c){ return "<td class='" + (c.hit ? "ok" : "no") + "'>" + (c.hit ? "hit" : "fault") + "</td>"; }).join("") + "</tr></table></div>";
      view.innerHTML = h + "<div class='vres'>" + f + " frame" + (f === 1 ? "" : "s") + ", " + algo + ": <b class='big'>" + r.faults + " page fault" + (r.faults === 1 ? "" : "s") + "</b> out of " + ref.length + " requests</div>";
      Array.prototype.forEach.call(tabs.querySelectorAll("button"), function(b){ b.className = "vb" + (b.dataset.a === algo ? " on" : ""); });
    }
    [["FIFO", "FIFO (first in first out)"], ["LRU", "LRU (least recently used)"], ["OPT", "Optimal"]].forEach(function(a){ var b = btn(a[1], function(){ algo = a[0]; draw(); }); b.dataset.a = a[0]; tabs.appendChild(b); });
    inp.addEventListener("input", draw); fr.addEventListener("input", draw);
    box.appendChild(el("p", null, "Red = page fault (the page was not in a frame, so it is fetched from disk and, if the frames are full, a page is replaced). Try the Belady string 1,2,3,4,1,2,5,1,2,3,4,5 with FIFO on 3 and then 4 frames."));
    box.appendChild(tabs); box.appendChild(row(el("label", null, "Pages requested: "), inp)); box.appendChild(row(el("label", null, "Frames: "), fr)); box.appendChild(view); draw();
  });

  /* ---------- 16.2 the stages of compilation ---------- */
  V.reg("compile", function(box){
    var bad = false, view = el("div"), log = el("div", "vlog"), badBtn;
    function stage(i){
      var h = "", S = ["Source code", "Lexical analysis", "Syntax analysis", "Code generation", "Optimisation"];
      h += '<div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px">' + S.map(function(s, k){ return '<span class="vcell' + (k === i ? " hi" : (k < i ? " ok" : "")) + '" style="margin:0;border-radius:8px;padding:6px 10px;font-family:inherit">' + s + "</span>"; }).join('<span style="align-self:center">→</span>') + "</div>";
      var src = bad ? "z + x + y" : "z = x + y";
      if(i === 0){ h += "<div>Source code: <span class='vmono'>" + src + "</span></div>"; log.innerHTML = "The programmer writes the <b>source code</b> in a high-level language. The compiler will translate the whole program into <b>object code</b> before it runs."; }
      if(i === 1){ h += "<div>The comments and spaces are removed and each item is replaced by a <b>token</b>. Variables go into the <b>symbol table</b>; keywords and symbols come from the <b>keyword table</b>.</div>" + V.table(["Source", bad ? "z" : "z", bad ? "+" : "=", "x", "+", "y"], [["Token", "83", bad ? "02" : "01", "81", "02", "82"]]) + V.table(["Keyword table", "Symbol table"], [["= → 01, + → 02", "x → 81, y → 82, z → 83"]]); log.innerHTML = "Output of lexical analysis: <b>" + (bad ? "83 02 81 02 82" : "83 01 81 02 82") + "</b> (a list of tokens)."; }
      if(i === 2){ h += "<div>The tokens are checked against the grammar rules (for example written in BNF):</div><pre class='ln-pre'>&lt;assignment&gt; ::= &lt;identifier&gt; = &lt;expression&gt;\n&lt;expression&gt; ::= &lt;identifier&gt; + &lt;identifier&gt;</pre>" + (bad ? "<div class='vres'><span class='vbad'>✗ Syntax error:</span> after the identifier z the <b>=</b> token (01) was expected but + (02) was found. The error is reported; <b>code generation is not attempted</b>.</div>" : "<div class='vres'><span class='vok'>✓ No syntax errors:</span> the tokens match the rules for an assignment.</div>"); log.innerHTML = bad ? "Syntax analysis found an error, so the compiler stops here and reports it." : "The syntax is correct, so the compiler carries on."; }
      if(i === 3){ if(bad){ h += "<div class='vres'>Skipped: object code is only produced when there are no syntax errors.</div>"; log.innerHTML = "Nothing is generated."; } else { h += "<div>Object code (shown as assembly):</div><pre class='ln-pre'>LDD x\nADD y\nSTO z</pre>"; log.innerHTML = "<b>Code generation</b> produces the object code. Library routines needed by the program may also be linked in."; } }
      if(i === 4){ if(bad){ h += "<div class='vres'>Skipped.</div>"; log.innerHTML = "Fix the syntax error and compile again."; } else { h += "<div>Before:</div><pre class='ln-pre'>w = x + y\nv = x + y + z</pre><div>After optimisation (x + y is calculated only once):</div><pre class='ln-pre'>w = x + y\nv = w + z</pre>"; log.innerHTML = "<b>Optimisation</b> makes the object code use less time, memory or other resources."; } }
      view.innerHTML = h;
    }
    var pl = V.player(box, { count: function(){ return 5; }, show: stage, reset: function(){ stage(0); }, ms: 2200 });
    badBtn = btn("Switch to code with a syntax error", function(){ bad = !bad; badBtn.textContent = bad ? "Switch back to correct code" : "Switch to code with a syntax error"; pl.querySelector(".vb:last-child").click(); });
    box.appendChild(row(pl, badBtn)); box.appendChild(view); box.appendChild(log); stage(0);
  });

  /* ---------- 16.2 RPN: evaluate with a stack, and convert from infix ---------- */
  function tokens(s){ var m = String(s).match(/\d+(?:\.\d+)?|[A-Za-z_]\w*|[-+*\/()]/g); return m || []; }
  function evalSteps(toks, vars){
    var st = [], steps = [], err = null;
    toks.forEach(function(t){
      if(err) return;
      if(/^[-+*\/]$/.test(t)){
        if(st.length < 2){ err = "Not enough values on the stack for " + t; return; }
        var b = st.pop(), a = st.pop(), r = t === "+" ? a + b : t === "-" ? a - b : t === "*" ? a * b : a / b;
        st.push(r); steps.push({ t: t, st: st.slice(), msg: "Operator <b>" + t + "</b>: pop " + b + " then " + a + ", calculate " + a + " " + t + " " + b + " = <b>" + r + "</b>, push " + r + "." });
      } else {
        var v = /^\d/.test(t) ? Number(t) : (vars && vars[t] !== undefined ? vars[t] : NaN);
        if(isNaN(v)){ err = "No value given for " + t; return; }
        st.push(v); steps.push({ t: t, st: st.slice(), msg: "Operand <b>" + t + "</b>" + (/^\d/.test(t) ? "" : " (= " + v + ")") + ": push " + v + " onto the stack." });
      }
    });
    if(!err && st.length !== 1) err = st.length + " values are left on the stack: the expression is not valid.";
    return { steps: steps, err: err, result: st[0] };
  }
  V.evalSteps = evalSteps;
  V.reg("rpneval", function(box){
    var inp = el("input", "vin mono"), vin = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), res, pl;
    inp.value = "15 9 - 24 3 / * 18 6 + /"; inp.style.width = "min(100%,360px)"; inp.setAttribute("aria-label", "RPN expression");
    vin.value = "a=8 b=2 c=10 d=18"; vin.style.width = "200px"; vin.setAttribute("aria-label", "Variable values");
    function vars(){ var o = {}; (vin.value.match(/([A-Za-z_]\w*)\s*=\s*(-?\d+(?:\.\d+)?)/g) || []).forEach(function(p){ var m = p.split("="); o[m[0].trim()] = Number(m[1]); }); return o; }
    function show(i){
      var s = res.steps[i], h = '<div class="vtwo"><div><div>Token read: <b class="vmono">' + esc(s.t) + "</b></div>";
      h += '<div style="display:flex;gap:4px;flex-wrap:wrap;margin:8px 0" class="vmono">' + tokens(inp.value).map(function(t, k){ return '<span class="vcell ' + (k === i ? "hi" : (k < i ? "ok" : "")) + '" style="margin:0;min-width:30px">' + esc(t) + "</span>"; }).join("") + "</div></div>";
      h += '<div><b>Stack</b> (top is at the top)<div class="vstack">' + s.st.map(function(v, k){ return "<i" + (k === s.st.length - 1 ? ' class="new"' : "") + ">" + v + "</i>"; }).join("") + "</div></div></div>";
      view.innerHTML = h; log.innerHTML = s.msg + (i === res.steps.length - 1 ? " <b>Final result: " + res.result + "</b>" : "");
    }
    function build(){
      if(pl) pl.remove(); res = evalSteps(tokens(inp.value), vars());
      if(res.err){ view.innerHTML = ""; log.innerHTML = "<span class='vbad'>" + esc(res.err) + "</span>"; pl = null; return; }
      pl = V.player(box, { count: function(){ return res.steps.length; }, show: show, reset: function(){ view.innerHTML = ""; log.innerHTML = "Press <b>Step</b> to read the first token."; }, ms: 1200 });
      box.insertBefore(pl, view);
    }
    var pre = row();
    [["Paper 31 Q7(c)", "15 9 - 24 3 / * 18 6 + /", ""], ["Paper 32 Q6(c)", "c a b - * b c + / d *", "a=8 b=2 c=10 d=18"], ["Paper 33 Q7(c)", "16 3 * 36 6 / 18 6 - * +", ""]].forEach(function(p){ pre.appendChild(btn(p[0], function(){ inp.value = p[1]; vin.value = p[2]; if(pl) pl.halt(); build(); })); });
    box.appendChild(el("p", null, "Type a Reverse Polish expression (separate every item with a space) and step through it. Numbers are pushed; an operator pops two values, calculates and pushes the answer."));
    box.appendChild(pre); box.appendChild(row(inp, btn("Load", function(){ if(pl) pl.halt(); build(); }, "p"))); box.appendChild(row(el("label", null, "Variable values: "), vin));
    box.appendChild(view); box.appendChild(log); build();
  });
  function toRPN(toks){
    var prec = { "+": 1, "-": 1, "*": 2, "/": 2 }, out = [], ops = [], steps = [], err = null;
    toks.forEach(function(t){
      if(err) return; var note;
      if(/^[-+*\/]$/.test(t)){ var moved = []; while(ops.length && ops[ops.length - 1] !== "(" && prec[ops[ops.length - 1]] >= prec[t]){ var x = ops.pop(); out.push(x); moved.push(x); } ops.push(t); note = "Operator <b>" + t + "</b>: " + (moved.length ? "the operator(s) <b>" + moved.join(" ") + "</b> on the stack have the same or higher priority, so they move to the output first; then " + t + " is pushed." : "push it onto the operator stack."); }
      else if(t === "("){ ops.push(t); note = "Opening bracket: push it."; }
      else if(t === ")"){ var mv = []; while(ops.length && ops[ops.length - 1] !== "("){ var y = ops.pop(); out.push(y); mv.push(y); } if(!ops.length){ err = "Brackets do not match."; return; } ops.pop(); note = "Closing bracket: operators back to the matching ( move to the output" + (mv.length ? " (<b>" + mv.join(" ") + "</b>)" : "") + " and the brackets are discarded."; }
      else { out.push(t); note = "Operand <b>" + t + "</b> goes straight to the output."; }
      steps.push({ t: t, out: out.slice(), ops: ops.slice(), msg: note });
    });
    if(err) return { err: err, steps: steps };
    var rest = []; while(ops.length){ var z = ops.pop(); if(z === "("){ return { err: "Brackets do not match.", steps: steps }; } out.push(z); rest.push(z); }
    steps.push({ t: "end", out: out.slice(), ops: [], msg: "End of the expression: the remaining operators" + (rest.length ? " (<b>" + rest.join(" ") + "</b>)" : "") + " move to the output. <b>RPN: " + out.join(" ") + "</b>" });
    return { steps: steps, rpn: out.join(" ") };
  }
  V.toRPN = toRPN;
  V.reg("rpnconv", function(box){
    var inp = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), pl, res;
    inp.value = "21 * (15 - 3 + 8) / 7"; inp.style.width = "min(100%,320px)"; inp.setAttribute("aria-label", "Infix expression");
    function show(i){ var s = res.steps[i]; view.innerHTML = '<div class="vtwo"><div><b>Output</b><div class="vres vmono">' + (s.out.map(esc).join(" ") || "…") + "</div></div><div><b>Operator stack</b><div class='vstack'>" + s.ops.map(function(o, k){ return "<i" + (k === s.ops.length - 1 ? ' class="new"' : "") + ">" + esc(o) + "</i>"; }).join("") + "</div></div></div>"; log.innerHTML = s.msg; }
    function build(){
      if(pl) pl.remove(); res = toRPN(tokens(inp.value));
      if(res.err){ view.innerHTML = ""; log.innerHTML = "<span class='vbad'>" + res.err + "</span>"; pl = null; return; }
      pl = V.player(box, { count: function(){ return res.steps.length; }, show: show, reset: function(){ view.innerHTML = ""; log.innerHTML = "Press <b>Step</b> to read the first item of the expression."; }, ms: 1300 });
      box.insertBefore(pl, view);
    }
    var pre = row();
    [["Paper 31 Q7(a)", "21 * (15 - 3 + 8) / 7"], ["Paper 32 Q6(a)", "16 + ((9 - 7) / (18 + 6))"], ["Paper 33 Q7(b)", "((18 - 15 + 3) * 5) / 12"]].forEach(function(p){ pre.appendChild(btn(p[0], function(){ inp.value = p[1]; if(pl) pl.halt(); build(); })); });
    box.appendChild(el("p", null, "Type an ordinary (infix) expression and watch it converted to Reverse Polish Notation using an output list and an operator stack. * and / have higher priority than + and −."));
    box.appendChild(pre); box.appendChild(row(inp, btn("Load", function(){ if(pl) pl.halt(); build(); }, "p"))); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 17 encryption: private message, verified message, SSL/TLS ---------- */
  function chip(t, c){ return '<span class="vcell ' + (c || "") + '" style="display:inline-block;margin:3px;padding:5px 8px;font-family:inherit;font-size:12.5px">' + t + "</span>"; }
  V.reg("enc", function(box, o){
    var kind = o.kind || "private", who = kind === "private" ? ["Individual (sender)", "Organisation (receiver)"] : ["Business (sender)", "Anyone (receiver)"], steps;
    if(kind === "private") steps = [
      { L: [], R: [], M: [], t: "An individual wants to send a <b>private</b> message to an organisation. Only the organisation should be able to read it." },
      { L: [], R: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], M: [], t: "The organisation generates a <b>matched pair of keys</b>: a public key and a private key." },
      { L: [chip("org's PUBLIC key", "ok")], R: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], M: [], t: "The organisation makes its <b>public key</b> available (for example on its website). The private key is kept secret." },
      { L: [chip("org's PUBLIC key", "ok"), chip("plain text: Hello", "hi")], R: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], M: [], t: "The individual has the message as plain text." },
      { L: [chip("org's PUBLIC key", "ok")], R: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], M: [chip("cipher text: x7#Qp", "wa")], t: "The individual <b>encrypts the message with the organisation's public key</b> and sends the cipher text. Anyone who intercepts it cannot read it." },
      { L: [], R: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no"), chip("plain text: Hello", "hi")], M: [], t: "The organisation <b>decrypts the cipher text with its private key</b>. Only the matching private key can do this." }
    ];
    else steps = [
      { L: [], R: [], M: [], t: "A business wants to send a message that everyone can <b>verify really came from it</b>." },
      { L: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], R: [], M: [], t: "The business generates a <b>matched pair of keys</b>." },
      { L: [chip("PUBLIC key", "ok"), chip("PRIVATE key", "no")], R: [chip("business's PUBLIC key", "ok")], M: [], t: "The business makes its <b>public key</b> available to everyone." },
      { L: [chip("PRIVATE key", "no"), chip("cipher text: x7#Qp", "wa")], R: [chip("business's PUBLIC key", "ok")], M: [chip("cipher text: x7#Qp", "wa")], t: "The business <b>encrypts the message with its private key</b> and sends it." },
      { L: [], R: [chip("business's PUBLIC key", "ok"), chip("plain text: Hello", "hi")], M: [], t: "Anyone can <b>decrypt it with the business's public key</b>. Because only the business's private key could have produced something that this public key decrypts, the sender is <b>verified</b>." },
      { L: [], R: [chip("plain text: Hello", "hi")], M: [], t: "Note: everyone who has the public key can read this message, so it is verified but <b>not private</b>." }
    ];
    var view = el("div"), log = el("div", "vlog");
    function show(i){ var s = steps[i]; view.innerHTML = '<div class="vtwo" style="align-items:stretch"><div class="vres"><b>' + who[0] + "</b><div>" + (s.L.join("") || "&nbsp;") + '</div></div><div class="vres" style="text-align:center"><b>Network</b><div>' + (s.M.join("") || "&nbsp;") + '</div></div><div class="vres"><b>' + who[1] + "</b><div>" + (s.R.join("") || "&nbsp;") + "</div></div></div>"; log.innerHTML = s.t; }
    var pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ show(0); }, ms: 2400 });
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); show(0);
  });
  V.reg("tls", function(box){
    var steps = [
      { c: [], s: [], m: "", t: "A browser (client) wants a secure page: <b>https://</b> shop.example." },
      { c: [], s: [chip("certificate (contains server's PUBLIC key, signed by a CA)", "ok")], m: "client asks for a secure connection ➜ ⬅ server sends its digital certificate", t: "The browser asks for a secure connection and the server sends its <b>digital certificate</b>, which holds its public key and the certificate authority's (CA) digital signature." },
      { c: [chip("✓ CA signature valid, dates valid, domain matches", "ok")], s: [chip("certificate", "ok")], m: "", t: "The browser <b>checks the certificate</b>: the CA's signature (using the CA's public key already stored in the browser), the dates and the domain name." },
      { c: [chip("session key (symmetric)", "wa")], s: [chip("certificate", "ok")], m: "session key, encrypted with the server's PUBLIC key ➜", t: "The browser creates a <b>session key</b> (a symmetric key) and sends it, <b>encrypted with the server's public key</b>." },
      { c: [chip("session key", "wa")], s: [chip("PRIVATE key", "no"), chip("session key", "wa")], m: "⬅ acknowledgement encrypted with the session key", t: "The server <b>decrypts the session key with its private key</b> and sends an acknowledgement encrypted with the session key. Now both have the same secret key." },
      { c: [chip("session key", "wa")], s: [chip("session key", "wa")], m: "⇄ data encrypted with the session key ⇄", t: "All the following data is encrypted with the <b>session key</b>: asymmetric encryption shared the key safely, then fast symmetric encryption protects the data. The padlock appears." }
    ];
    var view = el("div"), log = el("div", "vlog");
    function show(i){ var s = steps[i]; view.innerHTML = '<div class="vtwo" style="align-items:stretch"><div class="vres"><b>Browser (client)</b><div>' + (s.c.join("") || "&nbsp;") + '</div></div><div class="vres" style="text-align:center;flex:1.3"><b>Internet</b><div style="min-height:22px">' + s.m + '</div></div><div class="vres"><b>Web server</b><div>' + (s.s.join("") || "&nbsp;") + "</div></div></div>"; log.innerHTML = s.t; }
    var pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ show(0); }, ms: 2600 });
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); show(0);
  });
  function toyHash(s){ var h = 2166136261, i; for(i = 0; i < s.length; i++){ h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; } return ("00000000" + h.toString(16)).slice(-8); }
  V.toyHash = toyHash;
  V.reg("digsig", function(box){
    var msg = el("input", "vin"), view = el("div"), tamper = false, bT;
    msg.value = "Pay 100 to Sam"; msg.style.width = "min(100%,300px)"; msg.setAttribute("aria-label", "Message");
    function draw(){
      var sent = msg.value, got = tamper ? sent.replace(/\d/, function(d){ return String((+d + 1) % 10); }) + (/\d/.test(sent) ? "" : "!") : sent, d1 = toyHash(sent), d2 = toyHash(got), ok = d1 === d2;
      view.innerHTML = '<div class="vtwo"><div class="vres"><b>Sender</b><div>1. Message: <span class="vmono">' + esc(sent) + "</span></div><div>2. Hash it to get a digest: <span class='vmono'>" + d1 + "</span></div><div>3. Encrypt the digest with the sender's <b>private key</b> = <b>digital signature</b>: <span class='vmono'>🔒" + d1.split("").reverse().join("") + "</span></div><div>4. Send message + signature</div></div>" +
        '<div class="vres"><b>Recipient' + (tamper ? " (message changed on the way!)" : "") + "</b><div>1. Message received: <span class='vmono'>" + esc(got) + "</span></div><div>2. Decrypt the signature with the sender's <b>public key</b>: digest <span class='vmono'>" + d1 + "</span></div><div>3. Hash the received message: <span class='vmono'>" + d2 + "</span></div><div>4. " + (ok ? "<span class='vok'>The digests match: the message is from the sender and unchanged.</span>" : "<span class='vbad'>The digests are different: the message has been altered or is not from the sender.</span>") + "</div></div></div>";
      bT.textContent = tamper ? "Remove the attacker" : "Let an attacker change the message";
    }
    bT = btn("", function(){ tamper = !tamper; draw(); });
    msg.addEventListener("input", draw);
    box.appendChild(el("p", null, "This uses a simple toy hash so you can see the idea; real systems use algorithms such as SHA-256."));
    box.appendChild(row(el("label", null, "Message: "), msg, bT)); box.appendChild(view); draw();
  });
})(typeof window !== "undefined" ? window : this);
