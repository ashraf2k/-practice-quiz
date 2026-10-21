/* A Level iLearn visuals, part 6: syntax diagrams and Backus-Naur form (9618 section 16.2.3).
   A small "railroad diagram" engine draws exam-style syntax diagrams as SVG: an entry dot and exit arrow, ovals for items typed exactly (terminals),
   rectangles for items defined in another diagram (non-terminals), arrows along every path, branches for alternatives, a loop-back path for
   repetition and a bypass for optional items. Widgets: synkey (read a diagram, and the same idea in BNF), syndiag (walk a string through the
   diagrams), bnfderive (build a string from BNF rules, with the parse tree growing), synquiz (diagram and BNF questions).
   All artwork is original, drawn in code. */
(function(root){
  "use strict";
  var V = root.ILEARN_VIZ, el = V.el, btn = V.btn, row = V.row, esc = V.esc;

  /* ================= the diagram engine ================= */
  var BH = 34, AR = 11, VS = 10, GAP = 26, FS = 15, uid = 0, cx = null;
  function tw(s){
    try { if(!cx) cx = document.createElement("canvas").getContext("2d"); cx.font = "600 " + FS + 'px system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'; var w = cx.measureText(s).width; if(w && isFinite(w)) return w; } catch(e){}
    return s.length * 8.8;
  }
  var D = {
    T: function(s){ return { t: "T", s: s, id: "n" + (++uid) }; },
    N: function(s){ return { t: "N", s: s, id: "n" + (++uid) }; },
    E: function(){ return { t: "E", id: "n" + (++uid) }; },
    seq: function(){ return { t: "S", k: [].slice.call(arguments), id: "n" + (++uid) }; },
    alt: function(){ return { t: "A", k: [].slice.call(arguments), id: "n" + (++uid) }; },
    opt: function(x){ return D.alt(D.E(), x); },
    loop: function(x, rep){ return { t: "L", x: x, rep: rep || D.E(), id: "n" + (++uid) }; },
    zom: function(x, rep){ return D.alt(D.E(), D.loop(x, rep)); }
  };
  function size(n){
    var i, w, m;
    if(n.t === "T"){ n.W = Math.max(BH, tw(n.s) + 26); n.U = n.D = BH / 2; }
    else if(n.t === "N"){ n.W = tw(n.s) + 28; n.U = n.D = BH / 2; }
    else if(n.t === "E"){ n.W = 0; n.U = n.D = 0; }
    else if(n.t === "S"){ w = 0; n.U = 0; n.D = 0; n.k.forEach(function(c, j){ size(c); w += c.W + (j ? GAP : 0); n.U = Math.max(n.U, c.U); n.D = Math.max(n.D, c.D); }); n.W = w; }
    else if(n.t === "A"){
      m = 0; n.k.forEach(function(c){ size(c); m = Math.max(m, c.W); }); n.mw = m; n.off = [0];
      for(i = 1; i < n.k.length; i++) n.off[i] = n.off[i - 1] + n.k[i - 1].D + VS + n.k[i].U;
      n.W = m + 4 * AR; n.U = n.k[0].U; n.D = n.off[n.k.length - 1] + n.k[n.k.length - 1].D;
    } else if(n.t === "L"){
      size(n.x); size(n.rep); n.iw = Math.max(n.x.W, n.rep.W); n.Hd = Math.max(n.x.D + VS + n.rep.U, 2 * AR + 4);
      n.W = n.iw + 4 * AR; n.U = n.x.U; n.D = n.Hd + n.rep.D;
    }
    return n;
  }
  function arrR(x, y){ return '<polygon class="sda" points="' + x + "," + y + " " + (x - 8) + "," + (y - 4.5) + " " + (x - 8) + "," + (y + 4.5) + '"/>'; }
  function arrL(x, y){ return '<polygon class="sda" points="' + x + "," + y + " " + (x + 8) + "," + (y - 4.5) + " " + (x + 8) + "," + (y + 4.5) + '"/>'; }
  function path(d, extra){ return '<path class="sdp" d="' + d + '"' + (extra || "") + "/>"; }
  function draw(n, x, y, o){
    var s = "", i;
    if(n.t === "T"){
      return '<g class="sdl sdterm" data-id="' + n.id + '"><rect class="sdt" x="' + x + '" y="' + (y - BH / 2) + '" width="' + n.W + '" height="' + BH + '" rx="' + BH / 2 + '"/><text class="sdx" x="' + (x + n.W / 2) + '" y="' + (y + 5.5) + '">' + esc(n.s) + "</text></g>";
    }
    if(n.t === "N"){
      return '<g class="sdl sdnon" data-id="' + n.id + '"><rect class="sdn" x="' + x + '" y="' + (y - BH / 2) + '" width="' + n.W + '" height="' + BH + '" rx="3"/><text class="sdx" x="' + (x + n.W / 2) + '" y="' + (y + 5.5) + '">' + esc(n.s) + "</text></g>";
    }
    if(n.t === "E") return "";
    if(n.t === "S"){
      var px = x;
      n.k.forEach(function(c, j){
        if(j){ s += path("M" + px + " " + y + "H" + (px + GAP)) + arrR(px + GAP, y); px += GAP; }
        s += draw(c, px, y, o); px += c.W;
      });
      return s;
    }
    if(n.t === "A"){
      n.k.forEach(function(c, j){
        var ox = x + 2 * AR + (n.mw - c.W) / 2, oy = y + n.off[j], off = n.off[j], ex = ox + c.W, g = "";
        if(j === 0){
          if(c.t === "E"){ g = path("M" + x + " " + y + "H" + (x + n.W)) + arrR(x + n.W / 2 + 4, y); }
          else { g = path("M" + x + " " + y + "H" + ox) + arrR(ox, y) + path("M" + ex + " " + y + "H" + (x + n.W)); }
        } else {
          g = path("M" + x + " " + y + "q" + AR + " 0 " + AR + " " + AR + "v" + (off - 2 * AR) + "q0 " + AR + " " + AR + " " + AR + "H" + ox) + arrR(ox, oy) +
            path("M" + ex + " " + oy + "H" + (x + n.W - 2 * AR) + "q" + AR + " 0 " + AR + " -" + AR + "v-" + (off - 2 * AR) + "q0 -" + AR + " " + AR + " -" + AR);
        }
        s += '<g class="sdb" data-br="' + n.id + ":" + j + '">' + g + "</g>" + draw(c, ox, oy, o);
      });
      return s;
    }
    if(n.t === "L"){
      var ix = x + 2 * AR + (n.iw - n.x.W) / 2, xr = x + n.W - 2 * AR, xl = x + 2 * AR, by = y + n.Hd, rx = x + 2 * AR + (n.iw - n.rep.W) / 2, rr = rx + n.rep.W;
      s += path("M" + x + " " + y + "H" + ix) + arrR(ix, y) + path("M" + (ix + n.x.W) + " " + y + "H" + (x + n.W)) + draw(n.x, ix, y, o);
      var lp = "M" + xr + " " + y + "q" + AR + " 0 " + AR + " " + AR + "v" + (n.Hd - 2 * AR) + "q0 " + AR + " -" + AR + " " + AR;
      if(n.rep.t === "E") lp += "H" + xl + "q-" + AR + " 0 -" + AR + " -" + AR + "v-" + (n.Hd - 2 * AR) + "q0 -" + AR + " " + AR + " -" + AR;
      else lp += "H" + rr + "M" + rx + " " + by + "H" + xl + "q-" + AR + " 0 -" + AR + " -" + AR + "v-" + (n.Hd - 2 * AR) + "q0 -" + AR + " " + AR + " -" + AR;
      s += '<g class="sdb sdloop" data-lp="' + n.id + '">' + path(lp) + (n.rep.t === "E" ? arrL(x + n.W / 2 - 6, by) : arrL(rr, by) + arrL(xl + 4, by)) + "</g>";
      if(n.rep.t !== "E") s += draw(n.rep, rx, by, o);
      return s;
    }
    return s;
  }
  // Draw one named diagram: title, entry dot, the shape, exit arrow.
  function diagram(name, ast, o){
    o = o || {}; size(ast);
    var x0 = 30, top = name ? 30 : 8, y0 = top + ast.U + 4, W = x0 + ast.W + 40, H = y0 + ast.D + 16;
    var s = (name ? '<text class="sdname" x="6" y="19">' + esc(name) + "</text>" : "") + '<circle class="sdot" cx="9" cy="' + y0 + '" r="4.5"/>' + path("M13 " + y0 + "H" + x0) + arrR(x0, y0) +
      draw(ast, x0, y0, o) + path("M" + (x0 + ast.W) + " " + y0 + "H" + (W - 6)) + arrR(W - 6, y0);
    var svg = V.svg(W, H, s); svg.setAttribute("class", "vsvg sdsvg"); svg.setAttribute("width", W); svg.setAttribute("height", H); svg.setAttribute("aria-label", "Syntax diagram" + (name ? " for " + name : ""));
    svg.style.minWidth = "0"; svg.style.width = W + "px"; svg.style.maxWidth = "100%"; svg.style.height = "auto"; svg.style.margin = "0"; return svg;
  }
  V.syn = { D: D, diagram: diagram };

  /* ================= the example grammars (diagrams) ================= */
  var T = D.T, N = D.N, seq = D.seq, alt = D.alt, opt = D.opt, loop = D.loop, zom = D.zom;
  function letter(){ return ["letter", alt(T("A"), T("B"), T("C"))]; }
  function digit(){ return ["digit", alt(T("0"), T("1"), T("2"), T("3"), T("4"))]; }
  function digit3(){ return ["digit", alt(T("1"), T("2"), T("3"))]; }
  var G = {
    variable: { name: "Letter then digit", diagrams: [["variable", seq(N("letter"), N("digit"))], letter(), digit3()], def: "B3", tries: ["A1", "B3", "CC", "1A", "Z2", "A4"],
      bnf: ["<variable> ::= <letter><digit>", "<letter>   ::= A | B | C", "<digit>    ::= 1 | 2 | 3"] },
    integer: { name: "Repetition (integer)", diagrams: [["integer", loop(N("digit"))], digit()], def: "1032", tries: ["7", "1032", "42", "4a", "5"],
      bnf: ["<integer> ::= <digit> | <integer><digit>", "<digit>   ::= 0 | 1 | 2 | 3 | 4"] },
    assign: { name: "Assignment statement", diagrams: [["assignment", seq(N("variable"), T("="), N("variable"), N("operator"), N("variable"))], ["variable", seq(N("letter"), N("digit"))], letter(), digit3(), ["operator", alt(T("+"), T("-"), T("*"), T("/"))]], def: "A1=B2+C3", tries: ["A1=B2+C3", "C3=A1*B2", "A1:=B2+C3", "A1=B2+C3+A2", "A1=B2%C3"],
      bnf: ["<assignment> ::= <variable>=<variable><operator><variable>", "<variable>   ::= <letter><digit>", "<letter>     ::= A | B | C", "<digit>      ::= 1 | 2 | 3", "<operator>   ::= + | - | * | /"] },
    ident: { name: "Letter, then letters or digits", diagrams: [["identifier", seq(N("letter"), zom(alt(N("letter"), N("digit"))))], letter(), digit3()], def: "A1B2", tries: ["A", "A1B2", "CC", "1A", "B33"],
      bnf: ["<identifier> ::= <letter> | <identifier><letter> | <identifier><digit>", "<letter>     ::= A | B | C", "<digit>      ::= 1 | 2 | 3"] },
    optional: { name: "Optional parts", diagrams: [["code", seq(N("letter"), opt(N("letter")), opt(N("digit")))], letter(), digit()], def: "AB3", tries: ["A", "AB", "A3", "AB3", "ABC", "3"],
      bnf: ["<code>   ::= <letter> | <letter><letter> | <letter><digit> | <letter><letter><digit>", "<letter> ::= A | B | C", "<digit>  ::= 0 | 1 | 2 | 3 | 4"] }
  };

  /* ================= walking a string through the diagrams ================= */
  function walk(G1, str){
    var defs = {}, ev = [], best = { pos: 0, ev: [] }, top = G1.diagrams[0][1];
    G1.diagrams.forEach(function(d){ defs[d[0]] = d[1]; });
    function leaf(i, ok, a){ if(i > best.pos || (i === best.pos && ev.length > best.ev.length)){ best = { pos: i, ev: ev.slice() }; } }
    function m(n, i, k){
      var j, r;
      if(n.t === "E") return k(i);
      if(n.t === "T"){
        if(str.substr(i, n.s.length) === n.s){ ev.push({ k: "leaf", id: n.id, s: n.s, to: i + n.s.length }); leaf(i + n.s.length); if(k(i + n.s.length)) return true; ev.pop(); }
        return false;
      }
      if(n.t === "N"){
        ev.push({ k: "enter", id: n.id, name: n.s }); var ok = m(defs[n.s], i, function(j2){ ev.push({ k: "leave", id: n.id, name: n.s, to: j2 }); if(k(j2)) return true; ev.pop(); return false; });
        if(ok) return true; ev.pop(); return false;
      }
      if(n.t === "S"){ var f = function(idx, p){ if(idx === n.k.length) return k(p); return m(n.k[idx], p, function(q){ return f(idx + 1, q); }); }; return f(0, i); }
      if(n.t === "A"){ for(j = 0; j < n.k.length; j++){ ev.push({ k: "br", id: n.id, i: j }); if(m(n.k[j], i, k)) return true; ev.pop(); } return false; }
      if(n.t === "L"){
        var around = function(p){
          return m(n.x, p, function(q){
            if(k(q)) return true;
            ev.push({ k: "loop", id: n.id }); var res = m(n.rep, q, function(q2){ return around(q2); }); if(res) return true; ev.pop(); return false;
          });
        };
        return around(i);
      }
      return false;
    }
    var okAll = m(top, 0, function(p){ return p === str.length; });
    return okAll ? { ok: true, ev: ev.slice() } : { ok: false, ev: best.ev, pos: best.pos };
  }

  V.reg("syndiag", function(box){
    var cur = "variable", host = el("div"), bnfBox = el("div", "vres"), inp = el("input", "vin mono"), tabs = row(), tries = row(), log = el("div", "vlog"), strEl = el("div", "sdstr"), stop = null, steps, pos, svgs, res;
    inp.style.width = "170px"; inp.setAttribute("aria-label", "String to test");
    var bPlay, bStep, bRun;
    function halt(){ if(stop){ stop(); stop = null; } if(bPlay) bPlay.textContent = "▶ Play"; }
    function build(){
      halt(); host.innerHTML = ""; svgs = {};
      var g = G[cur]; var wrap = el("div", "sdlist");
      g.diagrams.forEach(function(d){ var c = el("div", "sdcard"); var s = diagram(d[0], d[1]); svgs[d[0]] = s; c.appendChild(s); wrap.appendChild(c); });
      host.appendChild(wrap);
      bnfBox.innerHTML = "<b>The same grammar in BNF</b><pre class='ln-pre' style='margin:6px 0 0'>" + g.bnf.map(esc).join("\n") + "</pre>";
    }
    function strShow(upto, bad){
      var s = inp.value.trim(); var h = '<span class="sdlab">Input: </span>';
      for(var i = 0; i < s.length; i++) h += '<span class="sdch' + (i < upto ? " got" : i === upto && bad ? " bad" : "") + '">' + esc(s.charAt(i)) + "</span>";
      strEl.innerHTML = h || '<span class="sdlab">Type a string to test</span>';
    }
    function clear(){ Array.prototype.forEach.call(host.querySelectorAll(".sdl,.sdb"), function(e){ e.setAttribute("class", e.getAttribute("class").replace(/ (act|done|on)\b/g, "")); }); }
    function mark(id, c){ var e = host.querySelector('[data-id="' + id + '"]'); if(e) e.setAttribute("class", e.getAttribute("class").replace(/ (act|done)\b/g, "") + " " + c); }
    function markB(sel){ var e = host.querySelector(sel); if(e) e.setAttribute("class", e.getAttribute("class") + " on"); }
    function run(){
      halt(); clear(); var s = inp.value.trim(); res = walk(G[cur], s); steps = res.ev; pos = -1;
      if(!s){ log.innerHTML = "Type a string, then press <b>Step</b> or <b>▶ Play</b> to follow it through the diagrams."; strShow(0); return; }
      log.innerHTML = "Press <b>Step ›</b> or <b>▶ Play</b>. The path lights up as each part of <b>" + esc(s) + "</b> is matched against the diagram" + (res.ok ? "." : ". (This string will get stuck.)"); strShow(0); upd();
    }
    function msg(e){
      if(e.k === "enter") return "The diagram has a <b>rectangle</b> called <b>" + esc(e.name) + "</b>, so go to the <b>" + esc(e.name) + "</b> diagram.";
      if(e.k === "br") return "There are alternatives here: take the path that matches the next character.";
      if(e.k === "leaf") return "The next character <b>" + esc(e.s) + "</b> matches the oval <b>" + esc(e.s) + "</b>: move on.";
      if(e.k === "leave") return "Finished the <b>" + esc(e.name) + "</b> diagram: follow the exit arrow back to the first diagram.";
      if(e.k === "loop") return "The arrow <b>loops back</b>, so the item can be repeated: go round again.";
      return "";
    }
    var consumed = [];
    function show(i){
      clear(); var up = 0, e = steps[i], d;
      for(var j = 0; j <= i; j++){ d = steps[j]; if(d.k === "leaf"){ up = d.to; mark(d.id, j === i ? "act" : "done"); } else if(d.k === "br"){ markB('[data-br="' + d.id + ":" + d.i + '"]'); } else if(d.k === "loop"){ markB('[data-lp="' + d.id + '"]'); } else if(d.k === "enter"){ mark(d.id, j === i ? "act" : "done"); } else if(d.k === "leave"){ mark(d.id, "done"); } }
      strShow(up); log.innerHTML = msg(e);
    }
    function final(){
      var s = inp.value.trim();
      if(res.ok){ strShow(s.length); log.innerHTML = '<span class="vok">✓ Accepted.</span> The whole string <b>' + esc(s) + "</b> was matched and the exit arrow of the first diagram was reached. The string is <b>valid</b>."; }
      else { var p = res.pos; strShow(p, true); log.innerHTML = '<span class="vbad">✗ Rejected.</span> ' + (p < s.length ? "The diagrams match <b>" + esc(s.substr(0, p) || "nothing") + "</b> but no path allows <b>" + esc(s.charAt(p)) + "</b> next." : "All of the characters were matched but the diagram needs more before it can reach the exit arrow.") + " The string is <b>invalid</b>."; }
    }
    function next(){
      if(!steps) run();
      if(pos < steps.length - 1){ pos++; show(pos); upd(); return pos < steps.length - 1 || true; }
      if(pos === steps.length - 1){ pos++; final(); upd(); }
      return false;
    }
    function upd(){ bStep.disabled = !!stop || (steps && pos >= steps.length); }
    function load(k){
      cur = k; inp.value = G[k].def; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); b.setAttribute("aria-pressed", b.dataset.k === k); });
      tries.innerHTML = ""; tries.appendChild(el("span", "vnote", "Try:")); G[k].tries.forEach(function(t){ tries.appendChild(btn(t, function(){ inp.value = t; run(); })); });
      build(); run();
    }
    Object.keys(G).forEach(function(k){ var b = btn(G[k].name, function(){ load(k); }); b.dataset.k = k; tabs.appendChild(b); });
    bPlay = btn("▶ Play", function(){ if(stop){ halt(); return; } if(!steps || pos >= steps.length) run(); bPlay.textContent = "⏸ Pause"; stop = V.timer(box, function(){ if(pos >= steps.length - 1){ next(); halt(); upd(); return false; } next(); }, 1000); upd(); }, "p");
    bStep = btn("Step ›", function(){ next(); }); bRun = btn("↺ Reset", run);
    inp.addEventListener("input", run);
    box.appendChild(el("div", "vnote", "Pick a grammar, type a string and watch it travel through the syntax diagrams. Start at the dot on the left; follow the arrows to the exit arrow on the right."));
    box.appendChild(tabs); box.appendChild(host); box.appendChild(bnfBox); box.appendChild(row(el("label", "", "String: "), inp, bPlay, bStep, bRun)); box.appendChild(tries); box.appendChild(strEl); box.appendChild(log);
    load("variable");
  });

  /* ================= the key: how to read a diagram, and the BNF equivalent ================= */
  V.reg("synkey", function(box){
    var R = [
      ["Sequence", "Items are visited <b>in order</b>, left to right, following the arrows.", seq(N("letter"), N("digit")), "<variable> ::= <letter><digit>", "variable"],
      ["Alternatives", "The paths are <b>choices</b>: take exactly one. Ovals hold the exact characters allowed.", alt(T("A"), T("B"), T("C")), "<letter> ::= A | B | C", "letter"],
      ["Repetition", "An arrow that <b>loops back</b> lets the item be repeated any number of times (at least once here). BNF has no loop, so it uses <b>recursion</b>: the item is defined using itself.", loop(N("digit")), "<integer> ::= <digit> | <integer><digit>", "integer"],
      ["Optional part", "A path that <b>skips</b> the item makes it optional. In BNF you write both versions as alternatives.", seq(N("letter"), opt(N("digit"))), "<code> ::= <letter> | <letter><digit>", "code"],
      ["Repeat, zero or more", "A skip path <b>and</b> a loop: the item can be missing, or appear again and again.", seq(N("letter"), zom(N("digit"))), "<name> ::= <letter> | <name><digit>", "name"]
    ];
    var wrap = el("div", "synk");
    wrap.appendChild(el("div", "vnote", "A syntax diagram is read like a road map: start at the dot, follow the arrows, and end at the exit arrow. Each idea below is shown as a diagram and as the same rule written in BNF."));
    var key = el("div", "sdcard sdkey"); key.innerHTML = "<b>Shapes</b>";
    var ks = V.svg(520, 52, '<g class="sdl sdterm"><rect class="sdt" x="10" y="9" width="40" height="34" rx="17"/><text class="sdx" x="30" y="30.5">A</text></g><text class="sdkt" x="58" y="31">Oval: a character typed exactly as shown (terminal)</text>');
    key.appendChild(ks);
    var ks2 = V.svg(520, 52, '<g class="sdl sdnon"><rect class="sdn" x="4" y="9" width="62" height="34" rx="3"/><text class="sdx" x="35" y="30.5">digit</text></g><text class="sdkt" x="76" y="31">Rectangle: another diagram (non-terminal)</text>');
    key.appendChild(ks2); wrap.appendChild(key);
    R.forEach(function(r){
      var c = el("div", "sdcard synr"), left = el("div"), right = el("div");
      left.appendChild(diagram(r[4], r[2])); right.innerHTML = "<b>" + r[0] + "</b><p style='margin:4px 0 6px'>" + r[1] + "</p><div class='vnote' style='margin:2px 0'>In BNF:</div><pre class='ln-pre' style='margin:0'>" + esc(r[3]) + "</pre>";
      c.appendChild(left); c.appendChild(right); wrap.appendChild(c);
    });
    box.appendChild(wrap);
  });

  /* ================= BNF: derive a string, with the parse tree ================= */
  function parseRules(lines){
    var rules = {}, order = [];
    lines.forEach(function(l){
      var m = l.match(/^\s*<([^>]+)>\s*::=\s*(.+)$/); if(!m) return; var alts = [];
      m[2].split("|").forEach(function(a){
        var syms = [], re = /<([^>]+)>|([^<]+)/g, t; while((t = re.exec(a))){ if(t[1]) syms.push({ v: t[1], nt: true }); else { var x = t[2].replace(/\s+/g, ""); if(x) syms.push({ v: x, nt: false }); } }
        alts.push({ syms: syms, txt: a.trim() });
      });
      rules[m[1]] = alts; order.push(m[1]);
    });
    return { rules: rules, start: order[0] };
  }
  function derive(P, target){
    var nid = 1, root = { id: 0, sym: P.start, nt: true, kids: null }, bestPre = 0, nodes = [root];
    function snap(f){ return f.map(function(n){ return { id: n.id, v: n.sym, nt: n.nt }; }); }
    function dfs(form, steps){
      var i = 0, pre = ""; while(i < form.length && !form[i].nt){ pre += form[i].sym; i++; }
      if(target.indexOf(pre) !== 0) return null;
      if(pre.length > bestPre) bestPre = pre.length;
      if(i === form.length) return pre === target ? steps : null;
      if(form.length > target.length) return null;
      var node = form[i], alts = P.rules[node.sym] || [];
      for(var a = 0; a < alts.length; a++){
        var alt = alts[a]; if(form.length - 1 + alt.syms.length > target.length) continue;
        var kids = alt.syms.map(function(s){ var n = { id: nid++, sym: s.v, nt: s.nt, kids: null, par: node.id }; return n; });
        node.kids = kids; var nf = form.slice(0, i).concat(kids, form.slice(i + 1));
        var r = dfs(nf, steps.concat([{ node: node.id, alt: alt.txt, sym: node.sym, kids: kids.map(function(k){ return k.id; }, 0), form: snap(nf) }]));
        if(r){ kids.forEach(function(k){ nodes.push(k); }); return r; }
        node.kids = null;
      }
      return null;
    }
    var st = dfs([root], []);
    return st ? { ok: true, steps: st, root: root, nodes: nodes } : { ok: false, pre: bestPre };
  }
  var B = {
    variable: { name: "Letter then digit", def: "B3", tries: ["B3", "A1", "C2", "CC"], lines: ["<variable> ::= <letter><digit>", "<letter> ::= A | B | C", "<digit> ::= 1 | 2 | 3"] },
    integer: { name: "Recursive integer", def: "472", tries: ["7", "472", "2024", "4a"], lines: ["<integer> ::= <digit> | <integer><digit>", "<digit> ::= 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9"] },
    assign: { name: "Assignment", def: "A1=B2+C3", tries: ["A1=B2+C3", "C3=A1*B2", "A1=B2"], lines: ["<assignment> ::= <variable>=<variable><operator><variable>", "<variable> ::= <letter><digit>", "<letter> ::= A | B | C", "<digit> ::= 1 | 2 | 3", "<operator> ::= + | - | * | /"] },
    ident: { name: "Letters and digits", def: "A1B", tries: ["A", "A1B", "BB2", "1A"], lines: ["<identifier> ::= <letter> | <identifier><letter> | <identifier><digit>", "<letter> ::= A | B | C", "<digit> ::= 1 | 2 | 3"] }
  };
  Object.keys(B).forEach(function(k){ B[k].P = parseRules(B[k].lines); });
  function nw(n){ var l = n.nt ? "<" + n.sym + ">" : n.sym; return n.nt ? Math.max(50, tw(l) + 18) : Math.max(30, tw(l) + 16); }
  function sw(n){ if(!n.kids) return (n.sw = nw(n) + 14); var t = 0; n.kids.forEach(function(k){ t += sw(k); }); return (n.sw = Math.max(nw(n) + 14, t)); }
  function layout(root){
    var MAXD = 0; sw(root);
    (function place(n, left, d){
      MAXD = Math.max(MAXD, d); n.d = d; n.x = left + n.sw / 2;
      if(n.kids){ var t = 0; n.kids.forEach(function(k){ t += k.sw; }); var l = left + (n.sw - t) / 2; n.kids.forEach(function(k){ place(k, l, d + 1); l += k.sw; }); }
    })(root, 4, 0);
    return { w: root.sw + 8, h: (MAXD + 1) * 62 + 20 };
  }
  V.reg("bnfderive", function(box){
    var cur = "variable", inp = el("input", "vin mono"), tabs = row(), tries = row(), rulesEl = el("pre", "ln-pre"), formEl = el("div", "bdform"), ruleEl = el("div", "vlog"), treeHost = el("div"), stop = null, run, pos, bPlay, bStep, bReset, tsvg;
    inp.style.width = "170px"; inp.setAttribute("aria-label", "String to build");
    function halt(){ if(stop){ stop(); stop = null; } if(bPlay) bPlay.textContent = "▶ Play"; }
    function nodeById(id){ for(var i = 0; i < run.nodes.length; i++) if(run.nodes[i].id === id) return run.nodes[i]; return null; }
    function drawTree(){
      treeHost.innerHTML = ""; if(!run.ok) return;
      var L = layout(run.root), s = "";
      run.nodes.forEach(function(n){ if(n.par !== undefined){ var p = nodeById(n.par); s += '<line class="bdl hid" data-n="' + n.id + '" x1="' + p.x + '" y1="' + (p.d * 62 + 30 + 14) + '" x2="' + n.x + '" y2="' + (n.d * 62 + 30 - 14) + '"/>'; } });
      run.nodes.forEach(function(n){
        var y = n.d * 62 + 30, label = n.nt ? "<" + n.sym + ">" : n.sym, w = n.nt ? Math.max(50, tw(label) + 18) : Math.max(30, tw(label) + 16);
        s += '<g class="bdn hid ' + (n.nt ? "nt" : "tm") + '" data-n="' + n.id + '"><rect x="' + (n.x - w / 2) + '" y="' + (y - 14) + '" width="' + w + '" height="28" rx="' + (n.nt ? 4 : 14) + '"/><text class="mid" x="' + n.x + '" y="' + (y + 5) + '">' + esc(label) + "</text></g>";
      });
      tsvg = V.svg(L.w, L.h, s); tsvg.setAttribute("class", "vsvg sdsvg bdtree"); tsvg.setAttribute("width", L.w); tsvg.setAttribute("height", L.h); tsvg.style.minWidth = "0"; tsvg.style.width = L.w + "px"; tsvg.style.maxWidth = "100%"; tsvg.style.height = "auto"; tsvg.style.margin = "0"; tsvg.setAttribute("aria-label", "Parse tree built from the BNF rules");
      treeHost.appendChild(tsvg);
    }
    function reveal(i){
      if(!tsvg) return; var vis = { 0: 1 }, fresh = {};
      for(var j = 0; j <= i - 1 && j < run.steps.length; j++) run.steps[j].kids.forEach(function(k){ vis[k] = 1; if(j === i - 1) fresh[k] = 1; });
      Array.prototype.forEach.call(tsvg.querySelectorAll("[data-n]"), function(e){ var id = +e.getAttribute("data-n"), base = e.tagName === "line" ? "bdl" : "bdn " + (e.getAttribute("class").indexOf("nt") >= 0 ? "nt" : "tm"); e.setAttribute("class", base + (vis[id] ? "" : " hid") + (fresh[id] ? " fresh" : "")); });
    }
    function setForm(f, fresh){ formEl.innerHTML = '<span class="sdlab">Current string: </span>' + f.map(function(x){ return '<span class="' + (x.nt ? "bdnt" : "bdt") + (fresh && fresh.indexOf(x.id) >= 0 ? " bdnew" : "") + '">' + esc(x.nt ? "<" + x.v + ">" : x.v) + "</span>"; }).join(""); }
    function start(){
      halt(); var s = inp.value.trim(); run = derive(B[cur].P, s); pos = 0; tsvg = null;
      if(!s){ formEl.innerHTML = ""; ruleEl.innerHTML = "Type a string to build."; treeHost.innerHTML = ""; return; }
      if(!run.ok){
        formEl.innerHTML = '<span class="sdlab">String: </span><span class="bdt">' + esc(s) + "</span>"; treeHost.innerHTML = "";
        var p = run.pre; ruleEl.innerHTML = '<span class="vbad">✗ Cannot be built.</span> No chain of rules produces <b>' + esc(s) + "</b>. " + (p < s.length ? "The rules can build <b>" + esc(s.substr(0, p) || "nothing") + "</b>, but <b>" + esc(s.charAt(p)) + "</b> is not allowed next." : "The string is too short: the rules need more characters.") + " It is <b>invalid</b>."; bStep.disabled = true; return;
      }
      setForm([{ id: 0, v: B[cur].P.start, nt: true }]); ruleEl.innerHTML = "Start with the first rule's name: <b>&lt;" + esc(B[cur].P.start) + "&gt;</b>. Press <b>Step</b>: each step replaces the <b>left-most</b> item in &lt; &gt; using one of its rules."; drawTree(); reveal(0); bStep.disabled = false;
    }
    function step(){
      if(!run || !run.ok) return false;
      if(pos >= run.steps.length) return false;
      var st = run.steps[pos]; pos++; setForm(st.form, st.kids); reveal(pos);
      ruleEl.innerHTML = "<b>Step " + pos + ":</b> replace <b>&lt;" + esc(st.sym) + "&gt;</b> using the rule <code>&lt;" + esc(st.sym) + "&gt; ::= " + esc(st.alt) + "</code>";
      if(pos >= run.steps.length){ ruleEl.innerHTML += '<br><span class="vok">✓ Only characters are left (no &lt; &gt; items), and they spell <b>' + esc(inp.value.trim()) + "</b>. The string is <b>valid</b>.</span>"; bStep.disabled = true; return false; }
      return true;
    }
    function load(k){
      cur = k; inp.value = B[k].def; Array.prototype.forEach.call(tabs.children, function(b){ b.className = "vb" + (b.dataset.k === k ? " on" : ""); b.setAttribute("aria-pressed", b.dataset.k === k); });
      rulesEl.textContent = B[k].lines.join("\n"); tries.innerHTML = ""; tries.appendChild(el("span", "vnote", "Try:")); B[k].tries.forEach(function(t){ tries.appendChild(btn(t, function(){ inp.value = t; start(); })); });
      start();
    }
    Object.keys(B).forEach(function(k){ var b = btn(B[k].name, function(){ load(k); }); b.dataset.k = k; tabs.appendChild(b); });
    bPlay = btn("▶ Play", function(){ if(stop){ halt(); return; } if(!run || !run.ok) return; if(pos >= run.steps.length) start(); bPlay.textContent = "⏸ Pause"; stop = V.timer(box, function(){ if(!step()){ halt(); return false; } }, 1300); }, "p");
    bStep = btn("Step ›", function(){ step(); }); bReset = btn("↺ Reset", start); inp.addEventListener("input", start);
    box.appendChild(el("div", "vnote", "A BNF rule says what an item can be replaced with. Start with the first rule and keep replacing the left-most &lt; &gt; item until only real characters are left. If you can reach your string, it is valid. The tree on the right shows how the pieces fit together (a parse tree).".replace(/&lt;/g, "<").replace(/&gt;/g, ">")));
    box.appendChild(tabs); box.appendChild(rulesEl); box.appendChild(row(el("label", "", "String: "), inp, bPlay, bStep, bReset)); box.appendChild(tries); box.appendChild(formEl); box.appendChild(ruleEl); box.appendChild(treeHost);
    load("variable");
  });

  /* ================= quiz ================= */
  V.reg("synquiz", function(box){
    function dgs(list){ return list.map(function(d){ return [d[0], d[1]]; }); }
    var lt = function(){ return ["letter", alt(T("A"), T("B"), T("C"))]; }, dg = function(){ return ["digit", alt(T("1"), T("2"), T("3"))]; };
    var Q = [
      { q: "Using the syntax diagrams, which of these is a valid <variable>?", dg: [["variable", seq(N("letter"), N("digit"))], lt(), dg()], opts: ["3B", "B3", "CC", "D2"], a: 1, w: "A variable is one letter (A, B or C) followed by one digit (1, 2 or 3). B3 follows the arrows: letter B, then digit 3." },
      { q: "Using the syntax diagrams, which of these statements is valid?", dg: [["assignment", seq(N("variable"), T("="), N("variable"), N("operator"), N("variable"))], ["variable", seq(N("letter"), N("digit"))], lt(), dg(), ["operator", alt(T("+"), T("-"), T("*"), T("/"))]], opts: ["A1:=B2+C3", "A1=B2+C3+A2", "A1=B2+C3", "A1=B2%C3"], a: 2, w: "The diagram gives variable, =, variable, operator, variable. := is not allowed, a fourth item is not allowed, and % is not an operator." },
      { q: "This diagram loops back. Which string can NOT be produced?", dg: [["name", seq(N("letter"), zom(alt(N("letter"), N("digit"))))], lt(), dg()], opts: ["A", "AB12", "C3C", "1AB"], a: 3, w: "The path must start with a letter. 1AB starts with a digit, so it cannot be produced. After the first letter, any mix of letters and digits is allowed." },
      { q: "This diagram has an optional digit. Which string is NOT accepted?", dg: [["code", seq(N("letter"), opt(N("digit")))], lt(), dg()], opts: ["A", "B2", "C", "AB"], a: 3, w: "A letter is needed, then the digit can be skipped or used once. AB has a second letter, which the diagram does not allow." },
      { q: "Which BNF matches this syntax diagram?", dg: [["integer", loop(N("digit"))], ["digit", alt(T("0"), T("1"), T("2"))]], bnf: ["<integer> ::= <digit> | <integer><digit>", "<integer> ::= <digit><digit>", "<integer> ::= <integer>", "<integer> ::= <digit> & <digit>"], a: 0, w: "The loop-back arrow means repetition. BNF shows repetition with recursion: an integer is a digit, or an integer followed by a digit." },
      { q: "Which syntax diagram matches this BNF?  <code> ::= <letter><digit>", opt: "diag", ds: [seq(N("letter"), N("digit")), alt(N("letter"), N("digit")), seq(N("digit"), N("letter"))], a: 0, w: "Two items side by side in BNF (no |) are a sequence: a letter, then a digit, in that order." },
      { q: "Which syntax diagram matches this BNF?  <sign> ::= + | -", opt: "diag", ds: [seq(T("+"), T("-")), alt(T("+"), T("-")), loop(alt(T("+"), T("-")))], a: 1, w: "The | symbol means a choice, so the diagram has two alternative paths: one with +, one with -." },
      { q: "In a syntax diagram, what does an arrow that loops back mean?", txt: ["Repetition: the item can be used again", "The item is optional", "The diagram contains an error", "The end of the diagram"], a: 0, w: "A loop-back arrow lets the path go round again, so the item can be repeated." }
    ];
    var qi = 0, score = 0, done = false, view = el("div");
    function show(){
      view.innerHTML = ""; done = false;
      if(qi >= Q.length){ view.appendChild(el("div", "vres", "<b>Finished: " + score + " out of " + Q.length + ".</b> " + (score >= 7 ? "Excellent! You can read and write syntax diagrams and BNF." : "Go back through the animations above and try again."))); view.appendChild(row(btn("Restart", function(){ qi = 0; score = 0; show(); }))); return; }
      var q = Q[qi], c = el("div", "vres"); c.appendChild(el("div", "", "<b>Question " + (qi + 1) + " of " + Q.length + "</b> (score " + score + ")")); c.appendChild(el("div", "qt", esc(q.q)));
      if(q.dg){ var l = el("div", "sdlist"); q.dg.forEach(function(d){ var w = el("div", "sdcard"); w.appendChild(diagram(d[0], d[1])); l.appendChild(w); }); c.appendChild(l); }
      var opts = el("div", q.opt === "diag" ? "sdopts" : "vrow"), fb = el("div", "qf");
      function pick(i, b){
        if(done) return; done = true; var ok = i === q.a; if(ok) score++;
        Array.prototype.forEach.call(opts.children, function(x, j){ x.disabled = true; if(j === q.a) x.className += " sdright"; else if(j === i) x.className += " sdwrong"; });
        fb.innerHTML = (ok ? '<span class="vok">✓ Correct.</span> ' : '<span class="vbad">✗ Not quite.</span> ') + q.w; var nx = btn(qi + 1 >= Q.length ? "See my score" : "Next ›", function(){ qi++; show(); }, "p"); fb.appendChild(el("div", "vrow")).appendChild(nx); nx.focus();
      }
      if(q.opt === "diag"){ q.ds.forEach(function(d, i){ var b = el("button", "vb sdopt"); b.type = "button"; b.appendChild(diagram("", d)); b.setAttribute("aria-label", "Diagram " + String.fromCharCode(65 + i)); b.appendChild(el("div", "sdoptl", "Diagram " + String.fromCharCode(65 + i))); b.addEventListener("click", function(){ pick(i, b); }); opts.appendChild(b); }); }
      else (q.opts || q.bnf || q.txt).forEach(function(t, i){ var b = btn(t, function(){ pick(i, b); }); if(q.bnf) b.className += " vmono"; opts.appendChild(b); });
      c.appendChild(opts); c.appendChild(fb); view.appendChild(c);
    }
    box.appendChild(el("div", "vnote", "Eight questions in the style of the exam: read a diagram, then match diagrams and BNF.")); box.appendChild(view); show();
  });
})(typeof window !== "undefined" ? window : this);
