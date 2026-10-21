/* AS Level (11BR) iLearn visuals: BCD, decomposition and error types. Original interactive artwork, drawn in code. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  /* ---------- BCD: each denary digit becomes its own 4-bit group ---------- */
  V.reg("bcd", function(box){
    var inp = el("input", "vin mono"), out = el("div", "vres"), sel = "";
    inp.value = "259"; inp.maxLength = 4; inp.style.width = "90px"; inp.setAttribute("aria-label", "Denary number");
    function pad(n, w){ var s = n.toString(2); while(s.length < w) s = "0" + s; return s; }
    function draw(){
      var v = inp.value.replace(/\D/g, "").slice(0, 4); if(v !== inp.value) inp.value = v;
      if(!v){ out.innerHTML = "Type a denary number (up to 4 digits)."; return; }
      var h = '<div class="bcdrow">';
      v.split("").forEach(function(d){ h += '<div class="bcdcell"><div class="bcdd">' + d + '</div><div class="bcdb">' + pad(+d, 4) + "</div></div>"; });
      h += "</div><p style='margin:8px 0 2px'><b>BCD:</b> <code>" + v.split("").map(function(d){ return pad(+d, 4); }).join(" ") + "</code> (" + v.length * 4 + " bits, one group per digit)</p>";
      h += "<p style='margin:2px 0'><b>Pure binary:</b> <code>" + pad(parseInt(v, 10), 4) + "</code> → <code>" + parseInt(v, 10).toString(2) + "</code> (" + parseInt(v, 10).toString(2).length + " bits)</p>";
      h += "<p class='vnote' style='margin:6px 0 0'>Each digit is converted on its own, so the groups 1010 to 1111 are never used. Digits are easy to display and no rounding errors appear, which is why BCD suits calculators, clocks and money.</p>";
      out.innerHTML = h;
    }
    inp.addEventListener("input", draw);
    var Q = [["Which is the BCD for the denary number 47?", ["0100 0111", "0010 1111", "1110 0111"], 0, "4 is 0100 and 7 is 0111, each digit on its own."], ["Which group can never appear in BCD?", ["1001", "1010", "0000"], 1, "1010 is ten, which is not a single digit."], ["The BCD 0011 1000 is the denary number...", ["56", "38", "83"], 1, "0011 is 3 and 1000 is 8."]], qi = 0, qbox = el("div", "vres"), score = 0;
    function ask(){
      if(qi >= Q.length){ qbox.innerHTML = "<b>Quick check finished: " + score + " out of " + Q.length + ".</b> "; qbox.appendChild(btn("Again", function(){ qi = 0; score = 0; ask(); })); return; }
      var q = Q[qi]; qbox.innerHTML = "<b>Quick check " + (qi + 1) + " of " + Q.length + ":</b> " + esc(q[0]); var r = row();
      q[1].forEach(function(t, i){ var b = btn(t, function(){ var ok = i === q[2]; if(ok) score++; Array.prototype.forEach.call(r.children, function(x, j){ x.disabled = true; if(j === q[2]) x.className += " sdright"; else if(j === i) x.className += " sdwrong"; }); var f = el("div", "", (ok ? '<span class="vok">✓</span> ' : '<span class="vbad">✗</span> ') + esc(q[3])); f.style.marginTop = "6px"; qbox.appendChild(f); qbox.appendChild(row(btn("Next ›", function(){ qi++; ask(); }, "p"))); }); b.className += " vmono"; r.appendChild(b); });
      qbox.appendChild(r);
    }
    box.appendChild(el("div", "vnote", "BCD (binary coded decimal) writes each denary digit as its own 4-bit group. Type a number and compare it with ordinary binary."));
    box.appendChild(row(el("label", "", "Denary: "), inp)); box.appendChild(out); box.appendChild(qbox); draw(); ask();
  });

  /* ---------- decomposition: split a system into modules ---------- */
  V.reg("decomp", function(box){
    var T = { n: "Stock control system", k: [
      { n: "Record new stock", k: [{ n: "Read delivery details" }, { n: "Add quantity to stock level" }] },
      { n: "Record sales", k: [{ n: "Read item sold" }, { n: "Reduce stock level" }, { n: "Store date of sale" }] },
      { n: "Monitor stock levels", k: [{ n: "Check each item's level" }, { n: "Compare with reorder level" }, { n: "Raise a reorder alert" }] },
      { n: "Produce reports", k: [{ n: "Total sales per day" }, { n: "List low-stock items" }] } ] };
    var open = {}, host = el("div", "dcm"), info = el("div", "vlog");
    function node(n, path, depth){
      var d = el("div", "dcn"), isOpen = !!open[path], has = !!n.k;
      var b = el("button", "dcb" + (has ? "" : " leaf") + (isOpen ? " open" : "")); b.type = "button";
      b.innerHTML = esc(n.n) + (has ? (isOpen ? "  ▾" : "  ▸ split") : "");
      b.addEventListener("click", function(){ if(!has) return; open[path] = !open[path]; draw(); count(); });
      d.appendChild(b);
      if(has && isOpen){ var kids = el("div", "dck"); n.k.forEach(function(c, i){ kids.appendChild(node(c, path + "." + i, depth + 1)); }); d.appendChild(kids); }
      return d;
    }
    function count(){
      var n = 0, leaves = 0; (function walk(x, p){ if(open[p] && x.k){ n++; x.k.forEach(function(c, i){ walk(c, p + "." + i); }); } })(T, "r");
      (function lf(x, p){ if(x.k && open[p]) x.k.forEach(function(c, i){ lf(c, p + "." + i); }); else leaves++; })(T, "r");
      info.innerHTML = n ? "<b>" + leaves + " smaller tasks</b> after " + n + " split" + (n === 1 ? "" : "s") + ". Each box can become a <b>procedure or function</b> (a module): easier to write, test and fix on its own, and different programmers can work on different modules." : "Click the box to split the problem into sub-problems.";
    }
    function draw(){ host.innerHTML = ""; host.appendChild(node(T, "r", 0)); }
    box.appendChild(el("div", "vnote", "Decomposition breaks a big problem into smaller sub-problems. Click a box to split it, then split the pieces again."));
    box.appendChild(host); box.appendChild(row(btn("Split everything", function(){ (function all(x, p){ if(x.k){ open[p] = true; x.k.forEach(function(c, i){ all(c, p + "." + i); }); } })(T, "r"); draw(); count(); }), btn("Collapse", function(){ open = {}; draw(); count(); }))); box.appendChild(info);
    // the root path is "r"
    open = {}; draw(); count();
  });

  /* ---------- error types: syntax, logic or run-time? ---------- */
  V.reg("errtypes", function(box){
    var Q = [
      { c: "FOR Count ← 1 TO 10\n   OUTPUT Count", a: 0, w: "The loop has no NEXT Count. The statement does not follow the grammar of the language, so this is a SYNTAX error." },
      { c: "Total ← 100\nCount ← 0\nAverage ← Total / Count", a: 2, w: "Dividing by zero is an illegal operation: the program crashes while it is running. That is a RUN-TIME error." },
      { c: "// Pass mark is 50 or more\nIF Mark > 50 THEN\n   OUTPUT \"Pass\"\nENDIF", a: 1, w: "The program runs but gives the wrong result when Mark is 50. The code does not do what was intended: a LOGIC error." },
      { c: "OUTPUT \"Hello", a: 0, w: "The closing quotation mark is missing. A broken rule of the language: a SYNTAX error." },
      { c: "// Price of several items\nPrice ← Quantity + Cost", a: 1, w: "It adds instead of multiplying. No error message appears, but the answer is wrong: a LOGIC error." },
      { c: "DECLARE Scores : ARRAY[1:10] OF INTEGER\nOUTPUT Scores[11]", a: 2, w: "Index 11 does not exist, so an illegal operation happens while the program runs: a RUN-TIME error." }
    ], names = ["Syntax error", "Logic error", "Run-time error"], qi = 0, score = 0, view = el("div");
    function show(){
      view.innerHTML = "";
      if(qi >= Q.length){ view.appendChild(el("div", "vres", "<b>Finished: " + score + " out of " + Q.length + ".</b> " + (score >= 5 ? "⭐⭐⭐ You can tell the three types apart." : "Read the explanations again, then try once more."))); view.appendChild(row(btn("Play again", function(){ qi = 0; score = 0; show(); }))); return; }
      var q = Q[qi]; view.appendChild(el("div", "", "<b>Code " + (qi + 1) + " of " + Q.length + ":</b> what type of error is in this code?"));
      var pre = el("pre", "ln-pre"); pre.textContent = q.c; view.appendChild(pre);
      var r = row(), fb = el("div", "vlog");
      names.forEach(function(nm, i){ var b = btn(nm, function(){ var ok = i === q.a; if(ok) score++; Array.prototype.forEach.call(r.children, function(x, j){ x.disabled = true; if(j === q.a) x.className += " sdright"; else if(j === i) x.className += " sdwrong"; }); fb.innerHTML = (ok ? '<span class="vok">✓ Correct.</span> ' : '<span class="vbad">✗ Not quite.</span> ') + esc(q.w); fb.appendChild(row(btn(qi + 1 >= Q.length ? "See my score" : "Next ›", function(){ qi++; show(); }, "p"))); }); r.appendChild(b); });
      view.appendChild(r); view.appendChild(fb);
    }
    box.appendChild(el("div", "vnote", "Syntax error: the rules of the language are broken. Logic error: it runs but gives wrong results. Run-time error: an illegal operation happens while the program runs.")); box.appendChild(view); show();
  });
})(typeof window !== "undefined" ? window : this);
