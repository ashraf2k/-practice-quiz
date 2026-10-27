/* iLearn (10BR) visuals, part 5: subroutines (topic 8.1.6). A function drawn as a MACHINE: values go in as parameters, the machine works on them,
   and RETURN sends one value back to the line that called it. A procedure is the same machine with no output chute. Original artwork built in code. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc, svg = V.svg;
  var RM = false; try { RM = !!(root.matchMedia && root.matchMedia("(prefers-reduced-motion: reduce)").matches); } catch(e){}
  function later(box, list, fn, ms){ var id = setTimeout(function(){ if(box.isConnected) fn(); }, RM ? 30 : ms); list.push(id); }
  function clear(list){ while(list.length) clearTimeout(list.pop()); }
  function dashes(n){ var s = ""; for(var i = 0; i < n; i++) s += "-"; return s; }

  var PRE = {
    func: [
      { name: "Double", params: [{ n: "Number", v: 7, t: "int" }],
        def: ["FUNCTION Double(Number : INTEGER) RETURNS INTEGER", "   RETURN Number * 2", "ENDFUNCTION"],
        work: function(a){ return { text: a[0] + " * 2 = " + (a[0] * 2), ret: a[0] * 2 }; } },
      { name: "Area", params: [{ n: "Length", v: 4, t: "int" }, { n: "Width", v: 6, t: "int" }],
        def: ["FUNCTION Area(Length : INTEGER, Width : INTEGER) RETURNS INTEGER", "   RETURN Length * Width", "ENDFUNCTION"],
        work: function(a){ return { text: a[0] + " * " + a[1] + " = " + (a[0] * a[1]), ret: a[0] * a[1] }; } },
      { name: "SumSquare", params: [{ n: "Number1", v: 10, t: "int" }, { n: "Number2", v: 20, t: "int" }],
        def: ["FUNCTION SumSquare(Number1 : INTEGER, Number2 : INTEGER) RETURNS INTEGER", "   RETURN Number1 * Number1 + Number2 * Number2", "ENDFUNCTION"],
        work: function(a){ var r = a[0] * a[0] + a[1] * a[1]; return { text: a[0] + "*" + a[0] + " + " + a[1] + "*" + a[1] + " = " + r, ret: r }; } }
    ],
    proc: [
      { name: "Line", params: [{ n: "Size", v: 5, t: "int", min: 1, max: 20 }],
        def: ["PROCEDURE Line(Size : INTEGER)", "   FOR Count ← 1 TO Size", "      OUTPUT \"-\"", "   NEXT Count", "ENDPROCEDURE"],
        work: function(a){ return { text: "outputs " + a[0] + " dash" + (a[0] === 1 ? "" : "es"), out: dashes(a[0]) }; } },
      { name: "Greet", params: [{ n: "Name", v: "Sam", t: "str" }, { n: "Times", v: 3, t: "int", min: 1, max: 5 }],
        def: ["PROCEDURE Greet(Name : STRING, Times : INTEGER)", "   FOR Count ← 1 TO Times", "      OUTPUT \"Hello \", Name", "   NEXT Count", "ENDPROCEDURE"],
        work: function(a){ var o = [], i; for(i = 0; i < a[1]; i++) o.push("Hello " + a[0]); return { text: "outputs Hello " + a[0] + " " + a[1] + " time" + (a[1] === 1 ? "" : "s"), out: o.join("\n") }; } }
    ]
  };

  V.reg("submachine", function(box, o){
    var kind = o.kind === "proc" ? "proc" : "func", pi = 0, vals = [], timers = [], pl = null, S, view = el("div"), cap = el("div", "vres"), code = el("div", "vtwo"), cons = el("div", "vres");

    function P(){ return PRE[kind][pi]; }
    function argText(){ return P().params.map(function(p, i){ return p.t === "str" ? '"' + vals[i] + '"' : String(vals[i]); }).join(", "); }
    function callText(){ return kind === "func" ? "Result ← " + P().name + "(" + argText() + ")" : "CALL " + P().name + "(" + argText() + ")"; }
    function mainLines(){ return kind === "func" ? [callText(), "OUTPUT Result"] : [callText(), "OUTPUT \"Done\""]; }
    function listing(lines, hot){ return '<pre class="ln-pre" style="margin:0;white-space:pre-wrap">' + lines.map(function(l, k){ return '<span style="display:block;' + (hot === k ? "background:var(--accent-tint);font-weight:700" : "") + '">' + esc(l) + "</span>"; }).join("") + "</pre>"; }
    function showCode(defHot, mainHot){
      code.innerHTML = '<div><b class="vnote">Main program</b>' + listing(mainLines(), mainHot) + '</div><div><b class="vnote">The ' + (kind === "func" ? "function" : "procedure") + " definition</b>" + listing(P().def, defHot) + "</div>";
    }

    function draw(){
      var p = P(), n = p.params.length, h = "", i;
      h += '<defs><marker id="smk" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="var(--muted)"/></marker></defs>';
      // main program box
      h += '<rect class="bx" x="8" y="16" width="214" height="214" rx="12"/><text class="b" x="20" y="38">Main program</text>' +
        '<text class="mu sm" x="20" y="56">the line that CALLS the ' + (kind === "func" ? "function" : "procedure") + '</text>' +
        '<rect class="ac" x="18" y="68" width="194" height="34" rx="8"/><text class="mono" id="sm-call" x="26" y="90" style="font:12px ui-monospace,Menlo,monospace"></text>' +
        '<text class="mu sm" x="20" y="132" id="sm-nl">next line</text><rect class="bx" x="18" y="140" width="194" height="34" rx="8"/><text id="sm-next" x="26" y="162" style="font:12px ui-monospace,Menlo,monospace">' + esc(mainLines()[1]) + '</text>';
      // wires main -> machine
      for(i = 0; i < n; i++){ var wy = 84 + i * 30; h += '<path class="wr dash" id="sm-w' + i + '" d="M222 ' + wy + 'H300" marker-end="url(#smk)"/>'; }
      h += '<text class="mu sm mid" x="262" y="62">parameters in</text>';
      // machine
      h += '<rect class="ac" x="304" y="16" width="226" height="214" rx="16" stroke-width="3"/><text class="b mid" x="417" y="40" style="font-size:15px">' + esc(p.name) + '</text>' +
        '<text class="mu sm mid" x="417" y="55">' + (kind === "func" ? "a function: input → machine → one output" : "a procedure: does a job, returns nothing") + '</text>';
      for(i = 0; i < n; i++) h += '<text id="sm-p' + i + '" x="318" y="' + (84 + i * 26) + '" style="font:13px ui-monospace,Menlo,monospace;opacity:0;transition:opacity .4s"></text>';
      h += '<text id="sm-work" x="318" y="162" style="font:13px ui-monospace,Menlo,monospace;opacity:0;transition:opacity .4s"></text>' +
        '<g class="gear" id="sm-g1" style="transform-origin:352px 204px"><circle cx="352" cy="204" r="14" fill="none" stroke="var(--muted)" stroke-width="3" stroke-dasharray="5 3"/><circle cx="352" cy="204" r="4" fill="var(--muted)"/></g>' +
        '<g class="gear rev" id="sm-g2" style="transform-origin:384px 204px"><circle cx="384" cy="204" r="10" fill="none" stroke="var(--muted)" stroke-width="3" stroke-dasharray="4 3"/><circle cx="384" cy="204" r="3" fill="var(--muted)"/></g>';
      // chute
      if(kind === "func") h += '<rect class="ok" x="530" y="112" width="60" height="38" rx="6"/><text class="b mid" x="560" y="136" style="font-size:11px">RETURN</text><text class="mu sm mid" x="560" y="104">one value out</text>';
      else h += '<rect class="bx dash" x="530" y="112" width="60" height="38" rx="6" stroke-dasharray="4 3"/><text class="mu sm mid" x="560" y="136">no RETURN</text><text class="mu sm mid" x="560" y="104">nothing out</text>';
      // return path
      if(kind === "func") h += '<path class="wr dash" d="M590 131H640V248H112V232" fill="none" marker-end="url(#smk)" opacity=".55"/>';
      else h += '<path class="wr dash" d="M530 24V8H112V16" fill="none" marker-end="url(#smk)" opacity=".55"/><text class="mu sm" x="300" y="6">control comes back to the line after CALL</text>';
      h += '<g id="sm-toks"></g>';
      S = svg(660, 262, h); S.setAttribute("class", "vsvg smsvg"); S.setAttribute("aria-label", "A " + (kind === "func" ? "function drawn as a machine with inputs and an output" : "procedure drawn as a machine with inputs and no output"));
      view.innerHTML = ""; view.appendChild(S);
      S.querySelector("#sm-call").textContent = callText();
    }
    function q(id){ return S.querySelector("#" + id); }
    function tok(text, x, y){
      var g = document.createElementNS("http://www.w3.org/2000/svg", "g"); g.setAttribute("class", "smtok"); g.style.transform = "translate(" + x + "px," + y + "px)";
      g.innerHTML = '<rect x="-22" y="-14" width="44" height="28" rx="14" fill="var(--accent)"/><text class="mid b" y="5" style="fill:var(--on-accent);font-size:13px">' + esc(String(text)) + "</text>"; q("sm-toks").appendChild(g);
      return g;
    }
    function mv(g, x, y){ g.style.transform = "translate(" + x + "px," + y + "px)"; }
    function say(h){ cap.innerHTML = h; }

    function steps(){
      var p = P(), n = p.params.length, w = p.work(vals), s = [], isF = kind === "func", i;
      s.push(function(){ say("<b>1. The call.</b> The main program reaches <code>" + esc(callText()) + "</code>. It stops and hands control to " + (isF ? "the function" : "the procedure") + ' <b>' + esc(p.name) + "</b>."); showCode(-1, 0); });
      s.push(function(){
        say("<b>2. Pass the values in.</b> The values in the brackets (the <b>arguments</b>) travel into the " + (isF ? "machine" : "procedure") + ". Each lands in a <b>parameter</b>, in order: " + p.params.map(function(x, k){ return "<code>" + esc(x.n) + "</code> gets <b>" + esc(vals[k]) + "</b>"; }).join(", ") + ".");
        showCode(0, 0);
        for(i = 0; i < n; i++) (function(i){ var g = tok(vals[i], 190, 84 + i * 30); S.setAttribute("data-t" + i, "1"); q("sm-w" + i).setAttribute("class", "wr dash live"); setTimeout(function(){ mv(g, 318, 84 + i * 26 - 5); }, 30); })(i);
      });
      s.push(function(){
        say("<b>3. Inside the machine.</b> The parameters are <b>local variables</b>: they exist only while the " + (isF ? "function" : "procedure") + " runs. The values are copied, so the main program's own variables are not touched.");
        showCode(0, -1);
        var gs = S.querySelectorAll(".smtok"); for(i = 0; i < gs.length; i++) gs[i].style.opacity = "0";
        for(i = 0; i < n; i++){ var t = q("sm-p" + i); t.textContent = p.params[i].n + " = " + (p.params[i].t === "str" ? '"' + vals[i] + '"' : vals[i]); t.style.opacity = "1"; q("sm-w" + i).setAttribute("class", "wr dash"); }
        q("sm-g1").classList.add("run"); q("sm-g2").classList.add("run");
      });
      s.push(function(){
        say("<b>4. The machine works.</b> The statements inside run using those values: <b>" + esc(w.text) + "</b>.");
        showCode(1, -1); var t = q("sm-work"); t.textContent = isF ? "working: " + w.text : w.text; t.style.opacity = "1";
        if(!isF){ cons.style.display = ""; cons.innerHTML = "<b>Output</b><pre class='ln-pre' style='margin:4px 0 0'>" + esc(w.out) + "</pre>"; }
      });
      if(isF){
        s.push(function(){
          say("<b>5. RETURN.</b> <code>RETURN</code> pushes <b>one value</b> out of the machine and ends the function. The value travels back to where the function was called.");
          showCode(1, -1); q("sm-g1").classList.remove("run"); q("sm-g2").classList.remove("run");
          var g = tok(w.ret, 560, 131); g.style.transition = "none"; g.style.opacity = "0"; setTimeout(function(){ g.style.transition = ""; g.style.opacity = "1"; }, 20);
          setTimeout(function(){ mv(g, 614, 131); }, 60); later(box, timers, function(){ mv(g, 614, 248); }, 500); later(box, timers, function(){ mv(g, 112, 248); }, 1000); later(box, timers, function(){ mv(g, 112, 120); }, 1700);
          later(box, timers, function(){ g.style.opacity = "0"; }, 2100);
        });
        s.push(function(){
          say("<b>6. Back in the main program.</b> The returned value <b>replaces the call</b>: <code>" + esc("Result ← " + w.ret) + "</code>. The program carries on with the next line.");
          showCode(2, 0); q("sm-call").textContent = "Result ← " + w.ret; q("sm-call").style.fill = "var(--correct)";
        });
        s.push(function(){
          say("<b>7. Use the answer.</b> <code>OUTPUT Result</code> prints <b>" + esc(w.ret) + "</b>. Change the input values and run it again: same machine, different input, different output.");
          showCode(2, 1); cons.style.display = ""; cons.innerHTML = "<b>Output</b><pre class='ln-pre' style='margin:4px 0 0'>" + esc(w.ret) + "</pre>"; q("sm-next").style.fill = "var(--correct)";
        });
      } else {
        s.push(function(){
          say("<b>5. ENDPROCEDURE.</b> A procedure <b>returns nothing</b>. It simply finishes, and control goes back to the line <b>after</b> the <code>CALL</code>. Compare with a function, which sends a value back.");
          showCode(4, 1); q("sm-g1").classList.remove("run"); q("sm-g2").classList.remove("run"); q("sm-next").style.fill = "var(--correct)";
        });
      }
      return s;
    }

    var list = [];
    function build(){
      clear(timers); if(pl) pl.remove();
      list = steps();
      pl = V.player(box, { count: function(){ return list.length; }, show: function(i){ list[i](); }, reset: function(){
        clear(timers); draw(); showCode(-1, -1); cons.style.display = "none"; cons.innerHTML = "";
        say("Press <b>Step</b> or <b>Play</b> to follow one " + (kind === "func" ? "function call" : "procedure call") + ". You can change the input values first.");
      }, ms: 2400 });
      box.insertBefore(pl, ctrl.nextSibling);
    }
    function readVals(){ vals = P().params.map(function(p, i){ var inp = ins[i]; if(p.t === "str") return (inp.value || p.v).slice(0, 8); var n = parseInt(inp.value, 10); if(isNaN(n)) n = p.v; var lo = p.min != null ? p.min : -99, hi = p.max != null ? p.max : 99; return Math.max(lo, Math.min(hi, n)); }); }
    var ctrl = row(), ins = [], tabs = row();
    function setKind(k){ kind = k; pi = 0; tabs.querySelectorAll("button").forEach(function(b){ b.classList.toggle("p", b.getAttribute("data-k") === k); }); fillCtrl(); }
    function fillCtrl(){
      ctrl.innerHTML = ""; ins = [];
      var sel = el("select", "vin"); PRE[kind].forEach(function(p, i){ var op = el("option", null, esc(p.name)); op.value = i; sel.appendChild(op); }); sel.value = pi; sel.setAttribute("aria-label", "Choose an example");
      sel.addEventListener("change", function(){ pi = +sel.value; fillCtrl(); });
      var l0 = el("label", null, (kind === "func" ? "Function: " : "Procedure: ")); l0.appendChild(sel); ctrl.appendChild(l0);
      P().params.forEach(function(p){ var inp = el("input", "vin mono"); inp.type = p.t === "str" ? "text" : "number"; inp.value = p.v; inp.style.width = p.t === "str" ? "90px" : "64px"; inp.setAttribute("aria-label", "Value for " + p.n);
        var lb = el("label", null, esc(p.n) + " = "); lb.appendChild(inp); ctrl.appendChild(lb); ins.push(inp); inp.addEventListener("change", function(){ readVals(); build(); }); });
      readVals(); build();
    }
    var intro = el("p", null, kind === "func"
      ? "Think of a <b>function as a machine</b>. You <b>put values in</b> (the parameters), the machine works on them, and it <b>gives one value back</b> (the return value). Type your own inputs, then press <b>Step</b>."
      : "A <b>procedure</b> is like a machine that <b>does a job</b> for you but gives nothing back. Type your own inputs, then press <b>Step</b>. Switch to the function tab to compare.");
    [["func", "⚙️ Function (returns a value)"], ["proc", "🔧 Procedure (no return value)"]].forEach(function(t){ var b = btn(t[1], function(){ setKind(t[0]); }); b.setAttribute("data-k", t[0]); tabs.appendChild(b); });
    box.appendChild(intro); box.appendChild(tabs); box.appendChild(ctrl); box.appendChild(view); box.appendChild(cap); box.appendChild(cons); box.appendChild(code);
    setKind(kind);
  });
})(typeof window !== "undefined" ? window : this);
