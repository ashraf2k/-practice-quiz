/* A Level iLearn visuals, part 3: graph algorithms, AI, sorting and searching, data structures, recursion, OOP and Prolog. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  /* ---------- 18.1 Dijkstra and A* on a graph ---------- */
  var GD = { nodes: { Begin: [50, 120], P: [170, 40], R: [170, 170], Q: [320, 40], S: [330, 130], T: [440, 175], U: [560, 110] },
    edges: [["Begin","P",9],["Begin","R",6],["Begin","U",21,[305,440]],["P","Q",5],["P","R",2],["Q","S",5],["R","S",8],["S","U",6],["S","T",3],["T","U",4]] };
  var GA = { nodes: { W: [50, 125], N1: [170, 40], N2: [170, 125], N3: [170, 210], N4: [330, 215], N5: [330, 115], N6: [450, 40], E: [560, 125] },
    edges: [["W","N1",6],["W","N2",4],["W","N3",7],["N1","N6",12],["N1","N2",3],["N2","N3",2],["N2","N5",7],["N3","N4",4],["N5","N6",4],["N5","N4",2],["N5","E",11],["N6","E",3],["N4","E",12]],
    h: { W: 18, N1: 15, N2: 14, N3: 13, N4: 9, N5: 7, N6: 3, E: 0 } };
  function adj(G){ var a = {}; Object.keys(G.nodes).forEach(function(n){ a[n] = []; }); G.edges.forEach(function(e){ a[e[0]].push([e[1], e[2]]); a[e[1]].push([e[0], e[2]]); }); return a; }
  function dijkstraSteps(G, start){
    var A = adj(G), dist = {}, prev = {}, done = {}, steps = [], names = Object.keys(G.nodes);
    names.forEach(function(n){ dist[n] = Infinity; }); dist[start] = 0;
    function snap(msg, cur, upd){ steps.push({ dist: JSON.parse(JSON.stringify(dist, function(k, v){ return v === Infinity ? "inf" : v; })), prev: JSON.parse(JSON.stringify(prev)), done: Object.keys(done), cur: cur, upd: upd || [], msg: msg }); }
    snap("Start: the start node is given the distance 0 and every other node ∞ (not yet reached).", null);
    while(true){
      var best = null; names.forEach(function(n){ if(!done[n] && dist[n] < Infinity && (best === null || dist[n] < dist[best])) best = n; });
      if(best === null) break;
      done[best] = true; var upd = [], notes = [];
      A[best].forEach(function(p){ var nb = p[0]; if(done[nb]) return; var nd = dist[best] + p[1]; if(nd < dist[nb]){ notes.push(nb + ": " + (dist[nb] === Infinity ? "∞" : dist[nb]) + " → <b>" + nd + "</b> (" + dist[best] + " + " + p[1] + ")"); dist[nb] = nd; prev[nb] = best; upd.push(nb); } else notes.push(nb + ": " + dist[best] + " + " + p[1] + " = " + nd + " is not better than " + dist[nb]); });
      snap("Take the unvisited node with the smallest distance: <b>" + best + " (" + dist[best] + ")</b>, and make it final. Check its neighbours: " + (notes.join("; ") || "none left to update") + ".", best, upd);
    }
    return steps;
  }
  V.dijkstraSteps = function(start){ return dijkstraSteps(GD, start || "Begin"); };
  function astarSteps(G, start, goal){
    var A = adj(G), g = {}, prev = {}, open = {}, closed = {}, steps = [];
    g[start] = 0; open[start] = true;
    function snap(msg, cur, path){ steps.push({ g: JSON.parse(JSON.stringify(g)), open: Object.keys(open), closed: Object.keys(closed), cur: cur, path: path || null, msg: msg }); }
    snap("Start: the open list holds the start node W with g = 0 (distance so far) and h = " + G.h[start] + " (the heuristic estimate to E), so f = g + h = " + G.h[start] + ".", null);
    while(true){
      var cur = null; Object.keys(open).forEach(function(n){ if(cur === null || g[n] + G.h[n] < g[cur] + G.h[cur]) cur = n; });
      if(cur === null) break;
      if(cur === goal){ var path = [goal], c = goal; while(prev[c]){ c = prev[c]; path.unshift(c); } snap("The open node with the lowest f is the goal <b>" + goal + "</b> (f = " + g[goal] + "). The shortest path is <b>" + path.join(" → ") + "</b> with length " + g[goal] + ".", cur, path); break; }
      delete open[cur]; closed[cur] = true; var notes = [];
      A[cur].forEach(function(p){ var nb = p[0]; if(closed[nb]) return; var ng = g[cur] + p[1]; if(g[nb] === undefined || ng < g[nb]){ g[nb] = ng; prev[nb] = cur; open[nb] = true; notes.push(nb + ": g = " + ng + ", h = " + G.h[nb] + ", <b>f = " + (ng + G.h[nb]) + "</b>"); } });
      snap("Expand <b>" + cur + "</b>, the open node with the lowest f (= " + (g[cur] + G.h[cur]) + "). Neighbours: " + (notes.join("; ") || "no improvements") + ".", cur);
    }
    return steps;
  }
  V.astarSteps = function(){ return astarSteps(GA, "W", "E"); };
  V.reg("graph", function(box, o){
    var astar = o.algo === "astar", G = astar ? GA : GD, steps = astar ? astarSteps(GA, "W", "E") : dijkstraSteps(GD, "Begin");
    var view = el("div"), tab = el("div"), log = el("div", "vlog");
    function show(i){
      var s = steps[i], h = "", pathEdges = {};
      if(astar && s.path) for(var k = 0; k + 1 < s.path.length; k++) pathEdges[s.path[k] + "|" + s.path[k + 1]] = pathEdges[s.path[k + 1] + "|" + s.path[k]] = 1;
      if(!astar && i === steps.length - 1){ var c = "U"; while(s.prev[c]){ pathEdges[c + "|" + s.prev[c]] = pathEdges[s.prev[c] + "|" + c] = 1; c = s.prev[c]; } }
      G.edges.forEach(function(e){
        var p = G.nodes[e[0]], q = G.nodes[e[1]], on = pathEdges[e[0] + "|" + e[1]], c = e[3], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
        if(c){ mx = 0.25 * p[0] + 0.5 * c[0] + 0.25 * q[0]; my = 0.25 * p[1] + 0.5 * c[1] + 0.25 * q[1]; h += '<path class="wr' + (on ? " v1" : "") + '" d="M' + p[0] + " " + p[1] + " Q" + c[0] + " " + c[1] + " " + q[0] + " " + q[1] + '"/>'; }
        else h += '<line class="wr' + (on ? " v1" : "") + '" x1="' + p[0] + '" y1="' + p[1] + '" x2="' + q[0] + '" y2="' + q[1] + '"/>';
        h += '<rect class="bx" x="' + (mx - 11) + '" y="' + (my - 9) + '" width="22" height="18" rx="5"/><text class="mid sm b" x="' + mx + '" y="' + (my + 4) + '">' + e[2] + "</text>";
      });
      Object.keys(G.nodes).forEach(function(n){
        var p = G.nodes[n], fin = astar ? s.closed.indexOf(n) >= 0 : s.done.indexOf(n) >= 0, isOpen = astar && s.open.indexOf(n) >= 0, cls = s.cur === n ? "ac" : (fin ? "ok" : (isOpen ? "wa" : "bx"));
        var lab = astar ? (s.g[n] !== undefined ? s.g[n] + "+" + G.h[n] + "=" + (s.g[n] + G.h[n]) : "h=" + G.h[n]) : (s.dist[n] === "inf" ? "∞" : s.dist[n]);
        h += '<circle fill="var(--surface)" cx="' + p[0] + '" cy="' + p[1] + '" r="27"/><circle class="' + cls + '" cx="' + p[0] + '" cy="' + p[1] + '" r="27"/><text class="mid b" x="' + p[0] + '" y="' + (p[1] - 2) + '">' + n + '</text><text class="mid sm" x="' + p[0] + '" y="' + (p[1] + 12) + '">' + lab + "</text>";
      });
      view.innerHTML = ""; view.appendChild(V.svg(620, astar ? 250 : 290, h));
      if(astar) tab.innerHTML = V.table(["Node", "Heuristic h", "g (so far)", "f = g + h", "List"], Object.keys(G.nodes).map(function(n){ var g = s.g[n]; return [n, G.h[n], g === undefined ? "–" : g, g === undefined ? "–" : g + G.h[n], s.closed.indexOf(n) >= 0 ? { t: "closed", c: "ok" } : (s.open.indexOf(n) >= 0 ? { t: "open", c: "wa" } : "")]; }));
      else tab.innerHTML = V.table(["Node", "Distance", "Came from", "Final?"], Object.keys(G.nodes).map(function(n){ return [n, s.dist[n] === "inf" ? "∞" : s.dist[n], s.prev[n] || "–", s.done.indexOf(n) >= 0 ? { t: "✓", c: "ok" } : ""]; }));
      log.innerHTML = s.msg;
    }
    var pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ show(0); }, ms: 2200 });
    box.appendChild(el("p", null, astar ? "Graph from Paper 33 Q9(b). Each node shows g + h = f. Yellow = open list, green = closed list, teal = being expanded." : "Graph from Paper 31 Q9(b). The number inside a node is its current shortest known distance from Begin. Green = final, teal = the node just made final."));
    box.appendChild(pl); box.appendChild(view); box.appendChild(log); box.appendChild(tab); show(0);
  });

  /* ---------- 18.1 a tiny neural network that learns ---------- */
  V.reg("nn", function(box){
    var sig = function(z){ return 1 / (1 + Math.exp(-z)); };
    var W1 = [[0.8, -0.5], [0.3, 0.9], [-0.7, 0.4]], B1 = [0.1, -0.2, 0.05], W2 = [0.6, -0.4, 0.7], B2 = -0.1, x = [0.9, 0.2], target = 1, lr = 1, errs = [];
    var view = el("div"), log = el("div", "vlog"), s1 = el("input"), s2 = el("input"), v1 = el("span"), v2 = el("span"), tsel = el("select", "vin");
    [s1, s2].forEach(function(s, k){ s.type = "range"; s.min = 0; s.max = 1; s.step = 0.05; s.value = x[k]; s.addEventListener("input", function(){ x[k] = +s.value; draw(); }); });
    tsel.innerHTML = "<option value='1'>target output 1</option><option value='0'>target output 0</option>"; tsel.addEventListener("change", function(){ target = +tsel.value; errs = []; draw(); });
    function fwd(){ var h = W1.map(function(w, j){ return sig(w[0] * x[0] + w[1] * x[1] + B1[j]); }), y = sig(W2[0] * h[0] + W2[1] * h[1] + W2[2] * h[2] + B2); return { h: h, y: y }; }
    function train(){
      var f = fwd(), dy = (f.y - target) * f.y * (1 - f.y), j;
      var dh = f.h.map(function(hj, jj){ return dy * W2[jj] * hj * (1 - hj); });
      for(j = 0; j < 3; j++){ W2[j] -= lr * dy * f.h[j]; W1[j][0] -= lr * dh[j] * x[0]; W1[j][1] -= lr * dh[j] * x[1]; B1[j] -= lr * dh[j]; } B2 -= lr * dy;
    }
    V.nnTrain = function(n){ for(var i = 0; i < n; i++) train(); return fwd().y; };
    function draw(){
      var f = fwd(), err = 0.5 * Math.pow(target - f.y, 2), h = "", I = [[60, 90], [60, 190]], H = [[250, 60], [250, 140], [250, 220]], O = [[440, 140]];
      function edge(a, b, w){ return '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" stroke="' + (w >= 0 ? "var(--accent)" : "var(--incorrect)") + '" stroke-width="' + (1 + Math.min(5, Math.abs(w) * 3.5)) + '" opacity=".75"/>'; }
      for(var j = 0; j < 3; j++){ h += edge(I[0], H[j], W1[j][0]) + edge(I[1], H[j], W1[j][1]) + edge(H[j], O[0], W2[j]); }
      function node(p, v, lab, cls){ return '<circle class="' + cls + '" cx="' + p[0] + '" cy="' + p[1] + '" r="26"/><text class="mid b" x="' + p[0] + '" y="' + (p[1] + 4) + '">' + (+v).toFixed(2) + '</text><text class="mid sm mu" x="' + p[0] + '" y="' + (p[1] - 31) + '">' + lab + "</text>"; }
      h += node(I[0], x[0], "input 1", "ac") + node(I[1], x[1], "input 2", "ac");
      f.h.forEach(function(v, k){ h += node(H[k], v, "hidden " + (k + 1), v > 0.5 ? "wa" : "bx"); });
      h += node(O[0], f.y, "output", Math.abs(f.y - target) < 0.15 ? "ok" : "no");
      h += '<text class="b" x="30" y="14">Input layer</text><text class="b" x="205" y="14">Hidden layer</text><text class="b" x="400" y="14">Output layer</text><text class="sm mu" x="30" y="268">Teal line = positive weight, red line = negative weight, thicker = bigger weight.</text>';
      view.innerHTML = ""; view.appendChild(V.svg(520, 275, h));
      log.innerHTML = "Output = <b>" + f.y.toFixed(3) + "</b>, target = " + target + ", error ½(target − output)² = <b>" + err.toFixed(4) + "</b>" + (errs.length ? "<br>Error after each training step: " + errs.map(function(e){ return e.toFixed(3); }).join(" → ") : "");
    }
    function step(n){ for(var i = 0; i < n; i++){ train(); } errs.push(0.5 * Math.pow(target - fwd().y, 2)); if(errs.length > 8) errs.shift(); draw(); }
    box.appendChild(el("p", null, "Move the input sliders to feed the network and watch the numbers flow forward (each node adds up its weighted inputs and applies an activation function). Then press <b>Train</b>: <b>back propagation</b> works backwards from the error and adjusts every weight a little to reduce it."));
    box.appendChild(row(el("label", null, "Input 1 "), s1, el("label", null, "Input 2 "), s2, tsel));
    box.appendChild(row(btn("Train 1 step", function(){ step(1); }, "p"), btn("Train 20 steps", function(){ step(20); }), btn("Forget everything", function(){ W1 = [[0.8, -0.5], [0.3, 0.9], [-0.7, 0.4]]; B1 = [0.1, -0.2, 0.05]; W2 = [0.6, -0.4, 0.7]; B2 = -0.1; errs = []; draw(); })));
    box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 19.1 sorting animations ---------- */
  function sortSteps(kind, arr0){
    var a = arr0.slice(), steps = [], cmp = 0, sw = 0, n = a.length, i, j, curKey = null;
    function snap(extra){ steps.push(Object.assign({ a: a.slice(), cmp: cmp, sw: sw, key: curKey }, extra)); }
    snap({ msg: "Unsorted list." });
    if(kind === "bubble"){
      var swapped = true, pass = 0;
      while(swapped){
        swapped = false; pass++;
        for(j = 0; j < n - pass; j++){
          cmp++; var need = a[j] > a[j + 1];
          snap({ c: [j, j + 1], msg: "Pass " + pass + ": compare " + a[j] + " and " + a[j + 1] + (need ? " — out of order, swap." : " — in order, no swap."), done: n - pass + 1 });
          if(need){ var t = a[j]; a[j] = a[j + 1]; a[j + 1] = t; sw++; swapped = true; snap({ s: [j, j + 1], msg: "Swapped.", done: n - pass + 1 }); }
        }
        snap({ msg: "End of pass " + pass + ": the largest unsorted value has bubbled to the end." + (swapped ? "" : " No swaps were needed, so the list is sorted and the algorithm stops early."), done: n - pass });
      }
    } else {
      for(i = 1; i < n; i++){
        var key = a[i]; j = i - 1; curKey = key;
        snap({ f: i, msg: "Take <b>" + key + "</b> from position " + (i + 1) + " and insert it into the sorted part on its left.", done: -1, sortedTo: i - 1 });
        while(j >= 0){ cmp++; var gt = a[j] > key; snap({ c: [j], f: i, msg: "Compare " + a[j] + " with " + key + (gt ? ": bigger, shift it one place right." : ": not bigger, the key goes here."), sortedTo: i - 1 }); if(!gt) break; a[j + 1] = a[j]; sw++; j--; snap({ f: -1, s: [j + 1], msg: "Shifted.", sortedTo: i - 1 }); }
        a[j + 1] = key; snap({ s: [j + 1], msg: "Insert " + key + " at position " + (j + 2) + ".", sortedTo: i }); curKey = null;
      }
    }
    snap({ msg: "Sorted!", done: 0, sortedTo: n - 1, fin: true });
    return steps;
  }
  V.sortSteps = sortSteps;
  V.reg("sort", function(box, o){
    var kind = o.kind || "bubble", arr = [5, 2, 9, 1, 7, 3, 8, 4], steps, view = el("div"), log = el("div", "vlog"), stats = el("div"), pl, bK = [];
    function show(i){
      var s = steps[i], n = s.a.length, h = '<div class="vbars">';
      s.a.forEach(function(v, k){
        var cls = ""; if(s.fin) cls = "dn"; else if(s.c && s.c.indexOf(k) >= 0) cls = "cmp"; else if(s.s && s.s.indexOf(k) >= 0) cls = "swp"; else if(s.f === k) cls = "fd";
        else if(kind === "bubble" && s.done !== undefined && k >= s.done) cls = "dn"; else if(kind === "insertion" && s.sortedTo !== undefined && k <= s.sortedTo) cls = "dn";
        h += '<div class="vbar ' + cls + '" style="height:' + (v * 14 + 6) + 'px">' + v + "</div>";
      });
      view.innerHTML = h + "</div>"; log.innerHTML = s.msg; stats.innerHTML = "Comparisons: <b>" + s.cmp + "</b> &nbsp; " + (kind === "bubble" ? "Swaps" : "Shifts") + ": <b>" + s.sw + "</b>" + (s.key != null ? " &nbsp; Value held in a temporary variable: <b>" + s.key + "</b>" : "");
    }
    function build(){ steps = steps || sortSteps(kind, arr); if(pl) pl.remove(); pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ show(0); }, ms: 500 }); box.insertBefore(pl, view); }
    function newArr(a){ arr = a; steps = sortSteps(kind, arr); if(pl) pl.halt(); build(); }
    function shuffle(){ var a = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(function(){ return Math.random() - 0.5; }).slice(0, 8); newArr(a); }
    box.appendChild(row(btn("Shuffle", shuffle), btn("Already sorted (best case)", function(){ newArr([1, 2, 3, 4, 5, 6, 7, 8]); }), btn("Reversed (worst case)", function(){ newArr([8, 7, 6, 5, 4, 3, 2, 1]); })));
    box.appendChild(view); box.appendChild(stats); box.appendChild(log); steps = sortSteps(kind, arr); build();
    box.insertBefore(el("p", null, kind === "bubble" ? "Bubble sort with the early-stop improvement: yellow = being compared, red = swapped, green = in its final place." : "Insertion sort: purple = the value being inserted, yellow = compared, red = moved, green = the sorted part on the left."), box.firstChild);
  });

  /* ---------- 19.1 linear and binary search ---------- */
  V.reg("search", function(box){
    var data = [3, 8, 12, 17, 23, 29, 34, 41, 47, 52, 58, 63, 71, 78, 85], mode = "binary", inp = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), pl, steps, tabs = row(), stats = el("div");
    inp.type = "number"; inp.value = 52; inp.style.width = "80px"; inp.setAttribute("aria-label", "Value to find");
    function mkSteps(t){
      var s = [], c = 0, i;
      if(mode === "linear"){ for(i = 0; i < data.length; i++){ c++; var hit = data[i] === t; s.push({ chk: i, c: c, hit: hit, msg: "Compare item " + (i + 1) + " (" + data[i] + ") with " + t + (hit ? ": <b>found</b> at position " + (i + 1) + "." : ": not equal, move to the next.") }); if(hit) return s; } s.push({ c: c, end: true, msg: "The end of the list is reached: <b>" + t + " is not in the list</b>." }); return s; }
      var L = 0, R = data.length - 1;
      while(L <= R){ var M = Math.floor((L + R) / 2); c++; var v = data[M]; s.push({ L: L, R: R, chk: M, c: c, hit: v === t, msg: "Left = " + (L + 1) + ", Right = " + (R + 1) + ", Mid = (" + (L + 1) + " + " + (R + 1) + ") DIV 2 = " + (M + 1) + ". Item " + (M + 1) + " is " + v + (v === t ? ": equal, <b>found</b>." : v < t ? ", which is less than " + t + ": discard the left half (Left = Mid + 1)." : ", which is more than " + t + ": discard the right half (Right = Mid − 1).") }); if(v === t) return s; if(v < t) L = M + 1; else R = M - 1; }
      s.push({ c: c, end: true, L: L, R: R, msg: "Left has passed Right, so the search area is empty: <b>" + t + " is not in the list</b>." }); return s;
    }
    function show(i){
      var s = steps[i], h = '<div class="vcells">';
      data.forEach(function(v, k){ var cls = ""; if(mode === "binary" && s.L !== undefined && (k < s.L || k > s.R)) cls = "no"; if(s.chk === k) cls = s.hit ? "ok" : "hi"; if(mode === "linear" && s.chk !== undefined && k < s.chk) cls = "no"; h += '<div class="vcell ' + cls + '"><small>' + (k + 1) + "</small>" + v + "</div>"; });
      h += "</div>"; if(mode === "binary" && s.L !== undefined && s.chk !== undefined) h += "<div class='vmono' style='font-size:13px'>Left = " + (s.L + 1) + ", Mid = " + (s.chk + 1) + ", Right = " + (s.R + 1) + "</div>";
      view.innerHTML = h; log.innerHTML = s.msg; stats.innerHTML = "Comparisons so far: <b>" + s.c + "</b> (the list has " + data.length + " items)";
    }
    function build(){ if(pl) pl.remove(); steps = mkSteps(Math.floor(+inp.value)); pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ view.innerHTML = ""; log.innerHTML = "Press <b>Step</b> to start the search."; stats.innerHTML = ""; }, ms: 1400 }); box.insertBefore(pl, view); Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.m === mode ? " on" : ""); }); }
    [["linear", "Linear search"], ["binary", "Binary search"]].forEach(function(m){ var b = btn(m[1], function(){ mode = m[0]; if(pl) pl.halt(); build(); }); b.dataset.m = m[0]; tabs.appendChild(b); });
    inp.addEventListener("change", function(){ if(pl) pl.halt(); build(); });
    box.appendChild(el("p", null, "The list is sorted (a binary search needs that). Choose a value to find, then step through. Try 52, 3, 85 and 50 (not in the list)."));
    box.appendChild(tabs); box.appendChild(row(el("label", null, "Find: "), inp)); box.appendChild(view); box.appendChild(stats); box.appendChild(log); build();
  });

  /* ---------- 19.1 data structures ---------- */
  V.reg("stack", function(box){
    var N = 6, st = [], inp = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), n = 10;
    inp.type = "number"; inp.value = n; inp.style.width = "80px";
    function draw(msg){
      var h = '<div class="vtwo"><div><div class="vstack" style="min-height:' + (N * 34) + 'px;width:110px">' + st.map(function(v, k){ return "<i" + (k === st.length - 1 ? ' class="new"' : "") + ">" + v + "</i>"; }).join("") + "</div><div style='font-size:12px;color:var(--muted)'>capacity " + N + "</div></div><div><div class='vres'>TopPointer = <b>" + (st.length - 1) + "</b>" + (st.length === 0 ? " (empty)" : st.length === N ? " (full)" : "") + "</div></div></div>";
      view.innerHTML = h; log.innerHTML = msg || "A stack is LIFO: the last item pushed is the first popped.";
    }
    box.appendChild(row(el("label", null, "Item: "), inp, btn("Push", function(){ if(st.length === N){ draw("<span class='vbad'>Stack is full</span>: nothing is added."); return; } st.push(inp.value); inp.value = +inp.value + 1; draw("TopPointer + 1, then store <b>" + st[st.length - 1] + "</b> at the top."); }, "p"), btn("Pop", function(){ if(!st.length){ draw("<span class='vbad'>Stack is empty</span>: nothing to pop."); return; } var v = st.pop(); draw("Return <b>" + v + "</b> from the top, then TopPointer − 1."); }), btn("Peek", function(){ draw(st.length ? "Peek returns <b>" + st[st.length - 1] + "</b> without removing it." : "<span class='vbad'>Stack is empty</span>."); })));
    box.appendChild(view); box.appendChild(log); draw();
  });
  V.reg("queue", function(box){
    var N = 6, circ = false, arr, head, tail, len, inp = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), n = 10, tabs = row();
    inp.type = "number"; inp.value = n; inp.style.width = "80px";
    function reset(){ arr = []; for(var i = 0; i < N; i++) arr.push(null); head = 0; tail = 0; len = 0; }
    function draw(msg){
      var h = '<div class="vcells">'; arr.forEach(function(v, k){ var cls = ""; if(v !== null) cls = "hi"; h += '<div class="vcell ' + cls + '"><small>' + k + (k === head ? " ◀ head" : "") + (k === tail ? " tail ▶" : "") + "</small>" + (v === null ? "&nbsp;" : v) + "</div>"; });
      h += "</div><div class='vres'>" + (circ ? "front = <b>" + head + "</b>, rear (next free) = <b>" + tail + "</b>, length = <b>" + len + "</b>" : "head = <b>" + head + "</b>, tail (next free) = <b>" + tail + "</b>") + "</div>";
      view.innerHTML = h; log.innerHTML = msg || (circ ? "A circular queue wraps round to location 0, so the space freed at the front is reused." : "A linear queue never reuses locations before the head, even after items are removed.");
      Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + ((b.dataset.m === "c") === circ ? " on" : ""); });
    }
    function enq(){
      if(circ){ if(len === N){ draw("<span class='vbad'>Queue is full</span>."); return; } arr[tail] = inp.value; tail = (tail + 1) % N; len++; }
      else { if(tail === N){ draw("<span class='vbad'>The queue is full</span> (tail has reached the end), although " + head + " location" + (head === 1 ? " is" : "s are") + " free at the front. A circular queue would reuse them."); return; } arr[tail] = inp.value; tail++; }
      inp.value = +inp.value + 1; draw("Item stored at the tail, then the tail pointer moves on.");
    }
    function deq(){
      if(circ){ if(len === 0){ draw("<span class='vbad'>Queue is empty</span>."); return; } var v = arr[head]; arr[head] = null; head = (head + 1) % N; len--; draw("Removed <b>" + v + "</b> from the front; the front pointer moves on."); }
      else { if(head === tail){ draw("<span class='vbad'>Queue is empty</span>."); return; } var w = arr[head]; arr[head] = null; head++; draw("Removed <b>" + w + "</b> from the head; the head pointer moves on."); }
    }
    [["l", "Linear queue (head and tail pointers)"], ["c", "Circular queue"]].forEach(function(m){ var b = btn(m[1], function(){ circ = m[0] === "c"; reset(); draw(); }); b.dataset.m = m[0]; tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(row(el("label", null, "Item: "), inp, btn("Enqueue", enq, "p"), btn("Dequeue", deq), btn("Empty it", function(){ reset(); draw(); })));
    box.appendChild(view); box.appendChild(log); reset(); draw();
  });
  V.reg("llist", function(box){
    var N = 7, D, P, start, heap, view = el("div"), log = el("div", "vlog"), inp = el("input", "vin mono"), n = 40;
    inp.type = "number"; inp.value = n; inp.style.width = "80px";
    function reset(){ D = []; P = []; for(var i = 0; i < N; i++){ D.push(null); P.push(i + 1 < N ? i + 1 : -1); } start = -1; heap = 0; }
    function chain(s){ var out = [], p = s, g = 0; while(p !== -1 && g++ < 20){ out.push(p); p = P[p]; } return out; }
    function draw(msg, hl){
      var order = chain(start), hp = chain(heap), h = '<div class="vtwo"><div class="vscroll"><table class="vt"><tr><th>Index</th><th>Data</th><th>Pointer</th></tr>';
      for(var i = 0; i < N; i++) h += "<tr><td" + (hl === i ? ' class="hi"' : "") + ">" + i + "</td><td" + (hl === i ? ' class="hi"' : "") + ">" + (D[i] === null ? "" : D[i]) + "</td><td" + (hl === i ? ' class="hi"' : "") + ">" + P[i] + "</td></tr>";
      h += "</table></div><div><div class='vres'>StartPointer = <b>" + start + "</b><br>HeapStartPointer = <b>" + heap + "</b></div><div class='vres'><b>The list in order:</b><br>" + (order.length ? order.map(function(k){ return D[k] + " <small>[" + k + "]</small>"; }).join(" → ") + " → null" : "empty") + "</div><div class='vres'><b>Free locations (the heap):</b><br>" + (hp.length ? hp.join(" → ") + " → null" : "none: the list is full") + "</div></div></div>";
      view.innerHTML = h; log.innerHTML = msg || "Pointers hold the index of the next item; −1 is the null pointer.";
    }
    function addStart(){ if(heap === -1){ draw("<span class='vbad'>Linked list full</span>."); return; } var tmp = start; start = heap; heap = P[heap]; D[start] = inp.value; P[start] = tmp; var at = start; inp.value = +inp.value + 1; draw("Added <b>" + D[at] + "</b> at the <b>start</b>: it takes the first free location (" + at + "), points to the old start, and StartPointer moves to it.", at); }
    function addEnd(){ if(heap === -1){ draw("<span class='vbad'>Linked list full</span>."); return; } var nw = heap; heap = P[nw]; D[nw] = inp.value; P[nw] = -1; if(start === -1) start = nw; else { var last = chain(start).pop(); P[last] = nw; } inp.value = +inp.value + 1; draw("Added <b>" + D[nw] + "</b> at the <b>end</b>: follow the pointers to the last node, then make its pointer point to the new node (" + nw + ").", nw); }
    function del(){
      var v = inp.value, p = start, prev = -1; while(p !== -1 && String(D[p]) !== String(v)){ prev = p; p = P[p]; }
      if(p === -1){ draw("<span class='vbad'>" + esc(v) + " is not in the list.</span>"); return; }
      if(prev === -1) start = P[p]; else P[prev] = P[p]; P[p] = heap; heap = p; D[p] = null; draw("Deleted <b>" + esc(v) + "</b>: the pointer of the previous node skips over it, and its location (" + p + ") joins the front of the heap of free locations.", p);
    }
    box.appendChild(row(el("label", null, "Item: "), inp, btn("Add at start", addStart, "p"), btn("Add at end", addEnd, "p"), btn("Delete this value", del), btn("Empty it", function(){ reset(); draw(); })));
    box.appendChild(view); box.appendChild(log); reset(); draw();
  });
  function insertTree(T, v){
    T.push({ d: v, l: -1, r: -1 }); var ni = T.length - 1; if(ni === 0) return;
    var p = 0; while(true){ if(v < T[p].d){ if(T[p].l === -1){ T[p].l = ni; return; } p = T[p].l; } else { if(T[p].r === -1){ T[p].r = ni; return; } p = T[p].r; } }
  }
  V.insertTree = insertTree;
  V.reg("btree", function(box){
    var T = [], inp = el("input", "vin mono"), view = el("div"), log = el("div", "vlog"), arrv = el("div"), seq = [], hl = -1, pl, plBox = el("div"), kind = "in", tabs = row();
    inp.value = "50"; inp.type = "number"; inp.style.width = "80px";
    function trav(i, k, out){ if(i === -1) return; if(k === "pre") out.push(i); trav(T[i].l, k, out); if(k === "in") out.push(i); trav(T[i].r, k, out); if(k === "post") out.push(i); }
    function layout(){ var pos = {}, xi = 0, depth = {}; (function go(i, d){ if(i === -1) return; go(T[i].l, d + 1); pos[i] = [xi++, d]; go(T[i].r, d + 1); })(0, 0); return pos; }
    function draw(){
      if(!T.length){ view.innerHTML = "<p>The tree is empty. Insert a value.</p>"; arrv.innerHTML = ""; return; }
      var pos = layout(), n = Object.keys(pos).length, W = Math.max(300, n * 54 + 40), maxD = 0; Object.keys(pos).forEach(function(k){ maxD = Math.max(maxD, pos[k][1]); });
      var xy = function(i){ return [30 + pos[i][0] * 54, 30 + pos[i][1] * 62]; }, h = "";
      T.forEach(function(nd, i){ [nd.l, nd.r].forEach(function(c){ if(c !== -1){ var a = xy(i), b = xy(c); h += '<line class="wr" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>'; } }); });
      T.forEach(function(nd, i){ var p = xy(i), visited = seq.slice(0, hl + 1).indexOf(i) >= 0; h += '<circle class="' + (seq[hl] === i ? "ac" : (visited ? "ok" : "bx")) + '" cx="' + p[0] + '" cy="' + p[1] + '" r="21"/><text class="mid b" x="' + p[0] + '" y="' + (p[1] + 4) + '">' + nd.d + "</text>"; });
      view.innerHTML = ""; var s = V.svg(W, 60 + maxD * 62, h); s.style.maxWidth = W + "px"; view.appendChild(s);
      arrv.innerHTML = V.table(["Row", "LeftPointer", "Item", "RightPointer"], T.map(function(nd, i){ var c = seq[hl] === i ? "hi" : ""; return [{ t: i, c: c }, { t: nd.l, c: c }, { t: nd.d, c: c }, { t: nd.r, c: c }]; }));
    }
    function startTrav(k){
      kind = k; seq = []; if(T.length) trav(0, k, seq); hl = -1; if(pl) pl.remove();
      pl = V.player(plBox, { count: function(){ return seq.length; }, show: function(i){ hl = i; draw(); log.innerHTML = (k === "in" ? "In-order (left, node, right)" : k === "pre" ? "Pre-order (node, left, right)" : "Post-order (left, right, node)") + ": <b>" + seq.slice(0, i + 1).map(function(x){ return T[x].d; }).join(", ") + "</b>"; }, reset: function(){ hl = -1; draw(); log.innerHTML = "Press <b>Step</b> to walk the tree."; }, ms: 800 });
      plBox.appendChild(pl); Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); });
    }
    function ins(vv){ insertTree(T, vv); startTrav(kind); }
    [["in", "In-order"], ["pre", "Pre-order"], ["post", "Post-order"]].forEach(function(t){ var b = btn(t[1], function(){ startTrav(t[0]); }); b.dataset.k = t[0]; tabs.appendChild(b); });
    box.appendChild(el("p", null, "Smaller values go to the left, greater or equal values to the right. The table shows how the same tree is held in an array of nodes (−1 is the null pointer)."));
    box.appendChild(row(el("label", null, "Insert: "), inp, btn("Insert", function(){ ins(+inp.value); inp.value = Math.floor(Math.random() * 200); }, "p"), btn("Paper 43 data", function(){ T = []; [50, 26, 120, 236, 2, 16, 67, 49, 165, 15].forEach(function(v){ insertTree(T, v); }); startTrav("in"); log.innerHTML = "The ten values of Paper 43 Q3, inserted in order."; }), btn("Clear", function(){ T = []; startTrav(kind); log.innerHTML = ""; })));
    box.appendChild(tabs); box.appendChild(plBox); box.appendChild(view); box.appendChild(log); box.appendChild(arrv); startTrav("in");
  });

  /* ---------- 19.1 Big O ---------- */
  V.reg("bigo", function(box){
    var sl = el("input"), view = el("div"), cur = el("div");
    sl.type = "range"; sl.min = 1; sl.max = 20; sl.value = 8; sl.setAttribute("aria-label", "Number of items n");
    var F = [["O(1)", function(n){ return 1; }, "#0F8A6B"], ["O(log n)", function(n){ return Math.log2(n); }, "#1D4ED8"], ["O(n)", function(n){ return n; }, "#146C6A"], ["O(n log n)", function(n){ return n * Math.log2(n); }, "#B45309"], ["O(n²)", function(n){ return n * n; }, "#C4423B"], ["O(2ⁿ)", function(n){ return Math.pow(2, n); }, "#7C3AED"]];
    function draw(){
      var n = +sl.value, W = 560, H = 230, ymax = 400, h = '<line class="wr" x1="40" y1="200" x2="' + W + '" y2="200"/><line class="wr" x1="40" y1="200" x2="40" y2="10"/><text class="sm mu" x="42" y="12">steps (cut off at 400)</text><text class="sm mu end" x="' + W + '" y="218">number of items n</text>';
      F.forEach(function(f, fi){ var pts = []; for(var k = 1; k <= 20; k++){ var y = Math.min(ymax, f[1](k)); pts.push((40 + (k - 1) * 26) + "," + (200 - y / ymax * 185)); } h += '<polyline fill="none" stroke="' + f[2] + '" stroke-width="2.5" points="' + pts.join(" ") + '"/><text class="sm b" fill="' + f[2] + '" style="fill:' + f[2] + '" x="' + (W - 6) + '" y="' + (24 + fi * 14) + '" text-anchor="end">' + f[0] + "</text>"; });
      h += '<line stroke="var(--ink)" stroke-dasharray="4 3" x1="' + (40 + (n - 1) * 26) + '" y1="10" x2="' + (40 + (n - 1) * 26) + '" y2="200"/>';
      view.innerHTML = ""; view.appendChild(V.svg(W, H, h));
      cur.innerHTML = V.table(["n = " + n].concat(F.map(function(f){ return f[0]; })), [["steps"].concat(F.map(function(f){ var v = f[1](n); return Math.round(v * 10) / 10; }))]);
    }
    sl.addEventListener("input", draw);
    box.appendChild(el("p", null, "Move the slider to change the number of items n and compare how many steps each order of growth needs. O(2ⁿ) explodes almost at once; O(log n) barely moves."));
    box.appendChild(row(el("label", null, "n = "), sl)); box.appendChild(view); box.appendChild(cur); draw();
  });

  /* ---------- 19.2 recursion: the call stack ---------- */
  V.reg("recur", function(box){
    var sl = el("input"), view = el("div"), log = el("div", "vlog"), pl, steps;
    sl.type = "range"; sl.min = 1; sl.max = 6; sl.value = 4; sl.setAttribute("aria-label", "Factorial of n");
    function mk(n){
      var s = [], st = [], k, res = {};
      for(k = n; k >= 0; k--){ st.push("Factorial(" + k + ")"); s.push({ st: st.slice(), msg: k === 0 ? "<b>Factorial(0)</b>: Number = 0, the <b>base case</b>, so it returns 1 without calling itself again." : "<b>Factorial(" + k + ")</b> is called: Number is not 0, so it must calculate " + k + " * Factorial(" + (k - 1) + ") and waits for that answer (winding)." }); }
      var val = 1; s.push({ st: st.slice(), msg: "Now the calls return, one by one (unwinding). Factorial(0) returns 1.", ret: 1 });
      st.pop();
      for(k = 1; k <= n; k++){ val = val * k; s.push({ st: st.slice(), msg: "Factorial(" + k + ") receives the answer and returns " + k + " * " + (val / k) + " = <b>" + val + "</b>.", ret: val }); st.pop(); }
      s.push({ st: [], msg: "The original call returns <b>" + val + "</b>: Factorial(" + n + ") = " + val + "." });
      return s;
    }
    function show(i){ var s = steps[i]; view.innerHTML = '<div class="vtwo"><div><b>Call stack</b> (a new frame for each call; the newest is on top)<div class="vstack" style="width:170px">' + s.st.map(function(f, k){ return "<i" + (k === s.st.length - 1 ? ' class="new"' : "") + ">" + f + "</i>"; }).join("") + "</div></div><div>" + (s.ret !== undefined ? "<div class='vres'>Value returned: <b class='big'>" + s.ret + "</b></div>" : "") + "</div></div>"; log.innerHTML = s.msg; }
    function build(){ if(pl) pl.remove(); steps = mk(+sl.value); pl = V.player(box, { count: function(){ return steps.length; }, show: show, reset: function(){ view.innerHTML = ""; log.innerHTML = "Press <b>Step</b> to call Factorial(" + sl.value + ")."; }, ms: 1300 }); box.insertBefore(pl, view); }
    var lab = el("label", null, "Calculate Factorial of: 4");
    sl.addEventListener("input", function(){ lab.textContent = "Calculate Factorial of: " + sl.value; if(pl) pl.halt(); build(); });
    box.appendChild(el("pre", "ln-pre", "FUNCTION Factorial(Number : INTEGER) RETURNS INTEGER\n   IF Number = 0 THEN\n      RETURN 1                      // base case\n   ELSE\n      RETURN Number * Factorial(Number - 1)   // general case\n   ENDIF\nENDFUNCTION"));
    box.appendChild(row(lab, sl)); box.appendChild(view); box.appendChild(log); build();
  });

  /* ---------- 20.1 object-oriented programming diagrams ---------- */
  V.reg("oop", function(box, o){
    var T = {
      "Class and objects": { h: function(){ return '<rect class="ac" x="20" y="20" width="200" height="110" rx="8"/><text class="b mid" x="120" y="42">Class: Employee</text><line class="wr" x1="20" y1="52" x2="220" y2="52"/><text x="30" y="72">- name : STRING</text><text x="30" y="90">- salary : REAL</text><line class="wr" x1="20" y1="100" x2="220" y2="100"/><text x="30" y="118">+ GetName()  + SetSalary()</text><text class="mu" x="245" y="75">instantiate ➜</text><rect class="ok" x="340" y="10" width="200" height="60" rx="8"/><text class="b mid" x="440" y="32">Object: Sam</text><text class="mid sm" x="440" y="52">name = "Sam", salary = 30000</text><rect class="ok" x="340" y="85" width="200" height="60" rx="8"/><text class="b mid" x="440" y="107">Object: Priya</text><text class="mid sm" x="440" y="127">name = "Priya", salary = 42000</text>'; }, t: "A <b>class</b> is a template that defines the attributes (data) and methods (actions). An <b>object</b> is an <b>instance</b> of the class created while the program runs; each object holds its own values. Attributes are normally <b>private</b>, with public <b>getters</b> and <b>setters</b>." },
      "Inheritance": { h: function(){ return '<rect class="ac" x="190" y="10" width="220" height="70" rx="8"/><text class="b mid" x="300" y="32">Employee (base class)</text><text class="mid sm" x="300" y="52">name, salary</text><text class="mid sm" x="300" y="68">GetName(), CalculatePay()</text><line class="wr" x1="300" y1="80" x2="300" y2="105"/><line class="wr" x1="130" y1="105" x2="470" y2="105"/><line class="wr" x1="130" y1="105" x2="130" y2="125"/><line class="wr" x1="470" y1="105" x2="470" y2="125"/><polygon points="292,92 308,92 300,80" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/><rect class="ok" x="30" y="125" width="200" height="75" rx="8"/><text class="b mid" x="130" y="147">FullTime (derived class)</text><text class="mid sm" x="130" y="167">+ annualBonus</text><text class="mid sm" x="130" y="185">inherits everything above</text><rect class="ok" x="370" y="125" width="200" height="75" rx="8"/><text class="b mid" x="470" y="147">PartTime (derived class)</text><text class="mid sm" x="470" y="167">+ hourlyRate, hours</text><text class="mid sm" x="470" y="185">inherits everything above</text>'; }, t: "<b>Inheritance</b> (an <b>'is a'</b> relationship): a derived class inherits the attributes and methods of its base class and can add new ones. A FullTime employee <i>is an</i> Employee. This avoids writing the same code twice and allows <b>polymorphism</b>: a derived class can <b>override</b> a method such as CalculatePay() with its own version." },
      "Containment (aggregation)": { h: function(){ return '<rect class="ac" x="30" y="40" width="190" height="80" rx="8"/><text class="b mid" x="125" y="62">Flight</text><text class="mid sm" x="125" y="82">flightNumber, destination</text><text class="mid sm" x="125" y="100">passengers : ARRAY OF Passenger</text><line class="wr" x1="220" y1="80" x2="330" y2="80"/><polygon points="220,80 232,72 244,80 232,88" fill="var(--surface)" stroke="var(--muted)" stroke-width="2"/><rect class="ok" x="330" y="20" width="200" height="50" rx="8"/><text class="b mid" x="430" y="42">Passenger 1</text><text class="mid sm" x="430" y="58">name, seat</text><rect class="ok" x="330" y="90" width="200" height="50" rx="8"/><text class="b mid" x="430" y="112">Passenger 2</text><text class="mid sm" x="430" y="128">name, seat</text>'; }, t: "<b>Containment (aggregation)</b> is a <b>'has a'</b> relationship: one class contains objects of another class as attributes. A Flight <i>has</i> Passengers. The Passenger objects can exist separately from the Flight. Compare with inheritance ('is a')." }
    };
    var view = el("div"), txt = el("div", "vlog"), tabs = row(), cur = o.tab || "Class and objects";
    function draw(){ view.innerHTML = ""; view.appendChild(V.svg(600, 215, T[cur].h())); txt.innerHTML = T[cur].t; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.textContent === cur ? " on" : ""); }); }
    Object.keys(T).forEach(function(k){ tabs.appendChild(btn(k, function(){ cur = k; draw(); })); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(txt); draw();
  });

  /* ---------- 20.1 declarative programming: ask Prolog questions ---------- */
  V.reg("prolog", function(box, o){
    var U = root.ILEARN_UTIL;
    if(!U || !U.ask){ box.appendChild(el("p", null, "This tool needs the Prolog engine, which did not load.")); return; }
    var KB = { countries: { name: "Countries and languages", text: U.KB1_TEXT, q: "language(Country,english)" }, shop: { name: "Home-cinema shop (Paper 31 Q11)", text: U.KB31_TEXT, q: "may_buy_device(D,susan)" } };
    var cur = o.kb || "countries", tabs = row(), kbv = el("pre", "ln-pre"), inp = el("input", "vin mono"), out = el("div", "vres"), kb;
    inp.style.width = "min(100%,380px)"; inp.setAttribute("aria-label", "Prolog goal");
    function run(){
      var q = inp.value.trim().replace(/\.$/, ""), vars = (q.match(/\b[A-Z][A-Za-z0-9_]*\b/g) || []).filter(function(v, i, a){ return a.indexOf(v) === i; });
      if(!q){ out.innerHTML = "Type a goal."; return; }
      try {
        if(vars.length > 1){ out.innerHTML = "Use <b>one variable</b> at a time in this tool (for example <span class='vmono'>language(Country,english)</span>)."; return; }
        var r = U.ask(kb, q, vars[0] || null);
        out.innerHTML = vars.length ? (r.length ? "<span class='vmono'>" + vars[0] + "</span> = <b>" + r.map(esc).join("</b>, <b>") + "</b>" : "<b>false</b> (no solution)") : (r.length ? "<b>true</b>" : "<b>false</b>");
      } catch(e){ out.innerHTML = "<span class='vbad'>That goal could not be understood.</span> Write it like <span class='vmono'>owns(projector,Owner)</span>."; }
    }
    function load(k){ cur = k; kb = U.parseKB(KB[k].text); kbv.textContent = KB[k].text.map(function(c, i){ return c; }).join("\n"); inp.value = KB[k].q; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); }); run(); }
    Object.keys(KB).forEach(function(k){ var b = btn(KB[k].name, function(){ load(k); }); b.dataset.k = k; tabs.appendChild(b); });
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") run(); });
    box.appendChild(el("p", null, "A knowledge base of facts and rules is shown below. Type a goal; <b>Variables start with a capital letter</b>, atoms with a lower-case letter. The engine finds every answer that makes the goal true."));
    kbv.style.maxHeight = "190px"; kbv.style.overflow = "auto";
    box.appendChild(tabs); box.appendChild(kbv); box.appendChild(row(inp, btn("Ask", run, "p"))); box.appendChild(out); load(cur);
  });
})(typeof window !== "undefined" ? window : this);
