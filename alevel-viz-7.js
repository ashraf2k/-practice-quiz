/* A Level iLearn visuals, part 7: user-defined types, interrupts, RISC v CISC, Boolean simplification, memory management,
   routing with hop counts, HTTP / FTP. Original interactive diagrams written for this site. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;
  function tabsRow(items, cur, set){ var r = row(); items.forEach(function(it){ var b = btn(it[1], function(){ set(it[0]); }); b.dataset.k = it[0]; r.appendChild(b); }); r.mark = function(k){ Array.prototype.forEach.call(r.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); }); }; r.mark(cur); return r; }
  function ovl(s){ return String(s).replace(/\./g, "·").replace(/~\(([^)]*)\)/g, '<span class="ovl">($1)</span>').replace(/~([A-Z])/g, '<span class="ovl">$1</span>'); }

  /* ---------- 13.1 user-defined data types ---------- */
  V.reg("udt", function(box, o){
    var tab = (o && o.tab) || "enum", view = el("div"), log = el("div", "vlog"), tabs;
    var DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], today = 3, ptrTo = "Today", mem = { Today: { addr: 2040, v: 3 }, Tomorrow: { addr: 2044, v: 4 } };
    var rec = { title: "Hamlet", author: "Shakespeare", publisher: "Penguin", noPages: 243, fiction: true };
    var A = "a e i o u", B = "e o u x y", setSel = "union";
    function setOf(s){ var r = {}; s.split(/[\s,]+/).filter(Boolean).forEach(function(c){ r[c.charAt(0)] = 1; }); return Object.keys(r).sort(); }
    function draw(msg){
      var h = "";
      if(tab === "enum"){
        h += "<pre class='vpre'>TYPE Days = (Sun, Mon, Tue, Wed, Thu, Fri, Sat)\nDECLARE Today : Days\nToday ← Wed</pre>";
        h += '<div class="vcells">' + DAYS.map(function(d, i){ return '<div class="vcell' + (i === today ? " hi" : "") + '"><small>ordinal ' + i + "</small><b>" + d + "</b></div>"; }).join("") + "</div>";
        h += "<div class='vres'>Today = <b>" + DAYS[today] + "</b>. Tomorrow ← Today + 1 gives <b>" + DAYS[(today + 1) % 7] + "</b>. Comparisons use the order: <b>Mon &lt; Wed</b> is " + (1 < today ? "TRUE" : "FALSE") + " today's setting.</div>";
      } else if(tab === "ptr"){
        h += "<pre class='vpre'>TYPE TIntPointer = ^INTEGER\nDECLARE MyPointer : TIntPointer\nMyPointer ← ^" + ptrTo + "\nValuePointedTo ← MyPointer^</pre>";
        h += '<div class="vtwo"><div><div class="vcells">' + Object.keys(mem).map(function(k){ return '<div class="vcell' + (k === ptrTo ? " hi" : "") + '"><small>address ' + mem[k].addr + " (" + k + ")</small><b>" + mem[k].v + "</b></div>"; }).join("") + '</div></div><div class="vcell hi" style="min-width:150px"><small>MyPointer (a variable)</small><b>' + mem[ptrTo].addr + "</b></div></div>";
        h += "<div class='vres'><b>MyPointer</b> holds the <b>address " + mem[ptrTo].addr + "</b>, not the data. <b>MyPointer^</b> (dereferencing) follows the address and gives <b>" + mem[ptrTo].v + "</b>.</div>";
      } else if(tab === "rec"){
        h += "<pre class='vpre'>TYPE TBookRecord\n  DECLARE title : STRING\n  DECLARE author : STRING\n  DECLARE publisher : STRING\n  DECLARE noPages : INTEGER\n  DECLARE fiction : BOOLEAN\nENDTYPE\nDECLARE Book : TBookRecord</pre>";
        h += V.table(["Field", "Type", "Value", "Pseudocode to set it"], [["title", "STRING", rec.title, 'Book.title ← "' + rec.title + '"'], ["author", "STRING", rec.author, 'Book.author ← "' + rec.author + '"'], ["publisher", "STRING", rec.publisher, 'Book.publisher ← "' + rec.publisher + '"'], ["noPages", "INTEGER", { t: rec.noPages, c: "hi" }, "Book.noPages ← " + rec.noPages], ["fiction", "BOOLEAN", rec.fiction ? "TRUE" : "FALSE", "Book.fiction ← " + (rec.fiction ? "TRUE" : "FALSE")]]);
      } else {
        var a = setOf(A), b = setOf(B), r = setSel === "union" ? a.concat(b.filter(function(x){ return a.indexOf(x) < 0; })).sort() : setSel === "inter" ? a.filter(function(x){ return b.indexOf(x) >= 0; }) : a.filter(function(x){ return b.indexOf(x) < 0; });
        function chips(arr, mark){ return arr.length ? arr.map(function(c){ return '<span class="vcell' + (mark && mark.indexOf(c) >= 0 ? " hi" : "") + '" style="display:inline-block;margin:2px;padding:2px 9px">' + esc(c) + "</span>"; }).join("") : "<i>empty set</i>"; }
        h += "<pre class='vpre'>TYPE letters = SET OF CHAR\nDECLARE SetA : letters\nDECLARE SetB : letters</pre><div>SetA = " + chips(a, r) + "</div><div>SetB = " + chips(b, r) + "</div>";
        h += "<div class='vres'><b>" + { union: "SetA ∪ SetB (union: in either set)", inter: "SetA ∩ SetB (intersection: in both)", diff: "SetA − SetB (difference: in A but not B)" }[setSel] + "</b> = " + chips(r) + "</div><div class='vnote'>A set holds each value once, in no particular order (an enumerated type is ordered).</div>";
      }
      view.innerHTML = h; log.innerHTML = msg || "";
    }
    var ctl = el("div");
    function controls(){
      ctl.innerHTML = "";
      if(tab === "enum") ctl.appendChild(row(el("span", null, "Set Today to: "), (function(){ var r = row(); DAYS.forEach(function(d, i){ r.appendChild(btn(d, function(){ today = i; draw(); })); }); return r; })()));
      if(tab === "ptr") ctl.appendChild(row(btn("Point at Today (address 2040)", function(){ ptrTo = "Today"; draw(); }), btn("Point at Tomorrow (address 2044)", function(){ ptrTo = "Tomorrow"; draw(); }), btn("Change the value pointed to (+1)", function(){ mem[ptrTo].v++; draw(); })));
      if(tab === "rec"){ var n = el("input", "vin mono"); n.type = "number"; n.value = rec.noPages; n.style.width = "90px"; n.addEventListener("input", function(){ rec.noPages = +n.value || 0; draw(); }); ctl.appendChild(row(el("label", null, "noPages: "), n, btn("Toggle fiction", function(){ rec.fiction = !rec.fiction; draw(); }))); }
      if(tab === "set"){ var a = el("input", "vin mono"), b = el("input", "vin mono"); a.value = A; b.value = B; a.addEventListener("input", function(){ A = a.value; draw(); }); b.addEventListener("input", function(){ B = b.value; draw(); });
        var ops = row(); [["union", "Union"], ["inter", "Intersection"], ["diff", "Difference"]].forEach(function(x){ var bt = btn(x[1], function(){ setSel = x[0]; draw(); }); ops.appendChild(bt); });
        ctl.appendChild(row(el("label", null, "SetA: "), a, el("label", null, "SetB: "), b)); ctl.appendChild(ops); }
    }
    tabs = tabsRow([["enum", "Enumerated"], ["ptr", "Pointer"], ["rec", "Record"], ["set", "Set"]], tab, function(k){ tab = k; tabs.mark(k); controls(); draw(); });
    box.appendChild(tabs); box.appendChild(ctl); box.appendChild(view); box.appendChild(log); controls(); draw();
  });

  /* ---------- 15.1 / 16.1 interrupt handling ---------- */
  V.reg("isr", function(box){
    var SRC = { kb: ["Keyboard", 2], timer: ["Timer", 4], pr: ["Printer out of paper", 1] };
    var st, log = el("div", "vlog"), view = el("div"), pend = null;
    function reset(){ st = { pc: 100, stack: [], mode: "main", stage: 0, isr: null, done: [] }; pend = null; draw("The processor is running the main program, one fetch-decode-execute cycle after another."); }
    function draw(msg){
      var h = '<div class="vtwo"><div><div class="vcell hi"><small>PC (program counter)</small><b>' + st.pc + "</b></div><div class='vcell'><small>running</small><b>" + (st.mode === "main" ? "main program" : "ISR: " + st.isr) + "</b></div></div>";
      h += '<div><small>Stack (saved state)</small><div class="vstack" style="min-height:90px;width:150px">' + st.stack.map(function(s, i){ return "<i" + (i === st.stack.length - 1 ? ' class="new"' : "") + ">PC=" + s + "</i>"; }).join("") + "</div></div></div>";
      h += "<div class='vres'>" + (pend ? "Interrupt <b>" + SRC[pend][0] + "</b> (priority " + SRC[pend][1] + ") is waiting at the end of the current cycle." : "No interrupt pending.") + "</div>";
      if(st.done.length) h += "<div class='vnote'>Handled: " + st.done.join(" → ") + "</div>";
      view.innerHTML = h; log.innerHTML = msg || "";
    }
    function cycle(){
      if(st.mode === "main" || st.mode === "isr"){
        if(pend && st.stage === 0){
          var p = SRC[pend], curP = st.mode === "isr" ? st.curP : 0;
          if(p[1] > curP){ st.stack.push(st.pc); st.isr = p[0]; st.curP = p[1]; st.mode = "isr"; st.pc = 900 + p[1]; st.done.push(p[0]); pend = null;
            draw("The cycle finished, the interrupt register was checked and the interrupt has a higher priority than what is running. The <b>PC and registers were saved on the stack</b>, and the PC now holds the address of the <b>interrupt service routine (ISR)</b> for the " + p[0] + "."); return; }
          draw("The interrupt priority (" + p[1] + ") is not higher than the routine now running (" + curP + "), so it is <b>kept waiting</b> and the current ISR continues."); st.stage = 1; return;
        }
        st.stage = 0; st.pc += 1;
        if(st.mode === "isr" && st.pc >= 900 + st.curP + 3){ st.pc = st.stack.pop(); st.mode = st.stack.length ? "isr" : "main"; if(st.mode === "isr"){ st.curP = 4; } st.isr = null; draw("The ISR finished. The <b>saved PC and registers are restored</b> from the stack, so the interrupted program carries on exactly where it stopped."); return; }
        draw("One instruction is fetched, decoded and executed. At the <b>end of every cycle</b> the processor checks for interrupts.");
      }
    }
    var tabs = row(); Object.keys(SRC).forEach(function(k){ tabs.appendChild(btn("Raise: " + SRC[k][0] + " (priority " + SRC[k][1] + ")", function(){ pend = k; draw("An interrupt signal arrives. The current instruction is <b>not</b> abandoned; it completes first."); })); });
    box.appendChild(tabs); box.appendChild(row(btn("Run one cycle ›", cycle, "p"), btn("↺ Reset", reset))); box.appendChild(view); box.appendChild(log); reset();
    st.stage = 0;
  });

  /* ---------- 15.1 RISC v CISC ---------- */
  V.reg("riscCisc", function(box){
    var n = 6, stages = 5, inp = el("input", "vin mono"), view = el("div");
    inp.type = "number"; inp.min = 1; inp.max = 20; inp.value = n; inp.style.width = "70px";
    function draw(){
      n = Math.max(1, Math.min(20, +inp.value || 1));
      var seq = n * stages, pipe = stages + n - 1;
      var h = V.table(["Feature", "CISC", "RISC"], [["Number of instructions", "Many (some very specialised)", "Few, simple and the same length"], ["One instruction can do", "A whole task, e.g. <code>MULT A, B</code> reads memory, multiplies and writes back", "One simple step, e.g. <code>LOAD</code>, <code>MULT</code>, <code>STORE</code>"], ["Operands", "Can be in main memory", "Usually in registers (only LOAD/STORE touch memory)"], ["Cycles per instruction", "Varies (several cycles)", "Mostly one cycle"], ["Program length", "Short", "Longer"], ["Registers", "Few", "Many"], ["Pipelining", "Difficult", "Efficient"], ["Control unit / chip", "Complex, microcode", "Simpler, hard-wired"]]);
      h += "<div class='vres'>Task <b>A = B × C</b>: CISC needs <b>1</b> instruction; RISC needs <b>4</b> (LOAD R1,B / LOAD R2,C / MULT R3,R1,R2 / STORE A,R3).</div>";
      h += "<div class='vres'>Pipelining <b>" + n + "</b> instructions through " + stages + " stages: sequential = " + n + " × " + stages + " = <b>" + seq + "</b> cycles; pipelined = " + stages + " + (" + n + " − 1) = <b>" + pipe + "</b> cycles. Saving: <b>" + (seq - pipe) + "</b> cycles.</div>";
      h += '<div class="vbars"><div class="vbar" style="width:' + 100 + '%">Sequential ' + seq + "</div><div class=\"vbar cmp\" style=\"width:" + Math.round(100 * pipe / seq) + '%">Pipelined ' + pipe + "</div></div>";
      view.innerHTML = h;
    }
    inp.addEventListener("input", draw);
    box.appendChild(row(el("label", null, "Number of instructions to run: "), inp)); box.appendChild(view); draw();
  });

  /* ---------- 15.2 Boolean algebra simplification (choose the law at each step) ---------- */
  var BOOL = [
    { name: "A·B + A·B̄ = A", start: "A.B + A.~B", steps: [["Factorise A out of both terms", "A.(B + ~B)", ["Distributive law", "De Morgan's law", "Absorption law", "Commutative law"], 0], ["B + B̄ = 1", "A.1", ["Complement law", "Identity law", "Idempotent law", "Null law"], 0], ["A · 1 = A", "A", ["Identity law", "Complement law", "Null law", "Associative law"], 0]] },
    { name: "A + A·B = A", start: "A + A.B", steps: [["Factorise A out of both terms (A = A·1)", "A.(1 + B)", ["Distributive law", "Associative law", "De Morgan's law", "Commutative law"], 0], ["1 + B = 1", "A.1", ["Null (annulment) law", "Complement law", "Idempotent law", "Identity law"], 0], ["A · 1 = A", "A", ["Identity law", "Null law", "Complement law", "Distributive law"], 0]] },
    { name: "(A + B)·(A + B̄) = A", start: "(A + B).(A + ~B)", steps: [["Expand the brackets", "A.A + A.~B + B.A + B.~B", ["Distributive law", "Absorption law", "De Morgan's law", "Associative law"], 0], ["A·A = A and B·B̄ = 0", "A + A.~B + B.A + 0", ["Idempotent and complement laws", "Identity and null laws", "Absorption law", "De Morgan's law"], 0], ["x + 0 = x, then factorise A out of the last two terms", "A + A.(~B + B)", ["Identity and distributive laws", "Complement law only", "Null law", "Idempotent law"], 0], ["B̄ + B = 1 and A·1 = A", "A + A", ["Complement and identity laws", "De Morgan's law", "Absorption law", "Null law"], 0], ["A + A = A", "A", ["Idempotent law", "Complement law", "Identity law", "Distributive law"], 0]] },
    { name: "B̄·A + B = A + B", start: "B + A.~B", steps: [["Use the absorption form: x + x̄·y = x + y", "B + A", ["Absorption law (x + x̄·y = x + y)", "Complement law", "Null law", "De Morgan's law"], 0]] }
  ];
  V.reg("boolsimp", function(box){
    var idx = 0, step = 0, view = el("div"), log = el("div", "vlog"), tabs = row();
    function draw(msg){
      var ex = BOOL[idx], h = "<div class='vres'>Simplify: <b class='big'>" + ovl(ex.start) + "</b></div>";
      var cur = ex.start, hist = "<div class='vlog'><div>" + ovl(ex.start) + "</div>";
      for(var i = 0; i < step; i++){ hist += "<div>= " + ovl(ex.steps[i][1]) + "  <small>(" + esc(ex.steps[i][2][ex.steps[i][3]]) + ")</small></div>"; }
      hist += "</div>"; h += hist;
      if(step < ex.steps.length){
        var s = ex.steps[step];
        h += "<div class='vres'>Next step: <b>" + ovl(s[0]) + "</b>. Which law is used?</div>";
        view.innerHTML = h; var r = row(); s[2].forEach(function(o, k){ r.appendChild(btn(o, function(){ if(k === s[3]){ step++; draw("Correct."); } else draw("Not that one. Think about what changed between the two lines."); })); }); view.appendChild(r);
      } else { h += "<div class='vres vok'>Fully simplified: <b class='big'>" + ovl(ex.steps[ex.steps.length - 1][1]) + "</b>. Check it with a truth table to be sure.</div>"; view.innerHTML = h; }
      log.innerHTML = msg || ""; Array.prototype.forEach.call(tabs.children, function(b, i){ b.className = "vb" + (i === idx ? " on" : ""); });
    }
    BOOL.forEach(function(ex, i){ tabs.appendChild(btn(ex.name, function(){ idx = i; step = 0; draw(); })); });
    box.appendChild(tabs); box.appendChild(view); box.appendChild(log); draw();
  });

  /* ---------- 16.1 paging and segmentation: logical to physical addresses ---------- */
  V.reg("memmgmt", function(box){
    var mode = "page", view = el("div"), addr = el("input", "vin mono"), seg = el("select", "vin"), off = el("input", "vin mono"), ctl = el("div");
    var PT = [2, 7, null, 5, 0, null, 3, 1], PS = 256, SEG = { Code: [4000, 1200], Data: [8000, 600], Stack: [6000, 400] };
    addr.type = "number"; addr.value = 300; addr.style.width = "90px"; off.type = "number"; off.value = 150; off.style.width = "80px";
    Object.keys(SEG).forEach(function(k){ var o = el("option"); o.value = k; o.textContent = k; seg.appendChild(o); });
    function draw(){
      var h = "";
      if(mode === "page"){
        var a = Math.max(0, Math.min(2047, +addr.value || 0)), p = Math.floor(a / PS), o = a % PS, f = PT[p];
        h += "<div class='vnote'>Page size = " + PS + " bytes. Logical address <b>" + a + "</b>: page number = " + a + " DIV " + PS + " = <b>" + p + "</b>, offset = " + a + " MOD " + PS + " = <b>" + o + "</b>.</div>";
        h += V.table(["Page", "Frame in RAM"], PT.map(function(fr, i){ return [{ t: i, c: i === p ? "hi" : "" }, { t: fr === null ? "not in RAM (on disk)" : fr, c: i === p ? (fr === null ? "no" : "ok") : "" }]; }));
        h += f === null ? "<div class='vres vbad'>PAGE FAULT: page " + p + " is not in main memory. The OS must load it from the disk (swap space), possibly replacing another page, then restart the instruction.</div>" : "<div class='vres'>Physical address = frame × page size + offset = " + f + " × " + PS + " + " + o + " = <b class='big'>" + (f * PS + o) + "</b></div>";
      } else {
        var s = SEG[seg.value], of = Math.max(0, +off.value || 0);
        h += V.table(["Segment", "Base (start address)", "Limit (size)"], Object.keys(SEG).map(function(k){ return [{ t: k, c: k === seg.value ? "hi" : "" }, SEG[k][0], SEG[k][1]]; }));
        h += of >= s[1] ? "<div class='vres vbad'>SEGMENTATION FAULT: offset " + of + " is not less than the limit " + s[1] + ". The access is outside the segment, so the OS stops the program.</div>" : "<div class='vres'>Offset " + of + " &lt; limit " + s[1] + ", so it is allowed. Physical address = base + offset = " + s[0] + " + " + of + " = <b class='big'>" + (s[0] + of) + "</b></div>";
      }
      view.innerHTML = h;
    }
    function controls(){ ctl.innerHTML = ""; if(mode === "page") ctl.appendChild(row(el("label", null, "Logical address (0-2047, try 300, 600, 1000): "), addr)); else ctl.appendChild(row(el("label", null, "Segment: "), seg, el("label", null, "Offset: "), off)); }
    var tabs = tabsRow([["page", "Paging (fixed-size pages)"], ["seg", "Segmentation (variable-size segments)"]], mode, function(k){ mode = k; tabs.mark(k); controls(); draw(); });
    addr.addEventListener("input", draw); seg.addEventListener("change", draw); off.addEventListener("input", draw);
    box.appendChild(tabs); box.appendChild(ctl); box.appendChild(view); controls(); draw();
  });

  /* ---------- 14.2 packets hopping through routers (hop count and routing tables) ---------- */
  V.reg("routing", function(box){
    var NODES = { A: [60, 90], B: [190, 40], C: [330, 40], D: [190, 150], E: [470, 90] };
    var LINKS = [["A", "B"], ["B", "C"], ["C", "E"], ["A", "D"], ["D", "C"], ["D", "E"]];
    var SCEN = { normal: { title: "Normal", rt: { A: "B", B: "C", C: "E", D: "E" }, note: "Each router looks up the destination E in its routing table and forwards the packet to the next hop." },
      fail: { title: "Link C-E is down", rt: { A: "B", B: "C", C: "D", D: "E" }, note: "The routing tables were updated: router C now sends packets for E via D." },
      loop: { title: "Faulty tables (a loop)", rt: { A: "B", B: "C", C: "B", D: "E" }, note: "B and C both think the other is the way to E. Without a hop count the packet would bounce for ever." } };
    var sc = "normal", ttl0 = 5, pos, ttl, path, done, view = el("div"), log = el("div", "vlog"), tin = el("input", "vin mono");
    tin.type = "number"; tin.min = 1; tin.max = 10; tin.value = ttl0; tin.style.width = "60px";
    function reset(msg){ pos = "A"; ttl = Math.max(1, +tin.value || 5); path = ["A"]; done = ""; draw(msg || "Packet 1 of the message is created at A. The header holds the destination (E), the packet number and the <b>hop count</b> (the maximum number of hops it may take)."); }
    function draw(msg){
      var rt = SCEN[sc].rt, w = 540, h = 200, s = '';
      LINKS.forEach(function(l){ var a = NODES[l[0]], b = NODES[l[1]], down = sc === "fail" && ((l[0] === "C" && l[1] === "E")); s += '<line x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" class="wr' + (down ? " dash" : "") + '" style="' + (down ? "stroke:var(--incorrect)" : "") + '"/>'; });
      for(var i = 1; i < path.length; i++){ var a1 = NODES[path[i - 1]], b1 = NODES[path[i]]; s += '<line x1="' + a1[0] + '" y1="' + a1[1] + '" x2="' + b1[0] + '" y2="' + b1[1] + '" class="wr hi"/>'; }
      Object.keys(NODES).forEach(function(k){ var p = NODES[k]; s += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="20" class="' + (k === pos && !done ? "ac" : k === "E" ? "ok" : "bx") + '"/><text x="' + p[0] + '" y="' + (p[1] + 4) + '" class="mid b">' + k + "</text>"; });
      var vsvg = V.svg(w, h, s);
      var tb = "<div class='vtwo'><div><b>Packet header</b>" + V.table(null, [["Destination", "E"], ["Packet number", "1 of 4"], [{ t: "Hop count left", c: ttl <= 1 ? "no" : "hi" }, { t: ttl, c: ttl <= 1 ? "no" : "hi" }]]) + "</div><div><b>Routing table of router " + pos + "</b>" + V.table(["Destination", "Next hop"], [["E", rt[pos] || "-"]]) + "</div></div>";
      view.innerHTML = ""; view.appendChild(vsvg); var d = el("div"); d.innerHTML = tb; view.appendChild(d);
      log.innerHTML = msg || "";
    }
    function hop(){
      if(done) return;
      if(pos === "E"){ done = "arrived"; draw("The packet has <b>arrived</b> at E after " + (path.length - 1) + " hops. The other packets may take different routes; E puts them back in order using the packet numbers."); return; }
      if(ttl <= 0){ done = "dead"; draw("<span class='vbad'>Hop count reached 0: the packet is discarded.</span> The sender can resend it. This stops lost packets circulating for ever."); return; }
      var nx = SCEN[sc].rt[pos]; ttl--; path.push(nx); pos = nx;
      if(pos === "E"){ done = "arrived"; draw("Forwarded to E. Hop count left: " + ttl + ". The packet has <b>arrived</b> after " + (path.length - 1) + " hops."); return; }
      if(ttl <= 0){ done = "dead"; draw("Forwarded to " + pos + ", but the hop count is now 0, so the router <b class='vbad'>discards the packet</b>."); return; }
      draw("The router read the destination in the header, looked it up in its routing table and forwarded the packet to <b>" + pos + "</b>. The hop count went down by 1.");
    }
    var tabs = row(); Object.keys(SCEN).forEach(function(k){ var b = btn(SCEN[k].title, function(){ sc = k; Array.prototype.forEach.call(tabs.children, function(x){ x.className = "vb" + (x.dataset.k === k ? " on" : ""); }); reset(SCEN[k].note); }); b.dataset.k = k; b.className = "vb" + (k === sc ? " on" : ""); tabs.appendChild(b); });
    box.appendChild(tabs); box.appendChild(row(el("label", null, "Starting hop count: "), tin, btn("Send next hop ›", hop, "p"), btn("↺ Send a new packet", function(){ reset(SCEN[sc].note); })));
    tin.addEventListener("input", function(){ reset(); });
    box.appendChild(view); box.appendChild(log); reset(SCEN[sc].note);
  });

  /* ---------- 14.1 HTTP and FTP ---------- */
  V.reg("http", function(box){
    var tab = "http", url = "/index.html", view = el("div"), tabs;
    var PAGES = { "/index.html": [200, "OK", "text/html", "<html>Welcome</html>"], "/old-page.html": [301, "Moved Permanently", "", "Location: /index.html (the browser follows it)"], "/secret.html": [403, "Forbidden", "text/html", "You may not view this page"], "/nothing.html": [404, "Not Found", "text/html", "The page does not exist"] };
    function draw(){
      var h = "";
      if(tab === "http"){
        var p = PAGES[url];
        h += "<div class='vtwo'><div><b>1. Browser sends a request</b><pre class='vpre'>GET " + url + " HTTP/1.1\nHost: www.example.com\nAccept: text/html</pre></div><div><b>2. Web server replies</b><pre class='vpre'>HTTP/1.1 " + p[0] + " " + p[1] + "\n" + (p[2] ? "Content-Type: " + p[2] + "\n" : "") + "\n" + p[3] + "</pre></div></div>";
        h += "<div class='vnote'>HTTP is an <b>application-layer</b> protocol. The <b>GET</b> method asks for a page; the status code says what happened: 200 = success, 301 = moved, 403 = forbidden, 404 = not found. The request and reply travel inside TCP segments.</div>";
      } else {
        h += V.table(["Step", "Client", "Server"], [["1", "Opens a <b>control connection</b> (login: user name and password)", "Accepts and checks the login"], ["2", "Sends a command, e.g. <code>RETR report.docx</code>", "Opens a separate <b>data connection</b>"], ["3", "Receives the file", "Sends the file"], ["4", "Closes the connection", "Closes the data connection"]]);
        h += "<div class='vnote'>FTP (file transfer protocol) copies <b>files</b> between computers; unlike HTTP it can also <b>upload</b>, and it needs a login. Because systems differ, a text file may need converting (ASCII or binary mode). HTTP is for web pages, FTP for transferring files.</div>";
      }
      view.innerHTML = h;
    }
    var ctl = row(el("label", null, "Page requested: ")); var sel = el("select", "vin"); Object.keys(PAGES).forEach(function(k){ var o = el("option"); o.value = k; o.textContent = k; sel.appendChild(o); }); sel.addEventListener("change", function(){ url = sel.value; draw(); }); ctl.appendChild(sel);
    tabs = tabsRow([["http", "HTTP (web pages)"], ["ftp", "FTP (file transfer)"]], tab, function(k){ tab = k; tabs.mark(k); ctl.style.display = k === "http" ? "" : "none"; draw(); });
    box.appendChild(tabs); box.appendChild(ctl); box.appendChild(view); draw();
  });
})(typeof window !== "undefined" ? window : this);
