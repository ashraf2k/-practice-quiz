/* iLearn (10BR) visuals, part 3: flowcharts (topic 7.2).
   A small flowchart engine draws real syllabus-style flowcharts as SVG: rounded terminators (START / END), parallelograms for input and output,
   rectangles for processes, diamonds for decisions with YES / NO exits, a subroutine box, and straight arrows with arrowheads.
   Widgets: flowsym (learn the symbols and quiz), flowrun (run a flowchart step by step with a trace table), flowfix (find the drawing mistake).
   All artwork is original, drawn in code. Colours come from the page theme variables. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  /* ---------- drawing ---------- */
  var DIM = { term: [130, 38], io: [180, 44], proc: [180, 44], dec: [200, 76], sub: [180, 44] }, SKEW = 14;
  var CLS = { term: "vi", io: "ac", proc: "bx", dec: "wa", sub: "ok" };
  function dims(n){ var d = DIM[n.t]; return [n.w || d[0], n.h || d[1]]; }
  function pt(n, side){
    var d = dims(n), x = n.x, y = n.y, w = d[0], h = d[1];
    if(n.t === "io"){ if(side === "l") return [x - w / 2 + SKEW / 2, y]; if(side === "r") return [x + w / 2 - SKEW / 2, y]; }
    return side === "t" ? [x, y - h / 2] : side === "b" ? [x, y + h / 2] : side === "l" ? [x - w / 2, y] : [x + w / 2, y];
  }
  function shape(n){
    var d = dims(n), x = n.x, y = n.y, w = d[0], h = d[1], c = CLS[n.t], l = x - w / 2, r = x + w / 2, t = y - h / 2, b = y + h / 2;
    if(n.t === "term") return '<rect class="' + c + '" x="' + l + '" y="' + t + '" width="' + w + '" height="' + h + '" rx="' + h / 2 + '"/>';
    if(n.t === "io") return '<polygon class="' + c + '" points="' + (l + SKEW) + "," + t + " " + r + "," + t + " " + (r - SKEW) + "," + b + " " + l + "," + b + '"/>';
    if(n.t === "dec") return '<polygon class="' + c + '" points="' + x + "," + t + " " + r + "," + y + " " + x + "," + b + " " + l + "," + y + '"/>';
    if(n.t === "sub") return '<rect class="' + c + '" x="' + l + '" y="' + t + '" width="' + w + '" height="' + h + '" rx="2"/><line class="fl2" x1="' + (l + 12) + '" y1="' + t + '" x2="' + (l + 12) + '" y2="' + b + '"/><line class="fl2" x1="' + (r - 12) + '" y1="' + t + '" x2="' + (r - 12) + '" y2="' + b + '"/>';
    return '<rect class="' + c + '" x="' + l + '" y="' + t + '" width="' + w + '" height="' + h + '" rx="3"/>';
  }
  function label(n){
    var L = n.txt, y0 = n.y - (L.length - 1) * 8 + 4;
    return L.map(function(s, i){ return '<text class="mid fnt' + (n.sm ? " sm2" : "") + '" x="' + n.x + '" y="' + (y0 + i * 16) + '">' + esc(s) + "</text>"; }).join("");
  }
  function head(x1, y1, x2, y2){
    var a = Math.atan2(y2 - y1, x2 - x1), s = 10, p1 = [x2 - s * Math.cos(a - .42), y2 - s * Math.sin(a - .42)], p2 = [x2 - s * Math.cos(a + .42), y2 - s * Math.sin(a + .42)];
    return x2 + "," + y2 + " " + p1[0].toFixed(1) + "," + p1[1].toFixed(1) + " " + p2[0].toFixed(1) + "," + p2[1].toFixed(1);
  }
  function edgePts(C, e){ var p = [pt(C.N[e.f], e.fs)]; (e.via || []).forEach(function(q){ p.push(q); }); p.push(pt(C.N[e.t], e.ts)); return p; }
  function draw(C){
    var s = "";
    C.E.forEach(function(e, i){
      var p = edgePts(C, e), d = p.map(function(q, k){ return (k ? "L" : "M") + q[0] + " " + q[1]; }).join(" "), a = p[p.length - 2], z = p[p.length - 1];
      var lab = "";
      if(e.l){
        var f = p[0], lp = e.lp || (e.fs === "l" ? [f[0] - 8, f[1] - 7] : e.fs === "r" ? [f[0] + 8, f[1] - 7] : [f[0] + 9, f[1] + 17]);
        lab = '<text class="fel" x="' + lp[0] + '" y="' + lp[1] + '" text-anchor="' + (e.fs === "l" ? "end" : "start") + '">' + e.l + "</text>";
      }
      s += '<g class="fe" data-e="' + i + '"><path class="fep" d="' + d + '"/>' + (e.nh ? "" : '<polygon class="feh" points="' + head(a[0], a[1], z[0], z[1]) + '"/>') + '<path class="fhit" d="' + d + '"/>' + lab + "</g>";
    });
    Object.keys(C.N).forEach(function(k){ var n = C.N[k]; s += '<g class="fn" data-n="' + k + '">' + shape(n) + label(n) + "</g>"; });
    var g = V.svg(C.w, C.h, s); g.setAttribute("class", "vsvg fcsvg"); g.setAttribute("aria-label", C.alt || "Flowchart");
    return g;
  }
  function build(spec){
    var C = { w: spec.w, h: spec.h, N: {}, E: spec.edges, nodes: spec.nodes, alt: spec.alt };
    spec.nodes.forEach(function(n){ C.N[n.id] = n; });
    for(var k in spec) if(!(k in C)) C[k] = spec[k];
    return C;
  }
  var T = { term: function(id, x, y, t){ return { id: id, t: "term", x: x, y: y, txt: [t] }; } };
  function nd(id, t, x, y, txt, o){ var n = { id: id, t: t, x: x, y: y, txt: Array.isArray(txt) ? txt : [txt] }; if(o) for(var k in o) n[k] = o[k]; return n; }
  function ed(f, fs, t, ts, o){ var e = { f: f, fs: fs, t: t, ts: ts }; if(o) for(var k in o) e[k] = o[k]; return e; }

  /* ---------- the flowcharts ---------- */
  function num(x){ return typeof x === "number" ? x : (/^-?\d+(\.\d+)?$/.test(String(x).trim()) ? Number(x) : String(x).trim()); }
  var CH = {};
  CH.small = {
    name: "Too small?", w: 470, h: 410, alt: "Flowchart: input a number, then output Too small if it is below 10, otherwise output Valid",
    nodes: [nd("s", "term", 235, 30, "START"), nd("i", "io", 235, 100, "INPUT Number", { in: "Number" }), nd("d", "dec", 235, 195, ["Number < 10 ?"], { test: function(v){ return v.Number < 10; } }),
      nd("o1", "io", 105, 300, 'OUTPUT "Too small"', { w: 190, out: function(){ return "Too small"; } }), nd("o2", "io", 370, 300, 'OUTPUT "Valid"', { w: 170, out: function(){ return "Valid"; } }), nd("e", "term", 235, 385, "END")],
    edges: [ed("s", "b", "i", "t"), ed("i", "b", "d", "t"), ed("d", "l", "o1", "t", { via: [[105, 195]], l: "YES" }), ed("d", "r", "o2", "t", { via: [[370, 195]], l: "NO" }), ed("o1", "b", "e", "l", { via: [[105, 385]] }), ed("o2", "b", "e", "r", { via: [[370, 385]] })],
    vars: ["Number"], tests: [["Input 7", "7"], ["Input 25", "25"], ["Input 10", "10"]],
    intro: "Input a number and say whether it is too small (below 10)."
  };
  CH.evenodd = {
    name: "Even or odd", w: 470, h: 410, alt: "Flowchart: input a number and output Even if Number MOD 2 equals 0, otherwise Odd",
    nodes: [nd("s", "term", 235, 30, "START"), nd("i", "io", 235, 100, "INPUT Number", { in: "Number" }), nd("d", "dec", 235, 195, ["Number MOD 2 = 0 ?"], { w: 220, test: function(v){ return v.Number % 2 === 0; }, show: function(v){ return v.Number + " MOD 2 = " + (v.Number % 2) + ", and " + (v.Number % 2) + " = 0 is " + (v.Number % 2 === 0 ? "TRUE" : "FALSE"); } }),
      nd("o1", "io", 100, 300, 'OUTPUT "Even"', { w: 150, out: function(){ return "Even"; } }), nd("o2", "io", 370, 300, 'OUTPUT "Odd"', { w: 150, out: function(){ return "Odd"; } }), nd("e", "term", 235, 385, "END")],
    edges: [ed("s", "b", "i", "t"), ed("i", "b", "d", "t"), ed("d", "l", "o1", "t", { via: [[100, 195]], l: "YES" }), ed("d", "r", "o2", "t", { via: [[370, 195]], l: "NO" }), ed("o1", "b", "e", "l", { via: [[100, 385]] }), ed("o2", "b", "e", "r", { via: [[370, 385]] })],
    vars: ["Number"], tests: [["Input 8", "8"], ["Input 15", "15"]],
    intro: "MOD gives the remainder after dividing. An even number has a remainder of 0 when divided by 2."
  };
  CH.total = {
    name: "Total of 5 numbers", w: 540, h: 535, alt: "Flowchart: set Total and Count to 0, then repeat five times: input a number, add it to Total and add 1 to Count. Finally output Total",
    nodes: [nd("s", "term", 210, 30, "START"), nd("p1", "proc", 210, 96, "Total ← 0", { set: function(v){ v.Total = 0; } }), nd("p2", "proc", 210, 160, "Count ← 0", { set: function(v){ v.Count = 0; } }),
      nd("d", "dec", 210, 255, ["Count < 5 ?"], { test: function(v){ return v.Count < 5; } }), nd("i", "io", 210, 352, "INPUT Number", { in: "Number" }),
      nd("p3", "proc", 210, 418, "Total ← Total + Number", { set: function(v){ v.Total = v.Total + v.Number; } }), nd("p4", "proc", 210, 484, "Count ← Count + 1", { set: function(v){ v.Count = v.Count + 1; } }),
      nd("o", "io", 440, 352, "OUTPUT Total", { w: 160, out: function(v){ return v.Total; } }), nd("e", "term", 440, 440, "END")],
    edges: [ed("s", "b", "p1", "t"), ed("p1", "b", "p2", "t"), ed("p2", "b", "d", "t"), ed("d", "b", "i", "t", { l: "YES" }), ed("i", "b", "p3", "t"), ed("p3", "b", "p4", "t"),
      ed("p4", "l", "d", "l", { via: [[35, 484], [35, 255]] }), ed("d", "r", "o", "t", { via: [[440, 255]], l: "NO" }), ed("o", "b", "e", "t")],
    vars: ["Total", "Count", "Number"], tests: [["Inputs 4, 7, 1, 9, 3", "4, 7, 1, 9, 3"], ["Inputs 10, 10, 10, 10, 10", "10, 10, 10, 10, 10"]],
    intro: "A loop with a counter: Count stops the loop after five numbers, and Total keeps the running total."
  };
  CH.max = {
    name: "Largest of 5 numbers", w: 540, h: 690, alt: "Flowchart: input the first number as Max, then loop four more times: input a number and replace Max if the number is larger. Output Max",
    nodes: [nd("s", "term", 210, 30, "START"), nd("i1", "io", 210, 96, "INPUT Max", { in: "Max" }), nd("p0", "proc", 210, 160, "Count ← 1", { set: function(v){ v.Count = 1; } }),
      nd("d1", "dec", 210, 255, ["Count < 5 ?"], { test: function(v){ return v.Count < 5; } }), nd("i2", "io", 210, 352, "INPUT Number", { in: "Number" }),
      nd("d2", "dec", 210, 450, ["Number > Max ?"], { test: function(v){ return v.Number > v.Max; } }), nd("p1", "proc", 210, 553, "Max ← Number", { set: function(v){ v.Max = v.Number; } }),
      nd("p2", "proc", 210, 635, "Count ← Count + 1", { set: function(v){ v.Count = v.Count + 1; } }), nd("o", "io", 440, 352, "OUTPUT Max", { w: 160, out: function(v){ return v.Max; } }), nd("e", "term", 440, 440, "END")],
    edges: [ed("s", "b", "i1", "t"), ed("i1", "b", "p0", "t"), ed("p0", "b", "d1", "t"), ed("d1", "b", "i2", "t", { l: "YES" }), ed("i2", "b", "d2", "t"), ed("d2", "b", "p1", "t", { l: "YES" }),
      ed("d2", "r", "p2", "r", { via: [[370, 450], [370, 635]], l: "NO" }), ed("p1", "b", "p2", "t"), ed("p2", "l", "d1", "t", { via: [[35, 635], [35, 205], [210, 205]] }),
      ed("d1", "r", "o", "t", { via: [[440, 255]], l: "NO" }), ed("o", "b", "e", "t")],
    vars: ["Max", "Count", "Number"], tests: [["Inputs 6, 2, 9, 4, 7", "6, 2, 9, 4, 7"], ["Inputs 3, 8, 5, 1, 2", "3, 8, 5, 1, 2"]],
    intro: "The first number is assumed to be the largest. Every new number that beats Max replaces it."
  };
  CH.password = {
    name: "Password check", w: 560, h: 440, alt: "Flowchart: input a password; if it is not letmein, output Try again and go back to the input, otherwise output Welcome",
    nodes: [nd("s", "term", 210, 30, "START"), nd("i", "io", 210, 100, "INPUT Password", { in: "Password" }), nd("d", "dec", 210, 198, ['Password = "letmein" ?'], { w: 240, test: function(v){ return v.Password === "letmein"; } }),
      nd("o1", "io", 450, 198, 'OUTPUT "Try again"', { w: 200, out: function(){ return "Try again"; } }), nd("o2", "io", 210, 308, 'OUTPUT "Welcome"', { w: 195, out: function(){ return "Welcome"; } }), nd("e", "term", 210, 395, "END")],
    edges: [ed("s", "b", "i", "t"), ed("i", "b", "d", "t"), ed("d", "b", "o2", "t", { l: "YES" }), ed("d", "r", "o1", "l", { l: "NO", lp: [334, 190] }), ed("o1", "t", "i", "r", { via: [[450, 100]] }), ed("o2", "b", "e", "t")],
    vars: ["Password"], tests: [["Right first time", "letmein"], ["Two wrong tries", "cat, 1234, letmein"]],
    intro: "The arrow from OUTPUT \"Try again\" goes back up to INPUT. That arrow makes a loop, so the password is asked again."
  };
  CH.lsearch = {
    name: "Linear search", w: 640, h: 625, alt: "Flowchart: input a target name, then check each of the four names in the list in turn. Output Found at the position, or Not found",
    note: 'List used: Names = ["Ava", "Ben", "Cy", "Dee"] (positions 1 to 4)',
    init: function(v){ v.Names = ["Ava", "Ben", "Cy", "Dee"]; },
    nodes: [nd("s", "term", 290, 30, "START"), nd("i", "io", 290, 96, "INPUT Target", { in: "Target" }), nd("p", "proc", 290, 160, "Index ← 1", { set: function(v){ v.Index = 1; } }),
      nd("d1", "dec", 290, 250, ["Index <= 4 ?"], { test: function(v){ return v.Index <= 4; } }),
      nd("d2", "dec", 290, 365, ["Names[Index]", "= Target ?"], { w: 230, h: 84, test: function(v){ return v.Names[v.Index - 1] === v.Target; }, show: function(v){ return 'Names[' + v.Index + '] is "' + v.Names[v.Index - 1] + '" and Target is "' + v.Target + '", so the test is ' + (v.Names[v.Index - 1] === v.Target ? "TRUE" : "FALSE"); } }),
      nd("o", "io", 290, 480, ['OUTPUT "Found at", Index'], { w: 235, out: function(v){ return "Found at " + v.Index; } }), nd("p2", "proc", 520, 365, "Index ← Index + 1", { w: 170, set: function(v){ v.Index = v.Index + 1; } }),
      nd("nf", "io", 95, 580, 'OUTPUT "Not found"', { w: 185, out: function(){ return "Not found"; } }), nd("e", "term", 290, 580, "END")],
    edges: [ed("s", "b", "i", "t"), ed("i", "b", "p", "t"), ed("p", "b", "d1", "t"), ed("d1", "b", "d2", "t", { l: "YES" }), ed("d1", "l", "nf", "t", { via: [[95, 250]], l: "NO" }),
      ed("d2", "b", "o", "t", { l: "YES" }), ed("d2", "r", "p2", "l", { l: "NO" }), ed("p2", "t", "d1", "r", { via: [[520, 250]] }), ed("o", "b", "e", "t"), ed("nf", "r", "e", "l")],
    vars: ["Target", "Index"], tests: [["Search for Cy", "Cy"], ["Search for Zed", "Zed"]],
    intro: "Check the items one at a time, from position 1. Stop as soon as the target is found, or when the end of the list is reached."
  };
  Object.keys(CH).forEach(function(k){ CH[k] = build(CH[k]); CH[k].key = k; });

  /* ---------- running a flowchart ---------- */
  function simulate(C, inputs){
    var v = {}, out = [], steps = [], q = inputs.slice(), cur = "s", guard = 0, i, prev;
    if(C.init) C.init(v);
    while(cur && guard++ < 150){
      var n = C.N[cur], rec = { n: cur, e: -1, ch: false, msg: "" };
      prev = JSON.stringify(v);
      if(n.t === "term" && cur === "s"){ rec.msg = "<b>START</b>: the flowchart begins here. Follow the arrow."; }
      else if(n.t === "term"){ rec.msg = "<b>END</b>: the flowchart has finished."; rec.end = true; rec.snap = JSON.parse(JSON.stringify(v)); rec.outs = out.slice(); steps.push(rec); break; }
      else if(n.in){
        if(!q.length){ rec.msg = "The flowchart wants another INPUT but the list of input values has run out. Add more values and run again."; rec.stop = true; rec.snap = JSON.parse(JSON.stringify(v)); rec.outs = out.slice(); steps.push(rec); break; }
        v[n.in] = num(q.shift()); rec.ch = true; rec.msg = "<b>INPUT</b>: read <b>" + esc(String(v[n.in])) + "</b> from the keyboard and store it in <b>" + n.in + "</b>.";
      } else if(n.set){
        n.set(v); rec.ch = true; var diff = [], old = JSON.parse(prev);
        Object.keys(v).forEach(function(k){ if(JSON.stringify(v[k]) !== JSON.stringify(old[k])) diff.push("<b>" + k + " = " + esc(String(v[k])) + "</b>"); });
        rec.msg = "<b>PROCESS</b>: do <code>" + esc(n.txt.join(" ")) + "</code>. Now " + diff.join(", ") + ".";
      } else if(n.out){
        var o = n.out(v); out.push(String(o)); rec.ch = true; rec.out = String(o); rec.msg = "<b>OUTPUT</b>: show <b>" + esc(String(o)) + "</b> on the screen.";
      } else if(n.test){
        var r = !!n.test(v), why = n.show ? n.show(v) : n.txt.join(" ").replace("?", "").replace(/[A-Za-z]+/g, function(w){ return (w in v && typeof v[w] !== "object") ? String(v[w]) : w; }).trim() + " is " + (r ? "TRUE" : "FALSE");
        rec.msg = "<b>DECISION</b>: " + esc(why) + ". Follow the <b>" + (r ? "YES" : "NO") + "</b> arrow."; rec.lab = r ? "YES" : "NO";
      }
      var outs = []; C.E.forEach(function(e, k){ if(e.f === cur) outs.push(k); });
      var pick = outs[0];
      if(n.test) outs.forEach(function(k){ if(C.E[k].l === rec.lab) pick = k; });
      rec.e = pick === undefined ? -1 : pick; rec.snap = JSON.parse(JSON.stringify(v)); rec.outs = out.slice();
      steps.push(rec); cur = rec.e >= 0 ? C.E[rec.e].t : null;
    }
    if(guard >= 150) steps.push({ n: steps[steps.length - 1].n, e: -1, msg: "Stopped: the flowchart ran for too many steps. Does the loop ever end?", stop: true, snap: v, outs: out.slice() });
    return steps;
  }

  V.reg("flowrun", function(box, o){
    var keys = o.charts || Object.keys(CH), cur = keys[0], steps, pos, stop = null, inp = el("input", "vin"), svg, host = el("div"), tabs = row(), tests = row(), log = el("div", "vlog"), tbl = el("div"), outEl = el("div", "vres"), intro = el("div", "vnote"), note = el("div", "vnote");
    inp.setAttribute("aria-label", "Input values, separated by commas"); inp.style.minWidth = "200px";
    var bPlay, bStep, bReset;
    function C(){ return CH[cur]; }
    function restart(){ halt(); steps = simulate(C(), inp.value.split(",").filter(function(x){ return x.trim() !== ""; })); pos = -1; show(); }
    function halt(){ if(stop){ stop(); stop = null; } if(bPlay) bPlay.textContent = "▶ Play"; }
    function show(){
      var c = C(), vis = {}, ed = {}, i;
      for(i = 0; i <= pos; i++){ vis[steps[i].n] = 1; if(steps[i].e >= 0 && i < pos) ed[steps[i].e] = 1; }
      if(pos >= 0 && steps[pos].e >= 0) ed[steps[pos].e] = 2;
      Array.prototype.forEach.call(svg.querySelectorAll(".fn"), function(g){ var id = g.getAttribute("data-n"); g.setAttribute("class", "fn" + (pos >= 0 && steps[pos].n === id ? " act" : vis[id] ? " vis" : "")); });
      Array.prototype.forEach.call(svg.querySelectorAll(".fe"), function(g){ var k = +g.getAttribute("data-e"); g.setAttribute("class", "fe" + (ed[k] === 2 ? " nx" : ed[k] ? " on" : "")); });
      log.innerHTML = pos < 0 ? "Press <b>Step ›</b> or <b>▶ Play</b>. The shape being run lights up. Change the input values and press Run to try your own." : steps[pos].msg;
      var rows = "", last = null;
      for(i = 0; i <= pos; i++){ if(steps[i].ch){ var sn = steps[i].snap; rows += "<tr>" + c.vars.map(function(k){ return "<td" + (last && JSON.stringify(last[k]) !== JSON.stringify(sn[k]) ? ' class="hi"' : "") + ">" + (sn[k] === undefined ? "" : esc(String(sn[k]))) + "</td>"; }).join("") + "<td>" + (steps[i].out !== undefined ? esc(steps[i].out) : "") + "</td></tr>"; last = sn; }
        }
      tbl.innerHTML = '<div class="vscroll"><table class="vt"><tr>' + c.vars.map(function(k){ return "<th>" + k + "</th>"; }).join("") + "<th>Output</th></tr>" + (rows || '<tr><td colspan="' + (c.vars.length + 1) + '"><i>The trace table fills in as the flowchart runs</i></td></tr>') + "</table></div>";
      var fin = pos >= 0 && (steps[pos].end || steps[pos].stop);
      bStep.disabled = pos >= steps.length - 1 || !!stop; if(fin) halt();
      outEl.innerHTML = "<b>Screen output:</b> " + (pos >= 0 && steps[pos].outs && steps[pos].outs.length ? steps[pos].outs.map(function(x){ return "<code>" + esc(x) + "</code>"; }).join("  ") : "<i>nothing yet</i>");
    }
    function next(){ if(pos < steps.length - 1){ pos++; show(); return pos < steps.length - 1; } return false; }
    function load(k){
      halt(); cur = k; host.innerHTML = ""; svg = draw(C()); host.appendChild(svg);
      intro.textContent = C().intro; note.textContent = C().note || ""; tests.innerHTML = "";
      C().tests.forEach(function(t){ tests.appendChild(btn(t[0], function(){ inp.value = t[1]; restart(); })); });
      inp.value = C().tests[0][1]; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); b.setAttribute("aria-pressed", b.dataset.k === k); });
      restart();
    }
    keys.forEach(function(k){ var b = btn(CH[k].name, function(){ load(k); }); b.dataset.k = k; tabs.appendChild(b); });
    bPlay = btn("▶ Play", function(){ if(stop){ halt(); return; } if(pos >= steps.length - 1) restart(); bPlay.textContent = "⏸ Pause"; stop = V.timer(box, function(){ if(!next()){ halt(); show(); return false; } }, 1100); show(); }, "p");
    bStep = btn("Step ›", function(){ next(); });
    bReset = btn("↺ Reset", restart);
    var runb = btn("Run with these inputs", restart);
    var ctl = row(bPlay, bStep, bReset), inr = row(el("label", "", "Input values (separated by commas): "), inp, runb);
    inr.firstChild.appendChild(document.createTextNode(""));
    if(keys.length > 1) box.appendChild(tabs);
    box.appendChild(intro); box.appendChild(host); box.appendChild(ctl); box.appendChild(row(el("span", "vnote", "Try:"), tests)); box.appendChild(inr); box.appendChild(note); box.appendChild(log); box.appendChild(outEl); box.appendChild(tbl);
    inp.addEventListener("keydown", function(e){ if(e.key === "Enter") restart(); });
    load(cur);
  });

  /* ---------- the symbols ---------- */
  var SYM = [
    { k: "term", n: "Terminator (rounded rectangle)", u: "The <b>START</b> and <b>END</b> of the flowchart.", r: "START has one arrow out. END has one arrow in. There is only one START.", ex: ["START", "END"], q: "the start of the flowchart" },
    { k: "io", n: "Input / output (parallelogram)", u: "Data coming in from the user (<b>INPUT</b>) or being shown or printed (<b>OUTPUT</b>).", r: "Write the word INPUT or OUTPUT and what it is for. One arrow in, one arrow out.", ex: ["INPUT Number", 'OUTPUT "Valid"'], q: "INPUT Age" },
    { k: "proc", n: "Process (rectangle)", u: "A calculation or an assignment: something the computer <b>does</b>.", r: "One arrow in, one arrow out. Use the arrow ← for assignment.", ex: ["Total ← Total + Number", "Count ← 0"], q: "Total ← Total + 1" },
    { k: "dec", n: "Decision (diamond)", u: "A <b>question</b> with two answers. It is used for IF statements and to decide whether a loop goes round again.", r: "One arrow in and <b>two arrows out</b>, labelled <b>YES</b> and <b>NO</b>.", ex: ["Number < 10 ?", 'Password = "letmein" ?'], q: "Is Age >= 18 ?" },
    { k: "sub", n: "Subroutine / predefined process", u: "A call to a <b>procedure or function</b> that is drawn separately, e.g. a sorting subroutine.", r: "One arrow in, one arrow out. The name of the subroutine goes inside.", ex: ["SortList", "CalculateTax"], q: "CALL SortList (a subroutine drawn elsewhere)" }
  ];
  V.reg("flowsym", function(box){
    var pos = { term: [95, 48], io: [285, 48], proc: [470, 48], dec: [160, 148], sub: [350, 148] }, sz = { term: [124, 38], io: [170, 42], proc: [130, 42], dec: [150, 70], sub: [150, 42] };
    var names = { term: "START / END", io: "INPUT / OUTPUT", proc: "Process", dec: "Decision ?", sub: "Subroutine" };
    var inner = "";
    SYM.forEach(function(s){ var n = { t: s.k, x: pos[s.k][0], y: pos[s.k][1], w: sz[s.k][0], h: sz[s.k][1], txt: [names[s.k]], sm: 1 }; inner += '<g class="fn sy" data-k="' + s.k + '" tabindex="0" role="button" aria-label="' + s.n + '">' + shape(n) + label(n) + "</g>"; });
    inner += '<g class="fe"><path class="fep" d="M440 148 L506 148"/><polygon class="feh" points="516,148 504,142 504,154"/></g><text class="fnt sm2 mid" x="478" y="178">Flow arrow</text>';
    var svg = V.svg(580, 205, inner); svg.setAttribute("class", "vsvg fcsvg"); svg.setAttribute("aria-label", "The five standard flowchart symbols and the flow arrow");
    var info = el("div", "vres"), quiz = el("div", "vres"), mode = "learn", qi = 0, score = 0, done = false, order;
    quiz.style.display = "none";
    function showInfo(k){
      var s = SYM.filter(function(x){ return x.k === k; })[0];
      Array.prototype.forEach.call(svg.querySelectorAll(".sy"), function(g){ g.setAttribute("class", "fn sy" + (g.getAttribute("data-k") === k ? " act" : "")); });
      info.innerHTML = "<b>" + s.n + "</b><p style='margin:6px 0'>" + s.u + "</p><p style='margin:6px 0'><b>Rule:</b> " + s.r + "</p><p style='margin:6px 0'><b>Examples:</b> " + s.ex.map(function(x){ return "<code>" + esc(x) + "</code>"; }).join(", ") + "</p>";
    }
    function qShow(){
      done = false;
      Array.prototype.forEach.call(svg.querySelectorAll(".sy"), function(g){ g.setAttribute("class", "fn sy"); });
      if(qi >= order.length){ quiz.innerHTML = "<b>Finished: " + score + " out of " + order.length + ".</b> " + (score === order.length ? "Perfect!" : "Try again to get them all.") + "<div class='vrow'></div>"; quiz.lastChild.appendChild(btn("Restart", function(){ qi = 0; score = 0; order = shuffle(); qShow(); })); return; }
      quiz.innerHTML = "<b>Question " + (qi + 1) + " of " + order.length + "</b> (score " + score + ")<div class='qt'>Which symbol is used for: <code>" + esc(order[qi].q) + "</code>?</div><div class='vnote'>Click a symbol in the picture.</div><div class='qf'></div>";
    }
    function shuffle(){ var a = SYM.slice(); a.push({ k: "proc", q: "Count ← 0" }, { k: "term", q: "the end of the flowchart" }, { k: "io", q: 'OUTPUT "Well done"' }); for(var i = a.length - 1; i > 0; i--){ var j = (i * 7 + 3) % (i + 1), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
    function pick(k){
      if(mode === "learn"){ showInfo(k); return; }
      if(done || qi >= order.length) return; done = true; var ok = k === order[qi].k; if(ok) score++;
      var s = SYM.filter(function(x){ return x.k === order[qi].k; })[0];
      var g = svg.querySelector('.sy[data-k="' + order[qi].k + '"]'); if(g) g.setAttribute("class", "fn sy act");
      var f = quiz.querySelector(".qf"); f.innerHTML = (ok ? '<span class="vok">✓ Correct.</span> ' : '<span class="vbad">✗ Not quite.</span> ') + "It is the <b>" + s.n + "</b>: " + s.u;
      var nx = btn(qi + 1 >= order.length ? "See my score" : "Next ›", function(){ qi++; qShow(); }, "p"); f.appendChild(el("div", "vrow")).appendChild(nx); nx.focus();
    }
    svg.addEventListener("click", function(e){ var g = e.target.closest ? e.target.closest(".sy") : null; if(g) pick(g.getAttribute("data-k")); });
    svg.addEventListener("keydown", function(e){ if(e.key === "Enter" || e.key === " "){ var g = e.target.closest ? e.target.closest(".sy") : null; if(g){ e.preventDefault(); pick(g.getAttribute("data-k")); } } });
    var tl = row(), bL = btn("Learn the symbols", function(){ mode = "learn"; quiz.style.display = "none"; info.style.display = ""; bL.className = "vb on"; bQ.className = "vb"; showInfo("term"); }), bQ = btn("Quick quiz", function(){ mode = "quiz"; quiz.style.display = ""; info.style.display = "none"; bQ.className = "vb on"; bL.className = "vb"; qi = 0; score = 0; order = shuffle(); qShow(); });
    tl.appendChild(bL); tl.appendChild(bQ); bL.className = "vb on";
    box.appendChild(el("div", "vnote", "Every flowchart uses the same few symbols. Click a symbol to see what it is for.")); box.appendChild(tl); box.appendChild(svg); box.appendChild(info); box.appendChild(quiz); showInfo("term");
  });

  /* ---------- find the mistake ---------- */
  function base(){ return { w: 440, h: 395,
    nodes: [nd("s", "term", 220, 28, "START"), nd("i", "io", 220, 94, "INPUT Mark", { w: 160 }), nd("d", "dec", 220, 190, ["Mark >= 50 ?"], { w: 190 }), nd("o1", "io", 100, 290, 'OUTPUT "Pass"', { w: 150 }), nd("o2", "io", 340, 290, 'OUTPUT "Fail"', { w: 150 }), nd("e", "term", 220, 366, "END")],
    edges: [ed("s", "b", "i", "t"), ed("i", "b", "d", "t"), ed("d", "l", "o1", "t", { via: [[100, 190]], l: "YES" }), ed("d", "r", "o2", "t", { via: [[340, 190]], l: "NO" }), ed("o1", "b", "e", "l", { via: [[100, 366]] }), ed("o2", "b", "e", "r", { via: [[340, 366]] })] }; }
  var FIX = [];
  (function(){
    var c;
    c = base(); c.nodes[1] = nd("i", "proc", 220, 94, "INPUT Mark", { w: 160 }); c.bad = { n: "i" }; c.why = "INPUT is drawn as a rectangle. Input and output must use a <b>parallelogram</b>; a rectangle is for a process such as a calculation."; c.alt = "Flowchart where INPUT Mark is drawn in a rectangle"; FIX.push(c);
    c = base(); c.nodes = c.nodes.filter(function(n){ return n.id !== "o2"; }); c.edges = [ed("s", "b", "i", "t"), ed("i", "b", "d", "t"), ed("d", "l", "o1", "t", { via: [[100, 190]], l: "YES" }), ed("o1", "b", "e", "l", { via: [[100, 366]] })]; c.bad = { n: "d" }; c.why = "The decision has only <b>one</b> arrow out. A decision (diamond) needs <b>two</b> exits, labelled YES and NO, so the NO case is missing."; c.alt = "Flowchart whose decision diamond has only a YES exit"; FIX.push(c);
    c = base(); c.edges[2] = ed("d", "l", "o1", "t", { via: [[100, 190]] }); c.edges[3] = ed("d", "r", "o2", "t", { via: [[340, 190]] }); c.bad = { e: [2, 3] }; c.why = "The two arrows leaving the decision have <b>no labels</b>. Each exit must be labelled <b>YES</b> or <b>NO</b> so the reader knows which way to go."; c.alt = "Flowchart whose decision exits are not labelled"; FIX.push(c);
    c = base(); c.edges = c.edges.filter(function(e){ return !(e.f === "o1" && e.t === "e"); }); c.bad = { n: "o1" }; c.why = "Nothing leaves OUTPUT \"Pass\". Every path must lead on to <b>END</b>; this one gets stuck."; c.alt = "Flowchart where the Pass output has no arrow leading on"; FIX.push(c);
    c = base(); c.edges[1] = ed("i", "b", "d", "t", { nh: true }); c.bad = { e: [1] }; c.why = "This line has <b>no arrowhead</b>. Flow lines must be arrows so the direction of flow is clear."; c.alt = "Flowchart where one flow line has no arrowhead"; FIX.push(c);
    c = { w: 440, h: 395, nodes: [nd("s", "term", 220, 28, "START"), nd("i", "io", 220, 94, "INPUT Number", { w: 170 }), nd("p", "dec", 220, 190, ["Total ← Total + Number"], { w: 250, h: 80 }), nd("o", "io", 220, 290, "OUTPUT Total", { w: 160 }), nd("e", "term", 220, 366, "END")],
      edges: [ed("s", "b", "i", "t"), ed("i", "b", "p", "t"), ed("p", "b", "o", "t"), ed("o", "b", "e", "t")], bad: { n: "p" }, why: "A calculation is drawn in a <b>diamond</b>. Diamonds are only for decisions (questions with YES / NO). A calculation or assignment belongs in a <b>rectangle</b>.", alt: "Flowchart where a calculation is drawn in a diamond" }; FIX.push(c);
    c = base(); c.nodes[0] = nd("s", "proc", 220, 28, "START", { w: 130 }); c.bad = { n: "s" }; c.why = "START is drawn as a plain rectangle. The start and end of a flowchart use a <b>rounded rectangle (terminator)</b>."; c.alt = "Flowchart where START is drawn in a rectangle"; FIX.push(c);
    FIX = FIX.map(build);
  })();
  V.reg("flowfix", function(box){
    var qi = 0, score = 0, done = false, host = el("div"), info = el("div", "vres"), svg;
    function show(){
      done = false; host.innerHTML = ""; info.innerHTML = "";
      if(qi >= FIX.length){ info.innerHTML = "<b>Finished: " + score + " out of " + FIX.length + ".</b> " + (score === FIX.length ? "Perfect! You can spot flowchart mistakes." : "Press Restart to try again.") + "<div class='vrow'></div>"; info.lastChild.appendChild(btn("Restart", function(){ qi = 0; score = 0; show(); })); return; }
      var C = FIX[qi]; svg = draw(C); svg.setAttribute("class", "vsvg fcsvg pick"); host.appendChild(svg);
      info.innerHTML = "<b>Mistake " + (qi + 1) + " of " + FIX.length + "</b> (score " + score + ")<div class='qt'>This flowchart has ONE drawing mistake. Click the shape or arrow that is wrong.</div><div class='qf'></div>";
    }
    function isBad(C, kind, id){ return kind === "n" ? C.bad.n === id : !!(C.bad.e && C.bad.e.indexOf(+id) >= 0); }
    host.addEventListener("click", function(ev){
      if(done || qi >= FIX.length) return; var C = FIX[qi], g = ev.target.closest ? ev.target.closest(".fn, .fe") : null; if(!g) return;
      var kind = g.classList.contains("fn") ? "n" : "e", id = g.getAttribute(kind === "n" ? "data-n" : "data-e"); done = true; var ok = isBad(C, kind, id); if(ok) score++;
      var bad = C.bad.n ? host.querySelector('.fn[data-n="' + C.bad.n + '"]') : null; if(bad) bad.setAttribute("class", "fn badn"); (C.bad.e || []).forEach(function(k){ var x = host.querySelector('.fe[data-e="' + k + '"]'); if(x) x.setAttribute("class", "fe badn"); });
      if(!ok) g.setAttribute("class", g.getAttribute("class") + " pickwrong");
      var f = info.querySelector(".qf"); f.innerHTML = (ok ? '<span class="vok">✓ Correct.</span> ' : '<span class="vbad">✗ Not that one.</span> The mistake is highlighted in red. ') + C.why;
      var nx = btn(qi + 1 >= FIX.length ? "See my score" : "Next ›", function(){ qi++; show(); }, "p"); f.appendChild(el("div", "vrow")).appendChild(nx); nx.focus();
    });
    box.appendChild(el("div", "vnote", "Examiners often ask you to spot mistakes in a flowchart. Check the shape of each symbol, the arrows, and the labels on decisions.")); box.appendChild(host); box.appendChild(info); show();
  });
})(typeof window !== "undefined" ? window : this);
